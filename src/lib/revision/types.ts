/**
 * Revision & Mastery — shared contracts (isomorphic).
 *
 * ONE study ledger per user, keyed by canonical Main Academic Library ids
 * (chapters as `${bookId}:${chapterNumber}` — the catalog key — and lessons
 * by their stable lesson ids). The ledger is fed from every marking surface
 * in the app and drives the spaced-repetition schedule, mastery scores,
 * revision analytics and the knowledge-graph overlay.
 */

export type StudyScope = 'chapter' | 'lesson'

/** Marking actions accepted by POST /api/revision/mark. */
export type MarkAction = 'study' | 'revise' | 'unmark' | 'quiz'

/** How the study event was produced (audit trail in StudyEvent.kind). */
export type EventKind =
  | 'first'
  | 'revision'
  | 'quiz'
  | 'chapter-mark'
  | 'lesson-mark'
  | 'lesson-complete'

export interface MarkItem {
  scope: StudyScope
  /** chapter → `bookId:chapterNumber` · lesson → canonical lesson id */
  refId: string
}

export interface MarkRequest {
  items: MarkItem[]
  action: MarkAction
  /** self-rating 0..5 (Again=1 · Hard=3 · Good=4 · Easy=5); default 3 */
  quality?: number
  /** optional engagement seconds */
  secs?: number
  /** explicit event kind for the audit trail (e.g. 'chapter-mark') */
  kind?: EventKind
}

export type EntryState = 'learning' | 'familiar' | 'strong' | 'mastered'

/** A ledger entry with resolved library metadata and live derived fields. */
export interface EntryView {
  scope: StudyScope
  refId: string
  bookId: string
  bookTitle: string
  disciplineId: string
  disciplineTitle: string
  chapterNumber: number
  chapterTitle: string
  /** "Chapter 3 · Factorization" or "3.2 · Factoring Quadratic Trinomials" */
  label: string
  lessonNumber?: string
  lessonTitle?: string
  /** chapter scope: how many lessons the chapter has */
  lessonCount?: number
  /** chapter scope: lessons of this chapter present in the ledger */
  lessonsStudied?: number
  readMins: number
  url: string

  passes: number
  firstAt: string
  lastAt: string
  dueAt: string
  intervalDays: number
  ease: number
  lastQuality: number
  mastery: number
  /** live forgetting-risk 0..100 */
  risk: number
  state: EntryState
  overdueDays: number
  daysSince: number
}

export interface QueueItem extends EntryView {
  /** human explanation of why this item is being suggested */
  reason: string
  /** higher = revise sooner */
  urgency: number
}

export interface RevisionSummary {
  dueCount: number
  watchCount: number
  studiedChapters: number
  studiedLessons: number
  totalChapters: number
  totalLessons: number
  totalPasses: number
  avgMastery: number
  activeDays: number
  revisions7d: number
  estMins: number
  lastActivity: string | null
}

export interface BookBreakdown {
  bookId: string
  title: string
  accent: [string, string]
  chaptersStudied: number
  chaptersTotal: number
  lessonsStudied: number
  lessonsTotal: number
  avgMastery: number
  passes: number
  dueCount: number
  lastActivity: string | null
}

export interface ActivityDay {
  date: string // YYYY-MM-DD
  count: number
}

export interface RecentEvent {
  kind: string
  scope: StudyScope
  refId: string
  label: string
  url: string
  createdAt: string
}

export interface OverviewResponse {
  entries: EntryView[]
  queue: QueueItem[]
  summary: RevisionSummary
  activity: ActivityDay[]
  bookBreakdown: BookBreakdown[]
  leastRevised: { chapters: EntryView[]; lessons: EntryView[]; books: string[] }
  masteryHistogram: { state: EntryState | 'new'; count: number }[]
  recentEvents: RecentEvent[]
}

export interface MarkItemResult {
  scope: StudyScope
  refId: string
  ok: boolean
  error?: string
  created?: boolean
  deleted?: boolean
  entry?: EntryView
}

export interface MarkResponse {
  results: MarkItemResult[]
}

/* ------------------------------------------------------------------ */
/* Knowledge graph                                                     */
/* ------------------------------------------------------------------ */

export interface GraphNode {
  id: string
  bookId: string
  bookTitle: string
  chapterKey: string
  chapterNumber: number
  chapterTitle: string
  number: string
  title: string
  concepts: string[]
  words: number
  readMins: number
  url: string
  prereqIds: string[]
  /** mastery overlay — null/absent when the lesson is not in the ledger */
  studied: boolean
  passes?: number
  mastery?: number
  risk?: number
  dueAt?: string | null
  state?: EntryState | 'new'
}

export interface GraphEdge {
  source: string
  target: string
  kind: 'prereq' | 'sequence' | 'bridge'
  /** concept Jaccard similarity for bridges; 1 for structure edges */
  weight: number
}

export interface GraphChapter {
  key: string
  bookId: string
  title: string
  lessonIds: string[]
  /** fraction of the chapter's lessons present in the ledger */
  lessonsStudied: number
  passes: number
}

export interface GraphResponse {
  nodes: GraphNode[]
  edges: GraphEdge[]
  chapters: GraphChapter[]
  books: { bookId: string; title: string; accent: [string, string] }[]
  stats: {
    nodes: number
    edges: number
    prereqEdges: number
    sequenceEdges: number
    bridgeEdges: number
  }
}

export interface RevisionSummaryCompact {
  dueCount: number
  watchCount: number
  studiedChapters: number
  studiedLessons: number
}

/** Session rating buttons: Again(1) · Hard(3) · Good(4) · Easy(5). */
export const QUALITY_LABELS: Record<number, string> = {
  1: 'Again',
  2: 'Again',
  3: 'Hard',
  4: 'Good',
  5: 'Easy',
}

export const STATE_LABELS: Record<EntryState | 'new', string> = {
  new: 'Not started',
  learning: 'Learning',
  familiar: 'Familiar',
  strong: 'Strong',
  mastered: 'Mastered',
}
