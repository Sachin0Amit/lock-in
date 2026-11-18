/**
 * Revision & Mastery — the study progress engine (pure, isomorphic).
 *
 * The Progress tab's analysis layer, answering the owner's 2026-11-18
 * directive questions from ledger truth alone:
 *
 *  - what topics have I studied, from which books, revised how many times
 *    (the stored list itself is the ledger — this engine only derives)
 *  - which books are completed / in-progress / just started
 *  - how many questions I have understood (an honest quiz census: exact
 *    rows carry raw score/total, legacy rows are estimated from the
 *    quality ratio and counted separately)
 *  - what I should do next (explainable, priority-ranked recommendations:
 *    never-revised, least-revised, weak mastery, quiz weakness, unfinished
 *    chapters, stalled books, the next untouched chapter)
 *
 * Deterministic, no randomness, no network: every number shown in the UI
 * traces to these functions (pinned by scripts/verify-revision-progress.ts).
 */
import type {
  BookProgress,
  BookProgressStatus,
  CoverageStats,
  QuizStats,
  Recommendation,
} from './types'

/* ------------------------------------------------------------------ */
/* Inputs — plain, serialisable, test-friendly                          */
/* ------------------------------------------------------------------ */

export interface ProgressEntryInput {
  scope: 'chapter' | 'lesson'
  refId: string
  passes: number
  mastery: number
  lastAt: number // epoch ms
  dueAt: number // epoch ms
}

export interface QuizEventInput {
  lessonId: string
  /** null on legacy rows (written before the raw columns existed) */
  score: number | null
  total: number | null
  quality: number | null
}

export interface ProgressChapterInput {
  key: string
  bookId: string
  chapterNumber: number
  chapterTitle: string
  lessonIds: string[]
  words: number
}

export interface ProgressLessonInput {
  id: string
  bookId: string
  chapterNumber: number
  lessonNumber: string
  lessonTitle: string
  words: number
  readMins: number
  quizQuestions: number
}

export interface ProgressBookInput {
  bookId: string
  title: string
  disciplineId: string
  disciplineTitle: string
  accent: [string, string]
  chapterKeys: string[]
  lessonIds: string[]
}

export interface ProgressEngineInput {
  entries: ProgressEntryInput[]
  quizEvents: QuizEventInput[]
  chapters: ProgressChapterInput[]
  lessons: ProgressLessonInput[]
  books: ProgressBookInput[]
  now?: number
}

export interface ProgressEngineOutput {
  coverage: CoverageStats
  quiz: QuizStats
  books: BookProgress[]
  recommendations: Recommendation[]
}

/** Internal recommendation — the plain contract plus the per-book quota key. */
interface RecInternal extends Recommendation {
  bookId: string
}

/* ------------------------------------------------------------------ */
/* Classification thresholds (documented, tested)                       */
/* ------------------------------------------------------------------ */

/** A book counts as "in progress" once a third of its chapters are covered. */
export const IN_PROGRESS_FRACTION = 1 / 3
/** "You studied this once and never revised" — days after the first pass. */
export const NEVER_REVISED_DAYS = 7
/** "Stale" — a studied item untouched for this long deserves a prompt. */
export const STALE_DAYS = 21
/** Weak mastery needs attention below this score. */
export const WEAK_MASTERY = 40
/** Quiz accuracy below this on a chapter → practice questions there. */
export const WEAK_QUIZ_ACCURACY = 60
/** Minimum answered questions before a chapter's quiz accuracy is trusted. */
export const QUIZ_MIN_ANSWERED = 3
/** A book is "stalled" after this many days without any study event. */
export const STALLED_DAYS = 14
/** The engine never shows more than this many recommendations. */
export const MAX_RECOMMENDATIONS = 12
/** At most this many recommendations per book (the engine stays varied). */
export const MAX_PER_BOOK = 2

const DAY_MS = 24 * 3600 * 1000

function daysSince(ts: number, now: number): number {
  return Math.max(0, Math.floor((now - ts) / DAY_MS))
}

/* ------------------------------------------------------------------ */
/* The engine                                                           */
/* ------------------------------------------------------------------ */

/**
 * Book status from honest chapter coverage (all-lessons marks count as a
 * covered chapter). A book with lesson marks but no covered chapter is
 * honestly "started", never "untouched".
 */
export function bookStatus(
  chaptersCovered: number,
  chaptersTotal: number,
  lessonsEffective = 0,
): BookProgressStatus {
  if (chaptersTotal === 0 && lessonsEffective === 0) return 'untouched'
  if (chaptersTotal > 0 && chaptersCovered === chaptersTotal) return 'completed'
  if (chaptersCovered > 0) {
    return chaptersCovered / chaptersTotal >= IN_PROGRESS_FRACTION ? 'in-progress' : 'started'
  }
  return lessonsEffective > 0 ? 'started' : 'untouched'
}

/**
 * One quiz event → { correct, answered } using raw counts when present,
 * else the honest legacy estimate: quality ratio × the lesson's quiz
 * question count (a null quality contributes only its total — quiz
 * writes always carry quality, this only guards corrupt rows).
 */
export function quizEventParts(
  ev: QuizEventInput,
  lesson: ProgressLessonInput | undefined,
): { correct: number; answered: number; exact: boolean } {
  if (ev.score !== null && ev.total !== null && ev.total > 0) {
    const score = Math.max(0, Math.min(ev.score, ev.total))
    return { correct: score, answered: ev.total, exact: true }
  }
  const total = lesson?.quizQuestions ?? 0
  if (total <= 0) return { correct: 0, answered: 0, exact: false }
  const ratio = ev.quality !== null ? Math.max(0, Math.min(5, ev.quality)) / 5 : 0
  return { correct: Math.round(ratio * total), answered: total, exact: false }
}

export function buildProgress(input: ProgressEngineInput): ProgressEngineOutput {
  const now = input.now ?? Date.now()

  const chapterEntries = new Map<string, ProgressEntryInput>()
  const lessonEntries = new Map<string, ProgressEntryInput>()
  for (const e of input.entries) {
    if (e.scope === 'chapter') chapterEntries.set(e.refId, e)
    else lessonEntries.set(e.refId, e)
  }

  const chapterByKey = new Map(input.chapters.map((c) => [c.key, c]))
  const lessonById = new Map(input.lessons.map((l) => [l.id, l]))

  /* ---------------- quiz census (per lesson, then rolled up) -------- */
  const quizByLesson = new Map<string, { correct: number; answered: number }>()
  let quizEvents = 0
  let quizExact = 0
  let quizEstimated = 0
  for (const ev of input.quizEvents) {
    const parts = quizEventParts(ev, lessonById.get(ev.lessonId))
    quizEvents++
    if (parts.exact) quizExact++
    else if (parts.answered > 0) quizEstimated++
    const agg = quizByLesson.get(ev.lessonId) ?? { correct: 0, answered: 0 }
    agg.correct += parts.correct
    agg.answered += parts.answered
    quizByLesson.set(ev.lessonId, agg)
  }
  let quizAnswered = 0
  let quizUnderstood = 0
  for (const agg of quizByLesson.values()) {
    quizAnswered += agg.answered
    quizUnderstood += agg.correct
  }
  const quiz: QuizStats = {
    events: quizEvents,
    exact: quizExact,
    estimated: quizEstimated,
    answered: quizAnswered,
    understood: quizUnderstood,
    accuracy: quizAnswered > 0 ? Math.round((quizUnderstood / quizAnswered) * 1000) / 10 : null,
    quizLessons: quizByLesson.size,
  }

  /* ---------------- per-book rows (zeros included) ------------------ */
  const books: BookProgress[] = []
  for (const b of input.books) {
    const chapters = input.chapters.filter((c) => c.bookId === b.bookId)
    let chaptersStudied = 0
    let lessonsStudied = 0
    let lessonsEffective = 0
    let wordsStudied = 0
    let readMinsStudied = 0
    const coveredChapterKeys = new Set<string>()
    let lastActivity: number | null = null
    const bookChapterEntries: ProgressEntryInput[] = []
    const bookLessonEntries: ProgressEntryInput[] = []

    for (const ch of chapters) {
      const entry = chapterEntries.get(ch.key)
      const lessonsMarked = ch.lessonIds.reduce((n, id) => n + (lessonEntries.has(id) ? 1 : 0), 0)
      const covered =
        !!entry || (ch.lessonIds.length > 0 && lessonsMarked === ch.lessonIds.length)
      if (covered) {
        chaptersStudied++
        coveredChapterKeys.add(ch.key)
        lessonsEffective += ch.lessonIds.length
        wordsStudied += ch.words
        readMinsStudied += ch.lessonIds.reduce((n, id) => n + (lessonById.get(id)?.readMins ?? 0), 0)
      } else {
        lessonsEffective += lessonsMarked
        for (const id of ch.lessonIds) {
          if (lessonEntries.has(id)) {
            const l = lessonById.get(id)
            if (l) {
              wordsStudied += l.words
              readMinsStudied += l.readMins
            }
          }
        }
      }
      lessonsStudied += lessonsMarked
      if (entry) {
        bookChapterEntries.push(entry)
        lastActivity = maxTs(lastActivity, entry.lastAt)
      }
      for (const id of ch.lessonIds) {
        const l = lessonEntries.get(id)
        if (l) {
          bookLessonEntries.push(l)
          lastActivity = maxTs(lastActivity, l.lastAt)
        }
      }
    }

    let quizCorrect = 0
    let bookQuizAnswered = 0
    for (const lessonId of b.lessonIds) {
      const agg = quizByLesson.get(lessonId)
      if (agg) {
        quizCorrect += agg.correct
        bookQuizAnswered += agg.answered
      }
    }

    const masteryParts = bookChapterEntries.length
      ? bookChapterEntries.map((e) => e.mastery)
      : bookLessonEntries.map((e) => e.mastery)
    const passes =
      bookChapterEntries.reduce((n, e) => n + e.passes, 0) +
      bookLessonEntries.reduce((n, e) => n + e.passes, 0)

    const status = bookStatus(chaptersStudied, chapters.length, lessonsEffective)

    /* the honest "continue here": lowest-numbered chapter not yet covered */
    const nextChapter = chapters
      .filter((ch) => !coveredChapterKeys.has(ch.key))
      .sort((a, z) => a.chapterNumber - z.chapterNumber)[0]

    const dueCount = [...bookChapterEntries, ...bookLessonEntries].filter(
      (e) => e.dueAt <= now,
    ).length

    books.push({
      bookId: b.bookId,
      title: b.title,
      accent: b.accent,
      disciplineId: b.disciplineId,
      disciplineTitle: b.disciplineTitle,
      status,
      chaptersStudied,
      chaptersTotal: chapters.length,
      lessonsStudied,
      lessonsEffective: Math.min(lessonsEffective, b.lessonIds.length),
      lessonsTotal: b.lessonIds.length,
      quizCorrect,
      quizAnswered: bookQuizAnswered,
      quizAccuracy: bookQuizAnswered > 0 ? Math.round((quizCorrect / bookQuizAnswered) * 100) : null,
      avgMastery: masteryParts.length
        ? Math.round(masteryParts.reduce((n, m) => n + m, 0) / masteryParts.length)
        : 0,
      passes,
      dueCount,
      wordsStudied,
      lastActivity: lastActivity === null ? null : new Date(lastActivity).toISOString(),
      nextChapterNumber: nextChapter?.chapterNumber ?? null,
      nextChapterTitle: nextChapter?.chapterTitle ?? null,
      url: `/book/${b.bookId}`,
    })
  }

  /* ---------------- whole-library coverage -------------------------- */
  const coverage: CoverageStats = {
    topicsStudied: chapterEntries.size + lessonEntries.size,
    chaptersStudied: chapterEntries.size,
    lessonsStudied: lessonEntries.size,
    chaptersTotal: input.chapters.length,
    lessonsTotal: input.lessons.length,
    booksCompleted: books.filter((b) => b.status === 'completed').length,
    booksInProgress: books.filter((b) => b.status === 'in-progress').length,
    booksStarted: books.filter((b) => b.status === 'started').length,
    booksTotal: books.length,
    wordsStudied: books.reduce((n, b) => n + b.wordsStudied, 0),
    readMins: 0,
    totalPasses: input.entries.reduce((n, e) => n + e.passes, 0),
  }
  /* readMins with the same dedup discipline as words: a covered chapter
     subsumes its lessons; orphan lesson marks add their own minutes */
  {
    let readMins = 0
    const coveredChapters = new Set<string>()
    for (const e of input.entries) {
      if (e.scope === 'chapter') {
        const ch = chapterByKey.get(e.refId)
        if (ch) {
          coveredChapters.add(ch.key)
          readMins += ch.lessonIds.reduce((n, id) => n + (lessonById.get(id)?.readMins ?? 0), 0)
        }
      }
    }
    for (const e of input.entries) {
      if (e.scope !== 'lesson') continue
      const l = lessonById.get(e.refId)
      if (l && !coveredChapters.has(`${l.bookId}:${l.chapterNumber}`)) readMins += l.readMins
    }
    coverage.readMins = readMins
  }

  /* ---------------- recommendations --------------------------------- */
  const recs: RecInternal[] = []
  const seen = new Set<string>()
  const perBook = new Map<string, number>()

  const push = (r: RecInternal) => {
    if (seen.has(r.id)) return
    if ((perBook.get(r.bookId) ?? 0) >= MAX_PER_BOOK) return
    seen.add(r.id)
    perBook.set(r.bookId, (perBook.get(r.bookId) ?? 0) + 1)
    recs.push(r)
  }

  /* chapter entries first (a chapter rec subsumes its lessons), then
     orphan lesson entries whose chapter is not itself tracked */
  const topicCandidates: ProgressEntryInput[] = [
    ...[...chapterEntries.values()].sort((a, b) => a.refId.localeCompare(b.refId)),
    ...[...lessonEntries.values()].filter((e) => {
      const l = lessonById.get(e.refId)
      return l ? !chapterEntries.has(`${l.bookId}:${l.chapterNumber}`) : false
    }),
  ]

  for (const e of topicCandidates) {
    const isChapter = e.scope === 'chapter'
    const meta = isChapter ? chapterByKey.get(e.refId) : lessonById.get(e.refId)
    if (!meta) continue
    const bookId = meta.bookId
    const book = books.find((x) => x.bookId === bookId)
    if (!book) continue
    const ds = daysSince(e.lastAt, now)
    const topic = isChapter
      ? `Chapter ${(meta as ProgressChapterInput).chapterNumber} · ${(meta as ProgressChapterInput).chapterTitle}`
      : `${(meta as ProgressLessonInput).lessonNumber} · ${(meta as ProgressLessonInput).lessonTitle}`
    const url = isChapter
      ? `/book/${(meta as ProgressChapterInput).bookId}#ch-${(meta as ProgressChapterInput).chapterNumber}`
      : `/book/${(meta as ProgressLessonInput).bookId}/lesson/${e.refId}`

    /* R1 — studied once, never revised */
    if (e.passes === 1 && ds >= NEVER_REVISED_DAYS) {
      push({
        id: `revise:${e.scope}:${e.refId}`,
        kind: 'revise',
        priority: Math.round(88 + Math.min(ds, 40)),
        topic,
        bookTitle: book.title,
        reason: `Studied once, never revised — ${ds} days ago. Revise it now before the memory fades further.`,
        url,
        practiceUrl: practiceUrlOf(bookId),
        scope: e.scope,
        refId: e.refId,
        passes: e.passes,
        daysSince: ds,
        mastery: e.mastery,
        bookId,
      })
      continue
    }

    /* R2 — least revised: few passes AND stale */
    if (e.passes <= 2 && ds >= STALE_DAYS) {
      push({
        id: `revise:${e.scope}:${e.refId}`,
        kind: 'revise',
        priority: Math.round(70 + Math.min(ds, 60) * 0.5 + (100 - e.mastery) * 0.3),
        topic,
        bookTitle: book.title,
        reason: `Revised only ${e.passes}× and untouched for ${ds} days — among your least-revised topics.`,
        url,
        practiceUrl: practiceUrlOf(bookId),
        scope: e.scope,
        refId: e.refId,
        passes: e.passes,
        daysSince: ds,
        mastery: e.mastery,
        bookId,
      })
      continue
    }

    /* R3 — weak mastery */
    if (e.mastery < WEAK_MASTERY) {
      push({
        id: `revise:${e.scope}:${e.refId}`,
        kind: 'revise',
        priority: Math.round(60 + (WEAK_MASTERY - e.mastery)),
        topic,
        bookTitle: book.title,
        reason: `Mastery is still ${e.mastery}/100 after ${e.passes} pass${e.passes === 1 ? '' : 'es'} — revise, then answer a few questions on it.`,
        url,
        practiceUrl: practiceUrlOf(bookId),
        scope: e.scope,
        refId: e.refId,
        passes: e.passes,
        daysSince: ds,
        mastery: e.mastery,
        bookId,
      })
    }
  }

  /* R4 — quiz weakness per chapter (answered enough to trust) */
  for (const ch of input.chapters) {
    const book = books.find((x) => x.bookId === ch.bookId)
    if (!book) continue
    let correct = 0
    let answered = 0
    for (const lessonId of ch.lessonIds) {
      const agg = quizByLesson.get(lessonId)
      if (agg) {
        correct += agg.correct
        answered += agg.answered
      }
    }
    if (answered < QUIZ_MIN_ANSWERED) continue
    const accuracy = (correct / answered) * 100
    if (accuracy < WEAK_QUIZ_ACCURACY) {
      push({
        id: `practice:chapter:${ch.key}`,
        kind: 'practice',
        priority: Math.round(55 + (WEAK_QUIZ_ACCURACY - accuracy) * 0.5),
        topic: `Chapter ${ch.chapterNumber} · ${ch.chapterTitle}`,
        bookTitle: book.title,
        reason: `Quiz score ${correct}/${answered} (${Math.round(accuracy)}%) — practice a few questions on this chapter.`,
        url: `/book/${ch.bookId}#ch-${ch.chapterNumber}`,
        practiceUrl: practiceUrlOf(ch.bookId),
        scope: 'chapter',
        refId: ch.key,
        passes: null,
        daysSince: null,
        mastery: null,
        bookId: ch.bookId,
      })
    }
  }

  /* R5 — unfinished chapters (some sections studied, chapter not covered) */
  for (const ch of input.chapters) {
    const book = books.find((x) => x.bookId === ch.bookId)
    if (!book || chapterEntries.has(ch.key)) continue
    const lessonsMarked = ch.lessonIds.reduce(
      (n, id) => n + (lessonEntries.has(id) ? 1 : 0),
      0,
    )
    if (lessonsMarked === 0 || lessonsMarked === ch.lessonIds.length) continue
    push({
      id: `finish:chapter:${ch.key}`,
      kind: 'finish',
      priority: Math.round(50 + (lessonsMarked / Math.max(1, ch.lessonIds.length)) * 20),
      topic: `Chapter ${ch.chapterNumber} · ${ch.chapterTitle}`,
      bookTitle: book.title,
      reason: `${lessonsMarked} of ${ch.lessonIds.length} sections studied — finish the chapter to close it.`,
      url: `/book/${ch.bookId}#ch-${ch.chapterNumber}`,
      practiceUrl: null,
      scope: 'chapter',
      refId: ch.key,
      passes: null,
      daysSince: null,
      mastery: null,
      bookId: ch.bookId,
    })
  }

  /* R6 — stalled books; R7 — the next untouched chapter of an active book */
  for (const b of books) {
    if (b.status === 'completed' || b.status === 'untouched') continue
    if (b.nextChapterNumber === null || b.nextChapterTitle === null) continue
    const lastTs = b.lastActivity ? new Date(b.lastActivity).getTime() : null
    const since = lastTs === null ? 0 : daysSince(lastTs, now)
    if (lastTs !== null && since >= STALLED_DAYS) {
      push({
        id: `continue:book:${b.bookId}`,
        kind: 'continue',
        priority: Math.round(45 + Math.min(since, 90) * 0.4),
        topic: `${b.title} · Chapter ${b.nextChapterNumber}`,
        bookTitle: b.title,
        reason: `Left ${b.chaptersStudied}/${b.chaptersTotal} chapters ${since} days ago — continue at Chapter ${b.nextChapterNumber}.`,
        url: `/book/${b.bookId}#ch-${b.nextChapterNumber}`,
        practiceUrl: null,
        scope: 'chapter',
        refId: `${b.bookId}:${b.nextChapterNumber}`,
        passes: null,
        daysSince: null,
        mastery: null,
        bookId: b.bookId,
      })
    } else {
      push({
        id: `start:chapter:${b.bookId}:${b.nextChapterNumber}`,
        kind: 'start',
        priority: Math.round(35 + (b.chaptersStudied / Math.max(1, b.chaptersTotal)) * 10),
        topic: `Chapter ${b.nextChapterNumber} · ${b.nextChapterTitle}`,
        bookTitle: b.title,
        reason: `The next step in ${b.title} — ${b.chaptersStudied}/${b.chaptersTotal} chapters studied so far.`,
        url: `/book/${b.bookId}#ch-${b.nextChapterNumber}`,
        practiceUrl: null,
        scope: 'chapter',
        refId: `${b.bookId}:${b.nextChapterNumber}`,
        passes: null,
        daysSince: null,
        mastery: null,
        bookId: b.bookId,
      })
    }
  }

  recs.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))

  /* strip the internal quota key before returning the public contract */
  const recommendations: Recommendation[] = recs
    .slice(0, MAX_RECOMMENDATIONS)
    .map(({ bookId: _bookId, ...r }) => r)

  return { coverage, quiz, books, recommendations }
}

/* ------------------------------------------------------------------ */

function maxTs(a: number | null, b: number): number {
  return a === null ? b : Math.max(a, b)
}

function practiceUrlOf(bookId: string): string {
  return `/practice?book=${encodeURIComponent(bookId)}`
}
