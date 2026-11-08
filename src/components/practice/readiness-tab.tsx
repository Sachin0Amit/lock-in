'use client'

/**
 * Practice — the Readiness tab.
 *
 * The honest headline: readiness = coverage × mastery × freshness per
 * book and per exam preset scope, all computed from the study ledger —
 * nothing decorative, unstudied chapters count as zero. Exam cards carry
 * the provisional-scope caveats openly and launch straight into a mock
 * paper.
 */
import { useEffect, useState } from 'react'
import { AlertTriangle, ChevronRight, Info, PlayCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MetricBar, ReadinessDial } from './bits'
import { StatusBadge } from '@/components/library/bits'
import { fetchReadiness } from '@/lib/practice/client-api'
import type { BookReadiness, ExamReadiness, ReadinessResponse } from '@/lib/practice/types'

interface Props {
  onStartExam: (presetKey: string) => void
}

export function ReadinessTab({ onStartExam }: Props) {
  const [data, setData] = useState<ReadinessResponse | null>(null)

  useEffect(() => {
    void (async () => {
      setData(await fetchReadiness())
    })()
  }, [])

  if (!data) {
    return <p className="py-16 text-center text-sm text-muted-foreground">Computing your readiness…</p>
  }

  return (
    <div className="space-y-10">
      {/* formula explainer */}
      <p className="max-w-3xl rounded-lg border border-dashed px-5 py-4 text-sm leading-6 text-muted-foreground">
        <span className="font-semibold text-foreground/80">How readiness is computed — </span>
        per chapter it is coverage (share of lessons in your ledger) × mastery × freshness (100 −
        forgetting risk); books and exams average their chapters. Studying nothing scores exactly 0
        — the number never flatters you.
      </p>

      {/* library headline */}
      <section className="flex flex-wrap items-center gap-6 rounded-xl border bg-muted/30 p-6">
        <ReadinessDial value={data.library.readiness} size={110} label="ready" />
        <div className="min-w-0 flex-1">
          <h2 className="font-reading text-xl font-bold">Whole library</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {data.library.chaptersTracked} of {data.library.chaptersTotal} chapters tracked in your
            ledger
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="min-w-[140px] flex-1">
              <MetricBar label="Coverage" value={data.library.coverage} />
            </div>
            <div className="min-w-[140px] flex-1">
              <MetricBar label="Mastery" value={data.library.mastery} />
            </div>
            <div className="min-w-[140px] flex-1">
              <MetricBar label="Freshness" value={data.library.freshness} />
            </div>
          </div>
        </div>
      </section>

      {/* books */}
      <section aria-label="Book readiness">
        <h2 className="mb-4 font-reading text-xl font-bold">Your books</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.books.map((b) => (
            <BookCard key={b.bookId} b={b} />
          ))}
        </div>
      </section>

      {/* exams */}
      <section aria-label="Exam readiness">
        <h2 className="mb-1 font-reading text-xl font-bold">Exam readiness</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Provisional scopes over the written library — pending topics are listed, never hidden.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {data.exams.map((ex) => (
            <ExamReadyCard key={ex.presetKey} ex={ex} onStart={() => onStartExam(ex.presetKey)} />
          ))}
        </div>
      </section>
    </div>
  )
}

function BookCard({ b }: { b: BookReadiness }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <ReadinessDial value={b.readiness} size={72} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-reading text-base font-bold">{b.title}</h3>
            <StatusBadge status={b.status} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {b.chaptersTracked}/{b.chaptersTotal} chapters tracked
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-3">
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Coverage" value={b.coverage} />
        </div>
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Mastery" value={b.mastery} />
        </div>
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Freshness" value={b.freshness} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronRight
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
          aria-hidden
        />
        Per chapter
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5">
          {b.chapters.map((c) => (
            <li key={c.key} className="flex items-center gap-3 text-xs">
              <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-muted-foreground">
                {c.chapterNumber}
              </span>
              <span className="min-w-0 flex-1 truncate">{c.chapterTitle}</span>
              <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.readiness}%`,
                    background: c.readiness >= 65 ? '#10b981' : c.readiness >= 40 ? '#f59e0b' : c.readiness > 0 ? '#f97316' : 'transparent',
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-semibold tabular-nums">{c.readiness}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ExamReadyCard({ ex, onStart }: { ex: ExamReadiness; onStart: () => void }) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <ReadinessDial value={ex.readiness} size={72} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-reading text-base font-bold">{ex.name}</h3>
            <Badge variant="secondary" className="font-normal">{ex.region}</Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ex.scopeChapters} written chapter{ex.scopeChapters === 1 ? '' : 's'} in scope ·{' '}
            {ex.questionCount} questions · {ex.durationMins} min
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-3">
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Coverage" value={ex.coverage} />
        </div>
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Mastery" value={ex.mastery} />
        </div>
        <div className="min-w-[110px] flex-1">
          <MetricBar label="Freshness" value={ex.freshness} />
        </div>
      </div>
      {ex.caveats.length > 0 && (
        <p className="mb-3 flex items-start gap-1.5 text-xs leading-5 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Pending in the library: {ex.caveats.join(' · ')}.</span>
        </p>
      )}
      <p className="mb-4 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        {ex.formatNote}
      </p>
      <Button size="sm" onClick={onStart} className="mt-auto gap-1.5">
        <PlayCircle className="h-3.5 w-3.5" aria-hidden /> Take a mock paper
      </Button>
    </div>
  )
}
