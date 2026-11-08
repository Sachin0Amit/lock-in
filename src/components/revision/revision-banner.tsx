'use client'

/**
 * Revision & Mastery — the library-home prompt card. Shown only to signed-in
 * users with something due: the app proactively tells you what to revise.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/builder/auth-store'
import { useRevisionBadge } from './revision-store'

export function RevisionBanner() {
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)
  const summary = useRevisionBadge((s) => s.summary)
  const refresh = useRevisionBadge((s) => s.refresh)

  useEffect(() => {
    if (user) void refresh()
  }, [user, refresh])

  if (!authLoaded || !user) return null
  const due = summary?.dueCount ?? 0
  const watch = summary?.watchCount ?? 0
  if (due <= 0 && watch <= 0) return null

  return (
    <section
      aria-label="Revision reminders"
      className="relative overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/[0.06] p-5 dark:bg-rose-500/[0.08]"
    >
      <BrainCircuit
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-rose-500/15"
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-300">
          <BrainCircuit className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug">
            {due > 0
              ? `${due} chapter${due === 1 ? '' : 's'} due for revision`
              : 'Revision watch-list has entries'}{' '}
            {watch > 0 && (
              <span className="font-normal text-muted-foreground">
                · {watch} more at risk of fading
              </span>
            )}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Your spaced-repetition schedule picked these — revising now costs minutes, later costs
            relearning.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/revision">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Revise now
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
