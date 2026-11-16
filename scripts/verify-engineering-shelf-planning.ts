/**
 * verify-engineering-shelf-planning.ts — the Engineering full-shelf planning
 * pass gate (2026-11-16, owner directive: "creat all things how like other
 * subjects like maths and cs create it for engineering with books topic same
 * way as like other subject"). Mirrors verify-cs-shelf-planning.ts for the
 * Engineering shelf:
 *
 *  A. all 38 engineering books load, status 'planned' (planning pass only)
 *  B. per-book chapter + planned-lesson census printed; shelf totals pinned
 *     (342 chapters / 1,268 planned lessons — mismatches FAIL below)
 *  C. every planned chapter: status 'planned', empty lessons array,
 *     plannedLessons >= 3, slugs unique within book, numbers 1..N,
 *     summaries > 200 chars
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. the 38 lesson-id prefixes are unused across all WRITTEN lesson ids
 *     AND distinct from the Mathematics and CS shelves' reserved prefixes
 *  F. book ids globally unique; disciplines valid; accents [2, string]
 *  G. cross-reference/handoff language present in every book
 *  H. the survey evidence base exists, is substantial, and mentions every
 *     engineering book id + the folds + the syllabus-audit record
 *  I. PLANNING-ONLY guarantee: zero written lessons in the whole shelf
 *  J. covers: every engineering book has its AI cover asset on disk
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const ENG_PREFIXES = ['mech-', 'som-', 'tom-', 'md-', 'therm-', 'fluid-', 'ht-', 'mfg-',
  'ie-', 'robot-', 'cad-', 'mats-', 'ckt-', 'emach-', 'ps-', 'ctrl-', 'pe-', 'meas-',
  'hv-', 'ren-', 'emf-', 'edc-', 'ae-', 'sig-', 'comm-', 'vlsi-', 'emb-', 'ant-',
  'dsp-', 'str-', 'surv-', 'bmat-', 'soil-', 'trans-', 'env-', 'hyd-', 'wr-', 'cm-']
const ENG_IDS = ['engineering-mechanics', 'strength-of-materials', 'theory-of-machines',
  'machine-design', 'thermodynamics', 'fluid-mechanics', 'heat-transfer',
  'manufacturing-processes', 'industrial-engineering', 'robotics-and-automation',
  'cad-cam', 'materials-science', 'circuit-theory-and-network-analysis',
  'electrical-machines', 'power-systems', 'control-systems', 'power-electronics',
  'electrical-measurements', 'high-voltage-engineering', 'renewable-energy',
  'electromagnetic-fields-and-waves', 'electronic-devices-and-circuits',
  'analog-electronics', 'signals-and-systems', 'analog-and-digital-communication',
  'vlsi-design', 'embedded-systems', 'antennas-and-wave-propagation',
  'digital-signal-processing', 'structural-engineering', 'surveying-and-geomatics',
  'building-materials', 'geotechnical-engineering', 'transportation-engineering',
  'environmental-engineering', 'hydraulics', 'water-resources-engineering',
  'construction-management']
const MATH_RESERVED = ['fm-', 'ans-', 'al-', 'aa-', 'geo-', 'cg-', 'tr-', 'dc-', 'ic-', 'mc-',
  'de-', 'la-', 'dm-', 'nt-', 'st-', 'ml-', 'co-', 'pr-', 'stat-', 'ra-', 'ca-', 'ab-', 'top-',
  'na-', 'em-', 'or-', 'af-', 'qa-']
const CS_PREFIXES = ['cf-', 'dld-', 'coa-', 'asm-', 'ds-', 'alg-', 'toc-', 'cd-', 'os-', 'db-',
  'net-', 'gfx-', 'swe-', 'oop-', 'plp-', 'cprog-', 'cpp-', 'jav-', 'py-', 'js-', 'fed-', 'bed-',
  'fsw-', 'dist-', 'cloud-', 'sec-', 'crypt-', 'ai-', 'mln-', 'dl-', 'nlp-', 'vis-', 'genai-',
  'rl-', 'dsci-', 'bde-', 'mine-', 'ir-', 'bchain-', 'iot-', 'mob-', 'hci-', 'par-', 'acs-']
const EXPECTED_CHAPTERS: Record<string, number> = {
  'engineering-mechanics': 10, 'strength-of-materials': 9, 'theory-of-machines': 10,
  'machine-design': 9, 'thermodynamics': 11, 'fluid-mechanics': 10,
  'heat-transfer': 9, 'manufacturing-processes': 11, 'industrial-engineering': 8,
  'robotics-and-automation': 8, 'cad-cam': 8, 'materials-science': 10,
  'circuit-theory-and-network-analysis': 10, 'electrical-machines': 8,
  'power-systems': 10, 'control-systems': 10, 'power-electronics': 8,
  'electrical-measurements': 9, 'high-voltage-engineering': 8, 'renewable-energy': 7,
  'electromagnetic-fields-and-waves': 10, 'electronic-devices-and-circuits': 9,
  'analog-electronics': 9, 'signals-and-systems': 9, 'analog-and-digital-communication': 10,
  'vlsi-design': 10, 'embedded-systems': 8, 'antennas-and-wave-propagation': 8,
  'digital-signal-processing': 8, 'structural-engineering': 10,
  'surveying-and-geomatics': 8, 'building-materials': 8, 'geotechnical-engineering': 10,
  'transportation-engineering': 8, 'environmental-engineering': 8, 'hydraulics': 9,
  'water-resources-engineering': 9, 'construction-management': 8,
}

console.log('== A. shelf load & statuses ==')
const eng = allBooks.filter((b) => b.discipline === 'engineering')
ok(eng.length === 38, `38 engineering books (got ${eng.length})`)
ok(allBooks.length === 139, `library now 139 books: 28 math + 44 CS + 38 engineering + 16 humanities + 13 languages (got ${allBooks.length})`)
ok(ENG_IDS.length === 38 && ENG_PREFIXES.length === 38, 'the id/prefix rosters pin 38 entries each')
ok(eng.every((b) => b.status === 'planned'), 'every engineering book status planned')

console.log('== B. the honest census (per book) ==')
const census: Record<string, { chapters: number; plannedLessons: number }> = {}
let totCh = 0
let totPl = 0
for (const b of eng) {
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  const wr = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  census[b.id] = { chapters: b.chapters.length, plannedLessons: pl + wr }
  totCh += b.chapters.length
  totPl += pl + wr
  console.log(`  ${b.id.padEnd(40)} ${b.status.padEnd(9)} ${String(b.chapters.length).padStart(2)} ch  ${String(pl).padStart(3)} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
}
ok(totCh === 342, `shelf total 342 chapters (got ${totCh})`)
ok(totPl === 1268, `shelf total 1,268 planned lessons (got ${totPl})`)

console.log('== C. planned-chapter hygiene ==')
for (const b of eng) {
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
for (const b of eng) {
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
for (const p of ENG_PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `engineering prefix '${p}' unused by written lessons`)
}
for (const p of [...MATH_RESERVED, ...CS_PREFIXES]) {
  ok(!ENG_PREFIXES.some((q) => q === p), `engineering prefixes distinct from '${p}'`)
}
for (const p of ['fm-', 'ans-', 'al-', 'aa-']) {
  const count = writtenIds.filter((id) => id.startsWith(p)).length
  ok(count > 0, `existing math prefix '${p}' still present (${count} lessons)`)
}

console.log('== F. book-level hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique')
ok(ENG_IDS.every((id) => ids.has(id)), 'every pinned engineering id exists in the registry')
for (const b of eng) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of eng) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/ENGINEERING_TOC_SURVEY.md', 'utf8')
ok(survey.includes('0 engineering sources'), 'survey records the honest Drive census (0 engineering sources)')
ok(survey.includes('38 books'), 'survey records the 38-book census')
for (const id of ENG_IDS) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.length > 40_000, `survey substantial (${survey.length} chars)`)
ok(survey.includes('ME_2026_Syllabus.pdf') && survey.includes('CE_2026_Syllabus.pdf') &&
   survey.includes('EE_2026_Syllabus.pdf') && survey.includes('EC_2026_Syllabus.pdf'),
   'survey records the four GATE 2026 syllabus anchors')
ok(survey.includes('digital-logic-design') && survey.includes('assembly-and-microprocessors'),
   'survey records the two cross-shelf folds')

console.log('== I. planning-only guarantee ==')
const engWritten = eng.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(engWritten === 0, 'zero written lessons in the whole engineering shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of eng) {
  ok(existsSync(`public/covers/${b.id}.webp`), `${b.id} cover asset present`)
}

// ---- summary ----
console.log(`\nverify-engineering-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
