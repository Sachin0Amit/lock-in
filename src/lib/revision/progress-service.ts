/**
 * Revision & Mastery — the progress service (server only).
 *
 * Assembles the Progress tab read model (owner directive 2026-11-18):
 * feeds the ledger rows + quiz events + the catalog into the pure
 * progress engine, and lifts the stored topic list into the same
 * EntryView contract the Overview uses. Nothing invented: every number
 * shown traces to the engine's verified formulas.
 */
import { db } from '@/lib/db'
import { CATALOG } from '@/lib/builder/catalog'
import { buildProgress } from './progress-engine'
import { toChapterView, toLessonView, type EntryRow } from './ledger-service'
import type { EntryView, ProgressResponse } from './types'

export async function getProgress(userId: string): Promise<ProgressResponse> {
  const now = Date.now()
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const quizEventRows = await db.studyEvent.findMany({
    where: { userId, kind: 'quiz' },
    select: {
      quizScore: true,
      quizTotal: true,
      quality: true,
      entry: { select: { scope: true, refId: true } },
    },
  })

  /* lessons studied per chapter key (for the chapter view rows) */
  const lessonsStudiedByChapter = new Map<string, number>()
  for (const e of entries) {
    if (e.scope !== 'lesson') continue
    const l = CATALOG.lessonById.get(e.refId)
    if (!l) continue
    const key = `${l.bookId}:${l.chapterNumber}`
    lessonsStudiedByChapter.set(key, (lessonsStudiedByChapter.get(key) ?? 0) + 1)
  }

  /* the stored topic list — same EntryView contract as the Overview */
  const chapterViews: EntryView[] = entries
    .filter((e): e is typeof e => e.scope === 'chapter')
    .map((e) => toChapterView(e as unknown as EntryRow, lessonsStudiedByChapter.get(e.refId) ?? 0))
  const lessonViews: EntryView[] = entries
    .filter((e) => e.scope === 'lesson')
    .map((e) => toLessonView(e as unknown as EntryRow))

  const out = buildProgress({
    now,
    entries: entries.map((e) => ({
      scope: e.scope as 'chapter' | 'lesson',
      refId: e.refId,
      passes: e.passes,
      mastery: Math.round(e.mastery),
      lastAt: e.lastAt.getTime(),
      dueAt: e.dueAt.getTime(),
    })),
    quizEvents: quizEventRows
      .filter((ev) => ev.entry.scope === 'lesson')
      .map((ev) => ({
        lessonId: ev.entry.refId,
        score: ev.quizScore,
        total: ev.quizTotal,
        quality: ev.quality,
      })),
    chapters: CATALOG.chapters.map((c) => ({
      key: c.key,
      bookId: c.bookId,
      chapterNumber: c.chapterNumber,
      chapterTitle: c.chapterTitle,
      lessonIds: c.lessonRecordIds,
      words: c.words,
    })),
    lessons: CATALOG.lessons.map((l) => ({
      id: l.recordId,
      bookId: l.bookId,
      chapterNumber: l.chapterNumber,
      lessonNumber: l.lessonNumber,
      lessonTitle: l.lessonTitle,
      words: l.words,
      readMins: l.readMins,
      quizQuestions: l.quizQuestions,
    })),
    books: CATALOG.books.map((b) => ({
      bookId: b.bookId,
      title: b.title,
      disciplineId: b.disciplineId,
      disciplineTitle: b.disciplineTitle,
      accent: b.accent,
      chapterKeys: b.chapterKeys,
      lessonIds: b.lessonRecordIds,
    })),
  })

  /* topics sorted most-recently-touched first — the study log the owner
     asked to see "list down here in the progress" */
  const topics = [...chapterViews, ...lessonViews].sort(
    (a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime(),
  )

  return {
    coverage: out.coverage,
    quiz: out.quiz,
    books: [...out.books].sort(
      (a, b) =>
        b.lessonsEffective - a.lessonsEffective ||
        b.passes - a.passes ||
        a.title.localeCompare(b.title),
    ),
    topics,
    recommendations: out.recommendations,
    generatedAt: new Date(now).toISOString(),
  }
}
