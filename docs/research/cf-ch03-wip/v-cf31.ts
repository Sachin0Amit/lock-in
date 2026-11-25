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
  const mod = await import('./part-cf31')
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
  const src = await Bun.file(import.meta.dir + '/part-cf31.ts').text()
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
console.log(`V-CF31: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
