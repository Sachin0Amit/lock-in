import { NextResponse } from 'next/server'
import { getSessionUser, unauthorized, serverError } from '@/lib/auth'
import { getOverview, getSummaryCompact } from '@/lib/revision/ledger-service'

/**
 * GET /api/revision/overview — the full Revision Hub dashboard payload.
 * `?summary=1` returns only the compact counts (header badge).
 */
export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()

    const url = new URL(req.url)
    if (url.searchParams.get('summary') === '1') {
      const summary = await getSummaryCompact(user.id)
      return NextResponse.json(summary)
    }

    const overview = await getOverview(user.id)
    return NextResponse.json(overview)
  } catch (err) {
    return serverError(err)
  }
}
