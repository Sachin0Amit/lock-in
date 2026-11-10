import type { Book, Chapter } from '../../../types'

/**
 * Number Theory — the fourteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 10 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `nt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Arithmetic and Number Systems
 * banked the ground honestly — divisibility and the Euclidean algorithm
 * (ANS ch. 2), primes and the fundamental theorem (ANS ch. 4), the
 * arithmetic of remainders (ANS ch. 5), the integers and rationals as
 * built systems (ANS ch. 6–7). THIS book climbs from that bank into the
 * classical theory: congruence machinery (linear congruences, CRT,
 * Wilson), Fermat and Euler, the number-theoretic functions, primitive
 * roots, quadratic residues and reciprocity, continued fractions, the
 * Fibonacci ground, and cryptography as the modern payoff — Discrete
 * Mathematics's number-theory chapter cross-referenced rather than
 * duplicated. It hands off to Real Analysis (analytic number theory
 * named), Abstract Algebra (algebraic number theory named) and the
 * olympiad ladder.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): no dedicated
 *   number-theory reference on the Drive (honest note) — the M2 module's
 *   ch. 01 'Set Theory and the Real Number System' carries only the
 *   real-number ground ANS already owns. The classic arc is
 *   web-researched instead: Burton's 'Elementary Number Theory' 7e
 *   (chapter list web-checked 2026-11-10 — Preliminaries with
 *   mathematical induction, pigeonhole, divisibility; Divisibility Theory
 *   in the Integers; Primes and Their Distribution; The Theory of
 *   Congruences; Fermat's Theorem; Number-Theoretic Functions incl. the
 *   greatest-integer function and the Möbius function; Euler's
 *   Generalization of Fermat's Theorem; Primitive Roots and Indices; The
 *   Quadratic Reciprocity Law; Perfect Numbers; The Fibonacci Numbers)
 *   maps to chapters 1–8; Rosen 8e's ch. 4 (Number Theory and
 *   Cryptography — divisibility and modular arithmetic, integer
 *   representations, primes and GCDs, solving congruences, applications,
 *   RSA) maps to the cryptography chapter.
 * - Syllabus audit (web-checked 2026-11-10): no NCERT ground beyond
 *   ANS's banked chapters (cross-referenced); JEE Main does not carry
 *   number theory as a unit (its modular residue scope lives inside
 *   algebra problem-craft — noted honestly); the competitive scope is the
 *   olympiad ladder (IMO/RMO number theory is a pillar) and university
 *   courses; the aptitude side (Khattar QA ch. 1–2 numbers/HCF-LCM
 *   speed work) cross-referenced.
 * - Exam types: olympiad proof problems (L6), university-course
 *   problems (L5), aptitude speed work (L4, cross-referenced to Khattar).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-ground-ans-banked',
    title: 'The Ground Arithmetic Banked',
    summary:
      'The honest reopening: the divisibility structure, the Euclidean algorithm and GCD (ANS ch. 2\u2019s engine recalled and run deeper), Diophantine equations of the form ax + by = c — solved completely with the condition for solvability — and the least-common-multiple structure. New ground begins immediately: the linear Diophantine theory ANS named but never finished.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Divisibility Recalled, Deepened',
      'The Euclidean Algorithm at Depth',
      'Linear Diophantine Equations',
    ],
  },
  {
    number: 2,
    slug: 'congruence-machinery',
    title: 'The Congruence Machinery',
    summary:
      'ANS chapter 5\u2019s remainder arithmetic, industrialized: linear congruences and their solution condition, the Chinese remainder theorem proved constructively (the Sun Zi story verified), Wilson\u2019s theorem proved both ways, congruence classes as a ring (the structure Abstract Algebra will name), and the high-order congruence craft at olympiad level.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Linear Congruences',
      'The Chinese Remainder Theorem',
      'Wilson\u2019s Theorem',
      'Congruence Classes as Structure',
    ],
  },
  {
    number: 3,
    slug: 'fermat-and-euler',
    title: 'Fermat and Euler',
    summary:
      'The two great theorems of reduction: Fermat\u2019s little theorem proved combinatorially and by induction, Euler\u2019s φ and its multiplicativity, Euler\u2019s generalization, the reduced residue system, and the primality-testing ideas (with the Fermat-liar phenomenon named honestly — pseudoprimes, the reason strong tests exist).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Fermat\u2019s Little Theorem',
      'Euler\u2019s Phi and Its Multiplicativity',
      'Euler\u2019s Theorem and Pseudoprimes',
    ],
  },
  {
    number: 4,
    slug: 'number-theoretic-functions',
    title: 'Number-Theoretic Functions',
    summary:
      'Functions on the integers: τ and σ with their multiplicativity, perfect numbers and the Euclid\u2013Euler theorem (even perfect numbers — proved in the Euclid direction, the converse attributed honestly), the greatest-integer function at depth, the Möbius function and inversion — and the summatory census questions that open analytic number theory\u2019s door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tau, Sigma and Multiplicativity',
      'Perfect Numbers',
      'The M\u00f6bius Function and Inversion',
    ],
  },
  {
    number: 5,
    slug: 'primitive-roots-and-indices',
    title: 'Primitive Roots and Indices',
    summary:
      'The multiplicative order of an element, the primitive-root existence theorem (stated with its proof\u2019s honest scope — full proof deferred to the algebra it feeds), indices as discrete logarithms, and the applications: the structure of U(2\u1d4f), U(p\u1d4f), and the Diffie\u2013Hellman idea named forward to cryptography.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Order of an Element',
      'Primitive Roots',
      'Indices: the Discrete Logarithm',
    ],
  },
  {
    number: 6,
    slug: 'quadratic-residues-and-reciprocity',
    title: 'Quadratic Residues and Reciprocity',
    summary:
      'The classical crown: quadratic residues and non-residues, Euler\u2019s criterion, the Legendre symbol with its multiplicative law, Gauss\u2019s lemma, and the law of quadratic reciprocity — stated, interpreted, and applied to the composite-modulus questions; the full proof landscape described honestly with its famous history (verified).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Residues and Euler\u2019s Criterion',
      'The Legendre Symbol',
      'Gauss\u2019s Lemma and Quadratic Reciprocity',
    ],
  },
  {
    number: 7,
    slug: 'continued-fractions',
    title: 'Continued Fractions',
    summary:
      'The honest alternative to decimal expansion: finite continued fractions for rationals, convergents and their error discipline, infinite expansions for irrationals, the periodicity theorem for quadratic irrationals (√2\u2019s famous expansion derived), and the rational-approximation craft — the best-fraction idea the calendar and the tuner both use.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Finite Continued Fractions and Convergents',
      'Infinite Expansions and \u221a2',
      'Best Rational Approximations',
    ],
  },
  {
    number: 8,
    slug: 'fibonacci-and-recurrence',
    title: 'Fibonacci and Recurrence',
    summary:
      'The Fibonacci ground: the recurrence and its Binet formula (derived via the characteristic-equation method Discrete Mathematics owns — cross-referenced), the identity cascade (gcd(F\u2098, F\u2099) = F_gcd — proved), Zeckendorf\u2019s theorem, and the golden-ratio connections priced honestly (no mysticism, per house discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Recurrence and Binet\u2019s Formula',
      'The Identity Cascade',
      'Zeckendorf and the Golden Ratio, Honestly',
    ],
  },
  {
    number: 9,
    slug: 'cryptography',
    title: 'Cryptography: the Modern Payoff',
    summary:
      'The number theory the world runs on: classical ciphers and their cryptanalysis (Caesar, Vigen\u00e8re with the Kasiski discipline), the one-time pad and its honest limitation, modular exponentiation and Diffie\u2013Hellman key exchange, and RSA in full — the theorem chain (Euler + CRT) doing exactly the work chapters 2–3 built, with the factoring-hardness assumption stated as an assumption, not a theorem.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Classical Ciphers and Their Cracks',
      'Diffie\u2013Hellman',
      'RSA: the Full Chain',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: olympiad number theory craft (the divisibility cascade, the order argument, the p-adic valuation lens — worked problems at graded levels), the book in one page (the map from Euclid\u2019s algorithm to RSA), and the doorsteps named honestly: the analytic road (primes counted — Real Analysis\u2019s series ground extended) and the algebraic road (rings and ideals — Abstract Algebra\u2019s ground).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Olympiad Number Theory: the Craft',
      'The Book in One Page: from Euclid to RSA',
      'The Doorsteps: the Analytic and Algebraic Roads',
    ],
  },
]

export const numberTheory: Book = {
  id: 'number-theory',
  title: 'Number Theory',
  subtitle: 'The integers at depth — from remainders to RSA',
  discipline: 'mathematics',
  level: 'The ANS bank extended \u2192 olympiad and university number theory',
  description:
    'The book that climbs from Arithmetic and Number Systems\u2019 banked ground into the classical theory. The Euclidean algorithm deepened and Diophantine equations solved completely; the congruence machinery (linear congruences, the Chinese remainder theorem, Wilson\u2019s theorem, classes as structure); Fermat\u2019s little theorem, Euler\u2019s φ and pseudoprimes named honestly; number-theoretic functions with Möbius inversion and perfect numbers; primitive roots and discrete logarithms; quadratic residues with the law of reciprocity; continued fractions with √2\u2019s periodicity and best rational approximations; Fibonacci with Binet and Zeckendorf; and cryptography as the payoff — Diffie\u2013Hellman and RSA in full, with factoring hardness stated as the assumption it is. Cross-references Arithmetic and Number Systems and Discrete Mathematics; hands off to Real Analysis and Abstract Algebra.',
  status: 'planned',
  accent: ['#7c2d12', '#5c2510'],
  chapters,
}
