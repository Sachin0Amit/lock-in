'use client'

/**
 * TimerRuntime — the one place a pomodoro phase completes (owner chat
 * directive 2026-11-18: a floating icon that shows the time left means the
 * timer now lives on EVERY page, so its bell must ring everywhere too).
 *
 * The Focus Hub's timer used to own completion while mounted at /focus;
 * that logic moved here unchanged — wall-clock honest, single-flight, and
 * mounted exactly once in the root layout:
 *
 *   - rehydrates the persisted timer (skipHydration — no SSR mismatch)
 *   - a phase that expired while the tab was away completes on mount
 *   - the 250 ms tick completes a running phase at its end epoch
 *   - the bell + desktop notification ring wherever you are browsing
 *   - a logged study pass publishes onto the notes bus: the Focus Hub
 *     reloads its census, the hub's timer shows the note, and when you are
 *     AWAY from the hub a toast carries the same news.
 *
 * The floating widget is a pure VIEW over the same store (floating-view.ts)
 * — it never advances time; this runtime is the only phase-writer outside
 * the Focus Hub controls themselves.
 */
import { useEffect, useRef, useState } from 'react'
import { create } from 'zustand'
import { useFocusTimer } from './focus-store'
import {
  nextPhase,
  phaseLengthSecs,
  phaseWorthLogging,
} from '@/lib/focus/focus-engine'
import { logFocusSession } from '@/lib/focus/client-api'
import { useToast } from '@/hooks/use-toast'
import type { FocusSettings } from '@/lib/focus/types'

/* ------------------------------------------------------------------ */
/* Shared control helpers — used by the hub dial AND the floating panel */
/* ------------------------------------------------------------------ */

/** Ask for notification permission once, best-effort, never blocking. */
export function ensureNotifyPermission(s: FocusSettings): void {
  if (s.notify && typeof Notification !== 'undefined' && Notification.permission === 'default') {
    void Notification.requestPermission().catch(() => undefined)
  }
}

/* ------------------------------------------------------------------ */
/* The notes bus — the runtime publishes, whoever is mounted listens    */
/* ------------------------------------------------------------------ */

export interface TimerLedger {
  logged: boolean
  label: string | null
}

interface TimerNotesState {
  ledger: TimerLedger | null
  note: string | null
  seq: number
  publish: (ledger: TimerLedger) => void
}

export const useTimerNotes = create<TimerNotesState>()((set, get) => ({
  ledger: null,
  note: null,
  seq: 0,
  publish: (ledger) =>
    set({
      ledger,
      note: ledger.logged
        ? `Study pass logged — ${ledger.label ?? 'your ledger'} now sees this focus.`
        : null,
      seq: get().seq + 1,
    }),
}))

/* hub presence — the hub shows its own inline note; suppress the toast */
let hubPresent = false
export function setHubPresent(present: boolean): void {
  hubPresent = present
}

/* ------------------------------------------------------------------ */
/* The bell — WebAudio, best-effort, never crashes a session           */
/* ------------------------------------------------------------------ */

function ringBell(): void {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return
    const ctx = new Ctor()
    for (const at of [0, 0.35]) {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g)
      g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.value = 880
      const t = ctx.currentTime + at
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
      o.start(t)
      o.stop(t + 0.32)
    }
    setTimeout(() => void ctx.close().catch(() => undefined), 1500)
  } catch {
    /* silence is honest — never crash a study session over a beep */
  }
}

/* ------------------------------------------------------------------ */
/* completePhase — the single-flight completion path (natural | skip)   */
/* ------------------------------------------------------------------ */

let completing = false

export function completePhase(endedNaturally: boolean): void {
  if (completing) return
  completing = true
  try {
    const s = useFocusTimer.getState()
    /* the planned length THIS phase was tailored to — quick-adjust grows or
     * shrinks it; the legacy/settings-derived value when never tailored.
     * planned − left stays the truly-focused time under any adjustment
     * (pinned in verifier section H), so actualSecs stays honest */
    const planned = Math.round((s.phasePlannedMs ?? phaseLengthSecs(s.phase, s.settings) * 1000) / 1000)
    const left =
      s.running && s.endsAt !== null
        ? Math.max(0, s.endsAt - Date.now())
        : (s.remainingMs ?? 0)
    const actual = Math.max(0, Math.round(planned - Math.round(left / 1000)))
    const endedStamp = endedNaturally && s.endsAt !== null ? s.endsAt : Date.now()

    if (phaseWorthLogging(s.phase, actual)) {
      void logFocusSession({
        taskId: s.taskId,
        kind: s.phase,
        plannedSecs: planned,
        actualSecs: actual,
        outcome: endedNaturally ? 'complete' : 'stopped',
        startedAt: s.phaseStartedAt ?? endedStamp - actual * 1000,
        endedAt: endedStamp,
      }).then((res) => {
        if (res) useTimerNotes.getState().publish(res.ledger)
      })
    }

    if (endedNaturally && s.settings.sound) ringBell()
    if (
      endedNaturally &&
      s.settings.notify &&
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification(
          s.phase === 'focus' ? 'Focus bell — take a break' : 'Break over — lock back in',
          {
            body:
              s.phase === 'focus'
                ? 'The pomodoro ran to its end. Stretch, water, breathe.'
                : 'Ready for the next focus block?',
          },
        )
      } catch {
        /* notifications are best-effort */
      }
    }

    const nxt = endedNaturally
      ? nextPhase(s.phase, s.cycleFocus, s.settings)
      : s.phase === 'focus'
        ? { phase: 'short' as const, cycleFocus: s.cycleFocus }
        : { phase: 'focus' as const, cycleFocus: s.cycleFocus }
    const autoStart =
      nxt.phase === 'focus' ? s.settings.autoStartFocus : s.settings.autoStartBreaks
    useFocusTimer.getState().enterPhase(nxt.phase, nxt.cycleFocus, autoStart)
  } finally {
    completing = false
  }
}

/* ------------------------------------------------------------------ */
/* The runtime component — mounted once in the root layout             */
/* ------------------------------------------------------------------ */

export function TimerRuntime() {
  const running = useFocusTimer((s) => s.running)
  const endsAt = useFocusTimer((s) => s.endsAt)
  const noteSeq = useTimerNotes((s) => s.seq)
  const { toast } = useToast()
  const lastNotedSeq = useRef(0)
  const [now, setNow] = useState(() => Date.now())

  /* rehydrate the persisted timer, then complete anything that expired
   * while the tab was closed — the wall clock kept running without us */
  useEffect(() => {
    const after = () => {
      const s = useFocusTimer.getState()
      if (s.running && s.endsAt !== null && s.endsAt <= Date.now()) {
        completePhase(true)
      }
    }
    void Promise.resolve(useFocusTimer.persist.rehydrate()).then(after).catch(after)
  }, [])

  /* the tick — only while running (a throttled background tab catches up
   * on focus: endsAt is an epoch, so the completion is still honest) */
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  /* natural completion when the clock reaches zero */
  useEffect(() => {
    if (running && endsAt !== null && now >= endsAt) {
      completePhase(true)
    }
  }, [running, endsAt, now])

  /* the toast mirror — only when the hub is not already showing the note */
  useEffect(() => {
    if (noteSeq === 0 || noteSeq === lastNotedSeq.current) return
    lastNotedSeq.current = noteSeq
    if (hubPresent) return
    const { note, ledger } = useTimerNotes.getState()
    if (!ledger?.logged || !note) return
    toast({
      title: 'Focus bell — study pass logged',
      description: note,
      /* the icon steps aside while this is up — keep the visit brief */
      duration: 8000,
    })
  }, [noteSeq, toast])

  return null
}
