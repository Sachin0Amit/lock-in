'use client'

/**
 * Custom Book Builder — the unified creation desk.
 *
 * ONE screen, every method at once. Instead of picking a creation method
 * first, the user composes a request from any combination of sources —
 * all live on the same desk, each collapsible, each optional:
 *
 *   🎓 Quick start   — an examination scope map (GATE, JEE, UPSC, CUET, NEET, CAT)
 *   📚 Browse        — pick books / chapters / topics from the library tree
 *   📝 Paste         — a topic list or syllabus text
 *   📄 Upload        — a syllabus PDF (extracted structure, editable)
 *   📖 Merge         — the structure of an existing custom book
 *
 * One click searches the Main Academic Library for ALL of it; duplicates
 * are removed, prerequisites are surfaced, then: review matches → curate
 * the TOC → publish. The discovery engine only ever selects existing
 * library records — missing topics are reported honestly, never invented.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpenCheck,
  BookPlus,
  BookUp,
  Check,
  ChevronDown,
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
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { api, formatWords, jsonBody, type MatchResponse, type PdfUploadResponse } from '@/lib/builder/client-api'
import { EXAM_TEMPLATES, matchExamTemplate } from '@/lib/builder/exam-templates'
import { parseTopicList } from '@/lib/builder/topic-parser'
import type { ParsedInput, TocChapterDraft } from '@/lib/builder/types'
import { emptySelection, LibraryPicker, type SelectionState } from './library-picker'
import { matchesToCoverage, ReviewMatches } from './review-matches'
import { TocEditor } from './toc-editor'
import { useRecordInfo } from './record-info'

type Step = 'compose' | 'review' | 'curate'
type Channel = 'exam' | 'library' | 'topics' | 'pdf' | 'base'

const DRAFT_KEY = 'lockin-builder-draft'

interface WizardDraft {
  title: string
  description: string
  toc: TocChapterDraft[]
  coverage: ReturnType<typeof matchesToCoverage>
  inputMetadata: Record<string, unknown>
  savedAt: number
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'compose', label: 'Compose' },
  { key: 'review', label: 'Review matches' },
  { key: 'curate', label: 'Curate & publish' },
]

/** short chip names for the built-in examinations (aliases all match) */
const EXAM_CHIPS = EXAM_TEMPLATES.map((t) => ({ key: t.key, short: t.label.split(' (')[0] }))

function templateStats(nodes: { children?: { topic: string }[] }[]): { areas: number; topics: number } {
  const areas = nodes.length
  const topics = nodes.reduce((n, node) => n + 1 + (node.children?.length ?? 0), 0)
  return { areas, topics }
}

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

function selectionCount(sel: SelectionState): number {
  return sel.bookIds.length + sel.chapterIds.length + sel.lessonIds.length
}

export function BuilderApp() {
  const router = useRouter()
  const { toast } = useToast()
  const { info: recordInfo } = useRecordInfo()

  const [step, setStep] = useState<Step>('compose')

  /* ---- the five source channels, all live at once ---------------------- */
  const [examText, setExamText] = useState('')
  const [selection, setSelection] = useState<SelectionState>(emptySelection())
  const [topicText, setTopicText] = useState('')
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfMeta, setPdfMeta] = useState<PdfUploadResponse | null>(null)
  const [pdfFilename, setPdfFilename] = useState('')
  const [pdfText, setPdfText] = useState('')
  const [baseBookId, setBaseBookId] = useState('')
  const [myBooks, setMyBooks] = useState<{ id: string; title: string }[]>([])

  /* which panels are expanded (exam + paste open by default) */
  const [openPanels, setOpenPanels] = useState<Record<Channel, boolean>>({
    exam: true,
    library: false,
    topics: true,
    pdf: false,
    base: false,
  })
  const togglePanel = (c: Channel) => setOpenPanels((p) => ({ ...p, [c]: !p[c] }))
  const openPanel = (c: Channel) => setOpenPanels((p) => ({ ...p, [c]: true }))

  /* ---- matching ---------------------------------------------------------- */
  const [matching, setMatching] = useState(false)
  const [matchError, setMatchError] = useState<string | null>(null)
  const [examSuggestions, setExamSuggestions] = useState<string[] | null>(null)
  const [result, setResult] = useState<MatchResponse | null>(null)

  /* ---- curate ------------------------------------------------------------- */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [toc, setToc] = useState<TocChapterDraft[]>([])
  const [coverage, setCoverage] = useState<ReturnType<typeof matchesToCoverage>>([])
  const [inputMetadata, setInputMetadata] = useState<Record<string, unknown>>({})
  const [creationMethod, setCreationMethod] = useState<string>('combination')
  const [saving, setSaving] = useState(false)

  const [draft, setDraft] = useState<WizardDraft | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* ---- live previews ------------------------------------------------------ */
  const examTemplate = useMemo(() => {
    const t = examText.trim()
    return t.length > 0 ? matchExamTemplate(t) : null
  }, [examText])
  const parsedPreview = useMemo(() => parseTopicList(topicText), [topicText])
  const pdfParsedPreview = useMemo(() => parseTopicList(pdfText), [pdfText])

  /* ---- load saved wizard draft once --------------------------------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) setDraft(JSON.parse(raw) as WizardDraft)
    } catch {
      /* ignore corrupt drafts */
    }
  }, [])

  /* ---- deep links: /builder?exam=…&topics=…&book=…&base=… ------------------ */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const q = new URLSearchParams(window.location.search)
    const exam = q.get('exam')
    const topics = q.get('topics') ?? q.get('paste')
    const book = q.get('book')
    const base = q.get('base')
    if (exam) {
      setExamText(exam.slice(0, 200))
      openPanel('exam')
    }
    if (topics) {
      setTopicText(topics.slice(0, 200_000))
      openPanel('topics')
    }
    if (book) {
      setSelection({ bookIds: [book.slice(0, 200)], chapterIds: [], lessonIds: [] })
      openPanel('library')
    }
    if (base) {
      setBaseBookId(base.slice(0, 100))
      openPanel('base')
    }
  }, [])

  /* ---- my books (merge channel + title fallback) --------------------------- */
  useEffect(() => {
    if (step === 'compose' && myBooks.length === 0) {
      void api<{ books: { id: string; title: string; status: string }[] }>('/api/custom-books')
        .then((data) => setMyBooks(data.books.filter((b) => b.status !== 'archived').map((b) => ({ id: b.id, title: b.title }))))
        .catch(() => undefined)
    }
  }, [step, myBooks.length])

  /* ---- active-source bookkeeping -------------------------------------------- */
  const activeExam = examText.trim().length > 0
  const activeTopics = topicText.trim().length > 0
  const activePdf = pdfText.trim().length > 0 && pdfMeta !== null
  const activeSelection = selectionCount(selection) > 0
  const activeBase = baseBookId !== ''
  const activeChannels: Channel[] = [
    ...(activeExam ? (['exam'] as Channel[]) : []),
    ...(activeSelection ? (['library'] as Channel[]) : []),
    ...(activeTopics ? (['topics'] as Channel[]) : []),
    ...(activePdf ? (['pdf'] as Channel[]) : []),
    ...(activeBase ? (['base'] as Channel[]) : []),
  ]
  const anySource = activeChannels.length > 0

  const examStats = examTemplate ? templateStats(examTemplate.nodes) : null
  const requestedEstimate =
    (examStats?.topics ?? 0) +
    parsedPreview.nodes.reduce((n, node) => n + 1 + (node.children?.length ?? 0), 0) +
    (activePdf ? pdfParsedPreview.nodes.reduce((n, node) => n + 1 + (node.children?.length ?? 0), 0) : 0) +
    selectionCount(selection)

  const clearChannel = (c: Channel) => {
    if (c === 'exam') setExamText('')
    if (c === 'library') setSelection(emptySelection())
    if (c === 'topics') setTopicText('')
    if (c === 'pdf') {
      setPdfMeta(null)
      setPdfText('')
      setPdfFilename('')
    }
    if (c === 'base') setBaseBookId('')
  }

  /* ---- the single search action ---------------------------------------------- */
  const analyze = useCallback(async () => {
    if (!anySource) {
      setMatchError('Add at least one source first — an examination, library picks, a pasted topic list, a syllabus PDF or a custom book to merge.')
      return
    }
    setMatching(true)
    setMatchError(null)
    setExamSuggestions(null)
    try {
      const body: Record<string, unknown> = {
        exam: activeExam ? examText.trim() : undefined,
        topicText: activeTopics ? topicText : undefined,
        parsed: activePdf && pdfText.trim() ? parseTopicList(pdfText) : undefined,
        selection: activeSelection ? selection : undefined,
        baseBookId: activeBase ? baseBookId : undefined,
      }
      const data = await api<MatchResponse>('/api/builder/match', { method: 'POST', ...jsonBody(body) })
      if (data.unknownExam) {
        setMatchError(
          data.note ??
            'This examination is not in the built-in scope maps yet — paste its topic list or upload its syllabus PDF instead.',
        )
        setExamSuggestions(data.examSuggestions ?? null)
        return
      }
      if (data.totalLessons === 0) {
        setMatchError(
          'No matching content was found in the Main Academic Library for this input. The library is still growing — browse it directly and pick what exists today.',
        )
        return
      }
      setResult(data)
      setCreationMethod(data.derivedMethod ?? 'combination')
      /* default title from the strongest source */
      const fallbackTitle =
        (activeExam ? examText.trim() : '') || data.rootName || (activePdf ? pdfMeta?.parsed.rootName || '' : '') || 'My custom book'
      setTitle((prev) => prev || fallbackTitle.slice(0, 200) || 'My custom book')
      setToc(data.toc)
      setCoverage(matchesToCoverage(data))
      setInputMetadata({
        sources: data.sources,
        exam: activeExam ? examText.trim() : undefined,
        topicCount: parsedPreview.nodes.length,
        selection: activeSelection
          ? {
              books: selection.bookIds.length,
              chapters: selection.chapterIds.length,
              lessons: selection.lessonIds.length,
            }
          : undefined,
        pdf: pdfMeta ? { filename: pdfFilename || 'syllabus.pdf', pages: pdfMeta.pages, usedOcr: pdfMeta.usedOcr } : undefined,
        baseBookId: activeBase ? baseBookId : undefined,
      })
      setStep('review')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setMatchError(err instanceof Error ? err.message : 'Matching failed.')
    } finally {
      setMatching(false)
    }
  }, [
    anySource,
    activeExam,
    examText,
    activeTopics,
    topicText,
    activePdf,
    pdfText,
    pdfMeta,
    activeSelection,
    selection,
    activeBase,
    baseBookId,
    parsedPreview.nodes,
    pdfFilename,
  ])

  /* ---- review-step actions ---------------------------------------------------- */
  const swapAlternative = (requested: string, altRecordId: string) => {
    if (!result) return
    setToc((prevToc) =>
      prevToc.map((ch) => ({
        ...ch,
        items: ch.items.map((item) =>
          item.requestedTopic === requested ? { ...item, recordId: altRecordId, via: 'user-selected alternative', confidence: 0.9 } : item,
        ),
      })),
    )
    setCoverage((rows) => rows.map((r) => (r.requestedTopic === requested ? { ...r, matchedLibraryRecordId: altRecordId } : r)))
    toast({ title: 'Alternative applied', description: `“${requested}” now points to the record you picked.` })
  }

  const addPrerequisite = (recordId: string) => {
    setToc((prevToc) => {
      const exists = prevToc.some((ch) => ch.items.some((i) => i.recordId === recordId))
      if (exists) return prevToc
      const next = prevToc.map((ch) => ({ ...ch, items: [...ch.items] }))
      const target = next.find((ch) => ch.items.length > 0) ?? (next.push({ title: 'Prerequisites', items: [] }), next[next.length - 1])
      target.items.unshift({ recordId, via: 'prerequisite added from the library', confidence: 1 })
      return next
    })
  }

  /* ---- draft persistence -------------------------------------------------------- */
  useEffect(() => {
    if (step !== 'curate') return
    const draftData: WizardDraft = {
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
  }, [step, title, description, toc, coverage, inputMetadata])

  const save = async (status: 'draft' | 'published') => {
    if (toc.length === 0 || toc.every((c) => c.items.length === 0)) {
      toast({ title: 'Nothing to save yet', description: 'Add at least one library topic to the book first.', variant: 'destructive' })
      return
    }
    setSaving(true)
    try {
      const data = await api<{ id: string }>('/api/custom-books', {
        method: 'POST',
        ...jsonBody({
          title: title.trim() || 'My custom book',
          description: description.trim(),
          creationMethod,
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
    setTitle(draft.title)
    setDescription(draft.description)
    setToc(draft.toc)
    setCoverage(draft.coverage)
    setInputMetadata(draft.inputMetadata)
    setCreationMethod(typeof draft.inputMetadata?.derivedMethod === 'string' ? (draft.inputMetadata.derivedMethod as string) : 'combination')
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
      setPdfFilename(file.name)
      setPdfText(serializeParsed(data.parsed))
      openPanel('pdf')
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

  const stepIndex = STEPS.findIndex((s) => s.key === step)

  /* ------------------------------------------------------------------ */
  /* render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6"
      onKeyDown={(e) => {
        if (step === 'compose' && (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault()
          void analyze()
        }
      }}
    >
      {/* ---------------- stepper ---------------- */}
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm" aria-label="Builder progress">
        {STEPS.map((s, i) => {
          const state = i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'todo'
          return (
            <li key={s.key} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${
                  state === 'current'
                    ? 'border-primary/60 bg-primary/10 font-semibold text-foreground'
                    : state === 'done'
                      ? 'border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-border text-muted-foreground'
                }`}
              >
                {state === 'done' ? <Check className="h-3.5 w-3.5" aria-hidden /> : <span className="tabular-nums">{i + 1}</span>}
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* ================= STEP 1 · COMPOSE ================= */}
      {step === 'compose' && (
        <div className="space-y-6">
          <header className="text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--book-green-ink)]">Custom Book Builder</p>
            <h1 className="font-reading text-4xl font-bold tracking-tight sm:text-5xl">Build Your Own Book</h1>
            <p className="mx-auto mt-3 max-w-2xl text-balance leading-7 text-muted-foreground">
              Create a personalized textbook by curating knowledge from the LockIn Academic Library. Use any mix of the
              sources below — an examination, the library itself, your own topic list, a syllabus PDF, or one of your
              custom books.
            </p>
          </header>

          {draft && (
            <Card className="mx-auto max-w-4xl border-[var(--book-sage-line)] bg-[var(--book-sage)]/50">
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

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* ---------------- left: the source desk ---------------- */}
            <div className="min-w-0 space-y-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Layers className="h-4 w-4" aria-hidden /> Add sources — use one or combine them all
              </h2>

              {/* ---- 1 · examination ---- */}
              <section className="rounded-lg border" aria-label="Source: examination">
                <Collapsible open={openPanels.exam} onOpenChange={() => togglePanel('exam')}>
                  <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/40">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                      <GraduationCap className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">Quick start · from an examination</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        GATE, JEE, UPSC, CUET, NEET, CAT — the paper&apos;s scope decides which library content is searched.
                      </span>
                    </span>
                    {activeExam ? (
                      <Badge
                        variant="outline"
                        className={`shrink-0 font-normal ${
                          examTemplate
                            ? 'border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'border-amber-500/40 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                        }`}
                      >
                        {examTemplate ? `✓ ${examStats?.topics} topics` : 'not recognized'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 font-normal text-muted-foreground">optional</Badge>
                    )}
                    {openPanels.exam ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-3 border-t px-4 py-4">
                      <Label htmlFor="exam">Examination</Label>
                      <Input
                        id="exam"
                        list="known-exams"
                        placeholder="e.g. GATE CSE 2027"
                        value={examText}
                        onChange={(e) => setExamText(e.target.value)}
                      />
                      <datalist id="known-exams">
                        {EXAM_CHIPS.map((e) => (
                          <option key={e.key} value={e.short} />
                        ))}
                      </datalist>
                      <div className="flex flex-wrap gap-2">
                        {EXAM_CHIPS.map((e) => (
                          <button
                            key={e.key}
                            type="button"
                            onClick={() => setExamText(e.short)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors hover:border-primary/50 hover:text-foreground ${
                              examText.trim() === e.short ? 'border-primary/60 bg-primary/10 text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {e.short}
                          </button>
                        ))}
                      </div>
                      {activeExam && examTemplate && examStats && (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-50/60 px-3.5 py-3 text-sm dark:bg-emerald-950/30">
                          <p className="font-medium">
                            <Check className="mr-1 inline h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                            Recognized: {examTemplate.label}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {examStats.areas} subject areas · {examStats.topics} topics in this scope — only what the library
                            actually contains will be matched.
                          </p>
                          <details className="mt-1.5">
                            <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
                              See the scope areas
                            </summary>
                            <ul className="mt-1 ml-4 list-disc space-y-0.5 text-xs leading-5">
                              {examTemplate.nodes.map((n) => (
                                <li key={n.topic}>
                                  {n.topic}
                                  {n.children && n.children.length > 0 && (
                                    <span className="text-muted-foreground"> ({n.children.length} subtopics)</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                      {activeExam && !examTemplate && (
                        <p className="rounded-md border border-amber-500/40 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                          Not in the built-in scope maps. Keep it — the other sources below still get searched — or pick a
                          known examination, paste its topic list, or upload its syllabus PDF.
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </section>

              {/* ---- 2 · browse the library ---- */}
              <section className="rounded-lg border" aria-label="Source: browse the Main Library">
                <Collapsible open={openPanels.library} onOpenChange={() => togglePanel('library')}>
                  <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/40">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                      <Library className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">Browse the Main Library</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Pick whole books, chapters or individual topics straight from the tree.
                      </span>
                    </span>
                    {activeSelection ? (
                      <Badge variant="outline" className="shrink-0 border-emerald-500/40 bg-emerald-50 font-normal text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        ✓ {selectionCount(selection)} picked
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 font-normal text-muted-foreground">optional</Badge>
                    )}
                    {openPanels.library ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t px-4 py-4">
                      <LibraryPicker selected={selection} onChange={setSelection} heightClass="h-[360px]" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </section>

              {/* ---- 3 · paste a topic list ---- */}
              <section className="rounded-lg border" aria-label="Source: pasted topic list">
                <Collapsible open={openPanels.topics} onOpenChange={() => togglePanel('topics')}>
                  <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/40">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                      <ListTree className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">Paste a topic list</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Your own syllabus or revision list — the engine finds each topic in the library.
                      </span>
                    </span>
                    {activeTopics ? (
                      <Badge variant="outline" className="shrink-0 border-emerald-500/40 bg-emerald-50 font-normal text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        ✓ {parsedPreview.nodes.length} topic{parsedPreview.nodes.length === 1 ? '' : 's'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 font-normal text-muted-foreground">optional</Badge>
                    )}
                    {openPanels.topics ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-3 border-t px-4 py-4">
                      <Label htmlFor="topics">Your topic list</Label>
                      <Textarea
                        id="topics"
                        rows={10}
                        className="font-mono text-sm"
                        placeholder={`Operating Systems:\n1. Introduction to Operating Systems\n2. Process Management\n3. Process Scheduling\n…`}
                        value={topicText}
                        onChange={(e) => setTopicText(e.target.value)}
                      />
                      {topicText.trim() && (
                        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Parsed structure — {parsedPreview.nodes.length} topic(s)
                            {parsedPreview.rootName ? ` under “${parsedPreview.rootName}”` : ''}
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
                  </CollapsibleContent>
                </Collapsible>
              </section>

              {/* ---- 4 · upload a syllabus PDF ---- */}
              <section className="rounded-lg border" aria-label="Source: uploaded syllabus PDF">
                <Collapsible open={openPanels.pdf} onOpenChange={() => togglePanel('pdf')}>
                  <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/40">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                      <FileText className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">Upload a syllabus PDF</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Examination or university syllabi, course outlines — the structure is extracted for your review.
                      </span>
                    </span>
                    {activePdf ? (
                      <Badge variant="outline" className="shrink-0 border-emerald-500/40 bg-emerald-50 font-normal text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        ✓ {pdfFilename || 'syllabus.pdf'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 font-normal text-muted-foreground">optional</Badge>
                    )}
                    {openPanels.pdf ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 border-t px-4 py-4">
                      <div className="rounded-lg border border-dashed p-5 text-center">
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
                        <Upload className="mx-auto mb-2 h-7 w-7 text-muted-foreground" aria-hidden />
                        <p className="text-sm font-medium">Syllabus or topic-list PDF (up to 15 MB)</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Text layer first, OCR fallback when needed.{pdfBusy && ' Extracting…'}
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
                          <Textarea id="pdf-structure" rows={10} className="font-mono text-sm" value={pdfText} onChange={(e) => setPdfText(e.target.value)} />
                          <p className="text-xs text-muted-foreground">
                            Parsed: {pdfParsedPreview.nodes.length} topic(s)
                            {pdfParsedPreview.rootName ? ` under “${pdfParsedPreview.rootName}”` : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </section>

              {/* ---- 5 · merge an existing custom book ---- */}
              <section className="rounded-lg border" aria-label="Source: merge an existing custom book">
                <Collapsible open={openPanels.base} onOpenChange={() => togglePanel('base')}>
                  <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/40">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--book-sage)] text-[var(--book-green-ink)]">
                      <BookUp className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">Merge an existing custom book</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Start from the structure of one of your books — duplicates are removed automatically.
                      </span>
                    </span>
                    {activeBase ? (
                      <Badge variant="outline" className="shrink-0 border-emerald-500/40 bg-emerald-50 font-normal text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        ✓ {myBooks.find((b) => b.id === baseBookId)?.title ?? 'book'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 font-normal text-muted-foreground">optional</Badge>
                    )}
                    {openPanels.base ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t px-4 py-4">
                      {myBooks.length > 0 ? (
                        <div className="space-y-2">
                          <Label htmlFor="base-book">Your custom book</Label>
                          <select
                            id="base-book"
                            value={baseBookId}
                            onChange={(e) => setBaseBookId(e.target.value)}
                            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1"
                          >
                            <option value="">— none —</option>
                            {myBooks.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.title}
                              </option>
                            ))}
                          </select>
                          <p className="text-xs text-muted-foreground">Its topics are merged in; duplicates are removed.</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          You have no custom books yet — publish one first, then merge it here.
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </section>

              <p className="px-1 text-xs leading-6 text-muted-foreground">
                Every custom book is assembled exclusively from existing Academic Library lessons. Topics the library
                does not contain are reported honestly — never generated, never invented.
              </p>
            </div>

            {/* ---------------- right: the request rail ---------------- */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="space-y-4 rounded-lg border p-4">
                <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                  <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden /> Your request
                </h2>

                {anySource ? (
                  <ul className="space-y-1.5" aria-label="Active sources">
                    {activeChannels.map((c) => {
                      const meta: Record<Channel, { icon: typeof GraduationCap; label: string }> = {
                        exam: { icon: GraduationCap, label: examTemplate ? examTemplate.label.split(' (')[0] : examText.trim() },
                        library: {
                          icon: Library,
                          label: `${selection.bookIds.length} book${selection.bookIds.length === 1 ? '' : 's'} · ${selection.chapterIds.length} chapter${selection.chapterIds.length === 1 ? '' : 's'} · ${selection.lessonIds.length} topic${selection.lessonIds.length === 1 ? '' : 's'}`,
                        },
                        topics: { icon: ListTree, label: `${parsedPreview.nodes.length} pasted topic${parsedPreview.nodes.length === 1 ? '' : 's'}` },
                        pdf: { icon: FileText, label: pdfFilename || 'syllabus.pdf' },
                        base: { icon: BookUp, label: myBooks.find((b) => b.id === baseBookId)?.title ?? 'custom book' },
                      }
                      const Icon = meta[c].icon
                      return (
                        <li key={c} className="flex items-center gap-2 rounded-md border bg-muted/30 py-1.5 pl-2.5 pr-1.5 text-xs">
                          <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--book-green-ink)]" aria-hidden />
                          <span className="min-w-0 flex-1 truncate font-medium">{meta[c].label}</span>
                          <button
                            type="button"
                            aria-label={`Remove this source`}
                            onClick={() => clearChannel(c)}
                            className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-xs leading-5 text-muted-foreground">
                    Nothing collected yet. Open any panel on the left — an examination, library picks, a topic list, a PDF
                    or a custom book — everything combines into one request.
                  </p>
                )}

                <Separator />

                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">Topics requested</span>
                  <span className="font-semibold tabular-nums">≈ {requestedEstimate}</span>
                </div>
                {activeBase && (
                  <p className="text-[11px] leading-4 text-muted-foreground">
                    plus every topic inside the merged custom book
                  </p>
                )}

                {matchError && (
                  <div className="space-y-2">
                    <p role="alert" className="rounded-md border border-rose-500/40 bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                      {matchError}
                    </p>
                    {examSuggestions && (
                      <div className="flex flex-wrap gap-1.5">
                        {examSuggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setExamText(s.split(' (')[0])
                              setMatchError(null)
                              setExamSuggestions(null)
                              openPanel('exam')
                            }}
                            className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                          >
                            {s.split(' (')[0]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <Button size="lg" className="w-full gap-2" onClick={() => void analyze()} disabled={matching || !anySource}>
                    {matching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
                    {matching ? 'Searching the library…' : 'Find matching library lessons'}
                  </Button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Duplicates across sources are removed automatically · <kbd className="rounded border px-1">Ctrl</kbd>+
                    <kbd className="rounded border px-1">Enter</kbd>
                  </p>
                </div>
              </div>
              <p className="mt-3 px-1 text-[11px] leading-5 text-muted-foreground">
                <Badge variant="outline" className="mr-1 border-[var(--book-sage-line)] bg-[var(--book-sage)]/60 text-[10px] font-normal text-[var(--book-green-ink)]">
                  live references
                </Badge>
                Books reference canonical library lessons — when the library improves, your book shows an update notice.
              </p>
            </aside>
          </div>
        </div>
      )}

      {/* ================= STEP 2 · REVIEW ================= */}
      {step === 'review' && result && (
        <div className="mx-auto max-w-5xl">
          <button type="button" onClick={() => setStep('compose')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to your sources
          </button>
          <h1 className="font-reading text-3xl font-bold tracking-tight">Review the library matches</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {result.totalLessons} library lesson(s) · {formatWords(result.totalWords)} words would go into your book.
            Swap alternatives if the engine picked the wrong record, add prerequisites, then curate.
          </p>
          {result.sources && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium">Sources searched:</span>
              {result.sources.exam && <Badge variant="secondary" className="font-normal">examination</Badge>}
              {result.sources.selection && <Badge variant="secondary" className="font-normal">library picks</Badge>}
              {result.sources.topics && <Badge variant="secondary" className="font-normal">pasted topics</Badge>}
              {result.sources.pdf && <Badge variant="secondary" className="font-normal">syllabus PDF</Badge>}
              {result.sources.baseBook && <Badge variant="secondary" className="font-normal">merged custom book</Badge>}
            </div>
          )}
          {(result.warnings ?? []).map((w) => (
            <p key={w} className="mt-3 rounded-md border border-amber-500/40 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              {w}
            </p>
          ))}
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
            <Button size="lg" variant="ghost" onClick={() => setStep('compose')}>
              Change the sources
            </Button>
          </div>
        </div>
      )}

      {/* ================= STEP 3 · CURATE ================= */}
      {step === 'curate' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <button type="button" onClick={() => setStep(result ? 'review' : 'compose')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
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
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
