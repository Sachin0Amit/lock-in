'use client'

/**
 * Focus — the pomodoro timer state (client, persisted to localStorage).
 *
 * The timer is WALL-CLOCK honest, exactly like a real exam sitting: while
 * running, `endsAt` is the epoch ms the phase ends at — a reload, a lost
 * tab, anything — the remaining time is recomputed from the real clock,
 * and the time away counts. Pausing stores the remaining ms instead.
 *
 * Settings persist separately per device; the pure engine's clampSettings
 * repairs any corrupt row on rehydrate.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { clampSettings, DEFAULT_SETTINGS } from '@/lib/focus/focus-engine'
import type { FocusSettings, Phase } from '@/lib/focus/types'

export interface TimerState {
  phase: Phase
  running: boolean
  /** epoch ms the phase ends at (only meaningful while running) */
  endsAt: number | null
  /** remaining ms (only meaningful while paused) */
  remainingMs: number | null
  /** focus bells rung since the last long break (the long-every cadence) */
  cycleFocus: number
  /** the task the current focus belongs to (null = free focus) */
  taskId: string | null
  /** epoch ms the current phase started at (honest session rows) */
  phaseStartedAt: number | null
  /** last phase-advance bookkeeping id, guards duplicate completions */
  lastSeq: number
}

interface FocusStore extends TimerState {
  settings: FocusSettings
  start: (taskId: string | null) => void
  pause: () => void
  resume: () => void
  resetPhase: () => void
  armPhase: (phase: Phase) => void
  enterPhase: (phase: Phase, cycleFocus: number, autoStart: boolean) => void
  markCompleted: () => void
  setTask: (taskId: string | null) => void
  updateSettings: (patch: Partial<FocusSettings>) => void
}

export const FOCUS_TIMER_KEY = 'lockin:focus-timer:v1'

const initialTimer: TimerState = {
  phase: 'focus',
  running: false,
  endsAt: null,
  remainingMs: null,
  cycleFocus: 0,
  taskId: null,
  phaseStartedAt: null,
  lastSeq: 0,
}

function phaseMs(phase: Phase, s: FocusSettings): number {
  if (phase === 'focus') return s.focusMin * 60_000
  if (phase === 'short') return s.shortMin * 60_000
  return s.longMin * 60_000
}

export const useFocusTimer = create<FocusStore>()(
  persist(
    (set, get) => ({
      ...initialTimer,
      settings: DEFAULT_SETTINGS,

      start: (taskId) =>
        set((s) => {
          const phase = 'focus'
          const ms = phaseMs(phase, s.settings)
          return {
            ...initialTimer,
            settings: s.settings,
            phase,
            running: true,
            endsAt: Date.now() + ms,
            remainingMs: null,
            cycleFocus: 0,
            taskId,
            phaseStartedAt: Date.now(),
          }
        }),

      pause: () =>
        set((s) => {
          if (!s.running || s.endsAt === null) return {}
          return { running: false, remainingMs: Math.max(0, s.endsAt - Date.now()), endsAt: null }
        }),

      resume: () =>
        set((s) => {
          if (s.running || s.remainingMs === null) return {}
          return { running: true, endsAt: Date.now() + s.remainingMs, remainingMs: null }
        }),

      resetPhase: () =>
        set((s) => {
          const ms = phaseMs(s.phase, s.settings)
          if (s.running) return { endsAt: Date.now() + ms, remainingMs: null }
          return { remainingMs: ms, endsAt: null }
        }),

      armPhase: (phase) =>
        set((s) => {
          const ms = phaseMs(phase, s.settings)
          return {
            ...initialTimer,
            settings: s.settings,
            phase,
            running: false,
            remainingMs: ms,
            cycleFocus: s.cycleFocus,
            taskId: s.taskId,
          }
        }),

      enterPhase: (phase, cycleFocus, autoStart) =>
        set((s) => {
          const ms = phaseMs(phase, s.settings)
          return {
            ...initialTimer,
            settings: s.settings,
            phase,
            cycleFocus,
            taskId: s.taskId,
            running: autoStart,
            endsAt: autoStart ? Date.now() + ms : null,
            remainingMs: autoStart ? null : ms,
            phaseStartedAt: autoStart ? Date.now() : null,
          }
        }),

      markCompleted: () => set((s) => ({ lastSeq: s.lastSeq + 1 })),

      setTask: (taskId) => set({ taskId }),

      updateSettings: (patch) =>
        set((s) => {
          const settings = clampSettings({ ...s.settings, ...patch })
          /* a live phase rides the new settings only when it never started */
          const untouched = !s.running && s.remainingMs !== null && s.phaseStartedAt === null
          if (!untouched) return { settings }
          const ms = phaseMs(s.phase, settings)
          return { settings, remainingMs: ms, endsAt: null }
        }),
    }),
    {
      name: FOCUS_TIMER_KEY,
      /* the first paint matches the server shell; rehydrate happens
       * post-mount (FocusHub) so a running timer never hydration-mismatches */
      skipHydration: true,
      partialize: (s) => ({
        phase: s.phase,
        running: s.running,
        endsAt: s.endsAt,
        remainingMs: s.remainingMs,
        cycleFocus: s.cycleFocus,
        taskId: s.taskId,
        phaseStartedAt: s.phaseStartedAt,
        lastSeq: s.lastSeq,
        settings: s.settings,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<FocusStore>
        return {
          ...current,
          ...p,
          settings: clampSettings(p.settings),
        }
      },
    },
  ),
)
