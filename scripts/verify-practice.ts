/**
 * Practice — engine + service verification suite.
 *
 * Section A verifies the pure practice engine (engine.ts) against
 * hand-computed expectations: seeded RNG determinism, chapter-balanced
 * paper generation without replacement, honest marking with negative
 * marks (self-marks never score), per-chapter breakdown ordering and the
 * readiness arithmetic (coverage × mastery × freshness, unstudied = 0).
 *
 * Section B verifies the practice services against the LIVE catalog and
 * database (throwaway users, cleaned up after): preset scope resolution,
 * deterministic exam + drill papers, server-side submit grading, the
 * Mistake Bank lifecycle (record → re-open → review ladder → retirement
 * via two consecutive good reviews or a correct retake → manual resolve),
 * per-user isolation, attempt history and the readiness read model.
 *
 * Run: bun run scripts/verify-practice.ts   (dev server NOT required)
 */
import { db } from '../src/lib/db'
import { CATALOG } from '../src/lib/builder/catalog'
import {
  aggregateReadiness,
  aggregateReadinessWeighted,
  bandOfDifficulty,
  chapterBreakdown,
  computeChapterReadiness,
  DIFFICULTY_BANDS,
  difficultyOf,
  difficultyPrior,
  generatePaper,
  gradeAnswer,
  mulberry32,
  numericAnswerOf,
  numericMatches,
  parseNumericInput,
  scorePaper,
  shuffled,
  weightedAccuracyOf,
} from '../src/lib/practice/engine'
import {
  BadInput,
  buildDrillPaper,
  buildExamPaper,
  clearDifficultyCache,
  getReadiness,
  listAttempts,
  pooledDifficultyStats,
  submitAttempt,
} from '../src/lib/practice/practice-service'
import {
  BadInput as MistakeBadInput,
  listMistakes,
  recordMistake,
  reviewMistake,
  setMistakeResolved,
} from '../src/lib/practice/mistake-service'
import { allPracticeQuestions, findPracticeQuestion, questionsInScope } from '../src/lib/practice/questions'
import { EXAM_PRESETS, findExamPreset, presetMarking, presetQuestionCount } from '../src/data/exams/presets'
import type { PracticeQuestion } from '../src/lib/practice/types'

let pass = 0
let fail = 0
const failures: string[] = []
function check(name: string, condition: boolean, detail?: unknown): void {
  if (condition) {
    pass++
  } else {
    fail++
    failures.push(detail !== undefined ? `${name} — ${JSON.stringify(detail)?.slice(0, 300)}` : name)
  }
}

/* ================================================================== */
/* Section A — the pure engine                                         */
/* ================================================================== */

/* A1. mulberry32: deterministic, distinct across seeds, in [0,1) */
{
  const r1 = mulberry32(42)
  const r2 = mulberry32(42)
  const r3 = mulberry32(43)
  const s1 = [r1(), r1(), r1(), r1()]
  const s2 = [r2(), r2(), r2(), r2()]
  const s3 = [r3(), r3(), r3(), r3()]
  check('A1a: same seed → identical sequence', JSON.stringify(s1) === JSON.stringify(s2), { s1, s2 })
  check('A1b: different seed → different sequence', JSON.stringify(s1) !== JSON.stringify(s3))
  check('A1c: all draws in [0,1)', [...s1, ...s3].every((v) => v >= 0 && v < 1))
}

/* A2. shuffled: pure, permutation-preserving */
{
  const rng = mulberry32(7)
  const src = [1, 2, 3, 4, 5, 6, 7, 8]
  const out = shuffled(src, rng)
  check('A2a: shuffled returns a permutation', out.slice().sort().join() === src.join())
  check('A2b: shuffled does not mutate the input', src.join() === [1, 2, 3, 4, 5, 6, 7, 8].join())
  const again = shuffled(src, mulberry32(7))
  check('A2c: same seed → same shuffle', out.join() === again.join())
}

/* A3. generatePaper: determinism, count, no repeats, mcqOnly, balance */
{
  const pool = allPracticeQuestions()
  check('A3a: library question pool is non-empty', pool.length > 300, pool.length)
  const mcqs = pool.filter((q) => q.kind === 'mcq')
  const frees = pool.filter((q) => q.kind === 'free')
  check('A3b: pool has both mcq and free questions', mcqs.length > 100 && frees.length > 100, {
    mcq: mcqs.length,
    free: frees.length,
  })

  const p1 = generatePaper({ questions: pool, count: 20, seed: 99, mcqOnly: true })
  const p2 = generatePaper({ questions: pool, count: 20, seed: 99, mcqOnly: true })
  check('A3c: same seed → identical paper', JSON.stringify(p1.map((q) => q.id)) === JSON.stringify(p2.map((q) => q.id)))
  check('A3d: paper honours the count', p1.length === 20, p1.length)
  check('A3e: no question repeats', new Set(p1.map((q) => q.id)).size === p1.length)
  check('A3f: mcqOnly serves only mcq', p1.every((q) => q.kind === 'mcq'))

  const p3 = generatePaper({ questions: pool, count: 20, seed: 99, mcqOnly: false })
  check('A3g: drills may mix free-response items', p3.some((q) => q.kind === 'free'))

  const p4 = generatePaper({ questions: pool, count: 5, seed: 123, mcqOnly: false })
  check('A3h: count larger than clamped request still generates', p4.length === 5)

  /* chapter balance: with a 20-question paper over many chapters, no
   * single chapter may hold more than half the paper */
  const byChapter = new Map<string, number>()
  for (const q of p1) byChapter.set(q.chapterKey, (byChapter.get(q.chapterKey) ?? 0) + 1)
  const maxShare = Math.max(...byChapter.values())
  check('A3i: papers are chapter-balanced (max share ≤ half)', maxShare <= Math.ceil(20 / 2), { maxShare })
  check(
    'A3j: papers span multiple chapters',
    byChapter.size >= Math.min(5, new Set(pool.map((q) => q.chapterKey)).size),
    byChapter.size,
  )

  check('A3k: empty pool yields an empty paper', generatePaper({ questions: [], count: 10, seed: 1, mcqOnly: true }).length === 0)
  const emptyMcq = generatePaper({ questions: frees, count: 10, seed: 1, mcqOnly: true })
  check('A3l: mcqOnly over a free-only pool yields empty', emptyMcq.length === 0)
}

/* A4. gradeAnswer: mcq correct/wrong/skip; free self-marks */
{
  const mcq = findPracticeQuestion(allPracticeQuestions().find((q) => q.kind === 'mcq')!.id)!
  check(
    'A4a: correct chosen index grades correct',
    gradeAnswer(mcq, { questionId: mcq.id, chosen: mcq.answerIndex! }).outcome === 'correct',
  )
  check(
    'A4b: wrong chosen index grades wrong',
    gradeAnswer(mcq, { questionId: mcq.id, chosen: (mcq.answerIndex! + 1) % mcq.options!.length }).outcome === 'wrong',
  )
  check('A4c: absent answer grades skipped', gradeAnswer(mcq, undefined).outcome === 'skipped')
  check(
    'A4d: chosen undefined grades skipped',
    gradeAnswer(mcq, { questionId: mcq.id }).outcome === 'skipped',
  )
  const free = allPracticeQuestions().find((q) => q.kind === 'free')!
  check('A4e: selfRight grades self-right', gradeAnswer(free, { questionId: free.id, selfRight: true }).outcome === 'self-right')
  check('A4f: selfWrong grades self-wrong', gradeAnswer(free, { questionId: free.id, selfWrong: true }).outcome === 'self-wrong')
  check('A4g: unmarked free grades skipped', gradeAnswer(free, { questionId: free.id }).outcome === 'skipped')
}

/* A5. scorePaper: honest marking arithmetic */
{
  const mcqPool = allPracticeQuestions().filter((q) => q.kind === 'mcq').slice(0, 4)
  const qs = mcqPool
  const answers = [
    { questionId: qs[0].id, chosen: qs[0].answerIndex! }, // correct
    { questionId: qs[1].id, chosen: (qs[1].answerIndex! + 1) % qs[1].options!.length }, // wrong
    { questionId: qs[2].id }, // skipped
    // qs[3] not answered at all
  ]
  const marked = scorePaper(qs, answers, { marks: 4, negative: 1 })
  check('A5a: score = correct − negative (4 − 1)', marked.score === 3, marked.score)
  check('A5b: maxScore counts every mcq (16)', marked.maxScore === 16, marked.maxScore)
  check('A5c: correct/wrong/skipped counted', marked.correctCount === 1 && marked.wrongCount === 1 && marked.skippedCount === 2)
  check(
    'A5d: per-question outcomes preserved on results',
    marked.results.length === 4 &&
      marked.results[0].outcome === 'correct' &&
      marked.results[1].outcome === 'wrong' &&
      marked.results[2].outcome === 'skipped' &&
      marked.results[3].outcome === 'skipped',
  )

  /* self-marks never score */
  const free = allPracticeQuestions().find((q) => q.kind === 'free')!
  const selfMarked = scorePaper([free], [{ questionId: free.id, selfRight: true }], { marks: 4, negative: 1 })
  check('A5e: self-right counts correct but scores 0', selfMarked.correctCount === 1 && selfMarked.score === 0 && selfMarked.maxScore === 0)
  const selfWrong = scorePaper([free], [{ questionId: free.id, selfWrong: true }], { marks: 4, negative: 1 })
  check('A5f: self-wrong counts wrong, never negative', selfWrong.wrongCount === 1 && selfWrong.score === 0 && selfWrong.maxScore === 0)

  const zeroNegative = scorePaper(qs, answers, { marks: 1, negative: 0 })
  check('A5g: zero negative marking honoured', zeroNegative.score === 1, zeroNegative.score)
}

/* A6. chapterBreakdown: accuracy + weakest-first ordering */
{
  const qs = allPracticeQuestions().filter((q) => q.kind === 'mcq')
  const paper = generatePaper({ questions: qs, count: 12, seed: 5, mcqOnly: true })
  const answers = paper.map((q, i) => ({
    questionId: q.id,
    chosen: i < 3 ? (q.answerIndex! + 1) % q.options!.length : q.answerIndex!, // first 3 wrong
  }))
  const marked = scorePaper(paper, answers, { marks: 1, negative: 0 })
  const breakdown = chapterBreakdown(marked.results)
  check('A6a: breakdown totals match the paper', breakdown.reduce((n, b) => n + b.total, 0) === paper.length)
  check(
    'A6b: per-chapter tallies add up',
    breakdown.every((b) => b.correct + b.wrong === b.total),
  )
  check(
    'A6c: accuracy is 0..100 and weakest chapter sorts first',
    breakdown.every((b) => b.accuracy >= 0 && b.accuracy <= 100) &&
      breakdown[0].accuracy <= breakdown[breakdown.length - 1].accuracy,
  )
  const withWrong = breakdown.filter((b) => b.wrong > 0)
  check('A6d: wrong answers land in their chapters', withWrong.length > 0 && withWrong.every((b) => b.accuracy < 100))
}

/* A7. computeChapterReadiness: coverage × mastery × freshness */
{
  const chapter = {
    key: 'test-book:1',
    bookId: 'test-book',
    bookTitle: 'Test Book',
    chapterNumber: 1,
    chapterTitle: 'Test',
    lessonsTotal: 4,
  }
  /* unstudied → all zeros */
  const none = computeChapterReadiness(chapter, null, [])
  check('A7a: unstudied chapter readiness is 0', none.readiness === 0 && none.coverage === 0 && none.tracked === false)

  /* chapter-level mark covers the whole chapter */
  const marked = computeChapterReadiness(chapter, { mastery: 80, risk: 20 }, [])
  check('A7b: chapter mark → full coverage', marked.coverage === 100 && marked.lessonsStudied === 4)
  check(
    'A7c: readiness = coverage × mastery × freshness',
    marked.readiness === 64 /* 1.0 × 0.8 × 0.8 */,
    marked.readiness,
  )
  check('A7d: freshness = 100 − risk', marked.freshness === 80)

  /* two of four lessons tracked → half coverage, mean mastery/risk */
  const partial = computeChapterReadiness(
    chapter,
    null,
    [
      { mastery: 60, risk: 40 },
      { mastery: 100, risk: 0 },
    ],
  )
  check('A7e: partial coverage halves', partial.coverage === 50)
  check('A7f: mastery is the mean of tracked entries', partial.mastery === 80, partial.mastery)
  check(
    'A7g: partial readiness = 0.5 × 0.8 × 0.8 = 32',
    partial.readiness === 32,
    partial.readiness,
  )
  check('A7h: tracked flag set when any entry exists', partial.tracked === true)
}

/* A8. aggregateReadiness: mean-of-chapters, zeros included */
{
  const mk = (readiness: number, tracked: boolean) => ({
    key: `k${readiness}`,
    bookId: 'b',
    bookTitle: 'B',
    chapterNumber: 1,
    chapterTitle: 'T',
    lessonsTotal: 1,
    lessonsStudied: tracked ? 1 : 0,
    coverage: readiness,
    mastery: readiness,
    freshness: readiness,
    readiness,
    tracked,
  })
  const agg = aggregateReadiness([mk(50, true), mk(0, false), mk(100, true)])
  check('A8a: aggregate is the mean including zeros', agg.readiness === 50, agg.readiness)
  check('A8b: tracked/total counted', agg.chaptersTracked === 2 && agg.chaptersTotal === 3)
  const empty = aggregateReadiness([])
  check('A8c: empty aggregate is zero, not NaN', empty.readiness === 0 && empty.chaptersTotal === 0)
}

/* A9. difficulty calibration: priors, shrinkage math, bands, weighting */
{
  /* the level-ladder priors */
  check(
    'A9a: level priors ladder L1..L6 + quiz baseline',
    difficultyPrior('L1') === 0.85 &&
      difficultyPrior('L2') === 0.75 &&
      difficultyPrior('L3') === 0.65 &&
      difficultyPrior('L4') === 0.5 &&
      difficultyPrior('L5') === 0.4 &&
      difficultyPrior('L6') === 0.3 &&
      difficultyPrior() === 0.55 &&
      difficultyPrior('weird') === 0.55,
  )

  /* shrinkage arithmetic (α = 3 pseudo-counts) */
  const noData = difficultyOf(undefined, 0.55)
  check(
    'A9b: zero attempts → the prior exactly (45/100, not data-driven)',
    noData.difficulty === 45 && noData.attempts === 0 && noData.dataDriven === false,
    noData,
  )
  const allRight = difficultyOf({ attempts: 7, correct: 7 }, 0.55)
  check(
    'A9c: 7/7 correct → p = (7+1.65)/10 → difficulty 14',
    allRight.difficulty === 14 && allRight.dataDriven === true,
    allRight,
  )
  const allWrong = difficultyOf({ attempts: 9, correct: 0 }, 0.5)
  check('A9d: 0/9 correct → p = 1.5/12 → difficulty 88', allWrong.difficulty === 88, allWrong)
  const half = difficultyOf({ attempts: 100, correct: 50 }, 0.5)
  check('A9e: 50% with a 0.5 prior → exactly 50', half.difficulty === 50, half)

  /* band boundaries */
  check(
    'A9f: band boundaries (≤35 warmup, ≤65 standard, else challenge)',
    bandOfDifficulty(0) === 'warmup' &&
      bandOfDifficulty(35) === 'warmup' &&
      bandOfDifficulty(36) === 'standard' &&
      bandOfDifficulty(65) === 'standard' &&
      bandOfDifficulty(66) === 'challenge' &&
      bandOfDifficulty(100) === 'challenge',
  )
  check(
    'A9g: three bands with labels, hints and ascending bounds',
    DIFFICULTY_BANDS.length === 3 &&
      DIFFICULTY_BANDS[0].key === 'warmup' &&
      DIFFICULTY_BANDS[2].key === 'challenge' &&
      DIFFICULTY_BANDS[0].max < DIFFICULTY_BANDS[1].max &&
      DIFFICULTY_BANDS[1].max < DIFFICULTY_BANDS[2].max &&
      DIFFICULTY_BANDS.every((b) => b.label.length > 0 && b.hint.length > 0),
  )

  /* difficulty-weighted accuracy */
  check(
    'A9h: weighted accuracy weights by difficulty (80 correct vs 20 wrong → 80)',
    weightedAccuracyOf([
      { difficulty: 80, correct: true },
      { difficulty: 20, correct: false },
    ]) === 80,
  )
  check('A9i: no answered items → null, never a fake 0', weightedAccuracyOf([]) === null)
  check(
    'A9j: zero difficulty floors at weight 1 (1/101 → 99)',
    weightedAccuracyOf([
      { difficulty: 0, correct: false },
      { difficulty: 100, correct: true },
    ]) === 99,
  )

  /* difficulty-weighted readiness aggregation */
  const mkReady = (readiness: number) => ({
    key: `k${readiness}`,
    bookId: 'b',
    bookTitle: 'B',
    chapterNumber: 1,
    chapterTitle: 'T',
    lessonsTotal: 1,
    lessonsStudied: 1,
    coverage: readiness,
    mastery: readiness,
    freshness: readiness,
    readiness,
    tracked: true,
  })
  const weighted = aggregateReadinessWeighted(
    [mkReady(50), mkReady(100)],
    (c) => (c.readiness === 50 ? 1 : 2),
  )
  check('A9k: weighted mean (50·1 + 100·2)/3 → 83', weighted === 83, weighted)
  check(
    'A9l: non-positive weights clamp to 1 (mean 40)',
    aggregateReadinessWeighted([mkReady(40), mkReady(40)], () => 0) === 40,
  )
  check('A9m: empty weighted aggregate is 0', aggregateReadinessWeighted([], () => 5) === 0)

  /* band targeting inside generatePaper */
  const bandPool = allPracticeQuestions().filter((q) => q.kind === 'mcq').slice(0, 60)
  const bandById = new Map(bandPool.map((q, i) => [q.id, (i * 37) % 100]))
  const wPaper = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'warmup' },
  })
  const cPaper = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'challenge' },
  })
  const wAgain = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'warmup' },
  })
  const meanOf = (p: typeof wPaper) =>
    p.reduce((n, q) => n + (bandById.get(q.id) ?? 50), 0) / p.length
  check(
    'A9n: band targeting is deterministic (same seed + map → same paper)',
    JSON.stringify(wPaper.map((q) => q.id)) === JSON.stringify(wAgain.map((q) => q.id)),
  )
  check(
    'A9o: warm-up paper draws easier questions than the challenge set',
    meanOf(wPaper) < meanOf(cPaper),
    { warm: meanOf(wPaper), challenge: meanOf(cPaper) },
  )
  check(
    'A9p: band-targeted papers keep count + no duplicates',
    wPaper.length === 12 &&
      cPaper.length === 12 &&
      new Set(wPaper.map((q) => q.id)).size === 12 &&
      new Set(cPaper.map((q) => q.id)).size === 12,
  )
}

/* A9. difficulty calibration: priors, shrinkage math, bands, weighting */
{
  /* the level-ladder priors */
  check(
    'A9a: level priors ladder L1..L6 + quiz baseline',
    difficultyPrior('L1') === 0.85 &&
      difficultyPrior('L2') === 0.75 &&
      difficultyPrior('L3') === 0.65 &&
      difficultyPrior('L4') === 0.5 &&
      difficultyPrior('L5') === 0.4 &&
      difficultyPrior('L6') === 0.3 &&
      difficultyPrior() === 0.55 &&
      difficultyPrior('weird') === 0.55,
  )

  /* shrinkage arithmetic (α = 3 pseudo-counts) */
  const noData = difficultyOf(undefined, 0.55)
  check(
    'A9b: zero attempts → the prior exactly (45/100, not data-driven)',
    noData.difficulty === 45 && noData.attempts === 0 && noData.dataDriven === false,
    noData,
  )
  const allRight = difficultyOf({ attempts: 7, correct: 7 }, 0.55)
  check(
    'A9c: 7/7 correct → p = (7+1.65)/10 → difficulty 14',
    allRight.difficulty === 14 && allRight.dataDriven === true,
    allRight,
  )
  const allWrong = difficultyOf({ attempts: 9, correct: 0 }, 0.5)
  check('A9d: 0/9 correct → p = 1.5/12 → difficulty 88', allWrong.difficulty === 88, allWrong)
  const half = difficultyOf({ attempts: 100, correct: 50 }, 0.5)
  check('A9e: 50% with a 0.5 prior → exactly 50', half.difficulty === 50, half)

  /* band boundaries */
  check(
    'A9f: band boundaries (≤35 warmup, ≤65 standard, else challenge)',
    bandOfDifficulty(0) === 'warmup' &&
      bandOfDifficulty(35) === 'warmup' &&
      bandOfDifficulty(36) === 'standard' &&
      bandOfDifficulty(65) === 'standard' &&
      bandOfDifficulty(66) === 'challenge' &&
      bandOfDifficulty(100) === 'challenge',
  )
  check(
    'A9g: three bands with labels, hints and ascending bounds',
    DIFFICULTY_BANDS.length === 3 &&
      DIFFICULTY_BANDS[0].key === 'warmup' &&
      DIFFICULTY_BANDS[2].key === 'challenge' &&
      DIFFICULTY_BANDS[0].max < DIFFICULTY_BANDS[1].max &&
      DIFFICULTY_BANDS[1].max < DIFFICULTY_BANDS[2].max &&
      DIFFICULTY_BANDS.every((b) => b.label.length > 0 && b.hint.length > 0),
  )

  /* difficulty-weighted accuracy */
  check(
    'A9h: weighted accuracy weights by difficulty (80 correct vs 20 wrong → 80)',
    weightedAccuracyOf([
      { difficulty: 80, correct: true },
      { difficulty: 20, correct: false },
    ]) === 80,
  )
  check('A9i: no answered items → null, never a fake 0', weightedAccuracyOf([]) === null)
  check(
    'A9j: zero difficulty floors at weight 1 (1/101 → 99)',
    weightedAccuracyOf([
      { difficulty: 0, correct: false },
      { difficulty: 100, correct: true },
    ]) === 99,
  )

  /* difficulty-weighted readiness aggregation */
  const mkReady = (readiness: number) => ({
    key: `k${readiness}`,
    bookId: 'b',
    bookTitle: 'B',
    chapterNumber: 1,
    chapterTitle: 'T',
    lessonsTotal: 1,
    lessonsStudied: 1,
    coverage: readiness,
    mastery: readiness,
    freshness: readiness,
    readiness,
    tracked: true,
  })
  const weighted = aggregateReadinessWeighted(
    [mkReady(50), mkReady(100)],
    (c) => (c.readiness === 50 ? 1 : 2),
  )
  check('A9k: weighted mean (50·1 + 100·2)/3 → 83', weighted === 83, weighted)
  check(
    'A9l: non-positive weights clamp to 1 (mean 40)',
    aggregateReadinessWeighted([mkReady(40), mkReady(40)], () => 0) === 40,
  )
  check('A9m: empty weighted aggregate is 0', aggregateReadinessWeighted([], () => 5) === 0)

  /* band targeting inside generatePaper */
  const bandPool = allPracticeQuestions().filter((q) => q.kind === 'mcq').slice(0, 60)
  const bandById = new Map(bandPool.map((q, i) => [q.id, (i * 37) % 100]))
  const wPaper = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'warmup' },
  })
  const cPaper = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'challenge' },
  })
  const wAgain = generatePaper({
    questions: bandPool,
    count: 12,
    seed: 11,
    mcqOnly: true,
    difficulty: { byId: bandById, band: 'warmup' },
  })
  const meanOf = (p: typeof wPaper) =>
    p.reduce((n, q) => n + (bandById.get(q.id) ?? 50), 0) / p.length
  check(
    'A9n: band targeting is deterministic (same seed + map → same paper)',
    JSON.stringify(wPaper.map((q) => q.id)) === JSON.stringify(wAgain.map((q) => q.id)),
  )
  check(
    'A9o: warm-up paper draws easier questions than the challenge set',
    meanOf(wPaper) < meanOf(cPaper),
    { warm: meanOf(wPaper), challenge: meanOf(cPaper) },
  )
  check(
    'A9p: band-targeted papers keep count + no duplicates',
    wPaper.length === 12 &&
      cPaper.length === 12 &&
      new Set(wPaper.map((q) => q.id)).size === 12 &&
      new Set(cPaper.map((q) => q.id)).size === 12,
  )
}

/* A10. numeric answers: parsing, extraction, type-in grading, sections */
{
  /* parseNumericInput — the learner's typed value */
  check('A10a: parseNumericInput accepts decimals', parseNumericInput('42') === 42 && parseNumericInput('-2.5') === -2.5 && parseNumericInput(' 0.75 ') === 0.75)
  check('A10b: parseNumericInput accepts thousands commas', parseNumericInput('1,250') === 1250)
  check('A10c: parseNumericInput accepts simple fractions', parseNumericInput('3/4') === 0.75 && parseNumericInput('3 / 4') === 0.75 && parseNumericInput('-7/8') === -0.875)
  check('A10d: parseNumericInput rejects junk', parseNumericInput('') === null && parseNumericInput('abc') === null && parseNumericInput('12 km') === null && parseNumericInput('2 1/2') === null && parseNumericInput(undefined) === null)

  /* numericAnswerOf — the question's single numeric value */
  check('A10e: numericAnswerOf extracts wrapped values', numericAnswerOf('$42$') === 42 && numericAnswerOf('12 km') === 12 && numericAnswerOf('18 girls') === 18 && numericAnswerOf('60%') === 60)
  check('A10f: numericAnswerOf extracts prose-wrapped answers', numericAnswerOf('Answer: $51$ — the deficiency twin of the $+r$ pattern.') === 51 && numericAnswerOf('Answer: $1{,}152$ — the structure theorem') === 1152 && numericAnswerOf('48,000') === 48000)
  check('A10g: numericAnswerOf reduces whole-string fractions', numericAnswerOf('9/20') === 0.45)
  check('A10h: numericAnswerOf refuses multi-number prose', numericAnswerOf('2 h 30 min') === null && numericAnswerOf('96/144 = 2/3') === null && numericAnswerOf('(a) 3/4; (b) 3/4; (c) 7/9') === null && numericAnswerOf('') === null && numericAnswerOf(undefined) === null)

  /* numericMatches — 1e-6 relative tolerance */
  check('A10i: numericMatches is exact-to-6-decimals', numericMatches(0.75, 0.75) && numericMatches(0.7500001, 0.75) && numericMatches(1250, 1250) && !numericMatches(0.7501, 0.75) && !numericMatches(-0.75, 0.75))

  /* the pool really has numeric-answer questions to draw from */
  const numericPool = allPracticeQuestions().filter((q) => q.kind === 'free' && numericAnswerOf(q.answerText) !== null)
  check('A10j: the pool has a real numeric-question supply', numericPool.length >= 100, numericPool.length)

  /* generatePaper numericOnly */
  const nPaper = generatePaper({ questions: allPracticeQuestions(), count: 5, seed: 55, mcqOnly: false, numericOnly: true })
  const nPaper2 = generatePaper({ questions: allPracticeQuestions(), count: 5, seed: 55, mcqOnly: false, numericOnly: true })
  check(
    'A10k: numericOnly serves only numeric-answer free questions',
    nPaper.length === 5 && nPaper.every((q) => q.kind === 'free' && numericAnswerOf(q.answerText) !== null),
    nPaper.map((q) => q.id),
  )
  check('A10l: numericOnly is deterministic', JSON.stringify(nPaper.map((q) => q.id)) === JSON.stringify(nPaper2.map((q) => q.id)))

  /* gradeAnswer on numeric questions */
  const nq = numericPool[0]
  const ev = numericAnswerOf(nq.answerText)!
  check('A10m: typing the exact value grades correct', gradeAnswer(nq, { questionId: nq.id, value: String(ev) }).outcome === 'correct')
  check('A10n: typing a different value grades wrong', gradeAnswer(nq, { questionId: nq.id, value: String(ev + 7) }).outcome === 'wrong')
  check('A10o: no typed value grades skipped (self-marks preserved)', gradeAnswer(nq, { questionId: nq.id }).outcome === 'skipped' && gradeAnswer(nq, { questionId: nq.id, selfRight: true }).outcome === 'self-right')
  check('A10p: whitespace-only value grades skipped', gradeAnswer(nq, { questionId: nq.id, value: '   ' }).outcome === 'skipped')
  check('A10q: unparseable value grades wrong (server robustness)', gradeAnswer(nq, { questionId: nq.id, value: 'junk!' }).outcome === 'wrong')
  const fracQ = numericPool.find((q) => /^-?\d+\s*\/\s*-?\d+$/.test((q.answerText ?? '').replace(/\$/g, '').trim()))
  check(
    'A10r: a fraction answer grades correct typed as its decimal',
    fracQ !== undefined && gradeAnswer(fracQ, { questionId: fracQ.id, value: String(numericAnswerOf(fracQ.answerText)!) }).outcome === 'correct',
  )

  /* scorePaper with per-section marking — hand-computed */
  const mcqs = allPracticeQuestions().filter((q) => q.kind === 'mcq')
  const m1 = mcqs[0]
  const m2 = mcqs[1]
  const marking = {
    bySection: [
      { marks: 4, negative: 1, from: 0, to: 1 },
      { marks: 3, negative: 0, from: 2, to: 2 },
    ],
  }
  const secAnswers = [
    { questionId: m1.id, chosen: m1.answerIndex, section: 0, secs: 12 },
    { questionId: m2.id, chosen: (m2.answerIndex! + 1) % m2.options!.length, section: 0, secs: 20 },
    { questionId: nq.id, value: String(ev), section: 1, secs: 33 },
  ]
  const scored = scorePaper([m1, m2, nq], secAnswers, marking)
  check(
    'A10s: per-section marking arithmetic (4−1+3 = 6 of 11)',
    Math.abs(scored.score - 6) < 1e-9 && scored.maxScore === 11 && scored.correctCount === 2 && scored.wrongCount === 1,
    { score: scored.score, max: scored.maxScore },
  )
  check(
    'A10t: section tallies carry per-section scores',
    scored.sectionTallies?.[0].score === 3 && scored.sectionTallies?.[0].maxScore === 8 && scored.sectionTallies?.[1].score === 3 && scored.sectionTallies?.[1].maxScore === 3,
    scored.sectionTallies,
  )
  const skippedTail = scorePaper([m1, m2, nq], secAnswers.slice(0, 2), marking)
  check(
    'A10u: skipped section-B question banks maxScore but no negative',
    skippedTail.score === 3 && skippedTail.maxScore === 11 && skippedTail.skippedCount === 1 && skippedTail.sectionTallies?.[1].skipped === 1,
    { score: skippedTail.score, tallies: skippedTail.sectionTallies },
  )
  const noSection = scorePaper([m1], [{ questionId: m1.id, chosen: m1.answerIndex }], marking)
  check('A10v: answers without a section index default to section 0 marking', noSection.score === 4 && noSection.maxScore === 4)
  check(
    'A10w: typed values + per-question secs echo into results',
    scored.results[2].typed === String(ev) && scored.results[0].secs === 12 && scored.results[2].secs === 33,
  )
  const titaWrong = scorePaper([nq], [{ questionId: nq.id, value: String(ev + 1), section: 1 }], marking)
  check(
    'A10x: a wrong TITA answer scores no negative (CAT rule)',
    titaWrong.score === 0 && titaWrong.maxScore === 3 && titaWrong.wrongCount === 1 && titaWrong.sectionTallies?.[1].score === 0,
    { score: titaWrong.score },
  )
}

/* ================================================================== */
/* Section B — services against the live catalog + database            */
/* ================================================================== */

const stamp = Date.now()
const cleanup = async () => {
  await db.user
    .deleteMany({ where: { email: { in: [`prac-a+${stamp}@example.com`, `prac-b+${stamp}@example.com`] } } })
    .catch(() => undefined)
}
await cleanup()
const userA = await db.user.create({
  data: { email: `prac-a+${stamp}@example.com`, name: 'Practice Tester A', passwordHash: 'x:y' },
})
const userB = await db.user.create({
  data: { email: `prac-b+${stamp}@example.com`, name: 'Practice Tester B', passwordHash: 'x:y' },
})

const fmCh1 = CATALOG.chapters.find((c) => c.bookId === 'foundation-mathematics' && c.chapterNumber === 1)!
const lesson1 = fmCh1.lessonRecordIds[0]

/* B1. presets: scopes resolve, marking sane, caveats honest */
{
  const writtenChapters = new Set(CATALOG.chapters.filter((c) => c.lessonRecordIds.length > 0).map((c) => c.key))
  for (const p of EXAM_PRESETS) {
    const scope = p.scope === '*' ? [...writtenChapters] : p.scope
    check(
      `B1: preset ${p.key} scope resolves to written chapters`,
      scope.length > 0 && scope.every((k) => writtenChapters.has(k)),
      { key: p.key, scope },
    )
    const { marks, negative } = presetMarking(p)
    check(`B1: preset ${p.key} marking sane`, marks > 0 && negative >= 0 && presetQuestionCount(p) > 0)
    check(`B1: preset ${p.key} carries the honest format note`, p.formatNote.length > 20 && p.scopeStatus === 'provisional')
  }
  check(
    'B1: real-exam presets carry caveats for unwritten topics',
    EXAM_PRESETS.filter((p) => p.registryId !== undefined).every((p) => p.caveats.length > 0),
  )
  check('B1: unknown preset is undefined', findExamPreset('nope') === undefined)
}

/* B2. exam papers: deterministic, mcq-only, preset count */
{
  const paperA = await buildExamPaper(undefined, 'library-sweep', 4242)
  const paperB = await buildExamPaper(undefined, 'library-sweep', 4242)
  check('B2a: exam paper deterministic under seed', JSON.stringify(paperA.paper.map((q) => q.id)) === JSON.stringify(paperB.paper.map((q) => q.id)))
  const sweep = findExamPreset('library-sweep')!
  check(
    'B2b: paper size matches the preset count',
    paperA.paper.length === Math.min(presetQuestionCount(sweep), allPracticeQuestions().filter((q) => q.kind === 'mcq').length),
    paperA.paper.length,
  )
  check('B2c: exam papers are mcq-only', paperA.paper.every((q) => q.kind === 'mcq'))
  check('B2d: meta records seed + preset + kind', paperA.meta.seed === 4242 && paperA.meta.presetKey === 'library-sweep' && paperA.meta.kind === 'exam')
  check('B2e: preset view carries marking', paperA.preset?.marks === 1 && paperA.preset?.negative === 0)

  let threw = ''
  try {
    await buildExamPaper(undefined, 'nope-exam', 1)
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B2f: unknown exam preset rejected', threw === 'badinput', threw)
}

/* B3. drill papers: clamps, scopes, auto-focus fallback */
{
  const d1 = await buildDrillPaper(userA.id, { focus: 'library', count: 99, seed: 1 })
  check('B3a: drill count clamped to 30', d1.paper.length === 30, d1.paper.length)
  const d2 = await buildDrillPaper(userA.id, { focus: 'library', count: 2, seed: 1 })
  check('B3b: drill count clamped up to 5', d2.paper.length === 5, d2.paper.length)

  const dBook = await buildDrillPaper(userA.id, { focus: 'book', bookId: 'foundation-mathematics', count: 10, seed: 2 })
  check(
    'B3c: book drill draws only from that book',
    dBook.paper.length > 0 && dBook.paper.every((q) => q.bookId === 'foundation-mathematics'),
    dBook.meta.presetKey,
  )
  check('B3d: book drill presetKey names the book', dBook.meta.presetKey === 'drill:book:foundation-mathematics')

  /* empty ledger → auto falls back to the whole library with an honest reason */
  const dAuto = await buildDrillPaper(userA.id, { focus: 'auto', count: 8, seed: 3 })
  check(
    'B3e: auto drill with empty ledger falls back to whole library',
    dAuto.meta.presetKey === 'drill:auto' &&
      (dAuto.meta.focusChapters?.some((f) => f.reason.includes('Nothing studied yet')) ?? false),
    dAuto.meta.focusChapters,
  )

  let threw = ''
  try {
    await buildDrillPaper(userA.id, { focus: 'book', bookId: 'no-book', count: 5 })
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B3f: unknown book drill rejected', threw === 'badinput', threw)
}

/* B4. submit: grading, mistakes, ledger signals, attempts */
{
  const paper = await buildExamPaper(undefined, 'library-sweep', 777)
  const answers = paper.paper.map((q, i) => ({
    questionId: q.id,
    chosen: i % 3 === 0 ? (q.answerIndex! + 1) % q.options!.length : q.answerIndex!,
  }))
  const res = await submitAttempt(userA.id, {
    kind: 'exam',
    presetKey: 'library-sweep',
    seed: 777,
    secs: 300,
    answers,
  })
  const wrong = answers.filter((_, i) => i % 3 === 0).length
  check('B4a: server grading matches the crafted answers', res.wrongCount === wrong && res.correctCount === answers.length - wrong, {
    wrong,
    res: res.wrongCount,
  })
  const marks = 1
  const negative = 0
  check(
    'B4b: score arithmetic honest (library sweep +1/−0)',
    Math.abs(res.score - (answers.length - wrong) * marks + wrong * negative) < 1e-9,
    res.score,
  )
  check('B4c: wrong answers fed the Mistake Bank', res.mistakesAdded === wrong, { added: res.mistakesAdded, wrong })
  check('B4d: ledger quiz signals sent per lesson', res.ledgerSignals > 0)
  check('B4e: attempt persisted with id', typeof res.attemptId === 'string' && res.attemptId.length > 0)
  check(
    'B4f: breakdown covers every question',
    res.breakdown.reduce((n, b) => n + b.total, 0) === answers.length,
  )

  const attempts = await listAttempts(userA.id)
  check('B4g: attempt history lists the run', attempts.length === 1 && attempts[0].presetKey === 'library-sweep')
  check(
    'B4h: history percent derived from stored score',
    attempts[0].percent === res.percent && attempts[0].total === answers.length,
    attempts[0],
  )
  const attemptsB = await listAttempts(userB.id)
  check('B4i: attempt history is isolated per user', attemptsB.length === 0)

  /* ledger side-effect: quiz signals created lesson entries */
  const lessonIds = new Set(paper.paper.map((q) => q.lessonId))
  const entries = await db.studyEntry.findMany({ where: { userId: userA.id, scope: 'lesson' } })
  check(
    'B4j: quiz signals created ledger lesson entries',
    entries.filter((e) => lessonIds.has(e.refId)).length > 0,
    entries.length,
  )

  let threw = ''
  try {
    await submitAttempt(userA.id, {
      kind: 'exam',
      presetKey: 'library-sweep',
      seed: 1,
      secs: 10,
      answers: [{ questionId: 'bogus#q0.0', chosen: 0 }],
    })
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B4k: unknown questionId rejected', threw === 'badinput', threw)
}

/* B5. Mistake Bank lifecycle */
{
  const q = questionsInScope(new Set([fmCh1.key])).find((x) => x.kind === 'mcq')!
  const wrongGiven = q.options![(q.answerIndex! + 1) % q.options!.length]

  const r1 = await recordMistake(userA.id, {
    source: 'quiz',
    lessonId: q.lessonId,
    questionKey: q.id,
    prompt: q.prompt,
    given: wrongGiven,
    expected: q.answerText ?? '',
    explain: q.explain ?? '',
  })
  check('B5a: wrong answer creates a card', r1.ok && r1.created && !r1.resolved)

  const r2 = await recordMistake(userA.id, {
    source: 'quiz',
    lessonId: q.lessonId,
    questionKey: q.id,
    prompt: q.prompt,
    given: wrongGiven,
    expected: q.answerText ?? '',
    explain: q.explain ?? '',
  })
  check('B5b: repeated wrong re-opens the same card', r2.ok && !r2.created && !r2.resolved)

  const list1 = await listMistakes(userA.id)
  const card = list1.due.find((m) => m.questionKey === q.id)
  check('B5c: card listed as due with timesWrong 2', !!card && card.timesWrong === 2, card?.timesWrong)
  check('B5d: card resolves lesson metadata', card?.lessonNumber !== undefined && card?.url.includes('/lesson/'))

  /* review ladder: Hard then Good — not yet retired (needs 2 consecutive good) */
  const rev1 = await reviewMistake(userA.id, card!.id, 3)
  check('B5e: first review advances passes, no retirement', rev1.ok && !rev1.resolved && rev1.mistake?.passes === 1)
  const rev2 = await reviewMistake(userA.id, card!.id, 4)
  check('B5f: good after hard does not retire (prev quality < 4)', rev2.ok && !rev2.resolved && rev2.mistake?.passes === 2)
  const rev3 = await reviewMistake(userA.id, card!.id, 5)
  check('B5g: two consecutive good reviews retire the card', rev3.ok && rev3.resolved, rev3)

  /* a wrong retake re-opens it */
  const r3 = await recordMistake(userA.id, {
    source: 'quiz',
    lessonId: q.lessonId,
    questionKey: q.id,
    prompt: q.prompt,
    given: wrongGiven,
    expected: q.answerText ?? '',
    explain: q.explain ?? '',
  })
  check('B5h: new wrong re-opens a retired card', r3.ok && !r3.resolved)
  const list2 = await listMistakes(userA.id)
  const reopened = list2.due.find((m) => m.questionKey === q.id)
  check('B5i: reopened card reset (timesWrong 3, passes 0)', reopened?.timesWrong === 3 && reopened?.passes === 0, reopened)

  /* a correct retake resolves it */
  const r4 = await recordMistake(userA.id, {
    source: 'quiz',
    lessonId: q.lessonId,
    questionKey: q.id,
    prompt: q.prompt,
    given: q.answerText ?? '',
    expected: q.answerText ?? '',
    explain: q.explain ?? '',
    outcome: 'correct',
  })
  check('B5j: correct retake retires the card', r4.ok && r4.resolved)
  check('B5k: correct outcome with no card is a clean no-op', (await recordMistake(userB.id, {
    source: 'quiz',
    lessonId: q.lessonId,
    questionKey: q.id,
    prompt: q.prompt,
    given: '',
    expected: '',
    outcome: 'correct',
  })).resolved === false)

  /* manual resolve / reopen + isolation */
  const r5 = await recordMistake(userA.id, {
    source: 'exercise',
    lessonId: q.lessonId,
    questionKey: q.id, // reuse key for the manual test
    prompt: q.prompt,
    given: 'self-reported miss',
    expected: q.answerText ?? '',
  })
  void r5
  const manual = await setMistakeResolved(userA.id, reopened?.id ?? card!.id, true)
  check('B5l: manual resolve sets resolvedAt', manual.resolvedAt !== null)
  const manual2 = await setMistakeResolved(userA.id, reopened?.id ?? card!.id, false)
  check('B5m: manual reopen resets the schedule', manual2.resolvedAt === null && manual2.passes === 0)

  let threw = ''
  try {
    await reviewMistake(userB.id, card!.id, 4)
  } catch (e) {
    threw = e instanceof MistakeBadInput ? 'badinput' : String(e)
  }
  check('B5n: user B cannot review user A cards (isolation)', threw === 'badinput', threw)
  const listB = await listMistakes(userB.id)
  check('B5o: user B sees none of user A cards', listB.stats.total === 0)

  /* validation */
  try {
    await recordMistake(userA.id, {
      source: 'quiz',
      lessonId: 'not-a-lesson',
      questionKey: 'not-a-lesson#q0.0',
      prompt: 'x',
      given: '',
      expected: '',
    })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof MistakeBadInput ? 'badinput' : String(e)
  }
  check('B5p: unknown lessonId rejected', threw === 'badinput', threw)
  try {
    await recordMistake(userA.id, {
      source: 'quiz',
      lessonId: lesson1,
      questionKey: `other-lesson#q0.0`,
      prompt: 'x',
      given: '',
      expected: '',
    })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof MistakeBadInput ? 'badinput' : String(e)
  }
  check('B5q: questionKey must belong to the lesson', threw === 'badinput', threw)
  try {
    await recordMistake(userA.id, {
      source: 'voodoo' as never,
      lessonId: lesson1,
      questionKey: `${lesson1}#q0.0`,
      prompt: 'x',
      given: '',
      expected: '',
    })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof MistakeBadInput ? 'badinput' : String(e)
  }
  check('B5r: invalid source rejected', threw === 'badinput', threw)
}

/* B6. readiness: structure + responsiveness to study state */
{
  const before = await getReadiness(userB.id)
  check(
    'B6a: library aggregate over all written chapters',
    before.library.chaptersTotal === CATALOG.chapters.filter((c) => c.lessonRecordIds.length > 0).length,
    before.library.chaptersTotal,
  )
  check('B6b: unstudied user has zero readiness', before.library.readiness === 0 && before.books.every((b) => b.readiness === 0))
  check('B6c: every catalog book present', before.books.length === CATALOG.books.length)
  check(
    'B6d: every exam preset present with caveats + format note',
    before.exams.length === EXAM_PRESETS.length && before.exams.every((e) => e.formatNote.length > 0),
  )
  check(
    'B6e: book chapters carry per-chapter detail',
    before.books.every((b) => b.chapters.every((c) => c.lessonsTotal > 0 && c.readiness >= 0 && c.readiness <= 100)),
  )

  /* mark one chapter studied → readiness rises above zero for it */
  const { markStudy } = await import('../src/lib/revision/ledger-service')
  await markStudy(userB.id, { items: [{ scope: 'chapter', refId: fmCh1.key }], action: 'study', kind: 'chapter-mark' })
  const after = await getReadiness(userB.id)
  const fmBook = after.books.find((b) => b.bookId === 'foundation-mathematics')!
  const ch1 = fmBook.chapters.find((c) => c.key === fmCh1.key)!
  check('B6f: marked chapter flips to tracked with full coverage', ch1.tracked && ch1.coverage === 100, ch1)
  check('B6g: marked chapter readiness > 0', ch1.readiness > 0, ch1.readiness)
  check('B6h: library readiness rose from 0', after.library.readiness > before.library.readiness, after.library.readiness)
  check('B6i: exam readiness over that scope rose too', after.exams.every((e) => e.readiness >= before.exams.find((x) => x.presetKey === e.presetKey)!.readiness))
}

/* B7. difficulty calibration services: bands, pooled stats, weighting */
{
  clearDifficultyCache()
  const warm = await buildExamPaper(undefined, 'library-sweep', 2026, 'warmup')
  const std = await buildExamPaper(undefined, 'library-sweep', 2026, 'standard')
  const chal = await buildExamPaper(undefined, 'library-sweep', 2026, 'challenge')
  check(
    'B7a: meta carries the requested band',
    warm.meta.band === 'warmup' && std.meta.band === 'standard' && chal.meta.band === 'challenge',
  )
  check(
    'B7b: meta carries difficulty mean + calibrated count',
    typeof warm.meta.difficultyMean === 'number' &&
      typeof warm.meta.difficultyData === 'number' &&
      warm.meta.difficultyData >= 0 &&
      warm.meta.difficultyData <= warm.paper.length,
  )
  check(
    'B7c: challenge paper is at least as hard as the warm-up set',
    (chal.meta.difficultyMean ?? 0) >= (warm.meta.difficultyMean ?? 0),
    { warm: warm.meta.difficultyMean, chal: chal.meta.difficultyMean },
  )
  check(
    'B7d: standard sits between the bands',
    (std.meta.difficultyMean ?? 0) >= (warm.meta.difficultyMean ?? 0) &&
      (std.meta.difficultyMean ?? 0) <= (chal.meta.difficultyMean ?? 0),
    { warm: warm.meta.difficultyMean, std: std.meta.difficultyMean, chal: chal.meta.difficultyMean },
  )

  /* pooled stats: aggregation over stored attempts, skips excluded */
  clearDifficultyCache()
  const stats = await pooledDifficultyStats()
  check('B7e: pooled stats exist after the earlier submits', stats.size > 0, stats.size)
  check(
    'B7f: pooled stat shapes are sane (attempts ≥ correct ≥ 0)',
    [...stats.values()].every((s) => s.attempts > 0 && s.correct >= 0 && s.correct <= s.attempts),
  )

  /* skips are not evidence: a fully-skipped paper adds no attempts */
  const skipPaper = await buildExamPaper(undefined, 'library-sweep', 9109)
  clearDifficultyCache()
  const before = await pooledDifficultyStats()
  const beforeCounts = skipPaper.paper.map((q) => before.get(q.id)?.attempts ?? 0)
  await submitAttempt(userB.id, {
    kind: 'exam',
    presetKey: 'library-sweep',
    seed: 9109,
    secs: 30,
    answers: skipPaper.paper.map((q) => ({ questionId: q.id })),
  })
  clearDifficultyCache()
  const after = await pooledDifficultyStats()
  check(
    'B7g: skipped answers never feed the difficulty calibration',
    skipPaper.paper.every((q, i) => (after.get(q.id)?.attempts ?? 0) === beforeCounts[i]),
  )

  /* answered attempts DO feed it */
  const goodPaper = await buildExamPaper(undefined, 'library-sweep', 9210)
  const goodBefore = goodPaper.paper.map((q) => before.get(q.id)?.attempts ?? 0)
  const resGood = await submitAttempt(userB.id, {
    kind: 'exam',
    presetKey: 'library-sweep',
    seed: 9210,
    secs: 120,
    answers: goodPaper.paper.map((q) => ({ questionId: q.id, chosen: q.answerIndex! })),
    band: 'challenge',
  })
  clearDifficultyCache()
  const afterGood = await pooledDifficultyStats()
  check(
    'B7h: answered attempts land in the pooled stats',
    goodPaper.paper.every((q, i) => (afterGood.get(q.id)?.attempts ?? 0) === goodBefore[i] + 1),
  )

  /* submit enrichment */
  check('B7i: band echoed on submit', resGood.band === 'challenge')
  check(
    'B7j: all-correct paper → weighted accuracy 100',
    resGood.difficultyAccuracy === 100,
    resGood.difficultyAccuracy,
  )
  check(
    'B7k: per-question difficulty attached to every result',
    resGood.questions.every(
      (q) =>
        typeof q.difficulty === 'number' &&
        q.difficulty >= 0 &&
        q.difficulty <= 100 &&
        (q.difficultyBand === 'warmup' || q.difficultyBand === 'standard' || q.difficultyBand === 'challenge') &&
        typeof q.difficultyAttempts === 'number',
    ),
  )
  check(
    'B7l: paper difficulty mean present and consistent',
    typeof resGood.paperDifficultyMean === 'number' &&
      Math.abs(
        (resGood.paperDifficultyMean ?? 0) -
          Math.round(resGood.questions.reduce((n, q) => n + (q.difficulty ?? 50), 0) / resGood.questions.length),
      ) < 1.001,
  )

  /* readiness carries the difficulty-weighted numbers */
  clearDifficultyCache()
  const rdA = await getReadiness(userA.id)
  check(
    'B7m: library difficulty-weighted readiness present and bounded',
    typeof rdA.library.difficultyReadiness === 'number' &&
      rdA.library.difficultyReadiness >= 0 &&
      rdA.library.difficultyReadiness <= 100,
    rdA.library.difficultyReadiness,
  )
  check(
    'B7n: every exam carries difficultyReadiness + difficultyMix + difficultyData',
    rdA.exams.every(
      (e) =>
        typeof e.difficultyReadiness === 'number' &&
        typeof e.difficultyMix === 'number' &&
        typeof e.difficultyData === 'number' &&
        e.difficultyData >= 0,
    ),
  )
  check(
    'B7o: userA has weighted accuracy from their attempts (scope-* presets)',
    rdA.exams.filter((e) => e.presetKey !== 'cat-quant').some((e) => typeof e.weightedAccuracy === 'number'),
  )
  const rdB = await getReadiness(userB.id)
  check(
    'B7p: userB weighted accuracy reflects the all-correct run',
    rdB.exams.some((e) => e.weightedAccuracy === 100),
    rdB.exams.map((e) => [e.presetKey, e.weightedAccuracy]),
  )
}

/* B8. multi-section papers (JEE A/B · CAT MCQ/TITA) + timed submit */
{
  const jee = await buildExamPaper(undefined, 'jee-main-maths', 909, 'standard')
  const jeeMeta = jee.meta.sections ?? []
  check('B8a: JEE paper carries two sections', jeeMeta.length === 2, jeeMeta.map((s) => s.label))
  const [secA, secB] = jeeMeta
  check(
    'B8b: Section A is 20 MCQ +4/−1',
    secA?.type === 'mcq' && secA.count === 20 && secA.marks === 4 && secA.negative === 1,
    secA,
  )
  check(
    'B8c: Section B is 5 numerical-value +4/−1',
    secB?.type === 'numeric' && secB.count === 5 && secB.marks === 4 && secB.negative === 1,
    secB,
  )
  check(
    'B8d: JEE paper = 25 questions, sections tile the paper exactly',
    jee.paper.length === 25 && secA.from === 0 && secA.to === 19 && secB.from === 20 && secB.to === 24,
    { len: jee.paper.length, a: [secA.from, secA.to], b: [secB.from, secB.to] },
  )
  check(
    'B8e: first 20 are MCQs, last 5 are numeric-answer free questions',
    jee.paper.slice(0, 20).every((q) => q.kind === 'mcq') &&
      jee.paper.slice(20).every((q) => q.kind === 'free' && numericAnswerOf(q.answerText) !== null),
  )
  check('B8f: no question repeats across sections', new Set(jee.paper.map((q) => q.id)).size === 25)
  const jee2 = await buildExamPaper(undefined, 'jee-main-maths', 909, 'standard')
  check(
    'B8g: sectioned papers stay deterministic under seed + band',
    JSON.stringify(jee.paper.map((q) => q.id)) === JSON.stringify(jee2.paper.map((q) => q.id)),
  )
  check(
    'B8h: preset view exposes every section with its marking',
    jee.preset?.sections?.length === 2 &&
      jee.preset.sections.every((s) => s.questionCount > 0 && s.marks > 0 && s.negative >= 0),
  )

  const cat = await buildExamPaper(undefined, 'cat-quant', 910, 'challenge')
  const catMeta = cat.meta.sections ?? []
  check(
    'B8i: CAT paper is 14 MCQ (+3/−1) + 8 TITA (+3/no negative), calculator on',
    cat.preset?.calculator === true &&
      catMeta[0]?.type === 'mcq' &&
      catMeta[0].count === 14 &&
      catMeta[0].marks === 3 &&
      catMeta[0].negative === 1 &&
      catMeta[1]?.type === 'numeric' &&
      catMeta[1].count === 8 &&
      catMeta[1].marks === 3 &&
      catMeta[1].negative === 0,
    catMeta,
  )
  check('B8j: CAT paper totals 22 questions', cat.paper.length === 22, cat.paper.length)

  /* submit the sectioned JEE paper: MCQs half-right, numericals 3/5, timed */
  const answers = jee.paper.map((q, i) => {
    const section = i < 20 ? 0 : 1
    if (q.kind === 'mcq') {
      return {
        questionId: q.id,
        chosen: i % 2 === 0 ? q.answerIndex : (q.answerIndex! + 1) % q.options!.length,
        section,
        secs: 30 + i,
      }
    }
    const ev = numericAnswerOf(q.answerText)!
    return { questionId: q.id, value: String(i % 2 === 0 ? ev : ev + 5), section, secs: 45 + i }
  })
  const res = await submitAttempt(userA.id, {
    kind: 'exam',
    presetKey: 'jee-main-maths',
    seed: 909,
    secs: 1800,
    answers,
    band: 'standard',
  })
  /* MCQs: i=0..19, evens correct → 10 correct / 10 wrong. Numericals:
   * i=20,22,24 correct → 3 correct / 2 wrong. */
  check(
    'B8k: sectioned grading counts',
    res.correctCount === 13 && res.wrongCount === 12 && res.skippedCount === 0,
    { c: res.correctCount, w: res.wrongCount, s: res.skippedCount },
  )
  /* score = 10·4 − 10·1 + 3·4 − 2·1 = 40 of 100 */
  check(
    'B8l: per-section marking arithmetic on the submitted paper',
    Math.abs(res.score - 40) < 1e-9 && res.maxScore === 100,
    { score: res.score, max: res.maxScore },
  )
  check(
    'B8m: sectionScores carry labels + per-section tallies',
    res.sectionScores?.length === 2 &&
      (res.sectionScores[0]?.label.includes('Section A') ?? false) &&
      (res.sectionScores[1]?.label.includes('Section B') ?? false) &&
      res.sectionScores[0].score === 30 &&
      res.sectionScores[0].maxScore === 80 &&
      res.sectionScores[1].score === 10 &&
      res.sectionScores[1].maxScore === 20,
    res.sectionScores,
  )
  check(
    'B8n: avgSecsPerQuestion is honest (mean of the 25..49s window)',
    typeof res.avgSecsPerQuestion === 'number' && res.avgSecsPerQuestion! >= 30 && res.avgSecsPerQuestion! <= 60,
    res.avgSecsPerQuestion,
  )
  check(
    'B8o: per-question secs echo into the results',
    res.questions.every((q) => typeof q.secs === 'number' && q.secs >= 30),
  )
  check(
    'B8p: typed numeric answers echo for review',
    res.questions.slice(20).every((q) => typeof q.typed === 'string' && q.typed !== ''),
  )

  /* the attempt row stores value + secs (history never rewrites) */
  const row = await db.practiceAttempt.findUnique({ where: { id: res.attemptId } })
  let storedTail: Array<{ value?: string; secs?: number }> = []
  try {
    storedTail = (JSON.parse(row?.results ?? '[]') as Array<{ value?: string; secs?: number }>).slice(20)
  } catch {
    storedTail = []
  }
  check(
    'B8q: attempt results store the typed values + per-question secs',
    storedTail.length === 5 &&
      storedTail.every((it) => typeof it.value === 'string' && it.value !== '' && typeof it.secs === 'number'),
    storedTail.slice(0, 2),
  )

  /* a wrong numerical answer lands in the Mistake Bank with the typed value */
  const wrongNumeric = jee.paper[21]
  const card = await db.mistake.findFirst({ where: { userId: userA.id, questionKey: wrongNumeric.id } })
  check(
    'B8r: wrong TITA answer becomes a Mistake Bank card carrying the typed value',
    card !== null && card.given === String(numericAnswerOf(wrongNumeric.answerText)! + 5),
    { given: card?.given },
  )

  /* typed numeric answers are difficulty evidence */
  clearDifficultyCache()
  const stats = await pooledDifficultyStats()
  check(
    'B8s: typed numeric answers count as pooled difficulty evidence',
    (stats.get(jee.paper[20].id)?.attempts ?? 0) >= 1,
    stats.get(jee.paper[20].id),
  )
}

await cleanup()

/* ================================================================== */

console.log('='.repeat(60))
if (fail === 0) {
  console.log(`verify-practice: ${pass}/${pass + fail} checks ALL GREEN`)
} else {
  console.log(`verify-practice: ${pass}/${pass + fail} checks pass, ${fail} failures`)
  for (const f of failures) console.log(`  FAIL: ${f}`)
  process.exit(1)
}
