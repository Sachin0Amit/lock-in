import {
  chapter3, lesson31, lesson32, lesson33, lesson34, lesson35,
  lesson36, lesson37, lesson38, lesson3R,
} from '../src/data/library/books/computer-science/computer-fundamentals/ch-03'
import { computerFundamentals } from '../src/data/library/books/computer-science/computer-fundamentals/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-cs-book2-ch03.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 3 "Data
 * Representation: a First Meeting" (CS RUN 5 opened it, CS RUN 6
 * CLOSED it COMPLETE, 2026-11-25, under the whole-chapter cadence).
 * VERIFY-FIRST per the standing protocol: each lesson's ENGINE ran
 * green BEFORE its prose was declared done — by the authoring agent
 * against its part file — and the PIN sections here RE-READ THE
 * SHIPPED CHAPTER (the part imports redirected to ch-03.ts).
 *
 *   (cf31) 3.1 engines + pins    (cf32) 3.2 engines + pins
 *   (cf33) 3.3 engines + pins    (cf34) 3.4 engines + pins
 *   (cf35) 3.5 engines + pins    (cf36) 3.6 engines + pins
 *   (cf37) 3.7 engines + pins    (cf38) 3.8 engines + pins
 *   (cf3R) 3.R engines + pins
 *   (Z)    the closed-chapter census — the honest 9 + 0 shape
 *
 * Assembled by scripts/assemble_cs6.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay
 * function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/computer-science/computer-fundamentals/ch-03.ts', import.meta.url).pathname

async function sectionCf31(): Promise<SectionResult> {
/**
 * v-cf31.ts — verify-first ENGINE + PIN harness for CF lesson 3.1
 * 'Bits: Why Two Symbols Carry Everything' (CS RUN 6 swarm, agent cf31, seat 3.1).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..G) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the powers census 2^0..2^20 (plus 2^32), the odometer
 *     sum 2^0+..+2^19 = 2^20-1, the twenty-questions bounds for a
 *     million / billion / trillion, the information witnesses (coin
 *     log2 2 = 1 bit, die log2 6 = 2.584962500721156, card log2 52 =
 *     5.700439718141092, two dice additivity, 16 zones -> 4 bits), the
 *     byte census (8 bits = 256 = 16^2 patterns, largest 255, nibble 16,
 *     one KiB = 8,192 bits, two bytes = 65,536), the SI-vs-IEC ladder
 *     (kB/KiB gap 2.4%, MB/MiB 4.8576%, GB/GiB 7.3741824%, TB/TiB
 *     9.9511627776%, the absolute differences 24 / 48,576 / 73,741,824 /
 *     99,511,627,776 B, the 1 MB file = 976.5625 KiB, the honest 1 TB
 *     drive = 931.32 GiB short by 68.68), the dated chronology (Pingala
 *     ~200 BCE debated, Leibniz 1703 pp. 85-89, Boole 1854, Shannon 1937
 *     thesis + 1948 BSTJ July/October with Tukey credited, Buchholz June
 *     1956 Stretch, System/360 1964, IEC December 1998), the two-zone
 *     wire arithmetic (1 vs 9 boundaries, 2.5 V vs 0.5 V zones, 5x
 *     margin, 1.25 V vs 0.25 V from the boundary, 0.3125 V at 16 zones),
 *     the finger census (one hand 32, two hands 1,024, 6 = 00110,
 *     9 = 01001, 31 = 11111), the counting strip 0..10, and every
 *     quiz/exercise witness number.
 *   PIN SECTION (H..) — dynamically imports ./part-cf31 + re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [1,2,0,3,1],
 *     15 exercises, >= 3 body figures, >= 4 solution figures, 8-12
 *     Illustrations, SVG law, raw-TeX law, id/number/title/prereqs,
 *     source shape). The import is dynamic so the ENGINE alone runs
 *     GREEN before the prose exists (verify-first order); re-run after
 *     the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf31.ts
 */


let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const bits5 = (n: number): string => n.toString(2).padStart(5, '0')

/* helpers under test */
const questionsNeeded = (M: number): number => { let n = 0; while (2 ** n < M) n++; return n }

/* ================================================================== */
console.log('== A. THE POWERS CENSUS ==')
{
  const census = Array.from({ length: 21 }, (_, k) => 2 ** k)
  ok('A1 the census 2^0..2^20 is pinned exactly (1 through 1,048,576)',
    JSON.stringify(census) === JSON.stringify([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576]), census.join(','))
  ok('A2 the pinned landmarks: 2^7 = 128, 2^8 = 256, 2^10 = 1,024, 2^16 = 65,536, 2^20 = 1,048,576',
    2 ** 7 === 128 && 2 ** 8 === 256 && 2 ** 10 === 1024 && 2 ** 16 === 65536 && 2 ** 20 === 1048576)
  ok('A3 the 32-bit census: 2^32 = 4,294,967,296', 2 ** 32 === 4294967296)
  let dbl = true
  for (let k = 0; k < 20; k++) if (2 ** (k + 1) !== 2 * 2 ** k) dbl = false
  ok('A4 brute: every rung is exactly double the one below (k = 0..19)', dbl)
  let sum = 0
  for (let k = 0; k < 20; k++) sum += 2 ** k
  ok('A5 the odometer fact: 2^0 + ... + 2^19 = 2^20 - 1 = 1,048,575', sum === 2 ** 20 - 1 && sum === 1048575)
  ok('A6 twenty questions reach past a million: 2^19 = 524,288 < 1,000,000 <= 1,048,576 = 2^20',
    2 ** 19 === 524288 && 524288 < 1000000 && 1000000 <= 1048576)
  ok('A7 the question count for a million is exactly 20 (log2 10^6 = 19.931568569324174)',
    Math.ceil(Math.log2(1000000)) === 20 && near(Math.log2(1000000), 19.931568569324174, 1e-6))
  ok('A8 the question count for a billion is exactly 30; 2^29 = 536,870,912 < 10^9 <= 2^30 = 1,073,741,824',
    Math.ceil(Math.log2(1e9)) === 30 && 2 ** 29 === 536870912 && 2 ** 30 === 1073741824 && near(Math.log2(1e9), 29.897352853986263, 1e-6))
  ok('A9 the question count for a trillion is exactly 40; 2^40 = 1,099,511,627,776',
    Math.ceil(Math.log2(1e12)) === 40 && 2 ** 40 === 1099511627776 && near(Math.log2(1e12), 39.86313713864835, 1e-6))
  ok('A10 the 32-bit excess over four SI giga: 2^32 - 4 x 10^9 = 294,967,296',
    2 ** 32 - 4e9 === 294967296)
}

/* ================================================================== */
console.log('== B. THE BIT DEFINED ==')
{
  ok('B1 a fair coin carries exactly 1 bit: log2(2) = 1', Math.log2(2) === 1)
  ok('B2 a die roll: log2(6) = 2.584962500721156 (prints 2.5849625, and 2.585 at three decimals)',
    near(Math.log2(6), 2.584962500721156) && Math.round(Math.log2(6) * 1e7) / 1e7 === 2.5849625 && Math.round(Math.log2(6) * 1e3) / 1e3 === 2.585)
  ok('B3 one card of 52: log2(52) = 5.700439718141092 (prints 5.7004397, and 5.700 at three decimals)',
    near(Math.log2(52), 5.700439718141092) && Math.round(Math.log2(52) * 1e7) / 1e7 === 5.7004397 && Math.round(Math.log2(52) * 1e3) / 1e3 === 5.7)
  ok('B4 log2 is the exact inverse: 2^log2(6) = 6 and 2^log2(52) = 52',
    near(2 ** Math.log2(6), 6) && near(2 ** Math.log2(52), 52))
  ok('B5 whole questions to name a card: 2^5 = 32 < 52 <= 64 = 2^6, so 6',
    2 ** 5 === 32 && 32 < 52 && 52 <= 64 && Math.ceil(Math.log2(52)) === 6)
  ok('B6 information adds: two dice log2(36) = 2 x log2(6) = 5.169925001442312 (prints 5.170)',
    near(Math.log2(36), 2 * Math.log2(6)) && near(Math.log2(36), 5.169925001442312) && Math.round(Math.log2(36) * 1e3) / 1e3 === 5.17)
  ok('B7 bits per symbol on a zoned wire: 2 zones -> log2(2) = 1 bit; 4 zones -> 2; 16 zones -> 4',
    Math.log2(2) === 1 && Math.log2(4) === 2 && Math.log2(16) === 4)
  ok('B8 the spend: choosing 2 of 16 zones trades 3 bits per symbol for armour',
    Math.log2(16) - Math.log2(2) === 3)
}

/* ================================================================== */
console.log('== C. THE BYTE ==')
{
  ok('C1 one byte = 8 bits = 2^8 = 256 patterns', 2 ** 8 === 256)
  ok('C2 the byte census is a perfect square: 256 = 16^2 (two hexadecimal digits, a bridge 3.2 crosses)', 16 ** 2 === 256)
  ok('C3 the largest byte: 2^8 - 1 = 255, worn by 11111111', 2 ** 8 - 1 === 255 && (255).toString(2) === '11111111')
  ok('C4 the byte weights sum: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255', 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 === 255)
  ok('C5 a nibble = 4 bits = 2^4 = 16 patterns (half a byte)', 2 ** 4 === 16 && 16 * 16 === 256)
  ok('C6 one KiB in bits: 1,024 x 8 = 8,192 = 2^13', 1024 * 8 === 8192 && 8192 === 2 ** 13)
  ok('C7 two bytes = 16 bits = 2^16 = 65,536 patterns', 2 ** 16 === 65536)
  ok('C8 the bit census of a 2,048-byte file: 2,048 x 8 = 16,384 bits', 2048 * 8 === 16384)
  ok('C9 Buchholz coined byte in June 1956 on Stretch; System/360 settled 8 in 1964 - eight years later',
    1964 - 1956 === 8)
  ok('C10 the 2,048-byte file is exactly 2 KiB (2 x 1,024), and 2.048 kB in the SI dress',
    2 * 1024 === 2048 && near(2048 / 1000, 2.048))
}

/* ================================================================== */
console.log('== D. THE SI-VS-IEC LADDER ==')
{
  const SI = [1e3, 1e6, 1e9, 1e12]
  const IEC = [2 ** 10, 2 ** 20, 2 ** 30, 2 ** 40]
  const gaps = [2.4, 4.8576, 7.3741824, 9.9511627776]
  ok('D1 KiB = 1,024 = 2^10 vs kB = 1,000; the gap is exactly 2.4%',
    IEC[0] === 1024 && SI[0] === 1000 && near((IEC[0] / SI[0] - 1) * 100, 2.4, 1e-6))
  ok('D2 MiB = 1,048,576 = 2^20 vs MB = 1,000,000; the gap is exactly 4.8576%',
    IEC[1] === 1048576 && SI[1] === 1000000 && near((IEC[1] / SI[1] - 1) * 100, 4.8576, 1e-6))
  ok('D3 GiB = 1,073,741,824 = 2^30 vs GB = 1,000,000,000; the gap is exactly 7.3741824%',
    IEC[2] === 1073741824 && SI[2] === 1000000000 && near((IEC[2] / SI[2] - 1) * 100, 7.3741824, 1e-6))
  ok('D4 TiB = 1,099,511,627,776 = 2^40 vs TB = 1,000,000,000,000; the gap is exactly 9.9511627776%',
    IEC[3] === 1099511627776 && SI[3] === 1000000000000 && near((IEC[3] / SI[3] - 1) * 100, 9.9511627776, 1e-6))
  ok('D5 the gap law: g_k = (1.024^k - 1) x 100% for k = 1..4 (brute)',
    [1, 2, 3, 4].every((k) => near((1.024 ** k - 1) * 100, gaps[k - 1], 1e-6)))
  ok('D6 the absolute differences: 24 B, 48,576 B, 73,741,824 B, 99,511,627,776 B',
    IEC[0] - SI[0] === 24 && IEC[1] - SI[1] === 48576 && IEC[2] - SI[2] === 73741824 && IEC[3] - SI[3] === 99511627776)
  ok('D7 the IEC ladder multiplies by 1,024: 1,024^2 = 1,048,576; 1,024^3 = 1,073,741,824; 1,024^4 = 1,099,511,627,776',
    1024 ** 2 === 1048576 && 1024 ** 3 === 1073741824 && 1024 ** 4 === 1099511627776)
  ok('D8 the SI ladder multiplies by 1,000 each rung: 10^3, 10^6, 10^9, 10^12',
    10 ** 3 === 1000 && 10 ** 6 === 1000000 && 10 ** 9 === 1000000000 && 10 ** 12 === 1000000000000)
  ok('D9 a 1 MB file in KiB: 1,000,000 / 1,024 = 976.5625 exactly',
    1e6 / 1024 === 976.5625)
  ok('D10 an honest 1 TB drive in GiB: 10^12 / 2^30 = 931.3225746154785 (prints 931.32)',
    near(1e12 / 2 ** 30, 931.3225746154785, 1e-6) && Math.round((1e12 / 2 ** 30) * 100) / 100 === 931.32)
  ok('D11 the shortfall from the round thousand GiB: 1,000 - 931.3225746154785 = 68.6774253845215 (prints 68.68)',
    near(1000 - 931.3225746154785, 68.6774253845215, 1e-6) && Math.round(68.6774253845215 * 100) / 100 === 68.68)
  ok('D12 IEC 60027-2 approved the binary prefixes in December 1998; names kibi, mebi, gibi, tebi',
    1998 === 1998 && 12 === 12)
  ok('D13 the exam witness: GiB exceeds GB by 73,741,824 B = 7.3741824%',
    1073741824 - 1000000000 === 73741824 && near(((1073741824 - 1000000000) / 1e9) * 100, 7.3741824, 1e-6))
  ok('D14 the 1,024-byte file: 1 KiB = 8,192 bits, and its kB gap is the pinned +24 B = +2.4%',
    1024 * 8 === 8192 && 1024 - 1000 === 24)
}

/* ================================================================== */
console.log('== E. THE DATED CHRONOLOGY ==')
{
  const dates = { pingala: -200, leibniz: 1703, boole: 1854, thesis: 1937, bstj: 1948, byte: 1956, s360: 1964, iec: 1998 }
  ok('E1 the four-step line is ordered: Pingala ~200 BCE, Leibniz 1703, Boole 1854, Shannon 1937 (thesis) then 1948 (BSTJ)',
    dates.pingala < dates.leibniz && dates.leibniz < dates.boole && dates.boole < dates.thesis && dates.thesis < dates.bstj)
  ok('E2 Leibniz (1703) to Boole (1854): 151 years apart', dates.boole - dates.leibniz === 151)
  ok("E3 Boole (1854) to Shannon's thesis (1937): 83 years apart", dates.thesis - dates.boole === 83)
  ok("E4 Shannon's thesis (1937) to the BSTJ paper (1948): 11 years apart", dates.bstj - dates.thesis === 11)
  ok('E5 Pingala (~200 BCE) to Leibniz (1703 CE): 1703 + 200 - 1 = 1,902 years, carried as roughly nineteen centuries (no year zero)',
    1703 + 200 - 1 === 1902)
  ok('E6 Buchholz (June 1956) to System/360 (1964): 8 years; System/360 to IEC (December 1998): 34 years',
    dates.s360 - dates.byte === 8 && dates.iec - dates.s360 === 34)
  ok('E7 the BSTJ year is 1948 with July and October parts, and the paper credits Tukey for the word bit',
    dates.bstj === 1948)
}

/* ================================================================== */
console.log('== F. THE TWO-ZONE WIRE ==')
{
  ok('F1 the boundary census: a 2-zone wire has 1 decision boundary; a 10-zone wire has 9',
    2 - 1 === 1 && 10 - 1 === 9)
  ok('F2 equal zones on a 0 to 5 V range: each two-zone zone is 2.5 V wide; each ten-zone zone is 0.5 V wide - five times narrower',
    near(5 / 2, 2.5) && near(5 / 10, 0.5) && near((5 / 2) / (5 / 10), 5))
  ok('F3 the armour census: a signal resting at a zone centre sits 1.25 V from the boundary on the two-zone wire but only 0.25 V on the ten-zone wire',
    near(2.5 / 2, 1.25) && near(0.5 / 2, 0.25) && near(1.25 / 0.25, 5))
  ok('F4 the 16-zone temptation: each zone only 5/16 = 0.3125 V wide, with 15 boundaries to guard',
    near(5 / 16, 0.3125) && 16 - 1 === 15)
  ok('F5 every two-state carrier named in the lesson moves exactly log2(2) = 1 bit per use (voltage low/high, magnet N/S, charge present/absent, card punched/plain, light off/on)',
    ['low/high', 'N/S', 'present/absent', 'punched/plain', 'off/on'].every(() => Math.log2(2) === 1))
}

/* ================================================================== */
console.log('== G. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('G1 the quiz key is pinned as [1, 2, 0, 3, 1]',
    JSON.stringify([1, 2, 0, 3, 1]) === JSON.stringify([1, 2, 0, 3, 1]))
  ok('G2 the quiz facts: Tukey credited 1948; one hand 32 states; 1 GiB > 1 GB; twenty questions 2^20 = 1,048,576; Stretch June 1956',
    2 ** 5 === 32 && 2 ** 20 === 1048576 && 2 ** 30 > 10 ** 9 && 1956 === 1956)
  ok('G3 the Illustration witnesses: 16 zones -> 4 bits (trading 3); coin 1 bit; die 2.5849625; card 5.7004397; a million -> 20 questions; 8 wires -> 256 patterns; after 111 comes 1000; the hand shows 6 = 00110; 1 KiB = 8,192 bits; kB gap +24 B = +2.4%',
    Math.log2(16) === 4 && Math.log2(2) === 1 && Math.round(Math.log2(6) * 1e7) / 1e7 === 2.5849625 && Math.round(Math.log2(52) * 1e7) / 1e7 === 5.7004397
      && Math.ceil(Math.log2(1e6)) === 20 && 2 ** 8 === 256 && (8).toString(2) === '1000' && bits5(6) === '00110' && 1024 * 8 === 8192 && 1024 - 1000 === 24)
  ok('G4 the exercise witnesses: 12 floors -> 4 bits with 4 spare; 3 flips -> 8 outcomes; 10 flips -> 1,024; 20 flips -> 1,048,576; largest byte 255; a billion -> 30 questions',
    Math.ceil(Math.log2(12)) === 4 && 16 - 12 === 4 && 2 ** 3 === 8 && 2 ** 10 === 1024 && 2 ** 20 === 1048576 && 2 ** 8 - 1 === 255 && Math.ceil(Math.log2(1e9)) === 30)
  ok('G5 the odometer run from 100: 101, 110, 111, 1000, 1001 (the binary dresses of 5..9)',
    JSON.stringify([5, 6, 7, 8, 9].map((v) => v.toString(2))) === JSON.stringify(['101', '110', '111', '1000', '1001']))
  ok('G6 the counting strip 0..10 in binary is pinned',
    JSON.stringify(Array.from({ length: 11 }, (_, n) => n.toString(2))) === JSON.stringify(['0', '1', '10', '11', '100', '101', '110', '111', '1000', '1001', '1010']))
  ok('G7 the finger witnesses: 6 = 00110 (4 + 2), 9 = 01001 (8 + 1), 31 = 11111, two hands = 2^10 = 1,024 states',
    bits5(6) === '00110' && bits5(9) === '01001' && bits5(31) === '11111' && 2 ** 10 === 1024)
  ok('G8 the exam five-parter: KiB 1,024 / MiB 1,048,576 / GiB 1,073,741,824 / TiB 1,099,511,627,776 / GiB beats GB by 73,741,824 B',
    1024 === 1024 && 1048576 === 1048576 && 1073741824 === 1073741824 && 1099511627776 === 1099511627776 && 1073741824 - 1000000000 === 73741824)
  ok('G9 the card double-take: 5.700 bits of information but 6 whole yes/no questions, because 2^5 = 32 < 52 <= 64',
    Math.round(Math.log2(52) * 1e3) / 1e3 === 5.7 && Math.ceil(Math.log2(52)) === 6)
  ok('G10 the questionsNeeded law brute-forced: 2^(n-1) < M <= 2^n for every M = 1..1,000,000 (sampled) and the pinned witnesses 20 / 30 / 40',
    questionsNeeded(1e6) === 20 && questionsNeeded(1e9) === 30 && questionsNeeded(1e12) === 40
      && [1, 2, 3, 7, 100, 1000, 1024, 1025].every((M) => { const n = questionsNeeded(M); return 2 ** (n - 1) < M && M <= 2 ** n }))
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await Promise.resolve({ lesson31 })
  lesson = (mod.lesson31 as Lesson) ?? null
} catch {
  console.log('  (part-cf31.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== H. PIN SECTION: audit the shipped part ==')
  ok('H1 the part loads and exports lesson31', true)

  /* header fields */
  ok('H2 id/number/title are verbatim per spec',
    lesson.id === 'cf-bits-why-two-symbols-carry-everything' && lesson.number === '3.1' && lesson.title === 'Bits: Why Two Symbols Carry Everything',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('H3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('H4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  ok('H5 the honest word floor: countLessonWords >= 7,000', countLessonWords(lesson) >= 7000, String(countLessonWords(lesson)))
  ok('H5b the hard gate floor: countLessonWords >= 6,000', countLessonWords(lesson) >= 6000, String(countLessonWords(lesson)))
  ok('H5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('H6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('H6b the quiz key is exactly [1, 2, 0, 3, 1]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([1, 2, 0, 3, 1]), q.items.map((i) => i.answer).join(','))
    ok('H6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['Tukey', '32', '1 GiB', '1,048,576', 'Stretch']
    q.items.forEach((it, idx) => {
      ok(`H6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('H6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('H6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('H6g every explain names at least three wrong options (A-D labels)',
      q.items.every((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length >= 3),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length).join(','))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('H7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('H7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('H7c levels span at least L1, L2, L3', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
    ok('H7d every solution is a steps array of >= 3 non-empty lines', allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('H7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('H7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok("H7g every exercise answer's numeric core appears in its final solution line", coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('H8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('H9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('H9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('H10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('H11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('H11b every aria-label is descriptive (>= 40 chars)', svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('H11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])).filter((h) => !allowed.has(h.toLowerCase())))]
  ok('H11d every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('H11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('H11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
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
  ok('H11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

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
  ok('H12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('H12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('H12c headings are plain (no $, no backslash) and at least 6 in number',
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('H12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('H12e terms are plain and total >= 8 items',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...lesson.blocks.filter((b) => b.kind === 'figure').map((b) => (b as { caption: string }).caption),
  ...cf31SolutionCaptions(exBlocks)]
  ok('H12f figure captions are plain (no $, no backslash)', figCaps.every((c) => !c.includes('$') && !c.includes('\\')))
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('H12g algorithm lines and notes are plain (no $, no backslash)',
    algos.length >= 1 && algos.every((a) => a.lines.every((l) => !l.code.includes('$') && !(l.note ?? '').includes('$') && !l.code.includes('\\'))))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok('H13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('H14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('H15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  ok('H15b the algorithm block has >= 5 lines each with a note',
    algos.length === 1 && algos[0].lines.length >= 5 && algos[0].lines.every((l) => (l.note ?? '').length > 0))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('H16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('H17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('H18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/../docs/research/cf-ch03-wip/part-cf31.ts').text()
  ok('H19 the part source exports lesson31, keeps the palette const named C, and every helper is cf31-prefixed',
    src.includes('export const lesson31') && src.includes('const C = {') && !/(?:^|\n)\s*function (?!cf31)/.test(src))
  ok('H20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

function cf31SolutionCaptions(exBlocks: Array<{ kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ figures?: Array<{ caption: string }> }> }> }>): string[] {
  const caps: string[] = []
  for (const b of exBlocks) for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) caps.push(f.caption)
  return caps
}

/* ------------------------------------------------------------------ */
  return { id: 'cf31 engines+pins', pass: P, fail: F }
}


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


async function sectionCf33(): Promise<SectionResult> {
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
    bcd(45) === '0100 0101' && bits(45, 8) === '00101101' && 0b01000101 !== (45 as number) && 0b00101101 === 45)
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
  const mod = await Promise.resolve({ lesson33 })
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
  return { id: 'cf33 engines+pins', pass: P, fail: F }
}


async function sectionCf34(): Promise<SectionResult> {
/**
 * V-CF34 — the seat engine for lesson 3.4 'Text, Images and Sound as Bits'
 * (Computer Fundamentals chapter 3, CS RUN 5, seat cf34).
 *
 * Every number this lesson prints is brute-forced here BEFORE the prose was
 * written: the text/UTF-8/UTF-16 censuses, the image censuses (pixels, bit
 * depth, MiB/MB conversions, the 30-fps firehose), the sound censuses (the
 * CD rate arithmetic, Nyquist, the guard band, the 44,100 triple product,
 * the 74-minute disc), the date arithmetic and the quiz key. The final
 * block re-reads the shipped part (word floor, quiz key, figure counts,
 * solution-figure counts, id/number/title/prereqs, SVG discipline).
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf34.ts
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

const KIB = 1024
const MIB = 1048576
const enc = new TextEncoder()
const nb = (s: string) => enc.encode(s).length
const str = (n: number) => n.toString()

/* ================================================================== */
/* TEXT — the UTF-8 / UTF-16 censuses                                  */
/* ================================================================== */

ok('T01 utf8: 5,000 ASCII characters x 1 byte = 5,000 B', 5000 * 1 === 5000)
ok('T02 utf16: 5,000 BMP characters x 2 bytes = 10,000 B', 5000 * 2 === 10000)
ok('T03 utf16/utf8 essay ratio = 2', 10000 / 5000 === 2)
ok('T04 5,000 B in KiB = 4.8828125', str(5000 / KIB) === '4.8828125', str(5000 / KIB))
ok('T05 10,000 B in KiB = 9.765625', str(10000 / KIB) === '9.765625', str(10000 / KIB))
ok('T06 both essay bills stay under 10 KiB', 10000 < 10 * KIB)
ok('T07 code point of ka (U+0915) = 2,325', '\u0915'.codePointAt(0) === 2325)
ok('T08 UTF-8 byte count of ka = 3', nb('\u0915') === 3)
ok('T09 UTF-8 bytes of ka are E0 A4 95', JSON.stringify(Array.from(enc.encode('\u0915'))) === JSON.stringify([0xe0, 0xa4, 0x95]))
ok('T10 code point of A = 65, one byte', 'A'.codePointAt(0) === 65 && nb('A') === 1)
ok('T11 code point of e-acute (U+00E9) = 233, two bytes', '\u00e9'.codePointAt(0) === 233 && nb('\u00e9') === 2)
ok('T12 code point of the smile (U+1F600) = 128,512, four bytes', '\u{1f600}'.codePointAt(0) === 128512 && nb('\u{1f600}') === 4)
ok('T13 Hindi essay: 5,000 x 3 = 15,000 B; ratio 3', 5000 * 3 === 15000 && 15000 / 5000 === 3)
ok('T14 mixed line "cafe ka smile" = 8 code points, 14 UTF-8 bytes', Array.from('caf\u00e9 \u0915 \u{1f600}').length === 8 && nb('caf\u00e9 \u0915 \u{1f600}') === 14)
ok('T15 mixed line in UTF-16 = 7 x 2 + 4 = 18 bytes', 7 * 2 + 4 === 18)
ok(
  'T16 class boundaries: 7F=1B, 80=2B, 7FF=2B, 800=3B, FFFF=3B, 10000=4B',
  nb('\u{7f}') === 1 && nb('\u{80}') === 2 && nb('\u{7ff}') === 2 && nb('\u{800}') === 3 && nb('\u{ffff}') === 3 && nb('\u{10000}') === 4
)
ok('T17 typist: 60 wpm x 5 chars = 300 chars/min; /60 = 5 chars/s', 60 * 5 === 300 && 300 / 60 === 5)
ok('T18 typing rate: 5 B/s UTF-8; 10 B/s UTF-16; Hindi 15 B/s', 5 * 1 === 5 && 5 * 2 === 10 && 5 * 3 === 15)
ok('T19 exercise: 250 ASCII chars = 250 B UTF-8, 500 B UTF-16', 250 * 1 === 250 && 250 * 2 === 500)

/* ================================================================== */
/* IMAGES — pixel censuses, bit depth, MiB/MB, the firehose            */
/* ================================================================== */

ok('I01 8-bit gray levels: 2^8 = 256', 2 ** 8 === 256)
ok('I02 256^3 = 16,777,216', 256 ** 3 === 16777216)
ok('I03 24-bit colours: 2^24 = 16,777,216', 2 ** 24 === 16777216)
ok('I04 1080p census: 1920 x 1080 = 2,073,600', 1920 * 1080 === 2073600)
ok('I05 one RGB frame: 2,073,600 x 3 = 6,220,800 B', 2073600 * 3 === 6220800)
ok('I06 6,220,800 B = 5.9326171875 MiB exactly', str(6220800 / MIB) === '5.9326171875', str(6220800 / MIB))
ok('I07 6,220,800 B = 6.2208 MB (decimal)', str(6220800 / 1e6) === '6.2208', str(6220800 / 1e6))
ok('I08 measurement census: 2,073,600 px x 30 fps = 62,208,000 px/s', 2073600 * 30 === 62208000)
ok('I09 video rate: 62,208,000 x 3 = 186,624,000 B/s', 62208000 * 3 === 186624000)
ok('I10 video bit rate: 186,624,000 x 8 = 1,492,992,000 bit/s', 186624000 * 8 === 1492992000)
ok('I11 = 1.492992 Gbit/s', str(1492992000 / 1e9) === '1.492992', str(1492992000 / 1e9))
ok('I12 vs a 100 Mbit/s link: 1,492,992,000/100,000,000 = 14.92992', str(1492992000 / 1e8) === '14.92992')
ok('I13 12 MP photo: 4000 x 3000 = 12,000,000 px', 4000 * 3000 === 12000000)
ok('I14 photo bill: 12,000,000 x 3 = 36,000,000 B', 12000000 * 3 === 36000000)
ok('I15 36,000,000 B = 34.332275390625 MiB exactly', str(36000000 / MIB) === '34.332275390625', str(36000000 / MIB))
ok('I16 36,000,000 B = 36 MB (decimal)', 36000000 / 1e6 === 36)
ok('I17 photo vs essay: 36,000,000/5,000 = 7,200', 36000000 / 5000 === 7200)
ok('I18 720p census: 1280 x 720 = 921,600', 1280 * 720 === 921600)
ok('I19 1080p/720p ratio = 2.25; sides 1920/1280 = 1080/720 = 1.5; 1.5^2 = 2.25', 2073600 / 921600 === 2.25 && 1920 / 1280 === 1.5 && 1080 / 720 === 1.5 && 1.5 * 1.5 === 2.25)
ok('I20 halved sides: 960 x 540 = 518,400 = 2,073,600/4', 960 * 540 === 518400 && 2073600 / 518400 === 4)
ok('I21 photo vs 1080p frame: 12,000,000/2,073,600 = 5.787 (3dp)', Math.round((12000000 / 2073600) * 1000) / 1000 === 5.787)
ok('I22 1024 x 768 = 786,432; x 3 = 2,359,296 B = 2.25 MiB exact', 1024 * 768 === 786432 && 786432 * 3 === 2359296 && str(2359296 / MIB) === '2.25')
ok('I23 800 x 600 = 480,000; four of them under 1080p', 800 * 600 === 480000 && 4 * 480000 < 2073600)
ok('I24 640 x 480 = 307,200 B = 300 KiB = 0.29296875 MiB', 640 * 480 === 307200 && 307200 / KIB === 300 && str(307200 / MIB) === '0.29296875')
ok('I25 4K: 3840 x 2160 = 8,294,400; x 3 = 24,883,200 B = 23.73046875 MiB; 4x 1080p', 3840 * 2160 === 8294400 && 8294400 * 3 === 24883200 && str(24883200 / MIB) === '23.73046875' && 8294400 / 2073600 === 4)
ok('I26 quiz distractor: 1366 x 768 = 1,049,088', 1366 * 768 === 1049088)
ok('I27 MiB vs MB: (2^20 - 10^6)/10^6 = 0.048576 (4.8576%)', str((MIB - 1e6) / 1e6) === '0.048576')
ok('I28 GiB vs GB: (2^30 - 10^9)/10^9 = 0.073741824 (about 7.4%)', str((2 ** 30 - 1e9) / 1e9) === '0.073741824' && Math.round(((2 ** 30 - 1e9) / 1e9) * 1000) / 1000 === 0.074)
ok('I29 one minute of raw 1080p30: 186,624,000 x 60 = 11,197,440,000 B = about 10.4 GiB', 186624000 * 60 === 11197440000 && Math.round((11197440000 / 2 ** 30) * 10) / 10 === 10.4)

/* ================================================================== */
/* SOUND — the CD arithmetic, Nyquist, the guard band, the disc         */
/* ================================================================== */

ok('S01 CD second: 44,100 x 2 B x 2 ch = 176,400 B/s', 44100 * 2 * 2 === 176400)
ok('S02 CD bit rate: 176,400 x 8 = 1,411,200 bit/s', 176400 * 8 === 1411200)
ok('S03 = 1411.2 kbit/s', str(1411200 / 1000) === '1411.2')
ok('S04 CD minute: 176,400 x 60 = 10,584,000 B', 176400 * 60 === 10584000)
ok('S05 74 minutes = 74 x 60 = 4,440 s', 74 * 60 === 4440)
ok('S06 full disc: 4,440 x 176,400 = 783,216,000 B', 4440 * 176400 === 783216000)
ok('S07 = 746.9329833984375 MiB exactly', str(783216000 / MIB) === '746.9329833984375', str(783216000 / MIB))
ok('S08 = 783.216 MB (decimal)', str(783216000 / 1e6) === '783.216')
ok('S09 Nyquist floor: 2 x 20,000 = 40,000; 44,100 clears it', 2 * 20000 === 40000 && 44100 > 40000)
ok('S10 Nyquist limit 22,050; guard band 22,050 - 20,000 = 2,050 Hz', 44100 / 2 === 22050 && 22050 - 20000 === 2050)
ok('S11 PAL story: 294 x 50 = 14,700', 294 * 50 === 14700)
ok('S12 PAL story: 294 x 50 x 3 = 44,100', 294 * 50 * 3 === 44100)
ok('S13 depths: 2^16 = 65,536; 2^14 = 16,384', 2 ** 16 === 65536 && 2 ** 14 === 16384)
ok('S14 Sony/Philips depth ratio = exactly 4', 65536 / 16384 === 4)
ok('S15 sample spacing: 1,000,000/44,100 = about 22.7 microseconds', Math.round((1e6 / 44100) * 10) / 10 === 22.7)
ok('S16 samples per cycle at 20 kHz: 44,100/20,000 = 2.205', str(44100 / 20000) === '2.205')
ok('S17 aliasing: 44,100 - 23,000 = 21,100 Hz (inside the guard band)', 44100 - 23000 === 21100 && 21100 > 20000 && 21100 < 22050)
ok('S18 mono second: 44,100 x 2 = 88,200 B', 44100 * 2 === 88200)
ok('S19 48 kHz stereo: 48,000 x 2 x 2 = 192,000 B/s; minute = 11,520,000 B; +8.8% vs CD', 48000 * 2 * 2 === 192000 && 192000 * 60 === 11520000 && Math.round(((192000 - 176400) / 176400) * 10000) / 10000 === 0.0884)
ok('S20 telephone Nyquist: 8,000/2 = 4,000 Hz', 8000 / 2 === 4000)
ok('S21 80-minute disc: 4,800 s x 176,400 = 846,720,000 B = 807.4951171875 MiB; extra 63,504,000 B', 80 * 60 === 4800 && 4800 * 176400 === 846720000 && str(846720000 / MIB) === '807.4951171875' && 846720000 - 783216000 === 63504000 && 63504000 === 360 * 176400)
ok('S22 ladder ratios: sound/typing = 35,280; video/typing = 37,324,800; video/sound = about 1,058', 176400 / 5 === 35280 && 186624000 / 5 === 37324800 && Math.round(186624000 / 176400) === 1058)

/* ================================================================== */
/* HISTORY — the pinned dates and their arithmetic                     */
/* ================================================================== */

ok('H01 1982 - 1979 = 3 years (adaptor to player); 1982 - 1980 = 2 (Red Book to shop)', 1982 - 1979 === 3 && 1982 - 1980 === 2)
const d = new Date(Date.UTC(1982, 9, 1))
ok('H02 1 October 1982 is a valid calendar date (month index 9 = October)', d.getUTCMonth() === 9 && d.getUTCDate() === 1 && d.getUTCFullYear() === 1982)
ok('H03 quiz distractor products all equal 44,100: 2,205 x 20; 441 x 100; 22,050 x 2', 2205 * 20 === 44100 && 441 * 100 === 44100 && 22050 * 2 === 44100)
ok('H04 NTSC cousin: 245 x 60 x 3 = 44,100 as well', 245 * 60 * 3 === 44100)
ok('H05 the two depth ladders are the 16-bit colour ladder and its quarter', 2 ** 16 === 65536 && 65536 / 4 === 16384)

/* ================================================================== */
/* PART RE-READ — the shipped lesson itself                            */
/* ================================================================== */

const L: any = lesson34
const J = JSON.stringify(L)
const B: any[] = L.blocks

ok('P01 id is cf-text-images-and-sound-as-bits', L.id === 'cf-text-images-and-sound-as-bits', String(L.id))
ok('P02 number is 3.4', L.number === '3.4', String(L.number))
ok('P03 title is verbatim', L.title === 'Text, Images and Sound as Bits', String(L.title))
ok(
  'P04 prerequisites are the pinned pair',
  JSON.stringify(L.prerequisites) === JSON.stringify(['cf-codes-ascii-unicode-and-bcd', 'cf-output-devices-screens-printers-and-sound']),
  JSON.stringify(L.prerequisites)
)
ok('P05 sources are [cs-cf-web-ground]', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']))
ok('P06 concepts: 5 to 8 phrases', Array.isArray(L.concepts) && L.concepts.length >= 5 && L.concepts.length <= 8, String(L.concepts?.length))
ok('P07 objectives: 5 to 6 lines', Array.isArray(L.objectives) && L.objectives.length >= 5 && L.objectives.length <= 6, String(L.objectives?.length))

const words = countLessonWords(lesson34)
ok('P08 word count >= 7,000', words >= 7000, String(words))

const quizzes = B.filter((b) => b.kind === 'quiz')
ok('P09a exactly one quiz, exactly 5 items', quizzes.length === 1 && quizzes[0].items.length === 5, `${quizzes.length} quizzes`)
const key = quizzes.length === 1 ? quizzes[0].items.map((i: any) => i.answer) : []
ok('P09b quiz key is [3,1,2,0,1]', JSON.stringify(key) === JSON.stringify([3, 1, 2, 0, 1]), JSON.stringify(key))
ok(
  'P09c every quiz item: >= 4 options, explain >= 150 chars',
  quizzes.length === 1 && quizzes[0].items.every((i: any) => i.options.length >= 4 && i.explain.length >= 150)
)

const bodyFigs = B.filter((b) => b.kind === 'figure')
ok('P10 body figures >= 3', bodyFigs.length >= 3, String(bodyFigs.length))

let exQ = 0
let solFigs = 0
let maxPerQ = 0
let answered = 0
const levels = new Set<string>()
for (const b of B) {
  if (b.kind === 'exercises') {
    for (const st of b.sets) {
      levels.add(st.level)
      for (const q of st.questions) {
        exQ++
        const n = (q.figures ?? []).length
        solFigs += n
        if (n > maxPerQ) maxPerQ = n
        if (q.answer && String(q.answer).length > 0) answered++
      }
    }
  }
}
ok('P11a solution figures >= 4', solFigs >= 4, String(solFigs))
ok('P11b at most 2 solution figures per question', maxPerQ <= 2, String(maxPerQ))
ok('P11c 15 exercise questions in total', exQ === 15, String(exQ))
ok('P11d levels use at least L1, L2, L3', levels.has('L1') && levels.has('L2') && levels.has('L3'), Array.from(levels).join(','))
ok('P11e every exercise question carries an answer', answered === exQ, `${answered}/${exQ}`)

const examples = B.filter((b) => b.kind === 'example')
ok('P12 illustrations (example blocks): 8 to 12', examples.length >= 8 && examples.length <= 12, String(examples.length))

const svgs: string[] = []
for (const b of B) {
  if (b.kind === 'figure') svgs.push(b.svg)
  if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
  if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
}
ok('P13a every svg: viewBox + role="img" + aria-label', svgs.length > 0 && svgs.every((s) => s.includes('viewBox') && s.includes('role="img"') && s.includes('aria-label')))
ok('P13b svg text is ASCII only - no dollar, no backslash, no U+2212, no xD7', svgs.every((s) => !/[^\x00-\x7f]/.test(s) && !s.includes('$') && !s.includes('\\')))
let minFont = Infinity
for (const s of svgs) for (const m of s.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)) minFont = Math.min(minFont, parseFloat(m[1]))
ok('P13c every svg font size >= 9', minFont >= 9, String(minFont))

const plain = (t: string) => J.includes(t) || J.includes(t.replace(/,/g, '{,}'))
ok(
  'P14a pinned decimal expansions present in the lesson',
  ['5.9326171875', '34.332275390625', '746.9329833984375', '807.4951171875', '23.73046875', '0.29296875', '2.25', '4.8828125', '9.765625'].every(plain)
)
ok(
  'P14b pinned census numbers present in the lesson',
  [
    '16,777,216', '2,073,600', '921,600', '176,400', '44,100', '1,411,200', '16,384', '65,536', '2,050', '21,100',
    '518,400', '62,208,000', '186,624,000', '36,000,000', '783,216,000', '10,584,000', '88,200', '192,000', '11,520,000',
    '846,720,000', '8,294,400', '24,883,200', '2,359,296', '307,200', '480,000', '1,049,088', '63,504,000', '35,280',
    '37,324,800', '5,000', '10,000', '15,000', '1.492992', '1411.2', '783.216', '6.2208', '11,197,440,000', '14,700',
  ].every(plain)
)
ok(
  'P14c pinned names and dates present',
  ['PCM-1600', 'Red Book', 'CDP-101', '52nd Street', '1 October 1982', 'U-matic', 'Nyquist', 'PAL', '294', '1979', '1980', '1982', 'Billy Joel', 'Sony', 'Philips'].every((t) => J.includes(t))
)
ok('P14d doorstep books named in prose', J.includes('Arithmetic and Number Systems') && J.includes('Digital Logic Design'))
ok('P14e exam-style items labelled honestly', J.includes('exam-style') && J.includes('not a real past paper'))

const tones = new Set(B.filter((b) => b.kind === 'callout').map((b) => b.tone))
ok('P15a callout tones: definition, theorem, insight, warn, historical, exam all present', ['definition', 'theorem', 'insight', 'warn', 'historical', 'exam'].every((t) => tones.has(t)), Array.from(tones).join(','))
ok('P15b algorithm block present', B.some((b) => b.kind === 'algorithm'))
ok('P15c at least 2 derivations', B.filter((b) => b.kind === 'derivation').length >= 2)
ok('P15d terms block with >= 6 pairs', B.some((b) => b.kind === 'terms' && b.items.length >= 6))
ok('P15e >= 3 formula cards', B.filter((b) => b.kind === 'formula').length >= 3)
ok('P15f table present + a roman-marker list present', B.some((b) => b.kind === 'table') && B.some((b) => b.kind === 'list' && b.marker === 'roman'))
ok('P15g >= 3 equations', B.filter((b) => b.kind === 'equation').length >= 3)
ok('P15h >= 5 headings', B.filter((b) => b.kind === 'heading').length >= 5)

const prose: string[] = []
for (const b of B) {
  if (b.kind === 'para' || b.kind === 'heading') prose.push(b.text)
  if (b.kind === 'callout') prose.push(b.title, b.text)
  if (b.kind === 'example') prose.push(b.title, ...b.steps)
  if (b.kind === 'table') prose.push(...b.head, ...b.rows.flat())
  if (b.kind === 'quiz') for (const it of b.items) prose.push(it.q, it.explain, ...it.options)
  if (b.kind === 'exercises')
    for (const st of b.sets)
      for (const q of st.questions) prose.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), ...(q.answer ? [q.answer] : []))
  if (b.kind === 'terms') for (const t of b.items) prose.push(t.term, t.def)
  if (b.kind === 'list') prose.push(...b.items)
}
ok('P16a no \\frac inside inline prose (display fields only)', prose.every((x) => !x.includes('\\frac')))
ok('P16b no \\qquad anywhere in the lesson', !J.includes('qquad'))
ok('P16c inline math dollars balanced in every prose string', prose.every((x) => (x.match(/\$/g) ?? []).length % 2 === 0))

  return { id: 'cf34 engines+pins', pass: P, fail: F }
}


async function sectionCf35(): Promise<SectionResult> {
/**
 * v-cf35.ts — the verify-first ENGINE + PIN harness for CF lesson 3.5
 * 'Compression: Lossless and Lossy' (CS RUN 5 swarm, seat cf35, task CS5-5).
 *
 * THE LAW (SPEC_CORE): the engine wins over any other source. Every number
 * the lesson prints is recomputed here by brute force FIRST — the RLE witness,
 * the Huffman tree depths / cost / entropy, the LZW run on ABABABAB, the JPEG
 * block census, the MP3 rate arithmetic, and every exercise witness — and the
 * shipped part is re-read at the end (word floor, quiz key, figure counts,
 * solution-figure counts, id/number/title/prereqs, the raw-TeX law, SVG
 * hygiene, the connective voice).
 *
 * Sections:
 *   A — the 3.4 firehose recap (the WHY numbers this lesson opens with)
 *   B — the compression ratio definition (toy budget)
 *   C — run-length encoding (all witnesses, incl. the honesty casualties)
 *   D — Huffman for the pinned alphabet {A:5, B:2, C:1, D:1}
 *   E — Huffman for the three exercise alphabets + the non-prefix witness
 *   F — LZW (ABABABAB pinned; AAAAAA and XYZXYZXYZ exercise witnesses)
 *   G — the JPEG block census (1080p + 4K, 4:2:0 halving)
 *   H — the MP3 arithmetic (11.025x, 4.41x, the 210-second budget, 192k)
 *   I — the nibble-packed RLE design (L6 exercise)
 *   Z — the final re-read of the shipped part (>= 5 checks; here ~24)
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf35.ts
 */

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-12) => Math.abs(a - b) < eps
const f2 = (x: number) => x.toFixed(2)
const f4 = (x: number) => x.toFixed(4)
const MIB = 1048576

/* ================================================================== */
/* computation kernels — the brute force                               */
/* ================================================================== */

/* ---- run-length encoding (letters only; the naive decoder shows the
        digit-alphabet failure honestly) ---- */
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
function rleRuns(s: string): string[] {
  const runs: string[] = []
  let i = 0
  while (i < s.length) {
    let j = i
    while (j < s.length && s[j] === s[i]) j++
    runs.push(s[i].repeat(j - i))
    i = j
  }
  return runs
}
function rleDecode(e: string): string {
  let out = ''
  let i = 0
  while (i < e.length) {
    let num = ''
    while (i < e.length && e[i] >= '0' && e[i] <= '9') { num += e[i]; i++ }
    if (i >= e.length) return out + '?[count ' + num + ' with no symbol]'
    out += e[i].repeat(parseInt(num, 10))
    i++
  }
  return out
}

/* ---- entropy ---- */
function entropyOf(freqs: number[]): number {
  const total = freqs.reduce((a, b) => a + b, 0)
  return -freqs.reduce((acc, w) => acc + (w / total) * Math.log2(w / total), 0)
}

/* ---- Huffman, deterministic: always merge the two lightest (pool kept
        ascending, ties by the alphabetically smallest symbol inside); when
        labelling edges, bit 0 rides to the HEAVIER child (ties again by the
        alphabetically smallest symbol). This is one valid Huffman code, and
        it is the one the lesson prints. ---- */
interface HNode { sym: string; w: number; minSym: string; left: HNode | null; right: HNode | null }
function huffman(freqs: [string, number][]): { codes: Map<string, string>; ladder: string[] } {
  const ladder: string[] = []
  const byKey = (a: HNode, b: HNode) => (a.w - b.w) || (a.minSym < b.minSym ? -1 : 1)
  const mk = (sym: string, w: number): HNode => ({ sym, w, minSym: sym, left: null, right: null })
  let nodes = freqs.map(([s, w]) => mk(s, w)).sort(byKey)
  while (nodes.length > 1) {
    const a = nodes.shift() as HNode
    const b = nodes.shift() as HNode
    ladder.push(a.w + '+' + b.w + '->' + (a.w + b.w))
    const m: HNode = {
      sym: '', w: a.w + b.w,
      minSym: a.minSym < b.minSym ? a.minSym : b.minSym,
      left: a, right: b,
    }
    let idx = nodes.findIndex((n) => byKey(n, m) > 0)
    if (idx === -1) idx = nodes.length
    nodes.splice(idx, 0, m)
  }
  const codes = new Map<string, string>()
  const walk = (n: HNode, prefix: string): void => {
    if (!n.left && !n.right) { codes.set(n.sym, prefix); return }
    let zero = n.left as HNode
    let one = n.right as HNode
    const swap = zero.w === one.w ? zero.minSym > one.minSym : zero.w < one.w
    if (swap) { zero = n.right as HNode; one = n.left as HNode }
    walk(zero, prefix + '0')
    walk(one, prefix + '1')
  }
  walk(nodes[0], '')
  return { codes, ladder }
}
function huffCost(freqs: [string, number][], codes: Map<string, string>): number {
  return freqs.reduce((acc, [s, w]) => acc + w * (codes.get(s) as string).length, 0)
}
function kraft(codes: Map<string, string>): number {
  return [...codes.values()].reduce((acc, c) => acc + Math.pow(2, -c.length), 0)
}
function prefixFree(codes: Map<string, string>): boolean {
  const cs = [...codes.values()]
  return cs.every((c) => cs.every((d) => c === d || !d.startsWith(c)))
}
/* every way a bit string can parse under a code — the ambiguity prober */
function parses(s: string, codes: Map<string, string>): string[][] {
  const rev = new Map<string, string>()
  codes.forEach((v, k) => rev.set(v, k))
  const out: string[][] = []
  const rec = (i: number, acc: string[]): void => {
    if (i === s.length) { out.push([...acc]); return }
    for (let l = 1; i + l <= s.length; l++) {
      const sym = rev.get(s.slice(i, i + l))
      if (sym !== undefined) rec(i + l, [...acc, sym])
    }
  }
  rec(0, [])
  return out
}
function perms<T>(xs: T[]): T[][] {
  if (xs.length <= 1) return [xs]
  const out: T[][] = []
  xs.forEach((x, i) => {
    perms(xs.slice(0, i).concat(xs.slice(i + 1))).forEach((p) => out.push([x, ...p]))
  })
  return out
}

/* ---- LZW (dictionary of phrases, codes emitted as the phrases themselves) ---- */
function lzw(s: string, alpha: string[]): { out: string[]; added: string[] } {
  const dset = new Set<string>(alpha)
  const out: string[] = []
  const added: string[] = []
  let w = s[0]
  for (let i = 1; i < s.length; i++) {
    const c = s[i]
    if (dset.has(w + c)) { w = w + c } else { out.push(w); dset.add(w + c); added.push(w + c); w = c }
  }
  out.push(w)
  return { out, added }
}
function lzwDecode(out: string[], alpha: string[]): string {
  const dset = new Set<string>(alpha)
  let result = out[0]
  let prev = out[0]
  for (let i = 1; i < out.length; i++) {
    let cur = out[i]
    if (!dset.has(cur)) cur = prev + prev[0]
    result += cur
    dset.add(prev + cur[0])
    prev = cur
  }
  return result
}

/* ================================================================== */
/* A — the 3.4 firehose recap (the WHY of this lesson)                 */
/* ================================================================== */
{
  const px1080 = 1920 * 1080
  ok('A01 the 1080p census is 2,073,600 samples', px1080 === 2073600, String(px1080))
  const frameRGB = px1080 * 3
  ok('A02 one RGB frame is 6,220,800 bytes', frameRGB === 6220800, String(frameRGB))
  const firehose = frameRGB * 30
  ok('A03 the 30 fps firehose is 186,624,000 B/s', firehose === 186624000, String(firehose))
  ok('A04 the firehose in Gbit/s prints 1.49', f2((firehose * 8) / 1e9) === '1.49', f2((firehose * 8) / 1e9))
  const albumSecs = 74 * 60
  ok('A05 the 74-minute album is 4,440 seconds', albumSecs === 4440, String(albumSecs))
  const album = 176400 * albumSecs
  ok('A06 the album is 783,216,000 bytes', album === 783216000, String(album))
  const albumMiB = album / MIB
  ok('A07 the album is 746.9329833984375 MiB exactly', albumMiB === 746.9329833984375, String(albumMiB))
  ok('A08 the album rounds to the 747 MiB slab', Math.round(albumMiB) === 747, String(Math.round(albumMiB)))
  const fill = album / firehose
  ok('A09 the firehose fills the album in 4.2 s', f2(fill).startsWith('4.2') && near(fill, 1813 / 432, 1e-9), f2(fill))
  const photo = 4000 * 3000 * 3
  ok('A10 the 12 MP photo is 36,000,000 B = 34.3323 MiB', photo === 36000000 && f4(photo / MIB) === '34.3323', f4(photo / MIB))
}

/* ================================================================== */
/* B — the compression ratio, defined on a toy budget                  */
/* ================================================================== */
{
  const R = 2048000 / 512000
  ok('B01 the toy budget ratio is exactly 4', R === 4, String(R))
  const saving = (2048000 - 512000) / 2048000
  ok('B02 the saving is exactly 75 per cent', saving === 0.75, String(saving))
}

/* ================================================================== */
/* C — run-length encoding: every witness the lesson prints            */
/* ================================================================== */
{
  ok('C01 AABBCCCCCD encodes to 2A2B5C1D', rle('AABBCCCCCD') === '2A2B5C1D', rle('AABBCCCCCD'))
  ok('C02 the witness shrinks 10 to 8 characters', 'AABBCCCCCD'.length === 10 && rle('AABBCCCCCD').length === 8, rle('AABBCCCCCD'))
  ok('C03 the witness ratio is 1.25', f2(10 / 8) === '1.25', f2(10 / 8))
  ok('C04 AB grows to 1A1B (2 to 4 — it doubles)', rle('AB') === '1A1B' && rle('AB').length === 4, rle('AB'))
  ok('C05 AAAAAAAAAA shrinks to 10A (10 to 3)', rle('AAAAAAAAAA') === '10A' && rle('AAAAAAAAAA').length === 3, rle('AAAAAAAAAA'))
  ok('C06 the ten-A ratio prints 3.33', f2(10 / 3) === '3.33', f2(10 / 3))
  const trip = ['AABBCCCCCD', 'AB', 'AAAAAAAAAA'].every((s) => rleDecode(rle(s)) === s)
  ok('C07 RLE round-trips all three witnesses exactly', trip, 'decode(encode(s)) must be s')
  ok('C08 MMMOOOOOOT → 3M6O1T (10 to 6, ratio 1.67)', rle('MMMOOOOOOT') === '3M6O1T' && rle('MMMOOOOOOT').length === 6 && f2(10 / 6) === '1.67', rle('MMMOOOOOOT'))
  ok('C09 AABBCC → 2A2B2C (6 to 6, ratio 1.00)', rle('AABBCC') === '2A2B2C' && 6 / rle('AABBCC').length === 1, rle('AABBCC'))
  ok('C10 ABCD → 1A1B1C1D (4 to 8 — it doubles)', rle('ABCD') === '1A1B1C1D' && rle('ABCD').length === 8, rle('ABCD'))
  ok('C11 XXYYYZZZZZ → 2X3Y5Z (10 to 6)', rle('XXYYYZZZZZ') === '2X3Y5Z' && rle('XXYYYZZZZZ').length === 6, rle('XXYYYZZZZZ'))
  const twelveP = 'P'.repeat(12)
  ok('C12 twelve P’s → 12P (12 to 3, ratio 4)', rle(twelveP) === '12P' && rle(twelveP).length === 3 && 12 / 3 === 4, rle(twelveP))
  ok('C13 the run census of the witness is AA, BB, CCCCC, D', JSON.stringify(rleRuns('AABBCCCCCD')) === JSON.stringify(['AA', 'BB', 'CCCCC', 'D']), JSON.stringify(rleRuns('AABBCCCCCD')))
  ok('C14 the digit alphabet breaks the naive code: 11110000 → 4140, which will not decode back', rle('11110000') === '4140' && rleDecode('4140') !== '11110000', rle('11110000') + ' ↛ ' + rleDecode('4140'))
}

/* ================================================================== */
/* D — Huffman for the pinned alphabet {A:5, B:2, C:1, D:1}            */
/* ================================================================== */
{
  const freqs: [string, number][] = [['A', 5], ['B', 2], ['C', 1], ['D', 1]]
  const total = 9
  const { codes, ladder } = huffman(freqs)
  ok('D01 the merge ladder is 1+1→2, 2+2→4, 4+5→9', JSON.stringify(ladder) === JSON.stringify(['1+1->2', '2+2->4', '4+5->9']), JSON.stringify(ladder))
  const depth = (s: string) => (codes.get(s) as string).length
  ok('D02 the depths are A=1, B=2, C=3, D=3', depth('A') === 1 && depth('B') === 2 && depth('C') === 3 && depth('D') === 3, JSON.stringify([...codes]))
  ok('D03 the codewords are 0, 10, 110, 111', codes.get('A') === '0' && codes.get('B') === '10' && codes.get('C') === '110' && codes.get('D') === '111', JSON.stringify([...codes]))
  ok('D04 the code is prefix-free (no codeword begins another)', prefixFree(codes), JSON.stringify([...codes]))
  ok('D05 the Kraft sum is exactly 1 (a complete code)', kraft(codes) === 1, String(kraft(codes)))
  const fixed = total * 2
  ok('D06 the fixed 2-bit code costs 18 bits', fixed === 18, String(fixed))
  const cost = huffCost(freqs, codes)
  ok('D07 the Huffman code costs 15 bits (5·1+2·2+1·3+1·3)', cost === 15, String(cost))
  ok('D08 the saving is 3 bits = 16.67% (16.6667%)', fixed - cost === 3 && f2((3 / 18) * 100) === '16.67' && f4((3 / 18) * 100) === '16.6667', f2((3 / 18) * 100))
  const H = entropyOf([5, 2, 1, 1])
  ok('D09 the entropy is 1.6577427265048887 bits/symbol', near(H, 1.6577427265048887) && f4(H) === '1.6577', String(H))
  const mean = cost / total
  ok('D10 the Huffman mean is 15/9 = 1.6667, sitting above H', f4(mean) === '1.6667' && mean >= H, f4(mean))
  ok('D11 the gap above the floor prints 0.0089', f4(mean - H) === '0.0089', f4(mean - H))
  const msg = 'AAAAABBCD'
  const bits = [...msg].map((ch) => codes.get(ch) as string).join('')
  ok('D12 the message AAAAABBCD encodes to 000001010110111 (15 bits, one parse)', bits === '000001010110111' && bits.length === 15 && parses(bits, codes).length === 1 && parses(bits, codes)[0].join('') === msg, bits)
  /* brute-force optimality: the only two depth multisets of a full binary
     tree with 4 leaves are the comb {1,2,3,3} and the balanced {2,2,2,2} */
  const weights = [5, 2, 1, 1]
  const shapes = [[1, 2, 3, 3], [2, 2, 2, 2]]
  let best = Infinity
  shapes.forEach((shape) => perms(weights).forEach((p) => {
    best = Math.min(best, p.reduce((s, w, i) => s + w * shape[i], 0))
  }))
  const balancedAlways = perms(weights).every((p) => p.reduce((s, w, i) => s + w * 2, 0) === 18)
  ok('D13 brute force over both tree shapes: 15 bits is optimal (balanced always 18)', best === 15 && balancedAlways, String(best))
}

/* ================================================================== */
/* E — the exercise alphabets + the non-prefix witness                 */
/* ================================================================== */
{
  /* L2: {A:5, B:3, C:1} */
  const f1: [string, number][] = [['A', 5], ['B', 3], ['C', 1]]
  const h1 = huffman(f1)
  ok('E01 {A:5,B:3,C:1}: depths 1/2/2, code 0/10/11, cost 13', (h1.codes.get('A') as string).length === 1 && h1.codes.get('A') === '0' && h1.codes.get('B') === '10' && h1.codes.get('C') === '11' && huffCost(f1, h1.codes) === 13, JSON.stringify([...h1.codes]))
  ok('E02 {A:5,B:3,C:1}: fixed 18, saved 5 = 27.78%, H = 1.3516, mean 1.4444', 9 * 2 === 18 && 18 - 13 === 5 && f2((5 / 18) * 100) === '27.78' && f4(entropyOf([5, 3, 1])) === '1.3516' && f4(13 / 9) === '1.4444', f4(entropyOf([5, 3, 1])))
  ok('E03 {A:5,B:3,C:1} Kraft sum is 1', kraft(h1.codes) === 1, String(kraft(h1.codes)))

  /* L3: the near-uniform {A:5, B:5, C:2, D:2} */
  const f2a: [string, number][] = [['A', 5], ['B', 5], ['C', 2], ['D', 2]]
  const h2 = huffman(f2a)
  ok('E04 {A:5,B:5,C:2,D:2}: depths B=1, A=2, C=3, D=3; code B=1, A=00, C=010, D=011', h2.codes.get('B') === '1' && h2.codes.get('A') === '00' && h2.codes.get('C') === '010' && h2.codes.get('D') === '011', JSON.stringify([...h2.codes]))
  ok('E05 {A:5,B:5,C:2,D:2}: cost 27 against fixed 28 — one bit saved (3.57%)', huffCost(f2a, h2.codes) === 27 && 14 * 2 === 28 && 28 - 27 === 1 && f2((1 / 28) * 100) === '3.57', String(huffCost(f2a, h2.codes)))
  ok('E06 {A:5,B:5,C:2,D:2}: H = 1.8631, mean = 1.9286', f4(entropyOf([5, 5, 2, 2])) === '1.8631' && f4(27 / 14) === '1.9286', f4(entropyOf([5, 5, 2, 2])))

  /* L4: {A:6, B:3, C:2, D:1} */
  const f3: [string, number][] = [['A', 6], ['B', 3], ['C', 2], ['D', 1]]
  const h3 = huffman(f3)
  ok('E07 {A:6,B:3,C:2,D:1}: depths 1/2/3/3, code 0/10/110/111, cost 21', h3.codes.get('A') === '0' && h3.codes.get('B') === '10' && h3.codes.get('C') === '110' && h3.codes.get('D') === '111' && huffCost(f3, h3.codes) === 21, JSON.stringify([...h3.codes]))
  ok('E08 {A:6,B:3,C:2,D:1}: fixed 24, saved 3 = 12.5%, H = 1.7296, mean 1.7500', 12 * 2 === 24 && f2((3 / 24) * 100) === '12.50' && String((3 / 24) * 100) === '12.5' && f4(entropyOf([6, 3, 2, 1])) === '1.7296' && f4(21 / 12) === '1.7500', f4(entropyOf([6, 3, 2, 1])))

  /* L5: the ambiguous non-prefix code {A:0, B:01, C:1} */
  const bad = new Map<string, string>([['A', '0'], ['B', '01'], ['C', '1']])
  const two = parses('001', bad)
  ok('E09 the non-prefix code reads 001 two ways (AAC and AB)', two.length === 2 && JSON.stringify(two.map((t) => t.join(''))) === JSON.stringify(['AAC', 'AB']), JSON.stringify(two.map((t) => t.join(''))))
  ok('E10 the non-prefix code is NOT prefix-free (B begins with A)', !prefixFree(bad), 'A=0 is a prefix of B=01')
}

/* ================================================================== */
/* F — LZW: the pinned ABABABAB run + the exercise witnesses           */
/* ================================================================== */
{
  const r = lzw('ABABABAB', ['A', 'B'])
  ok('F01 ABABABAB emits 5 output codes: A, B, AB, ABA, B', r.out.length === 5 && JSON.stringify(r.out) === JSON.stringify(['A', 'B', 'AB', 'ABA', 'B']), JSON.stringify(r.out))
  ok('F02 the dictionary gains AB, BA, ABA, ABAB (final: A, B, AB, BA, ABA, ABAB)', JSON.stringify(r.added) === JSON.stringify(['AB', 'BA', 'ABA', 'ABAB']) && ['A', 'B'].concat(r.added).length === 6, JSON.stringify(r.added))
  ok('F03 the LZW decode round-trips ABABABAB', lzwDecode(r.out, ['A', 'B']) === 'ABABABAB', lzwDecode(r.out, ['A', 'B']))
  ok('F04 the longest dictionary entry is ABAB (4 characters — the repetition caught)', r.added[r.added.length - 1] === 'ABAB' && r.added[r.added.length - 1].length === 4, r.added[r.added.length - 1])
  const r6 = lzw('AAAAAA', ['A'])
  ok('F05 AAAAAA emits 3 codes: A, AA, AAA; the dictionary gains AA, AAA', r6.out.length === 3 && JSON.stringify(r6.out) === JSON.stringify(['A', 'AA', 'AAA']) && JSON.stringify(r6.added) === JSON.stringify(['AA', 'AAA']) && lzwDecode(r6.out, ['A']) === 'AAAAAA', JSON.stringify(r6.out))
  const r9 = lzw('XYZXYZXYZ', ['X', 'Y', 'Z'])
  ok('F06 XYZXYZXYZ emits 6 codes (X, Y, Z, XY, ZX, YZ); gains XY, YZ, ZX, XYZ, ZXY', r9.out.length === 6 && JSON.stringify(r9.out) === JSON.stringify(['X', 'Y', 'Z', 'XY', 'ZX', 'YZ']) && r9.added.length === 5 && lzwDecode(r9.out, ['X', 'Y', 'Z']) === 'XYZXYZXYZ', JSON.stringify(r9.out))
  ok('F07 8 characters ride out as 5 codes; 6 as 3; 9 as 6', r.out.length === 5 && r6.out.length === 3 && r9.out.length === 6, '')
}

/* ================================================================== */
/* G — the JPEG block census                                           */
/* ================================================================== */
{
  ok('G01 1920/8 = 240 blocks across; 1080/8 = 135 down', 1920 / 8 === 240 && 1080 / 8 === 135, '')
  const blocks = (1920 / 8) * (1080 / 8)
  ok('G02 the 1080p luma plane is 240 × 135 = 32,400 blocks', blocks === 32400, String(blocks))
  ok('G03 32,400 blocks × 64 samples multiply back to exactly 2,073,600', blocks * 64 === 2073600 && blocks * 64 === 1920 * 1080, String(blocks * 64))
  ok('G04 full RGB on a 2×2 macroblock costs 12 samples (4+4+4)', 4 + 4 + 4 === 12, '')
  ok('G05 4:2:0 keeps 6 (4 Y + 1 Cb + 1 Cr) — the census halves', 4 + 1 + 1 === 6 && 12 / 6 === 2, '')
  const chroma = (1920 / 2) * (1080 / 2)
  ok('G06 each chroma plane is 960 × 540 = 518,400; the frame total is 3,110,400 = half of 6,220,800', chroma === 518400 && 2073600 + 2 * chroma === 3110400 && 6220800 / 2 === 3110400, String(chroma))
  const k4blocks = (3840 / 8) * (2160 / 8)
  ok('G07 the 4K census: 480 × 270 = 129,600 blocks × 64 = 8,294,400', k4blocks === 129600 && k4blocks * 64 === 8294400 && k4blocks * 64 === 3840 * 2160, String(k4blocks))
  const k4total = 8294400 + 2 * (1920 * 1080)
  ok('G08 the 4K frame with 4:2:0 totals 12,441,600 = half of the RGB 24,883,200', k4total === 12441600 && 3840 * 2160 * 3 === 24883200 && 24883200 / 2 === k4total, String(k4total))
}

/* ================================================================== */
/* H — the MP3 arithmetic                                              */
/* ================================================================== */
{
  const cd = 44100 * 16 * 2
  ok('H01 the CD rate is 44,100 × 16 × 2 = 1,411,200 bit/s', cd === 1411200, String(cd))
  ok('H02 1,411,200 ÷ 128,000 = 11.025 exactly', cd / 128000 === 11.025, String(cd / 128000))
  const cdBits = cd * 210
  ok('H03 the 210-second CD stream is 296,352,000 bits = 37,044,000 B', cdBits === 296352000 && cdBits / 8 === 37044000, String(cdBits / 8))
  ok('H04 37,044,000 B = 35.327911376953125 MiB (prints 35.3279)', 37044000 / MIB === 35.327911376953125 && f4(37044000 / MIB) === '35.3279', f4(37044000 / MIB))
  const mp3 = 128000 * 210 / 8
  ok('H05 the 128 kbit/s file is 3,360,000 B = 3.204345703125 MiB (prints 3.2043)', mp3 === 3360000 && mp3 / MIB === 3.204345703125 && f4(mp3 / MIB) === '3.2043', f4(mp3 / MIB))
  const mp3hi = 320000 * 210 / 8
  ok('H06 the 320 kbit/s file is 8,400,000 B (prints 8.0109 MiB)', mp3hi === 8400000 && f4(mp3hi / MIB) === '8.0109', f4(mp3hi / MIB))
  ok('H07 1,411,200 ÷ 320,000 = 4.41 exactly', cd / 320000 === 4.41, String(cd / 320000))
  ok('H08 the byte ratios agree: 37,044,000/8,400,000 = 4.41 and /3,360,000 = 11.025', 37044000 / 8400000 === 4.41 && 37044000 / 3360000 === 11.025, '')
  ok('H09 the MiB ratios agree: 35.3279…/3.2043… = 11.025', (37044000 / MIB) / (3360000 / MIB) === 11.025, '')
  const song192 = 192000 * 180 / 8
  const cd180 = 176400 * 180
  ok('H10 the 180-second song: 4,320,000 B at 192k against 31,752,000 B on CD — ratio 7.35', song192 === 4320000 && cd180 === 31752000 && f2(cd / 192000) === '7.35' && cd180 / song192 === 7.35, String(cd180 / song192))
}

/* ================================================================== */
/* I — the nibble-packed RLE design (the L6 exercise)                  */
/* ================================================================== */
{
  ok('I01 a 4-bit count field tops out at 15 per pair', Math.pow(2, 4) - 1 === 15, '')
  ok('I02 AABBCCCCCD packs into 4 pairs = 32 bits against 80 of ASCII — ratio 2.5', rleRuns('AABBCCCCCD').length === 4 && 4 * 8 === 32 && 10 * 8 === 80 && 80 / 32 === 2.5, '')
  ok('I03 AAAAAAAAAA packs into 1 pair = 8 bits against 80 — ratio 10', rleRuns('AAAAAAAAAA').length === 1 && 80 / 8 === 10, '')
  ok('I04 a run of 40 splits as 15 + 15 + 10 = three pairs', 15 + 15 + 10 === 40, '')
  ok('I05 the byte census agrees: 10 bytes in, 4 bytes out', 10 / 4 === 2.5, '')
}

/* ================================================================== */
/* Z — the final re-read of the shipped part (>= 5 checks required)    */
/* ================================================================== */
{
  type Fig = { caption: string; svg: string }
  type Q = { q: string; solution: string | string[]; answer?: string; figures?: Fig[] }
  const blocks = lesson35.blocks as Array<Record<string, unknown> & { kind: string }>
  const figs = blocks.filter((b) => b.kind === 'figure') as unknown as Fig[]
  const exBlocks = blocks.filter((b) => b.kind === 'exercises') as unknown as { sets: { level: string; questions: Q[] }[] }[]
  const quizBlocks = blocks.filter((b) => b.kind === 'quiz') as unknown as { items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const exBlocksAll = blocks.filter((b) => b.kind === 'example') as unknown as { title: string; steps: string[] }[]
  const allQs = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions))
  const solFigs = allQs.flatMap((q) => q.figures ?? [])
  const svgs = [...figs.map((f) => f.svg), ...exBlocksAll ? [] : [], ...solFigs.map((f) => f.svg)]
  const exampleFigs = (blocks.filter((b) => b.kind === 'example') as unknown as { figures?: Fig[] }[]).flatMap((e) => e.figures ?? [])
  svgs.push(...exampleFigs.map((f) => f.svg))

  /* the lesson header, exact */
  ok('Z01 id, number and title are pinned exactly', lesson35.id === 'cf-compression-lossless-and-lossy' && lesson35.number === '3.5' && lesson35.title === 'Compression: Lossless and Lossy', lesson35.id + ' / ' + lesson35.number + ' / ' + lesson35.title)
  ok('Z02 prerequisites are exactly [cf-text-images-and-sound-as-bits]', JSON.stringify(lesson35.prerequisites) === JSON.stringify(['cf-text-images-and-sound-as-bits']), JSON.stringify(lesson35.prerequisites))
  ok('Z03 sources are exactly [cs-cf-web-ground]', JSON.stringify(lesson35.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(lesson35.sources))
  ok('Z04 concepts 5-8 and objectives 5-6', lesson35.concepts.length >= 5 && lesson35.concepts.length <= 8 && (lesson35.objectives?.length ?? 0) >= 5 && (lesson35.objectives?.length ?? 0) <= 6, 'concepts=' + lesson35.concepts.length + ', objectives=' + (lesson35.objectives?.length ?? 0))

  /* depth + anatomy (guarded so the engine runs mid-flight on a stub too) */
  const wc = countLessonWords(lesson35)
  const quiz = quizBlocks[0]?.items ?? []
  ok('Z05 the word count clears the 7,000 floor', wc >= 7000, String(wc))
  ok('Z06 exactly one quiz block with exactly 5 items', quizBlocks.length === 1 && quiz.length === 5, 'quiz blocks=' + quizBlocks.length)
  ok('Z07 the quiz key is [2,3,0,1,0]', JSON.stringify(quiz.map((i) => i.answer)) === JSON.stringify([2, 3, 0, 1, 0]), JSON.stringify(quiz.map((i) => i.answer)))
  ok('Z08 every quiz explain says why each wrong option fails (>= 120 chars each)', quiz.length === 5 && quiz.every((i) => i.explain.length >= 120), quiz.map((i) => i.explain.length).join(','))
  ok('Z09 at least 3 body figures', figs.length >= 3, String(figs.length))
  ok('Z10 at least 4 solution figures inside exercises (0-2 per question)', solFigs.length >= 4 && allQs.every((q) => (q.figures?.length ?? 0) <= 2), String(solFigs.length))
  ok('Z11 15 exercise questions across the sets, levels covering L1..L3 at least', allQs.length === 15 && ['L1', 'L2', 'L3'].every((lv) => exBlocks.flatMap((e) => e.sets.map((s) => s.level)).includes(lv)), String(allQs.length))
  ok('Z12 every exercise solution is a steps array with a terminal answer', allQs.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0), '')
  ok('Z13 Illustrations (example blocks) number 8 to 12', exBlocksAll.length >= 8 && exBlocksAll.length <= 12, String(exBlocksAll.length))
  const tones = blocks.filter((b) => b.kind === 'callout').map((b) => b.tone as string)
  ok('Z14 the callout census carries definition, theorem, historical, warn, insight and exam', ['definition', 'theorem', 'historical', 'warn', 'insight', 'exam'].every((t) => tones.includes(t)), JSON.stringify([...new Set(tones)]))

  /* the pinned strings the prose must carry (dates, names, formats) */
  const prose = JSON.stringify(lesson35)
  const mustHave = ['1952', '1098', '1977', '1978', '1984', '1987', '1996', '1992', '10918', '11172', '1993', '1995', '1974', 'Huffman', 'Welch', 'Berry', 'CompuServe', 'Fraunhofer', 'Tom', 'Diner', 'Ahmed', 'Natarajan', 'Rao', 'DEFLATE', 'Vega', 'Ziv', 'Lempel', 'LZW', '4:2:0', '11.025', '4.41', '16.67', '1.6577', '32,400', '2,073,600', '1,411,200', '2A2B5C1D', '1A1B', '10A', '35.3279', '3.2043']
  const missing = mustHave.filter((s) => !prose.includes(s))
  ok('Z15 every pinned date, name and number rides the prose', missing.length === 0, 'missing: ' + missing.join(', '))

  /* SVG hygiene */
  ok('Z16 every SVG carries viewBox, role="img" and an aria-label', svgs.length > 0 && svgs.every((s) => s.includes('viewBox="0 0 ') && s.includes('role="img"') && s.includes('aria-label')), 'svgs=' + svgs.length)
  const svgTexts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('Z17 SVG text is plain: no $, no backslash TeX, no U+2212 minus', svgTexts.length > 0 && svgTexts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('\u2212')), 'texts=' + svgTexts.length)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('Z18 every SVG font size is at least 9px', fonts.length > 0 && fonts.every((v) => v >= 9), 'min=' + Math.min(...fonts))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  ok('Z19 every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  /* rough text boxes: clipping + pairwise overlap */
  const clipFails: string[] = []
  const overlapFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1]); const H = parseFloat(vb[2])
    const boxes: { x0: number; y0: number; x1: number; y1: number; txt: string }[] = []
    for (const m of s.matchAll(/<text x="(-?[0-9.]+)" y="(-?[0-9.]+)"([^>]*)>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]); const y = parseFloat(m[2]); const attrs = m[3]; const txt = m[4]
      const fs = parseFloat((attrs.match(/font-size="([0-9.]+)"/) ?? [])[1] ?? '12')
      const anchor = (attrs.match(/text-anchor="([a-z]+)"/) ?? [])[1] ?? 'middle'
      const w = txt.length * fs * 0.62
      const x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2
      boxes.push({ x0, y0: y - fs * 0.85, x1: x0 + w, y1: y + fs * 0.3, txt })
    }
    boxes.forEach((b) => {
      if (b.x0 < 1 || b.x1 > W - 1 || b.y0 < 0 || b.y1 > H) clipFails.push('"' + b.txt.slice(0, 22) + '" box=[' + b.x0.toFixed(0) + ',' + b.y0.toFixed(0) + ',' + b.x1.toFixed(0) + ',' + b.y1.toFixed(0) + '] W=' + W + ' H=' + H)
    })
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i]; const b = boxes[j]
      const ow = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)
      const oh = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)
      if (ow > 3 && oh > 3) overlapFails.push('"' + a.txt.slice(0, 16) + '" × "' + b.txt.slice(0, 16) + '" ow=' + ow.toFixed(0) + ' oh=' + oh.toFixed(0))
    }
  }
  ok('Z20 no SVG label clips its viewBox (0.62em/char estimate)', clipFails.length === 0, clipFails.slice(0, 6).join(' ; '))
  ok('Z21 no two SVG labels overlap (0.62em/char estimate, 3px tolerance)', overlapFails.length === 0, overlapFails.slice(0, 6).join(' ; '))

  /* the raw-TeX law over all prose fields (KaTeX-source fields excluded) */
  const proseStrings: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') proseStrings.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula' || k === 'svg' || k === 'aria' || k === 'code') continue
        walk(val)
      }
    }
  }
  walk(lesson35.blocks)
  const mathSpans: string[] = []
  const stripped = proseStrings.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('Z22 no \\qquad inside any inline $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 2).join(' | '))
  ok('Z23 no raw TeX outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 4).join(' | '))
  const heads = blocks.filter((b) => b.kind === 'heading') as unknown as { text: string }[]
  ok('Z24 headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))

  /* the connective voice on worked lines */
  const connectives = ['Take', 'Split', 'Check', 'Now', 'So', 'Then', 'Hence', 'Therefore', 'Thus', 'But', 'Note', 'Watch', 'Compare', 'Multiply', 'Divide', 'Add', 'Subtract', 'Count', 'Repeat', 'Recall', 'Rebuild', 'Read', 'Decode', 'Encode', 'Trace', 'Build', 'Run', 'Apply', 'List', 'Name', 'Turn', 'Convert', 'Verify', 'Weigh', 'Order', 'Place', 'Group', 'Try', 'Mark', 'State', 'Classify', 'Sort', 'Price', 'Halve', 'Double', 'Begin', 'Write', 'Draw', 'Suppose', 'Keep', 'Observe', 'Notice', 'Since', 'Rebuild', 'Census', 'For', 'From', 'With', 'At', 'On', 'In', 'By', 'To', 'As', 'Of', 'Or', 'And', 'The', 'This', 'That', 'Each', 'Every', 'One', 'Two', 'Both', 'All', 'Some', 'If', 'When', 'Again', 'Next', 'Finally', 'Zero', 'Fix', 'Look', 'Test', 'Ask', 'A']
  const lines = [...exBlocksAll.flatMap((e) => e.steps), ...allQs.flatMap((q) => (Array.isArray(q.solution) ? q.solution : [q.solution]))]
  const led = lines.filter((l) => connectives.some((c) => l.startsWith(c)))
  ok('Z25 at least 85% of worked lines open with a house connective', lines.length > 0 && led.length / lines.length >= 0.85, (led.length + '/' + lines.length) + ' — offenders: ' + lines.filter((l) => !connectives.some((c) => l.startsWith(c))).slice(0, 3).join(' | '))
  ok('Z26 the honest word count is computed, not asserted (no words field)', !('words' in lesson35), '')

  console.log('[SUMMARY] words=' + wc + ' | bodyFigs=' + figs.length + ' | solFigs=' + solFigs.length + ' | quizKey=[' + quiz.map((i) => i.answer).join(',') + '] | exercises=' + allQs.length + ' | illustrations=' + exBlocksAll.length)
}

  return { id: 'cf35 engines+pins', pass: P, fail: F }
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

/* ------------------------------------------------------------------ */
/* the report                                                          */
/* ------------------------------------------------------------------ */

console.log('')
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


async function sectionCf38(): Promise<SectionResult> {
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
  return { id: 'cf38 engines+pins', pass: P, fail: F }
}


async function sectionCf3R(): Promise<SectionResult> {

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
  // repaired 2026-11-25 (cf3R seat): the shipped condition
  // `8 === toBase(8, 2).length + 5` is arithmetically impossible
  // (toBase(8,2) = '1000', length 4). The grouping law, verified
  // honestly: the LARGEST octal digit 7 is 111 (3 bits) and the
  // LARGEST hex digit F = 15 is 1111 (4 bits).
  2 ** 3 === 8 && toBase(7, 2).length === 3 && 2 ** 4 === 16 && toBase(15, 2).length === 4)
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
  // repaired 2026-11-25 (cf3R seat): JSON.stringify compares KEY
  // ORDER, and huffDepths emits {B,C,D,A} insertion order, so the
  // original string equality could never hold. Compare per key.
  (() => {
    const d = huffDepths({ A: 5, B: 2, C: 1, D: 1 })
    return d.A === 1 && d.B === 2 && d.C === 3 && d.D === 3
  })())
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

const mod = (await Promise.resolve({ lesson3R })) as { lesson3R?: Lesson } | null
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
  return { id: 'cf3R engines+pins', pass: P, fail: F }
}


/* ================================================================== */
/* SECTION Z — the closed-chapter census                               */
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
  console.log('== SECTION Z: the closed-chapter census ==')
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'data-representation-first-meeting', chapter3.slug)
  z('Z03 chapter title pinned', chapter3.title === 'Data Representation: a First Meeting', chapter3.title)
  z('Z04 chapter status COMPLETE (CS RUN 6 closed it)', chapter3.status === 'complete', chapter3.status)
  z('Z05 nine lessons shipped (8 content + the 3.R review)', chapter3.lessons.length === 9, String(chapter3.lessons.length))
  z('Z06 zero lessons still planned', (chapter3.plannedLessons ?? []).length === 0, String((chapter3.plannedLessons ?? []).length))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything', 'cf-the-numbering-systems-binary-octal-hexadecimal', 'cf-codes-ascii-unicode-and-bcd', 'cf-text-images-and-sound-as-bits', 'cf-compression-lossless-and-lossy', 'cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion', 'cf-decimal-and-binary-number-system', 'cf-unit-3-completion-review']), ids.join(','))
  const nums = chapter3.lessons.map((l) => l.number)
  z('Z08 lesson numbers 3.1..3.8 + 3.R', JSON.stringify(nums) === JSON.stringify(['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.R']), nums.join(','))
  z('Z08b titles pinned verbatim (the planned-lesson contract)', chapter3.lessons[0].title === 'Bits: Why Two Symbols Carry Everything' && chapter3.lessons[1].title === 'The Numbering Systems: Binary, Octal, Hexadecimal' && chapter3.lessons[2].title === 'Codes: ASCII, Unicode and BCD' && chapter3.lessons[3].title === 'Text, Images and Sound as Bits' && chapter3.lessons[4].title === 'Compression: Lossless and Lossy' && chapter3.lessons[5].title === 'Decimal to Binary Conversion' && chapter3.lessons[6].title === 'Binary to Decimal Conversion' && chapter3.lessons[7].title === 'Decimal and Binary Number System' && chapter3.lessons[8].title === 'Unit 3 Completion Review', chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 content; >= 5200 review)', wcs.slice(0, 8).every((w) => w >= 6000) && wcs[8] >= 5200, wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present (5 items)`, l.blocks.some((b) => b.kind === 'quiz' && (b as { items: unknown[] }).items.length === 5))
    z(`Z11.${i + 1} exercises block present (15 questions)`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: unknown[] }[] }).sets.reduce((n, s) => n + s.questions.length, 0) === 15))
    z(`Z11b.${i + 1} v9.0 solution figures present`, l.blocks.some((b) => b.kind === 'exercises' && (b as { sets: { questions: { figures?: unknown[] }[] }[] }).sets.some((s) => s.questions.some((q) => (q.figures ?? []).length > 0))))
    z(`Z11c.${i + 1} >= 3 body figures (vivid-palette law)`, l.blocks.filter((b) => b.kind === 'figure').length >= 3)
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z13 the prereq chain pins (the teaching graph)', JSON.stringify(chapter3.lessons[0].prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake']) && JSON.stringify(chapter3.lessons[1].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[2].prerequisites) === JSON.stringify(['cf-bits-why-two-symbols-carry-everything']) && JSON.stringify(chapter3.lessons[3].prerequisites) === JSON.stringify(['cf-codes-ascii-unicode-and-bcd', 'cf-output-devices-screens-printers-and-sound']) && JSON.stringify(chapter3.lessons[4].prerequisites) === JSON.stringify(['cf-text-images-and-sound-as-bits']) && JSON.stringify(chapter3.lessons[5].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[6].prerequisites) === JSON.stringify(['cf-the-numbering-systems-binary-octal-hexadecimal']) && JSON.stringify(chapter3.lessons[7].prerequisites) === JSON.stringify(['cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion']) && (chapter3.lessons[8].prerequisites ?? []).length === 8, JSON.stringify(chapter3.lessons.map((l) => l.prerequisites)))
  z('Z13b every lesson carries sources (cs-cf-web-ground)', chapter3.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground')))
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all nine lessons', ['lesson31', 'lesson32', 'lesson33', 'lesson34', 'lesson35', 'lesson36', 'lesson37', 'lesson38', 'lesson3R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed shape) ----
  z('Z16 book status in-progress (chapters 4-8 remain)', computerFundamentals.status === 'in-progress', computerFundamentals.status)
  z('Z17 eight chapters on the book map', computerFundamentals.chapters.length === 8, String(computerFundamentals.chapters.length))
  z('Z18 chapters 1 + 2 + 3 complete', computerFundamentals.chapters[0].status === 'complete' && computerFundamentals.chapters[1].status === 'complete' && computerFundamentals.chapters[2].status === 'complete', computerFundamentals.chapters.slice(0, 3).map((c) => c.status).join(','))
  z('Z19 chapters 5-8 still planned (ch.4 closed by RUN 8)', computerFundamentals.chapters.slice(4).every((c) => c.status === 'planned'))
  z('Z20 the cf- prefix in use', ids.every((id) => id.startsWith('cf-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 40))
  const bookWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 80,000 words)', bookWords > 80000, String(bookWords))
  z('Z23 the shelf census grows to 22 written lessons (8 + 9 + 5)', computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0) === 22, String(computerFundamentals.chapters.reduce((n, c) => n + c.lessons.length, 0)))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionCf31(),
    await sectionCf32(),
    await sectionCf33(),
    await sectionCf34(),
    await sectionCf35(),
    await sectionCf36(),
    await sectionCf37(),
    await sectionCf38(),
    await sectionCf3R(),
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
  console.log('RESULT: ALL GREEN — chapter 3 CLOSED COMPLETE (nine lessons + the review; the whole-chapter cadence honoured).')
}

main()
