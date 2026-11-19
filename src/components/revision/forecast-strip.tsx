'use client'

/**
 * Revision & Mastery — the forecast strip (Overview tab).
 *
 * Projects the ledger 7 days forward with the same transparent formulas
 * the hub already shows for today: each column is one day, its bar the
 * work that will be waiting (due + newly at-risk) if nothing is revised.
 * Under it, the honest counterfactual — what skipping TODAY costs
 * tomorrow — because with deterministic SRS intervals that number is
 * exact, and it is the strongest motivator a spaced-repetition app can
 * show. The streak banner rides the same data: one 5-minute session
 * saves a multi-day streak.
 */
import { useMemo } from 'react'
import Link from 'next/link'
import { AlertTriangle, CalendarDays, Flame, TrendingDown } from 'lucide-react'
import { forecastDays, streakOf } from '@/lib/revision/forecast'
import type { EntryView, OverviewResponse } from '@/lib/revision/types'

interface Props {
  entries: EntryView[]
  activity: OverviewResponse['activity']
  dueNow: number
  /** fastest honest fix: the queue is already ranked by urgency */
  onQuickSession: () => void
}

export function ForecastStrip({ entries, activity, dueNow, onQuickSession }: Props) {
  const days = useMemo(() => forecastDays(entries, 7), [entries])
  const streak = useMemo(() => streakOf(activity), [activity])

  const max = Math.max(1, ...days.map((d) => d.dueCount + d.riskCount))
  const tomorrow = days[1]
  const skipCost = tomorrow ? tomorrow.dueCount - dueNow : 0

  return (
    <section
      aria-label="Memory forecast"
      className="rounded-xl border bg-card/60 p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-reading text-lg font-bold">The next 7 days</h3>
        <span className="text-xs text-muted-foreground">
          projected from your ledger — nothing revised means everything waits
        </span>
      </div>

      {/* day columns */}
      <div
        className="flex items-end gap-1.5 sm:gap-2.5"
        role="img"
        aria-label="Forecast: due and at-risk items per day for the next seven days"
      >
        {days.map((d) => {
          /* due (rose) sits at the bottom — the work that will actually be
           * waiting; at-risk (amber) stacks above it as the warning band */
          const dueH = Math.round((d.dueCount / max) * 56)
          const riskH = Math.round((d.riskCount / max) * 56)
          return (
            <div key={d.dateKey} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
                {d.dueCount + d.riskCount > 0 ? d.dueCount + d.riskCount : '·'}
              </span>
              <div
                className="flex h-16 w-full max-w-14 flex-col justify-end gap-[3px] overflow-hidden rounded-md bg-muted p-0.5"
                title={`${d.weekday}: ${d.dueCount} due · ${d.riskCount} at risk`}
              >
                {d.riskCount > 0 && (
                  <div className="w-full rounded-[2px] bg-amber-500/70" style={{ height: Math.max(4, riskH) }} />
                )}
                {d.dueCount > 0 && (
                  <div className="w-full rounded-[2px] bg-rose-500/80" style={{ height: Math.max(4, dueH) }} />
                )}
              </div>
              <span
                className={`truncate text-[11px] ${d.dayOffset === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
              >
                {d.weekday}
              </span>
            </div>
          )
        })}
      </div>

      {/* legend + counterfactual */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-rose-500/80" aria-hidden /> due
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-amber-500/70" aria-hidden /> crossing 25% forgetting risk
        </span>
      </div>

      {dueNow > 0 && tomorrow && (
        <p className="mt-3 flex items-start gap-2 text-sm leading-6">
          <TrendingDown className="mt-1 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden />
          <span>
            <span className="font-semibold">
              Skip today and tomorrow starts with {tomorrow.dueCount} item{tomorrow.dueCount === 1 ? '' : 's'}
            </span>{' '}
            ({dueNow} now{skipCost > 0 ? ` · +${skipCost} new overnight` : ''}). Every revision pushes its whole
            curve — clearing the queue today flattens the whole week.{' '}
            <button
              type="button"
              onClick={onQuickSession}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Start now
            </button>
          </span>
        </p>
      )}

      {/* streak */}
      {streak.current > 0 && (
        <p className="mt-2.5 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-semibold text-amber-700 dark:text-amber-300">
            <Flame className="h-3.5 w-3.5" aria-hidden />
            {streak.current}-day streak
          </span>
          {streak.atRisk ? (
            <span className="inline-flex flex-wrap items-center gap-1.5 text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
              today is still empty — one session saves it.{' '}
              <button
                type="button"
                onClick={onQuickSession}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Protect it
              </button>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              already active today — nothing to protect.
            </span>
          )}
          <Link href="/focus" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
            plan it in the Focus Hub
          </Link>
        </p>
      )}
    </section>
  )
}
