'use client'

/**
 * FloatingPomodoro — the small floating pomodoro icon (owner chat
 * directives 2026-11-18: "hover the mouse and see how much time is left",
 * then later: "the icon should show more features like add more time,
 * adjust time or play pause such").
 *
 * A quiet 48 px circle pinned to the bottom-right corner of EVERY page of
 * the library (hidden on /focus, where the full dial already lives). The
 * ring depletes with the phase; hovering (or focusing with the keyboard)
 * opens a live CONTROL PANEL — not just a readout: the phase word, the
 * wall-clock remainder, when it ends, the cadence and the task under
 * focus, plus the quick controls: play/pause/resume, −1/+1/+5 minute
 * quick-adjust (the phase tailors live and honestly — the arithmetic is
 * pinned in verifier section H), and skip. Click opens the Focus Hub;
 * drag moves the icon anywhere (persisted per device, always clamped
 * inside the viewport).
 *
 * It is a pure VIEW over the same timer store the hub renders — the
 * phase machine and the bell live in timer-runtime.tsx. The timer is
 * wall-clock honest: reload, close the tab, background it — the number
 * you see on hover is the number the hub's dial would show.
 */
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Coffee, Pause, Play, SkipForward, Timer as TimerIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFocusTimer } from './focus-store'
import { completePhase, ensureNotifyPermission } from './timer-runtime'
import { useFloatingPos } from './floating-pos-store'
import { fetchFocusOverview } from '@/lib/focus/client-api'
import { formatClock } from '@/lib/focus/focus-engine'
import { useToast } from '@/hooks/use-toast'
import {
  PHASE_WORD,
  QUICK_ADJUST_STEPS_MS,
  adjustAriaLabel,
  clampDrag,
  clockOfDayLabel,
  floatingAriaLabel,
  floatingKind,
  floatingLeftMs,
  floatingPlannedMs,
  playPauseAriaLabel,
  ringFraction,
  stepLabel,
} from '@/lib/focus/floating-view'
import { cn } from '@/lib/utils'

const WIDGET_SIZE = 48
const DRAG_THRESHOLD_PX = 6
const STEP_ASIDE_PX = 104

export function FloatingPomodoro() {
  const router = useRouter()
  const pathname = usePathname()

  const phase = useFocusTimer((s) => s.phase)
  const running = useFocusTimer((s) => s.running)
  const endsAt = useFocusTimer((s) => s.endsAt)
  const remainingMs = useFocusTimer((s) => s.remainingMs)
  const phaseStartedAt = useFocusTimer((s) => s.phaseStartedAt)
  const phasePlannedMs = useFocusTimer((s) => s.phasePlannedMs)
  const cycleFocus = useFocusTimer((s) => s.cycleFocus)
  const taskId = useFocusTimer((s) => s.taskId)
  const settings = useFocusTimer((s) => s.settings)

  const pos = useFloatingPos((s) => s.pos)
  const setPos = useFloatingPos((s) => s.setPos)

  /* toasts live in the same bottom-right corner — the icon politely steps
   * aside while one is up (and only when it has room to step) */
  const { toasts } = useToast()

  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  /* rehydrate the dragged position (skipHydration — the server shell and
   * the first client paint agree on the default corner; the saved spot
   * applies post-mount, exactly like the timer store rehydrates) */
  useEffect(() => {
    void Promise.resolve(useFloatingPos.persist.rehydrate()).catch(() => undefined)
  }, [])

  /* a saved position stays legal when the viewport shrinks (rotation,
   * window resize) — clamped back inside (below the header), never lost */
  useEffect(() => {
    const onResize = () => {
      const p = useFloatingPos.getState().pos
      if (!p || p.x === null || p.y === null) return
      useFloatingPos.getState().setPos(clampDrag(p.x, p.y, window.innerWidth, window.innerHeight, WIDGET_SIZE, 80))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* the tooltip's task line — titles fetched lazily, only when a task is
   * under focus and not already known */
  const [titles, setTitles] = useState<Record<string, string>>({})
  useEffect(() => {
    if (taskId === null || titles[taskId] !== undefined) return
    let live = true
    void fetchFocusOverview().then((o) => {
      if (!live || !o) return
      const map: Record<string, string> = {}
      for (const t of o.tasks) map[t.id] = t.title
      setTitles((prev) => ({ ...prev, ...map }))
    })
    return () => {
      live = false
    }
  }, [taskId, titles])

  /* the hover tooltip — pointer via React handlers; keyboard focus via
   * native focusin/focusout on the wrapper (Tab and .focus() both open it).
   * Re-attached per pathname: the node unmounts on /focus and is a NEW node
   * when the route comes back — the empty-dep effect would go stale. */
  const [tipOpen, setTipOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const open = () => setTipOpen(true)
    const close = () => setTipOpen(false)
    el.addEventListener('focusin', open)
    el.addEventListener('focusout', close)
    return () => {
      el.removeEventListener('focusin', open)
      el.removeEventListener('focusout', close)
    }
  }, [pathname])
  const dragRef = useRef<{ startX: number; startY: number; origin: { x: number; y: number }; moved: boolean } | null>(null)
  const suppressClick = useRef(false)

  const timer = { phase, running, endsAt, remainingMs, phaseStartedAt, phasePlannedMs }
  const kind = floatingKind(timer)
  const leftMs = floatingLeftMs(timer, settings, now)
  const plannedMs = floatingPlannedMs(timer, settings)
  const fraction = ringFraction(leftMs, plannedMs)
  const aria = floatingAriaLabel(kind, phase, leftMs)
  const taskTitle = taskId !== null ? (titles[taskId] ?? null) : null

  /* the quick controls — the same store actions the hub's buttons write;
   * nothing here owns time, the runtime stays the only phase-writer */
  const onToggle = () => {
    const s = useFocusTimer.getState()
    if (s.running) s.pause()
    else if (s.remainingMs !== null) s.resume()
    else {
      ensureNotifyPermission(s.settings)
      s.start(s.taskId)
    }
  }
  const onAdjust = (deltaMs: number) => {
    useFocusTimer.getState().adjustPhase(deltaMs)
  }
  const onSkip = () => {
    completePhase(false)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: { x: rect.left, y: rect.top },
      moved: false,
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* capture is best-effort — drag still works without it */
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
    d.moved = true
    setPos(clampDrag(d.origin.x + dx, d.origin.y + dy, window.innerWidth, window.innerHeight, WIDGET_SIZE, 80))
  }
  const onPointerUp = () => {
    /* a drag is not a click — suppress the navigation that follows */
    if (dragRef.current?.moved) suppressClick.current = true
    dragRef.current = null
  }
  const onClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    router.push('/focus')
  }

  /* the big dial already lives at /focus — stay quiet there */
  if (pathname === '/focus') return null

  const C = 2 * Math.PI * 21
  const onLeft = pos !== null && pos.x !== null && window.innerWidth / 2 > pos.x + WIDGET_SIZE
  const highUp = pos !== null && pos.y !== null && pos.y < 240
  const roomToStep = pos === null || (pos.y !== null && pos.y > STEP_ASIDE_PX + WIDGET_SIZE)
  const stepAside = toasts.length > 0 && roomToStep

  const taskLine =
    taskId !== null
      ? taskTitle !== null
        ? `Focusing: ${taskTitle}`
        : 'Focusing one of your tasks…'
      : kind === 'running'
        ? 'Free focus — the bell only counts time.'
        : kind === 'paused'
          ? 'Paused mid-phase — the remainder is kept.'
          : kind === 'armed'
            ? 'Armed and ready to run.'
            : 'No timer armed — start one in the Focus Hub.'

  return (
    <div
      ref={wrapRef}
      data-pomodoro-float
      data-pomodoro-state={kind}
      className={cn('fixed z-40 print:hidden transition-transform duration-300 ease-out', pos === null ? 'bottom-4 right-4' : '')}
      style={{
        ...(pos !== null && pos.x !== null && pos.y !== null
          ? { left: pos.x, top: pos.y, width: WIDGET_SIZE, height: WIDGET_SIZE }
          : null),
        ...(stepAside ? { transform: `translateY(-${STEP_ASIDE_PX}px)` } : null),
      }}
      onPointerEnter={() => setTipOpen(true)}
      onPointerLeave={() => setTipOpen(false)}
    >
      <button
        type="button"
        aria-label={aria}
        data-pomodoro-left={Math.round(leftMs / 1000)}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex h-12 w-12 cursor-grab touch-none select-none items-center justify-center rounded-full border bg-card/95 shadow-lg backdrop-blur transition-[background-color,border-color] active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={cn('text-border', kind === 'idle' ? 'opacity-60' : 'opacity-100')}
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - fraction)}
            className={cn(
              'transition-[stroke-dashoffset] duration-300 ease-linear',
              phase === 'focus' ? 'text-primary' : 'text-emerald-500',
              kind === 'paused' && 'opacity-70',
              kind === 'idle' && 'text-muted-foreground',
            )}
          />
        </svg>
        <span className={cn('relative', running && phase === 'focus' && 'animate-pulse motion-reduce:animate-none')}>
          {phase !== 'focus' && running ? (
            <Coffee className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
          ) : kind === 'paused' ? (
            <Pause className="h-4 w-4 text-muted-foreground" aria-hidden />
          ) : (
            <TimerIcon
              className={cn('h-4 w-4', kind === 'idle' ? 'text-muted-foreground' : 'text-primary')}
              aria-hidden
            />
          )}
        </span>
      </button>

      {/* the hover control panel — a live view of the same store the hub
       * renders, plus the quick controls the owner asked for: play/pause,
       * add more time, adjust time, skip. The 8 px gap to the icon is real
       * pixels INSIDE this container, so the pointer never crosses dead
       * space — the panel stays open from the icon onto the buttons, and
       * keyboard focus keeps it open the same way (focusin/focusout ride
       * the wrapper, which contains the buttons). */}
      <div
        data-pomodoro-tooltip
        aria-hidden={!tipOpen}
        className={cn(
          'absolute z-50 w-72 transition-opacity duration-150',
          tipOpen ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0',
          highUp ? 'top-full' : 'bottom-full',
          onLeft ? 'left-0' : 'right-0',
        )}
      >
        {highUp ? <div className="h-2 w-full" aria-hidden /> : null}
        <div className="w-full rounded-xl border bg-popover p-3 text-popover-foreground shadow-xl">
          <p className="flex items-baseline justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {PHASE_WORD[phase]}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {kind === 'running' && endsAt !== null
                ? `ends ${clockOfDayLabel(endsAt)}`
                : kind === 'paused'
                  ? 'paused'
                  : kind === 'armed'
                    ? 'ready'
                    : 'idle'}
            </span>
          </p>
          <p role="timer" className="font-reading text-3xl font-bold tabular-nums leading-tight">
            {formatClock(leftMs / 1000)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            of {Math.round(plannedMs / 60000)} min · {cycleFocus}/{settings.longEvery} pomodoros
          </p>

          {/* the quick controls — the same store actions the hub's buttons write */}
          <div data-pomodoro-controls className="mt-2 flex items-center gap-1.5">
            <Button
              type="button"
              size="sm"
              data-pomodoro-toggle
              aria-label={playPauseAriaLabel(kind)}
              onClick={onToggle}
              className="h-8 min-w-0 flex-1 gap-1 px-2 text-xs"
            >
              {kind === 'running' ? (
                <Pause className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Play className="h-3.5 w-3.5" aria-hidden />
              )}
              <span className="whitespace-nowrap">
                {kind === 'running' ? 'Pause' : kind === 'paused' ? 'Resume' : 'Start'}
              </span>
            </Button>
            {QUICK_ADJUST_STEPS_MS.map((stepMs) => (
              <Button
                key={stepMs}
                type="button"
                variant="outline"
                size="sm"
                data-pomodoro-adjust={stepMs}
                aria-label={adjustAriaLabel(stepMs)}
                disabled={kind === 'idle'}
                onClick={() => onAdjust(stepMs)}
                className="h-8 w-9 shrink-0 px-0 text-xs font-semibold tabular-nums"
              >
                {stepLabel(stepMs)}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-pomodoro-skip
              aria-label="Skip to the next phase"
              disabled={kind === 'idle'}
              onClick={onSkip}
              className="h-8 w-8 shrink-0 px-0"
            >
              <SkipForward className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>

          <p className="mt-1.5 border-t pt-1.5 text-xs font-medium leading-5 break-words">{taskLine}</p>
          <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
            Click opens the Focus Hub · drag to move · −/+ tailors this phase.
          </p>
        </div>
        {!highUp ? <div className="h-2 w-full" aria-hidden /> : null}
      </div>
    </div>
  )
}
