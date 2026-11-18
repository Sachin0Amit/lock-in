import { NextResponse } from 'next/server'
import { resolveUser, serverError } from '@/lib/auth'
import { getProgress } from '@/lib/revision/progress-service'

/**
 * GET /api/revision/progress — the Progress tab payload (owner directive
 * 2026-11-18): coverage census, quiz stats ("questions understood"),
 * per-book completion standing, the stored topic list with revision
 * counts, and the engine's prioritised recommendations.
 */
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)
    const progress = await getProgress(user.id)
    return NextResponse.json(progress)
  } catch (err) {
    return serverError(err)
  }
}
