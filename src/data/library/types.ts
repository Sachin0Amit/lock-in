/**
 * LockIn Library — Content Model
 * =================================
 * The single source of truth for how every textbook in this platform is
 * authored. Books are plain TypeScript data: serialisable, type-checked,
 * version-controlled and rendered by the lesson reader.
 *
 * AUTHORING RULES (see docs/project/BOOK_FORMAT.md for the full guide):
 *  - One file per chapter: src/data/library/books/<discipline>/<book>/<NN>-<slug>.ts
 *  - Lesson ids are kebab-case, globally unique, and stable FOREVER
 *    (they are persisted in readers' progress, bookmarks and notes).
 *  - Inline math inside any `text`/`def`/`q`/`steps` string uses $...$
 *    (rendered with KaTeX). Display equations use the `equation` block.
 *  - Figures are self-contained inline SVG with a viewBox; labels must use
 *    the exact terminology of the surrounding prose.
 *  - Never fabricate formulas, history, or examination questions.
 *    Exam-style items must be labelled "exam-style", not as real past paper
 *    questions, unless verified against an official source.
 */

/* ------------------------------------------------------------------ */
/* Discipline / book organisation                                      */
/* ------------------------------------------------------------------ */

export type DisciplineId =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'computer-science'
  | 'engineering'
  | 'medical-sciences'
  | 'biology'
  | 'economics-commerce'
  | 'humanities'
  | 'languages'
  | 'arts-music'

export interface Discipline {
  id: DisciplineId
  title: string
  blurb: string
  /** lucide-react icon component name, resolved by the UI */
  icon: string
}

export type BookStatus = 'planned' | 'in-progress' | 'complete'

export type DifficultyLevel =
  | 'L1' // Beginner
  | 'L2' // Intermediate
  | 'L3' // Advanced
  | 'L4' // Competitive examination
  | 'L5' // University / professional
  | 'L6' // Research / olympiad

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  L1: 'Level 1 · Beginner',
  L2: 'Level 2 · Intermediate',
  L3: 'Level 3 · Advanced',
  L4: 'Level 4 · Competitive exam',
  L5: 'Level 5 · University / professional',
  L6: 'Level 6 · Research / olympiad',
}

export interface Book {
  /** kebab-case, unique across the library, stable forever */
  id: string
  title: string
  subtitle?: string
  discipline: DisciplineId
  /** human-readable academic level range, e.g. "Absolute beginner → Secondary" */
  level: string
  description: string
  status: BookStatus
  /** two colours (any CSS format) used for the generated cover */
  accent: [string, string]
  /** full table of contents; chapters of planned books have empty lessons */
  chapters: Chapter[]
  /** short note on what this book still needs before "complete" */
  notes?: string
}

export interface Chapter {
  number: number
  slug: string
  title: string
  /** one-paragraph statement of what the chapter achieves pedagogically */
  summary: string
  status: BookStatus
  lessons: Lesson[]
  /** titles of lessons not yet written (shown greyed in the TOC as planned) */
  plannedLessons?: string[]
}

export interface Lesson {
  /** kebab-case, globally unique, stable forever — persisted in reader data */
  id: string
  /** display number such as "1.1" */
  number: string
  title: string
  /** 5–8 key concept phrases, used for search + the lesson recap chips */
  concepts: string[]
  /** optional: what the reader should be able to do afterwards */
  objectives?: string[]
  /** optional: ids of lessons the reader should already know (links shown in the reader) */
  prerequisites?: string[]
  /**
   * optional: source citations for this lesson, as keys into
   * docs/project/SOURCE_LOG.md (e.g. "ncert-math-6-en"). Rendered at the
   * lesson footer. Keep nil for purely original exposition.
   */
  sources?: string[]
  blocks: Block[]
  /**
   * approximate prose word count — optional; the registry computes an honest
   * count from the blocks when omitted (see countLessonWords).
   */
  words?: number
}

/* ------------------------------------------------------------------ */
/* Lesson blocks                                                       */
/* ------------------------------------------------------------------ */

export type CalloutTone =
  | 'insight' // why this matters / big picture
  | 'warn' // common mistakes & misconceptions
  | 'definition' // boxed formal definitions
  | 'theorem' // boxed theorems, laws, key results
  | 'historical' // history & etymology
  | 'exam' // examination relevance notes

export interface Term {
  term: string
  def: string
}

export interface QuizItem {
  q: string
  options: string[]
  /** index into options */
  answer: number
  /** full explanation, including why the other options fail */
  explain: string
}

export interface ExerciseQuestion {
  q: string
  /**
   * Complete worked solution. Two authoring formats:
   *  - **Steps (preferred, owner directive 2026-11-03):** an array of short
   *    worked lines — one step per line, words + $math$ mixed, exactly like a
   *    handwritten worked solution ("Split 84 into 4 shares", "84 ÷ 4 = 21",
   *    …). Rendered as numbered steps with an optional boxed answer.
   *  - **Prose (legacy):** a single paragraph string, rendered as before.
   */
  solution: string | string[]
  /** Final result line, rendered boxed and emphasised after the steps. */
  answer?: string
}

export interface ExerciseSet {
  level: DifficultyLevel
  questions: ExerciseQuestion[]
}

export interface DerivationStep {
  /** short label, e.g. "Square both sides", "(Chain rule)" */
  label: string
  /** the mathematics of this step, KaTeX source (no $ delimiters) */
  formula?: string
  /** why this step is taken, in plain teaching prose */
  explanation: string
}

export type Block =
  | { kind: 'para'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'callout'; tone: CalloutTone; title: string; text: string }
  | { kind: 'terms'; items: Term[] }
  | { kind: 'equation'; latex: string; note?: string }
  | {
      kind: 'derivation'
      title: string
      statement: string
      steps: DerivationStep[]
      result: string
    }
  | { kind: 'example'; title: string; steps: string[] }
  | { kind: 'figure'; caption: string; svg: string }
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { kind: 'list'; items: string[]; ordered?: boolean; marker?: 'disc' | 'decimal' | 'roman' }
  | { kind: 'quiz'; title?: string; items: QuizItem[] }
  | { kind: 'exercises'; title?: string; sets: ExerciseSet[] }
  /**
   * Revision formula card — the formulas a reader must eventually recall
   * cold. Rendered as a compact reference card inline, and aggregated into
   * the auto-generated "Formula sheet" page of the book.
   */
  | { kind: 'formula'; name: string; latex: string; note?: string }
  /**
   * Algorithm / procedure block for computer science and stepwise methods:
   * monospaced numbered pseudocode with an optional per-line explanation.
   */
  | {
      kind: 'algorithm'
      title: string
      /** each line of pseudocode, exactly as it should appear */
      lines: { code: string; note?: string }[]
      /** optional: complexity, invariant, or why it terminates */
      note?: string
    }

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Honest prose word count for a lesson: every human-language string in every
 * block (inline $math$ fragments excluded, KaTeX in equations/derivations
 * excluded). Quiz explanations and exercise solutions are included because
 * the reader genuinely reads them.
 */
export function countLessonWords(lesson: Lesson): number {
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length
  let n = 0
  const clean = (s: string) => s.replace(/\$[^$]*\$/g, ' M ')
  for (const b of lesson.blocks) {
    switch (b.kind) {
      case 'para':
      case 'heading':
        n += words(clean(b.text))
        break
      case 'callout':
        n += words(clean(b.title)) + words(clean(b.text))
        break
      case 'terms':
        for (const t of b.items) n += words(clean(t.term)) + words(clean(t.def))
        break
      case 'equation':
        n += b.note ? words(clean(b.note)) : 0
        break
      case 'derivation':
        n += words(clean(b.title)) + words(clean(b.statement))
        for (const s of b.steps) n += words(clean(s.label)) + words(clean(s.explanation))
        n += words(clean(b.result))
        break
      case 'example':
        n += words(clean(b.title))
        for (const s of b.steps) n += words(clean(s))
        break
      case 'figure':
        n += words(clean(b.caption))
        break
      case 'table':
        n += b.caption ? words(clean(b.caption)) : 0
        for (const h of b.head) n += words(clean(h))
        for (const r of b.rows) for (const c of r) n += words(clean(c))
        break
      case 'list':
        for (const i of b.items) n += words(clean(i))
        break
      case 'quiz':
        for (const it of b.items) {
          n += words(clean(it.q)) + words(clean(it.explain))
          for (const o of it.options) n += words(clean(o))
        }
        break
      case 'exercises':
        for (const set of b.sets)
          for (const q of set.questions) {
            const sol = Array.isArray(q.solution) ? q.solution.join(' ') : q.solution
            n += words(clean(q.q)) + words(clean(sol)) + (q.answer ? words(clean(q.answer)) : 0)
          }
        break
      case 'formula':
        n += words(clean(b.name)) + (b.note ? words(clean(b.note)) : 0)
        break
      case 'algorithm':
        n += words(clean(b.title))
        for (const l of b.lines) n += words(l.code) + (l.note ? words(l.note) : 0)
        n += b.note ? words(clean(b.note)) : 0
        break
    }
  }
  return n
}
