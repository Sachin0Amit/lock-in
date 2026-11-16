import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FlashcardsView } from '@/components/library/flashcards'
import { getBookFull, getBookTitle } from '@/lib/library-db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>
}): Promise<Metadata> {
  const { bookId } = await params
  const title = await getBookTitle(bookId)
  return { title: `Revise — ${title ?? 'Flashcards'} · LockIn Library` }
}

/** Flashcards page — this book's written lesson bodies from the database. */
export default async function RevisePage({
  params,
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params
  const book = await getBookFull(bookId)
  if (!book) notFound()
  return <FlashcardsView book={book} />
}
