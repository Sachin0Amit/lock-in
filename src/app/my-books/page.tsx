import type { Metadata } from 'next'
import { MyBooksView } from '@/components/builder/my-books-view'

export const metadata: Metadata = {
  title: 'My Custom Books — LockIn Library',
  description: 'Your bookshelf of personalized textbooks curated from the LockIn Academic Library.',
}

export default function MyBooksPage() {
  return <MyBooksView />
}
