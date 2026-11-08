'use client'

/**
 * Practice — the Mistake Bank tab.
 *
 * Every wrong quiz answer and self-reported exercise miss lives here as
 * a spaced-repetition card (the same SM-2-lite engine as the study
 * ledger). Due cards are reviewed with the honest four-button rating;
 * two consecutive good reviews — or a correct retake in the reader —
 * retire a card.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Flame,
  Inbox,
  RotateCcw,
  Undo2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { RichText } from '@/components/library/math'
import { StateChip, relDays } from '@/components/revision/mastery-bits'
import { fetchMistakes, reviewMistake } from '@/lib/practice/client-api'
import type { MistakeView, MistakesResponse } from '@/lib/practice/types'

const RATINGS: { quality: number; label: string; hint: string }[] = [
  { quality: 1, label: 'Again', hint: 'Reset — review again tomorrow' },
  { quality: 3, label: 'Hard', hint: 'Modest growth' },
  { quality: 4, label: 'Good', hint: 'Full ladder step' },
  { quality: 5, label: 'Easy', hint: 'Long interval' },
]

export function MistakesTab() {
  const [data, setData] = useState<MistakesResponse | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const reload = useCallback(async () => {
    const d = await fetchMistakes()
    setData(d)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const rate = async (m: MistakeView, quality: number) => {
    setBusyId(m.id)
    const r = await reviewMistake(m.id, quality)
    setBusyId(null)
    if (!r?.ok) {
      toast.error('Could not save the review — try again.')
      return
    }
    if (r.resolved) {
      toast.success('Mistake retired', {
        description: 'Two good reviews in a row — this one is banked as fixed.',
      })
    } else if (r.mistake) {
      const d = relDays(
        Math.max(0, Math.round((new Date(r.mistake.dueAt).getTime() - Date.now()) / 86400000)),
        false,
      )
      toast.success(`Next review ${d}`, {
        description: `Pass ${r.mistake.passes} · mastery ${r.mistake.mastery}/100.`,
      })
    }
    void reload()
  }

  if (!data) {
    return <p className="py-16 text-center text-sm text-muted-foreground">Loading your Mistake Bank…</p>
  }

  const { stats, due, upcoming, resolved } = data
  const empty = stats.total === 0 && stats.resolved === 0

  if (empty) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Inbox className="h-6 w-6" aria-hidden />
        </span>
        <p className="font-reading text-xl font-bold">No mistakes banked yet</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Wrong answers in lesson quizzes, drills and mock exams land here automatically as
          spaced-repetition cards. Miss an exercise? Self-report it with &ldquo;I missed it&rdquo;.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Open cards" value={stats.total} icon={<ClipboardList className="h-4 w-4" aria-hidden />} />
        <StatTile label="Due now" value={stats.due} icon={<Flame className="h-4 w-4 text-rose-600 dark:text-rose-400" aria-hidden />} tone={stats.due > 0 ? 'rose' : 'muted'} />
        <StatTile label="Upcoming" value={stats.upcoming} icon={<RotateCcw className="h-4 w-4" aria-hidden />} />
        <StatTile label="Retired" value={stats.resolved} icon={<CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />} tone="emerald" />
      </div>

      {stats.total > 0 && (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Retirement progress</span>
            <span className="tabular-nums">
              {stats.resolved}/{stats.total + stats.resolved} resolved
            </span>
          </div>
          <Progress value={(stats.resolved / Math.max(1, stats.total + stats.resolved)) * 100} className="h-2" aria-label="Mistakes resolved" />
        </div>
      )}

      {/* due cards */}
      <section aria-label="Due for review">
        <h2 className="mb-3 font-reading text-lg font-bold">
          Due for review{' '}
          <span className="text-sm font-normal text-muted-foreground">
            ({due.length} card{due.length === 1 ? '' : 's'})
          </span>
        </h2>
        {due.length === 0 ? (
          <p className="rounded-lg border border-dashed px-5 py-4 text-sm text-muted-foreground">
            Nothing due right now — cards return here when their schedule says so.
          </p>
        ) : (
          <div className="space-y-4">
            {due.map((m) => (
              <MistakeCard key={m.id} m={m} busy={busyId === m.id} onRate={rate} />
            ))}
          </div>
        )}
      </section>

      {/* upcoming */}
      {upcoming.length > 0 && (
        <section aria-label="Upcoming reviews">
          <h2 className="mb-3 font-reading text-lg font-bold">
            Upcoming{' '}
            <span className="text-sm font-normal text-muted-foreground">({upcoming.length})</span>
          </h2>
          <div className="overflow-hidden rounded-xl border">
            {upcoming.map((m) => (
              <div key={m.id} className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-2.5 text-sm last:border-b-0">
                <Badge variant="outline" className="shrink-0 font-normal">
                  {m.source === 'quiz' ? 'Quiz' : 'Exercise'}
                </Badge>
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{stripMath(m.prompt)}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {m.overdueDays >= 0
                    ? relDays(
                        Math.max(0, Math.round((new Date(m.dueAt).getTime() - Date.now()) / 86400000)),
                        false,
                      )
                    : ''}
                </span>
                <StateChip state={m.state} className="shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* resolved */}
      {resolved.length > 0 && (
        <section aria-label="Resolved mistakes">
          <Collapsible>
            <CollapsibleTrigger className="group flex w-full items-center gap-2 font-reading text-lg font-bold">
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" aria-hidden />
              Retired ({stats.resolved})
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="overflow-hidden rounded-xl border">
                {resolved.map((m) => (
                  <div key={m.id} className="flex flex-wrap items-center gap-3 border-b bg-muted/20 px-4 py-2.5 text-sm opacity-70 last:border-b-0">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">{stripMath(m.prompt)}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      ×{m.timesWrong} wrong · retired{' '}
                      {new Date(m.resolvedAt!).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>
      )}
    </div>
  )
}

function StatTile({
  label,
  value,
  icon,
  tone = 'default',
}: {
  label: string
  value: number
  icon: React.ReactNode
  tone?: 'default' | 'rose' | 'emerald' | 'muted'
}) {
  const cls =
    tone === 'rose'
      ? 'border-rose-500/40 bg-rose-500/[0.06]'
      : tone === 'emerald'
        ? 'border-emerald-500/40 bg-emerald-500/[0.06]'
        : 'bg-card'
  return (
    <div className={`rounded-xl border p-4 ${cls}`}>
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1 font-reading text-2xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

function MistakeCard({
  m,
  busy,
  onRate,
}: {
  m: MistakeView
  busy: boolean
  onRate: (m: MistakeView, quality: number) => void
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="font-normal">
          {m.source === 'quiz' ? 'Quiz' : 'Exercise'}
        </Badge>
        <Link
          href={m.url}
          className="font-medium text-foreground/80 underline-offset-2 hover:underline"
        >
          {m.lessonNumber} · {m.lessonTitle}
        </Link>
        <span className="hidden sm:inline">
          {m.bookTitle} — ch. {m.chapterNumber} · {m.chapterTitle}
        </span>
        {m.timesWrong > 1 && (
          <Badge variant="secondary" className="ml-auto shrink-0 font-normal tabular-nums">
            ×{m.timesWrong} wrong
          </Badge>
        )}
      </div>

      <p className="mb-3 font-medium leading-7">
        <RichText text={m.prompt} />
      </p>

      <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
        <div className="rounded-md border border-rose-500/30 bg-rose-500/[0.06] px-3 py-2">
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
            You answered
          </p>
          <p className="leading-6 text-foreground/90">
            <RichText text={m.given || '—'} />
          </p>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-2">
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Correct
          </p>
          <p className="leading-6 text-foreground/90">
            <RichText text={m.expected || '—'} />
          </p>
        </div>
      </div>

      {m.explain && (
        <Collapsible>
          <CollapsibleTrigger className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
            Why
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-md border bg-muted/40 px-4 py-3 text-sm leading-6 text-foreground/90">
            <RichText text={m.explain} />
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="mt-4 border-t pt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          How well do you know it now?
        </p>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <Button
              key={r.quality}
              size="sm"
              variant={r.quality === 1 ? 'destructive' : 'outline'}
              disabled={busy}
              onClick={() => onRate(m, r.quality)}
              title={r.hint}
              className="gap-1.5"
            >
              {r.quality === 1 && <RotateCcw className="h-3.5 w-3.5" aria-hidden />}
              {r.label}
            </Button>
          ))}
          <span className="ml-auto hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
            <Undo2 className="h-3 w-3" aria-hidden /> pass {m.passes} · mastery {m.mastery}/100
          </span>
        </div>
      </div>
    </div>
  )
}

/** one-line preview for list rows: strip $…$ math to its raw text */
function stripMath(s: string): string {
  return s.replace(/\$[^$]*\$/g, (m) => m.slice(1, -1)).slice(0, 90)
}
