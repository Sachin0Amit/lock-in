export {}
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

import { lesson34 } from './part-cf34'
import { countLessonWords } from '../../../src/data/library/types'

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

console.log(`V-CF34: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
} else {
  console.log(`  words=${words} bodyFigures=${bodyFigs.length} solutionFigures=${solFigs} illustrations=${examples.length} exercises=${exQ}`)
}
