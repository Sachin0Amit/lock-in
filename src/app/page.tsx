import type { Metadata } from 'next'
import { HomeView } from '@/components/library/home-view'
import { getHomeSnapshot } from '@/lib/library-db'
import { disciplines as disciplineList } from '@/data/library/disciplines'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'LockIn Library — every subject, from absolute zero to mastery',
}

/**
 * Home — served from the packed content database (one snapshot per
 * request; the snapshot itself is cached server-side by pack version).
 * The full home payload is book metadata + stats + lesson stubs only.
 */
export default async function Home() {
  const snapshot =
    (await getHomeSnapshot()) ?? {
      books: [],
      disciplines: disciplineList,
      lessons: [],
      stats: {
        disciplines: disciplineList.length,
        books: 0,
        written: 0,
        plannedLessons: 0,
        words: 0,
        terms: 0,
      },
    }
  return <HomeView snapshot={snapshot} />
}
