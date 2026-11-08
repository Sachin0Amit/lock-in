import { NextRequest, NextResponse } from 'next/server'
import { searchLibrary } from '@/data/library/index'

export const runtime = 'nodejs'

/** Search the Main Academic Library (reuse of the registry's own engine). */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) return NextResponse.json({ hits: [] })
  return NextResponse.json({ hits: searchLibrary(q, 24) })
}
