'use client'

/**
 * Practice — the hub shell.
 *
 * The fifth primary surface of the app (Library · Builder · My Books ·
 * Revision Hub · Practice): open to everyone, no account needed. Four
 * tabs — Mock Exams (timed, negative-marked papers generated from the
 * library's own questions), Adaptive Drill (ledger-driven practice on
 * your weakest chapters), Mistake Bank (every wrong answer becomes a
 * spaced-repetition card), and Readiness (coverage × mastery × freshness
 * per book and per exam).
 */
import Link from 'next/link'
import { ClipboardList, Flame, GraduationCap, Loader2, Target } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExamsTab } from './exams-tab'
import { DrillTab } from './drill-tab'
import { MistakesTab } from './mistakes-tab'
import { ReadinessTab } from './readiness-tab'

export function PracticeHub() {
  const [tab, setTab] = useState('exams')
  const [launchPreset, setLaunchPreset] = useState<string | null>(null)

  const startExam = (presetKey: string) => {
    setLaunchPreset(presetKey)
    setTab('exams')
  }
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">
            Library
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground/80">Practice</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <Target className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-reading text-2xl font-bold tracking-tight sm:text-3xl">Practice</h1>
            <p className="text-sm text-muted-foreground">
              Mock exams, adaptive drills and your Mistake Bank — generated from the library&apos;s own
              questions, honestly scored.
            </p>
          </div>
        </div>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6 h-auto w-full flex-wrap justify-start gap-1 sm:h-9 sm:w-auto sm:justify-center">
          <TabsTrigger value="exams" className="gap-1.5">
            <GraduationCap className="h-4 w-4" aria-hidden /> Mock exams
          </TabsTrigger>
          <TabsTrigger value="drill" className="gap-1.5">
            <Flame className="h-4 w-4" aria-hidden /> Adaptive drill
          </TabsTrigger>
          <TabsTrigger value="mistakes" className="gap-1.5">
            <ClipboardList className="h-4 w-4" aria-hidden /> Mistake Bank
          </TabsTrigger>
          <TabsTrigger value="readiness" className="gap-1.5">
            <Target className="h-4 w-4" aria-hidden /> Readiness
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exams">
          <ExamsTab
            launchPreset={launchPreset}
            onLaunchConsumed={() => setLaunchPreset(null)}
          />
        </TabsContent>
        <TabsContent value="drill">
          <DrillTab />
        </TabsContent>
        <TabsContent value="mistakes">
          <MistakesTab />
        </TabsContent>
        <TabsContent value="readiness">
          <ReadinessTab onStartExam={startExam} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function PracticeLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex h-48 items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />
      <span className="ml-2 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
