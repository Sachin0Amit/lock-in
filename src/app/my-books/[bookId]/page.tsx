import type { Metadata } from 'next'
import { BookDetailView } from '@/components/builder/book-detail-view'

export const metadata: Metadata = {
  title: 'Custom book — LockIn Library',
  description: 'Edit the structure and coverage report of a custom book built from the LockIn Academic Library.',
}

export default async function CustomBookPage({ params }: { params: Promise<{ bookId: string }> }) {
  await params
  return <BookDetailView />
}
