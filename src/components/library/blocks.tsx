'use client'

/**
 * Renders every lesson block type defined in src/data/library/types.ts.
 * The reader should feel like a professionally typeset textbook:
 * headings with rules, boxed definitions/theorems, centred numbered
 * equations, stepped derivations, worked examples, captioned figures,
 * tables, revision formula cards, algorithms, interactive quizzes with
 * score tracking, and collapsible exercise solutions.
 */
import { useEffect, useState } from 'react'
import {
  BookOpen,
  Check,
  ChevronRight,
  ListOrdered,
  RotateCcw,
  Sigma,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { headingAnchor } from '@/data/library/index'
import { LEVEL_LABELS, type Block, type CalloutTone, type QuizItem } from '@/data/library/types'
import { Math, RichText } from './math'
import { useProgress } from './progress-store'
import { useLedgerSync } from '@/components/revision/use-ledger-sync'

/* ---------------------------------------------------------------- */
/* Callouts — Cengage-style note boxes (owner directive 2026-11-03):   */
/* tinted panels with a small-caps label lead-in, the book's "Note:"   */
/* family. Tone colours stay semantic; the geometry is pure print.     */
/* ---------------------------------------------------------------- */

const CALLOUT_STYLES: Record<CalloutTone, { label: string; box: string; ink: string }> = {
  insight: {
    label: 'Note',
    box: 'border-amber-300/70 bg-amber-50/80 dark:border-amber-800/60 dark:bg-amber-950/30',
    ink: 'text-amber-900 dark:text-amber-200',
  },
  warn: {
    label: 'Caution',
    box: 'border-rose-300/70 bg-rose-50/80 dark:border-rose-800/60 dark:bg-rose-950/30',
    ink: 'text-rose-900 dark:text-rose-200',
  },
  definition: {
    label: 'Definition',
    box: 'border-[var(--book-sage-line)] bg-[var(--book-sage)]',
    ink: 'text-[var(--book-green-ink)]',
  },
  theorem: {
    label: 'Theorem',
    box: 'border-stone-400/70 bg-stone-100/90 dark:border-stone-600/60 dark:bg-stone-800/40',
    ink: 'text-stone-800 dark:text-stone-200',
  },
  historical: {
    label: 'Historical note',
    box: 'border-orange-300/70 bg-orange-50/80 dark:border-orange-800/60 dark:bg-orange-950/30',
    ink: 'text-orange-900 dark:text-orange-200',
  },
  exam: {
    label: 'Exam corner',
    box: 'border-teal-300/70 bg-teal-50/80 dark:border-teal-800/60 dark:bg-teal-950/30',
    ink: 'text-teal-900 dark:text-teal-200',
  },
}

function CalloutBlock({ tone, title, text }: { tone: CalloutTone; title: string; text: string }) {
  const s = CALLOUT_STYLES[tone]
  return (
    <aside className={`my-6 rounded-lg border px-5 py-3.5 ${s.box}`}>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <span className={`text-[0.68rem] font-bold uppercase tracking-[0.16em] ${s.ink}`}>
          {s.label}
        </span>
        <span className="font-reading text-[0.95em] font-semibold text-foreground/90">{title}</span>
      </div>
      <p className="text-[0.95em] leading-7 text-foreground/90">
        <RichText text={text} />
      </p>
    </aside>
  )
}

/* ---------------------------------------------------------------- */
/* Cengage solution chain (owner directive 2026-11-03: "the solution   */
/* should also be in cengage style" — grounded by re-studying M2/01):   */
/* the Sol. pill sits INLINE at the start of the first solution line,   */
/* and the work runs as a hanging-indent chain whose lines carry a      */
/* connective tag in a fixed left column — ∴ for Hence/Thus/Therefore,  */
/* "or" for alternatives, Now,/So,/But/And as word tags — exactly the   */
/* staircase of the Cengage worked solutions. Prose lines without a    */
/* connective run full width, as in the book. The final answer is a    */
/* terminal ∴ line (Cengage prints no boxed Answer row). No step       */
/* numbers anywhere (owner directive 2026-11-03).                       */
/* ---------------------------------------------------------------- */

const TAG_THEREFORE = /^\s*(?:Hence|Thus|Therefore)\b[,:]?\s*/
const TAG_OR = /^\s*or\b\s+/
const TAG_WORD = /^\s*(Now|So|But|And)\b[,:]?\s*/
const CASE_LEAD = /^\s*(Case\s*\([ivxIVX]+\)[:.]?)\s*/
const ANSWER_LABEL = /^\s*(?:Answer|Hence|Thus|Therefore)\b[,:]?\s*/

/** Display-only parse: splits a worked line into its Cengage connective
 * tag (or bold Case lead) and the remaining text. Content files are
 * never rewritten — the renderer reads the lead-in words the author
 * already wrote (Split / Take / Check / Hence …). */
function parseStepTag(s: string): { tag: string | null; caseLead: string | null; text: string } {
  let m = s.match(TAG_THEREFORE)
  if (m) return { tag: '∴', caseLead: null, text: s.slice(m[0].length) }
  m = s.match(TAG_OR)
  if (m) return { tag: 'or', caseLead: null, text: s.slice(m[0].length) }
  m = s.match(TAG_WORD)
  if (m) return { tag: m[1] + ',', caseLead: null, text: s.slice(m[0].length) }
  m = s.match(CASE_LEAD)
  if (m) return { tag: null, caseLead: m[1], text: s.slice(m[0].length) }
  return { tag: null, caseLead: null, text: s }
}

function StepTag({ tag }: { tag: string }) {
  if (tag === '∴') return <Math tex="\therefore" />
  return <span>{tag}</span>
}

function SolPill() {
  return (
    <span className="absolute left-0 top-0 inline-flex items-center rounded-full bg-[var(--book-green)] px-2.5 py-[2px] text-[11px] font-bold leading-none text-white">
      Sol.
    </span>
  )
}

function SolutionSteps({ steps, answer }: { steps: string[]; answer?: string }) {
  return (
    <div className="relative font-reading text-[0.95em] leading-7 text-foreground/90">
      <SolPill />
      <ol className="list-none space-y-1.5 pl-[3.4rem]">
        {steps.map((s, i) => {
          const { tag, caseLead, text } = parseStepTag(s)
          const body = (
            <>
              {caseLead && <strong className="font-semibold text-foreground">{caseLead} </strong>}
              <RichText text={text} />
            </>
          )
          return (
            <li key={i} className={tag ? 'flex items-start gap-2' : undefined}>
              {tag && (
                <span className="w-9 shrink-0 leading-7 text-foreground/70" aria-hidden>
                  <StepTag tag={tag} />
                </span>
              )}
              <span className="min-w-0 leading-7">{body}</span>
            </li>
          )
        })}
        {answer && (
          <li className="mt-1 flex items-start gap-2 font-medium text-[var(--book-green-ink)]">
            <span className="w-9 shrink-0 leading-7" aria-hidden>
              <StepTag tag="∴" />
            </span>
            <span className="min-w-0 leading-7">
              <RichText text={answer.replace(ANSWER_LABEL, '')} />
            </span>
          </li>
        )}
      </ol>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Illustration — the Cengage worked example: green pill label, the    */
/* problem on a sage band, then the Cengage solution chain (Sol. pill  */
/* inline + connective tag column).                                    */
/* ---------------------------------------------------------------- */

function ExampleBlock({ title, steps, no }: { title: string; steps: string[]; no: number }) {
  return (
    <section className="my-7" aria-label={`Illustration ${no}`}>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-[var(--book-green)] px-3 py-[3px] text-[11px] font-bold tracking-[0.14em] text-white">
          ILLUSTRATION {no}
        </span>
        <span className="h-px flex-1 bg-[var(--book-sage-line)]" aria-hidden />
      </div>
      <p className="mt-2.5 rounded-lg bg-[var(--book-sage)] px-5 py-3 font-reading text-[0.98em] font-semibold leading-7 text-foreground/95">
        <RichText text={title} />
      </p>
      <div className="mt-4">
        <SolutionSteps steps={steps} />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Derivation                                                        */
/* ---------------------------------------------------------------- */

function DerivationBlock({
  title,
  statement,
  steps,
  result,
}: {
  title: string
  statement: string
  steps: { label: string; formula?: string; explanation: string }[]
  result: string
}) {
  return (
    <section className="my-7">
      <h3 className="border-t-2 border-[var(--book-green)] pt-2 font-reading text-[0.95em] font-bold uppercase tracking-[0.08em] text-[var(--book-green-ink)]">
        Derivation — {title}
      </h3>
      <div className="mt-3">
        <p className="text-[0.95em] leading-7 text-foreground/90">
          <RichText text={statement} />
        </p>
        <ol className="mt-4 list-none space-y-0 border-l-2 border-[var(--book-green)]/40">
          {steps.map((step, i) => (
            <li key={i} className="relative pb-4 pl-6 last:pb-1">
              <span className="text-sm font-medium text-foreground">{step.label}</span>
              {step.formula && <Math tex={step.formula} display />}
              <p className="text-[0.92em] leading-6 text-muted-foreground">
                <RichText text={step.explanation} />
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-2 rounded-md border border-[var(--book-green)]/40 bg-[var(--book-sage)] px-4 py-3">
          <span className="mr-2 rounded bg-[var(--book-green)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Result
          </span>
          <span className="text-[0.95em] leading-7 text-foreground">
            <RichText text={result} />
          </span>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Formula card                                                      */
/* ---------------------------------------------------------------- */

function FormulaBlock({ name, latex, note }: { name: string; latex: string; note?: string }) {
  return (
    <aside className="my-6 overflow-hidden rounded-lg border border-[var(--book-sage-line)]">
      <div className="flex items-center gap-2 border-b border-[var(--book-sage-line)] bg-[var(--book-sage)] px-4 py-2">
        <Sigma className="h-4 w-4 shrink-0 text-[var(--book-green-ink)]" aria-hidden />
        <span className="text-sm font-semibold tracking-wide text-[var(--book-green-ink)]">
          Remember — {name}
        </span>
      </div>
      <div className="bg-card px-4 py-1">
        <Math tex={latex} display />
      </div>
      {note && (
        <p className="border-t border-[var(--book-sage-line)]/60 px-4 py-2.5 text-sm leading-6 text-muted-foreground">
          <RichText text={note} />
        </p>
      )}
    </aside>
  )
}

/* ---------------------------------------------------------------- */
/* Algorithm                                                         */
/* ---------------------------------------------------------------- */

function AlgorithmBlock({
  title,
  lines,
  note,
}: {
  title: string
  lines: { code: string; note?: string }[]
  note?: string
}) {
  return (
    <section className="my-7 overflow-hidden rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="border-b border-[var(--book-sage-line)] bg-[var(--book-sage)] px-5 py-2.5">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-[var(--book-green-ink)]" aria-hidden />
          <h3 className="font-reading text-base font-semibold text-[var(--book-green-ink)]">Algorithm — {title}</h3>
        </div>
      </header>
      <div className="overflow-x-auto px-5 py-4">
        <ol className="min-w-max list-none space-y-1.5 font-mono text-sm leading-6">
          {lines.map((l, i) => (
            <li key={i} className="flex gap-3">
              <span className="whitespace-pre text-foreground">{l.code}</span>
              {l.note && (
                <span className="whitespace-pre-wrap text-muted-foreground" title={l.note}>
                  {'// '}
                  <RichText text={l.note} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      {note && (
        <p className="border-t border-stone-300/70 bg-muted/30 px-5 py-2.5 text-sm leading-6 text-muted-foreground dark:border-stone-700">
          <RichText text={note} />
        </p>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Quiz                                                              */
/* ---------------------------------------------------------------- */

function QuizBlock({
  items,
  title,
  lessonId,
}: {
  items: QuizItem[]
  title?: string
  lessonId?: string
}) {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const recordQuiz = useProgress((s) => s.recordQuiz)
  const quizBest = useProgress((s) => s.quizBest)
  const { logQuiz } = useLedgerSync()
  const best = lessonId ? quizBest[lessonId] : undefined

  const answeredCount = Object.keys(selected).length
  const finished = answeredCount === items.length
  const score = items.reduce((n, it, i) => n + (selected[i] === it.answer ? 1 : 0), 0)

  /* Record the score once every question is answered (works even when
     several options are clicked in the same batch). The finished quiz also
     feeds the revision ledger as an honest quality signal — quiz score maps
     onto the SM-2 rating scale (score ratio × 5). */
  useEffect(() => {
    if (!lessonId || answeredCount !== items.length || items.length === 0) return
    const finalScore = items.reduce((n, it, i) => n + (selected[i] === it.answer ? 1 : 0), 0)
    recordQuiz(lessonId, finalScore, items.length)
    logQuiz(lessonId, finalScore, items.length)
  }, [answeredCount, items, lessonId, recordQuiz, selected, logQuiz])

  const choose = (qi: number, oi: number) => {
    setSelected((prev) => ({ ...prev, [qi]: oi }))
  }

  return (
    <section className="my-7 overflow-hidden rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="flex flex-wrap items-center gap-2 bg-[var(--book-green)] px-5 py-2.5 text-white">
        <BookOpen className="h-4 w-4 text-white/90" aria-hidden />
        <h3 className="font-reading text-sm font-bold uppercase tracking-[0.14em]">
          {title ?? 'Check yourself'}
        </h3>
        <span className="ml-auto flex items-center gap-2 text-xs text-white/80">
          {best && (
            <Badge variant="outline" className="border-white/50 text-white">
              Best {best.best}/{best.total}
            </Badge>
          )}
          {items.length} question{items.length === 1 ? '' : 's'}
        </span>
      </header>
      <div className="divide-y divide-border/70">
        {items.map((item, qi) => {
          const chosen = selected[qi]
          const answered = chosen !== undefined
          return (
            <div key={qi} className="px-5 py-4">
              <p className="mb-3 font-medium leading-7">
                <span className="mr-2 text-primary">{qi + 1}.</span>
                <RichText text={item.q} />
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {item.options.map((opt, oi) => {
                  const isAnswer = oi === item.answer
                  const isChosen = chosen === oi
                  let cls =
                    'border-border bg-card hover:border-primary/50 hover:bg-accent/60 text-foreground'
                  if (answered && isAnswer)
                    cls = 'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                  else if (answered && isChosen)
                    cls = 'border-rose-500/70 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                  else if (answered) cls = 'border-border bg-card opacity-60'
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() => choose(qi, oi)}
                      className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3.5 py-2 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
                        {answered && isAnswer ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
                      </span>
                      <RichText text={opt} />
                    </button>
                  )
                })}
              </div>
              {answered && (
                <div
                  className={`mt-3 rounded-md border px-4 py-3 text-sm leading-6 ${
                    chosen === item.answer
                      ? 'border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/30'
                      : 'border-amber-400/60 bg-amber-50/70 dark:bg-amber-950/30'
                  }`}
                >
                  <p className="mb-1 font-semibold">
                    {chosen === item.answer ? 'Correct.' : 'Not quite — here is the reasoning.'}
                  </p>
                  <p className="text-foreground/90">
                    <RichText text={item.explain} />
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSelected((s) => {
                        const next = { ...s }
                        delete next[qi]
                        return next
                      })
                    }
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden /> Try again
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {finished && (
        <div
          className={`flex flex-wrap items-center gap-3 border-t px-5 py-3.5 text-sm ${
            score === items.length
              ? 'border-emerald-400/50 bg-emerald-50/60 dark:bg-emerald-950/30'
              : 'border-stone-300/70 bg-muted/40 dark:border-stone-700'
          }`}
        >
          <span className="font-semibold">
            You scored {score}/{items.length}
            {best && best.best >= score && best.best !== score ? ` · best ${best.best}/${best.total}` : score === items.length ? ' · perfect' : ''}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 gap-1.5 px-3 text-xs"
            onClick={() => setSelected({})}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Retake quiz
          </Button>
        </div>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Exercises                                                         */
/* ---------------------------------------------------------------- */

/* A worked solution in the Cengage chain style (owner directive
 * 2026-11-03: "the solution should also be in cengage style"):
 * Sol. pill inline on the first line, connective tag column (∴/or/
 * Now,/So,), terminal ∴ answer line — no step numbers (owner
 * directive 2026-11-03), no boxed Answer row (Cengage prints none).
 * Legacy string solutions stay paragraphs. */
function SolutionBody({ q }: { q: { solution: string | string[]; answer?: string } }) {
  if (!Array.isArray(q.solution)) return <RichText text={q.solution} />
  return <SolutionSteps steps={q.solution} answer={q.answer} />
}

function ExercisesBlock({
  sets,
  title,
}: {
  sets: {
    level: keyof typeof LEVEL_LABELS
    questions: { q: string; solution: string | string[]; answer?: string }[]
  }[]
  title?: string
}) {
  return (
    <section className="my-7 overflow-hidden rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="flex flex-wrap items-center gap-2 bg-[var(--book-green)] px-5 py-2.5 text-white">
        <h3 className="font-reading text-sm font-bold uppercase tracking-[0.14em]">
          {title ?? 'Exercises'}
        </h3>
        <span className="ml-auto text-xs text-white/80">
          {sets.reduce((n, s) => n + s.questions.length, 0)} questions · full solutions
        </span>
      </header>
      <div className="space-y-6 px-5 py-4">
        {sets.map((set, si) => (
          <div key={si}>
            <div className="mb-3 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-[var(--book-green)]/50 text-[var(--book-green-ink)]"
              >
                {LEVEL_LABELS[set.level]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {set.questions.length} question{set.questions.length === 1 ? '' : 's'}
              </span>
            </div>
            <ol className="divide-y divide-[var(--book-sage-line)]/60">
              {set.questions.map((q, qi) => (
                <li key={qi} className="py-3.5 first:pt-1 last:pb-1">
                  <p className="font-medium leading-7">
                    <span className="mr-2 font-reading font-bold text-[var(--book-green-ink)]">
                      Q{qi + 1}.
                    </span>
                    <RichText text={q.q} />
                  </p>
                  <Collapsible>
                    <CollapsibleTrigger className="group mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-[var(--book-green-ink)] hover:underline">
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-90" aria-hidden />
                      Show solution
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 rounded-md border-l-2 border-[var(--book-green)]/60 bg-[var(--book-sage)]/50 px-4 py-3 text-sm leading-7 text-foreground/90">
                      <SolutionBody q={q} />
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Master renderer                                                   */
/* ---------------------------------------------------------------- */

export function BlockRenderer({ blocks, lessonId }: { blocks: Block[]; lessonId?: string }) {
  // Pre-compute figure numbers (Figure 1, Figure 2, …) in lesson order.
  const figureNumbers: number[] = []
  let fig = 0
  for (const b of blocks) if (b.kind === 'figure') figureNumbers.push(++fig)

  let figureCursor = 0

  // Illustrations (worked examples) are numbered in lesson order —
  // Illustration 1, 2, … — the Cengage-style presentation (owner
  // directive 2026-11-03).
  const illustrationNumbers: number[] = []
  let ill = 0
  for (const b of blocks) if (b.kind === 'example') illustrationNumbers.push(++ill)

  let illustrationCursor = 0

  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'para':
            return (
              <p key={i} className="lesson-p">
                <RichText text={b.text} />
              </p>
            )
          case 'heading':
            return (
              <h2 key={i} id={headingAnchor(b.text)} className="lesson-h2 scroll-mt-28">
                {b.text}
              </h2>
            )
          case 'callout':
            return <CalloutBlock key={i} tone={b.tone} title={b.title} text={b.text} />
          case 'terms':
            return (
              <dl key={i} className="my-6 overflow-hidden rounded-lg border border-stone-300/80 dark:border-stone-700">
                {b.items.map((t, ti) => (
                  <div
                    key={ti}
                    className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(9rem,auto)_1fr] sm:gap-5 ${
                      ti !== b.items.length - 1 ? 'border-b border-border/70' : ''
                    } ${ti % 2 === 1 ? 'bg-muted/30' : ''}`}
                  >
                    <dt className="font-reading text-base font-bold text-[var(--book-green-ink)]">{t.term}</dt>
                    <dd className="text-[0.92em] leading-6 text-foreground/90">
                      <RichText text={t.def} />
                    </dd>
                  </div>
                ))}
              </dl>
            )
          case 'equation':
            return (
              <div key={i}>
                <Math tex={b.latex} display />
                {b.note && (
                  <p className="mx-auto -mt-2 mb-6 max-w-xl text-center text-sm leading-6 text-muted-foreground">
                    <RichText text={b.note} />
                  </p>
                )}
              </div>
            )
          case 'derivation':
            return (
              <DerivationBlock
                key={i}
                title={b.title}
                statement={b.statement}
                steps={b.steps}
                result={b.result}
              />
            )
          case 'example':
            return (
              <ExampleBlock
                key={i}
                title={b.title}
                steps={b.steps}
                no={illustrationNumbers[illustrationCursor++] ?? 0}
              />
            )
          case 'figure': {
            const no = figureNumbers[figureCursor++]
            return (
              <figure key={i} className="my-8">
                <div
                  className="overflow-x-auto rounded-lg border border-stone-300/80 bg-card px-4 py-5 text-foreground dark:border-stone-700 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                />
                <figcaption className="mx-auto mt-2.5 max-w-3xl text-center text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Figure {no}</span> —{' '}
                  <RichText text={b.caption} />
                </figcaption>
              </figure>
            )
          }
          case 'table':
            return (
              <figure key={i} className="my-7">
                {b.caption && (
                  <figcaption className="mb-2 text-center text-sm font-medium text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    {b.head.length > 1 && (
                      <TableHeader>
                        <TableRow className="bg-[var(--book-sage)] hover:bg-[var(--book-sage)]">
                          {b.head.map((h, hi) => (
                            <TableHead
                              key={hi}
                              className={
                                hi === 0
                                  ? 'font-semibold text-[var(--book-green-ink)]'
                                  : 'text-center font-reading font-semibold text-[var(--book-green-ink)]'
                              }
                            >
                              <RichText text={h} />
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                    )}
                    <TableBody>
                      {b.rows.map((r, ri) => (
                        <TableRow key={ri} className={ri % 2 === 1 ? 'bg-[var(--book-sage)]/40' : ''}>
                          {r.map((c, ci) => (
                            <TableCell
                              key={ci}
                              className={ci === 0 ? 'font-medium' : 'text-center'}
                            >
                              <RichText text={c} />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </figure>
            )
          case 'list':
            if (b.marker === 'roman') {
              const ROMAN = [
                'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
                'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx',
              ]
              return (
                <ul key={i} className="lesson-list roman-list">
                  {b.items.map((it, ii) => (
                    <li key={ii}>
                      <span className="roman-mark" aria-hidden>
                        ({ROMAN[ii] ?? ii + 1})
                      </span>
                      <span>
                        <RichText text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              )
            }
            return b.ordered ? (
              <ol key={i} className="lesson-list list-decimal">
                {b.items.map((it, ii) => (
                  <li key={ii}>
                    <RichText text={it} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="lesson-list list-disc">
                {b.items.map((it, ii) => (
                  <li key={ii}>
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            )
          case 'quiz':
            return <QuizBlock key={i} items={b.items} title={b.title} lessonId={lessonId} />
          case 'exercises':
            return <ExercisesBlock key={i} sets={b.sets} title={b.title} />
          case 'formula':
            return <FormulaBlock key={i} name={b.name} latex={b.latex} note={b.note} />
          case 'algorithm':
            return <AlgorithmBlock key={i} title={b.title} lines={b.lines} note={b.note} />
          default:
            return null
        }
      })}
    </>
  )
}
