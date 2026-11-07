import { disciplines } from './disciplines'
import { foundationMathematics } from './books/mathematics/foundation-mathematics/book'
import { arithmeticNumberSystems } from './books/mathematics/arithmetic-number-systems/book'
import { elementaryAlgebra } from './books/mathematics/elementary-algebra/book'
import type { Book, Chapter, Discipline, DisciplineId, Lesson, Term } from './types'
import { countLessonWords } from './types'

/**
 * LockIn Library — central registry.
 *
 * Every book in the platform is imported here and nothing else touches the
 * book folders. To add a book: create its folder under books/<discipline>/,
 * export a Book from book.ts, import it into `allBooks`, done — the library
 * home, search index, navigation and stats all pick it up automatically.
 */
export const allBooks: Book[] = [foundationMathematics, arithmeticNumberSystems, elementaryAlgebra]

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

/** A lesson's URL paths (single place so links never drift). */
export const paths = {
  home: () => '/',
  book: (bookId: string) => `/book/${bookId}`,
  lesson: (bookId: string, lessonId: string) => `/book/${bookId}/lesson/${lessonId}`,
  revise: (bookId: string) => `/book/${bookId}/revise`,
  glossary: (bookId: string) => `/book/${bookId}/glossary`,
}

/* ------------------------------------------------------------------ */
/* Glossary, formulas, headings (derived from book content)            */
/* ------------------------------------------------------------------ */

export interface GlossaryEntry extends Term {
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
  const terms = allBooks.reduce((n, b) => n + bookGlossary(b).length, 0)
  return {
    disciplines: disciplines.length,
    books: allBooks.length,
    written,
    plannedLessons,
    words,
    terms,
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
    terms: bookGlossary(book).length,
    formulas: bookFormulas(book).length,
  }
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
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

interface SearchDoc {
  lessonId: string
  bookId: string
  /** lowercase searchable text of the whole lesson (prose, headings, terms, captions) */
  blob: string
  /** raw (original case) text for snippet extraction */
  raw: string
}

/** Collect every human-readable string in a lesson into one searchable blob. */
function lessonText(lesson: Lesson): string {
  const parts: string[] = [lesson.title, lesson.concepts.join(' ')]
  for (const b of lesson.blocks) {
    switch (b.kind) {
      case 'para':
      case 'heading':
        parts.push(b.text)
        break
      case 'callout':
        parts.push(b.title, b.text)
        break
      case 'terms':
        for (const t of b.items) parts.push(t.term, t.def)
        break
      case 'equation':
        if (b.note) parts.push(b.note)
        break
      case 'derivation':
        parts.push(b.title, b.statement)
        for (const s of b.steps) parts.push(s.label, s.explanation)
        parts.push(b.result)
        break
      case 'example':
        parts.push(b.title, ...b.steps)
        break
      case 'figure':
        parts.push(b.caption)
        break
      case 'table':
        if (b.caption) parts.push(b.caption)
        parts.push(...b.head)
        for (const r of b.rows) parts.push(...r)
        break
      case 'list':
        parts.push(...b.items)
        break
      case 'quiz':
        for (const it of b.items) parts.push(it.q, it.explain, ...it.options)
        break
      case 'exercises':
        for (const set of b.sets)
          for (const q of set.questions) {
            const sol = Array.isArray(q.solution) ? q.solution.join(' ') : q.solution
            parts.push(q.q, sol, q.answer ?? '')
          }
        break
      case 'formula':
        parts.push(b.name, b.note ?? '')
        break
      case 'algorithm':
        parts.push(b.title, b.note ?? '')
        for (const l of b.lines) parts.push(l.code, l.note ?? '')
        break
    }
  }
  return parts.join(' \n ')
}

/** Built once at module load: one searchable document per written lesson. */
const SEARCH_DOCS: SearchDoc[] = allLessons.map(({ book, lesson }) => {
  const raw = lessonText(lesson)
  return { lessonId: lesson.id, bookId: book.id, blob: raw.toLowerCase(), raw }
})

/** True when every space-separated token appears somewhere in `haystack`. */
function allTokensIn(tokens: string[], haystack: string): boolean {
  return tokens.every((t) => haystack.includes(t))
}

/** Short centered excerpt around the first token match, for full-text hits. */
function makeSnippet(raw: string, tokens: string[], len = 130): string {
  const lower = raw.toLowerCase()
  let at = -1
  for (const t of tokens) {
    const i = lower.indexOf(t)
    if (i !== -1 && (at === -1 || i < at)) at = i
  }
  if (at === -1) return ''
  const start = Math.max(0, at - 40)
  const text = raw.slice(start, start + len).replace(/\s+/g, ' ').trim()
  return `${start > 0 ? '… ' : ''}${text}${start + len < raw.length ? ' …' : ''}`
}

/**
 * Client-side search across books, lessons, glossary terms and full lesson
 * text. Ranking: title starts-with > title contains > concept/term match >
 * chapter title > contiguous full-text > scattered token match.
 */
export function searchLibrary(query: string, limit = 16): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const tokens = q.split(/\s+/).filter(Boolean)
  const hits: SearchHit[] = []

  for (const b of allBooks) {
    const inTitle = b.title.toLowerCase()
    const inDesc = `${b.subtitle ?? ''} ${b.description}`.toLowerCase()
    if (inTitle.includes(q) || inDesc.includes(q) || allTokensIn(tokens, inDesc)) {
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
    const doc = SEARCH_DOCS.find((d) => d.lessonId === lesson.id)
    const blob = doc?.blob ?? ''
    let score = 0
    let snippet: string | undefined
    if (title.startsWith(q)) score = 95
    else if (title.includes(q)) score = 75
    else if (concepts.includes(q)) score = 55
    else if (chapterTitle.includes(q)) score = 45
    else if (blob.includes(q)) {
      score = 35
      snippet = makeSnippet(doc!.raw, [q])
    } else if (allTokensIn(tokens, blob)) {
      score = 28
      snippet = makeSnippet(doc!.raw, tokens)
    }
    if (score > 0) {
      hits.push({
        type: 'lesson',
        score,
        title: `${lesson.number} ${lesson.title}`,
        subtitle: `${book.title} · Chapter ${chapter.number}: ${chapter.title}`,
        snippet,
        lessonId: lesson.id,
        bookId: book.id,
      })
    }
  }

  /* Glossary term hits — definitions are often what a reader looks for. */
  for (const b of allBooks) {
    for (const entry of bookGlossary(b)) {
      const term = entry.term.toLowerCase()
      const def = entry.def.toLowerCase()
      let score = 0
      if (term === q) score = 85
      else if (term.startsWith(q)) score = 65
      else if (term.includes(q)) score = 50
      else if (def.includes(q)) score = 30
      if (score > 0) {
        hits.push({
          type: 'term',
          score,
          title: entry.term,
          subtitle: `Term · ${b.title} · lesson ${entry.lessonNumber}`,
          snippet: entry.def.length > 110 ? `${entry.def.slice(0, 110).trim()}…` : entry.def,
          lessonId: entry.lessonId,
          bookId: b.id,
        })
      }
    }
  }

  return hits
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export type { Book, Chapter, Lesson, Discipline, DisciplineId, Term }
