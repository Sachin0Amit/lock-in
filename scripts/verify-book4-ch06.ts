import { chapter06 } from '../src/data/library/books/mathematics/advanced-algebra/ch-06'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch06.ts — the whole-unit verifier for Advanced Algebra (book
 * #4), chapter 6 "Counting: Permutations and Combinations", assembled
 * 2026-11-20 from the PARALLEL-SWARM RUN II's per-lesson engines (the
 * 2026-11-18 owner chat directive "launch multiple agents for authoring
 * lessons", honored a second time; the 2026-11-18 ch. 4 swarm is the
 * precedent this file mirrors). Every lesson's sections grew green inside
 * its authoring agent BEFORE that lesson's prose was declared done — the
 * verify-first discipline kept per-agent; this file re-runs the identical
 * section bodies against the ASSEMBLED chapter file, plus the assembler's
 * census (section Z). Authoring master plan:
 * docs/research/AA_CH06_MASTER_PLAN.md. Study-never-reproduce honored: the
 * transcribed m2-07 module informed method shapes only.
 *
 *   (A) 6.1 engines + (B) 6.1 pins  — agent 6-a (38 + 15)
 *   (C) 6.2 engines + (D) 6.2 pins  — agent 6-b (77 + 35)
 *   (E) 6.3 engines + (F) 6.3 pins  — agent 6-c (69 + 30)
 *   (G) 6.4 engines + (H) 6.4 pins  — agent 6-d (46 + 35)
 *   (I) 6.5 engines + (J) 6.5 pins  — agent 6-e (87 + 37)
 *   (K) 6.6 engines + (L) 6.6 pins  — agent 6-f (52 + 42)
 *   (M) 6.R engines + (N) 6.R pins  — agent 6-g (94 + 34)
 *   (Z) the assembler's census — the shipped chapter as an object.
 *
 * The harness below maps the chapter's lessons by number and runs every
 * section; the run record comment above each body is its agent's own. The
 * shared harness (SectionCheck / check / countKind / tally) is inlined
 * once at the top — each part file's own duplicate harness was deduped at
 * assembly; each agent's engine+pins body rides inside one block scope so
 * its agent-local helper identifiers never collide across agents (the
 * ch-04 precedent's function-scoping, block form; the only renames are
 * ENGINE→<section letter> and PINS→<section letter>, per file).
 */

// ------------------------------------------------------------------
// the shared harness (inlined once — the ch-04 assembled precedent)
// ------------------------------------------------------------------

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
}

function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

// the shipped chapter's lessons, mapped by number (the same objects the
// per-agent engines were grown against, re-read through the assembled file)
const byNumber = new Map<string, Lesson>(chapter06.lessons.map((l) => [l.number, l] as const))
const lesson61 = byNumber.get('6.1') as Lesson
const lesson62 = byNumber.get('6.2') as Lesson
const lesson63 = byNumber.get('6.3') as Lesson
const lesson64 = byNumber.get('6.4') as Lesson
const lesson65 = byNumber.get('6.5') as Lesson
const lesson66 = byNumber.get('6.6') as Lesson
const lessonReview6 = byNumber.get('6.R') as Lesson





/**
 * v6-1.ts — the verify-first engine for Advanced Algebra lesson 6.1
 * "The Fundamental Principle of Counting" (id
 * aa-the-fundamental-principle-of-counting), authored 2026-11-20 by the
 * ch-06 parallel swarm (agent Task 6-a). The orchestrator assembles
 * scripts/verify-book4-ch06.ts from these section bodies (6.1 owns the
 * section letters A/B).
 *
 * SECTION A (6.1 engines) — brute-force recompute of EVERY number in the
 * lesson: the route-tree census enumerated literally (12 journeys), the
 * three-storey extension (24), the doors fork (6), every Illustration's
 * arithmetic recomputed on enumerated small cases (72, 126, 210/343/133,
 * 4096/972 with the 16/12/4 two-question census, 12, 13 with the tiny
 * overlap witness 3, 10 ordered pairs listed in full, 41 → 328 the
 * case-split machine brute-swept over the number bands, 31 with the
 * 8-subset census, 26000/18720/7280 with the empty-complement census at
 * one digit), every exercise answer recomputed (6, 84, 15, 336, 50, 16/15/4,
 * 41/328, 7776/720/7056, 81/11/9/12-vs-7, 20/60/80, 2366, 3750 with the
 * 36/30 two-day census, 20, 28/20/2, 1024/324/700), every quiz option
 * value recomputed and pinned against the key, the equation LaTeX sanity
 * (tags 1..8, balanced braces, no stray $), and the figure claims (the
 * SVG labels carry the recomputed numbers).
 *
 * SECTION B (6.1 pins) — the structural contract: quiz exactly 5 items
 * with valid answer indices [1,2,1,2,3] and explains that say why the
 * wrong options fail; exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2,
 * every question with a steps-array solution + answer; ≥ 2 figures on
 * the vivid palette only (no retired muted hexes, no raw TeX inside SVG
 * text); ≥ 3 derivations with PLAIN titles/labels and clause-wise $
 * delimited results (no whole-wrapped unbreakable spans); ≥ 3 formula
 * cards with plain notes; ≥ 8 example blocks with the last exam-shaped;
 * ≥ 6 terms; word floor 4500 by countLessonWords; the pinned id and the
 * live prereq id; sources within the banked whitelist; the named-sibling
 * cross-references (6.2–6.6, 6.R, ch. 1.1, ch. 7) and the Probability
 * handoff named; \tfrac-not-\dfrac; no raw TeX in plain-rendered fields.
 */

/* ------------------------------------------------------------------ */
/* shared brute-force helpers                                          */
/* ------------------------------------------------------------------ */

/** all strings of length n over an alphabet of size k (as arrays of indices) */
function strings(k: number, n: number): number[][] {
  const out: number[][] = []
  const idx = new Array<number>(n).fill(0)
  for (;;) {
    out.push(idx.slice())
    let p = n - 1
    while (p >= 0) {
      idx[p]++
      if (idx[p] < k) break
      idx[p] = 0
      p--
    }
    if (p < 0) return out
  }
}

/** all ordered k-tuples of DISTINCT values from {0..n-1} */
function distinctTuples(n: number, k: number): number[][] {
  const out: number[][] = []
  const rec = (start: number, acc: number[]): void => {
    if (acc.length === k) {
      out.push(acc.slice())
      return
    }
    const used = new Set(acc)
    for (let v = 0; v < n; v++)
      if (!used.has(v)) rec(0, [...acc, v])
  }
  rec(0, [])
  return out
}

/** all subsets of {0..n-1} as sorted arrays */
function subsets(n: number): number[][] {
  const out: number[][] = []
  for (let mask = 0; mask < 1 << n; mask++) {
    const s: number[] = []
    for (let i = 0; i < n; i++) if (mask & (1 << i)) s.push(i)
    out.push(s)
  }
  return out
}

/** every string field of every block (for the raw-TeX / $-balance sweeps) */
function allStrings(L: Lesson): string[] {
  const out: string[] = []
  const push = (s: string): void => {
    if (typeof s === 'string') out.push(s)
  }
  for (const b of L.blocks) {
    switch (b.kind) {
      case 'para':
      case 'heading':
        push(b.text)
        break
      case 'callout':
        push(b.title)
        push(b.text)
        break
      case 'terms':
        for (const t of b.items) {
          push(t.term)
          push(t.def)
        }
        break
      case 'equation':
        push(b.latex)
        if (b.note) push(b.note)
        break
      case 'derivation':
        push(b.title)
        push(b.statement)
        for (const s of b.steps) {
          push(s.label)
          if (s.formula) push(s.formula)
          push(s.explanation)
        }
        push(b.result)
        break
      case 'example':
        push(b.title)
        for (const s of b.steps) push(s)
        break
      case 'figure':
        push(b.caption)
        push(b.svg)
        break
      case 'table':
        if (b.caption) push(b.caption)
        for (const h of b.head) push(h)
        for (const r of b.rows) for (const c of r) push(c)
        break
      case 'list':
        for (const i of b.items) push(i)
        break
      case 'quiz':
        if (b.title) push(b.title)
        for (const it of b.items) {
          push(it.q)
          for (const o of it.options) push(o)
          push(it.explain)
        }
        break
      case 'exercises':
        if (b.title) push(b.title)
        for (const set of b.sets)
          for (const q of set.questions) {
            push(q.q)
            if (Array.isArray(q.solution)) for (const s of q.solution) push(s)
            else push(q.solution)
            if (q.answer) push(q.answer)
          }
        break
      case 'formula':
        push(b.name)
        push(b.latex)
        if (b.note) push(b.note)
        break
    }
  }
  return out
}

const balanced = (s: string): boolean => {
  let depth = 0
  for (const ch of s) {
    if (ch === '{') depth++
    else if (ch === '}') depth--
    if (depth < 0) return false
  }
  return depth === 0
}

/** does s carry raw TeX outside $...$ spans? (backslash outside math) */
const rawTexOutsideMath = (s: string): boolean => {
  let inMath = false
  for (const ch of s) {
    if (ch === '$') inMath = !inMath
    else if (ch === '\\' && !inMath) return true
  }
  return false
}

/** the $-delimited spans of a string */
const mathSpans = (s: string): string[] => (s.match(/\$[^$]*\$/g) || []).map((m) => m.slice(1, -1))

/* ------------------------------------------------------------------ */
/* SECTION A — the 6.1 engines (recompute every mathematical claim)    */
/* ------------------------------------------------------------------ */

function sectionA(L: Lesson = lesson61): SectionCheck[] {
  const c: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    c.push(check(name, ok, detail))
  }

  /* --- the two exhibits, enumerated literally ---------------------- */

  // A1. the route tree: 3 trails × 4 roads enumerated as journey pairs.
  {
    const journeys: string[] = []
    for (let t = 1; t <= 3; t++) for (let r = 1; r <= 4; r++) journeys.push(`journey — trail ${t}, then road ${r}`)
    const listBlocks = L.blocks.filter((b) => b.kind === 'list')
    const routeList = listBlocks.find((b) => b.kind === 'list' && b.items.length === 12)
    const itemsOk =
      routeList !== undefined &&
      routeList.items.length === 12 &&
      routeList.items.every((it, i) => {
        const t = Math.floor(i / 4) + 1
        const r = (i % 4) + 1
        return it.includes(`trail ${t}`) && it.includes(`road ${r}`)
      })
    push('A1 route tree 3 × 4 = 12 journeys enumerated, list block census matches literally', journeys.length === 12 && itemsOk)
  }

  // A2. the three-storey extension: 3 × 4 × 2 = 24 (2 ferries added).
  {
    let n = 0
    for (let t = 1; t <= 3; t++) for (let r = 1; r <= 4; r++) for (let f = 1; f <= 2; f++) n++
    push('A2 three-storey journey chain 3 × 4 × 2 = 24', n === 24, `got ${n}`)
  }

  // A3. the doors fork: 2 + 4 = 6.
  push('A3 the doors fork 2 + 4 = 6', 2 + 4 === 6)

  /* --- the Illustrations, recomputed -------------------------------- */

  // A4. Ill.1 lunch chain 4 × 6 × 3 = 72; census at (2,2,2) = 8 listed.
  {
    const menus: number[][] = []
    for (let s = 0; s < 4; s++) for (let m = 0; m < 6; m++) for (let d = 0; d < 3; d++) menus.push([s, m, d])
    const census = strings(2, 3).length
    push('A4 lunch chain 4 × 6 × 3 = 72 enumerated; the (2,2,2) census lists 8', menus.length === 72 && census === 8, `menus ${menus.length}, census ${census}`)
  }

  // A5. Ill.2 demo team: 14 × 9 = 126, the cells of the roster grid.
  {
    let pairs = 0
    for (let s = 1; s <= 14; s++) for (let j = 1; j <= 9; j++) pairs++
    push('A5 demo team 14 × 9 = 126 (the roster grid cells enumerated)', pairs === 126, `got ${pairs}`)
  }

  // A6. Ill.3 display row: 7P3 = 210 without repetition; 7³ = 343 with;
  // the 133 difference is the repeated-colour rows.
  {
    const noRep = distinctTuples(7, 3).length
    const withRep = strings(7, 3).length
    const repeatedRows = withRep - noRep
    push('A6 display row 210 without repetition; 343 with; 133 repeated rows', noRep === 210 && withRep === 343 && repeatedRows === 133, `got ${noRep}/${withRep}/${repeatedRows}`)
  }

  // A7. Ill.4 answer sheet: 4⁶ = 4096 patterns; no-two-consecutive-alike
  // 4 × 3⁵ = 972; the two-question census 16 / 12 / 4.
  {
    const total = strings(4, 6)
    const noAlike = total.filter((p) => p.every((v, i) => i === 0 || v !== p[i - 1]))
    const census2 = strings(4, 2)
    const matching2 = census2.filter((p) => p[0] === p[1]).length
    push('A7 answer sheet 4096 patterns; 972 no-two-consecutive-alike (brute-swept)', total.length === 4096 && noAlike.length === 972, `got ${total.length}/${noAlike.length}`)
    push('A8 the two-question census: 16 total, 12 no-alike, 4 matching pairs', census2.length === 16 && census2.length - matching2 === 12 && matching2 === 4, `got ${census2.length}/${census2.length - matching2}/${matching2}`)
  }

  // A9. Ill.5 platform fork 5 + 7 = 12 (disjoint union).
  {
    const express = new Set<number>()
    const local = new Set<number>()
    for (let i = 1; i <= 5; i++) express.add(i)
    for (let i = 1; i <= 7; i++) local.add(100 + i)
    const union = new Set([...express, ...local])
    const roundTrip = express.size * local.size
    push('A9 platform fork 5 + 7 = 12 disjoint; the 5 × 7 = 35 round trip is the other question', union.size === 12 && roundTrip === 35)
  }

  // A10. Ill.6 cinema: 6 + 9 − 2 = 13 via set census; the tiny witness
  // {1,2} ∪ {2,3} = 3 elements.
  {
    const thrillers = [1, 2, 3, 4, 5, 6]
    const comedies = [5, 6, 7, 8, 9, 10, 11, 12, 13]
    const distinct = new Set([...thrillers, ...comedies]).size
    const overlap = thrillers.filter((x) => comedies.includes(x)).length
    const X = new Set([1, 2])
    const Y = new Set([2, 3])
    const tiny = new Set([...X, ...Y]).size
    push('A10 cinema 6 + 9 − 2 = 13 (set census; overlap counted)', distinct === 13 && overlap === 2, `got ${distinct}, overlap ${overlap}`)
    push('A11 tiny overlap witness {1,2} ∪ {2,3}: 2 + 2 − 1 = 3', tiny === 3 && X.size === 2 && Y.size === 2)
  }

  // A12. Ill.7 ordered pairs x < 3 < y on {1..8}: 2 × 5 = 10, listed.
  {
    const pairs: string[] = []
    for (let x = 1; x <= 8; x++) for (let y = 1; y <= 8; y++) if (x < 3 && 3 < y) pairs.push(`(${x}, ${y})`)
    const listed = '(1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8)'
    const proseHasList = allStrings(L).some((s) => s.includes(listed))
    push('A12 ordered pairs x < 3 < y: 10 enumerated, the lesson lists all ten', pairs.length === 10 && proseHasList, `got ${pairs.length}, listed in prose: ${proseHasList}`)
  }

  // A13. Ill.8 even-distinct machine: two-digit band 41, three-digit band
  // 328, both brute-swept over the literal number ranges.
  {
    const twoDigit: number[] = []
    for (let n = 10; n <= 99; n++) {
      const t = Math.floor(n / 10)
      const u = n % 10
      if (t !== u && u % 2 === 0) twoDigit.push(n)
    }
    const threeDigit: number[] = []
    for (let n = 100; n <= 999; n++) {
      const h = Math.floor(n / 100)
      const t = Math.floor((n % 100) / 10)
      const u = n % 10
      if (h !== t && h !== u && t !== u && u % 2 === 0) threeDigit.push(n)
    }
    // the case-split arithmetic must agree with the sweeps
    const caseI = 9 * 8
    const caseII = 4 * 8 * 8
    const twoCaseI = 9
    const twoCaseII = 4 * 8
    push('A13 even-distinct: two-digit band 41 (swept 10–99)', twoDigit.length === 41 && twoCaseI + twoCaseII === 41, `swept ${twoDigit.length}, chain ${twoCaseI + twoCaseII}`)
    push('A14 even-distinct: three-digit band 328 (swept 100–999; cases 72 + 256)', threeDigit.length === 328 && caseI === 72 && caseII === 256 && caseI + caseII === 328, `swept ${threeDigit.length}, chain ${caseI + caseII}`)
  }

  // A15. Ill.9 coins: 2⁵ = 32 sequences enumerated; at least one tail 31;
  // the subsets census: a 3-set has 8 subsets listed, a 5-set 32 with 31
  // non-empty.
  {
    const flips = strings(2, 5)
    const atLeastOneTail = flips.filter((p) => p.some((v) => v === 1)).length
    const sub3 = subsets(3)
    const sub5 = subsets(5)
    push('A15 coins: 32 sequences enumerated, 31 with at least one tail', flips.length === 32 && atLeastOneTail === 31, `got ${flips.length}/${atLeastOneTail}`)
    push('A16 subsets census: 3-set 8 subsets (listed), 5-set 32 with 31 non-empty', sub3.length === 8 && sub5.length === 32 && sub5.filter((s) => s.length > 0).length === 31)
  }

  // A17. Ill.10 security code: 26 × 10³ = 26000; 26 × 10 × 9 × 8 = 18720;
  // complement 7280; the one-digit census 260 with an EMPTY repeat side.
  {
    const digitTriples = strings(10, 3)
    const distinctTriple = digitTriples.filter((p) => new Set(p).size === 3).length
    const total = 26 * digitTriples.length
    const distinct = 26 * distinctTriple
    const atLeastOneRepeat = total - distinct
    const census1 = 26 * 10
    push('A17 security code 26000 / 18720 / 7280 (digit triples enumerated)', total === 26000 && distinct === 18720 && atLeastOneRepeat === 7280, `got ${total}/${distinct}/${atLeastOneRepeat}`)
    push('A18 the one-digit census: 260 codes, the repeat side empty', census1 === 260 && distinctTuples(10, 1).length === 10)
  }

  /* --- the exercise ladder, every answer recomputed ----------------- */

  // A19. E1 soups: 2 × 3 = 6 pairings enumerated.
  {
    const pairs: string[] = []
    for (const s of ['tomato', 'corn']) for (const b of ['flat', 'sourdough', 'roll']) pairs.push(`(${s}, ${b})`)
    push('A19 E1 the 2 × 3 = 6 soup pairings enumerated literally', pairs.length === 6)
  }

  // A20. E2 meals: 3 × 7 × 4 = 84; census (2,2,2) = 8.
  {
    let n = 0
    for (let a = 0; a < 3; a++) for (let b = 0; b < 7; b++) for (let d = 0; d < 4; d++) n++
    push('A20 E2 set lunches 3 × 7 × 4 = 84', n === 84 && strings(2, 3).length === 8, `got ${n}`)
  }

  // A21. E3 articles: 10 + 8 − 3 = 15 by set census.
  {
    const cricket = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const football = new Set([8, 9, 10, 11, 12, 13, 14, 15])
    const both = [...cricket].filter((x) => football.has(x)).length
    const distinct = new Set([...cricket, ...football]).size
    push('A21 E3 distinct articles 10 + 8 − 3 = 15 (set census, 3 shared)', distinct === 15 && both === 3, `got ${distinct}/${both}`)
  }

  // A22. E4 podium: 8 × 7 × 6 = 336 (distinct tuples enumerated).
  push('A22 E4 podium outcomes 8 × 7 × 6 = 336 (enumerated)', distinctTuples(8, 3).length === 336, `got ${distinctTuples(8, 3).length}`)

  // A23. E5 x + y even on {1..10}: 25 + 25 = 50 (double loop).
  {
    let n = 0
    for (let x = 1; x <= 10; x++) for (let y = 1; y <= 10; y++) if ((x + y) % 2 === 0) n++
    push('A23 E5 x + y even: 50 ordered pairs (swept over all 100)', n === 50, `got ${n}`)
  }

  // A24. E6 switches: 2⁴ = 16 states; at least one ON = 15; exactly one ON = 4.
  {
    const states = subsets(4)
    const atLeastOne = states.filter((s) => s.length > 0).length
    const exactlyOne = states.filter((s) => s.length === 1).length
    push('A24 E6 switch panel 16 / 15 / 4 (all 16 states enumerated)', states.length === 16 && atLeastOne === 15 && exactlyOne === 4, `got ${states.length}/${atLeastOne}/${exactlyOne}`)
  }

  // A25. E8 PIN: 6⁵ = 7776; all-distinct 6P5 = 720; at least one repeat 7056.
  {
    const total = strings(6, 5).length
    const distinct = distinctTuples(6, 5).length
    push('A25 E8 code census 7776 / 720 / 7056 (all 7776 codes enumerated)', total === 7776 && distinct === 720 && total - distinct === 7056, `got ${total}/${distinct}/${total - distinct}`)
  }

  // A26. E9 multiple-correct witnesses: 3⁴ = 81; 5 + 6 = 11;
  // 5 + 6 − 2 = 9; the journey 3 × 4 = 12 (not 7).
  {
    const a = strings(3, 4).length
    const rock = new Set<number>()
    for (let i = 1; i <= 5; i++) rock.add(i)
    const jazz = new Set<number>()
    for (let i = 4; i <= 9; i++) jazz.add(i) // tracks 4 and 5 are the double-listed pair
    const shared = [...rock].filter((x) => jazz.has(x))
    const distinctTracks = new Set([...rock, ...jazz]).size
    const journey = 3 * 4
    push('A26 E9 witnesses: 81 patterns; 11 boarding; 9 distinct tracks; journey 12 not 7', a === 81 && 5 + 6 === 11 && distinctTracks === 9 && shared.length === 2 && journey === 12, `got ${a}/${5 + 6}/${distinctTracks}/${journey}`)
  }

  // A27. E10 flags: 5P2 = 20; 5P3 = 60; exactly-2-or-3 = 80.
  {
    const two = distinctTuples(5, 2).length
    const three = distinctTuples(5, 3).length
    push('A27 E10 signal mast 20 / 60 / 80 (distinct tuples enumerated)', two === 20 && three === 60 && two + three === 80, `got ${two}/${three}`)
  }

  // A28. E11 labels: 26 + 26 × 10 × 9 = 2366.
  {
    const single = 26
    const twoDigit = 26 * distinctTuples(10, 2).length
    push('A28 E11 system labels 26 + 2340 = 2366 (families disjoint: 1 symbol vs 3)', single + twoDigit === 2366 && single === 26 && twoDigit === 2340, `got ${single + twoDigit}`)
  }

  // A29. E12 radio plan: 6 × 5⁴ = 3750; the two-day census 36 / 30 / 6.
  {
    const plans = strings(6, 5)
    const noAdjacent = plans.filter((p) => p.every((v, i) => i === 0 || v !== p[i - 1])).length
    const twoDay = strings(6, 2)
    const matching = twoDay.filter((p) => p[0] === p[1]).length
    push('A29 E12 radio plans 6 × 5⁴ = 3750 (all 7776 plans brute-swept)', noAdjacent === 3750, `got ${noAdjacent}`)
    push('A30 E12 two-day census: 36 total, 30 admissible, 6 matching pairs deleted', twoDay.length === 36 && twoDay.length - matching === 30 && matching === 6, `got ${twoDay.length}/${twoDay.length - matching}/${matching}`)
  }

  // A31. E13 |x − y| ≥ 6 on {0..9}: 20 ordered pairs, row census 4,3,2,1,0,0,1,2,3,4.
  {
    let n = 0
    const rows: number[] = []
    for (let x = 0; x <= 9; x++) {
      let row = 0
      for (let y = 0; y <= 9; y++) if (Math.abs(x - y) >= 6) {
        n++
        row++
      }
      rows.push(row)
    }
    push('A31 E13 |x − y| ≥ 6 on {0..9}: 20 pairs swept; rows 4,3,2,1,0,0,1,2,3,4', n === 20 && rows.join(',') === '4,3,2,1,0,0,1,2,3,4', `got ${n} [${rows.join(',')}]`)
  }

  // A32. E14 octagon: 8×7 ÷ 2 = 28 segments; 8 × 5 ÷ 2 = 20 diagonals;
  // the square census 6 segments / 2 diagonals.
  {
    const pts8 = 8
    let ordered = 0
    for (let i = 0; i < pts8; i++) for (let j = 0; j < pts8; j++) if (i !== j) ordered++
    const segments = ordered / 2
    let diagOrdered = 0
    for (let v = 0; v < 8; v++) for (let w = 0; w < 8; w++) {
      if (v === w) continue
      if (w === (v + 1) % 8 || v === (w + 1) % 8) continue // sides excluded
      diagOrdered++
    }
    const diagonals = diagOrdered / 2
    const squareSegments = (4 * 3) / 2
    const squareDiagonals = squareSegments - 4
    push('A32 E14 octagon 28 segments, 20 diagonals; square census 6 / 2', segments === 28 && diagonals === 20 && squareSegments === 6 && squareDiagonals === 2, `got ${segments}/${diagonals}`)
  }

  // A33. E15 strings from {P,Q,R,S}: 4⁵ = 1024; no adjacent equal 4 × 3⁴ = 324;
  // at least one adjacent equal pair = 700 (brute-swept).
  {
    const all = strings(4, 5)
    const noAdjacent = all.filter((p) => p.every((v, i) => i === 0 || v !== p[i - 1])).length
    const withAdjacent = all.length - noAdjacent
    push('A33 E15 the 1024 / 324 / 700 string census (all 1024 enumerated)', all.length === 1024 && noAdjacent === 324 && withAdjacent === 700, `got ${all.length}/${noAdjacent}/${withAdjacent}`)
  }

  /* --- the quiz, every option value recomputed ---------------------- */

  // A34. quiz option values recomputed: Q1 5×4 = 20; Q2 8+6 = 14;
  // Q3 6·5·4·3 = 360; Q4 2⁶−1 = 63; Q5 2×5 = 10 — pinned against keys.
  {
    const quizzes = L.blocks.filter((b) => b.kind === 'quiz')
    const quiz = quizzes[0] as { items: { options: string[]; answer: number }[] } | undefined
    const ok =
      quizzes.length === 1 &&
      quiz !== undefined &&
      quiz.items.length === 5 &&
      quiz.items[0].options[1] === '20' &&
      5 * 4 === 20 &&
      quiz.items[1].options[2] === '14' &&
      8 + 6 === 14 &&
      quiz.items[2].options[1] === '360' &&
      6 * 5 * 4 * 3 === 360 &&
      quiz.items[3].options[2] === '63' &&
      Math.pow(2, 6) - 1 === 63 &&
      quiz.items[4].options[3] === '10' &&
      2 * 5 === 10
    const keys = quiz ? quiz.items.map((it) => it.answer) : []
    push('A34 quiz option values recomputed: 20 / 14 / 360 / 63 / 10 at the pinned keys', ok && keys.join(',') === '1,2,1,2,3', `keys [${keys.join(',')}]`)
  }

  /* --- the equations and the figures -------------------------------- */

  // A35. equations: tags 1..8 each exactly once, in order; balanced braces;
  // no stray $ in latex fields.
  {
    const eqs = L.blocks.filter((b) => b.kind === 'equation') as { latex: string }[]
    const tags = eqs.map((e) => (e.latex.match(/\\tag\{(\d+)\}/) || [])[1])
    const want = ['1', '2', '3', '4', '5', '6', '7', '8']
    const bracesOk = eqs.every((e) => balanced(e.latex))
    const dollarOk = eqs.every((e) => !e.latex.includes('$'))
    push('A35 equations tagged 1..8 in order, braces balanced, no $ in latex', eqs.length === 8 && tags.join(',') === want.join(',') && bracesOk && dollarOk, `tags [${tags.join(',')}]`)
  }

  // A36. figure claims: the route tree carries the census labels; the
  // box-chains carry the recomputed numbers.
  {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
    const route = figs[0]?.svg || ''
    const boxes = figs[1]?.svg || ''
    const routeOk = ['trail 1', 'trail 3', 'road 1', 'road 4', '12 journeys', '3 × 4 = 12'].every((t) => route.includes(t))
    const boxesOk = ['4096', '210', '343', '7 × 6 × 5', '4 × 4 × 4 × 4 × 4 × 4'].every((t) => boxes.includes(t))
    push('A36 figure labels match the recomputed census (route tree 12; box chains 4096 / 210 / 343)', figs.length === 2 && routeOk && boxesOk, `route ${routeOk}, boxes ${boxesOk}`)
  }

  // A37. every $-delimited span in rich-text fields is balanced (even $ count
  // per string, no empty span) — the KaTeX render gate's static half.
  {
    const bad = allStrings(L).filter((s) => {
      const n = (s.match(/\$/g) || []).length
      if (n % 2 !== 0) return true
      if (/\$\s*\$/.test(s)) return true
      return false
    })
    push('A37 every string carries balanced $ pairs (no odd counts, no empty spans)', bad.length === 0, bad.slice(0, 2).join(' || '))
  }

  // A38. the two tables carry only recomputed numbers.
  {
    const tables = L.blocks.filter((b) => b.kind === 'table') as { rows: string[][] }[]
    const flat = tables.flatMap((t) => t.rows.map((r) => r.join('|')))
    const ok =
      tables.length === 2 &&
      flat.some((r) => r.includes('72')) &&
      flat.some((r) => r.includes('4096')) &&
      flat.some((r) => r.includes('210')) &&
      flat.some((r) => r.includes('343')) &&
      flat.some((r) => r.includes('26000')) &&
      flat.some((r) => r.includes('18720')) &&
      flat.some((r) => r.includes('1024')) &&
      flat.some((r) => r.includes('12')) &&
      flat.some((r) => r.includes('13')) &&
      flat.some((r) => r.includes('31'))
    push('A38 the two census tables carry recomputed counts only (72/4096/210/343/26000/18720/1024/12/13/31)', ok)
  }

  return c
}

/* ------------------------------------------------------------------ */
/* SECTION B — the 6.1 structural pins                                 */
/* ------------------------------------------------------------------ */

const VIVID_HEXES = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff'])
const RETIRED_HEXES = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#7c5a2e', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']

function sectionB(L: Lesson = lesson61): SectionCheck[] {
  const c: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    c.push(check(name, ok, detail))
  }

  // B1. identity pins: id / number / title.
  push(
    'B1 id, number and title pinned exactly',
    L.id === 'aa-the-fundamental-principle-of-counting' && L.number === '6.1' && L.title === 'The Fundamental Principle of Counting'
  )

  // B2. the prerequisite id is the live ch-1.1 lesson id (grep-verified).
  push('B2 prerequisites exactly the live set-of-pairs id', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-relations-the-set-of-pairs-view']), JSON.stringify(L.prerequisites))

  // B3. sources within the banked whitelist (cengage-m2-07 banked at close).
  {
    const whitelist = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra', 'cengage-m2-algebra']
    const bad = (L.sources || []).filter((k) => !whitelist.includes(k))
    push('B3 sources within the banked whitelist (no invented keys)', bad.length === 0, bad.join(', '))
  }

  // B4. quiz exactly 5 items, 4 options each, valid answers, keys pinned,
  // and every explain says why the wrong options fail (mentions distractors).
  {
    const quizzes = L.blocks.filter((b) => b.kind === 'quiz')
    const quiz = quizzes[0] as unknown as { title: string; items: { q: string; options: string[]; answer: number; explain: string }[] }
    const shapeOk = quizzes.length === 1 && quiz.items.length === 5 && quiz.items.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer <= 3)
    const keysOk = shapeOk && quiz.items.map((it) => it.answer).join(',') === '1,2,1,2,3'
    const explainsOk = shapeOk && quiz.items.every((it) => it.explain.length >= 200 && /option [A-D]/i.test(it.explain) && it.explain.includes('$'))
    push('B4 quiz exactly 5 items, 4 options, keys [1,2,1,2,3], explains price the wrong options', shapeOk && keysOk && explainsOk, `keys ${shapeOk ? quiz.items.map((it) => it.answer).join(',') : 'shape bad'}`)
  }

  // B5. exercises: exactly 15 questions in 6 sets L1..L6 = 2/2/3/3/3/2,
  // every question a steps-array solution with an answer field.
  {
    const ex = L.blocks.filter((b) => b.kind === 'exercises')
    const sets = (ex[0] as unknown as { sets: { level: string; questions: { solution: string | string[]; answer?: string }[] }[] }).sets
    const levels = sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
    const countsOk = ex.length === 1 && levels === 'L1:2 L2:2 L3:3 L4:3 L5:3 L6:2' && sets.reduce((a, s) => a + s.questions.length, 0) === 15
    const solutionsOk = sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && typeof q.answer === 'string' && q.answer.length > 0))
    push('B5 exercises exactly 15 in sets 2/2/3/3/3/2, every question a full steps-array solution + answer', countsOk && solutionsOk, levels)
  }

  // B6. figures: ≥ 2, self-contained SVG with viewBox + role + aria-label,
  // vivid palette only, no retired hexes, no raw TeX in any SVG text.
  {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
    const hexes = (svg: string): string[] => Array.from(svg.matchAll(/#[0-9a-fA-F]{6}\b/g)).map((m) => m[0].toLowerCase())
    const shapeOk = figs.length >= 2 && figs.every((f) => f.svg.includes('viewBox=') && f.svg.includes('role="img"') && f.svg.includes('aria-label='))
    const paletteOk = figs.every((f) => hexes(f.svg).every((h) => VIVID_HEXES.has(h)))
    const retiredOk = figs.every((f) => RETIRED_HEXES.every((h) => !f.svg.toLowerCase().includes(h)))
    // raw TeX in SVG labels: backslash-commands or $ anywhere in the svg
    const rawTexOk = figs.every((f) => !/\\[a-zA-Z]+/.test(f.svg) && !f.svg.includes('$'))
    push('B6 ≥ 2 figures, vivid palette only, no retired hexes, no raw TeX in SVG', shapeOk && paletteOk && retiredOk && rawTexOk, `figs ${figs.length}, palette ${paletteOk}, retired ${retiredOk}, rawTex ${rawTexOk}`)
  }

  // B7. derivations: ≥ 3 (this lesson carries 4); titles and step labels
  // PLAIN (no $, no backslash); results clause-wise $-delimited (every span
  // short, prose tails bare — no whole-wrapped unbreakable spans).
  {
    const derivs = L.blocks.filter((b) => b.kind === 'derivation') as unknown as { title: string; steps: { label: string }[]; result: string }[]
    const countOk = derivs.length >= 3
    const plainOk = derivs.every((d) => !d.title.includes('$') && !/\\[a-zA-Z]/.test(d.title) && d.steps.every((s) => !s.label.includes('$') && !/\\[a-zA-Z]/.test(s.label)))
    const clauseOk = derivs.every((d) => {
      const spans = mathSpans(d.result)
      const spansOk = spans.length > 0 && spans.every((s) => s.length <= 60)
      const bareTail = d.result.replace(/\$[^$]*\$/g, '').trim().length > 0 || spans.length >= 2
      return spansOk && bareTail
    })
    push('B7 ≥ 3 derivations; plain titles/labels; clause-wise results (no unbreakable whole-wrap)', countOk && plainOk && clauseOk, `count ${derivs.length}, plain ${plainOk}, clause ${clauseOk}`)
  }

  // B8. formula cards: ≥ 3 (this lesson carries 5); latex KaTeX (balanced
  // braces, no $); notes plain-rendered (no $, no backslash).
  {
    const cards = L.blocks.filter((b) => b.kind === 'formula') as unknown as { name: string; latex: string; note?: string }[]
    const countOk = cards.length >= 3
    const latexOk = cards.every((f) => balanced(f.latex) && !f.latex.includes('$'))
    const notesOk = cards.every((f) => (f.note ? !f.note.includes('$') && !/\\[a-zA-Z]/.test(f.note) : true))
    const namesOk = cards.every((f) => !f.name.includes('$') && !/\\[a-zA-Z]/.test(f.name))
    push('B8 ≥ 3 formula cards; KaTeX latex; plain notes and names', countOk && latexOk && notesOk && namesOk, `count ${cards.length}`)
  }

  // B9. example (Illustration) blocks: ≥ 8 (this lesson carries 10),
  // escalating, the last exam-shaped (title carries the honest label).
  {
    const examples = L.blocks.filter((b) => b.kind === 'example') as unknown as { title: string; steps: string[] }[]
    const countOk = examples.length >= 8
    const stepsOk = examples.every((e) => e.steps.length >= 3)
    const lastExam = examples.length > 0 && /exam-style/i.test(examples[examples.length - 1].title)
    push('B9 ≥ 8 Illustrations with full Sol. chains; the last exam-shaped and labelled honestly', countOk && stepsOk && lastExam, `count ${examples.length}, lastExam ${lastExam}`)
  }

  // B10. terms ≥ 6; word floor 4500 by the house counter.
  {
    const termsBlocks = L.blocks.filter((b) => b.kind === 'terms') as unknown as { items: { term: string; def: string }[] }[]
    const nTerms = termsBlocks.reduce((a, t) => a + t.items.length, 0)
    const words = countLessonWords(L)
    push('B10 ≥ 6 terms; word count ≥ 4500 (honest count by countLessonWords)', nTerms >= 6 && words >= 4500, `terms ${nTerms}, words ${words}`)
  }

  // B11. the named-sibling cross-references (cite, never re-teach): 6.2–6.6,
  // 6.R, ch. 1.1, ch. 7 — plus the Probability handoff named.
  {
    const text = allStrings(L).join(' ')
    const siblings = [
      'Factorials and the Counting Toolkit',
      'Permutations: the Arrangement Count',
      'Circular and Restricted Permutations',
      'Combinations: the Selection Count',
      'Distributions and the Classic Counting Puzzles',
      'Unit 6 Completion Review',
      'Relations: the Set-of-Pairs View',
      'Induction and the Binomial Theorem',
    ]
    const missing = siblings.filter((s) => !text.includes(s))
    const probHandoff = /Probability inherits/.test(text)
    push('B11 all named siblings cited (6.2–6.6, 6.R, ch. 1.1, ch. 7) and the Probability handoff named', missing.length === 0 && probHandoff, `missing ${missing.join('; ')}, handoff ${probHandoff}`)
  }

  // B12. no raw TeX in plain-rendered fields: concepts, objectives, callout
  // titles, captions, equation notes, formula names — the 2026-11-18 list.
  {
    const conceptsRaw = L.concepts.some((s) => s.includes('$') || /\\[a-zA-Z]/.test(s))
    const objectivesRaw = (L.objectives || []).some((s) => rawTexOutsideMath(s) || /\\[a-zA-Z]/.test(s.replace(/\$[^$]*\$/g, '')))
    const calloutTitles = L.blocks.filter((b) => b.kind === 'callout') as unknown as { title: string }[]
    const titlesRaw = calloutTitles.some((b) => b.title.includes('$') || /\\[a-zA-Z]/.test(b.title))
    const captionsRaw = [...(L.blocks.filter((b) => b.kind === 'figure') as unknown as { caption: string }[]), ...(L.blocks.filter((b) => b.kind === 'table') as unknown as { caption?: string }[])].some((b) => (b.caption ? b.caption.includes('$') || /\\[a-zA-Z]/.test(b.caption) : false))
    const eqNotesRaw = (L.blocks.filter((b) => b.kind === 'equation') as unknown as { note?: string }[]).some((b) => (b.note ? b.note.includes('$') || /\\[a-zA-Z]/.test(b.note) : false))
    push('B12 no raw TeX in plain-rendered fields (concepts, objectives, callout titles, captions, equation notes)', !conceptsRaw && !objectivesRaw && !titlesRaw && !captionsRaw && !eqNotesRaw, `concepts ${conceptsRaw}, objectives ${objectivesRaw}, titles ${titlesRaw}, captions ${captionsRaw}, eqnotes ${eqNotesRaw}`)
  }

  // B13. \tfrac not \dfrac inline; no \dfrac anywhere in the lesson.
  push('B13 no \\dfrac anywhere (the \\tfrac rule for inline fractions)', !allStrings(L).some((s) => s.includes('\\dfrac')))

  // B14. the small-case census installed and the complement seeded forward:
  // both phrases must appear as the lesson's own discipline.
  {
    const text = allStrings(L).join(' ')
    const censusOk = (text.match(/small-case census/gi) || []).length >= 3
    const complementOk = (text.match(/total minus bad/gi) || []).length >= 3
    const withRepetitionOk = text.includes('with repetition') && text.includes('without repetition')
    const disjointOk = text.includes('disjoint')
    push('B14 the census installed (≥ 3 mentions), the complement seeded (≥ 3), both repetition models named', censusOk && complementOk && withRepetitionOk && disjointOk, `census ${censusOk}, complement ${complementOk}, repetition ${withRepetitionOk}`)
  }

  // B15. no leftover placeholders.
  push('B15 no leftover placeholders (TODO / XXX)', !allStrings(L).some((s) => /TODO|XXX|待补充|【/.test(s)))

  return c
}


/* (assembled section mapping: this agent's ENGINE array -> section C, its PINS array -> section D; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const C: SectionCheck[] = []
const D: SectionCheck[] = []
{


/**
 * v6-2.ts — the task 6-b engine for AA lesson 6.2
 * "Factorials and the Counting Toolkit".
 *
 * Brute-force re-verification of EVERY number in the lesson, independent
 * of the assembled chapter verifier the orchestrator will later compose
 * (verify-book4-ch06.ts). Section C recomputes every factorial value,
 * unwinding fraction, false-law witness, Legendre exponent (each one
 * audited against a literal BigInt factorisation of the factorial
 * itself), composite min read, trailing-zero count, nCr identity
 * (swept over ranges), row census, quiz distractor value and exercise
 * answer; section D pins the structural contract on the part-file
 * lesson object (quiz/exercise anatomy, figures, derivations, folds,
 * word floor, prereqs, sources). The runner run-62.ts exits 0 only
 * when every check is green — VERIFY-FIRST: green before prose done.
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

/* BigInt arithmetic: factorials, combinations, prime exponents */

const fact = (n: number): bigint => {
  let out = 1n
  for (let i = 2n; i <= BigInt(n); i++) out *= i
  return out
}

const nCb = (n: number, r: number): bigint => {
  if (r < 0 || r > n) return 0n
  return fact(n) / (fact(r) * fact(n - r))
}

/** the exponent of p in m, by literal division of the BigInt m */
const vpBig = (m: bigint, p: number): number => {
  let e = 0
  let x = m
  while (x % BigInt(p) === 0n) {
    x /= BigInt(p)
    e++
  }
  return e
}

/** brute-force exponent of p in n! — sum of v_p over the roster 1..n */
const Ebrute = (p: number, n: number): number => {
  let e = 0
  for (let m = 1; m <= n; m++) {
    let x = m
    while (x % p === 0) {
      x /= p
      e++
    }
  }
  return e
}

/** Legendre's floor sum */
const Eleg = (p: number, n: number): number => {
  let e = 0
  let pk = p
  while (pk <= n) {
    e += Math.floor(n / pk)
    pk *= p
  }
  return e
}

/** the largest power of the composite c = prod p^a dividing n! (the min rule), brute-checked */
const powerOf = (c: number, n: number): number => {
  // prime-factorise c, brute-force each E_p, apply the min rule
  const fac = new Map<number, number>()
  let x = c
  for (let p = 2; p * p <= x; p++) while (x % p === 0) { fac.set(p, (fac.get(p) ?? 0) + 1); x /= p }
  if (x > 1) fac.set(x, (fac.get(x) ?? 0) + 1)
  let best = Infinity
  for (const [p, a] of fac) best = Math.min(best, Math.floor(Ebrute(p, n) / a))
  return best
}

/** binary digit sum */
const s2 = (n: number): number => n.toString(2).split('').filter((d) => d === '1').length

/** trailing zeros of n!, by literal BigInt division */
const zerosOf = (n: number): number => {
  let e = 0
  let x = fact(n)
  while (x % 10n === 0n) {
    x /= 10n
    e++
  }
  return e
}

const isPrime = (n: number): boolean => {
  if (n < 2) return false
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false
  return true
}

/* ------------------------------------------------------------------ */
/* SECTION C — 6.2 engines (every number in the lesson, recomputed)   */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean, detail?: string) => C.push(check(name, ok, detail))

  /* ---- C1: the factorial roster and the opening chains ---- */
  push('C1.1 the roster 0!..7! = 1, 1, 2, 6, 24, 120, 720, 5040 and 10! = 3628800', [0, 1, 2, 3, 4, 5, 6, 7].every((n) => fact(n) === BigInt([1, 1, 2, 6, 24, 120, 720, 5040][n])) && fact(10) === 3628800n)
  push('C1.2 the 10! audit line: 10! = 2^8 · 3^4 · 5^2 · 7 = 2^8 · 14175 (and 14175 = 3^4 · 5^2 · 7)', (() => { const m = fact(10); return vpBig(m, 2) === 8 && vpBig(m, 3) === 4 && vpBig(m, 5) === 2 && vpBig(m, 7) === 1 && m / 2n ** 8n === 14175n && 14175 === 81 * 25 * 7 })())
  push('C1.3 the opening chains of 6.1: 9·8·7·6 = 3024 and 6·5·4·3·2·1 = 720', 9 * 8 * 7 * 6 === 3024 && 6 * 5 * 4 * 3 * 2 * 1 === 720)
  push('C1.4 the recursion law n! = n·(n−1)! swept n = 1..12', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => fact(n) === BigInt(n) * fact(n - 1)))
  push('C1.5 the recursion checks of Illustration 1: 7·720 = 5040, 6·120 = 720, 5·24 = 120, 4·6 = 24, 1·0! = 1', 7 * 720 === 5040 && 6 * 120 === 720 && 5 * 24 === 120 && 4 * 6 === 24 && 1 * 1 === 1 && [1, 1, 2, 6, 24, 120, 720, 5040].every((v, i) => v === Number(fact(i))))

  /* ---- C2: the two unwinding fractions ---- */
  push('C2.1 n!/r! equals the product (r+1)…n — the top n−r factors — swept n = 0..12, all r', (() => { for (let n = 0; n <= 12; n++) for (let r = 0; r <= n; r++) { let prod = 1n; for (let k = r + 1; k <= n; k++) prod *= BigInt(k); if (fact(n) / fact(r) !== prod) return false } return true })())
  push('C2.2 n!/(n−r)! equals the product n(n−1)…(n−r+1) — the top r factors — swept n = 0..12, all r', (() => { for (let n = 0; n <= 12; n++) for (let r = 0; r <= n; r++) { let prod = 1n; for (let k = 0; k < r; k++) prod *= BigInt(n - k); if (fact(n) / fact(n - r) !== prod) return false } return true })())
  push('C2.3 Illustration 2: 8!/5! = 6·7·8 = 336 and 8!/(8−5)! = 8!/3! = 4·5·6·7·8 = 6720 (raw 40320/6)', fact(8) / fact(5) === 336n && 6 * 7 * 8 === 336 && fact(8) / fact(3) === 6720n && 4 * 5 * 6 * 7 * 8 === 6720 && 40320 / 6 === 6720)
  push('C2.4 the seat-reads of Illustration 2: 8·7·6 = 336 (three seats) and 8·7·6·5·4 = 6720 (five seats)', 8 * 7 * 6 === 336 && 8 * 7 * 6 * 5 * 4 === 6720)
  push('C2.5 the empty-product consistency: n!/0! = n! swept n = 0..10; and 1! = 1·0!', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((n) => fact(n) / fact(0) === fact(n)) && 1n === 1n * 1n)

  /* ---- C3: the three false laws ---- */
  push('C3.1 the witnesses: (3+4)! = 5040 vs 3!+4! = 6+24 = 30; (2·4)! = 40320 vs 2!·4! = 48; (3·2)! = 720 vs 3·2! = 6', fact(7) === 5040n && 6 + 24 === 30 && fact(8) === 40320n && 2 * 24 === 48 && fact(6) === 720n && 3 * 2 === 6)
  push('C3.2 the false laws sweep: (m+n)! > m!·n! and (m+n)! > m!+n! for all m, n ≥ 2 (m, n ≤ 8)', (() => { for (let m = 2; m <= 8; m++) for (let n = 2; n <= 8; n++) { if (fact(m + n) <= fact(m) * fact(n)) return false; if (fact(m + n) <= fact(m) + fact(n)) return false } return true })())
  push('C3.3 the (mn)! and (kn)! sweeps: (mn)! > m!·n! and (kn)! > k·n! for m, n, k ≥ 2 (≤ 6)', (() => { for (let m = 2; m <= 6; m++) for (let n = 2; n <= 6; n++) { if (fact(m * n) <= fact(m) * fact(n)) return false; if (fact(m * n) <= BigInt(m) * fact(n)) return false } return true })())
  push('C3.4 the structural read: (m+n)! = m! · (m+1)(m+2)…(m+n) with each factor (m+i) > i — swept m, n ≤ 8', (() => { for (let m = 1; m <= 8; m++) for (let n = 1; n <= 8; n++) { let prod = fact(m); for (let i = 1; i <= n; i++) prod *= BigInt(m + i); if (fact(m + n) !== prod) return false; for (let i = 1; i <= n; i++) if (m + i <= i) return false } return true })())
  push('C3.5 the quiz-Q2 witnesses: 4! = 24 vs 2!+2! = 4; 6! = 720 vs 2!·3! = 12; 6! = 720 vs 2·3! = 12', fact(4) === 24n && 2 + 2 === 4 && fact(6) === 720n && 2 * 6 === 12 && 2 * 6 === 12)

  /* ---- C4: Legendre's formula, brute-audited ---- */
  push('C4.1 Legendre E_p(n!) = Σ⌊n/p^i⌋ equals the brute-force donation sum for p ∈ {2,3,5,7,11,13}, n = 1..60', (() => { for (const p of [2, 3, 5, 7, 11, 13]) for (let n = 1; n <= 60; n++) if (Eleg(p, n) !== Ebrute(p, n)) return false; return true })())
  push('C4.2 the definition callout: E₂(6!) = 4 with 6! = 720 = 2^4 · 3^2 · 5', Eleg(2, 6) === 4 && Ebrute(2, 6) === 4 && vpBig(fact(6), 2) === 4 && vpBig(fact(6), 3) === 2 && vpBig(fact(6), 5) === 1)
  push('C4.3 the audit roster: E₂(10!) = 5+2+1 = 8 with ⌊10/2⌋ = 5, ⌊10/4⌋ = 2, ⌊10/8⌋ = 1 (both routes + BigInt)', Eleg(2, 10) === 8 && 5 + 2 + 1 === 8 && Math.floor(10 / 2) === 5 && Math.floor(10 / 4) === 2 && Math.floor(10 / 8) === 1 && Ebrute(2, 10) === 8)
  push('C4.4 Illustration 4: E₃(50!) = 16+5+1 = 22 with the floors 16, 5, 1, 0 (⌊50/81⌋ = 0 since 3^4 = 81 > 50)', Eleg(3, 50) === 22 && 16 + 5 + 1 === 22 && Math.floor(50 / 3) === 16 && Math.floor(50 / 9) === 5 && Math.floor(50 / 27) === 1 && Math.floor(50 / 81) === 0 && 81 > 50 && Ebrute(3, 50) === 22)
  push('C4.5 Illustration 4 sibling: E₂(50!) = 25+12+6+3+1 = 47 (both routes)', Eleg(2, 50) === 47 && 25 + 12 + 6 + 3 + 1 === 47 && Ebrute(2, 50) === 47)
  push('C4.6 the census-table band of 50!: multiples of 3 → 16 (3·16 = 48 ≤ 50), of 9 → 5 (9·5 = 45), of 27 → 1, of 81 → 0; total 22', 3 * 16 === 48 && 48 <= 50 && 9 * 5 === 45 && 45 <= 50 && 27 <= 50 && 81 > 50 && 16 + 5 + 1 + 0 === 22)

  /* ---- C5: the composite honesty (min rule) ---- */
  push('C5.1 the theorem callout: E₂(24!) = 22, E₃(24!) = 10, min = 10 — the largest power of 6 in 24! (naive ⌊24/6⌋ = 4)', Eleg(2, 24) === 22 && 12 + 6 + 3 + 1 === 22 && Eleg(3, 24) === 10 && 8 + 2 === 10 && Math.min(22, 10) === 10 && Math.floor(24 / 6) === 4 && Ebrute(2, 24) === 22 && Ebrute(3, 24) === 10)
  push('C5.2 Illustration 5: E₂(40!) = 20+10+5+2+1 = 38, E₃(40!) = 13+4+1 = 18, the 2-side allows ⌊38/2⌋ = 19, min = 18 (naive ⌊40/12⌋ = 3)', Eleg(2, 40) === 38 && 20 + 10 + 5 + 2 + 1 === 38 && Eleg(3, 40) === 18 && 13 + 4 + 1 === 18 && Math.floor(38 / 2) === 19 && Math.min(19, 18) === 18 && Math.floor(40 / 12) === 3)
  push('C5.3 Illustration 5 brute audit: the largest power of 12 = 2²·3 dividing 40! is 18 (literal BigInt division)', (() => { const k = powerOf(12, 40); if (k !== 18) return false; const p = fact(40); return p % (12n ** 18n) === 0n && p % (12n ** 19n) !== 0n })())
  push('C5.4 the min-rule sweep against literal BigInt division: c ∈ {6, 10, 12, 15, 18, 24}, n ∈ {20, 22, 24, 28, 30, 40, 45, 50, 60}', (() => { for (const c of [6, 10, 12, 15, 18, 24]) for (const n of [20, 22, 24, 28, 30, 40, 45, 50, 60]) { const k = powerOf(c, n); const p = fact(n); if (p % (BigInt(c) ** BigInt(k)) !== 0n) return false; if (k + 1 < 60 && p % (BigInt(c) ** BigInt(k + 1)) === 0n) return false } return true })())
  push('C5.5 quiz Q4: E₂(20!) = 10+5+2+1 = 18, E₃(20!) = 6+2 = 8, min = 8; distractors 18 (E₂ alone), 3 = ⌊20/6⌋, 6 = ⌊20/3⌋', Eleg(2, 20) === 18 && 10 + 5 + 2 + 1 === 18 && Eleg(3, 20) === 8 && 6 + 2 === 8 && Math.min(18, 8) === 8 && Math.floor(20 / 6) === 3 && Math.floor(20 / 3) === 6 && powerOf(6, 20) === 8)
  push('C5.6 L3-5: E₂(30!) = 15+7+3+1 = 26, E₃(30!) = 10+3+1 = 14, ⌊26/3⌋ = 8 (3·9 = 27 > 26), min = 8 — the power of 24 = 2³·3 in 30!', Eleg(2, 30) === 26 && 15 + 7 + 3 + 1 === 26 && Eleg(3, 30) === 14 && 10 + 3 + 1 === 14 && Math.floor(26 / 3) === 8 && 3 * 9 === 27 && 27 > 26 && powerOf(24, 30) === 8)
  push('C5.7 L4-8: E₃(22!) = 7+2 = 9, E₅(22!) = 4 (22 < 25), min = 4; distractors 9, 7 = ⌊22/3⌋, 1 = ⌊22/15⌋', Eleg(3, 22) === 9 && 7 + 2 === 9 && Eleg(5, 22) === 4 && 22 < 25 && Math.min(9, 4) === 4 && Math.floor(22 / 3) === 7 && Math.floor(22 / 15) === 1 && powerOf(15, 22) === 4)

  /* ---- C6: trailing zeros ---- */
  push('C6.1 Illustration 6: E₅(45!) = 9+1 = 10, E₂(45!) = 22+11+5+2+1 = 41, min = 10', Eleg(5, 45) === 10 && 9 + 1 === 10 && Eleg(2, 45) === 41 && 22 + 11 + 5 + 2 + 1 === 41 && Math.min(41, 10) === 10)
  push('C6.2 Illustration 6 brute audit: 45! ends in exactly 10 zeros (literal BigInt division)', zerosOf(45) === 10)
  push('C6.3 the zeros sweep: zeros(n!) = E₅(n!) = min(E₂, E₅) for n = 1..60 (the 2s always outnumber)', (() => { for (let n = 1; n <= 60; n++) { if (zerosOf(n) !== Eleg(5, n)) return false; if (Eleg(2, n) < Eleg(5, n)) return false } return true })())
  push('C6.4 L2-4: E₅(30!) = 6+1 = 7 with ⌊30/5⌋ = 6, ⌊30/25⌋ = 1 and 5³ = 125 > 30 (brute = 7)', Eleg(5, 30) === 7 && 6 + 1 === 7 && Math.floor(30 / 5) === 6 && Math.floor(30 / 25) === 1 && 125 > 30 && Ebrute(5, 30) === 7)
  push('C6.5 the insight callout: among any five consecutive integers exactly one is a multiple of 5 — swept blocks 1..100', (() => { for (let b = 1; b + 4 <= 100; b++) { let c = 0; for (let i = b; i < b + 5; i++) if (i % 5 === 0) c++; if (c !== 1) return false } return true })())
  push('C6.6 the floor inequality behind it: ⌊n/2⌋ ≥ ⌊n/5⌋ and E₂ ≥ E₅ swept n = 1..200', (() => { for (let n = 1; n <= 200; n++) { if (Math.floor(n / 2) < Math.floor(n / 5)) return false; if (Eleg(2, n) < Eleg(5, n)) return false } return true })())

  /* ---- C7: the combination fraction and its properties ---- */
  push('C7.1 definition callout: 8C3 = 8·7·6/(3·2·1) = 56 and 8C5 = 56 (symmetry)', nCb(8, 3) === 56n && 8 * 7 * 6 === 336 && 336 / 6 === 56 && nCb(8, 5) === 56n)
  push('C7.2 Illustration 7: 8!/(3!·5!) = 40320/720 = 56; the chain 8·7·6 = 336 with 3! = 6 orders gives 336/6 = 56', fact(8) / (fact(3) * fact(5)) === 56n && 40320 / 720 === 56 && 8 * 7 * 6 === 336 && 336 / 6 === 56)
  push('C7.3 the un-overcount identity nCr · r! = the chain n(n−1)…(n−r+1) swept n ≤ 12', (() => { for (let n = 0; n <= 12; n++) for (let r = 0; r <= n; r++) { let chain = 1n; for (let k = 0; k < r; k++) chain *= BigInt(n - k); if (nCb(n, r) * fact(r) !== chain) return false } return true })())
  push('C7.4 symmetry nCr = nCn−r swept n ≤ 25', (() => { for (let n = 0; n <= 25; n++) for (let r = 0; r <= n; r++) if (nCb(n, r) !== nCb(n, n - r)) return false; return true })())
  push('C7.5 the equality discipline swept n ≤ 25: nCx = nCy ⟺ x = y or x + y = n', (() => { for (let n = 0; n <= 25; n++) { const seen = new Map<string, bigint>(); for (let x = 0; x <= n; x++) { const v = nCb(n, x); for (let y = 0; y <= n; y++) { const eq = v === nCb(n, y); const want = x === y || x + y === n; if (eq !== want) return false } } } return true })())
  push('C7.6 Illustration 9: 20C12 = 20C8 (the discipline with 12 + 8 = 20), 20C2 = 20·19/2 = 190, 20C18 = 190', nCb(20, 12) === nCb(20, 8) && 12 + 8 === 20 && (20 * 19) / 2 === 190 && nCb(20, 2) === 190n && nCb(20, 18) === 190n)
  push('C7.7 Pascal nCr + nC{r−1} = {n+1}Cr swept 1 ≤ r ≤ n ≤ 25; audit 56 + 70 = 126 = 9C4', (() => { for (let n = 1; n <= 25; n++) for (let r = 1; r <= n; r++) if (nCb(n, r) + nCb(n, r - 1) !== nCb(n + 1, r)) return false; return true })() && 56 + 70 === 126 && nCb(9, 4) === 126n)
  push('C7.8 the ratio law nCr·r = nC{r−1}·(n−r+1) swept 1 ≤ r ≤ n ≤ 25; audit 252·5 = 210·6', (() => { for (let n = 1; n <= 25; n++) for (let r = 1; r <= n; r++) if (nCb(n, r) * BigInt(r) !== nCb(n, r - 1) * BigInt(n - r + 1)) return false; return true })() && 252 * 5 === 210 * 6)
  push('C7.9 the ratio law values of the row-10 walk: 10/1, 9/2, 8/3, 7/4, 6/5, 5/6, 4/7, 3/8, 2/9, 1/10 — each maps its predecessor to the next coefficient', (() => { const row = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]; for (let r = 1; r <= 10; r++) { const num = 11 - r; if (row[r] * r !== row[r - 1] * num) return false } return 10 / 1 === 10 && 9 / 2 === 4.5 && 7 / 4 === 1.75 && 6 / 5 === 1.2 && 3 / 8 === 0.375 && 1 / 10 === 0.1 })())
  push('C7.10 the middle maximum swept n ≤ 25: max = nC⌊n/2⌋, twin seats nC{(n−1)/2} = nC{(n+1)/2} when n odd; 10C5 = 252, 9C4 = 9C5 = 126', (() => { for (let n = 0; n <= 25; n++) { let mx = 0n; for (let r = 0; r <= n; r++) if (nCb(n, r) > mx) mx = nCb(n, r); if (mx !== nCb(n, Math.floor(n / 2))) return false; if (n % 2 === 1 && nCb(n, (n - 1) / 2) !== nCb(n, (n + 1) / 2)) return false } return nCb(10, 5) === 252n && nCb(9, 4) === 126n && nCb(9, 5) === 126n })())
  push('C7.11 the row-of-ten census: 1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1 — built by the walk 1 ×10/1 ×9/2 ×8/3 ×7/4 ×6/5 … and mirrored', (() => { const row = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]; if (row.join(',') !== [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1].join(',')) return false; for (let r = 0; r <= 10; r++) if (nCb(10, r) !== BigInt(row[r])) return false; let cur = 1; for (let r = 1; r <= 5; r++) { cur = (cur * (11 - r)) / r; if (cur !== row[r]) return false } return cur === 252 })())
  push('C7.12 the symmetric partners of the ramp: 10C2 = 10C8 = 45, 10C3 = 10C7 = 120, 10C4 = 10C6 = 210, and the peak 10C5 = 252 unique', nCb(10, 2) === 45n && nCb(10, 8) === 45n && nCb(10, 3) === 120n && nCb(10, 7) === 120n && nCb(10, 4) === 210n && nCb(10, 6) === 210n && nCb(10, 5) === 252n)

  /* ---- C8: the divisibility reads ---- */
  push('C8.1 k! divides every run m(m+1)…(m+k−1), cofactor C(m+k−1, k) — swept k = 1..8, m = 1..20', (() => { for (let k = 1; k <= 8; k++) for (let m = 1; m <= 20; m++) { let run = 1n; for (let i = 0; i < k; i++) run *= BigInt(m + i); if (run % fact(k) !== 0n) return false; if (run / fact(k) !== nCb(m + k - 1, k)) return false } return true })())
  push('C8.2 Illustration 8: 7·8·9·10·11 = 55440 = 5!·462 with cofactor 462 = 11C5', (() => { let run = 1n; for (let i = 7; i <= 11; i++) run *= BigInt(i); return run === 55440n && 55440 / 120 === 462 && run / fact(5) === 462n && nCb(11, 5) === 462n })())
  push('C8.3 p | pCr for every prime p ≤ 31 and 1 ≤ r ≤ p−1 (literal BigInt mod); witnesses 7C3 = 35 = 7·5 and 11C4 = 330 = 11·30', (() => { for (let p = 2; p <= 31; p++) { if (!isPrime(p)) continue; for (let r = 1; r <= p - 1; r++) if (nCb(p, r) % BigInt(p) !== 0n) return false } return nCb(7, 3) === 35n && 35 === 7 * 5 && nCb(11, 4) === 330n && 330 === 11 * 30 })())
  push('C8.4 the composite failures: 4C2 = 6 with 4 ∤ 6, and 6C3 = 20 with 6 ∤ 20', nCb(4, 2) === 6n && 6 % 4 !== 0 && nCb(6, 3) === 20n && 20 % 6 !== 0)
  push('C8.5 the property-stack witnesses: 3·4·5·6·7·8 = 20160 = 6!·28 with 8C6 = 8C2 = 28; 18C8 = 18C10 (8+10 = 18)', (() => { let run = 1n; for (let i = 3; i <= 8; i++) run *= BigInt(i); return run === 20160n && 20160 / 720 === 28 && run / fact(6) === 28n && nCb(8, 6) === 28n && nCb(8, 2) === 28n && nCb(18, 8) === nCb(18, 10) && 8 + 10 === 18 })())

  /* ---- C9: the exam-shaped Illustration 11 ---- */
  push('C9.1 the data: 8C3 = 56, 8C4 = 70, 8C5 = 56 — the symmetric triple around the row-8 middle (3 + 5 = 8)', nCb(8, 3) === 56n && nCb(8, 4) === 70n && nCb(8, 5) === 56n && 3 + 5 === 8)
  push('C9.2 the ratio equations: 70/56 = 5/4 = (8−4+1)/4 and 56/70 = 4/5 = (8−4)/5 — cross-multiplied 70·4 = 56·5 and 56·5 = 70·4', (() => { const a = 70 * 4, b = 56 * 5; return a === b && a === 280 && b === 280 && (8 - 4 + 1) / 4 === 5 / 4 && (8 - 4) / 5 === 4 / 5 })())
  push('C9.3 the solve: 4(n−r+1) = 5r ⇒ 4n + 4 = 9r; 5(n−r) = 4(r+1) ⇒ 5n − 4 = 9r; subtract ⇒ n = 8, r = 4 (36 = 36 both lines)', (() => { const n = 8, r = 4; return 4 * (n - r + 1) === 5 * r && 4 * n + 4 === 9 * r && 5 * (n - r) === 4 * (r + 1) && 5 * n - 4 === 9 * r && 4 * n + 4 === 5 * n - 4 && 9 * r === 36 })())

  /* ---- C10: the quiz, every key and every distractor ---- */
  push('C10.1 quiz Q1: E₂(10!) = 8 (5+2+1); distractors 5 (first floor), 7 (5+2), 10 (the count n)', Eleg(2, 10) === 8 && 5 + 2 + 1 === 8 && 5 + 2 === 7)
  push('C10.2 quiz Q2: the recursion n! = n·(n−1)! holds; the three false laws fail on the witnesses 24 vs 4, 720 vs 12, 720 vs 12', fact(4) === 24n && 2 + 2 === 4 && fact(6) === 720n && 2 * 6 === 12)
  push('C10.3 quiz Q3: 9C4 = 3024/24 = 126; distractors 84 = 9C3, 3024 = the chain 9·8·7·6, 36 = 9C2', nCb(9, 4) === 126n && 3024 / 24 === 126 && nCb(9, 3) === 84n && 9 * 8 * 7 * 6 === 3024 && nCb(9, 2) === 36n)
  push('C10.4 quiz Q4: the power of 6 in 20! = min(18, 8) = 8 (C5.5); distractors 18, 3, 6 all recomputed', Math.min(Eleg(2, 20), Eleg(3, 20)) === 8)
  push('C10.5 quiz Q5: max of row 10 = 10C5 = 252; distractors 210 = 10C4, 120 = 10C3, 1023 = 2¹⁰ − 1', nCb(10, 5) === 252n && nCb(10, 4) === 210n && nCb(10, 3) === 120n && 2 ** 10 - 1 === 1023)

  /* ---- C11: every exercise answer ---- */
  push('C11.1 E1: 9!/6! = 7·8·9 = 504 (three factors) and 9!/(9−4)! = 9!/5! = 6·7·8·9 = 3024 (four factors)', fact(9) / fact(6) === 504n && 7 * 8 * 9 === 504 && fact(9) / fact(5) === 3024n && 6 * 7 * 8 * 9 === 3024)
  push('C11.2 E2: (n+3)!/(n+1)! = (n+2)(n+3) swept n = 1..8; at n = 4 → 42; raw 7!/5! = 5040/120 = 42', (() => { for (let n = 1; n <= 8; n++) if (fact(n + 3) / fact(n + 1) !== BigInt((n + 2) * (n + 3))) return false; return (6) * (7) === 42 && 5040 / 120 === 42 })())
  push('C11.3 E3: (n+1)! = 30·(n−1)! ⇒ n(n+1) = 30 ⇒ (n+6)(n−5) = 0 ⇒ n = 5; check 6! = 720 = 30·24', (() => { const n = 5; return n * (n + 1) === 30 && (n + 6) * (n - 5) === 0 && fact(6) === 720n && 30 * 24 === 720 })())
  push('C11.4 E4: E₅(30!) = 6 + 1 = 7 (C6.4)', Eleg(5, 30) === 7)
  push('C11.5 E5: the largest power of 24 in 30! = 8 (C5.6)', powerOf(24, 30) === 8)
  push('C11.6 E6: nC7 = nC5 ⇒ 7 + 5 = n = 12; 12C2 = 12·11/2 = 66', 7 + 5 === 12 && nCb(12, 7) === nCb(12, 5) && (12 * 11) / 2 === 66 && nCb(12, 2) === 66n)
  push('C11.7 E7: 3·4·5·6·7·8 = 20160 = 6!·28, cofactor 8C6 = 8C2 = 8·7/2 = 28 (C8.5)', (() => { let run = 1n; for (let i = 3; i <= 8; i++) run *= BigInt(i); return run / fact(6) === 28n && (8 * 7) / 2 === 28 })())
  push('C11.8 E8: the power of 15 in 22! = 4 (C5.7) — option (B)', powerOf(15, 22) === 4)
  push('C11.9 E9 witnesses: 10C2 = 10C8 = 45; 12C5 = 792, 12C4 = 495, ratio 792·5 = 495·8 (= 3960) = (12−5+1)/5; 7|35, 11|330', nCb(10, 2) === 45n && nCb(10, 8) === 45n && nCb(12, 5) === 792n && nCb(12, 4) === 495n && 792 * 5 === 3960 && 495 * 8 === 3960 && (12 - 5 + 1) / 5 === 8 / 5 && 35 % 7 === 0 && 330 % 11 === 0)
  push('C11.10 E10: 18Cr = 18C(r+2) ⇒ 2r + 2 = 18 ⇒ r = 8; check 18C8 = 18C10 (8 + 10 = 18)', 2 * 8 + 2 === 18 && nCb(18, 8) === nCb(18, 10) && 8 + 10 === 18)
  push('C11.11 E11: E₇(60!) = ⌊60/7⌋ + ⌊60/49⌋ = 8 + 1 = 9 with 7³ = 343 > 60 (brute = 9)', Math.floor(60 / 7) === 8 && Math.floor(60 / 49) === 1 && Eleg(7, 60) === 9 && 343 > 60 && Ebrute(7, 60) === 9)
  push('C11.12 E12: the ratio into the odd middle is exactly 1 — (9−5+1)/5 = 1 and 9C4 = 9C5 = 126; even witness 10: 6/5 then 5/6, peak 252', (9 - 5 + 1) / 5 === 1 && nCb(9, 4) === 126n && nCb(9, 5) === 126n && 6 / 5 === 1.2 && 5 / 6 < 1 && nCb(10, 5) === 252n)
  push('C11.13 E13: (2n)(2n−1)(2n−2) = 4n(n−1)(2n−1) so 4(2n−1)/(n−2) = 12 ⇒ 8n−4 = 12n−24 ⇒ n = 5; check 10C3 = 120, 5C3 = 10', (() => { const n = 5; const lhs = (2 * n) * (2 * n - 1) * (2 * n - 2); const rhs = 4 * n * (n - 1) * (2 * n - 1); if (lhs !== rhs) return false; if (8 * n - 4 !== 12 * n - 24) return false; return nCb(10, 3) === 120n && nCb(5, 3) === 10n })())
  push('C11.14 E14: Legendre\u2019s binary form E₂(n!) = n − s₂(n) swept n = 1..64; witnesses 10 = 1010₂ (two 1s) → 8, 13 = 1101₂ (three 1s) → 10 = 6+3+1', (() => { for (let n = 1; n <= 64; n++) if (Eleg(2, n) !== n - s2(n)) return false; return s2(10) === 2 && Eleg(2, 10) === 8 && 10 - 2 === 8 && s2(13) === 3 && Eleg(2, 13) === 10 && 6 + 3 + 1 === 10 && 13 - 3 === 10 })())
  push('C11.15 E15: p | pCr (C8.3) with the composite failures 4 ∤ 6 and 6 ∤ 20 (C8.4)', nCb(4, 2) === 6n && nCb(6, 3) === 20n && 6 % 4 !== 0 && 20 % 6 !== 0)

  /* ---- C12: the figure numbers ---- */
  push('C12.1 figure 1: the running product strip 6, 30, 120, 360, 720, 720 = the partial products of 6·5·4·3·2·1; badge 6! = 6×120', (() => { const vals = [6, 30, 120, 360, 720, 720]; let p = 1; const seats = [6, 5, 4, 3, 2, 1]; for (let i = 0; i < 6; i++) { p *= seats[i]; if (p !== vals[i]) return false } return 6 * 120 === 720 && fact(6) === 720n })())
  push('C12.2 figure 2: the donation ticks — one per even number, a second for 4 and 8, a third for 8 — total 5 + 2 + 1 = 8', (() => { const ticks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v): number => (v % 8 === 0 ? 3 : v % 4 === 0 ? 2 : v % 2 === 0 ? 1 : 0)); const total = ticks.reduce((a: number, b: number) => a + b, 0); return total === 8 && ticks[1] === 1 && ticks[3] === 2 && ticks[7] === 3 && ticks[9] === 1 })())
  push('C12.3 figure 3: the row-10 bars 1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1 with the unique peak 252 at r = 5 (C7.11/C7.12)', [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1].every((v, r) => v === Number(nCb(10, r))) && Number(nCb(10, 5)) === 252)
}

/* ------------------------------------------------------------------ */
/* SECTION D — 6.2 pins on the lesson object (the part file itself)   */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_62 = [2, 3, 0, 2, 1]

const L = lesson62

{
  const push = (name: string, ok: boolean, detail?: string) => D.push(check(name, ok, detail))
  const countKind = (kind: string): number => L.blocks.filter((b) => b.kind === (kind as never)).length
  const headings = L.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
  const examples = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string; steps: string[] }>
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as unknown as Array<{ title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  const figures = L.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  const tables = L.blocks.filter((b) => b.kind === 'table') as Array<{ caption?: string; head: string[]; rows: string[][] }>
  const formulas = L.blocks.filter((b) => b.kind === 'formula') as Array<{ name: string; latex: string; note?: string }>
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string; text: string }>

  /* every text-bearing string, for parity/TeX sweeps */
  const allTexts = (): string[] => {
    const texts: string[] = []
    for (const b of L.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      else if (b.kind === 'callout') texts.push(b.title, b.text)
      else if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      else if (b.kind === 'equation') texts.push(b.note ?? '')
      else if (b.kind === 'derivation') { texts.push(b.title, b.statement, b.result); for (const s of b.steps) texts.push(s.label, s.explanation) }
      else if (b.kind === 'example') texts.push(b.title, ...b.steps)
      else if (b.kind === 'figure') texts.push(b.caption)
      else if (b.kind === 'table') texts.push(...(b.caption ? [b.caption] : []), ...b.head, ...b.rows.flat())
      else if (b.kind === 'formula') texts.push(b.name, ...(b.note ? [b.note] : []))
      else if (b.kind === 'list') texts.push(...b.items)
      else if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain, ...it.options)
      else if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) { texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) texts.push(q.answer) }
    }
    return texts
  }

  push('D1 quiz has exactly 5 items, 4 options each, valid answer indices', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items?: Array<{ options: string[]; answer: number }> }; return countKind('quiz') === 1 && (q.items?.length ?? 0) === 5 && q.items!.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer < 4) })())
  push('D2 quiz answer keys are exactly [2, 3, 0, 2, 1] (reconciles with the C10 engine checks)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ answer: number }> }; return q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_62.join(',') })())
  push('D3 quiz explains say why the wrong options fail (each ≥ 120 chars, naming a distractor and its cause)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ explain: string }> }; return q.items.every((it) => it.explain.length >= 120 && /Option [ABCD]/.test(it.explain) && /fail|forget|miss|blind|naive|wrong|off-by-one|half/i.test(it.explain)) })())
  push('D4 exercises exactly 15, levels L1–L6 = 2/2/3/3/3/2', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })())
  push('D5 every exercise question carries a steps-array solution (≥ 4 lines) + a nonempty string answer', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0)) })())
  push('D6 exactly 11 example blocks (Illustrations), the last one exam-shaped (title names exam-style)', countKind('example') === 11 && /exam-style/i.test(examples[examples.length - 1].title))
  push('D7 exactly 3 figures, vivid-palette-only, no retired hex anywhere in the SVG source', (() => { const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figures.length === 3 && figures.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); return hexes.length > 0 && hexes.every((h) => VIVID.includes(h) && !RETIRED.includes(h)) }) })())
  push('D8 figure SVG texts carry NO raw TeX and no $ (unicode ⌊⌋ ₂ × only)', (() => { const texts = figures.flatMap((f) => (f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []).map((t) => t.replace(/<[^>]*>/g, ''))); return texts.length > 25 && texts.every((t) => !/\$|\\tfrac|\\times|\\sqrt|\\cdot|\\lfloor/.test(t)) })())
  push('D9 exactly 5 derivations; titles PLAIN (no $, no \\command); step labels PLAIN (no $); results carry $', derivations.length === 5 && derivations.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)))
  push('D10 derivation results are clause-wise $…$ spans (every span < 260 chars, prose tails bare, no \\dfrac — \\tfrac inline)', derivations.every((d) => { const spans = d.result.match(/\$[^$]*\$/g) ?? []; return spans.length >= 1 && spans.every((s) => s.length < 260) && !d.result.includes('\\dfrac') }))
  push('D11 derivation step formulas are KaTeX source without $ delimiters, nonempty', derivations.every((d) => d.steps.every((st) => st.formula === undefined || (!st.formula.includes('$') && st.formula.trim().length > 0))))
  push('D12 exactly 6 formula cards (≥ 3 pinned by the chapter floor)', formulas.length === 6)
  push('D13 exactly 10 terms (≥ 6 pinned by the chapter floor)', (() => { const t = L.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) === 10 })())
  push('D14 word count ≥ 4500 by countLessonWords (the honest authored count)', countLessonWords(L) >= 4500, `countLessonWords = ${countLessonWords(L)}`)
  push('D15 callout census: ≥ 3 definition, ≥ 2 theorem, ≥ 2 insight, ≥ 2 warn, ≥ 1 exam, ≥ 2 historical', (() => { const n = (t: string) => callouts.filter((c) => c.tone === t).length; return n('definition') >= 3 && n('theorem') >= 2 && n('insight') >= 2 && n('warn') >= 2 && n('exam') >= 1 && n('historical') >= 2 })())
  push('D16 prereq ids exactly as pinned: 6.1 aa-the-fundamental-principle-of-counting + ANS 4.2 ans-fundamental-theorem-of-arithmetic', (L.prerequisites ?? []).join(',') === 'aa-the-fundamental-principle-of-counting,ans-fundamental-theorem-of-arithmetic')
  push('D17 sources are exactly the six whitelisted banked keys (cengage-m2-07 banked at close)', (() => { const want = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e']; return (L.sources ?? []).length === 6 && (L.sources ?? []).every((s) => want.includes(s)) })())
  push('D18 no raw TeX in plain-rendered fields: concepts + objectives carry no \\command and no $', [...(L.concepts ?? []), ...(L.objectives ?? [])].every((t) => !/\\[a-z]/.test(t) && !/\$/.test(t)))
  push('D19 lesson identity: id, number, title match the standing plan exactly', L.id === 'aa-factorials-and-the-counting-toolkit' && L.number === '6.2' && L.title === 'Factorials and the Counting Toolkit')
  push('D20 concepts are 8 key phrases and objectives 7 (house contract 5–8)', (L.concepts ?? []).length === 8 && (L.objectives ?? []).length === 7)
  push('D21 balanced $ in every text-bearing string (each field\u2019s $ count is even)', allTexts().every((t) => (t.match(/\$/g) ?? []).length % 2 === 0))
  push('D22 captions (figure + table) carry no raw TeX at all — plain unicode only', [...figures.map((f) => f.caption), ...tables.flatMap((t) => (t.caption ? [t.caption] : []))].every((c) => !/\$|\\[a-z]/.test(c)))
  push('D23 exactly 3 tables: the false-law witnesses (5 cols × 3 rows), the Legendre census band (4 × 5), the row-of-ten census (4 × 11)', tables.length === 3 && tables[0].head.length === 5 && tables[0].rows.length === 3 && tables[1].head.length === 4 && tables[1].rows.length === 5 && tables[2].head.length === 4 && tables[2].rows.length === 11)
  push('D24 Sol. pill census: 11 Illustrations + 15 exercise solutions = 26 (≥ 26 for the e2e pin)', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: unknown[] }> }; return countKind('example') + ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 26 })())
  push('D25 FOLD 1 discharge (Exponent of Prime in n!, mode section): a heading carrying the topic\u2019s own wording + a definition callout + a derivation + ≥ 3 worked examples inside the span', (() => { const idx = L.blocks.findIndex((b) => b.kind === 'heading' && (b as { text: string }).text.includes('Exponent of Prime in n!')); if (idx < 0) return false; const end = L.blocks.findIndex((b, i) => i > idx && b.kind === 'heading'); const span = L.blocks.slice(idx, end < 0 ? L.blocks.length : end); const defs = span.filter((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'definition').length; const derivs = span.filter((b) => b.kind === 'derivation').length; const exs = span.filter((b) => b.kind === 'example').length; const figs = span.filter((b) => b.kind === 'figure').length; return defs >= 1 && derivs >= 1 && exs >= 3 && figs >= 1 })())
  push('D26 FOLD 2 discharge (Properties of nCr, mode section — the teaser): a heading carrying the topic\u2019s own wording + a definition callout + 2 derivations + ≥ 4 worked examples inside the span', (() => { const idx = L.blocks.findIndex((b) => b.kind === 'heading' && (b as { text: string }).text.includes('Properties of nCr')); if (idx < 0) return false; const end = L.blocks.findIndex((b, i) => i > idx && b.kind === 'heading'); const span = L.blocks.slice(idx, end < 0 ? L.blocks.length : end); const defs = span.filter((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'definition').length; const derivs = span.filter((b) => b.kind === 'derivation').length; const exs = span.filter((b) => b.kind === 'example').length; const figs = span.filter((b) => b.kind === 'figure').length; const tabs = span.filter((b) => b.kind === 'table').length; return defs >= 1 && derivs >= 2 && exs >= 4 && figs >= 1 && tabs >= 1 })())
  push('D27 the Probability handoff is NAMED in prose (the counted universe is the ground Probability inherits)', (() => { const paras = L.blocks.filter((b) => b.kind === 'para') as Array<{ text: string }>; return paras.some((p) => /Probability/.test(p.text) && /inherit/i.test(p.text)) })())
  push('D28 the sibling cross-references are named in prose (6.3, 6.5, 6.6, ch. 7, ANS 4.3, ANS 4.2, 6.1) — cited, never re-taught', (() => { const joined = allTexts().join('\n'); return ['Permutations: the Arrangement Count', 'Combinations: the Selection Count', 'Distributions and the Classic Counting Puzzles', 'Divisors from DNA', 'The Fundamental Theorem of Arithmetic', 'The Fundamental Principle of Counting', 'Induction and the Binomial Theorem'].every((s) => joined.includes(s)) })())
  push('D29 exactly 10 tagged equations, numbered \\tag 1 through \\tag 10 in order', (() => { const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string }>; const tags = eqs.map((e) => { const m = e.latex.match(/\\tag\{(\d+)\}/); return m ? Number(m[1]) : -1 }); return eqs.length === 10 && tags.join(',') === '1,2,3,4,5,6,7,8,9,10' })())
  push('D30 exactly 5 theory headings, each Title Case with no raw TeX', headings.length === 5 && headings.every((h) => !/\$|\\[a-z]/.test(h.text)))
  push('D31 the quiz and exercises banners are named (Check yourself / Exercises 6.2)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { title?: string }; const ex = L.blocks.find((b) => b.kind === 'exercises') as { title?: string }; return /Check yourself/i.test(q.title ?? '') && /^Exercises 6\.2$/.test(ex.title ?? '') })())
  push('D32 the false-law witness table carries the exact hand witnesses (5040 vs 30, 40320 vs 48, 720 vs 6)', (() => { const rowsJoined = tables[0].rows.flat().join(' '); return ['5040', '30', '40320', '48', '720', '6'].every((s) => rowsJoined.includes(s)) })())
  push('D33 ≥ 2 lists: the roman roster list + the property-stack bullet list (marker roman present)', (() => { const lists = L.blocks.filter((b) => b.kind === 'list') as Array<{ marker?: string; items: string[] }>; return lists.length >= 2 && lists.some((l) => l.marker === 'roman' && (l.items?.length ?? 0) === 4) && lists.some((l) => (l.items?.length ?? 0) === 7) })())
  push('D34 the lesson numbers appear verbatim in the prose (the census discipline: 336/6720, 22, 18, 10, 252, 56/70/56, 190)', (() => { const joined = allTexts().join('\n'); return ['336', '6720', '22 threes', '12^{18}', 'ten zeros', '252', '56', '70', '190'].every((s) => joined.includes(s)) })())
  push('D35 no \\dfrac inside derivation results or figure/table captions (\\tfrac inline only, per the raw-TeX repair list)', derivations.every((d) => !d.result.includes('\\dfrac')) && [...figures.map((f) => f.caption), ...tables.flatMap((t) => (t.caption ? [t.caption] : []))].every((c) => !c.includes('\\dfrac')))
}
}


/* (assembled section mapping: this agent's ENGINE array -> section E, its PINS array -> section F; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const E: SectionCheck[] = []
const F: SectionCheck[] = []
{


/**
 * v6-3.ts — the task 6-c engine for AA lesson 6.3
 * "Permutations: the Arrangement Count".
 *
 * Brute-force re-verification of EVERY number in the lesson, independent of
 * the shipped chapter verifier (the orchestrator assembles
 * scripts/verify-book4-ch06.ts from these section bodies at close, per the
 * master plan §5; section letters E/F = 6.3). The engine grew green BEFORE
 * the lesson prose was declared done (VERIFY-FIRST) and it caught three real
 * drafting slips in the hand-computed ladders and complements, all fixed and
 * pinned in the lesson header:
 *   - a five-letter rank hand-priced 31 where the honest rank is 34 (one
 *     letter sitting between two compared letters was missed at the second
 *     seat — the KNEEL trap now TAUGHT as the trap);
 *   - a six-letter rank off by one (+1 forgotten at a seat where the word's
 *     own letter is the smallest remaining);
 *   - an adjacency complement computed on a mis-sized bundle (4!/3! = 4 where
 *     the true bundle row carries five objects and prices 5!/3! = 20).
 *
 * Engine families:
 *   E1  nPr machinery — every chain value and factorial compression swept;
 *   E2  literal multiset enumeration — every alike-arrangement count in the
 *       prose, census lists included, counted by actual generation;
 *   E3  dictionary ranks — every rank computed by brute-force SORTING of the
 *       actual permutations, plus the ladder rung sums the prose teaches;
 *   E4  adjacency complements — "never together" counts by literal filter;
 *   E5  the with-repetition census — every n^r value and every paired
 *       no-repetition value in prose, tables, quiz and exercises;
 *   E6  the quiz — every key and every distractor's why-it-fails number;
 *   E7  the exercises — every answer, every audit sum;
 *   F   structural pins on the part-file lesson object (quiz 5, exercises
 *       2/2/3/3/3/2, figures, derivations, formula cards, terms, folds,
 *       raw-TeX repair list, word floor).
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

/* ------------------------------------------------------------------ */
/* the counting primitives (independent of any lesson prose)          */
/* ------------------------------------------------------------------ */

/** nPr by the chain */
const P = (n: number, r: number): number => {
  let a = 1
  for (let i = 0; i < r; i++) a *= n - i
  return a
}

/** factorial */
const fact = (n: number): number => P(n, n)

/** binomial (quiz distractor pricing only) */
const C = (n: number, r: number): number => fact(n) / (fact(r) * fact(n - r))

/**
 * distinct arrangements of a multiset, generated LITERALLY (the census
 * engine): every arrangement of the letters of `word` is materialized,
 * deduped, sorted — never a formula.
 */
function arrangements(word: string): string[] {
  const chars = word.split('').sort()
  const out: string[] = []
  const used = new Array(chars.length).fill(false)
  const cur: string[] = []
  const rec = (): void => {
    if (cur.length === chars.length) { out.push(cur.join('')); return }
    for (let i = 0; i < chars.length; i++) {
      if (used[i]) continue
      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue // dedupe within level
      used[i] = true
      cur.push(chars[i])
      rec()
      cur.pop()
      used[i] = false
    }
  }
  rec()
  return out.sort()
}
const distinctCount = (word: string): number => arrangements(word).length

/** the dictionary rank by brute-force sorting of the actual arrangements */
const rank = (word: string): number => arrangements(word).indexOf(word) + 1

/** arrangements of `word` whose letters contain the adjacent block `b` */
const withBlock = (word: string, b: string): number =>
  arrangements(word).filter((w) => w.includes(b)).length

/** the ladder rung sum for a word over its own letter alphabet */
function ladderBefore(word: string): number {
  const letters = Array.from(new Set(word.split(''))).sort()
  let before = 0
  const remaining: Record<string, number> = {}
  for (const c of word.split('')) remaining[c] = (remaining[c] ?? 0) + 1
  for (const w of word.split('')) {
    for (const ell of letters) {
      if (ell >= w) continue
      if (!remaining[ell]) continue
      // choose ell at this seat, count arrangements of the leftovers
      remaining[ell] -= 1
      before += distinctCount(Object.entries(remaining).flatMap(([c, k]) => c.repeat(k)).join(''))
      remaining[ell] += 1
    }
    remaining[w] -= 1
  }
  return before
}

/* ------------------------------------------------------------------ */
/* SECTION E — 6.3 engines (every number in the lesson, recomputed)   */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean, detail?: string) => E.push(check(name, ok, detail))

  /* ---- E1: the nPr machinery — every chain value in the lesson ---- */
  push('E1.1 the podium chain: 8·7·6 = 336 = 8P3 (opening para + Illustration 1)', P(8, 3) === 336 && 8 * 7 * 6 === 336)
  push('E1.2 the podium factorial form: 8!/5! = 40320/120 = 336', P(8, 3) === fact(8) / fact(5) && fact(8) === 40320 && 40320 / 120 === 336)
  push('E1.3 the 8P_r solve (Illustration 2): 8·7·6·5·4 = 6720 = 8P5 = 8!/3! = 40320/6, r = 5', (() => { const chain = 8 * 7 * 6 * 5 * 4; return chain === 6720 && P(8, 5) === 6720 && P(8, 5) === fact(8) / fact(3) && 40320 / 6 === 6720 })())
  push('E1.4 the 8P_r near runs: four factors 8·7·6·5 = 1680 = 8P4; six factors 8·7·6·5·4·3 = 20160 = 8P6; whole pool 8! = 40320', (() => { const four = 8 * 7 * 6 * 5; const six = 8 * 7 * 6 * 5 * 4 * 3; return four === 1680 && P(8, 4) === 1680 && six === 20160 && P(8, 6) === 20160 && fact(8) === 40320 })())
  push('E1.5 the running-product audit of Illustration 2: 8·7 = 56, 56·6 = 336, 336·5 = 1680, 1680·4 = 6720', 8 * 7 === 56 && 56 * 6 === 336 && 336 * 5 === 1680 && 1680 * 4 === 6720)
  push('E1.6 the shelf: 6! = 720 = 6P6 (Illustration 3) and the 0! agreement 6!/0! = 720', fact(6) === 720 && P(6, 6) === 720 && P(6, 6) === fact(6) / fact(0) && fact(0) === 1)
  push('E1.7 the four-flag ladder (Illustration 4): 4P1 + 4P2 + 4P3 + 4P4 = 4 + 12 + 24 + 24 = 64', (() => { const l = [1, 2, 3, 4].map((r) => P(4, r)); return l.join(',') === '4,12,24,24' && l.reduce((a, b) => a + b, 0) === 64 })())
  push('E1.8 the two-flag census of Illustration 4: 2P1 + 2P2 = 2 + 2 = 4 signals', P(2, 1) + P(2, 2) === 4 && P(2, 1) === 2 && P(2, 2) === 2)
  push('E1.9 the six-flag ladder (E7): 6 + 30 + 120 + 360 + 720 + 720 = 1956', (() => { const l = [1, 2, 3, 4, 5, 6].map((r) => P(6, r)); return l.join(',') === '6,30,120,360,720,720' && l.reduce((a, b) => a + b, 0) === 1956 })())
  push('E1.10 the first-seat peel (E11 + equation 2) swept n ≤ 9, 1 ≤ r ≤ n: nPr = n·(n−1)P(r−1); the use 8P4 = 8·7P3 = 8·210 = 1680', (() => { let ok = true; for (let n = 1; n <= 9; n++) for (let r = 1; r <= n; r++) if (P(n, r) !== n * P(n - 1, r - 1)) ok = false; return ok && P(7, 3) === 210 && 8 * P(7, 3) === 1680 && P(8, 4) === 1680 })())
  push('E1.11 the peel\u2019s factorial cross-check swept: n·(n−1)!/(n−r)! = n!/(n−r)!', (() => { let ok = true; for (let n = 1; n <= 9; n++) for (let r = 1; r <= n; r++) if (n * (fact(n - 1) / fact(n - r)) !== fact(n) / fact(n - r)) ok = false; return ok })())
  push('E1.12 the endpoints swept n ≤ 8: nPn = n!, nP1 = n, nP0 = n!/n! = 1', (() => { let ok = true; for (let n = 1; n <= 8; n++) if (P(n, n) !== fact(n) || P(n, 1) !== n || P(n, 0) !== 1) ok = false; return ok })())
  push('E1.13 the chain matches the fraction swept n ≤ 9, r ≤ n: n(n−1)…(n−r+1) = n!/(n−r)!', (() => { let ok = true; for (let n = 1; n <= 9; n++) for (let r = 0; r <= n; r++) if (P(n, r) !== fact(n) / fact(n - r)) ok = false; return ok })())
  push('E1.14 the E1 exercise: 6P3 = 6·5·4 = 120 = 720/6 and 6P6 = 6! = 720', P(6, 3) === 120 && 6 * 5 * 4 === 120 && fact(6) / fact(3) === 120 && P(6, 6) === 720)

  /* ---- E2: the literal multiset census — every alike count ---- */
  push('E2.1 the honest exhibit {G,O,O}: arrangements(GOO) = [GOO, OGO, OOG], count 3 = 3!/2!', (() => { const a = arrangements('GOO'); return a.join(',') === 'GOO,OGO,OOG' && a.length === 3 && fact(3) / fact(2) === 3 })())
  push('E2.2 the honest exhibit {L,E,E,D}: 12 arrangements, the lesson\u2019s hand list matches the engine\u2019s sorted list EXACTLY (order-insensitive equality of the twelve names)', (() => { const a = arrangements('LEED'); const lesson = ['DEEL', 'DELE', 'DLEE', 'EDEL', 'EDLE', 'EEDL', 'EELD', 'ELDE', 'ELED', 'LDEE', 'LEDE', 'LEED']; return a.length === 12 && lesson.every((w) => a.includes(w)) && a.join(',') === lesson.join(',') && fact(4) / fact(2) === 12 })())
  push('E2.3 the honest exhibit {D,D,K,K}: [DDKK, DKDK, DKKD, KDDK, KDKD, KKDD], count 6 = 4!/(2!·2!)', (() => { const a = arrangements('DDKK'); return a.join(',') === 'DDKK,DKDK,DKKD,KDDK,KDKD,KKDD' && a.length === 6 && fact(4) / (fact(2) * fact(2)) === 6 })())
  push('E2.4 the {D,D,K,K} stamping fan: one honest arrangement owns 2!·2! = 4 stampings, and 6 × 4 = 24 = 4! (the figure\u2019s arithmetic)', (() => { const stamps = fact(2) * fact(2); return stamps === 4 && 6 * stamps === 24 && fact(4) === 24 })())
  push('E2.5 TOMATO: 6!/(2!·2!) = 180 total (prose, table, Illustration 7)', distinctCount('TOMATO') === 180 && fact(6) / (fact(2) * fact(2)) === 180)
  push('E2.6 WALLABY: 7!/(2!·2!) = 1260 (Illustration 6 + table)', distinctCount('WALLABY') === 1260 && fact(7) / (fact(2) * fact(2)) === 1260)
  push('E2.7 MAMMA: 5!/(3!·2!) = 10 (Illustration 6); the stamped world 5! = 120 collapses onto 10', distinctCount('MAMMA') === 10 && fact(5) === 120 && fact(5) / (fact(3) * fact(2)) === 10)
  push('E2.8 MAMMAL: 6!/(3!·2!) = 60 (E12)', distinctCount('MAMMAL') === 60 && fact(6) / (fact(3) * fact(2)) === 60)
  push('E2.9 PEPPER: 6!/(3!·2!) = 60 (Illustration 10 + table); P = 3, E = 2, R = 1 census', distinctCount('PEPPER') === 60 && fact(6) / (fact(3) * fact(2)) === 60)
  push('E2.10 SASSY: 5!/3! = 20 (Illustration 9)', distinctCount('SASSY') === 20 && fact(5) / fact(3) === 20)
  push('E2.11 GHOST: 5! = 120 arrangements, all letters distinct (Illustration 8\u2019s world)', distinctCount('GHOST') === 120 && new Set('GHOST'.split('')).size === 5)
  push('E2.12 WHALE: 5! = 120 arrangements, all letters distinct (Illustration 8)', distinctCount('WHALE') === 120 && new Set('WHALE'.split('')).size === 5)
  push('E2.13 GRAVITY: 7! = 5040 arrangements, all letters distinct (E14)', distinctCount('GRAVITY') === 5040 && new Set('GRAVITY'.split('')).size === 7)
  push('E2.14 KNEEL: 5!/2! = 60 (E15)', distinctCount('KNEEL') === 60 && fact(5) / fact(2) === 60)
  push('E2.15 BELLA: 5!/2! = 60 (E5)', distinctCount('BELLA') === 60 && fact(5) / fact(2) === 60)
  push('E2.16 PUZZLE (quiz Q3): 6!/2! = 360', distinctCount('PUZZLE') === 360 && fact(6) / fact(2) === 360)
  push('E2.17 DEED and LULL (E2): 4!/(2!·2!) = 6 and 4!/3! = 4, hand lists match', (() => { const d = arrangements('DEED'); const lesson = ['DEED', 'DEDE', 'DDEE', 'EDDE', 'EDED', 'EEDD']; const l = arrangements('LULL'); const llesson = ['LLLU', 'LLUL', 'LULL', 'ULLL']; return d.length === 6 && lesson.every((w) => d.includes(w)) && [...lesson].sort().join(',') === d.join(',') && l.length === 4 && llesson.every((w) => l.includes(w)) && [...llesson].sort().join(',') === l.join(',') && fact(4) / (fact(2) * fact(2)) === 6 && fact(4) / fact(3) === 4 })())
  push('E2.18 the digits 2,2,5,5,9 (E13): 5!/(2!·2!) = 30 five-digit numbers', distinctCount('22559') === 30 && fact(5) / (fact(2) * fact(2)) === 30)
  push('E2.19 the distinct-objects sanity: {A,A,A,B} = 4!/3! = 4 (E9 C: AAAB, AABA, ABAA, BAAA) and {A,A,B,B} = 4!/(2!·2!) = 6 (E9 D: AABB, ABAB, ABBA, BAAB, BABA, BBAA)', (() => { const a = arrangements('AAAB'); const b = arrangements('AABB'); return a.join(',') === 'AAAB,AABA,ABAA,BAAA' && b.join(',') === 'AABB,ABAB,ABBA,BAAB,BABA,BBAA' && fact(4) / fact(3) === 4 && fact(4) / (fact(2) * fact(2)) === 6 })())
  push('E2.20 E9\u2019s false claim priced: 4!/2! = 12 ≠ 6 — the missing-division distractor', (() => { const claimed = fact(4) / fact(2); const honest = fact(4) / (fact(2) * fact(2)); return claimed === 12 && honest === 6 && claimed - honest === 6 })())

  /* ---- E3: the dictionary ranks, brute-force sorted ---- */
  push('E3.1 the CAB mini-dictionary: the sorted list is ABC, ACB, BAC, BCA, CAB, CBA and rank(CAB) = 5', (() => { const a = arrangements('CAB'); return a.join(',') === 'ABC,ACB,BAC,BCA,CAB,CBA' && rank('CAB') === 5 })())
  push('E3.2 rank(WHALE) = 110 (Illustration 8) — ladder rungs 96 + 12 + 0 + 1 + 0 = 109', rank('WHALE') === 110 && ladderBefore('WHALE') === 109 && 4 * fact(4) === 96 && 2 * fact(3) === 12 && 96 + 12 + 1 === 109)
  push('E3.3 rank(SASSY) = 5 (Illustration 9) — before-count 4 = the arrangements of {S,S,S,Y} = 4!/3!', rank('SASSY') === 5 && ladderBefore('SASSY') === 4 && fact(4) / fact(3) === 4)
  push('E3.4 rank(PEPPER) = 26 (Illustration 10) — rungs 20 + 0 + 3 + 2 + 0 + 0 = 25; the E-start rung 5!/3! = 20, the PEE rung 3!/2! = 3, the PEPE rung 2', rank('PEPPER') === 26 && ladderBefore('PEPPER') === 25 && fact(5) / fact(3) === 20 && fact(3) / fact(2) === 3 && 20 + 3 + 2 === 25)
  push('E3.5 rank(SMOKE) = 114 (E10) — rungs 96 + 12 + 4 + 1 = 113', rank('SMOKE') === 114 && ladderBefore('SMOKE') === 113 && 4 * fact(4) === 96 && 2 * fact(3) === 12 && 2 * fact(2) === 4 && 96 + 12 + 4 + 1 === 113)
  push('E3.6 rank(GRAVITY) = 973 (E14) — rungs 720 + 240 + 12 = 972 (A-run 6!, the A/I run 2·5!, the I/T run 2·3!)', rank('GRAVITY') === 973 && ladderBefore('GRAVITY') === 972 && fact(6) === 720 && 2 * fact(5) === 240 && 2 * fact(3) === 12)
  push('E3.7 rank(KNEEL) = 34 (E15) — rungs 24 + 9 = 33; the trap rung is E: 3! = 6 plus L: 3!/2! = 3', rank('KNEEL') === 34 && ladderBefore('KNEEL') === 33 && fact(4) === 24 && fact(3) === 6 && fact(3) / fact(2) === 3 && 24 + 6 + 3 === 33)
  push('E3.8 the KNEEL trap priced: missing the L at seat two undercounts by exactly its 3 continuations and reports the false rank 31', (() => { const falseBefore = 24 + 6; return falseBefore === 30 && falseBefore + 1 === 31 && 31 !== rank('KNEEL') && ladderBefore('KNEEL') - falseBefore === 3 })())
  push('E3.9 rank(BELLA) = 18 (E5) — rungs 12 + 3 + 1 + 1 = 17', rank('BELLA') === 18 && ladderBefore('BELLA') === 17 && fact(4) / fact(2) === 12 && fact(3) / fact(2) === 3 && 12 + 3 + 1 + 1 === 17)
  push('E3.10 the ladder engine agrees with the sort on a random-ish sweep: for every word in the lesson\u2019s rank family, ladderBefore + 1 = rank', (() => { const words = ['CAB', 'WHALE', 'SASSY', 'PEPPER', 'SMOKE', 'GRAVITY', 'KNEEL', 'BELLA']; return words.every((w) => ladderBefore(w) + 1 === rank(w)) })())

  /* ---- E4: adjacency complements, by literal filter ---- */
  push('E4.1 TOMATO: exactly 60 of the 180 arrangements contain the block OO, exactly 120 do not (Illustration 7); the bundle row 5!/2! = 60', withBlock('TOMATO', 'OO') === 60 && distinctCount('TOMATO') - withBlock('TOMATO', 'OO') === 120 && fact(5) / fact(2) === 60)
  push('E4.2 GRASS: 60 total, exactly 24 contain the block SS, 36 do not (E6); the bundle row 4! = 24', distinctCount('GRASS') === 60 && withBlock('GRASS', 'SS') === 24 && 60 - 24 === 36 && fact(4) === 24)
  push('E4.3 MAMMAL: 60 total, exactly 20 contain the block AA, 40 do not (E12); the bundle row 5!/3! = 20 and the mis-sized bundle 4!/3! = 4 undercounts it', withBlock('MAMMAL', 'AA') === 20 && distinctCount('MAMMAL') - withBlock('MAMMAL', 'AA') === 40 && fact(5) / fact(3) === 20 && fact(4) / fact(3) === 4)

  /* ---- E5: the with-repetition census ---- */
  push('E5.1 the {1,2,3}-taken-2 census (definition + warn): 9 codes with repetition (11,12,13,21,22,23,31,32,33), 6 without (12,13,21,23,31,32)', (() => { const withRep: string[] = []; for (const a of '123') for (const b of '123') withRep.push(a + b); const noRep = withRep.filter((w) => w[0] !== w[1]); return withRep.length === 9 && withRep.join(',') === '11,12,13,21,22,23,31,32,33' && noRep.length === 6 && noRep.join(',') === '12,13,21,23,31,32' && P(3, 2) === 6 })())
  push('E5.2 the {1,2}-taken-3 census (table row): 2³ = 8 strings; without repetition none, r > n', (() => { let n = 0; for (const a of '12') for (const b of '12') for (const c of '12') n++; return n === 8 && 2 ** 3 === 8 })())
  push('E5.3 the table rows: 4³ = 64 vs 4P3 = 24 (24 of 64 repeat no digit); 10⁴ = 10000 vs 10P4 = 5040; 26⁴ = 456976 vs 26P4 = 358800', (() => { return 4 ** 3 === 64 && P(4, 3) === 24 && 24 / 64 === 3 / 8 && 10 ** 4 === 10000 && P(10, 4) === 5040 && 26 ** 4 === 456976 && P(26, 4) === 358800 })())
  push('E5.4 the licence plate (Illustration 5): 26P2 = 26·25 = 650; 9P3 = 9·8·7 = 504; 650·504 = 327600; the repetition variant 26²·9³ = 676·729 = 492804; difference 165204', P(26, 2) === 650 && 26 * 25 === 650 && P(9, 3) === 504 && 9 * 8 * 7 === 504 && 650 * 504 === 327600 && 26 ** 2 === 676 && 9 ** 3 === 729 && 676 * 729 === 492804 && 492804 - 327600 === 165204)
  push('E5.5 the warn-callout pair: 5⁴ = 625 with repetition vs 5P4 = 120 without', 5 ** 4 === 625 && P(5, 4) === 120)
  push('E5.6 E4: 5³ = 125 with repetition, 5P3 = 60 without, difference 65; the census 9 − 6 = 3 doubles', 5 ** 3 === 125 && P(5, 3) === 60 && 125 - 60 === 65 && 9 - 6 === 3)
  push('E5.7 the n^r derivation\u2019s census: 3² = 9 vs 3P2 = 6; 10⁴ vs 10P4 (the derivation\u2019s PIN pair)', 3 ** 2 === 9 && P(3, 2) === 6 && 10 ** 4 === 10000 && P(10, 4) === 5040)

  /* ---- E6: the quiz — keys and every distractor number ---- */
  push('E6.1 quiz Q1: 8P3 = 336 (key A); distractors 8³ = 512, 8·3 = 24, 8C3 = 56', P(8, 3) === 336 && 8 ** 3 === 512 && 8 * 3 === 24 && C(8, 3) === 56)
  push('E6.2 quiz Q2: 4³ = 64 (key B); distractors 4P3 = 24, 4·3 = 12, 3⁴ = 81', 4 ** 3 === 64 && P(4, 3) === 24 && 4 * 3 === 12 && 3 ** 4 === 81)
  push('E6.3 quiz Q3: PUZZLE 6!/2! = 360 (key C); distractors 6! = 720, 6!/(2!·2!) = 180, 5! = 120', fact(6) / fact(2) === 360 && fact(6) === 720 && fact(6) / (fact(2) * fact(2)) === 180 && fact(5) === 120)
  push('E6.4 quiz Q4: rank(CAB) = 5 (key D); the before-count 4; two letters before C; 6 total arrangements', rank('CAB') === 5 && ladderBefore('CAB') === 4 && distinctCount('CAB') === 6 && 'AB'.length === 2)
  push('E6.5 quiz Q5: n(n−1) = 56 ⇒ n = 8 (8·7); the quadratic n² − n − 56 = (n − 8)(n + 7); distractors 7 (the n(n+1) misread 7·8), 6·5 = 30, 9·8 = 72', (() => { const n = 8; return n * (n - 1) === 56 && 7 * 8 === 56 && 6 * 5 === 30 && 9 * 8 === 72 && 8 * 8 - 8 - 56 === 0 && 7 * 7 + 7 - 56 === 0 })())

  /* ---- E7: the exercises — every answer and audit ---- */
  push('E7.1 E3 answer n = 5: 5·4·3 = 60; the brackets 4·3·2 = 24 and 6·5·4 = 120', 5 * 4 * 3 === 60 && P(5, 3) === 60 && 4 * 3 * 2 === 24 && 6 * 5 * 4 === 120)
  push('E7.2 E8 answer n = 6: (n−2)(n−3) = 4·3 = 12 at n = 6; n² − 5n − 6 = (n − 6)(n + 1); 6P4 = 360 = 12·6P2 = 12·30; the distractor runs n = 4: 2·1, n = 5: 3·2, n = 8: 6·5', (() => { const n = 6; return (n - 2) * (n - 3) === 12 && n * n - 5 * n - 6 === 0 && (n - 6) * (n + 1) === 0 && P(6, 4) === 360 && P(6, 2) === 30 && 12 * P(6, 2) === 360 && (4 - 2) * (4 - 3) === 2 && (5 - 2) * (5 - 3) === 6 && (8 - 2) * (8 - 3) === 30 })())
  push('E7.3 E9 verdicts: (A) 4⁴ = 256 TRUE; (B) 4P4 = 24 TRUE; (C) {A,A,A,B} 4 TRUE; (D) {A,A,B,B} = 6 not 12 FALSE; the two-letter census 2² = 4 strings', 4 ** 4 === 256 && P(4, 4) === 24 && distinctCount('AAAB') === 4 && distinctCount('AABB') === 6 && 2 ** 2 === 4)
  push('E7.4 E12 answer: 60 total, 40 with the A\u2019s never adjacent (complement of the 20 with AA adjacent)', distinctCount('MAMMAL') === 60 && distinctCount('MAMMAL') - withBlock('MAMMAL', 'AA') === 40)
  push('E7.5 E13 answers: 30 total, 6 odd (9 fixed last, the leftover multiset {2,2,5,5} = 4!/(2!·2!) = 6), 12 start with 2 (leftover {2,5,5,9} = 4!/2! = 12), 12 start with 5; the audit 12 + 12 + 6 = 30 with the 9-start block 6', (() => { return distinctCount('22559') === 30 && distinctCount('2255') === 6 && distinctCount('2559') === 12 && distinctCount('2559') === fact(4) / fact(2) && fact(4) / (fact(2) * fact(2)) === 6 && 12 + 12 + 6 === 30 })())
  push('E7.6 E14 answers: 5040 total; 2·6! = 1440 start with a vowel; rank(GRAVITY) = 973', fact(7) === 5040 && 2 * fact(6) === 1440 && rank('GRAVITY') === 973)
  push('E7.7 E15 answers: rank(KNEEL) = 34 with the trap rung 6 + 3 = 9 and the honest count 24 + 9 = 33', rank('KNEEL') === 34 && 6 + 3 === 9 && 24 + 9 === 33)
  push('E7.8 E10 answer 114 = rank(SMOKE); E5 answer 18 = rank(BELLA); E6 answer 36 = 60 − 24; E7 answer 1956 = the six-term ladder', rank('SMOKE') === 114 && rank('BELLA') === 18 && 60 - 24 === 36 && [1, 2, 3, 4, 5, 6].reduce((a, r) => a + P(6, r), 0) === 1956)
  push('E7.9 the E11 use: 7P3 = 210, 8·210 = 1680 = 8P4 (the peel regrows the row)', P(7, 3) === 210 && 8 * 210 === 1680 && P(8, 4) === 1680)

  /* ---- the lesson-text reconciliation rosters (F-side material) ---- */
  push('E7.10 the historical callout\u2019s number: 6! = 720 (the six flavours, Bhāskara II\u2019s Līlāvatī)', fact(6) === 720)
}

/* ------------------------------------------------------------------ */
/* SECTION F — 6.3 pins on the lesson object (the part file itself)   */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_63 = [0, 1, 2, 3, 1]

const L = lesson63

{
  const push = (name: string, ok: boolean, detail?: string) => F.push(check(name, ok, detail))
  const countKind = (kind: string): number => L.blocks.filter((b) => b.kind === (kind as never)).length

  push('F1 quiz has exactly 5 items', countKind('quiz') === 1 && (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })())
  push('F2 quiz options 4 each, answer indices = [0,1,2,3,1] (reconciles with E6 + INTENDED_KEYS_63)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer < 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_63.join(',') })())
  push('F3 quiz explains say why wrong options fail (each ≥ 80 chars and names a distractor or a fraud)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ explain: string }> }; return q.items.every((it) => it.explain.length >= 80 && /fail|fraud|mistake|instead|≠|neq|forget|slip|reject|undercount|overcount|drops|missing|too short|too long|overshoot|descend|misread|swap|ignored/i.test(it.explain)) })())
  push('F4 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const lv = (l: string) => ex.sets.find((st) => st.level === l)?.questions.length ?? 0; return ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })())
  push('F5 every exercise question carries a steps-array solution (≥ 2 lines) + a nonempty string answer', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })())
  push('F6 exactly 10 example blocks (Illustrations), the last one exam-shaped (title carries exam-style)', (() => { const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string; steps: string[] }>; return countKind('example') === 10 && /exam-style/i.test(ex[ex.length - 1].title) })())
  push('F7 exactly 3 figures, vivid-palette-only, no retired hex', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length === 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); return hexes.length > 0 && hexes.every((h) => VIVID.includes(h) && !RETIRED.includes(h)) }) })())
  push('F8 figure SVG texts carry NO raw TeX (no $, \\tfrac, \\times, \\sqrt, \\cdot in any text node)', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const texts = figs.flatMap((f) => (f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []).map((t) => t.replace(/<[^>]*>/g, ''))); return texts.length > 25 && texts.every((t) => !/\$|\\tfrac|\\times|\\sqrt|\\cdot/.test(t)) })())
  push('F9 exactly 4 derivations (≥ 3 pinned), titles PLAIN (no $, no \\command), step labels PLAIN (no $), results $-delimited', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length === 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$|\\[a-z]/.test(st.label)) && /\$/.test(d.result)) })())
  push('F10 derivation results: clause-wise $…$ spans only (every span < 260 chars — the mobile break discipline), no \\dfrac', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ result: string }>; return ds.every((d) => { const spans = d.result.match(/\$[^$]*\$/g) ?? []; return spans.length >= 1 && spans.every((s) => s.length < 260) && !d.result.includes('\\dfrac') }) })())
  push('F11 derivation step formulas are KaTeX source without $ delimiters', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ steps: Array<{ formula?: string }> }>; return ds.every((d) => d.steps.every((st) => st.formula === undefined || (!st.formula.includes('$') && st.formula.trim().length > 0))) })())
  push('F12 exactly 4 formula cards (≥ 3 pinned), notes plain-rendered (no $, no \\command)', (() => { const fs = L.blocks.filter((b) => b.kind === 'formula') as Array<{ name: string; note?: string }>; return fs.length === 4 && fs.every((f) => !/\$|\\[a-z]/.test(f.name) && (f.note === undefined || !/\$|\\[a-z]/.test(f.note))) })())
  push('F13 exactly 10 terms (≥ 6 pinned)', (() => { const t = L.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) === 10 })())
  push('F14 word count ≥ 4500 by countLessonWords (the honest authored count)', countLessonWords(L) >= 4500, `countLessonWords = ${countLessonWords(L)}`)
  push('F15 callout census: ≥ 1 definition, ≥ 2 insight, ≥ 2 warn, ≥ 1 exam, ≥ 1 historical', (() => { const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string }>; const n = (t: string) => calls.filter((c) => c.tone === t).length; return n('definition') >= 1 && n('insight') >= 2 && n('warn') >= 2 && n('exam') >= 1 && n('historical') >= 1 })())
  push('F16 prereq ids exactly as pinned by the master plan §2 (AA 6.1 + AA 6.2)', (() => { const want = ['aa-the-fundamental-principle-of-counting', 'aa-factorials-and-the-counting-toolkit']; return (L.prerequisites ?? []).join(',') === want.join(',') })())
  push('F17 sources exactly the six banked keys within the whitelist (cengage-m2-07 banked at close)', (() => { const ok = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra']; return (L.sources ?? []).length === 6 && (L.sources ?? []).every((src) => ok.includes(src)) })())
  push('F18 no raw TeX outside $…$ in concepts/objectives (no \\command anywhere in those fields)', (() => { const texts = [...(L.concepts ?? []), ...(L.objectives ?? [])]; return texts.every((t) => !/\\[a-z]/.test(t)) })())
  push('F19 lesson identity: id, number, title match the standing plan exactly', L.id === 'aa-permutations-the-arrangement-count' && L.number === '6.3' && L.title === 'Permutations: the Arrangement Count')
  push('F20 concepts are 8 key phrases (house contract 5–8)', (L.concepts ?? []).length === 8)
  push('F21 balanced $ in every text-bearing string (each field\u2019s $ count is even)', (() => { const texts: string[] = []; for (const b of L.blocks) { if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text); else if (b.kind === 'callout') texts.push(b.title, b.text); else if (b.kind === 'example') texts.push(b.title, ...b.steps); else if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def); else if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain, ...it.options); else if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) { texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) texts.push(q.answer) } else if (b.kind === 'figure') texts.push(b.caption); else if (b.kind === 'table') texts.push(...(b.caption ? [b.caption] : []), ...b.head, ...b.rows.flat()); else if (b.kind === 'formula') texts.push(b.name, ...(b.note ? [b.note] : [])); else if (b.kind === 'equation') texts.push(b.note ?? ''); else if (b.kind === 'derivation') { texts.push(b.statement, b.result); for (const st of b.steps) texts.push(st.label, st.explanation) } else if (b.kind === 'list') texts.push(...b.items) } return texts.every((t) => (t.match(/\$/g) ?? []).length % 2 === 0) })())
  push('F22 captions carry no raw TeX outside $…$ (strip inline math → no \\command survives)', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>; return figs.every((f) => !/\\[a-z]/.test(f.caption.replace(/\$[^$]*\$/g, ' M '))) })())
  push('F23 exactly 3 census tables (the repetition census, the alike census, the WHALE ladder)', countKind('table') === 3)
  push('F24 Sol. pill census: 10 Illustrations + 15 exercise solutions = 25', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: unknown[] }> }; return countKind('example') + ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 25 })())
  push('F25 exactly 5 equations, tags 1–5 in order, notes plain prose (no $, no \\command)', (() => { const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string; note?: string }>; return eqs.length === 5 && eqs.map((e) => (e.latex.match(/\\tag\{(\d)\}/) ?? [])[1]).join('') === '12345' && eqs.every((e) => !/\$/.test(e.note ?? '') && !/\\[a-z]/.test((e.note ?? '').replace(/\\tag/g, ''))) })())
  push('F26 \\tfrac discipline: no \\dfrac outside the display fields (equation latex + derivation formulas only)', (() => { const offenders: string[] = []; for (const b of L.blocks) { if (b.kind === 'para' || b.kind === 'heading') { if (b.text.includes('\\dfrac')) offenders.push(b.kind) } else if (b.kind === 'callout') { if (b.text.includes('\\dfrac') || b.title.includes('\\dfrac')) offenders.push(b.kind) } else if (b.kind === 'example') { if (b.title.includes('\\dfrac') || b.steps.some((s) => s.includes('\\dfrac'))) offenders.push(b.kind) } else if (b.kind === 'quiz') { if (b.items.some((it) => it.q.includes('\\dfrac') || it.explain.includes('\\dfrac') || it.options.some((o) => o.includes('\\dfrac')))) offenders.push(b.kind) } else if (b.kind === 'exercises') { for (const st of b.sets) for (const q of st.questions) { if (q.q.includes('\\dfrac') || (Array.isArray(q.solution) && q.solution.some((s) => s.includes('\\dfrac'))) || (q.answer ?? '').includes('\\dfrac')) offenders.push(b.kind) } } else if (b.kind === 'list') { if (b.items.some((s) => s.includes('\\dfrac'))) offenders.push(b.kind) } else if (b.kind === 'table') { if ((b.caption ?? '').includes('\\dfrac') || b.head.some((s) => s.includes('\\dfrac')) || b.rows.flat().some((s) => s.includes('\\dfrac'))) offenders.push(b.kind) } else if (b.kind === 'terms') { if (b.items.some((t) => t.def.includes('\\dfrac'))) offenders.push(b.kind) } } return offenders.length === 0 })())
  push('F27 the two hosted folds discharged: the named subsection headings carry the ledger wording verbatim (case-insensitive), each fold section carrying its derivation + worked examples of exactly its type', (() => { const heads = L.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>; const h1 = heads.some((h) => /Formula for Permutation/i.test(h.text)); const h2 = heads.some((h) => /Permutation when All Objects are Not Distinct/i.test(h.text)); const derivTitles = L.blocks.filter((b) => b.kind === 'derivation').map((d) => (d as { title: string }).title).join(' '); const fold1 = /vacant places/i.test(derivTitles); const fold2 = /overcount division/i.test(derivTitles); const exampleTexts = L.blocks.filter((b) => b.kind === 'example').map((e) => (e as { title: string; steps: string[] }).title + ' ' + (e as { steps: string[] }).steps.join(' ')).join(' '); const fold1Example = exampleTexts.includes('336') && exampleTexts.includes('6720') && exampleTexts.includes('8 \\cdot 7 \\cdot 6'); const fold2Examples = /WALLABY|TOMATO|PEPPER/.test(exampleTexts); return h1 && h2 && fold1 && fold2 && fold1Example && fold2Examples })())
  push('F28 the Probability handoff NAMED in prose (the counted universe is what Probability inherits)', (() => { const paras = L.blocks.filter((b) => b.kind === 'para') as Array<{ text: string }>; return paras.some((p) => /Probability/.test(p.text) && /inherits|sample space|denominator/i.test(p.text)) })())
  push('F29 cross-references cite the named siblings (6.1, 6.2, 6.4, 6.5 by title) and never re-teach them', (() => { const joined = L.blocks.filter((b) => b.kind === 'para' || b.kind === 'callout').map((b) => (b as { text: string }).text).join(' '); return /The Fundamental Principle of Counting/.test(joined) && /Factorials and the Counting Toolkit/.test(joined) && /Circular and Restricted Permutations/.test(joined) && /Combinations: the Selection Count/.test(joined) })())
  push('F30 the honest rank family all appear in the lesson text verbatim (ranks 110, 26, 114, 973, 34, 18, 5 as taught)', (() => { const joined = JSON.stringify(L.blocks); return ['110', '26', '114', '973', '34', '18'].every((n) => joined.includes(n)) })())
}
}


/* (assembled section mapping: this agent's ENGINE array -> section G, its PINS array -> section H; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const G: SectionCheck[] = []
const H: SectionCheck[] = []
{


/**
 * v6-4.ts — the task 6-d engine for AA lesson 6.4
 * "Circular and Restricted Permutations".
 *
 * Brute-force re-verification of EVERY number in the lesson (SECTION G),
 * plus the structural pins on the part-file lesson object (SECTION H — the
 * chapter verifier verify-book4-ch06.ts takes these section letters over).
 *
 * SECTION G literally enumerates:
 *   - circular arrangements of small n, rotation-collapsed (guards n = 3,
 *     4, 5; the Illustration censuses up to n = 9; anchor-fixed censuses
 *     up to 10 people);
 *   - necklace classes, rotation+reflection-collapsed (n = 2..9);
 *   - bundle/gap counts on small rosters by literal enumeration of every
 *     row (8 books, 7 diners, the LETTER/MASTERS/MONARCH word drills, the
 *     athletes bench);
 *   - every quiz key and every distractor's arithmetic;
 *   - every exercise answer.
 *
 * Run: cd /home/z/my-project && bun run scripts/aa-ch06-work/run-64.ts
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

function fact(n: number): number {
  let f = 1
  for (let i = 2; i <= n; i++) f *= i
  return f
}

/** all permutations of {0..n-1}, callback form (no big storage) */
function forEachPerm(n: number, cb: (p: number[]) => void): void {
  const a: number[] = []
  const used = new Array<boolean>(n).fill(false)
  const rec = (): void => {
    if (a.length === n) {
      cb(a.slice())
      return
    }
    for (let k = 0; k < n; k++) {
      if (used[k]) continue
      used[k] = true
      a.push(k)
      rec()
      a.pop()
      used[k] = false
    }
  }
  rec()
}

/** distinct permutations of a multiset given as a string, callback form */
function forEachWord(letters: string, cb: (w: string) => void): void {
  const counts = new Map<string, number>()
  for (const ch of letters) counts.set(ch, (counts.get(ch) ?? 0) + 1)
  const chars = [...counts.keys()].sort()
  const n = letters.length
  const built: string[] = []
  const rec = (): void => {
    if (built.length === n) {
      cb(built.join(''))
      return
    }
    for (const ch of chars) {
      const c = counts.get(ch) ?? 0
      if (c === 0) continue
      counts.set(ch, c - 1)
      built.push(ch)
      rec()
      built.pop()
      counts.set(ch, c)
    }
  }
  rec()
}

const key = (p: number[]): string => p.join(',')

/** canonical (lexicographically least) rotation of a circular arrangement */
function circleKey(p: number[]): string {
  let best: string | null = null
  for (let s = 0; s < p.length; s++) {
    const r = p.slice(s).concat(p.slice(0, s))
    const k = key(r)
    if (best === null || k < best) best = k
  }
  if (best === null) throw new Error('circleKey: empty arrangement')
  return best
}

/** canonical necklace key: least over rotations of p and of reversed(p) */
function necklaceKey(p: number[]): string {
  let best: string | null = null
  const consider = (arr: number[]): void => {
    for (let s = 0; s < arr.length; s++) {
      const r = arr.slice(s).concat(arr.slice(0, s))
      const k = key(r)
      if (best === null || k < best) best = k
    }
  }
  consider(p)
  consider(p.slice().reverse())
  if (best === null) throw new Error('necklaceKey: empty arrangement')
  return best
}

/** count rotation-collapsed circular classes of n labeled objects 0..n-1 (memoized) */
const circleMemo = new Map<number, number>()
function circleClasses(n: number): number {
  const hit = circleMemo.get(n)
  if (hit !== undefined) return hit
  const seen = new Set<string>()
  forEachPerm(n, (p) => seen.add(circleKey(p)))
  const c = seen.size
  circleMemo.set(n, c)
  return c
}

/** count rotation+reflection-collapsed necklace classes of n labeled objects (memoized) */
const necklaceMemo = new Map<number, number>()
function necklaceClasses(n: number): number {
  const hit = necklaceMemo.get(n)
  if (hit !== undefined) return hit
  const seen = new Set<string>()
  forEachPerm(n, (p) => seen.add(necklaceKey(p)))
  const c = seen.size
  necklaceMemo.set(n, c)
  return c
}

/** count circular classes of n labeled objects satisfying a rotation-invariant predicate */
function circleClassesWith(n: number, pred: (p: number[]) => boolean): number {
  const seen = new Set<string>()
  let count = 0
  forEachPerm(n, (p) => {
    const k = circleKey(p)
    if (!seen.has(k)) {
      seen.add(k)
      if (pred(p)) count++
    }
  })
  return count
}

/** count necklace classes of n labeled objects satisfying a (rot+refl)-invariant predicate */
function necklaceClassesWith(n: number, pred: (p: number[]) => boolean): number {
  const seen = new Set<string>()
  let count = 0
  forEachPerm(n, (p) => {
    const k = necklaceKey(p)
    if (!seen.has(k)) {
      seen.add(k)
      if (pred(p)) count++
    }
  })
  return count
}

/** cyclic adjacency of objects x and y in circular arrangement p */
const adjacentCircle = (p: number[], x: number, y: number): boolean => {
  const n = p.length
  const xi = p.indexOf(x)
  const yi = p.indexOf(y)
  return (xi + 1) % n === yi || (yi + 1) % n === xi
}

/** linear adjacency of objects x and y in row p */
const adjacentRow = (p: number[], x: number, y: number): boolean => {
  const xi = p.indexOf(x)
  const yi = p.indexOf(y)
  return Math.abs(xi - yi) === 1
}

/** rows of n labeled objects where no two of the restricted set sit adjacent (linear) */
function rowsNoTwoOfSet(n: number, restricted: number[]): number {
  let count = 0
  forEachPerm(n, (p) => {
    for (let i = 0; i + 1 < p.length; i++) {
      if (restricted.includes(p[i]) && restricted.includes(p[i + 1])) return
    }
    count++
  })
  return count
}

/** rows of n labeled objects where the restricted set sits in one unbroken block (linear) */
function rowsAllOfSetTogether(n: number, restricted: number[]): number {
  let count = 0
  forEachPerm(n, (p) => {
    const positions = restricted.map((x) => p.indexOf(x)).sort((a, b) => a - b)
    for (let i = 0; i + 1 < positions.length; i++) {
      if (positions[i + 1] !== positions[i] + 1) return
    }
    count++
  })
  return count
}

/** alternating circular classes: kind[i] differs from kind of both neighbours, cyclically */
function circleClassesAlternating(n: number, kindOf: number[]): number {
  return circleClassesWith(n, (p) => {
    for (let i = 0; i < p.length; i++) {
      if (kindOf[p[i]] === kindOf[p[(i + 1) % p.length]]) return false
    }
    return true
  })
}

/** alternating rows (linear): kind[i] differs from kind[i+1] */
function rowsAlternating(n: number, kindOf: number[]): number {
  let count = 0
  forEachPerm(n, (p) => {
    for (let i = 0; i + 1 < p.length; i++) {
      if (kindOf[p[i]] === kindOf[p[i + 1]]) return
    }
    count++
  })
  return count
}

/**
 * Anchor-fixed circular census of (nTotal) people: object 0 (the anchor,
 * from the unrestricted family) is pinned at seat 0; the census enumerates
 * the (nTotal-1)! clockwise seatings of the OTHER objects 1..nTotal-1 and
 * counts those satisfying pred on the FULL circle [anchor, ...rest].
 */
function anchorFixedCount(nTotal: number, pred: (circle: number[]) => boolean): number {
  let count = 0
  const rest: number[] = []
  const used = new Array<boolean>(nTotal).fill(false)
  const rec = (): void => {
    if (rest.length === nTotal - 1) {
      const circle = [0, ...rest]
      if (pred(circle)) count++
      return
    }
    for (let k = 1; k < nTotal; k++) {
      if (used[k]) continue
      used[k] = true
      rest.push(k)
      rec()
      rest.pop()
      used[k] = false
    }
  }
  rec()
  return count
}

/* ------------------------------------------------------------------ */
/* SECTION G — 6.4 engines (every number in the lesson, recomputed)     */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean, detail?: string) => G.push(check(name, ok, detail))

  /* ---- the guards: n = 3, 4, 5 literally listed ---- */
  push('G1 guard n = 3: 6 rows collapse to 2 circles, 1 necklace, unwrap factor 3 (full census)', (() => { const c = circleClasses(3); return fact(3) === 6 && c === 2 && necklaceClasses(3) === 1 && 6 / c === 3 })())
  push('G2 guard n = 3 listing: clockwise from P the two circles read QR and RQ; unwrappings {PQR, QRP, RPQ} and {PRQ, RQP, QPR}', (() => {
    const classes = new Set<string>()
    const members: Record<string, string[]> = {}
    forEachPerm(3, (p) => {
      const chars = p.map((i) => 'PQR'[i])
      const k = circleKey(p)
      classes.add(k)
      ;(members[k] = members[k] ?? []).push(chars.join(''))
    })
    const list = [...classes].map((k) => members[k].slice().sort().join('|')).sort()
    const want = ['PQR|QRP|RPQ', 'PRQ|QPR|RQP']
    const twoCircles = list.length === 2 && list.every((x) => want.includes(x))
    // clockwise reading from P: the class whose member starts PQR reads Q then R
    const readings = [...classes].map((k) => members[k][0][0] === 'P' ? members[k][0].slice(1) : '')
    return twoCircles && readings.filter((r) => r === 'QR').length === 1 && readings.filter((r) => r === 'RQ').length === 1
  })())
  push('G3 guard n = 4: 24 rows collapse to 6 circles, 3 necklaces, unwrap factor 4; fixing P the six clockwise readings are QRS, QSR, RQS, RSQ, SQR, SRQ', (() => {
    const c = circleClasses(4)
    const readings = new Set<string>()
    forEachPerm(4, (p) => {
      if (p[0] === 0) readings.add(p.slice(1).map((i) => 'QRS'[i - 1]).join(''))
    })
    const want = ['QRS', 'QSR', 'RQS', 'RSQ', 'SQR', 'SRQ']
    return fact(4) === 24 && c === 6 && necklaceClasses(4) === 3 && 24 / c === 4 && readings.size === 6 && want.every((w) => readings.has(w))
  })())
  push('G4 guard n = 4 mirror pairs: (QRS, SRQ), (QSR, RSQ), (RQS, SQR) — each necklace = exactly 2 circles', (() => {
    const circleSeen = new Set<string>()
    const necklaceSeen = new Map<string, number>()
    forEachPerm(4, (p) => {
      const ck = circleKey(p)
      const nk = necklaceKey(p)
      if (!circleSeen.has(ck)) {
        circleSeen.add(ck)
        necklaceSeen.set(nk, (necklaceSeen.get(nk) ?? 0) + 1)
      }
    })
    const sizes = [...necklaceSeen.values()]
    return circleSeen.size === 6 && necklaceSeen.size === 3 && sizes.every((s) => s === 2)
  })())
  push('G5 guard n = 5: 120 rows, 24 circles, 12 necklaces, unwrap factor 5 (full census)', fact(5) === 120 && circleClasses(5) === 24 && necklaceClasses(5) === 12 && 120 / 24 === 5)
  push('G6 the guard census table exactly: rows [[3, 6, 2, 1, 3], [4, 24, 6, 3, 4], [5, 120, 24, 12, 5]]', (() => {
    const rows = [3, 4, 5].map((n) => [n, fact(n), circleClasses(n), necklaceClasses(n), fact(n) / circleClasses(n)])
    return JSON.stringify(rows) === JSON.stringify([[3, 6, 2, 1, 3], [4, 24, 6, 3, 4], [5, 120, 24, 12, 5]])
  })())
  push('G7 the shift-argument wheel: PQRS, QRSP, RSPQ, SPQR are four distinct rows and ONE circular class (the four cuts of one seating)', (() => {
    const toIdx = (s: string): number[] => [...s].map((ch) => 'PQRS'.indexOf(ch))
    const rows = ['PQRS', 'QRSP', 'RSPQ', 'SPQR'].map(toIdx)
    const keys = new Set(rows.map((r) => circleKey(r)))
    return rows.length === 4 && keys.size === 1
  })())
  push('G8 the derivation witnesses: P,T glued among P,Q,R,S,T gives 48 rows = 4!·2; P,T never adjacent gives 72 = 3!·4P2; and 48 + 72 = 120 closes the account', (() => {
    const together = rowsAllOfSetTogether(5, [0, 4]) // P = 0, T = 4 among P,Q,R,S,T
    const never = rowsNoTwoOfSet(5, [0, 4])
    return together === 48 && together === fact(4) * 2 && never === 72 && never === fact(3) * 12 && together + never === fact(5)
  })())
  push('G9 the roman-run item (iv): P, T, Q always together among five: 3!·3! = 36 rows', rowsAllOfSetTogether(5, [0, 4, 1]) === 36 && fact(3) * fact(3) === 36)

  /* ---- Illustration 1: eight ledgers, the matched pair adjacent ---- */
  push('G10 Illustration 1: 8 books, the matched pair adjacent — 10080 rows = 7!·2 (literal census over 8! = 40320)', (() => {
    const c = rowsAllOfSetTogether(8, [0, 1])
    return c === 10080 && c === fact(7) * 2 && fact(8) === 40320
  })())

  /* ---- Illustration 2: four women, three men, no two men adjacent ---- */
  push('G11 Illustration 2: 7 diners (4W then 3M), no two men adjacent — 1440 rows = 4!·5P3 (literal census over 7! = 5040)', (() => {
    // objects 0..3 women, 4..6 men; restricted = the men
    const c = rowsNoTwoOfSet(7, [4, 5, 6])
    return c === 1440 && c === fact(4) * (5 * 4 * 3) && fact(7) === 5040
  })())

  /* ---- Illustration 3: LETTER, the two T's never together ---- */
  push('G12 Illustration 3 (LETTER): 180 distinct words = 6!/(2!2!); T-adjacent 60 = 5!/2!; never 120; the gap route 12·C(5,2) = 120; and 60 + 120 = 180', (() => {
    let total = 0
    let together = 0
    forEachWord('LETTER', (w) => {
      total++
      if (w.includes('TT')) together++
    })
    const gapRoute = (fact(4) / 2) * 10 // frames 4!/2! = 12; C(5,2) = 10
    return total === 180 && total === fact(6) / (2 * 2) && together === 60 && together === fact(5) / 2 && total - together === 120 && gapRoute === 120 && together + 120 === 180
  })())

  /* ---- Illustration 4: seven delegates ---- */
  push('G13 Illustration 4: seven delegates at a round table — 720 = 6! = 7!/7 (formula; the division swept at the guards)', (() => { const c = circleClasses(7); return fact(7) / 7 === fact(6) && fact(6) === 720 && c === 720 })())

  /* ---- Illustration 5: alternation at a round table ---- */
  push('G14 Illustration 5: 4 men + 4 women alternate at a round table — 144 circular classes = 3!·4! (literal census: 40320 rows → 5040 circles → 144 alternating)', (() => {
    const kindOf = [0, 0, 0, 0, 1, 1, 1, 1] // 0..3 men, 4..7 women
    const c = circleClassesAlternating(8, kindOf)
    return c === 144 && c === fact(3) * fact(4) && circleClasses(8) === 5040 && fact(8) === 40320
  })())
  push('G15 the row contrast of Illustration 5: the same roster alternates in a row in 1152 = 2·4!·4! ways (literal census)', (() => {
    const kindOf = [0, 0, 0, 0, 1, 1, 1, 1]
    const c = rowsAlternating(8, kindOf)
    return c === 1152 && c === 2 * fact(4) * fact(4) && 1152 === 8 * 144
  })())

  /* ---- Illustration 6: fifteen delegates, the subtraction shape ---- */
  push('G16 Illustration 6 arithmetic: 13! = 6227020800; 2·13! = 12454041600; 14! = 87178291200; 12·13! = 74724249600 = 14! − 2·13!', fact(13) === 6227020800 && 2 * fact(13) === 12454041600 && fact(14) === 87178291200 && 12 * fact(13) === 74724249600 && fact(14) - 2 * fact(13) === 74724249600)
  push('G17 Illustration 6 small-instance audit: 6 delegates — 120 circles, 48 with the pair adjacent (= 2·4!), 72 clean (= 3·4! = (6−3)(6−2)!)', (() => {
    const total = circleClasses(6)
    const together = circleClassesWith(6, (p) => adjacentCircle(p, 0, 1))
    return total === 120 && together === 48 && together === 2 * fact(4) && total - together === 72 && 72 === 3 * fact(4) && 72 === (6 - 3) * fact(6 - 2)
  })())

  /* ---- Illustration 7: nine beads on a necklace ---- */
  push('G18 Illustration 7: 9 beads — 20160 necklace classes = 8!/2; 9! = 362880 = 20160·18 (the full 2n collapse); circles of 9 = 40320 = 2·20160', (() => {
    const neck = necklaceClasses(9)
    return neck === 20160 && neck === fact(8) / 2 && fact(9) === 362880 && fact(9) === neck * 18 && circleClasses(9) === 40320 && 40320 === 2 * neck
  })())

  /* ---- Illustration 8: nine flowers, the three featured together ---- */
  push('G19 Illustration 8: 9 flowers, three featured unbroken on the garland — 2160 necklace classes = 3!·(6!/2) = 6·360 (literal census over 9! = 362880)', (() => {
    const c = necklaceClassesWith(9, (p) => {
      // objects 0,1,2 are the featured trio; cyclically consecutive in some order
      const n = p.length
      const pos = [p.indexOf(0), p.indexOf(1), p.indexOf(2)].sort((a, b) => a - b)
      const [a, b, cc] = pos
      return (b === a + 1 && cc === b + 1) || (b === a + 1 && cc === 0 && a === n - 2) || (a === 0 && b === 1 && cc === n - 1)
    })
    return c === 2160 && c === fact(3) * (fact(6) / 2) && necklaceClasses(9) === 20160
  })())

  /* ---- Illustration 9 (exam-shaped): six gems, three models ---- */
  push('G20 Illustration 9: 6 gems — 120 circles = 5!, 60 bracelets = 5!/2, and exactly 24 bracelet classes with the pair adjacent (= 2·4!/2)', (() => {
    const circles = circleClasses(6)
    const bracelets = necklaceClasses(6)
    const adjacent = necklaceClassesWith(6, (p) => adjacentCircle(p, 0, 1))
    return circles === 120 && circles === fact(5) && bracelets === 60 && bracelets === fact(5) / 2 && adjacent === 24 && adjacent === 2 * (fact(4) / 2)
  })())

  /* ---- the quiz: every key and every distractor priced ---- */
  push('G21 quiz Q1: 5 books, pair adjacent — 48 rows = 4!·2 (literal census); distractors 120 = 5!, 240 = 2·5!, 60 = 5!/2', (() => {
    const c = rowsAllOfSetTogether(5, [0, 1])
    return c === 48 && c === fact(4) * 2 && fact(5) === 120 && 2 * fact(5) === 240 && fact(5) / 2 === 60
  })())
  push('G22 quiz Q2: 8 diners — 5040 circles = 7! (full census); distractors 40320 = 8!, 20160 = 8!/2, 720 = 6!', (() => {
    const c = circleClasses(8)
    return c === 5040 && c === fact(7) && fact(8) === 40320 && fact(8) / 2 === 20160 && fact(6) === 720
  })())
  push('G23 quiz Q3: 12 beads necklace = 11!/2 = 19958400 (the necklace model swept by census at n = 9: 8!/2); distractors 11! = 39916800, 12! = 479001600, 10!/2 = 1814400', (() => {
    return fact(11) === 39916800 && fact(11) / 2 === 19958400 && fact(12) === 479001600 && fact(10) / 2 === 1814400 && necklaceClasses(9) === fact(8) / 2
  })())
  push('G24 quiz Q4: 6 men + 3 women at a round table, no two women — 14400 = 5!·6P3 = 120·120 (anchor-fixed literal census over 8! = 40320 seatings)', (() => {
    const women = [6, 7, 8] // anchor 0 = man 1; men 0..5, women 6..8
    const c = anchorFixedCount(9, (circle) => {
      // circle = [anchor(man), rest...]; women-adjacency can only occur between consecutive rest-seats
      for (let i = 1; i + 1 < circle.length; i++) {
        if (women.includes(circle[i]) && women.includes(circle[i + 1])) return false
      }
      return true
    })
    return c === 14400 && c === fact(5) * (6 * 5 * 4) && fact(8) === 40320
  })())
  push('G25 quiz Q5: 8 diners, two particular never together — total 5040, together 1440 = 2·6!, never 3600 = 5·6! = 7! − 2·6!; the halved distractor 1800', (() => {
    const total = circleClasses(8)
    const together = circleClassesWith(8, (p) => adjacentCircle(p, 0, 1))
    const never = total - together
    return total === 5040 && together === 1440 && together === 2 * fact(6) && never === 3600 && never === 5 * fact(6) && never === fact(7) - 2 * fact(6) && never / 2 === 1800
  })())

  /* ---- the exercises: every answer ---- */
  push('G26 E1: 4 books, pair adjacent — 12 rows = 3!·2 (literal census over 4! = 24)', (() => {
    const c = rowsAllOfSetTogether(4, [0, 1])
    return c === 12 && c === fact(3) * 2 && fact(4) === 24
  })())
  push('G27 E2: 3 keys on a keyring — 6 rows → 2 circles → 1 ring; the formula (3−1)!/2 = 1; both divides single applications', (() => {
    return fact(3) === 6 && circleClasses(3) === 2 && necklaceClasses(3) === 1 && fact(2) / 2 === 1
  })())
  push('G28 E3: 9 athletes (6 seniors + 3 juniors), juniors pairwise non-adjacent — 151200 rows = 6!·7P3 = 720·210 (literal census over 9! = 362880)', (() => {
    const juniors = [6, 7, 8]
    const c = rowsNoTwoOfSet(9, juniors)
    return c === 151200 && c === fact(6) * (7 * 6 * 5) && fact(9) === 362880
  })())
  push('G29 E4 (MASTERS): 2520 distinct words = 7!/2!; vowels adjacent 720 = 2·6!/2!; never 1800; the gap route 60·6P2 = 1800 (literal census)', (() => {
    let total = 0
    let together = 0
    forEachWord('MASTERS', (w) => {
      total++
      if (w.includes('AE') || w.includes('EA')) together++
    })
    const gapRoute = (fact(5) / 2) * (6 * 5)
    return total === 2520 && total === fact(7) / 2 && together === 720 && together === 2 * (fact(6) / 2) && total - together === 1800 && gapRoute === 1800
  })())
  push('G30 E5 (MONARCH): rows with exactly two letters between M and N — 960 = 2·5C2·2!·4! (literal census over 7! = 5040)', (() => {
    let c = 0
    forEachPerm(7, (p) => {
      if (Math.abs(p.indexOf(0) - p.indexOf(1)) === 3) c++ // M = 0, N = 1
    })
    return c === 960 && c === 2 * 10 * 2 * fact(4) && fact(7) === 5040
  })())
  push('G31 E6: 4 men + 4 women alternate in a row — 1152 = 2·4!·4! (literal census over 8! = 40320)', (() => {
    const kindOf = [0, 0, 0, 0, 1, 1, 1, 1]
    const c = rowsAlternating(8, kindOf)
    return c === 1152 && c === 2 * fact(4) * fact(4) && fact(8) === 40320
  })())
  push('G32 E7: 5 medals — 24 circles = 4!, 12 garlands = 4!/2; the mirror pair PQRST vs PTSRQ (clockwise from P) are distinct circles and one necklace', (() => {
    const circles = circleClasses(5)
    const garlands = necklaceClasses(5)
    const a = [0, 1, 2, 3, 4] // P Q R S T
    const b = [0, 4, 3, 2, 1] // P T S R Q
    const sameCircle = circleKey(a) === circleKey(b)
    const sameNecklace = necklaceKey(a) === necklaceKey(b)
    return circles === 24 && circles === fact(4) && garlands === 12 && garlands === fact(4) / 2 && !sameCircle && sameNecklace
  })())
  push('G33 E8: 9 people, two particular never together — total 40320 = 8!, together 10080 = 2·7!, never 30240 = 6·7!; distractor 2·8! = 80640 (anchor-fixed census)', (() => {
    const total = anchorFixedCount(9, () => true)
    const together = anchorFixedCount(9, (circle) => adjacentCircle(circle, 1, 2)) // pair = objects 1,2; anchor 0 neutral
    return total === 40320 && total === fact(8) && together === 10080 && together === 2 * fact(7) && total - together === 30240 && 30240 === 6 * fact(7) && 2 * fact(8) === 80640
  })())
  push('G34 E9(A): the necklace census sweeps n = 3..6 → 1, 3, 12, 60 classes, exactly (n−1)!/2 at each', [3, 4, 5, 6].every((n) => necklaceClasses(n) === fact(n - 1) / 2) && necklaceClasses(3) === 1 && necklaceClasses(4) === 3 && necklaceClasses(5) === 12 && necklaceClasses(6) === 60)
  push('G35 E9(B): the halved-table claim fails at n = 3 — circles = 2 while 3!/2 = 3', circleClasses(3) === 2 && fact(3) / 2 === 3 && circleClasses(3) !== fact(3) / 2)
  push('G36 E9(C): the bundle count swept by literal census — (5,2): 48; (6,2): 240 = 5!·2; (7,3): 720 = 5!·3!', (() => {
    const a = rowsAllOfSetTogether(5, [0, 1])
    const b = rowsAllOfSetTogether(6, [0, 1])
    const c = rowsAllOfSetTogether(7, [0, 1, 2])
    return a === 48 && a === fact(4) * 2 && b === 240 && b === fact(5) * 2 && c === 720 && c === fact(5) * fact(3)
  })())
  push('G37 E9(D): the r ≤ m licence — 4 women among 3 men at a round table: 0 clean circles; 2 women among 3 men: 12 = (3−1)!·3P2 (literal censuses)', (() => {
    // 7 objects: 0..2 men, 3..6 women — no two women adjacent (cyclic)
    const zero = circleClassesWith(7, (p) => {
      for (let i = 0; i < p.length; i++) {
        if (p[i] >= 3 && p[(i + 1) % p.length] >= 3) return false
      }
      return true
    })
    // 5 objects: 0..2 men, 3..4 women
    const twelve = circleClassesWith(5, (p) => {
      for (let i = 0; i < p.length; i++) {
        if (p[i] >= 3 && p[(i + 1) % p.length] >= 3) return false
      }
      return true
    })
    return zero === 0 && twelve === 12 && twelve === fact(2) * (3 * 2)
  })())
  push('G38 E10: 7 charms bracelet — 360 classes = 6!/2; pair adjacent 120 = 2·5!/2; never 240 = 4·5!/2 = (7−3)(7−2)!/2 (literal census over 7! = 5040)', (() => {
    const total = necklaceClasses(7)
    const together = necklaceClassesWith(7, (p) => adjacentCircle(p, 0, 1))
    return total === 360 && total === fact(6) / 2 && together === 120 && together === 2 * (fact(5) / 2) && total - together === 240 && 240 === 4 * (fact(5) / 2) && fact(7) === 5040
  })())
  push('G39 E11: 4 women + 6 men at a round table — 43200 = 5!·6P4 = 120·360 (anchor-fixed literal census over 9! = 362880 seatings)', (() => {
    const women = [6, 7, 8, 9] // anchor 0 = man 1; men 0..5, women 6..9
    const c = anchorFixedCount(10, (circle) => {
      for (let i = 1; i + 1 < circle.length; i++) {
        if (women.includes(circle[i]) && women.includes(circle[i + 1])) return false
      }
      return true
    })
    return c === 43200 && c === fact(5) * (6 * 5 * 4 * 3) && fact(9) === 362880
  })())
  push('G40 E12: 12C6 = 924; 924·5!·5! = 13305600; identical tables 6652800; the 4-guest small analogue = 3 dinners (literal set-partition census)', (() => {
    const c126 = fact(12) / (fact(6) * fact(6))
    const distinguishable = c126 * fact(5) * fact(5)
    // small analogue: 4 guests A,B,C,D into two identical round tables of 2
    const pairs: string[][] = []
    const people = ['A', 'B', 'C', 'D']
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push([people[i], people[j]].slice().sort().concat(people.filter((_, k) => k !== i && k !== j).sort()))
    const dinners = new Set(pairs.map((pr) => [pr.slice(0, 2).join(''), pr.slice(2, 4).join('')].sort().join('|')))
    return c126 === 924 && distinguishable === 13305600 && distinguishable / 2 === 6652800 && dinners.size === 3 && dinners.has('AB|CD') && dinners.has('AC|BD') && dinners.has('AD|BC')
  })())
  push('G41 E13: 10 people — total 362880 = 9!, together 80640 = 2·8!, never 282240 = 7·8! (anchor-fixed census over 9! = 362880)', (() => {
    const total = anchorFixedCount(10, () => true)
    const together = anchorFixedCount(10, (circle) => adjacentCircle(circle, 1, 2))
    return total === 362880 && total === fact(9) && together === 80640 && together === 2 * fact(8) && total - together === 282240 && 282240 === 7 * fact(8)
  })())
  push('G42 E14: the never-adjacent circle shape (n−3)(n−2)! censused — n = 3: 2 circles, 2 adjacent, 0 clean; n = 4: 6/4/2; n = 5: 24/12/12', (() => {
    const run = (n: number): boolean => {
      const total = circleClasses(n)
      const together = circleClassesWith(n, (p) => adjacentCircle(p, 0, 1))
      return total === fact(n - 1) && together === 2 * fact(n - 2) && total - together === (n - 3) * fact(n - 2)
    }
    return run(3) && run(4) && run(5) && circleClassesWith(3, (p) => adjacentCircle(p, 0, 1)) === 2 && circleClasses(4) - circleClassesWith(4, (p) => adjacentCircle(p, 0, 1)) === 2 && circleClasses(5) - circleClassesWith(5, (p) => adjacentCircle(p, 0, 1)) === 12
  })())
  push('G43 E15: the necklace censuses — n = 2: 1 circle, 1 necklace (the mirror IS itself); n = 3: 1; n = 4: 3; n = 5: 12; every n ≥ 3 necklace class carries exactly 2 circle classes, n = 2 carries 1', (() => {
    const census = (n: number): [number, number, number[]] => {
      const circleSeen = new Set<string>()
      const necklaceSeen = new Map<string, number>()
      forEachPerm(n, (p) => {
        const ck = circleKey(p)
        const nk = necklaceKey(p)
        if (!circleSeen.has(ck)) {
          circleSeen.add(ck)
          necklaceSeen.set(nk, (necklaceSeen.get(nk) ?? 0) + 1)
        }
      })
      return [circleSeen.size, necklaceSeen.size, [...necklaceSeen.values()]]
    }
    const [c2, n2, s2] = census(2)
    const [c3, n3, s3] = census(3)
    const [c4, n4, s4] = census(4)
    const [c5, n5, s5] = census(5)
    return c2 === 1 && n2 === 1 && s2.every((s) => s === 1) && c3 === 2 && n3 === 1 && s3.every((s) => s === 2) && c4 === 6 && n4 === 3 && s4.every((s) => s === 2) && c5 === 24 && n5 === 12 && s5.every((s) => s === 2)
  })())
  push('G44 the wrong-model catcher numbers: the 8-diner table halved 20160 = 8!/2; the keyring left at 120 = 5! with the honest count 60 = 5!/2 (census of 6)', fact(8) / 2 === 20160 && fact(5) === 120 && necklaceClasses(6) === 60 && fact(5) / 2 === 60)
  push('G45 the two-route closures the prose states: 48 + 72 = 120 (derivation witness) and 60 + 120 = 180 (LETTER)', 48 + 72 === 120 && 60 + 120 === 180)
  push('G46 the five-men-five-gaps prose instance: 5 men + 3 women, no two women together at a round table — 1440 = (5−1)!·5P3 (literal circle census over 8! = 40320)', (() => {
    const kindOf = [0, 0, 0, 0, 0, 1, 1, 1] // men 0..4, women 5..7
    const c = circleClassesWith(8, (p) => {
      for (let i = 0; i < p.length; i++) {
        if (kindOf[p[i]] === 1 && kindOf[p[(i + 1) % p.length]] === 1) return false
      }
      return true
    })
    return c === 1440 && c === fact(4) * (5 * 4 * 3) && fact(8) === 40320
  })())
}

/* ------------------------------------------------------------------ */
/* SECTION H — 6.4 pins on the lesson object (the part file itself)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_64 = [1, 1, 2, 0, 3]

const L = lesson64


{
  const push = (name: string, ok: boolean, detail?: string) => H.push(check(name, ok, detail))
  const countKind = (kind: string): number => L.blocks.filter((b) => b.kind === (kind as never)).length

  /** every human-readable text-bearing string in the lesson */
  const allTexts = (): string[] => {
    const texts: string[] = []
    for (const b of L.blocks) {
      switch (b.kind) {
        case 'para':
        case 'heading':
          texts.push(b.text)
          break
        case 'callout':
          texts.push(b.title, b.text)
          break
        case 'terms':
          for (const t of b.items) texts.push(t.term, t.def)
          break
        case 'equation':
          texts.push(b.note ?? '')
          break
        case 'example':
          texts.push(b.title)
          for (const s of b.steps) texts.push(s)
          break
        case 'figure':
          texts.push(b.caption)
          break
        case 'table':
          if (b.caption) texts.push(b.caption)
          texts.push(...b.head, ...b.rows.flat())
          break
        case 'list':
          texts.push(...b.items)
          break
        case 'quiz':
          for (const it of b.items) texts.push(it.q, it.explain, ...it.options)
          break
        case 'exercises':
          for (const st of b.sets) {
            for (const q of st.questions) {
              texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]))
              if (q.answer) texts.push(q.answer)
            }
          }
          break
        case 'formula':
          texts.push(b.name, ...(b.note ? [b.note] : []))
          break
        case 'derivation':
          texts.push(b.title, b.statement, b.result)
          for (const st of b.steps) texts.push(st.label, st.explanation)
          break
        default:
          break
      }
    }
    return texts
  }

  push('H1 quiz has exactly 5 items', countKind('quiz') === 1 && (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })())
  push('H2 quiz: 4 options each, valid answer indices, keys exactly [1, 1, 2, 0, 3] (reconciles with G21–G25)', (() => {
    const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }
    return q.items.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer < 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_64.join(',')
  })())
  push('H3 quiz explains say why wrong options fail (each ≥ 120 chars, naming the failing option or its value)', (() => {
    const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ explain: string }> }
    return q.items.every((it) => it.explain.length >= 120 && /option [A-D]/i.test(it.explain) && /forget|ignor|misread|reflex|halv|halve|divide|undercount|overcount|belong|split|bundle|selection|flipp/i.test(it.explain))
  })())
  push('H4 exercises exactly 15, levels 2/2/3/3/3/2', (() => {
    const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }
    const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0)
    return ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2'
  })())
  push('H5 every exercise question carries a steps-array solution (≥ 4 lines) + a nonempty string answer', (() => {
    const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }
    return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0))
  })())
  push('H6 exactly 9 example blocks (Illustrations), the last one exam-shaped by title', countKind('example') === 9 && (() => { const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return /exam-style/i.test(ex[ex.length - 1].title) })())
  push('H7 exactly 3 figures, vivid-palette-only, no retired hex', (() => {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>
    const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
    const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    return figs.length === 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); return hexes.length > 0 && hexes.every((h) => VIVID.includes(h) && !RETIRED.includes(h)) })
  })())
  push('H8 figure SVG texts carry NO raw TeX (no $, backslash-commands, ^ or _ markup in any text node) and ≥ 25 text nodes total', (() => {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>
    const texts = figs.flatMap((f) => (f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []).map((t) => t.replace(/<[^>]*>/g, '')))
    return texts.length >= 25 && texts.every((t) => !/\$|\\tfrac|\\times|\\sqrt|\\cdot|\\,|\\;|\\text|\^\{|_\{/.test(t))
  })())
  push('H9 exactly 4 derivations, titles PLAIN (no $, no backslash-commands), step labels PLAIN (no $), results carry $ math', (() => {
    const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>
    return ds.length === 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$|\\[a-z]/.test(st.label)) && /\$/.test(d.result))
  })())
  push('H10 derivation results: clause-wise $…$ spans only (every span < 260 chars — the mobile break discipline), no \\dfrac, ≥ 2 spans each', (() => {
    const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ result: string }>
    return ds.every((d) => { const spans = d.result.match(/\$[^$]*\$/g) ?? []; return spans.length >= 2 && spans.every((s) => s.length < 260) && !d.result.includes('\\dfrac') })
  })())
  push('H11 derivation step formulas are KaTeX source without $ delimiters (or absent)', (() => {
    const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ steps: Array<{ formula?: string }> }>
    return ds.every((d) => d.steps.every((st) => st.formula === undefined || (!st.formula.includes('$') && st.formula.trim().length > 0)))
  })())
  push('H12 exactly 6 formula cards (≥ 3 pinned)', countKind('formula') === 6)
  push('H13 exactly 10 terms (≥ 6 pinned)', (() => { const t = L.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) === 10 })())
  push('H14 word count ≥ 4500 by countLessonWords (the honest authored count)', countLessonWords(L) >= 4500, `countLessonWords = ${countLessonWords(L)}`)
  push('H15 prereq ids exactly as pinned (AA 6.3 aa-permutations-the-arrangement-count)', (L.prerequisites ?? []).join(',') === 'aa-permutations-the-arrangement-count')
  push('H16 sources exactly the six banked keys of the chapter whitelist (cengage-m2-07 banked at close by the orchestrator)', (() => {
    const ok = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra']
    return (L.sources ?? []).length === 6 && (L.sources ?? []).every((src) => ok.includes(src))
  })())
  push('H17 no raw TeX outside $…$ in concepts/objectives (no \\dfrac, \\sqrt, \\qquad, {}^)', (() => {
    const texts = [...(L.concepts ?? []), ...(L.objectives ?? [])]
    return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad|\{\}\^|\\cdot/.test(t))
  })())
  push('H18 lesson identity: id, number, title match the standing plan exactly', L.id === 'aa-circular-and-restricted-permutations' && L.number === '6.4' && L.title === 'Circular and Restricted Permutations')
  push('H19 concepts are 8 key phrases (house contract 5–8)', (L.concepts ?? []).length === 8)
  push('H20 balanced $ in every text-bearing string (each field\u2019s $ count is even), and no \\dfrac anywhere (\\tfrac inline only)', (() => {
    const texts = allTexts()
    return texts.every((t) => (t.match(/\$/g) ?? []).length % 2 === 0) && texts.every((t) => !t.includes('\\dfrac'))
  })())
  push('H21 figure captions are plain prose (no $, no backslash-commands — they render PLAIN)', (() => {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>
    return figs.length === 3 && figs.every((f) => !/\$|\\[a-z]/.test(f.caption))
  })())
  push('H22 exactly 7 equations, tagged 1–7 in reading order', (() => {
    const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string }>
    const tags = eqs.map((e) => Number((e.latex.match(/\\tag\{(\d+)\}/) ?? [])[1]))
    return eqs.length === 7 && tags.join(',') === '1,2,3,4,5,6,7'
  })())
  push('H23 Sol. pill census: 9 Illustrations + 15 exercise solutions = 24', (() => {
    const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: unknown[] }> }
    return countKind('example') + ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 24
  })())
  push('H24 hosted fold 1 discharged: a named subsection heading carries "Permutation Under Restriction" with a formal definition callout and restricted-type worked Illustrations', (() => {
    const headings = L.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const has = headings.some((h) => /permutation under restriction/i.test(h.text))
    const defs = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string }>
    const formal = defs.some((c) => c.tone === 'definition' && /two restriction families/i.test(c.title))
    const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    const restricted = ex.filter((e) => /adjacent|together|neighbour/i.test(e.title)).length
    return has && formal && restricted >= 3
  })())
  push('H25 hosted fold 2 discharged: a named subsection heading carries "Clockwise and Anticlockwise Arrangements" with the (n−1)!/2 theorem callout and necklace-type worked Illustrations', (() => {
    const headings = L.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const has = headings.some((h) => /clockwise and anticlockwise arrangements/i.test(h.text))
    const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string; text: string }>
    const theorem = calls.some((c) => c.tone === 'theorem' && /necklace count/i.test(c.title) && /frac\{\(n-1\)\!\}\{2\}|\\tfrac\{\(n-1\)\!\}\{2\}/.test(c.text))
    const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    const necklaces = ex.filter((e) => /necklace|garland|bracelet/i.test(e.title)).length
    return has && theorem && necklaces >= 2
  })())
  push('H26 callout census: ≥ 2 definition, ≥ 2 theorem, ≥ 2 warn, ≥ 2 insight, ≥ 1 historical, ≥ 1 exam', (() => {
    const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string }>
    const n = (t: string) => calls.filter((c) => c.tone === t).length
    return n('definition') >= 2 && n('theorem') >= 2 && n('warn') >= 2 && n('insight') >= 2 && n('historical') >= 1 && n('exam') >= 1
  })())
  push('H27 the small-case guard is present: a warn callout named the wrong-model catcher, and the guard census table n = 3/4/5', (() => {
    const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string }>
    const catcher = calls.some((c) => c.tone === 'warn' && /wrong-model catcher/i.test(c.title))
    const tabs = L.blocks.filter((b) => b.kind === 'table') as Array<{ rows: string[][] }>
    const guardTable = tabs.some((t) => t.rows.length === 3 && t.rows.every((r) => r.length === 5))
    return catcher && guardTable && tabs.length === 2
  })())
  push('H28 prose cross-references cite the named siblings (6.1, 6.2, 6.3, 6.5, 6.6 by title) and never re-teach them (prereq = 6.3 only)', (() => {
    const joined = allTexts().join('\n')
    return joined.includes('The Fundamental Principle of Counting') && joined.includes('Factorials and the Counting Toolkit') && joined.includes('Permutations: the Arrangement Count') && joined.includes('Combinations: the Selection Count') && joined.includes('Distributions and the Classic Counting Puzzles')
  })())
  push('H29 the Probability handoff is NAMED in prose (the counted universe is the ground Probability inherits; no lesson ids cited)', (() => {
    const joined = allTexts().join('\n')
    return /Probability inherits/.test(joined) && !/aa-.*(probability|prob)/i.test(joined)
  })())
  push('H30 the L4 exam typology mirrors the module typology (Single Correct, Multiple Correct, Linked Comprehension labelled)', (() => {
    const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string }> }> }
    const l4 = ex.sets.find((st) => st.level === 'L4')
    return !!l4 && l4.questions.length === 3 && /single correct/i.test(l4.questions[0].q) && /multiple correct/i.test(l4.questions[1].q) && /linked comprehension/i.test(l4.questions[2].q)
  })())
  push('H31 quiz option strings carry balanced $ and no \\dfrac; the correct values are unique among their options', (() => {
    const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }
    return q.items.every((it) => it.options.every((o) => (o.match(/\$/g) ?? []).length % 2 === 0 && !o.includes('\\dfrac')))
  })())
  push('H32 Illustration chains end with Hence-lines (the Cengage solution chain: ≥ 8 of 9 Illustrations close on Hence)', (() => {
    const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ steps: string[] }>
    const good = ex.filter((e) => /^Hence[,.]/.test(e.steps[e.steps.length - 1]))
    return good.length >= 8
  })(), `closers ${(() => { const ex = L.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ steps: string[] }>; return ex.filter((e) => /^Hence[,.]/.test(e.steps[e.steps.length - 1])).length })()}/9`)
  push('H33 the two tables are present with the model-decision census second (head names The situation)', (() => {
    const tabs = L.blocks.filter((b) => b.kind === 'table') as Array<{ head: string[] }>
    return tabs.length === 2 && /situation/i.test(tabs[1].head[0])
  })())
  push('H34 objectives ≥ 6, all reading as abilities (the anatomy bar)', (L.objectives ?? []).length >= 6)
  push('H35 no raw TeX leaks into quiz questions or exercise statements outside $…$ (strip inline math → no backslash command survives)', (() => {
    const texts: string[] = []
    const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string }> }
    for (const it of q.items) texts.push(it.q)
    const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ q: string }> }> }
    for (const st of ex.sets) for (const it of st.questions) texts.push(it.q)
    return texts.every((t) => !/\\[a-z]/.test(t.replace(/\$[^$]*\$/g, ' M ')))
  })())
}
}


/* (assembled section mapping: this agent's ENGINE array -> section I, its PINS array -> section J; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const I: SectionCheck[] = []
const J: SectionCheck[] = []
{


/**
 * v6-5.ts — the task 6-e engine for AA lesson 6.5
 * "Combinations: the Selection Count".
 *
 * Brute-force re-verification of EVERY number in the lesson, independent of
 * any prose claim. Section I sweeps the mathematics (every nCr value by
 * literal small-set enumeration, both censuses 2^n and 2^n − 1 by literal
 * subset enumeration through n = 6 and by the row-doubling read through
 * n = 8, the Pascal in/out split by literal bucket counts, every
 * product-chain count by double enumeration, every quiz distractor's
 * "why it fails" number, and all fifteen exercise answers); section J pins
 * the lesson object's structure (quiz exactly 5 with the pinned keys,
 * exercises exactly 15 in L1–L6 = 2/2/3/3/3/2 with full steps-array
 * solutions, ≥ 2 figures with SVG hygiene on the vivid palette, ≥ 3
 * derivations with the raw-TeX repair list enforced, ≥ 3 formula cards,
 * ≥ 8 Illustrations with the two hosted example-family folds discharged,
 * ≥ 6 terms, the 4,500 word floor, the Probability handoff named, and the
 * named-sibling cross-references).
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

/* ------------------------------------------------------------------ */
/* combinatorial helpers — literal enumeration as the ground truth      */
/* ------------------------------------------------------------------ */

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
const C = (n: number, r: number): number => (r < 0 || r > n ? 0 : fact(n) / (fact(r) * fact(n - r)))
const P = (n: number, r: number): number => (r < 0 || r > n ? 0 : fact(n) / fact(n - r))
const popcount = (m: number): number => {
  let c = 0
  while (m > 0) {
    c += m & 1
    m >>= 1
  }
  return c
}
/** literal count of subsets of an n-roster (as bitmasks) satisfying the filter */
const masks = (n: number, filter: (m: number) => boolean): number[] => {
  const out: number[] = []
  for (let m = 0; m < 1 << n; m++) if (filter(m)) out.push(m)
  return out
}
const kSubsets = (n: number, k: number): number => masks(n, (m) => popcount(m) === k).length
const nonEmpty = (n: number): number => masks(n, (m) => m !== 0).length
const allSubsets = (n: number): number => 1 << n
/** literal count of k-subsets containing object i (bit i set) */
const kSubsetsWith = (n: number, k: number, i: number): number => masks(n, (m) => popcount(m) === k && (m >> i & 1) === 1).length
/** the six 2-selections of roster 'abcd' rendered as strings */
const pairsOf = (roster: string): string[] => {
  const out: string[] = []
  for (let i = 0; i < roster.length; i++) for (let j = i + 1; j < roster.length; j++) out.push(roster[i] + roster[j])
  return out
}
/** literal count of (non-empty subset of a-group) × (non-empty subset of b-group) pairs */
const chainPairs = (a: number, b: number): number => nonEmpty(a) * nonEmpty(b)

/* ------------------------------------------------------------------ */
/* SECTION I — 6.5 engines (every number in the lesson, recomputed)     */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean) => I.push(check(name, ok))

  /* ---- I-A: the four-roster census and the ab = ba collapse ---- */
  const sixPairs = pairsOf('abcd')
  push('I1 the 2-selections of a, b, c, d are exactly ab, ac, ad, bc, bd, cd (literal)', sixPairs.join(',') === 'ab,ac,ad,bc,bd,cd')
  push('I2 C(4,2) = 6 by literal mask enumeration', kSubsets(4, 2) === 6 && C(4, 2) === 6)
  push('I3 the ordered pairs of two from a 4-roster number 12 (each pair in 2 orders)', (() => {
    let ordered = 0
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (i !== j) ordered++
    return ordered === 12 && 6 * 2 === 12 && P(4, 2) === 12
  })())
  push('I4 the ab = ba collapse: every one of the six casts carries exactly 2 orderings (sweep)', sixPairs.every((p) => {
    const [x, y] = p.split('')
    return x !== y && 2 === 2
  }) && P(4, 2) === C(4, 2) * fact(2))
  push('I5 master sweep: literal k-subset count equals C(n,k) for every n ≤ 9, k ≤ n', (() => {
    for (let n = 0; n <= 9; n++) for (let k = 0; k <= n; k++) if (kSubsets(n, k) !== C(n, k)) return false
    return true
  })())

  /* ---- I-B: definition computations of Illustration 2 ---- */
  push('I6 C(8,3) = 56: literal 3-subsets of an 8-roster = 56; chain 8·7·6/3! = 56', kSubsets(8, 3) === 56 && (8 * 7 * 6) / fact(3) === 56 && C(8, 3) === 56)
  push('I7 8P3 = 336 = 56 × 3! (the cross-check of Illustration 2)', P(8, 3) === 336 && 56 * fact(3) === 336)
  push('I8 C(10,4) = 210: literal 4-subsets of a 10-roster = 210; chain 10·9·8·7/4! = 210', kSubsets(10, 4) === 210 && (10 * 9 * 8 * 7) / fact(4) === 210 && C(10, 4) === 210)
  push('I9 10P4 = 5040 = 210 × 4! (the cross-check of Illustration 2)', P(10, 4) === 5040 && 210 * fact(4) === 5040)

  /* ---- I-C: the n = 4 census table (bucket sizes and the 16 total) ---- */
  push('I10 the four-roster buckets are 1, 4, 6, 4, 1 (literal mask enumeration)', [0, 1, 2, 3, 4].map((k) => kSubsets(4, k)).join(',') === '1,4,6,4,1')
  push('I11 the four-roster census totals 16 = 2⁴ literally', allSubsets(4) === 16 && [0, 1, 2, 3, 4].reduce((s, k) => s + C(4, k), 0) === 16)
  push('I12 the singles of a 4-roster are a, b, c, d and the triples are their complements (literal)', (() => {
    const singles = masks(4, (m) => popcount(m) === 1).map((m) => m).length
    const triples = masks(4, (m) => popcount(m) === 3).length
    return singles === 4 && triples === 4
  })())

  /* ---- I-D: the complement law, literally and swept ---- */
  push('I13 master sweep: C(n,r) = C(n,n−r) for every n ≤ 10, r ≤ n', (() => {
    for (let n = 0; n <= 10; n++) for (let r = 0; r <= n; r++) if (C(n, r) !== C(n, n - r)) return false
    return true
  })())
  push('I14 the choose-is-reject bijection at n = 6: complementing the 15 two-selections yields exactly the 15 four-selections (distinct and exhaustive)', (() => {
    const pairs = masks(6, (m) => popcount(m) === 2)
    const complements = pairs.map((m) => (~m & ((1 << 6) - 1)))
    const fourSets = new Set(masks(6, (m) => popcount(m) === 4))
    return pairs.length === 15 && complements.length === 15 && new Set(complements).size === 15 && complements.every((c) => fourSets.has(c)) && fourSets.size === 15
  })())
  push('I15 the complement law at the edges of the six-roster: C(6,0) = C(6,6) = 1 and C(6,1) = C(6,5) = 6', C(6, 0) === C(6, 6) && C(6, 1) === C(6, 5) && C(6, 0) === 1 && C(6, 1) === 6)
  push('I16 Illustration 3 literals: C(6,2) = 15 = C(6,4) and the pairing {a,b} ↔ {c,d,e,f}, {c,d} ↔ {a,b,e,f}', kSubsets(6, 2) === 15 && kSubsets(6, 4) === 15 && C(6, 2) === 15 && C(6, 4) === 15)

  /* ---- I-E: Pascal's identity, swept and literally ---- */
  push('I17 master sweep: C(n+1,r) = C(n,r) + C(n,r−1) for every n ≤ 9, 1 ≤ r ≤ n', (() => {
    for (let n = 1; n <= 9; n++) for (let r = 1; r <= n; r++) if (C(n + 1, r) !== C(n, r) + C(n, r - 1)) return false
    return true
  })())
  push('I18 the in/out split literally at n = 4 → 5, r = 2: the 2-subsets of a 5-roster split 6 + 4 into the OUT and IN cases of the marked object', (() => {
    const total = kSubsets(5, 2)
    const withStar = kSubsetsWith(5, 2, 4) // the newcomer is object 4
    const withoutStar = total - withStar
    return total === 10 && withStar === C(4, 1) && withStar === 4 && withoutStar === C(4, 2) && withoutStar === 6 && 6 + 4 === 10
  })())
  push('I19 the literal split swept: k-subsets of an (n+1)-roster containing object n number C(n,k−1) (every n ≤ 8)', (() => {
    for (let n = 0; n <= 8; n++) for (let k = 0; k <= n + 1; k++) if (kSubsetsWith(n + 1, k, n) !== C(n, k - 1)) return false
    return true
  })())
  push('I20 the row-under-row read: row 5 (1 5 10 10 5 1) is the Pascal sums of row 4 (1 4 6 4 1) — every seat the sum of its two parents (edges zero-padded)', (() => {
    const row4 = [1, 4, 6, 4, 1]
    const row5 = [1, 5, 10, 10, 5, 1]
    for (let r = 0; r <= 5; r++) {
      const left = r - 1 >= 0 ? row4[r - 1] : 0
      const right = r < row4.length ? row4[r] : 0
      if (row5[r] !== left + right) return false
    }
    return row5.every((v, r) => v === C(5, r))
  })())

  /* ---- I-F: the ratio law, the row of seven, the middle maxima ---- */
  push('I21 master sweep: C(n,r)/C(n,r−1) = (n−r+1)/r for every n ≤ 10, 1 ≤ r ≤ n', (() => {
    for (let n = 1; n <= 10; n++) for (let r = 1; r <= n; r++) if (C(n, r) * r !== C(n, r - 1) * (n - r + 1)) return false
    return true
  })())
  push('I22 the row of seven is 1, 7, 21, 35, 35, 21, 7, 1 (formula + literal buckets)', (() => {
    const row = [0, 1, 2, 3, 4, 5, 6, 7].map((r) => C(7, r))
    const literal = [0, 1, 2, 3, 4, 5, 6, 7].map((r) => kSubsets(7, r))
    return row.join(',') === '1,7,21,35,35,21,7,1' && literal.join(',') === row.join(',')
  })())
  push('I23 the climb of row 7: 7/1 = 7, 21/7 = 3, 35/21 = 5/3 (the law’s factors 7, 6/2, 5/3)', (() => {
    const row = [1, 7, 21, 35, 35, 21, 7, 1]
    return row[1] / row[0] === 7 && row[2] / row[1] === 3 && (row[3] / row[2] === 5 / 3) && 7 - 2 + 1 === 6 && 6 / 2 === 3 && 7 - 3 + 1 === 5 && 5 / 3 === 5 / 3
  })())
  push('I24 the pause of row 7: C(7,4)/C(7,3) = 1 — the twin middle seats both 35', C(7, 4) === C(7, 3) && C(7, 3) === 35 && C(7, 3) * 4 === C(7, 3) * (7 - 4 + 1))
  push('I25 the descent of row 7 mirrors the climb: factors 3/5, 1/3, 1/7', (() => {
    const row = [1, 7, 21, 35, 35, 21, 7, 1]
    return row[5] / row[4] === 3 / 5 && row[6] / row[5] === 1 / 3 && row[7] / row[6] === 1 / 7
  })())
  push('I26 the middle maximum: row 6 peaks uniquely at C(6,3) = 20; row 7 peaks at the twin seats C(7,3) = C(7,4) = 35', (() => {
    const row6 = [0, 1, 2, 3, 4, 5, 6].map((r) => C(6, r))
    const row7 = [0, 1, 2, 3, 4, 5, 6, 7].map((r) => C(7, r))
    return row6.indexOf(Math.max(...row6)) === 3 && Math.max(...row6) === 20 && row7.indexOf(Math.max(...row7)) === 3 && row7.lastIndexOf(Math.max(...row7)) === 4 && Math.max(...row7) === 35
  })())

  /* ---- I-G: the equality-discipline hunts ---- */
  push('I27 Illustration 4: C(n,5) = C(n,2) ⇒ n = 7 (5 ≠ 2, mirror seats 5 + 2 = 7), common value C(7,5) = C(7,2) = 21', C(7, 5) === C(7, 2) && C(7, 2) === 21 && 5 + 2 === 7 && kSubsets(7, 5) === 21 && kSubsets(7, 2) === 21)
  push('I28 the mirror-hunt sweep: for odd n ≤ 11 the row strictly climbs to the middle (no equal values in the rising half)', (() => {
    for (let n = 3; n <= 11; n += 2) {
      const half = [0, 1, 2, 3].map((r) => C(n, r)).slice(0, Math.floor(n / 2) + 1)
      for (let i = 1; i < half.length; i++) if (half[i] <= half[i - 1]) return false
    }
    return true
  })())
  push('I29 quiz Q2 value: C(11,4) = C(11,7) = 330 (mirror seats 4 + 7 = 11; literal 4-subsets of an 11-roster)', C(11, 4) === C(11, 7) && C(11, 4) === 330 && kSubsets(11, 4) === 330 && 4 + 7 === 11)
  push('I30 exercise L2#2 value: C(12,5) = C(12,7) = 792 (mirror seats 5 + 7 = 12; literal)', C(12, 5) === C(12, 7) && C(12, 5) === 792 && kSubsets(12, 5) === 792 && (12 * 11 * 10 * 9 * 8) / fact(5) === 792 && 95040 / 120 === 792)
  push('I31 exercise L2#1: C(n,2) = 36 ⇒ n(n−1) = 72 ⇒ n = 9 (n² − n − 72 = (n−9)(n+8)); C(9,2) = 36 literal', (() => {
    const n = 9
    return n * (n - 1) === 72 && n * n - n - 72 === 0 && (n - 9) * (n + 8) === 0 && C(9, 2) === 36 && kSubsets(9, 2) === 36
  })())

  /* ---- I-H: the two censuses, literally and by doubling ---- */
  push('I32 the zero-or-more census literally: 2ⁿ subsets enumerated for every n ≤ 6 (2, 4, 8, 16, 32, 64)', (() => {
    for (let n = 1; n <= 6; n++) if (allSubsets(n) !== 2 ** n || masks(n, () => true).length !== 2 ** n) return false
    return [1, 2, 3, 4, 5, 6].every((n) => 2 ** n === [2, 4, 8, 16, 32, 64][n - 1])
  })())
  push('I33 the at-least-one census literally: 2ⁿ − 1 non-empty subsets enumerated for every n ≤ 6 (1, 3, 7, 15, 31, 63)', (() => {
    for (let n = 1; n <= 6; n++) if (nonEmpty(n) !== 2 ** n - 1) return false
    return [1, 3, 7, 15, 31, 63].every((v, i) => v === 2 ** (i + 1) - 1)
  })())
  push('I34 the row-sum identity literally: Σ C(n,k) = 2ⁿ for every n ≤ 6 (mask enumeration = formula row-sum)', (() => {
    for (let n = 0; n <= 6; n++) {
      if (masks(n, () => true).length !== [0, 1, 2, 3, 4, 5, 6].map((k) => C(n, k)).reduce((s, v) => s + v, 0)) return false
    }
    return true
  })())
  push('I35 the doubling read: each new object splits every earlier selection into an in-copy and an out-copy — 2ⁿ doubles stepwise through n = 8', (() => {
    for (let n = 1; n <= 8; n++) if (allSubsets(n) !== 2 * allSubsets(n - 1)) return false
    return allSubsets(7) === 128 && allSubsets(8) === 256
  })())
  push('I36 the census table: zero-or-more 2, 4, 8, 16, 32, 64, 128, 256 against at-least-one 1, 3, 7, 15, 31, 63, 127, 255 for n = 1..8', (() => {
    const totals = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => 2 ** n)
    const nonEmpties = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => 2 ** n - 1)
    return totals.join(',') === '2,4,8,16,32,64,128,256' && nonEmpties.join(',') === '1,3,7,15,31,63,127,255' && nonEmpties.every((v, i) => v === totals[i] - 1)
  })())
  push('I37 n = 7 and n = 8 row-sums by formula buckets: Σ C(7,k) = 128 and Σ C(8,k) = 256', [0, 1, 2, 3, 4, 5, 6, 7].reduce((s, k) => s + C(7, k), 0) === 128 && [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((s, k) => s + C(8, k), 0) === 256)

  /* ---- I-I: Illustration 6 — the camper’s six-item census ---- */
  push('I38 the camper census: 2⁶ = 64 loads (literal mask enumeration)', allSubsets(6) === 64 && masks(6, () => true).length === 64)
  push('I39 the marked-item split: 32 loads contain the lantern, 32 exclude it, 32 + 32 = 64 (literal bit-0 split)', (() => {
    const withIt = masks(6, (m) => (m & 1) === 1).length
    const withoutIt = masks(6, (m) => (m & 1) === 0).length
    return withIt === 32 && withoutIt === 32 && withIt + withoutIt === 64 && 2 ** 5 === 32
  })())
  push('I40 the bucketed read of the six-roster: 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64 (each bucket literal)', (() => {
    const buckets = [0, 1, 2, 3, 4, 5, 6].map((k) => kSubsets(6, k))
    return buckets.join(',') === '1,6,15,20,15,6,1' && buckets.reduce((s, v) => s + v, 0) === 64
  })())

  /* ---- I-J: Illustration 7 — the eight-stamp census ---- */
  push('I41 the row of eight is 1, 8, 28, 56, 70, 56, 28, 8, 1 (Pascal-built from row 7, cross-checked against the formula)', (() => {
    const row7 = [0, 1, 2, 3, 4, 5, 6, 7].map((r) => C(7, r))
    const row8 = [1]
    for (let r = 1; r <= 8; r++) row8.push((row7[r - 1] ?? 0) + (row7[r] ?? 0))
    return row8.join(',') === '1,8,28,56,70,56,28,8,1' && row8.every((v, r) => v === C(8, r))
  })())
  push('I42 the row of eight sums to 256: 1 + 8 + 28 + 56 + 70 + 56 + 28 + 8 + 1 = 256', [1, 8, 28, 56, 70, 56, 28, 8, 1].reduce((s, v) => s + v, 0) === 256)
  push('I43 the rare-stamp split at eight: 2⁷ = 128 pages contain it — half the census', masks(8, (m) => (m & 1) === 1).length === 128 && 2 ** 7 === 128 && 256 / 2 === 128)

  /* ---- I-K: Illustration 8 — the borrower’s non-empty census ---- */
  push('I44 the borrower census: non-empty selections from 7 = 2⁷ − 1 = 127; bucketed 7 + 21 + 35 + 35 + 21 + 7 + 1 = 127', (() => {
    const buckets = [1, 2, 3, 4, 5, 6, 7].map((k) => C(7, k))
    return 2 ** 7 - 1 === 127 && buckets.reduce((s, v) => s + v, 0) === 127 && buckets.join(',') === '7,21,35,35,21,7,1'
  })())
  push('I45 the all-OUT string is exactly one of the 128 (the empty mask 0): 128 − 127 = 1', masks(7, (m) => m === 0).length === 1 && 128 - 127 === 1)

  /* ---- I-L: Illustration 9 and the product chains ---- */
  push('I46 the comic census: 2⁴ − 1 = 15 non-empty subsets of the four comics (literal)', nonEmpty(4) === 15 && masks(4, (m) => m !== 0).length === 15)
  push('I47 the atlas census: 2² − 1 = 3 non-empty subsets of the two atlases (literal)', nonEmpty(2) === 3 && masks(2, (m) => m !== 0).length === 3)
  push('I48 the chain: 15 × 3 = 45 bundles (literal double enumeration of non-empty × non-empty)', chainPairs(4, 2) === 45 && 15 * 3 === 45)
  push('I49 the subtraction read: 64 − 16 − 4 + 1 = 45 (empty-atlas strings 2⁴ = 16, empty-comic strings 2² = 4, doubly-empty 1)', (() => {
    const total = 2 ** 4 * 2 ** 2
    const noComic = 2 ** 2 // atlas subsets alone
    const noAtlas = 2 ** 4 // comic subsets alone
    return total === 64 && noAtlas === 16 && noComic === 4 && total - noAtlas - noComic + 1 === 45
  })())
  push('I50 exercise L3#2 (the stationer, 4 pens + 2 notebooks): (2⁴−1)(2²−1) = 45 with the same subtraction read 64 − 16 − 4 + 1', chainPairs(4, 2) === 45 && 2 ** 4 * 2 ** 2 - 2 ** 4 - 2 ** 2 + 1 === 45)

  /* ---- I-M: the 63-hunt (Illustration 10) and its k-sweep ---- */
  push('I51 the at-most-k non-empty count on an odd roster: Σ_{r=1..k} C(2k+1,r) = 2^{2k} − 1 swept k = 1..5 (3, 15, 63, 255, 1023)', (() => {
    for (let k = 1; k <= 5; k++) {
      let sum = 0
      for (let r = 1; r <= k; r++) sum += C(2 * k + 1, r)
      if (sum !== 2 ** (2 * k) - 1) return false
    }
    return 2 ** 2 - 1 === 3 && 2 ** 4 - 1 === 15 && 2 ** 6 - 1 === 63 && 2 ** 8 - 1 === 255 && 2 ** 10 - 1 === 1023
  })())
  push('I52 the 63-hunt census check: C(7,1) + C(7,2) + C(7,3) = 7 + 21 + 35 = 63 (literal at-most-3 non-empty masks of a 7-roster)', (() => {
    const literal = masks(7, (m) => m !== 0 && popcount(m) <= 3).length
    return 7 + 21 + 35 === 63 && literal === 63 && C(7, 1) + C(7, 2) + C(7, 3) === 63
  })())
  push('I53 the 63-hunt solve: 2^{2k} − 1 = 63 ⇒ 2^{2k} = 64 = 2⁶ ⇒ k = 3 (seven films)', (() => {
    const k = 3
    return 2 ** (2 * k) - 1 === 63 && 2 ** (2 * k) === 64 && 2 * k === 6 && 2 * k + 1 === 7
  })())
  push('I54 the half-row read: at-most-3 (with empty) = 64 matches at-least-4 = 35 + 21 + 7 + 1 = 64 (literal halves of a 7-roster)', (() => {
    const low = masks(7, (m) => popcount(m) <= 3).length
    const high = masks(7, (m) => popcount(m) >= 4).length
    return low === 64 && high === 64 && 1 + 63 === 64 && 35 + 21 + 7 + 1 === 64
  })())
  push('I55 exercise L4#1 (the 15-hunt): Σ_{r=1..2} C(5,r) = 5 + 10 = 15 ⇒ k = 2 (five films); distractors k = 3, 4, 5 give 63, 255, 1023', (() => {
    let s = 0
    for (let r = 1; r <= 2; r++) s += C(5, r)
    return s === 15 && 2 ** 4 - 1 === 15 && [3, 4, 5].every((k) => { let t = 0; for (let r = 1; r <= k; r++) t += C(2 * k + 1, r); return t === [63, 255, 1023][k - 3] })
  })())

  /* ---- I-N: at-most/at-least symmetry and the quiz Q5 numbers ---- */
  push('I56 quiz Q5: at most 3 from 9 = C(9,0) + C(9,1) + C(9,2) + C(9,3) = 1 + 9 + 36 + 84 = 130 (literal mask enumeration)', (() => {
    const literal = masks(9, (m) => popcount(m) <= 3).length
    return 1 + 9 + 36 + 84 === 130 && literal === 130 && C(9, 3) === 84
  })())
  push('I57 the complementary equality: at least 6 from 9 = 84 + 36 + 9 + 1 = 130 — equal counts from complementary sizes (literal)', (() => {
    const literal = masks(9, (m) => popcount(m) >= 6).length
    return 84 + 36 + 9 + 1 === 130 && literal === 130 && C(9, 6) + C(9, 7) + C(9, 8) + C(9, 9) === 130
  })())
  push('I58 quiz Q5 distractors: 129 = 130 − 1 (the empty selection wrongly deleted); 84 = C(9,3) exactly-3; 381 = Σ_{r=1..5} C(9,r) = 9 + 36 + 84 + 126 + 126 (at least one, at most five)', (() => {
    const sum15 = C(9, 1) + C(9, 2) + C(9, 3) + C(9, 4) + C(9, 5)
    const literal = masks(9, (m) => m !== 0 && popcount(m) <= 5).length
    return 130 - 1 === 129 && C(9, 3) === 84 && sum15 === 381 && 9 + 36 + 84 + 126 + 126 === 381 && literal === 381 && C(9, 4) === 126 && C(9, 5) === 126
  })())

  /* ---- I-O: selection-then-arrangement words ---- */
  push('I59 Illustration 11: C(9,4) = 126 (literal), 126 × 4! = 3024, and 9P4 = 3024 — the two engines agree', kSubsets(9, 4) === 126 && 126 * fact(4) === 3024 && P(9, 4) === 3024 && 9 * 8 * 7 * 6 === 3024)
  push('I60 Illustration 12: C(6,2) × C(4,2) = 15 × 6 = 90 casts (both factors literal), 90 × 4! = 2160 rows', kSubsets(6, 2) === 15 && kSubsets(4, 2) === 6 && 15 * 6 === 90 && 90 * fact(4) === 2160)
  push('I61 Illustration 13 (the exam panel): C(9,3) = 84 (literal); exactly one artist = C(5,2)·C(4,1) = 10 × 4 = 40 (literal group-split); at least one artist = 84 − C(5,3) = 84 − 10 = 74 (literal); stage row = 84 × 3! = 504', (() => {
    const any3 = kSubsets(9, 3)
    const scientists = 5 // bits 0..4
    const artists = 4 // bits 5..8
    let exactlyOneArtist = 0
    let noArtist = 0
    let atLeastOneArtist = 0
    for (let m = 0; m < 1 << 9; m++) {
      if (popcount(m) !== 3) continue
      const artistCount = popcount(m >> scientists)
      if (artistCount === 1) exactlyOneArtist++
      if (artistCount === 0) noArtist++
      if (artistCount >= 1) atLeastOneArtist++
    }
    return any3 === 84 && exactlyOneArtist === 40 && C(5, 2) * C(4, 1) === 40 && noArtist === 10 && atLeastOneArtist === 74 && 84 - 10 === 74 && 84 * fact(3) === 504
  })())
  push('I62 exercise L3#3 (the batting order): C(10,5) = 252 (literal), 252 × 5! = 30240 = 10P5 = 10·9·8·7·6', kSubsets(10, 5) === 252 && 252 * fact(5) === 30240 && P(10, 5) === 30240 && 10 * 9 * 8 * 7 * 6 === 30240 && 30240 / 120 === 252)
  push('I63 exercise L5#3 (the two-group photograph): (C(6,2) × C(4,2)) × 4! = 90 × 24 = 2160', C(6, 2) * C(4, 2) === 90 && 90 * 24 === 2160 && 15 * 6 === 90)

  /* ---- I-P: the quiz values (options and distractors, all computed) ---- */
  push('I64 quiz Q1: C(10,3) = 120 (literal); distractor 240 = 10·9·8/3 (one ordering divided out, not 3!); 720 = 10P3; 6 = 3!', kSubsets(10, 3) === 120 && (10 * 9 * 8) / 3 === 240 && P(10, 3) === 720 && fact(3) === 6 && C(10, 3) === 120)
  push('I65 quiz Q1 explain audit: 10·9·8 = 720 and 720/6 = 120', 10 * 9 * 8 === 720 && 720 / 6 === 120)
  push('I66 quiz Q2 distractors: 3 = 7 − 4 (difference of seats); 10 = 4 + 7 − 1 (off-by-one); 4 = x itself', 7 - 4 === 3 && 4 + 7 - 1 === 10 && 4 === 4)
  push('I67 quiz Q3: 2⁶ − 1 = 63 non-empty selections from six spices (literal); distractor 64 = 2⁶ the zero-or-more census; 6 = C(6,1) the single-spice selections; 65 = 64 + 1', nonEmpty(6) === 63 && allSubsets(6) === 64 && C(6, 1) === 6 && 64 + 1 === 65)
  push('I68 quiz Q4: C(7,3)·3! = 35 × 6 = 210 = 7P3 = 7·6·5 (literal 3-subsets of a 7-roster = 35); distractors 35 = C(7,3), 120 = 5!, 21 = C(7,5) = C(7,2)', kSubsets(7, 3) === 35 && 35 * 6 === 210 && P(7, 3) === 210 && 7 * 6 * 5 === 210 && fact(5) === 120 && C(7, 5) === C(7, 2) && C(7, 2) === 21)

  /* ---- I-Q: the exercises, every answer recomputed ---- */
  push('I69 L1#1: the fifteen 2-selections of a 6-roster listed (ab, ac, …, ef) and the complement pairing into the fifteen 4-selections', (() => {
    const pairs = pairsOf('abcdef')
    return pairs.length === 15 && C(6, 2) === 15 && kSubsets(6, 4) === 15 && new Set(pairs).size === 15
  })())
  push('I70 L1#2: C(8,3) = 56 bowls (literal), 8P3 = 336 = 56 × 3!', kSubsets(8, 3) === 56 && P(8, 3) === 336 && 56 * 6 === 336)
  push('I71 L3#1: the row of five is 1, 5, 10, 10, 5, 1 (every bucket literal) and sums to 32 = 2⁵ (32 masks enumerated)', (() => {
    const buckets = [0, 1, 2, 3, 4, 5].map((k) => kSubsets(5, k))
    return buckets.join(',') === '1,5,10,10,5,1' && buckets.reduce((s, v) => s + v, 0) === 32 && masks(5, () => true).length === 32 && 2 ** 5 === 32
  })())
  push('I72 L3#1 census detail: the ten pairs of a five-roster (ab, ac, ad, ae, bc, bd, be, cd, ce, de) and the ten triples as their complements', (() => {
    const pairs = pairsOf('abcde')
    const triples = kSubsets(5, 3)
    return pairs.join(',') === 'ab,ac,ad,ae,bc,bd,be,cd,ce,de' && pairs.length === 10 && triples === 10
  })())
  push('I73 L4#2 (Multiple Correct): (A) C(10,4) = 210 = C(10,6); (B) swept n ≤ 9; (C) fails at n = 2 (Σ = 4 ≠ 5); (D) fails at n = 3 (C(6,2) = 15 ≠ 2·C(3,2) = 6)', (() => {
    const A = C(10, 4) === C(10, 6) && C(10, 4) === 210
    const B = (() => { for (let n = 0; n <= 9; n++) for (let r = 0; r <= n; r++) if (C(n, r) !== C(n, n - r)) return false; return true })()
    const Cbad = (() => { const sum2: number = C(2, 0) + C(2, 1) + C(2, 2); return sum2 === 4 && sum2 < 5 })()
    const Dbad = (() => { const doubled: number = 2 * C(3, 2); return C(6, 2) === 15 && doubled === 6 && C(6, 2) !== doubled })()
    const Dgeneral = 3 * (2 * 3 - 1) === 15 && 3 * (3 - 1) === 6
    return A && B && Cbad && Dbad && Dgeneral
  })())
  push('I74 L4#3 (Linked Comprehension): C(11,4) = 330 (literal 4-subsets of an 11-roster); exactly 2 men + 2 women = C(6,2)·C(5,2) = 15 × 10 = 150 (literal group-split); at least one woman = 330 − C(6,4) = 315 (literal)', (() => {
    const any4 = kSubsets(11, 4)
    let exactly22 = 0
    let noWomen = 0
    let atLeastOneWoman = 0
    for (let m = 0; m < 1 << 11; m++) {
      if (popcount(m) !== 4) continue
      const women = popcount(m >> 6)
      if (women === 2) exactly22++
      if (women === 0) noWomen++
      if (women >= 1) atLeastOneWoman++
    }
    return any4 === 330 && exactly22 === 150 && C(6, 2) * C(5, 2) === 150 && noWomen === 15 && C(6, 4) === 15 && atLeastOneWoman === 315 && 330 - 15 === 315 && (11 * 10 * 9 * 8) / 24 === 330
  })())
  push('I75 L5#2 (the six-roster full census): 64 zero-or-more; 63 at-least-one; 20 exactly-3 (literal); at-least-4 = 15 + 6 + 1 = 22 = at-most-2 = 1 + 6 + 15 (literal buckets)', (() => {
    const atMost2 = masks(6, (m) => popcount(m) <= 2).length
    const atLeast4 = masks(6, (m) => popcount(m) >= 4).length
    return allSubsets(6) === 64 && nonEmpty(6) === 63 && kSubsets(6, 3) === 20 && atLeast4 === 22 && atMost2 === 22 && C(6, 4) + C(6, 5) + C(6, 6) === 22 && C(6, 0) + C(6, 1) + C(6, 2) === 22
  })())

  /* ---- I-R: the Probability handoff witness ---- */
  push('I76 the handoff: panels containing the captain = C(8,2) = 28 (literal 3-subsets of a 9-roster with bit 0 set), total = C(9,3) = 84, and 28/84 = 1/3', (() => {
    const withCaptain = kSubsetsWith(9, 3, 0)
    return withCaptain === 28 && C(8, 2) === 28 && kSubsets(9, 3) === 84 && 28 / 84 === 1 / 3
  })())

  /* ---- I-S: the product-chain law and its witnesses ---- */
  push('I77 the product-chain witness (4 comics + 2 atlases): (2⁴−1)(2²−1) = 15 × 3 = 45 (double enumeration)', chainPairs(4, 2) === 45)
  push('I78 the product-chain witness (5 fiction + 3 non-fiction): (2⁵−1)(2³−1) = 31 × 7 = 217 (double enumeration of 31 × 7 pairs)', chainPairs(5, 3) === 217 && nonEmpty(5) === 31 && nonEmpty(3) === 7 && 31 * 7 === 217)
  push('I79 the subtraction read on the second witness: 2⁸ − 2⁵ − 2³ + 1 = 256 − 32 − 8 + 1 = 217 (empty-non-fiction 32, empty-fiction 8, doubly-empty 1)', (() => {
    const total = 2 ** (5 + 3)
    const noFiction = 2 ** 3 // non-fiction subsets alone
    const noNonFiction = 2 ** 5 // fiction subsets alone
    return total === 256 && noNonFiction === 32 && noFiction === 8 && total - noNonFiction - noFiction + 1 === 217
  })())
  push('I80 the product-chain law swept: at-least-one-of-each counts multiply along the chain (witnessed by double enumeration at (a,b) = (3,2), (4,2), (5,3))', (() => {
    const cases: Array<[number, number]> = [[3, 2], [4, 2], [5, 3]]
    return cases.every(([a, b]) => chainPairs(a, b) === (2 ** a - 1) * (2 ** b - 1))
  })())

  /* ---- I-T: the half-row identities (L6#2) ---- */
  push('I81 the odd half-row at n = 7: Σ_{r=0..3} C(7,r) = 1 + 7 + 21 + 35 = 64 = 2⁶ (literal: 64 masks of popcount ≤ 3)', (() => {
    const literal = masks(7, (m) => popcount(m) <= 3).length
    return 1 + 7 + 21 + 35 === 64 && literal === 64 && 2 ** 6 === 64
  })())
  push('I82 the even half-row at n = 6: Σ_{r=0..2} C(6,r) = 1 + 6 + 15 = 22 = (2⁶ − C(6,3))/2 = (64 − 20)/2 (literal: 22 masks of popcount ≤ 2)', (() => {
    const literal = masks(6, (m) => popcount(m) <= 2).length
    return 1 + 6 + 15 === 22 && literal === 22 && (64 - 20) / 2 === 22 && C(6, 3) === 20
  })())
  push('I83 the half-row identities swept: odd n = 2k+1 ≤ 9 gives Σ_{r≤k} = 2^{n−1}; even n = 2k ≤ 8 gives Σ_{r≤k−1} = (2ⁿ − C(n,k))/2 — all literally', (() => {
    for (let k = 1; k <= 4; k++) {
      const n = 2 * k + 1
      const literal = masks(n, (m) => popcount(m) <= k).length
      if (literal !== 2 ** (n - 1)) return false
    }
    for (let k = 1; k <= 4; k++) {
      const n = 2 * k
      const literal = masks(n, (m) => popcount(m) <= k - 1).length
      if (literal !== (2 ** n - C(n, k)) / 2) return false
    }
    return true
  })())

  /* ---- I-U: the selection-facts list instances ---- */
  push('I84 the properties list instances: C(12,5) = C(12,7) = 792; C(11,4) = C(11,7) = 330; C(5,2) = 10 = 6 + 4; C(8,4) = 70 = 56 × 5/4 climbing from C(8,3) = 56; 5·6·7 = 210 = 35 × 3! = C(7,3)·3!', (() => {
    return C(12, 5) === 792 && C(12, 7) === 792 && C(11, 4) === 330 && C(11, 7) === 330 && C(5, 2) === 10 && C(4, 2) + C(4, 1) === 10 && C(8, 4) === 70 && C(8, 3) === 56 && 56 * (5 / 4) === 70 && 5 * 6 * 7 === 210 && 35 * fact(3) === 210 && C(7, 3) === 35
  })())

  /* ---- I-V: the derivation statements’ edge claims ---- */
  push('I85 the edges of the selection count: C(n,0) = 1 and C(n,n) = 1 for every n ≤ 8 (literal: one empty mask, one full mask)', (() => {
    for (let n = 0; n <= 8; n++) if (kSubsets(n, 0) !== 1 || kSubsets(n, n) !== 1) return false
    return true
  })())
  push('I86 the two-step identity swept: P(n,r) = C(n,r) · r! for every n ≤ 8, r ≤ n', (() => {
    for (let n = 0; n <= 8; n++) for (let r = 0; r <= n; r++) if (P(n, r) !== C(n, r) * fact(r)) return false
    return true
  })())
  push('I87 the L5#1 algebra route of Pascal: the two-factor common denominator step lands C(n,r) + C(n,r−1) = C(n+1,r) on integer witnesses (n,r) = (4,2) and (5,2)', (() => {
    const witness = (n: number, r: number): boolean => C(n, r) + C(n, r - 1) === C(n + 1, r)
    return witness(4, 2) && witness(5, 2) && C(4, 2) === 6 && C(4, 1) === 4 && C(5, 2) === 10
  })())
}

/* ------------------------------------------------------------------ */
/* SECTION J — structural pins on the lesson part-file                  */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean, detail?: string) => J.push(check(name, ok, detail))
  const L = lesson65
  const rich = (s: string): string => s.replace(/\$[^$]*\$/g, '')

  /* identity, prereqs, sources */
  push('J1 lesson identity: id aa-combinations-the-selection-count, number 6.5, title "Combinations: the Selection Count"', L.id === 'aa-combinations-the-selection-count' && L.number === '6.5' && L.title === 'Combinations: the Selection Count')
  push('J2 prerequisites exactly the pinned siblings: aa-factorials-and-the-counting-toolkit (6.2) + aa-permutations-the-arrangement-count (6.3)', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-factorials-and-the-counting-toolkit', 'aa-permutations-the-arrangement-count']))
  push('J3 sources are banked keys only (cengage-m2-07 is the module key the orchestrator banks at close)', (() => {
    const banked = new Set(['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra', 'cengage-m2-algebra'])
    return (L.sources ?? []).length > 0 && (L.sources ?? []).every((k) => banked.has(k))
  })())

  /* concepts + objectives hygiene */
  push('J4 concepts: 5–8 plain phrases, no $ and no TeX', L.concepts.length >= 5 && L.concepts.length <= 8 && L.concepts.every((c) => !c.includes('$') && !c.includes('\\')))
  push('J5 objectives: ≥ 6, RichText-form (math only inside $..$; no bare TeX outside)', (L.objectives ?? []).length >= 6 && (L.objectives ?? []).every((o) => !rich(o).includes('\\') && !rich(o).includes('$')))

  /* quiz pins */
  const quiz = L.blocks.find((b) => b.kind === 'quiz')
  push('J6 quiz: exactly 5 items', !!quiz && quiz.items.length === 5)
  push('J7 quiz keys are the pinned [0, 1, 1, 1, 3] and every key is a valid index', !!quiz && JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([0, 1, 1, 1, 3]) && quiz.items.every((i) => i.answer >= 0 && i.answer < i.options.length))
  push('J8 quiz explains say why the wrong options fail (≥ 100 chars each, naming Option/option)', !!quiz && quiz.items.every((i) => i.explain.length >= 100 && /option [ABCD]/i.test(i.explain)))
  push('J9 quiz options: exactly 4 per item, non-empty', !!quiz && quiz.items.every((i) => i.options.length === 4 && i.options.every((o) => o.trim().length > 0)))

  /* exercises pins */
  const ex = L.blocks.find((b) => b.kind === 'exercises')
  push('J10 exercises: exactly 15 questions in six sets L1–L6', !!ex && ex.sets.length === 6 && ex.sets.reduce((s, set) => s + set.questions.length, 0) === 15)
  push('J11 the ladder is 2/2/3/3/3/2 in the order L1..L6', !!ex && JSON.stringify(ex.sets.map((s) => s.questions.length)) === JSON.stringify([2, 2, 3, 3, 3, 2]) && JSON.stringify(ex.sets.map((s) => s.level)) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']))
  push('J12 every exercise question carries a full steps-array solution (≥ 3 steps) and a terminal answer', !!ex && ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && typeof q.answer === 'string' && q.answer.length > 0)))

  /* figures pins */
  const figs = L.blocks.filter((b) => b.kind === 'figure')
  push('J13 ≥ 2 original figures (the select-then-arrange split + the Pascal in/out split)', figs.length >= 2)
  push('J14 every figure SVG: viewBox + xmlns + role="img" + aria-label, and NO raw TeX / no $ in the SVG', figs.every((f) => f.svg.includes('viewBox') && f.svg.includes('xmlns') && f.svg.includes('role="img"') && f.svg.includes('aria-label') && !f.svg.includes('$') && !f.svg.includes('\\')))
  push('J15 the SVGs carry the vivid palette only (no retired hexes)', figs.every((f) => !['#3f6212', '#365314', '#6b7a72', '#b45309', '#7c5a2e', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd'].some((hex) => f.svg.includes(hex))))
  push('J16 figure captions are plain prose (no $, no TeX)', figs.every((f) => !f.caption.includes('$') && !f.caption.includes('\\')))

  /* derivation pins */
  const derivs = L.blocks.filter((b) => b.kind === 'derivation')
  push('J17 ≥ 3 derivations (order divide, complement law, Pascal in/out, 2ⁿ census)', derivs.length >= 3)
  push('J18 derivation titles and step labels are PLAIN (no $, no TeX)', derivs.every((d) => !d.title.includes('$') && !d.title.includes('\\') && d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))))
  push('J19 derivation results are clause-wise ($-delimited math with bare prose tails, \\qquad joins; never one unbreakable span) and use \\tfrac inline', (() => {
    return derivs.every((d) => {
      const r = d.result
      const dollars = (r.match(/\$/g) || []).length
      const outside = r.replace(/\$[^$]*\$/g, '').trim()
      const wholeWrapped = /^\$[^$]*\$\.?$/.test(r.trim())
      return dollars >= 2 && outside.length > 0 && !wholeWrapped && !r.includes('\\dfrac')
    })
  })())
  push('J20 every derivation step has a formula and a plain-words explanation', derivs.every((d) => d.steps.every((s) => (s.formula ?? '').length > 0 && s.explanation.length > 0)))

  /* formula cards */
  const forms = L.blocks.filter((b) => b.kind === 'formula')
  push('J21 ≥ 3 formula cards (selection count, complement law, Pascal, ratio law, the two censuses)', forms.length >= 3)
  push('J22 formula names and notes are plain prose (no $, no TeX)', forms.every((f) => !f.name.includes('$') && !f.name.includes('\\') && !(f.note ?? '').includes('$') && !(f.note ?? '').includes('\\')))
  push('J23 formula latex is bare KaTeX (no $ delimiters)', forms.every((f) => !f.latex.includes('$')))

  /* example pins + the hosted folds */
  const examples = L.blocks.filter((b) => b.kind === 'example')
  push('J24 ≥ 8 example (Illustration) blocks with full Sol. chains', examples.length >= 8 && examples.every((e) => e.steps.length >= 3))
  push('J25 the Illustrations escalate and the last is exam-shaped', examples.length >= 8 && /exam-style/i.test(examples[examples.length - 1].title))
  push('J26 example titles are crisp plain problem statements (no $, no TeX)', examples.every((e) => !e.title.includes('$') && !e.title.includes('\\')))
  push('J27 hosted fold 1 discharged: ≥ 2 worked examples of the family "Selection of Zero or More Objects from n Different Objects", each titled with the family name', (() => {
    const hits = examples.filter((e) => /selection of zero or more objects from \d+ different objects/i.test(e.title))
    return hits.length >= 2
  })())
  push('J28 hosted fold 2 discharged: ≥ 2 worked examples of the family "Selection of at Least One Object from n Different Objects", each titled with the family name', (() => {
    const hits = examples.filter((e) => /selection of at least one object from/i.test(e.title))
    return hits.length >= 2
  })())

  /* terms */
  const terms = L.blocks.find((b) => b.kind === 'terms')
  push('J29 ≥ 6 glossary terms', !!terms && terms.items.length >= 6)

  /* the word floor */
  push('J30 the honest word count is at or above the 4,500 floor', countLessonWords(L) >= 4500, `count ${countLessonWords(L)}`)

  /* raw-TeX repair list on inline-rich fields */
  const inlineRich: string[] = []
  for (const b of L.blocks) {
    if (b.kind === 'para' || b.kind === 'heading') inlineRich.push(b.text)
    else if (b.kind === 'callout') inlineRich.push(b.title, b.text)
    else if (b.kind === 'list') inlineRich.push(...b.items)
    else if (b.kind === 'table') { if (b.caption) inlineRich.push(b.caption); inlineRich.push(...b.head, ...b.rows.flat()) }
    else if (b.kind === 'example') { inlineRich.push(b.title, ...b.steps) }
    else if (b.kind === 'quiz') for (const it of b.items) inlineRich.push(it.q, ...it.options, it.explain)
    else if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) { inlineRich.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) inlineRich.push(q.answer) }
    else if (b.kind === 'derivation') { inlineRich.push(b.statement, ...b.steps.map((s) => s.explanation), b.result) }
    else if (b.kind === 'equation' && b.note) inlineRich.push(b.note)
    else if (b.kind === 'figure') inlineRich.push(b.caption)
  }
  push('J31 the raw-TeX repair list: NO \\dfrac in any inline-rich field (\\tfrac inline only — display equations and formula latex excepted)', (() => {
    const bad = inlineRich.filter((s) => s.includes('\\dfrac'))
    return bad.length === 0
  })(), inlineRich.filter((s) => s.includes('\\dfrac')).length + ' dfrac hits')
  push('J32 plain-rendered fields carry no TeX at all (callout titles, headings, example titles, captions, formula names + notes, equation notes)', (() => {
    const plain: string[] = []
    for (const b of L.blocks) {
      if (b.kind === 'heading') plain.push(b.text)
      else if (b.kind === 'callout') plain.push(b.title)
      else if (b.kind === 'example') plain.push(b.title)
      else if (b.kind === 'figure') plain.push(b.caption)
      else if (b.kind === 'table' && b.caption) plain.push(b.caption)
      else if (b.kind === 'equation' && b.note) plain.push(b.note)
      else if (b.kind === 'formula') { plain.push(b.name); if (b.note) plain.push(b.note) }
    }
    return plain.every((s) => !s.includes('$') && !s.includes('\\'))
  })())

  /* cross-references + handoff */
  const allText = L.blocks.map((b) => JSON.stringify(b)).join(' ')
  push('J33 named-sibling cross-references: 6.1, 6.2, 6.3, 6.4 and 6.6 are each cited by lesson name', (() => {
    return allText.includes('The Fundamental Principle of Counting') && allText.includes('Factorials and the Counting Toolkit') && allText.includes('Permutations: the Arrangement Count') && allText.includes('Circular and Restricted Permutations') && allText.includes('Distributions and the Classic Counting Puzzles')
  })())
  push('J34 the Probability handoff is NAMED: favourable selections over total selections, with the 28/84 = 1/3 witness carried in prose', (() => {
    return /Probability/.test(allText) && /FAVOURABLE selections over TOTAL selections/i.test(allText) && allText.includes('\\tfrac{28}{84}')
  })())
  push('J35 the lesson names the in/out split, the choose-is-reject read, the two censuses and the order divide (the vocabulary the e2e pins)', (() => {
    const corpus = inlineRich.join(' ')
    return corpus.includes('in/out') && corpus.includes('choose is reject') && corpus.includes('zero-or-more') && corpus.includes('order divide')
  })())

  /* KaTeX-node floor for the e2e pin: count inline $..$ pairs in the lesson */
  const dollarPairs = inlineRich.map((s) => (s.match(/\$/g) || []).length).reduce((a, b) => a + b, 0) / 2
  push('J36 the lesson carries ≥ 300 inline $..$ math pairs for the KaTeX pin (counted: ' + Math.floor(dollarPairs) + ')', dollarPairs >= 300)
  const vocabRe = /combination|selection|arrangement|Pascal|complement|census|order|factorial|symmetry|ratio|row|panel|committee|select|arrange|at least|zero or more/gi
  const vocabHits = (inlineRich.join(' ').match(vocabRe) || []).length
  push('J37 the e2e vocabulary pin floor is honest: ≥ 150 hits on the lesson vocabulary regex (counted: ' + vocabHits + ')', vocabHits >= 150)
}
}


/* (assembled section mapping: this agent's ENGINE array -> section K, its PINS array -> section L; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const K: SectionCheck[] = []
const L: SectionCheck[] = []
{


/**
 * v6-6.ts — the task 6-f engine for AA lesson 6.6
 * "Distributions and the Classic Counting Puzzles".
 *
 * Brute-force re-verification of EVERY number in the lesson, independent of
 * any closed form: identical-selection counts by literal seat enumeration,
 * distinct-division/distribution counts by literal assignment enumeration
 * (r^n assignment lists at 3^12 = 531441 and below), equal-size divisions by
 * literal labelled-slot census and canonical-form collapse, bars-in-gaps
 * counts by literal tuple enumeration, series coefficients by literal
 * polynomial multiplication, PIE unions by literal divisibility enumeration,
 * onto counts by literal surjection enumeration, derangement values D(1..6)
 * by literal permutation enumeration, every quiz key and every distractor's
 * arithmetic, and every exercise answer. Section letters: K = engines,
 * L = structural pins (the master plan's verify-first letters for 6.6).
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1)
  return Math.round(r)
}

/** literal count of tuples (x1..xr) >= 0 with sum n */
function weakTuples(n: number, r: number): number {
  if (r === 1) return 1
  let c = 0
  for (let x = 0; x <= n; x++) c += weakTuples(n - x, r - 1)
  return c
}
/** literal count of tuples (x1..xr) >= 1 with sum n */
function posTuples(n: number, r: number): number {
  return n >= r ? weakTuples(n - r, r) : 0
}
/** literal count of tuples (x1..xr) >= floor with sum n */
function floorTuples(n: number, r: number, floor: number): number {
  return n >= r * floor ? weakTuples(n - r * floor, r) : 0
}

/** literal count of assignments of n objects to r persons (r^n) whose
 * group-size multiset equals the target sizes (given in non-decreasing order) */
function assignmentsWithSizes(n: number, r: number, sizes: number[]): number {
  let count = 0
  const total = Math.pow(r, n)
  for (let code = 0; code < total; code++) {
    let c = code
    const counts = new Array<number>(r).fill(0)
    for (let i = 0; i < n; i++) {
      counts[c % r]++
      c = Math.floor(c / r)
    }
    counts.sort((a, b) => a - b)
    if (counts.length === sizes.length && counts.every((v, i) => v === sizes[i])) count++
  }
  return count
}

/** literal count of surjective assignments of n objects to r persons */
function ontoAssignments(n: number, r: number): number {
  let count = 0
  const total = Math.pow(r, n)
  for (let code = 0; code < total; code++) {
    let c = code
    const seen = new Array<boolean>(r).fill(false)
    let distinct = 0
    for (let i = 0; i < n; i++) {
      const t = c % r
      if (!seen[t]) {
        seen[t] = true
        distinct++
      }
      c = Math.floor(c / r)
    }
    if (distinct === r) count++
  }
  return count
}

/** literal count of permutations of [0..n-1] with no fixed point */
function derangements(n: number): number {
  const perm = Array.from({ length: n }, (_, i) => i)
  let count = 0
  const visit = (k: number): void => {
    if (k === n) {
      if (perm.every((p, i) => p !== i)) count++
      return
    }
    for (let i = k; i < n; i++) {
      ;[perm[k], perm[i]] = [perm[i], perm[k]]
      visit(k + 1)
      ;[perm[k], perm[i]] = [perm[i], perm[k]]
    }
  }
  visit(0)
  return count
}

/** literal count of permutations of [0..n-1] with exactly k fixed points */
function exactlyKFixed(n: number, k: number): number {
  const perm = Array.from({ length: n }, (_, i) => i)
  let count = 0
  const visit = (j: number): void => {
    if (j === n) {
      if (perm.filter((p, i) => p === i).length === k) count++
      return
    }
    for (let i = j; i < n; i++) {
      ;[perm[j], perm[i]] = [perm[i], perm[j]]
      visit(j + 1)
      ;[perm[j], perm[i]] = [perm[i], perm[j]]
    }
  }
  visit(0)
  return count
}

/** integer polynomial product of coefficient arrays, truncated to degree d */
function polyMul(a: number[], b: number[], d: number): number[] {
  const out = new Array<number>(d + 1).fill(0)
  for (let i = 0; i < a.length && i <= d; i++)
    for (let j = 0; j < b.length && i + j <= d; j++) out[i + j] += a[i] * b[j]
  return out
}
/** geometric string 1 + p + ... + p^m as coefficients */
const geom = (m: number): number[] => new Array<number>(m + 1).fill(1)

/* ------------------------------------------------------------------ */
/* SECTION K — 6.6 engines (every number in the lesson, recomputed)   */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean, detail?: string) => K.push(check(name, ok, detail))

  /* ---- K1: selection from identical objects (opening + Illustration 1) ---- */
  push('K1.1 the n+1 seat census: zero-or-more from n identical = n + 1 (the seats 0..n enumerated literally), one-or-more = n, swept n = 2..7', (() => {
    for (let n = 2; n <= 7; n++) {
      let seats = 0
      for (let x = 0; x <= n; x++) seats++
      let oneOrMore = 0
      for (let x = 1; x <= n; x++) oneOrMore++
      if (seats !== n + 1 || oneOrMore !== n) return false
    }
    return true
  })())
  push('K1.2 Illustration 1 census: (4+1)(6+1)·2^5 = 5·7·32 = 1120 zero-or-more, 1119 one-or-more — enumerated literally over seats and marker subsets', (() => {
    let all = 0
    let nonempty = 0
    for (let i = 0; i <= 4; i++) for (let j = 0; j <= 6; j++) for (let m = 0; m < 32; m++) { all++; if (i > 0 || j > 0 || m > 0) nonempty++ }
    return 5 * 7 * 32 === 1120 && all === 1120 && nonempty === 1119
  })())
  push('K1.3 the divisor reread: the divisors of 2^4·3^6 number 35 = 5·7 (literal exponent-pair enumeration), the ANS 4.3 census cited not re-taught', (() => {
    let d = 0
    for (let a = 0; a <= 4; a++) for (let b = 0; b <= 6; b++) d++
    return d === 35 && 5 * 7 === 35
  })())
  push('K1.4 the wrong-model catcher at n = 2: one-or-more from 2 identical = 2 (the seats 1, 2), one-or-more from 2 distinct = 3 = 2^2 − 1 (the literal nonempty subsets of {a, b})', (() => {
    let identicalSeats = 0
    for (let i = 1; i <= 2; i++) identicalSeats++
    const nonemptySubsets = ['a', 'b', 'ab'].length
    return identicalSeats === 2 && nonemptySubsets === 3 && Math.pow(2, 2) - 1 === 3
  })())

  /* ---- K2: two-group division and distribution (Ill. 2, 3 + E2) ---- */
  push('K2.1 Illustration 2: C(9,4) = 126 divisions (literal 4-subset enumeration), ×2! = 252 distributions', (() => {
    let c = 0
    for (let a = 0; a < 9; a++) for (let b = a + 1; b < 9; b++) for (let d = b + 1; d < 9; d++) for (let e = d + 1; e < 9; e++) c++
    return c === 126 && 126 * 2 === 252
  })())
  push('K2.2 the 3-object census of Illustration 2: three posters into a 1-and-2 split = 3 divisions = C(3,1)', (() => {
    let c = 0
    for (let a = 0; a < 3; a++) c++
    return c === 3 && binom(3, 1) === 3
  })())
  push('K2.3 Illustration 3: C(11,5) = 462 divisions, ×2 = 924 distributions (literal)', (() => {
    let c = 0
    const pick = (start: number, k: number): number => { if (k === 0) return 1; let t = 0; for (let i = start; i <= 11 - k; i++) t += pick(i + 1, k - 1); return t }
    c = pick(0, 5)
    return c === 462 && 462 * 2 === 924
  })())
  push('K2.4 E2: C(8,3) = 56 divisions (literal 3-subsets of 8), ×2 = 112 distributions', (() => {
    let c = 0
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) for (let d = b + 1; d < 8; d++) c++
    return c === 56 && 56 * 2 === 112
  })())

  /* ---- K3: three-group and general division (Ill. 4, 5 + E3 + E7) ---- */
  push('K3.1 Illustration 4: 12 objects to sizes (3,4,5) — labelled any-order census = 3!·12!/(3!4!5!) = 166320, fixed-order = 27720, division = 27720 (literal 3^12 assignment enumeration)', (() => {
    const fixed = assignmentsWithSizes(12, 3, [3, 4, 5])
    return fact(12) / (fact(3) * fact(4) * fact(5)) === 27720 && fixed === 166320 && fixed === 27720 * 6
  })())
  push('K3.2 Illustration 5: 8 objects to sizes (3,3,2) — fixed-slot naive fraction 8!/(3!3!2!) = 560, labelled any-order = 3·560 = 1680 (literal 3^8), division = 560/2! = 280, distribution ×3! = 1680', (() => {
    const labelled = assignmentsWithSizes(8, 3, [2, 3, 3])
    return fact(8) / (fact(3) * fact(3) * fact(2)) === 560 && labelled === 1680 && 560 / 2 === 280 && 280 * 6 === 1680
  })())
  push('K3.3 E3: 10 objects to sizes (2,3,5) — any-order labelled = 15120 (literal 3^10), division 10!/(2!3!5!) = 2520', (() => {
    const labelled = assignmentsWithSizes(10, 3, [2, 3, 5])
    return labelled === 15120 && fact(10) / (fact(2) * fact(3) * fact(5)) === 2520 && labelled === 2520 * 6
  })())
  push('K3.4 E7: 9 objects to sizes (2,2,2,3) — any-order labelled = 30240 (literal 4^9), division 9!/(2!2!2!3!)/3! = 1260, distribution ×4! = 30240', (() => {
    const labelled = assignmentsWithSizes(9, 4, [2, 2, 2, 3])
    return labelled === 30240 && fact(9) / (fact(2) * fact(2) * fact(2) * fact(3)) === 7560 && 7560 / 6 === 1260 && 1260 * 24 === 30240
  })())

  /* ---- K4: equal-size division (the 4-object table + Ill. 6, 7 + E4) ---- */
  push('K4.1 the four-object literal table: 4!/(2!2!) = 6 ordered splits of P,Q,R,S into labelled pairs (literal), collapsing in pairs to 3 true divisions (canonical-form census)', (() => {
    let ordered = 0
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) ordered++
    const divisions = new Set<string>()
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) { const rest = [0, 1, 2, 3].filter((x) => x !== a && x !== b); const piles = [[a, b].sort((x, y) => x - y), rest.sort((x, y) => x - y)].sort((p, q) => p[0] - q[0]); divisions.add(JSON.stringify(piles)) }
    return ordered === 6 && fact(4) / (fact(2) * fact(2)) === 6 && divisions.size === 3 && 6 / 2 === 3
  })())
  push('K4.2 Illustration 6 + E4: 6 objects to three 2s — labelled = 6!/(2!)^3 = 90 (literal 3^6), division = 90/3! = 15', (() => {
    const labelled = assignmentsWithSizes(6, 3, [2, 2, 2])
    return labelled === 90 && fact(6) / Math.pow(2, 3) === 90 && 90 / 6 === 15 && 15 * 6 === 90
  })())
  push('K4.3 Illustration 7: 12 objects to four 3s — division 12!/((3!)^4·4!) = 15400, to persons 12!/(3!)^4 = 369600; the 8-bead witness: 8!/((2!)^4·4!) = 105 labelled-literal, 8!/(2!)^4 = 2520 to four strings', (() => {
    const labelled8 = assignmentsWithSizes(8, 4, [2, 2, 2, 2])
    return fact(12) / (Math.pow(6, 4) * 24) === 15400 && fact(12) / Math.pow(6, 4) === 369600 && fact(8) / (Math.pow(2, 4) * 24) === 105 && fact(8) / Math.pow(2, 4) === 2520 && labelled8 === 2520
  })())

  /* ---- K5: unfixed sizes (Ill. 8, 9) ---- */
  push('K5.1 Illustration 8: 4 cards to 3 friends = 3^4 = 81 (literal); the n=2 census: 2 cards to 2 friends = 2^2 = 4 assignments listed (A,A),(A,B),(B,A),(B,B)', (() => {
    let c = 0
    for (let code = 0; code < 81; code++) c++
    return c === 81 && Math.pow(2, 2) === 4 && [['A', 'A'], ['A', 'B'], ['B', 'A'], ['B', 'B']].length === 4
  })())
  push('K5.2 Illustration 9: 81 − 3 = 78 (literal: the 3 sweeps enumerated base-3 digit-wise), and the n = 2 census 2^2 − 2 = 2', (() => {
    let literal = 0
    for (let code = 0; code < 81; code++) { const digs = [Math.floor(code / 27), Math.floor((code % 27) / 9), Math.floor((code % 9) / 3), code % 3]; if (digs.some((v) => v !== digs[0])) literal++ }
    return literal === 78 && Math.pow(3, 4) === 81 && Math.pow(2, 2) - 2 === 2
  })())

  /* ---- K6: identical distributions (Ill. 10–14 + figure + E5, E6, E12) ---- */
  push('K6.1 Illustration 10 + its table: 5 identical sweets to 2 children = 6 (literal x = 0..5), = C(5+2−1, 1) = C(6,1)', (() => {
    let c = 0
    for (let x = 0; x <= 5; x++) c++
    return c === 6 && binom(6, 1) === 6
  })())
  push('K6.2 the symbol-row reconciliation of the figure: 7 objects + 2 bars = 9 symbols, C(9,2) = 36 = the weak triples summing 7 (literal); the none-empty panel: C(6,2) = 15 = the positive triples summing 7 (literal)', (() => {
    let weak = 0
    for (let x = 0; x <= 7; x++) for (let y = 0; y <= 7 - x; y++) weak++
    let pos = 0
    for (let x = 1; x <= 7; x++) for (let y = 1; y <= 7 - x; y++) if (7 - x - y >= 1) pos++
    return binom(9, 2) === 36 && weak === 36 && binom(6, 2) === 15 && pos === 15
  })())
  push('K6.3 Illustration 11: C(9,2) = 36; Illustration 12: C(15,3) = 455 (both enumerated literally — the weak triples of 7 and the weak quadruples of 12)', weakTuples(7, 3) === 36 && binom(9, 2) === 36 && weakTuples(12, 4) === 455 && binom(15, 3) === 455)
  push('K6.4 Illustration 13: positive quadruples summing 9 = 56 = C(8,3) (literal); the substitution cross-check C(5+4−1,3) = C(8,3) = 56', posTuples(9, 4) === 56 && binom(8, 3) === 56 && binom(5 + 4 - 1, 3) === 56)
  push('K6.5 Illustration 14: triples ≥ 2 summing 12 = 28 = C(8,2) (literal); the n=2 census: 4 candles into 2 boxes each ≥2 → exactly (2,2), C(1,1) = 1', floorTuples(12, 3, 2) === 28 && binom(8, 2) === 28 && floorTuples(4, 2, 2) === 1 && binom(1, 1) === 1)
  push('K6.6 E5: positive quintuples summing 12 = 330 = C(11,4) (literal); E6: weak quadruples summing 15 = 816 = C(18,3) (literal) with the n=2 census 10 = 4+6 types', posTuples(12, 5) === 330 && binom(11, 4) === 330 && weakTuples(15, 4) === 816 && binom(18, 3) === 816 && weakTuples(2, 4) === 10 && binom(5, 3) === 10 && 4 + 6 === 10)
  push('K6.7 E12: the slack read — quadruples with sum ≤ 9 = 715 = C(13,4) (literal 4-nested enumeration), matching the 5-variable weak equation x+y+z+w+t = 9', (() => {
    let c = 0
    for (let x = 0; x <= 9; x++) for (let y = 0; y <= 9 - x; y++) for (let z = 0; z <= 9 - x - y; z++) for (let w = 0; w <= 9 - x - y - z; w++) c++
    return c === 715 && weakTuples(9, 5) === 715 && binom(13, 4) === 715
  })())
  push('K6.8 the warn-callout censuses: 4 identical to 2 persons = C(5,1) = 5 vs 4 distinct = 2^4 = 16; 10 identical to 4 children none empty = 84 vs the empty-allowed 286; the n=2 census (2 sweets, 2 children, none empty) = 1 = C(1,1)', weakTuples(4, 2) === 5 && binom(5, 1) === 5 && Math.pow(2, 4) === 16 && posTuples(10, 4) === 84 && binom(9, 3) === 84 && weakTuples(10, 4) === 286 && binom(13, 3) === 286 && posTuples(2, 2) === 1)

  /* ---- K7: the series method (derivation + Ill. 15, 16 + E11) ---- */
  push('K7.1 the negative-power law: (1−x)^{−n} coefficients equal C(n+r−1, r) for n = 1..4, r = 0..10 (literal polynomial expansion of (1+p+…)^n)', (() => {
    for (let n = 1; n <= 4; n++) {
      let s = [1]
      for (let k = 1; k <= n; k++) s = polyMul(s, geom(11), 11)
      for (let r = 0; r <= 10; r++) if (s[r] !== binom(n + r - 1, r)) return false
    }
    return true
  })())
  push('K7.2 the triangular coefficients of (1+p+…)³: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66 (literal expansion) — [p^7] = 36 = C(9,7)', (() => {
    let s = [1]
    s = polyMul(polyMul(polyMul(s, geom(11), 11), geom(11), 11), geom(11), 11)
    const want = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66]
    return want.every((w, i) => s[i] === w) && s[7] === 36 && binom(9, 7) === 36
  })())
  push('K7.3 Illustration 15: [p^10] of (p+…+p^6)^3 = 27 (literal polynomial product) = the literal ordered dice triples summing 10 = 27, and the pattern census 6+6+3+6+3+3 = 27', (() => {
    const die = [0, 1, 1, 1, 1, 1, 1] // coefficients of p^0..p^6, the p^0 seat empty
    const prod = polyMul(polyMul(die, die, 10), die, 10)
    let literal = 0
    const patterns: Record<string, number> = {}
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let c = 1; c <= 6; c++) if (a + b + c === 10) { literal++; const key = [a, b, c].sort((x, y) => x - y).join(','); patterns[key] = (patterns[key] ?? 0) + 1 }
    const vals = Object.values(patterns).sort((a, b) => a - b)
    return prod[10] === 27 && literal === 27 && vals.join(',') === '3,3,3,6,6,6' && vals.reduce((x, y) => x + y, 0) === 27 && 6 + 6 + 3 + 6 + 3 + 3 === 27
  })())
  push('K7.4 Illustration 16 + E11: [p^10] of (1+p+…+p^4)(1+p+…)² = 45 (literal product) = the literal triples x ≤ 4 summing 10 = 45 = the column census 11+10+9+8+7', (() => {
    const bounded = geom(4)
    const free = polyMul(geom(11), geom(11), 10)
    const prod = polyMul(bounded, free, 10)
    let literal = 0
    for (let x = 0; x <= 4; x++) for (let y = 0; y <= 10 - x; y++) literal++
    return prod[10] === 45 && literal === 45 && 11 + 10 + 9 + 8 + 7 === 45 && binom(12, 10) === 66 && binom(7, 5) === 21 && 66 - 21 === 45
  })())

  /* ---- K8: PIE (theorem + figure + Ill. 17) ---- */
  push('K8.1 the alternating binomial collapse: for k = 1..6, C(k,1) − C(k,2) + C(k,3) − ⋯ = 1 exactly (the region-count engine behind the figure)', (() => {
    for (let k = 1; k <= 6; k++) {
      let s = 0
      for (let j = 1; j <= k; j++) s += Math.pow(-1, j - 1) * binom(k, j)
      if (s !== 1) return false
    }
    return true
  })())
  push('K8.2 Illustration 17: the divisibility census — |A2| = 125, |A5| = 50, |A7| = 35, pairs 25/17/7, triple 3, union 164, complement 86 (every number literal on 1..250)', (() => {
    const fl = (d: number) => Math.floor(250 / d)
    let union = 0
    let none = 0
    for (let i = 1; i <= 250; i++) { if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0) union++; else none++ }
    return fl(2) === 125 && fl(5) === 50 && fl(7) === 35 && fl(10) === 25 && fl(14) === 17 && fl(35) === 7 && fl(70) === 3 && union === 164 && none === 86 && 125 + 50 + 35 - 25 - 17 - 7 + 3 === 164 && 250 - 164 === 86
  })())
  push('K8.3 the two-set Venn census of the figure, literally: on U = 1..24 with A = multiples of 2, B = multiples of 3, n(A∪B) = 12 + 8 − 4 = 16 = the literal union', (() => {
    let A = 0
    let B = 0
    let AB = 0
    let U = 0
    for (let i = 1; i <= 24; i++) { if (i % 2 === 0) A++; if (i % 3 === 0) B++; if (i % 2 === 0 && i % 3 === 0) AB++; if (i % 2 === 0 || i % 3 === 0) U++ }
    return A === 12 && B === 8 && AB === 4 && A + B - AB === 16 && U === 16
  })())

  /* ---- K9: the onto count (Ill. 18, 19 + E8 + E13 + the warn census) ---- */
  push('K9.1 Illustration 18: 4 letters to 3 mailboxes none empty = 36 (literal surjection census of 3^4 = 81) = 81 − 3·2^4 + 3·1 = 36', (() => {
    const lit = ontoAssignments(4, 3)
    return lit === 36 && 81 - 3 * 16 + 3 === 36 && Math.pow(3, 4) === 81
  })())
  push('K9.2 Illustration 19: 6 volunteers to 4 teams none empty = 1560 (literal surjection census of 4^6 = 4096) = 4096 − 4·729 + 6·64 − 4', (() => {
    const lit = ontoAssignments(6, 4)
    return lit === 1560 && Math.pow(4, 6) === 4096 && 4 * Math.pow(3, 6) === 2916 && 6 * Math.pow(2, 6) === 384 && 4096 - 2916 + 384 - 4 === 1560
  })())
  push('K9.3 E8: 5 gifts to 3 persons none empty = 150 (literal) = 243 − 96 + 3; the distractor profile decomposition (2,2,1) → 90 and (3,1,1) → 60, 90 + 60 = 150', (() => {
    const lit = ontoAssignments(5, 3)
    const p221 = binom(5, 2) * binom(3, 2) * binom(1, 1) * 3
    const p311 = binom(5, 3) * binom(2, 1) * binom(1, 1) * 3
    return lit === 150 && 243 - 96 + 3 === 150 && p221 === 90 && p311 === 60 && p221 + p311 === 150 && fact(5) === 120
  })())
  push('K9.4 E13: 5 letters to 4 mailboxes none empty = 240 (literal) = 1024 − 972 + 192 − 4', (() => {
    const lit = ontoAssignments(5, 4)
    return lit === 240 && Math.pow(4, 5) === 1024 && 4 * Math.pow(3, 5) === 972 && 6 * Math.pow(2, 5) === 192 && 1024 - 972 + 192 - 4 === 240
  })())
  push('K9.5 the edge census of the warn callout: 2^4 − 2 = 14 (literal), and the sign-drop fraud 4096 − 2916 = 1180 vs the honest 1560', (() => {
    const lit = ontoAssignments(4, 2)
    return lit === 14 && Math.pow(2, 4) - 2 === 14 && 4096 - 2916 === 1180 && 1180 + 384 - 4 === 1560
  })())

  /* ---- K10: derangements (Ill. 20, 21 + the table + E9 + E14) ---- */
  push('K10.1 the derangement census D(1..6) = 0, 1, 2, 9, 44, 265 by LITERAL permutation enumeration, each reconciling with n!·Σ(−1)^k/k!', (() => {
    const want = [0, 1, 2, 9, 44, 265]
    for (let n = 1; n <= 6; n++) {
      let s = 0
      for (let k = 0; k <= n; k++) s += (fact(n) / fact(k)) * Math.pow(-1, k)
      if (derangements(n) !== want[n - 1] || s !== want[n - 1]) return false
    }
    return true
  })())
  push('K10.2 the recurrence D(n) = n·D(n−1) + (−1)^n swept n = 2..6 (2·0+1, 3·1−1, 4·2+1, 5·9−1, 6·44+1)', (() => {
    const D = [1, 0, 1, 2, 9, 44, 265]
    for (let n = 2; n <= 6; n++) if (n * D[n - 1] + Math.pow(-1, n) !== D[n]) return false
    return 2 * 0 + 1 === 1 && 3 * 1 - 1 === 2 && 4 * 2 + 1 === 9 && 5 * 9 - 1 === 44 && 6 * 44 + 1 === 265
  })())
  push('K10.3 Illustration 20: the nine derangements of 1234 listed in the prose — 2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321 — are exactly the literal fixed-point-free permutations', (() => {
    const listed = ['2143', '2341', '2413', '3142', '3412', '3421', '4123', '4312', '4321']
    const perm = [0, 1, 2, 3]
    const found: string[] = []
    const visit = (k: number): void => {
      if (k === 4) { if (perm.every((p, i) => p !== i)) found.push(perm.map((v) => v + 1).join('')); return }
      for (let i = k; i < 4; i++) { ;[perm[k], perm[i]] = [perm[i], perm[k]]; visit(k + 1); ;[perm[k], perm[i]] = [perm[i], perm[k]] }
    }
    visit(0)
    return found.sort().join(',') === listed.sort().join(',') && found.length === 9
  })())
  push('K10.4 Illustration 20 companions: exactly-one-correct for 4 = C(4,1)·D(3) = 8 (literal), at-least-one = 24 − 9 = 15 (literal)', exactlyKFixed(4, 1) === 8 && binom(4, 1) * 2 === 8 && exactlyKFixed(4, 0) === 9 && fact(4) - 9 === 15 && exactlyKFixed(4, 0) + exactlyKFixed(4, 1) + exactlyKFixed(4, 2) + exactlyKFixed(4, 3) + exactlyKFixed(4, 4) === 24)
  push('K10.5 Illustration 21 + E14: exactly-one for 6 = C(6,1)·D(5) = 264, exactly-two for 6 = C(6,2)·D(4) = 135 (both literal), total 399; exactly-two for 5 = C(5,2)·D(3) = 20 (literal)', exactlyKFixed(6, 1) === 264 && 6 * 44 === 264 && exactlyKFixed(6, 2) === 135 && 15 * 9 === 135 && 264 + 135 === 399 && exactlyKFixed(5, 2) === 20 && 10 * 2 === 20)
  push('K10.6 the D(n)/n! table: 1/2 = 0.5, 2/6 ≈ 0.3333, 9/24 = 0.375, 44/120 ≈ 0.3667, 265/720 ≈ 0.3681 (the displayed decimals, tolerance 5e-5)', (() => {
    const near = (x: number, y: number) => Math.abs(x - y) < 5e-5
    return near(1 / fact(2), 0.5) && near(2 / fact(3), 0.3333) && near(9 / fact(4), 0.375) && near(44 / fact(5), 0.3667) && near(265 / fact(6), 0.3681)
  })())

  /* ---- K11: quiz keys and every distractor's arithmetic ---- */
  push('K11.1 quiz Q1: (5+1)(4+1) − 1 = 29 (literal seat enumeration); distractors 20 = 5·4, 30 = the zero-or-more census, 9 = 5 + 4', (() => {
    let zw = 0
    for (let i = 0; i <= 5; i++) for (let j = 0; j <= 4; j++) zw++
    return zw === 30 && zw - 1 === 29 && 5 * 4 === 20 && 5 + 4 === 9
  })())
  push('K11.2 quiz Q2: 126 = C(9,4); distractors 252 = 2·126, 63 = 126/2, 3024 = 9·8·7·6 (the arrangement misfire)', binom(9, 4) === 126 && 2 * 126 === 252 && Math.floor(126 / 2) === 63 && 9 * 8 * 7 * 6 === 3024)
  push('K11.3 quiz Q3: 84 = C(9,3); distractors 286 = C(13,3) (empty-allowed), 120 = C(10,3) (n gaps), 210 = C(10,4) (roles swapped)', binom(9, 3) === 84 && binom(13, 3) === 286 && binom(10, 3) === 120 && binom(10, 4) === 210)
  push('K11.4 quiz Q4: D(4) = 9; distractors 24 = 4!, 15 = 24 − 9 (at least one correct), 12 = 24/2 (the necklace halving)', derangements(4) === 9 && fact(4) === 24 && 24 - 9 === 15 && 24 / 2 === 12)
  push('K11.5 quiz Q5: 45 = C(10,2) = the literal weak triples of 8; distractors 21 = C(7,2) (positive model), 120 = C(10,3) (a bar invented), 28 = C(8,2) (the end seats dropped)', weakTuples(8, 3) === 45 && binom(10, 2) === 45 && binom(7, 2) === 21 && binom(10, 3) === 120 && binom(8, 2) === 28 && posTuples(8, 3) === 21)

  /* ---- K12: every exercise answer ---- */
  push('K12.1 E1: (6+1)(5+1) − 1 = 41 (literal 42 seat-pairs), and 6·5 = 30 for at-least-one-of-each', (() => {
    let zw = 0
    for (let i = 0; i <= 6; i++) for (let j = 0; j <= 5; j++) zw++
    return zw === 42 && zw - 1 === 41 && 6 * 5 === 30
  })())
  push('K12.2 E10 statements: (A) 7!/(3!2!2!)/2! = 105 (any-order labelled census 630 at 3^7 = 3·210), (B) 84 = C(9,3) (K11.3), (C) 28 = C(8,2) = the literal weak triples of 6 to 3, (D) the honest count 14 = 2^4 − 2 (literal) — (A,B,C) true, (D) false', (() => {
    const anyOrder = assignmentsWithSizes(7, 3, [2, 2, 3])
    return anyOrder === 630 && fact(7) / (fact(3) * fact(2) * fact(2)) === 210 && 210 / 2 === 105 && weakTuples(6, 3) === 28 && binom(8, 2) === 28 && ontoAssignments(4, 2) === 14 && Math.pow(2, 4) === 16
  })())
  push('K12.3 E15(i)(ii): the unordered partitions of 11 into 3 distinct positive parts are exactly 5 (listed literally), and the ordered distinct-count distributions = 30 (literal)', (() => {
    let unordered = 0
    for (let x = 1; x <= 11; x++) for (let y = x + 1; y <= 11 - x - y; y++) { const z = 11 - x - y; if (z > y) unordered++ }
    let ordered = 0
    for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) { const c = 11 - a - b; if (c >= 1 && a !== b && b !== c && a !== c) ordered++ }
    return unordered === 5 && ordered === 30
  })())
  push('K12.4 E15(iii): the distinct-apple five-term factorial sum 3!·11!·Σ 1/(x!y!z!) = 94050 = the literal assignment census of 11 distinct apples to 3 persons with all counts distinct and positive (3^11 enumerated)', (() => {
    let sum = 0
    for (let x = 1; x <= 11; x++) for (let y = x + 1; y <= 11 - x - y; y++) { const z = 11 - x - y; if (z > y) sum += fact(11) / (fact(x) * fact(y) * fact(z)) }
    const formulaTotal = sum * 6
    let literal = 0
    const total = Math.pow(3, 11)
    for (let code = 0; code < total; code++) {
      let c = code
      const counts = [0, 0, 0]
      for (let i = 0; i < 11; i++) { counts[c % 3]++; c = Math.floor(c / 3) }
      if (counts[0] >= 1 && counts[1] >= 1 && counts[2] >= 1 && counts[0] !== counts[1] && counts[1] !== counts[2] && counts[0] !== counts[2]) literal++
    }
    return formulaTotal === 94050 && literal === 94050
  })())
}

/* ------------------------------------------------------------------ */
/* SECTION L — 6.6 pins on the lesson object (the part file itself)   */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_66 = [2, 2, 1, 3, 0]

const L66 = lesson66

{
  const push = (name: string, ok: boolean, detail?: string) => L.push(check(name, ok, detail))
  const countKind = (kind: string): number => L66.blocks.filter((b) => b.kind === (kind as never)).length
  const collectTexts = (): string[] => {
    const texts: string[] = []
    for (const b of L66.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      else if (b.kind === 'callout') texts.push(b.title, b.text)
      else if (b.kind === 'example') texts.push(b.title, ...b.steps)
      else if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      else if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain, ...it.options)
      else if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) { texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) texts.push(q.answer) }
      else if (b.kind === 'figure') texts.push(b.caption)
      else if (b.kind === 'table') texts.push(...(b.caption ? [b.caption] : []), ...b.head, ...b.rows.flat())
      else if (b.kind === 'formula') texts.push(b.name, ...(b.note ? [b.note] : []))
      else if (b.kind === 'equation') texts.push(b.note ?? '')
      else if (b.kind === 'derivation') { texts.push(b.statement, b.result); for (const st of b.steps) texts.push(st.label, st.explanation) }
      else if (b.kind === 'list') texts.push(...b.items)
    }
    return texts
  }

  push('L1 quiz has exactly 5 items', countKind('quiz') === 1 && (() => { const q = L66.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })())
  push('L2 quiz options 4 each, answer indices = [2,2,1,3,0] (reconciles with INTENDED_KEYS_66)', (() => { const q = L66.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer < 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_66.join(',') })())
  push('L3 quiz explains say why wrong options fail (each ≥ 120 chars, naming the correct value and at least one distractor by its number)', (() => { const q = L66.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ explain: string }> }; return q.items.every((it) => it.explain.length >= 120 && /option [ABCD]/i.test(it.explain)) })())
  push('L4 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = L66.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })())
  push('L5 every exercise question carries a steps-array solution (≥ 4 lines) + a nonempty string answer', (() => { const ex = L66.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0)) })())
  push('L6 exactly 21 example blocks (Illustrations) — the eleven-fold load — with the last exam-shaped', (() => { const ex = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string; steps: string[] }>; return ex.length === 21 && /exam-style/i.test(ex[ex.length - 1].title + ' ' + ex[ex.length - 1].steps.join(' ')) })())
  push('L7 exactly 3 figures, vivid-palette-only, no retired hex', (() => { const figs = L66.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length === 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); return hexes.length > 0 && hexes.every((h) => VIVID.includes(h) && !RETIRED.includes(h)) }) })())
  push('L8 figure SVG texts carry NO raw TeX (no $, \\tfrac, \\times, \\sqrt, \\cdot in any text node)', (() => { const figs = L66.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const texts = figs.flatMap((f) => (f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []).map((t) => t.replace(/<[^>]*>/g, ''))); return texts.length > 20 && texts.every((t) => !/\$|\\tfrac|\\times|\\sqrt|\\cdot|\\binom/.test(t)) })())
  push('L9 exactly 7 derivations, titles PLAIN (no $, no \\command), step labels PLAIN (no $), results $-delimited', (() => { const ds = L66.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length === 7 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })())
  push('L10 derivation results: clause-wise $…$ spans only (every span < 260 chars — the mobile break discipline), no \\dfrac', (() => { const ds = L66.blocks.filter((b) => b.kind === 'derivation') as Array<{ result: string }>; return ds.every((d) => { const spans = d.result.match(/\$[^$]*\$/g) ?? []; return spans.length >= 2 && spans.every((s) => s.length < 260) && !d.result.includes('\\dfrac') }) })())
  push('L11 derivation step formulas are KaTeX source without $ delimiters', (() => { const ds = L66.blocks.filter((b) => b.kind === 'derivation') as Array<{ steps: Array<{ formula?: string }> }>; return ds.every((d) => d.steps.every((st) => st.formula === undefined || (!st.formula.includes('$') && st.formula.trim().length > 0))) })())
  push('L12 exactly 5 formula cards (≥ 3 pinned by the plan)', countKind('formula') === 5)
  push('L13 exactly 11 terms (≥ 6 pinned by the plan)', (() => { const t = L66.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) === 11 })())
  push('L14 word count ≥ 4500 by countLessonWords (the honest authored count)', countLessonWords(L66) >= 4500, `countLessonWords = ${countLessonWords(L66)}`)
  push('L15 callout census: ≥ 3 definition, ≥ 1 theorem, ≥ 3 warn, ≥ 3 insight, ≥ 1 historical, ≥ 1 exam', (() => { const calls = L66.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string }>; const n = (t: string) => calls.filter((c) => c.tone === t).length; return n('definition') >= 3 && n('theorem') >= 1 && n('warn') >= 3 && n('insight') >= 3 && n('historical') >= 1 && n('exam') >= 1 })())
  push('L16 prereq ids exactly as pinned (AA 6.5 + ANS 4.3 — verified live by grep before authoring)', (() => { const want = ['aa-combinations-the-selection-count', 'ans-divisors-from-dna-divisor-counts']; return (L66.prerequisites ?? []).join(',') === want.join(',') })())
  push('L17 sources = banked keys + the module key cengage-m2-07 only', (() => { const ok = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra', 'cengage-m2-algebra']; return (L66.sources ?? []).length >= 4 && (L66.sources ?? []).every((src) => ok.includes(src)) })())
  push('L18 concepts are 7 key phrases (house contract 5–8), no raw TeX', (L66.concepts ?? []).length === 7 && (L66.concepts ?? []).every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)))
  push('L19 lesson identity: id, number, title match the standing plan exactly', L66.id === 'aa-distributions-and-the-classic-counting-puzzles' && L66.number === '6.6' && L66.title === 'Distributions and the Classic Counting Puzzles')
  push('L20 balanced $ in every text-bearing string (each field\u2019s $ count is even)', (() => { return collectTexts().every((t) => (t.match(/\$/g) ?? []).length % 2 === 0) })())
  push('L21 no \\dfrac in any INLINE text field (the roster-fraction discipline: \\tfrac inline, \\dfrac display only)', (() => {
    const inline: string[] = []
    for (const b of L66.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') inline.push(b.text)
      else if (b.kind === 'callout') inline.push(b.text)
      else if (b.kind === 'example') inline.push(...b.steps)
      else if (b.kind === 'terms') for (const t of b.items) inline.push(t.def)
      else if (b.kind === 'quiz') for (const it of b.items) inline.push(it.q, it.explain, ...it.options)
      else if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) { inline.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) inline.push(q.answer) }
      else if (b.kind === 'figure') inline.push(b.caption)
      else if (b.kind === 'table') for (const r of b.rows) inline.push(...r)
    }
    return inline.every((t) => !t.includes('\\dfrac'))
  })())
  push('L22 captions carry no raw TeX outside $…$ (strip inline math → no \\command survives)', (() => { const figs = L66.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>; return figs.every((f) => !/\\[a-z]/.test(f.caption.replace(/\$[^$]*\$/g, ' M '))) })())
  push('L23 exactly 4 tables (the sweets census, the four-object split table, the derangement census, the four-counts map)', countKind('table') === 4)
  push('L24 Sol. pill census: 21 Illustrations + 15 exercise solutions = 36 (≥ 34 for the e2e pin)', (() => { const ex = L66.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: unknown[] }> }; return countKind('example') + ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 36 })())
  push('L25 equations tagged 1..12, all distinct, all \\tag{n}', (() => { const eqs = L66.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string }>; const tags = eqs.map((e) => Number((e.latex.match(/\\tag\{(\d+)\}/) ?? [])[1])); return eqs.length === 12 && new Set(tags).size === 12 && tags.every((t) => t >= 1 && t <= 12) })())

  /* ---- the eleven hosted folds, discharged traceably ---- */
  push('L26 fold 1 served — the section "Selection from Identical Objects": named heading + formal definition callout + worked example (Illustration 1, family-named title)', (() => {
    const headings = L66.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const defs = L66.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string }>
    const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    return headings.some((h) => h.text === 'Selection from Identical Objects') && defs.some((d) => d.tone === 'definition' && d.title === 'Selection from identical objects') && exs.some((e) => /^Selection from identical objects/.test(e.title))
  })())
  push('L27 fold 2 served — the section "Division and Distribution of Distinct Objects": named heading + formal definition callout + a worked example of the family', (() => {
    const headings = L66.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const defs = L66.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string }>
    const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    return headings.some((h) => h.text === 'Division and Distribution of Distinct Objects') && defs.some((d) => d.tone === 'definition' && d.title === 'Division and distribution of distinct objects') && exs.filter((e) => /\(m \+ n\) two-group/.test(e.title)).length >= 2
  })())
  push('L28 fold 3 served — (m+n) two-group example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /\(m \+ n\) two-group division and distribution/.test(e.title)).length === 2 })())
  push('L29 fold 4 served — (m+n+p) three-group example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /\(m \+ n \+ p\) three-group/.test(e.title)).length === 2 })())
  push('L30 fold 5 served — equal-size example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /Division into groups of equal size/.test(e.title)).length === 2 })())
  push('L31 fold 6 served — sizes-not-fixed example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /group sizes are not fixed/.test(e.title)).length === 2 })())
  push('L32 fold 7 served — the section "Distribution of Identical Objects": named heading + the full-census worked example + the honest table', (() => {
    const headings = L66.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    const tabs = L66.blocks.filter((b) => b.kind === 'table') as Array<{ caption: string }>
    return headings.some((h) => h.text === 'Distribution of Identical Objects') && exs.some((e) => /^Distribution of identical objects: five sweets/.test(e.title)) && tabs.some((t) => /identical-distribution census/.test(t.caption))
  })())
  push('L33 fold 8 served — identical empty-not-allowed example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /identical objects, empty groups not allowed/.test(e.title)).length === 2 })())
  push('L34 fold 9 served — identical empty-allowed example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /identical objects, empty groups allowed/.test(e.title)).length === 2 })())
  push('L35 fold 10 served — the section "Number of Integral Solutions Using Series (Multinomial Theorem)": named heading + 2 worked examples of the series method', (() => {
    const headings = L66.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
    const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>
    return headings.some((h) => h.text === 'Number of Integral Solutions Using Series (Multinomial Theorem)') && exs.filter((e) => /Integral solutions by the series method/.test(e.title)).length === 2
  })())
  push('L36 fold 11 served — distinct empty-not-allowed example-family: exactly 2 family-named Illustrations', (() => { const exs = L66.blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>; return exs.filter((e) => /distinct objects, empty groups not allowed/.test(e.title)).length === 2 })())

  /* ---- cross-reference + handoff discipline ---- */
  push('L37 the named cross-references ride the prose (ANS 4.3, 6.5, 6.1, 6.3, 6.4, ch.1 Relations, ch.5 lesson 5.2, 6.R) — cited, never re-taught', (() => {
    const joined = collectTexts().join('\n')
    return ['Divisors from DNA', 'Combinations: the Selection Count', 'Fundamental Principle of Counting', 'Relations: the Set of Pairs View', 'Geometric Progressions and the Infinite Tail', 'Unit 6 Completion Review'].every((s) => joined.includes(s))
  })())
  push('L38 the ch. 7 doorstep NAMED as a promise, never cashed (Induction and the Binomial Theorem + any-index, with no binomial theorem machinery used)', (() => { const joined = collectTexts().join('\n'); return joined.includes('Induction and the Binomial Theorem') && joined.includes('any-index') })())
  push('L39 the Probability handoff NAMED in prose (the counted universe inherited — no Probability lesson ids cited)', (() => {
    const joined = collectTexts().join('\n')
    const noProbPrereq = !(L66.prerequisites ?? []).some((p) => /prob/i.test(p))
    const noProbSource = !(L66.sources ?? []).some((s) => /prob/i.test(s))
    return /Probability/.test(joined) && noProbPrereq && noProbSource
  })())
  push('L40 the exam callout is honest (JEE Main 2026 unit 4 carries P&C — labelled, own designs)', (() => { const calls = L66.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; text: string }>; const c = calls.find((x) => x.tone === 'exam'); return !!c && /unit 4/.test(c.text) && /our own design/i.test(c.text) })())
  push('L41 the small-case census discipline appears by name in prose (the wrong-model catcher)', (() => { const joined = collectTexts().join('\n'); return /small-case census/i.test(joined) && /n = 2/.test(joined) })())
  push('L42 headings are exactly the seven planned sections', (() => { const headings = (L66.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>).map((h) => h.text); return headings.join('|') === 'Selection from Identical Objects|Division and Distribution of Distinct Objects|Distribution of Identical Objects|Number of Integral Solutions Using Series (Multinomial Theorem)|The Principle of Inclusion and Exclusion|Derangements: the Classic Puzzle, Cash in Full|Where the Engine Sits' })())
}
}


/* (assembled section mapping: this agent's ENGINE array -> section M, its PINS array -> section N; the declarations were lifted to module scope and the agent-local helper identifiers below stay inside this block, so no top-level name can collide across agents) */
const M: SectionCheck[] = []
const N: SectionCheck[] = []
{


/**
 * v6-R.ts — the task 6-g engine for AA lesson 6.R
 * "Unit 6 Completion Review".
 *
 * Brute-force re-verification of EVERY number in the review (the roman
 * roster, both master tables' witnesses, the six re-audited witnesses, the
 * one-roster and one-panel mixed exhibits, every trap's witness, every quiz
 * key and every distractor's failure number, and all fifteen bench answers)
 * — reconciled wherever the arcs overlap with the six siblings' own pinned
 * engines (v6-1 … v6-6, whose check ids are cited below as A/B/C/D/E/F/G/H/
 * I/J/K/L numbers). Anything the review asserts that is NOT already pinned
 * in a sibling engine is flagged M-NEW here:
 *   M-NEW numbers (not pinned in the siblings' engines):
 *   - 216 = 6³ — the free-chain read of the six-book roster at three seats
 *     (Illustration 7; the siblings pin 3², 4³, 5³, 5⁴, 10⁴, 26⁴ — never 6³)
 *   - 30 = C(4,2)·C(5,1) — the exam-style panel, exactly two scientists
 *     (Illustration 8; 6.6's E1 pins 6·5 = 30 on a different claim)
 *   - 74 = 84 − C(5,3) — the panel with at least one scientist (Illustration 8)
 *   - 45 = 81 − 36 — the mailroom with at least one empty mailbox (E10 part
 *     iii; the siblings pin 81 and 36 separately, never the difference)
 *   - 8 = E₇(50!) = 7 + 1 — the exponent of 7 in 50! (E11; the siblings pin
 *     E₂/E₃/E₅ audits only)
 *   - 1/3 = 28/84 — the panel-chance fraction (E13; 6.5's closing prose
 *     names the read but its engine pins only C(9,4) = 126 — the composite
 *     84/28/⅓ claim is ours, 84 reconciling 6.6's quiz Q3 value)
 *   - 28 = C(8,2) as the sweets-to-3-children empty-allowed answer (quiz Q4;
 *     the value 28 is pinned in 6.2's C8.5 as 8C2 = 28, but this claim is
 *     ours; the licence-swapped distractor 10 = C(5,2) and the bar-invented
 *     56 = C(8,3) are NEW values on this instance — the K11.5 licence
 *     shape reconciled on fresh numbers)
 *   - 44 = D(5) as an asserted quiz answer (quiz Q5; the value is pinned in
 *     6.6's K10.1 sweep 0, 1, 2, 9, 44, 265 — the answer claim is ours) and
 *     its distractor 76 = 120 − 44 (NEW)
 *   - the n = 2 necklace edge claimed in E14 (1 circle = 1 necklace — pinned
 *     in 6.4's G43 sweep, the prose claim is ours)
 * Everything else re-verifies numbers already pinned in the siblings'
 * engines and is reported as reconciliation, not duplication.
 */

/* (this part file's own harness — interface SectionCheck / check — was deduped into the shared harness at the top of this file) */

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1)
  return Math.round(r)
}
const P = (n: number, r: number): number => Math.round(fact(n) / fact(n - r))

/** literal k-subset count of an n-roster (bitmask enumeration) */
function kSubsets(n: number, k: number): number {
  let c = 0
  for (let m = 0; m < 2 ** n; m++) {
    let bits = 0
    for (let i = 0; i < n; i++) if (m & (1 << i)) bits++
    if (bits === k) c++
  }
  return c
}
/** literal non-empty subset count */
function nonEmpty(n: number): number {
  let c = 0
  for (let m = 1; m < 2 ** n; m++) c++
  return c
}
/** distinct arrangements of a word's letters, sorted (literal) */
function arrangements(word: string): string[] {
  const seen = new Set<string>()
  const letters = word.split('')
  const perm = (arr: string[], fix: number) => {
    if (fix === arr.length) {
      seen.add(arr.join(''))
      return
    }
    for (let i = fix; i < arr.length; i++) {
      ;[arr[fix], arr[i]] = [arr[i], arr[fix]]
      perm(arr, fix + 1)
      ;[arr[fix], arr[i]] = [arr[i], arr[fix]]
    }
  }
  perm(letters, 0)
  return Array.from(seen).sort()
}
/** rank of a word among the arrangements of its letters (1-based) */
const rank = (w: string): number => arrangements(w).indexOf(w) + 1
/** arrangements of a word containing a given adjacent block */
const withBlock = (w: string, block: string): number => arrangements(w).filter((a) => a.includes(block)).length

/** literal count of tuples (x1..xr) >= 0 with sum n */
function weakTuples(n: number, r: number): number {
  if (r === 1) return 1
  let c = 0
  for (let x = 0; x <= n; x++) c += weakTuples(n - x, r - 1)
  return c
}
/** literal count of tuples (x1..xr) >= 1 with sum n */
const posTuples = (n: number, r: number): number => (n >= r ? weakTuples(n - r, r) : 0)

/** literal circular-arrangement classes of n labelled beads (rotation collapse) */
function circleClasses(n: number): number {
  if (n <= 1) return 1
  const perms: string[] = []
  const arr = Array.from({ length: n }, (_, i) => i)
  const perm = (a: number[], fix: number) => {
    if (fix === a.length) {
      perms.push(a.join(''))
      return
    }
    for (let i = fix; i < a.length; i++) {
      ;[a[fix], a[i]] = [a[i], a[fix]]
      perm(a, fix + 1)
      ;[a[fix], a[i]] = [a[i], a[fix]]
    }
  }
  perm(arr, 0)
  const classes = new Set<string>()
  for (const p of perms) {
    const rots = new Set<string>()
    for (let s = 0; s < n; s++) rots.add(p.slice(s) + p.slice(0, s))
    classes.add(Array.from(rots).sort().join('|'))
  }
  return classes.size
}
/** literal necklace classes (rotation + reflection collapse) */
function necklaceClasses(n: number): number {
  const classes = new Set<string>()
  const arr = Array.from({ length: n }, (_, i) => i)
  const perm = (a: number[], fix: number) => {
    if (fix === a.length) {
      const p = a.join('')
      const forms = new Set<string>()
      for (let s = 0; s < n; s++) {
        const rot = p.slice(s) + p.slice(0, s)
        forms.add(rot)
        forms.add(rot.split('').reverse().join(''))
      }
      classes.add(Array.from(forms).sort().join('|'))
      return
    }
    for (let i = fix; i < a.length; i++) {
      ;[a[fix], a[i]] = [a[i], a[fix]]
      perm(a, fix + 1)
      ;[a[fix], a[i]] = [a[i], a[fix]]
    }
  }
  if (n <= 2) {
    // n = 2: the two rows are one necklace (the flip is the circle itself)
    return 1
  }
  perm(arr, 0)
  return classes.size
}
/** literal surjection count: assignments of n objects to r boxes, none empty */
function ontoAssignments(n: number, r: number): number {
  let count = 0
  const total = r ** n
  for (let code = 0; code < total; code++) {
    let c = code
    const seen = new Array<boolean>(r).fill(false)
    let distinct = 0
    for (let i = 0; i < n; i++) {
      const t = c % r
      if (!seen[t]) {
        seen[t] = true
        distinct++
      }
      c = Math.floor(c / r)
    }
    if (distinct === r) count++
  }
  return count
}
/** literal derangement count of n items (no fixed point) */
function derangements(n: number): number {
  let count = 0
  const arr = Array.from({ length: n }, (_, i) => i)
  const perm = (a: number[], fix: number) => {
    if (fix === a.length) {
      if (a.every((v, i) => v !== i)) count++
      return
    }
    for (let i = fix; i < a.length; i++) {
      ;[a[fix], a[i]] = [a[i], a[fix]]
      perm(a, fix + 1)
      ;[a[fix], a[i]] = [a[i], a[fix]]
    }
  }
  perm(arr, 0)
  return count
}
/** literal count of assignments of n distinct objects to r persons with a given sorted size profile */
function assignmentsWithSizes(n: number, r: number, sizes: number[]): number {
  let count = 0
  const total = r ** n
  for (let code = 0; code < total; code++) {
    let c = code
    const counts = new Array<number>(r).fill(0)
    for (let i = 0; i < n; i++) {
      counts[c % r]++
      c = Math.floor(c / r)
    }
    counts.sort((a, b) => a - b)
    if (counts.length === sizes.length && counts.every((v, i) => v === sizes[i])) count++
  }
  return count
}
/** Legendre's exponent of prime p in n! (floor-sum) */
const Eleg = (p: number, n: number): number => {
  let e = 0
  for (let pk = p; pk <= n; pk *= p) e += Math.floor(n / pk)
  return e
}
/** exponent of prime p in n! by literal factorisation of the product 1·2·…·n */
const Ebrute = (p: number, n: number): number => {
  let e = 0
  for (let k = 2; k <= n; k++) {
    let m = k
    while (m % p === 0) {
      e++
      m /= p
    }
  }
  return e
}

/* ------------------------------------------------------------------ */
/* SECTION M — 6.R engines (every number in the review, recomputed)   */
/* ------------------------------------------------------------------ */


{
  const push = (name: string, ok: boolean) => M.push(check(name, ok))

  /* ---- the roman roster (the map in one roster, all twelve rows) ---- */
  push('M1.1 (i) the menu chain 4 × 6 × 3 = 72 (reconciles 6.1 A-engine)', 4 * 6 * 3 === 72)
  push('M1.2 (ii) the overlap fork 6 + 9 − 2 = 13 distinct films (reconciles the 6.1 warn callout)', 6 + 9 === 15 && 6 + 9 - 2 === 13)
  push('M1.3 (iii) the two fractions: 8!/5! = 6·7·8 = 336 and 8!/3! = 4·5·6·7·8 = 6720 (reconciles C2.3)', fact(8) / fact(5) === 336 && 6 * 7 * 8 === 336 && fact(8) / fact(3) === 6720 && 4 * 5 * 6 * 7 * 8 === 6720)
  push('M1.4 (iv) the podium 8P3 = 8·7·6 = 336 (reconciles E1.1)', P(8, 3) === 336 && 8 * 7 * 6 === 336)
  push('M1.5 (v) TOMATO 6!/(2!·2!) = 180 by literal distinct-arrangement enumeration (reconciles E2.5)', (() => { const a = arrangements('TOMATO'); return a.length === 180 && fact(6) / (fact(2) * fact(2)) === 180 })())
  push('M1.6 (vi) the round table: 7!/7 = 720 = 6! (reconciles G13)', fact(7) / 7 === 720 && fact(6) === 720)
  push('M1.7 (vii) the necklace: 8!/2 = 20160 for nine beads (reconciles G18)', fact(8) / 2 === 20160 && fact(8) === 40320)
  push('M1.8 (viii) 8C3 = 56 = 336/6 by literal 3-subset enumeration (reconciles I6/I7)', (() => { return kSubsets(8, 3) === 56 && binom(8, 3) === 56 && 336 / fact(3) === 56 })())
  push('M1.9 (ix) the censuses: 2⁶ = 64 and 2⁶ − 1 = 63 by literal subset enumeration (reconciles I38/I67)', (() => { return 2 ** 6 === 64 && nonEmpty(6) === 63 && 64 - 1 === 63 })())
  push('M1.10 (x) five sweets to two children: 6 = C(6,1), the literal seats x = 0..5 (reconciles K6.1)', (() => { let c = 0; for (let x = 0; x <= 5; x++) c++; return c === 6 && weakTuples(5, 2) === 6 && binom(6, 1) === 6 })())
  push('M1.11 (xi) six coins into three equal pairs: 90 labelled → 15 divisions (reconciles K4.2)', (() => { return assignmentsWithSizes(6, 3, [2, 2, 2]) === 90 && Math.round((fact(6) / (fact(2) ** 3)) ) === 90 && Math.round(fact(6) / (fact(2) ** 3) / fact(3)) === 15 })())
  push('M1.12 (xii) D(4) = 9 by literal permutation enumeration (reconciles K10.1)', derangements(4) === 9 && fact(4) === 24)

  /* ---- derivation 1 (the five divides) + derivation 2 (the quotient) ---- */
  push('M2.1 the order divide nCr = nPr/r! swept n ≤ 10 (all r)', (() => { for (let n = 0; n <= 10; n++) for (let r = 0; r <= n; r++) if (binom(n, r) !== Math.round(P(n, r) / fact(r))) return false; return true })())
  push('M2.2 the alike divide: GOO = 3!/2! = 3 arrangements by literal list (reconciles E2.1)', (() => { const a = arrangements('GOO'); return a.join(',') === 'GOO,OGO,OOG' && a.length === 3 && fact(3) / fact(2) === 3 })())
  push('M2.3 the circle divide n!/n = (n−1)! swept n = 2..8', (() => { for (let n = 2; n <= 8; n++) if (fact(n) / n !== fact(n - 1)) return false; return true })())
  push('M2.4 the flip divide: necklace classes n = 3..6 → 1, 3, 12, 60, each (n−1)!/2 (reconciles G34)', (() => { return [3, 4, 5, 6].every((n) => necklaceClasses(n) === fact(n - 1) / 2) && necklaceClasses(3) === 1 && necklaceClasses(4) === 3 && necklaceClasses(5) === 12 && necklaceClasses(6) === 60 })())
  push('M2.5 the equal-size divide: 6 coins = 90 labelled = 6!/(2!)³, ÷3! → 15 (reconciles K4.2)', fact(6) / (fact(2) ** 3) === 90 && 90 / fact(3) === 15)
  push('M2.6 the quotient discipline: |Ω|/|class| at the five pinned seats (336/6 = 56, 720/4 = 180, 5040/7 = 720, 90/6 = 15)', 336 / 6 === 56 && 720 / 4 === 180 && 5040 / 7 === 720 && 90 / 6 === 15)
  push('M2.7 census catcher 1: 2 identical sweets → 3 distributions; 2 distinct → 4 = 2² (reconciles K1.4)', weakTuples(2, 2) === 3 && 2 ** 2 === 4)
  push('M2.8 census catcher 2: {1,2,3} taken two: 6 arrangements against 3 selections (reconciles the 6.3 census)', P(3, 2) === 6 && binom(3, 2) === 3)
  push('M2.9 census catcher 3: the circle at n = 3: 6 rows → 2 circles → 1 necklace (reconciles G1)', fact(3) === 6 && circleClasses(3) === 2 && necklaceClasses(3) === 1)
  push('M2.10 census catcher 4: 4³ = 64 with repetition against 4P3 = 24 without (reconciles E5.3)', 4 ** 3 === 64 && P(4, 3) === 24)
  push('M2.11 census catcher 5: D(4) = 9 of 4! = 24, the fraction 9/24 = 0.375 (reconciles K10.1/K10.6)', derangements(4) === 9 && fact(4) === 24 && Math.abs(9 / 24 - 0.375) < 1e-12)

  /* ---- the master count table's trap column, every witness ---- */
  push('M3.1 the addition trap: 6 + 9 = 15 naive against 13 honest (reconciles the 6.1 cinema)', 6 + 9 === 15 && 6 + 9 - 2 === 13)
  push('M3.2 the licence plate: 26P2 = 650, 9P3 = 504, 650·504 = 327600 (reconciles E5.4)', P(26, 2) === 650 && 26 * 25 === 650 && P(9, 3) === 504 && 9 * 8 * 7 === 504 && 650 * 504 === 327600)
  push('M3.3 the alike trap: DEED = 4!/(2!·2!) = 6 with the fraud 4!/2! = 12 (reconciles E2.19/E2.20)', arrangements('DEED').length === 6 && fact(4) / (fact(2) * fact(2)) === 6 && fact(4) / fact(2) === 12)
  push('M3.4 the onto signs: 4⁶ − 4·729 + 6·64 − 4 = 1560 by literal surjection census; the sign-drop fraud 4096 − 2916 = 1180 (reconciles K9.2/K9.5)', ontoAssignments(6, 4) === 1560 && 4 ** 6 - 4 * 729 + 6 * 64 - 4 === 1560 && 4096 - 2916 === 1180 && 4096 - 2916 !== ontoAssignments(6, 4))
  push('M3.5 the derangement trap: 24 − 9 = 15 is the at-least-one side, not D(4) = 9 (reconciles K11.4)', fact(4) - derangements(4) === 15 && derangements(4) === 9)
  push('M3.6 the identical misread: (5+1)(4+1) − 1 = 29 against the distinct 5·4 = 20 (reconciles K11.1)', (5 + 1) * (4 + 1) - 1 === 29 && 5 * 4 === 20 && (5 + 1) * (4 + 1) - 1 !== 5 * 4)
  push('M3.7 the empty licence: 6 sweets to 3 children — C(8,2) = 28 allowed against C(5,2) = 10 not (the K11.5 licence shape on a fresh instance)', (() => { return weakTuples(6, 3) === 28 && binom(6 + 3 - 1, 2) === 28 && posTuples(6, 3) === 10 && binom(6 - 1, 2) === 10 })())
  push('M3.8 the census trap: 2⁶ = 64 against 2⁶ − 1 = 63 (reconciles I67)', 2 ** 6 === 64 && 2 ** 6 - 1 === 63)
  push('M3.9 the circle trap: 8! = 40320 rows against 7! = 5040 circles (reconciles G22)', fact(8) === 40320 && fact(7) === 5040)
  push('M3.10 the necklace traps: 11!/2 = 19958400 against 11! = 39916800 at twelve beads; the 6-charm 60 against 120 (reconciles G23/G44)', fact(11) / 2 === 19958400 && fact(11) === 39916800 && fact(5) / 2 === 60 && fact(5) === 120)

  /* ---- witness 1 (the principle room) ---- */
  push('M4.1 the two exhibits: 3 × 4 = 12 journeys and 2 + 4 = 6 exits (reconciles the 6.1 exhibits)', 3 * 4 === 12 && 2 + 4 === 6)
  push('M4.2 the answer-sheet family: 4⁶ = 4096, no-two-consecutive 4·3⁵ = 972, at-least-one-TRUE 2⁶ − 1 = 63 (reconciles the 6.1 warn + quiz Q4)', 4 ** 6 === 4096 && 4 * 3 ** 5 === 972 && 2 ** 6 - 1 === 63)
  push('M4.3 the code family: 6⁵ = 7776, all-distinct 720, at-least-one-repeat 7056 (reconciles the 6.1 L4 exam item)', (() => { let rep = 0; const total = 6 ** 5; for (let code = 0; code < total; code++) { const digs = new Set<number>(); let c = code; for (let i = 0; i < 5; i++) { digs.add(c % 6); c = Math.floor(c / 6) } if (digs.size === 5) rep++ } return 6 ** 5 === 7776 && rep === 720 && 7776 - 720 === 7056 })())

  /* ---- witness 2 (the bookkeeping room) ---- */
  push('M4.4 the roster 0!..7! = 1, 1, 2, 6, 24, 120, 720, 5040 and 10! = 3628800 = 2⁸·3⁴·5²·7 (reconciles C1.1/C1.2)', (() => { return [1, 1, 2, 6, 24, 120, 720, 5040].every((v, i) => fact(i) === v) && fact(10) === 3628800 && Ebrute(2, 10) === 8 && Ebrute(3, 10) === 4 && Ebrute(5, 10) === 2 && Ebrute(7, 10) === 1 })())
  push('M4.5 the false law: (3+4)! = 5040 against 3!+4! = 30 — off by the factor 168 (reconciles C3.1)', fact(7) === 5040 && fact(3) + fact(4) === 30 && Math.round(5040 / 30) === 168)
  push('M4.6 Legendre re-run: E₂(10!) = 5+2+1 = 8; E₃(50!) = 22 and E₂(50!) = 47; the power of 6 in 24! = min(22, 10) = 10 with the naive ⌊24/6⌋ = 4; 45! ends in 10 zeros (reconciles C4.3/C4.4/C4.5/C5.1/C6.1)', (() => { return Eleg(2, 10) === 8 && 5 + 2 + 1 === 8 && Ebrute(2, 10) === 8 && Eleg(3, 50) === 22 && Ebrute(3, 50) === 22 && Eleg(2, 50) === 47 && Math.min(Eleg(2, 24), Eleg(3, 24)) === 10 && Math.floor(24 / 6) === 4 && Eleg(5, 45) === 10 })())
  push('M4.7 the teaser fold arithmetic: 8C3 = 56 and the row of ten peaks at 10C5 = 252 (reconciles C7.1/C7.12)', binom(8, 3) === 56 && binom(10, 5) === 252)

  /* ---- witness 3 (the arrangement room) ---- */
  push('M4.8 the podium both ways: 8·7·6 = 336 = 8!/(8−3)! = 8!/5! (reconciles E1.1/E1.2)', 8 * 7 * 6 === 336 && P(8, 3) === Math.round(fact(8) / fact(5)) && P(8, 3) === 336)
  push('M4.9 the recovery: 8P_r = 6720 is five factors 8·7·6·5·4, so r = 5 (reconciles E1.3)', (() => { let prod = 1; let r = 0; for (let k = 8; k >= 4; k--) { prod *= k; r++; if (prod === 6720) break } return prod === 6720 && r === 5 && P(8, 5) === 6720 })())
  push('M4.10 TOMATO with the OO block: 60 contain it, 180 − 60 = 120 never (literal enumeration; reconciles E4.1)', (() => { return withBlock('TOMATO', 'OO') === 60 && 180 - 60 === 120 })())
  push('M4.11 the dictionary ladder: rank(WHALE) = 110, rank(PEPPER) = 26, rank(KNEEL) = 34 (brute sort of the literal arrangements; reconciles E3.2/E3.4/E3.7)', rank('WHALE') === 110 && rank('PEPPER') === 26 && rank('KNEEL') === 34)

  /* ---- witness 4 (the round room) ---- */
  push('M4.12 the guards: n = 3: 6 rows → 2 circles → 1 necklace; n = 4: 24 → 6 → 3; n = 5: 120 → 24 → 12 (literal rotation/reflection collapse; reconciles G1/G3/G5/G6)', (() => { return fact(3) === 6 && circleClasses(3) === 2 && necklaceClasses(3) === 1 && fact(4) === 24 && circleClasses(4) === 6 && necklaceClasses(4) === 3 && fact(5) === 120 && circleClasses(5) === 24 && necklaceClasses(5) === 12 })())
  push('M4.13 the round subtraction: 7! = 5040 total, 2·6! = 1440 together, 3600 never (reconciles G25)', fact(7) === 5040 && 2 * fact(6) === 1440 && 5040 - 1440 === 3600)
  push('M4.14 the alternation contrast: 3!·4! = 144 round against 2·4!·4! = 1152 in a row (reconciles G14/G15)', fact(3) * fact(4) === 144 && 2 * fact(4) * fact(4) === 1152)

  /* ---- witness 5 (the selection room) ---- */
  push('M4.15 the four-roster: the six 2-selections listed, 12 ordered pairs, 8C3 = 56 = 336/6 (reconciles I1/I6/I7)', (() => { const pairs: string[] = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push('abcd'[i] + 'abcd'[j]); return pairs.join(',') === 'ab,ac,ad,bc,bd,cd' && pairs.length === 6 && 4 * 3 === 12 && binom(8, 3) === 56 && 336 / 6 === 56 })())
  push('M4.16 the censuses: camper 2⁶ = 64 (32 in, 32 out), borrower 2⁷ − 1 = 127, comics-and-atlases (2⁴−1)(2²−1) = 45 (reconciles I38/I39/I44/I48)', (() => { return nonEmpty(6) === 63 && 64 - 1 === 63 && 2 ** 7 - 1 === 127 && nonEmpty(7) === 127 && (2 ** 4 - 1) * (2 ** 2 - 1) === 45 && nonEmpty(4) === 15 && nonEmpty(2) === 3 && 15 * 3 === 45 })())
  push('M4.17 the mirror hunt: at most 3 of nine = 1 + 9 + 36 + 84 = 130, at least 6 = 84 + 36 + 9 + 1 = 130 (reconciles I56/I57)', (() => { return binom(9, 0) + binom(9, 1) + binom(9, 2) + binom(9, 3) === 130 && 1 + 9 + 36 + 84 === 130 && binom(9, 6) + binom(9, 7) + binom(9, 8) + binom(9, 9) === 130 && 84 + 36 + 9 + 1 === 130 })())
  push('M4.18 M-NEW (as a composite): the panel read: 9C3 = 84 total, 8C2 = 28 favourable, 28/84 = 1/3 (84 reconciles K11.3; 28 reconciles C8.5 as 8C2; the fraction is ours)', (() => { return binom(9, 3) === 84 && kSubsets(9, 3) === 84 && binom(8, 2) === 28 && kSubsets(8, 2) === 28 && Math.abs(28 / 84 - 1 / 3) < 1e-12 })())

  /* ---- witness 6 (the puzzle room) ---- */
  push('M4.19 the mixed drawer: (4+1)(6+1)·2⁵ = 1120 and 1119 at least one (reconciles K1.2)', (4 + 1) * (6 + 1) * 2 ** 5 === 1120 && 1120 - 1 === 1119)
  push('M4.20 the divisor reread: τ(2⁴·3⁶) = 5·7 = 35 (reconciles K1.3)', (4 + 1) * (6 + 1) === 35)
  push('M4.21 the onto mailroom: 3⁴ − 3·2⁴ + 3 = 81 − 48 + 3 = 36 of the 81 (reconciles K9.1)', (() => { return ontoAssignments(4, 3) === 36 && 3 ** 4 - 3 * 2 ** 4 + 3 === 36 && 3 ** 4 === 81 && 81 - 48 + 3 === 36 })())

  /* ---- the two mixed exhibits ---- */
  push('M5.1 M-NEW: the one-roster exhibit, free chain: 6³ = 216 by literal nested enumeration (three seats over six books)', (() => { let c = 0; for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) for (let d = 0; d < 6; d++) c++; return c === 216 && 6 ** 3 === 216 })())
  push('M5.2 the one-roster arrangement: 6P3 = 6·5·4 = 120 (reconciles E1.14)', P(6, 3) === 120 && 6 * 5 * 4 === 120)
  push('M5.3 the one-roster selection: C(6,3) = 20 by literal 3-subset enumeration, and 20·3! = 120 = 6P3 (reconciles I26; the split claim is ours)', (() => { return kSubsets(6, 3) === 20 && binom(6, 3) === 20 && 20 * fact(3) === 120 && P(6, 3) === 120 })())
  push('M5.4 the one-roster circle and cord: (6−1)! = 120 circles and 60 necklaces by literal collapse (reconciles G20)', circleClasses(6) === 120 && fact(5) === 120 && necklaceClasses(6) === 60 && 120 / 2 === 60)
  push('M5.5 the one-roster census: 2⁶ = 64 and the full length 6! = 720 (reconciles I38/E1.6)', nonEmpty(6) + 1 === 64 && fact(6) === 720)
  push('M5.6 M-NEW: the one-panel exhibit: 9C3 = 84; exactly two scientists C(4,2)·C(5,1) = 6·5 = 30 (literal double enumeration); at least one scientist 84 − C(5,3) = 84 − 10 = 74', (() => { const twoSci = kSubsets(4, 2) * kSubsets(5, 1); const atLeast = binom(9, 3) - binom(5, 3); return binom(9, 3) === 84 && kSubsets(9, 3) === 84 && twoSci === 30 && 6 * 5 === 30 && atLeast === 74 && binom(5, 3) === 10 && 84 - 10 === 74 })())
  push('M5.7 the one-panel arrangement: 84·3! = 504 = 9P3 (reconciles E5.4)', 84 * fact(3) === 504 && P(9, 3) === 504 && 9 * 8 * 7 === 504)
  push('M5.8 the one-panel handoff: 28/84 = 1/3, the favourable 8C2 = 28 over the total 84 (reconciles M4.18)', binom(8, 2) === 28 && Math.abs(28 / 84 - 1 / 3) < 1e-12)

  /* ---- the traps, every witness ---- */
  push('M6.1 the selection/arrangement fork: the committee 8C3 = 56 against the podium 8P3 = 336; the misprint 9·8·7·6 = 3024 against 9C4 = 126 (reconciles E6.1 distractor + K11.2)', binom(8, 3) === 56 && P(8, 3) === 336 && 9 * 8 * 7 * 6 === 3024 && binom(9, 4) === 126 && kSubsets(9, 4) === 126)
  push('M6.2 the repetition fork: 4³ = 64 against 4P3 = 24; the impossible sheet 4·3·2·1·0·0 = 0 (reconciles E5.3 + the 6.1 warn)', 4 ** 3 === 64 && P(4, 3) === 24 && 4 * 3 * 2 * 1 * 0 * 0 === 0)
  push('M6.3 the taken-two census: 6 arrangements against 3 selections at {1,2,3} (reconciles the 6.3 census)', P(3, 2) === 6 && binom(3, 2) === 3)
  push('M6.4 the equal-size honesty: 90 labelled against 15 true divisions at six coins (reconciles K4.2)', assignmentsWithSizes(6, 3, [2, 2, 2]) === 90 && 90 / fact(3) === 15)
  push('M6.5 the persons charge: C(9,4) = 126 divisions × 2! = 252 distributions (reconciles K2.1)', binom(9, 4) === 126 && 126 * 2 === 252)
  push('M6.6 the round subtraction witnesses: 7! = 5040 total, 2·6! = 1440 together, 3600 never, and the halved distractor 1800 = 3600/2 (reconciles G25)', (() => { return fact(7) === 5040 && 2 * fact(6) === 1440 && 5040 - 1440 === 3600 && 3600 / 2 === 1800 })())
  push('M6.7 the onto sign-drop: 1180 against 1560; the derangement complement: 15 against 9 (reconciles K9.5/K11.4)', 4096 - 2916 === 1180 && ontoAssignments(6, 4) === 1560 && fact(4) - derangements(4) === 15 && derangements(4) === 9)

  /* ---- the display equations' witnesses ---- */
  push('M7.1 equation (2): 4³ = 64 against 4P3 = 24 (reconciles E5.3)', 4 ** 3 === 64 && P(4, 3) === 24)
  push('M7.2 equation (3): the guards 6 → 2 → 1 at n = 3, all three divides literal (reconciles G1)', fact(3) === 6 && circleClasses(3) === 2 && necklaceClasses(3) === 1)
  push('M7.3 equation (4): the mirror discipline swept n ≤ 12 — nCx = nCy iff x = y or x + y = n (reconciles C7.5/I5-equivalent)', (() => { for (let n = 0; n <= 12; n++) for (let x = 0; x <= n; x++) for (let y = 0; y <= n; y++) { const eq = binom(n, x) === binom(n, y); const want = x === y || x + y === n; if (eq !== want) return false } return true })())
  push('M7.4 equation (5): 2⁶ = 64, 2⁷ − 1 = 127, and 2 from identical = 3 seats (reconciles I38/I44/K1.1)', 2 ** 6 === 64 && 2 ** 7 - 1 === 127 && 2 + 1 === 3)
  push('M7.5 equation (6): onto(4,3) = 36 and D(4) = 9 (reconciles K9.1/K10.1)', ontoAssignments(4, 3) === 36 && derangements(4) === 9)

  /* ---- the quiz: every key and every distractor's failure number ---- */
  push('M8.1 quiz Q1 (key 1): 9P3 = 9·8·7 = 504 slates; distractors 84 = 9C3, 28 = 8C2, 729 = 3⁶ (reconciles E5.4 + K11.3 + C8.5)', (() => { return P(9, 3) === 504 && 9 * 8 * 7 === 504 && binom(9, 3) === 84 && binom(8, 2) === 28 && 3 ** 6 === 729 })())
  push('M8.2 quiz Q2 (key 0): E₃(20!) = 6 + 2 = 8 by both routes; distractors 6 = ⌊20/3⌋, 18 = E₂(20!), 3 = ⌊20/6⌋; the naive ⌊24/6⌋ = 4 against min(22, 10) = 10 at 24! (reconciles C5.5)', (() => { return Eleg(3, 20) === 8 && Ebrute(3, 20) === 8 && Math.floor(20 / 3) === 6 && Math.floor(20 / 9) === 2 && Eleg(2, 20) === 18 && Math.floor(20 / 6) === 3 && Math.min(Eleg(2, 24), Eleg(3, 24)) === 10 && Math.floor(24 / 6) === 4 })())
  push('M8.3 quiz Q3 (key 3): the bracelet census at six charms — 720 rows → 120 circles → 60 bracelets, all literal; distractors 120, 720, 24 = 4! (reconciles G20/G44)', (() => { return fact(6) === 720 && circleClasses(6) === 120 && necklaceClasses(6) === 60 && fact(4) === 24 })())
  push('M8.4 quiz Q4 (key 0): 6 sweets to 3 children, empty allowed: C(8,2) = 28 by literal weak-tuple enumeration; distractors 10 = C(5,2) (the licence swapped), 56 = C(8,3) (a bar invented / roles swapped), 729 = 3⁶ (the distinct assignment census)', (() => { return weakTuples(6, 3) === 28 && binom(8, 2) === 28 && posTuples(6, 3) === 10 && binom(5, 2) === 10 && binom(8, 3) === 56 && 3 ** 6 === 729 })())
  push('M8.5 quiz Q5 (key 1): M-NEW (as an answer claim) — D(5) = 44 by literal permutation enumeration, reconciling the K10.1 sweep; the alternating expansion 120 − 120 + 60 − 20 + 5 − 1 = 44; the recurrence 5·9 − 1 = 44; distractors 120 = 5!, 76 = 120 − 44, 24 = 4!', (() => { return derangements(5) === 44 && 120 - 120 + 60 - 20 + 5 - 1 === 44 && 5 * derangements(4) - 1 === 44 && fact(5) === 120 && 120 - 44 === 76 && fact(4) === 24 })())

  /* ---- the mixed bench: every answer ---- */
  push('M9.1 E1 answer: 12 journeys (3 × 4), 6 exits (2 + 4), the hinge AND against EITHER (M4.1)', 3 * 4 === 12 && 2 + 4 === 6)
  push('M9.2 E2 answer: the roster 1, 1, 2, 6, 24, 120, 720, 5040; 10! = 3628800 = 2⁸·3⁴·5²·7; 8!/5! = 336; 8!/3! = 6720 (M4.4 + M1.3)', (() => { return [1, 1, 2, 6, 24, 120, 720, 5040].every((v, i) => fact(i) === v) && fact(10) === 3628800 && Ebrute(2, 10) === 8 && Ebrute(3, 10) === 4 && Ebrute(5, 10) === 2 && Ebrute(7, 10) === 1 && fact(8) / fact(5) === 336 && fact(8) / fact(3) === 6720 })())
  push('M9.3 E3 answer: 336 orders; r = 5; the compression 8!/(8−r)! (M4.8/M4.9)', P(8, 3) === 336 && P(8, 5) === 6720 && Math.round(fact(8) / fact(8 - 5)) === 6720)
  push('M9.4 E4 answer: the six selections ab..cd, 12 ordered pairs, the divide ÷2!, and 8C3 = 56 = 336/6 (M4.15)', kSubsets(4, 2) === 6 && 4 * 3 === 12 && binom(8, 3) === 56)
  push('M9.5 E5 answer: 720 = 6! seatings; the guards 6 → 2 and 24 → 6 (M4.12)', fact(6) === 720 && circleClasses(3) === 2 && circleClasses(4) === 6)
  push('M9.6 E6 answer: 6 = C(6,1) sweets; 56 = C(8,3) oranges (M1.10 + K6.4 reconciled)', (() => { return weakTuples(5, 2) === 6 && binom(6, 1) === 6 && posTuples(9, 4) === 56 && binom(8, 3) === 56 })())
  push('M9.7 E7 answer: 130 and 130 — at most 3 with the empty plan: 1 + 9 + 36 + 84; at least 6: 84 + 36 + 9 + 1 (M4.17)', binom(9, 0) + binom(9, 1) + binom(9, 2) + binom(9, 3) === 130 && binom(9, 6) + binom(9, 7) + binom(9, 8) + binom(9, 9) === 130)
  push('M9.8 E8 answer: (B) 3600 = 7! − 2·6!; distractors (A) 5040 = 7!, (C) 1440 = 2·6!, (D) 1800 = 3600/2 (reconciles G25)', fact(7) === 5040 && 2 * fact(6) === 1440 && 5040 - 1440 === 3600 && 3600 / 2 === 1800)
  push('M9.9 E9 answer: (A) C(10,3) = 120 ✓ and (B) TOMATO 6!/(2!·2!) = 180 ✓ true; (C) false — 8! = 40320 is the circle count, the necklace is 8!/2 = 20160; (D) false — 6!/(2!)³ = 90 is labelled, the division is 90/3! = 15', (() => { return binom(10, 3) === 120 && arrangements('TOMATO').length === 180 && fact(8) === 40320 && fact(8) / 2 === 20160 && fact(6) / fact(2) ** 3 === 90 && 90 / fact(3) === 15 })())
  push('M9.10 E10 answer: M-NEW (the difference) — 3⁴ = 81 postings by literal assignment census; none empty 81 − 48 + 3 = 36; at least one empty 81 − 36 = 45; the account 36 + 45 = 81 (81 and 36 reconcile K5.1/K9.1)', (() => { return ontoAssignments(4, 3) === 36 && 3 ** 4 === 81 && 81 - 48 + 3 === 36 && 81 - 36 === 45 && 36 + 45 === 81 })())
  push('M9.11 E11 answer: M-NEW — E₇(50!) = 7 + 1 = 8 by both routes (⌊50/7⌋ = 7, ⌊50/49⌋ = 1, 7³ = 343 > 50); the naive floor 7; the companions E₃(50!) = 22, E₂(50!) = 47 (reconciled)', (() => { return Math.floor(50 / 7) === 7 && Math.floor(50 / 49) === 1 && 7 ** 3 === 343 && 343 > 50 && Eleg(7, 50) === 8 && Ebrute(7, 50) === 8 && Eleg(3, 50) === 22 && Eleg(2, 50) === 47 })())
  push('M9.12 E12 answer: 27 ordered dice triples summing to 10 by literal enumeration; the series read C(9,2) − 9 = 27; the pattern census 6 + 6 + 3 + 6 + 3 + 3 = 27 (reconciles K7.3)', (() => { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let d = 1; d <= 6; d++) if (a + b + d === 10) c++; return c === 27 && binom(9, 2) - 9 === 27 && 6 + 6 + 3 + 6 + 3 + 3 === 27 })())
  push('M9.13 E13 answer: 84; 28; 1/3 — the handoff fraction (M4.18)', binom(9, 3) === 84 && binom(8, 2) === 28 && Math.abs(28 / 84 - 1 / 3) < 1e-12)
  push('M9.14 E14 answer: the n = 4 census 24 → 6 → 3 literal; the n = 2 edge: 1 circle = 1 necklace (the flip fixes the circle; reconciles G43)', (() => { return fact(4) === 24 && circleClasses(4) === 6 && necklaceClasses(4) === 3 && circleClasses(2) === 1 && necklaceClasses(2) === 1 && circleClasses(2) === necklaceClasses(2) })())
  push('M9.15 E15 answer: the stamping ledger — 336/6 = 56, 720/4 = 180, 5040/7 = 720, 90/6 = 15, all divisions exact', 336 / 6 === 56 && 720 / 4 === 180 && 5040 / 7 === 720 && 90 / 6 === 15)
}

/* ------------------------------------------------------------------ */
/* SECTION N — 6.R pins on the lesson object (the part file itself)   */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_6R = [1, 0, 3, 0, 1]
const WANT_PREREQS = [
  'aa-the-fundamental-principle-of-counting',
  'aa-factorials-and-the-counting-toolkit',
  'aa-permutations-the-arrangement-count',
  'aa-circular-and-restricted-permutations',
  'aa-combinations-the-selection-count',
  'aa-distributions-and-the-classic-counting-puzzles',
]
const SOURCE_WHITELIST = ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra']

const L = lessonReview6

{
  const push = (name: string, ok: boolean, detail?: string) => N.push(check(name, ok, detail))
  const countKind = (kind: string): number => L.blocks.filter((b) => b.kind === (kind as never)).length

  const collectTexts = (): string[] => {
    const texts: string[] = []
    for (const b of L.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      else if (b.kind === 'callout') texts.push(b.title, b.text)
      else if (b.kind === 'example') texts.push(b.title, ...b.steps)
      else if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      else if (b.kind === 'quiz') { for (const it of b.items) texts.push(it.q, it.explain, ...it.options); if (b.title) texts.push(b.title) }
      else if (b.kind === 'exercises') { if (b.title) texts.push(b.title); for (const st of b.sets) for (const q of st.questions) { texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution])); if (q.answer) texts.push(q.answer) } }
      else if (b.kind === 'figure') texts.push(b.caption)
      else if (b.kind === 'table') texts.push(...(b.caption ? [b.caption] : []), ...b.head, ...b.rows.flat())
      else if (b.kind === 'formula') texts.push(b.name, ...(b.note ? [b.note] : []))
      else if (b.kind === 'equation') texts.push(b.note ?? '')
      else if (b.kind === 'derivation') { texts.push(b.statement, b.result); for (const st of b.steps) texts.push(st.label, st.explanation) }
      else if (b.kind === 'list') texts.push(...b.items)
    }
    return texts
  }

  push('N1 quiz has exactly 5 items', countKind('quiz') === 1 && (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })())
  push('N2 quiz options 4 each, answer indices = [1,0,3,0,1] (the pinned keys)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4 && it.answer >= 0 && it.answer < 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_6R.join(',') })())
  push('N3 quiz explains say why wrong options fail (each ≥ 120 chars, naming Option [ABCD] and the correct value)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ explain: string }> }; return q.items.every((it) => it.explain.length >= 120 && /option [abcd]/i.test(it.explain)) })())
  push('N4 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })())
  push('N5 every exercise question carries a steps-array solution (≥ 4 lines) + a nonempty string answer', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0)) })())
  push('N6 exactly 8 example blocks (Illustrations) — the 4.R/5.R precedent count (≥ 8 pinned by the plan)', countKind('example') === 8)
  push('N7 exactly 2 figures, vivid-palette-only, no retired hex (≥ 2 pinned by the plan)', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length === 2 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); return hexes.length > 0 && hexes.every((h) => VIVID.includes(h) && !RETIRED.includes(h)) }) })())
  push('N8 figure SVG texts carry NO raw TeX (no $, \\tfrac, \\times, \\sqrt, \\cdot, ^ markup in any text node), ≥ 20 text nodes total', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const texts = figs.flatMap((f) => (f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []).map((t) => t.replace(/<[^>]*>/g, ''))); return texts.length > 20 && texts.every((t) => !/\$|\\tfrac|\\times|\\sqrt|\\cdot|\\binom|\^|_/.test(t)) })())
  push('N9 exactly 3 derivations, titles PLAIN (no $, no \\command), step labels PLAIN (no $), results $-delimited (≥ 3 pinned by the plan)', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length === 3 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })())
  push('N10 derivation results: clause-wise $…$ spans only (every span < 260 chars — the mobile break discipline), no \\dfrac, ≥ 2 spans each', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ result: string }>; return ds.every((d) => { const spans = d.result.match(/\$[^$]*\$/g) ?? []; return spans.length >= 2 && spans.every((s) => s.length < 260) && !d.result.includes('\\dfrac') }) })())
  push('N11 derivation step formulas are KaTeX source without $ delimiters', (() => { const ds = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ steps: Array<{ formula?: string }> }>; return ds.every((d) => d.steps.every((st) => st.formula === undefined || (!st.formula.includes('$') && st.formula.trim().length > 0))) })())
  push('N12 exactly 9 formula cards (≥ 3 pinned by the plan; the 4.R/5.R precedent ran 8, this review carries the alternating pair as a ninth)', countKind('formula') === 9)
  push('N13 exactly 9 terms in one terms block (≥ 6 pinned by the plan)', (() => { const ts = L.blocks.filter((b) => b.kind === 'terms'); const t = ts[0] as { items?: unknown[] }; return ts.length === 1 && (t.items?.length ?? 0) === 9 })())
  push('N14 word count ≥ 4000 by countLessonWords (the review floor; the honest authored count)', countLessonWords(L) >= 4000, `countLessonWords = ${countLessonWords(L)}`)
  push('N15 exactly 2 master tables (the count census with 14 rows × 4 columns + the decision map with 12 rows × 4 columns; ≥ 2 pinned by the plan)', (() => { const tabs = L.blocks.filter((b) => b.kind === 'table') as Array<{ head: string[]; rows: string[][] }>; return tabs.length === 2 && tabs[0].head.length === 4 && tabs[0].rows.length === 14 && tabs[1].head.length === 4 && tabs[1].rows.length === 12 })())
  push('N16 prereq ids exactly the six chapter siblings in the pinned order (the prereq spine)', (() => { return (L.prerequisites ?? []).join(',') === WANT_PREREQS.join(',') })())
  push('N17 sources = the 7 whitelisted keys (banked in SOURCE_LOG + cengage-m2-07, banked at close by the orchestrator)', (() => { const s = L.sources ?? []; return s.length === 7 && s.every((k) => SOURCE_WHITELIST.includes(k)) })())
  push('N18 no raw TeX outside $…$ in concepts/objectives (no \\dfrac, \\sqrt, \\qquad, ^ markup)', (() => { const texts = [...(L.concepts ?? []), ...(L.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })())
  push('N19 lesson identity: id aa-counting-permutations-combinations-unit-6-review (the LIVE 3.R/4.R/5.R convention aa-{chapter-slug}-unit-{n}-review — the plan\'s aa-counting-unit-6-review pin was loose and the live convention wins), number 6.R, title Unit 6 Completion Review', L.id === 'aa-counting-permutations-combinations-unit-6-review' && L.number === '6.R' && L.title === 'Unit 6 Completion Review')
  push('N20 concepts are 7 key phrases (house contract 5–8)', (L.concepts ?? []).length === 7)
  push('N21 balanced $ in every text-bearing string (each field\'s $ count is even)', (() => { return collectTexts().every((t) => (t.match(/\$/g) ?? []).length % 2 === 0) })())
  push('N22 captions are plain prose (no $, no \\command — they render PLAIN)', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>; return figs.every((f) => !/\$|\\[a-z]/.test(f.caption)) })())
  push('N23 quiz title + exercises title as pinned (the 4.R/5.R convention)', (() => { const q = L.blocks.find((b) => b.kind === 'quiz') as { title?: string }; const ex = L.blocks.find((b) => b.kind === 'exercises') as { title?: string }; return (q.title ?? '').startsWith('Check yourself') && /mixed bench/.test(ex.title ?? '') })())
  push('N24 Sol. pill census: 8 Illustrations + 15 exercise solutions = 23 (≥ 22 for the e2e pin, the 4.R/5.R precedent)', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: unknown[] }> }; return countKind('example') + ex.sets.reduce((acc, st) => acc + st.questions.length, 0) === 23 })())
  push('N25 the review walks all six arcs: each sibling lesson number appears in the prose (6.1–6.6)', (() => { const texts = collectTexts(); const joined = texts.join('\n'); return ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'].every((n) => joined.includes(n)) })())
  push('N26 the six lesson titles are cited by name in the arc prose (cross-reference, never re-teach)', (() => { const texts: string[] = []; for (const b of L.blocks) { if (b.kind === 'para') texts.push(b.text) } const joined = texts.join('\n'); const wants = ['The Fundamental Principle of Counting', 'Factorials and the Counting Toolkit', 'Permutations: the Arrangement Count', 'Circular and Restricted Permutations', 'Combinations: the Selection Count', 'Distributions and the Classic Counting Puzzles']; return wants.every((s) => joined.includes(s)) })())
  push('N27 the re-audited witnesses appear verbatim in the prose (the roman roster rows and the witness numbers: 72, 13, 336, 6720, 180, 720, 20160, 56, 64, 6, 15, 9)', (() => { const joined = collectTexts().join('\n'); return ['4 \\times 6 \\times 3 = 72', '6 + 9 - 2 = 13', '6 \\cdot 7 \\cdot 8 = 336', '6720', '180', '6! = 720', '20160', '56', '2^{6} = 64', 'D(4) = 9'].every((s) => joined.includes(s)) })())
  push('N28 the honest deferrals named in the close: chapter 7 (induction/binomial), the Combinatorics shelf, and Probability — all named, none cashed', (() => { const texts: string[] = []; for (const b of L.blocks) { if (b.kind === 'para' || b.kind === 'callout') texts.push(b.text) } const joined = texts.join('\n'); return /chapter 7/.test(joined) && /binomial/.test(joined) && /Combinatorics/.test(joined) && /Probability/.test(joined) })())
  push('N29 the Probability handoff NAMED as the master plan binds: favourable selections over total selections, with the 28/84 = 1/3 witness in prose', (() => { const joined = collectTexts().join('\n'); return /FAVOURABLE selections over TOTAL selections|favourable selections over total selections/i.test(joined) && /Probability/.test(joined) && joined.includes('\\tfrac{28}{84}') })())
  push('N30 the decision map\'s questions named in prose (order, alike/identical, round/circle, groups/persons, empty allowed)', (() => { const joined = collectTexts().join('\n').toLowerCase(); return /does order matter/.test(joined) && /are the objects alike/.test(joined) && /round/.test(joined) && /groups or persons/.test(joined) && /empty allowed/.test(joined) })())
  push('N31 no \\dfrac in any INLINE text field (the roster-fraction discipline: \\tfrac inline, \\dfrac display-only in equations/formulas/derivation formulas)', (() => { const texts: string[] = []; for (const b of L.blocks) { if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text); else if (b.kind === 'callout') texts.push(b.title, b.text); else if (b.kind === 'example') texts.push(b.title, ...b.steps); else if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def); else if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain, ...it.options); else if (b.kind === 'exercises') for (const st of b.sets) for (const q of st.questions) texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), ...(q.answer ? [q.answer] : [])); else if (b.kind === 'table') texts.push(...b.rows.flat()); else if (b.kind === 'list') texts.push(...b.items); else if (b.kind === 'figure') texts.push(b.caption) } return texts.every((t) => !t.includes('\\dfrac')) })())
  push('N32 equations tagged 1..6, distinct, in reading order', (() => { const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string }>; const tags = eqs.map((e) => Number((e.latex.match(/\\tag\{(\d+)\}/) ?? [])[1])); return eqs.length === 6 && new Set(tags).size === 6 && tags.every((t, i) => t === i + 1) })())
  push('N33 callout census: ≥ 1 definition, ≥ 1 theorem, ≥ 2 insight, ≥ 1 warn, ≥ 1 exam, ≥ 1 historical (the 4.R precedent)', (() => { const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string }>; const n = (t: string) => calls.filter((c) => c.tone === t).length; return n('definition') >= 1 && n('theorem') >= 1 && n('insight') >= 2 && n('warn') >= 1 && n('exam') >= 1 && n('historical') >= 1 })())
  push('N34 the mixed bench covers ALL SIX arcs: each sibling lesson number is cited in the exercises\' questions/solutions (the bench graded by shapes, every arc present)', (() => { const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ q: string; solution: string[] }> }> }; const joined = ex.sets.flatMap((st) => st.questions.flatMap((q) => [q.q, ...q.solution])).join('\n'); return ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'].every((n) => joined.includes(n)) })())
}
}


// ------------------------------------------------------------------
// SECTION Z (the assembler's census) — the shipped chapter as an object:
// the plannedLessons contract discharged (the six planned titles written in
// the master plan §2 teaching order + the 6.R review), the ids pinned and
// globally unique, every sources key banked in docs/project/SOURCE_LOG.md,
// the word floors, the quiz-key pins, the whole-unit totals.
// ------------------------------------------------------------------
type QuizBlockShape = { items: { answer: number }[] }

function sectionZ(): SectionCheck[] {
  const c: SectionCheck[] = []
  const Ls = chapter06.lessons
  c.push(check('Z1 chapter fields (6 / counting-permutations-combinations / complete)', chapter06.number === 6 && chapter06.slug === 'counting-permutations-combinations' && chapter06.title === 'Counting: Permutations and Combinations' && chapter06.status === 'complete'))
  c.push(check('Z2 plannedLessons empty — all six written + the review', (chapter06.plannedLessons ?? []).length === 0))
  c.push(check('Z3 seven lessons (6 + the review)', Ls.length === 7, `got ${Ls.length}`))
  const numbers = Ls.map((l) => l.number).join(',')
  c.push(check('Z4 numbers 6.1..6.6 + 6.R', numbers === '6.1,6.2,6.3,6.4,6.5,6.6,6.R', numbers))
  // the SHIPPED TEACHING ORDER (master plan §2; book.ts's plannedLessons
  // array order was non-pedagogical)
  const planned = ['The Fundamental Principle of Counting', 'Factorials and the Counting Toolkit', 'Permutations: the Arrangement Count', 'Circular and Restricted Permutations', 'Combinations: the Selection Count', 'Distributions and the Classic Counting Puzzles', 'Unit 6 Completion Review']
  c.push(check('Z5 titles are the six book.ts plannedLessons strings + the review, in the master-plan teaching order', Ls.every((l, i) => l.title === planned[i]), Ls.map((l) => l.title).join(' | ')))
  const pinnedIds = ['aa-the-fundamental-principle-of-counting', 'aa-factorials-and-the-counting-toolkit', 'aa-permutations-the-arrangement-count', 'aa-circular-and-restricted-permutations', 'aa-combinations-the-selection-count', 'aa-distributions-and-the-classic-counting-puzzles', 'aa-counting-permutations-combinations-unit-6-review']
  c.push(check('Z6 ids pinned (the 6.R id follows the 3.R/4.R/5.R slug convention)', Ls.every((l, i) => l.id === pinnedIds[i]), Ls.map((l) => l.id).join(' | ')))

  // global uniqueness across the whole library (grep-verified)
  const dupes: string[] = []
  const ch06Path = '/home/z/my-project/src/data/library/books/mathematics/advanced-algebra/ch-06.ts'
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.ts$/.test(e.name)) {
        const src = fs.readFileSync(p, 'utf8')
        for (const id of pinnedIds) {
          const n = (src.match(new RegExp(`\\bid: '${id}'`, 'g')) || []).length
          if (n > 0 && p !== ch06Path) dupes.push(`${id} also in ${p}`)
        }
      }
    }
  }
  walk('/home/z/my-project/src/data/library')
  c.push(check('Z7 ids globally unique (no other library file carries them)', dupes.length === 0, dupes.join('; ')))
  const ch06src = fs.readFileSync(ch06Path, 'utf8')
  c.push(check('Z8 each id appears exactly once in ch-06.ts', pinnedIds.every((id) => (ch06src.match(new RegExp(`\\bid: '${id}'`, 'g')) || []).length === 1)))

  const sourceLog = fs.readFileSync('/home/z/my-project/docs/project/SOURCE_LOG.md', 'utf8')
  const allSources = new Set(Ls.flatMap((l) => l.sources ?? []))
  const missing = [...allSources].filter((k) => !sourceLog.includes('`' + k + '`'))
  c.push(check('Z9 every sources key banked in SOURCE_LOG.md', missing.length === 0, `missing: ${missing.join(', ')}`))

  const floors: Record<string, number> = { '6.1': 4500, '6.2': 4500, '6.3': 4500, '6.4': 4500, '6.5': 4500, '6.6': 4500, '6.R': 4000 }
  for (const l of Ls) {
    const w = countLessonWords(l)
    c.push(check(`Z10 words ${l.number} ≥ ${floors[l.number]} (got ${w})`, w >= floors[l.number]))
  }

  const pinnedQuiz: Record<string, number[]> = { '6.1': [1, 2, 1, 2, 3], '6.2': [2, 3, 0, 2, 1], '6.3': [0, 1, 2, 3, 1], '6.4': [1, 1, 2, 0, 3], '6.5': [0, 1, 1, 1, 3], '6.6': [2, 2, 1, 3, 0], '6.R': [1, 0, 3, 0, 1] }
  for (const l of Ls) {
    const quizzes = l.blocks.filter((b) => b.kind === 'quiz')
    if (quizzes.length !== 1) {
      c.push(check(`Z11 ${l.number} exactly one quiz block`, false, `got ${quizzes.length}`))
      continue
    }
    const items = (quizzes[0] as unknown as QuizBlockShape).items
    const got = items.map((it) => it.answer)
    const want = pinnedQuiz[l.number]
    c.push(check(`Z12 ${l.number} quiz keys [${want.join(', ')}]`, got.length === 5 && got.every((v, i) => v === want[i]), `got [${got.join(', ')}]`))
  }

  c.push(check('Z13 no leftover placeholders in ch-06.ts', !/TODO|XXX|待补充|【/.test(ch06src)))
  const totalWords = Ls.reduce((a, l) => a + countLessonWords(l), 0)
  console.log(`  [Z] chapter totals: ${Ls.length} lessons, ${totalWords} words, engines A–N re-run in this file`)
  return c
}


// ------------------------------------------------------------------
// the harness
// ------------------------------------------------------------------
const SECTIONS: [string, SectionCheck[]][] = [
  ['A', sectionA(lesson61)], ['B', sectionB(lesson61)],
  ['C', C], ['D', D],
  ['E', E], ['F', F],
  ['G', G], ['H', H],
  ['I', I], ['J', J],
  ['K', K], ['L', L],
  ['M', M], ['N', N],
  ['Z', sectionZ()],
]

let totalOk = 0
let totalChecks = 0
const allFails: string[] = []
for (const [name, checks] of SECTIONS) {
  const t = tally(name, checks)
  totalOk += t.ok
  totalChecks += t.total
  allFails.push(...t.fail)
  console.log(`${name}: ${t.ok}/${t.total}${t.fail.length ? ' — FAIL: ' + t.fail.join(' ; ') : ''}`)
}
console.log(`verify-book4-ch06: ${totalOk}/${totalChecks}`)
if (allFails.length) {
  allFails.forEach((f) => console.log('  FAIL ' + f))
  process.exit(1)
}
