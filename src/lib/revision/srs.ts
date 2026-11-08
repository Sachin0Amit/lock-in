/**
 * Revision & Mastery — the scheduling engine (pure, isomorphic).
 *
 * A transparent SM-2-inspired spaced-repetition model:
 *
 *  - Every studied item keeps an ease factor (1.3 … 3.0), a current
 *    interval in days, and a due date.
 *  - Self-ratings (quiz results map onto the same scale) move the
 *    schedule: "Again" resets to a 1-day relearn interval, "Hard" grows
 *    the interval modestly, "Good/Easy" walk the 1 → 3 → 7 → ×ease
 *    ladder.
 *  - Mastery (0…100) blends revision depth, memory freshness and answer
 *    quality; forgetting risk (0…100) is the complement of modelled
 *    retention. Both are explainable — every number shown in the UI can
 *    be traced to these formulas.
 *
 * No randomness, no opaque ML: deterministic, unit-testable arithmetic.
 */

import type { EntryState } from './types'

export interface SrsState {
  ease: number
  intervalDays: number
  passes: number
  lastQuality: number
  lastAt: number // epoch ms
  dueAt: number // epoch ms
}

export const DAY_MS = 24 * 3600 * 1000

export function clampQuality(q: number): number {
  if (!Number.isFinite(q)) return 3
  return Math.min(5, Math.max(0, Math.round(q)))
}

/** A fresh entry right after its first study pass. */
export function initialSrsState(now = Date.now(), quality = 3): SrsState {
  return {
    ease: 2.5,
    intervalDays: 1,
    passes: 1,
    lastQuality: clampQuality(quality),
    lastAt: now,
    dueAt: now + 1 * DAY_MS,
  }
}

/**
 * SM-2-lite review step.
 *  q ≤ 2 ("Again")  → relearn: interval 1, ease drops.
 *  q = 3 ("Hard")   → modest growth (×1.3, floor 2), ease drops slightly.
 *  q ≥ 4 ("Good/Easy") → full ladder: 1 → 3 → 7 → previous × ease.
 */
export function applyReview(
  prev: SrsState,
  quality: number,
  now = Date.now(),
): SrsState {
  const q = clampQuality(quality)
  let intervalDays: number
  if (q <= 2) {
    intervalDays = 1
  } else if (q === 3) {
    intervalDays = Math.max(2, Math.round(prev.intervalDays * 1.3))
  } else {
    intervalDays =
      prev.intervalDays <= 1
        ? 3
        : prev.intervalDays <= 3
          ? 7
          : Math.max(8, Math.round(prev.intervalDays * prev.ease))
  }

  /* Classic SM-2 ease update: EF' = EF + (0.1 − (5−q)(0.08 + (5−q)0.02)) */
  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
  const ease = Math.min(3, Math.max(1.3, prev.ease + delta))

  return {
    ease,
    intervalDays,
    passes: prev.passes + 1,
    lastQuality: q,
    lastAt: now,
    dueAt: now + intervalDays * DAY_MS,
  }
}

/* ------------------------------------------------------------------ */
/* Derived memory metrics                                              */
/* ------------------------------------------------------------------ */

/**
 * Revision-depth strength 0..1 — saturating logarithm in the number of
 * passes (1 pass ≈ 0.28 … 11 passes = 1.0). One reading is never
 * "mastery"; the curve keeps rewarding honest revision.
 */
export function strengthFromPasses(passes: number): number {
  const p = Math.max(1, passes)
  return Math.min(1, Math.log2(p + 1) / Math.log2(12))
}

/**
 * Modelled retention 0..1 since the last pass. A logistic forgetting curve
 * in x = elapsed / interval (the overdue ratio): ≈97% right after study,
 * ≈14% forgotten on the due day (the design target — that is why we revise
 * then), 50% at twice the scheduled interval, ≈86% at three times. Smooth,
 * bounded and explainable — every risk number in the UI traces back to
 * this one curve.
 */
const RISK_LOGISTIC_MID = 2
const RISK_LOGISTIC_SLOPE = 0.55

export function retentionSince(lastAt: number, intervalDays: number, now = Date.now()): number {
  const horizon = Math.max(1, intervalDays)
  const elapsedDays = Math.max(0, (now - lastAt) / DAY_MS)
  const x = elapsedDays / horizon
  const risk = 1 / (1 + Math.exp(-(x - RISK_LOGISTIC_MID) / RISK_LOGISTIC_SLOPE))
  return 1 - risk
}

/**
 * Composite mastery 0..100:
 *   50% revision depth + 30% memory freshness + 20% answer quality.
 */
export function computeMastery(state: SrsState, now = Date.now()): number {
  const strength = strengthFromPasses(state.passes)
  const retention = retentionSince(state.lastAt, state.intervalDays, now)
  const qualityTerm = state.lastQuality / 5
  const score = 100 * (0.5 * strength + 0.3 * retention + 0.2 * qualityTerm)
  return Math.round(Math.min(100, Math.max(0, score)))
}

/** Forgetting risk 0..100 — the complement of modelled retention. */
export function computeRisk(lastAt: number, intervalDays: number, now = Date.now()): number {
  return Math.round(100 * (1 - retentionSince(lastAt, intervalDays, now)))
}

/** The overdue ratio x behind the risk curve (1 = exactly due). */
export function overdueRatio(lastAt: number, intervalDays: number, now = Date.now()): number {
  const horizon = Math.max(1, intervalDays)
  return Math.max(0, (now - lastAt) / DAY_MS) / horizon
}

export function stateOfMastery(mastery: number): EntryState {
  if (mastery < 40) return 'learning'
  if (mastery < 65) return 'familiar'
  if (mastery < 85) return 'strong'
  return 'mastered'
}

export function daysBetween(a: number, b: number): number {
  return Math.max(0, Math.floor((b - a) / DAY_MS))
}

export function overdueDays(dueAt: number, now = Date.now()): number {
  return Math.max(0, Math.floor((now - dueAt) / DAY_MS))
}

/* ------------------------------------------------------------------ */
/* The autonomous revision queue                                       */
/* ------------------------------------------------------------------ */

export interface QueueCandidate {
  scope: 'chapter' | 'lesson'
  refId: string
  passes: number
  mastery: number
  risk: number
  overdueDays: number
  daysSince: number
  dueAt: number
  intervalDays: number
  readMins: number
  label: string
}

export interface QueueScore {
  urgency: number
  reason: string
}

/**
 * Why is this item being suggested *right now*? The reason string is the
 * honest, user-facing explanation; the urgency score orders the queue.
 */
export function scoreQueueItem(c: QueueCandidate, now = Date.now()): QueueScore {
  const due = c.dueAt <= now
  let urgency = 0
  let reason = ''

  if (due) {
    urgency = 100 + c.risk * 1.5 + c.overdueDays * 5 + (100 - c.mastery) * 0.5
    if (c.overdueDays >= 1) {
      reason = `Due ${c.overdueDays} day${c.overdueDays === 1 ? '' : 's'} ago — revised ${c.passes}×`
    } else {
      reason = `Due today — revised ${c.passes}×`
    }
  } else if (c.risk >= 25) {
    urgency = 60 + c.risk + (100 - c.mastery) * 0.5
    reason = `High forgetting risk (${c.risk}%) — last revised ${c.daysSince} day${c.daysSince === 1 ? '' : 's'} ago`
  } else if (c.daysSince >= 21 && c.passes <= 2) {
    urgency = 40 + (100 - c.mastery) * 0.5
    reason = `Studied only ${c.passes}× and untouched for ${c.daysSince} days`
  } else if (c.mastery < 40) {
    urgency = 30 + (100 - c.mastery) * 0.8
    reason = `Mastery is still low (${c.mastery}/100)`
  } else if (c.dueAt - now <= 3 * DAY_MS) {
    urgency = 20
    reason = 'Revision coming up in a few days'
  } else {
    urgency = 0
    reason = 'Fresh in memory'
  }

  /* weaker chapters win ties — the queue prefers shakier ground */
  return { urgency: Math.round(urgency), reason }
}

/** Order candidates into the revision queue; drops non-urgent tails. */
export function buildQueue<T extends QueueCandidate>(candidates: T[], now = Date.now()): (T & QueueScore)[] {
  return candidates
    .map((c) => ({ ...c, ...scoreQueueItem(c, now) }))
    .filter((c) => c.urgency > 0)
    .sort((a, b) => b.urgency - a.urgency || a.label.localeCompare(b.label))
}

/** Honest revision-time estimate: a revision pass ≈ 40% of a first read. */
export function revisionMinutes(readMins: number): number {
  return Math.max(2, Math.round(readMins * 0.4))
}
