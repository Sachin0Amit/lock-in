/**
 * Custom Book Builder — the Main Academic Library catalog.
 *
 * Server-side flattening of the canonical TypeScript registry
 * (src/data/library) into the record shape the discovery engine works on.
 * Nothing is copied or re-authored: every record carries the canonical
 * lesson id (stable forever by the types.ts contract) plus a content
 * version hash so custom books can detect library updates.
 */
import { createHash } from 'node:crypto'
import { allBooks, allDisciplines, booksOfDiscipline, findLesson, paths } from '@/data/library/index'
import type { Book, Lesson } from '@/data/library/types'

export interface LibraryLessonRecord {
  /** canonical lesson id — THE durable reference */
  recordId: string
  bookId: string
  bookTitle: string
  disciplineId: string
  disciplineTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: string
  lessonTitle: string
  concepts: string[]
  /** glossary term names defined in this lesson */
  terms: string[]
  /** prerequisite lesson ids declared by the author */
  prerequisites: string[]
  words: number
  readMins: number
  url: string
  /** sha256 of the lesson content — drift signals "library update available" */
  versionHash: string
}

export interface LibraryChapterRecord {
  /** `${bookId}:${chapterNumber}` */
  key: string
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonRecordIds: string[]
  words: number
}

export interface LibraryBookRecord {
  bookId: string
  title: string
  subtitle: string
  disciplineId: string
  disciplineTitle: string
  level: string
  status: string
  accent: [string, string]
  url: string
  chapterKeys: string[]
  lessonRecordIds: string[]
  words: number
}

function termsOf(lesson: Lesson): string[] {
  const out: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'terms') for (const t of b.items) out.push(t.term)
  }
  return out
}

/** Deterministic content hash of a lesson (stable across restarts). */
export function lessonVersionHash(lesson: Lesson): string {
  const payload = JSON.stringify({
    id: lesson.id,
    n: lesson.number,
    t: lesson.title,
    c: lesson.concepts,
    b: lesson.blocks,
  })
  return createHash('sha256').update(payload).digest('hex').slice(0, 16)
}

function buildCatalog() {
  const lessons: LibraryLessonRecord[] = []
  const chapters: LibraryChapterRecord[] = []
  const books: LibraryBookRecord[] = []

  for (const book of allBooks) {
    const disc = allDisciplines.find((d) => d.id === book.discipline)
    const bookRec: LibraryBookRecord = {
      bookId: book.id,
      title: book.title,
      subtitle: book.subtitle ?? '',
      disciplineId: book.discipline,
      disciplineTitle: disc?.title ?? book.discipline,
      level: book.level,
      status: book.status,
      accent: book.accent,
      url: paths.book(book.id),
      chapterKeys: [],
      lessonRecordIds: [],
      words: 0,
    }

    for (const chapter of book.chapters) {
      const key = `${book.id}:${chapter.number}`
      const chRec: LibraryChapterRecord = {
        key,
        bookId: book.id,
        bookTitle: book.title,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        lessonRecordIds: [],
        words: 0,
      }
      for (const lesson of chapter.lessons) {
        const words = lesson.words ?? 0
        const rec: LibraryLessonRecord = {
          recordId: lesson.id,
          bookId: book.id,
          bookTitle: book.title,
          disciplineId: book.discipline,
          disciplineTitle: bookRec.disciplineTitle,
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          lessonNumber: lesson.number,
          lessonTitle: lesson.title,
          concepts: lesson.concepts,
          terms: termsOf(lesson),
          prerequisites: lesson.prerequisites ?? [],
          words,
          readMins: Math.max(1, Math.round(words / 200)),
          url: paths.lesson(book.id, lesson.id),
          versionHash: lessonVersionHash(lesson),
        }
        lessons.push(rec)
        chRec.lessonRecordIds.push(rec.recordId)
        chRec.words += words
        bookRec.lessonRecordIds.push(rec.recordId)
      }
      if (chRec.lessonRecordIds.length > 0) {
        chapters.push(chRec)
        bookRec.chapterKeys.push(key)
        bookRec.words += chRec.words
      }
    }
    books.push(bookRec)
  }

  return {
    lessons,
    chapters,
    books,
    lessonById: new Map(lessons.map((l) => [l.recordId, l])),
    chapterByKey: new Map(chapters.map((c) => [c.key, c])),
    bookById: new Map(books.map((b) => [b.bookId, b])),
  }
}

/** Built once per server process from the static registry. */
export const CATALOG = buildCatalog()

export function getLessonRecord(recordId: string): LibraryLessonRecord | undefined {
  return CATALOG.lessonById.get(recordId)
}

export function getChapterRecord(key: string): LibraryChapterRecord | undefined {
  return CATALOG.chapterByKey.get(key)
}

/** Live version hashes for a set of records (for drift detection). */
export function liveVersionHashes(recordIds: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const id of recordIds) {
    const rec = CATALOG.lessonById.get(id)
    if (rec) out[id] = rec.versionHash
  }
  return out
}

/* ------------------------------------------------------------------ */
/* Plain text of a lesson (for in-book search)                          */
/* ------------------------------------------------------------------ */

/** Every human-readable string of a lesson, concatenated. */
export function lessonPlainText(recordId: string): string {
  const ref = findLesson(recordId)
  if (!ref) return ''
  const { lesson } = ref
  const parts: string[] = [lesson.title, ...lesson.concepts]
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
        for (const it of b.items) parts.push(it.q, ...it.options)
        break
      case 'exercises':
        for (const set of b.sets)
          for (const q of set.questions) parts.push(q.q, q.answer ?? '')
        break
      case 'formula':
        parts.push(b.name)
        break
      case 'algorithm':
        parts.push(b.title)
        for (const l of b.lines) parts.push(l.code)
        break
    }
  }
  return parts.join('\n')
}

/* ------------------------------------------------------------------ */
/* Library tree for the browse UI (Method 2)                           */
/* ------------------------------------------------------------------ */

export interface TreeLesson {
  recordId: string
  number: string
  title: string
  words: number
}

export interface TreeChapter {
  number: number
  title: string
  status: string
  lessons: TreeLesson[]
  plannedLessons: string[]
}

export interface TreeBook {
  bookId: string
  title: string
  subtitle: string
  disciplineId: string
  level: string
  status: string
  accent: [string, string]
  url: string
  chapters: TreeChapter[]
}

export interface TreeDiscipline {
  id: string
  title: string
  blurb: string
  icon: string
  books: TreeBook[]
}

/** The full browse tree: discipline → book (subject) → chapter → topic. */
export function libraryTree(): TreeDiscipline[] {
  return allDisciplines.map((d) => ({
    id: d.id,
    title: d.title,
    blurb: d.blurb,
    icon: d.icon,
    books: booksOfDiscipline(d.id).map((book: Book) => ({
      bookId: book.id,
      title: book.title,
      subtitle: book.subtitle ?? '',
      disciplineId: book.discipline,
      level: book.level,
      status: book.status,
      accent: book.accent,
      url: paths.book(book.id),
      chapters: book.chapters
        .filter((c) => c.lessons.length > 0 || (c.plannedLessons?.length ?? 0) > 0)
        .map((c) => ({
          number: c.number,
          title: c.title,
          status: c.status,
          plannedLessons: c.plannedLessons ?? [],
          lessons: c.lessons.map((l) => ({
            recordId: l.id,
            number: l.number,
            title: l.title,
            words: l.words ?? 0,
          })),
        })),
    })),
  }))
}
