/**
 * verify-physics-shelf-planning.ts — the Physics shelf's full-planning
 * census gate (REBUILT 2026-11-17 — the gate was referenced-but-missing
 * since the 19-book planning pass of 2026-11-16; the wipe of the
 * un-whitelisted scripts/ made the debt concrete; the rebuild pins the
 * CURRENT census including the 2026-11-17 exam-gap additions of 34 exam-gap + the 2026-11-17 drive-toc continuation (754 -> 1,549)
 * planned lessons). Mirrors verify-humanities-shelf-planning.ts:
 *
 *  A. 19 physics books load, status 'planned'
 *  B. per-book chapter census pinned; shelf totals pinned
 *     (172 chapters / 1549 planned lessons)
 *  C. planned-chapter hygiene: status/lessons-empty/>=3 plannedLessons/
 *     slugs/summaries/numbers
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. id-prefix reservation: the pf- pmech- prop- wav- heat- emag- emt- opt- mod- qm- atom- nuc- ssp- statm- rel- astro- part- mph- exp- prefixes unused across
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

const EXPECTED_CHAPTERS: Record<string, number> = { 'astrophysics': 8, 'atomic-physics': 8, 'electricity-and-magnetism': 11, 'electromagnetic-theory': 10, 'experimental-physics': 8, 'foundation-physics': 10, 'heat-and-thermodynamics': 10, 'mathematical-physics': 9, 'mechanics': 12, 'modern-physics': 8, 'nuclear-physics': 9, 'optics': 10, 'particle-physics': 8, 'properties-of-matter': 8, 'quantum-mechanics': 9, 'relativity': 8, 'solid-state-physics': 9, 'statistical-mechanics': 8, 'waves-and-oscillations': 9 }

console.log('== A. shelf load & statuses ==')
const shelf = allBooks.filter((b) => b.discipline === 'physics')
ok(shelf.length === 19, `19 physics books (got ${shelf.length})`)
ok(shelf.every((b) => b.status === 'planned'), 'every physics book status planned')

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
ok(totCh === 172, `shelf total 172 chapters (got ${totCh})`)
ok(totPl === 1549, `shelf total 1549 planned lessons (got ${totPl})`)

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
const PREFIXES = ['pf-', 'pmech-', 'prop-', 'wav-', 'heat-', 'emag-', 'emt-', 'opt-', 'mod-', 'qm-', 'atom-', 'nuc-', 'ssp-', 'statm-', 'rel-', 'astro-', 'part-', 'mph-', 'exp-']
const writtenIds: string[] = []
for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
const writtenSet = new Set(writtenIds)
ok(writtenSet.size === writtenIds.length, `written lesson ids globally unique (${writtenIds.length})`)
for (const p of PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `physics prefix '${p}' unused by written lessons`)
}
const mathWritten = writtenIds.filter((id) => /^(fm-|ans-|al-|aa-)/.test(id)).length
ok(mathWritten > 0, `the written maths spine still present (${mathWritten} lessons)`)

console.log('== F. book hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique (269 books)')
for (const b of shelf) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 200, `${b.id} level+description present (>=200 chars, the pass's honest floor)`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of shelf) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep|cross-reference/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/PHYSICS_TOC_SURVEY.md', 'utf8')
for (const id of Object.keys(EXPECTED_CHAPTERS)) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.includes('JEE') && survey.includes('NEET') && survey.includes('GATE'), 'survey records the JEE/NEET/GATE exam anchors')
ok(survey.length > 3_000, `survey substantial (${survey.length} chars)`)

console.log('== I. planning-only guarantee ==')
const written = shelf.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(written === 0, 'zero written lessons in the whole shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of shelf) {
  ok(existsSync(`public/covers/${b.id}.webp`), `${b.id} cover asset present`)
}

console.log(`\nverify-physics-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
