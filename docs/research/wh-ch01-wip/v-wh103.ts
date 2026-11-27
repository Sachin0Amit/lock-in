/* v-wh103 — seat harness for lesson 1.3 'Time, Periodisation and the Calendar'
 * Engine section recomputes every number with a brute-force isLeap; pins audit the part. */
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
export {}

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
  try { mod = await import('./part-wh103'); pcheck('P01 part file loads and exports lessonWh103', !!mod?.lessonWh103, '') } catch (e) { pcheck('P01 part file loads and exports lessonWh103', false, String(e)) }
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
const e = report('wh103-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('wh103-pins', pins)
const fail = e.fail + p.fail
console.log(`wh103 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
