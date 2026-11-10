import type { Book, Chapter } from '../../../types'

/**
 * Numerical Analysis — the twenty-fourth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 7 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `na-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf computed exactly;
 * THIS book computes HONESTLY on machines that cannot. Floating-point
 * reality, error propagation and conditioning (the subject\u2019s own
 * foundations), then the classical engines: root finding (the bisection
 * discipline, Newton\u2019s method with its convergence PROVED and its
 * failure modes shown), interpolation and approximation, numerical
 * differentiation and integration (Simpson\u2019s error priced), linear
 * systems computed (Linear Algebra\u2019s theory meeting round-off), and
 * the numerical ODE engines (Euler and Runge\u2013Kutta — Differential
 * Equations\u2019 direction fields industrialized). It hands off to
 * Mathematical Methods and the scientific-computing doorstep.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Kreyszig's
 *   engineering-math volume Part E chapters 19–21 (numerical analysis in
 *   general: interpolation, numerical integration, ODE and PDE numerics,
 *   unconstrained optimization) carries the applied arc — TOC extracted;
 *   the classic depth pole is web-researched: Burden and Faires'
 *   'Numerical Analysis' 10e (chapter list web-checked 2026-11-10 —
 *   1 Mathematical Preliminaries and Error Analysis, 2 Solutions of
 *   Equations in One Variable [bisection, fixed-point, Newton,
 *   secant], 3 Interpolation and Polynomial Approximation [Lagrange,
 *   Newton divided differences, splines], 4 Numerical Differentiation
 *   and Integration, 5 Initial-Value Problems for ODEs [Euler,
 *   Runge–Kutta], 6 Direct Methods for Solving Linear Systems, 7
 *   Iterative Techniques in Matrix Algebra, 8 Approximation Theory, 9
 *   Approximating Eigenvalues, 10–12 nonlinear systems, boundary-value
 *   problems and PDEs) — maps to this book's chapters 1–7.
 * - Syllabus audit (web-checked 2026-11-10): no school/competitive
 *   scope — the standard university arc; GATE\u2019s numerical-methods
 *   scope (Newton\u2013Raphson, interpolation, quadrature, Euler/RK,
 *   LU) as the Indian competitive-university anchor; Strang's
 *   numerical-linear-algebra chapter cross-referenced from the Drive
 *   copy.
 * - Exam types: university-course problems (L5) with the GATE-style
 *   numerical-answer items (computed to the required precision) as the
 *   competitive anchor.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'numbers-in-the-machine',
    title: 'Numbers in the Machine',
    summary:
      'The honest opener: how floating-point representation actually works (the IEEE model described at working depth), machine epsilon, round-off versus truncation error, error propagation through the operations, and conditioning — the problem\u2019s own sensitivity versus the algorithm\u2019s stability, separated cleanly. The catastrophic-cancellation phenomenon priced on engineered cases (the quadratic formula\u2019s honest failure — Advanced Algebra\u2019s own formula, re-examined).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Floating Point and Machine Epsilon',
      'Round-off, Truncation and Propagation',
      'Conditioning and Stability',
    ],
  },
  {
    number: 2,
    slug: 'root-finding',
    title: 'Root Finding',
    summary:
      'One equation, one unknown, computed: the bisection method (its guaranteed linear convergence PROVED), fixed-point iteration and its convergence condition (the contraction discipline proved with the bar-graph reading), Newton\u2013Raphson (its quadratic convergence PROVED, its basin, its failure modes — the cycle and the divergence — priced on engineered functions), the secant method\u2019s superlinear compromise, and the method-choice census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bisection: the Guaranteed Method',
      'Fixed Points and Contraction',
      'Newton\u2013Raphson: Quadratic, and Fragile',
      'The Method-Choice Census',
    ],
  },
  {
    number: 3,
    slug: 'interpolation-and-approximation',
    title: 'Interpolation and Approximation',
    summary:
      'Building the in-between: Lagrange interpolation constructed and verified, Newton\u2019s divided differences (the update craft and the computational advantage), the interpolation error theorem PROVED (the Lagrange remainder — Real Analysis\u2019s Taylor discipline\u2019s sibling), the Runge phenomenon shown honestly (why more nodes can be worse), Chebyshev nodes named, cubic splines introduced, and least-squares approximation (Linear Algebra\u2019s projection chapter cashed immediately — cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lagrange and Divided Differences',
      'The Error Theorem and the Runge Phenomenon',
      'Splines and Least Squares',
    ],
  },
  {
    number: 4,
    slug: 'numerical-calculus',
    title: 'Numerical Differentiation and Integration',
    summary:
      'The calculus computed: finite-difference formulas DERIVED from Taylor expansions (the forward/backward/central census with their error orders), Richardson extrapolation (the clever reuse of two approximations — derived, not presented), the quadrature family (trapezoidal with its error, Simpson\u2019s rule with its error proved at course depth, the composite forms), Gaussian quadrature named with its two-point case earned, and adaptive ideas named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Finite Differences, Derived from Taylor',
      'Richardson Extrapolation',
      'Trapezoid, Simpson and Their Errors',
      'Gaussian Quadrature, Named',
    ],
  },
  {
    number: 5,
    slug: 'linear-systems-numerically',
    title: 'Linear Systems, Numerically',
    summary:
      'Linear Algebra meets round-off: LU factorization with pivoting (the operation-count census done honestly), the Cholesky case for symmetric systems, iterative methods (Jacobi and Gauss\u2013Seidel with their convergence conditions proved via diagonal dominance), the condition number as the error\u2019s price tag (the honest a-posteriori bound derived), and the eigenvalue iteration beginnings (the power method with its convergence — Strang\u2019s numerical chapter cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'LU with Pivoting',
      'Jacobi, Gauss\u2013Seidel and Diagonal Dominance',
      'The Condition Number\u2019s Price Tag',
      'The Power Method',
    ],
  },
  {
    number: 6,
    slug: 'odes-numerically',
    title: 'Differential Equations, Numerically',
    summary:
      'Differential Equations\u2019 direction fields industrialized: Euler\u2019s method derived and its error order PROVED, the improved Euler and the Runge\u2013Kutta family (the classical RK4 constructed with its order earned), local versus global error separated cleanly, stability met honestly (the stiff equations the simple methods fail — named and priced), and boundary-value problems introduced with the shooting idea.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Euler, Derived and Proved',
      'The Runge\u2013Kutta Family',
      'Stability and Stiffness',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the accuracy\u2013cost\u2013stability triangle priced across the whole engine census (worked at course-exam level — the GATE-style precision items included), the book in one page (the map from machine epsilon to RK4), and the doorsteps named honestly: PDE numerics (the heat equation discretized as the preview — Mathematical Methods\u2019 separation-of-variables ground meeting its discrete twin), approximation theory\u2019s research arc, and the scientific-computing discipline (verification, validation and the reproducibility census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Accuracy\u2013Cost\u2013Stability Triangle',
      'The Book in One Page: from Epsilon to RK4',
      'The Doorsteps: PDE Numerics and Scientific Computing',
    ],
  },
]

export const numericalAnalysis: Book = {
  id: 'numerical-analysis',
  title: 'Numerical Analysis',
  subtitle: 'Computing honestly — error, engines, and what machines can know',
  discipline: 'mathematics',
  level: 'First-course university numerics \u2192 the scientific-computing doorstep',
  description:
    'The book where the shelf\u2019s exact mathematics meets the machine\u2019s honest limits. Floating-point reality, error propagation and conditioning (with the quadratic formula\u2019s catastrophic cancellation priced); root finding — bisection guaranteed, fixed-point contraction proved, Newton\u2019s quadratic convergence proved with its failure modes; interpolation with the error theorem, the Runge phenomenon, splines and least squares; numerical calculus — finite differences derived from Taylor, Richardson extrapolation, Simpson with its error, Gaussian quadrature named; linear systems with LU pivoting, iterative methods and the condition number\u2019s price tag; and the ODE engines — Euler proved, the Runge\u2013Kutta family constructed, stiffness met honestly. Cross-references Advanced Algebra, Real Analysis, Linear Algebra and Differential Equations; hands off to Mathematical Methods and scientific computing.',
  status: 'planned',
  accent: ['#f59e0b', '#d97706'],
  chapters,
}
