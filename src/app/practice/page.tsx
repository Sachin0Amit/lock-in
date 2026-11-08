import type { Metadata } from 'next'
import { PracticeHub } from '@/components/practice/practice-hub'

export const metadata: Metadata = {
  title: 'Practice · LockIn Library',
  description:
    'Mock exam papers, adaptive drills, the Mistake Bank and honest exam readiness — generated from your own library and study ledger.',
}

export default function PracticePage() {
  return <PracticeHub />
}
