import type { Book, Chapter } from '../../../types'

/**
 * Linear Algebra — the twelfth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `la-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the JEE ground (matrices,
 * determinants, systems with their consistency verdicts) is the book's
 * opening third — the M2 module's chapters 12–13 — then the university
 * ladder the Drive's three classic texts own: Strang's computational
 * arc, Lay's applications arc, Axler's proof-first arc (three poles,
 * one book). Advanced Algebra chapter 1's machine idea cashes its second
 * big cheque: the machines that respect the vector structure (linear
 * transformations). Coordinate Geometry banked vectors in 3D and linear
 * independence's first sighting — cross-referenced and generalized to
 * Rⁿ. It hands off to Abstract Algebra (structure), Multivariable
 * Calculus (quadratic forms and extrema), Numerical Analysis (computing
 * what this book theorizes) and Statistics (least squares).
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   'Algebra' module chapters 12 (Determinants: expansion, minors and
 *   cofactors, Sarrus, the full property arc, products, cofactor
 *   determinants, differentiation and integration of determinants,
 *   coordinate-geometry applications, and systems incl. Cramer) and 13
 *   (Matrices: classification, algebra, products, special matrices,
 *   adjoint and inverse, elementary transformations, systems by matrix,
 *   characteristic roots named) — the JEE opening; Gilbert Strang's
 *   'Introduction to Linear Algebra' 5e (Drive copy — 12 chapters:
 *   vectors, solving linear equations, vector spaces and subspaces,
 *   orthogonality, determinants, eigenvalues, the SVD, linear
 *   transformations, complex vectors and matrices, applications,
 *   numerical linear algebra, linear algebra in probability and
 *   statistics); Axler's 'Linear Algebra Done Right' 4e (Drive copy —
 *   vector spaces, finite-dimensional spaces, linear maps,
 *   polynomials→operators, eigenvalues, inner products, operators on
 *   inner-product spaces); Lay's 'Linear Algebra and Its Applications'
 *   5e (Drive copy — row reduction, matrix equation, linear
 *   transformations, subspaces, eigenvalues, orthogonality and least
 *   squares, symmetric matrices and quadratic forms). Schaum's and
 *   Strang's LAA 4e also on the Drive (ids in the survey).
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 12 ch. 3
 *   Matrices + ch. 4 Determinants (the school ground = chapters 1–3);
 *   JEE Main 2026 unit 2's Matrices and Determinants (algebra,
 *   properties, evaluation, adjoint and inverse); university scope from
 *   the three classics; the UGC NET/GATE linear-algebra arcs as the
 *   competitive university scope.
 * - Exam types: the M2 module typology (Concept Application Exercises;
 *   Single/Multiple Correct, Linked Comprehension, Matrix Match,
 *   Numerical Value; Archives) for chapters 1–3; university-problem
 *   style (L5) for chapters 4–8.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'matrices',
    title: 'Matrices: the Rectangular Numbers',
    summary:
      'The JEE ground: what a matrix is, the classification census (square, diagonal, symmetric, skew, triangular, identity), addition, subtraction and scalar multiplication, the matrix product with its non-commutativity priced on 2\u00d72 cases, transpose and trace, special matrices, the adjoint, the inverse and its properties, elementary transformations as the practical inversion route, and characteristic roots named — the eigen-idea seeded early, cashed in chapter 6.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'What a Matrix Is: the Classification Census',
      'The Product and Its Non-Commutativity',
      'Transpose, Trace and the Special Family',
      'Adjoint, Inverse and Elementary Transformations',
    ],
  },
  {
    number: 2,
    slug: 'determinants',
    title: 'Determinants',
    summary:
      'The volume-keeper: expansion by minors and cofactors, the Sarrus rule for 3\u00d73, the full property arc (rows swapped, scaled, added — each proved), the product of determinants, the cofactor determinant, differentiation and integration of determinants, the coordinate-geometry applications (areas, concurrency, the pair-of-lines condition cross-referenced with Coordinate Geometry ch. 3) and Cramer\u2019s rule with its honest limits.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Expansion: Minors and Cofactors',
      'The Property Arc, Proved',
      'Determinants in Coordinate Geometry',
      'Cramer\u2019s Rule and Its Limits',
    ],
  },
  {
    number: 3,
    slug: 'systems-of-linear-equations',
    title: 'Systems of Linear Equations',
    summary:
      'The verdict discipline: systems in two and three unknowns — consistent with a unique solution, consistent with infinitely many, inconsistent — priced by rank and by determinant; row reduction and echelon forms as the general instrument (Strang\u2019s elimination), homogeneous systems and their trivial/non-trivial census, and the matrix-inversion route. The JEE verdicts earned, the university method built underneath them.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Verdicts',
      'Row Reduction and Echelon Forms',
      'Homogeneous Systems and Rank',
    ],
  },
  {
    number: 4,
    slug: 'vector-spaces',
    title: 'Vector Spaces',
    summary:
      'The abstraction earned: R\u207f as the prototype, subspaces, linear combinations and span, linear independence and dependence (Coordinate Geometry\u2019s 3D first sighting generalized), basis and dimension, the subspace dimensions theorem, and the coordinate-reading discipline. Strang\u2019s chapter-3 arc with Axler\u2019s definitions — every abstraction introduced only after its concrete prototype.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'R\u207f and Subspaces',
      'Span and Linear Independence',
      'Basis and Dimension',
    ],
  },
  {
    number: 5,
    slug: 'linear-transformations',
    title: 'Linear Transformations',
    summary:
      'Advanced Algebra\u2019s machines, specialized: transformations that respect addition and scalar multiplication — rotations, reflections, projections, shears — kernel and range, the rank-nullity theorem proved, the matrix of a transformation (and under a change of basis), invertibility, and composition as matrix product. The chapter that finally explains WHY matrix multiplication is defined the strange way it is.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Machines that Respect the Structure',
      'Kernel, Range and Rank-Nullity',
      'The Matrix of a Transformation',
      'Composition and Change of Basis',
    ],
  },
  {
    number: 6,
    slug: 'eigenvalues-and-eigenvectors',
    title: 'Eigenvalues and Eigenvectors',
    summary:
      'The invariant directions: the characteristic polynomial, eigenvalues and eigenvectors computed across engineered matrices, diagonalization and its conditions, the Cayley\u2013Hamilton theorem proved and used, the symmetric-matrix promise (real eigenvalues, orthogonal eigenvectors — stated with its proof deferred honestly), and the applications census (powers of matrices, Markov chains named forward to Probability, the SVD named at chapter\u2019s end).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Characteristic Polynomial',
      'Diagonalization and Cayley\u2013Hamilton',
      'The Symmetric Promise',
      'Powers, Markov Chains and the SVD Named',
    ],
  },
  {
    number: 7,
    slug: 'orthogonality-and-least-squares',
    title: 'Orthogonality and Least Squares',
    summary:
      'The inner product returns: projections and orthogonality in R\u207f, the Gram\u2013Schmidt process, orthogonal bases and the QR idea, and least squares — the overdetermined systems science actually meets — with the regression tie to Statistics named (the LINE the data draws, derived here, applied there). Strang\u2019s orthogonality arc with Lay\u2019s applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Projections and Orthogonality',
      'Gram\u2013Schmidt and Orthogonal Bases',
      'Least Squares: the Overdetermined Verdict',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the four fundamental subspaces (Strang\u2019s picture of the whole subject in one diagram), the determinant as volume story, symmetric matrices and quadratic forms (the conics of Coordinate Geometry re-read as x\u1d40Ax — Multivariable Calculus\u2019s extrema engine), the craft census for exam-style systems work, and the doorstep: the AXIOMS themselves become the subject — handing off to Abstract Algebra, with Numerical Analysis named as the computational sequel.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Fundamental Subspaces',
      'Quadratic Forms and the Conics Re-read',
      'The Doorstep: the Axioms Become the Subject',
    ],
  },
]

export const linearAlgebra: Book = {
  id: 'linear-algebra',
  title: 'Linear Algebra',
  subtitle: 'The mathematics of flatness — vectors, maps, structure',
  discipline: 'mathematics',
  level: 'Class 12 matrices \u2192 second-year university algebra',
  description:
    'The book where the shelf\u2019s machine idea meets structure. The JEE ground first — matrices with their algebra and the adjoint-inverse route, determinants with the full property arc and Cramer\u2019s rule, linear systems with their three-verdict discipline; then the university ladder — vector spaces with basis and dimension, linear transformations with rank-nullity and the matrix-of-a-map story that finally explains matrix multiplication, eigenvalues with diagonalization and Cayley\u2013Hamilton, orthogonality with Gram\u2013Schmidt and least squares (Statistics\u2019s regression engine derived here), and the closing synthesis — the four fundamental subspaces and quadratic forms re-reading the conics. Cross-references Advanced Algebra, Coordinate Geometry and Trigonometry; hands off to Abstract Algebra, Multivariable Calculus, Numerical Analysis and Statistics.',
  status: 'planned',
  accent: ['#a16207', '#854d0e'],
  chapters,
}
