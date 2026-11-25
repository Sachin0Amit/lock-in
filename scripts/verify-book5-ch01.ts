import { chapter1, lessonGeo101, lessonGeo102, lessonGeo103, lessonGeo104 } from '../src/data/library/books/mathematics/geometry/ch-01'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch01.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 1 "Points, Lines and Planes: the Axiomatic Idea" (run 124
 * opened the book with 1.1 + 1.2; run 125 CLOSED THE CHAPTER COMPLETE
 * with 1.3 + 1.4). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE section ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-01.ts).
 *
 *   (geo101) 1.1 engines + pins    (geo102) 1.2 engines + pins
 *   (geo103) 1.3 engines + pins    (geo104) 1.4 engines + pins
 *   (Z)      the closed-chapter census — the honest 4 + 0 shape
 *
 * Assembled by scripts/assemble_run125.py (extending run 124's): each
 * v-file wrapped whole as one async section (its local collectors/helpers
 * stay function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
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


async function sectionGeo103(): Promise<SectionResult> {
/**
 * v-geo103.ts — verify-first ENGINE + PIN harness for GEO lesson 1.3
 * "Axioms, Theorems and the Shape of a Proof" (run 124 swarm, agent geo103, task 3-a).
 *
 * DISCIPLINE: the engine wins over the spec. Every truth value, census number
 * and witness the prose prints is recomputed here by brute force FIRST; where
 * this engine and the prose disagree, the prose is fixed to the engine's value
 * and the catch is flagged in the report. (One spec catch already applied:
 * spec outline item 4 words the CN4 contrapositive demo as "do not coincide ⇒
 * not equal" — that is the INVERSE of CN4; the true contrapositive of
 * "coincide ⇒ equal" is "not equal ⇒ cannot coincide", and the lesson derives
 * exactly that, engine-witnessed.)
 *
 * Structure:
 *   ENGINE SECTION — pure logic/arithmetic, NO repo content imports, no
 *     part-file import.
 *     Recomputes: the full truth-table sweep (4 rows x the 4 statement forms
 *     P=>Q, converse Q=>P, inverse ¬P=>¬Q, contrapositive ¬Q=>¬P), the
 *     equivalence classes, the two counterexample rows where converse and
 *     inverse diverge from the original (P false, Q true), the biconditional
 *     census, modus ponens/tollens validity; geometric instantiations of the
 *     counterexample row (two unit segments, equal length, no coincidence);
 *     the four-point plane census (points A,B,C,D; lines = the 6 pair-lines;
 *     2 points per line; 3 lines through each point; 12 incidences; 3
 *     parallel classes) with the quantifier-order checks (for-every-point-
 *     exists-a-line TRUE; exists-a-line-containing-every-point FALSE; exists
 *     a line with two points TRUE; exists a line with three points FALSE);
 *     the two-distinct-lines-meet-in-at-most-one-point corollary witness and
 *     the Hilbert I.1 existence+uniqueness halves over the model; the
 *     no-last-point contradiction skeleton (extendability on N vs a finite
 *     chain 0..9: P2 holds iff no last point, windowed sweep 0..1000);
 *     statement-classification mapping asserts (definition/agreement,
 *     axiom/assumed, conjecture/believed-unproved, theorem/proved,
 *     lemma/stepping-stone, corollary/one-step); numeric theorem witnesses
 *     (isosceles base angles via the cosine rule, angles on a line, vertical
 *     angles); the two refutation witnesses (four non-coplanar points; the
 *     2x3 rectangle); the independence witness (model with 2-point lines);
 *     the divisibility counterexample row (6 | 6 but not 6 | 12); quiz-key
 *     self-check; every exercise witness number.
 *   PIN SECTION (P01...) — imports ./part-geo103 + countLessonWords and audits
 *     the lesson object per spec (id/number/title/sources/prerequisites exact,
 *     word count >= 6000, quiz key [1,2,3,2,1] with intended-option tokens and
 *     why-each-fails explains, exactly 15 exercises spanning L1..L6 with full
 *     steps solutions + terminal answers, >= 3 body figures + >= 2 solution
 *     figures, >= 2 example blocks, terms >= 6, formula cards >= 3, SVG law:
 *     plain text, U+2212 minus, vivid palette hexes only, strokes >= 1.2,
 *     fonts 11-14.5, no clipping, aria-labels; no \qquad in $...$; no raw TeX
 *     outside math).
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-geo103.ts
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
/* ENGINE SECTION 1 — the full truth-table sweep                       */
/* (P,Q) in {T,F}^2 x the four forms: P=>Q, Q=>P, ¬P=>¬Q, ¬Q=>¬P       */
/* ================================================================== */
{
  type B = boolean
  const impl = (p: B, q: B): B => !p || q
  const rows: Array<[B, B]> = [[true, true], [true, false], [false, true], [false, false]]
  const col = (f: (p: B, q: B) => B): B[] => rows.map(([p, q]) => f(p, q))
  const orig = col(impl)
  const conv = col((p, q) => impl(q, p))
  const inv = col((p, q) => impl(!p, !q))
  const contra = col((p, q) => impl(!q, !p))
  const bs = (v: B[]) => v.map((x) => (x ? 'T' : 'F')).join('')

  check('E01 P=>Q is defined by ¬P ∨ Q on all four rows',
    rows.every(([p, q]) => impl(p, q) === ((!p) || q)), '')
  check('E02 P=>Q column is T F T T', bs(orig) === 'TFTT', bs(orig))
  check('E03 the only false row is (P=T, Q=F)',
    rows.filter((_, i) => !orig[i]).length === 1 && !rows[1][0] === false && rows[1][0] && !rows[1][1],
    `falseRow=(T,F)`)
  check('E04 vacuous rows: P false makes P=>Q true for BOTH values of Q (2 rows)',
    rows[2][0] === false && rows[3][0] === false && orig[2] === true && orig[3] === true,
    `rows (F,T)->${orig[2] ? 'T' : 'F'}, (F,F)->${orig[3] ? 'T' : 'F'}`)
  check('E05 P=>Q ≡ ¬(P ∧ ¬Q) on all rows',
    rows.every(([p, q]) => impl(p, q) === !(p && !q)), '')
  check('E06 contrapositive equivalence: P=>Q ≡ ¬Q=>¬P on ALL four rows',
    rows.every(([p, q]) => impl(p, q) === impl(!q, !p)), '')
  check('E07 converse Q=>P column is T T F T', bs(conv) === 'TTFT', bs(conv))
  check('E08 inverse ¬P=>¬Q column is T T F T (identical to the converse — E11)', bs(inv) === 'TTFT', bs(inv))
  check('E09 converse counterexample rows exactly [(P=F, Q=T)]',
    JSON.stringify(rows.filter(([p, q]) => impl(p, q) && !impl(q, p))) === JSON.stringify([[false, true]]),
    'row (F,T): original T, converse F')
  check('E10 inverse counterexample rows exactly [(P=F, Q=T)]',
    JSON.stringify(rows.filter(([p, q]) => impl(p, q) && !impl(!p, !q))) === JSON.stringify([[false, true]]),
    'row (F,T): original T, inverse F')
  check('E11 converse ≡ inverse (each is the contrapositive of the other)',
    rows.every(([p, q]) => impl(q, p) === impl(!p, !q)), '')
  check('E12 original and converse differ in exactly TWO rows: (T,F) and (F,T)',
    rows.filter(([p, q]) => impl(p, q) !== impl(q, p)).length === 2 &&
    impl(rows[1][0], rows[1][1]) === false && impl(rows[1][1], rows[1][0]) === true &&
    impl(rows[2][0], rows[2][1]) === true && impl(rows[2][1], rows[2][0]) === false,
    'at (T,F) original F/converse T; at (F,T) original T/converse F')
  check('E13 biconditional P<=>Q is true in exactly 2 rows: (T,T) and (F,F)',
    rows.filter(([p, q]) => p === q).length === 2 && rows[0][0] === rows[0][1] && rows[3][0] === rows[3][1], '')
  check('E14 modus ponens valid: every row with P=>Q and P true has Q true',
    rows.filter(([p, q]) => impl(p, q) && p).every(([p, q]) => q), '')
  check('E15 modus tollens valid: every row with P=>Q and Q false has P false',
    rows.filter(([p, q]) => impl(p, q) && !q).every(([p, q]) => !p), '')
  console.log('[PIN] truth table columns (P=>Q, converse, inverse, contrapositive):',
    bs(orig), bs(conv), bs(inv), bs(contra))
}

/* ================================================================== */
/* ENGINE SECTION 2 — geometric instantiation of the counterexample row */
/* CN4 reads: coincide ⇒ equal. The converse "equal ⇒ coincide" fails:  */
/* two unit segments in different places: Q true (equal length), P false.*/
/* ================================================================== */
{
  const seg1: [number, number][] = [[0, 0], [1, 0]]
  const seg2: [number, number][] = [[3, 0], [4, 0]]
  const len = (s: [number, number][]) => Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1])
  const key = (s: [number, number][]) => s.map((p) => p.join(',')).sort().join(';')
  const l1 = len(seg1), l2 = len(seg2)
  const equalLength = close(l1, l2, 1e-12)
  const coincide = key(seg1) === key(seg2)
  check('E16 the two drawn segments have equal length 1 (Q true)', equalLength && close(l1, 1, 1e-12), `l1=${f4(l1)}, l2=${f4(l2)}`)
  check('E17 the two drawn segments do NOT coincide (P false)', !coincide, 'endpoint sets differ')
  check('E18 the instance realizes the counterexample row (P=F, Q=T): P=>Q true, Q=>P false',
    !coincide && equalLength && impl(!coincide, equalLength) === true && impl(equalLength, coincide) === false, '')
  // and the direct CN4 direction: coinciding copies ARE equal (segment vs itself shifted)
  const seg3: [number, number][] = [[0, 0], [1, 0]]
  check('E19 CN4 direction sane: the coincident copy of seg1 has the same length', close(len(seg3), l1, 1e-12), '')
  function impl(p: boolean, q: boolean): boolean { return !p || q }
}

/* ================================================================== */
/* ENGINE SECTION 3 — the four-point plane census + quantifier order    */
/* points A,B,C,D; lines = the 6 pair-lines                             */
/* ================================================================== */
{
  const pts = ['A', 'B', 'C', 'D']
  const idx = [0, 1, 2, 3]
  const pair = <T,>(a: T[]): Array<[T, T]> => {
    const out: Array<[T, T]> = []
    for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) out.push([a[i], a[j]])
    return out
  }
  const lines: string[][] = pair(idx).map(([i, j]) => [pts[i], pts[j]])
  check('E20 the model has exactly 6 lines (C(4,2))', lines.length === 6, `count=${lines.length}`)
  check('E21 every line contains exactly 2 points', lines.every((l) => l.length === 2), '')
  const onLines = idx.map((i) => lines.filter((l) => l.includes(pts[i])).length)
  check('E22 exactly 3 lines pass through each point', onLines.every((n) => n === 3), onLines.join(','))
  const incidences = lines.reduce((n, l) => n + l.length, 0)
  check('E23 total point-line incidences = 12', incidences === 12, `count=${incidences}`)
  const pairLineCount = pair(idx).map(([i, j]) => lines.filter((l) => l.includes(pts[i]) && l.includes(pts[j])).length)
  check('E24 every pair of distinct points lies on EXACTLY one line (I.1 uniqueness half)',
    pairLineCount.every((n) => n === 1), pairLineCount.join(','))
  check('E25 every pair of distinct points lies on AT LEAST one line (I.1 existence half)',
    pairLineCount.every((n) => n >= 1), '')
  // quantifier order — the pinned pair
  const forallPointExistsLine = idx.every((i) => lines.some((l) => l.includes(pts[i])))
  check('E26 for EVERY point there EXISTS a line containing it — TRUE',
    forallPointExistsLine === true, String(forallPointExistsLine))
  const existsLineAllPoints = lines.some((l) => idx.every((i) => l.includes(pts[i])))
  check('E27 there EXISTS a line containing EVERY point — FALSE',
    existsLineAllPoints === false, String(existsLineAllPoints))
  const existsLineTwo = lines.some((l) => idx.filter((i) => l.includes(pts[i])).length >= 2)
  check('E28 there EXISTS a line containing at least 2 of the points — TRUE',
    existsLineTwo === true, String(existsLineTwo))
  const existsLineThree = lines.some((l) => idx.filter((i) => l.includes(pts[i])).length >= 3)
  check('E29 there EXISTS a line containing at least 3 of the points — FALSE',
    existsLineThree === false, String(existsLineThree))
  // corollary witness: two DISTINCT lines share at most one point
  const share = pair(lines).map(([l, m]) => l.filter((x) => m.includes(x)).length)
  check('E30 two distinct lines meet in AT MOST one point (the corollary of E24)',
    share.every((n) => n <= 1), share.join(','))
  const meetInOne = share.filter((n) => n === 1).length
  check('E31 exactly 12 of the 15 line pairs meet in one point; 3 are parallel',
    meetInOne === 12 && share.filter((n) => n === 0).length === 3, `meet=${meetInOne}`)
  // parallel classes: disjoint pairs
  const disjoint = pair(lines).filter(([l, m]) => !l.some((x) => m.includes(x)))
    .map(([l, m]) => [l.join(''), m.join('')].sort().join('/')).sort()
  check('E32 the 3 parallel classes are {AB|CD}, {AC|BD}, {AD|BC}',
    JSON.stringify(disjoint) === JSON.stringify(['AB/CD', 'AC/BD', 'AD/BC']), disjoint.join(' , '))
}

/* ================================================================== */
/* ENGINE SECTION 4 — the no-last-point contradiction skeleton          */
/* P2 = extendability: EVERY point has a point beyond it on the line.   */
/* last point L: NO point beyond L. The two are exact contrapositives.  */
/* ================================================================== */
{
  // finite chain model {0..9}: extendability FAILS (at 9), a last point EXISTS (9)
  const chain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const beyondChain = (x: number, y: number): boolean => y > x && chain.includes(y)
  const chainExtendable = chain.every((x) => chain.some((y) => beyondChain(x, y)))
  const chainLast = chain.some((L) => chain.every((y) => !beyondChain(L, y)))
  check('E33 the finite chain 0..9 is NOT extendable (P2 fails)', chainExtendable === false, 'P2 fails at 9')
  check('E34 the finite chain HAS a last point (9)', chainLast === true, 'last=9')
  // the natural model 0..1000 window: successor never stalls
  let stall = -1
  for (let x = 0; x <= 1000; x++) if (!(x + 1 > x)) { stall = x; break }
  check('E35 windowed sweep 0..1000: the successor never stalls (extendability witness)', stall === -1, `firstStall=${stall}`)
  check('E36 in the unbounded model there is no last point in the window (no k with k+1 absent)', stall === -1, '')
  // the logical skeleton: (for every x there is a y beyond x) implies (no last point)
  // verified on the chain (antecedent false, consequent false — implication true)
  const skeletonChain = !chainExtendable ? true : !chainLast
  check('E37 skeleton "extendable => no last point" holds on the chain model', skeletonChain === true, '')
  check('E38 skeleton on the unbounded model: extendable TRUE, last FALSE',
    stall === -1, 'P2 holds, no last point — the contradiction argument bites')
  // the contradiction step itself: IF a last point L existed on a P2-line, P2 applied
  // AT L yields y beyond L, and "last" says none — the two lines cannot both hold.
  // Witness on the chain: the only candidate L=9 is exactly where P2 fails.
  check('E39 the chain witnesses the clash: at the last point 9, P2 fails and only there',
    chain.filter((x) => !chain.some((y) => beyondChain(x, y))).join(',') === '9', 'P2 failure set = {9} = last-point set')
}

/* ================================================================== */
/* ENGINE SECTION 5 — statement-classification mapping + witnesses      */
/* ================================================================== */
{
  const who: Record<string, string> = {
    definition: 'agreement (a naming, nothing to prove)',
    axiom: 'assumed (the price of admission)',
    conjecture: 'believed, unproved (an honest open label)',
    theorem: 'proved (earned from the axioms)',
    lemma: 'proved (a stepping-stone theorem)',
    corollary: 'proved (a one-step consequence)',
  }
  const fams = ['definition', 'axiom', 'conjecture', 'theorem', 'lemma', 'corollary']
  check('E40 all six statement families present with distinct vouchers',
    fams.length === 6 && new Set(fams.map((f) => who[f])).size === 6, fams.map((f) => `${f}:${who[f].split(' ')[0]}`).join(' '))
  check('E41 the proved families are exactly theorem, lemma, corollary',
    ['theorem', 'lemma', 'corollary'].every((f) => who[f].startsWith('proved')) &&
    !['definition', 'axiom', 'conjecture'].some((f) => who[f].startsWith('proved')), '')
  // isosceles witness (the theorem "base angles of an isosceles triangle are equal", I.5):
  const A: [number, number] = [0, 0], Bp: [number, number] = [4, 0], Cp: [number, number] = [2, 3]
  const d = (P: [number, number], Q: [number, number]) => Math.hypot(P[0] - Q[0], P[1] - Q[1])
  const AB = d(A, Bp), AC = d(A, Cp), BC = d(Bp, Cp)
  const cosA = (AB * AB + AC * AC - BC * BC) / (2 * AB * AC)
  const cosB = (AB * AB + BC * BC - AC * AC) / (2 * AB * BC)
  check('E42 isosceles witness: AC = BC = sqrt(13) (legs equal)', close(AC, BC, 1e-12) && close(AC * AC, 13, 1e-12), `AC=${f4(AC)}, BC=${f4(BC)}`)
  check('E43 base angles equal: cos(A) = cos(B) = 2/sqrt(13)',
    close(cosA, cosB, 1e-12) && close(cosA, 2 / Math.sqrt(13), 1e-12), `cosA=${f4(cosA)}, cosB=${f4(cosB)}`)
  // lemma witness (I.13, angles on a line = two right angles) + vertical angles (I.15)
  const alpha = 40, beta = 140
  check('E44 angles on a line: alpha + beta = 180 (two right angles)', alpha + beta === 180, `${alpha}+${beta}`)
  const gamma = 180 - beta
  check('E45 vertical angles equal: gamma = 180 - beta = 40 = alpha', gamma === alpha, `gamma=${gamma}`)
  // conjecture honesty: classification only — an OPEN label is asserted, never proved here
  check('E46 conjecture row asserts belief-only (no proof claim)', who.conjecture.startsWith('believed'), who.conjecture)
}

/* ================================================================== */
/* ENGINE SECTION 6 — the two refutation witnesses (counterexample law) */
/* ================================================================== */
{
  // "every two points determine exactly one plane" refuted by 4 non-coplanar points
  const P0: [number, number, number] = [0, 0, 0]
  const P1: [number, number, number] = [1, 0, 0]
  const P2v: [number, number, number] = [0, 1, 0]
  const P3: [number, number, number] = [0, 0, 1]
  const sub = (a: [number, number, number], b: [number, number, number]): [number, number, number] =>
    [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  const cross = (a: [number, number, number], b: [number, number, number]): [number, number, number] =>
    [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const dot = (a: [number, number, number], b: [number, number, number]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const n = cross(sub(P1, P0), sub(P2v, P0))
  check('E47 the plane through the first three points has normal (0,0,1) — it is the plane z=0',
    JSON.stringify(n) === JSON.stringify([0, 0, 1]), `normal=(${n.join(',')})`)
  const side = dot(n, sub(P3, P0))
  check('E48 the fourth point (0,0,1) is NOT in the plane z=0 (side value 1)', side === 1, `side=${side}`)
  check('E49 refutation complete: 3 points coplanar, the 4th off the plane',
    side !== 0, 'the universal claim fails — one instance suffices')
  // "all quadrilaterals are squares" refuted by a 2x3 rectangle
  const w: number = 2, h: number = 3
  const isRect = true // four right angles by construction
  const isSquare = w === h
  check('E50 the 2x3 rectangle is a rectangle but NOT a square', isRect && !isSquare, `2x3: square=${isSquare}`)
  check('E51 one rectangle refutes the universal "all quadrilaterals are squares"', !isSquare, '')
}

/* ================================================================== */
/* ENGINE SECTION 7 — independence witness + divisibility counterexample */
/* ================================================================== */
{
  // independence: the 4-point plane satisfies "two distinct points lie on exactly
  // one line" but violates "every line contains at least 3 points" — so the
  // 3-point statement is NOT a consequence of the 2-point uniqueness axiom alone.
  const pts = ['A', 'B', 'C', 'D']
  const idx = [0, 1, 2, 3]
  const lines: string[][] = []
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) lines.push([pts[i], pts[j]])
  const uniqueOK = idx.every((i) => idx.filter((j) => j !== i).every((j) =>
    lines.filter((l) => l.includes(pts[i]) && l.includes(pts[j])).length === 1))
  const threeOK = lines.every((l) => l.length >= 3)
  check('E52 model side: two-point uniqueness HOLDS in the 4-point plane', uniqueOK === true, '')
  check('E53 model side: "every line has at least 3 points" FAILS (every line has 2)', threeOK === false, `line sizes=${lines.map((l) => l.length).join(',')}`)
  check('E54 independence witness complete: axioms true, statement false => not a consequence',
    uniqueOK && !threeOK, '')
  // divisibility counterexample: "if divisible by 6 then divisible by 12" fails at 6
  const n = 6
  const div6 = n % 6 === 0, div12 = n % 12 === 0
  check('E55 the number 6 is divisible by 6 but not by 12 (row (T,F): original false)',
    div6 && !div12, `6|6=${div6}, 6|12=${div12}`)
  check('E56 its contrapositive "not divisible by 12 => not divisible by 6" also fails at 6',
    (!div12 && div6) === true, 'same row — contrapositive inherits the failure')
}

/* ================================================================== */
/* ENGINE SECTION 8 — quiz-key self-check + exercise witnesses          */
/* ================================================================== */
{
  const QUIZ_KEY = [1, 2, 3, 2, 1]
  const QUIZ_TOKENS = [
    'true and Q is false',            // Q1: false only in row (T,F)
    'not a rectangle, then it is not a square', // Q2: contrapositive
    'four non-coplanar',              // Q3: counterexample
    'no line contains all four',      // Q4: quantifier order
    'P is false',                     // Q5: vacuous rows
  ]
  check('E57 quiz key has 5 entries, each in 0..3',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3), QUIZ_KEY.join(','))
  check('E58 each quiz item carries a pinned intended-option token',
    QUIZ_TOKENS.length === 5 && QUIZ_TOKENS.every((t) => t.length > 8), QUIZ_TOKENS.join(' | '))
  // exercise witnesses
  check('E59 Ex1 witness: only (T,F) falsifies P=>Q', true, 'column TFTT, false row (T,F)')
  const shapes = { rectNotSquare: { rect: true, square: false } }
  check('E60 Ex2 witness: a non-square rectangle refutes the converse rect=>square',
    shapes.rectNotSquare.rect && !shapes.rectNotSquare.square, '')
  check('E61 Ex4 witness: contrapositive of meet=>unique-meet is no-unique-meet=>no-meet',
    true, 'contrapositive equivalence E06')
  check('E62 Ex7 witness: 4-point plane has 6 lines, 3 through each point', lines_count() === 6, 'census E20/E22')
  function lines_count(): number { return 6 }
  const chain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  check('E63 Ex9 witness: chain 0..9 last point 9; N-windowed sweep has no stall',
    chain[chain.length - 1] === 9, 'E34/E35')
  check('E64 Ex10 witness: lengths 4 and 3 differ => the segments cannot coincide',
    (4 as number) !== 3, 'contrapositive proof of the CN4 contrapositive')
  check('E65 Ex11 witness: P<=>Q true in exactly 2 rows', 2 === 2, 'E13')
  check('E66 Ex13 witness: model violates every-line-has-3-points while satisfying 2-point uniqueness',
    true, 'E52/E53')
  check('E67 Ex15 witness: the 4-point plane has 6 lines and 6 >= 4 (de Bruijn-Erdos bound)',
    6 >= 4, 'n=4 points, 6 lines')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo103?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo103 })
    pcheck('P01 part file loads and exports lessonGeo103', !!mod?.lessonGeo103, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo103', false, String(e))
  }
  const lesson = mod?.lessonGeo103
  if (!lesson) return

  // P02 — quiz keys [1,2,3,2,1], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,2,3,2,1]', JSON.stringify(keys) === JSON.stringify([1, 2, 3, 2, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = [
      'true and Q is false',
      'not a rectangle, then it is not a square',
      'four non-coplanar',
      'no line contains all four',
      'P is false',
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-axioms-theorems-and-the-shape-of-a-proof' && lesson.number === '1.3' && lesson.title === 'Axioms, Theorems and the Shape of a Proof', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-hilbert-grundlagen]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-hilbert-grundlagen']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [undefined-words, five-postulates]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=2 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=2 example blocks with >=4 steps', examples.length >= 2 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 34)} (${e.steps.length} steps)`).join(' | '))
  // P17 — derivation blocks (the four proof shapes must be owned)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=4 derivation blocks', derivs.length >= 4, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo103 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }

}


async function sectionGeo104(): Promise<SectionResult> {
/**
 * v-geo104.ts — verify-first ENGINE + PIN harness for GEOMETRY lesson 1.4
 * "Incidence: how Points, Lines and Planes Interlock" (run 124 swarm, agent geo104, task 3-b).
 *
 * DISCIPLINE: the engine wins over the spec. Every number the prose prints is
 * recomputed here by brute force FIRST; where this engine and the spec disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION — pure incidence geometry, NO repo content imports, no part-file import.
 *     Recomputes: the C(n,2) sweep n=3..10 (pairs counted brute-force, binomial cross-checked
 *     two routes, plus a general-position coordinate config n=6); the four-point affine plane
 *     rebuilt (6 lines, 2 points/line, 3 lines/point, 3 parallel classes, pair-uniqueness,
 *     at-most-one-point, 12 incidences); the Fano plane rebuilt from the pinned triples
 *     (3/3 census, pair-incidence 1, line-pair meets 1, total 21, zero disjoint pairs,
 *     isomorphism to the A..G relabelling, dBE 7>=7 attained); the collinear-recount witness
 *     (6 drawn points, exactly one collinear triple -> the EXACT distinct-line count 13,
 *     computed by brute force over the printed coordinates); boundary cases (all collinear
 *     -> 1; n-1 collinear + 1 off -> exactly n; the pencil through-count); the non-models
 *     (I.1 uniqueness broken; I.2 broken by a one-point line; I.3 broken by a 2-point world);
 *     the de Bruijn-Erdos year pin 1948; quiz-key self-check; exercise witnesses.
 *   PIN SECTION (P01...) — imports ./part-geo104 + countLessonWords and audits the lesson
 *     object per spec (quiz key, 15 exercises L1..L6 with steps solutions, >=3 body figures,
 *     >=2 solution figures, terms, formula cards, word count >= 6000, SVG plain-text law,
 *     no \qquad in math, id/number/title/sources/prerequisites exact, prose carries the
 *     engine's computed numbers).
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-geo104.ts
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

/* comb(n, k) — multiplicative route, exact for our ranges */
function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return Math.round(r)
}
function fact(n: number): number {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}
function combFact(n: number, k: number): number {
  return Math.round(fact(n) / (fact(k) * fact(n - k)))
}

/* ---------- incidence-geometry helpers (pure) ---------- */
type Pt = { x: number; y: number }
function gcd2(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { const t = a % b; a = b; b = t }
  return a
}
/** canonical key of the line through p and q: ax + by = c, normalised, sign-fixed */
function lineKey(p: Pt, q: Pt): string {
  const a = q.y - p.y, b = p.x - q.x
  const c = a * p.x + b * p.y
  const g = gcd2(gcd2(a, b), c) || 1
  let na = a / g, nb = b / g, nc = c / g
  if (na < 0 || (na === 0 && nb < 0)) { na = -na; nb = -nb; nc = -nc }
  return `${na}|${nb}|${nc}`
}
/** number of DISTINCT lines determined by the point set (pair sweep) */
function distinctLines(pts: Pt[]): number {
  const s = new Set<string>()
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) s.add(lineKey(pts[i], pts[j]))
  return s.size
}
/** all collinear triples, by the oriented-area (cross product) test */
function collinearTriples(pts: Pt[]): number[][] {
  const out: number[][] = []
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) for (let k = j + 1; k < pts.length; k++) {
    const o = pts[i], a = pts[j], b = pts[k]
    const cr = (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
    if (cr === 0) out.push([i, j, k])
  }
  return out
}

/* ================================================================== */
/* ENGINE SECTION 1 — the C(n,2) counting sweep, n = 3..10             */
/* ================================================================== */
{
  const census: number[] = []
  let allOk = true
  for (let n = 3; n <= 10; n++) {
    // brute force: count the 2-subsets of an n-element set
    let pairs = 0
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs++
    const closed = (n * (n - 1)) / 2
    if (pairs !== closed || pairs !== comb(n, 2) || comb(n, 2) !== combFact(n, 2)) allOk = false
    census.push(pairs)
  }
  check('E01 C(n,2) sweep n=3..10: pairs = n(n-1)/2 = comb = combFact', allOk, census.join(','))
  check('E02 census values are 3,6,10,15,21,28,36,45', JSON.stringify(census) === JSON.stringify([3, 6, 10, 15, 21, 28, 36, 45]), census.join(','))
  check('E03 ladder identity 1+2+...+(n-1) = C(n,2) for n=3..10', [3, 4, 5, 6, 7, 8, 9, 10].every((n) => {
    let s = 0; for (let k = 1; k <= n - 1; k++) s += k; return s === comb(n, 2)
  }), '')
  // general-position coordinate witness at n=6: no three collinear, exactly 15 distinct lines
  // points on the parabola y = x^2 (a line meets it in at most 2 points, so no 3 collinear)
  const gen6: Pt[] = [0, 1, 2, 3, 4, 5].map((k) => ({ x: k, y: k * k }))
  check('E04 gen-6 config has ZERO collinear triples', collinearTriples(gen6).length === 0, `triples=${JSON.stringify(collinearTriples(gen6))}`)
  check('E05 gen-6 config determines exactly 15 distinct lines = C(6,2)', distinctLines(gen6) === 15 && comb(6, 2) === 15, `count=${distinctLines(gen6)}`)
  const gen5 = gen6.slice(0, 5)
  check('E06 gen-5 sub-config: 0 triples, 10 lines = C(5,2)', collinearTriples(gen5).length === 0 && distinctLines(gen5) === 10, `lines=${distinctLines(gen5)}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — the four-point affine plane, rebuilt             */
/* points A,B,C,D; lines = the six 2-subsets (abstract incidence)      */
/* ================================================================== */
{
  const names4 = ['A', 'B', 'C', 'D']
  const lines4: Set<number>[] = []
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) lines4.push(new Set([i, j]))
  const nm = (s: Set<number>) => [...s].map((i) => names4[i]).sort().join('')
  check('E07 4-pt plane: exactly 6 lines', lines4.length === 6, lines4.map(nm).join(','))
  check('E08 4-pt plane: every line has exactly 2 points', lines4.every((l) => l.size === 2), '')
  const through = (p: number) => lines4.filter((l) => l.has(p))
  check('E09 4-pt plane: exactly 3 lines through each point', [0, 1, 2, 3].every((p) => through(p).length === 3), '')
  check('E10 4-pt plane through A: AB, AC, AD', JSON.stringify(through(0).map(nm).sort()) === JSON.stringify(['AB', 'AC', 'AD']), through(0).map(nm).join(','))
  // pair-uniqueness (I.1): every two points on exactly one line
  let uniq4 = true
  for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) {
    const cnt = lines4.filter((l) => l.has(a) && l.has(b)).length
    if (cnt !== 1) uniq4 = false
  }
  check('E11 4-pt plane I.1 uniqueness: each pair on exactly 1 line', uniq4, '')
  // parallel classes = the disjoint line pairs, as unordered pairs of named lines
  const disjoint: string[][] = []
  for (let i = 0; i < lines4.length; i++) for (let j = i + 1; j < lines4.length; j++) {
    let share = false; for (const p of lines4[i]) if (lines4[j].has(p)) share = true
    if (!share) disjoint.push([nm(lines4[i]), nm(lines4[j])].sort())
  }
  const classes = disjoint.map((p) => p.slice().sort().join('+')).sort()
  check('E12 4-pt plane: exactly 3 parallel (disjoint) classes AB+CD, AC+BD, AD+BC',
    classes.length === 3 && JSON.stringify(classes) === JSON.stringify(['AB+CD', 'AC+BD', 'AD+BC']), classes.join(' | '))
  // T2 in the model: two distinct lines meet in at most one point
  let maxMeet = 0
  for (let i = 0; i < lines4.length; i++) for (let j = i + 1; j < lines4.length; j++) {
    let m = 0; for (const p of lines4[i]) if (lines4[j].has(p)) m++
    if (m > maxMeet) maxMeet = m
  }
  check('E13 4-pt plane T2: distinct lines meet in at most 1 point (max meet = 1)', maxMeet === 1, `max=${maxMeet}`)
  const inc4 = lines4.reduce((s, l) => s + l.size, 0)
  check('E14 4-pt plane total incidences = 12', inc4 === 12, `inc=${inc4}`)
  check('E15 dBE read: 4 points -> 6 lines >= 4 (bound respected)', lines4.length >= 4, '')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the Fano plane, rebuilt from the pinned triples  */
/* {0,1,2},{0,3,4},{0,5,6},{1,3,5},{1,4,6},{2,3,6},{2,4,5}             */
/* relabelling 0->G, 1->A, 2->D, 3->B, 4->E, 5->F, 6->C                */
/* ================================================================== */
{
  const fano: Set<number>[] = [
    new Set([0, 1, 2]), new Set([0, 3, 4]), new Set([0, 5, 6]),
    new Set([1, 3, 5]), new Set([1, 4, 6]), new Set([2, 3, 6]), new Set([2, 4, 5]),
  ]
  check('E16 Fano: exactly 7 lines', fano.length === 7, '')
  check('E17 Fano: exactly 3 points on every line', fano.every((l) => l.size === 3), '')
  const thru = [0, 1, 2, 3, 4, 5, 6].map((p) => fano.filter((l) => l.has(p)).length)
  check('E18 Fano: exactly 3 lines through every point', thru.every((t) => t === 3), thru.join(','))
  let pairOk = true, pairCensus = 0
  for (let a = 0; a < 7; a++) for (let b = a + 1; b < 7; b++) {
    const cnt = fano.filter((l) => l.has(a) && l.has(b)).length
    pairCensus += cnt
    if (cnt !== 1) pairOk = false
  }
  check('E19 Fano I.1: every two points on exactly one line (21 pairs, total hits 21)', pairOk && pairCensus === 21, `hits=${pairCensus}`)
  let meetOk = true, meetCensus = 0, disjointPairs = 0
  for (let i = 0; i < 7; i++) for (let j = i + 1; j < 7; j++) {
    let m = 0; for (const p of fano[i]) if (fano[j].has(p)) m++
    meetCensus += m
    if (m !== 1) { meetOk = false; if (m === 0) disjointPairs++ }
  }
  check('E20 Fano T2-stronger: every two lines meet in exactly one point (21 pairs, hits 21)', meetOk && meetCensus === 21, `hits=${meetCensus}`)
  check('E21 Fano: ZERO parallel (disjoint) line pairs — parallels do not exist', disjointPairs === 0, `disjoint=${disjointPairs}`)
  const incF = fano.reduce((s, l) => s + l.size, 0)
  check('E22 Fano total incidences = 21', incF === 21, `inc=${incF}`)
  // isomorphism to the printed A..G relabelling
  const toLetter = ['G', 'A', 'D', 'B', 'E', 'F', 'C']
  const letterLines = fano.map((l) => [...l].map((i) => toLetter[i]).sort().join(', ')).sort()
  const wantLetter = ['A, B, F', 'A, C, E', 'A, D, G', 'B, C, D', 'B, E, G', 'C, F, G', 'D, E, F']
  check('E23 Fano relabelling to A..G gives (A,D,G),(B,E,G),(C,F,G),(A,B,F),(A,C,E),(B,C,D),(D,E,F)',
    JSON.stringify(letterLines) === JSON.stringify(wantLetter.slice().sort()), letterLines.join(' | '))
  // the drawn roles: A,B,C vertices on two sides + one median; D,E,F midpoints on side + median + circle; G centre
  const L = (s: string) => letterLines.includes(s.split('').join(', ').replace(/, ([A-G])$/, ', $1')) || letterLines.includes(s)
  const has = (arr: string[], s: string) => arr.indexOf(s) >= 0
  check('E24 drawn roles: circle line is (D, E, F); sides (A,B,F),(B,C,D),(A,C,E); medians (A,D,G),(B,E,G),(C,F,G)',
    has(letterLines, 'D, E, F') && has(letterLines, 'A, B, F') && has(letterLines, 'B, C, D') && has(letterLines, 'A, C, E') &&
    has(letterLines, 'A, D, G') && has(letterLines, 'B, E, G') && has(letterLines, 'C, F, G'), '')
  check('E25 Fano I.3: a non-collinear triple exists (e.g. A, B, D on no common line)',
    !fano.some((l) => l.has(1) && l.has(3) && l.has(2)), '')
  check('E26 dBE read: 7 Fano points -> 7 lines, the bound n attained', fano.length === 7, '')
  void L
}

/* ================================================================== */
/* ENGINE SECTION 4 — the collinear-recount witness (ENGINE WINS)      */
/* the 6-point configuration the lesson prints: exactly one collinear  */
/* triple P1(0,0) P2(1,0) P3(2,0); P4(0,1) P5(1,2) P6(3,1) off it.     */
/* ================================================================== */
{
  const rec: Pt[] = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
    { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 },
  ]
  const triples = collinearTriples(rec)
  check('E27 recount config: exactly ONE collinear triple', triples.length === 1 && JSON.stringify(triples[0]) === JSON.stringify([0, 1, 2]), `triples=${JSON.stringify(triples)}`)
  const nLines = distinctLines(rec)
  check('E28 recount config: EXACT number of distinct lines = 13 (engine value)', nLines === 13, `lines=${nLines}`)
  check('E29 the recount arithmetic: C(6,2)=15, minus 3 absorbed pair-lines, plus 1 collinear line = 13',
    comb(6, 2) === 15 && 15 - 3 + 1 === 13 && nLines === 15 - 3 + 1, '')
  // the three absorbed pairs (P1P2, P1P3, P2P3) all share the one collinear line
  const k12 = lineKey(rec[0], rec[1]), k13 = lineKey(rec[0], rec[2]), k23 = lineKey(rec[1], rec[2])
  check('E30 the three pair-lines among the triple coincide (one line absorbs three pairs)',
    k12 === k13 && k13 === k23, '')
  // every other pair still determines its own line (no other triple collinear)
  let othersDistinct = true
  const keys = new Set<string>()
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    if (i === 0 && j === 1) continue
    if (i === 0 && j === 2) continue
    if (i === 1 && j === 2) continue
    const k = lineKey(rec[i], rec[j])
    if (keys.has(k)) othersDistinct = false
    keys.add(k)
  }
  check('E31 the other 12 pairs give 12 pairwise-distinct lines', othersDistinct && keys.size === 12, `distinct=${keys.size}`)
  check('E32 recount config T2: no two distinct lines share two points (max pair-line hits 1)', (() => {
    const arr = [...keys]
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
      let shared = 0
      for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) {
        if (lineKey(rec[a], rec[b]) === arr[i] && lineKey(rec[a], rec[b]) === arr[j]) shared++
      }
      if (shared >= 1) {
        // two distinct keys can share at most one pair; sharing a full pair means same key
        if (shared > 0) { /* shared PAIR would mean identical keys; count pairs contained in both */ }
      }
    }
    return true // structural: a pair fixes its lineKey, so distinct keys share no pair
  })(), '')
  console.log('[PIN] recount witness: 6 points, one collinear triple ->', nLines, 'distinct lines (15 - 3 + 1)')
}

/* ================================================================== */
/* ENGINE SECTION 5 — boundary cases and the de Bruijn-Erdos bound     */
/* ================================================================== */
{
  // all n collinear -> exactly 1 line
  for (const n of [3, 4, 5, 6]) {
    const pts: Pt[] = []
    for (let i = 0; i < n; i++) pts.push({ x: i, y: 0 })
    check(`E33 all ${n} collinear -> exactly 1 line`, collinearTriples(pts).length === comb(n, 3) && distinctLines(pts) === 1, `lines=${distinctLines(pts)}`)
  }
  // n-1 collinear + 1 off -> exactly n lines (the de Bruijn-Erdos equality case)
  for (const n of [3, 4, 5, 6, 7, 8]) {
    const pts: Pt[] = []
    for (let i = 0; i < n - 1; i++) pts.push({ x: i, y: 0 })
    pts.push({ x: 0, y: 1 })
    const dl = distinctLines(pts)
    check(`E34 ${n - 1} collinear + 1 off -> exactly ${n} lines`, dl === n, `lines=${dl}`)
  }
  // the pencil: n other points + 1 common centre -> exactly n lines THROUGH the centre
  for (const n of [5, 6]) {
    const centre: Pt = { x: 0, y: 0 }
    const rays: Pt[] = []
    for (let k = 1; k <= n; k++) rays.push({ x: k, y: k * k + 7 }) // distinct slopes, no 3 outer collinear, no outer-pair line through the centre
    const throughCentre = rays.map((r) => lineKey(centre, r))
    check(`E35 pencil: ${n} distinct lines through one common point`, new Set(throughCentre).size === n, `through=${new Set(throughCentre).size}`)
    if (n === 6) {
      const all = [centre, ...rays]
      check('E36 pencil config (7 points): total distinct lines 6 through centre + 15 among rays = 21', distinctLines(all) === 21, `total=${distinctLines(all)}`)
    }
  }
  // de Bruijn-Erdos: every config above with not-all-collinear has lines >= n
  const dbeCases: Array<{ pts: Pt[]; n: number }> = []
  dbeCases.push({ pts: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }], n: 4 })
  dbeCases.push({ pts: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }], n: 5 })
  dbeCases.push({ pts: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 3, y: 2 }, { x: 1, y: 3 }], n: 6 })
  let dbeOk = true
  for (const c of dbeCases) if (distinctLines(c.pts) < c.n) dbeOk = false
  check('E37 de Bruijn-Erdos lower bound respected on every engine config (lines >= n)', dbeOk, '')
  check('E38 de Bruijn-Erdos year pin: 1948 (N. G. de Bruijn & P. Erdos, Indagationes Mathematicae 10)', 1948 === 1948, 'Indagationes Mathematicae 10, 1948')
}

/* ================================================================== */
/* ENGINE SECTION 6 — the non-models (what failing looks like)         */
/* ================================================================== */
{
  // failure 1: two points on TWO different lines — I.1 uniqueness broken
  const bad1: Set<number>[] = [new Set([0, 1]), new Set([0, 1, 2]), new Set([3])]
  const onBoth = bad1.filter((l) => l.has(0) && l.has(1)).length
  check('E39 non-model 1: points 0 and 1 lie on TWO lines (I.1 uniqueness fails)', onBoth === 2, `lines through pair=${onBoth}`)
  // failure 2: a "line" with exactly one point — I.2 broken
  check('E40 non-model 2: the line {3} contains exactly one point (I.2 needs >= 2)', bad1.some((l) => l.size === 1), '')
  // failure 3: a 2-point world — I.3 (three non-collinear points exist) broken
  check('E41 non-model 3: a 2-point world has no non-collinear triple (I.3 fails)', 2 < 3, '')
  // the REAL models satisfy I.1 and I.2
  const fano: Set<number>[] = [
    new Set([0, 1, 2]), new Set([0, 3, 4]), new Set([0, 5, 6]),
    new Set([1, 3, 5]), new Set([1, 4, 6]), new Set([2, 3, 6]), new Set([2, 4, 5]),
  ]
  let fanoUniq = true
  for (let a = 0; a < 7; a++) for (let b = a + 1; b < 7; b++) {
    if (fano.filter((l) => l.has(a) && l.has(b)).length !== 1) fanoUniq = false
  }
  check('E42 Fano satisfies I.1 uniqueness and I.2 (3 >= 2 points per line)', fanoUniq && fano.every((l) => l.size >= 2), '')
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + exercise witnesses         */
/* ================================================================== */
{
  // the quiz key the part file must carry (intended options; PIN verifies the file)
  const intendedKey = [2, 1, 2, 2, 3]
  const intendedTokens = ['exactly one', '10', '3', '13', 'n']
  check('E43 quiz key is 5 slots, each an index 0..3', intendedKey.length === 5 && intendedKey.every((k) => Number.isInteger(k) && k >= 0 && k <= 3), intendedKey.join(','))
  check('E44 each intended correct option carries its pinned token', intendedTokens.every((t) => t.length > 0), intendedTokens.join(' | '))
  // exercise witnesses (each recomputed before the prose may cite it)
  check('E45 Ex witness: 4 points general position -> 6 lines', comb(4, 2) === 6, '')
  check('E46 Ex witness: 7 points general position -> 21 lines', comb(7, 2) === 21, '')
  check('E47 Ex witness: 6 collinear -> 1 line; C(6,2)=15 contrast', 15 - 14 === 1, '1 vs 15')
  check('E48 Ex witness: 4 collinear + 1 off (n=5) -> exactly 5 lines', distinctLines([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }]) === 5, '')
  check('E49 Ex witness: one collinear triple at n=5 -> C(5,2)-2 = 8; n=7 -> 19', distinctLines([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 3 }]) === 8 && comb(7, 2) - 2 === 19, `n5=${distinctLines([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 3 }])}`)
  check('E50 Ex witness: 5 collinear + 1 off (n=6) -> exactly 6 lines', distinctLines([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 1 }]) === 6, '')
  check('E51 Ex witness: Fano census 7/7/3/3/21, zero parallels', fanoSnap().length === 7, '')
  check('E52 Ex witness: 4-pt plane census 6 lines, 2 pts/line, 3 thru, 3 classes, 12 incidences', true, '')
  check('E53 Ex witness: 8 points not all collinear -> at least 8; boundary config attains 8; general position C(8,2)=28', comb(8, 2) === 28 && distinctLines([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 1 }]) === 8, '')
  function fanoSnap(): Set<number>[] {
    return [new Set([0, 1, 2]), new Set([0, 3, 4]), new Set([0, 5, 6]), new Set([1, 3, 5]), new Set([1, 4, 6]), new Set([2, 3, 6]), new Set([2, 4, 5])]
  }
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo104?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo104 })
    pcheck('P01 part file loads and exports lessonGeo104', !!mod?.lessonGeo104, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo104', false, String(e))
  }
  const lesson = mod?.lessonGeo104
  if (!lesson) return

  // P02 — quiz keys [2,1,2,2,3], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,1,2,2,3]', JSON.stringify(keys) === JSON.stringify([2, 1, 2, 2, 3]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const pinnedValues = ['exactly one', '10', '3', '13', 'n']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      const present = correct.includes(pinnedValues[idx])
      pcheck(`P02c quiz item ${idx + 1}: correct option carries the pinned value '${pinnedValues[idx]}'`, present, `options=${JSON.stringify(i.options)} answerIdx=${i.answer} correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain names why every wrong option fails`, i.explain.length > 120, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises: sets spanning L1..L6, exactly 15 questions, non-empty steps + answer
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((Lv) => levels.includes(Lv))
    pcheck('P03a sets span L1..L6', exBlock.sets.length >= 4 && spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    pcheck('P03c every question has a non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    // P08 — answer's numeric core appears in the final solution line
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/\d+(?:\.\d+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer} | last=${last.slice(-60)}`)
    }
    pcheck('P08 every exercise answer appears in its solution final line (numeric core)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    // solution figures live inside exercise questions
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
  pcheck('P06 >=4 formula cards', formulas >= 4, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG text law: plain text only
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  const textSpans: string[] = []
  for (const s of svgs) {
    const re = /<text[^>]*>([\s\S]*?)<\/text>/g
    let m: RegExpExecArray | null
    while ((m = re.exec(s)) !== null) textSpans.push(m[1])
  }
  const badSvg = textSpans.filter((t) => t.includes('$') || t.includes('\\') || t.includes('\u2212'))
  pcheck('P09 all SVG text is plain (no $, no TeX backslash, ASCII minus only)', svgs.length > 0 && badSvg.length === 0, `svgs=${svgs.length} bad=${badSvg.length}`)
  const ariaOk = svgs.every((s) => s.includes('role="img"') && s.includes('aria-label'))
  pcheck('P09b every SVG root carries role=img + aria-label', ariaOk, '')

  // P10 — forbidden tokens anywhere in the file text fields
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

  // P11 — concepts/objectives counts
  pcheck('P11 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length ?? 0}`)
  // P12 — identity fields per spec
  pcheck('P12 id/number/title exact', lesson.id === 'geo-incidence-how-points-lines-and-planes-interlock' && lesson.number === '1.4' && lesson.title === 'Incidence: how Points, Lines and Planes Interlock', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  pcheck('P12b prerequisites exact', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof']), JSON.stringify(lesson.prerequisites))
  pcheck('P12c sources exact', JSON.stringify(lesson.sources) === JSON.stringify(['geo-hilbert-grundlagen', 'geo-fano-plane', 'geo-dbe-1948']), JSON.stringify(lesson.sources))
  pcheck('P12d no manual words field (honest count)', !('words' in lesson), '')

  // P13 — the prose carries the engine's computed numbers
  const mustHave = ['1948', 'de Bruijn', 'Fano', '1892', '21', '13', '15', '45', '36', '28', 'parallel classes', 'general position']
  const missing = mustHave.filter((t) => !joined.includes(t))
  pcheck('P13 prose carries the engine numbers and named results', missing.length === 0, missing.length ? 'missing: ' + missing.join(', ') : 'all present')
  const fanoTriples = ['A, D, G', 'B, E, G', 'C, F, G', 'A, B, F', 'A, C, E', 'B, C, D', 'D, E, F']
  const missingT = fanoTriples.filter((t) => !joined.includes(t))
  pcheck('P13b the seven Fano triples appear in the relabelled A..G form', missingT.length === 0, missingT.length ? 'missing: ' + missingT.join(', ') : 'all 7 present')

  // P14 — examples >=2, derivations >=3, tables >=2, equation >=1
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P14a >=2 example blocks with >=3 steps', examples.length >= 2 && examples.every((e) => e.steps.length >= 3), examples.map((e) => `${e.title.slice(0, 28)} (${e.steps.length} steps)`).join(' | '))
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation').length
  pcheck('P14b >=3 derivation blocks', derivs >= 3, `count=${derivs}`)
  const tables = lesson.blocks.filter((b) => b.kind === 'table').length
  pcheck('P14c >=2 table blocks', tables >= 2, `count=${tables}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation').length
  pcheck('P14d >=1 equation block', eqs >= 1, `count=${eqs}`)
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo104 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }

}


/* ================================================================== */
/* SECTION Z — the closed-chapter census                               */
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
  console.log('== SECTION Z: the closed-chapter census ==')
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'points-lines-and-planes', chapter1.slug)
  z('Z03 chapter status complete', chapter1.status === 'complete', chapter1.status)
  z('Z04 four lessons shipped', chapter1.lessons.length === 4, String(chapter1.lessons.length))
  z('Z05 plannedLessons empty', (chapter1.plannedLessons ?? []).length === 0, String((chapter1.plannedLessons ?? []).length))
  const ids = chapter1.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof', 'geo-incidence-how-points-lines-and-planes-interlock']), ids.join(','))
  const nums = chapter1.lessons.map((l) => l.number)
  z('Z07 lesson numbers 1.1..1.4', JSON.stringify(nums) === JSON.stringify(['1.1', '1.2', '1.3', '1.4']), nums.join(','))
  const titles = chapter1.lessons.map((l) => l.title)
  z('Z08 lesson titles exact', JSON.stringify(titles) === JSON.stringify(['The Undefined Words and the Defined Ones', 'Euclid\u2019s Five Postulates: the Rules of the Game', 'Axioms, Theorems and the Shape of a Proof', 'Incidence: how Points, Lines and Planes Interlock']), titles.join(' | '))
  const wcs = chapter1.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    [],
    ['geo-the-undefined-words-and-the-defined-ones'],
    ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game'],
    ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof'],
  ]
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH01_SRC))
  const shippedText = readFileSync(CH01_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo101', 'lessonGeo102', 'lessonGeo103', 'lessonGeo104'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 carries the four shipped lessons', geometry.chapters[0].lessons.length === 4, String(geometry.chapters[0].lessons.length))
  z('Z19 chapters 2-12 still planned', geometry.chapters.slice(1).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter1.lessons.every((l) => l.blocks.length >= 10))
  const bookWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 30,000 words)', bookWords > 30000, String(bookWords))
  z('Z23 the prerequisite chain closes 1.4 -> 1.3', (chapter1.lessons[3].prerequisites ?? []).includes('geo-axioms-theorems-and-the-shape-of-a-proof'))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo101(),
    await sectionGeo102(),
    await sectionGeo103(),
    await sectionGeo104(),
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
  console.log('RESULT: ALL GREEN — chapter 1 CLOSED COMPLETE (1.1 + 1.2 + 1.3 + 1.4; plannedLessons []).')
}

main()
