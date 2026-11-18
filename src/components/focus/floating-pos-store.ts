'use client'

/**
 * Floating — the dragged position of the floating pomodoro icon
 * (owner chat directive 2026-11-18). The default corner (null) rides CSS;
 * a dragged spot persists per device in localStorage, rehydrated
 * post-mount exactly like the timer store (skipHydration — no mismatch,
 * clamped back inside the viewport on resize by the widget).
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { clampDrag } from '@/lib/focus/floating-view'

export interface FloatingPos {
  x: number
  y: number
}

interface FloatingPosState {
  pos: FloatingPos | null
  setPos: (p: FloatingPos) => void
  clearPos: () => void
}

export const useFloatingPos = create<FloatingPosState>()(
  persist(
    (set) => ({
      pos: null,
      /* every write is viewport-clamped — the icon can never be parked
       * off-screen, over the sticky site header, or become an overflow source */
      setPos: (p) =>
        set({
          pos: clampDrag(
            p.x,
            p.y,
            typeof window === 'undefined' ? 1e6 : window.innerWidth,
            typeof window === 'undefined' ? 1e6 : window.innerHeight,
            48,
            80,
          ),
        }),
      clearPos: () => set({ pos: null }),
    }),
    {
      name: 'lockin:floating-pomodoro:v1',
      /* the server shell and the first client paint agree on the default
       * corner; the saved spot applies post-mount (the widget rehydrates) */
      skipHydration: true,
      partialize: (s) => ({ pos: s.pos }),
    },
  ),
)
