'use client'

/**
 * Pomodoro — the timer of the Focus Hub.
 *
 * WALL-CLOCK honest (the exam-sitting pattern): while running, the phase
 * ends at a fixed epoch — reload the page, close the tab, the remaining
 * time recomputes from the real clock and the time away counts. A phase
 * that expired while you were away completes on mount, exactly as if the
 * tab had been open.
 *
 * The cycle: focus → short break → focus … every Nth bell earns the long
 * break which resets the cadence. A completed focus bell on a task linked
 * to a chapter/lesson logs a study pass into the same revision ledger
 * (server bridge, /api/focus/session) — the Revision Hub sees the time.
 *
 * Keyboard: Space start/pause · S skip · R reset (ignored while typing).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  BellOff,
  Coffee,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  SkipForward,
  Timer as TimerIcon,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useFocusTimer } from './focus-store'
import {
  formatClock,
  nextPhase,
  phaseLengthSecs,
  phaseWorthLogging,
} from '@/lib/focus/focus-engine'
import { logFocusSession } from '@/lib/focus/client-api'
import type { TaskView } from '@/lib/focus/types'
import { cn } from '@/lib/utils'

const PHASE_LABEL = { focus: 'Focus', short: 'Short break', long: 'Long break' } as const

function bell(): void {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
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

export function PomodoroTimer({
  tasks,
  onSessionLogged,
}: {
  tasks: TaskView[]
  onSessionLogged: (ledger: { logged: boolean; label: string | null }) => void
}) {
  const phase = useFocusTimer((s) => s.phase)
  const running = useFocusTimer((s) => s.running)
  const endsAt = useFocusTimer((s) => s.endsAt)
  const remainingMs = useFocusTimer((s) => s.remainingMs)
  const cycleFocus = useFocusTimer((s) => s.cycleFocus)
  const taskId = useFocusTimer((s) => s.taskId)
  const settings = useFocusTimer((s) => s.settings)
  const startTimer = useFocusTimer((s) => s.start)
  const pause = useFocusTimer((s) => s.pause)
  const resume = useFocusTimer((s) => s.resume)
  const resetPhase = useFocusTimer((s) => s.resetPhase)
  const enterPhase = useFocusTimer((s) => s.enterPhase)
  const updateSettings = useFocusTimer((s) => s.updateSettings)

  const [now, setNow] = useState(() => Date.now())
  const [ledgerNote, setLedgerNote] = useState<string | null>(null)
  const completingRef = useRef(false)
  const completeRef = useRef<(naturally: boolean) => void>(() => undefined)

  const activeTask = tasks.find((t) => t.id === taskId) ?? null
  const plannedMs = phaseLengthSecs(phase, settings) * 1000
  /* idle-never-started shows the full phase; armed shows the stored remainder */
  const leftMs = running && endsAt !== null ? Math.max(0, endsAt - now) : (remainingMs ?? plannedMs)
  const elapsedSecs = Math.max(0, Math.round((plannedMs - leftMs) / 1000))

  /* the tick — only while running */
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  /* completion path (natural end, skip, reset-with-work) */
  const completePhase = useCallback(
    (endedNaturally: boolean) => {
      if (completingRef.current) return
      completingRef.current = true
      try {
        const s = useFocusTimer.getState()
        const planned = phaseLengthSecs(s.phase, s.settings)
        const left = s.running && s.endsAt !== null
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
            if (res) {
              onSessionLogged(res.ledger)
              setLedgerNote(
                res.ledger.logged
                  ? `Study pass logged — ${res.ledger.label ?? 'your ledger'} now sees this focus.`
                  : null,
              )
            }
          })
        }

        if (endedNaturally && s.settings.sound) bell()
        if (endedNaturally && s.settings.notify && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try {
            new Notification(s.phase === 'focus' ? 'Focus bell — take a break' : 'Break over — lock back in', {
              body: s.phase === 'focus' ? 'The pomodoro ran to its end. Stretch, water, breathe.' : 'Ready for the next focus block?',
            })
          } catch {
            /* notifications are best-effort */
          }
        }

        const nxt = endedNaturally
          ? nextPhase(s.phase, s.cycleFocus, s.settings)
          : s.phase === 'focus'
            ? { phase: 'short' as const, cycleFocus: s.cycleFocus }
            : { phase: 'focus' as const, cycleFocus: s.cycleFocus }
        const autoStart = nxt.phase === 'focus' ? s.settings.autoStartFocus : s.settings.autoStartBreaks
        enterPhase(nxt.phase, nxt.cycleFocus, autoStart)
        setNow(Date.now())
      } finally {
        completingRef.current = false
      }
    },
    [enterPhase, onSessionLogged],
  )
  completeRef.current = completePhase

  /* a phase that expired while the tab was away completes on mount */
  useEffect(() => {
    const s = useFocusTimer.getState()
    if (s.running && s.endsAt !== null && s.endsAt <= Date.now()) {
      completeRef.current(true)
    }
  }, [])

  /* natural completion when the clock reaches zero */
  useEffect(() => {
    if (running && endsAt !== null && now >= endsAt) {
      completeRef.current(true)
    }
  }, [running, endsAt, now])

  /* the countdown rides the tab title */
  useEffect(() => {
    const base = document.title
    if (!running) return
    document.title = `${formatClock(leftMs / 1000)} · ${PHASE_LABEL[phase]} — LockIn`
    return () => {
      document.title = base
    }
  }, [running, leftMs, phase])

  /* keyboard: Space start/pause · S skip · R reset */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      if (e.code === 'Space') {
        e.preventDefault()
        const s = useFocusTimer.getState()
        if (s.running) s.pause()
        else if (s.remainingMs !== null) s.resume()
        else s.start(s.taskId)
      } else if (e.key === 's' || e.key === 'S') {
        completeRef.current(false)
      } else if (e.key === 'r' || e.key === 'R') {
        resetPhase()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resetPhase])

  const toggleRun = () => {
    if (running) pause()
    else if (remainingMs !== null) resume()
    else {
      if (settings.notify && typeof Notification !== 'undefined' && Notification.permission === 'default') {
        void Notification.requestPermission().catch(() => undefined)
      }
      startTimer(taskId)
    }
  }

  const dialR = 84
  const circumference = 2 * Math.PI * dialR
  const progress = plannedMs > 0 ? Math.max(0, Math.min(1, leftMs / plannedMs)) : 0

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TimerIcon className="h-4 w-4" aria-hidden />
          </span>
          Pomodoro
          <span className="ml-auto flex items-center gap-1">
            {settings.sound ? <Volume2 className="h-3.5 w-3.5 text-muted-foreground" aria-hidden /> : <VolumeX className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
            {settings.notify ? <Bell className="h-3.5 w-3.5 text-muted-foreground" aria-hidden /> : <BellOff className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
            <SettingsPopover settings={settings} onChange={updateSettings} />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* the dial */}
        <div className="relative mx-auto flex h-44 w-44 items-center justify-center" role="timer" aria-live="off">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="100" cy="100" r={dialR} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/40" />
            <circle
              cx="100"
              cy="100"
              r={dialR}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className={cn(
                'transition-[stroke-dashoffset] duration-300 ease-linear',
                phase === 'focus' ? 'text-primary' : 'text-emerald-500',
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {phase === 'focus' ? 'Focus' : <span className="inline-flex items-center gap-1"><Coffee className="h-3 w-3" aria-hidden /> Break</span>}
            </span>
            <span className="font-reading text-4xl font-bold tabular-nums" aria-live="polite">
              {formatClock(leftMs / 1000)}
            </span>
            <span className="text-[11px] text-muted-foreground">
              of {Math.round(plannedMs / 60000)} min
            </span>
          </div>
        </div>

        {/* the cadence dots: bells rung since the last long break */}
        <div className="mt-1 flex items-center justify-center gap-1.5" aria-label={`${cycleFocus} of ${settings.longEvery} pomodoros before the long break`}>
          {Array.from({ length: settings.longEvery }, (_, i) => (
            <span
              key={i}
              className={cn(
                'h-2 w-2 rounded-full border',
                i < cycleFocus ? 'border-primary bg-primary' : 'border-border bg-transparent',
                i === cycleFocus && running && phase === 'focus' ? 'animate-pulse border-primary bg-primary/50' : '',
              )}
            />
          ))}
          <span className="ml-2 text-[11px] text-muted-foreground">
            {cycleFocus}/{settings.longEvery} · then long break
          </span>
        </div>

        {/* what is being focused */}
        <div className="mt-4 rounded-lg border bg-muted/30 px-3 py-2.5">
          {activeTask ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Focusing: {activeTask.title}</p>
              {activeTask.link ? (
                <Link
                  href={activeTask.link.url}
                  className="mt-0.5 flex items-center gap-1 truncate text-xs text-primary hover:underline"
                >
                  {activeTask.link.shortLabel}
                </Link>
              ) : (
                <p className="mt-0.5 text-xs text-muted-foreground">Unlinked task — the bell only counts time.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Free focus — pick a task from the list so the bell logs somewhere.
            </p>
          )}
        </div>

        {/* controls */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button onClick={toggleRun} className="min-w-28" aria-label={running ? 'Pause timer' : remainingMs !== null ? 'Resume timer' : 'Start focus'}>
            {running ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
            {running ? 'Pause' : remainingMs !== null ? 'Resume' : 'Start'}
          </Button>
          <Button variant="outline" size="icon" onClick={() => completeRef.current(false)} aria-label="Skip to the next phase" disabled={!running && remainingMs === null}>
            <SkipForward className="h-4 w-4" aria-hidden />
          </Button>
          <Button variant="outline" size="icon" onClick={resetPhase} aria-label="Restart this phase" disabled={!running && remainingMs === null}>
            <RotateCcw className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {ledgerNote ? (
          <p className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-700 dark:text-emerald-300">
            {ledgerNote}
          </p>
        ) : null}

        <p className="mt-3 text-center text-[11px] leading-4 text-muted-foreground">
          The timer survives reloads — time away counts, like a real sitting.
          <br />
          <kbd className="rounded border bg-card px-1 py-0.5 font-sans text-[10px] font-semibold">Space</kbd> start/pause ·{' '}
          <kbd className="rounded border bg-card px-1 py-0.5 font-sans text-[10px] font-semibold">S</kbd> skip ·{' '}
          <kbd className="rounded border bg-card px-1 py-0.5 font-sans text-[10px] font-semibold">R</kbd> reset
        </p>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Settings popover                                                    */
/* ------------------------------------------------------------------ */

function SettingsPopover({
  settings,
  onChange,
}: {
  settings: ReturnType<typeof useFocusTimer.getState>['settings']
  onChange: (patch: Partial<ReturnType<typeof useFocusTimer.getState>['settings']>) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Pomodoro settings">
          <Settings2 className="h-4 w-4" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <p className="mb-3 text-sm font-semibold">Pomodoro settings</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="set-focus" className="text-xs">Focus (min)</Label>
            <Input id="set-focus" type="number" min={1} max={90} defaultValue={settings.focusMin}
              onBlur={(e) => onChange({ focusMin: Number(e.target.value) })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="set-short" className="text-xs">Short break</Label>
            <Input id="set-short" type="number" min={1} max={30} defaultValue={settings.shortMin}
              onBlur={(e) => onChange({ shortMin: Number(e.target.value) })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="set-long" className="text-xs">Long break</Label>
            <Input id="set-long" type="number" min={5} max={60} defaultValue={settings.longMin}
              onBlur={(e) => onChange({ longMin: Number(e.target.value) })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="set-every" className="text-xs">Long every</Label>
            <Input id="set-every" type="number" min={2} max={8} defaultValue={settings.longEvery}
              onBlur={(e) => onChange({ longEvery: Number(e.target.value) })} />
          </div>
        </div>
        <div className="mt-4 space-y-2.5 border-t pt-3">
          <label className="flex items-center justify-between text-xs">
            <span>Auto-start breaks</span>
            <Switch checked={settings.autoStartBreaks} onCheckedChange={(v) => onChange({ autoStartBreaks: v })} aria-label="Auto-start breaks" />
          </label>
          <label className="flex items-center justify-between text-xs">
            <span>Auto-start next focus</span>
            <Switch checked={settings.autoStartFocus} onCheckedChange={(v) => onChange({ autoStartFocus: v })} aria-label="Auto-start next focus" />
          </label>
          <label className="flex items-center justify-between text-xs">
            <span>Sound the bell</span>
            <Switch checked={settings.sound} onCheckedChange={(v) => onChange({ sound: v })} aria-label="Sound the bell" />
          </label>
          <label className="flex items-center justify-between text-xs">
            <span>Desktop notifications</span>
            <Switch checked={settings.notify} onCheckedChange={(v) => onChange({ notify: v })} aria-label="Desktop notifications" />
          </label>
        </div>
        <p className="mt-3 text-[11px] leading-4 text-muted-foreground">
          A running phase never changes length — edit only arms the next one.
        </p>
      </PopoverContent>
    </Popover>
  )
}
