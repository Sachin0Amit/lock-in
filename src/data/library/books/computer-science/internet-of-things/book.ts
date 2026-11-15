import type { Book, Chapter } from '../../../types'

/**
 * Internet of Things — the fortieth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `iot-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Assembly and Microprocessors
 * owns the microcontroller craft (cross-referenced as the hardware
 * platform); Computer Networks owns the protocol theory; Cybersecurity
 * owns the attack discipline — this book owns the physical-digital
 * system: sensing, the constrained-stack, and the application worlds.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no IoT
 *   reference on the Drive (honest note).
 * - Web-checked 2026-11-15: the standard IoT textbook arcs (the
 *   enabling-technology census — sensing hardware, communication
 *   stacks, data management, security; architecture and the
 *   application census — surveyed across the textbook TOCs).
 * - Exam types: architecture-design questions + protocol-selection
 *   sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-physical-digital-bridge',
    title: 'The Physical-Digital Bridge',
    summary:
      'The field defined by its bet: the physical world instrumented (sensing and actuation priced as a two-way street), the constrained reality stated first (energy, compute, bandwidth — the three budgets every design spends), the architecture\u2019s reference census (the edge/gateway/cloud layering), and the application census from wearables to cities.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Budgets',
      'The Reference Architecture Census',
      'The Application Census',
    ],
  },
  {
    number: 2,
    slug: 'the-sensing-layer',
    title: 'The Sensing Layer',
    summary:
      'How the world becomes data: the sensor census (the transducer families — resistive, capacitive, the MEMS echo priced on what each measures), the analog-to-digital contract (sampling\u2019s discipline recalled — the Nyquist honesty from the Mathematics shelf), the actuation discipline, and the calibration craft as the trust layer of every reading.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transducer Census',
      'The Sampling Discipline Recalled',
      'Calibration as the Trust Layer',
    ],
  },
  {
    number: 3,
    slug: 'the-constrained-stack',
    title: 'The Constrained Stack',
    summary:
      'Communication on a budget: the protocol census for constrained devices (the low-power families — Zigbee, BLE, LoRaWAN priced on their range/energy trade), the IP-for-things discipline (6LoWPAN and CoAP named with their compression honesty), the gateway\u2019s craft, and the wireless honesty — the physics\u2019 limits priced on real deployments.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Low-Power Protocol Census',
      'IP for Things, Compressed',
      'The Range/Energy Trade Priced',
    ],
  },
  {
    number: 4,
    slug: 'the-edge-and-cloud-partnership',
    title: 'The Edge and Cloud Partnership',
    summary:
      'Where the computing lives: the fog/edge discipline (the latency question priced on a real control loop), the data pipeline\u2019s shape (the ingestion stream — Big Data cross-referenced for the platform), the digital-twin idea named honestly (the model that mirrors the thing), and the analytics at the edge\u2019s census (the tiny-ML echo priced on its constraints).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Latency Question on a Control Loop',
      'The Digital Twin, Named Honestly',
      'Tiny ML at the Edge',
    ],
  },
  {
    number: 5,
    slug: 'iot-security-and-privacy',
    title: 'IoT Security and Privacy',
    summary:
      'The field\u2019s hardest honesty: the constrained security problem (the crypto that fits a coin-sized budget — Cryptography cross-referenced for what must be borrowed), the device-identity discipline (the provisioning census), the privacy question priced on real sensor streams (the home\u2019s leakage), and the fleet-update reality — the unpatched-thing disease.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crypto That Fits the Budget',
      'The Home\u2019s Privacy Leakage',
      'The Unpatched-Thing Disease',
    ],
  },
  {
    number: 6,
    slug: 'the-application-worlds',
    title: 'The Application Worlds',
    summary:
      'The theory priced in the world: the industrial arc (the factory\u2019s deterministic honesty — the real-time census), the wearables/health discipline (the regulatory question named), the smart-city census priced honestly (the lamppost lesson — what fails at scale), and the agriculture/environment echo — the deployment craft learned from each.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Factory\u2019s Deterministic Honesty',
      'The Lamppost Lesson',
      'The Deployment Craft',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The instrumented world on one page (sense → transmit → compute → act with the budgets beside), the craft census (protocol-selection and architecture questions at exam level), and the doorsteps — Cloud Computing\u2019s platform, Machine Learning\u2019s tiny engines, Cybersecurity\u2019s fleet reality, the research frontier named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Instrumented World on One Page',
      'The Craft Census',
      'The Doorsteps: Platform, Engines, Fleet',
    ],
  },
]

export const internetOfThings: Book = {
  id: 'internet-of-things',
  title: 'Internet of Things',
  subtitle: 'The instrumented world — sensing, the constrained stack, and the honest budgets',
  discipline: 'computer-science',
  level: 'First IoT course → the deployment-craft doorstep',
  description:
    'The instrumented-world home on the standard IoT arcs. The physical-digital bridge — the three budgets every design spends (energy, compute, bandwidth) and the reference architecture; the sensing layer — the transducer census, the sampling discipline recalled, calibration as the trust layer; the constrained stack — the low-power protocol census with the range/energy trade priced; the edge/cloud partnership — the latency question on a real control loop, the digital twin named honestly, tiny ML; security and privacy — the crypto that fits the budget, the home\u2019s leakage, the unpatched-thing disease; the application worlds — the factory\u2019s deterministic honesty and the lamppost lesson; and the instrumented map. Cross-references Assembly and Microprocessors (the platform), Computer Networks, Cloud Computing and Cybersecurity; hands off to the deployment frontier.',
  status: 'planned',
  accent: ['#0d9488', '#134e4a'],
  chapters,
}
