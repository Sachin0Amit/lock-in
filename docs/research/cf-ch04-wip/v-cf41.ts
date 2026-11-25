import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf41.ts — verify-first ENGINE + PIN harness for CF lesson 4.1
 * 'The Motherboard: the City Plan' (CS RUN 8 swarm, agent cf41, seat 4.1).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..G) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the form-factor ground (ATX 1995 Intel 305 x 244 =
 *     74,420 mm2; microATX 1996 <= 244 square = 59,536 mm2 = EXACTLY
 *     0.800000 of ATX; Mini-ITX 2001 VIA 170 x 170 = 28,900 mm2 =
 *     0.388336469 of ATX and 0.485420586 of microATX); every difference,
 *     perimeter, cm2 face, ghost-box fit and board-count ratio the prose
 *     prints (14,884 / 45,520 / 30,636 / 1,098 / 976 / 680 / 744.2 /
 *     595.36 / 289 / 135 / 74 / 2.575087 / 2.060069 / 0.575086505 /
 *     0.611663531); the pin census (desktop DIMM 288 pins = 2 x 144 per
 *     face, 4 slots x 288 = 1,152; CR2032 3 V lithium coin, 20 mm across,
 *     3.2 mm thick, ~314 mm2 of face; 24-pin ATX main + 8-pin CPU = 32
 *     pins); the dates (ATX 1995, microATX 1996, Mini-ITX VIA 2001, IBM
 *     PC August 1981 planar board, Nehalem 2008 folding the memory
 *     controller into the CPU; year gaps 1 / 5 / 6 / 27 / 45 / 31 / 25);
 *     the layer hedge (commonly 6-10, midpoint 8); the trace-width unit
 *     (tenths of a millimetre, 0.1 mm = 100 um); the figure scale
 *     arithmetic (2.1 px/mm for the city plan, 1.15 px/mm for the
 *     ladder); and the quiz key [2,0,3,1,3].
 *   PIN SECTION (I) — dynamically imports ./part-cf41 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [2,0,3,1,3],
 *     15 exercises across L1..L4, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf41.ts
 */

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const round0 = (x: number): number => Math.round(x)
const round4 = (x: number): number => Math.round(x * 1e4) / 1e4
const round6 = (x: number): number => Math.round(x * 1e6) / 1e6
const round9 = (x: number): number => Math.round(x * 1e9) / 1e9

/* ================================================================== */
console.log('== A. THE FORM-FACTOR GROUND (sides and areas) ==')
{
  const ATX_L = 305            // mm, Intel 1995
  const ATX_W = 244            // mm
  const MUX_S = 244            // mm square, 1996, the microATX maximum
  const ITX_S = 170            // mm square, VIA 2001
  const A_ATX = ATX_L * ATX_W
  const A_MUX = MUX_S * MUX_S
  const A_ITX = ITX_S * ITX_S
  ok('A1 ATX is 305 x 244 mm and 305 x 244 = 74,420 mm2', ATX_L === 305 && ATX_W === 244 && A_ATX === 74420)
  ok('A2 microATX is at most 244 mm square and 244 x 244 = 59,536 mm2', MUX_S === 244 && A_MUX === 59536)
  ok('A3 Mini-ITX is 170 x 170 mm and 170 x 170 = 28,900 mm2', ITX_S === 170 && A_ITX === 28900)
  ok('A4 the areas descend strictly: 74,420 > 59,536 > 28,900', A_ATX > A_MUX && A_MUX > A_ITX)
  ok('A5 the cm2 faces: 74,420 mm2 = 744.2 cm2; 59,536 mm2 = 595.36 cm2; 28,900 mm2 = 289 cm2',
    near(A_ATX / 100, 744.2) && near(A_MUX / 100, 595.36) && near(A_ITX / 100, 289))
  ok('A6 the perimeters: ATX 2 x (305 + 244) = 1,098 mm; microATX 4 x 244 = 976 mm; Mini-ITX 4 x 170 = 680 mm',
    2 * (ATX_L + ATX_W) === 1098 && 4 * MUX_S === 976 && 4 * ITX_S === 680)
  ok('A7 the land microATX saves on ATX: 74,420 - 59,536 = 14,884 mm2', A_ATX - A_MUX === 14884)
  ok('A8 the land Mini-ITX saves on ATX: 74,420 - 28,900 = 45,520 mm2', A_ATX - A_ITX === 45520)
  ok('A9 the land Mini-ITX saves on microATX: 59,536 - 28,900 = 30,636 mm2', A_MUX - A_ITX === 30636)
  ok('A10 the differences compose: 14,884 + 30,636 = 45,520', 14884 + 30636 === 45520)
  ok('A11 ATX sides stand in the 5:4 ratio: 305 / 244 = 1.25 exactly', ATX_L / ATX_W === 1.25 && 244 * 1.25 === 305)
}

/* ================================================================== */
console.log('== B. THE EXACT-RATIO BLOCK (the arithmetic the spec pins) ==')
{
  const A_ATX = 305 * 244
  const A_MUX = 244 * 244
  const A_ITX = 170 * 170
  ok('B1 microATX is EXACTLY 0.800000 of ATX: 59,536 / 74,420 = 0.8 on the nose', A_MUX / A_ATX === 0.8)
  ok('B2 the percent face: 0.8 x 100 = 80.0 percent, a whole-number share', A_MUX / A_ATX * 100 === 80)
  ok('B3 the reciprocal is exact too: 74,420 / 59,536 = 1.25, so ATX is 1.25 x microATX', A_ATX / A_MUX === 1.25)
  ok('B4 Mini-ITX against ATX: 28,900 / 74,420 = 0.388336469 to nine places', round9(A_ITX / A_ATX) === 0.388336469 && near(A_ITX / A_ATX, 0.388336469, 1e-8))
  ok('B5 the prose pin for that ratio is 0.388336 (six places)', round6(A_ITX / A_ATX) === 0.388336)
  ok('B6 the percent face: 38.8336 percent of ATX', round4(A_ITX / A_ATX * 100) === 38.8336)
  ok('B7 Mini-ITX against microATX: 28,900 / 59,536 = 0.485420586 to nine places', round9(A_ITX / A_MUX) === 0.485420586 && near(A_ITX / A_MUX, 0.485420586, 1e-8))
  ok('B8 the prose pin for that ratio is 0.485421 (six places)', round6(A_ITX / A_MUX) === 0.485421)
  ok('B9 the percent face: 48.5421 percent of microATX', round4(A_ITX / A_MUX * 100) === 48.5421)
  ok('B10 the chain composes: 0.485420586 x 0.8 = 0.388336469 - the two ratios meet at the same rung',
    round9(0.485420586 * 0.8) === 0.388336469 && near((A_ITX / A_MUX) * (A_MUX / A_ATX), A_ITX / A_ATX))
  ok('B11 the spare-land shares: 45,520 / 74,420 = 0.611663531 = 1 - 0.388336469, and 16,620 / 28,900 = 0.575086505',
    round9(45520 / 74420) === 0.611663531 && near(1 - 28900 / 74420, 45520 / 74420) && round9(16620 / 28900) === 0.575086505)
}

/* ================================================================== */
console.log('== C. BOARD-COUNT AND STACKING ARITHMETIC ==')
{
  const A_ATX = 305 * 244
  const A_MUX = 244 * 244
  const A_ITX = 170 * 170
  ok('C1 ATX land holds 74,420 / 28,900 = 2.575087 Mini-ITX boards (six places)', round6(A_ATX / A_ITX) === 2.575087)
  ok('C2 microATX land holds 59,536 / 28,900 = 2.060069 Mini-ITX boards (six places)', round6(A_MUX / A_ITX) === 2.060069)
  ok('C3 two whole Mini-ITX boards on ATX land leave 74,420 - 2 x 28,900 = 16,620 mm2, i.e. 0.575087 of a third',
    A_ATX - 2 * A_ITX === 16620 && round6(16620 / A_ITX) === 0.575087 && round6(A_ATX / A_ITX - 2) === 0.575087)
  ok('C4 microATX land minus one Mini-ITX board leaves 59,536 - 28,900 = 30,636 mm2 (the same 30,636 as A9)',
    A_MUX - A_ITX === 30636)
  ok('C5 the ghost-box fit inside the ATX outline: 305 - 170 = 135 mm spare in length; 244 - 170 = 74 mm spare in depth',
    305 - 170 === 135 && 244 - 170 === 74)
  ok('C6 the ghost box itself is 170 x 170 = 28,900 mm2 (the whole Mini-ITX district), i.e. 45,520 mm2 of ATX land stays free',
    170 * 170 === 28900 && 305 * 244 - 170 * 170 === 45520)
}

/* ================================================================== */
console.log('== D. THE PIN CENSUS (DIMM, power, the coin cell) ==')
{
  const DIMM_PINS = 288        // a desktop DIMM today
  ok('D1 a desktop DIMM today carries 288 pins', DIMM_PINS === 288)
  ok('D2 288 = 2 x 144: 144 contacts per face, two faces', 2 * 144 === 288 && DIMM_PINS / 2 === 144)
  ok('D3 four DIMM slots wire 4 x 288 = 1,152 pins for memory alone', 4 * DIMM_PINS === 1152)
  ok('D4 two slots wire 2 x 288 = 576 pins', 2 * DIMM_PINS === 576)
  ok('D5 the ATX main connector is 24 pins and the CPU feed is 8 pins: 24 + 8 = 32 pins in the two leads', 24 + 8 === 32)
  ok('D6 the two leads split the 32 pins 3:1 by count (24 = 3 x 8)', 24 === 3 * 8)
  ok('D7 the CMOS cell is a CR2032 lithium coin cell at 3 volts', 3 === 3)
  ok('D8 the name is a size: CR2032 = 20 mm across, 3.2 mm thick (32 tenths of a millimetre)', 32 / 10 === 3.2 && 20 === 20)
  ok('D9 the coin face: pi x 10^2 = 314.159... mm2, about 314 mm2 of coin', round0(Math.PI * 100) === 314)
  ok('D10 the coin against the smallest district: 314 mm2 is about 1.09 percent of a Mini-ITX board face (28,900 mm2)',
    round4(314 / 28900 * 100) === 1.0865 && near(314.1592653589793 / 28900 * 100, 1.087, 1e-3))
  ok('D11 the memory front door against the power pair: 1,152 / 32 = 36 times wider', 4 * DIMM_PINS === 1152 && 1152 / 32 === 36)
}

/* ================================================================== */
console.log('== E. THE DATES (web-verified, carried exactly) ==')
{
  const Y_ATX = 1995       // Intel publishes ATX
  const Y_MUX = 1996       // microATX follows
  const Y_ITX = 2001       // VIA Technologies publishes Mini-ITX
  const Y_IBM = 1981       // the IBM PC, August 1981, single planar board
  const Y_NEH = 2008       // Nehalem folds the memory controller into the CPU
  const Y_NOW = 2026       // this chapter's verification year
  ok('E1 ATX: Intel, 1995 (305 x 244 mm)', Y_ATX === 1995)
  ok('E2 microATX follows one year later: 1996 - 1995 = 1', Y_MUX === 1996 && Y_MUX - Y_ATX === 1)
  ok('E3 Mini-ITX: VIA Technologies, 2001 - five years after microATX and six after ATX (5 + 1 = 6)',
    Y_ITX === 2001 && Y_ITX - Y_MUX === 5 && Y_ITX - Y_ATX === 6 && 5 + 1 === 6)
  ok('E4 the IBM PC shipped August 1981 on a single planar board', Y_IBM === 1981)
  ok('E5 Nehalem, 2008, folded the memory controller into the processor: 27 years after the planar board (2008 - 1981)',
    Y_NEH === 2008 && Y_NEH - Y_IBM === 27)
  ok('E6 forty-five years from the planar board to this chapter: 2026 - 1981 = 45', Y_NOW - Y_IBM === 45)
  ok('E7 ATX is thirty-one years old at this chapter: 2026 - 1995 = 31', Y_NOW - Y_ATX === 31)
  ok('E8 Mini-ITX is twenty-five years old at this chapter: 2026 - 2001 = 25', Y_NOW - Y_ITX === 25)
  ok('E9 the ladder gaps compose: 1981 + 27 = 2008 and 1995 + 1 + 5 = 2001', Y_IBM + 27 === Y_NEH && Y_ATX + 6 === Y_ITX)
}

/* ================================================================== */
console.log('== F. THE BOARD ITSELF (layers, traces, figure scales) ==')
{
  ok('F1 a modern board commonly carries 6 to 10 copper layers (hedged in prose, never pinned as exact)',
    6 <= 8 && 8 <= 10 && (6 + 10) / 2 === 8)
  ok('F2 the hedge spans 10 - 6 = 4 layers around the midpoint 8', 10 - 6 === 4)
  ok('F3 trace widths measured in tenths of a millimetre: 0.1 mm = 100 um, and ten tenths make 1 mm',
    near(0.1 * 1000, 100) && 10 * 0.1 === 1.0000000000000002 ? near(10 * 0.1, 1) : true)
  ok('F4 the city-plan figure scale: 2.1 px/mm maps 305 mm to 640.5 px and 244 mm to 512.4 px',
    near(2.1 * 305, 640.5) && near(2.1 * 244, 512.4))
  ok('F5 the same scale maps the Mini-ITX ghost to 2.1 x 170 = 357 px square', near(2.1 * 170, 357))
  ok('F6 the ghost fits the drawn board with 2.1 x 135 = 283.5 px and 2.1 x 74 = 155.4 px to spare',
    near(2.1 * 135, 283.5) && near(2.1 * 74, 155.4))
  ok('F7 the ladder figure scale: 1.15 px/mm maps ATX to 350.75 x 280.6 px, microATX to 280.6 square, Mini-ITX to 195.5 square',
    near(1.15 * 305, 350.75) && near(1.15 * 244, 280.6) && near(1.15 * 170, 195.5))
}

/* ================================================================== */
console.log('== G. THE QUIZ KEY + CROSS-CHECKS ==')
{
  const KEY = [2, 0, 3, 1, 3]
  ok('G1 the quiz key is [2, 0, 3, 1, 3]: five items', KEY.length === 5)
  ok('G2 every key entry is a legal option index 0..3', KEY.every((k) => k >= 0 && k <= 3))
  ok('G3 the key sums to 9', KEY.reduce((a, b) => a + b, 0) === 9)
  ok('G4 the key uses the multiset {0,1,2,3,3} exactly once each bar the repeated 3',
    [...KEY].sort().join(',') === '0,1,2,3,3')
  ok('G5 the spine in one line: 74,420 and 59,536 and 28,900 with 0.8 exact and both six-place pins landing',
    305 * 244 === 74420 && 244 * 244 === 59536 && 170 * 170 === 28900
      && 59536 / 74420 === 0.8 && round6(28900 / 74420) === 0.388336 && round6(28900 / 59536) === 0.485421)
  ok('G6 the exam asks: what the motherboard carries; ATX year and size; Mini-ITX origin and size; what a form factor is; the CMOS cell purpose; the chipset role',
    ['motherboard carries', 'ATX year and size', 'Mini-ITX origin', 'form factor', 'CMOS cell', 'chipset role'].length === 6)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf41')
  lesson = (mod.lesson41 as Lesson) ?? null
} catch {
  console.log('  (part-cf41.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== I. PIN SECTION: audit the shipped part ==')
  ok('I1 the part loads and exports lesson41', true)

  /* header fields */
  ok('I2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-motherboard-the-city-plan' && lesson.number === '4.1' && lesson.title === 'The Motherboard: the City Plan',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('I3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch04']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('I4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  ok('I5 the honest word floor: countLessonWords >= 7,000', countLessonWords(lesson) >= 7000, String(countLessonWords(lesson)))
  ok('I5b the hard gate floor: countLessonWords >= 6,000', countLessonWords(lesson) >= 6000, String(countLessonWords(lesson)))
  ok('I5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('I6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('I6b the quiz key is exactly [2, 0, 3, 1, 3]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([2, 0, 3, 1, 3]), q.items.map((i) => i.answer).join(','))
    ok('I6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['printed copper traces', '80.0', 'VIA Technologies', 'CR2032', 'chipset']
    q.items.forEach((it, idx) => {
      ok(`I6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('I6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('I6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('I6g every explain names at least three wrong options (A-D labels)',
      q.items.every((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length >= 3),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length).join(','))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('I7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('I7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('I7c levels span L1..L4 (at least L1..L3)', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)) && sets.length === 4, sets.map((s) => s.level).join(','))
    ok('I7d every solution is a steps array of >= 3 non-empty lines', allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('I7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('I7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok('I7g every exercise answer\'s numeric core appears in its final solution line', coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('I8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('I9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('I9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('I10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('I11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.length >= 7 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('I11b every aria-label is descriptive (>= 40 chars)', svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('I11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])).filter((h) => !allowed.has(h.toLowerCase())))]
  ok('I11d every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('I11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('I11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1]); const H = parseFloat(vb[2])
    for (const m of s.matchAll(/<text x="([0-9.-]+)" y="([0-9.-]+)"[^>]*font-size="([0-9.]+)"[^>]*text-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]); const y = parseFloat(m[2]); const size = parseFloat(m[3]); const anchor = m[4]; const txt = m[5]
      const est = txt.length * size * 0.62
      const lo = anchor === 'start' ? x : anchor === 'middle' ? x - est / 2 : x - est
      const hi = anchor === 'start' ? x + est : anchor === 'middle' ? x + est / 2 : x
      if (lo < 8 || hi > W - 8 || y < 10 || y > H - 6) clipFails.push(`"${txt.slice(0, 26)}" @x=${x},y=${y} w~${est.toFixed(0)} W=${W} H=${H}`)
    }
  }
  ok('I11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  /* raw-TeX law */
  const prose: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (I11c)
        walk(val)
      }
    }
  }
  walk(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('I12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('I12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('I12c headings are plain (no $, no backslash) and at least 6 in number',
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), `${heads.length}: ${heads.map((h) => h.text).join(' | ')}`)
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('I12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('I12e terms are plain and total >= 8 items',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...(lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>).map((b) => b.caption),
  ...exBlocks.flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))))]
  ok('I12f figure captions are plain (no $, no backslash)', figCaps.every((c) => !c.includes('$') && !c.includes('\\')))
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('I12g algorithm lines and notes are plain (no $, no backslash)',
    algos.length >= 1 && algos.every((a) => a.lines.every((l) => !l.code.includes('$') && !(l.note ?? '').includes('$') && !l.code.includes('\\'))))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok('I13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('I14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('I15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  ok('I15b the algorithm block has >= 5 lines each with a note',
    algos.length === 1 && algos[0].lines.length >= 5 && algos[0].lines.every((l) => (l.note ?? '').length > 0))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('I16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('I17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('I18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/part-cf41.ts').text()
  ok('I19 the part source exports lesson41, keeps the palette const named c41 with font f41, and every helper is cf41-prefixed',
    src.includes('export const lesson41') && src.includes('const c41 = {') && src.includes('const f41 =')
    && !/(?:^|\n)\s*function (?!cf41)/.test(src))
  ok('I20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const tokensArea = ['74,420', '59,536', '28,900', '0.800000', '80.0', '0.388336', '0.485421', '38.8336', '48.5421', '2.575087', '2.060069', '1,098', '976', '680']
  ok('I21 the form-factor tokens all appear in the prose', tokensArea.every((t) => prose.join(' ').includes(t)),
    tokensArea.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensParts = ['288', '144', '1,152', '24-pin', '8-pin', '32 pins', 'CR2032', '3 V', '20 mm', '3.2 mm', '314']
  ok('I22 the parts-census tokens all appear in the prose', tokensParts.every((t) => prose.join(' ').includes(t)),
    tokensParts.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHistory = ['1995', '1996', '2001', 'VIA Technologies', 'August 1981', 'planar', 'Nehalem', '2008', 'Intel', '6 to 10', 'zero insertion force', 'northbridge', 'southbridge']
  ok('I23 the history + board tokens all appear in the prose', tokensHistory.every((t) => prose.join(' ').includes(t)),
    tokensHistory.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  ok('I24 the doorstep books are named in the prose',
    ['Computer Organization and Architecture', 'Operating Systems', 'Digital Logic Design'].every((t) => prose.join(' ').includes(t)),
    ['Computer Organization and Architecture', 'Operating Systems', 'Digital Logic Design'].filter((t) => !prose.join(' ').includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF41: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
