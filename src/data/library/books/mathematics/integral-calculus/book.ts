import type { Book, Chapter } from '../../../types'

/**
 * Integral Calculus — the ninth book of the Mathematics shelf
 * (Calculus II).
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 6 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `ic-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Differential Calculus ends by
 * asking the reverse question — THIS book answers it. The indefinite
 * integral as the antiderivative; the craft of integration (substitution,
 * parts, partial fractions — Elementary Algebra's factorization craft
 * cashed); the definite integral built honestly as the limit of a sum
 * (the JEE syllabus's own phrasing) with the fundamental theorem of
 * calculus proved at first-course depth; the properties and the Leibniz
 * rule; and the applications — areas (Coordinate Geometry's regions
 * measured), volumes, arc lengths and surface areas (Geometry's solids
 * formulas finally earned), work and moments named from Thomas. The M4
 * module's chapter 10 (Differential Equations) belongs to the later
 * Differential Equations book — cross-referenced at this book's closing
 * doorstep, never re-taught. Hands off to Differential Equations,
 * Multivariable Calculus and Real Analysis.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M4
 *   'Calculus' module chapters 7–9 map to this book: Indefinite
 *   Integration (incl. substitution, the f(g(x))g'(x) pattern, reciprocal
 *   quadratics and biquadratic expressions); Definite Integration (incl.
 *   the limit-of-sum definition, both fundamental theorems, integration
 *   by parts, infinite series summed by integration, inequalities,
 *   dummy-variable properties, halving, odd/even/periodic integrands,
 *   Leibniz's rule and reduction formulas); Area (incl. curves with the
 *   axis, two curves intersecting at two or more points, variable area,
 *   regions bounded by inequalities, and areas of inverse functions
 *   without inverting). Thomas' Calculus 14e (Drive copy) chapters 5–8
 *   own the university pole: sigma notation and finite sums, the definite
 *   integral, the fundamental theorem, substitution, volumes by
 *   cross-sections and shells, arc length, surfaces of revolution, work,
 *   fluid forces and moments; Stewart ET chapters 5–6 cross-check the
 *   sequencing.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 12 ch. 7
 *   Integrals + ch. 8 Application of Integrals; JEE Main 2026 unit 3's
 *   Integral Calculus (integral as antiderivative, fundamental integrals,
 *   substitution/parts/partial fractions, definite integral as limit of a
 *   sum, fundamental theorem of calculus); OpenStax Calculus vol 2 as the
 *   open cross-check.
 * - Exam types (the module's own typology): Concept Application Exercises
 *   inline; Single Correct Answer, Multiple Correct Answers, Linked
 *   Comprehension, Matrix Match, Numerical Value Type; JEE Archives.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-indefinite-integral',
    title: 'The Indefinite Integral',
    summary:
      'The reverse question formalized: the antiderivative and its arbitrary constant, the standard forms, the basic properties, the f(ax + b) pattern, substitution as the chain rule undone, the trigonometric integrals and their standard substitutions, the f(g(x))g\u2032(x) pattern, reciprocals of quadratics, linear-over-quadratic forms and biquadratic expressions — every technique introduced with the derivative it reverses named beside it. The antiderivatives of tan, cot, sec and cosec (the logarithm family in disguise) and the transcendental-function census — exponential, logarithmic and inverse-trigonometric integrands — named as the chapter’s own register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Antiderivative and the Constant',
      'Substitution: the Chain Rule Undone',
      'Trigonometric Integrals and Standard Substitutions',
      'Quadratic and Biquadratic Forms',
    ],
  },
  {
    number: 2,
    slug: 'integration-by-parts-and-advanced-craft',
    title: 'Integration by Parts and the Advanced Craft',
    summary:
      'The remaining engine room: integration by parts with its choice discipline (the ILATE craft), partial fractions (Elementary Algebra\u2019s factorization cashed — every case of the denominator\u2019s factorization met), reduction formulas, and the module\u2019s typical substitutions (the engineered forms exams actually set). The chapter where integration stops being reversal and becomes craft. The strategy discipline — which method when, the recognition drill — and integration using tables and computer algebra named honestly as the working engineer’s craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Integration by Parts: the Choice Discipline',
      'Partial Fractions: every Denominator Case',
      'Reduction Formulas and Typical Substitutions',
    ],
  },
  {
    number: 3,
    slug: 'the-definite-integral',
    title: 'The Definite Integral',
    summary:
      'Accumulation made honest: the definite integral as the limit of a sum (Riemann\u2019s idea, the JEE syllabus\u2019s own phrasing), the area function, the two fundamental theorems of calculus proved at first-course depth (the full theory deferred to Real Analysis — an honest note), definite integration by parts, and infinite series summed by integration — Advanced Algebra\u2019s series doorstep cashed from the far side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Limit of a Sum: Riemann\u2019s Idea',
      'The Fundamental Theorems of Calculus',
      'Definite By Parts, and Series by Integration',
    ],
  },
  {
    number: 4,
    slug: 'properties-and-the-leibniz-rule',
    title: 'The Properties and the Leibniz Rule',
    summary:
      'The definite integral\u2019s working properties: the elementary interval rules, the dummy-variable substitution (a \u2192 (a+b)\u2212a), halving the interval, odd/even and periodic integrands, inequalities between integrals, differentiation under the integral sign (Leibniz\u2019s rule, both the plain and the f(x, t) form), and evaluation by engineered substitution — the module\u2019s deepest competitive chapter, fully derived.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Elementary Properties and the Dummy Variable',
      'Odd, Even and Periodic Integrands',
      'Leibniz\u2019s Rule: Differentiating under the Integral',
    ],
  },
  {
    number: 5,
    slug: 'areas-and-applications',
    title: 'Areas and Applications',
    summary:
      'The payoff chapter: areas under curves and between them (two curves meeting at two points or many, integration along the y-axis, variable areas, regions bounded by inequalities, inverse-function areas without inverting), then Thomas\u2019s application family — volumes by cross-sections and cylindrical shells, arc length, surfaces of revolution, work, fluid forces and moments/centroids. Geometry\u2019s mensuration formulas for the cone and sphere are finally EARNED here — the cross-reference the Geometry book promised. Curves that intersect at two points (and the intersection discipline that fixes the strip before any integral is written), with applications to economics and biology — consumer surplus, producers\u2019s surplus and the growth models — named as the applied register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Areas under and between Curves',
      'Volumes by Cross-Sections and Shells',
      'Arc Length and Surfaces of Revolution',
      'Work, Fluid Forces and Centroids',
    ],
  },
  {
    number: 6,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: competition integration at speed (the properties applied in cascade, the engineered substitutions recognized on sight, the area problems with hidden symmetry), the book in one page (the map from antiderivative to centroid), and the doorstep itself: the equation with the derivative INSIDE it — the differential equation — handing off to the Differential Equations book, with Multivariable Calculus named as the next dimension.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Integration: the Craft',
      'The Book in One Page: from Antiderivative to Centroid',
      'The Doorstep: the Equation with the Derivative Inside',
    ],
  },
]

export const integralCalculus: Book = {
  id: 'integral-calculus',
  title: 'Integral Calculus',
  subtitle: 'Summing the instants back — the second calculus course',
  discipline: 'mathematics',
  level: 'Class 11\u201312 integral calculus \u2192 the differential-equations doorstep',
  description:
    'The book that answers the reverse question Differential Calculus asks. The indefinite integral as antiderivative with its standard forms; the craft — substitution, integration by parts with its choice discipline, partial fractions cashing Elementary Algebra\u2019s factorization, reduction formulas; the definite integral built honestly as the limit of a sum with both fundamental theorems proved at first-course depth; the working properties with the dummy variable, odd/even/periodic integrands and Leibniz\u2019s differentiation under the integral; and the applications — areas under and between curves, volumes by cross-sections and shells, arc length, surfaces of revolution, work and centroids, with Geometry\u2019s cone and sphere formulas finally earned. Cross-references Differential Calculus, Elementary Algebra, Geometry and Coordinate Geometry; hands off to Differential Equations, Multivariable Calculus and Real Analysis.',
  status: 'planned',
  accent: ['#b45309', '#78350f'],
  chapters,
}
