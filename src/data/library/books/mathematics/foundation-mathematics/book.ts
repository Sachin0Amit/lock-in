import type { Book } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'

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
 * all gates green, unit-3 completion review passed. Next: chapter 4
 * (Fractions). Authoring per docs/project/MASTER_PLAN.md §2.
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
    'Chapters 1–3 complete (units 1–3 shipped 2026-11-03): ch. 1 lessons 1.1–1.3 (9,708 words), ch. 2 lessons 2.1–2.5 The Four Operations (21,425 words, incl. order of operations / BODMAS), ch. 3 lessons 3.1–3.5 Factors, Multiples and Primes (27,896 words: divisibility tests, primes and the FTA, HCF via three routes plus Bézout, LCM via three routes, and the product rule closing the unit — gcd × lcm = a × b, coprime splits, pair reconstruction, feasibility, rectangle identity). Chapter 4 Fractions opened 2026-11-03: lesson 4.1 The Idea of a Fraction (6,051 words: part–whole + division faces, number line and density via the mediant theorem, proper/improper/mixed, Egyptian unit fractions). Math script-verified (84 unit-4 checks + 260 unit-3 + 165 unit-2), E2E green. Next: lesson 4.2 Equivalent Fractions and Simplification. Reference collection surveyed (Google Drive "books"); per-unit downloads per MASTER_PLAN §2.',
  chapters: [
    chapter01,
    chapter02,
    chapter03,
    chapter04,
    {
      number: 5,
      slug: 'decimals-and-percents',
      title: 'Decimals and Percents',
      summary:
        'Place value extended to the right of the point, the natural marriage of decimals and fractions, percent as a standardised fraction of 100, and the practical arithmetic of increase, decrease, discount and interest.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Decimal Places and the Point',
        'Decimals and Fractions, Two Ways of Writing the Same Numbers',
        'Operating on Decimals',
        'Percent and Its Meaning',
        'Percentage Change, Discounts and Simple Interest',
      ],
    },
    {
      number: 6,
      slug: 'ratio-rate-proportion',
      title: 'Ratio, Rate and Proportion',
      summary:
        'Comparing quantities by division rather than difference: ratios in simplest form, unit rates, the cross-multiplication test for proportion, direct and inverse variation, and scaling in maps, recipes and models.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Ratio as a Comparison',
        'Rates and Unit Rates',
        'Proportion and Cross-Multiplication',
        'Direct and Inverse Variation',
        'Scaling: Maps, Models and Recipes',
      ],
    },
    {
      number: 7,
      slug: 'integers',
      title: 'Integers',
      summary:
        'Negative numbers earn their place on the number line: temperatures, debts and directions; the sign rules derived rather than memorised; absolute value as distance; and the coordinate plane preview.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Negative Numbers and Why They Exist',
        'Adding and Subtracting Integers',
        'Multiplying Integers and the Sign Rules',
        'Absolute Value as Distance',
      ],
    },
    {
      number: 8,
      slug: 'geometry-foundations',
      title: 'Geometry Foundations',
      summary:
        'The visual half of mathematics begins: points, lines, planes and angles as ideal objects; measuring angles; parallel lines and transversals; triangles and the angle-sum result; and the first area formulas, derived.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Points, Lines and Planes',
        'Angles and Their Measurement',
        'Parallel Lines and Transversals',
        'Triangles and the Angle Sum',
        'Perimeter and Area of Rectangles, Triangles and Circles',
      ],
    },
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
