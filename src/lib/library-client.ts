/**
 * Client-side lesson index — the ONLY library data a client component
 * may fetch. It is navigational metadata (lesson id, book, number,
 * title, word count) served by /api/library/index from the content
 * database; no lesson content ever crosses this line.
 *
 * Used by the command palette (resume row, random lesson, recently
 * written) so the palette no longer imports the TS registry — which
 * used to ship the entire library inside the browser bundle.
 */
import { useEffect, useState } from 'react'

export interface LessonStubView {
  id: string
  bookId: string
  bookTitle: string
  number: string
  title: string
  words: number
}

let pending: Promise<LessonStubView[]> | null = null

/** Fetch the stub index once per session; retryable on failure. */
export function loadLessonStubs(): Promise<LessonStubView[]> {
  if (!pending) {
    pending = fetch('/api/library/index')
      .then((r) => {
        if (!r.ok) throw new Error(`library index ${r.status}`)
        return r.json() as Promise<{ lessons: LessonStubView[] }>
      })
      .then((data) => data.lessons ?? [])
      .catch((err) => {
        pending = null // allow a later retry
        throw err
      })
  }
  return pending
}

/** React hook: the stub index, empty until it arrives. */
export function useLessonStubs(): LessonStubView[] {
  const [stubs, setStubs] = useState<LessonStubView[]>([])
  useEffect(() => {
    let cancelled = false
    loadLessonStubs()
      .then((s) => {
        if (!cancelled) setStubs(s)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return stubs
}
