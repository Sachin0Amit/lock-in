/**
 * Revision & Mastery — the ledger service (server only).
 *
 * Persists the per-user study ledger in SQLite and assembles every read
 * model the Revision Hub needs: the dashboard overview (entries, queue,
 * activity, book breakdown, least-revised rankings, mastery histogram)
 * and the knowledge graph (library structure + mastery overlay).
 *
 * Honest-data rules, same spirit as the Custom Book Builder:
 *  - refIds are validated against the live catalog; unknown ids are
 *    rejected, never silently created.
 *  - the ledger stores references and derived numbers only — academic
 *    content lives exclusively in the Main Academic Library.
 *  - numbers shown are computed from these tables; nothing is invented.
 */
import { db } from '@/lib/db'
import { CATALOG } from '@/lib/builder/catalog'
import { paths } from '@/data/library/index'
import {
  applyReview,
  buildQueue,
  computeMastery,
  computeRisk,
  daysBetween,
  initialSrsState,
  overdueDays,
  revisionMinutes,
  stateOfMastery,
  DAY_MS,
} from './srs'
import type {
  ActivityDay,
  BookBreakdown,
  EntryState,
  EntryView,
  GraphChapter,
  GraphEdge,
  GraphNode,
  GraphResponse,
  MarkAction,
  MarkItem,
  MarkItemResult,
  MarkRequest,
  OverviewResponse,
  QueueItem,
  RecentEvent,
  RevisionSummary,
  RevisionSummaryCompact,
} from './types'
import type { QueueCandidate } from './srs'

type EntryRow = {
  id: string
  userId: string
  scope: string
  refId: string
  firstAt: Date
  lastAt: Date
  passes: number
  ease: number
  intervalDays: number
  dueAt: Date
  lastQuality: number
  mastery: number
  updatedAt: Date
}

const MAX_ITEMS = 200
const ACTION_SET: MarkAction[] = ['study', 'revise', 'unmark', 'quiz']
const KIND_SET = ['first', 'revision', 'quiz', 'chapter-mark', 'lesson-complete']
const ACTIVITY_WINDOW_DAYS = 84

/* ------------------------------------------------------------------ */
/* Metadata resolution (catalog-backed, defensive)                     */
/* ------------------------------------------------------------------ */

function chapterReadMins(key: string): number {
  const ch = CATALOG.chapterByKey.get(key)
  if (!ch) return 0
  return ch.lessonRecordIds.reduce((n, id) => n + (CATALOG.lessonById.get(id)?.readMins ?? 0), 0)
}

function toChapterView(e: EntryRow, lessonsStudied: number): EntryView {
  const ch = CATALOG.chapterByKey.get(e.refId)
  const book = ch ? CATALOG.bookById.get(ch.bookId) : undefined
  const now = Date.now()
  return {
    scope: 'chapter',
    refId: e.refId,
    bookId: ch?.bookId ?? '',
    bookTitle: ch?.bookTitle ?? e.refId,
    disciplineId: book?.disciplineId ?? '',
    disciplineTitle: book?.disciplineTitle ?? '',
    chapterNumber: ch?.chapterNumber ?? 0,
    chapterTitle: ch?.chapterTitle ?? '',
    label: ch ? `Chapter ${ch.chapterNumber} · ${ch.chapterTitle}` : e.refId,
    lessonCount: ch?.lessonRecordIds.length ?? 0,
    lessonsStudied,
    readMins: chapterReadMins(e.refId),
    url: ch ? `${paths.book(ch.bookId)}#ch-${ch.chapterNumber}` : '/',
    passes: e.passes,
    firstAt: e.firstAt.toISOString(),
    lastAt: e.lastAt.toISOString(),
    dueAt: e.dueAt.toISOString(),
    intervalDays: e.intervalDays,
    ease: e.ease,
    lastQuality: e.lastQuality,
    mastery: Math.round(e.mastery),
    risk: computeRisk(e.lastAt.getTime(), e.intervalDays, now),
    state: stateOfMastery(e.mastery),
    overdueDays: overdueDays(e.dueAt.getTime(), now),
    daysSince: daysBetween(e.lastAt.getTime(), now),
  }
}

function toLessonView(e: EntryRow): EntryView {
  const l = CATALOG.lessonById.get(e.refId)
  const book = l ? CATALOG.bookById.get(l.bookId) : undefined
  const now = Date.now()
  return {
    scope: 'lesson',
    refId: e.refId,
    bookId: l?.bookId ?? '',
    bookTitle: l?.bookTitle ?? e.refId,
    disciplineId: book?.disciplineId ?? '',
    disciplineTitle: book?.disciplineTitle ?? '',
    chapterNumber: l?.chapterNumber ?? 0,
    chapterTitle: l?.chapterTitle ?? '',
    label: l ? `${l.lessonNumber} · ${l.lessonTitle}` : e.refId,
    lessonNumber: l?.lessonNumber,
    lessonTitle: l?.lessonTitle,
    readMins: l?.readMins ?? 0,
    url: l ? l.url : '/',
    passes: e.passes,
    firstAt: e.firstAt.toISOString(),
    lastAt: e.lastAt.toISOString(),
    dueAt: e.dueAt.toISOString(),
    intervalDays: e.intervalDays,
    ease: e.ease,
    lastQuality: e.lastQuality,
    mastery: Math.round(e.mastery),
    risk: computeRisk(e.lastAt.getTime(), e.intervalDays, now),
    state: stateOfMastery(e.mastery),
    overdueDays: overdueDays(e.dueAt.getTime(), now),
    daysSince: daysBetween(e.lastAt.getTime(), now),
  }
}

function chapterKeyOfLesson(lessonId: string): string | undefined {
  const l = CATALOG.lessonById.get(lessonId)
  return l ? `${l.bookId}:${l.chapterNumber}` : undefined
}

/* ------------------------------------------------------------------ */
/* Marking                                                             */
/* ------------------------------------------------------------------ */

function validateRequest(req: MarkRequest): string | null {
  if (!Array.isArray(req.items) || req.items.length === 0) return 'items must be a non-empty array'
  if (req.items.length > MAX_ITEMS) return `too many items (max ${MAX_ITEMS})`
  if (!ACTION_SET.includes(req.action)) return `action must be one of ${ACTION_SET.join(', ')}`
  if (req.quality !== undefined && (req.quality < 0 || req.quality > 5)) return 'quality must be 0..5'
  if (req.secs !== undefined && (req.secs < 0 || req.secs > 86400)) return 'secs out of range'
  if (req.kind !== undefined && !KIND_SET.includes(req.kind)) {
    return `kind must be one of ${KIND_SET.join(', ')}`
  }
  for (const it of req.items) {
    if (it.scope !== 'chapter' && it.scope !== 'lesson') return `invalid scope: ${it.scope}`
    if (typeof it.refId !== 'string' || it.refId.length === 0) return 'refId must be a non-empty string'
    const known =
      it.scope === 'chapter' ? CATALOG.chapterByKey.has(it.refId) : CATALOG.lessonById.has(it.refId)
    if (!known) return `unknown ${it.scope} refId: ${it.refId}`
  }
  return null
}

async function writeEvent(
  userId: string,
  entryId: string,
  kind: string,
  quality: number | undefined,
  secs: number | undefined,
): Promise<void> {
  await db.studyEvent.create({
    data: { userId, entryId, kind, quality: quality ?? null, secs: secs ?? null },
  })
}

/**
 * Apply a marking action to a batch of items. All operations are
 * idempotent: 'study' never double-counts an existing entry, 'unmark'
 * succeeds on absent rows, and unknown ids are rejected with per-item
 * errors (without failing the batch).
 */
export async function markStudy(userId: string, req: MarkRequest): Promise<MarkItemResult[]> {
  const invalid = validateRequest(req)
  if (invalid) throw new BadInput(invalid)

  const results: MarkItemResult[] = []
  const now = Date.now()

  for (const item of req.items as MarkItem[]) {
    const where = { userId_scope_refId: { userId, scope: item.scope, refId: item.refId } }
    const existing = await db.studyEntry.findUnique({ where })

    try {
      if (req.action === 'unmark') {
        if (existing) {
          await db.studyEntry.delete({ where: { id: existing.id } })
          results.push({ scope: item.scope, refId: item.refId, ok: true, deleted: true })
        } else {
          results.push({ scope: item.scope, refId: item.refId, ok: true, deleted: false })
        }
        continue
      }

      if (existing) {
        if (req.action === 'study') {
          /* idempotent: marking an already-studied item again is a no-op */
          const view =
            item.scope === 'chapter' ? toChapterView(existing, 0) : toLessonView(existing)
          results.push({ scope: item.scope, refId: item.refId, ok: true, created: false, entry: view })
          continue
        }

        /* 'revise' and 'quiz' both schedule a review step */
        const prev = {
          ease: existing.ease,
          intervalDays: existing.intervalDays,
          passes: existing.passes,
          lastQuality: existing.lastQuality,
          lastAt: existing.lastAt.getTime(),
          dueAt: existing.dueAt.getTime(),
        }
        const next = applyReview(prev, req.quality ?? 3, now)
        const mastery = computeMastery(next, now)
        const updated = await db.studyEntry.update({
          where: { id: existing.id },
          data: {
            ease: next.ease,
            intervalDays: next.intervalDays,
            passes: next.passes,
            lastQuality: next.lastQuality,
            lastAt: new Date(next.lastAt),
            dueAt: new Date(next.dueAt),
            mastery,
          },
        })
        const kind = req.action === 'quiz' ? 'quiz' : 'revision'
        await writeEvent(userId, updated.id, kind, req.quality, req.secs)
        const lessonsStudied = await countLessonsStudied(userId, item)
        const view =
          item.scope === 'chapter' ? toChapterView(updated, lessonsStudied) : toLessonView(updated)
        results.push({ scope: item.scope, refId: item.refId, ok: true, created: false, entry: view })
      } else {
        const init = initialSrsState(now, req.quality ?? 3)
        const mastery = computeMastery(init, now)
        const created = await db.studyEntry.create({
          data: {
            userId,
            scope: item.scope,
            refId: item.refId,
            firstAt: new Date(init.lastAt),
            lastAt: new Date(init.lastAt),
            passes: init.passes,
            ease: init.ease,
            intervalDays: init.intervalDays,
            dueAt: new Date(init.dueAt),
            lastQuality: init.lastQuality,
            mastery,
          },
        })
        const kind =
          req.action === 'quiz' ? 'quiz' : (req.kind ?? (item.scope === 'chapter' ? 'chapter-mark' : 'lesson-complete'))
        await writeEvent(userId, created.id, kind, req.quality, req.secs)
        const lessonsStudied = await countLessonsStudied(userId, item)
        const view =
          item.scope === 'chapter' ? toChapterView(created, lessonsStudied) : toLessonView(created)
        results.push({ scope: item.scope, refId: item.refId, ok: true, created: true, entry: view })
      }
    } catch (err) {
      results.push({ scope: item.scope, refId: item.refId, ok: false, error: String(err) })
    }
  }

  return results
}

async function countLessonsStudied(userId: string, item: MarkItem): Promise<number> {
  if (item.scope !== 'chapter') return 0
  const ch = CATALOG.chapterByKey.get(item.refId)
  if (!ch) return 0
  const rows = await db.studyEntry.findMany({
    where: { userId, scope: 'lesson', refId: { in: ch.lessonRecordIds } },
    select: { refId: true },
  })
  return rows.length
}

export class BadInput extends Error {}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

function localDate(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export async function getOverview(userId: string): Promise<OverviewResponse> {
  const now = Date.now()
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const events = await db.studyEvent.findMany({
    where: { userId },
    select: { createdAt: true, kind: true },
    orderBy: { createdAt: 'asc' },
  })

  const chapterEntries = new Map<string, EntryRow>()
  const lessonEntries = new Map<string, EntryRow>()
  for (const e of entries) {
    if (e.scope === 'chapter') chapterEntries.set(e.refId, e)
    else lessonEntries.set(e.refId, e)
  }

  /* lessons studied per chapter key */
  const lessonsStudiedByChapter = new Map<string, number>()
  for (const refId of lessonEntries.keys()) {
    const key = chapterKeyOfLesson(refId)
    if (key) lessonsStudiedByChapter.set(key, (lessonsStudiedByChapter.get(key) ?? 0) + 1)
  }

  const chapterViews: EntryView[] = [...chapterEntries.values()].map((e) =>
    toChapterView(e, lessonsStudiedByChapter.get(e.refId) ?? 0),
  )
  const lessonViews: EntryView[] = [...lessonEntries.values()].map(toLessonView)

  /* queue: chapters + lessons whose chapter has no entry (no duplicates) */
  const orphanLessonViews = lessonViews.filter((v) => {
    const key = `${v.bookId}:${v.chapterNumber}`
    return !chapterEntries.has(key)
  })
  const candidates: QueueCandidate[] = [...chapterViews, ...orphanLessonViews].map((v) => ({
    scope: v.scope,
    refId: v.refId,
    passes: v.passes,
    mastery: v.mastery,
    risk: v.risk,
    overdueDays: v.overdueDays,
    daysSince: v.daysSince,
    dueAt: new Date(v.dueAt).getTime(),
    intervalDays: v.intervalDays,
    readMins: v.readMins,
    label: `${v.bookTitle} — ${v.label}`,
  }))
  const queue: QueueItem[] = buildQueue(candidates, now).map((c) => {
    const view = [...chapterViews, ...orphanLessonViews].find((v) => v.refId === c.refId)!
    return { ...view, reason: c.reason, urgency: c.urgency }
  })

  /* activity calendar — last 84 days, zero-filled */
  const activity: ActivityDay[] = []
  const countByDay = new Map<string, number>()
  for (let i = ACTIVITY_WINDOW_DAYS - 1; i >= 0; i--) {
    activity.push({ date: localDate(now - i * DAY_MS), count: 0 })
  }
  const activityIndex = new Map(activity.map((d, i) => [d.date, i]))
  for (const ev of events) {
    const key = localDate(ev.createdAt.getTime())
    const idx = activityIndex.get(key)
    if (idx !== undefined) activity[idx].count++
    countByDay.set(key, (countByDay.get(key) ?? 0) + 1)
  }

  const dueQueue = queue.filter((q) => new Date(q.dueAt).getTime() <= now)
  const watchQueue = queue.filter((q) => new Date(q.dueAt).getTime() > now && q.risk >= 25)

  const revisions7d = events.filter(
    (e) => e.createdAt.getTime() >= now - 7 * DAY_MS && e.kind !== 'first',
  ).length

  const summary: RevisionSummary = {
    dueCount: dueQueue.length,
    watchCount: watchQueue.length,
    studiedChapters: chapterEntries.size,
    studiedLessons: lessonEntries.size,
    totalChapters: CATALOG.chapters.length,
    totalLessons: CATALOG.lessons.length,
    totalPasses: entries.reduce((n, e) => n + e.passes, 0),
    avgMastery: chapterViews.length
      ? Math.round(chapterViews.reduce((n, v) => n + v.mastery, 0) / chapterViews.length)
      : 0,
    activeDays: countByDay.size,
    revisions7d,
    estMins: dueQueue.reduce((n, q) => n + revisionMinutes(q.readMins), 0),
    lastActivity: events.length ? events[events.length - 1].createdAt.toISOString() : null,
  }

  /* per-book breakdown — every catalog book, zeros included */
  const bookBreakdown: BookBreakdown[] = CATALOG.books.map((b) => {
    const chKeys = b.chapterKeys
    const studied = chKeys.filter((k) => chapterEntries.has(k))
    const chViews = chapterViews.filter((v) => v.bookId === b.bookId)
    const lViews = lessonViews.filter((v) => v.bookId === b.bookId)
    const masteryParts: number[] = []
    if (chViews.length) masteryParts.push(...chViews.map((v) => v.mastery))
    else if (lViews.length) masteryParts.push(...lViews.map((v) => v.mastery))
    const lastStamps = [...chViews, ...lViews].map((v) => v.lastAt)
    return {
      bookId: b.bookId,
      title: b.title,
      accent: b.accent,
      chaptersStudied: studied.length,
      chaptersTotal: chKeys.length,
      lessonsStudied: lViews.length,
      lessonsTotal: b.lessonRecordIds.length,
      avgMastery: masteryParts.length
        ? Math.round(masteryParts.reduce((n, m) => n + m, 0) / masteryParts.length)
        : 0,
      passes: chViews.reduce((n, v) => n + v.passes, 0) + lViews.reduce((n, v) => n + v.passes, 0),
      dueCount: queue.filter((q) => q.bookId === b.bookId && new Date(q.dueAt).getTime() <= now).length,
      lastActivity: lastStamps.length ? lastStamps.sort().at(-1)! : null,
    }
  })

  /* least revised — the neglect rankings the user asked for */
  const byNeglect = (a: EntryView, b: EntryView) =>
    a.passes - b.passes || new Date(a.lastAt).getTime() - new Date(b.lastAt).getTime()
  const leastRevised = {
    chapters: [...chapterViews].sort(byNeglect).slice(0, 8),
    lessons: [...lessonViews].sort(byNeglect).slice(0, 8),
    books: [...bookBreakdown]
      .filter((b) => b.chaptersStudied + b.lessonsStudied > 0)
      .sort((a, b) => a.passes - b.passes || (a.lastActivity ?? '').localeCompare(b.lastActivity ?? ''))
      .slice(0, 5)
      .map((b) => b.title),
  }

  /* mastery histogram over ALL chapters (new/learning/familiar/strong/mastered) */
  const hist: Record<EntryState | 'new', number> = {
    new: 0,
    learning: 0,
    familiar: 0,
    strong: 0,
    mastered: 0,
  }
  for (const ch of CATALOG.chapters) {
    const entry = chapterEntries.get(ch.key)
    if (entry) {
      hist[stateOfMastery(entry.mastery)]++
      continue
    }
    const lViews = lessonViews.filter((v) => `${v.bookId}:${v.chapterNumber}` === ch.key)
    if (lViews.length) {
      const avg = lViews.reduce((n, v) => n + v.mastery, 0) / lViews.length
      hist[stateOfMastery(avg)]++
    } else {
      hist.new++
    }
  }

  /* recent events — the study log tail */
  const recentEvents: RecentEvent[] = []
  {
    const tail = await db.studyEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 12,
      include: { entry: { select: { scope: true, refId: true } } },
    })
    for (const ev of tail) {
      const scope = ev.entry.scope === 'chapter' ? 'chapter' : 'lesson'
      const meta =
        scope === 'chapter'
          ? CATALOG.chapterByKey.get(ev.entry.refId)
          : CATALOG.lessonById.get(ev.entry.refId)
      if (!meta) continue
      const bookId =
        scope === 'chapter' ? (meta as { bookId: string }).bookId : (meta as { bookId: string }).bookId
      recentEvents.push({
        kind: ev.kind,
        scope,
        refId: ev.entry.refId,
        label:
          scope === 'chapter'
            ? `Ch ${(meta as { chapterNumber: number }).chapterNumber} · ${(meta as { chapterTitle: string }).chapterTitle}`
            : `${(meta as { lessonNumber: string }).lessonNumber} · ${(meta as { lessonTitle: string }).lessonTitle}`,
        url:
          scope === 'chapter'
            ? `${paths.book(bookId)}#ch-${(meta as { chapterNumber: number }).chapterNumber}`
            : (meta as { url: string }).url,
        createdAt: ev.createdAt.toISOString(),
      })
    }
  }

  return {
    entries: [...chapterViews, ...lessonViews],
    queue,
    summary,
    activity,
    bookBreakdown,
    leastRevised,
    masteryHistogram: (Object.keys(hist) as (EntryState | 'new')[]).map((state) => ({
      state,
      count: hist[state],
    })),
    recentEvents,
  }
}

/** Compact counts for the header badge — cheap enough for every page. */
export async function getSummaryCompact(userId: string): Promise<RevisionSummaryCompact> {
  const now = Date.now()
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const chapterKeys = new Set(
    entries.filter((e) => e.scope === 'chapter').map((e) => e.refId),
  )
  let dueCount = 0
  let watchCount = 0
  let studiedLessons = 0
  let studiedChapters = 0
  for (const e of entries) {
    if (e.scope === 'chapter') {
      studiedChapters++
    } else {
      studiedLessons++
      /* lesson counts only when its chapter is not already tracked */
      if (chapterKeys.has(`${CATALOG.lessonById.get(e.refId)?.bookId ?? ''}:${CATALOG.lessonById.get(e.refId)?.chapterNumber ?? ''}`)) {
        continue
      }
    }
    const due = e.dueAt.getTime() <= now
    const risk = computeRisk(e.lastAt.getTime(), e.intervalDays, now)
    if (due) dueCount++
    else if (risk >= 25) watchCount++
  }
  return { dueCount, watchCount, studiedChapters, studiedLessons }
}

export async function getEntry(userId: string, scope: string, refId: string): Promise<EntryView | null> {
  const e = await db.studyEntry.findUnique({
    where: { userId_scope_refId: { userId, scope, refId } },
  })
  if (!e) return null
  if (scope === 'chapter') {
    const lessonsStudied = await countLessonsStudied(userId, { scope: 'chapter', refId })
    return toChapterView(e, lessonsStudied)
  }
  return toLessonView(e)
}

/* ------------------------------------------------------------------ */
/* Knowledge graph                                                     */
/* ------------------------------------------------------------------ */

const BRIDGE_MIN_JACCARD = 0.3
const BRIDGE_MAX = 80

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0
  const setA = new Set(a)
  let inter = 0
  for (const x of b) if (setA.has(x)) inter++
  const union = setA.size + b.length - inter
  return union === 0 ? 0 : inter / union
}

export async function getGraph(userId: string): Promise<GraphResponse> {
  const entries = await db.studyEntry.findMany({ where: { userId } })
  const lessonState = new Map<string, EntryRow>()
  for (const e of entries) if (e.scope === 'lesson') lessonState.set(e.refId, e)
  const chapterState = new Map<string, EntryRow>()
  for (const e of entries) if (e.scope === 'chapter') chapterState.set(e.refId, e)

  const now = Date.now()
  const nodes: GraphNode[] = CATALOG.lessons.map((l) => {
    const e = lessonState.get(l.recordId)
    return {
      id: l.recordId,
      bookId: l.bookId,
      bookTitle: l.bookTitle,
      chapterKey: `${l.bookId}:${l.chapterNumber}`,
      chapterNumber: l.chapterNumber,
      chapterTitle: l.chapterTitle,
      number: l.lessonNumber,
      title: l.lessonTitle,
      concepts: l.concepts,
      words: l.words,
      readMins: l.readMins,
      url: l.url,
      prereqIds: l.prerequisites,
      studied: !!e,
      passes: e?.passes,
      mastery: e ? Math.round(e.mastery) : undefined,
      risk: e ? computeRisk(e.lastAt.getTime(), e.intervalDays, now) : undefined,
      dueAt: e ? e.dueAt.toISOString() : null,
      state: e ? stateOfMastery(e.mastery) : 'new',
    }
  })

  const edgeSet = new Map<string, GraphEdge>()
  const addEdge = (source: string, target: string, kind: GraphEdge['kind'], weight: number) => {
    const key = `${source}\u0000${target}\u0000${kind}`
    if (!edgeSet.has(key)) edgeSet.set(key, { source, target, kind, weight })
  }

  /* 1. author-declared prerequisites (arrows from prereq → dependent) */
  let prereqEdges = 0
  for (const l of CATALOG.lessons) {
    for (const p of l.prerequisites) {
      if (CATALOG.lessonById.has(p)) {
        addEdge(p, l.recordId, 'prereq', 1)
        prereqEdges++
      }
    }
  }

  /* 2. in-chapter reading order (faint sequence links) */
  let sequenceEdges = 0
  for (const ch of CATALOG.chapters) {
    for (let i = 1; i < ch.lessonRecordIds.length; i++) {
      addEdge(ch.lessonRecordIds[i - 1], ch.lessonRecordIds[i], 'sequence', 0.4)
      sequenceEdges++
    }
  }

  /* 3. concept bridges — lessons in DIFFERENT chapters sharing concepts */
  const structPairs = new Set(
    [...edgeSet.values()].flatMap((e) => [`${e.source}|${e.target}`, `${e.target}|${e.source}`]),
  )
  const bridges: { source: string; target: string; weight: number }[] = []
  for (let i = 0; i < CATALOG.lessons.length; i++) {
    const a = CATALOG.lessons[i]
    for (let j = i + 1; j < CATALOG.lessons.length; j++) {
      const b = CATALOG.lessons[j]
      if (a.bookId === b.bookId && a.chapterNumber === b.chapterNumber) continue
      const w = jaccard(a.concepts, b.concepts)
      if (w >= BRIDGE_MIN_JACCARD && !structPairs.has(`${a.recordId}|${b.recordId}`)) {
        bridges.push({ source: a.recordId, target: b.recordId, weight: Math.round(w * 100) / 100 })
      }
    }
  }
  bridges.sort((x, y) => y.weight - x.weight)
  const keptBridges = bridges.slice(0, BRIDGE_MAX)
  for (const b of keptBridges) addEdge(b.source, b.target, 'bridge', b.weight)

  const chapters: GraphChapter[] = CATALOG.chapters.map((ch) => ({
    key: ch.key,
    bookId: ch.bookId,
    title: ch.chapterTitle,
    lessonIds: ch.lessonRecordIds,
    lessonsStudied: ch.lessonRecordIds.reduce((n, id) => n + (lessonState.has(id) ? 1 : 0), 0),
    passes: chapterState.get(ch.key)?.passes ?? 0,
  }))

  const edges = [...edgeSet.values()]
  return {
    nodes,
    edges,
    chapters,
    books: CATALOG.books.map((b) => ({ bookId: b.bookId, title: b.title, accent: b.accent })),
    stats: {
      nodes: nodes.length,
      edges: edges.length,
      prereqEdges,
      sequenceEdges,
      bridgeEdges: keptBridges.length,
    },
  }
}
