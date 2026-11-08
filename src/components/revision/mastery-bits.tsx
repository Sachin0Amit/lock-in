'use client'

/**
 * Revision & Mastery — shared visual vocabulary: mastery state colors,
 * chips, bars and honest date helpers used across every revision surface.
 */
import { CheckCircle2, Flame, RefreshCw, Sprout, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { STATE_LABELS, type EntryState, type EntryView } from '@/lib/revision/types'

export { STATE_LABELS }

export const STATE_STYLES: Record<
  EntryState | 'new',
  { chip: string; dot: string; bar: string; ring: string; label: string }
> = {
  new: {
    chip: 'border-border bg-muted/60 text-muted-foreground',
    dot: 'bg-muted-foreground/40',
    bar: 'bg-muted-foreground/40',
    ring: 'stroke-muted-foreground/30',
    label: 'Not started',
  },
  learning: {
    chip: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    ring: 'stroke-amber-500',
    label: 'Learning',
  },
  familiar: {
    chip: 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300',
    dot: 'bg-teal-500',
    bar: 'bg-teal-500',
    ring: 'stroke-teal-500',
    label: 'Familiar',
  },
  strong: {
    chip: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    ring: 'stroke-emerald-500',
    label: 'Strong',
  },
  mastered: {
    chip: 'border-emerald-600/50 bg-emerald-600/15 text-emerald-800 dark:text-emerald-300',
    dot: 'bg-emerald-600',
    bar: 'bg-emerald-600',
    ring: 'stroke-emerald-600',
    label: 'Mastered',
  },
}

export const STATE_ORDER: (EntryState | 'new')[] = [
  'new',
  'learning',
  'familiar',
  'strong',
  'mastered',
]

export function StateChip({ state, className }: { state: EntryState | 'new'; className?: string }) {
  const s = STATE_STYLES[state]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${s.chip} ${className ?? ''}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {STATE_LABELS[state] ?? s.label}
    </span>
  )
}

export function StateIcon({ state, className }: { state: EntryState | 'new'; className?: string }) {
  const cls = className ?? 'h-4 w-4'
  switch (state) {
    case 'mastered':
      return <Trophy className={`${cls} text-emerald-600 dark:text-emerald-400`} aria-hidden />
    case 'strong':
      return <CheckCircle2 className={`${cls} text-emerald-500`} aria-hidden />
    case 'familiar':
      return <RefreshCw className={`${cls} text-teal-500`} aria-hidden />
    case 'learning':
      return <Sprout className={`${cls} text-amber-500`} aria-hidden />
    default:
      return <span className={`inline-block ${cls} rounded-full border-2 border-muted-foreground/40`} aria-hidden />
  }
}

export function MasteryBar({ mastery, state, className }: { mastery: number; state: EntryState | 'new'; className?: string }) {
  return (
    <span
      className={`inline-flex h-1.5 w-full overflow-hidden rounded-full bg-muted ${className ?? ''}`}
      role="progressbar"
      aria-valuenow={mastery}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Mastery ${mastery} of 100`}
    >
      <span className={`h-full ${STATE_STYLES[state].bar}`} style={{ width: `${Math.min(100, Math.max(2, mastery))}%` }} />
    </span>
  )
}

/** "3 days ago" / "in 5 days" — honest humanised relative dates. */
export function relDays(n: number, past: boolean): string {
  if (n === 0) return past ? 'today' : 'today'
  const word = past ? 'ago' : 'away'
  if (n === 1) return past ? 'yesterday' : 'tomorrow'
  if (n < 14) return `${n} days ${word}`
  if (n < 60) return `${Math.round(n / 7)} weeks ${word}`
  return `${Math.round(n / 30)} months ${word}`
}

export function daysSinceOrUntil(iso: string): { n: number; past: boolean } {
  const ms = Date.now() - new Date(iso).getTime()
  const days = Math.abs(Math.round(ms / 86400000))
  return { n: days, past: ms >= 0 }
}

/** Due badge: rose when overdue, amber when due today, slate when future. */
export function DueBadge({ entry }: { entry: Pick<EntryView, 'dueAt' | 'overdueDays'> }) {
  const { dueAt, overdueDays } = entry
  if (overdueDays > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
        <Flame className="h-3 w-3" aria-hidden /> Overdue {overdueDays}d
      </span>
    )
  }
  const { n, past } = daysSinceOrUntil(dueAt)
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {n <= 1 ? 'Due today' : `Due ${relDays(n, past)}`}
    </span>
  )
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
