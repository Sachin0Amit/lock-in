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

/**
 * Foundation Mathematics — the first book of the Mathematics shelf.
 *
 * STATUS: COMPLETE — 11-for-11 chapters (the final unit shipped 2026-11-05). Chapter 1 (Numbers and Place Value) COMPLETE —
 * unit 1, 2026-11-03: lessons 1.1–1.3 authored and verified. Chapter 2
 * (The Four Operations) COMPLETE — unit 2, 2026-11-03: lessons 2.1–2.5
 * shipped, all gates green, unit-2 completion review passed. Chapter 3
 * (Factors, Multiples and Primes) COMPLETE — unit 3, 2026-11-03: 3.1
 * (Divisibility and Its Tests), 3.2 (Prime Numbers and Factorisation),
 * 3.3 (Highest Common Factor), 3.4 (Lowest Common Multiple) and 3.5
 * (HCF, LCM and How They Relate — the product rule, coprime splits,
 * pair reconstruction, feasibility, the rectangle identity) shipped,
 * all gates green, unit-3 completion review passed. Chapter 4
 * (Fractions) COMPLETE — unit 4, 2026-11-04: 4.1 (The Idea of a
 * Fraction), 4.2 (Equivalent Fractions and Simplification), 4.3
 * (Comparing Fractions), 4.4 (Adding and Subtracting Fractions) and
 * 4.5 (Multiplying and Dividing Fractions — multiplication as 'of', the
 * re-cutting rule proved from the rulers, scaling, cross-cancellation,
 * the reciprocal and the division theorem, the banked HCF/LCM-of-
 * fractions shortcuts cashed, mixed numbers converted first) shipped,
 * all gates green (330 unit-4 checks), lessons 4.2–4.5 authored natively
 * in the Cengage voice + solution chain. Chapter 5 (Decimals and
 * Percents) COMPLETE — unit 5, 2026-11-04: 5.1 (Decimal Places and the
 * Point — the extended place-value mirror, the atom test, locating by
 * zooming, comparing by aligning the points), 5.2 (Decimals and
 * Fractions, Two Ways of Writing the Same Numbers — the dresses theorem,
 * the remainder carousel, the head-length theorem, the 142857 family),
 * 5.3 (Operating on Decimals — align the points, the places-add rule,
 * the point-shift rule, clearing the divisor, the unitary method), 5.4
 * (Percent and Its Meaning — the x/100 definition on the 100-square, the
 * two-hop law proved from the point-shift, the benchmark ladder, the
 * commutativity gem) and 5.5 (Percentage Change, Discounts and Simple
 * Interest — the factor law on the original, the round-trip r²/100 %
 * law, profit/loss on cost, discount on the tag, the multiplier law,
 * simple interest I = PRT/100) shipped, all gates green (455 unit-5
 * checks), 5.2–5.5 authored natively in the Cengage voice + solution
 * chain, unit-5 completion review passed. Chapter 6 (Ratio, Rate and
 * Proportion) IN PROGRESS — unit 6 opened 2026-11-04: 6.1 (Ratio as a
 * Comparison — the two lenses, the definition a : b = a/b, simplest form
 * by the HCF, equivalent ratios, three-term ratios, sharing with the
 * share formula proved) and 6.2 (Rates and Unit Rates — rates as ratios
 * of different kinds with units riding, the unit rate as the one-part
 * engine, the same-way comparison law, the double-ruler and journey-map
 * figures, speed with the 5/18 conversion law proved, honest averages)
 * shipped, all gates green (165 unit-6 checks), 6.2 authored natively
 * in the Cengage voice + solution chain. Next in chapter 6: 6.3
 * (Proportion and Cross-Multiplication). Authoring per
 * docs/project/MASTER_PLAN.md §2.
 *
 * Chapter 9 (Measurement) COMPLETE — 4/4 lessons (unit 9, runs 42-44,
 * 2026-11-05): 9.1 Units as Agreements, 9.2 The Metric System, 9.3
 * Converting Units Without Memorising Tables and 9.4 Precision, Accuracy
 * and Rounding in Measurement shipped verify-first (verify-unit-9.ts
 * grown to 534 checks A-AO, ALL PASS before writing; gitignore exceptions
 * FIRST), the unit-9 completion review passed (run-6/11/20/25/36/41
 * precedent). Chapter 10 (Data and Graphs) COMPLETE — 4/4 lessons (unit
 * 10, runs 44-46, 2026-11-05): 10.1 Collecting and Tallying Data (run
 * 44; verify-unit-10.ts CREATED with 81 checks A-I), 10.2 Bar Charts,
 * Line Graphs and Pie Charts and 10.3 Reading Graphs Critically (run
 * 45; extended to 186 checks J-Z2) and 10.4 Mean, Median and Mode (run
 * 46, the chapter-closing lesson; extended to 301 checks AA-AP), all
 * shipped verify-first with gitignore exceptions FIRST, the unit-10
 * completion review passed (run-6/11/20/25/36/41 precedent). Chapter
 * 11 (Patterns and the Doorstep of Algebra) OPEN 1/3 — unit 11, run 46:
 * 11.1 Patterns and Rules shipped (verify-unit-11.ts CREATED); 11.2 and
 * 11.3 remain.
 * Voice polish: 1.1-1.3, 2.1-2.3, 3.1-3.5, 4.1 ALL DONE (run 41) —
 * the pre-4.2 queue is EMPTY.
 * TO GROW THIS BOOK:
 *  1. Create ch-NN.ts exporting a Chapter (copy the shape of ch-01.ts).
 *  2. Import it below and move it from plannedChapters into `chapters`.
 *  3. Keep lesson ids globally unique and stable forever.
 */
export const foundationMathematics: Book = {
  id: 'foundation-mathematics',
  title: 'Foundation Mathematics',
  subtitle: 'From counting to the doorstep of algebra',
  discipline: 'mathematics',
  level: 'Absolute beginner → Secondary school',
  description:
    'The ground floor of mathematics, built patiently from the act of counting: numbers and place value, the four operations and why they work, factors and primes, fractions, decimals and percents, ratio and proportion, elementary geometry and measurement, and the first taste of algebraic thinking. Every idea is introduced from zero, derived where a derivation exists, and drilled through graded exercises with full solutions — so that the books above it (Arithmetic & Number Systems, Elementary Algebra, Geometry…) can be climbed without gaps.',
  status: 'complete',
  accent: ['#ea580c', '#c2410c'],
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
  ],
}
