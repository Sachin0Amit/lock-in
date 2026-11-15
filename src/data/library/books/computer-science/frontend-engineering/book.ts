import type { Book, Chapter } from '../../../types'

/**
 * Frontend Engineering — the twenty-first book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `fed-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): JavaScript and Web Technologies
 * owns the language and the platform core (cross-referenced); this book
 * owns the component-era engineering built on it. Human-Computer
 * Interaction owns the design theory; Full-Stack owns the integration
 * capstone.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): the Rheinwerk full-stack
 *   guide\u2019s frontend half (EPUB, TOC web-checked) + the JS Guide\u2019s
 *   browser chapters (extracted).
 * - Web-checked 2026-11-15: roadmap.sh/frontend (the community canon —
 *   internet/HTML/CSS/JS core, component frameworks, styling systems,
 *   state, testing, performance, a11y, build tooling) + the official
 *   framework documentation structures (React\u2019s own learn-arc).
 * - Syllabus audit: the modern bootcamp/self-taught registers.
 * - Exam types: portfolio projects + architecture decision questions
 *   (state placement, rendering choice).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-frontend-craft',
    title: 'The Frontend Craft',
    summary:
      'What frontend engineering owns: the browser\u2019s render pipeline as the working reality (parse, style, layout, paint, composite — each stage priced on the performance question it answers), the HTTP contract\u2019s client half, and the modern workflow\u2019s toolchain discipline from the first component to the shipped bundle.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Render Pipeline Priced',
      'The HTTP Client Half',
      'From Component to Shipped Bundle',
    ],
  },
  {
    number: 2,
    slug: 'responsive-and-accessible-by-default',
    title: 'Responsive and Accessible by Default',
    summary:
      'The two non-negotiables: responsive layout as the fluid-craft (media queries, the mobile-first discipline, modern container queries named) and accessibility as the contract (semantic HTML\u2019s role tree, the keyboard\u2019s path through every interface, ARIA named honestly — only when semantics cannot do it), with the WCAG\u2019s principles stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fluid Craft',
      'The Keyboard\u2019s Path',
      'ARIA, Named Honestly',
    ],
  },
  {
    number: 3,
    slug: 'the-component-idea',
    title: 'The Component Idea',
    summary:
      'The era\u2019s core abstraction: components as UI functions (props in, elements out — the pure-render discipline), the declarative model\u2019s honesty (describe the state\u2019s interface, let the engine reconcile), React\u2019s hooks discipline traced (state and effects with their dependency contract), and composition over configuration as the organizing law.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Components as UI Functions',
      'The Declarative Model\u2019s Honesty',
      'Hooks Traced with Their Contract',
    ],
  },
  {
    number: 4,
    slug: 'state-and-data-flow',
    title: 'State and Data Flow',
    summary:
      'The hardest question in the era: the state census (local, lifted, server-derived — each priced on when it is honest), the one-way data flow discipline, forms\u2019 controlled/uncontrolled choice, and the server-data integration (the query-cache era named — what fetching hooks actually manage).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The State Census Priced',
      'One-Way Flow as Discipline',
      'The Server-Data Integration',
    ],
  },
  {
    number: 5,
    slug: 'styling-systems',
    title: 'Styling Systems',
    summary:
      'The design-token discipline: CSS\u2019s architecture grown up (the cascade tamed — utility systems priced honestly against component-scoped styles), the Tailwind-utility approach priced on real layouts, theming with design tokens, and the dark-mode contract as a first-class state.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cascade Tamed',
      'The Utility Approach Priced',
      'Design Tokens and the Dark-Mode Contract',
    ],
  },
  {
    number: 6,
    slug: 'performance-engineering',
    title: 'Performance Engineering',
    summary:
      'Speed as a measured discipline: the metrics census (Core Web Vitals named and priced — LCP, CLS, INP with their causes), the bundle budget discipline (code-splitting and the loading census), the render-cost question (unnecessary work avoided — memoization named honestly), and images/media as the perennial heavyweight.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Metrics Census Priced',
      'The Bundle Budget',
      'The Render-Cost Question',
    ],
  },
  {
    number: 7,
    slug: 'testing-and-tooling',
    title: 'Testing and Tooling',
    summary:
      'The confidence machinery: the frontend test census (unit, component, end-to-end — each priced on the failure it catches), the build tool\u2019s honest job (bundler/transpiler named as compile steps), TypeScript\u2019s contract (the typed frontend\u2019s honest benefits), and the lint/format discipline as team law.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Test Census',
      'The Build Tool\u2019s Honest Job',
      'TypeScript\u2019s Contract',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The client on one page (pipeline → component → state → style → speed → confidence with the disciplines beside), the craft census (architecture decision questions — where state lives, why this renders), and the doorsteps — Full-Stack\u2019s integration capstone and the platform\u2019s frontier (the meta-framework era named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Client on One Page',
      'The Craft Census',
      'The Doorsteps: the Full-Stack Integration',
    ],
  },
]

export const frontendEngineering: Book = {
  id: 'frontend-engineering',
  title: 'Frontend Engineering',
  subtitle: 'The component era — render pipelines, state discipline and measured speed',
  discipline: 'computer-science',
  level: 'First component-era course → production-frontend readiness',
  description:
    'The engineering home for the browser side (roadmap.sh canon + the framework documentation arcs). The render pipeline priced on its performance questions; responsive and accessible by default — the fluid craft, the keyboard\u2019s path, ARIA named honestly; the component idea — UI functions, the declarative model\u2019s honesty, hooks traced with their dependency contract; the state census priced (local, lifted, server-derived) with one-way flow as law; styling systems — the cascade tamed, utilities priced, design tokens and the dark-mode contract; performance engineering — Core Web Vitals priced, the bundle budget, the render-cost question; and testing/tooling with TypeScript\u2019s contract. Cross-references JavaScript and Web Technologies (the platform) and Human-Computer Interaction (the design theory); hands off to Full-Stack Web Development\u2019s integration capstone.',
  status: 'planned',
  accent: ['#06b6d4', '#0e7490'],
  chapters,
}
