import { NextResponse } from 'next/server'
import { badRequest, getSessionUser, unauthorized, serverError } from '@/lib/auth'
import { getEntry } from '@/lib/revision/ledger-service'

/**
 * GET /api/revision/entry?scope=chapter|lesson&refId=… — one ledger entry
 * with resolved metadata (or `null` when the item is unstudied). Used by
 * the lesson reader to show the scheduled revision date.
 */
export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()

    const url = new URL(req.url)
    const scope = url.searchParams.get('scope')
    const refId = url.searchParams.get('refId')
    if ((scope !== 'chapter' && scope !== 'lesson') || !refId) {
      return badRequest('scope (chapter|lesson) and refId are required')
    }

    const entry = await getEntry(user.id, scope, refId)
    return NextResponse.json({ entry })
  } catch (err) {
    return serverError(err)
  }
}
