/**
 * V-CF38 — the verification engine for lesson 3.8
 * 'Decimal and Binary Number System' (the SYNTHESIS seat of chapter 3).
 *
 * Brute-forces EVERY number the lesson prints:
 *   - the counting strip 0-10 in both alphabets (and past ten)
 *   - the two anatomy expansions (4,728 decimal; 101101 binary = 45)
 *   - the four-dress witness 45 = 101101 base 2 = 55 base 8 = 2D base 16
 *   - every addition / subtraction / multiplication witness, with
 *     ripple-carry and borrow simulators counting the carries/borrows
 *   - the shift-double ladder 13 -> 26 -> 52 and the left-shift law
 *   - the digit trade: 7 vs 20 digits for a million, log2 10 = 3.3219...
 *   - the finger census (32 / 1,024 states), the billion counter (30 bits)
 *   - Boole 1854, Shannon 1937 (gap 83 years)
 * Then a final block re-reads the shipped part file (word floor, quiz
 * key, figure counts, id/number/title/prereqs, hygiene).
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf38.ts
 */
export {}

import { lesson38 } from './part-cf38'
import { countLessonWords } from '../../../src/data/library/types'

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ------------------------------------------------------------------ */
/* Binary arithmetic simulators (real ripple-carry / ripple-borrow)    */
/* ------------------------------------------------------------------ */
const val = (s: string): number => parseInt(s, 2)
const bin = (n: number): string => n.toString(2)

function addBin(a: string, b: string): { sum: string; carries: number } {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let carries = 0
  const out: string[] = []
  while (i >= 0 || j >= 0 || carry > 0) {
    const x = i >= 0 ? Number(a[i--]) : 0
    const y = j >= 0 ? Number(b[j--]) : 0
    const t = x + y + carry
    out.push(String(t % 2))
    carry = t >= 2 ? 1 : 0
    if (carry === 1) carries++
  }
  return { sum: out.reverse().join(''), carries }
}

function subBin(a: string, b: string): { diff: string; borrows: number } {
  let i = a.length - 1
  let j = b.length - 1
  let borrow = 0
  let borrows = 0
  const out: string[] = []
  while (i >= 0) {
    let x = Number(a[i--]) - borrow
    const y = j >= 0 ? Number(b[j--]) : 0
    if (x < y) { x += 2; borrow = 1; borrows++ } else { borrow = 0 }
    out.push(String(x - y))
  }
  let d = out.reverse().join('')
  d = d.replace(/^0+/, '') || '0'
  return { diff: d, borrows }
}

function bitsByPower(n: number): number {
  let b = 1
  let p = 2
  while (p < n) { p *= 2; b++ }
  return b
}
const decDigits = (n: number): number => String(n).length

/* ------------------------------------------------------------------ */
/* A. The counting strip 0-10 (and past ten)                           */
/* ------------------------------------------------------------------ */
const STRIP = ['0', '1', '10', '11', '100', '101', '110', '111', '1000', '1001', '1010']
for (let n = 0; n <= 10; n++) {
  ok(`A${String(n + 1).padStart(2, '0')} strip n=${n} is ${STRIP[n]}`, bin(n) === STRIP[n])
}
ok('A12 full strip joins to the pinned string',
  STRIP.join(',') === '0,1,10,11,100,101,110,111,1000,1001,1010')
ok('A13 counting past ten: 11, 12, 13 are 1011, 1100, 1101',
  bin(11) === '1011' && bin(12) === '1100' && bin(13) === '1101')
{
  const newCols: number[] = []
  let unitRolls = 0
  for (let n = 1; n <= 10; n++) {
    if (bin(n).length > bin(n - 1).length) newCols.push(n)
    if (n % 2 === 0) unitRolls++
  }
  ok('A14 binary opens new columns at 2, 4 and 8', JSON.stringify(newCols) === '[2,4,8]')
  ok('A15 binary units column rolled five times in 0-10', unitRolls === 5)
  const decNew: number[] = []
  for (let n = 1; n <= 10; n++) {
    if (decDigits(n) > decDigits(n - 1)) decNew.push(n)
  }
  ok('A16 decimal opens exactly one new column, at 10', JSON.stringify(decNew) === '[10]')
}
ok('A17 exercise strip 0-8 ends 1000 at count 8',
  bin(8) === '1000' && bin(7) === '111' && bin(6) === '110')

/* ------------------------------------------------------------------ */
/* B. The anatomy: both expansions, the four dresses, the trade        */
/* ------------------------------------------------------------------ */
ok('B01 4,728 = 4*1000 + 7*100 + 2*10 + 8*1', 4 * 1000 + 7 * 100 + 2 * 10 + 8 * 1 === 4728)
ok('B02 digits of 4,728 are 4, 7, 2, 8',
  String(4728).split('').map(Number).join(',') === '4,7,2,8')
ok('B03 decimal place values 10^3..10^0 are 1000, 100, 10, 1',
  [1000, 100, 10, 1].every((v, i) => v === 10 ** (3 - i)))
ok('B04 101101 base 2 parses to 45', val('101101') === 45)
ok('B05 101101 = 1*32 + 0*16 + 1*8 + 1*4 + 0*2 + 1*1 = 45',
  1 * 32 + 0 * 16 + 1 * 8 + 1 * 4 + 0 * 2 + 1 * 1 === 45)
ok('B06 binary place values 2^5..2^0 are 32, 16, 8, 4, 2, 1',
  [32, 16, 8, 4, 2, 1].every((v, i) => v === 2 ** (5 - i)))
ok('B07 45 in octal is 55 (5*8 + 5 = 45)', (45).toString(8) === '55' && 5 * 8 + 5 === 45)
ok('B08 45 in hex is 2D (2*16 + 13 = 45)', (45).toString(16) === '2d' && 2 * 16 + 13 === 45)
ok('B09 largest 3-digit decimal is 999 = 10^3 - 1', 999 === 10 ** 3 - 1)
ok('B10 largest 3-digit binary is 111 = 7 = 2^3 - 1', val('111') === 7 && 7 === 2 ** 3 - 1)
ok('B11 one million needs 7 decimal digits', decDigits(1000000) === 7)
ok('B12 one million needs 20 bits (2^19 < 10^6 <= 2^20)',
  bitsByPower(1000000) === 20 && 2 ** 19 === 524288 && 2 ** 20 === 1048576
  && 524288 < 1000000 && 1048576 >= 1000000)
ok('B13 log2 10 = 3.3219280948873623 (engine value)',
  Math.abs(Math.log2(10) - 3.3219280948873623) < 1e-15)
ok('B14 the honest rounding: about three and a third (3.32)',
  Math.round(Math.log2(10) * 100) / 100 === 3.32)
ok('B15 six decades x 3.3219... = 19.93 -> the printed 19.9 rounds up to 20 bits',
  Math.abs(6 * Math.log2(10) - 19.931568569324174) < 1e-12
  && Math.round(6 * Math.log2(10) * 10) / 10 === 19.9)
ok('B16 the decimal mirror 999 + 1 = 1000', 999 + 1 === 1000)
ok('B17 the 3.6 roll-over witness cited: 11111111 = 255 = 2^8 - 1, 100000000 = 256 = 2^8',
  val('11111111') === 255 && 255 === 2 ** 8 - 1 && val('100000000') === 256 && 256 === 2 ** 8)

/* ------------------------------------------------------------------ */
/* C. Addition witnesses (with carry counts)                           */
/* ------------------------------------------------------------------ */
ok('C01 operands parse: 1011 = 11 and 110 = 6', val('1011') === 11 && val('110') === 6)
{
  const r = addBin('1011', '110')
  ok('C02 1011 + 110 = 10001 (ripple-carry simulation)', r.sum === '10001')
  ok('C03 check in decimal: 11 + 6 = 17 = 10001 base 2',
    11 + 6 === 17 && val('10001') === 17 && bin(17) === '10001')
}
{
  const r = addBin('111', '1')
  ok('C04 111 + 1 = 1000 with exactly three carries',
    r.sum === '1000' && r.carries === 3)
  ok('C05 check: 7 + 1 = 8 = 2^3 = 1000 base 2',
    7 + 1 === 8 && 8 === 2 ** 3 && val('1000') === 8)
}
{
  const r = addBin('101', '101')
  ok('C06 101 + 101 = 1010', r.sum === '1010')
  ok('C07 check: 5 + 5 = 10 = 8 + 2 = 1010 base 2',
    5 + 5 === 10 && val('1010') === 10 && 8 + 2 === 10)
}
{
  const r = addBin('1011', '111')
  ok('C08 exercise: 1011 + 111 = 10010, and 11 + 7 = 18 = 16 + 2',
    r.sum === '10010' && 11 + 7 === 18 && val('10010') === 18 && 16 + 2 === 18)
}
{
  const r = addBin('1101', '1011')
  ok('C09 exercise: 1101 + 1011 = 11000 with four carries; 13 + 11 = 24 = 16 + 8',
    r.sum === '11000' && r.carries === 4 && 13 + 11 === 24 && val('11000') === 24 && 16 + 8 === 24)
}
{
  const r = addBin('1111', '1')
  ok('C10 exercise: 1111 + 1 = 10000 with four carries; 15 + 1 = 16 = 2^4',
    r.sum === '10000' && r.carries === 4 && 15 + 1 === 16 && 16 === 2 ** 4)
}
{
  let truth = true
  for (const a of [0, 1]) for (const b of [0, 1]) {
    if ((a + b) % 2 !== (a ^ b)) truth = false           // sum bit is XOR
    if (Math.floor((a + b) / 2) !== (a & b)) truth = false // carry bit is AND
  }
  ok('C11 half-adder truth: sum = XOR, carry = AND, over all four cases', truth)
}
{
  let truth = true
  for (const x of ['101', '1101', '11', '1', '10011']) {
    if (addBin(x, x).sum !== x + '0') truth = false
  }
  ok('C12 self-addition is a left shift: x + x = x with a 0 appended', truth)
}

/* ------------------------------------------------------------------ */
/* D. Subtraction witnesses (with borrow counts)                       */
/* ------------------------------------------------------------------ */
{
  const r = subBin('1010', '110')
  ok('D01 1010 - 110 = 100 (ripple-borrow simulation)', r.diff === '100')
  ok('D02 check: 10 - 6 = 4', 10 - 6 === 4 && val('100') === 4)
}
{
  const r = subBin('1100', '111')
  ok('D03 1100 - 111 = 101', r.diff === '101')
  ok('D04 check: 12 - 7 = 5 = 4 + 1', 12 - 7 === 5 && val('101') === 5 && 4 + 1 === 5)
}
{
  const r = subBin('1001', '110')
  ok('D05 exercise: 1001 - 110 = 11, and 9 - 6 = 3 = 2 + 1',
    r.diff === '11' && 9 - 6 === 3 && val('11') === 3 && 2 + 1 === 3)
}
{
  const r = subBin('100000', '1')
  ok('D06 exercise: 100000 - 1 = 11111 with a five-column borrow chain; 32 - 1 = 31 = 16+8+4+2+1',
    r.diff === '11111' && r.borrows === 5 && 32 - 1 === 31 && val('11111') === 31
    && 16 + 8 + 4 + 2 + 1 === 31)
  ok('D07 the numeral 100000 carries exactly five zero columns',
    ('100000'.split('0').length - 1) === 5)
}
ok('D08 a borrowed 1 arrives worth 10 base 2 (two)', val('10') === 2)

/* ------------------------------------------------------------------ */
/* E. Multiplication and the shift-double ladder                       */
/* ------------------------------------------------------------------ */
ok('E01 101 x 11 = 1111, and 5 x 3 = 15',
  val('101') * val('11') === 15 && bin(5 * 3) === '1111' && val('1111') === 15)
ok('E02 the decomposition 101 + 1010 = 1111 (5 + 10 = 15)',
  val('101') + val('1010') === 15 && addBin('101', '1010').sum === '1111')
ok('E03 1010 is 101 with a 0 appended, worth double (5 -> 10)',
  '1010' === '101' + '0' && val('1010') === 2 * val('101'))
ok('E04 1111 = 8 + 4 + 2 + 1', 8 + 4 + 2 + 1 === 15 && val('1111') === 15)
ok('E05 exercise: 110 x 101 = 11110, and 6 x 5 = 30',
  val('110') * val('101') === 30 && bin(30) === '11110' && val('11110') === 30)
ok('E06 partials 110 + 11000 = 11110 (6 + 24 = 30)',
  val('110') + val('11000') === 30 && addBin('110', '11000').sum === '11110')
ok('E07 11110 = 16 + 8 + 4 + 2', 16 + 8 + 4 + 2 === 30 && val('11110') === 30)
ok('E08 the ladder numerals: 13 -> 1101, 26 -> 11010, 52 -> 110100',
  bin(13) === '1101' && bin(26) === '11010' && bin(52) === '110100')
ok('E09 11010 is 1101 plus one 0, and 26 = 2 x 13',
  '11010' === '1101' + '0' && val('11010') === 26 && 26 === 2 * 13)
ok('E10 110100 is 11010 plus one 0, and 52 = 4 x 13',
  '110100' === '11010' + '0' && val('110100') === 52 && 52 === 4 * 13)
ok('E11 expansions: 26 = 16 + 8 + 2 and 52 = 32 + 16 + 4',
  16 + 8 + 2 === 26 && 32 + 16 + 4 === 52)
ok('E12 exercise: 1011 doubled twice -> 10110 = 22, 101100 = 44 (11 x 2, 11 x 4)',
  bin(11) === '1011' && val('10110') === 22 && val('101100') === 44
  && 22 === 2 * 11 && 44 === 4 * 11 && 16 + 4 + 2 === 22 && 32 + 8 + 4 === 44)
{
  let truth = true
  for (const n of [13, 5, 11, 7, 45, 1]) {
    for (let k = 1; k <= 3; k++) {
      if (val(bin(n) + '0'.repeat(k)) !== n * 2 ** k) truth = false
    }
  }
  ok('E13 the left-shift law: appending k zeros multiplies by 2^k (brute-forced)', truth)
}
ok('E14 the decimal childhood line: 10 x 10 = 100 products in the tables', 10 * 10 === 100)

/* ------------------------------------------------------------------ */
/* F. Fingers, the billion counter, dates, complements                 */
/* ------------------------------------------------------------------ */
ok('F01 one hand: 2^5 = 32 states', 2 ** 5 === 32)
ok('F02 two hands: 2^10 = 1,024 states', 2 ** 10 === 1024)
ok('F03 nineteen is 10011 = 16 + 2 + 1', bin(19) === '10011' && 16 + 2 + 1 === 19 && val('10011') === 19)
ok('F04 one-hand maximum: 11111 = 31 = 2^5 - 1', val('11111') === 31 && 31 === 2 ** 5 - 1)
ok('F05 two-hand maximum: 1,023 = 2^10 - 1 (and 100 fits on two hands)',
  1023 === 2 ** 10 - 1 && 100 <= 1023)
ok('F06 one billion needs 30 bits (2^29 = 536,870,912 < 10^9 <= 2^30 = 1,073,741,824)',
  bitsByPower(10 ** 9) === 30 && 2 ** 29 === 536870912 && 2 ** 30 === 1073741824
  && 536870912 < 10 ** 9 && 1073741824 >= 10 ** 9)
ok('F07 one billion needs 10 decimal digits', decDigits(10 ** 9) === 10)
ok('F08 nine decades x 3.3219... = 29.897... -> the printed 29.9 rounds up to 30',
  Math.abs(9 * Math.log2(10) - 29.897352853986263) < 1e-12
  && Math.round(9 * Math.log2(10) * 10) / 10 === 29.9)
{
  const boole = 1854
  const shannon = 1937
  ok('F09 Boole 1854, Shannon 1937 thesis, eighty-three years apart',
    boole === 1854 && shannon === 1937 && shannon - boole === 83)
}
ok('F10 the complement paragraph: 2^8 = 256 patterns; -128..+127 spans 256',
  2 ** 8 === 256 && 127 - -128 + 1 === 256)
ok('F11 11111111 + 1 rolls to 100000000 (255 + 1 = 256)',
  addBin('11111111', '1').sum === '100000000' && 255 + 1 === 256)

/* ------------------------------------------------------------------ */
/* G. Final block: re-read the shipped part                            */
/* ------------------------------------------------------------------ */
const L = lesson38
const J = JSON.stringify(L)

ok('G01 id is pinned', L.id === 'cf-decimal-and-binary-number-system')
ok('G02 number is 3.8', L.number === '3.8')
ok('G03 title is verbatim', L.title === 'Decimal and Binary Number System')
ok('G04 prerequisites are the two conversion crafts',
  JSON.stringify(L.prerequisites) === JSON.stringify(['cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion']))
ok('G05 sources are cs-cf-web-ground', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']))
ok('G06 concepts: 5 to 8 phrases', L.concepts.length >= 5 && L.concepts.length <= 8)
ok('G07 objectives: 5 to 6 lines, each opening the pinned way',
  (L.objectives?.length ?? 0) >= 5 && (L.objectives?.length ?? 0) <= 6
  && L.objectives!.every((o) => o.startsWith('By the end of this lesson')))

const wc = countLessonWords(L)
ok('G08 word floor: at least 7,000 words', wc >= 7000, `counted ${wc}`)

const figs = L.blocks.filter((b) => b.kind === 'figure')
ok('G09 body figures: at least 3 (4 shipped)', figs.length >= 3 && figs.length <= 4, `got ${figs.length}`)
ok('G10 every body figure is self-contained (viewBox, role, aria-label)',
  figs.every((f) => f.svg.includes('<svg') && f.svg.includes('viewBox="0 0 ')
    && f.svg.includes('role="img"') && f.svg.includes('aria-label=')))

const exBlocks = L.blocks.filter((b) => b.kind === 'exercises')
const allQs = exBlocks.flatMap((b) => b.sets.flatMap((s) => s.questions))
let solFigCount = 0
let perQOk = true
for (const q of allQs) {
  const n = q.figures?.length ?? 0
  solFigCount += n
  if (n > 2) perQOk = false
}
ok('G11 solution figures: at least 4 (5 shipped)', solFigCount >= 4, `got ${solFigCount}`)
ok('G12 no question carries more than 2 solution figures', perQOk)

const quizItems: { q: string; options: string[]; answer: number; explain: string }[] = (() => {
  const q = L.blocks.find((b) => b.kind === 'quiz')
  return q && q.kind === 'quiz' ? q.items : []
})()
ok('G13 quiz has exactly 5 items', quizItems.length === 5)
ok('G14 quiz key is [0,2,1,3,0]',
  JSON.stringify(quizItems.map((i) => i.answer)) === '[0,2,1,3,0]')
ok('G15 every quiz answer indexes its own options',
  quizItems.every((i) => i.answer >= 0 && i.answer < i.options.length && i.options.length >= 3))
ok('G16 every quiz explain argues the wrong options away (substantial text)',
  quizItems.every((i) => i.explain.length > 120))

const levels = new Set(exBlocks.flatMap((b) => b.sets.map((s) => s.level)))
ok('G17 exercises: 15 questions across sets', allQs.length === 15, `got ${allQs.length}`)
ok('G18 levels used include L1, L2 and L3', levels.has('L1') && levels.has('L2') && levels.has('L3'))
ok('G19 every exercise question ends in a crisp answer', allQs.every((q) => typeof q.answer === 'string' && q.answer.length > 0))

const examples = L.blocks.filter((b) => b.kind === 'example')
ok('G20 illustrations: 8 to 12 example blocks', examples.length >= 8 && examples.length <= 12, `got ${examples.length}`)

const allSvgs: string[] = []
for (const b of L.blocks) {
  if (b.kind === 'figure') allSvgs.push(b.svg)
  if (b.kind === 'example') for (const f of b.figures ?? []) allSvgs.push(f.svg)
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) allSvgs.push(f.svg)
}
ok('G21 svg census: 4 body + 5 solution = 9 svgs present', allSvgs.length === 9, `got ${allSvgs.length}`)
ok('G22 svg hygiene: no $, no backslash, no unicode subscript or minus signs',
  allSvgs.every((s) => !s.includes('$') && !s.includes('\\') && !s.includes('\u2082') && !s.includes('\u2212') && !s.includes('\u00d7') && !s.includes('\u00b7')))
{
  /* repair (this seat, CS RUN 6): the original regex carried a stray
   * trailing apostrophe — /font-size="(\d+(?:\.\d+)?)"'/ — which can never
   * match a well-formed SVG attribute list (it matched 0 sizes against the
   * shipped part, "min Infinity"). Aligned with the sibling engines
   * (v-cf36/v-cf37 both use /font-size="([\d.]+)"/g). Intent unchanged:
   * every font size >= 9px across > 40 text elements. */
  const sizes: number[] = []
  for (const s of allSvgs) for (const m of s.matchAll(/font-size="([\d.]+)"/g)) sizes.push(Number(m[1]))
  ok('G23 svg text is at least 9px everywhere', sizes.length > 40 && sizes.every((x) => x >= 9), `min ${Math.min(...sizes)}`)
}

ok('G24 pinned strings ship: the log value and the powers census',
  J.includes('3.3219') && J.includes('1{,}048{,}576') && J.includes('524{,}288')
  && J.includes('536{,}870{,}912') && J.includes('1{,}073{,}741{,}824'))
ok('G25 pinned strings ship: dates, finger census, witnesses',
  J.includes('1854') && J.includes('1937') && J.includes('eighty-three')
  && J.includes('1,023') && J.includes('1{,}024') && J.includes('31')
  && J.includes('999') && J.includes('10001'))
{
  const f2 = figs[1]
  ok('G26 the counting-strip figure carries every strip numeral 0-10',
    !!f2 && STRIP.every((s) => f2.svg.includes(`>${s}<`)))
}
ok('G27 the lesson names its doorstep books and the review',
  J.includes('Arithmetic and Number Systems') && J.includes('Digital Logic Design') && J.includes('3.R'))
ok('G28 the lesson cites the sibling crafts by lesson number',
  J.includes('3.6') && J.includes('3.7') && J.includes('3.2') && J.includes('3.1'))

/* ------------------------------------------------------------------ */
console.log(`V-CF38: ${P}/${P + F} GREEN (lesson words: ${wc})`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
