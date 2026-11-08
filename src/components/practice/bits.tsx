'use client'

/**
 * Practice — shared visual vocabulary: readiness dials and metric bars
 * (the same honest-number discipline as revision's mastery-bits), MCQ
 * option grids and free-response solution bodies shared by the exam and
 * drill runners.
 */
import { Check } from 'lucide-react'
import { RichText } from '@/components/library/math'

/* ------------------------------------------------------------------ */
/* Readiness visuals                                                   */
/* ------------------------------------------------------------------ */

const RING_COLOR = (v: number) =>
  v >= 85 ? '#059669' : v >= 65 ? '#10b981' : v >= 40 ? '#f59e0b' : v > 0 ? '#f97316' : '#d6d3d1'

/** Circular readiness dial (conic gradient — no canvas, no charts lib). */
export function ReadinessDial({
  value,
  size = 96,
  label,
}: {
  value: number
  size?: number
  label?: string
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${RING_COLOR(v)} ${v * 3.6}deg, hsl(var(--muted)) 0deg)`,
      }}
      role="img"
      aria-label={`${label ?? 'Readiness'} ${v} of 100`}
    >
      <div
        className="absolute inset-[10%] flex flex-col items-center justify-center rounded-full bg-background"
        style={{ fontSize: size >= 80 ? '1.25rem' : '1rem' }}
      >
        <span className="font-reading font-bold tabular-nums">{v}</span>
        {label && size >= 80 && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

/** Thin labelled metric bar (coverage / mastery / freshness). */
export function MetricBar({ label, value }: { label: string; value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">{v}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${v}%`, background: RING_COLOR(v) }} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Question rendering                                                  */
/* ------------------------------------------------------------------ */

export function PromptText({ text, className }: { text: string; className?: string }) {
  return (
    <p className={`font-medium leading-7 ${className ?? ''}`}>
      <RichText text={text} />
    </p>
  )
}

export function SolutionBody({ solution }: { solution: string | string[] }) {
  if (!Array.isArray(solution)) return <RichText text={solution} />
  return (
    <ol className="space-y-1.5">
      {solution.map((step, i) => (
        <li key={i} className="leading-7">
          {i === 0 && (
            <span className="mr-1.5 inline-block rounded-full bg-[var(--book-green)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Sol.
            </span>
          )}
          <RichText text={step} />
        </li>
      ))}
    </ol>
  )
}

/**
 * MCQ option grid. `reveal=false` → neutral exam look; after reveal the
 * correct option goes emerald and the chosen wrong one rose (mirrors the
 * reader's quiz styling).
 */
export function OptionGrid({
  options,
  answerIndex,
  chosen,
  reveal,
  disabled,
  onChoose,
  compact,
}: {
  options: string[]
  answerIndex: number
  chosen?: number
  reveal: boolean
  disabled?: boolean
  onChoose?: (optionIndex: number) => void
  compact?: boolean
}) {
  return (
    <div className={`grid gap-2 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
      {options.map((opt, oi) => {
        const isAnswer = oi === answerIndex
        const isChosen = chosen === oi
        let cls = 'border-border bg-card hover:border-primary/50 hover:bg-accent/60 text-foreground'
        if (reveal && isAnswer)
          cls =
            'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
        else if (reveal && isChosen)
          cls =
            'border-rose-500/70 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
        else if (reveal) cls = 'border-border bg-card opacity-60'
        else if (isChosen) cls = 'border-primary bg-primary/10 text-foreground'
        return (
          <button
            key={oi}
            type="button"
            disabled={disabled}
            onClick={() => onChoose?.(oi)}
            className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3.5 py-2 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
              {reveal && isAnswer ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
            </span>
            <RichText text={opt} />
          </button>
        )
      })}
    </div>
  )
}

/** mm:ss countdown / elapsed formatting. */
export function formatClock(totalSecs: number): string {
  const s = Math.max(0, Math.round(totalSecs))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

/** "2h 05m" / "12m" / "45s" for attempt history. */
export function formatDuration(totalSecs: number): string {
  const s = Math.max(0, Math.round(totalSecs))
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`
}
