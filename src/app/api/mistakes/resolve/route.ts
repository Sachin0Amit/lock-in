import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, setMistakeResolved } from '@/lib/practice/mistake-service'

/**
 * POST /api/mistakes/resolve — manually retire ({ resolved: true }) or
 * reopen ({ resolved: false }) a mistake card. Reopening resets the
 * card's schedule honestly (passes 0, due now).
 */
export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as
      | { id?: string; resolved?: boolean }
      | null
    if (!body || typeof body.id !== 'string' || typeof body.resolved !== 'boolean') {
      return badRequest('id and resolved are required')
    }
    const mistake = await setMistakeResolved(user.id, body.id, body.resolved)
    return NextResponse.json({ ok: true, mistake })
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
