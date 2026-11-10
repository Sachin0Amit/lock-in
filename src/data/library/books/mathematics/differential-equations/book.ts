import type { Book, Chapter } from '../../../types'

/**
 * Differential Equations — the eleventh book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10; enriched by the
 * topic-inclusion guarantee pass, same day) — 7 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `de-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Integral Calculus's closing
 * doorstep — 'the equation with the derivative inside' — is THIS book's
 * opening line. The M4 module's chapter 10 (Differential Equations) is
 * the JEE-level core; Kreyszig's engineering-mathematics volume (Drive
 * copy — chapters 1–2 and 5–6: first-order ODEs with direction fields
 * and Euler's method, second-order linear ODEs, series solutions, the
 * Laplace transform) owns the university depth pole. Advanced Algebra
 * chapter 9's growth-and-decay stories are cashed here as MODELS, never
 * re-derived. It hands off to Mathematical Methods for Engineering (the
 * transform/PDE machinery) and Real Analysis (existence/uniqueness
 * theory named honestly).
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M4
 *   'Calculus' module chapter 10 'Differential Equations' (TOC extracted
 *   this pass — the JEE scope: order and degree, formation from solution
 *   families, variable-separable and homogeneous and linear first-order
 *   equations); Kreyszig's 'Advanced Engineering Mathematics' (TOC
 *   extracted) chapters 1–2: first-order ODEs (basic concepts and
 *   modeling, geometric meaning/direction fields/Euler's method,
 *   separable ODEs, exact ODEs and integrating factors, linear ODEs and
 *   the Bernoulli equation, population dynamics, orthogonal
 *   trajectories, existence and uniqueness) and second-order linear ODEs
 *   (homogeneous with constant coefficients, differential operators,
 *   the solution structure, nonhomogeneous equations, modeling of
 *   mass-spring systems and circuits).
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 12 ch. 9
 *   Differential Equations (order/degree, general and particular
 *   solutions, variable separable, homogeneous, linear first-order); JEE
 *   Main 2026 unit 3's Differential Equations (order and degree,
 *   formation, separation of variables, homogeneous and linear
 *   solutions) — the JEE scope is chapters 1–3 here, honestly noted as
 *   the opening third; GATE/university scope owns the rest; OpenStax
 *   Calculus vol 2 as the open cross-check.
 * - Exam types: the module typology for the JEE chapters (Concept
 *   Application Exercises; Single/Multiple Correct, Linked Comprehension,
 *   Matrix Match, Numerical Value; Archives); university-problem style
 *   (L5) for chapters 4–6.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-language-of-differential-equations',
    title: 'The Language of Differential Equations',
    summary:
      'The subject introduced honestly: what a differential equation IS, order and degree, the formation of equations from families of curves (eliminating arbitrary constants), and the solution census — general, particular, and the singular solutions textbooks often hide. Direction fields and Euler\u2019s method make the subject visual before it becomes algebraic: the slope puzzle Integral Calculus\u2019s doorstep posed, drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'What a Differential Equation Is',
      'Forming Equations from Families of Curves',
      'General, Particular and Singular Solutions',
      'Direction Fields and Euler\u2019s Preview',
    ],
  },
  {
    number: 2,
    slug: 'first-order-equations',
    title: 'First-Order Equations',
    summary:
      'The solvable core: variable-separable equations; homogeneous equations by the y = vx substitution; linear first-order equations and the integrating factor; exact equations and the potential-function test; the Bernoulli equation; and reducible forms — the JEE scope complete, each method introduced with the substitution that motivates it and the check that closes it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Variable Separable',
      'Homogeneous Equations',
      'Linear Equations and the Integrating Factor',
      'Exact Equations and Bernoulli',
    ],
  },
  {
    number: 3,
    slug: 'modeling-with-first-order-equations',
    title: 'Modeling with First-Order Equations',
    summary:
      'The stories become models: exponential growth and decay (Advanced Algebra\u2019s narrative cashed), Newton\u2019s law of cooling, mixing problems, population dynamics with the logistic equation, orthogonal trajectories (the family-perpendicular craft), isogonal trajectories — the constant-angle cousin, the same craft at a tilt — and existence-and-uniqueness stated honestly — when a first pass at solving is guaranteed to be the only pass.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Growth, Decay and Cooling',
      'Mixing and Population Dynamics',
      'Orthogonal Trajectories',
      'Existence and Uniqueness: the Honest Guarantee',
    ],
  },
  {
    number: 4,
    slug: 'second-order-linear-equations',
    title: 'Second-Order Linear Equations',
    summary:
      'The engineering heartland: the homogeneous linear equation with constant coefficients and its characteristic equation (the three cases — distinct real, repeated, complex — each derived), the solution-structure theory (superposition and linear independence), nonhomogeneous equations by undetermined coefficients and variation of parameters, and variable-coefficient cases solvable by known tricks. Kreyszig\u2019s arc, taught with every case derived. The nonhomogeneous ODEs owned as the chapter’s spine — every method priced on the right-hand side’s census, from polynomials through exponentials and resonant sines to the product forms.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Characteristic Equation: Three Cases',
      'Superposition and Solution Structure',
      'Undetermined Coefficients',
      'Variation of Parameters',
    ],
  },
  {
    number: 5,
    slug: 'the-spring-and-the-circuit',
    title: 'The Spring and the Circuit',
    summary:
      'The second-order models that built engineering: the mass-spring system (free, damped, forced oscillation; resonance read honestly), the RLC circuit as its electrical twin, and the theory\u2019s vocabulary — amplitude, phase, transient and steady state — priced on engineered constants so every number is recomputed, per house discipline. Forcing by short impulses — Dirac\u2019s delta function — named here as the limit idea, cashed formally by the Laplace transform in Mathematical Methods for Engineering.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Free and Damped Oscillation',
      'Forcing and Resonance',
      'The RLC Twin',
    ],
  },
  {
    number: 6,
    slug: 'systems-and-the-phase-plane',
    title: 'Systems, the Phase Plane and the Nonlinear World',
    summary:
      'Two equations coupled: systems of first-order ODEs, the vector form X\u2032 = AX and the eigenvalue route to the solution pair; the phase plane — trajectories, critical points, and the stability criteria that classify them (nodes, saddles, spirals, centres); qualitative methods for nonlinear systems (linearization about the critical points, the pendulum read honestly); and the linked-population models — predator\u2013prey systems and their cycles, competition and cooperation — Kreyszig’s systems arc, the ground Mathematical Methods for Engineering generalizes to matrices at engineering speed. The spring chapter’s single second-order equation re-read here as a pair, one state at a time.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Systems of First-Order Equations: the Vector X\u2032 = AX',
      'The Phase Plane: Critical Points and their Stability',
      'Qualitative Methods for Nonlinear Systems',
      'Predator\u2013Prey and Linked Populations',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the craft census (which method, which equation — the recognition drill), the book in one page (from direction field to resonance), and the doorstep itself: equations solved by TRANSFORM rather than by pattern — the Laplace transform named, series solutions named, partial differential equations named — handing off to Mathematical Methods for Engineering, with Real Analysis noted as the theory\u2019s home.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Recognition Drill',
      'The Book in One Page: from Field to Resonance',
      'The Doorstep: Transform Methods Named',
    ],
  },
]

export const differentialEquations: Book = {
  id: 'differential-equations',
  title: 'Differential Equations',
  subtitle: 'The equation with the derivative inside — change governed by law',
  discipline: 'mathematics',
  level: 'Class 12 \u2192 second-year university ODEs',
  description:
    'The book that opens on Integral Calculus\u2019s closing question. The language of differential equations — order, degree, formation from curve families, general/particular/singular solutions, direction fields; the solvable first-order core (separable, homogeneous, linear with integrating factors, exact, Bernoulli) with every method motivated and checked; modeling (growth and decay, cooling, mixing, the logistic equation, orthogonal trajectories) with existence and uniqueness stated honestly; second-order linear equations with the characteristic equation\u2019s three cases derived, superposition, undetermined coefficients and variation of parameters; and the models engineering runs on — the damped and forced spring, resonance, the RLC circuit. Cross-references Integral Calculus, Advanced Algebra and Trigonometry; hands off to Mathematical Methods for Engineering and Real Analysis.',
  status: 'planned',
  accent: ['#4d7c0f', '#3f6212'],
  chapters,
}
