/**
 * build_exam_ledger.ts — the central exam-ledger builder of the
 * all-disciplines exam/TOC coverage pass (REBUILT 2026-11-17 after the
 * sandbox wipe; the original builders were never git-whitelisted and were
 * lost — see docs/research/EXAM_TOPIC_LEDGERS.md).
 *
 * Pipeline: the research wave writes scripts/ledger_data/<ledger>_raw.json
 * (exam sources + syllabus topic lines, research-only, no routing). THIS
 * script routes every line to the owning shelf book by best token-overlap
 * against the registry plan blob (scripts/ledger_data/registry_blob.json),
 * scores it with the same >=60% significant-token standard as the maths
 * drive-TOC gate and the CS exam pass, and emits
 * scripts/ledger_data/<ledger>.json + a gap report for the content-fix loop.
 *
 * Routing law: home-discipline book first; only if the best home score is
 * below 0.60 may the line cross to the ledger's CROSS_SHELF_CANDIDATES
 * (the honest re-routes, e.g. GATE PH vector calculus ->
 * multivariable-calculus). A line below 0.60 everywhere is a GAP — fixed
 * by adding planned lessons to the owning book (content), never by faking
 * a route. Run: bun scripts/build_exam_ledger.ts
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { allBooks } from '../src/data/library'

const DATA = 'scripts/ledger_data'
const RAW_LEDGERS = [
  { name: 'physics_exams', discipline: 'physics' },
  { name: 'chemistry_exams', discipline: 'chemistry' },
  { name: 'biology_exams', discipline: 'biology' },
  { name: 'medical_exams', discipline: 'medical-sciences' },
  { name: 'ecf_exams', discipline: 'economics-commerce' },
  { name: 'humanities_exams', discipline: 'humanities' },
  { name: 'arts_music_exams', discipline: 'arts-music' },
  { name: 'ese_exams', discipline: 'engineering' },
]

// the honest cross-shelf candidates (the re-route whitelist — mirrors the
// original pass's recorded re-routes; cross only when home < 0.60)
const CROSS_CANDIDATES: Record<string, string[]> = {
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

// ---- token machinery (the >=60% standard) ----
const STOP = new Set(['and', 'or', 'of', 'the', 'in', 'for', 'a', 'an', 'to', 'with',
  'on', 'at', 'by', 'from', 'into', 'as', 'is', 'are', 'be', 'been', 'its', 'it',
  'their', 'this', 'that', 'these', 'those', 'such', 'other', 'others', 'than',
  'then', 'also', 'all', 'any', 'each', 'between', 'under', 'over', 'both',
  'part', 'parts', 'section', 'sections', 'basic', 'basics', 'general', 'study',
  'syllabus', 'topics', 'topic', 'paper', 'ii', 'iii', 'iv', 'v', 'vi',
  // syllabus scaffolding tokens (fix round: '(A Level)', '(HL only)', 'GS-III:')
  'level', 'hl', 'sl', 'only', 'gs'])

function norm(w: string): string {
  let t = w.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (t.length >= 4 && t.endsWith('s') && !t.endsWith('ss')) t = t.slice(0, -1)
  return t
}
function tokens(text: string): string[] {
  return text.split(/[^A-Za-z0-9]+/).map(norm).filter((t) => t.length >= 3 && !STOP.has(t))
}

// ---- registry blobs ----
const blobByBook: Record<string, string> = {}
const tokByBook: Record<string, Set<string>> = {}
for (const b of allBooks) {
  const parts: string[] = [b.title, b.subtitle ?? '', b.description]
  for (const c of b.chapters) {
    parts.push(c.title, c.summary)
    for (const p of c.plannedLessons ?? []) parts.push(p)
    for (const l of c.lessons) parts.push(l.title)
  }
  blobByBook[b.id] = parts.join(' ')
  tokByBook[b.id] = new Set(tokens(parts.join(' ')))
}
const bookById: Record<string, { id: string; discipline: string; title: string }> = {}
for (const b of allBooks) bookById[b.id] = { id: b.id, discipline: b.discipline, title: b.title }

function scoreBook(tt: string[], bookId: string): number {
  if (tt.length === 0) return 0
  const bt = tokByBook[bookId] ?? new Set<string>()
  let hit = 0
  for (const t of new Set(tt)) if (bt.has(t)) hit++
  return hit / new Set(tt).size
}

// ---- the build ----
type RawLedger = { ledger: string; discipline: string; notes?: string[]; exams: { exam: string; sources: { url: string; nature?: string }[]; topics: string[] }[] }

const gapReport: any[] = []
let totalLines = 0
let totalCross = 0
let totalGap = 0

for (const { name, discipline } of RAW_LEDGERS) {
  const rawPath = `${DATA}/${name}_raw.json`
  if (!existsSync(rawPath)) { console.log(`-- ${name}: NO RAW (skipped)`); continue }
  const raw = JSON.parse(readFileSync(rawPath, 'utf8')) as RawLedger
  const homeBooks = allBooks.filter((b) => b.discipline === discipline).map((b) => b.id)
  const crossBooks = CROSS_CANDIDATES[name] ?? []
  const outExams: any[] = []
  let nLines = 0; let nCross = 0; let nGap = 0

  for (const ex of raw.exams) {
    const lines: any[] = []
    const seen = new Set<string>()
    for (const topic of ex.topics) {
      const key = topic.toLowerCase().replace(/[^a-z0-9]+/g, '')
      if (!topic.trim() || key.length < 3 || seen.has(key)) continue
      seen.add(key)
      const tt = tokens(topic)
      // meta-lines (all-stopword topics like "General Topics") are recorded
      // as 'meta' — honest, they carry no subject tokens to route
      if (tt.length === 0) {
        lines.push({ topic, book: '', score: 0, status: 'meta' })
        nLines++
        continue
      }
      // home-discipline best
      let best = { book: '', score: 0 }
      for (const hb of homeBooks) {
        const s = scoreBook(tt, hb)
        if (s > best.score) best = { book: hb, score: s }
      }
      let cross = false
      // honest cross only when home < 0.60
      if (best.score < 0.60) {
        for (const cb of crossBooks) {
          if (!bookById[cb]) continue
          const s = scoreBook(tt, cb)
          if (s >= 0.60 && s >= best.score) { best = { book: cb, score: s }; cross = true }
        }
      }
      const routed = best.score >= 0.60 && best.book !== ''
      if (!routed) {
        // report the best home candidate for the content-fix loop
        let bestHome = { book: homeBooks[0] ?? '', score: 0 }
        for (const hb of homeBooks) { const s = scoreBook(tt, hb); if (s > bestHome.score) bestHome = { book: hb, score: s } }
        nGap++
        gapReport.push({ ledger: name, exam: ex.exam, topic, bestHome: bestHome.book, bestHomeScore: +bestHome.score.toFixed(2) })
        lines.push({ topic, book: bestHome.book, score: +bestHome.score.toFixed(2), status: 'gap' })
      } else {
        if (cross) nCross++
        lines.push({ topic, book: best.book, score: +best.score.toFixed(2), status: cross ? 'cross' : 'direct' })
      }
      nLines++
    }
    outExams.push({ exam: ex.exam, sources: ex.sources ?? [], lines })
  }
  writeFileSync(`${DATA}/${name}.json`, JSON.stringify({
    ledger: name, discipline, notes: raw.notes ?? [],
    built: '2026-11-17', exams: outExams,
  }))
  totalLines += nLines; totalCross += nCross; totalGap += nGap
  console.log(`${name}: ${nLines} lines / ${nCross} cross / ${nGap} GAP`)
}

writeFileSync(`${DATA}/gap_report.json`, JSON.stringify(gapReport, null, 1))
console.log(`\nTOTAL: ${totalLines} lines / ${totalCross} cross / ${totalGap} gaps (see gap_report.json)`)
export {}
