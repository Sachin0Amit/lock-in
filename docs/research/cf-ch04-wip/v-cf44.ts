/* V-CF44 — engine for lesson 4.4 'Buses and Ports: How the Pieces Talk'.
   Brute-forces every pinned number of spec-cf44, then re-reads the
   shipped part. The engine is law: fix the PART, never this file. */
import { lesson44 } from './part-cf44'
import { countLessonWords } from '../../../src/data/library/types'

export {}
let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ---------------- A. width arithmetic (the 2^n law) ---------------- */
const P8 = Math.pow(2, 8), P16 = Math.pow(2, 16), P30 = Math.pow(2, 30)
const P31 = Math.pow(2, 31), P32 = Math.pow(2, 32), P48 = Math.pow(2, 48), P64 = Math.pow(2, 64)
ok('2^32 = 4,294,967,296 exactly', P32 === 4294967296)
ok('4 GiB exactly (2^32 / 2^30 = 4)', P32 / Math.pow(2, 30) === 4)
ok('2^64 = 18,446,744,073,709,551,616 exactly', P64 === 18446744073709551616)
ok('16 EiB via 2^64 / 2^60 = 16', P64 / Math.pow(2, 60) === 16)
ok('2^64 = 18.446744073709552 x 10^18', Math.abs(P64 / 1e18 - 18.446744073709552) < 1e-12)
ok('8 lines name 256 B', P8 === 256)
ok('16 lines name 65,536 B = 64 KiB', P16 === 65536 && P16 / 1024 === 64)
ok('30 lines name 1,073,741,824 B = 1 GiB', P30 === 1073741824 && P30 / Math.pow(2, 30) === 1)
ok('31 lines name 2,147,483,648 B = 2 GiB', P31 === 2147483648 && P31 / P30 === 2)
ok('48 lines name 281,474,976,710,656 B = 256 TiB', P48 === 281474976710656 && P48 / Math.pow(2, 40) === 256)
ok('2^32 bytes = 4.294967296 decimal GB (SI note)', Math.abs(P32 / 1e9 - 4.294967296) < 1e-12)
ok('32 data lines carry 4 bytes per beat', 32 / 8 === 4)
ok('64 data lines carry 8 bytes per beat', 64 / 8 === 8)
ok('doubling width doubles per-beat payload', 64 / 8 === 2 * (32 / 8))

/* ---------------- B. PCIe generations priced ---------------- */
const G1BITS = 2.5 * (8 / 10)
const G1MB = (G1BITS / 8) * 1000
const G3RAW = 8 * (128 / 130)
const G3MB = (G3RAW / 8) * 1000
const G4MB = ((16 * (128 / 130)) / 8) * 1000
const G5MB = ((32 * (128 / 130)) / 8) * 1000
const X16G3 = 16 * G3MB, X16G4 = 16 * G4MB, X16G5 = 16 * G5MB
ok('gen1 payload 2.5 x 8/10 = 2 Gbit/s', Math.abs(G1BITS - 2) < 1e-12)
ok('gen1 lane = 250 MB/s', Math.abs(G1MB - 250) < 1e-9)
ok('8b/10b toll = 25% overhead', Math.abs(10 / 8 - 1 - 0.25) < 1e-12)
ok('128b/130b toll = 1.5625% overhead', Math.abs(2 / 128 - 0.015625) < 1e-15)
ok('gen3 raw 8 x 128/130 = 7.876923 Gbit/s', Math.abs(G3RAW - 7.876923076923077) < 1e-9)
ok('gen3 lane exact 984.615384615... MB/s', Math.abs(G3MB - 984.6153846153846) < 1e-6)
ok('gen3 lane pins 984.6154', Math.round(G3MB * 10000) / 10000 === 984.6154)
ok('gen4 lane pins 1969.2308', Math.round(G4MB * 10000) / 10000 === 1969.2308)
ok('gen4 lane = 2 x gen3 lane', Math.abs(G4MB - 2 * G3MB) < 1e-6)
ok('gen5 lane pins 3938.4615', Math.round(G5MB * 10000) / 10000 === 3938.4615)
ok('gen5 lane = 2 x gen4 lane', Math.abs(G5MB - 2 * G4MB) < 1e-6)
ok('x16 gen3 pins 15.7538 GB/s', Math.round((X16G3 / 1000) * 10000) / 10000 === 15.7538)
ok('x16 gen4 = 31,507.692307... MB/s exact', Math.abs(X16G4 - 31507.692307692308) < 1e-4)
ok('x16 gen4 pins 31.5077 GB/s', Math.round((X16G4 / 1000) * 10000) / 10000 === 31.5077)
ok('x16 gen5 pins 63.0154 GB/s', Math.round((X16G5 / 1000) * 10000) / 10000 === 63.0154)
ok('x16 gen5 = 2 x x16 gen4', Math.abs(X16G5 - 2 * X16G4) < 1e-4)
ok('gen1 x16 = 16 x 250 = 4,000 MB/s = 4 GB/s', Math.abs(16 * G1MB - 4000) < 1e-6)

/* ---------------- C. USB ladder ---------------- */
ok('USB 2.0 / USB 1.0 = 480/12 = 40x', 480 / 12 === 40)
ok('USB 3.0 / USB 2.0 = 5000/480 pins 10.416667', Math.round((5000 / 480) * 1e6) / 1e6 === 10.416667)
ok('USB4 / USB 3.0 = 40/5 = 8x', 40 / 5 === 8)
ok('USB4 / USB 2.0 line = 40,000/480 = 83.333333x', Math.abs(40000 / 480 - 83.33333333333333) < 1e-9)
ok('USB 2.0 line rate = 480/8 = 60 MB/s', 480 / 8 === 60)
ok('60 MB/s = 0.060 GB/s', Math.abs(60 / 1000 - 0.06) < 1e-15)
ok('USB 1.0 line rate = 12/8 = 1.5 MB/s', 12 / 8 === 1.5)
ok('USB 3.0 payload with 8b/10b = 500 MB/s', Math.abs((5e9 * 0.8) / 8 - 5e8) < 1)
ok('USB4 raw line = 40/8 = 5 GB/s if every bit were data', Math.abs(40 / 8 - 5) < 1e-12)
ok('USB date gaps: 4 / 8 / 11 years', 2000 - 1996 === 4 && 2008 - 2000 === 8 && 2019 - 2008 === 11)

/* ---------------- D. HDMI ---------------- */
ok('HDMI 2.1 / 1.0 = 48/4.95 pins 9.69697', Math.round((48 / 4.95) * 1e5) / 1e5 === 9.69697)
ok('HDMI ratio at 6 dp = 9.696970', Math.round((48 / 4.95) * 1e6) / 1e6 === 9.69697)
ok('HDMI gap 2017 - 2002 = 15 years', 2017 - 2002 === 15)
ok('HDMI added capacity 48 - 4.95 = 43.05 Gbps', Math.abs(48 - 4.95 - 43.05) < 1e-12)

/* ---------------- E. SATA ---------------- */
const SATA3BITS = 6e9 * (8 / 10)
ok('SATA 3.0 payload 6 x 8/10 = 4.8 Gbit/s', Math.abs(SATA3BITS - 4.8e9) < 1)
ok('SATA 3.0 raw = 600,000,000 B/s = 600 MB/s', Math.abs(SATA3BITS / 8 - 6e8) < 1 && 6e8 === 600000000)
ok('SATA 1.0 raw = 150 MB/s (same 8b/10b rule)', Math.abs((1.5e9 * 0.8) / 8 - 1.5e8) < 1)
ok('SATA 3.0 / 1.0 raw = 4x', Math.abs((6e9 * 0.8) / (1.5e9 * 0.8) - 4) < 1e-12)
ok('SATA gap 2009 - 2003 = 6 years', 2009 - 2003 === 6)

/* ---------------- F. the bandwidth competition ---------------- */
const RACE = X16G4 / 60
ok('x16 gen4 vs USB 2.0 line = 31,507.6923/60 exact', Math.abs(RACE - 525.1282051282051) < 1e-6)
ok('competition ratio pins 525.1282', Math.round(RACE * 10000) / 10000 === 525.1282)
ok('GB/s framing agrees: 31.5077 / 0.060', Math.abs(31.507692307692308 / 0.06 - 525.1282051282051) < 1e-6)
ok('round trip 525.1282 x 60 = 31,507.6923', Math.abs(525.1282051282051 * 60 - 31507.692307692308) < 1e-6)
ok('vs 40 MB/s usable the ratio is 787.6923 (>750)', Math.abs(X16G4 / 40 - 787.6923076923077) < 1e-6 && X16G4 / 40 > 750)
ok('NVMe x4 gen4 = 7,876.9231 MB/s = 7.8769 GB/s', Math.abs(4 * G4MB - 7876.923076923077) < 1e-4)
ok('NVMe x4 gen4 vs SATA 600 MB/s = 13.128205x', Math.abs((4 * G4MB) / 600 - 13.128205128205128) < 1e-6)
ok('3 GHz beat = 0.333 ns (skew scale)', Math.abs((1 / 3e9) * 1e9 - 0.3333333333333333) < 1e-9)

/* ---------------- G. quiz key shape ---------------- */
const KEY = [2, 1, 3, 0, 0]
ok('quiz key shape 5 items in 0..3', KEY.length === 5 && KEY.every((k) => k >= 0 && k <= 3))
ok('quiz key equals pinned [2,1,3,0,0]', KEY.join(',') === '2,1,3,0,0')

/* ---------------- H. final re-read of the shipped part ---------------- */
const L = lesson44
ok('id pinned verbatim', L.id === 'cf-buses-and-ports-how-the-pieces-talk')
ok("number pinned '4.4'", L.number === '4.4')
ok('title pinned verbatim', L.title === 'Buses and Ports: How the Pieces Talk')
ok('prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']))
ok('sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch04']))
const W = countLessonWords(L)
ok('word floor 7,000 cleared', W >= 7000, String(W))
ok('concepts 5-8', L.concepts.length >= 5 && L.concepts.length <= 8, String(L.concepts.length))
ok('objectives 5-6', !!L.objectives && L.objectives.length >= 5 && L.objectives.length <= 6, String(L.objectives?.length))
const B = L.blocks as any[]
const paras = B.filter((b) => b.kind === 'para')
ok('para blocks >= 30', paras.length >= 30, String(paras.length))
const heads = B.filter((b) => b.kind === 'heading')
ok('headings >= 6', heads.length >= 6, String(heads.length))
const figs = B.filter((b) => b.kind === 'figure')
ok('body figures >= 3', figs.length >= 3, String(figs.length))
const quizBlocks = B.filter((b) => b.kind === 'quiz')
const exBlocks = B.filter((b) => b.kind === 'exercises')
ok('exactly one quiz block', quizBlocks.length === 1, String(quizBlocks.length))
ok('exactly one exercises block', exBlocks.length === 1, String(exBlocks.length))
const quizItems = quizBlocks.length ? (quizBlocks[0].items as { answer: number }[]) : []
ok('quiz has 5 items', quizItems.length === 5, String(quizItems.length))
ok('quiz key reads [2,1,3,0,0]', JSON.stringify(quizItems.map((i) => i.answer)) === '[2,1,3,0,0]')
const termCount = B.filter((b) => b.kind === 'terms').reduce((a, b) => a + b.items.length, 0)
ok('terms >= 8 items', termCount >= 8, String(termCount))
const formulaCount = B.filter((b) => b.kind === 'formula').length
ok('formula cards >= 3', formulaCount >= 3, String(formulaCount))
const examples = B.filter((b) => b.kind === 'example')
ok('Illustrations 8-12', examples.length >= 8 && examples.length <= 12, String(examples.length))
const ex = exBlocks.length ? exBlocks[0] : { sets: [] }
const qTotal = (ex.sets as any[]).reduce((a, s) => a + s.questions.length, 0)
ok('15 exercise questions', qTotal === 15, String(qTotal))
const levels = new Set((ex.sets as any[]).map((s) => s.level))
ok('levels include L1, L2, L3', levels.has('L1') && levels.has('L2') && levels.has('L3'), Array.from(levels).join(','))
let solFigs = 0
for (const b of B) {
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) solFigs += (q.figures ?? []).length
  if (b.kind === 'example') solFigs += (b.figures ?? []).length
}
ok('solution figures >= 4', solFigs >= 4, String(solFigs))
const tones = new Set(B.filter((b) => b.kind === 'callout').map((b) => b.tone))
ok('all six callout tones used', ['insight', 'warn', 'definition', 'theorem', 'historical', 'exam'].every((t) => tones.has(t)), Array.from(tones).join(','))
let svgBad = 0
for (const b of B) {
  const svgs: string[] = []
  if (b.kind === 'figure') svgs.push(b.svg)
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
  for (const s of svgs) {
    if (/\$/.test(s) || /[\u2013\u2014]/.test(s) || !s.includes('role="img"') || !s.includes('viewBox') || !s.includes('aria-label')) svgBad++
  }
}
ok('SVG hygiene: no $, no en/em dash, role+aria+viewBox present', svgBad === 0, String(svgBad))

console.log(`V-CF44: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
