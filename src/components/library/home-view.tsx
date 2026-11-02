'use client'

/** Library home — the front door: hero, stats, discipline shelves, book cards. */
import {
  ArrowDown,
  BookOpenCheck,
  CircleDashed,
  FileText,
  Library,
  Sigma,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  allDisciplines,
  bookStats,
  booksOfDiscipline,
  disciplineOf,
  libraryStats,
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

function BookCard({ book, onOpenBook }: { book: Book; onOpenBook: (id: string) => void }) {
  const stats = bookStats(book)
  const completedMap = useProgress((s) => s.completed)
  const writtenLessons = book.chapters.flatMap((c) => c.lessons)
  const completed = writtenLessons.filter((l) => completedMap[l.id]).length
  const percent = writtenLessons.length ? Math.round((completed / writtenLessons.length) * 100) : 0

  return (
    <button
      type="button"
      onClick={() => onOpenBook(book.id)}
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
        </div>
        {writtenLessons.length > 0 && (
          <div className="mt-2.5">
            <Progress value={percent} className="h-1.5" aria-label="Progress" />
          </div>
        )}
      </div>
    </button>
  )
}

export function HomeView({ onOpenBook }: { onOpenBook: (id: string) => void }) {
  const stats = libraryStats()
  const shelvesWithBooks = allDisciplines.filter((d) => booksOfDiscipline(d.id).length > 0)
  const totalCompleted = useProgress((s) => Object.keys(s.completed).length)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
      {/* Hero */}
      <section className="pt-10 sm:pt-16">
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

        {totalCompleted > 0 && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-50/60 px-4 py-2 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
            <BookOpenCheck className="h-4 w-4" aria-hidden />
            You have completed {totalCompleted} lesson{totalCompleted === 1 ? '' : 's'} so far — keep the streak alive.
          </p>
        )}

        <a
          href="#shelves"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Browse the shelves <ArrowDown className="h-4 w-4" aria-hidden />
        </a>
      </section>

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
                  <BookCard key={b.id} book={b} onOpenBook={onOpenBook} />
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
