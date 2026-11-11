/**
 * dump_shelf_census.ts — one-shot dump of every math book's lesson-title
 * census (written lesson titles + plannedLessons), per chapter, so the
 * internet-research gap pass (owner directive 2026-11-11: "use internet
 * research for each book and think of your own if any lesson is missing
 * add it") can diff canonical TOCs against what the shelf actually plans.
 * Output: /tmp/shelf_census.md
 */
import { allBooks } from '../src/data/library'
import { writeFileSync } from 'fs'

const lines: string[] = []
const math = allBooks.filter((b) => b.discipline === 'mathematics')
lines.push(`# Shelf census — ${math.length} math books (${new Date().toISOString().slice(0, 10)})`)
lines.push('')
for (const b of math) {
  const written = b.chapters.reduce((n, c) => n + c.lessons.length, 0)
  const planned = b.chapters.reduce((n, c) => n + (c.plannedLessons?.length ?? 0), 0)
  lines.push(`## ${b.id} — ${b.title} [${b.status}] — ${b.chapters.length} ch / ${written} written / ${planned} planned`)
  for (const c of b.chapters) {
    lines.push(`### ch ${c.number} ${c.title} [${c.status}]`)
    for (const l of c.lessons) lines.push(`- (written) ${l.number} ${l.title}`)
    for (const t of c.plannedLessons ?? []) lines.push(`- (planned) ${t}`)
  }
  lines.push('')
}
writeFileSync('/tmp/shelf_census.md', lines.join('\n'))
console.log(`wrote /tmp/shelf_census.md: ${math.length} books, ${lines.length} lines`)
const totalWritten = math.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.lessons.length, 0), 0)
const totalPlanned = math.reduce((n, b) => n + b.chapters.reduce((m, c) => m + (c.plannedLessons?.length ?? 0), 0), 0)
console.log(`written lessons: ${totalWritten}, plannedLessons: ${totalPlanned}, total: ${totalWritten + totalPlanned}`)
for (const b of math) {
  console.log(`  ${b.id.padEnd(38)} ${b.status.padEnd(11)} ${String(b.chapters.length).padStart(2)} ch`)
}
export {}
