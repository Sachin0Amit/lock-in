'use client'

/** Book page — generated cover, stats, progress, study tools and the full table of contents. */
import Link from 'next/link'
import {
  BookOpenCheck,
  Layers,
  CircleDashed,
  Clock3,
  FileText,
  PlayCircle,
  ScrollText,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  bookLessons,
  bookStats,
  disciplineOf,
  findLesson,
  paths,
  type Book,
} from '@/data/library/index'
import { useProgress } from './progress-store'

export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg text-white shadow-md ${
        large ? 'aspect-[3/4] w-full max-w-[220px] p-5' : 'aspect-[3/4] w-full p-3.5'
      }`}
      style={{ background: `linear-gradient(150deg, ${book.accent[0]} 0%, ${book.accent[1]} 100%)` }}
      aria-hidden
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/10" />
      <span className={`font-semibold uppercase tracking-widest opacity-90 ${large ? 'text-[11px]' : 'text-[9px]'}`}>
        {disciplineOf(book).title}
      </span>
      <div>
        <p className={`font-reading font-bold leading-tight ${large ? 'text-xl' : 'text-sm'}`}>
          {book.title}
        </p>
        {book.subtitle && (
          <p className={`mt-1 leading-snug opacity-85 ${large ? 'text-xs' : 'text-[10px]'}`}>
            {book.subtitle}
          </p>
        )}
      </div>
      <span className={`opacity-80 ${large ? 'text-[10px]' : 'text-[8px]'}`}>{book.level}</span>
    </div>
  )
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  planned: { label: 'Planned', className: 'border-stone-400/50 text-stone-600 dark:text-stone-300' },
  'in-progress': {
    label: 'In progress',
    className: 'border-amber-500/60 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  },
  complete: {
    label: 'Complete',
    className: 'border-emerald-500/60 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
}

interface Props {
  book: Book
}

export function BookView({ book }: Props) {
  const discipline = disciplineOf(book)
  const lessons = bookLessons(book)
  const stats = bookStats(book)
  const completedMap = useProgress((s) => s.completed)
  const completed = lessons.filter((l) => completedMap[l.lesson.id]).length
  const lastLessonId = useProgress((s) => s.lastLessonId)
  const resumeLesson =
    lastLessonId && book.id === findLesson(lastLessonId)?.book.id ? findLesson(lastLessonId) : undefined

  const percent = lessons.length ? Math.round((completed / lessons.length) * 100) : 0

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col gap-7 sm:flex-row sm:gap-9">
        <div className="mx-auto w-44 shrink-0 sm:mx-0 sm:w-52">
          <BookCover book={book} large />
        </div>
        <div className="min-w-0 flex-1">
          <nav className="mb-2 text-sm text-muted-foreground" aria-label="Discipline">
            {discipline.title}
          </nav>
          <h1 className="font-reading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-1.5 font-reading text-lg text-muted-foreground">{book.subtitle}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={STATUS_BADGE[book.status].className}>
              {STATUS_BADGE[book.status].label}
            </Badge>
            <Badge variant="secondary" className="font-normal">{book.level}</Badge>
          </div>
          <p className="mt-4 leading-7 text-foreground/90">{book.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BookOpenCheck className="h-4 w-4" aria-hidden /> {stats.written} lesson
              {stats.written === 1 ? '' : 's'} written
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CircleDashed className="h-4 w-4" aria-hidden /> {stats.planned} planned
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4" aria-hidden /> {stats.words.toLocaleString()} words
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" aria-hidden /> {stats.readMins} min total
            </span>
          </div>

          {lessons.length > 0 && (
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Your progress</span>
                <span className="tabular-nums">
                  {completed}/{lessons.length} lessons · {percent}%
                </span>
              </div>
              <Progress value={percent} className="h-2" aria-label="Reading progress" />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {resumeLesson && (
              <Button
                asChild
                className="gap-2"
              >
                <Link href={paths.lesson(book.id, resumeLesson.lesson.id)}>
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  Continue — {resumeLesson.lesson.number} {resumeLesson.lesson.title}
                </Link>
              </Button>
            )}
            {stats.terms > 0 && (
              <Button asChild variant="outline" className="gap-2">
                <Link href={paths.revise(book.id)}>
                  <Layers className="h-4 w-4" aria-hidden />
                  Revise {stats.terms} terms
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="gap-2">
              <Link href={paths.glossary(book.id)}>
                <ScrollText className="h-4 w-4" aria-hidden />
                Glossary &amp; formulas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-9" />

      {/* Table of contents */}
      <section aria-label="Table of contents">
        <h2 className="mb-5 font-reading text-xl font-bold">Table of contents</h2>
        <div className="space-y-8">
          {book.chapters.map((ch) => {
            const chLessons = lessons.filter((l) => l.chapter.number === ch.number)
            return (
              <div key={ch.number} className="rounded-xl border">
                <div className="flex items-start gap-4 border-b bg-muted/30 px-5 py-4">
                  <span className="font-reading text-2xl font-bold text-primary/80 tabular-nums">
                    {String(ch.number).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-reading text-lg font-semibold leading-snug">{ch.title}</h3>
                      <Badge variant="outline" className={STATUS_BADGE[ch.status].className}>
                        {STATUS_BADGE[ch.status].label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{ch.summary}</p>
                  </div>
                </div>
                <ul className="divide-y divide-border/70">
                  {chLessons.map(({ lesson, readMins }) => {
                    const done = !!completedMap[lesson.id]
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={paths.lesson(book.id, lesson.id)}
                          className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-accent/50"
                        >
                          {done ? (
                            <BookOpenCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                          ) : (
                            <span className="h-4 w-4 shrink-0 rounded-full border-2 border-muted-foreground/40" aria-hidden />
                          )}
                          <span className="min-w-0 flex-1">
                            <span className={`block leading-snug ${done ? 'text-muted-foreground' : 'font-medium'}`}>
                              <span className="mr-1.5 text-primary">{lesson.number}</span>
                              {lesson.title}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">{readMins} min</span>
                        </Link>
                      </li>
                    )
                  })}
                  {ch.plannedLessons?.map((title, i) => (
                    <li key={title} className="flex items-center gap-3 px-5 py-3 opacity-60">
                      <CircleDashed className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="flex-1 leading-snug text-muted-foreground">
                        <span className="mr-1.5">{ch.number}.{chLessons.length + i + 1}</span>
                        {title}
                      </span>
                      <Badge variant="secondary" className="shrink-0 font-normal">
                        Planned
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        {book.notes && (
          <p className="mt-8 rounded-lg border border-dashed px-5 py-4 text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground/80">Status note — </span>
            {book.notes}
          </p>
        )}
      </section>
    </div>
  )
}
