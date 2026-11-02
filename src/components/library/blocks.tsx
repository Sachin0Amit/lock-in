'use client'

/**
 * Renders every lesson block type defined in src/data/library/types.ts.
 * The reader should feel like a professionally typeset textbook:
 * headings with rules, boxed definitions/theorems, centred numbered
 * equations, stepped derivations, worked examples, captioned figures,
 * tables, interactive quizzes and collapsible exercise solutions.
 */
import { useState } from 'react'
import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  Check,
  ChevronRight,
  GraduationCap,
  History,
  Lightbulb,
  Landmark,
  RotateCcw,
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
import { LEVEL_LABELS, type Block, type CalloutTone, type QuizItem } from '@/data/library/types'
import { Math, RichText } from './math'

/* ---------------------------------------------------------------- */
/* Callouts                                                          */
/* ---------------------------------------------------------------- */

const CALLOUT_STYLES: Record<
  CalloutTone,
  { icon: typeof Lightbulb; box: string; label: string; chip: string }
> = {
  insight: {
    icon: Lightbulb,
    box: 'border-amber-300/70 bg-amber-50/80 dark:border-amber-800/60 dark:bg-amber-950/30',
    label: 'text-amber-900 dark:text-amber-200',
    chip: 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200',
  },
  warn: {
    icon: AlertTriangle,
    box: 'border-rose-300/70 bg-rose-50/80 dark:border-rose-800/60 dark:bg-rose-950/30',
    label: 'text-rose-900 dark:text-rose-200',
    chip: 'bg-rose-100 text-rose-900 dark:bg-rose-900/50 dark:text-rose-200',
  },
  definition: {
    icon: BookMarked,
    box: 'border-emerald-300/70 bg-emerald-50/80 dark:border-emerald-800/60 dark:bg-emerald-950/30',
    label: 'text-emerald-900 dark:text-emerald-200',
    chip: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200',
  },
  theorem: {
    icon: Landmark,
    box: 'border-stone-400/70 bg-stone-100/90 dark:border-stone-600/60 dark:bg-stone-800/40',
    label: 'text-stone-800 dark:text-stone-200',
    chip: 'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200',
  },
  historical: {
    icon: History,
    box: 'border-orange-300/70 bg-orange-50/80 dark:border-orange-800/60 dark:bg-orange-950/30',
    label: 'text-orange-900 dark:text-orange-200',
    chip: 'bg-orange-100 text-orange-900 dark:bg-orange-900/50 dark:text-orange-200',
  },
  exam: {
    icon: GraduationCap,
    box: 'border-teal-300/70 bg-teal-50/80 dark:border-teal-800/60 dark:bg-teal-950/30',
    label: 'text-teal-900 dark:text-teal-200',
    chip: 'bg-teal-100 text-teal-900 dark:bg-teal-900/50 dark:text-teal-200',
  },
}

function CalloutBlock({ tone, title, text }: { tone: CalloutTone; title: string; text: string }) {
  const s = CALLOUT_STYLES[tone]
  const Icon = s.icon
  return (
    <aside className={`my-6 rounded-lg border px-5 py-4 ${s.box}`}>
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className={`h-4 w-4 shrink-0 ${s.label}`} aria-hidden />
        <span className={`text-sm font-semibold tracking-wide ${s.label}`}>{title}</span>
      </div>
      <p className="text-[0.95em] leading-7 text-foreground/90">
        <RichText text={text} />
      </p>
    </aside>
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
    <section className="my-7 overflow-hidden rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="flex items-center gap-2 border-b border-stone-300/80 bg-stone-100/80 px-5 py-2.5 dark:border-stone-700 dark:bg-stone-800/60">
        <ChevronRight className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-reading text-base font-semibold">Derivation — {title}</h3>
      </header>
      <div className="px-5 py-4">
        <p className="text-[0.95em] leading-7 text-foreground/90">
          <RichText text={statement} />
        </p>
        <ol className="mt-4 space-y-0 border-l-2 border-primary/40 dark:border-primary/50">
          {steps.map((step, i) => (
            <li key={i} className="relative pb-4 pl-6 last:pb-1">
              <span
                className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary/60 bg-background text-[10px] leading-[12px] text-center font-semibold text-primary"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="text-sm font-medium text-foreground">{step.label}</span>
              {step.formula && <Math tex={step.formula} display />}
              <p className="text-[0.92em] leading-6 text-muted-foreground">
                <RichText text={step.explanation} />
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-2 rounded-md border border-primary/40 bg-primary/5 px-4 py-3 dark:bg-primary/10">
          <span className="mr-2 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-foreground/90">
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
/* Quiz                                                              */
/* ---------------------------------------------------------------- */

function QuizBlock({ items, title }: { items: QuizItem[]; title?: string }) {
  const [selected, setSelected] = useState<Record<number, number>>({})

  return (
    <section className="my-7 rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="flex items-center gap-2 border-b border-stone-300/80 bg-stone-100/80 px-5 py-2.5 dark:border-stone-700 dark:bg-stone-800/60">
        <BookOpen className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-reading text-base font-semibold">
          {title ?? 'Check yourself'}
        </h3>
        <span className="ml-auto text-xs text-muted-foreground">
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
                      onClick={() => setSelected((s) => ({ ...s, [qi]: oi }))}
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
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Exercises                                                         */
/* ---------------------------------------------------------------- */

function ExercisesBlock({
  sets,
  title,
}: {
  sets: { level: keyof typeof LEVEL_LABELS; questions: { q: string; solution: string }[] }[]
  title?: string
}) {
  return (
    <section className="my-7 rounded-lg border border-stone-300/80 dark:border-stone-700">
      <header className="flex items-center gap-2 border-b border-stone-300/80 bg-stone-100/80 px-5 py-2.5 dark:border-stone-700 dark:bg-stone-800/60">
        <BookOpen className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-reading text-base font-semibold">{title ?? 'Exercises'}</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {sets.reduce((n, s) => n + s.questions.length, 0)} questions · full solutions
        </span>
      </header>
      <div className="space-y-6 px-5 py-4">
        {sets.map((set, si) => (
          <div key={si}>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="outline" className="border-primary/40 text-primary">
                {LEVEL_LABELS[set.level]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {set.questions.length} question{set.questions.length === 1 ? '' : 's'}
              </span>
            </div>
            <ol className="space-y-3">
              {set.questions.map((q, qi) => (
                <li key={qi} className="rounded-md border bg-card/60 px-4 py-3">
                  <p className="font-medium leading-7">
                    <span className="mr-2 text-primary">Q{qi + 1}.</span>
                    <RichText text={q.q} />
                  </p>
                  <Collapsible>
                    <CollapsibleTrigger className="group mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-90" aria-hidden />
                      Show solution
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 rounded-md border-l-2 border-primary/50 bg-muted/40 px-4 py-2.5 text-sm leading-7 text-foreground/90">
                      <RichText text={q.solution} />
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

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  // Pre-compute figure numbers (Figure 1, Figure 2, …) in lesson order.
  const figureNumbers: number[] = []
  let fig = 0
  for (const b of blocks) if (b.kind === 'figure') figureNumbers.push(++fig)

  let figureCursor = 0

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
              <h2 key={i} className="lesson-h2">
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
                    <dt className="font-reading text-base font-bold text-foreground">{t.term}</dt>
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
              <section key={i} className="my-7 rounded-lg border border-stone-300/80 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-900/40">
                <header className="flex items-center gap-2 border-b border-stone-300/80 px-5 py-2.5 dark:border-stone-700">
                  <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                  <h3 className="font-reading text-base font-semibold">Worked example — {b.title}</h3>
                </header>
                <ol className="space-y-3 px-5 py-4">
                  {b.steps.map((s, si) => (
                    <li key={si} className="flex gap-3">
                      <span
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary"
                        aria-hidden
                      >
                        {si + 1}
                      </span>
                      <p className="leading-7 text-foreground/90">
                        <RichText text={s} />
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )
          case 'figure': {
            const no = figureNumbers[figureCursor++]
            return (
              <figure key={i} className="my-8">
                <div
                  className="overflow-x-auto rounded-lg border border-stone-300/80 bg-card px-4 py-5 text-foreground dark:border-stone-700 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: b.svg }}
                />
                <figcaption className="mx-auto mt-2.5 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
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
                        <TableRow className="bg-muted/60 hover:bg-muted/60">
                          {b.head.map((h, hi) => (
                            <TableHead key={hi} className={hi === 0 ? '' : 'text-center font-reading'}>
                              <RichText text={h} />
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                    )}
                    <TableBody>
                      {b.rows.map((r, ri) => (
                        <TableRow key={ri}>
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
            return <QuizBlock key={i} items={b.items} title={b.title} />
          case 'exercises':
            return <ExercisesBlock key={i} sets={b.sets} title={b.title} />
          default:
            return null
        }
      })}
    </>
  )
}
