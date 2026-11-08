#!/usr/bin/env bun
/**
 * verify-book2-promotion.ts — Arithmetic and Number Systems (book #2) research-phase gate.
 *
 * Run 48 (2026-11-05): the book is PROMOTED from the backlog with its full
 * researched TOC (10 chapters / 34 planned lessons, no lessons written yet).
 * This script verifies the promotion BEFORE anything consumes it:
 *   A. structure — book/chapter fields, sequential numbering, unique slugs,
 *      statuses 'planned', every planned lesson non-empty;
 *   B. registry — the book is imported in index.ts, libraryStats sees 2 books;
 *   C. id/title uniqueness — book-wide and against ALL of Foundation
 *      Mathematics (lessons + planned lessons + chapter slugs);
 *   D. no-duplication audit (MASTER_PLAN rule 7) — every planned lesson title
 *      must differ from every FM lesson title, and the overlap-with-FM topics
 *      are the ones the plan explicitly re-derives (divisibility tests,
 *      decimals, integers, patterns) — asserted present in FM as
 *      cross-reference anchors so future lessons can cite them;
 *   E. research mapping — the file header's syllabus-audit claims reference
 *      all five source families and the chapter plan covers each.
 *
 * Usage: cd /home/z/my-project && bun run scripts/verify-book2-promotion.ts
 */
import { arithmeticNumberSystems as ans } from '../src/data/library/books/mathematics/arithmetic-number-systems/book'
import { foundationMathematics as fm } from '../src/data/library/books/mathematics/foundation-mathematics/book'
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
ok(ans.id === 'arithmetic-and-number-systems', 'book id stable kebab-case')
ok(ans.discipline === 'mathematics', 'discipline = mathematics')
ok(ans.status === 'planned', 'book status planned')
ok(ans.chapters.length === 10, `10 chapters (got ${ans.chapters.length})`)
ok(ans.chapters.map((c) => c.number).join(',') === '1,2,3,4,5,6,7,8,9,10', 'chapter numbers sequential 1..10')
const slugs = ans.chapters.map((c) => c.slug)
ok(new Set(slugs).size === slugs.length, 'chapter slugs unique book-wide')
ok(ans.chapters.every((c) => c.status === 'planned'), 'all chapters planned')
ok(ans.chapters.every((c) => c.lessons.length === 0), 'no lessons written yet (empty shells forbidden as LESSONS; planned TOC is the deliverable)')
ok(ans.chapters.every((c) => (c.plannedLessons?.length ?? 0) > 0), 'every chapter carries planned lessons')
const plannedTitles = ans.chapters.flatMap((c) => c.plannedLessons ?? [])
ok(plannedTitles.length === 34, `34 planned lessons (got ${plannedTitles.length})`)
ok(new Set(plannedTitles).size === plannedTitles.length, 'planned lesson titles unique book-wide')
ok(plannedTitles.every((t) => t.trim().length > 8), 'no stub titles')
ok(ans.chapters.every((c) => c.summary.length > 120), 'every chapter summary is a real pedagogical paragraph')
for (const c of ans.chapters) {
  ok(typeof c.title === 'string' && c.title.length > 3, `ch.${c.number} title set`)
}

/* ------------------------------------------------------------------ */
/* B. Registry                                                         */
/* ------------------------------------------------------------------ */
section('B. Registry integration')
ok(allBooks.length === 2, `allBooks has 2 books (got ${allBooks.length})`)
ok(allBooks.some((b) => b.id === ans.id), 'ANS book registered in allBooks')
const stats = libraryStats()
ok(stats.books === 2, `libraryStats().books = 2 (got ${stats.books})`)
const ansStats = bookStats(ans)
ok(ansStats.written === 0, '0 written lessons')
ok(ansStats.planned === 34, `bookStats().planned = 34 (got ${ansStats.planned})`)
ok(ansStats.words === 0, '0 words (honest counter — nothing authored yet)')
ok(bookLessons(ans).length === 0, 'bookLessons empty (reader/search pick up nothing yet)')

/* ------------------------------------------------------------------ */
/* C. Uniqueness against Foundation Mathematics                        */
/* ------------------------------------------------------------------ */
section('C. Uniqueness vs Foundation Mathematics')
const fmLessonTitles = fm.chapters.flatMap((c) => c.lessons.map((l) => l.title.toLowerCase()))
const fmPlannedTitles = fm.chapters.flatMap((c) => (c.plannedLessons ?? []).map((t) => t.toLowerCase()))
const fmLessonIds = fm.chapters.flatMap((c) => c.lessons.map((l) => l.id))
ok(new Set(fmLessonIds).size === fmLessonIds.length, 'FM lesson ids unique (sanity)')
ok(fmLessonIds.every((id) => id.startsWith('fm-')), 'FM ids use the fm- prefix')
const ansChapterSlugsGlobal = ans.chapters.map((c) => `ans/${c.slug}`)
const fmChapterSlugs = fm.chapters.map((c) => c.slug)
ok(
  ansChapterSlugsGlobal.every((s) => !fmChapterSlugs.includes(s.replace('ans/', ''))),
  'no chapter slug collides with any FM chapter slug',
)
for (const t of plannedTitles) {
  ok(!fmLessonTitles.includes(t.toLowerCase()), `planned title not an FM lesson title: "${t}"`)
  ok(!fmPlannedTitles.includes(t.toLowerCase()), `planned title not an FM planned title: "${t}"`)
}

/* ------------------------------------------------------------------ */
/* D. Cross-reference anchors (the FM lessons future ANS lessons cite) */
/* ------------------------------------------------------------------ */
section('D. FM cross-reference anchors exist')
const fmAnchors: [string, string][] = [
  ['fm-divisibility-and-its-tests', 'FM 3.1 Divisibility and Its Tests (ANS 5.2 re-derives it)'],
  ['fm-prime-numbers-factorisation', 'FM 3.2 Prime Numbers and Factorisation (ANS ch. 4 proves uniqueness)'],
  ['fm-lowest-common-multiple', 'FM 3.4 LCM (ANS ch. 4 counts divisors)'],
  ['fm-decimals-and-fractions-two-ways', 'FM 5.2 decimals = fractions (ANS 7.3 proves the expansion theorem)'],
  ['fm-negative-numbers-why-they-exist', 'FM 7.1 why negatives exist (ANS ch. 6 constructs them)'],
  ['fm-patterns-to-formulas', 'FM 11.2 patterns → formulas (ANS 1.2 formalises induction)'],
]
for (const [id, label] of fmAnchors) {
  ok(fmLessonIds.includes(id), `anchor exists: ${label}`)
}

/* ------------------------------------------------------------------ */
/* E. Research mapping                                                 */
/* ------------------------------------------------------------------ */
section('E. Research-phase mapping (header claims vs chapter plan)')
const fileText = await Bun.file(`${import.meta.dir}/../src/data/library/books/mathematics/arithmetic-number-systems/book.ts`).text()
const header = fileText.length > 0
ok(header, 'book module + source file readable')
const desc = (ans.description + ' ' + fileText).toLowerCase()
ok(desc.includes('khattar'), 'competitive-exam reference named (Khattar QA 4e)')
ok(desc.includes('art of proof') || desc.includes('beck'), 'university bridge reference named (Beck & Geoghegan)')
ok(desc.includes('openstax') || desc.includes('babylon'), 'historical numeration reference named')
ok(desc.includes('igcse') || desc.includes('binary'), 'machine-representation reference named')
ok(desc.includes('ncert'), 'school canon named (NCERT)')
// chapter coverage of the five families
const planText = ans.chapters.map((c) => (c.summary + ' ' + (c.plannedLessons ?? []).join(' '))).join(' ').toLowerCase()
ok(planText.includes('euclid'), 'ch. 2/4 cover the Euclid material')
ok(planText.includes('base') && planText.includes('binary'), 'ch. 3 covers bases + binary')
ok(planText.includes('congruence') && planText.includes('casting out nines'), 'ch. 5 covers congruences + casting out nines')
ok(planText.includes('constructing the integers'), 'ch. 6 constructs the integers')
ok(planText.includes('field laws'), 'ch. 7 covers the field laws')
ok(planText.includes('irrational') && planText.includes('√2'), 'ch. 8 covers irrationality')
ok(planText.includes('babylon') || planText.includes('mayan'), 'ch. 9 covers Babylon/Maya')
ok(planText.includes('checksum') || planText.includes('extension'), 'ch. 10 covers checksums/extension story')

/* ------------------------------------------------------------------ */
console.log(`\n${'='.repeat(60)}`)
console.log(`verify-book2-promotion: ${checks - failures}/${checks} checks pass, ${failures} failures`)
console.log('='.repeat(60))
if (failures > 0) process.exit(1)
export {}
