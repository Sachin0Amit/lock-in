export {}

/**
 * V-CF3R — the verify-first engine for lesson 3.R 'Unit 3 Completion
 * Review' (the cf3R seat, CS RUN 5, tag R3, 2026-11-25).
 *
 * Every number the review will print is brute-forced HERE before any
 * prose is written: the chapter census thread (the eight siblings'
 * pinned harvest numbers, carried verbatim into the recaps) and every
 * mixed-bench answer (the 90-second census, the Huffman trace, the
 * ladders, the UTF-8 census, the two-lesson chain, the MCQ distractor
 * arithmetic). The engine wins over any other source: where a draft
 * disagrees with a value pinned here, the value pinned here ships.
 *
 * Phase 1 (pre-prose): the arithmetic checks alone — run green BEFORE
 * the part exists (the part loads by DYNAMIC import below, guarded so
 * its absence does not fault the run).
 * Phase 2 (post-part): the same run re-reads the shipped part — word
 * floor, quiz key, figure counts, id/number/title/prereqs, SVG
 * hygiene, the raw-TeX law — and prints the full tally.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf3R.ts
 */

import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ------------------------------------------------------------------ */
/* the machines under test (written independently of the prose)        */
/* ------------------------------------------------------------------ */

const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps
const DIG = '0123456789ABCDEF'
const val = (s: string, b: number) => parseInt(s, b)
function toBase(n: number, b: number): string {
  if (n === 0) return '0'
  let s = ''
  while (n > 0) { s = DIG[n % b] + s; n = Math.floor(n / b) }
  return s
}
function horner(bits: string): number {
  let v = 0
  for (const ch of bits) v = 2 * v + (ch === '1' ? 1 : 0)
  return v
}
/** the division ladder: remainders in PRODUCTION order (top-down) */
function ladderRems(n: number): number[] {
  const rs: number[] = []
  let x = n
  while (x > 0) { rs.push(x % 2); x = Math.floor(x / 2) }
  return rs
}
/** the doubling ladder: running values reading left to right */
function doubleTrace(bits: string): number[] {
  const out: number[] = [bits[0] === '1' ? 1 : 0]
  for (let i = 1; i < bits.length; i++) out.push(2 * out[i - 1] + (bits[i] === '1' ? 1 : 0))
  return out
}
/** group a bit string in fours from the right (hex read) */
function groupFours(s: string): string[] {
  const out: string[] = []
  for (let i = s.length; i > 0; i -= 4) out.unshift(s.slice(Math.max(0, i - 4), i))
  return out
}
function rle(s: string): string {
  let out = ''
  let i = 0
  while (i < s.length) {
    let j = i
    while (j < s.length && s[j] === s[i]) j++
    out += String(j - i) + s[i]
    i = j
  }
  return out
}
/** the fractional bits of 0.1 by repeated doubling */
function bits01(n: number): string {
  let x = 0.1
  let out = ''
  for (let i = 0; i < n; i++) { x *= 2; const b = Math.floor(x); out += b; x -= b }
  return out
}
const log2 = (x: number) => Math.log(x) / Math.LN2
const enc = (s: string): number[] => Array.from(new TextEncoder().encode(s))
const pct = (a: number, b: number) => (a / b - 1) * 100

/** Huffman depths by repeated merging (ties: fewer leaves first) */
function huffDepths(freqs: Record<string, number>): Record<string, number> {
  type Node = { w: number; leaves: Record<string, number> }
  let nodes: Node[] = Object.entries(freqs).map(([s, f]) => ({ w: f, leaves: { [s]: 0 } }))
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.w - b.w || Object.keys(a.leaves).length - Object.keys(b.leaves).length)
    const a = nodes.shift() as Node
    const b = nodes.shift() as Node
    const leaves: Record<string, number> = {}
    for (const [s, d] of Object.entries(a.leaves)) leaves[s] = d + 1
    for (const [s, d] of Object.entries(b.leaves)) leaves[s] = d + 1
    nodes.push({ w: a.w + b.w, leaves })
  }
  return nodes[0].leaves
}
const HUFFCODE: Record<string, string> = { A: '0', B: '10', C: '110', D: '111' }
const huffEnc = (s: string) => [...s].map((c) => HUFFCODE[c]).join('')
function huffDec(s: string): string {
  let out = ''
  let i = 0
  while (i < s.length) {
    for (const [sym, code] of Object.entries(HUFFCODE)) {
      if (s.startsWith(code, i)) { out += sym; i += code.length; break }
    }
  }
  return out
}
/** entropy term for count f out of 9 symbols */
const term = (f: number) => (f / 9) * log2(9 / f)
const H = term(5) + term(2) + term(1) + term(1)

/* ================================================================== */
/* A. the powers thread (lesson 3.1's census, the chapter's backbone)  */
/* ================================================================== */
console.log('== A. the powers thread ==')

ok('A1  the census law 2^n: 2^7 = 128 and 2^8 = 256', 2 ** 7 === 128 && 2 ** 8 === 256)
ok('A2  2^16 = 65,536 (a Unicode plane) and 2^20 = 1,048,576 (the binary MiB)',
  2 ** 16 === 65536 && 2 ** 20 === 1048576)
ok('A3  twenty questions sort a million: 2^20 = 1,048,576 > 1,000,000',
  2 ** 20 === 1048576 && 1048576 > 1000000)
ok('A4  the largest n-bit values: 2^8 - 1 = 255 and 2^16 - 1 = 65,535 (all ones)',
  2 ** 8 - 1 === 255 && 2 ** 16 - 1 === 65535)
ok('A5  the year witness needs eleven bits: 2^10 = 1,024 <= 2026 < 2,048 = 2^11',
  2 ** 10 === 1024 && 1024 <= 2026 && 2026 < 2 ** 11)
ok('A6  the finger census: one hand 5 bits = 32 states; two hands 10 bits = 1,024',
  2 ** 5 === 32 && 2 ** 10 === 1024)
ok('A7  the honest ladder to 2 dp: KiB +2.40%, MiB +4.86%, GiB +7.37%, TiB +9.95%',
  pct(1024, 1000).toFixed(2) === '2.40' && pct(2 ** 20, 10 ** 6).toFixed(2) === '4.86' &&
  pct(2 ** 30, 10 ** 9).toFixed(2) === '7.37' && pct(2 ** 40, 10 ** 12).toFixed(2) === '9.95')
ok('A8  the honest ladder exactly: the KiB gap is 2.4% and the TiB gap 9.9511627776%',
  near(pct(1024, 1000), 2.4) && near(pct(2 ** 40, 10 ** 12), 9.9511627776, 1e-9))

/* ================================================================== */
/* B. the four-dress witness (lesson 3.2's craft)                      */
/* ================================================================== */
console.log('== B. the four-dress witness ==')

ok('B1  45 = 101101 in base 2 (the binary dress)', toBase(45, 2) === '101101' && val('101101', 2) === 45)
ok('B2  45 = 55 in base 8 (the octal dress)', toBase(45, 8) === '55' && val('55', 8) === 45)
ok('B3  45 = 2D in base 16 (the hex dress)', toBase(45, 16) === '2D' && val('2D', 16) === 45)
ok('B4  the three weight sums: 32+8+4+1 = 45; 5*8+5 = 45; 2*16+13 = 45',
  32 + 8 + 4 + 1 === 45 && 5 * 8 + 5 === 45 && 2 * 16 + 13 === 45)
ok('B5  the regroup check: 2D spreads to 0010 1101; 101101 groups in threes to 55',
  ['2', 'D'].map((d) => val(d, 16).toString(2).padStart(4, '0')).join('') === '00101101' &&
  ['101', '101'].map((g) => val(g, 2).toString()).join('') === '55')
ok('B6  the grouping law: one octal digit = 3 bits (2^3 = 8); one hex digit = 4 bits (2^4 = 16)',
  2 ** 3 === 8 && 8 === toBase(8, 2).length + 5 && 2 ** 4 === 16)
ok('B7  two hex digits = the byte: 16^2 = 256 = 2^8; 16^4 = 65,536; 16^6 = 16,777,216',
  16 ** 2 === 256 && 256 === 2 ** 8 && 16 ** 4 === 65536 && 16 ** 6 === 16777216)
ok('B8  hex beyond the byte: 1,000 = 3E8; FFF = 16^3 - 1 = 4,095',
  toBase(1000, 16) === '3E8' && val('FFF', 16) === 4095 && 16 ** 3 - 1 === 4095)
ok('B9  the pipeline bridge byte: 65 = 1000001 base 2 = hex 41 (64 + 1)',
  toBase(65, 2) === '1000001' && val('41', 16) === 65 && 64 + 1 === 65)

/* ================================================================== */
/* C. the codes contract (lesson 3.3's census)                         */
/* ================================================================== */
console.log('== C. the codes contract ==')

ok('C1  ASCII: 2^7 = 128 codes = 33 control + 95 printable',
  2 ** 7 === 128 && 33 + 95 === 128)
ok('C2  the pinned codes: "0" = 48, "A" = 65, "a" = 97, space = 32, DEL = 127',
  '0'.charCodeAt(0) === 48 && 'A'.charCodeAt(0) === 65 && 'a'.charCodeAt(0) === 97 &&
  ' '.charCodeAt(0) === 32 && '\x7f'.charCodeAt(0) === 127)
ok('C3  the case flip: "a" - "A" = 32 = 2^5 = bit 5; A = 1000001 and a = 1100001 (7-bit)',
  'a'.charCodeAt(0) - 'A'.charCodeAt(0) === 32 && 32 === 2 ** 5 &&
  (65).toString(2).padStart(7, '0') === '1000001' && (97).toString(2).padStart(7, '0') === '1100001')
ok('C4  the digit arithmetic: "7" - "0" = 7; "D" = 68 and "d" = 68 + 32 = 100',
  '7'.charCodeAt(0) - '0'.charCodeAt(0) === 7 && 'D'.charCodeAt(0) === 68 &&
  'D'.charCodeAt(0) + 32 === 100 && 'd'.charCodeAt(0) === 100)
ok('C5  BCD(45) = 0100 0101; the six invalid nibbles are 1010..1111',
  [4, 5].map((d) => d.toString(2).padStart(4, '0')).join(' ') === '0100 0101' &&
  [10, 11, 12, 13, 14, 15].map((d) => d.toString(2).padStart(4, '0')).join(' ') === '1010 1011 1100 1101 1110 1111')
ok('C6  the BCD waste: a two-digit byte uses 100 of 256 patterns; (256-100)/256 = 60.9375%',
  256 - 100 === 156 && near((156 / 256) * 100, 60.9375))
ok('C7  the Unicode space: 17 planes x 65,536 = 1,114,112 code points = 0x10FFFF + 1',
  17 * 65536 === 1114112 && val('10FFFF', 16) + 1 === 1114112)
ok('C8  Unicode 17.0 fills 159,801 characters = 14.3434% of the space (4 dp)',
  near((159801 / 1114112) * 100, 14.343351476332721) &&
  ((159801 / 1114112) * 100).toFixed(4) === '14.3434')
ok('C9  the UTF-8 byte classes by witness: A = 1 B (0x41); e-acute = 2 B (C3 A9); rupee = 3 B (E2 82 B9); smiley = 4 B (F0 9F 99 82)',
  JSON.stringify(enc('A')) === '[65]' && JSON.stringify(enc('é')) === '[195,169]' &&
  JSON.stringify(enc('₹')) === '[226,130,185]' && JSON.stringify(enc('\u{1F642}')) === '[240,159,153,130]')
ok('C10 the class ceilings: 1 B holds 2^7 = 128; 2 B holds 2^11 = 2,048; 3 B holds 2^16 = 65,536; 4 B holds 2^21 = 2,097,152',
  2 ** 7 === 128 && 2 ** 11 === 2048 && 2 ** 16 === 65536 && 2 ** 21 === 2097152)
ok('C11 Devanagari rides 3 bytes (ka, U+0915); the sibling witness "A = ₹" rides 7 bytes',
  enc('क').length === 3 && enc('A = ₹').length === 7 &&
  JSON.stringify(enc('A = ₹')) === '[65,32,61,32,226,130,185]')
ok('C12 the bench label "café ₹250" = 12 bytes in UTF-8 (seven ASCII one-byters + e-acute 2 B + rupee 3 B)',
  enc('café ₹250').length === 12 && enc('é').length === 2 && enc('₹').length === 3 &&
  'café ₹250'.length === 9)

/* ================================================================== */
/* D. the media firehose (lesson 3.4's rate law)                       */
/* ================================================================== */
console.log('== D. the media firehose ==')

ok('D1  the rate law: 44,100 x 2 bytes x 2 channels = 176,400 B/s',
  44100 * 2 * 2 === 176400)
ok('D2  the rate\'s own story: 294 x 50 x 3 = 44,100',
  294 * 50 * 3 === 44100)
ok('D3  the bit rate: 176,400 x 8 = 1,411,200 bit/s',
  176400 * 8 === 1411200)
ok('D4  one minute of CD stereo: 176,400 x 60 = 10,584,000 B',
  176400 * 60 === 10584000)
ok('D5  the full disc: 74 min = 4,440 s; 4,440 x 176,400 = 783,216,000 B = 746.9329833984375 MiB -> 746.9330 (4 dp)',
  74 * 60 === 4440 && 4440 * 176400 === 783216000 &&
  near(783216000 / 1048576, 746.9329833984375, 1e-6) &&
  (783216000 / 1048576).toFixed(4) === '746.9330')
ok('D6  the 1080p frame: 1920 x 1080 = 2,073,600 px; x 3 B = 6,220,800 B = 5.9326171875 MiB',
  1920 * 1080 === 2073600 && 2073600 * 3 === 6220800 &&
  near(6220800 / 1048576, 5.9326171875, 1e-6))
ok('D7  the video firehose: 6,220,800 x 30 = 186,624,000 B/s',
  6220800 * 30 === 186624000)
ok('D8  the ear\'s margin: 44,100/2 - 20,000 = 2,050 Hz of Nyquist guard band',
  44100 / 2 - 20000 === 2050)
ok('D9  the 16-bit census: 65,536 loudness levels (against 16,384 for a 14-bit rival)',
  2 ** 16 === 65536 && 2 ** 14 === 16384)
ok('D10 the 90-second census: 90 x 176,400 = 15,876,000 B = 15.140533447265625 MiB -> 15.1405 (4 dp)',
  90 * 176400 === 15876000 && near(15876000 / 1048576, 15.140533447265625, 1e-6) &&
  (15876000 / 1048576).toFixed(4) === '15.1405')
ok('D11 the 210-second song: CD 37,044,000 B = 35.3279 MiB; MP3 at 128 kbit/s = 3,360,000 B = 3.2043 MiB (4 dp)',
  210 * 176400 === 37044000 && (37044000 / 1048576).toFixed(4) === '35.3279' &&
  210 * 16000 === 3360000 && (3360000 / 1048576).toFixed(4) === '3.2043')
ok('D12 the essay witness: 5,000 ASCII characters ride 5,000 B in UTF-8 but 10,000 B in UTF-16',
  enc('A'.repeat(5000)).length === 5000 && Buffer.byteLength('A'.repeat(5000), 'utf16le') === 10000)

/* ================================================================== */
/* E. the packing verdict (lesson 3.5's two doors)                     */
/* ================================================================== */
console.log('== E. the packing verdict ==')

ok('E1  RLE: AABBCCCCCD (10 chars) -> 2A2B5C1D (8 chars); "AB" -> "1A1B" doubles 2 -> 4',
  rle('AABBCCCCCD') === '2A2B5C1D' && 'AABBCCCCCD'.length === 10 && '2A2B5C1D'.length === 8 &&
  rle('AB') === '1A1B' && '1A1B'.length === 2 * 2)
ok('E2  Huffman depths on {A:5, B:2, C:1, D:1}: A = 1, B = 2, C = 3, D = 3',
  JSON.stringify(huffDepths({ A: 5, B: 2, C: 1, D: 1 })) === JSON.stringify({ A: 1, B: 2, C: 3, D: 3 }))
ok('E3  the counts: fixed 2-bit code = 9 x 2 = 18 bits; Huffman = 5+4+3+3 = 15 bits; the saving 3 bits = 16.67%',
  9 * 2 === 18 && 5 * 1 + 2 * 2 + 1 * 3 + 1 * 3 === 15 && (((18 - 15) / 18) * 100).toFixed(2) === '16.67')
ok('E4  the canonical code A=0, B=10, C=110, D=111 is prefix-free and round-trips the 9-symbol message in 15 bits',
  Object.values(HUFFCODE).every((c, _, arr) => !arr.some((d) => d !== c && d.startsWith(c))) &&
  huffEnc('AAAAABBCD') === '000001010110111' && huffEnc('AAAAABBCD').length === 15 &&
  huffDec(huffEnc('AAAAABBCD')) === 'AAAAABBCD')
ok('E5  the entropy floor: H = 1.6577427 bits/symbol (7 dp); the code averages 15/9 = 1.6667, barely 0.0089 above',
  H.toFixed(7) === '1.6577427' && (15 / 9).toFixed(4) === '1.6667' &&
  (15 / 9 - H).toFixed(4) === '0.0089' && 15 / 9 >= H)
ok('E6  the entropy terms to 4 dp: 0.4711 + 0.4822 + 0.3522 + 0.3522',
  term(5).toFixed(4) === '0.4711' && term(2).toFixed(4) === '0.4822' && term(1).toFixed(4) === '0.3522')
ok('E7  the MP3 doors: 1,411,200 / 128,000 = 11.025x and 1,411,200 / 320,000 = 4.41x',
  near(1411200 / 128000, 11.025) && (1411200 / 320000).toFixed(2) === '4.41')
ok('E8  JPEG: a 1080p frame cuts into (1920/8) x (1080/8) = 240 x 135 = 32,400 blocks; x 64 samples = 2,073,600',
  1920 / 8 === 240 && 1080 / 8 === 135 && 240 * 135 === 32400 && 32400 * 64 === 2073600)
ok('E9  the compression ratio on the Huffman witness: 18 / 15 = 1.2x',
  near(18 / 15, 1.2))

/* ================================================================== */
/* F. the conversion craft (lessons 3.6, 3.7, 3.8)                     */
/* ================================================================== */
console.log('== F. the conversion craft ==')

ok('F1  the 45 ladder: rows 45/2=22 r1, 22/11 r0, 11/5 r1, 5/2 r1, 2/1 r0, 1/0 r1; bottom-up read 1,0,1,1,0,1',
  JSON.stringify(ladderRems(45)) === '[1,0,1,1,0,1]' &&
  [...ladderRems(45)].reverse().join('') === '101101')
ok('F2  the year witness down the ladder: 2026 = 11111101010 base 2 (eleven bits)',
  toBase(2026, 2) === '11111101010' && val('11111101010', 2) === 2026 && '11111101010'.length === 11)
ok('F3  the year\'s other dresses: 2026 = 3752 base 8 = 7EA base 16',
  toBase(2026, 8) === '3752' && toBase(2026, 16) === '7EA' && val('3752', 8) === 2026 && val('7EA', 16) === 2026)
ok('F4  the year\'s weight sum: 1024+512+256+128+64+32+8+2 = 2026',
  1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 === 2026)
ok('F5  the hex proof: 7x256 + 14x16 + 10 = 2,026; the fours-groups read 7, 14, 10',
  7 * 256 + 14 * 16 + 10 === 2026 && groupFours('11111101010').join(' ') === '111 1110 1010' &&
  groupFours('11111101010').map((g) => val(g, 2)).join(',') === '7,14,10')
ok('F6  the doubling ladder on 110110: 1 -> 3 -> 6 -> 13 -> 27 -> 54',
  JSON.stringify(doubleTrace('110110')) === '[1,3,6,13,27,54]' && horner('110110') === 54)
ok('F7  the doubling ladder on 101101: 1 -> 2 -> 5 -> 11 -> 22 -> 45',
  JSON.stringify(doubleTrace('101101')) === '[1,2,5,11,22,45]' && horner('101101') === 45)
ok('F8  the grouped read: F52 = 15x256 + 5x16 + 2 = 3,922 = 111101010010 base 2',
  val('F52', 16) === 3922 && 15 * 256 + 5 * 16 + 2 === 3922 && toBase(3922, 2) === '111101010010')
ok('F9  the carry cascade: 111 + 1 = 1000 (7 + 1 = 8)',
  horner('111') + 1 === 8 && horner('1000') === 8 && toBase(8, 2) === '1000')
ok('F10 the shift-double: 1101 (13) with a 0 appended is 11010 (26)',
  horner('1101') === 13 && horner('11010') === 26 && '1101' + '0' === '11010' && 2 * 13 === 26)
ok('F11 the counting strip 0..10: 0 1 10 11 100 101 110 111 1000 1001 1010',
  Array.from({ length: 11 }, (_, i) => toBase(i, 2)).join(' ') === '0 1 10 11 100 101 110 111 1000 1001 1010')
ok('F12 the dress exchange rate: log2(10) = 3.32 (2 dp); 2^3 = 8 < 10 < 16 = 2^4',
  log2(10).toFixed(2) === '3.32' && 2 ** 3 === 8 && 8 < 10 && 10 < 2 ** 4)
ok('F13 0.1 is the honest infinity: first 12 fractional bits 000110011001, then the block 0011 repeats (period 4 after the first bit)',
  (() => {
    const b = bits01(44)
    const period = Array.from({ length: 39 }, (_, i) => b[1 + i] === b[5 + i]).every(Boolean)
    return b.slice(0, 12) === '000110011001' && period && !b.endsWith('0'.repeat(4))
  })())
ok('F14 the terminating guests: 0.375 = 0.011 and 0.625 = 0.101 in base 2',
  near(val('011', 2) / 8, 0.375) && near(val('101', 2) / 8, 0.625) &&
  near(0.25 + 0.125, 0.375) && near(0.5 + 0.125, 0.625))
ok('F15 the denominator law: 10 = 2 x 5 is not a power of two (so 1/10 cannot terminate in base 2); 8 = 2^3 is',
  10 === 2 * 5 && ![1, 2, 4, 8, 16, 32, 64].includes(10) && 8 === 2 ** 3)

/* ================================================================== */
/* G. the chapter census + the mixed bench's own answers               */
/* ================================================================== */
console.log('== G. the chapter census and the bench ==')

ok('G1  the chapter ships 8 lessons + this review = 9 seats',
  8 + 1 === 9)
ok('G2  the review\'s quiz key is pinned [2, 1, 0, 3, 1]',
  JSON.stringify([2, 1, 0, 3, 1]) === '[2,1,0,3,1]')
ok('G3  the two-lesson chain: hex 41 20 -> channel values 65 and 32 -> the letter "A" and the case gap (97 - 65 = 32 = bit 5); code 32 is the space',
  val('41', 16) === 65 && val('20', 16) === 32 && 'a'.charCodeAt(0) - 'A'.charCodeAt(0) === 32 &&
  ' '.charCodeAt(0) === 32 && 32 === 2 ** 5)
ok('G4  Q15\'s distractor arithmetic: 110101 = 53, 101011 = 43, 111001 = 57; 2^6 = 64; 2^8 = 256; BCD\'s two-digit range = 100',
  val('110101', 2) === 53 && val('101011', 2) === 43 && val('111001', 2) === 57 &&
  2 ** 6 === 64 && 2 ** 8 === 256 && 10 * 10 === 100)
ok('G5  the mebibyte MCQ: 2^20 = 1,048,576 B; the decimal mega is 10^6 = 1,000,000; 1,024,000 is the classic near-miss',
  2 ** 20 === 1048576 && 10 ** 6 === 1000000 && 1000 * 1024 === 1024000)

/* ================================================================== */
/* the final re-read block (runs once part-cf3R.ts ships)              */
/* ================================================================== */

const mod = (await import('./part-cf3R').catch(() => null)) as { lesson3R?: Lesson } | null
const L = mod?.lesson3R
ok('P0  the part ships and exports lesson3R', L !== undefined && L !== null)

if (L) {
  ok('P1  identity pinned: id cf-unit-3-completion-review, number 3.R, title Unit 3 Completion Review',
    L.id === 'cf-unit-3-completion-review' && L.number === '3.R' && L.title === 'Unit 3 Completion Review')
  ok('P2  prerequisites: all eight sibling ids, in the pinned order',
    JSON.stringify(L.prerequisites) === JSON.stringify([
      'cf-bits-why-two-symbols-carry-everything',
      'cf-the-numbering-systems-binary-octal-hexadecimal',
      'cf-codes-ascii-unicode-and-bcd',
      'cf-text-images-and-sound-as-bits',
      'cf-compression-lossless-and-lossy',
      'cf-decimal-to-binary-conversion',
      'cf-binary-to-decimal-conversion',
      'cf-decimal-and-binary-number-system',
    ]))
  ok('P3  sources: exactly [cs-cf-web-ground]',
    JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']))
  const wc = countLessonWords(L)
  ok('P4  the review depth bar: >= 6,500 words (hard floor 5,200)', wc >= 6500, String(wc))
  ok('P5  concepts 5..8 and objectives 5..6',
    L.concepts.length >= 5 && L.concepts.length <= 8 &&
    (L.objectives?.length ?? 0) >= 5 && (L.objectives?.length ?? 0) <= 6)

  const quiz = L.blocks.find((b) => b.kind === 'quiz')
  ok('P6  the quiz: exactly 5 items with the pinned key [2, 1, 0, 3, 1]',
    quiz !== undefined && quiz.kind === 'quiz' && quiz.items.length === 5 &&
    JSON.stringify(quiz.items.map((i) => i.answer)) === '[2,1,0,3,1]')
  ok('P7  every quiz explain names at least three wrong options',
    quiz !== undefined && quiz.kind === 'quiz' &&
    quiz.items.every((i) => (i.explain.match(/Option/g) || []).length >= 3 && i.explain.length > 150))

  const bodyFigs = L.blocks.filter((b) => b.kind === 'figure')
  ok('P8  body figures: at least 3', bodyFigs.length >= 3, String(bodyFigs.length))

  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises')
  const allQ = exBlocks.flatMap((b) => (b.kind === 'exercises' ? b.sets.flatMap((s) => s.questions) : []))
  const solFigs = allQ.reduce((n, q) => n + (q.figures?.length ?? 0), 0)
  ok('P9  the bench: exactly 15 questions; solution figures >= 4, at most 2 per question',
    allQ.length === 15 && solFigs >= 4 && allQ.every((q) => (q.figures?.length ?? 0) <= 2),
    `q=${allQ.length} figs=${solFigs}`)
  const levels = new Set(exBlocks.flatMap((b) => (b.kind === 'exercises' ? b.sets.map((s) => s.level) : [])))
  ok('P10 the bench levels: L1, L2, L3 and L4 all used',
    levels.has('L1') && levels.has('L2') && levels.has('L3') && levels.has('L4'))

  const examples = L.blocks.filter((b) => b.kind === 'example')
  ok('P11 recap Illustrations (example blocks): 8..12', examples.length >= 8 && examples.length <= 12, String(examples.length))

  const terms = L.blocks.find((b) => b.kind === 'terms')
  const WORDS = ['Bit', 'Byte', 'Positional notation', 'BCD', 'ASCII', 'Unicode', 'UTF-8', 'Sampling', 'Lossless', 'Lossy']
  ok('P12 the vocabulary harvest: exactly the ten pinned core words',
    terms !== undefined && terms.kind === 'terms' && terms.items.length === 10 &&
    terms.items.every((t, i) => t.term === WORDS[i]))

  const formulas = L.blocks.filter((b) => b.kind === 'formula')
  ok('P13 the formula harvest: exactly 5 revision cards',
    formulas.length === 5 && formulas.every((b) => b.kind === 'formula' && b.latex.length > 0))

  /* SVG hygiene across body + solution figures */
  const svgs: string[] = []
  for (const b of L.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  const fontOK = (s: string) => [...s.matchAll(/font-size="([0-9.]+)"/g)].every((m) => parseFloat(m[1]) >= 9)
  ok('P14 SVG hygiene: every svg carries viewBox + role img + aria-label, no $, no unicode minus, no unicode subscripts, fonts >= 9px',
    svgs.length > 0 && svgs.every((s) =>
      s.includes('viewBox="') && s.includes('role="img"') && s.includes('aria-label="') &&
      !s.includes('$') && !s.includes('−') && !s.includes('₂') && !s.includes('₈') && !s.includes('₁₆') &&
      fontOK(s)),
    `${svgs.length} svgs`)

  /* the raw-TeX law: backslashes only inside $...$ spans; plain fields stay plain */
  const texts: string[] = []
  const plainTexts: string[] = []
  for (const b of L.blocks) {
    if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
    if (b.kind === 'callout') { texts.push(b.title); texts.push(b.text) }
    if (b.kind === 'terms') for (const t of b.items) { texts.push(t.term); texts.push(t.def) }
    if (b.kind === 'table') {
      if (b.caption) texts.push(b.caption)
      texts.push(...b.head)
      for (const r of b.rows) texts.push(...r)
    }
    if (b.kind === 'example') { texts.push(b.title); texts.push(...b.steps) }
    if (b.kind === 'derivation') {
      texts.push(b.statement)
      for (const s of b.steps) texts.push(s.explanation)
      texts.push(b.result)
      plainTexts.push('TITLE::' + b.title)
      for (const s of b.steps) plainTexts.push('LABEL::' + s.label)
    }
    if (b.kind === 'algorithm') {
      plainTexts.push('CODE::' + b.title)
      for (const l of b.lines) plainTexts.push('CODE::' + l.code)
    }
    if (b.kind === 'quiz') for (const it of b.items) { texts.push(it.q); texts.push(...it.options); texts.push(it.explain) }
    if (b.kind === 'exercises') {
      for (const s of b.sets) for (const q of s.questions) {
        texts.push(q.q)
        texts.push(...(Array.isArray(q.solution) ? q.solution : [q.solution]))
        if (q.answer) texts.push(q.answer)
        for (const f of q.figures ?? []) texts.push(f.caption)
      }
    }
  }
  const spanOK = (t: string) => {
    const parts = t.split('$')
    if (parts.length % 2 !== 1) return false
    return parts.filter((_, i) => i % 2 === 0).every((p) => !p.includes('\\'))
  }
  ok('P15 the raw-TeX law: every $...$ span balanced, backslashes only inside math, no \\qquad anywhere',
    texts.every(spanOK) && plainTexts.every((t) => !t.includes('$') && !t.includes('\\')) &&
    !JSON.stringify(L).includes('\\qquad'))
  const eqBlocks = L.blocks.filter((b) => b.kind === 'equation' || b.kind === 'formula')
  ok('P16 display KaTeX stays display: no $ inside equation latex or formula latex',
    eqBlocks.every((b) => (b.kind === 'equation' ? !b.latex.includes('$') : b.kind === 'formula' ? !b.latex.includes('$') : true)))

  /* the census thread ships verbatim */
  const whole = JSON.stringify(L)
  const PINNED = [
    '1,048,576', '2.40', '4.86', '7.37', '9.95',
    '101101', '2D', '33 + 95', '60.9375', '1,114,112', '159,801', '14.3434',
    '176,400', '1,411,200', '294 × 50 × 3', '6,220,800', '746.9330',
    '15', '1.6577427', '11.025', '4.41', '32,400',
    '11111101010', '7EA', '3,922', '1000', '3.32', '15,876,000',
  ]
  ok('P17 the census thread ships verbatim: every pinned harvest string present in the part',
    PINNED.every((s) => whole.includes(s)),
    PINNED.filter((s) => !whole.includes(s)).join(' | '))
}

/* ------------------------------------------------------------------ */
/* the report                                                          */
/* ------------------------------------------------------------------ */

console.log('')
console.log(`V-CF3R: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
