/**
 * dump_global_topics.ts — the 2026-11-17 swarm-reorganisation pass's layer 0:
 * dumps the WHOLE library's planning surface (every book → every chapter →
 * every written lesson id/title + every planned lesson title) to
 * scripts/ledger_data_working/reorg/global_topic_index.json so the
 * deterministic detector and the per-discipline swarm agents share one
 * frozen, complete view of the registry.
 *
 * Recreated verbatim after a swarm agent's mid-flight `git clean` wiped the
 * untracked early-pipeline scripts (the pass state itself survived on disk).
 *
 * Run: bun scripts/dump_global_topics.ts
 */
import { allBooks } from '../src/data/library'

const dump = allBooks.map((b) => ({
  id: b.id,
  title: b.title,
  subtitle: b.subtitle ?? '',
  discipline: b.discipline,
  status: b.status,
  level: b.level,
  description: b.description,
  chapters: b.chapters.map((c) => ({
    number: c.number,
    slug: c.slug,
    title: c.title,
    status: c.status,
    summary: c.summary,
    written: c.lessons.map((l) => ({ id: l.id, number: l.number, title: l.title })),
    planned: c.plannedLessons ?? [],
  })),
}))

let totCh = 0
let totWritten = 0
let totPlanned = 0
for (const b of dump) {
  totCh += b.chapters.length
  for (const c of b.chapters) {
    totWritten += c.written.length
    totPlanned += c.planned.length
  }
}

await Bun.write(
  'scripts/ledger_data_working/reorg/global_topic_index.json',
  JSON.stringify(dump, null, 1),
)
console.log(
  `dumped ${dump.length} books / ${totCh} chapters / ${totWritten} written / ${totPlanned} planned -> scripts/ledger_data_working/reorg/global_topic_index.json`,
)
