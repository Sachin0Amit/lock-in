import type { Metadata } from 'next'
import { HomeView } from '@/components/library/home-view'

export const metadata: Metadata = {
  title: 'LockIn Library — every subject, from absolute zero to mastery',
}

export default function Home() {
  return <HomeView />
}
