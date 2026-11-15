import type { Book, Chapter } from '../../../types'

/**
 * Big Data Engineering — the thirty-sixth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `bde-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): DBMS owns the relational engine
 * and transaction theory; Distributed Systems owns the coordination
 * theory beneath the frameworks; Cloud Computing owns the rented
 * platform; Data Science owns the analyst\u2019s craft — this book owns the
 * scale-out data pipeline itself.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Hadoop text on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: White, 'Hadoop: The Definitive Guide' 4e
 *   (the O'Reilly TOC — 1 Meet Hadoop; 2 MapReduce; 3 HDFS; 4 YARN;
 *   5 Hadoop I/O; then developing MapReduce applications, operations,
 *   the related-projects part — Pig, Hive, HBase, ZooKeeper, Sqoop —
 *   and case studies) + the modern streaming (Spark/Kafka) arcs.
 * - Exam types: pipeline-design questions + MapReduce trace sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 4 NoSQL line audited — the NoSQL census lesson added. The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-scale-question',
    title: 'The Scale Question',
    summary:
      'When data outgrows the machine: the census priced honestly (what \u0022big\u0022 actually means — the V-diagram\u2019s honest limits), the vertical-versus-horizontal trade (scaling up versus out with the failure economics), and the distribution\u2019s first consequences (the locality law — move compute to data).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'What Big Actually Means',
      'Scaling Up versus Out',
      'The Locality Law',
    ],
  },
  {
    number: 2,
    slug: 'the-mapreduce-idea',
    title: 'The MapReduce Idea',
    summary:
      'The era\u2019s founding abstraction: the map/shuffle/reduce machinery traced through a worked word-count (the phases\u2019 contracts computed), the model\u2019s honesty (what it hides — the fault tolerance and scheduling beneath), the combiner\u2019s craft priced, and the streaming echo derived (why the model generalizes to pipelines).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Machinery Traced Through Word Count',
      'What the Model Hides',
      'The Combiner\u2019s Craft',
    ],
  },
  {
    number: 3,
    slug: 'distributed-storage-and-yarn',
    title: 'Distributed Storage and YARN',
    summary:
      'The substrate: HDFS traced (the block/replication contract — the namenode\u2019s discipline priced on a worked read), the I/O question (the serialization and compression census), and YARN as the resource manager (the cluster\u2019s OS echo — Operating Systems cross-referenced; the container discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'HDFS Traced',
      'The Serialization Census',
      'YARN: the Cluster\u2019s Manager',
    ],
  },
  {
    number: 4,
    slug: 'the-data-warehouse-layer',
    title: 'The Data Warehouse Layer',
    summary:
      'The higher-level engines: Pig\u2019s dataflow discipline named, Hive\u2019s SQL-over-cluster arc priced (the schema-on-read question — DBMS cross-referenced), the warehouse discipline itself (the ETL arc, the star-schema craft), the NoSQL census the scale question forced (key-value, document, column-family and graph stores — what each trades away from the relational contract, querying and indexing them, the cloud echo), and the lakehouse echo named as the modern settlement.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hive\u2019s SQL-over-Cluster Arc',
      'The ETL and Star-Schema Craft',
      'The NoSQL Census: Key-Value, Document, Column, Graph',
      'The Lakehouse Settlement, Named',
    ],
  },
  {
    number: 5,
    slug: 'spark-and-the-in-memory-era',
    title: 'Spark and the In-Memory Era',
    summary:
      'The successor\u2019s bets: the RDD abstraction traced (the lineage discipline — why fault tolerance without replication works), the in-memory bet priced against MapReduce\u2019s disk honesty, the engine family\u2019s census (the SQL/DataFrame and streaming layers), and the DataFrame discipline as the working interface.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lineage Discipline',
      'The In-Memory Bet Priced',
      'The DataFrame Interface',
    ],
  },
  {
    number: 6,
    slug: 'streaming-and-the-real-time-question',
    title: 'Streaming and the Real-Time Question',
    summary:
      'The unbounded data stream: the streaming model\u2019s honesty (the window discipline — tumbling/sliding/session priced on a worked aggregation), the event-time discipline (the watermark idea priced on late data), Kafka\u2019s log contract traced (the partition/offset census), and the exactly-once question answered honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Window Discipline',
      'Kafka\u2019s Log Contract',
      'Exactly-Once, Answered Honestly',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The pipeline on one page (storage → compute → warehouse → streaming with the eras\u2019 strata visible), the craft census (MapReduce traces and pipeline-design questions at exam level), and the doorsteps — Cloud Computing\u2019s rented platform, Data Mining\u2019s pattern families, the ML-platform era named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pipeline on One Page',
      'The Craft Census',
      'The Doorsteps: Platform, Patterns, ML Ops',
    ],
  },
]

export const bigDataEngineering: Book = {
  id: 'big-data-engineering',
  title: 'Big Data Engineering',
  subtitle: 'The scale-out pipeline — from the locality law to the streaming era',
  discipline: 'computer-science',
  level: 'First big-data course → the ML-platform doorstep',
  description:
    'The scale-out home on the Hadoop-Definitive-Guide arc with the modern streaming settlement. The scale question — what big means and the locality law; the MapReduce idea traced through a worked word count with what the model hides; HDFS and YARN as the substrate (the cluster\u2019s manager with the OS echo); the warehouse layer — Hive\u2019s SQL-over-cluster, the ETL and star-schema craft, the lakehouse settlement; Spark\u2019s in-memory bets (the lineage discipline priced); streaming — the window and watermark discipline with Kafka\u2019s log contract and the exactly-once honesty; and the pipeline map with its eras. Cross-references DBMS, Distributed Systems, Operating Systems and Cloud Computing; hands off to Data Mining and the ML-platform era.',
  status: 'planned',
  accent: ['#b45309', '#92400e'],
  chapters,
}
