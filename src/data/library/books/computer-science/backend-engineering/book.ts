import type { Book, Chapter } from '../../../types'

/**
 * Backend Engineering — the twenty-second book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `bed-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Database Management Systems owns
 * the data engine; Computer Networks owns the protocols; Operating
 * Systems owns the machine — this book owns the server-side application
 * discipline that composes them. The Java/Spring extraction is this
 * book's Drive spine; the language books own their syntaxes.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Walls, 'Spring in Action'
 *   6e (cs-26 — the 18-chapter arc extracted: the web tier, form
 *   submission and validation, Spring Data JDBC/JPA and MongoDB,
 *   authentication and method-level security, OAuth2 authorization
 *   servers, REST services, messaging JMS/RabbitMQ/Kafka, reactive
 *   Reactor, RSocket, Actuator, the Admin server, and deployment) + the
 *   Rheinwerk full-stack guide's backend half (web-checked).
 * - Web-checked 2026-11-15: roadmap.sh/backend (internet/HTTP, server
 *   languages, databases, caches, web security, testing, CI/CD,
 *   scaling, API design, authentication — JWT/basic/token).
 * - Exam types: architecture decision questions + API-design sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-server-side-contract',
    title: 'The Server-Side Contract',
    summary:
      'What the server owes: the request/response cycle walked from socket to response (the web tier\u2019s anatomy — router, handler, serializer), HTTP\u2019s server half priced (methods\u2019 semantics, status codes\u2019 honest census, headers), and the statelessness question that explains every later scaling choice.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cycle Walked from Socket to Response',
      'Status Codes\u2019 Honest Census',
      'Statelessness and Its Consequences',
    ],
  },
  {
    number: 2,
    slug: 'the-application-framework-idea',
    title: 'The Application Framework Idea',
    summary:
      'Why frameworks exist (inversion of control priced — the Hollywood principle), the web framework\u2019s anatomy (the request pipeline\u2019s middleware discipline, the controller/handler tier, dependency injection as the wiring craft — Spring\u2019s own arc as the working example), and configuration\u2019s honest discipline (profiles and properties).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Inversion of Control Priced',
      'The Request Pipeline\u2019s Middleware Discipline',
      'Dependency Injection as Wiring',
    ],
  },
  {
    number: 3,
    slug: 'apis-designed-honestly',
    title: 'APIs Designed Honestly',
    summary:
      'The server\u2019s public face: REST\u2019s field guide (resources named well, verbs respected, the versioning honesty), the resource-design craft (pagination, filtering, the error contract), GraphQL named with its honest trade-offs, and the documentation discipline (OpenAPI as the contract that outlives the code).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'REST\u2019s Field Guide',
      'The Error Contract and Pagination',
      'GraphQL, Named Honestly',
    ],
  },
  {
    number: 4,
    slug: 'the-data-layer-from-the-server-side',
    title: 'The Data Layer from the Server Side',
    summary:
      'The persistence partnership: relational access patterns from the application (the ORM\u2019s honest census — what it generates, what it hides, the N+1 disease priced), transactions\u2019 application-side discipline, migrations as schema history, and the NoSQL census with MongoDB\u2019s document bet priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ORM\u2019s Honest Census',
      'The N+1 Disease, Priced',
      'Migrations and the NoSQL Census',
    ],
  },
  {
    number: 5,
    slug: 'authentication-and-authorization',
    title: 'Authentication and Authorization',
    summary:
      'Who and what: the authN/authZ distinction held firmly, session-based authentication traced (the cookie contract), the token census (JWT priced honestly — what it buys, what it cannot), OAuth2\u2019s flows and the authorization-server discipline (Spring\u2019s arc as the example), and the web-security census (the OWASP top families named — Cybersecurity cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The authN/authZ Distinction',
      'JWT Priced Honestly',
      'OAuth2\u2019s Flows',
      'The OWASP Census, Named',
    ],
  },
  {
    number: 6,
    slug: 'caching-and-scale-discipline',
    title: 'Caching and Scale Discipline',
    summary:
      'The load answers: caching\u2019s census priced layer by layer (browser, CDN, the application cache, the database\u2019s own), the invalidation honesty (the hard question named), statelessness revisited for horizontal scale (the load balancer\u2019s role), the message-family discipline (queues, pub-sub — RabbitMQ/Kafka named from the Spring arc), and the CAP echo handed to Distributed Systems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Caching Census Priced',
      'The Invalidation Honesty',
      'Queues and Pub-Sub',
      'Horizontal Scale and the CAP Echo',
    ],
  },
  {
    number: 7,
    slug: 'reliability-observability-and-deployment',
    title: 'Reliability, Observability and Deployment',
    summary:
      'The production reality: health and metrics (the Actuator discipline — observability\u2019s three legs: logs, metrics, traces), structured logging as the searchable contract, the deployment census (the executable JAR to the container image — Cloud Computing\u2019s doorstep), CI/CD as the delivery discipline, and the testing pyramid applied to services.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Observability\u2019s Three Legs',
      'Structured Logging as Contract',
      'The Deployment Census',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The server on one page (request → framework → API → data → auth → scale → observe with the disciplines beside), the craft census (API-design and architecture decision questions), and the doorsteps — Distributed Systems takes the coordination theory, Cloud Computing the platform, Full-Stack the integration capstone.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Server on One Page',
      'The Craft Census',
    ],
  },
]

export const backendEngineering: Book = {
  id: 'backend-engineering',
  title: 'Backend Engineering',
  subtitle: 'The server-side discipline — from the request cycle to the observed production service',
  discipline: 'computer-science',
  level: 'First server-side course → production-service readiness',
  description:
    'The server-side home on the Spring/roadmap.sh arcs. The request/response cycle walked with the status-code census and statelessness\u2019 consequences; the framework idea — inversion of control priced, the middleware pipeline, dependency injection as wiring; APIs designed honestly (REST\u2019s field guide, the error contract, GraphQL named); the data layer — the ORM\u2019s honest census with the N+1 disease priced, migrations, the NoSQL census; authentication and authorization — sessions traced, JWT priced honestly, OAuth2\u2019s flows, the OWASP families; caching\u2019s census with the invalidation honesty, queues and pub-sub, horizontal scale with the CAP echo; and reliability — observability\u2019s three legs, the deployment census, CI/CD. Cross-references Database Management Systems, Computer Networks, Operating Systems and Cybersecurity; hands off to Distributed Systems, Cloud Computing and Full-Stack\u2019s capstone.',
  status: 'planned',
  accent: ['#4338ca', '#3730a3'],
  chapters,
}
