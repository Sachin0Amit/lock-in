import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, logSession } from '@/lib/focus/focus-service'
import type { LogSessionRequest } from '@/lib/focus/types'

/**
 * POST /api/focus/session — the pomodoro log endpoint.
 *
 * Body: { taskId | null, kind: 'focus'|'short'|'long', plannedSecs,
 * actualSecs, outcome: 'complete'|'stopped', startedAt, endedAt }.
 *
 * A COMPLETED focus bell on a task linked to a chapter/lesson also writes
 * a study pass into the same revision ledger (kind 'focus', honest
 * engagement seconds) — the Revision Hub and Progress engine both see it.
 */
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as LogSessionRequest | null
    if (!body) return badRequest('Invalid JSON body')
    const { task, ledger } = await logSession(user.id, body)
    return NextResponse.json({ ok: true, task, ledger })
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
