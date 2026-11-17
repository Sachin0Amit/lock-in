/**
 * verify-languages-shelf-planning.ts — the Languages full-shelf planning pass
 * gate (2026-11-16, owner directive: "create all things like you did for
 * engineering do it for humanities and social science and languages section"
 * — the same turn as the Humanities pass). Mirrors verify-engineering-shelf-
 * planning.ts for the Languages shelf:
 *
 *  A. all 13 language books load, status 'planned' (planning pass only)
 *  B. per-book chapter + planned-lesson census printed; shelf totals pinned
 *     (122 chapters / 734 planned lessons after the 2026-11-17 drive-toc continuation (500 -> 734) — mismatches FAIL below)
 *  C. every planned chapter: status 'planned', empty lessons array,
 *     plannedLessons >= 3, slugs unique within book, numbers 1..N,
 *     summaries > 200 chars
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. the 13 lesson-id prefixes are unused across all WRITTEN lesson ids,
 *     distinct from the Mathematics/CS/Engineering shelves' reserved
 *     prefixes AND from the Humanities shelf's prefixes (note `eng-` for
 *     ENGLISH against the engineering shelf which reserves no `eng-`)
 *  F. book ids globally unique; disciplines valid; accents [2, string]
 *  G. cross-reference/handoff language present in every book
 *  H. the survey evidence base exists, is substantial, and mentions every
 *     language book id + the CEFR framework + every official exam register
 *  I. PLANNING-ONLY guarantee: zero written lessons in the whole shelf
 *  J. covers: every language book has its AI cover asset on disk
 *  K. the durable generator exists (the pass's idempotent plan source)
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'

// genuine single-word TOC registers (2026-11-17 drive-toc continuation):
// Hammer's German modal particles — real usage-register entries.
const SHORT_OK = new Set(['Auch', 'Bloß', 'Denn', 'Doch', 'Eben', 'Erst', 'Etwa', 'Halt', 'Noch', 'Ruhig', 'Wohl', 'Zwar'])

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const LANG_PREFIXES = ['eng-', 'hin-', 'sansk-', 'jpn-', 'ger-', 'fr-', 'spa-', 'mand-',
  'kor-', 'arab-', 'rus-', 'port-', 'ita-']
const LANG_IDS = ['english', 'hindi', 'sanskrit', 'japanese', 'german', 'french',
  'spanish', 'mandarin', 'korean', 'arabic', 'russian', 'portuguese', 'italian']
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
const HUM_PREFIXES = ['wh-', 'ih-', 'pol-', 'intl-', 'padm-', 'law-', 'soc-', 'anth-',
  'cult-', 'psy-', 'phil-', 'eth-', 'geog-', 'evs-', 'arch-', 'arth-']
const EXPECTED_CHAPTERS: Record<string, number> = {
  'english': 10, 'hindi': 9, 'sanskrit': 10, 'japanese': 10, 'german': 10,
  'french': 9, 'spanish': 9, 'mandarin': 9, 'korean': 9, 'arabic': 10,
  'russian': 9, 'portuguese': 9, 'italian': 9,
}

console.log('== A. shelf load & statuses ==')
const lang = allBooks.filter((b) => b.discipline === 'languages')
ok(lang.length === 13, `13 language books (got ${lang.length})`)
ok(allBooks.length === 269, `library now 269 books: 28 math + 44 CS + 38 engineering + 16 humanities + 13 languages + 19 physics + 23 ECF + 10 chemistry + 23 biology + 19 medical-sciences + 36 arts-music (got ${allBooks.length})`)
ok(LANG_IDS.length === 13 && LANG_PREFIXES.length === 13, 'the id/prefix rosters pin 13 entries each')
ok(lang.every((b) => b.status === 'planned'), 'every language book status planned')

console.log('== B. the honest census (per book) ==')
let totCh = 0
let totPl = 0
for (const b of lang) {
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  const wr = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  totCh += b.chapters.length
  totPl += pl + wr
  console.log(`  ${b.id.padEnd(40)} ${b.status.padEnd(9)} ${String(b.chapters.length).padStart(2)} ch  ${String(pl).padStart(3)} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
}
ok(totCh === 122, `shelf total 122 chapters (got ${totCh})`)
ok(totPl === 734, `shelf total 734 planned lessons (post the 2026-11-17 drive-toc continuation; got ${totPl})`)

console.log('== C. planned-chapter hygiene ==')
for (const b of lang) {
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
for (const b of lang) {
  const titles = b.chapters.flatMap((c) => c.plannedLessons ?? [])
  ok(titles.every((t) => t.trim().length > 5 || SHORT_OK.has(t)), `${b.id} lesson titles non-trivial`)
  const set = new Set(titles)
  ok(set.size === titles.length, `${b.id} lesson titles unique (${titles.length} total)`)
}

console.log('== E. id-prefix reservation ==')
const writtenIds: string[] = []
for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) writtenIds.push(l.id)
const writtenSet = new Set(writtenIds)
ok(writtenSet.size === writtenIds.length, `written lesson ids globally unique (${writtenIds.length})`)
for (const p of LANG_PREFIXES) {
  ok(!writtenIds.some((id) => id.startsWith(p)), `language prefix '${p}' unused by written lessons`)
}
for (const p of [...MATH_RESERVED, ...CS_PREFIXES, ...ENG_PREFIXES, ...HUM_PREFIXES]) {
  ok(!LANG_PREFIXES.some((q) => q === p), `language prefixes distinct from '${p}'`)
}
for (const p of ['fm-', 'ans-', 'al-', 'aa-']) {
  const count = writtenIds.filter((id) => id.startsWith(p)).length
  ok(count > 0, `existing math prefix '${p}' still present (${count} lessons)`)
}

console.log('== F. book-level hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique')
ok(LANG_IDS.every((id) => ids.has(id)), 'every pinned language id exists in the registry')
for (const b of lang) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of lang) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/LANGUAGES_TOC_SURVEY.md', 'utf8')
const surveyFlat = survey.replace(/\s+/g, ' ') // line-wrap-resilient matching
ok(surveyFlat.includes('0 language-learning sources'), 'survey records the honest Drive census (0 language-learning sources)')
ok(survey.includes('13 books'), 'survey records the 13-book census')
for (const id of LANG_IDS) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.length > 10_000, `survey substantial (${survey.length} chars)`)
ok(survey.includes('CEFR'), 'survey records the CEFR framework anchor')
for (const register of ['JLPT', 'Goethe', 'DELF', 'DALF', 'DELE', 'HSK', 'TOPIK', 'IELTS', 'TOEFL', 'CLEP']) {
  ok(survey.includes(register), `survey records the ${register} exam register`)
}
ok(survey.includes('eng-') && survey.includes('engineering'),
   'survey records the eng- prefix note against the engineering shelf')

console.log('== I. planning-only guarantee ==')
const langWritten = lang.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(langWritten === 0, 'zero written lessons in the whole languages shelf (planning pass only)')

console.log('== J. cover art ==')
for (const b of lang) {
  ok(existsSync(`public/covers/${b.id}.webp`), `${b.id} cover asset present`)
}

console.log('== K. the durable generator ==')
ok(existsSync('scripts/gen_languages_shelf.py'), 'scripts/gen_languages_shelf.py exists (the pass\'s idempotent plan source)')
ok(readFileSync('scripts/gen_languages_shelf.py', 'utf8').includes('122 chapters / 734 planned'), 'generator header pins the shelf census (post drive-toc continuation)')

// ---- summary ----
console.log(`\nverify-languages-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
