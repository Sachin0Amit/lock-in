'use client'

/**
 * Site chrome — header (logo, command palette, streak, theme) and footer,
 * shared by every routed page. Lives in the root layout.
 */
import Link from 'next/link'
import { BookOpenCheck, Flame, Library, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { paths } from '@/data/library/index'
import { CommandPalette } from './command-palette'
import { computeStreak, useProgress } from './progress-store'

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden />
    </Button>
  )
}

export function SiteHeader() {
  const completed = useProgress((s) => s.completed)
  const streak = computeStreak(completed)
  const completedCount = Object.keys(completed).length

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link href={paths.home()} className="flex shrink-0 items-center gap-2.5" aria-label="LockIn Library home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <Library className="h-4 w-4" aria-hidden />
          </span>
          <span className="hidden font-reading text-lg font-bold tracking-tight sm:block">
            LockIn <span className="font-normal text-muted-foreground">Library</span>
          </span>
        </Link>

        <div className="mx-auto flex max-w-md flex-1 justify-end sm:justify-center">
          <CommandPalette />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {streak >= 2 ? (
            <span
              className="mr-1 hidden items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 sm:inline-flex"
              title={`${streak}-day learning streak — complete a lesson every day to keep it alive`}
            >
              <Flame className="h-3.5 w-3.5" aria-hidden />
              <span className="tabular-nums">{streak}</span>
              <span className="sr-only">day streak</span>
            </span>
          ) : (
            completedCount > 0 && (
              <span
                className="mr-1 hidden items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 sm:inline-flex"
                title={`${completedCount} lessons completed`}
              >
                <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
                <span className="tabular-nums">{completedCount}</span>
                <span className="sr-only">lessons completed</span>
              </span>
            )
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
        <p>LockIn Library — a growing digital library, written to teach understanding.</p>
        <p>Books are TypeScript data · progress saved on this device.</p>
      </div>
    </footer>
  )
}
