import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ReaderView } from '@/components/builder/reader-view'

export const metadata: Metadata = {
  title: 'Read — Custom book · LockIn Library',
  description: 'A dedicated textbook-style reader for custom books built from the LockIn Academic Library.',
}

export default async function ReaderPage({ params }: { params: Promise<{ bookId: string }> }) {
  await params
  return (
    <Suspense>
      <ReaderView />
    </Suspense>
  )
}
