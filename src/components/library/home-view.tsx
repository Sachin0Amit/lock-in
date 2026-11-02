'use client'

/** Library home — the front door: reader dashboard, hero, discipline shelves, book cards. */
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Bookmark,
  CircleDashed,
  FileText,
  Library,
  PlayCircle,
  Sigma,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  allDisciplines,
  allLessons,
  bookStats,
  booksOfDiscipline,
  disciplineOf,
  findLesson,
  libraryStats,
  paths,
  type Book,
} from '@/data/library/index'
import { BookCover } from './book-view'
import { useProgress } from './progress-store'

/* Discipline icons (kept explicit so tree-shaking works) */
import {
  Atom,
  Cpu,
  Dna,
  FlaskConical,
  Globe2,
  Languages,
  Palette,
  Sigma as SigmaIcon,
  Stethoscope,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const DISCIPLINE_ICONS: Record<string, LucideIcon> = {
  mathematics: SigmaIcon,
  physics: Atom,
  chemistry: FlaskConical,
  'computer-science': Cpu,
  engineering: Wrench,
  'medical-sciences': Stethoscope,
  biology: Dna,
  'economics-commerce': TrendingUp,
  humanities: Globe2,
  languages: Languages,
  'arts-music': Palette,
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

/* ---------------------------------------------------------------- */
/* Reader dashboard — "Your desk"                                    */
/* ---------------------------------------------------------------- */

function YourDesk() {
  const completed = useProgress((s) => s.completed)
  const bookmarks = useProgress((s) => s.bookmarks)
  const knownTerms = useProgress((s) => s.knownTerms)
  const lastLessonId = useProgress((s) => s.lastLessonId)

  const completedCount = Object.keys(completed).length
  const masteredCount = Object.keys(knownTerms).length
  const bookmarkList = Object.keys(bookmarks)
    .map((id) => findLesson(id))
    .filter((l): l is NonNullable<typeof l> => !!l)
  const resume = lastLessonId ? findLesson(lastLessonId) : undefined
  const wordsRead = allLessons
    .filter((l) => completed[l.lesson.id])
    .reduce((n, l) => n + l.words, 0)

  if (completedCount === 0 && bookmarkList.length === 0 && !resume) return null

  const bookProgress = resume
    ? (() => {
        const ls = allLessons.filter((l) => l.book.id === resume.book.id)
        const done = ls.filter((l) => completed[l.lesson.id]).length
        return { done, total: ls.length, percent: ls.length ? Math.round((done / ls.length) * 100) : 0 }
      })()
    : null

  return (
    <section className="mt-10 rounded-2xl border bg-card p-6 shadow-sm sm:p-7" aria-label="Your desk">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-reading text-xl font-bold">Your desk</h2>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Lessons completed', value: completedCount, icon: BookOpenCheck },
          { label: 'Words read', value: wordsRead.toLocaleString(), icon: FileText },
          { label: 'Terms mastered', value: masteredCount, icon: Library },
          { label: 'Bookmarks', value: bookmarkList.length, icon: Bookmark },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-xl border bg-background px-4 py-3.5">
              <dd className="flex items-center gap-2 font-reading text-xl font-bold tabular-nums">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {s.value}
              </dd>
              <dt className="mt-0.5 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          )
        })}
      </dl>

      {resume && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-5 dark:bg-primary/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Continue reading
              </p>
              <p className="mt-1 font-reading text-lg font-bold leading-snug">
                {resume.lesson.number} {resume.lesson.title}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {resume.book.title} · Chapter {resume.chapter.number}: {resume.chapter.title} ·{' '}
                {resume.readMins} min read
              </p>
              {bookProgress && bookProgress.total > 0 && (
                <div className="mt-3 max-w-sm">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{resume.book.title}</span>
                    <span className="tabular-nums">
                      {bookProgress.done}/{bookProgress.total} · {bookProgress.percent}%
                    </span>
                  </div>
                  <Progress value={bookProgress.percent} className="h-1.5" aria-label="Book progress" />
                </div>
              )}
            </div>
            <Button asChild className="gap-2">
              <Link href={paths.lesson(resume.book.id, resume.lesson.id)}>
                <PlayCircle className="h-4 w-4" aria-hidden />
                Resume lesson
              </Link>
            </Button>
          </div>
        </div>
      )}

      {bookmarkList.length > 0 && (
        <div className="mt-5">
          <p className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold">
            <Bookmark className="h-4 w-4 text-primary" aria-hidden /> Bookmarked lessons
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {bookmarkList.slice(0, 6).map(({ book, lesson }) => (
              <Link
                key={lesson.id}
                href={paths.lesson(book.id, lesson.id)}
                className="group flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                <span className="font-medium text-primary">{lesson.number}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{lesson.title}</span>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                  {book.title}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Book card                                                         */
/* ---------------------------------------------------------------- */

function BookCard({ book }: { book: Book }) {
  const stats = bookStats(book)
  const completedMap = useProgress((s) => s.completed)
  const writtenLessons = book.chapters.flatMap((c) => c.lessons)
  const completed = writtenLessons.filter((l) => completedMap[l.id]).length
  const percent = writtenLessons.length ? Math.round((completed / writtenLessons.length) * 100) : 0

  return (
    <Link
      href={paths.book(book.id)}
      className="group flex w-full flex-col gap-4 rounded-xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md sm:flex-row"
    >
      <div className="w-20 shrink-0 self-start">
        <BookCover book={book} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-reading text-lg font-bold leading-snug group-hover:text-primary">
            {book.title}
          </h3>
          <Badge variant="outline" className={STATUS_BADGE[book.status].className}>
            {STATUS_BADGE[book.status].label}
          </Badge>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {book.subtitle ?? book.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BookOpenCheck className="h-3.5 w-3.5" aria-hidden /> {stats.written} written
          </span>
          <span className="inline-flex items-center gap-1">
            <CircleDashed className="h-3.5 w-3.5" aria-hidden /> {stats.planned} planned
          </span>
          <span className="inline-flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" aria-hidden /> {stats.words.toLocaleString()} words
          </span>
          {stats.terms > 0 && (
            <span className="inline-flex items-center gap-1">
              <Library className="h-3.5 w-3.5" aria-hidden /> {stats.terms} terms
            </span>
          )}
        </div>
        {writtenLessons.length > 0 && (
          <div className="mt-2.5">
            <Progress value={percent} className="h-1.5" aria-label="Progress" />
          </div>
        )}
      </div>
    </Link>
  )
}

/* ---------------------------------------------------------------- */
/* Home                                                              */
/* ---------------------------------------------------------------- */

export function HomeView() {
  const stats = libraryStats()
  const shelvesWithBooks = allDisciplines.filter((d) => booksOfDiscipline(d.id).length > 0)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
      {/* Hero */}
      <section className="pt-10 sm:pt-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <Library className="h-3.5 w-3.5 text-primary" aria-hidden />
          A growing digital library · built one book at a time
        </div>
        <h1 className="font-reading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Every subject,
          <br />
          <span className="text-primary">from absolute zero to mastery.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Complete digital textbooks with derivations, figures, worked examples and graded
          exercises — written to be understood from a standing start, broad enough for
          competitive examinations, honest enough for university study.
        </p>

        {/* Stats */}
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Disciplines', value: stats.disciplines },
            { label: 'Books', value: stats.books },
            { label: 'Lessons written', value: stats.written },
            { label: 'Words authored', value: stats.words.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card px-4 py-3.5">
              <dd className="font-reading text-2xl font-bold tabular-nums">{s.value}</dd>
              <dt className="mt-0.5 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>

        <a
          href="#shelves"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Browse the shelves <ArrowDown className="h-4 w-4" aria-hidden />
        </a>
      </section>

      {/* Reader dashboard */}
      <YourDesk />

      {/* Shelves with books */}
      <section id="shelves" className="mt-14 space-y-12 scroll-mt-20">
        {shelvesWithBooks.map((d) => {
          const Icon = DISCIPLINE_ICONS[d.id] ?? Sigma
          const books = booksOfDiscipline(d.id)
          return (
            <div key={d.id}>
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-card">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <div>
                  <h2 className="font-reading text-xl font-bold">{d.title}</h2>
                  <p className="mt-0.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {d.blurb}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {books.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* The full shelf plan — every planned discipline */}
      <section className="mt-16">
        <h2 className="font-reading text-xl font-bold">The full shelf plan</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
          The library grows one subject at a time, research-first. These shelves open as their
          books are written.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allDisciplines.map((d) => {
            const Icon = DISCIPLINE_ICONS[d.id] ?? Sigma
            const count = booksOfDiscipline(d.id).length
            return (
              <div
                key={d.id}
                className="flex items-start gap-3 rounded-xl border border-dashed px-4 py-3.5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{d.title}</p>
                    {count > 0 ? (
                      <Badge variant="secondary" className="font-normal">
                        {count} book{count === 1 ? '' : 's'} live
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="font-normal opacity-70">
                        Planned
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {d.blurb}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
