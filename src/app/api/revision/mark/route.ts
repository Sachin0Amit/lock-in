import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, markStudy } from '@/lib/revision/ledger-service'
import type { MarkRequest } from '@/lib/revision/types'

/**
 * POST /api/revision/mark — the single write endpoint of the study ledger.
 *
 * Body: { items: [{ scope: 'chapter'|'lesson', refId }], action:
 * 'study' | 'revise' | 'unmark' | 'quiz', quality?, secs?, kind? }
 *
 * Idempotent by design: 'study' on an existing entry is a no-op, 'unmark'
 * on a missing row succeeds, and every item is answered individually.
 */
export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)

    const body = (await req.json().catch(() => null)) as MarkRequest | null
    if (!body) return badRequest('Invalid JSON body')

    const results = await markStudy(user.id, body)
    return NextResponse.json({ results })
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
