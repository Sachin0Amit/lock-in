import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { badRequest, getSessionUser, notFound, serverError, unauthorized } from '@/lib/auth'
import { bookRecordIds } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

const addSchema = z.object({ recordId: z.string().min(1).max(200) })

/** List bookmarks of a custom book. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const rows = await db.customBookBookmark.findMany({
      where: { customBookId: bookId, userId: user.id },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ bookmarks: rows.map((r) => ({ recordId: r.sourceLibraryRecordId, createdAt: r.createdAt.toISOString() })) })
  } catch (err) {
    return serverError(err)
  }
}

/** Add a bookmark for one record inside the book. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const body = await req.json().catch(() => null)
    const parsed = addSchema.safeParse(body)
    if (!parsed.success) return badRequest('Please provide a recordId.')

    const memberIds = await bookRecordIds(user.id, bookId)
    if (!memberIds) return notFound('Custom book not found.')
    if (!memberIds.has(parsed.data.recordId)) {
      return badRequest('Only topics included in this custom book can be bookmarked.')
    }

    const existing = await db.customBookBookmark.findUnique({
      where: {
        userId_customBookId_sourceLibraryRecordId: {
          userId: user.id,
          customBookId: bookId,
          sourceLibraryRecordId: parsed.data.recordId,
        },
      },
    })
    if (existing) return NextResponse.json({ ok: true, alreadyBookmarked: true })

    await db.customBookBookmark.create({
      data: {
        userId: user.id,
        customBookId: bookId,
        sourceLibraryRecordId: parsed.data.recordId,
      },
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    return serverError(err)
  }
}

/** Remove a bookmark (?recordId=…). */
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const recordId = req.nextUrl.searchParams.get('recordId')
    if (!recordId) return badRequest('Please provide a recordId.')
    await db.customBookBookmark.deleteMany({
      where: { customBookId: bookId, userId: user.id, sourceLibraryRecordId: recordId },
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return serverError(err)
  }
}
