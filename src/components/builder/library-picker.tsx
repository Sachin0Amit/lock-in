'use client'

/**
 * Library picker — the searchable selection interface over the Main
 * Academic Library tree (discipline → book/subject → chapter → topic).
 *
 * Used by Method 2 (create from a subject) and by the TOC editor's
 * "add topics" action. Selection is by book / chapter / lesson ids;
 * planned (unwritten) lessons are shown greyed and cannot be picked —
 * the library is the only content source and it must already contain it.
 */
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { api, formatWords, type TreeDisciplineView } from '@/lib/builder/client-api'
import { DISCIPLINE_ICONS } from '@/components/library/bits'

export interface SelectionState {
  bookIds: string[]
  chapterIds: string[]
  lessonIds: string[]
}

export function emptySelection(): SelectionState {
  return { bookIds: [], chapterIds: [], lessonIds: [] }
}

function selectionSize(sel: SelectionState): number {
  return sel.bookIds.length + sel.chapterIds.length + sel.lessonIds.length
}

interface Props {
  selected: SelectionState
  onChange: (next: SelectionState) => void
  /** lesson record ids already used elsewhere (shown as "already added") */
  excludeLessonIds?: Set<string>
  heightClass?: string
}

export function LibraryPicker({ selected, onChange, excludeLessonIds, heightClass = 'h-[420px]' }: Props) {
  const [tree, setTree] = useState<TreeDisciplineView[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [openDisciplines, setOpenDisciplines] = useState<Set<string>>(new Set(['mathematics']))
  const [openBooks, setOpenBooks] = useState<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false
    api<TreeDisciplineView[]>('/api/library/tree')
      .then((t) => {
        if (!cancelled) setTree(t)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load the library tree.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="rounded-lg border border-rose-500/40 bg-rose-50 p-4 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
        {error}
      </div>
    )
  }

  if (!tree) {
    return <div className={`${heightClass} animate-pulse rounded-lg border bg-muted/30`} aria-hidden />
  }

  const q = query.trim().toLowerCase()
  const matches = (text: string) => !q || text.toLowerCase().includes(q)

  /* flat lesson index for selection bookkeeping */
  const allLessons = tree.flatMap((d) =>
    d.books.flatMap((b) =>
      b.chapters.flatMap((c) =>
        c.lessons.map((ls) => ({
          recordId: ls.recordId,
          bookId: b.bookId,
          chapterKey: `${b.bookId}:${c.number}`,
        })),
      ),
    ),
  )

  const toggleSet = (set: Set<string>, id: string): Set<string> => {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  }

  const isLessonSelected = (bookId: string, chapterKey: string, lessonId: string) =>
    selected.bookIds.includes(bookId) || selected.chapterIds.includes(chapterKey) || selected.lessonIds.includes(lessonId)

  const toggleLesson = (bookId: string, chapterKey: string, lessonId: string) => {
    if (selected.bookIds.includes(bookId) || selected.chapterIds.includes(chapterKey)) return
    onChange({
      ...selected,
      lessonIds: selected.lessonIds.includes(lessonId)
        ? selected.lessonIds.filter((l) => l !== lessonId)
        : [...selected.lessonIds, lessonId],
    })
  }

  const toggleChapter = (bookId: string, chapterKey: string) => {
    if (selected.bookIds.includes(bookId)) return
    onChange({
      ...selected,
      chapterIds: selected.chapterIds.includes(chapterKey)
        ? selected.chapterIds.filter((c) => c !== chapterKey)
        : [...selected.chapterIds, chapterKey],
      lessonIds: selected.lessonIds.filter(
        (l) => allLessons.find((x) => x.recordId === l)?.chapterKey !== chapterKey,
      ),
    })
  }

  const toggleBook = (bookId: string) => {
    onChange({
      ...selected,
      bookIds: selected.bookIds.includes(bookId)
        ? selected.bookIds.filter((b) => b !== bookId)
        : [...selected.bookIds, bookId],
      chapterIds: selected.chapterIds.filter((c) => !c.startsWith(`${bookId}:`)),
      lessonIds: selected.lessonIds.filter(
        (l) => allLessons.find((x) => x.recordId === l)?.bookId !== bookId,
      ),
    })
  }

  return (
    <div className="rounded-lg border">
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter books, chapters, topics…"
          className="h-8 border-0 shadow-none focus-visible:ring-0"
          aria-label="Filter the library tree"
        />
        <Badge variant="secondary" className="shrink-0 tabular-nums">
          {selectionSize(selected)} selected
        </Badge>
      </div>

      <ScrollArea className={heightClass}>
        <div className="p-2">
          {(tree ?? []).map((disc) => {
            const books = disc.books.filter(
              (b) =>
                !q ||
                matches(b.title) ||
                matches(b.subtitle) ||
                b.chapters.some((c) => matches(c.title) || c.lessons.some((l) => matches(l.title))),
            )
            if (books.length === 0) return null
            const discOpen = openDisciplines.has(disc.id) || !!q
            const DiscIcon = DISCIPLINE_ICONS[disc.icon]
            return (
              <Collapsible key={disc.id} open={discOpen} onOpenChange={(o) => setOpenDisciplines(toggleSet(openDisciplines, disc.id))}>
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-semibold hover:bg-accent/60">
                  {discOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden /> : <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />}
                  {DiscIcon ? <DiscIcon className="h-4 w-4 text-muted-foreground" aria-hidden /> : null}
                  <span className="flex-1">{disc.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {books.length} book{books.length === 1 ? '' : 's'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 space-y-1 border-l pl-2">
                    {books.map((book) => {
                      const bookOpen = openBooks.has(book.bookId) || !!q
                      const chapterKeyPrefix = `${book.bookId}:`
                      return (
                        <Collapsible key={book.bookId} open={bookOpen} onOpenChange={(o) => setOpenBooks(toggleSet(openBooks, book.bookId))}>
                          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60">
                            <Checkbox
                              id={`book-${book.bookId}`}
                              checked={selected.bookIds.includes(book.bookId)}
                              onCheckedChange={() => toggleBook(book.bookId)}
                              aria-label={`Select the whole book ${book.title}`}
                            />
                            <CollapsibleTrigger asChild>
                              <button type="button" className="flex min-w-0 flex-1 items-center gap-2 text-left">
                                {bookOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />}
                                <span className="min-w-0">
                                  <span className="block truncate text-sm font-medium">{book.title}</span>
                                  <span className="block truncate text-xs text-muted-foreground">
                                    {book.chapters.reduce((n, c) => n + c.lessons.length, 0)} lessons · {book.level}
                                  </span>
                                </span>
                              </button>
                            </CollapsibleTrigger>
                            {selected.bookIds.includes(book.bookId) && (
                              <Badge variant="outline" className="shrink-0 border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
                                whole book
                              </Badge>
                            )}
                          </div>
                          <CollapsibleContent>
                            <div className="ml-6 space-y-0.5 border-l pl-2">
                              {book.chapters.map((chapter) => {
                                const chapterKey = `${book.bookId}:${chapter.number}`
                                return (
                                  <div key={chapterKey} className="space-y-0.5">
                                    <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60">
                                      <Checkbox
                                        id={`chapter-${chapterKey}`}
                                        checked={selected.chapterIds.includes(chapterKey) || selected.bookIds.includes(book.bookId)}
                                        disabled={selected.bookIds.includes(book.bookId)}
                                        onCheckedChange={() => toggleChapter(book.bookId, chapterKey)}
                                        aria-label={`Select chapter ${chapter.number}: ${chapter.title}`}
                                      />
                                      <label htmlFor={`chapter-${chapterKey}`} className="min-w-0 flex-1 cursor-pointer text-left">
                                        <span className="block truncate text-sm">
                                          <span className="text-muted-foreground">{chapter.number}.</span> {chapter.title}
                                        </span>
                                      </label>
                                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{chapter.lessons.length}</span>
                                    </div>
                                    <div className="ml-6 space-y-0.5">
                                      {chapter.lessons.map((lesson) => {
                                        const checked = isLessonSelected(book.bookId, chapterKey, lesson.recordId)
                                        const excluded = excludeLessonIds?.has(lesson.recordId)
                                        return (
                                          <div key={lesson.recordId} className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent/60">
                                            <Checkbox
                                              id={`lesson-${lesson.recordId}`}
                                              checked={checked}
                                              disabled={selected.bookIds.includes(book.bookId) || selected.chapterIds.includes(chapterKey) || excluded}
                                              onCheckedChange={() => toggleLesson(book.bookId, chapterKey, lesson.recordId)}
                                              aria-label={`Select topic ${lesson.title}`}
                                            />
                                            <label htmlFor={`lesson-${lesson.recordId}`} className="min-w-0 flex-1 cursor-pointer text-left">
                                              <span className={`block truncate text-sm ${excluded ? 'text-muted-foreground line-through' : ''}`}>
                                                <span className="text-muted-foreground">{lesson.number}</span> {lesson.title}
                                              </span>
                                            </label>
                                            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{formatWords(lesson.words)}w</span>
                                          </div>
                                        )
                                      })}
                                      {chapter.plannedLessons.map((planned) => (
                                        <div key={planned} className="flex items-center gap-2 px-2 py-1 opacity-55" title="Planned — not yet written in the library">
                                          <span className="h-4 w-4" aria-hidden />
                                          <span className="min-w-0 flex-1 truncate text-sm italic">{planned}</span>
                                          <Badge variant="outline" className="shrink-0 text-[10px] font-normal">planned</Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
          {(tree ?? []).every((d) => d.books.length === 0) && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No books match “{query}”. The library is still growing — other disciplines are on the roadmap.
            </p>
          )}
        </div>
      </ScrollArea>

      {selectionSize(selected) > 0 && (
        <>
          <Separator />
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <p className="text-xs text-muted-foreground">
              {selected.bookIds.length} book{selected.bookIds.length === 1 ? '' : 's'} · {selected.chapterIds.length} chapter{selected.chapterIds.length === 1 ? '' : 's'} · {selected.lessonIds.length} topic{selected.lessonIds.length === 1 ? '' : 's'}
            </p>
            <Button variant="ghost" size="sm" onClick={() => onChange(emptySelection())}>
              Clear
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
