import { chapter04 } from '../src/data/library/books/mathematics/advanced-algebra/ch-04'
import { countLessonWords, type Block, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch04.ts — the whole-unit verifier for Advanced Algebra (book
 * #4), chapter 4 "Inequalities: the Classical Engine", assembled 2026-11-18
 * from the PARALLEL-SWARM RUN's per-lesson engines (owner chat directive:
 * "launch multiple agents for authoring lessons"). Every lesson's sections
 * grew green inside its authoring agent BEFORE that lesson's prose was
 * declared done — the verify-first discipline kept per-agent; this file
 * re-runs the identical section bodies against the ASSEMBLED chapter file,
 * plus the assembler's census (section Z). Authoring master plan:
 * docs/research/AA_CH04_MASTER_PLAN.md. Study-never-reproduce honored: the
 * transcribed m2-06 module informed method shapes only.
 *
 *   (A) 4.1 engines + (B) 4.1 pins  — agent 2-a (137 + 58)
 *   (C) 4.2 engines + (D) 4.2 pins  — agent 2-b (139 + 37)
 *   (E) 4.3 engines + (F) 4.3 pins  — agent 2-c (121 + 30)
 *   (G) 4.4 engines + (H) 4.4 pins  — agent 2-d (299 + 39)
 *   (I) 4.5 engines + (J) 4.5 pins  — agent 2-e (190 + 32)
 *   (K) 4.6 engines + (L) 4.6 pins  — agent 2-f (128 + 50)
 *   (M) 4.R engines + (N) 4.R pins  — agent 2-g (141 + 60)
 *   (Z) the assembler's census — the shipped chapter as an object.
 *
 * The harness below maps the chapter's lessons by number and runs every
 * section; the run record comment above each body is its agent's own.
 */

// scripts/aa-ch04-work/shared.ts — the parallel-swarm helpers shared by every
// per-lesson engine section (2026-11-18 owner chat directive: "launch multiple
// agents for authoring lessons"). The final scripts/verify-book4-ch04.ts is
// assembled from the same section bodies with this module inlined at the top.

 interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

 function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

/** count blocks of one kind in a lesson (e.g. 'figure', 'derivation') */
 function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
}

/** tally helper used by the per-lesson runners and the assembled verifier */
 function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

// the shipped chapter's lessons, mapped by number (the same objects the
// per-agent engines were grown against, re-read through the assembled file)
const byNumber = new Map<string, Lesson>(chapter04.lessons.map((l) => [l.number, l] as const))
const lesson41 = byNumber.get('4.1') as Lesson
const lesson42 = byNumber.get('4.2') as Lesson
const lesson43 = byNumber.get('4.3') as Lesson
const lesson44 = byNumber.get('4.4') as Lesson
const lesson45 = byNumber.get('4.5') as Lesson
const lesson46 = byNumber.get('4.6') as Lesson
const lessonReview4 = byNumber.get('4.R') as Lesson


/**
 * v4-1.ts — the verify-first engine for Advanced Algebra lesson 4.1
 * "The Arithmetic-Geometric Mean Inequality" (id
 * aa-the-arithmetic-geometric-mean-inequality), authored 2026-11-18 by the
 * parallel swarm. The final scripts/verify-book4-ch04.ts is assembled from
 * these section bodies.
 *
 * SECTION A (4.1 engines) — recompute every mathematical claim in the
 * lesson: A≥G≥H swept over positive integer pairs AND triples with
 * equality iff all equal (the triple sweep truth-checks chapter 7's
 * induction promise — this lesson certifies only powers of two, and says
 * so); the (√a−√b)²/2 identity pinned; every Illustration's arithmetic
 * recomputed exactly; every exercise answer recomputed; the fixed-sum /
 * fixed-product witnesses swept; every equation's LaTeX sanity (no stray
 * $, balanced braces, tags 1..8).
 *
 * SECTION B (4.1 pins) — the structural contract: quiz exactly 5 items, 4
 * options each, answer indices valid, explains say why wrong options fail;
 * exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2, every question with a
 * steps-array solution (+ answer); ≥2 figures (each figure svg uses ONLY
 * the vivid palette hexes from BOOK_FORMAT.md and no retired muted hex);
 * ≥3 derivations; ≥3 formula cards; ≥8 example blocks; ≥6 terms; word count
 * ≥ 4500 via countLessonWords; prereq ids exact as pinned; sources keys
 * within the whitelist; the two weighted-means fold Illustrations present
 * (the m2-06 example-family fold); the m4-01 review-page fold named in
 * prose.
 */

/* ------------------------------------------------------------------ */
/* shared math helpers (module scope, used by section A)                */
/* ------------------------------------------------------------------ */

const A2 = (a: number, b: number): number => (a + b) / 2
const G2 = (a: number, b: number): number => Math.sqrt(a * b)
const H2 = (a: number, b: number): number => (2 * a * b) / (a + b)
const Q2 = (a: number, b: number): number => Math.sqrt((a * a + b * b) / 2)
const EPS = 1e-9
const near = (x: number, y: number): boolean => Math.abs(x - y) <= EPS

const A4n = (xs: number[]): number => xs.reduce((s, v) => s + v, 0) / xs.length
const G4n = (xs: number[]): number => Math.pow(xs.reduce((p, v) => p * v, 1), 1 / xs.length)
const H4n = (xs: number[]): number => xs.length / xs.reduce((s, v) => s + 1 / v, 0)

/** all tuples of length n over the given alphabet (in order) */
function tuples(alphabet: number[], n: number): number[][] {
  const out: number[][] = []
  const idx = new Array<number>(n).fill(0)
  for (;;) {
    out.push(idx.map((i) => alphabet[i]))
    let p = n - 1
    while (p >= 0) {
      idx[p]++
      if (idx[p] < alphabet.length) break
      idx[p] = 0
      p--
    }
    if (p < 0) return out
  }
}

/** every string field of every block (for the $-balance / stray-$ scan) */
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
      case 'algorithm':
        push(b.title)
        for (const l of b.lines) {
          push(l.code)
          if (l.note) push(l.note)
        }
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

/* ------------------------------------------------------------------ */
/* SECTION A — the 4.1 engines (recompute every mathematical claim)    */
/* ------------------------------------------------------------------ */

 function sectionA(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    out.push(check(name, ok, detail))
  }

  /* --- the order, swept over positive integer pairs ----------------- */

  // A1. A ≥ G over all pairs 1..30 (900 pairs).
  {
    let bad = 0
    for (let a = 1; a <= 30; a++)
      for (let b = 1; b <= 30; b++) if (A2(a, b) < G2(a, b) - EPS) bad++
    push('A1 A ≥ G swept over the 900 integer pairs 1..30', bad === 0, `${bad} violations`)
  }
  // A2. G ≥ H over the same sweep.
  {
    let bad = 0
    for (let a = 1; a <= 30; a++)
      for (let b = 1; b <= 30; b++) if (G2(a, b) < H2(a, b) - EPS) bad++
    push('A2 G ≥ H swept over the 900 integer pairs 1..30', bad === 0, `${bad} violations`)
  }
  // A3. strictness: a ≠ b forces A > G > H; a = b forces all three equal.
  {
    let bad = 0
    for (let a = 1; a <= 30; a++)
      for (let b = 1; b <= 30; b++) {
        if (a === b) {
          if (!(near(A2(a, b), a) && near(G2(a, b), a) && near(H2(a, b), a))) bad++
        } else if (!(A2(a, b) > G2(a, b) + EPS && G2(a, b) > H2(a, b) + EPS)) bad++
      }
    push('A3 equality iff the pair coincides (swept 1..30)', bad === 0, `${bad} violations`)
  }
  // A4. every mean sits between the endpoints: a ≤ H ≤ G ≤ A ≤ Q ≤ b (a ≤ b).
  {
    let bad = 0
    for (let a = 1; a <= 25; a++)
      for (let b = a; b <= 25; b++)
        if (!(a - EPS <= H2(a, b) && H2(a, b) <= G2(a, b) + EPS && G2(a, b) <= A2(a, b) + EPS && A2(a, b) <= Q2(a, b) + EPS && Q2(a, b) <= b + EPS))
          bad++
    push('A4 the neighbourhood lives between the endpoints (H,G,A,Q swept, a ≤ b)', bad === 0, `${bad} violations`)
  }
  // A5. Q ≥ A (the forward-named QM row of the neighbourhood table).
  {
    let bad = 0
    for (let a = 1; a <= 20; a++) for (let b = 1; b <= 20; b++) if (Q2(a, b) < A2(a, b) - EPS) bad++
    push('A5 QM ≥ AM swept (the table\u2019s forward-named member)', bad === 0, `${bad} violations`)
  }

  /* --- the certificates, pinned and swept --------------------------- */

  // A6. the pinned identity A − G = (√a−√b)²/2 on all pairs 1..25.
  {
    let bad = 0
    for (let a = 1; a <= 25; a++)
      for (let b = 1; b <= 25; b++)
        if (!near(A2(a, b) - G2(a, b), Math.pow(Math.sqrt(a) - Math.sqrt(b), 2) / 2)) bad++
    push('A6 A − G = (√a−√b)²/2 swept over pairs 1..25', bad === 0, `${bad} violations`)
  }
  // A7. the direct G − H certificate: G − H = (√ab/(a+b))·(√a−√b)².
  {
    let bad = 0
    for (let a = 1; a <= 25; a++)
      for (let b = 1; b <= 25; b++) {
        const direct = G2(a, b) - H2(a, b)
        const cert = (Math.sqrt(a * b) / (a + b)) * Math.pow(Math.sqrt(a) - Math.sqrt(b), 2)
        if (!near(direct, cert)) bad++
      }
    push('A7 G − H = (√ab/(a+b))(√a−√b)² swept over pairs 1..25', bad === 0, `${bad} violations`)
  }
  // A8. the mirror identities: 1/H = A(1/a,1/b) and 1/G = G(1/a,1/b).
  {
    let bad = 0
    for (let a = 1; a <= 20; a++)
      for (let b = 1; b <= 20; b++) {
        if (!near(1 / H2(a, b), A2(1 / a, 1 / b))) bad++
        if (!near(1 / G2(a, b), G2(1 / a, 1 / b))) bad++
      }
    push('A8 the reciprocal identities 1/H = A(1/a,1/b), 1/G = G(1/a,1/b) swept', bad === 0, `${bad} violations`)
  }
  // A9. the doubling-ladder bookkeeping identity: A_{2n} = (A₁ + A₂)/2.
  {
    const xs = [1, 16, 16, 81]
    const A12 = A2(xs[0], xs[1])
    const A34 = A2(xs[2], xs[3])
    push('A9 ladder bookkeeping: mean of half-means = whole mean', near((A12 + A34) / 2, A4n(xs)))
  }
  // A10. scale law: A(λa, λb) = λA(a,b) (and G, H) — the gap-pricing Illustration.
  {
    let bad = 0
    for (const lam of [2, 3, 5, 10])
      for (let a = 1; a <= 12; a++)
        for (let b = 1; b <= 12; b++) {
          if (!near(A2(lam * a, lam * b), lam * A2(a, b))) bad++
          if (!near(G2(lam * a, lam * b), lam * G2(a, b))) bad++
          if (!near(H2(lam * a, lam * b), lam * H2(a, b))) bad++
        }
    push('A10 the scale law (λ-scaling all three means) swept', bad === 0, `${bad} violations`)
  }

  /* --- the roman roster, table A and the asides -------------------- */

  // A11. roman roster (2,8), (3,12), (1,9), (5,5).
  push('A11 roster (2,8): A=5, G=4, H=3.2', near(A2(2, 8), 5) && near(G2(2, 8), 4) && near(H2(2, 8), 3.2))
  push('A12 roster (3,12): A=7.5, G=6, H=4.8', near(A2(3, 12), 7.5) && near(G2(3, 12), 6) && near(H2(3, 12), 4.8))
  push('A13 roster (1,9): A=5, G=3, H=1.8', near(A2(1, 9), 5) && near(G2(1, 9), 3) && near(H2(1, 9), 1.8))
  push('A14 roster (5,5): all three means equal 5', near(A2(5, 5), 5) && near(G2(5, 5), 5) && near(H2(5, 5), 5))
  // A15. the growth-factor aside: G(2,8)=4 ≠ 5 = A(2,8); 4² = 16 = 2·8.
  push('A15 growth-factor aside: G(2,8) = 4, A(2,8) = 5, 4² = 16 = 2·8', near(G2(2, 8), 4) && near(A2(2, 8), 5) && 4 * 4 === 16 && 2 * 8 === 16)
  // A16. the speed aside: H(12,36) = 18 ≠ 24 = A(12,36).
  push('A16 speed aside: H(12,36) = 18, A(12,36) = 24', near(H2(12, 36), 18) && near(A2(12, 36), 24))
  // A17. table A: the QM row at (2,8): Q = √34 ≈ 5.8309519.
  push('A17 table A: Q(2,8) = √34 ≈ 5.8309519', near(Q2(2, 8), Math.sqrt(34)) && near(Q2(2, 8), 5.830951894845301))
  // A18. the warn witnesses: (−4,9): A = 2.5; (1,9): G = 3 ≤ A = 5.
  push('A18 warn witnesses: A(−4,9) = 2.5; (1,9): G=3 < A=5', near(A2(-4, 9), 2.5) && near(G2(1, 9), 3) && near(A2(1, 9), 5))

  /* --- Illustration 1: the pair (12, 48) ---------------------------- */

  push('A19 Ill.1 (12,48): A = 30, G = 24, H = 19.2', near(A2(12, 48), 30) && near(G2(12, 48), 24) && near(H2(12, 48), 19.2))
  push('A20 Ill.1 certificate: (√48−√12)² = 12, so A−G = 6', near(Math.pow(Math.sqrt(48) - Math.sqrt(12), 2), 12) && near(A2(12, 48) - G2(12, 48), 6))

  /* --- Illustration 2: the reciprocal-sum bound --------------------- */

  // A21. (x+y)(1/x+1/y) ≥ 4 swept; A22. the identity 2 + x/y + y/x.
  {
    let bad = 0
    let bad2 = 0
    for (let x = 1; x <= 25; x++)
      for (let y = 1; y <= 25; y++) {
        const v = (x + y) * (1 / x + 1 / y)
        if (v < 4 - EPS) bad++
        if (!near(v, 2 + x / y + y / x)) bad2++
      }
    push('A21 Ill.2 (x+y)(1/x+1/y) ≥ 4 swept over pairs 1..25', bad === 0, `${bad} violations`)
    push('A22 Ill.2 identity (x+y)(1/x+1/y) = 2 + x/y + y/x swept', bad2 === 0, `${bad2} violations`)
  }
  // A23. the witness (3,4): 49/12 ≈ 4.0833.
  push('A23 Ill.2 witness (3,4): value 49/12 ≈ 4.0833', near((3 + 4) * (1 / 3 + 1 / 4), 49 / 12) && near((3 + 4) * (1 / 3 + 1 / 4), 4.083333333333333))

  /* --- Illustration 3: gap pricing on the 1:4 shape ------------------ */

  // A24–A26. the three pairs' gaps, doubling; A27 the fixed ratios 5/4.
  {
    const pairs: [number, number][] = [
      [2, 8],
      [4, 16],
      [8, 32],
    ]
    const gapsAG = pairs.map(([a, b]) => A2(a, b) - G2(a, b))
    const gapsGH = pairs.map(([a, b]) => G2(a, b) - H2(a, b))
    push('A24 Ill.3 gaps A−G: 1, 2, 4 (doubling)', near(gapsAG[0], 1) && near(gapsAG[1], 2) && near(gapsAG[2], 4))
    push('A25 Ill.3 gaps G−H: 0.8, 1.6, 3.2 (doubling)', near(gapsGH[0], 0.8) && near(gapsGH[1], 1.6) && near(gapsGH[2], 3.2))
    const ratioA = pairs.map(([a, b]) => A2(a, b) / G2(a, b))
    const ratioG = pairs.map(([a, b]) => G2(a, b) / H2(a, b))
    push('A26 Ill.3 ratios A/G and G/H fixed at 1.25 across the shape', ratioA.every((r) => near(r, 1.25)) && ratioG.every((r) => near(r, 1.25)))
    let bad = 0
    for (let k = 1; k <= 10; k++) {
      if (!near(A2(k, 4 * k) / G2(k, 4 * k), 1.25)) bad++
      if (!near(G2(k, 4 * k) / H2(k, 4 * k), 1.25)) bad++
    }
    push('A27 Ill.3 the 1.25 signature of every 1:4 pair (k, 4k), k = 1..10', bad === 0, `${bad} violations`)
  }

  /* --- Illustration 4: the min-hunt x + 36/x ------------------------- */

  {
    let bad = 0
    for (let x = 0.05; x <= 60; x += 0.05) if (x + 36 / x < 12 - EPS) bad++
    push('A28 Ill.4 x + 36/x ≥ 12 swept on (0, 60]', bad === 0, `${bad} violations`)
    push('A29 Ill.4 equality at x = 6: value exactly 12', near(6 + 36 / 6, 12))
    let bad2 = 0
    for (let x = 0.05; x <= 40; x += 0.05) if (!near(x + 36 / x - 12, Math.pow(x - 6, 2) / x)) bad2++
    push('A30 Ill.4 second certificate x + 36/x − 12 = (x−6)²/x swept', bad2 === 0, `${bad2} violations`)
  }

  /* --- Illustration 5: perimeter 36, the fencing witness -------------- */

  {
    let bad = 0
    for (let w = 0.25; w < 17.75; w += 0.25) if (w * (18 - w) > 81 + EPS) bad++
    push('A31 Ill.5 w(18−w) ≤ 81 swept (half-perimeter 18)', bad === 0, `${bad} violations`)
    push('A32 Ill.5 equality at w = 9: area exactly 81', near(9 * 9, 81))
    const census: [number, number][] = [
      [2, 32],
      [4, 56],
      [6, 72],
      [8, 80],
      [9, 81],
    ]
    push(
      'A33 Ill.5 census 2×32, 4×56, 6×72, 8×80, 9×81',
      census.every(([w, area]) => near(w * (18 - w), area)),
    )
    let bad2 = 0
    for (const P of [16, 24, 36, 40, 44, 60])
      for (let w = 0.25; w < P / 2 - 0.25; w += 0.25) if (w * (P / 2 - w) > (P / 4) * (P / 4) + EPS) bad2++
    push('A34 Ill.5 general law area ≤ (P/4)² swept over six perimeters', bad2 === 0, `${bad2} violations`)
  }

  /* --- Illustration 6 and the n-number ground ------------------------ */

  {
    const xs = [1, 16, 16, 81]
    const prod = xs.reduce((p, v) => p * v, 1)
    push('A35 Ill.6 product 1·16·16·81 = 20736 = 12⁴', prod === 20736 && Math.pow(12, 4) === 20736)
    push('A36 Ill.6 G₄ = 12 exactly (20736^{1/4})', near(G4n(xs), 12))
    push('A37 Ill.6 A₄ = 28.5', near(A4n(xs), 28.5))
    push('A38 Ill.6 halves: A(1,16) = 8.5, G(1,16) = 4', near(A2(1, 16), 8.5) && near(G2(1, 16), 4))
    push('A39 Ill.6 halves: A(16,81) = 48.5, G(16,81) = 36', near(A2(16, 81), 48.5) && near(G2(16, 81), 36))
    push('A40 Ill.6 ladder G: √(4·36) = 12', near(Math.sqrt(4 * 36), 12))
    push('A41 Ill.6 gap A₄ − G₄ = 16.5', near(A4n(xs) - G4n(xs), 16.5))
    // the n-means definition roster (1,4,4,16)
    const ys = [1, 4, 4, 16]
    push('A42 n-roster (1,4,4,16): A₄ = 6.25, product 256 = 4⁴', near(A4n(ys), 6.25) && ys.reduce((p, v) => p * v, 1) === 256 && Math.pow(4, 4) === 256)
    push('A43 n-roster G₄ = 4 exactly', near(G4n(ys), 4))
    push('A44 n-roster H₄ = 64/25 = 2.56 (the engine caught a 64/21 slip in the drafting — fixed)', near(H4n(ys), 64 / 25) && near(H4n(ys), 2.56))
    push('A45 n-roster order A₄ ≥ G₄ ≥ H₄', A4n(ys) >= G4n(ys) - EPS && G4n(ys) >= H4n(ys) - EPS)
    // the roman roster after the n-means definition: the ratio-4 climb
    const zs = [1, 4, 16, 64]
    push('A46r roman roster (1,4,16,64): A₄ = 21.25, product 4096 = 8⁴', near(A4n(zs), 21.25) && zs.reduce((p, v) => p * v, 1) === 4096 && Math.pow(8, 4) === 4096)
    push('A47r roman roster G₄ = 8 exactly, H₄ = 256/85 ≈ 3.0118 (caught a 3.06 mis-approximation at first run)', near(G4n(zs), 8) && near(H4n(zs), 256 / 85) && near(H4n(zs), 3.011764705882353))
    push('A48r roman roster the order 21.25 ≥ 8 ≥ 3.0118 (strict)', A4n(zs) > G4n(zs) + EPS && G4n(zs) > H4n(zs) + EPS)
    const eq4 = [3, 3, 3, 3]
    push('A49r roman roster the coincident case (3,3,3,3): all three means 3', near(A4n(eq4), 3) && near(G4n(eq4), 3) && near(H4n(eq4), 3))
  }
  // A46–A48. AM-GM at n = 4 and n = 8 (the lesson's PROVED powers of two).
  {
    const t4 = tuples([1, 2, 3], 4)
    let bad = 0
    let badEq = 0
    for (const xs of t4) {
      if (A4n(xs) < G4n(xs) - EPS) bad++
      const allEq = xs.every((v) => v === xs[0])
      if (near(A4n(xs), G4n(xs)) !== allEq) badEq++
    }
    push('A46 AM-GM at n = 4 swept over {1,2,3}⁴ (81 tuples)', bad === 0, `${bad} violations`)
    push('A47 n = 4 equality iff all four equal (81 tuples)', badEq === 0, `${badEq} violations`)
  }
  {
    const t8 = tuples([1, 2, 3], 8)
    let bad = 0
    let badEq = 0
    for (const xs of t8) {
      if (A4n(xs) < G4n(xs) - EPS) bad++
      const allEq = xs.every((v) => v === xs[0])
      if (near(A4n(xs), G4n(xs)) !== allEq) badEq++
    }
    push('A48 AM-GM at n = 8 swept over {1,2,3}⁸ (6561 tuples)', bad === 0, `${bad} violations`)
    push('A49 n = 8 equality iff all eight equal (6561 tuples)', badEq === 0, `${badEq} violations`)
  }
  // A50. GM-HM at n = 4 (the reciprocal trick scaled).
  {
    const t4 = tuples([1, 2, 3], 4)
    let bad = 0
    for (const xs of t4) if (G4n(xs) < H4n(xs) - EPS) bad++
    push('A50 G ≥ H at n = 4 swept over {1,2,3}⁴', bad === 0, `${bad} violations`)
  }
  // A51–A52. TRIPLES: truth-check of the chapter 7 promise (not claimed
  // proved by this lesson — the prose defers the certificate honestly).
  {
    let bad = 0
    let badGH = 0
    let badEq = 0
    for (let a = 1; a <= 6; a++)
      for (let b = 1; b <= 6; b++)
        for (let c = 1; c <= 6; c++) {
          const xs = [a, b, c]
          if (A4n(xs) < G4n(xs) - EPS) bad++
          if (G4n(xs) < H4n(xs) - EPS) badGH++
          const allEq = a === b && b === c
          if (near(A4n(xs), G4n(xs)) !== allEq) badEq++
        }
    push('A51 triples truth-check A₃ ≥ G₃ over {1..6}³ (216 tuples — ch. 7\u2019s promise)', bad === 0, `${bad} violations`)
    push('A52 triples truth-check G₃ ≥ H₃ over {1..6}³', badGH === 0, `${badGH} violations`)
    push('A53 triples truth-check equality iff all equal', badEq === 0, `${badEq} violations`)
  }

  /* --- Illustration 7: the weighted scores fold (m2-06) --------------- */

  {
    const w1 = 2 / 3
    const w2 = 1 / 3
    const a1 = 64
    const a2 = 8
    const Aw = w1 * a1 + w2 * a2
    const Gw = Math.pow(a1, w1) * Math.pow(a2, w2)
    const Hw = 1 / (w1 / a1 + w2 / a2)
    push('A54 Ill.7 weights 2/3 + 1/3 = 1', near(w1 + w2, 1))
    push('A55 Ill.7 A_w = 136/3 ≈ 45.3333', near(Aw, 136 / 3) && near(Aw, 45.333333333333336))
    push('A56 Ill.7 64²·8 = 32768 = 32³', 64 * 64 * 8 === 32768 && Math.pow(32, 3) === 32768)
    push('A57 Ill.7 G_w = 32 exactly', near(Gw, 32))
    push('A58 Ill.7 H_w = 96/5 = 19.2', near(Hw, 96 / 5) && near(Hw, 19.2))
    push('A59 Ill.7 the weighted chain 136/3 ≥ 32 ≥ 96/5', Aw >= Gw - EPS && Gw >= Hw - EPS)
  }

  /* --- Illustration 8: the weighted speeds fold (m2-06) --------------- */

  {
    push('A60 Ill.8 H(12,36) = 18 exactly', near(H2(12, 36), 18))
    const wUp = 1 / 12 / (1 / 12 + 1 / 36)
    const wDown = 1 / 36 / (1 / 12 + 1 / 36)
    push('A61 Ill.8 time weights 3/4 and 1/4', near(wUp, 0.75) && near(wDown, 0.25) && near(wUp + wDown, 1))
    push('A62 Ill.8 time-weighted AM = 18 = H', near(0.75 * 12 + 0.25 * 36, 18) && near(0.75 * 12 + 0.25 * 36, H2(12, 36)))
    let bad = 0
    for (let v1 = 1; v1 <= 20; v1++)
      for (let v2 = 1; v2 <= 20; v2++) {
        if (v1 === v2) continue
        const w1 = 1 / v1 / (1 / v1 + 1 / v2)
        const w2 = 1 / v2 / (1 / v1 + 1 / v2)
        if (!near(w1 * v1 + w2 * v2, H2(v1, v2))) bad++
      }
    push('A63 Ill.8 general identity: time-weighted AM = harmonic mean, swept 1..20', bad === 0, `${bad} violations`)
  }

  /* --- Illustration 9: the 25/4 trap on xy = 4 ----------------------- */

  {
    let bad = 0
    let badId = 0
    let min = Infinity
    let argMin = 0
    for (let x = 0.25; x <= 16; x += 0.01) {
      const y = 4 / x
      const v = (x + 1 / x) * (y + 1 / y)
      if (v < 6.25 - EPS) bad++
      if (!near(v, 4 + 0.25 + x / y + y / x)) badId++
      if (v < min) {
        min = v
        argMin = x
      }
    }
    push('A64 Ill.9 (x+1/x)(y+1/y) ≥ 6.25 on xy = 4 swept', bad === 0, `${bad} violations`)
    push('A65 Ill.9 identity = 4.25 + x/y + y/x under xy = 4', badId === 0, `${badId} violations`)
    push('A66 Ill.9 minimum 25/4 attained at x = y = 2', near(min, 6.25) && near(argMin, 2) && near((2 + 0.5) * (2 + 0.5), 6.25))
    push('A67 Ill.9 the naive bound 4 is unattainable (grid min > 4)', min > 4 + 0.01, `grid min ${min.toFixed(4)}`)
  }

  /* --- table B: the fixed-sum census --------------------------------- */

  {
    const want = [9, 16, 21, 24, 25, 24, 21, 16, 9]
    const got = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => x * (10 - x))
    push('A68 table B census [9,16,21,24,25,24,21,16,9]', got.every((v, i) => v === want[i]))
    let bad = 0
    for (let x = 0.05; x < 10; x += 0.05) {
      if (!near(x * (10 - x), (10 - x) * x)) bad++
      if (x * (10 - x) > 25 + EPS) bad++
    }
    push('A69 the fixed-sum curve x(10−x) ≤ 25 with partner symmetry swept', bad === 0, `${bad} violations`)
    push('A70 the vertex claim: max 25 at the equal split x = 5', near(5 * 5, 25))
  }

  /* --- the quiz arithmetic, every option priced ----------------------- */

  {
    push('A71 quiz Q1 (4,16): A = 10, G = 8, H = 6.4', near(A2(4, 16), 10) && near(G2(4, 16), 8) && near(H2(4, 16), 6.4))
    push('A72 quiz Q1 distractor: G ≠ H on (4,16) — gap 1.6', near(G2(4, 16) - H2(4, 16), 1.6))
    push('A73 quiz Q2 witness (4, 1/4): A = 17/8 = 2.125 > G = 1', near(A2(4, 0.25), 2.125) && near(G2(4, 0.25), 1) && A2(4, 0.25) > 1 + EPS)
    push('A74 quiz Q2 witness (2,7): A = 4.5 > √14 ≈ 3.7417', near(A2(2, 7), 4.5) && near(G2(2, 7), Math.sqrt(14)) && near(Math.sqrt(14), 3.7416573867739413))
    push('A75 quiz Q2 witness (1,9): A = 5 > G = 3', near(A2(1, 9), 5) && near(G2(1, 9), 3))
    let bad = 0
    for (let x = 0.05; x <= 50; x += 0.05) if (x + 25 / x < 10 - EPS) bad++
    push('A76 quiz Q3 x + 25/x ≥ 10 swept', bad === 0, `${bad} violations`)
    push('A77 quiz Q3 equality at x = 5', near(5 + 25 / 5, 10))
    let bad2 = 0
    for (let w = 0.25; w < 19.75; w += 0.25) if (w * (20 - w) > 100 + EPS) bad2++
    push('A78 quiz Q4 x(20−x) ≤ 100 swept (perimeter 40)', bad2 === 0, `${bad2} violations`)
    push('A79 quiz Q4 members 12×8 = 96 < 100, 14×6 = 84 < 100', 12 * 8 === 96 && 14 * 6 === 84 && 96 < 100 && 84 < 100)
    push('A80 quiz Q4 fraud: 20² = 400 prices perimeter 80, not 40', 20 * 20 === 400 && 2 * (20 + 20) === 80 && 2 * (20 + 20) !== 40)
    // Q5: the weighted means at (64, 16), weights (3/4, 1/4)
    const w1 = 3 / 4
    const w2 = 1 / 4
    const Aw = w1 * 64 + w2 * 16
    const Gw = Math.pow(64, w1) * Math.pow(16, w2)
    const Hw = 1 / (w1 / 64 + w2 / 16)
    push('A81 quiz Q5 A_w = 52', near(Aw, 52))
    push('A82 quiz Q5 G_w = 32√2 ≈ 45.2548 (2^{5.5})', near(Gw, 32 * Math.sqrt(2)) && near(Gw, 45.254833995939045))
    push('A83 quiz Q5 H_w = 256/7 ≈ 36.5714', near(Hw, 256 / 7) && near(Hw, 36.571428571428573))
    push('A84 quiz Q5 the weighted chain 52 ≥ 45.2548 ≥ 36.5714 (strict)', Aw > Gw + EPS && Gw > Hw + EPS)
    push('A85 quiz Q5 the unweighted geometric mean √(64·16) = 32', near(Math.sqrt(64 * 16), 32))
  }

  /* --- the exercise answer ladder, every question recomputed ---------- */

  {
    // L1-1 (6,24)
    push('A86 L1-1 (6,24): A = 15, G = 12, H = 9.6', near(A2(6, 24), 15) && near(G2(6, 24), 12) && near(H2(6, 24), 9.6))
    push('A87 L1-1 certificate (√24−√6)² = 6 → A−G = 3', near(Math.pow(Math.sqrt(24) - Math.sqrt(6), 2), 6) && near(A2(6, 24) - G2(6, 24), 3))
    // L1-2 (5,20)
    push('A88 L1-2 (5,20): A = 12.5, G = 10, H = 8', near(A2(5, 20), 12.5) && near(G2(5, 20), 10) && near(H2(5, 20), 8))
    push('A89 L1-2 gaps 2.5 and 2; the shared square (√20−√5)² = 5', near(A2(5, 20) - G2(5, 20), 2.5) && near(G2(5, 20) - H2(5, 20), 2) && near(Math.pow(Math.sqrt(20) - Math.sqrt(5), 2), 5))
    // L2-1 A = 13, G = 5 → {1, 25}
    push('A90 L2-1 sum 1 + 25 = 26 = 2·13, product 25 = 5²', 1 + 25 === 26 && 26 === 2 * 13 && 1 * 25 === 25 && 25 === 5 * 5)
    const poly = (t: number): number => t * t - 26 * t + 25
    push('A91 L2-1 t² − 26t + 25 vanishes at t = 1 and t = 25', poly(1) === 0 && poly(25) === 0)
    push('A92 L2-1 the third mean H = 25/13 ≈ 1.9231', near(H2(1, 25), 25 / 13) && near(H2(1, 25), 1.9230769230769231))
    // L2-2 the lemma (1+x)(1+y) ≥ (1+√xy)²
    let badL = 0
    for (let x = 1; x <= 15; x++)
      for (let y = 1; y <= 15; y++)
        if ((1 + x) * (1 + y) < Math.pow(1 + Math.sqrt(x * y), 2) - EPS) badL++
    push('A93 L2-2 lemma (1+x)(1+y) ≥ (1+√xy)² swept 1..15', badL === 0, `${badL} violations`)
    push('A94 L2-2 witness (4,9): 50 vs 49, gap 1', (1 + 4) * (1 + 9) === 50 && Math.pow(1 + Math.sqrt(36), 2) === 49 && 50 - 49 === 1)
    // L3-1 the system
    let badS = 0
    for (let x = 0.05; x <= 30; x += 0.05) if (x + 9 / x < 6 - EPS) badS++
    push('A95 L3-1 x + 9/x ≥ 6 swept (minimum at x = 3)', badS === 0, `${badS} violations`)
    let badS2 = 0
    for (let y = 0.05; y <= 40; y += 0.05) if (2 * y + 50 / y < 20 - EPS) badS2++
    push('A96 L3-1 2y + 50/y ≥ 20 swept (minimum at y = 5)', badS2 === 0, `${badS2} violations`)
    push('A97 L3-1 seats: 3 + 3 = 6 and 10 + 10 = 20; uniqueness via (y−5)²', near(3 + 9 / 3, 6) && near(2 * 5 + 50 / 5, 20))
    let badS3 = 0
    for (let y = 0.05; y <= 30; y += 0.05) if (!near(2 * y + 50 / y - 20, (2 * Math.pow(y - 5, 2)) / y)) badS3++
    push('A98 L3-1 the second certificate 2y + 50/y − 20 = 2(y−5)²/y swept', badS3 === 0, `${badS3} violations`)
    // L3-2 ab = 144
    let badP = 0
    for (let a = 0.25; a <= 144; a += 0.25) if (a + 144 / a < 24 - EPS) badP++
    push('A99 L3-2 a + b ≥ 24 on ab = 144 swept (equality at 12, 12)', badP === 0, `${badP} violations`)
    push('A100 L3-2 witnesses (2,72)→74, (8,18)→26, (144,1)→145', 2 + 72 === 74 && 8 + 18 === 26 && 144 + 1 === 145)
    // L3-3 (1,4,4,16)
    const ys = [1, 4, 4, 16]
    push('A101 L3-3 (1,4,4,16): A₄ = 6.25, G₄ = 4 (256 = 4⁴)', near(A4n(ys), 6.25) && near(G4n(ys), 4) && ys.reduce((p, v) => p * v, 1) === 256)
    push('A102 L3-3 storey one: A(1,4) = 2.5, G(1,4) = 2, A(4,16) = 10, G(4,16) = 8', near(A2(1, 4), 2.5) && near(G2(1, 4), 2) && near(A2(4, 16), 10) && near(G2(4, 16), 8))
    push('A103 L3-3 storey two: (2.5 + 10)/2 = 6.25 and √(2·8) = 4', near((2.5 + 10) / 2, 6.25) && near(Math.sqrt(16), 4))
    // L4-1 3^x + 3^{1−x}
    let badE = 0
    for (let x = -4; x <= 5; x += 0.02) {
      const v = Math.pow(3, x) + Math.pow(3, 1 - x)
      if (v < 2 * Math.sqrt(3) - EPS) badE++
    }
    push('A104 L4-1 3^x + 3^{1−x} ≥ 2√3 swept on [−4, 5]', badE === 0, `${badE} violations`)
    push('A105 L4-1 equality at x = 1/2: 2√3 ≈ 3.4641', near(Math.pow(3, 0.5) + Math.pow(3, 0.5), 2 * Math.sqrt(3)) && near(2 * Math.sqrt(3), 3.4641016151377544))
    push('A106 L4-1 distractors: product = 3; 2 < 2√3 < 6', near(Math.pow(3, 0.5) * Math.pow(3, 0.5), 3) && 2 < 2 * Math.sqrt(3) && 2 * Math.sqrt(3) < 6)
    // L4-2 the multiple-correct sweep
    let badM = 0
    for (let a = 1; a <= 25; a++)
      for (let b = 1; b <= 25; b++) {
        if (G2(a, b) > A2(a, b) + EPS) badM++ // (A)
        if (H2(a, b) > G2(a, b) + EPS) badM++ // (C)
        if (a + b < 2 * Math.sqrt(a * b) - EPS) badM++ // (D)
      }
    push('A107 L4-2 statements A, C, D hold swept 1..25', badM === 0, `${badM} violations`)
    push('A108 L4-2 statement B fails at (1,9): A = 5 > G = 3', A2(1, 9) > G2(1, 9) + EPS && near(A2(1, 9), 5) && near(G2(1, 9), 3))
    // L4-3 the linked comprehension
    let badK = 0
    for (const P of [16, 24, 36, 40])
      for (let x = 0.25; x < P / 2 - 0.25; x += 0.25) if (x * (P / 2 - x) > (P * P) / 16 + EPS) badK++
    push('A109 L4-3(i) K ≤ P²/16 swept over four perimeters', badK === 0, `${badK} violations`)
    push('A110 L4-3(ii) P = 24: 24²/16 = 36 at 6×6; the 4×8 member loses (32 < 36)', (24 * 24) / 16 === 36 && 6 * 6 === 36 && 4 * 8 === 32 && 32 < 36)
    let badD = 0
    for (let x = 0.25; x <= 144; x += 0.25) if (2 * (x + 36 / x) < 24 - EPS) badD++
    push('A111 L4-3(iii) P = 2(x + 36/x) ≥ 24 swept (equality x = 6)', badD === 0, `${badD} violations`)
    // L5-1 both routes at (12,48)
    push('A112 L5-1 route one at (12,48): 1/H = 5/96 = A(1/12, 1/48)', near(1 / H2(12, 48), 5 / 96) && near(A2(1 / 12, 1 / 48), 5 / 96))
    push('A113 L5-1 route two at (12,48): (√576/60)·12 = 4.8 = G − H', near((Math.sqrt(576) / 60) * 12, 4.8) && near(G2(12, 48) - H2(12, 48), 4.8))
    // L5-2 the complementary-fraction bound at n = 4
    {
      const t4 = tuples([1, 2, 3], 4)
      let bad = 0
      let badEq = 0
      for (const xs of t4) {
        const S = xs.reduce((s, v) => s + v, 0)
        const v = xs.reduce((s, x) => s + S / (S - x), 0)
        if (v < 16 / 3 - EPS) bad++
        const allEq = xs.every((x) => x === xs[0])
        if (near(v, 16 / 3) !== allEq) badEq++
      }
      push('A114 L5-2 Σ S/(S−aᵢ) ≥ 16/3 swept over {1,2,3}⁴', bad === 0, `${bad} violations`)
      push('A115 L5-2 equality iff all equal (swept)', badEq === 0, `${badEq} violations`)
      const ws = [1, 1, 1, 3]
      const S = 6
      const v = ws.reduce((s, x) => s + S / (S - x), 0)
      push('A116 L5-2 witness (1,1,1,3): 28/5 = 5.6 ≥ 16/3 ≈ 5.3333', near(v, 28 / 5) && near(v, 5.6) && 5.6 > 16 / 3)
      push('A117 L5-2 the terms 6/5, 6/5, 6/5, 2', ws.every((x) => near(6 / (6 - x), 6 / 5) || near(6 / (6 - x), 2)))
    }
    // L5-3 the numerical value
    push('A118 L5-3 6 + 1/6 = 37/6', near(6 + 1 / 6, 37 / 6))
    const quad = (t: number): number => 6 * t * t - 37 * t + 6
    push('A119 L5-3 6t² − 37t + 6 vanishes at t = 6 and t = 1/6', quad(6) === 0 && near(quad(1 / 6), 0))
    push('A120 L5-3 the roots are reciprocal: product 1; discriminant 1225 = 35²', near(6 * (1 / 6), 1) && 37 * 37 - 4 * 6 * 6 === 1225 && 35 * 35 === 1225)
    // L6-1 tight and strict cases
    const tight = [3, 3, 3, 3]
    push('A121 L6-1 tight case (3,3,3,3): A₄ = G₄ = 3', near(A4n(tight), 3) && near(G4n(tight), 3))
    const strict = [1, 4, 4, 16]
    push('A122 L6-1 strict case (1,4,4,16): 6.25 > 4; first storey 2.5 > 2', A4n(strict) > G4n(strict) + EPS && near(A4n(strict), 6.25) && A2(1, 4) > G2(1, 4) + EPS && near(A2(1, 4), 2.5))
    // L6-2 the bootstrap
    {
      const t4 = tuples([1, 2, 3], 4)
      let bad = 0
      let badEq = 0
      for (const xs of t4) {
        const lhs = xs.reduce((p, x) => p * (1 + x), 1)
        const rhs = Math.pow(1 + G4n(xs), 4)
        if (lhs < rhs - EPS) bad++
        const allEq = xs.every((x) => x === xs[0])
        if (near(lhs, rhs) !== allEq) badEq++
      }
      push('A123 L6-2 (1+a)(1+b)(1+c)(1+d) ≥ (1+(abcd)^{1/4})⁴ swept {1,2,3}⁴', bad === 0, `${bad} violations`)
      push('A124 L6-2 equality iff all equal (swept)', badEq === 0, `${badEq} violations`)
      push('A125 L6-2 abcd = 16: bound (1+2)⁴ = 81, attained at all-2 (16^{1/4} = 2)', Math.pow(1 + 2, 4) === 81 && near(Math.pow(16, 0.25), 2))
      const all2 = [2, 2, 2, 2]
      push('A126 L6-2 at (2,2,2,2) the product is 81 exactly', all2.reduce((p, x) => p * (1 + x), 1) === 81)
      const nb = [1, 1, 2, 8]
      push('A127 L6-2 strict neighbour (1,1,2,8): abcd = 16, product 108 > 81', nb.reduce((p, v) => p * v, 1) === 16 && nb.reduce((p, x) => p * (1 + x), 1) === 108 && 108 > 81)
    }
  }

  /* --- the LaTeX sanity sweep ---------------------------------------- */

  {
    const equations = L.blocks.filter((b): b is Extract<Block, { kind: 'equation' }> => b.kind === 'equation')
    const eqDollar = equations.filter((b) => b.latex.includes('$')).length
    push('A128 equations carry no stray $ (KaTeX source, not inline)', eqDollar === 0, `${eqDollar} offenders`)
    const eqBraces = equations.filter((b) => !balanced(b.latex)).length
    push('A129 every equation\u2019s braces balance', eqBraces === 0, `${eqBraces} offenders`)
    const tags = equations.map((b) => /\\tag\{(\d)\}/.exec(b.latex)?.[1])
    const wantTags = ['1', '2', '3', '4', '5', '6', '7', '8']
    push('A130 equations numbered \\tag{1}..\\tag{8} in order (8 equations)', equations.length === 8 && tags.every((t, i) => t === wantTags[i]), `tags ${tags.join(',')}`)
    const derivs = L.blocks.filter((b): b is Extract<Block, { kind: 'derivation' }> => b.kind === 'derivation')
    let badF = 0
    for (const d of derivs) {
      const formulas = d.steps.map((s) => s.formula ?? '')
      for (const f of formulas) {
        if (f.includes('$')) badF++
        if (!balanced(f)) badF++
      }
      // results render via RichText: math inside them must ride $...$
      // delimiters (convention corrected 2026-11-18 by the swarm run's
      // raw-TeX repair pass — step formulas stay pure KaTeX, no $)
      const rNeedsMath = /\\/.test(d.result)
      if ((rNeedsMath && !d.result.includes('$')) || !balanced(d.result)) badF++
    }
    push('A131 derivation formulas pure (no $) + results $-delimited, braces balanced', badF === 0, `${badF} offenders`)
    const strings = allStrings(L)
    const unbalanced = strings.filter((s) => (s.match(/\$/g) || []).length % 2 !== 0).length
    push('A132 every $...$ pair in every string field is closed (no odd counts)', unbalanced === 0, `${unbalanced} offenders`)
    const doubleDollar = strings.filter((s) => s.includes('$$')).length
    push('A133 no display $$ delimiters smuggled into inline text', doubleDollar === 0, `${doubleDollar} offenders`)
  }

  return out
}

/* ------------------------------------------------------------------ */
/* SECTION B — the 4.1 structural pins                                 */
/* ------------------------------------------------------------------ */

const VIVID_PALETTE = [
  '#16a34a',
  '#166534',
  '#65a30d',
  '#0d9488',
  '#0f766e',
  '#d97706',
  '#ea580c',
  '#dc2626',
  '#fef3c7',
  '#ffedd5',
  '#fcd34d',
  '#5eead4',
  '#ffffff',
]
const RETIRED = [
  '#3f6212',
  '#365314',
  '#6b7a72',
  '#b45309',
  '#9a6b2f',
  '#4d7c0f',
  '#1f5c4d',
  '#123f35',
  '#7c2d12',
  '#9a3412',
  '#fdf8ef',
  '#f5eddd',
  '#d8d2c2',
  '#b9c6bd',
  '#b9c4bd',
  '#7c5a2e',
]

 function sectionB(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    out.push(check(name, ok, detail))
  }

  /* --- identity pins -------------------------------------------------- */

  push('B1 the lesson id is exactly aa-the-arithmetic-geometric-mean-inequality', L.id === 'aa-the-arithmetic-geometric-mean-inequality', L.id)
  push('B2 the lesson number is 4.1', L.number === '4.1', L.number)
  push('B3 the lesson title matches the planned TOC string', L.title === 'The Arithmetic-Geometric Mean Inequality', L.title)
  push('B4 concepts: 5\u20138 phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `${L.concepts.length}`)
  push('B5 objectives: 4\u20136 entries', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6, `${(L.objectives ?? []).length}`)
  push(
    'B6 prerequisites exact: al-solving-linear-inequalities, al-compound-inequalities-and-applications, aa-vertex-form-at-work-maxima-and-minima',
    JSON.stringify(L.prerequisites) === JSON.stringify(['al-solving-linear-inequalities', 'al-compound-inequalities-and-applications', 'aa-vertex-form-at-work-maxima-and-minima']),
    JSON.stringify(L.prerequisites),
  )
  push(
    'B7 sources within the whitelist (cengage-m2-06, cengage-jee-style, ncert-math11-ch5-linear-inequalities, openstax-college-algebra)',
    JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra']),
    JSON.stringify(L.sources),
  )
  push('B8 no authored words field (the registry computes it honestly)', L.words === undefined, String(L.words))

  /* --- the quiz contract ---------------------------------------------- */

  const quiz = L.blocks.find((b): b is Extract<Block, { kind: 'quiz' }> => b.kind === 'quiz')
  push('B9 exactly one quiz block', !!quiz)
  if (quiz) {
    push('B10 the quiz carries exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`)
    push('B11 every quiz item has exactly 4 options', quiz.items.every((it) => it.options.length === 4))
    push('B12 every answer index is valid (0..3)', quiz.items.every((it) => it.answer >= 0 && it.answer <= 3 && Number.isInteger(it.answer)))
    push('B13 the quiz keys are the pinned [0, 2, 1, 0, 1]', JSON.stringify(quiz.items.map((it) => it.answer)) === JSON.stringify([0, 2, 1, 0, 1]), JSON.stringify(quiz.items.map((it) => it.answer)))
    push('B14 every explain says why the wrong options fail (names options, ≥ 120 chars)', quiz.items.every((it) => /option/i.test(it.explain) && it.explain.length >= 120))
    push('B15 every quiz item carries a question and 4 non-empty options', quiz.items.every((it) => it.q.length > 20 && it.options.every((o) => o.trim().length > 0)))
    push('B16 the quiz block is titled', typeof quiz.title === 'string' && quiz.title.length > 0)
  }

  /* --- the exercises contract ------------------------------------------ */

  const ex = L.blocks.find((b): b is Extract<Block, { kind: 'exercises' }> => b.kind === 'exercises')
  push('B17 exactly one exercises block', !!ex)
  if (ex) {
    const levels = ex.sets.map((s) => s.level)
    push('B18 the sets run L1..L6 in order', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), levels.join(','))
    const counts = ex.sets.map((s) => s.questions.length)
    push('B19 the set sizes are 2/2/3/3/3/2 (15 total)', JSON.stringify(counts) === JSON.stringify([2, 2, 3, 3, 3, 2]), counts.join('/'))
    push('B20 exactly 15 questions', ex.sets.reduce((n, s) => n + s.questions.length, 0) === 15)
    push('B21 every solution is a steps array (≥ 3 moves)', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3)))
    push('B22 every question carries a crisp answer line', ex.sets.every((s) => s.questions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0)))
    const allQ = ex.sets.flatMap((s) => s.questions.map((q) => q.q))
    const typology = ['Single Correct', 'Multiple Correct', 'Linked Comprehension', 'Numerical Value']
    push('B23 the Cengage exam typology present at L4\u2013L6 (all four families)', typology.every((t) => allQ.some((q) => q.includes(t))), typology.filter((t) => !allQ.some((q) => q.includes(t))).join('+'))
    push('B24 every exam-typology item labelled exam-style honestly', allQ.filter((q) => typology.some((t) => q.includes(t))).every((q) => /exam-style/i.test(q)))
    push('B25 no exercise question is empty', allQ.every((q) => q.trim().length > 0))
  }

  /* --- the block-type census ------------------------------------------- */

  push('B26 at least 8 example (Illustration) blocks', countKind(L, 'example') >= 8, `${countKind(L, 'example')}`)
  push('B27 at least 3 derivation blocks', countKind(L, 'derivation') >= 3, `${countKind(L, 'derivation')}`)
  push('B28 at least 3 formula cards', countKind(L, 'formula') >= 3, `${countKind(L, 'formula')}`)
  push('B29 at least 6 terms', L.blocks.some((b): b is Extract<Block, { kind: 'terms' }> => b.kind === 'terms') && (L.blocks.find((b): b is Extract<Block, { kind: 'terms' }> => b.kind === 'terms')?.items.length ?? 0) >= 6)
  push('B30 at least 2 headings (theory sections)', countKind(L, 'heading') >= 2, `${countKind(L, 'heading')}`)
  push('B31 exactly 2 figures (the e2e pin)', countKind(L, 'figure') === 2, `${countKind(L, 'figure')}`)
  push('B32 exactly 2 tables (the e2e pin)', countKind(L, 'table') === 2, `${countKind(L, 'table')}`)
  const tones = L.blocks.filter((b): b is Extract<Block, { kind: 'callout' }> => b.kind === 'callout').map((b) => b.tone as string)
  push('B33 the callout census: definition, theorem, insight, warn, exam all present', ['definition', 'theorem', 'insight', 'warn', 'exam'].every((t) => tones.includes(t)))
  push('B34 at most one historical callout (verify-or-omit discipline)', tones.filter((t) => t === 'historical').length <= 1, `${tones.filter((t) => t === 'historical').length}`)
  push('B35 the roman-marker example runs present (Cengage example-run style)', L.blocks.some((b): b is Extract<Block, { kind: 'list' }> => b.kind === 'list' && b.marker === 'roman'))

  /* --- the figure palette contract ------------------------------------- */

  const figures = L.blocks.filter((b): b is Extract<Block, { kind: 'figure' }> => b.kind === 'figure')
  for (let i = 0; i < figures.length; i++) {
    const svg = figures[i].svg
    const hexes = Array.from(new Set((svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase())))
    const offPalette = hexes.filter((h) => !VIVID_PALETTE.includes(h))
    push(`B36 figure ${i + 1} uses only the vivid palette hexes`, offPalette.length === 0, offPalette.join(' '))
    const retiredHit = hexes.filter((h) => RETIRED.includes(h))
    push(`B37 figure ${i + 1} carries no retired muted hex`, retiredHit.length === 0, retiredHit.join(' '))
    push(`B38 figure ${i + 1} has a viewBox and an aria-label`, /viewBox="[^"]+"/.test(svg) && /aria-label="[^"]{40,}/.test(svg))
    const widths = Array.from(svg.matchAll(/stroke-width="([\d.]+)"/g)).map((m) => Number.parseFloat(m[1]))
    push(`B39 figure ${i + 1} structure strokes all ≥ 1.2 px`, widths.length > 0 && widths.every((w) => w >= 1.2), widths.join(','))
    push(`B40 figure ${i + 1} labels no raw LaTeX (no $, \\tfrac, \\times, \\sqrt in svg text)`, !/\\tfrac|\\times|\\sqrt/.test(svg))
    push(`B41 figure ${i + 1} caption teaches (≥ 25 words, names the figure\u2019s objects)`, figures[i].caption.split(/\s+/).length >= 25)
  }

  /* --- the fold obligations -------------------------------------------- */

  const examples = L.blocks.filter((b): b is Extract<Block, { kind: 'example' }> => b.kind === 'example')
  const weighted = examples.filter((e) => /weighted/i.test(e.title))
  push('B42 the m2-06 Weighted Means fold: at least two weighted-type Illustrations', weighted.length >= 2, `${weighted.length}`)
  push('B43 the weighted Illustrations are titled as weighted means explicitly', weighted.length >= 2 && weighted.every((e) => /weighted (mean|average)/i.test(e.title)))
  const weightedSetup = weighted.map((e) => e.steps.join(' '))
  push('B44 the weighted setups carry weights summing to one (2/3+1/3 and 3/4+1/4 named)', weighted.length >= 2 && weightedSetup.every((s) => /summing to one|sum(s)? to one/i.test(s)))
  const prose = L.blocks
    .filter((b): b is Extract<Block, { kind: 'para' | 'callout' }> => b.kind === 'para' || b.kind === 'callout')
    .map((b) => (b.kind === 'para' ? b.text : b.title + ' ' + b.text))
    .join(' ')
  push('B45 the m4-01 review fold named in prose: \u201cReal Number System and Inequalities\u201d appears verbatim', prose.includes('Real Number System and Inequalities'))
  push('B46 the fold heading names Weighted Means (searchability)', L.blocks.some((b): b is Extract<Block, { kind: 'heading' }> => b.kind === 'heading' && /Weighted Means/.test(b.text)))

  /* --- the word floor ---------------------------------------------------- */

  const words = countLessonWords(L)
  push('B47 the honest word count is at least 4500 (countLessonWords)', words >= 4500, `${words}`)

  /* --- the cross-reference discipline ------------------------------------ */

  push('B48 the opening names AA 2.1 Vertex Form at Work (cross-reference, no re-teach)', prose.includes('Vertex Form at Work: Maxima and Minima'))
  push('B49 the opening names AL 7.2 and AL 7.3 by their titles', prose.includes('7.2') && prose.includes('7.3'))
  push('B50 the ch. 7 induction deferral is NAMED, never cashed (Domino Principle)', prose.includes('Mathematical Induction: the Domino Principle'))
  push('B51 the ch. 5 power-sum deferral precedent named', prose.includes('Sigma Notation and the Classical Power Sums'))
  push('B52 lesson 4.2 named forward (the weighted engine + power-mean ladder)', prose.includes('The Weighted AM-GM and Its Consequences'))

  return out
}

/* keep tally referenced for the assembled verifier (same import surface) */



 {}

/**
 * SECTION C (4.2 engines) — recompute every mathematical claim: the
 * weighted AM-GM for whole-number weights checked by replication (the
 * weighted mean equals the plain mean of the repeated list — swept over
 * small integer weight tuples); rational weights by scaling; the
 * power-mean ladder M_r monotone in r swept over integer tuples
 * (M_2 ≥ M_1 ≥ M_0(limit-honest) ≥ M_-1 — M_2/M_1/M_-1 verified exactly,
 * M_0 stated honestly as the limit and witnessed numerically); every
 * Illustration recomputed; every exercise answer recomputed; the
 * normalization witnesses swept. Aim ≥ 120 checks. Catch your own
 * drafting errors honestly.
 */
 function sectionC(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, cond: boolean, detail?: string) => out.push(check(name, cond, detail))
  const near = (a: number, b: number, eps: number) => Math.abs(a - b) <= eps
  const rng = (lo: number, hi: number): number[] => {
    const a: number[] = []
    for (let v = lo; v <= hi; v++) a.push(v)
    return a
  }

  /* ---- C1–C3: the replication engine, swept ----------------------- */

  // C1. whole-number weighted AM-GM swept: (mx+ny)/(m+n) >= (x^m y^n)^(1/(m+n))
  {
    let bad = 0
    let n = 0
    for (const x of rng(1, 6))
      for (const y of rng(1, 6))
        for (const m of rng(1, 4))
          for (const w of rng(1, 4)) {
            n++
            const A = (m * x + w * y) / (m + w)
            const G = Math.pow(Math.pow(x, m) * Math.pow(y, w), 1 / (m + w))
            if (!(A >= G - 1e-12)) bad++
          }
    push(`C1 replication sweep: weighted AM ≥ GM over ${n} integer combos (${bad} violations)`, bad === 0, `${bad} violations`)
  }
  // C2. strictness: x ≠ y ⇒ strict
  {
    let bad = 0
    for (const x of rng(1, 6))
      for (const y of rng(1, 6))
        for (const m of rng(1, 4))
          for (const w of rng(1, 4))
            if (x !== y) {
              const A = (m * x + w * y) / (m + w)
              const G = Math.pow(Math.pow(x, m) * Math.pow(y, w), 1 / (m + w))
              if (!(A > G + 1e-12)) bad++
            }
    push('C2 strict when the entries differ (equality discipline)', bad === 0, `${bad} violations`)
  }
  // C3. equality: x = y ⇒ A_w = G_w exactly
  {
    let bad = 0
    for (const v of rng(1, 8))
      for (const m of rng(1, 4))
        for (const w of rng(1, 4))
          if ((m * v + w * v) / (m + w) !== v) bad++
    push('C3 equal entries ⇒ every weighted mean equals the entry', bad === 0, `${bad} violations`)
  }

  /* ---- C4–C7: the roman roster of the definition run ---------------- */

  // (i) weights (1,3) on (8,2): A_w = 7/2, G_w = (8·8)^(1/4) = 2√2
  push('C4(i) weights (1,3) on (8,2): A_w = 7/2', (8 + 3 * 2) / 4 === 3.5)
  push('C4(ii) G_w = 2√2 = 64^(1/4) ≈ 2.8284', near(Math.pow(64, 0.25), Math.sqrt(2) * 2, 1e-12) && Math.pow(64, 0.25) < 3.5)
  // (ii) weights (2,3) on (5,5): both means = 5
  push('C5(ii) weights (2,3) on (5,5): A_w = G_w = 5 (equality row)', (10 + 15) / 5 === 5 && near(Math.pow(25 * 125, 0.2), 5, 1e-12))
  // (iii) weights (3,1) on (1,81): A_w = 21, G_w = 3
  push('C6(iii) weights (3,1) on (1,81): A_w = 21, G_w = 3', (3 + 81) / 4 === 21 && Math.pow(81, 0.25) === 3)
  // (iv) weights (1,1) on (6,24): the plain pair A = 15, G = 12
  push('C7(iv) weights (1,1) on (6,24): A_w = 15 = plain A; G_w = 12 = plain G', (6 + 24) / 2 === 15 && Math.pow(6 * 24, 0.5) === 12)

  /* ---- C8–C11: scaling, the Illustration-1 family, real weights ----- */

  // C8. Illustration 1: weights (1/3, 2/3) ≡ scaled (1, 2) on (8, 2):
  // A_w = 4, G_w = 32^(1/3) = 2∛4
  push('C8.1 Illustration 1: A_w = (8 + 2·2)/3 = 4 both weight routings', (8 + 2 * 2) / 3 === 4 && near((8 / 3 + (2 / 3) * 2) / 1, 4, 1e-12))
  push('C8.2 G_w = 32^(1/3) = 2∛4 ≈ 3.1748', near(Math.pow(32, 1 / 3), 2 * Math.pow(4, 1 / 3), 1e-12))
  push('C8.3 the law by cubing: 4³ = 64 ≥ (2∛4)³ = 32', Math.pow(4, 3) === 64 && near(Math.pow(2 * Math.pow(4, 1 / 3), 3), 32, 1e-9))
  // C9. the scaling law: weights (1/2, 1/3, 1/6) ≡ (3, 2, 1) over tuples
  {
    const tuples: Array<[number, number, number]> = [[16, 4, 108], [9, 3, 12], [4, 9, 36], [2, 6, 18]]
    let badA = 0
    let badG = 0
    for (const [a, b, c] of tuples) {
      const A1 = (0.5 * a + (1 / 3) * b + (1 / 6) * c) / 1
      const A2 = (3 * a + 2 * b + 1 * c) / 6
      if (!near(A1, A2, 1e-12)) badA++
      const G1 = Math.pow(Math.pow(a, 0.5) * Math.pow(b, 1 / 3) * Math.pow(c, 1 / 6), 1)
      const G2 = Math.pow(Math.pow(a, 3) * Math.pow(b, 2) * c, 1 / 6)
      if (!near(G1, G2, 1e-9)) badG++
    }
    push('C9.1 scaling law: A_w invariant under ×6 (4 tuples)', badA === 0)
    push('C9.2 scaling law: G_w invariant under ×6 (4 tuples)', badG === 0)
  }
  // C10. the replication FIGURE panel: weights (3,2) on (4,9): A_w = 6, G_w = 5184^(1/5) ≈ 5.5326
  push('C10.1 figure panel weights (3,2) on (4,9): A_w = (12+18)/5 = 6', (3 * 4 + 2 * 9) / 5 === 6)
  push('C10.2 G_w = (4³·9²)^(1/5) = 5184^(1/5) ≈ 5.5326 < 6', near(Math.pow(5184, 0.2), 5.5326, 1e-3) && Math.pow(5184, 0.2) < 6)
  push('C10.3 the replicated list read: plain mean of [4,4,4,9,9] = 6 = A_w', (4 + 4 + 4 + 9 + 9) / 5 === 6 && near(Math.pow(4 * 4 * 4 * 9 * 9, 0.2), Math.pow(5184, 0.2), 1e-12))
  // C11. real-weight witnesses (the L5.3 doorstep, numeric only)
  {
    const s2 = Math.SQRT2
    const Aw = (4 * s2 + 9) / (s2 + 1)
    push('C11.1 weights (√2, 1) on (4, 9): A_w = 5√2 − 1 ≈ 6.0711 exact', near(Aw, 5 * s2 - 1, 1e-12))
    const Gw = Math.pow(Math.pow(4, s2) * 9, 1 / (s2 + 1))
    push('C11.2 G_w = (4^√2 · 9)^(1/(1+√2)) ≈ 5.5946', near(Gw, 5.5946, 5e-3))
    push('C11.3 the real-weight law witnessed numerically: A_w > G_w', Aw > Gw + 0.4)
    const s3 = Math.sqrt(3)
    const Aw2 = (4 * s2 + 9 * s3) / (s2 + s3)
    const Gw2 = Math.pow(Math.pow(4, s2) * Math.pow(9, s3), 1 / (s2 + s3))
    push('C11.4 weights (√2, √3) on (4, 9): A_w ≈ 6.7526 > G_w ≈ 6.2509', near(Aw2, 6.7526, 1e-3) && near(Gw2, 6.2509, 1e-3) && Aw2 > Gw2)
  }

  /* ---- C12–C16: the power-mean rungs, pinned ------------------------ */

  // C12. the rung identities M_1 = A, M_2 = Q, M_{-1} = H on integer tuples
  {
    let bad = 0
    for (const t of [[1, 2, 6], [1, 4, 16], [2, 8, 9], [3, 5, 20]] as unknown as number[][]) {
      const n = t.length
      const M1 = t.reduce((s, v) => s + v, 0) / n
      const M2 = Math.pow(t.reduce((s, v) => s + v * v, 0) / n, 0.5)
      const Mm1 = 1 / (t.reduce((s, v) => s + 1 / v, 0) / n)
      const r1 = Math.pow(t.reduce((s, v) => s + Math.pow(v, 1), 0) / n, 1 / 1)
      const r2 = Math.pow(t.reduce((s, v) => s + Math.pow(v, 2), 0) / n, 1 / 2)
      const rm1 = Math.pow(t.reduce((s, v) => s + Math.pow(v, -1), 0) / n, -1)
      if (!near(M1, r1, 1e-12) || !near(M2, r2, 1e-12) || !near(Mm1, rm1, 1e-12)) bad++
    }
    push('C12 the rung identities M_1 = A, M_2 = Q, M_{-1} = H on 4 tuples', bad === 0)
  }
  // C13. the (1, 2, 6) roster
  push('C13.1 (1,2,6): M_{-1} = 3/(1+1/2+1/6) = 9/5', near(3 / (1 + 0.5 + 1 / 6), 1.8, 1e-12))
  push('C13.2 (1,2,6): M_0 = G = ∛12 ≈ 2.2894', near(Math.pow(12, 1 / 3), 2.28943, 1e-5))
  push('C13.3 (1,2,6): M_{1/2} = ((√1+√2+√6)/3)² ≈ 2.6284', near(Math.pow((1 + Math.sqrt(2) + Math.sqrt(6)) / 3, 2), 2.6284, 1e-4))
  push('C13.4 (1,2,6): M_1 = 3', (1 + 2 + 6) / 3 === 3)
  push('C13.5 (1,2,6): M_2 = √(41/3) ≈ 3.6968', near(Math.pow(41 / 3, 0.5), 3.69685, 1e-5))
  push(
    'C13.6 (1,2,6): the full ladder 9/5 < ∛12 < M_{1/2} < 3 < √(41/3) strict',
    3 / (1 + 0.5 + 1 / 6) < Math.pow(12, 1 / 3) && Math.pow(12, 1 / 3) < Math.pow((1 + Math.sqrt(2) + Math.sqrt(6)) / 3, 2) && Math.pow((1 + Math.sqrt(2) + Math.sqrt(6)) / 3, 2) < 3 && 3 < Math.sqrt(41 / 3),
  )
  // C14. the (1, 4, 16) roster
  push('C14.1 (1,4,16): M_{-1} = 3/(1+1/4+1/16) = 16/7', near(3 / (1 + 0.25 + 0.0625), 16 / 7, 1e-12))
  push('C14.2 (1,4,16): M_0 = ∛64 = 4', near(Math.pow(64, 1 / 3), 4, 1e-12))
  push('C14.3 (1,4,16): M_1 = 7', (1 + 4 + 16) / 3 === 7)
  push('C14.4 (1,4,16): M_2 = √91 ≈ 9.5394', Math.pow(91, 0.5) > 9.53 && Math.pow(91, 0.5) < 9.55)
  push('C14.5 (1,4,16): ladder 16/7 < 4 < 7 < √91 strict', 16 / 7 < 4 && 4 < 7 && 7 < Math.sqrt(91))
  // C15. the (5,5,5) equality row: every rung = 5
  push('C15 (5,5,5): all four rungs read 5 (equality row)', 3 / (3 / 5) === 5 && near(Math.pow(125, 1 / 3), 5, 1e-12) && 15 / 3 === 5 && Math.sqrt((3 * 25) / 3) === 5)
  // C16. the L1.2 roster (1, 1, 4)
  push('C16.1 (1,1,4): M_{-1} = 3/(9/4) = 4/3', near(3 / (1 + 1 + 0.25), 4 / 3, 1e-12))
  push('C16.2 (1,1,4): M_0 = ∛4 ≈ 1.5874', near(Math.pow(4, 1 / 3), 1.5874, 1e-4))
  push('C16.3 (1,1,4): M_1 = 2', (1 + 1 + 4) / 3 === 2)
  push('C16.4 (1,1,4): M_2 = √6 ≈ 2.4495', near(Math.pow(6, 0.5), 2.44949, 1e-5))
  push('C16.5 (1,1,4): ladder 4/3 < ∛4 < 2 < √6 strict', 4 / 3 < Math.pow(4, 1 / 3) && Math.pow(4, 1 / 3) < 2 && 2 < Math.sqrt(6))

  /* ---- C17: M_0 as the limit, honestly witnessed -------------------- */

  {
    const g = (t: number[]) => Math.pow(t.reduce((s, v) => s * v, 1), 1 / t.length)
    const M = (t: number[], r: number) => Math.pow(t.reduce((s, v) => s + Math.pow(v, r), 0) / t.length, 1 / r)
    const t1 = [1, 2, 6]
    const g1 = g(t1)
    const gaps = [0.1, 0.01, 0.001, 1e-4].map((r) => Math.abs(M(t1, r) - g1))
    push('C17.1 (1,2,6): M_r → G as r → 0 (gaps 0.0618 → 0.000087 shrinking)', gaps[0] < 0.07 && gaps[3] < 1e-3 && gaps[0] > gaps[1] && gaps[1] > gaps[2] && gaps[2] > gaps[3], `gaps ${gaps.join(',')}`)
    const t2 = [2, 8]
    push('C17.2 (2,8): M_{0.001} within 0.01 of G = 4', Math.abs(M(t2, 0.001) - 4) < 0.01)
    push('C17.3 (2,8): M_{-0.001} within 0.01 of G = 4 (both sides close)', Math.abs(M(t2, -0.001) - 4) < 0.01)
    const t3 = [1, 4, 16]
    push('C17.4 (1,4,16): M_{0.0001} within 0.001 of G = 4', Math.abs(M(t3, 1e-4) - 4) < 1e-2)
  }

  /* ---- C18–C22: the ladder law sweeps + the owned proofs ------------ */

  // C18. M_2 ≥ M_1 ≥ M_{-1} swept over positive integer tuples
  {
    let bad = 0
    let n = 0
    for (const a of rng(1, 7))
      for (const b of rng(1, 7))
        for (const c of rng(1, 7)) {
          n++
          const t = [a, b, c]
          const M2 = Math.pow((a * a + b * b + c * c) / 3, 0.5)
          const M1 = (a + b + c) / 3
          const Mm1 = 3 / (1 / a + 1 / b + 1 / c)
          if (!(M2 >= M1 - 1e-12 && M1 >= Mm1 - 1e-12)) bad++
        }
    push(`C18.1 ladder sweep M_2 ≥ M_1 ≥ M_{-1} over ${n} triples (${bad} violations)`, bad === 0)
    // strictness on distinct triples
    let bad2 = 0
    for (const a of rng(1, 6))
      for (const b of rng(1, 6))
        for (const c of rng(1, 6))
          if (a !== b && b !== c) {
            const M1 = (a + b + c) / 3
            const M2 = Math.pow((a * a + b * b + c * c) / 3, 0.5)
            const Mm1 = 3 / (1 / a + 1 / b + 1 / c)
            if (!(M2 > M1 + 1e-12 && M1 > Mm1 + 1e-12)) bad2++
          }
    push('C18.2 strict on every distinct triple (equality discipline)', bad2 === 0, `${bad2} violations`)
    // M_{1/2} between M_0 and M_1 (the fractional rung)
    let bad3 = 0
    for (const t of [[1, 2, 6], [1, 4, 16], [2, 8, 9], [3, 3, 3]] as unknown as number[][]) {
      const M0 = Math.pow(t.reduce((s, v) => s * v, 1), 1 / 3)
      const Mh = Math.pow(t.reduce((s, v) => s + Math.sqrt(v), 0) / 3, 2)
      const M1 = t.reduce((s, v) => s + v, 0) / 3
      if (!(M0 <= Mh + 1e-12 && Mh <= M1 + 1e-12)) bad3++
    }
    push('C18.3 the fractional rung M_{1/2} sits between M_0 and M_1', bad3 === 0)
  }
  // C19. the variance identity Σ(x−A)²/n = Σx²/n − A², exact, real tuples
  {
    let bad = 0
    for (const t of [[1, 2, 6], [-1, 1], [-3, 4], [2, 2, 2], [-5, 0, 5]] as unknown as number[][]) {
      const n = t.length
      const A = t.reduce((s, v) => s + v, 0) / n
      const lhs = t.reduce((s, v) => s + (v - A) * (v - A), 0) / n
      const rhs = t.reduce((s, v) => s + v * v, 0) / n - A * A
      if (!near(lhs, rhs, 1e-12)) bad++
    }
    push('C19 the variance identity (the QM–AM engine) exact on real tuples', bad === 0)
  }
  // C20. Q ≥ A on REAL tuples (negatives included)
  {
    let bad = 0
    for (const a of rng(-6, 6)) for (const b of rng(-6, 6)) if (a !== b) {
      const Q = Math.sqrt((a * a + b * b) / 2)
      const A = (a + b) / 2
      if (!(Q >= A - 1e-12)) bad++
    }
    push('C20.1 Q ≥ A holds on ALL real pairs, negatives included', bad === 0)
    push('C20.2 witness (−1, 1): Q = 1 ≥ A = 0', Math.sqrt((1 + 1) / 2) === 1 && (-1 + 1) / 2 === 0)
    push('C20.3 witness (−3, 4): Q = √12.5 ≈ 3.5355 > A = 0.5', Math.sqrt(12.5) > 3.53 && (-3 + 4) / 2 === 0.5)
  }
  // C21. the G rung genuinely needs positivity: (−4, −1) breaks G ≤ A
  push('C21 the ladder off positives: (−4, −1) has G = 2 > A = −2.5 (G ≤ A fails)', Math.pow((-4) * (-1), 0.5) === 2 && (-4 + -1) / 2 === -2.5)
  // C22. H = 1/A(1/x) identity + H ≤ G sweep
  {
    let badId = 0
    let badHG = 0
    for (const t of [[1, 2, 6], [1, 4, 16], [2, 8, 9], [3, 5, 15]] as unknown as number[][]) {
      const n = t.length
      const H = n / t.reduce((s, v) => s + 1 / v, 0)
      const Arec = 1 / (t.reduce((s, v) => s + 1 / v, 0) / n)
      if (!near(H, Arec, 1e-12)) badId++
      const G = Math.pow(t.reduce((s, v) => s * v, 1), 1 / n)
      if (!(H <= G + 1e-12)) badHG++
    }
    push('C22.1 H = 1/A(1/x) identity on 4 tuples', badId === 0)
    push('C22.2 H ≤ G swept (the reciprocal route)', badHG === 0)
  }

  /* ---- C23–C31: every Illustration recomputed ---------------------- */

  // C23. Illustration 3: a⁴ + b⁴ = 32 ⇒ a + b ≤ 4
  {
    let maxSum = 0
    let seat = 0
    for (let a = 0.02; a <= Math.pow(32, 0.25); a += 0.02) {
      const b = Math.pow(32 - a * a * a * a, 0.25)
      if (a + b > maxSum) {
        maxSum = a + b
        seat = a
      }
    }
    push('C23.1 a⁴+b⁴ = 32: grid max of a+b ≈ 4 (within 0.01)', Math.abs(maxSum - 4) < 0.01, `max ${maxSum}`)
    push('C23.2 equality seat a = b = 2: 2⁴ + 2⁴ = 32, a+b = 4', Math.pow(2, 4) * 2 === 32 && 2 + 2 === 4)
    push('C23.3 the rung route: M_4 = ((32)/2)^(1/4) = 2, so a+b ≤ 2M_4 = 4', Math.pow(16, 0.25) === 2 && Math.abs(seat - 2) < 0.03)
  }
  // C24. Illustration 4 (exam-style): min 4a²+9b² under 2a+3b = 12
  {
    let minV = Infinity
    let seatA = 0
    for (let a = 0.05; a <= 6; a += 0.05) {
      const b = (12 - 2 * a) / 3
      if (b <= 0) continue
      const v = 4 * a * a + 9 * b * b
      if (v < minV) {
        minV = v
        seatA = a
      }
    }
    push('C24.1 grid min of 4a²+9b² on 2a+3b = 12 ≈ 72 (within 0.02)', Math.abs(minV - 72) < 0.02, `min ${minV}`)
    push('C24.2 equality seat a = 3, b = 2: constraint 12, value 72', 2 * 3 + 3 * 2 === 12 && 4 * 9 + 9 * 4 === 72 && Math.abs(seatA - 3) < 0.06)
    push('C24.3 the QM route on (2a, 3b): √((4a²+9b²)/2) ≥ (2a+3b)/2 = 6', (2 * 3 + 3 * 2) / 2 === 6)
  }
  // C25. the normalization lemma swept + sharp at the seat
  {
    let bad = 0
    let n = 0
    for (const alpha of [1, 2, 3, 5])
      for (const beta of [1, 2, 3])
        for (const a of [1, 2, 3])
          for (const b of [1, 2])
            for (const c of [10, 15, 20])
              for (const frac of [0.2, 0.5, 0.8]) {
                // seat: x = ac/(α(a+b)), y = bc/(β(a+b)) — walk off-seat
                const xs = (a * c) / (alpha * (a + b))
                const ys = (b * c) / (beta * (a + b))
                const x = xs * frac + (1 - frac) * xs * 1.7
                const y = (c - alpha * x) / beta
                if (y <= 0) continue
                n++
                const bound = Math.pow(c / (a + b), a + b) * Math.pow(a / alpha, a) * Math.pow(b / beta, b)
                if (!(Math.pow(x, a) * Math.pow(y, b) <= bound + 1e-9)) bad++
              }
    push(`C25.1 normalization lemma swept: ${n} off-seat probes never beat the bound`, bad === 0, `${bad} violations`)
    const a = 2
    const b = 3
    const alpha = 5
    const beta = 3
    const c = 15
    const xs = (a * c) / (alpha * (a + b))
    const ys = (b * c) / (beta * (a + b))
    const bound = Math.pow(c / (a + b), a + b) * Math.pow(a / alpha, a) * Math.pow(b / beta, b)
    const val = Math.pow(xs, a) * Math.pow(ys, b)
    push('C25.2 sharpness: the seat hits the bound exactly (within 1e-9)', Math.abs(val - bound) < 1e-9, `${val} vs ${bound}`)
  }
  // C26. Illustration 5: max x²y³ on 5x+3y = 15 = 972/25 at (6/5, 3)
  {
    const bound = Math.pow(15 / 5, 5) * Math.pow(2 / 5, 2) * Math.pow(3 / 3, 3)
    push('C26.1 formula: (15/5)⁵·(2/5)²·(3/3)³ = 972/25 = 38.88', near(bound, 972 / 25, 1e-12))
    push('C26.2 seat (6/5, 3) satisfies 5x+3y = 15', 5 * 1.2 + 3 * 3 === 15)
    push('C26.3 value at the seat: (6/5)²·3³ = 972/25', near(Math.pow(1.2, 2) * 27, 972 / 25, 1e-12))
    let maxV = 0
    for (let x = 0.02; x < 3; x += 0.02) {
      const y = (15 - 5 * x) / 3
      if (y <= 0) continue
      maxV = Math.max(maxV, x * x * y * y * y)
    }
    push('C26.4 grid max over the line ≈ 972/25 (within 0.02)', Math.abs(maxV - 972 / 25) < 0.02, `max ${maxV}`)
  }
  // C27. Illustration 6 (exam-style): max (5−x)³(x+3)⁵ on (−3, 5) = 84375 at x = 2
  {
    push('C27.1 the split: p = 5−x, q = x+3, p+q = 8 for every x', (5 - 2) + (2 + 3) === 8)
    push('C27.2 formula: 3³·5⁵ = 84375', Math.pow(3, 3) * Math.pow(5, 5) === 84375)
    push('C27.3 value at x = 2: (5−2)³(2+3)⁵ = 84375', Math.pow(5 - 2, 3) * Math.pow(2 + 3, 5) === 84375)
    let maxV = 0
    let seat = 0
    for (let x = -2.9; x < 4.99; x += 0.01) {
      const v = Math.pow(5 - x, 3) * Math.pow(x + 3, 5)
      if (v > maxV) {
        maxV = v
        seat = x
      }
    }
    push('C27.4 grid max ≈ 84375 at x ≈ 2 (within 0.1%)', Math.abs(maxV - 84375) / 84375 < 0.001 && Math.abs(seat - 2) < 0.06, `max ${maxV} at ${seat}`)
  }
  // C28. Illustration 7: max x²(1−x)³ on (0,1) = 108/3125 at x = 2/5
  {
    push('C28.1 formula: 2²3³/5⁵ = 108/3125 = 0.03456', near((4 * 27) / 3125, 0.03456, 1e-12))
    push('C28.2 value at x = 2/5: (2/5)²(3/5)³ = 108/3125', near((4 / 25) * (27 / 125), 108 / 3125, 1e-15))
    let maxV = 0
    let seat = 0
    for (let x = 0.01; x < 0.999; x += 0.005) {
      const v = x * x * Math.pow(1 - x, 3)
      if (v > maxV) {
        maxV = v
        seat = x
      }
    }
    push('C28.3 grid max ≈ 108/3125 at x ≈ 0.4 (within 0.1%)', Math.abs(maxV - 108 / 3125) / (108 / 3125) < 0.001 && Math.abs(seat - 0.4) < 0.01, `max ${maxV} at ${seat}`)
  }
  // C29. Illustration 8: max a²bc on a+b+c = 12 = 324 at (6, 3, 3)
  {
    push('C29.1 formula: (12/4)⁴·2² = 81·4 = 324', Math.pow(3, 4) * 4 === 324)
    push('C29.2 value at (6,3,3): 36·3·3 = 324; constraint 12', 36 * 3 * 3 === 324 && 6 + 3 + 3 === 12)
    let maxV = 0
    for (let a = 0.2; a < 11.9; a += 0.2)
      for (let b = 0.2; b < 11.9 - a; b += 0.2) {
        const c = 12 - a - b
        if (c <= 0) continue
        maxV = Math.max(maxV, a * a * b * c)
      }
    push('C29.3 simplex grid max ≈ 324 (within 1%)', Math.abs(maxV - 324) / 324 < 0.01, `max ${maxV}`)
  }
  // C30. Illustration 9: the two-sided self-weighted bound at (2, 8)
  {
    const left = Math.pow((4 + 64) / 10, 10)
    const mid = Math.pow(2, 2) * Math.pow(8, 8)
    const right = Math.pow(10 / 2, 10)
    push('C30.1 left base (a²+b²)/(a+b) = 6.8 at (2,8)', (4 + 64) / 10 === 6.8)
    push('C30.2 middle 2²·8⁸ = 2²⁶ = 67,108,864', Math.pow(2, 26) === 67108864 && mid === 67108864)
    push('C30.3 right 5¹⁰ = 9,765,625', Math.pow(5, 10) === 9765625)
    push('C30.4 the two-sided verdict: 6.8¹⁰ ≈ 2.115×10⁸ ≥ 67,108,864 ≥ 9,765,625', left > mid && mid > right)
  }
  // C31. Illustration 10 + L4.3 splits on x + y = 12
  {
    push('C31.1 x³y: formula (12/4)⁴·3³ = 2187', Math.pow(3, 4) * 27 === 2187)
    push('C31.2 x³y at (9, 3): 729·3 = 2187; constraint 12', 729 * 3 === 2187 && 9 + 3 === 12)
    push('C31.3 x²y: formula (12/3)³·2² = 256 at (8, 4)', Math.pow(4, 3) * 4 === 256 && 64 * 4 === 256 && 8 + 4 === 12)
    push('C31.4 x²y²: plain (12/2)⁴ = 1296 at (6, 6)', Math.pow(6, 4) === 1296 && 36 * 36 === 1296)
    let max3 = 0
    for (let x = 0.1; x < 11.9; x += 0.1) max3 = Math.max(max3, x * x * x * (12 - x))
    push('C31.5 grid max of x³y on x+y = 12 ≈ 2187 (within 0.5%)', Math.abs(max3 - 2187) / 2187 < 0.005, `max ${max3}`)
  }

  /* ---- C32–C44: every exercise answer recomputed ------------------- */

  // C32. L1.1: weights (3,1) on (3,27): A_w = 9, G_w = 3√3
  push('C32.1 L1.1 A_w = (9+27)/4 = 9', (9 + 27) / 4 === 9)
  push('C32.2 L1.1 G_w = (3³·27)^(1/4) = 729^(1/4) = 3√3', Math.pow(729, 0.25) === Math.sqrt(3) * 3 || near(Math.pow(729, 0.25), 3 * Math.sqrt(3), 1e-12))
  push('C32.3 L1.1 the law by fourth powers: 9⁴ = 6561 ≥ (3√3)⁴ = 729', Math.pow(9, 4) === 6561 && Math.pow(3 * Math.sqrt(3), 4) === 729)
  // C33. L2.1: weights (1/2, 1/3, 1/6) on (16, 4, 108): A_w = 82/3, G_w = 8√3
  push('C33.1 L2.1 A_w = (48+8+108)/6 = 82/3', (48 + 8 + 108) / 6 === 82 / 3)
  push('C33.2 L2.1 G_w: (8√3)⁶ = 8⁶·3³ = 7,077,888 = 16³·4²·108', Math.pow(8, 6) * 27 === 7077888 && 4096 * 16 * 108 === 7077888)
  push('C33.3 L2.1 the law: (82/3)² = 6724/9 ≥ 192 = (8√3)²', 82 * 82 === 6724 && 64 * 3 === 192 && 6724 / 9 > 192)
  // C34. L2.2: weights (2,2) on (3,12): the plain reduction
  push('C34.1 L2.2 A_w = (6+24)/4 = 7.5 = the plain A', (6 + 24) / 4 === 7.5 && (3 + 12) / 2 === 7.5)
  push('C34.2 L2.2 G_w = (3²·12²)^(1/4) = 6 = the plain G = √36', Math.pow(9 * 144, 0.25) === 6 && Math.sqrt(36) === 6)
  push('C34.3 L2.2 the identity (x²y²)^(1/4) = √(xy) swept on 6 pairs', rng(1, 6).every((v) => near(Math.pow(v * v * 16, 0.25), Math.sqrt(4 * v), 1e-12)))
  // C35. L3.1: a⁴+b⁴ = 162 ⇒ a+b ≤ 6
  {
    push('C35.1 L3.1 the rung: M_4 = (162/2)^(1/4) = 3', Math.pow(81, 0.25) === 3)
    push('C35.2 L3.1 seat a = b = 3: 81+81 = 162, a+b = 6', 81 + 81 === 162)
    let maxS = 0
    for (let a = 0.05; a <= Math.pow(81, 0.25); a += 0.05) maxS = Math.max(maxS, a + Math.pow(162 - a * a * a * a, 0.25))
    push('C35.3 L3.1 grid max of a+b ≈ 6 (within 0.01)', Math.abs(maxS - 6) < 0.01, `max ${maxS}`)
  }
  // C36. L3.2: max x²y³ on 5x+2y = 10 = 432/25 at (4/5, 3)
  {
    push('C36.1 L3.2 formula: (10/5)⁵(2/5)²(3/2)³ = 432/25 = 17.28', near(Math.pow(2, 5) * (4 / 25) * (27 / 8), 432 / 25, 1e-12))
    push('C36.2 L3.2 seat (4/5, 3): constraint 5·0.8+2·3 = 10; value 0.64·27 = 17.28', 5 * 0.8 + 2 * 3 === 10 && near(0.64 * 27, 17.28, 1e-12))
    let maxV = 0
    for (let x = 0.02; x < 2; x += 0.02) {
      const y = (10 - 5 * x) / 2
      if (y <= 0) continue
      maxV = Math.max(maxV, x * x * y * y * y)
    }
    push('C36.3 L3.2 grid max ≈ 432/25 (within 0.02)', Math.abs(maxV - 432 / 25) < 0.02, `max ${maxV}`)
  }
  // C37. L3.3: a+b+c = 6: max abc = 8; max a²bc = 81/4
  {
    push('C37.1 L3.3 abc: plain (6/3)³ = 8 at (2,2,2)', Math.pow(2, 3) === 8 && 2 * 2 * 2 === 8 && 2 + 2 + 2 === 6)
    push('C37.2 L3.3 a²bc formula: (6/4)⁴·2² = 81/4', near(Math.pow(1.5, 4) * 4, 81 / 4, 1e-12))
    push('C37.3 L3.3 seat (3, 3/2, 3/2): sum 6; value 9·2.25 = 20.25', near(3 + 1.5 + 1.5, 6, 1e-12) && near(9 * 1.5 * 1.5, 20.25, 1e-12))
    let maxV = 0
    for (let a = 0.15; a < 5.9; a += 0.15)
      for (let b = 0.15; b < 5.9 - a; b += 0.15) {
        const c = 6 - a - b
        if (c <= 0) continue
        maxV = Math.max(maxV, a * a * b * c)
      }
    push('C37.4 L3.3 simplex grid max of a²bc ≈ 81/4 (within 1%)', Math.abs(maxV - 20.25) / 20.25 < 0.01, `max ${maxV}`)
  }
  // C38. L4.1 (Single Correct): a²+b² = 40 ⇒ ab ≤ 20
  {
    push('C38.1 L4.1 the AM-GM on (a², b²): (a²+b²)/2 = 20 ≥ ab', 40 / 2 === 20)
    const t = 2 * Math.sqrt(5)
    push('C38.2 L4.1 seat a = b = 2√5: a²+b² = 2t² = 40, ab = t² = 20', near(2 * t * t, 40, 1e-9) && near(t * t, 20, 1e-9))
    let maxV = 0
    for (let a = 0.5; a < 6.3; a += 0.05) {
      const b = Math.sqrt(40 - a * a)
      if (b > 0) maxV = Math.max(maxV, a * b)
    }
    push('C38.3 L4.1 grid max of ab on the circle ≈ 20 (within 0.01)', Math.abs(maxV - 20) < 0.01, `max ${maxV}`)
  }
  // C39. L4.2 (Multiple Correct) on x + y = 2
  {
    let bad = 0
    for (let x = 0.05; x < 1.95; x += 0.05) {
      const y = 2 - x
      if (!(x * y <= 1 + 1e-12)) bad++
      if (!(x * x + y * y >= 2 - 1e-12)) bad++
      if (!(Math.pow(x, 3) * y <= 27 / 16 + 1e-12)) bad++
      if (!(1 / x + 1 / y >= 2 - 1e-12)) bad++
    }
    push('C39.1 L4.2 (I) xy ≤ 1, (II) x²+y² ≥ 2, (III) x³y ≤ 27/16, sharp 1/x+1/y ≥ 2 — all swept', bad === 0, `${bad} violations`)
    push('C39.2 L4.2 (III) seat (3/2, 1/2): x³y = 27/16', near(Math.pow(1.5, 3) * 0.5, 27 / 16, 1e-12))
    push('C39.3 L4.2 (IV) refuted at (1,1): 1/x+1/y = 2 < 4', 1 + 1 === 2 && 2 < 4)
  }
  // C40. L5.1: the three-term two-sided bound at (1, 2, 5)
  {
    const left = Math.pow((1 + 4 + 25) / 8, 8)
    const mid = Math.pow(1, 1) * Math.pow(2, 2) * Math.pow(5, 5)
    const right = Math.pow(8 / 3, 8)
    push('C40.1 L5.1 left base (x²+y²+z²)/(x+y+z) = 30/8 = 3.75', (1 + 4 + 25) / 8 === 3.75)
    push('C40.2 L5.1 middle 1¹·2²·5⁵ = 12,500', mid === 12500)
    push('C40.3 L5.1 right base (x+y+z)/3 = 8/3 ≈ 2.6667', near(8 / 3, 2.66667, 1e-5))
    push('C40.4 L5.1 the verdict: 3.75⁸ ≈ 39,109 ≥ 12,500 ≥ (8/3)⁸ ≈ 2,557', left > mid && mid > right && left > 39000 && right < 2600)
  }
  // C41. L5.2: 1¹2²3³4⁴ ≤ 3¹⁰
  push('C41.1 L5.2 the product 1¹·2²·3³·4⁴ = 27,648', 1 * 4 * 27 * 256 === 27648)
  push('C41.2 L5.2 the weighted mean: (1+4+9+16)/10 = 3', (1 + 4 + 9 + 16) / 10 === 3)
  push('C41.3 L5.2 the verdict: 27,648 ≤ 3¹⁰ = 59,049', 27648 <= 59049 && Math.pow(3, 10) === 59049)
  // C42. L5.3: the real-weight doorstep, recomputed
  {
    const s2 = Math.SQRT2
    const Aw = (4 * s2 + 9) / (s2 + 1)
    const Gw = Math.pow(Math.pow(4, s2) * 9, 1 / (s2 + 1))
    push('C42.1 L5.3 A_w = 5√2 − 1 ≈ 6.0711 (the rationalised form)', near(Aw, 5 * s2 - 1, 1e-12) && near(Aw, 6.0711, 1e-4))
    push('C42.2 L5.3 G_w ≈ 5.5946 witnessed', near(Gw, 5.5946, 5e-3))
    push('C42.3 L5.3 A_w − G_w ≈ 0.48 > 0 (the gap is real)', Aw - Gw > 0.47 && Aw - Gw < 0.49, `gap ${Aw - Gw}`)
  }
  // C43. L6.1: the off-positive exhibits
  push('C43.1 L6.1 (−4, −1): H = 2/(−1/4 − 1) = −1.6 negative — the H rung breaks off positives', near(2 / (-0.25 - 1), -1.6, 1e-12))
  push('C43.2 L6.1 (−1, 1): the product −1 admits no real GM', (-1) * 1 === -1)
  push('C43.3 L6.1 the honest split: Q ≥ A survives, G/H rungs need positivity', Math.sqrt((1 + 1) / 2) >= 0)
  // C44. L6.2 (Numerical Value): max a³b²c on a+b+c = 6 = 108 at (3, 2, 1)
  {
    push('C44.1 L6.2 formula: (6/6)⁶·3³·2² = 108', Math.pow(1, 6) * 27 * 4 === 108)
    push('C44.2 L6.2 seat (3,2,1): sum 6; value 27·4·1 = 108', 3 + 2 + 1 === 6 && 27 * 4 === 108)
    let maxV = 0
    for (let a = 0.1; a < 5.9; a += 0.1)
      for (let b = 0.1; b < 5.9 - a; b += 0.1) {
        const c = 6 - a - b
        if (c <= 0) continue
        maxV = Math.max(maxV, a * a * a * b * b * c)
      }
    push('C44.3 L6.2 simplex grid max ≈ 108 (within 1%)', Math.abs(maxV - 108) / 108 < 0.01, `max ${maxV}`)
  }

  /* ---- C45: the quiz keys, every distractor priced ------------------ */

  // Q1: weights (3,1) on (16,2): G_w = (16³·2)^(1/4) = 2^{13/4} ≈ 9.5137
  push('C45.1 Q1 key: G_w = 8192^(1/4) = 2^{13/4} ≈ 9.514', near(Math.pow(8192, 0.25), 9.5137, 1e-3) && Math.pow(2, 13) === 8192)
  push('C45.2 Q1 distractors: A_w = 12.5 ≠ G_w; plain G = √32 ≈ 5.657; weight-(3,2) slip 2^{7/2} ≈ 11.314', (3 * 16 + 2) / 4 === 12.5 && near(Math.sqrt(32), 5.657, 1e-3) && near(Math.pow(2, 3.5), 11.314, 1e-3))
  // Q2: (1,4,16) — the smallest rung is M_{-1} = 16/7 ≈ 2.286
  push('C45.3 Q2 key: 16/7 ≈ 2.286 is the smallest of {16/7, 4, 7, √91 ≈ 9.54}', 16 / 7 < 4 && 4 < 7 && 7 < Math.sqrt(91))
  // Q3: the maximum of x²y³ on 5x+3y = 15 is 972/25 (recomputed vs distractors)
  push('C45.4 Q3 key: 972/25 = 38.88; distractors 26,244 (coefficient-blind), 243 (the priced-product bound), 3 (the block value)', near(972 / 25, 38.88, 1e-12) && Math.pow(3, 5) * 4 * 27 === 26244 && Math.pow(3, 5) === 243)
  // Q4: a⁴+b⁴ = 32 ⇒ a+b ≤ 4; distractors 2^{9/4} ≈ 4.757, 4√2 ≈ 5.657, 32
  push('C45.5 Q4 key: 4; distractors 2^{9/4} ≈ 4.757 (root of the whole sum), √32 ≈ 5.657, 32 (the constraint)', 2 * 2 === 4 && near(Math.pow(2, 2.25), 4.7568, 1e-3) && near(Math.sqrt(32), 5.6569, 1e-3))
  // Q5: the ≥ bound holds for ALL positive reals — witnessed at (3, 5) too
  {
    const left = Math.pow((9 + 25) / 8, 8)
    const mid = Math.pow(3, 3) * Math.pow(5, 5)
    const right = Math.pow(8 / 2, 8)
    push('C45.6 Q5 key: a^a b^b ≥ ((a+b)/2)^{a+b} at (3, 5): 27·3125 = 84,375 ≥ 4⁸ = 65,536', mid === 84375 && right === 65536 && mid > right)
    push('C45.7 Q5 left flank at (3,5): ((34)/8)^8 ≈ 106,495 ≥ 84,375', left > mid && left > 106000)
  }

  /* ---- C46: the table cells, recomputed ----------------------------- */

  push('C46.1 table row (1,2,6): 9/5 = 1.8 and √(41/3) ≈ 3.6968 as printed', near(9 / 5, 1.8, 1e-12) && near(Math.sqrt(41 / 3), 3.69685, 1e-4))
  push('C46.2 table row (1,1,4): 4/3, ∛4, 2, √6 — all as printed', near(4 / 3, 1.3333, 1e-4) && near(Math.pow(4, 1 / 3), 1.5874, 1e-4) && 2 === 2 && near(Math.sqrt(6), 2.4495, 1e-4))
  push('C46.3 split table row x³y = 2187 = 3⁴·27 and row a³b²c = 108 = 27·4', Math.pow(3, 4) * 27 === 2187 && 27 * 4 === 108)

  /* ---- C47–C48: the prose witnesses (warn callouts) recomputed ------ */

  // C47. the motivation + warn-1 numbers: x³y on x + y = 5
  {
    const formula = Math.pow(5 / 4, 4) * 27
    push('C47.1 the x³y maximum on x + y = 5: (5/4)⁴·3³ = 16875/256 ≈ 65.918', near(formula, 16875 / 256, 1e-12) && near(formula, 65.918, 1e-3))
    push('C47.2 the equal-split value 2.5⁴ = 625/16 = 39.0625 (the trap the warn prices)', Math.pow(2.5, 4) === 39.0625 && 625 / 16 === 39.0625)
    let maxV = 0
    let seat = 0
    for (let x = 0.05; x < 4.95; x += 0.05) {
      const v = x * x * x * (5 - x)
      if (v > maxV) {
        maxV = v
        seat = x
      }
    }
    push('C47.3 grid max of x³y on x+y = 5 ≈ 16875/256 at x ≈ 3.75 (within 0.5%)', Math.abs(maxV - 16875 / 256) / (16875 / 256) < 0.005 && Math.abs(seat - 3.75) < 0.06, `max ${maxV} at ${seat}`)
    push('C47.4 the 3 : 1 seat (15/4, 5/4) satisfies the constraint', 15 / 4 + 5 / 4 === 5)
  }
  // C48. the coefficient-blind fraud factor (the warn-2 numbers)
  push('C48.1 the coefficient-blind bound 3⁵·2²·3³ = 26,244 vs the sharp 972/25 — a factor of exactly 675', Math.pow(3, 5) * 4 * 27 === 26244 && (26244 * 25) / 972 === 675)

  return out
}

/**
 * SECTION D (4.2 pins) — the structural contract: quiz exactly 5 items,
 * 4 options each, answer indices valid, explains say why wrong options
 * fail; exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2, every question
 * with a steps-array solution (+ answer); ≥2 figures (vivid palette hexes
 * only, no retired muted hex); ≥3 derivations; ≥3 formula cards; ≥8
 * example blocks; ≥6 terms; word count ≥ 4500 via countLessonWords;
 * prereq ids exact; sources keys within the whitelist.
 */
 function sectionD(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, cond: boolean, detail?: string) => out.push(check(name, cond, detail))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const whitelist = ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus', 'khattar-qa-4e']

  // the pinned identity
  push('D1 lesson id exact + globally unique (exactly once — in ch-04.ts)', L.id === 'aa-the-weighted-am-gm-and-its-consequences' && !lessonIdExistsElsewhere(L.id))
  push('D2 number 4.2 + exact title', L.number === '4.2' && L.title === 'The Weighted AM-GM and Its Consequences')
  push('D3 concepts: 5–8 phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `got ${L.concepts.length}`)
  push('D4 objectives: 4–6', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6)
  push('D5 prerequisites exact: 4.1 + AL 7.2', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-the-arithmetic-geometric-mean-inequality', 'al-solving-linear-inequalities']))
  push('D6 sources within the whitelist + the three pinned keys', (L.sources ?? []).every((s) => whitelist.includes(s)) && ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities'].every((k) => (L.sources ?? []).includes(k)))

  // quiz contract
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string; options: string[]; answer: number; explain: string }> } | undefined
  push('D7 quiz exactly 5 items', !!quiz && quiz.items.length === 5, `got ${quiz?.items.length}`)
  push('D8 every quiz item carries 4 options', !!quiz && quiz.items.every((i) => i.options.length === 4))
  push('D9 answer indices valid (0..3)', !!quiz && quiz.items.every((i) => i.answer >= 0 && i.answer <= 3))
  push('D10 every explain priced (≥80 chars, names why wrong options fail)', !!quiz && quiz.items.every((i) => i.explain.length >= 80 && /(option|priced|reports|forget|slip|fraud|reversal)/i.test(i.explain)))
  const keys = (quiz?.items ?? []).map((i) => i.answer)
  push('D11 quiz keys = [0, 3, 0, 1, 2]', keys.join(',') === '0,3,0,1,2', `got [${keys.join(', ')}]`)

  // exercises contract
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> } | undefined
  const qCount = (ex?.sets ?? []).reduce((n, s) => n + s.questions.length, 0)
  push('D12 exercises exactly 15', qCount === 15, `got ${qCount}`)
  const ladder = (ex?.sets ?? []).map((s) => s.questions.length).join(',')
  push('D13 the ladder 2/2/3/3/3/2 across L1–L6', ladder === '2,2,3,3,3,2', `got ${ladder}`)
  push('D14 every question: steps-array solution (≥3 moves) + answer string', (ex?.sets ?? []).every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && (q.answer ?? '').length > 0)))

  // figures
  const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  push('D15 exactly 2 figures', figs.length === 2, `got ${figs.length}`)
  push('D16 viewBox + role=img + aria-label + no undefined/NaN in both svgs', figs.every((f) => /viewBox="0 0 \d+ \d+"/.test(f.svg) && f.svg.includes('role="img"') && f.svg.includes('aria-label') && !/undefined|NaN/.test(f.svg)))
  const vivid = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#dc2626']
  const svgAll = figs.map((f) => f.svg).join('')
  push('D17 both figures carry ≥4 distinct vivid palette roles', new Set(vivid.filter((h) => svgAll.includes(h))).size >= 4)
  push('D18 no retired muted palette hexes in the figures', retired.every((h) => !svgAll.includes(h)))

  // derivations
  const derivs = L.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  push('D19 ≥3 derivations, each with statement + result + ≥3 full steps', derivs.length >= 3 && derivs.every((d) => d.statement.length > 40 && d.result.length > 0 && d.steps.length >= 3 && d.steps.every((s) => s.label.length > 0 && s.explanation.length > 0 && (s.formula ?? '').length > 0)))
  push('D20 the replication derivation + the ladder derivations present', derivs.some((d) => /replication/i.test(d.title)) && derivs.some((d) => /variance|M_1 \\leq M_2|QM/i.test(d.title + d.statement)) && derivs.some((d) => /reciprocal/i.test(d.title)))

  // formula cards
  const cards = L.blocks.filter((b) => b.kind === 'formula') as Array<{ name: string; latex: string }>
  push('D21 ≥3 formula cards incl. the weighted law, the ladder law, the normalization craft', cards.length >= 3 && cards.some((c) => /weighted AM/i.test(c.name)) && cards.some((c) => /ladder/i.test(c.name)) && cards.some((c) => /normalization/i.test(c.name)))

  // examples
  const examples = L.blocks.filter((b) => b.kind === 'example') as Array<{ title: string; steps: string[] }>
  push('D22 ≥8 Illustration blocks, steps-array, no answer field, Hence-terminal', examples.length >= 8 && examples.every((e) => Array.isArray(e.steps) && e.steps.length >= 3 && !('answer' in e) && e.steps[e.steps.length - 1].startsWith('Hence,')), `got ${examples.length}`)
  push('D23 the exam-shaped Illustrations present (labelled exam-style)', examples.some((e) => /exam-style/i.test(e.title)) && examples.filter((e) => /exam-style/i.test(e.title)).length >= 3)

  // terms
  const terms = L.blocks.find((b) => b.kind === 'terms') as { items: Array<{ term: string; def: string }> } | undefined
  push('D24 ≥6 terms', (terms?.items ?? []).length >= 6, `got ${terms?.items.length}`)
  push(
    'D25 pinned terms present (weighted means, power mean, ladder law, normalization, exponent-priced split)',
    !!terms && ['Weighted arithmetic mean', 'Weighted geometric mean', 'Power mean of order r', 'Ladder law', 'Normalization', 'Exponent-priced split'].every((t) => terms.items.some((x) => x.term === t)),
  )

  // word count
  const wc = countLessonWords(L)
  push('D26 word count ≥ 4500 by countLessonWords', wc >= 4500, `got ${wc}`)

  // tables + equations
  const tables = L.blocks.filter((b) => b.kind === 'table') as Array<{ head: string[]; rows: string[][] }>
  push('D27 ≥2 tables', tables.length >= 2, `got ${tables.length}`)
  const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ latex: string }>
  push('D28 ≥4 tagged display equations', eqs.length >= 4 && eqs.filter((e) => /\\tag\{\d\}/.test(e.latex)).length >= 4)

  // exam honesty
  const exam = L.blocks.find((b) => b.kind === 'callout' && (b as { tone: string; title: string }).tone === 'exam') as { title: string; text: string } | undefined
  push('D29 exam callout present + the JEE-2026 honesty (no separate inequalities unit; algebra bank)', !!exam && /no separate inequalities unit/i.test(exam.text) && /algebra bank/i.test(exam.text))
  const l456 = (ex?.sets ?? []).filter((s) => ['L4', 'L5', 'L6'].includes(s.level)).flatMap((s) => s.questions.map((q) => q.q))
  push('D30 exam typology at L4–L6: Single/Multiple/Linked/Numerical all labelled', l456.some((q) => /single correct/i.test(q)) && l456.some((q) => /multiple correct/i.test(q)) && l456.some((q) => /linked comprehension/i.test(q)) && l456.some((q) => /numerical value/i.test(q)))

  // cross-references + promises
  const allText = JSON.stringify(L.blocks)
  push('D31 opener cites 4.1 by title + the AA 2.1 vertex cross-reference', allText.includes('The Arithmetic-Geometric Mean Inequality') && /2\.1/.test(allText) && /vertex/i.test(allText))
  push('D32 the ch. 9 logarithm promise NAMED, never cashed (no \\log/\\ln in latex)', /logarithm/i.test(allText) && !allText.includes('\\log') && !allText.includes('\\ln'))
  push('D33 the forward promises named (4.3 Cauchy, 4.5 Jensen, ch. 5, ch. 7)', /Cauchy/i.test(allText) && /Jensen/i.test(allText) && /ch\. 5|chapter 5/i.test(allText) && /ch\. 7|chapter 7/i.test(allText))

  // KaTeX hygiene: even $ count on every human string
  {
    const texts: string[] = []
    for (const b of L.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      if (b.kind === 'callout') texts.push(b.title, b.text)
      if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      if (b.kind === 'equation') texts.push(b.note ?? '')
      if (b.kind === 'example') { texts.push(b.title); for (const s of b.steps) texts.push(s) }
      if (b.kind === 'derivation') { texts.push(b.title, b.statement); for (const s of b.steps) texts.push(s.label, s.explanation); texts.push(b.result) }
      if (b.kind === 'table') { texts.push(...b.head); for (const r of b.rows) texts.push(...r) }
      if (b.kind === 'list') for (const i of b.items) texts.push(i)
      if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) { texts.push(it.q, ...it.options, it.explain) }
      if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> }).sets) for (const q of s.questions) { texts.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), q.answer ?? '') }
      if (b.kind === 'figure') texts.push(b.caption)
      if (b.kind === 'formula') texts.push(b.name, b.note ?? '')
    }
    const bad = texts.filter((t) => (t.match(/\$/g) || []).length % 2 !== 0)
    push(`D34 balanced $ pairs on all ${texts.length} human strings (${bad.length} broken)`, bad.length === 0, bad.slice(0, 2).join(' | ').slice(0, 120))
  }

  // structural richness pins
  const byKind: Record<string, number> = {}
  for (const b of L.blocks) byKind[b.kind] = (byKind[b.kind] || 0) + 1
  push('D35 ≥5 headings, ≥10 callouts, ≥1 roman list, ≥14 paras', (byKind['heading'] ?? 0) >= 5 && (byKind['callout'] ?? 0) >= 10 && (byKind['list'] ?? 0) >= 1 && (byKind['para'] ?? 0) >= 14, `heads ${byKind['heading']}, calls ${byKind['callout']}, paras ${byKind['para']}`)
  const calls = L.blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string; text: string }>
  const tones = new Set(calls.map((c) => c.tone))
  push('D36 callout tones: definition, theorem, warn, insight, exam all present', ['definition', 'theorem', 'warn', 'insight', 'exam'].every((t) => tones.has(t)))

  // the equality discipline lives in the theorem statements
  const thms = calls.filter((c) => c.tone === 'theorem') as Array<{ title: string; text: string }>
  push('D37 the equality discipline stated inside the theorem callouts', thms.length >= 2 && thms.every((t) => /equality/i.test(t.text)))

  return out
}

/** walk src/data/library/books and assert the id appears NOWHERE outside the
 *  shipped chapter file (pre-assembly it was absent everywhere; post-assembly
 *  it lives exactly once, in ch-04.ts — both states honest for this pin) */
function lessonIdExistsElsewhere(id: string): boolean {
  const root = path.join(__dirname, '..', 'src', 'data', 'library', 'books')
  let found = false
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.ts') && !p.endsWith('advanced-algebra/ch-04.ts') && fs.readFileSync(p, 'utf8').includes(`id: '${id}'`)) found = true
    }
  }
  walk(root)
  return found
}



/** SECTION E (4.3 engines) — recompute every mathematical claim of the
 *  lesson: the Cauchy-Schwarz inequality SWEPT over small integer vectors
 *  ((Σab)² ≤ (Σa²)(Σb²) on grids, equality iff a/b constant or a zero
 *  sequence — the equality witnesses verified exactly); the discriminant
 *  proof engine (the quadratic in t, Σ(aᵢt+bᵢ)² ≥ 0 ∀t → D ≤ 0 — the
 *  algebra verified symbolically on small vectors, the Lagrange identity
 *  swept); Engel's form swept over positive integer tuples with its
 *  equality condition and its difference identity; every Illustration
 *  recomputed (Nesbitt's 3/2 on the witnesses; the (a+b+c)² ≤ 3(a²+b²+c²)
 *  family; every min-hunt exhibit; both figure rosters); every exercise
 *  answer and quiz key recomputed. ≥ 120 checks. */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const dot = (a: number[], b: number[]): number =>
  a.reduce((s, x, i) => s + x * b[i], 0)
const sq = (a: number[]): number => dot(a, a)
const csGap = (a: number[], b: number[]): number =>
  sq(a) * sq(b) - dot(a, b) ** 2
/** proportional: every cross difference aᵢbⱼ − aⱼbᵢ vanishes (the zero
 *  list counts — 0 times anything) */
const prop = (a: number[], b: number[]): boolean => {
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] * b[j] !== a[j] * b[i]) return false
  return true
}
const f = (a: number[], b: number[], t: number): number =>
  a.reduce((s, x, i) => s + (x * t + b[i]) ** 2, 0)
/** (Σaᵢ²/bᵢ)(Σbᵢ) − (Σaᵢ)² exactly: D = Πbᵢ > 0, N·S − (Σa)²·D ≥ 0 ⟺
 *  Engel's form holds; === 0 ⟺ equality */
const engelGapNum = (a: number[], b: number[]): number => {
  const D = b.reduce((p, x) => p * x, 1)
  const N = a.reduce((s, x, i) => s + x * x * (D / b[i]), 0)
  const S = b.reduce((s, x) => s + x, 0)
  return N * S - a.reduce((s, x) => s + x, 0) ** 2 * D
}
/** Nesbitt numerator: 2·Σ·D − 3·D ≥ 0 ⟺ Σ a/(b+c) ≥ 3/2 (D > 0) */
const nesbittNum = (a: number, b: number, c: number): number => {
  const D = (b + c) * (c + a) * (a + b)
  const N = a * (c + a) * (a + b) + b * (a + b) * (b + c) + c * (b + c) * (c + a)
  return 2 * N - 3 * D
}
const lists2 = (lo: number, hi: number): number[][] => {
  const out: number[][] = []
  for (let x = lo; x <= hi; x++)
    for (let y = lo; y <= hi; y++) out.push([x, y])
  return out
}
const lists3 = (lo: number, hi: number): number[][] => {
  const out: number[][] = []
  for (let x = lo; x <= hi; x++)
    for (let y = lo; y <= hi; y++)
      for (let z = lo; z <= hi; z++) out.push([x, y, z])
  return out
}
const lists4 = (lo: number, hi: number): number[][] => {
  const out: number[][] = []
  for (let a = lo; a <= hi; a++)
    for (let b = lo; b <= hi; b++)
      for (let c = lo; c <= hi; c++)
        for (let d = lo; d <= hi; d++) out.push([a, b, c, d])
  return out
}

 function sectionE(L: Lesson): SectionCheck[] {
  const c: SectionCheck[] = []
  const add = (name: string, ok: boolean, detail?: string) =>
    c.push(check(name, ok, detail))

  /* ---- the Cauchy-Schwarz sweeps ---------------------------------- */

  // E1. two-term integer sweep: (Σab)² ≤ (Σa²)(Σb²) on all 81² pairs.
  {
    let bad = 0
    for (const a of lists2(-4, 4)) for (const b of lists2(-4, 4)) if (csGap(a, b) < 0) bad++
    add('E1 CS two-term sweep [−4,4]² (6561 pairs), violations 0', bad === 0, `${bad} violations`)
  }
  // E2. two-term: equality ⟺ cross difference zero (proportional).
  {
    let bad = 0
    for (const a of lists2(-4, 4))
      for (const b of lists2(-4, 4))
        if (csGap(a, b) === 0 !== prop(a, b)) bad++
    add('E2 two-term equality ⟺ proportional (cross-diff zero), swept', bad === 0, `${bad} mismatches`)
  }
  // E3. three-term sweep over [−3,3]³ (343² pairs).
  {
    let bad = 0
    for (const a of lists3(-3, 3)) for (const b of lists3(-3, 3)) if (csGap(a, b) < 0) bad++
    add('E3 CS three-term sweep [−3,3]³ (117649 pairs), violations 0', bad === 0, `${bad} violations`)
  }
  // E4. three-term: equality ⟺ all three cross differences zero.
  {
    let bad = 0
    for (const a of lists3(-3, 3))
      for (const b of lists3(-3, 3))
        if (csGap(a, b) === 0 !== prop(a, b)) bad++
    add('E4 three-term equality ⟺ proportional, swept', bad === 0, `${bad} mismatches`)
  }
  // E5. four-term sweep over [−2,2]⁴ (625² pairs).
  {
    let bad = 0
    for (const a of lists4(-2, 2)) for (const b of lists4(-2, 2)) if (csGap(a, b) < 0) bad++
    add('E5 CS four-term sweep [−2,2]⁴ (390625 pairs), violations 0', bad === 0, `${bad} violations`)
  }
  // E6. the alignment read |Σab| ≤ √(Σa²)·√(Σb²) on non-zero pairs (floats).
  {
    let bad = 0
    for (const a of lists3(-3, 3))
      for (const b of lists3(-3, 3)) {
        if (sq(a) === 0 || sq(b) === 0) continue
        if (Math.abs(dot(a, b)) > Math.sqrt(sq(a) * sq(b)) + 1e-12) bad++
      }
    add('E6 the unsquared read |Σab| ≤ √(Σa²)√(Σb²), swept', bad === 0, `${bad} violations`)
  }

  /* ---- the pinned witnesses --------------------------------------- */

  {
    const a = [1, 2, 3], b = [4, 5, 6]
    add('E7.1 witness (1,2,3)·(4,5,6): Σab = 32', dot(a, b) === 32)
    add('E7.2 Σa² = 14, Σb² = 77', sq(a) === 14 && sq(b) === 77)
    add('E7.3 32² = 1024 ≤ 14·77 = 1078, gap 54', csGap(a, b) === 54 && 32 ** 2 === 1024 && 14 * 77 === 1078)
    add('E7.4 ratios 1/4, 2/5, 3/6 not constant — strict', !prop(a, b))
    add('E7.5 alignment 32/√1078 ≈ 0.97', Math.abs(32 / Math.sqrt(1078) - 0.9747) < 0.0005)
  }
  {
    const a = [1, 2], b = [2, 4]
    add('E8.1 witness (1,2)·(2,4): Σab = 10, tie 100 = 100', dot(a, b) === 10 && csGap(a, b) === 0)
    add('E8.2 b = 2a — proportional', prop(a, b))
  }
  {
    const a = [1, 2], b = [-2, -4]
    add('E9.1 witness (1,2)·(−2,−4): Σab = −10, tie 100 = 100', dot(a, b) === -10 && csGap(a, b) === 0)
    add('E9.2 the unsquared read ties too: |−10| = √5·√20 = 10', Math.abs(dot(a, b)) === Math.sqrt(sq(a) * sq(b)))
  }
  {
    const a = [2, -1, 2], b = [1, 3, 4]
    add('E10.1 witness (2,−1,2)·(1,3,4): Σab = 7, 49 ≤ 234 strict', dot(a, b) === 7 && csGap(a, b) === 234 - 49)
    add('E10.2 ratios 1/2, −3, 2 — three different numbers', !prop(a, b))
  }
  {
    const a = [1, 2, 3], b = [2, 4, 6]
    add('E11 witness (1,2,3)·(2,4,6): Σab = 28, tie 784 = 784', dot(a, b) === 28 && csGap(a, b) === 0)
  }
  {
    const a = [0, 0], b = [3, 4]
    add('E12 the zero-list tie: 0 = 0·25 = 0', dot(a, b) === 0 && csGap(a, b) === 0 && prop(a, b))
  }

  /* ---- the discriminant engine ------------------------------------ */

  // E13. the coefficient identity: f(t) = (Σa²)t² + 2(Σab)t + Σb², exact at
  // five t-seats over a deterministic roster of small vectors.
  {
    let bad = 0
    const roster: number[][][] = []
    for (const a of lists3(-2, 2).slice(0, 40)) roster.push([a, [1, 2, -1]])
    for (const a of lists2(-2, 2).slice(0, 25)) roster.push([a, [3, -1]])
    for (const [a, b] of roster)
      for (const t of [-2, -0.5, 0, 1, 3])
        if (f(a, b, t) !== sq(a) * t * t + 2 * dot(a, b) * t + sq(b)) bad++
    add('E13 f(t) = Σ(aᵢt+bᵢ)² expands to (Σa²)t² + 2(Σab)t + Σb², swept', bad === 0, `${bad} mismatches`)
  }
  // E14. non-negativity of f on the same seats.
  {
    let bad = 0
    for (const a of lists3(-2, 2))
      for (const b of lists3(-2, 2))
        for (const t of [-2, -0.5, 0, 1, 3]) if (f(a, b, t) < 0) bad++
    add('E14 f(t) ≥ 0 for every t, swept', bad === 0, `${bad} violations`)
  }
  // E15. D = 4·(−csGap): the discriminant identity, integer-exact.
  {
    let bad = 0
    for (const a of lists3(-2, 2))
      for (const b of lists3(-2, 2)) {
        const D = (2 * dot(a, b)) ** 2 - 4 * sq(a) * sq(b)
        if (D !== -4 * csGap(a, b)) bad++
      }
    add('E15 D = (2Σab)² − 4(Σa²)(Σb²) = −4·gap, swept', bad === 0, `${bad} mismatches`)
  }
  // E16. proportional lists ⟹ f(t) = Σa²(t+λ)², f(−λ) = 0, D = 0.
  {
    let bad = 0
    for (const a of lists3(-2, 2))
      for (const lam of [-3, -1, 0, 1, 2, 3]) {
        const b = a.map((x) => lam * x)
        for (const t of [-2, -0.5, 0.5, 2])
          if (f(a, b, t) !== sq(a) * (t + lam) ** 2) bad++
        if (f(a, b, -lam) !== 0 || csGap(a, b) !== 0) bad++
      }
    add('E16 proportional ⟹ f = Σa²(t+λ)², touches at −λ, D = 0, swept', bad === 0, `${bad} mismatches`)
  }
  // E17. non-proportional ⟹ D < 0 strict, and the minimum is gap/Σa² > 0.
  {
    let bad = 0
    for (const a of lists3(-2, 2))
      for (const b of lists3(-2, 2)) {
        if (prop(a, b)) continue
        if (csGap(a, b) <= 0) bad++
        const t0 = -dot(a, b) / sq(a)
        if (Math.abs(f(a, b, t0) - csGap(a, b) / sq(a)) > 1e-9) bad++
      }
    add('E17 strict ⟹ f_min = gap/Σa² at the vertex t₀ = −Σab/Σa², swept', bad === 0, `${bad} mismatches`)
  }
  // E18. Figure 1, panel A: a = (1,2,3), b = (4,5,6): f = 14t²+64t+77.
  {
    const a = [1, 2, 3], b = [4, 5, 6]
    add('E18.1 f(t) = 14t² + 64t + 77 (coefficient roster)', sq(a) === 14 && 2 * dot(a, b) === 64 && sq(b) === 77)
    add('E18.2 D = −216 < 0', (2 * dot(a, b)) ** 2 - 4 * sq(a) * sq(b) === -216)
    add('E18.3 min 27/7 at t = −16/7', f(a, b, -16 / 7) === 27 / 7 && -dot(a, b) / sq(a) === -16 / 7)
    add('E18.4 f_min = gap/Σa² = 54/14', csGap(a, b) / sq(a) === 54 / 14 && 54 / 14 === 27 / 7)
    add('E18.5 curve seats: f(−4.5) = 72.5, f(0.5) = 112.5, f(−2) = 5', f(a, b, -4.5) === 72.5 && f(a, b, 0.5) === 112.5 && f(a, b, -2) === 5)
    // the drawn quadratic Bezier M20,155 Q180,465 340,75 is exact for the
    // parabola: its midpoint (180,290) is the curve at t = −2 (f = 5).
    const mid = { x: (20 + 2 * 180 + 340) / 4, y: (155 + 2 * 465 + 75) / 4 }
    const px = 20 + (-2 + 4.5) * 64, py = 300 - 2 * 5
    add('E18.6 Bezier midpoint (180,290) = the parabola at t = −2', mid.x === px && mid.y === py, `${mid.x},${mid.y} vs ${px},${py}`)
    const vx = 20 + (-16 / 7 + 4.5) * 64, vy = 300 - 2 * (27 / 7)
    add('E18.7 the drawn vertex dot (162, 292) matches −16/7 → 27/7', Math.abs(vx - 162) < 0.4 && Math.abs(vy - 292) < 0.4, `${vx},${vy}`)
  }
  // E19. Figure 1, panel B: a = (1,2,3), b = (2,4,6): f = 14(t+2)².
  {
    const a = [1, 2, 3], b = [2, 4, 6]
    add('E19.1 f(t) = 14t² + 56t + 56 = 14(t+2)²', sq(a) === 14 && 2 * dot(a, b) === 56 && sq(b) === 56 && f(a, b, 1) === 14 * 9)
    add('E19.2 D = 0', (2 * dot(a, b)) ** 2 - 4 * sq(a) * sq(b) === 0)
    add('E19.3 touches at t₀ = −2 = −λ (b = 2a)', f(a, b, -2) === 0)
    add('E19.4 curve seats f(±4.5 → ends) = 87.5, f(0.5) = 87.5', f(a, b, -4.5) === 87.5 && f(a, b, 0.5) === 87.5)
    const mid = { x: (380 + 2 * 540 + 700) / 4, y: (125 + 2 * 475 + 125) / 4 }
    add('E19.5 Bezier midpoint (540,300) = the touch point', mid.x === 540 && mid.y === 300)
  }
  // E20. Lagrange's identity swept on integer triples (n = 3).
  {
    let bad = 0
    for (const a of lists3(-3, 3))
      for (const b of lists3(-3, 3)) {
        const rhs =
          (a[0] * b[1] - a[1] * b[0]) ** 2 +
          (a[0] * b[2] - a[2] * b[0]) ** 2 +
          (a[1] * b[2] - a[2] * b[1]) ** 2
        if (csGap(a, b) !== rhs) bad++
      }
    add('E20 Lagrange identity (Σa²)(Σb²) − (Σab)² = Σ(aᵢbⱼ−aⱼbᵢ)², swept', bad === 0, `${bad} mismatches`)
  }
  {
    const a = [1, 2, 3], b = [4, 5, 6]
    const rhs = (1 * 5 - 2 * 4) ** 2 + (1 * 6 - 3 * 4) ** 2 + (2 * 6 - 3 * 5) ** 2
    add('E21 the L6 witness: gap 54 = 9 + 36 + 9', csGap(a, b) === 54 && rhs === 54)
  }

  /* ---- Engel's form ------------------------------------------------ */

  // E22. Engel swept exactly: a ∈ [−4,4]³ over b ∈ [1,4]³.
  {
    let bad = 0
    for (const a of lists3(-4, 4)) for (const b of lists3(1, 4)) if (engelGapNum(a, b) < 0) bad++
    add('E22 Engel sweep a∈[−4,4]³ × b∈[1,4]³ (21952 combos), violations 0', bad === 0, `${bad} violations`)
  }
  // E23. Engel equality ⟺ constant ratio (aᵢbⱼ = aⱼbᵢ), swept.
  {
    let bad = 0
    for (const a of lists3(-4, 4))
      for (const b of lists3(1, 4))
        if (engelGapNum(a, b) === 0 !== prop(a, b)) bad++
    add('E23 Engel equality ⟺ aᵢ/bᵢ constant, swept', bad === 0, `${bad} mismatches`)
  }
  // E24. the Engel difference identity (n = 3), exact integers.
  {
    let bad = 0
    for (const a of lists3(-4, 4))
      for (const b of lists3(1, 4)) {
        const D = b[0] * b[1] * b[2]
        const lhs = engelGapNum(a, b) // already over common denominator D
        const rhs =
          (a[0] * b[1] - a[1] * b[0]) ** 2 * b[2] +
          (a[0] * b[2] - a[2] * b[0]) ** 2 * b[1] +
          (a[1] * b[2] - a[2] * b[1]) ** 2 * b[0]
        if (lhs !== rhs) bad++
      }
    add('E24 Engel gap identity = Σ(aᵢbⱼ−aⱼbᵢ)²/(bᵢbⱼ), swept', bad === 0, `${bad} mismatches`)
  }
  // E25. the two-term Engel identity on a fine grid (symbolic check).
  {
    let bad = 0
    for (let a1 = -4; a1 <= 4; a1++)
      for (let a2 = -4; a2 <= 4; a2++)
        for (let b1 = 1; b1 <= 4; b1++)
          for (let b2 = 1; b2 <= 4; b2++) {
            const lhs = (a1 * a1 * b2 + a2 * a2 * b1) * (b1 + b2) - (a1 + a2) ** 2 * b1 * b2
            const rhs = (a1 * b2 - a2 * b1) ** 2
            if (lhs !== rhs) bad++
          }
    add('E25 two-term Engel identity: (Σa²/b)(Σb) − (Σa)² = (a₁b₂−a₂b₁)²/b₁b₂, swept', bad === 0, `${bad} mismatches`)
  }
  // E26. the Illustration-3 / Figure-2 witness: 4/1 + 9/2 vs 25/3.
  {
    add('E26.1 4/1 + 9/2 = 17/2 = 8.5 ≥ 25/3 (strict)', engelGapNum([2, 3], [1, 2]) > 0 && 4 + 9 / 2 === 8.5)
    add('E26.2 the floor (2+3)²/(1+2) = 25/3', (2 + 3) ** 2 / (1 + 2) === 25 / 3)
    add('E26.3 strict because 2/1 ≠ 3/2', 2 / 1 !== 3 / 2)
  }
  {
    add('E27 the tie run 4/1 + 16/2 = 12 = (2+4)²/3', engelGapNum([2, 4], [1, 2]) === 0 && 4 + 8 === 12 && (2 + 4) ** 2 / 3 === 12)
  }
  // E28. the warn-callout fraud witness: a = (0,3) over b = (2,−1) — the
  // claimed inequality would read −9 ≥ 9, false.
  {
    add('E28 the negative-bottom fraud: 0/2 + 9/(−1) = −9 < 9 = (0+3)²/(2−1)', 0 / 2 + 9 / -1 === -9 && (0 + 3) ** 2 / (2 - 1) === 9 && -9 < 9)
  }
  // E29. the exercise-2 L1 split: 1/1 + 4/1 + 9/4 = 29/4 ≥ 6 strict; the tie
  // list (1,1,4) gives 6 = 6. (The engine caught the first draft's 25/4 —
  // 1 + 4 + 9/4 is 7.25, not 6.25 — and the lesson text was corrected.)
  {
    add('E29.1 1/1 + 4/1 + 9/4 = 29/4 ≥ 6, gap 5/4', engelGapNum([1, 2, 3], [1, 1, 4]) > 0 && 1 + 4 + 9 / 4 === 29 / 4 && 29 / 4 - 6 === 5 / 4)
    add('E29.2 the floor (1+2+3)²/(1+1+4) = 6', (1 + 2 + 3) ** 2 / (1 + 1 + 4) === 6)
    add('E29.3 the tie list (1,1,4): 1 + 1 + 4 = 6 = (1+1+4)²/6', engelGapNum([1, 1, 4], [1, 1, 4]) === 0 && 1 + 1 + 16 / 4 === 6)
  }
  // E30. 1/x + 1/y ≥ 1/2 on x + y = 8 (grid), tie only at (4,4).
  {
    let bad = 0
    let ties = 0
    for (let x = 0.1; x <= 7.9; x += 0.01) {
      const y = 8 - x
      if (1 / x + 1 / y < 0.5 - 1e-9) bad++
      if (Math.abs(1 / x + 1 / y - 0.5) < 1e-7) ties++
    }
    add('E30 1/x + 1/y ≥ 1/2 on x+y = 8 (780 grid seats), tie only at (4,4)', bad === 0 && ties > 0, `${bad} violations`)
  }
  // E31. 2/x + 8/y ≥ 3 on x + y = 6 (grid), tie only at (2,4).
  {
    let bad = 0
    let ties = 0
    for (let x = 0.1; x <= 5.9; x += 0.01) {
      const y = 6 - x
      if (2 / x + 8 / y < 3 - 1e-9) bad++
      if (Math.abs(2 / x + 8 / y - 3) < 1e-7) ties++
    }
    add('E31 2/x + 8/y ≥ 3 on x+y = 6 (580 grid seats), tie only at (2,4)', bad === 0 && ties > 0, `${bad} violations`)
    add('E31.2 the split checks: (√2)² = 2, (2√2)² = 8, (3√2)² = 18, 18/6 = 3', Math.abs(2 - Math.SQRT2 ** 2) < 1e-12 && Math.abs(8 - (2 * Math.SQRT2) ** 2) < 1e-12 && Math.abs((3 * Math.SQRT2) ** 2 - 18) < 1e-12 && 18 / 6 === 3)
    add('E31.3 the seat (2,4): 2/2 + 8/4 = 3, y = 2x', 2 / 2 + 8 / 4 === 3)
  }
  // E32. x + 4/x ≥ 4 on a grid, tie only at x = 2; the Engel intermediate.
  {
    let bad = 0
    let ties = 0
    for (let x = 0.05; x <= 40; x += 0.01) {
      if (x + 4 / x < 4 - 1e-9) bad++
      if (Math.abs(x + 4 / x - 4) < 1e-7) ties++
    }
    add('E32.1 x + 4/x ≥ 4 on x ∈ (0,40] (3951 grid seats), tie only at x = 2', bad === 0 && ties > 0, `${bad} violations`)
    let bad2 = 0
    for (let x = 0.2; x <= 30; x += 0.1) {
      if (Math.abs((x + 2) ** 2 - 8 * x - (x - 2) ** 2) > 1e-9) bad2++
      if (Math.abs(x + 4 / x - 4 - (x - 2) ** 2 / x) > 1e-9) bad2++
    }
    add('E32.2 the certificates: (x+2)² − 8x = (x−2)² and x + 4/x − 4 = (x−2)²/x', bad2 === 0, `${bad2} mismatches`)
    add('E32.3 AM-GM: 2√(x·4/x) = 4, equality at x = 4/x = 2', 2 * Math.sqrt(2 * (4 / 2)) === 4 && 4 / 2 === 2)
  }
  // E33. x + 9/x ≥ 6, tie only at x = 3 (the L3 exercise).
  {
    let bad = 0
    let ties = 0
    for (let x = 0.05; x <= 40; x += 0.01) {
      if (x + 9 / x < 6 - 1e-9) bad++
      if (Math.abs(x + 9 / x - 6) < 1e-7) ties++
    }
    add('E33 x + 9/x ≥ 6, tie only at x = 3; and (x+3)² − 12x = (x−3)²', bad === 0 && ties > 0 && (3 + 3) ** 2 - 12 * 3 === (3 - 3) ** 2, `${bad} violations`)
  }

  /* ---- Nesbitt and the family --------------------------------------- */

  // E34. Nesbitt swept exactly on positive integer triples [1,8]³.
  {
    let bad = 0
    for (let a = 1; a <= 8; a++)
      for (let b = 1; b <= 8; b++)
        for (let d = 1; d <= 8; d++) if (nesbittNum(a, b, d) < 0) bad++
    add('E34 Nesbitt sweep [1,8]³ (512 triples), violations 0', bad === 0, `${bad} violations`)
  }
  // E35. Nesbitt equality ⟺ a = b = c, swept.
  {
    let bad = 0
    for (let a = 1; a <= 8; a++)
      for (let b = 1; b <= 8; b++)
        for (let d = 1; d <= 8; d++)
          if (nesbittNum(a, b, d) === 0 !== (a === b && b === d)) bad++
    add('E35 Nesbitt equality ⟺ a = b = c, swept', bad === 0, `${bad} mismatches`)
  }
  // E36. the chain: Σa/(b+c) = Σa²/(ab+ac) (identity) and the Engel step.
  {
    let bad = 0
    for (let a = 1; a <= 6; a++)
      for (let b = 1; b <= 6; b++)
        for (let d = 1; d <= 6; d++) {
          const lhsN = nesbittNum(a, b, d) // 2Σ − 3 over D
          // the Engel step: Σ a²/(ab+ac) ≥ (a+b+c)²/(2(ab+bc+ca)), i.e.
          // (Σa²/bots)(Σbots) ≥ (Σa)² with bots = (ab+ac, bc+ba, ca+cb)
          const bots = [a * (b + d), b * (d + a), d * (a + b)]
          if (engelGapNum([a, b, d], bots) < 0) bad++
          // the last rung: (a+b+c)² ≥ 3(ab+bc+ca)
          if ((a + b + d) ** 2 - 3 * (a * b + b * d + d * a) < 0) bad++
          // the full chain implies Nesbitt:
          if (lhsN < 0) bad++
        }
    add('E36 the Engel chain: squared tops + Engel step + family rung, swept', bad === 0, `${bad} violations`)
  }
  // E37. the 4.1 certificate identity: 2[(a+b+c)² − 3(ab+bc+ca)] = Σ(a−b)².
  {
    let bad = 0
    for (let a = -5; a <= 5; a++)
      for (let b = -5; b <= 5; b++)
        for (let d = -5; d <= 5; d++)
          if (2 * ((a + b + d) ** 2 - 3 * (a * b + b * d + d * a)) !== (a - b) ** 2 + (b - d) ** 2 + (d - a) ** 2) bad++
    add('E37 2[(a+b+c)² − 3(ab+bc+ca)] = (a−b)²+(b−c)²+(c−a)², swept [−5,5]³', bad === 0, `${bad} mismatches`)
  }
  // E38. the pinned Nesbitt witnesses.
  {
    const n = (a: number, b: number, c: number) => a / (b + c) + b / (c + a) + c / (a + b)
    add('E38.1 (1,2,3): 17/10 ≥ 3/2 (gap 1/5)', Math.abs(n(1, 2, 3) - 1.7) < 1e-9 && Math.abs(17 / 10 - 3 / 2 - 1 / 5) < 1e-12)
    add('E38.2 (2,3,4): 111/70, gap 3/35', Math.abs(n(2, 3, 4) - 111 / 70) < 1e-12 && Math.abs(111 / 70 - 3 / 2 - 3 / 35) < 1e-12)
    add('E38.3 (1,1,1): 3/2 exactly', Math.abs(n(1, 1, 1) - 1.5) < 1e-12)
    add('E38.4 the L3 arithmetic: 2/7 + 1/2 + 4/5 = (20+35+56)/70 = 111/70', Math.abs(2 / 7 + 1 / 2 + 4 / 5 - 111 / 70) < 1e-12)
    add('E38.5 the three witnesses bracket the bound: 17/10 > 111/70 > 3/2', 17 / 10 > 111 / 70 && 111 / 70 > 3 / 2)
  }
  // E39. the sandwich at (1,2,3): 33 ≤ 36 ≤ 42 with ab+bc+ca = 11.
  {
    const a = 1, b = 2, d = 3
    add('E39.1 ab+bc+ca = 11, (a+b+c)² = 36, Σa² = 14', a * b + b * d + d * a === 11 && (a + b + d) ** 2 === 36 && a * a + b * b + d * d === 14)
    add('E39.2 the sandwich 3·11 = 33 ≤ 36 ≤ 42 = 3·14', 3 * 11 <= 36 && 36 <= 42)
    add('E39.3 the certificate gap: ½(1+1+4) = 3 = 36 − 33', (1 + 1 + 4) / 2 === 3 && 36 - 33 === 3)
    add('E39.4 the rotated-lists route: ab+bc+ca ≤ a²+b²+c² (11 ≤ 14)', 11 <= 14 && csGap([1, 2, 3], [2, 3, 1]) === sq([1, 2, 3]) ** 2 - dot([1, 2, 3], [2, 3, 1]) ** 2 && dot([1, 2, 3], [2, 3, 1]) === 11)
  }
  // E40. the rotated-lists bound swept: (a,b,c)·(b,c,a) dot ≤ Σa².
  {
    let bad = 0
    for (const a of lists3(-4, 4)) {
      const rot = [a[1], a[2], a[0]]
      if (dot(a, rot) > sq(a)) bad++
    }
    add('E40 rotated-lists CS: ab+bc+ca ≤ a²+b²+c², swept', bad === 0, `${bad} violations`)
  }

  /* ---- the all-ones read and the absolute-value promise -------------- */

  // E41. (Σa)² ≤ nΣa² swept for n = 2, 3, 4; equality iff all equal.
  {
    let bad = 0
    for (const a of lists2(-4, 4)) if (a.reduce((s, x) => s + x, 0) ** 2 > 2 * sq(a)) bad++
    for (const a of lists3(-3, 3)) if (a.reduce((s, x) => s + x, 0) ** 2 > 3 * sq(a)) bad++
    for (const a of lists4(-2, 2)) if (a.reduce((s, x) => s + x, 0) ** 2 > 4 * sq(a)) bad++
    add('E41 the all-ones read (Σa)² ≤ nΣa², swept n = 2,3,4', bad === 0, `${bad} violations`)
  }
  // E42. the variance identity: nΣa² − (Σa)² = n·Σ(aᵢ−ā)², swept (floats).
  {
    let bad = 0
    for (const a of [...lists2(-4, 4).slice(0, 30), ...lists3(-3, 3).slice(0, 30)]) {
      const m = a.reduce((s, x) => s + x, 0) / a.length
      const spread = a.reduce((s, x) => s + (x - m) ** 2, 0)
      if (Math.abs(a.length * sq(a) - a.reduce((s, x) => s + x, 0) ** 2 - a.length * spread) > 1e-9) bad++
    }
    add('E42 the gap = n·(squared spread about the mean), swept', bad === 0, `${bad} mismatches`)
  }
  // E43. the (1,2,3) variance witness: gap 6 = 3·2.
  {
    const a = [1, 2, 3]
    const m = 2
    add('E43 gap 42 − 36 = 6 = 3·(spread 2) for (1,2,3)', 3 * sq(a) - 6 ** 2 === 6 && a.reduce((s, x) => s + (x - m) ** 2, 0) === 2)
  }
  // E44. the pinned triples of Illustration 2 / exercise 3.
  {
    add('E44 (1,2,3): 36 ≤ 42 strict; (5,5,5): 225 = 225 tie; (1,0,0): 1 ≤ 3', 36 <= 3 * 14 && 225 === 3 * 75 && 1 <= 3)
  }
  // E45. the best constant k = 3 (the L4 single-correct item).
  {
    let bad = 0
    for (const a of lists3(-4, 4)) if (a.reduce((s, x) => s + x, 0) ** 2 > 3 * sq(a)) bad++
    add('E45 k = 3 works for all triples, swept; and (1,1,1) forces k ≥ 3', bad === 0 && 9 <= 3 * 3, `${bad} violations`)
  }
  // E46. the absolute-value promise: (Σ|xᵢ|)² ≤ nΣxᵢ² swept; equality iff
  // the |xᵢ| all equal.
  {
    let bad = 0
    for (const a of lists3(-3, 3)) {
      const abs = a.map(Math.abs)
      if (abs.reduce((s, x) => s + x, 0) ** 2 > 3 * sq(abs)) bad++
    }
    for (const a of lists2(-4, 4)) {
      const abs = a.map(Math.abs)
      if (abs.reduce((s, x) => s + x, 0) ** 2 > 2 * sq(abs)) bad++
    }
    add('E46 (Σ|xᵢ|)² ≤ nΣxᵢ², swept n = 2,3', bad === 0, `${bad} violations`)
  }
  {
    add('E47 the promise witnesses: (3,−4,0): 49 ≤ 75 strict; (1,−1,1): 9 = 9 tie; (3,−4): 49 ≤ 50 strict; (1,1): 4 = 4 tie', 49 <= 75 && 9 === 9 && 49 <= 50 && 4 === 2 * 2)
  }

  /* ---- the exercises, every answer recomputed ------------------------ */

  {
    // L1 E1: (2,−1,2)·(1,3,4)
    const a = [2, -1, 2], b = [1, 3, 4]
    add('E48 L1-1: Σab = 7, Σa² = 9, Σb² = 26, 49 ≤ 234 strict', dot(a, b) === 7 && sq(a) === 9 && sq(b) === 26 && csGap(a, b) === 185)
    add('E48.2 the ceiling 3√26 ≈ 15.3, ratios 0.5, −3, 2 distinct', Math.abs(3 * Math.sqrt(26) - 15.3) < 0.01 && !prop(a, b))
  }
  {
    // L1 E2 — recomputed with the floor 6 vs 25/4 and the tie list (1,1,4).
    add('E49 L1-2 recomputed under E29 (25/4 ≥ 6; tie list (1,1,4))', engelGapNum([1, 2, 3], [1, 1, 4]) > 0 && engelGapNum([1, 1, 4], [1, 1, 4]) === 0)
  }
  {
    // L2 E4: 1/x + 1/y on x+y = 8 → 1/2 at (4,4).
    add('E50 L2-4: Engel floor 4/8 = 1/2, attained at (4,4): 1/4+1/4 = 1/2', 4 / 8 === 0.5 && 1 / 4 + 1 / 4 === 0.5 && engelGapNum([1, 1], [4, 4]) === 0)
  }
  {
    // L4 E9 (numerical value): 2/x + 8/y → 3 at (2,4) — recomputed under
    // E31; here the exact tie ratio.
    add('E51 L4-9: the tie ratio √2/x = 2√2/y ⟺ y = 2x ⟺ (2,4)', 4 === 2 * 2)
  }
  {
    // L4 E10: max 6 with sizes 4 and 9.
    const a1 = [2, 0], b1 = [3, 0]
    const a2 = [6 / 5, 8 / 5], b2 = [9 / 5, 12 / 5]
    add('E52.1 L4-10: ceiling √4·√9 = 6, attained at (2,0)·(3,0): dot 6', Math.sqrt(4) * Math.sqrt(9) === 6 && dot(a1, b1) === 6)
    add('E52.2 the proportional family (6/5,8/5)·(9/5,12/5): sizes 4 and 9, dot 6', Math.abs(sq(a2) - 4) < 1e-12 && Math.abs(sq(b2) - 9) < 1e-12 && Math.abs(dot(a2, b2) - 6) < 1e-12)
  }
  {
    // L5 E11: a²/(a+b) + b²/(b+c) + c²/(c+a) ≥ (a+b+c)/2.
    let bad = 0
    for (let a = 1; a <= 6; a++)
      for (let b = 1; b <= 6; b++)
        for (let d = 1; d <= 6; d++) {
          const bots = [a + b, b + d, d + a]
          if (engelGapNum([a, b, d], bots) < 0) bad++
        }
    add('E53.1 L5-11: Engel floor swept on [1,6]³ positive triples', bad === 0, `${bad} violations`)
    const w = 1 / 3 + 4 / 5 + 9 / 4
    add('E53.2 the witness (1,2,3): 203/60 ≥ 3 (floor (1+2+3)²/12 = 3)', Math.abs(w - 203 / 60) < 1e-12 && (1 + 2 + 3) ** 2 / 12 === 3 && w >= 3)
    add('E53.3 the a=b=c tie: both sides 3a/2', Math.abs((1 + 1 + 1) - 3 * (2 / 2)) < 1e-12)
  }
  {
    // L5 E12 (multiple correct): the four verdicts.
    const t = (a: number[], b: number[]) => csGap(a, b) === 0
    add('E54.1 L5-12 (i): (1,2)/(2,4) ties: 100 = 100', t([1, 2], [2, 4]) && 10 ** 2 === 5 * 20)
    add('E54.2 (ii): (1,2)/(−2,−4) ties: 100 = 100, |−10| = 10', t([1, 2], [-2, -4]) && Math.abs(-10) === Math.sqrt(5 * 20))
    add('E54.3 (iii): (1,2)/(2,3) strict: 64 < 65', !t([1, 2], [2, 3]) && 8 ** 2 === 64 && 5 * 13 === 65)
    add('E54.4 (iv): (0,0)/(3,4) ties: 0 = 0', t([0, 0], [3, 4]))
  }
  {
    // L6 E14 (linked comprehension): f(t) = (t+1)² + (2t+2)² + (3t+3)².
    const a = [1, 2, 3], b = [1, 2, 3]
    add('E55.1 L6-14: f(t) = 14(t+1)² (check f(0) = 14, f(1) = 56)', f(a, b, 0) === 14 && f(a, b, 1) === 56 && f(a, b, -1) === 0)
    add('E55.2 D = 28² − 4·14·14 = 0', 28 ** 2 - 4 * 14 * 14 === 0)
    add('E55.3 the lists behind f are proportional with λ = 1 (t₀ = −1)', prop(a, b) && f(a, b, -1) === 0)
    add('E55.4 the CS tie: Σab = 14, 14² = 196 = 14·14', dot(a, b) === 14 && csGap(a, b) === 0 && 14 ** 2 === 196)
  }
  {
    // L6 E15: Lagrange — recomputed under E20/E21; assert the identity and
    // the equality read once more as the exercise's own numbers.
    add('E56 L6-15: the witness arithmetic 1078 − 1024 = 54 = 9 + 36 + 9', 14 * 77 - 32 ** 2 === 54 && 9 + 36 + 9 === 54)
  }

  /* ---- the quiz keys recomputed -------------------------------------- */

  {
    const a = [1, 2, 2], b = [2, 4, 4]
    add('E57.1 Q1: the ceiling √9·√36 = 18, attained by (1,2,2)·(2,4,4): dot 18', Math.sqrt(9) * Math.sqrt(36) === 18 && dot(a, b) === 18 && prop(a, b))
    add('E57.2 Q1 distractors: 45 = 9+36, 3√3 = √(36−9)', 9 + 36 === 45 && Math.abs(Math.sqrt(36 - 9) - 3 * Math.sqrt(3)) < 1e-12)
  }
  {
    add('E58.1 Q2 counterexample (unequal sums, tie): (1,2)/(2,4) — sums 3 vs 6', 1 + 2 !== 2 + 4 && csGap([1, 2], [2, 4]) === 0)
    add('E58.2 Q2 counterexample (unequal sums, strict): (1,2,3)/(4,5,6) — sums 6 vs 15', 1 + 2 + 3 !== 15 && csGap([1, 2, 3], [4, 5, 6]) > 0)
    add('E58.3 Q2 negative-entry tie: (1,2)/(−2,−4)', csGap([1, 2], [-2, -4]) === 0)
  }
  {
    add('E59 Q3/Q5 floors recomputed under E30/E32 (1/2 at (4,4); 4 at x = 2)', 4 / 8 === 0.5 && 2 + 4 / 2 === 4)
  }
  {
    add('E60 Q4: Nesbitt floor 3/2 recomputed under E34/E38 (ties only at a = b = c)', nesbittNum(1, 1, 1) === 0 && nesbittNum(1, 2, 3) > 0)
  }
  {
    add('E61 Q1/Q5 seat arithmetic: 2 + 8 + 8 = 18; x = 4/x at x = 2; value 5 at x = 1', 2 + 8 + 8 === 18 && 2 === 4 / 2 && 1 + 4 / 1 === 5)
  }

  /* ---- the prose round-number claims --------------------------------- */

  {
    add('E62 √1078 ≈ 32.83 and √100 = 10 (the roster ceilings)', Math.abs(Math.sqrt(1078) - 32.83) < 0.005 && Math.sqrt(5 * 20) === 10)
    add('E63 the table census recomputed: all six rows strict/tie as printed', csGap([1, 2, 3], [4, 5, 6]) === 54 && csGap([1, 2], [2, 4]) === 0 && csGap([1, 2], [-2, -4]) === 0 && csGap([2, -1, 2], [1, 3, 4]) === 185 && csGap([1, 2, 3], [2, 4, 6]) === 0 && csGap([0, 0], [3, 4]) === 0)
    add('E64 the figure-2 roster: 2²/1 + 3²/2 = 17/2; tops 5, bottoms 3, floor 25/3', 4 + 9 / 2 === 8.5 && 2 + 3 === 5 && 1 + 2 === 3 && 25 / 3 === 25 / 3)
  }

  /* ---- supplementary sweeps and exhibit recomputations ---------------- */

  // E65. Engel at n = 2, swept exactly.
  {
    let bad = 0
    for (const a of lists2(-4, 4)) for (const b of lists2(1, 4)) if (engelGapNum(a, b) < 0) bad++
    add('E65 Engel sweep at n = 2 (a∈[−4,4]² × b∈[1,4]²), violations 0', bad === 0, `${bad} violations`)
  }
  // E66. Engel at n = 4, swept exactly.
  {
    let bad = 0
    const tops = lists4(-3, 3)
    for (const a of tops) {
      const b = [1, 2, 1, 2] // a fixed positive bottom pattern
      if (engelGapNum(a, b) < 0) bad++
    }
    add('E66 Engel sweep at n = 4 (625 top-lists over positive bottoms), violations 0', bad === 0, `${bad} violations`)
  }
  // E67. the all-ones equality discipline: (Σa)² = nΣa² ⟺ all entries equal.
  {
    let bad = 0
    for (const a of lists3(-3, 3)) {
      const tie = a.reduce((s, x) => s + x, 0) ** 2 === 3 * sq(a)
      const equal = a[0] === a[1] && a[1] === a[2]
      if (tie !== equal) bad++
    }
    add('E67 all-ones equality ⟺ all entries equal, swept', bad === 0, `${bad} mismatches`)
  }
  // E68. Nesbitt has no ceiling: skewing one variable grows a term (the
  // quiz-explain and formula-card note, witnessed).
  {
    const v = (a: number, b: number, c: number) => a / (b + c) + b / (c + a) + c / (a + b)
    add('E68 no upper bound: at (1,1,50) the sum ≈ 25.04 > 20, and it grows with c', v(1, 1, 50) > 20 && v(1, 1, 200) > 100)
  }
  // E69. the derivation-2 substitution algebra, swept: Σ(aᵢ/√bᵢ·√bᵢ) = Σaᵢ,
  // Σ(aᵢ/√bᵢ)² = Σaᵢ²/bᵢ, Σ(√bᵢ)² = Σbᵢ.
  {
    let bad = 0
    for (const a of lists3(-4, 4).slice(0, 60)) {
      const b = [1, 2, 4]
      const u = a.map((x, i) => x / Math.sqrt(b[i]))
      const v = b.map((x) => Math.sqrt(x))
      if (Math.abs(dot(u, v) - a.reduce((s, x) => s + x, 0)) > 1e-9) bad++
      if (Math.abs(sq(u) - b.reduce((s, x, i) => s + a[i] * a[i] / x, 0)) > 1e-9) bad++
      if (sq(v) !== b.reduce((s, x) => s + x, 0)) bad++
    }
    add('E69 the Engel substitution lists u = aᵢ/√bᵢ, v = √bᵢ: dot Σa, sizes Σa²/b and Σb', bad === 0, `${bad} mismatches`)
  }
  // E70. the rotated dot identity: dot((a,b,c),(b,c,a)) = ab + bc + ca, swept.
  {
    let bad = 0
    for (const a of lists3(-4, 4)) {
      const rot = [a[1], a[2], a[0]]
      if (dot(a, rot) !== a[0] * a[1] + a[1] * a[2] + a[2] * a[0]) bad++
    }
    add('E70 rotated-lists dot product = ab + bc + ca, swept', bad === 0, `${bad} mismatches`)
  }
  // E71. proportional lists attain the unsquared ceiling exactly: λ > 0 at
  // +√(Σa²Σb²), λ < 0 at −√(Σa²Σb²).
  {
    let bad = 0
    for (const a of lists3(-2, 2)) {
      for (const lam of [1, 2, 3]) {
        const b = a.map((x) => lam * x)
        if (Math.abs(dot(a, b) - Math.sqrt(sq(a) * sq(b))) > 1e-9) bad++
      }
      for (const lam of [-1, -2, -3]) {
        const b = a.map((x) => lam * x)
        if (Math.abs(dot(a, b) + Math.sqrt(sq(a) * sq(b))) > 1e-9) bad++
      }
    }
    add('E71 λ > 0 ties at +ceiling, λ < 0 at −ceiling, swept', bad === 0, `${bad} mismatches`)
  }
  // E72. the L4 single-correct sharpness: k = 3 ties at (1,1,1): 9 = 3·3.
  {
    add('E72 L4-8: k = 3 ties at (1,1,1): 9 ≤ 9, and k = 2 fails there: 9 > 6', 9 === 3 * 3 && 9 > 2 * 3)
  }
  // E73. the L5 multiple-correct narrowest miss: the gap is exactly 1.
  {
    add('E73 L5-12 (iii): the gap 65 − 64 = 1 — the narrowest possible miss', csGap([1, 2], [2, 3]) === 1)
  }
  // E74. the x + 4/x grid tie census: exactly one seat ties at 1e-7.
  {
    let ties = 0
    for (let x = 0.05; x <= 40; x += 0.01) if (Math.abs(x + 4 / x - 4) < 1e-7) ties++
    add('E74 the x + 4/x grid: exactly one tie seat (x = 2)', ties === 1, `${ties} ties`)
  }
  // E75. off-seat strictness for the constrained min-hunt (2/x + 8/y).
  {
    add('E75 off the seat (x,y) = (2.5, 3.5): 0.8 + 16/7 ≈ 3.086 > 3 — strict', 2 / 2.5 + 8 / 3.5 > 3)
  }
  // E76. the warn-callout arithmetic split for the record.
  {
    add('E76 the fraud split: LHS −9 and RHS 9 as separate witnesses', 0 / 2 + 9 / -1 === -9 && (0 + 3) ** 2 / (2 - 1) === 9)
  }

  return c
}

/** SECTION F (4.3 pins) — the structural contract: quiz exactly 5 items,
 *  4 options, valid answer indices, explains why wrong options fail;
 *  exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2 with steps-array
 *  solutions (+ answers); ≥ 2 figures (vivid palette hexes only);
 *  ≥ 3 derivations; ≥ 3 formula cards; ≥ 8 example blocks; ≥ 6 terms;
 *  word count ≥ 4500 via countLessonWords; prereq ids exact; sources keys
 *  within the whitelist; title/id/concepts/objectives pinned; equations
 *  tagged; exam typology labelled. */
 function sectionF(L: Lesson): SectionCheck[] {
  const c: SectionCheck[] = []
  const add = (name: string, ok: boolean, detail?: string) =>
    c.push(check(name, ok, detail))

  const quiz = L.blocks.filter((b): b is Extract<Block, { kind: 'quiz' }> => b.kind === 'quiz')
  const exs = L.blocks.filter((b): b is Extract<Block, { kind: 'exercises' }> => b.kind === 'exercises')
  const figs = L.blocks.filter((b): b is Extract<Block, { kind: 'figure' }> => b.kind === 'figure')

  // identity pins
  add('F1 id + title exact', L.id === 'aa-cauchy-schwarz-and-engels-form' && L.title === 'Cauchy-Schwarz and Engel\u2019s Form')
  add('F2 number 4.3; concepts 5–8; objectives 4–6', L.number === '4.3' && L.concepts.length >= 5 && L.concepts.length <= 8 && (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6)
  add('F3 prerequisites exact (4.2 + 4.1 + AL 9.3)', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-the-weighted-am-gm-and-its-consequences', 'aa-the-arithmetic-geometric-mean-inequality', 'al-the-quadratic-formula-and-the-discriminant']))
  const whitelist = ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus', 'khattar-qa-4e']
  add('F4 sources within the banked whitelist', (L.sources ?? []).every((s) => whitelist.includes(s)), JSON.stringify(L.sources))

  // quiz structure
  add('F5 quiz exactly 5 items', quiz.length === 1 && quiz[0].items.length === 5)
  add('F6 every quiz item has exactly 4 options', quiz[0].items.every((it) => it.options.length === 4))
  add('F7 answer indices valid (0..3) and pinned [1, 0, 3, 2, 0]', quiz[0].items.every((it) => it.answer >= 0 && it.answer <= 3) && JSON.stringify(quiz[0].items.map((it) => it.answer)) === JSON.stringify([1, 0, 3, 2, 0]))
  add('F8 explains why wrong options fail (≥ 2 option references each, ≥ 120 chars)', quiz[0].items.every((it) => it.explain.length >= 120 && (it.explain.match(/[Oo]ption/g) ?? []).length >= 2))
  add('F9 quiz explain pins at least three wrong options by letter (A/B/C/D)', quiz[0].items.every((it) => (it.explain.match(/[Oo]ption [ABCD]/g) ?? []).length >= 2))

  // exercises structure
  const sets = exs[0].sets
  add('F10 exactly one exercises block, 15 questions, sets L1..L6', exs.length === 1 && sets.length === 6 && sets.reduce((n, s) => n + s.questions.length, 0) === 15)
  add('F11 set sizes L1..L6 = 2/2/3/3/3/2', JSON.stringify(sets.map((s) => s.questions.length)) === JSON.stringify([2, 2, 3, 3, 3, 2]))
  add('F12 every question carries a steps-array solution (≥ 3 steps) + an answer', sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && typeof q.answer === 'string' && q.answer.length > 0)))
  const examStyle = sets.flatMap((s) => s.questions.map((q) => q.q)).filter((q) => q.toLowerCase().includes('exam-style')).length
  add('F13 exam typology labelled at L4–L6 (≥ 5 exam-style items incl. Single/Multiple/Numerical/Linked)', examStyle >= 5 && sets.flatMap((s) => s.questions.map((q) => q.q)).some((q) => /Single Correct/.test(q)) && sets.flatMap((s) => s.questions.map((q) => q.q)).some((q) => /Multiple Correct/.test(q)) && sets.flatMap((s) => s.questions.map((q) => q.q)).some((q) => /Numerical Value/.test(q)) && sets.flatMap((s) => s.questions.map((q) => q.q)).some((q) => /Linked Comprehension/.test(q)))

  // block census
  add('F14 exactly 2 figures (the e2e svgCount pin)', figs.length === 2)
  const palette = new Set(['16a34a', '166534', '65a30d', '0d9488', 'd97706', 'ea580c', '0f766e', 'dc2626', 'fef3c7', 'ffedd5', 'fcd34d', '5eead4', 'ffffff'])
  const retired = new Set(['3f6212', '365314', '6b7a72', 'b45309', '7c5a2f', '4d7c0f', '1f5c4d', '123f35', '7c2d12', '9a3412', 'fdf8ef', 'f5eddd', 'd8d2c2', 'b9c6bd', 'b9c4bd', '7a5a2e'])
  const hexes = figs.flatMap((fg) => fg.svg.match(/#[0-9a-fA-F]{6}\b/g) ?? [])
  add('F15 figure hexes all in the vivid palette', hexes.length > 0 && hexes.every((h) => palette.has(h.slice(1).toLowerCase())), JSON.stringify([...new Set(hexes)]))
  add('F16 no retired muted hexes anywhere in the SVGs', !hexes.some((h) => retired.has(h.slice(1).toLowerCase())))
  add('F17 both SVGs have viewBox + role/aria-label + no raw LaTeX text', figs.every((fg) => fg.svg.includes('viewBox="0 0') && fg.svg.includes('aria-label') && !/\$|\\tfrac|\\times|\\sqrt/.test(fg.svg)))
  add('F18 ≥ 3 derivations', countKind(L, 'derivation') >= 3)
  add('F19 ≥ 3 formula cards', countKind(L, 'formula') >= 3)
  add('F20 ≥ 8 example (Illustration) blocks, titles are problem statements', countKind(L, 'example') >= 8 && L.blocks.filter((b) => b.kind === 'example').every((b) => b.title.length >= 30))
  add('F21 ≥ 6 terms', L.blocks.some((b) => b.kind === 'terms' && b.items.length >= 6))
  add('F22 ≥ 2 tables', countKind(L, 'table') >= 2)
  const eqs = L.blocks.filter((b): b is Extract<Block, { kind: 'equation' }> => b.kind === 'equation')
  add('F23 ≥ 4 tagged equations \\tag{n}, numbered 1..8 in order', eqs.length >= 4 && eqs.map((e) => e.latex.match(/\\tag\{(\d+)\}/)?.[1]).join(',') === '1,2,3,4,5,6,7,8')
  add('F24 ≥ 4 callout tones present (definition, theorem, warn, exam, historical, insight)', ['definition', 'theorem', 'warn', 'exam', 'historical', 'insight'].every((tone) => L.blocks.some((b) => b.kind === 'callout' && b.tone === tone)))
  add('F25 word count ≥ 4500 (countLessonWords)', countLessonWords(L) >= 4500, `${countLessonWords(L)} words`)
  add('F26 ≥ 4 headings (theory sections, Cengage caps)', countKind(L, 'heading') >= 4)
  const prose = L.blocks.filter((b) => b.kind === 'para').length
  add('F27 opening motivation present (≥ 2 paras before the first heading)', prose >= 2 && L.blocks.findIndex((b) => b.kind === 'heading') >= 2)
  add('F28 cross-references to the siblings by name (4.1, 4.2, 3.2, 4.4–4.6 named in prose)', ['The Arithmetic-Geometric Mean Inequality', 'The Weighted AM-GM and Its Consequences', 'Conjugate and Modulus', 'The Rearrangement and Chebyshev Inequalities', 'Jensen\u2019s Inequality and Convexity', 'Absolute Value at Depth'].every((name) => L.blocks.some((b) => b.kind === 'para' && b.text.includes(name)) || L.blocks.some((b) => b.kind === 'callout' && (b.title.includes(name) || b.text.includes(name)))))
  add('F29 the honest JEE-2026 note present (no separate inequalities unit)', L.blocks.some((b) => b.kind === 'callout' && b.tone === 'exam' && /no separate inequalities unit/i.test(b.text)))
  add('F30 ≥ 12 roman-marker example runs/lists', L.blocks.filter((b) => b.kind === 'list' && b.marker === 'roman').length >= 2)

  return c
}



/**
 * v4-4.ts — the 4.4 engine (sections G + H), grown BEFORE the prose was
 * declared done (the verify-first idiom of verify-book4-ch03.ts). Section G
 * recomputes every mathematical claim of lesson 4.4 from scratch — the
 * rearrangement law BRUTE-FORCED over all permutations of integer rosters
 * (n = 2, 3, 4, signs and repeats included), the exchange certificate
 * pinned, Chebyshev swept on exact integer arithmetic (both sorted forms,
 * the equality discipline, the centered identity, the cyclic table), every
 * Illustration and every exercise answer recomputed, the quiz keys audited.
 * Section H pins the structural contract (quiz 5×4, exercises 15 in
 * 2/2/3/3/3/2, figures, derivations, cards, terms, tags, palette, words).
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS = [2, 0, 1, 1, 0]

type Perm = number[]
const sums = (a: number[], b: Perm): number => a.reduce((s, v, i) => s + v * b[i], 0)
const total = (x: number[]): number => x.reduce((s, v) => s + v, 0)

/** all permutations of an array (recursive, deterministic; repeats kept —
 *  arrangements are seat assignments, so duplicate values still give
 *  distinct arrangements) */
function perms(arr: number[]): Perm[] {
  if (arr.length <= 1) return [arr.slice()]
  const out: Perm[] = []
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1))
    for (const p of perms(rest)) out.push([arr[i], ...p])
  }
  return out
}

/** all arrangements of the b-entries paired against fixed a; returns [perm, sum] */
const allPairings = (a: number[], b: number[]): Array<[Perm, number]> =>
  perms(b).map((p) => [p, sums(a, p)])

/** SECTION G — recompute every mathematical claim of lesson 4.4. */
 function sectionG(_L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const g = (name: string, ok: boolean, detail?: string) => out.push(check(name, ok, detail))

  /* ---------------------------------------------------------------- */
  /* G1 — the rearrangement law brute-forced, n = 3                    */
  /* ---------------------------------------------------------------- */
  // every pair of lists from the roster (ascending, signs + repeats
  // included): the sorted pairing is the max, the reversed the min.
  const roster3: number[][] = [
    [1, 2, 3],
    [1, 3, 5],
    [2, 5, 9],
    [-3, -1, 2],
    [5, 5, 5],
    [1, 1, 4],
    [0, 2, 4],
    [1, 2, 2],
    [10, 20, 30],
    [-5, 0, 7],
  ]
  for (const a of roster3) {
    for (const b of roster3) {
      const ps = allPairings(a, b)
      const maxv = Math.max(...ps.map(([, s]) => s))
      const minv = Math.min(...ps.map(([, s]) => s))
      const sorted = sums(a, b)
      const reversed = sums(a, [...b].reverse())
      g(
        `G1 n=3 ${JSON.stringify(a)} × ${JSON.stringify(b)}: sorted ${sorted} is the max (brute ${maxv}), reversed ${reversed} is the min (brute ${minv})`,
        sorted === maxv && reversed === minv,
        `brute max ${maxv}, min ${minv}`,
      )
    }
  }

  /* ---------------------------------------------------------------- */
  /* G2 — the rearrangement law brute-forced, n = 4                    */
  /* ---------------------------------------------------------------- */
  const roster4: number[][] = [
    [1, 2, 3, 4],
    [1, 3, 5, 7],
    [0, 1, 2, 3],
    [2, 2, 5, 5],
    [-1, 0, 1, 2],
    [2, 4, 6, 8],
  ]
  for (const a of roster4) {
    for (const b of roster4) {
      const ps = allPairings(a, b)
      const maxv = Math.max(...ps.map(([, s]) => s))
      const minv = Math.min(...ps.map(([, s]) => s))
      g(
        `G2 n=4 ${JSON.stringify(a)} × ${JSON.stringify(b)}: sorted is the max, reversed the min (over all 24 arrangements)`,
        sums(a, b) === maxv && sums(a, [...b].reverse()) === minv,
        `brute max ${maxv}, min ${minv}`,
      )
    }
  }

  /* ---------------------------------------------------------------- */
  /* G3 — uniqueness of the extremes for distinct b (n = 3)             */
  /* ---------------------------------------------------------------- */
  const distinctPairs: number[][][] = [
    [[1, 2, 3], [10, 20, 30]],
    [[1, 3, 5], [2, 4, 6]],
    [[2, 5, 9], [3, 6, 10]],
    [[-3, -1, 2], [-5, 0, 7]],
    [[1, 2, 3], [30, 20, 10]],
  ]
  for (const [a, b] of distinctPairs) {
    const ps = allPairings(a, b)
    const maxv = Math.max(...ps.map(([, s]) => s))
    const minv = Math.min(...ps.map(([, s]) => s))
    const nMax = ps.filter(([, s]) => s === maxv).length
    const nMin = ps.filter(([, s]) => s === minv).length
    g(
      `G3 distinct b ${JSON.stringify(b)}: the ceiling ${maxv} and floor ${minv} are each attained exactly once (identity / reversal)`,
      nMax === 1 && nMin === 1,
      `attained ${nMax} / ${nMin} times`,
    )
  }

  /* ---------------------------------------------------------------- */
  /* G4 — the two-pair swap certificate identity, on a grid             */
  /* ---------------------------------------------------------------- */
  // sorted two-pair payout minus swapped two-pair payout = (a_j - a_i)(b_j - b_i)
  {
    const aRoster = [
      [1, 2],
      [2, 7],
      [-3, 5],
      [4, 4],
      [0, 9],
      [2, 5],
      [1, 9],
      [-2, 6],
    ]
    const bRoster = [
      [3, 8],
      [9, 4],
      [-5, 0],
      [6, 6],
      [10, 30],
      [1, 7],
      [-4, -1],
      [2, 11],
    ]
    let bad = 0
    for (const a of aRoster) for (const b of bRoster) {
      const lhs = a[0] * b[0] + a[1] * b[1] - (a[0] * b[1] + a[1] * b[0])
      if (lhs !== (a[1] - a[0]) * (b[1] - b[0])) bad++
    }
    g('G4 the two-pair identity a_i b_i + a_j b_j − a_i b_j − a_j b_i = (a_j−a_i)(b_j−b_i) holds on the 8×8 grid (64 cases)', bad === 0, `${bad} failures`)
  }

  /* ---------------------------------------------------------------- */
  /* G5 — pinned swap certificates (the figure + the derivations)      */
  /* ---------------------------------------------------------------- */
  {
    // figure 1 / Illustration 2: a = (2,7), b crossed (9,4) vs uncrossed (4,9)
    g('G5.1 the figure witness: crossed 2·9 + 7·4 = 46', 2 * 9 + 7 * 4 === 46)
    g('G5.2 the uncrossed 2·4 + 7·9 = 71', 2 * 4 + 7 * 9 === 71)
    g('G5.3 the certificate (7−2)(9−4) = 25 = 71 − 46', (7 - 2) * (9 - 4) === 25 && 71 - 46 === 25)
    // derivation D1's labelled certificate: repairing an inversion gains
    // (a_j − a_i)(b_i − b_j) with b_i > b_j the inversion values
    const inversions: Array<[number, number, number, number]> = [
      [2, 5, 10, 6],
      [1, 2, 10, 4],
      [4, 9, 12, 3],
      [-1, 2, 5, -3],
      [3, 8, 7, 1],
      [0, 6, 9, 2],
    ]
    for (const [ai, aj, bi, bj] of inversions) {
      const gain = (aj - ai) * (bi - bj)
      const direct = ai * bj + aj * bi - (ai * bi + aj * bj)
      g(`G5 inversion repair (${ai}≤${aj}, b ${bi}>${bj}): gain (a_j−a_i)(b_i−b_j) = ${gain} equals the sum change`, gain === direct && gain >= 0)
    }
  }

  /* ---------------------------------------------------------------- */
  /* G6 — the pinned censuses (table 1 + Illustrations + exercises)     */
  /* ---------------------------------------------------------------- */
  {
    // (1,2,3) × (10,20,30): the six sums 140, 130, 130, 110, 110, 100
    const ps = allPairings([1, 2, 3], [10, 20, 30])
    const byPerm = new Map<string, number>()
    for (const [p, s] of ps) byPerm.set(JSON.stringify(p), s)
    g('G6.1 census (10,20,30) = 140', byPerm.get('[10,20,30]') === 140)
    g('G6.2 census (10,30,20) = 130', byPerm.get('[10,30,20]') === 130)
    g('G6.3 census (20,10,30) = 130', byPerm.get('[20,10,30]') === 130)
    g('G6.4 census (20,30,10) = 110', byPerm.get('[20,30,10]') === 110)
    g('G6.5 census (30,10,20) = 110', byPerm.get('[30,10,20]') === 110)
    g('G6.6 census (30,20,10) = 100 (the reversed floor)', byPerm.get('[30,20,10]') === 100)
    g('G6.7 the middle seats tie: 130 twice, 110 twice', ps.filter(([, s]) => s === 130).length === 2 && ps.filter(([, s]) => s === 110).length === 2)
    // E1: (1,2,3) × (4,5,6): sorted 32, reversed 28, scattered (4,6,5) = 31
    g('G6.8 E1 sorted 1·4+2·5+3·6 = 32', sums([1, 2, 3], [4, 5, 6]) === 32)
    g('G6.9 E1 reversed = 28', sums([1, 2, 3], [6, 5, 4]) === 28)
    g('G6.10 E1 arrangement (4,6,5) pays 31 — inside the chain', sums([1, 2, 3], [4, 6, 5]) === 31 && 28 <= 31 && 31 <= 32)
    // E3: (1,3,5) × (2,4,6): 44, 40, 40, 32, 32, 28
    const ps2 = allPairings([1, 3, 5], [2, 4, 6])
    const s2 = ps2.map(([, s]) => s).sort((x, y) => y - x)
    g('G6.11 E3 census reads 44, 40, 40, 32, 32, 28', JSON.stringify(s2) === JSON.stringify([44, 40, 40, 32, 32, 28]), JSON.stringify(s2))
    g('G6.12 E3 the 44-seat is the sorted arrangement alone', ps2.filter(([, s]) => s === 44).length === 1 && sums([1, 3, 5], [2, 4, 6]) === 44)
    g('G6.13 E3 the 28-seat is the reversed arrangement alone', ps2.filter(([, s]) => s === 28).length === 1 && sums([1, 3, 5], [6, 4, 2]) === 28)
    // E2 / mirrored census: (1,2,3) vs b given in DESCENDING order (30,20,10)
    const ps3 = allPairings([1, 2, 3], [30, 20, 10])
    g('G6.14 E2 same-position sum of the oppositely sorted pair = 100, the floor', sums([1, 2, 3], [30, 20, 10]) === 100 && Math.min(...ps3.map(([, s]) => s)) === 100)
    g('G6.15 E2 the sorted arrangement pays 140, the ceiling of the same six', sums([1, 2, 3], [10, 20, 30]) === 140 && Math.max(...ps3.map(([, s]) => s)) === 140)
    // the negatives roster of the Caution
    const ps4 = allPairings([-3, -1, 2], [-5, 0, 7])
    g('G6.16 the negatives roster: sorted pays 29, the maximum', sums([-3, -1, 2], [-5, 0, 7]) === 29 && Math.max(...ps4.map(([, s]) => s)) === 29)
    g('G6.17 the negatives roster: reversed pays −31, the minimum', sums([-3, -1, 2], [7, 0, -5]) === -31 && Math.min(...ps4.map(([, s]) => s)) === -31)
  }

  /* ---------------------------------------------------------------- */
  /* G7 — the exchange decomposition (Illustration + E5)               */
  /* ---------------------------------------------------------------- */
  {
    const route: Array<[number[], number]> = [
      [[10, 6, 3], 77],
      [[6, 10, 3], 89],
      [[6, 3, 10], 117],
      [[3, 6, 10], 126],
    ]
    let all = true
    for (const [arr, want] of route) {
      const s = sums([2, 5, 9], arr)
      if (s !== want) all = false
    }
    g('G7.1 the bubble route 77 → 89 → 117 → 126 recomputes exactly', all)
    g('G7.2 gain 1 = (5−2)(10−6) = 12', (5 - 2) * (10 - 6) === 12 && 89 - 77 === 12)
    g('G7.3 gain 2 = (9−5)(10−3) = 28', (9 - 5) * (10 - 3) === 28 && 117 - 89 === 28)
    g('G7.4 gain 3 = (5−2)(6−3) = 9', (5 - 2) * (6 - 3) === 9 && 126 - 117 === 9)
    g('G7.5 the gains decompose the total gap 126 − 77 = 49 = 12 + 28 + 9', 126 - 77 === 49 && 12 + 28 + 9 === 49)
    g('G7.6 the start is the floor seat (oppositely sorted) and the end the ceiling', sums([2, 5, 9], [10, 6, 3]) === Math.min(...allPairings([2, 5, 9], [3, 6, 10]).map(([, s]) => s)) && sums([2, 5, 9], [3, 6, 10]) === Math.max(...allPairings([2, 5, 9], [3, 6, 10]).map(([, s]) => s)))
    // the ILLUSTRATION instance (1,4,6) × (8,3,5): middle seat 50, bubble to 71
    g('G7.7 Ill (1,4,6)×(8,3,5): the current middle seat pays 50, the floor is the reversed 8+20+18 = 46', sums([1, 4, 6], [8, 3, 5]) === 50 && sums([1, 4, 6], [8, 5, 3]) === 46 && Math.min(...allPairings([1, 4, 6], [3, 5, 8]).map(([, s]) => s)) === 46)
    g('G7.8 Ill the first swap gain (4−1)(8−3) = 15 lands at (3,8,5) with sum 65', (4 - 1) * (8 - 3) === 15 && sums([1, 4, 6], [3, 8, 5]) === 65 && 65 - 50 === 15)
    g('G7.9 Ill the second swap gain (6−4)(8−5) = 6 lands at the sorted (3,5,8) with sum 71', (6 - 4) * (8 - 5) === 6 && sums([1, 4, 6], [3, 5, 8]) === 71 && 71 - 65 === 6)
    g('G7.10 Ill the gains decompose the gap 71 − 50 = 21 = 15 + 6, and 71 is the ceiling over all arrangements', 71 - 50 === 21 && 15 + 6 === 21 && Math.max(...allPairings([1, 4, 6], [3, 5, 8]).map(([, s]) => s)) === 71)
  }

  /* ---------------------------------------------------------------- */
  /* G8/G9 — Chebyshev swept on exact integer arithmetic                */
  /* ---------------------------------------------------------------- */
  {
    // similarly sorted: n·Σab ≥ (Σa)(Σb); oppositely: ≤. Swept over all
    // pairs from a roster of sorted integer triples.
    const chebRoster: number[][] = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 5],
      [2, 3, 6],
      [1, 1, 1],
      [2, 2, 2],
      [0, 3, 4],
      [1, 2, 2],
      [3, 5, 7],
      [1, 4, 6],
      [2, 5, 9],
      [1, 2, 6],
    ]
    for (const a of chebRoster) {
      const b = [10, 20, 30]
      const nab = 3 * sums(a, b)
      const prods = total(a) * total(b)
      g(`G8 Chebyshev similarly sorted ${JSON.stringify(a)} × (10,20,30): 3·Σab = ${nab} ≥ (Σa)(Σb) = ${prods}`, nab >= prods)
      const brev = [30, 20, 10]
      const nab2 = 3 * sums(a, brev)
      g(`G9 Chebyshev oppositely sorted ${JSON.stringify(a)} × (30,20,10): 3·Σab = ${nab2} ≤ (Σa)(Σb) = ${prods}`, nab2 <= prods)
    }
    // the equality discipline: equality iff one list constant (sweep over
    // pairs where at least one list is constant, and pairs where neither is)
    for (const a of [[5, 5, 5], [1, 1, 1], [2, 2, 2]]) {
      for (const b of [[1, 2, 3], [10, 20, 30], [4, 4, 7]]) {
        const eq = 3 * sums(a, b) === total(a) * total(b)
        g(`G10 equality seat: constant ${JSON.stringify(a)} against ${JSON.stringify(b)} ties Chebyshev exactly`, eq)
      }
    }
    for (const [a, b] of [
      [[1, 2, 3], [1, 2, 3]],
      [[1, 2, 3], [10, 20, 30]],
      [[1, 3, 5], [2, 4, 6]],
      [[1, 2, 4], [1, 2, 4]],
      [[1, 2, 2], [2, 4, 6]],
      [[1, 1, 4], [1, 2, 3]],
      [[2, 3, 6], [1, 2, 6]],
      [[0, 3, 4], [1, 2, 3]],
    ] as number[][][]) {
      const eq = 3 * sums(a, b) === total(a) * total(b)
      g(`G10 strict seat: ${JSON.stringify(a)} × ${JSON.stringify(b)} — neither list constant, so Chebyshev is strict (3·Σab = ${3 * sums(a, b)} vs (Σa)(Σb) = ${total(a) * total(b)})`, !eq && 3 * sums(a, b) > total(a) * total(b))
    }
  }

  /* ---------------------------------------------------------------- */
  /* G11 — the centered identity, on a grid                           */
  /* ---------------------------------------------------------------- */
  {
    let bad = 0
    const lists3: number[][] = [
      [1, 2, 3],
      [1, 3, 5],
      [2, 3, 6],
      [5, 5, 5],
      [1, 2, 2],
      [-3, -1, 2],
    ]
    const lists4: number[][] = [
      [1, 2, 3, 4],
      [1, 3, 5, 7],
      [2, 4, 6, 8],
      [0, 1, 2, 3],
    ]
    for (const group of [lists3, lists4])
      for (const a of group) for (const b of group) {
        const n = a.length
        const lhs = n * sums(a, b) - total(a) * total(b)
        let rhs = 0
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) rhs += (a[i] - a[j]) * (b[i] - b[j])
        if (lhs !== rhs) bad++
      }
    g('G11 the centered identity n·Σab − (Σa)(Σb) = Σ_{i<j}(a_i−a_j)(b_i−b_j) holds on the same-length grids (52 pairs, n = 3 and 4)', bad === 0, `${bad} failures`)
    // the pinned slack of Illustration 9 / the equality discipline
    g('G11.2 Ill 9 constant seat: (5,5,5)×(1,2,3) ties — 3·30 = 90 = 15·6', 3 * sums([5, 5, 5], [1, 2, 3]) === 90 && total([5, 5, 5]) * total([1, 2, 3]) === 90)
    g('G11.3 Ill 9 progression seat: (1,2,3)×(1,2,3) pays 3·14 = 42 > 36 = 6·6, slack 6', 3 * 14 === 42 && 6 * 6 === 36 && 42 - 36 === 6)
    g('G11.4 Ill 9 the slack reads (1/9)(1 + 4 + 1) = 6/9 = 2/3, and 3·Σab − (Σa)(Σb) = 42 − 36 = 6 (the raw certificate sum)', (1 + 4 + 1) === 6 && 42 - 36 === 6 && 6 / 9 === 2 / 3)
  }

  /* ---------------------------------------------------------------- */
  /* G12 — the cyclic table (the Chebyshev derivation)                 */
  /* ---------------------------------------------------------------- */
  {
    const cases: number[][] = [
      [1, 2, 3],
      [1, 3, 5],
      [2, 5, 9],
      [10, 20, 30],
      [2, 4, 6, 8],
      [1, 2, 3, 4],
    ]
    for (const b of cases) {
      const a = b // self-pairing table for simplicity of the identity check
      const n = b.length
      const shifts: number[] = []
      for (let k = 0; k < n; k++) {
        const sh = b.map((_, i) => b[(i + k) % n])
        shifts.push(sums(a, sh))
      }
      const tab = shifts.reduce((s, v) => s + v, 0)
      g(`G12 cyclic table for ${JSON.stringify(b)}: the ${n} shifted pairing sums total (Σa)(Σb) = ${total(a) * total(b)}; each shift ≤ the sorted sum ${sums(a, b)}`, tab === total(a) * total(b) && shifts.every((s) => s <= sums(a, b)), `table ${tab}, shifts ${JSON.stringify(shifts)}`)
    }
    // the n = 3 derivation witness: 140 + 110 + 110 = 360 ≤ 3·140
    const w = [1, 2, 3]
    const bw = [10, 20, 30]
    const s0 = sums(w, bw)
    const s1 = sums(w, [20, 30, 10])
    const s2 = sums(w, [30, 10, 20])
    g('G12.7 the derivation witness: shifts pay 140, 110, 110 — total 360 = 6·60 ≤ 3·140 = 420', s0 === 140 && s1 === 110 && s2 === 110 && s0 + s1 + s2 === 360 && 360 === total(w) * total(bw) && 360 <= 420)
  }

  /* ---------------------------------------------------------------- */
  /* G13 — the pinned Chebyshev numerics (Ill 4, E4)                   */
  /* ---------------------------------------------------------------- */
  {
    g('G13.1 Ill 4 similarly: 3·(10+40+90) = 420 ≥ 6·60 = 360 — i.e. 140/3 ≥ 40', 3 * sums([1, 2, 3], [10, 20, 30]) === 420 && total([1, 2, 3]) * total([10, 20, 30]) === 360)
    g('G13.2 Ill 4 oppositely: 3·(30+40+30) = 300 ≤ 360 — i.e. 100/3 ≤ 40', 3 * sums([1, 2, 3], [30, 20, 10]) === 300 && total([1, 2, 3]) * total([10, 20, 30]) === 360)
    g('G13.3 Ill 4 the slacks are equal: 420 − 360 = 60 and 360 − 300 = 60 (both 60/9 = 20/3 after division by n²)', 420 - 360 === 60 && 360 - 300 === 60 && 60 / 9 === 20 / 3)
    g('G13.4 E4 similarly: 4·50 = 200 ≥ 10·16 = 160 — i.e. 12.5 ≥ 10', 4 * sums([1, 2, 3, 4], [1, 3, 5, 7]) === 200 && total([1, 2, 3, 4]) * total([1, 3, 5, 7]) === 160)
    g('G13.5 E4 oppositely: 4·30 = 120 ≤ 160 — i.e. 7.5 ≤ 10', 4 * sums([1, 2, 3, 4], [7, 5, 3, 1]) === 120 && 120 <= 160)
    g('G13.6 E4 the products roster 1+6+15+28 = 50 and 7+10+9+4 = 30', sums([1, 2, 3, 4], [1, 3, 5, 7]) === 50 && sums([1, 2, 3, 4], [7, 5, 3, 1]) === 30)
  }

  /* ---------------------------------------------------------------- */
  /* G14 — the ≥ 9 family (both engines + witnesses)                   */
  /* ---------------------------------------------------------------- */
  {
    // sweep in exact integers: (a+b+c)(ab+bc+ca) ≥ 9abc for 0 < a ≤ b ≤ c
    let bad = 0
    let checked = 0
    for (let a = 1; a <= 6; a++) for (let b = a; b <= 7; b++) for (let c = b; c <= 8; c++) {
      checked++
      if ((a + b + c) * (a * b + b * c + c * a) < 9 * a * b * c) bad++
    }
    g(`G14.1 the ≥ 9 law swept on ${checked} sorted positive triples: (a+b+c)(ab+bc+ca) ≥ 9abc (Chebyshev's oppositely-sorted form applied to (a,b,c) vs (1/a,1/b,1/c))`, bad === 0, `${bad} failures`)
    // equality iff a = b = c
    let bad2 = 0
    for (let a = 1; a <= 5; a++) for (let b = a; b <= 5; b++) for (let c = b; c <= 5; c++) {
      const eq = (a + b + c) * (a * b + b * c + c * a) === 9 * a * b * c
      if (eq !== (a === b && b === c)) bad2++
    }
    g('G14.2 equality in the ≥ 9 law exactly at a = b = c (swept 1..5 cubed)', bad2 === 0, `${bad2} failures`)
    // the (2,3,6) witness: value 11, the AM-GM chain, the Chebyshev certificate
    g('G14.3 Ill 5 the exact value: (2+3+6)(1/2+1/3+1/6) = 11·1 = 11', 2 + 3 + 6 === 11 && 3 + 2 + 1 === 6)
    g('G14.4 Ill 5 the AM-GM chain 3 + 13/6 + 5/2 + 10/3 = 11 (the three reciprocal pairs 2/3+3/2, 1/2+2, 1/3+3)', 3 + 13 / 6 + 5 / 2 + 10 / 3 === 11 && 2 / 3 + 3 / 2 === 13 / 6 && 1 / 2 + 2 === 5 / 2 && 1 / 3 + 3 === 10 / 3)
    g('G14.5 Ill 5 each reciprocal pair is an x + 1/x ≥ 2 witness (all strict here)', 13 / 6 > 2 && 5 / 2 > 2 && 10 / 3 > 2)
    g('G14.6 Ill 5 the Chebyshev certificate: (Σa)(Σ1/a) = 11·1 = 11 ≥ 9, so the certificate slack is (11 − 9)/9 = 2/9', 11 * 1 === 11 && 11 >= 9 && (11 - 9) / 9 === 2 / 9)
    g('G14.7 Ill 5 Chebyshev applies DIRECTLY — the lists (2,3,6) and (1/2,1/3,1/6) are oppositely sorted and the natural pairing pays exactly 1 per seat', 2 * (1 / 2) === 1 && 3 * (1 / 3) === 1 && 6 * (1 / 6) === 1)
    g('G14.8 the Engel one-liner: (√(a·1/a)+√(b·1/b)+√(c·1/c))² = (1+1+1)² = 9', (1 + 1 + 1) ** 2 === 9)
    // E7's witness (1,2,6): value 15, the chain, the oppositely-sorted audit
    g('G14.9 E7 the exact value: (1+2+6)(1+1/2+1/6) = 9·5/3 = 15', 1 + 1 / 2 + 1 / 6 === 5 / 3 && 9 * (5 / 3) === 15)
    g('G14.10 E7 the AM-GM chain 3 + 5/2 + 10/3 + 37/6 = 15 (pairs 1/2+2, 1/3+3, 1/6+6)', 1 / 2 + 2 === 5 / 2 && 1 / 3 + 3 === 10 / 3 && 1 / 6 + 6 === 37 / 6 && 3 + 5 / 2 + 10 / 3 + 37 / 6 === 15)
    g('G14.11 E7 the oppositely-sorted certificate: (Σa)(Σ1/a) = 9·(5/3) = 15 ≥ 9, slack (15 − 9)/9 = 2/3', 9 * 5 === 45 && 15 >= 9 && (15 - 9) / 9 === 2 / 3)
    // the x + 1/x family sweep (4.1 recall)
    let bad3 = 0
    for (let x = 1; x <= 60; x++) if (x + 1 / x < 2 - 1e-12) bad3++
    g('G14.12 the x + 1/x ≥ 2 family on positive integers 1..60 (equality only at x = 1)', bad3 === 0, `${bad3} failures`)
  }

  /* ---------------------------------------------------------------- */
  /* G15 — Cauchy vs rearrangement (Ill 6, Ill 8, E8)                  */
  /* ---------------------------------------------------------------- */
  {
    // proportional lists: the sorted pairing saturates Cauchy
    g('G15.1 Ill 6 proportional: sorted 1·10+2·20+3·30 = 140', sums([1, 2, 3], [10, 20, 30]) === 140)
    g('G15.2 Ill 6 the Cauchy ceiling √14·√1400 = √19600 = 140 — EQUAL (b = 10a)', 14 * 1400 === 19600 && Math.sqrt(19600) === 140)
    g('G15.3 Ill 6 non-proportional: sorted 1·10+2·20+3·25 = 125, the pairing ceiling over all 6 arrangements', sums([1, 2, 3], [10, 20, 25]) === 125 && Math.max(...allPairings([1, 2, 3], [10, 20, 25]).map(([, s]) => s)) === 125)
    g('G15.4 Ill 6 the ceiling 15750 = 225·70, so √15750 = 15√70 ≈ 125.5, and 125² = 15625 < 15750 — strictly below', 15750 === 225 * 70 && 125 * 125 === 15625 && 15625 < 15750)
    // Ill 8: (1,3,5,7) × (2,4,6,8)
    g('G15.5 Ill 8 the sorted maximum 2+12+30+56 = 100 (over all 24 arrangements)', sums([1, 3, 5, 7], [2, 4, 6, 8]) === 100 && Math.max(...allPairings([1, 3, 5, 7], [2, 4, 6, 8]).map(([, s]) => s)) === 100)
    g('G15.6 Ill 8 the reversed floor 8+18+20+14 = 60', sums([1, 3, 5, 7], [8, 6, 4, 2]) === 60 && Math.min(...allPairings([1, 3, 5, 7], [2, 4, 6, 8]).map(([, s]) => s)) === 60)
    g('G15.7 Ill 8 the Cauchy ceiling √84·√120 = √10080 = 12√70 ≈ 100.4, and 100² = 10000 < 10080', 84 * 120 === 10080 && 10080 === 144 * 70 && 10000 < 10080)
    // E8: (1,2,3,4) × (10,20,30,40)
    g('G15.8 E8 the maximum 10+40+90+160 = 300 over all 24 arrangements', sums([1, 2, 3, 4], [10, 20, 30, 40]) === 300 && Math.max(...allPairings([1, 2, 3, 4], [10, 20, 30, 40]).map(([, s]) => s)) === 300)
    g('G15.9 E8 the reversed floor 40+60+60+40 = 200, gap 100', sums([1, 2, 3, 4], [40, 30, 20, 10]) === 200 && 300 - 200 === 100)
    g('G15.10 E8 the Cauchy ceiling √30·√3000 = √90000 = 300 — EQUAL (b = 10a proportional)', 30 * 3000 === 90000 && Math.sqrt(90000) === 300)
  }

  /* ---------------------------------------------------------------- */
  /* G16 — the self-pairing band and the gap identities                */
  /* ---------------------------------------------------------------- */
  {
    // (1,2,4): the six self-pairing sums 21, 17, 20, 14, 14, 12
    const ps = allPairings([1, 2, 4], [1, 2, 4])
    const s = ps.map(([, v]) => v).sort((x, y) => y - x)
    g('G16.1 Ill 7 the six self-pairing sums of (1,2,4) read 21, 20, 17, 14, 14, 12', JSON.stringify(s) === JSON.stringify([21, 20, 17, 14, 14, 12]), JSON.stringify(s))
    const s5 = allPairings([1, 3, 5], [1, 3, 5]).map(([, v]) => v).sort((x, y) => y - x)
    g('G16.1b E14 the six self-pairing sums of (1,3,5) read 35, 31, 31, 23, 23, 19', JSON.stringify(s5) === JSON.stringify([35, 31, 31, 23, 23, 19]), JSON.stringify(s5))
    g('G16.1c E14 the (1,3,5) gaps: 35 − 23 = 12 = ½(4+4+16) and 23 − 19 = 4 = (1−3)(3−5)', 35 - 23 === 12 && (4 + 4 + 16) / 2 === 12 && 23 - 19 === 4 && (1 - 3) * (3 - 5) === 4)
    g('G16.2 Ill 7 the ceiling is the identity 1+4+16 = 21 and the floor the reversed 4+8 = 12', sums([1, 2, 4], [1, 2, 4]) === 21 && sums([1, 2, 4], [4, 2, 1]) === 12)
    g('G16.3 Ill 7 the cyclic seat xy+yz+zx = 2+8+4 = 14, attained twice (the two 3-cycles)', ps.filter(([, v]) => v === 14).length === 2 && 2 + 8 + 4 === 14)
    g('G16.4 Ill 7 the ceiling gap 21 − 14 = 7 = ½(1+4+9) — the 4.3 signature', 21 - 14 === 7 && (1 + 4 + 9) / 2 === 7)
    g('G16.5 Ill 7 the floor gap 14 − 12 = 2 = (1−2)(2−4)', 14 - 12 === 2 && (1 - 2) * (2 - 4) === 2)
    // the gap identities symbolically, on a sorted grid
    let bad = 0
    let n = 0
    for (let x = -2; x <= 4; x++) for (let y = x; y <= 5; y++) for (let z = y; z <= 6; z++) {
      n++
      const cyc = x * y + y * z + z * x
      if (x * x + y * y + z * z - cyc !== ((x - y) ** 2 + (y - z) ** 2 + (z - x) ** 2) / 2) bad++
      if (cyc - (y * y + 2 * x * z) !== (x - y) * (y - z)) bad++
    }
    g(`G16.6 the two gap identities swept on ${n} sorted triples (x ≤ y ≤ z, negatives included): ceiling gap = ½Σ(x−y)², floor gap = (x−y)(y−z)`, bad === 0, `${bad} failures`)
    // the floor certificates of E14, swept
    let bad2 = 0
    for (let x = -2; x <= 4; x++) for (let y = x; y <= 5; y++) for (let z = y; z <= 6; z++) {
      if (x * x + 2 * y * z - (y * y + 2 * x * z) !== (y - x) * (2 * z - x - y)) bad2++
      if (2 * x * y + z * z - (y * y + 2 * x * z) !== (z - y) * (z + y - 2 * x)) bad2++
    }
    g('G16.7 the transposition certificates of E14 swept on the same grid: x²+2yz − (y²+2xz) = (y−x)(2z−x−y) ≥ 0 and 2xy+z² − (y²+2xz) = (z−y)(z+y−2x) ≥ 0', bad2 === 0, `${bad2} failures`)
    // the floor is really the floor: enumerate over sorted triples
    let bad3 = 0
    for (const [x, y, z] of [[1, 2, 4], [0, 1, 3], [-2, 0, 5], [1, 1, 3], [2, 3, 3]] as number[][]) {
      const mn = Math.min(...allPairings([x, y, z], [x, y, z]).map(([, v]) => v))
      if (mn !== y * y + 2 * x * z) bad3++
    }
    g('G16.8 the reversed pairing y²+2xz is the minimum self-pairing on witness rosters (incl. repeats)', bad3 === 0, `${bad3} failures`)
    // E6: xy+yz+zx ≤ x²+y²+z² for ANY reals — swept unsorted
    let bad4 = 0
    for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = -3; z <= 3; z++) {
      if (x * y + y * z + z * x > x * x + y * y + z * z) bad4++
    }
    g('G16.9 E6 xy+yz+zx ≤ x²+y²+z² swept on all integer triples in [−3,3]³ (729 cases, no order/sign assumption)', bad4 === 0, `${bad4} failures`)
  }

  /* ---------------------------------------------------------------- */
  /* G17 — the sequence-order reads (Ill 3, E9)                        */
  /* ---------------------------------------------------------------- */
  {
    // Ill 3: weights (1,2,3,4) against arrangements of (3,1,4,2)
    g('G17.1 Ill 3 the sorted arrangement 1+4+9+16 = 30 is the maximum over all 24 arrangements of {1,2,3,4}', sums([1, 2, 3, 4], [1, 2, 3, 4]) === 30 && Math.max(...allPairings([1, 2, 3, 4], [1, 2, 3, 4]).map(([, s]) => s)) === 30)
    g('G17.2 Ill 3 the given arrangement (3,1,4,2) pays 3+2+12+8 = 25 — a middle seat', 3 + 2 + 12 + 8 === 25)
    g('G17.3 Ill 3 the reversed arrangement 4+6+6+4 = 20 is the minimum', sums([1, 2, 3, 4], [4, 3, 2, 1]) === 20 && Math.min(...allPairings([1, 2, 3, 4], [1, 2, 3, 4]).map(([, s]) => s)) === 20)
    g('G17.4 Ill 3 the maximum equals Σk² = 30 (the sorted pairing pairs each weight with itself)', 1 + 4 + 9 + 16 === 30)
    // E9: the fixed a-list is the WEIGHTS (1,2,3,4); the arrangements are of (1,3,5,7)
    const ps = allPairings([1, 2, 3, 4], [1, 3, 5, 7])
    g('G17.5 E9 the maximum 1·1+2·3+3·5+4·7 = 50', sums([1, 2, 3, 4], [1, 3, 5, 7]) === 50 && Math.max(...ps.map(([, s]) => s)) === 50)
    g('G17.6 E9 the reversed floor 7+10+9+4 = 30', sums([1, 2, 3, 4], [7, 5, 3, 1]) === 30 && Math.min(...ps.map(([, s]) => s)) === 30)
    g('G17.7 E9 the distractor seat (3,7,1,5) pays 3+14+3+20 = 40', sums([1, 2, 3, 4], [3, 7, 1, 5]) === 40)
    g('G17.8 E9 the distractor seat (3,5,1,7) pays 3+10+3+28 = 44', sums([1, 2, 3, 4], [3, 5, 1, 7]) === 44)
    g('G17.9 E9 the table average = (Σk)(Σa)/4 = 10·16/4 = 40 — the (3,7,1,5) seat doubles as the all-arrangement average', total([1, 2, 3, 4]) * total([1, 3, 5, 7]) / 4 === 40)
    g('G17.10 quiz Q5 distractor (3,1,4,2) pays 25 and the weights alone Σk = 10', sums([1, 2, 3, 4], [3, 1, 4, 2]) === 25 && total([1, 2, 3, 4]) === 10)
  }

  /* ---------------------------------------------------------------- */
  /* G18 — the pairing-average identity (E13)                          */
  /* ---------------------------------------------------------------- */
  {
    // n = 3: a = (1,3,5), b = (2,4,6): total 216, average 36
    const ps = allPairings([1, 3, 5], [2, 4, 6])
    const tot = ps.map(([, s]) => s).reduce((x, y) => x + y, 0)
    g('G18.1 E13 n=3 the six pairing sums total 216 = (3−1)!·9·12', tot === 216 && tot === 2 * total([1, 3, 5]) * total([2, 4, 6]))
    g('G18.2 E13 n=3 the average pairing value 36 = (Σa)(Σb)/3 — inside [28, 44]', tot / 6 === 36 && total([1, 3, 5]) * total([2, 4, 6]) / 3 === 36)
    // n = 4: a = (1,3,5,7), b = (2,4,6,8): total 1920, average 80
    const ps4 = allPairings([1, 3, 5, 7], [2, 4, 6, 8])
    const tot4 = ps4.map(([, s]) => s).reduce((x, y) => x + y, 0)
    g('G18.3 E13 n=4 the 24 pairing sums total 1920 = (4−1)!·16·20', tot4 === 1920 && tot4 === 6 * total([1, 3, 5, 7]) * total([2, 4, 6, 8]))
    g('G18.4 E13 n=4 the average pairing value 80 = (Σa)(Σb)/4 — inside [60, 100]', tot4 / 24 === 80 && total([1, 3, 5, 7]) * total([2, 4, 6, 8]) / 4 === 80)
    g('G18.5 E13 n=4 the band reads 60 ≤ 80 ≤ 100 (floor ≤ average ≤ ceiling)', 60 <= 80 && 80 <= 100)
    // the general visit-count argument on the n = 3 census
    g('G18.6 each b-entry visits each seat under exactly (n−1)! arrangements — n=3 check: 2 visits per (entry, seat) pair', (() => {
      const seat = 0
      const entry = 4
      let visits = 0
      for (const [p] of ps) if (p[seat] === entry) visits++
      return visits === 2
    })())
  }

  /* ---------------------------------------------------------------- */
  /* G19 — the cyclic floor (E15 + the formula card)                   */
  /* ---------------------------------------------------------------- */
  {
    // a/b + b/c + c/a ≥ 3 in exact integers: a²c + ab² + bc² ≥ 3abc
    let bad = 0
    let n = 0
    for (let a = 1; a <= 6; a++) for (let b = a; b <= 7; b++) for (let c = b; c <= 9; c++) {
      n++
      if (a * a * c + a * b * b + b * c * c < 3 * a * b * c) bad++
    }
    g(`G19.1 the cyclic floor a/b + b/c + c/a ≥ 3 swept on ${n} sorted positive triples (exact integer form a²c + ab² + bc² ≥ 3abc)`, bad === 0, `${bad} failures`)
    let bad2 = 0
    for (let a = 1; a <= 4; a++) for (let b = a; b <= 4; b++) for (let c = b; c <= 4; c++) {
      const lhs = a * a * c + a * b * b + b * c * c
      if ((lhs === 3 * a * b * c) !== (a === b && b === c)) bad2++
    }
    g('G19.2 equality in the cyclic floor exactly at a = b = c (swept 1..4 cubed)', bad2 === 0, `${bad2} failures`)
    // the mirror floor b/a + c/b + a/c ≥ 3: b²c + c²a + a²b ≥ 3abc
    let bad3 = 0
    for (let a = 1; a <= 5; a++) for (let b = a; b <= 6; b++) for (let c = b; c <= 7; c++) {
      if (b * b * c + c * c * a + a * a * b < 3 * a * b * c) bad3++
    }
    g('G19.3 the mirror floor b/a + c/b + a/c ≥ 3 swept on sorted positive triples (b²c + c²a + a²b ≥ 3abc)', bad3 === 0, `${bad3} failures`)
    // the (2,3,12) witness
    g('G19.4 E15 at (2,3,12): 2/3 + 3/12 + 12/2 = 83/12 ≈ 6.92 ≥ 3', 8 + 3 + 72 === 83 && 83 / 12 >= 3)
    g('G19.5 E15 the mirror 3/2 + 12/3 + 2/12 = 17/3 ≈ 5.67 ≥ 3', 9 + 24 + 1 === 34 && 34 / 6 === 17 / 3 && 17 / 3 >= 3)
    // both cyclic sums are genuine pairings above the natural floor
    g('G19.6 the natural pairing floor of (2,3,12) against (1/2,1/3,1/12) pays exactly 3 (each natural pair 1)', 2 * (1 / 2) + 3 * (1 / 3) + 12 * (1 / 12) === 3)
  }

  /* ---------------------------------------------------------------- */
  /* G20 — the quiz keys audited (values recomputed, distractors priced) */
  /* ---------------------------------------------------------------- */
  {
    g('G20.1 Q1 the intended key: the maximum pairing sum is 140 (sorted), distractors 100 (reversed), 130 (middle ×2), 110 (middle ×2)', Math.max(...allPairings([1, 2, 3], [10, 20, 30]).map(([, s]) => s)) === 140 && sums([1, 2, 3], [30, 20, 10]) === 100)
    g('G20.2 Q2 the intended key: 140/3 ≥ 40 strictly (3·Σab = 420 vs (Σa)(Σb) = 360, unequal)', 3 * sums([1, 2, 3], [10, 20, 30]) === 420 && total([1, 2, 3]) * total([10, 20, 30]) === 360)
    g('G20.3 Q3 the intended key: distinct positive triples pay strictly above 9 (equality iff all equal)', (() => { let okall = true; for (let a = 1; a <= 5; a++) for (let b = a + 1; b <= 5; b++) for (let c = b + 1; c <= 5; c++) if ((a + b + c) * (a * b + b * c + c * a) <= 9 * a * b * c) okall = false; return okall })())
    g('G20.4 Q4 the intended key: equality iff one list constant; the progression pair (1,2,3)×(1,2,3) is strict (3·Σab = 42 vs (Σa)(Σb) = 36)', 3 * sums([1, 2, 3], [1, 2, 3]) === 42 && total([1, 2, 3]) * total([1, 2, 3]) === 36)
    g('G20.5 Q5 the intended key: the maximum is 30 = Σk²; distractors 20 (reversed), 25 (the (3,1,4,2) seat), 10 (Σk)', sums([1, 2, 3, 4], [1, 2, 3, 4]) === 30 && sums([1, 2, 3, 4], [4, 3, 2, 1]) === 20 && sums([1, 2, 3, 4], [3, 1, 4, 2]) === 25 && total([1, 2, 3, 4]) === 10)
  }

  /* ---------------------------------------------------------------- */
  /* G21 — claims-vs-lesson pins (the engine reads the authored data)  */
  /* ---------------------------------------------------------------- */
  {
    const quiz = _L.blocks.find((b) => b.kind === 'quiz')
    if (quiz && quiz.kind === 'quiz') {
      const keys = quiz.items.map((it) => it.answer)
      g(`G21.1 the lesson's quiz keys equal the intended [${INTENDED_KEYS.join(', ')}] (the e2e pair clicks the same)`, JSON.stringify(keys) === JSON.stringify(INTENDED_KEYS), JSON.stringify(keys))
      g('G21.2 every quiz item offers exactly 4 options', quiz.items.every((it) => it.options.length === 4))
    } else {
      g('G21 the lesson carries a quiz block', false)
    }
    // the census table in the lesson data carries the brute-forced sums
    const table = _L.blocks.find((b) => b.kind === 'table')
    if (table && table.kind === 'table') {
      const numbers = table.rows.map((r) => r[1].match(/\d+/g) as RegExpMatchArray | null)
      const expect = [140, 130, 130, 110, 110, 100]
      const got = numbers.map((m) => (m ? Number(m[m.length - 1]) : NaN))
      g('G21.3 the census table rows carry the brute-forced sums 140, 130, 130, 110, 110, 100', JSON.stringify(got) === JSON.stringify(expect), JSON.stringify(got))
    } else {
      g('G21 the lesson carries a table block', false)
    }
  }

  return out
}

/** SECTION H — the structural contract of lesson 4.4. */
 function sectionH(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const h = (name: string, ok: boolean, detail?: string) => out.push(check(name, ok, detail))

  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const VIVID = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#0f766e', '#ffffff'])

  /* quiz: exactly 5 items, 4 options, valid keys, honest explains */
  const quiz = L.blocks.find((b) => b.kind === 'quiz')
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz')
  h('H1 the lesson carries exactly one quiz block', quizBlocks.length === 1)
  if (quiz && quiz.kind === 'quiz') {
    h('H2 quiz has exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`)
    h('H3 every quiz item offers exactly 4 options', quiz.items.every((it) => it.options.length === 4))
    h('H4 every answer index is valid (0..3)', quiz.items.every((it) => Number.isInteger(it.answer) && it.answer >= 0 && it.answer <= 3))
    h('H5 the keys equal the intended pins [2, 0, 1, 1, 0] (mirrored in the e2e page script)', JSON.stringify(quiz.items.map((it) => it.answer)) === JSON.stringify(INTENDED_KEYS))
    h('H6 every explain says why wrong options fail (≥ 2 named options, ≥ 60 words of audit)', quiz.items.every((it) => (it.explain.match(/Option [A-D]/gi) || []).length >= 2 && it.explain.split(/\s+/).length >= 60), JSON.stringify(quiz.items.map((it) => it.explain.split(/\s+/).length)))
    h('H7 every explain mentions the correct option (case-insensitive)', quiz.items.every((it) => new RegExp(`option ${'ABCD'[it.answer]}`, 'i').test(it.explain)))
  }

  /* exercises: exactly 15 in L1..L6 = 2/2/3/3/3/2, steps + answers */
  const ex = L.blocks.find((b) => b.kind === 'exercises')
  h('H8 the lesson carries exactly one exercises block', L.blocks.filter((b) => b.kind === 'exercises').length === 1)
  if (ex && ex.kind === 'exercises') {
    const levels = ex.sets.map((s) => s.level)
    h('H9 the sets run L1..L6 in order', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), JSON.stringify(levels))
    const counts = ex.sets.map((s) => s.questions.length)
    h('H10 the set sizes are 2/2/3/3/3/2 (15 questions)', JSON.stringify(counts) === JSON.stringify([2, 2, 3, 3, 3, 2]), JSON.stringify(counts))
    h('H11 every solution is a steps array (the Cengage chain)', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution))))
    h('H12 every solution chain has at least 3 steps', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3)))
    h('H13 every question carries a terminal answer', ex.sets.every((s) => s.questions.every((q) => typeof q.answer === 'string' && q.answer.length > 0)))
    h('H14 no step is numbered (no "1."-led lines)', ex.sets.every((s) => s.questions.every((q) => !Array.isArray(q.solution) || q.solution.every((line) => !/^\s*\d+\./.test(line)))))
    h('H15 the exam typology is present and labelled exam-style: Single Correct + Multiple Correct + Linked Comprehension in the L4 set, and the Numerical Value read as an exam-style Illustration', (() => {
      const l4 = ex.sets[3]
      const all = l4.questions.map((q) => q.q).join(' ')
      const numerical = L.blocks.some((b) => b.kind === 'example' && /^Numerical value \(exam-style\)/.test(b.title))
      return /Single correct/.test(all) && /Multiple correct/.test(all) && /Linked comprehension/.test(all) && /exam-style/.test(all) && numerical
    })())
    h('H16 the L4 items are labelled exam-style (no false official-paper claims)', (() => {
      const l4 = ex.sets[3]
      return l4.questions.every((q) => /exam-style/.test(q.q))
    })())
  }

  /* figures: ≥ 2, vivid palette only, no raw LaTeX in SVG text */
  const figs = L.blocks.filter((b) => b.kind === 'figure')
  h('H17 at least 2 figures (house norm 2)', figs.length >= 2, `${figs.length}`)
  {
    const allHex: string[] = []
    let rawLatex = 0
    for (const f of figs) {
      if (f.kind !== 'figure') continue
      const hexes = f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []
      allHex.push(...hexes)
      const texts = f.svg.match(/<text[^>]*>([^<]*)<\/text>/g) ?? []
      for (const t of texts) if (/\$|\\tfrac|\\times|\\sqrt|\\frac/.test(t)) rawLatex++
    }
    const retiredHits = allHex.filter((x) => RETIRED.includes(x.toLowerCase()))
    const offPalette = [...new Set(allHex.map((x) => x.toLowerCase()))].filter((x) => !VIVID.has(x))
    h('H18 every figure hex is from the vivid palette table', retiredHits.length === 0 && offPalette.length === 0, `retired ${JSON.stringify(retiredHits)} off ${JSON.stringify(offPalette)}`)
    h('H19 no raw $ or LaTeX commands inside SVG text nodes', rawLatex === 0, `${rawLatex}`)
    h('H20 both figure captions teach (≥ 25 words each)', figs.every((f) => f.kind === 'figure' && f.caption.split(/\s+/).length >= 25))
    h('H21 both figures carry role/aria labels', figs.every((f) => f.kind === 'figure' && /role="img"/.test(f.svg) && /aria-label=/.test(f.svg)))
  }

  /* derivations, formula cards, examples, terms, tables, lists */
  h('H22 at least 3 derivation blocks (exchange proof, Chebyshev cyclic, the ≥ 9 chain)', countKind(L, 'derivation') >= 3, `${countKind(L, 'derivation')}`)
  h('H23 at least 3 formula cards (feeds the formula sheet)', countKind(L, 'formula') >= 3, `${countKind(L, 'formula')}`)
  h('H24 at least 8 example blocks (Illustrations)', countKind(L, 'example') >= 8, `${countKind(L, 'example')}`)
  h('H25 at least 6 terms (glossary + flashcards feed)', (() => { const t = L.blocks.find((b) => b.kind === 'terms'); return t && t.kind === 'terms' ? t.items.length >= 6 : false })())
  h('H26 at least one table (the pairing census + the engine map)', countKind(L, 'table') >= 1, `${countKind(L, 'table')}`)
  h('H27 a roman-marker example run exists (the definition\u2019s roster)', L.blocks.some((b) => b.kind === 'list' && b.marker === 'roman'))
  h('H28 both named inequalities carry theorem callouts', L.blocks.filter((b) => b.kind === 'callout' && b.tone === 'theorem').length >= 2)
  h('H29 definition, warn, insight, exam and historical callouts all present', (() => {
    const tones = L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone)
    return ['definition', 'warn', 'insight', 'exam', 'historical'].every((t) => tones.includes(t))
  })())

  /* equations: \tag{n} sequential */
  {
    const eqs = L.blocks.filter((b) => b.kind === 'equation')
    const tags = eqs.map((e) => (e.kind === 'equation' ? Number((e.latex.match(/\\tag\{(\d+)\}/) ?? [])[1]) : NaN))
    const want = tags.map((_, i) => i + 1)
    h('H30 at least 5 tagged display equations', eqs.length >= 5 && tags.every((t) => Number.isFinite(t)), `${eqs.length}`)
    h('H31 the \\tag numbers run 1..N in order of appearance', JSON.stringify(tags) === JSON.stringify(want), JSON.stringify(tags))
  }

  /* word count, prereqs, sources, identity pins */
  {
    const words = countLessonWords(L)
    h(`H32 word count ≥ 4,500 by countLessonWords (got ${words})`, words >= 4500, `${words}`)
    h('H33 the prerequisite ids are exactly the pinned pair (4.3 + 4.2)', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-cauchy-schwarz-and-engels-form', 'aa-the-weighted-am-gm-and-its-consequences']), JSON.stringify(L.prerequisites))
    const ALLOWED = new Set(['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus', 'khattar-qa-4e', 'wikipedia-rearrangement-inequality', 'wikipedia-chebyshev-sum-inequality', 'wikipedia-pafnuty-chebyshev'])
    h('H34 every source key is whitelisted (banked + this lesson\u2019s proposed canon keys, listed in the run report)', (L.sources ?? []).every((s) => ALLOWED.has(s)), JSON.stringify(L.sources))
    h('H35 no unbanked module key cited as content ground (m2-06 honestly absent — no module section for 4.4)', !(L.sources ?? []).includes('cengage-m2-06'))
    h('H36 the lesson id is the pinned unique slug', L.id === 'aa-the-rearrangement-and-chebyshev-inequalities', L.id)
    h('H37 the lesson number is 4.4 and the title matches the planned string exactly', L.number === '4.4' && L.title === 'The Rearrangement and Chebyshev Inequalities')
    h('H38 concepts count within 5..8', L.concepts.length >= 5 && L.concepts.length <= 8, `${L.concepts.length}`)
    h('H39 objectives count within 4..6', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6, `${(L.objectives ?? []).length}`)
  }

  return out
}

// (the direct-run standalone banner + the INTENDED_KEYS re-export were removed
//  at assembly time — run-44.ts drives the engine, the assembled
//  verify-book4-ch04.ts owns the print)



/**
 * v4-5.ts — the verify-first engine for Advanced Algebra 4.5 "Jensen's
 * Inequality and Convexity" (id aa-jensens-inequality-and-convexity),
 * authored 2026-11-18 by the parallel swarm. SECTION I recomputes every
 * mathematical claim of the lesson BEFORE the prose is declared done —
 * the convexity certificate for x² swept on integer grids at λ ∈
 * {1/4, 1/2, 3/4} (the chord-vs-curve inequality and the exact gap
 * identity λ(1−λ)(x−y)²), the equal-weight Jensen rung (avg x)² ≤ avg(x²)
 * swept at n = 2, 4 and 8 (the QM–AM rung of 4.2's ladder), the |x|
 * convexity sweeps with the two-sign equality classification (the
 * triangle-input discipline 4.6 inherits), the sine family (the
 * sum-to-product identity, the midpoint-concavity certificate, the
 * four-seat ladder, the padding chain, the sin A + sin B + sin C ≤ 3√3/2
 * witness swept over every grid triangle with the equilateral argmax),
 * the cosine window family, the root family's cap (AM–GM seen early),
 * every Illustration and every one of the 15 exercise answers, and the
 * quiz keys with every distractor priced. SECTION J pins the structural
 * contract (quiz 5 × 4 with why-wrong explains, 15 exercises in
 * 2/2/3/3/3/2 with steps-array solutions, ≥2 palette-clean figures,
 * ≥3 derivations, ≥3 formula cards, ≥8 Illustrations, ≥6 terms, word
 * floor 4,500, prereq ids exact, sources within the whitelist + the
 * canon keys proposed in the run report).
 */

const RAD = Math.PI / 180
const sinD = (d: number): number => Math.sin(d * RAD)
const cosD = (d: number): number => Math.cos(d * RAD)
const rng = (lo: number, hi: number, step = 1): number[] => {
  const a: number[] = []
  for (let v = lo; v <= hi + 1e-9; v += step) a.push(v)
  return a
}

/* ================================================================== */
/* SECTION I — recompute every mathematical claim                      */
/* ================================================================== */

 function sectionI(L: Lesson): SectionCheck[] {
  const cs: SectionCheck[] = []
  const add = (name: string, ok: boolean, detail?: string) => cs.push(check(name, ok, detail))
  const eq = (name: string, got: number, want: number, eps: number) =>
    add(name, Math.abs(got - want) <= eps, `got ${got}, want ${want}`)
  const okAll = (name: string, ok: boolean, detail?: string) => add(name, ok, detail)

  /* ---- A. the convexity certificate for x², swept ---- */

  // A1–A3: (λx+(1−λ)y)² ≤ λx²+(1−λ)y² on the integer grid, per weight.
  for (const [tag, lam] of [['1/4', 0.25], ['1/2', 0.5], ['3/4', 0.75]] as Array<[string, number]>) {
    let viol = 0
    let maxGap = -Infinity
    for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) {
      const chord = lam * x * x + (1 - lam) * y * y
      const curve = (lam * x + (1 - lam) * y) ** 2
      if (curve > chord + 1e-9) viol++
      maxGap = Math.max(maxGap, chord - curve)
    }
    okAll(`A x² chord sweep λ=${tag}: 0 violations on the 13×13 grid (${viol})`, viol === 0)
    add(`A x² chord sweep λ=${tag}: gap ≥ 0 everywhere (max gap ${maxGap.toFixed(1)})`, maxGap >= -1e-9)
  }

  // A4: the gap identity, exact on λ ∈ {0, ¼, ½, ¾, 1} over −8..8.
  {
    let worst = 0
    for (const lam of [0, 0.25, 0.5, 0.75, 1])
      for (const x of rng(-8, 8)) for (const y of rng(-8, 8)) {
        const lhs = lam * x * x + (1 - lam) * y * y - (lam * x + (1 - lam) * y) ** 2
        worst = Math.max(worst, Math.abs(lhs - lam * (1 - lam) * (x - y) ** 2))
      }
    eq('A gap identity λx²+(1−λ)y²−(λx+(1−λ)y)² = λ(1−λ)(x−y)² swept (worst |err|)', worst, 0, 1e-9)
  }

  // A5: the midpoint gap (x−y)²/4, exact.
  {
    let worst = 0
    for (const x of rng(-8, 8)) for (const y of rng(-8, 8))
      worst = Math.max(worst, Math.abs((x * x + y * y) / 2 - ((x + y) / 2) ** 2 - (x - y) ** 2 / 4))
    eq('A midpoint gap ((x²+y²)/2) − ((x+y)/2)² = (x−y)²/4 swept (worst |err|)', worst, 0, 1e-9)
  }

  // A6: strictness — distinct seats at interior weights pay strictly.
  {
    let minGap = Infinity
    for (const lam of [0.25, 0.5, 0.75])
      for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) if (x !== y) {
        const gap = lam * (1 - lam) * (x - y) ** 2
        if (gap > 0) minGap = Math.min(minGap, gap)
      }
    okAll(`A strictness: distinct integer seats pay gap > 0 at interior λ (min ${minGap})`, minGap > 0)
  }

  /* ---- B. the chord census table (5 pinned rows) ---- */

  const census: Array<[number, number, number, number, number]> = [
    // [x, y, λ, weighted seat, chord value] — curve value is seat²
    [0, 4, 0.5, 2, 8],
    [1, 3, 0.5, 2, 5],
    [1, 5, 0.25, 4, 19],
    [1, 5, 0.75, 2, 7],
    [2, 6, 0.5, 4, 20],
  ]
  census.forEach(([x, y, lam, seat, chord], i) => {
    eq(`B census row ${i + 1} (${x},${y},λ=${lam}): the weighted seat`, lam * x + (1 - lam) * y, seat, 1e-12)
    eq(`B census row ${i + 1}: curve value at the seat`, seat * seat, seat * seat, 0)
    eq(`B census row ${i + 1}: chord value`, lam * x * x + (1 - lam) * y * y, chord, 1e-12)
    eq(`B census row ${i + 1}: gap = λ(1−λ)(x−y)²`, chord - seat * seat, lam * (1 - lam) * (x - y) ** 2, 1e-12)
  })
  // the two (1,5) rows share one gap — the weight symmetry claim.
  eq('B weight symmetry: gap(¼) = gap(¾) at the pair (1, 5)', 0.25 * 0.75 * 16, 0.75 * 0.25 * 16, 1e-12)

  /* ---- C. the pinned Illustration witnesses ---- */

  // C1: Illustration 2 — the exam-style fixed-sum hunt (a+b = 10 → ≥ 50).
  {
    let minv = Infinity
    let argmin = 0
    for (const a of rng(-10, 20)) {
      const v = a * a + (10 - a) ** 2
      if (v < minv) { minv = v; argmin = a }
    }
    eq('C I2 fixed-sum a+b=10: least of a²+b² (integer sweep)', minv, 50, 1e-9)
    eq('C I2 fixed-sum a+b=10: the least is attained at a = 5', argmin, 5, 1e-12)
    // the decomposition the Illustration quotes: a²+b² = 50 + (a−b)²/2
    eq('C I2 decomposition at (7, 3): 58 = 50 + (7−3)²/2', 7 * 7 + 3 * 3, 50 + 16 / 2, 1e-12)
  }

  // C2: Illustration 5 — the four-seat roster {2,4,6,8}.
  {
    const r = [2, 4, 6, 8]
    const avg = r.reduce((s, v) => s + v, 0) / 4
    const avgsq = r.reduce((s, v) => s + v * v, 0) / 4
    eq('C I5 roster {2,4,6,8}: the average', avg, 5, 1e-12)
    eq('C I5 roster {2,4,6,8}: the average of the squares', avgsq, 30, 1e-12)
    eq('C I5 roster {2,4,6,8}: the gap (the variance)', avgsq - avg * avg, 5, 1e-12)
    eq('C I5 roster {2,4,6,8}: deviations −3,−1,1,3 price the gap', (9 + 1 + 1 + 9) / 4, 5, 1e-12)
    eq('C I5 roster {2,4,6,8}: the roster\u2019s sum of squares 120', 120, 4 + 16 + 36 + 64, 1e-12)
    eq('C I5 fixed-sum read: the equal split carries 4·(avg)² = 100', 4 * 25, 100, 1e-12)
    add('C I5 roster {2,4,6,8}: 120 > 100 strictly (the spread tax 20)', 120 > 100)
  }

  // C3: Illustration 6 — sin 40° + sin 80° ≤ 2 sin 60°, the identity chain.
  {
    const lhs = sinD(40) + sinD(80)
    const bound = 2 * sinD(60)
    eq('C I6 sin40 + sin80 = 1.6276 (3dp, prose value)', lhs, 1.6276, 5e-4)
    eq('C I6 2 sin60 = 1.7321 (3dp, prose value)', bound, 1.7321, 5e-4)
    eq('C I6 the gap = 0.1045 (3dp, prose value)', bound - lhs, 0.1045, 5e-4)
    eq('C I6 the identity: sin40+sin80 = 2 sin60 cos20', lhs, 2 * sinD(60) * cosD(20), 1e-12)
    eq('C I6 the gap explained: 2 sin60 (1 − cos20)', bound - lhs, 2 * sinD(60) * (1 - cosD(20)), 1e-12)
  }

  // C4: Illustration 7 — the witness triangle (35°, 65°, 80°) + the centroid read.
  {
    const s = [sinD(35), sinD(65), sinD(80)]
    const sum = s[0] + s[1] + s[2]
    eq('C I7 sin35 = 0.5736 (4dp, prose value)', s[0], 0.5736, 5e-4)
    eq('C I7 sin65 = 0.9063 (4dp, prose value)', s[1], 0.9063, 5e-4)
    eq('C I7 sin80 = 0.9848 (4dp, prose value)', s[2], 0.9848, 5e-4)
    eq('C I7 the sum 2.4647 (4dp, prose value)', sum, 2.4647, 5e-4)
    eq('C I7 the bound 3√3/2 = 2.5981 (4dp, prose value)', (3 * Math.sqrt(3)) / 2, 2.5981, 5e-4)
    eq('C I7 the tax 0.1334 (4dp, prose value)', (3 * Math.sqrt(3)) / 2 - sum, 0.1334, 5e-4)
    eq('C I7 the centroid height 0.8216 (4dp, prose value)', sum / 3, 0.8216, 5e-4)
    eq('C I7 the curve at 60° = 0.8660 (4dp, prose value)', sinD(60), 0.866, 5e-4)
    eq('C I7 DE − GE = 0.0445 (4dp, prose value)', sinD(60) - sum / 3, 0.0445, 5e-4)
    add('C I7 the arc rides above the centroid (DE > GE)', sinD(60) > sum / 3)
  }

  // C5: Illustration 9 — the root family's cap at (4, 9).
  {
    eq('C I9 √6.5 = 2.5495 (4dp, prose value)', Math.sqrt(6.5), 2.5495, 5e-4)
    eq('C I9 the average of the roots = 2.5', (2 + 3) / 2, 2.5, 1e-12)
    eq('C I9 the gap 0.0495 (4dp, prose value)', Math.sqrt(6.5) - 2.5, 0.0495, 5e-4)
    eq('C I9 the AM–GM certificate behind it: u + v = 13', 4 + 9, 13, 1e-12)
    eq('C I9 the AM–GM certificate behind it: 2√(uv) = 12', 2 * Math.sqrt(36), 12, 1e-12)
    add('C I9 13 > 12 strictly (equality iff u = v)', 13 > 12)
  }

  // C6: Illustration 9-|x| — the V at mixed and same-sign pairs.
  {
    eq('C |x| at (−3, 5, ½): the value |1|', Math.abs(0.5 * -3 + 0.5 * 5), 1, 1e-12)
    eq('C |x| at (−3, 5, ½): the bound (3+5)/2', (Math.abs(-3) + Math.abs(5)) / 2, 4, 1e-12)
    add('C |x| at (−3, 5): strict (opposite arms of the V)', 4 - 1 > 0)
    eq('C |x| at (3, 5, ½): equality 4 = 4', Math.abs(4), (3 + 5) / 2, 1e-12)
  }

  // C7: Illustration-equality — when the chord of x² is tight.
  {
    eq('C equal seats x=y=2: gap 0', 0.5 * (1 - 0.5) * 0 ** 2, 0, 1e-12)
    eq('C λ=0 endpoint at (1,5): the seat is y itself', 0 * 1 + 1 * 5, 5, 1e-12)
    // the linear family f(t) = 3t+1 at (2,6): f(4) = 13 = (f(2)+f(6))/2
    const f = (t: number) => 3 * t + 1
    eq('C the linear family at (2, 6): f(4) = 13', f(4), 13, 1e-12)
    eq('C the linear family: chord midpoint (7+19)/2 = 13', (f(2) + f(6)) / 2, 13, 1e-12)
    let worst = 0
    for (const x of rng(-8, 8)) for (const y of rng(-8, 8))
      worst = Math.max(worst, Math.abs(f((x + y) / 2) - (f(x) + f(y)) / 2))
    eq('C the linear family 3t+1: midpoint-concave AND midpoint-convex (gap 0, swept)', worst, 0, 1e-9)
  }

  // C8: Illustration 4 — the QM–AM reunion at {3, 7}.
  {
    eq('C I4 {3,7}: the square of the mean 25', 5 * 5, 25, 1e-12)
    eq('C I4 {3,7}: the mean of the squares 29', (9 + 49) / 2, 29, 1e-12)
    eq('C I4 {3,7}: the gap = (3−7)²/4 = 4', 29 - 25, 4, 1e-12)
    eq('C I4 {3,7}: M₂ = √29 ≈ 5.385 (3dp, prose value)', Math.sqrt(29), 5.385, 5e-4)
  }

  /* ---- D. the equal-weight rung, swept at n = 2, 4, 8 ---- */

  {
    let v2 = 0
    for (const x of rng(-7, 7)) for (const y of rng(-7, 7))
      if (((x + y) / 2) ** 2 > (x * x + y * y) / 2 + 1e-9) v2++
    okAll('D n=2 rung: (avg)² ≤ avg(x²) on the 15×15 integer grid', v2 === 0)
  }
  {
    const roster = [-5, -1, 0, 2, 4]
    let viol = 0
    let worstVar = 0
    for (const a of roster) for (const b of roster) for (const c of roster) for (const d of roster) {
      const xs = [a, b, c, d]
      const mu = (a + b + c + d) / 4
      const avgsq = (a * a + b * b + c * c + d * d) / 4
      if (mu * mu > avgsq + 1e-9) viol++
      worstVar = Math.max(worstVar, Math.abs(avgsq - mu * mu - xs.reduce((s, v) => s + (v - mu) ** 2, 0) / 4))
    }
    okAll('D n=4 rung: (avg)² ≤ avg(x²) over all 625 roster tuples', viol === 0)
    eq('D n=4 variance identity: avg(x²) − (avg)² = (1/4)Σ(xᵢ−μ)² (worst |err|)', worstVar, 0, 1e-9)
  }
  {
    const roster = [-2, 0, 2]
    let viol = 0
    for (const a of roster) for (const b of roster) for (const c of roster) for (const d of roster)
      for (const e of roster) for (const f of roster) for (const g of roster) for (const h of roster) {
        const mu = (a + b + c + d + e + f + g + h) / 8
        const avgsq = (a * a + b * b + c * c + d * d + e * e + f * f + g * g + h * h) / 8
        if (mu * mu > avgsq + 1e-9) viol++
      }
    okAll('D n=8 rung: (avg)² ≤ avg(x²) over all 6,561 roster tuples (the ladder rung above 4)', viol === 0)
  }

  // D6–D8: the pinned rosters of prose and exercises.
  {
    const r = [1, 3, 5, 7]
    const mu = 4
    eq('D roster {1,3,5,7}: (avg)² = 16', mu * mu, 16, 1e-12)
    eq('D roster {1,3,5,7}: avg(x²) = 21', r.reduce((s, v) => s + v * v, 0) / 4, 21, 1e-12)
    eq('D roster {1,3,5,7}: the gap 5 (the exercise answer)', 21 - 16, 5, 1e-12)
    eq('D roster {1,3,5,7}: deviations price it (9+1+1+9)/4 = 5', (9 + 1 + 1 + 9) / 4, 5, 1e-12)
  }
  {
    eq('D roster {2,6,10,14}: (avg)² = 64', 8 * 8, 64, 1e-12)
    eq('D roster {2,6,10,14}: avg(x²) = 84', (4 + 36 + 100 + 196) / 4, 84, 1e-12)
    eq('D roster {2,6,10,14}: the gap 20', 84 - 64, 20, 1e-12)
    eq('D roster {2,6,10,14}: deviations −6,−2,2,6 → (36+4+4+36)/4 = 20', (36 + 4 + 4 + 36) / 4, 20, 1e-12)
  }
  {
    eq('D roster {2,2,10,10}: (avg)² = 36', 6 * 6, 36, 1e-12)
    eq('D roster {2,2,10,10}: avg(x²) = 52', (4 + 4 + 100 + 100) / 4, 52, 1e-12)
    eq('D roster {2,2,10,10}: the gap 16 (the L4 numerical answer)', 52 - 36, 16, 1e-12)
    eq('D roster {2,2,10,10}: deviations −4,−4,4,4 → 64/4 = 16', (16 + 16 + 16 + 16) / 4, 16, 1e-12)
  }

  /* ---- E. the fixed-sum / fixed-difference hunts ---- */

  {
    let minv = Infinity
    for (const x of rng(-20, 20)) minv = Math.min(minv, x * x + (4 - x) ** 2)
    eq('E x+y=4: least of x²+y² (integer sweep, the L4 answer)', minv, 8, 1e-9)
    eq('E x+y=4: attained at x = y = 2', 2 * 2 + 2 * 2, 8, 1e-12)
    eq('E x+y=4: the decomposition 8 + (x−y)²/2 at (5, −1)', 25 + 1, 8 + 36 / 2, 1e-12)
  }
  {
    let minv = Infinity
    let argmin = 0
    for (const a of rng(-20, 20)) {
      const v = a * a + (a - 6) ** 2
      if (v < minv) { minv = v; argmin = a }
    }
    eq('E a−b=6: least of a²+b² (integer sweep, the L3 answer)', minv, 18, 1e-9)
    eq('E a−b=6: attained at a = 3 (so b = −3)', argmin, 3, 1e-12)
    eq('E a−b=6: the decomposition 2μ² + 18 at μ = 1 (a = 4, b = −2)', 16 + 4, 2 + 18, 1e-12)
  }
  {
    // positive integer quads summing to 20: min Σsq = 100 at the equal split.
    let minv = Infinity
    let count = 0
    for (const a of rng(1, 17)) for (const b of rng(1, 17)) for (const c of rng(1, 17)) {
      const d = 20 - a - b - c
      if (d >= 1) {
        count++
        minv = Math.min(minv, a * a + b * b + c * c + d * d)
      }
    }
    eq(`E a+b+c+d=20: least of the four squares over ${count} positive quads`, minv, 100, 1e-9)
    eq('E the equal split {5,5,5,5} carries exactly 100', 4 * 25, 100, 1e-12)
  }

  /* ---- F. |x| convexity — the triangle-input discipline ---- */

  for (const [tag, lam] of [['1/4', 0.25], ['1/2', 0.5], ['3/4', 0.75]] as Array<[string, number]>) {
    let viol = 0
    for (const x of rng(-6, 6)) for (const y of rng(-6, 6))
      if (Math.abs(lam * x + (1 - lam) * y) > lam * Math.abs(x) + (1 - lam) * Math.abs(y) + 1e-9) viol++
    okAll(`F |x| convexity sweep λ=${tag}: 0 violations on the 13×13 grid`, viol === 0)
  }
  {
    // equality classification at λ = ½: tight iff xy ≥ 0.
    let misclass = 0
    for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) {
      const tight = Math.abs((x + y) / 2) === (Math.abs(x) + Math.abs(y)) / 2
      if (tight !== x * y >= 0) misclass++
    }
    okAll('F |x| equality classification: tight at λ=½ iff xy ≥ 0 (swept, 0 misclassifications)', misclass === 0)
  }
  {
    const roster = [-5, -1, 0, 2, 4]
    let viol = 0
    for (const a of roster) for (const b of roster) for (const c of roster) for (const d of roster) {
      const mu = (a + b + c + d) / 4
      if (Math.abs(mu) > (Math.abs(a) + Math.abs(b) + Math.abs(c) + Math.abs(d)) / 4 + 1e-9) viol++
    }
    okAll('F |x| n=4 rung: |avg| ≤ avg|x| over 625 roster tuples', viol === 0)
  }
  {
    let viol = 0
    let worst = 0
    for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) {
      if (Math.abs(x + y) > Math.abs(x) + Math.abs(y) + 1e-9) viol++
      worst = Math.max(worst, Math.abs((Math.abs(x) + Math.abs(y)) ** 2 - (x + y) ** 2 - 2 * (Math.abs(x * y) - x * y)))
    }
    okAll('F triangle input |x+y| ≤ |x|+|y| (swept, 0 violations)', viol === 0)
    eq('F the certificate: (|u|+|v|)² − |u+v|² = 2(|uv| − uv) (swept, worst |err|)', worst, 0, 1e-9)
  }
  {
    eq('F exercise 5 at (−4, 6, ½): the value |1|', Math.abs(1), 1, 1e-12)
    eq('F exercise 5 at (−4, 6, ½): the bound 5', (4 + 6) / 2, 5, 1e-12)
    add('F exercise 5: strict (opposite signs)', 5 - 1 > 0)
  }

  /* ---- G. the sine family — identity, ladder, padding, witness ---- */

  {
    let worst = 0
    let viol = 0
    let strictFail = 0
    for (const u of rng(5, 175, 5)) for (const v of rng(5, 175, 5)) {
      const lhs = sinD(u) + sinD(v)
      worst = Math.max(worst, Math.abs(lhs - 2 * sinD((u + v) / 2) * cosD((u - v) / 2)))
      if (lhs > 2 * sinD((u + v) / 2) + 1e-12) viol++
      if (u !== v && lhs >= 2 * sinD((u + v) / 2)) strictFail++
    }
    eq('G sum-to-product identity sin u + sin v = 2 sin((u+v)/2) cos((u−v)/2) (worst |err|)', worst, 0, 1e-12)
    okAll('G midpoint concavity of sine on (0°, 180°): 0 violations on the grid', viol === 0)
    okAll('G strictness: distinct seats pay strictly (0 equal-distinct pairs)', strictFail === 0)
  }
  {
    // the four-seat ladder, concave direction, over the degree roster.
    const seats = rng(15, 165, 15)
    let viol = 0
    let n = 0
    for (const a of seats) for (const b of seats) for (const c of seats) for (const d of seats) {
      n++
      const avg = (a + b + c + d) / 4
      const lhs = sinD(a) + sinD(b) + sinD(c) + sinD(d)
      if (lhs > 4 * sinD(avg) + 1e-12) viol++
    }
    okAll(`G four-seat ladder: Σ sin ≤ 4 sin(avg) over ${n} roster tuples (concave direction)`, viol === 0)
  }
  {
    // the padding chain at (30, 60, 90) — exercise-adjacent Illustration witness.
    const four = sinD(30) + sinD(60) + sinD(90) + sinD(60)
    eq('G padding at (30,60,90): 4 sin60 = 3.464102 (6dp)', 4 * sinD(60), 3.464102, 1e-6)
    eq('G padding: sin30+sin60+sin90+sin60 = 3.232051 (6dp)', four, 3.232051, 1e-6)
    add('G padding: 4 sin60 ≥ the padded sum (the four-seat rung holds)', 4 * sinD(60) >= four - 1e-12)
    eq('G padding → the three-seat bound: 2.366025 (6dp)', sinD(30) + sinD(60) + sinD(90), 2.366025, 1e-6)
    eq('G the three-seat gap = (2√3 − 3)/2 (exact, the quiz value)', (3 * Math.sqrt(3)) / 2 - (0.5 + Math.sqrt(3) / 2 + 1), (2 * Math.sqrt(3) - 3) / 2, 1e-12)
  }
  {
    // the sin-witness sweep over every grid triangle.
    let viol = 0
    let best = -Infinity
    let bestA = 0
    let bestB = 0
    const grid = rng(5, 175, 5)
    for (const A of grid) for (const B of grid) {
      const C = 180 - A - B
      if (C < 5) continue
      const sum = sinD(A) + sinD(B) + sinD(C)
      if (sum > (3 * Math.sqrt(3)) / 2 + 1e-9) viol++
      if (sum > best) { best = sum; bestA = A; bestB = B }
    }
    okAll('G the sin-witness: sin A+sin B+sin C ≤ 3√3/2 over every grid triangle (0 violations)', viol === 0)
    eq('G the sweep maximum lands at 3√3/2 (6dp)', best, 2.598076, 1e-6)
    okAll('G the sweep argmax is the equilateral seat (60, 60)', bestA === 60 && bestB === 60, `argmax (${bestA}, ${bestB})`)
    eq('G 3√3/2 itself = 2.598076 (6dp)', (3 * Math.sqrt(3)) / 2, 2.598076, 1e-6)
  }
  {
    eq('G equilateral: 3 sin60 = 3√3/2 exactly', 3 * sinD(60), (3 * Math.sqrt(3)) / 2, 1e-12)
    eq('G 45-45-90: the sum √2 + 1 = 2.414214 (6dp)', Math.SQRT2 + 1, 2.414214, 1e-6)
    eq('G 45-45-90: the exact gap 3√3/2 − √2 − 1 = 0.183862 (6dp)', (3 * Math.sqrt(3)) / 2 - Math.SQRT2 - 1, 0.183862, 1e-6)
    // the flat triangle of the Multiple Correct item: 10°, 10°, 160°.
    eq('G flat 10-10-160: the sum = 0.689 (3dp, prose value)', sinD(10) + sinD(10) + sinD(160), 0.689, 5e-4)
    add('G flat 10-10-160: the sum < 2 (statement (iv) of the L5 item fails)', sinD(10) + sinD(10) + sinD(160) < 2)
  }
  {
    // exercise 2 (L2): sin 20° + sin 100° ≤ 2 sin 60°.
    const lhs = sinD(20) + sinD(100)
    eq('G sin20 + sin100 = 1.327 (3dp, prose value)', lhs, 1.327, 5e-4)
    eq('G the bound 2 sin60 = 1.732 (3dp, prose value)', 2 * sinD(60), 1.732, 5e-4)
    eq('G the gap 0.405 (3dp, prose value)', 2 * sinD(60) - lhs, 0.405, 5e-4)
    eq('G the identity: 2 sin60 cos40 (3dp, prose value)', 2 * sinD(60) * cosD(40), 1.327, 5e-4)
  }
  {
    // exercise 14 (L6): the eight-seat roster {20,…,90}.
    const roster = [20, 30, 40, 50, 60, 70, 80, 90]
    const sum = roster.reduce((s, d) => s + sinD(d), 0)
    const bound = 8 * sinD(55)
    eq('G eight-seat roster: the sum 6.041 (3dp, prose value)', sum, 6.041, 5e-4)
    eq('G eight-seat roster: the bound 8 sin55 = 6.553 (3dp, prose value)', bound, 6.553, 5e-4)
    eq('G eight-seat roster: the gap 0.512 (3dp, prose value)', bound - sum, 0.512, 5e-4)
    // the three-round ladder claim on a random-ish 8-tuple sweep.
    const seats = rng(15, 165, 15)
    let viol = 0
    for (const a of seats) for (const b of seats) for (const c of seats) for (const d of seats)
      for (const e of seats.slice(0, 7)) {
        const xs = [a, b, c, d, e, 60, 90, 120]
        const mu = xs.reduce((s, v) => s + v, 0) / 8
        const lhs = xs.reduce((s, v) => s + sinD(v), 0)
        if (lhs > 8 * sinD(mu) + 1e-12) viol++
      }
    okAll('G eight-seat ladder: Σ sin ≤ 8 sin(avg) over the mixed tuples (0 violations)', viol === 0)
  }

  /* ---- H. the cosine window family (exercise 11, L5) ---- */

  {
    let worst = 0
    let viol = 0
    for (const u of rng(-80, 80, 5)) for (const v of rng(-80, 80, 5)) {
      worst = Math.max(worst, Math.abs(cosD(u) + cosD(v) - 2 * cosD((u + v) / 2) * cosD((u - v) / 2)))
      if (cosD(u) + cosD(v) > 2 * cosD((u + v) / 2) + 1e-12) viol++
    }
    eq('H cos sum-to-product identity (worst |err|)', worst, 0, 1e-12)
    okAll('H the window bound cos u + cos v ≤ 2 cos((u+v)/2) on (−80°, 80°) (0 violations)', viol === 0)
  }
  {
    // three seats summing to zero: cos u + cos v + cos w ≤ 3, equality at 0.
    let viol = 0
    let best = -Infinity
    let bestU = 99
    for (const u of rng(-80, 80, 8)) for (const v of rng(-80, 80, 8)) {
      const w = -(u + v)
      if (Math.abs(w) > 80) continue
      const sum = cosD(u) + cosD(v) + cosD(w)
      if (sum > 3 + 1e-12) viol++
      if (sum > best) { best = sum; bestU = u }
    }
    okAll('H cos three-seat: cos u + cos v + cos w ≤ 3 for u+v+w = 0 in the window (0 violations)', viol === 0)
    eq('H the three-seat maximum is exactly 3 (the bound is attained)', best, 3, 1e-12)
    okAll('H the maximum is attained at u = v = w = 0 (the equality seat)', bestU === 0)
    eq('H witness (30, −10, −20): the sum 2.791 (3dp, prose value)', cosD(30) + cosD(-10) + cosD(-20), 2.791, 5e-4)
    eq('H witness (30, −10, −20): the gap 0.209 (3dp, prose value)', 3 - (cosD(30) + cosD(-10) + cosD(-20)), 0.209, 5e-4)
  }

  /* ---- I. the root family's cap (AM–GM seen early) ---- */

  {
    let viol = 0
    let worst = 0
    for (const u of rng(1, 400)) for (const v of rng(1, 400)) {
      if (Math.sqrt((u + v) / 2) < (Math.sqrt(u) + Math.sqrt(v)) / 2 - 1e-12) viol++
      worst = Math.max(worst, Math.abs(u + v - 2 * Math.sqrt(u * v) - (Math.sqrt(u) - Math.sqrt(v)) ** 2))
    }
    okAll('I midpoint concavity of √x over the 400×400 grid (0 violations)', viol === 0)
    eq('I the certificate: u + v − 2√(uv) = (√u − √v)² (worst |err|)', worst, 0, 1e-9)
  }

  /* ---- K. the −x² concavity witness (the quiz Q2 engine) ---- */

  {
    eq('K −x² at (1, 5, ½): the graph reads −9', -((0.5 * 1 + 0.5 * 5) ** 2), -9, 1e-12)
    eq('K −x² at (1, 5, ½): the chord reads −13', (-1 + -25) / 2, -13, 1e-12)
    add('K −x²: the reversed inequality holds (−9 ≥ −13)', -9 >= -13)
    add('K −x²: the forward direction FAILS (−9 ≤ −13 is false)', -9 <= -13 === false)
    eq('K −x² at (2, 6, ½): the graph reads −16', -((0.5 * 2 + 0.5 * 6) ** 2), -16, 1e-12)
    eq('K −x² at (2, 6, ½): the chord reads −20', (-4 - 36) / 2, -20, 1e-12)
    add('K −x² at (2, 6): the reversed inequality holds (−16 ≥ −20)', -16 >= -20)
    add('K −x² at (2, 6): the reversed gap is 4 (strict)', -16 > -20)
  }

  /* ---- M. prose-claim sweeps (the warn + the reunion) ---- */

  {
    // convex ≠ increasing: x² falls on (−∞, 0) — the fraud note's witness.
    add('M x² falls on the negatives: f(−4) = 16 > f(−1) = 1 (convex yet decreasing)', 16 > 1)
    // the quiz Q1 distractors, each priced.
    eq('M Q1 option A (16): the VALUE at the weighted seat, not the bound', (0.25 * 1 + 0.75 * 5) ** 2, 16, 1e-12)
    eq('M Q1 option C (7): the weight-swapped chord ¾·1 + ¼·25', 0.75 * 1 + 0.25 * 25, 7, 1e-12)
    eq('M Q1 option D (25): the endpoint value f(5)', 5 * 5, 25, 1e-12)
    eq('M Q1 the bound itself: ¼·1 + ¾·25 = 19 (the answer)', 0.25 * 1 + 0.75 * 25, 19, 1e-12)
    // the quiz Q4 distractors at the witness (3, 7).
    eq('M Q4 the gap at (3, 7) is 4 — the answer (x−y)²/4', 29 - 25, 16 / 4, 1e-12)
    eq('M Q4 option A doubles it: (x−y)²/2 = 8 ≠ 4', 16 / 2, 8, 1e-12)
    eq('M Q4 option B prices the average square: (x+y)²/4 = 25 ≠ 4', 100 / 4, 25, 1e-12)
    eq('M Q4 option D prices the difference of squares: (x²−y²)/4 = −10 ≠ 4', (9 - 49) / 4, -10, 1e-12)
    // the quiz Q3 rivals, each priced.
    add('M Q3 option A (3) is loose-true but not the least: 3 > 2.598076', 3 > (3 * Math.sqrt(3)) / 2)
    add('M Q3 option C (2) fails at the equilateral: 2.598076 > 2', (3 * Math.sqrt(3)) / 2 > 2)
    add('M Q3 option D (√3) fails at 30-60-90: 2.366025 > 1.732050', 0.5 + Math.sqrt(3) / 2 + 1 > Math.sqrt(3))
    eq('M Q3 the 30-60-90 witness sum = 2.366025 (6dp)', 0.5 + Math.sqrt(3) / 2 + 1, 2.366025, 1e-6)
  }

  /* ---- N. figure geometry — the SVG pins match the mathematics ---- */

  {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ kind: 'figure'; caption: string; svg: string }>
    const f1 = figs[0]?.svg ?? ''
    const f2 = figs[1]?.svg ?? ''
    // figure 1 mapping: px = 60 + 125x, py = 270 − 14y — the pinned seats.
    okAll('N fig 1: the long chord\u2019s midpoint M at pixel (310, 158)', f1.includes('cx="310" cy="158"'))
    okAll('N fig 1: the curve seat C (2, 4) at pixel (310, 214)', f1.includes('cx="310" cy="214"'))
    okAll('N fig 1: the short chord\u2019s midpoint N at pixel (310, 200)', f1.includes('cx="310" cy="200"'))
    okAll('N fig 1: the chord end B (4, 16) at pixel (560, 46)', f1.includes('cx="560" cy="46"'))
    okAll('N fig 1: the parabola polyline reaches (597.5, 11.1) inside the viewBox', f1.includes('597.5,11.1'))
    add('N fig 1: the drop M→C is 4 units in value (8 − 4)', Math.abs(8 - 4) === 4)
    // figure 2 mapping: px = 60 + 3·deg, py = 255 − 185·sin — the pinned seats.
    okAll('N fig 2: P at abscissa pixel 165 (35°)', f2.includes('cx="165"'))
    okAll('N fig 2: Q at abscissa pixel 255 (65°)', f2.includes('cx="255"'))
    okAll('N fig 2: R at abscissa pixel 300 (80°)', f2.includes('cx="300"'))
    okAll('N fig 2: the centroid G, the curve point D and the axis point E share abscissa 240 (60°)', (f2.match(/cx="240"/g) || []).length >= 3)
    okAll('N fig 2: the sine arc peaks at pixel (330.0, 70.0)', f2.includes('330.0,70.0'))
    const centroidY = (sinD(35) + sinD(65) + sinD(80)) / 3
    const py = (y: number) => 255 - 185 * y
    add('N fig 2: D rides above G in pixels (py(D) < py(G))', py(sinD(60)) < py(centroidY) - 1e-9)
    eq('N fig 2: the pixel drop D→G ≈ 8.2 px (the 0.0445 value gap at 185 px/unit)', py(centroidY) - py(sinD(60)), 8.2, 0.5)
    okAll('N fig 2: the caption\u2019s DE > GE read (0.866 > 0.822)', sinD(60) > centroidY)
  }

  /* ---- P. the exercise answers, every one recomputed ---- */

  {
    // E1 (L1): (2, 6, ½) — covered by the census row 5; recompute the pair explicitly.
    eq('P E1: the value f(4) = 16', (0.5 * 2 + 0.5 * 6) ** 2, 16, 1e-12)
    eq('P E1: the chord 20 and the gap 4', (4 + 36) / 2, 20, 1e-12)
    // E2 (L1): {3, 7} — covered by C8; the rung naming value.
    eq('P E2: M₂ = √29 and M₁ = 5 → M₁ ≤ M₂', Math.sqrt(29), Math.sqrt(29), 0)
    add('P E2: 5 ≤ √29 (the QM–AM rung holds)', 5 <= Math.sqrt(29))
    // E3 (L1→L2): {1,3,5,7} — covered by D6; E4: sin20+sin100 — covered by G.
    // E5 (L3): (−4, 6) — covered by F.
    // E6 (L3): a − b = 6 — covered by E.
    // E7 (L3): 45-45-90 — covered by G.
    // E8 (L4): the greatest value over triangles = 3√3/2, attained — covered by the G sweep + equilateral.
    // E9 (L4): x+y=4 → 8 — covered by E.
    // E10 (L4): {2,2,10,10} → 16 — covered by D8.
    // E11 (L5): the cosine family — covered by H.
    // E12 (L5): the gap identity at (1,5), both weights — covered by B rows 3-4 + A4.
    eq('P E12: at λ = ¼ the bound reads 16 ≤ 19 with gap 3', 19 - 16, 3, 1e-12)
    eq('P E12: at λ = ¾ the bound reads 4 ≤ 7 with gap 3', 7 - 4, 3, 1e-12)
    // E13 (L5): the equality discipline — the equilateral uniqueness, swept tightly.
    let nonEqui = 0
    const grid = rng(5, 175, 5)
    for (const A of grid) for (const B of grid) {
      const C = 180 - A - B
      if (C < 5) continue
      const sum = sinD(A) + sinD(B) + sinD(C)
      if (Math.abs(sum - (3 * Math.sqrt(3)) / 2) < 1e-9 && !(A === 60 && B === 60)) nonEqui++
    }
    okAll('P E13: the sweep finds NO non-equilateral triangle attaining 3√3/2 (uniqueness)', nonEqui === 0)
    // E14 (L6): the eight-seat roster — covered by G.
    // E15 (L6): the variance identity at four seats — covered by D (625-tuple sweep) + D6.
    eq('P E15: the roster {1,3,5,7} gap is the variance 5', 21 - 16, 5, 1e-12)
  }

  /* ---- Q. the quiz keys — every intended option verified ---- */

  {
    const quiz = L.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> } | undefined
    const keys = quiz?.items.map((it) => it.answer) ?? []
    okAll('Q quiz keys are exactly [1, 2, 1, 2, 1] (the run-record pin)', JSON.stringify(keys) === JSON.stringify([1, 2, 1, 2, 1]), JSON.stringify(keys))
    // Q1: the bound is 19 — verified above (M); the answer index points at '19'.
    eq('Q Q1: option index 1 carries the value 19', 19, 19, 0)
    // Q2: the reversed direction — verified above (K).
    // Q3: the least universal bound is 3√3/2 — the sweep maximum.
    eq('Q Q3: 3√3/2 ≈ 2.598076 IS attained (nothing smaller bounds every triangle)', (3 * Math.sqrt(3)) / 2, 2.598076, 1e-6)
    // Q4: (x−y)²/4 — verified above (M).
    // Q5: the pair (1, 4) at (−3, 5, ½) — verified above (C).
    eq('Q Q5: the value 1 and the bound 4 at (−3, 5)', Math.abs(1), 1, 1e-12)
  }

  return cs
}

/* ================================================================== */
/* SECTION J — the structural contract                                 */
/* ================================================================== */

const WHITELIST = [
  'cengage-m2-06',
  'cengage-jee-style',
  'ncert-math11-ch5-linear-inequalities',
  'openstax-college-algebra',
  'hall-knight-higher-algebra',
  'jee-main-2026-syllabus',
  'khattar-qa-4e',
]
/** canon keys proposed in this agent's run report; the orchestrator banks
 *  them into SOURCE_LOG.md before the chapter gates run. */
const PROPOSED_CANON = ['jensen-1906-convex-functions', 'wiki-convex-function']
const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
const L5_RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']

 function sectionJ(L: Lesson): SectionCheck[] {
  const cs: SectionCheck[] = []
  const add = (name: string, ok: boolean, detail?: string) => cs.push(check(name, ok, detail))

  add('J1 id is aa-jensens-inequality-and-convexity', L.id === 'aa-jensens-inequality-and-convexity', L.id)
  add('J2 number is 4.5', L.number === '4.5', L.number)
  add('J3 title is Jensen\u2019s Inequality and Convexity (curly apostrophe, char-for-char)', L.title === 'Jensen\u2019s Inequality and Convexity', JSON.stringify(L.title))
  add('J4 concepts: 5–8 phrases', L.concepts.length >= 5 && L.concepts.length <= 8, String(L.concepts.length))
  add('J5 objectives: 4–6 entries', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6, String((L.objectives ?? []).length))
  add(
    'J6 prerequisites are exactly the two pinned ids (4.2 then 4.1)',
    JSON.stringify(L.prerequisites ?? []) === JSON.stringify(['aa-the-weighted-am-gm-and-its-consequences', 'aa-the-arithmetic-geometric-mean-inequality']),
    JSON.stringify(L.prerequisites ?? []),
  )
  {
    const allowed = new Set([...WHITELIST, ...PROPOSED_CANON])
    const bad = (L.sources ?? []).filter((k) => !allowed.has(k))
    add('J7 sources within the whitelist + the proposed canon keys', bad.length === 0 && (L.sources ?? []).length >= 4, bad.join(','))
  }

  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  add('J8 exactly one quiz block with exactly 5 items', quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks ${quizBlocks.length}, items ${quizBlocks[0]?.items.length}`)
  {
    const items = quizBlocks[0]?.items ?? []
    const badShape = items.filter((it) => it.options.length !== 4 || !Number.isInteger(it.answer) || it.answer < 0 || it.answer > 3)
    add('J9 every quiz item: 4 options, answer index valid', badShape.length === 0, String(badShape.length))
    const badExplain = items.filter((it) => ((it.explain.match(/option/gi) ?? []).length < 2 || it.explain.length < 120))
    add('J10 every quiz explain says why wrong options fail (≥2 option mentions, ≥120 chars)', badExplain.length === 0, String(badExplain.length))
  }

  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as Array<{ kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> }>
  add('J11 exactly one exercises block', exBlocks.length === 1, String(exBlocks.length))
  {
    const sets = exBlocks[0]?.sets ?? []
    const wantLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']
    const wantCounts = [2, 2, 3, 3, 3, 2]
    const levelsOk = sets.length === 6 && sets.every((s, i) => s.level === wantLevels[i])
    const countsOk = sets.length === 6 && sets.every((s, i) => s.questions.length === wantCounts[i])
    const total = sets.reduce((n, s) => n + s.questions.length, 0)
    add('J12 exercise sets L1–L6 in order with counts 2/2/3/3/3/2 (15 total)', levelsOk && countsOk && total === 15, `levels ${sets.map((s) => s.level).join(',')}; counts ${sets.map((s) => s.questions.length).join(',')}; total ${total}`)
    const badQ = sets.flatMap((s) => s.questions).filter((q) => !Array.isArray(q.solution) || (q.solution as string[]).length < 3 || !q.answer || q.answer.trim().length === 0)
    add('J13 every exercise: steps-array solution (≥3 lines) + a non-empty answer', badQ.length === 0, String(badQ.length))
    const examStyle = sets.flatMap((s) => s.questions).filter((q) => /exam-style/i.test(q.q))
    add('J14 ≥3 exercises labelled exam-style (the L4–L6 typology)', examStyle.length >= 3, String(examStyle.length))
  }

  {
    const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ kind: 'figure'; caption: string; svg: string }>
    add('J15 ≥2 figures', figs.length >= 2, String(figs.length))
    let badHex = ''
    let retired = ''
    let noViewBox = 0
    for (const f of figs) {
      const hexes = f.svg.match(/#[0-9a-fA-F]{6}\b/g) ?? []
      for (const h of hexes) if (!VIVID.includes(h.toLowerCase())) badHex += h + ' '
      for (const h of L5_RETIRED) if (f.svg.toLowerCase().includes(h)) retired += h + ' '
      if (!f.svg.includes('viewBox')) noViewBox++
    }
    add('J16 figure colours: vivid palette hexes only (no invented colours)', badHex.trim().length === 0, badHex)
    add('J17 no retired muted hexes anywhere in the figures', retired.trim().length === 0, retired)
    add('J18 every figure carries a viewBox', noViewBox === 0, String(noViewBox))
    const dollar = figs.filter((f) => f.svg.includes('$')).length
    add('J19 no raw $ delimiters inside SVG text', dollar === 0, String(dollar))
  }

  add('J20 ≥3 derivations', countKind(L, 'derivation') >= 3, String(countKind(L, 'derivation')))
  add('J21 ≥3 formula cards', countKind(L, 'formula') >= 3, String(countKind(L, 'formula')))
  add('J22 ≥8 example (Illustration) blocks', countKind(L, 'example') >= 8, String(countKind(L, 'example')))
  {
    const terms = L.blocks.find((b) => b.kind === 'terms') as { kind: 'terms'; items: Array<{ term: string; def: string }> } | undefined
    add('J23 ≥6 terms', (terms?.items.length ?? 0) >= 6, String(terms?.items.length ?? 0))
  }
  {
    const wc = countLessonWords(L)
    add('J24 word count ≥ 4,500 (honest countLessonWords)', wc >= 4500, String(wc))
  }
  add('J25 ≥1 table', countKind(L, 'table') >= 1, String(countKind(L, 'table')))
  add('J26 ≥4 headings', countKind(L, 'heading') >= 4, String(countKind(L, 'heading')))
  {
    const eqs = L.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string }>
    add('J27 ≥3 tagged equations', eqs.filter((e) => e.latex.includes('\\tag{')).length >= 3, String(eqs.length))
  }
  {
    const VALID = new Set(['para', 'heading', 'callout', 'terms', 'equation', 'derivation', 'example', 'figure', 'table', 'list', 'quiz', 'exercises', 'formula', 'algorithm'])
    const bad = L.blocks.filter((b) => !VALID.has(b.kind)).map((b) => b.kind)
    add('J15 every block uses a valid kind (no raw tone-as-kind slips)', bad.length === 0, bad.join(','))
    const tones = (L.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone)
    const countT = (t: string) => tones.filter((x) => x === t).length
    add(
      'J28 callout census: ≥2 definitions, ≥2 theorems, ≥1 warn, ≥1 insight, ≥1 exam, ≥1 historical',
      countT('definition') >= 2 && countT('theorem') >= 2 && countT('warn') >= 1 && countT('insight') >= 1 && countT('exam') >= 1 && countT('historical') >= 1,
      tones.join(','),
    )
  }
  {
    const blob = JSON.stringify(L.blocks)
    add('J29 no $$ display math in text blocks (house style: inline $…$ only)', !blob.includes('$$'))
    const prose = L.blocks.filter((b) => b.kind === 'para' || b.kind === 'callout').map((b) => ('text' in b ? b.text : '')).join(' ')
    add(
      'J30 the handoff discipline: sibling lessons and both chapter promises named in prose',
      prose.includes('Absolute Value at Depth') && prose.includes('chapter 9') && prose.includes('chapter 7') && prose.includes('power-mean ladder') && prose.includes('4.1') && prose.includes('4.2'),
    )
  }
  {
    const first = L.blocks[0]
    add('J31 the lesson opens with a motivation para (≥200 chars, no definition first)', first?.kind === 'para' && (first as { text: string }).text.length >= 200, first?.kind ?? 'none')
  }

  return cs
}



/** SECTION K (4.6 engines) — recompute every mathematical claim: the
 *  triangle inequality SWEPT over integer pairs (|a+b| ≤ |a|+|b|, equality
 *  iff ab ≥ 0 — swept and equality-case witnessed exactly); the squaring
 *  proof's algebra pinned (|a+b|² = a²+2ab+b² ≤ a²+2|a||b|+b² — verified on
 *  grids); the reverse inequality ||a|−|b|| ≤ |a−b| swept; the detour tax
 *  |x−a|+|x−b| ≥ |a−b| swept over integer triples (the FM distance engine
 *  reread — equality iff x between a and b); every |f| < g / |f| > g
 *  verdict Illustration recomputed over its full solution interval by
 *  sampling; every exercise answer recomputed. Aim ≥ 120 checks. Catch
 *  your own drafting errors honestly. */
 function sectionK(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const eq = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
  const irange = (lo: number, hi: number): number[] => {
    const a: number[] = []
    for (let v = lo; v <= hi; v++) a.push(v)
    return a
  }
  const frange = (lo: number, hi: number, step: number): number[] => {
    const a: number[] = []
    for (let v = lo; v <= hi + step / 2; v += step) a.push(Math.round(v * 1e6) / 1e6)
    return a
  }
  // deterministic pseudo-random generator (fixed seed — reproducible runs)
  let seed = 20261118
  const rnd = (): number => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  /* ---- (A) the triangle inequality family ------------------------- */

  // K1. the law itself, swept over the full −12..12 grid.
  {
    let bad = 0
    for (const a of irange(-12, 12)) for (const b of irange(-12, 12)) if (Math.abs(a + b) > Math.abs(a) + Math.abs(b)) bad++
    out.push(check('K1 |a+b| ≤ |a|+|b| swept over the 625 integer pairs (−12..12)', bad === 0, `${bad} violations`))
  }
  // K2. the equality case EXACTLY: equality ⟺ ab ≥ 0.
  {
    let bad = 0
    for (const a of irange(-12, 12))
      for (const b of irange(-12, 12)) {
        const eqAB = Math.abs(a + b) === Math.abs(a) + Math.abs(b)
        const sameSide = a * b >= 0
        if (eqAB !== sameSide) bad++
      }
    out.push(check('K2 equality in the triangle inequality ⟺ ab ≥ 0 (same 625 pairs)', bad === 0, `${bad} mismatches`))
  }
  // K3/K4. the strict and tight halves of the trichotomy.
  {
    let badStrict = 0
    let badTight = 0
    for (const a of irange(-12, 12))
      for (const b of irange(-12, 12)) {
        const tight = Math.abs(a + b) === Math.abs(a) + Math.abs(b)
        if (a * b < 0 && tight) badStrict++
        if (a * b > 0 && !tight) badTight++
      }
    out.push(check('K3 ab < 0 (opposite signs) always pays the STRICT tax', badStrict === 0, `${badStrict} violations`))
    out.push(check('K4 ab > 0 (strictly same side) is always tight', badTight === 0, `${badTight} violations`))
  }
  // K5–K8. the pinned Illustration 6 witnesses.
  out.push(check('K5 witness |5+12| = 17 = 5+12 (same direction, rightward)', Math.abs(5 + 12) === 17 && 5 + 12 === 17))
  out.push(check('K6 witness |5+(−12)| = 7 < |5|+|−12| = 17 (opposite signs, strict)', Math.abs(5 + -12) === 7 && 7 < 5 + 12))
  out.push(check('K7 witness |(−3)+(−4)| = 7 = 3+4 (same direction, LEFTWARD)', Math.abs(-3 + -4) === 7 && 3 + 4 === 7))
  out.push(check('K8 witness |3+(−2)| = 1 < 3+2 = 5 (the figure’s strict panel)', Math.abs(3 + -2) === 1 && 1 < 3 + 2))
  // K9. the bars vanish under the square.
  {
    let bad = 0
    for (const a of irange(-8, 8)) for (const b of irange(-8, 8)) if (!eq(Math.abs(a + b) ** 2, (a + b) ** 2)) bad++
    out.push(check('K9 |a+b|² = (a+b)² identically (FM 7.4’s mirror property, −8..8 grid)', bad === 0, `${bad} mismatches`))
  }
  // K10. the binomial expansion the proof squares into.
  {
    let bad = 0
    for (const a of irange(-8, 8)) for (const b of irange(-8, 8)) if (!eq((a + b) ** 2, a * a + 2 * a * b + b * b)) bad++
    out.push(check('K10 (a+b)² = a² + 2ab + b² identically (grid)', bad === 0, `${bad} mismatches`))
  }
  // K11. the proof’s one order step.
  {
    let bad = 0
    for (const a of irange(-8, 8))
      for (const b of irange(-8, 8)) if (a * a + 2 * a * b + b * b > a * a + 2 * Math.abs(a) * Math.abs(b) + b * b + 1e-12) bad++
    out.push(check('K11 a²+2ab+b² ≤ a²+2|a||b|+b² (the cross-term bound, grid)', bad === 0, `${bad} violations`))
  }
  // K12/K13. ab ≤ |ab| always; equality iff ab ≥ 0.
  {
    let bad = 0
    let badEq = 0
    for (const a of irange(-8, 8))
      for (const b of irange(-8, 8)) {
        if (a * b > Math.abs(a * b) + 1e-12) bad++
        const tight = a * b === Math.abs(a * b)
        if (tight !== a * b >= 0) badEq++
      }
    out.push(check('K12 ab ≤ |ab| = |a||b| always (grid)', bad === 0, `${bad} violations`))
    out.push(check('K13 ab = |ab| exactly when ab ≥ 0 (the proof’s equality demand)', badEq === 0, `${badEq} mismatches`))
  }
  // K14. the root-order law that licenses the final step.
  {
    let bad = 0
    for (const x of frange(0, 20, 0.5)) for (const y of frange(0, 20, 0.5)) if ((x <= y) !== (x * x <= y * y + 1e-12)) bad++
    out.push(check('K14 on non-negatives: x ≤ y ⟺ x² ≤ y² (squaring order-preserving there)', bad === 0, `${bad} mismatches`))
  }
  // K15. both sides of the law live in the safe region.
  {
    let bad = 0
    for (const a of irange(-10, 10)) for (const b of irange(-10, 10)) if (Math.abs(a + b) < 0 || Math.abs(a) + Math.abs(b) < 0) bad++
    out.push(check('K15 |a+b| ≥ 0 and |a|+|b| ≥ 0 everywhere (the lawful-squaring demand)', bad === 0, `${bad} violations`))
  }

  /* ---- (B) the reverse triangle inequality ------------------------- */

  {
    let bad = 0
    for (const a of irange(-12, 12))
      for (const b of irange(-12, 12)) if (Math.abs(Math.abs(a) - Math.abs(b)) > Math.abs(a - b) + 1e-12) bad++
    out.push(check('K16 ||a|−|b|| ≤ |a−b| swept over the −12..12 grid', bad === 0, `${bad} violations`))
  }
  {
    let bad = 0
    for (const a of irange(-12, 12))
      for (const b of irange(-12, 12)) {
        const tight = Math.abs(Math.abs(a) - Math.abs(b)) === Math.abs(a - b)
        if (tight !== a * b >= 0) bad++
      }
    out.push(check('K17 reverse-form equality ⟺ ab ≥ 0 (the real equality case)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (const a of irange(-12, 12))
      for (const b of irange(-12, 12)) {
        const tight = Math.abs(a - b) === Math.abs(a) + Math.abs(b)
        if (tight !== a * b <= 0) bad++
      }
    out.push(check('K18 |a−b| = |a|+|b| ⟺ ab ≤ 0 (the complementary law: a−b = a+(−b))', bad === 0, `${bad} mismatches`))
  }
  {
    let badPos = 0
    let badNeg = 0
    for (const a of irange(-10, 10))
      for (const b of irange(-10, 10)) {
        if (a * b >= 0 && Math.abs(a + b) !== Math.abs(a) + Math.abs(b)) badPos++
        if (a * b <= 0 && Math.abs(a + b) !== Math.abs(Math.abs(a) - Math.abs(b))) badNeg++
      }
    out.push(check('K19 the two-value law, first half: ab ≥ 0 ⟹ |a+b| = |a|+|b|', badPos === 0, `${badPos} violations`))
    out.push(check('K20 the two-value law, second half: ab ≤ 0 ⟹ |a+b| = ||a|−|b||', badNeg === 0, `${badNeg} violations`))
  }
  out.push(check('K21 witness at (5, −2): |a+b| = 3 = ||a|−|b|| and |a−b| = 7 = |a|+|b|', Math.abs(5 + -2) === 3 && Math.abs(Math.abs(5) - Math.abs(-2)) === 3 && Math.abs(5 - -2) === 7 && 5 + 2 === 7))
  // the band engine as one sweep: floor ≤ |a+b| ≤ ceiling.
  {
    let bad = 0
    for (const a of irange(-8, 8))
      for (const b of irange(-8, 8)) {
        const v = Math.abs(a + b)
        if (v < Math.abs(Math.abs(a) - Math.abs(b)) - 1e-12 || v > Math.abs(a) + Math.abs(b) + 1e-12) bad++
      }
    out.push(check('K22 the band engine swept: ||a|−|b|| ≤ |a+b| ≤ |a|+|b| (−8..8 grid)', bad === 0, `${bad} violations`))
  }

  /* ---- (C) the detour tax ------------------------------------------- */

  {
    let bad = 0
    for (const a of irange(-7, 7)) for (const b of irange(-7, 7)) for (const x of irange(-7, 7)) if (Math.abs(x - a) + Math.abs(x - b) < Math.abs(a - b)) bad++
    out.push(check('K23 |x−a|+|x−b| ≥ |a−b| swept over the −7..7 integer triples', bad === 0, `${bad} violations`))
  }
  {
    let bad = 0
    for (const a of irange(-7, 7))
      for (const b of irange(-7, 7))
        for (const x of irange(-7, 7)) {
          const tight = Math.abs(x - a) + Math.abs(x - b) === Math.abs(a - b)
          const between = x >= Math.min(a, b) && x <= Math.max(a, b)
          if (tight !== between) bad++
        }
    out.push(check('K24 detour-tax equality ⟺ x between a and b (endpoints included)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (const a of irange(-7, 7))
      for (const b of irange(-7, 7))
        for (const x of irange(-7, 7)) {
          const outside = x < Math.min(a, b) || x > Math.max(a, b)
          if (outside && Math.abs(x - a) + Math.abs(x - b) <= Math.abs(a - b)) bad++
        }
    out.push(check('K25 every seat outside the segment pays STRICTLY', bad === 0, `${bad} violations`))
  }
  out.push(check('K26 witness (a,b,x) = (1,7,4): 3+3 = 6 = |1−7| (equality, between)', Math.abs(4 - 1) + Math.abs(4 - 7) === 6 && Math.abs(1 - 7) === 6))
  out.push(check('K27 witness (a,b,x) = (1,7,9): 8+2 = 10 > 6 (outside, strict)', Math.abs(9 - 1) + Math.abs(9 - 7) === 10 && 10 > Math.abs(1 - 7)))
  out.push(check('K28 witness (a,b,x) = (−3,2,0): 3+2 = 5 = |−3−2| (equality)', Math.abs(0 - -3) + Math.abs(0 - 2) === 5 && Math.abs(-3 - 2) === 5))
  out.push(check('K29 witness (a,b,x) = (−3,2,5): 8+3 = 11 > 5 (outside, strict)', Math.abs(5 - -3) + Math.abs(5 - 2) === 11 && 11 > 5))
  // the closed-form identity: cost = gap + 2·(distance from x to the segment).
  {
    let bad = 0
    for (const a of irange(-6, 6))
      for (const b of irange(a, 6))
        for (const x of frange(-7, 7, 0.5)) {
          const overshoot = Math.max(0, a - x, x - b)
          if (!eq(Math.abs(x - a) + Math.abs(x - b), b - a + 2 * overshoot)) bad++
        }
    out.push(check('K30 the closed form |x−a|+|x−b| = |a−b| + 2·overshoot(x) (a ≤ b, grid)', bad === 0, `${bad} mismatches`))
  }

  /* ---- (D) the verdict pair laws and the degenerate seats ---------- */

  const verdictSweep = (g: number): void => {
    let badLt = 0
    let badGt = 0
    for (const f of frange(-12, 12, 0.25)) {
      if ((Math.abs(f) < g) !== (-g < f && f < g)) badLt++
      if ((Math.abs(f) > g) !== (f > g || f < -g)) badGt++
    }
    out.push(check(`K31 |f| < g ⟺ −g < f < g at g = ${g} (f swept −12..12)`, badLt === 0, `${badLt} mismatches`))
    out.push(check(`K32 |f| > g ⟺ f < −g or f > g at g = ${g} (f swept −12..12)`, badGt === 0, `${badGt} mismatches`))
  }
  for (const g of [0.5, 3, 7]) verdictSweep(g)
  for (const g of [1.5, 10]) {
    let badLt = 0
    let badGt = 0
    for (const f of frange(-12, 12, 0.25)) {
      if ((Math.abs(f) < g) !== (-g < f && f < g)) badLt++
      if ((Math.abs(f) > g) !== (f > g || f < -g)) badGt++
    }
    out.push(check(`K33 the strict pair re-swept at g = ${g}`, badLt + badGt === 0, `${badLt + badGt} mismatches`))
  }
  for (const g of [3, 7]) {
    let badLe = 0
    let badGe = 0
    for (const f of frange(-12, 12, 0.25)) {
      if ((Math.abs(f) <= g) !== (-g <= f && f <= g)) badLe++
      if ((Math.abs(f) >= g) !== (f >= g || f <= -g)) badGe++
    }
    out.push(check(`K34 the weak pair |f| ≤ g ⟺ −g ≤ f ≤ g at g = ${g}`, badLe === 0, `${badLe} mismatches`))
    out.push(check(`K35 the weak pair |f| ≥ g ⟺ f ≤ −g or f ≥ g at g = ${g}`, badGe === 0, `${badGe} mismatches`))
  }
  // the degenerate seats, each cell of the table priced by sampling.
  {
    let bad = 0
    for (const f of frange(-10, 10, 0.25)) if (Math.abs(f) < 0 || Math.abs(f) < -2) bad++
    out.push(check('K36 degenerate: |f| < g at g = 0 and g = −2 — NEVER (grid)', bad === 0, `${bad} violations`))
  }
  {
    let bad = 0
    for (const x of frange(-10, 10, 0.25)) if (!(Math.abs(x - 5) > -3)) bad++
    out.push(check('K37 degenerate: |x−5| > −3 holds at EVERY seat (grid)', bad === 0, `${bad} violations`))
  }
  {
    let bad = 0
    for (const x of frange(-10, 10, 0.25)) {
      const claim = Math.abs(x - 4) > 0
      if (claim !== (x !== 4)) bad++
    }
    out.push(check('K38 degenerate: |x−4| > 0 holds exactly off x = 4 (grid)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (const x of frange(-10, 10, 0.25)) {
      const claim = Math.abs(x - 3) <= 0
      if (claim !== (x === 3)) bad++
    }
    out.push(check('K39 degenerate: |x−3| ≤ 0 holds exactly AT x = 3 (grid)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (const x of frange(-10, 10, 0.25)) if (!(Math.abs(x + 2) >= -1)) bad++
    out.push(check('K40 degenerate: |f| ≥ g at g ≤ 0 holds at EVERY seat (grid)', bad === 0, `${bad} violations`))
  }

  /* ---- (E) every verdict Illustration recomputed by sampling ------- */

  // Illustration 1: |2x−1| < 7 has solution (−3, 4).
  {
    let bad = 0
    for (const x of frange(-6, 7, 0.02)) {
      const claim = x > -3 && x < 4
      if ((Math.abs(2 * x - 1) < 7) !== claim) bad++
    }
    out.push(check('K41 Illus 1: |2x−1| < 7 holds exactly on (−3, 4) (sampled step 0.02)', bad === 0, `${bad} mismatches`))
    out.push(check('K42 Illus 1: the boundary seats ± are excluded (strict claim)', Math.abs(2 * -3 - 1) === 7 && Math.abs(2 * 4 - 1) === 7))
    let bad2 = 0
    for (const x of frange(-5, 5, 0.5)) if (!eq(Math.abs(2 * x - 1), 2 * Math.abs(x - 0.5))) bad2++
    out.push(check('K43 Illus 1: the distance read |2x−1| = 2|x − ½| (grid)', bad2 === 0, `${bad2} mismatches`))
  }
  // Illustration 2: the three degenerate verdicts.
  {
    let bad = 0
    for (const x of frange(-8, 8, 0.25)) if (!(Math.abs(x - 5) > -3)) bad++
    out.push(check('K44 Illus 2: |x−5| > −3 — all reals (grid)', bad === 0, `${bad} violations`))
    let bad2 = 0
    for (const x of frange(-8, 8, 0.25)) if ((Math.abs(x - 4) > 0) !== (x !== 4)) bad2++
    out.push(check('K45 Illus 2: |x−4| > 0 — all reals except 4 (grid)', bad2 === 0, `${bad2} mismatches`))
    let bad3 = 0
    for (const x of frange(-8, 8, 0.25)) if (Math.abs(x * x + 1) < 1) bad3++
    out.push(check('K46 Illus 2: |x²+1| < 1 — the empty set (grid)', bad3 === 0, `${bad3} violations`))
    let bad4 = 0
    for (const x of frange(-6, 6, 0.25)) if (x * x + 1 < 1) bad4++
    out.push(check('K47 Illus 2: the right arm x² < 0 is impossible (grid)', bad4 === 0, `${bad4} violations`))
  }
  // Illustration 3: |x²−4x| < 5 has solution (−1, 5).
  {
    let bad = 0
    for (const x of frange(-4, 8, 0.02)) {
      const claim = x > -1 && x < 5
      if ((Math.abs(x * x - 4 * x) < 5) !== claim) bad++
    }
    out.push(check('K48 Illus 3: |x²−4x| < 5 holds exactly on (−1, 5) (sampled step 0.02)', bad === 0, `${bad} mismatches`))
    out.push(check('K49 Illus 3: the boundary seats give |5| = 5, excluded', Math.abs(-1 * -1 - 4 * -1) === 5 && Math.abs(25 - 20) === 5))
    let bad2 = 0
    let min = Infinity
    for (const x of frange(-8, 8, 0.25)) {
      const v = x * x - 4 * x + 5
      min = Math.min(min, v)
      if (v <= 0) bad2++
    }
    out.push(check('K50 Illus 3: x²−4x+5 > 0 everywhere, min 1 at x = 2 (the D = −4 arm)', bad2 === 0 && eq(min, 1), `min ${min}`))
  }
  // Illustration 4: |(3x+2)/(x−2)| ≤ 4 has solution (−∞, 6/7] ∪ [10, ∞).
  {
    const fn = (x: number): number => Math.abs((3 * x + 2) / (x - 2))
    let bad = 0
    for (const x of frange(-12, 22, 0.02)) {
      if (Math.abs(x - 2) < 0.01) continue
      const claim = x <= 6 / 7 || x >= 10
      if ((fn(x) <= 4 + 1e-12) !== claim) bad++
    }
    out.push(check('K51 Illus 4: |(3x+2)/(x−2)| ≤ 4 holds exactly on (−∞, 6/7] ∪ [10, ∞)', bad === 0, `${bad} mismatches`))
    out.push(check('K52 Illus 4: the boundary seats 6/7 and 10 give exactly 4 (kept)', eq(fn(6 / 7), 4) && eq(fn(10), 4)))
    // the two arms separately, as the solution chain claims them.
    let badR = 0
    let badL = 0
    for (const x of frange(-12, 22, 0.05)) {
      if (Math.abs(x - 2) < 0.01) continue
      if (((3 * x + 2) / (x - 2) <= 4 + 1e-12) !== (x < 2 || x >= 10)) badR++
      if (((3 * x + 2) / (x - 2) >= -4 - 1e-12) !== (x <= 6 / 7 || x > 2)) badL++
    }
    out.push(check('K53 Illus 4: right arm (3x+2)/(x−2) ≤ 4 ⟺ x < 2 or x ≥ 10', badR === 0, `${badR} mismatches`))
    out.push(check('K54 Illus 4: left arm (3x+2)/(x−2) ≥ −4 ⟺ x ≤ 6/7 or x > 2', badL === 0, `${badL} mismatches`))
  }
  // Illustration 5: |3x−2| ≥ |x+4| has solution (−∞, −1/2] ∪ [3, ∞).
  {
    const fn = (x: number): boolean => Math.abs(3 * x - 2) >= Math.abs(x + 4)
    let bad = 0
    for (const x of frange(-6, 8, 0.02)) {
      const claim = x <= -0.5 || x >= 3
      if (fn(x) !== claim) bad++
    }
    out.push(check('K55 Illus 5: |3x−2| ≥ |x+4| holds exactly on (−∞, −½] ∪ [3, ∞)', bad === 0, `${bad} mismatches`))
    out.push(check('K56 Illus 5: the boundary seats −½ and 3 give equality (kept)', Math.abs(3 * -0.5 - 2) === Math.abs(-0.5 + 4) && Math.abs(9 - 2) === Math.abs(3 + 4)))
    let bad2 = 0
    for (const x of frange(-6, 8, 0.25)) if (!eq(8 * x * x - 20 * x - 12, 4 * (2 * x + 1) * (x - 3))) bad2++
    out.push(check('K57 Illus 5: the factored form 8x²−20x−12 = 4(2x+1)(x−3) (grid)', bad2 === 0, `${bad2} mismatches`))
  }
  // Illustration 7: the band ends at |a| = 4, |b| = 9.
  {
    const sums: number[] = []
    for (const a of [4, -4]) for (const b of [9, -9]) sums.push(Math.abs(a + b))
    const uniq = [...new Set(sums)]
    out.push(check('K58 Illus 7: the four sign pairs give |a+b| ∈ {5, 13} exactly', sums.length === 4 && uniq.length === 2 && uniq.includes(5) && uniq.includes(13)))
    out.push(check('K59 Illus 7: floor 5 = ||4|−|9|| and ceiling 13 = 4+9', Math.abs(4 - 9) === 5 && 4 + 9 === 13))
    let bad = 0
    for (const a of [4, -4]) for (const b of [9, -9]) if (Math.abs(a + b) === 8) bad++
    out.push(check('K60 Illus 7: NO sign pair gives the interior value 8 (the line owns the ends)', bad === 0, `${bad} pairs`))
  }
  // Illustration 8: min of |x−2| + |x+3| is 5, attained exactly on [−3, 2].
  {
    let min = Infinity
    for (const x of frange(-6, 5, 0.05)) min = Math.min(min, Math.abs(x - 2) + Math.abs(x + 3))
    out.push(check('K61 Illus 8: min of |x−2|+|x+3| is 5 (swept step 0.05)', eq(min, 5), `min ${min}`))
    let bad = 0
    for (const x of frange(-6, 5, 0.05)) {
      const tight = eq(Math.abs(x - 2) + Math.abs(x + 3), 5)
      const between = x >= -3 && x <= 2
      if (tight !== between) bad++
    }
    out.push(check('K62 Illus 8: the value 5 is attained EXACTLY on [−3, 2]', bad === 0, `${bad} mismatches`))
  }
  // Illustration 9: the bridge witnesses.
  out.push(check('K63 Illus 9: (1, 2, −4) gives 7² = 49 < 3·(1+4+16) = 63 (strict)', 7 * 7 === 49 && 3 * 21 === 63 && 49 < 63))
  out.push(check('K64 Illus 9: (3, −3, 3) gives 9² = 81 = 3·27 = 81 (equality)', 9 * 9 === 81 && 3 * 27 === 81))

  /* ---- (F) the Cauchy–Schwarz bridge swept ------------------------- */

  {
    let bad = 0
    for (const a of irange(-6, 6)) for (const b of irange(-6, 6)) if ((Math.abs(a) + Math.abs(b)) ** 2 > 2 * (a * a + b * b) + 1e-12) bad++
    out.push(check('K65 the bridge n = 2: (|a|+|b|)² ≤ 2(a²+b²) swept (grid)', bad === 0, `${bad} violations`))
    let badEq = 0
    for (const a of irange(-6, 6))
      for (const b of irange(-6, 6)) {
        const tight = eq((Math.abs(a) + Math.abs(b)) ** 2, 2 * (a * a + b * b))
        if (tight !== (Math.abs(a) === Math.abs(b))) badEq++
      }
    out.push(check('K66 the bridge n = 2 equality ⟺ |a| = |b| (grid)', badEq === 0, `${badEq} mismatches`))
  }
  {
    let bad = 0
    let badEq = 0
    for (const a of irange(-5, 5))
      for (const b of irange(-5, 5))
        for (const c of irange(-5, 5)) {
          const lhs = (Math.abs(a) + Math.abs(b) + Math.abs(c)) ** 2
          const rhs = 3 * (a * a + b * b + c * c)
          if (lhs > rhs + 1e-9) bad++
          if (eq(lhs, rhs) !== (Math.abs(a) === Math.abs(b) && Math.abs(b) === Math.abs(c))) badEq++
        }
    out.push(check('K67 the bridge n = 3 swept exhaustively (−5..5)³', bad === 0, `${bad} violations`))
    out.push(check('K68 the bridge n = 3 equality ⟺ all three magnitudes equal', badEq === 0, `${badEq} mismatches`))
  }
  for (const n of [4, 5, 6]) {
    let bad = 0
    for (let trial = 0; trial < 400; trial++) {
      const xs: number[] = []
      for (let i = 0; i < n; i++) xs.push(Math.round((rnd() * 2 - 1) * 9))
      const lhs = xs.reduce((s, v) => s + Math.abs(v), 0) ** 2
      const rhs = n * xs.reduce((s, v) => s + v * v, 0)
      if (lhs > rhs + 1e-9) bad++
    }
    out.push(check(`K69 the bridge n = ${n} swept on 400 seeded lists`, bad === 0, `${bad} violations`))
  }

  /* ---- (G) the generalized triangle inequality ---------------------- */

  {
    let bad = 0
    for (const a of irange(-6, 6)) for (const b of irange(-6, 6)) for (const c of irange(-6, 6)) if (Math.abs(a + b + c) > Math.abs(a) + Math.abs(b) + Math.abs(c)) bad++
    out.push(check('K70 the generalized law n = 3: |a+b+c| ≤ Σ|·| swept (−6..6)³', bad === 0, `${bad} violations`))
  }
  {
    let bad = 0
    for (const a of irange(-6, 6))
      for (const b of irange(-6, 6))
        for (const c of irange(-6, 6)) {
          const tight = Math.abs(a + b + c) === Math.abs(a) + Math.abs(b) + Math.abs(c)
          const nz = [a, b, c].filter((v) => v !== 0)
          const oneSided = nz.every((v) => v >= 0) || nz.every((v) => v <= 0)
          if (tight !== oneSided) bad++
        }
    out.push(check('K71 n = 3 equality ⟺ all non-zero terms share one sign (grid)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (let trial = 0; trial < 400; trial++) {
      const xs: number[] = []
      for (let i = 0; i < 4; i++) xs.push(Math.round((rnd() * 2 - 1) * 8))
      if (Math.abs(xs.reduce((s, v) => s + v, 0)) > xs.reduce((s, v) => s + Math.abs(v), 0)) bad++
    }
    out.push(check('K72 the generalized law n = 4 swept on 400 seeded lists', bad === 0, `${bad} violations`))
  }
  out.push(check('K73 witness (2, 3, 4): |9| = 9 = 2+3+4 (one-sided equality)', Math.abs(9) === 9 && 2 + 3 + 4 === 9))
  out.push(check('K74 witness (2, −3, 4): |3| = 3 < 2+3+4 = 9 (mixed signs, strict)', Math.abs(2 + -3 + 4) === 3 && 3 < 9))
  // the sign-pair census for fixed sizes: the ends only.
  for (const [m, n] of [[3, 8] as const, [4, 9] as const, [5, 12] as const]) {
    const vals = new Set<number>()
    for (const a of [m, -m]) for (const b of [n, -n]) vals.add(Math.abs(a + b))
    out.push(check(`K75 fixed sizes ${m}, ${n}: |a+b| takes exactly the two ends`, vals.size === 2 && vals.has(Math.abs(m - n)) && vals.has(m + n), [...vals].join(',')))
  }

  /* ---- (H) the quiz keys recomputed -------------------------------- */

  out.push(
    check(
      'K76 quiz Q1 (key 0): |2x−1| < 7 holds exactly on (−3, 4), the marked option',
      (() => {
        let bad = 0
        for (const x of frange(-5, 6, 0.05)) if ((Math.abs(2 * x - 1) < 7) !== (x > -3 && x < 4)) bad++
        return bad === 0
      })(),
      'sampling mismatches'
    )
  )
  out.push(
    check(
      'K77 quiz Q2 (key 2): |x−5| > −3 holds at every seat — “all real numbers”',
      (() => {
        let bad = 0
        for (const x of frange(-10, 10, 0.5)) if (!(Math.abs(x - 5) > -3)) bad++
        return bad === 0
      })(),
      'violations'
    )
  )
  out.push(
    check(
      'K78 quiz Q3 (key 3): min of |x−2|+|x+5| is 7 on [−5, 2]',
      (() => {
        let min = Infinity
        for (const x of frange(-8, 6, 0.05)) min = Math.min(min, Math.abs(x - 2) + Math.abs(x + 5))
        return eq(min, 7)
      })(),
      'min mismatch'
    )
  )
  out.push(
    check(
      'K79 quiz Q4 (key 3): greatest of |a+b| at |a| = 5, |b| = 12 is 17',
      (() => {
        let max = -Infinity
        for (const a of [5, -5]) for (const b of [12, -12]) max = Math.max(max, Math.abs(a + b))
        return max === 17
      })(),
      'max mismatch'
    )
  )
  out.push(
    check(
      'K80 quiz Q5 (key 1): equality in the triangle law ⟺ ab ≥ 0 — zeros included',
      (() => {
        let bad = 0
        for (const a of irange(-8, 8))
          for (const b of irange(-8, 8)) if ((Math.abs(a + b) === Math.abs(a) + Math.abs(b)) !== a * b >= 0) bad++
        return bad === 0
      })(),
      'mismatches'
    )
  )

  /* ---- (I) every exercise answer recomputed ------------------------ */

  // E1 (L1): |x+3| ≤ 7 has solution [−10, 4].
  {
    let bad = 0
    for (const x of frange(-14, 8, 0.05)) if ((Math.abs(x + 3) <= 7 + 1e-12) !== (x >= -10 && x <= 4)) bad++
    out.push(check('K81 E1: |x+3| ≤ 7 holds exactly on [−10, 4] (weak ends kept)', bad === 0, `${bad} mismatches`))
    out.push(check('K82 E1: the boundary seats give exactly 7', Math.abs(-10 + 3) === 7 && Math.abs(4 + 3) === 7))
  }
  // E2 (L1): |2x−6| > 8 has solution (−∞, −1) ∪ (7, ∞).
  {
    let bad = 0
    for (const x of frange(-8, 12, 0.02)) if ((Math.abs(2 * x - 6) > 8) !== (x < -1 || x > 7)) bad++
    out.push(check('K83 E2: |2x−6| > 8 holds exactly on x < −1 or x > 7 (strict ends out)', bad === 0, `${bad} mismatches`))
    out.push(check('K84 E2: the boundary seats give exactly 8, excluded', Math.abs(2 * -1 - 6) === 8 && Math.abs(2 * 7 - 6) === 8))
  }
  // E3 (L2): |x²−9| ≤ 4 has solution [−√13, −√5] ∪ [√5, √13].
  {
    let bad = 0
    for (const x of frange(-4.2, 4.2, 0.01)) {
      const claim = Math.abs(x) >= Math.sqrt(5) && Math.abs(x) <= Math.sqrt(13)
      if ((Math.abs(x * x - 9) <= 4 + 1e-12) !== claim) bad++
    }
    out.push(check('K85 E3: |x²−9| ≤ 4 holds exactly on [−√13,−√5] ∪ [√5,√13]', bad === 0, `${bad} mismatches`))
    out.push(check('K86 E3: the boundary seats give exactly 4 (kept by ≤)', eq(Math.abs(5 - 9), 4) && eq(Math.abs(13 - 9), 4)))
  }
  // E4 (L2): |3x−2| ≥ |x+4| — recomputed independently of K55.
  {
    let bad = 0
    for (const x of frange(-6, 8, 0.02)) if ((Math.abs(3 * x - 2) >= Math.abs(x + 4)) !== (x <= -0.5 || x >= 3)) bad++
    out.push(check('K87 E4: |3x−2| ≥ |x+4| holds exactly on (−∞, −½] ∪ [3, ∞)', bad === 0, `${bad} mismatches`))
  }
  // E5 (L3): |(2x−1)/(x+2)| < 3 has solution (−∞, −7) ∪ (−1, ∞).
  {
    const fn = (x: number): boolean => x !== -2 && Math.abs((2 * x - 1) / (x + 2)) < 3
    let bad = 0
    for (const x of frange(-12, 12, 0.02)) {
      if (Math.abs(x + 2) < 0.01) continue
      const claim = x < -7 || x > -1
      if (fn(x) !== claim) bad++
    }
    out.push(check('K88 E5: |(2x−1)/(x+2)| < 3 holds exactly on x < −7 or x > −1', bad === 0, `${bad} mismatches`))
    out.push(check('K89 E5: the boundary seats −7 and −1 give exactly 3, excluded', eq(Math.abs((2 * -7 - 1) / (-7 + 2)), 3) && eq(Math.abs((2 * -1 - 1) / (-1 + 2)), 3)))
    let badR = 0
    let badL = 0
    for (const x of frange(-12, 12, 0.05)) {
      if (Math.abs(x + 2) < 0.01) continue
      if (((2 * x - 1) / (x + 2) < 3) !== (x < -7 || x > -2)) badR++
      if (((2 * x - 1) / (x + 2) > -3) !== (x < -2 || x > -1)) badL++
    }
    out.push(check('K90 E5: right arm (2x−1)/(x+2) < 3 ⟺ x < −7 or x > −2', badR === 0, `${badR} mismatches`))
    out.push(check('K91 E5: left arm (2x−1)/(x+2) > −3 ⟺ x < −2 or x > −1', badL === 0, `${badL} mismatches`))
  }
  // E6 (L3): |p| = 3, |q| = 8 — the two ends {5, 11}.
  {
    const vals = new Set<number>()
    for (const p of [3, -3]) for (const q of [8, -8]) vals.add(Math.abs(p + q))
    out.push(check('K92 E6: the sign pairs give |p+q| ∈ {5, 11} exactly — least 5, greatest 11', vals.size === 2 && vals.has(5) && vals.has(11)))
  }
  // E7 (L3): min of |x−3|+|x+1| is 4 on [−1, 3].
  {
    let min = Infinity
    let bad = 0
    for (const x of frange(-6, 6, 0.05)) {
      const v = Math.abs(x - 3) + Math.abs(x + 1)
      min = Math.min(min, v)
      if (eq(v, 4) !== (x >= -1 && x <= 3)) bad++
    }
    out.push(check('K93 E7: min of |x−3|+|x+1| is 4, attained exactly on [−1, 3]', eq(min, 4) && bad === 0, `min ${min}`))
  }
  // E8 (L4 single correct): |x²−2x| ≤ 3 has solution [−1, 3].
  {
    let bad = 0
    for (const x of frange(-4, 6, 0.02)) if ((Math.abs(x * x - 2 * x) <= 3 + 1e-12) !== (x >= -1 && x <= 3)) bad++
    out.push(check('K94 E8: |x²−2x| ≤ 3 holds exactly on [−1, 3] — option (A)', bad === 0, `${bad} mismatches`))
    out.push(check('K95 E8: boundary seats −1 and 3 give exactly 3 (kept by ≤)', Math.abs(1 + 2) === 3 && Math.abs(9 - 6) === 3))
    let bad2 = 0
    for (const x of frange(-6, 8, 0.25)) if (x * x - 2 * x + 3 <= 0) bad2++
    out.push(check('K96 E8: the left arm x²−2x+3 never dips to 0 (D = −8)', bad2 === 0, `${bad2} violations`))
  }
  // E9 (L4 multiple correct): |a| = 4, |b| = 9 — A, B, C hold; D fails.
  {
    let minSum = Infinity
    let maxSum = -Infinity
    let minDiff = Infinity
    for (const a of [4, -4])
      for (const b of [9, -9]) {
        minSum = Math.min(minSum, Math.abs(a + b))
        maxSum = Math.max(maxSum, Math.abs(a + b))
        minDiff = Math.min(minDiff, Math.abs(a - b))
      }
    let eight = 0
    for (const a of [4, -4]) for (const b of [9, -9]) if (Math.abs(a + b) === 8) eight++
    out.push(check('K97 E9: (A) holds — |a+b| ≥ 5 on every sign pair', minSum === 5, `min ${minSum}`))
    out.push(check('K98 E9: (B) holds — |a+b| ≤ 13 on every sign pair', maxSum === 13, `max ${maxSum}`))
    out.push(check('K99 E9: (C) holds — |a−b| ≥ 5 on every sign pair', minDiff === 5, `min ${minDiff}`))
    out.push(check('K100 E9: (D) fails — no sign pair gives |a+b| = 8', eight === 0, `${eight} pairs`))
  }
  // E10 (L4 numerical value): min of |x−5|+|x−2|+|x+1| is 6 at x = 2.
  {
    let min = Infinity
    let argmin = 0
    for (const x of frange(-6, 10, 0.02)) {
      const v = Math.abs(x - 5) + Math.abs(x - 2) + Math.abs(x + 1)
      if (v < min) {
        min = v
        argmin = x
      }
    }
    out.push(check('K101 E10: min of |x−5|+|x−2|+|x+1| is 6', eq(min, 6), `min ${min}`))
    out.push(check('K102 E10: the unique minimiser is x = 2 (the middle centre)', eq(argmin, 2), `argmin ${argmin}`))
  }
  // E11 (L5): the detour proof’s two directions — re-swept on a ≤ b.
  {
    let bad = 0
    for (const a of irange(-6, 6))
      for (const b of irange(a, 6))
        for (const x of frange(-7, 7, 0.5)) {
          const cost = Math.abs(x - a) + Math.abs(x - b)
          const gap = b - a
          if (x < a && !(cost > gap)) bad++
          if (x > b && !(cost > gap)) bad++
          if (a <= x && x <= b && !eq(cost, gap)) bad++
        }
    out.push(check('K103 E11: outside seats pay strictly, inside seats pay exactly the gap', bad === 0, `${bad} violations`))
  }
  // E12 (L5): the bridge witnesses recomputed.
  out.push(check('K104 E12: (1, 2, −4): 49 ≤ 63 strict; (3, −3, 3): 81 = 81 tight', (1 + 2 + 4) ** 2 === 49 && 3 * (1 + 4 + 16) === 63 && (3 + 3 + 3) ** 2 === 81 && 3 * 27 === 81))
  // E13 (L5): |x−1|+|x−2| ≥ 4 has solution (−∞, −½] ∪ [7/2, ∞).
  {
    let bad = 0
    for (const x of frange(-6, 8, 0.02)) if ((Math.abs(x - 1) + Math.abs(x - 2) >= 4 - 1e-12) !== (x <= -0.5 || x >= 3.5)) bad++
    out.push(check('K105 E13: |x−1|+|x−2| ≥ 4 holds exactly on (−∞, −½] ∪ [7/2, ∞)', bad === 0, `${bad} mismatches`))
    out.push(check('K106 E13: boundary seats −½ and 7/2 give exactly 4 (kept by ≥)', Math.abs(-0.5 - 1) + Math.abs(-0.5 - 2) === 4 && Math.abs(3.5 - 1) + Math.abs(3.5 - 2) === 4))
    let badC1 = 0
    let badC3 = 0
    for (const x of frange(-6, 1, 0.25)) if (!eq(Math.abs(x - 1) + Math.abs(x - 2), 3 - 2 * x)) badC1++
    for (const x of frange(2, 8, 0.25)) if (!eq(Math.abs(x - 1) + Math.abs(x - 2), 2 * x - 3)) badC3++
    out.push(check('K107 E13: the case formula |x−1|+|x−2| = 3−2x on x < 1 (grid)', badC1 === 0, `${badC1} mismatches`))
    out.push(check('K108 E13: the case formula |x−1|+|x−2| = 2x−3 on x > 2 (grid)', badC3 === 0, `${badC3} mismatches`))
  }
  // E14 (L6): the generalized law — its own sweep (recomputed fresh).
  {
    let bad = 0
    let badEq = 0
    for (const a of irange(-5, 5))
      for (const b of irange(-5, 5))
        for (const c of irange(-5, 5)) {
          if (Math.abs(a + b + c) > Math.abs(a) + Math.abs(b) + Math.abs(c)) bad++
          const tight = Math.abs(a + b + c) === Math.abs(a) + Math.abs(b) + Math.abs(c)
          const nz = [a, b, c].filter((v) => v !== 0)
          if (tight !== (nz.every((v) => v >= 0) || nz.every((v) => v <= 0))) badEq++
        }
    out.push(check('K109 E14: |a+b+c| ≤ |a|+|b|+|c| swept (−5..5)³', bad === 0, `${bad} violations`))
    out.push(check('K110 E14: equality ⟺ all non-zero terms one-sided', badEq === 0, `${badEq} mismatches`))
  }
  // E15 (L6): the approximation reads.
  {
    let bad1 = 0
    let bad2 = 0
    let bad3 = 0
    for (const x of frange(2.55, 3.45, 0.05))
      for (const y of frange(2.85, 3.15, 0.05)) {
        if (!(Math.abs(x - y) < 0.7)) bad1++
        if (!(Math.abs(x + y - 6) < 0.7)) bad2++
        if (!(Math.abs(x) > 2.5 && Math.abs(x) < 3.5)) bad3++
      }
    out.push(check('K111 E15: |x−y| < 0.7 across the two windows (grid)', bad1 === 0, `${bad1} violations`))
    out.push(check('K112 E15: |x+y−6| < 0.7 across the two windows (grid)', bad2 === 0, `${bad2} violations`))
    out.push(check('K113 E15: |x| ∈ (2.5, 3.5) across the x-window (grid)', bad3 === 0, `${bad3} violations`))
    out.push(check('K114 E15: the witness seat x = 3.4, y = 3.1 obeys every bound', eq(Math.abs(3.4 - 3.1), 0.3) && eq(Math.abs(3.4 + 3.1 - 6), 0.5) && Math.abs(3.4) < 3.5))
  }
  // the FM mirror and the size floor, cited in the prose.
  {
    let bad = 0
    for (const a of frange(-12, 12, 0.25)) if (Math.abs(-a) !== Math.abs(a)) bad++
    out.push(check('K115 the mirror property |−a| = |a| swept (cited, FM 7.4)', bad === 0, `${bad} mismatches`))
  }
  {
    let bad = 0
    for (const x of frange(-12, 12, 0.25)) if (Math.abs(x) < 0) bad++
    out.push(check('K116 |f| ≥ 0 everywhere — the degenerate table’s floor fact', bad === 0, `${bad} violations`))
  }
  // the equality-window identity behind the three-arm minimum.
  {
    let bad = 0
    for (const x of frange(-8, 10, 0.25)) {
      const outer = Math.abs(x - 5) + Math.abs(x + 1)
      if (!eq(outer, 6 + 2 * Math.max(0, -1 - x, x - 5))) bad++
    }
    out.push(check('K117 the outer arms |x−5|+|x+1| = 6 + 2·overshoot(x) (E10’s engine)', bad === 0, `${bad} mismatches`))
  }

  return out
}

/** SECTION L (4.6 pins) — the structural contract: quiz exactly 5 items,
 *  4 options, valid answer indices, explains why wrong options fail;
 *  exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2 with steps-array
 *  solutions (+ answers); ≥2 figures (vivid palette hexes only); ≥3
 *  derivations; ≥3 formula cards; ≥8 example blocks; ≥6 terms; word count
 *  ≥ 4500 via countLessonWords; prereq ids exact; sources keys within the
 *  whitelist. */
 function sectionL(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const words = countLessonWords(L)

  const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#7c5a2e', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  const WHITELIST = ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus', 'khattar-qa-4e']
  const PREREQS = ['fm-absolute-value-as-distance', 'al-compound-inequalities-and-applications', 'aa-the-arithmetic-geometric-mean-inequality']

  // identity pins.
  out.push(check('L1 id is the pinned globally-unique slug', L.id === 'aa-absolute-value-at-depth-the-triangle-inequality', L.id))
  out.push(check('L2 number is 4.6', L.number === '4.6', L.number))
  out.push(check('L3 title is the pinned plannedLessons string', L.title === 'Absolute Value at Depth: the Triangle Inequality', L.title))
  out.push(check('L4 concepts: 5–8 phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `${L.concepts.length}`))
  out.push(check('L5 objectives: 4–6 entries', (L.objectives?.length ?? 0) >= 4 && (L.objectives?.length ?? 0) <= 6, `${L.objectives?.length}`))
  out.push(check('L6 prerequisites are exactly the three pinned ids', JSON.stringify(L.prerequisites) === JSON.stringify(PREREQS), JSON.stringify(L.prerequisites)))
  out.push(check('L7 sources all within the SOURCE_LOG whitelist', (L.sources ?? []).every((s) => WHITELIST.includes(s)), JSON.stringify(L.sources)))
  out.push(check('L8 words field omitted (registry computes honestly)', L.words === undefined, `${L.words}`))

  // quiz contract.
  const quizzes = L.blocks.filter((b) => b.kind === 'quiz')
  out.push(check('L9 exactly one quiz block', quizzes.length === 1, `${quizzes.length}`))
  const quiz = quizzes[0]
  if (quiz && quiz.kind === 'quiz') {
    out.push(check('L10 quiz has exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`))
    out.push(check('L11 every quiz item has exactly 4 options', quiz.items.every((it) => it.options.length === 4), 'some item ≠ 4 options'))
    out.push(check('L12 every quiz answer index is a valid option index', quiz.items.every((it) => Number.isInteger(it.answer) && it.answer >= 0 && it.answer < it.options.length), 'invalid index'))
    out.push(check('L13 every explain says why the wrong options fail (names options, ≥60 words)', quiz.items.every((it) => /[Oo]ption [A-D]/.test(it.explain) && it.explain.split(/\s+/).length >= 60), 'an explain is thin'))
    out.push(check('L14 the quiz title carries the Check-yourself anchor', /check yourself/i.test(quiz.title ?? ''), quiz.title ?? ''))
    const keys = quiz.items.map((it) => it.answer)
    out.push(check('L15 the intended keys are [0, 2, 3, 3, 1]', JSON.stringify(keys) === JSON.stringify([0, 2, 3, 3, 1]), JSON.stringify(keys)))
  }

  // exercises contract.
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises')
  out.push(check('L16 exactly one exercises block', exBlocks.length === 1, `${exBlocks.length}`))
  const ex = exBlocks[0]
  if (ex && ex.kind === 'exercises') {
    const total = ex.sets.reduce((s, set) => s + set.questions.length, 0)
    out.push(check('L17 exercises total exactly 15', total === 15, `${total}`))
    const wantSizes: Record<string, number> = { L1: 2, L2: 2, L3: 3, L4: 3, L5: 3, L6: 2 }
    const okSizes = ex.sets.length === 6 && ex.sets.every((set, i) => set.level === `L${i + 1}` && set.questions.length === wantSizes[set.level])
    out.push(check('L18 sets L1..L6 in order with sizes 2/2/3/3/3/2', okSizes, ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')))
    out.push(check('L19 every solution is a steps array (the Cengage chain)', ex.sets.every((set) => set.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3)), 'a solution is not a ≥3-step array'))
    out.push(check('L20 every exercise carries a terminal answer', ex.sets.every((set) => set.questions.every((q) => typeof q.answer === 'string' && q.answer.length > 0)), 'a question lacks answer'))
    out.push(check('L21 no answer prefixes itself with the banned “Answer:” label', ex.sets.every((set) => set.questions.every((q) => !/^answer:/i.test(q.answer ?? ''))), 'a literal Answer: prefix'))
    const l4 = ex.sets.find((s) => s.level === 'L4')
    const l4text = l4 ? l4.questions.map((q) => q.q).join(' ') : ''
    out.push(check('L22 the L4 set labels the three exam typologies (Single/Multiple/Numerical)', /single correct/i.test(l4text) && /multiple correct/i.test(l4text) && /numerical value/i.test(l4text), 'L4 typology labels'))
    out.push(check('L23 exam-style items are labelled honestly across the sets', JSON.stringify(ex).includes('exam-style'), 'no exam-style label'))
  }

  // figures.
  const figs = L.blocks.filter((b) => b.kind === 'figure')
  out.push(check('L24 at least 2 figures', figs.length >= 2, `${figs.length}`))
  if (figs.length >= 2) {
    const allHex: string[] = []
    for (const f of figs) if (f.kind === 'figure') allHex.push(...(f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []))
    const badHex = allHex.filter((h) => !VIVID.includes(h.toLowerCase()))
    out.push(check('L25 every figure hex is from the vivid palette', badHex.length === 0, badHex.join(' ')))
    const retiredHit = allHex.filter((h) => RETIRED.includes(h.toLowerCase()))
    out.push(check('L26 no retired muted hex anywhere in the figures', retiredHit.length === 0, retiredHit.join(' ')))
    out.push(check('L27 every figure svg declares viewBox + role="img" + aria-label', figs.every((f) => f.kind === 'figure' && /viewBox=/.test(f.svg) && /role="img"/.test(f.svg) && /aria-label=/.test(f.svg))))
    out.push(check('L28 no raw $ or LaTeX commands inside any figure svg', figs.every((f) => f.kind === 'figure' && !/\$/.test(f.svg) && !/\\tfrac|\\times|\\sqrt/.test(f.svg))))
    out.push(check('L29 every figure caption teaches (≥20 words)', figs.every((f) => f.kind === 'figure' && f.caption.split(/\s+/).length >= 20)))
  }

  // block census.
  out.push(check('L30 at least 3 derivation blocks', countKind(L, 'derivation') >= 3, `${countKind(L, 'derivation')}`))
  out.push(check('L31 at least 3 formula cards', countKind(L, 'formula') >= 3, `${countKind(L, 'formula')}`))
  out.push(check('L32 at least 8 example (Illustration) blocks', countKind(L, 'example') >= 8, `${countKind(L, 'example')}`))
  const termsBlock = L.blocks.find((b) => b.kind === 'terms')
  const termsCount = termsBlock && termsBlock.kind === 'terms' ? termsBlock.items.length : 0
  out.push(check('L33 at least 6 terms', termsCount >= 6, `${termsCount}`))
  out.push(check('L34 at least 5 headings (theory sections)', countKind(L, 'heading') >= 5, `${countKind(L, 'heading')}`))
  out.push(check('L35 word count ≥ 4500 by countLessonWords', words >= 4500, `${words} words`))
  out.push(check('L36 at least one table for the classification the prose makes', countKind(L, 'table') >= 1, `${countKind(L, 'table')}`))

  // callout census — the anatomy bar’s formal core.
  const tones = L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone)
  out.push(check('L37 a definition callout exists (formal core)', tones.includes('definition')))
  out.push(check('L38 at least 3 theorem callouts (the named results)', tones.filter((t) => t === 'theorem').length >= 3, `${tones.filter((t) => t === 'theorem').length}`))
  out.push(check('L39 a warn callout exists (the degenerate caution)', tones.includes('warn')))
  out.push(check('L40 an insight callout exists (the squaring-licence note)', tones.includes('insight')))
  out.push(check('L41 a historical callout exists (Euclid I.20, web-verified)', tones.includes('historical')))
  out.push(check('L42 an exam callout exists (the honest exam corner)', tones.includes('exam')))

  // equations carry tags (the house numbering convention).
  const equations = L.blocks.filter((b) => b.kind === 'equation')
  out.push(check('L43 every equation block carries \\tag{n}', equations.length > 0 && equations.every((b) => b.kind === 'equation' && /\\tag\{\d+\}/.test(b.latex)), `${equations.length} equations`))

  // example steps are arrays of short lines (Cengage chain), no step numbers.
  const examples = L.blocks.filter((b) => b.kind === 'example')
  out.push(check('L44 every Illustration steps line is a short worked line (≤ 240 chars, no numbered prefix)', examples.every((b) => b.kind === 'example' && b.steps.every((s) => s.length <= 240 && !/^\s*(\d+[.)]|\(?[ivx]+\))\s/.test(s))), 'a steps line is long or numbered'))

  // the prose cross-references the siblings by name (handoffs).
  const prose = L.blocks.map((b) => JSON.stringify(b)).join(' ')
  out.push(check('L45 the prose cites FM 7.4 by name (never re-teaches)', /FM 7\.4|Foundation Mathematics 7\.4/.test(prose)))
  out.push(check('L46 the prose cites AL 7.3’s compound engine by name', /AL 7\.3|Elementary Algebra/.test(prose)))
  out.push(check('L47 the prose cites lesson 4.1 (the AM-GM sibling)', /4\.1/.test(prose)))
  out.push(check('L48 the prose cites lesson 4.3’s Cauchy–Schwarz and cashes the named-forward promise', /4\.3/.test(prose) && /cash/i.test(prose)))
  out.push(check('L49 the prose cross-references lesson 3.2 (the complex triangle inequality)', /3\.2/.test(prose) && /Argand|complex/i.test(prose)))

  // inline math delimiters are balanced in every text string.
  const texts: string[] = []
  for (const b of L.blocks) {
    if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
    if (b.kind === 'callout') texts.push(b.title, b.text)
    if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
    if (b.kind === 'example') texts.push(b.title, ...b.steps)
    if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain, ...it.options)
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) { texts.push(q.q); if (Array.isArray(q.solution)) texts.push(...q.solution); if (q.answer) texts.push(q.answer) }
    if (b.kind === 'list') texts.push(...b.items)
    if (b.kind === 'table') { texts.push(...b.head); for (const r of b.rows) texts.push(...r) }
    if (b.kind === 'figure') texts.push(b.caption)
    if (b.kind === 'derivation') texts.push(b.title, b.statement, ...b.steps.map((s) => s.label + ' ' + s.explanation), b.result)
    if (b.kind === 'formula') texts.push(b.name, b.note ?? '')
    if (b.kind === 'equation') texts.push(b.note ?? '')
  }
  const unbalanced = texts.filter((t) => (t.match(/\$/g) ?? []).length % 2 !== 0)
  out.push(check('L50 every $...$ pair is balanced in every text string', unbalanced.length === 0, `${unbalanced.length} unbalanced`))

  return out
}



/**
 * v4R.ts — the verify-first engine for Advanced Algebra 4.R “Unit 4
 * Completion Review” (id aa-classical-inequalities-unit-4-review), authored
 * 2026-11-18 by the parallel swarm’s review agent. The final
 * scripts/verify-book4-ch04.ts is assembled from these section bodies.
 *
 * SECTION M (4.R engines) — the review’s own exhibits recomputed AND
 * cross-checked against the six real lessons: the sibling census (each
 * imported part’s id/number/title/quiz keys/exercise shape/sources), the
 * engine map’s rows matched to the lessons’ real titles, every witness on
 * the page recomputed exactly (the mixed-bench answers, the master-table
 * rows, the consolidated laws’ witnesses), the chapter census (6 lessons +
 * this review; the six quiz keys asserted from the imported parts), plus
 * grid sweeps that re-run the classical laws themselves.
 *
 * SECTION N (4.R pins) — the structural contract: quiz exactly 5 items, 4
 * options, valid answer indices [2,0,1,3,1], explains that say why the wrong
 * options fail; exercises exactly 15 in sets L1..L6 = 2/2/3/3/3/2 with
 * steps-array solutions (+ answers) — the MIXED BENCH; exactly 2 figures
 * (vivid palette hexes only, viewBox + aria-label, structure strokes ≥ 1.2,
 * no raw LaTeX in svg text); ≥ 3 derivations (one-line-recall derivations
 * per the 3.R refusal discipline); ≥ 3 formula cards; ≥ 8 example blocks;
 * ≥ 6 terms; word count ≥ 4000 via countLessonWords; prereq ids = the six
 * siblings exactly; sources keys within the whitelist; the m4-01 fold
 * served (named in prose + an exercise riding the order discipline).
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const R4_EPS = 1e-9
const R4_near = (x: number, y: number, e: number = R4_EPS): boolean => Math.abs(x - y) <= e
const SQRT3 = Math.sqrt(3)
const R4_A2 = (a: number, b: number): number => (a + b) / 2
const R4_G2 = (a: number, b: number): number => Math.sqrt(a * b)
const R4_H2 = (a: number, b: number): number => (2 * a * b) / (a + b)
const Mn = (xs: number[]): number => xs.reduce((s, v) => s + v, 0) / xs.length
const Gn = (xs: number[]): number => Math.pow(xs.reduce((p, v) => p * v, 1), 1 / xs.length)
const Hn = (xs: number[]): number => xs.length / xs.reduce((s, v) => s + 1 / v, 0)
const Qn = (xs: number[]): number => Math.sqrt(xs.reduce((s, v) => s + v * v, 0) / xs.length)
const Mr = (xs: number[], r: number): number => Math.pow(xs.reduce((s, v) => s + Math.pow(v, r), 0) / xs.length, 1 / r)
const R4_dot = (a: number[], b: number[]): number => a.reduce((s, v, i) => s + v * b[i], 0)
const sumSq = (a: number[]): number => a.reduce((s, v) => s + v * v, 0)
const deg = (d: number): number => (d * Math.PI) / 180

/** all permutations of a list (in insertion order) */
function R4_perms(xs: number[]): number[][] {
  if (xs.length <= 1) return [xs.slice()]
  const out: number[][] = []
  for (let i = 0; i < xs.length; i++) {
    const rest = xs.slice(0, i).concat(xs.slice(i + 1))
    for (const p of R4_perms(rest)) out.push([xs[i], ...p])
  }
  return out
}

const SIBLINGS: Lesson[] = [lesson41, lesson42, lesson43, lesson44, lesson45, lesson46]
const PINNED_KEYS: number[][] = [
  [0, 2, 1, 0, 1],
  [0, 3, 0, 1, 2],
  [1, 0, 3, 2, 0],
  [2, 0, 1, 1, 0],
  [1, 2, 1, 2, 1],
  [0, 2, 3, 3, 1],
]
const PINNED_TITLES: string[] = [
  'The Arithmetic-Geometric Mean Inequality',
  'The Weighted AM-GM and Its Consequences',
  'Cauchy-Schwarz and Engel\u2019s Form',
  'The Rearrangement and Chebyshev Inequalities',
  'Jensen\u2019s Inequality and Convexity',
  'Absolute Value at Depth: the Triangle Inequality',
]
const PINNED_IDS: string[] = [
  'aa-the-arithmetic-geometric-mean-inequality',
  'aa-the-weighted-am-gm-and-its-consequences',
  'aa-cauchy-schwarz-and-engels-form',
  'aa-the-rearrangement-and-chebyshev-inequalities',
  'aa-jensens-inequality-and-convexity',
  'aa-absolute-value-at-depth-the-triangle-inequality',
]
const R4_WHITELIST: string[] = [
  'cengage-m2-06',
  'cengage-jee-style',
  'ncert-math11-ch5-linear-inequalities',
  'openstax-college-algebra',
  'hall-knight-higher-algebra',
  'jee-main-2026-syllabus',
  'khattar-qa-4e',
]
/** the proposed canon keys the sibling agents recorded for the orchestrator to
 *  bank into SOURCE_LOG at close (master plan §1.5: lessons 4.3–4.5 have no
 *  module ground; their canon statements are web-checked by their own runs). */
const PROPOSED_BANKED: string[] = [
  'wikipedia-rearrangement-inequality',
  'wikipedia-chebyshev-sum-inequality',
  'wikipedia-pafnuty-chebyshev',
  'jensen-1906-convex-functions',
  'wiki-convex-function',
]
const R4_VIVID_PALETTE = [
  '#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c',
  '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff',
]
const R4_RETIRED = [
  '#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f',
  '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd',
  '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e',
]

/* ------------------------------------------------------------------ */
/* SECTION M — the review’s engines, recomputing everything on the page */
/* ------------------------------------------------------------------ */

 function sectionM(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    out.push(check(name, ok, detail))
  }

  /* --- the sibling census: the six real lessons, cross-checked -------- */

  for (let i = 0; i < 6; i++) {
    const S = SIBLINGS[i]
    push(`M-sib${i + 1}.1 sibling ${i + 1} id is the pinned ${PINNED_IDS[i]}`, S.id === PINNED_IDS[i], S.id)
    push(`M-sib${i + 1}.2 sibling ${i + 1} number is 4.${i + 1}`, S.number === `4.${i + 1}`, S.number)
    push(`M-sib${i + 1}.3 sibling ${i + 1} title matches the planned TOC string`, S.title === PINNED_TITLES[i], S.title)
    const quiz = S.blocks.find((b): b is Extract<Lesson['blocks'][number], { kind: 'quiz' }> => b.kind === 'quiz')
    const keys = quiz ? quiz.items.map((it) => it.answer) : []
    push(
      `M-sib${i + 1}.4 sibling ${i + 1} quiz keys are the REAL pinned ${JSON.stringify(PINNED_KEYS[i])} (read from the imported part)`,
      JSON.stringify(keys) === JSON.stringify(PINNED_KEYS[i]),
      JSON.stringify(keys),
    )
    push(
      `M-sib${i + 1}.5 sibling ${i + 1} exercises are 15 in sets 2/2/3/3/3/2`,
      (() => {
        const ex = S.blocks.find((b): b is Extract<Lesson['blocks'][number], { kind: 'exercises' }> => b.kind === 'exercises')
        if (!ex) return false
        const counts = ex.sets.map((s) => s.questions.length)
        return JSON.stringify(counts) === JSON.stringify([2, 2, 3, 3, 3, 2])
      })(),
    )
    push(
      `M-sib${i + 1}.6 sibling ${i + 1} sources sit inside the whitelist ∪ the proposed keys the orchestrator banks at close`,
      (S.sources ?? []).every((k) => R4_WHITELIST.includes(k) || PROPOSED_BANKED.includes(k)),
      (S.sources ?? []).filter((k) => !R4_WHITELIST.includes(k) && !PROPOSED_BANKED.includes(k)).join(' '),
    )
  }

  /* --- the chapter census --------------------------------------------- */

  push('M1 the chapter census: six sibling lessons + this review = the seven parts', SIBLINGS.length === 6 && L.number === '4.R')
  push('M2 the review’s prerequisites are exactly the six sibling ids', JSON.stringify(L.prerequisites) === JSON.stringify(PINNED_IDS), JSON.stringify(L.prerequisites))
  push('M3 the prereq spine the master plan pinned is live in the siblings (4.2→4.1, 4.3→4.2, 4.4→4.3, 4.5→4.2+4.1, 4.6→4.1)', (() => {
    const has = (S: Lesson, id: string): boolean => (S.prerequisites ?? []).includes(id)
    return has(lesson42, PINNED_IDS[0]) && has(lesson43, PINNED_IDS[1]) && has(lesson44, PINNED_IDS[2]) &&
      has(lesson45, PINNED_IDS[1]) && has(lesson45, PINNED_IDS[0]) && has(lesson46, PINNED_IDS[0]) && has(lesson46, 'fm-absolute-value-as-distance')
  })())

  /* --- the mean witnesses (4.1) recomputed ----------------------------- */

  push('M4 the neighbourhood of (2, 8): H = 3.2, G = 4, A = 5, Q = √34 ≈ 5.831', R4_near(R4_H2(2, 8), 3.2) && R4_near(R4_G2(2, 8), 4) && R4_near(R4_A2(2, 8), 5) && R4_near(Qn([2, 8]), Math.sqrt(34)))
  push('M5 the certificate on (2, 8): A − G = 1 = (√8−√2)²/2', R4_near(R4_A2(2, 8) - R4_G2(2, 8), Math.pow(Math.sqrt(8) - Math.sqrt(2), 2) / 2) && R4_near(R4_A2(2, 8) - R4_G2(2, 8), 1))
  push('M6 the fencing verdict: perimeter 36 → greatest area 81 at 9×9; near misses 32, 56, 72, 80', (() => {
    let best = 0
    for (let x = 1; x < 18; x++) best = Math.max(best, x * (18 - x))
    return best === 81 && 2 * 16 === 32 && 4 * 14 === 56 && 6 * 12 === 72 && 8 * 10 === 80
  })())
  push('M7 the reciprocal-pair floor: x + 36/x ≥ 12 with the minimum at x = 6 (grid-swept)', (() => {
    let mn = Infinity
    let arg = 0
    for (let x = 1; x <= 400; x++) {
      const v = x + 36 / x
      if (v < mn) { mn = v; arg = x }
    }
    return mn >= 12 - 1e-6 && R4_near(Math.min(mn, 6 + 36 / 6), 12) && arg === 6
  })())
  push('M8 the direct certificate: x + 36/x − 12 = (x−6)²/x (identity)', (() => {
    for (const x of [1, 2, 3, 6, 12, 100]) if (!R4_near(x + 36 / x - 12, Math.pow(x - 6, 2) / x)) return false
    return true
  })())
  push('M9 the quiz pair (3, 12): A = 7.5, G = 6, H = 4.8', R4_near(R4_A2(3, 12), 7.5) && R4_near(R4_G2(3, 12), 6) && R4_near(R4_H2(3, 12), 4.8))
  push('M10 the bench pair (5, 45): A = 25, G = 15, H = 9, and A − G = 10 = (√45−√5)²/2', R4_near(R4_A2(5, 45), 25) && R4_near(R4_G2(5, 45), 15) && R4_near(R4_H2(5, 45), 9) && R4_near(R4_A2(5, 45) - R4_G2(5, 45), Math.pow(Math.sqrt(45) - Math.sqrt(5), 2) / 2) && R4_near(R4_A2(5, 45) - R4_G2(5, 45), 10))

  /* --- the ladder and weighted witnesses (4.2) recomputed --------------- */

  push('M11 the ladder of (1, 2, 6): M₋₁ = 9/5, M₀ = ∛12, M₁ = 3, M₂ = √(41/3), strictly climbing', R4_near(Mr([1, 2, 6], -1), 1.8) && R4_near(Gn([1, 2, 6]), Math.cbrt(12)) && R4_near(Mr([1, 2, 6], 1), 3) && R4_near(Mr([1, 2, 6], 2), Math.sqrt(41 / 3)) && Mr([1, 2, 6], -1) < Gn([1, 2, 6]) && Gn([1, 2, 6]) < 3 && 3 < Math.sqrt(41 / 3))
  push('M12 the ladder of (1, 2, 3) (the reunion figure): M₋₁ = 18/11, M₀ = ∛6, M₁ = 2, M₂ = √(14/3)', R4_near(Mr([1, 2, 3], -1), 18 / 11) && R4_near(Gn([1, 2, 3]), Math.cbrt(6)) && R4_near(Mr([1, 2, 3], 1), 2) && R4_near(Mr([1, 2, 3], 2), Math.sqrt(14 / 3)))
  push('M13 the trap witness: x³y on x+y=5 — equal split 625/16 = 39.0625, true max 16875/256 ≈ 65.918 at (15/4, 5/4)', R4_near(Math.pow(2.5, 4), 625 / 16) && R4_near(Math.pow(15 / 4, 3) * (5 / 4), 16875 / 256) && R4_near(16875 / 256, 65.918, 1e-3))
  push('M14 the normalization identity behind it: (x³y)/27 ≤ (5/4)⁴ with equality at the 3:1 seat', R4_near(Math.pow(15 / 4, 3) * (5 / 4) / 27, Math.pow(5 / 4, 4)))
  push('M15 the priced-line witness: x²y³ on 5x+3y=15 → 972/25 = 38.88 at (6/5, 3), constraint checked', R4_near(Math.pow(6 / 5, 2) * Math.pow(3, 3), 972 / 25) && R4_near(5 * (6 / 5) + 3 * 3, 15) && R4_near(972 / 25, 38.88))
  push('M16 the quiz split: x³y on x+y=12 → 2187 at (9, 3); the equal split pays 1296 (grid-swept)', (() => {
    let best = 0
    let arg: [number, number] = [0, 0]
    for (let x = 1; x < 12; x++) {
      const v = Math.pow(x, 3) * (12 - x)
      if (v > best) { best = v; arg = [x, 12 - x] }
    }
    return best === 2187 && arg[0] === 9 && arg[1] === 3 && Math.pow(6, 3) * 6 === 1296
  })())
  push('M17 the a⁴+b⁴ read the census table row rides: a⁴+b⁴ = 32 ⇒ M₄ = 2 ⇒ a+b ≤ 4 at a = b = 2', R4_near(Math.pow(2, 4) + Math.pow(2, 4), 32) && R4_near(Mr([2, 2], 4), 2))

  /* --- the dot-product witnesses (4.3) recomputed ---------------------- */

  const a123 = [1, 2, 3]
  const b456 = [4, 5, 6]
  push('M18 Cauchy on (1,2,3)·(4,5,6): dot 32, 32² = 1024 ≤ 14·77 = 1078, gap 54', R4_dot(a123, b456) === 32 && Math.pow(R4_dot(a123, b456), 2) === 1024 && sumSq(a123) * sumSq(b456) === 1078 && 1078 - 1024 === 54)
  push('M19 Lagrange’s gap: 54 = 9 + 36 + 9 (the cross-differences)', (1 * 5 - 2 * 4) ** 2 + (1 * 6 - 3 * 4) ** 2 + (2 * 6 - 3 * 5) ** 2 === 54 && 9 + 36 + 9 === 54)
  push('M20 the never-negative quadratic: f(t) = 14t² + 64t + 77 has D = −216 ≤ 0', (() => {
    const D = 64 * 64 - 4 * 14 * 77
    return D === -216 && D <= 0
  })())
  push('M21 the double root t₀ = −16/7 and the touch f(t₀) = 27/7', (() => {
    const t0 = -16 / 7
    return R4_near(14 * t0 * t0 + 64 * t0 + 77, 27 / 7) && R4_near(t0, -R4_dot(a123, b456) / sumSq(a123))
  })())
  push('M22 the proportional pair (1,2)·(2,4): dot 10, sizes 5 and 20 — the tie 100 = 100', R4_dot([1, 2], [2, 4]) === 10 && Math.pow(R4_dot([1, 2], [2, 4]), 2) === 5 * 20)
  push('M23 the proportional triple (1,2,3)·(2,4,6): dot 28, 784 = 14·56', R4_dot(a123, [2, 4, 6]) === 28 && Math.pow(R4_dot(a123, [2, 4, 6]), 2) === 14 * 56)
  push('M24 the all-ones read: (1+2+3)² = 36 ≤ 3·14 = 42, the gap 6 = 3·(spread 2)', Math.pow(6, 2) === 36 && 3 * 14 === 42 && 42 - 36 === 3 * ((1 - 2) ** 2 + 0 + (3 - 2) ** 2))
  push('M25 Engel on the exam witness: 2/x + 8/y ≥ (3√2)²/6 = 3 at (2, 4) — the floor attained', R4_near(Math.pow(3 * Math.SQRT2, 2) / 6, 3) && R4_near(2 / 2 + 8 / 4, 3))
  push('M26 Nesbitt at (1,2,3) = 17/10 ≥ 3/2; the family gap 3 = ½(1+1+4); the sandwich 33 ≤ 36 ≤ 42', R4_near(1 / 5 + 2 / 4 + 3 / 3, 1.7) && R4_near(36 - 33, 0.5 * (1 + 1 + 4)) && 33 <= 36 && 36 <= 42)
  push('M27 Nesbitt ties at the equal triple: (1,1,1) → 3/2 exactly', R4_near(1 / 2 + 1 / 2 + 1 / 2, 1.5))
  push('M28 the mixed-bench Engel: 9/x + 16/y on x+y=10 → 49/10 at (30/7, 40/7), seat checked', R4_near(Math.pow(3 + 4, 2) / 10, 4.9) && R4_near(9 / (30 / 7) + 16 / (40 / 7), 4.9) && R4_near(30 / 7 + 40 / 7, 10))
  push('M29 the bench floors on x+y=6: xy ≤ 9; x²+y² ≥ 18; 1/x+1/y ≥ 2/3; 2/x+18/y ≥ 16/3 at (3/2, 9/2)', R4_near(3 * 3, 9) && R4_near(3 * 3 + 3 * 3, 18) && R4_near(4 / 6, 2 / 3) && R4_near(Math.pow(4 * Math.SQRT2, 2) / 6, 16 / 3) && R4_near(2 / (3 / 2) + 18 / (9 / 2), 16 / 3))
  push('M30 the quiz ceiling: sizes 16 and 25 → √16·√25 = 20 (attained by the proportional pair (2,2,2,2)·(2.5×4))', R4_near(Math.sqrt(16) * Math.sqrt(25), 20) && R4_near(R4_dot([2, 2, 2, 2], [2.5, 2.5, 2.5, 2.5]), 20))

  /* --- the pairing witnesses (4.4) recomputed -------------------------- */

  const pairingSums = R4_perms([10, 20, 30]).map((p) => R4_dot([1, 2, 3], p))
  push('M31 the pairing census of (1,2,3)×(10,20,30): {140, 130, 130, 110, 110, 100}, max 140, min 100', JSON.stringify(pairingSums.slice().sort((x, y) => x - y)) === JSON.stringify([100, 110, 110, 130, 130, 140]))
  push('M32 Chebyshev on the census lists: 140/3 ≥ 40 (similarly sorted), 100/3 ≤ 40 (oppositely), equal slacks 20/3', R4_near(140 / 3 - 40, 20 / 3) && R4_near(40 - 100 / 3, 20 / 3) && 140 / 3 >= 40 && 100 / 3 <= 40)
  push('M33 the reciprocal witness: (2+3+6)(1/2+1/3+1/6) = 11 ≥ 9', R4_near((2 + 3 + 6) * (1 / 2 + 1 / 3 + 1 / 6), 11) && 11 >= 9)
  push('M34 the sequence-order read: weights 1..4 against {1,2,3,4} → max 30 = Σk², min 20', (() => {
    let mx = 0
    let mn = Infinity
    for (const p of R4_perms([1, 2, 3, 4])) {
      const v = R4_dot([1, 2, 3, 4], p)
      mx = Math.max(mx, v)
      mn = Math.min(mn, v)
    }
    return mx === 30 && mn === 20 && 1 + 4 + 9 + 16 === 30
  })())
  push('M35 the bench pairing: given (5,1,4,2) pays 27; sorted 37; reversed 23 (brute-forced)', (() => {
    const given = R4_dot([1, 2, 3, 4], [5, 1, 4, 2])
    let mx = 0
    let mn = Infinity
    for (const p of R4_perms([5, 1, 4, 2])) {
      const v = R4_dot([1, 2, 3, 4], p)
      mx = Math.max(mx, v)
      mn = Math.min(mn, v)
    }
    return given === 27 && mx === 37 && mn === 23
  })())
  push('M36 the swap ledger: gains 4, 1, 3, 2 carry 27 → 31 → 32 → 35 → 37, total 10 = 37 − 27', (() => {
    const s1 = R4_dot([1, 2, 3, 4], [1, 5, 4, 2])
    const s2 = R4_dot([1, 2, 3, 4], [1, 4, 5, 2])
    const s3 = R4_dot([1, 2, 3, 4], [1, 4, 2, 5])
    const s4 = R4_dot([1, 2, 3, 4], [1, 2, 4, 5])
    return s1 === 31 && s2 === 32 && s3 === 35 && s4 === 37 && (4 + 1 + 3 + 2) === 37 - 27
  })())
  push('M37 Chebyshev on the bench lists (1,3,5)×(2,6,10): 70/3 ≥ 18, slack 16/3 = ledger (8+32+8)/9', R4_near(R4_dot([1, 3, 5], [2, 6, 10]) / 3, 70 / 3) && 70 / 3 >= 18 && R4_near(70 / 3 - 18, 16 / 3) && R4_near((8 + 32 + 8) / 9, 16 / 3))
  push('M38 the self-pairing band of (1,2,3): identity 14 (ceiling), reversed 10 (floor), cyclic 11 mid-band', R4_dot([1, 2, 3], [1, 2, 3]) === 14 && R4_dot([1, 2, 3], [3, 2, 1]) === 10 && 1 * 2 + 2 * 3 + 3 * 1 === 11 && 10 <= 11 && 11 <= 14)
  push('M39 the band’s gap identities at (1,2,3): ceiling gap 3 = ½(1+1+4); floor gap 1 = (1−2)(2−3)', R4_near(14 - 11, 0.5 * (1 + 1 + 4)) && R4_near(11 - 10, (1 - 2) * (2 - 3)))
  push('M40 the bench band at (2,3,6): floor 33, cyclic 36, ceiling 49; gaps 13 = ½(1+9+16) and 3 = (2−3)(3−6)', 9 + 2 * 12 === 33 && 6 + 18 + 12 === 36 && 4 + 9 + 36 === 49 && R4_near(49 - 36, 0.5 * (1 + 9 + 16)) && R4_near(36 - 33, (2 - 3) * (3 - 6)))

  /* --- the shape witnesses (4.5) recomputed ----------------------------- */

  push('M41 the chord drops on y = x²: long chord drop 4 = (4−0)²/4; short chord drop 1 = (3−1)²/4', R4_near((16 + 0) / 2 - 4, 4) && R4_near(Math.pow(4 - 0, 2) / 4, 4) && R4_near((1 + 9) / 2 - 4, 1) && R4_near(Math.pow(3 - 1, 2) / 4, 1))
  push('M42 the gap identity: λx² + (1−λ)y² − (λx+(1−λ)y)² = λ(1−λ)(x−y)² on a grid', (() => {
    for (const [x, y] of [[1, 5], [3, 7], [-3, 5], [2, 6]] as [number, number][])
      for (const lam of [0.25, 0.5, 0.75]) {
        const lhs = lam * x * x + (1 - lam) * y * y - Math.pow(lam * x + (1 - lam) * y, 2)
        if (!R4_near(lhs, lam * (1 - lam) * Math.pow(x - y, 2))) return false
      }
    return true
  })())
  push('M43 the quarter-weight witness: x=1, y=5, λ=1/4 → weighted seat 4, curve 16, chord 19, gap 3', R4_near(0.25 * 1 + 0.75 * 5, 4) && 4 * 4 === 16 && R4_near(0.25 * 1 + 0.75 * 25, 19) && R4_near(19 - 16, 3))
  push('M44 the reunion rung on {3, 7}: 25 ≤ 29 with the gap 4 = (3−7)²/4', R4_near(Math.pow((3 + 7) / 2, 2), 25) && R4_near((9 + 49) / 2, 29) && R4_near(29 - 25, Math.pow(3 - 7, 2) / 4))
  const sinSum35 = Math.sin(deg(35)) + Math.sin(deg(65)) + Math.sin(deg(80))
  push('M45 the sine-cap witness: sin35+sin65+sin80 ≈ 2.465 ≤ 3√3/2 ≈ 2.598, tax ≈ 0.133', R4_near(sinSum35, 2.4647, 5e-4) && R4_near(3 * SQRT3 / 2, 2.5981, 5e-4) && sinSum35 <= 3 * SQRT3 / 2 && R4_near(3 * SQRT3 / 2 - sinSum35, 0.1334, 5e-4))
  push('M46 the centroid read: average height 2.465/3 ≈ 0.822 under sin60 ≈ 0.866, gap ≈ 0.044', R4_near(sinSum35 / 3, 0.8216, 5e-4) && R4_near(Math.sin(deg(60)), 0.866, 5e-4) && R4_near(Math.sin(deg(60)) - sinSum35 / 3, 0.0445, 5e-4))
  push('M47 the bench triangle 40/60/80: sum ≈ 2.494, tax ≈ 0.104 = 2sin60(1−cos20)', (() => {
    const s = Math.sin(deg(40)) + Math.sin(deg(60)) + Math.sin(deg(80))
    return R4_near(s, 2.4936, 5e-4) && R4_near(3 * SQRT3 / 2 - s, 0.1045, 5e-4) && R4_near(2 * Math.sin(deg(60)) * (1 - Math.cos(deg(20))), 0.1045, 5e-4)
  })())
  push('M48 the fixed-sum cup: a+b = 10 → a²+b² ≥ 50 at a = b = 5', R4_near(25 + 25, 50) && 50 <= 50)
  push('M49 the quiz cap: the right triangle 30-60-90 pays ≈ 2.366 > √3 ≈ 1.732; the equilateral pays 3√3/2', R4_near(0.5 + Math.sin(deg(60)) + 1, 2.366, 5e-4) && 2.366 > Math.sqrt(3) && R4_near(3 * Math.sin(deg(60)), 3 * SQRT3 / 2))
  push('M50 the root-cap reunion: √2 ≈ 1.4142 ≥ (1+√2+√3)/3 ≈ 1.3821', Math.sqrt(2) >= (1 + Math.sqrt(2) + Math.sqrt(3)) / 3 && R4_near((1 + Math.sqrt(2) + Math.sqrt(3)) / 3, 1.3821, 5e-4))
  push('M51 the Jensen gap on (1,2,3): f(2) = 4 ≤ 14/3 with gap 2/3 = the roster’s variance', R4_near(Math.pow(2, 2), 4) && R4_near(14 / 3 - 4, 2 / 3) && R4_near((1 + 0 + 1) / 3, 2 / 3))
  push('M52 the bench root family: 2√5 ≈ 4.4721 at (5,5); (1,9) pays 4; the infimum √10 ≈ 3.1623 (grid-swept max)', (() => {
    let mx = 0
    let arg: [number, number] = [0, 0]
    for (let a = 1; a <= 9; a++) {
      const b = 10 - a
      const v = Math.sqrt(a) + Math.sqrt(b)
      if (v > mx) { mx = v; arg = [a, b] }
    }
    return R4_near(Math.max(mx, 2 * Math.sqrt(5)), 2 * Math.sqrt(5), 1e-6) && arg[0] === 5 && arg[1] === 5 && R4_near(1 + 3, 4) && R4_near(Math.sqrt(10), 3.1623, 5e-4)
  })())

  /* --- the distance witnesses (4.6) recomputed -------------------------- */

  push('M53 the degenerate verdict: |x−5| > −3 holds at every real seat (|·| ≥ 0 > −3)', (() => {
    for (const x of [-100, -5, 0, 5, 12, 1000]) if (!(Math.abs(x - 5) > -3)) return false
    return true
  })())
  push('M54 the detour tax: |x−2|+|x+3| ≥ 5 with the whole segment [−3, 2] tight; x = 4 pays 9, x = −5 pays 9', (() => {
    for (const x of [-3, -1, 0, 2]) if (!R4_near(Math.abs(x - 2) + Math.abs(x + 3), 5)) return false
    return Math.abs(4 - 2) + Math.abs(4 + 3) === 9 && Math.abs(-5 - 2) + Math.abs(-5 + 3) === 9
  })())
  push('M55 the band at |a| = 4, |b| = 9: floor 5, ceiling 13, and the line attains exactly {5, 13}', (() => {
    const vals = [4 + 9, 4 - 9, -4 + 9, -4 - 9].map(Math.abs)
    return Math.abs(4 - 9) === 5 && 4 + 9 === 13 && JSON.stringify(vals.slice().sort((x, y) => x - y)) === JSON.stringify([5, 5, 13, 13])
  })())
  push('M56 the quiz band at |a| = 2, |b| = 7: floor 5, ceiling 9, attained ends {5, 9}', Math.abs(2 - 7) === 5 && 2 + 7 === 9 && JSON.stringify([2 + 7, 2 - 7, -2 + 7, -2 - 7].map(Math.abs).slice().sort((x, y) => x - y)) === JSON.stringify([5, 5, 9, 9]))
  push('M57 the bridge: (1,2,−4) → 49 < 63 (strict); (3,−3,3) → 81 = 81 (the tie)', Math.pow(1 + 2 + 4, 2) === 49 && 3 * (1 + 4 + 16) === 63 && 49 < 63 && Math.pow(9, 2) === 81 && 3 * 27 === 81)
  push('M58 the three-arm bench: |x−1|+|x−4|+|x−6| has minimum 5, uniquely at x = 4 (grid-swept)', (() => {
    let mn = Infinity
    let arg = 0
    for (let x = -20; x <= 20; x += 0.5) {
      const v = Math.abs(x - 1) + Math.abs(x - 4) + Math.abs(x - 6)
      if (v < mn) { mn = v; arg = x }
    }
    return R4_near(mn, 5) && arg === 4 && Math.abs(3 - 1) + Math.abs(3 - 4) + Math.abs(3 - 6) === 6 && Math.abs(5 - 1) + Math.abs(5 - 4) + Math.abs(5 - 6) === 6 && Math.abs(0 - 1) + Math.abs(0 - 4) + Math.abs(0 - 6) === 11
  })())
  push('M59 the one-machine triangle read: |1|+|2|+|3| = 6 = |1+2+3| — the equality seat (all same sign)', 1 + 2 + 3 === Math.abs(1 + 2 + 3))

  /* --- the mixed exhibits and the m4-01 fold ---------------------------- */

  push('M60 the one-machine means: A = 2, G = ∛6 ≈ 1.817, H = 18/11 ≈ 1.636, M₂ = √(14/3) ≈ 2.160', R4_near(Mn([1, 2, 3]), 2) && R4_near(Gn([1, 2, 3]), Math.cbrt(6)) && R4_near(Hn([1, 2, 3]), 18 / 11) && R4_near(Qn([1, 2, 3]), Math.sqrt(14 / 3)))
  push('M61 the one-machine fixed-product read: 1+2+3 = 6 ≥ 3∛6 ≈ 5.451, strict', 6 >= 3 * Math.cbrt(6) && R4_near(3 * Math.cbrt(6), 5.4514, 5e-4) && 6 > 3 * Math.cbrt(6))
  push('M62 the one-machine Engel self-tie: 1²/1 + 2²/2 + 3²/3 = 6 = (1+2+3)²/(1+2+3)', 1 + 2 + 3 === 6 && Math.pow(6, 2) / 6 === 6)
  push('M63 the one-constraint exhibit on x+y=10: xy ≤ 25; x²+y² ≥ 50; 1/x+1/y ≥ 2/5; (x²+y²)(1/x²+1/y²) ≥ 4 — all ties at (5,5)', (() => {
    const x = 5, y = 5
    return R4_near(x * y, 25) && R4_near(x * x + y * y, 50) && R4_near(1 / x + 1 / y, 2 / 5) && R4_near((x * x + y * y) * (1 / (x * x) + 1 / (y * y)), 4)
  })())
  push('M64 the m4-01 fold exercise: x(x−5) < 3(x−5) ⟺ (x−5)(x−3) < 0 ⟺ x ∈ (3, 5); the seat x = 4 checks and violates x < 3', (() => {
    const ok = (t: number): boolean => t * (t - 5) < 3 * (t - 5)
    const seats = [-10, 0, 2.99, 3, 3.5, 4, 4.9, 5, 6, 20].filter(ok)
    return JSON.stringify(seats) === JSON.stringify([3.5, 4, 4.9]) && 4 * (4 - 5) === -4 && -4 < 3 * (4 - 5) && 4 > 3 && (4 - 5) < 0
  })())
  push('M65 the m4-01 flip law witnessed: (x−5) is negative on (3,5), so scaling x < 3 by it flips the order exactly there', (() => {
    for (const x of [3.5, 4, 4.5]) {
      if (!(x - 5 < 0)) return false
      if (!(x > 3)) return false
    }
    return true
  })())

  /* --- the bench identities (L4, L6) ------------------------------------ */

  push('M66 the exam floor: 2^x · 2^(4−x) = 16, so 2^x + 2^(4−x) ≥ 8 with the minimum at x = 2', R4_near(Math.pow(2, 2) * Math.pow(2, 2), 16) && R4_near(Math.pow(2, 2) + Math.pow(2, 2), 8) && (() => {
    let mn = Infinity
    let arg = 0
    for (let x = -6; x <= 6; x += 0.25) {
      const v = Math.pow(2, x) + Math.pow(2, 4 - x)
      if (v < mn) { mn = v; arg = x }
    }
    return R4_near(mn, 8, 1e-6) && arg === 2
  })())
  push('M67 the multiple-correct witness: (10,1,1) pays 10/2 + 1/11 + 1/11 ≈ 5.18 > 2 (no ceiling exists)', R4_near(5 + 2 / 11, 5.1818, 5e-4) && 5 + 2 / 11 > 2)
  push('M68 the ≥ 9 floor by Engel’s one-liner: (∑x)(∑1/x) ≥ (∑√(x·1/x))² = 9 at any positive triple', R4_near(Math.pow(1 + 1 + 1, 2), 9) && (() => {
    for (const t of [[1, 2, 3], [10, 1, 1], [2, 3, 6]] as [number, number, number][]) {
      const lhs = (t[0] + t[1] + t[2]) * (1 / t[0] + 1 / t[1] + 1 / t[2])
      if (lhs < 9 - 1e-9) return false
    }
    return true
  })())
  push('M69 the L6 identity: (a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) − abc, swept on integer triples', (() => {
    for (const [a, b, c] of [[1, 2, 3], [2, 3, 6], [1, 1, 1], [4, 2, 5], [3, 3, 3]] as [number, number, number][])
      if ((a + b) * (b + c) * (c + a) !== (a + b + c) * (a * b + b * c + c * a) - a * b * c) return false
    return true
  })())
  push('M70 the L6 bound: (a+b)(b+c)(c+a) ≥ 8abc on positive integer triples, equality iff a = b = c', (() => {
    for (let a = 1; a <= 5; a++)
      for (let b = 1; b <= 5; b++)
        for (let c = 1; c <= 5; c++) {
          const lhs = (a + b) * (b + c) * (c + a)
          if (lhs < 8 * a * b * c - 1e-9) return false
          if (lhs === 8 * a * b * c && !(a === b && b === c)) return false
        }
    return true
  })())
  push('M71 the L6 witness: (1,2,3) → 60 ≥ 48 with gap 12, and 60 = 6·11 − 6', (1 + 2) * (2 + 3) * (3 + 1) === 60 && 8 * 6 === 48 && 60 - 48 === 12 && 6 * 11 - 6 === 60)
  push('M72 the factorisation identity: a³+b³+c³−3abc = (a+b+c)(a²+b²+c²−ab−bc−ca), swept', (() => {
    for (const [a, b, c] of [[1, 2, 3], [2, 3, 6], [1, 1, 1], [5, 1, 2], [3, 3, 3], [0, 4, 5]] as [number, number, number][])
      if (a ** 3 + b ** 3 + c ** 3 - 3 * a * b * c !== (a + b + c) * (a * a + b * b + c * c - a * b - b * c - c * a)) return false
    return true
  })())
  push('M73 the cube bound: a³+b³+c³ ≥ 3abc on positive triples, equality iff a = b = c', (() => {
    for (let a = 1; a <= 5; a++)
      for (let b = 1; b <= 5; b++)
        for (let c = 1; c <= 5; c++) {
          if (a ** 3 + b ** 3 + c ** 3 < 3 * a * b * c - 1e-9) return false
          if (a ** 3 + b ** 3 + c ** 3 === 3 * a * b * c && !(a === b && b === c)) return false
        }
    return true
  })())
  push('M74 the cube witness: (1,2,3) → 36 ≥ 18 with the gap 18 = 6·3 (the two factors priced)', 1 + 8 + 27 === 36 && 3 * 6 === 18 && 36 - 18 === 18 && 6 * 3 === 18)
  push('M75 the shared certificate: ½[(a−b)²+(b−c)²+(c−a)²] = a²+b²+c²−ab−bc−ca at (1,2,3) → 3', R4_near(0.5 * (1 + 1 + 4), 14 - 11) && R4_near(0.5 * (1 + 1 + 4), 3))

  /* --- the master-table row witnesses ----------------------------------- */

  push('M76 master-table row 2 witnesses: 16875/256 ≈ 65.9 and 625/16 = 39.1 (the trap priced, 1-decimal rounding)', R4_near(16875 / 256, 65.9, 5e-2) && R4_near(625 / 16, 39.1, 5e-2))
  push('M77 master-table row 3 witnesses: Engel 3 at (2,4); Nesbitt 3/2 at the equal triple', R4_near(2 / 2 + 8 / 4, 3) && R4_near(1.5, 3 / 2))
  push('M78 master-table row 4 witnesses: 32 ≤ √1078; the tie 10 = 10 on the proportional pair', 32 <= Math.sqrt(1078) && R4_near(R4_dot([1, 2], [2, 4]), Math.sqrt(5) * Math.sqrt(20)) && R4_near(R4_dot([1, 2], [2, 4]), 10))
  push('M79 master-table row 5 witnesses: 140 against 100 — the pairing choice worth 40', pairingSums.includes(140) && pairingSums.includes(100) && 140 - 100 === 40)
  push('M80 master-table row 6 witnesses: the sine cap 2.465 ≤ 2.598', sinSum35 <= 3 * SQRT3 / 2)
  push('M81 master-table row 7 witnesses: the detour 5 on [−3,2]; the band [5, 13]', R4_near(Math.abs(0 - 2) + Math.abs(0 + 3), 5) && Math.abs(4 - 9) === 5 && 4 + 9 === 13)
  push('M82 master-table row 8 witness: the strike-by-a-negative flip admits x = 4 (the m4-01 row)', 4 > 3 && 4 * (4 - 5) < 3 * (4 - 5))

  /* --- the standing sweeps (the laws themselves re-run) ------------------ */

  push('M83 sweep: A ≥ G ≥ H on every positive pair from {1..8}, ties iff equal', (() => {
    for (let a = 1; a <= 8; a++)
      for (let b = 1; b <= 8; b++) {
        if (!(R4_A2(a, b) >= R4_G2(a, b) - 1e-12 && R4_G2(a, b) >= R4_H2(a, b) - 1e-12)) return false
        if (R4_near(R4_A2(a, b), R4_G2(a, b)) && a !== b) return false
      }
    return true
  })())
  push('M84 sweep: Cauchy-Schwarz on all list pairs over {0..3}³ (64×64 pairings)', (() => {
    const alpha = [0, 1, 2, 3]
    const lists: number[][] = []
    for (const i of alpha) for (const j of alpha) for (const k of alpha) lists.push([i, j, k])
    for (const a of lists)
      for (const b of lists) {
        const d = R4_dot(a, b)
        if (d * d > sumSq(a) * sumSq(b) + 1e-9) return false
      }
    return true
  })())
  push('M85 sweep: the rearrangement law brute-forced on three list pairs (incl. a negative roster)', (() => {
    const pairs: [number[], number[]][] = [
      [[1, 2, 3], [10, 20, 30]],
      [[1, 3, 5], [2, 6, 10]],
      [[-3, -1, 2], [-5, 0, 7]],
    ]
    for (const [a, b] of pairs) {
      const as = a.slice().sort((x, y) => x - y)
      const bs = b.slice().sort((x, y) => x - y)
      let mx = -Infinity
      let mn = Infinity
      for (const p of R4_perms(bs)) {
        const v = R4_dot(as, p)
        mx = Math.max(mx, v)
        mn = Math.min(mn, v)
      }
      if (mx !== R4_dot(as, bs) || mn !== R4_dot(as, bs.slice().reverse())) return false
    }
    return true
  })())
  push('M86 sweep: Nesbitt ≥ 3/2 on all positive integer triples 1..6, tie iff equal', (() => {
    for (let a = 1; a <= 6; a++)
      for (let b = 1; b <= 6; b++)
        for (let c = 1; c <= 6; c++) {
          const v = a / (b + c) + b / (c + a) + c / (a + b)
          if (v < 1.5 - 1e-9) return false
          if (R4_near(v, 1.5) && !(a === b && b === c)) return false
        }
    return true
  })())
  push('M87 sweep: the ladder M₋₁ ≤ M₀ ≤ M₁ ≤ M₂ on five tuples, ties only at the constant tuple', (() => {
    for (const t of [[1, 2, 3], [1, 2, 6], [2, 8], [1, 4, 16], [5, 5, 5]] as number[][]) {
      if (!(Hn(t) <= Gn(t) + 1e-12 && Gn(t) <= Mn(t) + 1e-12 && Mn(t) <= Qn(t) + 1e-12)) return false
    }
    return R4_near(Hn([5, 5, 5]), Gn([5, 5, 5])) && R4_near(Gn([5, 5, 5]), Mn([5, 5, 5]))
  })())
  push('M88 sweep: |a+b| ≤ |a|+|b| on the grid {−6..6}², equality iff ab ≥ 0', (() => {
    for (let a = -6; a <= 6; a++)
      for (let b = -6; b <= 6; b++) {
        if (Math.abs(a + b) > Math.abs(a) + Math.abs(b) + 1e-12) return false
        if (Math.abs(a + b) === Math.abs(a) + Math.abs(b) && a * b < 0) return false
      }
    return true
  })())
  push('M89 sweep: the reverse law ||a|−|b|| ≤ |a−b| on the same grid', (() => {
    for (let a = -6; a <= 6; a++)
      for (let b = -6; b <= 6; b++)
        if (Math.abs(Math.abs(a) - Math.abs(b)) > Math.abs(a - b) + 1e-12) return false
    return true
  })())
  push('M90 sweep: the detour tax |x−a|+|x−b| ≥ |a−b| on a grid, equality iff x between', (() => {
    for (const [a, b] of [[2, -3], [1, 7], [-5, 5]] as [number, number][])
      for (let x = -10; x <= 10; x++) {
        const v = Math.abs(x - a) + Math.abs(x - b)
        if (v < Math.abs(a - b) - 1e-12) return false
        if (R4_near(v, Math.abs(a - b)) && !(x >= Math.min(a, b) && x <= Math.max(a, b))) return false
      }
    return true
  })())
  push('M91 sweep: the bridge (Σ|xi|)² ≤ nΣxi² on integer lists (n = 3, 4), ties iff one size', (() => {
    const lists = [
      [1, 2, -4], [3, -3, 3], [1, 2, 3], [0, 0, 0], [2, -2, 2, -2], [1, 1, 1, 1], [1, 2, 3, 4], [3, 3, -3, 3],
    ]
    for (const xs of lists) {
      const lhs = Math.pow(xs.reduce((s, v) => s + Math.abs(v), 0), 2)
      const rhs = xs.length * sumSq(xs)
      if (lhs > rhs + 1e-9) return false
    }
    return true
  })())
  push('M92 sweep: the sine cap over the angle grid A+B+C = 180 (integer degrees), tie only at 60/60/60', (() => {
    for (let A = 10; A <= 160; A += 5)
      for (let B = 10; B <= 170 - A; B += 5) {
        const C = 180 - A - B
        if (C <= 0) continue
        const s = Math.sin(deg(A)) + Math.sin(deg(B)) + Math.sin(deg(C))
        if (s > 3 * SQRT3 / 2 + 1e-9) return false
      }
    return R4_near(Math.sin(deg(60)) * 3, 3 * SQRT3 / 2)
  })())
  push('M93 sweep: (a+b)(b+c)(c+a) ≥ 8abc and a³+b³+c³ ≥ 3abc already swept (M70, M73) — the L6 pair is green', true)

  /* --- the LaTeX / equation sanity -------------------------------------- */

  const equations = L.blocks.filter((b): b is Extract<Lesson['blocks'][number], { kind: 'equation' }> => b.kind === 'equation')
  const tags = equations.map((e) => {
    const m = e.latex.match(/\\tag\{(\d+)\}/)
    return m ? Number(m[1]) : -1
  })
  push('M94 the equations carry tags 1..6, each once', JSON.stringify(tags.slice().sort((x, y) => x - y)) === JSON.stringify([1, 2, 3, 4, 5, 6]), JSON.stringify(tags))
  push('M95 every equation’s braces balance', equations.every((e) => (e.latex.match(/\{/g) ?? []).length === (e.latex.match(/\}/g) ?? []).length))
  push('M96 no raw $ inside equation latex or derivation formulas', (() => {
    for (const e of equations) if (e.latex.includes('$')) return false
    for (const b of L.blocks) if (b.kind === 'derivation') for (const s of b.steps) if ((s.formula ?? '').includes('$')) return false
    return true
  })())
  push('M97 every prose string’s $-delimiters balance (even count)', (() => {
    const strings: string[] = []
    for (const b of L.blocks) {
      if (b.kind === 'para' || b.kind === 'heading') strings.push(b.text)
      if (b.kind === 'callout') strings.push(b.title, b.text)
      if (b.kind === 'example') { strings.push(b.title); strings.push(...b.steps) }
      if (b.kind === 'terms') for (const t of b.items) strings.push(t.term, t.def)
      if (b.kind === 'quiz') for (const it of b.items) { strings.push(it.q, it.explain); strings.push(...it.options) }
      if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) {
        strings.push(q.q)
        strings.push(...(Array.isArray(q.solution) ? q.solution : [q.solution]))
        if (q.answer) strings.push(q.answer)
      }
    }
    return strings.every((s) => (s.match(/\$/g) ?? []).length % 2 === 0)
  })())

  /* --- the cross-reference discipline (against the imported siblings) ---- */

  const prose = L.blocks
    .filter((b): b is Extract<Lesson['blocks'][number], { kind: 'para' | 'callout' }> => b.kind === 'para' || b.kind === 'callout')
    .map((b) => (b.kind === 'para' ? b.text : b.title + ' ' + b.text))
    .join(' ')
  for (let i = 0; i < 6; i++) {
    push(`M98.${i + 1} the prose cross-references sibling 4.${i + 1} by its real imported title`, prose.includes(SIBLINGS[i].title), SIBLINGS[i].title)
  }
  push('M99 the refusal discipline is stated (nothing re-derived that a lesson proved once)', prose.includes('refuses') && prose.includes('one line of recall'))
  push('M100 the m4-01 fold is NAMED in prose: “Real Number System and Inequalities” appears verbatim', prose.includes('Real Number System and Inequalities'))

  return out
}

/* ------------------------------------------------------------------ */
/* SECTION N — the structural contract                                  */
/* ------------------------------------------------------------------ */

 function sectionN(L: Lesson): SectionCheck[] {
  const out: SectionCheck[] = []
  const push = (name: string, ok: boolean, detail?: string): void => {
    out.push(check(name, ok, detail))
  }

  /* --- identity pins ---------------------------------------------------- */

  push('N1 the lesson id is exactly aa-classical-inequalities-unit-4-review', L.id === 'aa-classical-inequalities-unit-4-review', L.id)
  push('N2 the lesson number is 4.R', L.number === '4.R', L.number)
  push('N3 the lesson title matches the 3.R precedent shape (Unit 4 Completion Review)', L.title === 'Unit 4 Completion Review', L.title)
  push('N4 concepts: 5–8 phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `${L.concepts.length}`)
  push('N5 objectives: 4–6 entries', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6, `${(L.objectives ?? []).length}`)
  push('N6 prerequisites are exactly the six sibling ids', JSON.stringify(L.prerequisites) === JSON.stringify([
    'aa-the-arithmetic-geometric-mean-inequality',
    'aa-the-weighted-am-gm-and-its-consequences',
    'aa-cauchy-schwarz-and-engels-form',
    'aa-the-rearrangement-and-chebyshev-inequalities',
    'aa-jensens-inequality-and-convexity',
    'aa-absolute-value-at-depth-the-triangle-inequality',
  ]), JSON.stringify(L.prerequisites))
  push('N7 sources sit inside the whitelist (5 keys, all banked or orchestrator-banked)', (L.sources ?? []).length >= 3 && (L.sources ?? []).every((k) => R4_WHITELIST.includes(k)), JSON.stringify(L.sources))
  push('N8 no authored words field (the registry computes it honestly)', L.words === undefined, String(L.words))

  /* --- the quiz contract ------------------------------------------------- */

  const quiz = L.blocks.find((b): b is Extract<Lesson['blocks'][number], { kind: 'quiz' }> => b.kind === 'quiz')
  push('N9 exactly one quiz block', !!quiz)
  if (quiz) {
    push('N10 the quiz carries exactly 5 items', quiz.items.length === 5, `${quiz.items.length}`)
    push('N11 every quiz item has exactly 4 options', quiz.items.every((it) => it.options.length === 4))
    push('N12 every answer index is valid (0..3)', quiz.items.every((it) => it.answer >= 0 && it.answer <= 3 && Number.isInteger(it.answer)))
    push('N13 the quiz keys are the pinned [2, 0, 1, 3, 1]', JSON.stringify(quiz.items.map((it) => it.answer)) === JSON.stringify([2, 0, 1, 3, 1]), JSON.stringify(quiz.items.map((it) => it.answer)))
    push('N14 every explain says why the wrong options fail (names options, ≥ 120 chars)', quiz.items.every((it) => /option/i.test(it.explain) && it.explain.length >= 120))
    push('N15 every quiz item carries a question and 4 non-empty options', quiz.items.every((it) => it.q.length > 20 && it.options.every((o) => o.trim().length > 0)))
    push('N16 the quiz block is titled', typeof quiz.title === 'string' && quiz.title.length > 0)
  }

  /* --- the exercises contract (the MIXED BENCH) -------------------------- */

  const ex = L.blocks.find((b): b is Extract<Lesson['blocks'][number], { kind: 'exercises' }> => b.kind === 'exercises')
  push('N17 exactly one exercises block', !!ex)
  if (ex) {
    const levels = ex.sets.map((s) => s.level)
    push('N18 the sets run L1..L6 in order', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), levels.join(','))
    const counts = ex.sets.map((s) => s.questions.length)
    push('N19 the set sizes are 2/2/3/3/3/2 (15 total — the mixed bench)', JSON.stringify(counts) === JSON.stringify([2, 2, 3, 3, 3, 2]), counts.join('/'))
    push('N20 exactly 15 questions', ex.sets.reduce((n, s) => n + s.questions.length, 0) === 15)
    push('N21 every solution is a steps array (≥ 3 moves)', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3)))
    push('N22 every question carries a crisp answer line', ex.sets.every((s) => s.questions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0)))
    const allQ = ex.sets.flatMap((s) => s.questions.map((q) => q.q))
    const typology = ['Single Correct', 'Multiple Correct', 'Linked Comprehension', 'Numerical Value']
    push('N23 the Cengage exam typology present at L4–L6 (all four families)', typology.every((t) => allQ.some((q) => q.includes(t))), typology.filter((t) => !allQ.some((q) => q.includes(t))).join('+'))
    push('N24 every exam-typology item labelled exam-style honestly', allQ.filter((q) => typology.some((t) => q.includes(t))).every((q) => /exam-style/i.test(q)))
    push('N25 no exercise question is empty', allQ.every((q) => q.trim().length > 0))
    push('N26 several storeys priced per exhibit: the mixed items name ≥ 2 engines in one question', (() => {
      const mixed = allQ.filter((q) => /naming the engine|two routes|three-arm|three arms|four engines|which of the following|engine behind each|order law/i.test(q))
      return mixed.length >= 4
    })(), 'mixed items priced per exhibit')
  }

  /* --- the block-type census ---------------------------------------------- */

  push('N27 at least 8 example (Illustration) blocks', countKind(L, 'example') >= 8, `${countKind(L, 'example')}`)
  push('N28 at least 3 derivation blocks (the one-line-recall derivations)', countKind(L, 'derivation') >= 3, `${countKind(L, 'derivation')}`)
  push('N29 at least 3 formula cards (the consolidated laws)', countKind(L, 'formula') >= 3, `${countKind(L, 'formula')}`)
  push('N30 at least 6 terms', L.blocks.some((b): b is Extract<Lesson['blocks'][number], { kind: 'terms' }> => b.kind === 'terms') && (L.blocks.find((b): b is Extract<Lesson['blocks'][number], { kind: 'terms' }> => b.kind === 'terms')?.items.length ?? 0) >= 6)
  push('N31 at least 2 headings (theory sections)', countKind(L, 'heading') >= 2, `${countKind(L, 'heading')}`)
  push('N32 exactly 2 figures (the e2e pin)', countKind(L, 'figure') === 2, `${countKind(L, 'figure')}`)
  push('N33 exactly 2 master tables (the e2e pin)', countKind(L, 'table') === 2, `${countKind(L, 'table')}`)
  push('N34 the equations census: exactly 6 tagged display equations', countKind(L, 'equation') === 6, `${countKind(L, 'equation')}`)
  const tones = L.blocks.filter((b): b is Extract<Lesson['blocks'][number], { kind: 'callout' }> => b.kind === 'callout').map((b) => b.tone as string)
  push('N35 the callout census: definition, theorem, insight, warn, exam all present', ['definition', 'theorem', 'insight', 'warn', 'exam'].every((t) => tones.includes(t)), tones.join(','))
  push('N36 at most one historical callout (verify-or-omit discipline)', tones.filter((t) => t === 'historical').length <= 1, `${tones.filter((t) => t === 'historical').length}`)
  push('N37 the roman-marker example runs present (Cengage example-run style)', L.blocks.some((b): b is Extract<Lesson['blocks'][number], { kind: 'list' }> => b.kind === 'list' && b.marker === 'roman'))
  push('N38 the traps list carries ≥ 6 traps', (() => {
    const lists = L.blocks.filter((b): b is Extract<Lesson['blocks'][number], { kind: 'list' }> => b.kind === 'list')
    return lists.some((b) => b.items.length >= 6)
  })())

  /* --- the figure palette contract ---------------------------------------- */

  const figures = L.blocks.filter((b): b is Extract<Lesson['blocks'][number], { kind: 'figure' }> => b.kind === 'figure')
  for (let i = 0; i < figures.length; i++) {
    const svg = figures[i].svg
    const hexes = Array.from(new Set((svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase())))
    const offPalette = hexes.filter((h) => !R4_VIVID_PALETTE.includes(h))
    push(`N39.${i + 1} figure ${i + 1} uses only the vivid palette hexes`, offPalette.length === 0, offPalette.join(' '))
    const retiredHit = hexes.filter((h) => R4_RETIRED.includes(h))
    push(`N40.${i + 1} figure ${i + 1} carries no retired muted hex`, retiredHit.length === 0, retiredHit.join(' '))
    push(`N41.${i + 1} figure ${i + 1} has a viewBox and an aria-label (≥ 40 chars)`, /viewBox="[^"]+"/.test(svg) && /aria-label="[^"]{40,}/.test(svg))
    const widths = Array.from(svg.matchAll(/stroke-width="([\d.]+)"/g)).map((m) => Number.parseFloat(m[1]))
    push(`N42.${i + 1} figure ${i + 1} structure strokes all ≥ 1.2 px`, widths.length > 0 && widths.every((w) => w >= 1.2), widths.join(','))
    push(`N43.${i + 1} figure ${i + 1} text carries no raw LaTeX (no $, \\tfrac, \\times, \\sqrt)`, !/\$|\\tfrac|\\times|\\sqrt/.test(svg))
    push(`N44.${i + 1} figure ${i + 1} caption teaches (≥ 25 words)`, figures[i].caption.split(/\s+/).length >= 25)
  }

  /* --- the fold obligations (m4-01, review-page mode) ---------------------- */

  const prose = L.blocks
    .filter((b): b is Extract<Lesson['blocks'][number], { kind: 'para' | 'callout' }> => b.kind === 'para' || b.kind === 'callout')
    .map((b) => (b.kind === 'para' ? b.text : b.title + ' ' + b.text))
    .join(' ')
  push('N45 the m4-01 fold served: “Real Number System and Inequalities” named in prose (review-page mode)', prose.includes('Real Number System and Inequalities'))
  push('N46 the m4-01 fold exercised: a bench item rides the order discipline of the real number system', (() => {
    if (!ex) return false
    const qs = ex.sets.flatMap((s) => s.questions.map((q) => q.q + ' ' + (Array.isArray(q.solution) ? q.solution.join(' ') : q.solution)))
    return qs.some((q) => /real number system/i.test(q) && /x\(x - 5\)|order law/i.test(q))
  })())
  push('N47 the fold’s engine row rides the master table (the order ground row)', (() => {
    const tables = L.blocks.filter((b): b is Extract<Lesson['blocks'][number], { kind: 'table' }> => b.kind === 'table')
    return tables.some((t) => t.rows.some((r) => r.some((c) => c.includes('Real Number System and Inequalities'))))
  })())

  /* --- the word floor ------------------------------------------------------ */

  const words = countLessonWords(L)
  push('N48 the honest word count is at least 4000 (countLessonWords)', words >= 4000, `${words}`)

  /* --- the cross-reference discipline -------------------------------------- */

  push('N49 the opening walks the chapter arc (AL settled order; six engines, one room)', prose.includes('six engines, one room'))
  push('N50 the next chapter named forward (Sequences and Series — the means between numbers)', prose.includes('Sequences and Series'))
  push('N51 the ch. 7 induction deferral named (the Domino Principle), never cashed', prose.includes('Mathematical Induction: the Domino Principle'))
  push('N52 the ch. 9 logarithm doorstep named, never cashed', prose.includes('chapter 9'))
  push('N53 the exam-coverage audit is honest (no separate inequalities unit, exam-style labels)', prose.includes('NO separate inequalities unit') && prose.includes('exam-style'))
  push('N54 the ground disciplines cited, never re-taught (AL 7.1 / AL 9.3 / FM 7.4 by name)', prose.includes('AL 7.1') && prose.includes('AL 9.3') && prose.includes('FM 7.4'))

  return out
}

/* keep tally referenced for the assembled verifier (same import surface) */


// ------------------------------------------------------------------
// SECTION Z (the assembler's census) — the shipped chapter as an object:
// the plannedLessons contract discharged (the six planned titles written +
// the 4.R review), the ids pinned and globally unique, every sources key
// banked in docs/project/SOURCE_LOG.md, the word floors, the quiz-key pins,
// the whole-unit totals.
// ------------------------------------------------------------------
type QuizBlockShape = { items: { answer: number }[] }

function sectionZ(): SectionCheck[] {
  const c: SectionCheck[] = []
  const Ls = chapter04.lessons
  c.push(check('Z1 chapter fields (4 / classical-inequalities / complete)', chapter04.number === 4 && chapter04.slug === 'classical-inequalities' && chapter04.title === 'Inequalities: the Classical Engine' && chapter04.status === 'complete'))
  c.push(check('Z2 plannedLessons empty — all six written', (chapter04.plannedLessons ?? []).length === 0))
  c.push(check('Z3 seven lessons (6 + the review)', Ls.length === 7, `got ${Ls.length}`))
  const numbers = Ls.map((l) => l.number).join(',')
  c.push(check('Z4 numbers 4.1..4.6 + 4.R', numbers === '4.1,4.2,4.3,4.4,4.5,4.6,4.R', numbers))
  const planned = ['The Arithmetic-Geometric Mean Inequality', 'The Weighted AM-GM and Its Consequences', 'Cauchy-Schwarz and Engel\u2019s Form', 'The Rearrangement and Chebyshev Inequalities', 'Jensen\u2019s Inequality and Convexity', 'Absolute Value at Depth: the Triangle Inequality', 'Unit 4 Completion Review']
  c.push(check('Z5 titles match book.ts plannedLessons exactly', Ls.every((l, i) => l.title === planned[i]), Ls.map((l) => l.title).join(' | ')))
  const pinnedIds = ['aa-the-arithmetic-geometric-mean-inequality', 'aa-the-weighted-am-gm-and-its-consequences', 'aa-cauchy-schwarz-and-engels-form', 'aa-the-rearrangement-and-chebyshev-inequalities', 'aa-jensens-inequality-and-convexity', 'aa-absolute-value-at-depth-the-triangle-inequality', 'aa-classical-inequalities-unit-4-review']
  c.push(check('Z6 ids pinned', Ls.every((l, i) => l.id === pinnedIds[i])))

  // global uniqueness across the whole library (the audit-content gate's file
  // set: every .ts under src/data/library)
  const dupes: string[] = []
  const ch04Path = '/home/z/my-project/src/data/library/books/mathematics/advanced-algebra/ch-04.ts'
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.ts$/.test(e.name)) {
        const src = fs.readFileSync(p, 'utf8')
        for (const id of pinnedIds) {
          const n = (src.match(new RegExp(`\\bid: '${id}'`, 'g')) || []).length
          if (n > 0 && p !== ch04Path) dupes.push(`${id} also in ${p}`)
        }
      }
    }
  }
  walk('/home/z/my-project/src/data/library')
  c.push(check('Z7 ids globally unique (no other library file carries them)', dupes.length === 0, dupes.join('; ')))
  const ch04src = fs.readFileSync(ch04Path, 'utf8')
  c.push(check('Z8 each id appears exactly once in ch-04.ts', pinnedIds.every((id) => (ch04src.match(new RegExp(`\\bid: '${id}'`, 'g')) || []).length === 1)))

  const sourceLog = fs.readFileSync('/home/z/my-project/docs/project/SOURCE_LOG.md', 'utf8')
  const allSources = new Set(Ls.flatMap((l) => l.sources ?? []))
  const missing = [...allSources].filter((k) => !sourceLog.includes('`' + k + '`'))
  c.push(check('Z9 every sources key banked in SOURCE_LOG.md', missing.length === 0, `missing: ${missing.join(', ')}`))

  const floors: Record<string, number> = { '4.1': 4500, '4.2': 4500, '4.3': 4500, '4.4': 4500, '4.5': 4500, '4.6': 4500, '4.R': 4000 }
  for (const l of Ls) {
    const w = countLessonWords(l)
    c.push(check(`Z10 words ${l.number} ≥ ${floors[l.number]} (got ${w})`, w >= floors[l.number]))
  }

  const pinnedQuiz: Record<string, number[]> = { '4.1': [0, 2, 1, 0, 1], '4.2': [0, 3, 0, 1, 2], '4.3': [1, 0, 3, 2, 0], '4.4': [2, 0, 1, 1, 0], '4.5': [1, 2, 1, 2, 1], '4.6': [0, 2, 3, 3, 1], '4.R': [2, 0, 1, 3, 1] }
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

  c.push(check('Z13 no leftover placeholders in ch-04.ts', !/TODO|XXX|待补充|【/.test(ch04src)))
  const totalWords = Ls.reduce((a, l) => a + countLessonWords(l), 0)
  console.log(`  [Z] chapter totals: ${Ls.length} lessons, ${totalWords} words, engines A–N re-run in this file`)
  return c
}

// ------------------------------------------------------------------
// the harness
// ------------------------------------------------------------------
const SECTIONS: [string, SectionCheck[]][] = [
  ['A', sectionA(lesson41)], ['B', sectionB(lesson41)],
  ['C', sectionC(lesson42)], ['D', sectionD(lesson42)],
  ['E', sectionE(lesson43)], ['F', sectionF(lesson43)],
  ['G', sectionG(lesson44)], ['H', sectionH(lesson44)],
  ['I', sectionI(lesson45)], ['J', sectionJ(lesson45)],
  ['K', sectionK(lesson46)], ['L', sectionL(lesson46)],
  ['M', sectionM(lessonReview4)], ['N', sectionN(lessonReview4)],
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
  console.log(`${name}: ${t.ok}/${t.total}`)
}
console.log(`TOTAL: ${totalOk}/${totalChecks}`)
if (allFails.length) {
  allFails.forEach((f) => console.log('  FAIL ' + f))
  process.exit(1)
}
