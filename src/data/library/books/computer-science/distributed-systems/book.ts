import type { Book, Chapter } from '../../../types'

/**
 * Distributed Systems — the twenty-fourth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `dist-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Operating Systems owns the
 * single-machine manager; Computer Networks owns the transport below;
 * Backend Engineering owns the application craft — this book owns the
 * coordination theory. Cloud Computing owns the rented-platform practice;
 * Blockchain owns the trust ledger application.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Coulouris on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Coulouris, Dollimore, Kindberg, Blair,
 *   'Distributed Systems: Concepts and Design' 5e (the mirrored PDF —
 *   the communication/coordination/replication/fault-tolerance/security
 *   arc with case studies) + the standard course arcs (time/ordering,
 *   consensus, CAP).
 * - Syllabus audit: the standard graduate DS course registers.
 * - Exam types: university problem sets (happens-before matrices,
 *   election traces, consensus scenarios).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-distributed-idea',
    title: 'The Distributed Idea',
    summary:
      'Why and what: the definition priced honestly (independent failures, no shared clock — the two facts that explain every later theorem), the architectural census (client-server, peer-to-peer, the layered middleware story), the design goals\u2019 hierarchy, and the fundamental trade stated first: the network will fail.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Facts That Explain Everything',
      'The Architectural Census',
      'The Fundamental Trade',
    ],
  },
  {
    number: 2,
    slug: 'communication-and-rpc',
    title: 'Communication and RPC',
    summary:
      'The remote conversation: interprocess communication\u2019s primitives (sockets, the serialization discipline), remote invocation\u2019s ladder (RPC priced on its transparency myth — the failure modes enumerated), request-reply protocols\u2019 marshalling craft, and indirect communication named (pub-sub, message queues, the space echo).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'RPC Priced on Its Transparency Myth',
      'The Failure Modes Enumerated',
      'Indirect Communication, Named',
    ],
  },
  {
    number: 3,
    slug: 'time-ordering-and-elections',
    title: 'Time, Ordering and Elections',
    summary:
      'The clockless world\u2019s discipline: physical clocks\u2019 drift honesty, logical clocks derived (Lamport\u2019s happens-before PROVED as the ordering contract — the vector-clock echo), logical clocks in practice, and the election problem (ring and bully algorithms traced through real runs).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Happens-Before, Proved as Contract',
      'Vector Clocks, Named',
      'Elections Traced',
    ],
  },
  {
    number: 4,
    slug: 'coordination-and-consensus',
    title: 'Coordination and Consensus',
    summary:
      'The field\u2019s hardest core: the mutual-exclusion echo across machines (distributed locks and their hazards), two-phase commit traced with its blocking honesty (the coordinator dies), consensus defined (agreement, validity, termination), Paxos named with its architecture honestly summarized, and Raft as the understandable heir traced through an election.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two-Phase Commit\u2019s Blocking Honesty',
      'Consensus Defined',
      'Paxos Named, Raft Traced',
    ],
  },
  {
    number: 5,
    slug: 'consistency-replication-and-cap',
    title: 'Consistency, Replication and CAP',
    summary:
      'Copies of the truth: replication\u2019s reasons (availability, performance, fault tolerance priced), the consistency-model census (linearizable through eventual — the ladder stated with what each costs), CAP stated and its honest interpretation (the partition is the question, not the law of nature), and PACELC named as the completion.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Consistency-Model Census',
      'CAP Stated and Interpreted Honestly',
      'PACELC, Named',
    ],
  },
  {
    number: 6,
    slug: 'fault-tolerance-and-agreement',
    title: 'Fault Tolerance',
    summary:
      'Surviving the failure census: the failure model (crash, omission, byzantine — each priced on the evidence needed), fault-tolerance means (replication\u2019s two-army problem as the honest limit), the gossip discipline (the epidemic protocols\u2019 convergence arithmetic), and the checkpoint/recovery craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Failure Model Census',
      'The Two-Army Limit',
      'Gossip\u2019s Convergence',
    ],
  },
  {
    number: 7,
    slug: 'distributed-storages-and-systems',
    title: 'Distributed Storage and Systems',
    summary:
      'The theory as real systems: distributed file systems\u2019 arc (NFS\u2019s statelessness to the object-store era), the sharded-data discipline (the partition census with its rebalancing honesty), distributed transactions\u2019 real engines (the two-phase commit and its descendants in the field), and the case-study census from the book\u2019s own editions (CORBA\u2019s legacy, the modern equivalents named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sharded-Data Discipline',
      'Distributed Transactions\u2019 Real Engines',
      'The Case-Study Census',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The theory on one page (communication → ordering → consensus → consistency → fault tolerance with the limits beside), the craft census (happens-before matrices, consensus scenarios at exam level), and the doorsteps — Cloud Computing rents the machinery this book theorizes, Blockchain builds trust on the consensus floor, and the warehouse-scale era named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Theory on One Page',
      'The Craft Census',
      'The Doorsteps: Cloud, Trust, Warehouse Scale',
    ],
  },
]

export const distributedSystems: Book = {
  id: 'distributed-systems',
  title: 'Distributed Systems',
  subtitle: 'Coordination without a shared clock — the theory of machines that must agree',
  discipline: 'computer-science',
  level: 'First graduate-style distributed-systems course → the consensus doorstep',
  description:
    'The coordination-theory home on the Coulouris arc. The two facts that explain everything (independent failures, no shared clock); communication and RPC priced on its transparency myth with indirect communication named; time and ordering — happens-before PROVED as contract, vector clocks, elections traced; consensus — two-phase commit\u2019s blocking honesty, Paxos named with Raft traced; consistency\u2019s model census with CAP stated and interpreted honestly and PACELC named; fault tolerance — the failure model census, the two-army limit, gossip\u2019s convergence; distributed storage and the sharded-data discipline; and the theory map with its limits. Cross-references Operating Systems and Computer Networks; hands off to Cloud Computing, Blockchain and the warehouse-scale era.',
  status: 'planned',
  accent: ['#0c4a6e', '#082f49'],
  chapters,
}
