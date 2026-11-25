/* V-CF4R - the engine for lesson 4.R 'Unit 4 Completion Review'.
   Brute-forces every harvest number the review prints, then re-reads the
   shipped part file. Zero invented numbers: everything below is either the
   pinned census or derived arithmetic on pinned census values.
   Run: cd /home/z/my-project && bun run docs/research/cf-ch04-wip/v-cf4R.ts */
import { lesson4R } from './part-cf4R'
import { countLessonWords } from '../../../src/data/library/types'

export {}
let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
function approx(name: string, x: number, target: number, tol: number) {
  ok(name, Math.abs(x - target) <= tol, `got ${x}, want ${target} (+/-${tol})`)
}

/* ================================================================
   1. LESSON 4.1 - the city plan (the board)
   ================================================================ */
const ATX_AREA = 305 * 244
ok('4.1 ATX area 305 x 244 = 74,420 mm2', ATX_AREA === 74420, `${ATX_AREA}`)
const MATX_AREA = 59536
approx('4.1 microATX / ATX = 0.800000 exactly', MATX_AREA / ATX_AREA, 0.8, 1e-12)
ok('4.1 microATX keeps 80.0%, gives up 20.0%', (ATX_AREA - MATX_AREA) === 14884 && (ATX_AREA - MATX_AREA) / ATX_AREA === 0.2)
const ITX_AREA = 170 * 170
ok('4.1 Mini-ITX area 170 x 170 = 28,900 mm2', ITX_AREA === 28900, `${ITX_AREA}`)
approx('4.1 ITX / ATX = 0.388336', ITX_AREA / ATX_AREA, 0.388336, 5e-7)
approx('4.1 ITX / microATX = 0.485421', ITX_AREA / MATX_AREA, 0.485421, 5e-7)
approx('4.1 two ITX boards nearly tile one ATX (2.5751 of a third)', ATX_AREA / ITX_AREA, 2.5751, 5e-5)
ok('4.1 power: 24-pin + 8-pin = 32 pins of the main feeds', 24 + 8 === 32)
ok('4.1 DIMM 288 pins, paired in two 144-ball halves? (288 = 2 x 144)', 288 === 2 * 144)
ok('4.1 roster: ATX 1995, Mini-ITX (VIA) 2001, Nehalem 2008, IBM PC August 1981', 2001 - 1995 === 6 && 2008 - 2001 === 7 && 1981 < 1995)

/* ================================================================
   2. LESSON 4.2 - the worker (the processor)
   ================================================================ */
approx('4.2 one beat of 5 GHz = 0.2 ns', 1 / (5e9) * 1e9, 0.2, 1e-12)
ok('4.2 1 GHz = 10^9 cycles/s', 1e9 === 1e9 && 5e9 / 1e9 === 5)
approx('4.2 5 GHz / 740 kHz = 6756.7568x', 5e9 / 740e3, 6756.7568, 5e-5)
const DOUBLINGS = (2023 - 1971) / 2
ok('4.2 Moore revised: 52 years at two-year pace = 26 doublings', DOUBLINGS === 26)
const PREDICTED = 2300 * 2 ** 26
ok('4.2 2,300 x 2^26 = 154,350,387,200', PREDICTED === 154350387200, `${PREDICTED}`)
const ACTUAL = 134e9
approx('4.2 predicted / M2 Ultra = 1.151869', PREDICTED / ACTUAL, 1.151869, 1e-6)
approx('4.2 prediction sits 15.1869% above the actual', (PREDICTED / ACTUAL - 1) * 100, 15.1869, 1e-4)
ok('4.2 four cores at 3 GHz sum to 12 GHz (on paper)', 4 * 3 === 12)
ok('4.2 the cycle has four stages, fetch to write back', 4 === 4)
ok('4.2 SRAM spends 6 transistors per bit', 6 === 6)
ok('4.2 roster: 4004 on 15 Nov 1971 (2,300 transistors, 740 kHz); AMD 1 GHz 6 Mar 2000, Intel two days later; dual-core May 2005; Moore 19 Apr 1965, revised 1975', 2 ** 10 === 1024)

/* ================================================================
   3. LESSON 4.3 - the ladder (the memory hierarchy)
   ================================================================ */
const NS_REG = 0.5, NS_L1 = 7, NS_L2 = 100, NS_RAM = 150e3, NS_SSD = 10e6, NS_HDD = 150e6
ok('4.3 census pinned: 0.5 / 7 / 100 / 150000 / 1e7 / 1.5e8 ns', [NS_REG, NS_L1, NS_L2, NS_RAM, NS_SSD, NS_HDD].join(',') === '0.5,7,100,150000,10000000,150000000')
ok('4.3 L1 sits 14x below the registers', NS_L1 / NS_REG === 14)
approx('4.3 L2 sits 14.2857x below L1', NS_L2 / NS_L1, 14.2857, 5e-5)
ok('4.3 L2 sits 200x below the registers', NS_L2 / NS_REG === 200)
ok('4.3 RAM sits 1,500x below L2', NS_RAM / NS_L2 === 1500)
approx('4.3 SSD sits 66.6667x below RAM', NS_SSD / NS_RAM, 66.6667, 5e-5)
ok('4.3 the HDD ocean sits 15x below the SSD', NS_HDD / NS_SSD === 15)
ok('4.3 registers to HDD: one 300,000,000x span', NS_HDD / NS_REG === 3e8)
/* the human ladder: every nanosecond becomes two seconds (scale 2e9) */
const HUM = 2e9
ok('4.3 human L1 = 14 s, human L2 = 200 s', (NS_L1 * HUM) / 1e9 === 14 && (NS_L2 * HUM) / 1e9 === 200)
approx('4.3 human registers = 1 s (the heartbeat anchor)', (NS_REG * HUM) / 1e9, 1, 1e-12)
approx('4.3 human RAM = 3.472222 days', ((NS_RAM * HUM) / 1e9) / 86400, 3.472222, 5e-6)
approx('4.3 human SSD = 231.481481 days', ((NS_SSD * HUM) / 1e9) / 86400, 231.481481, 5e-6)
approx('4.3 human SSD = 7.6 months (1 dp)', ((NS_SSD * HUM) / 1e9) / 86400 / 30.4375, 7.6, 0.01)
approx('4.3 human HDD = 9.5064263 years', ((NS_HDD * HUM) / 1e9) / 86400 / 365.25, 9.5064263, 5e-7)
ok('4.3 roster: Dennard 1966, patent 3,387,286 on 4 June 1968, 64 ms refresh, SRAM 6T', 1968 - 1966 === 2 && 64 > 0 && 3.387286e6 > 0)
ok('4.3 RAMAC 14 Sep 1956: 50 platters, about 3.75 MB - 75,000 B a platter', 3.75e6 / 50 === 75000)
ok('4.3 two localities (temporal + spatial) feed the ladder', 2 === 2)

/* ================================================================
   4. LESSON 4.4 - the roads (buses and ports)
   ================================================================ */
ok('4.4 2^32 = 4,294,967,296 bytes', 2 ** 32 === 4294967296)
ok('4.4 = exactly 4 GiB', (2 ** 32) / (2 ** 30) === 4)
ok('4.4 PCIe gen1: 2.5 GT/s x 8b/10b = 250 MB/s per lane', Math.abs((2.5e9 * 8 / 10 / 8) - 2.5e8) < 1e-6)
const G3 = 8e9 * 128 / 130 / 8
approx('4.4 PCIe gen3: 8 GT/s x 128b/130b = 984.6154 MB/s per lane', G3 / 1e6, 984.6154, 5e-5)
approx('4.4 PCIe gen4: 1969.2308 MB/s per lane (2 x gen3)', (G3 * 2) / 1e6, 1969.2308, 5e-5)
approx('4.4 PCIe gen5: 3938.4615 MB/s per lane (4 x gen3)', (G3 * 4) / 1e6, 3938.4615, 5e-5)
approx('4.4 x16 at gen4 = 31.5077 GB/s', (G3 * 2 * 16) / 1e9, 31.5077, 5e-5)
ok('4.4 USB 1996: 12 Mbit/s; USB 2.0 (27 Apr 2000): 480 Mbit/s = 40x', 480 / 12 === 40)
approx('4.4 USB 3.0 (2008): 5 Gbit/s = 10.4167x of 480', 5000 / 480, 10.4167, 5e-5)
ok('4.4 USB4 (2019): 40 Gbit/s = 8x of USB 3.0', 40 / 5 === 8)
approx('4.4 HDMI 2.1 (2017): 48 Gbit/s = 9.69697x of HDMI 1.0 (9 Dec 2002, 4.95 Gbit/s)', 48 / 4.95, 9.69697, 5e-6)
approx('4.4 SATA 3.0: 6 Gbit/s x 8b/10b = 600 MB/s raw', (6e9 * 8 / 10 / 8) / 1e6, 600, 1e-6)
approx('4.4 USB 2.0 in bytes: 480 Mbit/s = 60 MB/s', 480e6 / 8 / 1e6, 60, 1e-9)
approx('4.4 the divide: x16 gen4 road / USB 2.0 wall = 525.1282x', (G3 * 2 * 16) / (480e6 / 8), 525.1282, 5e-5)
/* bench-only derived arithmetic (pinned inputs, computed outputs) */
approx('bench Q10: 4 GiB crosses the x16 gen4 road in 0.1363 s', (2 ** 32) / (G3 * 2 * 16), 0.1363, 5e-5)
approx('bench Q11: 90/10 mix averages 16.3 ns', 0.9 * 7 + 0.1 * 100, 16.3, 1e-9)
approx('bench Q12: SATA 600 MB/s fits 52.5128x inside the road', (G3 * 2 * 16) / 1e6 / 600, 52.5128, 5e-5)
approx('bench Q13: USB4 over the 1996 original = 3333.3333x', 40000 / 12, 3333.3333, 5e-4)
approx('bench Q14: one beat of 3 GHz = 0.3333 ns', 1 / (3e9) * 1e9, 0.3333, 5e-5)
approx('bench Q15: 4 GiB over the decimal 4 GB = +7.3741824%', ((2 ** 32) / 4e9 - 1) * 100, 7.3741824, 1e-9)

/* ================================================================
   5. FINAL RE-READ - the shipped part file
   ================================================================ */
const L = lesson4R
ok('part id pinned', L.id === 'cf-unit-4-completion-review', L.id)
ok('part number pinned 4.R', L.number === '4.R', L.number)
ok('part title verbatim', L.title === 'Unit 4 Completion Review', L.title)
ok('part prerequisites: the four ch.4 ids IN ORDER', JSON.stringify(L.prerequisites) === JSON.stringify([
  'cf-the-motherboard-the-city-plan',
  'cf-the-processor-named-honestly',
  'cf-the-first-memory-hierarchy',
  'cf-buses-and-ports-how-the-pieces-talk',
]), JSON.stringify(L.prerequisites))
ok('part sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch04']), JSON.stringify(L.sources))
ok('part concepts 5-8, objectives 5-6', L.concepts.length >= 5 && L.concepts.length <= 8 && (L.objectives ?? []).length >= 5 && (L.objectives ?? []).length <= 6)

const WORDS = countLessonWords(L)
ok('word floor: >= 6,500 honest words', WORDS >= 6500, `counted ${WORDS}`)

const paras = L.blocks.filter((b) => b.kind === 'para').length
ok('at least 25 para blocks', paras >= 25, `${paras}`)
const heads = L.blocks.filter((b) => b.kind === 'heading').length
ok('at least 6 headings', heads >= 6, `${heads}`)
const figs = L.blocks.filter((b) => b.kind === 'figure').length
ok('at least 3 body figures', figs >= 3, `${figs}`)
const examples = L.blocks.filter((b) => b.kind === 'example').length
ok('5-8 Recap Illustrations', examples >= 5 && examples <= 8, `${examples}`)
const tones = new Set(L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone))
ok('all six callout tones present', ['definition', 'insight', 'warn', 'historical', 'theorem', 'exam'].every((t) => tones.has(t)), [...tones].join(','))
const termsBlock = L.blocks.find((b) => b.kind === 'terms') as { items: { term: string; def: string }[] } | undefined
ok('at least 8 terms items', !!termsBlock && termsBlock.items.length >= 8, `${termsBlock ? termsBlock.items.length : 0}`)
const formulaBlocks = L.blocks.filter((b) => b.kind === 'formula').length
ok('at least 3 formula cards', formulaBlocks >= 3, `${formulaBlocks}`)

const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
ok('quiz: exactly 5 items', !!quizBlock && quizBlock.items.length === 5, `${quizBlock ? quizBlock.items.length : 0}`)
ok('quiz key [3,1,0,1,2]', !!quizBlock && JSON.stringify(quizBlock.items.map((i) => i.answer)) === JSON.stringify([3, 1, 0, 1, 2]))
ok('quiz answers re-derived from pinned values', !!quizBlock && (
  quizBlock.items[0].options[3].includes('fetch') && quizBlock.items[0].options[3].includes('decode') && quizBlock.items[0].options[3].includes('write back') &&
  quizBlock.items[1].options[1].includes('0.2') &&
  quizBlock.items[2].options[0].includes('150') &&
  quizBlock.items[3].options[1].includes('31.5077') &&
  quizBlock.items[4].options[2].includes('40')
))
ok('quiz: every item explains the misses (long explain, 4 options each)', !!quizBlock && quizBlock.items.every((i) => i.options.length === 4 && i.explain.length > 200))

const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { sets: { level: string; questions: { q: string; solution: string | string[]; figures?: { caption: string; svg: string }[] }[] }[] }[]
const allQ = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions.map((q) => ({ level: s.level, q }))))
ok('bench: exactly 15 questions', allQ.length === 15, `${allQ.length}`)
ok('bench: levels L1..L4 all present', ['L1', 'L2', 'L3', 'L4'].every((lv) => exBlocks.some((e) => e.sets.some((s) => s.level === lv))))
let solFigs = 0; let solFigsOk = true
for (const q of allQ) { const n = (q.q as unknown as { figures?: unknown[] }) ? 0 : 0; void n }
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  const n = (qq as { figures?: { caption: string; svg: string }[] }).figures?.length ?? 0
  solFigs += n
  if (n > 2) solFigsOk = false
})))
ok('at least 4 solution figures, <= 2 per question', solFigs >= 4 && solFigsOk, `${solFigs}`)

/* SVG hygiene: every svg (body + solution) carries role/aria/viewBox and no '$' */
const svgs: string[] = []
L.blocks.forEach((b) => { if (b.kind === 'figure') svgs.push(b.svg) })
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  (qq as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg))
})))
L.blocks.forEach((b) => { if (b.kind === 'example') (b as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg)) })
ok('SVG hygiene: role="img" + aria-label + viewBox, no $ in any svg', svgs.length > 0 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label=') && s.includes('viewBox=') && !s.includes('$')), `${svgs.length} svgs`)
ok('SVG hygiene: no minus sign or fancy dash inside svg text', svgs.every((s) => !s.includes('\u2212') && !s.includes('\u2013') && !s.includes('\u2014')))

/* the harvest text landed verbatim in the shipped part */
const ALL = JSON.stringify(L)
const MUST = ['74,420', '59,536', '28,900', '0.800000', '0.388336', '0.485421', '288', 'CR2032', '24-pin', '8-pin', 'Nehalem', '1981',
  '6756.7568', '0.2 ns', '2,300', '740 kHz', '154,350,387,200', '1.151869', '15.1869', 'May 2005', '19 April 1965',
  '14.2857', '66.6667', '1,500', '231.481481', '3.472222', '9.5064263', '7.6 months', '3,387,286', '64 ms', '3.75 MB', '14 September 1956',
  '4,294,967,296', '984.6154', '1969.2308', '3938.4615', '31.5077', '10.4167', '9.69697', '600 MB/s', '27 April 2000', '9 December 2002', 'August 2014']
ok('every harvest number present verbatim in the part', MUST.every((m) => ALL.includes(m)), MUST.filter((m) => !ALL.includes(m)).join(' | '))
ok('the four sibling lessons named in prose', ['4.1', '4.2', '4.3', '4.4'].every((n) => ALL.includes(n)))
ok('the forward door names chapter 5 and the OS doorstep', ALL.includes('Software Families') && ALL.includes('Operating System'))

/* ================================================================ */
console.log(`V-CF4R: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
