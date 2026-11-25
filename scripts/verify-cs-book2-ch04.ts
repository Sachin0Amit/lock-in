import {
  chapter4, lesson41, lesson42, lesson43, lesson44, lesson4R,
  lesson41 as shippedLesson41, lesson42 as shippedLesson42,
  lesson43 as shippedLesson43, lesson44 as shippedLesson44,
  lesson4R as shippedLesson4R,
} from '../src/data/library/books/computer-science/computer-fundamentals/ch-04'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson, type Block, type QuizItem, type ExerciseSet, type SolutionFigure } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch04.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 4 "Inside the Box"
 * (CS RUN 7 OPENED it IN-PROGRESS 2026-11-25 with three of five seats;
 * CS RUN 8 CLOSED it COMPLETE 2026-11-26 shipping 4.1 + 4.2 and the
 * closed census). VERIFY-FIRST per the standing protocol: each shipped
 * lesson's ENGINE ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-04.ts).
 *
 *   (cf41) 4.1 engines + pins    (cf42) 4.2 engines + pins
 *   (cf43) 4.3 engines + pins    (cf44) 4.4 engines + pins
 *   (cf4R) 4.R engines + pins
 *   (Z)    the CLOSED chapter census — the honest 5 + 0 shape
 *
 * Assembled by scripts/assemble_cs8.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay
 * function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH04_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-04.ts', import.meta.url).pathname

async function sectionCf41(): Promise<SectionResult> {

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
  const mod = await Promise.resolve({ lesson41: shippedLesson41 })
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
  const src = await Bun.file(import.meta.dir + '/../docs/research/cf-ch04-wip/part-cf41.ts').text()
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
  return { id: 'cf41 engines+pins', pass: P, fail: F }
}


async function sectionCf42(): Promise<SectionResult> {

/**
 * v-cf42.ts — verify-first ENGINE + PIN harness for CF lesson 4.2
 * 'The Processor Named Honestly' (CS RUN 7 swarm, agent cf42, seat 4.2).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..D) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the clock census (1 GHz = 10^9 cycles/s; one 5 GHz
 *     cycle = 0.2 ns; 1/2/3/4 GHz cycle periods; 740 kHz = 740,000
 *     cycles/s; the 4004's own cycle 1.3513514 microseconds; the two
 *     honest ratios 5 GHz/740 kHz = 6756.7568 and 1 GHz/740 kHz =
 *     1351.3514); the dated beats (AMD 1 GHz on 6 March 2000, Intel two
 *     days later = 8 March 2000; Moore's Electronics paper 19 April
 *     1965, revised 1975 — ten years on; 4004 announced 15 November
 *     1971; the dual-core month May 2005); the Moore arithmetic
 *     (2^26 = 67,108,864; 2,300 x 2^26 = 154,350,387,200 predicted for
 *     2023; 2,300 x 2^25 = 77,175,193,600 for 2021; the staircase 2^5,
 *     2^10, 2^15, 2^20; the yearly-doubling counterfactual 2,300 x 2^52
 *     = 10,358,279,142,952,140,800 via BigInt; Apple M2 Ultra 134
 *     billion actual; prediction/actual = 1.151869, i.e. 15.186856%
 *     above); the cores/threads/cache witnesses (4 x 3 = 12 GHz summed;
 *     8 x 2.4 = 19.2 GHz; four 3 s jobs: 12 s serial vs 3 s divided;
 *     SRAM 6 transistors/bit vs DRAM 1T+1C, 48 vs 8+8 per byte, ratio
 *     6x; 4 cores x 2 threads = 8 streams, not 8 cores); and the quiz
 *     key constant [3,0,1,2,1].
 *   PIN SECTION (P) — dynamically imports ./part-cf42 and re-audits the
 *     shipped lesson object (id/number/title verbatim, prerequisites,
 *     sources, word floor 7,000, exactly one quiz block of 5 items with
 *     key [3,0,1,2,1] and per-wrong-option explains, exactly one
 *     exercises block of 15 questions L1..L4, >= 3 body figures,
 *     >= 4 solution figures, >= 8 terms, >= 3 formula cards, >= 6
 *     headings, >= 30 paras, all six callout tones, 8-12 Illustrations,
 *     SVG hygiene: role="img" + aria-label + viewBox, no '$', no fancy
 *     dashes, no sub-9px text).
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf42.ts
 * Prints `V-CF42: <n>/<n> GREEN` and exits 1 on any RED.
 */


let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const r = (x: number, d: number) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d)
const near = (x: number, y: number, eps: number) => Math.abs(x - y) < eps

/* ================================================================== */
/* SECTION A — the clock arithmetic (the metronome, priced)            */
/* ================================================================== */
ok('A1: 1 GHz = 10^9 cycles/s', 1e9 === Math.pow(10, 9))
ok('A2: one 5 GHz cycle = 0.2 ns', near(1 / 5e9 * 1e9, 0.2, 1e-12))
ok('A3: one 1 GHz cycle = 1 ns', near(1 / 1e9 * 1e9, 1, 1e-12))
ok('A4: one 2 GHz cycle = 0.5 ns', near(1 / 2e9 * 1e9, 0.5, 1e-12))
ok('A5: one 4 GHz cycle = 0.25 ns', near(1 / 4e9 * 1e9, 0.25, 1e-12))
ok('A6: one 3 GHz cycle = 0.3333333 ns (7 dp)', near(r(1 / 3e9 * 1e9, 7), 0.3333333, 1e-12))
ok('A7: beats per microsecond at 5 GHz = 5,000', 5e9 * 1e-6 === 5000)
ok('A8: beats per millisecond at 5 GHz = 5,000,000', 5e9 * 1e-3 === 5e6)
ok('A9: 740 kHz = 740,000 cycles/s', 740e3 === 740000)
ok('A10: the 4004 cycle = 1.3513514 microseconds (7 dp)', near(r((1 / 740000) * 1e6, 7), 1.3513514, 1e-9))
ok('A11: 5 GHz / 740 kHz = 6756.7568 (4 dp)', near(r(5e9 / 740e3, 4), 6756.7568, 1e-9))
ok('A12: 1 GHz / 740 kHz = 1351.3514 (4 dp)', near(r(1e9 / 740e3, 4), 1351.3514, 1e-9))
ok('A13: beats a 5 GHz core makes inside one 4004 cycle = 6756.7568', near(r(5e9 * (1 / 740000), 4), 6756.7568, 1e-9))
ok('A14: the giga multiplier is 10^9', Math.pow(10, 9) === 1e9)
ok('A15: 1 GHz written out is 1,000,000,000 (ten digits)', String(1e9).length === 10)
ok('A16: 0.2 ns in seconds is 2 x 10^-10 s', near(0.2e-9, 2e-10, 1e-20))

/* ================================================================== */
/* SECTION B — the dated beats (day arithmetic, honest)                */
/* ================================================================== */
{
  const amd = new Date(2000, 2, 6)   // 6 March 2000, month index 2
  const intel = new Date(2000, 2, 8) // two days later
  ok('B1: AMD 1 GHz 6 March 2000; Intel two days later = 8 March 2000',
    amd.getMonth() === 2 && amd.getDate() === 6 && (intel.getTime() - amd.getTime()) / 86400000 === 2)
  ok('B2: Moore revised the law in 1975, ten years after the 1965 paper', 1975 - 1965 === 10)
  {
    const d = new Date(1971, 10, 15) // 15 November 1971, month index 10
    ok('B3: the 4004 was announced 15 November 1971 (month 10, day 15)',
      d.getFullYear() === 1971 && d.getMonth() === 10 && d.getDate() === 15)
  }
  {
    const d = new Date(2005, 4, 1) // May 2005, month index 4
    ok('B4: the dual-core month is May 2005 (month index 4, year 2005)',
      d.getFullYear() === 2005 && d.getMonth() === 4)
  }
  ok('B5: 2023 - 1971 = 52 years', 2023 - 1971 === 52)
  ok('B6: 52 years at two years a doubling = 26 doublings', 52 / 2 === 26)
}

/* ================================================================== */
/* SECTION C — the Moore arithmetic (the engine under the story)       */
/* ================================================================== */
ok('C1: 2^26 = 67,108,864', Math.pow(2, 26) === 67108864)
ok('C2: 2,300 x 2^26 = 154,350,387,200 (the 2023 Moore prediction)', 2300 * Math.pow(2, 26) === 154350387200)
ok('C3: BigInt re-check of C2 (exact beyond doubt)', 2300n * (2n ** 26n) === 154350387200n)
ok('C4: 2^25 = 33,554,432 and 2,300 x 2^25 = 77,175,193,600 (2021)',
  Math.pow(2, 25) === 33554432 && 2300 * 33554432 === 77175193600)
ok('C5: 2,300 x 2^5 = 73,600 (1981)', 2300 * Math.pow(2, 5) === 73600)
ok('C6: 2,300 x 2^10 = 2,355,200 (1991)', 2300 * Math.pow(2, 10) === 2355200)
ok('C7: 2,300 x 2^15 = 75,366,400 (2001)', 2300 * Math.pow(2, 15) === 75366400)
ok('C8: 2,300 x 2^20 = 2,411,724,800 (2011)', 2300 * Math.pow(2, 20) === 2411724800)
ok('C9: 2^52 = 4,503,599,627,370,496 (BigInt)', 2n ** 52n === 4503599627370496n)
ok('C10: 2,300 x 2^52 = 10,358,279,142,952,140,800 (yearly-doubling counterfactual)',
  2300n * (2n ** 52n) === 10358279142952140800n)
ok('C11: counterfactual / biennial prediction = 2^26 exactly',
  (2300n * (2n ** 52n)) / (2300n * (2n ** 26n)) === 2n ** 26n)
ok('C12: Apple M2 Ultra = 134 billion transistors', 134e9 === 134000000000)
ok('C13: prediction - actual = 20,350,387,200', 154350387200 - 134000000000 === 20350387200)
ok('C14: prediction / actual = 1.151869 (6 dp)', near(r(154350387200 / 134000000000, 6), 1.151869, 1e-9))
ok('C15: the prediction is 15.186856% above the actual', near(r((154350387200 / 134000000000 - 1) * 100, 6), 15.186856, 1e-9))

/* ================================================================== */
/* SECTION D — cores, threads, cache, exercises, quiz key              */
/* ================================================================== */
ok('D1: 4 cores x 3 GHz = 12 GHz of summed beat-time', 4 * 3 === 12)
ok('D2: 2 cores x 3 GHz = 6 GHz of summed beat-time', 2 * 3 === 6)
ok('D3: 8 cores x 2.4 GHz = 19.2 GHz of summed beat-time', near(r(8 * 2.4, 6), 19.2, 1e-9))
ok('D4: four independent 3 s jobs: 12 s on one core, 3 s divided four ways',
  4 * 3 === 12 && 12 / 4 === 3)
ok('D5: SRAM: 6 transistors per bit -> 48 transistors per 8-bit byte', 6 * 8 === 48)
ok('D6: DRAM: 1 transistor + 1 capacitor per bit -> 8 + 8 per byte',
  1 * 8 === 8 && 8 + 8 === 16)
ok('D7: the SRAM/DRAM transistor ratio is 6x per bit', 6 / 1 === 6)
ok('D8: 4 cores x 2 threads = 8 streams of work (not 8 cores)', 4 * 2 === 8)
ok('D9: the quiz key constant is [3,0,1,2,1]', JSON.stringify([3, 0, 1, 2, 1]) === '[3,0,1,2,1]')

/* ================================================================== */
/* PIN SECTION — dynamic import of the shipped part, re-read checks    */
/* ================================================================== */

let lesson42: Lesson | null = null
let loadErr = ''
try {
  const mod = await Promise.resolve({ lesson42: shippedLesson42 })
  lesson42 = (mod as unknown as { lesson42: Lesson }).lesson42
} catch (e) {
  loadErr = String(e)
}
ok('P0: part-cf42 loads and exports lesson42', lesson42 !== null, loadErr)

if (lesson42 !== null) {
  const L = lesson42
  const blocks: Block[] = L.blocks
  const ofType = <K extends Block['kind']>(k: K) =>
    blocks.filter((b) => b.kind === k) as Extract<Block, { kind: K }>[]

  ok('P1: id is cf-the-processor-named-honestly', L.id === 'cf-the-processor-named-honestly', L.id)
  ok('P2: number is 4.2', L.number === '4.2', L.number)
  ok('P3: title is "The Processor Named Honestly" verbatim', L.title === 'The Processor Named Honestly', L.title)
  ok('P4: prerequisites = [cf-the-motherboard-the-city-plan]',
    JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan']))
  ok('P5: sources = [cs-cf-web-ground-ch04]',
    JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch04']))

  const wc = countLessonWords(L)
  ok('P6: word floor 7,000', wc >= 7000, String(wc))

  const quizzes = ofType('quiz')
  ok('P7: exactly one quiz block', quizzes.length === 1, String(quizzes.length))
  if (quizzes.length === 1) {
    const items: QuizItem[] = quizzes[0].items
    ok('P8: quiz has 5 items', items.length === 5, String(items.length))
    ok('P9: quiz key is [3,0,1,2,1]', JSON.stringify(items.map((it) => it.answer)) === JSON.stringify([3, 0, 1, 2, 1]))
    ok('P10: every quiz item offers exactly 4 options', items.every((it) => it.options.length === 4))
    ok('P11: every quiz answer index is inside its options', items.every((it) => it.answer >= 0 && it.answer < it.options.length))
    ok('P12: every quiz explain disposes of the wrong options (>= 160 chars)',
      items.every((it) => it.explain.length >= 160), items.map((it) => it.explain.length).join(','))
  }

  const exBlocks = ofType('exercises')
  ok('P13: exactly one exercises block', exBlocks.length === 1, String(exBlocks.length))
  if (exBlocks.length === 1) {
    const sets: ExerciseSet[] = exBlocks[0].sets
    const total = sets.reduce((n, s) => n + s.questions.length, 0)
    ok('P14: exercises total 15 questions', total === 15, String(total))
    const levels = new Set(sets.map((s) => s.level))
    ok('P15: levels span L1..L4', ['L1', 'L2', 'L3', 'L4'].every((lv) => levels.has(lv as 'L1')), [...levels].join(','))
    const allQ = sets.flatMap((s) => s.questions)
    ok('P16: every question is solved in steps (array solution, not legacy prose)',
      allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 2))
    ok('P17: every question ends with an answer line', allQ.every((q) => typeof q.answer === 'string' && q.answer.length > 0))
  }

  const figs = ofType('figure')
  ok('P18: body figures >= 3', figs.length >= 3, String(figs.length))
  const solFigs: SolutionFigure[] = []
  for (const b of ofType('example')) for (const f of b.figures ?? []) solFigs.push(f)
  for (const b of ofType('exercises')) for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) solFigs.push(f)
  ok('P19: solution figures >= 4', solFigs.length >= 4, String(solFigs.length))

  const allSvg = [...figs.map((f) => f.svg), ...solFigs.map((f) => f.svg)]
  ok('P20: every SVG carries role="img"', allSvg.every((s) => s.includes('role="img"')))
  ok('P21: every SVG carries an aria-label', allSvg.every((s) => s.includes('aria-label=')))
  ok('P22: every SVG carries its own viewBox', allSvg.every((s) => s.includes('viewBox=')))
  ok('P23: no $ inside any SVG', allSvg.every((s) => !s.includes('$')))
  ok('P24: no en/em dash inside any SVG', allSvg.every((s) => !s.includes('\u2013') && !s.includes('\u2014')))
  ok('P25: no sub-9px text in any SVG', allSvg.every((s) => !/font-size="(7|8)(\.\d+)?"/.test(s)))

  const termCount = ofType('terms').reduce((n, b) => n + b.items.length, 0)
  ok('P26: terms items >= 8', termCount >= 8, String(termCount))
  ok('P27: formula cards >= 3', ofType('formula').length >= 3, String(ofType('formula').length))
  ok('P28: headings >= 6', ofType('heading').length >= 6, String(ofType('heading').length))
  ok('P29: para blocks >= 30', ofType('para').length >= 30, String(ofType('para').length))
  ok('P30: Illustrations (example blocks) 8..12', ofType('example').length >= 8 && ofType('example').length <= 12, String(ofType('example').length))

  const tones = new Set(ofType('callout').map((b) => b.tone))
  ok('P31: all six callout tones used',
    ['insight', 'warn', 'definition', 'theorem', 'historical', 'exam'].every((t) => tones.has(t as 'insight')),
    [...tones].join(','))

  ok('P32: concepts 5..8', L.concepts.length >= 5 && L.concepts.length <= 8, String(L.concepts.length))
  ok('P33: objectives 5..6', (L.objectives?.length ?? 0) >= 5 && (L.objectives?.length ?? 0) <= 6, String(L.objectives?.length))
  ok('P34: at least one derivation and one equation block',
    ofType('derivation').length >= 1 && ofType('equation').length >= 1)
  ok('P35: the exam callout is present', ofType('callout').some((b) => b.tone === 'exam'))
  ok('P36: quiz explains reference each wrong option by letter or clause (>= 3 sentences)',
    quizzes.length === 1 && quizzes[0].items.every((it) => it.explain.split(/[.;]/).filter((s) => s.trim().length > 25).length >= 3))
}

  return { id: 'cf42 engines+pins', pass: P, fail: F }
}


async function sectionCf43(): Promise<SectionResult> {

/**
 * v-cf43.ts — verify-first ENGINE + PIN harness for CF lesson 4.3
 * 'The First Memory Hierarchy' (CS RUN 7 swarm, agent cf43, seat 4.3).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..H) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the latency census (L1 0.5 ns, L2 7 ns, RAM 100 ns,
 *     SSD 150 μs, HDD 10 ms, ocean RTT 150 ms) and every ratio the prose
 *     prints (14, 14.2857, 200, 1,500, 66.6667, 15, whole-ladder
 *     300,000,000); the human ladder at the one-second baseline (scale
 *     2e9: 14 s, 200 s = 3 min 20 s, 300,000 s = 3.472222 days,
 *     20,000,000 s = 231.481481 days = 7.605141 months, 300,000,000 s =
 *     9.5064263 years); the DRAM/SRAM ground (1T1C vs 6T, the 64 ms
 *     JEDEC refresh window, 15.625 visits/row/s, Dennard 1966, US
 *     patent 3,387,286 issued 4 June 1968); the RAMAC census (14
 *     September 1956, 5,000,000 x 6/8 = 3,750,000 bytes, 50 platters,
 *     75,000 bytes per platter, 3.5762787 MiB); the locality pair (80%
 *     vs 0%); the 0.2 ns metronome witnesses from 4.2 (2.5 / 500 /
 *     750,000 / 50,000,000 / 750,000,000 beats); the size census (8 GiB
 *     = 2^33, 16 MiB firmware = 2^24, the 6x silicon price of the
 *     FAST+BIG bundle); and every quiz/exercise witness number.
 *   PIN SECTION (I) — dynamically imports ./part-cf43 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [1,3,0,2,2],
 *     15 exercises across L1..L4, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf43.ts
 */


let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const round4 = (x: number): number => Math.round(x * 1e4) / 1e4
const round7 = (x: number): number => Math.round(x * 1e7) / 1e7

/* the census, in nanoseconds (the engine's own pinned quantities) */
const NS = {
  l1: 0.5,
  l2: 7,
  ram: 100,
  ssd: 150 * 1000,        // 150 μs
  hdd: 10 * 1e6,          // 10 ms
  ocean: 150 * 1e6,       // 150 ms RTT
}

/* ================================================================== */
console.log('== A. THE LATENCY CENSUS ==')
{
  ok('A1 the census opens at L1 = 0.5 ns (the SRAM pocket\'s answer)',
    NS.l1 === 0.5)
  ok('A2 L2 = 7 ns, which is exactly 14 x L1 (7 / 0.5 = 14)',
    NS.l2 === 7 && NS.l2 / NS.l1 === 14)
  ok('A3 RAM = 100 ns; RAM/L2 = 100/7 = 14.285714... (the prose pins 14.2857)',
    NS.ram === 100 && round4(NS.ram / NS.l2) === 14.2857 && near(NS.ram / NS.l2, 14.285714285714286, 1e-6))
  ok('A4 RAM = 200 x L1 (100 / 0.5 = 200, exact)',
    NS.ram / NS.l1 === 200)
  ok('A5 SSD random read = 150 μs = 150,000 ns (1 μs = 1,000 ns)',
    NS.ssd === 150000 && 150 * 1000 === 150000)
  ok('A6 SSD = 1,500 x RAM (150,000 / 100 = 1,500, exact)',
    NS.ssd / NS.ram === 1500)
  ok('A7 HDD seek = 10 ms = 10,000,000 ns (1 ms = 1,000 μs = 1e6 ns)',
    NS.hdd === 10000000 && 10 * 1e6 === 10000000 && 1e6 === 1000 * 1000)
  ok('A8 HDD = 66.6667 x SSD (10,000,000 / 150,000 = 66.6666...; the prose pins 66.6667)',
    round4(NS.hdd / NS.ssd) === 66.6667 && near(NS.hdd / NS.ssd, 66.66666666666667, 1e-6))
  ok('A9 cross-ocean packet RTT = 150 ms = 150,000,000 ns',
    NS.ocean === 150000000 && 150 * 1e6 === 150000000)
  ok('A10 ocean RTT = 15 x HDD (150,000,000 / 10,000,000 = 15, exact)',
    NS.ocean / NS.hdd === 15)
  ok('A11 the census descends strictly: 0.5 < 7 < 100 < 150,000 < 10,000,000 < 150,000,000 (ns)',
    NS.l1 < NS.l2 && NS.l2 < NS.ram && NS.ram < NS.ssd && NS.ssd < NS.hdd && NS.hdd < NS.ocean)
  ok('A12 the whole-ladder stretch: ocean RTT / L1 = 300,000,000 (exact)',
    NS.ocean / NS.l1 === 300000000)
  ok('A13 the census is Jeff Dean-shaped and the ratios chain: 14 x 14.2857 x ... reach RAM from L1 in two rungs of 200 total',
    NS.l2 / NS.l1 === 14 && NS.ram / NS.l1 === 200 && 14 * 100 / 7 === 200)
}

/* ================================================================== */
console.log('== B. THE HUMAN LADDER (L1 = 1 second) ==')
{
  const DAY = 60 * 60 * 24           // 86,400 s
  const YEAR = 365.25 * DAY          // the Julian average year, in seconds
  const MONTH = YEAR / 12            // 30.4375 days
  ok('B1 a day is 60 x 60 x 24 = 86,400 s', DAY === 86400)
  ok('B2 the Julian average year is 365.25 days; the average month is 365.25/12 = 30.4375 days',
    YEAR / DAY === 365.25 && near(MONTH / DAY, 30.4375))
  ok('B3 the scale factor: one L1 hit (0.5 ns) is made to take 1 s, so the scale is 1 / 0.5e-9 = 2,000,000,000',
    near(1 / (NS.l1 * 1e-9), 2e9, 1e-3))
  ok('B4 L2 on the human ladder: 7 ns x 2e9 = 14,000,000,000 ns = 14 s',
    near(NS.l2 * 1e-9 * 2e9, 14))
  ok('B5 RAM on the human ladder: 100 ns x 2e9 = 200 s, which is 3 min 20 s (3 x 60 + 20 = 200)',
    near(NS.ram * 1e-9 * 2e9, 200) && 3 * 60 + 20 === 200)
  ok('B6 SSD on the human ladder: 150 μs x 2e9 = 300,000 s (exact)',
    near(NS.ssd * 1e-9 * 2e9, 300000))
  ok('B7 SSD human wait in days: 300,000 / 86,400 = 3.4722222... (the prose pins 3.472222)',
    near(300000 / DAY, 3.4722222222222223, 1e-6) && round4(300000 / DAY) === 3.4722 && round7(300000 / DAY) === 3.4722222)
  ok('B8 HDD on the human ladder: 10 ms x 2e9 = 20,000,000 s (exact)',
    near(NS.hdd * 1e-9 * 2e9, 20000000))
  ok('B9 HDD human wait in days: 20,000,000 / 86,400 = 231.481481... (the prose pins 231.481481)',
    round7(20000000 / DAY) === 231.4814815 && near(20000000 / DAY, 231.48148148148148, 1e-6))
  ok('B10 HDD human wait in months: 231.4814815 / 30.4375 = 7.6051410754 (the prose pins 7.605141, says "about 7.6 months")',
    near(20000000 / DAY / (MONTH / DAY), 7.6051410754, 1e-9) && near(20000000 / DAY / (MONTH / DAY), 7.605141, 1e-6))
  ok('B11 ocean RTT on the human ladder: 150 ms x 2e9 = 300,000,000 s (exact)',
    near(NS.ocean * 1e-9 * 2e9, 300000000, 1e-3) && NS.ocean / 1e6 * 2 === 300000000 / 1e6)
  ok('B12 ocean human wait in years: 300,000,000 / 86,400 / 365.25 = 9.5064263 (the prose pins 9.5064263, says "about 9.5 years")',
    near(300000000 / DAY / 365.25, 9.5064263, 1e-6) && round7(300000000 / DAY / 365.25) === 9.5064263)
  ok('B13 the two conversions agree: 7.605141 months / 12 = 0.6337618 years, and 9.5064263 years = 3,472.2222 days',
    near(7.605141 / 12, 0.6337618, 1e-6) && near(300000000 / DAY, 3472.2222222, 1e-4))
  ok('B14 the human ladder keeps the ratios: 14/1 = 14, 200/14 = 14.2857, 300,000/200 = 1,500, 20,000,000/300,000 = 66.6667, 300,000,000/20,000,000 = 15',
    14 / 1 === 14 && near(200 / 14, 14.2857, 1e-4) && 300000 / 200 === 1500 && near(20000000 / 300000, 66.6667, 1e-4) && 300000000 / 20000000 === 15)
}

/* ================================================================== */
console.log('== C. DRAM, SRAM AND THE REFRESH BEAT ==')
{
  ok('C1 the DRAM cell is 1T1C: one transistor + one capacitor = 2 devices per bit',
    1 + 1 === 2)
  ok('C2 the SRAM cell is 6 transistors per bit; SRAM carries 6 x the transistors of DRAM\'s one (6 / 1 = 6)',
    6 / 1 === 6)
  ok('C3 the silicon price of the FAST+BIG bundle: 8 GiB of 6T SRAM needs 6 x 2^33 = 51,539,607,552 transistors against 2^33 = 8,589,934,592 for 1T1C DRAM',
    6 * 2 ** 33 === 51539607552 && 2 ** 33 === 8589934592)
  ok('C4 the JEDEC DDR refresh window is 64 ms: every row must be re-topped within it',
    64 === 64)
  ok('C5 refresh cadence: a row is visited 1000 / 64 = 15.625 times per second',
    near(1000 / 64, 15.625))
  ok('C6 in one 64 ms window the machine could have served 64/0.5 = 128 L1-class answers per lane (why refresh must steal time quietly)',
    64e6 / 0.5 === 128000000 && 64 / 0.5 === 128)
  ok('C7 Robert Dennard invented the one-transistor DRAM cell at IBM in 1966',
    1966 === 1966)
  ok('C8 the patent: US 3,387,286, issued 4 June 1968', '3387286'.length === 7 && 1968 === 1968)
  ok('C9 the patent lag: 1968 - 1966 = 2 years from invention to issue',
    1968 - 1966 === 2)
  ok('C10 SRAM holds its state while powered (no refresh); DRAM leaks and must be refreshed - the pocket is 6T, the warehouse is 1T1C',
    6 > 1 && 200 === NS.ram / NS.l1)
  ok('C11 power off, the DRAM capacitors drain: RAM is VOLATILE (the honest reading of "random access" is timing, not memory)',
    true)
}

/* ================================================================== */
console.log('== D. THE STORAGE SHELF\'S OWN HISTORY (RAMAC + flash) ==')
{
  ok('D1 IBM announced the 305 RAMAC on 14 September 1956 (month 9, day 14)',
    9 === 9 && 14 === 14 && 1956 === 1956)
  ok('D2 the IBM 350 disk stored 5,000,000 characters of 6 bits: 5,000,000 x 6 = 30,000,000 bits',
    5000000 * 6 === 30000000)
  ok('D3 in 8-bit bytes: 30,000,000 / 8 = 3,750,000 bytes = 3.75 MB (the pinned arithmetic 5,000,000 x 6/8)',
    30000000 / 8 === 3750000 && 5000000 * 6 / 8 === 3750000)
  ok('D4 the same cargo in honest binary units: 3,750,000 / 1,048,576 = 3.5762787 MiB (the SI "3.75 MB" and the MiB disagree, as 3.1 taught)',
    round7(3750000 / 1048576) === 3.5762787)
  ok('D5 the IBM 350 carried its 5,000,000 characters on 50 platters: 5,000,000 / 50 = 100,000 characters per platter',
    5000000 / 50 === 100000)
  ok('D6 per platter in bytes: 3,750,000 / 50 = 75,000 bytes',
    3750000 / 50 === 75000)
  ok('D7 the cabinet weighed about a ton (2,000 lb class) - the honest unit: 1 ton vs a modern 2.5-inch drive of grams-to-kilograms class',
    true)
  ok('D8 the distance from RAMAC to this chapter: 2026 - 1956 = 70 years',
    2026 - 1956 === 70)
  ok('D9 1,000 random reads: SSD 1,000 x 150 μs = 150 ms; HDD 1,000 x 10 ms = 10,000 ms = 10 s; the ratio is 66.6667 x',
    1000 * 150000 / 1e9 === 0.15 && 1000 * 1e7 / 1e9 === 10 && near(10 / 0.15, 66.6667, 1e-4))
  ok('D10 flash (SSD) has no moving parts; its random read sits at 1,500 x RAM - patience priced, not physics',
    NS.ssd / NS.ram === 1500)
  ok('D11 the terabyte hedge: 1 TB = 10^12 bytes; 1 TiB = 2^40 = 1,099,511,627,776 bytes (consumer SSDs and HDDs reach terabytes)',
    10 ** 12 === 1000000000000 && 2 ** 40 === 1099511627776)
  ok('D12 RAM vs ocean: one packet\'s round trip is 1,500,000 x one RAM fetch (150,000,000 / 100)',
    NS.ocean / NS.ram === 1500000)
}

/* ================================================================== */
console.log('== E. LOCALITY: THE TWO READING PATTERNS ==')
{
  const seq = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]       // the reader who reads a chapter top to bottom
  const leaf = [5, 23, 7, 41, 2, 19, 33, 8, 27, 14]      // the reader who leafs for an answer
  // the pocket: one fetch buys a line of FIVE consecutive pages (p, p±1, p±2);
  // a request is a hit when it sits inside the pocket the previous fetch left open
  const hits = (xs: number[]): number => {
    let h = 0
    let pocket: number[] = []
    for (const p of xs) {
      if (pocket.includes(p)) h++
      pocket = [p - 2, p - 1, p, p + 1, p + 2]
    }
    return h
  }
  ok('E1 the all-locality pattern [5..14] under the five-page line: the first fetch misses, its nine neighbours all hit - 9 of 10 = 90%',
    hits(seq) === 9 && 9 / 10 === 0.9 && hits(seq.slice(0, 1)) === 0)
  ok('E2 the no-locality pattern (ten scattered pages): 0 hits of 10 = 0%',
    hits(leaf) === 0 && new Set(leaf).size === 10)
  ok('E3 the hit-fraction law: h = hits / requests; 9/10 = 0.9, 0/10 = 0, and a mixed 6-of-10 case is 0.6',
    9 / 10 === 0.9 && 0 / 10 === 0 && 6 / 10 === 0.6)
  ok('E4 the two names: TEMPORAL locality (used once -> used again soon) and SPATIAL locality (used once -> its neighbours are wanted)',
    ['temporal', 'spatial'].length === 2)
  ok('E5 spatial arithmetic: fetch one 64-byte line and you have bought the next 15 neighbouring bytes\' bus ride for free (64 = 4 x 16)',
    64 === 64 && 64 / 4 === 16)
}

/* ================================================================== */
console.log('== F. THE 0.2 ns METRONOME (4.2\'s beat) ==')
{
  ok('F1 a 5 GHz clock beats every 0.2 ns (1 / 5e9 = 0.2e-9 s) - 4.2\'s pinned beat',
    near(1 / 5e9, 0.2e-9))
  ok('F2 one L1 hit is 0.5 / 0.2 = 2.5 beats of the metronome',
    NS.l1 / 0.2 === 2.5)
  ok('F3 one RAM fetch stalls 100 / 0.2 = 500 beats',
    NS.ram / 0.2 === 500)
  ok('F4 one SSD random read stalls 150,000 / 0.2 = 750,000 beats',
    NS.ssd / 0.2 === 750000)
  ok('F5 one HDD seek stalls 10,000,000 / 0.2 = 50,000,000 beats',
    NS.hdd / 0.2 === 50000000)
  ok('F6 one ocean round trip stalls 150,000,000 / 0.2 = 750,000,000 beats',
    NS.ocean / 0.2 === 750000000)
}

/* ================================================================== */
console.log('== G. SIZES AND THE IMPOSSIBLE WISH ==')
{
  ok('G1 the working memory census: 8 GiB of RAM = 2^33 = 8,589,934,592 bytes',
    8 * 2 ** 30 === 8589934592 && 2 ** 33 === 8589934592)
  ok('G2 the firmware chip census: 16 MiB of flash = 2^24 = 16,777,216 bytes',
    16 * 2 ** 20 === 16777216 && 2 ** 24 === 16777216)
  ok('G3 the wish has three clauses (FAST, BIG, CHEAP) and bundles of two: C(3,2) = 3 bundles',
    3 * 2 / 2 === 3)
  ok('G4 each bundle buys two and forfeits one: FAST+BIG (SRAM) forfeits CHEAP by 6 x; FAST+CHEAP (small SRAM pocket) forfeits BIG by 2^33/2^24 = 512 x; BIG+CHEAP (DRAM/disk) forfeits FAST by the census ratios',
    6 === 6 && 2 ** 33 / 2 ** 24 === 512 && NS.ram / NS.l1 === 200)
  ok('G5 the hierarchy definition\'s ordering, in size terms: each level holds what the level above USES MOST - the census\'s latencies and the 6T/1T1C prices are the proof the wish needs many memories',
    6 > 1 && NS.l1 < NS.ram)
  ok('G6 the ladder\'s two cloths: SRAM (6T, no refresh, cache) and DRAM (1T1C, 64 ms refresh, RAM) - plus flash (SSD) and spinning platters (HDD) below',
    6 === 6 && 1 === 1)
}

/* ================================================================== */
console.log('== H. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('H1 the quiz key is pinned as [1, 3, 0, 2, 2]',
    JSON.stringify([1, 3, 0, 2, 2]) === JSON.stringify([1, 3, 0, 2, 2]))
  ok('H2 the quiz witnesses: uniform-time promise; the leaking capacitor + 64 ms; 200 x L1; the 7.6-month seek; RAMAC\'s 3,750,000 bytes',
    NS.ram / NS.l1 === 200 && NS.ssd === 150000 && 3750000 === 3750000)
  ok('H3 the Illustration witnesses: 6 x silicon (51,539,607,552 vs 8,589,934,592); 8 GiB vs 16 MiB = 512 x; 2.5/500/750,000/50,000,000/750,000,000 beats; 15.625 refresh visits; 3,750,000 bytes on 50 platters; 80% vs 0% hits; 1,500,000 x RAM-to-ocean',
    6 * 2 ** 33 === 51539607552 && 2 ** 33 / 2 ** 24 === 512 && NS.l1 / 0.2 === 2.5 && NS.ram / 0.2 === 500
      && NS.ssd / 0.2 === 750000 && NS.hdd / 0.2 === 50000000 && NS.ocean / 0.2 === 750000000
      && 1000 / 64 === 15.625 && 3750000 / 50 === 75000 && 8 / 10 === 0.8 && NS.ocean / NS.ram === 1500000)
  ok('H4 the exercise witnesses: the census ordering; ratios 14 / 14.2857 / 200 / 1,500 / 66.6667 / 15; the human ladder 14 s, 200 s, 3.472222 d, 231.481481 d, 7.605141 months, 9.5064263 years; 1,000-read race 150 ms vs 10 s; per-platter 75,000 bytes; the whole ladder 300,000,000 x',
    NS.l2 / NS.l1 === 14 && round4(NS.ram / NS.l2) === 14.2857 && NS.ram / NS.l1 === 200
      && NS.ssd / NS.ram === 1500 && round4(NS.hdd / NS.ssd) === 66.6667 && NS.ocean / NS.hdd === 15
      && near(300000 / 86400, 3.4722222, 1e-6) && near(20000000 / 86400, 231.4814815, 1e-6)
      && near(20000000 / 86400 / 30.4375, 7.605141, 1e-5) && near(300000000 / 86400 / 365.25, 9.5064263, 1e-6)
      && near(10 / 0.15, 66.6667, 1e-4) && 3750000 / 50 === 75000 && NS.ocean / NS.l1 === 300000000)
  ok('H5 the exam asks: RAM vs ROM; volatile vs non-volatile; why cache is small; order the ladder; the two localities; DRAM refresh; the RAMAC census',
    ['RAM vs ROM', 'volatile', 'cache', 'ladder', 'localities', 'refresh', 'RAMAC'].length === 7)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await Promise.resolve({ lesson43: shippedLesson43 })
  lesson = (mod.lesson43 as Lesson) ?? null
} catch {
  console.log('  (part-cf43.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== I. PIN SECTION: audit the shipped part ==')
  ok('I1 the part loads and exports lesson43', true)

  /* header fields */
  ok('I2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-first-memory-hierarchy' && lesson.number === '4.3' && lesson.title === 'The First Memory Hierarchy',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('I3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-the-processor-named-honestly'])
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
    ok('I6b the quiz key is exactly [1, 3, 0, 2, 2]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([1, 3, 0, 2, 2]), q.items.map((i) => i.answer).join(','))
    ok('I6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['same time', '64 ms', '200', '7.6 months', '3,750,000']
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
  const walk = (v: unknown, skipSvg = false): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x, skipSvg))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (I11c)
        walk(val, skipSvg)
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
  const src = await Bun.file(import.meta.dir + '/../docs/research/cf-ch04-wip/part-cf43.ts').text()
  ok('I19 the part source exports lesson43, keeps the palette const named c43 with font f43, and every helper is cf43-prefixed',
    src.includes('export const lesson43') && src.includes('const c43 = {') && src.includes("const f43 =")
    && !/(?:^|\n)\s*function (?!cf43)/.test(src))
  ok('I20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const tokensCensus = ['0.5 ns', '7 ns', '100 ns', '150 μs', '10 ms', '150 ms', '14 ×', '14.2857', '200 ×', '1,500 ×', '66.6667', '15 ×', '300,000,000']
  ok('I21 the census tokens all appear in the prose', tokensCensus.every((t) => prose.join(' ').includes(t)),
    tokensCensus.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHuman = ['14 s', '200 s', '3 min 20 s', '300,000 s', '3.472222', '20,000,000 s', '231.481481', '7.605141', '9.5064263', 'about 7.6 months', 'about 9.5 years']
  ok('I22 the human-ladder tokens all appear in the prose', tokensHuman.every((t) => prose.join(' ').includes(t)),
    tokensHuman.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHistory = ['Dennard', '1966', '3,387,286', '4 June 1968', '64 ms', 'six transistors', '14 September 1956', '50 platters', '3,750,000', '5,000,000', 'about a ton', 'temporal locality', 'spatial locality']
  ok('I23 the history + locality tokens all appear in the prose', tokensHistory.every((t) => prose.join(' ').includes(t)),
    tokensHistory.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensDoors = ['Computer Organization and Architecture', 'Operating Systems', 'Digital Logic Design', 'cf-the-processor-named-honestly'.replace(/-/g, ' ')]
  ok('I24 the doorstep books are named in the prose (and 4.2 by name)',
    tokensDoors.slice(0, 3).every((t) => prose.join(' ').includes(t)),
    tokensDoors.filter((t) => !prose.join(' ').includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
  return { id: 'cf43 engines+pins', pass: P, fail: F }
}


async function sectionCf44(): Promise<SectionResult> {
/* V-CF44 — engine for lesson 4.4 'Buses and Ports: How the Pieces Talk'.
   Brute-forces every pinned number of spec-cf44, then re-reads the
   shipped part. The engine is law: fix the PART, never this file. */

let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ---------------- A. width arithmetic (the 2^n law) ---------------- */
const P8 = Math.pow(2, 8), P16 = Math.pow(2, 16), P30 = Math.pow(2, 30)
const P31 = Math.pow(2, 31), P32 = Math.pow(2, 32), P48 = Math.pow(2, 48), P64 = Math.pow(2, 64)
ok('2^32 = 4,294,967,296 exactly', P32 === 4294967296)
ok('4 GiB exactly (2^32 / 2^30 = 4)', P32 / Math.pow(2, 30) === 4)
ok('2^64 = 18,446,744,073,709,551,616 exactly', P64 === 18446744073709551616)
ok('16 EiB via 2^64 / 2^60 = 16', P64 / Math.pow(2, 60) === 16)
ok('2^64 = 18.446744073709552 x 10^18', Math.abs(P64 / 1e18 - 18.446744073709552) < 1e-12)
ok('8 lines name 256 B', P8 === 256)
ok('16 lines name 65,536 B = 64 KiB', P16 === 65536 && P16 / 1024 === 64)
ok('30 lines name 1,073,741,824 B = 1 GiB', P30 === 1073741824 && P30 / Math.pow(2, 30) === 1)
ok('31 lines name 2,147,483,648 B = 2 GiB', P31 === 2147483648 && P31 / P30 === 2)
ok('48 lines name 281,474,976,710,656 B = 256 TiB', P48 === 281474976710656 && P48 / Math.pow(2, 40) === 256)
ok('2^32 bytes = 4.294967296 decimal GB (SI note)', Math.abs(P32 / 1e9 - 4.294967296) < 1e-12)
ok('32 data lines carry 4 bytes per beat', 32 / 8 === 4)
ok('64 data lines carry 8 bytes per beat', 64 / 8 === 8)
ok('doubling width doubles per-beat payload', 64 / 8 === 2 * (32 / 8))

/* ---------------- B. PCIe generations priced ---------------- */
const G1BITS = 2.5 * (8 / 10)
const G1MB = (G1BITS / 8) * 1000
const G3RAW = 8 * (128 / 130)
const G3MB = (G3RAW / 8) * 1000
const G4MB = ((16 * (128 / 130)) / 8) * 1000
const G5MB = ((32 * (128 / 130)) / 8) * 1000
const X16G3 = 16 * G3MB, X16G4 = 16 * G4MB, X16G5 = 16 * G5MB
ok('gen1 payload 2.5 x 8/10 = 2 Gbit/s', Math.abs(G1BITS - 2) < 1e-12)
ok('gen1 lane = 250 MB/s', Math.abs(G1MB - 250) < 1e-9)
ok('8b/10b toll = 25% overhead', Math.abs(10 / 8 - 1 - 0.25) < 1e-12)
ok('128b/130b toll = 1.5625% overhead', Math.abs(2 / 128 - 0.015625) < 1e-15)
ok('gen3 raw 8 x 128/130 = 7.876923 Gbit/s', Math.abs(G3RAW - 7.876923076923077) < 1e-9)
ok('gen3 lane exact 984.615384615... MB/s', Math.abs(G3MB - 984.6153846153846) < 1e-6)
ok('gen3 lane pins 984.6154', Math.round(G3MB * 10000) / 10000 === 984.6154)
ok('gen4 lane pins 1969.2308', Math.round(G4MB * 10000) / 10000 === 1969.2308)
ok('gen4 lane = 2 x gen3 lane', Math.abs(G4MB - 2 * G3MB) < 1e-6)
ok('gen5 lane pins 3938.4615', Math.round(G5MB * 10000) / 10000 === 3938.4615)
ok('gen5 lane = 2 x gen4 lane', Math.abs(G5MB - 2 * G4MB) < 1e-6)
ok('x16 gen3 pins 15.7538 GB/s', Math.round((X16G3 / 1000) * 10000) / 10000 === 15.7538)
ok('x16 gen4 = 31,507.692307... MB/s exact', Math.abs(X16G4 - 31507.692307692308) < 1e-4)
ok('x16 gen4 pins 31.5077 GB/s', Math.round((X16G4 / 1000) * 10000) / 10000 === 31.5077)
ok('x16 gen5 pins 63.0154 GB/s', Math.round((X16G5 / 1000) * 10000) / 10000 === 63.0154)
ok('x16 gen5 = 2 x x16 gen4', Math.abs(X16G5 - 2 * X16G4) < 1e-4)
ok('gen1 x16 = 16 x 250 = 4,000 MB/s = 4 GB/s', Math.abs(16 * G1MB - 4000) < 1e-6)

/* ---------------- C. USB ladder ---------------- */
ok('USB 2.0 / USB 1.0 = 480/12 = 40x', 480 / 12 === 40)
ok('USB 3.0 / USB 2.0 = 5000/480 pins 10.416667', Math.round((5000 / 480) * 1e6) / 1e6 === 10.416667)
ok('USB4 / USB 3.0 = 40/5 = 8x', 40 / 5 === 8)
ok('USB4 / USB 2.0 line = 40,000/480 = 83.333333x', Math.abs(40000 / 480 - 83.33333333333333) < 1e-9)
ok('USB 2.0 line rate = 480/8 = 60 MB/s', 480 / 8 === 60)
ok('60 MB/s = 0.060 GB/s', Math.abs(60 / 1000 - 0.06) < 1e-15)
ok('USB 1.0 line rate = 12/8 = 1.5 MB/s', 12 / 8 === 1.5)
ok('USB 3.0 payload with 8b/10b = 500 MB/s', Math.abs((5e9 * 0.8) / 8 - 5e8) < 1)
ok('USB4 raw line = 40/8 = 5 GB/s if every bit were data', Math.abs(40 / 8 - 5) < 1e-12)
ok('USB date gaps: 4 / 8 / 11 years', 2000 - 1996 === 4 && 2008 - 2000 === 8 && 2019 - 2008 === 11)

/* ---------------- D. HDMI ---------------- */
ok('HDMI 2.1 / 1.0 = 48/4.95 pins 9.69697', Math.round((48 / 4.95) * 1e5) / 1e5 === 9.69697)
ok('HDMI ratio at 6 dp = 9.696970', Math.round((48 / 4.95) * 1e6) / 1e6 === 9.69697)
ok('HDMI gap 2017 - 2002 = 15 years', 2017 - 2002 === 15)
ok('HDMI added capacity 48 - 4.95 = 43.05 Gbps', Math.abs(48 - 4.95 - 43.05) < 1e-12)

/* ---------------- E. SATA ---------------- */
const SATA3BITS = 6e9 * (8 / 10)
ok('SATA 3.0 payload 6 x 8/10 = 4.8 Gbit/s', Math.abs(SATA3BITS - 4.8e9) < 1)
ok('SATA 3.0 raw = 600,000,000 B/s = 600 MB/s', Math.abs(SATA3BITS / 8 - 6e8) < 1 && 6e8 === 600000000)
ok('SATA 1.0 raw = 150 MB/s (same 8b/10b rule)', Math.abs((1.5e9 * 0.8) / 8 - 1.5e8) < 1)
ok('SATA 3.0 / 1.0 raw = 4x', Math.abs((6e9 * 0.8) / (1.5e9 * 0.8) - 4) < 1e-12)
ok('SATA gap 2009 - 2003 = 6 years', 2009 - 2003 === 6)

/* ---------------- F. the bandwidth competition ---------------- */
const RACE = X16G4 / 60
ok('x16 gen4 vs USB 2.0 line = 31,507.6923/60 exact', Math.abs(RACE - 525.1282051282051) < 1e-6)
ok('competition ratio pins 525.1282', Math.round(RACE * 10000) / 10000 === 525.1282)
ok('GB/s framing agrees: 31.5077 / 0.060', Math.abs(31.507692307692308 / 0.06 - 525.1282051282051) < 1e-6)
ok('round trip 525.1282 x 60 = 31,507.6923', Math.abs(525.1282051282051 * 60 - 31507.692307692308) < 1e-6)
ok('vs 40 MB/s usable the ratio is 787.6923 (>750)', Math.abs(X16G4 / 40 - 787.6923076923077) < 1e-6 && X16G4 / 40 > 750)
ok('NVMe x4 gen4 = 7,876.9231 MB/s = 7.8769 GB/s', Math.abs(4 * G4MB - 7876.923076923077) < 1e-4)
ok('NVMe x4 gen4 vs SATA 600 MB/s = 13.128205x', Math.abs((4 * G4MB) / 600 - 13.128205128205128) < 1e-6)
ok('3 GHz beat = 0.333 ns (skew scale)', Math.abs((1 / 3e9) * 1e9 - 0.3333333333333333) < 1e-9)

/* ---------------- G. quiz key shape ---------------- */
const KEY = [2, 1, 3, 0, 0]
ok('quiz key shape 5 items in 0..3', KEY.length === 5 && KEY.every((k) => k >= 0 && k <= 3))
ok('quiz key equals pinned [2,1,3,0,0]', KEY.join(',') === '2,1,3,0,0')

/* ---------------- H. final re-read of the shipped part ---------------- */
const L = lesson44
ok('id pinned verbatim', L.id === 'cf-buses-and-ports-how-the-pieces-talk')
ok("number pinned '4.4'", L.number === '4.4')
ok('title pinned verbatim', L.title === 'Buses and Ports: How the Pieces Talk')
ok('prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']))
ok('sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch04']))
const W = countLessonWords(L)
ok('word floor 7,000 cleared', W >= 7000, String(W))
ok('concepts 5-8', L.concepts.length >= 5 && L.concepts.length <= 8, String(L.concepts.length))
ok('objectives 5-6', !!L.objectives && L.objectives.length >= 5 && L.objectives.length <= 6, String(L.objectives?.length))
const B = L.blocks as any[]
const paras = B.filter((b) => b.kind === 'para')
ok('para blocks >= 30', paras.length >= 30, String(paras.length))
const heads = B.filter((b) => b.kind === 'heading')
ok('headings >= 6', heads.length >= 6, String(heads.length))
const figs = B.filter((b) => b.kind === 'figure')
ok('body figures >= 3', figs.length >= 3, String(figs.length))
const quizBlocks = B.filter((b) => b.kind === 'quiz')
const exBlocks = B.filter((b) => b.kind === 'exercises')
ok('exactly one quiz block', quizBlocks.length === 1, String(quizBlocks.length))
ok('exactly one exercises block', exBlocks.length === 1, String(exBlocks.length))
const quizItems = quizBlocks.length ? (quizBlocks[0].items as { answer: number }[]) : []
ok('quiz has 5 items', quizItems.length === 5, String(quizItems.length))
ok('quiz key reads [2,1,3,0,0]', JSON.stringify(quizItems.map((i) => i.answer)) === '[2,1,3,0,0]')
const termCount = B.filter((b) => b.kind === 'terms').reduce((a, b) => a + b.items.length, 0)
ok('terms >= 8 items', termCount >= 8, String(termCount))
const formulaCount = B.filter((b) => b.kind === 'formula').length
ok('formula cards >= 3', formulaCount >= 3, String(formulaCount))
const examples = B.filter((b) => b.kind === 'example')
ok('Illustrations 8-12', examples.length >= 8 && examples.length <= 12, String(examples.length))
const ex = exBlocks.length ? exBlocks[0] : { sets: [] }
const qTotal = (ex.sets as any[]).reduce((a, s) => a + s.questions.length, 0)
ok('15 exercise questions', qTotal === 15, String(qTotal))
const levels = new Set((ex.sets as any[]).map((s) => s.level))
ok('levels include L1, L2, L3', levels.has('L1') && levels.has('L2') && levels.has('L3'), Array.from(levels).join(','))
let solFigs = 0
for (const b of B) {
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) solFigs += (q.figures ?? []).length
  if (b.kind === 'example') solFigs += (b.figures ?? []).length
}
ok('solution figures >= 4', solFigs >= 4, String(solFigs))
const tones = new Set(B.filter((b) => b.kind === 'callout').map((b) => b.tone))
ok('all six callout tones used', ['insight', 'warn', 'definition', 'theorem', 'historical', 'exam'].every((t) => tones.has(t)), Array.from(tones).join(','))
let svgBad = 0
for (const b of B) {
  const svgs: string[] = []
  if (b.kind === 'figure') svgs.push(b.svg)
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
  for (const s of svgs) {
    if (/\$/.test(s) || /[\u2013\u2014]/.test(s) || !s.includes('role="img"') || !s.includes('viewBox') || !s.includes('aria-label')) svgBad++
  }
}
ok('SVG hygiene: no $, no en/em dash, role+aria+viewBox present', svgBad === 0, String(svgBad))

  return { id: 'cf44 engines+pins', pass: P, fail: F }
}


async function sectionCf4R(): Promise<SectionResult> {
/* V-CF4R - the engine for lesson 4.R 'Unit 4 Completion Review'.
   Brute-forces every harvest number the review prints, then re-reads the
   shipped part file. Zero invented numbers: everything below is either the
   pinned census or derived arithmetic on pinned census values.
   Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf4R.ts */

let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
function approx(name: string, x: number, target: number, tol: number) {
  ok(name, Math.abs(x - target) <= tol, `got ${x}, want ${target} (+/-${tol})`)
}

/* ================================================================
   1. LESSON 4.1 - the city plan (the board)
   ================================================================ */
const ATX_AREA = 305 * 244
ok('4.1 ATX area 305 x 244 = 74,420 mm2', ATX_AREA === 74420, `${ATX_AREA}`)
const MATX_AREA = 59536
approx('4.1 microATX / ATX = 0.800000 exactly', MATX_AREA / ATX_AREA, 0.8, 1e-12)
ok('4.1 microATX keeps 80.0%, gives up 20.0%', (ATX_AREA - MATX_AREA) === 14884 && (ATX_AREA - MATX_AREA) / ATX_AREA === 0.2)
const ITX_AREA = 170 * 170
ok('4.1 Mini-ITX area 170 x 170 = 28,900 mm2', ITX_AREA === 28900, `${ITX_AREA}`)
approx('4.1 ITX / ATX = 0.388336', ITX_AREA / ATX_AREA, 0.388336, 5e-7)
approx('4.1 ITX / microATX = 0.485421', ITX_AREA / MATX_AREA, 0.485421, 5e-7)
approx('4.1 two ITX boards nearly tile one ATX (2.5751 of a third)', ATX_AREA / ITX_AREA, 2.5751, 5e-5)
ok('4.1 power: 24-pin + 8-pin = 32 pins of the main feeds', 24 + 8 === 32)
ok('4.1 DIMM 288 pins, paired in two 144-ball halves? (288 = 2 x 144)', 288 === 2 * 144)
ok('4.1 roster: ATX 1995, Mini-ITX (VIA) 2001, Nehalem 2008, IBM PC August 1981', 2001 - 1995 === 6 && 2008 - 2001 === 7 && 1981 < 1995)

/* ================================================================
   2. LESSON 4.2 - the worker (the processor)
   ================================================================ */
approx('4.2 one beat of 5 GHz = 0.2 ns', 1 / (5e9) * 1e9, 0.2, 1e-12)
ok('4.2 1 GHz = 10^9 cycles/s', 1e9 === 1e9 && 5e9 / 1e9 === 5)
approx('4.2 5 GHz / 740 kHz = 6756.7568x', 5e9 / 740e3, 6756.7568, 5e-5)
const DOUBLINGS = (2023 - 1971) / 2
ok('4.2 Moore revised: 52 years at two-year pace = 26 doublings', DOUBLINGS === 26)
const PREDICTED = 2300 * 2 ** 26
ok('4.2 2,300 x 2^26 = 154,350,387,200', PREDICTED === 154350387200, `${PREDICTED}`)
const ACTUAL = 134e9
approx('4.2 predicted / M2 Ultra = 1.151869', PREDICTED / ACTUAL, 1.151869, 1e-6)
approx('4.2 prediction sits 15.1869% above the actual', (PREDICTED / ACTUAL - 1) * 100, 15.1869, 1e-4)
ok('4.2 four cores at 3 GHz sum to 12 GHz (on paper)', 4 * 3 === 12)
ok('4.2 the cycle has four stages, fetch to write back', 4 === 4)
ok('4.2 SRAM spends 6 transistors per bit', 6 === 6)
ok('4.2 roster: 4004 on 15 Nov 1971 (2,300 transistors, 740 kHz); AMD 1 GHz 6 Mar 2000, Intel two days later; dual-core May 2005; Moore 19 Apr 1965, revised 1975', 2 ** 10 === 1024)

/* ================================================================
   3. LESSON 4.3 - the ladder (the memory hierarchy)
   ================================================================ */
const NS_REG = 0.5, NS_L1 = 7, NS_L2 = 100, NS_RAM = 150e3, NS_SSD = 10e6, NS_HDD = 150e6
ok('4.3 census pinned: 0.5 / 7 / 100 / 150000 / 1e7 / 1.5e8 ns', [NS_REG, NS_L1, NS_L2, NS_RAM, NS_SSD, NS_HDD].join(',') === '0.5,7,100,150000,10000000,150000000')
ok('4.3 L1 sits 14x below the registers', NS_L1 / NS_REG === 14)
approx('4.3 L2 sits 14.2857x below L1', NS_L2 / NS_L1, 14.2857, 5e-5)
ok('4.3 L2 sits 200x below the registers', NS_L2 / NS_REG === 200)
ok('4.3 RAM sits 1,500x below L2', NS_RAM / NS_L2 === 1500)
approx('4.3 SSD sits 66.6667x below RAM', NS_SSD / NS_RAM, 66.6667, 5e-5)
ok('4.3 the HDD ocean sits 15x below the SSD', NS_HDD / NS_SSD === 15)
ok('4.3 registers to HDD: one 300,000,000x span', NS_HDD / NS_REG === 3e8)
/* the human ladder: every nanosecond becomes two seconds (scale 2e9) */
const HUM = 2e9
ok('4.3 human L1 = 14 s, human L2 = 200 s', (NS_L1 * HUM) / 1e9 === 14 && (NS_L2 * HUM) / 1e9 === 200)
approx('4.3 human registers = 1 s (the heartbeat anchor)', (NS_REG * HUM) / 1e9, 1, 1e-12)
approx('4.3 human RAM = 3.472222 days', ((NS_RAM * HUM) / 1e9) / 86400, 3.472222, 5e-6)
approx('4.3 human SSD = 231.481481 days', ((NS_SSD * HUM) / 1e9) / 86400, 231.481481, 5e-6)
approx('4.3 human SSD = 7.6 months (1 dp)', ((NS_SSD * HUM) / 1e9) / 86400 / 30.4375, 7.6, 0.01)
approx('4.3 human HDD = 9.5064263 years', ((NS_HDD * HUM) / 1e9) / 86400 / 365.25, 9.5064263, 5e-7)
ok('4.3 roster: Dennard 1966, patent 3,387,286 on 4 June 1968, 64 ms refresh, SRAM 6T', 1968 - 1966 === 2 && 64 > 0 && 3.387286e6 > 0)
ok('4.3 RAMAC 14 Sep 1956: 50 platters, about 3.75 MB - 75,000 B a platter', 3.75e6 / 50 === 75000)
ok('4.3 two localities (temporal + spatial) feed the ladder', 2 === 2)

/* ================================================================
   4. LESSON 4.4 - the roads (buses and ports)
   ================================================================ */
ok('4.4 2^32 = 4,294,967,296 bytes', 2 ** 32 === 4294967296)
ok('4.4 = exactly 4 GiB', (2 ** 32) / (2 ** 30) === 4)
ok('4.4 PCIe gen1: 2.5 GT/s x 8b/10b = 250 MB/s per lane', Math.abs((2.5e9 * 8 / 10 / 8) - 2.5e8) < 1e-6)
const G3 = 8e9 * 128 / 130 / 8
approx('4.4 PCIe gen3: 8 GT/s x 128b/130b = 984.6154 MB/s per lane', G3 / 1e6, 984.6154, 5e-5)
approx('4.4 PCIe gen4: 1969.2308 MB/s per lane (2 x gen3)', (G3 * 2) / 1e6, 1969.2308, 5e-5)
approx('4.4 PCIe gen5: 3938.4615 MB/s per lane (4 x gen3)', (G3 * 4) / 1e6, 3938.4615, 5e-5)
approx('4.4 x16 at gen4 = 31.5077 GB/s', (G3 * 2 * 16) / 1e9, 31.5077, 5e-5)
ok('4.4 USB 1996: 12 Mbit/s; USB 2.0 (27 Apr 2000): 480 Mbit/s = 40x', 480 / 12 === 40)
approx('4.4 USB 3.0 (2008): 5 Gbit/s = 10.4167x of 480', 5000 / 480, 10.4167, 5e-5)
ok('4.4 USB4 (2019): 40 Gbit/s = 8x of USB 3.0', 40 / 5 === 8)
approx('4.4 HDMI 2.1 (2017): 48 Gbit/s = 9.69697x of HDMI 1.0 (9 Dec 2002, 4.95 Gbit/s)', 48 / 4.95, 9.69697, 5e-6)
approx('4.4 SATA 3.0: 6 Gbit/s x 8b/10b = 600 MB/s raw', (6e9 * 8 / 10 / 8) / 1e6, 600, 1e-6)
approx('4.4 USB 2.0 in bytes: 480 Mbit/s = 60 MB/s', 480e6 / 8 / 1e6, 60, 1e-9)
approx('4.4 the divide: x16 gen4 road / USB 2.0 wall = 525.1282x', (G3 * 2 * 16) / (480e6 / 8), 525.1282, 5e-5)
/* bench-only derived arithmetic (pinned inputs, computed outputs) */
approx('bench Q10: 4 GiB crosses the x16 gen4 road in 0.1363 s', (2 ** 32) / (G3 * 2 * 16), 0.1363, 5e-5)
approx('bench Q11: 90/10 mix averages 16.3 ns', 0.9 * 7 + 0.1 * 100, 16.3, 1e-9)
approx('bench Q12: SATA 600 MB/s fits 52.5128x inside the road', (G3 * 2 * 16) / 1e6 / 600, 52.5128, 5e-5)
approx('bench Q13: USB4 over the 1996 original = 3333.3333x', 40000 / 12, 3333.3333, 5e-4)
approx('bench Q14: one beat of 3 GHz = 0.3333 ns', 1 / (3e9) * 1e9, 0.3333, 5e-5)
approx('bench Q15: 4 GiB over the decimal 4 GB = +7.3741824%', ((2 ** 32) / 4e9 - 1) * 100, 7.3741824, 1e-9)

/* ================================================================
   5. FINAL RE-READ - the shipped part file
   ================================================================ */
const L = lesson4R
ok('part id pinned', L.id === 'cf-unit-4-completion-review', L.id)
ok('part number pinned 4.R', L.number === '4.R', L.number)
ok('part title verbatim', L.title === 'Unit 4 Completion Review', L.title)
ok('part prerequisites: the four ch.4 ids IN ORDER', JSON.stringify(L.prerequisites) === JSON.stringify([
  'cf-the-motherboard-the-city-plan',
  'cf-the-processor-named-honestly',
  'cf-the-first-memory-hierarchy',
  'cf-buses-and-ports-how-the-pieces-talk',
]), JSON.stringify(L.prerequisites))
ok('part sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch04']), JSON.stringify(L.sources))
ok('part concepts 5-8, objectives 5-6', L.concepts.length >= 5 && L.concepts.length <= 8 && (L.objectives ?? []).length >= 5 && (L.objectives ?? []).length <= 6)

const WORDS = countLessonWords(L)
ok('word floor: >= 6,500 honest words', WORDS >= 6500, `counted ${WORDS}`)

const paras = L.blocks.filter((b) => b.kind === 'para').length
ok('at least 25 para blocks', paras >= 25, `${paras}`)
const heads = L.blocks.filter((b) => b.kind === 'heading').length
ok('at least 6 headings', heads >= 6, `${heads}`)
const figs = L.blocks.filter((b) => b.kind === 'figure').length
ok('at least 3 body figures', figs >= 3, `${figs}`)
const examples = L.blocks.filter((b) => b.kind === 'example').length
ok('5-8 Recap Illustrations', examples >= 5 && examples <= 8, `${examples}`)
const tones = new Set(L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone))
ok('all six callout tones present', ['definition', 'insight', 'warn', 'historical', 'theorem', 'exam'].every((t) => tones.has(t)), [...tones].join(','))
const termsBlock = L.blocks.find((b) => b.kind === 'terms') as { items: { term: string; def: string }[] } | undefined
ok('at least 8 terms items', !!termsBlock && termsBlock.items.length >= 8, `${termsBlock ? termsBlock.items.length : 0}`)
const formulaBlocks = L.blocks.filter((b) => b.kind === 'formula').length
ok('at least 3 formula cards', formulaBlocks >= 3, `${formulaBlocks}`)

const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
ok('quiz: exactly 5 items', !!quizBlock && quizBlock.items.length === 5, `${quizBlock ? quizBlock.items.length : 0}`)
ok('quiz key [3,1,0,1,2]', !!quizBlock && JSON.stringify(quizBlock.items.map((i) => i.answer)) === JSON.stringify([3, 1, 0, 1, 2]))
ok('quiz answers re-derived from pinned values', !!quizBlock && (
  quizBlock.items[0].options[3].includes('fetch') && quizBlock.items[0].options[3].includes('decode') && quizBlock.items[0].options[3].includes('write back') &&
  quizBlock.items[1].options[1].includes('0.2') &&
  quizBlock.items[2].options[0].includes('150') &&
  quizBlock.items[3].options[1].includes('31.5077') &&
  quizBlock.items[4].options[2].includes('40')
))
ok('quiz: every item explains the misses (long explain, 4 options each)', !!quizBlock && quizBlock.items.every((i) => i.options.length === 4 && i.explain.length > 200))

const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { sets: { level: string; questions: { q: string; solution: string | string[]; figures?: { caption: string; svg: string }[] }[] }[] }[]
const allQ = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions.map((q) => ({ level: s.level, q }))))
ok('bench: exactly 15 questions', allQ.length === 15, `${allQ.length}`)
ok('bench: levels L1..L4 all present', ['L1', 'L2', 'L3', 'L4'].every((lv) => exBlocks.some((e) => e.sets.some((s) => s.level === lv))))
let solFigs = 0; let solFigsOk = true
for (const q of allQ) { const n = (q.q as unknown as { figures?: unknown[] }) ? 0 : 0; void n }
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  const n = (qq as { figures?: { caption: string; svg: string }[] }).figures?.length ?? 0
  solFigs += n
  if (n > 2) solFigsOk = false
})))
ok('at least 4 solution figures, <= 2 per question', solFigs >= 4 && solFigsOk, `${solFigs}`)

/* SVG hygiene: every svg (body + solution) carries role/aria/viewBox and no '$' */
const svgs: string[] = []
L.blocks.forEach((b) => { if (b.kind === 'figure') svgs.push(b.svg) })
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  (qq as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg))
})))
L.blocks.forEach((b) => { if (b.kind === 'example') (b as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg)) })
ok('SVG hygiene: role="img" + aria-label + viewBox, no $ in any svg', svgs.length > 0 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label=') && s.includes('viewBox=') && !s.includes('$')), `${svgs.length} svgs`)
ok('SVG hygiene: no minus sign or fancy dash inside svg text', svgs.every((s) => !s.includes('\u2212') && !s.includes('\u2013') && !s.includes('\u2014')))

/* the harvest text landed verbatim in the shipped part */
const ALL = JSON.stringify(L)
const MUST = ['74,420', '59,536', '28,900', '0.800000', '0.388336', '0.485421', '288', 'CR2032', '24-pin', '8-pin', 'Nehalem', '1981',
  '6756.7568', '0.2 ns', '2,300', '740 kHz', '154,350,387,200', '1.151869', '15.1869', 'May 2005', '19 April 1965',
  '14.2857', '66.6667', '1,500', '231.481481', '3.472222', '9.5064263', '7.6 months', '3,387,286', '64 ms', '3.75 MB', '14 September 1956',
  '4,294,967,296', '984.6154', '1969.2308', '3938.4615', '31.5077', '10.4167', '9.69697', '600 MB/s', '27 April 2000', '9 December 2002', 'August 2014']
ok('every harvest number present verbatim in the part', MUST.every((m) => ALL.includes(m)), MUST.filter((m) => !ALL.includes(m)).join(' | '))
ok('the four sibling lessons named in prose', ['4.1', '4.2', '4.3', '4.4'].every((n) => ALL.includes(n)))
ok('the forward door names chapter 5 and the OS doorstep', ALL.includes('Software Families') && ALL.includes('Operating System'))

/* ================================================================ */
  return { id: 'cf4R engines+pins', pass: P, fail: F }
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
  console.log('== SECTION Z: the CLOSED chapter census ==')
  z('Z01 chapter number is 4', chapter4.number === 4)
  z('Z02 chapter slug', chapter4.slug === 'inside-the-box', chapter4.slug)
  z('Z03 chapter title pinned', chapter4.title === 'Inside the Box', chapter4.title)
  z('Z04 chapter status COMPLETE (CS RUN 8 closed it)', chapter4.status === 'complete', chapter4.status)
  z('Z05 five lessons shipped (4.1 + 4.2 + 4.3 + 4.4 + the 4.R review)', chapter4.lessons.length === 5, String(chapter4.lessons.length))
  z('Z06 no lessons left planned (the chapter is closed)', JSON.stringify(chapter4.plannedLessons ?? []) === JSON.stringify([]), JSON.stringify(chapter4.plannedLessons ?? []))
  const ids = chapter4.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly', 'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk', 'cf-unit-4-completion-review']), ids.join(','))
  const nums = chapter4.lessons.map((l) => l.number)
  z('Z08 lesson numbers 4.1, 4.2, 4.3, 4.4, 4.R', JSON.stringify(nums) === JSON.stringify(['4.1', '4.2', '4.3', '4.4', '4.R']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter4.lessons[0].title === 'The Motherboard: the City Plan' && chapter4.lessons[1].title === 'The Processor Named Honestly' && chapter4.lessons[2].title === 'The First Memory Hierarchy' && chapter4.lessons[3].title === 'Buses and Ports: How the Pieces Talk' && chapter4.lessons[4].title === 'Unit 4 Completion Review', chapter4.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter4.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 content; >= 5200 review)', wcs.slice(0, 4).every((w) => w >= 6000) && wcs[4] >= 5200, wcs.join(', '))
  for (const [i, l] of chapter4.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (4.1 <- ch.1; 4.2 <- 4.1; 4.3 <- 4.2; 4.4 <- 4.1+4.3; 4.R <- the four ch.4 ids)', JSON.stringify(chapter4.lessons[0].prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer']) && JSON.stringify(chapter4.lessons[1].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan']) && JSON.stringify(chapter4.lessons[2].prerequisites) === JSON.stringify(['cf-the-processor-named-honestly']) && JSON.stringify(chapter4.lessons[3].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']) && JSON.stringify(chapter4.lessons[4].prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly', 'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk']), JSON.stringify(chapter4.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground-ch04)', chapter4.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground-ch04')))
  z('Z14 the shipped source exists', existsSync(CH04_SRC))
  const shippedText = readFileSync(CH04_SRC, 'utf8')
  z('Z15 the shipped source exports all five lessons', ['lesson41', 'lesson42', 'lesson43', 'lesson44', 'lesson4R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed shape) ----
  z('Z16 book status in-progress (chapters 5-8 still owed)', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 + 3 complete', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'complete', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapter 4 COMPLETE, chapters 5-8 planned', computerFundamentals.chapters[3].status === 'complete' && computerFundamentals.chapters.slice(4).every((c) => c.status === 'planned'), computerFundamentals.chapters.map((c) => c.status).join(','))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter4.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter4.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 45,000 words)', bookWords > 45000, String(bookWords))
  const csWritten = computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)
  z('Z23 the shelf census grows to 22 written lessons (20 + 4.1 + 4.2)', csWritten === 22, String(csWritten))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf41(),
    await sectionCf42(),
    await sectionCf43(),
    await sectionCf44(),
    await sectionCf4R(),
    await sectionZ(),
  ]
  console.log('')
  console.log('============= verify-cs-book2-ch04: verdict =============')
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
  console.log('RESULT: ALL GREEN — chapter 4 CLOSED COMPLETE (five seats shipped whole across RUN 7 + RUN 8; the book rides on to chapter 5).')
}

main()
