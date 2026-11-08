import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, serverError, unauthorized } from '@/lib/auth'
import { createCustomBook, listCustomBooks } from '@/lib/builder/books-service'

export const runtime = 'nodejs'

/** List the signed-in user's custom books (bookshelf data). */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized()
    const books = await listCustomBooks(user.id)
    return NextResponse.json({ books })
  } catch (err) {
    return serverError(err)
  }
}

/** Create a custom book (draft or published) from a curated TOC. */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized('Sign in to save a custom book.')
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
