'use client'

/**
 * Revision & Mastery — the ledger sync hook.
 *
 * ONE hook every marking surface uses (library lesson reader, custom-book
 * reader, quiz blocks, chapter quick-mark, revision session). No account
 * needed: every write goes to the local study ledger (a stable local
 * learner identity server-side) and the global due-badge refreshes.
 *
 * Quiz results map onto the SRS quality scale (score ratio × 5), so doing
 * well on a lesson quiz IS a revision signal — honestly recorded with
 * kind 'quiz'.
 */
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useRevisionBadge } from './revision-store'
import { markStudy } from '@/lib/revision/client-api'
import type { MarkAction, MarkItem, MarkItemResult, MarkRequest } from '@/lib/revision/types'

export interface LedgerSync {
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
  const refreshBadge = useRevisionBadge((s) => s.refresh)

  const mark = useCallback(
    async (
      items: MarkItem | MarkItem[],
      action: MarkAction,
      opts?: { quality?: number; secs?: number; kind?: string; silent?: boolean },
    ) => {
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
    [refreshBadge],
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
    mark,
    syncLessonComplete,
    logQuiz,
  }
}
