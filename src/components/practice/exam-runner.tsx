'use client'

/**
 * Practice — the mock-exam runner, styled after real computer-based tests
 * (the NTA/JEE/NEET/SSC CBT conventions the exams themselves use).
 *
 * Three phases, exactly like a real CBT sitting:
 *   1. Instructions — the palette legend explained, rules of the paper
 *      (per-section marking for multi-section papers), a declaration
 *      checkbox; the timer does NOT run yet.
 *   2. The paper — a two-column CBT shell: question pane with radio
 *      options (MCQ sections) or a type-in field with an on-screen keypad
 *      (JEE Section B / CAT TITA numerical sections), the classic Clear
 *      Response / Mark for Review & Next / Save & Next action bar, and a
 *      right-hand question palette with the real CBT button states
 *      (answered · not answered · marked · answered-and-marked · not
 *      visited · current) listing the ACTIVE section's questions —
 *      sections are switched with tabs, like the real JEE/CAT clients.
 *      CAT papers add the real exam's on-screen calculator. The sitting
 *      autosaves to localStorage (refresh-safe resume, honest wall-clock
 *      countdown) and tracks per-question seconds for the results.
 *   3. Results — server-graded score with per-section marks, difficulty
 *      calibration read-out (band, pool difficulty, weighted accuracy),
 *      a time analysis (mean and slowest questions), per-chapter weakness
 *      breakdown and full question review.
 *
 * Honesty rules preserved: negative marking graded server-side per
 * section, auto-submit at 00:00:00, wrong answers feed the Mistake Bank,
 * marked-for-review questions are graded like any other (marking never
 * changes a score here — it is navigation, not strategy).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BookmarkPlus,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Delete,
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
import { clearSitting, saveSitting, type ExamSitting } from '@/lib/practice/sitting-store'
import type {
  AnswerOutcome,
  ChapterBreakdown,
  DifficultyBand,
  ExamPresetView,
  PaperMeta,
  PaperSection,
  PracticeQuestion,
  QuestionResult,
  SubmitResponse,
} from '@/lib/practice/types'

interface Props {
  preset: ExamPresetView
  paper: PracticeQuestion[]
  meta: PaperMeta
  /** a saved sitting to resume (skips instructions, restores answers) */
  resume?: ExamSitting | null
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

const NUMERIC_ENTRY_FILTER = /[^0-9.\-/ ]/g

export function ExamRunner({ preset, paper, meta, resume, onClose, onFinished, onRestart }: Props) {
  const total = paper.length
  const durationSecs = preset.durationMins * 60

  const [phase, setPhase] = useState<Phase>(resume ? 'running' : 'instructions')
  const [idx, setIdx] = useState(resume?.idx ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(resume?.answers ?? {})
  const [values, setValues] = useState<Record<string, string>>(resume?.values ?? {})
  const [marked, setMarked] = useState<Record<string, 1>>(resume?.marked ?? {})
  const [visited, setVisited] = useState<Record<string, 1>>(resume?.visited ?? {})
  const [secsLeft, setSecsLeft] = useState<number>(() => {
    if (!resume) return durationSecs
    return Math.max(1, durationSecs - Math.floor((Date.now() - resume.startedAt) / 1000))
  })
  const [confirming, setConfirming] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [calcOpen, setCalcOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResponse | null>(null)
  const startedAt = useRef<number | null>(resume?.startedAt ?? null)
  const submittedRef = useRef(false)
  const qShownAt = useRef<number>(Date.now())
  const secsByQ = useRef<Record<string, number>>(resume?.secsByQ ? { ...resume.secsByQ } : {})

  const q = paper[Math.min(idx, total - 1)]

  /* ---------------------------------------------------------------- */
  /* Sections — the paper's own layout, or derived from the preset     */
  /* ---------------------------------------------------------------- */

  const sections = useMemo<readonly PaperSection[]>(() => {
    if (meta.sections && meta.sections.length > 0) return meta.sections
    let from = 0
    return preset.sections.map((s) => {
      const sec: PaperSection = {
        label: s.label,
        type: s.type,
        typeName: s.typeName,
        from,
        to: from + s.questionCount - 1,
        count: s.questionCount,
        marks: s.marks,
        negative: s.negative,
      }
      from += s.questionCount
      return sec
    })
  }, [meta.sections, preset.sections])

  const multiSection = sections.length > 1
  const activeSectionIdx = useMemo(() => {
    const si = sections.findIndex((s) => idx >= s.from && idx <= s.to)
    return si >= 0 ? si : sections.length - 1
  }, [sections, idx])
  const active = sections[activeSectionIdx]
  const sectionIndexOf = useCallback(
    (i: number) => {
      const si = sections.findIndex((s) => i >= s.from && i <= s.to)
      return si >= 0 ? si : undefined
    },
    [sections],
  )

  const isAnswered = useCallback(
    (p: PracticeQuestion) =>
      p.kind === 'mcq' ? answers[p.id] !== undefined : (values[p.id] ?? '').trim() !== '',
    [answers, values],
  )
  const answeredCount = useMemo(() => paper.filter(isAnswered).length, [paper, isAnswered])

  /* ---------------------------------------------------------------- */
  /* Per-question timing (flushed on every navigation / submit)        */
  /* ---------------------------------------------------------------- */

  const flushTime = useCallback((qid: string | undefined) => {
    if (!qid) return
    const now = Date.now()
    const add = Math.max(0, Math.round((now - qShownAt.current) / 1000))
    if (add > 0) secsByQ.current[qid] = (secsByQ.current[qid] ?? 0) + add
    qShownAt.current = now
  }, [])

  /* navigation marks the destination visited (NTA "Not Answered" = seen,
   * unanswered) and banks the time spent on the question we leave */
  const goTo = useCallback(
    (i: number) => {
      flushTime(paper[idx]?.id)
      const clamped = Math.max(0, Math.min(total - 1, i))
      setIdx(clamped)
      const id = paper[clamped]?.id
      if (id) setVisited((v) => (v[id] ? v : { ...v, [id]: 1 }))
    },
    [flushTime, idx, paper, total],
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
      const a = isAnswered(p)
      const m = !!marked[p.id]
      if (a && m) answeredMarked++
      else if (m) markedOnly++
      else if (a) answered++
      else if (visited[p.id]) notAnswered++
      else notVisited++
    }
    return { answered, notAnswered, markedOnly, answeredMarked, notVisited }
  }, [paper, isAnswered, marked, visited])

  const sectionCounts = useMemo<PaletteCounts[]>(
    () =>
      sections.map((s) => {
        let answered = 0
        let notAnswered = 0
        let markedOnly = 0
        let answeredMarked = 0
        let notVisited = 0
        for (let i = s.from; i <= Math.min(s.to, total - 1); i++) {
          const p = paper[i]
          if (!p) continue
          const a = isAnswered(p)
          const m = !!marked[p.id]
          if (a && m) answeredMarked++
          else if (m) markedOnly++
          else if (a) answered++
          else if (visited[p.id]) notAnswered++
          else notVisited++
        }
        return { answered, notAnswered, markedOnly, answeredMarked, notVisited }
      }),
    [sections, paper, total, isAnswered, marked, visited],
  )

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current) return
      submittedRef.current = true
      setSubmitting(true)
      setConfirming(false)
      setPaletteOpen(false)
      setCalcOpen(false)
      flushTime(paper[idx]?.id)
      const elapsed = auto
        ? durationSecs
        : Math.min(
            durationSecs,
            Math.round((Date.now() - (startedAt.current ?? Date.now())) / 1000),
          )
      const payload: AnswerOutcome[] = paper.map((p, i) =>
        p.kind === 'mcq'
          ? {
              questionId: p.id,
              chosen: answers[p.id],
              section: sectionIndexOf(i),
              secs: secsByQ.current[p.id],
            }
          : {
              questionId: p.id,
              value: (values[p.id] ?? '').trim() || undefined,
              section: sectionIndexOf(i),
              secs: secsByQ.current[p.id],
            },
      )
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
      clearSitting()
      setResult(res)
      setPhase('results')
      onFinished()
    },
    [
      answers,
      durationSecs,
      flushTime,
      idx,
      meta.band,
      meta.seed,
      onFinished,
      paper,
      preset.key,
      sectionIndexOf,
      values,
    ],
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

  /* autosave the sitting — refresh-proof, honest wall-clock countdown */
  useEffect(() => {
    if (phase !== 'running' || result) return
    saveSitting({
      v: 1,
      preset,
      paper,
      meta,
      answers,
      values,
      marked,
      visited,
      secsByQ: { ...secsByQ.current },
      idx,
      startedAt: startedAt.current ?? Date.now(),
      savedAt: Date.now(),
    })
  }, [phase, result, preset, paper, meta, answers, values, marked, visited, idx])

  /* keyboard: ←/→ navigate, 1..4 answer MCQs, M mark, C clear */
  useEffect(() => {
    if (phase !== 'running' || result || confirming || paletteOpen || calcOpen) return
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
        setValues((v) => {
          const next = { ...v }
          delete next[q.id]
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, confirming, paletteOpen, calcOpen, goTo, idx, q, result])

  /* Escape closes the overlays */
  useEffect(() => {
    if (!confirming && !paletteOpen && !calcOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirming(false)
        setPaletteOpen(false)
        setCalcOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirming, paletteOpen, calcOpen])

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
    const a = isAnswered(p)
    const m = !!marked[p.id]
    if (a && m) return 'answered-marked'
    if (m) return 'marked'
    if (a) return 'answered'
    return visited[p.id] ? 'not-answered' : 'not-visited'
  }

  const choose = (oi: number) => setAnswers((a) => ({ ...a, [q.id]: oi }))
  const setValue = (v: string) =>
    setValues((vals) => {
      const next = { ...vals }
      if (v.trim() === '') delete next[q.id]
      else next[q.id] = v
      return next
    })
  const clearResponse = () => {
    setAnswers((a) => {
      const next = { ...a }
      delete next[q.id]
      return next
    })
    setValues((v) => {
      const next = { ...v }
      delete next[q.id]
      return next
    })
  }
  const toggleMark = (id: string) =>
    setMarked((m) => {
      const next = { ...m }
      if (next[id]) delete next[id]
      else next[id] = 1
      return next
    })
  const abandon = () => {
    clearSitting()
    onClose()
  }

  const paletteQuestions = paper.slice(active.from, Math.min(active.to, total - 1) + 1)

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
        {/* section row — tabs for multi-section papers, like the real clients */}
        <div className="flex items-center gap-3 border-t border-primary-foreground/15 px-4 py-1.5 sm:px-6">
          {multiSection ? (
            <div
              className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto"
              role="tablist"
              aria-label="Paper sections"
            >
              {sections.map((s, si) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={si === activeSectionIdx}
                  onClick={() => goTo(s.from)}
                  className={`shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                    si === activeSectionIdx
                      ? 'bg-primary-foreground text-primary shadow-sm'
                      : 'bg-primary-foreground/15 text-primary-foreground/85 hover:bg-primary-foreground/25'
                  }`}
                >
                  {s.label}
                  <span className="ml-1.5 opacity-75 tabular-nums">{s.count}</span>
                </button>
              ))}
            </div>
          ) : (
            <>
              <span className="rounded-sm bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
                {sectionLabel} · Q1–{total}
              </span>
              <span className="text-xs text-primary-foreground/80 tabular-nums">
                {answeredCount}/{total} answered
              </span>
            </>
          )}
          {multiSection && (
            <span className="hidden shrink-0 text-xs text-primary-foreground/80 tabular-nums sm:inline">
              {answeredCount}/{total}
            </span>
          )}
          <div className="ml-auto hidden h-1 w-32 overflow-hidden rounded-full bg-primary-foreground/20 sm:block">
            <div
              className="h-full rounded-full bg-primary-foreground/80 transition-all"
              style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }}
            />
          </div>
          <button
            type="button"
            onClick={abandon}
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
              {multiSection && (
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-primary/10 font-normal text-primary"
                >
                  {active.typeName}
                </Badge>
              )}
              <span className="ml-auto flex items-center gap-2 text-xs font-semibold">
                <span className="text-emerald-700 dark:text-emerald-300">
                  +{active.marks} correct
                </span>
                {active.negative > 0 ? (
                  <span className="text-rose-700 dark:text-rose-300">−{active.negative} wrong</span>
                ) : (
                  <span className="text-muted-foreground">no negative</span>
                )}
              </span>
            </div>
            <p className="mb-4 truncate text-xs text-muted-foreground">
              {q.lessonNumber} · {q.lessonTitle} — {q.bookTitle} ch. {q.chapterNumber}
            </p>

            <PromptText text={q.prompt} className="mb-6 text-base leading-8 sm:text-lg" />

            {q.kind === 'mcq' ? (
              <div
                role="radiogroup"
                aria-label={`Options for question ${idx + 1}`}
                className="space-y-2.5"
              >
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
            ) : (
              <NumericEntry
                value={values[q.id] ?? ''}
                onChange={setValue}
                label={`Your answer for question ${idx + 1}`}
              />
            )}

            {/* CBT action bar */}
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearResponse}
                disabled={!isAnswered(q)}
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
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {active.label}
              {multiSection ? ` · Q${active.from + 1}–${Math.min(active.to, total - 1) + 1}` : ''}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-5 gap-2">
              {paletteQuestions.map((p, i) => (
                <PaletteButton
                  key={p.id}
                  n={active.from + i + 1}
                  state={stateOf(p)}
                  current={active.from + i === idx}
                  onClick={() => goTo(active.from + i)}
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

      {/* the real exam's on-screen calculator (CAT papers) */}
      {preset.calculator && (
        <button
          type="button"
          onClick={() => setCalcOpen(true)}
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-semibold shadow-lg transition-transform active:scale-95"
        >
          <Calculator className="h-4 w-4 text-primary" aria-hidden />
          Calculator
        </button>
      )}
      {calcOpen && preset.calculator && (
        <div
          className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="On-screen calculator"
          onClick={() => setCalcOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-xl border bg-background p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ExamCalculator onClose={() => setCalcOpen(false)} />
          </div>
        </div>
      )}

      {/* mobile palette drawer */}
      {paletteOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="font-reading text-base font-bold">Question Palette</p>
              <p className="text-xs text-muted-foreground">
                {active.label}
                {multiSection
                  ? ` · Q${active.from + 1}–${Math.min(active.to, total - 1) + 1}`
                  : ''}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPaletteOpen(false)}
              aria-label="Close palette"
            >
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          {multiSection && (
            <div className="flex gap-1.5 overflow-x-auto border-b px-4 py-2" role="tablist" aria-label="Paper sections">
              {sections.map((s, si) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={si === activeSectionIdx}
                  onClick={() => goTo(s.from)}
                  className={`shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                    si === activeSectionIdx
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-accent'
                  }`}
                >
                  {s.label}
                  <span className="ml-1.5 opacity-75 tabular-nums">{s.count}</span>
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-5 gap-2">
              {paletteQuestions.map((p, i) => (
                <PaletteButton
                  key={p.id}
                  n={active.from + i + 1}
                  state={stateOf(p)}
                  current={active.from + i === idx}
                  onClick={() => {
                    goTo(active.from + i)
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
            <h3
              id="submit-dialog-title"
              className="flex items-center gap-2 font-reading text-lg font-bold"
            >
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
              Submit this paper?
            </h3>
            {multiSection ? (
              <div className="mt-4 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-3 py-2 font-semibold">Section</th>
                      <th className="px-2 py-2 text-right font-semibold">Answered</th>
                      <th className="px-2 py-2 text-right font-semibold">Not ans.</th>
                      <th className="px-2 py-2 text-right font-semibold">Marked</th>
                      <th className="px-2 py-2 text-right font-semibold">Ans+M</th>
                      <th className="px-3 py-2 text-right font-semibold">Unseen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((s, si) => (
                      <tr key={s.label} className="border-t bg-muted/20">
                        <td className="max-w-[10rem] truncate px-3 py-2 font-medium">{s.label}</td>
                        <td className="px-2 py-2 text-right tabular-nums">
                          {sectionCounts[si]?.answered ?? 0}
                        </td>
                        <td className="px-2 py-2 text-right tabular-nums">
                          {sectionCounts[si]?.notAnswered ?? 0}
                        </td>
                        <td className="px-2 py-2 text-right tabular-nums">
                          {sectionCounts[si]?.markedOnly ?? 0}
                        </td>
                        <td className="px-2 py-2 text-right tabular-nums">
                          {sectionCounts[si]?.answeredMarked ?? 0}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {sectionCounts[si]?.notVisited ?? 0}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t bg-muted/50 font-semibold">
                      <td className="px-3 py-2">Total</td>
                      <td className="px-2 py-2 text-right tabular-nums">{counts.answered}</td>
                      <td className="px-2 py-2 text-right tabular-nums">{counts.notAnswered}</td>
                      <td className="px-2 py-2 text-right tabular-nums">{counts.markedOnly}</td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {counts.answeredMarked}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{counts.notVisited}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
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
            )}
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Unattempted questions score 0 · {markingWording(sections)} · marked-for-review
              questions are graded like any other. This is final — the server records the
              authoritative score.
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
/* Numeric entry (JEE Section B · CAT TITA)                            */
/* ------------------------------------------------------------------ */

function NumericEntry({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (v: string) => void
  label: string
}) {
  const filter = (s: string) => s.replace(NUMERIC_ENTRY_FILTER, '').slice(0, 24)
  return (
    <div className="rounded-xl border bg-card p-4 sm:p-5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Your answer
      </label>
      <input
        value={value}
        onChange={(e) => onChange(filter(e.target.value))}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        aria-label={label}
        placeholder="Type the exact value — e.g. 42, -2.5 or 3/4"
        className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-reading text-lg font-bold tabular-nums shadow-inner outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
      <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
        Decimals and simple fractions both count — matching is exact to six decimal places.
        Unattempted scores 0.
      </p>
      {/* the real CBT on-screen numeric keypad */}
      <div className="mt-4 grid max-w-[16rem] grid-cols-4 gap-1.5" role="group" aria-label="Numeric keypad">
        {(
          [
            ['7', '8', '9', '⌫'],
            ['4', '5', '6', 'C'],
            ['1', '2', '3', '/'],
            ['0', '.', '−', ' '],
          ] as const
        ).flat().map((key, i) => {
          if (key === ' ') return null
          if (key === '⌫')
            return (
              <Button
                key={i}
                variant="outline"
                className="h-11 gap-0 px-0"
                onClick={() => onChange(filter(value.slice(0, -1)))}
                aria-label="Backspace"
              >
                <Delete className="h-4 w-4" aria-hidden />
              </Button>
            )
          if (key === 'C')
            return (
              <Button
                key={i}
                variant="outline"
                className="h-11 px-0 text-sm font-semibold"
                onClick={() => onChange('')}
                aria-label="Clear answer"
              >
                C
              </Button>
            )
          if (key === '−')
            return (
              <Button
                key={i}
                variant="outline"
                className="h-11 px-0 text-lg font-bold"
                onClick={() => onChange(filter(value.startsWith('-') ? value.slice(1) : `-${value}`))}
                aria-label="Toggle negative"
              >
                −
              </Button>
            )
          return (
            <Button
              key={i}
              variant="outline"
              className="h-11 px-0 font-reading text-base font-bold tabular-nums"
              onClick={() => onChange(filter(value + key))}
            >
              {key}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The on-screen calculator (CAT) — immediate-execution, no eval        */
/* ------------------------------------------------------------------ */

type CalcOp = '+' | '−' | '×' | '÷'

function calcApply(a: number, b: number, op: CalcOp): number {
  switch (op) {
    case '+':
      return a + b
    case '−':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b === 0 ? NaN : a / b
  }
}

function ExamCalculator({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0')
  const [pending, setPending] = useState<number | null>(null)
  const [op, setOp] = useState<CalcOp | null>(null)
  const [freshEntry, setFreshEntry] = useState(true)
  const [error, setError] = useState(false)

  const show = (n: number) => {
    if (!Number.isFinite(n)) {
      setError(true)
      setDisplay('Error')
      setPending(null)
      setOp(null)
      setFreshEntry(true)
      return
    }
    const rounded = Math.round(n * 1e10) / 1e10
    let s = String(rounded)
    if (s.length > 16) s = rounded.toExponential(8)
    setDisplay(s)
  }

  const digit = (d: string) => {
    if (error) {
      setError(false)
      setDisplay(d)
      setFreshEntry(true)
      return
    }
    setDisplay((c) => (freshEntry || c === '0' ? d : c.length >= 16 ? c : c + d))
    setFreshEntry(false)
  }
  const dot = () => {
    if (error) return
    setDisplay((c) => (freshEntry || c === '0' ? '0.' : c.includes('.') ? c : `${c}.`))
    setFreshEntry(false)
  }
  const back = () =>
    setDisplay((c) =>
      c.length <= 1 || (c.length === 2 && c.startsWith('-')) ? '0' : c.slice(0, -1),
    )
  const clearAll = () => {
    setDisplay('0')
    setPending(null)
    setOp(null)
    setFreshEntry(true)
    setError(false)
  }
  const chooseOp = (o: CalcOp) => {
    if (error) return
    const cur = Number(display)
    if (op !== null && !freshEntry && pending !== null) {
      const r = calcApply(pending, cur, op)
      setPending(r)
      show(r)
    } else {
      setPending(cur)
    }
    setOp(o)
    setFreshEntry(true)
  }
  const equals = () => {
    if (error || op === null || pending === null) return
    show(calcApply(pending, Number(display), op))
    setPending(null)
    setOp(null)
    setFreshEntry(true)
  }

  const keys: Array<{ k: string; onClick: () => void; cls?: string; aria?: string }> = [
    { k: 'C', onClick: clearAll, cls: 'text-rose-700 dark:text-rose-300' },
    { k: '⌫', onClick: back, cls: '', aria: 'Backspace' },
    { k: '÷', onClick: () => chooseOp('÷'), cls: 'text-primary' },
    { k: '×', onClick: () => chooseOp('×'), cls: 'text-primary' },
    { k: '7', onClick: () => digit('7') },
    { k: '8', onClick: () => digit('8') },
    { k: '9', onClick: () => digit('9') },
    { k: '−', onClick: () => chooseOp('−'), cls: 'text-primary' },
    { k: '4', onClick: () => digit('4') },
    { k: '5', onClick: () => digit('5') },
    { k: '6', onClick: () => digit('6') },
    { k: '+', onClick: () => chooseOp('+'), cls: 'text-primary' },
    { k: '1', onClick: () => digit('1') },
    { k: '2', onClick: () => digit('2') },
    { k: '3', onClick: () => digit('3') },
    { k: '=', onClick: equals, cls: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { k: '0', onClick: () => digit('0') },
    { k: '.', onClick: dot },
  ]

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On-screen calculator
        </p>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close calculator">
          <X className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      <div
        className="mb-3 rounded-lg border bg-muted/40 px-4 py-3 text-right font-reading text-2xl font-bold tabular-nums"
        role="status"
        aria-label={`Calculator display ${display}`}
      >
        {pending !== null && op ? (
          <span className="mr-2 text-sm font-medium text-muted-foreground">
            {pending} {op}
          </span>
        ) : null}
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {keys.map((key) => (
          <Button
            key={key.k}
            type="button"
            variant="outline"
            className={`h-11 px-0 font-reading text-base font-bold ${key.cls ?? ''}`}
            onClick={key.onClick}
            aria-label={key.aria}
          >
            {key.k}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Basic four-function calculator, like the real CAT client. The paper timer keeps running.
      </p>
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

/** Honest wording of the negative-marking rule across sections. */
function markingWording(sections: readonly PaperSection[]): string {
  const withNeg = sections.filter((s) => s.negative > 0)
  if (sections.length === 1) {
    const n = sections[0].negative
    return n > 0 ? `wrong answers cost −${n} mark${n === 1 ? '' : 's'}` : 'there is no negative marking'
  }
  if (withNeg.length === 0) return 'no section deducts marks for wrong answers'
  if (withNeg.length === sections.length) {
    const uniq = new Set(sections.map((s) => s.negative))
    return uniq.size === 1
      ? `wrong answers cost −${sections[0].negative} in every section`
      : 'sections deduct different penalties per wrong answer'
  }
  return `${withNeg.map((s) => `−${s.negative} in ${s.label}`).join(' · ')} — nothing in the other sections`
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
  const sections = preset.sections
  const multi = sections.length > 1
  const hasNumeric = sections.some((s) => s.type === 'numeric')
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
          <Fact
            label="Marking"
            value={multi ? 'per section' : `+${preset.marks} / −${preset.negative}`}
          />
          <Fact label="Difficulty" value={band?.label ?? 'Standard'} />
        </div>
        <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span>
            {band ? `${band.label} paper — ${band.hint}.` : ''} Pool difficulty{' '}
            {meta.difficultyMean ?? '—'}/100 · {meta.difficultyData ?? 0} of {paper.length} questions
            calibrated from real attempts (the rest use honest level-based estimates).
          </span>
        </p>

        {/* sections table (multi-section papers) */}
        {multi && (
          <section className="mb-6 rounded-xl border p-5">
            <h2 className="mb-3 font-reading text-base font-bold">Sections of this paper</h2>
            <div className="overflow-hidden rounded-lg border">
              {sections.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-sm ${
                    i % 2 === 0 ? 'bg-muted/30' : 'bg-background'
                  }`}
                >
                  <span className="min-w-0 flex-1 font-medium">{s.label}</span>
                  <Badge variant="outline" className="font-normal">
                    {s.typeName}
                  </Badge>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {s.questionCount} questions
                  </span>
                  <span className="shrink-0 text-xs font-semibold">
                    <span className="text-emerald-700 dark:text-emerald-300">+{s.marks}</span>
                    {s.negative > 0 ? (
                      <span className="text-rose-700 dark:text-rose-300"> / −{s.negative}</span>
                    ) : (
                      <span className="text-muted-foreground"> / no negative</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Switch sections any time with the tabs above the question — every question stays
              reachable, and each section scores with its own marking.
            </p>
          </section>
        )}

        {/* type-in questions explainer */}
        {hasNumeric && (
          <section className="mb-6 rounded-xl border p-5">
            <h2 className="mb-3 font-reading text-base font-bold">
              Type-in questions ({sections.filter((s) => s.type === 'numeric').map((s) => s.typeName).join(', ')})
            </h2>
            <ul className="space-y-1.5 text-sm leading-6 text-muted-foreground">
              <li>
                Instead of options, you <strong className="text-foreground">type the exact value</strong>{' '}
                into the answer field — the on-screen keypad buttons or your keyboard both work.
              </li>
              <li>
                Decimals (&ldquo;0.75&rdquo;) and simple fractions (&ldquo;3/4&rdquo;) are both
                accepted; matching is exact to six decimal places.
              </li>
              <li>
                Nothing typed = unattempted = 0. {markingWording(sections.map((s) => ({ ...s, from: 0, to: 0, count: s.questionCount })))}.
              </li>
            </ul>
          </section>
        )}

        {/* calculator note */}
        {preset.calculator && (
          <p className="mb-6 flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/[0.05] px-4 py-3 text-sm">
            <Calculator className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              This paper ships the real exam&apos;s <strong>on-screen calculator</strong> — a basic
              four-function client pinned bottom-left. The paper timer keeps running while you use
              it.
            </span>
          </p>
        )}

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
              {multi && ' The palette lists the ACTIVE section; switch sections with the tabs.'}
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
              <strong className="text-foreground">2.</strong> Every correct answer earns marks per
              its section; {markingWording(sections.map((s) => ({ ...s, from: 0, to: 0, count: s.questionCount })))}; skipped
              questions score 0. Marked-for-review questions are graded like any other.
            </li>
            <li>
              <strong className="text-foreground">3.</strong> Use{' '}
              <strong className="text-foreground">Save &amp; Next</strong> to move on,{' '}
              <strong className="text-foreground">Mark for Review &amp; Next</strong> to flag and
              advance, <strong className="text-foreground">Clear Response</strong> to un-answer.
            </li>
            <li>
              <strong className="text-foreground">4.</strong> Keyboard: ←/→ move · 1–4 select
              (MCQs) · M mark · C clear. The sitting autosaves — an accidental refresh offers a
              resume with the wall-clock countdown.
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
  const timed = result.questions.filter((r) => typeof r.secs === 'number')
  const slowest = [...timed].sort((a, b) => (b.secs ?? 0) - (a.secs ?? 0)).slice(0, 3)
  const slowestIdx = (r: QuestionResult) => result.questions.indexOf(r)
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

        {/* per-section scores (multi-section papers) */}
        {result.sectionScores && result.sectionScores.length > 0 && (
          <section className="mb-4" aria-label="Section scores">
            <h3 className="mb-2 font-reading text-base font-bold">Section scores</h3>
            <div className="overflow-hidden rounded-xl border">
              {result.sectionScores.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 text-sm ${
                    i % 2 === 0 ? 'bg-muted/20' : 'bg-background'
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate font-medium">{s.label}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {s.correct} correct · {s.wrong} wrong · {s.skipped} skipped
                  </span>
                  <span className="w-20 shrink-0 text-right font-reading text-base font-bold tabular-nums">
                    {s.score}
                    <span className="text-xs font-normal text-muted-foreground">/{s.maxScore}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* time analysis */}
        {(result.avgSecsPerQuestion != null || slowest.length > 0) && (
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border px-6 py-4 text-sm">
            <span className="inline-flex items-center gap-2 font-semibold">
              <Clock3 className="h-4 w-4 text-primary" aria-hidden />
              Time analysis
            </span>
            {result.avgSecsPerQuestion != null && (
              <span className="tabular-nums text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {formatClock(result.avgSecsPerQuestion)}
                </span>{' '}
                mean per question
              </span>
            )}
            {slowest.length > 0 && (
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums text-muted-foreground">
                slowest:
                {slowest.map((r) => (
                  <span key={r.id} className="inline-flex items-center gap-1">
                    <span className="font-semibold text-foreground">Q{slowestIdx(r) + 1}</span>
                    {formatClock(r.secs ?? 0)}
                    <span
                      className={
                        r.outcome === 'correct'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : r.outcome === 'wrong'
                            ? 'text-rose-700 dark:text-rose-300'
                            : 'opacity-70'
                      }
                    >
                      ({r.outcome === 'correct' ? 'correct' : r.outcome === 'wrong' ? 'wrong' : r.outcome === 'skipped' ? 'skipped' : 'self-marked'})
                    </span>
                  </span>
                ))}
              </span>
            )}
          </div>
        )}

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
        {typeof r.secs === 'number' && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-medium tabular-nums" title="Time spent on this question">
            <Clock3 className="h-3 w-3 opacity-70" aria-hidden />
            {formatClock(r.secs)}
          </span>
        )}
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
        <div className="mb-3 space-y-2">
          {r.typed !== undefined && r.typed !== '' && (
            <p className="rounded-md border-l-2 border-muted-foreground/40 bg-muted/40 px-4 py-2.5 text-sm">
              <span className="font-semibold text-muted-foreground">You typed: </span>
              <span
                className={
                  r.outcome === 'correct'
                    ? 'font-bold text-emerald-700 dark:text-emerald-300'
                    : 'font-bold text-rose-700 dark:text-rose-300'
                }
              >
                {r.typed}
              </span>
            </p>
          )}
          <div className="rounded-md border-l-2 border-[var(--book-green)]/60 bg-[var(--book-sage)]/50 px-4 py-3 text-sm">
            <p className="mb-1 font-semibold text-[var(--book-green-ink)]">
              Answer: <RichText text={r.answerText ?? '—'} />
            </p>
          </div>
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
