import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, listMistakes, recordMistake } from '@/lib/practice/mistake-service'

/**
 * GET /api/mistakes — the Mistake Bank: due cards, upcoming cards and a
 * resolved tail, with honest stats. POST records one outcome ('wrong'
 * creates/re-opens a card, 'correct' retires one) — used by the reader's
 * quiz and exercise blocks and by the drill runner.
 */
export async function GET(req: Request) {
  try {
    const user = await resolveUser(req)
    const data = await listMistakes(user.id)
    return NextResponse.json(data)
  } catch (err) {
    return serverError(err)
  }
}

export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as
      | {
          source?: string
          lessonId?: string
          questionKey?: string
          prompt?: string
          given?: string
          expected?: string
          explain?: string
          outcome?: string
        }
      | null
    if (!body || typeof body.source !== 'string' || typeof body.lessonId !== 'string') {
      return badRequest('source and lessonId are required')
    }
    const out = await recordMistake(user.id, {
      source: body.source as 'quiz' | 'exercise',
      lessonId: body.lessonId,
      questionKey: body.questionKey ?? '',
      prompt: body.prompt ?? '',
      given: body.given ?? '',
      expected: body.expected ?? '',
      explain: body.explain,
      outcome: body.outcome === 'correct' ? 'correct' : 'wrong',
    })
    return NextResponse.json(out)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
