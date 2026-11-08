import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, notFound, serverError, unauthorized } from '@/lib/auth'
import {
  deleteCustomBook,
  getCustomBookForUser,
  updateCustomBook,
} from '@/lib/builder/books-service'

export const runtime = 'nodejs'

/** Full detail of one custom book (structure, coverage, progress, notes…). */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(_req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const book = await getCustomBookForUser(user.id, bookId)
    if (!book) return notFound('Custom book not found.')
    return NextResponse.json({ book })
  } catch (err) {
    return serverError(err)
  }
}

/** Update metadata, status and/or the curated structure. */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const body = await req.json().catch(() => null)
    const result = await updateCustomBook(user.id, bookId, {
      title: body?.title,
      description: body?.description,
      status: body?.status,
      toc: body?.toc,
      coverage: body?.coverage,
    })
    if ('status' in result) {
      return NextResponse.json({ error: result.message, ...result.extra }, { status: result.status })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return serverError(err)
  }
}

/** Delete a custom book. Never deletes Main Library content. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(_req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const deleted = await deleteCustomBook(user.id, bookId)
    if (!deleted) return notFound('Custom book not found.')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return serverError(err)
  }
}
