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
