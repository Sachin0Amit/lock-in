import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSessionUser, badRequest, serverError, unauthorized } from '@/lib/auth'
import { EXAM_TEMPLATES, matchExamTemplate } from '@/lib/builder/exam-templates'
import { assemble } from '@/lib/builder/toc'
import { matchParsed, selectionToMatches } from '@/lib/builder/matcher'
import { parseTopicList } from '@/lib/builder/topic-parser'
import type { ParsedInput, TopicNode } from '@/lib/builder/types'

export const runtime = 'nodejs'

const schema = z.object({
  method: z.enum(['exam', 'subject', 'topics', 'pdf', 'combination']),
  exam: z.string().max(200).optional(),
  topicText: z.string().max(200_000).optional(),
  parsed: z
    .object({
      rootName: z.string().max(300).default(''),
      nodes: z.array(z.object({ topic: z.string().min(1).max(300), children: z.array(z.any()).optional() })),
    })
    .optional(),
  selection: z
    .object({
      bookIds: z.array(z.string().max(200)).max(50).optional(),
      chapterIds: z.array(z.string().max(200)).max(500).optional(),
      lessonIds: z.array(z.string().max(200)).max(2000).optional(),
    })
    .optional(),
  baseBookId: z.string().max(100).optional(),
})

function coerceParsed(p: z.infer<typeof schema>['parsed']): ParsedInput | null {
  if (!p) return null
  return { rootName: p.rootName ?? '', nodes: p.nodes as TopicNode[] }
}

/**
 * The content-discovery entry point: turn any creation input into
 * matches against the Main Academic Library, a proposed TOC and an
 * honest coverage report. Stateless — usable without signing in,
 * but combining an existing custom book requires ownership.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return badRequest('Invalid matching request.', { details: parsed.error.issues.map((i) => i.message) })
    }
    const input = parsed.data

    const inputs: ParsedInput[] = []
    let selection = { ...(input.selection ?? {}) }

    if (input.method === 'exam') {
      const examName = (input.exam ?? '').trim()
      if (!examName) return badRequest('Please provide an examination name.')
      const template = matchExamTemplate(examName)
      if (!template) {
        return NextResponse.json({
          unknownExam: true,
          examName,
          examSuggestions: EXAM_TEMPLATES.map((t) => t.label),
          matches: [],
          toc: [],
          coverage: { requested: 0, exact: 0, equivalent: 0, partial: 0, notAvailable: 0, percent: 0 },
          totalLessons: 0,
          totalWords: 0,
          prerequisites: [],
          note:
            'This examination is not in the built-in scope maps yet. Try one of the known examinations, or build the same book from a topic list (Method 3) or an uploaded syllabus (Method 4).',
        })
      }
      inputs.push({ rootName: template.label, nodes: template.nodes })
    }

    if (input.method === 'topics' || input.method === 'combination') {
      const text = (input.topicText ?? '').trim()
      if (input.method === 'topics' && !text) return badRequest('Please paste a topic list first.')
      if (text) inputs.push(parseTopicList(text))
    }

    if (input.method === 'pdf') {
      const p = coerceParsed(input.parsed)
      if (!p || p.nodes.length === 0) {
        return badRequest('Please upload and review a PDF structure first.')
      }
      inputs.push(p)
    }

    if (input.method === 'subject') {
      const sel = input.selection ?? {}
      const total = (sel.bookIds?.length ?? 0) + (sel.chapterIds?.length ?? 0) + (sel.lessonIds?.length ?? 0)
      if (total === 0) return badRequest('Please select at least one book, chapter or topic.')
    }

    if (input.method === 'combination' && input.baseBookId) {
      const user = await getSessionUser(req)
      if (!user) return unauthorized('Sign in to combine an existing custom book.')
      const base = await db.customBook.findFirst({
        where: { id: input.baseBookId, userId: user.id },
        include: { chapters: { include: { items: true } } },
      })
      if (!base) return badRequest('The base custom book was not found.')
      const baseLessonIds = base.chapters.flatMap((c) => c.items.map((i) => i.sourceLibraryRecordId))
      selection = { ...selection, lessonIds: [...(selection.lessonIds ?? []), ...baseLessonIds] }
    }

    if (input.method === 'combination') {
      const p = coerceParsed(input.parsed)
      if (p && p.nodes.length > 0) inputs.push(p)
      const anyInput =
        inputs.length > 0 ||
        (selection.bookIds?.length ?? 0) + (selection.chapterIds?.length ?? 0) + (selection.lessonIds?.length ?? 0) >
          0
      if (!anyInput) return badRequest('Add at least one subject, topic list, PDF or custom book to combine.')
    }

    /* merge parsed inputs (combination may carry several) */
    const merged: ParsedInput = {
      rootName: inputs.map((i) => i.rootName).find((r) => r.length > 0) ?? '',
      nodes: inputs.flatMap((i) => i.nodes),
    }

    const raw = [...matchParsed(merged), ...selectionToMatches(selection)]
    const assembled = assemble(raw)

    /* aggregate prerequisite suggestions for the review UI */
    const prereqMap = new Map<string, { neededBy: string[] }>()
    for (const m of assembled.matches) {
      for (const id of m.prerequisiteRecordIds) {
        const entry = prereqMap.get(id) ?? { neededBy: [] }
        entry.neededBy.push(m.requested)
        prereqMap.set(id, entry)
      }
    }
    const { CATALOG } = await import('@/lib/builder/catalog')
    const prerequisites = Array.from(prereqMap.entries())
      .map(([recordId, info]) => {
        const rec = CATALOG.lessonById.get(recordId)
        if (!rec) return null
        return {
          recordId,
          lessonNumber: rec.lessonNumber,
          lessonTitle: rec.lessonTitle,
          location: `${rec.bookTitle} · Chapter ${rec.chapterNumber} · ${rec.chapterTitle}`,
          neededBy: Array.from(new Set(info.neededBy)).slice(0, 8),
        }
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)

    return NextResponse.json({
      rootName: merged.rootName,
      matches: assembled.matches,
      toc: assembled.toc,
      coverage: assembled.coverage,
      totalLessons: assembled.totalLessons,
      totalWords: assembled.totalWords,
      prerequisites,
    })
  } catch (err) {
    return serverError(err)
  }
}
