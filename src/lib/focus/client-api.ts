/**
 * Focus — typed client fetch helpers.
 *
 * Every call is relative-path (gateway-safe), JSON, and fails soft with
 * `null` so the hub can guard without try/catch noise.
 */
import type {
  CreateTaskRequest,
  FocusOverviewResponse,
  LogSessionRequest,
  LogSessionResponse,
  TaskView,
  UpdateTaskRequest,
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

export function fetchFocusOverview(): Promise<FocusOverviewResponse | null> {
  return jsonFetch<FocusOverviewResponse>('/api/focus/overview')
}

export function createFocusTask(req: CreateTaskRequest): Promise<TaskView | null> {
  return jsonFetch<TaskView>('/api/focus/task', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
  })
}

export function updateFocusTask(req: UpdateTaskRequest): Promise<TaskView | null> {
  return jsonFetch<TaskView>('/api/focus/task', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
  })
}

export async function deleteFocusTask(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/focus/task?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    return res.ok
  } catch {
    return false
  }
}

export function logFocusSession(req: LogSessionRequest): Promise<LogSessionResponse | null> {
  return jsonFetch<LogSessionResponse>('/api/focus/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
  })
}
