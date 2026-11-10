import type { Book, Chapter } from '../../../types'

/**
 * Multivariable Calculus — the tenth book of the Mathematics shelf
 * (Calculus III).
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 6 chapters /
 * 19 planned lessons, zero written. Lesson ids will use the `mc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the dimension-climbing sequel.
 * Coordinate Geometry banked vectors and the geometry of space; Integral
 * Calculus banked the single-variable theory. THIS book climbs the
 * ladder: several inputs, one output — partial derivatives, the gradient
 * and directional derivatives, extrema with constraints (Lagrange
 * multipliers — Advanced Algebra's classical inequalities meet their
 * calculus successor), multiple integrals, and vector calculus (line
 * integrals, Green's, Stokes's and Gauss's theorems — honestly stated
 * with proof sketches, full proofs in Real Analysis). The vector
 * CALCULUS ground deliberately left open by Coordinate Geometry is
 * walked here. Hands off to Real Analysis (the theory's proofs),
 * Differential Equations (PDEs named) and the physics shelf.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): no dedicated Cengage
 *   module for multivariable calculus (the M5 module stops at vector
 *   algebra and 3D analytic geometry — Coordinate Geometry's chapters
 *   9–12). The Drive's calculus tomes own this ground instead: Thomas'
 *   Calculus 14e chapters 12–16 (Vectors and the Geometry of Space;
 *   Vector-Valued Functions and Motion in Space; Partial Derivatives;
 *   Multiple Integrals; Integrals and Vector Fields) and Stewart's Early
 *   Transcendentals (chapters 14–16 with the 15/16 vector-calculus arc)
 *   — TOCs extracted this pass. The Kreyszig engineering-math volume
 *   (chapters 8–10) cross-checks the applied pole.
 * - Syllabus audit (web-checked 2026-11-10): no NCERT ground beyond
 *   class 12's vector algebra and 3D geometry (cross-referenced, never
 *   re-taught) — this is first-year university territory; the JEE Main
 *   unit 5 vector scope stops at products and lines/planes (banked in
 *   Coordinate Geometry); GATE engineering-mathematics and university
 *   calculus syllabi (OpenStax Calculus vol 3 as the open cross-check)
 *   own the competitive/university scope.
 * - Exam types: university-course problems (level L5), with the module
 *   typology not applying directly; the Drive tomes' own exercise arcs
 *   (Thomas: Questions to Guide Review / Practice / Additional and
 *   Advanced) noted in the survey.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'functions-of-several-variables',
    title: 'Functions of Several Variables',
    summary:
      'The ladder climbs: domain and range when inputs multiply, level curves and level surfaces as the visualization tool, limits and continuity in two variables (the path discipline — why a limit exists only when EVERY approach agrees), surfaces met graphically (paraboloids, cones, the quadric-surface census that unifies the conic family in three dimensions).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Several Inputs, One Output',
      'Level Curves and Quadric Surfaces',
      'Limits and Continuity in Two Variables: the Path Discipline',
    ],
  },
  {
    number: 2,
    slug: 'partial-derivatives-and-the-gradient',
    title: 'Partial Derivatives and the Gradient',
    summary:
      'Change one input at a time: partial derivatives computed and interpreted, the mixed-derivatives equality (Clairaut\u2019s theorem stated honestly), the chain rule for several variables (the tree discipline), directional derivatives and the gradient — the vector that points uphill with magnitude the steepness — tangent planes and linear approximation. Coordinate Geometry\u2019s vectors doing calculus.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Partial Derivatives and Their Meaning',
      'The Chain Rule for Several Variables',
      'The Gradient and Directional Derivatives',
      'Tangent Planes and Linear Approximation',
    ],
  },
  {
    number: 3,
    slug: 'extrema-in-several-variables',
    title: 'Extrema in Several Variables',
    summary:
      'Optimization when inputs multiply: critical points and the second-derivative test (the discriminant census), absolute extrema on closed bounded regions, constrained extrema and Lagrange multipliers — the method Advanced Algebra\u2019s AM\u2013GM craft foreshadowed — and the applied problems (least squares named forward to Linear Algebra and Statistics) worked at full depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Critical Points and the Second-Derivative Test',
      'Absolute Extrema on Bounded Regions',
      'Lagrange Multipliers: Constraints as Allies',
    ],
  },
  {
    number: 4,
    slug: 'multiple-integrals',
    title: 'Multiple Integrals',
    summary:
      'Accumulation over regions: the double integral as an iterated integral, changing the order of integration, polar coordinates (the circle\u2019s natural address), triple integrals in rectangular, cylindrical and spherical systems, and the applications — volumes (Integral Calculus\u2019s shell and cross-section methods unified), mass, centres of mass and moments of inertia for honest density functions. Applications to economics and biology named honestly — the cobweb models and growth models — alongside the physical ones.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Double Integral and Iteration',
      'Polar, Cylindrical and Spherical',
      'Mass, Centres and Moments',
    ],
  },
  {
    number: 5,
    slug: 'vector-calculus',
    title: 'Vector Calculus',
    summary:
      'The field\u2019s calculus: vector fields drawn and read, line integrals of scalar and vector fields (work along a path), path independence and conservative fields, Green\u2019s theorem on the plane, curl and divergence, surface integrals and flux, Stokes\u2019s and Gauss\u2019s theorems — the great integral theorems stated with proof sketches and honest scope, their full proofs belonging to Real Analysis. The physics shelf\u2019s language learned here. Motion in space — velocity and acceleration — with the tangential and normal components of acceleration and the kinematics in polar coordinates (velocity and acceleration in polar coordinates) derived as the engineer\u2019s craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Vector Fields and Line Integrals',
      'Conservative Fields and Path Independence',
      'Green\u2019s, Stokes\u2019s and Gauss\u2019s Theorems',
    ],
  },
  {
    number: 6,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the course-level problem craft (optimization with constraints in cascade, order-of-integration puzzles, the flux computations physics asks for), the book in one page (the map from level curves to the integral theorems), and the doorstep itself: WHY the theorems hold — the ε and δ beneath every limit used — handing off to Real Analysis, with the physics and engineering shelves named as the applied continuations.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Course-Level Craft',
      'The Book in One Page: to the Integral Theorems',
      'The Doorstep: Why the Theorems Hold',
    ],
  },
]

export const multivariableCalculus: Book = {
  id: 'multivariable-calculus',
  title: 'Multivariable Calculus',
  subtitle: 'The dimension-climbing sequel — fields, gradients, flux',
  discipline: 'mathematics',
  level: 'First-year university calculus \u2192 the analysis doorstep',
  description:
    'The book that climbs the ladder to several variables. Functions of several inputs with level curves, quadric surfaces and the path discipline for limits; partial derivatives with the several-variable chain rule, the gradient and directional derivatives; extrema with the second-derivative test and Lagrange multipliers (Advanced Algebra\u2019s inequality craft succeeded by calculus); multiple integrals in rectangular, polar, cylindrical and spherical systems with mass, centroids and moments; and vector calculus — line integrals, conservative fields, Green\u2019s, Stokes\u2019s and Gauss\u2019s theorems stated honestly with proof sketches. Coordinate Geometry\u2019s vector algebra is the entry ticket, never re-taught. Cross-references Coordinate Geometry, Integral Calculus and Advanced Algebra; hands off to Real Analysis and the physics shelf.',
  status: 'planned',
  accent: ['#0d9488', '#134e4a'],
  chapters,
}
