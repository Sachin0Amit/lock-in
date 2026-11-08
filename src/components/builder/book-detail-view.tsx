'use client'

/**
 * Custom book detail — structure editor (Contents), the honest coverage
 * report, and settings (metadata, publish/archive, duplicate, delete).
 * Reorders and edits are saved explicitly; the Main Library is never
 * modified, only referenced.
 */
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  Archive,
  ArchiveRestore,
  BookOpen,
  Clock3,
  Copy,
  FileSearch,
  Loader2,
  PlayCircle,
  RefreshCw,
  Save,
  Send,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
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
import { api, formatDate, formatWords, jsonBody, type BookDetailView } from '@/lib/builder/client-api'
import type { TocChapterDraft } from '@/lib/builder/types'
import { useAuth } from './auth-store'
import { CoverageReport, type RecordInfo } from './coverage-report'
import { CustomCover } from './custom-cover'
import { TocEditor } from './toc-editor'
import { useRecordInfo } from './record-info'

export function BookDetailView() {
  const { bookId } = useParams<{ bookId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)

  const [book, setBook] = useState<BookDetailView | null>(null)
  const [missing, setMissing] = useState(false)
  const [toc, setToc] = useState<TocChapterDraft[]>([])
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { info: libraryInfo } = useRecordInfo()

  useEffect(() => {
    if (!authLoaded || !bookId) return
    if (!user) {
      router.replace(`/signin?next=/my-books/${bookId}`)
      return
    }
    let cancelled = false
    api<{ book: BookDetailView }>(`/api/custom-books/${bookId}`)
      .then((data) => {
        if (cancelled) return
        setBook(data.book)
        setToc(
          data.book.chapters.map((ch) => ({
            title: ch.title,
            items: ch.items.map((i) => ({
              recordId: i.recordId,
              requestedTopic: i.requestedTopic,
              via: i.via,
              confidence: i.confidence,
            })),
          })),
        )
        setMetaTitle(data.book.title)
        setMetaDescription(data.book.description)
      })
      .catch(() => {
        if (!cancelled) setMissing(true)
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoaded, bookId, router])

  const recordInfo = useMemo<Record<string, RecordInfo>>(() => {
    const map: Record<string, RecordInfo> = {}
    if (!book) return map
    for (const ch of book.chapters) {
      for (const item of ch.items) {
        map[item.recordId] = {
          lessonNumber: item.lessonNumber,
          lessonTitle: item.lessonTitle,
          location: item.location,
          url: item.url,
        }
      }
    }
    return map
  }, [book])

  const saveStructure = async () => {
    if (!book) return
    setSaving(true)
    try {
      await api(`/api/custom-books/${book.id}`, { method: 'PATCH', ...jsonBody({ toc }) })
      setDirty(false)
      const data = await api<{ book: BookDetailView }>(`/api/custom-books/${book.id}`)
      setBook(data.book)
      toast({ title: 'Structure saved', description: 'Your chapter order and topic selection were updated.' })
    } catch (e) {
      toast({ title: 'Could not save', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const saveMeta = async () => {
    if (!book) return
    try {
      await api(`/api/custom-books/${book.id}`, {
        method: 'PATCH',
        ...jsonBody({ title: metaTitle, description: metaDescription }),
      })
      const data = await api<{ book: BookDetailView }>(`/api/custom-books/${book.id}`)
      setBook(data.book)
      toast({ title: 'Book details saved' })
    } catch (e) {
      toast({ title: 'Could not save', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    }
  }

  const patchStatus = async (status: 'published' | 'draft' | 'archived') => {
    if (!book) return
    try {
      await api(`/api/custom-books/${book.id}`, { method: 'PATCH', ...jsonBody({ status }) })
      const data = await api<{ book: BookDetailView }>(`/api/custom-books/${book.id}`)
      setBook(data.book)
      toast({ title: status === 'published' ? 'Book published' : status === 'archived' ? 'Book archived' : 'Back to draft' })
    } catch (e) {
      toast({ title: 'Could not update', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    }
  }

  const duplicate = async () => {
    if (!book) return
    try {
      const data = await api<{ id: string }>(`/api/custom-books/${book.id}/duplicate`, { method: 'POST' })
      toast({ title: 'Book duplicated', description: 'The copy is on your shelf.' })
      router.push(`/my-books/${data.id}`)
    } catch (e) {
      toast({ title: 'Could not duplicate', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    }
  }

  const deleteBook = async () => {
    if (!book) return
    try {
      await api(`/api/custom-books/${book.id}`, { method: 'DELETE' })
      toast({ title: 'Custom book deleted', description: 'Main Library content is never affected.' })
      router.push('/my-books')
    } catch (e) {
      toast({ title: 'Could not delete', description: e instanceof Error ? e.message : undefined, variant: 'destructive' })
    }
  }

  if (missing) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-reading text-2xl font-bold">Book not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This custom book does not exist or belongs to another account.
        </p>
        <Button asChild className="mt-6">
          <Link href="/my-books">Back to my custom books</Link>
        </Button>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-20 text-sm text-muted-foreground sm:px-6" aria-busy="true">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading your book…
      </div>
    )
  }

  const totalTopics = toc.reduce((n, c) => n + c.items.length, 0)
  const canPublish = totalTopics > 0

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      {/* header */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/my-books" className="hover:text-foreground hover:underline">My Custom Books</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">{book.title}</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-start gap-6">
        <div className="w-[130px] shrink-0">
          <CustomCover id={book.id} title={book.title} method={book.creationMethod} status={book.status} large />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-reading text-3xl font-bold leading-tight tracking-tight">{book.title}</h1>
            <Badge variant="outline" className={book.status === 'published' ? 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300' : ''}>
              {book.status === 'published' ? 'Published' : book.status === 'draft' ? 'Draft' : 'Archived'}
            </Badge>
            {book.totals.updatesAvailable > 0 && (
              <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-300">
                <RefreshCw className="mr-1 h-3 w-3" aria-hidden />
                {book.totals.updatesAvailable} library update{book.totals.updatesAvailable === 1 ? '' : 's'}
              </Badge>
            )}
          </div>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            {book.description || 'No description yet — add one in Settings.'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" aria-hidden /> {book.totals.chapters} chapters · {book.totals.topics} topics</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" aria-hidden /> {Math.max(1, Math.round(book.totals.words / 200))} min · {formatWords(book.totals.words)} words</span>
            <span>created {formatDate(book.createdAt)}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild className="gap-2">
              <Link href={`/my-books/${book.id}/read`}>
                <PlayCircle className="h-4 w-4" aria-hidden />
                {book.progress.lastReadRecordId ? 'Continue reading' : 'Read the book'}
              </Link>
            </Button>
            {book.status === 'draft' && (
              <Button variant="outline" className="gap-2" onClick={() => void patchStatus('published')} disabled={!canPublish}>
                <Send className="h-4 w-4" aria-hidden /> Publish
              </Button>
            )}
            {book.status === 'published' && (
              <Button variant="outline" className="gap-2" onClick={() => void patchStatus('draft')}>
                Unpublish
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="contents">
        <TabsList className="mb-6">
          <TabsTrigger value="contents">Contents</TabsTrigger>
          <TabsTrigger value="coverage" id="coverage-tab">Coverage report</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* -------------------- Contents -------------------- */}
        <TabsContent value="contents" id="contents" className="space-y-4">
          {book.totals.updatesAvailable > 0 && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              <RefreshCw className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>
                {book.totals.updatesAvailable} referenced lesson{book.totals.updatesAvailable === 1 ? ' has' : 's have'} been
                improved in the Main Academic Library since you added {book.totals.updatesAvailable === 1 ? 'it' : 'them'}.
                Your reading position, bookmarks and notes are preserved — topics flagged in the reader show
                “library update available”.
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              Reorder, rename, remove and add library topics. {dirty && <strong className="text-foreground">Unsaved changes.</strong>}
            </p>
            <Button onClick={() => void saveStructure()} disabled={saving || !dirty} className="gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
              Save structure
            </Button>
          </div>
          <TocEditor
            toc={toc}
            onChange={(next) => {
              setToc(next)
              setDirty(true)
            }}
            recordInfo={libraryInfo}
          />
        </TabsContent>

        {/* -------------------- Coverage -------------------- */}
        <TabsContent value="coverage" id="coverage">
          <Card>
            <CardContent className="py-6">
              <CoverageReport summary={book.coverageSummary} rows={book.coverage} recordInfo={recordInfo} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------------------- Settings -------------------- */}
        <TabsContent value="settings">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="space-y-4 py-6">
                <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                  <FileSearch className="h-4 w-4 text-primary" aria-hidden /> Book details
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="detail-title">Title</Label>
                  <Input id="detail-title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value.slice(0, 200))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="detail-description">Description</Label>
                  <Textarea id="detail-description" rows={4} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value.slice(0, 2000))} />
                </div>
                <Button onClick={() => void saveMeta()} className="gap-2">
                  <Save className="h-4 w-4" aria-hidden /> Save details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-5 py-6">
                <h2 className="text-sm font-semibold">Status &amp; actions</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{book.status === 'archived' ? 'Archived' : book.status === 'published' ? 'Published' : 'Draft'}</p>
                      <p className="text-xs text-muted-foreground">
                        {book.status === 'archived'
                          ? 'Hidden from the main shelf; reading still works.'
                          : book.status === 'published'
                            ? 'Visible on your shelf and ready to read.'
                            : 'Only you can see it; publish when it is ready.'}
                      </p>
                    </div>
                    {book.status === 'archived' ? (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => void patchStatus('published')}>
                        <ArchiveRestore className="h-4 w-4" aria-hidden /> Unarchive
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => void patchStatus('archived')}>
                        <Archive className="h-4 w-4" aria-hidden /> Archive
                      </Button>
                    )}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Duplicate structure</p>
                      <p className="text-xs text-muted-foreground">A copy with the same chapters, topics and coverage report.</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => void duplicate()}>
                      <Copy className="h-4 w-4" aria-hidden /> Duplicate
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-400">Danger zone</h3>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Delete this custom book</p>
                      <p className="text-xs text-muted-foreground">
                        Removes the book, its coverage report, bookmarks, notes and progress.
                        Main Library content is never deleted.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 border-rose-500/40 text-rose-700 hover:bg-rose-50 hover:text-rose-800 dark:text-rose-400" onClick={() => setDeleteOpen(true)}>
                      <Trash2 className="h-4 w-4" aria-hidden /> Delete…
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{book.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the custom book — its structure, coverage report, bookmarks,
              notes and reading progress. The Main Academic Library is never affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep the book</AlertDialogCancel>
            <AlertDialogAction onClick={() => void deleteBook()} className="bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600">
              Delete custom book
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
