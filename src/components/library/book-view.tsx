'use client'

/**
 * Book page v3 — arrangement overhaul:
 *  - breadcrumb (Library / discipline / book)
 *  - hero: cover + meta + compact stat strip + progress + actions
 *  - TOC: per-chapter written counters, "Next up" lesson highlighted,
 *    quiz best scores shown on completed lessons, tighter rows
 */
import Link from 'next/link'
import {
  Award,
  BookOpenCheck,
  ChevronRight,
  CircleDashed,
  Clock3,
  FileText,
  PlayCircle,
  Layers,
  ScrollText,
  Sparkles,
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
import { StatusBadge } from './bits'
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

interface Props {
  book: Book
}

export function BookView({ book }: Props) {
  const discipline = disciplineOf(book)
  const lessons = bookLessons(book)
  const stats = bookStats(book)
  const completedMap = useProgress((s) => s.completed)
  const quizBest = useProgress((s) => s.quizBest)
  const completed = lessons.filter((l) => completedMap[l.lesson.id]).length
  const lastLessonId = useProgress((s) => s.lastLessonId)
  const resumeLesson =
    lastLessonId && book.id === findLesson(lastLessonId)?.book.id ? findLesson(lastLessonId) : undefined

  const percent = lessons.length ? Math.round((completed / lessons.length) * 100) : 0
  /* first written-but-not-completed lesson → the natural next read */
  const nextUp = lessons.find((l) => !completedMap[l.lesson.id])?.lesson.id
  /* the lesson the primary button should open */
  const startLesson = resumeLesson?.lesson ?? lessons.find((l) => l.lesson.id === nextUp)?.lesson
  const startLabel = resumeLesson
    ? `Continue — ${resumeLesson.lesson.number}`
    : completed > 0 && startLesson
      ? `Next — ${startLesson.number}`
      : 'Start chapter 1'

  const metaItems = [
    { icon: BookOpenCheck, text: `${stats.written} written` },
    { icon: CircleDashed, text: `${stats.planned} planned` },
    { icon: FileText, text: `${stats.words.toLocaleString()} words` },
    { icon: Clock3, text: `${stats.readMins} min` },
  ]

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link href={paths.home()} className="hover:text-foreground hover:underline">
          Library
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span>{discipline.title}</span>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="text-foreground/80">{book.title}</span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        <div className="mx-auto w-48 shrink-0 sm:mx-0 sm:w-52">
          <BookCover book={book} large />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-reading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-1.5 font-reading text-lg text-muted-foreground">{book.subtitle}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={book.status} />
            <Badge variant="secondary" className="font-normal">{book.level}</Badge>
          </div>
          <p className="mt-4 leading-7 text-foreground/90">{book.description}</p>

          {/* compact meta strip */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {metaItems.map((m) => (
              <span key={m.text} className="inline-flex items-center gap-1.5">
                <m.icon className="h-4 w-4" aria-hidden /> {m.text}
              </span>
            ))}
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

          <div className="mt-6 flex flex-wrap gap-3">
            {startLesson && (
              <Button asChild className="gap-2">
                <Link href={paths.lesson(book.id, startLesson.id)}>
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  {startLabel}
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
            const plannedCount = ch.plannedLessons?.length ?? 0
            const chDone = chLessons.filter((l) => completedMap[l.lesson.id]).length
            return (
              <div key={ch.number} className="overflow-hidden rounded-xl border">
                <div className="flex items-start gap-4 border-b bg-muted/30 px-5 py-4">
                  <span className="font-reading text-2xl font-bold text-primary/80 tabular-nums">
                    {String(ch.number).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-reading text-lg font-semibold leading-snug">{ch.title}</h3>
                      <StatusBadge status={ch.status} />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{ch.summary}</p>
                  </div>
                  <Badge variant="secondary" className="mt-1 shrink-0 font-normal tabular-nums">
                    {chLessons.length > 0
                      ? `${chDone}/${chLessons.length} done`
                      : `${plannedCount} planned`}
                  </Badge>
                </div>
                <ul className="divide-y divide-border/70">
                  {chLessons.map(({ lesson, readMins }) => {
                    const done = !!completedMap[lesson.id]
                    const isNext = lesson.id === nextUp
                    const best = quizBest[lesson.id]
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={paths.lesson(book.id, lesson.id)}
                          className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-accent/50 ${
                            isNext ? 'bg-primary/[0.06] dark:bg-primary/[0.1]' : ''
                          }`}
                        >
                          {done ? (
                            <BookOpenCheck
                              className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                              aria-hidden
                            />
                          ) : (
                            <span
                              className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                                isNext ? 'border-primary' : 'border-muted-foreground/40'
                              }`}
                              aria-hidden
                            />
                          )}
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block leading-snug ${
                                done ? 'text-muted-foreground' : 'font-medium'
                              }`}
                            >
                              <span className="mr-1.5 text-primary">{lesson.number}</span>
                              {lesson.title}
                            </span>
                          </span>
                          {best && (
                            <span
                              className="hidden shrink-0 items-center gap-1 rounded-full border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums sm:inline-flex"
                              title={`Best quiz score: ${best.best}/${best.total}`}
                            >
                              <Award className="h-3 w-3 text-amber-600 dark:text-amber-400" aria-hidden />
                              {best.best}/{best.total}
                            </span>
                          )}
                          {isNext && (
                            <span className="hidden shrink-0 items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary sm:inline-flex">
                              <Sparkles className="h-3 w-3" aria-hidden />
                              Next up
                            </span>
                          )}
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
