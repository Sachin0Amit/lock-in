'use client'

/**
 * Revision & Mastery — the header badge: an autonomous prompt surface.
 *
 * Shows "N due" whenever spaced repetition has something waiting, linking
 * straight into the Revision Hub. Invisible when nothing is due (no
 * clutter). Works without an account — everyone has a study ledger.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { BrainCircuit } from 'lucide-react'
import { useRevisionBadge } from './revision-store'

export function RevisionDueChip() {
  const summary = useRevisionBadge((s) => s.summary)
  const refresh = useRevisionBadge((s) => s.refresh)

  useEffect(() => {
    void refresh()
  }, [refresh])

  const due = summary?.dueCount ?? 0

  if (due <= 0) return null

  return (
    <Link
      href="/revision"
      className="mr-1 hidden items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300 sm:inline-flex"
      title={`${due} chapter${due === 1 ? '' : 's'} due for revision — open the Revision Hub`}
    >
      <BrainCircuit className="h-3.5 w-3.5" aria-hidden />
      <span className="tabular-nums">{due}</span>
      <span className="sr-only">items due for revision</span>
      <span aria-hidden>due</span>
    </Link>
  )
}
