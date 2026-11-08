/**
 * Practice — the practice service (server only).
 *
 * Assembles everything the /practice hub needs: deterministic mock-exam
 * papers and adaptive drills generated from the written library, honest
 * server-side grading with per-chapter weakness breakdowns (wrong answers
 * feed the Mistake Bank; per-lesson quality signals feed the study ledger
 * exactly like reader quizzes do), attempt history, and the readiness
 * read model (coverage × mastery × freshness per book and per exam
 * preset scope).
 *
 * Honest-data rules (same spirit as the ledger service):
 *  - papers are regenerated deterministically from presetKey + seed;
 *    attempts store answers and derived numbers only;
 *  - exam formats are approximate and labelled; scopes are provisional
 *    chapter maps over the WRITTEN library;
 *  - every number shown traces to the engine's pure functions.
 */
import { db } from '@/lib/db'
import { CATALOG } from '@/lib/builder/catalog'
import {
  EXAM_PRESETS,
  findExamPreset,
  presetMarking,
  presetQuestionCount,
} from '@/data/exams/presets'
import { computeRisk, scoreQueueItem, type QueueCandidate } from '@/lib/revision/srs'
import { markStudy } from '@/lib/revision/ledger-service'
import { findPracticeQuestions, questionsInScope } from './questions'
import {
  aggregateReadiness,
  chapterBreakdown,
  computeChapterReadiness,
  generatePaper,
  scorePaper,
  type ChapterInput,
  type TrackedInput,
} from './engine'
import { recordMistakes } from './mistake-service'
import type {
  AnswerOutcome,
  AttemptView,
  BookReadiness,
  ChapterReadiness,
  ExamPresetView,
  ExamReadiness,
  FocusChapter,
  PaperMeta,
  PaperResponse,
  PracticeQuestion,
  ReadinessResponse,
  SubmitRequest,
  SubmitResponse,
} from './types'

const DRILL_PRESET_KEYS = new Set(['drill:auto', 'drill:library'])

export class BadInput extends Error {}

/* ------------------------------------------------------------------ */
/* Scope resolution                                                    */
/* ------------------------------------------------------------------ */

type ScopeChapter = ChapterInput

function catalogChapterInputs(): ScopeChapter[] {
  return CATALOG.chapters
    .filter((ch) => ch.lessonRecordIds.length > 0)
    .map((ch) => ({
      key: ch.key,
      bookId: ch.bookId,
      bookTitle: ch.bookTitle,
      chapterNumber: ch.chapterNumber,
      chapterTitle: ch.chapterTitle,
      lessonsTotal: ch.lessonRecordIds.length,
    }))
}

function resolveScope(scope: '*' | string[]): ScopeChapter[] {
  const all = catalogChapterInputs()
  if (scope === '*') return all
  const wanted = new Set(scope)
  return all.filter((c) => wanted.has(c.key))
}

export function presetView(presetKey: string): ExamPresetView | null {
  const p = findExamPreset(presetKey)
  if (!p) return null
  const { marks, negative } = presetMarking(p)
  return {
    key: p.key,
    name: p.name,
    region: p.region,
    category: p.category,
    formatNote: p.formatNote,
    scopeStatus: p.scopeStatus,
    durationMins: p.durationMins,
    questionCount: presetQuestionCount(p),
    marks,
    negative,
    caveats: p.caveats,
  }
}

/* ------------------------------------------------------------------ */
/* Paper generation                                                    */
/* ------------------------------------------------------------------ */

export interface DrillRequest {
  focus: 'auto' | 'book' | 'library'
  bookId?: string
  count?: number
  seed?: number
}

/** Ledger-driven adaptive focus: the top urgent chapters, with reasons. */
async function autoFocusChapters(userId: string): Promise<{
  chapters: ScopeChapter[]
  focus: FocusChapter[]
  fallback: boolean
}> {
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const chapterRows = new Map<string, (typeof entries)[number]>()
  const lessonRows = new Map<string, (typeof entries)[number]>()
  for (const e of entries) {
    if (e.scope === 'chapter') chapterRows.set(e.refId, e)
    else lessonRows.set(e.refId, e)
  }

  const now = Date.now()
  const all = catalogChapterInputs()
  const candidates: (QueueCandidate & { chapter: ScopeChapter })[] = []

  for (const ch of all) {
    const chapterEntry = chapterRows.get(ch.key)
    const catalogChapter = CATALOG.chapters.find((c) => c.key === ch.key)
    const chLessons = (catalogChapter?.lessonRecordIds ?? [])
      .map((id) => lessonRows.get(id))
      .filter((e): e is (typeof entries)[number] => !!e)
    if (chapterEntry) {
      candidates.push({
        scope: 'chapter',
        refId: ch.key,
        passes: chapterEntry.passes,
        mastery: Math.round(chapterEntry.mastery),
        risk: computeRisk(chapterEntry.lastAt.getTime(), chapterEntry.intervalDays, now),
        overdueDays: Math.max(
          0,
          Math.floor((now - chapterEntry.dueAt.getTime()) / 86400000),
        ),
        daysSince: Math.max(0, Math.floor((now - chapterEntry.lastAt.getTime()) / 86400000)),
        dueAt: chapterEntry.dueAt.getTime(),
        intervalDays: chapterEntry.intervalDays,
        readMins: 0,
        label: `${ch.bookTitle} — Ch ${ch.chapterNumber} · ${ch.chapterTitle}`,
        chapter: ch,
      })
    } else if (chLessons.length > 0) {
      /* orphan lessons: aggregate to the chapter, weaker wins */
      const mastery =
        chLessons.reduce((n, e) => n + e.mastery, 0) / chLessons.length
      const risk =
        chLessons.reduce(
          (n, e) => n + computeRisk(e.lastAt.getTime(), e.intervalDays, now),
          0,
        ) / chLessons.length
      const lastAt = Math.min(...chLessons.map((e) => e.lastAt.getTime()))
      const dueAt = Math.min(...chLessons.map((e) => e.dueAt.getTime()))
      const interval = Math.max(1, ...chLessons.map((e) => e.intervalDays))
      candidates.push({
        scope: 'chapter',
        refId: ch.key,
        passes: Math.round(
          chLessons.reduce((n, e) => n + e.passes, 0) / chLessons.length,
        ),
        mastery: Math.round(mastery),
        risk: Math.round(risk),
        overdueDays: Math.max(0, Math.floor((now - dueAt) / 86400000)),
        daysSince: Math.max(0, Math.floor((now - lastAt) / 86400000)),
        dueAt,
        intervalDays: interval,
        readMins: 0,
        label: `${ch.bookTitle} — Ch ${ch.chapterNumber} · ${ch.chapterTitle}`,
        chapter: ch,
      })
    }
  }

  if (candidates.length === 0) {
    return { chapters: all, focus: [], fallback: true }
  }

  const ranked = candidates
    .map((c) => ({ ...c, ...scoreQueueItem(c, now) }))
    .sort((a, b) => b.urgency - a.urgency || a.label.localeCompare(b.label))

  const top = ranked.slice(0, 5)
  return {
    chapters: top.map((c) => c.chapter),
    focus: top.map((c) => ({
      key: c.chapter.key,
      title: `${c.chapter.bookTitle} ch. ${c.chapter.chapterNumber} · ${c.chapter.chapterTitle}`,
      reason: c.reason,
    })),
    fallback: false,
  }
}

export async function buildExamPaper(
  userId: void,
  presetKey: string,
  seed?: number,
): Promise<PaperResponse> {
  void userId
  const preset = findExamPreset(presetKey)
  if (!preset) throw new BadInput(`unknown exam preset: ${presetKey}`)

  const scope = resolveScope(preset.scope)
  if (scope.length === 0) throw new BadInput('preset scope resolved to no written chapters')

  const questions = questionsInScope(new Set(scope.map((c) => c.key)))
  const mcqCount = questions.filter((q) => q.kind === 'mcq').length
  const wanted = presetQuestionCount(preset)
  if (mcqCount === 0) throw new BadInput('no MCQ questions available in scope')

  const useSeed = seed ?? Math.floor(Math.random() * 2 ** 31)
  const paper = generatePaper({
    questions,
    count: wanted,
    seed: useSeed,
    mcqOnly: true,
  })

  const meta: PaperMeta = {
    seed: useSeed,
    presetKey: preset.key,
    kind: 'exam',
    scopeChapters: scope.length,
    questionCount: paper.length,
  }
  return { paper, meta, preset: presetView(preset.key) }
}

export async function buildDrillPaper(
  userId: string,
  req: DrillRequest,
): Promise<PaperResponse> {
  const count = Math.max(5, Math.min(req.count ?? 10, 30))
  const useSeed = req.seed ?? Math.floor(Math.random() * 2 ** 31)
  let chapters: ScopeChapter[]
  let focus: FocusChapter[] | undefined
  let presetKey: string

  if (req.focus === 'auto') {
    const auto = await autoFocusChapters(userId)
    chapters = auto.chapters
    focus = auto.fallback
      ? [
          {
            key: '*',
            title: 'Whole library',
            reason: 'Nothing studied yet — the drill draws from every written chapter.',
          },
        ]
      : auto.focus
    presetKey = 'drill:auto'
  } else if (req.focus === 'book') {
    const book = CATALOG.bookById.get(req.bookId ?? '')
    if (!book) throw new BadInput(`unknown bookId: ${req.bookId}`)
    chapters = catalogChapterInputs().filter((c) => c.bookId === book.bookId)
    if (chapters.length === 0) throw new BadInput('book has no written chapters')
    presetKey = `drill:book:${book.bookId}`
  } else {
    chapters = catalogChapterInputs()
    presetKey = 'drill:library'
  }

  const questions = questionsInScope(new Set(chapters.map((c) => c.key)))
  if (questions.length === 0) throw new BadInput('no questions available in scope')

  const paper = generatePaper({ questions, count, seed: useSeed, mcqOnly: false })
  const meta: PaperMeta = {
    seed: useSeed,
    presetKey,
    kind: 'drill',
    scopeChapters: chapters.length,
    questionCount: paper.length,
    focusChapters: focus,
  }
  return { paper, meta, preset: null }
}

/* ------------------------------------------------------------------ */
/* Submit — grade, persist, feed mistakes + ledger                     */
/* ------------------------------------------------------------------ */

export async function submitAttempt(userId: string, req: SubmitRequest): Promise<SubmitResponse> {
  if (req.kind !== 'exam' && req.kind !== 'drill') throw new BadInput('kind must be exam|drill')
  if (!Array.isArray(req.answers)) throw new BadInput('answers must be an array')
  if (req.answers.length > 200) throw new BadInput('too many answers (max 200)')
  if (typeof req.secs !== 'number' || req.secs < 0 || req.secs > 6 * 3600) {
    throw new BadInput('secs out of range')
  }

  const ids = req.answers.map((a) => a.questionId)
  const found = findPracticeQuestions(ids)

  const questions: PracticeQuestion[] = []
  for (const id of ids) {
    const q = found.get(id)
    if (!q) throw new BadInput(`unknown questionId: ${id}`)
    questions.push(q)
  }
  if (questions.length === 0) throw new BadInput('no answers submitted')

  const marking =
    req.kind === 'exam'
      ? (() => {
          const preset = findExamPreset(req.presetKey)
          if (!preset) throw new BadInput(`unknown exam preset: ${req.presetKey}`)
          return presetMarking(preset)
        })()
      : { marks: 1, negative: 0 }

  const { results, score, maxScore, correctCount, wrongCount, skippedCount } = scorePaper(
    questions,
    req.answers,
    marking,
  )
  const breakdown = chapterBreakdown(results)

  /* wrong answers → the Mistake Bank (same stable question keys) */
  const mistakeItems = results
    .filter((r) => r.outcome === 'wrong' || r.outcome === 'self-wrong')
    .map((r) => ({
      source: (r.kind === 'mcq' ? 'quiz' : 'exercise') as 'quiz' | 'exercise',
      lessonId: r.lessonId,
      questionKey: r.id,
      prompt: r.prompt,
      given:
        r.outcome === 'wrong' && r.options && r.chosen !== undefined
          ? (r.options[r.chosen] ?? '')
          : 'self-reported miss',
      expected: r.answerText ?? '',
      explain: r.explain ?? '',
    }))
  const mistakesAdded = await recordMistakes(userId, mistakeItems)

  /* per-lesson quiz-quality signals — same path as reader quizzes */
  const byLesson = new Map<string, { correct: number; answered: number }>()
  for (const r of results) {
    if (r.outcome === 'skipped') continue
    const agg = byLesson.get(r.lessonId) ?? { correct: 0, answered: 0 }
    agg.answered++
    if (r.outcome === 'correct' || r.outcome === 'self-right') agg.correct++
    byLesson.set(r.lessonId, agg)
  }
  const lessons = CATALOG.lessonById
  const signalItems = [...byLesson.entries()]
    .filter(([id]) => lessons.has(id))
    .map(([id, agg]) => {
      const quality = Math.max(0, Math.min(5, Math.round((agg.correct / agg.answered) * 5)))
      return { scope: 'lesson' as const, refId: id, quality, kind: 'quiz' as const }
    })
  let ledgerSignals = 0
  for (const item of signalItems) {
    try {
      await markStudy(userId, {
        items: [{ scope: item.scope, refId: item.refId }],
        action: 'quiz',
        quality: item.quality,
        kind: 'quiz',
      })
      ledgerSignals++
    } catch {
      /* ledger failures never fail the submit */
    }
  }

  const meta = {
    seed: req.seed,
    questionIds: ids,
    scopeSize: 0,
    focusChapters: [] as FocusChapter[],
  }
  const attempt = await db.practiceAttempt.create({
    data: {
      userId,
      kind: req.kind,
      presetKey: req.presetKey,
      meta: JSON.stringify(meta),
      results: JSON.stringify(
        req.answers.map((a) => {
          const r = results.find((q) => q.id === a.questionId)
          return {
            questionId: a.questionId,
            chosen: a.chosen,
            selfWrong: a.selfWrong,
            selfRight: a.selfRight,
            correct: r?.outcome === 'correct' || r?.outcome === 'self-right',
            chapterKey: r?.chapterKey ?? '',
          }
        }),
      ),
      score,
      maxScore,
      secs: Math.round(req.secs),
    },
  })

  const percent = maxScore > 0 ? Math.round((Math.max(0, score) / maxScore) * 100) : 0
  return {
    attemptId: attempt.id,
    score,
    maxScore,
    percent,
    correctCount,
    wrongCount,
    skippedCount,
    secs: Math.round(req.secs),
    breakdown,
    questions: results,
    mistakesAdded,
    ledgerSignals,
  }
}

/* ------------------------------------------------------------------ */
/* Attempt history                                                     */
/* ------------------------------------------------------------------ */

function drillPresetName(presetKey: string): string {
  if (presetKey === 'drill:auto') return 'Adaptive drill'
  if (presetKey === 'drill:library') return 'Library drill'
  if (presetKey.startsWith('drill:book:')) {
    const bookId = presetKey.slice('drill:book:'.length)
    const book = CATALOG.bookById.get(bookId)
    return book ? `Drill · ${book.title}` : 'Book drill'
  }
  return presetKey
}

export async function listAttempts(userId: string, take = 20): Promise<AttemptView[]> {
  const rows = await db.practiceAttempt.findMany({
    where: { userId },
    orderBy: { finishedAt: 'desc' },
    take,
  })
  return rows.map((r) => {
    let correctCount = 0
    let total = 0
    try {
      const parsed = JSON.parse(r.results) as {
        correct: boolean
      }[]
      total = parsed.length
      correctCount = parsed.filter((p) => p.correct).length
    } catch {
      /* honest zero when unparsable */
    }
    const presetName = findExamPreset(r.presetKey)
      ? findExamPreset(r.presetKey)!.name
      : drillPresetName(r.presetKey)
    const percent = r.maxScore > 0 ? Math.round((Math.max(0, r.score) / r.maxScore) * 100) : 0
    return {
      id: r.id,
      kind: (r.kind === 'exam' ? 'exam' : 'drill') as 'exam' | 'drill',
      presetKey: r.presetKey,
      presetName,
      score: r.score,
      maxScore: r.maxScore,
      percent,
      correctCount,
      total,
      secs: r.secs,
      finishedAt: r.finishedAt.toISOString(),
    }
  })
}

/* ------------------------------------------------------------------ */
/* Readiness                                                           */
/* ------------------------------------------------------------------ */

export async function getReadiness(userId: string): Promise<ReadinessResponse> {
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const now = Date.now()
  const chapterRows = new Map<string, (typeof entries)[number]>()
  const lessonRowsByChapter = new Map<string, { mastery: number; risk: number }[]>()

  for (const e of entries) {
    if (e.scope === 'chapter') {
      chapterRows.set(e.refId, e)
    } else {
      const l = CATALOG.lessonById.get(e.refId)
      if (!l) continue
      const key = `${l.bookId}:${l.chapterNumber}`
      const list = lessonRowsByChapter.get(key) ?? []
      list.push({
        mastery: e.mastery,
        risk: computeRisk(e.lastAt.getTime(), e.intervalDays, now),
      })
      lessonRowsByChapter.set(key, list)
    }
  }

  const toTracked = (e: (typeof entries)[number]): TrackedInput => ({
    mastery: e.mastery,
    risk: computeRisk(e.lastAt.getTime(), e.intervalDays, now),
  })

  const allChapters = catalogChapterInputs()
  const readinessByChapter = new Map<string, ChapterReadiness>()
  for (const ch of allChapters) {
    const chapterEntry = chapterRows.get(ch.key) ?? null
    const lessonEntries = lessonRowsByChapter.get(ch.key) ?? []
    readinessByChapter.set(
      ch.key,
      computeChapterReadiness(
        ch,
        chapterEntry ? toTracked(chapterEntry) : null,
        lessonEntries,
      ),
    )
  }

  const books: BookReadiness[] = CATALOG.books.map((b) => {
    const chapters = b.chapterKeys
      .map((k) => readinessByChapter.get(k))
      .filter((c): c is ChapterReadiness => !!c)
    const agg = aggregateReadiness(chapters)
    return {
      bookId: b.bookId,
      title: b.title,
      accent: b.accent,
      status: b.status,
      chapters,
      ...agg,
    }
  })

  const library = aggregateReadiness([...readinessByChapter.values()])

  const exams: ExamReadiness[] = EXAM_PRESETS.map((p) => {
    const scope = resolveScope(p.scope)
    const chapters = scope
      .map((c) => readinessByChapter.get(c.key))
      .filter((c): c is ChapterReadiness => !!c)
    const agg = aggregateReadiness(chapters)
    return {
      presetKey: p.key,
      name: p.name,
      region: p.region,
      category: p.category,
      durationMins: p.durationMins,
      questionCount: presetQuestionCount(p),
      scopeChapters: chapters.length,
      ...agg,
      caveats: p.caveats,
      formatNote: p.formatNote,
    }
  })

  return {
    library,
    books,
    exams,
    presets: EXAM_PRESETS.map((p) => presetView(p.key)).filter((p): p is ExamPresetView => !!p),
  }
}

export { DRILL_PRESET_KEYS }
