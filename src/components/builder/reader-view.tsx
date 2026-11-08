'use client'

/**
 * Custom book reader — a dedicated textbook-style reading experience.
 *
 * Left collapsible TOC · main reading area (the referenced library lesson,
 * rendered with the library's own BlockRenderer so KaTeX, quizzes, figures,
 * tables and exercises are preserved exactly) · chapter/topic navigation ·
 * prev/next · progress tracking · bookmarks · personal notes · in-book
 * search · font-size controls · light/dark themes (global) · responsive ·
 * remembers the last reading position.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  ListTree,
  Loader2,
  Minus,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { api, jsonBody, type BookDetailView, type BookItemView, type LessonResponse } from '@/lib/builder/client-api'
import { BlockRenderer } from '@/components/library/blocks'
import { RichText } from '@/components/library/math'
import { useProgress } from '@/components/library/progress-store'
import { useAuth } from './auth-store'
import { useRecordInfo } from './record-info'
import { useLedgerSync } from '@/components/revision/use-ledger-sync'

interface FlatItem {
  chapterIndex: number
  chapterTitle: string
  item: BookItemView
}

export function ReaderView() {
  const { bookId } = useParams<{ bookId: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)
  const { syncLessonComplete } = useLedgerSync()

  const [book, setBook] = useState<BookDetailView | null>(null)
  const [missing, setMissing] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [lessons, setLessons] = useState<Record<string, LessonResponse>>({})
  const [loadingLesson, setLoadingLesson] = useState(false)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState<BookDetailView['notes']>([])
  const [noteDraft, setNoteDraft] = useState('')
  const [notesOpen, setNotesOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(true)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ recordId: string; lessonTitle: string; lessonNumber: string; customChapter: string; snippet: string }[]>([])
  const [searching, setSearching] = useState(false)

  const fontScale = useProgress((s) => s.fontScale)
  const stepFont = useProgress((s) => s.stepFont)
  const { info: libraryInfo } = useRecordInfo()
  const topRef = useRef<HTMLDivElement>(null)

  /* ---------------- load the book ---------------- */
  useEffect(() => {
    if (!authLoaded || !bookId) return
    if (!user) {
      router.replace(`/signin?next=/my-books/${bookId}/read`)
      return
    }
    let cancelled = false
    api<{ book: BookDetailView }>(`/api/custom-books/${bookId}`)
      .then((data) => {
        if (cancelled) return
        setBook(data.book)
        setNotes(data.book.notes)
        setBookmarks(new Set(data.book.bookmarks.map((b) => b.recordId)))
        setCompleted(new Set(data.book.progress.completedRecordIds))
        const requested = searchParams.get('record')
        const start =
          requested && data.book.chapters.some((c) => c.items.some((i) => i.recordId === requested))
            ? requested
            : (data.book.progress.lastReadRecordId &&
                data.book.chapters.some((c) => c.items.some((i) => i.recordId === data.book.progress.lastReadRecordId))
                ? data.book.progress.lastReadRecordId
                : null) ?? data.book.chapters[0]?.items[0]?.recordId ?? null
        setCurrentId(start)
      })
      .catch(() => {
        if (!cancelled) setMissing(true)
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoaded, bookId, router, searchParams])

  const flat = useMemo<FlatItem[]>(
    () => (book ? book.chapters.flatMap((ch, chapterIndex) => ch.items.map((item) => ({ chapterIndex, chapterTitle: ch.title, item }))) : []),
    [book],
  )
  const currentIndex = flat.findIndex((f) => f.item.recordId === currentId)
  const current = currentIndex >= 0 ? flat[currentIndex] : null
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null

  /* ---------------- fetch lesson content ---------------- */
  useEffect(() => {
    if (!currentId || lessons[currentId]) return
    let cancelled = false
    setLoadingLesson(true)
    api<LessonResponse>(`/api/library/lessons/${currentId}`)
      .then((data) => {
        if (!cancelled) setLessons((prevMap) => ({ ...prevMap, [currentId]: data }))
      })
      .catch((e) => {
        if (!cancelled) toast({ title: 'Could not load the lesson', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
      })
      .finally(() => {
        if (!cancelled) setLoadingLesson(false)
      })
    return () => {
      cancelled = true
    }
  }, [currentId, lessons, toast])

  /* ---------------- persist reading position ---------------- */
  useEffect(() => {
    if (!book || !currentId || !user) return
    void api(`/api/custom-books/${book.id}/progress`, {
      method: 'PUT',
      ...jsonBody({ lastReadRecordId: currentId, completedRecordIds: [...completed] }),
    }).catch(() => undefined)
  }, [book, currentId, user, completed])

  /* scroll to top on topic change — plain scrollTo(0) keeps the article in
   * its natural flow position below the sticky toolbar (no overlap) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [currentId])

  const persistCompleted = useCallback(
    async (next: Set<string>) => {
      if (!book) return
      setCompleted(next)
    },
    [book],
  )

  const toggleComplete = () => {
    if (!currentId) return
    const next = new Set(completed)
    const wasDone = next.has(currentId)
    if (wasDone) next.delete(currentId)
    else next.add(currentId)
    void persistCompleted(next)
    /* the same completion also feeds the global study ledger — reading a
     * custom book is studying its underlying library lesson */
    void syncLessonComplete(currentId, !wasDone)
  }

  const toggleBookmark = async () => {
    if (!book || !currentId) return
    if (bookmarks.has(currentId)) {
      setBookmarks((prevSet) => {
        const next = new Set(prevSet)
        next.delete(currentId)
        return next
      })
      await api(`/api/custom-books/${book.id}/bookmarks?recordId=${encodeURIComponent(currentId)}`, { method: 'DELETE' }).catch(() => undefined)
    } else {
      setBookmarks((prevSet) => new Set(prevSet).add(currentId))
      await api(`/api/custom-books/${book.id}/bookmarks`, { method: 'POST', ...jsonBody({ recordId: currentId }) }).catch(() => undefined)
    }
  }

  const addNote = async () => {
    if (!book || !currentId || !noteDraft.trim()) return
    try {
      const data = await api<{ note: BookDetailView['notes'][number] }>(`/api/custom-books/${book.id}/notes`, {
        method: 'POST',
        ...jsonBody({ recordId: currentId, noteContent: noteDraft.trim() }),
      })
      setNotes((prevNotes) => [data.note, ...prevNotes])
      setNoteDraft('')
      toast({ title: 'Note saved' })
    } catch (e) {
      toast({ title: 'Could not save the note', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    }
  }

  const deleteNote = async (noteId: string) => {
    if (!book) return
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId))
    await api(`/api/custom-books/${book.id}/notes/${noteId}`, { method: 'DELETE' }).catch(() => undefined)
  }

  const runSearch = async (q: string) => {
    setSearchQuery(q)
    if (q.trim().length < 2) {
      setSearchResults([])
      return
    }
    setSearching(true)
    try {
      const data = await api<{ hits: typeof searchResults }>(`/api/custom-books/${bookId}/search?q=${encodeURIComponent(q.trim())}`)
      setSearchResults(data.hits)
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  /* ---------------- keyboard navigation ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as EventTarget | null
      if (target instanceof Element && target.closest('input, textarea, select, [cmdk-root], [role="dialog"]')) return
      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault()
        setCurrentId(prev.item.recordId)
        setMobileTocOpen(false)
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault()
        setCurrentId(next.item.recordId)
        setMobileTocOpen(false)
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault()
        void toggleBookmark()
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault()
        toggleComplete()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (missing) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-reading text-2xl font-bold">Book not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This custom book does not exist or belongs to another account.</p>
        <Button asChild className="mt-6">
          <Link href="/my-books">Back to my custom books</Link>
        </Button>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-20 text-sm text-muted-foreground sm:px-6" aria-busy="true">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Opening your book…
      </div>
    )
  }

  const lessonData = currentId ? lessons[currentId] : undefined
  const currentNotes = notes.filter((n) => n.recordId === currentId)
  const completedCount = completed.size
  const progressPercent = flat.length === 0 ? 0 : Math.round((completedCount / flat.length) * 100)

  /* ---------------- the TOC panel (shared desktop/mobile) ---------------- */
  const tocPanel = (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-3">
        <Link href={`/my-books/${book.id}`} className="text-xs text-muted-foreground hover:text-foreground hover:underline">
          ← Book details
        </Link>
        <h2 className="mt-1 font-reading text-base font-bold leading-snug">{book.title}</h2>
        <div className="mt-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Reading progress</span>
            <span className="font-medium tabular-nums text-foreground">{completedCount}/{flat.length} · {progressPercent}%</span>
          </div>
          <Progress value={progressPercent} aria-label={`Reading progress ${progressPercent}%`} className="h-1.5" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav aria-label="Book contents" className="px-2 py-2">
          {book.chapters.map((chapter, ci) => (
            <div key={chapter.id} className="mb-1">
              <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="tabular-nums">{ci + 1}.</span> {chapter.title}
              </p>
              <ul>
                {chapter.items.map((item) => {
                  const isCurrent = item.recordId === currentId
                  const done = completed.has(item.recordId)
                  const marked = bookmarks.has(item.recordId)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentId(item.recordId)
                          setMobileTocOpen(false)
                        }}
                        aria-current={isCurrent ? 'true' : undefined}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                          isCurrent ? 'bg-accent font-medium text-accent-foreground' : 'hover:bg-accent/60'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                        ) : (
                          <Circle className={`h-3.5 w-3.5 shrink-0 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden />
                        )}
                        <span className="min-w-0 flex-1 truncate">
                          <span className="text-muted-foreground">{item.lessonNumber}</span> {item.lessonTitle}
                        </span>
                        {marked && <Bookmark className="h-3 w-3 shrink-0 text-primary" aria-hidden />}
                        {item.updateAvailable && <RefreshCw className="h-3 w-3 shrink-0 text-amber-600 dark:text-amber-400" aria-label="Library update available" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )

  return (
    <div className="w-full pb-16 pt-4">
      <div ref={topRef} className="sr-only" aria-live="polite">
        {current ? `Topic ${current.item.lessonNumber} ${current.item.lessonTitle}` : 'Loading'}
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* desktop sidebar */}
        {tocOpen && (
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] border-r lg:block">
            {tocPanel}
          </aside>
        )}

        {/* main column */}
        <div className="min-w-0">
          {/* toolbar */}
          <div className="sticky top-14 z-30 border-b bg-background/90 backdrop-blur-md">
            <div className="mx-auto flex h-12 w-full max-w-4xl items-center gap-1.5 px-4 sm:px-6">
              <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setTocOpen((o) => !o)} aria-label={tocOpen ? 'Hide contents' : 'Show contents'}>
                {tocOpen ? <PanelLeftClose className="h-4 w-4" aria-hidden /> : <PanelLeftOpen className="h-4 w-4" aria-hidden />}
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileTocOpen(true)} aria-label="Open contents">
                <ListTree className="h-4 w-4" aria-hidden />
              </Button>
              <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {current ? `${current.chapterIndex + 1}. ${current.chapterTitle}` : book.title}
              </p>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search within this book">
                <Search className="h-4 w-4" aria-hidden />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setNotesOpen(true)} aria-label="Notes">
                  <NotebookPen className="h-4 w-4" aria-hidden />
                </Button>
                {currentNotes.length > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground" aria-hidden>
                    {currentNotes.length}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => void toggleBookmark()} aria-label={bookmarks.has(currentId ?? '') ? 'Remove bookmark' : 'Bookmark this topic'}>
                {bookmarks.has(currentId ?? '') ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden />
                ) : (
                  <Bookmark className="h-4 w-4" aria-hidden />
                )}
              </Button>
              <div className="ml-1 flex items-center gap-0.5 rounded-md border p-0.5">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => stepFont(-1)} aria-label="Smaller text">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-9 text-center text-[11px] tabular-nums text-muted-foreground">{Math.round(fontScale * 100)}%</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => stepFont(1)} aria-label="Larger text">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <article className="mx-auto w-full max-w-4xl px-4 pt-6 sm:px-6">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/my-books" className="hover:text-foreground hover:underline">My Custom Books</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <Link href={`/my-books/${book.id}`} className="hover:text-foreground hover:underline">{book.title}</Link>
              {current && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="text-foreground/80">{current.chapterTitle}</span>
                </>
              )}
            </nav>

            {current?.item.updateAvailable && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <p>
                  The library lesson behind this topic has been improved since you added it. You are
                  reading the <strong>live version</strong> — your position, bookmarks and notes are preserved.
                </p>
              </div>
            )}

            {loadingLesson && !lessonData ? (
              <div className="flex items-center gap-2 py-20 text-sm text-muted-foreground" aria-busy="true">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading the lesson…
              </div>
            ) : lessonData ? (
              <>
                {/* lesson header — same Cengage family as the library reader */}
                <header className="mb-8 border-t-2 border-[var(--book-green)] pt-4">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--book-green-ink)]">
                    Lesson {lessonData.record.lessonNumber}
                  </p>
                  <h1 className="font-reading text-3xl font-bold leading-tight tracking-tight text-[var(--book-green-ink)] sm:text-4xl">
                    {lessonData.record.lessonTitle}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden /> {lessonData.record.readMins} min read
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ListTree className="h-3.5 w-3.5" aria-hidden /> {lessonData.record.words.toLocaleString()} words
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpenCheck className="h-3.5 w-3.5" aria-hidden /> from {lessonData.record.bookTitle}
                    </span>
                  </div>
                  {lessonData.record.concepts.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {lessonData.record.concepts.map((c) => (
                        <Badge
                          key={c}
                          variant="outline"
                          className="h-auto whitespace-normal rounded-full border-[var(--book-sage-line)] bg-[var(--book-sage)]/60 font-normal text-[var(--book-green-ink)] text-left leading-relaxed"
                        >
                          {c}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {lessonData.record.prerequisites.length > 0 && (
                    <div className="mt-5 rounded-lg border px-5 py-4">
                      <p className="mb-2 text-sm font-semibold">Before this lesson</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {lessonData.record.prerequisites.map((pid) => {
                          const info = libraryInfo[pid]
                          const done = completed.has(pid)
                          return info ? (
                            <Link
                              key={pid}
                              href={info.url}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                                done
                                  ? 'border-emerald-500/50 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : 'border-border bg-card text-foreground/80 hover:border-primary/50'
                              }`}
                              title="Open in the Academic Library reader"
                            >
                              {done ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <Circle className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
                              {info.lessonNumber} {info.lessonTitle}
                            </Link>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}

                  {lessonData.lesson.objectives && lessonData.lesson.objectives.length > 0 && (
                    <div className="mt-5 rounded-lg border border-[var(--book-sage-line)] bg-[var(--book-sage)] px-5 py-4">
                      <p className="mb-1.5 text-sm font-semibold text-[var(--book-green-ink)]">
                        By the end of this lesson you will be able to
                      </p>
                      <ul className="list-inside list-disc space-y-0.5 text-sm leading-6 text-foreground/90">
                        {lessonData.lesson.objectives.map((o, i) => (
                          <li key={i}>
                            <RichText text={o} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </header>

                <Separator className="mb-8" />

                {/* reading pane — font size driven by the persisted scale */}
                <div className="lesson-body font-reading" style={{ ['--fs' as string]: String(fontScale) }}>
                  <BlockRenderer blocks={lessonData.lesson.blocks} lessonId={lessonData.lesson.id} />
                </div>

                {lessonData.lesson.sources && lessonData.lesson.sources.length > 0 && (
                  <aside className="mt-10 rounded-lg border border-dashed px-5 py-4">
                    <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                      <ExternalLink className="h-4 w-4 text-primary" aria-hidden /> Sources consulted for this lesson
                    </p>
                    <ul className="space-y-1 text-sm leading-6 text-muted-foreground">
                      {lessonData.lesson.sources.map((s) => (
                        <li key={s} className="font-mono text-xs">{s}</li>
                      ))}
                    </ul>
                  </aside>
                )}

                <Separator className="my-10" />

                {/* footer: completion + shortcuts */}
                <footer className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={toggleComplete} variant={completed.has(currentId ?? '') ? 'secondary' : 'default'} className="gap-2">
                      {completed.has(currentId ?? '') ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                          Completed — tap to undo
                        </>
                      ) : (
                        <>
                          <BookOpenCheck className="h-4 w-4" aria-hidden />
                          Mark topic complete
                        </>
                      )}
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => void toggleBookmark()} variant="outline" className="gap-2">
                          {bookmarks.has(currentId ?? '') ? (
                            <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden />
                          ) : (
                            <Bookmark className="h-4 w-4" aria-hidden />
                          )}
                          {bookmarks.has(currentId ?? '') ? 'Bookmarked' : 'Bookmark'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Saved to this book · shortcut: B</TooltipContent>
                    </Tooltip>
                  </div>

                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">←</kbd>
                      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">→</kbd>
                      previous / next topic
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">B</kbd>
                      bookmark
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans font-semibold">C</kbd>
                      complete
                    </span>
                  </p>

                  {/* prev/next */}
                  <nav className="grid gap-3 sm:grid-cols-2" aria-label="Topic navigation">
                    {prev ? (
                      <button
                        type="button"
                        onClick={() => setCurrentId(prev.item.recordId)}
                        className="group flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent/50"
                      >
                        <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                        <span>
                          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Previous</span>
                          <span className="block font-medium leading-snug">
                            {prev.item.lessonNumber} {prev.item.lessonTitle}
                          </span>
                        </span>
                      </button>
                    ) : (
                      <span className="hidden sm:block" />
                    )}
                    {next ? (
                      <button
                        type="button"
                        onClick={() => setCurrentId(next.item.recordId)}
                        className="group flex items-center justify-end gap-3 rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
                      >
                        <span>
                          <span className="block text-xs uppercase tracking-wide text-muted-foreground">Next</span>
                          <span className="block font-medium leading-snug">
                            {next.item.lessonNumber} {next.item.lessonTitle}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                      </button>
                    ) : (
                      <Link
                        href={`/my-books/${book.id}`}
                        className="group flex items-center justify-end gap-3 rounded-lg border border-dashed p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
                      >
                        <span>
                          <span className="block text-xs uppercase tracking-wide text-muted-foreground">End of the book</span>
                          <span className="block font-medium leading-snug">Back to the book details</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                      </Link>
                    )}
                  </nav>
                </footer>
              </>
            ) : null}
          </article>
        </div>
      </div>

      {/* mobile TOC sheet */}
      <Sheet open={mobileTocOpen} onOpenChange={setMobileTocOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-sm p-0 sm:w-[380px]">
          <SheetHeader className="sr-only">
            <SheetTitle>Book contents</SheetTitle>
            <SheetDescription>Navigate the chapters and topics of this custom book.</SheetDescription>
          </SheetHeader>
          <div className="h-full">{tocPanel}</div>
        </SheetContent>
      </Sheet>

      {/* notes sheet */}
      <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
        <SheetContent side="right" className="w-[85vw] max-w-md sm:w-[420px]">
          <SheetHeader className="pb-0">
            <SheetTitle className="flex items-center gap-1.5 text-base">
              <NotebookPen className="h-4 w-4 text-primary" aria-hidden /> My notes
            </SheetTitle>
            <SheetDescription>
              {current ? `On “${current.item.lessonNumber} ${current.item.lessonTitle}”` : 'Open a topic to write notes.'}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex h-[calc(100%-6.5rem)] flex-col gap-4 overflow-hidden px-4 pb-4">
            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                {currentNotes.length === 0 && (
                  <p className="text-sm italic text-muted-foreground">No notes on this topic yet.</p>
                )}
                {currentNotes.map((note) => (
                  <div key={note.id} className="rounded-lg border p-3">
                    <p className="whitespace-pre-wrap text-sm leading-6">{note.noteContent}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{new Date(note.updatedAt).toLocaleString()}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-600 hover:text-rose-700 dark:text-rose-400" onClick={() => void deleteNote(note.id)} aria-label="Delete note">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-2 border-t pt-3">
              <Textarea
                rows={3}
                placeholder="Write a note on this topic…"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                aria-label="New note"
                maxLength={5000}
              />
              <Button className="w-full gap-1.5" onClick={() => void addNote()} disabled={!noteDraft.trim()}>
                <NotebookPen className="h-4 w-4" aria-hidden /> Save note
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* in-book search dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1.5">
              <Search className="h-4 w-4" aria-hidden /> Search within “{book.title}”
            </DialogTitle>
            <DialogDescription>
              Full-text search across every topic included in this custom book.
            </DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            value={searchQuery}
            onChange={(e) => void runSearch(e.target.value)}
            placeholder="Search terms, formulas, definitions…"
            aria-label="Search within the book"
          />
          <div className="max-h-[50vh] overflow-y-auto">
            {searching && (
              <p className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Searching…
              </p>
            )}
            {!searching && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">No matches in this book.</p>
            )}
            <ul className="space-y-1">
              {searchResults.map((hit) => (
                <li key={hit.recordId}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentId(hit.recordId)
                      setSearchOpen(false)
                    }}
                    className="w-full rounded-md border px-3 py-2 text-left text-sm transition-colors hover:border-primary/50 hover:bg-accent/50"
                  >
                    <span className="block font-medium">
                      <span className="text-muted-foreground">{hit.lessonNumber}</span> {hit.lessonTitle}
                    </span>
                    <span className="block text-xs text-muted-foreground">in {hit.customChapter}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{hit.snippet}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
