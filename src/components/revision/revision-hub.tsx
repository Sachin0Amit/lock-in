'use client'

/**
 * Revision & Mastery — the Revision Hub shell.
 *
 * The fourth primary surface of the app (Library · Builder · My Books ·
 * Revision Hub): open to everyone — no account needed, marks land in the
 * local study ledger — three tabs (Overview, Knowledge Graph, Insights)
 * and one guided revision session overlay.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BrainCircuit,
  CalendarDays,
  Loader2,
  Network,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRevisionBadge } from './revision-store'
import { fetchGraph, fetchOverview } from '@/lib/revision/client-api'
import type { GraphResponse, OverviewResponse } from '@/lib/revision/types'
import { OverviewTab } from './overview-tab'
import { InsightsTab } from './insights-tab'
import { KnowledgeGraph } from './knowledge-graph'
import { RevisionSession } from './revision-session'

export function RevisionHub() {
  const refreshBadge = useRevisionBadge((s) => s.refresh)

  const [overview, setOverview] = useState<OverviewResponse | null>(null)
  const [graph, setGraph] = useState<GraphResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [sessionSeq, setSessionSeq] = useState(0)

  const reload = useCallback(async () => {
    const [o, g] = await Promise.all([fetchOverview(), fetchGraph()])
    setOverview(o)
    setGraph(g)
    setError(o && g ? null : 'Could not load your revision data. Check your connection and retry.')
    void refreshBadge()
  }, [refreshBadge])

  useEffect(() => {
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
  }, [refreshBadge])

  const openSession = useCallback(() => {
    setSessionSeq((s) => s + 1)
    setSessionOpen(true)
  }, [])

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
