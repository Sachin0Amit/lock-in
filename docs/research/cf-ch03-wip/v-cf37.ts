export {}
/**
 * V-CF37 — the verify-first engine for CS RUN 5 seat 7
 * (lesson 3.7 'Binary to Decimal Conversion', part-cf37.ts).
 *
 * Brute-forces EVERY number the lesson prints: the pinned weight sums,
 * the doubling traces, the grouped reads, the fractions, the popcount
 * census, the quiz semantics — then re-reads the shipped part (word
 * floor, quiz key, figure censuses, id/number/title/prereqs, SVG law).
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf37.ts
 */

import { lesson37 } from './part-cf37'
import { countLessonWords } from '../../../src/data/library/types'

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) {
    P++
  } else {
    F++
    fails.push(name + (detail ? ' :: ' + detail : ''))
  }
}

/* ------------------------------------------------------------------ */
/* Independent conversion machinery — three roads to every number.     */
/* ------------------------------------------------------------------ */
const val = (bits: string): number => parseInt(bits, 2)
const weightsOf = (bits: string): number[] =>
  [...bits].map((c, i) => (c === '1' ? 1 << (bits.length - 1 - i) : 0)).filter((w) => w > 0)
const horner = (bits: string): number[] => {
  const t: number[] = []
  let v = 0
  for (const c of bits) {
    v = 2 * v + (c === '1' ? 1 : 0)
    t.push(v)
  }
  return t
}
const pop = (s: string): number => [...s].filter((c) => c === '1').length
const frac = (bits: string): number => parseInt(bits, 2) / 2 ** bits.length
const hexOf = (bits: string): string => {
  const padded = bits.padStart(Math.ceil(bits.length / 4) * 4, '0')
  const chunks: string[] = []
  for (let i = 0; i < padded.length; i += 4) chunks.push(padded.slice(i, i + 4))
  return chunks.map((c) => parseInt(c, 2).toString(16).toUpperCase()).join('')
}
const octDigits = (bits: string): number[] => {
  const padded = bits.padStart(Math.ceil(bits.length / 3) * 3, '0')
  const chunks: number[] = []
  for (let i = 0; i < padded.length; i += 3) chunks.push(parseInt(padded.slice(i, i + 3), 2))
  return chunks
}
const octVal = (digits: number[]): number => digits.reduce((a, d) => a * 8 + d, 0)
const greedy = (n: number): number[] => {
  const chosen: number[] = []
  let rest = n
  for (let w = 1 << 20; w >= 1; w = Math.floor(w / 2)) {
    if (rest >= w) {
      chosen.push(w)
      rest -= w
    }
  }
  return chosen
}
const eq = (a: number[], b: number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i])
const KEY = [3, 2, 1, 0, 3]

/* ------------------------------------------------------------------ */
/* A. The pinned weight sums                                           */
/* ------------------------------------------------------------------ */
ok('A1 101101 reads 45', val('101101') === 45)
ok('A2 101101 live weights are 32, 8, 4, 1', eq(weightsOf('101101'), [32, 8, 4, 1]))
ok('A3 32 + 8 + 4 + 1 = 45', 32 + 8 + 4 + 1 === 45)
ok('A4 the 2026 witness 11111101010 reads 2026', val('11111101010') === 2026)
ok('A5 witness live weights 1024..2', eq(weightsOf('11111101010'), [1024, 512, 256, 128, 64, 32, 8, 2]))
ok('A6 the eight chosen powers sum to 2026', 1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 === 2026)
ok('A7 the witness carries 11 bits', '11111101010'.length === 11)
ok('A8 the byte 11001011 reads 203', val('11001011') === 203)
ok('A9 byte live weights 128, 64, 8, 2, 1', eq(weightsOf('11001011'), [128, 64, 8, 2, 1]))
ok('A10 128 + 64 + 8 + 2 + 1 = 203', 128 + 64 + 8 + 2 + 1 === 203)
ok('A11 greedy 45 picks exactly 32, 8, 4, 1', eq(greedy(45), [32, 8, 4, 1]))
ok('A12 greedy 2026 picks the witness powers', eq(greedy(2026), [1024, 512, 256, 128, 64, 32, 8, 2]))

/* ------------------------------------------------------------------ */
/* B. The doubling (Horner) traces                                     */
/* ------------------------------------------------------------------ */
ok('B1 110110 trace is 1, 3, 6, 13, 27, 54', eq(horner('110110'), [1, 3, 6, 13, 27, 54]))
ok('B2 110110 ends at 54', horner('110110')[5] === 54 && val('110110') === 54)
ok('B3 101101 trace is 1, 2, 5, 11, 22, 45', eq(horner('101101'), [1, 2, 5, 11, 22, 45]))
ok('B4 both methods agree on 101101', horner('101101')[5] === weightsOf('101101').reduce((a, b) => a + b, 0))
ok('B5 101110 trace is 1, 2, 5, 11, 23, 46', eq(horner('101110'), [1, 2, 5, 11, 23, 46]))
ok('B6 10011001 trace is 1, 2, 4, 9, 19, 38, 76, 153', eq(horner('10011001'), [1, 2, 4, 9, 19, 38, 76, 153]))
ok('B7 the 2026 doubling trace', eq(horner('11111101010'), [1, 3, 7, 15, 31, 63, 126, 253, 506, 1013, 2026]))
ok(
  'B8 Horner equals the weight sum on every pinned numeral',
  ['101101', '110110', '11111101010', '11001011', '101110', '10011001'].every(
    (s) => horner(s)[s.length - 1] === weightsOf(s).reduce((a, b) => a + b, 0),
  ),
)

/* ------------------------------------------------------------------ */
/* C. The grouped reads                                                */
/* ------------------------------------------------------------------ */
ok('C1 111101010010 reads 3922', val('111101010010') === 3922)
ok('C2 hex F52 equals 3922', 0xf52 === 3922)
ok('C3 15 x 256 + 5 x 16 + 2 = 3922', 15 * 256 + 5 * 16 + 2 === 3922)
ok('C4 3840 + 80 + 2 = 3922', 3840 + 80 + 2 === 3922)
ok('C5 blocking by four gives F, 5, 2', hexOf('111101010010') === 'F52')
ok('C6 hex digit values F=15, E=14, D=13, A=10, 2=2', [0xf, 0xe, 0xd, 0xa, 0x2].every((x, i) => x === [15, 14, 13, 10, 2][i]))
ok('C7 11011010 = 218 = DA', val('11011010') === 218 && 13 * 16 + 10 === 218 && hexOf('11011010') === 'DA')
ok('C8 octal 305 reads 197', parseInt('305', 8) === 197)
ok('C9 3 x 64 + 5 = 197', 3 * 64 + 5 === 197)
ok('C10 10011101 = 157 through octal 235', val('10011101') === 157 && octVal(octDigits('10011101')) === 157 && eq(octDigits('10011101'), [2, 3, 5]))
ok('C11 2 x 64 + 3 x 8 + 5 = 157', 2 * 64 + 3 * 8 + 5 === 157)
ok('C12 101101 blocked by three is octal 55 = 45', hexOf !== undefined && octVal(octDigits('101101')) === 45 && eq(octDigits('101101'), [5, 5]))
ok('C13 #FF = 255 = 11111111', 0xff === 255 && val('11111111') === 255 && 15 * 16 + 15 === 255)
ok('C14 #80 = 128 = 10000000', 0x80 === 128 && val('10000000') === 128)
ok('C15 #2D = 45, the opening witness in hex dress', 0x2d === 45 && 2 * 16 + 13 === 45 && (45).toString(2) === '101101')
ok('C16 45 padded to eight bits blocks into 2D', (45).toString(2).padStart(8, '0') === '00101101' && hexOf('00101101') === '2D')

/* ------------------------------------------------------------------ */
/* D. The fractions                                                    */
/* ------------------------------------------------------------------ */
ok('D1 0.011 = 0.375', frac('011') === 0.375)
ok('D2 0.25 + 0.125 = 0.375', 0.25 + 0.125 === 0.375)
ok('D3 0.011 is exactly three eighths', 3 / 8 === 0.375)
ok('D4 101.11 = 5.75', val('101') + frac('11') === 5.75)
ok('D5 0.5 + 0.25 = 0.75', 0.5 + 0.25 === 0.75)
ok('D6 0.101 = 0.625 = five eighths', frac('101') === 0.625 && 5 / 8 === 0.625)
ok('D7 11.101 = 3.625 = twenty-nine eighths', val('11') + frac('101') === 3.625 && 29 / 8 === 3.625)
ok('D8 negative powers 0.5, 0.25, 0.125 and 0.111 = 7/8', 2 ** -1 === 0.5 && 2 ** -2 === 0.25 && 2 ** -3 === 0.125 && frac('111') === 0.875)

/* ------------------------------------------------------------------ */
/* E. The census instinct (popcount + doubling shortcut)               */
/* ------------------------------------------------------------------ */
ok('E1 popcount(1111) = 4', pop('1111') === 4)
ok('E2 popcount(11111101010) = 8', pop('11111101010') === 8)
ok('E3 popcount(101101) = 4, popcount(11001011) = 5, popcount(110110) = 4', pop('101101') === 4 && pop('11001011') === 5 && pop('110110') === 4)
ok('E4 appending 0 doubles: 1101 = 13 -> 11010 = 26', val('1101') === 13 && val('11010') === 26 && val('11010') === 2 * val('1101'))
ok('E5 1011 = 11 -> 10110 = 22', val('1011') === 11 && val('10110') === 22 && val('10110') === 2 * val('1011'))
ok('E6 appending 1 gives 2v + 1: 11011 = 27', val('11011') === 27 && val('11011') === 2 * 13 + 1)
ok('E7 two appended zeros quadruple: 110100 = 52', val('110100') === 52 && val('110100') === 4 * 13)

/* ------------------------------------------------------------------ */
/* F. Reference numbers the prose prints                               */
/* ------------------------------------------------------------------ */
ok(
  'F1 the powers 2^0..2^10',
  eq(
    Array.from({ length: 11 }, (_, i) => 2 ** i),
    [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
  ),
)
ok('F2 the eight byte weights total 255 = 2^8 - 1', [128, 64, 32, 16, 8, 4, 2, 1].reduce((a, b) => a + b, 0) === 255 && 2 ** 8 - 1 === 255)
ok('F3 2026 fits in eleven bits: 1024 <= 2026 < 2048', 1024 <= 2026 && 2026 < 2048 && 2 ** 11 - 1 === 2047)
ok('F4 11111 = 31 = 2^5 - 1', val('11111') === 31 && 2 ** 5 - 1 === 31)
ok('F5 exercise-fresh values 1011=11, 10011=19, 01010101=85, 10011001=153', val('1011') === 11 && val('10011') === 19 && val('01010101') === 85 && val('10011001') === 153)
ok('F6 01010101 live weights 64, 16, 4, 1', eq(weightsOf('01010101'), [64, 16, 4, 1]))
ok('F7 10011001 live weights 128, 16, 8, 1', eq(weightsOf('10011001'), [128, 16, 8, 1]))
ok('F8 10011 live weights 16, 2, 1', eq(weightsOf('10011'), [16, 2, 1]))
ok('F9 101110 live weights 32, 8, 4, 2', eq(weightsOf('101110'), [32, 8, 4, 2]))
ok('F10 11111 live weights 16+8+4+2+1', eq(weightsOf('11111'), [16, 8, 4, 2, 1]))

/* ------------------------------------------------------------------ */
/* G. Quiz semantics (the pinned key [3, 2, 1, 0, 3])                  */
/* ------------------------------------------------------------------ */
ok('G1 q1 distractors 43, 44, 46 with 45 at index 3', ['43', '44', '46', '45'][3] === '45' && val('101101') === 45)
ok('G2 q2 running value after four bits of 110110 is 13 at index 1', horner('110110')[3] === 13 && ['12', '13', '6', '27'][1] === '13')
ok('G3 q3 F52 sits at index 2 among F42, E52, F52, 1F5', hexOf('111101010010') === 'F52' && ['F42', 'E52', 'F52', '1F5'][2] === 'F52')
ok('G4 q4 0.375 sits at index 0 among the fraction distractors', frac('011') === 0.375 && ['0.375', '0.11', '0.3', '0.625'][0] === '0.375')
ok('G5 q5 popcount 8 sits at index 3 among 7, 9, 6, 8', pop('11111101010') === 8 && ['7', '9', '6', '8'][3] === '8')
ok('G6 the pinned key is [3, 2, 1, 0, 3]', eq(KEY, [3, 2, 1, 0, 3]))

/* ------------------------------------------------------------------ */
/* H. Honest brute force — every 11-bit pattern, three roads + bounds  */
/* ------------------------------------------------------------------ */
{
  let allAgree = true
  let boundsHold = true
  let count = 0
  for (let n = 0; n < 2048; n++) {
    const s = n.toString(2).padStart(11, '0')
    const w = weightsOf(s).reduce((a, b) => a + b, 0)
    const h = horner(s)[10]
    const o = octVal(octDigits(s))
    if (!(val(s) === w && val(s) === h && val(s) === o)) allAgree = false
    if (!(val(s) >= 2 ** pop(s) - 1 && val(s) <= 2 ** 11 - 1)) boundsHold = false
    count++
  }
  ok('H1 all 2048 eleven-bit patterns agree across weight sum, Horner and octal', allAgree && count === 2048)
  ok('H2 popcount bounds hold for all 2048 patterns', boundsHold)
}
{
  let byteOk = true
  for (let n = 0; n < 256; n++) {
    const s = n.toString(2).padStart(8, '0')
    if (hexOf(s).length !== 2 || parseInt(hexOf(s), 16) !== n) byteOk = false
  }
  ok('H3 every byte blocks into exactly two hex digits that read back', byteOk)
}

/* ------------------------------------------------------------------ */
/* J. Fresh values the continuation pass prints (prose + exercises)    */
/* ------------------------------------------------------------------ */
ok('J1 11011001 = 217 = D9 = 13 x 16 + 9', val('11011001') === 217 && 13 * 16 + 9 === 217 && hexOf('11011001') === 'D9' && 208 + 9 === 217)
ok('J2 the reversal-trap neighbours of 45 are honest reads: 43 = 101011, 44 = 101100, 46 = 101110', val('101011') === 43 && val('101100') === 44 && val('101110') === 46)
ok('J3 the trap sums: 32 + 8 + 2 + 1 = 43, 32 + 8 + 4 = 44, 32 + 8 + 4 + 2 = 46', 32 + 8 + 2 + 1 === 43 && 32 + 8 + 4 === 44 && 32 + 8 + 4 + 2 === 46)
ok('J4 quiz hex distractors evaluate: F42 = 3906, E52 = 3666, 1F5 = 501', 0xf42 === 3906 && 0xe52 === 3666 && 0x1f5 === 501)
ok(
  'J5 the prefix invariant: every rung of every pinned ladder equals its prefix read',
  ['101101', '110110', '11111101010', '11001011', '10011001', '101110', '1011', '11011010', '10011101'].every((s) =>
    horner(s).every((v, i) => v === parseInt(s.slice(0, i + 1), 2)),
  ),
)
ok('J6 pad-left blocking: 10110 = 22 = 16 in hex', val('10110') === 22 && hexOf('10110') === '16' && 1 * 16 + 6 === 22)
ok('J7 no finite binary fraction equals 0.3 (a fifth never comes out of halving)', Array.from({ length: 16 }, (_, i) => i + 1).every((k) => (3 * 2 ** k) % 10 !== 0))
ok(
  'J8 practice-set arithmetic: 8 + 2 + 1 = 11, 240 + 15 = 255, 208 + 10 = 218, 128 + 64 + 16 + 8 + 2 = 218, 192 + 5 = 197',
  8 + 2 + 1 === 11 && 240 + 15 === 255 && 208 + 10 === 218 && 128 + 64 + 16 + 8 + 2 === 218 && 192 + 0 + 5 === 197,
)

/* ------------------------------------------------------------------ */
/* Z. Re-read the shipped part (the final >= 5 checks)                 */
/* ------------------------------------------------------------------ */
const L37 = lesson37
const blocks = L37.blocks
const bodyFigs = blocks.filter((b): b is Extract<typeof b, { kind: 'figure' }> => b.kind === 'figure')
const examples = blocks.filter((b): b is Extract<typeof b, { kind: 'example' }> => b.kind === 'example')
const quizBlocks = blocks.filter((b): b is Extract<typeof b, { kind: 'quiz' }> => b.kind === 'quiz')
const headings = blocks.filter((b) => b.kind === 'heading')
const paras = blocks.filter((b) => b.kind === 'para')
const callouts = blocks.filter((b) => b.kind === 'callout')
const tables = blocks.filter((b) => b.kind === 'table')
const algos = blocks.filter((b) => b.kind === 'algorithm')
const derivations = blocks.filter((b) => b.kind === 'derivation')
const formulaCards = blocks.filter((b) => b.kind === 'formula')
const lists = blocks.filter((b) => b.kind === 'list')
const romanLists = lists.filter((b) => b.kind === 'list' && b.marker === 'roman')

let solFigs = 0
let exQ = 0
const exLevels = new Set<string>()
const stepLines: string[] = []
const answerLines: string[] = []
for (const b of blocks) {
  if (b.kind === 'exercises') {
    for (const s of b.sets) {
      exLevels.add(s.level)
      for (const q of s.questions) {
        exQ++
        solFigs += (q.figures ?? []).length
        if (Array.isArray(q.solution)) stepLines.push(...q.solution)
        if (q.answer) answerLines.push(q.answer)
      }
    }
  }
  if (b.kind === 'example') for (const st of b.steps) stepLines.push(st)
}

const svgAll: { svg: string; where: string }[] = []
for (const b of blocks) {
  if (b.kind === 'figure') svgAll.push({ svg: b.svg, where: 'body figure' })
  if (b.kind === 'example') for (const f of b.figures ?? []) svgAll.push({ svg: f.svg, where: 'example figure' })
  if (b.kind === 'exercises')
    for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgAll.push({ svg: f.svg, where: 'solution figure' })
}
const captions: string[] = []
for (const b of blocks) {
  if (b.kind === 'figure') captions.push(b.caption)
  if (b.kind === 'example') for (const f of b.figures ?? []) captions.push(f.caption)
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) captions.push(f.caption)
}

const json = JSON.stringify(L37)

ok('Z1 the part exports a lesson with blocks', Array.isArray(blocks) && blocks.length > 40)
ok('Z2 id is pinned', L37.id === 'cf-binary-to-decimal-conversion')
ok('Z3 number is 3.7', L37.number === '3.7')
ok('Z4 title is pinned verbatim', L37.title === 'Binary to Decimal Conversion')
ok(
  'Z5 prerequisites: 3.2 only, sibling 3.6 deliberately absent',
  JSON.stringify(L37.prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) &&
    !(L37.prerequisites ?? []).includes('cf-decimal-to-binary-conversion'),
)
ok('Z6 sources cite the web ground', (L37.sources ?? []).includes('cs-cf-web-ground'))
ok('Z7 concepts: 5 to 8 phrases', (L37.concepts ?? []).length >= 5 && L37.concepts.length <= 8)
const objectives37 = L37.objectives ?? []
ok(
  'Z8 objectives: 5 to 6, each opening the house way',
  objectives37.length >= 5 && objectives37.length <= 6 && objectives37.every((o) => o.startsWith('By the end of this lesson')),
)
ok('Z9 word count at least 7000', countLessonWords(L37) >= 7000, String(countLessonWords(L37)))
ok('Z10 exactly one quiz block with 5 items', quizBlocks.length === 1 && !!quizBlocks[0] && quizBlocks[0].items.length === 5)
ok('Z11 the quiz key is [3, 2, 1, 0, 3]', !!quizBlocks[0] && eq(quizBlocks[0].items.map((i) => i.answer), KEY))
ok(
  'Z12 every quiz item has 4 options and a full explanation',
  !!quizBlocks[0] && quizBlocks[0].items.every((i) => i.options.length === 4 && i.explain.length >= 120),
)
ok('Z13 at least 3 body figures', bodyFigs.length >= 3)
ok('Z14 at least 4 solution figures inside exercises', solFigs >= 4)
ok('Z15 exactly 15 exercise questions', exQ === 15)
ok('Z16 levels use at least L1, L2 and L3', ['L1', 'L2', 'L3'].every((l) => exLevels.has(l)))
ok('Z17 8 to 12 Illustrations', examples.length >= 8 && examples.length <= 12)
ok('Z18 an exam callout is present', callouts.some((b) => b.kind === 'callout' && b.tone === 'exam'))
ok('Z19 at least one derivation', derivations.length >= 1)
ok('Z20 at least two algorithm blocks', algos.length >= 2)
ok('Z21 at least three formula cards', formulaCards.length >= 3)
ok('Z22 at least three tables', tables.length >= 3)
ok(
  'Z23 terms feed the glossary (>= 8 pairs)',
  blocks.filter((b) => b.kind === 'terms').reduce((a, b) => a + (b.kind === 'terms' ? b.items.length : 0), 0) >= 8,
)
ok('Z24 at least 10 headings', headings.length >= 10)
ok('Z25 at least 30 paragraphs', paras.length >= 30)
ok('Z26 every SVG carries viewBox, role=img and an aria-label', svgAll.length >= 12 && svgAll.every((f) => f.svg.includes('viewBox="0 0 ') && f.svg.includes('role="img"') && f.svg.includes('aria-label="')))
ok('Z27 no dollar sign ever appears inside an SVG', svgAll.every((f) => !f.svg.includes('$')))
ok('Z28 no unicode minus inside an SVG', svgAll.every((f) => !f.svg.includes('\u2212')))
ok(
  'Z29 every SVG text is at least 9px',
  svgAll.every((f) => {
    const sizes = [...f.svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]))
    return sizes.length > 0 && sizes.every((s) => s >= 9)
  }),
)
ok('Z30 every figure caption teaches (>= 8 words)', captions.length >= 12 && captions.every((c) => c.trim().split(/\s+/).length >= 8))
ok(
  'Z31 no step line carries an Answer prefix or step numbers',
  stepLines.every((s) => !/^\s*(Answer|Sol\.|Step\s*\d|Hence:)/i.test(s)),
)
ok('Z32 no exercise answer carries an Answer prefix', answerLines.length >= 15 && answerLines.every((a) => !/^\s*Answer/i.test(a)))
ok('Z33 no qquad anywhere in the lesson', !json.includes('qquad'))
ok('Z34 every Illustration runs at least 3 worked lines', examples.every((e) => e.steps.length >= 3))
ok('Z35 a roman-marker list is present (the For-example run and the take-away)', romanLists.length >= 2)
ok('Z36 the pinned mirror phrase ships in prose', json.includes('the mirror of the ladder you may already have met'))
ok("Z37 the doorstep books are named in prose", json.includes('Arithmetic and Number Systems') && json.includes('Digital Logic Design'))
ok(
  'Z38 the pinned witnesses all appear in the shipped text',
  ['11111101010', '101101', '11001011', '110110', 'F52', '3,922', '197', '255', '0.375', '5.75', 'popcount'].every((s) => json.includes(s)),
)
ok('Z39 body figure 1 pins the 2026 grid', !!bodyFigs[0] && bodyFigs[0].svg.includes('1024') && bodyFigs[0].svg.includes('2026'))
ok('Z40 body figure 2 pins the doubling ladder 54', !!bodyFigs[1] && bodyFigs[1].svg.includes('54'))
ok('Z41 body figure 3 pins the grouped read 3922', !!bodyFigs[2] && bodyFigs[2].svg.includes('3922'))
ok('Z42 the mirror figure meets at 45', bodyFigs.some((f) => f.svg.includes('45')))
ok('Z43 the point-split figure pins 5.75', bodyFigs.some((f) => f.svg.includes('5.75')))
ok(
  'Z44 solution figures pin their answers (85, 54, 26, 218, 0.625, 2026, 45)',
  ['85', '54', '26', '218', '0.625', '2026', '45'].every((s) => svgAll.some((f) => f.svg.includes(s))),
)
ok(
  'Z45 example and exercise steps stay in short worked lines (no line over 320 characters)',
  stepLines.every((s) => s.length <= 320),
)

/* ------------------------------------------------------------------ */
/* Z46-Z53: the continuation pass — the shipped quiz and exercise law   */
/* ------------------------------------------------------------------ */
const quizItems = quizBlocks[0] ? quizBlocks[0].items : []
ok(
  'Z46 the shipped quiz options match the pinned distractor arrays exactly',
  JSON.stringify(quizItems.map((i) => i.options)) ===
    JSON.stringify([
      ['43', '44', '46', '45'],
      ['12', '6', '13', '27'],
      ['F42', 'F52', 'E52', '1F5'],
      ['0.375', '0.11', '0.3', '0.625'],
      ['7', '9', '6', '8'],
    ]),
)
ok(
  'Z47 each shipped quiz answer marks the correct value in its options',
  quizItems.length === 5 &&
    quizItems[0]!.options[quizItems[0]!.answer] === '45' &&
    quizItems[1]!.options[quizItems[1]!.answer] === '13' &&
    quizItems[2]!.options[quizItems[2]!.answer] === 'F52' &&
    quizItems[3]!.options[quizItems[3]!.answer] === '0.375' &&
    quizItems[4]!.options[quizItems[4]!.answer] === '8',
)
ok('Z48 the hard gate floor: at least 6000 counted words', countLessonWords(L37) >= 6000, String(countLessonWords(L37)))
let figCapOk = true
for (const b of blocks)
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) if ((q.figures ?? []).length > 2) figCapOk = false
ok('Z49 no exercise question carries more than two solution figures (v9.0 directive)', figCapOk)
ok('Z50 every exercise question ends in an answer line', exQ === answerLines.length && exQ === 15)
ok(
  'Z51 the exercise levels stay on the ladder and reach L4',
  [...exLevels].every((l) => ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].includes(l)) && exLevels.has('L4'),
)
ok('Z52 body figure four pins the point split at 5.75', !!bodyFigs[3] && bodyFigs[3].svg.includes('5.75'))
ok('Z53 body figure five is the mirror meeting at 45', !!bodyFigs[4] && bodyFigs[4].svg.includes('45'))

console.log(`V-CF37: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
