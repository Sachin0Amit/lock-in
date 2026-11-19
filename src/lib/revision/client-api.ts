/**
 * Revision & Mastery — typed client fetch helpers.
 *
 * Every call is relative-path (gateway-safe), JSON, and fails soft with
 * `null` so anonymous surfaces can call without guarding.
 */
import type {
  GraphResponse,
  MarkItemResult,
  MarkRequest,
  OverviewResponse,
  ProgressResponse,
  RecallDeck,
  RevisionSummaryCompact,
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

export function fetchOverview(): Promise<OverviewResponse | null> {
  return jsonFetch<OverviewResponse>('/api/revision/overview')
}

export function fetchSummary(): Promise<RevisionSummaryCompact | null> {
  return jsonFetch<RevisionSummaryCompact>('/api/revision/overview?summary=1')
}

export function fetchGraph(): Promise<GraphResponse | null> {
  return jsonFetch<GraphResponse>('/api/revision/graph')
}

/** Retrieval-practice deck for one queue item (null → honest self-rating fallback). */
export function fetchRecallDeck(
  scope: 'chapter' | 'lesson',
  refId: string,
): Promise<RecallDeck | null> {
  return jsonFetch<{ deck: RecallDeck | null }>(
    `/api/revision/recall?scope=${scope}&refId=${encodeURIComponent(refId)}`,
  ).then((r) => r?.deck ?? null)
}

export function fetchProgress(): Promise<ProgressResponse | null> {
  return jsonFetch<ProgressResponse>('/api/revision/progress')
}

export async function markStudy(req: MarkRequest): Promise<MarkItemResult[] | null> {
  const res = await fetch('/api/revision/mark', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
    cache: 'no-store',
  }).catch(() => null)
  if (!res || !res.ok) return null
  const data = (await res.json().catch(() => null)) as { results?: MarkItemResult[] } | null
  return data?.results ?? null
}
