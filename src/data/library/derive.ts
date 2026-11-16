/**
 * LockIn Library — pure derived helpers (CLIENT-SAFE).
 * =====================================================
 *
 * Everything here operates ONLY on values passed in (a Book, a Lesson, a
 * discipline id). Nothing in this module imports the book registry, so
 * client components can use these without dragging any lesson content
 * into the browser bundle. The data-bound registry functions (allBooks,
 * findLesson, searchLibrary…) stay in ./index — server-only.
 *
 * Re-exported from ./index for server-side consumers (the Custom Book
 * Builder catalog, the packer, the practice engine) so existing imports
 * keep working unchanged.
 */
import type { Book, Chapter, Discipline, DisciplineId, Lesson } from './types'
import { disciplines } from './disciplines'
import { countLessonWords } from './types'

/* Shared content types — re-exported so client components import from one
 * client-safe place instead of reaching through the registry. */
export type { Book, Chapter, Lesson, Discipline, DisciplineId } from './types'

/* ------------------------------------------------------------------ */
/* Types shared by the reading UI                                      */
/* ------------------------------------------------------------------ */

/** A lesson and its place in the library — the lesson reader's input. */
export interface LessonRef {
  book: Book
  chapter: Chapter
  lesson: Lesson
  /** honest computed word count */
  words: number
  readMins: number
}

export interface BookStats {
  written: number
  planned: number
  words: number
  readMins: number
  terms: number
  formulas: number
}

/** prev/next navigation target for the lesson reader (server-computed). */
export interface NavLesson {
  bookId: string
  lessonId: string
  number: string
  title: string
}

/**
 * A book card for the home shelves — book metadata plus the packer's
 * precomputed stats. No chapters, no lesson bodies.
 */
export interface ShelfBook {
  id: string
  title: string
  subtitle?: string
  discipline: DisciplineId
  level: string
  description: string
  status: Book['status']
  accent: [string, string]
  stats: BookStats
}

/** A written lesson's navigational metadata — no blocks, safe to ship. */
export interface LessonStub {
  id: string
  bookId: string
  number: string
  title: string
  words: number
}

/** Everything the home page needs, delivered as one serialisable prop. */
export interface LibrarySnapshot {
  books: ShelfBook[]
  disciplines: Discipline[]
  /** written lessons in global reading order */
  lessons: LessonStub[]
  stats: {
    disciplines: number
    books: number
    written: number
    plannedLessons: number
    words: number
    terms: number
  }
}

/** The subset of Book the cover component actually renders. */
export type CoverBook = Pick<Book, 'id' | 'title' | 'discipline' | 'level' | 'accent'> &
  Pick<Book, 'subtitle'>

/* ------------------------------------------------------------------ */
/* Paths                                                               */
/* ------------------------------------------------------------------ */

/** A lesson's URL paths (single place so links never drift). */
export const paths = {
  home: () => '/',
  book: (bookId: string) => `/book/${bookId}`,
  lesson: (bookId: string, lessonId: string) => `/book/${bookId}/lesson/${lessonId}`,
  revise: (bookId: string) => `/book/${bookId}/revise`,
  glossary: (bookId: string) => `/book/${bookId}/glossary`,
}

/* ------------------------------------------------------------------ */
/* Discipline                                                          */
/* ------------------------------------------------------------------ */

export function disciplineOf(book: { discipline: DisciplineId | string }): Discipline {
  return (
    disciplines.find((d) => d.id === book.discipline) ??
    (disciplines[0] as Discipline)
  )
}

/* ------------------------------------------------------------------ */
/* Derived lesson structure                                            */
/* ------------------------------------------------------------------ */

/**
 * Lessons of one book flattened in reading order — PURE: walks the given
 * book's own chapters. (Identical output to the registry-backed version:
 * the registry's allLessons is itself the book/chapter flattening.)
 */
export function bookLessons(book: Book): LessonRef[] {
  return book.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => {
      const words = lesson.words ?? countLessonWords(lesson)
      return { book, chapter, lesson, words, readMins: Math.max(1, Math.round(words / 200)) }
    }),
  )
}

/* ------------------------------------------------------------------ */
/* Glossary, formulas, headings (derived from book content)            */
/* ------------------------------------------------------------------ */

export interface GlossaryEntry {
  term: string
  def: string
  bookId: string
  lessonId: string
  lessonNumber: string
  lessonTitle: string
  chapterNumber: number
}

/** Every `terms` item in a book, in reading order — drives the glossary page and flashcards. */
export function bookGlossary(book: Book): GlossaryEntry[] {
  return bookLessons(book).flatMap(({ lesson, chapter }) =>
    lesson.blocks
      .filter((b): b is Extract<typeof b, { kind: 'terms' }> => b.kind === 'terms')
      .flatMap((b) =>
        b.items.map((t) => ({
          ...t,
          bookId: book.id,
          lessonId: lesson.id,
          lessonNumber: lesson.number,
          lessonTitle: lesson.title,
          chapterNumber: chapter.number,
        })),
      ),
  )
}

export interface FormulaEntry {
  name: string
  latex: string
  note?: string
  lessonId: string
  lessonNumber: string
  lessonTitle: string
}

/** Every `formula` block in a book, in reading order — drives the formula sheet. */
export function bookFormulas(book: Book): FormulaEntry[] {
  return bookLessons(book).flatMap(({ lesson }) =>
    lesson.blocks
      .filter((b): b is Extract<typeof b, { kind: 'formula' }> => b.kind === 'formula')
      .map((b) => ({
        name: b.name,
        latex: b.latex,
        note: b.note,
        lessonId: lesson.id,
        lessonNumber: lesson.number,
        lessonTitle: lesson.title,
      })),
  )
}

/** Deterministic anchor id for a lesson heading (shared by renderer + scrollspy). */
export function headingAnchor(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 'section'
  )
}

/** Headings of a lesson with their anchor ids, for "On this page". */
export function lessonHeadings(lesson: Lesson): { text: string; id: string }[] {
  return lesson.blocks
    .filter((b): b is Extract<typeof b, { kind: 'heading' }> => b.kind === 'heading')
    .map((b) => ({ text: b.text, id: headingAnchor(b.text) }))
}

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

/**
 * Per-book stats. PURE over the given book: when lessons carry stub
 * `words` the sums stay honest, but `terms`/`formulas` count only what the
 * passed lessons actually contain (0 for stub lessons). The packer
 * computes this on FULL books and stores it as the book's statsJson; the
 * book page passes that precomputed value to the view.
 */
export function bookStats(book: Book): BookStats {
  const lessons = bookLessons(book)
  return {
    written: lessons.length,
    planned:
      book.chapters.reduce((m, c) => m + (c.plannedLessons?.length ?? 0), 0) +
      book.chapters.filter((c) => c.lessons.length === 0 && !c.plannedLessons?.length).length,
    words: lessons.reduce((n, l) => n + l.words, 0),
    readMins: lessons.reduce((n, l) => n + l.readMins, 0),
    terms: bookGlossary(book).length,
    formulas: bookFormulas(book).length,
  }
}

/* ------------------------------------------------------------------ */
/* Search hit type (the engine itself is server-side, in ./index)      */
/* ------------------------------------------------------------------ */

export type SearchHit =
  | {
      type: 'lesson' | 'term'
      score: number
      title: string
      subtitle: string
      /** for term hits: the definition snippet */
      snippet?: string
      lessonId: string
      bookId: string
    }
  | {
      type: 'book'
      score: number
      title: string
      subtitle: string
      bookId: string
      lessonId?: undefined
      /** books never carry snippets; declared so union access stays typed */
      snippet?: undefined
    }
