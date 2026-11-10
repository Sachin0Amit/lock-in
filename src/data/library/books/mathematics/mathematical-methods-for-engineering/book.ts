import type { Book, Chapter } from '../../../types'

/**
 * Mathematical Methods for Engineering — the twenty-fifth book of the
 * Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `em-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf's applied collector —
 * Differential Equations named the transform door at its closing
 * doorstep; THIS book walks through it. The Laplace transform, Fourier
 * series and transforms, the classic PDEs solved by separation, the
 * linear-algebra and ODE engines recalled as tools (one honest chapter,
 * cross-referenced — never re-taught), and the complex-methods pole
 * (residues and conformal mapping for engineers — Complex Analysis's
 * applied half). Kreyszig's engineering-mathematics volume (the Drive
 * copy) IS this book's reference spine. It hands off to the engineering
 * shelf (EM, signals, control) and to Numerical Analysis for the
 * computing side.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Erwin Kreyszig's
 *   'Advanced Engineering Mathematics' (Drive copy — TOC extracted this
     pass; the 10e structure verified: ch. 1 first-order ODEs incl.
     modeling and direction fields; ch. 2 second-order linear ODEs; ch.
   3 higher-order linear ODEs; ch. 4 systems of ODEs; ch. 5 series
   solutions and special functions; ch. 6 the Laplace transform; ch.
   7 linear algebra and matrices; ch. 8 eigenvalue problems; ch. 9
   vector differential calculus; ch. 10 vector integral calculus; ch.
   11 Fourier analysis; ch. 12 PDEs; ch. 13 complex numbers and
   functions; ch. 14 complex integration; ch. 15 power series; ch. 16
   Laurent series and residue integration; ch. 17 conformal mapping;
   ch. 18 complex analysis and potential theory; ch. 19–21 numerical
   analysis; ch. 22 unconstrained optimization and linear programming;
   ch. 23 graphs and combinatorial optimization; ch. 24 data analysis
   and probability; ch. 25 mathematical statistics) — chapters 6, 11–12,
   13–18 map to this book's core; chapters 1–10 are cross-referenced to
   Differential Equations, Linear Algebra and Multivariable Calculus.
 * - Syllabus audit (web-checked 2026-11-10): the GATE engineering-
   mathematics syllabus (linear algebra, calculus, ODEs, Laplace,
   Fourier, PDEs, complex variables, probability — the standard
   engineering-mathematics scope) as the competitive anchor; university
   engineering-mathematics course structures cross-checked.
 * - Exam types: university-course problems (L5) and GATE-style
   numerical-answer items; Kreyszig's own problem sets noted in the
   survey.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-engineers-landscape',
    title: 'The Engineer\u2019s Mathematical Landscape',
    summary:
      'The toolkit mapped honestly: which shelf book owns which tool (Linear Algebra the systems and eigen-engines, Differential Equations the ODE models, Multivariable Calculus the fields, Complex Analysis the plane methods — each cross-referenced at the boundary, none re-taught), the engineering-mathematics problem families (modeling, transformation, approximation, computation), and the chapter that explains WHY transforms work: the change-of-representation idea with its first worked example (the logarithm as multiplication\u2019s transform — Advanced Algebra\u2019s invention returning as an engineering principle).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Toolkit Map',
      'Why Transforms Work',
      'The Problem Families',
    ],
  },
  {
    number: 2,
    slug: 'odes-for-engineers',
    title: 'ODEs for Engineers: the Model Shelf',
    summary:
      'Differential Equations\u2019 shelf recalled at engineer\u2019s speed in one lesson, then the new ground: systems of ODEs and the matrix-exponential solution route (Linear Algebra\u2019s eigen-engine cashed on the spring-circuit family), series solutions and the special functions engineering meets by name (Bessel and Legendre introduced honestly at working depth), and the boundary-value problems the beam and the heat pipe actually pose.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Shelf Recalled at Speed',
      'Systems and the Matrix Exponential',
      'Series Solutions: Bessel and Legendre',
      'Boundary-Value Problems',
    ],
  },
  {
    number: 3,
    slug: 'the-laplace-transform',
    title: 'The Laplace Transform',
    summary:
      'The door Differential Equations named, opened: the transform defined and computed on the standard families, the operational rules (linearity, shifting — both flavors, differentiation, integration, multiplication by t) each derived, the inverse by partial fractions (the engineer\u2019s workhorse — Elementary Algebra\u2019s craft at its most profitable), the unit-step and impulse functions with their transform discipline, initial-value problems solved end-to-end, the convolution theorem PROVED at course depth, and transfer functions named (the control engineer\u2019s passport).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transform and Its Rules',
      'Inversion by Partial Fractions',
      'Steps, Impulses and Initial-Value Problems',
      'Convolution and Transfer Functions',
    ],
  },
  {
    number: 4,
    slug: 'fourier-series',
    title: 'Fourier Series: the Periodic World',
    summary:
      'Trigonometry\u2019s periodic family as an expansion basis: the orthogonality relations PROVED (the integrals that make everything work), the Fourier coefficients derived for engineered periodic signals (with the convergence question stated honestly — Real Analysis\u2019s uniform chapter holding the full story), even and odd shortcuts, half-range expansions, and the parseval identity proved and used (the energy reading), closing with the Fourier transform and the DFT/FFT named with their computational career.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Orthogonality, Proved',
      'The Coefficients and Their Craft',
      'Half-Range and Parseval',
      'The Fourier Transform and the FFT, Named',
    ],
  },
  {
    number: 5,
    slug: 'partial-differential-equations',
    title: 'The Classic PDEs',
    summary:
      'The two-variable frontier: what a PDE is (the modeling census — wave, heat, Laplace, each derived from its physics honestly), separation of variables WORKED end-to-end on the vibrating string and the heat bar (the Fourier series of chapter 4 appearing as the natural expansion — the subject\u2019s famous symbiosis), boundary and initial conditions disciplined, d\u2019Alembert\u2019s travelling-wave solution derived, the Laplace equation met in its rectangle and disc (the polar separation and the Bessel preview), and the Sturm\u2013Liouville idea named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Modeling Census: wave, heat, Laplace',
      'Separation on the String and the Bar',
      'D\u2019Alembert\u2019s Travelling Wave',
      'Laplace in the Rectangle and the Disc',
    ],
  },
  {
    number: 6,
    slug: 'complex-methods-for-engineers',
    title: 'Complex Methods for Engineers',
    summary:
      'Complex Analysis\u2019s applied half: residues evaluating the engineering integrals (the real-line and the damped-oscillation families flown through the plane — the craft chapter of that book, re-priced at engineering speed), conformal mapping solving potential problems (the electrostatic and fluid flows mapped from awkward domains to honest ones), and the phasor discipline (the sinusoidal steady state as complex arithmetic — the electrical engineer\u2019s daily bread, derived from e^{i\u03c9t}).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Residues at Engineering Speed',
      'Potential Problems by Mapping',
      'Phasors',
    ],
  },
  {
    number: 7,
    slug: 'numerical-craft-for-engineers',
    title: 'The Numerical Craft',
    summary:
      'Numerical Analysis recalled at engineer\u2019s speed (the method-choice census for roots, quadrature and ODEs — cross-referenced to that book\u2019s full theory), then the engineering-mathematics numerics proper: the PDE discretizations (explicit and implicit heat schemes with their stability conditions shown — the CFL discipline met honestly), and the finite-element idea named with its variational foundation sketched. When the exact answer is impossible, the honest computation is the answer.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Method-Choice Census',
      'Discretizing the Heat Equation',
      'The Finite-Element Idea, Named',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the transform map (one page from Laplace to FFT — the change-of-representation idea as the book\u2019s single thread), the engineering-exam craft census (GATE-style worked items across all engines), and the doorsteps named: the engineering shelf\u2019s books (signals and systems, control theory, electromagnetics, fluid mechanics — each named with the chapters of THIS book it stands on), and the research doorstep (inverse problems and uncertainty quantification named honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transform Map',
      'The Engineering-Exam Craft Census',
      'The Doorsteps: the Engineering Shelf',
    ],
  },
]

export const mathematicalMethodsForEngineering: Book = {
  id: 'mathematical-methods-for-engineering',
  title: 'Mathematical Methods for Engineering',
  subtitle: 'The applied collector — transforms, fields, and the classic PDEs',
  discipline: 'mathematics',
  level: 'Second-year university engineering mathematics',
  description:
    'The book that walks through the transform door Differential Equations named. The engineer\u2019s landscape with the change-of-representation idea as its thread; ODEs at engineer\u2019s speed with systems, the matrix exponential, Bessel and Legendre series solutions and boundary-value problems; the Laplace transform with every rule derived, partial-fraction inversion, steps and impulses, convolution PROVED and transfer functions; Fourier series with orthogonality proved, Parseval earned and the FFT named; the classic PDEs — wave, heat and Laplace — separated end-to-end with d\u2019Alembert\u2019s travelling wave; complex methods at engineering speed (residues, potential mapping, phasors); and the numerical craft with the heat equation\u2019s discretizations. Cross-references Differential Equations, Linear Algebra, Complex Analysis and Numerical Analysis at every boundary; hands off to the engineering shelf.',
  status: 'planned',
  accent: ['#65a30d', '#4d7c0f'],
  chapters,
}
