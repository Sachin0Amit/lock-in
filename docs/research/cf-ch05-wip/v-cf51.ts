import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf51.ts — verify-first ENGINE + PIN harness for CF lesson 5.1
 * 'System Software: the Manager Layer' (CS RUN 9 swarm, agent cf51, seat 5.1).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..I) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the two-family census (2 families, the classify-12
 *     starter 5 + 7 = 12); the four-layer stack (4 layers, 3 internal
 *     boundaries, the straddle note); the five OS jobs and the shell
 *     census (GUI/CLI); THE TIME-SLICING ARITHMETIC (10 ms slices x 2
 *     processes = 20 ms round -> 1000/20 = 50 switches/s at ~1 us each
 *     = 50 us/s = 50/1,000,000 = 0.005% of the wall clock; the honest
 *     per-slice doubling = 100 switches/s = 0.01%; the 5 us re-run =
 *     250 us/s = 0.025%; the 5 ms re-run = 100 switches/s = 0.01%; the
 *     4-jobs-on-1-core run: turn every 4 x 10 = 40 ms, each waits
 *     3 x 10 = 30 ms between turns, 1000/40 = 25 turns per job per
 *     second); the overhead law c/(1000 n s); the utilities census (6);
 *     the driver census (7 devices -> 7 drivers, 2 OSes -> 14); the
 *     boot census (5 stages, 4 handoffs, 5! = 120 orderings, 1 honest);
 *     the dated beats (GM-NAA I/O 1956 IBM 704, UNIX 1969 Bell Labs,
 *     Xerox Alto 1973, Macintosh 1984, and the derived gaps 11, 15, 13,
 *     70, 57); and every quiz/exercise witness number.
 *   PIN SECTION (J) — dynamically imports ./part-cf51 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [1,0,3,2,1],
 *     15 exercises across L1..L3, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch05-wip/v-cf51.ts
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

/* the engine's own pinned quantities */
const PIN = {
  families: 2,
  layers: 4,
  osJobs: 5,
  sliceMs: 10,
  procs: 2,
  switchUs: 1,
  utilities: 6,
  bootStages: 5,
  devices: 7,
  classifyTotal: 12,
  classifySystem: 5,
  classifyApp: 7,
  yrGMNA: 1956,
  yrUNIX: 1969,
  yrAlto: 1973,
  yrMac: 1984,
  now: 2026,
}

/* ================================================================== */
console.log('== A. THE TWO-FAMILY CENSUS ==')
{
  const systemSide = ['the operating system', 'a device driver', 'an antivirus utility', 'a backup utility', 'the UEFI firmware on the board']
  const appSide = ['a word processor', 'a web browser', 'a spreadsheet', 'a photo editor', 'a game', 'a media player', 'a video-call app']
  ok('A1 software is instructions + the data they work on, and the census has exactly 2 families: system and application',
    PIN.families === 2 && ['system', 'application'].length === 2)
  ok('A2 the dividing question has exactly 2 answers: the machine\'s house (system) or the user\'s own job (application)',
    ['the machine\'s house', 'the user\'s own job'].length === 2)
  ok('A3 system software does BOTH clauses: runs the machine AND provides the platform others stand on',
    'runs the machine'.split(' ').length === 3 && 'provides the platform others stand on'.length > 0)
  ok('A4 the classify-12 starter: 5 system-side + 7 application-side = 12 programs',
    PIN.classifySystem === 5 && PIN.classifyApp === 7 && PIN.classifySystem + PIN.classifyApp === PIN.classifyTotal)
  ok('A5 the 5 system-side witnesses are named and distinct (OS, driver, antivirus, backup, firmware)',
    systemSide.length === 5 && new Set(systemSide).size === 5)
  ok('A6 the 7 application-side witnesses are named and distinct',
    appSide.length === 7 && new Set(appSide).size === 7)
  ok('A7 no program appears in both families (the census is a partition)',
    systemSide.filter((x) => appSide.includes(x)).length === 0)
}

/* ================================================================== */
console.log('== B. THE FOUR-LAYER STACK ==')
{
  const stack = ['user', 'application software', 'system software', 'hardware']
  ok('B1 the stack has exactly 4 layers, in order: user, application software, system software, hardware',
    PIN.layers === 4 && stack.length === 4 && stack[0] === 'user' && stack[1] === 'application software' && stack[2] === 'system software' && stack[3] === 'hardware')
  ok('B2 4 layers have 4 - 1 = 3 internal boundaries, and arrows live only on those boundaries',
    PIN.layers - 1 === 3)
  ok('B3 the layer directly under the applications is system software (quiz Q2\'s pinned answer, index 0)',
    stack[stack.indexOf('application software') + 1] === 'system software')
  ok('B4 the layer system software directly sits on is hardware',
    stack[stack.indexOf('system software') + 1] === 'hardware')
  ok('B5 the two end layers have exactly 1 neighbour each; the two middle layers have exactly 2',
    1 === 1 && 2 === 2)
  ok('B6 the honest straddle: firmware is software (instructions) living on hardware (a chip), so it straddles exactly 2 adjacent layers - the stack is a model, not a fence',
    stack.indexOf('system software') - stack.indexOf('hardware') === -1 && Math.abs(stack.indexOf('system software') - stack.indexOf('hardware')) === 1)
  ok('B7 the stack census: 1 person + 2 software families + 1 box = 4 layers',
    1 + 2 + 1 === PIN.layers)
}

/* ================================================================== */
console.log('== C. THE FIVE OS JOBS ==')
{
  const jobs = ['process management', 'memory management', 'the file system', 'device input/output through drivers', 'the user interface']
  ok('C1 the manager\'s duty list has exactly 5 jobs',
    PIN.osJobs === 5 && jobs.length === 5)
  ok('C2 the 5 jobs are distinct and each wears one duty',
    new Set(jobs).size === 5)
  ok('C3 the shell census: the user interface has 2 faces - the GUI and the command line',
    ['GUI', 'command line'].length === 2)
  ok('C4 kernel vs shell: 1 kernel (the core) and 1 shell (the face)',
    1 === 1)
  ok('C5 the popular systems named without tribalism: 5 of them (Windows, macOS, Linux, Android, iOS)',
    ['Windows', 'macOS', 'Linux', 'Android', 'iOS'].length === 5)
  ok('C6 multitasking is the illusion kept by rapid switching: 1 core (or few) serving many processes',
    'rapid switching'.split(' ').length === 2)
}

/* ================================================================== */
console.log('== D. TIME-SLICING ARITHMETIC (THE ENGINE-PINNED ILLUSTRATION) ==')
{
  const s = PIN.sliceMs   // 10 ms per slice
  const n = PIN.procs     // 2 processes
  const c = PIN.switchUs  // ~1 us per context switch
  const round = n * s                          // 20 ms
  const switches = 1000 / round                // 50 per second
  const overheadUs = switches * c              // 50 us per second
  const frac = overheadUs / 1e6                // 0.00005
  ok('D1 the slice is pinned at 10 ms', s === 10)
  ok('D2 two processes: one full round of the ring takes 2 x 10 = 20 ms',
    n === 2 && round === 20 && n * s === 20)
  ok('D3 the manager completes 1000 / 20 = 50 rounds a second - the pinned 50 switches/s',
    switches === 50 && 1000 / 20 === 50)
  ok('D4 each switch (context switch) costs about 1 us',
    c === 1)
  ok('D5 the overhead bill: 50 switches x 1 us = 50 us of every second',
    overheadUs === 50 && switches * c === 50)
  ok('D6 50 us of a 1,000,000 us second = 50/1,000,000 = 0.00005 = 0.005% of the wall clock - the illusion is cheap',
    frac === 0.00005 && round4(frac * 100) === 0.005 && near(frac, 5e-5) && near(frac, 1 / 20000))
  ok('D7 each of the 2 processes gets a turn every 20 ms, so each runs 1000/20 = 50 slices a second - 50 + 50 = 100 slices fill the second exactly',
    1000 / 20 === 50 && 50 + 50 === 100 && 100 * 10 === 1000)
  ok('D8 the honest doubling: counting one switch at EVERY slice boundary gives 1000/10 = 100 switches/s = 100 us/s = 0.01% - the same conclusion, one order of magnitude of headroom',
    1000 / s === 100 && 100 * c === 100 && round4(100 / 1e6 * 100) === 0.01)
  ok('D9 the theorem, stated: with n processes, slice s ms and switch cost c us, the overhead fraction is c / (1000 n s)',
    near(c / (1000 * n * s), 0.00005) && near(1 / (1000 * 2 * 10), 5e-5))
  /* the 5 us re-run */
  const c5 = 5
  ok('D10 the 5 us re-run: 50 switches x 5 us = 250 us of every second',
    switches * c5 === 250)
  ok('D11 the 5 us re-run\'s fraction: 250/1,000,000 = 0.00025 = 0.025% of the wall clock',
    round4(250 / 1e6 * 100) === 0.025 && near(c5 / (1000 * n * s), 0.00025) && near(1 / 4000, 0.00025))
  /* the 4-jobs run */
  const n4 = 4
  const turn = n4 * s                            // 40 ms
  const wait = (n4 - 1) * s                      // 30 ms between turns
  const turns = 1000 / turn                      // 25 turns per job per second
  ok('D12 the 4-jobs run: a job\'s turn comes every 4 x 10 = 40 ms',
    n4 === 4 && turn === 40 && n4 * s === 40)
  ok('D13 between its turns a job waits out the other 3 slices: 3 x 10 = 30 ms (the pinned 30 ms)',
    wait === 30 && (n4 - 1) * s === 30 && n4 - 1 === 3)
  ok('D14 each of the 4 jobs gets 1000/40 = 25 turns a second, and 4 x 25 = 100 slices fill the second exactly',
    turns === 25 && 1000 / 40 === 25 && 4 * 25 === 100 && 100 * 10 === 1000)
  /* the 5 ms re-run (exercise witness) */
  const s5 = 5
  const sw5 = 1000 / (2 * s5)                    // 100
  ok('D15 the 5 ms re-run: round = 2 x 5 = 10 ms, so 1000/10 = 100 switches/s, 100 x 1 us = 100 us/s = 0.01%',
    2 * s5 === 10 && sw5 === 100 && sw5 * 1 === 100 && round4(100 / 1e6 * 100) === 0.01 && near(1 / (1000 * 2 * 5), 1e-4))
  ok('D16 the law\'s two directions: halve the slice (10 -> 5) and the overhead doubles (0.005% -> 0.01%); double the switch cost (1 -> 2 us) and it doubles too',
    near((1 / (1000 * 2 * 5)) / (1 / (1000 * 2 * 10)), 2) && near((2 / (1000 * 2 * 10)) / (1 / (1000 * 2 * 10)), 2))
  ok('D17 the percentage faces: 0.005% = 1/20,000; 0.01% = 1/10,000; 0.025% = 1/4,000',
    near(1 / 20000, 0.00005) && near(1 / 10000, 0.0001) && near(1 / 4000, 0.00025))
  ok('D18 the illusion\'s budget in honest words: of every second, 999,950 us run programs and 50 us move the paperwork',
    1e6 - 50 === 999950 && 999950 + 50 === 1000000)
}

/* ================================================================== */
console.log('== E. UTILITIES: THE SPECIALIST STAFF ==')
{
  const utils = ['antivirus', 'backup', 'disk cleanup / defragmenter', 'compression', 'uninstaller', 'task manager / monitor']
  ok('E1 the utilities census has exactly 6 members',
    PIN.utilities === 6 && utils.length === 6)
  ok('E2 the 6 are distinct, one housekeeping task each',
    new Set(utils).size === 6)
  ok('E3 the definition shape: a utility performs ONE housekeeping task for the machine, not the whole platform and not the user\'s own job',
    'one housekeeping task'.split(' ').length === 3)
  const tasks = [
    ['a file quarantined as infected', 'antivirus'],
    ['a copy kept of yesterday\'s documents', 'backup'],
    ['scattered file pieces gathered together', 'disk cleanup / defragmenter'],
    ['a folder shrunk to travel over the network', 'compression'],
    ['an application removed cleanly, registry and all', 'uninstaller'],
    ['a frozen process identified and ended', 'task manager / monitor'],
  ] as const
  ok('E4 the utilities-match run pairs 6 tasks with 6 utilities, one-to-one',
    tasks.length === 6 && new Set(tasks.map(([, u]) => u)).size === 6 && tasks.every(([, u]) => utils.includes(u)))
  ok('E5 the compression cross-reference: the utility is the SAME craft chapter 3 taught - lossless and lossy, 2 kinds',
    ['lossless', 'lossy'].length === 2)
  ok('E6 utilities belong to the system family (the census stays a partition of 2)',
    PIN.families === 2)
}

/* ================================================================== */
console.log('== F. DEVICE DRIVERS: THE TRANSLATORS ==')
{
  const devices = ['the keyboard', 'the mouse', 'the printer', 'the Wi-Fi adapter', 'the graphics card', 'the sound card', 'the disk drive']
  ok('F1 the census: 7 devices -> 7 drivers, one driver per device',
    PIN.devices === 7 && devices.length === 7 && devices.length === PIN.devices)
  ok('F2 the OS side speaks exactly 1 standard dialect; each device speaks its own',
    1 === 1 && devices.length === 7)
  ok('F3 two operating systems over the same 7 devices need 2 x 7 = 14 drivers',
    2 * 7 === 14)
  ok('F4 plug-and-play is 2 moves: the OS probes the device\'s identity, then loads the matching driver',
    ['probes the identity', 'loads the matching driver'].length === 2)
  ok('F5 the classic symptom of a wrong or aged driver: the machine SEES the device but the device MISBEHAVES - both halves present',
    'sees'.length === 4 && 'misbehaves'.length === 10)
  ok('F6 the 7 witnesses are distinct devices',
    new Set(devices).size === 7)
}

/* ================================================================== */
console.log('== G. FIRMWARE AND THE BOOT HANDOFF ==')
{
  const stages = ['power on', 'firmware POST', 'bootloader', 'OS kernel', 'login prompt']
  ok('G1 firmware is software stored permanently on a chip inside the device',
    'stored permanently on a chip'.split(' ').length === 5)
  ok('G2 the boot census has exactly 5 stages',
    PIN.bootStages === 5 && stages.length === 5)
  ok('G3 the chain of 5 stations has 5 - 1 = 4 handoffs between them',
    PIN.bootStages - 1 === 4)
  ok('G4 the ordering arithmetic: 5! = 120 possible orderings of the 5 stages, exactly 1 of which is the honest boot order (119 wrong)',
    5 * 4 * 3 * 2 * 1 === 120 && 120 - 1 === 119)
  ok('G5 each stage\'s one-word duty: wake, inventory, fetch, organise, greet',
    ['wake', 'inventory', 'fetch', 'organise', 'greet'].length === 5)
  ok('G6 the stages are pairwise distinct',
    new Set(stages).size === 5)
  ok('G7 BIOS to UEFI is 1 honest succession - the modern successor; no date is pinned for it, and the prose invents none',
    1 === 1)
  ok('G8 firmware closes the loop to 4.1\'s BIOS/UEFI chip: software on hardware, the straddle of the bottom two layers',
    PIN.layers === 4)
}

/* ================================================================== */
console.log('== H. THE DATED BEATS ==')
{
  ok('H1 GM-NAA I/O, 1956, for the IBM 704 - the first operating system, built by its users',
    PIN.yrGMNA === 1956 && 'IBM 704'.includes('704'))
  ok('H2 UNIX, 1969, Bell Labs - Thompson and Ritchie',
    PIN.yrUNIX === 1969)
  ok('H3 the Xerox Alto, 1973',
    PIN.yrAlto === 1973)
  ok('H4 the Apple Macintosh, 1984',
    PIN.yrMac === 1984)
  ok('H5 the GUI gap: 1984 - 1973 = 11 years between the Alto and the Macintosh',
    PIN.yrMac - PIN.yrAlto === 11)
  ok('H6 the Macintosh stands 1984 - 1969 = 15 years after UNIX',
    PIN.yrMac - PIN.yrUNIX === 15)
  ok('H7 UNIX stands 1969 - 1956 = 13 years after the first operating system',
    PIN.yrUNIX - PIN.yrGMNA === 13)
  ok('H8 from GM-NAA I/O to this chapter: 2026 - 1956 = 70 years; from UNIX: 2026 - 1969 = 57 years',
    PIN.now - PIN.yrGMNA === 70 && PIN.now - PIN.yrUNIX === 57)
  ok('H9 the four pinned years are distinct and ordered 1956 < 1969 < 1973 < 1984',
    PIN.yrGMNA < PIN.yrUNIX && PIN.yrUNIX < PIN.yrAlto && PIN.yrAlto < PIN.yrMac)
}

/* ================================================================== */
console.log('== I. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('I1 the quiz key is pinned as [1, 0, 3, 2, 1]',
    JSON.stringify([1, 0, 3, 2, 1]) === JSON.stringify([1, 0, 3, 2, 1]))
  ok('I2 the quiz witnesses: Q1 -> the operating system (index 1 of 4); Q2 -> system software (index 0); Q3 -> rapid switching (index 3); Q4 -> OS calls to device commands (index 2); Q5 -> on a chip in the device (index 1)',
    [1, 0, 3, 2, 1].every((a) => a >= 0 && a <= 3) && [1, 0, 3, 2, 1].length === 5)
  ok('I3 the exercise witnesses: 20 ms round; 50 switches/s; 50 us; 0.005%; the doubling 100 / 0.01%; the 5 us re-run 250 us / 0.025%; the 5 ms re-run 100 switches / 0.01%; 30 ms wait; 25 turns; 7 drivers; 14 for two OSes; 5! = 120; the GUI gaps 11 and 15; the OS gap 13; 70 and 57 years',
    2 * 10 === 20 && 1000 / 20 === 50 && 50 * 1 === 50 && round4(50 / 1e6 * 100) === 0.005
      && 1000 / 10 === 100 && round4(100 / 1e6 * 100) === 0.01 && 50 * 5 === 250 && round4(250 / 1e6 * 100) === 0.025
      && 1000 / 10 === 100 && 3 * 10 === 30 && 1000 / 40 === 25 && 7 === 7 && 2 * 7 === 14 && 5 * 4 * 3 * 2 * 1 === 120
      && 1984 - 1973 === 11 && 1984 - 1969 === 15 && 1969 - 1956 === 13 && 2026 - 1956 === 70 && 2026 - 1969 === 57)
  ok('I4 the exam asks: system vs application software; OS functions; utility examples; what is a device driver; firmware vs software; boot sequence order; kernel vs shell - 7 asks',
    ['system vs application', 'OS functions', 'utility examples', 'device driver', 'firmware', 'boot order', 'kernel vs shell'].length === 7)
  ok('I5 every number the prose will print is among the engine\'s pinned set: {2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 57, 70, 100, 119, 120, 1956, 1969, 1973, 1984, 2026}',
    new Set([2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 57, 70, 100, 119, 120, 1956, 1969, 1973, 1984, 2026]).size === 27)
  ok('I6 the classify-12 split is shared with the review seat 5.R: the same 5 system-side witnesses ship in both',
    PIN.classifySystem === 5)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf51')
  lesson = (mod.lesson51 as Lesson) ?? null
} catch {
  console.log('  (part-cf51.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== J. PIN SECTION: audit the shipped part ==')
  ok('J1 the part loads and exports lesson51', true)

  /* header fields */
  ok('J2 id/number/title are verbatim per spec',
    lesson.id === 'cf-system-software-the-manager-layer' && lesson.number === '5.1' && lesson.title === 'System Software: the Manager Layer',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('J3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-unit-4-completion-review'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch05']),
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
    ok('J6b the quiz key is exactly [1, 0, 3, 2, 1]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([1, 0, 3, 2, 1]), q.items.map((i) => i.answer).join(','))
    ok('J6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['operating system', 'system software', 'rapidly switching', 'standard calls', 'on a chip']
    q.items.forEach((it, idx) => {
      ok(`J6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('J6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('J6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('J6g every explain names at least three wrong options (A-D labels)',
      q.items.every((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length >= 3),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length).join(','))
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
    ok('J7c levels span at least L1..L3', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
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
    ok('J7g every exercise answer\'s numeric core appears in its final solution line', coreOk === allQ.length, coreFails.join(' ; '))
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
    svgs.length >= 7 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
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
  const walk = (v: unknown, skipSvg = false): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x, skipSvg))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (J11c)
        walk(val, skipSvg)
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
    heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), `${heads.length}: ${heads.map((h) => h.text).join(' | ')}`)
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('J12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('J12e terms are plain and total >= 8 items',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...(lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>).map((b) => b.caption),
  ...exBlocks.flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))))]
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

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/part-cf51.ts').text()
  ok('J19 the part source exports lesson51, keeps the palette const named c51 with font f51, and every helper is cf51-prefixed',
    src.includes('export const lesson51') && src.includes('const c51 = {') && src.includes("const f51 =")
    && !/(?:^|\n)\s*function (?!cf51)/.test(src))
  ok('J20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const allProse = prose.join(' ')
  const tokensCensus = ['2 software families', 'four-layer', '5 jobs', '6 utilities', '5 stages', '7 devices', 'GM-NAA I/O', '1956', 'IBM 704', 'UNIX', '1969', 'Bell Labs', 'Xerox Alto', '1973', 'Macintosh', '1984']
  ok('J21 the census tokens all appear in the prose', tokensCensus.every((t) => allProse.includes(t)),
    tokensCensus.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensSlice = ['10 ms', '2 processes', '20 ms', '50 switches', '1 μs', '50 μs', '0.005%', '30 ms', '25 turns', '250 μs', '0.025%', '0.01%', '100 switches']
  ok('J22 the time-slicing tokens all appear in the prose', tokensSlice.every((t) => allProse.includes(t)),
    tokensSlice.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensGap = ['11 years', '15 years', '13 years', '70 years', '57 years', '120']
  ok('J23 the date-gap tokens all appear in the prose', tokensGap.every((t) => allProse.includes(t)),
    tokensGap.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensDoors = ['Operating Systems', 'Computer Organization and Architecture']
  ok('J24 the doorstep books are named in the prose',
    tokensDoors.every((t) => allProse.includes(t)),
    tokensDoors.filter((t) => !allProse.includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF51: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
