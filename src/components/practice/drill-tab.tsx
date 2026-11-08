'use client'

/**
 * Practice — the Adaptive Drill tab.
 *
 * One setup card (auto-focus from the study ledger, a specific book, or
 * the whole library; question count) that launches the DrillRunner:
 * one question at a time with instant feedback on MCQs and honest
 * self-marking on free-response exercises. Wrong answers feed the
 * Mistake Bank; per-lesson quality feeds the study ledger.
 */
import { useCallback, useEffect, useState } from 'react'
import { Flame, Loader2, PlayCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DrillRunner } from './drill-runner'
import { startDrillPaper } from '@/lib/practice/client-api'
import { fetchReadiness } from '@/lib/practice/client-api'
import type { BookReadiness, PaperMeta, PracticeQuestion } from '@/lib/practice/types'

const COUNTS = [5, 10, 20] as const

export function DrillTab() {
  const [books, setBooks] = useState<BookReadiness[] | null>(null)
  const [focus, setFocus] = useState<'auto' | 'book' | 'library'>('auto')
  const [bookId, setBookId] = useState<string>('')
  const [count, setCount] = useState<number>(10)
  const [running, setRunning] = useState<{
    paper: PracticeQuestion[]
    meta: PaperMeta
  } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void (async () => {
      const r = await fetchReadiness()
      setBooks(r ? r.books : [])
      if (r && r.books.length > 0) setBookId((b) => b || r.books[0]!.bookId)
    })()
  }, [])

  const start = useCallback(async () => {
    setBusy(true)
    setError(null)
    const res = await startDrillPaper({
      focus,
      bookId: focus === 'book' ? bookId : undefined,
      count,
    })
    setBusy(false)
    if (!res || res.paper.length === 0) {
      setError(
        res === null
          ? 'Could not generate the drill — check your connection and retry.'
          : 'No questions available in this scope yet.',
      )
      return
    }
    setRunning({ paper: res.paper, meta: res.meta })
  }, [bookId, count, focus])

  if (running) {
    return (
      <DrillRunner
        paper={running.paper}
        meta={running.meta}
        onClose={() => setRunning(null)}
        onFinished={() => undefined}
      />
    )
  }

  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        A short, focused practice set served one question at a time — MCQs give instant feedback,
        exercises reveal the worked solution and trust your honest self-marking. Wrong answers
        become Mistake Bank cards; every answer feeds your revision schedule.
      </p>

      {error && (
        <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      <div className="max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Flame className="h-4.5 w-4.5 h-5 w-5" aria-hidden />
          </span>
          <h2 className="font-reading text-lg font-bold">Build a drill</h2>
        </div>

        <div className="space-y-5">
          {/* focus */}
          <div>
            <p className="mb-2 text-sm font-semibold">Target</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <FocusOption
                title="Weakest chapters"
                hint="Auto-picked from your study ledger — forgetting risk, overdue days and low mastery decide."
                icon="auto"
                selected={focus === 'auto'}
                onClick={() => setFocus('auto')}
              />
              <FocusOption
                title="One book"
                hint="Mix questions from every written chapter of a chosen book."
                icon="book"
                selected={focus === 'book'}
                onClick={() => setFocus('book')}
              />
              <FocusOption
                title="Whole library"
                hint="A balanced sweep across every written chapter."
                icon="library"
                selected={focus === 'library'}
                onClick={() => setFocus('library')}
              />
            </div>
          </div>

          {focus === 'book' && (
            <div>
              <label htmlFor="drill-book" className="mb-2 block text-sm font-semibold">
                Book
              </label>
              <select
                id="drill-book"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(books ?? []).map((b) => (
                  <option key={b.bookId} value={b.bookId}>
                    {b.title} · {b.chaptersTotal} chapters
                  </option>
                ))}
                {books === null && <option>Loading books…</option>}
              </select>
            </div>
          )}

          {/* count */}
          <div>
            <p className="mb-2 text-sm font-semibold">Questions</p>
            <div className="flex gap-2">
              {COUNTS.map((c) => (
                <Button
                  key={c}
                  variant={count === c ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCount(c)}
                  className="w-16 tabular-nums"
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={() => void start()} disabled={busy || (focus === 'book' && !bookId)} className="gap-2">
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Building…
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" aria-hidden /> Start drill
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

function FocusOption({
  title,
  hint,
  icon,
  selected,
  onClick,
}: {
  title: string
  hint: string
  icon: 'auto' | 'book' | 'library'
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-lg border p-3 text-left transition-colors ${
        selected
          ? 'border-primary bg-primary/[0.06]'
          : 'border-border bg-card hover:border-primary/40'
      }`}
    >
      <p className="flex items-center gap-1.5 text-sm font-semibold">
        {icon === 'auto' && <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />}
        {title}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>
    </button>
  )
}
