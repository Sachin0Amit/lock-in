import type { Book, Chapter } from '../../../types'

/**
 * Java Programming — the eighteenth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `jav-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Object-Oriented Programming owns
 * the OO concepts (cross-referenced); this book owns the language and its
 * industrial ecosystem. The concurrency chapter prices the JVM discipline
 * (Operating Systems owns the theory); Effective Java\u2019s idioms and JCiP\u2019s
 * craft live HERE (their extraction home on the Drive).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Core Java 12e vols 1+2 (cs-10
 *   — the full vol-1 chapter-level TOC extracted), Thinking in Java 4e
 *   (cs-29 — the WHY pole), Effective Java 3e (cs-18 — items census),
 *   Java Concurrency in Practice (cs-24 — the full 16-chapter arc).
 *   Four poles, one book.
 * - Syllabus audit: the standard university Java arcs + the industrial
 *   certification registers.
 * - Exam types: predict-the-output (inheritance, generics, exceptions) +
 *   find-the-bug (equality, concurrency races).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-java-idea',
    title: 'The Java Idea',
    summary:
      'Write once, run anywhere priced honestly: the JVM\u2019s contract (bytecode, the runtime\u2019s services), the language\u2019s design bets (no pointers, GC, single inheritance with interfaces — each priced on the problem it solved), the platform census (language, JVM, ecosystem), and the first program written with the toolchain.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The JVM\u2019s Contract',
      'The Design Bets Priced',
      'The First Program and the Toolchain',
    ],
  },
  {
    number: 2,
    slug: 'fundamental-structures',
    title: 'The Fundamental Structures',
    summary:
      'The language\u2019s vocabulary: types (primitives versus references — the two worlds that explain every later surprise), operators and control flow (familiar ground, priced where Java differs), strings\u2019 immutability discipline, arrays, and the varargs/input-output census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Primitives versus References: the Two Worlds',
      'Strings\u2019 Immutability Discipline',
      'Arrays and the IO Census',
    ],
  },
  {
    number: 3,
    slug: 'objects-and-classes',
    title: 'Objects and Classes',
    summary:
      'The paradigm implemented: classes and the constructor census (static factories named from Effective Java), encapsulation\u2019s mechanics, the Object contract (equals and hashCode PROVED inseparable — the bug priced), records as the data carrier\u2019s honest answer, and packages/JAR as the organization census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Constructor Census',
      'equals and hashCode, Proved Inseparable',
      'Records and the Package Census',
    ],
  },
  {
    number: 4,
    slug: 'inheritance-interfaces-generics',
    title: 'Inheritance, Interfaces, Generics',
    summary:
      'The type machinery: inheritance and super (the constructor chain traced), abstract classes versus interfaces (and the default-method evolution), the equals/toString inheritance craft, generics\u2019 honest story (type erasure priced — what the compiler checks, what the JVM forgets), and the collections census with the streaming echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Constructor Chain Traced',
      'Interfaces and Default Methods',
      'Generics: the Type-Erasure Honesty',
    ],
  },
  {
    number: 5,
    slug: 'exceptions-and-io',
    title: 'Exceptions, IO and Annotations',
    summary:
      'The robustness machinery: the exception hierarchy (checked versus unchecked — the design debate priced both ways), try-with-resources as RAII\u2019s Java accent, the modern IO census (the stream/NIO discipline), and annotations as metadata-driven programming (how the ecosystem actually wires itself).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Checked versus Unchecked, Priced',
      'try-with-resources and the IO Census',
      'Annotations: the Wiring Layer',
    ],
  },
  {
    number: 6,
    slug: 'the-collections-and-streams',
    title: 'The Collections and Streams',
    summary:
      'The standard library\u2019s spine: the collections census (List/Set/Map implementations with their cost tables — Data Structures cross-referenced), iterators and the fail-fast discipline, streams as declarative data pipelines (map/filter/collect priced against the loop), and the Optional discipline named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Collections Census with Costs',
      'Streams: Declarative Pipelines',
      'Optional, Named Honestly',
    ],
  },
  {
    number: 7,
    slug: 'concurrency-the-jvm-craft',
    title: 'Concurrency: the JVM Craft',
    summary:
      'The JCiP arc: what thread-safety means (the atomicity/visibility lesson priced on a broken counter), synchronization\u2019s mechanics (locks, the memory model\u2019s happens-before stated honestly), immutability and safe publication as the design escapes, the Executor framework\u2019s task discipline, and the concurrent collections census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Atomicity/Visibility Lesson',
      'The Memory Model\u2019s Happens-Before',
      'Immutability and Safe Publication',
      'Executors and the Concurrent Census',
    ],
  },
  {
    number: 8,
    slug: 'the-effective-craft',
    title: 'The Effective Craft',
    summary:
      'The idioms that mark a professional: the creation idioms (static factories, builders), the equals/hashCode/compareTo craft deepened, the immutability playbook, the common pitfalls census (the objects-when-maybe-null question, defensive copies), and the ecosystem tour — the build tools and the test discipline named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Creation Idioms',
      'The Immutability Playbook',
      'The Pitfalls Census and the Ecosystem',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The platform on one page (types → objects → type machinery → library → concurrency with the disciplines beside), the craft census (predict-the-output generics/exception questions, find-the-bug equality and race questions at exam level), and the doorsteps — Backend Engineering\u2019s Spring ecosystem and the JVM\u2019s modern language family named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Platform on One Page',
      'The Craft Census',
      'The Doorsteps: the Server Ecosystem',
    ],
  },
]

export const javaProgramming: Book = {
  id: 'java-programming',
  title: 'Java Programming',
  subtitle: 'The platform that runs the enterprise — from the JVM contract to the concurrency craft',
  discipline: 'computer-science',
  level: 'First Java course → industrial Java fluency',
  description:
    'The four-pole Java home (Core Java\u2019s reference arc, Thinking in Java\u2019s WHY pole, Effective Java\u2019s idioms, Java Concurrency in Practice\u2019s craft — all Drive-extracted). The JVM\u2019s contract and the design bets priced; the fundamental structures with the primitives/references two-worlds lesson; objects — equals/hashCode PROVED inseparable and records; the type machinery — inheritance, interfaces, generics\u2019 type-erasure honesty; exceptions, IO and the annotation wiring layer; the collections and streams census; concurrency — atomicity/visibility priced on a broken counter, the memory model\u2019s happens-before, immutability\u2019s escapes, executors; and the effective-idiom close. Cross-references Object-Oriented Programming (concepts), Operating Systems (concurrency theory) and Data Structures; hands off to Backend Engineering\u2019s server ecosystem.',
  status: 'planned',
  accent: ['#ea580c', '#c2410c'],
  chapters,
}
