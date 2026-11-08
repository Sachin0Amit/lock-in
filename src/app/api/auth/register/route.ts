import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { applySessionCookie, badRequest, createSession, hashPassword, serverError } from '@/lib/auth'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(8).max(72),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return badRequest('Please provide a name, a valid email and a password of at least 8 characters.')
    }
    const { name, email, password } = parsed.data

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const user = await db.user.create({
      data: { name, email, passwordHash: hashPassword(password) },
    })
    const session = await createSession(user.id)
    const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
    applySessionCookie(res, session.token, session.expiresAt)
    return res
  } catch (err) {
    return serverError(err)
  }
}
