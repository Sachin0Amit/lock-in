/**
 * Focus — the service (server only).
 *
 * Persists the study to-do × pomodoro rows in SQLite and assembles the
 * Focus Hub payload: every task with its catalog-resolved deep link and
 * the raw session log (stats are computed client-side by the pure engine,
 * so "today" honours the learner's timezone, not the server's).
 *
 * Honest-data rules, same spirit as the ledger service:
 *  - task links are validated against the live catalog; unknown ids are
 *    rejected at write time, dropped honestly at read time.
 *  - a completed focus session on a linked chapter/lesson also writes a
 *    study pass into the SAME revision ledger (markStudy, kind 'focus',
 *    honest engagement seconds) — the Revision Hub, Progress engine and
 *    spaced-repetition schedule all see the time actually spent.
 */
import { db } from '@/lib/db'
import { CATALOG } from '@/lib/builder/catalog'
import { paths } from '@/data/library/index'
import { markStudy } from '@/lib/revision/ledger-service'
import { orderTasks } from '@/lib/focus/focus-engine'
import type {
  CreateTaskRequest,
  FocusOverviewResponse,
  LinkKind,
  LogSessionRequest,
  Phase,
  Priority,
  SessionRow,
  TaskLinkView,
  TaskStatus,
  TaskView,
  UpdateTaskRequest,
} from '@/lib/focus/types'

type TaskRow = {
  id: string
  title: string
  notes: string | null
  linkKind: string | null
  linkRef: string | null
  priority: string
  estimate: number
  status: string
  dueDate: Date | null
  pomos: number
  focusSecs: number
  createdAt: Date
  updatedAt: Date
  completedAt: Date | null
}

const PRIORITIES: Priority[] = ['low', 'normal', 'high']
const STATUSES: TaskStatus[] = ['open', 'done', 'dropped']
const LINK_KINDS: LinkKind[] = ['book', 'chapter', 'lesson']
const SESSION_WINDOW_DAYS = 60

export class BadInput extends Error {}

/* ------------------------------------------------------------------ */
/* Link resolution                                                     */
/* ------------------------------------------------------------------ */

function resolveLink(linkKind: string | null, linkRef: string | null): TaskLinkView | null {
  if (!linkKind || !linkRef) return null
  if (linkKind === 'lesson') {
    const l = CATALOG.lessonById.get(linkRef)
    if (!l) return null
    return {
      kind: 'lesson',
      refId: linkRef,
      label: `${l.bookTitle} · Ch ${l.chapterNumber} · ${l.lessonNumber} ${l.lessonTitle}`,
      shortLabel: `${l.lessonNumber} ${l.lessonTitle}`,
      bookTitle: l.bookTitle,
      url: l.url,
    }
  }
  if (linkKind === 'chapter') {
    const c = CATALOG.chapterByKey.get(linkRef)
    if (!c) return null
    return {
      kind: 'chapter',
      refId: linkRef,
      label: `${c.bookTitle} · Ch ${c.chapterNumber} · ${c.chapterTitle}`,
      shortLabel: `Ch ${c.chapterNumber} · ${c.chapterTitle}`,
      bookTitle: c.bookTitle,
      url: `${paths.book(c.bookId)}#ch-${c.chapterNumber}`,
    }
  }
  if (linkKind === 'book') {
    const b = CATALOG.bookById.get(linkRef)
    if (!b) return null
    return { kind: 'book', refId: linkRef, label: b.title, shortLabel: b.title, bookTitle: b.title, url: paths.book(b.bookId) }
  }
  return null
}

export function toTaskView(row: TaskRow): TaskView {
  return {
    id: row.id,
    title: row.title,
    notes: row.notes,
    link: resolveLink(row.linkKind, row.linkRef),
    priority: (PRIORITIES.includes(row.priority as Priority) ? row.priority : 'normal') as Priority,
    estimate: row.estimate,
    pomos: row.pomos,
    focusSecs: row.focusSecs,
    status: (STATUSES.includes(row.status as TaskStatus) ? row.status : 'open') as TaskStatus,
    dueDate: row.dueDate ? localDay(row.dueDate) : null,
    createdAt: row.createdAt.toISOString(),
    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
  }
}

/** Local YYYY-MM-DD of a stored date (due dates are date-only semantics). */
function localDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

function validTitle(v: unknown): string {
  const t = typeof v === 'string' ? v.trim() : ''
  if (t.length < 1 || t.length > 200) throw new BadInput('title must be 1..200 characters')
  return t
}

function validNotes(v: unknown): string | null {
  if (v === null || v === undefined) return null
  if (typeof v !== 'string') throw new BadInput('notes must be a string')
  const t = v.trim()
  if (t.length > 2000) throw new BadInput('notes must be ≤ 2000 characters')
  return t === '' ? null : t
}

function validPriority(v: unknown): Priority {
  if (v === undefined || v === null) return 'normal'
  if (typeof v !== 'string' || !PRIORITIES.includes(v as Priority)) {
    throw new BadInput(`priority must be one of ${PRIORITIES.join(', ')}`)
  }
  return v as Priority
}

function validEstimate(v: unknown): number {
  if (v === undefined || v === null) return 1
  if (!Number.isInteger(v) || (v as number) < 1 || (v as number) > 16) {
    throw new BadInput('estimate must be an integer 1..16')
  }
  return v as number
}

function validDueDate(v: unknown): string | null {
  if (v === null || v === undefined || v === '') return null
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    throw new BadInput('dueDate must be YYYY-MM-DD or null')
  }
  const [y, m, d] = v.split('-').map(Number)
  const date = new Date(y, (m ?? 1) - 1, d ?? 1)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    throw new BadInput('dueDate is not a real calendar date')
  }
  return v
}

function validLink(v: unknown): { linkKind: LinkKind; linkRef: string } | null {
  if (v === null || v === undefined) return null
  if (typeof v !== 'object') throw new BadInput('link must be an object or null')
  const o = v as { kind?: unknown; refId?: unknown }
  if (typeof o.kind !== 'string' || !LINK_KINDS.includes(o.kind as LinkKind)) {
    throw new BadInput(`link.kind must be one of ${LINK_KINDS.join(', ')}`)
  }
  if (typeof o.refId !== 'string' || o.refId.length === 0) {
    throw new BadInput('link.refId must be a non-empty string')
  }
  const known =
    o.kind === 'book'
      ? CATALOG.bookById.has(o.refId)
      : o.kind === 'chapter'
        ? CATALOG.chapterByKey.has(o.refId)
        : CATALOG.lessonById.has(o.refId)
  if (!known) throw new BadInput(`unknown ${o.kind} link refId: ${o.refId}`)
  return { linkKind: o.kind as LinkKind, linkRef: o.refId }
}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

export async function getFocusOverview(userId: string): Promise<FocusOverviewResponse> {
  const [taskRows, sessionRows] = await Promise.all([
    db.focusTask.findMany({ where: { userId } }),
    db.focusSession.findMany({
      where: { userId, startedAt: { gte: new Date(Date.now() - SESSION_WINDOW_DAYS * 86_400_000) } },
      orderBy: { startedAt: 'desc' },
    }),
  ])

  const views = taskRows.map(toTaskView)
  const open = orderTasks(views, Date.now())
  const done = views
    .filter((t) => t.status !== 'open')
    .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt))
    .slice(0, 100)

  return { tasks: [...open, ...done], sessions: sessionRows.map(toSessionRow), generatedAt: new Date().toISOString() }
}

function toSessionRow(row: {
  id: string
  taskId: string | null
  kind: string
  plannedSecs: number
  actualSecs: number
  outcome: string
  startedAt: Date
  endedAt: Date
}): SessionRow {
  return {
    id: row.id,
    taskId: row.taskId,
    kind: (row.kind === 'focus' || row.kind === 'short' || row.kind === 'long' ? row.kind : 'focus') as Phase,
    plannedSecs: row.plannedSecs,
    actualSecs: row.actualSecs,
    outcome: row.outcome === 'complete' ? 'complete' : 'stopped',
    startedAt: row.startedAt.toISOString(),
    endedAt: row.endedAt.toISOString(),
  }
}

/* ------------------------------------------------------------------ */
/* Task writes                                                         */
/* ------------------------------------------------------------------ */

export async function createTask(userId: string, req: CreateTaskRequest): Promise<TaskView> {
  const title = validTitle(req.title)
  const notes = validNotes(req.notes)
  const link = validLink(req.link)
  const priority = validPriority(req.priority)
  const estimate = validEstimate(req.estimate)
  const dueDate = validDueDate(req.dueDate)

  const row = await db.focusTask.create({
    data: {
      userId,
      title,
      notes,
      linkKind: link?.linkKind ?? null,
      linkRef: link?.linkRef ?? null,
      priority,
      estimate,
      dueDate: dueDate ? dayToDate(dueDate) : null,
    },
  })
  return toTaskView(row)
}

export async function updateTask(userId: string, req: UpdateTaskRequest): Promise<TaskView> {
  if (typeof req.id !== 'string' || req.id.length === 0) throw new BadInput('id is required')
  const existing = await db.focusTask.findFirst({ where: { id: req.id, userId } })
  if (!existing) throw new BadInput('task not found')

  const data: Record<string, unknown> = {}
  if (req.title !== undefined) data.title = validTitle(req.title)
  if (req.notes !== undefined) data.notes = validNotes(req.notes)
  if (req.link !== undefined) {
    const link = validLink(req.link)
    data.linkKind = link?.linkKind ?? null
    data.linkRef = link?.linkRef ?? null
  }
  if (req.priority !== undefined) data.priority = validPriority(req.priority)
  if (req.estimate !== undefined) data.estimate = validEstimate(req.estimate)
  if (req.dueDate !== undefined) {
    const dueDate = validDueDate(req.dueDate)
    data.dueDate = dueDate ? dayToDate(dueDate) : null
  }
  if (req.status !== undefined) {
    if (typeof req.status !== 'string' || !STATUSES.includes(req.status as TaskStatus)) {
      throw new BadInput(`status must be one of ${STATUSES.join(', ')}`)
    }
    data.status = req.status
    data.completedAt = req.status === 'done' ? (existing.completedAt ?? new Date()) : null
  }

  const row = await db.focusTask.update({ where: { id: existing.id }, data })
  return toTaskView(row)
}

export async function deleteTask(userId: string, id: string): Promise<void> {
  if (typeof id !== 'string' || id.length === 0) throw new BadInput('id is required')
  const existing = await db.focusTask.findFirst({ where: { id, userId } })
  if (!existing) throw new BadInput('task not found')
  await db.focusSession.deleteMany({ where: { taskId: existing.id } })
  await db.focusTask.delete({ where: { id: existing.id } })
}

function dayToDate(day: string): Date {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0)
}

/* ------------------------------------------------------------------ */
/* Session writes + the ledger bridge                                  */
/* ------------------------------------------------------------------ */

export async function logSession(
  userId: string,
  req: LogSessionRequest,
): Promise<{ task: TaskView | null; ledger: { logged: boolean; label: string | null } }> {
  if (req.kind !== 'focus' && req.kind !== 'short' && req.kind !== 'long') {
    throw new BadInput('kind must be focus, short or long')
  }
  if (req.outcome !== 'complete' && req.outcome !== 'stopped') {
    throw new BadInput('outcome must be complete or stopped')
  }
  if (!Number.isInteger(req.plannedSecs) || req.plannedSecs < 60 || req.plannedSecs > 7200) {
    throw new BadInput('plannedSecs must be an integer 60..7200')
  }
  if (!Number.isInteger(req.actualSecs) || req.actualSecs < 0 || req.actualSecs > 86400) {
    throw new BadInput('actualSecs must be an integer 0..86400')
  }
  const startedAt = new Date(req.startedAt)
  const endedAt = new Date(req.endedAt)
  if (Number.isNaN(startedAt.getTime()) || Number.isNaN(endedAt.getTime())) {
    throw new BadInput('startedAt/endedAt must be epoch milliseconds')
  }
  if (endedAt.getTime() < startedAt.getTime() || endedAt.getTime() - startedAt.getTime() > 86_400_000) {
    throw new BadInput('endedAt must be after startedAt, within one day')
  }
  if (req.actualSecs > 0 && Math.abs(endedAt.getTime() - startedAt.getTime()) < (req.actualSecs - 60) * 1000) {
    throw new BadInput('actualSecs cannot exceed the wall-clock window')
  }

  let taskRow: TaskRow | null = null
  if (req.taskId !== null && req.taskId !== undefined) {
    if (typeof req.taskId !== 'string' || req.taskId.length === 0) throw new BadInput('taskId must be a string or null')
    taskRow = await db.focusTask.findFirst({ where: { id: req.taskId, userId } })
    if (!taskRow) throw new BadInput('task not found')
  }

  await db.focusSession.create({
    data: {
      userId,
      taskId: taskRow?.id ?? null,
      kind: req.kind,
      plannedSecs: req.plannedSecs,
      actualSecs: req.actualSecs,
      outcome: req.outcome,
      startedAt,
      endedAt,
    },
  })

  let updated: TaskRow | null = taskRow
  if (taskRow && req.kind === 'focus') {
    updated = await db.focusTask.update({
      where: { id: taskRow.id },
      data: {
        pomos: req.outcome === 'complete' ? taskRow.pomos + 1 : taskRow.pomos,
        focusSecs: taskRow.focusSecs + req.actualSecs,
      },
    })
  }

  /* the ledger bridge: a COMPLETED focus bell on a linked chapter/lesson
   * writes a study pass into the same revision ledger (kind 'focus'). */
  let ledger = { logged: false, label: null as string | null }
  if (
    updated &&
    req.kind === 'focus' &&
    req.outcome === 'complete' &&
    (updated.linkKind === 'chapter' || updated.linkKind === 'lesson')
  ) {
    try {
      const link = resolveLink(updated.linkKind, updated.linkRef)
      const scope = updated.linkKind === 'chapter' ? 'chapter' : 'lesson'
      const results = await markStudy(userId, {
        items: [{ scope, refId: updated.linkRef as string }],
        action: 'revise',
        kind: 'focus',
        secs: req.actualSecs,
      })
      const ok = results[0]?.ok ?? false
      ledger = { logged: ok, label: ok ? (link?.label ?? null) : null }
    } catch {
      ledger = { logged: false, label: null }
    }
  }

  return { task: updated ? toTaskView(updated) : null, ledger }
}
