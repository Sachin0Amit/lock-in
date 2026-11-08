'use client'

/**
 * Revision & Mastery — the Overview tab: autonomous prompts, the revision
 * queue, the activity calendar, mastery distribution and neglect callouts.
 * Every number is computed from the ledger — nothing is decorative.
 */
import { useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Flame,
  PlayCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DueBadge, formatDate, MasteryBar, relDays, daysSinceOrUntil, STATE_LABELS, STATE_ORDER, STATE_STYLES } from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import { revisionMinutes } from '@/lib/revision/srs'
import type { OverviewResponse, QueueItem } from '@/lib/revision/types'

interface Props {
  overview: OverviewResponse
  onChanged: () => void
  onOpenSession: () => void
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof Activity
  label: string
  value: string
  sub?: string
  tone?: 'rose' | 'amber' | 'emerald' | 'default'
}) {
  const toneCls =
    tone === 'rose'
      ? 'border-rose-500/40 bg-rose-500/[0.07]'
      : tone === 'amber'
        ? 'border-amber-500/40 bg-amber-500/[0.07]'
        : tone === 'emerald'
          ? 'border-emerald-500/40 bg-emerald-500/[0.07]'
          : 'border-border bg-card/60'
  return (
    <div className={`rounded-xl border p-4 ${toneCls}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-1.5 font-reading text-2xl font-bold tabular-nums leading-none">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

function ActivityCalendar({ activity }: { activity: OverviewResponse['activity'] }) {
  const weeks: OverviewResponse['activity'][] = []
  for (let i = 0; i < activity.length; i += 7) weeks.push(activity.slice(i, i + 7))
  const max = Math.max(1, ...activity.map((d) => d.count))
  const shade = (n: number) => {
    if (n === 0) return 'bg-muted'
    const t = n / max
    if (t > 0.66) return 'bg-emerald-600 dark:bg-emerald-500'
    if (t > 0.33) return 'bg-emerald-500/70 dark:bg-emerald-500/70'
    return 'bg-emerald-500/40 dark:bg-emerald-500/40'
  }
  return (
    <div className="flex gap-[3px] overflow-x-auto pb-1" role="img" aria-label="Study activity over the last 12 weeks">
      {weeks.map((w, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {w.map((d) => (
            <span
              key={d.date}
              className={`h-3.5 w-3.5 rounded-[3px] ${shade(d.count)} transition-colors`}
              title={`${d.date}: ${d.count} study event${d.count === 1 ? '' : 's'}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function QueueRow({
  item,
  onQuickRevise,
  busy,
}: {
  item: QueueItem
  onQuickRevise: (item: QueueItem) => void
  busy: boolean
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold">{item.label}</span>
          <DueBadge entry={item} />
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {item.bookTitle} · {item.reason} · mastery {item.mastery}/100
        </p>
        <div className="mt-1.5 max-w-56">
          <MasteryBar mastery={item.mastery} state={item.state} />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => onQuickRevise(item)}
          disabled={busy}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Revise
        </Button>
        <Button asChild size="sm" variant="ghost" className="gap-1.5">
          <Link href={item.url}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open
          </Link>
        </Button>
      </div>
    </li>
  )
}

export function OverviewTab({ overview, onChanged, onOpenSession }: Props) {
  const { mark } = useLedgerSync()
  const { summary, queue, activity, masteryHistogram, leastRevised } = overview
  const [busyRef, setBusyRef] = useState<string | null>(null)

  const nextUp = queue.slice(0, 5)
  const totalChapters = summary.totalChapters

  const quickRevise = async (item: QueueItem) => {
    setBusyRef(item.refId)
    const results = await mark({ scope: item.scope, refId: item.refId }, 'revise', {
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
      {/* hero */}
      <section className="relative overflow-hidden rounded-xl border bg-card p-5 sm:p-6">
        <BrainCircuit className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-primary/10" aria-hidden />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-xl">
            <h2 className="font-reading text-2xl font-bold tracking-tight">Your revision plan</h2>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {summary.dueCount > 0
                ? `${summary.dueCount} item${summary.dueCount === 1 ? ' is' : 's are'} due and ${summary.watchCount} more ${summary.watchCount === 1 ? 'is' : 'are'} drifting — the schedule picked them from your ledger, ranked by forgetting risk.`
                : summary.studiedChapters + summary.studiedLessons > 0
                  ? 'Nothing is due right now — your memory is inside its scheduled windows. We will prompt you the moment something drifts.'
                  : 'Mark chapters as studied from any book page (or lessons from the reader) — from then on, the hub schedules and prompts every revision for you.'}
            </p>
          </div>
          {queue.length > 0 && (
            <Button onClick={onOpenSession} className="gap-2" size="lg">
              <PlayCircle className="h-4 w-4" aria-hidden />
              Start revision session
              <span className="hidden text-xs font-normal opacity-80 sm:inline">
                {queue.length} items · ≈{summary.estMins || queue.reduce((n, q) => n + revisionMinutes(q.readMins), 0)} min
              </span>
            </Button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <StatTile
            icon={Flame}
            label="Due now"
            value={String(summary.dueCount)}
            sub={summary.estMins > 0 ? `≈ ${summary.estMins} min` : 'nothing waiting'}
            tone={summary.dueCount > 0 ? 'rose' : 'default'}
          />
          <StatTile
            icon={Activity}
            label="Watch list"
            value={String(summary.watchCount)}
            sub="at risk of fading"
            tone={summary.watchCount > 0 ? 'amber' : 'default'}
          />
          <StatTile
            icon={BookOpen}
            label="Chapters studied"
            value={`${summary.studiedChapters}/${totalChapters}`}
            sub={`${summary.studiedLessons}/${summary.totalLessons} lessons`}
          />
          <StatTile
            icon={TrendingUp}
            label="Average mastery"
            value={summary.avgMastery ? `${summary.avgMastery}/100` : '—'}
            sub={`${summary.totalPasses} total revision passes`}
            tone={summary.avgMastery >= 65 ? 'emerald' : 'default'}
          />
          <StatTile
            icon={RotateCcw}
            label="Revisions · 7 days"
            value={String(summary.revisions7d)}
            sub={summary.lastActivity ? `last ${relDays(daysSinceOrUntil(summary.lastActivity).n, true)}` : 'no activity yet'}
          />
          <StatTile
            icon={CalendarDays}
            label="Active days"
            value={String(summary.activeDays)}
            sub="with study events"
          />
        </div>
      </section>

      {/* queue */}
      <section aria-label="Revision queue">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-reading text-lg font-bold">What to revise next</h3>
          <span className="text-xs text-muted-foreground">
            ranked by urgency — risk, overdue days and weak mastery
          </span>
        </div>
        {queue.length > 0 ? (
          <div className="overflow-hidden rounded-xl border">
            <ul className="divide-y">
              {queue.slice(0, 12).map((item) => (
                <QueueRow key={`${item.scope}:${item.refId}`} item={item} onQuickRevise={quickRevise} busy={busyRef === item.refId} />
              ))}
            </ul>
            {queue.length > 12 && (
              <p className="border-t bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                +{queue.length - 12} more — run a session to clear them faster.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
            {summary.studiedChapters + summary.studiedLessons > 0 ? (
              <>
                Nothing to revise — everything is fresh.{' '}
                {overview.entries.length > 0 && (
                  <span>
                    Next scheduled:{' '}
                    {formatDate(
                      overview.entries.map((e) => e.dueAt).sort().at(0)!,
                    )}
                    .
                  </span>
                )}
              </>
            ) : (
              <>
                Nothing tracked yet. Open any{' '}
                <Link href="/" className="font-medium text-primary hover:underline">
                  library book
                </Link>{' '}
                and use “Mark studied” on a chapter — the hub takes over from there.
              </>
            )}
          </div>
        )}
        {nextUp.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Coming up:{' '}
            {nextUp
              .slice(0, 3)
              .map((q) => `${q.label} (${relDays(daysSinceOrUntil(q.dueAt).n, false)})`)
              .join(' · ')}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden /> Study activity
              <span className="ml-auto text-xs font-normal text-muted-foreground">last 12 weeks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActivityCalendar activity={activity} />
            <p className="text-xs text-muted-foreground">
              {summary.activeDays} active day{summary.activeDays === 1 ? '' : 's'} ·{' '}
              {summary.revisions7d} revisions this week. Each square is a day; colour deepens with
              study events.
            </p>
          </CardContent>
        </Card>

        {/* mastery distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Mastery across all{' '}
              {totalChapters} chapters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {STATE_ORDER.map((state) => {
              const row = masteryHistogram.find((h) => h.state === state)
              const count = row?.count ?? 0
              const pct = totalChapters ? Math.round((count / totalChapters) * 100) : 0
              return (
                <div key={state} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">
                    {STATE_LABELS[state]}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${STATE_STYLES[state].bar}`}
                      style={{ width: `${Math.max(1, pct)}%` }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {count} · {pct}%
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* least revised */}
      {leastRevised.chapters.length > 0 && (
        <section aria-label="Least revised">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-reading text-lg font-bold">Needs your attention</h3>
            <span className="text-xs text-muted-foreground">fewest passes · oldest touch</span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {leastRevised.chapters.slice(0, 6).map((c) => (
              <div key={c.refId} className="flex items-center gap-3 rounded-xl border bg-card/60 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {c.bookTitle} · {c.passes} pass{c.passes === 1 ? '' : 'es'} · last touched{' '}
                    {relDays(daysSinceOrUntil(c.lastAt).n, true)}
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <Link href={c.url}>
                    Revise <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          {leastRevised.books.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/70">Least revised books:</span>
              {leastRevised.books.map((b) => (
                <Badge key={b} variant="secondary" className="font-normal">
                  {b}
                </Badge>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
