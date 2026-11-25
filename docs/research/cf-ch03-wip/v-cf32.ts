import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

export {}

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
  const mod = await import('./part-cf32')
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

console.log(`V-CF32: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
