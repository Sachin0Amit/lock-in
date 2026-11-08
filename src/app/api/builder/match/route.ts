import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { EXAM_TEMPLATES } from '@/lib/builder/exam-templates'
import { buildMatchPlan } from '@/lib/builder/match-input'
import { assemble } from '@/lib/builder/toc'
import { matchParsed, selectionToMatches } from '@/lib/builder/matcher'

export const runtime = 'nodejs'

const schema = z.object({
  method: z.enum(['exam', 'subject', 'topics', 'pdf', 'combination']).optional(),
  exam: z.string().max(200).optional(),
  topicText: z.string().max(200_000).optional(),
  parsed: z
    .object({
      rootName: z.string().max(300).default(''),
      nodes: z.array(z.any()).optional(),
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

/**
 * The content-discovery entry point. The unified builder desk sends every
 * filled channel at once (exam · library picks · topic list · PDF · base
 * custom book); legacy single-method requests still validate as before.
 * Everything resolves to the SAME discovery engine, which only ever
 * selects existing Main Academic Library records. Stateless — usable
 * without an account; merging a custom book still validates ownership
 * (the local learner for guests, the session user otherwise).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return badRequest('Invalid matching request.', { details: parsed.error.issues.map((i) => i.message) })
    }
    const raw = parsed.data

    const plan = buildMatchPlan({
      method: raw.method,
      exam: raw.exam,
      topicText: raw.topicText,
      parsed: raw.parsed
        ? { rootName: raw.parsed.rootName ?? '', nodes: (raw.parsed.nodes ?? []) as unknown[] }
        : undefined,
      selection: raw.selection,
      baseBookId: raw.baseBookId,
    })

    if (plan.error) return badRequest(plan.error)
    if (plan.examOnly) {
      return NextResponse.json({
        unknownExam: true,
        examName: (raw.exam ?? '').trim(),
        examSuggestions: EXAM_TEMPLATES.map((t) => t.label),
        matches: [],
        toc: [],
        coverage: { requested: 0, exact: 0, equivalent: 0, partial: 0, notAvailable: 0, percent: 0 },
        totalLessons: 0,
        totalWords: 0,
        prerequisites: [],
        derivedMethod: 'exam',
        sources: plan.sources,
        warnings: [plan.examWarning ?? 'Unknown examination.'],
        note:
          'This examination is not in the built-in scope maps yet. Try one of the known examinations, paste its topic list, upload its syllabus PDF, or pick subjects straight from the library.',
      })
    }

    /* merge the structure of an existing custom book (ownership required) */
    let selection = plan.selection
    if (plan.baseBookId) {
      const user = await resolveUser(req)
      const base = await db.customBook.findFirst({
        where: { id: plan.baseBookId, userId: user.id },
        include: { chapters: { include: { items: true } } },
      })
      if (!base) return badRequest('The base custom book was not found.')
      const baseLessonIds = base.chapters.flatMap((c) => c.items.map((i) => i.sourceLibraryRecordId))
      selection = { ...selection, lessonIds: [...(selection.lessonIds ?? []), ...baseLessonIds] }
    }

    /* merge parsed inputs (the unified desk may carry several) */
    const merged = {
      rootName: plan.inputs.map((i) => i.rootName).find((r) => r.length > 0) ?? '',
      nodes: plan.inputs.flatMap((i) => i.nodes),
    }

    const rawMatches = [...matchParsed(merged), ...selectionToMatches(selection)]
    const assembled = assemble(rawMatches)

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
      derivedMethod: plan.derivedMethod,
      sources: plan.sources,
      warnings: plan.warnings,
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
