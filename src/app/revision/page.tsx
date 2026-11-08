import type { Metadata } from 'next'
import { RevisionHub } from '@/components/revision/revision-hub'

export const metadata: Metadata = {
  title: 'Revision Hub · LockIn Library',
  description:
    'Track what you have studied, get autonomous spaced-repetition revision prompts, explore the knowledge graph of the library, and see your mastery and least-revised chapters.',
}

export default function RevisionPage() {
  return <RevisionHub />
}
