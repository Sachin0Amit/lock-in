/**
 * Revision & Mastery — engine + service verification suite.
 *
 * Section A verifies the pure SM-2-lite engine (srs.ts) against hand-
 * computed expectations: the interval ladder, ease clamps, mastery
 * composition, forgetting risk, state buckets and queue scoring.
 *
 * Section B verifies the ledger service semantics against the LIVE
 * catalog and database (throwaway users, cleaned up after): idempotent
 * marking, revision scheduling, quiz quality, unmark, per-user isolation,
 * overview aggregation (queue, activity, least-revised, histogram, book
 * breakdown, recent events) and the knowledge-graph invariants.
 *
 * Run: bun run scripts/verify-revision.ts   (dev server NOT required)
 */
import { db } from '../src/lib/db'
import { CATALOG } from '../src/lib/builder/catalog'
import {
  applyReview,
  buildQueue,
  computeMastery,
  computeRisk,
  initialSrsState,
  overdueDays,
  revisionMinutes,
  stateOfMastery,
  strengthFromPasses,
  DAY_MS,
} from '../src/lib/revision/srs'
import {
  BadInput,
  getEntry,
  getGraph,
  getOverview,
  getSummaryCompact,
  markStudy,
} from '../src/lib/revision/ledger-service'

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

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/* ================================================================== */
/* Section A — the pure engine                                         */
/* ================================================================== */

/* A1. first study state */
{
  const t0 = Date.parse('2026-11-08T10:00:00Z')
  const s = initialSrsState(t0, 3)
  check('A1a: first pass — passes=1, interval=1, due=+1d', s.passes === 1 && s.intervalDays === 1 && s.dueAt === t0 + DAY_MS)
  check('A1b: default ease 2.5', s.ease === 2.5)
  check('A1c: quality clamped', initialSrsState(t0, 9).lastQuality === 5 && initialSrsState(t0, -2).lastQuality === 0)
}

/* A2. the interval ladder under Good/Easy (q>=4): 1 → 3 → 7 → ×ease */
{
  const t0 = 100
  let s = initialSrsState(t0)
  s = applyReview(s, 4, t0 + DAY_MS)
  check('A2a: q4 from 1d → 3d', s.intervalDays === 3, s.intervalDays)
  s = applyReview(s, 4, t0 + 4 * DAY_MS)
  check('A2b: q4 from 3d → 7d', s.intervalDays === 7, s.intervalDays)
  s = applyReview(s, 5, t0 + 11 * DAY_MS)
  const expected = Math.round(7 * s.ease)
  check('A2c: q5 from 7d → 7×ease', s.intervalDays === expected && s.intervalDays >= 15, { got: s.intervalDays, expected })
  check('A2d: passes counted', s.passes === 4)
}

/* A3. Hard (q3) grows modestly; Again (q<=2) resets */
{
  let s = { ...initialSrsState(0), intervalDays: 20, ease: 2.5 }
  const hard = applyReview(s, 3, 1)
  check('A3a: q3 grows ×1.3 (floor 2)', hard.intervalDays === Math.max(2, Math.round(20 * 1.3)), hard.intervalDays)
  const again = applyReview({ ...s, intervalDays: 40 }, 1, 1)
  check('A3b: q1 resets to 1 day', again.intervalDays === 1)
  check('A3c: q1 drops ease by the SM-2 delta (−0.54)', Math.abs(again.ease - 1.96) < 1e-9, again.ease)
}

/* A4. ease clamps and SM-2 formula */
{
  let s = { ...initialSrsState(0), ease: 1.35 }
  s = applyReview(s, 1, 1)
  check('A4a: ease floors at 1.3', s.ease === 1.3, s.ease)
  let hi = { ...initialSrsState(0), ease: 2.95 }
  hi = applyReview(hi, 5, 1)
  check('A4b: ease caps at 3.0', hi.ease === 3.0, hi.ease)
  const q4 = applyReview(initialSrsState(0), 4, 1)
  check('A4c: SM-2 ease q4 → +0.0', Math.abs(q4.ease - 2.5) < 1e-9, q4.ease)
  const q5 = applyReview(initialSrsState(0), 5, 1)
  check('A4d: SM-2 ease q5 → +0.1', Math.abs(q5.ease - 2.6) < 1e-9, q5.ease)
}

/* A5. mastery composition & buckets */
{
  const now = 1_000_000_000_000
  const fresh1 = computeMastery(initialSrsState(now, 3), now)
  check('A5a: one fresh pass (q3) lands in familiar band', fresh1 >= 40 && fresh1 < 65, fresh1)
  const decayed = computeMastery({ ...initialSrsState(now - 90 * DAY_MS, 3) }, now)
  check('A5b: 90-day-old single pass decays below the fresh score', decayed < fresh1, { decayed, fresh1 })
  const many = { ease: 2.5, intervalDays: 60, passes: 12, lastQuality: 5, lastAt: now, dueAt: now + 60 * DAY_MS }
  const masteryMany = computeMastery(many, now)
  check('A5c: 12 passes, q5, fresh → mastered (≥85)', masteryMany >= 85, masteryMany)
  check('A5d: mastery bounded 0..100', fresh1 >= 0 && masteryMany <= 100)
  check(
    'A5e: buckets ordered',
    stateOfMastery(0) === 'learning' &&
      stateOfMastery(39) === 'learning' &&
      stateOfMastery(40) === 'familiar' &&
      stateOfMastery(64) === 'familiar' &&
      stateOfMastery(65) === 'strong' &&
      stateOfMastery(84) === 'strong' &&
      stateOfMastery(85) === 'mastered',
  )
  /* monotone in passes at fixed freshness/quality */
  let prev = -1
  let monotone = true
  for (const p of [1, 2, 3, 5, 8, 12, 20]) {
    const m = computeMastery({ ease: 2.5, intervalDays: 30, passes: p, lastQuality: 4, lastAt: now, dueAt: now + 30 * DAY_MS }, now)
    if (m < prev) monotone = false
    prev = m
  }
  check('A5f: mastery monotone in passes', monotone)
}

/* A6. retention & risk — the logistic forgetting curve */
{
  const now = 5_000_000_000_000
  const riskAt = (elapsedDays: number, horizon: number) => computeRisk(now - elapsedDays * DAY_MS, horizon, now)
  const atDue = riskAt(10, 10)
  check('A6a: risk ≈ 14% on the due day (the design target)', atDue >= 10 && atDue <= 20, atDue)
  check('A6b: risk tiny right after study', riskAt(0, 10) < 5, riskAt(0, 10))
  const atTwice = riskAt(20, 10)
  check('A6c: risk ≈ 50% at twice the interval', atTwice >= 45 && atTwice <= 55, atTwice)
  const heavy = riskAt(30, 10)
  check('A6d: heavy overdue (3×) → risk > 70', heavy > 70, heavy)
  check('A6e: overdueDays floors at 0', overdueDays(now + DAY_MS, now) === 0)
  check('A6f: strength saturates ≤1 and grows', strengthFromPasses(1) < strengthFromPasses(5) && strengthFromPasses(99) <= 1)
  check('A6g: risk bounded and monotone in elapsed', riskAt(1, 10) <= riskAt(5, 10) && riskAt(5, 10) <= riskAt(50, 10) && riskAt(50, 10) <= 100)
}

/* A7. the queue ranks honestly */
{
  const now = 7_000_000_000_000
  const mk = (o: Partial<Parameters<typeof buildQueue>[0][number]>) => ({
    scope: 'chapter' as const,
    refId: o.refId ?? 'x',
    passes: o.passes ?? 1,
    mastery: o.mastery ?? 50,
    risk: o.risk ?? 10,
    overdueDays: o.overdueDays ?? 0,
    daysSince: o.daysSince ?? 1,
    dueAt: o.dueAt ?? now + 5 * DAY_MS,
    intervalDays: o.intervalDays ?? 7,
    readMins: o.readMins ?? 30,
    label: o.label ?? 'L',
  })
  const queue = buildQueue(
    [
      mk({ refId: 'overdue-5d', dueAt: now - 5 * DAY_MS, overdueDays: 5, risk: 45, label: 'overdue-5d' }),
      mk({ refId: 'due-today', dueAt: now, label: 'due-today' }),
      mk({ refId: 'watch', dueAt: now + 2 * DAY_MS, risk: 30, label: 'watch' }),
      mk({ refId: 'fresh-mastered', dueAt: now + 40 * DAY_MS, mastery: 95, label: 'fresh-mastered' }),
    ],
    now,
  )
  const ids = queue.map((q) => q.refId)
  check('A7a: overdue items rank above due-today above watch list', ids.indexOf('overdue-5d') < ids.indexOf('due-today') && ids.indexOf('due-today') < ids.indexOf('watch'))
  check('A7b: fresh mastered item is NOT queued', !ids.includes('fresh-mastered'), ids)
  check(
    'A7c: reasons are human and specific',
    queue[0].reason.includes('Due 5 days ago') && queue.some((q) => q.reason.includes('High forgetting risk')),
    queue.map((q) => q.reason),
  )
  check('A7d: urgency strictly ordered', queue.every((q, i) => i === 0 || queue[i - 1].urgency >= q.urgency))
  check('A7e: revision minutes ≈ 40% with floor 2', revisionMinutes(100) === 40 && revisionMinutes(2) === 2)
}

/* ================================================================== */
/* Section B — the ledger service (live catalog + database)            */
/* ================================================================== */

const stamp = Date.now()
const cleanup = async () => {
  await db.user.deleteMany({ where: { email: { in: [`rev-a+${stamp}@example.com`, `rev-b+${stamp}@example.com`] } } }).catch(() => undefined)
}
await cleanup()
const userA = await db.user.create({
  data: { email: `rev-a+${stamp}@example.com`, name: 'Rev Tester A', passwordHash: 'x:y' },
})
const userB = await db.user.create({
  data: { email: `rev-b+${stamp}@example.com`, name: 'Rev Tester B', passwordHash: 'x:y' },
})

const fmCh1 = CATALOG.chapters.find((c) => c.bookId === 'foundation-mathematics' && c.chapterNumber === 1)!
const fmCh2 = CATALOG.chapters.find((c) => c.bookId === 'foundation-mathematics' && c.chapterNumber === 2)!
const alCh1 = CATALOG.chapters.find((c) => c.bookId === 'elementary-algebra' && c.chapterNumber === 1)!
const lesson1 = fmCh1.lessonRecordIds[0]
const lesson2 = fmCh1.lessonRecordIds[1] ?? fmCh2.lessonRecordIds[0]
const alLesson = alCh1.lessonRecordIds[0]

/* B1. validation rejects unknown refs and bad payloads */
{
  let threw = ''
  try {
    await markStudy(userA.id, { items: [{ scope: 'chapter', refId: 'nope:99' }], action: 'study' })
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B1a: unknown chapter refId rejected', threw === 'badinput', threw)
  try {
    await markStudy(userA.id, { items: [{ scope: 'lesson', refId: 'not-a-lesson' }], action: 'study' })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B1b: unknown lesson refId rejected', threw === 'badinput', threw)
  try {
    await markStudy(userA.id, { items: [], action: 'study' })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B1c: empty items rejected', threw === 'badinput', threw)
  try {
    await markStudy(userA.id, { items: [{ scope: 'chapter' as const, refId: fmCh1.key }], action: 'nonsense' as never })
    threw = 'no-throw'
  } catch (e) {
    threw = e instanceof BadInput ? 'badinput' : String(e)
  }
  check('B1d: unknown action rejected', threw === 'badinput', threw)
}

/* B2. mark → idempotent study → revise ladder → quiz quality */
{
  const r1 = await markStudy(userA.id, { items: [{ scope: 'chapter', refId: fmCh1.key }], action: 'study', kind: 'chapter-mark' })
  check('B2a: first study creates the entry', r1[0].ok && r1[0].created === true && r1[0].entry?.passes === 1)
  check('B2b: chapter metadata resolved', r1[0].entry?.bookId === 'foundation-mathematics' && r1[0].entry?.chapterNumber === 1 && r1[0].entry?.lessonCount === fmCh1.lessonRecordIds.length)
  check('B2c: initial interval is 1 day ahead', Math.abs(new Date(r1[0].entry!.dueAt).getTime() - Date.now() - DAY_MS) < 90_000)

  const r2 = await markStudy(userA.id, { items: [{ scope: 'chapter', refId: fmCh1.key }], action: 'study' })
  check('B2d: repeat study is a no-op (idempotent)', r2[0].ok && r2[0].created === false && r2[0].entry?.passes === 1)

  const r3 = await markStudy(userA.id, { items: [{ scope: 'chapter', refId: fmCh1.key }], action: 'revise', quality: 4 })
  check('B2e: revision increments passes to 2', r3[0].entry?.passes === 2)
  check('B2f: q4 walks the ladder to 3 days', r3[0].entry?.intervalDays === 3, r3[0].entry?.intervalDays)

  const r4 = await markStudy(userA.id, { items: [{ scope: 'lesson', refId: lesson1 }], action: 'quiz', quality: 5 })
  check('B2g: quiz on unstudied lesson creates a lesson entry', r4[0].created === true && r4[0].entry?.scope === 'lesson')
  check('B2h: quiz entry resolves lesson metadata', r4[0].entry?.lessonNumber !== undefined && r4[0].entry?.label.includes('·'))

  const r5 = await markStudy(userA.id, { items: [{ scope: 'lesson', refId: lesson1 }], action: 'quiz', quality: 1 })
  check('B2i: quiz again (q1) resets interval to 1', r5[0].entry?.passes === 2 && r5[0].entry?.intervalDays === 1)

  /* an orphan lesson — its chapter has no chapter-level entry, so the
   * lesson itself must surface in the queue */
  const r6 = await markStudy(userA.id, { items: [{ scope: 'lesson', refId: alLesson }], action: 'study' })
  check('B2j: orphan lesson markable on its own', r6[0].ok && r6[0].created === true)
}

/* B3. batch marking + unmark + getEntry */
{
  const batch = await markStudy(userA.id, {
    items: [
      { scope: 'chapter', refId: fmCh2.key },
      { scope: 'chapter', refId: alCh1.key },
    ],
    action: 'study',
  })
  check('B3a: batch marks answer per-item', batch.length === 2 && batch.every((r) => r.ok && r.created))

  const e1 = await getEntry(userA.id, 'chapter', fmCh2.key)
  check('B3b: getEntry returns the resolved entry', e1?.refId === fmCh2.key && e1?.label.startsWith('Chapter 2'))
  const eNone = await getEntry(userB.id, 'chapter', fmCh2.key)
  check('B3c: getEntry is user-scoped (B sees nothing)', eNone === null)

  const un = await markStudy(userA.id, { items: [{ scope: 'chapter', refId: alCh1.key }], action: 'unmark' })
  check('B3d: unmark reports deleted', un[0].ok && un[0].deleted === true)
  const un2 = await markStudy(userA.id, { items: [{ scope: 'chapter', refId: alCh1.key }], action: 'unmark' })
  check('B3e: unmark is idempotent', un2[0].ok && un2[0].deleted === false)
  const gone = await getEntry(userA.id, 'chapter', alCh1.key)
  check('B3f: entry gone after unmark', gone === null)
}

/* B4. backdate entries to force due/overdue states, then overview */
{
  const backdate = DAY_MS * 30
  await db.studyEntry.update({
    where: { userId_scope_refId: { userId: userA.id, scope: 'chapter', refId: fmCh1.key } },
    data: { dueAt: new Date(Date.now() - backdate), lastAt: new Date(Date.now() - backdate - 5 * DAY_MS), intervalDays: 7 },
  })
  await db.studyEntry.update({
    where: { userId_scope_refId: { userId: userA.id, scope: 'chapter', refId: fmCh2.key } },
    data: { dueAt: new Date(Date.now() - DAY_MS * 2), intervalDays: 5 },
  })

  const ov = await getOverview(userA.id)
  check('B4a: overview lists all entries', ov.entries.length === 4, ov.entries.length)

  const due = ov.queue.filter((q) => q.overdueDays > 0)
  check('B4b: overdue chapter leads the queue with a reason', due.length > 0 && ov.queue[0].refId === fmCh1.key && ov.queue[0].reason.includes('Due'), ov.queue[0]?.reason)
  check('B4c: summary counts due items', ov.summary.dueCount === ov.queue.filter((q) => new Date(q.dueAt).getTime() <= Date.now()).length)

  check('B4d: chapter rollup counts lessonsStudied', (ov.entries.find((e) => e.refId === fmCh1.key)?.lessonsStudied ?? 0) === 1)
  check('B4e: orphan lesson appears in the queue exactly once', ov.queue.filter((q) => q.refId === alLesson).length === 1)
  check('B4e2: lesson under a tracked chapter is not duplicated into the queue', ov.queue.filter((q) => q.refId === lesson1).length === 0)

  check('B4f: activity calendar is 84 zero-filled days', ov.activity.length === 84 && ov.activity.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date)))
  check('B4g: today has study events', ov.activity.at(-1)!.count >= 4, ov.activity.at(-1))
  check('B4h: active days counted', ov.summary.activeDays >= 1)
  check('B4i: revisions7d counts non-first events', ov.summary.revisions7d >= 2, ov.summary.revisions7d)
  check('B4j: lastActivity is today', ov.summary.lastActivity !== null && new Date(ov.summary.lastActivity).toDateString() === new Date().toDateString())

  check('B4k: histogram partitions all catalog chapters', ov.masteryHistogram.reduce((n, h) => n + h.count, 0) === CATALOG.chapters.length, ov.masteryHistogram)
  check('B4l: some chapters are new for a light ledger', (ov.masteryHistogram.find((h) => h.state === 'new')?.count ?? 0) > 0)

  const fm = ov.bookBreakdown.find((b) => b.bookId === 'foundation-mathematics')!
  check('B4m: book breakdown — FM chapters studied 2 of total', fm.chaptersStudied === 2 && fm.chaptersTotal === CATALOG.books.find((b) => b.bookId === 'foundation-mathematics')!.chapterKeys.length)
  check('B4n: book breakdown counts lessons + due', fm.lessonsStudied === 1 && fm.dueCount >= 1)

  check('B4o: least-revised chapters sorted ascending by passes', ov.leastRevised.chapters.every((c, i) => i === 0 || ov.leastRevised.chapters[i - 1].passes <= c.passes))
  check('B4p: recent events resolve labels & urls', ov.recentEvents.length > 0 && ov.recentEvents.every((e) => e.label.includes('·') && e.url.startsWith('/book/')))
  check('B4q: estMins sums due revision estimates', ov.summary.estMins > 0)

  const compact = await getSummaryCompact(userA.id)
  check('B4r: compact summary agrees with due count', compact.dueCount === ov.summary.dueCount, { compact, full: ov.summary.dueCount })
  const compactB = await getSummaryCompact(userB.id)
  check('B4s: compact summary isolated per user', compactB.dueCount === 0 && compactB.studiedChapters === 0)
}

/* B5. cross-user isolation on the service level */
{
  const ovB = await getOverview(userB.id)
  check('B5a: user B overview is empty', ovB.entries.length === 0 && ovB.queue.length === 0 && ovB.summary.studiedChapters === 0)
  const r = await markStudy(userB.id, { items: [{ scope: 'chapter', refId: fmCh1.key }], action: 'study' })
  check('B5b: user B can mark independently', r[0].ok && r[0].created === true && r[0].entry?.passes === 1)
  const ovA = await getOverview(userA.id)
  check('B5c: user A passes unaffected by B', (ovA.entries.find((e) => e.refId === fmCh1.key)?.passes ?? 0) === 2)
}

/* B6. the knowledge graph — structure + overlay */
{
  const gA = await getGraph(userA.id)
  const gB = await getGraph(userB.id)
  check('B6a: one node per catalog lesson', gA.nodes.length === CATALOG.lessons.length && gB.nodes.length === CATALOG.lessons.length)

  const declared = CATALOG.lessons.reduce((n, l) => n + l.prerequisites.filter((p) => CATALOG.lessonById.has(p)).length, 0)
  check('B6b: every declared prerequisite is an edge', gA.stats.prereqEdges === declared, { got: gA.stats.prereqEdges, declared })

  const sequence = CATALOG.chapters.reduce((n, c) => n + Math.max(0, c.lessonRecordIds.length - 1), 0)
  check('B6c: sequence edges = in-chapter adjacency', gA.stats.sequenceEdges === sequence)

  check('B6d: bridges capped at 80 and weighted ≥ 0.3', gA.stats.bridgeEdges <= 80 && gA.edges.filter((e) => e.kind === 'bridge').every((e) => e.weight >= 0.3))
  const bridgePairs = gA.edges.filter((e) => e.kind === 'bridge')
  const crossChapter = bridgePairs.every((e) => {
    const a = CATALOG.lessonById.get(e.source)!
    const b = CATALOG.lessonById.get(e.target)!
    return !(a.bookId === b.bookId && a.chapterNumber === b.chapterNumber)
  })
  check('B6e: bridges only cross chapters', crossChapter)
  check('B6f: total edges = sum of parts', gA.stats.edges === gA.stats.prereqEdges + gA.stats.sequenceEdges + gA.stats.bridgeEdges)

  const overlaid = gA.nodes.find((n) => n.id === lesson1)!
  check('B6g: studied lesson carries the overlay', overlaid.studied === true && overlaid.passes === 2 && overlaid.state === 'familiar', overlaid)
  const fresh = gA.nodes.find((n) => n.id === lesson2)!
  check('B6h: unstudied lesson is honestly new', fresh.studied === false && fresh.state === 'new' && fresh.passes === undefined)
  const overlaidB = gB.nodes.find((n) => n.id === lesson1)!
  check('B6i: graph overlay is per-user', overlaidB.studied === false)

  check('B6j: chapters carry study stats', gA.chapters.length === CATALOG.chapters.length && gA.chapters.every((c) => c.lessonIds.length > 0))
  const ch1 = gA.chapters.find((c) => c.key === fmCh1.key)!
  check('B6k: chapter stats count studied lessons', ch1.lessonsStudied === 1 && ch1.passes === 2)
  check('B6l: prereq edges point prereq → dependent', gA.edges.filter((e) => e.kind === 'prereq').every((e) => CATALOG.lessonById.get(e.target)!.prerequisites.includes(e.source)))
}

/* B7. determinism — two graph builds produce identical edges */
{
  const g1 = await getGraph(userA.id)
  const g2 = await getGraph(userA.id)
  check('B7a: graph build is deterministic', JSON.stringify(g1.edges) === JSON.stringify(g2.edges))
}

await cleanup()

/* ================================================================== */

console.log(`\nverify-revision: ${pass}/${pass + fail} checks ${fail === 0 ? 'ALL GREEN' : 'FAILED'}`)
if (fail > 0) {
  console.log('Failures:')
  for (const f of failures) console.log(`  - ${f}`)
  process.exit(1)
}
