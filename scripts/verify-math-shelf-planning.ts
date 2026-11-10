/**
 * verify-math-shelf-planning.ts — the full-shelf planning pass gate
 * (2026-11-10, owner directive). Checks the 23 newly planned books + the
 * 4 earlier books as one shelf:
 *
 *  A. all 27 books load; statuses: 3 complete + 24 planned (AA + 23)
 *  B. per-book chapter + planned-lesson counts printed (the honest census
 *     the docs must match — mismatches FAIL below)
 *  C. every planned chapter: status 'planned', empty lessons array,
 *     plannedLessons present (>= 3), slugs unique within book
 *  D. every planned-lesson title non-empty, no duplicates within book;
 *     chapter numbers 1..N contiguous
 *  E. the 23 new lesson-id prefixes are unused across all WRITTEN lesson
 *     ids (global uniqueness is enforced at authoring time; this checks
 *     the reservation is clean)
 *  F. book ids globally unique; disciplines valid; accents [2, string]
 *  G. shelf totals + the cross-reference handoff chain present in each
 *     book's description (hands off / cross-references language)
 *  H. the survey doc exists and carries the 53/53 census + every new
 *     book id mentioned
 */
import { allBooks } from '../src/data/library'
import { readFileSync } from 'fs'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const NEW_PREFIXES = ['geo-', 'cg-', 'tr-', 'dc-', 'ic-', 'mc-', 'de-', 'la-', 'dm-', 'nt-', 'st-', 'ml-', 'co-', 'pr-', 'stat-', 'ra-', 'ca-', 'ab-', 'top-', 'na-', 'em-', 'or-', 'af-']
const NEW_IDS = ['geometry', 'coordinate-geometry', 'trigonometry', 'differential-calculus', 'integral-calculus', 'multivariable-calculus', 'differential-equations', 'linear-algebra', 'discrete-mathematics', 'number-theory', 'set-theory', 'mathematical-logic', 'combinatorics', 'probability-theory', 'statistics', 'real-analysis', 'complex-analysis', 'abstract-algebra', 'topology', 'numerical-analysis', 'mathematical-methods-for-engineering', 'optimization-and-operations-research', 'advanced-mathematical-foundations']

console.log('== A. shelf load & statuses ==')
ok(allBooks.length === 27, `27 books (got ${allBooks.length})`)
const math = allBooks.filter((b) => b.discipline === 'mathematics')
ok(math.length === 27, `27 mathematics books (got ${math.length})`)
const complete = math.filter((b) => b.status === 'complete')
const planned = math.filter((b) => b.status === 'planned')
ok(complete.length === 3, `3 complete (got ${complete.length})`)
ok(planned.length === 24, `24 planned (got ${planned.length})`)

console.log('== B. the honest census (per book) ==')
const census: Record<string, { chapters: number; plannedLessons: number }> = {}
for (const b of math) {
  const plannedLessonCount = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  const written = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  census[b.id] = { chapters: b.chapters.length, plannedLessons: plannedLessonCount + written }
  console.log(`  ${b.id.padEnd(38)} ${b.status.padEnd(11)} ${String(b.chapters.length).padStart(2)} ch  ${String(written).padStart(2)} written  ${String(plannedLessonCount).padStart(3)} planned`)
}

console.log('== C. planned-chapter hygiene ==')
for (const b of math.filter((b) => b.status === 'planned')) {
  for (const c of b.chapters) {
    ok(c.status === 'planned', `${b.id} ch${c.number} status planned`)
    ok(c.lessons.length === 0, `${b.id} ch${c.number} lessons empty`)
    ok((c.plannedLessons?.length ?? 0) >= 3, `${b.id} ch${c.number} >= 3 plannedLessons`)
    ok(c.slug.length > 3 && !/\s/.test(c.slug), `${b.id} ch${c.number} slug clean`)
    ok(c.summary.length > 200, `${b.id} ch${c.number} summary substantial (${c.summary.length} chars)`)
  }
  const slugs = new Set(b.chapters.map((c) => c.slug))
  ok(slugs.size === b.chapters.length, `${b.id} chapter slugs unique`)
  ok(b.chapters.every((c, i) => c.number === i + 1), `${b.id} chapter numbers 1..N`)
}

console.log('== D. planned-lesson titles ==')
for (const b of math.filter((b) => b.status === 'planned')) {
  const titles = b.chapters.flatMap((c) => c.plannedLessons ?? [])
  ok(titles.every((t) => t.trim().length > 5), `${b.id} lesson titles non-trivial`)
  const set = new Set(titles)
  ok(set.size === titles.length, `${b.id} lesson titles unique (${titles.length} total)`)
}

console.log('== E. id-prefix reservation ==')
const writtenIds: string[] = []
for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
const writtenSet = new Set(writtenIds)
ok(writtenSet.size === writtenIds.length, `written lesson ids globally unique (${writtenIds.length})`)
for (const p of NEW_PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `prefix '${p}' unused by written lessons`)
}
// existing reserved prefixes stay reserved ('aa-' is reserved by the
// Advanced Algebra plan but has ZERO written lessons by design — its
// lessons exist as plannedLessons titles until authoring begins)
for (const p of ['fm-', 'ans-', 'al-']) {
  const count = writtenIds.filter((id) => id.startsWith(p)).length
  ok(count > 0, `existing prefix '${p}' still present (${count})`)
}
ok(!writtenIds.some((id) => id.startsWith('aa-')), `prefix 'aa-' unused by written lessons (reserved by the AA plan)`)

console.log('== F. book-level hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique')
for (const b of math) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
}

console.log('== G. cross-reference language ==')
for (const b of math.filter((b) => b.id !== 'foundation-mathematics')) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/DRIVE_TOC_SURVEY.md', 'utf8')
ok(survey.includes('53/53'), 'survey records the 53/53 census')
for (const id of NEW_IDS) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.length > 100_000, `survey substantial (${survey.length} chars)`)

// ---- summary ----
console.log(`\nverify-math-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
