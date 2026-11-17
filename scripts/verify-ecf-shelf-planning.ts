/**
 * verify-ecf-shelf-planning.ts — the Economics-Commerce-Finance shelf's full-planning
 * census gate (REBUILT 2026-11-17 — the gate was referenced-but-missing
 * since the 23-book planning pass of 2026-11-16; the wipe of the
 * un-whitelisted scripts/ made the debt concrete; the rebuild pins the
 * CURRENT census including the 2026-11-17 exam-gap additions of 15 exam-gap + the 2026-11-17 drive-toc continuation (820 -> 973)
 * planned lessons). Mirrors verify-humanities-shelf-planning.ts:
 *
 *  A. 23 economics-commerce books load, status 'planned'
 *  B. per-book chapter census pinned; shelf totals pinned
 *     (195 chapters / 973 planned lessons)
 *  C. planned-chapter hygiene: status/lessons-empty/>=3 plannedLessons/
 *     slugs/summaries/numbers
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. id-prefix reservation: the fecon- micro- macro- ieco- deveco- pubeco- moneco- econ- becon- fineco- bus- acct- cost- corpfin- bank- invest- statecon- busmath- entrep- mktg- hrm- ops- intbus- prefixes unused across
 *     all WRITTEN lesson ids
 *  F. book hygiene: unique ids, accents, level+description+subtitle
 *  G. cross-reference/handoff language present
 *  H. the survey evidence base mentions every book id and the anchors
 *  I. PLANNING-ONLY: zero written lessons in the shelf
 *  J. covers: every book has its AI cover asset
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'

const roster = existsSync('scripts/gen_covers.py') ? readFileSync('scripts/gen_covers.py', 'utf8') : ''
// genuine single-word TOC registers (the 2026-11-17 drive-toc continuation):
// Hammer's German modal particles (english book) + chemistry element/family
// singles + the mechanics machines register — junk fragments were removed
// from the books; these survivors are real topics shorter than 6 chars.
const SHORT_OK = new Set(['Auch', 'Bloß', 'Denn', 'Doch', 'Eben', 'Erst', 'Etwa', 'Halt', 'Noch', 'Ruhig', 'Wohl', 'Zwar', 'Gears', 'Alums', 'Lead', 'Coal', 'Gene', 'Gels', 'P4S3', 'P4S10'])


let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const EXPECTED_CHAPTERS: Record<string, number> = { 'accounting': 8, 'banking': 8, 'behavioural-economics': 7, 'business-mathematics': 8, 'business-studies': 8, 'cost-accounting': 8, 'development-economics': 8, 'econometrics': 9, 'entrepreneurship': 8, 'financial-economics': 8, 'financial-management-and-corporate-finance': 11, 'foundation-economics': 10, 'human-resource-management': 8, 'international-business': 8, 'international-economics': 9, 'investment-analysis': 8, 'macroeconomics': 10, 'marketing': 8, 'microeconomics': 11, 'monetary-economics': 8, 'operations-management': 8, 'public-economics': 9, 'statistics-for-economics': 7 }

console.log('== A. shelf load & statuses ==')
const shelf = allBooks.filter((b) => b.discipline === 'economics-commerce')
ok(shelf.length === 23, `23 economics-commerce books (got ${shelf.length})`)
ok(shelf.every((b) => b.status === 'planned'), 'every economics-commerce book status planned')

console.log('== B. the honest census (per book) ==')
let totCh = 0
let totPl = 0
for (const b of shelf) {
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  totCh += b.chapters.length
  totPl += pl
  console.log(`  ${b.id.padEnd(40)} ${b.status.padEnd(9)} ${String(b.chapters.length).padStart(2)} ch  ${String(pl).padStart(3)} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
}
ok(totCh === 195, `shelf total 195 chapters (got ${totCh})`)
ok(totPl === 973, `shelf total 973 planned lessons (got ${totPl})`)

console.log('== C. planned-chapter hygiene ==')
for (const b of shelf) {
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
for (const b of shelf) {
  const titles = b.chapters.flatMap((c) => c.plannedLessons ?? [])
  ok(titles.every((t) => t.trim().length > 5 || SHORT_OK.has(t)), `${b.id} lesson titles non-trivial`)
  const set = new Set(titles)
  ok(set.size === titles.length, `${b.id} lesson titles unique (${titles.length} total)`)
}

console.log('== E. id-prefix reservation (planning-only shelf) ==')
const PREFIXES = ['fecon-', 'micro-', 'macro-', 'ieco-', 'deveco-', 'pubeco-', 'moneco-', 'econ-', 'becon-', 'fineco-', 'bus-', 'acct-', 'cost-', 'corpfin-', 'bank-', 'invest-', 'statecon-', 'busmath-', 'entrep-', 'mktg-', 'hrm-', 'ops-', 'intbus-']
const writtenIds: string[] = []
for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
const writtenSet = new Set(writtenIds)
ok(writtenSet.size === writtenIds.length, `written lesson ids globally unique (${writtenIds.length})`)
for (const p of PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `economics-commerce prefix '${p}' unused by written lessons`)
}
const mathWritten = writtenIds.filter((id) => /^(fm-|ans-|al-|aa-)/.test(id)).length
ok(mathWritten > 0, `the written maths spine still present (${mathWritten} lessons)`)

console.log('== F. book hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique (269 books)')
for (const b of shelf) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 250, `${b.id} level+description present (>=250 chars, the pass's honest floor)`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of shelf) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep|cross-reference/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/ECF_TOC_SURVEY.md', 'utf8')
for (const id of Object.keys(EXPECTED_CHAPTERS)) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.includes('UGC NET Economics') && survey.includes('UGC NET Commerce'), 'survey records the UGC NET Economics + Commerce unit anchors')
ok(survey.length > 3_000, `survey substantial (${survey.length} chars)`)

console.log('== I. planning-only guarantee ==')
const written = shelf.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(written === 0, 'zero written lessons in the whole shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of shelf) {
  ok(existsSync(`public/covers/${b.id}.webp`), `${b.id} cover asset present`)
}

console.log(`\nverify-ecf-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
