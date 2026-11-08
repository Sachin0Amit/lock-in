import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { badRequest, notFound, resolveUser, serverError } from '@/lib/auth'

export const runtime = 'nodejs'

const patchSchema = z.object({ noteContent: z.string().trim().min(1).max(5000) })

/** Edit one note (must belong to the caller's custom book). */
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ bookId: string; noteId: string }> },
) {
  try {
    const user = await resolveUser(req)
    const { bookId, noteId } = await ctx.params
    const body = await req.json().catch(() => null)
    const parsed = patchSchema.safeParse(body)
    if (!parsed.success) return badRequest('A note needs 1–5000 characters of content.')

    const note = await db.customBookNote.findFirst({
      where: { id: noteId, customBookId: bookId, userId: user.id },
    })
    if (!note) return notFound('Note not found.')

    await db.customBookNote.update({
      where: { id: noteId },
      data: { noteContent: parsed.data.noteContent },
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return serverError(err)
  }
}

/** Delete one note. */
export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ bookId: string; noteId: string }> },
) {
  try {
    const user = await resolveUser(_req)
    const { bookId, noteId } = await ctx.params
    const note = await db.customBookNote.findFirst({
      where: { id: noteId, customBookId: bookId, userId: user.id },
    })
    if (!note) return notFound('Note not found.')
    await db.customBookNote.delete({ where: { id: noteId } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return serverError(err)
  }
}
