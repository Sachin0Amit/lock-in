/**
 * Focus — shared contracts (isomorphic).
 *
 * The Focus Hub (/focus) is the study to-do × pomodoro surface (owner chat
 * directive 2026-11-18): tasks carry pomodoro estimates and an optional
 * canonical library link (book · chapter · lesson — catalog keys only),
 * the timer logs every finished session against its task, and a completed
 * focus session on a linked topic also writes a study pass into the SAME
 * revision ledger (kind 'focus', honest engagement seconds).
 *
 * The engine in focus-engine.ts is PURE: the verify script and the client
 * compute every number you see on the page from the same functions.
 */
export type Phase = 'focus' | 'short' | 'long'

export type Priority = 'low' | 'normal' | 'high'

export type TaskStatus = 'open' | 'done' | 'dropped'

export type SessionOutcome = 'complete' | 'stopped'

export type LinkKind = 'book' | 'chapter' | 'lesson'

export const PRIORITIES: Priority[] = ['low', 'normal', 'high']

/** Pomodoro settings (persisted per device; bounds enforced by clampSettings). */
export interface FocusSettings {
  focusMin: number
  shortMin: number
  longMin: number
  /** long break after every Nth completed focus session (2..8) */
  longEvery: number
  autoStartBreaks: boolean
  autoStartFocus: boolean
  sound: boolean
  notify: boolean
}

/** The task's deep-link target, resolved against the live catalog (server). */
export interface TaskLinkView {
  kind: LinkKind
  /** book → bookId · chapter → `${bookId}:${n}` · lesson → lesson id */
  refId: string
  /** "Foundation Mathematics · Ch 1 · 1.2 Comparing & Ordering Numbers" */
  label: string
  /** "1.2 Comparing & Ordering Numbers" (chapter: "Ch 1 · Numbers…") */
  shortLabel: string
  bookTitle: string
  url: string
}

export interface TaskView {
  id: string
  title: string
  notes: string | null
  link: TaskLinkView | null
  priority: Priority
  /** planned pomodoros */
  estimate: number
  /** completed focus sessions logged against this task */
  pomos: number
  /** total honest focus seconds logged against this task */
  focusSecs: number
  status: TaskStatus
  /** YYYY-MM-DD or null */
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}

/** One logged timer session (raw row — the client engine does all maths). */
export interface SessionRow {
  id: string
  taskId: string | null
  kind: Phase
  plannedSecs: number
  actualSecs: number
  outcome: SessionOutcome
  startedAt: string
  endedAt: string
}

export interface DayStat {
  /** YYYY-MM-DD */
  date: string
  /** honest focus minutes (complete + stopped sessions) */
  focusMins: number
  /** completed focus sessions (the bell rang) */
  pomos: number
}

export interface FocusStats {
  today: {
    focusMins: number
    pomos: number
    breakMins: number
    tasksDone: number
  }
  /** last 7 days incl. today, oldest first */
  week: DayStat[]
  /** consecutive days with ≥1 focus session, ending today or yesterday */
  streakDays: number
  allTime: {
    focusSecs: number
    focusSessions: number
    tasksDone: number
    avgFocusMins: number
    bestDayMins: number
    bestDayDate: string | null
    longestSessionMins: number
  }
  topTasks: { id: string; title: string; pomos: number; focusMins: number; status: TaskStatus }[]
}

export type InsightTone = 'info' | 'nudge' | 'praise'

export interface FocusInsight {
  /** stable rule id: 'overdue' | 'cold-start' | 'over-estimate' | 'streak' | 'empty-plan' | 'all-done' */
  id: string
  tone: InsightTone
  text: string
}

export interface FocusOverviewResponse {
  /** every task, open + done (status distinguishes; open come ordered by the engine) */
  tasks: TaskView[]
  /** raw sessions of the last 60 days (stats are computed client-side,
   * so "today" honours the learner's timezone, not the server's) */
  sessions: SessionRow[]
  generatedAt: string
}

/* ------------------------------------------------------------------ */
/* Write contracts (POST/PATCH bodies)                                 */
/* ------------------------------------------------------------------ */

export interface TaskLinkInput {
  kind: LinkKind
  refId: string
}

export interface CreateTaskRequest {
  title: string
  notes?: string | null
  link?: TaskLinkInput | null
  priority?: Priority
  estimate?: number
  /** YYYY-MM-DD */
  dueDate?: string | null
}

export interface UpdateTaskRequest {
  id: string
  title?: string
  notes?: string | null
  /** null clears the link */
  link?: TaskLinkInput | null
  priority?: Priority
  estimate?: number
  /** YYYY-MM-DD; null clears */
  dueDate?: string | null
  status?: TaskStatus
}

export interface LogSessionRequest {
  taskId: string | null
  kind: Phase
  plannedSecs: number
  actualSecs: number
  outcome: SessionOutcome
  /** epoch ms — logged honestly from the client's wall clock */
  startedAt: number
  endedAt: number
}

export interface LogSessionResponse {
  ok: true
  /** the updated task row (pomos/focusSecs moved) when the session had one */
  task: TaskView | null
  /** the ledger study pass: written when a COMPLETED focus session focused a
   * linked topic — the Revision Hub and Progress engine both see it */
  ledger: { logged: boolean; label: string | null }
}
