import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LessonView } from '@/components/library/lesson-view'
import { getLessonPageData } from '@/lib/library-db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string; lessonId: string }>
}): Promise<Metadata> {
  const { lessonId } = await params
  const data = await getLessonPageData(lessonId)
  if (!data) return { title: 'Lesson not found — LockIn Library' }
  const { book, lesson } = data.ref
  return {
    title: `${lesson.number} ${lesson.title} · ${book.title}`,
    description: `${data.ref.chapter.title} — ${lesson.concepts.slice(0, 5).join(', ')}`,
  }
}

/**
 * Lesson page — exactly one lesson fetched from the content database on
 * demand (with its prev/next targets and prerequisites resolved
 * server-side). No other lesson's body is loaded, and no lesson content
 * lives in any client bundle.
 */
export default async function LessonPage({
  params,
}: {
  params: Promise<{ bookId: string; lessonId: string }>
}) {
  const { bookId, lessonId } = await params
  const data = await getLessonPageData(lessonId)
  if (!data || data.ref.book.id !== bookId) notFound()
  return (
    <LessonView
      ref_={data.ref}
      prev={data.prev}
      next={data.next}
      prereqs={data.prereqs}
    />
  )
}
