/* count-words-fire.ts — §10.3 doc-sync helper: honest recomputation of the
 * count fields PROGRESS.json tracks for the books this figure-audit +
 * enrichment fire touched (FM, AL). Uses countLessonWords from the real
 * registry code path. Usage: bun run scripts/count-words-fire.ts */
import { countLessonWords } from '../src/data/library/types'
import * as fmBook from '../src/data/library/books/mathematics/foundation-mathematics/book'

type Lesson = { id: string; blocks: unknown[]; words?: number; concepts?: string[] }
type Chapter = { lessons: Lesson[] }

function collect(mod: Record<string, unknown>): Lesson[] {
  const out: Lesson[] = []
  for (const k of Object.keys(mod)) {
    const v = mod[k]
    if (v && typeof v === 'object' && Array.isArray((v as { chapters?: Chapter[] }).chapters)) {
      for (const ch of (v as { chapters: Chapter[] }).chapters) out.push(...ch.lessons)
    }
  }
  return out
}

const fmLessons = collect(fmBook as unknown as Record<string, unknown>)
const words = fmLessons.reduce((n, l) => n + countLessonWords(l as never), 0)
const terms = fmLessons.reduce((n, l) => n + (l.blocks as { kind: string; items: unknown[] }[]).filter(b => b.kind === 'terms').reduce((m, b) => m + b.items.length, 0), 0)
const exercises = fmLessons.reduce((n, l) => n + (l.blocks as { kind: string; sets: { questions: unknown[] }[] }[]).filter(b => b.kind === 'exercises').reduce((m, b) => m + b.sets.reduce((s, x) => s + x.questions.length, 0), 0), 0)
const quiz = fmLessons.reduce((n, l) => n + (l.blocks as { kind: string; items: unknown[] }[]).filter(b => b.kind === 'quiz').reduce((m, b) => m + b.items.length, 0), 0)
console.log(JSON.stringify({ fm: { lessons: fmLessons.length, words, terms, exercises, quiz } }))

// AL
import * as alBook from '../src/data/library/books/mathematics/elementary-algebra/book'
const alLessons = collect(alBook as unknown as Record<string, unknown>)
const alWords = alLessons.reduce((n, l) => n + countLessonWords(l as never), 0)
const alExercises = alLessons.reduce((n, l) => n + (l.blocks as { kind: string; sets: { questions: unknown[] }[] }[]).filter(b => b.kind === 'exercises').reduce((m, b) => m + b.sets.reduce((s, x) => s + x.questions.length, 0), 0), 0)
const alTerms = alLessons.reduce((n, l) => n + (l.blocks as { kind: string; items: unknown[] }[]).filter(b => b.kind === 'terms').reduce((m, b) => m + b.items.length, 0), 0)
console.log(JSON.stringify({ al: { lessons: alLessons.length, words: alWords, terms: alTerms, exercises: alExercises } }))
