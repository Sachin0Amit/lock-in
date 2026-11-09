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
/* Difficulty calibration (data-derived)                               */
/* ------------------------------------------------------------------ */

/**
 * Paper difficulty bands. Every band draws from the SAME library pool
 * (chapter-balanced, no repeats); the band only changes WHICH questions
 * each chapter contributes first — warm-up serves the easiest calibrated
 * questions, exam-level the hardest (the "JEE-level set").
 */
export type DifficultyBand = 'warmup' | 'standard' | 'challenge'

/** A question's calibrated difficulty, derived from pooled attempt data. */
export interface DifficultyInfo {
  /** 0..100 — higher = harder (it is 100 − the smoothed p-value) */
  difficulty: number
  /** pooled answered attempts behind the estimate (0 = prior only) */
  attempts: number
  /** false → prior-only estimate (exercise level or quiz baseline) */
  dataDriven: boolean
}

/** How a question is answered in a paper section. */
export type SectionType = 'mcq' | 'numeric'

/** One section of a generated paper (index ranges into the paper array). */
export interface PaperSection {
  label: string
  type: SectionType
  /** display name of the question type ("Numerical value", "TITA") */
  typeName: string
  /** inclusive start index into the paper array */
  from: number
  /** inclusive end index into the paper array */
  to: number
  count: number
  marks: number
  negative: number
}

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
  /** exams only: the requested difficulty band (default 'standard') */
  band?: DifficultyBand
  /** exams only: rounded mean difficulty of the paper's questions */
  difficultyMean?: number
  /** exams only: how many paper questions have real attempt data */
  difficultyData?: number
  /** exams only: section layout of the paper (multi-section presets) */
  sections?: PaperSection[]
}

/** A preset section as shown in cards and instruction screens. */
export interface PresetSectionView {
  label: string
  type: SectionType
  typeName: string
  questionCount: number
  marks: number
  negative: number
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
  /** single-section papers: the section's label (e.g. "Mathematics") */
  sectionLabel?: string
  /** every section of the paper with its own question type + marking */
  sections: PresetSectionView[]
  /** this exam provides an on-screen calculator in its real CBT (CAT) */
  calculator?: boolean
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
  /** numeric sections: the learner's typed answer (absent/empty = skipped) */
  value?: string
  /** free-response drills: learner's self-report after seeing the solution */
  selfWrong?: boolean
  selfRight?: boolean
  /** exams only: index into the preset's sections (marking per section) */
  section?: number
  /** honest client-side time spent on this question (seconds) */
  secs?: number
}

export interface SubmitRequest {
  kind: PracticeKind
  presetKey: string
  seed: number
  secs: number
  answers: AnswerOutcome[]
  /** exams only: the paper's difficulty band, echoed back for the results
   * header (display-only — scores are computed from the answers alone) */
  band?: DifficultyBand
}

export type QuestionOutcome =
  | 'correct'
  | 'wrong'
  | 'skipped'
  | 'self-wrong'
  | 'self-right'

export interface QuestionResult extends PracticeQuestion {
  chosen?: number
  outcome: QuestionOutcome
  /** numeric sections: the learner's typed answer, echoed for review */
  typed?: string
  /** calibrated difficulty 0..100 (server-side, pooled attempts) */
  difficulty?: number
  /** the difficulty band this question falls in */
  difficultyBand?: DifficultyBand
  /** pooled attempts behind the difficulty estimate */
  difficultyAttempts?: number
  /** client-reported seconds spent on this question (when tracked) */
  secs?: number
}

/** Per-section tally of a graded multi-section paper. */
export interface SectionScore {
  label: string
  count: number
  score: number
  maxScore: number
  correct: number
  wrong: number
  skipped: number
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
  /** difficulty-weighted accuracy over ANSWERED questions (harder
   * questions weigh more); null when nothing was answered */
  difficultyAccuracy?: number | null
  /** rounded mean difficulty of the submitted paper (server-computed) */
  paperDifficultyMean?: number
  /** the paper's difficulty band, echoed from the submit request */
  band?: DifficultyBand
  /** multi-section papers: per-section scores with their own marking */
  sectionScores?: SectionScore[]
  /** mean seconds per answered question (when the client tracked time) */
  avgSecsPerQuestion?: number | null
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
  /** difficulty-weighted readiness: chapters with harder question pools
   * weigh up to 2× (weight = 1 + mean chapter difficulty / 100) */
  difficultyReadiness?: number
  /** rounded mean difficulty of the in-scope question pool (0..100) */
  difficultyMix?: number
  /** in-scope questions that have real attempt data behind their rating */
  difficultyData?: number
  /** YOUR difficulty-weighted accuracy on attempted in-scope questions
   * (null when you have answered none of them yet) */
  weightedAccuracy?: number | null
}

export interface ReadinessResponse {
  library: {
    readiness: number
    coverage: number
    mastery: number
    freshness: number
    chaptersTotal: number
    chaptersTracked: number
    /** difficulty-weighted whole-library readiness */
    difficultyReadiness?: number
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
