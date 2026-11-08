import { NextResponse } from 'next/server'
import { libraryTree } from '@/lib/builder/catalog'

export const runtime = 'nodejs'

/** The full browse tree for the Custom Book Builder (Method 2). */
export async function GET() {
  const data = NextResponse.json(libraryTree())
  data.headers.set('Cache-Control', 'public, max-age=300')
  return data
}
