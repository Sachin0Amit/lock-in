#!/usr/bin/env bun
/**
 * build_figure_audit_queue.ts — LockIn Library
 *
 * Builds / refreshes docs/project/FIGURE_AUDIT_QUEUE.json — the shelf-wide
 * strict-audit queue of FIGURE VERIFICATION PROTOCOL §6
 * (docs/project/FIGURE_VERIFICATION_PROTOCOL.md).
 *
 * - walks every lesson of every registered book and counts `kind: 'figure'`
 *   blocks (one inline SVG each; AI-image figures land here too once they
 *   exist, via their SVG wrapper);
 * - orders the PRE-WRITTEN books first (owner directive 2026-11-11:
 *   "for already prewritten books"): foundation-mathematics ->
 *   arithmetic-and-number-systems -> arithmetic-number-systems ->
 *   elementary-algebra, then every other book in library registration order
 *   (books still being authored get their per-lesson §4 pipeline from the
 *   authoring fires anyway — the queue tail is bonus coverage);
 * - PRESERVES progress: statuses / lastAudited / notes of items already in
 *   the queue file are merged in, so re-running after new lessons never
 *   wipes the audit trail (delete the file only to force a fresh build);
 * - seeds the lessons already VLM-audited PASS per FIGURE_AUDIT_LOG.md.
 *
 * Usage: cd /home/z/my-project && bun run scripts/build_figure_audit_queue.ts
 */
import { allBooks } from '../src/data/library'

const ROOT = '/home/z/my-project'
const OUT = `${ROOT}/docs/project/FIGURE_AUDIT_QUEUE.json`

/** the pre-written books come first (owner directive 2026-11-11) */
const PREWRITTEN = [
  'foundation-mathematics',
  'arithmetic-and-number-systems',
  'arithmetic-number-systems',
  'elementary-algebra',
]

/** lessons already strictly VLM-audited PASS (FIGURE_AUDIT_LOG.md, 2026-11-11) */
const SEED_DONE: Record<string, string> = {
  'ans-square-and-cube-root-crafts': 'VLM strict PASS (audit turn: gnomon + division panel, 2 clipping catches fixed)',
  'aa-relations-the-set-of-pairs-view': 'VLM strict PASS (run 90: arrow diagram + mod-5 classes)',
  'aa-one-one-and-onto-classifying-the-machines': 'VLM strict PASS (run 90: probe twins + pigeonhole panel)',
  'aa-composition-machines-in-series': 'VLM strict PASS (run 91, 4 passes: conveyor + inheritance wirings)',
  'aa-inverse-functions-the-machine-undone': 'VLM strict PASS (run 91: three-panel verdict rebuilt honestly + mirror)',
}

interface Item {
  lessonId: string
  bookId: string
  chapter: number
  figures: number
  status: 'pending' | 'done'
  lastAudited?: string
  note?: string
}

/* existing queue (progress preservation) */
const prev = new Map<string, Item>()
try {
  const old = (await Bun.file(OUT).json()) as { items?: Item[] }
  for (const it of old.items ?? []) prev.set(it.lessonId, it)
} catch {
  /* first build */
}

const rank = (id: string): number => {
  const i = PREWRITTEN.indexOf(id)
  return i === -1 ? PREWRITTEN.length : i
}
const books = [...allBooks].sort((a, b) => rank(a.id) - rank(b.id))

const items: Item[] = []
let figureTotal = 0
let lessonsWithFigures = 0
for (const book of books) {
  for (const ch of book.chapters) {
    for (const lesson of ch.lessons) {
      const figures = lesson.blocks.filter((b) => b.kind === 'figure').length
      if (figures === 0) continue
      figureTotal += figures
      lessonsWithFigures++
      const prior = prev.get(lesson.id)
      const seed = SEED_DONE[lesson.id]
      const status: 'pending' | 'done' = prior?.status === 'done' || seed ? 'done' : 'pending'
      const note = prior?.note ?? seed
      items.push({
        lessonId: lesson.id,
        bookId: book.id,
        chapter: ch.number,
        figures,
        status,
        ...(status === 'done'
          ? { lastAudited: prior?.lastAudited ?? '2026-11-11', ...(note ? { note } : {}) }
          : {}),
      })
    }
  }
}

const done = items.filter((i) => i.status === 'done').length
const firstPending = items.findIndex((i) => i.status === 'pending')
const queue = {
  updated: new Date().toISOString().slice(0, 10),
  protocol: 'docs/project/FIGURE_VERIFICATION_PROTOCOL.md',
  order: 'pre-written books first (owner directive 2026-11-11), then library registration order',
  cursor: firstPending === -1 ? items.length : firstPending,
  stats: { lessonsWithFigures, figureTotal, done, pending: items.length - done },
  items,
}
await Bun.write(OUT, JSON.stringify(queue, null, 2) + '\n')
console.log(`figure audit queue: ${items.length} lessons / ${figureTotal} figures (${done} done, ${items.length - done} pending) -> ${OUT}`)
for (const b of PREWRITTEN) {
  const n = items.filter((i) => i.bookId === b)
  if (n.length) console.log(`  ${b}: ${n.length} lessons, ${n.reduce((a, i) => a + i.figures, 0)} figures`)
}
for (const b of books) {
  if (PREWRITTEN.includes(b.id)) continue
  const n = items.filter((i) => i.bookId === b.id)
  if (n.length) console.log(`  ${b.id}: ${n.length} lessons, ${n.reduce((a, i) => a + i.figures, 0)} figures`)
}
