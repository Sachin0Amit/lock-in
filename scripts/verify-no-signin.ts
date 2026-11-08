// verify-no-signin.ts — the sign-in walls are GONE, end to end, at the API
// level. Every Revision Hub / Custom Book Builder / My Custom Books route
// must serve a completely anonymous caller (no cookie, no account): the
// request resolves to the stable local learner identity and full CRUD works.
//
// Usage: node --experimental-strip-types scripts/verify-no-signin.ts
// (server must be running on :3000)

const BASE = 'http://localhost:3000'

let failures = 0
function check(name: string, ok: boolean, detail = '') {
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures++
}

async function call(path: string, init?: RequestInit) {
  const res = await fetch(BASE + path, { cache: 'no-store', ...init })
  const text = await res.text()
  let json: any = null
  try {
    json = JSON.parse(text)
  } catch {
    /* not json */
  }
  return { status: res.status, json, text }
}

async function main() {
  console.log('== guest revision ledger (no cookie) ==')
  const overview = await call('/api/revision/overview')
  check('GET /api/revision/overview → 200', overview.status === 200, `status ${overview.status}`)

  const graph = await call('/api/revision/graph')
  check('GET /api/revision/graph → 200', graph.status === 200, `status ${graph.status}`)

  const summary = await call('/api/revision/overview?summary=1')
  check('GET /api/revision/overview?summary=1 → 200', summary.status === 200, `status ${summary.status}`)

  /* mark a real library chapter studied, then read it back (unmark first
   * so the run is repeatable on a shared local-learner ledger) */
  await call('/api/revision/mark', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [{ scope: 'chapter', refId: 'foundation-mathematics:1' }],
      action: 'unmark',
    }),
  })
  const overview0 = await call('/api/revision/overview')
  const before = overview0.json?.entries?.length ?? 0
  const mark = await call('/api/revision/mark', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [{ scope: 'chapter', refId: 'foundation-mathematics:1' }],
      action: 'study',
      kind: 'chapter-mark',
    }),
  })
  check(
    'POST /api/revision/mark (chapter study) → 200 + ok',
    mark.status === 200 && mark.json?.results?.[0]?.ok === true,
    `status ${mark.status}`,
  )

  const entry = await call('/api/revision/entry?scope=chapter&refId=foundation-mathematics%3A1')
  check(
    'GET /api/revision/entry → 200 + entry present',
    entry.status === 200 && !!entry.json?.entry,
    `status ${entry.status}`,
  )

  const overview2 = await call('/api/revision/overview')
  check(
    'overview reflects the guest mark (persistence across separate requests)',
    (overview2.json?.entries?.length ?? 0) === before + 1,
    `entries ${before} → ${overview2.json?.entries?.length ?? '?'}`,
  )

  console.log('\n== guest builder + custom books (no cookie) ==')
  const match = await call('/api/builder/match', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ topicText: 'Place value\nComparing numbers\nRounding' }),
  })
  check(
    'POST /api/builder/match (topics) → 200 with matches',
    match.status === 200 && (match.json?.matches?.length ?? 0) > 0,
    `status ${match.status}, ${match.json?.matches?.length ?? 0} matches`,
  )

  const list1 = await call('/api/custom-books')
  check('GET /api/custom-books → 200', list1.status === 200, `status ${list1.status}`)
  const had = (list1.json?.books ?? []).length

  const lessonIds = (match.json?.matches ?? [])
    .slice(0, 3)
    .map((m: any) => m.best?.recordId ?? m.recordId)
    .filter(Boolean)
  const toc = [
    {
      title: 'Guest chapter',
      items: lessonIds.map((recordId: string) => ({
        recordId,
        requestedTopic: 'place value',
        via: 'exact',
        confidence: 1,
      })),
    },
  ]
  const create = await call('/api/custom-books', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title: 'Guest verification book',
      description: 'created by verify-no-signin',
      creationMethod: 'topics',
      status: 'published',
      toc,
      coverage: [],
    }),
  })
  check(
    'POST /api/custom-books (publish) → 201',
    create.status === 201 && !!create.json?.id,
    `status ${create.status}`,
  )
  const bookId = create.json?.id

  const list2 = await call('/api/custom-books')
  check(
    'shelf reflects the guest book',
    (list2.json?.books ?? []).length === had + 1,
    `${had} → ${list2.json?.books?.length ?? '?'}`,
  )

  const detail = await call(`/api/custom-books/${bookId}`)
  check('GET /api/custom-books/:id → 200', detail.status === 200, `status ${detail.status}`)

  const dup = await call(`/api/custom-books/${bookId}/duplicate`, { method: 'POST' })
  check('POST /api/custom-books/:id/duplicate → 201', dup.status === 201, `status ${dup.status}`)

  const progress = await call(`/api/custom-books/${bookId}/progress`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      lastReadRecordId: lessonIds[0],
      completedRecordIds: [lessonIds[0]],
    }),
  })
  check('PUT /api/custom-books/:id/progress → 200', progress.status === 200, `status ${progress.status}`)

  /* cleanup: delete both created books */
  const del2 = await call(`/api/custom-books/${dup.json?.id}`, { method: 'DELETE' })
  check('DELETE duplicate → 200', del2.status === 200, `status ${del2.status}`)
  const del1 = await call(`/api/custom-books/${bookId}`, { method: 'DELETE' })
  check('DELETE book → 200', del1.status === 200, `status ${del1.status}`)

  console.log('\n== cleanup (leave no test residue) ==')
  const unmark = await call('/api/revision/mark', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [{ scope: 'chapter', refId: 'foundation-mathematics:1' }],
      action: 'unmark',
    }),
  })
  check('unmark the guest chapter → 200', unmark.status === 200, `status ${unmark.status}`)

  console.log('\n== account system stays intact for those who want it ==')
  const me = await call('/api/auth/me')
  check('GET /api/auth/me without cookie → 401 (accounts optional, not gone)', me.status === 401, `status ${me.status}`)

  console.log('\n== page routes render for guests ==')
  for (const p of ['/revision', '/my-books', '/builder', '/']) {
    const res = await fetch(BASE + p, { redirect: 'manual' })
    check(`GET ${p} → 200`, res.status === 200, `status ${res.status}`)
  }

  console.log(failures === 0 ? '\nALL NO-SIGNIN CHECKS PASS' : `\n${failures} CHECK(S) FAILED`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
