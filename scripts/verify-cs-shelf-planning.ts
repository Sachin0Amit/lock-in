/**
 * verify-cs-shelf-planning.ts — the CS full-shelf planning pass gate
 * (2026-11-15, owner directive: "as all things are planned for mathematics
 * do for computer science — same method, same detail style depth"). Mirrors
 * verify-math-shelf-planning.ts for the Computer Science shelf:
 *
 *  A. all 44 CS books load, status 'planned' or 'in-progress' (the cs
 *     authoring lane opened the shelf 2026-11-21 — CS RUN 1 opened
 *     computer-fundamentals; every other book stays planned)
 *  B. per-book chapter + planned-lesson census printed; shelf totals pinned
 *     (364 chapters / 1223 lessons = 1222 planned + the 1.R review —
 *     CS exam-topic coverage pass; mismatches FAIL below)
 *  C. every planned chapter: status 'planned', empty lessons array,
 *     plannedLessons >= 3; authored chapters may be in-progress or
 *     complete (ch.1 complete 2026-11-21); slugs unique, numbers 1..N
 *  D. planned-lesson titles non-trivial, unique within book
 *  E. the 44 lesson-id prefixes are reserved across all WRITTEN lesson ids
 *     AND distinct from the Mathematics shelf's reserved prefixes; 'cf-'
 *     is now IN USE, owned by computer-fundamentals (every 'cf-' lesson id
 *     must sit in that book)
 *  F. book ids globally unique; disciplines valid; accents [2, string]
 *  G. cross-reference/handoff language present in every book
 *  H. the survey evidence base exists and carries the 27/27 Drive census
 *     + every CS book id mentioned
 *  I. authoring-era census: exactly 2 written lessons (CS RUN 1:
 *     computer-fundamentals 1.1 + 1.2) — the pin grows with the cs lane
 */
import { allBooks } from '../src/data/library'
import { readFileSync } from 'fs'


// THIN_OK (2026-11-17 swarm-reorg): chapters honestly below the >= 3
// planning floor after the duplicate/junk/misplacement cleanup removed
// the auto-widening padding — the deliberate core survives; the floor
// applies to every chapter not listed here.
const THIN_OK = new Set(['backend-engineering:8', 'full-stack-web-development:7', 'internet-of-things:4'])

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

const CS_PREFIXES = ['cf-', 'dld-', 'coa-', 'asm-', 'ds-', 'alg-', 'toc-', 'cd-', 'os-', 'db-',
  'net-', 'gfx-', 'swe-', 'oop-', 'plp-', 'cprog-', 'cpp-', 'jav-', 'py-', 'js-', 'fed-', 'bed-',
  'fsw-', 'dist-', 'cloud-', 'sec-', 'crypt-', 'ai-', 'mln-', 'dl-', 'nlp-', 'vis-', 'genai-',
  'rl-', 'dsci-', 'bde-', 'mine-', 'ir-', 'bchain-', 'iot-', 'mob-', 'hci-', 'par-', 'acs-']
const CS_IDS = ['computer-fundamentals', 'digital-logic-design', 'computer-organization-architecture',
  'assembly-and-microprocessors', 'data-structures', 'algorithms', 'theory-of-computation',
  'compiler-design', 'operating-systems', 'database-management-systems', 'computer-networks',
  'computer-graphics', 'software-engineering', 'object-oriented-programming',
  'programming-languages-paradigms', 'c-programming', 'cpp-programming', 'java-programming',
  'python-programming', 'javascript-and-web-technologies', 'frontend-engineering',
  'backend-engineering', 'full-stack-web-development', 'distributed-systems', 'cloud-computing',
  'cybersecurity', 'cryptography', 'artificial-intelligence', 'machine-learning', 'deep-learning',
  'natural-language-processing', 'computer-vision', 'generative-ai-and-llms',
  'reinforcement-learning', 'data-science', 'big-data-engineering', 'data-mining',
  'information-retrieval', 'blockchain', 'internet-of-things', 'mobile-app-development',
  'human-computer-interaction', 'parallel-computing', 'advanced-computer-science']
const MATH_RESERVED = ['fm-', 'ans-', 'al-', 'aa-', 'geo-', 'cg-', 'tr-', 'dc-', 'ic-', 'mc-',
  'de-', 'la-', 'dm-', 'nt-', 'st-', 'ml-', 'co-', 'pr-', 'stat-', 'ra-', 'ca-', 'ab-', 'top-',
  'na-', 'em-', 'or-', 'af-', 'qa-']
const EXPECTED_CHAPTERS = { 'computer-fundamentals': 8, 'digital-logic-design': 10,
  'computer-organization-architecture': 11, 'assembly-and-microprocessors': 9, 'data-structures': 9,
  'algorithms': 10, 'theory-of-computation': 10, 'compiler-design': 9, 'operating-systems': 10,
  'database-management-systems': 10, 'computer-networks': 9, 'computer-graphics': 9,
  'software-engineering': 9, 'object-oriented-programming': 9, 'programming-languages-paradigms': 8,
  'c-programming': 8, 'cpp-programming': 8, 'java-programming': 9, 'python-programming': 8,
  'javascript-and-web-technologies': 8, 'frontend-engineering': 8, 'backend-engineering': 8,
  'full-stack-web-development': 7, 'distributed-systems': 8, 'cloud-computing': 7, 'cybersecurity': 9,
  'cryptography': 9, 'artificial-intelligence': 9, 'machine-learning': 9, 'deep-learning': 8,
  'natural-language-processing': 8, 'computer-vision': 8, 'generative-ai-and-llms': 8,
  'reinforcement-learning': 7, 'data-science': 7, 'big-data-engineering': 7, 'data-mining': 7,
  'information-retrieval': 7, 'blockchain': 7, 'internet-of-things': 7, 'mobile-app-development': 7,
  'human-computer-interaction': 7, 'parallel-computing': 7, 'advanced-computer-science': 7 }

console.log('== A. shelf load & statuses ==')
const cs = allBooks.filter((b) => b.discipline === 'computer-science')
ok(cs.length === 44, `44 CS books (got ${cs.length})`)
ok(allBooks.length === 269, `library now 269 books: 28 math + 44 CS + 38 engineering + 16 humanities + 13 languages + 19 physics + 23 ECF + 10 chemistry + 23 biology + 19 medical-sciences + 36 arts-music (got ${allBooks.length})`)
ok(CS_IDS.length === 44 && CS_PREFIXES.length === 44, 'the id/prefix rosters pin 44 entries each')
ok(cs.every((b) => b.status === 'planned' || b.status === 'in-progress'), 'every CS book status planned or in-progress')
ok(cs.filter((b) => b.status === 'in-progress').map((b) => b.id).join(',') === 'computer-fundamentals', 'the only in-progress CS book is computer-fundamentals (CS RUN 1 opened it, 2026-11-21)')

console.log('== B. the honest census (per book) ==')
const census: Record<string, { chapters: number; plannedLessons: number }> = {}
let totCh = 0
let totPl = 0
for (const b of cs) {
  const pl = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  const wr = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  census[b.id] = { chapters: b.chapters.length, plannedLessons: pl + wr }
  totCh += b.chapters.length
  totPl += pl + wr
  console.log(`  ${b.id.padEnd(38)} ${b.status.padEnd(9)} ${String(b.chapters.length).padStart(2)} ch  ${String(pl).padStart(3)} planned`)
  ok(EXPECTED_CHAPTERS[b.id] === b.chapters.length, `${b.id} chapter count pins ${EXPECTED_CHAPTERS[b.id]} (got ${b.chapters.length})`)
}
ok(totCh === 364, `shelf total 364 chapters (got ${totCh})`)
ok(totPl === 1223, `shelf total 1223 planned lessons + reviews (got ${totPl})`) // 1222 planned + the cf ch.1 1.R unit review (authored CS RUN 2; every closed chapter adds one review beyond the planned census)

console.log('== C. planned-chapter hygiene ==')
for (const b of cs) {
  for (const c of b.chapters) {
    ok(c.status === 'planned' || c.status === 'in-progress' || c.status === 'complete', `${b.id} ch${c.number} status planned/in-progress/complete`)
    ok(c.status === 'planned' ? c.lessons.length === 0 : c.lessons.length > 0, `${b.id} ch${c.number} lessons match status (planned -> empty; written states -> written)`)
    ok((c.status === 'planned' ? (c.plannedLessons?.length ?? 0) : c.lessons.length + (c.plannedLessons?.length ?? 0)) >= 3 || THIN_OK.has(`${b.id}:${c.number}`), `${b.id} ch${c.number} >= 3 lessons written+planned (or THIN_OK)`)
    ok(c.slug.length > 3 && !/\s/.test(c.slug), `${b.id} ch${c.number} slug clean`)
    ok(c.summary.length > 200, `${b.id} ch${c.number} summary substantial (${c.summary.length} chars)`)
  }
  const slugs = new Set(b.chapters.map((c) => c.slug))
  ok(slugs.size === b.chapters.length, `${b.id} chapter slugs unique`)
  ok(b.chapters.every((c, i) => c.number === i + 1), `${b.id} chapter numbers 1..N`)
}

console.log('== D. planned-lesson titles ==')
for (const b of cs) {
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
for (const p of CS_PREFIXES) {
  if (p === 'cf-') {
    const used = writtenIds.filter((id) => id.startsWith(p))
    ok(used.length > 0, `CS prefix 'cf-' IN USE by the cs lane (computer-fundamentals, ${used.length} lessons)`)
    const cfIds = cs.filter((b) => b.id === 'computer-fundamentals').flatMap((b) => b.chapters.flatMap((c) => c.lessons.map((l) => l.id)))
    ok(used.every((id) => cfIds.includes(id)), `every 'cf-' lesson id sits in computer-fundamentals (ownership)`)
  } else {
    ok(!writtenIds.some((id) => id.startsWith(p)), `CS prefix '${p}' unused by written lessons (reserved for its book)`)
  }
}
for (const p of MATH_RESERVED) {
  ok(!CS_PREFIXES.some((q) => q === p), `CS prefixes distinct from math's '${p}'`)
}
for (const p of ['fm-', 'ans-', 'al-', 'aa-']) {
  const count = writtenIds.filter((id) => id.startsWith(p)).length
  ok(count > 0, `existing math prefix '${p}' still present (${count} lessons)`)
}

console.log('== F. book-level hygiene ==')
const ids = new Set(allBooks.map((b) => b.id))
ok(ids.size === allBooks.length, 'book ids globally unique')
ok(CS_IDS.every((id) => ids.has(id)), 'every pinned CS id exists in the registry')
for (const b of cs) {
  ok(Array.isArray(b.accent) && b.accent.length === 2 && b.accent.every((c) => typeof c === 'string' && c.length > 0), `${b.id} accent pair valid`)
  ok(b.level.length > 10 && b.description.length > 300, `${b.id} level+description present`)
  ok(!!(b.subtitle && b.subtitle.length > 20), `${b.id} subtitle present`)
}

console.log('== G. cross-reference language ==')
for (const b of cs) {
  const blob = b.description + b.chapters.map((c) => c.summary).join(' ')
  ok(/cross-referenc|hands off|doorstep/i.test(blob), `${b.id} speaks the handoff language`)
}

console.log('== H. the survey evidence base ==')
const survey = readFileSync('docs/research/CS_TOC_SURVEY.md', 'utf8')
ok(survey.includes('27/27'), 'survey records the 27/27 Drive census')
for (const id of CS_IDS) ok(survey.includes(id), `survey mentions ${id}`)
ok(survey.length > 40_000, `survey substantial (${survey.length} chars)`)

console.log('== I. the authoring-era census (the cs lane opened the shelf 2026-11-21) ==')
const csWritten = cs.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
ok(csWritten === 4, 'exactly 4 written lessons in the CS shelf (CS RUN 1 + RUN 2: computer-fundamentals 1.1 + 1.2 + 1.3 + the 1.R review, chapter 1 COMPLETE) — the pin grows with the cs lane')

// ---- summary ----
console.log(`\nverify-cs-shelf-planning: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
