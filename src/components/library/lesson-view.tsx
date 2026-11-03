'use client'

/**
 * The lesson reader — a distraction-free, typeset-textbook reading pane.
 * Upgraded: shareable URL, "On this page" scrollspy, reading progress bar,
 * prerequisite awareness, keyboard shortcuts, quiz scoring, sources.
 *
 * Keyboard: ← / → previous & next lesson · B bookmark · C mark complete.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  Link2,
  ListTree,
  Minus,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  findLesson,
  lessonHeadings,
  lessonNeighbours,
  paths,
  type LessonRef,
} from '@/data/library/index'
import { BlockRenderer } from './blocks'
import { OnThisPage } from './on-this-page'
import { useProgress } from './progress-store'
import { ReadingProgress } from './reading-progress'

interface Props {
  ref_: LessonRef
}

export function LessonView({ ref_ }: Props) {
  const router = useRouter()
  const { book, chapter, lesson, words, readMins } = ref_
  const { prev, next } = lessonNeighbours(lesson.id)
  const headings = lessonHeadings(lesson)

  const completed = useProgress((s) => !!s.completed[lesson.id])
  const bookmarks = useProgress((s) => s.bookmarks)
  const bookmarked = !!bookmarks[lesson.id]
  const completedMap = useProgress((s) => s.completed)
  const fontScale = useProgress((s) => s.fontScale)
  const toggleCompleted = useProgress((s) => s.toggleCompleted)
  const toggleBookmark = useProgress((s) => s.toggleBookmark)
  const setLastLesson = useProgress((s) => s.setLastLesson)
  const stepFont = useProgress((s) => s.stepFont)

  useEffect(() => {
    setLastLesson(lesson.id)
  }, [lesson.id, setLastLesson])

  /* Keyboard navigation: ←/→ lessons, B bookmark, C complete. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as EventTarget | null
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [cmdk-root], [role="dialog"]')
      )
        return
      const k = e.key.toLowerCase()
      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault()
        router.push(paths.lesson(prev.book.id, prev.lesson.id))
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault()
        router.push(paths.lesson(next.book.id, next.lesson.id))
      } else if (k === 'b') {
        e.preventDefault()
        toggleBookmark(lesson.id)
      } else if (k === 'c') {
        e.preventDefault()
        toggleCompleted(lesson.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lesson.id, next, prev, router, toggleBookmark, toggleCompleted])

  const prereqs = (lesson.prerequisites ?? [])
    .map((id) => findLesson(id))
    .filter((p): p is LessonRef => !!p)
  const prereqsDone = prereqs.filter((p) => completedMap[p.lesson.id])
  const prereqsTodo = prereqs.length - prereqsDone.length

  return (
    <div className="relative w-full pb-16 pt-6">
      <ReadingProgress />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_230px]">
        <article className="mx-auto w-full max-w-3xl xl:mx-0">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link href={paths.home()} className="hover:text-foreground hover:underline">
              Library
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href={paths.book(book.id)} className="hover:text-foreground hover:underline">
              {book.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-foreground/80">
              Chapter {chapter.number}: {chapter.title}
            </span>
          </nav>

          {/* Lesson header */}
          <header className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Lesson {lesson.number}
            </p>
            <h1 className="font-reading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {lesson.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" aria-hidden /> {readMins} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ListTree className="h-3.5 w-3.5" aria-hidden /> {words.toLocaleString()} words
              </span>
              <span className="hidden items-center gap-1 sm:inline-flex">
                <Link2 className="h-3.5 w-3.5" aria-hidden />
                <span className="font-mono text-xs">{`/book/${book.id}/lesson/${lesson.id}`}</span>
              </span>
            </div>
            {lesson.concepts.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {lesson.concepts.map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="h-auto font-normal whitespace-normal text-left leading-relaxed"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            )}

            {/* Prerequisites */}
            {prereqs.length > 0 && (
              <div className="mt-5 rounded-lg border px-5 py-4">
                <p className="mb-2 text-sm font-semibold">Before this lesson</p>
                <div className="flex flex-wrap items-center gap-2">
                  {prereqs.map((p) => {
                    const done = !!completedMap[p.lesson.id]
                    return (
                      <Link
                        key={p.lesson.id}
                        href={paths.lesson(p.book.id, p.lesson.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          done
                            ? 'border-emerald-500/50 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'border-border bg-card text-foreground/80 hover:border-primary/50'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                        )}
                        {p.lesson.number} {p.lesson.title}
                      </Link>
                    )
                  })}
                </div>
                {prereqsTodo > 0 && (
                  <p className="mt-2.5 text-xs leading-5 text-muted-foreground">
                    You have not marked {prereqsTodo} prerequisite lesson
                    {prereqsTodo === 1 ? '' : 's'} complete — skim it first if any step below feels
                    unexplained. Links above jump straight there.
                  </p>
                )}
              </div>
            )}

            {lesson.objectives && (
              <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 px-5 py-4 dark:bg-primary/10">
                <p className="mb-1.5 text-sm font-semibold text-primary">
                  By the end of this lesson you will be able to
                </p>
                <ul className="list-inside list-disc space-y-0.5 text-sm leading-6 text-foreground/90">
                  {lesson.objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          <Separator className="mb-8" />

          {/* Reading pane — font size driven by persisted scale */}
          <div className="lesson-body font-reading" style={{ ['--fs' as string]: String(fontScale) }}>
            <BlockRenderer blocks={lesson.blocks} lessonId={lesson.id} />
          </div>

          {/* Sources */}
          {lesson.sources && lesson.sources.length > 0 && (
            <aside className="mt-10 rounded-lg border border-dashed px-5 py-4">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <ExternalLink className="h-4 w-4 text-primary" aria-hidden /> Sources consulted for
                this lesson
              </p>
              <ul className="space-y-1 text-sm leading-6 text-muted-foreground">
                {lesson.sources.map((s) => (
                  <li key={s} className="font-mono text-xs">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Source keys resolve in <span className="font-mono">docs/project/SOURCE_LOG.md</span>.
              </p>
            </aside>
          )}

          <Separator className="my-10" />

          {/* Lesson footer: bookmark, completion, font scale */}
          <footer className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => toggleCompleted(lesson.id)}
                variant={completed ? 'secondary' : 'default'}
                className="gap-2"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    Completed — tap to undo
                  </>
                ) : (
                  <>
                    <BookOpenCheck className="h-4 w-4" aria-hidden />
                    Mark lesson complete
                  </>
                )}
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => toggleBookmark(lesson.id)} variant="outline" className="gap-2">
                    {bookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden />
                    ) : (
                      <Bookmark className="h-4 w-4" aria-hidden />
                    )}
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Saved on this device · shortcut: B</TooltipContent>
              </Tooltip>
              <div className="ml-auto flex items-center gap-1 rounded-md border p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => stepFont(-1)}
                  aria-label="Smaller text"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-12 text-center text-xs tabular-nums text-muted-foreground">
                  {Math.round(fontScale * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => stepFont(1)}
                  aria-label="Larger text"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">←</kbd>
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">→</kbd>
                previous / next lesson
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">B</kbd>
                bookmark
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">C</kbd>
                complete
              </span>
            </p>

            <nav className="grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
              {prev ? (
                <Link
                  href={paths.lesson(prev.book.id, prev.lesson.id)}
                  className="group flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Previous</span>
                    <span className="block font-medium leading-snug">
                      {prev.lesson.number} {prev.lesson.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={paths.lesson(next.book.id, next.lesson.id)}
                  className="group flex items-center justify-end gap-3 rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Next</span>
                    <span className="block font-medium leading-snug">
                      {next.lesson.number} {next.lesson.title}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                </Link>
              ) : (
                <Link
                  href={paths.book(book.id)}
                  className="group flex items-center justify-end gap-3 rounded-lg border border-dashed p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">End of written lessons</span>
                    <span className="block font-medium leading-snug">Back to the table of contents</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                </Link>
              )}
            </nav>
          </footer>
        </article>

        {/* Scrollspy TOC */}
        <aside className="order-first xl:order-last">
          <OnThisPage headings={headings} />
        </aside>
      </div>
    </div>
  )
}
