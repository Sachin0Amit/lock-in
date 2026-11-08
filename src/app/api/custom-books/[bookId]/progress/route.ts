import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSessionUser, notFound, serverError, unauthorized } from '@/lib/auth'
import { bookRecordIds } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

const putSchema = z.object({
  lastReadRecordId: z.string().max(200).nullable().optional(),
  completedRecordIds: z.array(z.string().max(200)).max(5000).optional(),
})

async function currentState(userId: string, bookId: string) {
  const row = await db.customBookProgress.findUnique({
    where: { userId_customBookId: { userId, customBookId: bookId } },
  })
  let completed: string[] = []
  if (row) {
    try {
      completed = JSON.parse(row.completedRecordIds)
    } catch {
      completed = []
    }
  }
  return {
    lastReadRecordId: row?.lastReadRecordId ?? null,
    completedRecordIds: completed,
    updatedAt: row?.updatedAt.toISOString() ?? null,
  }
}

/** Reading progress for one custom book (last position + completed topics). */
export async function GET(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const book = await db.customBook.findFirst({ where: { id: bookId, userId: user.id } })
    if (!book) return notFound('Custom book not found.')
    return NextResponse.json({ progress: await currentState(user.id, bookId) })
  } catch (err) {
    return serverError(err)
  }
}

/**
 * Upsert reading progress. `completedRecordIds` is a full replacement
 * (filtered to records actually in the book), `lastReadRecordId` must be
 * a member record. Unknown ids are dropped, not rejected, so client/server
 * races never lose data.
 */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const { bookId } = await ctx.params
    const body = await req.json().catch(() => null)
    const parsed = putSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid progress payload.' }, { status: 400 })
    }

    const memberIds = await bookRecordIds(user.id, bookId)
    if (!memberIds) return notFound('Custom book not found.')

    const prev = await currentState(user.id, bookId)
    const completed = (parsed.data.completedRecordIds ?? prev.completedRecordIds).filter((id) =>
      memberIds.has(id),
    )
    const lastRead =
      parsed.data.lastReadRecordId === undefined
        ? prev.lastReadRecordId
        : parsed.data.lastReadRecordId && memberIds.has(parsed.data.lastReadRecordId)
          ? parsed.data.lastReadRecordId
          : null

    await db.customBookProgress.upsert({
      where: { userId_customBookId: { userId: user.id, customBookId: bookId } },
      create: {
        userId: user.id,
        customBookId: bookId,
        lastReadRecordId: lastRead,
        completedRecordIds: JSON.stringify(completed),
      },
      update: {
        lastReadRecordId: lastRead,
        completedRecordIds: JSON.stringify(completed),
      },
    })

    return NextResponse.json({ progress: await currentState(user.id, bookId) })
  } catch (err) {
    return serverError(err)
  }
}
