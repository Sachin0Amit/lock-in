import type { Book, Chapter } from '../../../types'

/**
 * Object-Oriented Programming — the fourteenth book of the Computer
 * Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `oop-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the language tutorials (C++,
 * Java, Python, JavaScript) own their syntax; this book owns the
 * concepts-and-craft that all of them share. The GoF/Head-First pattern
 * catalog craft lives HERE (the extraction home); Software Engineering
 * owns the process. Programming Languages and Paradigms owns the
 * theory-side comparison.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): GoF 'Design Patterns'
 *   (cs-13 — the catalog: creational/structural/behavioral, the
 *   case-study chapters) + Head-First Design Patterns 2e (cs-20 — the
 *   teaching-first pole, 14 chapters) + Core Java ch. 4-6 (objects,
 *   inheritance, interfaces — the concepts in Java) + Sebesta\u2019s OO
 *   chapters web-checked. Four sources, one concepts book.
 * - Syllabus audit: the standard OOP course arcs (concepts → inheritance
 *   → polymorphism → patterns).
 * - Exam types: university design questions (spot-the-pattern, UML-ish
 *   sketches) + predict-the-output inheritance puzzles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-object-idea',
    title: 'The Object Idea',
    summary:
      'Why the world was packaged: the procedural pain priced on a growing program (the global-state disease), objects as owners of state and behaviour (the contract — encapsulation\u2019s real reason), classes as blueprints versus objects as instances, and the message-passing view: programs as societies that talk.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Procedural Pain, Priced',
      'Objects as Owners: the Contract',
      'Message Passing: Programs as Societies',
    ],
  },
  {
    number: 2,
    slug: 'encapsulation-and-abstraction',
    title: 'Encapsulation and Abstraction',
    summary:
      'The two quiet virtues done properly: abstraction as the chosen interface (what to reveal, what to bury — the type\u2019s contract), encapsulation\u2019s mechanics (visibility levels across the language census), constructors\u2019 discipline, and invariants — the class\u2019s promises that every method must keep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Abstraction: the Chosen Interface',
      'Visibility Across the Language Census',
      'Constructors and Invariants',
    ],
  },
  {
    number: 3,
    slug: 'composition-and-inheritance',
    title: 'Composition and Inheritance',
    summary:
      'The two reuse roads: composition first (the has-a discipline and why it usually wins — the fragility of base classes priced), inheritance\u2019s is-a contract (the substitution discipline stated), the protected temptation named honestly, and the design question — which road, when, and the Liskov test.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Composition First: the Has-A Discipline',
      'Inheritance\u2019s Is-A Contract',
      'Which Road, When: the Liskov Test',
    ],
  },
  {
    number: 4,
    slug: 'polymorphism',
    title: 'Polymorphism',
    summary:
      'The behaviour that earns the whole paradigm: dynamic dispatch as the machinery (the vtable traced — how late binding actually works), overriding versus overloading (the distinction done honestly), abstract classes and interfaces as the pure contracts, and the payoff census — the open/closed discipline that polymorphism buys.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dynamic Dispatch Traced',
      'Overriding versus Overloading',
      'Abstract Classes and Interfaces',
      'The Payoff: the Open/Closed Discipline',
    ],
  },
  {
    number: 5,
    slug: 'the-static-and-runtime-shapes',
    title: 'The Static and Runtime Shapes',
    summary:
      'The machinery questions serious readers ask: static versus dynamic typing priced as the honest trade (with the compile-time/runtime contract census), generics and parametric polymorphism (the type-variable idea — collections done safely), and the reflection echo named (types as data, when that is a gift or a hazard).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Static versus Dynamic: the Honest Trade',
      'Generics: Collections Done Safely',
      'Reflection, Named',
    ],
  },
  {
    number: 6,
    slug: 'creational-patterns',
    title: 'Creational Patterns',
    summary:
      'Construction as design: why new hides decisions worth surfacing (the creation census), the factory family (Factory Method and Abstract Factory — the two-level trick priced), Builder for the many-part objects, the Singleton and its honest costs (the testability disease), and Prototype named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Factory Family',
      'Builder and the Many-Part Objects',
      'Singleton\u2019s Honest Costs',
    ],
  },
  {
    number: 7,
    slug: 'structural-patterns',
    title: 'Structural Patterns',
    summary:
      'Composition as design: Adapter as the interface translator (priced on a real legacy rescue), Decorator as the transparent layering (streams and the additive census), Composite as the tree of parts (the UI example done whole), Facade as the front-of-house, and Bridge/Proxy/Flyweight named with their one-line contracts.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Adapter: the Interface Translator',
      'Decorator: Transparent Layering',
      'Composite and Facade',
      'Bridge, Proxy and Flyweight, Named',
    ],
  },
  {
    number: 8,
    slug: 'behavioral-patterns',
    title: 'Behavioral Patterns',
    summary:
      'Interaction as design: Observer as the pub-sub discipline (the MVC engine), Strategy as the swappable policy (the family of algorithms), Command as the action-object (undo\u2019s machinery), Template Method as the fixed skeleton, and the named census — State, Iterator, Mediator, Visitor and friends with their one-line contracts.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Observer: the Pub-Sub Discipline',
      'Strategy and Command',
      'Template Method and the Named Census',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The paradigm on one page (object → contract → family → pattern with the virtues beside), the craft census (spot-the-pattern at exam level, the predict-the-output inheritance puzzles), and the doorsteps — the language books (C++/Java/Python/JavaScript) each take the craft into real syntax, and Programming Languages names the paradigm\u2019s place among its siblings.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Paradigm on One Page',
      'The Craft Census',
      'The Doorsteps: the Languages Take the Craft',
    ],
  },
]

export const objectOrientedProgramming: Book = {
  id: 'object-oriented-programming',
  title: 'Object-Oriented Programming',
  subtitle: 'Concepts and the pattern craft — the paradigm from contract to catalog',
  discipline: 'computer-science',
  level: 'First OOP course → design-pattern fluency',
  description:
    'The concepts-and-craft home of the OO paradigm (GoF and Head-First extractions as the spine). The object idea from the procedural pain; encapsulation and abstraction with visibility across the language census; composition versus inheritance with the Liskov test; polymorphism — dynamic dispatch traced, overriding versus overloading, interfaces and the open/closed payoff; the static/runtime shape questions with generics and reflection named; then the pattern catalog as craft — creational (factories, Builder, Singleton\u2019s honest costs), structural (Adapter, Decorator, Composite, Facade plus the named census), behavioral (Observer, Strategy, Command, Template Method and friends). Cross-references the language books (C++, Java, Python, JavaScript take the craft into syntax) and Programming Languages (the paradigm theory); hands off to Software Engineering\u2019s process.',
  status: 'planned',
  accent: ['#f59e0b', '#b45309'],
  chapters,
}
