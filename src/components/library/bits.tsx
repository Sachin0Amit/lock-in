'use client'

/**
 * Shared presentation bits — discipline icons and status badges used by
 * the home page, book page and roadmap. One source of truth so every
 * surface stays visually consistent.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Cpu,
  Dna,
  FlaskConical,
  Globe2,
  Languages,
  Palette,
  Sigma,
  Stethoscope,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/* Discipline icons (kept explicit so tree-shaking works) */
export const DISCIPLINE_ICONS: Record<string, LucideIcon> = {
  mathematics: Sigma,
  physics: Atom,
  chemistry: FlaskConical,
  'computer-science': Cpu,
  engineering: Wrench,
  'medical-sciences': Stethoscope,
  biology: Dna,
  'economics-commerce': TrendingUp,
  humanities: Globe2,
  languages: Languages,
  'arts-music': Palette,
}

export const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  planned: { label: 'Planned', className: 'border-stone-400/50 text-stone-600 dark:text-stone-300' },
  'in-progress': {
    label: 'In progress',
    className: 'border-amber-500/60 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  },
  complete: {
    label: 'Complete',
    className: 'border-emerald-500/60 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
}

export function StatusBadge({ status }: { status: string }) {
  const b = STATUS_BADGE[status] ?? STATUS_BADGE.planned
  return (
    <Badge variant="outline" className={b.className}>
      {b.label}
    </Badge>
  )
}
