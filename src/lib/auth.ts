/**
 * Custom Book Builder — accounts & sessions.
 *
 * Lightweight credentials auth on top of Prisma/SQLite: scrypt password
 * hashing (node:crypto, no extra dependency) + opaque session tokens in an
 * httpOnly cookie.
 *
 * Signing in is OPTIONAL everywhere: the Revision Hub, the Custom Book
 * Builder and My Custom Books work fully without an account. Requests
 * without a session fall back to one stable local learner identity
 * (see resolveUser) — the account system only exists for cross-device
 * continuity and remains reachable at /signin by direct URL.
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const SESSION_COOKIE = 'lockin-session'
const SESSION_DAYS = 30

/* ------------------------------------------------------------------ */
/* Passwords                                                           */
/* ------------------------------------------------------------------ */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const candidate = scryptSync(password, salt, 64)
  const expected = Buffer.from(hash, 'hex')
  return candidate.length === expected.length && timingSafeEqual(candidate, expected)
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */

export interface AuthUser {
  id: string
  email: string
  name: string
}

function readSessionToken(req: Request): string | null {
  const header = req.headers.get('cookie') ?? ''
  for (const part of header.split(';')) {
    const trimmed = part.trim()
    if (trimmed.startsWith(`${SESSION_COOKIE}=`)) {
      return decodeURIComponent(trimmed.slice(SESSION_COOKIE.length + 1))
    }
  }
  return null
}

export async function getSessionUser(req: Request): Promise<AuthUser | null> {
  const token = readSessionToken(req)
  if (!token) return null
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  })
  if (!session || session.expiresAt.getTime() < Date.now()) return null
  return { id: session.user.id, email: session.user.email, name: session.user.name }
}

export async function createSession(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 3600 * 1000)
  await db.session.create({ data: { token, userId, expiresAt } })
  return { token, expiresAt }
}

export async function destroySession(req: Request): Promise<void> {
  const token = readSessionToken(req)
  if (token) {
    await db.session.deleteMany({ where: { token } }).catch(() => undefined)
  }
}

/* ------------------------------------------------------------------ */
/* The local learner — no account required                             */
/* ------------------------------------------------------------------ */

const LOCAL_EMAIL = 'local@lockin.library'

/**
 * One stable, lazily-created identity for everyone who never signs in.
 * Revision tracking and custom books are fully open without an account;
 * their data is simply scoped to this user. A valid signed-in session
 * always wins while its cookie lasts.
 */
export async function getLocalUser(): Promise<AuthUser> {
  const user = await db.user.upsert({
    where: { email: LOCAL_EMAIL },
    update: {},
    create: { email: LOCAL_EMAIL, name: 'Local learner', passwordHash: '' },
  })
  return { id: user.id, email: user.email, name: user.name }
}

/**
 * Resolve the acting user for a data route: the session user when a valid
 * session cookie is present, otherwise the local learner. Never returns
 * null — the Revision Hub, the Builder and My Custom Books have no
 * sign-in wall.
 */
export async function resolveUser(req: Request): Promise<AuthUser> {
  return (await getSessionUser(req)) ?? getLocalUser()
}

export function applySessionCookie(res: NextResponse, token: string, expiresAt: Date): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
}

/* ------------------------------------------------------------------ */
/* Route-handler helpers                                               */
/* ------------------------------------------------------------------ */

export function unauthorized(message = 'Sign in required'): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function badRequest(message: string, extra?: Record<string, unknown>): NextResponse {
  return NextResponse.json({ error: message, ...extra }, { status: 400 })
}

export function notFound(message = 'Not found'): NextResponse {
  return NextResponse.json({ error: message }, { status: 404 })
}

export function forbidden(message = 'Not allowed'): NextResponse {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function serverError(err: unknown): NextResponse {
  console.error('[custom-book-builder]', err)
  return NextResponse.json({ error: 'Something went wrong on our side.' }, { status: 500 })
}
