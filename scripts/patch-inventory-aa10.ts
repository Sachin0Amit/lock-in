/*
 * patch-inventory-aa10.ts — RUN 123 ledger patch: update the AA book entry
 * in docs/project/WORK_INVENTORY.json from the LIVE registry (the full
 * builder needs the gitignored Drive-survey inventory.json, wiped between
 * runs; this patch touches only the advanced-algebra entry, in the same
 * entry shape build_work_inventory.ts emits).
 * Run: cd /home/z/my-project && bun run scripts/patch-inventory-aa10.ts
 */
import { chapter10 } from '../src/data/library/books/mathematics/advanced-algebra/ch-10'
import { advancedAlgebra } from '../src/data/library/books/mathematics/advanced-algebra/book'
import { countLessonWords } from '../src/data/library/types'
import type { Lesson } from '../src/data/library/types'
import { readFileSync, writeFileSync } from 'node:fs'

const ROOT = '/home/z/my-project'
const INV = `${ROOT}/docs/project/WORK_INVENTORY.json`

type AnyRec = Record<string, unknown>
const inv = JSON.parse(readFileSync(INV, 'utf8')) as AnyRec
const books = (inv.content as AnyRec).books as AnyRec[]
const aa = books.find((b) => b.id === 'advanced-algebra') as AnyRec

function lessonEntry(l: Lesson, authoredOn: string): AnyRec {
  const blockCounts: Record<string, number> = {}
  const calloutTones: Record<string, number> = {}
  const exercisesByLevel: Record<string, number> = {}
  let quizItems = 0
  let exerciseQuestions = 0
  let termsDefined = 0
  for (const b of l.blocks as Array<AnyRec>) {
    blockCounts[String(b.kind)] = (blockCounts[String(b.kind)] ?? 0) + 1
    if (b.kind === 'callout') calloutTones[String(b.tone)] = (calloutTones[String(b.tone)] ?? 0) + 1
    if (b.kind === 'quiz') quizItems = (b.items as unknown[]).length
    if (b.kind === 'exercises') {
      for (const s of b.sets as Array<AnyRec>) {
        exercisesByLevel[String(s.level)] = (s.questions as unknown[]).length
        exerciseQuestions += (s.questions as unknown[]).length
      }
    }
    if (b.kind === 'terms') termsDefined = (b.items as unknown[]).length
  }
  return {
    id: l.id,
    number: l.number,
    title: l.title,
    authoredOn,
    authoredInCommit: 'pending (run 123, ships in this commit)',
    unit: 'chapter 10 (run 122 preserved + run 123 finished/authored)',
    words: countLessonWords(l),
    readMins: Math.max(9, Math.round(countLessonWords(l) / 200)),
    concepts: l.concepts,
    objectives: l.objectives ?? [],
    prerequisites: l.prerequisites,
    sources: l.sources,
    blockCounts,
    calloutTones,
    quizItems,
    exercisesByLevel,
    exerciseQuestions,
    termsDefined,
  }
}

const today = '2026-11-25'
const ch10Entry = (aa.chapters as AnyRec[]).find((c) => Number(c.number) === 10) as AnyRec
ch10Entry.status = 'complete'
ch10Entry.lessonsWritten = 5
ch10Entry.plannedLessons = []
ch10Entry.lessons = chapter10.lessons.map((l) => lessonEntry(l, today))
ch10Entry.words = chapter10.lessons.reduce((n, l) => n + countLessonWords(l), 0)

aa.status = 'complete'
aa.chaptersWritten = 10

writeFileSync(INV, JSON.stringify(inv, null, 2) + '\n')
console.log(`AA inventory patched: status complete, chaptersWritten 10, ch10 ${ch10Entry.lessonsWritten} lessons / ${ch10Entry.words} words`)
