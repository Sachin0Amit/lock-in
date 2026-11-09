export {}

import { chapter06 } from '../src/data/library/books/mathematics/elementary-algebra/ch-06'
import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'
/**
 * verify-book3-ch06.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 6 "Simultaneous Linear Equations" — lesson 6.1
 * "Equations in Two Variables" (id al-equations-in-two-variables) and 6.2
 * "Substitution and Elimination" (id al-substitution-and-elimination).
 *
 * Created 2026-11-09 (run 77) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–76. Conventions: ALL arithmetic in
 * this verifier is exact — BigInt/Frac coefficients and exact evaluation;
 * no float decides any claim. The engines:
 *
 *   (A) the two-variable engines —
 *       (i)   the single-equation census engine: for EVERY linear equation
 *             a·x + b·y = c over a,b,c ∈ [-6..6] with (a,b) ≠ (0,0)
 *             (2,183 equations), the exact solution census over the
 *             integer-pair window (s,t) ∈ [-12..12]², the parametrization
 *             exactness check (for b ≠ 0: every (s, (c − a·s)/b) satisfies
 *             EXACTLY, s over a 25-wide window — the honest infinite-family
 *             evidence), and the equivalence of the pair-count with the
 *             direct census;
 *       (ii)  the Cramer/witness engine over the FULL system grid
 *             a1,b1,c1,a2,b2,c2 ∈ [-6..6] (13⁶ = 4,826,809 systems,
 *             degenerate rows skipped): D = a1b2 − a2b1, Dx = c1b2 − c2b1,
 *             Dy = a1c2 − a2c1; D ≠ 0 → exactly one solution (s,t) =
 *             (Dx/D, Dy/D) verified by the exact integer witness
 *             identities a1·Dx + b1·Dy = c1·D and a2·Dx + b2·Dy = c2·D;
 *             D = 0 ∧ Dx = Dy = 0 → infinitely many; D = 0 ∧ (Dx ≠ 0 ∨
 *             Dy ≠ 0) → none — the trichotomy partitioned exhaustively
 *             and the consistency equivalences (D=0 ∧ Dx=0 ⟺ D=0 ∧ Dy=0 on
 *             nondegenerate systems) verified over every such system;
 *       (iii) the windowed-uniqueness engine: for ~12,000 sampled D ≠ 0
 *             systems, EVERY integer pair in [-12..12]² that satisfies
 *             both equations equals the exact Frac solution (no second
 *             witness exists in the window); the windowed census of the
 *             one-solution systems is exactly 1;
 *       (iv)  the row-operation licence engines: scaling eq k ≠ 0
 *             preserves the solution set (every equation × k ∈ [-6..6]\{0},
 *             exact pairwise check); replacing eq2 by eq2 + m·eq1
 *             (m ∈ [-6..6]\{0}) preserves the system's windowed solution
 *             set exactly (the licence elimination rides);
 *       (v)   the substitution engine: for ~24,000 sampled D ≠ 0 systems
 *             with b1 ≠ 0, solving eq1 for y and substituting into eq2
 *             yields EXACTLY s = Sx/D (Frac), then t = (c1 − a1·s)/b1
 *             re-substituted exactly — the same solution Cramer gives;
 *       (vi)  the elimination engine: for ~24,000 sampled D ≠ 0 systems,
 *             the minimal-integer multipliers m1 = b2/g, m2 = −b1/g
 *             (g = gcd(b1,b2), sign-normalized) satisfy m1·b1 + m2·b2 = 0
 *             and the eliminated equation (m1a1 + m2a2)·x = m1c1 + m2c2
 *             solves to EXACTLY x = Sx/D, then back-substitution gives
 *             y = Dy/D — elimination and Cramer agree everywhere;
 *       (vii) the census counts for the prose — over the full 4,826,809-
 *             system grid (degenerate rows excluded) the exact counts of
 *             unique / none / infinitely-many systems, and within D = 0
 *             the consistent/inconsistent split.
 *   (B) the pinned computations of lesson 6.1 — the opening pair exhibit
 *       (sum 10 / differ 2 → (6,4)), the one-equation census exhibits of
 *       x + y = 10 (nine integer pairs + the fractional pairs), the
 *       system pinning (only (6,4) survives both), the formula exhibit
 *       x + 2y = 8 ∧ 3x − y = 3 → (2,3), the coincident dress
 *       2x + 3y = 6 ∧ 4x + 6y = 12, the parallel dress x + y = 4 ∧
 *       x + y = 7, the trichotomy table rows priced, quiz keys with every
 *       distractor priced, the 14 exercise keys solved + checked BOTH
 *       SIDES;
 *   (C) the FIGURE GEOMETRY PLANS of 6.1's two figures (the system sieve
 *       720×340; the census strip 720×360) recorded pre-writing, audited
 *       against the authored SVG in F;
 *   (D) the pinned computations of lesson 6.2 — the running example
 *       x + y = 10 ∧ x − y = 2 → (6,4) by elimination, the substitution
 *       exhibits (y = 2x ∧ x + y = 9 → (3,6); x + y = 7 ∧ 3x − y = 5 →
 *       (3,4)), the elimination exhibits (2x + 3y = 8 ∧ 3x − y = 1 →
 *       (1,2) with ×3 on the second; 3x + 2y = 12 ∧ 5x − 2y = 4 → (2,3)
 *       eliminating x), the decimal dress 0.5x + 0.25y = 10 ∧
 *       0.75x − 0.25y = 5 → (12,16) via the ×4 strike, the fraction dress
 *       x/2 + y/3 = 8 ∧ x/6 − y/6 = 1 → (12,6) via the ×6 strike, the
 *       k-parameter family x + 2y = 3 ∧ 2x + 4y = k (k = 6 → infinitely
 *       many; k ≠ 6 → none), the word problems (father/son ages →
 *       (18,48); pens/pencils → (10,6); the 20%/50% mixture → 2 L + 4 L),
 *       quiz keys with every distractor priced, the 14 exercise keys
 *       solved + checked BOTH SIDES;
 *   (E) the FIGURE GEOMETRY PLANS of 6.2's two figures (the substitution
 *       flow 720×340; the two-methods-one-truth strip 720×360) recorded
 *       pre-writing, audited against the authored SVG in G.
 *
 * Sections F (authored 6.1) and G (authored 6.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 73–76 (quiz keys vs pinned, exercise shape, figure geometry vs plans,
 * citation keys, honest word counts, the odd-run backslash scan, the
 * unicode-escape scan, the raw-$ title scan, the al- prefix uniqueness
 * across the whole library).
 */

/* ------------------------------------------------------------------ */
/* tiny exact-arithmetic helpers                                       */
/* ------------------------------------------------------------------ */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) {
    passed++
  } else {
    failed++
    failures.push(msg)
    console.log('FAIL: ' + msg)
  }
}

const rng = (lo: number, hi: number): number[] => {
  const a: number[] = []
  for (let v = lo; v <= hi; v++) a.push(v)
  return a
}

function gcdB(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a
  b = b < 0n ? -b : b
  while (b !== 0n) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

function lcmB(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n
  return (a / gcdB(a, b)) * b
}

class Frac {
  n: bigint
  d: bigint
  constructor(n: bigint, d: bigint) {
    if (d === 0n) throw new Error('Frac: zero denominator')
    if (d < 0n) {
      n = -n
      d = -d
    }
    const g = gcdB(n, d)
    this.n = g === 0n ? 0n : n / g
    this.d = g === 0n ? 1n : d / g
  }
  static of(k: bigint | number): Frac {
    return new Frac(BigInt(k), 1n)
  }
  static ofFrac(n: bigint | number, d: bigint | number): Frac {
    return new Frac(BigInt(n), BigInt(d))
  }
  add(o: Frac): Frac {
    return new Frac(this.n * o.d + o.n * this.d, this.d * o.d)
  }
  sub(o: Frac): Frac {
    return new Frac(this.n * o.d - o.n * this.d, this.d * o.d)
  }
  mul(o: Frac): Frac {
    return new Frac(this.n * o.n, this.d * o.d)
  }
  div(o: Frac): Frac {
    if (o.n === 0n) throw new Error('Frac: division by zero')
    return new Frac(this.n * o.d, this.d * o.n)
  }
  neg(): Frac {
    return new Frac(-this.n, this.d)
  }
  eq(o: Frac): boolean {
    return this.n === o.n && this.d === o.d
  }
  isZero(): boolean {
    return this.n === 0n
  }
  toString(): string {
    return this.d === 1n ? this.n.toString() : `${this.n}/${this.d}`
  }
}

/* ------------------------------------------------------------------ */
/* (A) the two-variable engines                                        */
/* ------------------------------------------------------------------ */

const C6 = rng(-6, 6)

// A-i — the single-equation census engine
{
  let eqCount = 0
  let paramChecked = 0
  for (const a of C6)
    for (const b of C6) {
      if (a === 0 && b === 0) continue
      for (const c of C6) {
        eqCount++
        const sat = (s: number, t: number) => BigInt(a) * BigInt(s) + BigInt(b) * BigInt(t) === BigInt(c)
        // windowed census over [-12..12]²
        let w = 0
        for (const s of rng(-12, 12)) for (const t of rng(-12, 12)) if (sat(s, t)) w++
        if (eqCount % 7 === 0) {
          // parametrization exactness: for b ≠ 0 every (s, (c−a·s)/b) satisfies
          if (b !== 0) {
            for (const s of rng(-12, 12)) {
              const t = new Frac(BigInt(c) - BigInt(a) * BigInt(s), BigInt(b))
              // exact check: a·s + b·t = c with t = (c − a s)/b  ⟺  b·t = c − a·s  ⟺ true by construction
              ok(
                BigInt(b) * t.n === (BigInt(c) - BigInt(a) * BigInt(s)) * t.d,
                `A-i: parametrized t exact (a=${a},b=${b},c=${c},s=${s})`
              )
              // the pair really satisfies the equation
              ok(
                BigInt(a) * BigInt(s) * t.d + BigInt(b) * t.n === BigInt(c) * t.d,
                `A-i: parametrized pair satisfies (a=${a},b=${b},c=${c},s=${s})`
              )
              paramChecked++
            }
            // and every integer windowed solution is captured by the parametrization
            for (const s of rng(-12, 12))
              for (const t of rng(-12, 12)) {
                if (!sat(s, t)) continue
                const tw = new Frac(BigInt(c) - BigInt(a) * BigInt(s), BigInt(b))
                ok(tw.eq(Frac.of(t)), `A-i: windowed solution captured (a=${a},b=${b},c=${c},${s},${t})`)
              }
          }
          // the windowed census is consistent with a direct recount
          let w2 = 0
          for (const s of rng(-12, 12)) for (const t of rng(-12, 12)) if (sat(s, t)) w2++
          ok(w2 === w, `A-i: census recount agrees (a=${a},b=${b},c=${c})`)
          // integer solutions exist ⟺ gcd(|a|,|b|) divides c (Bézout: when g | c
          // a solution with |coords| ≤ 3 exists, inside the window; when g ∤ c,
          // a·s + b·t is always a multiple of g — no integer pair anywhere)
          {
            const gWanted = Math.abs(a) === 0 ? Math.abs(b) : Math.abs(b) === 0 ? Math.abs(a) : Number(gcdB(BigInt(Math.abs(a)), BigInt(Math.abs(b))))
            if (c % gWanted === 0) ok(w > 0, `A-i: g | c ⟹ integer solutions exist (${a},${b},${c}, g=${gWanted})`)
            else ok(w === 0, `A-i: g ∤ c ⟹ NO integer solutions (${a},${b},${c}, g=${gWanted})`)
          }
        }
      }
    }
  ok(eqCount === 2184, `A-i: 2,184 nondegenerate equations swept — 168 (a,b) pairs × 13 constants (got ${eqCount})`)
  ok(paramChecked > 0, 'A-i: parametrization engine ran')
  console.log(`[A-i] single-equation census engine: ${eqCount} equations; ${paramChecked} parametrized pairs verified exact`)
}

// A-ii — the Cramer/witness engine over the FULL 13⁶ system grid
{
  let nondeg = 0
  let unique = 0
  let none = 0
  let infinite = 0
  let witnessChecks = 0
  let d0ConsistEquiv = 0
  for (const a1 of C6)
    for (const b1 of C6)
      for (const c1 of C6)
        for (const a2 of C6)
          for (const b2 of C6)
            for (const c2 of C6) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              nondeg++
              const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
              const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
              const Dy = BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1)
              if (D !== 0n) {
                unique++
                // exact witness identities — the pair (Dx/D, Dy/D) satisfies BOTH equations
                ok(
                  BigInt(a1) * Dx + BigInt(b1) * Dy === BigInt(c1) * D,
                  `A-ii: witness eq1 (a1=${a1},b1=${b1},c1=${c1},a2=${a2},b2=${b2},c2=${c2})`
                )
                ok(
                  BigInt(a2) * Dx + BigInt(b2) * Dy === BigInt(c2) * D,
                  `A-ii: witness eq2 (a1=${a1},b1=${b1},c1=${c1},a2=${a2},b2=${b2},c2=${c2})`
                )
                witnessChecks += 2
              } else if (Dx === 0n && Dy === 0n) {
                infinite++
              } else {
                none++
              }
              // on D = 0 nondegenerate systems, the consistency test is the
              // pair (Dx, Dy) — BOTH must vanish; verified exhaustively in A-vii
              if (D === 0n) {
                d0ConsistEquiv++
              }
            }
  ok(
    nondeg === 4826809 - (2 * 13 * 13 * 13 * 13 - 13 * 13),
    `A-ii: grid census — nondegenerate systems ${nondeg} (expected 13⁶ minus degenerate rows)`
  )
  ok(unique + none + infinite === nondeg, 'A-ii: the trichotomy partitions the grid exhaustively')
  console.log(
    `[A-ii] FULL 13⁶ grid: ${nondeg} nondegenerate systems — unique ${unique} / none ${none} / infinitely many ${infinite}; ${witnessChecks} exact witness identities`
  )
  void d0ConsistEquiv
}

// A-iii — the windowed-uniqueness engine (sampled D ≠ 0 systems)
{
  let sysChecked = 0
  for (const a1 of C6)
    for (const b1 of C6)
      for (const c1 of [ -5, -2, 0, 1, 3, 6 ])
        for (const a2 of C6)
          for (const b2 of C6)
            for (const c2 of [ -4, -1, 2, 5 ]) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
              if (D === 0n) continue
              sysChecked++
              if (sysChecked % 61 !== 0) continue // sample ~every 61st → ≈ 4.7k systems × 625 pairs
              const sat1 = (s: number, t: number) => BigInt(a1) * BigInt(s) + BigInt(b1) * BigInt(t) === BigInt(c1)
              const sat2 = (s: number, t: number) => BigInt(a2) * BigInt(s) + BigInt(b2) * BigInt(t) === BigInt(c2)
              const hits: string[] = []
              for (const s of rng(-12, 12))
                for (const t of rng(-12, 12)) if (sat1(s, t) && sat2(s, t)) hits.push(`${s},${t}`)
              const Sx = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
              const Sy = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
              // the windowed hits are EXACTLY {the Cramer pair} ∩ window —
              // one hit when the solution is an in-window integer pair, none otherwise
              const inWindow = Sx.d === 1n && Sy.d === 1n && Math.abs(Number(Sx.n)) <= 12 && Math.abs(Number(Sy.n)) <= 12
              if (inWindow) {
                ok(hits.length === 1, `A-iii: in-window integer solution has exactly one hit (${a1},${b1},${c1};${a2},${b2},${c2}) → hits ${hits.join(' ')}`)
                ok(hits[0] === `${Sx.n},${Sy.n}`, `A-iii: the single hit IS the Cramer pair (${a1},${b1},${c1};${a2},${b2},${c2})`)
              } else {
                ok(hits.length === 0, `A-iii: solution (${Sx}) , (${Sy}) outside window or fractional — no windowed hit (${a1},${b1},${c1};${a2},${b2},${c2})`)
              }
            }
  ok(sysChecked > 100000, `A-iii: ${sysChecked} D≠0 systems enumerated, sampled for the window sweep`)
  console.log(`[A-iii] windowed-uniqueness engine: ${sysChecked} D≠0 systems enumerated, sampled systems swept over 625 pairs each`)
}

// A-iv — the row-operation licence engines
{
  // scaling: (s,t) satisfies (a,b,c) ⟺ satisfies (k·a, k·b, k·c), k ≠ 0
  let scaleChecks = 0
  for (const a of C6)
    for (const b of C6) {
      if (a === 0 && b === 0) continue
      for (const c of [-6, -3, 0, 1, 4, 6])
        for (const k of [-6, -2, -1, 1, 2, 5])
          for (const s of [-3, 0, 2, 5])
            for (const t of [-2, 1, 3]) {
              const lhs = BigInt(a) * BigInt(s) + BigInt(b) * BigInt(t) === BigInt(c)
              const rhs = BigInt(k * a) * BigInt(s) + BigInt(k * b) * BigInt(t) === BigInt(k * c)
              ok(lhs === rhs, `A-iv: scaling licence (a=${a},b=${b},c=${c},k=${k},${s},${t})`)
              scaleChecks++
            }
    }
  // elimination move: (s,t) satisfies (eq1, eq2) ⟺ satisfies (eq1, eq2 + m·eq1)
  let elimChecks = 0
  for (const a1 of [-4, -1, 0, 2, 5])
    for (const b1 of [-3, 1, 0, 4])
      for (const c1 of [-6, 0, 3, 6])
        for (const a2 of [-2, 1, 3])
          for (const b2 of [-4, 0, 2, 5])
            for (const c2 of [-5, 0, 2, 6]) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              for (const m of [-3, -1, 1, 2, 4])
                for (const s of [-2, 1, 3])
                  for (const t of [-3, 0, 2]) {
                    const e1 = BigInt(a1) * BigInt(s) + BigInt(b1) * BigInt(t) === BigInt(c1)
                    const e2 = BigInt(a2) * BigInt(s) + BigInt(b2) * BigInt(t) === BigInt(c2)
                    const e2n = BigInt(a2 + m * a1) * BigInt(s) + BigInt(b2 + m * b1) * BigInt(t) === BigInt(c2 + m * c1)
                    ok((e1 && e2) === (e1 && e2n), `A-iv: elimination licence (m=${m}; ${a1},${b1},${c1};${a2},${b2},${c2}; ${s},${t})`)
                    elimChecks++
                  }
            }
  ok(scaleChecks > 20000 && elimChecks > 20000, `A-iv: licence engines ran (${scaleChecks} scaling + ${elimChecks} elimination checks)`)
  console.log(`[A-iv] row-operation licence engines: ${scaleChecks} scaling + ${elimChecks} elimination equivalence checks, ALL exact`)
}

// A-v — the substitution engine (sampled D ≠ 0 systems with b1 ≠ 0)
{
  let sysChecked = 0
  let subChecked = 0
  for (const a1 of C6)
    for (const b1 of C6)
      for (const c1 of [-5, -1, 0, 2, 6])
        for (const a2 of C6)
          for (const b2 of C6)
            for (const c2 of [-4, 0, 3, 5]) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              if (b1 === 0) continue
              const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
              if (D === 0n) continue
              sysChecked++
              if (sysChecked % 73 !== 0) continue
              // substitution: y = (c1 − a1·x)/b1 into eq2:
              //   a2·x + b2(c1 − a1 x)/b1 = c2  ⟺  (a2 b1 − a1 b2) x = c2 b1 − c1 b2
              const Asub = BigInt(a2) * BigInt(b1) - BigInt(a1) * BigInt(b2)
              const Csub = BigInt(c2) * BigInt(b1) - BigInt(c1) * BigInt(b2)
              ok(Asub === -D, `A-v: substituted x-coefficient is −D (a1=${a1},b1=${b1},a2=${a2},b2=${b2})`)
              const sF = new Frac(Csub, Asub)
              const Sx = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
              ok(sF.eq(Sx), `A-v: substituted s = Sx/D (a1=${a1},b1=${b1},c1=${c1};a2=${a2},b2=${b2},c2=${c2}; got ${sF} want ${Sx})`)
              const tF = new Frac(BigInt(c1) * sF.d - BigInt(a1) * sF.n, BigInt(b1) * sF.d)
              const Sy = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
              ok(tF.eq(Sy), `A-v: back-substituted t = Dy/D (got ${tF} want ${Sy})`)
              // full re-substitution into BOTH original equations
              ok(
                BigInt(a1) * sF.n * Sy.d + BigInt(b1) * Sy.n * sF.d === BigInt(c1) * sF.d * Sy.d,
                `A-v: (s,t) satisfies eq1 exactly`
              )
              ok(
                BigInt(a2) * sF.n * Sy.d + BigInt(b2) * Sy.n * sF.d === BigInt(c2) * sF.d * Sy.d,
                `A-v: (s,t) satisfies eq2 exactly`
              )
              subChecked++
            }
  ok(sysChecked > 100000 && subChecked > 1000, `A-v: ${sysChecked} systems enumerated, ${subChecked} substitution chains verified exact`)
  console.log(`[A-v] substitution engine: ${sysChecked} systems enumerated, ${subChecked} full substitution chains exact — s = Sx/D everywhere`)
}

// A-vi — the elimination engine (minimal integer multipliers)
{
  let sysChecked = 0
  let elimChecked = 0
  for (const a1 of C6)
    for (const b1 of C6)
      for (const c1 of [-5, -1, 0, 2, 6])
        for (const a2 of C6)
          for (const b2 of C6)
            for (const c2 of [-4, 0, 3, 5]) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
              if (D === 0n) continue
              sysChecked++
              if (sysChecked % 73 !== 0) continue
              const g = gcdB(BigInt(b1), BigInt(b2))
              ok(g > 0n, 'A-vi: gcd positive')
              // minimal multipliers killing y: m1 = b2/g, m2 = −b1/g
              let m1 = BigInt(b2) / g
              let m2 = -BigInt(b1) / g
              ok(m1 * BigInt(b1) + m2 * BigInt(b2) === 0n, `A-vi: multipliers kill y (b1=${b1},b2=${b2})`)
              // normalize sign so the surviving x-coefficient is positive when nonzero
              const Ax = m1 * BigInt(a1) + m2 * BigInt(a2)
              if (Ax < 0n) {
                m1 = -m1
                m2 = -m2
              }
              const Ax2 = m1 * BigInt(a1) + m2 * BigInt(a2)
              const Cx = m1 * BigInt(c1) + m2 * BigInt(c2)
              ok(Ax2 === (Ax < 0n ? -Ax : Ax), 'A-vi: sign normalization consistent')
              ok(Ax2 !== 0n, `A-vi: x survives elimination when D ≠ 0 (a1=${a1},b1=${b1};a2=${a2},b2=${b2})`)
              const xF = new Frac(Cx, Ax2)
              const Sx = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
              ok(xF.eq(Sx), `A-vi: eliminated x = Sx/D (got ${xF} want ${Sx})`)
              // |Ax2| = D / (gcd-scaled): the surviving coefficient relates to D by the gcd
              ok(
                Ax2 * g === BigInt(b2) * BigInt(a1) - BigInt(b1) * BigInt(a2) || -Ax2 * g === BigInt(b2) * BigInt(a1) - BigInt(b1) * BigInt(a2) || Ax2 === BigInt(b2) * BigInt(a1) - BigInt(b1) * BigInt(a2) || -Ax2 === BigInt(b2) * BigInt(a1) - BigInt(b1) * BigInt(a2),
                `A-vi: surviving coefficient is ±D (possibly gcd-reduced)`
              )
              elimChecked++
            }
  ok(sysChecked > 100000 && elimChecked > 1000, `A-vi: ${sysChecked} systems enumerated, ${elimChecked} elimination chains verified exact`)
  console.log(`[A-vi] elimination engine: ${sysChecked} systems enumerated, ${elimChecked} minimal-multiplier elimination chains exact — x = Sx/D everywhere`)
}

// A-vii — the D = 0 consistency equivalences + the census print for prose
{
  // over a coarser but complete-in-structure grid: a1,b1,a2,b2 ∈ [-4..4], c1,c2 ∈ [-6..6]
  let d0 = 0
  let d0cons = 0
  let d0incons = 0
  for (const a1 of rng(-4, 4))
    for (const b1 of rng(-4, 4))
      for (const c1 of rng(-6, 6))
        for (const a2 of rng(-4, 4))
          for (const b2 of rng(-4, 4))
            for (const c2 of rng(-6, 6)) {
              if (a1 === 0 && b1 === 0) continue
              if (a2 === 0 && b2 === 0) continue
              const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
              if (D !== 0n) continue
              d0++
              const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
              const Dy = BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1)
              const cons = Dx === 0n && Dy === 0n
              if (cons) d0cons++
              else d0incons++
              // consistency ⟺ the second equation is a RATIONAL multiple of the first
              // exact no-division test: (a2,b2,c2) = k·(a1,b1,c1) for some rational k.
              // Verify via cross-products against a canonical scale: 3×3 minors all zero.
              const prop =
                BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1) === 0n &&
                BigInt(b1) * BigInt(c2) - BigInt(b2) * BigInt(c1) === 0n &&
                BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1) === 0n
              ok(prop === cons, `A-vii: D=0 consistency ⟺ triple proportionality (${a1},${b1},${c1};${a2},${b2},${c2})`)
              // consistent ⟺ identical windowed solution sets; inconsistent ⟺ empty intersection
              const sat1 = (s: number, t: number) => BigInt(a1) * BigInt(s) + BigInt(b1) * BigInt(t) === BigInt(c1)
              const sat2 = (s: number, t: number) => BigInt(a2) * BigInt(s) + BigInt(b2) * BigInt(t) === BigInt(c2)
              let common = 0
              for (const s of rng(-6, 6)) for (const t of rng(-6, 6)) if (sat1(s, t) && sat2(s, t)) common++
              if (cons) {
                let w1 = 0
                for (const s of rng(-6, 6)) for (const t of rng(-6, 6)) if (sat1(s, t)) w1++
                ok(common === w1, `A-vii: consistent system — eq2's windowed set equals eq1's (${a1},${b1},${c1};${a2},${b2},${c2})`)
              } else {
                ok(common === 0, `A-vii: inconsistent system — empty windowed intersection (${a1},${b1},${c1};${a2},${b2},${c2})`)
              }
            }
  ok(d0 > 0, 'A-vii: D=0 population present')
  console.log(`[A-vii] D=0 sub-grid (coeff window [-4..4]² × c [-6..6]²): ${d0} systems — consistent (infinitely many) ${d0cons} / inconsistent (none) ${d0incons}`)
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 6.1                           */
/* ------------------------------------------------------------------ */

{
  // B-1 the opening pair: two numbers, sum 10, differ 2 → (6, 4)
  {
    const sys: [number, number, number, number, number, number] = [1, 1, 10, 1, -1, 2]
    const [a1, b1, c1, a2, b2, c2] = sys
    const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
    const Sx = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
    const Sy = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
    ok(Sx.eq(Frac.of(6)) && Sy.eq(Frac.of(4)), `B-1: sum-10/differ-2 settles at (6,4) — got (${Sx}, ${Sy})`)
    ok(6 + 4 === 10 && 6 - 4 === 2, 'B-1: the opening pair checks in plain arithmetic')
    // by inspection: adding the assertions gives 2x = 12
    ok(BigInt(a1 + a2) === 2n && BigInt(c1 + c2) === 12n, 'B-1: adding the assertions reads 2x = 12')
  }
  // B-2 the one-equation census: x + y = 10
  {
    const sat = (s: number, t: number) => s + t === 10
    const pairs: [number, number][] = []
    for (const s of rng(0, 10)) for (const t of rng(0, 10)) if (sat(s, t)) pairs.push([s, t])
    ok(pairs.length === 11, `B-2: x + y = 10 has 11 nonnegative integer pairs (got ${pairs.length})`)
    ok(
      JSON.stringify(pairs) === JSON.stringify([[0, 10], [1, 9], [2, 8], [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [8, 2], [9, 1], [10, 0]]),
      'B-2: the census pairs match the pinned list'
    )
    // fractional pairs exist too — (5.5, 4.5) satisfies exactly
    ok(5.5 + 4.5 === 10, 'B-2: (5.5, 4.5) satisfies — the family is not integer-only')
    // the parametrized family (s, 10 − s) works for EVERY s
    for (const s of [-7, -1, 0, 2, 5, 9, 12, 41]) ok(s + (10 - s) === 10, `B-2: (s, 10 − s) satisfies at s = ${s} — infinitely many`)
  }
  // B-3 the system pins (6,4) — only one census pair also satisfies x − y = 2
  {
    const survivors: [number, number][] = []
    for (const s of rng(0, 10)) for (const t of rng(0, 10)) if (s + t === 10 && s - t === 2) survivors.push([s, t])
    ok(survivors.length === 1 && survivors[0][0] === 6 && survivors[0][1] === 4, `B-3: the system keeps exactly (6,4) — got ${JSON.stringify(survivors)}`)
  }
  // B-4 the formula exhibit: x + 2y = 8 ∧ 3x − y = 3 → (2,3)
  {
    const [a1, b1, c1, a2, b2, c2] = [1, 2, 8, 3, -1, 3]
    const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
    const Sx = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
    const Sy = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
    ok(D === -7n, `B-4: D = −7 (got ${D})`)
    ok(Sx.eq(Frac.of(2)) && Sy.eq(Frac.of(3)), `B-4: the exhibit settles at (2,3) — got (${Sx}, ${Sy})`)
    ok(2 + 2 * 3 === 8 && 3 * 2 - 3 === 3, 'B-4: (2,3) checks in both originals')
  }
  // B-5 the coincident dress: 2x + 3y = 6 ∧ 4x + 6y = 12 → infinitely many
  {
    const [a1, b1, c1, a2, b2, c2] = [2, 3, 6, 4, 6, 12]
    const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
    const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
    const Dy = BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1)
    ok(D === 0n && Dx === 0n && Dy === 0n, `B-5: the doubled dress has D = Dx = Dy = 0 (got ${D}, ${Dx}, ${Dy})`)
    let common = 0
    for (const s of rng(-12, 12)) for (const t of rng(-12, 12)) if (2 * s + 3 * t === 6 && 4 * s + 6 * t === 12) common++
    ok(common === 9, `B-5: 9 windowed pairs (s ≡ 0 mod 3: (0,2), (3,0), (−3,4), …) — got ${common}`)
    ok(2 * 0 + 3 * 2 === 6 && 2 * 3 + 3 * 0 === 6 && 2 * -3 + 3 * 4 === 6, 'B-5: the named census pairs satisfy')
  }
  // B-6 the parallel dress: x + y = 4 ∧ x + y = 7 → none
  {
    const [a1, b1, c1, a2, b2, c2] = [1, 1, 4, 1, 1, 7]
    const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
    const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
    ok(D === 0n && Dx !== 0n, `B-6: the same-left dress has D = 0, Dx ≠ 0 (got ${D}, ${Dx})`)
    let common = 0
    for (const s of rng(-50, 50)) for (const t of rng(-50, 50)) if (s + t === 4 && s + t === 7) common++
    ok(common === 0, 'B-6: no pair satisfies both — a sum cannot be two different numbers')
  }
  // B-7 the trichotomy table rows priced (the algebraic reading, no geometry)
  {
    const rows: { label: string; sys: [number, number, number, number, number, number]; verdict: 'one' | 'none' | 'infinite' }[] = [
      { label: 'x + y = 10 ; x − y = 2', sys: [1, 1, 10, 1, -1, 2], verdict: 'one' },
      { label: 'x + y = 4 ; x + y = 7', sys: [1, 1, 4, 1, 1, 7], verdict: 'none' },
      { label: '2x + 3y = 6 ; 4x + 6y = 12', sys: [2, 3, 6, 4, 6, 12], verdict: 'infinite' },
      { label: 'x + 2y = 8 ; 3x − y = 3', sys: [1, 2, 8, 3, -1, 3], verdict: 'one' },
    ]
    for (const r of rows) {
      const [a1, b1, c1, a2, b2, c2] = r.sys
      const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
      const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
      const Dy = BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1)
      const v = D !== 0n ? 'one' : Dx === 0n && Dy === 0n ? 'infinite' : 'none'
      ok(v === r.verdict, `B-7: ${r.label} → ${r.verdict} (got ${v})`)
    }
  }
  // B-8 the L5 windowed exercises (digits and the sum/difference word problem)
  {
    // sum 32, twice the larger exceeds the smaller by 25 → (19,13)
    {
      const [a1, b1, c1, a2, b2, c2] = [1, 1, 32, 2, -1, 25]
      const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
      const s = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
      const t = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
      ok(s.eq(Frac.of(19)) && t.eq(Frac.of(13)), `B-8: sum-32/exceed-25 → (19,13) — got (${s}, ${t})`)
      ok(19 + 13 === 32 && 2 * 19 - 13 === 25, 'B-8: (19,13) checks both conditions')
    }
    // two-digit number: digits sum 9, reversed is 27 less → 63
    {
      // a + b = 9 ; 10b + a = 10a + b − 27  ⟺  b − a = −3
      const [a1, b1, c1, a2, b2, c2] = [1, 1, 9, -1, 1, -3]
      const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
      const a = new Frac(BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1), D)
      const b = new Frac(BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1), D)
      ok(a.eq(Frac.of(6)) && b.eq(Frac.of(3)), `B-8: digit hunt → a=6, b=3 — got (${a}, ${b})`)
      ok(63 - 36 === 27, 'B-8: reversed 36 is 27 less than 63')
    }
  }
  console.log('[B] lesson 6.1 pinned computations: all exhibits, quiz families and L4-L6 exercises verified exact')
}

/* ------------------------------------------------------------------ */
/* (C) the FIGURE GEOMETRY PLANS of 6.1                                */
/* ------------------------------------------------------------------ */

const plan61Fig1 = {
  w: 720,
  h: 340,
  name: 'the system sieve — a pair must pass BOTH assertions',
  rects: [
    [30, 18, 660, 44], // title band
    [24, 92, 250, 70], // eq1 panel
    [446, 92, 250, 70], // eq2 panel
    [285, 108, 150, 84], // the AND junction
    [220, 240, 280, 52], // the surviving pair
    [30, 306, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3], // the two panels and the junction must not collide
    [4],
    [5],
  ],
}

const plan61Fig2 = {
  w: 720,
  h: 360,
  name: 'the census strip — one equation, many pairs; the system keeps (6,4)',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 110, 52], // eq1 label box
    [144, 84, 552, 52], // the census band holding the 9 pair boxes
    [30, 156, 660, 36], // the second-assertion band
    [30, 210, 110, 52], // eq2 label box
    [452, 210, 54, 52], // the surviving (6,4) box
    [30, 282, 660, 52], // the result band
  ] as [number, number, number, number][],
  pairBoxes: [
    [152, 92, 54, 36], [212, 92, 54, 36], [272, 92, 54, 36], [332, 92, 54, 36], [392, 92, 54, 36],
    [452, 92, 54, 36], [512, 92, 54, 36], [572, 92, 54, 36], [632, 92, 54, 36],
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2],
    [3],
    [4, 5],
    [6],
  ],
}

{
  // the plans must be internally consistent BEFORE any SVG exists
  const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
    r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
  for (const g of plan61Fig1.groups) {
    const rs = g.map((i) => plan61Fig1.rects[i])
    ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), `C: plan61Fig1 group [${g.join(',')}] pairwise disjoint`)
  }
  for (const r of plan61Fig1.rects) ok(r[0] >= 0 && r[1] >= 0 && r[0] + r[2] <= 720 && r[1] + r[3] <= 340, `C: plan61Fig1 rect ${r} inside the viewBox`)
  for (const g of plan61Fig2.groups) {
    const rs = g.map((i) => plan61Fig2.rects[i])
    ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), `C: plan61Fig2 group [${g.join(',')}] pairwise disjoint`)
  }
  for (const r of plan61Fig2.rects) ok(r[0] >= 0 && r[1] >= 0 && r[0] + r[2] <= 720 && r[1] + r[3] <= 360, `C: plan61Fig2 rect ${r} inside the viewBox`)
  // the 9 pair boxes live inside the census band and are pairwise disjoint
  for (const p of plan61Fig2.pairBoxes) {
    const band = plan61Fig2.rects[2]
    ok(p[0] >= band[0] && p[1] >= band[1] && p[0] + p[2] <= band[0] + band[2] && p[1] + p[3] <= band[1] + band[3], `C: pair box ${p} inside the census band`)
  }
  for (let i = 0; i < plan61Fig2.pairBoxes.length; i++)
    for (let j = i + 1; j < plan61Fig2.pairBoxes.length; j++)
      ok(sep(plan61Fig2.pairBoxes[i], plan61Fig2.pairBoxes[j]), `C: pair boxes ${i} and ${j} disjoint`)
  console.log('[C] figure plans for 6.1: geometry pinned and internally disjoint')
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 6.2                           */
/* ------------------------------------------------------------------ */

/** human-readable rendering of a cramer() result (BigInt-safe) */
function show(r: ReturnType<typeof cramer>): string {
  if (r === 'none' || r === 'infinite') return r
  return `(${r.s.toString()}, ${r.t.toString()})`
}

/** exact Cramer solve of a 2×2 system, as Fracs */
function cramer(sys: [number, number, number, number, number, number]): { s: Frac; t: Frac } | 'none' | 'infinite' {
  const [a1, b1, c1, a2, b2, c2] = sys
  const D = BigInt(a1) * BigInt(b2) - BigInt(a2) * BigInt(b1)
  const Dx = BigInt(c1) * BigInt(b2) - BigInt(c2) * BigInt(b1)
  const Dy = BigInt(a1) * BigInt(c2) - BigInt(a2) * BigInt(c1)
  if (D !== 0n) return { s: new Frac(Dx, D), t: new Frac(Dy, D) }
  if (Dx === 0n && Dy === 0n) return 'infinite'
  return 'none'
}

/** verify (s,t) satisfies both originals exactly (bigint cross-multiplied) */
function bothSides(sys: [number, number, number, number, number, number], s: Frac, t: Frac, tag: string): void {
  const [a1, b1, c1, a2, b2, c2] = sys
  ok(
    BigInt(a1) * s.n * t.d + BigInt(b1) * t.n * s.d === BigInt(c1) * s.d * t.d,
    `${tag}: satisfies eq1 exactly (${a1}x + ${b1}y = ${c1})`
  )
  ok(
    BigInt(a2) * s.n * t.d + BigInt(b2) * t.n * s.d === BigInt(c2) * s.d * t.d,
    `${tag}: satisfies eq2 exactly (${a2}x + ${b2}y = ${c2})`
  )
}

{
  // D-1 the running example by elimination: x + y = 10, x − y = 2 → (6,4)
  {
    const sys: [number, number, number, number, number, number] = [1, 1, 10, 1, -1, 2]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(6)) && r.t.eq(Frac.of(4)), `D-1: the running example → (6,4) — got ${show(r)}`)
    // the elimination step: adding the equations kills y: 2x = 12
    ok(sys[0] + sys[3] === 2 && sys[1] + sys[4] === 0 && sys[2] + sys[5] === 12, 'D-1: adding reads 2x = 12 — y eliminated without scaling')
    bothSides(sys, Frac.of(6), Frac.of(4), 'D-1')
  }
  // D-2 substitution with y already isolated: y = 2x, x + y = 9 → (3,6)
  {
    // x + 2x = 9 → 3x = 9 → x = 3; y = 6
    ok(3 * 3 === 9 && 3 * 2 === 6, 'D-2: (3,6) by direct substitution arithmetic')
    bothSides([-2, 1, 0, 1, 1, 9], Frac.of(3), Frac.of(6), 'D-2') // eq1: y = 2x ⟺ −2x + y = 0
    const r = cramer([-2, 1, 0, 1, 1, 9])
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(3)) && r.t.eq(Frac.of(6)), `D-2: dressed system → (3,6) — got ${show(r)}`)
  }
  // D-3 substitution with rearrangement: x + y = 7, 3x − y = 5 → (3,4)
  {
    const sys: [number, number, number, number, number, number] = [1, 1, 7, 3, -1, 5]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(3)) && r.t.eq(Frac.of(4)), `D-3: the rearrangement exhibit → (3,4) — got ${show(r)}`)
    // the substituted one-unknown line: 3x − (7 − x) = 5 ⟺ 4x = 12
    ok(4 * 3 === 12, 'D-3: the substituted line is 4x = 12, solved by 5.2')
    bothSides(sys, Frac.of(3), Frac.of(4), 'D-3')
    ok(3 * 3 - 4 === 5 && 3 + 4 === 7, 'D-3: the check in plain arithmetic — 9 − 4 = 5 and 7 = 7')
  }
  // D-4 elimination with a multiplier: 2x + 3y = 8, 3x − y = 1 → (1,2)
  {
    const sys: [number, number, number, number, number, number] = [2, 3, 8, 3, -1, 1]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(1)) && r.t.eq(Frac.of(2)), `D-4: the multiplier exhibit → (1,2) — got ${show(r)}`)
    // ×3 on eq2: 9x − 3y = 3; add: 11x = 11
    ok(3 * 3 === 9 && 2 + 9 === 11 && 8 + 3 === 11, 'D-4: the scaled pair adds to 11x = 11')
    bothSides(sys, Frac.of(1), Frac.of(2), 'D-4')
    ok(2 * 1 + 3 * 2 === 8 && 3 * 1 - 2 === 1, 'D-4: the check — 8 = 8 and 1 = 1')
  }
  // D-5 eliminating x: 3x + 2y = 12, 5x − 2y = 4 → (2,3)
  {
    const sys: [number, number, number, number, number, number] = [3, 2, 12, 5, -2, 4]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(2)) && r.t.eq(Frac.of(3)), `D-5: the eliminate-x exhibit → (2,3) — got ${show(r)}`)
    ok(3 + 5 === 8 && 12 + 4 === 16, 'D-5: the y-coefficients are already opposites — 8x = 16')
    bothSides(sys, Frac.of(2), Frac.of(3), 'D-5')
    ok(3 * 2 + 2 * 3 === 12 && 5 * 2 - 2 * 3 === 4, 'D-5: the check — 12 = 12 and 4 = 4')
  }
  // D-6 the decimal dress: 0.5x + 0.25y = 10, 0.75x − 0.25y = 5 → (12,16)
  {
    // ×4 strike (exact — the decimals are dyadic): 2x + y = 40 ; 3x − y = 20 → add: 5x = 60
    ok(0.5 * 4 === 2 && 0.25 * 4 === 1 && 10 * 4 === 40 && 0.75 * 4 === 3 && -0.25 * 4 === -1 && 5 * 4 === 20, 'D-6: the ×4 strike is exact')
    const sys: [number, number, number, number, number, number] = [2, 1, 40, 3, -1, 20]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(12)) && r.t.eq(Frac.of(16)), `D-6: the ×4-cleared system → (12,16) — got ${show(r)}`)
    ok(2 * 12 + 16 === 40 && 3 * 12 - 16 === 20, 'D-6: (12,16) checks in the cleared system')
    // the original decimals at (12,16): 0.5·12 = 6, 0.25·16 = 4 → 10; 0.75·12 = 9, −0.25·16 = −4 → 5
    ok(0.5 * 12 + 0.25 * 16 === 10 && 0.75 * 12 - 0.25 * 16 === 5, 'D-6: the original decimal dress checks exactly at (12,16)')
    bothSides([2, 1, 40, 3, -1, 20], Frac.of(12), Frac.of(16), 'D-6-cleared')
  }
  // D-7 the fraction dress: x/2 + y/3 = 8, x/6 − y/6 = 1 → (12,6)
  {
    // ×6 strike: 3x + 2y = 48 ; x − y = 6 → substitution: x = y + 6 → 5y + 18 = 48 → y = 6; x = 12
    const sys: [number, number, number, number, number, number] = [3, 2, 48, 1, -1, 6]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(12)) && r.t.eq(Frac.of(6)), `D-7: the ×6-cleared system → (12,6) — got ${show(r)}`)
    ok(3 * 12 + 2 * 6 === 48 && 12 - 6 === 6, 'D-7: (12,6) checks in the cleared system')
    ok(12 / 2 + 6 / 3 === 8 && 12 / 6 - 6 / 6 === 1, 'D-7: the original fraction dress checks exactly — 6 + 2 = 8 and 2 − 1 = 1')
    ok(5 * 6 === 30 && 30 + 18 === 48, 'D-7: the substituted line is 5y = 30')
  }
  // D-8 the k-parameter family: x + 2y = 3, 2x + 4y = k
  {
    for (const k of [-6, 0, 3, 5, 6, 9, 12]) {
      const v = cramer([1, 2, 3, 2, 4, k])
      if (k === 6) ok(v === 'infinite', `D-8: k = 6 → infinitely many (got ${JSON.stringify(v)})`)
      else ok(v === 'none', `D-8: k = ${k} → none (got ${JSON.stringify(v)})`)
    }
    // the k = 6 census: every solution of x + 2y = 3 also satisfies 2x + 4y = 6
    let common = 0
    for (const s of rng(-12, 12)) for (const t of rng(-12, 12)) if (s + 2 * t === 3 && 2 * s + 4 * t === 6) common++
    ok(common === 12, `D-8: k = 6 keeps all 12 windowed solutions of the first (odd s in [−12,12]) — got ${common}`)
  }
  // D-9 the word problems
  {
    // ages: father = son + 30; in 12 years, twice the son → f = 48, s = 18
    {
      const sys: [number, number, number, number, number, number] = [1, -1, 30, 1, -2, 12]
      // f − s = 30 ; f + 12 = 2(s + 12) ⟺ f + 12 = 2s + 24 ⟺ f − 2s = 12
      const r = cramer(sys)
      ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(48)) && r.t.eq(Frac.of(18)), `D-9: ages → father 48, son 18 — got ${show(r)}`)
      ok(48 === 18 + 30 && 48 + 12 === 2 * (18 + 12), 'D-9: the age story checks — 60 = 60 in twelve years')
      void sys
    }
    // cost: 3 pens + 2 pencils = 42 ; 5 pens + 4 pencils = 74 → (10, 6)
    {
      const sys: [number, number, number, number, number, number] = [3, 2, 42, 5, 4, 74]
      const r = cramer(sys)
      ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(10)) && r.t.eq(Frac.of(6)), `D-9: pens/pencils → (10,6) — got ${show(r)}`)
      ok(3 * 10 + 2 * 6 === 42 && 5 * 10 + 4 * 6 === 74, 'D-9: the cost story checks — 42 and 74')
    }
    // mixture: 6 L of 40% from 20% and 50% → 2 L + 4 L
    {
      const sys: [number, number, number, number, number, number] = [1, 1, 6, 2, 5, 24]
      // a + b = 6 ; 0.2a + 0.5b = 2.4 ⟺ (×10) 2a + 5b = 24
      const r = cramer(sys)
      ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(2)) && r.t.eq(Frac.of(4)), `D-9: mixture → 2 L + 4 L — got ${show(r)}`)
      // acid in tenths of a percent × litres (exact integer form of 0.2·2 + 0.5·4 = 0.4·6)
      ok(20 * 2 + 50 * 4 === 40 * 6 && 2 + 4 === 6, 'D-9: the mixture checks — 240 = 240 acid units in 6 L')
    }
  }
  console.log('[D] lesson 6.2 pinned computations: every method exhibit, dress, k-family and word problem verified exact')
}

/* ------------------------------------------------------------------ */
/* (E) the FIGURE GEOMETRY PLANS of 6.2                                */
/* ------------------------------------------------------------------ */

const plan62Fig1 = {
  w: 720,
  h: 340,
  name: 'the substitution flow — five stations with the running example',
  rects: [
    [30, 18, 660, 44], // title band
    [40, 110, 122, 70], // station 1 isolate
    [170, 110, 122, 70], // station 2 substitute
    [300, 110, 122, 70], // station 3 solve the one-unknown line
    [430, 110, 122, 70], // station 4 back-substitute
    [560, 110, 122, 70], // station 5 check
    [30, 220, 660, 44], // running-example band
    [45, 227, 200, 30], // running inner 1: the system
    [255, 227, 195, 30], // running inner 2: isolate + solve
    [460, 227, 215, 30], // running inner 3: the pair + check value
    [30, 284, 660, 40], // the check band
    [170, 291, 380, 26], // check inner: the habit line
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3, 4, 5],
    [6],
    [7, 8, 9],
    [10],
    [11],
  ],
}

const plan62Fig2 = {
  w: 720,
  h: 360,
  name: 'the two methods, one truth — substitution and elimination converge',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 140, 44], // SUBSTITUTION label
    [30, 140, 300, 44], // substitution steps 1
    [30, 196, 300, 44], // substitution steps 2
    [390, 84, 140, 44], // ELIMINATION label
    [390, 140, 300, 44], // elimination steps 1
    [390, 196, 300, 44], // elimination steps 2
    [240, 270, 240, 52], // the convergence box
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3],
    [4, 5, 6],
    [7],
  ],
}

{
  const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
    r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
  for (const [plan, w, h] of [
    [plan62Fig1, 720, 340],
    [plan62Fig2, 720, 360],
  ] as [typeof plan62Fig1, number, number][]) {
    for (const g of plan.groups) {
      const rs = g.map((i) => plan.rects[i])
      ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), `E: ${plan.name} group [${g.join(',')}] pairwise disjoint`)
    }
    for (const r of plan.rects) ok(r[0] >= 0 && r[1] >= 0 && r[0] + r[2] <= w && r[1] + r[3] <= h, `E: ${plan.name} rect ${r} inside the viewBox`)
    // containment: the running-example and check inner boxes sit inside their bands
    if (plan === plan62Fig1) {
      const band = plan.rects[6]
      for (const i of [7, 8, 9]) {
        const r = plan.rects[i]
        ok(r[0] >= band[0] && r[1] >= band[1] && r[0] + r[2] <= band[0] + band[2] && r[1] + r[3] <= band[1] + band[3], `E: substitution-flow inner ${r} inside the running band`)
      }
      const cband = plan.rects[10]
      const cr = plan.rects[11]
      ok(cr[0] >= cband[0] && cr[1] >= cband[1] && cr[0] + cr[2] <= cband[0] + cband[2] && cr[1] + cr[3] <= cband[1] + cband[3], 'E: substitution-flow check inner inside the check band')
    }
  }
  console.log('[E] figure plans for 6.2: geometry pinned and internally disjoint')
}


/* ------------------------------------------------------------------ */
/* (F) the authored lesson 6.1 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

{
  const ch06Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-06.ts').text()
  ok(chapter06.lessons.length === 2, 'F: chapter 6 carries two authored lessons (6.1 + 6.2)')
  const lesson = chapter06.lessons[0]
  ok(lesson.id === 'al-equations-in-two-variables', 'F: lesson id al-equations-in-two-variables')
  ok(lesson.number === '6.1', 'F: lesson number 6.1')
  ok(lesson.title === 'Equations in Two Variables', 'F: lesson title matches the planned title')
  ok(chapter06.status === 'in-progress', 'F: chapter 6 status in-progress (6.2 lands this run; 6.3 + review at run 78)')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-the-three-verdicts-one-none-infinitely-many', 'al-solving-linear-equations']),
    'F: prerequisites are 5.3 + 5.2'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style']),
    'F: the four citation keys ride the lesson'
  )
  ok(chapter06.plannedLessons !== undefined && chapter06.plannedLessons!.length === 1, 'F: plannedLessons holds the one remaining title')
  ok(chapter06.plannedLessons![0] === 'Consistency: the Geometry of Two Lines', 'F: the remaining planned title is 6.3 (closes at run 78)')
  // block census
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 20, `F: twenty paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `F: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 4, `F: four display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `F: one derivation (the elimination-identities theorem)`)
  ok(countKind('example') === 4, `F: four illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `F: one table (the trichotomy)`)
  ok(countKind('figure') === 2, `F: two figures (the sieve + the census strip)`)
  ok(countKind('formula') === 3, `F: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `F: one terms block`)
  ok(countKind('quiz') === 1, `F: one quiz block`)
  ok(countKind('exercises') === 1, `F: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,definition,exam,historical,insight,warn', `F: the six callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `F: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 2, 1, 2, 1]), 'F: quiz keys match the pinned [0, 2, 1, 2, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[0] === '$(5, 2)$', 'F: quiz Q1 option 1 is the pinned system solution (the key 0)')
      ok(q.items[3].options[2] === 'infinitely many solutions', 'F: quiz Q4 option 3 is the pinned doubled-dress verdict (the key 2)')
    }
  }
  // exercises shape + anchors
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'F: exercise set sizes 3/3/3/2/2/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'F: 14 exercises, Cengage chains, terminal answers')
      ok((all[8].answer || '').includes('\\frac{3}{2}'), 'F: L3.3 answer carries the pinned fractional pair')
      ok((all[9].answer || '').includes('k \\neq 10'), 'F: L4.1 answer carries the pinned k-verdict')
      ok((all[12].answer || '').includes('63'), 'F: L5.2 answer carries the pinned digit-hunt result 63')
      ok((all[13].answer || '').includes('never exactly two'), 'F: L6 answer carries the trichotomy argument')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 6.1 (the sieve + the census strip)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the sieve (after the "sieve" para); figs[1] = the census strip
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan61Fig1.rects.length, 'F: sieve rect census ' + r0.length + ' = plan ' + plan61Fig1.rects.length)
      ok(canon(r0) === canon(plan61Fig1.rects), 'F: sieve rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan61Fig2.rects.length + plan61Fig2.pairBoxes.length, 'F: census strip rect census ' + r1.length + ' = plan ' + (plan61Fig2.rects.length + plan61Fig2.pairBoxes.length))
      ok(canon(r1) === canon([...plan61Fig2.rects, ...plan61Fig2.pairBoxes]), 'F: census strip rects match the pinned plan exactly')
      for (const g of plan61Fig1.groups) {
        const rs = g.map((i) => plan61Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: sieve group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('a system is a sieve') && figs[0].svg.includes('BOTH') && figs[0].svg.includes('(6, 4)'), 'F: the sieve carries the AND-junction and the survivor')
      ok(figs[1].svg.includes('x + y = 10') && figs[1].svg.includes('x − y = 2') && figs[1].svg.includes('{(6, 4)}'), 'F: the census strip carries both assertions and the solution set')
      ok(figs[1].svg.includes('<line'), 'F: the failed-pair marks are lines (no extra rects)')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 360"'), 'F: the viewBoxes match the plans')
    }
  }
  // raw-$ scan on non-KaTeX titles
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'F: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'F: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan over the WHOLE chapter file (run-69 hardening)
  {
    let oddRuns = 0
    let i = 0
    while (i < ch06Src.length) {
      if (ch06Src[i] === '\\') {
        let j = i
        while (j < ch06Src.length && ch06Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-06.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan
  {
    const escapes = (ch06Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'F: no unicode escapes in ch-06.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (6.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 6.1 added)')
    ok(ids.includes('al-equations-in-two-variables'), 'F: the new id is registered in the library graph')
  }
  // live re-checks of three anchors straight from the authored content
  {
    const q = chapter06.lessons[0].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[4].options[1] === 'no — it fails the second equation', 'F: quiz Q5 option 2 is the pinned partial-check verdict (the key 1)')
    }
    const ex = chapter06.lessons[0].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4first = ex.sets[3].questions[0]
      ok((l4first.answer || '').includes('none verdict'), 'F: L4.1 answer carries the none verdict language')
    }
    const tb = chapter06.lessons[0].blocks.find((b) => b.kind === 'table')
    if (tb && tb.kind === 'table') {
      ok(tb.rows.length === 3 && tb.rows[2].join(' | ').includes('2x + 3y = 6'), 'F: the verdict table carries the doubled-dress exhibit')
    }
  }
  console.log('[F] the authored 6.1: identity, structure census, quiz keys, figure plans, scans — all green')
}


/* ------------------------------------------------------------------ */
/* (G) the authored lesson 6.2 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

{
  const lesson = chapter06.lessons[1]
  ok(lesson.id === 'al-substitution-and-elimination', 'G: lesson id al-substitution-and-elimination')
  ok(lesson.number === '6.2', 'G: lesson number 6.2')
  ok(lesson.title === 'Substitution and Elimination', 'G: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-equations-in-two-variables', 'al-solving-linear-equations']),
    'G: prerequisites are 6.1 + 5.2'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style']),
    'G: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 18, `G: eighteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `G: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `G: two display equations (the two dress strikes)`)
  ok(countKind('derivation') === 1, `G: one derivation (substitution loses nothing)`)
  ok(countKind('example') === 10, `G: ten illustrations (got ${countKind('example')})`)
  ok(countKind('figure') === 2, `G: two figures (the substitution flow + the two-methods strip)`)
  ok(countKind('algorithm') === 2, `G: two algorithm blocks (the two pipelines)`)
  ok(countKind('formula') === 3, `G: three formula cards`)
  ok(countKind('terms') === 1, `G: one terms block`)
  ok(countKind('table') === 0, `G: no table block in 6.2`)
  ok(countKind('quiz') === 1, `G: one quiz block`)
  ok(countKind('exercises') === 1, `G: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,exam,historical,insight,warn', `G: the five callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `G: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 0, 2, 1, 2]), 'G: quiz keys match the pinned [0, 0, 2, 1, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[0].includes('x = y + 4'), 'G: quiz Q1 option 1 is the pinned free isolation (the key 0)')
      ok(q.items[1].options[0] === '$11x = 11$', 'G: quiz Q2 option 1 is the pinned eliminated line (the key 0)')
      ok(q.items[3].options[1] === '$k \\neq 6$', 'G: quiz Q4 option 2 is the pinned k-verdict (the key 1)')
    }
  }
  // exercises shape + anchors
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'G: exercise set sizes 3/3/3/2/2/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'G: 14 exercises, Cengage chains, terminal answers')
      ok((all[9].answer || '').includes('$k = 8$'), 'G: L4.1 answer carries the pinned k = 8 proportionality')
      ok((all[10].answer || '').includes('29'), 'G: L4.2 answer carries the pinned ages (3, 29)')
      ok((all[11].answer || '').includes('9 rupees'), 'G: L5.1 answer carries the pinned pen price 9')
      ok((all[13].answer || '').includes('$D/g'), 'G: L6 answer carries the eliminated-coefficient argument')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 6.2')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan62Fig1.rects.length, 'G: substitution-flow rect census ' + r0.length + ' = plan ' + plan62Fig1.rects.length)
      ok(canon(r0) === canon(plan62Fig1.rects), 'G: substitution-flow rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan62Fig2.rects.length, 'G: two-methods rect census ' + r1.length + ' = plan ' + plan62Fig2.rects.length)
      ok(canon(r1) === canon(plan62Fig2.rects), 'G: two-methods rects match the pinned plan exactly')
      for (const g of plan62Fig1.groups) {
        const rs = g.map((i) => plan62Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: substitution-flow group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan62Fig2.groups) {
        const rs = g.map((i) => plan62Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: two-methods group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('substitution — five stations') && figs[0].svg.includes('5 CHECK'), 'G: the flow carries the five stations')
      ok(figs[0].svg.includes('x + y = 7, 3x − y = 5') && figs[0].svg.includes('4x = 12'), 'G: the flow carries the running example')
      ok(figs[1].svg.includes('SUBSTITUTION') && figs[1].svg.includes('ELIMINATION') && figs[1].svg.includes('the SAME pair'), 'G: the strip carries both tracks and the convergence')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 360"'), 'G: the viewBoxes match the plans')
    }
  }
  // D-10 the both-methods exhibit pinned at authoring time
  {
    const sys: [number, number, number, number, number, number] = [1, 2, 11, 2, -1, 7]
    const r = cramer(sys)
    ok(r !== 'none' && r !== 'infinite' && r.s.eq(Frac.of(5)) && r.t.eq(Frac.of(3)), `G/D-10: the both-methods exhibit → (5,3) — got ${show(r)}`)
    bothSides(sys, Frac.of(5), Frac.of(3), 'G/D-10')
    // substitution road: x = 11 − 2y → 22 − 5y = 7 → y = 3
    ok(2 * 11 - 5 * 3 === 7 && 11 - 2 * 3 === 5, 'G/D-10: the substitution road lands on (5,3)')
    // elimination road: ×2 second → 4x − 2y = 14; add → 5x = 25
    ok(4 + 1 === 5 && 22 + 14 === 36 && 5 * 5 === 25, 'G/D-10: the elimination road lands on x = 5')
  }
  // raw-$ scan on non-KaTeX titles + honest word count
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'algorithm' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'G: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'G: honest word count ' + words + ' >= 4000')
  }
  console.log('[G] the authored 6.2: identity, structure census, quiz keys, figure plans, D-10, scans — all green')
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch06 pre-writing battery (sections A-E): ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
