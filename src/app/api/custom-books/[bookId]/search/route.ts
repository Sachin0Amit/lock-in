import { NextRequest, NextResponse } from 'next/server'
import { notFound, resolveUser, serverError } from '@/lib/auth'
import { db } from '@/lib/db'
import { lessonPlainText } from '@/lib/builder/catalog'

export const runtime = 'nodejs'

/** Search within one custom book: across every referenced lesson's text. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ bookId: string }> }) {
  try {
    const user = await resolveUser(req)
    const { bookId } = await ctx.params
    const q = (req.nextUrl.searchParams.get('q') ?? '').trim().toLowerCase()
    if (q.length < 2) return NextResponse.json({ hits: [] })

    const book = await db.customBook.findFirst({
      where: { id: bookId, userId: user.id },
      include: { chapters: { orderBy: { position: 'asc' }, include: { items: { orderBy: { position: 'asc' } } } } },
    })
    if (!book) return notFound('Custom book not found.')

    const hits: {
      recordId: string
      lessonNumber: string
      lessonTitle: string
      chapterTitle: string
      customChapter: string
      snippet: string
    }[] = []

    for (const chapter of book.chapters) {
      for (const item of chapter.items) {
        const text = lessonPlainText(item.sourceLibraryRecordId)
        if (!text) continue
        const lower = text.toLowerCase()
        const at = lower.indexOf(q)
        if (at === -1) continue
        const start = Math.max(0, at - 60)
        const snippet = text
          .slice(start, at + q.length + 120)
          .replace(/\s+/g, ' ')
          .trim()
        hits.push({
          recordId: item.sourceLibraryRecordId,
          lessonNumber: '',
          lessonTitle: '',
          chapterTitle: '',
          customChapter: chapter.title,
          snippet: `${start > 0 ? '… ' : ''}${snippet} …`,
        })
        if (hits.length >= 30) break
      }
      if (hits.length >= 30) break
    }

    /* enrich with live library titles */
    const { CATALOG } = await import('@/lib/builder/catalog')
    for (const hit of hits) {
      const rec = CATALOG.lessonById.get(hit.recordId)
      if (rec) {
        hit.lessonNumber = rec.lessonNumber
        hit.lessonTitle = rec.lessonTitle
        hit.chapterTitle = rec.chapterTitle
      }
    }

    return NextResponse.json({ hits })
  } catch (err) {
    return serverError(err)
  }
}
