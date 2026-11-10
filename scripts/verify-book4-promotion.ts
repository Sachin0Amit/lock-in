#!/usr/bin/env bun
/**
 * verify-book4-promotion.ts — Advanced Algebra (book #4) research-phase gate.
 *
 * Run 89 (2026-11-10): the book is PROMOTED from the backlog with its full
 * researched TOC (10 chapters / 36 planned lessons, no lessons written yet; the
 * ch. 9 log-tables lesson added by the topic-inclusion guarantee pass, 2026-11-10).
 * This script verifies the promotion BEFORE anything consumes it:
 *   A. structure — book/chapter fields, sequential numbering, unique slugs,
 *      statuses 'planned', every planned lesson non-empty;
 *   B. registry — the book is imported in index.ts (the library grew to 28
 *     books after run 89 — the full-shelf pass + the QA book; the check is
 *     that AA is ON the shelf, not a shelf count pin);
 *   C. id/title uniqueness — book-wide and against ALL of Foundation
 *      Mathematics, Arithmetic and Number Systems and Elementary Algebra
 *      (lessons + planned lessons + chapter slugs); the `aa-` id prefix
 *      reserved and unused;
 *   D. no-duplication audit (MASTER_PLAN rule 7) — every planned lesson
 *      title must differ from every FM/ANS/AL lesson title, and the
 *      cross-reference anchors the future lessons will cite must exist;
 *   E. research mapping — the file header's syllabus-audit claims reference
 *      all six source families and the chapter plan covers each.
 *
 * Usage: cd /home/z/my-project && bun run scripts/verify-book4-promotion.ts
 */
import { advancedAlgebra as aa } from '../src/data/library/books/mathematics/advanced-algebra/book'
import { foundationMathematics as fm } from '../src/data/library/books/mathematics/foundation-mathematics/book'
import { arithmeticNumberSystems as ans } from '../src/data/library/books/mathematics/arithmetic-number-systems/book'
import { elementaryAlgebra as al } from '../src/data/library/books/mathematics/elementary-algebra/book'
import { allBooks, libraryStats, bookStats, bookLessons } from '../src/data/library/index'

let checks = 0
let failures = 0
function ok(cond: boolean, label: string) {
  checks++
  if (!cond) {
    failures++
    console.error(`  FAIL: ${label}`)
  }
}
function section(name: string) {
  console.log(`\n== ${name} ==`)
}

/* ------------------------------------------------------------------ */
/* A. Structure                                                        */
/* ------------------------------------------------------------------ */
section('A. Structure of the promoted book')
ok(aa.id === 'advanced-algebra', 'book id stable kebab-case')
ok(aa.discipline === 'mathematics', 'discipline = mathematics')
ok(aa.status === 'planned', 'book status planned (the run-66 precedent; flips to in-progress with the first written lesson at run 90)')
ok(aa.chapters.length === 10, `10 chapters (got ${aa.chapters.length})`)
ok(aa.chapters.map((c) => c.number).join(',') === '1,2,3,4,5,6,7,8,9,10', 'chapter numbers sequential 1..10')
const slugs = aa.chapters.map((c) => c.slug)
ok(new Set(slugs).size === slugs.length, 'chapter slugs unique book-wide')
ok(aa.chapters.every((c) => c.status === 'planned'), 'all chapters planned')
ok(aa.chapters.every((c) => c.lessons.length === 0), 'no lessons written yet (empty shells forbidden as LESSONS; planned TOC is the deliverable)')
ok(aa.chapters.every((c) => (c.plannedLessons?.length ?? 0) > 0), 'every chapter carries planned lessons')
const plannedTitles = aa.chapters.flatMap((c) => c.plannedLessons ?? [])
ok(plannedTitles.length === 36, `36 planned lessons (got ${plannedTitles.length})`)
ok(new Set(plannedTitles).size === plannedTitles.length, 'planned lesson titles unique book-wide')
ok(plannedTitles.every((t) => t.trim().length > 8), 'no stub titles')
ok(aa.chapters.every((c) => c.summary.length > 120), 'every chapter summary is a real pedagogical paragraph')
for (const c of aa.chapters) {
  ok(typeof c.title === 'string' && c.title.length > 3, `ch.${c.number} title set`)
}
// the handoff honoured: chapter 1 opens on the composition doorstep territory
const ch1 = aa.chapters[0]!
ok(
  /composit/i.test(ch1.summary) && /inverse/i.test(ch1.summary) && /domain/i.test(ch1.summary),
  'ch. 1 opens exactly on composites, inverses and the domains of composites (the AL 11.3 handoff)',
)
// the per-chapter lesson counts match the researched plan
const perChapter = aa.chapters.map((c) => (c.plannedLessons ?? []).length).join(',')
ok(perChapter === '4,4,3,3,4,4,4,3,4,3', `per-chapter plan 4,4,3,3,4,4,4,3,4,3 (got ${perChapter})`)

/* ------------------------------------------------------------------ */
/* B. Registry                                                         */
/* ------------------------------------------------------------------ */
section('B. Registry integration')
ok(allBooks.some((b) => b.id === 'advanced-algebra'), `AA registered on the ${allBooks.length}-book shelf`)
ok(allBooks.some((b) => b.id === aa.id), 'Advanced Algebra registered in allBooks')
ok(new Set(allBooks.map((b) => b.id)).size === allBooks.length, 'all book ids unique across the library')
const stats = libraryStats()
ok(stats.books === allBooks.length, `libraryStats().books tracks the shelf (${stats.books})`)
const aaStats = bookStats(aa)
ok(aaStats.written === 0, '0 written lessons')
ok(aaStats.planned === 36, `bookStats().planned = 36 (got ${aaStats.planned})`)
ok(aaStats.words === 0, '0 words (honest counter — nothing authored yet)')
ok(bookLessons(aa).length === 0, 'bookLessons empty (reader/search pick up nothing yet)')

/* ------------------------------------------------------------------ */
/* C. Uniqueness against FM, ANS and AL                                */
/* ------------------------------------------------------------------ */
section('C. Uniqueness vs Foundation Mathematics, Arithmetic and Number Systems and Elementary Algebra')
const fmLessonTitles = fm.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const fmPlannedTitles = fm.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const fmLessonIds = fm.chapters.flatMap((c) => c.lessons.map((l) => l.id))
const ansLessonTitles = ans.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const ansPlannedTitles = ans.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const ansLessonIds = ans.chapters.flatMap((c) => c.lessons.map((l) => l.id))
const alLessonTitles = al.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const alPlannedTitles = al.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const alLessonIds = al.chapters.flatMap((c) => c.lessons.map((l) => l.id))
const priorIds = [...fmLessonIds, ...ansLessonIds, ...alLessonIds]
ok(new Set(priorIds).size === priorIds.length, 'FM+ANS+AL lesson ids globally unique (sanity)')
ok(priorIds.length === 120, `120 prior lesson ids (got ${priorIds.length})`)
ok(fmLessonIds.every((id) => id.startsWith('fm-')), 'FM ids use the fm- prefix')
ok(ansLessonIds.every((id) => id.startsWith('ans-')), 'ANS ids use the ans- prefix')
ok(alLessonIds.every((id) => id.startsWith('al-')), 'AL ids use the al- prefix')
const aaChapterSlugs = aa.chapters.map((c) => c.slug)
const fmChapterSlugs = fm.chapters.map((c) => c.slug)
const ansChapterSlugs = ans.chapters.map((c) => c.slug)
const alChapterSlugs = al.chapters.map((c) => c.slug)
ok(
  aaChapterSlugs.every(
    (s) => !fmChapterSlugs.includes(s) && !ansChapterSlugs.includes(s) && !alChapterSlugs.includes(s),
  ),
  'no chapter slug collides with any FM, ANS or AL chapter slug',
)
for (const t of plannedTitles) {
  ok(!fmLessonTitles.includes(t.toLowerCase()), `planned title not an FM lesson title: "${t}"`)
  ok(!fmPlannedTitles.includes(t.toLowerCase()), `planned title not an FM planned title: "${t}"`)
  ok(!ansLessonTitles.includes(t.toLowerCase()), `planned title not an ANS lesson title: "${t}"`)
  ok(!ansPlannedTitles.includes(t.toLowerCase()), `planned title not an ANS planned title: "${t}"`)
  ok(!alLessonTitles.includes(t.toLowerCase()), `planned title not an AL lesson title: "${t}"`)
  ok(!alPlannedTitles.includes(t.toLowerCase()), `planned title not an AL planned title: "${t}"`)
}
// the aa- prefix must be unused anywhere (reserved for this book's lesson ids)
ok(priorIds.every((id) => !id.startsWith('aa-')), 'the aa- prefix is unused across the library (reserved)')

/* ------------------------------------------------------------------ */
/* D. Cross-reference anchors (the FM/ANS/AL lessons future AA lessons cite) */
/* ------------------------------------------------------------------ */
section('D. FM, ANS and AL cross-reference anchors exist')
const anchors: [string, string, string][] = [
  ['al-the-function-idea-the-doorstep', 'al', 'AL 11.3 the function doorstep (AA ch. 1 opens on its composites/inverses territory)'],
  ['al-competition-algebra-identities-and-substitutions', 'al', 'AL 11.2 the identity bank (AA 10.1 is its advanced sequel)'],
  ['al-word-problems-the-toolkit-at-work', 'al', 'AL 11.1 the word-problem pipeline (AA 2.1 optimization applications)'],
  ['al-the-quadratic-formula-and-the-discriminant', 'al', 'AL 9.3 the formula + discriminant (AA ch. 2–3 revisit)'],
  ['al-roots-and-coefficients-viete-relations', 'al', 'AL 9.4 Viète for quadratics (AA 2.3 + 8.2 generalize)'],
  ['al-completing-the-square-derived', 'al', 'AL 9.2 completing the square (AA 2.1 vertex form)'],
  ['al-the-parabola-quadratic-graphs-and-vertices', 'al', 'AL 10.3 the parabola (AA 2.1 range off the fold)'],
  ['al-slope-the-steepness-theorem', 'al', 'AL 10.2 the steepness theorem (AA 10.3 discrete slopes)'],
  ['al-order-and-the-solution-set', 'al', 'AL 7.1 order + solution set (AA 4.2 sign diagrams)'],
  ['al-solving-linear-inequalities', 'al', 'AL 7.2 linear inequalities (AA ch. 4’s ground)'],
  ['al-compound-inequalities-and-applications', 'al', 'AL 7.3 compound inequalities (AA 4.3 compound verdicts)'],
  ['al-powers-and-the-laws-of-exponents', 'al', 'AL 2.1 the exponent laws (AA 9.1 extends to every real index)'],
  ['al-zero-and-negative-exponents-another-repair', 'al', 'AL 2.2 the repair discipline (AA 9.1 cites it)'],
  ['al-dividing-polynomials-long-division-and-the-remainder-theorem', 'al', 'AL 3.4 long division + remainder theorem (AA 8.1’s ground)'],
  ['al-factor-theorem-and-cubics', 'al', 'AL 4.4 factor theorem + cubics (AA 8.2’s ground)'],
  ['ans-induction-proving-for-every-number', 'ans', 'ANS 1.2 induction on the naturals (AA 7.1’s precedent)'],
  ['ans-the-great-extension-story', 'ans', 'ANS 10.1 the extension story (AA 3.1 climbs the next rung)'],
  ['ans-the-field-laws-division-joins-the-family', 'ans', 'ANS 7.2 the field laws (AA 3.1 keeps them for a+bi)'],
  ['fm-absolute-value-as-distance', 'fm', 'FM 7.4 absolute value as distance (AA 4.3’s distance read)'],
  ['fm-mean-median-and-mode', 'fm', 'FM 10.4 the arithmetic mean banked (AA 4.1 AM–GM)'],
  ['fm-patterns-to-formulas', 'fm', 'FM 11.2 patterns to formulas (AA 5.4 pairing proofs)'],
]
for (const [id, shelf, label] of anchors) {
  const pool = shelf === 'fm' ? fmLessonIds : shelf === 'ans' ? ansLessonIds : alLessonIds
  ok(pool.includes(id), `anchor exists in ${shelf.toUpperCase()}: ${label}`)
}

/* ------------------------------------------------------------------ */
/* E. Research mapping                                                 */
/* ------------------------------------------------------------------ */
section('E. Research-phase mapping (header claims vs chapter plan)')
const fileText = await Bun.file(`${import.meta.dir}/../src/data/library/books/mathematics/advanced-algebra/book.ts`).text()
ok(fileText.length > 0, 'book module + source file readable')
const desc = (aa.description + ' ' + fileText).toLowerCase()
ok(desc.includes('m2'), 'Cengage M2 Algebra module named (the Drive JEE volume, machine-listed this run)')
ok(desc.includes('hall'), 'classic stretch reference named (Hall & Knight, Higher Algebra)')
ok(desc.includes('khattar'), 'competitive-exam reference named (Khattar QA 4e)')
ok(desc.includes('openstax'), 'modern open-textbook cross-check named (OpenStax College Algebra 2e)')
ok(desc.includes('ncert'), 'school canon named (NCERT class 11–12 arc)')
ok(desc.includes('jee'), 'JEE Main syllabus named (units 1/2/4/5/6/7)')
// chapter coverage of the ten families
const planText = aa.chapters.map((c) => (c.title + ' ' + c.summary + ' ' + (c.plannedLessons ?? []).join(' '))).join(' ').toLowerCase()
ok(
  planText.includes('relation') && planText.includes('one-one') && planText.includes('composition') && planText.includes('inverse machine'),
  'ch. 1 covers relations, one-one/onto, composition, inverse',
)
ok(
  planText.includes('sign diagram') && planText.includes('symmetric') && planText.includes('location of roots'),
  'ch. 2 covers quadratic inequalities + symmetric reads + location of roots',
)
ok(
  planText.includes('conjugate') && planText.includes('modulus') && planText.includes('closure failure'),
  'ch. 3 covers complex numbers (conjugate, modulus, the ladder rung)',
)
ok(
  planText.includes('arithmetic–geometric mean') && planText.includes('cauchy') && planText.includes('triangle inequality'),
  'ch. 4 covers AM–GM + Cauchy-Schwarz + the triangle inequality',
)
ok(
  planText.includes('arithmetic progression') && planText.includes('geometric progression') && planText.includes('infinite tail'),
  'ch. 5 covers AP + GP + the infinite tail',
)
ok(
  planText.includes('permutation') && planText.includes('combination') && planText.includes('fundamental principle'),
  'ch. 6 covers permutations + combinations + the counting principle',
)
ok(
  planText.includes('induction') && planText.includes('the binomial theorem, proved') && planText.includes('middle term'),
  'ch. 7 covers induction + the binomial theorem proved + the terms',
)
ok(
  planText.includes('theory of equations') && planText.includes('symmetric functions') && planText.includes('transformation'),
  'ch. 8 covers the theory of equations',
)
ok(
  planText.includes('exponential') && planText.includes('logarithm') && planText.includes('inverse machine'),
  'ch. 9 covers exponentials + logarithms as inverse machines',
)
ok(
  planText.includes('synthesis') && planText.includes('doorstep') && planText.includes('limit'),
  'ch. 10 covers the synthesis + the calculus doorstep',
)
// the honest PMI note (dropped from the rationalized NCERT, kept via JEE/classics)
ok(
  fileText.toLowerCase().includes('dropped from the rationalized textbook'),
  'the honest PMI note present (dropped from NCERT, retained via JEE unit 5 + the classics)',
)
// the handoff note honoured
ok(
  fileText.includes("AL 11.3's composition doorstep"),
  'the AL 11.3 handoff named in the research header',
)

/* ------------------------------------------------------------------ */
console.log(`\n${'='.repeat(60)}`)
console.log(`verify-book4-promotion: ${checks - failures}/${checks} checks pass, ${failures} failures`)
console.log('='.repeat(60))
if (failures > 0) process.exit(1)
export {}
