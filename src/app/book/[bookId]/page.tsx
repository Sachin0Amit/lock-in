import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookView } from '@/components/library/book-view'
import { allBooks, bookStats, findBook } from '@/data/library/index'

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
  if (!book) return { title: 'Book not found — LockIn Library' }
  return {
    title: `${book.title} — LockIn Library`,
    description: book.subtitle ?? book.description.slice(0, 160),
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params
  const book = findBook(bookId)
  if (!book) notFound()
  const stats = bookStats(book)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Book',
            name: book.title,
            description: book.description,
            educationalLevel: book.level,
            numberOfPages: stats.written,
            inLanguage: 'en',
          }),
        }}
      />
      <BookView book={book} />
    </>
  )
}
