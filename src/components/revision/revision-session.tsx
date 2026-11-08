'use client'

/**
 * Revision & Mastery — the guided revision session.
 *
 * Walks the autonomous queue item by item: shows WHY each item is being
 * suggested (overdue days, forgetting risk, weak mastery), lets the user
 * open the material, then records an honest self-rating (Again / Hard /
 * Good / Easy) which feeds the SM-2-lite schedule and immediately shows
 * the next revision date. Keyboard: 1 2 3 4 to rate, → to skip.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, CheckCircle2, ChevronRight, PartyPopper, SkipForward } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatDate, MasteryBar, relDays, daysSinceOrUntil, StateChip } from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import { revisionMinutes } from '@/lib/revision/srs'
import { QUALITY_LABELS, type QueueItem } from '@/lib/revision/types'

const RATINGS: { q: number; hint: string; cls: string }[] = [
  { q: 1, hint: 'Barely remembered', cls: 'border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300' },
  { q: 3, hint: 'Recalled with effort', cls: 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300' },
  { q: 4, hint: 'Recalled well', cls: 'border-teal-500/50 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300' },
  { q: 5, hint: 'Instant recall', cls: 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
]

interface Props {
  queue: QueueItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSessionDone: () => void
}

export function RevisionSession({ queue, open, onOpenChange, onSessionDone }: Props) {
  const { mark } = useLedgerSync()
  const [index, setIndex] = useState(0)
  const [rated, setRated] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [clearedMins, setClearedMins] = useState(0)
  const [busy, setBusy] = useState(false)
  const [finished, setFinished] = useState(false)

  const item = queue[index]

  const advance = useCallback(() => {
    setIndex((i) => {
      if (i + 1 >= queue.length) {
        setFinished(true)
        return i
      }
      return i + 1
    })
  }, [queue.length])

  const rate = useCallback(
    async (q: number) => {
      if (!item || busy) return
      setBusy(true)
      const results = await mark(
        { scope: item.scope, refId: item.refId },
        'revise',
        { quality: q, kind: 'revision' },
      )
      setBusy(false)
      const r = results?.[0]
      if (r?.ok) {
        setRated((n) => n + 1)
        setClearedMins((m) => m + revisionMinutes(item.readMins))
        toast.success(`${QUALITY_LABELS[q] ?? 'Rated'} — next revision ${r.entry ? formatDate(r.entry.dueAt) : 'scheduled'}`, {
          description: `${item.label}`,
        })
        advance()
      }
    },
    [item, busy, mark, advance],
  )

  const skip = useCallback(() => {
    if (!item) return
    setSkipped((n) => n + 1)
    advance()
  }, [item, advance])

  /** fresh session state — event handler, safe to set state */
  const restart = useCallback(() => {
    setIndex(0)
    setRated(0)
    setSkipped(0)
    setClearedMins(0)
    setFinished(false)
  }, [])

  /* keyboard: 1-4 rate, arrow-right skip */
  useEffect(() => {
    if (!open || finished || !item) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [role="dialog"] [data-radix-focus-guard]')) return
      if (e.key === '1') void rate(1)
      else if (e.key === '2') void rate(3)
      else if (e.key === '3') void rate(4)
      else if (e.key === '4') void rate(5)
      else if (e.key === 'ArrowRight') skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, finished, item, rate, skip])

  if (!open) return null

  const total = queue.length
  const done = rated + skipped

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guided revision session"
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onSessionDone()
          onOpenChange(false)
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border bg-card shadow-xl sm:rounded-xl">
        {/* header */}
        <div className="border-b px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-reading text-lg font-bold">
              {finished ? 'Session complete' : 'Revision session'}
            </h2>
            {!finished && (
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {Math.min(done + 1, total)} / {total}
              </span>
            )}
          </div>
          {!finished && (
            <div className="mt-3">
              <Progress value={total ? (done / total) * 100 : 0} className="h-1.5" aria-label="Session progress" />
            </div>
          )}
        </div>

        {finished ? (
          <div className="px-5 py-8 text-center sm:px-6">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <PartyPopper className="h-6 w-6" aria-hidden />
            </span>
            <p className="font-reading text-xl font-bold">
              {rated > 0 ? `${rated} revision${rated === 1 ? '' : 's'} logged` : 'No revisions rated'}
              {skipped > 0 ? ` · ${skipped} skipped` : ''}
            </p>
            {clearedMins > 0 && (
              <p className="mt-1.5 text-sm text-muted-foreground">
                ≈ {clearedMins} min of revision work cleared from your schedule. New dates are set —
                the queue will re-rank itself honestly.
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => {
                  onSessionDone()
                  onOpenChange(false)
                }}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Back to the hub
              </Button>
              {queue.length > 0 && (
                <Button variant="outline" onClick={restart} className="gap-2">
                  Run the session again
                </Button>
              )}
            </div>
          </div>
        ) : item ? (
          <div className="px-5 py-6 sm:px-6">
            {/* the item */}
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {item.bookTitle}
            </p>
            <h3 className="mt-1 font-reading text-xl font-bold leading-snug">{item.label}</h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StateChip state={item.state} />
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                revised {item.passes}×
              </span>
              <span className="text-xs text-muted-foreground">
                last {relDays(daysSinceOrUntil(item.lastAt).n, true)}
              </span>
            </div>

            {/* why now */}
            <div className="mt-4 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3">
              <p className="text-sm font-semibold">Why revise this now</p>
              <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{item.reason}</p>
              {item.overdueDays > 0 && (
                <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400 tabular-nums">
                  Overdue by {item.overdueDays} day{item.overdueDays === 1 ? '' : 's'} · due{' '}
                  {formatDate(item.dueAt)}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Mastery {item.mastery}/100 · forgetting risk {item.risk}%</span>
                <span className="tabular-nums">≈ {revisionMinutes(item.readMins)} min</span>
              </div>
              <MasteryBar mastery={item.mastery} state={item.state} />
            </div>

            {/* actions */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                How well did you recall it? <span className="font-normal">(keys 1–4)</span>
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RATINGS.map((r, i) => (
                  <button
                    key={r.q}
                    type="button"
                    disabled={busy}
                    onClick={() => void rate(r.q)}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${r.cls}`}
                  >
                    <span>{QUALITY_LABELS[r.q]}</span>
                    <span className="text-[10px] font-normal opacity-80">{r.hint}</span>
                    <span className="sr-only">keyboard {i + 1}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link href={item.url} target="_blank" rel="noreferrer">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open the material
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={skip} className="gap-1.5">
                    <SkipForward className="h-3.5 w-3.5" aria-hidden /> Skip
                    <ChevronRight className="h-3 w-3" aria-hidden />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onSessionDone()
                      onOpenChange(false)
                    }}
                  >
                    End session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground sm:px-6">
            Nothing needs revision right now — everything is fresh.
          </div>
        )}
      </div>
    </div>
  )
}
