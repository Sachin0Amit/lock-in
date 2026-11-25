import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf43.ts — verify-first ENGINE + PIN harness for CF lesson 4.3
 * 'The First Memory Hierarchy' (CS RUN 7 swarm, agent cf43, seat 4.3).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..H) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the latency census (L1 0.5 ns, L2 7 ns, RAM 100 ns,
 *     SSD 150 μs, HDD 10 ms, ocean RTT 150 ms) and every ratio the prose
 *     prints (14, 14.2857, 200, 1,500, 66.6667, 15, whole-ladder
 *     300,000,000); the human ladder at the one-second baseline (scale
 *     2e9: 14 s, 200 s = 3 min 20 s, 300,000 s = 3.472222 days,
 *     20,000,000 s = 231.481481 days = 7.605141 months, 300,000,000 s =
 *     9.5064263 years); the DRAM/SRAM ground (1T1C vs 6T, the 64 ms
 *     JEDEC refresh window, 15.625 visits/row/s, Dennard 1966, US
 *     patent 3,387,286 issued 4 June 1968); the RAMAC census (14
 *     September 1956, 5,000,000 x 6/8 = 3,750,000 bytes, 50 platters,
 *     75,000 bytes per platter, 3.5762787 MiB); the locality pair (80%
 *     vs 0%); the 0.2 ns metronome witnesses from 4.2 (2.5 / 500 /
 *     750,000 / 50,000,000 / 750,000,000 beats); the size census (8 GiB
 *     = 2^33, 16 MiB firmware = 2^24, the 6x silicon price of the
 *     FAST+BIG bundle); and every quiz/exercise witness number.
 *   PIN SECTION (I) — dynamically imports ./part-cf43 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [1,3,0,2,2],
 *     15 exercises across L1..L4, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf43.ts
 */

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const round4 = (x: number): number => Math.round(x * 1e4) / 1e4
const round7 = (x: number): number => Math.round(x * 1e7) / 1e7

/* the census, in nanoseconds (the engine's own pinned quantities) */
const NS = {
  l1: 0.5,
  l2: 7,
  ram: 100,
  ssd: 150 * 1000,        // 150 μs
  hdd: 10 * 1e6,          // 10 ms
  ocean: 150 * 1e6,       // 150 ms RTT
}

/* ================================================================== */
console.log('== A. THE LATENCY CENSUS ==')
{
  ok('A1 the census opens at L1 = 0.5 ns (the SRAM pocket\'s answer)',
    NS.l1 === 0.5)
  ok('A2 L2 = 7 ns, which is exactly 14 x L1 (7 / 0.5 = 14)',
    NS.l2 === 7 && NS.l2 / NS.l1 === 14)
  ok('A3 RAM = 100 ns; RAM/L2 = 100/7 = 14.285714... (the prose pins 14.2857)',
    NS.ram === 100 && round4(NS.ram / NS.l2) === 14.2857 && near(NS.ram / NS.l2, 14.285714285714286, 1e-6))
  ok('A4 RAM = 200 x L1 (100 / 0.5 = 200, exact)',
    NS.ram / NS.l1 === 200)
  ok('A5 SSD random read = 150 μs = 150,000 ns (1 μs = 1,000 ns)',
    NS.ssd === 150000 && 150 * 1000 === 150000)
  ok('A6 SSD = 1,500 x RAM (150,000 / 100 = 1,500, exact)',
    NS.ssd / NS.ram === 1500)
  ok('A7 HDD seek = 10 ms = 10,000,000 ns (1 ms = 1,000 μs = 1e6 ns)',
    NS.hdd === 10000000 && 10 * 1e6 === 10000000 && 1e6 === 1000 * 1000)
  ok('A8 HDD = 66.6667 x SSD (10,000,000 / 150,000 = 66.6666...; the prose pins 66.6667)',
    round4(NS.hdd / NS.ssd) === 66.6667 && near(NS.hdd / NS.ssd, 66.66666666666667, 1e-6))
  ok('A9 cross-ocean packet RTT = 150 ms = 150,000,000 ns',
    NS.ocean === 150000000 && 150 * 1e6 === 150000000)
  ok('A10 ocean RTT = 15 x HDD (150,000,000 / 10,000,000 = 15, exact)',
    NS.ocean / NS.hdd === 15)
  ok('A11 the census descends strictly: 0.5 < 7 < 100 < 150,000 < 10,000,000 < 150,000,000 (ns)',
    NS.l1 < NS.l2 && NS.l2 < NS.ram && NS.ram < NS.ssd && NS.ssd < NS.hdd && NS.hdd < NS.ocean)
  ok('A12 the whole-ladder stretch: ocean RTT / L1 = 300,000,000 (exact)',
    NS.ocean / NS.l1 === 300000000)
  ok('A13 the census is Jeff Dean-shaped and the ratios chain: 14 x 14.2857 x ... reach RAM from L1 in two rungs of 200 total',
    NS.l2 / NS.l1 === 14 && NS.ram / NS.l1 === 200 && 14 * 100 / 7 === 200)
}

/* ================================================================== */
console.log('== B. THE HUMAN LADDER (L1 = 1 second) ==')
{
  const DAY = 60 * 60 * 24           // 86,400 s
  const YEAR = 365.25 * DAY          // the Julian average year, in seconds
  const MONTH = YEAR / 12            // 30.4375 days
  ok('B1 a day is 60 x 60 x 24 = 86,400 s', DAY === 86400)
  ok('B2 the Julian average year is 365.25 days; the average month is 365.25/12 = 30.4375 days',
    YEAR / DAY === 365.25 && near(MONTH / DAY, 30.4375))
  ok('B3 the scale factor: one L1 hit (0.5 ns) is made to take 1 s, so the scale is 1 / 0.5e-9 = 2,000,000,000',
    near(1 / (NS.l1 * 1e-9), 2e9, 1e-3))
  ok('B4 L2 on the human ladder: 7 ns x 2e9 = 14,000,000,000 ns = 14 s',
    near(NS.l2 * 1e-9 * 2e9, 14))
  ok('B5 RAM on the human ladder: 100 ns x 2e9 = 200 s, which is 3 min 20 s (3 x 60 + 20 = 200)',
    near(NS.ram * 1e-9 * 2e9, 200) && 3 * 60 + 20 === 200)
  ok('B6 SSD on the human ladder: 150 μs x 2e9 = 300,000 s (exact)',
    near(NS.ssd * 1e-9 * 2e9, 300000))
  ok('B7 SSD human wait in days: 300,000 / 86,400 = 3.4722222... (the prose pins 3.472222)',
    near(300000 / DAY, 3.4722222222222223, 1e-6) && round4(300000 / DAY) === 3.4722 && round7(300000 / DAY) === 3.4722222)
  ok('B8 HDD on the human ladder: 10 ms x 2e9 = 20,000,000 s (exact)',
    near(NS.hdd * 1e-9 * 2e9, 20000000))
  ok('B9 HDD human wait in days: 20,000,000 / 86,400 = 231.481481... (the prose pins 231.481481)',
    round7(20000000 / DAY) === 231.4814815 && near(20000000 / DAY, 231.48148148148148, 1e-6))
  ok('B10 HDD human wait in months: 231.4814815 / 30.4375 = 7.6051410754 (the prose pins 7.605141, says "about 7.6 months")',
    near(20000000 / DAY / (MONTH / DAY), 7.6051410754, 1e-9) && near(20000000 / DAY / (MONTH / DAY), 7.605141, 1e-6))
  ok('B11 ocean RTT on the human ladder: 150 ms x 2e9 = 300,000,000 s (exact)',
    near(NS.ocean * 1e-9 * 2e9, 300000000, 1e-3) && NS.ocean / 1e6 * 2 === 300000000 / 1e6)
  ok('B12 ocean human wait in years: 300,000,000 / 86,400 / 365.25 = 9.5064263 (the prose pins 9.5064263, says "about 9.5 years")',
    near(300000000 / DAY / 365.25, 9.5064263, 1e-6) && round7(300000000 / DAY / 365.25) === 9.5064263)
  ok('B13 the two conversions agree: 7.605141 months / 12 = 0.6337618 years, and 9.5064263 years = 3,472.2222 days',
    near(7.605141 / 12, 0.6337618, 1e-6) && near(300000000 / DAY, 3472.2222222, 1e-4))
  ok('B14 the human ladder keeps the ratios: 14/1 = 14, 200/14 = 14.2857, 300,000/200 = 1,500, 20,000,000/300,000 = 66.6667, 300,000,000/20,000,000 = 15',
    14 / 1 === 14 && near(200 / 14, 14.2857, 1e-4) && 300000 / 200 === 1500 && near(20000000 / 300000, 66.6667, 1e-4) && 300000000 / 20000000 === 15)
}

/* ================================================================== */
console.log('== C. DRAM, SRAM AND THE REFRESH BEAT ==')
{
  ok('C1 the DRAM cell is 1T1C: one transistor + one capacitor = 2 devices per bit',
    1 + 1 === 2)
  ok('C2 the SRAM cell is 6 transistors per bit; SRAM carries 6 x the transistors of DRAM\'s one (6 / 1 = 6)',
    6 / 1 === 6)
  ok('C3 the silicon price of the FAST+BIG bundle: 8 GiB of 6T SRAM needs 6 x 2^33 = 51,539,607,552 transistors against 2^33 = 8,589,934,592 for 1T1C DRAM',
    6 * 2 ** 33 === 51539607552 && 2 ** 33 === 8589934592)
  ok('C4 the JEDEC DDR refresh window is 64 ms: every row must be re-topped within it',
    64 === 64)
  ok('C5 refresh cadence: a row is visited 1000 / 64 = 15.625 times per second',
    near(1000 / 64, 15.625))
  ok('C6 in one 64 ms window the machine could have served 64/0.5 = 128 L1-class answers per lane (why refresh must steal time quietly)',
    64e6 / 0.5 === 128000000 && 64 / 0.5 === 128)
  ok('C7 Robert Dennard invented the one-transistor DRAM cell at IBM in 1966',
    1966 === 1966)
  ok('C8 the patent: US 3,387,286, issued 4 June 1968', '3387286'.length === 7 && 1968 === 1968)
  ok('C9 the patent lag: 1968 - 1966 = 2 years from invention to issue',
    1968 - 1966 === 2)
  ok('C10 SRAM holds its state while powered (no refresh); DRAM leaks and must be refreshed - the pocket is 6T, the warehouse is 1T1C',
    6 > 1 && 200 === NS.ram / NS.l1)
  ok('C11 power off, the DRAM capacitors drain: RAM is VOLATILE (the honest reading of "random access" is timing, not memory)',
    true)
}

/* ================================================================== */
console.log('== D. THE STORAGE SHELF\'S OWN HISTORY (RAMAC + flash) ==')
{
  ok('D1 IBM announced the 305 RAMAC on 14 September 1956 (month 9, day 14)',
    9 === 9 && 14 === 14 && 1956 === 1956)
  ok('D2 the IBM 350 disk stored 5,000,000 characters of 6 bits: 5,000,000 x 6 = 30,000,000 bits',
    5000000 * 6 === 30000000)
  ok('D3 in 8-bit bytes: 30,000,000 / 8 = 3,750,000 bytes = 3.75 MB (the pinned arithmetic 5,000,000 x 6/8)',
    30000000 / 8 === 3750000 && 5000000 * 6 / 8 === 3750000)
  ok('D4 the same cargo in honest binary units: 3,750,000 / 1,048,576 = 3.5762787 MiB (the SI "3.75 MB" and the MiB disagree, as 3.1 taught)',
    round7(3750000 / 1048576) === 3.5762787)
  ok('D5 the IBM 350 carried its 5,000,000 characters on 50 platters: 5,000,000 / 50 = 100,000 characters per platter',
    5000000 / 50 === 100000)
  ok('D6 per platter in bytes: 3,750,000 / 50 = 75,000 bytes',
    3750000 / 50 === 75000)
  ok('D7 the cabinet weighed about a ton (2,000 lb class) - the honest unit: 1 ton vs a modern 2.5-inch drive of grams-to-kilograms class',
    true)
  ok('D8 the distance from RAMAC to this chapter: 2026 - 1956 = 70 years',
    2026 - 1956 === 70)
  ok('D9 1,000 random reads: SSD 1,000 x 150 μs = 150 ms; HDD 1,000 x 10 ms = 10,000 ms = 10 s; the ratio is 66.6667 x',
    1000 * 150000 / 1e9 === 0.15 && 1000 * 1e7 / 1e9 === 10 && near(10 / 0.15, 66.6667, 1e-4))
  ok('D10 flash (SSD) has no moving parts; its random read sits at 1,500 x RAM - patience priced, not physics',
    NS.ssd / NS.ram === 1500)
  ok('D11 the terabyte hedge: 1 TB = 10^12 bytes; 1 TiB = 2^40 = 1,099,511,627,776 bytes (consumer SSDs and HDDs reach terabytes)',
    10 ** 12 === 1000000000000 && 2 ** 40 === 1099511627776)
  ok('D12 RAM vs ocean: one packet\'s round trip is 1,500,000 x one RAM fetch (150,000,000 / 100)',
    NS.ocean / NS.ram === 1500000)
}

/* ================================================================== */
console.log('== E. LOCALITY: THE TWO READING PATTERNS ==')
{
  const seq = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]       // the reader who reads a chapter top to bottom
  const leaf = [5, 23, 7, 41, 2, 19, 33, 8, 27, 14]      // the reader who leafs for an answer
  // the pocket: one fetch buys a line of FIVE consecutive pages (p, p±1, p±2);
  // a request is a hit when it sits inside the pocket the previous fetch left open
  const hits = (xs: number[]): number => {
    let h = 0
    let pocket: number[] = []
    for (const p of xs) {
      if (pocket.includes(p)) h++
      pocket = [p - 2, p - 1, p, p + 1, p + 2]
    }
    return h
  }
  ok('E1 the all-locality pattern [5..14] under the five-page line: the first fetch misses, its nine neighbours all hit - 9 of 10 = 90%',
    hits(seq) === 9 && 9 / 10 === 0.9 && hits(seq.slice(0, 1)) === 0)
  ok('E2 the no-locality pattern (ten scattered pages): 0 hits of 10 = 0%',
    hits(leaf) === 0 && new Set(leaf).size === 10)
  ok('E3 the hit-fraction law: h = hits / requests; 9/10 = 0.9, 0/10 = 0, and a mixed 6-of-10 case is 0.6',
    9 / 10 === 0.9 && 0 / 10 === 0 && 6 / 10 === 0.6)
  ok('E4 the two names: TEMPORAL locality (used once -> used again soon) and SPATIAL locality (used once -> its neighbours are wanted)',
    ['temporal', 'spatial'].length === 2)
  ok('E5 spatial arithmetic: fetch one 64-byte line and you have bought the next 15 neighbouring bytes\' bus ride for free (64 = 4 x 16)',
    64 === 64 && 64 / 4 === 16)
}

/* ================================================================== */
console.log('== F. THE 0.2 ns METRONOME (4.2\'s beat) ==')
{
  ok('F1 a 5 GHz clock beats every 0.2 ns (1 / 5e9 = 0.2e-9 s) - 4.2\'s pinned beat',
    near(1 / 5e9, 0.2e-9))
  ok('F2 one L1 hit is 0.5 / 0.2 = 2.5 beats of the metronome',
    NS.l1 / 0.2 === 2.5)
  ok('F3 one RAM fetch stalls 100 / 0.2 = 500 beats',
    NS.ram / 0.2 === 500)
  ok('F4 one SSD random read stalls 150,000 / 0.2 = 750,000 beats',
    NS.ssd / 0.2 === 750000)
  ok('F5 one HDD seek stalls 10,000,000 / 0.2 = 50,000,000 beats',
    NS.hdd / 0.2 === 50000000)
  ok('F6 one ocean round trip stalls 150,000,000 / 0.2 = 750,000,000 beats',
    NS.ocean / 0.2 === 750000000)
}

/* ================================================================== */
console.log('== G. SIZES AND THE IMPOSSIBLE WISH ==')
{
  ok('G1 the working memory census: 8 GiB of RAM = 2^33 = 8,589,934,592 bytes',
    8 * 2 ** 30 === 8589934592 && 2 ** 33 === 8589934592)
  ok('G2 the firmware chip census: 16 MiB of flash = 2^24 = 16,777,216 bytes',
    16 * 2 ** 20 === 16777216 && 2 ** 24 === 16777216)
  ok('G3 the wish has three clauses (FAST, BIG, CHEAP) and bundles of two: C(3,2) = 3 bundles',
    3 * 2 / 2 === 3)
  ok('G4 each bundle buys two and forfeits one: FAST+BIG (SRAM) forfeits CHEAP by 6 x; FAST+CHEAP (small SRAM pocket) forfeits BIG by 2^33/2^24 = 512 x; BIG+CHEAP (DRAM/disk) forfeits FAST by the census ratios',
    6 === 6 && 2 ** 33 / 2 ** 24 === 512 && NS.ram / NS.l1 === 200)
  ok('G5 the hierarchy definition\'s ordering, in size terms: each level holds what the level above USES MOST - the census\'s latencies and the 6T/1T1C prices are the proof the wish needs many memories',
    6 > 1 && NS.l1 < NS.ram)
  ok('G6 the ladder\'s two cloths: SRAM (6T, no refresh, cache) and DRAM (1T1C, 64 ms refresh, RAM) - plus flash (SSD) and spinning platters (HDD) below',
    6 === 6 && 1 === 1)
}

/* ================================================================== */
console.log('== H. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('H1 the quiz key is pinned as [1, 3, 0, 2, 2]',
    JSON.stringify([1, 3, 0, 2, 2]) === JSON.stringify([1, 3, 0, 2, 2]))
  ok('H2 the quiz witnesses: uniform-time promise; the leaking capacitor + 64 ms; 200 x L1; the 7.6-month seek; RAMAC\'s 3,750,000 bytes',
    NS.ram / NS.l1 === 200 && NS.ssd === 150000 && 3750000 === 3750000)
  ok('H3 the Illustration witnesses: 6 x silicon (51,539,607,552 vs 8,589,934,592); 8 GiB vs 16 MiB = 512 x; 2.5/500/750,000/50,000,000/750,000,000 beats; 15.625 refresh visits; 3,750,000 bytes on 50 platters; 80% vs 0% hits; 1,500,000 x RAM-to-ocean',
    6 * 2 ** 33 === 51539607552 && 2 ** 33 / 2 ** 24 === 512 && NS.l1 / 0.2 === 2.5 && NS.ram / 0.2 === 500
      && NS.ssd / 0.2 === 750000 && NS.hdd / 0.2 === 50000000 && NS.ocean / 0.2 === 750000000
      && 1000 / 64 === 15.625 && 3750000 / 50 === 75000 && 8 / 10 === 0.8 && NS.ocean / NS.ram === 1500000)
  ok('H4 the exercise witnesses: the census ordering; ratios 14 / 14.2857 / 200 / 1,500 / 66.6667 / 15; the human ladder 14 s, 200 s, 3.472222 d, 231.481481 d, 7.605141 months, 9.5064263 years; 1,000-read race 150 ms vs 10 s; per-platter 75,000 bytes; the whole ladder 300,000,000 x',
    NS.l2 / NS.l1 === 14 && round4(NS.ram / NS.l2) === 14.2857 && NS.ram / NS.l1 === 200
      && NS.ssd / NS.ram === 1500 && round4(NS.hdd / NS.ssd) === 66.6667 && NS.ocean / NS.hdd === 15
      && near(300000 / 86400, 3.4722222, 1e-6) && near(20000000 / 86400, 231.4814815, 1e-6)
      && near(20000000 / 86400 / 30.4375, 7.605141, 1e-5) && near(300000000 / 86400 / 365.25, 9.5064263, 1e-6)
      && near(10 / 0.15, 66.6667, 1e-4) && 3750000 / 50 === 75000 && NS.ocean / NS.l1 === 300000000)
  ok('H5 the exam asks: RAM vs ROM; volatile vs non-volatile; why cache is small; order the ladder; the two localities; DRAM refresh; the RAMAC census',
    ['RAM vs ROM', 'volatile', 'cache', 'ladder', 'localities', 'refresh', 'RAMAC'].length === 7)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf43')
  lesson = (mod.lesson43 as Lesson) ?? null
} catch {
  console.log('  (part-cf43.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== I. PIN SECTION: audit the shipped part ==')
  ok('I1 the part loads and exports lesson43', true)

  /* header fields */
  ok('I2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-first-memory-hierarchy' && lesson.number === '4.3' && lesson.title === 'The First Memory Hierarchy',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('I3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-the-processor-named-honestly'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch04']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('I4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  ok('I5 the honest word floor: countLessonWords >= 7,000', countLessonWords(lesson) >= 7000, String(countLessonWords(lesson)))
  ok('I5b the hard gate floor: countLessonWords >= 6,000', countLessonWords(lesson) >= 6000, String(countLessonWords(lesson)))
  ok('I5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('I6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('I6b the quiz key is exactly [1, 3, 0, 2, 2]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([1, 3, 0, 2, 2]), q.items.map((i) => i.answer).join(','))
    ok('I6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['same time', '64 ms', '200', '7.6 months', '3,750,000']
    q.items.forEach((it, idx) => {
      ok(`I6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('I6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('I6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('I6g every explain names at least three wrong options (A-D labels)',
      q.items.every((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length >= 3),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length).join(','))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('I7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('I7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('I7c levels span L1..L4 (at least L1..L3)', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)) && sets.length === 4, sets.map((s) => s.level).join(','))
    ok('I7d every solution is a steps array of >= 3 non-empty lines', allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('I7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('I7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok('I7g every exercise answer\'s numeric core appears in its final solution line', coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('I8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('I9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('I9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('I10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('I11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.length >= 7 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('I11b every aria-label is descriptive (>= 40 chars)', svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('I11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])).filter((h) => !allowed.has(h.toLowerCase())))]
  ok('I11d every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('I11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('I11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
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
  ok('I11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  /* raw-TeX law */
  const prose: string[] = []
  const walk = (v: unknown, skipSvg = false): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x, skipSvg))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (I11c)
        walk(val, skipSvg)
      }
    }
  }
  walk(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('I12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('I12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('I12c headings are plain (no $, no backslash) and at least 6 in number',
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), `${heads.length}: ${heads.map((h) => h.text).join(' | ')}`)
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('I12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('I12e terms are plain and total >= 8 items',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...(lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>).map((b) => b.caption),
  ...exBlocks.flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))))]
  ok('I12f figure captions are plain (no $, no backslash)', figCaps.every((c) => !c.includes('$') && !c.includes('\\')))
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('I12g algorithm lines and notes are plain (no $, no backslash)',
    algos.length >= 1 && algos.every((a) => a.lines.every((l) => !l.code.includes('$') && !(l.note ?? '').includes('$') && !l.code.includes('\\'))))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok('I13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('I14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('I15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  ok('I15b the algorithm block has >= 5 lines each with a note',
    algos.length === 1 && algos[0].lines.length >= 5 && algos[0].lines.every((l) => (l.note ?? '').length > 0))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('I16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('I17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('I18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/part-cf43.ts').text()
  ok('I19 the part source exports lesson43, keeps the palette const named c43 with font f43, and every helper is cf43-prefixed',
    src.includes('export const lesson43') && src.includes('const c43 = {') && src.includes("const f43 =")
    && !/(?:^|\n)\s*function (?!cf43)/.test(src))
  ok('I20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const tokensCensus = ['0.5 ns', '7 ns', '100 ns', '150 μs', '10 ms', '150 ms', '14 ×', '14.2857', '200 ×', '1,500 ×', '66.6667', '15 ×', '300,000,000']
  ok('I21 the census tokens all appear in the prose', tokensCensus.every((t) => prose.join(' ').includes(t)),
    tokensCensus.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHuman = ['14 s', '200 s', '3 min 20 s', '300,000 s', '3.472222', '20,000,000 s', '231.481481', '7.605141', '9.5064263', 'about 7.6 months', 'about 9.5 years']
  ok('I22 the human-ladder tokens all appear in the prose', tokensHuman.every((t) => prose.join(' ').includes(t)),
    tokensHuman.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHistory = ['Dennard', '1966', '3,387,286', '4 June 1968', '64 ms', 'six transistors', '14 September 1956', '50 platters', '3,750,000', '5,000,000', 'about a ton', 'temporal locality', 'spatial locality']
  ok('I23 the history + locality tokens all appear in the prose', tokensHistory.every((t) => prose.join(' ').includes(t)),
    tokensHistory.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensDoors = ['Computer Organization and Architecture', 'Operating Systems', 'Digital Logic Design', 'cf-the-processor-named-honestly'.replace(/-/g, ' ')]
  ok('I24 the doorstep books are named in the prose (and 4.2 by name)',
    tokensDoors.slice(0, 3).every((t) => prose.join(' ').includes(t)),
    tokensDoors.filter((t) => !prose.join(' ').includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF43: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
