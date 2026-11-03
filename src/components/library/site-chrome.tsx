'use client'

/**
 * Site chrome — header (logo, command palette, lessons-done badge, theme)
 * and footer, shared by every routed page. Lives in the root layout.
 */
import Link from 'next/link'
import { BookOpenCheck, Library, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { paths, allBooks } from '@/data/library/index'
import { CommandPalette } from './command-palette'
import { useProgress } from './progress-store'

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
  const completedCount = Object.keys(useProgress((s) => s.completed)).length

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
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
          {completedCount > 0 && (
            <span
              className="mr-1 hidden items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 sm:inline-flex"
              title={`${completedCount} lessons completed`}
            >
              <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
              <span className="tabular-nums">{completedCount}</span>
              <span className="sr-only">lessons completed</span>
            </span>
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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
              <Library className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-reading text-base font-bold tracking-tight">
              LockIn <span className="font-normal text-muted-foreground">Library</span>
            </span>
          </div>
          <p className="mt-3 max-w-md text-xs leading-5 text-foreground/70">
            A growing digital library of complete textbooks — from absolute zero to
            research level — written to teach understanding, not memorisation.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-col gap-2 text-xs text-muted-foreground sm:items-end"
        >
          <Link href={paths.home()} className="font-medium hover:text-foreground hover:underline">
            Library home
          </Link>
          <Link
            href={paths.book(allBooks[0].id)}
            className="font-medium hover:text-foreground hover:underline"
          >
            {allBooks[0].title}
          </Link>
          <Link
            href={paths.glossary(allBooks[0].id)}
            className="font-medium hover:text-foreground hover:underline"
          >
            Glossary &amp; formulas
          </Link>
          <a
            href="https://github.com/Sachin0Amit/lock-in"
            className="font-medium hover:text-foreground hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub — Sachin0Amit/lock-in
          </a>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-foreground/70 sm:px-6">
          <p>Books are TypeScript data · progress saved on this device.</p>
          <p className="hidden sm:block">
            Press <kbd className="rounded border bg-card px-1.5 py-0.5 font-sans font-semibold">Ctrl</kbd>{' '}
            <kbd className="rounded border bg-card px-1.5 py-0.5 font-sans font-semibold">K</kbd> to
            search the library
          </p>
        </div>
      </div>
    </footer>
  )
}
