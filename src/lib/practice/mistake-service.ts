/**
 * Practice — the Mistake Bank service (server only).
 *
 * Every wrong quiz answer and self-reported exercise miss becomes ONE
 * spaced-repetition card per question, scheduled by the same SM-2-lite
 * engine as the study ledger (srs.ts is reused directly). Cards resolve
 * after two consecutive good reviews — or immediately when the learner
 * retakes the question correctly in the reader/drill (outcome 'correct').
 * refIds stay canonical (lessonId + stable question key); snapshots of
 * prompt/given/expected/explain are stored only so cards render without
 * re-walking the library blocks.
 */
import { db } from '@/lib/db'
import { CATALOG } from '@/lib/builder/catalog'
import { applyReview, computeMastery, overdueDays, stateOfMastery } from '@/lib/revision/srs'
import type { EntryState } from '@/lib/revision/types'
import type { MistakeSource, MistakeView, RecordMistakeRequest } from './types'

type MistakeRow = {
  id: string
  userId: string
  source: string
  lessonId: string
  questionKey: string
  prompt: string
  given: string
  expected: string
  explain: string
  ease: number
  intervalDays: number
  passes: number
  lastQuality: number
  mastery: number
  lastAt: Date
  dueAt: Date
  timesWrong: number
  resolvedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const SOURCES: MistakeSource[] = ['quiz', 'exercise']
const MAX_SNAPSHOT = 4000

function toView(m: MistakeRow): MistakeView {
  const l = CATALOG.lessonById.get(m.lessonId)
  const now = Date.now()
  return {
    id: m.id,
    source: (SOURCES.includes(m.source as MistakeSource) ? m.source : 'quiz') as MistakeSource,
    lessonId: m.lessonId,
    bookId: l?.bookId ?? '',
    bookTitle: l?.bookTitle ?? '',
    chapterNumber: l?.chapterNumber ?? 0,
    chapterTitle: l?.chapterTitle ?? '',
    lessonNumber: l?.lessonNumber ?? '',
    lessonTitle: l?.lessonTitle ?? '',
    url: l?.url ?? '/',
    questionKey: m.questionKey,
    prompt: m.prompt,
    given: m.given,
    expected: m.expected,
    explain: m.explain,
    timesWrong: m.timesWrong,
    passes: m.passes,
    mastery: Math.round(m.mastery),
    state: stateOfMastery(m.mastery) as EntryState,
    dueAt: m.dueAt.toISOString(),
    lastAt: m.lastAt.toISOString(),
    resolvedAt: m.resolvedAt ? m.resolvedAt.toISOString() : null,
    overdueDays: m.resolvedAt ? 0 : overdueDays(m.dueAt.getTime(), now),
  }
}

function validateRecord(req: RecordMistakeRequest): string | null {
  if (!SOURCES.includes(req.source)) return `invalid source: ${req.source}`
  if (!req.lessonId || !CATALOG.lessonById.has(req.lessonId)) return `unknown lessonId: ${req.lessonId}`
  if (typeof req.questionKey !== 'string' || req.questionKey.length === 0) return 'questionKey required'
  if (!req.questionKey.startsWith(`${req.lessonId}#`)) return 'questionKey must belong to lessonId'
  if (typeof req.prompt !== 'string' || !req.prompt.trim()) return 'prompt required'
  if (req.outcome && req.outcome !== 'wrong' && req.outcome !== 'correct') return 'invalid outcome'
  return null
}

const clip = (s: string | undefined, fallback = '') =>
  (s ?? fallback).slice(0, MAX_SNAPSHOT)

/**
 * Record one outcome. 'wrong' (default) creates the card or re-opens it
 * (timesWrong++, schedule reset to due-now); 'correct' resolves an
 * existing unresolved card — a proven retake retires the mistake.
 */
export async function recordMistake(
  userId: string,
  req: RecordMistakeRequest,
): Promise<{ ok: boolean; created: boolean; resolved: boolean; id?: string }> {
  const invalid = validateRecord(req)
  if (invalid) throw new BadInput(invalid)

  const where = { userId_questionKey: { userId, questionKey: req.questionKey } }
  const existing = await db.mistake.findUnique({ where })

  if (req.outcome === 'correct') {
    if (existing && !existing.resolvedAt) {
      await db.mistake.update({
        where: { id: existing.id },
        data: { resolvedAt: new Date(), mastery: Math.max(existing.mastery, 75) },
      })
      return { ok: true, created: false, resolved: true, id: existing.id }
    }
    return { ok: true, created: false, resolved: false }
  }

  const now = new Date()
  if (existing) {
    const updated = await db.mistake.update({
      where: { id: existing.id },
      data: {
        timesWrong: existing.timesWrong + 1,
        resolvedAt: null,
        given: clip(req.given),
        expected: clip(req.expected),
        explain: clip(req.explain),
        passes: 0,
        lastQuality: 0,
        mastery: 0,
        intervalDays: 1,
        lastAt: now,
        dueAt: now,
      },
    })
    return { ok: true, created: false, resolved: false, id: updated.id }
  }

  const created = await db.mistake.create({
    data: {
      userId,
      source: req.source,
      lessonId: req.lessonId,
      questionKey: req.questionKey,
      prompt: clip(req.prompt),
      given: clip(req.given),
      expected: clip(req.expected),
      explain: clip(req.explain),
      dueAt: now,
      lastAt: now,
    },
  })
  return { ok: true, created: true, resolved: false, id: created.id }
}

/** Batch record (drill / exam submits grade server-side). */
export async function recordMistakes(
  userId: string,
  items: RecordMistakeRequest[],
): Promise<number> {
  let recorded = 0
  for (const item of items) {
    try {
      const r = await recordMistake(userId, item)
      if (r.ok && !r.resolved) recorded++
    } catch {
      /* per-item failures never fail the batch */
    }
  }
  return recorded
}

export interface MistakeReviewResult {
  ok: boolean
  mistake?: MistakeView
  resolved: boolean
}

/**
 * Grade a review of one mistake card: Again(1)·Hard(3)·Good(4)·Easy(5)
 * move the same SM-2-lite schedule; two CONSECUTIVE good reviews
 * (previous and current quality ≥ 4, passes ≥ 2) retire the card.
 */
export async function reviewMistake(
  userId: string,
  id: string,
  quality: number,
): Promise<MistakeReviewResult> {
  const q = Math.min(5, Math.max(1, Math.round(quality)))
  const m = await db.mistake.findUnique({ where: { id } })
  if (!m || m.userId !== userId) throw new BadInput('mistake not found')

  const now = Date.now()
  const prev = {
    ease: m.ease,
    intervalDays: Math.max(1, m.intervalDays),
    passes: Math.max(0, m.passes),
    lastQuality: m.lastQuality,
    lastAt: m.lastAt.getTime(),
    dueAt: m.dueAt.getTime(),
  }
  const next = applyReview(prev, q, now)
  const mastery = computeMastery(next, now)
  const resolved =
    next.passes >= 2 && next.lastQuality >= 4 && prev.lastQuality >= 4

  const updated = await db.mistake.update({
    where: { id: m.id },
    data: {
      ease: next.ease,
      intervalDays: next.intervalDays,
      passes: next.passes,
      lastQuality: next.lastQuality,
      lastAt: new Date(next.lastAt),
      dueAt: new Date(next.dueAt),
      mastery,
      resolvedAt: resolved ? new Date() : null,
    },
  })
  return { ok: true, mistake: toView(updated), resolved }
}

/** Manual resolve / reopen. */
export async function setMistakeResolved(
  userId: string,
  id: string,
  resolved: boolean,
): Promise<MistakeView> {
  const m = await db.mistake.findUnique({ where: { id } })
  if (!m || m.userId !== userId) throw new BadInput('mistake not found')
  const updated = await db.mistake.update({
    where: { id: m.id },
    data: resolved
      ? { resolvedAt: new Date(), mastery: Math.max(m.mastery, 80) }
      : { resolvedAt: null, dueAt: new Date(), intervalDays: 1, passes: 0, mastery: 0 },
  })
  return toView(updated)
}

export async function listMistakes(userId: string): Promise<{
  stats: { total: number; due: number; upcoming: number; resolved: number }
  due: MistakeView[]
  upcoming: MistakeView[]
  resolved: MistakeView[]
}> {
  const rows = await db.mistake.findMany({
    where: { userId },
    orderBy: [{ resolvedAt: 'asc' }, { dueAt: 'asc' }],
  })
  const now = Date.now()
  const views = rows.map(toView)
  const unresolved = views.filter((v) => !v.resolvedAt)
  const due = unresolved.filter((v) => new Date(v.dueAt).getTime() <= now)
  const upcoming = unresolved.filter((v) => new Date(v.dueAt).getTime() > now)
  const resolved = views.filter((v) => v.resolvedAt).slice(0, 30)
  return {
    stats: {
      total: unresolved.length,
      due: due.length,
      upcoming: upcoming.length,
      resolved: views.filter((v) => v.resolvedAt).length,
    },
    due,
    upcoming,
    resolved,
  }
}

export class BadInput extends Error {}
