/**
 * audit-bot target picker — walks allBooks in index.ts order, flattens
 * chapters.lessons, and reports each written lesson with its figure count,
 * cross-referenced against FIGURE_AUDIT_QUEUE.json status. Prints the first
 * written lesson NOT yet done in the queue (the audit bot's next target),
 * plus the overall census.
 */
import { allBooks } from '../src/data/library/index'

interface QueueItem {
  lessonId: string
  bookId?: string
  figures?: number
  status?: string
}

const queue: QueueItem[] = JSON.parse(
  await Bun.file('docs/project/FIGURE_AUDIT_QUEUE.json').text(),
).items ?? []

const byId = new Map(queue.map((i) => [i.lessonId, i]))

let written = 0
let unwritten = 0
const flat: { bookId: string; lessonId: string; number: string; figs: number; words: number; status: string }[] = []

for (const book of allBooks) {
  for (const ch of book.chapters) {
    for (const l of ch.lessons) {
      const figs = l.blocks.filter((b) => b.kind === 'figure').length
      const exercises = l.blocks.filter((b) => b.kind === 'exercises').length
      const examples = l.blocks.filter((b) => b.kind === 'example').length
      const solFigs = l.blocks.reduce((n, b) => {
        if (b.kind === 'exercises')
          return n + b.sets.reduce((m, s) => m + s.questions.reduce((k, q) => k + (q.figures?.length ?? 0), 0), 0)
        if (b.kind === 'example') return n + (b.figures?.length ?? 0)
        return n
      }, 0)
      if (l.blocks.length === 0) {
        unwritten++
        continue
      }
      written++
      const st = byId.get(l.id)?.status ?? (figs > 0 ? 'not-in-queue' : 'no-figures')
      flat.push({
        bookId: book.id,
        lessonId: l.id,
        number: l.number,
        figs,
        words: 0,
        status: figs > 0 && st === 'no-figures' ? 'not-in-queue' : st,
      })
      void exercises
      void examples
      void solFigs
    }
  }
}

console.log(`census: ${allBooks.length} books, ${written} written lessons, ${unwritten} unwritten (skipped)`)
const pending = flat.find((l) => l.status !== 'done')
console.log('\n=== NEXT TARGET (first written lesson not done in queue) ===')
if (pending) {
  console.log(JSON.stringify(pending, null, 2))
} else {
  console.log('ALL queue items done — fall back to first written lesson')
}
console.log('\n=== first 12 written lessons with status ===')
for (const l of flat.slice(0, 12)) console.log(`${l.status.padEnd(14)} ${l.number.padEnd(5)} ${l.lessonId} figs=${l.figs}`)
