import type { Book, Chapter } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter03 } from './ch-03'
import { chapter04 } from './ch-04'
import { chapter05 } from './ch-05'
import { chapter06 } from './ch-06'
import { chapter07 } from './ch-07'
import { chapter08 } from './ch-08'
import { chapter09 } from './ch-09'

/**
 * Advanced Algebra — the fourth book of the Mathematics shelf.
 *
 * STATUS: IN-PROGRESS — EIGHT chapters COMPLETE (chapters 1–8, each with
 * its unit review; chapter 8 'The Theory of Equations' closed complete
 * by the run-119 WHOLE-UNIT SWARM — lessons 8.1–8.6 + 8.R, seven parallel
 * authoring agents — 51 written lessons in all), chapter 9 'Exponentials
 * and Logarithms' OPENED by the RUN 120 TWO-AGENT SWARM (9.1 'The
 * Exponential Family: Every Real Index' + 9.2 'Logarithms: the Inverse
 * Machine' shipped — engines green before prose, every number pinned in
 * scripts/verify-book4-ch09.ts; 9.3–9.6 + the 9.R review ride the next
 * fires), chapter 10 planned (the remaining 8 planned lessons: chapter 9
 * (4) + chapter 10 (4)) authoring on the one-unit-at-a-time cadence (run
 * 110 closed chapter 3; the 2026-11-18 PARALLEL-SWARM RUN — owner chat
 * directive "launch multiple agents for authoring lessons" — closed
 * chapter 4 whole-unit; the 2026-11-20 swarm closed chapter 5's remainder
 * + chapter 6 whole-unit; the 2026-11-21 v9.0 SWARM RUNS (owner directive
 * "use multiple agents or swarm of agents") authored chapter 7 (runs
 * 117-118) and chapter 8 WHOLE-UNIT (run 119, the "launch multiple
 * authoring agents" directive — seven parallel agents, one per lesson +
 * the review, recorded in WORKLOG); run 120 (2026-11-24) opened chapter 9
 * with the two-lesson swarm).
 * Lesson ids use the `aa-` prefix (verified unused across the library
 * at promotion time; globally unique, stable forever).
 *
 * POSITIONING (the no-duplication contract, MASTER_PLAN rule 7): Elementary
 * Algebra ended at the function doorstep — the input-output machine, its
 * notation f(x), the domain's two filters, the vertical-probe test, the range
 * read off the fold, and the composition doorstep named as the next book's
 * opening territory. THIS book opens exactly there: functions become objects
 * — a set of ordered pairs first (the relation view), then a transformation
 * classified one-one/onto, then combined (composition, with the honest domain
 * of a composite) and undone (the inverse machine). The quadratic returns as
 * a working object — optimized through vertex form, settled as inequalities
 * on the sign diagram, mined for symmetric reads, interrogated about where
 * its roots live. The extension ladder that Arithmetic and Number Systems
 * proved gets its most famous new rung: the complex numbers, built from the
 * closure failure of x² + 1 = 0 and handed back to the quadratic formula so
 * every discriminant is finally kept. Inequalities grow from the linear cases
 * AL settled into the classical engine — AM–GM, Cauchy–Schwarz, the triangle
 * inequality. Sequences and series (AP, GP, the infinite tail, harmonic and
 * arithmetico-geometric cousins, the special sums), counting (permutations
 * and combinations as derived counts, not memorized formulas), mathematical
 * induction as the domino principle, the binomial theorem proved (not
 * recited) for a positive integral index, the theory of equations (how many
 * roots, symmetric functions for cubics and quartics, transformation of
 * roots), and the exponential/logarithmic family defined once and for all as
 * inverse machines close the course. Every AL-banked skill is cross-
 * referenced, never re-taught; every FM/ANS anchor is cited where the ground
 * was proved. It hands off to Coordinate Geometry (graphs reunite with
 * equations), Trigonometry (the next great function family), Calculus (how
 * the output changes), and — for the counting ground — Probability.
 *
 * RESEARCH PHASE (done 2026-11-10, run 89):
 * - Reference survey: the Drive collection's MATHS subfolder carries the
 *   Cengage JEE **M2 Algebra module** (14 chapter PDFs, machine-listed this
 *   run): 01 Set Theory and the Real Number System, 02 Theory of Equations,
 *   03 Complex Numbers, 04 Principle of Mathematical Induction, 05
 *   Progression and Series, 06 Inequalities Involving Means, 07 Permutation
 *   and Combination, 08 Binomial Theorem, 09–14 Probability/Reasoning/
 *   Statistics/Determinants/Matrices (the last six belong to other shelf
 *   books — Probability, Mathematical Logic, Statistics, Linear Algebra).
 *   The module's algebra chapters map to this book's chapters 2–8. Hall &
 *   Knight's *Higher Algebra* (two Drive copies, banked run 66 as the
 *   classic stretch — 35 chapters: the progressions, quadratic theory,
 *   simultaneous equations, permutations and combinations (ch. XI),
 *   mathematical induction (ch. XII), the binomial theorem (ch. XIII), the
 *   logarithms, the theory of equations, determinants) owns the depth
 *   stretch mapped to the ends of chapters 2, 7, 8 and 9. Khattar QA 4e owns
 *   the aptitude-exam scope (logs, surds, series speed work). No downloads
 *   were needed for the research phase itself; per-unit downloads follow at
 *   authoring time.
 * - Syllabus audit (sanctioned internet fallback, web-checked 2026-11-10):
 *   (a) the NCERT school canon's senior algebra arc — class 11 (rationalized
 *   14-chapter book, 2026-27 listings) ch. 2 "Relations and Functions" (with
 *   composition, per the CBSE 2025-26 syllabus), ch. 4 "Complex Numbers and
 *   Quadratic Equations", ch. 5 "Linear Inequalities", ch. 6 "Permutations
 *   and Combinations", ch. 7 "Binomial Theorem", ch. 8 "Sequences and
 *   Series" — Principle of Mathematical Induction and Mathematical Reasoning
 *   were dropped from the rationalized textbook, an honest note this book
 *   records while keeping induction (the JEE syllabus, the classic and the
 *   module arcs all retain it) — and class 12 ch. 1 "Relations and
 *   Functions" (types of relations, one-one/onto, composition, invertible
 *   functions) — maps to chapters 1, 3, 4, 5, 6, 7;
 *   (b) the modern open-textbook structure (OpenStax College Algebra 2e:
 *   functions → polynomial and rational functions → exponential and
 *   logarithmic functions → sequences, probability and counting) — the
 *   sequencing cross-check for chapters 1, 8, 9, 10;
 *   (c) the competitive-exam scope (JEE Main 2026 mathematics syllabus,
 *   web-checked again 2026-11-10 during the full-shelf planning pass —
 *   a correction to this file's run-89 record: mathematical induction,
 *   mathematical reasoning and linear programming were REMOVED from the
 *   JEE Main syllabus in the 2024 revision (verified against multiple
 *   sources), so induction is kept via the module arc (M2 ch. 04), the
 *   classic arc (Hall & Knight ch. XII) and the school-canon history,
 *   not via the current JEE list): unit 1 sets/relations/functions with
 *   composition of functions and one-one/onto, unit 2 algebra — complex
 *   numbers and quadratic equations with modulus, Argand diagram,
 *   triangle inequality and roots-coefficients, permutations and
 *   combinations, binomial theorem for positive integral index with
 *   general and middle term and coefficient properties, sequences and
 *   series with AM/GM insertion, Sn/Sn²/Sn³ and the arithmetico-
 *   geometric progression; Khattar QA for the aptitude side) — maps to
 *   chapters 1–9 and 10;
 *   (d) the classic stretch (Hall & Knight Higher Algebra) — quadratic
 *   theory at depth, induction, permutations and combinations, the binomial
 *   theorem at any index (the positive-index case is this book's chapter 7;
 *   the any-index series belongs to the calculus doorstep), logarithms, the
 *   theory of equations — maps to the ends of chapters 2, 7, 8, 9;
 *   (e) the handoff discipline (AL 11.3's composition doorstep) — chapter 1
 *   opens exactly on composites, inverses and the domains of composites.
 */
const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis, in the house manner. First the competition craft across all the new families — the substitution game on quadratics and symmetric reads, AM–GM maxima under constraints, series sums priced by difference and telescoping, binomial term hunts, log speed reads — the advanced sequel to AL 11.2. Then the book in one page: the honest map of what was built and what was only opened, the cross-references made good, the formula family gathered. And then the doorstep itself: the infinite tail’s limit met again, the changing output measured discretely along the new families (slopes of aˣ and log taken the honest, finite way AL 10.2 priced for lines), continuity named as a promise — the handoff to Calculus, with Coordinate Geometry (graphs reunited) and Trigonometry (the next family) named as the neighbouring doors.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Algebra: the Advanced Craft',
      'Functional Equations: Building Functions from Rules',
      'The Book in One Page: Synthesis',
      'The Doorstep: Limits and the Changing Output',
    ],
  },
]

export const advancedAlgebra: Book = {
  id: 'advanced-algebra',
  title: 'Advanced Algebra',
  subtitle: 'Functions as objects — the second course',
  discipline: 'mathematics',
  level: 'Class 11–12 algebra → the doorstep of calculus',
  description:
    'The book where algebra grows up a second time. Foundation Mathematics opened the doorstep and Arithmetic and Number Systems proved the ground; Elementary Algebra opened the door and ended at the function idea. This book walks through: functions become objects — relations as sets of pairs, machines classified one-one and onto, composed in series with their honest domains, and undone by inverses. The quadratic returns as a working object — optimized, settled as inequalities on the sign diagram, mined for symmetric reads, its roots located in intervals. The extension ladder climbs its most famous rung: complex numbers built from a closure failure, carried by the field laws, and handed back to the quadratic formula so every discriminant is kept. Inequalities become the classical engine (AM–GM, Cauchy–Schwarz, the triangle inequality — proved, not recited). Sequences and series run from the constant climb to the infinite tail; counting becomes the exact science of permutations and combinations; mathematical induction certifies statements for every n at once; the binomial theorem is proved for a positive integral index and worked to its approximation power; the theory of equations counts roots, prices symmetric functions and transforms old roots into new equations; and the exponential and logarithmic family is defined once and for all as inverse machines. Cross-references Foundation Mathematics, Arithmetic and Number Systems and Elementary Algebra throughout; hands off to Coordinate Geometry, Trigonometry, Calculus and Probability.',
  status: 'in-progress',
  accent: ['#be123c', '#881337'],
  chapters,
}
