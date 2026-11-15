import type { Book, Chapter } from '../../../types'

/**
 * Cloud Computing — the twenty-fifth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `cloud-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Distributed Systems owns the
 * coordination theory this book rents; Operating Systems owns the machine
 * (virtualization\u2019s mechanism census priced here); Backend Engineering
 * owns the services\u2019 application craft. Cybersecurity owns the
 * cloud-security attack census (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no cloud reference on the
 *   Drive (honest note).
 * - Web-checked 2026-11-15: the standard cloud-computing course arcs
 *   (the IaaS/PaaS/SaaS ladder, virtualization, elasticity, the
 *   storage/compute/networking services census) + the official provider
 *   documentation trails (the shared-responsibility model, the
 *   well-architected censuses).
 * - Exam types: architecture decision questions + cost arithmetic sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-cloud-contract',
    title: 'The Cloud Contract',
    summary:
      'Renting instead of owning, priced honestly: the service ladder (IaaS, PaaS, SaaS — each priced on what it takes from you and what it gives), the utility economics (capex to opex, the elasticity promise and its metered honesty), the shared-responsibility model (the security line drawn precisely), and the migration question\u2019s real trade-offs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Service Ladder Priced',
      'The Metered Honesty',
      'The Shared-Responsibility Line',
    ],
  },
  {
    number: 2,
    slug: 'virtualization-and-containers',
    title: 'Virtualization and Containers',
    summary:
      'The platform\u2019s mechanism: virtualization\u2019s machinery (hypervisors type 1 and 2, the VM\u2019s contract with the CPU — the OS book\u2019s manager-manager echo), the container\u2019s lighter bet (namespaces and cgroups traced — the OS primitives doing the work), the image discipline (layers, the registry census), and the orchestration era with Kubernetes named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hypervisors and the VM Contract',
      'Containers: Namespaces and Cgroups Traced',
      'Orchestration, Named Honestly',
    ],
  },
  {
    number: 3,
    slug: 'the-services-census',
    title: 'The Services Census',
    summary:
      'The catalogue learned as families: compute\u2019s census (VMs, containers, the function-as-a-service bet priced on cold starts), storage\u2019s census (object, block, file — the durability claims read honestly), the database services (the managed relational and NoSQL arcs — DBMS cross-referenced), and networking\u2019s glue (VPC\u2019s private topology, the load-balancer family).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Compute\u2019s Census with Cold Starts',
      'Storage\u2019s Durability Claims',
      'The Managed-Data Services',
    ],
  },
  {
    number: 4,
    slug: 'elasticity-and-the-serverless-discipline',
    title: 'Elasticity and the Serverless Discipline',
    summary:
      'Scaling as a platform promise: the autoscaling discipline (the metric-trigger craft, the cooldown honesty), the load balancer\u2019s census (the algorithms priced on real traffic shapes), the serverless architecture priced (the event-driven composition, the cost curves\u2019 crossover), and the statefulness question that decides every placement.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Autoscaling Discipline',
      'Serverless Priced on Its Cost Curves',
      'The Statefulness Question',
    ],
  },
  {
    number: 5,
    slug: 'cloud-security-and-identity',
    title: 'Cloud Security and Identity',
    summary:
      'The guard rails of the rented estate: identity as the perimeter (the IAM discipline — policies as the grant/deny craft), the secret-management question, the network\u2019s defenses (the security-group census), the shared-responsibility audit method (the checklist as a discipline), and the compliance census named (Cybersecurity\u2019s deeper arc cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Identity as the Perimeter',
      'The Audit Method as Discipline',
      'The Compliance Census',
    ],
  },
  {
    number: 6,
    slug: 'reliability-and-cost-engineering',
    title: 'Reliability and Cost Engineering',
    summary:
      'Running the estate well: the well-architected censuses (the reliability pillars — the multi-AZ discipline, the DR census: RTO/RPO priced on real systems), the observability stack (the cloud\u2019s own metrics/logs — the Backend cross-reference recalled), the cost-engineering discipline (the bill read as an engineering artifact — the rightsizing and commitment census), and the green question named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'RTO and RPO Priced',
      'The Bill as an Engineering Artifact',
      'The Commitment Census',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The rented estate on one page (contract → mechanism → services → elasticity → security → cost with the disciplines beside), the craft census (architecture decision questions, cost arithmetic at exam level), and the doorsteps — Big Data Engineering\u2019s clusters ride this platform, the AI family\u2019s training rides its accelerators, the warehouse-scale era named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Estate on One Page',
      'The Craft Census',
      'The Doorsteps: the Data and AI Families Ride',
    ],
  },
]

export const cloudComputing: Book = {
  id: 'cloud-computing',
  title: 'Cloud Computing',
  subtitle: 'The rented estate — elasticity, services and the metered honesty',
  discipline: 'computer-science',
  level: 'First cloud course → the well-architected doorstep',
  description:
    'The rented-platform home on the standard service arcs. The cloud contract — the IaaS/PaaS/SaaS ladder priced, the metered honesty of elasticity economics and the shared-responsibility line; virtualization and containers — hypervisors, namespaces and cgroups traced, orchestration named; the services census — compute (cold starts priced), storage\u2019s durability claims, the managed-data arc; elasticity — autoscaling\u2019s metric craft, serverless priced on its cost curves, the statefulness question; cloud security — identity as the perimeter and the audit method; reliability and cost engineering — RTO/RPO priced, the bill read as an engineering artifact; and the estate map. Cross-references Operating Systems (the mechanisms), Distributed Systems (the theory), Database Management Systems and Cybersecurity; hands off to Big Data Engineering and the AI family\u2019s accelerator platform.',
  status: 'planned',
  accent: ['#0284c7', '#0369a1'],
  chapters,
}
