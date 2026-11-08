import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { buildDrillPaper, buildExamPaper, BadInput } from '@/lib/practice/practice-service'

/**
 * POST /api/practice/paper — generate a deterministic practice paper.
 * Body: { presetKey } for a mock exam, or
 *       { drill: { focus: 'auto' | 'book' | 'library', bookId?, count?, seed? } }
 * 'auto' drills read the study ledger server-side and target the weakest
 * chapters. Answers travel with the paper (self-study app, same trust
 * model as reader quizzes); the SUBMIT endpoint re-grades server-side
 * and stores the authoritative score.
 */
export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as
      | {
          presetKey?: string
          seed?: number
          drill?: { focus?: string; bookId?: string; count?: number; seed?: number }
        }
      | null
    if (!body) return badRequest('JSON body required')

    if (typeof body.presetKey === 'string') {
      const out = await buildExamPaper(undefined, body.presetKey, body.seed)
      return NextResponse.json(out)
    }
    if (body.drill && typeof body.drill === 'object') {
      const focus = body.drill.focus
      if (focus !== 'auto' && focus !== 'book' && focus !== 'library') {
        return badRequest('drill.focus must be auto|book|library')
      }
      const out = await buildDrillPaper(user.id, {
        focus,
        bookId: typeof body.drill.bookId === 'string' ? body.drill.bookId : undefined,
        count: typeof body.drill.count === 'number' ? body.drill.count : undefined,
        seed: typeof body.drill.seed === 'number' ? body.drill.seed : undefined,
      })
      return NextResponse.json(out)
    }
    return badRequest('presetKey or drill required')
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
