/**
 * Content database access — the reading routes' data layer.
 * =========================================================
 *
 * All book pages, lesson pages, glossary/flashcard pages and the home
 * page are served from the packed SQLite tables (see
 * scripts/pack-library.ts and docs/project/CONTENT_DATABASE.md), never
 * from the TS registry and never from the client bundle.
 *
 * Caching: every request reads the tiny ContentPack singleton first
 * (one indexed row). Parsed content is cached in memory keyed by the
 * pack version, so a `bun run lib:pack` while the server is live is
 * picked up on the very next request — no restart needed.
 */
import { spawn } from 'node:child_process'
import { db } from '@/lib/db'
import { disciplines as disciplineList } from '@/data/library/disciplines'
import type {
  Book,
  BookStats,
  Discipline,
  LibrarySnapshot,
  LessonRef,
  LessonStub,
  NavLesson,
  ShelfBook,
} from '@/data/library/derive'

/* ------------------------------------------------------------------ */
/* Pack cache                                                          */
/* ------------------------------------------------------------------ */

interface ParsedLesson {
  lesson: import('@/data/library/types').Lesson
  bookId: string
  chapterNumber: number
  number: string
  title: string
  words: number
  position: number
}

interface PackCache {
  version: number
  home: LibrarySnapshot
  outlines: Map<string, { book: Book; stats: BookStats }>
  fullBooks: Map<string, Book>
  lessons: Map<string, ParsedLesson>
  /** stubs enriched with the book title, for the palette index API */
  stubViews: (LessonStub & { bookTitle: string })[]
  ordered: NavLesson[]
}

let memory: PackCache | null = null

/* ------------------------------------------------------------------ */
/* Self-heal: a wiped content cache repacks itself on demand          */
/* ------------------------------------------------------------------ */

let healing: Promise<void> | null = null
let healFailedAt = 0

/** Read the pack singleton; an unreadable database reads as "absent". */
async function readPackRow() {
  try {
    return await db.contentPack.findUnique({ where: { id: 'singleton' } })
  } catch {
    return null
  }
}

/**
 * The content tables are DERIVED data (see scripts/pack-library.ts): the
 * authoring source of truth is the git-tracked TS registry. When the
 * sandbox recycles it sometimes drops those derived rows — every route
 * would then serve an empty library ("0 Books / 0 Lessons / 0 Words").
 * Instead of showing that, the first request after a wipe re-runs the
 * packer exactly once: concurrent requests share the same in-flight
 * run, and a failed run backs off for a minute instead of spawning a
 * packer per request. The pack takes ~0.6 s.
 */
async function repackOnDemand(): Promise<void> {
  if (healing) return healing
  healing = new Promise<void>((resolve) => {
    const child = spawn('bun', ['scripts/pack-library.ts'], {
      cwd: process.cwd(),
      stdio: 'ignore',
    })
    // no bun on PATH → 'error'; packer done (any exit code) → 'exit'
    child.on('error', () => resolve())
    child.on('exit', () => resolve())
  })
  try {
    await healing
  } catch {
    healFailedAt = Date.now()
  } finally {
    healing = null
  }
}

async function loadPack(): Promise<PackCache | null> {
  let pack = await readPackRow()
  if (!pack) {
    if (Date.now() - healFailedAt > 60_000) await repackOnDemand()
    pack = await readPackRow()
    if (!pack) return null
  }
  if (memory && memory.version === pack.version) return memory

  const bookRows = await db.libraryBook.findMany({ orderBy: { position: 'asc' } })
  const lessonRows = await db.libraryLesson.findMany({ orderBy: { position: 'asc' } })

  const outlines = new Map<string, { book: Book; stats: BookStats }>()
  const bookTitles = new Map<string, string>()
  let plannedLessons = 0
  let terms = 0

  const shelfBooks: ShelfBook[] = []
  for (const r of bookRows) {
    const book = JSON.parse(r.outlineJson) as Book
    const stats = JSON.parse(r.statsJson) as BookStats
    book.id = r.id
    outlines.set(r.id, { book, stats })
    bookTitles.set(r.id, r.title)
    plannedLessons += book.chapters.reduce(
      (m, c) => m + c.lessons.length + (c.plannedLessons?.length ?? 0),
      0,
    )
    terms += stats.terms
    shelfBooks.push({
      id: r.id,
      title: r.title,
      subtitle: r.subtitle || undefined,
      discipline: book.discipline,
      level: r.level,
      description: r.description,
      status: r.status as Book['status'],
      accent: JSON.parse(r.accentJson) as [string, string],
      stats,
    })
  }

  const lessons = new Map<string, ParsedLesson>()
  const stubViews: (LessonStub & { bookTitle: string })[] = []
  const ordered: NavLesson[] = []
  let words = 0
  for (const r of lessonRows) {
    const lesson = JSON.parse(r.contentJson) as import('@/data/library/types').Lesson
    lessons.set(r.id, {
      lesson,
      bookId: r.bookId,
      chapterNumber: r.chapterNumber,
      number: r.number,
      title: r.title,
      words: r.words,
      position: r.position,
    })
    words += r.words
    stubViews.push({
      id: r.id,
      bookId: r.bookId,
      bookTitle: bookTitles.get(r.bookId) ?? '',
      number: r.number,
      title: r.title,
      words: r.words,
    })
    ordered.push({ bookId: r.bookId, lessonId: r.id, number: r.number, title: r.title })
  }

  /* full books = outline + lesson bodies merged back into their slots */
  const lessonsByBook = new Map<string, Map<number, ParsedLesson[]>>()
  for (const l of lessons.values()) {
    let byChapter = lessonsByBook.get(l.bookId)
    if (!byChapter) {
      byChapter = new Map()
      lessonsByBook.set(l.bookId, byChapter)
    }
    const list = byChapter.get(l.chapterNumber) ?? []
    list.push(l)
    byChapter.set(l.chapterNumber, list)
  }
  const fullBooks = new Map<string, Book>()
  for (const [bookId, { book }] of outlines) {
    const byChapter = lessonsByBook.get(bookId)
    const full: Book = {
      ...book,
      chapters: book.chapters.map((ch) => ({
        ...ch,
        lessons: (byChapter?.get(ch.number) ?? []).map((l) => l.lesson),
      })),
    }
    fullBooks.set(bookId, full)
  }

  memory = {
    version: pack.version,
    home: {
      books: shelfBooks,
      disciplines: disciplineList as Discipline[],
      lessons: stubViews.map(({ id, bookId, number, title, words: w }) => ({
        id,
        bookId,
        number,
        title,
        words: w,
      })),
      stats: {
        disciplines: disciplineList.length,
        books: bookRows.length,
        written: lessonRows.length,
        plannedLessons,
        words,
        terms,
      },
    },
    outlines,
    fullBooks,
    lessons,
    stubViews,
    ordered,
  }
  return memory
}

/* ------------------------------------------------------------------ */
/* Public API (server components + route handlers only)               */
/* ------------------------------------------------------------------ */

/** The home page snapshot: shelves, cards, written-lesson stubs, stats. */
export async function getHomeSnapshot(): Promise<LibrarySnapshot | null> {
  const c = await loadPack()
  return c?.home ?? null
}

/** Lesson stubs with book titles, for the client palette index API. */
export async function getLessonStubViews(): Promise<(LessonStub & { bookTitle: string })[]> {
  const c = await loadPack()
  return c?.stubViews ?? []
}

/** First book of the first shelf (the footer glossary link target). */
export async function getFirstBookId(): Promise<string | null> {
  const c = await loadPack()
  return c?.ordered ? [...c.outlines.keys()][0] ?? null : null
}

/** Book metadata + stats + stub-outline — the book page / TOC payload. */
export async function getBookOutline(
  bookId: string,
): Promise<{ book: Book; stats: BookStats } | null> {
  const c = await loadPack()
  return c?.outlines.get(bookId) ?? null
}

/** Book title for generateMetadata (cheap, outline-only). */
export async function getBookTitle(bookId: string): Promise<string | null> {
  const c = await loadPack()
  const b = c?.outlines.get(bookId)
  return b?.book.title ?? null
}

/** The complete book with lesson bodies — glossary + flashcards pages. */
export async function getBookFull(bookId: string): Promise<Book | null> {
  const c = await loadPack()
  return c?.fullBooks.get(bookId) ?? null
}

export interface LessonPageData {
  ref: LessonRef
  prev: NavLesson | null
  next: NavLesson | null
  /** prerequisite lessons that exist in the library, in declared order */
  prereqs: NavLesson[]
}

/** Everything the lesson reader page needs, resolved in one cache hit. */
export async function getLessonPageData(lessonId: string): Promise<LessonPageData | null> {
  const c = await loadPack()
  if (!c) return null
  const entry = c.lessons.get(lessonId)
  if (!entry) return null
  const outline = c.outlines.get(entry.bookId)
  if (!outline) return null
  const chapter = outline.book.chapters.find((ch) => ch.number === entry.chapterNumber)
  if (!chapter) return null

  const readMins = Math.max(1, Math.round(entry.words / 200))
  const idx = c.ordered.findIndex((n) => n.lessonId === lessonId)
  const prev = idx > 0 ? c.ordered[idx - 1] : null
  const next = idx >= 0 && idx < c.ordered.length - 1 ? c.ordered[idx + 1] : null

  const prereqs: NavLesson[] = []
  for (const id of entry.lesson.prerequisites ?? []) {
    const p = c.lessons.get(id)
    if (p) {
      prereqs.push({ bookId: p.bookId, lessonId: id, number: p.number, title: p.title })
    }
  }

  return {
    ref: {
      book: outline.book,
      chapter,
      lesson: entry.lesson,
      words: entry.words,
      readMins,
    },
    prev,
    next,
    prereqs,
  }
}
