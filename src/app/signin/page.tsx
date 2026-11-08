import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SigninView } from '@/components/builder/signin-view'

export const metadata: Metadata = {
  title: 'Sign in — LockIn Library',
  description: 'Sign in to build custom books from the LockIn Academic Library.',
}

export default function SigninPage() {
  return (
    <Suspense>
      <SigninView />
    </Suspense>
  )
}
