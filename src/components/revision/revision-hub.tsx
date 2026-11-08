'use client'

/**
 * Revision & Mastery — the Revision Hub shell.
 *
 * The fourth primary surface of the app (Library · Builder · My Books ·
 * Revision Hub): auth-gated like My Custom Books, three tabs (Overview,
 * Knowledge Graph, Insights), one guided revision session overlay. Guests
 * get an honest explainer instead of a paywall-shaped wall — marking even
 * works on-device without an account.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BrainCircuit,
  CalendarDays,
  Loader2,
  Network,
  RotateCcw,
  ScanEye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/components/builder/auth-store'
import { useRevisionBadge } from './revision-store'
import { fetchGraph, fetchOverview } from '@/lib/revision/client-api'
import type { GraphResponse, OverviewResponse } from '@/lib/revision/types'
import { OverviewTab } from './overview-tab'
import { InsightsTab } from './insights-tab'
import { KnowledgeGraph } from './knowledge-graph'
import { RevisionSession } from './revision-session'

function GuestHero() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
        <BrainCircuit className="h-7 w-7" aria-hidden />
      </span>
      <h1 className="font-reading text-3xl font-bold tracking-tight sm:text-4xl">
        Revision Hub
      </h1>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
        Mark chapters as studied on the go, and this hub takes over: a spaced-repetition schedule
        decides <em>when</em> to revise, a knowledge graph shows <em>how</em> everything connects,
        and honest analytics show <em>what</em> you have neglected — per chapter, topic and book.
      </p>
      <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm leading-6 text-muted-foreground">
        <li className="flex gap-2.5">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          Autonomous revision prompts — overdue items, forgetting risk and weak mastery, ranked.
        </li>
        <li className="flex gap-2.5">
          <Network className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          An interactive knowledge graph of every lesson, prerequisite and concept bridge.
        </li>
        <li className="flex gap-2.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          Revision counts, least-revised chapters and books, mastery 0–100 — all from your ledger.
        </li>
      </ul>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="gap-2">
          <Link href="/signin?next=/revision">Sign in to start tracking</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <Link href="/">
            <ScanEye className="h-4 w-4" aria-hidden /> Browse the library first
          </Link>
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Not ready for an account? “Mark studied” still works on any book page — progress is saved
        on this device and the hub unlocks the schedule, graph and analytics.
      </p>
    </div>
  )
}

export function RevisionHub() {
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)
  const load = useAuth((s) => s.load)
  const refreshBadge = useRevisionBadge((s) => s.refresh)

  const [overview, setOverview] = useState<OverviewResponse | null>(null)
  const [graph, setGraph] = useState<GraphResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [sessionSeq, setSessionSeq] = useState(0)

  useEffect(() => {
    void load()
  }, [load])

  const reload = useCallback(async () => {
    if (!user) return
    const [o, g] = await Promise.all([fetchOverview(), fetchGraph()])
    setOverview(o)
    setGraph(g)
    setError(o && g ? null : 'Could not load your revision data. Check your connection and retry.')
    void refreshBadge()
  }, [user, refreshBadge])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    void (async () => {
      const [o, g] = await Promise.all([fetchOverview(), fetchGraph()])
      if (cancelled) return
      setOverview(o)
      setGraph(g)
      setError(o && g ? null : 'Could not load your revision data. Check your connection and retry.')
      setLoading(false)
      void refreshBadge()
    })()
    return () => {
      cancelled = true
    }
  }, [user, refreshBadge])

  const openSession = useCallback(() => {
    setSessionSeq((s) => s + 1)
    setSessionOpen(true)
  }, [])

  if (!authLoaded) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
        <span className="sr-only">Loading the Revision Hub…</span>
      </div>
    )
  }

  if (!user) return <GuestHero />

  if (loading && !overview) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
        <span className="ml-2 text-sm text-muted-foreground">Loading your ledger…</span>
      </div>
    )
  }

  if ((error || !overview) && !loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <p className="font-reading text-xl font-bold">Something went wrong</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {error ?? 'Your revision data could not be loaded.'}
        </p>
        <Button onClick={() => void reload()} className="mt-6">
          Retry
        </Button>
      </div>
    )
  }

  if (!overview) return null

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">
            Library
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground/80">Revision Hub</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <BrainCircuit className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-reading text-2xl font-bold tracking-tight sm:text-3xl">
              Revision Hub
            </h1>
            <p className="text-sm text-muted-foreground">
              Spaced repetition, knowledge graph and honest analytics — from your own study ledger.
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="gap-1.5">
            <RotateCcw className="h-4 w-4" aria-hidden /> Overview
          </TabsTrigger>
          <TabsTrigger value="graph" className="gap-1.5">
            <Network className="h-4 w-4" aria-hidden /> Knowledge graph
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden /> Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab
            overview={overview}
            onChanged={() => void reload()}
            onOpenSession={openSession}
          />
        </TabsContent>
        <TabsContent value="graph">
          <KnowledgeGraph graph={graph} loading={loading} onChanged={() => void reload()} />
        </TabsContent>
        <TabsContent value="insights">
          <InsightsTab overview={overview} onChanged={() => void reload()} />
        </TabsContent>
      </Tabs>

      <RevisionSession
        key={sessionSeq}
        queue={overview.queue}
        open={sessionOpen}
        onOpenChange={setSessionOpen}
        onSessionDone={() => void reload()}
      />
    </div>
  )
}
