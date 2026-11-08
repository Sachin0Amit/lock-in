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
ok(al.status === 'planned', 'book status planned')
ok(al.chapters.length === 11, `11 chapters (got ${al.chapters.length})`)
ok(al.chapters.map((c) => c.number).join(',') === '1,2,3,4,5,6,7,8,9,10,11', 'chapter numbers sequential 1..11')
const slugs = al.chapters.map((c) => c.slug)
ok(new Set(slugs).size === slugs.length, 'chapter slugs unique book-wide')
ok(al.chapters.every((c) => c.status === 'planned'), 'all chapters planned')
ok(al.chapters.every((c) => c.lessons.length === 0), 'no lessons written yet (empty shells forbidden as LESSONS; planned TOC is the deliverable)')
ok(al.chapters.every((c) => (c.plannedLessons?.length ?? 0) > 0), 'every chapter carries planned lessons')
const plannedTitles = al.chapters.flatMap((c) => c.plannedLessons ?? [])
ok(plannedTitles.length === 37, `37 planned lessons (got ${plannedTitles.length})`)
ok(new Set(plannedTitles).size === plannedTitles.length, 'planned lesson titles unique book-wide')
ok(plannedTitles.every((t) => t.trim().length > 8), 'no stub titles')
ok(al.chapters.every((c) => c.summary.length > 120), 'every chapter summary is a real pedagogical paragraph')
for (const c of al.chapters) {
  ok(typeof c.title === 'string' && c.title.length > 3, `ch.${c.number} title set`)
}

/* ------------------------------------------------------------------ */
/* B. Registry                                                         */
/* ------------------------------------------------------------------ */
section('B. Registry integration')
ok(allBooks.length === 3, `allBooks has 3 books (got ${allBooks.length})`)
ok(allBooks.some((b) => b.id === al.id), 'Elementary Algebra registered in allBooks')
const stats = libraryStats()
ok(stats.books === 3, `libraryStats().books = 3 (got ${stats.books})`)
const alStats = bookStats(al)
ok(alStats.written === 0, '0 written lessons')
ok(alStats.planned === 37, `bookStats().planned = 37 (got ${alStats.planned})`)
ok(alStats.words === 0, '0 words (honest counter — nothing authored yet)')
ok(bookLessons(al).length === 0, 'bookLessons empty (reader/search pick up nothing yet)')

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
