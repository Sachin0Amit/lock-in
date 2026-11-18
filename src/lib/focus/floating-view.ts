/**
 * floating-view.ts — the pure arithmetic of the floating pomodoro icon
 * (owner chat directive 2026-11-18, "hover and see how much time is left").
 *
 * The floating widget is a VIEW over the same wall-clock timer store the
 * Focus Hub renders: nothing here owns time — every number is recomputed
 * from the store shape (running → endsAt epoch; paused → stored remainder;
 * armed → stored remainder; idle → the full phase) so a reload, a lost tab
 * or a backgrounded tab all agree with the hub's dial to the second.
 *
 * VERIFY-FIRST: every branch, label and clamp below is pinned in section G
 * of scripts/verify-focus-planner.ts before any UI ships.
 */
import { phaseLengthSecs } from './focus-engine'
import type { FocusSettings, Phase } from './types'

/** The four honest widget states (a corrupt row degrades to idle). */
export type FloatingKind = 'running' | 'paused' | 'armed' | 'idle'

/** The minimal slice of the timer store the widget reads. */
export interface FloatingTimerLike {
  phase: Phase
  running: boolean
  endsAt: number | null
  remainingMs: number | null
  phaseStartedAt: number | null
}

/** The same phase words the hub dial shows — one vocabulary everywhere. */
export const PHASE_WORD: Record<Phase, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
}

/**
 * running  — a live phase with an end epoch on the wall clock.
 * paused   — mid-phase remainder stored (phaseStartedAt carries the past).
 * armed    — a fresh phase never started (armPhase / entered, not yet run).
 * idle     — nothing ever armed, or a corrupt row; the widget goes quiet.
 */
export function floatingKind(t: FloatingTimerLike): FloatingKind {
  if (t.running && t.endsAt !== null) return 'running'
  if (!t.running && t.remainingMs !== null) return t.phaseStartedAt !== null ? 'paused' : 'armed'
  return 'idle'
}

/** Remaining ms the widget shows — wall-clock honest, clamped at zero. */
export function floatingLeftMs(t: FloatingTimerLike, s: FocusSettings, now: number): number {
  if (t.running && t.endsAt !== null) return Math.max(0, t.endsAt - now)
  if (t.remainingMs !== null) return Math.max(0, t.remainingMs)
  return phaseLengthSecs(t.phase, s) * 1000
}

/** Planned length of the current phase in ms (the ring's denominator). */
export function floatingPlannedMs(t: FloatingTimerLike, s: FocusSettings): number {
  return phaseLengthSecs(t.phase, s) * 1000
}

/** Ring fraction remaining — never NaN, never outside [0, 1]. */
export function ringFraction(leftMs: number, plannedMs: number): number {
  if (!Number.isFinite(leftMs) || !Number.isFinite(plannedMs) || plannedMs <= 0) return 0
  return Math.min(1, Math.max(0, leftMs / plannedMs))
}

/** Local wall-clock stamp, e.g. '14:32' — both sides derive from one Date. */
export function clockOfDayLabel(ts: number): string {
  const d = new Date(ts)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function minutesWord(leftMs: number): string {
  const m = Math.floor(leftMs / 60_000)
  if (m >= 2) return `${m} minutes`
  if (m === 1) return 'a minute'
  return leftMs > 0 ? 'under a minute' : 'no time'
}

/**
 * The accessible label — minute-floored so it changes at most once a
 * minute (never chatty), phrasing honest about running/paused/armed/idle.
 */
export function floatingAriaLabel(kind: FloatingKind, phase: Phase, leftMs: number): string {
  const word = minutesWord(leftMs)
  const inPhase = `in ${PHASE_WORD[phase]}`
  switch (kind) {
    case 'running':
      return leftMs > 0 ? `Pomodoro: ${word} left ${inPhase}` : `Pomodoro: time is up ${inPhase}`
    case 'paused':
      return `Pomodoro paused — ${word} left ${inPhase}`
    case 'armed':
      return `Pomodoro armed — ${word} of ${PHASE_WORD[phase]} ready`
    default:
      return 'Pomodoro idle — open the Focus Hub'
  }
}

/**
 * Drag clamp — the widget may be moved anywhere but is always kept fully
 * inside the viewport with an 8 px honest margin (never lost off-screen,
 * never a horizontal-overflow source at 390 px). `minY` lifts the floor so
 * the icon cannot be parked over the sticky site header (default 8).
 */
export function clampDrag(
  x: number,
  y: number,
  vw: number,
  vh: number,
  size: number,
  minY = 8,
): { x: number; y: number } {
  const lo = 8
  const maxX = Math.max(lo, vw - size - 8)
  const maxY = Math.max(minY, vh - size - 8)
  return {
    x: Math.min(maxX, Math.max(lo, Math.round(x))),
    y: Math.min(maxY, Math.max(minY, Math.round(y))),
  }
}
