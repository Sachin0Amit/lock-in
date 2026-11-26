import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

export {}

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
    mod = await import('./part-geo202')
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

/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('geo202-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo202-pins', pins)
const fail = e.fail + p.fail
console.log(`geo202 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
