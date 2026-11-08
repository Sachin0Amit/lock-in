'use client'

/**
 * Revision & Mastery — the Insights tab: per-book standing, the full
 * least-revised rankings the user asked for (chapters, lessons, books)
 * and the recent study log. All honest ledger arithmetic.
 */
import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  Flag,
  History,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, MasteryBar, relDays, daysSinceOrUntil, StateChip } from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import type { EntryView, OverviewResponse } from '@/lib/revision/types'

interface Props {
  overview: OverviewResponse
  onChanged: () => void
}

const EVENT_ICON: Record<string, typeof History> = {
  first: CheckCircle2,
  'chapter-mark': CheckCircle2,
  'lesson-mark': CheckCircle2,
  'lesson-complete': CheckCircle2,
  revision: RotateCcw,
  quiz: Trophy,
}

function NeglectRow({
  entry,
  onRevise,
  busy,
}: {
  entry: EntryView
  onRevise: (e: EntryView) => void
  busy: boolean
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40">
      <span className={`h-2 w-2 shrink-0 rounded-full ${entry.passes <= 1 ? 'bg-rose-500' : 'bg-amber-500'}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{entry.label}</p>
        <p className="text-xs text-muted-foreground">
          {entry.bookTitle} · {entry.passes} pass{entry.passes === 1 ? '' : 'es'} · last{' '}
          {relDays(daysSinceOrUntil(entry.lastAt).n, true)} · mastery {entry.mastery}/100
        </p>
      </div>
      <StateChip state={entry.state} className="hidden sm:inline-flex" />
      <div className="flex shrink-0 items-center gap-1.5">
        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => onRevise(entry)} disabled={busy}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Revise
        </Button>
        <Button asChild size="sm" variant="ghost" className="gap-1.5">
          <Link href={entry.url}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open
          </Link>
        </Button>
      </div>
    </li>
  )
}

function BookRow({ b }: { b: OverviewResponse['bookBreakdown'][number] }) {
  const chPct = b.chaptersTotal ? Math.round((b.chaptersStudied / b.chaptersTotal) * 100) : 0
  const studied = b.chaptersStudied + b.lessonsStudied > 0
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border bg-card/60 p-4">
      <span
        className="h-10 w-10 shrink-0 rounded-lg shadow-sm"
        style={{ background: `linear-gradient(150deg, ${b.accent[0]}, ${b.accent[1]})` }}
        aria-hidden
      />
      <div className="min-w-44 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/book/${b.bookId}`} className="text-sm font-semibold hover:underline">
            {b.title}
          </Link>
          {b.dueCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
              <Flag className="h-3 w-3" aria-hidden /> {b.dueCount} due
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {b.chaptersStudied}/{b.chaptersTotal} chapters · {b.lessonsStudied}/{b.lessonsTotal} lessons ·{' '}
          {b.passes} total passes
          {b.lastActivity ? ` · last ${relDays(daysSinceOrUntil(b.lastActivity).n, true)}` : ''}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={chPct} aria-valuemin={0} aria-valuemax={100} aria-label={`${b.title} chapters studied`}>
            <div className="h-full rounded-full bg-primary/70" style={{ width: `${Math.max(1, chPct)}%` }} />
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">{chPct}% covered</span>
        </div>
      </div>
      <div className="w-40">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>avg mastery</span>
          <span className="tabular-nums font-medium text-foreground/80">
            {studied ? `${b.avgMastery}/100` : '—'}
          </span>
        </div>
        <MasteryBar
          mastery={studied ? b.avgMastery : 0}
          state={b.avgMastery >= 85 ? 'mastered' : b.avgMastery >= 65 ? 'strong' : b.avgMastery >= 40 ? 'familiar' : b.avgMastery > 0 ? 'learning' : 'new'}
        />
      </div>
    </div>
  )
}

export function InsightsTab({ overview, onChanged }: Props) {
  const { mark } = useLedgerSync()
  const [busyRef, setBusyRef] = useState<string | null>(null)
  const { bookBreakdown, leastRevised, recentEvents, summary } = overview

  const rankedBooks = [...bookBreakdown].sort(
    (a, b) =>
      b.chaptersStudied + b.lessonsStudied - (a.chaptersStudied + a.lessonsStudied) ||
      (b.lastActivity ?? '').localeCompare(a.lastActivity ?? ''),
  )

  const revise = async (entry: EntryView) => {
    setBusyRef(entry.refId)
    const results = await mark({ scope: entry.scope, refId: entry.refId }, 'revise', {
      quality: 4,
      kind: 'revision',
    })
    setBusyRef(null)
    const r = results?.[0]
    if (r?.ok) {
      toast.success(`Revision logged — pass ${r.entry?.passes}`, {
        description: `Next revision ${r.entry ? formatDate(r.entry.dueAt) : 'scheduled'}.`,
      })
      onChanged()
    }
  }

  return (
    <div className="space-y-6">
      {/* per-book standing */}
      <section aria-label="Books">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-reading text-lg font-bold">Standing by book</h3>
          <span className="text-xs text-muted-foreground">
            {summary.studiedChapters}/{summary.totalChapters} chapters studied across the library
          </span>
        </div>
        <div className="space-y-3">
          {rankedBooks.map((b) => (
            <BookRow key={b.bookId} b={b} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* least revised chapters */}
        <section aria-label="Least revised chapters">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-reading text-lg font-bold">Least revised chapters</h3>
            <span className="text-xs text-muted-foreground">ascending passes</span>
          </div>
          {leastRevised.chapters.length > 0 ? (
            <div className="overflow-hidden rounded-xl border">
              <ul className="divide-y">
                {leastRevised.chapters.map((c) => (
                  <NeglectRow key={c.refId} entry={c} onRevise={revise} busy={busyRef === c.refId} />
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
              No chapters tracked yet.
            </p>
          )}
        </section>

        {/* least revised lessons */}
        <section aria-label="Least revised lessons">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-reading text-lg font-bold">Least revised lessons</h3>
            <span className="text-xs text-muted-foreground">from the reader &amp; quizzes</span>
          </div>
          {leastRevised.lessons.length > 0 ? (
            <div className="overflow-hidden rounded-xl border">
              <ul className="divide-y">
                {leastRevised.lessons.map((l) => (
                  <NeglectRow key={l.refId} entry={l} onRevise={revise} busy={busyRef === l.refId} />
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
              No lessons tracked yet — complete lessons in the reader and they appear here.
            </p>
          )}
        </section>
      </div>

      {/* study log */}
      <section aria-label="Study log">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-4 w-4 text-primary" aria-hidden /> Study log
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                latest {recentEvents.length} events
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEvents.length > 0 ? (
              <ul className="space-y-2">
                {recentEvents.map((ev, i) => {
                  const Icon = EVENT_ICON[ev.kind] ?? History
                  return (
                    <li key={`${ev.refId}-${i}`} className="flex items-center gap-3 text-sm">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      <Link href={ev.url} className="min-w-0 flex-1 truncate hover:underline">
                        {ev.label}
                      </Link>
                      <Badge variant="secondary" className="shrink-0 font-normal">
                        {ev.kind}
                      </Badge>
                      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                        {formatDate(ev.createdAt)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nothing logged yet — marks, revisions and quiz results all land here.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* how mastery works */}
      <section className="rounded-xl border border-dashed bg-card/40 p-5">
        <h3 className="font-reading text-base font-bold">How these numbers work</h3>
        <div className="mt-3 grid gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground/80">Mastery 0–100</p>
            <p className="mt-1">
              50% revision depth (a saturating log of your passes), 30% memory freshness (an
              Ebbinghaus-style decay anchored at your reached interval), 20% answer quality
              (self-ratings and quiz scores).
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground/80">Forgetting risk</p>
            <p className="mt-1">
              A logistic curve over how far past the scheduled interval you are: ≈14% forgotten on
              the due day, 50% at twice the interval, ≈86% at three times. The queue ranks by risk,
              overdue days and weak mastery.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground/80">Scheduling</p>
            <p className="mt-1">
              SM-2-style intervals: “Again” resets to 1 day, “Hard” grows ×1.3, “Good/Easy” walk
              1 → 3 → 7 → interval × ease. Quiz scores map onto the same scale.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
