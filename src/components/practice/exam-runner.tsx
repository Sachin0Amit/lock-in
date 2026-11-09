'use client'

/**
 * Practice — the mock-exam runner, styled after real computer-based tests
 * (the NTA/JEE/NEET/SSC CBT conventions the exams themselves use).
 *
 * Three phases, exactly like a real CBT sitting:
 *   1. Instructions — the palette legend explained, rules of the paper,
 *      a declaration checkbox; the timer does NOT run yet.
 *   2. The paper — a two-column CBT shell: question pane with radio
 *      options and the classic Clear Response / Mark for Review & Next /
 *      Save & Next action bar, plus a right-hand question palette with
 *      the real CBT button states (answered · not answered · marked ·
 *      answered-and-marked · not visited · current) and live counts.
 *      Mobile keeps the palette behind a floating drawer button.
 *   3. Results — server-graded score, difficulty calibration read-out
 *      (band, pool difficulty, weighted accuracy), per-chapter weakness
 *      breakdown and full question review.
 *
 * Honesty rules preserved: negative marking graded server-side, auto-
 * submit at 00:00:00, wrong answers feed the Mistake Bank, marked-for-
 * review questions are graded like any other (marking never changes a
 * score here — it is navigation, not strategy).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BookmarkPlus,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Eraser,
  LayoutGrid,
  PlayCircle,
  RotateCcw,
  Send,
  UserRound,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RichText } from '@/components/library/math'
import { BAND_META, DifficultyChip, formatClock, formatHMS, PromptText } from './bits'
import { DIFFICULTY_BANDS } from '@/lib/practice/engine'
import { submitPractice } from '@/lib/practice/client-api'
import type {
  AnswerOutcome,
  ChapterBreakdown,
  DifficultyBand,
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

type Phase = 'instructions' | 'running' | 'results'

/** The real CBT palette button states. */
type PaletteState =
  | 'not-visited'
  | 'not-answered'
  | 'answered'
  | 'marked'
  | 'answered-marked'

interface PaletteCounts {
  answered: number
  notAnswered: number
  markedOnly: number
  answeredMarked: number
  notVisited: number
}

export function ExamRunner({ preset, paper, meta, onClose, onFinished, onRestart }: Props) {
  const total = paper.length
  const durationSecs = preset.durationMins * 60

  const [phase, setPhase] = useState<Phase>('instructions')
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [marked, setMarked] = useState<Record<string, 1>>({})
  const [visited, setVisited] = useState<Record<string, 1>>({})
  const [secsLeft, setSecsLeft] = useState(durationSecs)
  const [confirming, setConfirming] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResponse | null>(null)
  const startedAt = useRef<number | null>(null)
  const submittedRef = useRef(false)

  const q = paper[idx]
  const answeredCount = Object.keys(answers).length

  /* navigation marks the destination visited (NTA "Not Answered" = seen,
   * unanswered) — no effect needed, every idx change flows through here */
  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(total - 1, i))
      setIdx(clamped)
      const id = paper[clamped]?.id
      if (id) setVisited((v) => (v[id] ? v : { ...v, [id]: 1 }))
    },
    [paper, total],
  )

  const begin = useCallback(() => {
    startedAt.current = Date.now()
    const id = paper[0]?.id
    if (id) setVisited((v) => (v[id] ? v : { ...v, [id]: 1 }))
    setPhase('running')
  }, [paper])

  const counts = useMemo<PaletteCounts>(() => {
    let answered = 0
    let notAnswered = 0
    let markedOnly = 0
    let answeredMarked = 0
    let notVisited = 0
    for (const p of paper) {
      const a = answers[p.id] !== undefined
      const m = !!marked[p.id]
      if (a && m) answeredMarked++
      else if (m) markedOnly++
      else if (a) answered++
      else if (visited[p.id]) notAnswered++
      else notVisited++
    }
    return { answered, notAnswered, markedOnly, answeredMarked, notVisited }
  }, [paper, answers, marked, visited])

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current) return
      submittedRef.current = true
      setSubmitting(true)
      setConfirming(false)
      setPaletteOpen(false)
      const elapsed = auto
        ? durationSecs
        : Math.min(
            durationSecs,
            Math.round((Date.now() - (startedAt.current ?? Date.now())) / 1000),
          )
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
        band: meta.band,
      })
      setSubmitting(false)
      if (!res) {
        submittedRef.current = false
        setResult(null)
        return
      }
      setResult(res)
      setPhase('results')
      onFinished()
    },
    [answers, durationSecs, meta.band, meta.seed, onFinished, paper, preset.key],
  )

  /* the countdown — starts at "I am ready to begin", auto-submits at zero */
  useEffect(() => {
    if (phase !== 'running' || result) return
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
  }, [phase, result, submit])

  /* keyboard: ←/→ navigate, 1..4 answer, M mark, C clear */
  useEffect(() => {
    if (phase !== 'running' || result || confirming || paletteOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [role="dialog"]'))
        return
      if (e.key === 'ArrowLeft') goTo(idx - 1)
      else if (e.key === 'ArrowRight') goTo(idx + 1)
      else if (/^[1-4]$/.test(e.key) && q?.options && q.options.length >= Number(e.key)) {
        setAnswers((a) => ({ ...a, [q.id]: Number(e.key) - 1 }))
      } else if (e.key.toLowerCase() === 'm' && q) {
        setMarked((m) => {
          const next = { ...m }
          if (next[q.id]) delete next[q.id]
          else next[q.id] = 1
          return next
        })
      } else if (e.key.toLowerCase() === 'c' && q) {
        setAnswers((a) => {
          const next = { ...a }
          delete next[q.id]
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, confirming, paletteOpen, goTo, idx, q, result])

  /* Escape closes the overlays */
  useEffect(() => {
    if (!confirming && !paletteOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirming(false)
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirming, paletteOpen])

  if (phase === 'instructions') {
    return (
      <InstructionsView
        preset={preset}
        paper={paper}
        meta={meta}
        onBegin={begin}
        onExit={onClose}
      />
    )
  }

  if (result) {
    return (
      <ExamResults
        preset={preset}
        result={result}
        meta={meta}
        paper={paper}
        secsLeft={secsLeft}
        onClose={onClose}
        onRestart={onRestart}
      />
    )
  }

  const late = secsLeft <= 300
  const sectionLabel = preset.sectionLabel ?? 'Questions'

  const stateOf = (p: PracticeQuestion): PaletteState => {
    const a = answers[p.id] !== undefined
    const m = !!marked[p.id]
    if (a && m) return 'answered-marked'
    if (m) return 'marked'
    if (a) return 'answered'
    return visited[p.id] ? 'not-answered' : 'not-visited'
  }

  const choose = (oi: number) => setAnswers((a) => ({ ...a, [q.id]: oi }))
  const clearResponse = () =>
    setAnswers((a) => {
      const next = { ...a }
      delete next[q.id]
      return next
    })
  const toggleMark = (id: string) =>
    setMarked((m) => {
      const next = { ...m }
      if (next[id]) delete next[id]
      else next[id] = 1
      return next
    })

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* CBT header strip */}
      <header className="shrink-0 bg-primary text-primary-foreground shadow-md">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-reading text-sm font-bold sm:text-base">{preset.name}</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary-foreground/70">
              Computer-based practice paper
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-md bg-primary-foreground/10 px-2.5 py-1 text-xs sm:flex">
              <UserRound className="h-3.5 w-3.5 opacity-70" aria-hidden />
              You · self-study
            </span>
            <div
              className={`flex items-center gap-2 rounded-md px-3 py-1 tabular-nums ${
                late ? 'bg-rose-600 text-white' : 'bg-primary-foreground/10'
              }`}
              role="timer"
              aria-label={`Time left ${formatHMS(secsLeft)}`}
            >
              <Clock3 className={`h-4 w-4 ${late ? 'animate-pulse' : 'opacity-70'}`} aria-hidden />
              <span className="hidden text-[10px] font-semibold uppercase tracking-wider opacity-80 sm:inline">
                Time left
              </span>
              <span className="font-reading text-base font-bold sm:text-lg">
                {formatHMS(secsLeft)}
              </span>
            </div>
          </div>
        </div>
        {/* section row */}
        <div className="flex items-center gap-3 border-t border-primary-foreground/15 px-4 py-1.5 sm:px-6">
          <span className="rounded-sm bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
            {sectionLabel} · Q1–{total}
          </span>
          <span className="text-xs text-primary-foreground/80 tabular-nums">
            {answeredCount}/{total} answered
          </span>
          <div className="ml-auto hidden h-1 w-32 overflow-hidden rounded-full bg-primary-foreground/20 sm:block">
            <div
              className="h-full rounded-full bg-primary-foreground/80 transition-all"
              style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Abandon paper — nothing is saved"
            aria-label="Abandon paper"
            className="rounded-md p-1 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </header>

      {/* body: question pane + palette sidebar */}
      <div className="flex min-h-0 flex-1">
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-3">
              <h2 className="font-reading text-xl font-bold">Question No. {idx + 1}</h2>
              <span className="text-xs font-medium text-muted-foreground">of {total}</span>
              <span className="ml-auto flex items-center gap-2 text-xs font-semibold">
                <span className="text-emerald-700 dark:text-emerald-300">
                  +{preset.marks} correct
                </span>
                {preset.negative > 0 && (
                  <span className="text-rose-700 dark:text-rose-300">−{preset.negative} wrong</span>
                )}
              </span>
            </div>
            <p className="mb-4 truncate text-xs text-muted-foreground">
              {q.lessonNumber} · {q.lessonTitle} — {q.bookTitle} ch. {q.chapterNumber}
            </p>

            <PromptText text={q.prompt} className="mb-6 text-base leading-8 sm:text-lg" />

            <div role="radiogroup" aria-label={`Options for question ${idx + 1}`} className="space-y-2.5">
              {(q.options ?? []).map((opt, oi) => {
                const selected = answers[q.id] === oi
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(oi)}
                    className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors sm:text-[15px] ${
                      selected
                        ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        selected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground/40 text-muted-foreground'
                      }`}
                      aria-hidden
                    >
                      {selected ? <Check className="h-3.5 w-3.5" /> : oi + 1}
                    </span>
                    <span className="min-w-0 leading-7">
                      <RichText text={opt} />
                    </span>
                  </button>
                )
              })}
            </div>

            {/* CBT action bar */}
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearResponse}
                disabled={answers[q.id] === undefined}
                className="gap-1.5"
              >
                <Eraser className="h-3.5 w-3.5" aria-hidden /> Clear Response
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleMark(q.id)
                  goTo(idx + 1)
                }}
                className={`gap-1.5 ${
                  marked[q.id] ? 'border-violet-500/60 text-violet-700 dark:text-violet-300' : ''
                }`}
              >
                <BookmarkPlus className="h-3.5 w-3.5" aria-hidden />
                Mark for Review {idx < total - 1 ? '& Next' : ''}
              </Button>
              <span className="ml-auto hidden text-[11px] text-muted-foreground md:inline">
                keys: ←/→ move · 1–4 answer · M mark · C clear
              </span>
              {idx < total - 1 ? (
                <Button size="sm" onClick={() => goTo(idx + 1)} className="gap-1.5">
                  Save &amp; Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Button>
              ) : (
                <Button size="sm" onClick={() => setConfirming(true)} className="gap-1.5">
                  <Send className="h-3.5 w-3.5" aria-hidden /> Submit test
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* palette sidebar (desktop) */}
        <aside className="hidden w-[19rem] shrink-0 flex-col border-l bg-muted/30 lg:flex">
          <div className="border-b bg-background/60 px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Question Palette
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{sectionLabel}</p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-5 gap-2">
              {paper.map((p, i) => (
                <PaletteButton
                  key={p.id}
                  n={i + 1}
                  state={stateOf(p)}
                  current={i === idx}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
          <PaletteLegend counts={counts} className="border-t px-4 py-3" />
          <div className="border-t bg-background/60 p-3">
            <Button className="w-full gap-1.5" onClick={() => setConfirming(true)}>
              <Send className="h-4 w-4" aria-hidden /> Submit Test
            </Button>
          </div>
        </aside>
      </div>

      {/* mobile palette trigger */}
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform active:scale-95 lg:hidden"
      >
        <LayoutGrid className="h-4 w-4" aria-hidden />
        Palette
        <span className="rounded-full bg-primary-foreground/20 px-1.5 py-0.5 text-xs tabular-nums">
          {answeredCount}/{total}
        </span>
      </button>

      {/* mobile palette drawer */}
      {paletteOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="font-reading text-base font-bold">Question Palette</p>
              <p className="text-xs text-muted-foreground">{sectionLabel}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setPaletteOpen(false)} aria-label="Close palette">
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-5 gap-2">
              {paper.map((p, i) => (
                <PaletteButton
                  key={p.id}
                  n={i + 1}
                  state={stateOf(p)}
                  current={i === idx}
                  onClick={() => {
                    goTo(i)
                    setPaletteOpen(false)
                  }}
                />
              ))}
            </div>
            <PaletteLegend counts={counts} className="mt-6 border-t pt-4" />
          </div>
          <div className="border-t p-3">
            <Button
              className="w-full gap-1.5"
              onClick={() => {
                setPaletteOpen(false)
                setConfirming(true)
              }}
            >
              <Send className="h-4 w-4" aria-hidden /> Submit Test
            </Button>
          </div>
        </div>
      )}

      {/* submit confirmation modal */}
      {confirming && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-dialog-title"
          onClick={() => setConfirming(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="submit-dialog-title" className="flex items-center gap-2 font-reading text-lg font-bold">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
              Submit this paper?
            </h3>
            <div className="mt-4 overflow-hidden rounded-lg border">
              {(
                [
                  ['Answered', counts.answered],
                  ['Not Answered', counts.notAnswered],
                  ['Marked for Review', counts.markedOnly],
                  ['Answered & Marked', counts.answeredMarked],
                  ['Not Visited', counts.notVisited],
                ] as const
              ).map(([label, n], i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-2 text-sm ${
                    i % 2 === 0 ? 'bg-muted/30' : 'bg-background'
                  }`}
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold tabular-nums">{n}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t bg-muted/50 px-4 py-2 text-sm font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{total}</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Unattempted questions score 0 · wrong answers cost{' '}
              {preset.negative} mark{preset.negative === 1 ? '' : 's'} · marked-for-review questions
              are graded like any other. This is final — the server records the authoritative score.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirming(false)}>
                No, keep going
              </Button>
              <Button onClick={() => void submit()} disabled={submitting} className="gap-1.5">
                <Send className="h-3.5 w-3.5" aria-hidden />
                {submitting ? 'Submitting…' : 'Yes, submit'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {submitting && !result && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock3 className="h-4 w-4 animate-spin" aria-hidden />
            Grading your paper on the server…
          </p>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Palette pieces                                                      */
/* ------------------------------------------------------------------ */

const PALETTE_STATE_CLASS: Record<PaletteState, string> = {
  'not-visited': 'border border-border bg-card text-muted-foreground',
  'not-answered': 'border border-transparent bg-rose-600 text-white',
  answered: 'border border-transparent bg-emerald-600 text-white',
  marked: 'border border-transparent bg-violet-600 text-white',
  'answered-marked': 'border border-transparent bg-violet-600 text-white',
}

function PaletteButton({
  n,
  state,
  current,
  onClick,
}: {
  n: number
  state: PaletteState
  current: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to question ${n} (${state.replace('-', ' ')})`}
      aria-current={current ? 'true' : undefined}
      className={`relative flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold tabular-nums transition-shadow ${
        PALETTE_STATE_CLASS[state]
      } ${current ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:opacity-85'}`}
    >
      {n}
      {state === 'answered-marked' && (
        <span
          className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white shadow"
          aria-hidden
        >
          <Check className="h-2.5 w-2.5" />
        </span>
      )}
    </button>
  )
}

/** Non-interactive palette swatch for the instructions + legend. */
function PaletteSwatch({ state, n }: { state: PaletteState; n?: number }) {
  return (
    <span
      aria-hidden
      className={`relative flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold tabular-nums ${
        PALETTE_STATE_CLASS[state]
      }`}
    >
      {n ?? 1}
      {state === 'answered-marked' && (
        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
          <Check className="h-2.5 w-2.5" />
        </span>
      )}
    </span>
  )
}

function PaletteLegend({ counts, className }: { counts: PaletteCounts; className?: string }) {
  const rows = [
    { state: 'answered' as const, label: 'Answered', n: counts.answered },
    { state: 'not-answered' as const, label: 'Not Answered', n: counts.notAnswered },
    { state: 'marked' as const, label: 'Marked for Review', n: counts.markedOnly },
    { state: 'answered-marked' as const, label: 'Answered & Marked', n: counts.answeredMarked },
    { state: 'not-visited' as const, label: 'Not Visited', n: counts.notVisited },
  ]
  return (
    <div className={className}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Legend
      </p>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.state} className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <PaletteSwatch state={r.state} />
            <span className="min-w-0 flex-1">{r.label}</span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">{r.n}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
        The current question wears a highlight ring. Marked questions are graded like any other —
        marking is navigation, not strategy.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Phase 1 — instructions (the timer is NOT running yet)               */
/* ------------------------------------------------------------------ */

function InstructionsView({
  preset,
  paper,
  meta,
  onBegin,
  onExit,
}: {
  preset: ExamPresetView
  paper: PracticeQuestion[]
  meta: PaperMeta
  onBegin: () => void
  onExit: () => void
}) {
  const [declared, setDeclared] = useState(false)
  const band = DIFFICULTY_BANDS.find((b) => b.key === (meta.band ?? 'standard'))
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <ClipboardCheck className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Instructions · read before you begin
            </p>
            <h1 className="font-reading text-2xl font-bold tracking-tight">{preset.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{preset.formatNote}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onExit} aria-label="Exit without starting">
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {/* summary strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border bg-muted/30 p-4 sm:grid-cols-4">
          <Fact label="Duration" value={`${preset.durationMins} min`} />
          <Fact label="Questions" value={String(paper.length)} />
          <Fact label="Marking" value={`+${preset.marks} / −${preset.negative}`} />
          <Fact label="Difficulty" value={band?.label ?? 'Standard'} />
        </div>
        <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>
            {band ? `${band.label} paper — ${band.hint}.` : ''} Pool difficulty{' '}
            {meta.difficultyMean ?? '—'}/100 · {meta.difficultyData ?? 0} of {paper.length} questions
            calibrated from real attempts (the rest use honest level-based estimates).
          </span>
        </p>

        {/* palette legend */}
        <section className="mb-6 rounded-xl border p-5">
          <h2 className="mb-3 font-reading text-base font-bold">The question palette</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            <PaletteSwatch state="not-visited" n={5} />
            <PaletteSwatch state="not-answered" n={8} />
            <PaletteSwatch state="answered" n={3} />
            <PaletteSwatch state="marked" n={11} />
            <PaletteSwatch state="answered-marked" n={7} />
          </div>
          <ul className="space-y-1.5 text-sm leading-6 text-muted-foreground">
            <li>
              <strong className="text-foreground">Grey</strong> — not visited yet.
            </li>
            <li>
              <strong className="text-foreground">Red</strong> — visited but not answered.
            </li>
            <li>
              <strong className="text-foreground">Green</strong> — answered.
            </li>
            <li>
              <strong className="text-foreground">Violet</strong> — marked for review; with a green
              tick when it is also answered.
            </li>
            <li>
              The <strong className="text-foreground">current question</strong> wears a highlight
              ring — the palette jumps anywhere, any time.
            </li>
          </ul>
        </section>

        {/* rules */}
        <section className="mb-6 rounded-xl border p-5">
          <h2 className="mb-3 font-reading text-base font-bold">Rules of this paper</h2>
          <ol className="space-y-2 text-sm leading-6 text-muted-foreground">
            <li>
              <strong className="text-foreground">1.</strong> The countdown starts when you tap
              &ldquo;I am ready to begin&rdquo; — and the paper <em>auto-submits</em> at 00:00:00.
            </li>
            <li>
              <strong className="text-foreground">2.</strong> Every correct answer earns +
              {preset.marks}; every wrong answer costs −{preset.negative}; skipped questions score
              0. Marked-for-review questions are graded like any other.
            </li>
            <li>
              <strong className="text-foreground">3.</strong> Use{' '}
              <strong className="text-foreground">Save &amp; Next</strong> to move on,{' '}
              <strong className="text-foreground">Mark for Review &amp; Next</strong> to flag and
              advance, <strong className="text-foreground">Clear Response</strong> to un-answer.
            </li>
            <li>
              <strong className="text-foreground">4.</strong> Keyboard: ←/→ move · 1–4 select · M
              mark · C clear.
            </li>
            <li>
              <strong className="text-foreground">5.</strong> Grading happens server-side and the
              attempt is saved to your history; wrong answers become Mistake Bank cards for spaced
              review.
            </li>
          </ol>
        </section>

        {/* declaration */}
        <div className="mb-8 rounded-xl border border-primary/25 bg-primary/[0.05] p-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6">
            <Checkbox
              checked={declared}
              onCheckedChange={(v) => setDeclared(v === true)}
              className="mt-1"
              aria-label="Declare that you have read the instructions"
            />
            <span>
              I have read and understood the instructions. I declare that I will attempt this paper
              honestly — the timer, the score and every wrong-answer card are my own.
            </span>
          </label>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button disabled={!declared} onClick={onBegin} className="gap-2">
              <PlayCircle className="h-4 w-4" aria-hidden /> I am ready to begin
            </Button>
            <Button variant="ghost" onClick={onExit}>
              Choose another paper
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background px-3 py-2">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-reading text-sm font-bold tabular-nums">{value}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Phase 3 — results                                                   */
/* ------------------------------------------------------------------ */

function ExamResults({
  preset,
  result,
  meta,
  paper,
  secsLeft,
  onClose,
  onRestart,
}: {
  preset: ExamPresetView
  result: SubmitResponse
  meta: PaperMeta
  paper: PracticeQuestion[]
  secsLeft: number
  onClose: () => void
  onRestart: () => void
}) {
  const timeTaken = formatClock(preset.durationMins * 60 - secsLeft)
  const bandKey: DifficultyBand = (result.band ?? meta.band ?? 'standard') as DifficultyBand
  const bandMeta = BAND_META[bandKey]
  const bandInfo = DIFFICULTY_BANDS.find((b) => b.key === bandKey)
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
        <div className="mb-4 flex flex-wrap items-center gap-6 rounded-xl border bg-muted/30 p-6">
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
            <Stat label="Time left" value={formatClock(secsLeft)} tone="muted" />
          </div>
        </div>

        {/* difficulty calibration read-out */}
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border px-6 py-4 text-sm">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className={`h-2.5 w-2.5 rounded-full ${bandMeta.dot}`} aria-hidden />
            {bandInfo?.label ?? 'Standard'} set
          </span>
          <span className="tabular-nums text-muted-foreground">
            Pool difficulty{' '}
            <span className="font-semibold text-foreground">
              {result.paperDifficultyMean ?? meta.difficultyMean ?? '—'}/100
            </span>
          </span>
          {result.difficultyAccuracy != null && (
            <span className="tabular-nums text-muted-foreground">
              Weighted accuracy{' '}
              <span className="font-semibold text-foreground">{result.difficultyAccuracy}%</span>{' '}
              (harder questions count more)
            </span>
          )}
          <span className="tabular-nums text-muted-foreground">
            {meta.difficultyData ?? 0}/{paper.length} calibrated from attempts
          </span>
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
        <DifficultyChip difficulty={r.difficulty} attempts={r.difficultyAttempts} />
        <span className="min-w-0 truncate">
          {r.lessonNumber} · {r.lessonTitle} — {r.bookTitle}
        </span>
      </div>
      <PromptText text={r.prompt} className="mb-3" />
      {r.kind === 'mcq' && r.options && (
        <div className="mb-3">
          <OptionGridReview
            options={r.options}
            answerIndex={r.answerIndex ?? 0}
            chosen={r.chosen}
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

/** Review-mode option list (static, revealed, keyboard-inert). */
function OptionGridReview({
  options,
  answerIndex,
  chosen,
}: {
  options: string[]
  answerIndex: number
  chosen?: number
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt, oi) => {
        const isAnswer = oi === answerIndex
        const isChosen = chosen === oi
        let cls = 'border-border bg-card opacity-60'
        if (isAnswer)
          cls =
            'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
        else if (isChosen)
          cls = 'border-rose-500/70 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
        return (
          <div
            key={oi}
            className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3.5 py-2 text-sm ${cls}`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
              {isAnswer ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
            </span>
            <RichText text={opt} />
          </div>
        )
      })}
    </div>
  )
}
