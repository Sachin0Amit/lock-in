/**
 * Revision & Mastery — API smoke tests against the live dev server.
 *
 * Covers: auth gating of all four revision endpoints, marking semantics
 * over HTTP (idempotent study, revision scheduling, quiz quality, unmark,
 * batch, validation errors), overview payload invariants (queue, summary,
 * activity, histogram, book breakdown, recent events), the compact
 * summary for the header badge, the knowledge graph route, and strict
 * cross-user isolation. Throwaway users, cleaned up after.
 *
 * Run: bun run scripts/smoke-revision.ts   (dev server on :3000)
 */
import { db } from '../src/lib/db'

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

async function call(
  method: string,
  path: string,
  body?: unknown,
  cookie?: string,
): Promise<{ status: number; json: any }> {
  const headers: Record<string, string> = {}
  if (cookie) headers.cookie = cookie
  if (body !== undefined) headers['content-type'] = 'application/json'
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json: any = null
  try {
    json = JSON.parse(text)
  } catch {
    json = null
  }
  return { status: res.status, json }
}

const stamp = Date.now()
const userA = { name: 'Revision Smoker', email: `revsmoke+${stamp}@example.com`, password: 'spaced-repetition-1' }
const userB = { name: 'Another Smoker', email: `revsmoke2+${stamp}@example.com`, password: 'forgetting-curve-2' }

/* clear any test data left by earlier runs */
await db.user.deleteMany({ where: { email: { endsWith: '@example.com' } } })

/* grab two real chapter keys + lesson ids from the public tree endpoint */
const tree = await call('GET', '/api/library/tree')
const fmBook = tree.json.flatMap((d: any) => d.books).find((b: any) => b.bookId === 'foundation-mathematics')
const fmCh1Key = `foundation-mathematics:${fmBook.chapters[0].number}`
const fmCh2Key = `foundation-mathematics:${fmBook.chapters[1].number}`
const fmLesson1 = fmBook.chapters[0].lessons[0].recordId
const alBook = tree.json.flatMap((d: any) => d.books).find((b: any) => b.bookId === 'elementary-algebra')
const alLesson = alBook.chapters[0].lessons[0].recordId

/* ------------------------------------------------------------------ */
/* 1. Auth gating                                                      */
/* ------------------------------------------------------------------ */

const anonOverview = await call('GET', '/api/revision/overview')
check('1a: anonymous overview → 401', anonOverview.status === 401, anonOverview)
const anonSummary = await call('GET', '/api/revision/overview?summary=1')
check('1b: anonymous summary → 401', anonSummary.status === 401, anonSummary)
const anonGraph = await call('GET', '/api/revision/graph')
check('1c: anonymous graph → 401', anonGraph.status === 401, anonGraph)
const anonMark = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'study' })
check('1d: anonymous mark → 401', anonMark.status === 401, anonMark)
const anonEntry = await call('GET', `/api/revision/entry?scope=lesson&refId=${fmLesson1}`)
check('1e: anonymous entry → 401', anonEntry.status === 401, anonEntry)

const regA = await call('POST', '/api/auth/register', userA)
check('1f: register user A', regA.status === 200 && regA.json?.user?.email === userA.email, regA)
/* fetch cookie via login (register also sets it on the response) */
const loginA = await fetch(`${BASE}/api/auth/login`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ email: userA.email, password: userA.password }),
})
const cookieJarA = (loginA.headers.get('set-cookie') ?? '').split(';')[0]
check('1g: login user A gives session cookie', cookieJarA.startsWith('lockin-session='))

const regB = await fetch(`${BASE}/api/auth/register`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(userB),
})
const cookieJarB = (regB.headers.get('set-cookie') ?? '').split(';')[0]
check('1h: register user B gives session cookie', cookieJarB.startsWith('lockin-session='))

/* ------------------------------------------------------------------ */
/* 2. Marking over HTTP                                                */
/* ------------------------------------------------------------------ */

const badBody = await call('POST', '/api/revision/mark', 'not-json', cookieJarA)
check('2a: non-JSON body → 400', badBody.status === 400, badBody)
const badRef = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: 'ghost:1' }], action: 'study' }, cookieJarA)
check('2b: unknown refId → 400 with message', badRef.status === 400 && typeof badRef.json?.error === 'string', badRef)
const badQuality = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'revise', quality: 9 }, cookieJarA)
check('2c: out-of-range quality → 400', badQuality.status === 400, badQuality)

const m1 = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'study', kind: 'chapter-mark' }, cookieJarA)
check('2d: mark chapter studied → created', m1.status === 200 && m1.json?.results?.[0]?.created === true && m1.json?.results?.[0]?.entry?.passes === 1, m1)
check('2e: entry carries resolved metadata + url anchor', m1.json?.results?.[0]?.entry?.url === `/book/foundation-mathematics#ch-${fmBook.chapters[0].number}` && m1.json?.results?.[0]?.entry?.label.startsWith('Chapter'), m1.json?.results?.[0]?.entry)

const m2 = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'study' }, cookieJarA)
check('2f: repeat study → idempotent no-op', m2.status === 200 && m2.json?.results?.[0]?.created === false && m2.json?.results?.[0]?.entry?.passes === 1, m2)

const m3 = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'revise', quality: 5 }, cookieJarA)
check('2g: revise quality 5 → passes 2, ladder to 3d', m3.json?.results?.[0]?.entry?.passes === 2 && m3.json?.results?.[0]?.entry?.intervalDays === 3, m3)

const m4 = await call('POST', '/api/revision/mark', { items: [{ scope: 'lesson', refId: fmLesson1 }], action: 'quiz', quality: 4 }, cookieJarA)
check('2h: quiz creates lesson entry with quality', m4.json?.results?.[0]?.created === true && m4.json?.results?.[0]?.entry?.scope === 'lesson', m4)

const batch = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh2Key }, { scope: 'lesson', refId: alLesson }], action: 'study' }, cookieJarA)
check('2i: batch mark answers per item', batch.status === 200 && batch.json?.results?.length === 2 && batch.json?.results?.every((r: any) => r.ok), batch)

const entry1 = await call('GET', `/api/revision/entry?scope=lesson&refId=${fmLesson1}`, undefined, cookieJarA)
check('2j: single entry endpoint resolves', entry1.status === 200 && entry1.json?.entry?.refId === fmLesson1 && entry1.json?.entry?.passes === 1, entry1)
const entryMissing = await call('GET', `/api/revision/entry?scope=lesson&refId=${alLesson}`, undefined, cookieJarB)
check('2k: entry endpoint is user-scoped', entryMissing.status === 200 && entryMissing.json?.entry === null, entryMissing)
const entryBad = await call('GET', '/api/revision/entry?scope=chapter', undefined, cookieJarA)
check('2l: entry endpoint validates params', entryBad.status === 400, entryBad)

const un = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh2Key }], action: 'unmark' }, cookieJarA)
check('2m: unmark deletes', un.json?.results?.[0]?.deleted === true, un)
const un2 = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh2Key }], action: 'unmark' }, cookieJarA)
check('2n: unmark idempotent', un2.json?.results?.[0]?.deleted === false, un2)

/* ------------------------------------------------------------------ */
/* 3. Overview payload                                                 */
/* ------------------------------------------------------------------ */

const ov = await call('GET', '/api/revision/overview', undefined, cookieJarA)
check('3a: overview 200 with entries', ov.status === 200 && ov.json?.entries?.length === 3, ov.json?.entries?.length)
check('3b: summary shape', ov.json?.summary && typeof ov.json.summary.dueCount === 'number' && typeof ov.json.summary.studiedChapters === 'number' && typeof ov.json.summary.estMins === 'number', ov.json?.summary)
check('3c: queue items explain themselves', (ov.json?.queue ?? []).every((q: any) => typeof q.reason === 'string' && q.reason.length > 0))
check('3d: activity 84 days', ov.json?.activity?.length === 84)
check('3e: histogram keys valid', (ov.json?.masteryHistogram ?? []).every((h: any) => ['new', 'learning', 'familiar', 'strong', 'mastered'].includes(h.state) && h.count >= 0))
check('3f: book breakdown covers all books', ov.json?.bookBreakdown?.length === 3)
check('3g: recent events present', (ov.json?.recentEvents ?? []).length > 0)
check('3h: leastRevised rankings present', Array.isArray(ov.json?.leastRevised?.chapters) && Array.isArray(ov.json?.leastRevised?.lessons) && Array.isArray(ov.json?.leastRevised?.books))

const summary = await call('GET', '/api/revision/overview?summary=1', undefined, cookieJarA)
check('3i: compact summary counts user A chapters', summary.status === 200 && summary.json?.studiedChapters === 1 && summary.json?.studiedLessons === 2, summary.json)
const summaryB = await call('GET', '/api/revision/overview?summary=1', undefined, cookieJarB)
check('3j: compact summary isolated for user B', summaryB.status === 200 && summaryB.json?.studiedChapters === 0 && summaryB.json?.dueCount === 0, summaryB.json)

/* ------------------------------------------------------------------ */
/* 4. Knowledge graph route                                            */
/* ------------------------------------------------------------------ */

const g = await call('GET', '/api/revision/graph', undefined, cookieJarA)
check('4a: graph 200 with stats', g.status === 200 && g.json?.stats?.nodes > 90 && g.json?.stats?.edges > 150, g.json?.stats)
check(
  '4a2: histogram partitions every written-lessons chapter',
  ov.json?.masteryHistogram?.reduce((n: number, h: any) => n + h.count, 0) === g.json?.chapters?.length,
  { hist: ov.json?.masteryHistogram?.reduce((n: number, h: any) => n + h.count, 0), graphChapters: g.json?.chapters?.length },
)
check('4b: every edge endpoint resolves to a node', (g.json?.edges ?? []).every((e: any) => g.json.nodes.some((n: any) => n.id === e.source) && g.json.nodes.some((n: any) => n.id === e.target)))
check('4c: node states valid', (g.json?.nodes ?? []).every((n: any) => ['new', 'learning', 'familiar', 'strong', 'mastered'].includes(n.state) && (n.studied || n.state === 'new')))
check('4d: overlay marks studied lesson', g.json?.nodes?.find((n: any) => n.id === fmLesson1)?.studied === true)
check('4e: chapters carry stats', (g.json?.chapters ?? []).length >= 25 && g.json.chapters.every((c: any) => Array.isArray(c.lessonIds)))
const gB = await call('GET', '/api/revision/graph', undefined, cookieJarB)
check('4f: graph overlay isolated per user', gB.json?.nodes?.find((n: any) => n.id === fmLesson1)?.studied === false)

/* ------------------------------------------------------------------ */
/* 5. Cross-user isolation on marks                                    */
/* ------------------------------------------------------------------ */

const iso = await call('POST', '/api/revision/mark', { items: [{ scope: 'chapter', refId: fmCh1Key }], action: 'study' }, cookieJarB)
check('5a: user B marks the same chapter independently', iso.json?.results?.[0]?.created === true && iso.json?.results?.[0]?.entry?.passes === 1, iso)
const ovA = await call('GET', '/api/revision/overview', undefined, cookieJarA)
check('5b: user A passes untouched by B', ovA.json?.entries?.find((e: any) => e.refId === fmCh1Key)?.passes === 2, ovA.json?.entries?.find((e: any) => e.refId === fmCh1Key))

/* logout clears access */
await call('POST', '/api/auth/logout', {}, cookieJarA)
const afterLogout = await call('GET', '/api/revision/overview', undefined, cookieJarA)
check('5c: after logout overview → 401', afterLogout.status === 401, afterLogout)

/* ------------------------------------------------------------------ */

await db.user.deleteMany({ where: { email: { in: [userA.email, userB.email] } } })

console.log(`\nsmoke-revision: ${pass}/${pass + fail} checks ${fail === 0 ? 'ALL GREEN' : 'FAILED'}`)
if (fail > 0) {
  console.log('Failures:')
  for (const f of failures) console.log(`  - ${f}`)
  process.exit(1)
}
