import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookView } from '@/components/library/book-view'
import { getBookOutline } from '@/lib/library-db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>
}): Promise<Metadata> {
  const { bookId } = await params
  const found = await getBookOutline(bookId)
  if (!found) return { title: 'Book not found — LockIn Library' }
  const { book } = found
  return {
    title: `${book.title} — LockIn Library`,
    description: book.subtitle ?? book.description.slice(0, 160),
  }
}

/**
 * Book page — outline + precomputed stats from the content database.
 * The lesson bodies are NOT loaded here: the TOC links to per-lesson
 * routes that fetch exactly one lesson on demand.
 */
export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params
  const found = await getBookOutline(bookId)
  if (!found) notFound()
  const { book, stats } = found
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
      <BookView book={book} stats={stats} />
    </>
  )
}
