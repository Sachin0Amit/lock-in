/**
 * Practice — in-progress exam sitting persistence (client-only).
 *
 * A running CBT paper autosaves to localStorage so an accidental refresh
 * never destroys a sitting: answers, typed values, marks, visits,
 * per-question seconds and the wall-clock start are snapshotted (the
 * countdown is recomputed honestly from the wall clock on resume — the
 * time away counts, exactly like a real CBT). The snapshot is cleared on
 * submit or abandon, and a snapshot whose time has fully expired is
 * discarded at load (that paper is over).
 */
import type { ExamPresetView, PaperMeta, PracticeQuestion } from './types'

const KEY = 'lockin:exam-sitting:v1'

export interface ExamSitting {
  v: 1
  preset: ExamPresetView
  paper: PracticeQuestion[]
  meta: PaperMeta
  answers: Record<string, number>
  values: Record<string, string>
  marked: Record<string, 1>
  visited: Record<string, 1>
  secsByQ: Record<string, number>
  idx: number
  startedAt: number
  savedAt: number
}

/** Load the saved sitting; null when none, malformed or fully expired. */
export function loadSitting(): ExamSitting | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as ExamSitting
    if (s?.v !== 1 || !Array.isArray(s.paper) || s.paper.length === 0 || !s.preset || !s.meta) {
      localStorage.removeItem(KEY)
      return null
    }
    const durationMs = s.preset.durationMins * 60_000
    if (!Number.isFinite(s.startedAt) || Date.now() - s.startedAt >= durationMs) {
      localStorage.removeItem(KEY)
      return null
    }
    return s
  } catch {
    return null
  }
}

/** Best-effort snapshot (quota/private-mode failures are silent — the
 * sitting simply will not resume). */
export function saveSitting(s: ExamSitting): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function clearSitting(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
