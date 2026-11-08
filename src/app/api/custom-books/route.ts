import { NextRequest, NextResponse } from 'next/server'
import { resolveUser, serverError } from '@/lib/auth'
import { createCustomBook, listCustomBooks } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

/** List the acting user's custom books (bookshelf data) — no account needed. */
export async function GET(req: NextRequest) {
  try {
    const user = await resolveUser(req)
    const books = await listCustomBooks(user.id)
    return NextResponse.json({ books })
  } catch (err) {
    return serverError(err)
  }
}

/** Create a custom book (draft or published) from a curated TOC. */
export async function POST(req: NextRequest) {
  try {
    const user = await resolveUser(req)
    const body = await req.json().catch(() => null)
    const result = await createCustomBook(user.id, {
      title: body?.title,
      description: body?.description,
      creationMethod: body?.creationMethod,
      inputMetadata: body?.inputMetadata,
      status: body?.status,
      toc: body?.toc,
      coverage: body?.coverage,
    })
    if ('status' in result) {
      return NextResponse.json({ error: result.message, ...result.extra }, { status: result.status })
    }
    return NextResponse.json({ id: result.id }, { status: 201 })
  } catch (err) {
    return serverError(err)
  }
}
