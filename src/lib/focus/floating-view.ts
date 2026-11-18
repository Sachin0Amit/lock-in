/**
 * floating-view.ts — the pure arithmetic of the floating pomodoro icon
 * (owner chat directive 2026-11-18, "hover and see how much time is left";
 * extended later the same day: "the icon should show more features like
 * add more time, adjust time or play/pause").
 *
 * The floating widget is a VIEW over the same wall-clock timer store the
 * Focus Hub renders: nothing here owns time — every number is recomputed
 * from the store shape (running → endsAt epoch; paused → stored remainder;
 * armed → stored remainder; idle → the full phase) so a reload, a lost tab
 * or a backgrounded tab all agree with the hub's dial to the second.
 *
 * The quick-adjust arithmetic lives here too: the ±minute buttons the
 * hover panel exposes write a wall-clock patch computed by quickAdjust() —
 * a subtraction can never cut below "end now", and the tailored phase
 * length keeps the one honesty invariant the session log relies on:
 * planned − left = truly-focused time.
 *
 * VERIFY-FIRST: every branch, label and clamp below is pinned in sections
 * G and H of scripts/verify-focus-planner.ts before any UI ships.
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
  /**
   * The length THIS phase instance was tailored to (quick-adjust grows or
   * shrinks it). null = a legacy row / fresh phase → the settings-derived
   * length, exactly what the hub dial always showed.
   */
  phasePlannedMs?: number | null
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
  return t.phasePlannedMs ?? phaseLengthSecs(t.phase, s) * 1000
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

/* ------------------------------------------------------------------ */
/* Quick adjust — the ±minute buttons on the hover panel               */
/* (owner chat directive 2026-11-18, later: "the icon should show      */
/*  more features like add more time, adjust time or play pause")      */
/* ------------------------------------------------------------------ */

/** The steps the panel offers: −1 min, +1 min, +5 min. */
export const QUICK_ADJUST_STEPS_MS: readonly number[] = [-60_000, 60_000, 300_000]

/** A tailored phase never grows past 4 h — the + buttons stop there. */
export const QUICK_ADJUST_MAX_MS = 240 * 60_000

/** The wall-clock patch one ±minute press writes. */
export interface QuickAdjustPatch {
  /** the new end epoch (a running phase) */
  endsAt?: number
  /** the new stored remainder (a paused/armed phase) */
  remainingMs?: number
  /** the phase's new tailored length */
  phasePlannedMs: number
}

/**
 * The arithmetic of one quick adjust, pure like everything else here.
 *
 * Honesty rules, both pinned in verifier section H:
 *  - a subtraction can never cut below "end now": the effective delta is
 *    clamped to −left, so a running phase pulled to the present completes
 *    naturally on the next tick and logs exactly the time truly focused;
 *  - planned − left stays the true focused time in every state (running,
 *    paused, armed) — the same invariant completePhase's session row uses.
 *
 * null = there is nothing to adjust (idle or a corrupt row).
 */
export function quickAdjust(
  t: FloatingTimerLike,
  s: FocusSettings,
  deltaMs: number,
  now: number,
): QuickAdjustPatch | null {
  const planned = t.phasePlannedMs ?? phaseLengthSecs(t.phase, s) * 1000
  if (t.running && t.endsAt !== null) {
    const left = Math.max(0, t.endsAt - now)
    /* clamp: never below −left (can't un-run time), never past the 4 h cap */
    const eff = Math.min(Math.max(deltaMs, -left), Math.max(0, QUICK_ADJUST_MAX_MS - planned))
    return { endsAt: Math.max(now, t.endsAt + eff), phasePlannedMs: planned + eff }
  }
  if (!t.running && t.remainingMs !== null) {
    const left = Math.max(0, t.remainingMs)
    const eff = Math.min(Math.max(deltaMs, -left), Math.max(0, QUICK_ADJUST_MAX_MS - planned))
    return { remainingMs: left + eff, phasePlannedMs: planned + eff }
  }
  return null
}

/** The play/pause control's honest label for each widget state. */
export function playPauseAriaLabel(kind: FloatingKind): string {
  switch (kind) {
    case 'running':
      return 'Pause the pomodoro'
    case 'paused':
      return 'Resume the pomodoro'
    case 'armed':
      return 'Start the armed phase'
    default:
      return 'Start a focus block'
  }
}

/** '−1' / '+1' / '+5' — the compact button face (a true minus, never a hyphen). */
export function stepLabel(deltaMs: number): string {
  const mins = Math.round(Math.abs(deltaMs) / 60_000)
  const n = mins === 1 ? '1' : String(mins)
  return deltaMs < 0 ? `\u2212${n}` : `+${n}`
}

/** 'Add one minute' / 'Subtract five minutes' — the full control label. */
export function adjustAriaLabel(deltaMs: number): string {
  const mins = Math.round(Math.abs(deltaMs) / 60_000)
  const word = mins === 1 ? 'one minute' : mins === 5 ? 'five minutes' : `${mins} minutes`
  return deltaMs < 0 ? `Subtract ${word} from the phase` : `Add ${word} to the phase`
}
