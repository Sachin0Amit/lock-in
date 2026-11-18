/**
 * Focus — the pure engine (isomorphic, zero IO).
 *
 * Every number the Focus Hub shows is computed here: the pomodoro phase
 * machine (focus → short/long breaks → focus, the long-every cadence),
 * the task ordering (overdue first, then priority, then freshness), the
 * stats census (today / week / streak / all-time / top tasks) and the
 * engine's own insights. VERIFY-FIRST: scripts/verify-focus-planner.ts
 * pins all of it BEFORE the UI renders a single number.
 *
 * Honesty rules, same spirit as the revision engine:
 *  - "pomodoro" counts only sessions whose bell actually rang (complete);
 *    stopped sessions still count their seconds as focus time.
 *  - a day belongs to the moment the session STARTED (local timezone).
 *  - streak = consecutive days with ≥1 focus session, ending today — or
 *    ending yesterday when today has none logged yet (alive, extendable).
 */
import type {
  DayStat,
  FocusInsight,
  FocusSettings,
  FocusStats,
  Phase,
  Priority,
  SessionRow,
  TaskStatus,
  TaskView,
} from './types'

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export const DEFAULT_SETTINGS: FocusSettings = {
  focusMin: 25,
  shortMin: 5,
  longMin: 15,
  longEvery: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  sound: true,
  notify: true,
}

export const SETTINGS_BOUNDS = {
  focusMin: [1, 90],
  shortMin: [1, 30],
  longMin: [5, 60],
  longEvery: [2, 8],
} as const

const clamp = (v: number, lo: number, hi: number, fb: number): number =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : fb

/** Repair any stored settings row to the honest bounds (bad localStorage survives). */
export function clampSettings(raw: Partial<FocusSettings> | null | undefined): FocusSettings {
  const base = { ...DEFAULT_SETTINGS, ...(raw ?? {}) }
  return {
    focusMin: clamp(base.focusMin, SETTINGS_BOUNDS.focusMin[0], SETTINGS_BOUNDS.focusMin[1], DEFAULT_SETTINGS.focusMin),
    shortMin: clamp(base.shortMin, SETTINGS_BOUNDS.shortMin[0], SETTINGS_BOUNDS.shortMin[1], DEFAULT_SETTINGS.shortMin),
    longMin: clamp(base.longMin, SETTINGS_BOUNDS.longMin[0], SETTINGS_BOUNDS.longMin[1], DEFAULT_SETTINGS.longMin),
    longEvery: clamp(base.longEvery, SETTINGS_BOUNDS.longEvery[0], SETTINGS_BOUNDS.longEvery[1], DEFAULT_SETTINGS.longEvery),
    autoStartBreaks: Boolean(base.autoStartBreaks),
    autoStartFocus: Boolean(base.autoStartFocus),
    sound: Boolean(base.sound),
    notify: Boolean(base.notify),
  }
}

/* ------------------------------------------------------------------ */
/* The phase machine                                                   */
/* ------------------------------------------------------------------ */

/** Seconds a phase lasts under the given settings. */
export function phaseLengthSecs(phase: Phase, s: FocusSettings): number {
  if (phase === 'focus') return s.focusMin * 60
  if (phase === 'short') return s.shortMin * 60
  return s.longMin * 60
}

/**
 * The phase that follows a COMPLETED one, with the cycle counter.
 *
 * cycleFocus = focus sessions completed since the last long break. The
 * Nth completion (cycleFocus % longEvery === 0) earns the long break,
 * which resets the cycle.
 */
export function nextPhase(
  phase: Phase,
  cycleFocus: number,
  s: FocusSettings,
): { phase: Phase; cycleFocus: number } {
  if (phase === 'focus') {
    const completed = cycleFocus + 1
    return completed % s.longEvery === 0
      ? { phase: 'long', cycleFocus: completed }
      : { phase: 'short', cycleFocus: completed }
  }
  if (phase === 'short') return { phase: 'focus', cycleFocus }
  return { phase: 'focus', cycleFocus: 0 }
}

/** Does ending this phase now deserve a session row? (focus ≥60s = honest work) */
export function phaseWorthLogging(kind: Phase, actualSecs: number): boolean {
  return kind === 'focus' && actualSecs >= 60
}

export function outcomeOf(endedNaturally: boolean): 'complete' | 'stopped' {
  return endedNaturally ? 'complete' : 'stopped'
}

/* ------------------------------------------------------------------ */
/* Dates (local-day maths — the learner's timezone, client side)       */
/* ------------------------------------------------------------------ */

/** YYYY-MM-DD in the runtime's local timezone. */
export function localDateOf(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** Local midnight (epoch ms) of the date string YYYY-MM-DD. */
export function startOfDay(date: string): number {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0).getTime()
}

export type DueBucket = 'overdue' | 'today' | 'tomorrow' | 'later' | 'none'

/** Where a task's due date falls, relative to today's local midnight. */
export function dueBucket(task: { dueDate: string | null }, now: number): DueBucket {
  if (!task.dueDate) return 'none'
  const today = startOfDay(localDateOf(now))
  const due = startOfDay(task.dueDate)
  if (due < today) return 'overdue'
  if (due === today) return 'today'
  if (due === today + 86_400_000) return 'tomorrow'
  return 'later'
}

const DUE_RANK: Record<DueBucket, number> = {
  overdue: 0,
  today: 1,
  tomorrow: 2,
  later: 3,
  none: 4,
}

const PRIORITY_RANK: Record<Priority, number> = { high: 0, normal: 1, low: 2 }

/** In-progress (pomos < estimate) tasks float above their finished-estimate peers. */
export function estimateState(t: { pomos: number; estimate: number }): 'fresh' | 'working' | 'over' {
  if (t.pomos >= t.estimate) return 'over'
  return t.pomos > 0 ? 'working' : 'fresh'
}

/**
 * The order open tasks render in: overdue first, then due today, then
 * tomorrow, later, undated; within a bucket high priority wins; within
 * that, tasks still under their estimate float up; ties break oldest-first.
 */
export function orderTasks(tasks: TaskView[], now: number): TaskView[] {
  return [...tasks]
    .filter((t) => t.status === 'open')
    .sort((a, b) => {
      const due = DUE_RANK[dueBucket(a, now)] - DUE_RANK[dueBucket(b, now)]
      if (due !== 0) return due
      const pr = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
      if (pr !== 0) return pr
      const ea = estimateState(a) === 'over' ? 1 : 0
      const eb = estimateState(b) === 'over' ? 1 : 0
      if (ea !== eb) return ea - eb
      return a.createdAt.localeCompare(b.createdAt)
    })
}

/* ------------------------------------------------------------------ */
/* The stats census                                                    */
/* ------------------------------------------------------------------ */

function dayKeyOf(session: SessionRow): string {
  return localDateOf(new Date(session.startedAt).getTime())
}

/**
 * The full stats census over raw rows. todayMins/todayPomos/todayTasksDone
 * reflect "today" = the local day of `now`; allTime covers every row given.
 */
export function buildStats(sessions: SessionRow[], tasks: TaskView[], now: number): FocusStats {
  const today = localDateOf(now)
  const byDay = new Map<string, DayStat>()
  let breakSecsToday = 0
  let focusSecsTotal = 0
  let focusSessionsTotal = 0
  let longestFocusSecs = 0

  for (const s of sessions) {
    const day = dayKeyOf(s)
    let d = byDay.get(day)
    if (!d) {
      d = { date: day, focusMins: 0, pomos: 0 }
      byDay.set(day, d)
    }
    if (s.kind === 'focus') {
      const secs = Math.max(0, s.actualSecs)
      d.focusMins += secs
      focusSecsTotal += secs
      focusSessionsTotal += 1
      longestFocusSecs = Math.max(longestFocusSecs, secs)
      if (s.outcome === 'complete') d.pomos += 1
    } else if (day === today) {
      breakSecsToday += Math.max(0, s.actualSecs)
    }
  }
  for (const d of byDay.values()) d.focusMins = Math.round(d.focusMins / 60)

  const week: DayStat[] = []
  const todayStart = startOfDay(today)
  for (let i = 6; i >= 0; i--) {
    const date = localDateOf(todayStart - i * 86_400_000)
    const d = byDay.get(date)
    week.push({ date, focusMins: d?.focusMins ?? 0, pomos: d?.pomos ?? 0 })
  }

  /* streak: consecutive focus days ending today — or ending yesterday when
   * today has no focus yet (alive — one session extends it). A day with only
   * breaks never counts, and never redirects the streak cursor. */
  const focusOn = (date: string): boolean => (byDay.get(date)?.focusMins ?? 0) > 0
  let streakDays = 0
  let cursor = focusOn(today) ? today : localDateOf(todayStart - 86_400_000)
  while (focusOn(cursor)) {
    streakDays += 1
    cursor = localDateOf(startOfDay(cursor) - 86_400_000)
  }

  let bestDayMins = 0
  let bestDayDate: string | null = null
  for (const d of byDay.values()) {
    if (d.focusMins > bestDayMins) {
      bestDayMins = d.focusMins
      bestDayDate = d.date
    }
  }

  const tasksDone = tasks.filter((t) => t.status === 'done').length
  const todayTasksDone = tasks.filter((t) => t.completedAt !== null && localDateOf(new Date(t.completedAt).getTime()) === today).length
  const todayRow = byDay.get(today)

  const topTasks = [...tasks]
    .filter((t) => t.focusSecs > 0)
    .sort((a, b) => b.focusSecs - a.focusSecs || b.pomos - a.pomos)
    .slice(0, 5)
    .map((t) => ({ id: t.id, title: t.title, pomos: t.pomos, focusMins: Math.round(t.focusSecs / 60), status: t.status }))

  return {
    today: {
      focusMins: todayRow?.focusMins ?? 0,
      pomos: todayRow?.pomos ?? 0,
      breakMins: Math.round(breakSecsToday / 60),
      tasksDone: todayTasksDone,
    },
    week,
    streakDays,
    allTime: {
      focusSecs: focusSecsTotal,
      focusSessions: focusSessionsTotal,
      tasksDone,
      avgFocusMins: focusSessionsTotal > 0 ? Math.round(focusSecsTotal / focusSessionsTotal / 60) : 0,
      bestDayMins,
      bestDayDate,
      longestSessionMins: Math.round(longestFocusSecs / 60),
    },
    topTasks,
  }
}

/* ------------------------------------------------------------------ */
/* The engine's own insights (deterministic, capped at 4)              */
/* ------------------------------------------------------------------ */

export function buildInsights(
  tasks: TaskView[],
  stats: FocusStats,
  now: number,
): FocusInsight[] {
  const out: FocusInsight[] = []
  const open = tasks.filter((t) => t.status === 'open')
  const overdue = open.filter((t) => dueBucket(t, now) === 'overdue')

  if (overdue.length > 0) {
    out.push({
      id: 'overdue',
      tone: 'nudge',
      text: `${overdue.length} ${overdue.length === 1 ? 'task is' : 'tasks are'} overdue — reschedule them honestly or let them go.`,
    })
  }

  if (stats.today.pomos === 0 && open.length > 0) {
    const target = open.find((t) => t.pomos < t.estimate) ?? open[0]!
    out.push({
      id: 'cold-start',
      tone: 'nudge',
      text: `No focus bell has rung today — “${target.title}” is waiting for its first pomodoro.`,
    })
  }

  const over = open.filter((t) => t.pomos > t.estimate)
  if (over.length > 0) {
    const t = over[0]!
    out.push({
      id: 'over-estimate',
      tone: 'info',
      text: `“${t.title}” has run ${t.pomos} of its planned ${t.estimate} pomodoros — split it or push to finish.`,
    })
  }

  if (stats.streakDays >= 3) {
    out.push({
      id: 'streak',
      tone: 'praise',
      text: `${stats.streakDays}-day focus streak alive — one session keeps it going.`,
    })
  }

  if (out.length === 0 && open.length === 0 && tasks.length === 0) {
    out.push({
      id: 'empty-plan',
      tone: 'info',
      text: 'Add today’s plan — a task with a pomodoro estimate and a linked topic is where the engine gets useful.',
    })
  }

  if (out.length === 0 && open.length === 0) {
    out.push({
      id: 'all-done',
      tone: 'praise',
      text: 'Everything on the list is done — add tomorrow’s plan, or rest honestly.',
    })
  }

  return out.slice(0, 4)
}

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

/** "25:00" style countdown label. */
export function formatClock(totalSecs: number): string {
  const s = Math.max(0, Math.round(totalSecs))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

/** The task's honest progress sentence: "2 of 4 pomodoros · 50 min focused". */
export function taskProgressLabel(t: TaskView): string {
  return `${t.pomos} of ${t.estimate} pomodoros · ${Math.round(t.focusSecs / 60)} min focused`
}
