import { chapter2, lessonGeo201 } from '../src/data/library/books/mathematics/geometry/ch-02'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch02.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 2 "Angles, Parallel Lines and the Transversal" (run 126 OPENED
 * the chapter with 2.1; run 127 salvages 2.2 and assembles 2.2 + 2.3 + 2.4
 * to CLOSE it — the banked v-geo203/v-geo204 harnesses ride that assembly).
 * VERIFY-FIRST per the standing protocol: the lesson's ENGINE section ran
 * green BEFORE its prose was declared done — by the authoring agent against
 * its part file — and the PIN sections here RE-READ THE SHIPPED CHAPTER (the
 * part import redirected to ch-02.ts).
 *
 *   (geo201) 2.1 engines + pins
 *   (Z)      the in-progress chapter census — the honest 1 + 3 shape
 *
 * Assembled by scripts/assemble_run126.py (on the assemble_run125.py
 * pattern): the v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH02_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-02.ts', import.meta.url).pathname

async function sectionGeo201(): Promise<SectionResult> {
/**
 * v-geo201.ts — verify-first ENGINE + PIN harness for GEO lesson 2.1
 * "Angles: Types, Pairs and Measures" (run 126 swarm, agent geo201).
 *
 * DISCIPLINE: the engine wins over every other source. Every truth value,
 * census number and witness the prose prints is recomputed here by brute
 * force FIRST; where this engine and the prose disagree, the prose is
 * fixed to the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION — pure arithmetic/sweeps, NO repo content imports, no
 *     part-file import. Re-derives in TypeScript every 2.1 witness of
 *     docs/research/geo-ch02-wip/pin_check_geo126.py (104/104 GREEN):
 *     complement/supplement arithmetic incl. the five named identities;
 *     the type-census boundaries; the vertical/linear algebra at 118°;
 *     the bisector sweep 10..170; both ratio families; all four clock
 *     witnesses; the supp = 3·comp uniqueness sweep over 0..180; plus
 *     every illustration, quiz and exercise witness the lesson prints.
 *   PIN SECTION (P01...) — imports ./part-geo201 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word
 *     floor >= 6,000, quiz key [1,2,0,1,2] with intended-option tokens
 *     and why-each-fails explains, exactly 15 exercises spanning L1..L6
 *     with full steps solutions + terminal answers, >= 3 body + >= 3
 *     solution figures, terms + formula blocks, >= 2 examples with
 *     >= 4 steps, >= 3 derivation blocks, SVG law, math-span hygiene).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo201.ts
 */


/* ------------------------------------------------------------------ */
/* check harness                                                       */
/* ------------------------------------------------------------------ */
type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
function check(name: string, ok: boolean, detail = ''): void {
  engine.push({ name, ok, detail })
}
function pcheck(name: string, ok: boolean, detail = ''): void {
  pins.push({ name, ok, detail })
}
const ok = (b: boolean): boolean => b
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
const round6 = (x: number): number => Math.round(x * 1e6) / 1e6

/* ================================================================== */
/* ENGINE A — complement / supplement arithmetic + the named identities */
/* ================================================================== */
{
  const supp = (x: number): number => 180 - x
  const comp = (x: number): number => 90 - x
  check('E01 supp(124) = 56', supp(124) === 56, `supp(124)=${supp(124)}`)
  check('E02 comp(37) = 53', comp(37) === 53, `comp(37)=${comp(37)}`)
  check('E03 supp(90) = 90 — a right angle is its own supplement', supp(90) === 90, '')
  check('E04 comp(45) = 45 — half a right angle is its own complement', comp(45) === 45, '')
  const selfS = 180 / 2
  check('E05 the angle equal to its own supplement is 90° (x = 180 − x forces 2x = 180)',
    selfS === 90 && near(selfS + selfS, 180), `x=${selfS}`)
  const selfC = 90 / 2
  check('E06 the angle equal to its own complement is 45° (x = 90 − x forces 2x = 90)',
    selfC === 45 && near(selfC + selfC, 90), `x=${selfC}`)
  const xTriple = 45
  check('E07 supp = 3·comp at x = 45: 180 − 45 = 135 = 3 × (90 − 45) = 3 × 45',
    near(supp(xTriple), 3 * comp(xTriple)) && supp(xTriple) === 135 && comp(xTriple) === 45,
    `supp=${supp(xTriple)}, comp=${comp(xTriple)}`)
  const sols: number[] = []
  for (let v = 0; v <= 180; v++) if (180 - v === 3 * (90 - v)) sols.push(v)
  check('E08 supp = 3·comp has the UNIQUE integer solution 45 over the sweep 0..180',
    JSON.stringify(sols) === JSON.stringify([45]), `solutions=[${sols.join(',')}]`)
  check('E09 comp(supp(152)) = 62 — the complement of the supplement of 152°',
    comp(supp(152)) === 62, `90 − (180 − 152) = ${comp(supp(152))}`)
  let ident = true
  for (let v = 91; v <= 180; v++) if (!(90 - (180 - v) === v - 90)) { ident = false; break }
  check('E10 identity comp(supp(x)) = x − 90 sweeps clean over 91..180', ok(ident), '')
}

/* ================================================================== */
/* ENGINE B — the type census and its boundaries                        */
/* ================================================================== */
{
  type Fam = 'degenerate' | 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'complete'
  const classify = (x: number): Fam | 'out of range' => {
    if (x === 0) return 'degenerate'
    if (0 < x && x < 90) return 'acute'
    if (x === 90) return 'right'
    if (90 < x && x < 180) return 'obtuse'
    if (x === 180) return 'straight'
    if (180 < x && x < 360) return 'reflex'
    if (x === 360) return 'complete'
    return 'out of range'
  }
  check('E11 89.9° is acute — the census is honest to a tenth of a degree',
    classify(89.9) === 'acute', classify(89.9))
  check('E12 90° is RIGHT, not acute (first boundary honesty)',
    classify(90) === 'right' && classify(90) !== 'acute', '')
  check('E13 90.1° is obtuse — one tenth past the boundary switches family',
    classify(90.1) === 'obtuse', classify(90.1))
  check('E14 0° degenerate, 180° straight, 269.5° reflex, 360° complete',
    classify(0) === 'degenerate' && classify(180) === 'straight' && classify(269.5) === 'reflex' && classify(360) === 'complete',
    `${classify(0)}, ${classify(180)}, ${classify(269.5)}, ${classify(360)}`)
  check('E15 180° is STRAIGHT, not obtuse (second boundary honesty)',
    classify(180) === 'straight' && classify(180) !== 'obtuse', '')
  let sweepA = true, sweepO = true, sweepR = true
  for (let v = 1; v <= 89; v++) if (classify(v) !== 'acute') { sweepA = false; break }
  for (let v = 91; v <= 179; v++) if (classify(v) !== 'obtuse') { sweepO = false; break }
  for (let v = 181; v <= 359; v++) if (classify(v) !== 'reflex') { sweepR = false; break }
  check('E16 census interiors sweep clean: 1..89 acute, 91..179 obtuse, 181..359 reflex',
    sweepA && sweepO && sweepR, '')
  const reflex = (x: number): number => 360 - x
  check('E17 reflex(118) = 242 and 118 + 242 = 360 (every angle and its reflex exhaust the turn)',
    reflex(118) === 242 && 118 + 242 === 360, '')
  // Illustration 1 witnesses: classify 0, 47.5, 90, 118, 180, 310
  const ill1: Array<[number, Fam]> = [[0, 'degenerate'], [47.5, 'acute'], [90, 'right'], [118, 'obtuse'], [180, 'straight'], [310, 'reflex']]
  check('E18 Illustration 1 witnesses: 0 degenerate, 47.5 acute, 90 right, 118 obtuse, 180 straight, 310 reflex',
    ill1.every(([v, w]) => classify(v) === w), ill1.map(([v, w]) => `${v}:${w}`).join(' '))
}

/* ================================================================== */
/* ENGINE C — the two-line X: linear pairs + vertically opposite at 118  */
/* ================================================================== */
{
  const a = 118, b = 180 - a, c = a, d = 180 - a
  check('E19 the vertically opposite partner of 118° is 118° (the opposite angle)',
    a === c && c === 118, '')
  check('E20 the linear partners of 118° are 62° (180 − 118)', b === 62 && d === 62, `b=${b}, d=${d}`)
  check('E21 all four angles of the X are 118, 62, 118, 62 and sum to 360',
    near(a + b + c + d, 360), `${a + b + c + d}`)
  const pairs: Array<[number, number]> = [[a, b], [b, c], [c, d], [d, a]]
  check('E22 every adjacent pair is a linear pair summing to 180 (4 pairs around O)',
    pairs.every(([p, q]) => near(p + q, 180)), pairs.map(([p, q]) => p + q).join(','))
  check('E23 the vertical-theorem algebra: a + b = 180 and b + c = 180, subtract (CN3) to get a = c',
    near(a + b, 180) && near(b + c, 180) && near(a - c, 0), `a=${a}, b=${b}, c=${c}`)
  // Illustration 2 (the algebra chain): (3x − 12) = (x + 48) ⟹ x = 30, angles 78/102
  const xIll = 30
  check('E24 Illustration 2: 3x − 12 = x + 48 gives x = 30, the vertical angles 78°',
    3 * xIll - 12 === xIll + 48 && 3 * xIll - 12 === 78, `x=${xIll}, angle=${3 * xIll - 12}°`)
  check('E25 Illustration 2: the linear partners of 78° are 102°', 180 - 78 === 102, '')
}

/* ================================================================== */
/* ENGINE D — bisectors of a linear pair are perpendicular (the sweep)   */
/* ================================================================== */
{
  const named = [10, 37, 65, 90, 124.5, 170]
  check('E26 bisector split x/2 + (180 − x)/2 = 90 at the six pin-file x (10, 37, 65, 90, 124.5, 170)',
    named.every((x) => near(x / 2 + (180 - x) / 2, 90)),
    named.map((x) => x / 2 + (180 - x) / 2).join(','))
  let sweep = true
  for (let x = 10; x <= 170; x++) if (!near(x / 2 + (180 - x) / 2, 90)) { sweep = false; break }
  check('E27 the identity sweeps clean over EVERY integer x in 10..170 (pinned)', ok(sweep), '')
  const xw = 124.5
  check('E28 the exercise witness at x = 124.5: halves 62.25 + 27.75 = 90',
    near(xw / 2 + (180 - xw) / 2, 90) && xw / 2 === 62.25 && (180 - xw) / 2 === 27.75,
    `${xw / 2} + ${(180 - xw) / 2}`)
  // bisectors at the running witness 118: 59 + 31 = 90
  check('E29 bisector halves at x = 118: 59° and 31°, summing to 90°',
    118 / 2 === 59 && 62 / 2 === 31 && 59 + 31 === 90, '')
}

/* ================================================================== */
/* ENGINE E — the ratio families                                        */
/* ================================================================== */
{
  const r23: [number, number] = [(2 * 180) / 5, (3 * 180) / 5]
  check('E30 supplementary pair in ratio 2:3 is (72°, 108°)',
    near(r23[0], 72) && near(r23[1], 108) && near(r23[0] + r23[1], 180), `(${r23[0]}, ${r23[1]})`)
  const r45: [number, number] = [(4 * 90) / 9, (5 * 90) / 9]
  check('E31 complementary pair in ratio 4:5 is (40°, 50°)',
    near(r45[0], 40) && near(r45[1], 50) && near(r45[0] + r45[1], 90), `(${r45[0]}, ${r45[1]})`)
  const r37: [number, number] = [(3 * 180) / 10, (7 * 180) / 10]
  check('E32 supplementary pair in ratio 3:7 is (54°, 126°)',
    near(r37[0], 54) && near(r37[1], 126) && near(r37[0] + r37[1], 180), `(${r37[0]}, ${r37[1]})`)
  const r27: [number, number] = [(2 * 90) / 9, (7 * 90) / 9]
  check('E33 complementary pair in ratio 2:7 is (20°, 70°)',
    near(r27[0], 20) && near(r27[1], 70) && near(r27[0] + r27[1], 90), `(${r27[0]}, ${r27[1]})`)
  // ratio parts add: 2u + 3u = 5u = 180 ⟹ u = 36
  check('E34 the unit trick: 2u + 3u = 5u = 180 gives u = 36, so 2u = 72 and 3u = 108',
    5 * 36 === 180 && 2 * 36 === 72 && 3 * 36 === 108, '')
}

/* ================================================================== */
/* ENGINE F — clock angles (minute 6°/min, hour 0.5°/min, 30°/hour)      */
/* ================================================================== */
{
  const clock = (h: number, m: number): number => Math.abs(30 * (h % 12) + 0.5 * m - 6 * m)
  check('E35 3:00 gives 90° (a right angle on the clock face)', near(clock(3, 0), 90), `${clock(3, 0)}`)
  check('E36 3:40 gives 130° — computed as |90 + 20 − 240| = |−130|',
    near(clock(3, 40), 130) && near(Math.abs(90 + 0.5 * 40 - 6 * 40), 130), `${clock(3, 40)}`)
  check('E37 2:20 gives 50°', near(clock(2, 20), 50), `${clock(2, 20)}`)
  check('E38 6:00 gives 180° (a straight angle)', near(clock(6, 0), 180), `${clock(6, 0)}`)
  check('E39 minute hand 6°/min: a full turn is 60 × 6 = 360', 60 * 6 === 360, '')
  check('E40 hour hand 0.5°/min: 12 × 60 × 0.5 = 360, i.e. 30° per hour',
    12 * 60 * 0.5 === 360 && 0.5 * 60 === 30, '')
  check('E41 relative speed 5.5°/min: the hands realign every 360/5.5 = 720/11 min',
    near(6 - 0.5, 5.5) && near(360 / 5.5, 720 / 11), '')
  const m2 = 360 / 11
  check('E42 hands perpendicular after 3:00 at m = 0 and m = 360/11; both give |90 − 5.5m| = 90',
    near(Math.abs(90 - 5.5 * 0), 90) && near(Math.abs(90 - 5.5 * m2), 90), `m2 = ${round6(m2)} min`)
  check('E43 the honest decimal 360/11 = 32.727273 (6 dp) — 32 8/11 minutes past three',
    round6(360 / 11) === 32.727273, `${round6(360 / 11)}`)
  const mc = 720 / 11
  check('E44 first hand coincidence after 12:00 at m = 720/11 ≈ 65.454545 min (65 5/11)',
    near(5.5 * mc, 360) && round6(mc) === 65.454545, `${round6(mc)}`)
}

/* ================================================================== */
/* ENGINE G — degrees–minutes–seconds + every exercise witness           */
/* ================================================================== */
{
  // body micro-conversions
  check('E45 10°30′ = 10.5° (30/60 = 0.5 exactly)', near(30 / 60, 0.5) && near(10 + 30 / 60, 10.5), '')
  check('E46 0.1° = 6′ (one tenth of a degree is six arcminutes)', near(0.1 * 60, 6, 1e-9), '')
  // Ex3 DMS conversions
  const dmsA = 42 + 18 / 60 + 36 / 3600
  check('E47 Ex3(a): 42°18′36″ = 42.31° (18/60 = 0.3, 36/3600 = 0.01)', near(dmsA, 42.31, 1e-9), `${round6(dmsA)}`)
  const frac = 0.42 * 60
  const mins = Math.floor(frac)
  const secs = (frac - mins) * 60
  check('E48 Ex3(b): 37.42° = 37°25′12″ (0.42° = 25.2′; 0.2′ = 12″)',
    near(mins, 25, 1e-9) && near(secs, 12, 1e-9), `mins=${mins}, secs=${round6(secs)}`)
  // Ex2 complements and supplements
  check('E49 Ex2 witnesses: comp(34) = 56, comp(81) = 9, supp(34) = 146, supp(81) = 99, supp(118) = 62, and comp(118) does not exist (118 > 90)',
    90 - 34 === 56 && 90 - 81 === 9 && 180 - 34 === 146 && 180 - 81 === 99 && 180 - 118 === 62 && 118 > 90, '')
  // Ex7: one angle of a linear pair is four times the other
  const small = 180 / 5, big = 4 * (180 / 5)
  check('E50 Ex7: x + 4x = 180 gives 36° and 144°, the four angles of the X are 36, 144, 36, 144',
    small === 36 && big === 144 && near(small + big, 180) && near(36 + 144 + 36 + 144, 360), `(${small}, ${big})`)
  // Ex12: (4x − 10) and (3x + 5) vertical
  const x12 = 15
  check('E51 Ex12: 4x − 10 = 3x + 5 gives x = 15, vertical angles 50°, linear partners 130°',
    4 * x12 - 10 === 3 * x12 + 5 && 4 * x12 - 10 === 50 && 180 - 50 === 130, `x=${x12}`)
  // Ex15: the two bisector lines at a crossing are perpendicular
  let bisSweep = true
  for (let aDeg = 1; aDeg < 180; aDeg++) {
    const b1 = aDeg / 2
    const b2 = aDeg + (180 - aDeg) / 2
    if (!near(Math.abs(b2 - b1), 90)) { bisSweep = false; break }
  }
  check('E52 Ex15: the two bisector lines differ by 90° for EVERY integer a in 1..179', ok(bisSweep), '')
  check('E53 Ex15 witness at a = 118: bisector directions 59° and 149° from the same ray, difference 90°',
    118 / 2 === 59 && 118 / 2 + 90 === 149, '')
  // quiz key
  const QUIZ_KEY = [1, 2, 0, 1, 2]
  check('E54 quiz key [1,2,0,1,2]: five entries, each a valid index into four options',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3), QUIZ_KEY.join(','))
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)      */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: any
  try {
    mod = await Promise.resolve({ lessonGeo201 })
    pcheck('P01 part file loads and exports lessonGeo201', !!mod?.lessonGeo201, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo201', false, String(e))
  }
  const lesson: Lesson | undefined = mod?.lessonGeo201
  if (!lesson) return

  // P02 — quiz keys [1,2,0,1,2], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,2,0,1,2]', JSON.stringify(keys) === JSON.stringify([1, 2, 0, 1, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length === 4),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['53°', 'obtuse', '118°, 62°, 62°', '90°', '130°']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      pcheck(`P02c quiz item ${idx + 1}: correct option carries the pinned token "${tokens[idx]}"`, correct.includes(tokens[idx]), `correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain is a full why-each-fails audit`, i.explain.length >= 60, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises: exactly 15 questions spanning L1..L6, full steps + answers
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    pcheck('P03a sets span L1..L6', spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    pcheck('P03c every question has a non-empty steps solution + answer',
      allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    let coreOk = 0
    const fails: string[] = []
    for (const q of allQ) {
      const whole = q.solution.join(' ').replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const okq = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (okq) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = allQ.reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=8 items (the concept words)', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 8),
    termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >=3 formula cards', formulas >= 3, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000 (target 8,500+)', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  pcheck('P09a >=6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)',
    texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11–14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) { clipFails.push('no viewBox'); continue }
    const W = parseFloat(vb[1])
    for (const m of s.matchAll(/<text x="([0-9.]+)"[^>]*font-size="([0-9.]+)"[^>]*text-anchor="(start|middle|end)"[^>]*>([^<]*)</g)) {
      const x = parseFloat(m[1]), fs = parseFloat(m[2]), anch = m[3], t = m[4]
      const w = t.length * fs * 0.62
      const left = anch === 'middle' ? x - w / 2 : anch === 'end' ? x - w : x
      const right = anch === 'middle' ? x + w / 2 : anch === 'end' ? x : x + w
      if (left < 7 || right > W - 7) clipFails.push(`"${t.slice(0, 24)}" x=${x} fs=${fs} W=${W}`)
    }
  }
  pcheck('P09h no SVG label clips the viewBox width (0.62em/char estimate)', clipFails.length === 0, clipFails.slice(0, 4).join(' ; '))
  // P10 — math-span laws
  const mathSpans: string[] = []
  const prose: string[] = []
  const collect = (s: string): void => {
    for (const m of s.matchAll(/\$([^$]*)\$/g)) mathSpans.push(m[1])
    prose.push(s.replace(/\$[^$]*\$/g, ''))
  }
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') collect(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; collect(c.title); collect(c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) { collect(it.q); it.options.forEach(collect); collect(it.explain) }
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) { collect(t.term); collect(t.def) }
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; explanation: string }>; result: string }; collect(d.title); collect(d.statement); collect(d.result); for (const s of d.steps) { collect(s.label); collect(s.explanation) } }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; collect(e.title); e.steps.forEach(collect) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) { collect(q.q); q.solution.forEach(collect); collect(q.answer ?? '') }
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) collect(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][]; caption?: string }; if (t.caption) collect(t.caption); t.head.forEach(collect); t.rows.flat().forEach(collect) }
    if (b.kind === 'formula') { const fo = b as { name: string; note?: string }; collect(fo.name); if (fo.note) collect(fo.note) }
    if (b.kind === 'heading') collect((b as { text: string }).text)
  }
  pcheck('P10a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  pcheck('P10b no $$ delimiters and no \\dfrac in prose', prose.every((t) => !t.includes('$$') && !t.includes('\\dfrac')), '')
  pcheck('P10c no raw TeX commands outside $...$ in prose fields', prose.every((t) => !/\\[a-zA-Z]+/.test(t)), prose.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact',
    lesson.id === 'geo-angles-types-pairs-and-measures' && lesson.number === '2.1' && lesson.title === 'Angles: Types, Pairs and Measures',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch02-web-ground]',
    JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [geo-incidence-how-points-lines-and-planes-interlock]',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6,
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=2 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=2 example blocks with >=4 steps', examples.length >= 2 && examples.every((e) => e.steps.length >= 4),
    examples.map((e) => `${e.title.slice(0, 34)} (${e.steps.length} steps)`).join(' | '))
  // P17 — derivation blocks (the vertical theorem, the supp=3comp algebra, the bisector perpendicularity)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=3 derivation blocks', derivs.length >= 3, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo201 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}


/* ================================================================== */
/* SECTION Z — the in-progress chapter census                          */
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
  console.log('== SECTION Z: the in-progress chapter census ==')
  z('Z01 chapter number is 2', chapter2.number === 2)
  z('Z02 chapter slug', chapter2.slug === 'angles-and-parallel-lines', chapter2.slug)
  z('Z03 chapter status in-progress', chapter2.status === 'in-progress', chapter2.status)
  z('Z04 one lesson shipped so far', chapter2.lessons.length === 1, String(chapter2.lessons.length))
  const plannedTitles = ['Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']
  z('Z05 plannedLessons carries the three unwritten titles in teaching order', JSON.stringify(chapter2.plannedLessons ?? []) === JSON.stringify(plannedTitles), JSON.stringify(chapter2.plannedLessons ?? []))
  const ids = chapter2.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-angles-types-pairs-and-measures']), ids.join(','))
  const nums = chapter2.lessons.map((l) => l.number)
  z('Z07 lesson numbers 2.1..', JSON.stringify(nums) === JSON.stringify(['2.1']), nums.join(','))
  const titles = chapter2.lessons.map((l) => l.title)
  z('Z08 lesson titles exact', JSON.stringify(titles) === JSON.stringify(['Angles: Types, Pairs and Measures']), titles.join(' | '))
  const wcs = chapter2.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-incidence-how-points-lines-and-planes-interlock'],
  ]
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH02_SRC))
  const shippedText = readFileSync(CH02_SRC, 'utf8')
  z('Z15 the shipped source exports lessonGeo201', shippedText.includes('export const lessonGeo201'))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 complete, chapter 2 in-progress', geometry.chapters[0].status === 'complete' && geometry.chapters[1].status === 'in-progress', `${geometry.chapters[0].status}/${geometry.chapters[1].status}`)
  z('Z19 chapters 3-12 still planned', geometry.chapters.slice(2).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter2.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter2.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 6,000 words)', chapterWords > 6000, String(chapterWords))
  z('Z23 the planned titles match the book planning map verbatim', JSON.stringify(plannedTitles) === JSON.stringify(['Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo201(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch02: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 2 OPENED 1/4 (2.2 salvage + 2.3/2.4 assembly + the close ride run 127).')
}

main()
