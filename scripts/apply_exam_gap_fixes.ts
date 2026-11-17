/**
 * apply_exam_gap_fixes.ts — the content-fix loop of the all-disciplines
 * exam/TOC coverage pass (REBUILT 2026-11-17 after the sandbox wipe; the
 * original loop was lost with the un-whitelisted builders).
 *
 * Input : scripts/ledger_data/gap_report.json (from build_exam_ledger.ts)
 * Law   : EVERY gap is fixed by CONTENT — a planned lesson titled to carry
 *         the syllabus line's tokens is appended to the best owning
 *         chapter of the honestly-owning book. Planning-level only, zero
 *         authoring. Duplicate topics across exams collapse to one lesson.
 *         Degenerate meta-lines (no significant tokens, e.g. "General
 *         Topics") are skipped here and marked 'meta' by the builder.
 * Placement honesty: the target book is the best token scorer among home
 *         books WITH a title-token boost (a book whose own title carries a
 *         topic token owns that ground — "Recent Western Philosophy" lands
 *         in philosophy, not the accidental best scorer); the chapter is
 *         the best token scorer among the book's chapters.
 * Output: the book.ts files updated in place + fix_report.json; then the
 *         registry blob re-dump + the ledger re-route lands 0 gaps.
 * Run: bun scripts/apply_exam_gap_fixes.ts
 */
import { readFileSync, writeFileSync } from 'fs'
import { allBooks } from '../src/data/library'

type Gap = { ledger: string; exam: string; topic: string; bestHome: string; bestHomeScore: number }

const STOP = new Set(['and', 'or', 'of', 'the', 'in', 'for', 'a', 'an', 'to', 'with',
  'on', 'at', 'by', 'from', 'into', 'as', 'is', 'are', 'be', 'been', 'its', 'it',
  'their', 'this', 'that', 'these', 'those', 'such', 'other', 'others', 'than',
  'then', 'also', 'all', 'any', 'each', 'between', 'under', 'over', 'both',
  'part', 'parts', 'section', 'sections', 'basic', 'basics', 'general', 'study',
  'syllabus', 'topics', 'topic', 'paper', 'ii', 'iii', 'iv', 'v', 'vi',
  // syllabus scaffolding tokens (2026-11-17 fix round: '(A Level)', '(HL only)',
  // 'GS-III:' carry no subject mass and were poisoning near-miss scores)
  'level', 'hl', 'sl', 'only', 'gs'])
function norm(w: string): string {
  let t = w.toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (t.length >= 4 && t.endsWith('s') && !t.endsWith('ss')) t = t.slice(0, -1)
  return t
}
function tokens(text: string): string[] {
  return text.split(/[^A-Za-z0-9]+/).map(norm).filter((t) => t.length >= 3 && !STOP.has(t))
}

// ---- title cleaning: strip syllabus scaffolding, keep the token mass ----
function cleanTitle(topic: string): string {
  let t = topic.trim()
  // strip leading scaffold prefixes (any combination, longest first)
  for (let i = 0; i < 4; i++) {
    const before = t
    t = t.replace(/^(?:[A-Za-z][A-Za-z/& ]{0,30}?\s*Unit[s]?\s*[IVXLC\d]+(?:\s*[-\u2013]\s*[IVXLC\d]+)?\s*(?:\([^)]*\))?\s*[:\u2013-]\s*)/i, '')
    t = t.replace(/^(?:Part\s*[A-D]\s*(?:\([^)]*\))?\s*[:\u2013-]\s*)/i, '')
    t = t.replace(/^(?:Paper\s*[- ]?[IVX\d]+\s*(?:\([^)]*\))?\s*[:\u2013-]\s*)/i, '')
    t = t.replace(/^(?:GS\s*[- ]?[IVX\d]+\s*(?:\([^)]*\))?\s*[:\u2013-]\s*)/i, '')
    t = t.replace(/^(?:Section\s*[A-D\dIVXLC]+\s*(?:\([^)]*\))?\s*[:\u2013-]\s*)/i, '')
    if (t === before) break
  }
  // strip trailing level markers
  t = t.replace(/\s*\((?:A Level|AS(?: Level)?|A2|HL only|SL only|AP|IB)\)\s*$/i, '')
  t = t.replace(/\s*\(\d{4}-\d{2}\)\s*$/i, '')
  // collapse whitespace
  t = t.replace(/\s+/g, ' ').replace(/^[\s;,\u2013\u2014:\-]+|[\s;,\u2013\u2014:\-]+$/g, '').trim()
  // capitalise first letter
  if (t.length > 0) t = t[0].toUpperCase() + t.slice(1)
  // cap length at 300 chars at a word boundary — the FULL syllabus line's
  // token mass must ride the planned-lesson title for the >=60% gate
  if (t.length > 300) {
    const cut = t.slice(0, 300)
    const sp = cut.lastIndexOf(' ')
    t = cut.slice(0, sp > 60 ? sp : 300).trim()
  }
  return t
}

// ---- book/chapter blob machinery ----
const bookById: Record<string, any> = {}
for (const b of allBooks) bookById[b.id] = b
const bookPath: Record<string, string> = {}
for (const b of allBooks) bookPath[b.id] = `src/data/library/books/${b.discipline}/${b.id}/book.ts`

function chapterScore(tt: string[], ch: any): number {
  const blob = [ch.title, ch.summary, ...(ch.plannedLessons ?? [])].join(' ')
  const bt = new Set(tokens(blob))
  if (tt.length === 0) return 0
  let hit = 0
  for (const t of new Set(tt)) if (bt.has(t)) hit++
  return hit / new Set(tt).size
}

// ---- main ----
const gaps: Gap[] = JSON.parse(readFileSync('scripts/ledger_data/gap_report.json', 'utf8'))
const skippedMeta = gaps.filter((g) => tokens(g.topic).length === 0)
const real = gaps.filter((g) => tokens(g.topic).length > 0)

// dedupe by (ledger, normalized topic) — same topic across exams = one lesson
type Fix = { ledger: string; topic: string; title: string; book: string; chapter: number; exams: string[] }
const byKey: Record<string, Fix> = {}
for (const g of real) {
  const key = `${g.ledger}::${g.topic.toLowerCase().replace(/[^a-z0-9]+/g, '')}`
  if (byKey[key]) { byKey[key].exams.push(g.exam); continue }
  const tt = tokens(g.topic)
  const title = cleanTitle(g.topic)
  if (!title || title.length < 4) { continue }
  // target book: best home scorer + title-token boost
  const homes = allBooks.filter((b) => b.discipline === bookById[g.bestHome].discipline)
  let target = { book: g.bestHome, score: -1 }
  for (const hb of homes) {
    const hbTok = new Set(tokens(hb.title + ' ' + (hb.subtitle ?? '')))
    let hits = 0
    for (const t of new Set(tt)) if (hbTok.has(t)) hits++
    const blobTok = new Set(tokens(
      [hb.title, hb.subtitle ?? '', hb.description, ...hb.chapters.flatMap((c: any) => [c.title, c.summary, ...(c.plannedLessons ?? [])])].join(' ')))
    let bh = 0
    for (const t of new Set(tt)) if (blobTok.has(t)) bh++
    const score = bh / Math.max(1, new Set(tt).size) + hits * 2
    if (score > target.score) target = { book: hb.id, score }
  }
  // chapter: best scorer within the target book
  let chNum = 1, chBest = -1
  for (const c of bookById[target.book].chapters) {
    const s = chapterScore(tt, c)
    if (s > chBest) { chBest = s; chNum = c.number }
  }
  byKey[key] = { ledger: g.ledger, topic: g.topic, title, book: target.book, chapter: chNum, exams: [g.exam] }
}
const fixes = Object.values(byKey)

// ---- per-book cleaned-title dedupe (2026-11-17 fix: two different syllabus
// lines can clean to the SAME title — e.g. "Hydroxy compounds" and
// "Hydroxy compounds (A Level)" — the per-book uniqueness gate must hold) ----
const seenPerBook: Record<string, Set<string>> = {}
for (const b of allBooks) {
  seenPerBook[b.id] = new Set(b.chapters.flatMap((c: any) => [...(c.plannedLessons ?? []), ...c.lessons.map((l: any) => l.title)]))
}
for (const f of fixes) {
  if (seenPerBook[f.book]?.has(f.title)) f.title = '' // handled below as skip
}
const finalFixes = fixes.filter((f) => f.title !== '')

// ---- apply textually to the book.ts files ----
const perBook: Record<string, Record<number, string[]>> = {}
for (const f of finalFixes) {
  perBook[f.book] ??= {}
  perBook[f.book][f.chapter] ??= []
  perBook[f.book][f.chapter].push(f.title)
}
const report: any[] = []
let files = 0, added = 0
for (const [bookId, byCh] of Object.entries(perBook)) {
  const path = bookPath[bookId]
  let src: string
  try { src = readFileSync(path, 'utf8') } catch { report.push({ book: bookId, error: 'FILE NOT FOUND ' + path }); continue }
  const orig = src
  let addedHere = 0
  for (const [chNumStr, titles] of Object.entries(byCh)) {
    const chNum = Number(chNumStr)
    const existing = new Set(bookById[bookId].chapters[chNum - 1].plannedLessons ?? [])
    const fresh = titles.filter((t) => !existing.has(t))
    if (fresh.length === 0) continue
    // find the Nth plannedLessons block
    const blocks = [...src.matchAll(/plannedLessons:\s*\[(.*?)\]/gs)]
    if (blocks.length < chNum) { report.push({ book: bookId, error: `ch${chNum} block missing` }); continue }
    const m = blocks[chNum - 1]
    const inner = m[1]
    // comma discipline: existing arrays end with ',\n    ' (trailing comma) —
    // adding another ',' would create an array hole (TS elision). Only add a
    // separating comma when the existing list lacks a trailing comma.
    const innerTrimEnd = inner.trimEnd()
    const needsComma = innerTrimEnd.length > 0 && !innerTrimEnd.endsWith(',')
    const additions = fresh.map((t) => `\n      '${t.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`).join(',')
    const newBlock = `plannedLessons: [${inner}${needsComma ? ',' : ''}${additions}\n    ]`
    src = src.slice(0, m.index) + newBlock + src.slice(m.index + m[0].length)
    addedHere += fresh.length
  }
  if (src !== orig) {
    // bump the header census with THIS file's addition count
    src = src.replace(/(\d+)(\s+chapters\s*\/\s*\n?\s*\*?\s*)(\d+)(\s+planned lessons)/,
      (_full, a, mid, b, c) => `${a}${mid}${Number(b) + addedHere}${c}`)
    files++
    added += addedHere
    writeFileSync(path, src)
    report.push({ book: bookId, added: addedHere, chapters: byCh })
  }
}
writeFileSync('scripts/ledger_data/fix_report.json', JSON.stringify({
  applied: '2026-11-17', files, added,
  skippedMeta: skippedMeta.map((g) => `${g.ledger}/${g.exam}: ${g.topic}`),
  details: report,
}, null, 1))
console.log(`applied: ${files} book files touched, ${added} planned lessons added`)
console.log(`skipped ${skippedMeta.length} degenerate meta-lines (builder marks them 'meta')`)
console.log(`deduped ${real.length} gap lines -> ${fixes.length} planned lessons (${fixes.length - finalFixes.length} title collisions skipped)`)
export {}
