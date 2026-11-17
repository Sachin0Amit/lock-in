/**
 * verify-humanities-shelf-planning.ts — the Humanities & Social Sciences
 * full-shelf planning pass gate (2026-11-16, owner directive: "create all
 * things like you did for engineering do it for humanities and social science
 * and languages section"). Mirrors verify-engineering-shelf-planning.ts for
 * the Humanities shelf:
 *
 *  A. all 16 humanities books load, status 'planned' (planning pass only)
 *  B. per-book chapter + planned-lesson census printed; shelf totals pinned
 *     (157 chapters / 698 planned lessons after the 2026-11-17 exam-gap + drive-toc continuation (704 -> 698) — mismatches FAIL below)
 *  C. every planned chapter: status 'planned', empty lessons array,
 *     plannedLessons >= 3, slugs unique within book, numbers 1..N,
 *     summaries > 200 chars
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. the 16 lesson-id prefixes are unused across all WRITTEN lesson ids,
 *     distinct from the Mathematics/CS/Engineering shelves' reserved
 *     prefixes AND from the Languages shelf's prefixes
 *  F. book ids globally unique; disciplines valid; accents [2, string]
 *  G. cross-reference/handoff language present in every book
 *  H. the survey evidence base exists, is substantial, and mentions every
 *     humanities book id + the folds + the syllabus-audit record
 *  I. PLANNING-ONLY guarantee: zero written lessons in the whole shelf
 *  J. covers: every humanities book has its AI cover asset on disk
 *  K. the durable generator exists (the pass's idempotent plan source)
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const HUM_PREFIXES = ['wh-', 'ih-', 'pol-', 'intl-', 'padm-', 'law-', 'soc-', 'anth-',
  'cult-', 'psy-', 'phil-', 'eth-', 'geog-', 'evs-', 'arch-', 'arth-']
const HUM_IDS = ['world-history', 'indian-history', 'political-science',
  'international-relations', 'public-administration', 'law-and-legal-studies',
  'sociology', 'anthropology', 'cultural-studies', 'psychology', 'philosophy',
  'ethics', 'geography', 'environmental-studies', 'archaeology-and-heritage-studies',
  'art-history']
const MATH_RESERVED = ['fm-', 'ans-', 'al-', 'aa-', 'geo-', 'cg-', 'tr-', 'dc-', 'ic-', 'mc-',
  'de-', 'la-', 'dm-', 'nt-', 'st-', 'ml-', 'co-', 'pr-', 'stat-', 'ra-', 'ca-', 'ab-', 'top-',
  'na-', 'em-', 'or-', 'af-', 'qa-']
const CS_PREFIXES = ['cf-', 'dld-', 'coa-', 'asm-', 'ds-', 'alg-', 'toc-', 'cd-', 'os-', 'db-',
  'net-', 'gfx-', 'swe-', 'oop-', 'plp-', 'cprog-', 'cpp-', 'jav-', 'py-', 'js-', 'fed-', 'bed-',
  'fsw-', 'dist-', 'cloud-', 'sec-', 'crypt-', 'ai-', 'mln-', 'dl-', 'nlp-', 'vis-', 'genai-',
  'rl-', 'dsci-', 'bde-', 'mine-', 'ir-', 'bchain-', 'iot-', 'mob-', 'hci-', 'par-', 'acs-']
const ENG_PREFIXES = ['mech-', 'som-', 'tom-', 'md-', 'therm-', 'fluid-', 'ht-', 'mfg-',
  'ie-', 'robot-', 'cad-', 'mats-', 'ckt-', 'emach-', 'ps-', 'ctrl-', 'pe-', 'meas-',
  'hv-', 'ren-', 'emf-', 'edc-', 'ae-', 'sig-', 'comm-', 'vlsi-', 'emb-', 'ant-',
  'dsp-', 'str-', 'surv-', 'bmat-', 'soil-', 'trans-', 'env-', 'hyd-', 'wr-', 'cm-']
const LANG_PREFIXES = ['eng-', 'hin-', 'sansk-', 'jpn-', 'ger-', 'fr-', 'spa-', 'mand-',
  'kor-', 'arab-', 'rus-', 'port-', 'ita-']
const EXPECTED_CHAPTERS: Record<string, number> = {
  'world-history': 11, 'indian-history': 12, 'political-science': 10,
  'international-relations': 9, 'public-administration': 9, 'law-and-legal-studies': 10,
  'sociology': 10, 'anthropology': 10, 'cultural-studies': 8, 'psychology': 10,
  'philosophy': 10, 'ethics': 9, 'geography': 12, 'environmental-studies': 8,
  'archaeology-and-heritage-studies': 9, 'art-history': 10,
}

console.log('== A. shelf load & statuses ==')
const hum = allBooks.filter((b) => b.discipline === 'humanities')
ok(hum.length === 16, `16 humanities books (got ${hum.length})`)
ok(allBooks.length === 269, `library now 269 books: 28 math + 44 CS + 38 engineering + 16 humanities + 13 languages + 19 physics + 23 ECF + 10 chemistry + 23 biology + 19 medical-sciences + 36 arts-music (got ${allBooks.length})`)
ok(HUM_IDS.length === 16 && HUM_PREFIXES.length === 16, 'the id/prefix rosters pin 16 entries each')
ok(hum.every((b) => b.status === 'planned'), 'every humanities book status planned')

console.log('== B. the honest census (per book) ==')
let totCh = 0
let totPl = 0
for (const b of hum) {
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  const wr = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  totCh += b.chapters.length
  totPl += pl + wr
  console.log(`  ${b.id.padEnd(40)} ${b.status.padEnd(9)} ${String(b.chapters.length).padStart(2)} ch  ${String(pl).padStart(3)} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
}
ok(totCh === 157, `shelf total 157 chapters (got ${totCh})`)
ok(totPl === 726, `shelf total 726 planned lessons (post the 2026-11-17 UPSC/NET/AP/CLAT exam-gap + drive-toc continuation; got ${totPl})`)

console.log('== C. planned-chapter hygiene ==')
for (const b of hum) {
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
for (const b of hum) {
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
for (const p of HUM_PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `humanities prefix '${p}' unused by written lessons`)
}
for (const p of [...MATH_RESERVED, ...CS_PREFIXES, ...ENG_PREFIXES, ...LANG_PREFIXES]) {
  ok(!HUM_PREFIXES.some((q) => q === p), `humanities prefixes distinct from '${p}'`)
}
for (const p of ['fm-', 'ans-', 'al-', 'aa-']) {
  const count = writtenIds.filter((id) => id.startsWith(p)).length
  ok(count > 0, `existing math prefix '${p}' still present (${count} lessons)`)
}

console.log('== F. book-level hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique')
ok(HUM_IDS.every((id) => ids.has(id)), 'every pinned humanities id exists in the registry')
for (const b of hum) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of hum) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/HUMANITIES_TOC_SURVEY.md', 'utf8')
ok(survey.includes('0 humanities sources'), 'survey records the honest Drive census (0 humanities sources)')
ok(survey.includes('16 books'), 'survey records the 16-book census')
for (const id of HUM_IDS) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.length > 30_000, `survey substantial (${survey.length} chars)`)
ok(survey.includes('General Studies Paper I') && survey.includes('UGC NET') &&
   survey.includes('AP') && survey.includes('CLAT'),
   'survey records the UPSC GS / UGC NET / AP / CLAT exam anchors')
ok(survey.includes('indian-history') && survey.includes('geography') &&
   survey.includes('archaeology-and-heritage-studies'),
   'survey records the three merge folds (period lines, geography pair, heritage studies)')

console.log('== I. planning-only guarantee ==')
const humWritten = hum.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(humWritten === 0, 'zero written lessons in the whole humanities shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of hum) {
  ok(existsSync(`public/covers/${b.id}.webp`), `${b.id} cover asset present`)
}

console.log('== K. the durable generator ==')
ok(existsSync('scripts/gen_humanities_shelf.py'), 'scripts/gen_humanities_shelf.py exists (the pass\'s idempotent plan source)')
ok(readFileSync('scripts/gen_humanities_shelf.py', 'utf8').includes('157 chapters / 698 planned'), 'generator header pins the shelf census (post drive-toc continuation)')

// ---- summary ----
console.log(`\nverify-humanities-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
