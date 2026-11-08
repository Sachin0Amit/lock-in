/**
 * Custom Book Builder — API smoke tests against the live dev server.
 *
 * Covers: auth (register/login/logout/me), library endpoints, the match
 * engine API (topics + exam), PDF upload, custom-book CRUD + reorder +
 * publish validation, bookmarks/notes/progress, in-book search, duplicate,
 * cross-user isolation, delete, and library-version drift detection.
 *
 * Run: bun run scripts/smoke-custom-books.ts   (dev server on :3000)
 */
const BASE = 'http://localhost:3000'

let pass = 0
let fail = 0
const failures: string[] = []
function check(name: string, condition: boolean, detail?: unknown): void {
  if (condition) {
    pass++
  } else {
    fail++
    failures.push(detail !== undefined ? `${name} — ${JSON.stringify(detail)?.slice(0, 300)}` : name)
  }
}

/** minimal cookie-jar response wrapper */
async function call(
  method: string,
  path: string,
  body?: unknown,
  cookie?: string,
  form?: FormData,
): Promise<{ status: number; json: any; setCookie: string | null; text: string }> {
  const headers: Record<string, string> = {}
  if (cookie) headers.cookie = cookie
  let payload: BodyInit | undefined
  if (form) {
    payload = form
  } else if (body !== undefined) {
    headers['content-type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  const res = await fetch(`${BASE}${path}`, { method, headers, body: payload })
  const setCookie = res.headers.get('set-cookie')
  const text = await res.text()
  let json: any = null
  try {
    json = JSON.parse(text)
  } catch {
    json = null
  }
  return { status: res.status, json, setCookie, text }
}

const stamp = Date.now()
/* clear any test data left by earlier runs */
await db.user.deleteMany({ where: { email: { endsWith: '@example.com' } } })
const userA = { name: 'Ada Lovelace', email: `ada+${stamp}@example.com`, password: 'analytical-engine-1' }
const userB = { name: 'Blaise Pascal', email: `blaise+${stamp}@example.com`, password: 'arithmetique-1685' }

/* ------------------------------------------------------------------ */
/* 1. Auth                                                             */
/* ------------------------------------------------------------------ */

const badLogin = await call('POST', '/api/auth/login', { email: userA.email, password: 'wrong-password' })
check('1a: login before register → 401', badLogin.status === 401, badLogin)

const regA = await call('POST', '/api/auth/register', userA)
check('1b: register user A → 200', regA.status === 200 && regA.json?.user?.email === userA.email, regA)
const cookieA = regA.setCookie?.split(';')[0] ?? ''
check('1c: session cookie set (httpOnly)', cookieA.startsWith('lockin-session='), regA.setCookie)

const regDup = await call('POST', '/api/auth/register', userA)
check('1d: duplicate email → 409', regDup.status === 409, regDup)

const meA = await call('GET', '/api/auth/me', undefined, cookieA)
check('1e: /me with cookie → user', meA.status === 200 && meA.json?.user?.name === userA.name, meA)

const meAnon = await call('GET', '/api/auth/me')
check('1f: /me without cookie → 401', meAnon.status === 401)

const regB = await call('POST', '/api/auth/register', userB)
const cookieB = regB.setCookie?.split(';')[0] ?? ''
check('1g: register user B', regB.status === 200 && cookieB.length > 0)

/* ------------------------------------------------------------------ */
/* 2. Library endpoints                                                */
/* ------------------------------------------------------------------ */

const tree = await call('GET', '/api/library/tree')
check('2a: library tree → 11 disciplines, 3 books', tree.status === 200 && tree.json?.length === 11 && tree.json.reduce((n: number, d: any) => n + d.books.length, 0) === 3, tree.json?.length)

const search = await call('GET', '/api/library/search?q=factorization')
check('2b: library search finds lessons', search.status === 200 && (search.json?.hits?.length ?? 0) > 0, search.json?.hits?.length)

const lessons = tree.json.flatMap((d: any) => d.books.flatMap((b: any) => b.chapters.flatMap((c: any) => c.lessons.map((l: any) => l.recordId))))
check(`2c: tree exposes ${lessons.length} record ids`, lessons.length === 100, lessons.length)

const lessonId = lessons.find((id: string) => id.startsWith('al-')) as string
const lessonRes = await call('GET', `/api/library/lessons/${lessonId}`)
check('2d: lesson JSON with blocks', lessonRes.status === 200 && Array.isArray(lessonRes.json?.lesson?.blocks) && lessonRes.json.lesson.blocks.length > 10, lessonRes.json?.lesson?.blocks?.length)

const lesson404 = await call('GET', '/api/library/lessons/does-not-exist')
check('2e: unknown lesson → 404', lesson404.status === 404)

/* ------------------------------------------------------------------ */
/* 3. Match API (topics + exam)                                        */
/* ------------------------------------------------------------------ */

const topicList = `Mathematics Essentials
1. Greatest Common Divisor
2. Solving Linear Equations
3. CPU Scheduling
4. Quantum Mechanics`
const matchRes = await call('POST', '/api/builder/match', { method: 'topics', topicText: topicList })
check('3a: match → 200 with coverage', matchRes.status === 200 && matchRes.json?.coverage?.requested === 4, matchRes.json?.coverage)
check(
  '3b: missing topics reported not_available',
  matchRes.json?.matches?.filter((m: any) => m.status === 'not_available').map((m: any) => m.requested).join(',') === 'CPU Scheduling,Quantum Mechanics',
  matchRes.json?.matches,
)
check('3c: coverage < 100', matchRes.json?.coverage?.percent < 100, matchRes.json?.coverage)
check('3d: toc has chapters with real records', (matchRes.json?.toc?.length ?? 0) > 0 && matchRes.json.toc.every((c: any) => c.items.every((i: any) => lessons.includes(i.recordId))), matchRes.json?.toc)

const gateRes = await call('POST', '/api/builder/match', { method: 'exam', exam: 'GATE CSE 2027' })
check('3e: GATE CSE exam resolves', gateRes.status === 200 && (gateRes.json?.matches?.length ?? 0) > 30, gateRes.json?.matches?.length)
check('3f: GATE honestly mostly unavailable', (gateRes.json?.coverage?.notAvailable ?? 99) >= (gateRes.json?.coverage?.requested ?? 0) - 2, gateRes.json?.coverage)

const unknownExam = await call('POST', '/api/builder/match', { method: 'exam', exam: 'Totally Unknown Exam 2099' })
check('3g: unknown exam → guidance, no fabricated matches', unknownExam.status === 200 && unknownExam.json?.unknownExam === true && (unknownExam.json?.totalLessons ?? 1) === 0, unknownExam.json?.unknownExam)

/* ------------------------------------------------------------------ */
/* 4. PDF upload                                                       */
/* ------------------------------------------------------------------ */

import { readFileSync } from 'node:fs'
import { db } from '../src/lib/db'
const pdfBytes = readFileSync('tool-results/syllabus.pdf')
const pdfForm = new FormData()
pdfForm.append('file', new File([new Uint8Array(pdfBytes)], 'syllabus.pdf', { type: 'application/pdf' }))
const pdfRes = await call('POST', '/api/builder/upload-pdf', undefined, cookieA, pdfForm)
check('4a: PDF upload → 200', pdfRes.status === 200, pdfRes)
check('4b: PDF parsed with structure', (pdfRes.json?.parsed?.nodes?.length ?? 0) >= 3 && pdfRes.json?.usedOcr === false, pdfRes.json?.parsed?.nodes?.map((n: any) => n.topic))
const pdfTopics = (pdfRes.json?.parsed?.nodes ?? []).flatMap((n: any) => [n.topic, ...(n.children ?? []).map((c: any) => c.topic)])
check('4c: extracted topics include Polynomials & Integration', pdfTopics.includes('Polynomials') && pdfTopics.includes('Integration'), pdfTopics)

const pdfAnon = await call('POST', '/api/builder/upload-pdf', undefined, undefined, pdfForm)
check('4d: PDF upload without auth → 401', pdfAnon.status === 401)

/* ------------------------------------------------------------------ */
/* 5. Create + publish validation                                      */
/* ------------------------------------------------------------------ */

const toc = matchRes.json.toc
const coverageRows = matchRes.json.matches.map((m: any) => ({
  requestedTopic: m.requested,
  requestedParent: m.parent,
  matchedLibraryRecordId: m.best?.recordId ?? (m.expanded ? m.expanded.recordIds[0] : null),
  matchStatus: m.status,
  matchConfidence: m.confidence,
}))

const badCreate = await call('POST', '/api/custom-books', { title: 'Bad', creationMethod: 'topics', toc: [{ title: 'X', items: [{ recordId: 'not-a-real-lesson' }] }] }, cookieA)
check('5a: create with invalid record → 400', badCreate.status === 400, badCreate)

const createRes = await call('POST', '/api/custom-books', {
  title: 'My Maths Toolkit',
  description: 'Curated from the topic list.',
  creationMethod: 'topics',
  inputMetadata: { topicText: topicList },
  status: 'draft',
  toc,
  coverage: coverageRows,
}, cookieA)
check('5b: create draft → 201 with id', createRes.status === 201 && !!createRes.json?.id, createRes)
const bookId = createRes.json?.id

const createAnon = await call('POST', '/api/custom-books', { title: 'X', creationMethod: 'topics', toc }, undefined)
check('5c: create without auth → 401', createAnon.status === 401)

/* ------------------------------------------------------------------ */
/* 6. Read + detail                                                    */
/* ------------------------------------------------------------------ */

const listA = await call('GET', '/api/custom-books', undefined, cookieA)
check('6a: bookshelf lists one book', listA.status === 200 && listA.json?.books?.length === 1, listA.json?.books?.length)
const summary = listA.json?.books?.[0]
check('6b: summary has counts + coverage', summary?.chapters > 0 && summary?.topics > 0 && summary?.coveragePercent < 100, summary)

const detail = await call('GET', `/api/custom-books/${bookId}`, undefined, cookieA)
check('6c: detail resolves live library info', detail.status === 200 && detail.json?.book?.chapters?.[0]?.items?.[0]?.lessonTitle?.length > 0, detail.json?.book?.chapters?.[0]?.items?.[0])
check('6d: coverage rows stored honestly', detail.json?.book?.coverageSummary?.notAvailable === 2, detail.json?.book?.coverageSummary)
check('6e: no false "update available" on fresh book', detail.json?.book?.totals?.updatesAvailable === 0, detail.json?.book?.totals)

const detailB = await call('GET', `/api/custom-books/${bookId}`, undefined, cookieB)
check('6f: user B cannot read user A’s book → 404', detailB.status === 404, detailB.status)

/* ------------------------------------------------------------------ */
/* 7. Edit: reorder, rename, publish                                   */
/* ------------------------------------------------------------------ */

const chapters = detail.json.book.chapters
const reordered = [...chapters.slice(1), { ...chapters[0], title: 'Renamed Chapter' }]
const patchRes = await call('PATCH', `/api/custom-books/${bookId}`, {
  title: 'My Maths Toolkit — v2',
  toc: reordered.map((c: any) => ({ title: c.title, items: c.items.map((i: any) => ({ recordId: i.recordId, requestedTopic: i.requestedTopic, via: i.via, confidence: i.confidence })) })),
}, cookieA)
check('7a: reorder + rename → 200', patchRes.status === 200, patchRes)

const detail2 = await call('GET', `/api/custom-books/${bookId}`, undefined, cookieA)
check('7b: reorder persisted (last is first)', detail2.json?.book?.chapters?.[detail2.json.book.chapters.length - 1]?.title === 'Renamed Chapter', detail2.json?.book?.chapters?.map((c: any) => c.title))
check('7c: title updated', detail2.json?.book?.title === 'My Maths Toolkit — v2')

const publish = await call('PATCH', `/api/custom-books/${bookId}`, { status: 'published' }, cookieA)
check('7d: publish → 200', publish.status === 200, publish)

const patchB = await call('PATCH', `/api/custom-books/${bookId}`, { title: 'Hacked' }, cookieB)
check('7e: user B cannot edit user A’s book → 404', patchB.status === 404, patchB.status)

/* ------------------------------------------------------------------ */
/* 8. Bookmarks / notes / progress                                     */
/* ------------------------------------------------------------------ */

const firstRecord = detail2.json.book.chapters[0].items[0].recordId
const secondRecord = detail2.json.book.chapters[0].items[1]?.recordId ?? firstRecord

const bmForeign = await call('POST', `/api/custom-books/${bookId}/bookmarks`, { recordId: 'not-in-book' }, cookieA)
check('8a: bookmark a non-member record → 400', bmForeign.status === 400, bmForeign)

const bm = await call('POST', `/api/custom-books/${bookId}/bookmarks`, { recordId: firstRecord }, cookieA)
check('8b: bookmark → 201', bm.status === 201, bm)
const bmList = await call('GET', `/api/custom-books/${bookId}/bookmarks`, undefined, cookieA)
check('8c: bookmark listed', bmList.json?.bookmarks?.some((b: any) => b.recordId === firstRecord), bmList.json)

const note = await call('POST', `/api/custom-books/${bookId}/notes`, { recordId: firstRecord, noteContent: 'Revisit the balance principle.' }, cookieA)
check('8d: note created', note.status === 201 && note.json?.note?.id, note)
const noteId = note.json?.note?.id
const notePatch = await call('PATCH', `/api/custom-books/${bookId}/notes/${noteId}`, { noteContent: 'Updated note.' }, cookieA)
check('8e: note edited', notePatch.status === 200, notePatch)
const noteB = await call('PATCH', `/api/custom-books/${bookId}/notes/${noteId}`, { noteContent: 'Stolen.' }, cookieB)
check('8f: user B cannot edit note → 404', noteB.status === 404, noteB.status)

const prog = await call('PUT', `/api/custom-books/${bookId}/progress`, { lastReadRecordId: firstRecord, completedRecordIds: [firstRecord, 'foreign-record'] }, cookieA)
check('8g: progress saved, foreign record filtered', prog.status === 200 && prog.json?.progress?.lastReadRecordId === firstRecord && prog.json?.progress?.completedRecordIds.length === 1, prog.json?.progress)
const progGet = await call('GET', `/api/custom-books/${bookId}/progress`, undefined, cookieA)
check('8h: progress persists', progGet.json?.progress?.completedRecordIds?.[0] === firstRecord, progGet.json)

/* ------------------------------------------------------------------ */
/* 9. In-book search                                                   */
/* ------------------------------------------------------------------ */

const bookSearch = await call('GET', `/api/custom-books/${bookId}/search?q=equation`, undefined, cookieA)
check('9a: in-book search returns hits with snippets', bookSearch.status === 200 && (bookSearch.json?.hits?.length ?? 0) > 0 && bookSearch.json.hits[0].snippet.length > 10, bookSearch.json?.hits?.[0])

/* ------------------------------------------------------------------ */
/* 10. Version drift                                                   */
/* ------------------------------------------------------------------ */

/* simulate a library update: backdate the pinned version of an item */
const driftItem = await db.customBookContentReference.findFirst({ where: { customBookId: bookId } })
await db.customBookContentReference.update({
  where: { id: driftItem!.id },
  data: { selectedVersion: '0000000000000000' },
})
const detail3 = await call('GET', `/api/custom-books/${bookId}`, undefined, cookieA)
check('10a: library update detected after drift', detail3.json?.book?.totals?.updatesAvailable === 1, detail3.json?.book?.totals)
const driftedItem = detail3.json?.book?.chapters?.flatMap((c: any) => c.items).find((i: any) => i.updateAvailable)
check('10b: drifted item flagged', !!driftedItem?.recordId && !!driftedItem?.lessonTitle, driftedItem?.recordId)

/* ------------------------------------------------------------------ */
/* 11. Duplicate + delete                                              */
/* ------------------------------------------------------------------ */

const dup = await call('POST', `/api/custom-books/${bookId}/duplicate`, undefined, cookieA)
check('11a: duplicate → 201', dup.status === 201 && !!dup.json?.id, dup)
const dupList = await call('GET', '/api/custom-books', undefined, cookieA)
check('11b: two books now', dupList.json?.books?.length === 2, dupList.json?.books?.length)
check('11c: duplicate copies coverage honesty', dupList.json?.books?.find((b: any) => b.id === dup.json.id)?.coverageRequested === 4, dupList.json?.books?.map((b: any) => b.coverageRequested))

const delB = await call('DELETE', `/api/custom-books/${bookId}`, undefined, cookieB)
check('11d: user B cannot delete user A’s book → 404', delB.status === 404, delB.status)

const del = await call('DELETE', `/api/custom-books/${dup.json.id}`, undefined, cookieA)
check('11e: delete duplicate → 200', del.status === 200, del)
const finalList = await call('GET', '/api/custom-books', undefined, cookieA)
check('11f: one book remains', finalList.json?.books?.length === 1, finalList.json?.books?.length)

/* the Main Library is untouched (it lives outside the DB) */
const libraryAfter = await call('GET', '/api/library/tree')
check('11g: library unchanged after deletes', libraryAfter.json.reduce((n: number, d: any) => n + d.books.length, 0) === 3)

/* ------------------------------------------------------------------ */
/* 12. Logout                                                          */
/* ------------------------------------------------------------------ */

const logout = await call('POST', '/api/auth/logout', undefined, cookieA)
check('12a: logout → 200 + cookie cleared', logout.status === 200 && (logout.setCookie ?? '').includes('Max-Age=0'), logout.setCookie)
const meAfter = await call('GET', '/api/auth/me', undefined, cookieA)
check('12b: session invalid after logout', meAfter.status === 401, meAfter.status)

/* cleanup test data (cascades books, bookmarks, notes, progress, sessions) */
await db.user.deleteMany({ where: { email: { in: [userA.email, userB.email] } } })
await db.$disconnect()

/* ------------------------------------------------------------------ */
console.log(`\nsmoke-custom-books: ${pass} passed, ${fail} failed`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log(`  ✗ ${f}`)
  process.exit(1)
}
