/**
 * verify-shelf-exam-topics.ts — THE STANDING GATE of the all-disciplines
 * exam/TOC coverage pass (REBUILT 2026-11-17 after the sandbox wipe; the
 * original gate was never git-whitelisted and was lost with the ledger
 * builders — the rebuild is recorded in docs/research/EXAM_TOPIC_LEDGERS.md).
 *
 * Owner directive: "search for each book, search exam in which those books
 * are used, asked, and see that none of the topics related to those exams
 * are missing in that book" — for each book of ALL disciplines.
 *
 * WHAT IT ENFORCES (fail > 0 exits 1):
 *   A. the eight ledger JSONs exist and carry their sources per exam
 *   B. every syllabus line is routed 'direct' or 'cross' — ZERO 'gap'
 *      statuses (meta-lines are censused separately and must stay rare)
 *   C. the >=60% token standard is re-verified LIVE against the registry:
 *      every direct line re-scores >=0.60 against its owning book blob;
 *      every cross line re-scores >=0.60 against its cross-shelf book AND
 *      <0.60 against every same-discipline book (the honest re-route rule)
 *   D. cross-shelf routes hit only the whitelisted candidates
 *   E. the per-ledger line census pins the current counts (any future
 *      syllabus change must re-derive, not silently drift)
 *   F. the raw research files survive (source-of-truth durability)
 *
 * Run: bunx tsc scripts/verify-shelf-exam-topics.ts --noEmit && bun scripts/verify-shelf-exam-topics.ts
 */
import { readFileSync, existsSync } from 'fs'
import { allBooks } from '../src/data/library'

const DATA = 'scripts/ledger_data'
const LEDGERS = [
  { name: 'physics_exams', discipline: 'physics', lines: 250, cross: 7 }, // 13->7 2026-11-17: the drive-toc continuation's 3,759 new planned lessons pushed six physics cross-lines home (cross only rides home<0.60)
  { name: 'chemistry_exams', discipline: 'chemistry', lines: 310, cross: 0 },
  { name: 'biology_exams', discipline: 'biology', lines: 276, cross: 7 }, // 9->7 2026-11-17: same widening — two bio cross-lines came home
  { name: 'medical_exams', discipline: 'medical-sciences', lines: 140, cross: 3 },
  { name: 'ecf_exams', discipline: 'economics-commerce', lines: 89, cross: 0 },
  { name: 'humanities_exams', discipline: 'humanities', lines: 188, cross: 0 },
  { name: 'arts_music_exams', discipline: 'arts-music', lines: 95, cross: 2 },
  { name: 'ese_exams', discipline: 'engineering', lines: 125, cross: 0 },
]
const CROSS_WHITELIST: Record<string, string[]> = {
  physics_exams: ['multivariable-calculus', 'complex-analysis', 'linear-algebra',
    'differential-equations', 'mathematical-methods-for-engineering', 'numerical-analysis',
    'probability-theory', 'statistics', 'electronic-devices-and-circuits', 'analog-electronics',
    'digital-logic-design', 'control-systems', 'signals-and-systems',
    'electromagnetic-fields-and-waves', 'quantitative-aptitude'],
  chemistry_exams: ['mathematical-methods-for-engineering', 'quantitative-aptitude',
    'biotechnology', 'molecular-biology'],
  biology_exams: ['biochemistry', 'biotechnology', 'industrial-chemistry',
    'genetics', 'microbiology', 'immunology', 'plant-genetics'],
  medical_exams: ['biochemistry', 'genetics', 'microbiology', 'immunology',
    'molecular-biology', 'foundation-physics', 'foundation-chemistry',
    'foundation-biology', 'psychology', 'statistics'],
  ecf_exams: ['business-mathematics', 'statistics', 'quantitative-aptitude',
    'mathematical-methods-for-engineering', 'entrepreneurship'],
  humanities_exams: ['geography', 'psychology', 'sociology', 'anthropology',
    'cultural-studies', 'philosophy', 'ethics', 'environmental-studies',
    'archaeology-and-heritage-studies', 'art-history'],
  arts_music_exams: ['art-history', 'architecture', 'anthropology',
    'cultural-studies', 'creative-writing', 'acoustics'],
  ese_exams: ['mathematical-methods-for-engineering', 'engineering-mechanics',
    'thermodynamics', 'fluid-mechanics', 'materials-science', 'heat-transfer'],
}

const STOP = new Set(['and', 'or', 'of', 'the', 'in', 'for', 'a', 'an', 'to', 'with',
  'on', 'at', 'by', 'from', 'into', 'as', 'is', 'are', 'be', 'been', 'its', 'it',
  'their', 'this', 'that', 'these', 'those', 'such', 'other', 'others', 'than',
  'then', 'also', 'all', 'any', 'each', 'between', 'under', 'over', 'both',
  'part', 'parts', 'section', 'sections', 'basic', 'basics', 'general', 'study',
  'syllabus', 'topics', 'topic', 'paper', 'ii', 'iii', 'iv', 'v', 'vi',
  'level', 'hl', 'sl', 'only', 'gs'])
function norm(w: string): string {
  let t = w.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (t.length >= 4 && t.endsWith('s') && !t.endsWith('ss')) t = t.slice(0, -1)
  return t
}
function tokens(text: string): string[] {
  return text.split(/[^A-Za-z0-9]+/).map(norm).filter((t) => t.length >= 3 && !STOP.has(t))
}

// live registry blobs
const tokByBook: Record<string, Set<string>> = {}
const bookById: Record<string, any> = {}
for (const b of allBooks) {
  bookById[b.id] = b
  const parts: string[] = [b.title, b.subtitle ?? '', b.description]
  for (const c of b.chapters) {
    parts.push(c.title, c.summary)
    for (const p of c.plannedLessons ?? []) parts.push(p)
    for (const l of c.lessons) parts.push(l.title)
  }
  tokByBook[b.id] = new Set(tokens(parts.join(' ')))
}
function score(tt: string[], bookId: string): number {
  if (tt.length === 0) return 0
  const bt = tokByBook[bookId] ?? new Set<string>()
  let hit = 0
  for (const t of new Set(tt)) if (bt.has(t)) hit++
  return hit / new Set(tt).size
}

let pass = 0, fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) pass++
  else { fail++; console.error(`  FAIL: ${label}`) }
}

console.log('== the all-disciplines exam/TOC coverage gate (2026-11-17 rebuild) ==')
let totLines = 0, totCross = 0, totMeta = 0
for (const L of LEDGERS) {
  const path = `${DATA}/${L.name}.json`
  ok(existsSync(path), `${L.name}.json exists`)
  ok(existsSync(`${DATA}/${L.name}_raw.json`), `${L.name}_raw.json survives (research source of truth)`)
  if (!existsSync(path)) continue
  const ledger = JSON.parse(readFileSync(path, 'utf8'))
  const homeBooks = allBooks.filter((b) => b.discipline === L.discipline).map((b) => b.id)
  let nLines = 0, nCross = 0, nMeta = 0
  for (const ex of ledger.exams) {
    ok((ex.sources ?? []).length > 0 && ex.sources.every((s: any) => /https?:\/\/./.test(s.url)),
      `${L.name}/${ex.exam} carries real source URLs`)
    for (const ln of ex.lines) {
      nLines++
      if (ln.status === 'meta') { nMeta++; continue }
      const tt = tokens(ln.topic)
      if (ln.status === 'gap') { ok(false, `${L.name}/${ex.exam} GAP: ${ln.topic}`); continue }
      ok(bookById[ln.book] !== undefined, `${L.name}/${ex.exam} '${ln.topic}' routes to a real book (${ln.book})`)
      if (!bookById[ln.book]) continue
      const s = score(tt, ln.book)
      ok(s >= 0.60, `${L.name}/${ex.exam} '${ln.topic}' re-scores >=0.60 on ${ln.book} (got ${s.toFixed(2)})`)
      if (ln.status === 'cross') {
        nCross++
        ok(CROSS_WHITELIST[L.name]?.includes(ln.book) ?? false,
          `${L.name}/${ex.exam} cross '${ln.topic}' -> ${ln.book} is whitelisted`)
        let maxHome = 0
        for (const hb of homeBooks) maxHome = Math.max(maxHome, score(tt, hb))
        ok(maxHome < 0.60, `${L.name}/${ex.exam} cross '${ln.topic}' honestly had no home >=0.60 (best ${maxHome.toFixed(2)})`)
      } else {
        ok(homeBooks.includes(ln.book), `${L.name}/${ex.exam} direct '${ln.topic}' routes to a ${L.discipline} book`)
      }
    }
  }
  ok(nLines === L.lines, `${L.name} line census pins ${L.lines} (got ${nLines})`)
  ok(nCross === L.cross, `${L.name} cross census pins ${L.cross} (got ${nCross})`)
  totLines += nLines; totCross += nCross; totMeta += nMeta
  console.log(`  ${L.name}: ${nLines} lines (${nCross} cross, ${nMeta} meta) — routing verified live`)
}
ok(totLines === 1473, `the eight-ledger census pins 1,473 syllabus lines (got ${totLines})`)
ok(totCross === 19, `the honest cross-shelf census pins 19 (got ${totCross})`) // 27->19 2026-11-17: the drive-toc continuation widened home coverage; cross-shelf routing stays the sub-0.60-only fallback it always was
ok(totMeta <= 6, `degenerate meta-lines stay rare (${totMeta} seen)`)

console.log(`\nverify-shelf-exam-topics: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
