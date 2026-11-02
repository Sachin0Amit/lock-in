'use client'

/**
 * Reader progress — persisted to localStorage via zustand persist.
 * Keys are lesson ids, which are stable forever by contract (types.ts),
 * so progress survives every future content expansion.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const FONT_SCALES = [0.9, 1, 1.1, 1.25] as const

interface ProgressState {
  /** lessonId → completedAt timestamp */
  completed: Record<string, number>
  /** lessonId → present (bookmarked) */
  bookmarks: Record<string, 1>
  lastLessonId: string | null
  fontScale: number
  toggleCompleted: (id: string) => void
  toggleBookmark: (id: string) => void
  setLastLesson: (id: string) => void
  stepFont: (dir: 1 | -1) => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      bookmarks: {},
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
    }),
    { name: 'lockin-progress' },
  ),
)
