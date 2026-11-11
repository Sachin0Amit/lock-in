import type { Book, Chapter } from '../../../types'

/**
 * Combinatorics — the seventeenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 6 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `co-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Advanced Algebra chapter 6
 * banked the counting fundamentals (the two principles, permutations,
 * combinations) and chapter 7 the binomial theorem; Discrete
 * Mathematics carries the algorithmic half (recurrences,
 * inclusion-exclusion basics, graphs). THIS book takes counting itself
 * to depth: the bijection and double-counting craft, the binomial
 * identity machine, generating functions as THE tool, recurrence
 * relations at full generality, partitions and the Pólya/Burnside
 * counting of symmetric structures, and the frontier named honestly
 * (Ramsey theory, extremal combinatorics, the probabilistic method).
 * It hands off to Probability Theory (the counted universe weighted)
 * and the olympiad ladder.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   module's ch. 07 'Permutation and Combination' is Advanced Algebra
 *   ch. 6's banked ground (cross-referenced); ch. 14's Bernoulli-trial
 *   scope belongs to Probability. No dedicated combinatorics reference
 *   on the Drive (honest note) — the classic arcs are web-researched:
 *   Rosen 8e's ch. 6 (Counting, incl. generalized permutations and
 *   combinations) + ch. 8 (Advanced Counting: linear recurrences,
 *   divide-and-conquer relations, generating functions,
 *   inclusion-exclusion and applications) as the university-scope
 *   cross-check — TOC extracted this pass; the generating-function arc
 *   and the partition/Pólya arcs follow the standard university
 *   treatment (verified against open-course syllabi).
 * - Syllabus audit (web-checked 2026-11-10): JEE Main unit 2's
 *   Permutations and Combinations scope is Advanced Algebra's banked
 *   ground (recalled in chapter 1, never re-taught); the university
 *   scope owns generating functions, recurrences at depth, partitions;
 *   the olympiad ladder (IMO combinatorics is a pillar) owns the
 *   frontier chapter.
 * - Exam types: university-course problems (L5), olympiad proof
 *   problems (L6); the JEE typology applies only to the recalled
 *   chapter-1 ground (cross-referenced to the module's typology).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'counting-foundations-at-depth',
    title: 'Counting Foundations at Depth',
    summary:
      'Advanced Algebra\u2019s ground recalled in one honest lesson (the two principles, nPr and nCr), then the REAL beginning: counting by bijection (two sets, one count), double counting (proving identities by counting a set two ways), the complement principle, and the pigeonhole reprise with its sharp forms. The craft shift from formulas to arguments — this book\u2019s signature.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bank Recalled: Principles and Formulas',
      'Counting by Bijection',
      'Double Counting',
    ],
  },
  {
    number: 2,
    slug: 'the-binomial-machine',
    title: 'The Binomial Machine',
    summary:
      'The binomial coefficients as objects of study: Pascal\u2019s recurrence proved combinatorially, the identity cascade (Vandermonde, the absorption identity, sums by diagonal and by column, alternating sums — each proved BOTH algebraically and by story), the multinomial coefficients, inclusion-exclusion at full depth (derangements, surjection counts, the Euler phi connection cross-referenced to Number Theory), and counting with repetition (the stars-and-bars census in all its cases). The binomial coefficients and their identities — Vandermonde’s convolution and its kin — derived as THE machine, not a side exhibit.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Pascal\u2019s Recurrence and the Identity Cascade',
      'Multinomials and Stars-and-Bars',
      'Inclusion\u2013Exclusion at Full Depth',
    ],
  },
  {
    number: 3,
    slug: 'generating-functions',
    title: 'Generating Functions',
    summary:
      'The book\u2019s engine: a sequence become a power series, and counting done by algebra — ordinary generating functions, the arithmetic of series (product as convolution — the combinatorial meaning made explicit), solving recurrences the slick way, change-making and partition counting as worked payoffs, and the exponential generating function introduced for labelled structures. The tool Discrete Mathematics named forward, owned here.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'A Sequence Becomes a Series',
      'Products as Convolutions',
      'Solving Recurrences the Slick Way',
      'Change-Making and Partitions',
      'Exponential Generating Functions',
    ],
  },
  {
    number: 4,
    slug: 'recurrence-relations-at-depth',
    title: 'Recurrence Relations at Depth',
    summary:
      'The general theory Discrete Mathematics\u2019s chapter opened: linear recurrences with constant coefficients (homogeneous and not — the characteristic equation and the particular-solution craft, fully derived), theCatalog of famous recurrences (the Catalan family counted several ways, the derangement recurrence, the Tower of Hanoi), generating functions as the unified solver, and the asymptotic idea (what happens as n grows — big-O met from Discrete Mathematics, cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Linear Recurrences: the General Theory',
      'The Catalan Family',
      'Asymptotics: the Growth of Counts',
    ],
  },
  {
    number: 5,
    slug: 'partitions-and-symmetric-counting',
    title: 'Partitions and Symmetric Counting',
    summary:
      'Integer partitions (the generating function derived, Ferrers diagrams and their bijections, self-conjugate partitions), group actions on colourings — Burnside\u2019s lemma proved and applied to necklace and cube-colouring counts — and P\u00f3lya\u2019s enumeration theorem stated with worked applications. The mathematics of symmetric structures, honest about what is proved and what is stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Integer Partitions and Ferrers Diagrams',
      'Transversals and Matching: Hall\u2019s Marriage Theorem',
      'Combinatorial Designs: Block Designs, Steiner Systems and Latin Squares',
      'Burnside\u2019s Lemma',
      'P\u00f3lya Counting',
    ],
  },
  {
    number: 6,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: olympiad combinatorics craft (the extremal principle, the invariant, the clever bijection — worked problems at graded levels), the frontier named honestly (Ramsey\u2019s theorem with the party problem, extremal combinatorics and Erd\u0151s\u2019s probabilistic method described accurately, the counting-to-probability bridge), the book in one page (the map from bijection to P\u00f3lya), and the doorstep: weights on the counted universe — Probability Theory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Olympiad Combinatorics: the Craft',
      'The Frontier Named: Ramsey and the Probabilistic Method',
      'The Doorstep: Weights on the Counted Universe',
    ],
  },
]

export const combinatorics: Book = {
  id: 'combinatorics',
  title: 'Combinatorics',
  subtitle: 'Counting as an exact science — bijections, generating functions, symmetry',
  discipline: 'mathematics',
  level: 'Beyond the AA bank \u2192 university combinatorics and olympiad depth',
  description:
    'The book that takes counting from formulas to arguments. The bijection and double-counting craft; the binomial machine with its identity cascade proved both algebraically and by story; inclusion-exclusion at full depth with derangements and the Euler phi connection; generating functions as the engine — sequences become series, products become convolutions, recurrences surrender, and partitions get counted; the general recurrence theory with the Catalan family; and the symmetric structures — integer partitions with Ferrers diagrams, Burnside\u2019s lemma, P\u00f3lya counting. The frontier chapter names Ramsey theory, extremal combinatorics and the probabilistic method accurately. Advanced Algebra\u2019s fundamentals are recalled once, never re-taught; Discrete Mathematics\u2019s algorithmic half is cross-referenced. Hands off to Probability Theory and the olympiad ladder.',
  status: 'planned',
  accent: ['#dc2626', '#b91c1c'],
  chapters,
}
