'use client'

/**
 * LibraryApp — the single-page shell for the whole reading platform.
 * Views (home / book / lesson) are client state, so every reader keeps
 * their exact position across navigation.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpenCheck, Library, Moon, Search, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  findBook,
  findLesson,
  searchLibrary,
  type SearchHit,
} from '@/data/library/index'
import { BookView } from './book-view'
import { HomeView } from './home-view'
import { LessonView } from './lesson-view'
import { useProgress } from './progress-store'

type View =
  | { type: 'home' }
  | { type: 'book'; bookId: string }
  | { type: 'lesson'; bookId: string; lessonId: string }

/* ---------------------------------------------------------------- */
/* Theme toggle                                                      */
/* ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- */
/* Search                                                            */
/* ---------------------------------------------------------------- */

function SearchBox({
  query,
  setQuery,
  onPick,
}: {
  query: string
  setQuery: (q: string) => void
  onPick: (hit: SearchHit) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const hits = searchLibrary(query)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setQuery])

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Search books and lessons…"
          aria-label="Search the library"
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && hits.length > 0) {
              onPick(hits[0])
              setOpen(false)
            }
          }}
          className="h-9 w-full rounded-md border bg-card pl-9 pr-8 text-sm outline-none ring-ring/50 transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {open && query.length >= 2 && (
        <div className="absolute left-0 right-0 top-11 z-50 max-h-96 overflow-y-auto rounded-lg border bg-popover p-1.5 shadow-lg">
          {hits.length === 0 && (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              Nothing matches “{query}” yet — the library is still young.
            </p>
          )}
          {hits.map((hit) => (
            <button
              key={`${hit.type}-${hit.title}`}
              type="button"
              onClick={() => {
                onPick(hit)
                setOpen(false)
              }}
              className="flex w-full items-start gap-2.5 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-accent"
            >
              {hit.type === 'book' ? (
                <Library className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              ) : (
                <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{hit.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{hit.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Shell                                                             */
/* ---------------------------------------------------------------- */

export function LibraryApp() {
  const [view, setView] = useState<View>({ type: 'home' })
  const [query, setQuery] = useState('')
  const completedCount = useProgress((s) => Object.keys(s.completed).length)

  const goHome = useCallback(() => setView({ type: 'home' }), [])
  const openBook = useCallback((bookId: string) => setView({ type: 'book', bookId }), [])
  const openLesson = useCallback(
    (bookId: string, lessonId: string) => setView({ type: 'lesson', bookId, lessonId }),
    [],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [view])

  const onPickSearch = useCallback(
    (hit: SearchHit) => {
      setQuery('')
      if (hit.type === 'book') openBook(hit.bookId)
      else if (hit.lessonId) openLesson(hit.bookId, hit.lessonId)
    },
    [openBook, openLesson],
  )

  const lessonRef =
    view.type === 'lesson' ? findLesson(view.lessonId) : undefined
  const book = view.type === 'book' ? findBook(view.bookId) : lessonRef?.book

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={goHome}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="LockIn Library home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
              <Library className="h-4 w-4" aria-hidden />
            </span>
            <span className="hidden font-reading text-lg font-bold tracking-tight sm:block">
              LockIn <span className="font-normal text-muted-foreground">Library</span>
            </span>
          </button>

          <div className="mx-auto flex max-w-md flex-1 justify-end sm:justify-center">
            <SearchBox query={query} setQuery={setQuery} onPick={onPickSearch} />
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

      {/* Main */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view.type === 'lesson' ? view.lessonId : view.type === 'book' ? view.bookId : 'home'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {view.type === 'home' && <HomeView onOpenBook={openBook} />}
            {view.type === 'book' && book && <BookView book={book} onOpenLesson={openLesson} />}
            {view.type === 'lesson' && lessonRef && (
              <LessonView ref_={lessonRef} onOpenLesson={openLesson} onOpenBook={openBook} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <p>LockIn Library — a growing digital library, written to teach understanding.</p>
          <p>Progress and bookmarks are saved on this device.</p>
        </div>
      </footer>
    </div>
  )
}
