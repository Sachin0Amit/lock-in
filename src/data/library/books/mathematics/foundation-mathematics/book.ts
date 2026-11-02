import type { Book } from '../../../types'
import { chapter01 } from './ch-01'

/**
 * Foundation Mathematics — the first book of the Mathematics shelf.
 *
 * STATUS: in-progress. Chapter 1 lesson 1.1 is authored (pipeline validation);
 * the remaining TOC is planned but NOT yet written. Full authoring begins
 * after the Google Drive reference collection is surveyed, per the master
 * plan's research-first workflow (docs/project/MASTER_PLAN.md §2 & §11).
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
    'Chapter 1 lesson 1.1 authored as the platform pipeline-validation lesson. Chapters 2–11 are planned; authoring resumes after the Google Drive source collection is surveyed for this subject.',
  chapters: [
    chapter01,
    {
      number: 2,
      slug: 'the-four-operations',
      title: 'The Four Operations',
      summary:
        'Addition, subtraction, multiplication and division — first as actions on quantities, then as algorithms on numerals, where the overflow argument from Chapter 1 returns as carrying and borrowing. Includes order of operations, estimation checks, and why division by zero is undefined.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Addition and the Art of Carrying',
        'Subtraction and Borrowing',
        'Multiplication as Repeated Addition — and Beyond',
        'Division, Remainders and Why Zero Never Divides',
        'Order of Operations and the Language of Expressions',
      ],
    },
    {
      number: 3,
      slug: 'factors-multiples-primes',
      title: 'Factors, Multiples and Primes',
      summary:
        'The multiplicative structure of whole numbers: divisibility tests with reasons, prime factorisation, HCF and LCM by three routes, and a first meeting with the infinitude of primes.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Divisibility and Its Tests',
        'Prime Numbers and Factorisation',
        'Highest Common Factor',
        'Lowest Common Multiple',
        'HCF, LCM and How They Relate',
      ],
    },
    {
      number: 4,
      slug: 'fractions',
      title: 'Fractions',
      summary:
        'Why we need numbers between the integers, what a fraction really is, equivalence, comparison, the four operations on fractions, and the number line made dense.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Idea of a Fraction',
        'Equivalent Fractions and Simplification',
        'Comparing Fractions',
        'Adding and Subtracting Fractions',
        'Multiplying and Dividing Fractions',
      ],
    },
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
