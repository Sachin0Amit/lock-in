import { NextResponse } from 'next/server'
import { getSessionUser, unauthorized, serverError } from '@/lib/auth'
import { getGraph } from '@/lib/revision/ledger-service'

/**
 * GET /api/revision/graph — the knowledge graph: library structure
 * (lesson nodes, prerequisite / sequence / concept-bridge edges) with the
 * user's mastery overlay from the study ledger.
 */
export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()

    const graph = await getGraph(user.id)
    return NextResponse.json(graph)
  } catch (err) {
    return serverError(err)
  }
}
