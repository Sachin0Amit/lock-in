import type { Book, Chapter } from '../../../types'

/**
 * Database Management Systems — the tenth book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 10 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `db-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the Mathematics shelf's
 * Relational Algebra and First-Order Logic (Set Theory / Mathematical
 * Logic) are the theory this book engineers — cross-referenced, never
 * duplicated. Big Data Engineering owns the post-relational scale-out
 * arc; Backend Engineering owns the application-side usage.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Silberschatz, Korth,
 *   Sudarshan, 'Database System Concepts' 7e (cs-11, full chapter-level
 *   TOC extracted — the relational model, SQL through nested subqueries
 *   and advanced SQL, E-R modeling, normalization with FD theory,
 *   application development, physical storage and indexing incl. B+
 *   trees and hashing, query processing/optimization, transactions,
 *   concurrency control, recovery, parallel/distributed).
 * - Web-checked 2026-11-15: GATE CSE Section 9 — ER model, relational
 *   algebra, SQL, normalization, transactions, concurrency control —
 *   the chapters 2-5, 8-9 roster exactly.
 * - Exam types: GATE SQL/normalization MCQs + FD-closure problems +
 *   university query-writing sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-database-idea',
    title: 'The Database Idea',
    summary:
      'Why files stop being enough (the redundancy, inconsistency and isolation census priced on a spreadsheet that grew), the database\u2019s contract, schemas and instances, data models as the census (relational named as this book\u2019s spine), and the engine census — the components a real system owns.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Files Stop Being Enough',
      'Schemas, Instances and Data Models',
      'The Engine Census',
    ],
  },
  {
    number: 2,
    slug: 'the-relational-model',
    title: 'The Relational Model',
    summary:
      'Tables as mathematics: relations, tuples and attributes with the domain discipline, keys (super/candidate/primary/foreign — the identification craft), schema diagrams, and the relational algebra PROVED as the query mathematics (selection, projection, joins — the Set Theory cross-reference made explicit).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Relations, Tuples and Keys',
      'The Relational Algebra, Proved',
      'The Identification Craft: Superkeys to Foreign Keys',
    ],
  },
  {
    number: 3,
    slug: 'sql-the-standard-voice',
    title: 'SQL: the Standard Voice',
    summary:
      'The industry\u2019s language from data definition to the query craft: basic structure (select-from-where walked honestly), joins, set operations, null values\u2019 three-valued discipline, aggregate functions with grouping, nested subqueries (correlated and not), modification, views, integrity constraints and authorization, and indexes declared in SQL.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Basic Structure Walked',
      'Aggregation, Grouping and Subqueries',
      'Views, Constraints and Authorization',
      'The Craft Census: Queries Written',
    ],
  },
  {
    number: 4,
    slug: 'database-design-and-er-modeling',
    title: 'Database Design and E-R Modeling',
    summary:
      'Design before typing: the entity-relationship model (entities, attributes, relationships with cardinality), the design process\u2019 honest workflow, mapping cardinalities and participation, reducing E-R diagrams to relations (the conversion craft), and the design-issues census where the honest tradeoffs live.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The E-R Model and Cardinality',
      'Reducing Diagrams to Relations',
      'The Design-Issues Census',
    ],
  },
  {
    number: 5,
    slug: 'normalization',
    title: 'Normalization',
    summary:
      'Why some tables lie: the anomaly census priced on a badly designed relation, functional dependencies with the closure and candidate-key craft (Armstrong\u2019s axioms), the normal-form ladder (1NF through BCNF with the decomposition discipline), the multivalued-and-4NF echo, and the honest question — when to stop normalizing.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anomaly Census',
      'Functional Dependencies and Closure',
      'The Normal-Form Ladder',
      'When to Stop Normalizing',
    ],
  },
  {
    number: 6,
    slug: 'storage-and-indexing',
    title: 'Storage and Indexing',
    summary:
      'The disk-scale structures: physical storage media and the page discipline, file and record organization, the B+ tree index PROVED as the structure disk wants (insertion/deletion traced, the height arithmetic), ordered versus hashed indexing, and the write-optimized structures named (the LSM echo).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Page Discipline',
      'B+ Trees: the Structure Disk Wants',
      'Ordered versus Hashed Indexing',
    ],
  },
  {
    number: 7,
    slug: 'query-processing-and-optimization',
    title: 'Query Processing and Optimization',
    summary:
      'Making queries fast without lying: the operator census\u2019 costs (the join algorithms compared — nested loop, block, hash), the evaluation pipeline, and the optimizer\u2019s transformation rules with cost-based plan selection (the census of equivalences that keep semantics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Operator Cost Census',
      'Join Algorithms Compared',
      'The Optimizer\u2019s Transformation Rules',
    ],
  },
  {
    number: 8,
    slug: 'transactions-and-concurrency-control',
    title: 'Transactions and Concurrency Control',
    summary:
      'The all-or-nothing contract: ACID defined honestly with each letter priced, serializability as the correctness theory (precedence graphs), the lock discipline (two-phase locking PROVED sufficient), timestamp ordering and MVCC named, and isolation levels as the real-world compromise.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'ACID, Priced Letter by Letter',
      'Serializability and Precedence Graphs',
      'Two-Phase Locking, Proved Sufficient',
      'Isolation Levels: the Compromise',
    ],
  },
  {
    number: 9,
    slug: 'recovery-and-the-transaction-log',
    title: 'Recovery and the Transaction Log',
    summary:
      'Surviving the crash: the log as the story that outlives the data (write-ahead logging stated), checkpoints and the recovery discipline (redo/undo traced through a worked crash), and the distributed echo — two-phase commit named with Distributed Systems as the doorstep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Log Outlives the Data',
      'Recovery Traced Through a Crash',
      'Two-Phase Commit, Named',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The database on one page (model → SQL → design → storage → transactions with the contracts beside), the craft census (SQL writing, FD closure, B+ arithmetic, serializability at gate-exam level), and the doorsteps — Big Data Engineering takes the post-relational scale, Backend Engineering the application craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Database on One Page',
      'The Craft Census',
      'The Doorsteps: Scale and Application',
    ],
  },
]

export const databaseManagementSystems: Book = {
  id: 'database-management-systems',
  title: 'Database Management Systems',
  subtitle: 'From the relational idea to the transaction that survives the crash',
  discipline: 'computer-science',
  level: 'First database course → the internals doorstep',
  description:
    'The Silberschatz-Korth arc on the shelf. The database idea and its engine census; the relational model with the algebra PROVED; SQL from the basic structure through aggregation, subqueries, views and authorization with a query-writing craft census; E-R modeling and the reduction craft; normalization — the anomaly census, FD closure with Armstrong\u2019s axioms, the normal-form ladder and the when-to-stop honesty; storage and indexing with B+ trees traced and the height arithmetic; query processing — join algorithms compared and the optimizer\u2019s transformations; transactions — ACID priced, serializability, two-phase locking PROVED, isolation levels; recovery — the write-ahead log traced through a worked crash, two-phase commit named. Cross-references Set Theory and Mathematical Logic (the algebra\u2019s mathematics); hands off to Big Data Engineering and Backend Engineering.',
  status: 'planned',
  accent: ['#0e7490', '#155e75'],
  chapters,
}
