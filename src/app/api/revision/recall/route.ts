import { NextResponse } from 'next/server'
import { resolveUser, serverError } from '@/lib/auth'
import { CATALOG } from '@/lib/builder/catalog'
import { buildRecallDeck } from '@/lib/revision/recall-engine'

/**
 * GET /api/revision/recall?scope=chapter|lesson&refId=… — the retrieval-
 * practice deck for one queue item. Cards are cut verbatim from the
 * lesson's own authored blocks (see recall-engine). Unknown scope/refId
 * → 400/404 with `deck: null` so the session can fall back to honest
 * self-rating instead of dying.
 */
export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)

    const url = new URL(req.url)
    const scope = url.searchParams.get('scope') ?? ''
    const refId = url.searchParams.get('refId') ?? ''
    if (refId.length === 0) {
      return NextResponse.json({ error: 'refId is required', deck: null }, { status: 400 })
    }
    if (scope !== 'chapter' && scope !== 'lesson') {
      return NextResponse.json(
        { error: 'scope must be chapter or lesson', deck: null },
        { status: 400 },
      )
    }
    const known =
      scope === 'chapter' ? CATALOG.chapterByKey.has(refId) : CATALOG.lessonById.has(refId)
    if (!known) {
      return NextResponse.json(
        { error: `unknown ${scope} refId: ${refId}`, deck: null },
        { status: 404 },
      )
    }

    /* the ledger id is not needed to BUILD a deck, but resolving the user
     * keeps the route honest about who is asking (and primes the guest
     * identity exactly like every other revision route) */
    void user
    const deck = buildRecallDeck(scope, refId)
    return NextResponse.json({ deck })
  } catch (err) {
    return serverError(err)
  }
}
