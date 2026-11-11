'use client'

/**
 * Highlighter store — the reader's private, multi-colour highlights.
 *
 * Owner directive 2026-11-11: "add feature to highlight of text with
 * different color highlighter advanced features" (PROPOSED_FEATURES ST-02's
 * highlighting half, upgraded to a full highlighter). Persistence follows the
 * bookmarks pattern: device-local via zustand persist, no account needed.
 *
 * Each highlight is anchored to one rendered `data-hl` host (a RichText
 * string inside one lesson — see math.tsx) by character offsets in that
 * host's rendered text, so quiz/exercise interactivity elsewhere in a block
 * can never shift a highlight. The captured plain text is stored too, so
 * the highlights panel can always show (and jump to) the quote even if a
 * later content edit moves the paint target.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple' | 'orange'

export interface Highlight {
  id: string
  /** the lesson the highlight belongs to (lesson ids are stable forever) */
  lessonId: string
  /** anchor: the `data-hl` host key inside that lesson, e.g. "12.p" */
  host: string
  /** character range in the host's rendered text (start < end) */
  start: number
  end: number
  /** the plain text that was selected, kept for the panel + repaint sanity */
  text: string
  color: HighlightColor
  /** optional private note attached to the highlight */
  note?: string
  createdAt: number
}

/** UI metadata for the palette — swatch classes live in globals.css. */
export const HIGHLIGHT_COLORS: { id: HighlightColor; label: string }[] = [
  { id: 'yellow', label: 'Yellow' },
  { id: 'green', label: 'Green' },
  { id: 'blue', label: 'Blue' },
  { id: 'pink', label: 'Pink' },
  { id: 'purple', label: 'Purple' },
  { id: 'orange', label: 'Orange' },
]

function newId(): string {
  return `hl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

interface HighlightState {
  /** lessonId → highlightId → highlight (stable per-lesson reference for
   *  the painter + panel selectors) */
  byLesson: Record<string, Record<string, Highlight>>
  /** create a highlight; returns its id */
  add: (h: Omit<Highlight, 'id' | 'createdAt'>) => string
  setColor: (id: string, color: HighlightColor) => void
  setNote: (id: string, note: string) => void
  remove: (id: string) => void
  clearLesson: (lessonId: string) => void
}

/** stable empty record for selectors so React re-renders stay honest */
const EMPTY: Record<string, Highlight> = {}

/** highlights of one lesson, as a stable reference (EMPTY when none) */
export const lessonHighlights = (s: HighlightState, lessonId: string) =>
  s.byLesson[lessonId] ?? EMPTY

export const useHighlightStore = create<HighlightState>()(
  persist(
    (set) => ({
      byLesson: {},
      add: (h) => {
        const id = newId()
        const full: Highlight = { ...h, id, createdAt: Date.now() }
        set((s) => ({
          byLesson: {
            ...s.byLesson,
            [h.lessonId]: { ...(s.byLesson[h.lessonId] ?? {}), [id]: full },
          },
        }))
        return id
      },
      setColor: (id, color) =>
        set((s) => {
          const byLesson: Record<string, Record<string, Highlight>> = {}
          let changed = false
          for (const [lessonId, rec] of Object.entries(s.byLesson)) {
            if (id in rec) {
              const hl = rec[id]
              byLesson[lessonId] = { ...rec, [id]: { ...hl, color } }
              changed = true
            } else {
              byLesson[lessonId] = rec
            }
          }
          return changed ? { byLesson } : {}
        }),
      setNote: (id, note) =>
        set((s) => {
          const byLesson: Record<string, Record<string, Highlight>> = {}
          let changed = false
          for (const [lessonId, rec] of Object.entries(s.byLesson)) {
            if (id in rec) {
              const hl = rec[id]
              byLesson[lessonId] = {
                ...rec,
                [id]: { ...hl, note: note.trim() ? note.trim() : undefined },
              }
              changed = true
            } else {
              byLesson[lessonId] = rec
            }
          }
          return changed ? { byLesson } : {}
        }),
      remove: (id) =>
        set((s) => {
          const byLesson: Record<string, Record<string, Highlight>> = {}
          let changed = false
          for (const [lessonId, rec] of Object.entries(s.byLesson)) {
            if (id in rec) {
              const next = { ...rec }
              delete next[id]
              byLesson[lessonId] = next
              changed = true
            } else {
              byLesson[lessonId] = rec
            }
          }
          return changed ? { byLesson } : {}
        }),
      clearLesson: (lessonId) =>
        set((s) => {
          if (!s.byLesson[lessonId]) return {}
          const next = { ...s.byLesson }
          delete next[lessonId]
          return { byLesson: next }
        }),
    }),
    { name: 'lockin-highlights', version: 1 },
  ),
)
