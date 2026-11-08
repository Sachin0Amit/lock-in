'use client'

/**
 * Practice — the mock-exam runner.
 *
 * A full-screen timed paper: countdown (auto-submit at zero), question
 * palette with answered / marked-for-review states, keyboard navigation
 * (←/→ and 1..4), honest negative marking graded server-side, and a
 * results view with the per-chapter weakness breakdown. Wrong answers
 * are sent to the Mistake Bank by the submit endpoint — the results view
 * says exactly how many landed there.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Flag,
  RotateCcw,
  Send,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RichText } from '@/components/library/math'
import { formatClock, OptionGrid, PromptText } from './bits'
import { submitPractice } from '@/lib/practice/client-api'
import type {
  AnswerOutcome,
  ChapterBreakdown,
  ExamPresetView,
  PaperMeta,
  PracticeQuestion,
  QuestionResult,
  SubmitResponse,
} from '@/lib/practice/types'

interface Props {
  preset: ExamPresetView
  paper: PracticeQuestion[]
  meta: PaperMeta
  onClose: () => void
  onFinished: () => void
  onRestart: () => void
}

export function ExamRunner({ preset, paper, meta, onClose, onFinished, onRestart }: Props) {
  const total = paper.length
  const durationSecs = preset.durationMins * 60

  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [marked, setMarked] = useState<Record<string, 1>>({})
  const [secsLeft, setSecsLeft] = useState(durationSecs)
  const [confirming, setConfirming] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResponse | null>(null)
  const startedAt = useRef(Date.now())
  const submittedRef = useRef(false)

  const q = paper[idx]
  const answeredCount = Object.keys(answers).length

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current) return
      submittedRef.current = true
      setSubmitting(true)
      setConfirming(false)
      const elapsed = auto
        ? durationSecs
        : Math.round((Date.now() - startedAt.current) / 1000)
      const payload: AnswerOutcome[] = paper.map((p) => ({
        questionId: p.id,
        chosen: answers[p.id],
      }))
      const res = await submitPractice({
        kind: 'exam',
        presetKey: preset.key,
        seed: meta.seed,
        secs: elapsed,
        answers: payload,
      })
      setSubmitting(false)
      if (!res) {
        submittedRef.current = false
        setResult(null)
        return
      }
      setResult(res)
      onFinished()
    },
    [answers, durationSecs, meta.seed, onFinished, paper, preset.key],
  )

  /* the countdown — auto-submits at zero, honestly labelling the time */
  useEffect(() => {
    if (result) return
    const t = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          void submit(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [result, submit])

  /* keyboard: ←/→ navigate, 1..4 choose, M mark */
  useEffect(() => {
    if (result) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [role="dialog"]'))
        return
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight') setIdx((i) => Math.min(total - 1, i + 1))
      else if (/^[1-4]$/.test(e.key) && q?.options && q.options.length >= Number(e.key)) {
        setAnswers((a) => ({ ...a, [q.id]: Number(e.key) - 1 }))
      } else if (e.key.toLowerCase() === 'm') {
        setMarked((m) => {
          const next = { ...m }
          if (next[q.id]) delete next[q.id]
          else next[q.id] = 1
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, q, result, total])

  if (result) {
    return (
      <ExamResults
        preset={preset}
        result={result}
        secsUsed={secsLeft}
        onClose={onClose}
        onRestart={onRestart}
      />
    )
  }

  const late = secsLeft <= 60

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      {/* exam header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-reading text-sm font-bold">{preset.name}</p>
            <p className="text-xs text-muted-foreground">
              {total} questions · +{preset.marks} / −{preset.negative} per answer · exam-style
            </p>
          </div>
          <div
            className={`ml-auto flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-reading text-lg font-bold tabular-nums ${
              late ? 'border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-300' : 'border-border'
            }`}
            role="timer"
            aria-label={`Time left ${formatClock(secsLeft)}`}
          >
            <Clock3 className="h-4 w-4" aria-hidden />
            {formatClock(secsLeft)}
          </div>
          <Button
            onClick={() => {
              if (answeredCount < total) setConfirming(true)
              else void submit()
            }}
            disabled={submitting}
            className="gap-1.5"
          >
            <Send className="h-4 w-4" aria-hidden />
            {submitting ? 'Submitting…' : 'Submit paper'}
          </Button>
        </div>
        <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 pb-2 text-xs text-muted-foreground sm:px-6">
          <span className="tabular-nums">
            answered {answeredCount}/{total}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }}
            />
          </div>
          <span className="tabular-nums">
            Q{idx + 1} of {total}
          </span>
        </div>
        {confirming && (
          <div className="mx-auto mb-2 flex max-w-4xl flex-wrap items-center gap-2 rounded-md border border-amber-400/50 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:px-6">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
            <span>
              {total - answeredCount} unanswered — unattempted questions score 0, wrong answers cost{' '}
              {preset.negative} mark{preset.negative === 1 ? '' : 's'}.
            </span>
            <Button size="sm" variant="outline" className="ml-auto h-7" onClick={() => setConfirming(false)}>
              Keep going
            </Button>
            <Button size="sm" className="h-7" onClick={() => void submit()} disabled={submitting}>
              Submit anyway
            </Button>
          </div>
        )}
      </div>

      {/* question */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-normal">
            {q.lessonNumber} · {q.lessonTitle}
          </Badge>
          <span>
            {q.bookTitle} — ch. {q.chapterNumber} · {q.chapterTitle}
          </span>
        </div>
        <PromptText text={q.prompt} className="mb-5 text-lg" />
        <OptionGrid
          options={q.options ?? []}
          answerIndex={q.answerIndex ?? 0}
          chosen={answers[q.id]}
          reveal={false}
          onChoose={(oi) => setAnswers((a) => ({ ...a, [q.id]: oi }))}
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setMarked((m) => {
                const next = { ...m }
                if (next[q.id]) delete next[q.id]
                else next[q.id] = 1
                return next
              })
            }
            className={`gap-1.5 ${marked[q.id] ? 'border-amber-500/60 text-amber-700 dark:text-amber-300' : ''}`}
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden />
            {marked[q.id] ? 'Marked' : 'Mark for review'}
          </Button>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
            keys: ←/→ move · 1–4 answer · M mark
          </span>
          {idx === total - 1 ? (
            <Button size="sm" onClick={() => void submit()} disabled={submitting} className="gap-1.5">
              <Send className="h-3.5 w-3.5" aria-hidden /> Finish
            </Button>
          ) : (
            <Button size="sm" onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} className="gap-1.5">
              Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Button>
          )}
        </div>

        {/* palette */}
        <div className="mt-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Question palette
          </p>
          <div className="flex flex-wrap gap-1.5">
            {paper.map((p, i) => {
              const answered = answers[p.id] !== undefined
              const isMarked = !!marked[p.id]
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Go to question ${i + 1}${answered ? ' (answered)' : ''}${isMarked ? ' (marked)' : ''}`}
                  className={`h-8 w-8 rounded-md border text-xs font-semibold tabular-nums transition-colors ${
                    i === idx
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isMarked
                        ? 'border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                        : answered
                          ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/40" aria-hidden /> answered
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-500/40" aria-hidden /> marked
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-muted" aria-hidden /> untouched
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

function ExamResults({
  preset,
  result,
  secsUsed,
  onClose,
  onRestart,
}: {
  preset: ExamPresetView
  result: SubmitResponse
  secsUsed: number
  onClose: () => void
  onRestart: () => void
}) {
  const timeTaken = formatClock(preset.durationMins * 60 - secsUsed)
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CheckCircle2 className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-reading text-2xl font-bold">{preset.name} — results</h2>
            <p className="text-sm text-muted-foreground">Server-graded · attempt saved to your history</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={onClose} aria-label="Close results">
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {/* score headline */}
        <div className="mb-6 flex flex-wrap items-center gap-6 rounded-xl border bg-muted/30 p-6">
          <div className="text-center">
            <p className="font-reading text-4xl font-bold tabular-nums">
              {result.score}
              <span className="text-xl text-muted-foreground">/{result.maxScore}</span>
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {result.percent}% · {timeTaken} taken
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Stat label="Correct" value={result.correctCount} tone="emerald" />
            <Stat label="Wrong" value={result.wrongCount} tone="rose" />
            <Stat label="Skipped" value={result.skippedCount} tone="muted" />
            <Stat label="Time left" value={formatClock(secsUsed)} tone="muted" />
          </div>
        </div>

        {result.mistakesAdded > 0 && (
          <p className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3 text-sm">
            <ClipboardList className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="font-semibold">{result.mistakesAdded}</span> wrong{' '}
              {result.mistakesAdded === 1 ? 'answer' : 'answers'} added to your{' '}
              <Link href="/practice" className="font-medium underline underline-offset-2">
                Mistake Bank
              </Link>{' '}
              for spaced review.
            </span>
          </p>
        )}

        {/* per-chapter weakness breakdown */}
        {result.breakdown.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-3 font-reading text-lg font-bold">Chapter breakdown</h3>
            <p className="mb-3 text-xs text-muted-foreground">Weakest first — revise these chapters next.</p>
            <div className="overflow-hidden rounded-xl border">
              {result.breakdown.map((b) => (
                <BreakdownRow key={b.chapterKey} b={b} />
              ))}
            </div>
          </section>
        )}

        {/* question review */}
        <section className="mb-8">
          <h3 className="mb-3 font-reading text-lg font-bold">Question review</h3>
          <div className="space-y-4">
            {result.questions.map((r, i) => (
              <QuestionReview key={r.id} r={r} index={i} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button onClick={onRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden /> New paper
          </Button>
          <Button onClick={onClose} className="gap-2">
            Done <ChevronRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone: 'emerald' | 'rose' | 'muted' }) {
  const cls =
    tone === 'emerald'
      ? 'text-emerald-700 dark:text-emerald-300'
      : tone === 'rose'
        ? 'text-rose-700 dark:text-rose-300'
        : 'text-foreground'
  return (
    <div className="rounded-lg border bg-background px-3 py-2">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`font-reading text-lg font-bold tabular-nums ${cls}`}>{value}</p>
    </div>
  )
}

function BreakdownRow({ b }: { b: ChapterBreakdown }) {
  const tone =
    b.accuracy >= 75 ? 'bg-emerald-500' : b.accuracy >= 50 ? 'bg-amber-500' : b.accuracy > 0 ? 'bg-rose-500' : 'bg-muted-foreground/40'
  return (
    <div className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-2.5 last:border-b-0">
      <span className="min-w-0 flex-1 truncate text-sm">
        <span className="font-medium">
          {b.bookTitle} — ch. {b.chapterNumber}
        </span>{' '}
        <span className="text-muted-foreground">{b.chapterTitle}</span>
      </span>
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        {b.correct}/{b.correct + b.wrong} correct
      </span>
      <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${b.accuracy}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums">{b.accuracy}%</span>
    </div>
  )
}

function QuestionReview({ r, index }: { r: QuestionResult; index: number }) {
  const wrong = r.outcome === 'wrong' || r.outcome === 'self-wrong'
  const skipped = r.outcome === 'skipped'
  return (
    <div className={`rounded-xl border p-5 ${wrong ? 'border-rose-500/40' : skipped ? '' : 'border-emerald-500/40'}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-reading font-bold text-foreground">Q{index + 1}</span>
        <Badge
          variant="outline"
          className={`font-normal ${
            wrong
              ? 'border-rose-500/40 text-rose-700 dark:text-rose-300'
              : skipped
                ? 'text-muted-foreground'
                : 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {r.outcome === 'correct'
            ? 'Correct'
            : r.outcome === 'wrong'
              ? 'Wrong'
              : r.outcome === 'self-right'
                ? 'Self-marked correct'
                : r.outcome === 'self-wrong'
                  ? 'Self-marked miss'
                  : 'Skipped'}
        </Badge>
        <span>
          {r.lessonNumber} · {r.lessonTitle} — {r.bookTitle}
        </span>
      </div>
      <PromptText text={r.prompt} className="mb-3" />
      {r.kind === 'mcq' && r.options && (
        <div className="mb-3">
          <OptionGrid
            options={r.options}
            answerIndex={r.answerIndex ?? 0}
            chosen={r.chosen}
            reveal
            disabled
          />
        </div>
      )}
      {r.kind === 'free' && (
        <div className="mb-3 rounded-md border-l-2 border-[var(--book-green)]/60 bg-[var(--book-sage)]/50 px-4 py-3 text-sm">
          <p className="mb-1 font-semibold text-[var(--book-green-ink)]">
            Answer: <RichText text={r.answerText ?? '—'} />
          </p>
        </div>
      )}
      {r.explain && (
        <p className="rounded-md border bg-muted/40 px-4 py-3 text-sm leading-6 text-foreground/90">
          <RichText text={r.explain} />
        </p>
      )}
    </div>
  )
}
