'use client'

/**
 * Focus — the Stats tab of the Focus Hub.
 *
 * Every number is the pure engine's census over the raw session rows
 * (computed client-side so "today" is the learner's local day): today's
 * focus, the week bars, the streak, the all-time table and the tasks that
 * actually ate your focus time.
 */
import { Flame, ListChecks, Timer as TimerIcon, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FocusStats, TaskView } from '@/lib/focus/types'

function Tile({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <Card className="bg-card/60">
      <CardContent className="pt-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {icon} {label}
        </p>
        <p className="mt-1.5 font-reading text-2xl font-bold tabular-nums">{value}</p>
        {sub ? <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p> : null}
      </CardContent>
    </Card>
  )
}

function hoursMins(secs: number): string {
  const m = Math.round(secs / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  return `${h} h ${m % 60} min`
}

export function StatsTab({ stats, tasks }: { stats: FocusStats; tasks: TaskView[] }) {
  const weekMax = Math.max(1, ...stats.week.map((d) => d.focusMins))
  const fmtDay = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile
          icon={<TimerIcon className="h-3.5 w-3.5" aria-hidden />}
          label="Focus today"
          value={`${stats.today.focusMins} min`}
          sub={stats.today.breakMins > 0 ? `+ ${stats.today.breakMins} min breaks` : undefined}
        />
        <Tile
          icon={<Flame className="h-3.5 w-3.5" aria-hidden />}
          label="Streak"
          value={`${stats.streakDays} ${stats.streakDays === 1 ? 'day' : 'days'}`}
          sub={stats.streakDays >= 3 ? 'alive — keep it going' : 'one session extends it'}
        />
        <Tile
          icon={<ListChecks className="h-3.5 w-3.5" aria-hidden />}
          label="Tasks done today"
          value={String(stats.today.tasksDone)}
        />
        <Tile
          icon={<TrendingUp className="h-3.5 w-3.5" aria-hidden />}
          label="Pomodoros today"
          value={String(stats.today.pomos)}
          sub={`${stats.allTime.focusSessions} all time`}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">The last seven days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-36 items-end gap-2 sm:gap-3" role="img" aria-label={`Focus minutes per day over the last seven days, maximum ${weekMax} minutes`}>
            {stats.week.map((d) => {
              const isToday = d.date === stats.week[stats.week.length - 1]?.date
              const h = d.focusMins > 0 ? Math.max(4, Math.round((d.focusMins / weekMax) * 100)) : 2
              return (
                <div key={d.date} className="flex min-w-0 flex-1 flex-col items-center gap-1" title={`${d.date}: ${d.focusMins} min · ${d.pomos} pomodoro${d.pomos === 1 ? '' : 's'}`}>
                  <span className="text-[10px] tabular-nums text-muted-foreground">{d.focusMins > 0 ? d.focusMins : ''}</span>
                  <div
                    className={`w-full rounded-t-md ${isToday ? 'bg-primary' : d.focusMins > 0 ? 'bg-primary/45' : 'bg-muted'}`}
                    style={{ height: `${h}%` }}
                    aria-hidden
                  />
                  <span className={`text-[10px] ${isToday ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {fmtDay(d.date)}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Honest minutes — a stopped session counts its seconds, but only a bell that ran to the end counts as a pomodoro.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">All time</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Total focus</dt>
                <dd className="font-semibold tabular-nums">{hoursMins(stats.allTime.focusSecs)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Focus sessions</dt>
                <dd className="font-semibold tabular-nums">{stats.allTime.focusSessions}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Average session</dt>
                <dd className="font-semibold tabular-nums">{stats.allTime.avgFocusMins} min</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Longest session</dt>
                <dd className="font-semibold tabular-nums">{stats.allTime.longestSessionMins} min</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Tasks completed</dt>
                <dd className="font-semibold tabular-nums">{stats.allTime.tasksDone}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Best day</dt>
                <dd className="font-semibold tabular-nums">
                  {stats.allTime.bestDayDate ? `${stats.allTime.bestDayMins} min` : '—'}
                  {stats.allTime.bestDayDate ? <span className="ml-1 text-xs font-normal text-muted-foreground">({stats.allTime.bestDayDate})</span> : null}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Where the focus went</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No task has focus time yet — start a pomodoro on a task and it lands here.
              </p>
            ) : (
              <ul className="space-y-2.5" aria-label="Top tasks by focus time">
                {stats.topTasks.map((t, i) => (
                  <li key={t.id} className="flex items-center gap-3 text-sm">
                    <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{t.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {t.pomos} pomodoro{t.pomos === 1 ? '' : 's'}
                        {t.status === 'done' ? ' · completed' : ''}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">{t.focusMins} min</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-[11px] text-muted-foreground">
              {tasks.filter((t) => t.status === 'open').length} open task{tasks.filter((t) => t.status === 'open').length === 1 ? '' : 's'} on the list.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
