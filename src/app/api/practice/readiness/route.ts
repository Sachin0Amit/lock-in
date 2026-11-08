import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, getReadiness } from '@/lib/practice/practice-service'

/**
 * GET /api/practice/readiness — the readiness read model: per-book and
 * per-exam-preset readiness (coverage × mastery × freshness) plus the
 * preset catalogue. Open to everyone (local learner when signed out).
 */
export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)
    const data = await getReadiness(user.id)
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
