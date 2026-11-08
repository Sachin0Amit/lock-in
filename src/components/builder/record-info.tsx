'use client'

/**
 * Client-side lookup from canonical record id → live library lesson info.
 * The tree API is the client mirror of the registry; ~100 records, fetched
 * once per session and shared by the review table, TOC editor and reader.
 */
import { useEffect, useState } from 'react'
import { api, type TreeDisciplineView } from '@/lib/builder/client-api'

export interface RecordInfo {
  recordId: string
  lessonNumber: string
  lessonTitle: string
  chapterTitle: string
  chapterNumber: number
  bookId: string
  bookTitle: string
  location: string
  url: string
  words: number
}

export function useRecordInfo(): { info: Record<string, RecordInfo>; loaded: boolean; error: string | null } {
  const [info, setInfo] = useState<Record<string, RecordInfo>>({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    api<TreeDisciplineView[]>('/api/library/tree')
      .then((tree) => {
        if (cancelled) return
        const map: Record<string, RecordInfo> = {}
        for (const disc of tree) {
          for (const book of disc.books) {
            for (const chapter of book.chapters) {
              for (const lesson of chapter.lessons) {
                map[lesson.recordId] = {
                  recordId: lesson.recordId,
                  lessonNumber: lesson.number,
                  lessonTitle: lesson.title,
                  chapterTitle: chapter.title,
                  chapterNumber: chapter.number,
                  bookId: book.bookId,
                  bookTitle: book.title,
                  location: `${book.title} · Chapter ${chapter.number} · ${chapter.title}`,
                  url: `/book/${book.bookId}/lesson/${lesson.recordId}`,
                  words: lesson.words,
                }
              }
            }
          }
        }
        setInfo(map)
        setLoaded(true)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load library info.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { info, loaded, error }
}
