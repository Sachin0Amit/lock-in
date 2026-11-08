/**
 * Practice — typed client fetch helpers.
 *
 * Every call is relative-path (gateway-safe), JSON, and fails soft with
 * `null` so surfaces can degrade honestly — same contract as the
 * revision client-api.
 */
import type {
  AnswerOutcome,
  AttemptsResponse,
  MistakesResponse,
  MistakeView,
  PaperResponse,
  ReadinessResponse,
  RecordMistakeRequest,
  SubmitRequest,
  SubmitResponse,
} from './types'

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store', ...init })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export function fetchReadiness(): Promise<ReadinessResponse | null> {
  return jsonFetch<ReadinessResponse>('/api/practice/readiness')
}

export function fetchAttempts(): Promise<AttemptsResponse | null> {
  return jsonFetch<AttemptsResponse>('/api/practice/attempts')
}

export function fetchMistakes(): Promise<MistakesResponse | null> {
  return jsonFetch<MistakesResponse>('/api/mistakes')
}

export function startExamPaper(presetKey: string): Promise<PaperResponse | null> {
  return jsonFetch<PaperResponse>('/api/practice/paper', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ presetKey }),
  })
}

export function startDrillPaper(opts: {
  focus: 'auto' | 'book' | 'library'
  bookId?: string
  count?: number
}): Promise<PaperResponse | null> {
  return jsonFetch<PaperResponse>('/api/practice/paper', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ drill: opts }),
  })
}

export async function submitPractice(req: SubmitRequest): Promise<SubmitResponse | null> {
  const res = await fetch('/api/practice/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
    cache: 'no-store',
  }).catch(() => null)
  if (!res || !res.ok) return null
  return (await res.json().catch(() => null)) as SubmitResponse | null
}

/** fire-and-forget outcome report from reader quiz/exercise blocks */
export function reportMistakeOutcome(req: RecordMistakeRequest): void {
  void fetch('/api/mistakes', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
    cache: 'no-store',
  }).catch(() => undefined)
}

export async function reviewMistake(
  id: string,
  quality: number,
): Promise<{ ok: boolean; mistake?: MistakeView; resolved: boolean } | null> {
  const res = await fetch('/api/mistakes/review', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, quality }),
    cache: 'no-store',
  }).catch(() => null)
  if (!res || !res.ok) return null
  return (await res.json().catch(() => null)) as
    | { ok: boolean; mistake?: MistakeView; resolved: boolean }
    | null
}

export type { AnswerOutcome }
