/**
 * audit-bot-census-sync.ts — §10.3 doc sync for THIS fire's layout (repo at
 * /home/z/my-project/lock-in; the repo's own ROOT=/home/z/my-project helpers
 * assume the main AI's layout and write outside the repo here).
 * Updates: WORK_INVENTORY.json (lesson words/readMins + generated date),
 * PROGRESS.json (updated date + recomputed words totals + FM notes append),
 * FIGURE_AUDIT_QUEUE.json (fm-patterns-and-rules done, figures 3, cursor 46).
 * Recomputed counts ONLY — phase/plan/status fields untouched.
 * Usage: bun run scripts/audit-bot-census-sync.ts
 */
import { findLesson, libraryStats } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'

const ROOT = '/home/z/my-project/lock-in'
const LESSON_ID = 'fm-patterns-and-rules'

const ref = findLesson(LESSON_ID)
if (!ref) throw new Error(`lesson ${LESSON_ID} not found`)
const words = ref.lesson.words ?? countLessonWords(ref.lesson)
const readMins = Math.max(1, Math.round(words / 200))
console.log(`${LESSON_ID}: words=${words} readMins=${readMins}`)

const stats = libraryStats()
console.log(`library: written=${stats.written} words=${stats.words} terms=${stats.terms}`)

/* ---- WORK_INVENTORY.json ---- */
const wiPath = `${ROOT}/docs/project/WORK_INVENTORY.json`
const wi = JSON.parse(await Bun.file(wiPath).text())
const fm11 = wi.content.books[0].chapters[10].lessons[0]
if (fm11.id !== LESSON_ID) throw new Error(`WORK_INVENTORY lesson mismatch: ${fm11.id}`)
fm11.words = words
fm11.readMins = readMins
wi.generated = '2026-11-15'
await Bun.write(wiPath, JSON.stringify(wi, null, 2) + '\n')
console.log(`WORK_INVENTORY: ${LESSON_ID} words -> ${words}; generated -> 2026-11-15`)

/* ---- PROGRESS.json (recomputed counts + updated only) ---- */
const prPath = `${ROOT}/docs/project/PROGRESS.json`
const pr = JSON.parse(await Bun.file(prPath).text())
pr.updated = '2026-11-15'
pr.library.wordsAuthored = stats.words
pr.library.totals.words = stats.words
const fm = pr.library.books[0]
if (fm.id !== 'foundation-mathematics') throw new Error(`PROGRESS book mismatch: ${fm.id}`)
fm.notes += ' Audit-bot fire (2026-11-15, job 530242): 11.1 gained the dot-triangle body figure + read-the-picture para (the triangular numbers\' missing figure), 7 solution visual aids (matchstick row n=5, number-line gap walk, the circle game at six points with 31 regions certified, handshake graphs 4/5/6, the x2+1 arrow chain, the 6x6 gnomon L-stack, the 10->15 triangle panel), one new L2 exercise, and figure 1\'s +3 tags moved above the newest squares (VLM nit, re-pinned K3/K4); verify-unit-11 extended 187->201 (section AM) ALL PASS pre-writing.'
await Bun.write(prPath, JSON.stringify(pr, null, 2) + '\n')
console.log(`PROGRESS: updated -> 2026-11-15; words -> ${stats.words}; FM notes appended`)

/* ---- FIGURE_AUDIT_QUEUE.json (progress-preserving hand update) ---- */
const qPath = `${ROOT}/docs/project/FIGURE_AUDIT_QUEUE.json`
const q = JSON.parse(await Bun.file(qPath).text())
const item = q.items.find((i: { lessonId: string }) => i.lessonId === LESSON_ID)
if (!item) throw new Error(`queue item for ${LESSON_ID} not found`)
item.status = 'done'
item.figures = 3 // body figure blocks now: matchstick + dot-triangles + gnomon
item.doneOn = '2026-11-15'
item.doneBy = 'audit-bot fire (job 530242, §10 passes A/B/C)'
q.updated = '2026-11-15'
q.cursor = 46 // advance past this lesson
await Bun.write(qPath, JSON.stringify(q, null, 2) + '\n')
console.log(`queue: ${LESSON_ID} done (3 body figures); cursor -> 46`)

console.log('census sync complete.')
