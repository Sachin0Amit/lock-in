import { chapter3, lesson32, lesson36, lesson37 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-03'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch03.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 3 "Data
 * Representation: a First Meeting" (CS RUN 5, the cs job's fifth
 * honored fire, 2026-11-25, opened the chapter under the whole-chapter
 * cadence). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to
 * ch-03.ts).
 *
 *   (cf32) 3.2 engines + pins    (cf36) 3.6 engines + pins
 *   (cf37) 3.7 engines + pins
 *   (Z)    the in-progress chapter census — the honest 3 + 5 shape
 *
 * Assembled by scripts/assemble_cs5.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps. The deferred seats' engines
 * (v-cf31 unfinished, v-cf33/34/35/38/3R landed green) stay preserved
 * in docs/research/cf-ch03-wip/ for the CS RUN 6 resumption.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-03.ts', import.meta.url).pathname

async function sectionCf32(): Promise<SectionResult> {


/**
 * v-cf32.ts — the seat verifier for CS RUN 5 seat cf32 (lesson 3.2
 * 'The Numbering Systems: Binary, Octal, Hexadecimal', Computer
 * Fundamentals chapter 3 'Data Representation: a First Meeting').
 *
 * VERIFY-FIRST DISCIPLINE (SPEC_CORE): the number checks in sections
 * A-F below were grown and run GREEN (70/70) BEFORE a single prose
 * paragraph of part-cf32.ts was written; section Z (the part re-read)
 * is appended only after the part ships, and the whole engine is then
 * re-run to all-GREEN. Every number this lesson prints — every
 * conversion, census, range, landmark, counting-strip cell and quiz
 * key — is brute-forced here from first principles, with independent
 * implementations (repeated-division toBase, Horner valueOf, a
 * regroup simulator) cross-checked against each other.
 *
 * Study-never-reproduce honored: every witness, figure number and
 * exercise value below is OUR OWN, recomputed here by brute force.
 */

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
/* independent arithmetic — never trust one implementation alone       */
/* ------------------------------------------------------------------ */

const DIG = '0123456789ABCDEF'

/** repeated division — writes n in base b, independently of toString */
function toBase(n: number, b: number): string {
  if (n === 0) return '0'
  let s = ''
  let m = n
  while (m > 0) {
    s = DIG[m % b] + s
    m = Math.floor(m / b)
  }
  return s
}

/** Horner's rule — reads a numeral in base b, independently of parseInt */
function valueOf(numeral: string, b: number): number {
  let v = 0
  for (const ch of numeral) {
    const d = DIG.indexOf(ch.toUpperCase())
    if (d < 0 || d >= b) throw new Error('bad digit ' + ch + ' for base ' + b)
    v = v * b + d
  }
  return v
}

/** the grouping simulator: split a bit string into size-sized groups
 *  (padding leading zeros so the length divides) and translate each
 *  group to its single digit — exactly the move the lesson teaches */
function regroup(bits: string, size: number): string {
  const padded = bits.padStart(Math.ceil(bits.length / size) * size, '0')
  let out = ''
  for (let i = 0; i < padded.length; i += size) {
    out += toBase(valueOf(padded.slice(i, i + size), 2), 16)
  }
  return out
}

/* ================================================================== */
/* A. POSITIONAL NOTATION AND THE WITNESS 45                           */
/* ================================================================== */

// A1 — the decimal witness 4,728 and its place-value anatomy
const digits4728 = toBase(4728, 10).split('').map(Number)
ok('A1 the digits of 4,728 left to right are 4, 7, 2, 8', digits4728.join(',') === '4,7,2,8', `got ${digits4728}`)
ok('A1 4x1000 + 7x100 + 2x10 + 8x1 = 4,728', 4 * 1000 + 7 * 100 + 2 * 10 + 8 * 1 === 4728)
ok('A1 the weights are the powers of ten: 1000=10^3, 100=10^2, 10=10^1, 1=10^0', 1000 === 10 ** 3 && 100 === 10 ** 2 && 10 === 10 ** 1 && 1 === 10 ** 0)
ok('A1 every digit of 4,728 is at most 9 (the largest decimal digit)', digits4728.every((d) => d <= 9))
ok('A1 Horner reads 4,728 in base 10 as 4,728', valueOf('4728', 10) === 4728)

// A2 — the binary dress of 45: 101101 = 1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1
ok('A2 45 in binary is 101101', toBase(45, 2) === '101101', `got ${toBase(45, 2)}`)
const binWeights = [32, 16, 8, 4, 2, 1]
ok('A2 the place weights of a 6-bit numeral are 32, 16, 8, 4, 2, 1', binWeights.every((w, i) => w === 2 ** (5 - i)))
ok('A2 1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1x1 = 45', 1 * 32 + 0 * 16 + 1 * 8 + 1 * 4 + 0 * 2 + 1 * 1 === 45)
ok('A2 the set bits alone sum to 45: 32 + 8 + 4 + 1 = 45', 32 + 8 + 4 + 1 === 45)
ok('A2 Horner reads 101101 in base 2 as 45', valueOf('101101', 2) === 45)

// A3 — the octal dress of 45: 55 = 5x8 + 5
ok('A3 45 in octal is 55', toBase(45, 8) === '55', `got ${toBase(45, 8)}`)
ok('A3 5x8 + 5 = 45', 5 * 8 + 5 === 45)
ok('A3 Horner reads 55 in base 8 as 45', valueOf('55', 8) === 45)

// A4 — the hex dress of 45: 2D = 2x16 + 13
ok('A4 45 in hexadecimal is 2D', toBase(45, 16) === '2D', `got ${toBase(45, 16)}`)
ok('A4 2x16 + 13 = 45', 2 * 16 + 13 === 45)
ok('A4 the hex digit D names 13', valueOf('D', 16) === 13)
ok('A4 Horner reads 2D in base 16 as 45', valueOf('2D', 16) === 45)

// A5 — the four dresses agree on one value
ok(
  'A5 the four dresses of the witness agree: 101101 = 55 = 45 = 2D = 45',
  valueOf('101101', 2) === valueOf('55', 8) && valueOf('55', 8) === valueOf('45', 10) && valueOf('45', 10) === valueOf('2D', 16) && valueOf('2D', 16) === 45
)

// A6 — the alphabet lesson: the SAME digit string 101101 read as decimal
ok('A6 the same digit string 101101 read in base 10 is 101,101 (one hundred one thousand one hundred one)', valueOf('101101', 10) === 101101)

/* ================================================================== */
/* B. THE CENSUS — BASES AND DIGIT ALPHABETS                           */
/* ================================================================== */

ok('B1 base 2 uses exactly the alphabet 01 — 2 symbols', toBase(1, 2) === '1' && valueOf('01', 2) === 1 && '01'.length === 2)
ok('B2 base 8 uses exactly the digits 0 through 7 — 8 symbols', DIG.slice(0, 8) === '01234567' && DIG.slice(0, 8).length === 8)
ok('B3 base 10 uses exactly the digits 0 through 9 — 10 symbols', DIG.slice(0, 10) === '0123456789' && DIG.slice(0, 10).length === 10)
ok('B4 base 16 uses exactly 0-9 and A-F — 16 symbols', DIG.length === 16 && DIG === '0123456789ABCDEF')
ok(
  'B5 the largest digit of base b is b-1 for b = 2, 8, 10, 16',
  [2, 8, 10, 16].every((b) => valueOf(DIG[b - 1], b) === b - 1)
)
const hexLetters: [string, number][] = [
  ['A', 10],
  ['B', 11],
  ['C', 12],
  ['D', 13],
  ['E', 14],
  ['F', 15],
]
ok('B6 hex letters A..F name 10..15', hexLetters.every(([l, v]) => valueOf(l, 16) === v))
ok('B7 0x10 = 16 — the first two-digit hex landmark', valueOf('10', 16) === 16)
ok('B8 1,000 in hexadecimal is 3E8', toBase(1000, 16) === '3E8', `got ${toBase(1000, 16)}`)
ok('B9 the 3E8 expansion: 3x256 + 14x16 + 8 = 1,000', 3 * 256 + 14 * 16 + 8 === 1000)
ok('B10 the hex digit E names 14', valueOf('E', 16) === 14)
let crossOk = true
for (let n = 0; n <= 64; n++) {
  for (const b of [2, 8, 10, 16]) {
    if (toBase(n, b) !== n.toString(b).toUpperCase()) crossOk = false
    if (valueOf(toBase(n, b), b) !== n) crossOk = false
  }
}
ok('B11 brute-force cross-check: toBase and Horner agree with toString for n = 0..64 in all four bases', crossOk)

/* ================================================================== */
/* C. THE GROUPING LAWS — THE FREE BRIDGE                              */
/* ================================================================== */

ok('C1 one octal digit = exactly 3 bits, because 2^3 = 8', 2 ** 3 === 8)
ok('C2 one hex digit = exactly 4 bits, because 2^4 = 16', 2 ** 4 === 16)
let regroup3Ok = true
for (let n = 0; n <= 256; n++) {
  if (valueOf(regroup(toBase(n, 2), 3), 8) !== n) regroup3Ok = false
}
ok('C3 brute-force regrouping law: grouping the bits in THREES gives the octal dress, n = 0..256', regroup3Ok)
let regroup4Ok = true
for (let n = 0; n <= 256; n++) {
  if (valueOf(regroup(toBase(n, 2), 4), 16) !== n) regroup4Ok = false
}
ok('C4 brute-force regrouping law: grouping the bits in FOURS gives the hex dress, n = 0..256', regroup4Ok)
ok('C5 regroup 101101 in threes gives 55 (octal)', regroup('101101', 3) === '55', `got ${regroup('101101', 3)}`)
ok('C6 regroup 101101 in fours (padded to 8 bits) gives 2D (hex)', regroup('101101', 4) === '2D', `got ${regroup('101101', 4)}`)
ok('C7 the 8-bit pattern of 45 is 00101101', toBase(45, 2).padStart(8, '0') === '00101101')
ok('C8 the two nibbles of 2D: 0010 reads as 2 and 1101 reads as 13', valueOf('0010', 2) === 2 && valueOf('1101', 2) === 13)
ok('C9 two hex digits name 16^2 = 256 values', 16 ** 2 === 256)
ok('C10 the byte law: 2^8 = 256 = 16^2 — one byte is exactly two hex digits', 2 ** 8 === 256 && 16 ** 2 === 256)
// C11 — the exercise witness 11010110
ok('C11 the exercise numeral 11010110 reads as 214 in decimal', valueOf('11010110', 2) === 214)
ok('C11 regrouped in threes (padded to 9 bits) it is 326 in octal', regroup('11010110', 3) === '326', `got ${regroup('11010110', 3)}`)
ok('C11 regrouped in fours it is D6 in hex', regroup('11010110', 4) === 'D6', `got ${regroup('11010110', 4)}`)
ok('C12 100110 reads as 38; in threes it is 46 in octal', valueOf('100110', 2) === 38 && regroup('100110', 3) === '46')
ok('C13 the byte 01001000 reads as 72; its hex dress is 48', valueOf('01001000', 2) === 72 && toBase(72, 16) === '48')
ok('C14 200 in hex is C8, and 12x16 + 8 = 200', toBase(200, 16) === 'C8' && 12 * 16 + 8 === 200)
ok('C15 the 8-bit pattern 00101101 needs ONE leading zero for threes: 000 101 101 = 055 = 45 (8 is a multiple of 4, not of 3)', regroup('00101101', 3) === '055' && valueOf('055', 8) === 45)
const landmarks: [string, number][] = [
  ['10', 16],
  ['20', 32],
  ['40', 64],
  ['80', 128],
  ['100', 256],
]
ok('C16 the byte landmarks 0x10, 0x20, 0x40, 0x80, 0x100 = 16, 32, 64, 128, 256', landmarks.every(([h, v]) => valueOf(h, 16) === v))

/* ================================================================== */
/* D. THE RANGE LAW — THE NAMING POWER OF n DIGITS                     */
/* ================================================================== */

ok('D1 hex digit pairs: 16^2 = 256, 16^4 = 65,536, 16^6 = 16,777,216 values', 16 ** 2 === 256 && 16 ** 4 === 65536 && 16 ** 6 === 16777216)
let allOnesOk = true
for (let n = 1; n <= 20; n++) {
  if (valueOf('1'.repeat(n), 2) !== 2 ** n - 1) allOnesOk = false
}
ok('D2 brute-force range law: the largest n-bit numeral is all ones = 2^n - 1, n = 1..20', allOnesOk)
ok('D3 the largest 8-bit number is 2^8 - 1 = 255 = FF', 2 ** 8 - 1 === 255 && valueOf('FF', 16) === 255 && valueOf('11111111', 2) === 255)
ok('D4 the largest 12-bit number is 2^12 - 1 = 4,095', 2 ** 12 - 1 === 4095 && valueOf('111111111111', 2) === 4095)
ok('D5 the largest 16-bit number is 2^16 - 1 = 65,535 = FFFF', 2 ** 16 - 1 === 65535 && valueOf('FFFF', 16) === 65535)
ok('D6 four hex digits name 16^4 = 65,536 values', 16 ** 4 === 65536)
ok('D7 six hex digits name 16^6 = 16,777,216 values; FFFFFF = 16,777,215', 16 ** 6 === 16777216 && valueOf('FFFFFF', 16) === 16777215 && 16 ** 6 - 1 === 16777215)
ok('D8 2^16 = 65,536 = 16^4 (four hex digits = sixteen bits)', 2 ** 16 === 65536 && 16 ** 4 === 65536)
ok('D9 2^24 = 16,777,216 = 16^6 — the 24-bit colour census of chapter 2', 2 ** 24 === 16777216 && 16 ** 6 === 16777216)
ok('D10 five hex digits = 20 bits: 16^5 = 1,048,576 = 2^20', 16 ** 5 === 1048576 && 2 ** 20 === 1048576)
ok('D11 six decimal digits fit inside five hex digits: 999,999 <= FFFFF = 1,048,575', 10 ** 6 - 1 === 999999 && 16 ** 5 - 1 === 1048575 && 999999 <= 1048575)
ok('D12 FFFFF reads as 1,048,575', valueOf('FFFFF', 16) === 1048575)

/* ================================================================== */
/* E. THE COUNTING STRIP — 0 TO 16 IN ALL FOUR BASES                   */
/* ================================================================== */

ok('E1 milestone 7: binary 111, octal 7, hex 7', toBase(7, 2) === '111' && toBase(7, 8) === '7' && toBase(7, 16) === '7')
ok('E2 milestone 8: binary 1000, octal 10, hex 8', toBase(8, 2) === '1000' && toBase(8, 8) === '10' && toBase(8, 16) === '8')
ok('E3 milestone 9: binary 1001, octal 11, hex 9', toBase(9, 2) === '1001' && toBase(9, 8) === '11' && toBase(9, 16) === '9')
ok('E4 milestone 10: binary 1010, octal 12, hex A', toBase(10, 2) === '1010' && toBase(10, 8) === '12' && toBase(10, 16) === 'A')
ok('E5 milestone 15: binary 1111, octal 17, hex F', toBase(15, 2) === '1111' && toBase(15, 8) === '17' && toBase(15, 16) === 'F')
ok('E6 milestone 16: binary 10000, octal 20, hex 10', toBase(16, 2) === '10000' && toBase(16, 8) === '20' && toBase(16, 16) === '10')
let stripOk = true
for (let i = 0; i <= 16; i++) {
  if (toBase(i, 10) !== String(i)) stripOk = false
  if (toBase(i, 2) !== i.toString(2)) stripOk = false
  if (toBase(i, 8) !== i.toString(8)) stripOk = false
  if (toBase(i, 16) !== i.toString(16).toUpperCase()) stripOk = false
}
ok('E7 brute-force strip: every cell 0..16 x four bases recomputed two ways', stripOk)
ok(
  'E8 strip neighbours used in prose: 6=110, 11=1011/13/B, 12=1100/14/C, 13=1101/15/D, 14=1110/16/E',
  toBase(6, 2) === '110' && toBase(11, 2) === '1011' && toBase(11, 8) === '13' && toBase(11, 16) === 'B' && toBase(12, 2) === '1100' && toBase(12, 8) === '14' && toBase(12, 16) === 'C' && toBase(13, 2) === '1101' && toBase(13, 8) === '15' && toBase(13, 16) === 'D' && toBase(14, 2) === '1110' && toBase(14, 8) === '16' && toBase(14, 16) === 'E'
)
ok('E9 the carry chain: 111 + 1 = 1000 in binary (7 + 1 = 8)', valueOf('111', 2) + 1 === valueOf('1000', 2) && valueOf('1000', 2) === 8)
ok('E10 the hex carry: F + 1 = 10 in hex, and 1111 + 1 = 10000 in binary (15 + 1 = 16)', valueOf('F', 16) + 1 === valueOf('10', 16) && valueOf('1111', 2) + 1 === valueOf('10000', 2))
ok(
  'E11 the milestones gain a column: binary length 3 to 4 at 8, 4 to 5 at 16; octal 1 to 2 at 8; hex 1 to 2 at 16',
  toBase(7, 2).length === 3 && toBase(8, 2).length === 4 && toBase(15, 2).length === 4 && toBase(16, 2).length === 5 && toBase(7, 8).length === 1 && toBase(8, 8).length === 2 && toBase(15, 16).length === 1 && toBase(16, 16).length === 2
)
let decIdentityOk = true
for (let i = 0; i <= 16; i++) if (valueOf(String(i), 10) !== i) decIdentityOk = false
ok('E12 the decimal column of the strip is the index itself', decIdentityOk)

/* ================================================================== */
/* F. THE HISTORY PINS (web-verified by the orchestrator; carried      */
/*    EXACTLY — prose pins re-read in section Z)                       */
/* ================================================================== */

const PIN_IBM_HEX_YEAR = 1963
const PIN_BENDIX_G15_YEAR = 1956
const PIN_LEIBNIZ_YEAR = 1703
ok('F1 IBM standardized the hex alphabet 0-9 + A-F in 1963 (pinned)', PIN_IBM_HEX_YEAR === 1963)
ok('F2 the Bendix G-15 (1956) had used the digits 0-9 + U-Z (pinned)', PIN_BENDIX_G15_YEAR === 1956)
ok('F3 Leibniz published his binary memoir in 1703 (pinned; lesson 3.1 owns the full heritage)', PIN_LEIBNIZ_YEAR === 1703)

/* ================================================================== */
/* G. THE CONTINUATION WITNESSES — every number the appended sections  */
/*    will print (revision cards, exam corner, quiz, and the           */
/*    15-question practice sets), recomputed BEFORE that prose exists  */
/* ================================================================== */

// G1 — the itemised pieces of the 3E8 landmark (practice Q3)
ok('G1 the 3E8 pieces: 14 x 16 = 224 and 768 + 224 + 8 = 1,000', 14 * 16 === 224 && 768 + 224 + 8 === 1000)

// G2-G4 — practice Q4: the exercise byte 11010110, read three ways
ok('G2 11010110 = 214 by set bits: 128 + 64 + 16 + 4 + 2 = 214', 128 + 64 + 16 + 4 + 2 === 214 && valueOf('11010110', 2) === 214)
ok('G3 the octal check of 326: 3 x 64 + 2 x 8 + 6 = 214', 3 * 64 + 2 * 8 + 6 === 214 && valueOf('326', 8) === 214)
ok('G4 the hex check of D6: 13 x 16 + 6 = 214', 13 * 16 + 6 === 214 && valueOf('D6', 16) === 214)

// G5 — practice Q9: 100110 = 38, blocks 100 and 110 read 4 and 6
ok('G5 100110 = 38; the blocks 100 and 110 read 4 and 6, and 4 x 8 + 6 = 38', valueOf('100110', 2) === 38 && valueOf('100', 2) === 4 && valueOf('110', 2) === 6 && 4 * 8 + 6 === 38 && 32 + 4 + 2 === 38)

// G6 — practice Q11: the byte 01001000
ok('G6 01001000 = 72 by set bits 64 + 8; the blocks 0100 and 1000 read 4 and 8, and 4 x 16 + 8 = 72', 64 + 8 === 72 && valueOf('01001000', 2) === 72 && valueOf('0100', 2) === 4 && valueOf('1000', 2) === 8 && 4 * 16 + 8 === 72)

// G7 — the divisibility fact under the byte law (practice Q13)
ok('G7 8 is a multiple of 4 (hex blocks) but NOT of 3 (octal blocks)', 8 % 4 === 0 && 8 % 3 !== 0)

// G8 — quiz item 4: every wrong hex dress differs from the witness 2D = 45
ok('G8 quiz distractors: 2C = 44, 3D = 61 and 35 = 53 — none is the witness 2D = 45', valueOf('2C', 16) === 44 && valueOf('3D', 16) === 61 && valueOf('35', 16) === 53 && valueOf('2D', 16) === 45)

// G9 — quiz landmarks: 0x64 = 100, 0x8 = 8, the top bit alone is 128, 0x10 = 16
ok('G9 quiz landmarks: 0x64 = 100, 0x8 = 8, 10000000 = 128, 0x10 = 16', valueOf('64', 16) === 100 && valueOf('8', 16) === 8 && valueOf('10000000', 2) === 128 && valueOf('10', 16) === 16)

// G10 — the 8-bit weight ladder used across the practice sets
const w8 = [128, 64, 32, 16, 8, 4, 2, 1]
ok('G10 the 8-bit weight ladder is 128, 64, 32, 16, 8, 4, 2, 1 (2^7 down to 2^0)', w8.every((w, i) => w === 2 ** (7 - i)))

// G11 — the pinned quiz key the shipped part must carry
ok('G11 the quiz key is pinned as [2, 0, 3, 1, 2]', JSON.stringify([2, 0, 3, 1, 2]) === JSON.stringify([2, 0, 3, 1, 2]))

// G12 — practice Q14: five hex digits versus six decimal digits
ok('G12 16^5 = 1,048,576 = 2^20; 16^5 - 1 = 1,048,575 = FFFFF; 999,999 <= 1,048,575', 16 ** 5 === 1048576 && 2 ** 20 === 1048576 && 16 ** 5 - 1 === 1048575 && valueOf('FFFFF', 16) === 1048575 && 10 ** 6 - 1 === 999999 && 999999 <= 1048575)

/* ================================================================== */
/* Z. PIN SECTION — re-reads the shipped part (dynamic import, so the  */
/*    engine alone ran GREEN before the prose existed; re-run after    */
/*    the part ships — the engine wins over any other source)          */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await Promise.resolve({ lesson32 })
  lesson = (mod.lesson32 as Lesson) ?? null
} catch {
  console.log('  (part-cf32.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== Z. PIN SECTION: audit the shipped part ==')
  ok('Z1 the part loads and exports lesson32', true)

  /* header fields */
  ok('Z2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-numbering-systems-binary-octal-hexadecimal'
    && lesson.number === '3.2'
    && lesson.title === 'The Numbering Systems: Binary, Octal, Hexadecimal',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('Z3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('Z4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)

  /* word floor */
  const wc = countLessonWords(lesson)
  ok('Z5 the hard word floor: countLessonWords >= 6,000', wc >= 6000, String(wc))
  ok('Z5b the content-seat depth bar: countLessonWords >= 7,000', wc >= 7000, String(wc))
  ok('Z5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('Z6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5,
    `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('Z6b the quiz key is exactly [2, 0, 3, 1, 2]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([2, 0, 3, 1, 2]),
      q.items.map((i) => i.answer).join(','))
    ok('Z6c every quiz item has exactly 4 non-empty options',
      q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['octal', '4 bits', '255', '2D', 'Sixteen']
    q.items.forEach((it, idx) => {
      ok(`Z6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`,
        (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('Z6e every explain is a full why-they-fail audit (>= 150 chars)',
      q.items.every((i) => i.explain.length >= 150), q.items.map((i) => i.explain.length).join(','))
    ok('Z6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('Z7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('Z7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('Z7c levels span at least L1, L2, L3, L4', ['L1', 'L2', 'L3', 'L4'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
    ok('Z7d every solution is a steps array of >= 3 non-empty lines',
      allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('Z7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('Z7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok("Z7g every exercise answer's numeric core appears in its final solution line", coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('Z8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('Z9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('Z9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('Z10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law (body + solution figures, attribute-order-flexible parser) */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('Z11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('Z11b every aria-label is descriptive (>= 40 chars)',
    svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('Z11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  /* the vivid palette; #fcd34d is the amber strip-border tint the landed
     body figures (and one solution strip) use on their caption bands */
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5', '#fcd34d'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? []).filter((h) => !allowed.has(h.toLowerCase()))))]
  ok('Z11d every SVG hex is the vivid palette (plus the landed amber strip border #fcd34d)', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('Z11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('Z11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1]); const H = parseFloat(vb[2])
    for (const m of s.matchAll(/<text\s+([^>]*)>([^<]*)<\/text>/g)) {
      const attrs = m[1]; const txt = m[2]
      if (txt.trim().length === 0) continue
      const gx = attrs.match(/x="([0-9.-]+)"/); const gy = attrs.match(/y="([0-9.-]+)"/)
      const gf = attrs.match(/font-size="([0-9.]+)"/); const ga = attrs.match(/text-anchor="([a-z]+)"/)
      if (!gx || !gy || !gf) continue
      const x = parseFloat(gx[1]); const y = parseFloat(gy[1]); const size = parseFloat(gf[1])
      const anchor = ga ? ga[1] : 'start'
      const est = txt.length * size * 0.62
      const lo = anchor === 'start' ? x : anchor === 'middle' ? x - est / 2 : x - est
      const hi = anchor === 'start' ? x + est : anchor === 'middle' ? x + est / 2 : x
      if (lo < 8 || hi > W - 8 || y < 10 || y > H - 6) clipFails.push(`"${txt.slice(0, 26)}" @x=${x},y=${y} w~${est.toFixed(0)} W=${W} H=${H}`)
    }
  }
  ok('Z11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  /* raw-TeX law (all prose fields; latex/formula keys are KaTeX by design) */
  const prose: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue
        walk(val)
      }
    }
  }
  walk(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('Z12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('Z12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('Z12c headings are plain (no $, no backslash) and at least 6 in number',
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('Z12d at least one list uses roman markers', lists.some((l) => l.marker === 'roman'))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('Z12e terms total >= 8 items', termsB.reduce((n, t) => n + t.items.length, 0) >= 8, `items=${termsB.reduce((n, t) => n + t.items.length, 0)}`)
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('Z12f the algorithm block has >= 4 lines, each with a note',
    algos.length >= 1 && algos.every((a) => a.lines.length >= 4 && a.lines.every((l) => (l.note ?? '').length > 0)))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; steps: Array<{ label: string }> }>
  ok('Z13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('Z14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('Z15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('Z16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('Z17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('Z18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* summary witnesses for the run report */
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wc} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

  return { id: 'cf32 engines+pins', pass: P, fail: F }
}


async function sectionCf36(): Promise<SectionResult> {
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

  return { id: 'cf36 engines+pins', pass: P, fail: F }
}


async function sectionCf37(): Promise<SectionResult> {
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

  return { id: 'cf37 engines+pins', pass: P, fail: F }
}


/* ================================================================== */
/* SECTION Z — the in-progress chapter census                          */
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
  console.log('== SECTION Z: the in-progress chapter census ==')
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'data-representation-first-meeting', chapter3.slug)
  z('Z03 chapter title pinned', chapter3.title === 'Data Representation: a First Meeting', chapter3.title)
  z('Z04 chapter status in-progress (CS RUN 5 opened; the close rides CS RUN 6)', chapter3.status === 'in-progress', chapter3.status)
  z('Z05 three lessons shipped (3.2 + 3.6 + 3.7)', chapter3.lessons.length === 3, String(chapter3.lessons.length))
  z('Z06 five lessons still planned', (chapter3.plannedLessons ?? []).length === 5, String((chapter3.plannedLessons ?? []).length))
  z('Z06b planned titles exact and in order', JSON.stringify(chapter3.plannedLessons) === JSON.stringify(['Bits: Why Two Symbols Carry Everything', 'Codes: ASCII, Unicode and BCD', 'Text, Images and Sound as Bits', 'Compression: Lossless and Lossy', 'Decimal and Binary Number System']), (chapter3.plannedLessons ?? []).join(' | '))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal', 'cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion']), ids.join(','))
  const nums = chapter3.lessons.map((l) => l.number)
  z('Z08 lesson numbers 3.2, 3.6, 3.7', JSON.stringify(nums) === JSON.stringify(['3.2', '3.6', '3.7']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter3.lessons[0].title === 'The Numbering Systems: Binary, Octal, Hexadecimal' && chapter3.lessons[1].title === 'Decimal to Binary Conversion' && chapter3.lessons[2].title === 'Binary to Decimal Conversion', chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each; the shipped seats all cleared 9,000)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (3.2 <- 3.1-unwritten; 3.6 + 3.7 <- 3.2)', JSON.stringify(chapter3.lessons[0].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[1].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[2].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']), JSON.stringify(chapter3.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground)', chapter3.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground')))
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all three lessons', ['lesson32', 'lesson36', 'lesson37'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 complete, chapter 3 in-progress', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'in-progress', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapters 4-8 still planned', computerFundamentals.chapters.slice(3).every((c) => c.status === 'planned'))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 24,000 words)', bookWords > 24000, String(bookWords))
  z('Z23 the shelf census grows to 11 written lessons (8 + 3)', computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0) === 11, String(computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf32(),
    await sectionCf36(),
    await sectionCf37(),
    await sectionZ(),
  ]
  console.log('')
  console.log('============= verify-cs-book2-ch03: verdict =============')
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
  console.log('RESULT: ALL GREEN — chapter 3 shipped in-progress (3.2 + 3.6 + 3.7 whole; 3.1, 3.3, 3.4, 3.5, 3.8 + the 3.R review ride CS RUN 6).')
}

main()
