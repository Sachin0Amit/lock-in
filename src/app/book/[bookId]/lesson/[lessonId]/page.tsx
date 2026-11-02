import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LessonView } from '@/components/library/lesson-view'
import { allLessons, findLesson } from '@/data/library/index'

export const dynamicParams = false

export function generateStaticParams() {
  return allLessons.map(({ book, lesson }) => ({
    bookId: book.id,
    lessonId: lesson.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string; lessonId: string }>
}): Promise<Metadata> {
  const { bookId, lessonId } = await params
  const ref = findLesson(lessonId)
  if (!ref || ref.book.id !== bookId) return { title: 'Lesson not found — LockIn Library' }
  return {
    title: `${ref.lesson.number} ${ref.lesson.title} · ${ref.book.title}`,
    description: `${ref.chapter.title} — ${ref.lesson.concepts.slice(0, 5).join(', ')}`,
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ bookId: string; lessonId: string }>
}) {
  const { bookId, lessonId } = await params
  const ref = findLesson(lessonId)
  if (!ref || ref.book.id !== bookId) notFound()
  return <LessonView ref_={ref} />
}
