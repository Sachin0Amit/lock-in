'use client'

/**
 * Revision & Mastery — the on-the-go chapter marking control.
 *
 * One click marks a chapter studied; a studied chapter shows its live
 * state (mastery, passes, due date) with quick "log a revision" and undo
 * actions. No account needed — marks go straight into the local study
 * ledger that drives the whole Revision Hub.
 */
import { useState } from 'react'
import { CheckCircle2, RotateCcw, Undo2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLedgerSync } from './use-ledger-sync'
import { DueBadge, StateChip } from './mastery-bits'
import type { EntryView } from '@/lib/revision/types'

interface Props {
  /** `${bookId}:${chapterNumber}` */
  chapterKey: string
  /** ledger entry for this chapter (null/undefined = not studied) */
  entry?: EntryView | null
  /** called after any server write so the parent can refetch */
  onChanged?: () => void
  compact?: boolean
}

export function QuickMarkChapter({ chapterKey, entry, onChanged, compact }: Props) {
  const { mark } = useLedgerSync()
  const [busy, setBusy] = useState(false)

  const handleMark = async () => {
    setBusy(true)
    const results = await mark({ scope: 'chapter', refId: chapterKey }, 'study', {
      kind: 'chapter-mark',
    })
    setBusy(false)
    const r = results?.[0]
    if (r?.ok) {
      toast.success('Chapter marked as studied', {
        description: 'Revision scheduled — we will prompt you when it is time.',
      })
      onChanged?.()
    }
  }

  const handleRevise = async () => {
    setBusy(true)
    const results = await mark({ scope: 'chapter', refId: chapterKey }, 'revise', {
      quality: 4,
      kind: 'revision',
    })
    setBusy(false)
    const r = results?.[0]
    if (r?.ok && r.entry) {
      toast.success(`Revision logged — pass ${r.entry.passes}`, {
        description: `Next revision ${new Date(r.entry.dueAt).toLocaleDateString()}.`,
      })
      onChanged?.()
    }
  }

  const handleUnmark = async () => {
    setBusy(true)
    await mark({ scope: 'chapter', refId: chapterKey }, 'unmark')
    setBusy(false)
    onChanged?.()
  }

  if (!entry) {
    return (
      <Button
        size="sm"
        variant={compact ? 'ghost' : 'outline'}
        onClick={() => void handleMark()}
        disabled={busy}
        className="gap-1.5 whitespace-nowrap"
      >
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Mark studied
      </Button>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <StateChip state={entry.state} />
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground tabular-nums">
        <RotateCcw className="h-3 w-3" aria-hidden />×{entry.passes}
      </span>
      <DueBadge entry={entry} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void handleRevise()}
            disabled={busy}
            className="h-7 gap-1.5 px-2 text-[11px]"
          >
            <RotateCcw className="h-3 w-3" aria-hidden /> Revise
          </Button>
        </TooltipTrigger>
        <TooltipContent>Log a revision pass (rated Good) — full ratings live in the Revision Hub.</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => void handleUnmark()}
            disabled={busy}
            className="h-7 w-7"
            aria-label="Undo mark as studied"
          >
            <Undo2 className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Undo — removes this chapter from your study ledger.</TooltipContent>
      </Tooltip>
    </div>
  )
}
