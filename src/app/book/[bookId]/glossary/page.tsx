import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GlossaryView } from '@/components/library/glossary-view'
import { getBookFull, getBookTitle } from '@/lib/library-db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>
}): Promise<Metadata> {
  const { bookId } = await params
  const title = await getBookTitle(bookId)
  return { title: `Glossary — ${title ?? 'Book'} · LockIn Library` }
}

/** Glossary page — this book's written lesson bodies from the database. */
export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params
  const book = await getBookFull(bookId)
  if (!book) notFound()
  return <GlossaryView book={book} />
}
