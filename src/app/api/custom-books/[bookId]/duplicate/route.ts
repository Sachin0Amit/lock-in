import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, notFound, serverError, unauthorized } from '@/lib/auth'
import { duplicateCustomBook } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

/** Duplicate a custom book's structure (and its coverage report). */
export async function POST(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const result = await duplicateCustomBook(user.id, bookId)
    if ('status' in result) {
      return NextResponse.json({ error: result.message }, { status: result.status })
    }
    return NextResponse.json({ id: result.id }, { status: 201 })
  } catch (err) {
    return serverError(err)
  }
}
