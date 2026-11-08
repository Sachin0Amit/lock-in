import { NextResponse } from 'next/server'
import { resolveUser, serverError } from '@/lib/auth'
import { listAttempts } from '@/lib/practice/practice-service'

/**
 * GET /api/practice/attempts — the signed-in (or local) learner's recent
 * practice runs: exams and drills with honest derived scores.
 */
export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)
    const attempts = await listAttempts(user.id)
    return NextResponse.json({ attempts })
  } catch (err) {
    return serverError(err)
  }
}
