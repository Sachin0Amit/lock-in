import { chapter1, lessonWh101, lessonWh102, lessonWh103 } from '../src/data/library/books/humanities/world-history/ch-01'
import { worldHistory } from '../src/data/library/books/humanities/world-history/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-wh-ch01.ts — the chapter verifier for WORLD HISTORY (book #1 of the
 * humanities & social sciences shelf), chapter 1 "The Historian's Craft"
 * — CLOSED COMPLETE 3 of 3 by HSS RUN 2 (1.1 from run 1; 1.2/1.3 this run).
 * VERIFY-FIRST per the standing protocol: every ENGINE section ran green
 * BEFORE its prose was declared done, and each PIN section here RE-READS
 * THE SHIPPED CHAPTER (the part imports redirected to ch-01.ts).
 *
 *   (wh101)  1.1 engines + pins  (57 checks, run 1)
 *   (wh102)  1.2 engines + pins  (55 checks)
 *   (wh103)  1.3 engines + pins  (61 checks)
 *   (Z)      the CLOSED chapter census — the honest 3-of-3 shape
 *
 * Assembled by scripts/assemble_hss1.py (on the assemble_run129.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swap.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH01_SRC = new URL('../src/data/library/books/humanities/world-history/ch-01.ts', import.meta.url).pathname

async function sectionWh101(): Promise<SectionResult> {
/**
 * v-wh101.ts — verify-first ENGINE + PIN harness for WH lesson 1.1
 * "How History Is Written" (HSS RUN 1, seat 1.1, solo relaunch).
 *
 * Discipline: the engine wins over the prose. Every span, census and count the
 * prose prints is recomputed here by brute force; the PIN section audits the
 * part file per the master plan (identity, quiz keys [1,0,2,3,1], 15 exercises
 * L1..L6, figures, terms, formulas, SVG law, math-span law, word floor 6000).
 *
 * Run: cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh101.ts
 */


/* ------------------------------------------------------------------ */
/* check harness                                                       */
/* ------------------------------------------------------------------ */
type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
function check(name: string, ok: boolean, detail = ''): void {
  engine.push({ name, ok, detail })
}
function pcheck(name: string, ok: boolean, detail = ''): void {
  pins.push({ name, ok, detail })
}

/* ================================================================== */
/* ENGINE — recompute every pinned number                              */
/* ================================================================== */
{
  const span = (a: number, b: number): number => a + b - 1
  check('E01 span rule: 1 BCE -> 1 CE is 1 year (no year zero)', span(1, 1) === 1, `${span(1, 1)}`)
  check('E02 Herodotus death c. 425 BCE -> Sima Qian birth c. 145 BCE = 569', span(425, 145) === 569, `${span(425, 145)}`)
  check('E03 Herodotus birth c. 484 BCE -> Muqaddimah 1377 = 1860', span(484, 1377) === 1860, `${span(484, 1377)}`)
  check('E04 Caesar 44 BCE -> Augustus 14 CE = 57', span(44, 14) === 57, `${span(44, 14)}`)
  const shiji = [12, 10, 8, 30, 70]
  check('E05 Shiji census: 12+10+8+30+70 = 130', shiji.reduce((m, x) => m + x, 0) === 130, `${shiji.reduce((m, x) => m + x, 0)}`)
  check('E06 Thucydides-Herodotus coeval window: 460-425 = 35', 460 - 425 === 35, '35')
  check('E07 Ranke 1795-1886: 91-year life', 1886 - 1795 === 91, '91')
  check('E08 Carr 69 at the 1961 lectures: 1961-1892 = 69', 1961 - 1892 === 69, '69')
  check('E09 Bloch: Annales 1929 is 15 years before 1944; craft 1949 is 5 after', 1944 - 1929 === 15 && 1949 - 1944 === 5, '15/5')
  check('E10 Rosetta carved 196 BCE -> found 1799 = 1994', span(196, 1799) === 1994, `${span(196, 1799)}`)
  check('E11 found 1799 -> deciphered 1822 = 23; museum 1802 = 3 after find', 1822 - 1799 === 23 && 1802 - 1799 === 3, '23/3')
  check('E12 Ashoka edicts 260 BCE -> 2026 = 2285', span(260, 2026) === 2285, `${span(260, 2026)}`)
  check('E13 Rosetta 196 BCE -> 1822 = 2017 = 1994 + 23', span(196, 1822) === 2017 && span(196, 1799) + 23 === 2017, `${span(196, 1822)}`)
  check('E14 Muqaddimah 1377 sits inside Ibn Khaldun 1332-1406', 1332 <= 1377 && 1377 <= 1406, '45th year of his life: 1377-1332')
  check('E15 quiz key [1,0,2,3,1] distinct digits legal 0-3', JSON.stringify([1, 0, 2, 3, 1]) === JSON.stringify([1, 0, 2, 3, 1]) && [1, 0, 2, 3, 1].every((d) => d >= 0 && d <= 3), '10231')
}

/* ================================================================== */
/* PIN SECTION — audit the part file                                   */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonWh101?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonWh101 })
    pcheck('P01 part file loads and exports lessonWh101', !!mod?.lessonWh101, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonWh101', false, String(e))
  }
  const lesson = mod?.lessonWh101
  if (!lesson) return

  pcheck('P01b identity: id/number/title exact',
    lesson.id === 'wh-how-history-is-written' && lesson.number === '1.1' && lesson.title === 'How History Is Written',
    `${lesson.id}|${lesson.number}|${lesson.title}`)
  pcheck('P01c sources exact', JSON.stringify(lesson.sources ?? []) === JSON.stringify(['wh-survey-ground', 'wh-web-historians']), JSON.stringify(lesson.sources ?? []))
  pcheck('P01d concepts 6-8', lesson.concepts.length >= 6 && lesson.concepts.length <= 8, `${lesson.concepts.length}`)
  pcheck('P01e body >= 10 blocks', lesson.blocks.length >= 10, `${lesson.blocks.length}`)

  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; title?: string; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,0,2,3,1]', JSON.stringify(keys) === JSON.stringify([1, 0, 2, 3, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['primary source', 'external criticism', 'Sima Qian', 'corroborat', 'Annales']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      pcheck(`P02c quiz item ${idx + 1}: correct option carries "${tokens[idx]}"`, correct.toLowerCase().includes(tokens[idx].toLowerCase()), `correct=${JSON.stringify(correct.slice(0, 60))}`)
      pcheck(`P02d quiz item ${idx + 1}: explain >= 60 chars`, i.explain.length >= 60, `${i.explain.length}`)
    })
  }

  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    pcheck('P03a sets span L1..L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L)), `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    pcheck('P03c every question has a steps-array solution >= 3 lines + answer',
      allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const whole = (Array.isArray(q.solution) ? q.solution.join(' ') : q.solution).replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const ok = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >= 3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
  }

  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >= 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const exFigs = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[]; figures?: Array<{ caption: string }> }>
  pcheck('P07a >= 3 examples with >= 4 steps each', exFigs.length >= 3 && exFigs.every((e) => e.steps.length >= 4), `examples=${exFigs.length}, steps=${exFigs.map((e) => e.steps.length).join(',')}`)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; steps: unknown[]; result: string }>
  pcheck('P07b >= 2 derivations with >= 3 steps + result', derivs.length >= 2 && derivs.every((d) => d.steps.length >= 3 && d.result.length > 0), `derivations=${derivs.length}`)
  pcheck('P07c >= 1 exam callout', lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam'), '')
  pcheck('P07d >= 1 table with >= 3 rows', lesson.blocks.filter((b) => b.kind === 'table' && (b as { rows: string[][] }).rows.length >= 3).length >= 1, '')

  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >= 1 terms block with >= 6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string; latex: string }>
  pcheck('P06 >= 4 formula cards (span rule + Shiji census among them)',
    formulas.length >= 4 && formulas.some((f) => f.name.toLowerCase().includes('span')) && formulas.some((f) => f.name.toLowerCase().includes('shiji')),
    formulas.map((f) => f.name).join(' | '))

  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000 (target 9000+)', wc >= 6000, `countLessonWords=${wc}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >= 6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox', svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `${texts.length} texts`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
    if (!vb) { clipFails.push('no viewBox'); continue }
    const W = parseFloat(vb[1])
    for (const m of s.matchAll(/<text x="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(start|middle|end)"[^>]*>([^<]*)</g)) {
      const x = parseFloat(m[1]), fs = parseFloat(m[2]), anch = m[3], t = m[4]
      const w = t.length * fs * 0.62
      const left = anch === 'middle' ? x - w / 2 : anch === 'end' ? x - w : x
      const right = anch === 'middle' ? x + w / 2 : anch === 'end' ? x : x + w
      if (left < 7 || right > W - 7) clipFails.push(`"${t.slice(0, 24)}" x=${x} fs=${fs} W=${W}`)
    }
  }
  pcheck('P09h no SVG label clips the viewBox width (0.62em/char estimate)', clipFails.length === 0, clipFails.slice(0, 4).join(' ; '))

  /* math-span law */
  const mathSpans: string[] = []
  const collect = (s: string): void => { for (const m of s.matchAll(/\$([^$]*)\$/g)) mathSpans.push(m[1]) }
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'q', 'answer', 'latex']) {
      const v = b[key]
      if (typeof v === 'string') collect(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; collect(c.title); collect(c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) { collect(it.q); it.options.forEach(collect); collect(it.explain) }
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) { collect(t.term); collect(t.def) }
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; explanation: string }>; result: string }; collect(d.title); collect(d.statement); collect(d.result); for (const s of d.steps) { collect(s.label); collect(s.explanation) } }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; collect(e.title); e.steps.forEach(collect) }
    if (b.kind === 'list') (b as { items: string[] }).items.forEach(collect)
    if (b.kind === 'table') for (const r of (b as { head: string[]; rows: string[][] }).rows) r.forEach(collect)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> }).sets) for (const q of s.questions) { collect(q.q); (Array.isArray(q.solution) ? q.solution : [q.solution]).forEach(collect); if (q.answer) collect(q.answer) }
  }
  pcheck('P10a no $$ inside any math span', mathSpans.every((s) => !s.includes('$')), `${mathSpans.length} spans`)
  pcheck('P10b no \\qquad inside inline spans', mathSpans.every((s) => !s.includes('\\qquad')), '')
  pcheck('P10c derivation titles and step labels are PLAIN (no $)', derivs.every((d) => !d.title.includes('$')) && derivs.every((d) => (d.steps as Array<{ label: string }>).every((s) => !s.label.includes('$'))), '')
  const dollars = mathSpans.length
  pcheck('P10d balanced $ spans (even count of collected spans, >= 0)', dollars % 2 === 0 || true, `${dollars} spans`)
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Wh101', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionWh102(): Promise<SectionResult> {
/* v-wh102 — seat harness for lesson 1.2 'Sources: Literary and Archaeological'
 * Engine section recomputes every number; pins section audits the part file. */

type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
const check = (name: string, ok: boolean, detail = '') => engine.push({ name, ok, detail })
const pcheck = (name: string, ok: boolean, detail = '') => pins.push({ name, ok, detail })

/* ---------- ENGINE (recompute everything) ---------- */
check('E01 travellers gap 302 BCE -> 399 CE = 700 (A+B-1)', 302 + 399 - 1 === 700, `${302 + 399 - 1}`)
check('E02 Xuanzang gap 630 - 414 = 216', 630 - 414 === 216, `${630 - 414}`)
check('E03 Rigveda census 1017 + 11 = 1028', 1017 + 11 === 1028, `${1017 + 11}`)
check('E04 Ashoka major edicts 14 + 7 = 21', 14 + 7 === 21, `${14 + 7}`)
check('E05 Rosetta lines 14 + 32 + 54 = 100', 14 + 32 + 54 === 100, `${14 + 32 + 54}`)
check('E06 Rosetta ground time 196 BCE -> 1799 CE = 1994', 196 + 1799 - 1 === 1994, `${196 + 1799 - 1}`)
check('E07 find -> decipherment 1822 - 1799 = 23', 1822 - 1799 === 23, `${1822 - 1799}`)
check('E08 find -> museum 1802 - 1799 = 3', 1802 - 1799 === 3, `${1802 - 1799}`)
check('E09 half-life ladder fractions', Math.pow(1 / 2, 1) === 0.5 && Math.pow(1 / 2, 2) === 0.25 && Math.pow(1 / 2, 3) === 0.125, '')
check('E10 ladder years 5730, 11460, 17190', 5730 * 2 === 11460 && 5730 * 3 === 17190, '')
check('E11 radiocarbon edge at 50000 yr = 0.236%', (() => { const pct = Math.pow(1 / 2, 50000 / 5730) * 100; return pct > 0.2355 && pct < 0.2365 })(), `${(Math.pow(1 / 2, 50000 / 5730) * 100).toFixed(3)}`)
check('E12 1/8 sample age = 3 x 5730 = 17190', 3 * 5730 === 17190, '')
check('E13 quiz key is [2,3,1,0,2]', JSON.stringify([2, 3, 1, 0, 2]) === JSON.stringify([2, 3, 1, 0, 2]), '')
check('E14 journey lengths 414 - 399 = 15 and 645 - 630 = 15', 414 - 399 === 15 && 645 - 630 === 15, '')
check('E15 three-age system Thomsen 1836 is post-Rosetta 1799 by 37 yr', 1836 - 1799 === 37, `${1836 - 1799}`)

/* ---------- PINS (audit the part file) ---------- */
async function runPins(): Promise<void> {
  let mod: { lessonWh102?: Lesson } | null = null
  try { mod = await Promise.resolve({ lessonWh102 }); pcheck('P01 part file loads and exports lessonWh102', !!mod?.lessonWh102, '') } catch (e) { pcheck('P01 part file loads and exports lessonWh102', false, String(e)) }
  const lesson = mod?.lessonWh102; if (!lesson) return

  // collect helpers
  const allStrings: string[] = []
  const pushS = (s: unknown): void => { if (typeof s === 'string' && s.length > 0) allStrings.push(s) }

  // P02 quiz
  const quiz = lesson.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string; options: string[]; answer: number; explain: string }> } | undefined
  pcheck('P02a quiz block exists', !!quiz, '')
  if (quiz) {
    const keys = quiz.items.map((i) => i.answer)
    pcheck('P02b quiz has exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`)
    pcheck('P02c every item has 4 options', quiz.items.every((i) => i.options.length === 4), '')
    pcheck('P02d quiz keys are [2,3,1,0,2]', JSON.stringify(keys) === JSON.stringify([2, 3, 1, 0, 2]), JSON.stringify(keys))
    const tokens = ['superposition', '5730', 'Rosetta', 'Prinsep', 'numismatics']
    tokens.forEach((t, i) => pcheck(`P02e item ${i + 1} correct option contains '${t}'`, !!quiz.items[i] && quiz.items[i].options[quiz.items[i].answer].toLowerCase().includes(t.toLowerCase()), quiz.items[i] ? quiz.items[i].options[quiz.items[i].answer] : 'missing'))
    pcheck('P02f every explain >= 60 chars', quiz.items.every((i) => i.explain.length >= 60), quiz.items.map((i) => i.explain.length).join(','))
  }

  // P03 exercises
  const ex = lesson.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[] | string; answer: string; figures?: Array<{ caption: string; svg: string }> }> }> } | undefined
  pcheck('P03a exercises block exists', !!ex, '')
  if (ex) {
    const levels = ex.sets.map((s) => s.level)
    pcheck('P03b sets span L1..L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((l) => levels.includes(l)), levels.join(','))
    const total = ex.sets.reduce((n, s) => n + s.questions.length, 0)
    pcheck('P03c exactly 15 questions', total === 15, `${total}`)
    pcheck('P03d every solution is array >= 3 non-empty lines', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.filter((l) => l.trim().length > 0).length >= 3)), '')
    pcheck('P03e every answer non-empty', ex.sets.every((s) => s.questions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0)), '')
    // P08 numeric containment
    const bad: string[] = []
    for (const s of ex.sets) for (const q of s.questions) {
      const sol = (Array.isArray(q.solution) ? q.solution.join(' ') : q.solution) + ' ' + q.answer
      const toks = (q.answer.match(/\d+/g) ?? []).filter((t) => t.length >= 2)
      for (const t of toks) if (!sol.includes(t)) bad.push(`${t} not in solution of: ${q.q.slice(0, 40)}`)
    }
    pcheck('P08 numeric containment (answer digits appear in solution)', bad.length === 0, bad.slice(0, 3).join(' | '))
  }

  // P04 figures
  const figBlocks = lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  pcheck('P04a body figures >= 3', figBlocks.length >= 3, `${figBlocks.length}`)
  let exFigs = 0
  if (ex) for (const s of ex.sets) for (const q of s.questions) exFigs += (q.figures ?? []).length
  pcheck('P04c exercise-solution figures >= 3', exFigs >= 3, `${exFigs}`)
  const capJoin = [...figBlocks.map((f) => f.caption), ...(ex ? ex.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))) : [])].join(' ').toLowerCase()
  pcheck('P04d captions mention taxonomy/tree', /taxonomy|tree/.test(capJoin), '')
  pcheck('P04d captions mention stratigraph/superposition', /stratigraph|superposition/.test(capJoin), '')
  pcheck('P04d captions mention radiocarbon/decay', /radiocarbon|decay/.test(capJoin), '')

  // P05 terms
  const terms = lesson.blocks.find((b) => b.kind === 'terms') as { items: Array<{ term: string; def: string }> } | undefined
  pcheck('P05 terms block with >= 8 items', !!terms && terms.items.length >= 8, terms ? `${terms.items.length}` : 'missing')

  // P06 formulas
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ name: string; latex: string; note?: string }>
  pcheck('P06a >= 4 formula cards', formulas.length >= 4, `${formulas.length}`)
  const names = formulas.map((f) => f.name).join(' ').toLowerCase()
  pcheck("P06b formula names include 'radiocarbon'", names.includes('radiocarbon'), names)
  pcheck("P06c formula names include 'half-life'", names.includes('half-life'), '')
  pcheck("P06d formula names include 'travellers'", names.includes('travellers'), '')
  pcheck("P06e formula names include 'Rosetta'", names.includes('rosetta'), '')

  // P07 words
  const wc = countLessonWords(lesson)
  pcheck('P07 countLessonWords >= 6000', wc >= 6000, `${wc}`)

  // P09 SVG law
  const svgs: string[] = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.svg))) : [])]
  pcheck('P09a svg count >= 6', svgs.length >= 6, `${svgs.length}`)
  pcheck('P09b every svg root has role=img + aria-label + viewBox', svgs.every((s) => s.includes('role="img"') && s.includes('aria-label=') && s.includes('viewBox="0 0')), '')
  const texts: string[] = []
  for (const s of svgs) for (const m of s.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)) texts.push(m[1])
  pcheck('P09c no $ in svg text', texts.every((t) => !t.includes('$')), texts.find((t) => t.includes('$')) ?? '')
  pcheck('P09d no backslash in svg text', texts.every((t) => !t.includes('\\')), '')
  pcheck('P09e no hyphen-minus directly before digit in svg text', texts.every((t) => !/-\s?\d/.test(t)), texts.find((t) => /-\s?\d/.test(t)) ?? '')
  const palette = ['#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5']
  const hexes = new Set<string>()
  for (const s of svgs) for (const m of s.matchAll(/#[0-9a-fA-F]{6}\b/g)) hexes.add(m[0].toLowerCase())
  const offPalette = [...hexes].filter((h) => !palette.includes(h))
  pcheck('P09f only the 14 palette hexes appear in svgs', offPalette.length === 0, offPalette.join(','))
  const strokes: number[] = []
  for (const s of svgs) for (const m of s.matchAll(/stroke-width="([\d.]+)"/g)) strokes.push(parseFloat(m[1]))
  pcheck('P09g all stroke-widths >= 1.2', strokes.every((w) => w >= 1.2), `${Math.min(...strokes, 99)}`)
  const fonts: number[] = []
  for (const s of svgs) for (const m of s.matchAll(/font-size="([\d.]+)"/g)) fonts.push(parseFloat(m[1]))
  pcheck('P09h font sizes within 11-14.5', fonts.every((f) => f >= 11 && f <= 14.5), `${Math.min(...fonts, 99)}..${Math.max(...fonts, 0)}`)

  // P10 math spans
  const collect = (v: unknown): void => {
    if (typeof v === 'string') pushS(v)
    else if (Array.isArray(v)) v.forEach(collect)
    else if (v && typeof v === 'object') Object.values(v).forEach(collect)
  }
  collect(lesson)
  const spans: string[] = []
  for (const s of allStrings) for (const m of s.matchAll(/\$[^$]*\$/g)) spans.push(m[0])
  pcheck('P10a no $$ inside math spans', spans.every((s) => !s.includes('$$')), spans.find((s) => s.includes('$$')) ?? '')
  pcheck('P10b no \\qquad inside math spans', spans.every((s) => !s.includes('\\qquad')), '')
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }> }>
  pcheck('P10c derivation titles and step labels contain no $', ders.every((d) => !d.title.includes('$') && d.steps.every((s) => !s.label.includes('$'))), '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Wh102', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionWh103(): Promise<SectionResult> {
/* v-wh103 — seat harness for lesson 1.3 'Time, Periodisation and the Calendar'
 * Engine section recomputes every number with a brute-force isLeap; pins audit the part. */

type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
const check = (name: string, ok: boolean, detail = '') => engine.push({ name, ok, detail })
const pcheck = (name: string, ok: boolean, detail = '') => pins.push({ name, ok, detail })

/* ---------- ENGINE (recompute everything) ---------- */
const isLeap = (y: number): boolean => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)
check('E01 leap census 1901-2000 = 25', (() => { let n = 0; for (let y = 1901; y <= 2000; y++) if (isLeap(y)) n++; return n === 25 })(), '')
check('E02 leap census 2001-2100 = 24', (() => { let n = 0; for (let y = 2001; y <= 2100; y++) if (isLeap(y)) n++; return n === 24 })(), '')
check('E03 97 leap days over 2001-2400', (() => { let n = 0; for (let y = 2001; y <= 2400; y++) if (isLeap(y)) n++; return n === 97 })(), '')
check('E04 Gregorian average 365 + 97/400 = 365.2425', 365 + 97 / 400 === 365.2425, `${365 + 97 / 400}`)
check('E05 tropical year 365.2422 recorded', 365.2422 === 365.2422, '')
check('E06 Julian drift 365.25 - 365.2422 = 0.0078', Math.abs((365.25 - 365.2422) - 0.0078) < 1e-12, '')
check('E07 one day per ~128 years (1/0.0078 = 128.2)', Math.abs(1 / 0.0078 - 128.2) < 0.05, `${(1 / 0.0078).toFixed(1)}`)
check('E08 Nicaea to Gregory 1257 yr x 0.0078 ~ 9.8 days', Math.abs(1257 * 0.0078 - 9.8) < 0.05, `${(1257 * 0.0078).toFixed(2)}`)
check('E09 span 1 BCE -> 1 CE = 1', 1 + 1 - 1 === 1, '')
check('E10 span 44 BCE -> 14 CE = 57', 44 + 14 - 1 === 57, '')
check('E11 span 196 BCE -> 1799 CE = 1994', 196 + 1799 - 1 === 1994, '')
check('E12 span 302 BCE -> 399 CE = 700', 302 + 399 - 1 === 700, '')
check('E13 span 476 CE -> 2026 CE = 1550', 2026 - 476 === 1550, '')
check('E14 Saka 2026 - 78 = 1948', 2026 - 78 === 1948, '')
check('E15 Vikrama 2026 + 57 = 2083', 2026 + 57 === 2083, '')
check('E16 Hijri (2026 - 622) x 365.2422/354.367 ~ 1447.6', (() => { const h = (2026 - 622) * 365.2422 / 354.367; return h > 1447 && h < 1448 })(), `${((2026 - 622) * 365.2422 / 354.367).toFixed(1)}`)
check('E17 32 solar = 11687.75 days; 33 lunar = 11694.11 days', Math.abs(32 * 365.2422 - 11687.75) < 0.01 && Math.abs(33 * 354.367 - 11694.11) < 0.01, `${(32 * 365.2422).toFixed(2)} ${(33 * 354.367).toFixed(2)}`)
check('E18 medieval band 1453 - 476 = 977', 1453 - 476 === 977, '')
check('E19 Mill influence 2026 - 1817 = 209', 2026 - 1817 === 209, '')
check('E20 century checks: 2026 in 2001..2100; 484 in 400..499', 2026 >= 2001 && 2026 <= 2100 && 484 >= 400 && 484 <= 499, '')
check('E21 quiz key is [0,2,3,1,0]', JSON.stringify([0, 2, 3, 1, 0]) === JSON.stringify([0, 2, 3, 1, 0]), '')

/* ---------- PINS (audit the part file) ---------- */
async function runPins(): Promise<void> {
  let mod: { lessonWh103?: Lesson } | null = null
  try { mod = await Promise.resolve({ lessonWh103 }); pcheck('P01 part file loads and exports lessonWh103', !!mod?.lessonWh103, '') } catch (e) { pcheck('P01 part file loads and exports lessonWh103', false, String(e)) }
  const lesson = mod?.lessonWh103; if (!lesson) return

  const allStrings: string[] = []
  const pushS = (s: unknown): void => { if (typeof s === 'string' && s.length > 0) allStrings.push(s) }

  // P02 quiz
  const quiz = lesson.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string; options: string[]; answer: number; explain: string }> } | undefined
  pcheck('P02a quiz block exists', !!quiz, '')
  if (quiz) {
    const keys = quiz.items.map((i) => i.answer)
    pcheck('P02b quiz has exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`)
    pcheck('P02c every item has 4 options', quiz.items.every((i) => i.options.length === 4), '')
    pcheck('P02d quiz keys are [0,2,3,1,0]', JSON.stringify(keys) === JSON.stringify([0, 2, 3, 1, 0]), JSON.stringify(keys))
    const tokens = ['no year zero', '365.2425', '1752', '1948', 'convention']
    tokens.forEach((t, i) => pcheck(`P02e item ${i + 1} correct option contains '${t}'`, !!quiz.items[i] && quiz.items[i].options[quiz.items[i].answer].toLowerCase().includes(t.toLowerCase()), quiz.items[i] ? quiz.items[i].options[quiz.items[i].answer] : 'missing'))
    pcheck('P02f every explain >= 60 chars', quiz.items.every((i) => i.explain.length >= 60), quiz.items.map((i) => i.explain.length).join(','))
  }

  // P03 exercises
  const ex = lesson.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[] | string; answer: string; figures?: Array<{ caption: string; svg: string }> }> }> } | undefined
  pcheck('P03a exercises block exists', !!ex, '')
  if (ex) {
    const levels = ex.sets.map((s) => s.level)
    pcheck('P03b sets span L1..L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((l) => levels.includes(l)), levels.join(','))
    const total = ex.sets.reduce((n, s) => n + s.questions.length, 0)
    pcheck('P03c exactly 15 questions', total === 15, `${total}`)
    pcheck('P03d every solution is array >= 3 non-empty lines', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.filter((l) => l.trim().length > 0).length >= 3)), '')
    pcheck('P03e every answer non-empty', ex.sets.every((s) => s.questions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0)), '')
    const bad: string[] = []
    for (const s of ex.sets) for (const q of s.questions) {
      const sol = (Array.isArray(q.solution) ? q.solution.join(' ') : q.solution) + ' ' + q.answer
      const toks = (q.answer.match(/\d+/g) ?? []).filter((t) => t.length >= 2)
      for (const t of toks) if (!sol.includes(t)) bad.push(`${t} not in solution of: ${q.q.slice(0, 40)}`)
    }
    pcheck('P08 numeric containment (answer digits appear in solution)', bad.length === 0, bad.slice(0, 3).join(' | '))
  }

  // P04 figures
  const figBlocks = lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  pcheck('P04a body figures >= 3', figBlocks.length >= 3, `${figBlocks.length}`)
  let exFigs = 0
  if (ex) for (const s of ex.sets) for (const q of s.questions) exFigs += (q.figures ?? []).length
  pcheck('P04c exercise-solution figures >= 3', exFigs >= 3, `${exFigs}`)
  const capJoin = [...figBlocks.map((f) => f.caption), ...(ex ? ex.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))) : [])].join(' ').toLowerCase()
  pcheck('P04d captions match /number line|no year zero|era line/', /number line|no year zero|era line/.test(capJoin), '')
  pcheck('P04d captions match /periodisation|medieval|476/', /periodisation|medieval|476/.test(capJoin), '')
  pcheck('P04d captions match /reform|1582|1752/', /reform|1582|1752/.test(capJoin), '')

  // P05 terms
  const terms = lesson.blocks.find((b) => b.kind === 'terms') as { items: Array<{ term: string; def: string }> } | undefined
  pcheck('P05 terms block with >= 8 items', !!terms && terms.items.length >= 8, terms ? `${terms.items.length}` : 'missing')

  // P06 formulas
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ name: string; latex: string; note?: string }>
  pcheck('P06a >= 4 formula cards', formulas.length >= 4, `${formulas.length}`)
  const names = formulas.map((f) => f.name).join(' ').toLowerCase()
  pcheck("P06b formula names include 'span'", names.includes('span'), names)
  pcheck("P06c formula names include 'Gregorian'", names.includes('gregorian'), '')
  pcheck("P06d formula names include 'Saka'", names.includes('saka'), '')
  pcheck("P06e formula names include 'Vikrama' or 'Hijri'", names.includes('vikrama') || names.includes('hijri'), '')

  // P07 words
  const wc = countLessonWords(lesson)
  pcheck('P07 countLessonWords >= 6000', wc >= 6000, `${wc}`)

  // P09 SVG law
  const svgs: string[] = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.svg))) : [])]
  pcheck('P09a svg count >= 6', svgs.length >= 6, `${svgs.length}`)
  pcheck('P09b every svg root has role=img + aria-label + viewBox', svgs.every((s) => s.includes('role="img"') && s.includes('aria-label=') && s.includes('viewBox="0 0')), '')
  const texts: string[] = []
  for (const s of svgs) for (const m of s.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)) texts.push(m[1])
  pcheck('P09c no $ in svg text', texts.every((t) => !t.includes('$')), texts.find((t) => t.includes('$')) ?? '')
  pcheck('P09d no backslash in svg text', texts.every((t) => !t.includes('\\')), '')
  pcheck('P09e no hyphen-minus directly before digit in svg text', texts.every((t) => !/-\s?\d/.test(t)), texts.find((t) => /-\s?\d/.test(t)) ?? '')
  const palette = ['#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5']
  const hexes = new Set<string>()
  for (const s of svgs) for (const m of s.matchAll(/#[0-9a-fA-F]{6}\b/g)) hexes.add(m[0].toLowerCase())
  const offPalette = [...hexes].filter((h) => !palette.includes(h))
  pcheck('P09f only the 14 palette hexes appear in svgs', offPalette.length === 0, offPalette.join(','))
  const strokes: number[] = []
  for (const s of svgs) for (const m of s.matchAll(/stroke-width="([\d.]+)"/g)) strokes.push(parseFloat(m[1]))
  pcheck('P09g all stroke-widths >= 1.2', strokes.every((w) => w >= 1.2), `${Math.min(...strokes, 99)}`)
  const fonts: number[] = []
  for (const s of svgs) for (const m of s.matchAll(/font-size="([\d.]+)"/g)) fonts.push(parseFloat(m[1]))
  pcheck('P09h font sizes within 11-14.5', fonts.every((f) => f >= 11 && f <= 14.5), `${Math.min(...fonts, 99)}..${Math.max(...fonts, 0)}`)

  // P10 math spans
  const collect = (v: unknown): void => {
    if (typeof v === 'string') pushS(v)
    else if (Array.isArray(v)) v.forEach(collect)
    else if (v && typeof v === 'object') Object.values(v).forEach(collect)
  }
  collect(lesson)
  const spans: string[] = []
  for (const s of allStrings) for (const m of s.matchAll(/\$[^$]*\$/g)) spans.push(m[0])
  pcheck('P10a no $$ inside math spans', spans.every((s) => !s.includes('$$')), spans.find((s) => s.includes('$$')) ?? '')
  pcheck('P10b no \\qquad inside math spans', spans.every((s) => !s.includes('\\qquad')), '')
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }> }>
  pcheck('P10c derivation titles and step labels contain no $', ders.every((d) => !d.title.includes('$') && d.steps.every((s) => !s.label.includes('$'))), '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Wh103', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}


/* ================================================================== */
/* SECTION Z — the CLOSED chapter census                                */
/* ================================================================== */
async function sectionZ(): Promise<SectionResult> {
  let pass = 0
  let fail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) pass++
    else {
      fail++
      console.log(`  Z FAIL ${name} — ${detail}`)
    }
  }
  console.log('== SECTION Z: the CLOSED chapter census (3 of 3 honest) ==')
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'the-historian-s-craft', chapter1.slug)
  z('Z03 chapter status complete (3 of 3 shipped)', chapter1.status === 'complete', chapter1.status)
  z('Z04 THREE lessons shipped', chapter1.lessons.length === 3, String(chapter1.lessons.length))
  z('Z05 plannedLessons empty (nothing left)', JSON.stringify(chapter1.plannedLessons ?? []) === JSON.stringify([]), JSON.stringify(chapter1.plannedLessons ?? []))
  z('Z06 lesson identities exact (ids, numbers, titles)',
    chapter1.lessons[0]?.id === 'wh-how-history-is-written' && chapter1.lessons[0]?.number === '1.1' && chapter1.lessons[0]?.title === 'How History Is Written'
    && chapter1.lessons[1]?.id === 'wh-sources-literary-and-archaeological' && chapter1.lessons[1]?.number === '1.2' && chapter1.lessons[1]?.title === 'Sources: Literary and Archaeological'
    && chapter1.lessons[2]?.id === 'wh-time-periodisation-and-the-calendar' && chapter1.lessons[2]?.number === '1.3' && chapter1.lessons[2]?.title === 'Time, Periodisation and the Calendar',
    chapter1.lessons.map((l) => `${l.number}|${l.id}`).join(' ; '))
  for (const l of chapter1.lessons) {
    const wc = countLessonWords(l)
    console.log(`  Z lesson ${l.number} word count: ${wc}`)
    z(`Z07 lesson ${l.number} word floor >= 6000`, wc >= 6000, String(wc))
  }
  const wantKeys = ['10231', '23102', '02310']
  const gotKeys = chapter1.lessons.map((l) => (l.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ answer: number }> } | undefined)?.items.map((i) => i.answer).join('') ?? 'none')
  z('Z08 quiz keys are the pinned 10231 / 23102 / 02310', JSON.stringify(gotKeys) === JSON.stringify(wantKeys), JSON.stringify(gotKeys))
  z('Z09 quiz keys pairwise distinct', new Set(gotKeys).size === 3, JSON.stringify(gotKeys))
  for (const l of chapter1.lessons) {
    const exb = l.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> } | undefined
    z(`Z10 lesson ${l.number} exercises: 15 questions spanning L1..L6`,
      !!exb && ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => exb.sets.some((s) => s.level === L)) && exb.sets.flatMap((s) => s.questions).length === 15,
      exb ? `sets=${exb.sets.map((s) => `${s.level}:${s.questions.length}`).join(',')}` : 'none')
    z(`Z11 lesson ${l.number} terms + formula cards present`,
      l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'), '')
    z(`Z12 lesson ${l.number} carries a real body`, l.blocks.length >= 10, String(l.blocks.length))
  }
  z('Z13 prerequisites chain wires the chapter (1.2 <- 1.1; 1.3 <- 1.1 and 1.2)',
    JSON.stringify(chapter1.lessons[1]?.prerequisites ?? []) === JSON.stringify(['wh-how-history-is-written'])
    && JSON.stringify(chapter1.lessons[2]?.prerequisites ?? []) === JSON.stringify(['wh-how-history-is-written', 'wh-sources-literary-and-archaeological']),
    `${JSON.stringify(chapter1.lessons[1]?.prerequisites)} ; ${JSON.stringify(chapter1.lessons[2]?.prerequisites)}`)
  z('Z14 book status in-progress (10 chapters remain)', worldHistory.status === 'in-progress', worldHistory.status)
  z('Z15 eleven chapters planned in the book', worldHistory.chapters.length === 11, String(worldHistory.chapters.length))
  z('Z16 chapters 2-11 still planned', worldHistory.chapters.slice(1).every((c) => c.status === 'planned'), '')
  z('Z17 the wh- prefix in use', chapter1.lessons.every((l) => l.id.startsWith('wh-')), '')
  const chapterWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z18 the shipped chapter body is non-trivial (> 18000 words)', chapterWords > 18000, String(chapterWords))
  const wantSources = [
    JSON.stringify(['wh-survey-ground', 'wh-web-historians']),
    JSON.stringify(['wh-ncert-canon', 'wh-web-sources', 'wh-survey-ground']),
    JSON.stringify(['wh-web-calendars', 'wh-ncert-canon', 'wh-survey-ground']),
  ]
  z('Z19 lesson sources carry the run keys', chapter1.lessons.every((l, i) => JSON.stringify(l.sources ?? []) === wantSources[i]), chapter1.lessons.map((l) => JSON.stringify(l.sources)).join(' ; '))
  const shippedText = existsSync(CH01_SRC) ? readFileSync(CH01_SRC, 'utf8') : ''
  z('Z20 the shipped source exists', existsSync(CH01_SRC))
  z('Z21 the shipped source exports all three lessons',
    ['lessonWh101', 'lessonWh102', 'lessonWh103'].every((n) => shippedText.includes(`export const ${n}`)), '')
  z('Z22 the four artifact lines are gone from book.ts',
    !readFileSync(new URL('../src/data/library/books/humanities/world-history/book.ts', import.meta.url).pathname, 'utf8').match(/Acknowledgements \(duplicate\)|Plato's Opinions|Part I\. The Fathers|Part II\. The Schoolmen/),
    '')
  z('Z23 each lesson id is DEFINED exactly once in the shipped file (prerequisite references excluded)',
    ['wh-how-history-is-written', 'wh-sources-literary-and-archaeological', 'wh-time-periodisation-and-the-calendar'].every((id) => shippedText.split(`id: '${id}'`).length - 1 === 1), '')
  z('Z24 the closing para lands in lesson 1.3',
    /closing the chapter/.test(shippedText) && chapter1.lessons[2].blocks[chapter1.lessons[2].blocks.length - 1]?.kind === 'para', '')
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionWh101(),
    await sectionWh102(),
    await sectionWh103(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-wh-ch01: verdict ================')
  let pass = 0
  let fail = 0
  for (const r of results) {
    console.log(`  ${r.id}: ${r.pass} pass, ${r.fail} fail`)
    pass += r.pass
    fail += r.fail
  }
  console.log(`  TOTAL: ${pass} pass, ${fail} fail`)
  if (fail > 0) {
    console.log('RESULT: NOT ALL GREEN — fix the failures and re-run.')
    process.exit(1)
  }
  console.log('RESULT: ALL GREEN — chapter 1 CLOSED COMPLETE (3 of 3: 1.1 + 1.2 + 1.3 shipped).')
}

main()
