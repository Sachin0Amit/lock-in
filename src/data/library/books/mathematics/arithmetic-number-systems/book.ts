import type { Book } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'
import { chapter05 } from './ch-05'
import { chapter06 } from './ch-06'
import { chapter07 } from './ch-07'
import { chapter08 } from './ch-08'
import { chapter09 } from './ch-09'
import { chapter10 } from './ch-10'

/**
 * Arithmetic and Number Systems — the second book of the Mathematics shelf.
 *
 * STATUS: COMPLETE — 10/10 chapters, closed by run 65 (2026-11-07): the
 * BOOK CLOSE run wrote 10.3 'The Toolkit Synthesis' (6,158 words — the
 * one-engine thesis: unit digits/last two digits in ℤ/10ℤ and ℤ/100ℤ,
 * Legendre's chain and the digit-sum identity Z(n) = (n − s₅(n))/4,
 * base conversions as quotient-remainder chains with the digit-sum law
 * N ≡ s_b(N) (mod b−1), the CRT remainder-vector verdict, 6,158 words,
 * quiz keys 0/2/2/2/0, 16 exercises), passed the unit-10 completion
 * review (ids repo-wide unique, exam corners 3/3, all ten book-2
 * verifiers re-run green), and flipped the book complete.
 * Chapter 1 'The Natural Numbers as a System'
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
  status: 'complete',
  accent: ['#14b8a6', '#0f766e'],
  chapters: [
    chapter01,
    chapter02,
    chapter03,
    chapter04,
    chapter05,
    chapter06,
    chapter07,
    chapter08,
    chapter09,
    chapter10,
  ],
}
