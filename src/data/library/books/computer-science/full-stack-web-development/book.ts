import type { Book, Chapter } from '../../../types'

/**
 * Full-Stack Web Development — the twenty-third book of the CS shelf
 * (the shelf's own integration capstone for the web family).
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `fsw-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Frontend and Backend own their
 * halves; this book OWNS THE INTEGRATION — the project arc that composes
 * them (the capstone role Advanced Mathematical Foundations plays for the
 * math shelf). Nothing here re-teaches a half; every chapter composes.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Rheinwerk, 'Full-Stack Web
 *   Development: The Comprehensive Guide' (the EPUB on the Drive — not
 *   extracted, its TOC web-checked 2026-11-15; the frontend/backend/
 *   integration arc).
 * - Web-checked 2026-11-15: roadmap.sh full-stack + the modern
 *   meta-framework documentation arcs.
 * - Syllabus audit: the bootcamp capstone registers.
 * - Exam types: the project itself — portfolio-grade builds with
 *   decision records.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'one-system-two-sides',
    title: 'One System, Two Sides',
    summary:
      'The full-stack view: the request\u2019s whole journey traced button-to-database-and-back (every layer of Frontend and Backend\u2019s maps visited once in order), the shared contracts that hold the system together (the API as the meeting point), and the project discipline this book runs — decisions recorded honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Whole Journey Traced',
      'The API as Meeting Point',
      'The Decision-Record Discipline',
    ],
  },
  {
    number: 2,
    slug: 'the-project-skeleton',
    title: 'The Project Skeleton',
    summary:
      'The working shape: the monorepo-versus-polyrepo census priced on team scale, the shared-types discipline (one source of truth for the API\u2019s contract — codegen named), environment discipline (configuration\u2019s secrets handled honestly), and the dev pipeline that makes both halves run with one command.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Repo Census Priced',
      'Shared Types: One Source of Truth',
      'Both Halves, One Command',
    ],
  },
  {
    number: 3,
    slug: 'the-vertical-slice-discipline',
    title: 'The Vertical-Slice Discipline',
    summary:
      'Building the first feature whole: the vertical slice (database → API → UI for one capability), form handling end-to-end with validation living once (the server-side truth, the client-side courtesy), error paths designed (not apologized for), and the optimistic-UI honesty priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The First Feature Whole',
      'Validation Lives Once',
      'Error Paths Designed',
    ],
  },
  {
    number: 4,
    slug: 'auth-through-the-stack',
    title: 'Auth Through the Stack',
    summary:
      'The system\u2019s front door built whole: the auth flow traced end-to-end (registration, login, session/token discipline — Backend\u2019s auth chapters composed, not re-taught), the protected-route contract on the client, the role question priced on real authorization, and the account lifecycle\u2019s honest edge cases (lockout, password reset).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Flow Traced End-to-End',
      'Protected Routes and Roles',
      'The Lifecycle\u2019s Edge Cases',
    ],
  },
  {
    number: 5,
    slug: 'production-and-deployment',
    title: 'Production and Deployment',
    summary:
      'Shipping the composed system: the deployment census composed (the CI pipeline that tests both halves, the container image, the platform choice — Cloud Computing\u2019s doorstep), the production concerns that only appear whole (secrets, environment parity, the domain and its TLS), and the database\u2019s production reality (backups and migrations under load).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CI Pipeline for Both Halves',
      'The Platform Choice',
      'The Production Realities That Only Appear Whole',
    ],
  },
  {
    number: 6,
    slug: 'observability-and-the-loop',
    title: 'Observability and the Loop',
    summary:
      'Running what you shipped: the whole-system observability (the request ID from browser to database — traces composed across the halves), errors seen from both sides (the client\u2019s report, the server\u2019s log — one timeline), and the improvement loop (metrics → hypothesis → ship → measure) as the honest full-stack craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'One Timeline Across Both Sides',
      'Errors Seen from Both Sides',
      'The Improvement Loop',
    ],
  },
  {
    number: 7,
    slug: 'the-capstone-build',
    title: 'The Capstone Build',
    summary:
      'The book\u2019s own synthesis: one complete project specified honestly (the feature census, the architecture decision records, the deployment), the craft census (architecture defence questions — why this state here, why this API shape), and the doorsteps — Cloud Computing\u2019s platform era, Distributed Systems\u2019 coordination theory, the CS shelf\u2019s capstone named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Project Specified Honestly',
      'The Craft Census: Architecture Defended',
    ],
  },
]

export const fullStackWebDevelopment: Book = {
  id: 'full-stack-web-development',
  title: 'Full-Stack Web Development',
  subtitle: 'The integration capstone — one system, both sides, shipped and observed',
  discipline: 'computer-science',
  level: 'The web family\u2019s capstone — halves composed into production systems',
  description:
    'The web family\u2019s capstone book (the Rheinwerk full-stack guide\u2019s integration arc). One system, two sides — the whole journey traced and the API as meeting point with the decision-record discipline; the project skeleton — repo census, shared types as one source of truth, both halves one command; the vertical-slice discipline — the first feature whole, validation living once, error paths designed; auth through the stack — the flow traced end-to-end with protected routes and the lifecycle\u2019s edge cases; production and deployment — the CI pipeline for both halves, the platform choice, the realities that only appear whole; observability across the loop; and the capstone build with its architecture defence census. Cross-references Frontend and Backend Engineering\u2019s halves (never re-teaches); hands off to Cloud Computing and Distributed Systems.',
  status: 'planned',
  accent: ['#6d28d9', '#5b21b6'],
  chapters,
}
