'use client'

/**
 * Revision & Mastery — the guided revision session (retrieval-practice
 * edition).
 *
 * The session now closes the recall loop it was missing. Each queue item
 * is tested with real retrieval cards cut from the lesson's own content
 * (GET /api/revision/recall — terms, formulas, worked examples, quiz
 * questions, exercises) before any rating is accepted:
 *
 *  1. a card front is shown (definition to state, formula to recall,
 *     quiz question to answer, worked example to re-derive);
 *  2. quiz cards are ANSWERED — correctness maps onto the SRS quality
 *     scale (correct = Good, wrong = Again), no self-report involved;
 *  3. every other card is revealed first, then rated (Again/Hard/Good/
 *     Easy) — the rating row stays disabled until the answer is seen,
 *     so blind "Good" clicks are impossible;
 *  4. the item's ledger rating is its WEAKEST card — the honest
 *     conservative choice, since memory is limited by the shakiest
 *     retrieval;
 *  5. items rated Again are re-tested later in the SAME session
 *     (once), because a second retrieval the same day is exactly what
 *     a lapse needs.
 *
 * Keyboard: 1–4 rate the visible card, Space reveals / continues, →
 * skips the item.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Eye,
  PartyPopper,
  SkipForward,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RichText } from '@/components/library/math'
import { formatDate, MasteryBar, relDays, daysSinceOrUntil, StateChip } from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import { fetchRecallDeck } from '@/lib/revision/client-api'
import { revisionMinutes } from '@/lib/revision/srs'
import { QUALITY_LABELS, type QueueItem, type RecallCard, type RecallDeck } from '@/lib/revision/types'

const RATINGS: { q: number; hint: string; cls: string }[] = [
  { q: 1, hint: 'Barely remembered', cls: 'border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300' },
  { q: 3, hint: 'Recalled with effort', cls: 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300' },
  { q: 4, hint: 'Recalled well', cls: 'border-teal-500/50 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300' },
  { q: 5, hint: 'Instant recall', cls: 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
]

const KIND_LABELS: Record<RecallCard['kind'], string> = {
  term: 'Definition',
  formula: 'Formula',
  example: 'Worked example',
  quiz: 'Quiz',
  exercise: 'Exercise',
}

interface FlowEntry {
  item: QueueItem
  /** true when this entry was re-queued after an "Again" this session */
  repeat: boolean
}

interface Props {
  queue: QueueItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSessionDone: () => void
}

/* ------------------------------------------------------------------ */
/* The recall surface for ONE item. Remounts per item (keyed by scope, */
/* refId and re-test flag) so its card state is always fresh — no     */
/* cross-item leakage, no reset effects.                               */
/* ------------------------------------------------------------------ */

function ItemCards({
  item,
  busy,
  onComplete,
}: {
  item: QueueItem
  busy: boolean
  /** (quality, fromCards, cardCount) → the session commits the ledger mark */
  onComplete: (quality: number, fromCards: boolean, cardCount: number) => void
}) {
  const [deck, setDeck] = useState<RecallDeck | null>(null)
  const [settled, setSettled] = useState(false)
  const [cardIdx, setCardIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const [cardRatings, setCardRatings] = useState<number[]>([])
  /* fallback path (no authored cards) needs its own honesty gate */
  const [thoughtThrough, setThoughtThrough] = useState(false)

  /* fetch the deck — state settles inside the async callbacks only */
  useEffect(() => {
    let alive = true
    fetchRecallDeck(item.scope, item.refId)
      .then((d) => {
        if (!alive) return
        setDeck(d && d.cards.length > 0 ? d : null)
        setSettled(true)
      })
      .catch(() => {
        if (!alive) return
        setDeck(null)
        setSettled(true)
      })
    return () => {
      alive = false
    }
  }, [item.scope, item.refId])

  const cards = deck?.cards ?? []
  const card = cards[cardIdx]
  const cardTotal = cards.length
  const isQuizCard = !!(card && card.options && card.answer !== undefined)
  const loading = !settled

  const rateCard = useCallback(
    (q: number) => {
      if (!deck || busy) return
      const nextRatings = [...cardRatings, q]
      setCardRatings(nextRatings)
      if (cardIdx + 1 < deck.cards.length) {
        setCardIdx(cardIdx + 1)
        setRevealed(false)
        setPicked(null)
      } else {
        const weakest = Math.min(...nextRatings)
        onComplete(weakest, true, deck.cards.length)
      }
    },
    [deck, busy, cardRatings, cardIdx, onComplete],
  )

  /** quiz cards: answering IS the rating — correct = Good, wrong = Again */
  const pickOption = useCallback(
    (oi: number) => {
      if (!card || !isQuizCard || picked !== null) return
      setPicked(oi)
      setRevealed(true)
    },
    [card, isQuizCard, picked],
  )

  const nextCard = useCallback(() => {
    if (!card || !isQuizCard || picked === null) return
    rateCard(picked === card.answer ? 4 : 1)
  }, [card, isQuizCard, picked, rateCard])

  /* keyboard: Space reveal / continue, 1–4 rate */
  const canRateCard = !!card && !isQuizCard && revealed && !busy
  const canRateFallback = !deck && settled && thoughtThrough && !busy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [role="dialog"] [data-radix-focus-guard]')) return
      if (e.key === ' ') {
        e.preventDefault()
        if (card && isQuizCard && picked !== null) nextCard()
        else if (card && !isQuizCard && !revealed) setRevealed(true)
        else if (settled && !deck && !thoughtThrough) setThoughtThrough(true)
        return
      }
      const map: Record<string, number> = { 1: 0, 2: 1, 3: 2, 4: 3 }
      const ri = map[e.key]
      if (ri !== undefined) {
        if (canRateCard) rateCard(RATINGS[ri].q)
        else if (canRateFallback) onComplete(RATINGS[ri].q, false, 0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [card, isQuizCard, picked, revealed, deck, settled, thoughtThrough, canRateCard, canRateFallback, nextCard, rateCard, onComplete])

  return (
    <div className="mt-4 rounded-xl border bg-background/60 p-4 sm:p-5">
      {loading ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Preparing recall cards from the lesson itself…
        </p>
      ) : card ? (
        <div>
          {/* card header */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-0.5 font-semibold text-primary">
              {KIND_LABELS[card.kind]}
            </span>
            <span className="tabular-nums">
              card {cardIdx + 1} of {cardTotal}
            </span>
            <Link
              href={card.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto min-w-0 truncate underline-offset-2 hover:underline"
            >
              from {card.sourceLabel}
            </Link>
          </div>

          {/* front */}
          <p className="font-medium leading-7 text-foreground">
            <RichText text={card.prompt} />
          </p>

          {/* quiz card — answerable */}
          {isQuizCard && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {card.options!.map((opt, oi) => {
                const isAnswer = oi === card.answer
                const isPicked = picked === oi
                let cls = 'border-border bg-card hover:border-primary/50 hover:bg-accent/60 text-foreground'
                if (picked !== null && isAnswer)
                  cls = 'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                else if (picked !== null && isPicked)
                  cls = 'border-rose-500/70 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                else if (picked !== null) cls = 'border-border bg-card opacity-60'
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => pickOption(oi)}
                    className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3.5 py-2 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <RichText text={opt} />
                  </button>
                )
              })}
            </div>
          )}

          {/* back */}
          {revealed && (
            <div className="mt-4 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {isQuizCard ? (picked === card.answer ? 'Correct' : 'Not this one') : 'The lesson says'}
              </p>
              {isQuizCard ? (
                <p className="mt-1 text-sm leading-6">
                  <RichText text={card.explain ?? card.reveal} />
                </p>
              ) : (
                <div className="mt-1 space-y-1.5 text-sm leading-6">
                  <p>
                    <RichText text={card.reveal} />
                  </p>
                  {card.revealLines?.map((line, li) => (
                    <p key={li} className={li === 0 ? '' : 'text-muted-foreground'}>
                      <RichText text={line} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* card actions */}
          <div className="mt-4">
            {isQuizCard ? (
              picked !== null && (
                <>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">
                    {picked === card.answer
                      ? 'Logged as a Good recall — ready for the next card?'
                      : 'Logged as Again — the schedule will treat this honestly.'}{' '}
                    <span className="font-normal">(Space)</span>
                  </p>
                  <Button onClick={nextCard} className="gap-1.5" disabled={busy}>
                    {cardIdx + 1 < cardTotal ? 'Next card' : 'Finish this item'}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Button>
                </>
              )
            ) : revealed ? (
              <>
                <p className="mb-2 text-xs font-semibold text-muted-foreground">
                  How well did you recall it? <span className="font-normal">(keys 1–4)</span>
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {RATINGS.map((r, i) => (
                    <button
                      key={r.q}
                      type="button"
                      disabled={busy}
                      onClick={() => rateCard(r.q)}
                      className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${r.cls}`}
                    >
                      <span>{QUALITY_LABELS[r.q]}</span>
                      <span className="text-[10px] font-normal opacity-80">{r.hint}</span>
                      <span className="sr-only">keyboard {i + 1}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <Button variant="outline" onClick={() => setRevealed(true)} className="gap-2">
                <Eye className="h-4 w-4" aria-hidden /> Show answer
                <span className="text-xs font-normal opacity-70">(Space)</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* fallback: no authored cards to cut — honest self-rating */
        <div>
          <p className="text-sm leading-6 text-muted-foreground">
            This item has no recall cards to cut yet. Spend a moment retrieving it from memory —
            then rate honestly.
          </p>
          <div className="mt-3 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3">
            <p className="text-sm font-semibold">Why revise this now</p>
            <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{item.reason}</p>
            {item.overdueDays > 0 && (
              <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400 tabular-nums">
                Overdue by {item.overdueDays} day{item.overdueDays === 1 ? '' : 's'} · due{' '}
                {formatDate(item.dueAt)}
              </p>
            )}
          </div>
          {thoughtThrough ? (
            <>
              <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">
                How well did you recall it? <span className="font-normal">(keys 1–4)</span>
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RATINGS.map((r, i) => (
                  <button
                    key={r.q}
                    type="button"
                    disabled={busy}
                    onClick={() => onComplete(r.q, false, 0)}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${r.cls}`}
                  >
                    <span>{QUALITY_LABELS[r.q]}</span>
                    <span className="text-[10px] font-normal opacity-80">{r.hint}</span>
                    <span className="sr-only">keyboard {i + 1}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <Button variant="outline" onClick={() => setThoughtThrough(true)} className="mt-4 gap-2">
              <Eye className="h-4 w-4" aria-hidden /> I&apos;ve thought it through — rate me
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The session shell                                                    */
/* ------------------------------------------------------------------ */

export function RevisionSession({ queue, open, onOpenChange, onSessionDone }: Props) {
  const { mark } = useLedgerSync()

  /* session flow — the queue plus (at most once per item) re-tests */
  const [flow, setFlow] = useState<FlowEntry[]>(() => queue.map((item) => ({ item, repeat: false })))
  const [flowIdx, setFlowIdx] = useState(0)
  const [repeatsDone, setRepeatsDone] = useState<Set<string>>(new Set())
  const [retested, setRetested] = useState(0)

  const [rated, setRated] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [clearedMins, setClearedMins] = useState(0)
  const [busy, setBusy] = useState(false)
  const [finished, setFinished] = useState(false)

  const entry = flow[flowIdx]
  const item = entry?.item

  /**
   * Commit one item's ledger rating. `quality` is the weakest-card rating
   * when cards were answered (evidence-based) or the learner's own pick
   * on the fallback path. An "Again" re-tests the item later in this
   * session — once; the ledger only ever sees one honest event.
   */
  const completeItem = useCallback(
    async (quality: number, fromCards: boolean, cardCount: number) => {
      if (!item || busy) return
      setBusy(true)
      const results = await mark(
        { scope: item.scope, refId: item.refId },
        'revise',
        { quality, kind: 'revision' },
      )
      setBusy(false)
      const r = results?.[0]
      if (!r?.ok) return

      setRated((n) => n + 1)
      setClearedMins((m) => m + revisionMinutes(item.readMins))
      toast.success(
        `${QUALITY_LABELS[quality] ?? 'Rated'} — next revision ${r.entry ? formatDate(r.entry.dueAt) : 'scheduled'}`,
        {
          description: fromCards
            ? `${item.label} · rated from your weakest of ${cardCount} card${cardCount === 1 ? '' : 's'}`
            : `${item.label} · your own rating`,
        },
      )

      const refKey = `${item.scope}:${item.refId}`
      const reQueue = quality <= 2 && !repeatsDone.has(refKey)
      if (reQueue) {
        /* re-test ~3 steps later (or at the end) inside this session — a
         * second retrieval the same day is exactly what a lapse needs */
        const at = Math.min(flowIdx + 3, flow.length)
        setFlow((f) => {
          const next = [...f]
          next.splice(at, 0, { item, repeat: true })
          return next
        })
        setRepeatsDone((s) => new Set(s).add(refKey))
        setRetested((n) => n + 1)
        toast.info("We'll re-test this one before the session ends.", {
          description: `${item.label} — a second retrieval today is the fix for "Again".`,
        })
      }
      /* advance against the POST-insert length (a plain advance() closure
       * would be stale by one after the splice) */
      const newLen = flow.length + (reQueue ? 1 : 0)
      setFlowIdx((i) => {
        if (i + 1 >= newLen) {
          setFinished(true)
          return i
        }
        return i + 1
      })
    },
    [item, busy, mark, repeatsDone, flowIdx, flow.length],
  )

  const skip = useCallback(() => {
    if (!item) return
    setSkipped((n) => n + 1)
    setFlowIdx((i) => {
      if (i + 1 >= flow.length) {
        setFinished(true)
        return i
      }
      return i + 1
    })
  }, [item, flow.length])

  /** fresh session state — event handler, safe to set state */
  const restart = useCallback(() => {
    setFlow(queue.map((q) => ({ item: q, repeat: false })))
    setFlowIdx(0)
    setRepeatsDone(new Set())
    setRetested(0)
    setRated(0)
    setSkipped(0)
    setClearedMins(0)
    setFinished(false)
  }, [queue])

  /* keyboard: → skips the item (card keys live in ItemCards) */
  useEffect(() => {
    if (!open || finished || !item) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [role="dialog"] [data-radix-focus-guard]')) return
      if (e.key === 'ArrowRight') skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, finished, item, skip])

  if (!open) return null

  const total = flow.length
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
                {entry?.repeat ? ' · re-test' : ''}
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
              {retested > 0 ? ` · ${retested} re-tested` : ''}
            </p>
            {clearedMins > 0 && (
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                ≈ {clearedMins} min of revision work cleared from your schedule — every rating came
                from an actual retrieval, so the new dates are set on evidence. The queue will
                re-rank itself honestly.
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
              {entry?.repeat ? ' · re-test' : ''}
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
              <span className="text-xs text-muted-foreground">
                · mastery {item.mastery}/100 · forgetting risk {item.risk}%
              </span>
            </div>

            {/* the recall surface — fresh card state per item */}
            <ItemCards
              key={`${item.scope}:${item.refId}:${entry?.repeat ? 'r' : 'n'}`}
              item={item}
              busy={busy}
              onComplete={(q, fromCards, cardCount) => void completeItem(q, fromCards, cardCount)}
            />

            {/* item footer */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Item mastery {item.mastery}/100</span>
                <span className="tabular-nums">≈ {revisionMinutes(item.readMins)} min</span>
              </div>
              <MasteryBar mastery={item.mastery} state={item.state} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
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
        ) : (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground sm:px-6">
            Nothing needs revision right now — everything is fresh.
          </div>
        )}
      </div>
    </div>
  )
}
