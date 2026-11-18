/**
 * verify-revision-progress.ts — pre-UI arithmetic verification for the
 * Revision Hub Progress tab + study progress engine (owner chat directive,
 * 2026-11-18).
 *
 * VERIFY-FIRST: every number the Progress tab will show is checked here
 * BEFORE the UI is written — the engine's book-status thresholds, quiz
 * census (exact + legacy estimate), coverage dedup discipline, and the
 * seven recommendation rules with their priorities and order.
 *
 * Run: bun run scripts/verify-revision-progress.ts   (exit 1 on any failure)
 */
export {}

let pass = 0
let fail = 0
const failures: string[] = []

function check(name: string, condition: boolean): void {
  if (condition) {
    pass++
  } else {
    fail++
    failures.push(name)
  }
}

function eq<T>(name: string, actual: T, expected: T): void {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  check(`${name} = ${JSON.stringify(expected)} (got ${JSON.stringify(actual)})`, ok)
}

/* ------------------------------------------------------------------ */
/* A. The catalog quiz census (what the whole library offers)            */
/* ------------------------------------------------------------------ */
import { CATALOG } from '../src/lib/builder/catalog'

const written = CATALOG.lessons.length
const withQuiz = CATALOG.lessons.filter((l) => l.quizQuestions > 0)
const quizTotal = CATALOG.lessons.reduce((n, l) => n + l.quizQuestions, 0)

eq('written lessons in catalog', written, 147)
eq('every written lesson carries a quiz', withQuiz.length, written)
eq('house quiz format: exactly 5 questions per lesson',
  withQuiz.every((l) => l.quizQuestions === 5), true)
eq('quiz questions offered library-wide', quizTotal, 735)

/* ------------------------------------------------------------------ */
/* B. Pure engine unit pins                                             */
/* ------------------------------------------------------------------ */
import {
  bookStatus,
  buildProgress,
  quizEventParts,
  type ProgressEngineInput,
  type ProgressLessonInput,
} from '../src/lib/revision/progress-engine'

/* bookStatus thresholds ------------------------------------------------ */
eq('bookStatus 0/0 → untouched', bookStatus(0, 0), 'untouched')
eq('bookStatus 0/8, no lessons → untouched', bookStatus(0, 8), 'untouched')
eq('bookStatus 0/8 with 3 lesson marks → started (never untouched)', bookStatus(0, 8, 3), 'started')
eq('bookStatus 2/8 (0.25) → started', bookStatus(2, 8), 'started')
eq('bookStatus 1/3 (= 1/3) → in-progress', bookStatus(1, 3), 'in-progress')
eq('bookStatus 3/8 (0.375) → in-progress', bookStatus(3, 8), 'in-progress')
eq('bookStatus 8/8 → completed', bookStatus(8, 8), 'completed')

/* quizEventParts: exact vs legacy -------------------------------------- */
const lessonL21: ProgressLessonInput = {
  id: 'l21',
  bookId: 'b1',
  chapterNumber: 2,
  lessonNumber: '2.1',
  lessonTitle: 'Partial Lesson',
  words: 400,
  readMins: 2,
  quizQuestions: 5,
}
eq('exact row {score 4, total 5} → 4/5 exact',
  quizEventParts({ lessonId: 'l21', score: 4, total: 5, quality: 4 }, lessonL21),
  { correct: 4, answered: 5, exact: true })
eq('exact row is clamped (score ≤ total)',
  quizEventParts({ lessonId: 'l21', score: 9, total: 5, quality: 4 }, lessonL21),
  { correct: 5, answered: 5, exact: true })
eq('legacy quality 4 on a 5-question lesson → 4/5 estimated',
  quizEventParts({ lessonId: 'l21', score: null, total: null, quality: 4 }, lessonL21),
  { correct: 4, answered: 5, exact: false })
eq('legacy quality 1 on a 5-question lesson → 1/5 estimated',
  quizEventParts({ lessonId: 'l21', score: null, total: null, quality: 1 }, lessonL21),
  { correct: 1, answered: 5, exact: false })
eq('legacy null quality on a 5-question lesson → 0/5, answered still counted',
  quizEventParts({ lessonId: 'l21', score: null, total: null, quality: null }, lessonL21),
  { correct: 0, answered: 5, exact: false })
eq('legacy event on a lesson with no quiz → nothing counted',
  quizEventParts({ lessonId: 'l21', score: null, total: null, quality: 3 }, {
    ...lessonL21,
    quizQuestions: 0,
  }),
  { correct: 0, answered: 0, exact: false })

/* buildProgress — the full scenario ----------------------------------- */
const DAY = 86400000
const NOW = 1766227200000 // 2026-11-18T00:00:00Z, fixed for determinism

function lesson(
  id: string,
  bookId: string,
  chapterNumber: number,
  lessonNumber: string,
  words: number,
): ProgressLessonInput {
  return {
    id,
    bookId,
    chapterNumber,
    lessonNumber,
    lessonTitle: `Title ${lessonNumber}`,
    words,
    readMins: Math.max(1, Math.round(words / 200)),
    quizQuestions: 5,
  }
}

const L11 = lesson('l11', 'b1', 1, '1.1', 600)
const L12 = lesson('l12', 'b1', 1, '1.2', 400)
const L21 = lesson('l21', 'b1', 2, '2.1', 400)
const L22 = lesson('l22', 'b1', 2, '2.2', 400)
const L3X = [
  lesson('l31', 'b1', 3, '3.1', 600),
  lesson('l32', 'b1', 3, '3.2', 600),
  lesson('l33', 'b1', 3, '3.3', 600),
]
const L41 = lesson('l41', 'b2', 4, '4.1', 200)
const L42 = lesson('l42', 'b2', 4, '4.2', 200)
const B3LESSONS = [
  lesson('l51', 'b3', 5, '5.1', 200),
  lesson('l52', 'b3', 5, '5.2', 200),
  lesson('l53', 'b3', 5, '5.3', 200),
  lesson('l61', 'b3', 6, '6.1', 200),
  lesson('l62', 'b3', 6, '6.2', 200),
  lesson('l63', 'b3', 6, '6.3', 200),
]

const input: ProgressEngineInput = {
  now: NOW,
  chapters: [
    { key: 'b1:1', bookId: 'b1', chapterNumber: 1, chapterTitle: 'Numbers', lessonIds: ['l11', 'l12'], words: 1000 },
    { key: 'b1:2', bookId: 'b1', chapterNumber: 2, chapterTitle: 'Expressions', lessonIds: ['l21', 'l22'], words: 800 },
    { key: 'b1:3', bookId: 'b1', chapterNumber: 3, chapterTitle: 'Equations', lessonIds: ['l31', 'l32', 'l33'], words: 1800 },
    { key: 'b2:4', bookId: 'b2', chapterNumber: 4, chapterTitle: 'Fractions', lessonIds: ['l41', 'l42'], words: 400 },
    { key: 'b3:5', bookId: 'b3', chapterNumber: 5, chapterTitle: 'Lines', lessonIds: ['l51', 'l52', 'l53'], words: 600 },
    { key: 'b3:6', bookId: 'b3', chapterNumber: 6, chapterTitle: 'Angles', lessonIds: ['l61', 'l62', 'l63'], words: 600 },
  ],
  lessons: [L11, L12, L21, L22, ...L3X, L41, L42, ...B3LESSONS],
  books: [
    { bookId: 'b1', title: 'Algebra Basics', disciplineId: 'math', disciplineTitle: 'Mathematics', accent: ['#0ea5e9', '#6366f1'], chapterKeys: ['b1:1', 'b1:2', 'b1:3'], lessonIds: ['l11', 'l12', 'l21', 'l22', 'l31', 'l32', 'l33'] },
    { bookId: 'b2', title: 'Fractions First', disciplineId: 'math', disciplineTitle: 'Mathematics', accent: ['#f59e0b', '#ef4444'], chapterKeys: ['b2:4'], lessonIds: ['l41', 'l42'] },
    { bookId: 'b3', title: 'Geometry Later', disciplineId: 'math', disciplineTitle: 'Mathematics', accent: ['#22c55e', '#14b8a6'], chapterKeys: ['b3:5', 'b3:6'], lessonIds: ['l51', 'l52', 'l53', 'l61', 'l62', 'l63'] },
  ],
  entries: [
    /* b1 chapter 1: studied once, 10 days ago, never revised */
    { scope: 'chapter', refId: 'b1:1', passes: 1, mastery: 50, lastAt: NOW - 10 * DAY, dueAt: NOW - 2 * DAY },
    /* b1 chapter 2, section 2.1 only: partial → unfinished chapter */
    { scope: 'lesson', refId: 'l21', passes: 3, mastery: 78, lastAt: NOW - 2 * DAY, dueAt: NOW + 5 * DAY },
    /* b2 both sections of chapter 4 → the chapter is covered by lessons */
    { scope: 'lesson', refId: 'l41', passes: 2, mastery: 30, lastAt: NOW - 1 * DAY, dueAt: NOW + 3 * DAY },
    { scope: 'lesson', refId: 'l42', passes: 2, mastery: 30, lastAt: NOW - 1 * DAY, dueAt: NOW + 3 * DAY },
  ],
  quizEvents: [
    /* exact row: 4 of 5 correct on 4.1 */
    { lessonId: 'l41', score: 4, total: 5, quality: 4 },
    /* legacy row: quality 1 on 2.1 → 1 of 5 estimated */
    { lessonId: 'l21', score: null, total: null, quality: 1 },
  ],
}

const out = buildProgress(input)

/* quiz census ------------------------------------------------------------ */
eq('quiz.events', out.quiz.events, 2)
eq('quiz.exact', out.quiz.exact, 1)
eq('quiz.estimated', out.quiz.estimated, 1)
eq('quiz.answered', out.quiz.answered, 10)
eq('quiz.understood', out.quiz.understood, 5)
eq('quiz.accuracy (1 decimal)', out.quiz.accuracy, 50)
eq('quiz.quizLessons', out.quiz.quizLessons, 2)

/* coverage ---------------------------------------------------------------- */
eq('coverage.topicsStudied (chapter + lesson marks)', out.coverage.topicsStudied, 4)
eq('coverage.chaptersStudied (chapter marks)', out.coverage.chaptersStudied, 1)
eq('coverage.lessonsStudied (lesson marks)', out.coverage.lessonsStudied, 3)
eq('coverage.chaptersTotal', out.coverage.chaptersTotal, 6)
eq('coverage.lessonsTotal', out.coverage.lessonsTotal, 15)
eq('coverage.booksCompleted', out.coverage.booksCompleted, 1)
eq('coverage.booksInProgress', out.coverage.booksInProgress, 1)
eq('coverage.booksStarted', out.coverage.booksStarted, 0)
eq('coverage.booksTotal', out.coverage.booksTotal, 3)
eq('coverage.wordsStudied (c1 1000 + partial 400 + b2 400)', out.coverage.wordsStudied, 1800)
eq('coverage.readMins (c1 5 + orphan 2.1 → 2 + b2 lessons 1+1)', out.coverage.readMins, 9)
eq('coverage.totalPasses (1 + 3 + 2 + 2)', out.coverage.totalPasses, 8)

/* per-book rows ----------------------------------------------------------- */
const b1 = out.books.find((b) => b.bookId === 'b1')!
const b2 = out.books.find((b) => b.bookId === 'b2')!
const b3 = out.books.find((b) => b.bookId === 'b3')!

eq('b1.status (1/3 covered, exactly at the threshold)', b1.status, 'in-progress')
eq('b1.chaptersStudied/Total', [b1.chaptersStudied, b1.chaptersTotal], [1, 3])
eq('b1.lessonsEffective (2 covered + 1 partial)', b1.lessonsEffective, 3)
eq('b1.lessonsStudied (lesson marks)', b1.lessonsStudied, 1)
eq('b1.wordsStudied', b1.wordsStudied, 1400)
eq('b1.passes (chapter 1 + lesson 3)', b1.passes, 4)
eq('b1.avgMastery (chapter entry wins when present)', b1.avgMastery, 50)
eq('b1.dueCount (chapter entry overdue only)', b1.dueCount, 1)
eq('b1.nextChapterNumber', b1.nextChapterNumber, 2)
eq('b1.nextChapterTitle', b1.nextChapterTitle, 'Expressions')
eq('b1.lastActivity (most recent entry: 2.1, 2 days ago)', b1.lastActivity, new Date(NOW - 2 * DAY).toISOString())
eq('b1.quizCorrect/Answered (legacy estimate on 2.1)', [b1.quizCorrect, b1.quizAnswered], [1, 5])
eq('b1.quizAccuracy', b1.quizAccuracy, 20)

eq('b2.status (covered by lesson marks, no chapter entry)', b2.status, 'completed')
eq('b2.chaptersStudied/Total', [b2.chaptersStudied, b2.chaptersTotal], [1, 1])
eq('b2.lessonsEffective', b2.lessonsEffective, 2)
eq('b2.wordsStudied', b2.wordsStudied, 400)
eq('b2.avgMastery (lesson parts when no chapter entry)', b2.avgMastery, 30)
eq('b2.quizCorrect/Answered (exact row on 4.1)', [b2.quizCorrect, b2.quizAnswered], [4, 5])
eq('b2.quizAccuracy', b2.quizAccuracy, 80)
eq('b2.nextChapterNumber (completed book)', b2.nextChapterNumber, null)

eq('b3.status', b3.status, 'untouched')
eq('b3.nextChapterNumber', b3.nextChapterNumber, 5)

/* recommendations — order, kind, priority, quota --------------------------- */
eq('recommendation count (b1 quota-capped at 2, b3 untouched, b2 completed)',
  out.recommendations.length, 4)
eq('rec order + kinds',
  out.recommendations.map((r) => `${r.kind}:${r.refId}`),
  ['revise:b1:1', 'practice:b1:2', 'revise:l41', 'revise:l42'])
eq('rec priorities', out.recommendations.map((r) => r.priority), [98, 75, 70, 70])

const r1 = out.recommendations[0]!
eq('R1 (never revised) reason mentions 10 days + once',
  r1.reason.includes('Studied once, never revised — 10 days ago'), true)
eq('R1 url (book anchor)', r1.url, '/book/b1#ch-1')
eq('R1 practiceUrl', r1.practiceUrl, '/practice?book=b1')
eq('R1 carries the ledger fields', [r1.passes, r1.daysSince, r1.mastery], [1, 10, 50])

const r2 = out.recommendations[1]!
eq('R4 (quiz weakness) reason shows honest score 1/5',
  r2.reason.includes('Quiz score 1/5 (20%)'), true)
eq('R4 topic label', r2.topic, 'Chapter 2 · Expressions')

/* R5 was blocked by the b1 quota (2 recs max) — pinned by the count above */
eq('no finish/start/continue leaked into the capped scenario',
  out.recommendations.some((r) => ['finish', 'start', 'continue'].includes(r.kind)), false)

/* ------------------------------------------------------------------ */
/* C. Recommendation rules in isolation (quota removed by small books)  */
/* ------------------------------------------------------------------ */
const loneScenario: ProgressEngineInput = {
  ...input,
  books: [input.books[0]!],
  chapters: input.chapters.filter((c) => c.bookId === 'b1'),
  lessons: [L11, L12, L21, L22, ...L3X],
  entries: [
    /* stale, revised twice → R2 */
    { scope: 'chapter', refId: 'b1:2', passes: 2, mastery: 80, lastAt: NOW - 30 * DAY, dueAt: NOW - 5 * DAY },
    /* never revised → R1 */
    { scope: 'chapter', refId: 'b1:3', passes: 1, mastery: 55, lastAt: NOW - 9 * DAY, dueAt: NOW - 1 * DAY },
    /* weak mastery, fresh → R3 */
    { scope: 'lesson', refId: 'l11', passes: 4, mastery: 25, lastAt: NOW - 1 * DAY, dueAt: NOW + 4 * DAY },
    /* partial chapter 1 → R5 (l11 studied, l12 not) */
  ],
  quizEvents: [],
}
const lone = buildProgress(loneScenario)

/* b1 alone: covered chapters 2 and 3 → 2/3 in-progress; chapter 1 partial */
const b1Lone = lone.books.find((b) => b.bookId === 'b1')!
eq('lone scenario: b1 covered 2/3, chapter 1 partial (1 of 2 lessons)',
  [b1Lone.chaptersStudied, b1Lone.lessonsEffective], [2, 6])
eq('lone scenario: b1 status', b1Lone.status, 'in-progress')

const loneKinds = lone.recommendations.map((r) => `${r.kind}:${r.refId}`)
/* push order: topicCandidates (chapter entries sorted by refId): b1:2, b1:3,
   then orphan lesson l11 → R2, R1, R3; then R5 b1:1 — but b1 quota (2)
   blocks R5? No: R2 (b1:2) → 1, R1 (b1:3) → 2, R3 (l11) → BLOCKED at 2,
   R5 (b1:1) → BLOCKED, R7 start → BLOCKED. After priority sort: R1(88+9=97),
   R2(70+15+6=91)... mastery 80 → (100-80)*0.3=6 → 91. */
eq('lone scenario kinds with the per-book quota', loneKinds, [
  'revise:b1:3',
  'revise:b1:2',
])
eq('R2 priority (stale 30d, mastery 80)', lone.recommendations[1]!.priority, 91)
eq('R2 reason mentions 2 passes + 30 days',
  lone.recommendations[1]!.reason.includes('Revised only 2× and untouched for 30 days'), true)

/* R5/R6/R7 in a fresh single-book scenario with a spare quota */
const finishScenario: ProgressEngineInput = {
  now: NOW,
  chapters: [input.chapters[0]!, input.chapters[3]!],
  lessons: [L11, L12, L41, L42],
  books: [input.books[0]!, input.books[1]!],
  entries: [{ scope: 'lesson', refId: 'l41', passes: 1, mastery: 60, lastAt: NOW - 40 * DAY, dueAt: NOW - 30 * DAY }],
  quizEvents: [],
}
const finish = buildProgress(finishScenario)
const fk = finish.recommendations.map((r) => `${r.kind}:${r.refId}`)
/* b2: 1 of 2 lessons of chapter 4 → 'started' (lesson marks, no covered
   chapter). Push order: R1 on l41 (40 days, passes 1 → priority 128, b2
   quota 1), then R5 finish on b2:4 (quota 2); R6 continue is blocked by
   the quota. b1: untouched → no recs. */
eq('finish scenario: R1 + R5 within the quota', fk, ['revise:l41', 'finish:b2:4'])
eq('finish scenario priorities', finish.recommendations.map((r) => r.priority), [128, 60])
/* raise the quota headroom by removing the lesson entry → chapter 4 fully
   untouched, b2 lastActivity null → NOT stalled → R7 start fires */
const startScenario: ProgressEngineInput = {
  ...finishScenario,
  entries: [],
}
const start = buildProgress(startScenario)
/* both books untouched → no start recommendations (untouched is skipped) */
eq('start scenario: untouched books get no start rec', start.recommendations.length, 0)

/* a started book that IS stalled (14+ days) → R6 continue */
const stalledScenario: ProgressEngineInput = {
  ...finishScenario,
  entries: [{ scope: 'chapter', refId: 'b2:4', passes: 1, mastery: 70, lastAt: NOW - 20 * DAY, dueAt: NOW - 18 * DAY }],
}
const stalled = buildProgress(stalledScenario)
/* b2's chapter is covered → completed → NO book-level continue/start rec;
   but topic-level R1 still fires (revision never stops, even on a completed
   book's stale chapter) — pinned as intended behaviour. */
eq('stalled scenario: completed book gets no continue/start, only topic revise',
  stalled.recommendations.map((r) => `${r.kind}:${r.refId}`), ['revise:b2:4'])

const partialStalled: ProgressEngineInput = {
  ...finishScenario,
  chapters: [input.chapters[0]!, input.chapters[1]!, input.chapters[2]!, input.chapters[3]!],
  lessons: [L11, L12, L21, L22, ...L3X, L41, L42],
  entries: [
    { scope: 'lesson', refId: 'l21', passes: 2, mastery: 50, lastAt: NOW - 20 * DAY, dueAt: NOW - 10 * DAY },
  ],
}
/* b1: chapter 2 partial (1 of 2), last activity 20 days → stalled → R5
   finish (1 of 2 sections) + R6 continue both fire (quota 2, no topic recs:
   l21 passes 2 at 20 days < STALE_DAYS, mastery 50 ≥ WEAK). b2 untouched
   → nothing. Priority: finish 60 > continue 53. */
const stalledOut = buildProgress(partialStalled)
eq('stalled partial book → R5 + R6',
  stalledOut.recommendations.map((r) => `${r.kind}:${r.refId}`), ['finish:b1:2', 'continue:b1:1'])
eq('R6 reason carries the honest left-at',
  stalledOut.recommendations[1]!.reason.includes(
    'Left 0/3 chapters 20 days ago — continue at Chapter 1',
  ), true)

/* ------------------------------------------------------------------ */
/* D. MarkRequest contract — the raw score rides on quiz actions        */
/* ------------------------------------------------------------------ */
import type { MarkRequest } from '../src/lib/revision/types'
const quizReq: MarkRequest = {
  items: [{ scope: 'lesson', refId: 'l41' }],
  action: 'quiz',
  quality: 4,
  score: 4,
  total: 5,
}
eq('MarkRequest carries score/total for quiz actions', quizReq.score, 4)

/* ------------------------------------------------------------------ */
console.log(`\nverify-revision-progress: ${pass} pass / ${fail} fail`)
if (fail > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}
