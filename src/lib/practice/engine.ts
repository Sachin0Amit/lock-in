/**
 * Practice — the pure engine (isomorphic, no I/O).
 *
 * Deterministic paper generation (seeded RNG, chapter-balanced sampling
 * without replacement), honest exam marking with negative marks, and the
 * readiness arithmetic (coverage × mastery × freshness). Everything here
 * is unit-testable arithmetic — mirroring the srs.ts discipline — so every
 * number the UI shows can be traced to these functions.
 */

import type {
  AnswerOutcome,
  ChapterBreakdown,
  ChapterReadiness,
  DifficultyBand,
  DifficultyInfo,
  PracticeQuestion,
  QuestionOutcome,
  QuestionResult,
} from './types'

/* ------------------------------------------------------------------ */
/* Seeded RNG — deterministic papers                                   */
/* ------------------------------------------------------------------ */

/** mulberry32: small, fast, well-behaved 32-bit seeded RNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher–Yates with the injected RNG (pure — returns a new array). */
export function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/* ------------------------------------------------------------------ */
/* Difficulty calibration (data-derived, pure)                         */
/* ------------------------------------------------------------------ */

/** Pooled per-question outcomes feeding the difficulty p-value. */
export interface DifficultyStat {
  /** answered attempts (skips excluded — a skip is not evidence) */
  attempts: number
  correct: number
}

/** Bayesian pseudo-counts of the prior (shrinkage strength). */
const DIFFICULTY_SHRINKAGE = 3

/** Exercise-level ladder priors (L1..L6) — the honest starting guess. */
const LEVEL_PRIORS: Record<string, number> = {
  L1: 0.85,
  L2: 0.75,
  L3: 0.65,
  L4: 0.5,
  L5: 0.4,
  L6: 0.3,
}
/** Quiz MCQs carry no level ladder → mid-leaning-easy baseline. */
const QUIZ_PRIOR = 0.55

/** Prior correctness probability for a question (its level, or the quiz baseline). */
export function difficultyPrior(level?: string): number {
  if (level && LEVEL_PRIORS[level] !== undefined) return LEVEL_PRIORS[level]
  return QUIZ_PRIOR
}

/**
 * Difficulty of one question — the classic p-value difficulty inverted:
 * difficulty = 100 × (1 − p), where p is the observed correct-rate
 * smoothed toward the prior with pseudo-counts
 * (p = (correct + α·prior) / (attempts + α), α = 3). Zero attempts →
 * the prior exactly (dataDriven=false, honestly labelled in the UI).
 */
export function difficultyOf(stat: DifficultyStat | undefined, prior: number): DifficultyInfo {
  const attempts = Math.max(0, Math.floor(stat?.attempts ?? 0))
  const correct = Math.max(0, Math.floor(stat?.correct ?? 0))
  const p = (correct + DIFFICULTY_SHRINKAGE * prior) / (attempts + DIFFICULTY_SHRINKAGE)
  return {
    difficulty: Math.round((1 - p) * 100),
    attempts,
    dataDriven: attempts > 0,
  }
}

/** Band boundaries on the 0..100 difficulty scale. */
export const DIFFICULTY_BANDS: readonly {
  key: DifficultyBand
  label: string
  hint: string
  /** inclusive upper bound of the band on the difficulty scale */
  max: number
}[] = [
  { key: 'warmup', label: 'Warm-up', hint: 'easiest calibrated questions first', max: 35 },
  { key: 'standard', label: 'Standard', hint: 'balanced mix across the pool', max: 65 },
  { key: 'challenge', label: 'Exam-level', hint: 'hardest questions first — the exam-level set', max: 100 },
]

/** Which band a 0..100 difficulty score falls into. */
export function bandOfDifficulty(difficulty: number): DifficultyBand {
  if (difficulty <= 35) return 'warmup'
  if (difficulty <= 65) return 'standard'
  return 'challenge'
}

/**
 * Difficulty-weighted accuracy over ANSWERED items: each question weighs
 * max(1, its difficulty), so a hard question counts up to 100× an easy
 * one. Returns null when nothing was answered (never a fake 0).
 */
export function weightedAccuracyOf(
  items: readonly { difficulty: number; correct: boolean }[],
): number | null {
  if (items.length === 0) return null
  let weighted = 0
  let total = 0
  for (const it of items) {
    const w = Math.max(1, it.difficulty)
    total += w
    if (it.correct) weighted += w
  }
  return total > 0 ? Math.round((weighted / total) * 100) : null
}

/**
 * Difficulty-weighted mean chapter readiness: chapters whose question
 * pools are harder weigh more (weight = 1 + difficulty/100, i.e. up to 2×).
 * Plain components stay unweighted — only the headline is re-weighted.
 */
export function aggregateReadinessWeighted(
  chapters: readonly ChapterReadiness[],
  weightOf: (c: ChapterReadiness) => number,
): number {
  if (chapters.length === 0) return 0
  let sum = 0
  let total = 0
  for (const c of chapters) {
    const w = Math.max(1, weightOf(c))
    total += w
    sum += c.readiness * w
  }
  return total > 0 ? Math.round(sum / total) : 0
}

/* ------------------------------------------------------------------ */
/* Paper generation                                                    */
/* ------------------------------------------------------------------ */

export interface GeneratePaperOpts {
  questions: readonly PracticeQuestion[]
  count: number
  seed: number
  /** exams serve MCQs only; drills may mix in free-response exercises */
  mcqOnly: boolean
  /** difficulty band targeting (exams): each chapter contributes its
   * easiest (warmup) or hardest (challenge) questions first */
  difficulty?: {
    byId: ReadonlyMap<string, number>
    band: DifficultyBand
  }
}

/**
 * Chapter-balanced paper: questions are grouped by chapter, chapters are
 * shuffled (seeded), then picks are taken round-robin so no single
 * chapter dominates the paper; the final order is a seeded shuffle.
 * No question repeats — sampling is always without replacement.
 */
export function generatePaper(opts: GeneratePaperOpts): PracticeQuestion[] {
  const { questions, seed, mcqOnly, difficulty } = opts
  const count = Math.max(1, Math.min(opts.count, 200))
  const rng = mulberry32(seed)

  const pool = questions.filter((q) => (mcqOnly ? q.kind === 'mcq' : true))
  if (pool.length === 0) return []

  const byChapter = new Map<string, PracticeQuestion[]>()
  for (const q of pool) {
    const list = byChapter.get(q.chapterKey) ?? []
    list.push(q)
    byChapter.set(q.chapterKey, list)
  }

  /* per-chapter pools: band-targeted order (easiest / hardest first,
   * tie-broken by id so the order stays deterministic) or the seeded
   * shuffle for standard papers; then shuffle the chapter order */
  const difficultyOfQ = (q: PracticeQuestion) => difficulty?.byId.get(q.id) ?? 50
  const chapterPools: PracticeQuestion[][] = []
  for (const [, list] of byChapter) {
    if (difficulty && difficulty.band === 'warmup') {
      chapterPools.push(
        [...list].sort(
          (a, b) => difficultyOfQ(a) - difficultyOfQ(b) || a.id.localeCompare(b.id),
        ),
      )
    } else if (difficulty && difficulty.band === 'challenge') {
      chapterPools.push(
        [...list].sort(
          (a, b) => difficultyOfQ(b) - difficultyOfQ(a) || a.id.localeCompare(b.id),
        ),
      )
    } else {
      chapterPools.push(shuffled(list, rng))
    }
  }
  const ordered = shuffled(chapterPools, rng)

  const picked: PracticeQuestion[] = []
  let cursor = 0
  while (picked.length < count && picked.length < pool.length) {
    const poolIdx = cursor % ordered.length
    const next = ordered[poolIdx].shift()
    if (next) picked.push(next)
    /* drop exhausted chapter pools */
    if (ordered[poolIdx].length === 0) ordered.splice(poolIdx, 1)
    else cursor = (cursor + 1) % ordered.length
    if (ordered.length === 0) break
  }

  return shuffled(picked, rng).slice(0, count)
}

/* ------------------------------------------------------------------ */
/* Marking                                                             */
/* ------------------------------------------------------------------ */

export interface MarkedOutcome {
  question: PracticeQuestion
  outcome: QuestionOutcome
  chosen?: number
}

export function gradeAnswer(q: PracticeQuestion, a: AnswerOutcome | undefined): MarkedOutcome {
  if (!a) return { question: q, outcome: 'skipped' }
  if (q.kind === 'mcq') {
    if (a.chosen === undefined) return { question: q, outcome: 'skipped' }
    return {
      question: q,
      outcome: a.chosen === q.answerIndex ? 'correct' : 'wrong',
      chosen: a.chosen,
    }
  }
  if (a.selfRight) return { question: q, outcome: 'self-right' }
  if (a.selfWrong) return { question: q, outcome: 'self-wrong' }
  return { question: q, outcome: 'skipped' }
}

export interface ScoredPaper {
  results: QuestionResult[]
  score: number
  maxScore: number
  correctCount: number
  wrongCount: number
  skippedCount: number
}

/**
 * Mark a finished paper: +marks per correct, −|negative| per wrong,
 * 0 for skipped and for honest free-response self-marks (self-right
 * counts toward correctCount but scores 0 — we never grade prose).
 */
export function scorePaper(
  questions: readonly PracticeQuestion[],
  answers: readonly AnswerOutcome[],
  marking: { marks: number; negative: number },
): ScoredPaper {
  const byId = new Map(answers.map((a) => [a.questionId, a]))
  const results: QuestionResult[] = []
  let score = 0
  let maxScore = 0
  let correctCount = 0
  let wrongCount = 0
  let skippedCount = 0

  for (const q of questions) {
    const marked = gradeAnswer(q, byId.get(q.id))
    const { outcome } = marked
    if (outcome === 'correct' || outcome === 'self-right') {
      correctCount++
      if (outcome === 'correct') {
        score += marking.marks
        maxScore += marking.marks
      }
    } else if (outcome === 'wrong' || outcome === 'self-wrong') {
      wrongCount++
      if (outcome === 'wrong') {
        score -= marking.negative
        maxScore += marking.marks
      }
    } else {
      skippedCount++
      maxScore += marking.marks
    }
    results.push({ ...q, outcome, chosen: marked.chosen })
  }

  return { results, score, maxScore, wrongCount, correctCount, skippedCount }
}

/** Per-chapter accuracy breakdown, weakest chapters first. */
export function chapterBreakdown(results: readonly QuestionResult[]): ChapterBreakdown[] {
  const map = new Map<string, ChapterBreakdown>()
  for (const r of results) {
    const b =
      map.get(r.chapterKey) ??
      {
        chapterKey: r.chapterKey,
        bookId: r.bookId,
        bookTitle: r.bookTitle,
        chapterNumber: r.chapterNumber,
        chapterTitle: r.chapterTitle,
        total: 0,
        correct: 0,
        wrong: 0,
        accuracy: 0,
      }
    b.total++
    if (r.outcome === 'correct' || r.outcome === 'self-right') b.correct++
    else if (r.outcome === 'wrong' || r.outcome === 'self-wrong') b.wrong++
    map.set(r.chapterKey, b)
  }
  const out = [...map.values()]
  for (const b of out) {
    const answered = b.correct + b.wrong
    b.accuracy = answered > 0 ? Math.round((b.correct / answered) * 100) : 0
  }
  return out.sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
}

/* ------------------------------------------------------------------ */
/* Readiness                                                           */
/* ------------------------------------------------------------------ */

export interface ChapterInput {
  key: string
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
  lessonsTotal: number
}

export interface TrackedInput {
  /** composite mastery 0..100 of the chapter (or one lesson) */
  mastery: number
  /** forgetting risk 0..100 */
  risk: number
}

/**
 * Chapter readiness = coverage × mastery × freshness:
 *   coverage   = lessons in the ledger / lessons written
 *                (a chapter-level mark covers the whole chapter)
 *   mastery    = mean tracked mastery (0 when untracked)
 *   freshness  = 100 − forgetting risk
 * Unstudied → 0 — the number can never reward unread chapters.
 */
export function computeChapterReadiness(
  chapter: ChapterInput,
  chapterEntry: TrackedInput | null,
  lessonEntries: readonly TrackedInput[],
): ChapterReadiness {
  const lessonsStudied = chapterEntry ? chapter.lessonsTotal : lessonEntries.length
  const coverage = chapter.lessonsTotal > 0 ? lessonsStudied / chapter.lessonsTotal : 0
  const tracked = [...(chapterEntry ? [chapterEntry] : []), ...lessonEntries]
  const mastery = tracked.length
    ? tracked.reduce((n, t) => n + t.mastery, 0) / tracked.length
    : 0
  const freshness = tracked.length
    ? tracked.reduce((n, t) => n + (100 - t.risk), 0) / tracked.length
    : 0
  const readiness = coverage * (mastery / 100) * (freshness / 100)
  return {
    key: chapter.key,
    bookId: chapter.bookId,
    bookTitle: chapter.bookTitle,
    chapterNumber: chapter.chapterNumber,
    chapterTitle: chapter.chapterTitle,
    lessonsTotal: chapter.lessonsTotal,
    lessonsStudied,
    coverage: Math.round(coverage * 100),
    mastery: Math.round(mastery),
    freshness: Math.round(freshness),
    readiness: Math.round(readiness * 100),
    tracked: tracked.length > 0,
  }
}

/** Mean-of-chapters aggregation (unstudied chapters count as 0). */
export function aggregateReadiness(chapters: readonly ChapterReadiness[]): {
  readiness: number
  coverage: number
  mastery: number
  freshness: number
  chaptersTracked: number
  chaptersTotal: number
} {
  const n = chapters.length
  if (n === 0) {
    return { readiness: 0, coverage: 0, mastery: 0, freshness: 0, chaptersTracked: 0, chaptersTotal: 0 }
  }
  const mean = (pick: (c: ChapterReadiness) => number) =>
    Math.round(chapters.reduce((s, c) => s + pick(c), 0) / n)
  return {
    readiness: mean((c) => c.readiness),
    coverage: mean((c) => c.coverage),
    mastery: mean((c) => c.mastery),
    freshness: mean((c) => c.freshness),
    chaptersTracked: chapters.filter((c) => c.tracked).length,
    chaptersTotal: n,
  }
}
