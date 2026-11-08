'use client'

/**
 * Library home v3 — arrangement overhaul:
 *  - two-column hero (message + living book-shelf visual, paper texture)
 *  - one inline stat strip instead of four stat boxes
 *  - "Your desk" condensed to a light strip of stat tiles + bookmark chips
 *  - shelves with count badges and refined book cards
 *  - roadmap: only the not-yet-live shelves, as compact chips
 */
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
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  allBooks,
  allDisciplines,
  allLessons,
  bookStats,
  booksOfDiscipline,
  findLesson,
  libraryStats,
  paths,
  type Book,
} from '@/data/library/index'
import { BookCover } from './book-view'
import { DISCIPLINE_ICONS, StatusBadge } from './bits'
import { useProgress } from './progress-store'
import { RevisionBanner } from '@/components/revision/revision-banner'

/* ---------------------------------------------------------------- */
/* Hero — the living shelf visual                                     */
/* ---------------------------------------------------------------- */

const GHOST_HEIGHTS = [196, 172, 204, 182, 200, 176, 188]

function ShelfVisual() {
  const liveBooks = allBooks
  const planned = allDisciplines.filter((d) => booksOfDiscipline(d.id).length === 0)

  return (
    <div
      aria-hidden
      className="relative hidden select-none self-center overflow-hidden rounded-2xl border bg-card p-6 shadow-sm lg:block"
    >
      <div className="paper-dots pointer-events-none absolute inset-0" />
      <div className="relative flex h-[236px] items-end justify-center gap-2.5">
        {/* live spines — real covers, front of the shelf */}
        {liveBooks.slice(0, 3).map((b) => (
          <div
            key={b.id}
            className="relative flex h-[212px] w-[40px] items-center justify-center rounded-[4px] shadow-[0_6px_14px_-4px_oklch(0_0_0/0.35)]"
            style={{ background: `linear-gradient(165deg, ${b.accent[0]}, ${b.accent[1]})` }}
          >
            <span className="spine-label whitespace-nowrap px-0.5 text-[10px] font-semibold uppercase text-white/95">
              {b.title}
            </span>
            <span className="absolute inset-x-1.5 top-1.5 h-[2px] rounded-full bg-white/25" />
            <span className="absolute inset-x-1.5 bottom-1.5 h-[2px] rounded-full bg-white/20" />
          </div>
        ))}
        <div className="mx-1 h-[204px] w-px bg-border" aria-hidden />
        {/* ghost spines — shelves still to be filled */}
        {planned.slice(0, 5).map((d, i) => (
          <div
            key={d.id}
            className={`flex items-center justify-center rounded-[4px] border border-muted-foreground/45 bg-muted/70 dark:bg-muted/60 dark:border-muted-foreground/35 ${
              i === 3 ? 'h-[182px] w-[32px] rotate-[7deg] translate-y-[3px]' : ''
            }`}
            style={
              i === 3
                ? undefined
                : { height: `${GHOST_HEIGHTS[i % GHOST_HEIGHTS.length]}px`, width: '32px' }
            }
          >
            <span className="spine-label whitespace-nowrap px-0.5 text-[10px] font-medium uppercase text-muted-foreground dark:text-foreground/75">
              {d.title}
            </span>
          </div>
        ))}
      </div>
      {/* the shelf itself */}
      <div className="relative mt-3.5 h-2.5 rounded-full bg-gradient-to-r from-primary/50 via-primary/70 to-primary/50 shadow-[0_3px_8px_-2px_oklch(0_0_0/0.25)]" />
      <p className="relative mt-3.5 text-center text-[11px] leading-4 text-muted-foreground">
        One shelf is live — {planned.length} more being written, one chapter at a time.
      </p>
    </div>
  )
}

function Hero() {
  const stats = libraryStats()
  const lastLessonId = useProgress((s) => s.lastLessonId)
  const resume = lastLessonId ? findLesson(lastLessonId) : undefined
  const start = allLessons[0]
  const target = resume ?? start

  const statItems = [
    { label: 'Disciplines', value: stats.disciplines },
    { label: 'Books', value: stats.books },
    { label: 'Lessons written', value: stats.written },
    { label: 'Words authored', value: stats.words.toLocaleString() },
  ]

  return (
    <section className="relative pt-10 sm:pt-14">
      <div className="paper-dots pointer-events-none absolute inset-0 -z-10" />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Library className="h-3.5 w-3.5 text-primary" aria-hidden />
            A growing digital library · built one chapter at a time
          </div>
          <h1 className="font-reading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Every subject,
            <br />
            <span className="text-primary">from absolute zero to mastery.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Complete digital textbooks with derivations, figures, worked examples and graded
            exercises — written to be understood from a standing start, broad enough for
            competitive examinations, honest enough for university study.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {target ? (
              <Button asChild size="lg" className="h-11 gap-2 px-6">
                <Link href={paths.lesson(target.book.id, target.lesson.id)}>
                  <PlayCircle className="h-4.5 w-4.5" aria-hidden />
                  {resume ? `Continue — ${resume.lesson.number}` : 'Start reading'}
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="h-11 gap-2 px-6">
                <a href="#shelves">
                  <PlayCircle className="h-4.5 w-4.5" aria-hidden />
                  Start reading
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="h-11 gap-2 px-6">
              <a href="#shelves">
                Browse the shelves
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
        <ShelfVisual />
      </div>

      {/* inline stat strip */}
      <dl className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4 border-t pt-6 sm:mt-10">
        {statItems.map((s, i) => (
          <div key={s.label} className="flex items-start gap-8">
            {i > 0 && <span className="hidden h-9 w-px bg-border sm:block" aria-hidden />}
            <div>
              <dd className="font-reading text-2xl font-bold tabular-nums leading-none">
                {s.value}
              </dd>
              <dt className="mt-1.5 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Reader dashboard — "Your desk" (only once reading has begun)       */
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

  const tiles = [
    { label: 'Lessons completed', value: completedCount, icon: BookOpenCheck },
    { label: 'Words read', value: wordsRead.toLocaleString(), icon: FileText },
    { label: 'Terms mastered', value: masteredCount, icon: Library },
    { label: 'Bookmarks', value: bookmarkList.length, icon: Bookmark },
  ]

  return (
    <section className="mt-10 rounded-2xl border bg-card p-5 shadow-sm sm:mt-12 sm:p-6" aria-label="Your desk">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-reading text-lg font-bold">Your desk</h2>
        {resume && (
          <Link
            href={paths.lesson(resume.book.id, resume.lesson.id)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Resume {resume.lesson.number} {resume.lesson.title}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {tiles.map((t) => {
          const Icon = t.icon
          return (
            <div key={t.label} className="rounded-lg border bg-background px-4 py-3">
              <dd className="flex items-center gap-2 font-reading text-lg font-bold tabular-nums">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {t.value}
              </dd>
              <dt className="mt-0.5 text-xs text-muted-foreground">{t.label}</dt>
            </div>
          )
        })}
      </div>

      {bookmarkList.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Bookmark className="h-3.5 w-3.5" aria-hidden /> Bookmarked
          </span>
          {bookmarkList.slice(0, 6).map(({ book, lesson }) => (
            <Link
              key={lesson.id}
              href={paths.lesson(book.id, lesson.id)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <span className="text-primary">{lesson.number}</span>
              <span className="max-w-[180px] truncate">{lesson.title}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Book card                                                          */
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
      className="group flex w-full gap-5 rounded-xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md sm:p-5"
    >
      <div className="w-24 shrink-0 self-start">
        <BookCover book={book} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-reading text-lg font-bold leading-snug group-hover:text-primary">
            {book.title}
          </h3>
          <StatusBadge status={book.status} />
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
/* Home                                                               */
/* ---------------------------------------------------------------- */

export function HomeView() {
  const shelvesWithBooks = allDisciplines.filter((d) => booksOfDiscipline(d.id).length > 0)
  const plannedShelves = allDisciplines.filter((d) => booksOfDiscipline(d.id).length === 0)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
      <Hero />
      <RevisionBanner />
      <YourDesk />

      {/* Shelves with live books */}
      <section id="shelves" className="mt-14 space-y-10 scroll-mt-20">
        {shelvesWithBooks.map((d) => {
          const Icon = DISCIPLINE_ICONS[d.id]
          const books = booksOfDiscipline(d.id)
          return (
            <div key={d.id}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
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
                <Badge variant="secondary" className="mt-1 shrink-0 font-normal">
                  {books.length} live
                </Badge>
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

      {/* Roadmap — shelves still to come */}
      {plannedShelves.length > 0 && (
        <section className="mt-14 border-t pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-reading text-xl font-bold">On the roadmap</h2>
            <p className="text-xs text-muted-foreground">
              {plannedShelves.length} shelves open as their books are written
            </p>
          </div>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {plannedShelves.map((d) => {
              const Icon = DISCIPLINE_ICONS[d.id]
              return (
                <div
                  key={d.id}
                  title={d.blurb}
                  className="flex items-center gap-3 rounded-lg border border-dashed px-3.5 py-2.5 transition-colors hover:border-primary/40"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden />
                  <span className="truncate text-sm font-medium">{d.title}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
