import { disciplines } from './disciplines'
import { foundationMathematics } from './books/mathematics/foundation-mathematics/book'
import type { Book, Chapter, Discipline, DisciplineId, Lesson } from './types'
import { countLessonWords } from './types'

/**
 * LockIn Library — central registry.
 *
 * Every book in the platform is imported here and nothing else touches the
 * book folders. To add a book: create its folder under books/<discipline>/,
 * export a Book from book.ts, import it into `allBooks`, done — the library
 * home, search index, navigation and stats all pick it up automatically.
 */
export const allBooks: Book[] = [foundationMathematics]

export const allDisciplines: Discipline[] = disciplines

/* ------------------------------------------------------------------ */
/* Derived structure                                                   */
/* ------------------------------------------------------------------ */

export interface LessonRef {
  book: Book
  chapter: Chapter
  lesson: Lesson
  /** honest computed word count */
  words: number
  readMins: number
}

/** Every written lesson in the library, in book/chapter order. */
export const allLessons: LessonRef[] = allBooks.flatMap((book) =>
  book.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => {
      const words = lesson.words ?? countLessonWords(lesson)
      return { book, chapter, lesson, words, readMins: Math.max(1, Math.round(words / 200)) }
    }),
  ),
)

export function findBook(id: string): Book | undefined {
  return allBooks.find((b) => b.id === id)
}

export function findLesson(id: string): LessonRef | undefined {
  return allLessons.find((l) => l.lesson.id === id)
}

/** Lessons of one book flattened in reading order. */
export function bookLessons(book: Book): LessonRef[] {
  return allLessons.filter((l) => l.book.id === book.id)
}

/** The lesson written immediately before/after a given lesson in its book. */
export function lessonNeighbours(id: string): { prev?: LessonRef; next?: LessonRef } {
  const idx = allLessons.findIndex((l) => l.lesson.id === id)
  if (idx === -1) return {}
  return {
    prev: idx > 0 ? allLessons[idx - 1] : undefined,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined,
  }
}

export function booksOfDiscipline(d: DisciplineId | string): Book[] {
  return allBooks.filter((b) => b.discipline === d)
}

export function disciplineOf(book: Book): Discipline {
  return disciplines.find((d) => d.id === book.discipline) ?? disciplines[0]
}

/* ------------------------------------------------------------------ */
/* Library statistics                                                  */
/* ------------------------------------------------------------------ */

export function libraryStats() {
  const written = allLessons.length
  const words = allLessons.reduce((n, l) => n + l.words, 0)
  const plannedLessons = allBooks.reduce(
    (n, b) =>
      n +
      b.chapters.reduce(
        (m, c) => m + c.lessons.length + (c.plannedLessons?.length ?? 0),
        0,
      ),
    0,
  )
  return {
    disciplines: disciplines.length,
    books: allBooks.length,
    written,
    plannedLessons,
    words,
  }
}

export function bookStats(book: Book) {
  const lessons = bookLessons(book)
  return {
    written: lessons.length,
    planned:
      book.chapters.reduce((m, c) => m + (c.plannedLessons?.length ?? 0), 0) +
      book.chapters.filter((c) => c.lessons.length === 0 && !c.plannedLessons?.length).length,
    words: lessons.reduce((n, l) => n + l.words, 0),
    readMins: lessons.reduce((n, l) => n + l.readMins, 0),
  }
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export type SearchHit =
  | {
      type: 'lesson'
      score: number
      title: string
      subtitle: string
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
    }

/**
 * Lightweight client-side search across books and lessons. Scores:
 * title starts-with > title contains > concept/summary contains.
 * Good enough at library scale of a few thousand lessons; replace with a
 * prebuilt inverted index (public/data/…json) when the library grows.
 */
export function searchLibrary(query: string, limit = 12): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const hits: SearchHit[] = []

  for (const b of allBooks) {
    const inTitle = b.title.toLowerCase()
    const inDesc = (b.subtitle ?? '' + ' ' + b.description).toLowerCase()
    if (inTitle.includes(q) || inDesc.includes(q)) {
      hits.push({
        type: 'book',
        score: inTitle.startsWith(q) ? 100 : inTitle.includes(q) ? 60 : 20,
        title: b.title,
        subtitle: b.subtitle ?? b.description.slice(0, 80),
        bookId: b.id,
      })
    }
  }

  for (const { book, chapter, lesson } of allLessons) {
    const title = lesson.title.toLowerCase()
    const chapterTitle = chapter.title.toLowerCase()
    const concepts = lesson.concepts.join(' ').toLowerCase()
    let score = 0
    if (title.startsWith(q)) score = 90
    else if (title.includes(q)) score = 70
    else if (chapterTitle.includes(q)) score = 40
    else if (concepts.includes(q)) score = 30
    if (score > 0) {
      hits.push({
        type: 'lesson',
        score,
        title: `${lesson.number} ${lesson.title}`,
        subtitle: `${book.title} · Chapter ${chapter.number}: ${chapter.title}`,
        lessonId: lesson.id,
        bookId: book.id,
      })
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

export type { Book, Chapter, Lesson, Discipline, DisciplineId }
