/**
 * Custom Book Builder — engine verification suite.
 *
 * Verifies the discovery engine, parser, TOC assembly, coverage honesty,
 * prerequisites, dedupe, validation and PDF extraction against the LIVE
 * library registry (no mocks). Run with:
 *
 *   bun run scripts/verify-custom-book-builder.ts
 */
import { readFileSync } from 'node:fs'
import { allBooks, allLessons } from '../src/data/library/index'
import { CATALOG, lessonVersionHash, libraryTree } from '../src/lib/builder/catalog'
import {
  matchParsed,
  matchRequirements,
  normalizeTitle,
  selectionToMatches,
} from '../src/lib/builder/matcher'
import { assemble, buildTocProposal, validateCoverage, validateToc } from '../src/lib/builder/toc'
import { parseTopicList } from '../src/lib/builder/topic-parser'
import { matchExamTemplate, EXAM_TEMPLATES } from '../src/lib/builder/exam-templates'
import { extractPdfTopics } from '../src/lib/builder/pdf-extract'

let pass = 0
let fail = 0
const failures: string[] = []
function check(name: string, condition: boolean): void {
  if (condition) {
    pass++
  } else {
    fail++
    failures.push(name)
  }
}

/* ------------------------------------------------------------------ */
/* A. Catalog                                                          */
/* ------------------------------------------------------------------ */

const writtenLessons = allLessons.length
check(`A1: catalog holds every written lesson (${writtenLessons})`, CATALOG.lessons.length === writtenLessons)
check(
  'A2: catalog record ids are unique',
  new Set(CATALOG.lessons.map((l) => l.recordId)).size === CATALOG.lessons.length,
)
check(
  'A3: every record carries a 16-hex version hash',
  CATALOG.lessons.every((l) => /^[0-9a-f]{16}$/.test(l.versionHash)),
)
const sample = allLessons[10].lesson
check(
  'A4: version hash is deterministic',
  lessonVersionHash(sample) === CATALOG.lessons.find((l) => l.recordId === sample.id)?.versionHash,
)
check(
  'A5: version hash changes when content changes',
  lessonVersionHash({ ...sample, title: `${sample.title} X` }) !== lessonVersionHash(sample),
)
const tree = libraryTree()
check('A6: tree lists all disciplines (11)', tree.length === 11)
check(
  'A7: tree books match the registry',
  tree.reduce((n, d) => n + d.books.length, 0) === allBooks.length,
)
const hcfLessons = CATALOG.lessons.filter((l) =>
  [l.lessonTitle, ...l.concepts, ...l.terms].some((s) => /highest common factor|hcf/i.test(s)),
)
check(`A8: library really contains HCF lessons (${hcfLessons.length} found)`, hcfLessons.length > 0)

/* ------------------------------------------------------------------ */
/* B. Topic-list parser                                                */
/* ------------------------------------------------------------------ */

const osList = `Operating Systems:
1. Introduction to Operating Systems
2. Process Management
3. Process Scheduling
4. Threads
5. Synchronization
6. Deadlocks
7. Memory Management
8. Virtual Memory
9. File Systems
10. I/O Management`
const osParsed = parseTopicList(osList)
check('B1: subject header becomes root name', osParsed.rootName === 'Operating Systems')
check(`B2: ten numbered topics parsed (${osParsed.nodes.length})`, osParsed.nodes.length === 10)
check(
  'B3: numbered topics are plain strings',
  osParsed.nodes.every((n) => !n.children || n.children.length === 0),
)

const nested = `Chapter 1: Numbers
1. Place Value
1.1 Decimal system
1.2 Expanded form
2. Operations
2.1 Addition`
const nestedParsed = parseTopicList(nested)
check('B4: chapter header parsed', nestedParsed.nodes[0]?.topic === 'Numbers')
check(
  `B5: two top-level topics under the chapter (${nestedParsed.nodes[0]?.children?.length})`,
  nestedParsed.nodes[0]?.children?.length === 2,
)
check(
  `B6: nested subtopics attach to their parents (${nestedParsed.nodes[0]?.children?.[0]?.children?.length})`,
  nestedParsed.nodes[0]?.children?.[0]?.children?.length === 2,
)

const multiSubject = `Subject: Mathematics
Chapter 1: Algebra
- Polynomials
- Factorization
Subject: Physics
Chapter 1: Mechanics
- Kinematics`
const msParsed = parseTopicList(multiSubject)
check('B7: explicit subject prefix sets root name', msParsed.rootName === 'Mathematics')
check(
  `B8: subject + chapter sections parsed (${msParsed.nodes.map((n) => n.topic).join(', ')})`,
  msParsed.nodes.length === 3 &&
    msParsed.nodes[0]?.topic === 'Algebra' &&
    msParsed.nodes.some((n) => n.topic === 'Mechanics') &&
    msParsed.nodes.some((n) => n.topic === 'Physics'),
)

/* ------------------------------------------------------------------ */
/* C. Matching engine — honest statuses                                */
/* ------------------------------------------------------------------ */

/* C1: exact title match */
const anyLesson = CATALOG.lessons[7]
const exactRaw = matchParsed({ rootName: 'Test', nodes: [{ topic: anyLesson.lessonTitle }] })
check(
  `C1: exact lesson title match → exact (${anyLesson.lessonTitle})`,
  exactRaw[0]?.score === 1 && exactRaw[0]?.best?.recordId === anyLesson.recordId,
)

/* C2: synonym match */
const gcdRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Greatest Common Divisor' }] })
check(
  `C2: “Greatest Common Divisor” matches the HCF lesson by synonym (status ${gcdRaw[0]?.score})`,
  (gcdRaw[0]?.score ?? 0) >= 0.9 && hcfLessons.some((h) => h.recordId === gcdRaw[0]?.best?.recordId),
)
const lcmRaw = matchParsed({ rootName: '', nodes: [{ topic: 'HCF' }] })
check(
  `C3: “HCF” abbreviation matches by synonym (status ${lcmRaw[0]?.score})`,
  (lcmRaw[0]?.score ?? 0) >= 0.9 && hcfLessons.some((h) => h.recordId === lcmRaw[0]?.best?.recordId),
)

/* C4: missing content is reported honestly */
for (const missing of ['CPU Scheduling', 'Processor Scheduling', 'Scheduling Algorithms', 'Quantum Mechanics', 'Operating Systems']) {
  const r = matchParsed({ rootName: '', nodes: [{ topic: missing }] })
  check(`C4: “${missing}” is Not Available (best=${r[0]?.best?.recordId ?? 'none'})`, !r[0]?.best && r[0]?.score === 0)
}

/* C5: similar-but-unrelated names are NOT matched */
const catsRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Numbers and Cats' }] })
check('C5: “Numbers and Cats” does not match anything', !catsRaw[0]?.best && catsRaw[0]?.score === 0)
const linearAlgebraRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Linear Algebra' }] })
check(
  `C6: “Linear Algebra” is not silently covered by elementary algebra lessons (score ${linearAlgebraRaw[0]?.score})`,
  (linearAlgebraRaw[0]?.score ?? 0) < 0.45,
)

/* C7: chapter expansion */
const factRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Factorization' }] })
const factorChapter = CATALOG.chapters.find((c) => normalizeTitle(c.chapterTitle) === 'factorization')
check(
  `C7: “Factorization” expands to the whole library chapter (${factRaw[0]?.expanded?.recordIds.length ?? 0} lessons vs ${factorChapter?.lessonRecordIds.length ?? '?'})`,
  !!factRaw[0]?.expanded &&
    factRaw[0].expanded?.kind === 'chapter' &&
    factRaw[0].expanded?.recordIds.length === factorChapter?.lessonRecordIds.length,
)

/* C8: book expansion */
const nsRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Number Systems' }] })
const ansBook = CATALOG.books.find((b) => b.bookId === 'arithmetic-and-number-systems')
check(
  `C8: “Number Systems” expands to the ANS book (${nsRaw[0]?.expanded?.recordIds.length ?? 0}/${ansBook?.lessonRecordIds.length})`,
  !!nsRaw[0]?.expanded && nsRaw[0].expanded?.recordIds.length === ansBook?.lessonRecordIds.length,
)

/* C9: prerequisites */
const al52 = CATALOG.lessons.find((l) => l.lessonNumber === '5.2' && l.bookId === 'elementary-algebra')
if (al52) {
  const prereqRaw = matchParsed({ rootName: '', nodes: [{ topic: al52.lessonTitle }] })
  const match = matchRequirements({ rootName: '', nodes: [{ topic: al52.lessonTitle }] })[0]
  check(
    `C9: prerequisites of 5.2 identified (${match?.prerequisiteRecordIds.length ?? '?'} suggested, ${al52.prerequisites.length} declared)`,
    (match?.prerequisitesAvailable ?? false) === true &&
      (match?.prerequisiteRecordIds.length ?? 0) === al52.prerequisites.length &&
      prereqRaw[0]?.best?.recordId === al52.recordId,
  )
} else {
  check('C9: elementary algebra 5.2 exists in the catalog', false)
}

/* C10: partial overlap */
const twoVarRaw = matchParsed({ rootName: '', nodes: [{ topic: 'Linear Equations in Two Variables' }] })
check(
  `C10: “Linear Equations in Two Variables” is at most partial (score ${twoVarRaw[0]?.score})`,
  (twoVarRaw[0]?.score ?? 0) < 0.75,
)

/* ------------------------------------------------------------------ */
/* D. TOC assembly, dedupe, coverage                                   */
/* ------------------------------------------------------------------ */

const mixed = parseTopicList(`Mathematics Essentials
1. ${anyLesson.lessonTitle}
2. Greatest Common Divisor
3. CPU Scheduling
4. ${anyLesson.lessonTitle}`)
const mixedAssembled = assemble(matchParsed(mixed))
check(
  `D1: duplicate requests dedupe to one item (${mixedAssembled.totalLessons} unique lessons)`,
  mixedAssembled.toc.reduce((n, c) => n + c.items.length, 0) === mixedAssembled.totalLessons,
)
const dupItems = mixedAssembled.toc.flatMap((c) => c.items.map((i) => i.recordId))
check('D2: no record appears twice in the TOC', new Set(dupItems).size === dupItems.length)
check(
  `D3: coverage counts add up (${mixedAssembled.coverage.requested} requested = ${mixedAssembled.coverage.exact}+${mixedAssembled.coverage.equivalent}+${mixedAssembled.coverage.partial}+${mixedAssembled.coverage.notAvailable})`,
  mixedAssembled.coverage.exact + mixedAssembled.coverage.equivalent + mixedAssembled.coverage.partial + mixedAssembled.coverage.notAvailable ===
    mixedAssembled.coverage.requested,
)
check(
  `D4: coverage < 100 when topics are missing (${mixedAssembled.coverage.percent}%)`,
  mixedAssembled.coverage.percent < 100 && mixedAssembled.coverage.notAvailable > 0,
)
check(
  'D5: every TOC record exists in the catalog',
  mixedAssembled.toc.every((c) => c.items.every((i) => CATALOG.lessonById.has(i.recordId))),
)

/* D6: selection path */
const selAssembled = assemble(selectionToMatches({ bookIds: ['foundation-mathematics'] }))
check(
  `D6: whole-book selection yields one chapter per library chapter (${selAssembled.toc.length} chapters)`,
  selAssembled.toc.length === CATALOG.books.find((b) => b.bookId === 'foundation-mathematics')?.chapterKeys.length,
)
check(
  `D7: selection coverage is 100% (${selAssembled.coverage.percent}%)`,
  selAssembled.coverage.percent === 100,
)

/* D8: combination of parsed + selection dedupes across sources */
const comboRaw = [
  ...matchParsed(parseTopicList(`Algebra
1. ${anyLesson.lessonTitle}`)),
  ...selectionToMatches({ bookIds: [anyLesson.bookId] }),
]
const comboAssembled = assemble(comboRaw)
check(
  `D8: combination book dedupes overlapping sources (${comboAssembled.totalLessons} unique)`,
  comboAssembled.totalLessons === new Set(comboAssembled.toc.flatMap((c) => c.items.map((i) => i.recordId))).size,
)

/* ------------------------------------------------------------------ */
/* E. Validation (server-side guards)                                  */
/* ------------------------------------------------------------------ */

const badToc = validateToc([
  { title: 'Good', items: [{ recordId: anyLesson.recordId }] },
  { title: 'Bad', items: [{ recordId: 'does-not-exist' }] },
  { title: 'Dup', items: [{ recordId: anyLesson.recordId }] },
  { title: 'Empty', items: [] },
])
check(`E1: invalid TOC rejected with errors (${badToc.errors.length})`, !badToc.ok && badToc.errors.length >= 3)
const goodToc = validateToc([{ title: 'One', items: [{ recordId: anyLesson.recordId }, { recordId: CATALOG.lessons[3].recordId }] }])
check('E2: valid TOC accepted', goodToc.ok && goodToc.toc.length === 1 && goodToc.toc[0].items.length === 2)

const badCoverage = validateCoverage([
  { requestedTopic: 'X', matchStatus: 'exact' },
  { requestedTopic: 'Y', matchStatus: 'not_available', matchedLibraryRecordId: anyLesson.recordId },
  { requestedTopic: 'Z', matchStatus: 'partial', matchedLibraryRecordId: 'nope' },
])
check(`E3: dishonest coverage rows rejected (${badCoverage.errors.length})`, !badCoverage.ok)
const goodCoverage = validateCoverage([
  { requestedTopic: 'X', matchStatus: 'exact', matchedLibraryRecordId: anyLesson.recordId, matchConfidence: 1 },
  { requestedTopic: 'Y', matchStatus: 'not_available' },
])
check('E4: honest coverage rows accepted', goodCoverage.ok && goodCoverage.rows.length === 2)

/* ------------------------------------------------------------------ */
/* F. Exam templates                                                   */
/* ------------------------------------------------------------------ */

check('F1: seven exam templates defined', EXAM_TEMPLATES.length === 7)
const gate = matchExamTemplate('GATE CSE 2027')
check('F2: “GATE CSE 2027” resolves to the GATE CSE template', gate?.key === 'gate-cse')
const jee = matchExamTemplate('JEE Main')
check('F3: “JEE Main” resolves to the JEE Main template', jee?.key === 'jee-main')
check('F4: unknown exam resolves to null', matchExamTemplate('Some Unknown Exam') === null)
if (gate) {
  const gateAssembled = assemble(matchParsed({ rootName: gate.label, nodes: gate.nodes }))
  const leaves = gate.nodes.reduce((n, s) => n + 1 + (s.children?.length ?? 0), 0)
  check(
    `F5: every GATE topic gets a coverage row (${gateAssembled.coverage.requested} vs ${leaves})`,
    gateAssembled.coverage.requested === leaves,
  )
  check(
    `F6: GATE CSE is honestly mostly unavailable today (${gateAssembled.coverage.notAvailable}/${gateAssembled.coverage.requested})`,
    gateAssembled.coverage.notAvailable >= gateAssembled.coverage.requested - 2,
  )
}
if (jee) {
  const jeeAssembled = assemble(matchParsed({ rootName: jee.label, nodes: jee.nodes }))
  check(
    `F7: JEE Main finds real library content (${jeeAssembled.totalLessons} lessons selected)`,
    jeeAssembled.totalLessons > 5,
  )
  check(
    `F8: JEE Main coverage is honest and partial (${jeeAssembled.coverage.percent}%)`,
    jeeAssembled.coverage.percent < 100 && jeeAssembled.coverage.percent > 0,
  )
}

/* ------------------------------------------------------------------ */
/* G. PDF extraction                                                   */
/* ------------------------------------------------------------------ */

async function pdfChecks(): Promise<void> {
  try {
    const bytes = new Uint8Array(readFileSync('tool-results/syllabus.pdf'))
    const result = await extractPdfTopics(bytes, 'syllabus.pdf')
    check(`G1: PDF page count read (${result.pages})`, result.pages === 1)
    check(`G2: text layer used (OCR=${result.usedOcr})`, !result.usedOcr && result.textChars > 100)
    const topics = result.parsed.nodes.flatMap((n) => [n.topic, ...(n.children ?? []).map((c) => c.topic)])
    check(
      `G3: numbered topics extracted (${topics.join(' | ')})`,
      topics.includes('Number Systems') && topics.includes('Integration') && topics.length >= 9,
    )
    check(
      `G4: unit headings become structure (${result.parsed.nodes.map((n) => n.topic).join(' | ')})`,
      result.parsed.nodes.some((n) => /number systems/i.test(n.topic)) && result.parsed.nodes.some((n) => /algebra/i.test(n.topic)),
    )
    check(`G5: root name from document title (${result.parsed.rootName})`, /jee|mathematics/i.test(result.parsed.rootName))
  } catch (err) {
    check(`G1: PDF extraction failed: ${(err as Error).message}`, false)
  }
}
await pdfChecks()

/* ------------------------------------------------------------------ */
/* Report                                                             */
/* ------------------------------------------------------------------ */

console.log(`\nverify-custom-book-builder: ${pass} passed, ${fail} failed`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log(`  ✗ ${f}`)
  process.exit(1)
}
