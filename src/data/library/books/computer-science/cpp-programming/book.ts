import type { Book, Chapter } from '../../../types'

/**
 * C++ Programming — the seventeenth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `cpp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Object-Oriented Programming owns
 * the OO concepts and pattern craft (cross-referenced); this book owns the
 * language. C Programming owns the C subset (its chapters are assumed and
 * cited, not re-taught); the STL\u2019s data structures cross-reference Data
 * Structures; templates\u2019 theory echoes Programming Languages\u2019 generics.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Lippman/Lajoie/Moo, 'C++
 *   Primer' 5e (cs-05 — the full chapter-level TOC extracted: types,
 *   strings/vectors/iterators, expressions, statements, functions,
 *   classes, IO library, sequential containers, generic algorithms,
 *   associative containers, dynamic memory, copy control, inheritance,
 *   templates and the large-program tools) + Stroustrup, 'A Tour of C++'
 *   2e (cs-01 — the 16-chapter tour contents extracted: basics, UDTs,
 *   modularity, classes, essential operations, templates, concepts, the
 *   standard library).
 * - Syllabus audit: the standard university C++ course arcs.
 * - Exam types: predict-the-output (inheritance, templates, RAII) +
 *   find-the-bug (dangling references, iterator invalidation).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-c-subset-assumed',
    title: 'The C Subset, Assumed',
    summary:
      'The honest start: C++ begins as C (types, operators, control — the C Programming book\u2019s chapters cited, not re-taught), then the first differences priced — the iostream hello, the reference type, function overloading and namespaces, and Stroustrup\u2019s own tour discipline: learn the language\u2019s shape before its depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The First Differences Priced',
      'References and Overloading',
      'The Tour Discipline',
    ],
  },
  {
    number: 2,
    slug: 'objects-and-classes',
    title: 'Objects and Classes',
    summary:
      'The class machinery: member functions and access control (the encapsulation contract from OOP implemented), constructors\u2019 census (default, copy, delegating), the destructor and the lifecycle discipline, static members, const-correctness as an engineering habit, and friend named with its honest cost.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Class Machinery',
      'Constructors and the Lifecycle',
      'Const-Correctness as a Habit',
    ],
  },
  {
    number: 3,
    slug: 'resources-and-raii',
    title: 'Resources and RAII',
    summary:
      'The craft that makes C++ safe: RAII as the owning-object discipline (acquisition in the constructor, release in the destructor — traced through a file and a lock), copy control (the copy constructor/assignment pair, the rule of three and five), move semantics as the transfer of ownership (rvalue references priced on vector growth), and smart pointers as the RAII census (unique_ptr, shared_ptr, the cycle disease).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'RAII: the Owning-Object Discipline',
      'Copy Control and the Rule of Five',
      'Move Semantics: Transferring Ownership',
      'Smart Pointers and the Cycle Disease',
    ],
  },
  {
    number: 4,
    slug: 'inheritance-and-polymorphism',
    title: 'Inheritance and Polymorphism',
    summary:
      'The virtual world: base and derived with the protected question, virtual functions and the override discipline (the vptr machinery traced — OOP\u2019s dispatch chapter made concrete), abstract classes via pure virtual, the slicing trap priced on a real bug, and the destructor\u2019s virtual duty — the bug every C++ interview asks.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Virtual Functions and override',
      'The Slicing Trap, Priced on a Bug',
      'The Virtual Destructor Duty',
    ],
  },
  {
    number: 5,
    slug: 'templates-and-generic-code',
    title: 'Templates and Generic Code',
    summary:
      'The compile-time machine: function templates (type parameters priced on a swap and a max), class templates (a container written whole), the two-phase compilation\u2019s honesty, concepts named (the C++20 discipline that tames template errors), and the compilation model\u2019s practical craft — where definitions live.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Function Templates Priced',
      'A Container Written Whole',
      'Concepts, Named',
    ],
  },
  {
    number: 6,
    slug: 'the-standard-library',
    title: 'The Standard Library',
    summary:
      'The professionals\u2019 toolkit: the container census (vector, string, map/set and their cost tables — the Data Structures cross-reference), iterators as the glue algebra, the algorithm census (sort, find, transform — the algorithm/lambda pairing), and chrono/filesystem named — the modern utility census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Container Census with Costs',
      'Iterators as the Glue Algebra',
      'Algorithms and Lambdas Paired',
    ],
  },
  {
    number: 7,
    slug: 'error-handling-and-modularity',
    title: 'Error Handling and Modularity',
    summary:
      'The grown-up questions: exceptions (throw/try/catch with the stack-unwinding discipline and RAII\u2019s rescue role — the noexcept question priced), namespaces and separate compilation (the ODR named), and the program-organization craft that Primer\u2019s large-program chapters teach.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Exceptions and Stack Unwinding',
      'The ODR and Separate Compilation',
      'Organising Large Programs',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The language on one page (C subset → classes → RAII → templates → the library with the disciplines beside), the craft census (predict-the-output inheritance and template questions, find-the-bug ownership bugs at exam level), and the doorsteps — Object-Oriented Programming\u2019s pattern catalog rides these mechanics, and the modern era (concurrency, the C++20/23 census) named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Language on One Page',
      'The Craft Census',
      'The Doorsteps: Patterns and the Modern Census',
    ],
  },
]

export const cppProgramming: Book = {
  id: 'cpp-programming',
  title: 'C++ Programming',
  subtitle: 'The language that owns everything — from the C subset to the template machine',
  discipline: 'computer-science',
  level: 'First C++ course → modern-C++ (RAII, moves, concepts) fluency',
  description:
    'The two-pole C++ home (Primer\u2019s reference grammar, Stroustrup\u2019s tour). The C subset assumed and the first differences priced; the class machinery with constructors and const-correctness; RAII — the owning-object discipline with copy control\u2019s rule of five, move semantics as ownership transfer and the smart-pointer census with the cycle disease; inheritance and polymorphism with the vptr traced, the slicing trap priced and the virtual destructor duty; templates — functions priced, a container written whole, concepts named; the standard library\u2019s container/iterator/algorithm census with cost tables; exceptions with stack unwinding and the ODR; and the synthesis map. Cross-references C Programming (the subset), Object-Oriented Programming (the concepts) and Data Structures (the structures the STL ships).',
  status: 'planned',
  accent: ['#1e40af', '#1e3a8a'],
  chapters,
}
