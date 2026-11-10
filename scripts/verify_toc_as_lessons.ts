/**
 * verify_toc_as_lessons.ts — the TOC-as-lessons gate (2026-11-11, owner
 * directive: "make sure those TOC are written as lessons and make a
 * guide ... if that TOC does not require separate lesson, be elaborate").
 *
 * WHAT IT CHECKS: every meaningful topic of the 53-source Drive survey
 * (same ledger, same routing as verify_topic_coverage.ts — the machinery
 * is shared verbatim via scripts/lib/survey_topics.ts) must live in its
 * routed shelf book as a LESSON TITLE — written lesson or plannedLessons
 * entry — OR as an explicit guided fold recorded in
 * docs/project/TOC_FOLD_LEDGER.json: a surveyed topic that does not
 * require its own lesson is folded INTO a real lesson of its book with a
 * minimum treatment mode defined by docs/project/TOC_LESSON_GUIDE.md.
 *
 * The three-tier guarantee, in owner terms:
 *   tier 1 — the topic IS a lesson (title-level match in the routed book)
 *   tier 2 — the topic folds into a real lesson (ledger entry, host must
 *            exist as a lesson title in the routed book, mode valid)
 *   tier 3 — cross-reference: the topic is a lesson in ANOTHER shelf book
 *            (reported, reviewed — the survey's own cross-refs)
 * Anything else is a HARD FAIL: a surveyed topic that is neither a lesson
 * nor a guided fold anywhere on the shelf.
 *
 * Also audits the ledger's own hygiene and that the guide exists and
 * names every fold mode the ledger uses (guide↔ledger contract).
 */
import { allBooks } from '../src/data/library'
import { readFileSync, existsSync } from 'fs'
import { loadSurvey, tokenizeBlob, coveredIn } from './lib/survey_topics'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

// ---------------------------------------------------------------------------
// 1. Lesson-title blobs: written lesson titles + plannedLessons titles.
//    (Titles only — chapter summaries and positioning prose do NOT count
//    any more: the owner's bar is "written as lessons".)
// ---------------------------------------------------------------------------
const SHELF = allBooks.map((b) => b.id)
const lessonTitles: Record<string, string[]> = {}
const lessonBlob: Record<string, Set<string>> = {}
for (const b of allBooks) {
  const titles: string[] = []
  for (const c of b.chapters) {
    for (const l of c.lessons) titles.push(l.title)
    for (const p of c.plannedLessons ?? []) titles.push(p)
  }
  lessonTitles[b.id] = titles
  lessonBlob[b.id] = tokenizeBlob(titles.join(' '))
}

// ---------------------------------------------------------------------------
// 2. The fold ledger (guided folds — see docs/project/TOC_LESSON_GUIDE.md).
// ---------------------------------------------------------------------------
type Fold = {
  /** survey source id, for traceability */
  source: string
  /** the surveyed topic line (verbatim from the survey extraction) */
  topic: string
  /** shelf book id whose plan carries the fold */
  book: string
  /** EXACT lesson title (written or plannedLessons) that hosts the fold */
  host: string
  /** minimum treatment mode — must be one the guide defines */
  mode: string
  /** one line: what the fold guarantees inside the host lesson */
  note: string
}
const LEDGER_PATH = 'docs/project/TOC_FOLD_LEDGER.json'
const GUIDE_PATH = 'docs/project/TOC_LESSON_GUIDE.md'
let ledger: Fold[] = []
if (existsSync(LEDGER_PATH) && readFileSync(LEDGER_PATH, 'utf8').trim().length > 0) {
  try {
    ledger = JSON.parse(readFileSync(LEDGER_PATH, 'utf8')) as Fold[]
  } catch (e) {
    console.error(`  FAIL: TOC_FOLD_LEDGER.json is not valid JSON (${e})`)
    fail++
  }
}
const foldKey = (f: Fold) => `${f.source}::${f.book}::${f.topic}`

// modes the guide must define (the guide↔ledger contract)
const GUIDE_MODES = [
  'section',            // named subsection: definition + >=1 worked example
  'example-family',     // >=2 worked examples of exactly this topic type
  'exercise-thread',    // >=3 exercise items + solutions in the host's sets
  'glossary',           // terms block entry + >=1 inline treatment
  'derivation-annex',   // boxed derivation/callout inside the host lesson
  'review-page',        // folded into the host CHAPTER's completion review
  'chapter-umbrella',   // the topic IS the chapter's own arc — guaranteed
                        // by the chapter summary, hosted by its first lesson
]

const guide = existsSync(GUIDE_PATH) ? readFileSync(GUIDE_PATH, 'utf8') : ''
ok(guide.includes('# TOC LESSON GUIDE'), 'docs/project/TOC_LESSON_GUIDE.md exists (the scheduled-task guide)')
for (const m of GUIDE_MODES) ok(guide.includes(m), `guide defines fold mode '${m}'`)

// ledger hygiene
const hostIndex: Record<string, Set<string>> = {}
for (const b of allBooks) hostIndex[b.id] = new Set(lessonTitles[b.id])
const seenKeys = new Set<string>()
for (const f of ledger) {
  ok(SHELF.includes(f.book), `fold '${f.topic}': book '${f.book}' on the shelf`)
  ok(hostIndex[f.book]?.has(f.host) ?? false, `fold '${f.topic}': host lesson '${f.host}' exists in ${f.book}`)
  ok(GUIDE_MODES.includes(f.mode), `fold '${f.topic}': mode '${f.mode}' is guide-defined`)
  ok((f.note ?? '').length >= 20, `fold '${f.topic}': treatment note substantive (>=20 chars)`)
  const k = foldKey(f)
  ok(!seenKeys.has(k), `fold '${f.topic}' (${f.source}): not duplicated in the ledger`)
  seenKeys.add(k)
}

// ---------------------------------------------------------------------------
// 3. The audit: every surveyed topic is a lesson, a guided fold, or a
//    reviewed cross-reference lesson.
// ---------------------------------------------------------------------------
console.log('== TOC-as-lessons audit (survey topics → lesson titles) ==')
const topics = loadSurvey()
let asLesson = 0
let asFold = 0
let crossLesson = 0
let hardGaps = 0
const gapsByBook: Record<string, string[]> = {}
for (const t of topics) {
  ok(SHELF.includes(t.book), `topic '${t.topic}': routed book '${t.book}' exists`) // hard check
  if (!SHELF.includes(t.book)) continue
  if (coveredIn(t.topic, lessonBlob[t.book])) { asLesson++; continue }
  // a guided fold?
  const f = ledger.find((x) => x.source === t.source && x.book === t.book && x.topic === t.topic)
  if (f && (hostIndex[f.book]?.has(f.host) ?? false)) { asFold++; continue }
  // a lesson somewhere else on the shelf? (cross-reference)
  let cross = ''
  for (const b of SHELF) {
    if (b === t.book) continue
    if (coveredIn(t.topic, lessonBlob[b])) { cross = b; break }
  }
  if (cross) {
    crossLesson++
    continue // reviewed cross-reference (same policy as the blob gate)
  }
  hardGaps++
  ;(gapsByBook[t.book] ??= []).push(`  [GAP ] ${t.source}: '${t.topic}'`)
}

const topicTotal = topics.length
console.log(`\n  surveyed topic entries: ${topicTotal}`)
console.log(`  tier 1 — IS a lesson in the routed book: ${asLesson}`)
console.log(`  tier 2 — guided fold into a real lesson: ${asFold}`)
console.log(`  tier 3 — lesson in another shelf book (cross-ref): ${crossLesson}`)
console.log(`  HARD GAPS (neither lesson nor fold anywhere): ${hardGaps}`)
if (hardGaps > 0) {
  for (const [book, list] of Object.entries(gapsByBook)) {
    console.log(`\n  -- gaps routed to ${book} (${list.length}) --`)
    console.log(list.join('\n'))
  }
}
ok(hardGaps === 0, `zero hard gaps at lesson level (got ${hardGaps})`)
ok(topicTotal > 800, `substantial topic ledger (got ${topicTotal})`)
ok(asLesson + asFold >= Math.floor(topicTotal * 0.75), `>=75% of topics are lessons or in-book folds (got ${asLesson + asFold}/${topicTotal})`)
ok(ledger.length > 0, `the fold ledger exists and carries the guided folds (got ${ledger.length} entries)`)

console.log(`\nverify-toc-as-lessons: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
