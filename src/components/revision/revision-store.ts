'use client'

/**
 * Revision & Mastery — global badge state (zustand, no persist).
 *
 * The header chip subscribes to this; every marking surface refreshes it
 * after a write so "N due" stays live without polling.
 */
import { create } from 'zustand'
import type { RevisionSummaryCompact } from '@/lib/revision/types'

interface BadgeState {
  summary: RevisionSummaryCompact | null
  loading: boolean
  refresh: () => Promise<void>
}

export const useRevisionBadge = create<BadgeState>((set) => ({
  summary: null,
  loading: false,
  refresh: async () => {
    set({ loading: true })
    try {
      const res = await fetch('/api/revision/overview?summary=1', { cache: 'no-store' })
      if (!res.ok) {
        set({ summary: null, loading: false })
        return
      }
      const summary = (await res.json()) as RevisionSummaryCompact
      set({ summary, loading: false })
    } catch {
      set({ summary: null, loading: false })
    }
  },
}))
