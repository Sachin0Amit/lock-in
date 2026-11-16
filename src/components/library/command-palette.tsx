'use client'

/**
 * Command palette (Ctrl/Cmd+K) — the fastest way around the library.
 * Full-text search across books, lessons and glossary terms, plus quick
 * actions (continue reading, random lesson, theme toggle, go home).
 *
 * Data discipline (2026-11-16): search runs through the server route
 * /api/library/search and lesson navigation works off the stub index
 * from /api/library/index — the palette no longer imports the TS
 * registry, so no lesson content ships inside the client bundle.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookPlus,
  BrainCircuit,
  Library,
  Moon,
  Shuffle,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { paths, type SearchHit } from '@/data/library/derive'
import { useLessonStubs } from '@/lib/library-client'
import { useProgress } from './progress-store'

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchHit[]>([])
  const { resolvedTheme, setTheme } = useTheme()
  const lastLessonId = useProgress((s) => s.lastLessonId)
  const completed = useProgress((s) => s.completed)
  const stubs = useLessonStubs()

  const resume = lastLessonId ? stubs.find((l) => l.id === lastLessonId) : undefined

  /* debounced server-side search — the ranking engine stays where the
   * content is (the server); only the hit list crosses the wire */
  const seq = useRef(0)
  useEffect(() => {
    const q = query.trim()
    const id = ++seq.current
    const t = setTimeout(() => {
      if (q.length < 2) {
        if (id === seq.current) setResults([])
        return
      }
      fetch(`/api/library/search?q=${encodeURIComponent(q)}`)
        .then((r) => (r.ok ? r.json() : { hits: [] }))
        .then((d: { hits?: SearchHit[] }) => {
          if (id === seq.current) setResults(d.hits ?? [])
        })
        .catch(() => {
          if (id === seq.current) setResults([])
        })
    }, 140)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  const go = useCallback(
    (url: string) => {
      close()
      router.push(url)
    },
    [close, router],
  )

  const lessons = results.filter((r) => r.type === 'lesson')
  const books = results.filter((r) => r.type === 'book')
  const terms = results.filter((r) => r.type === 'term')
  const searching = query.trim().length >= 2
  const noResults = searching && results.length === 0

  const randomLesson = useCallback(() => {
    if (stubs.length === 0) return
    const pick = stubs[Math.floor(Math.random() * stubs.length)]
    go(paths.lesson(pick.bookId, pick.id))
  }, [go, stubs])

  return (
    <>
      {/* Touch / click entry point */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search (Ctrl K)"
        className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <span className="flex gap-0.5 text-[11px] leading-none">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">Ctrl</kbd>
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">K</kbd>
        </span>
        <span className="hidden sm:inline">Search</span>
      </button>

      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
        <DialogContent className="overflow-hidden p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Search the library</DialogTitle>
            <DialogDescription>
              Search books, lessons and glossary terms, or run a quick action.
            </DialogDescription>
          </DialogHeader>
          <Command shouldFilter={false} loop>
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search lessons, terms, books…"
            />
            <CommandList>
              {noResults && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No matches for “{query}” — the library is still growing.
                </p>
              )}

              {!searching && (
                <>
                  {resume && (
                    <CommandGroup heading="Continue">
                      <CommandItem
                        value={`continue-${resume.id}`}
                        onSelect={() => go(paths.lesson(resume.bookId, resume.id))}
                      >
                        <BookOpenCheck className="h-4 w-4" aria-hidden />
                        <span className="min-w-0 truncate">
                          {resume.number} {resume.title}
                        </span>
                        <CommandShortcut>{resume.bookTitle}</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  )}
                  <CommandGroup heading="Actions">
                    <CommandItem value="action-home" onSelect={() => go(paths.home())}>
                      <Library className="h-4 w-4" aria-hidden />
                      Go to the library home
                      <CommandShortcut>Home</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="action-builder" onSelect={() => go('/builder')}>
                      <BookPlus className="h-4 w-4" aria-hidden />
                      Build a custom book
                      <CommandShortcut>Builder</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="action-my-books" onSelect={() => go('/my-books')}>
                      <BookMarked className="h-4 w-4" aria-hidden />
                      My custom books
                      <CommandShortcut>Shelf</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="action-revision" onSelect={() => go('/revision')}>
                      <BrainCircuit className="h-4 w-4" aria-hidden />
                      Revision Hub — revise &amp; track
                      <CommandShortcut>Revision</CommandShortcut>
                    </CommandItem>
                    <CommandItem value="action-random" onSelect={randomLesson}>
                      <Shuffle className="h-4 w-4" aria-hidden />
                      Open a random lesson
                      <CommandShortcut>
                        {completed && Object.keys(completed).length > 0 ? 'Explore' : 'Start'}
                      </CommandShortcut>
                    </CommandItem>
                    <CommandItem
                      value="action-theme"
                      onSelect={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    >
                      {resolvedTheme === 'dark' ? (
                        <Sun className="h-4 w-4" aria-hidden />
                      ) : (
                        <Moon className="h-4 w-4" aria-hidden />
                      )}
                      Toggle {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
                    </CommandItem>
                  </CommandGroup>
                </>
              )}

              {books.length > 0 && (
                <CommandGroup heading="Books">
                  {books.map((h) => (
                    <CommandItem
                      key={`b-${h.bookId}`}
                      value={`book-${h.bookId}-${h.title}`}
                      onSelect={() => go(paths.book(h.bookId))}
                    >
                      <Library className="h-4 w-4" aria-hidden />
                      <span className="min-w-0 truncate">{h.title}</span>
                      <CommandShortcut>Book</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {lessons.length > 0 && (
                <CommandGroup heading="Lessons">
                  {lessons.map((h) => (
                    <CommandItem
                      key={`l-${h.lessonId}`}
                      value={`lesson-${h.lessonId}`}
                      onSelect={() => go(paths.lesson(h.bookId, h.lessonId!))}
                    >
                      <BookOpen className="h-4 w-4" aria-hidden />
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{h.title}</span>
                        {h.snippet ? (
                          <span className="truncate text-xs text-muted-foreground">{h.snippet}</span>
                        ) : (
                          <span className="truncate text-xs text-muted-foreground">{h.subtitle}</span>
                        )}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {terms.length > 0 && (
                <CommandGroup heading="Terms">
                  {terms.map((h) => (
                    <CommandItem
                      key={`t-${h.lessonId}-${h.title}`}
                      value={`term-${h.lessonId}-${h.title}`}
                      onSelect={() => go(paths.lesson(h.bookId, h.lessonId!))}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">{h.title}</span>
                        <span className="truncate text-xs text-muted-foreground">{h.snippet}</span>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!searching && stubs.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Recently written">
                    {stubs.slice(-4).reverse().map((l) => (
                      <CommandItem
                        key={`recent-${l.id}`}
                        value={`recent-${l.id}`}
                        onSelect={() => go(paths.lesson(l.bookId, l.id))}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden />
                        <span className="min-w-0 truncate">
                          {l.number} {l.title}
                        </span>
                        <CommandShortcut>{l.bookTitle}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
            <p className="border-t px-3 py-2 text-center text-[11px] text-muted-foreground">
              ↑↓ to navigate · ↵ to open · esc to close
            </p>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
