/**
 * verify-focus-planner.ts — pre-UI arithmetic verification for the Focus
 * Hub (study to-do × pomodoro, owner chat directive 2026-11-18).
 *
 * VERIFY-FIRST: every number the Focus Hub will show is checked here
 * BEFORE the UI is written — the pomodoro phase machine (long-every
 * cadence), settings bounds repair, the open-task ordering rule, the due
 * buckets, the stats census (today / week / streak / all-time / top
 * tasks, with complete-vs-stopped honesty), and the engine's insight
 * rules.
 *
 * Run: bun run scripts/verify-focus-planner.ts   (exit 1 on any failure)
 */
export {}

let pass = 0
let fail = 0
const failures: string[] = []

function check(name: string, condition: boolean): void {
  if (condition) {
    pass++
  } else {
    fail++
    failures.push(name)
  }
}

function eq<T>(name: string, actual: T, expected: T): void {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  check(`${name} = ${JSON.stringify(expected)} (got ${JSON.stringify(actual)})`, ok)
}

/* ------------------------------------------------------------------ */
/* A. Settings                                                          */
/* ------------------------------------------------------------------ */
import {
  DEFAULT_SETTINGS,
  clampSettings,
  phaseLengthSecs,
  nextPhase,
  phaseWorthLogging,
  outcomeOf,
  dueBucket,
  orderTasks,
  estimateState,
  buildStats,
  buildInsights,
  formatClock,
  taskProgressLabel,
} from '../src/lib/focus/focus-engine'

eq('default settings', DEFAULT_SETTINGS, {
  focusMin: 25,
  shortMin: 5,
  longMin: 15,
  longEvery: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  sound: true,
  notify: true,
})

eq('clampSettings repairs a zero focus length', clampSettings({ focusMin: 0 }).focusMin, 1)
eq('clampSettings caps a runaway focus length', clampSettings({ focusMin: 999 }).focusMin, 90)
eq('clampSettings survives NaN by falling back', clampSettings({ focusMin: Number.NaN }).focusMin, 25)
eq('clampSettings lifts longEvery below the minimum', clampSettings({ longEvery: 1 }).longEvery, 2)
eq('clampSettings caps longEvery', clampSettings({ longEvery: 64 }).longEvery, 8)
eq('clampSettings on garbage → defaults', clampSettings(null), DEFAULT_SETTINGS)
eq('clampSettings keeps booleans', clampSettings({ autoStartBreaks: true, sound: false }),
  { ...DEFAULT_SETTINGS, autoStartBreaks: true, sound: false })

eq('phaseLength focus', phaseLengthSecs('focus', DEFAULT_SETTINGS), 1500)
eq('phaseLength short', phaseLengthSecs('short', DEFAULT_SETTINGS), 300)
eq('phaseLength long', phaseLengthSecs('long', DEFAULT_SETTINGS), 900)

/* ------------------------------------------------------------------ */
/* B. The phase machine                                                 */
/* ------------------------------------------------------------------ */

eq('1st focus → short', nextPhase('focus', 0, DEFAULT_SETTINGS), { phase: 'short', cycleFocus: 1 })
eq('2nd focus → short', nextPhase('focus', 1, DEFAULT_SETTINGS), { phase: 'short', cycleFocus: 2 })
eq('3rd focus → short', nextPhase('focus', 2, DEFAULT_SETTINGS), { phase: 'short', cycleFocus: 3 })
eq('4th focus → LONG (longEvery 4)', nextPhase('focus', 3, DEFAULT_SETTINGS), { phase: 'long', cycleFocus: 4 })
eq('5th focus after reset → short', nextPhase('focus', 0, DEFAULT_SETTINGS).phase, 'short')
eq('short → focus', nextPhase('short', 2, DEFAULT_SETTINGS), { phase: 'focus', cycleFocus: 2 })
eq('long → focus AND cycle reset', nextPhase('long', 4, DEFAULT_SETTINGS), { phase: 'focus', cycleFocus: 0 })
eq('longEvery 2: 2nd focus → long', nextPhase('focus', 1, { ...DEFAULT_SETTINGS, longEvery: 2 }).phase, 'long')

eq('phaseWorthLogging: 59s focus is nothing yet', phaseWorthLogging('focus', 59), false)
eq('phaseWorthLogging: 60s focus is honest work', phaseWorthLogging('focus', 60), true)
eq('phaseWorthLogging: breaks never log', phaseWorthLogging('short', 300), false)
eq('outcomeOf natural → complete', outcomeOf(true), 'complete')
eq('outcomeOf early → stopped', outcomeOf(false), 'stopped')

/* ------------------------------------------------------------------ */
/* C. Due buckets + task ordering                                       */
/* ------------------------------------------------------------------ */

/* fixed "today": 2026-11-18 20:00 local — buckets are local-midnight maths */
const NOW = new Date(2026, 10, 18, 20, 0, 0, 0).getTime()
const DAY = 86_400_000
const todayStr = '2026-11-18'

eq('dueBucket: null → none', dueBucket({ dueDate: null }, NOW), 'none')
eq('dueBucket: today → today', dueBucket({ dueDate: todayStr }, NOW), 'today')
eq('dueBucket: tomorrow', dueBucket({ dueDate: '2026-11-19' }, NOW), 'tomorrow')
eq('dueBucket: later', dueBucket({ dueDate: '2026-11-25' }, NOW), 'later')
eq('dueBucket: yesterday → overdue', dueBucket({ dueDate: '2026-11-17' }, NOW), 'overdue')

eq('estimateState: 0 pomos → fresh', estimateState({ pomos: 0, estimate: 2 }), 'fresh')
eq('estimateState: 1 of 2 → working', estimateState({ pomos: 1, estimate: 2 }), 'working')
eq('estimateState: met → over', estimateState({ pomos: 2, estimate: 2 }), 'over')
eq('estimateState: blown → over', estimateState({ pomos: 5, estimate: 2 }), 'over')

function task(
  id: string,
  over: Partial<import('../src/lib/focus/types').TaskView>,
): import('../src/lib/focus/types').TaskView {
  return {
    id,
    title: `Task ${id}`,
    notes: null,
    link: null,
    priority: 'normal',
    estimate: 1,
    pomos: 0,
    focusSecs: 0,
    status: 'open',
    dueDate: null,
    createdAt: `2026-11-1${id}T00:00:00.000Z`,
    completedAt: null,
    ...over,
  }
}

const ORDER_FIXTURE = [
  task('a', { title: 'undated low', priority: 'low', createdAt: '2026-11-01T00:00:00.000Z' }),
  task('b', { title: 'later high', dueDate: '2026-11-25', priority: 'high' }),
  task('c', { title: 'tomorrow normal', dueDate: '2026-11-19' }),
  task('d', { title: 'today high', dueDate: todayStr, priority: 'high' }),
  task('e', { title: 'today normal', dueDate: todayStr }),
  task('f', { title: 'overdue low', dueDate: '2026-11-15', priority: 'low' }),
  task('g', { title: 'overdue high', dueDate: '2026-11-16', priority: 'high' }),
  task('h', { title: 'today high blown estimate', dueDate: todayStr, priority: 'high', pomos: 4, estimate: 2 }),
  task('i', { title: 'done task', status: 'done', completedAt: '2026-11-18T10:00:00.000Z' }),
]

eq('orderTasks: overdue → today → tomorrow → later → undated, priority inside',
  orderTasks(ORDER_FIXTURE, NOW).map((t) => t.id),
  ['g', 'f', 'd', 'h', 'e', 'c', 'b', 'a'])

eq('orderTasks drops non-open rows', orderTasks(ORDER_FIXTURE, NOW).some((t) => t.status !== 'open'), false)

/* ------------------------------------------------------------------ */
/* D. The stats census                                                  */
/* ------------------------------------------------------------------ */

import type { SessionRow, TaskView } from '../src/lib/focus/types'

function session(
  id: string,
  day: number,
  hour: number,
  kind: SessionRow['kind'],
  planned: number,
  actual: number,
  outcome: SessionRow['outcome'],
  taskId: string | null = null,
): SessionRow {
  const start = new Date(2026, 10, day, hour, 0, 0, 0).getTime()
  return {
    id,
    taskId,
    kind,
    plannedSecs: planned,
    actualSecs: actual,
    outcome,
    startedAt: new Date(start).toISOString(),
    endedAt: new Date(start + actual * 1000).toISOString(),
  }
}

const SESSIONS: SessionRow[] = [
  /* 2026-11-16 (−2 days): two complete bells → 50 min, 2 pomos */
  session('s1', 16, 10, 'focus', 1500, 1500, 'complete', 't1'),
  session('s2', 16, 23, 'focus', 1500, 1500, 'complete'), /* 23:00 start still lands on day 16 */
  /* 2026-11-17 (−1 day): one bell + one stopped-at-10-min → 35 min, 1 pomodoro */
  session('s3', 17, 9, 'focus', 1500, 1500, 'complete', 't1'),
  session('s4', 17, 11, 'focus', 1500, 600, 'stopped'),
  session('s5', 17, 12, 'short', 300, 300, 'complete'), /* breaks only count today */
  /* 2026-11-18 (today): one bell + a long break → 25 min, 1 pomodoro, 15 break min */
  session('s6', 18, 18, 'focus', 1500, 1500, 'complete', 't4'),
  session('s7', 18, 19, 'long', 900, 900, 'complete'),
  /* 2026-11-09 (−9 days): outside the week window, inside all-time */
  session('s8', 9, 12, 'focus', 1500, 1500, 'complete', 't5'),
]

const TASKS: TaskView[] = [
  task('t1', { title: 'AM-GM drills', priority: 'high', dueDate: '2026-11-15', estimate: 2, pomos: 3, focusSecs: 3000 }),
  task('t2', { title: 'Read 1.2 tonight', dueDate: todayStr }),
  task('t3', { title: 'Tomorrow plan', dueDate: '2026-11-19' }),
  task('t4', { title: 'Clear the inbox', priority: 'low', estimate: 4, pomos: 5, focusSecs: 1500 }),
  task('t5', { title: 'Finished thing', status: 'done', completedAt: '2026-11-18T09:00:00.000Z', focusSecs: 600, pomos: 1, estimate: 1 }),
  task('t6', { title: 'Old finished', status: 'done', completedAt: '2026-11-15T09:00:00.000Z', focusSecs: 0 }),
]

const stats = buildStats(SESSIONS, TASKS, NOW)

eq('today.focusMins', stats.today.focusMins, 25)
eq('today.pomos (only the bell that rang)', stats.today.pomos, 1)
eq('today.breakMins (long break today)', stats.today.breakMins, 15)
eq('today.tasksDone (completedAt lands today)', stats.today.tasksDone, 1)

eq('week window (7 days oldest-first)', stats.week.map((d) => d.date),
  ['2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15', '2026-11-16', '2026-11-17', '2026-11-18'])
eq('week day −2: 50 min / 2 pomos', [stats.week[4]!.focusMins, stats.week[4]!.pomos], [50, 2])
eq('week day −1: 35 min / 1 pomodoro (stopped session honest)', [stats.week[5]!.focusMins, stats.week[5]!.pomos], [35, 1])
eq('week today: 25 min / 1 pomodoro', [stats.week[6]!.focusMins, stats.week[6]!.pomos], [25, 1])
eq('week empty days are zeroed', stats.week.slice(0, 4).map((d) => [d.focusMins, d.pomos]),
  [[0, 0], [0, 0], [0, 0], [0, 0]])

eq('streak: three consecutive focus days ending today', stats.streakDays, 3)
const noTodayStats = buildStats(SESSIONS.filter((s) => s.id !== 's6'), TASKS, NOW)
eq('streak alive from yesterday when today is empty', noTodayStats.streakDays, 2)
const gapStats = buildStats([session('s8', 9, 12, 'focus', 1500, 1500, 'complete')], TASKS, NOW)
eq('streak zero when the last focus day has a gap', gapStats.streakDays, 0)

eq('allTime.focusSecs (every focus row, complete + stopped)', stats.allTime.focusSecs, 8100)
eq('allTime.focusSessions (6 focus rows; breaks never count)', stats.allTime.focusSessions, 6)
eq('allTime.tasksDone', stats.allTime.tasksDone, 2)
eq('allTime.avgFocusMins (8100s / 6 sessions, rounds to 23)', stats.allTime.avgFocusMins, 23)
eq('allTime.bestDayMins + date (day −2: 50)', [stats.allTime.bestDayMins, stats.allTime.bestDayDate], [50, '2026-11-16'])
eq('allTime.longestSessionMins', stats.allTime.longestSessionMins, 25)

eq('topTasks by focusSecs with live rows',
  stats.topTasks.map((t) => [t.id, t.focusMins, t.status]),
  [['t1', 50, 'open'], ['t4', 25, 'open'], ['t5', 10, 'done']])
eq('topTasks caps at 5', buildStats(SESSIONS, [...Array(9)].map((_, i) => task(`x${i}`, { focusSecs: 100 * (9 - i) })), NOW).topTasks.length, 5)

/* ------------------------------------------------------------------ */
/* E. The engine's own insights                                         */
/* ------------------------------------------------------------------ */

const insights = buildInsights(TASKS, stats, NOW)
eq('insights: overdue nudge first (t1 alone is overdue)', insights[0]!,
  { id: 'overdue', tone: 'nudge', text: '1 task is overdue — reschedule them honestly or let them go.' })
eq('insights: over-estimate names the first blown task',
  insights[1]!.id === 'over-estimate' && insights[1]!.text.includes('“AM-GM drills” has run 3 of its planned 2'), true)
eq('insights: streak praise', insights[2]!.id, 'streak')
eq('insights: capped at 4', insights.length <= 4, true)
eq('insights: no cold-start when a bell rang today', insights.some((i) => i.id === 'cold-start'), false)

const coldStart = buildInsights(TASKS, { ...stats, today: { ...stats.today, pomos: 0 } }, NOW)
eq('insights: cold-start names the first task still under its estimate',
  coldStart.some((i) => i.id === 'cold-start' && i.text.includes('“Read 1.2 tonight”')), true)

const emptyPlan = buildInsights([], buildStats([], [], NOW), NOW)
eq('insights: empty plan', emptyPlan.map((i) => i.id), ['empty-plan'])

const allDone = buildInsights(
  [task('t5', { title: 'Finished thing', status: 'done', completedAt: '2026-11-18T09:00:00.000Z' })],
  buildStats([], [], NOW),
  NOW,
)
eq('insights: all-done praise', allDone.map((i) => i.id), ['all-done'])

/* ------------------------------------------------------------------ */
/* F. Presentational helpers + write contracts                          */
/* ------------------------------------------------------------------ */

eq('formatClock 25:00', formatClock(1500), '25:00')
eq('formatClock 00:05', formatClock(5), '00:05')
eq('formatClock never negative', formatClock(-3), '00:00')
eq('taskProgressLabel', taskProgressLabel(TASKS[0]!), '3 of 2 pomodoros · 50 min focused')

import type { LogSessionRequest } from '../src/lib/focus/types'
import type { EventKind } from '../src/lib/revision/types'
const ledgerWrite: LogSessionRequest = {
  taskId: 't1',
  kind: 'focus',
  plannedSecs: 1500,
  actualSecs: 1500,
  outcome: 'complete',
  startedAt: NOW,
  endedAt: NOW + 1500 * 1000,
}
eq('the session write contract carries honest seconds', [ledgerWrite.actualSecs, ledgerWrite.outcome], [1500, 'complete'])
const focusKind: EventKind = 'focus'
eq('the revision ledger accepts the focus event kind', focusKind, 'focus')

/* ------------------------------------------------------------------ */
console.log(`\nverify-focus-planner: ${pass} pass / ${fail} fail`)
if (fail > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}
