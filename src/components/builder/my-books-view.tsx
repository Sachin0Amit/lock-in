'use client'

/**
 * My Custom Books — the bookshelf. Cards with generated covers, counts,
 * coverage, reading progress, status, and the full action set: read,
 * continue reading, edit structure, coverage report, duplicate, archive,
 * delete (which never touches Main Library content).
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  BookPlus,
  Copy,
  FileSearch,
  History,
  Loader2,
  MoreVertical,
  PencilLine,
  PlayCircle,
  Trash2,
  Archive,
  ArchiveRestore,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { api, formatDate, formatWords, jsonBody, type BookSummaryView } from '@/lib/builder/client-api'
import { useAuth } from './auth-store'
import { CustomCover } from './custom-cover'

export function MyBooksView() {
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)

  const [books, setBooks] = useState<BookSummaryView[] | null>(null)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all')
  const [deleteTarget, setDeleteTarget] = useState<BookSummaryView | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoaded) return
    if (!user) {
      router.replace('/signin?next=/my-books')
      return
    }
    let cancelled = false
    api<{ books: BookSummaryView[] }>('/api/custom-books')
      .then((data) => {
        if (!cancelled) setBooks(data.books)
      })
      .catch((e) => {
        if (!cancelled) {
          setBooks([])
          toast({ title: 'Could not load your books', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
        }
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoaded, router, toast])

  const refresh = async () => {
    try {
      const data = await api<{ books: BookSummaryView[] }>('/api/custom-books')
      setBooks(data.books)
    } catch {
      /* keep old list */
    }
  }

  const duplicate = async (book: BookSummaryView) => {
    setBusyId(book.id)
    try {
      await api<{ id: string }>(`/api/custom-books/${book.id}/duplicate`, { method: 'POST' })
      toast({ title: 'Book duplicated', description: `“${book.title} (copy)” was added to your shelf.` })
      await refresh()
    } catch (e) {
      toast({ title: 'Could not duplicate', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    } finally {
      setBusyId(null)
    }
  }

  const setArchived = async (book: BookSummaryView, archived: boolean) => {
    setBusyId(book.id)
    try {
      await api(`/api/custom-books/${book.id}`, { method: 'PATCH', ...jsonBody({ status: archived ? 'archived' : 'published' }) })
      await refresh()
    } catch (e) {
      toast({ title: 'Could not update the book', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    } finally {
      setBusyId(null)
    }
  }

  const deleteBook = async () => {
    if (!deleteTarget) return
    const target = deleteTarget
    setDeleteTarget(null)
    setBusyId(target.id)
    try {
      await api(`/api/custom-books/${target.id}`, { method: 'DELETE' })
      toast({ title: 'Custom book deleted', description: 'Main Library content is never affected by deleting a custom book.' })
      await refresh()
    } catch (e) {
      toast({ title: 'Could not delete', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    } finally {
      setBusyId(null)
    }
  }

  if (!authLoaded || (!user && books === null)) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6" aria-busy="true">
        <div className="mx-auto flex max-w-md items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading your bookshelf…
        </div>
      </div>
    )
  }

  const visible = (books ?? []).filter((b) =>
    filter === 'all' ? b.status !== 'archived' : b.status === filter,
  )
  const counts = {
    all: (books ?? []).filter((b) => b.status !== 'archived').length,
    published: (books ?? []).filter((b) => b.status === 'published').length,
    draft: (books ?? []).filter((b) => b.status === 'draft').length,
    archived: (books ?? []).filter((b) => b.status === 'archived').length,
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-[var(--book-green-ink)]">
            Your shelf
          </p>
          <h1 className="font-reading text-4xl font-bold tracking-tight">My Custom Books</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Personal textbooks assembled from the LockIn Academic Library — with their honest
            coverage reports and your reading progress.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/builder">
            <BookPlus className="h-4 w-4" aria-hidden /> Build another book
          </Link>
        </Button>
      </div>

      {(books ?? []).length > 0 && (
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="published">Published ({counts.published})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({counts.draft})</TabsTrigger>
            {counts.archived > 0 && <TabsTrigger value="archived">Archived ({counts.archived})</TabsTrigger>}
          </TabsList>
        </Tabs>
      )}

      {books === null ? null : visible.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--book-sage)] text-[var(--book-green-ink)]">
              <BookOpen className="h-7 w-7" aria-hidden />
            </span>
            <div>
              <h2 className="font-reading text-xl font-bold">
                {filter === 'archived' ? 'No archived books' : filter === 'draft' ? 'No drafts yet' : 'Your shelf is empty'}
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                Build your first personalized textbook — from an examination, a subject, a topic
                list, an uploaded syllabus PDF, or a combination.
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/builder">
                <BookPlus className="h-4 w-4" aria-hidden /> Build your first book
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((book) => (
            <Card key={book.id} className="group overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 py-4">
                <Link href={`/my-books/${book.id}`} className="w-[104px] shrink-0" aria-label={`Open ${book.title}`}>
                  <CustomCover id={book.id} title={book.title} method={book.creationMethod} status={book.status} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/my-books/${book.id}`} className="min-w-0">
                      <h2 className="truncate font-reading text-base font-bold leading-snug group-hover:underline">{book.title}</h2>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label={`Actions for ${book.title}`}>
                          {busyId === book.id ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <MoreVertical className="h-4 w-4" aria-hidden />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem asChild>
                          <Link href={`/my-books/${book.id}/read`} className="cursor-pointer">
                            <PlayCircle className="h-4 w-4" aria-hidden /> Open &amp; read
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/my-books/${book.id}#coverage`} className="cursor-pointer">
                            <FileSearch className="h-4 w-4" aria-hidden /> View coverage report
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/my-books/${book.id}`} className="cursor-pointer">
                            <PencilLine className="h-4 w-4" aria-hidden /> Edit structure
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => void duplicate(book)} className="cursor-pointer">
                          <Copy className="h-4 w-4" aria-hidden /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {book.status === 'archived' ? (
                          <DropdownMenuItem onSelect={() => void setArchived(book, false)} className="cursor-pointer">
                            <ArchiveRestore className="h-4 w-4" aria-hidden /> Unarchive
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onSelect={() => void setArchived(book, true)} className="cursor-pointer">
                            <Archive className="h-4 w-4" aria-hidden /> Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onSelect={() => setDeleteTarget(book)}
                          className="cursor-pointer text-rose-600 focus:text-rose-700 dark:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden /> Delete…
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {book.description || 'No description.'}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="tabular-nums">{book.chapters} ch</span>
                    <span aria-hidden>·</span>
                    <span className="tabular-nums">{book.topics} topics</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(book.createdAt)}</span>
                    {book.status !== 'published' && (
                      <Badge variant="outline" className="text-[10px] font-normal">
                        {book.status === 'draft' ? 'Draft' : 'Archived'}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-auto space-y-1.5 pt-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Reading</span>
                      <span className="font-medium tabular-nums">{book.readingPercent}%</span>
                    </div>
                    <Progress value={book.readingPercent} aria-label={`Reading progress ${book.readingPercent}%`} className="h-1.5" />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Coverage</span>
                      <span
                        className={`font-medium tabular-nums ${
                          book.notAvailable > 0 || book.coveragePercent < 100 ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'
                        }`}
                        title={book.notAvailable > 0 ? `${book.notAvailable} requested topics are not in the library` : undefined}
                      >
                        {book.coveragePercent}%
                        {book.notAvailable > 0 && <span className="ml-1 font-normal text-muted-foreground">({book.notAvailable} missing)</span>}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" className="h-8 flex-1 gap-1.5">
                      <Link href={`/my-books/${book.id}/read`}>
                        <PlayCircle className="h-3.5 w-3.5" aria-hidden />
                        {book.completedTopics > 0 || book.lastOpenedAt ? 'Continue reading' : 'Start reading'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {books && books.length > 0 && (
        <p className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <History className="h-3.5 w-3.5" aria-hidden />
          {formatWords(books.reduce((n, b) => n + b.topics, 0))} curated library topics across your shelf —
          deleting a custom book never deletes library content.
        </p>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{deleteTarget?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the custom book — its structure, coverage report, bookmarks,
              notes and reading progress. The Main Academic Library is never affected: its content
              lives outside custom books.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep the book</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void deleteBook()}
              className="bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600"
            >
              Delete custom book
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
