import type { Metadata } from 'next'
import { FocusHub } from '@/components/focus/focus-hub'

export const metadata: Metadata = {
  title: 'Focus Hub · LockIn Library',
  description:
    'A study to-do list integrated with a pomodoro engine: plan tasks with pomodoro estimates, link them to library topics, run wall-clock-honest focus sessions, and watch every completed bell feed your study ledger and streaks.',
}

export default function FocusPage() {
  return <FocusHub />
}
