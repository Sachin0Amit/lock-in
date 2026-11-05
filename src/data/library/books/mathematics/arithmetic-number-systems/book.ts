import type { Book } from '../../../types'

/**
 * Arithmetic and Number Systems — the second book of the Mathematics shelf.
 *
 * STATUS: PLANNED — research phase complete (2026-11-05, run 48); the full
 * TOC below is the researched chapter plan. Authoring begins at chapter 1
 * (owner cadence: two lessons per run). Lesson ids use the `ans-` prefix
 * (globally unique, stable forever).
 *
 * POSITIONING (the no-duplication contract, MASTER_PLAN rule 7): Foundation
 * Mathematics taught the operations of arithmetic operationally — how to
 * add, how to reduce a fraction, how to run a divisibility test. THIS book
 * teaches the same ground from beneath: why the operations obey the laws
 * they obey, how positional names work in any base, how remainders become
 * an arithmetic of their own, and how the number systems ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
 * were each built to repair a closure failure. Every topic that FM banked
 * (divisibility tests, prime/composite, HCF/LCM, fractions, decimals,
 * integer operations, patterns → formulas) is cross-referenced, never
 * repeated; where FM proved nothing, this book proves. It hands off to
 * Elementary Algebra (letters and structure), Number Theory (Fermat, Euler,
 * CRT in full) and Set Theory (countability, cardinals).
 *
 * RESEARCH PHASE (done 2026-11-05, run 48):
 * - Reference survey: the Drive collection is exam/higher-ed oriented; the
 *   relevant persisted references are Khattar QA 4e ch. 1 "Numbers" (file id
 *   in the survey since run 6) for competitive-exam arithmetic scope and the
 *   Cengage M2/01 "Set Theory and the Real Number System" module (style
 *   reference, run 14). No new downloads were needed for the research phase
 *   itself; per-unit downloads follow at authoring time.
 * - Syllabus audit (sanctioned internet fallback):
 *   (a) competitive-exam number-system scope (CAT/IPMAT-level syllabi):
 *   divisibility, HCF×LCM product relation, remainders, unit digits and
 *   cycles of powers, factorials (trailing zeros, exponent of a prime),
 *   base systems (conversion + arithmetic in other bases) — maps to
 *   chapters 2, 4, 5 and the 10.3 synthesis;
 *   (b) university proof-transition scope (Beck & Geoghegan, The Art of
 *   Proof: "our subject is number systems" — ℕ with induction/recursion,
 *   ℤ, ℚ, ℝ): maps to chapters 1, 6, 7, 8;
 *   (c) historical numeration (OpenStax Contemporary Mathematics §4.2:
 *   Babylonian/Mayan/Roman → Hindu–Arabic): maps to chapter 9;
 *   (d) machine representation (Cambridge IGCSE CS 0478 §1.1: binary/hex/
 *   two's complement): cross-referenced at 3.4, deep coverage left to the
 *   Computer Science shelf (Digital Logic, COA);
 *   (e) NCERT class 6 ch. 1 and class 8 ch. 16 "Playing with Numbers"
 *   (general form, letters for digits, the 3/9 tests): the school canon
 *   that FM ch. 1/3 banked — this book re-derives those tests from
 *   congruences (5.2).
 */
export const arithmeticNumberSystems: Book = {
  id: 'arithmetic-and-number-systems',
  title: 'Arithmetic and Number Systems',
  subtitle: 'Why arithmetic works — and how the number systems were built',
  discipline: 'mathematics',
  level: 'Upper primary → first-year university bridge',
  description:
    'The structural sequel to Foundation Mathematics. FM taught you to compute; this book proves why the computing rules hold. Positional naming in any base, the division algorithm, Euclid’s algorithm with its proof, the fundamental theorem of arithmetic, congruences as an arithmetic of remainders, and the great extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ — each rung built to repair a closure failure. Divisibility tests you have used since school are finally derived; √2 is finally proved irrational; the primes are finally shown endless. Cross-references Foundation Mathematics throughout; hands off to Elementary Algebra, Number Theory and Set Theory.',
  status: 'planned',
  accent: ['#0f766e', '#115e59'],
  notes:
    'Research phase complete 2026-11-05 (run 48): reference survey + syllabus audit + this chapter plan; full per-chapter reference mapping sits in the file header. Sources named: Khattar QA 4e ch. 1 (competitive-exam arithmetic scope → ch. 2/4/5/10); Beck & Geoghegan, The Art of Proof (the university number-systems bridge → ch. 1/6/7/8); OpenStax Contemporary Mathematics §4.2 (early numeration → ch. 9); Cambridge IGCSE CS 0478 §1.1 (binary/hex representation → ch. 3); NCERT class 6 ch. 1 + class 8 ch. 16 Playing with Numbers (the school canon this book re-derives). Duplication policy: FM-banked operations are cross-referenced (fm- lesson ids), never repeated; this book proves what FM banked. Authoring starts at ch. 1 next run (two lessons per run, owner directive 2026-11-05).',
  chapters: [
    {
      number: 1,
      slug: 'natural-numbers-as-a-system',
      title: 'The Natural Numbers as a System',
      summary:
        'Counting rebuilt from the successor idea: the number line as order, induction as the domino principle that proves statements about every natural number at once, and the least-number principle (well-ordering) as the engine behind every "take the smallest counterexample" argument — with the equivalence of the two principles proved and recursion defined.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Architecture of Counting: Successors and Order',
        'Induction: Proving for Every Number at Once',
        'The Least-Number Principle and Recursion',
      ],
    },
    {
      number: 2,
      slug: 'division-algorithm-and-divisibility',
      title: 'The Division Algorithm and the Structure of Divisibility',
      summary:
        'The theorem hiding under every long division: a = bq + r with 0 ≤ r < b, existence proved by well-ordering and uniqueness by subtraction. Divisibility becomes algebra (the transitive and linear-combination laws), the Euclidean algorithm gets the proof FM omitted, Bézout’s identity is derived, and linear Diophantine equations ax + by = c are solved in full.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Division with Rest: The Division Algorithm',
        'The Algebra of Divisibility',
        'The Euclidean Algorithm, Proven — and Bézout’s Identity',
        'Linear Diophantine Equations',
      ],
    },
    {
      number: 3,
      slug: 'positional-systems-and-bases',
      title: 'Positional Systems and Other Bases',
      summary:
        'Base ten unmasked as one instance of a universal machine: the representation theorem (every number has exactly one name in every base b ≥ 2, proved from the division algorithm), conversion in both directions, arithmetic genuinely inside other bases (addition and multiplication tables in base b), and the binary–hexadecimal world that runs every computer.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Representation Theorem: Every Number Has Exactly One Name',
        'Converting Between Bases',
        'Arithmetic in Other Bases',
        'Binary, Hexadecimal and the Machine',
      ],
    },
    {
      number: 4,
      slug: 'primes-and-the-fundamental-theorem',
      title: 'Primes and the Fundamental Theorem of Arithmetic',
      summary:
        'The atoms of multiplication: Euclid’s two-thousand-year-old proof that the primes never end, the sieve that hunts them, the fundamental theorem (unique factorisation) with both existence and uniqueness proved — uniqueness cashed through Bézout — and the counting consequences: divisor counts, the exponent of a prime in n!, and the trailing zeros of factorials.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Primes Never End: Euclid’s Proof and the Sieve',
        'The Fundamental Theorem of Arithmetic',
        'Divisors from DNA: Divisor Counts and Factorial Zeros',
        'How the Primes Are Distributed',
      ],
    },
    {
      number: 5,
      slug: 'congruences',
      title: 'Congruences: The Arithmetic of Remainders',
      summary:
        'Remainders promoted to numbers: congruence defined and its laws proved, the school divisibility tests finally derived (why casting out nines works, why 11 alternates signs), the unit digit of huge powers found through cycles, linear congruences solved, and a computationally verified glimpse of Fermat’s little theorem — the doorway to the Number Theory book.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Remainders Become Numbers: Congruence Defined',
        'Why the Divisibility Tests Work',
        'The Unit Digit and Cycles of Powers',
        'Linear Congruences and a Glimpse of Fermat',
      ],
    },
    {
      number: 6,
      slug: 'building-the-integers',
      title: 'Building the Integers',
      summary:
        'The first great extension, done honestly: the closure failures that force negative numbers (FM 7.1 felt them; here they are named), the actual construction of ℤ from ℕ as difference pairs with the equivalence relation proved, and the arithmetic laws of ℤ derived from the construction — the reader’s first ring, met as a building rather than a fact.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Closure Failures That Force Extension',
        'Constructing the Integers from the Naturals',
        'The Laws of Integer Arithmetic',
      ],
    },
    {
      number: 7,
      slug: 'building-the-rationals',
      title: 'Building the Rationals',
      summary:
        'Fractions revealed as a constructed system: the equivalence of FM 4.2 re-founded as a relation on pairs, the field laws derived (every nonzero number finally gets a reciprocal), and the two structural theorems — the rationals are dense, and their decimal expansions terminate or repeat — proved from the division algorithm.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'From Fractions to the Rational System',
        'The Field Laws: Division Joins the Family',
        'Density and the Decimal Mirror, Proven',
      ],
    },
    {
      number: 8,
      slug: 'irrationals-and-the-real-line',
      title: 'Irrationals and the Real Line',
      summary:
        'The diagonal that broke the rationals: √2 proved irrational by the classical contradiction, the family of irrationals grown from the primes, the arithmetic behaviour of irrational + rational sorted into a proved table, and completeness met informally — the no-holes property that makes the real line the stage for all of analysis.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Diagonal of the Square: √2 Is Irrational',
        'The Irrationals Are Everywhere',
        'The Real Line: Order, Density and Completeness',
      ],
    },
    {
      number: 9,
      slug: 'numeration-through-history',
      title: 'Numeration Through History',
      summary:
        'Five systems, one winner: tally and grouping, the additive symbols of Egypt and Rome (and why they resist arithmetic), the place-value systems that arrived too early — Babylonian base sixty and the Mayan base twenty with their missing-zero costs — and the Indian decimal revolution that made zero a number and carried the world’s arithmetic.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'Tallies, Groupings and Additive Systems',
        'Place Value Before Its Time: Babylon and Mesoamerica',
        'The Indian Decimal Revolution and Zero',
      ],
    },
    {
      number: 10,
      slug: 'the-map-of-number-systems',
      title: 'The Map of Number Systems',
      summary:
        'The synthesis: the great extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ drawn as one story of repaired failures; congruence arithmetic at work guarding data (casting out nines as an error detector, the mod-11 checksum scheme); and the competitive-arithmetic toolkit — unit digits, factorial zeros, base conversions, remainder chains — unified as one congruence engine.',
      status: 'planned',
      lessons: [],
      plannedLessons: [
        'The Great Extension Story',
        'Numbers That Guard Data: Checksums and Casting Out Nines',
        'The Toolkit Synthesis',
      ],
    },
  ],
}
