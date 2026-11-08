import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, reviewMistake } from '@/lib/practice/mistake-service'

/**
 * POST /api/mistakes/review — grade one review of a mistake card
 * (quality 1..5: Again/Hard/Good/Easy). The same SM-2-lite schedule as
 * the study ledger moves the card; two consecutive good reviews retire
 * it (resolvedAt is set).
 */
export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as { id?: string; quality?: number } | null
    if (!body || typeof body.id !== 'string' || typeof body.quality !== 'number') {
      return badRequest('id and quality are required')
    }
    const out = await reviewMistake(user.id, body.id, body.quality)
    return NextResponse.json(out)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
