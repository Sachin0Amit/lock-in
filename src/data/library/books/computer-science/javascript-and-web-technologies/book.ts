import type { Book, Chapter } from '../../../types'

/**
 * JavaScript and Web Technologies — the twentieth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `js-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Frontend Engineering owns the
 * browser-and-framework engineering (this book owns the language and the
 * web\u2019s core technologies); Backend Engineering owns the server side;
 * Programming Languages owns the paradigms-theory view of JS\u2019s prototype
 * model (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Flanagan, 'JavaScript:
 *   the Definitive Guide' 7e (cs-17 — the chapter-level contents
 *   extracted: lexical structure, types/values/variables, objects,
 *   arrays, functions, classes, modules, the standard library,
 *   iterators/generators, async, metaprogramming, the browser host).
 * - Web-checked 2026-11-15: the HTML/CSS core arcs (the MDN-derived
 *   standard course structure).
 * - Exam types: predict-the-output (coercion, closures, this) +
 *   find-the-bug (equality, hoisting, async races).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-language-of-the-web',
    title: 'The Language of the Web',
    summary:
      'How the web actually delivers code: the browser as the host (the document/JavaScript/DOM trio), the script-loading discipline, the first programs run in the console, and the language\u2019s honest character — the good parts and the traps named before they bite.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Browser as Host',
      'The First Programs and the Console',
      'The Character, Honestly',
    ],
  },
  {
    number: 2,
    slug: 'values-operators-and-coercion',
    title: 'Values, Operators and Coercion',
    summary:
      'The type census: the primitive family (numbers\u2019 single double reality, strings, booleans, null/undefined\u2019s split), the coercion discipline priced on the == versus === question (the equality table read honestly), truthiness, and the symbol\u2019s named role.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Primitive Family',
      '== versus ===: the Coercion Table',
      'null, undefined and Truthiness',
    ],
  },
  {
    number: 3,
    slug: 'objects-and-the-prototype-model',
    title: 'Objects and the Prototype Model',
    summary:
      'JavaScript\u2019s own OOP: objects as property bags with the reference discipline (the aliasing echo), the prototype chain traced (delegation instead of classes — Programming Languages\u2019 cross-reference), the class syntax\u2019s honest position as syntax over prototypes, and the this-binding question priced on call sites.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prototype Chain Traced',
      'class as Syntax over Delegation',
      'this, Priced on Call Sites',
    ],
  },
  {
    number: 4,
    slug: 'functions-closures-and-scope',
    title: 'Functions, Closures and Scope',
    summary:
      'The functional engine: functions as first-class values, closures as the remembering discipline (the counter factory traced), hoisting and the scope family (var versus let/const — the historical honesty), arrow functions\u2019 lexical this, and higher-order craft with the array trio map/filter/reduce priced on real pipelines.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Closures: the Remembering Discipline',
      'The Scope Family and Hoisting',
      'map, filter, reduce Priced',
    ],
  },
  {
    number: 5,
    slug: 'asynchronous-javascript',
    title: 'Asynchronous JavaScript',
    summary:
      'The web\u2019s timing reality: the event loop traced honestly (the call stack, the queues, why setTimeout(0) is never immediate), callbacks and the error-first convention, promises as the eventual-value contract (chaining and composition), async/await as the readable front, and fetch as the network citizen.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Event Loop Traced',
      'Promises as Eventual Values',
      'async/await and fetch',
    ],
  },
  {
    number: 6,
    slug: 'the-web-core-technologies',
    title: 'The Web Core Technologies',
    summary:
      'The platform\u2019s other citizens: HTML\u2019s document discipline (the semantic census — what elements mean, not what they look like), CSS\u2019s model (the cascade and specificity priced on a real conflict, the box model, layout\u2019s modern census flex/grid), and the DOM as the live tree queried and mutated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'HTML\u2019s Semantic Census',
      'CSS: the Cascade Priced',
      'The DOM as the Live Tree',
    ],
  },
  {
    number: 7,
    slug: 'modules-tooling-and-the-ecosystem',
    title: 'Modules, Tooling and the Ecosystem',
    summary:
      'The industrial reality: modules\u2019 two eras (the ESM discipline and the legacy named), the runtime census (Node as the language\u2019s escape from the browser — Backend\u2019s doorstep), the build-tool census\u2019s honest purpose (bundling and transpilation named), and the package ecosystem\u2019s discipline (npm\u2019s contract).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Modules: the Two Eras',
      'Node and the Runtimes Census',
      'The Package Discipline',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The platform on one page (values → objects → functions → async → the web core with the disciplines beside), the craft census (coercion/closure/this predict-the-output questions at interview level), and the doorsteps — Frontend Engineering builds the component era on this ground, Backend takes the runtime across the server line.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Platform on One Page',
      'The Craft Census',
      'The Doorsteps: the Component Era',
    ],
  },
]

export const javascriptAndWebTechnologies: Book = {
  id: 'javascript-and-web-technologies',
  title: 'JavaScript and Web Technologies',
  subtitle: 'The web\u2019s own language — from the event loop to the document tree',
  discipline: 'computer-science',
  level: 'First serious JavaScript course → the component-era doorstep',
  description:
    'The Flanagan-arc language home for the web. The browser as host and the language\u2019s honest character; the primitive family with the == versus === coercion table; the prototype chain traced (delegation before classes) with this priced on call sites; closures as the remembering discipline, the scope family and the map/filter/reduce craft; the event loop traced with promises and async/await; the web core — HTML\u2019s semantic census, the cascade and specificity priced, the DOM\u2019s live tree; and the modules/tooling/package discipline with Node named as the runtime\u2019s escape. Cross-references Programming Languages\u2019 paradigm view; hands off to Frontend Engineering (the component era) and Backend Engineering (the server runtime).',
  status: 'planned',
  accent: ['#eab308', '#a16207'],
  chapters,
}
