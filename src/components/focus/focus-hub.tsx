'use client'

/**
 * Focus — the Focus Hub shell (/focus, owner chat directive 2026-11-18).
 *
 * The sixth primary surface: a very advanced study to-do integrated with
 * a pomodoro engine. Left: the task list (mark, estimate, link, jump) and
 * the stats census. Right rail (sticky): the wall-clock-honest timer plus
 * the engine's own notes — what it thinks you should focus on next.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BarChart3, Lightbulb, ListTodo, Loader2, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRevisionBadge } from '@/components/revision/revision-store'
import { fetchFocusOverview } from '@/lib/focus/client-api'
import { buildInsights, buildStats } from '@/lib/focus/focus-engine'
import type { FocusOverviewResponse } from '@/lib/focus/types'
import { useFocusTimer } from './focus-store'
import { PomodoroTimer } from './pomodoro-timer'
import { TaskList } from './task-list'
import { StatsTab } from './stats-tab'
import { cn } from '@/lib/utils'

const TONE_STYLE = {
  info: 'border-border bg-muted/40',
  nudge: 'border-amber-500/40 bg-amber-500/10',
  praise: 'border-emerald-500/40 bg-emerald-500/10',
} as const

export function FocusHub() {
  const refreshBadge = useRevisionBadge((s) => s.refresh)
  const [overview, setOverview] = useState<FocusOverviewResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const taskId = useFocusTimer((s) => s.taskId)
  const startTimer = useFocusTimer((s) => s.start)

  const reload = useCallback(async () => {
    const data = await fetchFocusOverview()
    if (data) setError(null)
    else setError('Could not load your to-do and focus data. Check your connection and retry.')
    setOverview(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    /* post-mount rehydrate (skipHydration) — no SSR mismatch, and a timer
     * that expired while away completes on the timer's mount effect */
    void useFocusTimer.persist.rehydrate()
    void reload()
  }, [reload])

  const stats = useMemo(
    () => buildStats(overview?.sessions ?? [], overview?.tasks ?? [], Date.now()),
    [overview],
  )
  const insights = useMemo(
    () => buildInsights(overview?.tasks ?? [], stats, Date.now()),
    [overview, stats],
  )

  const onFocusTask = useCallback(
    (id: string) => {
      const s = useFocusTimer.getState()
      if (s.running && s.taskId === id) return
      startTimer(id)
    },
    [startTimer],
  )

  const onSessionLogged = useCallback(
    (ledger: { logged: boolean; label: string | null }) => {
      void reload()
      if (ledger.logged) void refreshBadge()
    },
    [reload, refreshBadge],
  )

  if (loading && !overview) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
        <span className="ml-2 text-sm text-muted-foreground">Loading your plan…</span>
      </div>
    )
  }

  if ((error || !overview) && !loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="font-reading text-xl font-bold">Something went wrong</p>
        <p className="mt-2 text-sm text-muted-foreground">{error ?? 'Your focus data could not be loaded.'}</p>
        <Button onClick={() => void reload()} className="mt-6">Retry</Button>
      </div>
    )
  }

  if (!overview) return null

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">Library</Link>
          <span aria-hidden>/</span>
          <span className="text-foreground/80">Focus</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <Timer className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-reading text-2xl font-bold tracking-tight sm:text-3xl">Focus Hub</h1>
            <p className="text-sm text-muted-foreground">
              Your study to-do × the pomodoro engine — every bell on a linked topic also counts in the{' '}
              <Link href="/revision" className="text-primary hover:underline">Revision Hub</Link>.
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 order-2 lg:order-1">
          <Tabs defaultValue="todo">
            <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1 sm:h-9 sm:w-auto sm:justify-center">
              <TabsTrigger value="todo" className="gap-1.5">
                <ListTodo className="h-4 w-4" aria-hidden /> To-do
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-1.5">
                <BarChart3 className="h-4 w-4" aria-hidden /> Stats
              </TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              <TaskList
                tasks={overview.tasks}
                activeTaskId={taskId}
                onChanged={() => void reload()}
                onFocusTask={onFocusTask}
              />
            </TabsContent>
            <TabsContent value="stats">
              <StatsTab stats={stats} tasks={overview.tasks} />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-20" aria-label="Pomodoro timer">
          <PomodoroTimer tasks={overview.tasks} onSessionLogged={onSessionLogged} />

          <section aria-label="What the engine suggests" className="rounded-xl border bg-card p-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              <Lightbulb className="h-4 w-4 text-primary" aria-hidden /> The engine suggests
            </p>
            {insights.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nothing to nag about — yet.</p>
            ) : (
              <ul className="space-y-2">
                {insights.map((i) => (
                  <li
                    key={i.id}
                    className={cn('rounded-lg border px-3 py-2 text-xs leading-5', TONE_STYLE[i.tone])}
                  >
                    {i.text}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
              Rules, not guesses — the same pure engine that computes your stats: overdue first,
              cold starts, blown estimates, streaks.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
