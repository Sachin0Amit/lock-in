import { NextResponse } from 'next/server'
import { getLessonStubViews } from '@/lib/library-db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * The client lesson index: navigational stubs (id, book, number, title,
 * words) for the command palette — metadata only, no lesson content.
 * Served from the packed content database.
 */
export async function GET() {
  return NextResponse.json({ lessons: await getLessonStubViews() })
}
