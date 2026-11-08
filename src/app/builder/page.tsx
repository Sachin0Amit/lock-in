import type { Metadata } from 'next'
import { BuilderApp } from '@/components/builder/builder-app'

export const metadata: Metadata = {
  title: 'Build Your Own Book — Custom Book Builder · LockIn Library',
  description:
    'Create a personalized textbook by curating knowledge from the LockIn Academic Library — from an examination, a subject, a topic list, an uploaded syllabus PDF, or a combination.',
}

export default function BuilderPage() {
  return <BuilderApp />
}
