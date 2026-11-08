import { NextRequest, NextResponse } from 'next/server'
import { findLesson } from '@/data/library/index'
import { getLessonRecord } from '@/lib/builder/catalog'
import { notFound } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * One canonical library lesson as JSON for the custom book reader —
 * including its full blocks, so KaTeX, quizzes, figures, tables and
 * exercises render exactly as in the library itself.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await ctx.params
  const ref = findLesson(lessonId)
  const record = getLessonRecord(lessonId)
  if (!ref || !record) return notFound('Lesson not found in the library')
  return NextResponse.json({
    record: {
      recordId: record.recordId,
      bookId: record.bookId,
      bookTitle: record.bookTitle,
      chapterNumber: record.chapterNumber,
      chapterTitle: record.chapterTitle,
      lessonNumber: record.lessonNumber,
      lessonTitle: record.lessonTitle,
      concepts: record.concepts,
      prerequisites: record.prerequisites,
      words: record.words,
      readMins: record.readMins,
      url: record.url,
      versionHash: record.versionHash,
    },
    lesson: ref.lesson,
  })
}
