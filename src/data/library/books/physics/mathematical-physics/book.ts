import type { Book, Chapter } from '../../../types'

/**
 * Mathematical Physics — the eighteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 47 planned lessons, zero written. Lesson ids will use the `mph-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Mathematical Physics owns the physicist’s mathematics register (GATE PH Mathematical Physics section read this pass: vector calculus, linear algebra incl. eigenvalue problems, complex analysis, special functions, ODE-PDE, Fourier-Laplace, tensors, group theory, probability). The mathematics shelf owns the pure side — real analysis, complex analysis, linear algebra, ODE, PDE books cross-referenced; this book owns the physics-side craft.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Mathematical Physics section as the explicit register) as the spine.
 * - Boas, Mathematical Methods in the Physical Sciences (the canonical physics-side arc named) as the teaching spine; Arfken, Weber & Harris named as the reference pole.
 * - The mathematics shelf's own analysis and algebra books (planned 2026-11-10) cross-referenced as the pure side, division of labour told honestly.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'variational-calculus',
    title: 'The Calculus of Variations',
    summary:
      'The functional as the new object; the Euler-Lagrange equation derived and worked on the brachistochrone register; constrained extrema with the multiplier craft; the mechanics book\u2019s Lagrangian inheritance told as the main customer; and the optics Fermat cross-reference priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Functional Introduced',
      'Euler-Lagrange Derived',
      'The Brachistochrone Worked',
      'The Main Customers',
      'Some Techniques of the Calculus of Variations',
    ],
  },
  {
    number: 2,
    slug: 'complex-analysis-for-physics',
    title: 'Complex Analysis for Physics',
    summary:
      'The analytic function idea with the Cauchy-Riemann discipline; contour integration with the residue craft worked on the standard physics integrals; the branch-point honesty for the multi-valued functions; and dispersion relations named as the physics dividend.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Analytic Functions',
      'The Residue Craft',
      'Branch Honesty',
      'Dispersion Dividends',
    ],
  },
  {
    number: 3,
    slug: 'odes-and-series',
    title: 'Differential Equations by Series',
    summary:
      'The series solution craft for the physics ODEs — the Frobenius method; the classification of singular points; the convergence honesty; and the mathematics shelf\u2019s differential-equations book cross-referenced as the pure-side owner.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Frobenius Craft',
      'Singular Points Classified',
      'Convergence Honesty',
      'The Pure Side',
    ],
  },
  {
    number: 4,
    slug: 'pdes-and-separation',
    title: 'PDEs and the Separation Craft',
    summary:
      'The physics trio — Laplace, wave, heat — met as one register; separation of variables in the standard coordinate frames; the boundary-condition honesty that picks the eigenvalues; and the Sturm-Liouville name told as the unifying grammar.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Physics Trio',
      'Separation Worked',
      'The Boundary Honesty',
      'Sturm-Liouville Named',
    ],
  },
  {
    number: 5,
    slug: 'special-function-atlas',
    title: 'The Special Function Atlas',
    summary:
      'Legendre polynomials with the orthogonality craft; Bessel functions of the physics register — cylindrical and spherical; Hermite and Laguerre as the oscillator-and-hydrogen functions; the spherical harmonics census; and each tied to its physics customer honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Legendre\u2019s Craft',
      'The Bessel Register',
      'Hermite and Laguerre',
      'Spherical Harmonics Census',
    ],
  },
  {
    number: 6,
    slug: 'fourier-and-laplace',
    title: 'Fourier and Laplace Transforms',
    summary:
      'The Fourier transform pair derived from the series limit; the convolution theorem worked; the Laplace transform as the initial-value solver; the wave book\u2019s Fourier inheritance told; and the Green-function chapter\u2019s hand prepared.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pair Derived',
      'Convolution Worked',
      'The Initial-Value Solver',
      'The Green Hand Prepared',
    ],
  },
  {
    number: 7,
    slug: 'greens-functions',
    title: 'Green\u2019s Functions',
    summary:
      'The Green function as the point-source response read; the delta function told honestly as a distribution; the Poisson-solver craft worked in the standard frames; the boundary-condition dress — Dirichlet, Neumann; and the perturbation-theory customer named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Point-Source Response',
      'The Delta Told Honestly',
      'The Poisson Solver',
      'The Perturbation Customer',
    ],
  },
  {
    number: 8,
    slug: 'matrices-groups-tensors',
    title: 'Matrices, Groups and Tensors',
    summary:
      'The eigenvalue problem revisited at the physics depth; the group-theory grammar — definitions, Lie groups named with the rotation register; tensor algebra with the metric as the raising-lowering craft; and the relativity and particle books named as the main customers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eigenvalue Revisit',
      'The Group Grammar',
      'Tensors and the Metric',
      'The Tensor Customers',
      'Orthogonal Transformations',
    ],
  },
  {
    number: 9,
    slug: 'numerical-register',
    title: 'The Numerical Register',
    summary:
      'The honest register of the machine: error arithmetic inherited; the root-finding and interpolation craft; numerical ODE integration — Runge-Kutta named; the roundoff-and-stability honesty; and the mathematics shelf\u2019s numerical-analysis book cross-referenced as the deep side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Machine\u2019s Honesty',
      'Roots and Interpolation',
      'Runge-Kutta Named',
      'The Deep Side Cross-Referenced',
    ],
  },
]

export const mathematicalPhysics: Book = {
  id: 'mathematical-physics',
  title: 'Mathematical Physics',
  subtitle: 'The physicist\u2019s mathematical toolbox: complex analysis, special functions, transforms, tensors and the numerical register',
  discipline: 'physics',
  level: 'University (UG honours → PG) + GATE PH / CSIR NET / JAM',
  description: 'The mathematics register for the working physicist: the calculus of variations, complex analysis as the contour craft, the special-function atlas that quantum and E&M demand, Fourier and Laplace transforms, Green\u2019s functions, the group-and-tensor grammar, and the numerical register with its computational honesty.',
  status: 'planned',
  accent: ['#64748b', '#0f172a'],
  chapters,
}
