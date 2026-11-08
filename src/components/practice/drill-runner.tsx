'use client'

/**
 * Practice — the drill runner.
 *
 * Serves one question at a time: MCQs grade instantly with the full
 * explanation; free-response exercises reveal the worked solution and
 * ask for an honest self-mark (got it / missed it). At the end the whole
 * set is submitted once — server-side grading, Mistake Bank cards for
 * every miss, per-lesson quality signals into the study ledger.
 */
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  PartyPopper,
  RotateCcw,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { RichText } from '@/components/library/math'
import { OptionGrid, PromptText, SolutionBody } from './bits'
import { submitPractice } from '@/lib/practice/client-api'
import type {
  AnswerOutcome,
  PaperMeta,
  PracticeQuestion,
  SubmitResponse,
} from '@/lib/practice/types'

interface Props {
  paper: PracticeQuestion[]
  meta: PaperMeta
  onClose: () => void
  onFinished: () => void
}

type Phase = 'answering' | 'done' | 'error'

export function DrillRunner({ paper, meta, onClose, onFinished }: Props) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerOutcome>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResponse | null>(null)
  const [phase, setPhase] = useState<Phase>('answering')
  const startedAt = useRef(Date.now())

  const q = paper[idx]
  const answered = answers[q?.id ?? '']
  const answeredCount = Object.keys(answers).length

  const setOutcome = (questionId: string, outcome: AnswerOutcome) =>
    setAnswers((a) => ({ ...a, [questionId]: outcome }))

  const submit = async () => {
    setSubmitting(true)
    const secs = Math.round((Date.now() - startedAt.current) / 1000)
    const res = await submitPractice({
      kind: 'drill',
      presetKey: meta.presetKey,
      seed: meta.seed,
      secs,
      answers: paper.map((p) => answers[p.id] ?? { questionId: p.id }),
    })
    setSubmitting(false)
    if (!res) {
      toast.error('Could not save the drill — your answers were not recorded.')
      setPhase('error')
      return
    }
    setResult(res)
    setPhase('done')
    onFinished()
  }

  /* ---------------------------------------------------------------- */
  /* Summary                                                          */
  /* ---------------------------------------------------------------- */
  if (phase === 'done' && result) {
    const accuracy = result.correctCount + result.wrongCount > 0
      ? Math.round((result.correctCount / (result.correctCount + result.wrongCount)) * 100)
      : 0
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <PartyPopper className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-reading text-2xl font-bold">Drill complete</h2>
            <p className="text-sm text-muted-foreground">{result.correctCount}/{result.correctCount + result.wrongCount} correct · {accuracy}% accuracy</p>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          {result.mistakesAdded > 0 && (
            <p className="flex flex-wrap items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3 text-sm">
              <ClipboardList className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="font-semibold">{result.mistakesAdded}</span> misse
                {result.mistakesAdded === 1 ? 'd' : 's'} added to your Mistake Bank for spaced review.
              </span>
            </p>
          )}
          {result.ledgerSignals > 0 && (
            <p className="flex flex-wrap items-center gap-2 rounded-lg border px-4 py-3 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Revision schedule updated for {result.ledgerSignals} lesson
                {result.ledgerSignals === 1 ? '' : 's'} — today&apos;s accuracy counts as a quiz signal.
              </span>
            </p>
          )}
        </div>

        {result.breakdown.length > 0 && (
          <section className="mb-6">
            <h3 className="mb-2 font-reading text-base font-bold">Chapters touched</h3>
            <div className="overflow-hidden rounded-xl border">
              {result.breakdown.map((b) => (
                <div key={b.chapterKey} className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-2 text-sm last:border-b-0">
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-medium">
                      {b.bookTitle} — ch. {b.chapterNumber}
                    </span>{' '}
                    <span className="text-muted-foreground">{b.chapterTitle}</span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {b.correct}/{b.correct + b.wrong}
                  </span>
                  <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums">{b.accuracy}%</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2" onClick={onClose}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Build another
          </Button>
          <Button asChild className="gap-2">
            <Link href="/practice">
              <ClipboardList className="h-4 w-4" aria-hidden /> Review mistakes
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="font-reading text-xl font-bold">Save failed</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your answers could not be recorded. You can retry the submit.
        </p>
        <Button className="mt-6 gap-2" onClick={() => void submit()} disabled={submitting}>
          {submitting ? 'Retrying…' : 'Retry save'}
        </Button>
      </div>
    )
  }

  /* ---------------------------------------------------------------- */
  /* Question                                                         */
  /* ---------------------------------------------------------------- */
  const last = idx === paper.length - 1
  const canAdvance = q.kind === 'mcq' ? answered?.chosen !== undefined : !!(answered?.selfWrong || answered?.selfRight)
  const revealMcq = q.kind === 'mcq' && answered?.chosen !== undefined
  const correct = answered?.chosen === q.answerIndex

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress header */}
      <div className="mb-6">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Badge variant="outline" className="font-normal">
              {meta.focusChapters?.length ? 'Adaptive' : 'Drill'}
            </Badge>
            {answeredCount}/{paper.length} answered
          </span>
          <span className="tabular-nums">
            Q{idx + 1} of {paper.length}
          </span>
        </div>
        <Progress value={(answeredCount / paper.length) * 100} className="h-1.5" aria-label="Drill progress" />
      </div>

      {meta.focusChapters && meta.focusChapters.length > 0 && idx === 0 && (
        <div className="mb-6 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">Targeting your weak spots</p>
          <ul className="space-y-1 text-xs leading-5 text-muted-foreground">
            {meta.focusChapters.map((f) => (
              <li key={f.key} className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                <span>
                  <span className="font-medium text-foreground/80">{f.title}</span> — {f.reason.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* question card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-normal">
            {q.lessonNumber} · {q.lessonTitle}
          </Badge>
          {q.level && (
            <Badge variant="secondary" className="font-normal">
              {q.level}
            </Badge>
          )}
          <span className="hidden sm:inline">
            {q.bookTitle} — ch. {q.chapterNumber} · {q.chapterTitle}
          </span>
        </div>

        <PromptText text={q.prompt} className="mb-5 text-base" />

        {q.kind === 'mcq' ? (
          <>
            <OptionGrid
              options={q.options ?? []}
              answerIndex={q.answerIndex ?? 0}
              chosen={answered?.chosen}
              reveal={revealMcq}
              disabled={revealMcq}
              onChoose={(oi) => setOutcome(q.id, { questionId: q.id, chosen: oi })}
            />
            {revealMcq && (
              <div
                className={`mt-3 rounded-md border px-4 py-3 text-sm leading-6 ${
                  correct
                    ? 'border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/30'
                    : 'border-amber-400/60 bg-amber-50/70 dark:bg-amber-950/30'
                }`}
              >
                <p className="mb-1 font-semibold">
                  {correct ? 'Correct.' : 'Not quite — here is the reasoning.'}
                </p>
                {q.explain && (
                  <p className="text-foreground/90">
                    <RichText text={q.explain} />
                  </p>
                )}
                {!correct && (
                  <button
                    type="button"
                    onClick={() =>
                      setAnswers((a) => {
                        const next = { ...a }
                        delete next[q.id]
                        return next
                      })
                    }
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden /> Try again
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <FreeResponse
            q={q}
            answered={answered}
            onMark={(selfWrong) =>
              setOutcome(q.id, {
                questionId: q.id,
                selfWrong,
                selfRight: !selfWrong,
              })
            }
          />
        )}
      </div>

      {/* footer */}
      <div className="mt-5 flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
        >
          Back
        </Button>
        {last ? (
          <Button onClick={() => void submit()} disabled={submitting || answeredCount < paper.length} className="gap-1.5">
            {submitting ? 'Saving…' : 'Finish drill'}
          </Button>
        ) : (
          <Button onClick={() => setIdx((i) => Math.min(paper.length - 1, i + 1))} disabled={!canAdvance} className="gap-1.5">
            Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto gap-1 text-muted-foreground">
          <X className="h-3.5 w-3.5" aria-hidden /> End drill
        </Button>
      </div>
      {last && answeredCount < paper.length && (
        <p className="mt-2 text-xs text-muted-foreground">
          {paper.length - answeredCount} question{paper.length - answeredCount === 1 ? '' : 's'} left unanswered.
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Free-response exercise flow                                         */
/* ------------------------------------------------------------------ */

function FreeResponse({
  q,
  answered,
  onMark,
}: {
  q: PracticeQuestion
  answered?: AnswerOutcome
  onMark: (selfWrong: boolean) => void
}) {
  const selfMarked = !!(answered?.selfWrong || answered?.selfRight)
  const missed = !!answered?.selfWrong
  return (
    <Collapsible defaultOpen={selfMarked}>
      <CollapsibleTrigger className="group inline-flex items-center gap-1 text-sm font-medium text-[var(--book-green-ink)] hover:underline">
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
        Work it out on paper first, then show the solution
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 rounded-md border-l-2 border-[var(--book-green)]/60 bg-[var(--book-sage)]/50 px-4 py-3 text-sm leading-7">
        {q.answerText && (
          <p className="mb-2 font-semibold text-[var(--book-green-ink)]">
            Answer: <RichText text={q.answerText} />
          </p>
        )}
        {q.solution && <SolutionBody solution={q.solution} />}
        <div className="mt-4 border-t border-[var(--book-sage-line)]/60 pt-3">
          {selfMarked ? (
            <p className={`flex items-center gap-1.5 text-sm font-medium ${missed ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
              {missed ? (
                <>
                  <X className="h-4 w-4" aria-hidden /> Marked as missed — added to your Mistake Bank on submit.
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" aria-hidden /> Marked as got it.
                </>
              )}
              <button
                type="button"
                onClick={() => onMark(!missed)}
                className="ml-2 text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                change
              </button>
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => onMark(false)} className="gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden /> I got it
              </Button>
              <Button size="sm" variant="outline" onClick={() => onMark(true)} className="gap-1.5">
                <X className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" aria-hidden /> I missed it
              </Button>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
