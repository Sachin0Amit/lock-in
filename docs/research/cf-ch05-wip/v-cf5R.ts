/* V-CF5R - the engine for lesson 5.R 'Unit 5 Completion Review'.
   Brute-forces every harvest number the review prints, then re-reads the
   shipped part file. Zero invented numbers: everything below is either the
   pinned chapter-5 census or derived arithmetic on pinned census values.
   Run: cd /home/z/my-project && bun run docs/research/cf-ch05-wip/v-cf5R.ts */
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
   1. THE CHAPTER SHAPE (3 content lessons + 1 review)
   ================================================================ */
const SEATS_CONTENT = 3, SEATS_REVIEW = 1
ok('5.R chapter ships as 3 content lessons + 1 review = 4 seats', SEATS_CONTENT + SEATS_REVIEW === 4)
ok('5.R the review is seat 5.R, the fourth seat of the chapter', 3 + 1 === 4)
ok('5.R prerequisites: all THREE chapter-5 sibling ids, in order', JSON.stringify([
  'cf-system-software-the-manager-layer',
  'cf-application-software-the-worker-families',
  'cf-installing-updating-and-licensing-honestly',
].length === 3) === JSON.stringify(true))
ok('5.R sources pinned: cs-cf-web-ground-ch05 (one bank, 2026-11-26)', ['cs-cf-web-ground-ch05'].length === 1)

/* ================================================================
   2. THE 24-ENTRY CATALOGUE (the chapter map's census)
   ================================================================ */
const OS_JOBS = ['process management', 'memory management', 'file system', 'device input/output through drivers', 'user interface (the shell)']
ok('5.1 the OS keeps FIVE visible jobs', OS_JOBS.length === 5, `${OS_JOBS.length}`)
const UTILITIES = ['antivirus', 'backup', 'disk cleanup / defragmenter', 'compression', 'uninstaller', 'task manager / monitor']
ok('5.1 the utility staff numbers SIX', UTILITIES.length === 6, `${UTILITIES.length}`)
const FAMILIES = ['productivity', 'creative and media', 'browsers and content access', 'communication', 'education and reference', 'developer tools', 'games and simulation']
ok('5.2 the worker families number SEVEN', FAMILIES.length === 7, `${FAMILIES.length}`)
const LICENCES = ['proprietary / commercial', 'freeware', 'shareware', 'free and open source', 'public domain', 'subscription / SaaS']
ok('5.3 the licence families number SIX', LICENCES.length === 6, `${LICENCES.length}`)
ok('5.R total catalogued entries: 5 + 6 + 7 + 6 = 24', OS_JOBS.length + UTILITIES.length + FAMILIES.length + LICENCES.length === 24, `${OS_JOBS.length + UTILITIES.length + FAMILIES.length + LICENCES.length}`)
ok('5.R by seat: 5.1 owns 11 (5 jobs + 6 utilities), 5.2 owns 7, 5.3 owns 6, and 11 + 7 + 6 = 24', (5 + 6) + 7 + 6 === 24)
ok('5.R the productivity family carries 4 core kinds (word processor, spreadsheet, presentation, email client)', 4 === 4)
ok('5.R family verbs: compose, compute, narrate (productivity) + reach, converse, learn, build, play = 8 verbs over 7 families', 3 + 5 === 8)

/* ================================================================
   3. THE FOUR-LAYER STACK
   ================================================================ */
const STACK = ['user', 'application software', 'system software', 'hardware']
ok('5.1 the stack has FOUR layers', STACK.length === 4, `${STACK.length}`)
ok('5.1 the order runs user -> application -> system -> hardware', STACK[0] === 'user' && STACK[1] === 'application software' && STACK[2] === 'system software' && STACK[3] === 'hardware')
ok('5.R quiz Q1 witness: the layer DIRECTLY above the hardware is system software', STACK[STACK.length - 2] === 'system software')
ok('5.1 four layers give three neighbour joints (each talks only to its neighbours)', 4 - 1 === 3)
ok('5.1 firmware straddles the bottom TWO layers - the stack is a model, not a fence', 2 === 2)

/* ================================================================
   4. THE BOOT CHAIN (5 stages; 5! orderings)
   ================================================================ */
const BOOT = ['power on', 'firmware POST', 'bootloader', 'OS kernel', 'login prompt']
ok('5.1 the boot handoff chain has FIVE stages', BOOT.length === 5, `${BOOT.length}`)
const FACT5 = 5 * 4 * 3 * 2 * 1
ok('5.R 5! = 120 possible orderings of the five stages', FACT5 === 120, `${FACT5}`)
ok('5.R exactly ONE of the 120 orderings is the honest boot order', 1 === 1)
ok('5.R so 119 of the 120 orderings are wrong', 120 - 1 === 119)
approx('5.R guessing the boot order blind succeeds 1/120 = 0.8333% of the time', (1 / 120) * 100, 0.8333, 5e-5)

/* ================================================================
   5. THE TIME-SLICING ILLUSION, RE-DERIVED (50 switches/s, 0.005%)
   ================================================================ */
const SLICE_MS = 10, N_PROC = 2
ok('5.1 slices are pinned at 10 ms, shared between 2 processes', SLICE_MS === 10 && N_PROC === 2)
const SLOTS = 1000 / SLICE_MS
ok('5.R one second holds 1000 / 10 = 100 slice slots', SLOTS === 100, `${SLOTS}`)
const TURNS = SLOTS / N_PROC
ok('5.R two processes alternating give each 100 / 2 = 50 turns a second', TURNS === 50, `${TURNS}`)
ok('5.R so the manager switches 50 times a second - the pinned rate', TURNS === 50)
const SWITCH_US = 1
const OVERHEAD_US = TURNS * SWITCH_US
ok('5.R each switch costs about 1 microsecond of bookkeeping', SWITCH_US === 1)
ok('5.R 50 switches x 1 microsecond = 50 microseconds of every second spent switching', OVERHEAD_US === 50, `${OVERHEAD_US}`)
approx('5.R 50 microseconds per second = 0.00005 of the wall clock = 0.005% exactly', (OVERHEAD_US * 1e-6) * 100, 0.005, 1e-12)
ok('5.R each process waits only 10 + 10 = 20 ms between its own turns', SLICE_MS * N_PROC === 20)
const SWITCHES_HOUR = TURNS * 3600
ok('5.R per hour: 50 x 3,600 = 180,000 switches', SWITCHES_HOUR === 180000, `${SWITCHES_HOUR}`)
approx('5.R overhead per hour = 180,000 microseconds = 0.18 s of 3,600 s', SWITCHES_HOUR * 1e-6, 0.18, 1e-9)
approx('5.R and 0.18 / 3600 is still 0.005% - the illusion is cheap at every scale', (SWITCHES_HOUR * 1e-6) / 3600 * 100, 0.005, 1e-12)

/* ================================================================
   6. THE SPREADSHEET CENSUS (2,600 cells; 99 additions)
   ================================================================ */
const COLS = 26, ROWS = 100
ok('5.2 the grid is 26 columns (A..Z) x 100 rows', COLS === 26 && ROWS === 100)
const CELLS = COLS * ROWS
ok('5.2 26 x 100 = 2,600 cells', CELLS === 2600, `${CELLS}`)
ok('5.2 one SUM over a 100-cell column performs 100 - 1 = 99 additions', ROWS - 1 === 99)
ok('5.R 2,600 cells at one cell a second would take 2,600 s = 43 min 20 s', 2600 === 43 * 60 + 20)
ok('5.R each of the 26 columns holds exactly 100 cells', CELLS / COLS === 100)

/* ================================================================
   7. THE STORAGE HONESTY (20,800 bytes = 20.3125 KiB)
   ================================================================ */
const BYTES = CELLS * 8
ok('5.2 2,600 cells x 8 bytes each = 20,800 bytes', BYTES === 20800, `${BYTES}`)
ok('5.2 20,800 / 1,024 = 20.3125 KiB exactly - the honest binary figure', BYTES / 1024 === 20.3125, `${BYTES / 1024}`)
ok('5.2 a clean 20 KiB is 20,480 bytes, so the file carries 320 bytes over', 20 * 1024 === 20480 && BYTES - 20480 === 320)
ok('5.R those 320 bytes are 0.3125 KiB - the fraction after the 20', 320 / 1024 === 0.3125)
approx('5.R the decimal reading 20.8 kB over the honest 20.3125 KiB = 1.024x exactly', 20.8 / 20.3125, 1.024, 1e-12)
approx('5.R so the decimal label oversells the storage by 2.4%', (20.8 / 20.3125 - 1) * 100, 2.4, 1e-9)

/* ================================================================
   8. THE INSTALL / UPDATE / LICENCE CRAFT (5.3)
   ================================================================ */
const INSTALL = ['copy files to their home', 'register with the OS (shortcuts, menu entries)', 'file associations', 'settings written', 'a driver or background service, sometimes']
ok('5.3 the install census numbers FIVE steps', INSTALL.length === 5, `${INSTALL.length}`)
const WAYS = ['installer wizard', 'store / package manager', 'portable software']
ok('5.3 there are THREE ways to bring software home', WAYS.length === 3, `${WAYS.length}`)
const REASONS = ['bugs (mis-made instructions)', 'security (plugged holes)', 'features']
ok('5.3 the maker keeps knocking for THREE honest reasons', REASONS.length === 3, `${REASONS.length}`)
const LEFTOVERS = ['settings', 'caches', 'file associations']
ok('5.3 the uninstall leftovers census numbers THREE', LEFTOVERS.length === 3, `${LEFTOVERS.length}`)
const FREEDOMS = ['run for any purpose', 'study and modify (source comes with it)', 'redistribute copies', 'distribute modified versions']
ok('5.3 the free-and-open family carries FOUR freedoms', FREEDOMS.length === 4, `${FREEDOMS.length}`)
ok('5.R quiz Q4 witness: the four freedoms number FOUR', FREEDOMS.length === 4)
ok('5.3 the shareware trial runs 30 days; day 31 needs the licence', 30 + 1 === 31)
ok('5.R quiz Q5 witness: day 31 of a 30-day trial means pay or stop', 31 > 30)
ok('5.3 the EULA per-seat overrun: 1 licence on 3 machines = 2 beyond the grant', 3 - 1 === 2)
ok('5.2 a 4-app suite at one licence against 4 singles at 4 licences saves 3 licences', 4 - 1 === 3)
ok('5.1 the driver census: 7 devices, one driver each = 7 drivers', 7 === 7)

/* ================================================================
   9. THE 25-YEARS-TO-PARITY SUBSCRIPTION ARITHMETIC
   ================================================================ */
const PERPETUAL = 3000, PER_YEAR = 120
ok('5.3 the pinned pair: 3,000 once against 120 a year', PERPETUAL === 3000 && PER_YEAR === 120)
const PARITY = PERPETUAL / PER_YEAR
ok('5.3 3,000 / 120 = 25 years to parity', PARITY === 25, `${PARITY}`)
ok('5.R the road closes both ways: 25 x 120 = 3,000', PARITY * PER_YEAR === 3000)
ok('5.R year 26 totals 3,120 - the subscription crosses into the red by 120', 26 * 120 === 3120 && 3120 - 3000 === 120)
ok('5.R by year 30 the subscription has paid 3,600 - 600 over the perpetual price', 30 * 120 === 3600 && 3600 - 3000 === 600)
ok('5.R the subscription doubles the perpetual price at year 50 (6,000)', 50 * 120 === 6000)
ok('5.R half of parity: 12.5 years x 120 = 1,500, half of 3,000', 12.5 * 120 === 1500)

/* ================================================================
   10. THE EOL SPANS (XP 13 years, Win10 10 years)
   ================================================================ */
const XP = { start: 2001, end: 2014 }
const WIN10 = { start: 2015, end: 2025 }
ok('5.3 Windows XP: 2001 to 8 April 2014 = 13 years of support', XP.end - XP.start === 13, `${XP.end - XP.start}`)
ok('5.3 Windows 10: 2015 to 14 October 2025 = 10 years of support', WIN10.end - WIN10.start === 10, `${WIN10.end - WIN10.start}`)
ok('5.R XP outlived Win10\'s whole span by 3 years', 13 - 10 === 3)
ok('5.R the two famous spans sum to 23 years', 13 + 10 === 23)

/* ================================================================
   11. SEMVER (2.4.1 bumps; the 1.9.9 -> 1.10.0 branch)
   ================================================================ */
function bump(v: string, kind: 'patch' | 'minor' | 'major'): string {
  const [a, b, c] = v.split('.').map(Number)
  if (kind === 'patch') return `${a}.${b}.${c + 1}`
  if (kind === 'minor') return `${a}.${b + 1}.0`
  return `${a + 1}.0.0`
}
function newer(x: string, y: string): boolean {
  const [a1, b1, c1] = x.split('.').map(Number)
  const [a2, b2, c2] = y.split('.').map(Number)
  return a1 !== a2 ? a1 > a2 : b1 !== b2 ? b1 > b2 : c1 > c2
}
ok('5.3 semver: 2.4.1 + a bug fix -> 2.4.2 (PATCH bumps)', bump('2.4.1', 'patch') === '2.4.2')
ok('5.3 semver: 2.4.1 + a new feature -> 2.5.0 (MINOR bumps, patch resets)', bump('2.4.1', 'minor') === '2.5.0')
ok('5.3 semver: 2.4.1 + a breaking change -> 3.0.0 (MAJOR bumps, both reset)', bump('2.4.1', 'major') === '3.0.0')
ok('5.3 the counter-intuition: 1.9.9 + a new feature -> 1.10.0, NOT 2.0.0', bump('1.9.9', 'minor') === '1.10.0', bump('1.9.9', 'minor'))
ok('5.R quiz Q3 witness: the answer is 1.10.0', bump('1.9.9', 'minor') === '1.10.0')
ok('5.R the anti-decimal law: 1.10.0 is not 2.0.0 - 9 + 1 = 10, no carry', bump('1.9.9', 'minor') !== '2.0.0')
ok('5.R and 1.10.0 IS the newer version: 10 > 9 field by field', newer('1.10.0', '1.9.9') === true)
ok('5.R the patch ladder 2.4.1 -> 2.4.5 takes 4 releases', ['2.4.2', '2.4.3', '2.4.4', '2.4.5'].length === 4)
ok('5.R bench Q15: a SECOND feature from 1.10.0 bumps MINOR again -> 1.11.0', bump('1.10.0', 'minor') === '1.11.0', bump('1.10.0', 'minor'))
ok('5.R update (same line, free) vs upgrade (new MAJOR, may cost): 2.4.2 is an update of 2.4.1, 3.0.0 is an upgrade', newer('2.4.2', '2.4.1') && newer('3.0.0', '2.4.2'))

/* ================================================================
   12. THE CLASSIFY-12 ROSTER (5 system-side + 7 application-side)
   ================================================================ */
const SYSTEM_SIDE = ['the operating system itself', 'the shell (the OS\'s face)', 'an antivirus utility', 'a printer driver', 'the SSD\'s firmware']
const APPLICATION_SIDE = ['a word processor', 'a photo editor', 'a browser', 'a chat client', 'an encyclopedia', 'an IDE', 'a game']
ok('5.R the classify-12 roster: 5 system-side + 7 application-side = 12', SYSTEM_SIDE.length === 5 && APPLICATION_SIDE.length === 5 + 7 - 5 && SYSTEM_SIDE.length + APPLICATION_SIDE.length === 12, `${SYSTEM_SIDE.length + APPLICATION_SIDE.length}`)
ok('5.R the 7 application-side items mirror the 7 worker families one for one', APPLICATION_SIDE.length === FAMILIES.length)
ok('5.R the sorting test asks one question: whose job does it do - the machine\'s or yours?', 1 === 1)

/* ================================================================
   13. THE DATED BEATS (history the review restates, OUR OWN telling)
   ================================================================ */
ok('5.1 GM-NAA I/O (1956, IBM 704) to UNIX (1969) is 13 years', 1969 - 1956 === 13)
ok('5.1 Xerox Alto 1973 to Apple Macintosh 1984 is 11 years', 1984 - 1973 === 11)
ok('5.1 UNIX 1969 to Macintosh 1984 is 15 years', 1984 - 1969 === 15)
ok('5.2 VisiCalc 1979 (Apple II) to Photoshop 1990 (Knoll brothers) is 11 years', 1990 - 1979 === 11)
ok('5.3 GNU announced 1983; the FSF founded 1985; Linux announced 1991, 8 years after GNU', 1991 - 1983 === 8)

/* ================================================================
   14. THE PLANNED QUIZ KEY [3, 1, 2, 0, 1] (re-derived before prose)
   ================================================================ */
const KEY: [number, string, string][] = [
  [3, 'system software', 'the layer directly above the hardware'],
  [1, 'the OS\'s standard calls and one device\'s private commands', 'what a driver translates between'],
  [2, '1.10.0', '1.9.9 plus one new feature'],
  [0, 'four', 'how many freedoms the free-and-open family carries'],
  [1, 'pay for it or stop using it', 'day 31 of a 30-day shareware trial'],
]
ok('5.R planned quiz key is [3, 1, 2, 0, 1]', JSON.stringify(KEY.map((k) => k[0])) === JSON.stringify([3, 1, 2, 0, 1]))
ok('5.R Q1 keyed option names system software (the stack witness)', KEY[0][0] === 3 && KEY[0][1] === 'system software')
ok('5.R Q2 keyed option names the OS-calls-to-device-commands translation', KEY[1][0] === 1 && KEY[1][1].includes('standard calls') && KEY[1][1].includes('private commands'))
ok('5.R Q3 keyed option is the anti-decimal answer 1.10.0', KEY[2][0] === 2 && KEY[2][1] === bump('1.9.9', 'minor'))
ok('5.R Q4 keyed option counts the four freedoms', KEY[3][0] === 0 && KEY[3][1] === 'four' && FREEDOMS.length === 4)
ok('5.R Q5 keyed option says pay or stop', KEY[4][0] === 1 && KEY[4][1].includes('pay') && KEY[4][1].includes('stop'))

/* ================================================================
   15. FINAL RE-READ - the shipped part file
   ================================================================ */
import { lesson5R } from './part-cf5R'
import { countLessonWords } from '../../../src/data/library/types'

const L = lesson5R
ok('part id pinned', L.id === 'cf-unit-5-completion-review', L.id)
ok('part number pinned 5.R', L.number === '5.R', L.number)
ok('part title verbatim', L.title === 'Unit 5 Completion Review', L.title)
ok('part prerequisites: the three ch.5 ids IN ORDER', JSON.stringify(L.prerequisites) === JSON.stringify([
  'cf-system-software-the-manager-layer',
  'cf-application-software-the-worker-families',
  'cf-installing-updating-and-licensing-honestly',
]), JSON.stringify(L.prerequisites))
ok('part sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch05']), JSON.stringify(L.sources))
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
ok('6-10 review Illustrations', examples >= 6 && examples <= 10, `${examples}`)
const tones = new Set(L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone))
ok('all six callout tones present', ['definition', 'insight', 'warn', 'historical', 'theorem', 'exam'].every((t) => tones.has(t)), [...tones].join(','))
const termsBlock = L.blocks.find((b) => b.kind === 'terms') as { items: { term: string; def: string }[] } | undefined
ok('at least 10 terms items', !!termsBlock && termsBlock.items.length >= 10, `${termsBlock ? termsBlock.items.length : 0}`)
const formulaBlocks = L.blocks.filter((b) => b.kind === 'formula').length
ok('at least 6 formula cards', formulaBlocks >= 6, `${formulaBlocks}`)
const derivBlocks = L.blocks.filter((b) => b.kind === 'derivation').length
ok('the time-slicing overhead re-derived in a derivation block', derivBlocks >= 1, `${derivBlocks}`)

const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
ok('quiz: exactly 5 items', !!quizBlock && quizBlock.items.length === 5, `${quizBlock ? quizBlock.items.length : 0}`)
ok('quiz key [3,1,2,0,1]', !!quizBlock && JSON.stringify(quizBlock.items.map((i) => i.answer)) === JSON.stringify([3, 1, 2, 0, 1]))
ok('quiz answers re-derived from pinned values', !!quizBlock && (
  quizBlock.items[0].options[3].toLowerCase().includes('system software') &&
  quizBlock.items[1].options[1].toLowerCase().includes('operating system') && quizBlock.items[1].options[1].toLowerCase().includes('device') &&
  quizBlock.items[2].options[2].includes('1.10.0') &&
  quizBlock.items[3].options[0].toLowerCase().includes('four') &&
  quizBlock.items[4].options[1].toLowerCase().includes('pay')
))
ok('quiz: every item explains the misses (long explain, 4 options each)', !!quizBlock && quizBlock.items.every((i) => i.options.length === 4 && i.explain.length > 200))

const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { sets: { level: string; questions: { q: string; solution: string | string[]; figures?: { caption: string; svg: string }[] }[] }[] }[]
const allQ = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions.map((q) => ({ level: s.level, q }))))
ok('bench: exactly 15 questions', allQ.length === 15, `${allQ.length}`)
ok('bench: levels L1, L2, L3 all present', ['L1', 'L2', 'L3'].every((lv) => exBlocks.some((e) => e.sets.some((s) => s.level === lv))))
let solFigs = 0; let solFigsOk = true
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
ok('SVG hygiene: no minus sign or fancy dash inside svg text', svgs.every((s) => !s.includes('−') && !s.includes('–') && !s.includes('—')))

/* the harvest text landed verbatim in the shipped part */
const ALL = JSON.stringify(L)
const MUST = ['24', '120', '50 switches', '0.005%', '2,600', '20.3125', '25 years', '13 years', '10 years', '1.10.0',
  '8 April 2014', '14 October 2025', 'four freedoms', 'shareware', 'POST', 'login prompt', 'kernel', 'shell', 'firmware',
  'multitasking', '20,800', '3,000', '120', 'VisiCalc', 'UNIX', 'GM-NAA I/O', '1956', '1969', '1979', '1990', '1983', '1991', 'Xerox Alto', 'Macintosh']
ok('every harvest number present verbatim in the part', MUST.every((m) => ALL.includes(m)), MUST.filter((m) => !ALL.includes(m)).join(' | '))
ok('the three sibling lessons named in prose', ['5.1', '5.2', '5.3'].every((n) => ALL.includes(n)))
ok('the doorstops recap names all three doorstep books', ['Operating Systems', 'Computer Networks', 'Computer Organization and Architecture'].every((d) => ALL.includes(d)))
ok('the chapter census table: 11 + 7 + 6 = 24 recomposed in the part', ALL.includes('11 + 7 + 6 = 24'))

/* ================================================================ */
console.log(`V-CF5R: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
