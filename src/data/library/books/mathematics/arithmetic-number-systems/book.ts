import type { Book } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'
import { chapter05 } from './ch-05'
import { chapter06 } from './ch-06'
import { chapter07 } from './ch-07'
import { chapter08 } from './ch-08'

/**
 * Arithmetic and Number Systems — the second book of the Mathematics shelf.
 *
 * STATUS: IN PROGRESS — chapters 1–8 COMPLETE; ch. 9 opens at run 62. Chapter 1 'The Natural Numbers as a System'
 * COMPLETE 3/3 (runs 49-50). Chapter 2 'The Division Algorithm and
 * the Structure of Divisibility' COMPLETE 4/4 (runs 51-52). Chapter 3
 * 'Positional Systems and Other Bases' COMPLETE 4/4 (runs 53-54, unit-3
 * review passed). Chapter 4 'Primes and the Fundamental Theorem of
 * Arithmetic' COMPLETE 4/4 (runs 55-56). Chapter 5 'Congruences: The
 * Arithmetic of Remainders' COMPLETE 4/4 (run 57, 2026-11-06 — the
 * second one-full-chapter run: 5.1 congruence defined + 5.2 the
 * divisibility tests derived + 5.3 unit digits and cycles + 5.4 linear
 * congruences, CRT and Fermat’s glimpse, with the unit-5 completion
 * review passed; verify-book2-ch05.ts 265 checks, all green before
 * writing). Chapter 6 'Building the Integers' COMPLETE 3/3 (run 58,
 * 2026-11-06 — the third one-full-chapter run: 6.1 closure failures +
 * 6.2 the difference-pair construction + 6.3 the laws derived, with the
 * unit-6 completion review passed; verify-book2-ch06.ts 233 checks,
 * sections A–W, all green before writing).
 * The full TOC below is the researched chapter plan
 * (owner cadence: one full chapter per run). Lesson ids use the `ans-`
 * prefix (globally unique, stable forever).
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
  status: 'in-progress',
  accent: ['#0f766e', '#115e59'],
  notes:
    'Research phase complete 2026-11-05 (run 48): reference survey + syllabus audit + the 10-chapter/34-lesson plan. Chapter 1 COMPLETE (runs 49-50; verify-book2-ch01.ts 228 checks). Chapter 2 COMPLETE (runs 51-52; verify-book2-ch02.ts extended 166 → 407 checks, seven pre-writing defects caught in run 52). Chapter 3 COMPLETE (runs 53-54; verify-book2-ch03.ts 312 → 502 checks, thirteen pre-writing defects caught across the two runs; unit-3 completion review passed). Chapter 4 COMPLETE (runs 55-56; verify-book2-ch04.ts 167 → 356 checks across the two runs, unit-4 completion review passed — chapter 4 closed in one run per the owner directive of 2026-11-06). Chapter 5 COMPLETE (run 57, 2026-11-06 — the second one-full-chapter run: 5.1 Remainders Become Numbers + 5.2 Why the Divisibility Tests Work + 5.3 The Unit Digit and Cycles of Powers + 5.4 Linear Congruences and a Glimpse of Fermat, all four shipped verify-first with verify-book2-ch05.ts at 265 checks sections A–AE — three pre-writing defects caught — unit-5 completion review passed). Chapter 6 COMPLETE (run 58, 2026-11-06 — the third one-full-chapter run: 6.1 The Closure Failures That Force Extension + 6.2 Constructing the Integers from the Naturals + 6.3 The Laws of Integer Arithmetic, all three shipped verify-first with verify-book2-ch06.ts at 233 checks sections A–W — eleven draft defects caught in-script — unit-6 completion review passed; new citation keys hankel-1867-permanence, peacock-1833-permanence, brahmagupta-628-brahmasphutasiddhanta). Chapter 7 COMPLETE (run 59, 2026-11-06 — the fourth one-full-chapter run: 7.1 From Fractions to the Rational System + 7.2 The Field Laws: Division Joins the Family + 7.3 Density and the Decimal Mirror Proven, all three shipped verify-first with verify-book2-ch07.ts at 239 checks sections A–T — fifteen pre-writing defects caught in-script — unit-7 completion review passed; new citation keys rhind-papyrus-fractions, stevin-1585-thiende, dedekind-1871-korper). Chapter 8 ’Irrationals and the Real Line’ COMPLETE 4/4 (runs 60–61, 2026-11-06 — run 61, a manual catch-up of a failed-to-start fire, shipped 8.3 ’How Irrationals Behave’ (the behaviour table, the both-ways cases, rationalization) + 8.4 ’Completeness: the Line Without Holes’ (Dedekind cuts, the tower ℕ⊂ℤ⊂ℚ⊂ℝ, nested intervals) with verify-book2-ch08.ts at 302 checks sections A–U2 — five pre-writing defects caught including the 8.1 shore-guard defect — the unit-8 completion review passed; new citation keys dedekind-1872-stetigkeit, cantor-1872-fundamental-sequences, heine-1872-functionenlehre, meray-1869-limites). Chapter 8 IN PROGRESS 2/4 (run 60, 2026-11-06 — the FIRST two-lessons-per-run run under the owner’s 2026-11-06 v2 hourly directive: 8.1 The Diagonal That Broke the Rationals (5,393 words) + 8.2 The Family of Irrationals (5,073 words), shipped verify-first and strictly sequentially with verify-book2-ch08.ts at 171 checks sections A–Q — ten pre-writing defects caught in-script, including the author’s own wrong remembered digits for √7 — per-lesson gates green twice; 8.3 + 8.4 + the unit-8 review remain for run 61; new citation keys baudhayana-sulbasutras, hippasus-irrationality-tradition, plato-theaetetus-theodorus, cantor-1874-algebraic-numbers). The per-chapter reference mapping from the research phase lives on in WORKLOG/SOURCE_LOG. Sources named: Khattar QA 4e ch. 1 (competitive-exam arithmetic scope → ch. 2/4/5/10); Beck & Geoghegan, The Art of Proof (the university number-systems bridge → ch. 1/6/7/8); Hankel Theorie der complexen Zahlensysteme 1867 (the permanence-of-formal-laws charter → ch. 6); Brahmagupta Brahmasphutasiddhanta 628 (the fortunes/debts rules FM 7.1–7.3 banked, derived at 6.3); Euclid Elements Books VII + IX (the measures charter, VII.30-32, IX.14 + IX.20 + IX.36 → ch. 2/3/4); Knuth TAOCP Vol. 2 §4.1 Positional Number Systems (the notation charter → ch. 3); Nicomachus Introduction to Arithmetic I.13 + the perfect/abundant/deficient chapter (the sieve’s surviving account and the three-family classification → ch. 4); al-Farisi (the first full existence proof + the amicable workshop → ch. 4); Thābit ibn Qurra (the amicable rule, c. 850 → ch. 4); Bertrand 1845 / Chebyshev 1850 / Erdős 1932 (the doubling guarantee → ch. 4); Euler 1737 Variae observationes (Σ 1/p diverges + the zeta product → ch. 4); Hadamard & de la Vallée Poussin 1896 (the PNT, stated → ch. 4); Zhang 2013 / Maynard / Polymath8 (bounded gaps 70,000,000 → 246 → ch. 4); Gauss Disquisitiones Arithmeticae 1801 art. 1 (the congruence definition and ≡ notation) + art. 16 (the first uniqueness proof → ch. 4/5); OpenStax Contemporary Mathematics §4.2 (early numeration → ch. 9); Cambridge IGCSE CS 0478 §1.1 (binary/hex representation → ch. 3 lesson 3.4); NCERT class 6 ch. 1 + class 8 ch. 16 Playing with Numbers (the school canon ch. 5 re-derives from congruences); Fibonacci Liber Abaci 1202 (the casting-out-nines check described → ch. 5 lesson 5.2); Sunzi Suanjing (3rd–5th c. CE, the CRT counting problem) with Āryabhaṭa 499 / Brahmagupta 7th c. / Qin Jiushao 1247 (the CRT method’s lineage → ch. 5 lesson 5.4); Fermat’s 1640 letter to Frénicle (the little theorem, stated; Euler 1736 the first published proof → ch. 5 lesson 5.4). Duplication policy: FM-banked operations are cross-referenced (fm- lesson ids), never repeated; this book proves what FM banked. One full chapter per run (owner directive 2026-11-06).',
  chapters: [
    chapter01,
    chapter02,
    chapter03,
    chapter04,
    chapter05,
    chapter06,
    chapter07,
    chapter08,
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
