'use client'

/**
 * Site chrome — header (logo, primary nav, command palette, lessons-done
 * badge, revision due chip, account chip, theme) and footer, shared by every
 * routed page. Lives in the root layout.
 *
 * No sign-in anywhere in the UX: Library, Builder, My Books and the
 * Revision Hub all work without an account. The account chip only appears
 * for a live signed-in session (cross-device continuity); guests get a
 * clean bar.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { BookOpenCheck, BookPlus, BookMarked, BrainCircuit, Library, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { paths, allBooks } from '@/data/library/index'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CommandPalette } from './command-palette'
import { useProgress } from './progress-store'
import { useAuth } from '@/components/builder/auth-store'
import { RevisionDueChip } from '@/components/revision/due-chip'

const NAV_ITEMS = [
  { href: paths.home(), label: 'Academic Library', short: 'Library', icon: Library },
  { href: '/builder', label: 'Custom Book Builder', short: 'Book Builder', icon: BookPlus },
  { href: '/my-books', label: 'My Custom Books', short: 'My Books', icon: BookMarked },
  { href: '/revision', label: 'Revision Hub', short: 'Revision', icon: BrainCircuit },
]

/** A nav item is active for its whole route tree (library also owns /book/*). */
function isNavItemActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/' || pathname.startsWith('/book/')
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Primary navigation — symbols first. Between md and lg the bar shows the
 * four feature symbols only (full name on hover via tooltip and as the
 * accessible label); from lg up each symbol is paired with its compact name.
 * The route you are on stays highlighted.
 */
function PrimaryNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Primary" className="hidden shrink-0 items-center gap-0.5 md:flex">
      {NAV_ITEMS.map((item) => {
        const active = isNavItemActive(item.href, pathname)
        const Icon = item.icon
        return (
          <Tooltip key={item.href} delayDuration={250}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent/60 hover:text-foreground',
                  active ? 'bg-accent text-foreground' : 'text-muted-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="hidden lg:inline">{item.short}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">{item.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}

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

function AccountChip() {
  const user = useAuth((s) => s.user)
  const loaded = useAuth((s) => s.loaded)
  const signOut = useAuth((s) => s.signOut)

  if (!loaded || !user) return null

  const initials = user.name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Account: ${user.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-xs font-semibold tracking-wide transition-colors hover:border-primary/50"
        >
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <span className="block text-sm font-semibold">{user.name}</span>
          <span className="block text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-books" className="cursor-pointer">
            <BookMarked className="h-4 w-4" aria-hidden /> My custom books
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/builder" className="cursor-pointer">
            <BookPlus className="h-4 w-4" aria-hidden /> Build a book
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/revision" className="cursor-pointer">
            <BrainCircuit className="h-4 w-4" aria-hidden /> Revision Hub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void signOut()} className="cursor-pointer">
          <LogOut className="h-4 w-4" aria-hidden /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteHeader() {
  const completedCount = Object.keys(useProgress((s) => s.completed)).length
  const load = useAuth((s) => s.load)

  useEffect(() => {
    void load()
  }, [load])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href={paths.home()} className="flex shrink-0 items-center gap-2.5" aria-label="LockIn Library home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <Library className="h-4 w-4" aria-hidden />
          </span>
          <span className="hidden font-reading text-lg font-bold tracking-tight lg:block">
            LockIn <span className="font-normal text-muted-foreground">Library</span>
          </span>
        </Link>

        {/* Primary navigation — Library · Book Builder · My Books · Revision Hub (symbols) */}
        <PrimaryNav />

        {/* Mobile navigation */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 md:hidden">
            {NAV_ITEMS.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="cursor-pointer">
                  <item.icon className="h-4 w-4" aria-hidden /> {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-auto flex max-w-md flex-1 justify-end sm:justify-center">
          <CommandPalette />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <RevisionDueChip />
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
          <AccountChip />
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
            Academic Library
          </Link>
          <Link href="/builder" className="font-medium hover:text-foreground hover:underline">
            Custom Book Builder
          </Link>
          <Link href="/my-books" className="font-medium hover:text-foreground hover:underline">
            My Custom Books
          </Link>
          <Link href="/revision" className="font-medium hover:text-foreground hover:underline">
            Revision Hub
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
