/**
 * Practice — shared contracts (isomorphic).
 *
 * Mock exams, adaptive drills, the Mistake Bank and readiness scores all
 * speak these shapes. Reference discipline mirrors the study ledger:
 * questions are identified by canonical lesson ids plus stable question
 * keys (`${lessonId}#q<block>.<i>` for quiz items,
 * `${lessonId}#x<block>.<set>.<i>` for exercise questions) — so a wrong
 * answer recorded anywhere (reader quiz, drill, mock exam) lands on ONE
 * Mistake Bank card, and a correct retake resolves it.
 */

import type { EntryState } from '@/lib/revision/types'

export type PracticeKind = 'exam' | 'drill'
export type MistakeSource = 'quiz' | 'exercise'

/* ------------------------------------------------------------------ */
/* Questions & papers                                                  */
/* ------------------------------------------------------------------ */

export interface PracticeQuestion {
  /** stable question key — shared with the Mistake Bank */
  id: string
  kind: 'mcq' | 'free'
  lessonId: string
  bookId: string
  bookTitle: string
  chapterKey: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: string
  lessonTitle: string
  /** exercise questions only: L1..L6 */
  level?: string
  /** question text with $…$ inline math */
  prompt: string
  options?: string[]
  answerIndex?: number
  /** correct option text (mcq) or final answer line (free) */
  answerText?: string
  /** quiz explanation */
  explain?: string
  /** exercise worked solution (steps array or legacy prose) */
  solution?: string | string[]
}

export interface FocusChapter {
  key: string
  title: string
  reason: string
}

export interface PaperMeta {
  seed: number
  presetKey: string
  kind: PracticeKind
  scopeChapters: number
  questionCount: number
  /** drill auto-focus only: why each chapter was chosen */
  focusChapters?: FocusChapter[]
}

export interface ExamPresetView {
  key: string
  name: string
  region: string
  category: string
  formatNote: string
  scopeStatus: 'provisional'
  durationMins: number
  questionCount: number
  marks: number
  negative: number
  caveats: string[]
}

export interface PaperResponse {
  paper: PracticeQuestion[]
  meta: PaperMeta
  preset: ExamPresetView | null
}

/* ------------------------------------------------------------------ */
/* Submitting                                                          */
/* ------------------------------------------------------------------ */

export interface AnswerOutcome {
  questionId: string
  /** mcq: chosen option index (absent = skipped) */
  chosen?: number
  /** free-response: learner's self-report after seeing the solution */
  selfWrong?: boolean
  selfRight?: boolean
}

export interface SubmitRequest {
  kind: PracticeKind
  presetKey: string
  seed: number
  secs: number
  answers: AnswerOutcome[]
}

export type QuestionOutcome = 'correct' | 'wrong' | 'skipped' | 'self-wrong' | 'self-right'

export interface QuestionResult extends PracticeQuestion {
  chosen?: number
  outcome: QuestionOutcome
}

export interface ChapterBreakdown {
  chapterKey: string
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
  total: number
  correct: number
  wrong: number
  /** 0..100; NaN→0 when the chapter had no answered questions */
  accuracy: number
}

export interface SubmitResponse {
  attemptId: string
  score: number
  maxScore: number
  percent: number
  correctCount: number
  wrongCount: number
  skippedCount: number
  secs: number
  breakdown: ChapterBreakdown[]
  questions: QuestionResult[]
  mistakesAdded: number
  ledgerSignals: number
}

export interface AttemptView {
  id: string
  kind: PracticeKind
  presetKey: string
  presetName: string
  score: number
  maxScore: number
  percent: number
  correctCount: number
  total: number
  secs: number
  finishedAt: string
}

export interface AttemptsResponse {
  attempts: AttemptView[]
}

/* ------------------------------------------------------------------ */
/* Readiness                                                           */
/* ------------------------------------------------------------------ */

export interface ChapterReadiness {
  key: string
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonsTotal: number
  lessonsStudied: number
  /** 0..100 — fraction of the chapter's lessons in the ledger */
  coverage: number
  /** 0..100 — mean mastery of tracked items (0 when untracked) */
  mastery: number
  /** 0..100 — 100 − forgetting risk (0 when untracked) */
  freshness: number
  /** 0..100 — coverage × mastery × freshness, the honest headline number */
  readiness: number
  tracked: boolean
}

export interface BookReadiness {
  bookId: string
  title: string
  accent: [string, string]
  status: string
  chapters: ChapterReadiness[]
  readiness: number
  coverage: number
  mastery: number
  freshness: number
  chaptersTracked: number
  chaptersTotal: number
}

export interface ExamReadiness {
  presetKey: string
  name: string
  region: string
  category: string
  durationMins: number
  questionCount: number
  scopeChapters: number
  readiness: number
  coverage: number
  mastery: number
  freshness: number
  caveats: string[]
  formatNote: string
}

export interface ReadinessResponse {
  library: {
    readiness: number
    coverage: number
    mastery: number
    freshness: number
    chaptersTotal: number
    chaptersTracked: number
  }
  books: BookReadiness[]
  exams: ExamReadiness[]
  presets: ExamPresetView[]
}

/* ------------------------------------------------------------------ */
/* Mistake Bank                                                        */
/* ------------------------------------------------------------------ */

export interface MistakeView {
  id: string
  source: MistakeSource
  lessonId: string
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonNumber: string
  lessonTitle: string
  url: string
  questionKey: string
  prompt: string
  given: string
  expected: string
  explain: string
  timesWrong: number
  passes: number
  mastery: number
  state: EntryState
  dueAt: string
  lastAt: string
  resolvedAt: string | null
  overdueDays: number
}

export interface MistakesResponse {
  stats: { total: number; due: number; upcoming: number; resolved: number }
  due: MistakeView[]
  upcoming: MistakeView[]
  resolved: MistakeView[]
}

export interface RecordMistakeRequest {
  source: MistakeSource
  lessonId: string
  questionKey: string
  prompt: string
  given: string
  expected: string
  explain?: string
  /** 'wrong' (default) records/re-opens; 'correct' resolves an existing card */
  outcome?: 'wrong' | 'correct'
}

export interface ReviewMistakeRequest {
  id: string
  quality: number
}
