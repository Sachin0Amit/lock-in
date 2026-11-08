import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { badRequest, notFound, resolveUser, serverError } from '@/lib/auth'
import { bookRecordIds } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

const createSchema = z.object({
  recordId: z.string().min(1).max(200),
  noteContent: z.string().trim().min(1).max(5000),
})

/** List notes of a custom book. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await resolveUser(req)
    const { bookId } = await ctx.params
    const rows = await db.customBookNote.findMany({
      where: { customBookId: bookId, userId: user.id },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({
      notes: rows.map((r) => ({
        id: r.id,
        recordId: r.sourceLibraryRecordId,
        noteContent: r.noteContent,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    })
  } catch (err) {
    return serverError(err)
  }
}

/** Add a note attached to one record inside the book. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await resolveUser(req)
    const { bookId } = await ctx.params
    const body = await req.json().catch(() => null)
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) return badRequest('A note needs a recordId and 1–5000 characters of content.')

    const memberIds = await bookRecordIds(user.id, bookId)
    if (!memberIds) return notFound('Custom book not found.')
    if (!memberIds.has(parsed.data.recordId)) {
      return badRequest('Notes can only attach to topics included in this custom book.')
    }

    const note = await db.customBookNote.create({
      data: {
        userId: user.id,
        customBookId: bookId,
        sourceLibraryRecordId: parsed.data.recordId,
        noteContent: parsed.data.noteContent,
      },
    })
    return NextResponse.json(
      {
        note: {
          id: note.id,
          recordId: note.sourceLibraryRecordId,
          noteContent: note.noteContent,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (err) {
    return serverError(err)
  }
}
