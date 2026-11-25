/**
 * V-CF36 — the verify-first engine for lesson 3.6 'Decimal to Binary
 * Conversion' (the cf36 seat, CS RUN 5, 2026-11-25).
 *
 * Every number the lesson will print is brute-forced HERE before any
 * prose is written: every division-ladder row for bases 2/8/16, every
 * bottom-up read, the powers-method subtraction trails, the n-bit
 * limits and roll-overs, every fraction ladder, the 0.1 repetition,
 * the exercise-generated values and the quiz distractors. The engine
 * wins over any other source: where a draft disagrees with a value
 * pinned here, the value pinned here ships.
 *
 * Phase 1 (pre-prose, GREEN before any paragraph was written): sections
 * A-G, the arithmetic checks only.
 * Phase 2 (LANDED, after part-cf36.ts shipped): section H, a block of
 * re-read checks on the shipped part (word floor, quiz key, exercise
 * census, figure counts, id/number/title/prereqs, SVG hygiene) — the
 * imports for that block sit at the top of the file per ESM order.
 */

import { lesson36 } from './part-cf36'
import { countLessonWords } from '../../../src/data/library/types'

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ------------------------------------------------------------------ */
/* the machines under test (written independently of the prose)        */
/* ------------------------------------------------------------------ */

const DIG = '0123456789ABCDEF'

interface Row { n: number; q: number; r: number }

/** the repeated-division ladder: rows are produced top-down */
function ladderRows(n: number, base: number): Row[] {
  const rows: Row[] = []
  let x = n
  while (x > 0) {
    const q = Math.floor(x / base)
    rows.push({ n: x, q, r: x % base })
    x = q
  }
  return rows
}

/** the answer: remainders read BOTTOM-UP, each as one digit of the base */
function readBottomUp(rows: Row[]): string {
  return rows.map((w) => DIG[w.r]).reverse().join('')
}

function val(s: string, base: number): number { return parseInt(s, base) }

/** bit length: how many bits a whole number needs */
function bitLen(n: number): number { return n.toString(2).length }

/** smallest b with 2^b - 1 >= n: bits needed to store every value 0..n */
function bitsFor(n: number): number {
  let b = 1
  while (2 ** b - 1 < n) b++
  return b
}

/** greedy powers-of-2 subtraction trail (the positional method) */
function powersTrail(n: number): { sub: { p: number; rest: number }[]; bits: string } {
  const sub: { p: number; rest: number }[] = []
  let rest = n
  let p = 1
  while (p * 2 <= n) p *= 2 // largest power of 2 <= n
  const top = p
  const marks: number[] = []
  for (let pw = top; pw >= 1; pw = Math.floor(pw / 2)) {
    if (rest >= pw) { sub.push({ p: pw, rest: rest - pw }); rest -= pw; marks.push(1) } else { marks.push(0) }
  }
  return { sub, bits: marks.join('') }
}

/** exact fraction ladder on num/den (0 <= num < den): bits + cycle start.
 *  For a repeating fraction the ladder keeps doubling to maxBits so the
 *  full expansion is available; cycleStart is the bit index where the
 *  repeating block begins (-1 when the expansion terminates). */
function fracLadder(num: number, den: number, maxBits: number): { bits: string; cycleStart: number; states: number[] } {
  const seen = new Map<number, number>()
  const bits: string[] = []
  const states: number[] = []
  let x = num
  let cycleStart = -1
  let pos = 0
  while (x > 0 && pos < maxBits) {
    if (seen.has(x)) {
      if (cycleStart === -1) cycleStart = seen.get(x) as number
    } else {
      seen.set(x, pos)
    }
    if (cycleStart === -1) states.push(x)
    const t = x * 2
    if (t >= den) { bits.push('1'); x = t - den } else { bits.push('0'); x = t }
    pos++
  }
  return { bits: bits.join(''), cycleStart, states }
}

/** value of a fractional bit string, exactly (dyadic) */
function fracVal(bits: string): number { return parseInt(bits, 2) / 2 ** bits.length }

function eq(a: number, b: number): boolean { return Math.abs(a - b) < 1e-12 }

/* ------------------------------------------------------------------ */
/* A. the pinned base-2 ladders                                        */
/* ------------------------------------------------------------------ */

console.log('== A. base-2 division ladders (the pinned six + 2026) ==')

const rows45 = ladderRows(45, 2)
ok('A1  45 ladder rows pinned 45/2=22 r1, 22/2=11 r0, 11/2=5 r1, 5/2=2 r1, 2/2=1 r0, 1/2=0 r1',
  JSON.stringify(rows45) === JSON.stringify([{ n: 45, q: 22, r: 1 }, { n: 22, q: 11, r: 0 }, { n: 11, q: 5, r: 1 }, { n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]),
  JSON.stringify(rows45))
ok('A2  45 remainders read bottom-up = 101101', readBottomUp(rows45) === '101101', readBottomUp(rows45))
ok('A3  101101 in base 2 = 45', val('101101', 2) === 45)
ok('A4  weights check 32+8+4+1 = 45', 32 + 8 + 4 + 1 === 45)
ok('A5  45 is a binary palindrome: remainders top-down = bottom-up',
  JSON.stringify(rows45.map((w) => w.r)) === JSON.stringify([1, 0, 1, 1, 0, 1]) &&
  rows45.map((w) => w.r).reverse().join('') === rows45.map((w) => w.r).join(''))

const rows77 = ladderRows(77, 2)
ok('A6  77 ladder rows pinned (77,38,1)(38,19,0)(19,9,1)(9,4,1)(4,2,0)(2,1,0)(1,0,1)',
  JSON.stringify(rows77) === JSON.stringify([{ n: 77, q: 38, r: 1 }, { n: 38, q: 19, r: 0 }, { n: 19, q: 9, r: 1 }, { n: 9, q: 4, r: 1 }, { n: 4, q: 2, r: 0 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]),
  JSON.stringify(rows77))
ok('A7  77 remainders bottom-up = 1001101', readBottomUp(rows77) === '1001101', readBottomUp(rows77))
ok('A8  1001101 in base 2 = 77', val('1001101', 2) === 77)

const rows100 = ladderRows(100, 2)
ok('A9  100 ladder rows pinned (100,50,0)(50,25,0)(25,12,1)(12,6,0)(6,3,0)(3,1,1)(1,0,1)',
  JSON.stringify(rows100) === JSON.stringify([{ n: 100, q: 50, r: 0 }, { n: 50, q: 25, r: 0 }, { n: 25, q: 12, r: 1 }, { n: 12, q: 6, r: 0 }, { n: 6, q: 3, r: 0 }, { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]),
  JSON.stringify(rows100))
ok('A10 100 remainders produced top-down = [0,0,1,0,0,1,1]',
  JSON.stringify(rows100.map((w) => w.r)) === JSON.stringify([0, 0, 1, 0, 0, 1, 1]))
ok('A11 100 remainders bottom-up = [1,1,0,0,1,0,0]',
  JSON.stringify(rows100.map((w) => w.r).reverse()) === JSON.stringify([1, 1, 0, 0, 1, 0, 0]))
ok('A12 100 in base 2 = 1100100', readBottomUp(rows100) === '1100100', readBottomUp(rows100))
ok('A13 1100100 in base 2 = 100', val('1100100', 2) === 100)
ok('A14 the direction trap: reading 100 top-down gives 0010011 = 19, not 100',
  rows100.map((w) => w.r).join('') === '0010011' && val('0010011', 2) === 19 && val('0010011', 2) !== 100)

const rows156 = ladderRows(156, 2)
ok('A15 156 ladder rows pinned (156,78,0)(78,39,0)(39,19,1)(19,9,1)(9,4,1)(4,2,0)(2,1,0)(1,0,1)',
  JSON.stringify(rows156) === JSON.stringify([{ n: 156, q: 78, r: 0 }, { n: 78, q: 39, r: 0 }, { n: 39, q: 19, r: 1 }, { n: 19, q: 9, r: 1 }, { n: 9, q: 4, r: 1 }, { n: 4, q: 2, r: 0 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]),
  JSON.stringify(rows156))
ok('A16 156 in base 2 = 10011100', readBottomUp(rows156) === '10011100', readBottomUp(rows156))
ok('A17 10011100 = 156 = 128+16+8+4', val('10011100', 2) === 156 && 128 + 16 + 8 + 4 === 156)

const rows255 = ladderRows(255, 2)
ok('A18 255 ladder: 8 rows, every remainder 1, quotient chain 127,63,31,15,7,3,1,0',
  rows255.length === 8 && rows255.every((w) => w.r === 1) &&
  JSON.stringify(rows255.map((w) => w.q)) === JSON.stringify([127, 63, 31, 15, 7, 3, 1, 0]))
ok('A19 255 in base 2 = 11111111 (eight 1s)', readBottomUp(rows255) === '11111111' && '11111111'.length === 8)
ok('A20 11111111 in base 2 = 255', val('11111111', 2) === 255)

const rows256 = ladderRows(256, 2)
ok('A21 256 ladder: 9 rows, remainders top-down = eight 0s then 1',
  rows256.length === 9 && JSON.stringify(rows256.map((w) => w.r)) === JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 1]))
ok('A22 256 in base 2 = 100000000 (nine digits)', readBottomUp(rows256) === '100000000' && readBottomUp(rows256).length === 9)
ok('A23 100000000 in base 2 = 256', val('100000000', 2) === 256)

const rows2026 = ladderRows(2026, 2)
ok('A24 2026 ladder rows pinned: 11 rows (2026,1013,0)(1013,506,1)(506,253,0)(253,126,1)(126,63,0)(63,31,1)(31,15,1)(15,7,1)(7,3,1)(3,1,1)(1,0,1)',
  JSON.stringify(rows2026) === JSON.stringify([{ n: 2026, q: 1013, r: 0 }, { n: 1013, q: 506, r: 1 }, { n: 506, q: 253, r: 0 }, { n: 253, q: 126, r: 1 }, { n: 126, q: 63, r: 0 }, { n: 63, q: 31, r: 1 }, { n: 31, q: 15, r: 1 }, { n: 15, q: 7, r: 1 }, { n: 7, q: 3, r: 1 }, { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]),
  JSON.stringify(rows2026))
ok('A25 2026 in base 2 = 11111101010', readBottomUp(rows2026) === '11111101010', readBottomUp(rows2026))
ok('A26 11111101010 in base 2 = 2026', val('11111101010', 2) === 2026)
ok('A27 2026 = 1024+512+256+128+64+32+8+2', 1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 === 2026)
ok('A28 11111101010 carries 8 ones', ('11111101010'.match(/1/g) ?? []).length === 8)
ok('A29 bit lengths: 45-6, 77-7, 100-7, 156-8, 255-8, 256-9, 2026-11',
  bitLen(45) === 6 && bitLen(77) === 7 && bitLen(100) === 7 && bitLen(156) === 8 && bitLen(255) === 8 && bitLen(256) === 9 && bitLen(2026) === 11)
ok('A30 base-2 ladder row count = bit length (45:6, 100:7, 2026:11)',
  rows45.length === 6 && rows100.length === 7 && rows2026.length === 11)

/* ------------------------------------------------------------------ */
/* B. the base-8 and base-16 ladders                                   */
/* ------------------------------------------------------------------ */

console.log('== B. base-8 and base-16 ladders ==')

const rows45b8 = ladderRows(45, 8)
ok('B1  45 base-8 rows pinned (45,5,5)(5,0,5)',
  JSON.stringify(rows45b8) === JSON.stringify([{ n: 45, q: 5, r: 5 }, { n: 5, q: 0, r: 5 }]))
ok('B2  45 in base 8 = 55', readBottomUp(rows45b8) === '55', readBottomUp(rows45b8))
ok('B3  55 in base 8 = 45 = 5x8+5', val('55', 8) === 45 && 5 * 8 + 5 === 45)

const rows100b8 = ladderRows(100, 8)
ok('B4  100 base-8 rows pinned (100,12,4)(12,1,4)(1,0,1)',
  JSON.stringify(rows100b8) === JSON.stringify([{ n: 100, q: 12, r: 4 }, { n: 12, q: 1, r: 4 }, { n: 1, q: 0, r: 1 }]))
ok('B5  100 in base 8 = 144', readBottomUp(rows100b8) === '144', readBottomUp(rows100b8))
ok('B6  144 in base 8 = 100', val('144', 8) === 100)

const rows2026b8 = ladderRows(2026, 8)
ok('B7  2026 base-8 rows pinned (2026,253,2)(253,31,5)(31,3,7)(3,0,3)',
  JSON.stringify(rows2026b8) === JSON.stringify([{ n: 2026, q: 253, r: 2 }, { n: 253, q: 31, r: 5 }, { n: 31, q: 3, r: 7 }, { n: 3, q: 0, r: 3 }]))
ok('B8  2026 in base 8 = 3752', readBottomUp(rows2026b8) === '3752', readBottomUp(rows2026b8))
ok('B9  3752 in base 8 = 2026 = 3x512+7x64+5x8+2', val('3752', 8) === 2026 && 3 * 512 + 7 * 64 + 5 * 8 + 2 === 2026)

const rows45b16 = ladderRows(45, 16)
ok('B10 45 base-16 rows pinned (45,2,13)(2,0,2)',
  JSON.stringify(rows45b16) === JSON.stringify([{ n: 45, q: 2, r: 13 }, { n: 2, q: 0, r: 2 }]))
ok('B11 45 in base 16 = 2D (remainder 13 writes as D)', readBottomUp(rows45b16) === '2D', readBottomUp(rows45b16))
ok('B12 2D in base 16 = 45 = 2x16+13', val('2D', 16) === 45 && 2 * 16 + 13 === 45)

const rows100b16 = ladderRows(100, 16)
ok('B13 100 base-16 rows pinned (100,6,4)(6,0,6)',
  JSON.stringify(rows100b16) === JSON.stringify([{ n: 100, q: 6, r: 4 }, { n: 6, q: 0, r: 6 }]))
ok('B14 100 in base 16 = 64', readBottomUp(rows100b16) === '64', readBottomUp(rows100b16))
ok('B15 64 in base 16 = 100 = 6x16+4', val('64', 16) === 100 && 6 * 16 + 4 === 100)

const rows2026b16 = ladderRows(2026, 16)
ok('B16 2026 base-16 rows pinned (2026,126,10)(126,7,14)(7,0,7)',
  JSON.stringify(rows2026b16) === JSON.stringify([{ n: 2026, q: 126, r: 10 }, { n: 126, q: 7, r: 14 }, { n: 7, q: 0, r: 7 }]))
ok('B17 2026 in base 16 = 7EA (10=A, 14=E)', readBottomUp(rows2026b16) === '7EA', readBottomUp(rows2026b16))
ok('B18 7EA in base 16 = 2026 = 7x256+14x16+10 = 1792+224+10',
  val('7EA', 16) === 2026 && 7 * 256 + 14 * 16 + 10 === 2026 && 1792 + 224 + 10 === 2026)

ok('B19 witness row: 77 = 115 base 8 = 4D base 16', val('115', 8) === 77 && val('4D', 16) === 77 && readBottomUp(ladderRows(77, 8)) === '115' && readBottomUp(ladderRows(77, 16)) === '4D')
ok('B20 witness row: 156 = 234 base 8 = 9C base 16', val('234', 8) === 156 && val('9C', 16) === 156 && readBottomUp(ladderRows(156, 8)) === '234' && readBottomUp(ladderRows(156, 16)) === '9C')
ok('B21 witness row: 255 = 377 base 8 = FF base 16', val('377', 8) === 255 && val('FF', 16) === 255 && readBottomUp(ladderRows(255, 8)) === '377' && readBottomUp(ladderRows(255, 16)) === 'FF')
ok('B22 witness row: 256 = 400 base 8 = 100 base 16', val('400', 8) === 256 && val('100', 16) === 256 && readBottomUp(ladderRows(256, 8)) === '400' && readBottomUp(ladderRows(256, 16)) === '100')

/* ------------------------------------------------------------------ */
/* C. the positional (powers) method                                   */
/* ------------------------------------------------------------------ */

console.log('== C. the positional (powers) method ==')

const pt100 = powersTrail(100)
ok('C1  100 powers trail: 100-64=36, 36-32=4, 4-4=0',
  JSON.stringify(pt100.sub) === JSON.stringify([{ p: 64, rest: 36 }, { p: 32, rest: 4 }, { p: 4, rest: 0 }]),
  JSON.stringify(pt100.sub))
ok('C2  powers used 64+32+4 = 100', 64 + 32 + 4 === 100)
ok('C3  marks at places 64,32,4 give 1100100 - the same answer as the ladder',
  pt100.bits === '1100100' && pt100.bits === readBottomUp(rows100))
ok('C4  largest fitting powers: 64 for 100, 32 for 45, 1024 for 2026',
  Math.floor(Math.log2(100)) === 6 && 2 ** 6 === 64 && 2 ** 5 === 32 && 2 ** 10 === 1024 && 2 ** 11 > 2026 && 2 ** 10 <= 2026)
const pt13 = powersTrail(13)
ok('C5  13 powers trail: 13-8=5, 5-4=1, 1-1=0 -> 1101',
  JSON.stringify(pt13.sub) === JSON.stringify([{ p: 8, rest: 5 }, { p: 4, rest: 1 }, { p: 1, rest: 0 }]) &&
  pt13.bits === '1101' && val('1101', 2) === 13)
const pt999 = powersTrail(999)
ok('C6  999 powers trail: 999-512=487, 487-256=231, 231-128=103, 103-64=39, 39-32=7, 7-4=3, 3-2=1, 1-1=0 -> 1111100111',
  JSON.stringify(pt999.sub) === JSON.stringify([{ p: 512, rest: 487 }, { p: 256, rest: 231 }, { p: 128, rest: 103 }, { p: 64, rest: 39 }, { p: 32, rest: 7 }, { p: 4, rest: 3 }, { p: 2, rest: 1 }, { p: 1, rest: 0 }]),
  JSON.stringify(pt999.sub))
ok('C7  999 marks read left to right = 1111100111 = 999', pt999.bits === '1111100111' && val('1111100111', 2) === 999 && 512 + 256 + 128 + 64 + 32 + 4 + 2 + 1 === 999)

/* ------------------------------------------------------------------ */
/* D. the limits - largest n-bit values                                */
/* ------------------------------------------------------------------ */

console.log('== D. the limits - largest n-bit values ==')

ok('D1  2^8 - 1 = 255 and 2^16 - 1 = 65,535', 2 ** 8 - 1 === 255 && 2 ** 16 - 1 === 65535)
ok('D2  256 needs 9 bits; 65,536 needs 17 bits', bitLen(256) === 9 && bitLen(65536) === 17)
ok('D3  the odometer roll-over: 11111111 + 1 = 100000000',
  val('11111111', 2) + 1 === val('100000000', 2) && 255 + 1 === 256)
ok('D4  largest 12-bit value = 4095 = twelve 1s; 4096 needs 13 bits',
  2 ** 12 - 1 === 4095 && val('111111111111', 2) === 4095 && '111111111111'.length === 12 && bitLen(4096) === 13)
ok('D5  bits to store every value 0..999 = 10; 0..1000 = 10; 0..256 = 9',
  bitsFor(999) === 10 && bitsFor(1000) === 10 && bitsFor(256) === 9 && 2 ** 10 - 1 === 1023)
ok('D6  bit lengths for the table: 23-5, 200-8, 513-10, 180-8, 39-6, 72-7',
  bitLen(23) === 5 && bitLen(200) === 8 && bitLen(513) === 10 && bitLen(180) === 8 && bitLen(39) === 6 && bitLen(72) === 7)

/* ------------------------------------------------------------------ */
/* E. the fraction ladders                                             */
/* ------------------------------------------------------------------ */

console.log('== E. the fraction ladders ==')

const f375 = fracLadder(3, 8, 24)
ok('E1  0.375 = 3/8: the x2 ladder terminates with bits 011',
  f375.cycleStart === -1 && f375.bits === '011', JSON.stringify(f375))
ok('E2  0.011 in base 2 = 0.25 + 0.125 = 0.375', eq(fracVal('011'), 0.375) && eq(0.25 + 0.125, 0.375))
ok('E3  0.375 ladder rows: 0.375x2=0.75 (int 0), 0.75x2=1.5 (int 1, keep 0.5), 0.5x2=1.0 (int 1, keep 0)',
  JSON.stringify(f375.states.map((s) => (s * 2) / 8)) === JSON.stringify([0.75, 1.5, 1.0]))
const f625 = fracLadder(5, 8, 24)
ok('E4  0.625 = 5/8 -> 0.101 = 0.5 + 0.125',
  f625.cycleStart === -1 && f625.bits === '101' && eq(fracVal('101'), 0.625) && eq(0.5 + 0.125, 0.625))
const f8125 = fracLadder(13, 16, 24)
ok('E5  0.8125 = 13/16 -> 0.1101 = 0.5 + 0.25 + 0.0625',
  f8125.cycleStart === -1 && f8125.bits === '1101' && eq(fracVal('1101'), 0.8125) && eq(0.5 + 0.25 + 0.0625, 0.8125))
const f4375 = fracLadder(7, 16, 24)
ok('E6  0.4375 = 7/16 -> 0.0111 = 0.25 + 0.125 + 0.0625',
  f4375.cycleStart === -1 && f4375.bits === '0111' && eq(fracVal('0111'), 0.4375) && eq(0.25 + 0.125 + 0.0625, 0.4375))
const f59375 = fracLadder(19, 32, 24)
ok('E7  0.59375 = 19/32 -> 0.10011 = 0.5 + 0.0625 + 0.03125',
  f59375.cycleStart === -1 && f59375.bits === '10011' && eq(fracVal('10011'), 0.59375) && eq(0.5 + 0.0625 + 0.03125, 0.59375))
const f6875 = fracLadder(11, 16, 24)
ok('E8  0.6875 = 11/16 -> 0.1011 = 0.5 + 0.125 + 0.0625',
  f6875.cycleStart === -1 && f6875.bits === '1011' && eq(fracVal('1011'), 0.6875) && eq(0.5 + 0.125 + 0.0625, 0.6875))

const f01 = fracLadder(1, 10, 21)
ok('E9  0.1 = 1/10 NEVER terminates: the state 2/10 (0.2) returns, cycle starts at bit index 1',
  f01.cycleStart === 1 && f01.states.includes(2) && f01.states.length === 5, JSON.stringify({ states: f01.states, cycleStart: f01.cycleStart }))
ok('E10 first 12 fractional bits of 0.1 = 000110011001', f01.bits.slice(0, 12) === '000110011001', f01.bits)
ok('E11 the repeating block from the cycle is 0011: 0.1 = 0.0(0011)(0011)(0011)... for 21 bits',
  f01.bits.slice(1, 5) === '0011' && f01.bits === '0' + '0011'.repeat(5), f01.bits)
ok('E12 the fraction-part trail of 0.1: 0.1 -> 0.2 -> 0.4 -> 0.8 -> 0.6 -> back to 0.2',
  JSON.stringify(f01.states.map((s) => s / 10)) === JSON.stringify([0.1, 0.2, 0.4, 0.8, 0.6]) &&
  (f01.states[4] * 2) % 10 === 2)
ok('E13 terminating law: 8, 16, 32 are powers of 2 (so 3/8, 13/16, 19/32 terminate); 10 = 2x5 is not (so 1/10 repeats)',
  [8, 16, 32].every((d) => (d & (d - 1)) === 0) && (10 & 9) !== 0 && 10 === 2 * 5)
ok('E14 quiz distractor: 0.0001 in base 2 = 1/16 = 0.0625, not 0.1',
  eq(fracVal('0001'), 0.0625) && eq(1 / 16, 0.0625) && !eq(fracVal('0001'), 0.1))
ok('E15 the floating-point doorstep: 0.1 + 0.2 !== 0.3 in double arithmetic (prints 0.30000000000000004), though one tenth + two tenths = three tenths exactly in decimal (integers 1 + 2 = 3)',
  0.1 + 0.2 !== 0.3 && String(0.1 + 0.2) === '0.30000000000000004' && 1 + 2 === 3 && (1 + 2) / 10 === 3 / 10)

/* ------------------------------------------------------------------ */
/* F. the exercise-generated ladders                                   */
/* ------------------------------------------------------------------ */

console.log('== F. exercise-generated values ==')

ok('F1  23 ladder rows pinned (23,11,1)(11,5,1)(5,2,1)(2,1,0)(1,0,1) -> 10111 = 16+4+2+1',
  readBottomUp(ladderRows(23, 2)) === '10111' &&
  JSON.stringify(ladderRows(23, 2)) === JSON.stringify([{ n: 23, q: 11, r: 1 }, { n: 11, q: 5, r: 1 }, { n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]) &&
  val('10111', 2) === 23 && 16 + 4 + 2 + 1 === 23)
ok('F2  14 ladder rows pinned (14,7,0)(7,3,1)(3,1,1)(1,0,1) -> 1110 = 8+4+2',
  readBottomUp(ladderRows(14, 2)) === '1110' && val('1110', 2) === 14 && 8 + 4 + 2 === 14)
ok('F3  200 ladder rows pinned (200,100,0)(100,50,0)(50,25,0)(25,12,1)(12,6,0)(6,3,0)(3,1,1)(1,0,1) -> 11001000 = 128+64+8',
  readBottomUp(ladderRows(200, 2)) === '11001000' &&
  JSON.stringify(ladderRows(200, 2)) === JSON.stringify([{ n: 200, q: 100, r: 0 }, { n: 100, q: 50, r: 0 }, { n: 50, q: 25, r: 0 }, { n: 25, q: 12, r: 1 }, { n: 12, q: 6, r: 0 }, { n: 6, q: 3, r: 0 }, { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]) &&
  val('11001000', 2) === 200 && 128 + 64 + 8 === 200)
ok('F4  999 ladder -> 1111100111 = 999 (10 rows)',
  readBottomUp(ladderRows(999, 2)) === '1111100111' && ladderRows(999, 2).length === 10 && val('1111100111', 2) === 999)
ok('F5  1000 ladder rows pinned (1000,500,0)(500,250,0)(250,125,0)(125,62,1)(62,31,0)(31,15,1)(15,7,1)(7,3,1)(3,1,1)(1,0,1) -> 1111101000 = 512+256+128+64+32+8',
  readBottomUp(ladderRows(1000, 2)) === '1111101000' &&
  JSON.stringify(ladderRows(1000, 2)) === JSON.stringify([{ n: 1000, q: 500, r: 0 }, { n: 500, q: 250, r: 0 }, { n: 250, q: 125, r: 0 }, { n: 125, q: 62, r: 1 }, { n: 62, q: 31, r: 0 }, { n: 31, q: 15, r: 1 }, { n: 15, q: 7, r: 1 }, { n: 7, q: 3, r: 1 }, { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]) &&
  val('1111101000', 2) === 1000 && 512 + 256 + 128 + 64 + 32 + 8 === 1000)
ok('F6  39 ladder -> 100111 = 32+4+2+1',
  readBottomUp(ladderRows(39, 2)) === '100111' && val('100111', 2) === 39 && 32 + 4 + 2 + 1 === 39)
ok('F7  72 ladder -> 1001000 = 64+8',
  readBottomUp(ladderRows(72, 2)) === '1001000' && val('1001000', 2) === 72 && 64 + 8 === 72)
ok('F8  180 ladder rows pinned (180,90,0)(90,45,0)(45,22,1)(22,11,0)(11,5,1)(5,2,1)(2,1,0)(1,0,1) -> 10110100 = 128+32+16+4',
  readBottomUp(ladderRows(180, 2)) === '10110100' &&
  JSON.stringify(ladderRows(180, 2)) === JSON.stringify([{ n: 180, q: 90, r: 0 }, { n: 90, q: 45, r: 0 }, { n: 45, q: 22, r: 1 }, { n: 22, q: 11, r: 0 }, { n: 11, q: 5, r: 1 }, { n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]) &&
  val('10110100', 2) === 180 && 128 + 32 + 16 + 4 === 180)
ok('F9  513 ladder -> 1000000001 = 512+1 (ten bits: a 1, eight 0s, a 1)',
  readBottomUp(ladderRows(513, 2)) === '1000000001' && '1000000001'.length === 10 && val('1000000001', 2) === 513 && 512 + 1 === 513)
ok('F10 3.625 -> 11.101: whole 3 -> 11, fraction 0.625 -> 101, and 2+1+0.5+0.125 = 3.625',
  readBottomUp(ladderRows(3, 2)) === '11' && f625.bits === '101' && eq(2 + 1 + 0.5 + 0.125, 3.625))

/* ------------------------------------------------------------------ */
/* G. quiz distractor arithmetic + the tiny warm-up ladder             */
/* ------------------------------------------------------------------ */

console.log('== G. quiz distractors and warm-ups ==')

ok('G1  quiz Q2 distractors: 101011 = 43, 110101 = 53, 011011 = 27',
  val('101011', 2) === 43 && val('110101', 2) === 53 && val('011011', 2) === 27)
ok('G2  quiz Q4 distractors: 0.111 = 0.875, 0.101 = 0.625, 0.110 = 0.75',
  eq(fracVal('111'), 0.875) && eq(fracVal('101'), 0.625) && eq(fracVal('110'), 0.75))
ok('G3  quiz Q3 distractors: 2^7 = 128, 2^8 = 256, 2^6 = 64',
  2 ** 7 === 128 && 2 ** 8 === 256 && 2 ** 6 === 64)
ok('G4  the warm-up: 5 -> rows (5,2,1)(2,1,0)(1,0,1) -> 101 = 4+1',
  readBottomUp(ladderRows(5, 2)) === '101' &&
  JSON.stringify(ladderRows(5, 2)) === JSON.stringify([{ n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 }]) &&
  val('101', 2) === 5 && 4 + 1 === 5)
ok('G5  the minutes ladder in the wild: 135 minutes = 2 h 15 min (135 = 2x60 + 15)',
  Math.floor(135 / 60) === 2 && 135 % 60 === 15)
ok('G6  chapter thread: 45 in all four dresses 101101 / 55 / 45 / 2D (3.2 census returns)',
  readBottomUp(ladderRows(45, 2)) === '101101' && readBottomUp(ladderRows(45, 8)) === '55' && readBottomUp(ladderRows(45, 16)) === '2D')

/* ------------------------------------------------------------------ */
/* H. phase 2 - the re-read of the SHIPPED part-cf36                    */
/* ------------------------------------------------------------------ */

console.log('== H. re-read of the shipped part-cf36 ==')

ok('H1  id pinned', lesson36.id === 'cf-decimal-to-binary-conversion', lesson36.id)
ok('H2  number pinned', lesson36.number === '3.6', lesson36.number)
ok('H3  title pinned verbatim', lesson36.title === 'Decimal to Binary Conversion', lesson36.title)
ok('H4  prerequisites pinned', JSON.stringify(lesson36.prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']), JSON.stringify(lesson36.prerequisites))
ok('H5  sources pinned', JSON.stringify(lesson36.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(lesson36.sources))

const WC = countLessonWords(lesson36)
ok('H6  word floor >= 6000 (the seat task pin)', WC >= 6000, String(WC))
ok('H7  word count >= 7000 (the content-seat aim)', WC >= 7000, String(WC))

/* one pass over the shipped blocks: the census machine */
let quizItems = 0
let quizOptionsBad = 0
const quizKey: number[] = []
const quizExplains: string[] = []
let exQuestions = 0
const exLevels = new Set<string>()
let exMissingAnswer = 0
let exNonArraySolutions = 0
let minSteps = Infinity
let exNumberedOrAnswerPrefixed = 0
let qsWithFigs = 0
let solFigCount = 0
let bodyFigs = 0
let exampleBlocks = 0
let quizBlocks = 0
let examCallouts = 0
const kindsSeen = new Set<string>()
const svgs: { where: string; svg: string }[] = []

for (const b of lesson36.blocks) {
  kindsSeen.add(b.kind)
  if (b.kind === 'quiz') {
    quizBlocks++
    quizItems += b.items.length
    for (const it of b.items) {
      quizKey.push(it.answer)
      quizExplains.push(it.explain)
      if (it.options.length !== 4) quizOptionsBad++
      if (it.answer < 0 || it.answer >= it.options.length) quizOptionsBad++
    }
  }
  if (b.kind === 'exercises') {
    for (const s of b.sets) {
      exLevels.add(s.level)
      for (const q of s.questions) {
        exQuestions++
        if (!Array.isArray(q.solution)) { exNonArraySolutions++; continue }
        minSteps = Math.min(minSteps, q.solution.length)
        for (const line of q.solution) {
          if (/^\d+[.)]/.test(line) || /^\s*Answer:/i.test(line)) exNumberedOrAnswerPrefixed++
        }
        if (!q.answer) exMissingAnswer++
        if (q.figures && q.figures.length > 0) {
          qsWithFigs++
          if (q.figures.length > 2) exNumberedOrAnswerPrefixed += 100
          solFigCount += q.figures.length
          for (const f of q.figures) svgs.push({ where: 'solution figure', svg: f.svg })
        }
      }
    }
  }
  if (b.kind === 'figure') { bodyFigs++; svgs.push({ where: 'body figure', svg: b.svg }) }
  if (b.kind === 'example') {
    exampleBlocks++
    for (const f of b.figures ?? []) svgs.push({ where: 'example figure', svg: f.svg })
  }
  if (b.kind === 'callout' && b.tone === 'exam') examCallouts++
}

ok('H8  exactly one quiz block of exactly 5 items, each with 4 options and an in-range answer',
  quizBlocks === 1 && quizItems === 5 && quizOptionsBad === 0,
  `blocks=${quizBlocks} items=${quizItems} badOptions=${quizOptionsBad}`)
ok('H9  quiz key exactly [1,0,3,2,2]', JSON.stringify(quizKey) === JSON.stringify([1, 0, 3, 2, 2]), JSON.stringify(quizKey))
ok('H10 every quiz explain argues down ALL three wrong options (>= 3 named options, >= 200 chars)',
  quizExplains.every((e) => (e.match(/Option \(/g) ?? []).length >= 3 && e.length >= 200),
  quizExplains.map((e) => `${(e.match(/Option \(/g) ?? []).length}:${e.length}`).join(' '))

ok('H11 exercises carry exactly 15 questions', exQuestions === 15, String(exQuestions))
ok('H12 exercise levels are exactly L1..L4',
  ['L1', 'L2', 'L3', 'L4'].every((l) => exLevels.has(l)) && exLevels.size === 4,
  [...exLevels].join(','))
ok('H13 every exercise solution is a steps array with >= 4 worked lines',
  exNonArraySolutions === 0 && minSteps >= 4, `nonArray=${exNonArraySolutions} minSteps=${minSteps}`)
ok('H14 no step is numbered and none carries an Answer: prefix; every question ends in an answer field',
  exNumberedOrAnswerPrefixed === 0 && exMissingAnswer === 0,
  `bad=${exNumberedOrAnswerPrefixed} missingAnswer=${exMissingAnswer}`)

ok('H15 body figures >= 3 (the spec floor)', bodyFigs >= 3, String(bodyFigs))
ok('H16 body figures >= 5 (this seat ships 5)', bodyFigs >= 5, String(bodyFigs))
ok('H17 questions carrying solution figures >= 4', qsWithFigs >= 4, String(qsWithFigs))
ok('H18 solution figures total >= 7 (floor 4; this seat ships 7)', solFigCount >= 7, String(solFigCount))

ok('H19 Illustrations (example blocks) within 8..12', exampleBlocks >= 8 && exampleBlocks <= 12, String(exampleBlocks))
ok('H20 an exam callout is present', examCallouts >= 1, String(examCallouts))
ok('H21 the anatomy is complete (para, heading, callout, terms, equation, derivation, example, figure, table, list, algorithm, formula, quiz, exercises)',
  ['para', 'heading', 'callout', 'terms', 'equation', 'derivation', 'example', 'figure', 'table', 'list', 'algorithm', 'formula', 'quiz', 'exercises'].every((k) => kindsSeen.has(k)),
  [...kindsSeen].join(','))
ok('H22 concepts 5..8 and objectives 5..6',
  lesson36.concepts.length >= 5 && lesson36.concepts.length <= 8 && (lesson36.objectives?.length ?? 0) >= 5 && (lesson36.objectives?.length ?? 0) <= 6,
  `concepts=${lesson36.concepts.length} objectives=${lesson36.objectives?.length}`)

/* SVG hygiene across every figure the lesson ships (body + solution + example) */
let svgBad = 0
let minFont = Infinity
for (const { where, svg } of svgs) {
  if (!svg.includes('viewBox="')) svgBad++
  if (!svg.includes('role="img"')) svgBad++
  const aria = svg.match(/aria-label="([^"]*)"/)
  if (!aria || aria[1].length < 80) svgBad++
  if (svg.includes('$')) svgBad++
  for (const m of svg.matchAll(/font-size="([\d.]+)"/g)) {
    const fs = parseFloat(m[1])
    minFont = Math.min(minFont, fs)
    if (fs < 9) svgBad++
  }
}
ok('H23 every shipped SVG carries viewBox + role=img + a real aria-label, no $ in text, all font sizes >= 9px',
  svgBad === 0 && svgs.length >= 12, `bad=${svgBad} figures=${svgs.length} minFont=${minFont}`)

/* the pinned prose must actually be present: spot strings the spec demands */
const allText = lesson36.blocks.map((b) => {
  if (b.kind === 'para' || b.kind === 'heading') return b.text
  if (b.kind === 'callout') return b.title + ' ' + b.text
  return ''
}).join(' ')
ok('H24 the doorsteps paragraph names both doorstep books and both next lessons',
  allText.includes('Arithmetic and Number Systems') && allText.includes('Digital Logic Design') && allText.includes('3.7') && allText.includes('3.8'),
  'doorstep paragraph missing a name')
ok('H25 the honest 0.1 paragraph ships: the repeating block, the doorstep and the famous sum',
  allText.includes('0011') && allText.includes('0.30000000000000004') && allText.includes('floating point'),
  '0.1 paragraph incomplete')

/* ------------------------------------------------------------------ */
/* the report                                                          */
/* ------------------------------------------------------------------ */

console.log('')
console.log(`V-CF36: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
