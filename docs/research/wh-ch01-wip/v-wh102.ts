/* v-wh102 — seat harness for lesson 1.2 'Sources: Literary and Archaeological'
 * Engine section recomputes every number; pins section audits the part file. */
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
export {}

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
  try { mod = await import('./part-wh102'); pcheck('P01 part file loads and exports lessonWh102', !!mod?.lessonWh102, '') } catch (e) { pcheck('P01 part file loads and exports lessonWh102', false, String(e)) }
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
const e = report('wh102-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('wh102-pins', pins)
const fail = e.fail + p.fail
console.log(`wh102 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
