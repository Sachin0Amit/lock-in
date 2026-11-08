'use client'

/**
 * Revision & Mastery — the ledger sync hook.
 *
 * ONE hook every marking surface uses (library lesson reader, custom-book
 * reader, quiz blocks, chapter quick-mark, revision session). It gates on
 * the auth store: signed out → every call is a silent no-op (the local
 * device progress store remains the fallback); signed in → writes go to
 * the server ledger and the global due-badge refreshes.
 *
 * Quiz results map onto the SRS quality scale (score ratio × 5), so doing
 * well on a lesson quiz IS a revision signal — honestly recorded with
 * kind 'quiz'.
 */
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/components/builder/auth-store'
import { useRevisionBadge } from './revision-store'
import { markStudy } from '@/lib/revision/client-api'
import type { MarkAction, MarkItem, MarkItemResult, MarkRequest } from '@/lib/revision/types'

export interface LedgerSync {
  signedIn: boolean
  /** fire-and-forget batch mark; shows an error toast on failure */
  mark: (
    items: MarkItem | MarkItem[],
    action: MarkAction,
    opts?: { quality?: number; secs?: number; kind?: string; silent?: boolean },
  ) => Promise<MarkItemResult[] | null>
  /** convenience: mark one lesson studied / unmark on toggle-off;
   * returns the mark results so callers can read the new schedule */
  syncLessonComplete: (lessonId: string, completed: boolean) => Promise<MarkItemResult[] | null>
  /** convenience: record a finished quiz as a revision-quality signal */
  logQuiz: (lessonId: string, score: number, total: number) => void
}

export function useLedgerSync(): LedgerSync {
  const user = useAuth((s) => s.user)
  const refreshBadge = useRevisionBadge((s) => s.refresh)

  const mark = useCallback(
    async (
      items: MarkItem | MarkItem[],
      action: MarkAction,
      opts?: { quality?: number; secs?: number; kind?: string; silent?: boolean },
    ) => {
      if (!user) return null
      const list = Array.isArray(items) ? items : [items]
      const results = await markStudy({
        items: list,
        action,
        quality: opts?.quality,
        secs: opts?.secs,
        kind: opts?.kind as MarkRequest['kind'],
      })
      if (results === null && !opts?.silent) {
        toast.error('Could not reach the revision ledger — your change was not saved.')
        return null
      }
      void refreshBadge()
      return results
    },
    [user, refreshBadge],
  )

  const syncLessonComplete = useCallback(
    async (lessonId: string, completed: boolean): Promise<MarkItemResult[] | null> => {
      if (!completed) {
        return mark({ scope: 'lesson', refId: lessonId }, 'unmark', { silent: true })
      }
      return mark({ scope: 'lesson', refId: lessonId }, 'study', {
        kind: 'lesson-complete',
        silent: true,
      })
    },
    [mark],
  )

  const logQuiz = useCallback(
    (lessonId: string, score: number, total: number) => {
      if (total <= 0) return
      const quality = Math.max(0, Math.min(5, Math.round((score / total) * 5)))
      void mark({ scope: 'lesson', refId: lessonId }, 'quiz', { quality, kind: 'quiz', silent: true })
    },
    [mark],
  )

  return {
    signedIn: !!user,
    mark,
    syncLessonComplete,
    logQuiz,
  }
}
