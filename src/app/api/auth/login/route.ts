import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { applySessionCookie, createSession, verifyPassword } from '@/lib/auth'

export const runtime = 'nodejs'

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(1).max(72),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please provide your email and password.' }, { status: 400 })
    }
    const { email, password } = parsed.data

    const user = await db.user.findUnique({ where: { email } })
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const session = await createSession(user.id)
    const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
    applySessionCookie(res, session.token, session.expiresAt)
    return res
  } catch (err) {
    const { serverError } = await import('@/lib/auth')
    return serverError(err)
  }
}
