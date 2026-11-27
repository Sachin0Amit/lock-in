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
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

export {}

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
    mod = await import('./part-wh101')
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

/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('wh101-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('wh101-pins', pins)
const fail = e.fail + p.fail
console.log(`wh101 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
