'use client'

/**
 * Custom Book Builder — the creation wizard.
 *
 * Steps: pick a method → provide input → review the library matches →
 * curate the table of contents → save draft / publish.
 *
 * Five creation methods (all resolve to the SAME discovery engine, which
 * only ever selects existing Main Academic Library records):
 *   1. from an examination (built-in scope maps)
 *   2. from library subjects (browse & pick)
 *   3. from a pasted topic list
 *   4. from an uploaded syllabus PDF (text layer, OCR fallback)
 *   5. a combination of the above
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpenCheck,
  BookPlus,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Layers,
  Library,
  ListTree,
  Loader2,
  PencilLine,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { api, formatWords, jsonBody, type MatchResponse, type PdfUploadResponse } from '@/lib/builder/client-api'
import { parseTopicList } from '@/lib/builder/topic-parser'
import type { ParsedInput, TocChapterDraft } from '@/lib/builder/types'
import { useAuth } from './auth-store'
import { emptySelection, LibraryPicker, type SelectionState } from './library-picker'
import { matchesToCoverage, ReviewMatches } from './review-matches'
import { TocEditor } from './toc-editor'
import { useRecordInfo } from './record-info'

type Method = 'exam' | 'subject' | 'topics' | 'pdf' | 'combination'
type Step = 'method' | 'input' | 'review' | 'curate'

const DRAFT_KEY = 'lockin-builder-draft'

interface WizardDraft {
  method: Method
  title: string
  description: string
  toc: TocChapterDraft[]
  coverage: ReturnType<typeof matchesToCoverage>
  inputMetadata: Record<string, unknown>
  savedAt: number
}

const METHODS: { key: Method; title: string; blurb: string; icon: typeof GraduationCap }[] = [
  { key: 'exam', title: 'From an examination', blurb: 'GATE, JEE, UPSC, CUET, NEET, CAT — map the paper’s scope onto library content.', icon: GraduationCap },
  { key: 'subject', title: 'From a subject', blurb: 'Browse the library tree and pick books, chapters or individual topics.', icon: Library },
  { key: 'topics', title: 'From a topic list', blurb: 'Paste your own syllabus or topic list and let the engine find each topic.', icon: ListTree },
  { key: 'pdf', title: 'From an uploaded PDF', blurb: 'Upload a syllabus PDF — the structure is extracted for your review.', icon: FileText },
  { key: 'combination', title: 'A combination book', blurb: 'Mix subjects, topic lists, PDFs and your existing custom books.', icon: Layers },
]

const KNOWN_EXAMS = ['GATE CSE 2027', 'JEE Main', 'JEE Advanced', 'UPSC CSE', 'CUET UG', 'NEET UG', 'CAT']

function serializeParsed(parsed: ParsedInput): string {
  const lines: string[] = []
  if (parsed.rootName) lines.push(`Subject: ${parsed.rootName}`)
  const walk = (nodes: ParsedInput['nodes'], depth: number) => {
    for (const node of nodes) {
      lines.push(`${'  '.repeat(depth)}- ${node.topic}`)
      if (node.children) walk(node.children, depth + 1)
    }
  }
  walk(parsed.nodes, 0)
  return lines.join('\n')
}

export function BuilderApp() {
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuth((s) => s.user)
  const authLoaded = useAuth((s) => s.loaded)
  const { info: recordInfo } = useRecordInfo()

  const [step, setStep] = useState<Step>('method')
  const [method, setMethod] = useState<Method>('topics')

  /* inputs */
  const [examText, setExamText] = useState('')
  const [topicText, setTopicText] = useState('')
  const [selection, setSelection] = useState<SelectionState>(emptySelection())
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfMeta, setPdfMeta] = useState<PdfUploadResponse | null>(null)
  const [pdfText, setPdfText] = useState('')
  const [baseBookId, setBaseBookId] = useState('')
  const [myBooks, setMyBooks] = useState<{ id: string; title: string }[]>([])

  /* matching */
  const [matching, setMatching] = useState(false)
  const [matchError, setMatchError] = useState<string | null>(null)
  const [result, setResult] = useState<MatchResponse | null>(null)

  /* curate */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [toc, setToc] = useState<TocChapterDraft[]>([])
  const [coverage, setCoverage] = useState<ReturnType<typeof matchesToCoverage>>([])
  const [inputMetadata, setInputMetadata] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  const [draft, setDraft] = useState<WizardDraft | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* load any saved wizard draft once */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) setDraft(JSON.parse(raw) as WizardDraft)
    } catch {
      /* ignore corrupt drafts */
    }
  }, [])

  useEffect(() => {
    if (user && step === 'input' && method === 'combination' && myBooks.length === 0) {
      void api<{ books: { id: string; title: string; status: string }[] }>('/api/custom-books')
        .then((data) => setMyBooks(data.books.filter((b) => b.status !== 'archived').map((b) => ({ id: b.id, title: b.title }))))
        .catch(() => undefined)
    }
  }, [user, step, method, myBooks.length])

  const parsedPreview = useMemo(() => parseTopicList(topicText), [topicText])
  const pdfParsedPreview = useMemo(() => parseTopicList(pdfText), [pdfText])

  const startMethod = (m: Method) => {
    setMethod(m)
    setStep('input')
    setMatchError(null)
  }

  const analyze = useCallback(async () => {
    setMatching(true)
    setMatchError(null)
    try {
      let body: Record<string, unknown>
      if (method === 'exam') {
        if (!examText.trim()) throw new Error('Please enter an examination name first.')
        body = { method, exam: examText.trim() }
      } else if (method === 'topics') {
        if (!topicText.trim()) throw new Error('Please paste a topic list first.')
        body = { method, topicText }
      } else if (method === 'subject') {
        body = { method, selection }
      } else if (method === 'pdf') {
        const parsed = parseTopicList(pdfText)
        if (parsed.nodes.length === 0) throw new Error('No recognizable topics in the PDF structure — try editing the text on the left.')
        body = { method, parsed }
      } else {
        body = { method, topicText: topicText.trim() || undefined, selection, baseBookId: baseBookId || undefined }
        if (pdfText.trim()) body.parsed = parseTopicList(pdfText)
      }

      const data = await api<MatchResponse>('/api/builder/match', { method: 'POST', ...jsonBody(body) })
      setResult(data)
      if (data.unknownExam) {
        setMatchError(data.note ?? 'This examination is not in the built-in scope maps yet.')
        return
      }
      if (data.totalLessons === 0) {
        setMatchError(
          'No matching content was found in the Main Academic Library for this input. The library is still growing — try Method 2 to browse what exists today.',
        )
        return
      }
      /* default title from the input */
      const fallbackTitle =
        method === 'exam'
          ? examText.trim()
          : method === 'pdf'
            ? pdfMeta?.parsed.rootName || 'My syllabus book'
            : parsedPreview.rootName || (selection.bookIds.length === 1 ? myBooks.find((b) => b.id === selection.bookIds[0])?.title ?? 'My custom book' : 'My custom book')
      setTitle((prev) => prev || fallbackTitle.slice(0, 200) || 'My custom book')
      setToc(data.toc)
      setCoverage(matchesToCoverage(data))
      setInputMetadata(
        method === 'exam'
          ? { exam: examText.trim() }
          : method === 'topics'
            ? { topicText: topicText.slice(0, 20000) }
            : method === 'subject'
              ? { selection }
              : method === 'pdf'
                ? { filename: 'syllabus.pdf', pages: pdfMeta?.pages, usedOcr: pdfMeta?.usedOcr, warnings: pdfMeta?.warnings ?? [] }
                : { topicText: topicText.slice(0, 20000), selection, baseBookId },
      )
      setStep('review')
    } catch (err) {
      setMatchError(err instanceof Error ? err.message : 'Matching failed.')
    } finally {
      setMatching(false)
    }
  }, [method, examText, topicText, selection, pdfText, pdfMeta, baseBookId, parsedPreview.rootName, myBooks])

  /* review-step actions operate on the match result + toc together */
  const swapAlternative = (requested: string, altRecordId: string) => {
    if (!result) return
    /* replace the toc item of that requested topic with the alternative */
    setToc((prevToc) =>
      prevToc.map((ch) => ({
        ...ch,
        items: ch.items.map((item) =>
          item.requestedTopic === requested ? { ...item, recordId: altRecordId, via: 'user-selected alternative', confidence: 0.9 } : item,
        ),
      })),
    )
    /* update the coverage row */
    setCoverage((rows) =>
      rows.map((r) =>
        r.requestedTopic === requested ? { ...r, matchedLibraryRecordId: altRecordId } : r,
      ),
    )
    toast({ title: 'Alternative applied', description: `“${requested}” now points to the record you picked.` })
  }

  const addPrerequisite = (recordId: string) => {
    setToc((prevToc) => {
      const exists = prevToc.some((ch) => ch.items.some((i) => i.recordId === recordId))
      if (exists) return prevToc
      /* insert at the top of the first chapter that needs it */
      const next = prevToc.map((ch) => ({ ...ch, items: [...ch.items] }))
      const target = next.find((ch) => ch.items.length > 0) ?? (next.push({ title: 'Prerequisites', items: [] }), next[next.length - 1])
      target.items.unshift({ recordId, via: 'prerequisite added from the library', confidence: 1 })
      return next
    })
  }

  /* persist the wizard draft whenever the curate state changes */
  useEffect(() => {
    if (step !== 'curate') return
    const draftData: WizardDraft = {
      method,
      title,
      description,
      toc,
      coverage,
      inputMetadata,
      savedAt: Date.now(),
    }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData))
    } catch {
      /* storage full — ignore */
    }
  }, [step, method, title, description, toc, coverage, inputMetadata])

  const save = async (status: 'draft' | 'published') => {
    if (toc.length === 0 || toc.every((c) => c.items.length === 0)) {
      toast({ title: 'Nothing to save yet', description: 'Add at least one library topic to the book first.', variant: 'destructive' })
      return
    }
    if (!user) {
      toast({
        title: 'Sign in to save your book',
        description: 'Your wizard session is kept on this device — sign in and resume right where you are.',
      })
      router.push('/signin?next=/builder')
      return
    }
    setSaving(true)
    try {
      const data = await api<{ id: string }>('/api/custom-books', {
        method: 'POST',
        ...jsonBody({
          title: title.trim() || 'My custom book',
          description: description.trim(),
          creationMethod: method,
          inputMetadata,
          status,
          toc,
          coverage,
        }),
      })
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        /* ignore */
      }
      router.push(`/my-books/${data.id}`)
    } catch (err) {
      toast({ title: 'Could not save the book', description: err instanceof Error ? err.message : undefined, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const resumeDraft = () => {
    if (!draft) return
    setMethod(draft.method)
    setTitle(draft.title)
    setDescription(draft.description)
    setToc(draft.toc)
    setCoverage(draft.coverage)
    setInputMetadata(draft.inputMetadata)
    setStep('curate')
  }

  const uploadPdf = async (file: File) => {
    setPdfBusy(true)
    setPdfMeta(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const data = await api<PdfUploadResponse>('/api/builder/upload-pdf', { method: 'POST', body: form })
      setPdfMeta(data)
      setPdfText(serializeParsed(data.parsed))
      if (data.warnings.length > 0) {
        toast({ title: 'PDF processed with notes', description: data.warnings[0] })
      }
    } catch (err) {
      toast({ title: 'PDF upload failed', description: err instanceof Error ? err.message : undefined, variant: 'destructive' })
    } finally {
      setPdfBusy(false)
    }
  }

  const usedIds = useMemo(() => new Set(toc.flatMap((c) => c.items.map((i) => i.recordId))), [toc])
  const totalTopics = toc.reduce((n, c) => n + c.items.length, 0)
  const totalWords = toc.reduce((n, c) => n + c.items.reduce((m, i) => m + (recordInfo[i.recordId]?.words ?? 0), 0), 0)

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      {/* ---------------- Landing: method selection ---------------- */}
      {step === 'method' && (
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--book-green-ink)]">
              Custom Book Builder
            </p>
            <h1 className="font-reading text-4xl font-bold tracking-tight sm:text-5xl">Build Your Own Book</h1>
            <p className="mx-auto mt-3 max-w-2xl text-balance leading-7 text-muted-foreground">
              Create a personalized textbook by curating knowledge from the LockIn Academic Library.
            </p>
          </header>

          {draft && (
            <Card className="mb-6 border-[var(--book-sage-line)] bg-[var(--book-sage)]/50">
              <CardContent className="flex flex-wrap items-center gap-3 py-4">
                <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Resume your last session</p>
                  <p className="truncate text-xs text-muted-foreground">
                    “{draft.title || 'Untitled book'}” · {draft.toc.reduce((n, c) => n + c.items.length, 0)} topics · saved{' '}
                    {new Date(draft.savedAt).toLocaleString()}
                  </p>
                </div>
                <Button onClick={resumeDraft} className="gap-1.5">
                  <ChevronRight className="h-4 w-4" aria-hidden /> Resume
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Discard the saved draft"
                  onClick={() => {
                    localStorage.removeItem(DRAFT_KEY)
                    setDraft(null)
                  }}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {METHODS.map((m, i) => (
              <Card key={m.key} className="group transition-shadow hover:shadow-md">
                <CardContent className="flex gap-4 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                    <m.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Method {i + 1}</p>
                    <h2 className="font-reading text-lg font-bold leading-snug">{m.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{m.blurb}</p>
                    <Button onClick={() => startMethod(m.key)} variant="outline" size="sm" className="mt-3 gap-1.5 group-hover:border-primary/50">
                      Start <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-muted-foreground">
            Every custom book is assembled exclusively from existing Academic Library lessons. Topics
            the library does not contain are reported honestly — never generated, never invented.
          </p>
        </div>
      )}

      {/* ---------------- Step: input ---------------- */}
      {step === 'input' && (
        <div className="mx-auto max-w-3xl">
          <button type="button" onClick={() => setStep('method')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All methods
          </button>
          <h1 className="font-reading text-3xl font-bold tracking-tight">
            {METHODS.find((m) => m.key === method)?.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {method === 'exam' && 'Type an examination — its scope is mapped onto existing library content (nothing is generated).'}
            {method === 'subject' && 'Pick entire books, chapters or individual topics from the library tree.'}
            {method === 'topics' && 'Paste topics one per line. Use “Subject:” or “Chapter N:” headers, numbered lists and indentation.'}
            {method === 'pdf' && 'Upload a syllabus PDF; its structure is extracted for your review before any search happens.'}
            {method === 'combination' && 'Combine any inputs below — duplicated content is removed automatically.'}
          </p>

          <div className="mt-6 space-y-5">
            {method === 'exam' && (
              <div className="space-y-3">
                <Label htmlFor="exam">Examination</Label>
                <Input
                  id="exam"
                  list="known-exams"
                  placeholder="e.g. GATE CSE 2027"
                  value={examText}
                  onChange={(e) => setExamText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && void analyze()}
                />
                <datalist id="known-exams">
                  {KNOWN_EXAMS.map((e) => (
                    <option key={e} value={e} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-2">
                  {KNOWN_EXAMS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setExamText(e)}
                      className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {method === 'subject' && (
              <LibraryPicker selected={selection} onChange={setSelection} />
            )}

            {method === 'topics' && (
              <div className="space-y-3">
                <Label htmlFor="topics">Your topic list</Label>
                <Textarea
                  id="topics"
                  rows={14}
                  className="font-mono text-sm"
                  placeholder={`Operating Systems:\n1. Introduction to Operating Systems\n2. Process Management\n3. Process Scheduling\n…`}
                  value={topicText}
                  onChange={(e) => setTopicText(e.target.value)}
                />
                {topicText.trim() && (
                  <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Parsed structure — {parsedPreview.nodes.length} topic(s){parsedPreview.rootName ? ` under “${parsedPreview.rootName}”` : ''}
                    </p>
                    <ul className="ml-4 list-disc space-y-0.5 leading-6">
                      {parsedPreview.nodes.slice(0, 8).map((n) => (
                        <li key={n.topic}>
                          {n.topic}
                          {n.children && n.children.length > 0 && (
                            <span className="text-muted-foreground"> ({n.children.length} subtopics)</span>
                          )}
                        </li>
                      ))}
                      {parsedPreview.nodes.length > 8 && <li className="text-muted-foreground">…</li>}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {method === 'pdf' && (
              <div className="space-y-4">
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="sr-only"
                    aria-label="Upload a syllabus PDF"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) void uploadPdf(file)
                    }}
                  />
                  <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden />
                  <p className="text-sm font-medium">Syllabus or topic-list PDF (up to 15 MB)</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Examination syllabi, university syllabi, course outlines, chapter lists.
                    {pdfBusy && ' Extracting…'}
                  </p>
                  <Button className="mt-3 gap-1.5" onClick={() => fileInputRef.current?.click()} disabled={pdfBusy}>
                    {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
                    {pdfMeta ? 'Choose another PDF' : 'Choose a PDF'}
                  </Button>
                </div>

                {pdfMeta && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {pdfMeta.pages} page(s){pdfMeta.usedOcr ? ' · OCR applied' : ' · text layer'} — review and fix the
                      extracted structure, then search the library.
                    </p>
                    {pdfMeta.warnings.map((w) => (
                      <p key={w} className="rounded-md border border-amber-500/40 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                        {w}
                      </p>
                    ))}
                    <Label htmlFor="pdf-structure">Extracted structure (editable)</Label>
                    <Textarea id="pdf-structure" rows={12} className="font-mono text-sm" value={pdfText} onChange={(e) => setPdfText(e.target.value)} />
                    <p className="text-xs text-muted-foreground">
                      Parsed: {pdfParsedPreview.nodes.length} topic(s)
                      {pdfParsedPreview.rootName ? ` under “${pdfParsedPreview.rootName}”` : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {method === 'combination' && (
              <Tabs defaultValue="subjects">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="subjects">Subjects</TabsTrigger>
                  <TabsTrigger value="topics">Topic list</TabsTrigger>
                  <TabsTrigger value="more">PDF / book</TabsTrigger>
                </TabsList>
                <TabsContent value="subjects" className="mt-4">
                  <LibraryPicker selected={selection} onChange={setSelection} />
                </TabsContent>
                <TabsContent value="topics" className="mt-4 space-y-2">
                  <Label htmlFor="combo-topics">Paste topics (optional)</Label>
                  <Textarea id="combo-topics" rows={10} className="font-mono text-sm" value={topicText} onChange={(e) => setTopicText(e.target.value)} />
                </TabsContent>
                <TabsContent value="more" className="mt-4 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="combo-pdf">Syllabus PDF (optional)</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      aria-label="Upload a syllabus PDF to combine"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) void uploadPdf(file)
                      }}
                    />
                    <Button variant="outline" className="w-full gap-1.5 border-dashed" onClick={() => fileInputRef.current?.click()} disabled={pdfBusy}>
                      {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
                      {pdfMeta ? `PDF loaded (${pdfMeta.pages} pages)` : 'Upload a PDF'}
                    </Button>
                    {pdfMeta && (
                      <Textarea rows={8} className="font-mono text-sm" value={pdfText} onChange={(e) => setPdfText(e.target.value)} aria-label="Extracted PDF structure (editable)" />
                    )}
                  </div>
                  {user && myBooks.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="base-book">Include an existing custom book (optional)</Label>
                      <select
                        id="base-book"
                        value={baseBookId}
                        onChange={(e) => setBaseBookId(e.target.value)}
                        className="h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                      >
                        <option value="">— none —</option>
                        {myBooks.map((b) => (
                          <option key={b.id} value={b.id}>{b.title}</option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">Its topics are merged in; duplicates are removed.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}

            {matchError && (
              <p role="alert" className="rounded-md border border-rose-500/40 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                {matchError}
              </p>
            )}

            <div className="flex items-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => void analyze()} disabled={matching}>
                {matching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
                {matching ? 'Searching the library…' : 'Search the Main Library'}
              </Button>
              {!user && authLoaded && (
                <p className="text-xs text-muted-foreground">
                  You can explore without an account —{' '}
                  <Link href="/signin?next=/builder" className="underline hover:text-foreground">sign in</Link> to save books.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Step: review matches ---------------- */}
      {step === 'review' && result && (
        <div className="mx-auto max-w-5xl">
          <button type="button" onClick={() => setStep('input')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to the input
          </button>
          <h1 className="font-reading text-3xl font-bold tracking-tight">Review the library matches</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {result.totalLessons} library lesson(s) · {formatWords(result.totalWords)} words would go into your book.
            Swap alternatives if the engine picked the wrong record, add prerequisites, then curate.
          </p>
          <div className="mt-6">
            <ReviewMatches
              result={result}
              onSwap={(requested, alt) => swapAlternative(requested, alt.recordId)}
              onAddPrerequisite={(recordId) => addPrerequisite(recordId)}
              addedRecordIds={usedIds}
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="gap-2" onClick={() => setStep('curate')}>
              <PencilLine className="h-4 w-4" aria-hidden /> Curate the table of contents
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setStep('input')}>Change the input</Button>
          </div>
        </div>
      )}

      {/* ---------------- Step: curate TOC ---------------- */}
      {step === 'curate' && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <button type="button" onClick={() => setStep(result ? 'review' : 'input')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden /> {result ? 'Back to the matches' : 'Back'}
            </button>
            <h1 className="font-reading text-3xl font-bold tracking-tight">Curate your book</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Reorder chapters and topics, remove what you do not need, add more from the library.
              Reordering never touches the Main Library — your book only references it.
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="book-title">Book title</Label>
                  <Input id="book-title" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 200))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="book-description">Description (optional)</Label>
                  <Input id="book-description" value={description} onChange={(e) => setDescription(e.target.value.slice(0, 2000))} placeholder="What this book is for" />
                </div>
              </div>
              <TocEditor toc={toc} onChange={setToc} recordInfo={recordInfo} />
            </div>
          </div>

          {/* summary rail */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="space-y-4 rounded-lg border p-4">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden /> Summary
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Chapters</dt>
                  <dd className="font-medium tabular-nums">{toc.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Topics</dt>
                  <dd className="font-medium tabular-nums">{totalTopics}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Words</dt>
                  <dd className="font-medium tabular-nums">{formatWords(totalWords)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Reading time</dt>
                  <dd className="font-medium tabular-nums">
                    <Clock3 className="mr-1 inline h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    {Math.max(1, Math.round(totalWords / 200))} min
                  </dd>
                </div>
              </dl>
              <Separator />
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Coverage of your request</span>
                  <span className="font-semibold tabular-nums">
                    {coverage.length === 0
                      ? '100%'
                      : `${Math.round(((coverage.filter((r) => r.matchStatus === 'exact' || r.matchStatus === 'equivalent').length + 0.5 * coverage.filter((r) => r.matchStatus === 'partial').length) / coverage.length) * 100)}%`}
                  </span>
                </div>
                {coverage.filter((r) => r.matchStatus === 'not_available').length > 0 && (
                  <p className="text-xs leading-5 text-muted-foreground">
                    {coverage.filter((r) => r.matchStatus === 'not_available').length} requested topic(s) are not
                    in the library — they stay listed in the coverage report.
                  </p>
                )}
              </div>
              <div className="space-y-2 pt-2">
                <Button className="w-full gap-2" size="lg" onClick={() => void save('published')} disabled={saving || totalTopics === 0}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <BookPlus className="h-4 w-4" aria-hidden />}
                  Publish to My Custom Books
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => void save('draft')} disabled={saving || totalTopics === 0}>
                  <Save className="h-4 w-4" aria-hidden /> Save as draft
                </Button>
                {!user && authLoaded && (
                  <p className="text-center text-xs text-muted-foreground">
                    <Link href="/signin?next=/builder" className="underline hover:text-foreground">Sign in</Link> to save — your session is kept on this device.
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 px-1 text-[11px] leading-5 text-muted-foreground">
              <Badge variant="outline" className="mr-1 border-[var(--book-sage-line)] bg-[var(--book-sage)]/60 text-[10px] font-normal text-[var(--book-green-ink)]">
                live references
              </Badge>
              Your book references canonical library lessons. When a library lesson improves, your
              book shows an update notice.
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
