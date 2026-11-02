import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GlossaryView } from '@/components/library/glossary-view'
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
  return { title: `Glossary — ${book?.title ?? 'Book'} · LockIn Library` }
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params
  const book = findBook(bookId)
  if (!book) notFound()
  return <GlossaryView book={book} />
}
