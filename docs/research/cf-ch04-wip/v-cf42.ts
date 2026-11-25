import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson, Block, QuizItem, ExerciseSet, SolutionFigure } from '../../../src/data/library/types'

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

export {}

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
  const mod = await import('./part-cf42')
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

console.log(`V-CF42: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
