import type { Book, Chapter } from '../../../types'

/**
 * C Programming — the sixteenth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `cprog-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): CS:APP (Computer Organization)
 * owns the deep machine view of C\u2019s runtime; this book owns the language
 * itself. The pointer/memory theory prices directly into Data Structures;
 * the UNIX interface chapter hands off to Operating Systems\u2019 practice
 * pole. C++ Programming owns the superset story.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): CS:APP\u2019s C chapters
 *   (representations, machine-level programming) as the machine-view
 *   cross-reference.
 * - Web-checked 2026-11-15: Kernighan & Ritchie, 'The C Programming
 *   Language' 2e — the canonical 8-chapter TOC (Tutorial Introduction;
 *   Types, Operators and Expressions; Control Flow; Functions and Program
 *   Structure; Pointers and Arrays; Structures; Input and Output; The
 *   UNIX System Interface).
 * - Syllabus audit: the standard university C course arcs + GATE
 *   recursion/pointer questions.
 * - Exam types: predict-the-output pointer arithmetic + GATE MCQs.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-tutorial-introduction',
    title: 'The Tutorial Introduction',
    summary:
      'K&R\u2019s own opening discipline: the smallest complete program, variables and arithmetic, the for loop\u2019s economy, symbolic constants, character I/O (getchar/putchar counted honestly), arrays of characters, and the function census — the language learned by reading real programs from the first page.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Smallest Complete Program',
      'Character I/O, Counted Honestly',
      'The Function Census',
    ],
  },
  {
    number: 2,
    slug: 'types-operators-expressions',
    title: 'Types, Operators and Expressions',
    summary:
      'The vocabulary of values: the type census (int\u2019s sizes, char, float and double with their honest precision limits), the operator families with precedence and associativity learned as a discipline, the increment/decrement craft, bitwise operators priced on masks, and the conversion rules including the signed/unsigned trap.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Type Census and Its Limits',
      'Precedence as a Discipline',
      'Bitwise Operators Priced on Masks',
    ],
  },
  {
    number: 3,
    slug: 'control-flow-and-functions',
    title: 'Control Flow and Functions',
    summary:
      'The flow of the language: the statement census (if-else chains, switch\u2019s fall-through honesty, loops, break/continue/goto priced), functions with the prototype discipline (C\u2019s single-pass heritage), recursion traced on the classic examples, and program structure — separate compilation, headers and the preprocessor\u2019s real job.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Statement Census',
      'Recursion Traced',
      'Separate Compilation and the Preprocessor',
    ],
  },
  {
    number: 4,
    slug: 'pointers-and-arrays',
    title: 'Pointers and Arrays',
    summary:
      'The chapter that makes C, C: pointers as addresses owned honestly (& and *, the NULL discipline), arrays and the address arithmetic (why a[i] IS *(a+i) — derived, not asserted), pointers to pointers and the argv census, dynamic allocation (malloc/free with the leak and dangling diseases priced), and function pointers as the callback engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Pointers as Addresses, Owned Honestly',
      'Why a[i] Is *(a+i), Derived',
      'Dynamic Allocation\u2019s Diseases',
      'Function Pointers: the Callback Engine',
    ],
  },
  {
    number: 5,
    slug: 'structures-and-advanced-data',
    title: 'Structures and Advanced Data',
    summary:
      'User-made shapes: structures (declaration, member access, the assignment discipline), structures and functions (by value versus by pointer), arrays of structures and the sorting craft, the self-referential structure (linked lists built by hand — the Data Structures cross-reference), typedef and unions, and the bit-field census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Structures and Their Functions',
      'Self-Referential Structures: Lists by Hand',
      'typedef, Unions and Bit-Fields',
    ],
  },
  {
    number: 6,
    slug: 'input-and-output',
    title: 'Input and Output',
    summary:
      'The standard library\u2019s doors: printf/scanf\u2019s format discipline (the format-string census with its % pitfalls), the FILE abstraction and the stdio stream model (buffers explained — the CS:APP cross-reference), formatted and unformatted I/O, the error census (errno, perror), and the command-line argument contract.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Format-String Census',
      'The FILE Abstraction and Buffers',
      'Errors and errno',
    ],
  },
  {
    number: 7,
    slug: 'the-unix-system-interface',
    title: 'The UNIX System Interface',
    summary:
      'K&R\u2019s closing door into the machine: file descriptors and the low-level I/O trio (open/read/write), the directory and inode census, the process discipline (fork/exec — Operating Systems\u2019 practice pole cross-referenced), and the honest warning: this chapter is where C stops being portable and becomes UNIX.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'File Descriptors and the Low-Level Trio',
      'The Directory and Inode Census',
      'Where C Becomes UNIX',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The language on one page (types → control → pointers → structures → I/O → system with the disciplines beside), the craft census (pointer arithmetic, self-referential structures, format strings at exam level), and the doorsteps — Data Structures builds the classic machines here, C++ adds the OO layer, Operating Systems takes the system interface.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Language on One Page',
      'The Craft Census',
      'The Doorsteps: Structures, C++, the System',
    ],
  },
]

export const cProgramming: Book = {
  id: 'c-programming',
  title: 'C Programming',
  subtitle: 'The language that trusts you — types, pointers and the machine\u2019s door',
  discipline: 'computer-science',
  level: 'First C course → system-interface readiness',
  description:
    'The K&R arc on the shelf. The tutorial introduction\u2019s read-real-programs discipline; types, operators and precedence learned as a discipline with bitwise masks priced; control flow, recursion traced and separate compilation with the preprocessor\u2019s real job; pointers and arrays — why a[i] IS *(a+i) derived, malloc/free with the leak and dangling diseases, function pointers as the callback engine; structures with self-referential lists built by hand; the stdio doors with the format-string census; and K&R\u2019s closing UNIX system interface (file descriptors, fork/exec). Cross-references Data Structures (the machines built here), CS:APP\u2019s machine view and Operating Systems\u2019 practice pole; hands off to C++ Programming\u2019s superset story.',
  status: 'planned',
  accent: ['#1e293b', '#0f172a'],
  chapters,
}
