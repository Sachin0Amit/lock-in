/**
 * Custom Book Builder — persistence service.
 *
 * All custom-book database logic lives here so the API routes stay thin.
 * Invariants enforced:
 *  - every content reference points to a real canonical library lesson id;
 *  - a lesson appears at most once per book (unique constraint + validation);
 *  - coverage rows only change when the client explicitly replaces them —
 *    editing the structure never silently rewrites the honest gap report;
 *  - deleting a custom book never touches library content (it is not stored
 *    in this database at all);
 *  - all queries are scoped by userId (data isolation).
 */
import { db } from '@/lib/db'
import { getLessonRecord } from './catalog'
import { validateCoverage, validateToc } from './toc'

export const CREATION_METHODS = ['exam', 'subject', 'topics', 'pdf', 'combination'] as const
export const BOOK_STATUSES = ['draft', 'published', 'archived'] as const
export type CreationMethod = (typeof CREATION_METHODS)[number]
export type BookStatus = (typeof BOOK_STATUSES)[number]

export interface CreateBookInput {
  title: string
  description?: string
  creationMethod: string
  inputMetadata?: unknown
  status?: string
  toc: unknown
  coverage?: unknown
}

export interface ServiceError {
  status: number
  message: string
  extra?: Record<string, unknown>
}

function err(status: number, message: string, extra?: Record<string, unknown>): ServiceError {
  return { status, message, extra }
}

function metadataOf(item: { recordId: string; requestedTopic?: string; via?: string; confidence?: number }): string {
  const rec = getLessonRecord(item.recordId)
  return JSON.stringify({
    requestedTopic: item.requestedTopic ?? rec?.lessonTitle ?? item.recordId,
    via: item.via ?? 'added in the editor',
    confidence: typeof item.confidence === 'number' ? item.confidence : 1,
  })
}

/* ------------------------------------------------------------------ */
/* Create                                                              */
/* ------------------------------------------------------------------ */

export async function createCustomBook(
  userId: string,
  input: CreateBookInput,
): Promise<{ id: string } | ServiceError> {
  const title = input.title?.trim() ?? ''
  if (title.length < 2 || title.length > 200) {
    return err(400, 'Title must be between 2 and 200 characters.')
  }
  const description = (input.description ?? '').trim().slice(0, 2000)
  if (!CREATION_METHODS.includes(input.creationMethod as CreationMethod)) {
    return err(400, 'Unknown creation method.')
  }
  const status = input.status ?? 'draft'
  if (!BOOK_STATUSES.includes(status as BookStatus)) {
    return err(400, 'Invalid status.')
  }
  if (status === 'published') {
    /* a published book must have real content */
    const peek = Array.isArray(input.toc) ? (input.toc as { items?: unknown[] }[]) : []
    if (peek.length === 0 || peek.every((c) => !Array.isArray(c.items) || c.items.length === 0)) {
      return err(400, 'Cannot publish a book with no library content.')
    }
  }
  let inputMetadata = '{}'
  if (input.inputMetadata !== undefined) {
    try {
      inputMetadata = JSON.stringify(input.inputMetadata)
    } catch {
      return err(400, 'inputMetadata must be JSON-serialisable.')
    }
  }

  const tocResult = validateToc(input.toc)
  if (!tocResult.ok) return err(400, 'Invalid table of contents.', { details: tocResult.errors })
  const coverageResult = validateCoverage(input.coverage ?? [])
  if (!coverageResult.ok) return err(400, 'Invalid coverage report.', { details: coverageResult.errors })

  const book = await db.$transaction(async (tx) => {
    const created = await tx.customBook.create({
      data: {
        userId,
        title,
        description,
        creationMethod: input.creationMethod,
        inputMetadata,
        status,
      },
    })
    for (const [ci, ch] of tocResult.toc.entries()) {
      const chapter = await tx.customBookChapter.create({
        data: { customBookId: created.id, title: ch.title, position: ci },
      })
      for (const [ii, item] of ch.items.entries()) {
        const live = getLessonRecord(item.recordId)
        await tx.customBookContentReference.create({
          data: {
            customBookId: created.id,
            customBookChapterId: chapter.id,
            sourceLibraryRecordId: item.recordId,
            sourceContentType: 'lesson',
            position: ii,
            selectedVersion: live?.versionHash ?? '',
            matchingMetadata: metadataOf(item),
          },
        })
      }
    }
    for (const row of coverageResult.rows) {
      await tx.customBookCoverage.create({
        data: {
          customBookId: created.id,
          requestedTopic: row.requestedTopic,
          requestedParent: row.requestedParent,
          matchedLibraryRecordId: row.matchedLibraryRecordId,
          matchStatus: row.matchStatus,
          matchConfidence: row.matchConfidence,
        },
      })
    }
    return created
  })

  return { id: book.id }
}

/* ------------------------------------------------------------------ */
/* Read                                                                */
/* ------------------------------------------------------------------ */

export interface BookItemView {
  id: string
  recordId: string
  requestedTopic?: string
  via?: string
  confidence?: number
  position: number
  lessonNumber: string
  lessonTitle: string
  chapterTitle: string
  bookTitle: string
  location: string
  url: string
  words: number
  readMins: number
  updateAvailable: boolean
  /** true when the referenced lesson no longer exists in the live library */
  missing: boolean
}

export interface BookCoverageRowView {
  requestedTopic: string
  requestedParent: string
  matchedLibraryRecordId: string | null
  matchStatus: string
  matchConfidence: number
}

export interface BookDetailView {
  id: string
  title: string
  description: string
  creationMethod: string
  inputMetadata: Record<string, unknown>
  status: BookStatus
  createdAt: string
  updatedAt: string
  chapters: { id: string; title: string; position: number; items: BookItemView[] }[]
  coverage: BookCoverageRowView[]
  coverageSummary: { requested: number; exact: number; equivalent: number; partial: number; notAvailable: number; percent: number }
  totals: { chapters: number; topics: number; words: number; readMins: number; updatesAvailable: number }
  progress: { lastReadRecordId: string | null; completedRecordIds: string[]; updatedAt: string | null }
  bookmarks: { recordId: string; createdAt: string }[]
  notes: { id: string; recordId: string; noteContent: string; createdAt: string; updatedAt: string }[]
}

export async function getCustomBookForUser(
  userId: string,
  bookId: string,
): Promise<BookDetailView | null> {
  const book = await db.customBook.findFirst({
    where: { id: bookId, userId },
    include: {
      chapters: { orderBy: { position: 'asc' }, include: { items: { orderBy: { position: 'asc' } } } },
      coverage: { orderBy: { id: 'asc' } },
      bookmarks: { where: { userId }, orderBy: { createdAt: 'desc' } },
      notes: { where: { userId }, orderBy: { updatedAt: 'desc' } },
      readStates: { where: { userId } },
    },
  })
  if (!book) return null

  const chapters = book.chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    position: ch.position,
    items: ch.items.map((item): BookItemView => {
      let meta: { requestedTopic?: string; via?: string; confidence?: number } = {}
      try {
        meta = JSON.parse(item.matchingMetadata)
      } catch {
        meta = {}
      }
      const live = getLessonRecord(item.sourceLibraryRecordId)
      return {
        id: item.id,
        recordId: item.sourceLibraryRecordId,
        requestedTopic: meta.requestedTopic,
        via: meta.via,
        confidence: meta.confidence,
        position: item.position,
        lessonNumber: live?.lessonNumber ?? '',
        lessonTitle: live?.lessonTitle ?? '(no longer in the library)',
        chapterTitle: live?.chapterTitle ?? '',
        bookTitle: live?.bookTitle ?? '',
        location: live ? `${live.bookTitle} · Chapter ${live.chapterNumber} · ${live.chapterTitle}` : '',
        url: live?.url ?? '',
        words: live?.words ?? 0,
        readMins: live?.readMins ?? 0,
        updateAvailable:
          !!item.selectedVersion && !!live && item.selectedVersion !== live.versionHash,
        missing: !live,
      }
    }),
  }))

  let exact = 0
  let equivalent = 0
  let partial = 0
  let notAvailable = 0
  for (const row of book.coverage) {
    if (row.matchStatus === 'exact') exact++
    else if (row.matchStatus === 'equivalent') equivalent++
    else if (row.matchStatus === 'partial') partial++
    else notAvailable++
  }
  const requested = book.coverage.length
  const percent =
    requested === 0
      ? 100
      : Math.round(((exact + equivalent + 0.5 * partial) / requested) * 1000) / 10

  const allItems = chapters.flatMap((c) => c.items)
  const progressRow = book.readStates[0]
  let completedRecordIds: string[] = []
  if (progressRow) {
    try {
      completedRecordIds = JSON.parse(progressRow.completedRecordIds)
    } catch {
      completedRecordIds = []
    }
  }

  return {
    id: book.id,
    title: book.title,
    description: book.description,
    creationMethod: book.creationMethod as CreationMethod,
    inputMetadata: safeParse(book.inputMetadata),
    status: book.status as BookStatus,
    createdAt: book.createdAt.toISOString(),
    updatedAt: book.updatedAt.toISOString(),
    chapters,
    coverage: book.coverage.map((r) => ({
      requestedTopic: r.requestedTopic,
      requestedParent: r.requestedParent,
      matchedLibraryRecordId: r.matchedLibraryRecordId,
      matchStatus: r.matchStatus,
      matchConfidence: r.matchConfidence,
    })),
    coverageSummary: { requested, exact, equivalent, partial, notAvailable, percent },
    totals: {
      chapters: chapters.length,
      topics: allItems.length,
      words: allItems.reduce((n, i) => n + i.words, 0),
      readMins: allItems.reduce((n, i) => n + i.readMins, 0),
      updatesAvailable: allItems.filter((i) => i.updateAvailable).length,
    },
    progress: {
      lastReadRecordId: progressRow?.lastReadRecordId ?? null,
      completedRecordIds,
      updatedAt: progressRow?.updatedAt.toISOString() ?? null,
    },
    bookmarks: book.bookmarks.map((b) => ({ recordId: b.sourceLibraryRecordId, createdAt: b.createdAt.toISOString() })),
    notes: book.notes.map((n) => ({
      id: n.id,
      recordId: n.sourceLibraryRecordId,
      noteContent: n.noteContent,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    })),
  }
}

function safeParse(s: string): Record<string, unknown> {
  try {
    const v = JSON.parse(s)
    return typeof v === 'object' && v !== null ? (v as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

/* ------------------------------------------------------------------ */
/* List (bookshelf)                                                    */
/* ------------------------------------------------------------------ */

export interface BookSummaryView {
  id: string
  title: string
  description: string
  creationMethod: string
  status: BookStatus
  createdAt: string
  updatedAt: string
  lastOpenedAt: string | null
  chapters: number
  topics: number
  coveragePercent: number
  coverageRequested: number
  notAvailable: number
  completedTopics: number
  readingPercent: number
}

export async function listCustomBooks(userId: string): Promise<BookSummaryView[]> {
  const books = await db.customBook.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    include: { chapters: { include: { _count: { select: { items: true } } } } },
  })
  if (books.length === 0) return []
  const ids = books.map((b) => b.id)

  const coverageCounts = await db.customBookCoverage.groupBy({
    by: ['customBookId', 'matchStatus'],
    where: { customBookId: { in: ids } },
    _count: { _all: true },
  })
  const progressRows = await db.customBookProgress.findMany({
    where: { userId, customBookId: { in: ids } },
  })

  return books.map((book) => {
    const topics = book.chapters.reduce((n, c) => n + c._count.items, 0)
    let exact = 0
    let equivalent = 0
    let partial = 0
    let notAvailable = 0
    for (const row of coverageCounts) {
      if (row.customBookId !== book.id) continue
      if (row.matchStatus === 'exact') exact += row._count._all
      else if (row.matchStatus === 'equivalent') equivalent += row._count._all
      else if (row.matchStatus === 'partial') partial += row._count._all
      else notAvailable += row._count._all
    }
    const requested = exact + equivalent + partial + notAvailable
    const coveragePercent =
      requested === 0 ? 100 : Math.round(((exact + equivalent + 0.5 * partial) / requested) * 1000) / 10

    const prog = progressRows.find((p) => p.customBookId === book.id)
    let completed: string[] = []
    if (prog) {
      try {
        completed = JSON.parse(prog.completedRecordIds)
      } catch {
        completed = []
      }
    }
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      creationMethod: book.creationMethod,
      status: book.status as BookStatus,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      lastOpenedAt: prog?.updatedAt.toISOString() ?? null,
      chapters: book.chapters.length,
      topics,
      coveragePercent,
      coverageRequested: requested,
      notAvailable,
      completedTopics: completed.length,
      readingPercent: topics === 0 ? 0 : Math.round((completed.length / topics) * 100),
    }
  })
}

/* ------------------------------------------------------------------ */
/* Update                                                              */
/* ------------------------------------------------------------------ */

export interface UpdateBookInput {
  title?: string
  description?: string
  status?: string
  toc?: unknown
  coverage?: unknown
}

export async function updateCustomBook(
  userId: string,
  bookId: string,
  input: UpdateBookInput,
): Promise<{ ok: true } | ServiceError> {
  const existing = await db.customBook.findFirst({ where: { id: bookId, userId } })
  if (!existing) return err(404, 'Custom book not found.')

  const data: Record<string, unknown> = {}
  if (input.title !== undefined) {
    const title = input.title.trim()
    if (title.length < 2 || title.length > 200) return err(400, 'Title must be 2–200 characters.')
    data.title = title
  }
  if (input.description !== undefined) {
    data.description = input.description.trim().slice(0, 2000)
  }
  if (input.status !== undefined) {
    if (!BOOK_STATUSES.includes(input.status as BookStatus)) return err(400, 'Invalid status.')
    if (input.status === 'published' && input.toc === undefined) {
      /* publishing without a new TOC: check the existing structure */
      const count = await db.customBookContentReference.count({ where: { customBookId: bookId } })
      if (count === 0) return err(400, 'Cannot publish a book with no library content.')
    }
    data.status = input.status
  }

  let tocResult: ReturnType<typeof validateToc> | null = null
  if (input.toc !== undefined) {
    tocResult = validateToc(input.toc)
    if (!tocResult.ok) return err(400, 'Invalid table of contents.', { details: tocResult.errors })
  }
  let coverageResult: ReturnType<typeof validateCoverage> | null = null
  if (input.coverage !== undefined) {
    coverageResult = validateCoverage(input.coverage)
    if (!coverageResult.ok) return err(400, 'Invalid coverage report.', { details: coverageResult.errors })
  }

  await db.$transaction(async (tx) => {
    if (Object.keys(data).length > 0) {
      await tx.customBook.update({ where: { id: bookId }, data: data as never })
    }
    if (tocResult) {
      /* carry pinned versions & metadata over so library-update notices survive */
      const oldItems = await tx.customBookContentReference.findMany({ where: { customBookId: bookId } })
      const old = new Map(oldItems.map((o) => [o.sourceLibraryRecordId, o]))
      await tx.customBookChapter.deleteMany({ where: { customBookId: bookId } })
      for (const [ci, ch] of tocResult.toc.entries()) {
        const chapter = await tx.customBookChapter.create({
          data: { customBookId: bookId, title: ch.title, position: ci },
        })
        for (const [ii, item] of ch.items.entries()) {
          const live = getLessonRecord(item.recordId)
          const prev = old.get(item.recordId)
          await tx.customBookContentReference.create({
            data: {
              customBookId: bookId,
              customBookChapterId: chapter.id,
              sourceLibraryRecordId: item.recordId,
              sourceContentType: 'lesson',
              position: ii,
              selectedVersion:
                prev && prev.selectedVersion && item.recordId === prev.sourceLibraryRecordId
                  ? prev.selectedVersion
                  : live?.versionHash ?? '',
              matchingMetadata:
                prev && !item.requestedTopic && !item.via ? prev.matchingMetadata : metadataOf(item),
            },
          })
        }
      }
    }
    if (coverageResult) {
      await tx.customBookCoverage.deleteMany({ where: { customBookId: bookId } })
      for (const row of coverageResult.rows) {
        await tx.customBookCoverage.create({
          data: {
            customBookId: bookId,
            requestedTopic: row.requestedTopic,
            requestedParent: row.requestedParent,
            matchedLibraryRecordId: row.matchedLibraryRecordId,
            matchStatus: row.matchStatus,
            matchConfidence: row.matchConfidence,
          },
        })
      }
    }
  })

  return { ok: true }
}

/* ------------------------------------------------------------------ */
/* Duplicate & delete                                                  */
/* ------------------------------------------------------------------ */

export async function duplicateCustomBook(
  userId: string,
  bookId: string,
): Promise<{ id: string } | ServiceError> {
  const book = await db.customBook.findFirst({
    where: { id: bookId, userId },
    include: {
      chapters: { orderBy: { position: 'asc' }, include: { items: { orderBy: { position: 'asc' } } } },
      coverage: true,
    },
  })
  if (!book) return err(404, 'Custom book not found.')

  const toc = book.chapters.map((ch) => ({
    title: ch.title,
    items: ch.items.map((item) => {
      let meta: { requestedTopic?: string; via?: string; confidence?: number } = {}
      try {
        meta = JSON.parse(item.matchingMetadata)
      } catch {
        meta = {}
      }
      return {
        recordId: item.sourceLibraryRecordId,
        requestedTopic: meta.requestedTopic,
        via: meta.via,
        confidence: meta.confidence,
      }
    }),
  }))
  const coverage = book.coverage.map((r) => ({
    requestedTopic: r.requestedTopic,
    requestedParent: r.requestedParent,
    matchedLibraryRecordId: r.matchedLibraryRecordId,
    matchStatus: r.matchStatus,
    matchConfidence: r.matchConfidence,
  }))

  const created = await createCustomBook(userId, {
    title: `${book.title} (copy)`.slice(0, 200),
    description: book.description,
    creationMethod: book.creationMethod,
    inputMetadata: { ...safeParse(book.inputMetadata), copiedFrom: book.id },
    status: book.status === 'archived' ? 'draft' : book.status,
    toc,
    coverage,
  })
  if ('status' in created) return created
  return { id: created.id }
}

export async function deleteCustomBook(userId: string, bookId: string): Promise<boolean> {
  const book = await db.customBook.findFirst({ where: { id: bookId, userId } })
  if (!book) return false
  /* cascades: chapters, content references, coverage, bookmarks, notes, progress.
   * Main Library content lives outside this database and is untouched. */
  await db.customBook.delete({ where: { id: bookId } })
  return true
}

/* ------------------------------------------------------------------ */
/* Membership helper (bookmarks / notes / progress)                    */
/* ------------------------------------------------------------------ */

export async function bookRecordIds(userId: string, bookId: string): Promise<Set<string> | null> {
  const book = await db.customBook.findFirst({
    where: { id: bookId, userId },
    include: { chapters: { include: { items: true } } },
  })
  if (!book) return null
  return new Set(book.chapters.flatMap((c) => c.items.map((i) => i.sourceLibraryRecordId)))
}
