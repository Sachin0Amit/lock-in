/**
 * Custom Book Builder — client API helpers + view types.
 * Thin fetch wrapper with typed responses (server types are re-declared
 * here because the service layer is server-only).
 */
import type {
  CoverageSummary,
  MatchCandidate,
  ParsedInput,
  TopicMatch,
  TocChapterDraft,
} from './types'
import type { Block, Lesson } from '@/data/library/types'

export class ApiError extends Error {
  status: number
  data: Record<string, unknown> | null
  constructor(message: string, status: number, data: Record<string, unknown> | null = null) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {}
  if (init?.body && typeof init.body === 'string') headers['content-type'] = 'application/json'
  const res = await fetch(path, { ...init, headers: { ...headers, ...(init?.headers as Record<string, string>) } })
  const text = await res.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (!res.ok) {
    const obj = (data ?? {}) as Record<string, unknown>
    throw new ApiError(
      typeof obj.error === 'string' ? obj.error : `Request failed (${res.status})`,
      res.status,
      obj,
    )
  }
  return data as T
}

export const jsonBody = (body: unknown): RequestInit => ({ body: JSON.stringify(body) })

/* ------------------------------------------------------------------ */
/* Response view types                                                 */
/* ------------------------------------------------------------------ */

export interface MatchResponse {
  rootName: string
  matches: TopicMatch[]
  toc: TocChapterDraft[]
  coverage: CoverageSummary
  totalLessons: number
  totalWords: number
  prerequisites: {
    recordId: string
    lessonNumber: string
    lessonTitle: string
    location: string
    neededBy: string[]
  }[]
  unknownExam?: boolean
  examSuggestions?: string[]
  note?: string
}

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
  missing: boolean
}

export interface BookDetailView {
  id: string
  title: string
  description: string
  creationMethod: string
  inputMetadata: Record<string, unknown>
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
  chapters: { id: string; title: string; position: number; items: BookItemView[] }[]
  coverage: {
    requestedTopic: string
    requestedParent: string
    matchedLibraryRecordId: string | null
    matchStatus: string
    matchConfidence: number
  }[]
  coverageSummary: CoverageSummary & { percent: number }
  totals: { chapters: number; topics: number; words: number; readMins: number; updatesAvailable: number }
  progress: { lastReadRecordId: string | null; completedRecordIds: string[]; updatedAt: string | null }
  bookmarks: { recordId: string; createdAt: string }[]
  notes: { id: string; recordId: string; noteContent: string; createdAt: string; updatedAt: string }[]
}

export interface BookSummaryView {
  id: string
  title: string
  description: string
  creationMethod: string
  status: 'draft' | 'published' | 'archived'
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

export interface TreeLessonView {
  recordId: string
  number: string
  title: string
  words: number
}
export interface TreeChapterView {
  number: number
  title: string
  status: string
  lessons: TreeLessonView[]
  plannedLessons: string[]
}
export interface TreeBookView {
  bookId: string
  title: string
  subtitle: string
  disciplineId: string
  level: string
  status: string
  accent: [string, string]
  url: string
  chapters: TreeChapterView[]
}
export interface TreeDisciplineView {
  id: string
  title: string
  blurb: string
  icon: string
  books: TreeBookView[]
}

export interface LessonResponse {
  record: {
    recordId: string
    bookId: string
    bookTitle: string
    chapterNumber: number
    chapterTitle: string
    lessonNumber: string
    lessonTitle: string
    concepts: string[]
    prerequisites: string[]
    words: number
    readMins: number
    url: string
    versionHash: string
  }
  lesson: Lesson & { blocks: Block[] }
}

export interface PdfUploadResponse {
  pages: number
  textChars: number
  usedOcr: boolean
  warnings: string[]
  parsed: ParsedInput
}

export type { CoverageSummary, MatchCandidate, ParsedInput, TopicMatch, TocChapterDraft }

/* ------------------------------------------------------------------ */
/* Coverage helpers (client display)                                   */
/* ------------------------------------------------------------------ */

export const STATUS_META: Record<string, { label: string; className: string }> = {
  exact: { label: 'Exact match', className: 'border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' },
  equivalent: { label: 'Equivalent', className: 'border-teal-500/40 bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300' },
  partial: { label: 'Partial', className: 'border-amber-500/40 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' },
  not_available: { label: 'Not in Main Library', className: 'border-rose-500/40 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300' },
}

export function formatWords(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${Math.round(n / 1000)}k`
  return String(n)
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
