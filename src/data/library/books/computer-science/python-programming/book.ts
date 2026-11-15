import type { Book, Chapter } from '../../../types'

/**
 * Python Programming — the nineteenth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `py-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Object-Oriented Programming owns
 * the OO concepts (Python\u2019s duck-typed implementation cross-referenced);
 * Data Science owns the analysis stack built ON Python; Backend
 * Engineering owns the web frameworks. This book owns the language
 * itself.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Matthes, 'Python Crash
 *   Course' 2e (cs-25 — the brief contents extracted in full: Part I
 *   chapters 1-11 + the three project parts).
 * - Web-checked 2026-11-15: the standard university/school Python arcs
 *   and the official tutorial\u2019s structure.
 * - Syllabus audit: the CBSE/university Python registers.
 * - Exam types: predict-the-output (mutable defaults, slicing, scoping) +
 *   find-the-bug (aliasing) + small-program writing.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-python-idea',
    title: 'The Python Idea',
    summary:
      'Readability priced as a design bet: the interpreter\u2019s REPL discipline (exploration as a first-class workflow), indentation as syntax, the toolchain census (pip, venv, the modern packaging honesty), and the first programs written and run both ways — script and shell.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Readability as a Design Bet',
      'The REPL Discipline',
      'The Toolchain Census',
    ],
  },
  {
    number: 2,
    slug: 'data-and-control',
    title: 'Data and Control',
    summary:
      'The vocabulary: numbers and the dynamic-type discipline (names as tags, not boxes — the mental model that prevents every later aliasing surprise), strings\u2019 rich census, the control-flow shapes (the for-else honesty, comprehensions introduced early as the idiomatic loop), and the truthiness rules stated plainly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Names as Tags: the Mental Model',
      'Strings\u2019 Rich Census',
      'Comprehensions: the Idiomatic Loop',
    ],
  },
  {
    number: 3,
    slug: 'the-data-structures-census',
    title: 'The Data Structures Census',
    summary:
      'Python\u2019s built-in spine: lists (the slicing discipline priced on real operations), tuples and unpacking, dictionaries (the key contract, insertion order, the comprehension craft), sets, and the aliasing disease demonstrated — the same list behind two names, mutated before the reader\u2019s eyes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lists and the Slicing Discipline',
      'Dictionaries and Sets: the Key Contract',
      'The Aliasing Disease Demonstrated',
    ],
  },
  {
    number: 4,
    slug: 'functions-and-modules',
    title: 'Functions and Modules',
    summary:
      'The organisation tools: functions with the argument census (default, keyword, *args/**kwargs), the mutable-default trap priced on a real bug, closures and the LEGB scoping discipline traced, modules and packages as the import system\u2019s mechanics, and the virtual-environment partnership recalled.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Argument Census',
      'The Mutable-Default Trap, Priced on a Bug',
      'LEGB Traced; Modules and Packages',
    ],
  },
  {
    number: 5,
    slug: 'objects-the-python-way',
    title: 'Objects the Python Way',
    summary:
      'Classes without ceremonies: the class statement and self\u2019s honest meaning, dunder methods as the protocol census (__init__, __repr__, __len__ — the language\u2019s contracts), inheritance\u2019s MRO discipline, dataclasses as the modern carrier, and duck typing priced against the interface question (OOP cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'self\u2019s Honest Meaning',
      'Dunder Methods: the Protocol Census',
      'The MRO and Duck Typing',
    ],
  },
  {
    number: 6,
    slug: 'errors-files-and-testing',
    title: 'Errors, Files and Testing',
    summary:
      'The robustness craft: exceptions the Python way (EAFP versus LBYL priced as a real choice), the with-statement as the resource discipline, files and the encoding honesty (the utf-8 lesson), and the testing census — pytest\u2019s assertion discipline with the test-first echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'EAFP versus LBYL',
      'The with Discipline and Encoding Honesty',
      'The Testing Census',
    ],
  },
  {
    number: 7,
    slug: 'the-modern-idiom-census',
    title: 'The Modern Idiom Census',
    summary:
      'The grown-up toolkit: iterators and generators (the yield discipline — lazy pipelines priced on a real streaming filter), the typing module and modern syntax\u2019s honesty (what hints buy, what they do not), the standard library\u2019s greatest hits (collections, itertools, pathlib), and the ecosystem\u2019s project census named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Generators: the Yield Discipline',
      'Typing\u2019s Honest Contract',
      'The Standard Library\u2019s Greatest Hits',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The language on one page (data → control → structures → functions → objects → craft with the disciplines beside), the craft census (predict-the-output mutable-default and aliasing questions, small-program writing at exam level), and the doorsteps — Data Science\u2019s analysis stack, Backend\u2019s web frameworks and the project-driven worlds.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Language on One Page',
      'The Craft Census',
      'The Doorsteps: the Stack Above',
    ],
  },
]

export const pythonProgramming: Book = {
  id: 'python-programming',
  title: 'Python Programming',
  subtitle: 'Readability as a discipline — from the REPL to the generator pipeline',
  discipline: 'computer-science',
  level: 'First Python course → idiomatic fluency',
  description:
    'The language home for Python (the Crash Course extraction plus the standard arcs). Readability as a design bet with the REPL discipline; data and control with the names-as-tags mental model and comprehensions; the built-in structures census — lists\u2019 slicing, dictionaries\u2019 key contract, the aliasing disease demonstrated; functions and modules with the mutable-default trap priced on a real bug and LEGB traced; objects the Python way — dunder protocols, the MRO, dataclasses and duck typing; errors, files and the with discipline with EAFP priced; the modern idiom census — generators\u2019 yield discipline, typing\u2019s honest contract, the standard library\u2019s greatest hits; and the synthesis map. Cross-references Object-Oriented Programming and Data Structures; hands off to Data Science\u2019s analysis stack and Backend Engineering\u2019s frameworks.',
  status: 'planned',
  accent: ['#16a34a', '#15803d'],
  chapters,
}
