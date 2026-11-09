'use client'

/**
 * Practice — the Mock Exams tab: difficulty band selector, preset cards
 * (honest provisional format labels, caveats listed, never silent),
 * attempt history, and the full-screen CBT ExamRunner.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  ChevronRight,
  GraduationCap,
  History,
  Info,
  PlayCircle,
  SlidersHorizontal,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDuration } from './bits'
import { ExamRunner } from './exam-runner'
import { fetchAttempts, fetchReadiness, startExamPaper } from '@/lib/practice/client-api'
import { DIFFICULTY_BANDS } from '@/lib/practice/engine'
import type {
  AttemptView,
  DifficultyBand,
  ExamPresetView,
  ExamReadiness,
  PaperMeta,
  PracticeQuestion,
} from '@/lib/practice/types'

interface Props {
  /** preset key launched from another tab (Readiness CTA) */
  launchPreset?: string | null
  onLaunchConsumed?: () => void
}

export function ExamsTab({ launchPreset, onLaunchConsumed }: Props) {
  const [readiness, setReadiness] = useState<ExamReadiness[] | null>(null)
  const [attempts, setAttempts] = useState<AttemptView[] | null>(null)
  const [band, setBand] = useState<DifficultyBand>('standard')
  const [running, setRunning] = useState<{
    preset: ExamPresetView
    paper: PracticeQuestion[]
    meta: PaperMeta
  } | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    const [r, a] = await Promise.all([fetchReadiness(), fetchAttempts()])
    setReadiness(r ? r.exams : [])
    setAttempts(a ? a.attempts : [])
  }, [])

  /* initial load — same inline-IIFE shape as the revision hub */
  useEffect(() => {
    let cancelled = false
    void (async () => {
      const [r, a] = await Promise.all([fetchReadiness(), fetchAttempts()])
      if (cancelled) return
      setReadiness(r ? r.exams : [])
      setAttempts(a ? a.attempts : [])
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const launch = useCallback(async (presetKey: string, useBand: DifficultyBand) => {
    setBusy(presetKey)
    setError(null)
    const res = await startExamPaper(presetKey, useBand)
    setBusy(null)
    if (!res || res.paper.length === 0) {
      setError(
        res === null
          ? 'Could not generate the paper — check your connection and retry.'
          : 'Not enough MCQ questions in this scope yet — try again after more lessons are written.',
      )
      return
    }
    setRunning({ preset: res.preset!, paper: res.paper, meta: res.meta })
  }, [])

  /* a CTA from the Readiness tab launches here — await-first so no
   * setState runs synchronously inside the effect; the preset is consumed
   * only AFTER the paper arrives (consuming earlier would re-run the
   * effect and cancel the in-flight fetch) */
  const consumedRef = useRef(onLaunchConsumed)
  useEffect(() => {
    consumedRef.current = onLaunchConsumed
  }, [onLaunchConsumed])
  useEffect(() => {
    if (!launchPreset) return
    let cancelled = false
    void (async () => {
      const res = await startExamPaper(launchPreset)
      if (cancelled) return
      consumedRef.current?.()
      if (!res || res.paper.length === 0) {
        setError(
          res === null
            ? 'Could not generate the paper — check your connection and retry.'
            : 'Not enough MCQ questions in this scope yet — try again after more lessons are written.',
        )
        return
      }
      setRunning({ preset: res.preset!, paper: res.paper, meta: res.meta })
    })()
    return () => {
      cancelled = true
    }
  }, [launchPreset])

  if (running) {
    return (
      <ExamRunner
        preset={running.preset}
        paper={running.paper}
        meta={running.meta}
        onClose={() => setRunning(null)}
        onFinished={() => void reload()}
        onRestart={() => {
          void launch(running.preset.key, running.meta.band ?? 'standard')
        }}
      />
    )
  }

  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Timed papers assembled from your library&apos;s own quiz and exercise questions — honest
        negative marking, server-side grading, and a per-chapter weakness breakdown. Formats are
        approximate; scopes map the written library only, with pending topics listed openly.
      </p>

      {error && (
        <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      {/* difficulty band selector — data-derived calibration */}
      <section aria-label="Paper difficulty" className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden />
          <h2 className="font-reading text-base font-bold">Paper difficulty</h2>
        </div>
        <div
          role="radiogroup"
          aria-label="Difficulty band"
          className="grid gap-1 rounded-lg border bg-muted/40 p-1 sm:grid-cols-3"
        >
          {DIFFICULTY_BANDS.map((b) => (
            <button
              key={b.key}
              type="button"
              role="radio"
              aria-checked={band === b.key}
              onClick={() => setBand(b.key)}
              className={`rounded-md px-3 py-2 text-left transition-colors ${
                band === b.key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <span className="block text-sm font-semibold">{b.label}</span>
              <span
                className={`block text-[11px] leading-4 ${
                  band === b.key ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}
              >
                {b.hint}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Difficulty is calibrated from every attempt saved on this install — the pooled correct-rate
          per question (a p-value), smoothed toward the exercise level so thin data stays honest.
          Questions no one has attempted yet fall back to level-based estimates, labelled{' '}
          <span className="italic">est.</span> everywhere.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {(readiness ?? []).map((ex) => (
          <ExamCard
            key={ex.presetKey}
            ex={ex}
            busy={busy === ex.presetKey}
            onStart={() => void launch(ex.presetKey, band)}
          />
        ))}
        {readiness === null && <ExamCardSkeletons />}
      </div>

      <section aria-label="Recent attempts">
        <h2 className="mb-3 flex items-center gap-2 font-reading text-lg font-bold">
          <History className="h-4 w-4 text-muted-foreground" aria-hidden /> Recent attempts
        </h2>
        {attempts === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : attempts.length === 0 ? (
          <p className="rounded-lg border border-dashed px-5 py-4 text-sm text-muted-foreground">
            No papers yet — your finished exams and drills appear here with honest scores.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border">
            {attempts.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-2.5 text-sm last:border-b-0">
                <Badge variant="outline" className="shrink-0 font-normal">
                  {a.kind === 'exam' ? 'Exam' : 'Drill'}
                </Badge>
                <span className="min-w-0 flex-1 truncate font-medium">{a.presetName}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {a.correctCount}/{a.total} · {formatDuration(a.secs)} ·{' '}
                  {new Date(a.finishedAt).toLocaleDateString()}
                </span>
                <span className="w-12 shrink-0 text-right font-semibold tabular-nums">{a.percent}%</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function ExamCard({
  ex,
  busy,
  onStart,
}: {
  ex: ExamReadiness
  busy: boolean
  onStart: () => void
}) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-reading text-base font-bold">{ex.name}</h3>
        <Badge variant="secondary" className="font-normal">{ex.region}</Badge>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        {ex.durationMins} min · {ex.questionCount} questions · scope: {ex.scopeChapters} written chapter
        {ex.scopeChapters === 1 ? '' : 's'}
      </p>
      <p className="mb-1 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        {ex.formatNote}
      </p>
      {typeof ex.difficultyMix === 'number' && ex.difficultyMix > 0 && (
        <p className="mb-1 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
          <SlidersHorizontal className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>
            Question pool difficulty <span className="font-semibold text-foreground">{ex.difficultyMix}/100</span>
            {typeof ex.difficultyData === 'number' && ex.difficultyData > 0 && (
              <> · {ex.difficultyData} question{ex.difficultyData === 1 ? '' : 's'} calibrated from attempts</>
            )}
            .
          </span>
        </p>
      )}
      {ex.caveats.length > 0 && (
        <p className="mb-3 flex items-start gap-1.5 text-xs leading-5 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>
            Pending in the library: {ex.caveats.join(' · ')} — readiness reflects written chapters only.
          </span>
        </p>
      )}
      <div className="mt-auto flex items-center gap-3">
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">{ex.readiness}%</span> ready ·{' '}
          {ex.coverage}% covered
        </div>
        <Button size="sm" onClick={onStart} disabled={busy} className="ml-auto gap-1.5">
          <PlayCircle className="h-3.5 w-3.5" aria-hidden />
          {busy ? 'Preparing…' : 'Start paper'}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

function ExamCardSkeletons() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-44 animate-pulse rounded-xl border bg-muted/40" aria-hidden />
      ))}
    </>
  )
}
