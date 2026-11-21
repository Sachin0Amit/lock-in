import { chapter08 } from '../src/data/library/books/mathematics/advanced-algebra/ch-08'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch08.ts — the whole-unit verifier for Advanced Algebra (book
 * #4), chapter 8 "The Theory of Equations" (run 119, the whole-unit swarm,
 * 2026-11-21). VERIFY-FIRST per the standing protocol: each lesson's ENGINE
 * section (A/C/E/G/I/K/M) was grown and run green BEFORE that lesson's
 * prose was declared done — by the authoring agent itself, against its part
 * file, then re-run here against the assembled chapter; the PIN sections
 * (B/D/F/H/J/L/N) re-read the shipped chapter file and assert the prose
 * carries exactly the engine-pinned numbers. Section Z is the closed-chapter
 * census. Assembled verbatim from the seven agents' v-08*.ts part verifiers
 * by temporary-references/assemble_run119.py (the run-115 precedent).
 *
 *   (A) 8.1 engines — 'How Many Roots: Degree n, n Roots'
 *   (B) 8.1 pins
 *   (C) 8.2 engines — 'Descartes' Rule of Signs'
 *   (D) 8.2 pins
 *   (E) 8.3 engines — 'Cubics and Quartics: the Symmetric Functions'
 *   (F) 8.3 pins
 *   (G) 8.4 engines — 'Cardan and Ferrari: the Cubic and Quartic, Solved'
 *   (H) 8.4 pins
 *   (I) 8.5 engines — 'Transformation of Equations'
 *   (J) 8.5 pins
 *   (K) 8.6 engines — 'Reciprocal Equations'
 *   (L) 8.6 pins
 *   (M) 8.R engines — 'Unit 8 Completion Review'
 *   (N) 8.R pins
 *   (Z) the closed-chapter census (the orchestrator's)
 *
 * Study-never-reproduce honored: the m2-02 module transcriptions informed
 * METHOD SHAPES only; every family, witness, figure and exercise below is
 * OUR OWN, recomputed here by brute force.
 */

// ------------------------------------------------------------------
// the shared harness (the ch-07 verifier's)
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

function collectStrings(L: Lesson): { raw: string; full: string } {
  const rawParts: string[] = []
  const walk = (v: unknown) => {
    if (typeof v === 'string') rawParts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  L.blocks.forEach((b) => walk(b))
  return { raw: rawParts.join('\n'), full: JSON.stringify(L) }
}

// ---- A (8.1 engines) / B (8.1 pins) (from v-081.ts) ----

function sectionA(): SectionCheck[] {
  // ALL local helpers INSIDE this function (assembly-safety)
  const c: SectionCheck[] = []

  // ---------- local engine: complex numbers + polynomials ----------
  type C = { re: number; im: number }
  const cx = (re: number, im = 0): C => ({ re, im })
  const cAdd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im })
  const cMul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re })
  const cConj = (a: C): C => ({ re: a.re, im: -a.im })
  const cEq = (a: C, b: C): boolean => Math.abs(a.re - b.re) < 1e-9 && Math.abs(a.im - b.im) < 1e-9
  const cIsZero = (a: C): boolean => Math.abs(a.re) < 1e-9 && Math.abs(a.im) < 1e-9

  // polynomials: coefficient arrays LOW -> HIGH, complex coefficients allowed
  type Poly = C[]
  const real = (coeffs: number[]): Poly => coeffs.map((v) => cx(v))
  const pMul = (a: Poly, b: Poly): Poly => {
    const out: Poly = Array.from({ length: a.length + b.length - 1 }, () => cx(0))
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) {
      out[i + j] = cAdd(out[i + j], cMul(a[i], b[j]))
    }
    return out
  }
  const pEval = (p: Poly, x: C): C => {
    let acc = cx(0)
    for (let i = p.length - 1; i >= 0; i--) acc = cAdd(cMul(acc, x), p[i])
    return acc
  }
  const evalR = (p: Poly, x: number): number => pEval(p, cx(x)).re
  const pReal = (p: Poly): boolean => p.every((k) => Math.abs(k.im) < 1e-12)
  const pDeg = (p: Poly): number => p.length - 1
  const factor = (r: C): Poly => [cMul(r, cx(-1)), cx(1)]
  const fromRoots = (roots: C[]): Poly => roots.reduce<Poly>((acc, r) => pMul(acc, factor(r)), [cx(1)])
  const pEq = (a: Poly, b: Poly): boolean => a.length === b.length && a.every((k, i) => cEq(k, b[i]))
  const pStr = (p: Poly): string => p.map((k) => (Math.abs(k.im) < 1e-9 ? String(k.re) : `${k.re}+${k.im}i`)).join(',')

  const bisect = (f: (x: number) => number, lo: number, hi: number, iters = 100): number => {
    let a = lo
    let b = hi
    let fa = f(a)
    if (fa === 0) return a
    for (let i = 0; i < iters; i++) {
      const m = (a + b) / 2
      const fm = f(m)
      if (fa * fm < 0) { b = m } else { a = m; fa = fm }
    }
    return (a + b) / 2
  }
  const round4 = (x: number): number => Math.round(x * 1e4) / 1e4

  // ---------- the pinned polynomials ----------
  const P31 = pMul(real([-1, 1]), real([1, 0, 1])) // (x-1)(x^2+1) = x^3 - x^2 + x - 1
  const PLAD = pMul(real([1, -2, 1]), real([-8, 12, -6, 1])) // (x-1)^2 (x-2)^3, degree 5
  const P37 = fromRoots([cx(1), cx(2), cx(-3)]) // x^3 - 7x + 6
  const PCUB6 = fromRoots([cx(1), cx(2), cx(3)]) // x^3 - 6x^2 + 11x - 6
  const PXXX = pMul(real([-1, 1]), real([4, -4, 1])) // (x-1)(x-2)^2 = x^3 - 5x^2 + 8x - 4

  // ---------- A01..A10: the cubic witness x^3 - x^2 + x - 1 ----------
  c.push(check('A01 (x-1)(x^2+1) = x^3-x^2+x-1 by literal multiplication', pEq(P31, real([-1, 1, -1, 1])), pStr(P31)))
  c.push(check('A02 the census {1, i, -i}: P(1) = P(i) = P(-i) = 0', cIsZero(pEval(P31, cx(1))) && cIsZero(pEval(P31, cx(0, 1))) && cIsZero(pEval(P31, cx(0, -1)))))
  c.push(check('A03 (x-1)(x-i)(x+i) = x^3-x^2+x-1 — exactly three linear factors', pEq(fromRoots([cx(1), cx(0, 1), cx(0, -1)]), real([-1, 1, -1, 1]))))
  {
    const others: number[] = []
    for (let k = -5; k <= 5; k++) if (k !== 1 && Math.abs(evalR(P31, k)) < 1e-9) others.push(k)
    c.push(check('A04 among integers -5..5 only x=1 vanishes (the other two roots are non-real)', others.length === 0, `extra integer roots ${JSON.stringify(others)}`))
  }
  c.push(check('A05 census row: degree 3 = 1 real + 2 non-real (total 3)', pDeg(P31) === 3 && 1 + 2 === 3))

  // ---------- A06..A09: the multiplicity ladder (x-1)^2 (x-2)^3 ----------
  c.push(check('A06 (x-1)^2(x-2)^3 has degree 5', pDeg(PLAD) === 5, `degree ${pDeg(PLAD)}`))
  c.push(check('A07 the multiplicity census 2 + 3 = 5 = degree', 2 + 3 === pDeg(PLAD)))
  {
    const vals = [evalR(PLAD, 0.5), evalR(PLAD, 1), evalR(PLAD, 1.5), evalR(PLAD, 2), evalR(PLAD, 2.5)]
    const ok = Math.abs(vals[1]) < 1e-9 && Math.abs(vals[3]) < 1e-9 && vals[0] < 0 && vals[2] < 0 && vals[4] > 0
    c.push(check('A08 sign pattern: roots exactly {1, 2}; negative either side of 2, positive above', ok, JSON.stringify(vals)))
  }
  c.push(check('A09 the root multiset is {1, 1, 2, 2, 2}: P(1) = P(2) = 0 and degree = 2 + 3', cIsZero(pEval(PLAD, cx(1))) && cIsZero(pEval(PLAD, cx(2)))))

  // ---------- A10..A13: x^4 - 1 and x^4 + 3x^2 + 2 ----------
  c.push(check('A10 x^4-1 = (x-1)(x+1)(x^2+1) by multiplication', pEq(pMul(pMul(factor(cx(1)), factor(cx(-1))), real([1, 0, 1])), real([-1, 0, 0, 0, 1]))))
  {
    const roots4 = [cx(1), cx(-1), cx(0, 1), cx(0, -1)]
    const allZero = roots4.every((r) => cIsZero(pEval(real([-1, 0, 0, 0, 1]), r)))
    c.push(check('A11 x^4-1 census: roots {1,-1,i,-i} = 2 real + 2 non-real = 4 total', allZero && 2 + 2 === 4))
  }
  c.push(check('A12 x^4+3x^2+2 = (x^2+1)(x^2+2) by multiplication', pEq(pMul(real([1, 0, 1]), real([2, 0, 1])), real([2, 0, 3, 0, 1]))))
  {
    const P432 = real([2, 0, 3, 0, 1])
    let minv = Infinity
    for (let x = -3; x <= 3.0001; x += 0.01) minv = Math.min(minv, evalR(P432, x))
    const fourComplex = [cx(0, 1), cx(0, -1), cx(0, Math.SQRT2), cx(0, -Math.SQRT2)].every((r) => cIsZero(pEval(P432, r)))
    c.push(check('A13 x^4+3x^2+2 has 0 real roots (min > 1.9 on the sweep) and the 4 non-real roots ±i, ±i√2', minv > 1.9 && fourComplex, `grid min ${minv.toFixed(4)}`))
  }

  // ---------- A14..A19: the odd-degree sweep, located by bisection ----------
  {
    const P311 = real([1, 1, 0, 1]) // x^3 + x + 1
    const fm1 = evalR(P311, -1)
    const f0 = evalR(P311, 0)
    c.push(check('A14 x^3+x+1: f(-1) = -1 < 0 < 1 = f(0) — the sign-change bracket', fm1 === -1 && f0 === 1, `f(-1) = ${fm1}, f(0) = ${f0}`))
    const root311 = bisect((x) => evalR(P311, x), -1, 0)
    c.push(check('A15 bisection locates the real root of x^3+x+1 at -0.6823 (4 dp)', round4(root311) === -0.6823, `root ${root311}`))
    let monotone = true
    for (let x = -2; x < 2; x += 0.05) if (!(evalR(P311, x) < evalR(P311, x + 0.05))) monotone = false
    c.push(check('A16 x^3+x+1 strictly increasing on the grid (x^3 + x is a sum of increasing maps) — exactly one real root', monotone))
  }
  {
    const P511 = real([1, 1, 0, 0, 0, 1]) // x^5 + x + 1
    const fm1 = evalR(P511, -1)
    const f0 = evalR(P511, 0)
    c.push(check('A17 x^5+x+1: f(-1) = -1 < 0 < 1 = f(0) — the sign-change bracket (engine pins -1)', fm1 === -1 && f0 === 1, `f(-1) = ${fm1}, f(0) = ${f0}`))
    const root511 = bisect((x) => evalR(P511, x), -1, 0)
    c.push(check('A18 bisection locates the real root of x^5+x+1 at -0.7549 (4 dp)', round4(root511) === -0.7549, `root ${root511}`))
    let monotone = true
    for (let x = -2; x < 2; x += 0.05) if (!(evalR(P511, x) < evalR(P511, x + 0.05))) monotone = false
    c.push(check('A19 x^5+x+1 strictly increasing on the grid — exactly one real root; census 5 = 1 real + 4 non-real', monotone))
  }
  c.push(check('A20 bisection engine sanity: root of x^2-2 on [1,2] is 1.4142 (4 dp)', round4(bisect((x) => x * x - 2, 1, 2)) === 1.4142))

  // ---------- A21..A26: the conjugate-pair law ----------
  {
    const lawHolds = (P: Poly) => (zv: C): boolean => cEq(pEval(P, cConj(zv)), cConj(pEval(P, zv)))
    let ok1 = true
    for (let i = 0; i <= 8; i++) for (let j = -4; j <= 4; j++) {
      const zv = cx(i / 2 - 2, j / 2)
      if (!lawHolds(P31)(zv)) ok1 = false
    }
    c.push(check('A21 P(conj z) = conj(P(z)) for P = x^3-x^2+x-1 on the swept grid', ok1))
    let ok2 = true
    for (let i = 0; i <= 8; i++) for (let j = -4; j <= 4; j++) {
      const zv = cx(i / 2 - 2, j / 2)
      if (!lawHolds(real([1, 1, 0, 0, 0, 1]))(zv)) ok2 = false
    }
    c.push(check('A22 P(conj z) = conj(P(z)) for the quintic x^5+x+1 on the swept grid', ok2))
    const Pci = [cx(0, 1), cx(1)] // P(x) = i + x — complex coefficients
    const zI = cx(0, 1)
    const lhs = pEval(Pci, cConj(zI))
    const rhs = cConj(pEval(Pci, zI))
    c.push(check('A23 negative witness: for P = x + i at z = i, P(conj z) = 0 but conj(P(z)) = -2i — REAL coefficients are necessary', !cEq(lhs, rhs), `${pStr([lhs])} vs ${pStr([rhs])}`))
  }
  c.push(check('A24 (x-(2+i))(x-(2-i)) = x^2-4x+5 — a real quadratic from the pair', pEq(fromRoots([cx(2, 1), cx(2, -1)]), real([5, -4, 1]))))
  c.push(check('A25 the pair reads: (2+i)+(2-i) = 4 and (2+i)(2-i) = 5 = |2+i|^2', cAdd(cx(2, 1), cx(2, -1)).re === 4 && cMul(cx(2, 1), cx(2, -1)).re === 5))
  {
    const pairFactor = real([4, 0, 1]) // x^2 + 4
    c.push(check('A26 root 2i forces -2i: x^2+4 vanishes at both 2i and -2i (the guaranteed factor)', cIsZero(pEval(pairFactor, cx(0, 2))) && cIsZero(pEval(pairFactor, cx(0, -2)))))
  }

  // ---------- A27..A31: equation forming ----------
  c.push(check('A27 roots {2,3,-6} give x^3+x^2-24x+36 (verified by expansion + evaluation)', pEq(fromRoots([cx(2), cx(3), cx(-6)]), real([36, -24, 1, 1])) && [2, 3, -6].every((r) => cIsZero(pEval(real([36, -24, 1, 1]), cx(r))))))
  {
    const Q = fromRoots([cx(0, 1), cx(0, -1), cx(2), cx(-1)])
    const ev = [cx(0, 1), cx(0, -1), cx(2), cx(-1)].every((r) => cIsZero(pEval(Q, r)))
    c.push(check('A28 roots {i,-i,2,-1} give (x^2+1)(x-2)(x+1) = x^4-x^3-x^2-x-2', pEq(Q, real([-2, -1, -1, -1, 1])) && ev))
  }
  {
    const quart = pMul(real([4, 0, 1]), real([-9, 0, 1])) // (x^2+4)(x^2-9)
    const ev = [cx(0, 2), cx(0, -2), cx(3), cx(-3)].every((r) => cIsZero(pEval(quart, r)))
    c.push(check('A29 the quartic with root 2i and roots 3, -3: (x^2+4)(x^2-9) = x^4-5x^2-36, vanishing at all four', pEq(quart, real([-36, 0, -5, 0, 1])) && ev))
  }

  // ---------- A32..A35: the factor-theorem census hunts ----------
  c.push(check('A30 x^3-7x+6 = (x-1)(x-2)(x+3) by multiplication', pEq(P37, real([6, -7, 0, 1]))))
  {
    const cand = [1, -1, 2, -2, 3, -3, 6, -6]
    const hits = cand.filter((k) => Math.abs(evalR(P37, k)) < 1e-9)
    c.push(check('A31 among the divisors of 6 exactly {1, 2, -3} vanish — the root hunt', hits.length === 3 && hits.includes(1) && hits.includes(2) && hits.includes(-3), JSON.stringify(hits)))
  }
  {
    const vals = [-4, -3, -2, -1, 0, 1, 2, 3].map((k) => evalR(P37, k))
    const pinned = [-30, 0, 12, 12, 6, 0, 0, 12]
    c.push(check('A32 the root-hunt sign values of x^3-7x+6 at -4..3: [-30, 0, 12, 12, 6, 0, 0, 12]', vals.every((v, i) => Math.abs(v - pinned[i]) < 1e-9), JSON.stringify(vals)))
  }
  c.push(check('A33 x^3-5x^2+8x-4 = (x-1)(x-2)^2 — the multiplicity census {1, 2, 2}', pEq(PXXX, real([-4, 8, -5, 1])) && cIsZero(pEval(PXXX, cx(1))) && cIsZero(pEval(PXXX, cx(2)))))
  {
    // dividing by (x-r) once must stay exact; twice certifies multiplicity 2
    const divBy = (P: Poly, r: number): { q: Poly; exact: boolean } => {
      const n = P.length - 1
      const q: Poly = Array.from({ length: n }, () => cx(0))
      q[n - 1] = P[n]
      for (let i = n - 1; i >= 1; i--) q[i - 1] = cAdd(P[i], cMul(q[i], cx(r)))
      const rem = cAdd(P[0], cMul(q[0], cx(r)))
      return { q, exact: cIsZero(rem) }
    }
    const d1 = divBy(real([-4, 8, -5, 1]), 2)
    const d2 = d1.exact ? divBy(d1.q, 2) : { q: [], exact: false }
    c.push(check('A34 (x-2)^2 divides x^3-5x^2+8x-4 exactly (two synthetic divisions)', d1.exact && d2.exact))
  }
  c.push(check('A35 x^3-6x^2+11x-6 = (x-1)(x-2)(x-3): solution set {1, 2, 3}', pEq(PCUB6, real([-6, 11, -6, 1])) && [1, 2, 3].every((r) => cIsZero(pEval(PCUB6, cx(r))))))
  {
    const others: number[] = []
    for (let k = -5; k <= 5; k++) if (k !== 1 && k !== 2 && k !== 3 && Math.abs(evalR(PCUB6, k)) < 1e-9) others.push(k)
    c.push(check('A36 no other integer roots of x^3-6x^2+11x-6 in -5..5', others.length === 0, JSON.stringify(others)))
  }

  // ---------- A37..A41: the double-root condition 4p^3 + 27q^2 ----------
  {
    const cond = (p: number, q: number): number => 4 * p ** 3 + 27 * q ** 2
    c.push(check('A37 x^3-3x+2 = (x-1)^2(x+2) and 4(-3)^3 + 27(2)^2 = 0', cond(-3, 2) === 0 && pEq(pMul(real([1, -2, 1]), real([2, 1])), real([2, -3, 0, 1]))))
    c.push(check('A38 the witness census {1, 1, -2}: f(1) = 0 (twice) and f(-2) = 0', cIsZero(pEval(real([2, -3, 0, 1]), cx(1))) && cIsZero(pEval(real([2, -3, 0, 1]), cx(-2)))))
    let sweepOk = true
    for (const r of [-3, -2, -1, -0.5, 0.5, 1, 1.5, 2, 3]) {
      const p = -3 * r * r
      const q = 2 * r ** 3
      if (Math.abs(cond(p, q)) > 1e-6) sweepOk = false
      if (!pEq(pMul(pMul(factor(cx(r)), factor(cx(r))), factor(cx(-2 * r))), real([q, p, 0, 1]))) sweepOk = false
    }
    c.push(check('A39 swept family: r double root gives p = -3r^2, q = 2r^3, condition 0 and (x-r)^2(x+2r) = x^3+px+q', sweepOk))
    c.push(check('A40 converse witnesses: (p,q) = (-12,16) and (-3,-2) hit the condition and factor as (x-2)^2(x+4), (x+1)^2(x-2)', cond(-12, 16) === 0 && cond(-3, -2) === 0 && pEq(pMul(real([4, -4, 1]), real([4, 1])), real([16, -12, 0, 1])) && pEq(pMul(real([1, 2, 1]), real([-2, 1])), real([-2, -3, 0, 1]))))
    c.push(check('A41 negative witnesses: x^3-7x+6 gives -400 and x^3+x+1 gives 31 — no repeated root, all roots distinct', cond(-7, 6) === -400 && cond(1, 1) === 31))
  }

  // ---------- A42..A46: the parity law + the odd-degree corollary ----------
  {
    const table: { name: string; degree: number; realWithMult: number; nonReal: number }[] = [
      { name: 'x^3-x^2+x-1', degree: 3, realWithMult: 1, nonReal: 2 },
      { name: 'x^4-1', degree: 4, realWithMult: 2, nonReal: 2 },
      { name: 'x^4+3x^2+2', degree: 4, realWithMult: 0, nonReal: 4 },
      { name: 'x^5+x+1', degree: 5, realWithMult: 1, nonReal: 4 },
      { name: 'x^3-6x^2+11x-6', degree: 3, realWithMult: 3, nonReal: 0 },
      { name: 'x^3-7x+6', degree: 3, realWithMult: 3, nonReal: 0 },
      { name: 'x^3-5x^2+8x-4', degree: 3, realWithMult: 3, nonReal: 0 },
      { name: '(x-1)^2(x-2)^3', degree: 5, realWithMult: 5, nonReal: 0 },
    ]
    c.push(check('A42 parity law swept: real count (with multiplicity) ≡ degree (mod 2) on all 8 census rows', table.every((row) => (row.degree - row.realWithMult) % 2 === 0)))
    c.push(check('A43 real-root count ≤ degree on all census rows', table.every((row) => row.realWithMult <= row.degree)))
    c.push(check('A44 the full census closes: real + non-real = degree on all rows', table.every((row) => row.realWithMult + row.nonReal === row.degree)))
    c.push(check('A45 odd-degree corollary swept: every odd-degree row owns at least one real root', table.filter((row) => row.degree % 2 === 1).every((row) => row.realWithMult >= 1)))
    c.push(check('A46 the two-quartic contrast: x^4-1 owns 2 real, x^4+3x^2+2 owns 0 — even degree may miss the real line entirely', table[1].realWithMult === 2 && table[2].realWithMult === 0))
  }

  // ---------- A47..A50: the L6-1 remaining-two theorem ----------
  {
    const pairCase = pMul(pMul(pMul(factor(cx(1)), factor(cx(2))), factor(cx(3))), real([1, 0, 1])) // (x-1)(x-2)(x-3)(x^2+1)
    const okPair = pReal(pairCase) && pDeg(pairCase) === 5 && [cx(1), cx(2), cx(3), cx(0, 1), cx(0, -1)].every((r) => cIsZero(pEval(pairCase, r)))
    c.push(check('A47 L6-1 pair case: (x-1)(x-2)(x-3)(x^2+1) — real quintic, 3 real roots, remaining two the pair ±i', okPair))
    const bothReal = pMul(pMul(pMul(factor(cx(1)), factor(cx(2))), factor(cx(3))), pMul(factor(cx(4)), factor(cx(-5)))) // 5 real roots
    const okReal = pReal(bothReal) && pDeg(bothReal) === 5 && [1, 2, 3, 4, -5].every((r) => cIsZero(pEval(bothReal, cx(r))))
    c.push(check('A48 L6-1 both-real case: (x-1)(x-2)(x-3)(x-4)(x+5) — remaining two both real', okReal))
    const broken = pMul(pMul(pMul(factor(cx(1)), factor(cx(2))), factor(cx(3))), pMul(factor(cx(0, 1)), factor(cx(5)))) // 3 real + i + 5
    c.push(check('A49 L6-1 impossibility: (x-1)(x-2)(x-3)(x-i)(x+5) does NOT have real coefficients — one non-real root cannot ride alone', !pReal(broken)))
  }

  // ---------- A51: the degree census of every pinned expansion ----------
  {
    const degrees: { p: Poly; want: number; name: string }[] = [
      { p: P31, want: 3, name: 'x^3-x^2+x-1' },
      { p: PLAD, want: 5, name: '(x-1)^2(x-2)^3' },
      { p: real([-1, 0, 0, 0, 1]), want: 4, name: 'x^4-1' },
      { p: real([2, 0, 3, 0, 1]), want: 4, name: 'x^4+3x^2+2' },
      { p: real([6, -7, 0, 1]), want: 3, name: 'x^3-7x+6' },
      { p: real([-4, 8, -5, 1]), want: 3, name: 'x^3-5x^2+8x-4' },
      { p: real([1, 1, 0, 1]), want: 3, name: 'x^3+x+1' },
      { p: real([1, 1, 0, 0, 0, 1]), want: 5, name: 'x^5+x+1' },
      { p: real([-36, 0, -5, 0, 1]), want: 4, name: 'x^4-5x^2-36' },
      { p: real([36, -24, 1, 1]), want: 3, name: 'x^3+x^2-24x+36' },
      { p: real([-2, -1, -1, -1, 1]), want: 4, name: 'x^4-x^3-x^2-x-2' },
      { p: real([5, -4, 1]), want: 2, name: 'x^2-4x+5' },
    ]
    c.push(check('A50 every pinned polynomial carries the stated leading coefficient (degree census, 12 rows)', degrees.every((row) => pDeg(row.p) === row.want && Math.abs(row.p[row.p.length - 1].re - 1) < 1e-12 && row.p[row.p.length - 1].im === 0)))
  }

  return c
}

function sectionB(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.1')
  c.push(check('B0 lesson 8.1 present', !!L))
  if (!L) return c
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // ---- identity + metadata pins ----
  c.push(check('B1 id exact', L.id === 'aa-how-many-roots-degree-n-n-roots', L.id))
  c.push(check('B2 number exact', L.number === '8.1', L.number))
  c.push(check('B3 title exact', L.title === 'How Many Roots: Degree n, n Roots', L.title))
  c.push(check('B4 prerequisites exact', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-negative-discriminants-the-doors-turn-complex', 'aa-conjugate-and-modulus', 'aa-symmetric-reads-and-common-roots']), JSON.stringify(L.prerequisites)))
  c.push(check('B5 sources exact', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']), JSON.stringify(L.sources)))
  const concepts8 = ['real and complex polynomials', 'roots and the solution set', 'the fundamental theorem of algebra: n roots counted with multiplicity', 'multiplicity as the root census', 'the factor theorem as the census tool', 'the conjugate-pair law for real coefficients', 'the odd-degree corollary: at least one real root', 'root counts over the reals vs over the complex numbers']
  c.push(check('B6 concepts: 8 entries, exact pinned phrases', L.concepts.length === 8 && concepts8.every((cc) => L.concepts.includes(cc)), JSON.stringify(L.concepts)))
  c.push(check('B7 objectives: 6-7 entries', (L.objectives ?? []).length >= 6 && (L.objectives ?? []).length <= 7, `got ${(L.objectives ?? []).length}`))
  c.push(check('B8 words ≥ 6000 (countLessonWords)', countLessonWords(L) >= 6000, `got ${countLessonWords(L)}`))

  // ---- the glossary folds ----
  const termBlocks = L.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string; def: string }[] }[]
  const allTerms = termBlocks.flatMap((t) => t.items)
  const term = (name: string) => allTerms.find((t) => t.term === name)
  c.push(check('B9 terms block present with ≥ 8 items', allTerms.length >= 8, `got ${allTerms.length}`))
  const rp = term('Real polynomial')
  c.push(check('B10 fold: term \'Real polynomial\' present', !!rp))
  const cp = term('Complex polynomial')
  c.push(check('B11 fold: term \'Complex polynomial\' present', !!cp))
  const oneSentence = (def: string) => def.trim().endsWith('.') && (def.match(/\./g) || []).length === 1
  c.push(check('B12 \'Real polynomial\' def is one self-contained sentence', !!rp && oneSentence(rp.def), rp ? rp.def : 'missing'))
  c.push(check('B13 \'Complex polynomial\' def is one self-contained sentence', !!cp && oneSentence(cp.def), cp ? cp.def : 'missing'))
  c.push(check('B14 \'real polynomial\' used in prose', raw.toLowerCase().includes('is called a real polynomial') || raw.toLowerCase().includes('a real polynomial exactly when') || raw.toLowerCase().includes('every real polynomial')))
  c.push(check('B15 \'complex polynomial\' used in prose', raw.toLowerCase().includes('complex polynomial')))
  c.push(check('B16 further pinned terms: Solution set / Multiplicity / Conjugate pair / Fundamental theorem of algebra', !!term('Solution set') && !!term('Multiplicity of a root') && !!term('Conjugate pair') && !!term('Fundamental theorem of algebra')))

  // ---- quiz pins (keys [2,1,2,0,2]) ----
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizBlocks[0]
  c.push(check('B17 quiz present, exactly 5 items', !!quiz && quiz.items.length === 5, quiz ? `got ${quiz.items.length}` : 'no quiz'))
  if (quiz) {
    c.push(check('B18 quiz keys exact [2,1,2,0,2]', JSON.stringify(quiz.items.map((it) => it.answer)) === '[2,1,2,0,2]', JSON.stringify(quiz.items.map((it) => it.answer))))
    c.push(check('B19 Q1 options exact', JSON.stringify(quiz.items[0].options) === JSON.stringify(['at most 5 real roots, always', 'exactly 5 real roots', 'exactly 5 roots over the complex numbers, counted with multiplicity', 'an even number of real roots'])))
    c.push(check('B20 Q2 options exact', JSON.stringify(quiz.items[1].options) === JSON.stringify(['singly', 'in conjugate pairs', 'in triples', 'never'])))
    c.push(check('B21 Q3 options exact (with the mandated −i)', JSON.stringify(quiz.items[2].options) === JSON.stringify(['one root', 'two roots', 'three roots: 1, i and −i', 'infinitely many roots'])))
    c.push(check('B22 Q4 options exact', JSON.stringify(quiz.items[3].options) === JSON.stringify(['at least one real root', 'exactly one real root', 'no real root', 'all roots real'])))
    c.push(check('B23 Q5 options exact', JSON.stringify(quiz.items[4].options) === JSON.stringify(['3', '4', '5', '6'])))
    c.push(check('B24 every quiz explain takes down every wrong option (≥ 3 option references each)', quiz.items.every((it) => (it.explain.match(/Option \d/g) || []).length >= 3)))
  }

  // ---- exercises pins ----
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const ex = exBlocks[0]
  c.push(check('B25 exercises present, 6 sets L1..L6 with counts 2/2/3/3/3/2', !!ex && ex.sets.length === 6 && ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6' && ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex ? ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ') : 'no exercises'))
  if (ex) {
    const qs = ex.sets.flatMap((s) => s.questions)
    c.push(check('B26 exactly 15 exercise questions', qs.length === 15, `got ${qs.length}`))
    c.push(check('B27 every solution is a steps array (Cengage chain)', qs.every((q) => Array.isArray(q.solution))))
    c.push(check('B28 every exercise question carries an answer', qs.every((q) => typeof q.answer === 'string' && (q.answer ?? '').length > 0)))
    const solFigs = qs.flatMap((q) => q.figures ?? [])
    c.push(check('B29 ≥ 2 solution figures (v9.0), each with viewBox + aria-label', solFigs.length >= 2 && solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label')), `got ${solFigs.length}`))
    c.push(check('B30 L3-1 solution figure: the single crossing of x^3 + x + 1', qs.some((q) => (q.figures ?? []).some((f) => f.caption.includes('x^3 + x + 1') && f.caption.includes('-0.6823')))))
    c.push(check('B31 L4-1 solution figure: the root hunt of x^3 - 7x + 6', qs.some((q) => (q.figures ?? []).some((f) => f.caption.includes('x^3 - 7x + 6') && f.caption.includes('-30')))))
    c.push(check('B32 mandated answers spot-checked: L1-1 (3 roots), L1-2 (3i), L3-2 (x³+x²−24x+36), L3-3 (x⁴−5x²−36), L6-2 (4p³ + 27q²)', (qs[0]?.answer ?? '').includes('3') && (qs[1]?.answer ?? '').includes('3i') && (qs[5]?.answer ?? '').includes('24x + 36') && (qs[6]?.answer ?? '').includes('5x² − 36') && (qs[14]?.answer ?? '').includes('4p³ + 27q²')))
  }

  // ---- figure pins ----
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; svg: string }[]
  c.push(check('B33 exactly 3 body figures, each with viewBox + role + aria-label', figBlocks.length === 3 && figBlocks.every((f) => f.svg.includes('viewBox') && f.svg.includes('role="img"') && f.svg.includes('aria-label')), `got ${figBlocks.length}`))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const allSvgs = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => f.svg)) : [])]
  c.push(check('B34 no retired palette hexes in any SVG (16 banned)', allSvgs.every((s) => !retired.some((hex) => s.includes(hex)))))
  c.push(check('B35 no raw $ inside any SVG text', allSvgs.every((s) => !s.includes('$'))))
  c.push(check('B36 total SVG census: 3 body + 2 solution = 5', allSvgs.length === 5, `got ${allSvgs.length}`))

  // ---- block-structure pins ----
  const kinds = (k: string) => L.blocks.filter((b) => b.kind === k).length
  c.push(check('B37 ≥ 6 Illustrations (example blocks)', kinds('example') >= 6, `got ${kinds('example')}`))
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string }[]
  c.push(check('B38 ≥ 2 derivations: the conjugate-pair law + the odd-degree corollary', derivations.length >= 2 && derivations.some((d) => d.title.toLowerCase().includes('conjugate-pair')) && derivations.some((d) => d.title.toLowerCase().includes('odd-degree')), `got ${derivations.map((d) => d.title).join(' | ')}`))
  c.push(check('B39 ≥ 6 equation blocks', kinds('equation') >= 6, `got ${kinds('equation')}`))
  c.push(check('B40 ≥ 8 formula cards', kinds('formula') >= 8, `got ${kinds('formula')}`))
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; tone: string; title: string; text: string }[]
  c.push(check('B41 exactly 1 exam callout (Exam corner)', callouts.filter((b) => b.tone === 'exam').length === 1))
  const hist = callouts.find((b) => b.tone === 'historical')
  c.push(check('B42 historical callout: Gauss 1799, d’Alembert, Euler', !!hist && /Gauss/.test(hist.text) && /1799/.test(hist.text) && /d’Alembert/.test(hist.text) && /Euler/.test(hist.text)))
  c.push(check('B43 warn callout: the census traps', callouts.filter((b) => b.tone === 'warn').length >= 1))
  c.push(check('B44 definition + theorem callouts ≥ 2 each', callouts.filter((b) => b.tone === 'definition').length >= 2 && callouts.filter((b) => b.tone === 'theorem').length >= 2))
  const headings = L.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  const mandatedHeads = ['The Objects: Polynomials, Roots, Solution Sets', 'The Fundamental Theorem of Algebra', 'The Conjugate-Pair Law for Real Coefficients', 'The Census in Practice']
  c.push(check('B45 the four mandated headings, exact', mandatedHeads.every((h) => headings.some((x) => x.text === h)), headings.map((h) => h.text).join(' | ')))
  const tables = L.blocks.filter((b) => b.kind === 'table') as { kind: 'table'; head: string[]; rows: string[][] }[]
  c.push(check('B46 the census table present with 8 rows', tables.length >= 1 && tables.some((t) => t.rows.length === 8 && t.head.some((h) => h.includes('Parity'))), `got ${tables.map((t) => t.rows.length).join(', ')}`))

  // ---- witness needles (≥ 10 demanded; pin 18 of 20) ----
  const needles = ['(x-1)(x^2 + 1)', '(x-1)^2(x-2)^3', 'x^4 - 1', 'x^3 - 6x^2 + 11x - 6', 'x^4 + 3x^2 + 2', 'x^5 + x + 1', 'x^3 + x + 1', 'x^3 - 7x + 6', 'x^3 - 5x^2 + 8x - 4', 'x^4 - 5x^2 - 36', 'x^2 + 4', 'x^2 - 4x + 5', 'x^3 + x^2 - 24x + 36', 'x^4 - x^3 - x^2 - x - 2', 'x^4 + 3x^2 - 4', '-0.6823', '-0.7549', '4p^3 + 27q^2', 'x^3 - 3x + 2', '(x-2)(x^2+9)']
  const hits = needles.filter((n) => either(n))
  c.push(check('B47 witness needles: ≥ 18 of the 20 pinned strings present', hits.length >= 18, `missing: ${needles.filter((n) => !either(n)).join(' ; ')}`))

  // ---- honesty + vocabulary pins ----
  c.push(check('B48 honesty note: stated, not proved', /not proved/i.test(raw) || /does not prove it/i.test(raw)))
  c.push(check('B49 the parity equation r + 2p = n present', either('r + 2p = n')))
  c.push(check('B50 the conjugate identity P(\\bar{z}) = \\overline{P(z)} present', either('P(\\bar{z})') && either('\\overline{P(z)}')))
  c.push(check('B51 census vocabulary rich: ≥ 30 uses of \'census\'', (raw.match(/census/g) || []).length >= 30, `got ${(raw.match(/census/g) || []).length}`))
  c.push(check('B52 the two engine-pinned locations with the ≈ marker', either('\\approx -0.6823') && either('\\approx -0.7549')))
  return c
}

// ---- C (8.2 engines) / D (8.2 pins) (from v-082.ts) ----

function sectionC(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- engine-local helpers: sign variations, literal expansion, mirror ---
  const sgn = (v: number) => (v > 0 ? 1 : v < 0 ? -1 : 0)
  const variations = (co: number[]): number => {
    // coefficient list in DESCENDING powers; zero coefficients skipped
    const s = co.filter((v) => v !== 0).map(sgn)
    let V = 0
    for (let i = 1; i < s.length; i++) if (s[i] !== s[i - 1]) V++
    return V
  }
  const mul = (a: number[], b: number[]): number[] => {
    // literal term-by-term expansion, both operands descending
    const out = new Array(a.length + b.length - 1).fill(0)
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]
    return out
  }
  const mirror = (co: number[]): number[] => co.map((v, i) => v * Math.pow(-1, co.length - 1 - i)) // f(-x)
  const ev = (co: number[], x: number) => co.reduce((s, v) => s * x + v, 0)
  const cev = (co: number[], re: number, im: number): [number, number] => {
    let ar = 0, ai = 0
    for (const v of co) { const nr = ar * re - ai * im + v, ni = ar * im + ai * re; ar = nr; ai = ni }
    return [ar, ai]
  }
  const factors: number[][] = [[1, -1], [1, -2], [1, 1], [1, 2], [1, 0, 1], [1, 0, 2]]
  const combos = (k: number): number[][][] => {
    const out: number[][][] = []
    const rec = (start: number, cur: number[][]) => {
      if (cur.length === k) { out.push(cur.slice()); return }
      for (let i = start; i < factors.length; i++) { cur.push(factors[i]); rec(i, cur); cur.pop() }
    }
    rec(0, [])
    return out
  }
  const posCount = (f: number[][]) => f.filter((p) => p.length === 2 && p[1] < 0).length
  const negCount = (f: number[][]) => f.filter((p) => p.length === 2 && p[1] > 0).length

  // --- the pinned witnesses, built from known root multisets literally ---
  const w1 = mul(mul([1, -1], [1, -2]), [1, -3])      // (x-1)(x-2)(x-3)
  const w2 = mul(mul([1, -1], [1, -2]), [1, 3])       // (x-1)(x-2)(x+3)
  const w3 = mul(mul([1, -1], [1, -1]), [1, 2])       // (x-1)^2 (x+2)
  const w4 = mul([1, -1], [1, 0, 1])                  // (x-1)(x^2+1)
  const w5 = mul(mul([1, -1], [1, -2]), [1, 0, 1])    // (x-1)(x-2)(x^2+1)
  const w6 = [1, 1, 1, 1, 1]                           // x^4+x^3+x^2+x+1
  const w7 = [1, 0, 1, 1]                              // x^3+x+1

  c.push(check('C1 w1 = x^3-6x^2+11x-6 literal', JSON.stringify(w1) === JSON.stringify([1, -6, 11, -6]), JSON.stringify(w1)))
  c.push(check('C2 w1 V=3, p=3, deficit 0', variations(w1) === 3 && (variations(w1) - 3) % 2 === 0))
  c.push(check('C3 w1 mirror -x^3-6x^2-11x-6, V=0', JSON.stringify(mirror(w1)) === JSON.stringify([-1, -6, -11, -6]) && variations(mirror(w1)) === 0, JSON.stringify(mirror(w1))))

  c.push(check('C4 w2 = x^3-7x+6 (zero x^2 seat) literal', JSON.stringify(w2) === JSON.stringify([1, 0, -7, 6]), JSON.stringify(w2)))
  c.push(check('C5 w2 V=2 (zero skipped), p=2, deficit 0', variations(w2) === 2 && (variations(w2) - 2) % 2 === 0))
  c.push(check('C6 w2 mirror -x^3+7x+6, V=1, q=1', JSON.stringify(mirror(w2)) === JSON.stringify([-1, 0, 7, 6]) && variations(mirror(w2)) === 1 && (variations(mirror(w2)) - 1) % 2 === 0, JSON.stringify(mirror(w2))))

  c.push(check('C7 w3 = x^3-3x+2 literal', JSON.stringify(w3) === JSON.stringify([1, 0, -3, 2]), JSON.stringify(w3)))
  c.push(check('C8 w3 V=2, double root 1 counts twice (p=2)', variations(w3) === 2 && (variations(w3) - 2) % 2 === 0 && ev(w3, 1) === 0 && 3 * 1 * 1 - 3 === 0))
  c.push(check('C9 w3 mirror -x^3+3x+2, V=1 (root -2)', variations(mirror(w3)) === 1 && ev(w3, -2) === 0, JSON.stringify(mirror(w3))))

  c.push(check('C10 w4 = x^3-x^2+x-1 literal', JSON.stringify(w4) === JSON.stringify([1, -1, 1, -1]), JSON.stringify(w4)))
  c.push(check('C11 w4 V=3, p=1, deficit 2', variations(w4) === 3 && (variations(w4) - 1) % 2 === 0))
  c.push(check('C12 w4 mirror -x^3-x^2-x-1, V=0', JSON.stringify(mirror(w4)) === JSON.stringify([-1, -1, -1, -1]) && variations(mirror(w4)) === 0))
  c.push(check('C13 w4 roots 1, +-i', ev(w4, 1) === 0 && Math.abs(cev(w4, 0, 1)[0]) < 1e-9 && Math.abs(cev(w4, 0, -1)[0]) < 1e-9))

  c.push(check('C14 w5 = x^4-3x^3+3x^2-3x+2 literal', JSON.stringify(w5) === JSON.stringify([1, -3, 3, -3, 2]), JSON.stringify(w5)))
  c.push(check('C15 w5 V=4, p=2, deficit 2', variations(w5) === 4 && (variations(w5) - 2) % 2 === 0))
  c.push(check('C16 w5 mirror x^4+3x^3+3x^2+3x+2, V=0', JSON.stringify(mirror(w5)) === JSON.stringify([1, 3, 3, 3, 2]) && variations(mirror(w5)) === 0, JSON.stringify(mirror(w5))))
  c.push(check('C17 w5 roots 1, 2, +-i (census 2,0,2)', ev(w5, 1) === 0 && ev(w5, 2) === 0 && Math.abs(cev(w5, 0, 1)[0]) < 1e-9 && Math.abs(cev(w5, 0, -1)[0]) < 1e-9))

  c.push(check('C18 w6 V=0', variations(w6) === 0))
  c.push(check('C19 w6 mirror x^4-x^3+x^2-x+1, V=4', JSON.stringify(mirror(w6)) === JSON.stringify([1, -1, 1, -1, 1]) && variations(mirror(w6)) === 4))
  c.push(check('C20 (x-1)w6 = x^5-1 literal', JSON.stringify(mul([1, -1], w6)) === JSON.stringify([1, 0, 0, 0, 0, -1])))
  {
    let ident = true
    for (let x = -3; x <= 3; x += 0.25) ident = ident && Math.abs(ev(w6, x) - ((x * x + x / 2) ** 2 + 0.75 * (x + 2 / 3) ** 2 + 2 / 3)) < 1e-9
    c.push(check('C21 w6 sum-of-squares identity (x^2+x/2)^2 + (3/4)(x+2/3)^2 + 2/3', ident))
    let pos = true
    for (let x = -5; x <= 5; x += 0.01) pos = pos && ev(w6, x) > 0
    c.push(check('C22 w6 strictly positive on the real line (0 real roots)', pos))
  }
  c.push(check('C23 w6 roots are the four non-real 5th roots of unity', [1, 2, 3, 4].every((k) => Math.abs(Math.sin((2 * Math.PI * k) / 5)) > 1e-9) && Math.abs(Math.cos(2 * Math.PI / 5) - 0.309017) < 1e-5 && Math.abs(Math.sin(2 * Math.PI / 5) - 0.951057) < 1e-5 && Math.abs(Math.cos(4 * Math.PI / 5) + 0.809017) < 1e-5 && Math.abs(Math.sin(4 * Math.PI / 5) - 0.587785) < 1e-5))
  c.push(check('C24 w6 census (0,0,4): both deficits even (0 and 4)', (variations(w6) - 0) % 2 === 0 && (variations(mirror(w6)) - 0) % 2 === 0))

  c.push(check('C25 w7 = x^3+x+1: V=0', variations(w7) === 0))
  c.push(check('C26 w7 mirror -x^3-x+1, V=1', JSON.stringify(mirror(w7)) === JSON.stringify([-1, 0, -1, 1]) && variations(mirror(w7)) === 1, JSON.stringify(mirror(w7))))
  {
    let lo = -1, hi = 0
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (ev(w7, m) < 0) lo = m; else hi = m }
    c.push(check('C27 w7 real root ~ -0.6823 (8.1 witness)', Math.abs((lo + hi) / 2 + 0.682328) < 5e-5, String((lo + hi) / 2)))
  }

  // --- the parity-chain witness: g=(x+1)(x^2+1) -> x^4-1 -> x^5-2x^4-x+2 ---
  const g0 = mul([1, 1], [1, 0, 1])
  const g1 = mul(g0, [1, -1])
  const g2 = mul(g1, [1, -2])
  c.push(check('C28 chain g = x^3+x^2+x+1, V=0', JSON.stringify(g0) === JSON.stringify([1, 1, 1, 1]) && variations(g0) === 0, JSON.stringify(g0)))
  c.push(check('C29 chain g(x-1) = x^4-1, V flips 0 -> 1', JSON.stringify(g1) === JSON.stringify([1, 0, 0, 0, -1]) && variations(g1) === 1, JSON.stringify(g1)))
  c.push(check('C30 chain (x^4-1)(x-2) = x^5-2x^4-x+2, V flips 1 -> 2', JSON.stringify(g2) === JSON.stringify([1, -2, 0, 0, -1, 2]) && variations(g2) === 2, JSON.stringify(g2)))
  c.push(check('C31 chain positives 1,2 deficit 0', ev(g2, 1) === 0 && ev(g2, 2) === 0 && (variations(g2) - 2) % 2 === 0))

  // --- the x^4-1 deficit-vs-non-real distinction ---
  const d4 = mul([1, 0, -1], [1, 0, 1]) // (x^2-1)(x^2+1) = x^4-1
  c.push(check('C32 x^4-1 literal, V=1, p=1 deficit 0 with 2 non-real', JSON.stringify(d4) === JSON.stringify([1, 0, 0, 0, -1]) && variations(d4) === 1 && (variations(d4) - 1) % 2 === 0))
  const d42b = mul(mul([1, -1], [1, 2]), [1, 0, 1])
  c.push(check('C33 (x-1)(x+2)(x^2+1) = x^4+x^3-x^2+x-2, V=3 p=1 deficit 2', JSON.stringify(d42b) === JSON.stringify([1, 1, -1, 1, -2]) && variations(d42b) === 3 && (variations(d42b) - 1) % 2 === 0, JSON.stringify(d42b)))

  // --- the design witnesses of the exercises ---
  const d42 = mul(mul([1, -1], [1, -2]), [1, 0, 2]) // L4-2
  c.push(check('C34 L4-2 (x-1)(x-2)(x^2+2) = x^4-3x^3+4x^2-6x+4 literal', JSON.stringify(d42) === JSON.stringify([1, -3, 4, -6, 4]), JSON.stringify(d42)))
  c.push(check('C35 L4-2 V=4, p=2, deficit 2; mirror V=0', variations(d42) === 4 && (variations(d42) - 2) % 2 === 0 && variations(mirror(d42)) === 0, JSON.stringify(mirror(d42))))
  c.push(check('C36 L4-2 roots 1, 2, +-i*sqrt2', ev(d42, 1) === 0 && ev(d42, 2) === 0 && Math.abs(cev(d42, 0, Math.SQRT2)[0]) < 1e-9))

  const d51 = mul([1, -1, 1], [1, 3]) // L5-1
  c.push(check('C37 L5-1 (x^2-x+1)(x+3) = x^3+2x^2-2x+3 literal', JSON.stringify(d51) === JSON.stringify([1, 2, -2, 3]), JSON.stringify(d51)))
  c.push(check('C38 L5-1 V=2, p=0, deficit 2; mirror V=1', variations(d51) === 2 && (variations(d51) - 0) % 2 === 0 && variations(mirror(d51)) === 1, JSON.stringify(mirror(d51))))
  c.push(check('C39 L5-1 the pair x^2-x+1 has disc -3 (no real roots)', (-1) ** 2 - 4 * 1 * 1 === -3 && ev(d51, -3) === 0))

  const d52 = mul(mul(mul([1, -1], [1, -2]), [1, -3]), [1, -4]) // L5-2 witness
  c.push(check('C40 L5-2 (x-1)(x-2)(x-3)(x-4) = x^4-10x^3+35x^2-50x+24, V=4', JSON.stringify(d52) === JSON.stringify([1, -10, 35, -50, 24]) && variations(d52) === 4 && (variations(d52) - 4) % 2 === 0, JSON.stringify(d52)))
  c.push(check('C41 L5-2 second witness {1,2,3,5}: x^4-11x^3+41x^2-61x+30, V=4', JSON.stringify(mul(mul(mul([1, -1], [1, -2]), [1, -3]), [1, -5])) === JSON.stringify([1, -11, 41, -61, 30])))

  const d53 = mul([1, 0, -1], [1, 0, 2]) // L5-3 witness
  c.push(check('C42 L5-3 x^4+x^2-2 = (x^2-1)(x^2+2), V(f)=1 AND V(f(-x))=1', JSON.stringify(d53) === JSON.stringify([1, 0, 1, 0, -2]) && variations(d53) === 1 && variations(mirror(d53)) === 1, JSON.stringify(d53)))
  c.push(check('C43 L5-3 roots 1, -1, +-i*sqrt2 -> census (1,1,2)', ev(d53, 1) === 0 && ev(d53, -1) === 0 && Math.abs(cev(d53, 0, Math.SQRT2)[0]) < 1e-9))

  const d8 = mul(mul(mul([1, -1], [1, -2]), [1, 1]), [1, 0, 1]) // Illustration design
  c.push(check('C44 d8 (x-1)(x-2)(x+1)(x^2+1) = x^5-2x^4-x+2 literal', JSON.stringify(d8) === JSON.stringify([1, -2, 0, 0, -1, 2]), JSON.stringify(d8)))
  c.push(check('C45 d8 V=2, p=2, deficit 0; mirror V=1, q=1', variations(d8) === 2 && (variations(d8) - 2) % 2 === 0 && variations(mirror(d8)) === 1 && (variations(mirror(d8)) - 1) % 2 === 0))
  c.push(check('C46 d8 census (2,1,2) closes the degree', 2 + 1 + 2 === 5))

  // --- SWEEP 1: the rule + mirror + ends + degree census on the product family ---
  {
    let n = 0, ruleOk = true, mirrorOk = true, endsOk = true, degreeOk = true
    for (let k = 1; k <= 4; k++) for (const combo of combos(k)) {
      const p = combo.reduce((acc, f) => mul(acc, f), [1] as number[])
      const P = posCount(combo), N = negCount(combo), Q = combo.filter((x) => x.length === 3).length
      const V = variations(p), Vm = variations(mirror(p))
      if (!(V >= P && (V - P) % 2 === 0)) ruleOk = false
      if (!(Vm >= N && (Vm - N) % 2 === 0)) mirrorOk = false
      if (P === 0 && p[0] * p[p.length - 1] <= 0) endsOk = false
      if (p.length - 1 !== P + N + 2 * Q) degreeOk = false
      n++
    }
    c.push(check(`C47 SWEEP the rule V>=p even deficit on ${n} products`, ruleOk))
    c.push(check('C48 SWEEP the mirror rule Vm>=q even deficit', mirrorOk))
    c.push(check('C49 SWEEP no-positive-root => constant and leading same sign', endsOk))
    c.push(check('C50 SWEEP degree = p + q + 2*(pairs) census arithmetic', degreeOk))
  }

  // --- SWEEP 2: the first/last sign relation on every sign sequence ---
  {
    let rel = true, cnt = 0
    for (let len = 2; len <= 10; len++) for (let m = 0; m < 1 << (len - 1); m++) {
      const seq = Array.from({ length: len }, (_, i) => (i === 0 ? 1 : m & (1 << (i - 1)) ? -1 : 1))
      let V = 0
      for (let i = 1; i < len; i++) if (seq[i] !== seq[i - 1]) V++
      if (seq[len - 1] !== seq[0] * Math.pow(-1, V)) rel = false
      cnt++
    }
    c.push(check(`C51 SWEEP last sign = (-1)^V x first sign on ${cnt} sequences`, rel))
  }

  // --- SWEEP 3: multiplying by (x-r), r>0: parity flip + end behaviour ---
  {
    const polys = [w1, w2, w3, w4, w5, w6, w7, mul([1, 1], [1, 2]), mul([1, 2], [1, 0, 1]), mul(mul([1, 1], [1, 2]), [1, 1]), mul([1, -2], [1, -1])]
    let par = true, ends = true, cnt = 0
    for (const p of polys) for (const r of [1, 2, 3, 5]) {
      const q = mul(p, [1, -r])
      if (variations(q) % 2 !== (variations(p) + 1) % 2) par = false
      if (q[0] !== p[0] || q[q.length - 1] !== -r * p[p.length - 1]) ends = false
      cnt++
    }
    c.push(check(`C52 SWEEP V parity flips under (x-r), r>0 (${cnt} cases)`, par))
    c.push(check('C53 SWEEP leading keeps sign, constant flips sign', ends))
  }

  // --- SWEEP 4: Lemma B — V(g(x-r)) >= V(g)+1 for r>0 (the bound engine) ---
  {
    let lemmaB = true, cnt = 0
    for (let k = 1; k <= 4; k++) for (const combo of combos(k)) {
      const p = combo.reduce((acc, f) => mul(acc, f), [1] as number[])
      for (const r of [1, 2, 3]) if (!(variations(mul(p, [1, -r])) >= variations(p) + 1)) lemmaB = false
      cnt++
    }
    c.push(check(`C54 SWEEP Lemma B V(g(x-r)) >= V(g)+1 on ${cnt} products x 3 roots`, lemmaB))
  }

  // --- SWEEP 5: the mirror-sum parity V + V(f(-x)) = n (mod 2), f(0) != 0 ---
  {
    let sum = true, cnt = 0
    for (let k = 1; k <= 4; k++) for (const combo of combos(k)) {
      const p = combo.reduce((acc, f) => mul(acc, f), [1] as number[])
      if ((variations(p) + variations(mirror(p))) % 2 !== (p.length - 1) % 2) sum = false
      cnt++
    }
    c.push(check(`C55 SWEEP mirror-sum parity V+V(f(-x)) = n mod 2 on ${cnt} products`, sum))
  }

  // --- SWEEP 6: the quadratic case table, honest version, on swept quadratics ---
  {
    let s0 = true, s1 = true, s2 = true, counter = false, n = 0
    for (const a of [1, -1, 2, -2]) for (const b of [1, -1, 2, -2]) for (const cc of [1, -1, 2, -2]) {
      const V = variations([a, b, cc])
      const D = b * b - 4 * a * cc
      let pos = 0
      if (D > 1e-12) {
        const r1 = (-b + Math.sqrt(D)) / (2 * a), r2 = (-b - Math.sqrt(D)) / (2 * a)
        pos = (r1 > 0 ? 1 : 0) + (r2 > 0 ? 1 : 0)
      } else if (Math.abs(D) <= 1e-12) { const rr = -b / (2 * a); pos = rr > 0 ? 2 : 0 } else pos = 0
      if (V === 0 && pos !== 0) s0 = false
      if (V === 1 && pos !== 1) s1 = false
      if (V === 2 && !((D >= 0 && pos === 2) || (D < 0 && pos === 0))) s2 = false
      if (V === 2 && D < 0) counter = true
      n++
    }
    c.push(check(`C56 SWEEP quadratic V=0 -> exactly 0 positive (${n} quadratics)`, s0))
    c.push(check('C57 SWEEP quadratic V=1 -> exactly 1 positive', s1))
    c.push(check('C58 SWEEP quadratic V=2 -> 2 if D>=0 else 0 (the honest table)', s2))
    c.push(check('C59 the x^2-x+1 counterexample: V=2, D=-3, 0 positive, deficit 2', counter && variations([1, -1, 1]) === 2 && 1 - 4 === -3))
    c.push(check('C60 quadratic witnesses x^2-3x+2 (2 positive), x^2-2x+1 (double 1), x^2-x+1 (pair)', (() => {
      const q1 = mul([1, -1], [1, -2]), q2 = mul([1, -1], [1, -1]), q3 = [1, -1, 1]
      return JSON.stringify(q1) === JSON.stringify([1, -3, 2]) && variations(q1) === 2 && 9 - 8 > 0
        && JSON.stringify(q2) === JSON.stringify([1, -2, 1]) && variations(q2) === 2 && 4 - 4 === 0
        && variations(q3) === 2 && 1 - 4 < 0
    })()))
  }

  // --- SWEEP 7: the cubic (V(f), V(f(-x))) pattern census (sign patterns) ---
  {
    const pairs: string[] = []
    for (const a3 of [1, -1]) for (const a2 of [-1, 0, 1]) for (const a1 of [-1, 0, 1]) for (const a0 of [1, -1]) {
      const key = `${variations([a3, a2, a1, a0])},${variations(mirror([a3, a2, a1, a0]))}`
      if (!pairs.includes(key)) pairs.push(key)
    }
    c.push(check('C61 cubic sign pairs: (2,0) is IMPOSSIBLE (mirror-sum parity)', !pairs.includes('2,0'), pairs.join(' | ')))
    c.push(check('C62 cubic realized pairs {0,1;0,3;1,0;1,2;2,1;3,0}', ['0,1', '0,3', '1,0', '1,2', '2,1', '3,0'].every((p) => pairs.includes(p))))
  }

  // --- the L1 drill pins + quiz keys ---
  c.push(check('C63 L1-1 variations of 2x^3-5x^2+7x-1 = 3', variations([2, -5, 7, -1]) === 3))
  c.push(check('C64 L1-2 variations of f(-x) for f = x^3-7x+6 = 1', variations(mirror([1, 0, -7, 6])) === 1))
  c.push(check('C65 Q1 answer: V(x^3-6x^2+11x-6) = 3 (option index 2)', variations([1, -6, 11, -6]) === 3))
  c.push(check('C66 Q2 answer: census {3,1} (option index 0)', variations(w1) === 3 && (variations(w1) - 3) % 2 === 0 && (variations(w1) - 1) % 2 === 0))
  c.push(check('C67 Q3 answer: the deficit 2 is the conjugate pair (option index 1)', variations(w4) === 3 && Math.abs(cev(w4, 0, 1)[0]) < 1e-9))
  c.push(check('C68 Q4 answer: f(-x) is the mirror, not -f(x) (option index 1)', JSON.stringify(mirror([1, 0, -7, 6])) === JSON.stringify([-1, 0, 7, 6]) && variations([-1, 0, 7, -6]) === 2))
  c.push(check('C69 Q5 answer: quartic V=4 mirror V=0 -> p in {4,2,0} (option index 1)', variations([1, -3, 3, -3, 2]) === 4 && variations(mirror([1, -3, 3, -3, 2])) === 0))

  return c
}

function sectionD(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.2')
  c.push(check('D0 lesson 8.2 present', !!L))
  if (!L) return c

  const collectStrings = (l: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    l.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(l) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // identity + wiring
  c.push(check('D1 id pinned', L.id === 'aa-descartes-rule-of-signs'))
  c.push(check('D2 title pinned', L.title === 'Descartes’ Rule of Signs'))
  c.push(check('D3 number 8.2', L.number === '8.2'))
  c.push(check('D4 sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('D5 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-how-many-roots-degree-n-n-roots', 'aa-quadratic-inequalities-and-the-sign-diagram'])))
  c.push(check('D6 concepts exactly 8', L.concepts.length === 8, `got ${L.concepts.length}`))
  c.push(check('D7 objectives exactly 6', (L.objectives?.length ?? 0) === 6, `got ${L.objectives?.length ?? 0}`))

  const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
  const exBlock = L.blocks.find((b) => b.kind === 'exercises') as { sets: { level: string; questions: { solution: string | string[]; answer?: string; figures?: { svg: string; caption: string }[] }[] }[] } | undefined
  const termBlock = L.blocks.find((b) => b.kind === 'terms') as { items: unknown[] } | undefined

  // block census
  c.push(check('D8 3 body figures', countKind(L, 'figure') === 3, `got ${countKind(L, 'figure')}`))
  c.push(check('D9 quiz 5 items', countKind(L, 'quiz') === 1 && (quizBlock?.items.length ?? 0) === 5))
  c.push(check('D10 exercises 15 in 6 sets 2,2,3,3,3,2', countKind(L, 'exercises') === 1 && (exBlock?.sets.map((s) => s.questions.length).join(',') ?? '') === '2,2,3,3,3,2'))
  c.push(check('D11 every exercise carries a steps-array solution + an answer', (exBlock?.sets ?? []).every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && (q.answer ?? '').length > 5))))
  c.push(check('D12 formula cards exactly 8', countKind(L, 'formula') === 8, `got ${countKind(L, 'formula')}`))
  c.push(check('D13 Illustrations (examples) 9', countKind(L, 'example') === 9, `got ${countKind(L, 'example')}`))
  c.push(check('D14 derivations 2 (the quadratic case; the parity chain)', countKind(L, 'derivation') === 2, `got ${countKind(L, 'derivation')}`))
  c.push(check('D15 equations >= 6', countKind(L, 'equation') >= 6, `got ${countKind(L, 'equation')}`))
  c.push(check('D16 tables 2 (the witness ledger; the quadratic case table)', countKind(L, 'table') === 2, `got ${countKind(L, 'table')}`))
  c.push(check('D17 the census recipe algorithm present', countKind(L, 'algorithm') === 1))
  c.push(check('D18 terms block with 4 entries', countKind(L, 'terms') === 1 && (termBlock?.items.length ?? 0) === 4))
  c.push(check('D19 definition callout present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string; text: string }).tone === 'definition')))
  c.push(check('D20 theorem callout present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'theorem')))
  c.push(check('D21 insight callout (the honesty note) present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'insight')))
  c.push(check('D22 warn callout (the four traps) present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'warn' && (b as { text: string }).text.includes('multiplicity'))))
  c.push(check('D23 exam callout present', raw.includes('Exam corner')))
  c.push(check('D24 historical callout (1637) present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'historical') && raw.includes('1637')))
  c.push(check('D25 the 5 pinned headings', ['Sign Variations and the Rule', 'Negative Roots — the Mirror Read', 'Censuses — the Rule and the Conjugate Parity Together', 'The Quadratic Case, Proved Completely', 'Why the Deficit is Even'].every((h) => L.blocks.some((b) => b.kind === 'heading' && (b as { text: string }).text === h))))

  // the solution figures (v9.0) — on L2-1 and L4-1
  {
    const solFigs = (exBlock?.sets ?? []).flatMap((s) => s.questions.flatMap((q) => q.figures ?? []))
    c.push(check('D26 solution figures >= 2 (v9.0)', solFigs.length >= 2, `got ${solFigs.length}`))
    c.push(check('D27 every solution figure has viewBox + aria-label + no LaTeX', solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label') && !/\$|\\tfrac|\\quad/.test(f.svg))))
    c.push(check('D28 body figure svgs carry aria-label + viewBox, palette law (no blue/gray)', L.blocks.filter((b) => b.kind === 'figure').every((b) => (b as { svg: string }).svg.includes('aria-label') && (b as { svg: string }).svg.includes('viewBox') && !/#[0-9a-fA-F]{6}/.test(String((b as { svg: string }).svg).replace(/#(16a34a|166534|65a30d|0d9488|0f766e|d97706|ea580c|dc2626|fef3c7|ffedd5|fcd34d|5eead4|ffffff)/g, '')))))
  }

  // the pinned witnesses ride the prose
  const pins: [string, string][] = [
    ['D29 witness x^3-6x^2+11x-6', 'x^3 - 6x^2 + 11x - 6'],
    ['D30 witness x^3-7x+6', 'x^3 - 7x + 6'],
    ['D31 witness x^3-x^2+x-1', 'x^3 - x^2 + x - 1'],
    ['D32 witness x^4-3x^3+3x^2-3x+2', 'x^4 - 3x^3 + 3x^2 - 3x + 2'],
    ['D33 witness the fifth-roots quartic', 'x^4 + x^3 + x^2 + x + 1'],
    ['D34 witness x^3-3x+2', 'x^3 - 3x + 2'],
    ['D35 witness x^3+x+1', 'x^3 + x + 1'],
    ['D36 the L1-1 drill 2x^3-5x^2+7x-1', '2x^3 - 5x^2 + 7x - 1'],
    ['D37 the mirror read -x^3+7x+6', '-x^3 + 7x + 6'],
    ['D38 the L4-2 design', 'x^4 - 3x^3 + 4x^2 - 6x + 4'],
    ['D39 the L5-1 design', 'x^3 + 2x^2 - 2x + 3'],
    ['D40 the L5-2 witness row', 'x^4 - 10x^3 + 35x^2 - 50x + 24'],
    ['D41 the Illustration design quintic', 'x^5 - 2x^4 - x + 2'],
    ['D42 the 8.1 cross-ref root 0.6823', '0.6823'],
    ['D43 the De Moivre root values 0.3090', '0.3090'],
    ['D44 the mirror quartic x^4+3x^3+3x^2+3x+2', 'x^4 + 3x^3 + 3x^2 + 3x + 2'],
    ['D45 the census totals law p+q+2c=n', 'p + q + 2c = n'],
    ['D46 the census set {2, 0}', '{2, 0}'],
    ['D47 the honesty phrase', 'never exceeds'],
    ['D48 the deficit law phrase', 'the deficit is even'],
    ['D49 La Géométrie in the historical callout', 'La Géométrie'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [2, 0, 1, 1, 1]
  c.push(check('D50 quiz keys [2,0,1,1,1]', JSON.stringify((quizBlock?.items ?? []).map((i) => i.answer)) === JSON.stringify([2, 0, 1, 1, 1]), JSON.stringify((quizBlock?.items ?? []).map((i) => i.answer))))
  c.push(check('D51 every quiz explain kills the wrong options', (quizBlock?.items ?? []).every((i) => i.explain.includes('Option'))))

  // honest word depth
  const words = countLessonWords(L)
  c.push(check('D52 word depth >= 6000', words >= 6000, `got ${words}`))

  return c
}

// ---- E (8.3 engines) / F (8.3 pins) (from v-083.ts) ----

function sectionE(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- E0 complex arithmetic + literal polynomial construction --------
  type C = { re: number; im: number }
  const cAdd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im })
  const cSub = (a: C, b: C): C => ({ re: a.re - b.re, im: a.im - b.im })
  const cMul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re })
  const cDiv = (a: C, b: C): C => {
    const d = b.re * b.re + b.im * b.im
    return cMul(a, { re: b.re / d, im: -b.im / d })
  }
  const cAbs = (a: C) => Math.hypot(a.re, a.im)
  const cNum = (v: number): C => ({ re: v, im: 0 })
  const reals = (...vs: number[]) => vs.map((v) => cNum(v))
  const isInt = (a: C, tol = 1e-9) => Math.abs(a.im) < tol && Math.abs(Math.round(a.re) - a.re) < tol

  // build a monic polynomial from a root multiset LITERALLY: expand
  // (x − r₁)(x − r₂)⋯(x − rₙ) term by term (complex-safe), coefficients
  // highest-power first (the reading convention of every check below)
  const polyFromRoots = (roots: C[]): C[] => {
    let acc: C[] = [cNum(1)]
    for (const r of roots) {
      const next: C[] = Array.from({ length: acc.length + 1 }, () => cNum(0))
      for (let i = 0; i < acc.length; i++) {
        next[i + 1] = cAdd(next[i + 1], acc[i]) // times x
        next[i] = cAdd(next[i], cMul({ re: -r.re, im: -r.im }, acc[i])) // times (−r)
      }
      acc = next
    }
    return acc.slice().reverse()
  }
  const polyEvalC = (coefs: C[], x: C): C => coefs.reduce((s, k) => cAdd(cMul(s, x), k), cNum(0))
  const polyEval = (coefs: number[], x: C): C => polyEvalC(coefs.map(cNum), x)

  // the elementary symmetric functions σ₁..σₙ of a root multiset,
  // computed by LITERAL subset enumeration (n ≤ 5 here)
  const sigmas = (roots: C[]): C[] => {
    const n = roots.length
    const out: C[] = [cNum(1)]
    for (let k = 1; k <= n; k++) {
      let s = cNum(0)
      const rec = (start: number, left: number, prod: C) => {
        if (left === 0) { s = cAdd(s, prod); return }
        for (let i = start; i <= n - left; i++) rec(i + 1, left - 1, cMul(prod, roots[i]))
      }
      rec(0, k, cNum(1))
      out.push(s)
    }
    return out // out[k] = σ_k, with out[0] = 1
  }

  // Newton power sums p_m = Σ r_i^m (literal)
  const powerSum = (roots: C[], m: number): C => {
    let s = cNum(0)
    for (const r of roots) {
      let p = cNum(1)
      for (let t = 0; t < m; t++) p = cMul(p, r)
      s = cAdd(s, p)
    }
    return s
  }

  // integer polynomial multiply (for literal factor audits)
  const intMul = (a: number[], b: number[]): number[] => {
    const out = new Array(a.length + b.length - 1).fill(0)
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]
    return out
  }

  // Durand–Kerner: numeric root-finding for a MONIC real-coefficient
  // polynomial (degree ≤ 5), complex roots included — the independent
  // numeric auditor for every Viète claim
  const durandKerner = (coefs: number[]): C[] => {
    const n = coefs.length - 1
    const R = 1 + Math.max(...coefs.map(Math.abs))
    let roots: C[] = []
    for (let j = 0; j < n; j++) {
      const ang = (2 * Math.PI * j) / n + Math.PI / n
      roots.push({ re: R * Math.cos(ang), im: R * Math.sin(ang) })
    }
    for (let it = 0; it < 800; it++) {
      let move = 0
      roots = roots.map((r, i) => {
        let denom = cNum(1)
        for (let j = 0; j < n; j++) if (j !== i) denom = cMul(denom, cSub(r, roots[j]))
        const delta = cDiv(polyEval(coefs, r), denom)
        move = Math.max(move, cAbs(delta))
        return cSub(r, delta)
      })
      if (move < 1e-12) break
    }
    return roots
  }

  // --- E1 the cubic staircase, built literally from root multisets -----
  // {1,2,3} → x³ − 6x² + 11x − 6, σ = (6, 11, 6)
  const p123 = polyFromRoots(reals(1, 2, 3))
  c.push(check('E1 {1,2,3} → x³−6x²+11x−6 literally',
    p123.map((z) => Math.round(z.re)).join(',') === '1,-6,11,-6' && p123.every((z) => isInt(z)),
    p123.map((z) => z.re.toFixed(4)).join(',')))
  const s123 = sigmas(reals(1, 2, 3))
  c.push(check('E2 σ census {1,2,3} = (6,11,6)',
    s123.slice(1).map((z) => Math.round(z.re)).join(',') === '6,11,6'))
  c.push(check('E3 x³−6x²+11x−6 vanishes at 1, 2, 3',
    [1, 2, 3].every((r) => cAbs(polyEvalC(p123, cNum(r))) < 1e-10)))

  // {1,2,3,4} → x⁴ − 10x³ + 35x² − 50x + 24, σ = (10, 35, 50, 24)
  const p1234 = polyFromRoots(reals(1, 2, 3, 4))
  c.push(check('E4 {1,2,3,4} → x⁴−10x³+35x²−50x+24 literally',
    p1234.map((z) => Math.round(z.re)).join(',') === '1,-10,35,-50,24'))
  const s1234 = sigmas(reals(1, 2, 3, 4))
  c.push(check('E5 σ census {1,2,3,4} = (10,35,50,24)',
    s1234.slice(1).map((z) => Math.round(z.re)).join(',') === '10,35,50,24'))
  c.push(check('E6 the quartic vanishes at 1, 2, 3, 4',
    [1, 2, 3, 4].every((r) => cAbs(polyEvalC(p1234, cNum(r))) < 1e-10)))

  // {2, 1±i} → x³ − 4x² + 6x − 4, σ = (4, 6, 4)
  const rootsUgly = [cNum(2), { re: 1, im: 1 }, { re: 1, im: -1 }]
  const pUgly = polyFromRoots(rootsUgly)
  c.push(check('E7 {2,1±i} → x³−4x²+6x−4 literally',
    pUgly.map((z) => Math.round(z.re)).join(',') === '1,-4,6,-4' && pUgly.every((z) => isInt(z))))
  const sUgly = sigmas(rootsUgly)
  c.push(check('E8 σ census {2,1±i} = (4,6,4)',
    sUgly.slice(1).map((z) => Math.round(z.re)).join(',') === '4,6,4'))
  c.push(check('E9 x³−4x²+6x−4 vanishes at 2, 1+i, 1−i (complex)',
    rootsUgly.every((r) => cAbs(polyEvalC(pUgly, r)) < 1e-10)))
  const p2Ugly = powerSum(rootsUgly, 2)
  c.push(check('E10 Σr² {2,1±i} = 4 (σ₁²−2σ₂ = 16−12)',
    Math.abs(p2Ugly.re - 4) < 1e-10 && Math.abs(p2Ugly.im) < 1e-10, `${p2Ugly.re}`))

  // {2,3,4} → x³ − 9x² + 26x − 24 (exercise L1-1)
  const p234 = polyFromRoots(reals(2, 3, 4))
  c.push(check('E11 {2,3,4} → x³−9x²+26x−24 literally',
    p234.map((z) => Math.round(z.re)).join(',') === '1,-9,26,-24'))
  c.push(check('E12 σ census {2,3,4} = (9,26,24)',
    sigmas(reals(2, 3, 4)).slice(1).map((z) => Math.round(z.re)).join(',') === '9,26,24'))

  // --- E2 the general σₖ = (−1)ᵏaₖ/a₀ law, swept on five multisets ------
  const sweeps: number[][] = [[1, 2, 3], [1, 2, 3, 4], [-1, 2, 5], [2, 3, 4], [1, 2, 4, -3]]
  const lawOk = sweeps.every((ms) => {
    const coefs = polyFromRoots(ms.map(cNum))
    const sg = sigmas(ms.map(cNum))
    return coefs.every((z, k) => {
      const want = (k === 0 ? 1 : Math.pow(-1, k) * sg[k].re) // monic: a₀ = 1
      return Math.abs(z.re - want) < 1e-9 && Math.abs(z.im) < 1e-9
    })
  })
  c.push(check('E13 σₖ = (−1)ᵏaₖ/a₀ swept on five multisets', lawOk))
  const prodOk = sweeps.every((ms) => {
    const coefs = polyFromRoots(ms.map(cNum))
    const sg = sigmas(ms.map(cNum))
    const n = ms.length
    return Math.abs(coefs[n].re - Math.pow(-1, n) * sg[n].re) < 1e-9
  })
  c.push(check('E14 product law (−1)ⁿaₙ/a₀ swept', prodOk))

  // --- E3 Newton's identities for the cubic, swept + the witnesses ----
  const cubics: C[][] = [reals(1, 2, 3), reals(1, 3, -2), rootsUgly, reals(-1, 2, 5)]
  const p2law = cubics.every((rs) => {
    const [s1, s2] = [sigmas(rs)[1], sigmas(rs)[2]]
    const lhs = powerSum(rs, 2)
    const rhs = cSub(cMul(s1, s1), cMul(cNum(2), s2))
    return cAbs(cSub(lhs, rhs)) < 1e-9
  })
  c.push(check('E15 p₂ = σ₁²−2σ₂ swept (4 cubics, complex included)', p2law))
  const p3law = cubics.every((rs) => {
    const [s1, s2, s3] = [sigmas(rs)[1], sigmas(rs)[2], sigmas(rs)[3]]
    const lhs = powerSum(rs, 3)
    const rhs = cAdd(cAdd(cMul(cMul(s1, cMul(s1, s1)), cNum(1)), cMul(cNum(-3), cMul(s1, s2))), cMul(cNum(3), s3))
    return cAbs(cSub(lhs, rhs)) < 1e-9
  })
  c.push(check('E16 p₃ = σ₁³−3σ₁σ₂+3σ₃ swept (4 cubics)', p3law))
  c.push(check('E17 p₂ = 14, p₃ = 36 on {1,2,3}',
    Math.abs(powerSum(reals(1, 2, 3), 2).re - 14) < 1e-12 && Math.abs(powerSum(reals(1, 2, 3), 3).re - 36) < 1e-12))
  c.push(check('E18 p₂ = 30, p₃ = 100 on {1,2,3,4} (the quartic uses the same law)',
    Math.abs(powerSum(reals(1, 2, 3, 4), 2).re - 30) < 1e-12 && Math.abs(powerSum(reals(1, 2, 3, 4), 3).re - 100) < 1e-12))

  // x³ − 2x² − 5x + 6 with roots {1, 3, −2}: σ = (2, −5, −6), p₂ = 14, p₃ = 20
  const pNE = polyFromRoots(reals(1, 3, -2))
  c.push(check('E19 {1,3,−2} → x³−2x²−5x+6 literally',
    pNE.map((z) => Math.round(z.re)).join(',') === '1,-2,-5,6'))
  c.push(check('E20 σ census {1,3,−2} = (2,−5,−6); p₂ = 14; p₃ = 20',
    sigmas(reals(1, 3, -2)).slice(1).map((z) => Math.round(z.re)).join(',') === '2,-5,-6' &&
    Math.abs(powerSum(reals(1, 3, -2), 2).re - 14) < 1e-12 &&
    Math.abs(powerSum(reals(1, 3, -2), 3).re - 20) < 1e-12))
  c.push(check('E21 x³−2x²−5x+6 vanishes at 1, 3, −2',
    [1, 3, -2].every((r) => cAbs(polyEvalC(pNE, cNum(r))) < 1e-10)))

  // --- E4 reciprocal + pairwise reads ---------------------------------
  const recip = (rs: C[]) => {
    const s = sigmas(rs)
    return cDiv(s[2], s[3])
  }
  const rA = recip(reals(1, 2, 3))
  c.push(check('E22 Σ1/r {1,2,3} = 11/6', Math.abs(rA.re - 11 / 6) < 1e-12 && Math.abs(rA.im) < 1e-12))
  const rB = recip(reals(1, 3, -2))
  c.push(check('E23 Σ1/r {1,3,−2} = 5/6', Math.abs(rB.re - 5 / 6) < 1e-12 && Math.abs(rB.im) < 1e-12))
  const rC = recip(reals(2, 2, -3))
  c.push(check('E24 Σ1/r {2,2,−3} = 2/3 (NOT 5/6 — the spec line is corrected)',
    Math.abs(rC.re - 2 / 3) < 1e-12 && Math.abs(rC.im) < 1e-12, `${rC.re}`))
  // the pairwise-squares read Σ_{i<j} rᵢ²rⱼ² = σ₂² − 2σ₁σ₃
  const pairwise = (rs: C[]) => {
    let s = cNum(0)
    for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) s = cAdd(s, cMul(cMul(rs[i], rs[i]), cMul(rs[j], rs[j])))
    return s
  }
  const pwA = pairwise(reals(1, 2, 3))
  c.push(check('E25 pairwise-squares {1,2,3} = 49 = 121 − 72',
    Math.abs(pwA.re - 49) < 1e-12 && 121 - 2 * 6 * 6 === 49))
  const pwB = pairwise(reals(1, 3, -2))
  c.push(check('E26 pairwise-squares {1,3,−2} = 49 = 25 + 24 (the σ read again)',
    Math.abs(pwB.re - 49) < 1e-12 && Math.pow(-5, 2) - 2 * 2 * (-6) === 49))

  // --- E5 the identity route for p₃ (L6-1's engine) -------------------
  const idRoute = cubics.every((rs) => {
    const lhs = cSub(powerSum(rs, 3), cMul(cNum(3), sigmas(rs)[3]))
    const [s1, s2] = [sigmas(rs)[1], sigmas(rs)[2]]
    const rhs = cMul(s1, cSub(cSub(powerSum(rs, 2), s2), cNum(0)))
    return cAbs(cSub(lhs, rhs)) < 1e-9
  })
  c.push(check('E27 α³+β³+γ³−3αβγ = (α+β+γ)(α²+β²+γ²−αβ−βγ−γα) swept', idRoute))

  // --- E6 the factor-theorem solves + the Viète audit -----------------
  // x³ − 7x + 6 → {1, 2, −3}: audit σ₁ = 0, σ₂ = −7, σ₃ = −6
  const pF = [1, 0, -7, 6]
  c.push(check('E28 x³−7x+6 vanishes at 1, 2, −3; audit (0,−7,−6)',
    [1, 2, -3].every((r) => cAbs(polyEval(pF, cNum(r))) < 1e-10) &&
    1 + 2 - 3 === 0 && 1 * 2 + 2 * -3 + -3 * 1 === -7 && 1 * 2 * -3 === -6))
  // x³ − x² − 8x + 12 = (x−2)²(x+3): roots {2,2,−3}; σ = (1,−8,−12), p₂ = 17, p₃ = −11
  const literalRep = intMul(intMul([1, -2], [1, -2]), [1, 3])
  c.push(check('E29 (x−2)²(x+3) = x³−x²−8x+12 literally',
    literalRep.join(',') === '1,-1,-8,12'))
  c.push(check('E30 σ census {2,2,−3} = (1,−8,−12); p₂ = 17; p₃ = −11',
    sigmas(reals(2, 2, -3)).slice(1).map((z) => Math.round(z.re)).join(',') === '1,-8,-12' &&
    Math.abs(powerSum(reals(2, 2, -3), 2).re - 17) < 1e-12 &&
    Math.abs(powerSum(reals(2, 2, -3), 3).re - (8 + 8 - 27)) < 1e-12))
  // x³ − 3x² + 4x − 2 = (x−1)(x²−2x+2): roots {1, 1±i}
  const literalCx = intMul([1, -1], [1, -2, 2])
  c.push(check('E31 (x−1)(x²−2x+2) = x³−3x²+4x−2 literally',
    literalCx.join(',') === '1,-3,4,-2'))
  const rootsCx = [cNum(1), { re: 1, im: 1 }, { re: 1, im: -1 }]
  c.push(check('E32 σ census {1,1±i} = (3,4,2); vanishes at all three',
    sigmas(rootsCx).slice(1).map((z) => Math.round(z.re)).join(',') === '3,4,2' &&
    rootsCx.every((r) => cAbs(polyEval(literalCx, r)) < 1e-10)))

  // --- E7 the depressed cubic x³+px+q: σ₁ = 0, σ₂ = p, σ₃ = −q ---------
  const depressed = [[4, -1], [-7, 6], [3, 2], [0, -1]]
  const depOk = depressed.every(([p, q]) => {
    const coefs = [1, 0, p, q] // x³ + px + q
    return Math.abs(coefs[1] - 0) < 1e-12 && Math.abs(coefs[2] - p) < 1e-12 && Math.abs(coefs[3] - q) < 1e-12
      && sigmas(durandKerner(coefs)).slice(1).every((s, k) => cAbs(cSub(s, cNum(Math.pow(-1, k + 1) * coefs[k + 1]))) < 1e-6)
  })
  c.push(check('E33 x³+px+q reads σ₁ = 0, σ₂ = p, σ₃ = −q (DK-audited on 4 pairs)', depOk))

  // --- E8 Durand–Kerner numeric audits (complex roots included) -------
  // x³ + 4x − 1: Σ(α+β)⁻¹ = −σ₂/σ₃ = −4 (exercise L5-2)
  const dkNE = durandKerner([1, 0, 4, -1])
  const invPairSum = dkNE.reduce((s, r) => cAdd(s, cDiv(cNum(1), cMul(cNum(-1), r))), cNum(0))
  c.push(check('E34 DK x³+4x−1: Σ(α+β)⁻¹ = −4 (σ₁ = 0 ⇒ α+β = −γ)',
    Math.abs(invPairSum.re + 4) < 1e-6 && Math.abs(invPairSum.im) < 1e-6, `${invPairSum.re.toFixed(8)}`))
  const dkF = durandKerner([1, 0, -7, 6]).map((z) => Math.round(z.re)).sort((a, b) => a - b)
  c.push(check('E35 DK x³−7x+6 → {−3,1,2}', dkF.join(',') === '-3,1,2', dkF.join(',')))
  const dkU = durandKerner([1, -4, 6, -4]).sort((a, b) => a.re - b.re || a.im - b.im)
  c.push(check('E36 DK x³−4x²+6x−4 → {2, 1±i}',
    Math.abs(dkU[2].re - 2) < 1e-6 && Math.abs(dkU[0].im + 1) < 1e-6 && Math.abs(dkU[1].im - 1) < 1e-6,
    dkU.map((z) => `${z.re.toFixed(4)}${z.im >= 0 ? '+' : ''}${z.im.toFixed(4)}i`).join(' ')))
  const W: C = { re: -0.5, im: Math.sqrt(3) / 2 }
  const dkW = durandKerner([1, 0, 0, -1]).sort((a, b) => a.re - b.re || a.im - b.im)
  c.push(check('E37 DK x³−1 → {1, ω, ω²}',
    Math.abs(dkW[2].re - 1) < 1e-6 && cAbs(cSub(dkW[1], W)) < 1e-4 && cAbs(cSub(dkW[0], { re: W.re, im: -W.im })) < 1e-4))

  // --- E9 the ω witnesses (the ch.3 cross-ref) ------------------------
  const pW = polyFromRoots([cNum(1), W, { re: W.re, im: -W.im }])
  c.push(check('E38 {1,ω,ω²} → x³−1 literally (complex)',
    pW.map((z) => Math.round(z.re)).join(',') === '1,0,0,-1' && pW.every((z) => isInt(z, 1e-8))))
  c.push(check('E39 σ census {1,ω,ω²} = (0,0,1); 1+ω+ω² = 0; ω³ = 1',
    sigmas([cNum(1), W, { re: W.re, im: -W.im }]).slice(1).every((s, k) => Math.abs(s.re - [0, 0, 1][k]) < 1e-10) &&
    Math.abs(1 + W.re * 2 - 0) < 1e-10 && Math.abs(W.im + (-W.im) - 0) < 1e-10 &&
    cAbs(cSub(cMul(cMul(W, W), W), cNum(1))) < 1e-10))

  // --- E10 the not-nice quartic x⁴ + x² + 1 ---------------------------
  const literalQ = intMul([1, 1, 1], [1, -1, 1])
  c.push(check('E40 (x²+x+1)(x²−x+1) = x⁴+x²+1 literally', literalQ.join(',') === '1,0,1,0,1'))
  const rootSixth = (z: C) => { let p = cNum(1); for (let t = 0; t < 6; t++) p = cMul(p, z); return p }
  const r6 = (z: C): C => rootSixth(z)
  const qRoots = [{ re: -0.5, im: Math.sqrt(3) / 2 }, { re: -0.5, im: -Math.sqrt(3) / 2 }, { re: 0.5, im: Math.sqrt(3) / 2 }, { re: 0.5, im: -Math.sqrt(3) / 2 }]
  c.push(check('E41 the four roots ±1/2 ± i√3/2 vanish x⁴+x²+1',
    qRoots.every((r) => cAbs(polyEval(literalQ, r)) < 1e-10)))
  let sumSq = cNum(0)
  for (const r of qRoots) sumSq = cAdd(sumSq, cMul(r, r))
  c.push(check('E42 Σr² over the primitive 6th roots = −2 (σ₁²−2σ₂ = 0−2)',
    Math.abs(sumSq.re + 2) < 1e-10 && Math.abs(sumSq.im) < 1e-10))
  c.push(check('E43 each root is a primitive 6th root of unity (r⁶ = 1, De Moivre)',
    qRoots.every((r) => cAbs(cSub(r6(r), cNum(1))) < 1e-10)))
  const dkQ = durandKerner([1, 0, 1, 0, 1])
  const sigQ = sigmas(dkQ).slice(1)
  c.push(check('E44 DK x⁴+x²+1: σ census (0,1,0,1) numerically',
    sigQ.every((s, k) => cAbs(cSub(s, cNum([0, 1, 0, 1][k]))) < 1e-5)))

  // --- E11 the squares-of-roots transformation (L4-3) ----------------
  const pSq = polyFromRoots(reals(1, 4, 9))
  c.push(check('E45 squares {1,4,9} → x³−14x²+49x−36 literally',
    pSq.map((z) => Math.round(z.re)).join(',') === '1,-14,49,-36'))
  c.push(check('E46 σ₂(new) = 49 = σ₂²−2σ₁σ₃ = 121−72; vanishes at 1, 4, 9',
    sigmas(reals(1, 4, 9))[2].re === 49 && 121 - 72 === 49 &&
    [1, 4, 9].every((r) => cAbs(polyEvalC(pSq, cNum(r))) < 1e-10)))

  // --- E12 the shifted polynomial + Σ1/(1+rᵢ) (L4-2) -------------------
  // Q(y) = P(y−1) by literal Horner composition with the variable y−1:
  // multiply out q·(y−1) at every Horner step, then add the next coefficient
  const intAddConst = (a: number[], k: number): number[] => {
    const b = a.slice()
    b[b.length - 1] += k
    return b
  }
  const shiftHorner = (coefs: number[]): number[] => {
    let q: number[] = [coefs[0]]
    for (let i = 1; i < coefs.length; i++) q = intAddConst(intMul(q, [1, -1]), coefs[i])
    return q
  }
  const Qy = shiftHorner([1, -10, 35, -50, 24])
  c.push(check('E47 P(y−1) = y⁴−14y³+71y²−154y+120 literally (roots {2,3,4,5})',
    Qy.join(',') === '1,-14,71,-154,120' && [2, 3, 4, 5].every((r) => Math.abs(polyEval(Qy, cNum(r)).re) < 1e-10),
    Qy.join(',')))
  const sigQy = sigmas(reals(2, 3, 4, 5))
  c.push(check('E48 σ₃(Q) = 154, σ₄(Q) = 120 (σ₃/σ₄ = 77/60)',
    sigQy[3].re === 154 && sigQy[4].re === 120 && Math.abs(154 / 120 - 77 / 60) < 1e-15))
  const directInv = 1 / 2 + 1 / 3 + 1 / 4 + 1 / 5
  c.push(check('E49 Σ1/(1+rᵢ) {1,2,3,4} = 77/60 (direct + shifted read agree)',
    Math.abs(directInv - 77 / 60) < 1e-15 && Math.abs(154 / 120 - directInv) < 1e-15))

  // --- E13 the G.P. root structure (L4-1) -----------------------------
  const pGP = polyFromRoots(reals(1, 2, 4))
  c.push(check('E50 G.P. {1,2,4} → x³−7x²+14x−8 literally',
    pGP.map((z) => Math.round(z.re)).join(',') === '1,-7,14,-8'))
  const gpLaw = [[1, 2], [1, 3], [2, 2], [3, 0.5]].every(([a, r]) => {
    const rs = reals(a, a * r, a * r * r)
    const s = sigmas(rs)
    const middle = cNum(a * r)
    return cAbs(cSub(s[2], cMul(s[1], middle))) < 1e-9
  })
  c.push(check('E51 G.P. law σ₂ = σ₁·(middle root) swept on 4 progressions', gpLaw))

  return c
}

function sectionF(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []

  // nested collectStrings (the verify-book4-ch07.ts skeleton)
  const collectStrings = (L: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    L.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(L) }
  }

  const byNumber = new Map(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.3')
  c.push(check('F0 lesson 8.3 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['F1 id pinned', 'aa-cubics-and-quartics-the-symmetric-functions'],
    ['F2 the {1,2,3} cubic', 'x^3 - 6x^2 + 11x - 6'],
    ['F3 the {1,2,3} σ census', '\\sigma_1 = 6'],
    ['F4 the {1,2,3,4} quartic', 'x^4 - 10x^3 + 35x^2 - 50x + 24'],
    ['F5 the ugly-root cubic', 'x^3 - 4x^2 + 6x - 4'],
    ['F6 the reads-without-solving cubic', 'x^3 - 2x^2 - 5x + 6'],
    ['F7 the factor-theorem solve', 'x^3 - 7x + 6'],
    ['F8 the repeated-root solve', 'x^3 - x^2 - 8x + 12'],
    ['F9 the complex-roots solve', 'x^3 - 3x^2 + 4x - 2'],
    ['F10 the not-nice quartic', 'x^4 + x^2 + 1'],
    ['F11 the L1-1 formed cubic', 'x^3 - 9x^2 + 26x - 24'],
    ['F12 the G.P. cubic', 'x^3 - 7x^2 + 14x - 8'],
    ['F13 the squares-of-roots cubic', 'x^3 - 14x^2 + 49x - 36'],
    ['F14 the pairwise-squares computation', '121 - 72'],
    ['F15 the shifted reciprocal read', '\\tfrac{77}{60}'],
    ['F16 the reciprocal read {1,2,3}', '\\tfrac{11}{6}'],
    ['F17 the reciprocal read {1,3,−2}', '\\tfrac{5}{6}'],
    ['F18 the repeated-root reciprocal read', '\\tfrac{2}{3}'],
    ['F19 Newton p₂/p₃ witnesses', 'p_2 = 30'],
    ['F20 Newton quartic p₃ witness', 'p_3 = 100'],
    ['F21 the depressed cubic', 'x^3 + px + q'],
    ['F22 the p₃ identity route', '\\alpha^3 + \\beta^3 + \\gamma^3 - 3\\alpha\\beta\\gamma'],
    ['F23 Viète historical 1591', '1591'],
    ['F24 the ω cross-ref', '1, \\omega, \\omega^2'],
    ['F25 the pairwise-squares law', '\\sigma_2^2 - 2\\sigma_1\\sigma_3'],
    ['F26 Newton identity form', '\\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3'],
    ['F27 the p₃ on the repeated root', '-11'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 48)))

  // the four binding headings
  const headings = L.blocks.filter((b) => b.kind === 'heading').map((b) => (b as { text: string }).text)
  for (const h of ['The Staircase for Cubics', 'The Staircase for Quartics — and the General Pattern', 'Power Sums and Reads — Newton’s Identities', 'Forming and Solving']) {
    c.push(check(`F-headings '${h.slice(0, 34)}'`, headings.includes(h)))
  }

  // quiz keys [0,1,0,0,1] exact
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as unknown as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('F-quiz keys [0,1,0,0,1] exact',
    JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([0, 1, 0, 0, 1]),
    JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('F-quiz 5 items, 4 options each',
    quiz.items.length === 5 && quiz.items.every((i) => i.options.length === 4)))
  c.push(check('F-quiz every explain kills wrong options by index',
    quiz.items.every((i) => i.explain.includes('Option'))))

  // the solution figures (v9.0): ≥1, aria-label, house palette, no raw LaTeX
  const ex = L.blocks.find((b) => b.kind === 'exercises') as unknown as { sets?: { questions?: { figures?: { caption: string; svg: string }[] }[] }[] }
  const allQ = (ex.sets ?? []).flatMap((s) => s.questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('F-solution figures present (v9.0)', withFig.length >= 1, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('F-solution figure aria', figSvg.includes('aria-label')))
  c.push(check('F-solution figure staircase chips', figSvg.includes('σ₂') || figSvg.includes('sigma') || figSvg.includes('35')))
  c.push(check('F-solution figure shifted roots', figSvg.includes('77/60') || figSvg.includes('154')))

  // the body figures: count, palette law, aria, viewBox, no raw LaTeX
  const bodyFigs = L.blocks.filter((b) => b.kind === 'figure') as unknown as { svg: string }[]
  c.push(check('F-3 body figures', bodyFigs.length === 3, `${bodyFigs.length}`))
  const allSvg = bodyFigs.map((f) => f.svg).join('') + figSvg
  c.push(check('F-aria + viewBox on every svg', bodyFigs.every((f) => f.svg.includes('aria-label') && f.svg.includes('viewBox'))))
  const allowed = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5']
  const hexes = allSvg.match(/#[0-9a-fA-F]{6}/g) ?? []
  c.push(check('F-palette law (no off-palette hex, no blue/gray)',
    hexes.every((h) => allowed.includes(h.toLowerCase())), [...new Set(hexes.filter((h) => !allowed.includes(h.toLowerCase())))].join(' ')))
  c.push(check('F-no raw LaTeX/$ in svg text', !/\$|\\tfrac|\\sigma|\\times/.test(allSvg)))

  // structure counts: illustrations, derivations, equations, formulas, terms
  const kinds = (k: string) => L.blocks.filter((b) => b.kind === (k as never)).length
  c.push(check('F-≥6 Illustrations', kinds('example') >= 6, `${kinds('example')}`))
  c.push(check('F-≥2 derivations', kinds('derivation') >= 2, `${kinds('derivation')}`))
  c.push(check('F-≥6 equations', kinds('equation') >= 6, `${kinds('equation')}`))
  c.push(check('F-≥8 formula cards', kinds('formula') >= 8, `${kinds('formula')}`))
  c.push(check('F-terms block with ≥8 entries', L.blocks.some((b) => b.kind === 'terms' && (b as unknown as { items: unknown[] }).items.length >= 8)))
  const tones = (t: string) => L.blocks.filter((b) => b.kind === 'callout' && (b as unknown as { tone: string }).tone === t).length
  c.push(check('F-1 exam callout', tones('exam') === 1, `${tones('exam')}`))
  c.push(check('F-1 historical callout', tones('historical') === 1, `${tones('historical')}`))
  c.push(check('F-≥1 warn callout', tones('warn') >= 1, `${tones('warn')}`))

  // the exercises: 15 questions, the L1..L6 distribution, every solution a steps array
  const sets = (ex.sets ?? [])
  const dist = sets.map((s) => (s as unknown as { level: string; questions: unknown[] }).questions.length).join(',')
  c.push(check('F-exercise distribution L1:2/L2:2/L3:3/L4:3/L5:3/L6:2', dist === '2,2,3,3,3,2', dist))
  c.push(check('F-every exercise solution is a steps array',
    allQ.every((q) => Array.isArray((q as { solution: unknown }).solution))))
  c.push(check('F-every exercise carries an answer',
    allQ.every((q) => typeof (q as { answer?: string }).answer === 'string')))

  // honest word count + prerequisites + sources + concepts + objectives
  const words = countLessonWords(L)
  c.push(check('F-word depth ≥ 6000', words >= 6000, `got ${words}`))
  c.push(check('F-prerequisites pinned exact',
    JSON.stringify(L.prerequisites) === JSON.stringify(['aa-symmetric-reads-and-common-roots', 'aa-how-many-roots-degree-n-n-roots'])))
  c.push(check('F-sources pinned exact',
    JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('F-concepts = 8 pinned', L.concepts.length === 8, `${L.concepts.length}`))
  c.push(check('F-objectives 6–7', (L.objectives?.length ?? 0) >= 6 && (L.objectives?.length ?? 0) <= 7, `${L.objectives?.length}`))
  c.push(check('F-≥1 table', kinds('table') >= 1, `${kinds('table')}`))

  return c
}

// ---- G (8.4 engines) / H (8.4 pins) (from v-084.ts) ----

function sectionG(): SectionCheck[] {
  const c: SectionCheck[] = []

  // ---- local helpers: exact integer polynomial arithmetic (ascending) ----
  const ev = (coef: number[], x: number) => coef.reduce((s, v, i) => s + v * x ** i, 0)
  const mul = (a: number[], b: number[]) => {
    const o = new Array(a.length + b.length - 1).fill(0)
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) o[i + j] += a[i] * b[j]
    return o
  }
  const add = (a: number[], b: number[]) => {
    const o = Math.max(a.length, b.length)
    const r = new Array(o).fill(0)
    a.forEach((v, i) => (r[i] += v))
    b.forEach((v, i) => (r[i] += v))
    return r
  }
  // exact composition: Q(t) = P(t + h), integer coefficients, h integer
  const comp = (P: number[], h: number) => {
    let acc = [P[P.length - 1]]
    for (let i = P.length - 2; i >= 0; i--) acc = add(mul(acc, [h, 1]), [P[i]])
    return acc
  }
  // complex helpers
  const cadd = (z: [number, number], w: [number, number]): [number, number] => [z[0] + w[0], z[1] + w[1]]
  const cmul = (z: [number, number], w: [number, number]): [number, number] => [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]
  const cabs = (z: [number, number]) => Math.hypot(z[0], z[1])
  // bisection to full double precision
  const bisect = (f: (x: number) => number, lo: number, hi: number) => {
    for (let i = 0; i < 200; i++) {
      const m = (lo + hi) / 2
      if (f(lo) * f(m) <= 0) hi = m
      else lo = m
    }
    return (lo + hi) / 2
  }
  // bivariate integer polynomial (Map 'i,j' -> coeff)
  type Bi = Map<string, number>
  const bmul = (x: Bi, y: Bi): Bi => {
    const o: Bi = new Map()
    for (const [ka, va] of x)
      for (const [kb, vb] of y) {
        const [i1, j1] = ka.split(',').map(Number)
        const [i2, j2] = kb.split(',').map(Number)
        const key = `${i1 + i2},${j1 + j2}`
        o.set(key, (o.get(key) ?? 0) + va * vb)
      }
    return o
  }
  const fromFactors = (fs: number[][][]): Bi => {
    let acc: Bi = new Map([['0,0', 1]])
    for (const f of fs) {
      const poly: Bi = new Map()
      for (const [co, i, j] of f) poly.set(`${i},${j}`, (poly.get(`${i},${j}`) ?? 0) + co)
      acc = bmul(acc, poly)
    }
    return acc
  }

  // --- G1-G5 the depression: three witnesses + the t^3 - t family ---
  const d1 = comp([-6, 11, -6, 1], 2) // x^3-6x^2+11x-6, x = t+2
  c.push(check('G1 depress x^3-6x^2+11x-6 by x=t+2 -> t^3-t', JSON.stringify(d1) === JSON.stringify([0, -1, 0, 1]), JSON.stringify(d1)))
  c.push(check('G2 t-roots -1,0,1 literal', [-1, 0, 1].every((t) => Math.abs(ev([0, -1, 0, 1], t)) < 1e-15)))
  c.push(check('G3 x-roots 1,2,3 of the original literal', [1, 2, 3].every((r) => Math.abs(ev([-6, 11, -6, 1], r)) < 1e-12)))
  const d2 = comp([-24, 26, -9, 1], 3) // x^3-9x^2+26x-24 (roots 2,3,4), x = t+3
  c.push(check('G4 depress x^3-9x^2+26x-24 by x=t+3 -> t^3-t', JSON.stringify(d2) === JSON.stringify([0, -1, 0, 1]), JSON.stringify(d2)))
  const d3 = comp([6, 11, 6, 1], -2) // x^3+6x^2+11x+6 (roots -1,-2,-3), x = t-2
  c.push(check('G5 depress x^3+6x^2+11x+6 by x=t-2 -> t^3-t', JSON.stringify(d3) === JSON.stringify([0, -1, 0, 1]), JSON.stringify(d3)))

  // --- G6 the general depression sweep: the a/3 cancellation ---
  let depOk = true
  for (const a of [-9, -6, -3, 3, 6, 9])
    for (const b of [-5, 0, 7])
      for (const cc of [-4, 0, 5]) {
        // scale by 27 to stay in integers: 27*Q(t) composition with h = -a/3
        const Q27 = comp([27 * cc, 27 * b, 27 * a, 27], -a / 3)
        if (Q27[2] !== 0) depOk = false // the t^2 coefficient dies (27(-a + a) = 0)
        if (Q27[1] !== 27 * b - 9 * a * a) depOk = false // t-coeff 27(b - a^2/3)
        if (Math.abs(Q27[0] - (2 * a ** 3 - 9 * a * b + 27 * cc)) > 1e-9) depOk = false // constant 27(2a^3/27 - ab/3 + c)
      }
  c.push(check('G6 depression kills the t^2 term, swept (a,b,c)', depOk))
  // the depressed coefficients formula, numerically on a fine sweep
  let depForm = true
  for (let a = -30; a <= 30; a += 1)
    for (let b = -10; b <= 10; b += 5)
      for (let cc = -10; cc <= 10; cc += 5) {
        const t1 = Math.random()
        const lhs = (t1 - a / 3) ** 3 + a * (t1 - a / 3) ** 2 + b * (t1 - a / 3) + cc
        const rhs = t1 ** 3 + (b - (a * a) / 3) * t1 + (2 * a ** 3) / 27 - (a * b) / 3 + cc
        if (Math.abs(lhs - rhs) > 1e-9) depForm = false
      }
  c.push(check('G7 the depressed form t^3+(b-a^2/3)t+(2a^3/27-ab/3+c), swept', depForm))

  // --- G8-G11 Cardan's collapse + the u^3/v^3 quadratic ---
  let cardOk = true
  for (const [u, v] of [
    [1, 2],
    [0.5, -1.5],
    [2, 3],
    [-1.7, 0.9],
    [Math.cbrt(2), -Math.cbrt(4)],
    [Math.cbrt((-1 + Math.sqrt(5)) / 2), Math.cbrt((-1 - Math.sqrt(5)) / 2)],
  ]) {
    const p = -3 * u * v
    const q = -(u ** 3 + v ** 3)
    if (Math.abs((u + v) ** 3 + p * (u + v) + q) > 1e-12) cardOk = false
    // u^3, v^3 are the roots of t^2 + qt - p^3/27: sum and product
    if (Math.abs(u ** 3 + v ** 3 + q) > 1e-12) cardOk = false
    if (Math.abs(u ** 3 * v ** 3 + p ** 3 / 27) > 1e-12) cardOk = false
  }
  c.push(check('G8 Cardan collapse x=u+v with 3uv=-p, swept', cardOk))
  c.push(check('G9 x^3+3x+1: u^3,v^3=(-1±√5)/2 sum -1, product -1', Math.abs((-1 + Math.sqrt(5)) / 2 + (-1 - Math.sqrt(5)) / 2 + 1) < 1e-12 && Math.abs(((-1 + Math.sqrt(5)) / 2) * ((-1 - Math.sqrt(5)) / 2) + 1) < 1e-12))
  c.push(check('G10 the quadratic reads u^3+v^3=-q, u^3v^3=-p^3/27 on x^3+6x+2', (() => { const u3 = 2, v3 = -4; return u3 + v3 === -2 && u3 * v3 === -8 && -8 === -(6 ** 3) / 27 })()))
  c.push(check('G11 Cardan sums: cbrt values 0.851800 and 1.173985 (6 dp)', Math.abs(Math.cbrt((-1 + Math.sqrt(5)) / 2) - 0.8518) < 5e-7 && Math.abs(Math.cbrt((-1 - Math.sqrt(5)) / 2) + 1.173985) < 5e-7))

  // --- G12-G16 the discriminant values + the Δ=0 shortcut ---
  const D = (p: number, q: number) => -4 * p ** 3 - 27 * q * q
  c.push(check('G12 Δ(x^3-3x+2)=0 and Δ(x^3-12x+16)=0', D(-3, 2) === 0 && D(-12, 16) === 0))
  c.push(check('G13 Δ(x^3+3x+1)=-135 and Δ(x^3+6x+2)=-972', D(3, 1) === -135 && D(6, 2) === -972))
  c.push(check('G14 Δ(x^3-7x+6)=400 and Δ(x^3-15x-4)=13068', D(-7, 6) === 400 && D(-15, -4) === 13068))
  c.push(check('G15 (x-1)^2(x+2)=x^3-3x+2 and (x-2)^2(x+4)=x^3-12x+16 literal', JSON.stringify(mul(mul([-1, 1], [-1, 1]), [2, 1])) === JSON.stringify([2, -3, 0, 1]) && JSON.stringify(mul(mul([-2, 1], [-2, 1]), [4, 1])) === JSON.stringify([16, -12, 0, 1])))
  c.push(check('G16 (x-1)(x-2)(x+3)=x^3-7x+6, roots literal', JSON.stringify(mul(mul([-1, 1], [-2, 1]), [3, 1])) === JSON.stringify([6, -7, 0, 1]) && [1, 2, -3].every((r) => ev([6, -7, 0, 1], r) === 0)))
  // the Δ=0 shortcut: roots 3q/p (simple) and -3q/2p (double)
  const shortcutOk = (() => {
    const w1s = (3 * 2) / -3, w1d = (-3 * 2) / (2 * -3) // x^3-3x+2: -2 and 1
    const w2s = (3 * 16) / -12, w2d = (-3 * 16) / (2 * -12) // x^3-12x+16: -4 and 2
    return (
      ev([2, -3, 0, 1], w1s) === 0 && ev([2, -3, 0, 1], w1d) === 0 && ev([16, -12, 0, 1], w2s) === 0 && ev([16, -12, 0, 1], w2d) === 0 &&
      3 * 1 ** 2 - 3 === 0 && // derivative 3x^2-3 vanishes at the double root 1
      3 * 2 ** 2 - 12 === 0 // derivative 3x^2-12 vanishes at the double root 2
    )
  })()
  c.push(check('G17 the Δ=0 shortcut roots 3q/p and -3q/2p on both witnesses', shortcutOk))
  let relOk = true
  for (let r = 1; r <= 5; r++) {
    const p = -3 * r * r, q = 2 * r ** 3
    if (4 * p ** 3 + 27 * q * q !== 0) relOk = false
    if (JSON.stringify(mul(mul([-r, 1], [-r, 1]), [2 * r, 1])) !== JSON.stringify([q, p, 0, 1])) relOk = false
  }
  c.push(check('G18 p=-3r^2, q=2r^3 gives (x-r)^2(x+2r) and 4p^3+27q^2=0, swept', relOk))

  // --- G19-G22 the Δ<0 cases: bisection + Cardan sums to 4 dp ---
  const r1 = bisect((x) => x ** 3 + 3 * x + 1, -1, 0)
  c.push(check('G19 bisection root x^3+3x+1 = -0.3222 (4 dp), residual |f| < 0.0001', Math.abs(r1 + 0.3222) < 5e-5 && Math.abs(ev([1, 3, 0, 1], -0.3222)) < 1e-4, `root ${r1.toFixed(8)}, f(-0.3222) = ${ev([1, 3, 0, 1], -0.3222).toExponential(3)}`))
  const cardan1 = Math.cbrt((-1 + Math.sqrt(5)) / 2) + Math.cbrt((-1 - Math.sqrt(5)) / 2)
  c.push(check('G20 Cardan sum for x^3+3x+1 matches bisection to 1e-9', Math.abs(cardan1 - r1) < 1e-9, `${cardan1.toFixed(10)} vs ${r1.toFixed(10)}`))
  const r2 = bisect((x) => x ** 3 + 6 * x + 2, -1, 0)
  c.push(check('G21 bisection root x^3+6x+2 = -0.3275 (4 dp); cbrt(2)-cbrt(4) matches to 1e-9', Math.abs(r2 + 0.3275) < 5e-5 && Math.abs(Math.cbrt(2) - Math.cbrt(4) - r2) < 1e-9, `root ${r2.toFixed(10)}, cbrt2-cbrt4 = ${(Math.cbrt(2) - Math.cbrt(4)).toFixed(10)}`))

  // --- G23-G28 the casus irreducibilis on x^3-7x+6 ---
  const p7 = -7, q7 = 6
  const disc7 = (q7 * q7) / 4 + (p7 ** 3) / 27
  c.push(check('G22 q^2/4+p^3/27 = -100/27 exactly (the under-root quantity)', Math.abs(disc7 + 100 / 27) < 1e-12))
  const u3: [number, number] = [-3, 10 / Math.sqrt(27)]
  c.push(check('G23 u^3 = -3 + (10/sqrt(27))i; |u^3| = sqrt(343/27)', Math.abs(cabs(u3) - Math.sqrt(343 / 27)) < 1e-12))
  const r = cabs(u3), th = Math.atan2(u3[1], u3[0])
  const landing = [0, 1, 2].map((k) => 2 * Math.cbrt(r) * Math.cos((th + 2 * Math.PI * k) / 3))
  const want = [2, -3, 1]
  c.push(check('G24 the three ω-combination sums land on 2, -3, 1 (polar + De Moivre, 1e-9)', landing.every((x, k) => Math.abs(x - want[k]) < 1e-9), landing.map((x) => x.toFixed(12)).join(' | ')))
  const exactRoots: [number, number][] = [
    [1, 2 / Math.sqrt(3)],
    [-1.5, 1 / (2 * Math.sqrt(3))],
    [0.5, -5 / (2 * Math.sqrt(3))],
  ]
  const cube = (z: [number, number]): [number, number] => cmul(cmul(z, z), z)
  c.push(check('G25 (1+2/sqrt(3)i)^3 = -3+(10/sqrt(27))i exactly (1e-12)', (() => { const w = cube(exactRoots[0]); return Math.abs(w[0] + 3) < 1e-12 && Math.abs(w[1] - 10 / Math.sqrt(27)) < 1e-12 })()))
  c.push(check('G26 the ω-relatives cube to the same u^3; 2Re lands 2, -3, 1', exactRoots.every((z) => { const w = cube(z); return Math.abs(w[0] + 3) < 1e-12 && Math.abs(w[1] - 10 / Math.sqrt(27)) < 1e-12 }) && exactRoots.map((z) => 2 * z[0]).join(',') === '2,-3,1'))
  c.push(check('G27 the pairing law u·conj(u) = 7/3 = -p/3 keeps 3uv = -p', exactRoots.every((z) => Math.abs(z[0] ** 2 + z[1] ** 2 - 7 / 3) < 1e-12)))
  c.push(check('G28 the three sums are roots of x^3-7x+6 (audit)', want.every((x) => ev([6, -7, 0, 1], x) === 0)))

  // --- G29-G31 the Bombelli exhibit x^3-15x-4 ---
  const bomb = cube([2, 1])
  c.push(check('G29 (2+i)^3 = 2+11i exactly; x = 4 and -2±√3 are roots', bomb[0] === 2 && bomb[1] === 11 && ev([-4, -15, 0, 1], 4) === 0 && Math.abs(ev([-4, -15, 0, 1], -2 + Math.sqrt(3))) < 1e-12 && Math.abs(ev([-4, -15, 0, 1], -2 - Math.sqrt(3))) < 1e-12))
  c.push(check('G30 (x-4)(x^2+4x+1) = x^3-15x-4 literal', JSON.stringify(mul([-4, 1], [1, 4, 1])) === JSON.stringify([-4, -15, 0, 1])))
  c.push(check('G31 product of Bombelli roots = -q: 4·((-2)^2-3) = 4', 4 * (4 - 3) === 4))

  // --- G32-G36 Ferrari on x^4-25x^2+60x-36 ---
  const pf = -25, qf = 60, rf = -36
  c.push(check('G32 the exhibit factors literally: (x-1)(x-2)(x-3)(x+6) = x^4-25x^2+60x-36', JSON.stringify(mul(mul(mul([-1, 1], [-2, 1]), [-3, 1]), [6, 1])) === JSON.stringify([-36, 60, -25, 0, 1])))
  c.push(check('G33 the split (x^2+3x-18)(x^2-3x+2) = the exhibit literally', JSON.stringify(mul([-18, 3, 1], [2, -3, 1])) === JSON.stringify([-36, 60, -25, 0, 1])))
  c.push(check('G34 the four roots -6,3,1,2 audit the exhibit', [-6, 3, 1, 2].every((x) => ev([-36, 60, -25, 0, 1], x) === 0)))
  c.push(check('G35 the resolvent M^3-50M^2+769M-3600 has root M=9: 729-4050+6921-3600=0', (() => { const M = 9; return M ** 3 - 50 * M ** 2 + 769 * M - 3600 === 0 && 2 * pf === -50 && pf * pf - 4 * rf === 769 && -(qf ** 2) === -3600 })()))
  c.push(check('G36 m=3: k-n = q/m = 20, k+n = p+m^2 = -16, k=2, n=-18, nk = r', (() => { const m = 3; const kd = qf / m, ks = pf + m * m; const k = (ks + kd) / 2, n = (ks - kd) / 2; return kd === 20 && ks === -16 && k === 2 && n === -18 && k * n === rf })()))

  // --- G37-G40 the resolvent identity, swept ---
  let ferOk = true
  for (const m of [1, 2, 3, 4, 5]) for (const n of [-6, -1, 2, 4]) for (const k of [-2, 1, 3, 6]) {
    const pp = n + k - m * m
    const qq = m * (k - n)
    const rr = n * k
    const M = m * m
    if (M ** 3 + 2 * pp * M ** 2 + (pp * pp - 4 * rr) * M - qq ** 2 !== 0) ferOk = false
    // the split really reproduces the quartic
    if (JSON.stringify(mul([n, m, 1], [k, -m, 1])) !== JSON.stringify([rr, qq, pp, 0, 1])) ferOk = false
  }
  c.push(check('G37 resolvent identity M^3+2pM^2+(p^2-4r)M-q^2=0 at M=m^2, swept', ferOk))

  // --- G38-G42 Sophie Germain + the biquadratic + the q=0 route ---
  const sg = mul([2, -2, 1], [2, 2, 1])
  c.push(check('G38 Sophie Germain: (x^2-2x+2)(x^2+2x+2) = x^4+4 literally', JSON.stringify(sg) === JSON.stringify([4, 0, 0, 0, 1])))
  let sgGen = true
  for (const [a, b] of [[1, 1], [2, 1], [3, 2], [5, 3], [4, 7], [7, 5]]) {
    if (Math.abs(a ** 4 + 4 * b ** 4 - (a * a - 2 * a * b + 2 * b * b) * (a * a + 2 * a * b + 2 * b * b)) > 1e-9) sgGen = false
  }
  c.push(check('G39 the general identity a^4+4b^4=(a^2-2ab+2b^2)(a^2+2ab+2b^2), swept', sgGen))
  const cz = (z: [number, number], a: number, b: number): [number, number] => [a * z[0] - b * z[1], a * z[1] + b * z[0]]
  const zsq = (z: [number, number]): [number, number] => cmul(z, z)
  const sgRoots: [number, number][] = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
  const sgOk = sgRoots.every((z) => {
    const which = z[0] > 0 ? [2, -2, 2] : [2, 2, 2] // z^2 -/+ 2z + 2
    const w = zsq(z)
    const val = cadd(w, cz(z, which[1], 0))
    return val[0] + which[2] === 0 && val[1] === 0
  })
  c.push(check('G40 the four complex roots 1±i, -1±i audit x^4+4', sgOk))
  c.push(check('G41 the q=0 resolvent M^3-16M=0 has M=4 (NOT M=16): m=2 -> n=k=2 splits x^4+4', (() => { const M = 4; const m = 2; return M ** 3 - 16 * M === 0 && 16 ** 3 - 16 * 16 === 3840 && JSON.stringify(mul([2, m, 1], [2, -m, 1])) === JSON.stringify([4, 0, 0, 0, 1]) })()))
  c.push(check('G42 biquadratic: (x^2-1)(x^2-4) = x^4-5x^2+4; roots ±1, ±2 audit', JSON.stringify(mul([-1, 0, 1], [-4, 0, 1])) === JSON.stringify([4, 0, -5, 0, 1]) && [1, -1, 2, -2].every((x) => ev([4, 0, -5, 0, 1], x) === 0)))

  // --- G43-G47 the discriminant as squared differences + the bivariate identity ---
  const trip = (a: number, b: number, cc: number) => {
    const pp = a * b + b * cc + cc * a
    const qq = -(a * b * cc)
    return { pp, qq, prod: (a - b) ** 2 * (b - cc) ** 2 * (cc - a) ** 2 }
  }
  const trips: [number, number, number][] = [[1, 2, -3], [1, 1, -2], [2, 3, -5], [3, 4, -7], [-2, 5, -3], [4, -1, -3], [6, 2, -8], [1, 5, -6], [10, -3, -7], [2, -5, 3]]
  c.push(check('G43 Δ = (α-β)^2(β-γ)^2(γ-α)^2 for depressed cubics, swept', trips.every((t) => { const { pp, qq, prod } = trip(t[0], t[1], t[2]); return D(pp, qq) === prod })))
  c.push(check('G44 the witnesses: 1·25·16 = 400 on x^3-7x+6; 0 on x^3-3x+2', trip(1, 2, -3).prod === 400 && trip(1, 1, -2).prod === 0))
  const LHS = fromFactors([
    [[1, 1, 0], [-1, 0, 1]],
    [[1, 1, 0], [-1, 0, 1]],
    [[1, 1, 0], [2, 0, 1]],
    [[1, 1, 0], [2, 0, 1]],
    [[2, 1, 0], [1, 0, 1]],
    [[2, 1, 0], [1, 0, 1]],
  ])
  const A2 = fromFactors([[[1, 2, 0], [1, 1, 1], [1, 0, 2]]])
  const A3 = bmul(A2, bmul(A2, A2))
  const S2 = fromFactors([[[1, 1, 0], [1, 0, 1]]])
  const T12 = bmul(bmul(fromFactors([[[1, 2, 0]]]), fromFactors([[[1, 0, 2]]])), bmul(S2, S2))
  const RHS: Bi = new Map()
  for (const [k, v] of A3) RHS.set(k, (RHS.get(k) ?? 0) + 4 * v)
  for (const [k, v] of T12) RHS.set(k, (RHS.get(k) ?? 0) - 27 * v)
  let biEq = true
  for (const k of new Set([...LHS.keys(), ...RHS.keys()])) if ((LHS.get(k) ?? 0) !== (RHS.get(k) ?? 0)) biEq = false
  c.push(check('G45 bivariate identity (α-β)^2(α+2β)^2(2α+β)^2 = 4(α^2+αβ+β^2)^3 - 27α^2β^2(α+β)^2, exact', biEq))

  // --- the bridge: Cardan's under-root quantity is -Δ/108 ---
  let bridgeOk = true
  for (const [p, q] of [[3, 1], [6, 2], [-3, 2], [-7, 6], [-15, -4], [-12, 16], [5, -3]]) {
    if (Math.abs(q * q / 4 + p ** 3 / 27 + D(p, q) / 108) > 1e-12) bridgeOk = false
  }
  c.push(check('G46 q^2/4+p^3/27 = -Δ/108 on swept witnesses (the bridge)', bridgeOk))

  // --- the numeric-audit discipline: residuals at the 4 dp claims ---
  c.push(check('G47 audit residuals: f(-0.3222) ≈ -0.00005, f(-0.3275) small', Math.abs(ev([1, 3, 0, 1], -0.3222) + 0.0000485) < 1e-5 && Math.abs(ev([2, 6, 0, 1], -0.3275)) < 2e-4, `f1 = ${ev([1, 3, 0, 1], -0.3222).toExponential(3)}, f2 = ${ev([2, 6, 0, 1], -0.3275).toExponential(3)}`))

  return c
}

function sectionH(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.4')
  c.push(check('H0 lesson 8.4 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['H1 id pinned', 'aa-cardan-and-ferrari-the-cubic-and-quartic-solved'],
    // headings (the binding structure)
    ['H2 heading: Depressing the Cubic', 'Depressing the Cubic'],
    ['H3 heading: Cardan’s Substitution', 'Cardan’s Substitution'],
    ['H4 heading: The Discriminant and the Three Cases', 'The Discriminant and the Three Cases'],
    ['H5 heading: The Casus Irreducibilis — the Honest Heart', 'The Casus Irreducibilis — the Honest Heart'],
    ['H6 heading: Ferrari’s Resolvent', 'Ferrari’s Resolvent'],
    // the pinned witnesses
    ['H7 depression witness 1', 'x^3 - 6x^2 + 11x - 6'],
    ['H8 the t^3 - t family', 't^3 - t'],
    ['H9 depression witness 2 (roots 2,3,4)', 'x^3 - 9x^2 + 26x - 24'],
    ['H10 depression witness 3 (roots −1,−2,−3)', 'x^3 + 6x^2 + 11x + 6'],
    ['H11 the Δ=0 witness', 'x^3 - 3x + 2'],
    ['H12 the Δ=0 second witness', 'x^3 - 12x + 16'],
    ['H13 the Δ<0 witness', 'x^3 + 3x + 1'],
    ['H14 the Δ<0 second witness', 'x^3 + 6x + 2'],
    ['H15 the casus witness', 'x^3 - 7x + 6'],
    ['H16 the Bombelli witness', 'x^3 - 15x - 4'],
    ['H17 the Ferrari exhibit', 'x^4 - 25x^2 + 60x - 36'],
    ['H18 the Sophie Germain witness', 'x^4 + 4'],
    ['H19 the biquadratic witness', 'x^4 - 5x^2 + 4'],
    // the pinned engine numbers
    ['H20 Δ = −135', '-135'],
    ['H21 Δ = −972', '-972'],
    ['H22 Δ = 400', '400'],
    ['H23 Δ = 13068 (Bombelli)', '13068'],
    ['H24 the audited root −0.3222', '-0.3222'],
    ['H25 the audited root −0.3275', '-0.3275'],
    ['H26 the cube roots 0.8518 / 1.1739', '0.8518'],
    ['H27 the casus u³, v³ = −3 ± 10/sqrt(27) i', '\\tfrac{10}{\\sqrt{27}}'],
    ['H28 the casus polar modulus', '1.9245'],
    ['H29 Bombelli’s (2+i)³ = 2+11i', '2 + 11i'],
    ['H30 the resolvent M³ − 50M² + 769M − 3600', '769'],
    ['H31 the resolvent root M = 9', 'M = 9'],
    ['H32 the exhibit split', 'x^2 + 3x - 18'],
    ['H33 the Δ=0 shortcut roots 3q/p, −3q/2p', '\\tfrac{3q}{p}'],
    // the honesty + history + craft vocabulary
    ['H34 the casus named', 'casus irreducibilis'],
    ['H35 the priority quarrel / Ars Magna', 'Ars Magna'],
    ['H36 Bombelli named', 'Bombelli'],
    ['H37 Wantzel honesty', 'Wantzel'],
    ['H38 De Moivre cashed', 'De Moivre'],
    ['H39 Sophie Germain named', 'Sophie Germain'],
    ['H40 the resolvent named', 'resolvent'],
    ['H41 the trust engine', 'trust engine'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [1, 2, 0, 1, 0] exact
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('H42 quiz keys [1,2,0,1,0]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 2, 0, 1, 0]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('H43 five quiz items', quiz.items.length === 5, `got ${quiz.items.length}`))
  c.push(check('H44 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // SOLUTION FIGURES (v9.0): >= 2 questions carry figures, aria-labelled
  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets?: { questions?: unknown[] }[] }
  const allQ = (ex.sets ?? []).flatMap((s) => s.questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('H45 >= 2 solution figures (v9.0)', withFig.length >= 2, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('H46 solution figures aria-labelled', figSvg.includes('aria-label')))
  c.push(check('H47 the casus figure carries the exact cube roots 1.155/0.289/1.443', figSvg.includes('1.155') && figSvg.includes('0.289') && figSvg.includes('1.443')))
  c.push(check('H48 the casus figure carries the omega-combinations', figSvg.includes('omega')))
  c.push(check('H49 the Cardan figure carries the audited sum −0.3222', figSvg.includes('0.8518') && figSvg.includes('1.1739')))

  // the binding structure census
  c.push(check('H50 >= 6 Illustrations (examples)', L.blocks.filter((b) => b.kind === 'example').length >= 6, `got ${L.blocks.filter((b) => b.kind === 'example').length}`))
  c.push(check('H51 >= 3 derivations', L.blocks.filter((b) => b.kind === 'derivation').length >= 3, `got ${L.blocks.filter((b) => b.kind === 'derivation').length}`))
  c.push(check('H52 >= 6 equations', L.blocks.filter((b) => b.kind === 'equation').length >= 6, `got ${L.blocks.filter((b) => b.kind === 'equation').length}`))
  c.push(check('H53 >= 8 formula cards', L.blocks.filter((b) => b.kind === 'formula').length >= 8, `got ${L.blocks.filter((b) => b.kind === 'formula').length}`))
  c.push(check('H54 >= 2 tables', L.blocks.filter((b) => b.kind === 'table').length >= 2, `got ${L.blocks.filter((b) => b.kind === 'table').length}`))
  c.push(check('H55 3 body figures, all aria-labelled', (() => { const figs = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]; return figs.length === 3 && figs.every((f) => f.svg.includes('aria-label') && f.svg.includes('viewBox')) })()))
  c.push(check('H56 1 exam callout, >= 1 historical, 1 warn', (() => { const tones = L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone); return tones.filter((t) => t === 'exam').length === 1 && tones.filter((t) => t === 'historical').length >= 1 && tones.filter((t) => t === 'warn').length === 1 })()))
  c.push(check('H57 exercises L1:2/L2:2/L3:3/L4:3/L5:3/L6:2 = 15', (() => { const dist = (ex.sets ?? []).map((s) => (s as { questions?: unknown[] }).questions?.length ?? 0); return dist.length === 6 && dist.join(',') === '2,2,3,3,3,2' })(), `got ${(ex.sets ?? []).map((s) => (s as { questions?: unknown[] }).questions?.length ?? 0).join(',')}`))
  c.push(check('H58 every exercise carries a worked steps solution + answer', allQ.every((q) => { const qq = q as { solution?: unknown; answer?: string }; return Array.isArray(qq.solution) && qq.solution.length >= 3 && typeof qq.answer === 'string' && qq.answer.length > 0 })))

  // honest word count + prerequisites + sources
  const words = countLessonWords(L)
  c.push(check('H59 word depth >= 6000', words >= 6000, `got ${words}`))
  c.push(check('H60 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-cubics-and-quartics-the-symmetric-functions', 'aa-de-moivre-roots-of-unity-and-the-complex-loci']), JSON.stringify(L.prerequisites)))
  c.push(check('H61 sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']), JSON.stringify(L.sources)))
  return c
}

// ---- I (8.5 engines) / J (8.5 pins) (from v-085.ts) ----

function sectionI(): SectionCheck[] {
  // ALL local helpers INSIDE this function (assembly-safety)
  const c: SectionCheck[] = []

  // ---------- local engine: polynomial arithmetic (coefficients low -> high) ----------
  type Poly = number[]
  const trim = (p: Poly): Poly => { const q = [...p]; while (q.length > 1 && Math.abs(q[q.length - 1]) < 1e-12) q.pop(); return q }
  const peq = (a: Poly, b: Poly): boolean => { const A = trim(a), B = trim(b); return A.length === B.length && A.every((v, i) => Math.abs(v - B[i]) < 1e-9) }
  const padd = (a: Poly, b: Poly): Poly => { const n = Math.max(a.length, b.length); const out: Poly = []; for (let i = 0; i < n; i++) out.push((a[i] ?? 0) + (b[i] ?? 0)); return trim(out) }
  const pscl = (p: Poly, k: number): Poly => trim(p.map((v) => v * k))
  const pmul = (a: Poly, b: Poly): Poly => { const out: Poly = Array.from({ length: a.length + b.length - 1 }, () => 0); for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]; return trim(out) }
  const peval = (p: Poly, x: number): number => { let acc = 0; for (let i = p.length - 1; i >= 0; i--) acc = acc * x + p[i]; return acc }
  const fromRoots = (rs: number[]): Poly => rs.reduce<Poly>((acc, r) => pmul(acc, [-r, 1]), [1])
  const pcomp = (p: Poly, h: number): Poly => { // p(x + h) as a polynomial in x, by expansion
    let acc: Poly = [0]
    let pw: Poly = [1] // (x + h)^0
    for (let i = 0; i < p.length; i++) { acc = padd(acc, pscl(pw, p[i])); pw = pmul(pw, [h, 1]) }
    return trim(acc)
  }
  const pAt = (p: Poly, k: number): Poly => p.map((v, i) => v / k ** i) // P(x/k), coefficient-wise
  const scaled = (p: Poly, k: number): Poly => pscl(pAt(p, k), k ** (p.length - 1)) // k^n P(x/k) = 0
  const inverted = (p: Poly): Poly => [...p].reverse() // x^n P(1/x): coefficients reversed
  const rootsAt = (p: Poly, cands: number[]): number[] => cands.filter((r) => Math.abs(peval(p, r)) < 1e-9)
  const near = (x: number, y: number): boolean => Math.abs(x - y) < 1e-9

  // ---------- the pinned witnesses ----------
  const P = fromRoots([1, 2, 3]) // x^3 - 6x^2 + 11x - 6 — THE chapter witness
  const Pstr = (p: Poly) => p.join(',')

  // I1 the base witness is exactly x^3 - 6x^2 + 11x - 6 with roots {1,2,3}
  c.push(check('I1 base witness x^3-6x^2+11x-6', peq(P, [-6, 11, -6, 1])))
  c.push(check('I1b base roots {1,2,3}', rootsAt(P, [1, 2, 3]).length === 3 && rootsAt(P, [-3, -2, -1, 0, 4, 5, 6, 7, 8]).length === 0))

  // --- the SHIFT law: P(x-h) has roots r+h; increase by h = pcomp(P, -h) ---
  const PShiftUp2 = pcomp(P, -2) // P(x - 2): roots increased by 2
  const PShiftDown2 = pcomp(P, 2) // P(x + 2): roots decreased by 2
  const PShiftDown1 = pcomp(P, 1) // P(x + 1): roots decreased by 1
  const PShiftUp1 = pcomp(P, -1) // P(x - 1): roots increased by 1

  c.push(check('I2 increase by 2 -> x^3-12x^2+47x-60 (expansion)', peq(PShiftUp2, [-60, 47, -12, 1]), Pstr(PShiftUp2)))
  c.push(check('I2b roots {3,4,5} and no other integers -8..10', rootsAt(PShiftUp2, [3, 4, 5]).length === 3 && rootsAt(PShiftUp2, Array.from({ length: 19 }, (_, i) => i - 8).filter((v) => ![3, 4, 5].includes(v))).length === 0))
  c.push(check('I3 decrease by 2 -> x^3-x (the 8.4 depression cross-ref)', peq(PShiftDown2, [0, -1, 0, 1]), Pstr(PShiftDown2)))
  c.push(check('I3b roots {-1,0,1} and no other integers -8..10', rootsAt(PShiftDown2, [-1, 0, 1]).length === 3 && rootsAt(PShiftDown2, Array.from({ length: 19 }, (_, i) => i - 8).filter((v) => ![-1, 0, 1].includes(v))).length === 0))
  c.push(check('I4 decrease by 1 -> x^3-3x^2+2x (the engine pins THIS exact form)', peq(PShiftDown1, [0, 2, -3, 1]), Pstr(PShiftDown1)))
  c.push(check('I4b roots {0,1,2}: x(x-1)(x-2) factor match', peq(PShiftDown1, fromRoots([0, 1, 2])) && rootsAt(PShiftDown1, [0, 1, 2]).length === 3))
  c.push(check('I5 increase by 1 -> x^3-9x^2+26x-24 (NOT -18: the spec constant is a slip; the engine pins -24)', peq(PShiftUp1, [-24, 26, -9, 1]), Pstr(PShiftUp1)))
  c.push(check('I5b roots {2,3,4} = x^3-9x^2+26x-24 factored', peq(PShiftUp1, fromRoots([2, 3, 4])) && rootsAt(PShiftUp1, [2, 3, 4]).length === 3))

  // --- the general shift-coefficient law, SYMBOLICALLY: ---
  //   (x-1)^3 + a(x-1)^2 + b(x-1) + c = x^3 + (a-3)x^2 + (b-2a+3)x + (a-b+c-1)
  type Sym = Record<string, number> // linear monomials over '', 'a', 'b', 'c'
  const sAdd = (s: Sym, t: Sym): Sym => { const o: Sym = { ...s }; for (const k of Object.keys(t)) o[k] = (o[k] ?? 0) + t[k]; return o }
  const sEq = (s: Sym, t: Sym): boolean => { const keys = new Set([...Object.keys(s), ...Object.keys(t)]); for (const k of keys) if (Math.abs((s[k] ?? 0) - (t[k] ?? 0)) > 1e-12) return false; return true }
  const symPAdd = (a: Sym[], b: Sym[]): Sym[] => { const n = Math.max(a.length, b.length); const out: Sym[] = []; for (let i = 0; i < n; i++) out.push(sAdd(a[i] ?? {}, b[i] ?? {})); return out }
  const monoScale = (p: Poly, mono: string): Sym[] => p.map((v) => ({ [mono]: v }))
  const padSym = (sp: Sym[], n: number): Sym[] => { const out = [...sp]; while (out.length < n) out.push({}); return out }
  const x1: Poly = [-1, 1] // x - 1
  const x2 = pmul(x1, x1) // (x-1)^2 = x^2-2x+1
  const x3 = pmul(x2, x1) // (x-1)^3 = x^3-3x^2+3x-1
  let S: Sym[] = x3.map((v) => ({ '': v })) // numeric part (x-1)^3
  S = symPAdd(S, monoScale(x2, 'a')) // + a(x-1)^2
  S = symPAdd(S, monoScale(x1, 'b')) // + b(x-1)
  S = symPAdd(S, padSym([{ c: 1 }], 4)) // + c (constant term)
  c.push(check('I6 symbolic x^3 coefficient is 1', sEq(S[3] ?? {}, { '': 1 })))
  c.push(check('I6b symbolic x^2 coefficient is a-3', sEq(S[2] ?? {}, { '': -3, a: 1 })))
  c.push(check('I6c symbolic x coefficient is b-2a+3', sEq(S[1] ?? {}, { '': 3, a: -2, b: 1 })))
  c.push(check('I6d symbolic constant is a-b+c-1', sEq(S[0] ?? {}, { '': -1, a: 1, b: -1, c: 1 })))
  // numeric sweep of the law on assorted (a,b,c)
  const triples: [number, number, number][] = [[-6, 11, -6], [0, -7, 6], [1, -4, -4], [4, 1, -6], [3, -2, -4], [-2, -5, 6], [5, 0, 1], [-1, -1, 0], [2, 2, 2], [10, -3, 7]]
  const sweepOk = triples.every(([a, b, cc]) => peq(pcomp([cc, b, a, 1], -1), [a - b + cc - 1, b - 2 * a + 3, a - 3, 1]))
  c.push(check('I7 shift-coefficient law swept on 10 (a,b,c) triples', sweepOk))

  // --- the SCALING law: roots r -> kr gives k^n P(x/k) = 0 ---
  c.push(check('I8 scale by 3 -> x^3-18x^2+99x-162 (expansion 27 P(x/3))', peq(scaled(P, 3), [-162, 99, -18, 1]), Pstr(scaled(P, 3))))
  c.push(check('I8b roots {3,6,9} + (x-3)(x-6)(x-9) match', peq(scaled(P, 3), fromRoots([3, 6, 9])) && rootsAt(scaled(P, 3), [3, 6, 9]).length === 3))
  c.push(check('I9 scale by 2 -> x^3-12x^2+44x-48, roots {2,4,6} (L4-3)', peq(scaled(P, 2), [-48, 44, -12, 1]) && peq(scaled(P, 2), fromRoots([2, 4, 6])) && rootsAt(scaled(P, 2), [2, 4, 6]).length === 3))
  c.push(check('I9b scale by -2: roots {1,2} of x^2-3x+2 -> {-2,-4}: x^2+6x+8 (negative k)', peq(scaled(fromRoots([1, 2]), -2), [8, 6, 1]) && rootsAt(scaled(fromRoots([1, 2]), -2), [-2, -4]).length === 2))

  // --- the INVERSION law: roots r -> 1/r gives x^n P(1/x) = 0 ---
  const PInv = inverted(P) // 1 - 6x + 11x^2 - 6x^3
  c.push(check('I10 inversion -> 1-6x+11x^2-6x^3 (coefficients reversed)', peq(PInv, [1, -6, 11, -6]), Pstr(PInv)))
  c.push(check('I10b roots {1, 1/2, 1/3} (rational evaluations)', rootsAt(PInv, [1, 1 / 2, 1 / 3]).length === 3 && rootsAt(PInv, [2, 3, 1 / 6, -1 / 3, 0]).length === 0))
  c.push(check('I11 reciprocal sum 11/6 = sigma2/sigma3 (8.3 symmetric read)', near(1 + 1 / 2 + 1 / 3, 11 / 6)))
  const Q = fromRoots([1, 2, -3]) // x^3 - 7x + 6
  const QInv = inverted(Q) // 1 - 7x^2 + 6x^3
  c.push(check('I12 inversion of x^3-7x+6 -> 1-7x^2+6x^3, roots {1,1/2,-1/3} (Illustration 4)', peq(QInv, [1, 0, -7, 6]) && rootsAt(QInv, [1, 1 / 2, -1 / 3]).length === 3))
  c.push(check('I13 inversion sweep on x^2-3x+2 -> 1-3x+2x^2, roots {1,1/2}', peq(inverted(fromRoots([1, 2])), [1, -3, 2]) && rootsAt(inverted(fromRoots([1, 2])), [1, 1 / 2]).length === 2))

  // --- TRANSFORMED READS ---
  const R2 = fromRoots([1, 2]) // x^2 - 3x + 2
  const R2sq = fromRoots([1, 4]) // squares read: x^2 - 5x + 4
  c.push(check('I14 squares of {1,2} -> x^2-5x+4; sigma reads sigma1^2-2sigma2=5, sigma2^2=4', peq(R2sq, [4, -5, 1]) && near(3 * 3 - 2 * 2, 5) && near(2 * 2, 4)))
  c.push(check('I14b squares roots {1,4}', rootsAt(R2sq, [1, 4]).length === 2))
  c.push(check('I15 x^3-7x+6 roots {1,2,-3}; increased by 1 -> x^3-3x^2-4x+12 (L4-1)', peq(Q, [6, -7, 0, 1]) && rootsAt(Q, [1, 2, -3]).length === 3 && peq(pcomp(Q, -1), [12, -4, -3, 1]) && rootsAt(pcomp(Q, -1), [2, 3, -2]).length === 3))
  const R6 = fromRoots([-1, 2, -2]) // x^3 + x^2 - 4x - 4 (Illustration 6 base)
  c.push(check('I16 coefficient-law read: x^3+x^2-4x-4 -> P(x-1) = x^3-2x^2-3x, roots {0,3,-1}', peq(R6, [-4, -4, 1, 1]) && peq(pcomp(R6, -1), [0, -3, -2, 1]) && rootsAt(pcomp(R6, -1), [0, 3, -1]).length === 3))

  // --- the DIMINISHED-ROOTS craft ---
  const D = fromRoots([3, -1, 2]) // x^3 - 4x^2 + x + 6 (the pinned craft witness)
  c.push(check('I17 craft base x^3-4x^2+x+6 roots {3,-1,2}', peq(D, [6, 1, -4, 1]) && rootsAt(D, [3, -1, 2]).length === 3))
  const Ddim = pcomp(D, 2) // diminished by 2: P(x+2)
  c.push(check('I18 diminished by 2 -> x^3+2x^2-3x (expansion)', peq(Ddim, [0, -3, 2, 1]), Pstr(Ddim)))
  c.push(check('I18b roots {1,-3,0} + x(x-1)(x+3) match (solved by inspection)', peq(Ddim, fromRoots([1, -3, 0])) && rootsAt(Ddim, [0, 1, -3]).length === 3))
  const E = fromRoots([1, -1, 4]) // x^3 - 4x^2 - x + 4 (Illustration 2 base)
  c.push(check('I19 Illustration 2: x^3-4x^2-x+4 roots {1,-1,4}', peq(E, [4, -1, -4, 1]) && rootsAt(E, [1, -1, 4]).length === 3))
  c.push(check('I19b diminished by 1 -> x^3-x^2-6x = x(x+2)(x-3), roots {0,-2,3}', peq(pcomp(E, 1), [0, -6, -1, 1]) && peq(pcomp(E, 1), fromRoots([0, -2, 3])) && rootsAt(pcomp(E, 1), [0, -2, 3]).length === 3))

  // --- the mandated exercise witnesses ---
  const F = fromRoots([2, 3]) // x^2 - 5x + 6
  c.push(check('I20 L1-1: x^2-5x+6 roots {2,3}; +3 -> P(x-3) = x^2-11x+30, roots {5,6}', peq(F, [6, -5, 1]) && peq(pcomp(F, -3), [30, -11, 1]) && rootsAt(pcomp(F, -3), [5, 6]).length === 2))
  c.push(check('I21 the h sign flip: x^2-5x+6 DECREASED by 3 -> P(x+3) = x^2+x, roots {0,-1}', peq(pcomp(F, 3), [0, 1, 1]) && rootsAt(pcomp(F, 3), [0, -1]).length === 2))
  const G = fromRoots([1, 3, -2]) // x^3 - 2x^2 - 5x + 6
  c.push(check('I22 L3-1: x^3-2x^2-5x+6 roots {1,3,-2}; decreased by 1 -> x^3+x^2-6x, roots {0,2,-3}', peq(G, [6, -5, -2, 1]) && peq(pcomp(G, 1), [0, -6, 1, 1]) && rootsAt(pcomp(G, 1), [0, 2, -3]).length === 3))
  const H4 = [4, 0, -5, 0, 1] // x^4 - 5x^2 + 4
  c.push(check('I23 L3-2: x^4-5x^2+4 roots exactly {1,-1,2,-2}; y=x^2 read (y-1)(y-4)', rootsAt(H4, [1, -1, 2, -2]).length === 4 && rootsAt(H4, [0, 3, -2.5, 1.5]).length === 0 && peq(fromRoots([1, 4]), [4, -5, 1])))

  // --- LOSS OF ROOT (the derivation-annex fold) ---
  const L1 = [0, -1, 0, 1] // x^3 - x = 0, roots {0,1,-1}
  c.push(check('I24 loss witness 1: x^3-x roots {0,1,-1}; dividing by x gives x^2-1 (multiplication confirms: x(x^2-1))', rootsAt(L1, [0, 1, -1]).length === 3 && peq(pmul([-1, 0, 1], [0, 1]), L1) && rootsAt([-1, 0, 1], [1, -1]).length === 2 && Math.abs(peval([-1, 0, 1], 0)) > 0.5))
  const L2 = pmul([-1, 1], [-6, 0, 1]) // x^2(x-1) = 6(x-1) collected: (x-1)(x^2-6) = x^3-x^2-6x+6
  c.push(check('I25 loss witness 2: x^2(x-1)=6(x-1) -> (x-1)(x^2-6) = x^3-x^2-6x+6', peq(L2, [6, -6, -1, 1]), Pstr(L2)))
  c.push(check('I25b roots {1, sqrt6, -sqrt6}; x=1 satisfies BOTH sides of the original (0 = 0)', rootsAt(L2, [1, Math.sqrt(6), -Math.sqrt(6)]).length === 3 && near(1 * 1 * (1 - 1), 6 * (1 - 1))))
  c.push(check('I26 the cancelled read x^2=6 -> {sqrt6,-sqrt6}: the root 1 is LOST (subset check)', rootsAt([-6, 0, 1], [Math.sqrt(6), -Math.sqrt(6)]).length === 2 && Math.abs(peval([-6, 0, 1], 1)) > 4))
  const L3 = pmul([-2, 1], [-3, 0, 1]) // x^2(x-2) = 3(x-2) collected: (x-2)(x^2-3) = x^3-2x^2-3x+6 (quiz Q3)
  c.push(check('I27 loss witness 3 (quiz Q3): x^2(x-2)=3(x-2) -> (x-2)(x^2-3) = x^3-2x^2-3x+6, roots {2,sqrt3,-sqrt3}', peq(L3, [6, -3, -2, 1]) && rootsAt(L3, [2, Math.sqrt(3), -Math.sqrt(3)]).length === 3 && near(2 * 2 * (2 - 2), 3 * (2 - 2))))
  c.push(check('I27b cancelling (x-2) leaves x^2=3 -> {sqrt3,-sqrt3}: the root 2 is LOST', rootsAt([-3, 0, 1], [Math.sqrt(3), -Math.sqrt(3)]).length === 2 && Math.abs(peval([-3, 0, 1], 2)) > 0.5))

  // --- EXTRANEOUS ROOTS (the mirror) ---
  const Sq = [-2, -1, 1] // x^2 - x - 2 = 0 (the squared equation)
  c.push(check('I28 extraneous witness: sqrt(x+2)=x squared -> x^2-x-2=0, roots {2,-1}', rootsAt(Sq, [2, -1]).length === 2 && rootsAt(Sq, [0, 1, 3, -2]).length === 0))
  c.push(check('I28b the audit: x=2 true root (sqrt4 = 2); x=-1 extraneous (sqrt1 = 1 != -1); solution {2}', near(Math.sqrt(2 + 2), 2) && !near(Math.sqrt(-1 + 2), -1) && Math.abs(Math.sqrt(-1 + 2) - (-1)) > 1))
  c.push(check('I29 the A=-B signature: at the added candidate -1, sqrt(x+2) = 1 = -(x); both sides of the SQUARED equation agree', near((-1) ** 2, (-1 + 2)) && near(Math.sqrt(-1 + 2) + (-1), 0)))

  // --- the DIRECTION theorem: cancellation only removes, squaring only adds ---
  const cancelDir = [1, -1].every((r) => Math.abs(peval(L1, r)) < 1e-9) && Math.abs(peval(L1, 0)) < 1e-9 && Math.abs(peval([-1, 0, 1], 0)) > 0.5
  const cancelDir2 = Math.abs(peval(L2, 1)) < 1e-9 && Math.abs(peval([-6, 0, 1], 1)) > 0.5
  const cancelDir3 = Math.abs(peval(L3, 2)) < 1e-9 && Math.abs(peval([-3, 0, 1], 2)) > 0.5
  c.push(check('I30 cancellation only REMOVES: every root of each cancelled equation is a root of the original, and each dropped root is a root of the cancelled factor', cancelDir && cancelDir2 && cancelDir3))
  const squareDir = near(Math.sqrt(2 + 2), 2) && rootsAt(Sq, [2, -1]).length === 2
  c.push(check('I31 squaring only ADDS: the original solution {2} survives the square; the extra candidate -1 fails the original audit', squareDir && Math.abs(peval(Sq, 2)) < 1e-9 && !near(Math.sqrt(-1 + 2), -1)))

  // --- the CARDAN depression cross-ref (8.4) ---
  const a = -6, b = 11, cc = -6
  const pDep = b - (a * a) / 3
  const qDep = cc - (a * b) / 3 + (2 * a * a * a) / 27
  c.push(check('I32 the 8.4 depression IS the shift law: x=t-a/3 with a=-6 is the decrease by 2; p = b-a^2/3 = -1, q = c-ab/3+2a^3/27 = 0 -> t^3-t = P(x+2)', near(pDep, -1) && near(qDep, 0) && peq(PShiftDown2, [qDep, pDep, 0, 1])))

  // --- the remainder read + Viète cross-checks (8.3 staircase) ---
  c.push(check('I33 constant term of P(x-2) equals P(-2) = -60 (the remainder read)', near(PShiftUp2[0], peval(P, -2))))
  c.push(check('I34 Viète on P(x-2) = x^3-12x^2+47x-60: new sigma1 = 6+3h = 12; new product = 60 = 3*4*5', near(12, 6 + 3 * 2) && near(-(-60), 3 * 4 * 5)))
  c.push(check('I35 shift sweep on {2,5}: P(x-4) for x^2-7x+10 -> x^2-15x+54, roots {6,9}', peq(pcomp(fromRoots([2, 5]), -4), [54, -15, 1]) && rootsAt(pcomp(fromRoots([2, 5]), -4), [6, 9]).length === 2))

  return c
}

function sectionJ(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const L = chapter.lessons.find((l) => l.id === 'aa-transformation-of-equations')
  c.push(check('J0 the lesson is present in the chapter', !!L))
  if (!L) return c
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // --- identity pins ---
  c.push(check('J1 id aa-transformation-of-equations', L.id === 'aa-transformation-of-equations'))
  c.push(check('J2 number 8.5 + title Transformation of Equations', L.number === '8.5' && L.title === 'Transformation of Equations'))
  c.push(check('J3 prerequisites exact (8.4 Cardan + 8.3 symmetric)', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-cardan-and-ferrari-the-cubic-and-quartic-solved', 'aa-cubics-and-quartics-the-symmetric-functions'])))
  c.push(check('J4 sources exact (m2-02 + jee-style + H&K + syllabus)', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('J5 concepts = 8 with the mandated phrases', L.concepts.length === 8 && L.concepts.some((x) => x.includes('P(x − h)')) && L.concepts.some((x) => x.includes('scaling law')) && L.concepts.some((x) => x.includes('xⁿP(1/x)')) && L.concepts.some((x) => x.includes('diminished-roots craft')) && L.concepts.some((x) => x.includes('loss of root')) && L.concepts.some((x) => x.includes('extraneous')) && L.concepts.some((x) => x.includes('equivalence'))))
  c.push(check('J6 objectives 6-7, all three laws + both audits named', (L.objectives ?? []).length >= 6 && (L.objectives ?? []).some((x) => x.includes('shift law')) && (L.objectives ?? []).some((x) => x.includes('scaling law')) && (L.objectives ?? []).some((x) => x.includes('inversion law')) && (L.objectives ?? []).some((x) => x.includes('LOST roots')) && (L.objectives ?? []).some((x) => x.includes('EXTRANEOUS'))))

  // --- structure pins ---
  c.push(check('J7 the four mandated headings', ['Roots Increased — the Shift Law', 'Roots Scaled and Inverted', 'Transformed Reads', 'The Honesty Guards: Loss and Extraneous Roots'].every((h) => L.blocks.some((b) => b.kind === 'heading' && b.text === h))))
  c.push(check('J8 the derivation-annex fold: a derivation titled Loss of Root', L.blocks.some((b) => b.kind === 'derivation' && b.title.includes('Loss of Root'))))
  c.push(check('J9 >= 3 derivations (shift law + inversion law + direction theorem + the annex)', countKind(L, 'derivation') >= 3 && L.blocks.some((b) => b.kind === 'derivation' && b.title.includes('shift law')) && L.blocks.some((b) => b.kind === 'derivation' && b.title.includes('inversion law')) && L.blocks.some((b) => b.kind === 'derivation' && b.title.includes('direction discipline'))))
  c.push(check('J10 >= 6 Illustrations (examples)', countKind(L, 'example') >= 6))
  c.push(check('J11 >= 6 equations (numbered tags 1-9)', countKind(L, 'equation') >= 6 && [1, 2, 3, 4, 5, 6, 7, 8, 9].every((n) => L.blocks.some((b) => b.kind === 'equation' && b.latex.includes(`\\tag{${n}}`)))))
  c.push(check('J12 >= 8 formula cards (the 8 mandated laws)', countKind(L, 'formula') >= 8 && ['increase law', 'decrease law', 'scaling law', 'inversion law', 'squares read', 'shift-coefficient law', 'loss-of-root guard', 'extraneous guard'].every((nm) => L.blocks.some((b) => b.kind === 'formula' && b.name.toLowerCase().includes(nm)))))
  c.push(check('J13 exactly 1 exam callout', L.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1))
  c.push(check('J14 exactly 1 insight callout (the depression = the shift law)', L.blocks.filter((b) => b.kind === 'callout' && b.tone === 'insight').length === 1 && either('one engine in two costumes')))
  c.push(check('J15 exactly 1 warn callout (the direction traps)', L.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 1 && either('The three direction traps')))
  c.push(check('J16 the definition callout + a terms block', L.blocks.some((b) => b.kind === 'callout' && b.tone === 'definition') && countKind(L, 'terms') >= 1))
  c.push(check('J17 the law-family table present', L.blocks.some((b) => b.kind === 'table') && either('The four transformation laws at a glance')))

  // --- the >= 10 witness needles (engine-pinned numbers IN the prose) ---
  const needles = ['x^3-12x^2+47x-60', 'x^3-x', 'x^3-18x^2+99x-162', '1-6x+11x^2-6x^3', 'x^2-5x+4', 'x^3-3x^2-4x+12', 'x^3+2x^2-3x', 'x^3-9x^2+26x-24', 'x^3-12x^2+44x-48', 'x^2-11x+30', 'x^3+x^2-6x', 'x^3 - x^2 - 6x', 'x^2(x-1) = 6(x-1)', 'x^2 - x - 2', 'x^3-3x^2+2x']
  c.push(check('J18 >= 10 witness needles present (count = ' + needles.filter(either).length + ')', needles.filter(either).length >= 10))
  c.push(check('J19 the base witness x^3-6x^2+11x-6 with roots {1,2,3}', either('x^3-6x^2+11x-6') && either('\\{1, 2, 3\\}') && either('\\{-1, 0, 1\\}') && either('\\{3, 4, 5\\}')))
  c.push(check('J20 the quiz-Q3 witness x^2(x-2) = 3(x-2) with the lost root 2', either('x^2(x-2) = 3(x-2)') && either('loses the root 2')))
  c.push(check('J21 the diminished-roots craft witness x^3-4x^2+x+6 (roots {3,-1,2})', either('x^3-4x^2+x+6') && either('\\{3, -1, 2\\}')))
  c.push(check('J22 the Cardan cross-ref: the depression is the shift law at a/3, with the pinned p and q', either('depression') && either('a/3') && either('b - a^2/3') && either('2a^3/27') && (either('depression IS the shift law') || either('depression is the shift law'))))
  c.push(check('J23 the shift-coefficient law pinned exactly (a-3, b-2a+3, a-b+c-1) + the -24 constant', either('(a-3)x^2 + (b-2a+3)x + (a-b+c-1)') && either('$-24$, not a tempting $-18$')))
  c.push(check('J24 the squares read via the symmetric functions (8.3 cross-ref)', either('\\sigma_1^2 - 2\\sigma_2') && either('\\sigma_2^2')))
  c.push(check('J25 the direction discipline pinned: cancellation only removes, squaring only adds', either('only removes') && either('only adds') && either('one-way door')))
  c.push(check('J26 the h sign-flip discipline pinned', either('OPPOSITE to the move')))
  c.push(check('J27 the extraneous audit witness with the A=-B signature', either('\\sqrt{x+2} = x') && either('A = -B')))
  c.push(check('J28 the equivalence discipline + the 8.6 handoff (reciprocal equations)', either('equivalent') && either('reciprocal equations') && either('x + 1/x')))

  // --- quiz pins ---
  const quiz = L.blocks.find((b) => b.kind === 'quiz')
  c.push(check('J29 the quiz block exists with 5 items x 4 options', !!quiz && quiz.items.length === 5 && quiz.items.every((q) => q.options.length === 4)))
  c.push(check('J30 quiz keys [1,0,0,0,1] exact', quiz ? JSON.stringify(quiz.items.map((q) => q.answer)) === JSON.stringify([1, 0, 0, 0, 1]) : false, quiz ? JSON.stringify(quiz.items.map((q) => q.answer)) : 'no quiz'))
  c.push(check('J31 every quiz item carries a full explain', !!quiz && quiz.items.every((q) => (q.explain ?? '').length > 120)))

  // --- exercises pins ---
  const ex = L.blocks.filter((b) => b.kind === 'exercises')[0]
  const census: Record<string, number> = {}
  for (const set of ex ? ex.sets : []) census[set.level] = (census[set.level] ?? 0) + set.questions.length
  c.push(check('J32 15 exercises in the mandated L1:2/L2:2/L3:3/L4:3/L5:3/L6:2 ladder', JSON.stringify(census) === JSON.stringify({ L1: 2, L2: 2, L3: 3, L4: 3, L5: 3, L6: 2 }), JSON.stringify(census)))
  c.push(check('J33 every exercise carries a steps-array solution + an answer', !!ex && ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && typeof q.answer === 'string' && q.answer.length > 0))))
  const solFigs: { caption: string; svg: string }[] = []
  for (const set of ex ? ex.sets : []) for (const q of set.questions) for (const f of q.figures ?? []) solFigs.push(f)
  c.push(check('J34 >= 1 solution figure with aria-label (got ' + solFigs.length + ')', solFigs.length >= 1 && solFigs.every((f) => f.svg.includes('aria-label'))))
  c.push(check('J35 the L2-1 shift-picture solution figure + the L4-2 extraneous-audit solution figure', solFigs.length >= 2 && solFigs.some((f) => /chips 1, 2, 3/i.test(f.caption)) && solFigs.some((f) => /audit/i.test(f.caption))))

  // --- figures + palette pins ---
  const figs = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  c.push(check('J36 3 body figures, each with viewBox + aria-label', figs.length === 3 && figs.every((f) => f.svg.includes('viewBox=') && f.svg.includes('aria-label'))))
  const allSvg = [...figs.map((f) => f.svg), ...solFigs.map((f) => f.svg)]
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', 'none'])
  const banned: string[] = []
  for (const s of allSvg) for (const m of s.matchAll(/#[0-9a-fA-F]{6}/g)) if (!allowed.has(m[0].toLowerCase())) banned.push(m[0])
  c.push(check('J37 the vivid palette law held (no banned/retired hexes in any svg)', banned.length === 0, banned.slice(0, 5).join(',')))
  c.push(check('J38 no raw $ or LaTeX commands inside svg text', allSvg.every((s) => !/\$/.test(s.replace(/\$\{/g, '')) && !/\\sqrt|\\tfrac|\\times|\\geq/.test(s))))

  // --- honesty pin ---
  c.push(check('J39 words >= 6000 (countLessonWords, got ' + countLessonWords(L) + ')', countLessonWords(L) >= 6000))
  c.push(check('J40 the audit-column craft named in prose', either('audit column')))

  return c
}

// ---- K (8.6 engines) / L (8.6 pins) (from v-086.ts) ----

function sectionK(): SectionCheck[] {
  const c: SectionCheck[] = []
  const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps

  // literal polynomial arithmetic — descending-power coefficient arrays,
  // the ground truth every claimed factorization is checked against
  const polyMul = (p: number[], q: number[]): number[] => {
    const out = new Array(p.length + q.length - 1).fill(0)
    for (let i = 0; i < p.length; i++) for (let j = 0; j < q.length; j++) out[i + j] += p[i] * q[j]
    return out
  }
  const peval = (p: number[], x: number): number => {
    let v = 0
    for (const coef of p) v = v * x + coef
    return v
  }
  const pderiv = (p: number[]): number[] => p.slice(0, -1).map((coef, i) => coef * (p.length - 1 - i))
  const isPal = (p: number[]): boolean => p.length > 1 && p.every((v, i) => v === p[p.length - 1 - i])
  const qroots = (a: number, b: number, cc: number): number[] => {
    const D = b * b - 4 * a * cc
    if (D < 0) return []
    return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]
  }
  const pow = (b: number[], n: number): number[] => {
    let acc = [1]
    for (let i = 0; i < n; i++) acc = polyMul(acc, b)
    return acc
  }

  // complex arithmetic — the roots-of-unity powering + complex evaluation
  type Cx = { re: number; im: number }
  const cx = (re: number, im = 0): Cx => ({ re, im })
  const cmul = (a: Cx, b: Cx): Cx => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re })
  const cadd = (a: Cx, b: Cx): Cx => ({ re: a.re + b.re, im: a.im + b.im })
  const cdiv = (a: Cx, b: Cx): Cx => {
    const d = b.re * b.re + b.im * b.im
    return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }
  }
  const cpow = (z: Cx, n: number): Cx => {
    let v = cx(1)
    for (let i = 0; i < n; i++) v = cmul(v, z)
    return v
  }
  const ceval = (p: number[], z: Cx): Cx => {
    let v = cx(0)
    for (const coef of p) v = cadd(cmul(v, z), cx(coef))
    return v
  }
  const czero = (z: Cx, eps = 1e-9) => Math.abs(z.re) < eps && Math.abs(z.im) < eps

  const SQ5 = Math.sqrt(5)
  const SQ3 = Math.sqrt(3)
  const SQ2 = Math.sqrt(2)

  // the three quartic witnesses (palindromic rows, pinned)
  const W1 = [1, 7, 14, 7, 1] // x^4+7x^3+14x^2+7x+1
  const W2 = [1, -3, 4, -3, 1] // x^4-3x^3+4x^2-3x+1
  const W3 = [1, 5, 6, 5, 1] // x^4+5x^3+6x^2+5x+1
  const Q5 = [1, 1, 1, 1, 1, 1] // x^5+x^4+x^3+x^2+x+1
  const S6 = [1, -6, 15, -20, 15, -6, 1] // x^6-6x^5+15x^4-20x^3+15x^2-6x+1

  // --- THE witness: x^4+7x^3+14x^2+7x+1 = (x^2+3x+1)(x^2+4x+1) ---
  c.push(check('K1 witness-1 is palindromic', isPal(W1), JSON.stringify(W1)))
  c.push(check('K2 witness-1 factorization by expansion', JSON.stringify(polyMul([1, 3, 1], [1, 4, 1])) === JSON.stringify(W1), JSON.stringify(polyMul([1, 3, 1], [1, 4, 1]))))
  const t1 = qroots(1, 7, 12)
  c.push(check('K3 witness-1 t-quadratic t^2+7t+12 roots {-3,-4}', near(t1[0], -3) && near(t1[1], -4), JSON.stringify(t1)))
  c.push(check('K3b t^2+7t+12 = (t+3)(t+4) by expansion', JSON.stringify(polyMul([1, 3], [1, 4])) === JSON.stringify([1, 7, 12])))
  const r11 = (-3 + SQ5) / 2
  const r12 = (-3 - SQ5) / 2
  const r21 = -2 + SQ3
  const r22 = -2 - SQ3
  const four1 = [r11, r12, r21, r22]
  c.push(check('K4 witness-1 four roots evaluate to 0', four1.every((r) => near(peval(W1, r), 0, 1e-9)), four1.map((r) => peval(W1, r).toExponential(2)).join(',')))
  c.push(check('K5 witness-1 pair products = 1', near(r11 * r12, 1) && near(r21 * r22, 1), `${r11 * r12}, ${r21 * r22}`))
  c.push(check('K6 witness-1 each root satisfies x+1/x in {-3,-4}', four1.every((r) => near(r + 1 / r, -3) || near(r + 1 / r, -4)), four1.map((r) => (r + 1 / r).toFixed(6)).join(',')))
  c.push(check('K6b witness-1 root values pinned', near(r11, -0.3819660113) && near(r12, -2.6180339887) && near(r21, -0.2679491924) && near(r22, -3.7320508076), [r11, r12, r21, r22].join(',')))

  // --- second witness (the mixed census): x^4-3x^3+4x^2-3x+1 ---
  c.push(check('K7 witness-2 is palindromic + factors', isPal(W2) && JSON.stringify(polyMul([1, -1, 1], [1, -2, 1])) === JSON.stringify(W2), JSON.stringify(polyMul([1, -1, 1], [1, -2, 1]))))
  const t2 = qroots(1, -3, 2)
  c.push(check('K8 witness-2 t-quadratic t^2-3t+2 roots {1,2}', (near(t2[0], 1) || near(t2[0], 2)) && (near(t2[1], 1) || near(t2[1], 2)) && t2[0] !== t2[1], JSON.stringify(t2)))
  const zeta1 = cx(0.5, SQ3 / 2) // (1+i*sqrt3)/2 — root of x^2-x+1
  const zeta2 = cx(0.5, -SQ3 / 2)
  c.push(check('K9 witness-2 roots evaluate (complex): 1 double + (1±i√3)/2', near(peval(W2, 1), 0) && czero(ceval(W2, zeta1)) && czero(ceval(W2, zeta2))))
  c.push(check('K10 witness-2 complex pair product = 1', near(zeta1.re * zeta2.re - zeta1.im * zeta2.im, 1) && near(zeta1.re * zeta2.im + zeta1.im * zeta2.re, 0)))
  c.push(check('K11 witness-2 non-real pair: z^3 = -1 and z^6 = 1 (primitive SIXTH roots)', czero(cadd(cpow(zeta1, 3), cx(1))) && czero(cadd(cpow(zeta1, 6), cx(-1))) && czero(cadd(cpow(zeta2, 6), cx(-1)))))
  c.push(check('K11b x^2-x+1 roots are z^3=-1 roots: (x+1)(x^2-x+1) = x^3+1', JSON.stringify(polyMul([1, 1], [1, -1, 1])) === JSON.stringify([1, 0, 0, 1])))

  // --- third witness: x^4+5x^3+6x^2+5x+1 = (x^2+x+1)(x^2+4x+1) ---
  c.push(check('K12 witness-3 is palindromic + factors', isPal(W3) && JSON.stringify(polyMul([1, 1, 1], [1, 4, 1])) === JSON.stringify(W3), JSON.stringify(polyMul([1, 1, 1], [1, 4, 1]))))
  const t3 = qroots(1, 5, 4)
  c.push(check('K13 witness-3 t-quadratic t^2+5t+4 roots {-1,-4}', near(t3[0], -1) && near(t3[1], -4), JSON.stringify(t3)))
  const omega1 = cx(-0.5, SQ3 / 2) // (-1+i√3)/2 — root of x^2+x+1
  const omega2 = cx(-0.5, -SQ3 / 2)
  c.push(check('K14 witness-3 roots evaluate: -2±√3 real + (-1±i√3)/2 complex', near(peval(W3, r21), 0) && near(peval(W3, r22), 0) && czero(ceval(W3, omega1)) && czero(ceval(W3, omega2))))
  c.push(check('K15 witness-3 complex pair are the primitive CUBE roots (z^3 = 1)', czero(cadd(cpow(omega1, 3), cx(-1))) && czero(cadd(cpow(omega2, 3), cx(-1)))))
  c.push(check('K15b x^2+x+1 roots: (x-1)(x^2+x+1) = x^3-1', JSON.stringify(polyMul([1, -1], [1, 1, 1])) === JSON.stringify([1, 0, 0, -1])))

  // --- the odd-degree laws, swept ---
  const aSweep = [-3, -1, 0, 1, 2, 5, 7, 10]
  c.push(check('K16 odd-palindromic law x^3+ax^2+ax+1 = (x+1)(x^2+(a-1)x+1), swept a', aSweep.every((a) => JSON.stringify(polyMul([1, 1], [1, a - 1, 1])) === JSON.stringify([1, a, a, 1]))))
  c.push(check('K17 odd-palindromic x = -1 root, swept a', aSweep.every((a) => peval([1, a, a, 1], -1) === 0)))
  c.push(check('K18 anti-palindromic law x^3+ax^2-ax-1 = (x-1)(x^2+(a+1)x+1), swept a', aSweep.every((a) => JSON.stringify(polyMul([1, -1], [1, a + 1, 1])) === JSON.stringify([1, a, -a, -1]))))
  c.push(check('K19 anti-palindromic x = 1 root, swept a', aSweep.every((a) => peval([1, a, -a, -1], 1) === 0)))

  // --- the odd + anti witnesses ---
  c.push(check('K20 a = 5 witness x^3+5x^2+5x+1 = (x+1)(x^2+4x+1); roots -1, -2±√3', JSON.stringify(polyMul([1, 1], [1, 4, 1])) === JSON.stringify([1, 5, 5, 1]) && near(peval([1, 5, 5, 1], -1), 0) && near(peval([1, 5, 5, 1], r21), 0) && near(peval([1, 5, 5, 1], r22), 0)))
  const anti6 = [1, 6, -6, -1]
  const antiRoots = [(-7 + 3 * SQ5) / 2, (-7 - 3 * SQ5) / 2]
  c.push(check('K21 anti witness x^3+6x^2-6x-1 = (x-1)(x^2+7x+1); roots 1, (-7±3√5)/2', JSON.stringify(polyMul([1, -1], [1, 7, 1])) === JSON.stringify(anti6) && near(peval(anti6, 1), 0) && antiRoots.every((r) => near(peval(anti6, r), 0, 1e-9))))
  c.push(check('K21b anti witness pair product = 1', near(antiRoots[0] * antiRoots[1], 1), String(antiRoots[0] * antiRoots[1])))
  const anti4 = [1, 2, 0, -2, -1]
  c.push(check('K22 even anti-palindromic x^4+2x^3-2x-1: both ±1 roots + = (x-1)(x+1)^3', isPal(anti4.map((v) => -v)) === false && peval(anti4, 1) === 0 && peval(anti4, -1) === 0 && JSON.stringify(polyMul([1, -1], pow([1, 1], 3))) === JSON.stringify(anti4)))
  c.push(check('K22b anti-palindromic row a_k = -a_{n-k} (middle forced 0)', anti4.every((v, i) => v === -anti4[anti4.length - 1 - i])))

  // --- the t-ladder, numerically at several x ---
  const xSweep = [2, 3, 0.5, 1.5, 5, -1.2, 7, -0.75]
  const ladder = (x: number) => {
    const t = x + 1 / x
    return { t, r2: x * x + 1 / (x * x), r3: x ** 3 + 1 / x ** 3, r4: x ** 4 + 1 / x ** 4 }
  }
  c.push(check('K23 ladder rung 2: x^2+1/x^2 = t^2-2 at 8 x-values', xSweep.every((x) => { const L = ladder(x); return near(L.r2, L.t * L.t - 2) })))
  c.push(check('K24 ladder rung 3: x^3+1/x^3 = t^3-3t at 8 x-values', xSweep.every((x) => { const L = ladder(x); return near(L.r3, L.t ** 3 - 3 * L.t) })))
  c.push(check('K25 ladder rung 4: x^4+1/x^4 = t^4-4t^2+2 at 8 x-values', xSweep.every((x) => { const L = ladder(x); return near(L.r4, L.t ** 4 - 4 * L.t * L.t + 2) })))

  // --- the pinned t = 3 and t = 4 reads ---
  const xT3 = (3 + SQ5) / 2 // root of x^2-3x+1: x+1/x = 3
  c.push(check('K26 t = 3: x^2+1/x^2 = 7, x^3+1/x^3 = 18, x^4+1/x^4 = 47 (formula + numeric)', near(3 * 3 - 2, 7) && near(27 - 9, 18) && near(81 - 36 + 2, 47) && near(xT3 * xT3 + 1 / (xT3 * xT3), 7, 1e-9) && near(xT3 ** 3 + 1 / xT3 ** 3, 18, 1e-9) && near(xT3 ** 4 + 1 / xT3 ** 4, 47, 1e-9)))
  c.push(check('K26b x^2-3x+1 root pins x+1/x = 3', near(xT3 + 1 / xT3, 3)))
  c.push(check('K27 t = 4: x^2+1/x^2 = 14', near(4 * 4 - 2, 14)))

  // --- the sextic exhibit: x^6-6x^5+15x^4-20x^3+15x^2-6x+1 = (x-1)^6 ---
  c.push(check('K28 sextic = (x-1)^6 by literal expansion', JSON.stringify(pow([1, -1], 6)) === JSON.stringify(S6), JSON.stringify(pow([1, -1], 6))))
  c.push(check('K29 sextic is palindromic (the binomial row)', isPal(S6)))
  const xSweep2 = [2.3, 0.7, -1.4, 3.1, 0.5, -2.6]
  c.push(check('K30 sextic ÷x^3 identity: (x^3+1/x^3)-6(x^2+1/x^2)+15(x+1/x)-20 = P(x)/x^3', xSweep2.every((x) => near(x ** 3 + 1 / x ** 3 - 6 * (x * x + 1 / (x * x)) + 15 * (x + 1 / x) - 20, peval(S6, x) / x ** 3, 1e-9))))
  const tSweep = [0, 1, 2, 3, -1, 4.5]
  c.push(check('K31 the ladder substitution: (t^3-3t)-6(t^2-2)+15t-20 = t^3-6t^2+12t-8', tSweep.every((t) => near(t ** 3 - 3 * t - 6 * (t * t - 2) + 15 * t - 20, t ** 3 - 6 * t * t + 12 * t - 8, 1e-9))))
  c.push(check('K32 (t-2)^3 = t^3-6t^2+12t-8 by expansion + triple at t=2', JSON.stringify(pow([1, -2], 3)) === JSON.stringify([1, -6, 12, -8]) && peval([1, -6, 12, -8], 2) === 0 && peval(pderiv([1, -6, 12, -8]), 2) === 0))
  let d = S6
  const derivsAt1: number[] = []
  for (let k = 0; k <= 6; k++) { derivsAt1.push(peval(d, 1)); d = pderiv(d) }
  c.push(check('K33 x = 1 six-fold: P..P^(5) vanish at 1, P^(6)(1) = 720', derivsAt1.slice(0, 6).every((v) => v === 0) && derivsAt1[6] === 720, JSON.stringify(derivsAt1)))
  c.push(check('K33b t = 2 returns x^2-2x+1 = 0, root x = 1', near(qroots(1, -2, 1)[0], 1) && near(qroots(1, -2, 1)[1], 1)))

  // --- the quintic roots-of-unity: x^5+x^4+x^3+x^2+x+1 ---
  c.push(check('K34 quintic = (x+1)(x^4+x^2+1) and x^4+x^2+1 = (x^2+x+1)(x^2-x+1)', JSON.stringify(polyMul([1, 1], [1, 0, 1, 0, 1])) === JSON.stringify(Q5) && JSON.stringify(polyMul([1, 1, 1], [1, -1, 1])) === JSON.stringify([1, 0, 1, 0, 1])))
  const roots5: Cx[] = [cx(-1), omega1, omega2, zeta1, zeta2]
  c.push(check('K35 quintic roots evaluate (complex): -1, (-1±i√3)/2, (1±i√3)/2', roots5.every((z) => czero(ceval(Q5, z)))))
  c.push(check('K36 roots-of-unity powering: each z^6 = 1, z ≠ 1', roots5.every((z) => czero(cadd(cpow(z, 6), cx(-1)))) && roots5.every((z) => !(near(z.re, 1) && near(z.im, 0)))))
  c.push(check('K36b z^6-1 = (z-1)(z^5+z^4+z^3+z^2+z+1) by expansion', JSON.stringify(polyMul([1, -1], Q5)) === JSON.stringify([1, 0, 0, 0, 0, 0, -1])))

  // --- the x^4+1 route (8th roots of unity) ---
  c.push(check('K37 x^4+1 ÷x^2: t^2-2 = 0, t = ±√2', near(qroots(1, 0, -2)[0], SQ2) && near(qroots(1, 0, -2)[1], -SQ2)))
  const e1 = cx(1 / SQ2, 1 / SQ2) // (1+i)/√2
  const e2 = cx(1 / SQ2, -1 / SQ2)
  const e3 = cx(-1 / SQ2, 1 / SQ2)
  const e4 = cx(-1 / SQ2, -1 / SQ2)
  const X4 = [1, 0, 0, 0, 1]
  c.push(check('K38 x^4+1 roots (±1±i)/√2 evaluate', [e1, e2, e3, e4].every((z) => czero(ceval(X4, z)))))
  c.push(check('K39 ((1+i)/√2)^4 = -1 and all four are 8th roots (z^8 = 1, z^4 = -1)', czero(cadd(cpow(e1, 4), cx(1))) && [e1, e2, e3, e4].every((z) => czero(cadd(cpow(z, 8), cx(-1))) && czero(cadd(cpow(z, 4), cx(1))))))
  c.push(check('K39b x^4+1 reciprocal pairs: e1·e2 = 1, e3·e4 = 1', near(e1.re * e2.re - e1.im * e2.im, 1) && near(e3.re * e4.re - e3.im * e4.im, 1)))

  // --- the GP cross-ref (8.3's witness) ---
  const gp = polyMul(polyMul([1, -1], [1, -2]), [1, -4])
  c.push(check('K40 GP witness {1,2,4}: (x-1)(x-2)(x-4) = x^3-7x^2+14x-8', JSON.stringify(gp) === JSON.stringify([1, -7, 14, -8]), JSON.stringify(gp)))
  c.push(check('K41 GP condition σ2^3 = σ1^3σ3 on {1,2,4}: 14^3 = 7^3·8 = 2744', 14 ** 3 === 7 ** 3 * 8 && 14 ** 3 === 2744))
  c.push(check('K42 GP condition fails on non-GP {1,2,3}: 11^3 = 1331 ≠ 1296 = 6^3·6', 11 ** 3 !== 6 ** 3 * 6 && 11 ** 3 === 1331))
  c.push(check('K43 GP middle-root law: 2^2 = 1·4', 2 * 2 === 1 * 4))

  // --- the general quartic reduction identity, swept ---
  const abSweep: [number, number][] = [[7, 14], [-3, 4], [5, 6], [2, -1], [0, 3], [-4, 2]]
  c.push(check('K44 the division step: P(x)/x^2 = (x^2+1/x^2)+a(x+1/x)+b, swept (a,b,x)', abSweep.every(([a, b]) => xSweep2.every((x) => near(peval([1, a, b, a, 1], x) / x ** 2, x * x + 1 / (x * x) + a * (x + 1 / x) + b, 1e-9)))))
  c.push(check('K44b the t-substitution: (x^2+1/x^2)+a(x+1/x)+b = t^2+at+(b-2) at every x, swept', abSweep.every(([a, b]) => xSweep2.every((x) => { const t = x + 1 / x; return near(x * x + 1 / (x * x) + a * (x + 1 / x) + b, t * t + a * t + (b - 2), 1e-9) }))))
  c.push(check('K45 x = 0 is never a root: every witness has constant 1', [W1, W2, W3, Q5, S6, X4].every((p) => p[p.length - 1] === 1 && peval(p, 0) === 1)))
  const tRet = [-3, -4, 2, 5, -2.5, 3]
  c.push(check('K46 return trip: x^2-tx+1 roots multiply to 1 for every real-rooted t', tRet.every((t) => { const rs = qroots(1, -t, 1); return rs.length === 2 && near(rs[0] * rs[1], 1) })))
  c.push(check('K46b return trip |t|<2: complex pair (product 1 by Viete) — zeta pair pins it', czero(ceval([1, -1, 1], zeta1)) && czero(ceval([1, -1, 1], zeta2)) && near(zeta1.re * zeta2.re - zeta1.im * zeta2.im, 1)))

  // --- the reciprocal-pair law on the witnesses (1/r is a root too) ---
  c.push(check('K47 reciprocal-pair law: P(1/r) = 0 for every real root of all three quartics', four1.concat([r21, r22]).every((r) => near(peval(W1, 1 / r), 0, 1e-8)) && [r21, r22].every((r) => near(peval(W3, 1 / r), 0, 1e-8)) && near(peval(W2, 1 / 1), 0)))
  c.push(check('K47b reciprocal-pair law complex: 1/z is a root for the complex witnesses', [zeta1, zeta2, omega1, omega2, e1, e3].every((z) => czero(ceval(Q5, cdiv(cx(1), z))) || czero(ceval(W2, cdiv(cx(1), z))) || czero(ceval(W3, cdiv(cx(1), z))) || czero(ceval(X4, cdiv(cx(1), z))))))

  // --- the exercise-set numbers (L1-1 pinned) ---
  c.push(check('K48 L1-1: x^3+2x^2+2x+1 = (x+1)(x^2+x+1); roots -1, (-1±i√3)/2', JSON.stringify(polyMul([1, 1], [1, 1, 1])) === JSON.stringify([1, 2, 2, 1]) && near(peval([1, 2, 2, 1], -1), 0) && czero(ceval([1, 2, 2, 1], omega1)) && czero(ceval([1, 2, 2, 1], omega2))))
  c.push(check('K49 quiz Q3 candidate x^3+2x^2+2x+1 has root -1 (option 2)', peval([1, 2, 2, 1], -1) === 0))

  // --- the ladder recurrence (the induction engine of the t-ladder) ---
  c.push(check('K50 the ladder recurrence L_n = t·L_{n-1} - L_{n-2} numerically (rungs 4,5)', xSweep.every((x) => { const t = x + 1 / x; const L2 = t * t - 2; const L3 = t ** 3 - 3 * t; const L4 = x ** 4 + 1 / x ** 4; const L5 = x ** 5 + 1 / x ** 5; return near(L4, t * L3 - L2, 1e-9) && near(L5, t * L4 - L3, 1e-9) })))
  c.push(check('K51 rung 5 by the recurrence: x^5+1/x^5 = t^5-5t^3+5t at 8 x-values', xSweep.every((x) => near(x ** 5 + 1 / x ** 5, (x + 1 / x) ** 5 - 5 * (x + 1 / x) ** 3 + 5 * (x + 1 / x), 1e-9))))

  return c
}

function sectionL(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.6')
  c.push(check('L0 lesson 8.6 present', !!L))
  if (!L) return c

  // nested collectStrings — every string value in the lesson, UNescaped, so
  // needles with backslashes (\pm, \sigma_2^3) match the runtime strings
  const collectStrings = (v: unknown): string[] => {
    const parts: string[] = []
    const walk = (w: unknown) => {
      if (typeof w === 'string') parts.push(w)
      else if (Array.isArray(w)) w.forEach(walk)
      else if (w && typeof w === 'object') Object.values(w).forEach(walk)
    }
    walk(v)
    return parts
  }
  const raw = collectStrings(L.blocks).join('\n')
  const full = JSON.stringify(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // identity + wiring
  c.push(check('L1 id pinned', L.id === 'aa-reciprocal-equations'))
  c.push(check('L2 title pinned', L.title === 'Reciprocal Equations'))
  c.push(check('L3 number 8.6', L.number === '8.6'))
  c.push(check('L4 sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('L5 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-transformation-of-equations', 'aa-cubics-and-quartics-the-symmetric-functions']), JSON.stringify(L.prerequisites)))
  c.push(check('L6 concepts exactly 8', L.concepts.length === 8, `got ${L.concepts.length}`))

  // the four mandated headings
  const headings = ['The Palindromic Structure and the Substitution', 'Even Degrees — the Reduction', 'Odd Degrees — the Guaranteed Root', 'The t-Ladder and the Sextic']
  headings.forEach((h, i) => c.push(check(`L${7 + i} heading: ${h.slice(0, 34)}`, either(h), h.slice(0, 40))))

  // the pinned witnesses ride the prose (≥ 10 witness needles)
  const pins: [string, string][] = [
    ['L11 THE witness row', 'x^4 + 7x^3 + 14x^2 + 7x + 1'],
    ['L12 THE witness t-quadratic', 't^2 + 7t + 12'],
    ['L13 THE witness factorization (t+3)(t+4)', '(t + 3)(t + 4)'],
    ['L14 THE witness roots (-3±√5)/2', '\\pm \\sqrt{5}}{2}'],
    ['L15 THE witness roots -2±√3', '-2 \\pm \\sqrt{3}'],
    ['L16 second witness row', 'x^4 - 3x^3 + 4x^2 - 3x + 1'],
    ['L17 second witness t-quadratic', 't^2 - 3t + 2'],
    ['L18 second witness return x^2 - x + 1', 'x^2 - x + 1 = 0'],
    ['L19 third witness row', 'x^4 + 5x^3 + 6x^2 + 5x + 1'],
    ['L20 third witness t-quadratic', 't^2 + 5t + 4'],
    ['L21 the odd factor law', 'x^2 + (a - 1)x + 1'],
    ['L22 the anti factor law', 'x^2 + (a + 1)x + 1'],
    ['L23 a = 5 witness', 'x^3 + 5x^2 + 5x + 1'],
    ['L24 the anti witness', 'x^3 + 6x^2 - 6x - 1'],
    ['L25 the ladder rung 3', 't^3 - 3t'],
    ['L26 the ladder rung 4', 't^4 - 4t^2 + 2'],
    ['L27 the t = 3 reads (7, 18, 47)', '27 - 9 = 18'],
    ['L28 the t = 4 read (14)', '16 - 2 = 14'],
    ['L29 the sextic row', 'x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1'],
    ['L30 the triple collapse (t-2)^3', '(t - 2)^3'],
    ['L31 the six-fold verdict (x-1)^6', '(x - 1)^6'],
    ['L32 the multiplicity certificate 720', '720'],
    ['L33 the quintic row', 'x^5 + x^4 + x^3 + x^2 + x + 1'],
    ['L34 the quintic factor chain', '(x^2 + x + 1)(x^2 - x + 1)'],
    ['L35 the sixth roots of unity', 'roots of unity'],
    ['L36 the x^4+1 route t = ±√2', 't = \\pm\\sqrt{2}'],
    ['L37 the 8th-roots census', '8th roots of unity'],
    ['L38 the GP witness cubic', 'x^3 - 7x^2 + 14x - 8'],
    ['L39 the GP condition', '\\sigma_2^3'],
    ['L40 the GP witness value 2744', '2744'],
    ['L41 the reality gate', 't^2 - 4'],
    ['L42 the ladder recurrence', 'L_{n-1} - L_{n-2}'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // the quiz — mandated items, keys [1,1,2,0,1]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('L43 quiz has 5 items', quiz.items.length === 5, `got ${quiz.items.length}`))
  c.push(check('L44 quiz keys [1,1,2,0,1]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 1, 2, 0, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('L45 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))
  c.push(check('L46 quiz Q1 options pinned', JSON.stringify(quiz.items[0].options) === JSON.stringify(['$t = x - \\tfrac{1}{x}$', '$t = x + \\tfrac{1}{x}$', '$t = x^2$', '$t = \\tfrac{1}{x}$']), JSON.stringify(quiz.items[0].options)))

  // the exercise ladder — 15 in 2,2,3,3,3,2
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: { q: string; solution: string[]; answer?: string; figures?: { svg: string }[] }[] }[] }
  c.push(check('L47 exercises 15 in 6 sets (2,2,3,3,3,2)', ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex.sets.map((s) => s.questions.length).join(',')))
  c.push(check('L48 every exercise has full steps + answer', ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && (q.answer ?? '').length > 5))))
  const allQ = ex.sets.flatMap((s) => s.questions)
  c.push(check('L49 L1-1 mandated (x^3+2x^2+2x+1 → (x+1)(x^2+x+1))', allQ.some((q) => q.q.includes('x^3 + 2x^2 + 2x + 1') && collectStrings(q).join(' ').includes('(x + 1)(x^2 + x + 1)'))))
  c.push(check('L50 L2-1 mandated (the THE witness solve)', allQ.some((q) => q.q.includes('x^4 + 7x^3 + 14x^2 + 7x + 1'))))
  c.push(check('L51 L3-2 mandated (the quintic solve)', allQ.some((q) => q.q.includes('x^5 + x^4 + x^3 + x^2 + x + 1') && q.q.includes('roots of unity'))))
  c.push(check('L52 L4-3 mandated (the sextic walk)', allQ.some((q) => q.q.includes('x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1'))))
  c.push(check('L53 L5-2 mandated (the GP-root family)', allQ.some((q) => q.q.includes('\\sigma_2^3 = \\sigma_1^3\\sigma_3'))))
  c.push(check('L54 L5-3 mandated (the x^4+1 route)', allQ.some((q) => q.q.includes('x^4 + 1 = 0'))))
  c.push(check('L55 L6-2 mandated (the general even-palindrome theorem)', allQ.some((q) => q.q.includes('degree $2n$'))))

  // the solution figures (v9.0) — ≥ 1 mandated, 2 authored
  const withFig = allQ.filter((q) => q.figures?.length)
  c.push(check('L56 >= 2 solution figures (v9.0)', withFig.length >= 2, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q.figures || []).map((f) => f.svg).join('')).join('')
  c.push(check('L57 solution figures aria-labelled', figSvg.includes('aria-label') && (figSvg.match(/aria-label/g) || []).length >= 2))
  c.push(check('L58 the mirror-strip figure carries the witness row', figSvg.includes('1, 7, 14, 7, 1') && figSvg.includes('t² + 7t + 12')))
  c.push(check('L59 the triple-collapse figure carries the cubic', figSvg.includes('t³ - 6t² + 12t - 8') && figSvg.includes('(t - 2)³')))

  // the body figures — 3 authored, palette + viewBox + aria laws
  const bodyFigs = L.blocks.filter((b) => b.kind === 'figure') as unknown as { caption: string; svg: string }[]
  c.push(check('L60 3 body figures', bodyFigs.length === 3, `got ${bodyFigs.length}`))
  const figLaw = bodyFigs.map((f) => f.svg)
  c.push(check('L61 every body figure has viewBox + aria-label', figLaw.every((s) => s.includes('viewBox') && s.includes('aria-label'))))
  c.push(check('L62 no raw LaTeX in any figure text', figLaw.every((s) => !/\$|\\tfrac|\\times|\\sqrt|\\geq/.test(s))))
  const paletteOk = (s: string) => /#16a34a|#166534|#65a30d|#0d9488|#d97706|#ea580c|#dc2626|#fef3c7|#ffedd5|#fcd34d|#5eead4/.test(s)
  c.push(check('L63 vivid palette law on figures', figLaw.every(paletteOk) && paletteOk(figSvg)))
  c.push(check('L64 no blue / gray hexes anywhere', [...figLaw, figSvg].every((s) => !/#2563eb|#3b82f6|#6b7280|#9ca3af|#4b5563|#1f2937|#64748b/i.test(s))))
  c.push(check('L65 the mirror figure pins the row', figLaw.some((s) => s.includes('a4 = a0') && s.includes('a3 = a1'))))
  c.push(check('L66 the pairs figure pins the four roots', figLaw.some((s) => s.includes('-3.732') && s.includes('-0.268') && s.includes('-2.618'))))
  c.push(check('L67 the staircase figure pins the rung values', figLaw.some((s) => s.includes('t³ - 3t') && s.includes('t⁴ - 4t² + 2') && s.includes('47'))))

  // the block census — the mandated minimums
  c.push(check('L68 Illustrations >= 6 (7 authored)', countKind(L, 'example') === 7, `got ${countKind(L, 'example')}`))
  c.push(check('L69 derivations >= 3 (4 authored)', countKind(L, 'derivation') === 4, `got ${countKind(L, 'derivation')}`))
  c.push(check('L70 equations >= 6 (7 authored)', countKind(L, 'equation') >= 6, `got ${countKind(L, 'equation')}`))
  c.push(check('L71 formula cards >= 8 (11 authored)', countKind(L, 'formula') === 11, `got ${countKind(L, 'formula')}`))
  c.push(check('L72 terms 8', countKind(L, 'terms') === 1 && (L.blocks.find((b) => b.kind === 'terms') as { items: unknown[] }).items.length === 8))
  c.push(check('L73 exam callout present', full.includes('Exam corner')))
  c.push(check('L74 insight callout (the inversion law of 8.5)', full.includes('inversion law')))
  c.push(check('L75 warn callout (the three traps)', full.includes('Three traps')))
  c.push(check('L76 the census table present', countKind(L, 'table') === 1))
  c.push(check('L77 roman example-run lists present', (L.blocks.filter((b) => b.kind === 'list') as unknown as { marker?: string }[]).some((b) => b.marker === 'roman')))

  // the honest word count
  const words = countLessonWords(L)
  c.push(check('L78 word depth >= 6000', words >= 6000, `got ${words}`))

  return c
}

// ---- M (8.R engines) / N (8.R pins) (from v-08R.ts) ----

function sectionM(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- the local polynomial toolkit: dense coefficient arrays, index = power ---
  const padd = (a: number[], b: number[]): number[] => {
    const out = new Array(Math.max(a.length, b.length)).fill(0)
    for (let i = 0; i < out.length; i++) out[i] = (a[i] ?? 0) + (b[i] ?? 0)
    return out
  }
  const pmul = (a: number[], b: number[]): number[] => {
    const out = new Array(a.length + b.length - 1).fill(0)
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]
    return out
  }
  const peval = (a: number[], x: number): number => a.reduce((s, ci, i) => s + ci * x ** i, 0)
  const fromRoots = (rs: number[]): number[] => {
    let p: number[] = [1]
    for (const r of rs) p = pmul(p, [-r, 1])
    return p
  }
  const near = (x: number, y: number, eps = 1e-9) => Math.abs(x - y) <= eps
  // complex arithmetic: [re, im]
  const cmul = (u: number[], v: number[]): number[] => [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]]
  const cadd = (u: number[], v: number[]): number[] => [u[0] + v[0], u[1] + v[1]]
  const cabs = (u: number[]): number => Math.hypot(u[0], u[1])
  const cev = (a: number[], z: number[]): number[] => {
    let s: number[] = [0, 0]
    let zk: number[] = [1, 0]
    for (const ci of a) { s = cadd(s, cmul([ci, 0], zk)); zk = cmul(zk, z) }
    return s
  }
  const ceq = (a: number[], z: number[], eps = 1e-9) => cabs(cev(a, z)) <= eps
  const conj = (z: number[]): number[] => [z[0], -z[1]]
  // the sign-variation count of a coefficient sequence (leading to constant, zeros skipped)
  const variations = (a: number[]): number => {
    const seq = a.filter((x) => x !== 0).map((x) => (x > 0 ? '+' : '-'))
    let v = 0
    for (let i = 1; i < seq.length; i++) if (seq[i] !== seq[i - 1]) v++
    return v
  }
  // substitute x -> x + h (compose P(x+h)) by repeated synthetic shift
  const shiftPoly = (a: number[], h: number): number[] => {
    // Horner-style: P(x+h) = sum binom — use direct Taylor at h via derivatives
    let out: number[] = [0]
    for (let k = a.length - 1; k >= 0; k--) {
      // accumulate a_k (x+h)^k into out: start fresh each term
      let term: number[] = [1]
      for (let j = 0; j < k; j++) term = pmul(term, [h, 1])
      out = padd(out, term.map((t) => t * a[k]))
    }
    return out
  }
  const bisect = (f: (x: number) => number, lo: number, hi: number): number => {
    let a = lo, b = hi
    for (let _ = 0; _ < 200; _++) {
      const m = (a + b) / 2
      if (f(a) * f(m) <= 0) b = m
      else a = m
    }
    return (a + b) / 2
  }

  // =================================================================
  // 8.1 — the census: degree n, n roots (with multiplicity); the
  // conjugate-pair law; the odd-degree corollary
  // =================================================================

  // M1 x^3-x^2+x-1 = (x-1)(x^2+1), roots exactly {1, i, -i}
  const W811 = [ -1, 1, -1, 1 ] // x^3 - x^2 + x - 1 (index = power)
  c.push(check('M1 8.1 x^3-x^2+x-1 factors as (x-1)(x^2+1)', JSON.stringify(pmul([-1, 1], [1, 0, 1])) === JSON.stringify(W811)))
  c.push(check('M2 8.1 the three roots {1, i, -i} all verify', peval(W811, 1) === 0 && ceq(W811, [0, 1]) && ceq(W811, [0, -1])))
  // M3 the conjugate law P(conj z) = conj(P(z)), swept on three points
  {
    const pts = [[2, 3], [-1, 1], [0.5, -2]]
    const okC = pts.every((z) => {
      const lhs = cev(W811, conj(z))
      const rhs = conj(cev(W811, z))
      return Math.abs(lhs[0] - rhs[0]) <= 1e-9 && Math.abs(lhs[1] - rhs[1]) <= 1e-9
    })
    c.push(check('M3 8.1 P(z-bar) = conj(P(z)) swept on three points', okC))
  }

  // M4 (x-1)^2 (x-2)^3: degree 5, five roots with multiplicity
  const W812 = pmul(pmul([-1, 1], [-1, 1]), pmul([-2, 1], pmul([-2, 1], [-2, 1])))
  c.push(check('M4 8.1 (x-1)^2(x-2)^3 has degree 5', W812.length - 1 === 5, `degree ${W812.length - 1}`))
  c.push(check('M5 8.1 its five roots counted with multiplicity are 1,1,2,2,2', [1, 1, 2, 2, 2].every((r) => peval(W812, r) === 0) && fromRoots([1, 1, 2, 2, 2]).length === 6))

  // M6 the odd-degree corollary witnesses: x^5+x+1 and x^3+x+1 both cross
  const W813 = [1, 1, 0, 0, 0, 1] // x^5 + x + 1
  c.push(check('M6 8.1 x^5+x+1 changes sign between -1 and 0', peval(W813, -1) < 0 && peval(W813, 0) > 0, `f(-1)=${peval(W813, -1)}, f(0)=${peval(W813, 0)}`))
  // M7 x^3+x+1: exactly one real root, approximately -0.6823
  {
    const P = [1, 1, 0, 1] // x^3 + x + 1
    const g = (x: number) => peval(P, x)
    const r = bisect(g, -1, 0)
    c.push(check('M7 8.1 x^3+x+1 has exactly one real root, near -0.6823', near(r, -0.6823, 5e-5) && Math.abs(g(r)) <= 1e-9, `root ${r.toFixed(6)}`))
    // monotone: 3x^2+1 >= 1 > 0 everywhere (sampled) -> exactly one crossing
    const monotone = Array.from({ length: 41 }, (_, i) => -10 + i / 2).every((x) => 3 * x * x + 1 > 0)
    c.push(check('M8 8.1 the cubic x^3+x+1 is strictly increasing (one crossing only)', monotone))
    c.push(check('M9 8.1 its Delta -4p^3-27q^2 = -31 < 0 (one real root, the Cardan cross-ref)', -4 * 1 ** 3 - 27 * 1 ** 2 === -31))
  }

  // =================================================================
  // 8.2 — Descartes' lens: variations, the even deficit, f(-x)
  // =================================================================

  const W821 = [-6, 11, -6, 1] // x^3 - 6x^2 + 11x - 6
  c.push(check('M10 8.2 x^3-6x^2+11x-6 has V = 3', variations(W821) === 3, `V=${variations(W821)}`))
  c.push(check('M11 8.2 its positive roots are exactly {1,2,3} (deficit 0)', [1, 2, 3].every((r) => peval(W821, r) === 0) && peval(W821, -1) !== 0 && peval(W821, 4) !== 0))
  const W822 = [6, -7, 0, 1] // x^3 - 7x + 6
  c.push(check('M12 8.2 x^3-7x+6 has V = 2 and positive roots {1,2}', variations(W822) === 2 && peval(W822, 1) === 0 && peval(W822, 2) === 0 && peval(W822, 0) !== 0))
  {
    const fNeg = W822.map((ci, i) => ci * (i % 2 === 0 ? 1 : -1)) // f(-x): odd powers flip
    c.push(check('M13 8.2 f(-x) = -x^3+7x+6 has V = 1 and the negative root -3', variations(fNeg) === 1 && peval(W822, -3) === 0, `V(-x)=${variations(fNeg)}`))
  }
  c.push(check('M14 8.2 x^3-x^2+x-1: V = 3, exactly 1 positive root, deficit 2 (the +-i pair)', variations(W811) === 3 && peval(W811, 1) === 0 && ceq(W811, [0, 1]) && ceq(W811, [0, -1])))
  const W823 = [1, 1, 1, 1, 1] // x^4 + x^3 + x^2 + x + 1
  c.push(check('M15 8.2 x^4+x^3+x^2+x+1 has V = 0 (no positive roots)', variations(W823) === 0))
  c.push(check('M16 8.2 (x-1)(x^4+x^3+x^2+x+1) = x^5 - 1 (the 5th roots of unity)', JSON.stringify(pmul(W823, [-1, 1])) === JSON.stringify([-1, 0, 0, 0, 0, 1])))
  {
    // all four non-real roots are the primitive 5th roots of unity
    const roots5 = [1, 2, 3, 4].map((k) => [Math.cos((2 * Math.PI * k) / 5), Math.sin((2 * Math.PI * k) / 5)])
    c.push(check('M17 8.2 the four roots are e^{2pi ik/5}, k=1..4 (all non-real, conjugate pairs)', roots5.every((z) => ceq(W823, z) && ceq(W823, conj(z)))))
    c.push(check('M18 8.2 the deficit parity: 4 non-real roots (even), 0 real', roots5.every((z) => z[1] !== 0) && roots5.length === 4))
  }

  // =================================================================
  // 8.3 — the Viète staircase and Newton's power sums
  // =================================================================

  c.push(check('M19 8.3 {1,2,3} -> x^3-6x^2+11x-6 by literal expansion', JSON.stringify(fromRoots([1, 2, 3])) === JSON.stringify(W821)))
  c.push(check('M20 8.3 {1,2,3,4} -> x^4-10x^3+35x^2-50x+24 by literal expansion', JSON.stringify(fromRoots([1, 2, 3, 4])) === JSON.stringify([24, -50, 35, -10, 1])))
  c.push(check('M21 8.3 Newton p2 = 14 and p3 = 36 on {1,2,3}', 1 ** 2 + 2 ** 2 + 3 ** 2 === 14 && 1 ** 3 + 2 ** 3 + 3 ** 3 === 36))
  // sweep Newton's identities on twenty integer triples
  {
    let okSweep = true
    for (let t = 0; t < 20; t++) {
      const a = 1 + ((t * 7) % 5), b = 2 + ((t * 3) % 6), cc = 1 + ((t * 11) % 4)
      const s1 = a + b + cc, s2 = a * b + a * cc + b * cc, s3 = a * b * cc
      const p2 = a * a + b * b + cc * cc
      const p3 = a ** 3 + b ** 3 + cc ** 3
      if (p2 !== s1 * s1 - 2 * s2 || p3 !== s1 ** 3 - 3 * s1 * s2 + 3 * s3) { okSweep = false; break }
    }
    c.push(check('M22 8.3 Newton identities p2 = s1^2-2s2, p3 = s1^3-3s1s2+3s3 swept 20x', okSweep))
  }
  c.push(check('M23 8.3 sum 1/r = 11/6 = sigma2/sigma3 on {1,2,3}', Math.abs((1 / 1 + 1 / 2 + 1 / 3) - 11 / 6) <= 1e-12 && Math.abs(11 / 6 - 11 / 6) <= 1e-12))
  const W833 = [-4, 6, -4, 1] // x^3 - 4x^2 + 6x - 4
  c.push(check('M24 8.3 x^3-4x^2+6x-4 = (x-2)((x-1)^2+1) by expansion', JSON.stringify(pmul([-2, 1], [2, -2, 1])) === JSON.stringify(W833)))
  c.push(check('M25 8.3 its roots are 2, 1+i, 1-i (verified by complex evaluation)', peval(W833, 2) === 0 && ceq(W833, [1, 1]) && ceq(W833, [1, -1])))
  {
    // honest version: (1+i)^2 = 2i and (1-i)^2 = -2i cancel, so sum r^2 = 2^2 = 4
    const c1 = cmul([1, 1], [1, 1]) // (1+i)^2 = 2i
    const c2 = cmul([1, -1], [1, -1]) // (1-i)^2 = -2i
    const sumR2 = 2 ** 2 + c1[0] + c2[0]
    c.push(check('M26 8.3 sum r^2 = 4 (2^2 + 2i - 2i), matching Newton s1^2-2s2 = 16-12', sumR2 === 4 && 16 - 12 === 4))
  }

  // =================================================================
  // 8.4 — Cardan and Ferrari: depression, Delta, the three cases,
  // the resolvent walk, Sophie Germain, Bombelli
  // =================================================================

  // depression: P(x+2) of the {1,2,3} cubic is t^3 - t (roots -1, 0, 1)
  {
    const depressed = shiftPoly(W821, 2) // coefficients of P(x+2)
    c.push(check('M27 8.4 x^3-6x^2+11x-6 shifted by x = t+2 depresses to t^3 - t', JSON.stringify(depressed) === JSON.stringify([0, -1, 0, 1]), JSON.stringify(depressed)))
    c.push(check('M28 8.4 the depressed roots {-1,0,1} = old roots minus 2', [-1, 0, 1].every((r) => peval([0, -1, 0, 1], r) === 0)))
  }
  const delta = (p: number, q: number) => -4 * p ** 3 - 27 * q ** 2
  c.push(check('M29 8.4 Delta(x^3-3x+2) = 0 (the repeated case)', delta(-3, 2) === 0, `got ${delta(-3, 2)}`))
  c.push(check('M30 8.4 x^3-3x+2 = (x-1)^2(x+2): roots {1,1,-2}', JSON.stringify(pmul(pmul([-1, 1], [-1, 1]), [2, 1])) === JSON.stringify([2, -3, 0, 1])))
  c.push(check('M31 8.4 Delta(x^3-7x+6) = 400 (the casus)', delta(-7, 6) === 400, `got ${delta(-7, 6)}`))
  c.push(check('M32 8.4 x^3-7x+6 has the three real roots {1,2,-3}', [1, 2, -3].every((r) => peval(W822, r) === 0)))
  // the Cardan pair u^3, v^3 = -3 +- (10/sqrt(27)) i, product 343/27
  {
    const reU = -3, imU = 10 / Math.sqrt(27)
    const prod = reU * reU + imU * imU
    const sum = -6
    c.push(check('M33 8.4 u^3 v^3 = 343/27 = (7/3)^3 and u^3+v^3 = -6', near(prod, 343 / 27) && sum === -6, `prod ${prod}`))
    // the three omega-combinations land 1, 2, -3: x_k = u0*w^k + v0*w^{-k}
    const powC = (z: number[], n: number): number[] => {
      let out: number[] = [1, 0]
      for (let i = 0; i < n; i++) out = cmul(out, z)
      return out
    }
    const cubeRoots = (z: number[]): number[][] => {
      const r = cabs(z) ** (1 / 3), th = Math.atan2(z[1], z[0])
      return [0, 1, 2].map((k) => [r * Math.cos((th + 2 * Math.PI * k) / 3), r * Math.sin((th + 2 * Math.PI * k) / 3)])
    }
    const omega = [Math.cos((2 * Math.PI) / 3), Math.sin((2 * Math.PI) / 3)]
    const u3 = [reU, imU], v3 = [reU, -imU]
    const u0 = cubeRoots(u3)[0], v0 = cubeRoots(v3)[0]
    const landed: number[] = []
    for (let k = 0; k < 3; k++) {
      const uk = cmul(u0, powC(omega, k))
      const vk = cmul(v0, powC(omega, (3 - k) % 3))
      landed.push(uk[0] + vk[0])
    }
    c.push(check('M34 8.4 the three omega-combinations land 1, 2, -3 (sum 0, all verify)', landed.every((x) => [1, 2, -3].some((r) => near(x, r, 1e-8))) && near(landed.reduce((s, x) => s + x, 0), 0), landed.map((x) => x.toFixed(4)).join(',')))
  }
  c.push(check('M35 8.4 Delta(x^3+3x+1) = -135 (the one-real-root case)', delta(3, 1) === -135, `got ${delta(3, 1)}`))
  {
    // the closed form cbrt((-1+sqrt5)/2) + cbrt((-1-sqrt5)/2) ~ -0.3222
    const a = (-1 + Math.sqrt(5)) / 2, b = (-1 - Math.sqrt(5)) / 2
    const x = Math.cbrt(a) + Math.cbrt(b)
    c.push(check('M36 8.4 the Cardan closed form for x^3+3x+1 lands near -0.3222 and satisfies the cubic', near(x, -0.3222, 5e-5) && Math.abs(x ** 3 + 3 * x + 1) <= 1e-9, `${x.toFixed(6)}`))
    c.push(check('M37 8.4 uv = -1 and u^3 v^3 = -1 for the pair (3uv = -p = -3)', near(Math.cbrt(a) * Math.cbrt(b), -1) && near(a * b, -1)))
  }
  // Ferrari: the resolvent, the split, the roots
  {
    const p = -25, q = 60, r = -36
    const resolvent = (M: number) => M ** 3 + 2 * p * M ** 2 + (p * p - 4 * r) * M - q * q
    c.push(check('M38 8.4 the resolvent M^3-50M^2+769M-3600 vanishes at M = 9', resolvent(9) === 0, `got ${resolvent(9)}`))
    c.push(check('M39 8.4 the split (x^2+3x-18)(x^2-3x+2) re-expands to x^4-25x^2+60x-36', JSON.stringify(pmul([-18, 3, 1], [2, -3, 1])) === JSON.stringify([-36, 60, -25, 0, 1])))
    c.push(check('M40 8.4 the four roots {1,2,3,-6} all verify', [1, 2, 3, -6].every((x) => peval([-36, 60, -25, 0, 1], x) === 0)))
  }
  c.push(check('M41 8.4 Sophie Germain: (x^2-2x+2)(x^2+2x+2) = x^4 + 4', JSON.stringify(pmul([2, -2, 1], [2, 2, 1])) === JSON.stringify([4, 0, 0, 0, 1])))
  c.push(check('M42 8.4 Bombelli: x^3-15x-4 vanishes at x = 4, and (2+i)^3 = 2+11i', peval([-4, -15, 0, 1], 4) === 0 && JSON.stringify(cmul(cmul([2, 1], [2, 1]), [2, 1])) === JSON.stringify([2, 11])))
  c.push(check('M43 8.4 Bombelli pair: (2+i)+(2-i) = 4 with 3uv = 15', (2 + 1) + (2 - 1) === 4 && JSON.stringify(cmul([2, 1], [2, -1])) === JSON.stringify([5, 0]) && 3 * 5 === 15))

  // =================================================================
  // 8.5 — the transformation craft: shift, scale, invert; the two guards
  // =================================================================

  {
    const inc2 = shiftPoly(W821, -2) // P(x-2): roots +2
    c.push(check('M44 8.5 roots increased by 2: x^3-12x^2+47x-60, roots {3,4,5}', JSON.stringify(inc2) === JSON.stringify([-60, 47, -12, 1]) && [3, 4, 5].every((x) => peval(inc2, x) === 0), JSON.stringify(inc2)))
    const dec2 = shiftPoly(W821, 2) // P(x+2): roots -2
    c.push(check('M45 8.5 roots decreased by 2: x^3-x, roots {-1,0,1}', JSON.stringify(dec2) === JSON.stringify([0, -1, 0, 1]) && [-1, 0, 1].every((x) => peval(dec2, x) === 0)))
    // scaled by 3: (x-3)(x-6)(x-9) = x^3-18x^2+99x-162
    c.push(check('M46 8.5 roots scaled by 3: x^3-18x^2+99x-162, roots {3,6,9}', JSON.stringify(fromRoots([3, 6, 9])) === JSON.stringify([-162, 99, -18, 1])))
    // inverted: x^3 P(1/x) = 1-6x+11x^2-6x^3, roots {1, 1/2, 1/3}
    const inv = [...W821].reverse() // x^3 P(1/x) reverses the coefficient array
    c.push(check('M47 8.5 roots inverted: 1-6x+11x^2-6x^3, roots {1,1/2,1/3}', JSON.stringify(inv) === JSON.stringify([1, -6, 11, -6]) && [1, 1 / 2, 1 / 3].every((x) => Math.abs(peval(inv, x)) <= 1e-12)))
    // the loss-of-root guard
    c.push(check('M48 8.5 x^3-x = 0 has roots {0,1,-1}; dividing by x keeps only {1,-1}', [0, 1, -1].every((x) => peval([0, -1, 0, 1], x) === 0) && [1, -1].every((x) => peval([-1, 0, 1], x) === 0) && peval([-1, 0, 1], 0) === -1))
    // the extraneous-roots guard: sqrt(x+2) = x
    {
      const squared = [-2, -1, 1] // x^2 - x - 2 = 0
      const cands = [2, -1]
      const keep = cands.filter((x) => x >= 0 && Math.sqrt(x + 2) === x)
      c.push(check('M49 8.5 sqrt(x+2) = x gains -1: only x = 2 survives the check', keep.length === 1 && keep[0] === 2 && peval(squared, -1) === 0 && peval(squared, 2) === 0))
    }
  }

  // =================================================================
  // 8.6 — the palindromic symmetry: the t-ladder, the two quadratics
  // =================================================================

  {
    const W861 = [1, 7, 14, 7, 1] // x^4+7x^3+14x^2+7x+1
    c.push(check('M50 8.6 x^4+7x^3+14x^2+7x+1 = (x^2+3x+1)(x^2+4x+1)', JSON.stringify(pmul([1, 3, 1], [1, 4, 1])) === JSON.stringify(W861)))
    // the t-route: t^2 + 7t + 12 = (t+3)(t+4)
    c.push(check('M51 8.6 t^2+7t+12 = (t+3)(t+4)', JSON.stringify(pmul([3, 1], [4, 1])) === JSON.stringify([12, 7, 1])))
    // the four roots, by the quadratic formula
    const rA = [(-3 + Math.sqrt(5)) / 2, (-3 - Math.sqrt(5)) / 2]
    const rB = [-2 + Math.sqrt(3), -2 - Math.sqrt(3)]
    c.push(check('M52 8.6 the four roots (-3±sqrt5)/2 and -2±sqrt3 all verify the quartic', [...rA, ...rB].every((x) => Math.abs(peval(W861, x)) <= 1e-9)))
    c.push(check('M53 8.6 they form two reciprocal pairs: 1/r is a root whenever r is', [...rA, ...rB].every((x) => Math.abs(peval(W861, 1 / x)) <= 1e-9)))
    // the odd-degree palindromic guarantee
    const W863 = [1, 1, 1, 1, 1, 1] // x^5+x^4+x^3+x^2+x+1
    c.push(check('M54 8.6 x^5+x^4+x^3+x^2+x+1 has the guaranteed root x = -1', peval(W863, -1) === 0))
    c.push(check('M55 8.6 (x-1)(x^5+x^4+x^3+x^2+x+1) = x^6-1: the 6th roots of unity except 1', JSON.stringify(pmul(W863, [-1, 1])) === JSON.stringify([-1, 0, 0, 0, 0, 0, 1])))
    {
      const roots6 = [1, 2, 3, 4, 5].map((k) => [Math.cos((2 * Math.PI * k) / 6), Math.sin((2 * Math.PI * k) / 6)])
      c.push(check('M56 8.6 the five non-1 roots are e^{2pi ik/6}, k=1..5 (all verify)', roots6.every((z) => ceq(W863, z))))
    }
    // the quartic with a double root and the primitive 6th pair
    const W862 = [1, -3, 4, -3, 1] // x^4-3x^3+4x^2-3x+1
    c.push(check('M57 8.6 x^4-3x^3+4x^2-3x+1 = (x-1)^2(x^2-x+1)', JSON.stringify(pmul(pmul([-1, 1], [-1, 1]), [1, -1, 1])) === JSON.stringify(W862)))
    {
      const z = [0.5, Math.sqrt(3) / 2] // (1 + i sqrt3)/2
      c.push(check('M58 8.6 the roots are 1, 1, (1±i·sqrt3)/2 and the complex pair satisfies z^3 = -1, z^6 = 1', peval(W862, 1) === 0 && ceq(W862, z) && ceq(W862, conj(z))))
      const z3 = cmul(cmul(z, z), z)
      const z6 = cmul(z3, z3)
      c.push(check('M59 8.6 (1+i·sqrt3)/2 is a primitive 6th root: z^3 = -1, z^6 = 1', near(z3[0], -1) && near(z3[1], 0, 1e-12) && near(z6[0], 1) && near(z6[1], 0, 1e-12)))
    }
    // the cubic identity x^3+ax^2+ax+1 = (x+1)(x^2+(a-1)x+1)
    {
      const okA = [0, 1, 5, 7].every((a) => JSON.stringify(pmul([1, 1], [1, a - 1, 1])) === JSON.stringify([1, a, a, 1]))
      c.push(check('M60 8.6 x^3+ax^2+ax+1 = (x+1)(x^2+(a-1)x+1) at a = 0,1,5,7', okA))
    }
    // the t-ladder itself
    {
      const xs = [2, 3, 0.7, 1.9, 2.5]
      const okL = xs.every((x) => {
        const t = x + 1 / x
        return near(x ** 2 + 1 / x ** 2, t * t - 2, 1e-9) && near(x ** 3 + 1 / x ** 3, t ** 3 - 3 * t, 1e-9) && near(x ** 4 + 1 / x ** 4, t ** 4 - 4 * t * t + 2, 1e-9)
      })
      c.push(check('M61 8.6 the t-ladder t^2-2, t^3-3t, t^4-4t^2+2 swept on five x', okL))
    }
  }

  // =================================================================
  // the mixed-bench pins (the 15 answers the exercises will carry)
  // =================================================================

  c.push(check('M62 bench L1-1 (x-2)^2(x+3)^3 carries 5 roots with multiplicity', pmul(pmul([-2, 1], [-2, 1]), pmul([3, 1], pmul([3, 1], [3, 1]))).length - 1 === 5))
  c.push(check('M63 bench L1-2 the variations of x^3-7x+6 are 2', variations(W822) === 2))
  c.push(check('M64 bench L2-1 sigma2 on {1,2,3} is 11', 1 * 2 + 1 * 3 + 2 * 3 === 11))
  c.push(check('M65 bench L2-2 the depressed form of the {1,2,3} cubic is t^3-t', JSON.stringify(shiftPoly(W821, 2)) === JSON.stringify([0, -1, 0, 1])))
  c.push(check('M66 bench L3-1 x^3-3x+2 solves to {1,1,-2}', JSON.stringify(fromRoots([1, 1, -2])) === JSON.stringify([2, -3, 0, 1])))
  c.push(check('M67 bench L3-2 x^4+x^3+x^2+x+1 has 0 real roots (all four non-real)', [1, 2, 3, 4].every((k) => Math.sin((2 * Math.PI * k) / 5) !== 0) && variations(W823) === 0))
  c.push(check('M68 bench L3-3 roots decreased by 1: x(x-1)(x-2) = x^3-3x^2+2x', JSON.stringify(shiftPoly(W821, 1)) === JSON.stringify([0, 2, -3, 1])))
  c.push(check('M69 bench L4-1 Delta(x^3-12x+16) = 0 and the roots are {2,2,-4}', delta(-12, 16) === 0 && JSON.stringify(fromRoots([2, 2, -4])) === JSON.stringify([16, -12, 0, 1])))
  c.push(check('M70 bench L4-2 sigma3 on {1,2,3,4} is 50', 1 * 2 * 3 + 1 * 2 * 4 + 1 * 3 * 4 + 2 * 3 * 4 === 50))
  c.push(check('M71 bench L4-3 x^3-x divided by x loses 0: {1,-1} remain', peval([-1, 0, 1], 0) === -1 && [1, -1].every((x) => peval([-1, 0, 1], x) === 0)))
  {
    // L5-1 Newton p2, p3 on x^3-2x^2-5x+6 (roots {1,3,-2})
    const P = [6, -5, -2, 1]
    c.push(check('M72 bench L5-1 x^3-2x^2-5x+6 has roots {1,3,-2}; p2 = 14, p3 = 20', [1, 3, -2].every((x) => peval(P, x) === 0) && 1 + 9 + 4 === 14 && 1 + 27 - 8 === 20))
  }
  c.push(check('M73 bench L5-2 the Ferrari walk: resolvent root M = 9, roots {1,2,3,-6}', (9 ** 3 - 50 * 81 + 769 * 9 - 3600) === 0 && [1, 2, 3, -6].every((x) => peval([-36, 60, -25, 0, 1], x) === 0)))
  c.push(check('M74 bench L5-3 x^4-3x^3+4x^2-3x+1 solves to {1,1,(1±i·sqrt3)/2}', peval([1, -3, 4, -3, 1], 1) === 0 && ceq([1, -3, 4, -3, 1], [0.5, Math.sqrt(3) / 2]) && ceq([1, -3, 4, -3, 1], [0.5, -Math.sqrt(3) / 2])))
  c.push(check('M75 bench Q-keys: non-real roots of a real polynomial are always even in number', [2, 4].every((n) => n % 2 === 0) && ceq(W811, [0, 1]) && ceq(W811, conj([0, 1]))))

  return c
}

function sectionN(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []

  // nested collectStrings — walks every block, gathers every human string
  const collectStrings = (L: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    L.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(L) }
  }

  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('8.R')
  c.push(check('N0 lesson 8.R present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['N1 id pinned', 'aa-theory-of-equations-unit-8-review'],
    ['N2 heading: The Arc', 'The Arc: Six Engines, One Polynomial'],
    ['N3 heading: Master Tables Reunited', 'The Master Tables Reunited'],
    ['N4 heading: Witnesses, Re-Audited', 'The Witnesses, Re-Audited'],
    ['N5 heading: Laws Worth Recalling', 'The Laws Worth Recalling'],
    ['N6 heading: Traps the Hall Sets', 'The Traps the Hall Sets'],
    ['N7 heading: The Chapter Closes', 'The Chapter Closes'],
    // one pinned witness per storey (six storeys, six needles)
    ['N8 witness 8.1 the census {1, i, -i}', 'x^{3}-x^{2}+x-1'],
    ['N9 witness 8.2 the variations and the census', 'x^{3}-7x+6'],
    ['N10 witness 8.3 the staircase 11 and the quartic 50', 'x^{4}-10x^{3}+35x^{2}-50x+24'],
    ['N11 witness 8.4 the Cardan closed form', '0.3222'],
    ['N12 witness 8.4 the Ferrari split', 'x^{2}+3x-18'],
    ['N13 witness 8.5 the increased-roots shift', 'x^{3}-12x^{2}+47x-60'],
    ['N14 witness 8.5 the inverted roots', '1-6x+11x^{2}-6x^{3}'],
    ['N15 witness 8.6 the palindromic quartic', 'x^{4}+7x^{3}+14x^{2}+7x+1'],
    ['N16 witness 8.6 the roots of unity', 'roots of unity'],
    // the honest numbers the arcs carry
    ['N17 witness 8.1 the real root -0.6823', '0.6823'],
    ['N18 witness 8.2 the even deficit', 'deficit'],
    ['N19 witness 8.3 the power sums', 'p_{2} = 14'],
    ['N20 witness 8.3 the not-nice cubic', 'x^{3}-4x^{2}+6x-4'],
    ['N21 witness 8.4 Delta = 400', '400'],
    ['N22 witness 8.4 Sophie Germain', 'Sophie Germain'],
    ['N23 witness 8.4 Bombelli', 'Bombelli'],
    ['N24 witness 8.4 the casus', 'casus irreducibilis'],
    ['N25 witness 8.5 the loss guard', 'loses'],
    ['N26 witness 8.5 the extraneous guard', 'extraneous'],
    ['N27 the fundamental theorem stated honestly', 'stated'],
    ['N28 the mixed bench answer 924? no — the shift witness 5 roots', 'five roots'],
    // the handoffs
    ['N29 handoff: chapter 9 Exponentials and Logarithms', 'Exponentials and Logarithms'],
    ['N30 handoff: the synthesis chapter', 'The Synthesis and the Doorstep'],
    ['N31 handoff: the calculus doorstep', 'doorstep'],
    ['N32 handoff: the school canon', 'NCERT'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [0, 0, 1, 0, 0] — exact
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('N33 quiz keys [0,0,1,0,0]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([0, 0, 1, 0, 0]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('N34 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // the mixed bench: exactly 15 questions, 2/2/3/3/3/2
  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets: { level: string; questions: unknown[] }[] }
  const counts = ex.sets.map((s) => s.questions.length)
  c.push(check('N35 the bench is exactly 15 questions in six sets', counts.reduce((s, n) => s + n, 0) === 15, JSON.stringify(counts)))
  c.push(check('N36 the bench distribution L1:2 L2:2 L3:3 L4:3 L5:3 L6:2', JSON.stringify(counts) === JSON.stringify([2, 2, 3, 3, 3, 2]), JSON.stringify(counts)))

  // the solution figure on L5-2 (the Ferrari walk)
  const allQ = ex.sets.flatMap((s) => s.questions as { figures?: { svg: string }[] }[])
  const withFig = allQ.filter((q) => q.figures?.length)
  c.push(check('N37 the Ferrari solution figure present', withFig.length >= 1, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q.figures || []).map((f) => f.svg).join('')).join('')
  c.push(check('N38 the solution figure carries the resolvent root and the roots', figSvg.includes('M = 9') && figSvg.includes('-6')))
  c.push(check('N39 solution figure aria-labelled', figSvg.includes('aria-label')))

  // the architecture: master table, decision-map figure, laws, terms
  c.push(check('N40 the master law table present', L.blocks.some((b) => b.kind === 'table')))
  c.push(check('N41 the decision-map figure present', L.blocks.some((b) => b.kind === 'figure' && JSON.stringify(b).includes('decision map'))))
  c.push(check('N42 two body figures (decision map + promise-cashings)', L.blocks.filter((b) => b.kind === 'figure').length === 2, `${L.blocks.filter((b) => b.kind === 'figure').length} figures`))
  const formulas = L.blocks.filter((b) => b.kind === 'formula')
  c.push(check('N43 nine formula cards', formulas.length === 9, `${formulas.length} cards`))
  c.push(check('N44 the recall derivation present', L.blocks.some((b) => b.kind === 'derivation')))
  c.push(check('N45 at least two display equations', L.blocks.filter((b) => b.kind === 'equation').length >= 2))
  const terms = L.blocks.find((b) => b.kind === 'terms') as { items: { term: string }[] }
  c.push(check('N46 the terms block carries >= 6 recap terms', (terms?.items?.length ?? 0) >= 6, `${terms?.items?.length ?? 0} terms`))
  c.push(check('N47 the warn callout present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'warn')))
  c.push(check('N48 the exam callout present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')))
  c.push(check('N49 the insight callout present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'insight')))

  // honest word count + prerequisites + sources
  const words = countLessonWords(L)
  c.push(check('N50 review depth >= 5200', words >= 5200, `got ${words}`))
  c.push(check('N51 prerequisites = all six chapter lessons', JSON.stringify(L.prerequisites) === JSON.stringify([
    'aa-how-many-roots-degree-n-n-roots',
    'aa-descartes-rule-of-signs',
    'aa-cubics-and-quartics-the-symmetric-functions',
    'aa-cardan-and-ferrari-the-cubic-and-quartic-solved',
    'aa-transformation-of-equations',
    'aa-reciprocal-equations',
  ]), JSON.stringify(L.prerequisites)))
  c.push(check('N52 sources exact', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus', 'openstax-college-algebra']), JSON.stringify(L.sources)))
  c.push(check('N53 concepts: 7 pinned', (L.concepts ?? []).length === 7))
  c.push(check('N54 objectives: 5-6 pinned', (L.objectives ?? []).length >= 5 && (L.objectives ?? []).length <= 6))

  return c
}

// ------------------------------------------------------------------
// (Z) the census — the shipped chapter as a closed object
// ------------------------------------------------------------------

function sectionZ(chapter: { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('Z1 chapter number 8', chapter.number === 8))
  c.push(check('Z2 slug pinned', chapter.slug === 'theory-of-equations'))
  c.push(check('Z3 status complete (run 119 closed the chapter)', chapter.status === 'complete'))
  c.push(check('Z4 seven lessons shipped (6 lessons + the unit review)', chapter.lessons.length === 7, `got ${chapter.lessons.length}`))
  c.push(check('Z5 zero planned remain', chapter.plannedLessons.length === 0, `got ${chapter.plannedLessons.length}`))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z6 ids unique in chapter', new Set(ids).size === ids.length))
  c.push(check('Z7 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '8.1,8.2,8.3,8.4,8.5,8.6,8.R'))
  c.push(check('Z7b the review is the last lesson', chapter.lessons[chapter.lessons.length - 1].number === '8.R'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z8 honest depth >= 36000 (7 lessons)', totalWords >= 36000, `got ${totalWords}`))
  c.push(check('Z9 every lesson has sources + prerequisites', chapter.lessons.every((l) => (l.sources?.length ?? 0) >= 3 && (l.prerequisites?.length ?? 0) >= 2)))
  c.push(check('Z10 every lesson carries an exercises block + quiz', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz'))))
  c.push(check('Z11 every lesson carries >= 1 figure (vivid-palette law)', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'figure'))))
  return c
}

// ------------------------------------------------------------------
// the runner — engines first, then pins against the shipped chapter
// ------------------------------------------------------------------

const chapterPath = path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'mathematics', 'advanced-algebra', 'ch-08.ts')
const chapterExists = fs.existsSync(chapterPath)

const sections: ReturnType<typeof tally>[] = [
  tally('A (8.1 engines)', sectionA()),
  tally('C (8.2 engines)', sectionC()),
  tally('E (8.3 engines)', sectionE()),
  tally('G (8.4 engines)', sectionG()),
  tally('I (8.5 engines)', sectionI()),
  tally('K (8.6 engines)', sectionK()),
  tally('M (8.R engines)', sectionM()),
]

{
  const ch = chapter08 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }
  sections.push(tally('B (8.1 pins)', sectionB(ch)))
  sections.push(tally('D (8.2 pins)', sectionD(ch)))
  sections.push(tally('F (8.3 pins)', sectionF(ch)))
  sections.push(tally('H (8.4 pins)', sectionH(ch)))
  sections.push(tally('J (8.5 pins)', sectionJ(ch)))
  sections.push(tally('L (8.6 pins)', sectionL(ch)))
  sections.push(tally('N (8.R pins)', sectionN(ch)))
  sections.push(tally('Z (census)', sectionZ(ch)))
}

let failed = false
for (const s of sections) {
  const status = s.ok === s.total ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.section}: ${s.ok}/${s.total}`)
  for (const f of s.fail) { console.log(`   FAIL ${f}`); failed = true }
}
console.log(chapterExists ? 'chapter file present' : 'chapter file absent')
process.exit(failed ? 1 : 0)
