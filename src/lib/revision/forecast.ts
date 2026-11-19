/**
 * Revision & Mastery — the forecast engine (pure, isomorphic).
 *
 * Projects the study ledger FORWARD using the same transparent formulas
 * the hub already shows for today (see srs.ts): every derived number
 * below is deterministic arithmetic over the ledger's own timestamps —
 * nothing is invented, and "what if I skip today?" has an exact answer
 * because the SRS intervals are.
 *
 *  - dueCount(day d)  : how many items will be due by the end of day d
 *                      if NOTHING is revised (a lower bound that grows
 *                      monotonically — overdue work never disappears)
 *  - riskCount(day d) : how many items will sit at forgetting-risk ≥ 25%
 *                      on day d's morning (the logistic curve evaluated
 *                      at that day's timestamp)
 *  - streak           : consecutive active days ending today (or yesterday
 *                      when today has no events yet)
 */
import { computeRisk, DAY_MS } from './srs'
import type { ActivityDay, EntryView } from './types'

const RISK_THRESHOLD = 25

export interface ForecastDay {
  /** 0 = today */
  dayOffset: number
  /** local YYYY-MM-DD */
  dateKey: string
  /** short weekday label ("Today", "Mon", …) */
  weekday: string
  /** items due by end of this day if nothing is revised */
  dueCount: number
  /** NEW items crossing the risk threshold on this day (not yet due) */
  riskCount: number
}

function localDateKey(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function weekdayLabel(ts: number, dayOffset: number): string {
  if (dayOffset === 0) return 'Today'
  if (dayOffset === 1) return 'Tomorrow'
  return new Date(ts).toLocaleDateString(undefined, { weekday: 'short' })
}

/**
 * The next `days` days of the schedule, projected honestly from the
 * ledger. Due counts are cumulative-lower-bounds (skipped work waits);
 * risk counts are per-day snapshots of the forgetting curve.
 */
export function forecastDays(entries: EntryView[], days = 7, now = Date.now()): ForecastDay[] {
  const out: ForecastDay[] = []
  for (let d = 0; d < days; d++) {
    const dayStart = startOfLocalDay(now) + d * DAY_MS
    const dayEnd = dayStart + DAY_MS
    let dueCount = 0
    let riskCount = 0
    for (const e of entries) {
      const dueAt = new Date(e.dueAt).getTime()
      const lastAt = new Date(e.lastAt).getTime()
      /* due by end of day d — for today only count what is already due now */
      const dueBy = d === 0 ? now : dayEnd
      if (dueAt <= dueBy) dueCount++
      else if (computeRisk(lastAt, e.intervalDays, dayStart) >= RISK_THRESHOLD) riskCount++
    }
    out.push({
      dayOffset: d,
      dateKey: localDateKey(dayStart),
      weekday: weekdayLabel(dayStart, d),
      dueCount,
      riskCount,
    })
  }
  return out
}

function startOfLocalDay(ts: number): number {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/* ------------------------------------------------------------------ */
/* Streak                                                              */
/* ------------------------------------------------------------------ */

export interface StreakInfo {
  /** consecutive active days ending today (or yesterday if today is still empty) */
  current: number
  /** today still has no study events */
  todayEmpty: boolean
  /** streak exists AND today is still empty — one session saves it */
  atRisk: boolean
}

/**
 * Streak over the activity calendar (the hub's own 84-day window). A day
 * counts when it has at least one study event. When today is still empty
 * the streak "ends yesterday" and is flagged at risk — exactly the
 * moment a 5-minute session matters most.
 */
export function streakOf(activity: ActivityDay[]): StreakInfo {
  if (activity.length === 0) return { current: 0, todayEmpty: true, atRisk: false }
  const today = activity[activity.length - 1]
  const todayEmpty = today.count === 0

  /* walk backwards from the last ACTIVE day */
  let i = activity.length - 1
  while (i >= 0 && activity[i].count === 0) i--
  let current = 0
  for (let j = i; j >= 0 && activity[j].count > 0; j--) current++

  return {
    current,
    todayEmpty,
    atRisk: todayEmpty && current >= 3,
  }
}
