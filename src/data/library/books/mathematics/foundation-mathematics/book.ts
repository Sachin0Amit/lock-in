import type { Book } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'
import { chapter05 } from './ch-05'
import { chapter06 } from './ch-06'
import { chapter07 } from './ch-07'
import { chapter08 } from './ch-08'

/**
 * Foundation Mathematics — the first book of the Mathematics shelf.
 *
 * STATUS: in-progress. Chapter 1 (Numbers and Place Value) COMPLETE —
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
  status: 'in-progress',
  accent: ['#b45309', '#78350f'],
  notes:
    'Chapters 1–4 complete (units 1–4 shipped 2026-11-03/04): ch. 1 lessons 1.1–1.3 Numbers and Place Value (9,708 words), ch. 2 lessons 2.1–2.5 The Four Operations (21,425 words, incl. order of operations / BODMAS), ch. 3 lessons 3.1–3.5 Factors, Multiples and Primes (27,896 words), ch. 4 lessons 4.1–4.5 Fractions (26,905 words: 4.1 The Idea of a Fraction — part–whole + division faces, the number line made dense via the mediant theorem, proper/improper/mixed, Egyptian unit fractions; 4.2 Equivalent Fractions and Simplification — the equivalence family, the multiplying rule, HCF simplification, the cross-multiplication licence paid in full, uniqueness of the lowest-terms name; 4.3 Comparing Fractions — the cross-multiplication verdict machine, the common-denominator method, benchmark halves, completing the whole, wholes-first; 4.4 Adding and Subtracting Fractions — like-ruler counting proved by distributivity, the LCM as standard equipment, subtraction as gap-naming, mixed-number regrouping, the greedy Egyptian split, the straight-across fraud theorem; 4.5 Multiplying and Dividing Fractions — multiplication as of and the re-cutting rule proved from the rulers, scaling and the retired makes-bigger reflex, cross-cancellation, the reciprocal and the division theorem proved on the bd-ruler, the HCF/LCM-of-fractions shortcuts banked since 4.1 cashed with the product rule surviving, mixed numbers converted before operating). Chapter 5 lessons 5.1–5.5 Decimals and Percents: 5.1 Decimal Places and the Point (run 21 — the extended place-value mirror, the atom test for exact decimal dress, the trailing-zero licence, comparing by aligning the points, money/length/mass conversions); 5.2 Decimals and Fractions, Two Ways of Writing the Same Numbers (run 22 — long division past the point, the dresses theorem and the pigeonhole carousel, pure vs mixed recurrence with the head-length theorem, the 142857 rotation family, shift-and-subtract both ways, the 0.(9) = 1 trap; 5.1\'s 22/7 waltz digits corrected to 3.142857…); 5.3 Operating on Decimals (run 23 — aligning the points, the whole-number engine + the places-add rule, the point-shift rule, clearing the divisor, the long-division tableau, the unitary method); 5.4 Percent and Its Meaning (run 24 — the x/100 definition on the 100-square, the two-hop law proved from the point-shift at k = 2, the conversion-map figure, the benchmark ladder and halving chain, percent-of and the unitary method returned, the commutativity gem); 5.5 Percentage Change, Discounts and Simple Interest (run 25, the chapter\'s final lesson — every percent names a base: \"of what?\"; the factor law N = O(100 ± r)/100 proved as a derivation block; the round-trip r²/100 % law with both return tickets drawn; finding the original by the return ticket; profit/loss percent on the cost price, discount percent on the marked price, the two-lane figure to one SP; the multiplier law — factors multiply, percents never add; simple interest I = PRT/100 from the one-percent-a-year unit, the per-annum trap, the compound door left open). RichText parser upgraded run 25: $math$ now renders inside **bold** and *italic* site-wide (12 latent raw-LaTeX leaks repaired across chs. 2–5, zero content edits). Lessons from 4.2 on authored natively in the Cengage voice + solution chain; the 14 pre-4.2 lessons\' prose voice polish queued one per run (1.1 run 26, 1.2 run 27, 1.3 run 29, 2.1 run 30, 2.2 run 34, 2.3 run 35 done; 3.1-3.5 and 4.1 remain). Math script-verified (165 unit-6 checks + 455 unit-5 + 330 unit-4 + 260 unit-3 + 165 unit-2), E2E green (15 lessons), quiz keys verified live.Chapter 6 (Ratio, Rate and Proportion) COMPLETE — 5/5 lessons (unit 6, runs 26-32): 6.1 Ratio as a Comparison (run 26 — the two lenses, the definition a : b = a/b, simplest form by the HCF, equivalent ratios + cross-test, three-term ratios, sharing with the share formula proved, the dots-family and sharing-map figures); 6.2 Rates and Unit Rates (run 27 — rates as ratios of different kinds with units riding, the one-part unit-rate engine, the same-way comparison law with the direction-fraud and bulk-illusion Cautions, the double-ruler figure, speed as flagship with the journey map, the 5/18 km/h <-> m/s conversion proved, the average-speed Caution); 6.3 Proportion and Cross-Multiplication (run 29 — the proportion statement a : b :: c : d, the cross law proved both directions, extremes/means, the test-and-fill engine, alternendo and invertendo, continued proportion with mean proportional b^2 = ac, the line-of-agreement figure); 6.4 Direct and Inverse Variation (run 30 — the two locks y/x = k and xy = k, the parking fraud, the factor laws, the recognition drill, the flip with figure 2 polished in run 31 into mirror-symmetric cubic swap-arcs per the owner\'s arrow directive, the hyperbola smoothed to a 36-vertex path, work problems); 6.5 Scaling: Maps, Models and Recipes (run 32 — the scale in three dresses, the RF proved 1 cm : 18 km = 1 : 18,00,000, the atlas bar-scale figure with the road drawn exactly four bar-segments long, the photocopy insight, the scale engine both ways, the model van 1 : 24, the area law (areas carry m^2), the two-direction factor bars, the similarity door, the recipe multiplier proved from the per-serving constant with the khichdi table, the clock-is-not-an-ingredient Caution, the five-instrument chapter harvest). Math script-verified (444 unit-6 checks A-AZ + 455 unit-5 + 330 unit-4 + 260 unit-3 + 165 unit-2), E2E green (18 lessons), quiz keys verified live 5/5 on every lesson. Chapter 7 (Integers) COMPLETE — 4/4 lessons (unit 7, runs 33-36): 7.1 Negative Numbers and Why They Exist (run 33 — the two-direction failure and the chosen zero, ℤ as equation tag 1 + ℕ ⊂ W ⊂ ℤ as tag 2, the ordering law with the −8 < −3 trap, opposites via the double reflection, absolute value\'s first look, the signed-numbers-in-the-wild table, the elevation-section figure, the historical callout from the Chinese rods to Brahmagupta to Descartes); 7.2 Adding and Subtracting Integers (run 34 — the movement model with the five-case sign table, subtraction as adding the opposite proved as a derivation, the double-sign table, the two-panel walk + subtraction-map figures, Brahmagupta\'s subtraction verses, 7.1\'s inverse-sweep promissory note cashed); 7.3 Multiplying Integers and the Sign Rules (run 35 — the repeated-walk model, the staircase derivation, minus-times-minus derived TWICE: the forced staircase + the distributive argument with the general sign law as equation tag 2, the six properties, sign parity, Brahmagupta\'s multiplication verses, the product-staircase figure); 7.4 Absolute Value as Distance (run 36, the chapter\'s closing lesson — the distance definition + the piecewise rule as tag 1, the mirror/multiplicative/triangle properties with grid certificates, the outside-minus Caution, the distance formula gap(a,b) = |a−b| = |b−a| as tag 2 cashing every gap the chapter counted (the lift 9, the mall 12/24, the Everest–Dead Sea 9288.64 m, the Vostok–Phalodi 140.2°), the |x| = k verdict table, the bars-erase-one-bit insight, Argand\'s 1806 modulus + Weierstrass\'s 1841 bars). Math script-verified (302 unit-7 checks A-AH + 444 unit-6 + 455 unit-5 + 330 unit-4 + 260 unit-3 + 165 unit-2), E2E green (22 lessons), quiz keys verified live 5/5 on every lesson. Chapter 8 (Geometry Foundations) OPEN — 2/5 lessons (unit 8, runs 37-38): 8.1 Points, Lines and Planes (run 37 — the ideal objects point/line/ray/segment/plane defined in the is-said-to-be shape, the drawn-vs-ideal Caution, segment length = 7.4\'s distance formula re-read, figure 1 the three avatars, the two-point rule as tag 1 with the at-most-one-common-point derivation, intersecting/parallel/concurrent with the meeting-layouts figure, the counting law N = n(n-1)/2 as tag 2 with the collinearity pooling trap, the Euclid Elements historical callout); 8.2 Angles and Their Measurement (run 38 — the angle as two rays + vertex in the is-said-to-be shape with the naming roman run and the static-vs-dynamic Note, the degree ledger as tag 1 (full 360 / half 180 / quarter 90) with the honest Babylonian history and the 24 divisors, the five sizes with the witness table and the five-panel gallery figure drawn to scale, Postulate 4 and the square-corner mark, the smaller-turn convention, the protractor figure with the two-scale trap Caution (outer 50 vs inner 130, the crossing dot, the end ticks), the door reflex 360 − 115 = 245, complementary/supplementary as tag 2 with the supp − comp = 90° identity derived, the 24°-more-than-its-complement equation (33/57), the four-ray census 6, the exam corner with the clock speeds 30°/h = 0.5°/min and 6°/min, the Euclid-defs + Babylonian-degree + Huddart-1801 historical callout). Math script-verified (189 unit-8 checks A-W + 302 unit-7 + 444 unit-6 + 455 unit-5 + 330 unit-4 + 260 unit-3 + 165 unit-2), E2E green (24 lessons), quiz keys verified live 5/5 (8.2 keys 1/1/0/2/2). Next chapter 8 lesson: 8.3 Parallel Lines and Transversals. Voice polish: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3 done (run 38); 3.4, 3.5 + 4.1 remain. Reference collection surveyed (Google Drive books); per-unit downloads per MASTER_PLAN Section 2.',
  chapters: [
    chapter01,
    chapter02,
    chapter03,
    chapter04,
    chapter05,
    chapter06,
    chapter07,
    chapter08,
    {
      number: 9,
      slug: 'measurement',
      title: 'Measurement',
      summary:
        'What it means to measure: units as agreements, the metric system from first principles, unit conversion as multiplication by one, and the difference between precision and accuracy.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Units as Agreements',
        'The Metric System',
        'Converting Units Without Memorising Tables',
        'Precision, Accuracy and Rounding in Measurement',
      ],
    },
    {
      number: 10,
      slug: 'data-and-graphs',
      title: 'Data and Graphs',
      summary:
        'Reading the world in tables and pictures: frequency tables, bar charts, line graphs, pie charts and when each lies or tells the truth; the mean, median and mode introduced honestly with their strengths and traps.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Collecting and Tallying Data',
        'Bar Charts, Line Graphs and Pie Charts',
        'Reading Graphs Critically',
        'Mean, Median and Mode',
      ],
    },
    {
      number: 11,
      slug: 'patterns-and-algebra-preview',
      title: 'Patterns and the Doorstep of Algebra',
      summary:
        'Number patterns, sequences built by rules, matchstick and tile patterns expressed as formulas, and the first use of a letter for an unknown — the exact point where Elementary Algebra takes over the climb.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Patterns and Rules',
        'From Patterns to Formulas',
        'A Letter for the Unknown',
      ],
    },
  ],
}
