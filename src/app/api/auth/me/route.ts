import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, unauthorized } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req)
  if (!user) return unauthorized('Not signed in')
  return NextResponse.json({ user })
}
