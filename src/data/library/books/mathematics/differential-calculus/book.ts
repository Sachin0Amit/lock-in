import type { Book, Chapter } from '../../../types'

/**
 * Differential Calculus — the eighth book of the Mathematics shelf
 * (Calculus I).
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 9 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `dc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Advanced Algebra chapter 10's
 * doorstep is honoured exactly — the infinite tail's limit met again, the
 * changing output measured discretely, continuity named as a promise.
 * THIS book keeps that promise: the limit made precise, continuity
 * defined, the derivative built as a limit and worked across every
 * function family the shelf owns (the polynomials of Elementary Algebra,
 * the exponentials and logarithms of Advanced Algebra, the periodic
 * family of Trigonometry, the inverse trigonometric functions), then
 * applied — tangents and normals (Coordinate Geometry's curves),
 * rates, monotonicity and extrema (the optimization Advanced Algebra did
 * without calculus, now done with it), the mean value theorems, and the
 * complete curve-sketching method. The M4 module's opening 'Relations
 * and Functions' chapter is Advanced Algebra chapter 1's banked ground —
 * cross-referenced, never re-taught. It hands off to Integral Calculus
 * (the reverse question) and, for the theory's proofs, to Real Analysis.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M4
 *   'Calculus' module — 10 chapter PDFs, TOCs vision-extracted this pass.
 *   Chapters 2–6 map to this book: Limits (incl. the sandwich rule,
 *   indeterminate forms, expansion methods, trigonometric/exponential/
 *   logarithmic limits, the 1^∞ form and L'Hospital's rule);
 *   Differentiation (incl. implicit, parametric, logarithmic
 *   differentiation, differentiation of determinants and functional
 *   relations); Continuity and Differentiability (incl. discontinuity
 *   types, the greatest-integer and signum functions, the intermediate
 *   value theorem, non-differentiability reasons); Application of
 *   Derivatives (incl. tangents/normals from external points, angle
 *   between curves, subtangent and subnormal, rate measure,
 *   approximation, Rolle's theorem, Lagrange's and Cauchy's mean value
 *   theorems); Monotonicity and Maxima-Minima (incl. concavity,
 *   inflection, first/second derivative tests and inequality proofs).
 *   Chapter 1 (Relations and Functions) → Advanced Algebra ch. 1
 *   (cross-referenced). Thomas' Calculus 14e (Drive copy — chapters 1–4:
 *   functions, limits and continuity with the precise definition,
 *   derivatives, applications of derivatives) and Stewart's Early
 *   Transcendentals (Drive copy — chapters 2–4) own the university
 *   depth-pole: the ε-δ definition delivered honestly at first-course
 *   depth.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 11 ch. 12
 *   Limits and Derivatives (the intuitive first pass — this book is its
 *   rigorous continuation); class 12 ch. 5 Continuity and Differentiability
 *   + ch. 6 Application of Derivatives; JEE Main 2026 unit 3 (Limit,
 *   Continuity and Differentiability: algebra of functions, chain rule,
 *   derivatives of polynomial/rational/trigonometric/logarithmic/
 *   exponential functions); OpenStax Calculus vol 1 as the open
 *   sequencing cross-check.
 * - Exam types (the module's own typology): Concept Application Exercises
 *   inline; Single Correct Answer, Multiple Correct Answers, Linked
 *   Comprehension, Matrix Match, Numerical Value Type; JEE Archives.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-idea-of-the-limit',
    title: 'The Idea of the Limit',
    summary:
      'The infinite tail Advanced Algebra met informally becomes an instrument: neighbourhoods, the limiting value, one-sided limits and existence; the algebra of limits and direct substitution; the sandwich rule; indeterminate forms and the rationalization craft; limits at infinity; the standard formulas; expansion methods; trigonometric, exponential and logarithmic limits; the 1^∞ form; and L\u2019Hospital\u2019s rule — used with its conditions stated, its full justification deferred to Real Analysis as an honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Neighbourhoods and the Limiting Value',
      'The Algebra of Limits and Direct Substitution',
      'The Sandwich Rule and Indeterminate Forms',
      'Limits at Infinity and the Standard Formulas',
      'Trigonometric, Exponential and Logarithmic Limits',
      'The 1\u221e Form and L\u2019Hospital\u2019s Rule',
    ],
  },
  {
    number: 2,
    slug: 'continuity',
    title: 'Continuity',
    summary:
      'The promise Advanced Algebra named is kept: continuity at a point and on intervals, the types of discontinuity (removable, jump, infinite), directional continuity, continuity under algebraic operations and composition, and the special cases exams love — greatest integer, signum, functions defined differently on rationals and irrationals. The intermediate value theorem stated with its honest scope: used, with the proof deferred to Real Analysis. The continuity of the specific canonical functions — modulus, greatest-integer, signum, the piecewise bridges — priced one by one, the census every exam draws from.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Continuity at a Point and on an Interval',
      'The Types of Discontinuity',
      'Continuity under Algebra and Composition',
      'Special Functions and the Intermediate Value Theorem',
    ],
  },
  {
    number: 3,
    slug: 'the-derivative',
    title: 'The Derivative',
    summary:
      'The book\u2019s engine, built twice: first as the slope of a tangent (with first-principles computation on the standard families), then as the limit of the difference quotient — the derivative AS a function. Differentiability and its entanglement with continuity, the reasons a derivative fails (corners, cusps, jumps, vertical tangents), and differentiability on intervals. Every family the shelf banked is differentiated here: polynomials, radicals, exponentials, logarithms, the trigonometric and inverse trigonometric functions. The definition of differentiability — the limit that names the derivative — stated and priced before any rule wears it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Slopes of Tangents: the First Principles',
      'The Derivative as a Function',
      'Differentiability versus Continuity',
      'The Families Differentiated: Polynomial to Inverse Trig',
      'The Hyperbolic Family Differentiated',
    ],
  },
  {
    number: 4,
    slug: 'the-craft-of-differentiation',
    title: 'The Craft of Differentiation',
    summary:
      'The rules that make the derivative practical: sum, product and quotient; the chain rule (the composite machines of Advanced Algebra ch. 1, differentiated); implicit functions; parametric forms (Coordinate Geometry\u2019s parametric conics cashed); logarithmic differentiation; one function with respect to another; differentiation of determinants; higher-order derivatives; and functional relations — the module\u2019s full craft chapter, every technique practised on engineered cases before the exam-style sets.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sum, Product, Quotient and the Chain Rule',
      'Implicit and Parametric Differentiation',
      'Logarithmic Differentiation and the Determinant Rule',
      'Higher Order Derivatives and Functional Relations',
      'Differentiation of One Function with Respect to Another',
    ],
  },
  {
    number: 5,
    slug: 'tangents-normals-and-rates',
    title: 'Applications I: Tangents, Normals and Rates',
    summary:
      'The derivative\u2019s geometric and physical faces: tangent and normal at a point and from external points, the condition for a line to be tangent or normal, the angle between curves and orthogonal intersections, subtangent and subnormal, the derivative as rate measure (the related-rates craft), and approximation by differentials — with each application\u2019s honest domain discipline. Linearization — the tangent as the working approximation — and the tangent-and-velocity problems that motivated the derivative from the module’s own first pages, closed here as one craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tangents and Normals in All Their Forms',
      'Angles between Curves, Subtangent and Subnormal',
      'The Derivative as a Rate',
      'Approximation by Differentials',
    ],
  },
  {
    number: 6,
    slug: 'monotonicity-and-extrema',
    title: 'Applications II: Monotonicity, Concavity and Extrema',
    summary:
      'The shape of a function read from its derivatives: increasing and decreasing behaviour (strict and not), monotonicity of composites, range and root-counting by monotonicity, inequalities proved by monotonicity, concavity and points of inflection, and the extremum machinery — first and second derivative tests, the tests that survive discontinuity, and applied optimization at the depth Advanced Algebra\u2019s vertex-form work promised to grow into. The global (absolute) maximum and minimum — on intervals open, closed and unbounded — priced with the boundary discipline that makes \u201cabsolute\u201d honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Monotonic Functions: the First Derivative Test',
      'Concavity and Points of Inflection',
      'Maxima and Minima: the Complete Tests',
      'Inequalities and Root Counts by Monotonicity',
      'Applied Optimization',
    ],
  },
  {
    number: 7,
    slug: 'the-mean-value-theorems',
    title: 'The Mean Value Theorems',
    summary:
      'The theory heart: Rolle\u2019s theorem with its graphical reading and function selection, Lagrange\u2019s mean value theorem and its applications, Cauchy\u2019s mean value theorem, and the consequences (the constant-function criterion, the mean-value approach to inequalities and approximations). Stated precisely, used honestly, and proven in Real Analysis — the division of labour the shelf keeps throughout calculus.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rolle\u2019s Theorem',
      'Lagrange\u2019s Mean Value Theorem',
      'Cauchy\u2019s Mean Value Theorem and Consequences',
    ],
  },
  {
    number: 8,
    slug: 'curve-sketching',
    title: 'Curve Sketching: the Complete Method',
    summary:
      'Everything assembled into the craft of drawing the honest picture: domain and symmetry, intercepts and asymptotes (the hyperbola\u2019s tangent-at-infinity idea generalized), monotonicity intervals, extrema, concavity and inflection — the complete checklist applied to polynomials, rational functions, the exponential/logarithmic family and the trigonometric family. The chapter Coordinate Geometry\u2019s conic drawings foreshadowed. Graphing with calculus and technology — the plotted check as an honest verification discipline, never a substitute for the sign analysis.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Complete Checklist',
      'Asymptotes and End Behaviour',
      'Sketching the Families: Polynomial to Trigonometric',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: competition differentiation at speed (the limits examiners actually set, the differentiable-craft cascades, the max-min traps), the book in one page (the map from limit to sketch), and the doorstep itself: accumulation — if the derivative divides change into instants, what sums the instants back? The reverse question, asked precisely, hands off to Integral Calculus.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Differentiation: the Craft',
      'The Book in One Page: from Limit to Sketch',
      'The Doorstep: the Reverse Question',
    ],
  },
]

export const differentialCalculus: Book = {
  id: 'differential-calculus',
  title: 'Differential Calculus',
  subtitle: 'How the output changes — the first calculus course',
  discipline: 'mathematics',
  level: 'Class 11\u201312 differential calculus \u2192 the analysis doorstep',
  description:
    'The book that keeps Advanced Algebra\u2019s closing promise. The limit made precise (neighbourhoods, one-sided limits, the sandwich rule, indeterminate forms, L\u2019Hospital\u2019s rule with its conditions stated); continuity defined with its discontinuity census and the intermediate value theorem; the derivative built from first principles as slope and as a function, then differentiated across every family the shelf owns — polynomials, exponentials, logarithms, the trigonometric and inverse trigonometric functions. The craft chapter (implicit, parametric, logarithmic, determinants, higher order), the applications (tangents and normals, rates, monotonicity, concavity, extrema, applied optimization), the mean value theorems of Rolle, Lagrange and Cauchy, and the complete curve-sketching method. Cross-references Advanced Algebra, Trigonometry and Coordinate Geometry; hands off to Integral Calculus and Real Analysis.',
  status: 'planned',
  accent: ['#c2410c', '#9a3412'],
  chapters,
}
