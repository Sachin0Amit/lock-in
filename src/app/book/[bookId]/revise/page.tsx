import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FlashcardsView } from '@/components/library/flashcards'
import { allBooks, findBook } from '@/data/library/index'

export const dynamicParams = false

export function generateStaticParams() {
  return allBooks.map((b) => ({ bookId: b.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>
}): Promise<Metadata> {
  const { bookId } = await params
  const book = findBook(bookId)
  return { title: `Revise — ${book?.title ?? 'Flashcards'} · LockIn Library` }
}

export default async function RevisePage({
  params,
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params
  const book = findBook(bookId)
  if (!book) notFound()
  return <FlashcardsView book={book} />
}
