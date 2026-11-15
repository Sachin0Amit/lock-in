import type { Book, Chapter } from '../../../types'

/**
 * Software Engineering — the thirteenth book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `swe-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the design-pattern craft belongs
 * to Object-Oriented Programming (GoF/Head-First extractions live there —
 * cross-reference); Testing's deep craft also anchors here as process.
 * Distributed Systems owns the distributed coordination theory; Backend
 * Engineering owns the web-application engineering practice.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): GoF 'Design Patterns' (cs-13)
 *   and Head-First Design Patterns 2e (cs-20) — the catalog chapters
 *   extracted (the SE-adjacent half used here for process/context).
 * - Web-checked 2026-11-15: Sommerville, 'Software Engineering' 10e —
 *   ch. 1 Introduction; 2 Software processes; 3 Agile software
 *   development; 4 Requirements engineering; 5 System modeling; then the
 *   design/implementation/testing/evolution arc, the dependability
 *   chapters and the systems-of-systems close (Pearson/archive TOCs).
 * - Syllabus audit: the standard university SE course arcs.
 * - Exam types: university case-study analyses + process/UML questions.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 6 + IOI SE lines audited
 *   against this plan — six planned lessons added (the McCall/ISO 9126
 *   quality models, the named testing families, the debugging craft, the
 *   estimation models, scheduling/staffing, the risk census). Routing/
 *   verdict record: docs/research/CS_EXAM_TOPIC_LEDGER.md; standing gate:
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-software-engineering-is',
    title: 'What Software Engineering Is',
    summary:
      'Programming\u2019s grown-up sibling: what changes when software is engineered (scale, lifetime, teams — each priced on the honest cost of change), the discipline\u2019s census from the classic definitions, and the questions this book answers about process, requirements, design, testing and maintenance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cost of Change, Priced Honestly',
      'The Discipline\u2019s Census',
      'The Questions This Book Answers',
    ],
  },
  {
    number: 2,
    slug: 'software-processes',
    title: 'Software Processes',
    summary:
      'How work organizes itself: the process census (waterfall, iterative, incremental — each priced on when it is honest), the specification/development/validation/evolution activities, the V-model\u2019s discipline, and the process\u2019s real customer — the problem: where requirements engineering begins.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Process Census Priced',
      'The Four Activities',
      'The V-Model Discipline',
    ],
  },
  {
    number: 3,
    slug: 'agile-software-development',
    title: 'Agile Software Development',
    summary:
      'The response to heavyweight process: the manifesto\u2019s values priced honestly (what agile keeps, what it drops), the Scrum discipline (sprints, roles, artifacts — the real machinery), the engineering practices that make agility safe (CI, refactoring\u2019s discipline, test-first), and the honest census — where agile fits and where it fails.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Manifesto Priced',
      'Scrum\u2019s Real Machinery',
      'The Practices That Make It Safe',
      'Where Agile Fits and Fails',
    ],
  },
  {
    number: 4,
    slug: 'requirements-engineering',
    title: 'Requirements Engineering',
    summary:
      'Getting the right problem: functional versus non-functional requirements (the quality census — performance, security, usability — with the classic quality models named: McCall\u2019s factor tree and ISO 9126\u2019s six characteristics, software quality control versus assurance), the elicitation discipline (stakeholders, interviews, the observation craft), specification written honestly (use cases walked through a real one), and validation — the requirements\u2019 own tests.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Functional, Non-Functional and the Quality Census',
      'The Quality-Model Census: McCall and ISO 9126',
      'Elicitation: Getting the Right Problem',
      'Use Cases Walked Honestly',
    ],
  },
  {
    number: 5,
    slug: 'system-modeling-and-design',
    title: 'System Modeling and Design',
    summary:
      'Describing systems before building them: the UML census used honestly (class, activity, sequence diagrams — each priced on what it actually communicates), architectural views (the 4+1 census), design\u2019s decomposition discipline (cohesion and coupling as the two virtues), and the interface contract between modules.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The UML Census, Honestly',
      'Architectural Views',
      'Cohesion and Coupling: the Two Virtues',
    ],
  },
  {
    number: 6,
    slug: 'implementation-and-code-craft',
    title: 'Implementation and Code Craft',
    summary:
      'The written artifact: the practices that keep code alive (naming, small modules, the refactoring discipline with its catalog of moves), code review as social verification, the version-control discipline (branching census — what git actually gives), and the documentation question answered honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Practices That Keep Code Alive',
      'Refactoring\u2019s Catalog of Moves',
      'Code Review as Verification',
    ],
  },
  {
    number: 7,
    slug: 'software-testing',
    title: 'Software Testing',
    summary:
      'Verification\u2019s honest half: unit testing\u2019s discipline (the AAA shape, mocks named), coverage as a measured claim (statement/branch/paths — the limits stated), integration and system testing census, the black-box/white-box pair with the boundary-value discipline priced on real defects, and the classic families named for every syllabus — basis-path testing, regression and stress testing, alpha and beta\u2019s staging, plus the debugging craft (the defect hunt\u2019s discipline — localize, hypothesize, verify) and configuration management\u2019s change/version control with software reuse and re-engineering named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Unit Testing\u2019s Discipline',
      'Coverage as a Measured Claim',
      'The Black-Box/White-Box Census',
      'Basis Path, Regression and Stress: the Families Named',
      'Boundary Values and Real Defects',
      'The Debugging Craft',
    ],
  },
  {
    number: 8,
    slug: 'dependability-evolution-and-management',
    title: 'Dependability, Evolution and Management',
    summary:
      'The long life: dependability\u2019s census (reliability, availability, safety — the failure arithmetic priced; software reliability engineering), maintenance as the majority cost (the four maintenance kinds), project management\u2019s honest arithmetic — estimation at depth (software sizing by LOC and function points, the COCOMO model family priced honestly, estimation\u2019s disease), scheduling and staffing (timeline/Gantt charts, the critical path), the risk census with mitigation and monitoring (RMMM), and legacy\u2019s reality — evolution as a discipline, not an apology.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dependability\u2019s Census and Failure Arithmetic',
      'Maintenance: the Majority Cost',
      'Estimation at Depth: LOC, Function Points, COCOMO',
      'Scheduling, Staffing and Timeline Charts',
      'The Risk Census: Mitigation and Monitoring',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The lifecycle on one page (problem → requirements → process → design → code → tests → evolution with the disciplines beside), the craft census (case-study analysis at exam level — the process-choice and diagram questions), and the doorsteps — Object-Oriented Programming\u2019s design patterns, Distributed Systems\u2019 coordination, Software Engineering\u2019s own frontier (DevOps and the systems-of-systems echo).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lifecycle on One Page',
      'The Craft Census',
      'The Doorsteps: Patterns, Coordination, DevOps',
    ],
  },
]

export const softwareEngineering: Book = {
  id: 'software-engineering',
  title: 'Software Engineering',
  subtitle: 'The lifecycle disciplines — from the right problem to code that lives',
  discipline: 'computer-science',
  level: 'First software-engineering course → the engineering-management doorstep',
  description:
    'The Sommerville process arc on the shelf. What changes when software is engineered — the honest cost of change; the process census (waterfall, iterative, the V-model\u2019s discipline); agile priced honestly with Scrum\u2019s real machinery, the safety practices (CI, refactoring, test-first) and where it fails; requirements engineering — elicitation, the quality census, use cases walked; system modeling and design — the UML census, architectural views, cohesion and coupling; implementation craft — refactoring\u2019s catalog, code review, the branching census; software testing — coverage as a measured claim, the black-box/white-box census, boundary values; dependability with failure arithmetic, maintenance as the majority cost, estimation\u2019s disease; and the lifecycle synthesis map. Cross-references Object-Oriented Programming (the design-pattern craft); hands off to Distributed Systems and the DevOps frontier.',
  status: 'planned',
  accent: ['#475569', '#334155'],
  chapters,
}
