import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, badRequest, serverError, unauthorized } from '@/lib/auth'
import { extractPdfTopics } from '@/lib/builder/pdf-extract'

export const runtime = 'nodejs'

/**
 * Upload a syllabus PDF and extract its topic structure.
 * The extracted structure is returned for USER REVIEW — it is only a list
 * of topic names found in the document; the library is searched afterwards.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req)
    if (!user) return unauthorized('Sign in to upload a syllabus PDF.')

    const form = await req.formData().catch(() => null)
    if (!form) return badRequest('Expected a multipart form upload.')
    const file = form.get('file')
    if (!(file instanceof File)) return badRequest('Please attach a PDF file.')
    if (file.size === 0) return badRequest('The uploaded file is empty.')
    if (file.size > 15 * 1024 * 1024) return badRequest('PDFs up to 15 MB are supported.')

    const buffer = new Uint8Array(await file.arrayBuffer())
    const result = await extractPdfTopics(buffer, file.name || 'syllabus.pdf')
    return NextResponse.json(result)
  } catch (err) {
    const message = (err as Error)?.message ?? 'PDF extraction failed.'
    if (/PDF|pdf/.test(message)) {
      return badRequest(message)
    }
    return serverError(err)
  }
}
