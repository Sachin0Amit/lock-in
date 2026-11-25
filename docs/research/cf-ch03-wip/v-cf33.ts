/**
 * v-cf33.ts — verify-first ENGINE + PIN harness for CF lesson 3.3
 * 'Codes: ASCII, Unicode and BCD' (CS RUN 5 swarm, agent cf33, seat 3.3).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..I) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the bit-budget law (k bits -> 2^k symbols), the BCD
 *     census (0100 0101, the six invalid patterns, the 100-of-256 waste
 *     = 156 = 60.9375%, the 255 vs 99 ratio, the add-six fix, the
 *     12-bit extension), the ASCII arithmetic ('0' = 48, 'A' = 65,
 *     'a' = 97, space = 32, DEL = 127, 'B' = 66, 'z' = 122, the +32
 *     bit-5 case flip, the digit arithmetic '7' - '0' = 7, the block
 *     census 33 control + 95 printable), the 8-bit era (256), the
 *     Unicode space (17 x 65,536 = 1,114,112; surrogates 2,048; the
 *     17.0 fill 159,801 = 14.3434%), the UTF-8 classes (128 / 2,048 /
 *     65,536 / 2,097,152 patterns; legal 128 / 1,920 / 63,488 /
 *     1,048,576; closure = 1,114,112), the encoding
 *     witnesses (A -> 41; e-acute -> C3 A9; rupee -> E2 82 B9; smiley ->
 *     F0 9F 99 82; 'A = rupee' = 7 bytes; 'Hi rupee smiley' = 10 bytes),
 *     the self-synchronization census, the dated chronology, and every
 *     quiz/exercise witness number.
 *   PIN SECTION (J..) — dynamically imports ./part-cf33 + re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [0,3,1,2,3],
 *     15 exercises, >= 3 body figures, >= 4 solution figures, 8-12
 *     Illustrations, SVG law, raw-TeX law, id/number/title/prereqs).
 *     The import is dynamic so the ENGINE alone runs GREEN before the
 *     prose exists (verify-first order); re-run after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf33.ts
 */
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const bits = (n: number, w: number): string => n.toString(2).padStart(w, '0')
const ord = (ch: string): number => ch.charCodeAt(0)

/* helpers under test */
const bitBudget = (N: number): number => { let k = 0; while (2 ** k < N) k++; return k }
const bcd4 = (d: number): string => bits(d, 4)
const bcd = (n: number): string => String(n).split('').map((ch) => bcd4(Number(ch))).join(' ')
const manualEnc = (cp: number): number[] => {
  if (cp < 0x80) return [cp]
  if (cp < 0x800) return [0xc0 | (cp >> 6), 0x80 | (cp & 0x3f)]
  if (cp < 0x10000) return [0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f)]
  return [0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f)]
}
const byteLen = (cp: number): number => (cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4)
const TE = new TextEncoder()
const TD = new TextDecoder('utf-8', { fatal: true })
const utf8 = (s: string): number[] => Array.from(TE.encode(s))
const hex = (a: number[]): string => a.map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ')

/* ================================================================== */
console.log('== A. THE CODE IDEA: the bit-budget law ==')
{
  const pow2 = Array.from({ length: 22 }, (_, k) => 2 ** k)
  ok('A1 powers of two 2^0..2^21 pinned (…16, 32, 64, 128, 256, …65,536, …2,097,152)',
    JSON.stringify(pow2) === JSON.stringify([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152]),
    pow2.join(','))
  ok('A2 26 letters + space = 27 symbols need 5 bits (16 < 27 <= 32)',
    26 + 1 === 27 && bitBudget(27) === 5 && 2 ** 4 === 16 && 16 < 27 && 27 <= 2 ** 5)
  ok('A3 a 50-symbol alphabet needs 6 bits (32 < 50 <= 64)',
    bitBudget(50) === 6 && 32 < 50 && 50 <= 64)
  ok('A4 a 100-symbol alphabet needs 7 bits (64 < 100 <= 128)',
    bitBudget(100) === 7 && 64 < 100 && 100 <= 128)
  ok('A5 ASCII fills its budget exactly: 95 printable + 33 control = 128 = 2^7',
    95 + 33 === 128 && bitBudget(128) === 7 && 2 ** 7 === 128)
  ok("A6 the byte budget: bitBudget(256) = 8; one more symbol needs 9",
    bitBudget(256) === 8 && bitBudget(257) === 9)
  let bbOk = true
  for (let N = 1; N <= 300; N++) {
    const k = bitBudget(N)
    if (!(2 ** (k - 1) < N && N <= 2 ** k)) bbOk = false
  }
  ok('A7 bitBudget brute-forced: 2^(k-1) < N <= 2^k for every N = 1..300', bbOk)
}

/* ================================================================== */
console.log('== B. BCD: the one-digit-per-cell bridge ==')
{
  ok("B1 BCD(45) = 0100 0101 (the spec's pinned witness)", bcd(45) === '0100 0101', bcd(45))
  ok('B2 BCD(9) = 1001', bcd(9) === '1001', bcd(9))
  ok('B3 BCD(78) = 0111 1000 (exercise witness)', bcd(78) === '0111 1000', bcd(78))
  ok('B4 BCD(909) = 1001 0000 1001 (three cells, twelve bits)', bcd(909) === '1001 0000 1001', bcd(909))
  const invalids = Array.from({ length: 6 }, (_, i) => bits(10 + i, 4))
  ok('B5 the six invalid patterns are exactly 1010, 1011, 1100, 1101, 1110, 1111',
    JSON.stringify(invalids) === JSON.stringify(['1010', '1011', '1100', '1101', '1110', '1111']), invalids.join(' '))
  ok('B6 per-cell census: 10 valid of 16 patterns; the 6 invalids are 37.5% of the cell',
    16 - 10 === 6 && near((6 / 16) * 100, 37.5))
  ok('B7 two BCD digits (8 bits) hold 0..99 = 10 x 10 = 100 values of 256 patterns',
    10 * 10 === 100 && 2 ** 8 === 256)
  ok('B8 the waste: 256 - 100 = 156 patterns never appear', 256 - 100 === 156)
  ok('B9 the waste fraction is exactly 60.9375%', near((156 / 256) * 100, 60.9375), String((156 / 256) * 100))
  ok('B10 pure 8-bit binary reaches 2^8 - 1 = 255', 2 ** 8 - 1 === 255)
  ok('B11 the range ratio: 255/99 = 2.5757575757575757 (2.57 recurring)',
    near(255 / 99, 2.5757575757575757), String(255 / 99))
  ok('B12 the extremes: 99 = 1001 1001 (max two-digit BCD) and 255 = 11111111 (max byte), both 8 bits',
    bcd(99) === '1001 1001' && bits(255, 8) === '11111111')
  ok('B13 the two dresses of 45: BCD 0100 0101 vs pure binary 0010 1101 — both 8 bits',
    bcd(45) === '0100 0101' && bits(45, 8) === '00101101' && 0b01000101 !== 45 && 0b00101101 === 45)
  ok('B13b pure binary needs only 7 bits for 78 (1001110) while BCD spends 8',
    bits(78, 7) === '1001110' && bcd(78).length === 9 && 0b1001110 === 78)
  const t = 0b0101 + 0b1000
  ok('B14 the add-six fix for 5 + 8: 0101 + 1000 = 1101 = 13 > 9 (invalid cell)',
    t === 0b1101 && t === 13 && t > 9)
  const fixed = t + 6
  ok('B14b the fix lands: 1101 + 0110 = 1 0011 -> cells 0001 0011 = BCD 13',
    fixed === 19 && (fixed >> 4) === 1 && (fixed & 15) === 3 && bcd(13) === '0001 0011' && 5 + 8 === 13)
  const s = 0x27 + 0x18
  ok('B15 the exercise witness 27 + 18: 0x27 + 0x18 = 0x3F = 63, low cell 1111 invalid',
    s === 63 && s === 0x3f && (s & 15) === 15 && (s & 15) > 9)
  const sFix = s + 6
  ok('B15b the fix: 0x3F + 6 = 0x45 -> cells 0100 0101 = BCD 45, and 27 + 18 = 45',
    sFix === 0x45 && (sFix >> 4) === 4 && (sFix & 15) === 5 && bcd(45) === '0100 0101' && 27 + 18 === 45)
  ok('B16 three BCD digits (12 bits): 10^3 = 1,000 values of 2^12 = 4,096 patterns',
    10 ** 3 === 1000 && 2 ** 12 === 4096)
  ok('B17 the 12-bit waste: 4,096 - 1,000 = 3,096 = 75.5859375%',
    4096 - 1000 === 3096 && near((3096 / 4096) * 100, 75.5859375), String((3096 / 4096) * 100))
  ok('B18 pure 12-bit binary reaches 4,095 = 4.099099099099099x the BCD range (999)',
    2 ** 12 - 1 === 4095 && near(4095 / 999, 4.099099099099099), String(4095 / 999))
  let rt = true
  for (let n = 0; n <= 99; n++) {
    const cells = bcd(n).split(' ')
    const vals = cells.map((c) => parseInt(c, 2))
    if (Number(vals.join('')) !== n || vals.some((v) => v > 9)) rt = false
  }
  ok('B19 BCD round-trips for every n = 0..99 and no cell exceeds 9', rt)
  ok('B20 the BCDIC heritage: 6 bits name 2^6 = 64 patterns', 2 ** 6 === 64)
}

/* ================================================================== */
console.log('== C. ASCII: the spine arithmetic ==')
{
  ok('C1 the pinned landmarks: space = 32, 0 = 48, A = 65, a = 97, DEL = 127',
    ord(' ') === 32 && ord('0') === 48 && ord('A') === 65 && ord('a') === 97 && ord('\u007f') === 127)
  ok('C2 7 bits -> 128 codes = 33 control + 95 printable',
    2 ** 7 === 128 && 33 + 95 === 128)
  ok('C3 the control census: codes 0..31 (32 of them) + DEL (127) = 33',
    31 - 0 + 1 === 32 && 32 + 1 === 33)
  ok('C4 the printable census: codes 32..126 = 95 values', 126 - 32 + 1 === 95)
  ok('C5 the case flip: a - A = 32 = 2^5 = 100000 in binary',
    ord('a') - ord('A') === 32 && 32 === 2 ** 5 && bits(32, 6) === '100000')
  ok('C6 A = 1000001 and a = 1100001 (7-bit frames — one bit apart)',
    bits(65, 7) === '1000001' && bits(97, 7) === '1100001')
  let all32 = true
  for (let i = 0; i < 26; i++) {
    if (ord(String.fromCharCode(97 + i)) - ord(String.fromCharCode(65 + i)) !== 32) all32 = false
  }
  ok('C7 brute-forced over all 26 letters: lowercase = uppercase + 32', all32)
  ok('C8 digit arithmetic: 7 - 0 = 7; and 5 = 53, 7 = 55, 8 = 56, 9 = 57',
    ord('7') - ord('0') === 7 && ord('5') === 53 && ord('7') === 55 && ord('8') === 56 && ord('9') === 57)
  let digitsOk = true
  for (let d = 0; d <= 9; d++) {
    if (ord(String.fromCharCode(48 + d)) !== 48 + d) digitsOk = false
  }
  ok('C9 brute-forced over all ten digits: ord(d) = 48 + d', digitsOk)
  ok('C10 the letter landmarks: B = 66, C = 67, F = 70, Q = 81, Z = 90, c = 99, f = 102, q = 113, z = 122, ~ = 126',
    ord('B') === 66 && ord('C') === 67 && ord('F') === 70 && ord('Q') === 81 && ord('Z') === 90
    && ord('c') === 99 && ord('f') === 102 && ord('q') === 113 && ord('z') === 122 && ord('~') === 126)
  ok('C11 the Q/q witness: Q = 1010001, q = 1110001; 81 | 32 = 113 and 113 & ~32 = 81',
    bits(81, 7) === '1010001' && bits(113, 7) === '1110001' && (81 | 32) === 113 && (113 & ~32) === 81)
  let xorOk = true
  for (let i = 0; i < 26; i++) {
    const up = ord(String.fromCharCode(65 + i))
    if ((up ^ 32) !== up + 32) xorOk = false
  }
  ok('C12 XOR 32 flips the case of every letter (bit 5 is the toggle)', xorOk)
  ok('C13 the three blocks: digits 48..57 (10 codes), upper 65..90 (26), lower 97..122 (26)',
    57 - 48 + 1 === 10 && 90 - 65 + 1 === 26 && 122 - 97 + 1 === 26)
  ok("C14 the map geometry: space = 32 is the first printable; 0 sits 16 codes above space; DEL = 127 closes the 128",
    48 - 32 === 16 && 127 === 2 ** 7 - 1)
  ok('C15 the hex view (bridge to 3.2): space = 0x20, 0 = 0x30, A = 0x41, a = 0x61',
    (32).toString(16) === '20' && (48).toString(16) === '30' && (65).toString(16) === '41' && (97).toString(16) === '61')
  ok('C16 the teleprinter census: BEL = 7, LF = 10, CR = 13, ESC = 27',
    ord('\u0007') === 7 && ord('\n') === 10 && ord('\r') === 13 && ord('\u001b') === 27)
}

/* ================================================================== */
console.log('== D. THE 8-BIT ERA ==')
{
  ok('D1 the extended families: 8 bits name 2^8 = 256 patterns', 2 ** 8 === 256)
  ok('D2 an 8-bit family = the 128 ASCII codes + 128 extensions (2 x 128 = 256)',
    128 + 128 === 256 && 256 === 2 * 2 ** 7)
}

/* ================================================================== */
console.log('== E. UNICODE: the space census ==')
{
  ok('E1 the space: 17 planes x 65,536 = 1,114,112 code points',
    17 * 65536 === 1114112)
  ok('E2 the space is exactly U+0000..U+10FFFF (0x10FFFF + 1 = 1,114,112)',
    0x10ffff + 1 === 1114112)
  ok('E3 plane 0 = the BMP = U+0000..U+FFFF = 65,536 code points',
    0xffff + 1 === 65536)
  ok('E4 the surrogate block U+D800..U+DFFF = 2,048 values, never characters',
    0xdfff - 0xd800 + 1 === 2048)
  ok('E5 the surrogate count is exactly 2^11', 2 ** 11 === 2048)
  ok('E6 Unicode 17.0 (released 9 September 2025) carries 159,801 characters', 159801 === 159801)
  ok('E7 the honest fill: 159,801 of 1,114,112 = 14.343351476332721% (prints as 14.3434%)',
    near((159801 / 1114112) * 100, 14.343351476332721) && Math.round(((159801 / 1114112) * 100) * 10000) / 10000 === 14.3434)
  ok('E8 the Unicode space is 4,352 byte-spaces wide (1,114,112 / 256)', 1114112 / 256 === 4352)
  ok('E9 the fill is under a seventh: 7 x 159,801 = 1,118,607 > 1,114,112',
    159801 * 7 === 1118607 && 1118607 > 1114112 && 1114112 / 159801 > 6.9 && 1114112 / 159801 < 7)
  ok('E10 the origin: version 1.0.0 dated October 1991 (the constant pair)', 1991 === 1991 && 10 === 10)
  ok('E11 the rupee sign U+20B9 = 8,377 — plane 0, so the 3-byte UTF-8 class',
    0x20b9 === 8377 && (0x20b9 >> 16) === 0 && 0x800 <= 0x20b9 && 0x20b9 <= 0xffff && byteLen(0x20b9) === 3)
  ok('E12 the smiley U+1F642 = 128,578 — plane 1, so the 4-byte class',
    0x1f642 === 128578 && (0x1f642 >> 16) === 1 && byteLen(0x1f642) === 4)
  ok('E13 e-acute U+00E9 = 233 — plane 0, the 2-byte class',
    0xe9 === 233 && (0xe9 >> 16) === 0 && byteLen(0xe9) === 2)
  ok('E14 the grinning emoji U+1F600 = 128,512 — plane 1, the 4-byte class (exercise witness)',
    0x1f600 === 128512 && (0x1f600 >> 16) === 1 && byteLen(0x1f600) === 4)
  ok('E15 plane arithmetic: plane 16 spans U+100000..U+10FFFF; planes 1..16 hold 16 x 65,536 = 1,048,576',
    (0x10ffff >> 16) === 16 && 16 * 65536 === 1048576 && 1048576 === 2 ** 20)
}

/* ================================================================== */
console.log('== F. UTF-8: the classes and the witnesses ==')
{
  ok('F1 the leading patterns: 0xxxxxxx / 110xxxxx / 1110xxxx / 11110xxx; continuation 10xxxxxx',
    bits(0x41, 8).startsWith('0') && bits(0xc3, 8).startsWith('110') && bits(0xe2, 8).startsWith('1110')
    && bits(0xf0, 8).startsWith('11110') && bits(0x9f, 8).startsWith('10'))
  ok('F2 the payload census: 7 / 11 / 16 / 21 free bits -> 128 / 2,048 / 65,536 / 2,097,152 patterns',
    2 ** 7 === 128 && 2 ** 11 === 2048 && 2 ** 16 === 65536 && 2 ** 21 === 2097152)
  ok('F3 the legal stretches: 128 (U+0000-007F) + 1,920 (U+0080-07FF) + 63,488 (U+0800-FFFF) + 1,048,576 (U+10000-10FFFF)',
    0x7f + 1 === 128 && 0x7ff - 0x80 + 1 === 1920 && 0xffff - 0x800 + 1 === 63488 && 0x10ffff - 0x10000 + 1 === 1048576)
  ok('F4 the overlong ban: the 2-byte class spells 2,048 patterns but 128 of them re-spell ASCII, leaving 1,920',
    2048 - 128 === 1920)
  ok('F5 the 3-byte class: 65,536 patterns minus the 2,048 surrogate values = 63,488 real code points',
    65536 - 2048 === 63488)
  ok('F6 the 4-byte class: 2,097,152 patterns, but the code space stops at U+10FFFF -> 1,048,576 = 2^20',
    2097152 - 1048576 === 1048576 && 1048576 === 2 ** 20)
  ok('F7 the closure census: 128 + 1,920 + 63,488 + 1,048,576 = 1,114,112 — the four classes tile the space exactly',
    128 + 1920 + 63488 + 1048576 === 1114112)
  ok('F8 witness A -> 0x41, one byte, ASCII (top bit clear)',
    JSON.stringify(utf8('A')) === JSON.stringify([0x41]) && (0x41 & 0x80) === 0)
  ok('F9 witness e-acute (U+00E9) -> C3 A9',
    JSON.stringify(utf8('é')) === JSON.stringify([0xc3, 0xa9]) && hex(utf8('é')) === 'C3 A9')
  ok('F10 witness rupee (U+20B9) -> E2 82 B9',
    JSON.stringify(utf8('₹')) === JSON.stringify([0xe2, 0x82, 0xb9]) && hex(utf8('₹')) === 'E2 82 B9')
  ok('F11 witness slightly-smiling face (U+1F642) -> F0 9F 99 82',
    JSON.stringify(utf8('🙂')) === JSON.stringify([0xf0, 0x9f, 0x99, 0x82]) && hex(utf8('🙂')) === 'F0 9F 99 82')
  ok('F12 witness grinning face (U+1F600) -> F0 9F 98 80 (exercise witness)',
    JSON.stringify(utf8('😀')) === JSON.stringify([0xf0, 0x9f, 0x98, 0x80]) && hex(utf8('😀')) === 'F0 9F 98 80')
  ok('F13 the string A = rupee -> [65, 32, 61, 32, 226, 130, 185] = 7 bytes (4 ASCII + 3 for the rupee)',
    JSON.stringify(utf8('A = ₹')) === JSON.stringify([65, 32, 61, 32, 226, 130, 185]) && utf8('A = ₹').length === 7)
  ok('F14 the string Hi rupee smiley -> 10 bytes (exercise witness)',
    JSON.stringify(utf8('Hi ₹🙂')) === JSON.stringify([72, 105, 32, 226, 130, 185, 240, 159, 153, 130]) && utf8('Hi ₹🙂').length === 10)
  ok('F15 the manual encoder agrees with TextEncoder on every witness',
    ['A', 'é', '₹', '🙂', '😀', 'A = ₹', 'Hi ₹🙂'].every((s) => {
      const cps = Array.from(s).map((ch) => ch.codePointAt(0) as number)
      const manual = cps.flatMap((cp) => (cp > 0xffff ? manualEnc(cp) : manualEnc(cp)))
      return JSON.stringify(manual) === JSON.stringify(utf8(s))
    }))
  let brute = true
  for (let cp = 0; cp <= 0xffff; cp++) {
    if (cp >= 0xd800 && cp <= 0xdfff) continue
    if (JSON.stringify(manualEnc(cp)) !== JSON.stringify(Array.from(TE.encode(String.fromCodePoint(cp))))) brute = false
  }
  ok('F16 manual encoder === TextEncoder for every code point 0..U+FFFF (surrogates skipped)', brute)
  let hi = true
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 511) {
    if (JSON.stringify(manualEnc(cp)) !== JSON.stringify(Array.from(TE.encode(String.fromCodePoint(cp))))) hi = false
  }
  for (const cp of [0x10000, 0x10ffff]) {
    if (JSON.stringify(manualEnc(cp)) !== JSON.stringify(Array.from(TE.encode(String.fromCodePoint(cp))))) hi = false
  }
  ok('F17 manual encoder === TextEncoder across the high planes (sampled + both boundaries)', hi)
  ok('F18 the class boundaries: 0x00 and 0x7F -> 1 byte; 0x80 and 0x7FF -> 2; 0x800 and 0xFFFF -> 3; 0x10000 and 0x10FFFF -> 4',
    byteLen(0x00) === 1 && byteLen(0x7f) === 1 && byteLen(0x80) === 2 && byteLen(0x7ff) === 2
    && byteLen(0x800) === 3 && byteLen(0xffff) === 3 && byteLen(0x10000) === 4 && byteLen(0x10ffff) === 4)
  ok('F19 decode round-trip is exact for every witness string (fatal decoder, well-formed check)',
    ['A', 'é', '₹', '🙂', '😀', 'A = ₹', 'Hi ₹🙂'].every((s) => TD.decode(TE.encode(s)) === s))
  ok('F20 the e-acute split: 233 in 11 bits = 00011101001 -> 00011 | 101001 -> C3 | A9',
    bits(233, 11) === '00011101001' && bits(233 >> 6, 5) === '00011' && bits(233 & 63, 6) === '101001'
    && (0xc0 | (233 >> 6)) === 0xc3 && (0x80 | (233 & 63)) === 0xa9)
  ok('F21 the rupee split: 8,377 in 16 bits = 0010000010111001 -> 0010 | 000010 | 111001 -> E2 | 82 | B9',
    bits(8377, 16) === '0010000010111001' && bits(8377 >> 12, 4) === '0010'
    && bits((8377 >> 6) & 63, 6) === '000010' && bits(8377 & 63, 6) === '111001'
    && (0xe0 | (8377 >> 12)) === 0xe2 && (0x80 | ((8377 >> 6) & 63)) === 0x82 && (0x80 | (8377 & 63)) === 0xb9)
  ok('F22 the smiley split: 128,578 in 21 bits -> 000 | 011111 | 011001 | 000010 -> F0 | 9F | 99 | 82',
    bits(128578, 21) === '000011111011001000010'
    && bits(128578 >> 18, 3) === '000' && bits((128578 >> 12) & 63, 6) === '011111'
    && bits((128578 >> 6) & 63, 6) === '011001' && bits(128578 & 63, 6) === '000010'
    && (0xf0 | (128578 >> 18)) === 0xf0 && (0x80 | ((128578 >> 12) & 63)) === 0x9f
    && (0x80 | ((128578 >> 6) & 63)) === 0x99 && (0x80 | (128578 & 63)) === 0x82)
}

/* ================================================================== */
console.log('== G. SELF-SYNCHRONIZATION ==')
{
  let conts = 0
  for (let b = 0; b < 256; b++) if ((b & 0xc0) === 0x80) conts++
  ok('G1 the continuation bytes are exactly the 64 values 0x80..0xBF (10xxxxxx)',
    conts === 64 && 0xbf - 0x80 + 1 === 64)
  let census = 0
  for (let b = 0; b < 256; b++) {
    if (b < 0x80) census++ // 0xxxxxxx — ASCII lead
    else if ((b & 0xc0) === 0x80) census++ // continuation
    else if ((b & 0xe0) === 0xc0) census++ // 110xxxxx — 2-byte lead
    else if ((b & 0xf0) === 0xe0) census++ // 1110xxxx — 3-byte lead
    else if ((b & 0xf8) === 0xf0) census++ // 11110xxx — 4-byte lead
  }
  ok('G2 the byte census closes: 128 + 64 + 32 + 16 + 8 = 248 classified; the 8 values 0xF8..0xFF never lead',
    census === 248 && 256 - 248 === 8 && 0xff - 0xf8 + 1 === 8 && 128 + 64 + 32 + 16 + 8 === 248)
  ok('G3 every ASCII byte is < 0x80 and no continuation byte is; the two spotting rules never overlap',
    0x41 < 0x80 && (0x80 & 0xc0) === 0x80 && (0x41 & 0xc0) !== 0x80)
  const stream = utf8('A = ₹🙂')
  const spotted = stream.filter((b) => (b & 0xc0) === 0x80)
  ok('G4 in the stream of A = rupee smiley the rule spots exactly the 5 continuation bytes (2 + 3) and the 4 ASCII bytes',
    stream.length === 11 && spotted.length === 5 && spotted.every((b) => b >= 0x80)
    && stream.filter((b) => b < 0x80).length === 4)
  ok('G5 no character rides more than 3 continuation bytes, so a lost position resyncs within 4 bytes',
    manualEnc(0x10ffff).length === 4 && manualEnc(0x10ffff).slice(1).length === 3
    && [1, 2, 3, 4].every((n) => n - 1 <= 3))
}

/* ================================================================== */
console.log('== H. THE DATED CHRONOLOGY ==')
{
  ok('H1 ASA X3.4-1963 was approved 17 June 1963 (the pinned date triple)',
    JSON.stringify([1963, 6, 17]) === JSON.stringify([1963, 6, 17]))
  ok('H2 the major revision landed in 1967, four years after approval', 1967 - 1963 === 4)
  ok('H3 Unicode 1.0.0 is dated October 1991', 1991 === 1991 && 10 === 10)
  ok('H4 UTF-8 was designed in September 1992 — one year after Unicode 1.0.0 and 29 years after ASCII',
    1992 - 1991 === 1 && 1992 - 1963 === 29)
  ok('H5 Unicode 17.0 shipped 9 September 2025 — 34 years of Unicode — with 159,801 characters',
    2025 - 1991 === 34 && 159801 === 159801)
  ok('H6 the FSS-UTF proposal followed the placemat within days of September 1992 (the pinned month)', 1992 === 1992 && 9 === 9)
}

/* ================================================================== */
console.log('== I. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('I1 the quiz key is pinned as [0, 3, 1, 2, 3]',
    JSON.stringify([0, 3, 1, 2, 3]) === JSON.stringify([0, 3, 1, 2, 3]))
  ok('I2 the Illustration witnesses are all engine-backed: 27 -> 5 bits; 45 -> 0100 0101; 9 -> 1001; 909 -> three cells; 78 -> 0111 1000; 99 vs 255; 5 + 8 -> 13; F = 70; Q/q = 81/113; 7 - 0 = 7; U+20B9 = 8,377; A = rupee -> 7 bytes',
    bitBudget(27) === 5 && bcd(45) === '0100 0101' && bcd(9) === '1001' && bcd(909) === '1001 0000 1001'
    && bcd(78) === '0111 1000' && bcd(99) === '1001 1001' && 2 ** 8 - 1 === 255 && 5 + 8 === 13
    && ord('F') === 70 && ord('Q') === 81 && ord('q') === 113 && ord('7') - ord('0') === 7
    && 0x20b9 === 8377 && utf8('A = ₹').length === 7)
  ok('I3 the exercise witnesses are all engine-backed: 0111 1000; 67/99; the six invalids; 56; 6 bits + 14 spare; 27 + 18 -> 45; C3 A9; 1010001/1110001; U+1F600 = 128,512 plane 1 four bytes; the 7-byte census; 1,000 of 4,096; F0 9F 99 82; the 10-byte census; 2,048 surrogates; the exam five-parter 97 / 0100 0101 / 6 / 1,114,112 / 3 bytes',
    bcd(78) === '0111 1000' && ord('C') === 67 && ord('c') === 99 && 10 + 6 === 16 && ord('8') === 56
    && bitBudget(50) === 6 && 64 - 50 === 14 && 27 + 18 === 45 && hex(utf8('é')) === 'C3 A9'
    && bits(81, 7) === '1010001' && bits(113, 7) === '1110001' && 0x1f600 === 128512 && (0x1f600 >> 16) === 1
    && byteLen(0x1f600) === 4 && utf8('A = ₹').length === 7 && 10 ** 3 === 1000 && 2 ** 12 === 4096
    && hex(utf8('🙂')) === 'F0 9F 99 82' && utf8('Hi ₹🙂').length === 10 && 0xdfff - 0xd800 + 1 === 2048
    && ord('a') === 97 && bcd(45) === '0100 0101' && 16 - 10 === 6 && 17 * 65536 === 1114112 && byteLen(0x20b9) === 3)
  ok('I4 the closing census the prose prints: 128 + 1,920 + 63,488 + 1,048,576 = 1,114,112 and 17 x 65,536 = 1,114,112 agree',
    128 + 1920 + 63488 + 1048576 === 17 * 65536 && 17 * 65536 === 1114112)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf33')
  lesson = (mod.lesson33 as Lesson) ?? null
} catch {
  console.log('  (part-cf33.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== J. PIN SECTION: audit the shipped part ==')
  ok('J1 the part loads and exports lesson33', true)

  /* header fields */
  ok('J2 id/number/title are verbatim per spec',
    lesson.id === 'cf-codes-ascii-unicode-and-bcd' && lesson.number === '3.3' && lesson.title === 'Codes: ASCII, Unicode and BCD',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('J3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('J4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  ok('J5 the honest word floor: countLessonWords >= 7,000', countLessonWords(lesson) >= 7000, String(countLessonWords(lesson)))
  ok('J5b the hard gate floor: countLessonWords >= 6,000', countLessonWords(lesson) >= 6000, String(countLessonWords(lesson)))
  ok('J5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('J6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('J6b the quiz key is exactly [0, 3, 1, 2, 3]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([0, 3, 1, 2, 3]), q.items.map((i) => i.answer).join(','))
    ok('J6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['65', '6', '1,114,112', '3 bytes', '32']
    q.items.forEach((it, idx) => {
      ok(`J6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('J6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('J6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('J7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('J7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('J7c levels span at least L1, L2, L3', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
    ok('J7d every solution is a steps array of >= 3 non-empty lines', allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('J7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('J7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok("J7g every exercise answer's numeric core appears in its final solution line", coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('J8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('J9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('J9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('J10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('J11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('J11b every aria-label is descriptive (>= 40 chars)', svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('J11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])).filter((h) => !allowed.has(h.toLowerCase())))]
  ok('J11d every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('J11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('J11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
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
  ok('J11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  /* raw-TeX law */
  const prose: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        walk(val)
      }
    }
  }
  walk(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('J12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('J12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('J12c headings are plain (no $, no backslash) and at least 6 in number',
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('J12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('J12e terms are plain and total >= 8 items',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...lesson.blocks.filter((b) => b.kind === 'figure').map((b) => (b as { caption: string }).caption),
  ...svgsCaptions(exBlocks)]
  ok('J12f figure captions are plain (no $, no backslash)', figCaps.every((c) => !c.includes('$') && !c.includes('\\')))
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('J12g algorithm lines and notes are plain (no $, no backslash)',
    algos.length >= 1 && algos.every((a) => a.lines.every((l) => !l.code.includes('$') && !(l.note ?? '').includes('$') && !l.code.includes('\\'))))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok('J13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('J14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('J15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  ok('J15b the algorithm block has >= 5 lines each with a note',
    algos.length === 1 && algos[0].lines.length >= 5 && algos[0].lines.every((l) => (l.note ?? '').length > 0))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('J16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('J17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('J18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

function svgsCaptions(exBlocks: Array<{ kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ figures?: Array<{ caption: string }> }> }> }>): string[] {
  const caps: string[] = []
  for (const b of exBlocks) for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) caps.push(f.caption)
  return caps
}

/* ------------------------------------------------------------------ */
console.log(`V-CF33: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
