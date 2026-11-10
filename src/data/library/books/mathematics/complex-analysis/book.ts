import type { Book, Chapter } from '../../../types'

/**
 * Complex Analysis — the twenty-first book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `ca-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Advanced Algebra chapter 3
 * built the algebra of a + bi (the field laws, conjugate, modulus, the
 * Argand plane read algebraically); THIS book makes the plane
 * differentiable. The complex function, the derivative (Cauchy\u2013Riemann
 * as the price of complex differentiability), the elementary functions
 * (the exponential and trig families, the logarithm with its branches —
 * Advanced Algebra ch. 9's inverse machines returning multi-valued),
 * integration in the plane with Cauchy's theorems (the miracle: the
 * integral knows only the topology), series with Laurent's expansion
 * and the residue engine (real integrals evaluated by flying into the
 * plane), and conformal mapping. It hands off to the research frontier
 * and Mathematical Methods' complex pole.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Kreyszig's
 *   engineering-math volume ch. 13–18 (complex numbers and functions,
 *   complex integration, power series, Laurent series and residue
 *   integration, conformal mapping, complex analysis and potential
 *   theory — TOC extracted) carries the applied arc; Churchill and
 *   Brown's 'Complex Variables and Applications' chapter list
 *   web-checked (1 Complex Numbers, 2 Analytic Functions, 3 Elementary
 *   Functions, 4 Integrals, 5 Series, 6 Residues and Poles, 7
 *   Applications of Residues, 8 Conformal Mapping \u2026) maps the
 *   standard course; the M2 module's ch. 03 'Complex Numbers' is AA
 *   ch. 3's banked JEE ground (cross-referenced, never re-taught).
 * - Syllabus audit (web-checked 2026-11-10): NCERT ground stops at AA
 *   ch. 3's scope; JEE Main unit 2's complex-numbers scope (algebra,
 *   Argand plane and polar representation, quadratic solutions) is
 *   banked — this book is university territory (the IIT-JAM/GATE
 *   complex-analysis scope as the competitive-university anchor).
 * - Exam types: university-course problems (L5) with Kreyszig's
 *   applied arc for engineering (L5); no JEE typology beyond the
 *   cross-referenced bank.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-plane-again',
    title: 'The Plane Again: Algebra Made Geometric',
    summary:
      'Advanced Algebra chapter 3\u2019s bank recalled in one lesson (the field laws, conjugate, modulus), then the plane made geometric for real: polar form at depth, the argument and its multivaluedness, roots of unity (the regular polygons appearing — Geometry\u2019s constructions cross-referenced), the geometry of multiplication as rotation-and-scaling made precise, and sets in the plane (domains, the vocabulary the analysis needs).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bank Recalled, the Geometry Deepened',
      'Roots of Unity and the Polygons',
      'Domains and the Plane\u2019s Vocabulary',
    ],
  },
  {
    number: 2,
    slug: 'analytic-functions',
    title: 'Analytic Functions',
    summary:
      'Differentiability in the plane: the complex limit (direction-independence as the new demand), the derivative defined, the Cauchy\u2013Riemann equations derived as the price of complex differentiability (with the converse\u2019s honest hypotheses), analyticity and harmonicity (the real and imaginary parts as harmonic partners — the potential-theory connection named), and the exponential\u2019s periodicity in the plane (why e^z meets the trig families).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Complex Limit and the Derivative',
      'Cauchy\u2013Riemann: the Price of Differentiability',
      'Analytic and Harmonic',
    ],
  },
  {
    number: 3,
    slug: 'elementary-functions-in-the-plane',
    title: 'The Elementary Functions in the Plane',
    summary:
      'The families rebuilt for z: e^z with its period 2\u03c0i, the trigonometric functions as exponentials (Euler\u2019s formula DERIVED, not quoted — Trigonometry\u2019s identities reappearing as algebra), the hyperbolic family, the complex logarithm with its branch structure (the multi-valued machine Advanced Algebra ch. 9\u2019s inverse theory foreshadowed — here the point needs cutting), complex powers, and the mapping pictures every function draws.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'e^z and Euler, Derived',
      'The Logarithm and Its Branches',
      'Powers and the Mapping Pictures',
    ],
  },
  {
    number: 4,
    slug: 'integration-in-the-plane',
    title: 'Integration in the Plane',
    summary:
      'The miracle chapter: contour integrals defined (complex path, real parametrization — Integral Calculus\u2019s line-integral craft cross-referenced), the ML-bound, Cauchy\u2019s theorem (the integral around what vanishes — with the hypotheses stated honestly: simple connectivity and analyticity), the Cauchy integral formula (derivatives by integration!), the mean-value and Liouville consequences (the bounded entire function is constant — the fundamental theorem of algebra PROVED in one page, closing Advanced Algebra ch. 8\u2019s stated-not-proved debt), and the maximum-modulus principle.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Contours and the ML-Bound',
      'Cauchy\u2019s Theorem and Integral Formula',
      'Liouville and the Fundamental Theorem of Algebra, Proved',
      'The Maximum-Modulus Principle',
    ],
  },
  {
    number: 5,
    slug: 'series-and-residues',
    title: 'Series and the Residue Engine',
    summary:
      'The payoff machinery: Taylor series in the plane (the radius as the nearest singularity — Real Analysis\u2019s chapter cashed in the plane), Laurent series (the annulus expansion, the classification of singularities: removable, pole, essential), the residue theorem PROVED at course depth, the residue calculus for real integrals (the trigonometric and rational integrals JEE students compute by hand, here flown through the plane), the argument principle and Rouch\u00e9\u2019s theorem named with applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Taylor in the Plane and the Radius',
      'Laurent Series and the Singularity Census',
      'The Residue Theorem',
      'Real Integrals through the Plane',
    ],
  },
  {
    number: 6,
    slug: 'conformal-mapping',
    title: 'Conformal Mapping',
    summary:
      'The geometric heart: conformality (angles preserved wherever the derivative is nonzero — proved from the linear approximation), the mapping census (linear, power, exponential, M\u00f6bius transformations with their circle-preserving magic derived), the Schwarz\u2013Christoffel idea named, and the applications: potential problems solved by mapping (the physics payoff Kreyszig\u2019s chapters own — cross-referenced to Mathematical Methods).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Conformality, Proved',
      'The Mapping Census: to M\u00f6bius',
      'Potential Problems by Mapping',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the course-level craft (residue integrals at speed, singularity recognition, mapping constructions), the book in one page (the map from Cauchy\u2013Riemann to Rouch\u00e9), and the doorsteps named honestly: analytic number theory (the zeta function and the Riemann hypothesis named as the famous open door — cross-referenced to the Foundations book\u2019s verified list), several complex variables named, and Riemann surfaces as the natural completion of the logarithm\u2019s branch story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Course-Level Craft',
      'The Book in One Page: to Rouch\u00e9',
      'The Doorsteps: Zeta, Surfaces and Beyond',
    ],
  },
]

export const complexAnalysis: Book = {
  id: 'complex-analysis',
  title: 'Complex Analysis',
  subtitle: 'The plane becomes calculus — analyticity, residues, mapping',
  discipline: 'mathematics',
  level: 'First-course university complex analysis \u2192 the research doorstep',
  description:
    'The book that makes the complex plane differentiable. The algebra of Advanced Algebra\u2019s chapter 3 recalled once, then the geometry deepened (roots of unity, multiplication as rotation); complex limits and the derivative with the Cauchy\u2013Riemann equations derived as the price of differentiability; the elementary functions rebuilt for z — e^z with Euler\u2019s formula derived, the logarithm with its branches cut honestly; the miracle chapter (Cauchy\u2019s theorem and integral formula, Liouville proving the fundamental theorem of algebra in one page — Advanced Algebra\u2019s stated-not-proved debt paid); the residue engine evaluating real integrals through the plane; and conformal mapping with the M\u00f6bius census and potential-theory applications. Cross-references Advanced Algebra, Trigonometry, Integral Calculus and Real Analysis; hands off to the research frontier and Mathematical Methods.',
  status: 'planned',
  accent: ['#a21caf', '#86198f'],
  chapters,
}
