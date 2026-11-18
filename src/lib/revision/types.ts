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
  /** quiz events: raw correct answers in this quiz (≤ total) */
  score?: number
  /** quiz events: total questions in this quiz */
  total?: number
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

/* ------------------------------------------------------------------ */
/* Study progress (the Progress tab — owner directive 2026-11-18)      */
/* ------------------------------------------------------------------ */

/** How far a book has travelled through its chapters. */
export type BookProgressStatus = 'completed' | 'in-progress' | 'started' | 'untouched'

/** One book's honest study standing (zeros included, nothing invented). */
export interface BookProgress {
  bookId: string
  title: string
  accent: [string, string]
  disciplineId: string
  disciplineTitle: string
  status: BookProgressStatus
  /** chapters fully covered: chapter entry OR all lessons in the ledger */
  chaptersStudied: number
  chaptersTotal: number
  lessonsStudied: number
  /** lessons covered counting chapter marks (never exceeds lessonsTotal) */
  lessonsEffective: number
  lessonsTotal: number
  quizCorrect: number
  quizAnswered: number
  /** 0..100 · null before any question is answered */
  quizAccuracy: number | null
  avgMastery: number
  passes: number
  dueCount: number
  wordsStudied: number
  lastActivity: string | null
  /** the lowest-numbered chapter not yet covered — the honest "continue here" */
  nextChapterNumber: number | null
  nextChapterTitle: string | null
  url: string
}

/** "How many questions have I understood?" — the honest quiz census. */
export interface QuizStats {
  /** quiz events logged (reader quizzes + practice-drill signals) */
  events: number
  /** events carrying raw score/total */
  exact: number
  /** legacy events approximated from the quality ratio (labelled in UI) */
  estimated: number
  /** questions answered across all quizzes */
  answered: number
  /** questions answered correctly (exact + estimated parts) */
  understood: number
  /** 0..100 · null before any question is answered */
  accuracy: number | null
  /** distinct lessons that have logged at least one quiz */
  quizLessons: number
}

/** Whole-library coverage: what has actually been studied, by volume. */
export interface CoverageStats {
  topicsStudied: number
  chaptersStudied: number
  lessonsStudied: number
  chaptersTotal: number
  lessonsTotal: number
  booksCompleted: number
  booksInProgress: number
  booksStarted: number
  booksTotal: number
  wordsStudied: number
  /** estimated first-read minutes of the studied material */
  readMins: number
  totalPasses: number
}

export type RecommendationKind = 'revise' | 'practice' | 'continue' | 'finish' | 'start'

/** One engine verdict: what to do next, and honestly why. */
export interface Recommendation {
  /** stable: `${kind}:${scope}:${refId}` */
  id: string
  kind: RecommendationKind
  priority: number
  topic: string
  bookTitle: string
  reason: string
  /** revise/start/finish → the study surface; practice → the book page */
  url: string
  practiceUrl: string | null
  scope: StudyScope
  refId: string
  /** null for unstudied recommendations (finish/start/continue) */
  passes: number | null
  daysSince: number | null
  mastery: number | null
}

export interface ProgressResponse {
  coverage: CoverageStats
  quiz: QuizStats
  books: BookProgress[]
  /** the stored study list — every chapter/lesson mark with its revision count */
  topics: EntryView[]
  recommendations: Recommendation[]
  generatedAt: string
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
