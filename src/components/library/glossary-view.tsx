'use client'

/**
 * Glossary & formula sheet — auto-generated from every `terms` and `formula`
 * block in the book. Two sections: an A–Z index of definitions (each linking
 * back to its lesson) and the collected formula cards for revision.
 */
import Link from 'next/link'
import { ArrowLeft, Sigma, ScrollText, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { bookFormulas, bookGlossary, paths, type Book } from '@/data/library/index'
import { Math, RichText } from './math'

export function GlossaryView({ book }: { book: Book }) {
  const entries = bookGlossary(book).slice().sort((a, b) => a.term.localeCompare(b.term))
  const formulas = bookFormulas(book)

  /* Group terms by initial letter for the A–Z index. */
  const groups = new Map<string, typeof entries>()
  for (const e of entries) {
    const letter = (e.term[0] ?? '#').toUpperCase()
    const list = groups.get(letter) ?? []
    list.push(e)
    groups.set(letter, list)
  }
  const letters = [...groups.keys()].sort()

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      <Link
        href={paths.book(book.id)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> {book.title}
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="font-reading text-3xl font-bold tracking-tight">
          Glossary — {book.title}
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          Every defined term in the book, collected automatically from its lessons, with the
          lesson where each definition is taught.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal">
            <ScrollText className="mr-1 h-3.5 w-3.5" aria-hidden /> {entries.length} terms
          </Badge>
          <Badge variant="secondary" className="font-normal">
            <Sigma className="mr-1 h-3.5 w-3.5" aria-hidden /> {formulas.length} formulas
          </Badge>
        </div>
      </header>

      {entries.length === 0 ? (
        <p className="rounded-xl border border-dashed px-5 py-8 text-center text-sm text-muted-foreground">
          No terms yet — definitions appear here automatically as lessons with terms blocks are
          written.
        </p>
      ) : (
        <>
          {/* A–Z jump bar */}
          <nav aria-label="Glossary letters" className="mb-6 flex flex-wrap gap-1.5">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Term groups */}
          <div className="space-y-8">
            {letters.map((l) => (
              <section key={l} id={`letter-${l}`} className="scroll-mt-24">
                <h2 className="mb-3 font-reading text-xl font-bold text-primary/80">{l}</h2>
                <dl className="overflow-hidden rounded-xl border">
                  {(groups.get(l) ?? []).map((e, i) => (
                    <div
                      key={`${e.lessonId}-${e.term}`}
                      className={`grid gap-2 px-5 py-4 sm:grid-cols-[minmax(10rem,auto)_1fr] sm:gap-6 ${
                        i !== (groups.get(l) ?? []).length - 1 ? 'border-b border-border/70' : ''
                      } ${i % 2 === 1 ? 'bg-muted/30' : ''}`}
                    >
                      <dt className="font-reading text-base font-bold leading-snug">{e.term}</dt>
                      <dd>
                        <p className="text-[0.95em] leading-7 text-foreground/90">
                          <RichText text={e.def} />
                        </p>
                        <Link
                          href={paths.lesson(book.id, e.lessonId)}
                          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          <BookOpen className="h-3 w-3" aria-hidden />
                          Lesson {e.lessonNumber} — {e.lessonTitle}
                        </Link>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </>
      )}

      {/* Formula sheet */}
      <section className="mt-14">
        <h2 className="font-reading text-xl font-bold">Formula sheet</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          The formulas this book asks you to remember, collected from its lessons — ideal for a
          final revision pass.
        </p>
        {formulas.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed px-5 py-6 text-center text-sm text-muted-foreground">
            No formulas yet — revision formula cards appear here as lessons with formula blocks are
            written.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {formulas.map((f) => (
              <div
                key={`${f.lessonId}-${f.name}`}
                className="overflow-hidden rounded-xl border border-emerald-400/50 dark:border-emerald-700/50"
              >
                <div className="flex items-center justify-between gap-2 border-b border-emerald-400/40 bg-emerald-50/70 px-4 py-2 dark:border-emerald-700/40 dark:bg-emerald-950/30">
                  <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                    {f.name}
                  </span>
                  <Link
                    href={paths.lesson(book.id, f.lessonId)}
                    className="shrink-0 text-xs font-medium text-primary hover:underline"
                  >
                    lesson {f.lessonNumber}
                  </Link>
                </div>
                <div className="bg-card px-4 py-1">
                  <Math tex={f.latex} display />
                </div>
                {f.note && (
                  <p className="border-t border-emerald-400/40 px-4 py-2.5 text-sm leading-6 text-muted-foreground dark:border-emerald-700/40">
                    <RichText text={f.note} />
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
