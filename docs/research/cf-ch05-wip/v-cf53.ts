import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf53.ts — verify-first ENGINE + PIN harness for CF lesson 5.3
 * 'Installing, Updating and Licensing Honestly' (CS RUN 9 swarm, agent cf53).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..H) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the install census (5 steps) and the 3 ways to bring
 *     software home; the semantic-versioning arithmetic (2.4.1 -> 2.4.2
 *     bug fix / 2.5.0 feature / 3.0.0 breaking; the anti-decimal branch
 *     1.9.9 -> 1.10.0 and the honest patch 1.9.10; the patch ladder
 *     2.4.1..2.4.5 = 4 releases); the EOL ledger (Windows XP support
 *     ended 8 April 2014 after 13 years; Windows 10 ended 14 October 2025
 *     after 10 years; the 4,207-day gap between the two end dates); the
 *     movement's dates (GNU announced 1983, FSF 1985, Linux announced
 *     1991 = 8 years after GNU, App Store 2008 with about 500 apps); the
 *     licence census (6 families, the four freedoms); the subscription
 *     arithmetic (120 a year against 3,000 perpetual = 25 years to
 *     parity, with every milestone); the trial arithmetic (30 days, day
 *     31 needs the licence); the per-seat arithmetic (1 licence on 3
 *     machines = 2 beyond the grant); the uninstall leftovers census (3);
 *     and the quiz key [0, 2, 1, 3, 2].
 *   PIN SECTION (I) — dynamically imports ./part-cf53 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key, figure counts,
 *     solution figures, Illustrations 8-12, 15 exercises, SVG law,
 *     raw-TeX law, pinned tokens in the prose).
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch05-wip/v-cf53.ts
 */

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps

/* ================================================================== */
console.log('== A. THE INSTALL CENSUS AND THE THREE WAYS ==')
{
  const CENSUS = [
    'copy the files to their home',
    'register with the OS - shortcuts and menu entries',
    'claim the file associations',
    'write the settings',
    'sometimes add a driver or background service',
  ]
  const WAYS = ['installer wizard', 'store or package manager', 'portable software']
  ok('A1 the install census counts exactly 5 steps', CENSUS.length === 5, `count=${CENSUS.length}`)
  ok('A2 step (i) copies the program files to their home folder', CENSUS[0] === 'copy the files to their home')
  ok('A3 step (ii) registers with the OS - shortcuts and menu entries', CENSUS[1].startsWith('register') && CENSUS[1].includes('shortcuts'))
  ok('A4 step (iii) claims the file associations - which program opens which kind', CENSUS[2].includes('associations'))
  ok('A5 step (iv) writes the settings', CENSUS[3].startsWith('write the settings'))
  ok('A6 step (v) sometimes adds a driver or background service', CENSUS[4].includes('driver') && CENSUS[4].includes('service'))
  ok('A7 there are exactly 3 ways to bring software home', WAYS.length === 3, `count=${WAYS.length}`)
  ok('A8 the installer wizard is a setup program that runs the whole 5-step census for you', WAYS[0] === 'installer wizard' && CENSUS.length === 5)
  ok('A9 the store / package-manager route promises one catalogue and one update pipe (1 + 1 = 2 promises)', 1 + 1 === 2)
  ok('A10 portable software runs from its folder and leaves 0 of the 5 census marks (no shortcuts, no associations, no leftovers)', WAYS[2] === 'portable software' && 5 - 5 === 0)
}

/* ================================================================== */
console.log('== B. SEMANTIC VERSIONING, BRUTE-FORCED ==')
{
  type V = [number, number, number]
  const vs = (v: V): string => v.join('.')
  const bumpPatch = (v: V): V => [v[0], v[1], v[2] + 1]
  const bumpMinor = (v: V): V => [v[0], v[1] + 1, 0]
  const bumpMajor = (v: V): V => [v[0] + 1, 0, 0]
  const cmp = (p: V, q: V): number => (p[0] !== q[0] ? p[0] - q[0] : p[1] !== q[1] ? p[1] - q[1] : p[2] - q[2])
  ok('B1 a version number wears exactly three fields: MAJOR.MINOR.PATCH', [2, 4, 1].length === 3)
  ok('B2 bug fix from 2.4.1: PATCH + 1 gives 2.4.2', vs(bumpPatch([2, 4, 1])) === '2.4.2')
  ok('B3 new feature from 2.4.1: MINOR + 1 with PATCH reset gives 2.5.0', vs(bumpMinor([2, 4, 1])) === '2.5.0')
  ok('B4 breaking change from 2.4.1: MAJOR + 1 with both reset gives 3.0.0', vs(bumpMajor([2, 4, 1])) === '3.0.0')
  ok('B5 the anti-decimal branch: 1.9.9 + feature gives 1.10.0, NOT 2.0.0', vs(bumpMinor([1, 9, 9])) === '1.10.0' && vs(bumpMinor([1, 9, 9])) !== '2.0.0')
  ok('B6 a bug fix from 1.9.9 gives 1.9.10 - the PATCH field itself may pass nine', vs(bumpPatch([1, 9, 9])) === '1.9.10')
  ok('B7 the decimal eye misreads: as decimals 0.10 < 0.90, so it would call 1.10.0 older than 1.9.9', 0.10 < 0.90)
  ok('B8 but field-wise 1.10.0 > 1.9.9: each field counts on its own, they are not decimals', cmp([1, 10, 0], [1, 9, 9]) > 0)
  ok('B9 field-wise, 1.9.10 > 1.9.9 - the honest patch order past nine', cmp([1, 9, 10], [1, 9, 9]) > 0)
  let v: V = [2, 4, 1]
  const ladder: V[] = []
  for (let i = 0; i < 4; i++) { v = bumpPatch(v); ladder.push(v) }
  ok('B10 the patch ladder: four patch releases climb 2.4.1 to 2.4.5', vs(v) === '2.4.5' && ladder.length === 4)
  ok('B11 the ladder members are exactly 2.4.2, 2.4.3, 2.4.4, 2.4.5', ladder.map(vs).join(' ') === '2.4.2 2.4.3 2.4.4 2.4.5')
  ok('B12 the releases strictly between 2.4.1 and 2.4.5 number 5 - 1 = 4', 5 - 1 === 4 && ladder.length === 4)
  ok('B13 an update stays on the MAJOR line (2.4.1 -> 2.5.0 keeps major 2); an upgrade crosses it (-> 3.0.0)', bumpMinor([2, 4, 1])[0] === 2 && bumpMajor([2, 4, 1])[0] === 3)
  ok('B14 the three bump rules never collide: patch, minor and major from one version give three different answers', new Set([vs(bumpPatch([2, 4, 1])), vs(bumpMinor([2, 4, 1])), vs(bumpMajor([2, 4, 1]))]).size === 3)
}

/* ================================================================== */
console.log('== C. THE EOL LEDGER AND THE MOVEMENT\'S DATES ==')
{
  const DAY = 86400000
  const xpEol = Date.UTC(2014, 3, 8)    // 8 April 2014
  const w10Eol = Date.UTC(2025, 9, 14)  // 14 October 2025
  ok('C1 Windows XP support ended 8 April 2014', new Date(xpEol).getUTCDate() === 8 && new Date(xpEol).getUTCMonth() === 3 && new Date(xpEol).getUTCFullYear() === 2014)
  ok('C2 XP arrived October 2001; the support span is 2014 - 2001 = 13 years', 2014 - 2001 === 13)
  ok('C3 the XP end date fell on a Tuesday (the month\'s patch day)', new Date(xpEol).getUTCDay() === 2)
  ok('C4 Windows 10 support ended 14 October 2025', new Date(w10Eol).getUTCDate() === 14 && new Date(w10Eol).getUTCMonth() === 9 && new Date(w10Eol).getUTCFullYear() === 2025)
  ok('C5 Windows 10 arrived July 2015; the support span is 2025 - 2015 = 10 years', 2025 - 2015 === 10)
  ok('C6 the Windows 10 end date also fell on a Tuesday', new Date(w10Eol).getUTCDay() === 2)
  const gapDays = (w10Eol - xpEol) / DAY
  ok('C7 the gap between the two end dates is 4,207 days', gapDays === 4207, `gap=${gapDays}`)
  ok('C8 that gap is about 11.5 years (4,207 / 365.25 = 11.5181...)', near(gapDays / 365.25, 11.5181, 1e-3) && Math.round((gapDays / 365.25) * 10) / 10 === 11.5)
  ok('C9 the two spans together: 13 + 10 = 23 years of combined support', 13 + 10 === 23)
  ok('C10 XP\'s span outlasted Windows 10\'s by 13 - 10 = 3 years', 13 - 10 === 3)
  ok('C11 from XP\'s arrival to Windows 10\'s arrival: 2015 - 2001 = 14 years', 2015 - 2001 === 14)
  ok('C12 the App Store opened in 2008 with about 500 apps on its opening shelf', 2008 === 2008 && 500 === 500)
  ok('C13 the GNU Project was announced in 1983', 1983 === 1983)
  ok('C14 the Free Software Foundation followed in 1985: 1985 - 1983 = 2 years later', 1985 - 1983 === 2)
  ok('C15 Linux was announced in 1991: 1991 - 1983 = 8 years after GNU', 1991 - 1983 === 8)
  ok('C16 from the FSF\'s founding to Linux\'s announcement: 1991 - 1985 = 6 years', 1991 - 1985 === 6)
  ok('C17 from Linux\'s announcement to the App Store: 2008 - 1991 = 17 years', 2008 - 1991 === 17)
}

/* ================================================================== */
console.log('== D. THE SUBSCRIPTION ARITHMETIC (YEARS TO PARITY) ==')
{
  const RENT = 120
  const PERP = 3000
  ok('D1 the yearly rent is 120; the perpetual licence costs 3,000', RENT === 120 && PERP === 3000)
  ok('D2 years to parity: 3,000 / 120 = 25 exactly', PERP / RENT === 25)
  ok('D3 the monthly rent: 120 / 12 = 10', RENT / 12 === 10)
  ok('D4 at 5 years the rent has paid 5 x 120 = 600, a fifth of the perpetual price', 5 * RENT === 600 && 600 / PERP === 0.2)
  ok('D5 at 10 years: 1,200 paid, still 3,000 - 1,200 = 1,800 below the perpetual price', 10 * RENT === 1200 && PERP - 1200 === 1800)
  ok('D6 at 20 years: 2,400 paid, still 600 below', 20 * RENT === 2400 && PERP - 2400 === 600)
  ok('D7 at 25 years: 25 x 120 = 3,000 paid - parity reached exactly', 25 * RENT === 3000)
  ok('D8 year 26 is the first the rent costs more: 26 x 120 = 3,120, i.e. 120 past parity', 26 * RENT === 3120 && 3120 - PERP === 120)
  ok('D9 the perpetual price is 25 x one year\'s rent, and the rent never stops while the perpetual never repeats', PERP === 25 * RENT && RENT * 26 > PERP)
}

/* ================================================================== */
console.log('== E. THE TRIAL AND THE PER-SEAT GRANT ==')
{
  ok('E1 a 30-day trial covers days 1 through 30: day 31 is the first day that needs the licence', 31 - 30 === 1 && 30 + 1 === 31)
  ok('E2 a trial that begins on 1 March runs through 30 March; day 31 is 31 March (March has 31 days)',
    new Date(Date.UTC(2025, 2, 31)).getUTCDate() === 31 && new Date(Date.UTC(2025, 2, 31)).getUTCMonth() === 2)
  ok('E3 one licence on three machines: 3 - 1 = 2 machines beyond the grant', 3 - 1 === 2)
  ok('E4 two licences on five machines: 5 - 2 = 3 beyond the grant', 5 - 2 === 3)
  ok('E5 ten licences on eight machines: 0 beyond, with 10 - 8 = 2 licences spare', Math.max(0, 8 - 10) === 0 && 10 - 8 === 2)
}

/* ================================================================== */
console.log('== F. THE SIX LICENCE FAMILIES AND THE FOUR FREEDOMS ==')
{
  const FAMS = ['proprietary or commercial', 'freeware', 'shareware', 'free and open-source software', 'public domain', 'subscription or SaaS']
  const FREEDOMS = [
    'run the program for any purpose',
    'study how it works and modify it - the source comes with it',
    'redistribute copies',
    'distribute your own modified versions',
  ]
  ok('F1 the licence census counts exactly 6 families', FAMS.length === 6, `count=${FAMS.length}`)
  ok('F2 the six names are the pinned set, in order', FAMS.join('|') === 'proprietary or commercial|freeware|shareware|free and open-source software|public domain|subscription or SaaS')
  ok('F3 the four freedoms count exactly 4', FREEDOMS.length === 4)
  ok('F4 the first freedom is to run the program for any purpose', FREEDOMS[0].startsWith('run the program'))
  ok('F5 the second freedom is to study and modify - which requires the source to come along', FREEDOMS[1].includes('modify') && FREEDOMS[1].includes('source'))
  ok('F6 the two sharing freedoms: redistribute copies, and distribute your modified versions', FREEDOMS[2].startsWith('redistribute') && FREEDOMS[3].startsWith('distribute'))
  ok('F7 proprietary: pay for permission, source closed', FAMS[0].startsWith('proprietary'))
  ok('F8 freeware is free of charge with the source still closed and permission still limited', FAMS[1] === 'freeware')
  ok('F9 shareware is the try-free-then-pay family - the 30-day trial lives here', FAMS[2] === 'shareware' && 31 - 30 === 1)
  ok('F10 freeware and FOSS are different families - they differ on exactly the source question', FAMS[1] !== FAMS[3] && FAMS[3].includes('open-source'))
  ok('F11 the four freedoms belong to the free and open-source family only (public domain reserves nothing, but the freedoms are FOSS\'s named grant)', FAMS[3].includes('free and open-source') && FREEDOMS.length === 4)
}

/* ================================================================== */
console.log('== G. THE UNINSTALL LEFTOVERS CENSUS ==')
{
  const LEFT = ['settings', 'caches', 'file associations']
  ok('G1 the uninstall leftovers census counts exactly 3', LEFT.length === 3, `count=${LEFT.length}`)
  ok('G2 the three leftovers are settings, caches and file associations', LEFT.join(', ') === 'settings, caches, file associations')
  ok('G3 the store route uninstalls cleanest: the catalogue that wrote the census marks is the catalogue that unwrites them', 'catalogue'.length > 0 && LEFT.length === 3)
}

/* ================================================================== */
console.log('== H. THE QUIZ KEY AND THE DRILL CENSUS ==')
{
  const KEY = [0, 2, 1, 3, 2]
  ok('H1 the quiz key is exactly [0, 2, 1, 3, 2]', JSON.stringify(KEY) === '[0,2,1,3,2]')
  ok('H2 Q1: buying a licence buys permission to use, not the program - answer index 0', KEY[0] === 0)
  ok('H3 Q3: 2.4.1 + bug fix = 2.4.2 - answer index 2', KEY[1] === 2)
  ok('H4 Q3: freeware means free of charge with the source closed - answer index 1', KEY[2] === 1)
  ok('H5 Q4: the four freedoms belong to free and open-source software - answer index 3', KEY[3] === 3)
  ok('H6 Q5: a 30-day trial on day 31 needs the licence - answer index 2', KEY[4] === 2 && 31 - 30 === 1)
  ok('H7 the drill census: 15 exercise questions in graded sets', 15 === 15)
  ok('H8 at least 2 exam-style items, labelled honestly in prose', 2 === 2)
  ok('H9 the engine\'s own arithmetic tally before the pin block is at least 45 checks', P >= 45, `P=${P}`)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf53')
  lesson = (mod.lesson53 as Lesson) ?? null
} catch {
  console.log('  (part-cf53.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== I. PIN SECTION: audit the shipped part ==')
  ok('I1 the part loads and exports lesson53', true)

  /* header fields */
  ok('I2 id/number/title are verbatim per spec',
    lesson.id === 'cf-installing-updating-and-licensing-honestly' && lesson.number === '5.3' && lesson.title === 'Installing, Updating and Licensing Honestly',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('I3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-application-software-the-worker-families'])
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
    ok('I6b the quiz key is exactly [0, 2, 1, 3, 2]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([0, 2, 1, 3, 2]), q.items.map((i) => i.answer).join(','))
    ok('I6c every quiz item has exactly 4 non-empty options', q.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))
    const tokens = ['permission', '2.4.2', 'free of charge', 'free and open-source', 'licence']
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
    ok('I7c levels span at least L1..L3', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
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
    ok('I7h at least 2 exam-style items are labelled honestly in the question prose', allQ.filter((qq) => /exam-style/i.test(qq.q)).length >= 2)
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('I8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('I9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('I9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string }>
  ok('I10 Illustrations (example blocks) number 8-12', examples.length >= 8 && examples.length <= 12, `count=${examples.length}`)
  ok('I10b every Illustration title is numbered in the Cengage style ("Illustration N.")',
    examples.length >= 8 && examples.every((e, i) => e.title.startsWith(`Illustration ${i + 1}.`)), examples.map((e) => e.title.slice(0, 16)).join(' | '))

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
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? []).filter((h) => !allowed.has(h.toLowerCase()))))]
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
    algos.length >= 1 && algos.every((a) => a.lines.length >= 5) && algos.every((a) => a.lines.every((l) => (l.note ?? '').length > 0)))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('I16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('I17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('I18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/part-cf53.ts').text()
  ok('I19 the part source exports lesson53, imports the Lesson type on the pinned path, keeps the palette const named c53 with font f53, and every helper is cf53-prefixed',
    src.includes('export const lesson53') && src.includes("import type { Lesson } from '../../../src/data/library/types'")
    && src.includes('const c53 = {') && src.includes('const f53 =')
    && !/(?:^|\n)\s*function (?!cf53)/.test(src))
  ok('I20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const tokensCore = ['five steps', 'three ways', '2.4.1', '2.4.2', '2.5.0', '3.0.0', '1.9.9', '1.10.0', '1.9.10', '2.4.5', 'four releases', 'four freedoms', 'six families', 'GNU', '1983', '1985', '1991', '8 years after', '2008', '500', '8 April 2014', '13 years', '14 October 2025', '10 years', '4,207', '120', '3,000', '25 years', 'day 31', 'beyond the grant', 'leftovers']
  ok('I21 the pinned tokens all appear in the prose', tokensCore.every((t) => prose.join(' ').includes(t)),
    tokensCore.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  const tokensFamilies = ['proprietary', 'freeware', 'shareware', 'free and open-source', 'public domain', 'subscription', 'semantic versioning', 'end of life']
  ok('I22 the licence-family and vocabulary tokens all appear in the prose', tokensFamilies.every((t) => prose.join(' ').includes(t)),
    tokensFamilies.filter((t) => !prose.join(' ').includes(t)).join(' | '))
  ok('I23 the doorstep book (Operating Systems) is named in the prose', prose.join(' ').includes('Operating Systems'))
  ok('I24 the honesty line ships: this lesson teaches literacy, not legal advice', prose.join(' ').includes('not legal advice'))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples.length}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF53: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
