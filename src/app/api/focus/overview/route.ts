import { NextResponse } from 'next/server'
import { resolveUser, serverError } from '@/lib/auth'
import { getFocusOverview } from '@/lib/focus/focus-service'

/**
 * GET /api/focus/overview — the Focus Hub payload (owner chat directive
 * 2026-11-18): every to-do task with its catalog-resolved deep link plus
 * the raw session log of the last 60 days (stats are computed client-side
 * by the pure engine, so "today" honours the learner's timezone).
 */
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)
    const overview = await getFocusOverview(user.id)
    return NextResponse.json(overview)
  } catch (err) {
    return serverError(err)
  }
}
