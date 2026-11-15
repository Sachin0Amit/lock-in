import type { Book, Chapter } from '../../../types'

/**
 * Programming Languages and Paradigms — the fifteenth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `plp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the language books (C, C++, Java,
 * Python, JavaScript) own the syntaxes; this book owns WHY languages differ
 * — the concepts. Compiler Design owns the implementation of these ideas;
 * Object-Oriented Programming owns the OO deep-dive (cross-referenced);
 * the Mathematics shelf's Mathematical Logic owns the lambda calculus'
 * logical roots.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Sebesta's OO/exception/
 *   concurrency chapters contribute via the Java family extractions.
 * - Web-checked 2026-11-15: Sebesta, 'Concepts of Programming Languages'
 *   12e (mirrored PDF — Preliminaries; Evolution; Describing Syntax and
 *   Semantics; Names/Bindings/Scopes; Data Types; Expressions; Control;
 *   Subprograms; ADTs; Exceptions; Concurrency; the functional and logic
 *   families). The classic concepts arc.
 * - Syllabus audit: the standard university PLC course arcs.
 * - Exam types: university concept questions (binding time, scope rules,
 *   parameter modes) + small interpreter sketches.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the Cambridge 9618 §11/13 lines audited — two planned lessons added (user-defined types, structured programming). The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'why-languages-differ',
    title: 'Why Languages Differ',
    summary:
      'The field\u2019s honest question: why are there so many, and why do they keep changing? The evaluation criteria (readability, writability, reliability — each priced on real snippets), the design tradeoffs census, the evolution story from Fortran and Lisp to today, and the two description tools every later chapter uses: grammars and semantics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Evaluation Criteria Priced',
      'The Evolution Story',
      'Describing Syntax and Semantics',
    ],
  },
  {
    number: 2,
    slug: 'names-bindings-scopes',
    title: 'Names, Bindings and Scopes',
    summary:
      'The identifier\u2019s machinery: binding as the central concept (times named — language design, program translation, runtime), the scope disciplines (static versus dynamic priced on the same program run both ways), lifetime and the storage census, and referencing environments traced honestly through nested calls.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Binding and Its Times',
      'Static versus Dynamic Scope',
      'Lifetime and the Storage Census',
    ],
  },
  {
    number: 3,
    slug: 'types-and-expressions',
    title: 'Types and Expressions',
    summary:
      'What values may be: the type census (primitives, enumerations, arrays, records, unions — each with its honest design question), the scalar and composite families with the user-defined types the school syllabi name (records, unions and enumerations declared — identifiers, assignment, constants and variables as the binding vocabulary), type checking and the strong/weak axis, the coercion disease priced on a real bug, and expressions\u2019 evaluation (precedence, associativity, side effects, short-circuit as a design choice).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Type Census and Its Design Questions',
      'User-Defined Types: Records, Unions, Enumerations',
      'Coercion: the Disease Priced on a Bug',
      'Expression Evaluation and Order Discipline',
    ],
  },
  {
    number: 4,
    slug: 'control-and-subprograms',
    title: 'Control and Subprograms',
    summary:
      'The flow of work: the control census (selection, loops, the guarded-command echo) with structured programming\u2019s discipline named (single-entry/single-exit — the school-canon craft that preceded objects), subprograms as the primary abstraction (parameter modes — value, reference, result priced on aliasing), activation records cross-referenced to Compiler Design\u2019s runtime chapter, and closures — functions that remember, the concept that powers the modern era.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Control Census',
      'Structured Programming: the Single-Entry Discipline',
      'Parameter Modes and Aliasing',
      'Closures: Functions That Remember',
    ],
  },
  {
    number: 5,
    slug: 'abstraction-and-exceptions',
    title: 'Abstraction and Exceptions',
    summary:
      'Growing the abstraction ladder: abstract data types as the encapsulation contract (OOP cross-referenced as the industrial answer), the exception discipline (handlers, propagation, the finally question — design choices compared across languages), and the concurrency primitives census (threads and synchronization as language features, with Java\u2019s synchronized as the case).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Abstract Data Types as Contract',
      'The Exception Discipline Compared',
      'Concurrency as a Language Feature',
    ],
  },
  {
    number: 6,
    slug: 'the-functional-family',
    title: 'The Functional Family',
    summary:
      'The evaluation-everything paradigm: the lambda calculus named as the root (with the Mathematics shelf\u2019s logical roots cross-referenced), first-class functions and the higher-order craft, recursion as the loop replacement, laziness and purity priced (what they buy, what they cost), and the family census — Lisp, ML, Haskell compared honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lambda Calculus, Named',
      'Higher-Order Craft and Recursion',
      'Laziness and Purity Priced',
    ],
  },
  {
    number: 7,
    slug: 'the-logic-and-scripting-families',
    title: 'The Logic and Scripting Families',
    summary:
      'The other poles: logic programming as declarative computation (Prolog\u2019s unification and resolution traced on a small database — facts, rules, queries), the scripting family\u2019s design bets (dynamic typing, glue, rapid feedback priced honestly), and the modern census — where multi-paradigm languages took the field.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Prolog: Unification Traced',
      'The Scripting Bets',
      'The Multi-Paradigm Census',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The concepts map on one page (names, types, control, abstraction, families — with the binding-time spine through them all), the craft census (scope/type/parameter questions at exam level), and the doorsteps — every language book on the shelf is one of these concepts made real, and Compiler Design builds the machinery that implements them.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concepts Map with the Binding Spine',
      'The Craft Census',
      'The Doorsteps: Concepts Made Real',
    ],
  },
]

export const programmingLanguagesParadigms: Book = {
  id: 'programming-languages-paradigms',
  title: 'Programming Languages and Paradigms',
  subtitle: 'Why languages differ — the concepts beneath every syntax on the shelf',
  discipline: 'computer-science',
  level: 'First programming-languages course → multi-paradigm fluency',
  description:
    'The concepts home on the Sebesta arc. Why languages differ — the evaluation criteria priced on real snippets and the evolution story; names, bindings and scopes with static versus dynamic scope run on one program; types with the coercion disease priced on a real bug; control and subprograms — parameter modes, aliasing, closures as the modern era\u2019s engine; abstraction and exceptions compared across languages; the functional family from the lambda calculus through laziness and purity priced; the logic and scripting poles with Prolog\u2019s unification traced; and the concepts map with the binding-time spine. Cross-references Object-Oriented Programming, the language books and Compiler Design\u2019s implementation machinery.',
  status: 'planned',
  accent: ['#64748b', '#475569'],
  chapters,
}
