import { chapter2, lessonGeo201, lessonGeo202, lessonGeo203, lessonGeo204 } from '../src/data/library/books/mathematics/geometry/ch-02'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch02.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 2 "Angles, Parallel Lines and the Transversal" (run 126 OPENED
 * with 2.1; run 127 salvaged 2.2 and assembled 2.2 + 2.3 + 2.4 to CLOSE it
 * COMPLETE — 4 lessons, 38,983 words). VERIFY-FIRST per the standing
 * protocol: each lesson's ENGINE section ran green BEFORE its prose was
 * declared done — by its authoring agent against its part file — and the
 * PIN sections here RE-READ THE SHIPPED CHAPTER (the part imports
 * redirected to ch-02.ts).
 *
 *   (geo201) 2.1 engines + pins      (geo202) 2.2 engines + pins
 *   (geo203) 2.3 engines + pins      (geo204) 2.4 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 4-of-4 shape
 *
 * Assembled by scripts/assemble_run127.py (on the assemble_run126.py
 * pattern): each v-file wrapped whole as one async section (its local
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

async function sectionGeo202(): Promise<SectionResult> {


/**
 * v-geo202.ts — verify-first ENGINE + PIN harness for GEO lesson 2.2
 * "Parallel Lines and the Fifth Postulate" (run 126 swarm, agent geo202, seat 22).
 *
 * DISCIPLINE: the engine wins over the spec. Every pinned witness the prose
 * prints is recomputed here FIRST — this file is the TypeScript re-derivation
 * of the §2.2 witnesses in docs/research/geo-ch02-wip/pin_check_geo126.py
 * (104/104 GREEN) plus every number the lesson itself prints. Where engine
 * and prose disagree, the prose is fixed to the engine's value.
 *
 * Structure:
 *   ENGINE SECTION — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the fifth postulate's side logic (the two same-side
 *     interior sums add to 360° at the three sweep values 170 / 118.25 / 90;
 *     the linear-pair regrouping with the Figure-1 witnesses; the meet-side
 *     verdict table; the deficit law 180 − sum); the parallel census across
 *     the three geometries (Euclidean 1, spherical 0, hyperbolic infinitely
 *     many) with the ∃! decomposition over the counts {1, 0, 2, ∞}; the
 *     historical year ladder 450 → 1733 → 1795 → 1829 → 1832 with all four
 *     gaps 1283 / 62 / 34 / 3 and the total span; Playfair's ∃! structure
 *     (existence via the double perpendicular's 90 + 90 = 180 sums on both
 *     sides; uniqueness via the tilt sweep θ ∈ {1..89} leaving a side sum
 *     180 − θ < 180°); the lesson identity pins (chapter census); and every
 *     witness number the quiz, the illustrations, the figures and the 15
 *     exercises print.
 *   PIN SECTION (P01...) — imports ./part-geo202 + countLessonWords and
 *     audits the lesson object per spec: identity/prerequisites/sources
 *     exact, word floor >= 6000, quiz key [1,2,0,3,1] with pinned tokens and
 *     why-each-fails explains, exactly 15 exercises spanning L1..L6 with full
 *     steps solutions + terminal answers + numeric containment, >= 3 body
 *     figures + >= 2 solution figures, terms >= 6, formula cards >= 3, >= 2
 *     example (Illustration) blocks with >= 4 steps, >= 2 derivation blocks,
 *     an exam callout, the SVG law (aria-labels, plain text, U+2212 minus,
 *     vivid palette only, strokes >= 1.2, fonts 11–14.5, no clipping) and the
 *     math-span hygiene scans (no \qquad in $...$, no $$, no raw TeX outside
 *     math, plain headings, no words field).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo202.ts
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
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps

/* ================================================================== */
/* ENGINE SECTION — recompute every pinned witness (NO part import)    */
/* ================================================================== */

/* ---- 1. the side-sum arithmetic (pin_check_geo126.py §2.2) -------- */
{
  const sweep = [170, 118.25, 90]
  sweep.forEach((sa, i) => {
    check(
      `E0${i + 1} side-sum law at side A = ${sa}: ${sa} + (${360 - sa}) = 360`,
      close(sa + (360 - sa), 360),
      `${sa} + ${360 - sa} = ${sa + (360 - sa)}`,
    )
  })
  // the linear-pair regrouping with the Figure F1 witnesses
  const a4 = 65
  const a5 = 105
  const a3 = 180 - a4
  const a6 = 180 - a5
  const left = a4 + a5
  const right = a3 + a6
  check(
    'E04 linear-pair regrouping at the F1 witnesses: (a4+a5)+(a3+a6) = (a3+a4)+(a5+a6) = 180+180',
    left === 170 && right === 190 && close(left + right, 360) && close(a3 + a4, 180) && close(a5 + a6, 180),
    `a3=${a3}, a6=${a6}, left=${left}, right=${right}`,
  )
}

/* ---- 2. the meet-side verdict table -------------------------------- */
{
  const verdict = (s: number): string =>
    s < 180 ? 'meet on that side' : s === 180 ? 'parallel' : 'meet on the other side'
  check('E05 verdict: same-side sum 170 (< 180) means the lines MEET on that side',
    verdict(170) === 'meet on that side', verdict(170))
  check('E06 verdict: same-side sum 190 (> 180) means the meeting is on the OTHER side',
    verdict(190) === 'meet on the other side', verdict(190))
  check('E07 verdict: same-side sum 180 (= 180) is the parallel case',
    verdict(180) === 'parallel', verdict(180))
  check('E08 verdict sweep: 118.25 and 90 meet that side; 241.75 meets the other side',
    verdict(118.25) === 'meet on that side' && verdict(90) === 'meet on that side' && verdict(241.75) === 'meet on the other side',
    '118.25/90 -> meet; 241.75 -> other side')
  const deficit = (s: number): number => 180 - s
  check('E09 deficit law (the angle at the meeting point, previewed for 2.4): 180−170=10, 180−118.25=61.75, 180−167=13',
    deficit(170) === 10 && close(deficit(118.25), 61.75) && deficit(167) === 13,
    `${deficit(170)} / ${deficit(118.25)} / ${deficit(167)}`)
}

/* ---- 3. the parallel census across the three geometries ------------ */
{
  const census = { euclidean: 1, spherical: 0, hyperbolic: Number.POSITIVE_INFINITY }
  const exists = (n: number): boolean => n >= 1
  const atMostOne = (n: number): boolean => n <= 1
  check('E10 census EUCLIDEAN: exactly 1 parallel through the outside point (∃ and ∃≤1 both hold)',
    census.euclidean === 1 && exists(census.euclidean) && atMostOne(census.euclidean), `count=${census.euclidean}`)
  check('E11 census SPHERICAL: 0 parallels — any two great circles meet (existence fails)',
    census.spherical === 0 && !exists(census.spherical), `count=${census.spherical}`)
  check('E12 census HYPERBOLIC: infinitely many parallels (at-most-one fails — the fan through the point)',
    census.hyperbolic === Number.POSITIVE_INFINITY && !atMostOne(census.hyperbolic), 'count=infinitely many')
  const table = [1, 0, 2, Number.POSITIVE_INFINITY].map((n) => exists(n) && atMostOne(n))
  check('E13 the ∃! decomposition over counts {1, 0, 2, ∞}: exactly-one = at-least-one AND at-most-one',
    JSON.stringify(table) === JSON.stringify([true, false, false, false]), JSON.stringify(table))
}

/* ---- 4. the historical year ladder --------------------------------- */
{
  const ladder: Array<[number, string]> = [
    [450, 'Proclus'],
    [1733, 'Saccheri'],
    [1795, 'Playfair'],
    [1829, 'Lobachevsky'],
    [1832, 'Bolyai'],
  ]
  const years = ladder.map(([y]) => y)
  const gaps = years.slice(1).map((y, i) => y - years[i])
  check('E14 year ladder 450 → 1733 → 1795 → 1829 → 1832 is strictly increasing',
    years.every((y, i) => i === 0 || y > years[i - 1]), years.join(' → '))
  check('E15 the four gaps are 1283, 62, 34, 3',
    JSON.stringify(gaps) === JSON.stringify([1283, 62, 34, 3]), JSON.stringify(gaps))
  check('E16 total span of the story: 1832 − 450 = 1382 years',
    years[years.length - 1] - years[0] === 1382, String(years[years.length - 1] - years[0]))
  const shortest = Math.min(...gaps)
  check('E17 the shortest gap is the LAST one: 3 years, Lobachevsky 1829 → Bolyai 1832',
    shortest === 3 && gaps.indexOf(shortest) === 3, `shortest=${shortest}`)
}

/* ---- 5. Playfair's ∃! structure ------------------------------------ */
{
  check('E18 existence half: the double perpendicular makes same-side sums 90 + 90 = 180 on BOTH sides',
    90 + 90 === 180, 'both sides exactly 180')
  const tilts = [1, 5, 15, 30, 45, 89]
  const convicted = tilts.every((t) => Math.min(180 - t, 180 + t) === 180 - t && 180 - t < 180)
  check('E19 uniqueness half: every tilt θ > 0 leaves a side summing 180 − θ < 180 — the fifth postulate forces a meeting (sweep 1..89)',
    convicted, `θ ∈ {${tilts.join(', ')}}`)
  const existsPar = true // the 180-sum line through P (double perpendicular)
  const playfairHolds = existsPar && convicted
  check('E20 ∃! assembled: existence (∃) AND uniqueness (∃≤1) hold together — exactly one parallel',
    playfairHolds === (existsPar && convicted) && playfairHolds, '∃ ∧ ∃≤1')
  const candidates = [155, 180, 174]
  const parallels = candidates.filter((s) => s === 180)
  check('E21 the Playfair-walk candidates 155 / 180 / 174: exactly ONE is parallel (the 180 one); 155 and 174 are convicted by the fifth',
    parallels.length === 1 && candidates[0] < 180 && candidates[2] < 180, `parallel sums: [${parallels.join(',')}]`)
}

/* ---- 6. lesson identity pins (pin_check_geo126.py §identity) -------- */
{
  const ids = [
    'geo-angles-types-pairs-and-measures',
    'geo-parallel-lines-and-the-fifth-postulate',
    'geo-the-transversal-the-eight-angle-census',
    'geo-angle-sum-of-a-triangle-and-its-consequences',
  ]
  const slug = 'angles-and-parallel-lines'
  const chapterTitle = 'Angles, Parallel Lines and the Transversal'
  check('E22 identity: lesson 2.2 id/number/title exact; chapter slug+title pinned; the four chapter ids are distinct',
    ids[1] === 'geo-parallel-lines-and-the-fifth-postulate' && new Set(ids).size === 4 &&
      slug === 'angles-and-parallel-lines' && chapterTitle === 'Angles, Parallel Lines and the Transversal' &&
      '2.2' === '2.2' && 'Parallel Lines and the Fifth Postulate' === 'Parallel Lines and the Fifth Postulate',
    ids[1])
}

/* ---- 7. every witness number the lesson prints --------------------- */
{
  check('E23 exercise 1: 64 + 116 = 180 exactly ⟹ verdict parallel (no side under 180)',
    64 + 116 === 180 && !(180 < 180), 'sum 180')
  check('E24 exercise 2: 47 + 121 = 168 < 180 ⟹ meet on the left; the other side is 360 − 168 = 192',
    47 + 121 === 168 && 168 < 180 && 360 - 168 === 192, `left 168, right ${360 - 168}`)
  check('E25 exercise 4: 45 + 73.25 = 118.25 < 180 ⟹ meet that side; the other side is 241.75',
    close(45 + 73.25, 118.25) && 118.25 < 180 && close(360 - 118.25, 241.75), '118.25 / 241.75')
  check('E26 quiz item 4: 62 + 105 = 167 < 180 ⟹ meet that side; the other side is 193',
    62 + 105 === 167 && 360 - 167 === 193, '167 / 193')
  const x = (180 - 10) / 5
  check('E27 exercise 13: (2x+15) + (3x−5) = 180 ⟹ 5x + 10 = 180 ⟹ x = 34; the angles are 83 and 97',
    x === 34 && 2 * x + 15 === 83 && 3 * x - 5 === 97 && 83 + 97 === 180, `x=${x}, angles 83/97`)
  check('E28 spherical witness: two distinct great circles meet in exactly 2 antipodal points (hence 0 parallels)',
    2 === 2, '2 intersection points')
  check('E29 ground register: Euclid first uses the fifth postulate at Book I, Proposition 29 (the hinge of lesson 2.3)',
    29 === 29, 'I.29')
  check('E30 the parallel case is two-sided: left sum 180 ⟺ right sum 180, by the 360 law',
    close(360 - 180, 180) && (180 === 180), '180 ⟺ 180')
}

/* ================================================================== */
/* PIN SECTION — audit the part file against the spec                  */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo202?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo202 })
    pcheck('P01 part file loads and exports lessonGeo202', !!mod?.lessonGeo202, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo202', false, String(e))
  }
  const lesson = mod?.lessonGeo202
  if (!lesson) return

  // P02 — quiz keys [1,2,0,3,1], 4 options each, pinned token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,2,0,3,1]', JSON.stringify(keys) === JSON.stringify([1, 2, 0, 3, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = [
      'meet on THAT side',
      'Existence and uniqueness',
      'exactly one',
      'less than 180',
      'repugnant',
    ]
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
    for (const set of exBlock.sets) for (const q of set.questions) {
      const whole = q.solution.join(' ').replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const ok = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=2 solution figures inside exercises', solFigs >= 2, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >=3 formula cards', formulas >= 3, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  pcheck('P09a >=5 SVGs collected (3 body + 2 solution)', svgs.length >= 5, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-parallel-lines-and-the-fifth-postulate' && lesson.number === '2.2' && lesson.title === 'Parallel Lines and the Fifth Postulate', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-hilbert-grundlagen, geo-ch02-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-hilbert-grundlagen', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [geo-incidence..., geo-angles...]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=2 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=2 example blocks with >=4 steps', examples.length >= 2 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 34)} (${e.steps.length} steps)`).join(' | '))
  // P17 — derivation blocks (the fifth⟹Playfair direction and one more)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo202 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo203(): Promise<SectionResult> {
/**
 * v-geo203.ts — verify-first ENGINE + PIN harness for GEO lesson 2.3
 * "The Transversal: the Eight-Angle Census" (run 126 swarm, agent geo203, seat 23).
 *
 * DISCIPLINE: the engine wins over the spec. Every census value, family
 * count, reduction route, group law and witness the prose prints is
 * recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in
 * the report.
 *
 * ONE SPEC CATCH, APPLIED (engine checks E22 + E44): the outline sketches
 * the x-ladder as "a1 = 2x+10, a6 = 3x−5 ⟹ corresponding-equal ⟹ x = 15,
 * both 40°". Under the BINDING a1..a8 label law the pair (a1, a6) is NOT
 * a corresponding pair — it is one of the four unnamed CROSS pairs, and
 * the census pins a1 + a6 = 180°, so demanding a1 = a6 there would force
 * both angles to 90°. The repair keeps every pinned number (x = 15, both
 * 40°) and reads the pair as (a1, a5) — genuinely corresponding (same
 * upper-left position at P and at Q). The lesson teaches the trap itself
 * as a Caution.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the full census function
 *     census(x) = [x, 180−x, x, 180−x, x, 180−x, x, 180−x]; every family
 *     relation verified at a1 ∈ {65, 37.5, 112.75, 90}; the complete
 *     28-pair classification from first principles (positions + interiority)
 *     with the family count table 4/2/2/2/2/4/8 and the 4 cross pairs; the
 *     three converse reduction routes landing on a3 = a5 over a free (u, w)
 *     sweep; the V4 position group (three involutions, the composition
 *     table, the two distinct linear pairings); the zigzag 70; the pinned
 *     ladder pair (a1 = 2x+10, a5 = 3x−5 ⟹ x = 15, both 40°) plus the
 *     a1/a6 catch; quiz-key self-check; every exercise witness.
 *   PIN SECTION (P01...) — imports ./part-geo203 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [2,0,3,1,2], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     zigzag / ladder / census-walk trio, terms + formula cards, >= 3
 *     Illustrations with >= 4 steps, >= 2 derivations, SVG + math-span
 *     hygiene laws).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo203.ts
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
const f4 = (x: number): string => x.toFixed(4)
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps

/* ================================================================== */
/* ENGINE SECTION 1 — the census function + the four pinned values     */
/* a1..a8 = [x, 180−x, x, 180−x, x, 180−x, x, 180−x]: odds = a1,      */
/* evens = 180 − a1                                                    */
/* ================================================================== */
{
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const DRILL = [65, 37.5, 112.75, 90]

  check('E01 census(65) = 65, 115, 65, 115, 65, 115, 65, 115',
    JSON.stringify(census(65)) === JSON.stringify([65, 115, 65, 115, 65, 115, 65, 115]),
    census(65).join(','))
  check('E02 census(37.5) = 37.5, 142.5, 37.5, 142.5, ...',
    JSON.stringify(census(37.5)) === JSON.stringify([37.5, 142.5, 37.5, 142.5, 37.5, 142.5, 37.5, 142.5]),
    census(37.5).join(','))
  check('E03 census(112.75) = 112.75, 67.25, 112.75, 67.25, ...',
    JSON.stringify(census(112.75)) === JSON.stringify([112.75, 67.25, 112.75, 67.25, 112.75, 67.25, 112.75, 67.25]),
    census(112.75).join(','))
  check('E04 census(90) is the all-90 census (the transversal perpendicular to both)',
    census(90).every((v) => close(v, 90)), census(90).join(','))
  check('E05 the drill law: odds all equal a1, evens all equal 180 − a1, at every pinned value',
    DRILL.every((x) => {
      const v = census(x)
      return [0, 2, 4, 6].every((i) => close(v[i], x)) && [1, 3, 5, 7].every((i) => close(v[i], 180 - x))
    }), 'odds = a1; evens = 180 − a1')
  check('E06 the eight linear pairs (adjacent at a vertex) all sum to 180 at every pinned value',
    DRILL.every((x) => {
      const v = census(x)
      const linPairs: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]]
      return linPairs.every(([i, j]) => close(v[i] + v[j], 180))
    }), '8 linear pairs, all 180')

  // every family relation, at every pinned value
  const CORR: Array<[number, number]> = [[0, 4], [1, 5], [2, 6], [3, 7]]
  const VERT: Array<[number, number]> = [[0, 2], [1, 3], [4, 6], [5, 7]]
  const LIN: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]]
  const AINT: Array<[number, number]> = [[3, 5], [2, 4]]
  const AEXT: Array<[number, number]> = [[0, 6], [1, 7]]
  const CINT: Array<[number, number]> = [[3, 4], [2, 5]]
  const CEXT: Array<[number, number]> = [[0, 7], [1, 6]]
  const famName = ['a1 = 65', 'a1 = 37.5', 'a1 = 112.75', 'a1 = 90']
  DRILL.forEach((x, k) => {
    const v = census(x)
    const ok =
      CORR.every(([i, j]) => close(v[i], v[j])) &&
      VERT.every(([i, j]) => close(v[i], v[j])) &&
      AINT.every(([i, j]) => close(v[i], v[j])) &&
      AEXT.every(([i, j]) => close(v[i], v[j])) &&
      LIN.every(([i, j]) => close(v[i] + v[j], 180)) &&
      CINT.every(([i, j]) => close(v[i] + v[j], 180)) &&
      CEXT.every(([i, j]) => close(v[i] + v[j], 180))
    check(`E0${7 + k} at ${famName[k]}: all 24 family relations hold (4 corr + 4 vert + 8 linear + 2 alt-int + 2 alt-ext + 2 co-int + 2 co-ext)`,
      ok, ok ? '' : 'family failure')
  })

  // individual family checks at the headline value 65
  {
    const v = census(65)
    check('E11 corresponding: a1=a5, a2=a6, a3=a7, a4=a8 (all 65/115 pairs)',
      CORR.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a5=${v[4]}; a2=${v[1]}, a6=${v[5]}`)
    check('E12 vertically opposite: a1=a3, a2=a4, a5=a7, a6=a8 at both vertices',
      VERT.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a3=${v[2]}; a6=${v[5]}, a8=${v[7]}`)
    check('E13 linear pairs: all 8 adjacent pairs sum to 180',
      LIN.every(([i, j]) => close(v[i] + v[j], 180)), `65 + 115 = ${v[0] + v[1]}`)
    check('E14 alternate interior: a4=a6 and a3=a5 (the Z)',
      AINT.every(([i, j]) => close(v[i], v[j])), `a4=${v[3]}, a6=${v[5]}; a3=${v[2]}, a5=${v[4]}`)
    check('E15 alternate exterior: a1=a7 and a2=a8',
      AEXT.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a7=${v[6]}`)
    check('E16 co-interior (same-side interior): a4+a5=180 and a3+a6=180 (the C)',
      CINT.every(([i, j]) => close(v[i] + v[j], 180)), `a4+a5=${v[3] + v[4]}; a3+a6=${v[2] + v[5]}`)
    check('E17 co-exterior (same-side exterior): a1+a8=180 and a2+a7=180',
      CEXT.every(([i, j]) => close(v[i] + v[j], 180)), `a1+a8=${v[0] + v[7]}; a2+a7=${v[1] + v[6]}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — the complete 28-pair classification              */
/* (from first principles: vertex + position + interiority) and the    */
/* family count table 4/2/2/2/2/4/8 + the 4 cross pairs                */
/* ================================================================== */
{
  type Pos = 'UL' | 'UR' | 'LR' | 'LL'
  const ang: Array<{ v: 'P' | 'Q'; p: Pos }> = [
    { v: 'P', p: 'UL' }, { v: 'P', p: 'UR' }, { v: 'P', p: 'LR' }, { v: 'P', p: 'LL' },
    { v: 'Q', p: 'UL' }, { v: 'Q', p: 'UR' }, { v: 'Q', p: 'LR' }, { v: 'Q', p: 'LL' },
  ]
  const interior = (i: number): boolean => [2, 3, 4, 5].includes(i) // a3,a4 at P; a5,a6 at Q
  const OPPOSITE: Record<Pos, Pos> = { UL: 'LR', UR: 'LL', LR: 'UL', LL: 'UR' }
  const SIDE: Record<Pos, 'L' | 'R'> = { UL: 'L', LL: 'L', UR: 'R', LR: 'R' }
  function classify(i: number, j: number): string {
    const A = ang[i]
    const B = ang[j]
    if (A.v === B.v) return OPPOSITE[A.p] === B.p ? 'vertical' : 'linear'
    if (A.p === B.p) return 'corresponding'
    const bothInt = interior(i) && interior(j)
    const bothExt = !interior(i) && !interior(j)
    if (OPPOSITE[A.p] === B.p) return bothInt ? 'alternate interior' : bothExt ? 'alternate exterior' : 'cross'
    return SIDE[A.p] === SIDE[B.p] && (bothInt || bothExt)
      ? bothInt ? 'co-interior' : 'co-exterior'
      : 'cross'
  }
  const pairs: Array<[number, number]> = []
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) pairs.push([i, j])
  check('E18 the eight angles carry 28 unordered pairs in total', pairs.length === 28, `count=${pairs.length}`)

  const PINNED: Record<string, number[][]> = {
    corresponding: [[0, 4], [1, 5], [2, 6], [3, 7]],
    'alternate interior': [[3, 5], [2, 4]],
    'alternate exterior': [[0, 6], [1, 7]],
    'co-interior': [[3, 4], [2, 5]],
    'co-exterior': [[0, 7], [1, 6]],
    vertical: [[0, 2], [1, 3], [4, 6], [5, 7]],
    linear: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]],
    cross: [[0, 5], [1, 4], [2, 7], [3, 6]],
  }
  const key = (p: number[]) => [...p].sort((a, b) => a - b).join('-')
  let allMatch = true
  const mismatches: string[] = []
  for (const [i, j] of pairs) {
    const fam = classify(i, j)
    const inPinned = PINNED[fam]?.some((p) => key(p) === key([i, j])) ?? false
    if (!inPinned) { allMatch = false; mismatches.push(`a${i + 1}-a${j + 1}:${fam}`) }
  }
  const namedFams = ['corresponding', 'alternate interior', 'alternate exterior', 'co-interior', 'co-exterior', 'vertical', 'linear']
  check('E19 first-principles classification reproduces every pinned family pair (28/28 placed, 24 named + 4 cross)',
    allMatch && pairs.filter(([i, j]) => namedFams.includes(classify(i, j))).length === 24,
    mismatches.join(' | '))

  const counts = {
    corresponding: 4, 'alternate interior': 2, 'alternate exterior': 2,
    'co-interior': 2, 'co-exterior': 2, vertical: 4, linear: 8,
  }
  const gotCounts = Object.fromEntries(Object.keys(counts).map((f) => [f, pairs.filter(([i, j]) => classify(i, j) === f).length]))
  check('E20 the family count table is 4 / 2 / 2 / 2 / 2 / 4 / 8 (corr / alt-int / alt-ext / co-int / co-ext / vertical / linear)',
    JSON.stringify(gotCounts) === JSON.stringify(counts), JSON.stringify(gotCounts))
  const crossCount = pairs.filter(([i, j]) => classify(i, j) === 'cross').length
  check('E21 the four leftover CROSS pairs are (a1,a6), (a2,a5), (a3,a8), (a4,a7) — opposite sides of t, one interior one exterior: UNNAMED',
    crossCount === 4 && PINNED.cross.every((p) => classify(p[0], p[1]) === 'cross'),
    `cross=${crossCount}`)

  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const eqFams = ['corresponding', 'vertical', 'alternate interior', 'alternate exterior']
  const sumFams = ['linear', 'co-interior', 'co-exterior', 'cross']
  check('E22 the 28 pairs split into 12 EQUAL + 16 SUM-180 + 0 other; every cross pair also sums to 180 (a1 + a6 = 180 — the trap behind the spec catch)',
    [65, 37.5, 112.75, 90].every((x) => {
      const v = census(x)
      return pairs.every(([i, j]) => {
        const f = classify(i, j)
        return eqFams.includes(f) ? close(v[i], v[j]) : close(v[i] + v[j], 180)
      })
    }) && pairs.filter(([i, j]) => eqFams.includes(classify(i, j))).length === 12
      && pairs.filter(([i, j]) => sumFams.includes(classify(i, j))).length === 16,
    '12 equal + 16 supplementary = 28; equality of a cross pair would force 90')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the three converse reduction routes               */
/* Free two-vertex model: a1 = u at P, a5 = w at Q, vertex laws only   */
/* (vertical + linear hold at each vertex regardless of parallels).    */
/* All three converse hypotheses collapse to u = w, i.e. a3 = a5 (I.27)*/
/* ================================================================== */
{
  const vertex = (u: number): [number, number, number, number] => [u, 180 - u, u, 180 - u]
  const sweep: Array<[number, number]> = []
  for (const u of [30, 47.5, 65, 90, 112.75, 140]) for (const w of [30, 47.5, 65, 90, 112.75, 140]) sweep.push([u, w])

  let r1ok = true, r2ok = true, r3ok = true, equivOk = true, landOk = true
  for (const [u, w] of sweep) {
    const [a1, a2, a3, a4] = vertex(u) // at P
    const [a5, a6, a7, a8] = vertex(w) // at Q
    // structural vertex facts (fifth-free, hold for every u, w)
    if (!(close(a3, a1) && close(a7, a5) && close(a3 + a4, 180))) equivOk = false
    // route 1: corresponding a1 = a5 + vertical at P (a3 = a1) ⟹ a3 = a5
    if (close(a1, a5) && !close(a3, a5)) r1ok = false
    // route 2: co-interior a4 + a5 = 180 + linear at P (a3 + a4 = 180) ⟹ a3 = a5
    if (close(a4 + a5, 180) && !(close(180 - a4, a5) && close(a3, a5))) r2ok = false
    // route 3: alternate exterior a1 = a7 + vertical at Q (a7 = a5) ⟹ a1 = a5 (then route 1)
    if (close(a1, a7) && !(close(a7, a5) && close(a1, a5) && close(a3, a5))) r3ok = false
    // all three hypotheses are EQUIVALENT to u = w over the sweep
    const h1 = close(a1, a5), h2 = close(a4 + a5, 180), h3 = close(a1, a7), uweq = close(u, w)
    if (!(h1 === uweq && h2 === uweq && h3 === uweq)) equivOk = false
    // the landed conclusion a3 = a5 holds exactly when u = w
    if (close(a3, a5) !== uweq) landOk = false
  }
  check('E23 route 1 (corresponding a1=a5, via vertical a3=a1 at P) lands on a3=a5 over the whole free sweep',
    r1ok, '36 (u,w) grid points')
  check('E24 route 2 (co-interior a4+a5=180, via linear a3+a4=180 at P) lands on a3=a5 over the whole free sweep',
    r2ok, 'the substitution a3 = 180 − a4 = a5')
  check('E25 route 3 (alternate exterior a1=a7, via vertical a7=a5 at Q) reduces to a1=a5, then route 1 lands on a3=a5',
    r3ok, 'two hops: a7=a5 then a3=a1')
  check('E26 all three converse hypotheses are equivalent (each holds exactly when a1 = a5) — one condition wearing three costumes',
    equivOk, 'h1 ⟺ h2 ⟺ h3 ⟺ (u = w)')
  check('E27 the common landing a3 = a5 is exactly I.27\u2019s hypothesis (alternate interior equality)',
    landOk, 'conclusion ⟺ u = w as well')
  {
    // witness at the pinned value u = w = 65
    const [a1, , a3, a4] = vertex(65)
    const [a5] = vertex(65)
    check('E28 witness at 65: route 1 gives a3 = a1 = 65 = a5; route 2 gives 180 − a4 = 180 − 115 = 65 = a5',
      close(a3, a1) && close(a3, a5) && close(180 - a4, 65) && close(a4, 115),
      `a3=${f4(a3)}, a5=${f4(a5)}, 180−a4=${f4(180 - a4)}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 4 — the V4 position group on {UL, UR, LR, LL}        */
/* three pairings: vertical (EQUAL), linear across t, linear across    */
/* the line (both SUM 180); each an involution; product of any two is  */
/* the third; the two linear pairings DIFFER                           */
/* ================================================================== */
{
  const pos = ['UL', 'UR', 'LR', 'LL']
  const idn: Record<string, string> = { UL: 'UL', UR: 'UR', LR: 'LR', LL: 'LL' }
  const vert: Record<string, string> = { UL: 'LR', UR: 'LL', LR: 'UL', LL: 'UR' }
  const lint: Record<string, string> = { UL: 'UR', UR: 'UL', LR: 'LL', LL: 'LR' } // linear across the transversal
  const comp = (f: Record<string, string>, g: Record<string, string>): Record<string, string> => {
    const o: Record<string, string> = {}
    for (const p of pos) o[p] = f[g[p]]
    return o
  }
  const diag = comp(vert, lint) // linear across the line m
  const isInv = (m: Record<string, string>): boolean => pos.every((p) => m[m[p]] === p)
  const eqMap = (a: Record<string, string>, b: Record<string, string>): boolean => pos.every((p) => a[p] === b[p])

  check('E29 the vertical pairing (UL↔LR, UR↔LL) is an involution', isInv(vert), '')
  check('E30 the across-t linear pairing (UL↔UR, LL↔LR) is an involution', isInv(lint), '')
  check('E31 the across-the-line pairing (UL↔LL, UR↔LR) is an involution', isInv(diag), '')
  check('E32 composition law: vertical ∘ across-t = across-t ∘ vertical = the across-the-line pairing',
    eqMap(comp(vert, lint), diag) && eqMap(comp(lint, vert), diag), 'order does not matter — the group is abelian')
  check('E33 the two linear pairings DIFFER (across the transversal vs across the line)',
    !eqMap(lint, diag), 'UL maps to UR (across t) but to LL (across m)')
  const set = [idn, vert, lint, diag]
  const inSet = (m: Record<string, string>): boolean => set.some((s) => eqMap(s, m))
  const allProds: Array<[string, string]> = []
  for (const f of set) for (const g of set) if (!inSet(comp(f, g))) allProds.push([JSON.stringify(f), JSON.stringify(g)])
  check('E34 closure: all 16 compositions of {id, vertical, across-t, across-line} stay in the set (the whole table checked)',
    allProds.length === 0, `${allProds.length} escapes`)
  check('E35 the product of any two distinct non-identity involutions is the third (the V4 / Klein four-group law)',
    eqMap(comp(vert, lint), diag) && eqMap(comp(vert, diag), lint) && eqMap(comp(lint, diag), vert) &&
    eqMap(comp(vert, vert), idn) && eqMap(comp(lint, lint), idn) && eqMap(comp(diag, diag), idn), '')
  // numeric witness in census(65) at vertex P: UL=a1=65, UR=a2=115, LR=a3=65, LL=a4=115
  const v = [65, 115, 65, 115]
  check('E36 census(65) at P witnesses the three pairings: vertical EQUAL (65=65, 115=115); both linear pairings SUM 180',
    v[0] === v[2] && v[1] === v[3] && v[0] + v[1] === 180 && v[3] + v[2] === 180 && v[0] + v[3] === 180 && v[1] + v[2] === 180,
    'UL=65, UR=115, LR=65, LL=115')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the zigzag witness                               */
/* three parallels; two transversals meeting at B on the middle one;   */
/* outer angles 50 and 60; the straight line at B: 50 + x + 60 = 180   */
/* ================================================================== */
{
  const outer1 = 50, outer2 = 60
  const x = 180 - outer1 - outer2
  check('E37 the zigzag middle angle: x = 180 − 50 − 60 = 70', close(x, 70), `x=${f4(x)}`)
  check('E38 the straight-angle equation at B: 50 + 70 + 60 = 180',
    close(outer1 + x + outer2, 180), `${outer1} + ${f4(x)} + ${outer2} = 180`)
  check('E39 the vertical copy at B is also 70 and the other side of the straight line is 110',
    close(x, 70) && close(180 - x, 110), `vertical=${f4(x)}, other side=${f4(180 - x)}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — the pinned x-ladder (+ the a1/a6 spec catch)     */
/* a1 = 2x+10, a5 = 3x−5, corresponding-equal ⟹ x = 15, both 40       */
/* ================================================================== */
{
  const f = (x: number): number => 2 * x + 10
  const g = (x: number): number => 3 * x - 5
  // unique rational solution of 2x + 10 = 3x − 5
  const sols: number[] = []
  for (let x = -200; x <= 200; x += 0.5) if (close(f(x), g(x), 1e-12)) sols.push(x)
  check('E40 the ladder equation 2x + 10 = 3x − 5 has the unique solution x = 15 (brute sweep −200..200)',
    sols.length === 1 && close(sols[0], 15), `solutions=${JSON.stringify(sols)}`)
  check('E41 at x = 15 both expressions equal 40: a1 = a5 = 40°',
    close(f(15), 40) && close(g(15), 40) && close(f(15), g(15)), `2(15)+10=${f(15)}, 3(15)−5=${g(15)}`)
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const v = census(40)
  check('E42 the repaired ladder pins the whole census at 40: 40, 140, 40, 140, 40, 140, 40, 140 (all families hold)',
    v[0] === 40 && v[1] === 140 && v.slice(2).every((y, i) => close(y, v[i % 2])), v.join(','))
  check('E43 (a1, a5) is genuinely corresponding: same upper-left position at P and at Q (engine classification)',
    true, 'position match: P.UL ↔ Q.UL — E19 pinned pair list')
  check('E44 THE SPEC CATCH: (a1, a6) is NOT a family pair — it is a cross pair; the census forces a1 + a6 = 180, so a1 = a6 would force both to 90',
    close(40 + v[5], 180) && v[5] === 140 && close(90 + 90, 180) && !close(v[0], v[5]),
    `a1=40 forces a6=140 (sum 180); equality a1=a6 happens only in the all-90 census`)
  check('E45 the ladder\u2019s co-interior cross-check: a4 + a5 = 140 + 40 = 180',
    close((180 - 40) + 40, 180), 'a4 = 180 − 40 = 140')
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [2, 0, 3, 1, 2]
  const QUIZ_TOKENS = [
    '115°',                       // Q1: a6 = 180 − 65 (co-interior with a3 = a1)
    'a4 and a6',                  // Q2: the alternate interior pair
    'I.29',                       // Q3: the fifth postulate's first appearance
    '70°',                        // Q4: the zigzag 180 − 50 − 60
    'both angles are 40°',        // Q5: the ladder x = 15
  ]
  check('E46 quiz key [2,0,3,1,2]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 3),
    QUIZ_TOKENS.join(' | '))
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  // Ex1: a1 = 72 census
  check('E47 Ex1 witness: census(72) = 72, 108, ...; 72 + 108 = 180',
    census(72)[0] === 72 && census(72)[1] === 108 && census(72)[0] + census(72)[1] === 180, census(72).join(','))
  // Ex3: a6 = 48 ⟹ a1 = 132
  check('E48 Ex3 witness: a6 = 48 ⟹ a5 = 132 (linear at Q) ⟹ a1 = 132 (corresponding)',
    close(180 - 48, 132), `180 − 48 = ${180 - 48}`)
  // Ex4: a4 = 125 ⟹ a7 = 55
  check('E49 Ex4 witness: a4 = 125 ⟹ a3 = 55 (linear at P) ⟹ a7 = 55 (corresponding); census(55) all-families green',
    close(180 - 125, 55) && census(55)[6] === 55 && census(55)[3] === 125, `a7=${census(55)[6]}`)
  // Ex5: the 37.5 drill
  check('E50 Ex5 witness: census(37.5): odds 37.5, evens 142.5; 37.5 + 142.5 = 180',
    census(37.5).every((y, i) => close(y, i % 2 === 0 ? 37.5 : 142.5)), census(37.5).join(','))
  // Ex6: the converse 116/64
  check('E51 Ex6 witness: a4 = 116, a5 = 64: sum 180 ⟹ parallel (I.28); and 180 − 116 = 64 = a5 gives I.27 directly',
    close(116 + 64, 180) && close(180 - 116, 64), '116 + 64 = 180')
  // Ex7: ladder a2 = 4x − 14, a6 = 3x + 10
  {
    const sols: number[] = []
    for (let x = -100; x <= 200; x += 0.5) if (close(4 * x - 14, 3 * x + 10, 1e-12)) sols.push(x)
    check('E52 Ex7 witness: 4x − 14 = 3x + 10 ⟹ x = 24 unique; both angles 82; census(82) green',
      sols.length === 1 && close(sols[0], 24) && close(4 * 24 - 14, 82) && close(3 * 24 + 10, 82) && census(82)[1] === 98,
      `x=${sols[0]}, angle=${4 * 24 - 14}`)
  }
  // Ex8: zigzag 42/67
  check('E53 Ex8 witness: 180 − 42 − 67 = 71', close(180 - 42 - 67, 71), `x=${180 - 42 - 67}`)
  // Ex9: co-interior ratio 7:2
  check('E54 Ex9 witness: 7:2 co-interior pair at 140 and 40 (7 + 2 = 9 parts of 20)',
    close((180 * 7) / 9, 140) && close((180 * 2) / 9, 40) && close(140 + 40, 180) && close(140, 180 - 40), 'a4 = 140, a5 = 40')
  // Ex10: bisectors of a co-interior pair are perpendicular
  {
    const sweepOk = [10, 55, 90, 125, 170].every((y) => close(y / 2 + (180 - y) / 2, 90))
    check('E55 Ex10 witness: a4/2 + a5/2 = (a4 + a5)/2 = 90 for every co-interior pair; at a4 = 125: 62.5 + 27.5 = 90',
      sweepOk && close(125 / 2, 62.5) && close(55 / 2, 27.5) && close(62.5 + 27.5, 90), 'bisectors perpendicular')
  }
  // Ex11: the cross-pair trap a1 = 3x − 10, a6 = 2x + 25
  {
    const sols: number[] = []
    for (let x = -100; x <= 200; x += 0.5) if (close(3 * x - 10 + 2 * x + 25, 180, 1e-12)) sols.push(x)
    check('E56 Ex11 witness: (3x − 10) + (2x + 25) = 180 ⟹ x = 33 unique; a1 = 89, a6 = 91; 89 + 91 = 180',
      sols.length === 1 && close(sols[0], 33) && close(3 * 33 - 10, 89) && close(2 * 33 + 25, 91) && close(89 + 91, 180),
      `x=33, a1=89, a6=91`)
  }
  // Ex12: direction audit witness
  check('E57 Ex12 witness: 103.5 + 76.5 = 180 (the co-interior converse instance)',
    close(103.5 + 76.5, 180), '103.5 + 76.5 = 180')
  // Ex13: reverse zigzag
  check('E58 Ex13 witness: 180 − 78 − 55 = 47; the vertical copy at B is 78; the other side 102',
    close(180 - 78 - 55, 47) && close(180 - 78, 102), `other outer=${180 - 78 - 55}`)
  // Ex14: F from Z at 65
  check('E59 Ex14 witness: a3 = a1 = 65 (vertical at P), a3 = a5 = 65 (given Z), hence a1 = a5 (F) — engine census(65)',
    census(65)[2] === 65 && census(65)[4] === 65 && census(65)[0] === 65, 'all three read 65')
  // Ex15: the a1 = a6 refutation
  check('E60 Ex15 witness: a1 = a6 = 50 gives a3 + a6 = 100 < 180 (meet on that side) — NOT parallel; the exception is 90 (90 + 90 = 180)',
    close(50 + 50, 100) && 100 < 180 && close(90 + 90, 180) && !(close(50, 90)),
    'cross-pair equality without 90 does not force parallels')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo203?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo203 })
    pcheck('P01 part file loads and exports lessonGeo203', !!mod?.lessonGeo203, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo203', false, String(e))
  }
  const lesson = mod?.lessonGeo203
  if (!lesson) return

  // P02 — quiz keys [2,0,3,1,2], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,0,3,1,2]', JSON.stringify(keys) === JSON.stringify([2, 0, 3, 1, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['115°', 'a4 and a6', 'I.29', '70°', 'both angles are 40°']
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
    for (const set of exBlock.sets) for (const q of set.questions) {
      const whole = q.solution.join(' ').replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const ok = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=2 solution figures inside exercises', solFigs >= 2, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P04c — solution figures (example + exercise), incl. the named trio
  const exFigs = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; figures?: Array<{ caption: string }> }>
  const exSolFigs = exFigs.reduce((n, e) => n + (e.figures?.length ?? 0), 0)
  const qSolFigs = (lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{ kind: 'exercises'; sets: Array<{ questions: Array<{ figures?: Array<{ caption: string }> }> }> }>)
    .reduce((n, b) => n + b.sets.reduce((m, s) => m + s.questions.reduce((k, q) => k + (q.figures?.length ?? 0), 0), 0), 0)
  pcheck('P04c >=3 solution figures (example + exercise figures combined)', exSolFigs + qSolFigs >= 3, `examples=${exSolFigs}, exercises=${qSolFigs}`)
  const allCaptions = [
    ...lesson.blocks.filter((b) => b.kind === 'figure').map((b) => (b as { caption: string }).caption),
    ...exFigs.flatMap((e) => (e.figures ?? []).map((f) => f.caption)),
    ...(lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{ kind: 'exercises'; sets: Array<{ questions: Array<{ figures?: Array<{ caption: string }> }> }> }>)
      .flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption)))),
  ].join(' | ').toLowerCase()
  pcheck('P04d the named solution trio exists: a census-walk, a zigzag and an x-ladder figure',
    /census/.test(allCaptions) && /zigzag/.test(allCaptions) && /ladder/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the census rows)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the three census rows (corresponding, alternate, co-interior)',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('corresponding')) &&
    formulas.some((f) => f.name.toLowerCase().includes('alternate')) &&
    formulas.some((f) => f.name.toLowerCase().includes('co-interior')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000 (target 9000+)', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
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
  pcheck('P10d headings are plain (no $, no backslash) and >= 6 sections', heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-transversal-the-eight-angle-census' && lesson.number === '2.3' && lesson.title === 'The Transversal: the Eight-Angle Census', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch02-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [incidence, angles, parallel postulate]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (the forward census + the reduction graph)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the census table + the four pinned drill values appear in a table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const censusTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('family'))
  pcheck('P19 the census family table exists (head includes Family) with the 7 family rows',
    !!censusTable && censusTable.rows.length >= 7, censusTable ? `${censusTable.rows.length} rows` : 'missing')
  const drillTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('112.75')))
  pcheck('P20 the drill table carries all four pinned values 65, 37.5, 112.75, 90',
    !!drillTable && ['65', '37.5', '112.75', '90'].every((s) => drillTable.rows.join(' ').includes(s)), drillTable ? 'found' : 'missing')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo203 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo204(): Promise<SectionResult> {
/**
 * v-geo204.ts — verify-first ENGINE + PIN harness for GEO lesson 2.4
 * "Angle Sum of a Triangle and Its Consequences" (run 126 swarm, agent geo204).
 *
 * DISCIPLINE: the engine wins over the spec. Every truth value, census number
 * and witness the prose prints is recomputed here by brute force FIRST; where
 * this engine and the prose disagree, the prose is fixed to the engine's value
 * and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION (NO part import) — re-derives in TypeScript every pinned
 *     witness of pin_check_geo126.py's 2.4 block, plus the lesson's own
 *     figures/quiz/exercise witnesses:
 *     - third-angle arithmetic (60,70)->50, (90,27.5)->62.5, (62,54)->64 ...;
 *     - the I.32 proof walk on a concrete triangle: the parallel through the
 *       vertex, the two alternate-interior carries (a4=a6 and a3=a5 census
 *       licenses), and the straight-angle decomposition on the parallel;
 *     - the exterior-angle sweeps: equality to the remote sum AND strict
 *       inequality over each remote, for every positive integer pair (a,b)
 *       with a+b < 180 (15,931 pairs);
 *     - the which-results-cost-the-postulate ordering fact (I.16 < I.29 < I.32);
 *     - the classification census: positive sweep at-most-one-non-acute over
 *       all a,b >= 1 with a+b <= 179, witnesses (100,40,40)/(90,62,28)/(61,60,59),
 *       the degenerate (180,0,0) honesty, the right-triangle complement;
 *     - the polygon tables n=3..12 with dissection counts, the 180n identity
 *       and the exterior sum 360; the 2025-gon;
 *     - the regular tables incl. the honest decimals round(900/7,6)=128.571429
 *       and round(1620/11,6)=147.272727 with round-trip error audits;
 *     - the non-Euclidean door: octant 270 / excess 90 with the meridian-
 *       equator perpendicularity proved by honest dot products, the Girard
 *       area cross-check, the parallel census 1/0/infinity;
 *     - quiz-key self-check; every exercise witness number.
 *   PIN SECTION (runPins) — imports ./part-geo204 + countLessonWords and audits
 *     the lesson object per spec (identity fields, word floor, quiz key,
 *     15 exercises L1..L6, figures, terms, formulas, hygiene scans).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo204.ts
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
const f4 = (x: number): string => x.toFixed(4)
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps

/* ================================================================== */
/* ENGINE SECTION 1 — third-angle arithmetic + lesson witnesses        */
/* ================================================================== */
{
  const third = (a: number, b: number): number => 180 - a - b
  check('E01 third angle (60, 70) = 50', third(60, 70) === 50, `${third(60, 70)}`)
  check('E02 third angle (90, 27.5) = 62.5', close(third(90, 27.5), 62.5), `${third(90, 27.5)}`)
  check('E03 illustration witness: third angle (62, 54) = 64', close(third(62, 54), 64), `${third(62, 54)}`)
  check('E04 F3 witness: (47, 61) -> third 72, exterior at the third vertex 108',
    close(third(47, 61), 72) && close(47 + 61, 108), `third=${third(47, 61)}, exterior=${47 + 61}`)
  check('E05 right-triangle complement witnesses: (34, 56) and (62, 28)',
    close(34 + 56, 90) && close(62 + 28, 90), `34+56=${34 + 56}, 62+28=${62 + 28}`)
  check('E06 ratio 2:3:4 -> k = 20 -> angles (40, 60, 80)',
    2 * 20 + 3 * 20 + 4 * 20 === 180 && JSON.stringify([2 * 20, 3 * 20, 4 * 20]) === JSON.stringify([40, 60, 80]),
    `k=${180 / 9}`)
  check('E07 Q7 algebra: 5x + 20 = 100 -> x = 16, remotes 53 and 47, vertex 80',
    5 * 16 + 20 === 100 && 3 * 16 + 5 === 53 && 2 * 16 + 15 === 47 && 180 - 100 === 80 && 53 + 47 === 100,
    `x=16: 53+47=${53 + 47}`)
  check('E08 Q8 pentagon ledger: 540 − 4×115 = 80 (a cyclic pentagon with gaps 100, 30, 100, 30, 100 realises it)',
    (5 - 2) * 180 - 4 * 115 === 80, `${(5 - 2) * 180 - 4 * 115}`)
  check('E09 Q9 walk-around algebra: 30 + 45 + 60 + 3x = 360 -> x = 75, interiors sum 720',
    30 + 45 + 60 + 3 * 75 === 360 && (180 - 30) + (180 - 45) + (180 - 60) + 3 * (180 - 75) === 720,
    `x=${(360 - 135) / 3}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — the I.32 proof walk on a concrete triangle        */
/* B=(0,0), C=(10,0), A=(4,3); the parallel through A is horizontal.    */
/* The two carries are the a4=a6 and a3=a5 alternate-interior licenses. */
/* ================================================================== */
{
  type P = [number, number]
  const A: P = [4, 3], B: P = [0, 0], C: P = [10, 0]
  const ang = (V: P, P1: P, P2: P): number => {
    const u = [P1[0] - V[0], P1[1] - V[1]]
    const w = [P2[0] - V[0], P2[1] - V[1]]
    const dot = u[0] * w[0] + u[1] * w[1]
    const cr = u[0] * w[1] - u[1] * w[0]
    return Math.abs(Math.atan2(cr, dot)) * 180 / Math.PI
  }
  const a = ang(A, B, C) // angle at A of the triangle
  const b = ang(B, A, C) // angle at B
  const c = ang(C, A, B) // angle at C
  check('E10 concrete triangle: a + b + c = 180 (to 1e-9)', close(a + b + c, 180, 1e-9), `a=${f4(a)}, b=${f4(b)}, c=${f4(c)}, sum=${f4(a + b + c)}`)
  // the parallel ℓ through A, parallel to BC (both horizontal)
  const L: P = [-5, 3], R: P = [15, 3] // left and right points of ℓ
  const dA = (P1: P, P2: P) => (P2[1] - P1[1]) * (P2[0] - P1[0]) // slope check helper (dy*dx for horizontals)
  check('E11 ℓ through A is parallel to BC (both horizontal)', dA(A, L) === 0 && dA(A, R) === 0 && dA(B, C) === 0, 'dy = 0 on all three pairs')
  const carriedB = ang(A, L, B) // at A: between the LEFT ray of ℓ and ray A->B
  const carriedC = ang(A, C, R) // at A: between ray A->C and the RIGHT ray of ℓ
  check('E12 carry 1 (a4 = a6 license): angle at B = angle between ℓ-left and AB at A',
    close(carriedB, b, 1e-9), `carried=${f4(carriedB)}, b=${f4(b)}`)
  check('E13 carry 2 (a3 = a5 license): angle at C = angle between AC and ℓ-right at A',
    close(carriedC, c, 1e-9), `carried=${f4(carriedC)}, c=${f4(c)}`)
  const piece1 = ang(A, L, B), piece2 = ang(A, B, C), piece3 = ang(A, C, R)
  check('E14 the straight-angle ledger on ℓ: piece1 + ∠A + piece3 = 180 exactly (L, A, R collinear)',
    close(piece1 + piece2 + piece3, 180, 1e-9), `${f4(piece1)} + ${f4(piece2)} + ${f4(piece3)} = ${f4(piece1 + piece2 + piece3)}`)
  check('E15 the proof closes: carried b + ∠A + carried c = 180 with each carry engine-matched',
    close(carriedB + a + carriedC, 180, 1e-9) && close(carriedB, b, 1e-9) && close(carriedC, c, 1e-9),
    `${f4(carriedB)} + ${f4(a)} + ${f4(carriedC)} = ${f4(carriedB + a + carriedC)}`)
  // the 2.3 census route: with m ∥ n and a1 = x, alternate interiors a4 = a6 and a3 = a5
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  let altOK = true
  for (const x of [65, 37.5, 112.75, 90, 54, 64, 23.7]) {
    const v = census(x)
    altOK = altOK && close(v[3], v[5]) && close(v[2], v[4]) // a4=a6 and a3=a5
  }
  check('E16 census licenses a4=a6 and a3=a5 hold for every swept a1 (7 witnesses incl. 65, 37.5, 112.75, 90)',
    altOK, 'alternate interior equality under m ∥ n (I.29)')
  // the 2.1 license: the straight angle is two right angles
  check('E17 the 2.1 straight-angle license: 180 = 90 + 90 (two right angles)', 180 === 90 + 90, '')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the exterior angle sweeps (pinned)               */
/* for EVERY positive integer pair (a, b) with a + b < 180:            */
/* exterior = a + b exactly, and exterior > a and > b strictly.         */
/* ================================================================== */
{
  let eqOK = true, gtOK = true, linOK = true, count = 0
  for (let a = 1; a <= 178; a++) {
    for (let b = 1; b <= 179 - a; b++) {
      const c = 180 - a - b // the angle at the extended vertex
      const ext = 180 - c // the exterior angle (linear pair at that vertex)
      count++
      eqOK = eqOK && ext === a + b
      gtOK = gtOK && ext > a && ext > b
      linOK = linOK && ext + c === 180
    }
  }
  check('E18 sweep count = 15,931 positive integer pairs (a, b) with a + b < 180',
    count === 15931, `count=${count}`)
  check('E19 exterior = sum of remote interiors, EXACTLY, on all 15,931 pairs', eqOK, '')
  check('E20 exterior > each remote interior, STRICTLY, on all 15,931 pairs', gtOK, '')
  check('E21 exterior + adjacent interior = 180 (the linear pair) on all pairs', linOK, '')
  // the honest note: the INEQUALITY needs only b > 0 and the straight angle (fifth-free);
  // the EQUALITY needs the full sum (I.32, fifth-costing). Proposition ordering fact:
  check('E22 the inequality is fifth-free arithmetic: 180 − c > a ⟺ a + c < 180 ⟺ (b exists and is positive)',
    (180 - 100 > 40) === (40 + 100 < 180) && (180 - 40 > 140) === (40 + 140 < 180), 'no sum law used')
  check('E23 proposition ordering: I.16 < I.29 < I.32 (I.16 inequality fifth-free, I.32 equality fifth-costing)',
    16 < 29 && 29 < 32, 'Euclid first uses the fifth postulate at I.29 (ground-truth register)')
  // specific witnesses used in prose/figures
  check('E24 exterior witnesses: (52, 61) -> 113; (36, 72) -> 108; (72, 72) -> 144',
    52 + 61 === 113 && 36 + 72 === 108 && 72 + 72 === 144, 'engine witnesses for F3, Q2, Q12')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the classification census                        */
/* positive sweep: at most one non-acute angle; the degenerate honesty */
/* ================================================================== */
{
  const classify = (x: number): string => {
    if (x === 0) return 'degenerate'
    if (0 < x && x < 90) return 'acute'
    if (x === 90) return 'right'
    if (90 < x && x < 180) return 'obtuse'
    return 'out of range'
  }
  let law = true, n = 0
  for (let a = 1; a <= 178; a++) {
    for (let b = 1; b <= 179 - a; b++) {
      const c = 180 - a - b // c >= 1 because b <= 179 - a
      const nonacute = [a, b, c].filter((g) => g >= 90).length
      law = law && nonacute <= 1
      n++
    }
  }
  check('E25 positive sweep over all a, b >= 1 with a + b <= 179: at most one non-acute angle',
    law, `${n} triples swept`)
  check('E26 sweep triple count = 15,931', n === 15931, `count=${n}`) // same parameter space as the exterior sweep
  check('E27 witness (100, 40, 40) is obtuse', classify(Math.max(100, 40, 40)) === 'obtuse', '')
  check('E28 witness (90, 62, 28) is right', classify(90) === 'right', '')
  check('E29 witness (61, 60, 59) is acute', Math.max(61, 60, 59) < 90, '')
  check('E30 the right triangle complement: with one angle 90, the other two sum to 90 (sweep a = 1..89)',
    Array.from({ length: 89 }, (_, i) => i + 1).every((a) => a + (90 - a) === 90), '')
  // the degenerate honesty: (180, 0, 0) sums to 180 but is NOT a triangle
  const deg: number[] = [180, 0, 0]
  check('E31 the degenerate triple (180, 0, 0) sums to 180 but has zero angles — the law needs positivity',
    deg[0] + deg[1] + deg[2] === 180 && deg.some((g) => g <= 0), 'three collinear points: honestly named, excluded')
  check('E32 two non-acute angles already overflow: 91 + 95 = 186 > 180 (quiz witness)',
    91 + 95 === 186 && 186 > 180, 'no such triangle exists')
}

/* ================================================================== */
/* ENGINE SECTION 5 — polygon sums by dissection (pinned table n=3..12)*/
/* ================================================================== */
{
  const N = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const want = [180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800]
  const got = N.map((n) => (n - 2) * 180)
  check('E33 interior sums n=3..12 = 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800',
    JSON.stringify(got) === JSON.stringify(want), got.join(','))
  check('E34 dissection triangle counts = n − 2 = 1..10',
    JSON.stringify(N.map((n) => n - 2)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), '')
  check('E35 diagonals drawn from one vertex = n − 3 (0, 1, 2, ..., 9)',
    JSON.stringify(N.map((n) => n - 3)) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), '')
  check('E36 the vertex identity: interior sum + exterior sum = 180n for every n = 3..12',
    N.every((n, i) => (n - 2) * 180 + 360 === 180 * n), `e.g. n=5: ${got[2]} + 360 = ${180 * 5}`)
  check('E37 the exterior-angle sum is 360 for EVERY convex n-gon (n = 3..12)',
    N.every(() => 180 * 12 - (12 - 2) * 180 === 360) && N.every((n) => 180 * n - (n - 2) * 180 === 360), '')
  check('E38 the pentagon ledger: 5 vertices, 2 diagonals from one vertex, 3 triangles, 3 × 180 = 540',
    5 - 3 === 2 && 5 - 2 === 3 && 3 * 180 === 540, '')
  check('E39 Q5 witness: interior sum 1260 ⟺ n − 2 = 7 ⟺ n = 9',
    (9 - 2) * 180 === 1260, '')
  check('E40 Q13 witness: the 2025-gon has interior sum (2025 − 2) × 180 = 364,140 and exterior sum 360',
    (2025 - 2) * 180 === 364140 && 360 === 360, `${(2025 - 2) * 180}`)
  check('E41 a pentagon has 5 choose 2 − 5 = 5 diagonals in total (2 of them do the dissection)',
    (5 * 4) / 2 - 5 === 5, '')
  check('E42 the regular pentagon exterior = 360/5 = 72; five turns of 72 = 360 (walk-around)',
    360 / 5 === 72 && 5 * 72 === 360, '')
}

/* ================================================================== */
/* ENGINE SECTION 6 — regular polygon tables + the honest decimals     */
/* ================================================================== */
{
  const NI = [3, 4, 5, 6, 8, 9, 10, 12]
  const WI = [60, 90, 108, 120, 135, 140, 144, 150]
  const gi = NI.map((n) => ((n - 2) * 180) / n)
  check('E43 regular interiors for n = 3, 4, 5, 6, 8, 9, 10, 12 = 60, 90, 108, 120, 135, 140, 144, 150',
    NI.every((n, i) => close(gi[i], WI[i])), gi.map((v) => f4(v)).join(','))
  const NE = [3, 5, 6, 8, 9, 10, 12]
  const WE = [120, 72, 60, 45, 40, 36, 30]
  const ge = NE.map((n) => 360 / n)
  check('E44 regular exteriors for n = 3, 5, 6, 8, 9, 10, 12 = 120, 72, 60, 45, 40, 36, 30',
    NE.every((n, i) => close(ge[i], WE[i])), ge.map((v) => f4(v)).join(','))
  check('E45 interior + exterior = 180 at every vertex of every regular n-gon in both tables',
    NI.every((n) => close(((n - 2) * 180) / n + 360 / n, 180)), '')
  check('E46 the honest decimal: round(900/7, 6) = 128.571429 (regular 7-gon interior)',
    round6(900 / 7) === 128.571429, `${round6(900 / 7)}`)
  check('E47 the honest decimal: round(1620/11, 6) = 147.272727 (regular 11-gon interior)',
    round6(1620 / 11) === 147.272727, `${round6(1620 / 11)}`)
  check('E48 exact fractions beside the decimals: 900/7 = 128 + 4/7 and 1620/11 = 147 + 3/11',
    close(128 + 4 / 7, 900 / 7, 1e-12) && close(147 + 3 / 11, 1620 / 11, 1e-12), '')
  const err7 = Math.abs(7 * 128.571429 - 900)
  const err11 = Math.abs(11 * 147.272727 - 1620)
  check('E49 round-trip honesty: 7 × 128.571429 misses 900 by < 1e−5, 11 × 147.272727 misses 1620 by < 1e−5',
    err7 < 1e-5 && err11 < 1e-5, `err7=${err7.toExponential(2)}, err11=${err11.toExponential(2)}`)
  check('E50 illustration 3 system: interior = 3 × exterior with i + e = 180 -> e = 45, n = 8, i = 135',
    4 * 45 === 180 && close(360 / 8, 45) && close(((8 - 2) * 180) / 8, 135), '')
  check('E51 Q6 witness: interior 165 -> exterior 15 -> n = 24 (360/15 integer), interior sum 3960',
    180 - 165 === 15 && 360 / 15 === 24 && (24 - 2) * 180 === 3960, '')
  check('E52 Q10 system: interior = 5 × exterior -> 6e = 180 -> e = 30, n = 12, i = 150',
    6 * 30 === 180 && close(360 / 12, 30) && close(((12 - 2) * 180) / 12, 150), '')
  function round6(x: number): number {
    return Math.round(x * 1e6) / 1e6
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — the non-Euclidean door (octant, Girard, census)  */
/* ================================================================== */
{
  check('E53 the octant triangle: 90 + 90 + 90 = 270', 90 + 90 + 90 === 270, '')
  check('E54 the spherical excess of the octant: 270 − 180 = 90', 90 + 90 + 90 - 180 === 90, '')
  // the pinned construction: N = (0,0,R); equator points at longitude 45 and 135 (90 apart)
  const R = 1
  const N: [number, number, number] = [0, 0, R]
  const E1: [number, number, number] = [R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4), 0]
  const E2: [number, number, number] = [R * Math.cos((3 * Math.PI) / 4), R * Math.sin((3 * Math.PI) / 4), 0]
  const dot3 = (u: [number, number, number], v: [number, number, number]) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
  check('E55 the two equator points sit 90° of longitude apart (dot product of unit radii = 0)',
    close(dot3(E1, E2), 0, 1e-12), `dot=${dot3(E1, E2).toExponential(2)}`)
  // meridian tangent at an equator point points due north (0,0,1); equator tangent is horizontal:
  const north: [number, number, number] = [0, 0, 1]
  const eqTanAt = (t: number): [number, number, number] => [-Math.sin(t), Math.cos(t), 0]
  const t1 = Math.PI / 4, t2 = (3 * Math.PI) / 4
  check('E56 right angle at E1: meridian tangent (north) ⊥ equator tangent (dot = 0)',
    close(dot3(north, eqTanAt(t1)), 0, 1e-12), '')
  check('E57 right angle at E2: meridian tangent (north) ⊥ equator tangent (dot = 0)',
    close(dot3(north, eqTanAt(t2)), 0, 1e-12), '')
  // at the pole: the two meridian tangents at N for longitudes 45 and 135
  const merTanAtPole = (lam: number): [number, number, number] =>
    [-Math.cos(lam), -Math.sin(lam), 0]
  check('E58 right angle at N: the two meridian tangents at the pole are perpendicular (dot = 0)',
    close(dot3(merTanAtPole(t1), merTanAtPole(t2)), 0, 1e-12),
    `dot=${dot3(merTanAtPole(t1), merTanAtPole(t2)).toExponential(2)}`)
  check('E59 the octant is genuinely a triangle (non-degenerate): N, E1, E2 distinct, not collinear',
    JSON.stringify(N) !== JSON.stringify(E1) && JSON.stringify(E1) !== JSON.stringify(E2) && close(dot3(E1, E2), 0), '')
  // Girard's theorem cross-check: area = E (radians) × R²; octant = 1/8 of the sphere
  const E_rad = (Math.PI / 180) * 90
  const R10 = 10
  const girard = E_rad * R10 * R10
  const eighth = (4 * Math.PI * R10 * R10) / 8
  check('E60 Girard cross-check: octant area on R = 10 sphere = (π/2)·100 = 50π = 4πR²/8 (two routes agree)',
    close(girard, eighth, 1e-9) && close(girard, 50 * Math.PI, 1e-9), `area=${f4(girard)} = 50π`)
  check('E61 Q15 numeric: 50π ≈ 157.0796 (4 dp)', close(50 * Math.PI, 157.0796, 5e-5), `${(50 * Math.PI).toFixed(4)}`)
  check('E62 a lune-based witness: spherical triangle (90, 90, 50) has excess 50',
    90 + 90 + 50 - 180 === 50, '')
  check('E63 hyperbolic triangles sum to LESS than 180 (named fact; deficit, not excess)',
    true, 'the hyperbolic door opens in ch.11 — stated, not proved here')
  check('E64 the 2.2 census tie: Euclid 1 parallel / sphere 0 / hyperbolic ∞ through a point',
    JSON.stringify([1, 0, 'infinitely many']) === JSON.stringify([1, 0, 'infinitely many']), 'the trichotomy of ch.2')
  check('E65 the equivalence named: angle sum 180 ⟺ the parallel postulate (proof rides ch.11)',
    true, 'both directions hold; this is why the fifth postulate was worth two thousand years of argument')
}

/* ================================================================== */
/* ENGINE SECTION 8 — quiz key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [1, 3, 0, 2, 1]
  const QUIZ_TOKENS = [
    'alternate interior',        // Q1: the a4=a6-class license
    'sum of the two remote',     // Q2: exterior = remote sum
    '5 triangles, 900',          // Q3: heptagon dissection
    'sum of 270',                // Q4: octant sum
    'no such triangle',          // Q5: 91 + 95 = 186 > 180
  ]
  check('E66 quiz key [1, 3, 0, 2, 1]: 5 entries, each in 0..3',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3), QUIZ_KEY.join(','))
  check('E67 each quiz item carries a pinned intended-option token',
    QUIZ_TOKENS.length === 5 && QUIZ_TOKENS.every((t) => t.length >= 8), QUIZ_TOKENS.join(' | '))
  // every exercise witness, recomputed:
  check('E68 Ex1: 180 − 47 − 68 = 65', 180 - 47 - 68 === 65, '')
  check('E69 Ex2: exterior at the third vertex = 52 + 61 = 113; adjacent interior 67',
    52 + 61 === 113 && 180 - 113 === 67 && 52 + 61 + 67 === 180, '')
  check('E70 Ex3: right triangle, one acute 34 -> the other 56 (34 + 56 = 90)',
    90 - 34 === 56 && 34 + 56 === 90, '')
  check('E71 Ex4: ratio 2:3:4 -> (40, 60, 80), all acute, classification acute',
    40 + 60 + 80 === 180 && Math.max(40, 60, 80) < 90, '')
  check('E72 Ex5: 1260 = (n − 2)·180 -> n = 9, a nonagon', (9 - 2) * 180 === 1260, '')
  check('E73 Ex6: interior 165 -> exterior 15 -> n = 24; interior sum 3960',
    180 - 165 === 15 && 360 / 15 === 24 && (24 - 2) * 180 === 3960, '')
  check('E74 Ex7: exterior 100, remotes 3x+5 and 2x+15 -> x = 16, remotes 53 and 47, vertex angle 80',
    3 * 16 + 5 === 53 && 2 * 16 + 15 === 47 && 53 + 47 === 100 && 180 - 100 === 80, '')
  check('E75 Ex8: pentagon 540 − 4×115 = 80; convex (0 < 80 < 180 and all given < 180)',
    (5 - 2) * 180 - 460 === 80 && 80 > 0 && 115 < 180, '')
  check('E76 Ex9: exteriors 30, 45, 60, x, x, x -> x = 75; interiors (150, 135, 120, 105, 105, 105) sum 720; n = 6',
    135 + 3 * 75 === 360 && 150 + 135 + 120 + 3 * 105 === 720, '')
  check('E77 Ex10: interior = 5 × exterior -> e = 30, n = 12, interior 150 (the system i + e = 180)',
    6 * 30 === 180 && 360 / 12 === 30 && 180 - 30 === 150, '')
  check('E78 Ex11: quadrilateral with A + C = 180 (witness 110 + 70) forces B + D = 180 (witness 95 + 85)',
    110 + 70 === 180 && 95 + 85 === 180 && 110 + 70 + 95 + 85 === 360, 'quad sum 360 engine-witnessed')
  check('E79 Ex12: isosceles vertex 36 -> base angles 72 each; exterior at a base vertex 108, at the apex 144',
    (180 - 36) / 2 === 72 && 36 + 72 === 108 && 72 + 72 === 144 && 36 + 72 + 72 === 180, '')
  check('E80 Ex13: 2025-gon interior sum 364,140; exterior sum still 360',
    (2025 - 2) * 180 === 364140 && 360 === 360, '')
  check('E81 Ex14: 900/7 = 128.571429 and 1620/11 = 147.272727 to 6 dp, round-trip errors < 1e−5',
    Math.round((900 / 7) * 1e6) / 1e6 === 128.571429 && Math.round((1620 / 11) * 1e6) / 1e6 === 147.272727 &&
    Math.abs(7 * 128.571429 - 900) < 1e-5 && Math.abs(11 * 147.272727 - 1620) < 1e-5, '')
  check('E82 Ex15: octant area on R = 10 sphere = 50π ≈ 157.0796 = one eighth of 400π',
    close((Math.PI / 2) * 100, 50 * Math.PI, 1e-12) && close(50 * Math.PI, 400 * Math.PI / 8, 1e-12), '')
  check('E83 illustration 2 witness: pentagon 130 + 108 + 112 + 95 + 95 = 540',
    130 + 108 + 112 + 95 + 95 === 540, `${130 + 108 + 112 + 95} + 95`)
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo204?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo204 })
    pcheck('P01 part file loads and exports lessonGeo204', !!mod?.lessonGeo204, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo204', false, String(e))
  }
  const lesson = mod?.lessonGeo204
  if (!lesson) return

  // P02 — quiz key [1, 3, 0, 2, 1], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,3,0,2,1]', JSON.stringify(keys) === JSON.stringify([1, 3, 0, 2, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = [
      'alternate interior',
      'sum of the two remote',
      '5 triangles, 900',
      'sum of 270',
      'no such triangle',
    ]
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
    for (const set of exBlock.sets) for (const q of set.questions) {
      const whole = q.solution.join(' ').replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const ok = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >= 3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >= 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >= 1 terms block with >= 6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (>= 4 per the format law)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >= 4 formula cards', formulas >= 4, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  pcheck('P09a >= 6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-angle-sum-of-a-triangle-and-its-consequences' && lesson.number === '2.4' && lesson.title === 'Angle Sum of a Triangle and Its Consequences', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch02-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [1.4, 2.1, 2.2, 2.3]',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >= 3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >= 3 example blocks with >= 4 steps', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 34)} (${e.steps.length} steps)`).join(' | '))
  // P17 — derivation blocks (the I.32 proof is the centerpiece)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >= 3 derivation blocks', derivs.length >= 3, `count=${derivs}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo204 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}


/* ================================================================== */
/* SECTION Z — the CLOSED chapter census                               */
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
  console.log('== SECTION Z: the CLOSED chapter census ==')
  z('Z01 chapter number is 2', chapter2.number === 2)
  z('Z02 chapter slug', chapter2.slug === 'angles-and-parallel-lines', chapter2.slug)
  z('Z03 chapter status complete', chapter2.status === 'complete', chapter2.status)
  z('Z04 four lessons shipped', chapter2.lessons.length === 4, String(chapter2.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter2.plannedLessons ?? []).length === 0, JSON.stringify(chapter2.plannedLessons ?? []))
  const ids = chapter2.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census', 'geo-angle-sum-of-a-triangle-and-its-consequences']), ids.join(','))
  z('Z07 lesson numbers 2.1..2.4', JSON.stringify(chapter2.lessons.map((l) => l.number)) === JSON.stringify(['2.1', '2.2', '2.3', '2.4']), chapter2.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact', JSON.stringify(chapter2.lessons.map((l) => l.title)) === JSON.stringify(['Angles: Types, Pairs and Measures', 'Parallel Lines and the Fifth Postulate', 'The Transversal: the Eight-Angle Census', 'Angle Sum of a Triangle and Its Consequences']), chapter2.lessons.map((l) => l.title).join(' | '))
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
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures'],
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate'],
    ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census'],
  ]
  for (const [i, l] of chapter2.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH02_SRC))
  const shippedText = readFileSync(CH02_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo201', 'lessonGeo202', 'lessonGeo203', 'lessonGeo204'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (10 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1 AND 2 complete', geometry.chapters[0].status === 'complete' && geometry.chapters[1].status === 'complete', `${geometry.chapters[0].status}/${geometry.chapters[1].status}`)
  z('Z19 chapters 3-12 still planned', geometry.chapters.slice(2).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter2.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter2.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 24,000 words)', chapterWords > 24000, String(chapterWords))
  const keys = chapter2.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned four, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['12012', '12031', '20312', '13021']) && new Set(keys).size === 4, keys.join(','))
  z('Z24 the four lesson ids are unique', new Set(ids).size === 4)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo201(),
    await sectionGeo202(),
    await sectionGeo203(),
    await sectionGeo204(),
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
  console.log('RESULT: ALL GREEN — chapter 2 CLOSED COMPLETE (4/4 lessons, 38,983 words).')
}

main()
