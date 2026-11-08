import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, submitAttempt } from '@/lib/practice/practice-service'

/**
 * POST /api/practice/submit — grade a finished paper server-side (the
 * authoritative score), persist the attempt, send wrong answers to the
 * Mistake Bank and per-lesson quality signals to the study ledger, and
 * return the per-question results + per-chapter weakness breakdown.
 */
export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as Parameters<
      typeof submitAttempt
    >[1] | null
    if (!body) return badRequest('JSON body required')
    const out = await submitAttempt(user.id, body)
    return NextResponse.json(out)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
