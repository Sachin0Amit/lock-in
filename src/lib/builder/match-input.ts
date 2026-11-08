/**
 * Custom Book Builder — unified match-input planner.
 *
 * The builder desk exposes ALL creation channels on one screen:
 * examination · library browsing · pasted topic list · syllabus PDF ·
 * an existing custom book to merge. Any subset may be filled; this
 * module normalizes any such request into one discovery plan.
 *
 * Legacy single-method requests (method: 'exam' | 'subject' | 'topics'
 * | 'pdf') keep their original validation semantics — the plan is the
 * same, only the strictness differs.
 *
 * Pure and isomorphic: no DB, no catalog — trivially unit-testable.
 */
import { EXAM_TEMPLATES, matchExamTemplate, type ExamTemplate } from './exam-templates'
import { parseTopicList } from './topic-parser'
import type { LibrarySelection, ParsedInput, TopicNode } from './types'

export type CreationMethod = 'exam' | 'subject' | 'topics' | 'pdf' | 'combination'

/** Anything the unified desk can send. All channels optional. */
export interface UnifiedMatchInput {
  /** legacy hint — when set, that channel is REQUIRED (backward compat) */
  method?: CreationMethod
  exam?: string
  topicText?: string
  /** edited PDF extraction (or any client-side parsed structure); nodes are coerced */
  parsed?: { rootName?: string; nodes?: unknown }
  selection?: LibrarySelection
  /** merge the structure of an existing custom book (resolved by the route) */
  baseBookId?: string
}

export interface MatchSources {
  exam: boolean
  topics: boolean
  pdf: boolean
  selection: boolean
  baseBook: boolean
}

export interface MatchPlan {
  /** validation error (client-friendly message) — plan unusable when set */
  error: string | null
  /** legacy unknown-exam-only response is needed (route returns scope map) */
  examOnly: boolean
  examTemplate: ExamTemplate | null
  /** non-fatal: the exam name was not recognized, other channels proceed */
  examWarning: string | null
  examSuggestions: string[]
  /** parsed topic structures from exam scope map + topic text + PDF */
  inputs: ParsedInput[]
  /** library selections (base-book lesson ids merged in by the route) */
  selection: LibrarySelection
  baseBookId: string | null
  /** single channel → that method; several channels → 'combination' */
  derivedMethod: CreationMethod
  sources: MatchSources
  warnings: string[]
}

function selectionCount(sel: LibrarySelection | undefined): number {
  if (!sel) return 0
  return (sel.bookIds?.length ?? 0) + (sel.chapterIds?.length ?? 0) + (sel.lessonIds?.length ?? 0)
}

function coerceParsedNodes(nodes: unknown): TopicNode[] {
  if (!Array.isArray(nodes)) return []
  const out: TopicNode[] = []
  for (const raw of nodes) {
    if (!raw || typeof raw !== 'object') continue
    const topic = (raw as { topic?: unknown }).topic
    if (typeof topic !== 'string' || topic.trim().length === 0) continue
    out.push({ topic: topic.slice(0, 300), children: coerceParsedNodes((raw as { children?: unknown }).children) })
  }
  return out
}

export function buildMatchPlan(input: UnifiedMatchInput): MatchPlan {
  const warnings: string[] = []

  const examName = (input.exam ?? '').trim().slice(0, 200)
  const topicText = (input.topicText ?? '').trim()
  const parsedNodes = coerceParsedNodes(input.parsed?.nodes)
  const parsedInput: { rootName: string; nodes: TopicNode[] } | null =
    input.parsed && parsedNodes.length > 0
      ? { rootName: (input.parsed.rootName ?? '').slice(0, 300), nodes: parsedNodes }
      : null
  const selection: LibrarySelection = {
    bookIds: (input.selection?.bookIds ?? []).slice(0, 50),
    chapterIds: (input.selection?.chapterIds ?? []).slice(0, 500),
    lessonIds: (input.selection?.lessonIds ?? []).slice(0, 2000),
  }
  const baseBookId = (input.baseBookId ?? '').trim().slice(0, 100) || null

  const sources: MatchSources = {
    exam: examName.length > 0,
    topics: topicText.length > 0,
    pdf: (parsedInput?.nodes.length ?? 0) > 0,
    selection: selectionCount(selection) > 0,
    baseBook: baseBookId !== null,
  }
  const channelCount =
    Number(sources.exam) + Number(sources.topics) + Number(sources.pdf) + Number(sources.selection) + Number(sources.baseBook)

  const plan: MatchPlan = {
    error: null,
    examOnly: false,
    examTemplate: null,
    examWarning: null,
    examSuggestions: [],
    inputs: [],
    selection,
    baseBookId,
    derivedMethod: 'combination',
    sources,
    warnings,
  }

  /* ---- legacy per-method strictness (unchanged semantics) -------------- */
  if (input.method === 'exam' && !sources.exam) {
    plan.error = 'Please provide an examination name.'
    return plan
  }
  if (input.method === 'topics' && !sources.topics) {
    plan.error = 'Please paste a topic list first.'
    return plan
  }
  if (input.method === 'subject' && !sources.selection) {
    plan.error = 'Please select at least one book, chapter or topic.'
    return plan
  }
  if (input.method === 'pdf' && !sources.pdf) {
    plan.error = 'Please upload and review a PDF structure first.'
    return plan
  }
  if (channelCount === 0) {
    plan.error =
      'Add at least one source — an examination, library picks, a pasted topic list, a syllabus PDF or a custom book to merge.'
    return plan
  }

  /* ---- derived method ---------------------------------------------------- */
  if (channelCount === 1) {
    plan.derivedMethod = sources.exam
      ? 'exam'
      : sources.topics
        ? 'topics'
        : sources.pdf
          ? 'pdf'
          : sources.selection
            ? 'subject'
            : 'combination'
  }

  /* ---- examination channel ------------------------------------------------ */
  let examParsed: ParsedInput | null = null
  if (sources.exam) {
    const template = matchExamTemplate(examName)
    if (template) {
      plan.examTemplate = template
      examParsed = { rootName: template.label, nodes: template.nodes }
    } else {
      plan.examWarning = `“${examName}” is not in the built-in examination scope maps yet — the other sources below are still searched, and you can also paste its topic list or upload its syllabus PDF.`
      plan.examSuggestions = EXAM_TEMPLATES.map((t) => t.label)
      warnings.push(plan.examWarning)
      if (channelCount === 1) {
        /* only an unknown exam name and nothing else → the honest scope-map answer */
        plan.examOnly = true
        return plan
      }
    }
  }

  /* ---- topic-text channel -------------------------------------------------- */
  const topicsParsed = sources.topics ? parseTopicList(topicText.slice(0, 200_000)) : null

  /* ---- merge parsed structures (exam scope first, then text, then PDF) ----- */
  const parts: ParsedInput[] = []
  if (examParsed) parts.push(examParsed)
  if (topicsParsed && topicsParsed.nodes.length > 0) parts.push(topicsParsed)
  if (parsedInput) parts.push(parsedInput)
  plan.inputs = parts

  if (sources.topics && topicsParsed && topicsParsed.nodes.length === 0) {
    warnings.push('The pasted topic list could not be parsed into any topics — check its formatting.')
  }

  return plan
}
