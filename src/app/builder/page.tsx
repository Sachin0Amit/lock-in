import type { Metadata } from 'next'
import { BuilderApp } from '@/components/builder/builder-app'

export const metadata: Metadata = {
  title: 'Build Your Own Book — Custom Book Builder · LockIn Library',
  description:
    'Create a personalized textbook by curating knowledge from the LockIn Academic Library — combine an examination scope, library picks, your own topic list, an uploaded syllabus PDF and your existing custom books in one unified builder.',
}

export default function BuilderPage() {
  return <BuilderApp />
}
