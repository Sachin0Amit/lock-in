/**
 * Revision & Mastery — the recall-card engine (server only).
 *
 * Cuts retrieval-practice cards from the lesson's OWN authored blocks:
 * glossary terms, formula cards, worked examples, quiz items and
 * exercises. This closes the loop the guided session was missing — the
 * learner now retrieves real content before rating, instead of rating
 * blind on a chapter title.
 *
 * Honest-data rules (same spirit as the ledger service):
 *  - cards are verbatim cuts of authored content — no paraphrasing, no
 *    generation, nothing invented;
 *  - selection is DETERMINISTIC (stable order, round-robin over kinds
 *    and — for chapter decks — over lessons): the same item always
 *    yields the same deck, so a re-run session tests the same material;
 *  - every card carries its source lesson and URL so the UI can offer
 *    "open the material" without any lookup table.
 */
import { CATALOG } from '@/lib/builder/catalog'
import { findLesson, paths } from '@/data/library/index'
import type { Lesson } from '@/data/library/types'
import type { RecallCard, RecallDeck } from './types'

/* ------------------------------------------------------------------ */
/* Caps — keep the session snappy; a card is a prompt, not a re-read    */
/* ------------------------------------------------------------------ */

const CARD_BUDGET = 4
const TERM_DEF_CAP = 300
const EXAMPLE_STEP_CAP = 6
const EXERCISE_STEP_CAP = 3

function clip(s: string, cap: number): string {
  const t = s.trim()
  return t.length <= cap ? t : `${t.slice(0, cap - 1).trimEnd()}…`
}

/* ------------------------------------------------------------------ */
/* One lesson → its card pools, in honest priority order              */
/* ------------------------------------------------------------------ */

interface LessonPools {
  quiz: RecallCard[]
  term: RecallCard[]
  formula: RecallCard[]
  example: RecallCard[]
  exercise: RecallCard[]
}

function lessonPools(lesson: Lesson, bookId: string): LessonPools {
  const base = {
    lessonId: lesson.id,
    sourceLabel: `${lesson.number} · ${lesson.title}`,
    sourceUrl: paths.lesson(bookId, lesson.id),
  }

  const quiz: RecallCard[] = []
  const term: RecallCard[] = []
  const formula: RecallCard[] = []
  const example: RecallCard[] = []
  const exercise: RecallCard[] = []

  for (const block of lesson.blocks) {
    switch (block.kind) {
      case 'terms':
        for (const t of block.items) {
          term.push({
            ...base,
            kind: 'term',
            prompt: `Define: ${t.term}`,
            reveal: clip(t.def, TERM_DEF_CAP),
          })
        }
        break
      case 'formula':
        formula.push({
          ...base,
          kind: 'formula',
          prompt: `Recall the formula: ${block.name}`,
          reveal: `$${block.latex}$`,
          ...(block.note ? { revealLines: [block.note] } : {}),
        })
        break
      case 'quiz':
        for (const item of block.items) {
          quiz.push({
            ...base,
            kind: 'quiz',
            prompt: item.q,
            reveal: item.options[item.answer] ?? '',
            options: item.options,
            answer: item.answer,
            explain: item.explain,
          })
        }
        break
      case 'example':
        example.push({
          ...base,
          kind: 'example',
          prompt: block.title,
          reveal: clip(block.steps[0] ?? '', TERM_DEF_CAP),
          revealLines: block.steps.slice(0, EXAMPLE_STEP_CAP).map((s) => clip(s, TERM_DEF_CAP)),
        })
        break
      case 'exercises':
        /* one card per exercise set — the first question only, so the
         * card stays a prompt instead of becoming a full sitting */
        for (const set of block.sets) {
          const q = set.questions[0]
          if (!q) continue
          const steps = Array.isArray(q.solution) ? q.solution : [q.solution]
          const lines = steps.slice(0, EXERCISE_STEP_CAP).map((s) => clip(s, TERM_DEF_CAP))
          if (q.answer) lines.push(clip(q.answer, TERM_DEF_CAP))
          exercise.push({
            ...base,
            kind: 'exercise',
            prompt: q.q,
            reveal: lines[0] ?? '',
            revealLines: lines,
          })
        }
        break
      default:
        break
    }
  }

  return { quiz, term, formula, example, exercise }
}

/**
 * Interleave the pools into one ordered candidate list: quiz → term →
 * formula → example → exercise, then second rounds. Quiz first because
 * an answerable card is the strongest recall evidence; terms and
 * formulas next because they are the vocabulary of the topic.
 */
function orderedCandidates(p: LessonPools): RecallCard[] {
  const pools: RecallCard[][] = [p.quiz, p.term, p.formula, p.example, p.exercise]
  const out: RecallCard[] = []
  const maxLen = Math.max(0, ...pools.map((pool) => pool.length))
  for (let round = 0; round < maxLen; round++) {
    for (const pool of pools) if (pool[round]) out.push(pool[round])
  }
  return out
}

/* ------------------------------------------------------------------ */
/* Decks                                                               */
/* ------------------------------------------------------------------ */

/** A single-lesson deck — the item IS the lesson. */
function lessonDeck(refId: string): RecallDeck | null {
  const ref = findLesson(refId)
  if (!ref) return null
  const cards = orderedCandidates(lessonPools(ref.lesson, ref.book.id)).slice(0, CARD_BUDGET)
  return { scope: 'lesson', refId, cards }
}

/**
 * A chapter deck — cards are drawn round-robin across the chapter's
 * written lessons, so a full chapter is sampled instead of only its
 * first lesson. Deterministic: same chapter, same sample.
 */
function chapterDeck(refId: string): RecallDeck | null {
  const ch = CATALOG.chapterByKey.get(refId)
  if (!ch) return null
  const refs = ch.lessonRecordIds
    .map((id) => findLesson(id))
    .filter((r): r is NonNullable<ReturnType<typeof findLesson>> => r !== undefined)
  if (refs.length === 0) return null

  /* each lesson's ordered candidates, walked in parallel — one card per
   * lesson per pass, until the budget is spent */
  const columns = refs.map((r) => orderedCandidates(lessonPools(r.lesson, r.book.id)))
  const cards: RecallCard[] = []
  const maxLen = Math.max(0, ...columns.map((c) => c.length))
  for (let round = 0; round < maxLen && cards.length < CARD_BUDGET; round++) {
    for (const column of columns) {
      if (cards.length >= CARD_BUDGET) break
      if (column[round]) cards.push(column[round])
    }
  }
  return { scope: 'chapter', refId, cards }
}

/** Build the recall deck for a queue item; null when the scope/id is unknown. */
export function buildRecallDeck(scope: 'chapter' | 'lesson', refId: string): RecallDeck | null {
  return scope === 'chapter' ? chapterDeck(refId) : lessonDeck(refId)
}
