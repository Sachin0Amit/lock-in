/**
 * build_enhancement_pointer.ts — (re)builds docs/project/ENHANCEMENT_POINTER.json
 * from the live book data: the ordered visual-upgrade queue of every lesson
 * in chapters already COMPLETE and verified, oldest lessons first. The
 * chapter currently in flight per RESUME_POINTER.json is OFF-LIMITS and
 * excluded. Statuses ('done' / 'reviewed-no-op') of existing entries are
 * preserved across rebuilds.
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { foundationMathematics } from '../src/data/library/books/mathematics/foundation-mathematics/book'
import { arithmeticNumberSystems } from '../src/data/library/books/mathematics/arithmetic-number-systems/book'

const pointerPath = 'docs/project/ENHANCEMENT_POINTER.json'

// chapter in flight (from RESUME_POINTER.json nextUnit) — excluded from the queue
const resume = JSON.parse(readFileSync('docs/project/RESUME_POINTER.json', 'utf8'))
const inFlightBook = resume?.nextUnit?.book ?? null
const inFlightChapter = resume?.nextUnit?.chapter ?? null
const inFlightTitle = resume?.nextUnit?.chapterTitle ?? null

const prev = existsSync(pointerPath) ? JSON.parse(readFileSync(pointerPath, 'utf8')) : null
const prevStatus = new Map<string, string>()
if (prev?.queue) for (const q of prev.queue) prevStatus.set(q.id, q.status)

type Entry = { id: string; book: string; chapter: number; number: string; title: string; status: string }
const queue: Entry[] = []
for (const book of [foundationMathematics, arithmeticNumberSystems]) {
  for (const ch of book.chapters) {
    // skip chapters not yet complete
    if (ch.status !== 'complete') continue
    // skip the chapter currently in flight (match on book id + chapter number)
    if (book.id === inFlightBook && (ch.number === inFlightChapter || ch.title === inFlightTitle)) continue
    for (const l of ch.lessons) {
      queue.push({
        id: l.id,
        book: book.id,
        chapter: ch.number,
        number: l.number,
        title: l.title,
        status: prevStatus.get(l.id) ?? 'pending-review',
      })
    }
  }
}

const out = {
  updated: new Date().toISOString().slice(0, 10),
  purpose:
    'Visual-upgrade job queue (job 507527, hourly :15): every lesson of chapters already COMPLETE and verified, oldest first. The chapter job (job 507529, odd-hour :45) owns RESUME_POINTER.json/PROGRESS.json/WORK_INVENTORY.json/DETAILED_LOG.md — never write those from this job. One lesson hands-on per run; lessons audited and needing nothing are marked reviewed-no-op.',
  queue,
  lastDone: prev?.lastDone ?? null,
}
writeFileSync(pointerPath, JSON.stringify(out, null, 1) + '\n')
console.log(`queue rebuilt: ${queue.length} lessons, ${queue.filter((q) => q.status !== 'pending-review').length} processed`)
console.log('head of queue:', queue.slice(0, 3).map((q) => `${q.number} ${q.id} [${q.status}]`).join(' | '))
