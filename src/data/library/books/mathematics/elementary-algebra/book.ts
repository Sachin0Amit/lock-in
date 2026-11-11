import type { Book } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'
import { chapter05 } from './ch-05'
import { chapter06 } from './ch-06'
import { chapter07 } from './ch-07'
import { chapter08 } from './ch-08'
import { chapter09 } from './ch-09'
import { chapter10 } from './ch-10'
import { chapter11 } from './ch-11'
import { chapter12 } from './ch-12'

/**
 * Elementary Algebra — the third book of the Mathematics shelf.
 *
 * STATUS: COMPLETE (run 88, 2026-11-10) — 11 chapters / 37 lessons,
 * authored unit by unit across runs 67–88 (two lessons per run, strictly
 * sequential, every number verifier-priced before prose). The full TOC
 * below is the researched chapter plan (11 chapters / 37 lessons) — fully
 * written. Authoring opened at chapter 1 in run 67 (1.1 + 1.2) and CLOSED it in run
 * 68 (1.3 + 1.4 + the unit-1 completion review): chapter 1 COMPLETE 4/4.
 * Chapter 2 opened in run 69 (2.1 + 2.2) and CLOSED in run 70 (2.3 + the
 * unit-2 completion review): chapter 2 COMPLETE 3/3. Chapter 3 'Polynomials'
 * opened at run 71 (3.1 + 3.2) and CLOSED in run 72 (3.3 + 3.4 + the unit-3
 * completion review): chapter 3 COMPLETE 4/4 (18,656 words). Chapter 4
 * 'Factorization' opened at run 73 (4.1 Common Factors and Grouping + 4.2
 * Factoring Quadratic Trinomials) and CLOSED at run 74 (4.3 The Identities
 * as Factorizations + 4.4 The Factor Theorem and Cubics + the unit-4
 * completion review PASSED): chapter 4 COMPLETE 4/4 (16,245 words).
 * Chapter 5 'Linear Equations in One Variable' opened at run 75 (5.1 What
 * an Equation Is: the Balance Principle + 5.2 Solving Linear Equations) and
 * CLOSED at run 76 (5.3 The Three Verdicts: One, None, Infinitely Many +
 * the unit-5 completion review PASSED — 14,024 words across the chapter):
 * chapter 5 COMPLETE 3/3. Chapter 6 'Simultaneous Linear Equations' opened
 * at run 77 (6.1 Equations in Two Variables + 6.2 Substitution and
 * Elimination) and CLOSED at run 78 (6.3 Consistency: the Geometry of Two
 * Lines + the unit-6 completion review PASSED): chapter 6 COMPLETE 3/3.
 * Chapter 7 'Inequalities' opened at run 79 (7.1 Order and the Solution
 * Set + 7.2 Solving Linear Inequalities) and CLOSED at run 80 (7.3
 * Compound Inequalities and Applications + the unit-7 completion review
 * PASSED — 15,410 words across the chapter): chapter 7 COMPLETE 3/3.
 * Chapter 8 'Algebraic Fractions' OPENED at run 81 (8.1 Rational
 * Expressions: Simplify First — 8.2 Operating on Algebraic Fractions is
 * this run's second lesson): 8.3 'Fractional Equations and Extraneous
 * Roots' + the unit-8 review close the chapter at run 82. Chapter 9
 * 'Quadratic Equations' OPENED at run 83 (9.1 Quadratics and Factoring
 * Solutions + 9.2 Completing the Square, Derived) and CLOSED at run 84
 * (9.3 The Quadratic Formula and the Discriminant + 9.4 Roots and
 * Coefficients: Viète's Relations + the unit-9 completion review PASSED):
 * chapter 9 COMPLETE 4/4. Chapter 10 'Graphs of Equations' OPENED at run 85
 * (10.1 The Coordinate Plane and Linear Graphs + 10.2 Slope: the
 * Steepness Theorem) and CLOSED at run 86 (10.3 'The Parabola:
 * Quadratic Graphs and Vertices' + the unit-10 completion review PASSED):
 * chapter 10 COMPLETE 3/3 (14,591 words). Chapter 11 'The Toolbox and
 * the Doorstep' OPENED at run 87 (11.1 'Word Problems: the Toolkit at
 * Work' + 11.2 'Competition Algebra: Identities and Substitutions' —
 * the five-station pipeline across the canon's five families, the
 * identity bank with the speed reads, the symmetric reads and the
 * clever substitution) and CLOSED at run 88 (11.3 'The Function Idea:
 * the Doorstep' + the unit-11 completion review PASSED + THE BOOK
 * CLOSE — the input-output machine, the domain's two filters, the
 * vertical-probe test, the range from the fold, the composition
 * doorstep): chapter 11 COMPLETE 3/3. THE BOOK IS COMPLETE — 11 of 11
 * chapters, 37 lessons, the status flipped to 'complete' at run 88
 * with the handoff note named: Advanced Algebra (functions as objects,
 * composites, inverses), Coordinate Geometry (functions and graphs as
 * first citizens), Trigonometry (the first great non-polynomial
 * family) and Calculus (how the output changes as the input slides).
 * The next book's opening is its own run with its own research phase
 * (owner cadence: two lessons per run, strictly sequential). Lesson
 * ids use the `al-` prefix (globally unique, stable forever).
 *
 * POSITIONING (the no-duplication contract, MASTER_PLAN rule 7): Foundation
 * Mathematics opened the doorstep of algebra with patterns → formulas and a
 * letter for the unknown (FM 11.2/11.3), and banked the operational toolkit
 * this book assumes — fractions and their laws (FM ch. 4), order of
 * operations (FM 2.8), integers and the sign rules (FM ch. 7), HCF/LCM
 * (FM ch. 3), ratios and variation (FM ch. 6). Arithmetic and Number
 * Systems proved the ground the letters stand on: the field laws (ANS 7.2),
 * the division algorithm (ANS 2.1), the real line (ANS ch. 8), and the
 * extension-ladder discipline of repairing failures on purpose (ANS ch. 10).
 * THIS book opens the door: the first full algebra course. Letters stop
 * being abbreviations and become objects with structure — expressions built
 * by the laws, polynomials as a family, factorization as multiplication
 * undone, equations as assertions to be settled lawfully, and the quadratic
 * formula finally DERIVED rather than memorized. Every FM-banked skill is
 * cross-referenced, never re-taught; where ANS proved the number systems,
 * this book puts those systems to work carrying letters. It hands off to
 * Advanced Algebra (polynomials in depth), Coordinate Geometry and
 * Trigonometry (graphs and triangles in full), and Calculus (functions).
 *
 * RESEARCH PHASE (done 2026-11-07, run 66):
 * - Reference survey: the Drive collection carries three direct references:
 *   `Elementary-Algebra_text.pdf` — H. S. Hall & S. R. Knight's
 *   *Elementary Algebra for Schools* (Macmillan, first edition 1885; the
 *   1942 reprint in the Drive — the run-66 header had attributed it to
 *   Harold Jacobs; corrected in SOURCE_LOG.md 2026-11-07) — the
 *   Algebra-1-equivalent classic whose chapter arc definitions and
 *   substitutions → negative quantities and like terms → simple brackets
 *   → subtraction → multiplication → … is the course spine),
 *   `Higher Algebra - Hall & Knight.pdf` (+ a second copy) — the classic
 *   British text for the stretch and handoff material, and the Cengage
 *   `MATHS` M2 module (= Algebra, JEE series; the M2/01 unit was the style
 *   reference of runs 14/16). Khattar QA 4e owns the competitive-exam
 *   algebra scope. No downloads were needed for the research phase itself;
 *   per-unit downloads follow at authoring time.
 * - Syllabus audit (sanctioned internet fallback, web-checked this run):
 *   (a) the NCERT school canon's algebra arc — class 6 ch. 11 "Algebra" and
 *   class 7 ch. 4 "Simple Equations" (both already banked keys), class 8
 *   ch. 2 "Linear Equations in One Variable", ch. 10 "Exponents and Powers",
 *   ch. 12 "Factorisation", class 9 ch. 2 "Polynomials", class 10 ch. 3
 *   "Pair of Linear Equations in Two Variables" and ch. 4 "Quadratic
 *   Equations" (contents pages checked 2026-11-07) — maps to chapters 2, 5,
 *   6, 3, 4 and 9;
 *   (b) the modern open-textbook structure (OpenStax Elementary Algebra 2e:
 *   expressions → linear equations and inequalities → graphing → systems →
 *   polynomials → factoring → rational expressions → quadratics) — the
 *   sequencing cross-check for chapters 1–9;
 *   (c) the competitive-exam scope (Khattar QA; CAT/IPMAT/SSC algebra):
 *   identities, factorization tricks, linear/quadratic solving speed,
 *   roots-and-coefficients relations — maps to chapters 3, 4, 9, 11;
 *   (d) the classic stretch (Hall & Knight Higher Algebra) — remainder and
 *   factor theorems, cubic factoring, Viète's relations — maps to the ends
 *   of chapters 3, 4, 9 and the handoff;
 *   (e) the function doorstep (every syllabus ends algebra entering
 *   functions) — chapter 11 closes the book on it.
 *
 * PRE-WRITTEN-BOOKS AUDIT (2026-11-11, owner directive: apply the
 * Advanced Algebra research protocol to the three complete books): the
 * banked classic H&K *Elementary Algebra for Schools* was re-downloaded
 * (Drive id 13p83Jss..., 572 pp., chapters I–XXI recovered — see
 * docs/research/PREWRITTEN_BOOKS_AUDIT.md) and audited chapter-by-chapter
 * against the book as written. Verdict: the I–XXI spine audits clean.
 * Three genuine gaps found, all registered now: (a) H&K XII/XIX +
 * Khattar ch. 26 — HCF and LCM of algebraic expressions — queued as
 * lesson 4.5; (b) H&K XXVI — simultaneous quadratic equations (one
 * linear + one quadratic, symmetric systems) — queued as lesson 6.4;
 * (c) H&K XXXII + Khattar ch. 7 — the algebraic ratio/proportion/
 * variation layer — queued as the new chapter 12. Status flipped to
 * 'in-progress' until the gap lessons ship; the audit doc carries the
 * per-lesson authoring plans and the closure queue.
 */
export const elementaryAlgebra: Book = {
  id: 'elementary-algebra',
  title: 'Elementary Algebra',
  subtitle: 'Letters with structure — the first full algebra course',
  discipline: 'mathematics',
  level: 'Class 6–10 algebra → the doorway to higher algebra',
  description:
    'The book where arithmetic grows up. Foundation Mathematics opened the doorstep — patterns into formulas, a letter for the unknown; Arithmetic and Number Systems proved the ground the letters stand on. This book opens the door: expressions built and simplified by the laws, the exponent family completed with zero and negative powers, polynomials added, multiplied and divided, factorization as multiplication undone (with the remainder and factor theorems proved, not recited), linear equations settled by lawful balance, simultaneous equations by substitution and elimination, inequalities on the real line, algebraic fractions with their excluded values kept honest, and the quadratic equation finally met four ways — factoring, completing the square (derived), the quadratic formula (proved), and Viète’s roots-and-coefficients relations. Graphs turn every solution into geometry, and the book ends where algebra ends: at the idea of a function. Cross-references Foundation Mathematics and Arithmetic and Number Systems throughout; hands off to Advanced Algebra, Coordinate Geometry and Calculus.',
  status: 'in-progress',
  accent: ['#65a30d', '#166534'],
  chapters: [
    chapter01,
    chapter02,
    chapter03,
    chapter04,
    chapter05,
    chapter06,
    chapter07,
    chapter08,
    chapter09,
    chapter10,
    chapter11,
    chapter12,
  ],
}
