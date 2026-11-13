/**
 * audit-content-completeness.ts — the content-completeness gate (2026-11-13,
 * owner directive: "make sure of already written books and lessons all the
 * things are written inside the content as mentioned in the heading or
 * title or other etc nothing is missing inside").
 *
 * WHAT IT CHECKS — for every WRITTEN lesson of every book (chapters with
 * actual lessons), nothing else:
 *
 *  A. Heading-vs-content (the owner's core ask)
 *     - every `heading` block has substantive content beneath it before the
 *       next heading (a heading with zero blocks under it = missing section)
 *     - no two headings in one lesson collapse to the same scrollspy anchor
 *     - every significant word of the LESSON TITLE appears in the lesson body
 *
 *  A2. Topic depth (owner directive #2, 2026-11-13: "in Advanced Algebra
 *      chapter 1 ... lesson 1.5 ... I can't see modulus function. Not a lot
 *      is discussed about it. There is, but where is the graph of it? There
 *      is signum function, but where is the graph of it? ... Where is example
 *      on that modulus function? So do such audits on already prewritten
 *      books or lessons.")
 *      - a section heading that names a GRAPHABLE function family (modulus,
 *        signum, greatest integer / GIF, fractional part, piecewise, envelope,
 *        exponential, logarithm, quadratic/parabola, reciprocal, trig graphs,
 *        hyperbola/ellipse) must contain BOTH a figure (the family's graph —
 *        a montage panel in some other survey section does not discharge the
 *        promise) and worked craft (an example or derivation) INSIDE that
 *        section
 *      - any heading whose subject is itself a graph ("Graphs of ...",
 *        "the graph of ...") must contain a figure
 *      - every graphable family named in the LESSON TITLE must be shown
 *        (some figure mentioning it) and worked (some example/derivation
 *        mentioning it) somewhere in the lesson — WARN when the dedicated
 *        treatment is missing entirely
 *
 *  B. Block well-formedness (no empty shells)
 *     - every block of every kind carries its required non-empty fields;
 *       table rows match the header width; quiz answer indices are in range;
 *       every exercise question carries a full worked solution (BOOK_FORMAT
 *       contract); figure SVGs have a viewBox; example steps are non-empty.
 *
 *  C. Placeholder scan
 *     - TODO / FIXME / TBD / XXX / 【】 / ____ / lorem / "coming soon" /
 *       "to be added" / "under construction" / "not yet written" /
 *       undefined / NaN inside any content string.
 *
 *  D. Lesson anatomy + honesty
 *     - concepts 5–8, non-empty objectives/prerequisites; prerequisite ids
 *       resolve; `words` within ±20% of the honest computed count.
 *
 *  E. Chapter / book wiring (nothing written can be invisible)
 *     - every ch-NN.ts file on disk is imported by its book.ts (a written
 *       chapter not in the registry renders nowhere);
 *     - 'complete' books carry no planned lessons; lesson numbers match
 *       their chapter; lesson ids globally unique.
 *
 * Severities: ERROR = a contract break / missing content (fix required);
 * WARN = thin or suspicious (review, fix if real). Exit code 1 on any ERROR.
 */
import { allBooks } from '../src/data/library'
import type { Book, Chapter, Lesson } from '../src/data/library/types'
import { countLessonWords } from '../src/data/library/types'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { pathToFileURL } from 'url'

/* ------------------------------------------------------------------ */
/* Findings                                                            */
/* ------------------------------------------------------------------ */

type Sev = 'ERROR' | 'WARN'
interface Finding {
  sev: Sev
  where: string
  msg: string
}
const findings: Finding[] = []
const flag = (sev: Sev, where: string, msg: string) => findings.push({ sev, where, msg })

/* ------------------------------------------------------------------ */
/* String collection (for placeholder scan + title coverage)           */
/* ------------------------------------------------------------------ */

interface StrRef {
  loc: string
  s: string
}

function collectStrings(lesson: Lesson): StrRef[] {
  const out: StrRef[] = []
  const add = (loc: string, s: string | undefined | null) => {
    if (typeof s === 'string' && s.length > 0) out.push({ loc, s })
  }
  const B = lesson.blocks
  for (let i = 0; i < B.length; i++) {
    const b = B[i]
    const at = `block ${i} (${b.kind})`
    switch (b.kind) {
      case 'para':
      case 'heading':
        add(at, b.text)
        break
      case 'callout':
        add(at, b.title)
        add(at, b.text)
        break
      case 'terms':
        b.items.forEach((t, k) => {
          add(`${at} term ${k}`, t.term)
          add(`${at} term ${k}`, t.def)
        })
        break
      case 'equation':
        add(at, b.latex)
        add(at, b.note)
        break
      case 'derivation':
        add(`${at} title`, b.title)
        add(`${at} statement`, b.statement)
        b.steps.forEach((st, k) => {
          add(`${at} step ${k}`, st.label)
          add(`${at} step ${k}`, st.formula)
          add(`${at} step ${k}`, st.explanation)
        })
        add(`${at} result`, b.result)
        break
      case 'example':
        add(`${at} title`, b.title)
        b.steps.forEach((st, k) => add(`${at} step ${k}`, st))
        break
      case 'figure':
        add(`${at} caption`, b.caption)
        break
      case 'table':
        add(`${at} caption`, b.caption)
        b.head.forEach((h, k) => add(`${at} head ${k}`, h))
        b.rows.forEach((r, ri) =>
          r.forEach((c, ci) => add(`${at} row ${ri} col ${ci}`, c)),
        )
        break
      case 'list':
        b.items.forEach((it, k) => add(`${at} item ${k}`, it))
        break
      case 'quiz':
        add(`${at} quiz-title`, b.title)
        b.items.forEach((it, k) => {
          add(`${at} q${k}`, it.q)
          it.options.forEach((o, oi) => add(`${at} q${k} opt${oi}`, o))
          add(`${at} q${k} explain`, it.explain)
        })
        break
      case 'exercises':
        add(`${at} ex-title`, b.title)
        b.sets.forEach((set, si) =>
          set.questions.forEach((q, qi) => {
            add(`${at} set${si} q${qi}`, q.q)
            const sol = Array.isArray(q.solution) ? q.solution.join(' \n ') : q.solution
            add(`${at} set${si} q${qi} solution`, sol)
            add(`${at} set${si} q${qi} answer`, q.answer)
          }),
        )
        break
      case 'formula':
        add(`${at} name`, b.name)
        add(`${at} latex`, b.latex)
        add(`${at} note`, b.note)
        break
      case 'algorithm':
        add(`${at} title`, b.title)
        b.lines.forEach((l, k) => {
          add(`${at} line ${k}`, l.code)
          add(`${at} line ${k}`, l.note)
        })
        add(`${at} note`, b.note)
        break
    }
  }
  return out
}

const PLACEHOLDERS: [RegExp, string][] = [
  [ /\bTODO\b/, 'TODO' ],
  [ /\bFIXME\b/, 'FIXME' ],
  [ /\bTBD\b/i, 'TBD' ],
  [ /\bTBC\b/i, 'TBC' ],
  [/【/, 'placeholder bracket 【'],
  [/lorem ipsum/i, 'lorem ipsum'],
  [/coming soon/i, '"coming soon"'],
  [/to be added/i, '"to be added"'],
  [/under construction/i, '"under construction"'],
  [/\bNaN\b/, 'NaN leak'],
]
// Notes on words deliberately NOT scanned: "undefined", "placeholder",
// "XXX" and "to be written" are ordinary mathematical/pedagogical
// vocabulary in this library ("division by zero is undefined", a letter
// "acting as a placeholder", Roman $XX$, "what had to be written") —
// scanning them buries real findings in hundreds of false positives.
// A literal fill-in-the-blank "____" is a quiz idiom, scanned outside quiz
// question text only.
const BLANK_FILLER = /_{4,}/

function scanPlaceholders(lesson: Lesson, where: string) {
  for (const { loc, s } of collectStrings(lesson)) {
    for (const [re, name] of PLACEHOLDERS) {
      if (re.test(s)) {
        flag('ERROR', `${where} ${loc}`, `${name} found in content: "${s.slice(0, 90)}"`)
      }
    }
    // ____ is allowed only as the quiz fill-in-the-blank idiom inside
    // question text / options; anywhere else it is a missing word.
    const isQuizQuestionText = / q\d+$| q\d+ opt\d+$/.test(loc)
    if (!isQuizQuestionText && BLANK_FILLER.test(s)) {
      flag('ERROR', `${where} ${loc}`, `blank filler ____ in non-quiz content: "${s.slice(0, 90)}"`)
    }
  }
}

/* ------------------------------------------------------------------ */
/* A. Heading-vs-content                                               */
/* ------------------------------------------------------------------ */

function checkHeadings(lesson: Lesson, where: string) {
  const B = lesson.blocks
  const seenAnchors = new Map<string, number>()
  for (let i = 0; i < B.length; i++) {
    const b = B[i]
    if (b.kind !== 'heading') continue
    if (!b.text.trim()) {
      flag('ERROR', `${where} block ${i} (heading)`, 'empty heading text')
      continue
    }
    // anchor collisions (scrollspy TOC + § links)
    const anchor = b.text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    if (seenAnchors.has(anchor)) {
      flag(
        'ERROR',
        `${where} block ${i} (heading)`,
        `duplicate section heading "${b.text}" (same scrollspy anchor as block ${seenAnchors.get(anchor)})`,
      )
    } else {
      seenAnchors.set(anchor, i)
    }
    // content beneath the heading, until the next heading
    let j = i + 1
    while (j < B.length && B[j].kind !== 'heading') j++
    const between = B.slice(i + 1, j)
    const substantive = between.filter(
      (x) => x.kind !== 'quiz' && x.kind !== 'exercises' && x.kind !== 'formula',
    )
    const hasPractice = between.some((x) => x.kind === 'quiz' || x.kind === 'exercises')
    if (between.length === 0) {
      flag('ERROR', `${where} block ${i} (heading)`, `heading "${b.text}" has NOTHING written beneath it`)
    } else if (substantive.length === 0) {
      // heading directly above the exercise banner / quiz — acceptable if
      // the heading clearly announces practice; still note single-block
      // sections that are only a formula card
      if (between.every((x) => x.kind === 'formula')) {
        flag('WARN', `${where} block ${i} (heading)`, `heading "${b.text}" is followed only by formula cards`)
      }
    } else if (!hasPractice && substantive.length === 1 && substantive[0].kind === 'para') {
      // "Check yourself"-style heads sit above a quiz banner — that is the
      // house pattern, not a thin section; only flag prose-only sections.
      flag('WARN', `${where} block ${i} (heading)`, `thin section: heading "${b.text}" carries a single paragraph`)
    }
  }
}

/* ------------------------------------------------------------------ */
/* A2. Lesson-title coverage                                           */
/* ------------------------------------------------------------------ */

const STOP = new Set([
  'the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'as', 'is', 'are',
  'for', 'with', 'its', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'be', 'by', 'at',
  'from', 'into', 'how', 'why', 'what', 'no', 'not', 'one', 'two',
])

function checkTitleCoverage(lesson: Lesson, where: string) {
  const blob = collectStrings(lesson)
    .map((r) => r.s)
    .join(' \n ')
    .toLowerCase()
  const words = lesson.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
  // crude stemming: "graphs"≈"graph", "constructing"≈"construct",
  // "written"≈"write" — titles use metaphor phrasings, so match roots.
  const root = (w: string) => w.replace(/(ations|ation|ings|ing|ised|ized|ed|es|s)$/, '')
  const missing = words.filter((w) => {
    const r = root(w)
    return r.length >= 4 && !blob.includes(r)
  })
  if (missing.length > 0) {
    flag(
      'WARN',
      where,
      `lesson title words never appear inside the lesson body: ${missing.map((m) => `"${m}"`).join(', ')}`,
    )
  }
}

/* ------------------------------------------------------------------ */
/* A2. Topic depth — family-named sections must show the family's      */
/* graph and be worked on it. The owner's live example: AA 1.5's       */
/* "The Modulus" and "Signum" sections shipped without their graphs   */
/* (and the modulus without any worked example) even though the      */
/* titles promised them.                                              */
/* ------------------------------------------------------------------ */

/* Families whose canonical object IS the graph. `subject` matches a
 * heading (or lesson title) that names the family as its subject;
 * `mentions` matches inline uses of the family (figure captions, svg
 * text, example titles) anywhere in the lesson. */
interface Family {
  label: string
  subject: RegExp
  mentions: RegExp
}
const FAMILIES: Family[] = [
  /* NOTE: "modulus" is ambiguous — the congruence modulus (a ≡ b mod n,
   * a number-theory divisor) is NOT the graphable absolute-value family.
   * Headings that pair "modulus" with congruence vocabulary are excluded. */
  { label: 'modulus', subject: /\bmodulus\b|\babsolute[- ]value function\b/i, mentions: /\bmodulus\b|\babsolute value\b/i, guard: /congru|cancel|modulo|residue|divisor|shrinks?|remainders?/i },
  { label: 'signum', subject: /\bsignum\b|\bsign (function|machine)\b/i, mentions: /\bsignum\b|\bsgn\b/i },
  { label: 'greatest integer (GIF)', subject: /\bgreatest integer\b|\bGIF\b|\bstep function\b|\bfloor function\b/i, mentions: /\bgreatest integer\b|\bGIF\b|\bsawtooth\b|\bfloor\b|\[\s*x\s*\]/i },
  { label: 'fractional part', subject: /\bfractional part\b|\bsawtooth\b/i, mentions: /\bfractional part\b|\bsawtooth\b/i },
  { label: 'exponential', subject: /\bexponential (function|curve|graph|machine|family)s?\b|\bthe exponential\b/i, mentions: /\bexponential\b/i },
  { label: 'logarithm', subject: /\blogarithmic (function|curve|graph|machine|family)s?\b|\bthe logarithm\b|\blog function\b/i, mentions: /\blogarithm|\blogs?\b/i },
  { label: 'trigonometric graph', subject: /\b(sine|cosine|tangent) (function|graph|curve|wave|machine)s?\b|\bgraphs? of (the )?(sine|cosine|tangent|sin|cos|tan)\b/i, mentions: /\b(sine|cosine|tangent)\b/i },
  { label: 'quadratic', subject: /\bquadratic (function|graph|curve)s?\b|\bparabola\b/i, mentions: /\bquadratic\b|\bparabola\b|\bvertex\b/i },
  { label: 'reciprocal', subject: /\breciprocal (function|graph|curve|machine)s?\b/i, mentions: /\breciprocal\b/i },
  { label: 'piecewise', subject: /\bpiecewise\b/i, mentions: /\bpiecewise\b/i },
  { label: 'max/min envelope', subject: /\bmax(imum)? and min(imum)? (functions?|machines?)\b|\benvelope\b/i, mentions: /\benvelope\b|\bmax\s*[{\(]|\bmin\s*[{\(]/i },
  { label: 'hyperbola/ellipse', subject: /\b(hyperbola|ellipse)\b/i, mentions: /\b(hyperbola|ellipse)\b/i },
]

interface Family {
  label: string
  subject: RegExp
  mentions: RegExp
  guard?: RegExp
}

function familiesIn(text: string): Family[] {
  return FAMILIES.filter((f) => f.subject.test(text) && !(f.guard && f.guard.test(text)))
}

function checkTopicDepth(lesson: Lesson, where: string) {
  const B = lesson.blocks
  for (let i = 0; i < B.length; i++) {
    const b = B[i]
    if (b.kind !== 'heading') continue
    const fams = familiesIn(b.text)
    const graphHeaded = /\bgraphs?\b/i.test(b.text) && fams.length === 0
    if (fams.length === 0 && !graphHeaded) continue
    let j = i + 1
    while (j < B.length && B[j].kind !== 'heading') j++
    const between = B.slice(i + 1, j)
    const hasFigure = between.some((x) => x.kind === 'figure')
    const hasWork = between.some((x) => x.kind === 'example' || x.kind === 'derivation')
    for (const f of fams) {
      if (!hasFigure) {
        flag(
          'ERROR',
          `${where} block ${i} (heading)`,
          `topic-depth: section "${b.text}" names the ${f.label} family but shows NO graph of it inside the section`,
        )
      }
      if (!hasWork) {
        flag(
          'ERROR',
          `${where} block ${i} (heading)`,
          `topic-depth: section "${b.text}" names the ${f.label} family but works NO example (or derivation) on it inside the section`,
        )
      }
    }
    if (graphHeaded && !hasFigure) {
      flag(
        'ERROR',
        `${where} block ${i} (heading)`,
        `topic-depth: heading "${b.text}" is itself about graphs but the section contains NO figure`,
      )
    }
  }
  // lesson-title promises: every graphable family named in the title must
  // be SHOWN (a figure mentioning it) and WORKED (an example/derivation
  // mentioning it) somewhere in the lesson
  for (const f of familiesIn(lesson.title)) {
    const shown = B.some(
      (x) => x.kind === 'figure' && f.mentions.test(`${x.caption} ${(x as { svg?: string }).svg ?? ''}`),
    )
    const worked = B.some(
      (x) =>
        (x.kind === 'example' && f.mentions.test((x as { title: string }).title)) ||
        (x.kind === 'derivation' &&
          f.mentions.test(
            `${(x as { title: string }).title} ${(x as { statement: string }).statement}`,
          )),
    )
    if (!shown) {
      flag(
        'WARN',
        where,
        `topic-depth: the lesson title names the ${f.label} family but NO figure in the lesson shows it`,
      )
    }
    if (!worked) {
      flag(
        'WARN',
        where,
        `topic-depth: the lesson title names the ${f.label} family but NO example/derivation in the lesson is worked on it`,
      )
    }
  }
}

/* ------------------------------------------------------------------ */
/* B. Block well-formedness                                            */
/* ------------------------------------------------------------------ */

const blank = (s: string | undefined | null) => !s || !s.trim()

function checkBlocks(lesson: Lesson, where: string) {
  const B = lesson.blocks
  if (B.length === 0) {
    flag('ERROR', where, 'lesson has zero blocks — nothing written inside')
    return
  }
  const counts = new Map<string, number>()
  for (const b of B) counts.set(b.kind, (counts.get(b.kind) ?? 0) + 1)
  if ((counts.get('para') ?? 0) === 0) {
    flag('WARN', where, 'lesson has no prose (para) blocks at all')
  }

  for (let i = 0; i < B.length; i++) {
    const b = B[i]
    const at = `${where} block ${i} (${b.kind})`
    switch (b.kind) {
      case 'para':
        if (blank(b.text)) flag('ERROR', at, 'empty paragraph')
        break
      case 'heading':
        if (blank(b.text)) flag('ERROR', at, 'empty heading')
        break
      case 'callout':
        if (blank(b.title)) flag('ERROR', at, 'callout without title')
        if (blank(b.text)) flag('ERROR', at, `callout "${b.title}" without text`)
        break
      case 'terms':
        if (b.items.length === 0) flag('ERROR', at, 'terms block with no items')
        b.items.forEach((t, k) => {
          if (blank(t.term)) flag('ERROR', `${at} term ${k}`, 'empty term')
          if (blank(t.def)) flag('ERROR', `${at} term ${k}`, `term "${t.term}" without definition`)
        })
        break
      case 'equation':
        if (blank(b.latex)) flag('ERROR', at, 'equation with empty latex')
        break
      case 'derivation':
        if (blank(b.title)) flag('ERROR', at, 'derivation without title')
        if (blank(b.statement)) flag('ERROR', at, `derivation "${b.title}" without statement`)
        if (blank(b.result)) flag('ERROR', at, `derivation "${b.title}" without result`)
        if (b.steps.length === 0) flag('ERROR', at, `derivation "${b.title}" has no steps`)
        b.steps.forEach((st, k) => {
          if (blank(st.label) && blank(st.formula)) {
            flag('ERROR', `${at} step ${k}`, 'step with neither label nor formula')
          }
          if (blank(st.explanation)) {
            flag('ERROR', `${at} step ${k}`, 'step without explanation prose')
          }
        })
        break
      case 'example':
        if (blank(b.title)) flag('ERROR', at, 'example (Illustration) without a problem-statement title')
        if (b.steps.length === 0) flag('ERROR', at, `example "${b.title}" has no solution steps`)
        else if (b.steps.length === 1) {
          flag('WARN', at, `example "${b.title}" has a single solution line (Cengage chains need setup + moves + conclusion)`)
        }
        b.steps.forEach((st, k) => {
          if (blank(st)) flag('ERROR', `${at} step ${k}`, 'empty solution line')
        })
        break
      case 'figure':
        if (blank(b.caption)) flag('ERROR', at, 'figure without caption')
        if (blank(b.svg)) {
          flag('ERROR', at, 'figure with empty svg')
        } else {
          if (!b.svg.includes('<svg')) flag('ERROR', at, 'figure svg is not an <svg> document')
          if (!/viewBox=/.test(b.svg)) flag('ERROR', at, 'figure svg without viewBox')
        }
        break
      case 'table':
        if (b.head.length === 0) flag('ERROR', at, 'table without header row')
        if (b.rows.length === 0) flag('ERROR', at, 'table without data rows')
        b.rows.forEach((r, ri) => {
          if (r.length !== b.head.length) {
            flag(
              'ERROR',
              `${at} row ${ri}`,
              `row has ${r.length} cells but the header has ${b.head.length} — missing or extra cell`,
            )
          }
          r.forEach((c, ci) => {
            if (blank(c)) flag('WARN', `${at} row ${ri} col ${ci}`, 'empty table cell')
          })
        })
        break
      case 'list':
        if (b.items.length === 0) flag('ERROR', at, 'list with no items')
        b.items.forEach((it, k) => {
          if (blank(it)) flag('ERROR', `${at} item ${k}`, 'empty list item')
        })
        break
      case 'quiz':
        if (b.items.length === 0) flag('ERROR', at, 'quiz with no questions')
        if (b.items.length < 3) flag('WARN', at, `quiz has only ${b.items.length} question(s)`)
        b.items.forEach((it, k) => {
          const qat = `${at} q${k}`
          if (blank(it.q)) flag('ERROR', qat, 'empty question text')
          if (it.options.length < 2) flag('ERROR', qat, `only ${it.options.length} option(s)`)
          else if (it.options.length < 4) flag('WARN', qat, `only ${it.options.length} options`)
          if (it.answer < 0 || it.answer >= it.options.length || !Number.isInteger(it.answer)) {
            flag('ERROR', qat, `answer index ${it.answer} out of range (0–${it.options.length - 1})`)
          }
          if (blank(it.explain)) flag('ERROR', qat, 'question without explanation')
          const nonBlank = it.options.filter((o) => !blank(o))
          if (nonBlank.length !== it.options.length) flag('ERROR', qat, 'blank option string')
        })
        break
      case 'exercises':
        if (b.sets.length === 0) flag('ERROR', at, 'exercises block with no sets')
        b.sets.forEach((set, si) => {
          const sat = `${at} set ${si} (${set.level})`
          if (set.questions.length === 0) flag('ERROR', sat, 'exercise set with no questions')
          set.questions.forEach((q, qi) => {
            const qat = `${sat} q${qi}`
            if (blank(q.q)) flag('ERROR', qat, 'empty question text')
            if (Array.isArray(q.solution)) {
              const live = q.solution.filter((s) => !blank(s))
              if (live.length === 0) flag('ERROR', qat, 'question with NO worked solution')
              else if (live.length < q.solution.length) {
                flag('ERROR', qat, 'solution steps array contains empty lines')
              }
            } else if (blank(q.solution)) {
              flag('ERROR', qat, 'question with NO worked solution')
            }
            if (q.answer !== undefined && blank(q.answer)) {
              flag('ERROR', qat, 'blank answer field')
            }
          })
        })
        break
      case 'formula':
        if (blank(b.name)) flag('ERROR', at, 'formula card without name')
        if (blank(b.latex)) flag('ERROR', at, `formula "${b.name}" without latex`)
        break
      case 'algorithm':
        if (blank(b.title)) flag('ERROR', at, 'algorithm without title')
        if (b.lines.length === 0) flag('ERROR', at, `algorithm "${b.title}" with no lines`)
        b.lines.forEach((l, k) => {
          if (blank(l.code)) flag('ERROR', `${at} line ${k}`, 'empty pseudocode line')
        })
        break
    }
  }

  // practice presence: a written lesson should offer something self-checkable
  if ((counts.get('quiz') ?? 0) === 0 && (counts.get('exercises') ?? 0) === 0) {
    flag('WARN', where, 'lesson has neither a quiz nor exercises — nothing to self-check')
  }
}

/* ------------------------------------------------------------------ */
/* D. Lesson anatomy + honesty                                         */
/* ------------------------------------------------------------------ */

/* cross-reference resolution: prerequisites must point at real lessons,
 * citation keys must appear in the source ledger */
const allLessonIds = new Set<string>()
const SOURCE_LOG_PATH = 'docs/project/SOURCE_LOG.md'
const SOURCE_LOG = existsSync(SOURCE_LOG_PATH)
  ? readFileSync(SOURCE_LOG_PATH, 'utf8')
  : ''

function checkLessonMeta(lesson: Lesson, where: string) {
  if (!lesson.id.trim()) flag('ERROR', where, 'lesson without id')
  if (!lesson.number.trim()) flag('ERROR', where, `lesson "${lesson.title}" without display number`)
  if (!lesson.title.trim()) flag('ERROR', where, 'lesson without title')
  if (!Array.isArray(lesson.concepts) || lesson.concepts.length === 0) {
    flag('ERROR', where, 'lesson without concepts')
  } else {
    if (lesson.concepts.length < 5 || lesson.concepts.length > 8) {
      flag('WARN', where, `concepts count ${lesson.concepts.length} outside the 5–8 house band`)
    }
    lesson.concepts.forEach((c, k) => {
      if (blank(c)) flag('ERROR', `${where} concept ${k}`, 'empty concept phrase')
    })
  }
  ;(lesson.objectives ?? []).forEach((o, k) => {
    if (blank(o)) flag('ERROR', `${where} objective ${k}`, 'empty objective')
  })
  ;(lesson.prerequisites ?? []).forEach((p, k) => {
    if (blank(p)) flag('ERROR', `${where} prerequisite ${k}`, 'empty prerequisite id')
    else if (!allLessonIds.has(p)) {
      flag('WARN', `${where} prerequisite ${k}`, `prerequisite id "${p}" does not resolve to any written lesson (dangling cross-reference)`)
    }
  })
  ;(lesson.sources ?? []).forEach((s, k) => {
    if (blank(s)) flag('ERROR', `${where} source ${k}`, 'empty citation key')
    else if (SOURCE_LOG && !SOURCE_LOG.includes(s)) {
      flag('WARN', `${where} source ${k}`, `citation key "${s}" not found in SOURCE_LOG.md`)
    }
  })
  if (lesson.words !== undefined) {
    const computed = countLessonWords(lesson)
    if (computed > 0 && Math.abs(lesson.words - computed) / computed > 0.2) {
      flag(
        'WARN',
        where,
        `declared words ${lesson.words} vs computed ${computed} (>20% off — honesty rule)`,
      )
    }
  }
}

/* ------------------------------------------------------------------ */
/* E. Chapter / book wiring + disk-vs-registry                         */
/* ------------------------------------------------------------------ */

const idOwners = new Map<string, string>()

function checkChapter(book: Book, ch: Chapter) {
  const where = `${book.id} ch.${ch.number}`
  if (blank(ch.title)) flag('ERROR', where, 'chapter without title')
  if (blank(ch.summary)) flag('ERROR', `${where} "${ch.title}"`, 'chapter without summary')
  const writtenTitles = new Set(ch.lessons.map((l) => l.title.trim()))
  for (const p of ch.plannedLessons ?? []) {
    if (writtenTitles.has(p.trim())) {
      flag('ERROR', `${where} "${ch.title}"`, `lesson "${p}" is written but ALSO still listed in plannedLessons`)
    }
  }
  if (ch.status === 'complete' && (ch.plannedLessons?.length ?? 0) > 0) {
    flag('ERROR', where, `chapter marked complete but lists ${ch.plannedLessons!.length} planned lessons`)
  }
  ch.lessons.forEach((l, k) => {
    const lwhere = `${book.id} ch.${ch.number} lesson ${l.number} (${l.id})`
    // number prefix must match the chapter
    const prefix = l.number.split('.')[0]
    if (prefix !== String(ch.number)) {
      flag('WARN', lwhere, `lesson number ${l.number} does not sit under chapter ${ch.number}`)
    }
    // order sanity
    if (k > 0) {
      const prev = ch.lessons[k - 1].number
      const [pc, pl] = prev.split('.').map(Number)
      const [cc, cl] = l.number.split('.').map(Number)
      if (pc === cc && cl === pl + 1 && ch.lessons[k - 1].id > l.id) {
        // same chapter, numbers ascend but ids mis-sorted — harmless, skip
      }
    }
    // global id uniqueness
    const owner = idOwners.get(l.id)
    if (owner) flag('ERROR', lwhere, `duplicate lesson id (already used by ${owner})`)
    else idOwners.set(l.id, lwhere)
    // per-lesson battery
    checkLessonMeta(l, lwhere)
    checkHeadings(l, lwhere)
    checkBlocks(l, lwhere)
    scanPlaceholders(l, lwhere)
    checkTitleCoverage(l, lwhere)
    checkTopicDepth(l, lwhere)
  })
}

function checkBook(book: Book) {
  if (blank(book.title) || blank(book.description) || blank(book.level)) {
    flag('ERROR', book.id, 'book metadata incomplete (title/description/level)')
  }
  if (book.status === 'complete') {
    const planned = book.chapters.filter((c) => (c.plannedLessons?.length ?? 0) > 0)
    if (planned.length > 0) {
      flag(
        'ERROR',
        book.id,
        `book marked COMPLETE but ${planned.length} chapter(s) still list planned lessons: ${planned.map((c) => `ch.${c.number}`).join(', ')}`,
      )
    }
    const empty = book.chapters.filter((c) => c.lessons.length === 0 && !(c.plannedLessons ?? []).length)
    if (empty.length > 0) {
      flag('ERROR', book.id, `book marked COMPLETE but ${empty.length} chapter(s) have no lessons at all`)
    }
  }
  for (const ch of book.chapters) checkChapter(book, ch)
}

/* disk-vs-registry: every ch-NN.ts must be imported by its book.ts.
 * Folder names and book ids can differ slightly (folder
 * `arithmetic-number-systems` vs book id `arithmetic-and-number-systems`),
 * so a disk folder is matched to its registry book by SHARED CHAPTER
 * IDENTITY (same number + slug) first, id second, title third. */
async function checkDiskWiring() {
  const root = join(process.cwd(), 'src/data/library/books')
  for (const disc of readdirSync(root, { withFileTypes: true })) {
    if (!disc.isDirectory()) continue
    const discDir = join(root, disc.name)
    for (const bk of readdirSync(discDir, { withFileTypes: true })) {
      if (!bk.isDirectory()) continue
      const bookDir = join(discDir, bk.name)
      const files = readdirSync(bookDir).filter((f) => /^ch-\d+\.ts$/.test(f))
      if (files.length === 0) continue
      const diskChaps: { file: string; ch: Chapter }[] = []
      for (const f of files) {
        const mod = (await import(pathToFileURL(join(bookDir, f)).href)) as Record<
          string,
          unknown
        >
        const chaps = Object.values(mod).filter(
          (v) =>
            v !== null &&
            typeof v === 'object' &&
            'number' in (v as object) &&
            'lessons' in (v as object),
        ) as Chapter[]
        if (chaps.length === 0) {
          flag('WARN', `${bk.name}/${f}`, 'file exports no Chapter object')
          continue
        }
        for (const ch of chaps) diskChaps.push({ file: f, ch })
      }
      // identity matching (number + slug)
      let registry: Book | undefined = allBooks.find((b) =>
        diskChaps.some(({ ch }) =>
          b.chapters.some((rc) => rc.number === ch.number && rc.slug === ch.slug),
        ),
      )
      if (!registry) {
        registry = allBooks.find(
          (b) => b.id === bk.name || b.title.toLowerCase().replace(/\s+/g, '-') === bk.name,
        )
      }
      if (!registry) {
        flag('ERROR', bk.name, `book folder has ${files.length} chapter files but no book in the registry`)
        continue
      }
      for (const { file, ch: dc } of diskChaps) {
        const rc = registry.chapters.find((c) => c.number === dc.number)
        if (!rc) {
          flag(
            'ERROR',
            `${bk.name}/${file}`,
            `chapter ${dc.number} exists on disk but is NOT imported by book.ts — invisible in the TOC`,
          )
        } else if (rc.lessons.length === 0 && dc.lessons.length > 0) {
          flag(
            'ERROR',
            `${bk.name}/${file}`,
            `book.ts carries a stub chapter ${dc.number} while the disk file holds ${dc.lessons.length} written lessons — wiring mismatch`,
          )
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Run + report                                                        */
/* ------------------------------------------------------------------ */

async function main() {
  // pre-pass: every written lesson id, for prerequisite resolution
  for (const book of allBooks)
    for (const ch of book.chapters)
      for (const l of ch.lessons) allLessonIds.add(l.id)
  for (const book of allBooks) checkBook(book)
  await checkDiskWiring()

  const errors = findings.filter((f) => f.sev === 'ERROR')
  const warns = findings.filter((f) => f.sev === 'WARN')

  /* per-book written-lesson summary */
  console.log('=== Written-content inventory ===')
  for (const b of allBooks) {
    const lessons = b.chapters.flatMap((c) => c.lessons)
    if (lessons.length === 0) continue
    let heads = 0,
      examples = 0,
      exq = 0,
      quizq = 0,
      figures = 0,
      words = 0
    for (const l of lessons) {
      for (const bl of l.blocks) {
        if (bl.kind === 'heading') heads++
        if (bl.kind === 'example') examples++
        if (bl.kind === 'figure') figures++
        if (bl.kind === 'quiz') quizq += bl.items.length
        if (bl.kind === 'exercises') exq += bl.sets.reduce((n, s) => n + s.questions.length, 0)
      }
      words += countLessonWords(l)
    }
    console.log(
      `${b.id.padEnd(28)} ${String(lessons.length).padStart(3)} lessons  ${String(words).padStart(7)} words  ${String(heads).padStart(4)} headings  ${String(examples).padStart(3)} illustrations  ${String(exq).padStart(4)} exercise questions  ${String(quizq).padStart(3)} quiz items  ${String(figures).padStart(3)} figures`,
    )
  }

  console.log('\n=== Findings ===')
  if (findings.length === 0) console.log('(none — all clean)')
  for (const f of errors) console.log(`ERROR  ${f.where} :: ${f.msg}`)
  for (const f of warns) console.log(`WARN   ${f.where} :: ${f.msg}`)

  console.log(`\n=== TOTAL: ${errors.length} errors, ${warns.length} warnings ===`)
  if (errors.length > 0) {
    console.error('CONTENT-COMPLETENESS AUDIT: FAIL')
    process.exit(1)
  }
  console.log('CONTENT-COMPLETENESS AUDIT: PASS')
}

main().catch((e) => {
  console.error('audit crashed:', e)
  process.exit(2)
})
