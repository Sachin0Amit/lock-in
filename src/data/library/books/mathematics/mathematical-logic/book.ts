import type { Book, Chapter } from '../../../types'

/**
 * Mathematical Logic — the sixteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 7 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `ml-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf has reasoned since
 * Geometry's first proof; THIS book makes reasoning itself the subject.
 * The doorstep is the NCERT class 11 'Mathematical Reasoning' chapter
 * the rationalized textbook dropped and the Drive's M2 module carries
 * (ch. 10 — compound statements, connectives, truth tables, converse/
 * inverse/contrapositive, tautology, the algebra of statements): banked
 * as chapter 1, then far surpassed. Discrete Mathematics carries the
 * working logic toolkit (cross-referenced); Boolean circuits belong
 * there too. Here: equivalence and normal forms, the quantifiers, the
 * proof-method census the whole shelf used, soundness/completeness
 * stated honestly, and computability with Gödel's incompleteness
 * theorems — the famous results presented carefully and attributed
 * accurately. It hands off to the computer-science shelf (Theory of
 * Computation) and to the philosophy of mathematics.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   module's ch. 10 'Mathematical Reasoning' (TOC extracted this pass —
 *   compound statements and basic connectives, truth tables of AND/OR,
 *   conditional and biconditional statements, logical equivalence,
 *   converse/inverse/contrapositive, tautology and contradiction, the
 *   algebra of statements) maps to chapter 1. Rosen 8e's ch. 1 (The
 *   Foundations: Logic and Proofs — propositional logic, applications,
 *   propositional equivalences, predicates and quantifiers, nested
 *   quantifiers, rules of inference, introduction to proofs, proof
 *   methods and strategy) maps to chapters 2–4; Rosen ch. 13 (Modeling
 *   Computation) is the computability chapter's cross-reference.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 11's
 *   'Mathematical Reasoning' was dropped in the 2023 rationalization
 *   and JEE Main removed Mathematical Reasoning in its 2024 revision
 *   (multiple sources) — an honest competitive-scope note this book
 *   records: its exam anchors are university logic (L5) and the
 *   philosophy/CS continuations, not the current JEE list.
 * - Classic arcs web-checked (2026-11-10): the soundness and
 *   completeness of first-order logic (Gödel 1929/1930), the
 *   incompleteness theorems (Gödel 1931), Turing machines (Turing 1936,
 *   the Entscheidungsproblem's negative answer), the halting problem's
 *   undecidability — dates and attributions verified for the book's
 *   history sections.
 * - Exam types: university-course problems (L5); the M2 ch. 10
 *   typology (Single Correct Answer type only — a small chapter,
 *   honestly noted) covers the school doorstep.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'statements-and-connectives',
    title: 'Statements and Connectives',
    summary:
      'The dropped chapter, restored: what a mathematical statement is, the compound-statement discipline, the connectives (AND, OR, NOT, conditional, biconditional), truth tables as the honest census, converse/inverse/contrapositive, logical equivalence met by table, tautology and contradiction, and the algebra of statements — the NCERT class 11 arc the rationalized textbook dropped, banked exactly where the shelf needs it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Statements: the Raw Material',
      'The Connectives and Their Tables',
      'Conditional, Biconditional and the Contrapositive',
      'Tautology, Contradiction and the Algebra of Statements',
    ],
  },
  {
    number: 2,
    slug: 'equivalence-and-normal-forms',
    title: 'Equivalence and Normal Forms',
    summary:
      'Equivalence made systematic: the standard equivalence laws (De Morgan, distribution, implication\u2019s disjunctive reading), the craft of proving equivalences by law rather than by table, normal forms (DNF, CNF) as canonical shapes, the satisfiability question named forward to its computational career (the CS shelf\u2019s complexity ground), and the functionally-complete sets of connectives.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equivalence Laws',
      'Normal Forms: DNF and CNF',
      'Completeness of the Connectives',
    ],
  },
  {
    number: 3,
    slug: 'quantifiers',
    title: 'The Quantifiers',
    summary:
      'From sentences to predicates: variables and truth-sets, the universal and existential quantifiers, the order-of-quantifiers discipline (the classic ∃∀ versus ∀∃ trap priced on finite censuses), negation rules (De Morgan for quantifiers — the law every book on the shelf used silently), translations between mathematical English and symbols, and the multi-quantifier patterns analysis lives on (∀ε∃δ met as an old friend from Differential Calculus). Nested quantifiers — the cascades and their reversal discipline — priced with their order-of-binding traps.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Predicates and Truth-Sets',
      'The Two Quantifiers and Their Order',
      'Negation and Translation',
    ],
  },
  {
    number: 4,
    slug: 'proof-the-methods',
    title: 'Proof: the Methods',
    summary:
      'The craft every derivation on the shelf used, now the curriculum: rules of inference (modus ponens and its family, valid vs invalid argument forms caught by truth-table census), the proof-method census — direct, contrapositive, contradiction, cases, constructive and non-constructive existence (√2\u2019s irrationality and the classic pair-of-irrationals theorem worked both ways), and proof strategy (Rosen\u2019s lesson: how to choose the weapon).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rules of Inference',
      'Direct, Contrapositive, Contradiction, Cases',
      'Existence: Constructive and Not',
      'Strategy: Choosing the Weapon',
    ],
  },
  {
    number: 5,
    slug: 'formal-theories-and-validity',
    title: 'Formal Theories and Validity',
    summary:
      'Logic about logic: formal deduction (a natural-deduction system light enough to master in a week), logical consequence versus derivability, and the two great properties — soundness (provable implies true) proved, completeness (true implies provable) stated with its history (G\u00f6del\u2019s 1929/1930 theorem, verified) — the compactness theorem named with its startling consequences.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Structures, Satisfaction and Models',
      'A Formal Deduction System',
      'Soundness, Proved',
      'Completeness and Compactness, Honestly',
    ],
  },
  {
    number: 6,
    slug: 'computability-and-godel',
    title: 'Computability and Gödel',
    summary:
      'The ceiling chapter: computable functions and Turing machines (the 1936 model, the Entscheidungsproblem\u2019s negative answer — verified history), the halting problem\u2019s undecidability proved by the diagonal method (Set Theory\u2019s engine returning), recursive functions and the Church\u2013Turing thesis, and the incompleteness theorems presented carefully — arithmetic\u2019s own truth outrunning its proof, with the second theorem\u2019s meaning stated honestly rather than sensationalized.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Recursive Functions and Church\u2019s Thesis',
      'Turing Machines',
      'The Halting Problem',
      'The Incompleteness Theorems',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the reasoning map (one page from statements to incompleteness), the craft census (equivalence cascades, quantifier traps, the invalid-argument gallery), and the doorsteps named — the foundations question (logicism/formalism/intuitionism sketched honestly, the Set Theory book\u2019s ZFC chapter as the companion) and the computational road (the CS shelf\u2019s Theory of Computation, with Boolean circuits cross-referenced to Discrete Mathematics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reasoning Map',
      'The Craft Census',
      'The Doorsteps: Foundations and Computation',
    ],
  },
]

export const mathematicalLogic: Book = {
  id: 'mathematical-logic',
  title: 'Mathematical Logic',
  subtitle: 'Reasoning itself as the subject — from truth tables to Gödel',
  discipline: 'mathematics',
  level: 'Class 11 doorstep restored \u2192 university logic and computability',
  description:
    'The book where the shelf\u2019s own instrument becomes the curriculum. The dropped NCERT Mathematical Reasoning chapter restored as the doorstep (statements, connectives, truth tables, contrapositives); equivalence made lawful with normal forms and complete connective sets; the quantifiers with the order discipline and the ∀ε∃δ patterns analysis lives on; the proof-method census (direct, contrapositive, contradiction, cases, existence constructions) — the craft every earlier book used, now taught as subject matter; formal deduction with soundness proved and completeness stated with its verified history; and the ceiling — Turing machines, the halting problem, and Gödel\u2019s incompleteness theorems presented carefully and attributed accurately. Cross-references Discrete Mathematics, Set Theory and the calculus books; hands off to the computer-science shelf and the philosophy of mathematics.',
  status: 'planned',
  accent: ['#52525b', '#3f3f46'],
  chapters,
}
