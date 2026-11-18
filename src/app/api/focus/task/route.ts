import { NextResponse } from 'next/server'
import { badRequest, resolveUser, serverError } from '@/lib/auth'
import { BadInput, createTask, deleteTask, updateTask } from '@/lib/focus/focus-service'
import type { CreateTaskRequest, UpdateTaskRequest } from '@/lib/focus/types'

/**
 * /api/focus/task — the to-do write endpoint of the Focus Hub.
 *
 *   POST   { title, notes?, link?, priority?, estimate?, dueDate? }
 *   PATCH  { id, ...patch }            (title/notes/link/priority/estimate/dueDate/status)
 *   DELETE ?id=<taskId>
 *
 * Links are validated against the live catalog (book · chapter · lesson);
 * unknown ids are rejected, never silently created.
 */

export async function POST(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as CreateTaskRequest | null
    if (!body) return badRequest('Invalid JSON body')
    const task = await createTask(user.id, body)
    return NextResponse.json(task)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await resolveUser(req)
    const body = (await req.json().catch(() => null)) as UpdateTaskRequest | null
    if (!body) return badRequest('Invalid JSON body')
    const task = await updateTask(user.id, body)
    return NextResponse.json(task)
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await resolveUser(req)
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return badRequest('id query parameter is required')
    await deleteTask(user.id, id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof BadInput) return badRequest(err.message)
    return serverError(err)
  }
}
