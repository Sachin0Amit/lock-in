/**
 * Practice — question extraction (server-side).
 *
 * Walks the written Main Academic Library once per server process and
 * flattens every quiz item and exercise question into ONE normalized
 * PracticeQuestion pool. Nothing is authored, nothing is copied from
 * outside sources — the papers are re-combinations of the library's own
 * questions, referenced by stable keys shared with the Mistake Bank:
 *   quiz     `${lessonId}#q<blockIndex>.<itemIndex>`
 *   exercise `${lessonId}#x<blockIndex>.<setIndex>.<questionIndex>`
 */
import { allLessons } from '@/data/library/index'
import type { Lesson } from '@/data/library/types'
import type { PracticeQuestion } from './types'

function questionsOfLesson(
  bookId: string,
  bookTitle: string,
  chapterKey: string,
  chapterNumber: number,
  chapterTitle: string,
  lesson: Lesson,
): PracticeQuestion[] {
  const out: PracticeQuestion[] = []
  const base = {
    lessonId: lesson.id,
    bookId,
    bookTitle,
    chapterKey,
    chapterNumber,
    chapterTitle,
    lessonNumber: lesson.number,
    lessonTitle: lesson.title,
  }

  lesson.blocks.forEach((b, bi) => {
    if (b.kind === 'quiz') {
      b.items.forEach((item, qi) => {
        out.push({
          ...base,
          id: `${lesson.id}#q${bi}.${qi}`,
          kind: 'mcq',
          prompt: item.q,
          options: item.options,
          answerIndex: item.answer,
          answerText: item.options[item.answer] ?? '',
          explain: item.explain,
        })
      })
    } else if (b.kind === 'exercises') {
      b.sets.forEach((set, si) => {
        set.questions.forEach((q, qi) => {
          const solutionText = Array.isArray(q.solution) ? q.solution.join(' ') : q.solution
          out.push({
            ...base,
            id: `${lesson.id}#x${bi}.${si}.${qi}`,
            kind: 'free',
            level: set.level,
            prompt: q.q,
            answerText: q.answer ?? '',
            explain: solutionText,
            solution: q.solution,
          })
        })
      })
    }
  })
  return out
}

let cache: PracticeQuestion[] | null = null

/** The full normalized pool (memoised — library data is static per build). */
export function allPracticeQuestions(): PracticeQuestion[] {
  if (cache) return cache
  cache = allLessons.flatMap((l) =>
    questionsOfLesson(
      l.book.id,
      l.book.title,
      `${l.book.id}:${l.chapter.number}`,
      l.chapter.number,
      l.chapter.title,
      l.lesson,
    ),
  )
  return cache
}

/** Fast lookup by stable question key. */
export function findPracticeQuestions(ids: readonly string[]): Map<string, PracticeQuestion> {
  const wanted = new Set(ids)
  const out = new Map<string, PracticeQuestion>()
  if (wanted.size === 0) return out
  for (const q of allPracticeQuestions()) {
    if (wanted.has(q.id)) out.set(q.id, q)
    if (out.size === wanted.size) break
  }
  return out
}

export function findPracticeQuestion(id: string): PracticeQuestion | undefined {
  return allPracticeQuestions().find((q) => q.id === id)
}

/** Questions limited to a set of chapter keys (`bookId:chapterNumber`). */
export function questionsInScope(scope: ReadonlySet<string>): PracticeQuestion[] {
  return allPracticeQuestions().filter((q) => scope.has(q.chapterKey))
}
