'use client'

/**
 * Reader progress — persisted to localStorage via zustand persist.
 * Keys are lesson ids, which are stable forever by contract (types.ts),
 * so progress survives every future content expansion.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const FONT_SCALES = [0.9, 1, 1.1, 1.25] as const

interface QuizScore {
  best: number
  total: number
}

interface ProgressState {
  /** lessonId → completedAt timestamp */
  completed: Record<string, number>
  /** lessonId → present (bookmarked) */
  bookmarks: Record<string, 1>
  /** lessonId → best quiz score achieved */
  quizBest: Record<string, QuizScore>
  /** flashcard key (`bookId::term`) → present, marked "I know this" */
  knownTerms: Record<string, 1>
  lastLessonId: string | null
  fontScale: number
  toggleCompleted: (id: string) => void
  toggleBookmark: (id: string) => void
  setLastLesson: (id: string) => void
  stepFont: (dir: 1 | -1) => void
  /** record a finished quiz attempt; keeps the best score */
  recordQuiz: (lessonId: string, score: number, total: number) => void
  toggleTermKnown: (key: string) => void
  resetKnownTerms: (prefix: string) => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      bookmarks: {},
      quizBest: {},
      knownTerms: {},
      lastLessonId: null,
      fontScale: 1,
      toggleCompleted: (id) =>
        set((s) => {
          const next = { ...s.completed }
          if (next[id]) delete next[id]
          else next[id] = Date.now()
          return { completed: next }
        }),
      toggleBookmark: (id) =>
        set((s) => {
          const next = { ...s.bookmarks }
          if (next[id]) delete next[id]
          else next[id] = 1
          return { bookmarks: next }
        }),
      setLastLesson: (id) => set({ lastLessonId: id }),
      stepFont: (dir) =>
        set((s) => {
          const idx = FONT_SCALES.indexOf(s.fontScale as (typeof FONT_SCALES)[number])
          const safeIdx = idx === -1 ? 1 : idx
          const next = Math.min(FONT_SCALES.length - 1, Math.max(0, safeIdx + dir))
          return { fontScale: FONT_SCALES[next] }
        }),
      recordQuiz: (lessonId, score, total) =>
        set((s) => {
          const prev = s.quizBest[lessonId]
          if (prev && prev.best >= score) return {}
          return { quizBest: { ...s.quizBest, [lessonId]: { best: score, total } } }
        }),
      toggleTermKnown: (key) =>
        set((s) => {
          const next = { ...s.knownTerms }
          if (next[key]) delete next[key]
          else next[key] = 1
          return { knownTerms: next }
        }),
      resetKnownTerms: (prefix) =>
        set((s) => {
          const next: Record<string, 1> = {}
          for (const k of Object.keys(s.knownTerms)) if (!k.startsWith(prefix)) next[k] = 1
          return { knownTerms: next }
        }),
    }),
    { name: 'lockin-progress', version: 2 },
  ),
)

/* ---------------------------------------------------------------- */
/* Derived helpers                                                    */
/* ---------------------------------------------------------------- */

const dayKey = (ts: number) => {
  const d = new Date(ts)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/**
 * Consecutive-day learning streak, counting back from today (or yesterday,
 * so an alive streak isn't reset at midnight). A day counts when at least
 * one lesson was completed on it.
 */
export function computeStreak(completed: Record<string, number>): number {
  const days = new Set(Object.values(completed).map(dayKey))
  if (days.size === 0) return 0
  const cursor = new Date()
  if (!days.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
