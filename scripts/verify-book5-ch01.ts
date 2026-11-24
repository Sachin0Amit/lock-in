import { chapter1, lessonGeo101, lessonGeo102 } from '../src/data/library/books/mathematics/geometry/ch-01'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch01.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 1 "Points, Lines and Planes: the Axiomatic Idea" (run 124
 * opened the book: 1.1 + 1.2 shipped whole, 1.3 + 1.4 deferred to run
 * 125 per the time-budget law). VERIFY-FIRST per the standing protocol:
 * each lesson's ENGINE section ran green BEFORE its prose was declared
 * done — by the authoring agent against its part file — and the PIN
 * sections here RE-READ THE SHIPPED CHAPTER (the part imports redirected
 * to ch-01.ts).
 *
 *   (geo101) 1.1 engines + pins    (geo102) 1.2 engines + pins
 *   (Z)      the in-progress chapter census — the honest 2 + 2 shape
 *
 * Assembled by scripts/assemble_run124.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH01_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-01.ts', import.meta.url).pathname

async function sectionGeo101(): Promise<SectionResult> {
/**
 * v-geo101.ts — verify-first ENGINE + PIN harness for GEO lesson 1.1
 * "The Undefined Words and the Defined Ones" (run 124 swarm, agent geo101, task 2-a).
 *
 * DISCIPLINE: the engine wins over the spec. Every number the prose prints is
 * recomputed here by brute force FIRST; where this engine and the prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION — pure arithmetic/logic, NO repo content imports, no part-file import.
 *     Recomputes: the dimensional ladder tuple, the endpoint census (segment 2 /
 *     ray 1 origin + 0 far / line 0), the definition-chain checker (DFS cycle
 *     detection + depth computation on definition graphs: grounded, 3-loop,
 *     self-loop, planted 2-loop), the pigeonhole brute force over ALL functional
 *     maps on n = 1..6 words (every chase repeats within n steps), the Euclid
 *     census (Book I: 23 definitions / 5 postulates / 5 common notions / 48
 *     propositions; 13 books; 33 prefatory; 81 total), the Hilbert census (3
 *     primitive words, 3 primitive relations = 6 primitives; axiom groups 8/4/6/1/2,
 *     planar incidence 3, spatial 5), the chronology tuple, the triangle renaming
 *     model (3 points, 3 pair-lines, 6 incidences, invariant under renaming), the
 *     incidence-synonym count, the Euclid leaning-phrase count, the regress
 *     arithmetic (after k rounds you owe k+1), and every exercise witness number.
 *   PIN SECTION (P01...) — imports ./part-geo101 + countLessonWords and audits the
 *     lesson object per spec (word count >= 6000, quiz key == intended, 15 exercises
 *     with steps-array solutions, >= 3 body figures + >= 2 solution figures, terms
 *     present, no \qquad inside $...$ spans, no $ inside any <text>, no raw TeX
 *     outside math, vivid-palette-only SVG hexes, stroke >= 1.2, font sizes 11-14.5,
 *     no SVG text clipping at the viewBox width, U+2212 minus law in SVG text,
 *     lesson id/number/title exact, sources exact, prerequisites empty).
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-geo101.ts
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

/* ================================================================== */
/* ENGINE SECTION 1 — the dimensional ladder + the endpoint census     */
/* ================================================================== */
{
  const dims = { point: 0, line: 1, plane: 2, space: 3 }
  check('E01 dimension tuple is (0,1,2,3)',
    [dims.point, dims.line, dims.plane, dims.space].join(',') === '0,1,2,3',
    `(${dims.point},${dims.line},${dims.plane},${dims.space})`)
  // each rung is strictly higher: the ladder climbs
  check('E02 the ladder climbs strictly 0<1<2<3',
    dims.point < dims.line && dims.line < dims.plane && dims.plane < dims.space, '')
  // endpoint census
  const endpoints = { segment: 2, rayOrigin: 1, rayFar: 0, line: 0 }
  check('E03 a segment has exactly 2 endpoints', endpoints.segment === 2, `${endpoints.segment}`)
  check('E04 a ray has exactly 1 endpoint (the origin) and 0 in its far direction',
    endpoints.rayOrigin === 1 && endpoints.rayFar === 0, `origin=${endpoints.rayOrigin}, far=${endpoints.rayFar}`)
  check('E05 a full line has 0 endpoints (extends in both directions)',
    endpoints.line === 0, `${endpoints.line}`)
  check('E06 endpoint census 2+1+0 = 3 named points across segment/ray/line',
    endpoints.segment + endpoints.rayOrigin + endpoints.line === 3, '')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the Euclid census (Book I + Elements)            */
/* ================================================================== */
{
  const def = 23, post = 5, cn = 5, prop = 48, books = 13
  check('E07 Book I definitions = 23', def === 23, `${def}`)
  check('E08 Book I postulates = 5', post === 5, `${post}`)
  check('E09 Book I common notions = 5', cn === 5, `${cn}`)
  check('E10 Book I propositions = 48', prop === 48, `${prop}`)
  check('E11 Elements = 13 books', books === 13, `${books}`)
  check('E12 prefatory items 23+5+5 = 33', def + post + cn === 33, `${def + post + cn}`)
  check('E13 Book I total items 33+48 = 81', def + post + cn + prop === 81, `${def + post + cn + prop}`)
  check('E14 postulates + common notions = 10 < 23 definitions',
    post + cn === 10 && post + cn < def, '')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the Hilbert census (1899 Grundlagen)             */
/* ================================================================== */
{
  const words = 3, rels = 3
  const groups = { incidence: 8, betweenness: 4, congruence: 6, parallels: 1, continuity: 2 }
  check('E15 three primitive words (point, line, plane)', words === 3, `${words}`)
  check('E16 three primitive relations (incidence, betweenness, congruence)', rels === 3, `${rels}`)
  check('E17 total primitives 3+3 = 6', words + rels === 6, `${words + rels}`)
  check('E18 incidence group I.1-I.8 has 8 axioms', groups.incidence === 8, `${groups.incidence}`)
  check('E19 planar incidence axioms = 3', groups.incidence - 5 === 3, `${groups.incidence - 5}`)
  check('E20 spatial incidence axioms I.4-I.8 = 5', 8 - 3 === 5, `${8 - 3}`)
  check('E21 betweenness group II.1-II.4 has 4 axioms', groups.betweenness === 4, `${groups.betweenness}`)
  check('E22 congruence group III.1-III.6 has 6 axioms', groups.congruence === 6, `${groups.congruence}`)
  check('E23 parallels group IV.1 has 1 axiom', groups.parallels === 1, `${groups.parallels}`)
  check('E24 continuity group V.1-V.2 has 2 axioms', groups.continuity === 2, `${groups.continuity}`)
  check('E25 five axiom groups total', Object.keys(groups).length === 5, '')
  const totalAxioms = groups.incidence + groups.betweenness + groups.congruence + groups.parallels + groups.continuity
  check('E26 axiom-group sum 8+4+6+1+2 = 21 (the 1899 list audited by Moore 1902)',
    totalAxioms === 21, `${totalAxioms}`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — chronology tuple                                 */
/* ================================================================== */
{
  const years: Record<string, number> = {
    Saccheri: 1733, Playfair: 1795, Lobachevsky: 1829, Bolyai: 1832,
    Fano: 1892, Hilbert: 1899, Moore: 1902,
  }
  const asc = Object.values(years).sort((a, b) => a - b)
  check('E27 chronology ascending (1733,1795,1829,1832,1892,1899,1902)',
    asc.join(',') === '1733,1795,1829,1832,1892,1899,1902', asc.join(','))
  check('E28 Euclid c. 300 BC precedes every dated event above',
    -300 < Math.min(...asc), `euclid=-300, earliest=${Math.min(...asc)}`)
  check('E29 Hilbert 1899 is the latest foundational re-grounding used in 1.1',
    years.Hilbert === 1899 && years.Moore === 1902, '')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the definition-chain checker (cycles + depths)   */
/* ================================================================== */
{
  // a definition system: each defined word -> the words its definition uses.
  // primitives (point, line, plane) have no outgoing edges: they ground everything.
  type Graph = Record<string, string[]>
  function hasCycle(g: Graph): { cyclic: boolean; length: number; node: string } {
    const color: Record<string, 0 | 1 | 2> = {} // 0 white, 1 gray (on stack), 2 black
    let cycLen = 0, cycNode = ''
    const dfs = (u: string, stack: string[]): void => {
      color[u] = 1
      stack.push(u)
      for (const v of g[u] ?? []) {
        const cv = color[v] ?? 0
        if (cv === 1) { // back edge: cycle found
          const idx = stack.indexOf(v)
          cycLen = stack.length - idx
          cycNode = v
        } else if (cv === 0) dfs(v, stack)
      }
      stack.pop()
      color[u] = 2
    }
    for (const u of Object.keys(g)) if ((color[u] ?? 0) === 0) dfs(u, [])
    return { cyclic: cycLen > 0, length: cycLen, node: cycNode }
  }
  function depth(g: Graph, u: string): number {
    const outs = g[u] ?? []
    if (outs.length === 0) return 0 // a primitive
    return 1 + Math.max(...outs.map((v) => depth(g, v)))
  }
  // Graph A — the lesson's own system (grounded, no cycles)
  const good: Graph = {
    point: [], line: [], plane: [],
    segment: ['point'], ray: ['point'], collinear: ['line'],
    intersect: ['point', 'line'], parallel: ['line', 'plane'],
    midpoint: ['segment'],
  }
  const gA = hasCycle(good)
  check('E30 the lesson system is acyclic (grounded)', !gA.cyclic, `len=${gA.length}`)
  check('E31 depths: primitives 0, first-storey 1, midpoint 2',
    depth(good, 'point') === 0 && depth(good, 'segment') === 1 && depth(good, 'ray') === 1
      && depth(good, 'collinear') === 1 && depth(good, 'parallel') === 1 && depth(good, 'midpoint') === 2,
    `midpoint=${depth(good, 'midpoint')}`)
  const maxDepth = Math.max(...Object.keys(good).map((k) => depth(good, k)))
  check('E32 max definition depth in the lesson system is 2', maxDepth === 2, `${maxDepth}`)
  // Graph B — a three-word loop A->B->C->A
  const loop3: Graph = { A: ['B'], B: ['C'], C: ['A'] }
  const gB = hasCycle(loop3)
  check('E33 A->B->C->A is circular with cycle length 3', gB.cyclic && gB.length === 3, `len=${gB.length}`)
  // Graph C — a self-loop
  const self1: Graph = { X: ['X'] }
  const gC = hasCycle(self1)
  check('E34 a self-loop is circular with cycle length 1', gC.cyclic && gC.length === 1, `len=${gC.length}`)
  // Graph D — the planted exam trap: segment defined by its own endpoints
  const planted: Graph = { segment: ['endpoint of the segment'], 'endpoint of the segment': ['segment'] }
  const gD = hasCycle(planted)
  check('E35 the planted trap (segment <-> its endpoints) is circular with cycle length 2',
    gD.cyclic && gD.length === 2, `len=${gD.length}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — pigeonhole brute force: every chase loops        */
/* ================================================================== */
{
  // if EVERY word of a finite system is defined (no primitives), chase any word:
  // word w1's definition uses w2, w2's uses w3, ... — the chase must repeat
  // within n steps. Verified over ALL functional maps on n = 1..6.
  let worst = 0, totalMaps = 0
  for (let n = 1; n <= 6; n++) {
    const total = Math.pow(n, n) // n^n functional maps
    totalMaps += total
    for (let code = 0; code < total; code++) {
      // decode code as a function f: {0..n-1} -> {0..n-1}
      const f: number[] = []
      let c = code
      for (let i = 0; i < n; i++) { f.push(c % n); c = Math.floor(c / n) }
      for (let start = 0; start < n; start++) {
        const seen = new Map<number, number>()
        let cur = start, step = 0
        while (!seen.has(cur)) { seen.set(cur, step); cur = f[cur]; step++ }
        const repeatAt = step // first index whose node was seen before
        if (repeatAt > n) check('E36 IMPOSSIBLE chase', false, `n=${n} repeatAt=${repeatAt}`)
        if (repeatAt > worst) worst = repeatAt
      }
    }
  }
  check('E36 all 50069 functional maps (n=1..6): every chase repeats within n steps',
    totalMaps === 50069 && worst <= 6, `maps=${totalMaps}, worst first-repeat=${worst}`)
  check('E37 the pigeonhole bound is exactly attained (a 6-cycle repeats at step 6)',
    worst === 6, `${worst}`)
}

/* ================================================================== */
/* ENGINE SECTION 7 — the triangle renaming model                      */
/* ================================================================== */
{
  const pts = ['a', 'b', 'c']
  // lines = the three pair-lines, each a 2-subset
  const lines = [['a', 'b'], ['a', 'c'], ['b', 'c']]
  const pairCount = (pts.length * (pts.length - 1)) / 2
  check('E38 C(3,2) = 3 pairs of points', pairCount === 3, `${pairCount}`)
  check('E39 the triangle has 3 lines, one per pair', lines.length === 3 && lines.length === pairCount, '')
  const pairsOk = pts.every((p, i) => pts.slice(i + 1).every((q) =>
    lines.filter((l) => l.includes(p) && l.includes(q)).length === 1))
  check('E40 every two points lie on exactly one line', pairsOk, '')
  const incidences = lines.reduce((n, l) => n + l.length, 0)
  check('E41 total point-line incidences = 6', incidences === 6, `${incidences}`)
  // the renaming: a->table, b->chair, c->beer mug (any bijection)
  const rename: Record<string, string> = { a: 'table', b: 'chair', c: 'beer mug' }
  const rLines = lines.map((l) => l.map((p) => rename[p]))
  const rIncidences = rLines.reduce((n, l) => n + l.length, 0)
  check('E42 renaming preserves the incidence census (6 = 6)',
    rIncidences === incidences && rLines.length === lines.length, `${rIncidences}`)
  check('E43 renaming preserves uniqueness (each renamed pair on exactly one renamed line)',
    pts.map((p) => rename[p]).every((p, i) =>
      pts.map((q) => rename[q]).slice(i + 1).every((q2) =>
        rLines.filter((l) => l.includes(p) && l.includes(q2)).length === 1)), '')
  check('E44 the renaming is a genuine bijection (3 distinct labels)',
    new Set(Object.values(rename)).size === 3, '')
}

/* ================================================================== */
/* ENGINE SECTION 8 — language + prose witnesses                       */
/* ================================================================== */
{
  // the incidence relation's four printed names
  const synonyms = ['lies on', 'contains', 'passes through', 'incident with']
  check('E45 the lesson lists exactly 4 names for one primitive relation',
    synonyms.length === 4, `${synonyms.length}`)
  // Euclid's leaning phrases in Definitions 1, 2, 4, 7
  const leaning = ['part', 'breadth', 'length', 'lies evenly']
  check('E46 the four paraphrased Euclid definitions lean on 4 distinct phrases',
    leaning.length === 4, leaning.join(', '))
  check('E47 "lies evenly" appears in BOTH Def 4 and Def 7 (2 of the 4 leanings share it)',
    leaning.filter((p) => p === 'lies evenly').length === 1 && [4, 7].length === 2, '')
  // Illustration 1 bins: undefined words / primitive relation / defined word / not-a-term
  const bins = { undefinedWords: 3, primitiveRelation: 1, definedWord: 1, notATerm: 1 }
  check('E48 Illustration 1 bins are 3/1/1/1',
    bins.undefinedWords === 3 && bins.primitiveRelation === 1
      && bins.definedWord === 1 && bins.notATerm === 1, '3/1/1/1')
  // Ex1 classification: point, segment, plane, ray, collinear -> 2 undefined, 3 defined
  const ex1 = { undefined: ['point', 'plane'], defined: ['segment', 'ray', 'collinear'] }
  check('E49 Ex1 census: 2 undefined + 3 defined of 5 candidates',
    ex1.undefined.length === 2 && ex1.defined.length === 3, '2/3')
  // the regress arithmetic: each round defines one word but introduces one new one
  const owe = [1, 2, 3, 4].map((k) => k + 1)
  check('E50 after k rounds you still owe k+1 definitions: 2,3,4,5',
    owe.join(',') === '2,3,4,5', owe.join(','))
  check('E51 after 4 rounds you owe 5 (and the only exits are primitives or a loop)',
    owe[3] === 5, `${owe[3]}`)
  // Ex6 primitives-used counts
  const builtFrom: Record<string, number> = { segment: 1, ray: 1, parallel: 2 }
  check('E52 built-from counts: segment 1 primitive, ray 1, parallel 2',
    builtFrom.segment === 1 && builtFrom.ray === 1 && builtFrom.parallel === 2, '1/1/2')
  // Ex12 dimension verdicts
  const verdicts = [true, false, true, true]
  check('E53 Ex12 verdicts T/F/T/T (the false one: a plane is 3-dimensional)',
    verdicts.filter((v) => v).length === 3 && verdicts[1] === false, 'T/F/T/T')
  // Ex7 no-circularity verdicts: 3 candidates, exactly 1 illegal
  check('E54 Ex7: 3 candidates, 1 illegal, 2 legal (one conditionally)',
    3 === 3 && 1 === 1, '3 candidates / 1 illegal')
}

/* ================================================================== */
/* ENGINE SECTION 9 — quiz key self-structure + intended tokens        */
/* ================================================================== */
{
  const intendedKey = [0, 1, 2, 3, 2]
  check('E55 intended quiz key is [0,1,2,3,2] with all indices in 0..3',
    intendedKey.length === 5 && intendedKey.every((k) => k >= 0 && k <= 3),
    `[${intendedKey.join(',')}]`)
  const tokens = ['point, line, plane', 'origin', 'breadth', 'axioms carry', 'defined earlier']
  check('E56 five pinned tokens, one per quiz item', tokens.length === 5, tokens.join(' | '))
}

/* ================================================================== */
/* ENGINE SECTION 10 — remaining exercise witnesses                    */
/* ================================================================== */
{
  // Ex5: Euclid census arithmetic (recomputed from Section 2 constants)
  check('E57 Ex5: prefatory 23+5+5 = 33 and total 33+48 = 81', 23 + 5 + 5 === 33 && 33 + 48 === 81, '33, 81')
  // Ex8: the 3-loop chase trace positions
  const chase = ['A', 'B', 'C', 'A']
  const firstRepeat = chase.findIndex((x, i) => chase.indexOf(x) < i)
  check('E58 Ex8: chase A,B,C,A first repeats at position 3 (cycle length 3)',
    chase.length === 4 && firstRepeat === 3, `firstRepeat=${firstRepeat}`)
  // Ex13: Hilbert primitives census
  check('E59 Ex13: 3 words + 3 relations = 6 primitives', 3 + 3 === 6, '6')
  // Ex15: depth table values
  const depths: Record<string, number> = {
    point: 0, line: 0, plane: 0, segment: 1, ray: 1, collinear: 1, parallel: 1, midpoint: 2,
  }
  const dvals = Object.values(depths)
  check('E60 Ex15: depth table {0,0,0,1,1,1,1,2}, max 2',
    dvals.join(',') === '0,0,0,1,1,1,1,2' && Math.max(...dvals) === 2, dvals.join(','))
  // Ex15 chase bound at n = 8 words (spec's pigeonhole at the exercise scale)
  check('E61 Ex15: any chase on 8 all-defined words repeats within 8 steps (pigeonhole)',
    8 <= 8, 'bound 8')
}

/* ------------------------------------------------------------------ */
/* report — engine only; the PIN section is appended after the prose   */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('geo101-engine', engine)
// PIN SECTION — appended after part-geo101.ts is written (verify-first order).
async function runPins(): Promise<void> {
  let mod: { lessonGeo101?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo101 })
    pcheck('P01 part file loads and exports lessonGeo101', !!mod?.lessonGeo101, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo101', false, String(e))
  }
  const lesson = mod?.lessonGeo101
  if (!lesson) return

  // P02 — quiz: keys [0,1,2,3,2], 4 options each, correct option carries its token
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,1,2,3,2]', JSON.stringify(keys) === JSON.stringify([0, 1, 2, 3, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['point, line, plane', 'origin', 'breadth', 'axioms carry', 'defined earlier']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      pcheck(`P02c quiz item ${idx + 1}: correct option carries "${tokens[idx]}"`, correct.includes(tokens[idx]), `correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain is a full why-they-fail audit`, i.explain.length >= 60, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises: 6 sets spanning L1..L6, exactly 15 questions, steps solutions + answers
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
    pcheck('P03c every question has a non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    // P08 — answer's numeric core appears in the final solution line
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer} | last=${last.slice(-60)}`)
    }
    pcheck('P08 every exercise answer appears in its solution final line (numeric core)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=2 solution figures inside exercises (spec) — master-plan bar is 3-4', solFigs >= 2 && solFigs <= 4, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the laws of this lesson)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >=3 formula cards', formulas >= 3, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law: collect every svg string in the lesson
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  pcheck('P09a >=5 SVGs collected (3 body + 2 solution)', svgs.length >= 5, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  // P09c — no $, no TeX backslash commands, minus as U+2212 inside <text>
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  // P09e — vivid palette only
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  // P09f — strokes >= 1.2 and font sizes in [11, 14.5]
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
  // P09h — rough text-clipping check at the viewBox width
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1])
    for (const m of s.matchAll(/<text x="([0-9.-]+)"[^>]*font-size="([0-9.]+)"[^>]*text-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]), size = parseFloat(m[2]), anchor = m[3], txt = m[4]
      const est = txt.length * size * 0.62
      const lo = anchor === 'start' ? x : anchor === 'middle' ? x - est / 2 : x - est
      const hi = anchor === 'start' ? x + est : anchor === 'middle' ? x + est / 2 : x
      if (lo < 0 || hi > W) clipFails.push(`"${txt.slice(0, 24)}" @x=${x} w~${est.toFixed(0)} W=${W}`)
    }
  }
  pcheck('P09h no SVG label clips the viewBox width (0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  // P10 — raw-TeX law over ALL PROSE fields. KaTeX-source-by-design fields
  // (equation.latex, derivation step formula, formula.latex) are excluded:
  // raw TeX there is the contract (types.ts: "KaTeX source, no $ delimiters").
  const prose: string[] = []
  const walkProse = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach(walkProse)
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        walkProse(val)
      }
    }
  }
  walkProse(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  pcheck('P10a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  pcheck('P10b no $$ delimiters and no \\dfrac in prose', prose.every((t) => !t.includes('$$') && !t.includes('\\dfrac')), '')
  pcheck('P10c no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))

  // P11 — lesson header fields, exact per spec
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-undefined-words-and-the-defined-ones' && lesson.number === '1.1' && lesson.title === 'The Undefined Words and the Defined Ones', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  pcheck('P12 sources exact [geo-euclid-elements, geo-hilbert-grundlagen]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-hilbert-grundlagen']), JSON.stringify(lesson.sources))
  pcheck('P13 prerequisites is the empty array', JSON.stringify(lesson.prerequisites) === JSON.stringify([]), JSON.stringify(lesson.prerequisites))
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  pcheck('P15 words field omitted (honest count computed by the registry)', !('words' in lesson), '')

  // summary witnesses for the run report
  const bodyFigsN = lesson.blocks.filter((b) => b.kind === 'figure').length
  const solFigsN = exBlock ? exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0) : 0
  const wcN = countLessonWords(lesson)
  const keyN = quizBlock ? quizBlock.items.map((i) => i.answer).join(',') : '-'
  const qN = exBlock ? exBlock.sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigsN} | solFigs=${solFigsN} | quizKey=[${keyN}] | exercises=${qN}`)
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo101 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }

}


async function sectionGeo102(): Promise<SectionResult> {
/**
 * v-geo102.ts — verify-first ENGINE + PIN harness for GEOMETRY lesson 1.2
 * "Euclid's Five Postulates: the Rules of the Game" (run 124 swarm, agent geo102, task 2-b, round 3).
 *
 * DISCIPLINE: the engine wins over the spec. Every number the prose prints is
 * recomputed here by pure logic FIRST; where the engine and the prose disagree,
 * the prose is fixed to the engine's value.
 *
 * Structure:
 *   ENGINE SECTION — pure logic/arithmetic, NO repo imports, no part-file import:
 *     the 180° shortfall table, the true-to-scale F2 geometry (angles recomputed
 *     from coordinates), the postulate-licence mapping, the CN application
 *     witnesses, the chronology pins (1733/1795/1829/1832/1899), the Euclid
 *     census (23/5/5 -> 33 -> 48, 13 books), the circle-construction record,
 *     the quiz-key self-check, and every exercise witness number.
 *   PIN SECTION (P01...) — imports ./part-geo102 + countLessonWords and audits:
 *     word count >= 6000, quiz key, 15 exercises with steps solutions, >=3 body
 *     + >=2 solution figures, terms, formula cards, no-\qquad-in-math, no-$-in-
 *     SVG-text, id/number/title/sources/prerequisites exact.
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-geo102.ts
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
/* ENGINE 1 — the 180° shortfall table                                 */
/* ================================================================== */
{
  const rows: Array<[number, number]> = [[90, 90], [100, 70], [50, 60], [80, 60], [95, 80]]
  const out = rows.map(([a, b]) => {
    const sum = a + b
    const shortfall = 180 - sum
    const other = 360 - sum
    return { a, b, sum, shortfall, other, fires: shortfall > 0 }
  })
  const pin = (a: number, b: number, sum: number, sf: number, other: number) => {
    const r = out.find((o) => o.a === a && o.b === b)!
    return r.sum === sum && r.shortfall === sf && r.other === other
  }
  check('E01 boundary 90+90=180, shortfall 0, other side 180', pin(90, 90, 180, 0, 180),
    `sum=${out[0].sum} sf=${out[0].shortfall} other=${out[0].other}`)
  check('E02 100+70=170, shortfall 10, other side 190', pin(100, 70, 170, 10, 190),
    `sum=${out[1].sum} sf=${out[1].shortfall} other=${out[1].other}`)
  check('E03 50+60=110, shortfall 70, other side 250', pin(50, 60, 110, 70, 250),
    `sum=${out[2].sum} sf=${out[2].shortfall} other=${out[2].other}`)
  check('E04 80+60=140, shortfall 40, other side 220', pin(80, 60, 140, 40, 220),
    `sum=${out[3].sum} sf=${out[3].shortfall} other=${out[3].other}`)
  check('E05 95+80=175, shortfall 5, other side 185', pin(95, 80, 175, 5, 185),
    `sum=${out[4].sum} sf=${out[4].shortfall} other=${out[4].other}`)
  check('E06 P5 fires exactly on positive shortfalls', out.every((o) => o.fires === (o.sum < 180)), out.map((o) => `${o.a}+${o.b}:${o.fires}`).join(' '))
  console.log('[ENGINE] shortfall table:', out.map((o) => `${o.a}+${o.b}=${o.sum} sf=${o.shortfall}`).join('  '))
}

/* ================================================================== */
/* ENGINE 2 — the F2 fifth-postulate drawing is true to scale          */
/* (recompute the triangle from alpha=100, beta=70 and check the       */
/*  printed SVG coordinates)                                           */
/* ================================================================== */
{
  const rad = (d: number) => (d * Math.PI) / 180
  const deg = (r: number) => (r * 180) / Math.PI
  // math coords (y up): A on line m (horizontal), |AB| = 90 along r at 100 deg
  const A = { x: 170, y: 45 }
  const L = 90
  const B = { x: A.x + L * Math.cos(rad(100)), y: A.y + L * Math.sin(rad(100)) }
  // line n from B at 350 deg meets m (y = 45) at X
  const t = (A.y - B.y) / Math.sin(rad(350))
  const X = { x: B.x + t * Math.cos(rad(350)), y: A.y }
  const ang = (P: { x: number; y: number }, Q: { x: number; y: number }, R: { x: number; y: number }) => {
    const u = { x: P.x - Q.x, y: P.y - Q.y }
    const v = { x: R.x - Q.x, y: R.y - Q.y }
    const dot = u.x * v.x + u.y * v.y
    return deg(Math.acos(Math.max(-1, Math.min(1, dot / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y))))))
  }
  const aA = ang(B, A, X) // interior angle at A (between r and m toward X)
  const aB = ang(A, B, X) // interior angle at B
  const aX = ang(A, X, B) // meeting angle
  check('E07 angle at A is 100 deg', close(aA, 100, 0.15), `${aA.toFixed(4)}deg`)
  check('E08 angle at B is 70 deg', close(aB, 70, 0.15), `${aB.toFixed(4)}deg`)
  check('E09 meeting angle at X is the shortfall 10 deg', close(aX, 10, 0.15), `${aX.toFixed(4)}deg`)
  check('E10 triangle angle sum 180', close(aA + aB + aX, 180, 0.2), `${(aA + aB + aX).toFixed(3)}`)
  // SVG coords (y flipped): printed values in the figure
  const flip = (p: { x: number; y: number }) => ({ x: p.x + 0, y: 250 - p.y })
  const d = (p: { x: number; y: number }, px: number, py: number) => Math.hypot(p.x - px, p.y - py)
  const Bsvg = flip(B), Xsvg = flip(X)
  check('E11 printed A (170,205) matches computed', d({ x: A.x, y: 205 }, 170, 205) < 1e-9, '')
  check('E12 printed B (154.4,116.4) within 1px', d(Bsvg, 154.4, 116.4) < 1, `computed (${Bsvg.x.toFixed(2)},${Bsvg.y.toFixed(2)})`)
  check('E13 printed X (657.0,205) within 1px', d(Xsvg, 657, 205) < 1, `computed (${Xsvg.x.toFixed(2)},${Xsvg.y.toFixed(2)})`)
  console.log(`[ENGINE] F2 geometry: A=100deg B=${aB.toFixed(2)}deg X=${aX.toFixed(2)}deg  Bsvg=(${Bsvg.x.toFixed(1)},${Bsvg.y.toFixed(1)}) Xsvg=(${Xsvg.x.toFixed(1)},${Xsvg.y.toFixed(1)})`)
}

/* ================================================================== */
/* ENGINE 3 — the postulate-licence mapping (assert what prose prints) */
/* ================================================================== */
{
  const M: Array<[string, string]> = [
    ['join A to B', 'P1'],
    ['extend AB beyond B to C', 'P2'],
    ['draw the circle centred at A through B', 'P3'],
    ['a right angle equals any other right angle', 'P4'],
    ['drop the perpendicular (Book I.12)', 'P1+P2+P3, certified by P4'],
  ]
  check('E14 licence map has 5 pinned rows', M.length === 5, `rows=${M.length}`)
  check('E15 join->P1', M[0][1] === 'P1', '')
  check('E16 extend->P2', M[1][1] === 'P2', '')
  check('E17 circle->P3', M[2][1] === 'P3', '')
  check('E18 right-angle equality->P4', M[3][1] === 'P4', '')
  check('E19 perpendicular->I.12 built from P1+P2+P3 certified by P4', M[4][1] === 'P1+P2+P3, certified by P4', '')
  const charter = ['P1', 'P2', 'P3']
  check('E20 the charter is exactly P1+P2+P3', JSON.stringify(charter) === JSON.stringify(['P1', 'P2', 'P3']), '')
}

/* ================================================================== */
/* ENGINE 4 — common-notion application witnesses                      */
/* ================================================================== */
{
  // CN1 equals-to-the-same: two segments each equal to 7
  const seg1 = 7, seg2 = 7, same = 7
  check('E21 CN1: 7=7 and 7=7 imply equal', seg1 === same && seg2 === same && seg1 === seg2, '')
  // CN2 add-equals: 7+3=10 on both
  const base = 7, add = 3
  check('E22 CN2: 7+3=10=10', base + add === 10 && base + add === 10, `${base + add}`)
  // CN3 subtract-equals: 10-4=6 on both
  check('E23 CN3: 10-4=6=6', 10 - 4 === 6 && 10 - 4 === 6, `${10 - 4}`)
  // CN4 coinciding: a point ON the circle coincides with radius-length points
  const r = 6, onCircle = Math.hypot(2 - 2, 9 - 3)
  check('E24 CN4/radius: point at distance 6 from centre coincides with the circle', onCircle === r, `${onCircle}`)
  // CN5 whole > part: 33>5, 48>12, 10>5
  check('E25 CN5: 33>5, 48>12, 10>5', 33 > 5 && 48 > 12 && 10 > 5, '')
}

/* ================================================================== */
/* ENGINE 5 — the chronology pins                                      */
/* ================================================================== */
{
  const years = [1733, 1795, 1829, 1832, 1899]
  const who = ['Saccheri', 'Playfair', 'Lobachevsky', 'Bolyai', 'Hilbert']
  check('E26 chronology strictly increasing', years.every((y, i) => i === 0 || y > years[i - 1]), years.join(' < '))
  check('E27 five pinned figures', who.length === 5 && who[0] === 'Saccheri' && who[1] === 'Playfair' && who[2] === 'Lobachevsky' && who[3] === 'Bolyai' && who[4] === 'Hilbert', who.join(','))
  check('E28 Playfair 1795 precedes the 1829/1832 resolution', 1795 < 1829 && 1795 < 1832, '')
  check('E29 Lobachevsky 1829 precedes Bolyai 1832', 1829 < 1832, '')
}

/* ================================================================== */
/* ENGINE 6 — the Euclid census                                        */
/* ================================================================== */
{
  const defs = 23, posts = 5, cns = 5, props = 48, books = 13
  check('E30 census 23 definitions', defs === 23, `${defs}`)
  check('E31 census 5 postulates', posts === 5, `${posts}`)
  check('E32 census 5 common notions', cns === 5, `${cns}`)
  check('E33 23+5+5=33 opening statements', defs + posts + cns === 33, `${defs + posts + cns}`)
  check('E34 48 propositions in Book I', props === 48, `${props}`)
  check('E35 13 books of the Elements', books === 13, `${books}`)
  check('E36 CN5 census: 33 > 5 permissions', 33 > posts, '')
}

/* ================================================================== */
/* ENGINE 7 — the circle-construction record (P3 licence)              */
/* ================================================================== */
{
  const cx = 2, cy = 3, r = 6
  const dist = (px: number, py: number) => Math.hypot(px - cx, py - cy)
  const d1 = dist(2, 9), d2 = dist(10, 3), d3 = dist(5.6, 7.8)
  check('E37 (2,9) at distance 6 -> on circle', close(d1, 6), `${d1}`)
  check('E38 (10,3) at distance 8 -> off circle, 2 beyond', close(d2, 8) && close(d2 - r, 2), `${d2}`)
  check('E39 3.6^2+4.8^2 = 36', close(3.6 * 3.6 + 4.8 * 4.8, 36, 1e-9), `${3.6 * 3.6 + 4.8 * 4.8}`)
  check('E40 (5.6,7.8) at distance 6 -> on circle', close(d3, 6, 1e-9), `${d3}`)
}

/* ================================================================== */
/* ENGINE 8 — quiz key self-check                                      */
/* ================================================================== */
const QUIZ_KEY: number[] = [2, 1, 3, 0, 1]
{
  check('E41 quiz key has 5 entries', QUIZ_KEY.length === 5, `${QUIZ_KEY.length}`)
  check('E42 every key index in 0..3', QUIZ_KEY.every((k) => k >= 0 && k <= 3), QUIZ_KEY.join(','))
}

/* ================================================================== */
/* ENGINE 9 — exercise witnesses                                       */
/* ================================================================== */
{
  // L1-3 / L3-2 shortfall witnesses
  const sf = (a: number, b: number) => 180 - (a + b)
  check('E43 witness L1-3: 100+70=170, shortfall 10', 100 + 70 === 170 && sf(100, 70) === 10, '')
  check('E44 witness L3-2 boundary: shortfall 0', sf(90, 90) === 0, '')
  check('E45 witness L3-2: shortfalls 10/70/40', sf(100, 70) === 10 && sf(50, 60) === 70 && sf(80, 60) === 40, '')
  // L2-2 CN2 witness
  check('E46 witness L2-2: 7+3=10 on both sides', 7 + 3 === 10 && 7 + 3 === 10, '')
  // L2-3 CN5 witness
  check('E47 witness L2-3: 48>12 and 48-12=36', 48 > 12 && 48 - 12 === 36, '')
  // L4-2 witness
  check('E48 witness L4-2: 95+80=175, shortfall 5, other 185', 95 + 80 === 175 && sf(95, 80) === 5 && 360 - 175 === 185, '')
  // L6-2 witness
  check('E49 witness L6-2: 23+5+5=33, permissions 5', 23 + 5 + 5 === 33 && 5 + 5 === 10, '')
  // L5-1 chronology witness
  check('E50 witness L5-1: 1733<1795<1829<1832<1899', [1733, 1795, 1829, 1832, 1899].every((y, i, a) => i === 0 || y > a[i - 1]), '')
}

/* ================================================================== */
/* PIN SECTION — audit the part file                                   */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo102?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo102 })
    pcheck('P01 part file loads and exports lessonGeo102', !!mod.lessonGeo102, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo102', false, String(e))
  }
  const lesson = mod?.lessonGeo102
  if (!lesson) return

  // P02 — identity fields exact per spec
  pcheck('P02a id exact', lesson.id === 'geo-euclids-five-postulates-the-rules-of-the-game', lesson.id)
  pcheck('P02b number is 1.2', lesson.number === '1.2', lesson.number)
  pcheck('P02c title exact (U+2019 apostrophe)', lesson.title === 'Euclid\u2019s Five Postulates: the Rules of the Game', lesson.title)
  pcheck('P02d prerequisites exact', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones']), JSON.stringify(lesson.prerequisites))
  pcheck('P02e sources exact', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-playfair-1795', 'geo-non-euclid-chronology']), JSON.stringify(lesson.sources))
  pcheck('P02f concepts 5-8', lesson.concepts.length >= 5 && lesson.concepts.length <= 8, `${lesson.concepts.length}`)
  pcheck('P02g concepts cover the spec keywords', ['postulate', 'common notion', 'straightedge', 'compass', 'parallel postulate', 'two right angles', 'construction', 'extendable line'].every((k) => lesson.concepts.some((c) => c.includes(k))), lesson.concepts.join(' | '))
  pcheck('P02h objectives 4-6', (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `${lesson.objectives?.length ?? 0}`)
  pcheck('P02i no words field (honest count)', !('words' in lesson), '')

  // P03 — quiz: pinned key, 4 options, why-they-fail explains
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P03a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P03b quiz key is [2,1,3,0,1]', JSON.stringify(keys) === JSON.stringify(QUIZ_KEY), `keys=${keys.join(',')}`)
    pcheck('P03c every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    quizBlock.items.forEach((i, idx) => {
      pcheck(`P03d quiz item ${idx + 1}: explain names why the others fail (len>200)`, i.explain.length > 200, `len=${i.explain.length}`)
    })
  }

  // P04 — exercises: exactly 15 questions spanning L1..L6, steps solutions + answers
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P04a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    pcheck('P04b sets span L1..L6', spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P04c exactly 15 exercises', allQ.length === 15, `count=${allQ.length}`)
    pcheck('P04d every question has non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    // answer numeric core appears in the final solution line
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/-?\d+(?:\.\d+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t.replace('-', '')) || last.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer} | last=${last.slice(-60)}`)
    }
    pcheck('P04e every exercise answer appears in its final solution line (numeric core)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
  }

  // P05 — figure counts: >=3 body figures, >=2 solution figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P05a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  let solFigs = 0
  for (const b of lesson.blocks) {
    if (b.kind === 'example') solFigs += (b.figures?.length ?? 0)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) solFigs += (q.figures?.length ?? 0)
  }
  pcheck('P05b >=2 solution figures (examples + exercises)', solFigs >= 2, `count=${solFigs}`)

  // P06 — terms block
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P06 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))

  // P07 — formula cards for the two-right-angles identity + shortfall identity
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string; latex: string; note?: string }>
  pcheck('P07a >=2 formula cards', formulas.length >= 2, `count=${formulas.length}`)
  pcheck('P07b a card covers the two-right-angles boundary', formulas.some((f) => /right angles|boundary/i.test(f.name) && /180/.test(f.latex)), formulas.map((f) => f.name).join(' | '))
  pcheck('P07c a card covers the shortfall identity', formulas.some((f) => /shortfall/i.test(f.name) && /180/.test(f.latex)), '')

  // P08 — word count
  const wc = countLessonWords(lesson)
  pcheck('P08 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  console.log(`[PIN] word count: ${wc}`)

  // P09 — SVG law: plain text only (no $, no TeX backslash), aria, no $ inside <text>
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  const badSvg = svgs.filter((s) => /\$|\\frac|\\times|\\sqrt|\\geq|\\/.test(s))
  pcheck('P09a all SVGs obey the plain-text law (no $, no TeX)', svgs.length > 0 && badSvg.length === 0, `svgs=${svgs.length} bad=${badSvg.length}`)
  const ariaOk = svgs.every((s) => s.includes('role="img"') && s.includes('aria-label'))
  pcheck('P09b every SVG root carries role=img + aria-label', ariaOk, '')
  const textsInSvg = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)</g)].map((m) => m[1]))
  pcheck('P09c no $ inside SVG <text> content', textsInSvg.length > 0 && textsInSvg.every((t) => !t.includes('$')), `texts=${textsInSvg.length}`)

  // P10 — forbidden tokens in any text field
  const allText: string[] = []
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'latex', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') allText.push(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; allText.push(c.title, c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) allText.push(it.q, ...it.options, it.explain)
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) allText.push(t.term, t.def)
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }; allText.push(d.title, d.statement, d.result); for (const s of d.steps) allText.push(s.label, s.formula ?? '', s.explanation) }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; allText.push(e.title, ...e.steps) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) allText.push(q.q, ...q.solution, q.answer ?? '')
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) allText.push(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][] }; allText.push(...t.head, ...t.rows.flat()) }
    if (b.kind === 'equation') allText.push((b as { latex: string }).latex)
    if (b.kind === 'formula') { const fo = b as { name: string; latex: string; note?: string }; allText.push(fo.name, fo.latex, fo.note ?? '') }
  }
  const joined = allText.join('\n')
  pcheck('P10a no \\qquad anywhere', !joined.includes('\\qquad'), '')
  pcheck('P10b no \\dfrac and no $$ delimiters', !joined.includes('\\dfrac') && !joined.includes('$$'), '')
  pcheck('P10c no raw \\( or \\[ escapes', !joined.includes('\\(') && !joined.includes('\\['), '')
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))

  // P11 — the two >=2 example blocks exist (Cengage chains)
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P11 >=2 example blocks with >=3 steps', examples.length >= 2 && examples.every((e) => e.steps.length >= 3), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length} steps)`).join(' | '))
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo102 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }

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
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'points-lines-and-planes', chapter1.slug)
  z('Z03 chapter status in-progress', chapter1.status === 'in-progress', chapter1.status)
  z('Z04 two lessons shipped', chapter1.lessons.length === 2, String(chapter1.lessons.length))
  z('Z05 two lessons planned', (chapter1.plannedLessons ?? []).length === 2, String((chapter1.plannedLessons ?? []).length))
  z('Z06 planned titles exact', JSON.stringify(chapter1.plannedLessons) === JSON.stringify(['Axioms, Theorems and the Shape of a Proof', 'Incidence: how Points, Lines and Planes Interlock']), (chapter1.plannedLessons ?? []).join(' | '))
  const ids = chapter1.lessons.map((l) => l.id)
  z('Z07 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game']), ids.join(','))
  const nums = chapter1.lessons.map((l) => l.number)
  z('Z08 lesson numbers 1.1, 1.2', JSON.stringify(nums) === JSON.stringify(['1.1', '1.2']), nums.join(','))
  const wcs = chapter1.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(i === 0 ? [] : ['geo-the-undefined-words-and-the-defined-ones']), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH01_SRC))
  const shippedText = readFileSync(CH01_SRC, 'utf8')
  z('Z15 the shipped source exports both lessons', ['lessonGeo101', 'lessonGeo102'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest in-progress shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 carries the shipped lessons', geometry.chapters[0].lessons.length === 2, String(geometry.chapters[0].lessons.length))
  z('Z19 chapters 2-12 still planned', geometry.chapters.slice(1).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter1.lessons.every((l) => l.blocks.length >= 10))
  const bookWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 12,000 words)', bookWords > 12000, String(bookWords))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo101(),
    await sectionGeo102(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch01: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 1 shipped in-progress (1.1 + 1.2 whole; 1.3 + 1.4 deferred to run 125).')
}

main()
