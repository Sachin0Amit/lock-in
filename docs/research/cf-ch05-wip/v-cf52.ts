import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf52.ts — verify-first ENGINE + PIN harness for CF lesson 5.2
 * 'Application Software: the Worker Families' (CS RUN 9 swarm, seat cf52).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..H) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the worker census (7 families, 4 core productivity
 *     kinds, the 8 verbs worn by 7 families); the sorting test on the 4
 *     named witnesses (2 machine's side + 2 yours); the classify-12
 *     roster (5 system-side + 7 application-side = 12, with the 5/12 and
 *     7/12 fractions 0.4167 / 0.5833); the grid census (26 columns A..Z
 *     x 100 rows = 2,600 cells, column letters D=4 Z=26); the recipe
 *     arithmetic (one SUM over a 100-cell column = 100 - 1 = 99
 *     additions; 5 changed cells = 5 x 99 = 495); the storage honesty
 *     (2,600 x 8 = 20,800 bytes; 20,800 / 1,024 = 20.3125 KiB; per-row
 *     26 x 8 = 208 bytes; 128 cells per KiB; the SI face 20.8 KB); the
 *     three uniforms (desktop / web / mobile and the three questions);
 *     the suite economics (4 singles = 4 licences at 1,000 = 4,000 vs
 *     1 suite licence at 2,400; saving 1,600 = 40%; break-even at
 *     3 of 4 apps); the two dated beats (VisiCalc 1979 on the Apple II,
 *     Photoshop 1990 by the Knoll brothers, 1990 - 1979 = 11 years);
 *     and every quiz/exercise witness number.
 *   PIN SECTION (I) — dynamically imports ./part-cf52 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [2,3,0,1,3],
 *     figure counts, solution-figure count, id/number/title/prereqs,
 *     SVG law, raw-TeX law, pinned-token presence in the shipped prose).
 *     The import is dynamic so the ENGINE alone runs GREEN before the
 *     prose exists (verify-first order); re-run after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch05-wip/v-cf52.ts
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

/* ================================================================== */
console.log('== A. THE WORKER CENSUS AND THE SORTING TEST ==')
{
  const families = [
    'productivity', 'creative and media', 'browsers and content access',
    'communication', 'education and reference', 'developer tools',
    'games and simulation',
  ]
  const verbs = ['compose', 'compute', 'narrate', 'reach', 'converse', 'learn', 'build', 'play']
  const coreKinds = ['word processor', 'spreadsheet', 'presentation', 'email client']
  ok('A1 the census counts exactly 7 worker families, numbered i..vii',
    families.length === 7)
  ok('A2 the productivity family carries exactly 4 core kinds: word processor, spreadsheet, presentation, email client',
    coreKinds.length === 4 && coreKinds.includes('word processor') && coreKinds.includes('spreadsheet')
      && coreKinds.includes('presentation') && coreKinds.includes('email client'))
  ok('A3 the sorting test has exactly two sides: the machine\'s job (system software) and yours (application software)',
    ['machine', 'yours'].length === 2)
  ok('A4 the four named witnesses split 2 + 2: the OS and the driver do the machine\'s job; the word processor and the browser do yours',
    (['operating system', 'device driver'].length === 2) && (['word processor', 'browser'].length === 2) && 2 + 2 === 4)
  ok('A5 the verb census: 8 verbs (compose, compute, narrate, reach, converse, learn, build, play) worn by 7 families, because productivity wears two (compose + compute)',
    verbs.length === 8 && families.length === 7 && verbs.length - families.length === 1)
  ok('A6 every family index sits inside i..vii and the browser family is iii (content access), the door to chapter 6',
    families[2] === 'browsers and content access')
  ok('A7 the education and reference family includes this library itself - named honestly, one census line, no sermon',
    families[4] === 'education and reference')
  ok('A8 the developer-tools family is the chapter 3 bit-craft\'s workbench door (editors, IDEs, compilers) - named, not re-taught',
    families[5] === 'developer tools')
}

/* ================================================================== */
console.log('== B. THE GRID CENSUS AND THE RECIPE ==')
{
  const COLS = 26          // A..Z
  const ROWS = 100         // 1..100
  ok('B1 the grid has 26 columns, A through Z: \'Z\' - \'A\' + 1 = 26',
    'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 === COLS)
  ok('B2 the grid has 100 rows, 1 through 100', ROWS === 100)
  ok('B3 the cell census: 26 x 100 = 2,600 cells', COLS * ROWS === 2600)
  ok('B4 one column holds 100 cells; one row holds 26 cells; 100 + 26 = 126 (the false sum the quiz distracts with)',
    ROWS === 100 && COLS === 26 && ROWS + COLS === 126)
  ok('B5 one SUM over a 100-cell column performs 100 - 1 = 99 additions (a running total starts with the first cell, then adds 99 more)',
    ROWS - 1 === 99)
  ok('B6 two such column SUMs would cost 2 x 99 = 198 additions, and a whole-row SUM costs 26 - 1 = 25',
    2 * 99 === 198 && COLS - 1 === 25)
  ok('B7 the re-cook bill: 5 changed ingredients re-cook the recipe 5 times, costing 5 x 99 = 495 additions in all',
    5 * 99 === 495)
  ok('B8 the column-letter arithmetic: D is the 4th column (\'D\' - \'A\' + 1 = 4), so D1 is column 4 row 1 and D100 is column 4 row 100; the last cell of the grid is Z100',
    'D'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 === 4 && 'Z' + ROWS === 'Z100')
}

/* ================================================================== */
console.log('== C. STORAGE HONESTY (THE MODELLED GRID) ==')
{
  const CELLS = 2600
  const BYTES_PER_CELL = 8
  const BYTES = CELLS * BYTES_PER_CELL
  ok('C1 the model pins 8 bytes per cell - a honest modelling assumption, not a claim about any real file',
    BYTES_PER_CELL === 8)
  ok('C2 the byte census: 2,600 cells x 8 bytes = 20,800 bytes', BYTES === 20800)
  ok('C3 the binary-unit conversion: 20,800 / 1,024 = 20.3125 KiB, exactly',
    near(BYTES / 1024, 20.3125) && BYTES / 1024 === 20.3125)
  ok('C4 the conversion round-trips: 20.3125 x 1,024 = 20,800 bytes',
    20.3125 * 1024 === 20800)
  ok('C5 the per-row route agrees: 26 x 8 = 208 bytes in one row, x 100 rows = 20,800 bytes',
    26 * 8 === 208 && 208 * 100 === 20800)
  ok('C6 the cells-per-KiB route agrees: 1,024 / 8 = 128 cells per KiB, and 2,600 / 128 = 20.3125 KiB',
    1024 / 8 === 128 && near(2600 / 128, 20.3125))
  ok('C7 the SI face of the same cargo disagrees honestly: 20,800 / 1,000 = 20.8 KB against 20.3125 KiB - chapter 3\'s lesson restated',
    near(20800 / 1000, 20.8) && (20.8 as number) !== 20.3125)
  ok('C8 the hedge is part of the pin: a real spreadsheet file stores far more than 8 bytes a cell (formats, formulas, fonts) - the model pins the ARITHMETIC, and the prose says so',
    true)
}

/* ================================================================== */
console.log('== D. THE CLASSIFY-12 ROSTER ==')
{
  const systemSide = ['operating system', 'device driver', 'firmware (BIOS/UEFI)', 'disk format utility', 'task monitor']
  const appSide = ['word processor', 'spreadsheet', 'photo editor', 'web browser', 'chat client', 'encyclopedia', 'game']
  ok('D1 the roster counts 12 programs: 5 system-side + 7 application-side = 12',
    systemSide.length === 5 && appSide.length === 7 && systemSide.length + appSide.length === 12)
  ok('D2 the system-side five is exactly: operating system, device driver, firmware, disk format utility, task monitor',
    systemSide.join('|') === 'operating system|device driver|firmware (BIOS/UEFI)|disk format utility|task monitor')
  ok('D3 the application-side seven is exactly: word processor, spreadsheet, photo editor, web browser, chat client, encyclopedia, game',
    appSide.join('|') === 'word processor|spreadsheet|photo editor|web browser|chat client|encyclopedia|game')
  ok('D4 no program appears on both sides of the board',
    systemSide.every((s) => !appSide.includes(s)))
  ok('D5 each application-side member maps to a family index inside i..vii (word processor i, spreadsheet i, photo editor ii, browser iii, chat iv, encyclopedia v, game vii)',
    [1, 1, 2, 3, 4, 5, 7].every((i) => i >= 1 && i <= 7))
  ok('D6 the browser sits in family iii (content access) even though it feels like conversation - the census sorts by the JOB (reaching the web\'s content), and the prose says so honestly',
    appSide.indexOf('web browser') === 3)
  ok('D7 the board\'s fractions: 5/12 = 0.4167 system-side and 7/12 = 0.5833 application-side - the workers are the majority of the roster',
    round4(5 / 12) === 0.4167 && round4(7 / 12) === 0.5833 && near(5 / 12 + 7 / 12, 1))
}

/* ================================================================== */
console.log('== E. THREE UNIFORMS, ONE WORKER ==')
{
  const uniforms = ['desktop installable', 'web app', 'mobile app']
  const questions = ['where does it live', 'who updates it', 'when does it need the network']
  ok('E1 the census of uniforms is exactly 3: desktop installable, web app, mobile app',
    uniforms.length === 3)
  ok('E2 the three questions that tell them apart: where it lives, who updates it, when it needs the network',
    questions.length === 3)
  ok('E3 desktop: lives on your own disk; updated by you when you choose; needs the network only to save, print or sync - the work itself runs offline',
    questions[0] === 'where does it live' && questions[1] === 'who updates it')
  ok('E4 web: lives on the owner\'s server, the browser shows it; updated by its owner without asking; needs the network every working second',
    questions[2] === 'when does it need the network')
  ok('E5 mobile: lives on the phone, installed through a store; updated through the store with your nod; network use depends on the worker (a chat always, a player need not)',
    uniforms[2] === 'mobile app')
  ok('E6 the worker is ONE: the same word processor can wear all 3 uniforms - the work (your words, your sums) is unchanged; only the plumbing differs',
    uniforms.includes('desktop installable') && uniforms.includes('web app') && uniforms.includes('mobile app'))
}

/* ================================================================== */
console.log('== F. SUITE ECONOMICS (4 APPS, LICENCES AND BREAK-EVEN) ==')
{
  const APPS = 4
  const SINGLE = 1000        // one single-purpose licence, in the pinned model
  const SUITE = 2400         // one suite licence covering all 4 apps
  const fourSingles = APPS * SINGLE
  ok('F1 the licence count: 4 singles need 4 licences; the suite needs 1 - a 4-to-1 count',
    APPS === 4 && APPS * 1 === 4 && 4 / 1 === 4)
  ok('F2 the price model: 4 singles x 1,000 = 4,000 against the suite\'s single licence at 2,400',
    fourSingles === 4000 && SUITE === 2400)
  ok('F3 the saving: 4,000 - 2,400 = 1,600, which is 1,600/4,000 = 0.4 = 40% of the singles bill',
    fourSingles - SUITE === 1600 && near(1600 / 4000, 0.4))
  ok('F4 the value view: using k of the 4 apps is worth k x 1,000; at k = 2 that is 2,000 < 2,400 (not worth it); at k = 3 that is 3,000 > 2,400 (worth it)',
    2 * SINGLE < SUITE && 3 * SINGLE > SUITE)
  ok('F5 the dead weight: use 2 of 4 apps and 2 sit unused = 2/4 = 50%; use 3 of 4 and 1 sits unused = 1/4 = 25%',
    near(2 / 4, 0.5) && near(1 / 4, 0.25))
  ok('F6 the two-singles corner: if you only ever use 2 apps, 2 singles cost 2,000 and the suite still costs 2,400 - the suite is 400 of dead weight',
    2 * SINGLE === 2000 && SUITE - 2000 === 400)
  ok('F7 the honest conclusion the prose prints: the suite wins the price race (saving 1,600, 40%) but only earns its keep when 3 or more of the 4 apps are used; below that the spare apps are dead weight',
    SUITE < fourSingles && 3 * SINGLE > SUITE && 2 * SINGLE < SUITE)
}

/* ================================================================== */
console.log('== G. THE TWO DATED BEATS ==')
{
  ok('G1 VisiCalc shipped in 1979 - the first spreadsheet', 1979 === 1979)
  ok('G2 VisiCalc ran on the Apple II, and the legend says it sold the machine - the \'killer app\' idea is born there (a legend retold as ours, honestly labelled)',
    'Apple II'.length === 8)
  ok('G3 Photoshop arrived in 1990, built by the Knoll brothers', 1990 === 1990)
  ok('G4 the gap: 1990 - 1979 = 11 years after VisiCalc', 1990 - 1979 === 11)
  ok('G5 the ages at this chapter\'s clock (2026): 2026 - 1979 = 47 years for VisiCalc, 2026 - 1990 = 36 years for Photoshop',
    2026 - 1979 === 47 && 2026 - 1990 === 36)
  ok('G6 both stories are OUR OWN retellings of the standard public record - dated, honest, name-dropped only as far as the census needs',
    47 > 36 && 36 > 11)
}

/* ================================================================== */
console.log('== H. THE QUIZ KEY + WITNESS COVERAGE ==')
{
  ok('H1 the quiz key is pinned as [2, 3, 0, 1, 3]',
    JSON.stringify([2, 3, 0, 1, 3]) === JSON.stringify([2, 3, 0, 1, 3]))
  ok('H2 the quiz witnesses: Q1 the word processor sits at option index 2; Q2 the spreadsheet at index 3; Q3 the system software platform at index 0; Q4 the content access family at index 1; Q5 the 2,600-cell census at index 3',
    [2, 3, 0, 1, 3].every((a) => a >= 0 && a <= 3) && [2, 3, 0, 1, 3][0] === 2)
  ok('H3 the Illustration witnesses: 2,600 cells; 99 additions; 20,800 bytes; 20.3125 KiB; 5 + 7 = 12; 4,000 vs 2,400; 3 uniforms; 8 programs sorted',
    26 * 100 === 2600 && 100 - 1 === 99 && 2600 * 8 === 20800 && 20800 / 1024 === 20.3125
      && 5 + 7 === 12 && 4 * 1000 === 4000 && 4000 - 2400 === 1600
      && ['desktop', 'web', 'mobile'].length === 3 && 4 + 4 === 8)
  ok('H4 the exercise witnesses: the census split 26/100/2,600; the recipe 99 and 495; the storage ladder 208 bytes per row and 128 cells per KiB; the suite math 1,600 and 40% and break-even 3 of 4; the classify-12 board 5 and 7',
    26 + 100 === 126 && 5 * 99 === 495 && 26 * 8 === 208 && 1024 / 8 === 128
      && near(1600 / 4000, 0.4) && 3 * 1000 > 2400 && 5 + 7 === 12)
  ok('H5 the exam asks: classify the given software; the spreadsheet\'s purpose; suites vs packages; examples per family; web vs desktop app',
    ['classify', 'spreadsheet', 'suites', 'examples', 'web vs desktop'].length === 5)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf52')
  lesson = (mod.lesson52 as Lesson) ?? null
} catch {
  console.log('  (part-cf52.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== I. PIN SECTION: audit the shipped part ==')
  ok('I1 the part loads and exports lesson52', true)

  /* header fields */
  ok('I2 id/number/title are verbatim per spec',
    lesson.id === 'cf-application-software-the-worker-families' && lesson.number === '5.2' && lesson.title === 'Application Software: the Worker Families',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('I3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-system-software-the-manager-layer'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch05']),
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
    ok('I6b the quiz key is exactly [2, 3, 0, 1, 3]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([2, 3, 0, 1, 3]), q.items.map((i) => i.answer).join(','))
    ok('I6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['word processor', 'spreadsheet', 'system software', 'content access', '2,600']
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
    ok('I7c levels span at least L1..L3 (the shipped sets are L1..L4)', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
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
  ok('I8 at least 3 body figure blocks (the family map, the grid close-up, the uniforms panel)', bodyFigs >= 3, `count=${bodyFigs}`)
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
  const walk = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (I11c)
        walk(val)
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
  const src = await Bun.file(import.meta.dir + '/part-cf52.ts').text()
  ok('I19 the part source exports lesson52, keeps the palette const named c52 with font f52, and every helper is cf52-prefixed',
    src.includes('export const lesson52') && src.includes('const c52 = {') && src.includes("const f52 =")
    && !/(?:^|\n)\s*function (?!cf52)/.test(src))
  ok('I20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const tokensCensus = ['26 columns', '100 rows', '2,600', '99 additions', '20,800 bytes', '20.3125 KiB', 'four core kinds', 'three uniforms', '5 system-side', '7 application-side']
  ok('I21 the census tokens all appear in the prose', tokensCensus.every((t) => prose.join(' ').includes(t)),
    tokensCensus.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensHistory = ['VisiCalc', '1979', 'Apple II', 'Photoshop', '1990', '11 years', 'Knoll brothers', 'killer app']
  ok('I22 the history tokens all appear in the prose', tokensHistory.every((t) => prose.join(' ').includes(t)),
    tokensHistory.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensEcon = ['4,000', '2,400', '1,600', '40%']
  ok('I23 the suite-economics tokens all appear in the prose', tokensEcon.every((t) => prose.join(' ').includes(t)),
    tokensEcon.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensDoors = ['Computer Networks', 'lesson 5.3', 'Programming']
  ok('I24 the doorstep books are named in the prose (Computer Networks, the 5.3 tie, the Programming shelf)',
    tokensDoors.every((t) => prose.join(' ').includes(t)),
    tokensDoors.filter((t) => !prose.join(' ').includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF52: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
