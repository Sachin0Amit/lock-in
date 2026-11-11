#!/usr/bin/env bun
/**
 * verify-book3-promotion.ts — Elementary Algebra (book #3) research-phase gate.
 *
 * Run 66 (2026-11-07): the book is PROMOTED from the backlog with its full
 * researched TOC (11 chapters / 37 planned lessons, no lessons written yet).
 * This script verifies the promotion BEFORE anything consumes it:
 *   A. structure — book/chapter fields, sequential numbering, unique slugs,
 *      statuses 'planned', every planned lesson non-empty;
 *   B. registry — the book is imported in index.ts, libraryStats sees 3 books;
 *   C. id/title uniqueness — book-wide and against ALL of Foundation
 *      Mathematics and Arithmetic and Number Systems (lessons + planned
 *      lessons + chapter slugs); the `al-` id prefix reserved and unused;
 *   D. no-duplication audit (MASTER_PLAN rule 7) — every planned lesson title
 *      must differ from every FM/ANS lesson title, and the cross-reference
 *      anchors the future lessons will cite must exist in FM and ANS;
 *   E. research mapping — the file header's syllabus-audit claims reference
 *      all five source families and the chapter plan covers each.
 *
 * Usage: cd /home/z/my-project && bun run scripts/verify-book3-promotion.ts
 */
import { elementaryAlgebra as al } from '../src/data/library/books/mathematics/elementary-algebra/book'
import { foundationMathematics as fm } from '../src/data/library/books/mathematics/foundation-mathematics/book'
import { arithmeticNumberSystems as ans } from '../src/data/library/books/mathematics/arithmetic-number-systems/book'
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
ok(al.id === 'elementary-algebra', 'book id stable kebab-case')
ok(al.discipline === 'mathematics', 'discipline = mathematics')
ok(al.status === 'in-progress', 'book status in-progress (complete through ch. 11; reopened by the pre-written-books audit 2026-11-11 for the gap lessons)')
ok(al.chapters.length === 12, `12 chapters (got ${al.chapters.length}) — ch. 12 added by the audit`)
ok(al.chapters.map((c) => c.number).join(',') === '1,2,3,4,5,6,7,8,9,10,11,12', 'chapter numbers sequential 1..12')
const slugs = al.chapters.map((c) => c.slug)
ok(new Set(slugs).size === slugs.length, 'chapter slugs unique book-wide')
ok(al.chapters.slice(0, 11).every((c) => c.status === 'complete'), 'chapters 1-11 complete')
ok(al.chapters.slice(0, 11).every((c) => c.lessons.length > 0), 'every complete chapter carries written lessons')
// the audit's gap queues: exactly ch.4 and ch.6 carry one queued lesson each
ok(JSON.stringify(al.chapters[3].plannedLessons) === JSON.stringify(['4.5 HCF and LCM of Expressions']), 'ch.4 queues exactly the audit gap lesson 4.5')
ok(JSON.stringify(al.chapters[5].plannedLessons) === JSON.stringify(['6.4 One Linear, One Quadratic']), 'ch.6 queues exactly the audit gap lesson 6.4')
ok(al.chapters.filter((c) => c.number !== 4 && c.number !== 6 && c.number !== 12).every((c) => (c.plannedLessons?.length ?? 0) === 0), 'all other chapters carry no queue')
const plannedTitles = al.chapters.flatMap((c) => c.plannedLessons ?? [])
ok(plannedTitles.length === 5, `5 queued gap lessons from the audit (got ${plannedTitles.length}: ${plannedTitles.join(' | ')})`)
ok(new Set(plannedTitles).size === plannedTitles.length, 'queued lesson titles unique book-wide')
ok(plannedTitles.every((t) => t.trim().length > 8), 'no stub titles')
const written = al.chapters.flatMap((c) => c.lessons.map((l) => l.title))
ok(written.length === 37, `37 written lessons (got ${written.length})`)
ok(al.chapters.every((c) => c.summary.length > 120), 'every chapter summary is a real pedagogical paragraph')
for (const c of al.chapters) {
  ok(typeof c.title === 'string' && c.title.length > 3, `ch.${c.number} title set`)
}

/* ------------------------------------------------------------------ */
/* B. Registry                                                         */
/* ------------------------------------------------------------------ */
section('B. Registry integration')
ok(allBooks.length === 28, `allBooks has 28 books (got ${allBooks.length})`)
ok(allBooks.some((b) => b.id === al.id), 'Elementary Algebra registered in allBooks')
const stats = libraryStats()
ok(stats.books === 28, `libraryStats().books = 28 (got ${stats.books})`)
const alStats = bookStats(al)
ok(alStats.written === 37, `37 written lessons (got ${alStats.written})`)
ok(alStats.planned === 5, `bookStats().planned = 5 (got ${alStats.planned})`)
ok(alStats.words > 100000, `words > 100000 (got ${alStats.words})`)
ok(bookLessons(al).length === 37, `bookLessons serves 37 lessons to the reader (got ${bookLessons(al).length})`)

/* ------------------------------------------------------------------ */
/* C. Uniqueness against FM and ANS                                    */
/* ------------------------------------------------------------------ */
section('C. Uniqueness vs Foundation Mathematics and Arithmetic and Number Systems')
const fmLessonTitles = fm.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const fmPlannedTitles = fm.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const fmLessonIds = fm.chapters.flatMap((c) => c.lessons.map((l) => l.id))
const ansLessonTitles = ans.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const ansPlannedTitles = ans.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const ansLessonIds = ans.chapters.flatMap((c) => c.lessons.map((l) => l.id))
ok(new Set([...fmLessonIds, ...ansLessonIds]).size === fmLessonIds.length + ansLessonIds.length, 'FM+ANS lesson ids globally unique (sanity)')
ok(fmLessonIds.every((id) => id.startsWith('fm-')), 'FM ids use the fm- prefix')
ok(ansLessonIds.every((id) => id.startsWith('ans-')), 'ANS ids use the ans- prefix')
const alChapterSlugs = al.chapters.map((c) => c.slug)
const fmChapterSlugs = fm.chapters.map((c) => c.slug)
const ansChapterSlugs = ans.chapters.map((c) => c.slug)
ok(
  alChapterSlugs.every((s) => !fmChapterSlugs.includes(s) && !ansChapterSlugs.includes(s)),
  'no chapter slug collides with any FM or ANS chapter slug',
)
for (const t of plannedTitles) {
  ok(!fmLessonTitles.includes(t.toLowerCase()), `planned title not an FM lesson title: "${t}"`)
  ok(!fmPlannedTitles.includes(t.toLowerCase()), `planned title not an FM planned title: "${t}"`)
  ok(!ansLessonTitles.includes(t.toLowerCase()), `planned title not an ANS lesson title: "${t}"`)
  ok(!ansPlannedTitles.includes(t.toLowerCase()), `planned title not an ANS planned title: "${t}"`)
}
// the al- prefix must be unused anywhere (reserved for this book's lesson ids)
const allIds = [...fmLessonIds, ...ansLessonIds]
ok(allIds.every((id) => !id.startsWith('al-')), 'the al- prefix is unused across the library (reserved)')

/* ------------------------------------------------------------------ */
/* D. Cross-reference anchors (the FM/ANS lessons future AL lessons cite) */
/* ------------------------------------------------------------------ */
section('D. FM and ANS cross-reference anchors exist')
const anchors: [string, string, string][] = [
  ['fm-patterns-to-formulas', 'fm', 'FM 11.2 From Patterns to Formulas (AL ch. 1 formalizes formulas)'],
  ['fm-letter-for-the-unknown', 'fm', 'FM 11.3 A Letter for the Unknown (AL ch. 1/5 pick it up)'],
  ['fm-order-of-operations', 'fm', 'FM 2.8 Order of Operations (AL 1.1 re-derives as the expression tree)'],
  ['fm-idea-of-a-fraction', 'fm', 'FM 4.1 The Idea of a Fraction (AL ch. 8 carries the laws into algebra)'],
  ['fm-equivalent-fractions-simplification', 'fm', 'FM 4.2 Equivalent Fractions (AL 8.1 simplifies rational expressions the same way)'],
  ['fm-highest-common-factor', 'fm', 'FM 3.5 HCF (AL ch. 4 factors; ch. 8 builds LCDs)'],
  ['fm-lowest-common-multiple', 'fm', 'FM 3.6 LCM (AL 8.2 the LCD of polynomials)'],
  ['fm-division-remainders-zero', 'fm', 'FM 2.6 Division and Remainders (AL 3.4 long division grows into polynomials)'],
  ['fm-negative-numbers-why-they-exist', 'fm', 'FM 7.1 why negatives exist (AL 2.2 negative exponents echo it)'],
  ['fm-multiplying-integers-sign-rules', 'fm', 'FM 7.3 sign rules (AL polynomials inherit them)'],
  ['fm-direct-and-inverse-variation', 'fm', 'FM 6.4 variation (AL ch. 11 word problems)'],
  ['ans-division-with-rest-the-division-algorithm', 'ans', 'ANS 2.1 the division algorithm (AL 3.4 proves the remainder theorem from it)'],
  ['ans-the-field-laws-division-joins-the-family', 'ans', 'ANS 7.2 the field laws (AL ch. 5 justifies every equation move)'],
  ['ans-the-diagonal-that-broke-the-rationals', 'ans', 'ANS 8.1 √2 irrational (AL 9.3 the discriminant hands √ back)'],
  ['ans-completeness-the-line-without-holes', 'ans', 'ANS 8.4 the real line (AL ch. 7 inequalities live there)'],
  ['ans-the-great-extension-story', 'ans', 'ANS 10.1 the extension story (AL 2.2 negative exponents = another repair)'],
]
for (const [id, shelf, label] of anchors) {
  const pool = shelf === 'fm' ? fmLessonIds : ansLessonIds
  ok(pool.includes(id), `anchor exists in ${shelf.toUpperCase()}: ${label}`)
}

/* ------------------------------------------------------------------ */
/* E. Research mapping                                                 */
/* ------------------------------------------------------------------ */
section('E. Research-phase mapping (header claims vs chapter plan)')
const fileText = await Bun.file(`${import.meta.dir}/../src/data/library/books/mathematics/elementary-algebra/book.ts`).text()
ok(fileText.length > 0, 'book module + source file readable')
const desc = (al.description + ' ' + fileText).toLowerCase()
ok(desc.includes('jacobs'), 'primary text reference named (Jacobs, Elementary Algebra — the Drive copy)')
ok(desc.includes('hall'), 'classic stretch reference named (Hall & Knight, Higher Algebra)')
ok(desc.includes('m2'), 'Cengage M2 Algebra module named (the style reference)')
ok(desc.includes('khattar'), 'competitive-exam reference named (Khattar QA 4e)')
ok(desc.includes('openstax'), 'modern open-textbook cross-check named (OpenStax Elementary Algebra 2e)')
ok(desc.includes('ncert'), 'school canon named (NCERT algebra arc)')
// chapter coverage of the six families
const planText = al.chapters.map((c) => (c.summary + ' ' + (c.plannedLessons ?? []).join(' '))).join(' ').toLowerCase()
ok(planText.includes('like terms') && planText.includes('expression'), 'ch. 1 covers expressions and like terms')
ok(planText.includes('exponent'), 'ch. 2 covers the exponent laws')
ok(planText.includes('polynomial') && planText.includes('remainder theorem'), 'ch. 3 covers polynomials + remainder theorem')
ok(planText.includes('factor'), 'ch. 4 covers factorization + factor theorem')
ok(planText.includes('linear equations') && planText.includes('balance'), 'ch. 5 covers linear equations')
ok(planText.includes('substitution') && planText.includes('elimination'), 'ch. 6 covers simultaneous equations')
ok(planText.includes('inequalit'), 'ch. 7 covers inequalities')
ok(planText.includes('rational expressions') || planText.includes('algebraic fractions'), 'ch. 8 covers algebraic fractions')
ok(planText.includes('quadratic') && planText.includes('completing the square') && planText.includes('discriminant'), 'ch. 9 covers quadratics four ways')
ok(planText.includes('slope') && planText.includes('parabola'), 'ch. 10 covers graphs')
ok(planText.includes('function'), 'ch. 11 ends at the function doorstep')

/* ------------------------------------------------------------------ */
console.log(`\n${'='.repeat(60)}`)
console.log(`verify-book3-promotion: ${checks - failures}/${checks} checks pass, ${failures} failures`)
console.log('='.repeat(60))
if (failures > 0) process.exit(1)
export {}
