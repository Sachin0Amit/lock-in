'use client'

/**
 * Revision & Mastery — the Progress tab (owner directive 2026-11-18).
 *
 * "I want analysis of what topic I have studied, which book I have
 * completed, how many questions I have understood … I mark them, then it
 * stores list down here in the progress … an engine should analyse which
 * topic I have studied least or revised least, tell me to revise it
 * again, practice few questions on it."
 *
 * Five honest sections, all fed by GET /api/revision/progress:
 *   1. the study-progress hero (coverage, books, questions understood)
 *   2. what the engine recommends (priority-ranked, explainable)
 *   3. your studied topics — the stored ledger list with revision counts,
 *      one click to revise (or open) any topic
 *   4. book completion standing with filters
 *   5. mark topics as studied — the in-hub picker (book → chapter →
 *      section), the same ledger the whole app writes to
 */
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Flag,
  Layers,
  ListChecks,
  PlayCircle,
  Plus,
  RotateCcw,
  Target,
  TrendingUp,
  Undo2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DueBadge,
  formatDate,
  MasteryBar,
  relDays,
  daysSinceOrUntil,
  StateChip,
} from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import { QuickMarkChapter, QuickMarkLesson } from './quick-mark'
import type {
  BookProgress,
  BookProgressStatus,
  ProgressResponse,
  Recommendation,
} from '@/lib/revision/types'

interface Props {
  progress: ProgressResponse
  onChanged: () => void
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */

function fmtWords(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const STATUS_META: Record<BookProgressStatus, { label: string; chip: string }> = {
  completed: {
    label: 'Completed',
    chip: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  'in-progress': {
    label: 'In progress',
    chip: 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300',
  },
  started: {
    label: 'Started',
    chip: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
  untouched: {
    label: 'Untouched',
    chip: 'border-border bg-muted/60 text-muted-foreground',
  },
}

const REC_META: Record<Recommendation['kind'], { icon: typeof RotateCcw; label: string; cls: string }> = {
  revise: { icon: RotateCcw, label: 'Revise again', cls: 'text-amber-600 dark:text-amber-300' },
  practice: { icon: Target, label: 'Practice questions', cls: 'text-rose-600 dark:text-rose-300' },
  continue: { icon: PlayCircle, label: 'Continue the book', cls: 'text-teal-600 dark:text-teal-300' },
  finish: { icon: Flag, label: 'Finish the chapter', cls: 'text-sky-600 dark:text-sky-300' },
  start: { icon: ArrowRight, label: 'Start the next chapter', cls: 'text-violet-600 dark:text-violet-300' },
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof BookOpen
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

/* ------------------------------------------------------------------ */
/* 2. Recommendations                                                   */
/* ------------------------------------------------------------------ */

function RecommendationRow({
  rec,
  onQuickRevise,
  busy,
}: {
  rec: Recommendation
  onQuickRevise: (rec: Recommendation) => void
  busy: boolean
}) {
  const meta = REC_META[rec.kind]
  const Icon = meta.icon
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-card ${meta.cls}`}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={rec.url} className="text-sm font-semibold hover:underline">
            {rec.topic}
          </Link>
          <Badge variant="secondary" className="font-normal">
            {meta.label}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          {rec.bookTitle} · {rec.reason}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-1.5">
        {rec.kind === 'revise' && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => onQuickRevise(rec)}
            disabled={busy}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Log revision
          </Button>
        )}
        {rec.practiceUrl && (
          <Button asChild size="sm" variant="outline" className="gap-1.5">
            <Link href={rec.practiceUrl}>
              <Target className="h-3.5 w-3.5" aria-hidden /> Practice
            </Link>
          </Button>
        )}
        <Button asChild size="sm" variant="ghost" className="gap-1.5">
          <Link href={rec.url}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open
          </Link>
        </Button>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* 3. The stored topic list                                             */
/* ------------------------------------------------------------------ */

function TopicRow({
  entry,
  onRevise,
  onUnmark,
  busy,
}: {
  entry: ProgressResponse['topics'][number]
  onRevise: (refId: string, scope: 'chapter' | 'lesson') => void
  onUnmark: (refId: string, scope: 'chapter' | 'lesson') => void
  busy: boolean
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/40">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={entry.url} className="truncate text-sm font-semibold hover:underline">
            {entry.label}
          </Link>
          <DueBadge entry={entry} />
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {entry.bookTitle} · revised {entry.passes}× · last {relDays(daysSinceOrUntil(entry.lastAt).n, true)} · mastery{' '}
          {entry.mastery}/100
        </p>
        <div className="mt-1.5 max-w-56">
          <MasteryBar mastery={entry.mastery} state={entry.state} />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => onRevise(entry.refId, entry.scope)}
          disabled={busy}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Revise
        </Button>
        <Button asChild size="sm" variant="ghost" className="gap-1.5">
          <Link href={entry.url}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open
          </Link>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => onUnmark(entry.refId, entry.scope)}
          disabled={busy}
          aria-label={`Remove ${entry.label} from your study ledger`}
        >
          <Undo2 className="h-3.5 w-3.5" aria-hidden />
        </Button>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Book standing                                                     */
/* ------------------------------------------------------------------ */

function BookProgressRow({ b }: { b: BookProgress }) {
  const chPct = b.chaptersTotal ? Math.round((b.chaptersStudied / b.chaptersTotal) * 100) : 0
  const meta = STATUS_META[b.status]
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
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
            {meta.label}
          </span>
          {b.dueCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
              {b.dueCount} due
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {b.chaptersStudied}/{b.chaptersTotal} chapters · {b.lessonsEffective}/{b.lessonsTotal} sections ·{' '}
          {b.passes} revision passes
          {b.quizAnswered > 0 ? ` · quiz ${b.quizCorrect}/${b.quizAnswered} (${b.quizAccuracy}%)` : ''}
          {b.lastActivity ? ` · last ${relDays(daysSinceOrUntil(b.lastActivity).n, true)}` : ''}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div
            className="h-1.5 w-40 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={chPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${b.title} chapters covered`}
          >
            <div className="h-full rounded-full bg-primary/70" style={{ width: `${Math.max(1, chPct)}%` }} />
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">{chPct}% covered</span>
        </div>
      </div>
      <div className="w-40">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>avg mastery</span>
          <span className="tabular-nums font-medium text-foreground/80">
            {b.chaptersStudied + b.lessonsStudied > 0 ? `${b.avgMastery}/100` : '—'}
          </span>
        </div>
        <MasteryBar
          mastery={b.chaptersStudied + b.lessonsStudied > 0 ? b.avgMastery : 0}
          state={
            b.avgMastery >= 85
              ? 'mastered'
              : b.avgMastery >= 65
                ? 'strong'
                : b.avgMastery >= 40
                  ? 'familiar'
                  : b.avgMastery > 0
                    ? 'learning'
                    : 'new'
          }
        />
      </div>
      {b.nextChapterNumber !== null && b.status !== 'completed' && (
        <Button asChild size="sm" variant="outline" className="gap-1.5">
          <Link href={`/book/${b.bookId}#ch-${b.nextChapterNumber}`}>
            Continue · Ch {b.nextChapterNumber}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </Button>
      )}
      {b.status === 'completed' && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> All chapters studied
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 5. The marking picker                                               */
/* ------------------------------------------------------------------ */

interface TreeLesson {
  recordId: string
  number: string
  title: string
  words: number
}
interface TreeChapter {
  number: number
  title: string
  status?: string
  plannedLessons?: string[]
  lessons: TreeLesson[]
}
interface TreeBook {
  bookId: string
  title: string
  disciplineId: string
  status: string
  chapters: TreeChapter[]
}
interface TreeDiscipline {
  id: string
  title: string
  books: TreeBook[]
}

function MarkPicker({
  topicByRef,
  onChanged,
}: {
  topicByRef: Map<string, ProgressResponse['topics'][number]>
  onChanged: () => void
}) {
  const [open, setOpen] = useState(false)
  const [tree, setTree] = useState<TreeDiscipline[] | null>(null)
  const [bookId, setBookId] = useState<string>('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open || tree || error) return
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch('/api/library/tree', { cache: 'default' })
        if (!res.ok) throw new Error('tree fetch failed')
        const data = (await res.json()) as TreeDiscipline[]
        if (!cancelled) setTree(data)
      } catch {
        if (!cancelled) setError(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open, tree, error])

  const selected = useMemo(() => {
    if (!tree) return null
    for (const d of tree) {
      const b = d.books.find((x) => x.bookId === bookId)
      if (b) return b
    }
    return null
  }, [tree, bookId])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-xl border border-dashed bg-card/40 p-5 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Plus className="h-4.5 w-4.5 h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">Mark topics you have studied</span>
          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            Pick a book, mark whole chapters or single sections — every mark lands in this list with its
            revision schedule. No account needed.
          </span>
        </span>
      </button>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ClipboardList className="h-4 w-4 text-primary" aria-hidden /> Mark topics you have studied
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto text-xs font-normal text-muted-foreground hover:text-foreground"
          >
            Hide
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="text-sm text-muted-foreground">
            The library picker could not be loaded — open a book page and use its “Mark studied” buttons
            meanwhile.
          </p>
        )}
        {!error && (
          <>
            <label htmlFor="progress-book" className="block text-sm font-semibold">
              Book
            </label>
            <select
              id="progress-book"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Choose a book…</option>
              {(tree ?? []).map((d) => (
                <optgroup key={d.id} label={d.title}>
                  {d.books.map((b) => (
                    <option key={b.bookId} value={b.bookId}>
                      {b.title}
                    </option>
                  ))}
                </optgroup>
              ))}
              {tree === null && <option>Loading the library…</option>}
            </select>

            {selected && (
              <div className="space-y-2">
                {selected.chapters.map((ch) => {
                  const key = `${selected.bookId}:${ch.number}`
                  const written = ch.lessons.length > 0
                  return (
                    <div key={key} className="rounded-lg border bg-card/50 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="min-w-0 flex-1 truncate text-sm font-semibold">
                          Chapter {ch.number} · {ch.title}
                        </p>
                        {written ? (
                          <QuickMarkChapter
                            chapterKey={key}
                            entry={topicByRef.get(key) ?? null}
                            onChanged={onChanged}
                            compact
                          />
                        ) : (
                          <Badge variant="secondary" className="font-normal">
                            Planned · {ch.plannedLessons?.length ?? 0} sections
                          </Badge>
                        )}
                      </div>
                      {written && (
                        <ul className="mt-2 space-y-1.5">
                          {ch.lessons.map((l) => (
                            <li
                              key={l.recordId}
                              className="flex flex-wrap items-center justify-between gap-2 border-t pt-1.5 text-sm"
                            >
                              <Link
                                href={`/book/${selected.bookId}/lesson/${l.recordId}`}
                                className="min-w-0 flex-1 truncate text-foreground/80 hover:underline"
                              >
                                <span className="font-medium text-foreground">{l.number}</span> · {l.title}
                                <span className="ml-2 text-[11px] text-muted-foreground">
                                  {fmtWords(l.words)} words
                                </span>
                              </Link>
                              <QuickMarkLesson
                                lessonId={l.recordId}
                                number={l.number}
                                entry={topicByRef.get(l.recordId) ?? null}
                                onChanged={onChanged}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* The tab                                                              */
/* ------------------------------------------------------------------ */

type BookFilter = 'all' | 'studied' | 'completed' | 'untouched'

export function ProgressTab({ progress, onChanged }: Props) {
  const { mark } = useLedgerSync()
  const [busyRef, setBusyRef] = useState<string | null>(null)
  const [bookFilter, setBookFilter] = useState<BookFilter>('all')
  const [showAllBooks, setShowAllBooks] = useState(false)
  const { coverage, quiz, books, topics, recommendations } = progress

  const topicByRefId = useMemo(() => new Map(topics.map((t) => [t.refId, t])), [topics])

  const chaptersCovered = books.reduce((n, b) => n + b.chaptersStudied, 0)
  const lessonsEffective = books.reduce((n, b) => n + b.lessonsEffective, 0)
  const studiedBooks = books.filter((b) => b.status !== 'untouched')
  const avgPasses = coverage.topicsStudied > 0
    ? (coverage.totalPasses / coverage.topicsStudied).toFixed(1)
    : '0'

  const filteredBooks = useMemo(() => {
    if (bookFilter === 'studied') return books.filter((b) => b.status !== 'untouched')
    if (bookFilter === 'completed') return books.filter((b) => b.status === 'completed')
    if (bookFilter === 'untouched') return books.filter((b) => b.status === 'untouched')
    return books
  }, [books, bookFilter])
  const shownBooks = showAllBooks ? filteredBooks : filteredBooks.slice(0, 24)

  const quickRevise = async (rec: Recommendation) => {
    setBusyRef(rec.refId)
    const results = await mark({ scope: rec.scope, refId: rec.refId }, 'revise', {
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

  const reviseTopic = async (refId: string, scope: 'chapter' | 'lesson') => {
    setBusyRef(refId)
    const results = await mark({ scope, refId }, 'revise', { quality: 4, kind: 'revision' })
    setBusyRef(null)
    const r = results?.[0]
    if (r?.ok) {
      toast.success(`Revision logged — pass ${r.entry?.passes}`, {
        description: `Next revision ${r.entry ? formatDate(r.entry.dueAt) : 'scheduled'}.`,
      })
      onChanged()
    }
  }

  const unmarkTopic = async (refId: string, scope: 'chapter' | 'lesson') => {
    setBusyRef(refId)
    await mark({ scope, refId }, 'unmark')
    setBusyRef(null)
    onChanged()
  }

  return (
    <div className="space-y-6">
      {/* 1 — the study-progress hero */}
      <section className="relative overflow-hidden rounded-xl border bg-card p-5 sm:p-6">
        <Layers className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 text-primary/10" aria-hidden />
        <div className="min-w-0 max-w-xl">
          <h2 className="font-reading text-2xl font-bold tracking-tight">Your study progress</h2>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {coverage.topicsStudied > 0
              ? `You have studied ${coverage.topicsStudied} topic${coverage.topicsStudied === 1 ? '' : 's'} across ${studiedBooks.length} book${studiedBooks.length === 1 ? '' : 's'} — ${avgPasses} revision passes per topic on average.`
              : 'Nothing marked yet — pick the topics you have studied below (or mark them from any book page), and this tab starts analysing your progress.'}
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <StatTile
            icon={ListChecks}
            label="Topics studied"
            value={String(coverage.topicsStudied)}
            sub={`${coverage.chaptersStudied} chapters · ${coverage.lessonsStudied} sections`}
          />
          <StatTile
            icon={CheckCircle2}
            label="Books completed"
            value={String(coverage.booksCompleted)}
            sub={`${coverage.booksInProgress} in progress · ${coverage.booksStarted} started`}
            tone={coverage.booksCompleted > 0 ? 'emerald' : 'default'}
          />
          <StatTile
            icon={Target}
            label="Questions understood"
            value={quiz.answered > 0 ? `${quiz.understood}/${quiz.answered}` : '—'}
            sub={
              quiz.answered > 0
                ? `${quiz.accuracy}% accuracy · ${quiz.events} quiz${quiz.events === 1 ? '' : 'zes'}`
                : 'answer a lesson quiz to start counting'
            }
            tone={quiz.answered > 0 && (quiz.accuracy ?? 0) >= 60 ? 'emerald' : quiz.answered > 0 ? 'amber' : 'default'}
          />
          <StatTile
            icon={BookOpen}
            label="Chapters covered"
            value={`${chaptersCovered}/${coverage.chaptersTotal}`}
            sub={`${lessonsEffective}/${coverage.lessonsTotal} sections`}
          />
          <StatTile
            icon={TrendingUp}
            label="Words studied"
            value={fmtWords(coverage.wordsStudied)}
            sub={coverage.readMins > 0 ? `≈ ${Math.round(coverage.readMins)} min of first reading` : undefined}
          />
          <StatTile
            icon={RotateCcw}
            label="Revision passes"
            value={String(coverage.totalPasses)}
            sub={`${avgPasses}× per topic on average`}
          />
        </div>
        {quiz.estimated > 0 && (
          <p className="mt-3 text-[11px] text-muted-foreground">
            Quiz counts are exact for {quiz.exact} recent quiz{quiz.exact === 1 ? '' : 'zes'}; {quiz.estimated} older{' '}
            {quiz.estimated === 1 ? 'quiz is' : 'quizzes are'} estimated from their ratings (labelled honestly).
          </p>
        )}
      </section>

      {/* 2 — what the engine recommends */}
      <section aria-label="What the engine recommends">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-reading text-lg font-bold">What the engine recommends</h3>
          <span className="text-xs text-muted-foreground">
            least revised · weak mastery · quiz slips · stalled books
          </span>
        </div>
        {recommendations.length > 0 ? (
          <div className="overflow-hidden rounded-xl border">
            <ul className="divide-y">
              {recommendations.map((rec) => (
                <RecommendationRow
                  key={rec.id}
                  rec={rec}
                  onQuickRevise={quickRevise}
                  busy={busyRef === rec.refId}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
            {coverage.topicsStudied > 0
              ? 'Nothing needs attention — your topics are fresh and well revised. The engine keeps watching.'
              : 'Mark a few topics you have studied and the engine will start telling you what to revise, finish, and practice.'}
          </p>
        )}
      </section>

      {/* 3 — your studied topics (the stored list) */}
      <section aria-label="Your studied topics">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-reading text-lg font-bold">Your studied topics</h3>
          <span className="text-xs text-muted-foreground">
            {topics.length} stored · click a topic to revise it
          </span>
        </div>
        {topics.length > 0 ? (
          <div className="overflow-hidden rounded-xl border">
            <ul className="divide-y">
              {topics.map((t) => (
                <TopicRow
                  key={`${t.scope}:${t.refId}`}
                  entry={t}
                  onRevise={reviseTopic}
                  onUnmark={unmarkTopic}
                  busy={busyRef === t.refId}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
            No topics stored yet — the list below is where you mark them.
          </p>
        )}
      </section>

      {/* 4 — book standing */}
      <section aria-label="Progress by book">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-reading text-lg font-bold">Progress by book</h3>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Book filter">
            {(
              [
                ['all', `All ${coverage.booksTotal}`],
                ['studied', `Studied ${studiedBooks.length}`],
                ['completed', `Completed ${coverage.booksCompleted}`],
                ['untouched', `Untouched ${coverage.booksTotal - studiedBooks.length}`],
              ] as [BookFilter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setBookFilter(key)
                  setShowAllBooks(false)
                }}
                aria-pressed={bookFilter === key}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  bookFilter === key
                    ? 'border-primary bg-primary/[0.08] text-foreground'
                    : 'border-border bg-card/60 text-muted-foreground hover:border-primary/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {shownBooks.map((b) => (
            <BookProgressRow key={b.bookId} b={b} />
          ))}
          {shownBooks.length === 0 && (
            <p className="rounded-xl border border-dashed bg-card/40 p-6 text-center text-sm text-muted-foreground">
              No books in this filter yet.
            </p>
          )}
          {filteredBooks.length > shownBooks.length && (
            <button
              type="button"
              onClick={() => setShowAllBooks(true)}
              className="w-full rounded-xl border border-dashed bg-card/40 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Show all {filteredBooks.length} books in this filter
            </button>
          )}
        </div>
      </section>

      {/* 5 — the marking picker */}
      <section aria-label="Mark topics as studied">
        <h3 className="mb-3 font-reading text-lg font-bold">Mark topics as studied</h3>
        <MarkPicker topicByRef={topicByRefId} onChanged={onChanged} />
      </section>

      {/* how the engine thinks */}
      <section className="rounded-xl border border-dashed bg-card/40 p-5">
        <h3 className="font-reading text-base font-bold">How the engine analyses you</h3>
        <div className="mt-3 grid gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground/80">Book completion</p>
            <p className="mt-1">
              A chapter counts as covered when you mark it studied or mark every section in it. A book
              becomes in-progress at a third of its chapters and completed when all are covered —
              sections alone can complete a book.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground/80">Questions understood</p>
            <p className="mt-1">
              Every lesson quiz and practice drill you finish adds its raw score here. Older records
              without raw scores are estimated from their rating — shown separately, never mixed
              silently.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground/80">Recommendations</p>
            <p className="mt-1">
              Priority order: never-revised topics first, then stale least-revised ones, weak mastery
              (&lt; 40/100), chapters with quiz accuracy under 60%, unfinished chapters, stalled
              books (14+ days quiet), and the next untouched chapter of an active book.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
