'use client'

/** The lesson reader — a distraction-free, typeset-textbook reading pane. */
import { useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock3,
  ListTree,
  Minus,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { disciplineOf, lessonNeighbours, type LessonRef } from '@/data/library/index'
import { BlockRenderer } from './blocks'
import { useProgress } from './progress-store'

interface Props {
  ref_: LessonRef
  onOpenLesson: (bookId: string, lessonId: string) => void
  onOpenBook: (bookId: string) => void
}

export function LessonView({ ref_, onOpenLesson, onOpenBook }: Props) {
  const { book, chapter, lesson, words, readMins } = ref_
  const discipline = disciplineOf(book)
  const { prev, next } = lessonNeighbours(lesson.id)

  const completed = useProgress((s) => !!s.completed[lesson.id])
  const bookmarked = useProgress((s) => !!s.bookmarks[lesson.id])
  const fontScale = useProgress((s) => s.fontScale)
  const toggleCompleted = useProgress((s) => s.toggleCompleted)
  const toggleBookmark = useProgress((s) => s.toggleBookmark)
  const setLastLesson = useProgress((s) => s.setLastLesson)
  const stepFont = useProgress((s) => s.stepFont)

  useEffect(() => {
    setLastLesson(lesson.id)
  }, [lesson.id, setLastLesson])

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        <button type="button" onClick={() => onOpenBook(book.id)} className="hover:text-foreground hover:underline">
          {discipline.title}
        </button>
        <span aria-hidden>/</span>
        <button type="button" onClick={() => onOpenBook(book.id)} className="hover:text-foreground hover:underline">
          {book.title}
        </button>
        <span aria-hidden>/</span>
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
        </div>
        {lesson.concepts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {lesson.concepts.map((c) => (
              <Badge key={c} variant="secondary" className="font-normal">
                {c}
              </Badge>
            ))}
          </div>
        )}
        {lesson.objectives && (
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 px-5 py-4 dark:bg-primary/10">
            <p className="mb-1.5 text-sm font-semibold text-primary">By the end of this lesson you will be able to</p>
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
      <div
        className="lesson-body font-reading"
        style={{ ['--fs' as string]: String(fontScale) }}
      >
        <BlockRenderer blocks={lesson.blocks} />
      </div>

      <Separator className="my-10" />

      {/* Lesson footer: bookmark, completion, prev/next */}
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
            <TooltipContent>Bookmarks are saved on this device</TooltipContent>
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

        <nav className="grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
          {prev ? (
            <button
              type="button"
              onClick={() => onOpenLesson(prev.book.id, prev.lesson.id)}
              className="group flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">Previous</span>
                <span className="block font-medium leading-snug">
                  {prev.lesson.number} {prev.lesson.title}
                </span>
              </span>
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => onOpenLesson(next.book.id, next.lesson.id)}
              className="group flex items-center justify-end gap-3 rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">Next</span>
                <span className="block font-medium leading-snug">
                  {next.lesson.number} {next.lesson.title}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenBook(book.id)}
              className="group flex items-center justify-end gap-3 rounded-lg border border-dashed p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">End of written lessons</span>
                <span className="block font-medium leading-snug">Back to the table of contents</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
            </button>
          )}
        </nav>
      </footer>
    </article>
  )
}
