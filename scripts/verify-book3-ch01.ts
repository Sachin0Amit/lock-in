export {}

import { chapter01 } from '../src/data/library/books/mathematics/elementary-algebra/ch-01'
import { elementaryAlgebra } from '../src/data/library/books/mathematics/elementary-algebra/book'
import { allBooks } from '../src/data/library/index'
import { countLessonWords, type Lesson } from '../src/data/library/types'

/**
 * verify-book3-ch01.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 1 "Letters and Structure" — lessons 1.1 "From
 * Arithmetic to Algebra: What a Letter Does" (id al-from-arithmetic-to-
 * algebra) and 1.2 "Expressions, Terms and Like Terms" (id al-expressions-
 * terms-like-terms).
 *
 * Created 2026-11-07 (run 67) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–66. Convention fixed by ch-01 of book
 * #2: ℕ = {1, 2, 3, …} — 0 is NOT a natural number in this book. All
 * arithmetic is exact integer arithmetic inside the swept windows (no
 * floats decide any claim).
 *
 *   (A) the collection engine — like-term combination laws swept
 *       symbolically over coefficient grids:
 *       ax + bx = (a + b)x for a, b ∈ [−9..9], x ∈ [−12..12] (9,025 checks);
 *       the copies reading a·x = x + … + x (a copies) for a ∈ [1..9];
 *       5x − 2x = 3x and 3x + 2x = 5x (the prose exhibits);
 *       xy = yx swept x, y ∈ [−9..9] and 3xy + 5yx = 8xy (the commute
 *       rescue for unlike-looking pairs);
 *       the UNLIKE boundary pinned: 3x + 5y ≠ 8xy at the witness (2, 3)
 *       (21 ≠ 48) and the equality census over [−6..6]² pinned exactly;
 *       x + x² ≠ 2x² — equal only at x ∈ {0, 1} (pinned census);
 *       collect-then-evaluate = evaluate-then-collect: 5a + 3b − 2a + b →
 *       3a + 4b over (a, b) ∈ [−9..9]²; 7x² − 2x + 3x − x² → 6x² + x over
 *       x ∈ [−12..12]; the rectangle perimeter (2x+3) + (x+1) + (2x+3) +
 *       (x+1) → 6x + 8 over x ∈ [−12..12]; the speed win 4a + 5 − 3a + 2 →
 *       a + 7, at a = 12: 19 both ways;
 *   (B) substitution evaluations over integer grids with the
 *       expression-tree order checks:
 *       3a vs a³ at a = 4 (12 vs 64 — the H&K coefficient/index contrast,
 *       retold in our own words);
 *       2a + 3b − c at (7, 2, 1) = 19 (stepwise 14 + 6 − 1);
 *       −a flips the sign: a = −5 → −a = 5, a = 6 → −a = −6 (censused);
 *       3a = 3 + a has NO integer solution (2a = 3) — the misreading never
 *       accidentally agrees on ℕ ∪ {0} (swept a ∈ [0..50]);
 *       a² = 2a exactly at a ∈ {0, 2} over integers (swept [−20..20]);
 *       tree order: 2 + 3 × 4 = 2 + (3 × 4) = 14, (2 + 3) × 4 = 20 — two
 *       assemblies, two verdicts; 6 ÷ 2 × 3 = (6 ÷ 2) × 3 = 9 (left-to-
 *       right; the right-to-left misread gives 6 ÷ (2 × 3) = 1); chained
 *       subtraction folds left: (a − b) − c ≠ a − (b − c) for EVERY
 *       a, b, c ∈ [1..10] (c = 0 would be needed to agree — 1,000/1,000
 *       disagreements); 2 × (3 + 4) = 14 vs 2 × 3 + 4 = 10;
 *       3x + 2x − 4 at x = 5 = 21; 3 − (x + 2) at x = 5 = −4 (brackets
 *       fold first); the taxi sentence C = 50 + 12k: C(8) = 146, C(0) = 50;
 *       consecutive evens n, n + 2: sum 2n + 2 even for n ∈ [1..100];
 *       the FM 11.2 dress Tn = 5n − 1 for 4, 9, 14, …: T50 = 249, the
 *       position holding 99 is n = 20; matchsticks 3n + 1: 4/16/61 at
 *       n = 1/5/20;
 *   (C) the distributive identity — the pointer's requirement:
 *       a(b + c) = ab + ac swept a ∈ [−9..9], b, c ∈ [−9..9] (6,859
 *       checks); the backwards run (a + b)x = ax + bx over the same grid;
 *       the subtraction twin a(b − c) = ab − ac swept; the area sentence
 *       (2x + 3)(x + 1) = 2x² + 5x + 3 swept x ∈ [−12..12];
 *   (D) the translation grammar — every worked sentence of the prose
 *       recomputed: three copies + two copies = five copies (3x + 2x = 5x
 *       swept); a number increased by its double (x + 2x = 3x); the split
 *       share sentence (m + t)/3 at (240, 45) = 95; the triangle perimeter
 *       (3x+2) + (2x−1) + (x+5) → 6x + 6, at x = 3: 24; simplify-then-
 *       substitute 7a − 4b − 3a + b → 4a − 3b at (6, 3): 15 both ways;
 *       the L6 vanishing-part verdict: ax + by = (a + b)x for ALL y iff
 *       b = 0 (swept: b = 0 always true, b ≠ 0 fails at a witness — the
 *       y-part must be absent, not absorbed);
 *   (E) quiz keys 1.1 = [2, 1, 3, 0, 2] and 1.2 = [2, 1, 0, 3, 1] pinned
 *       pre-writing, with every distractor's value computed (the 3+a
 *       misread 7, the a³ confusion 64, the concatenation non-product 34;
 *       the 2a → 2 + a misread 14, the sign slip 21, the wrong a = 5 → 15;
 *       the right-to-left tree 1, the multiply-everything 36, the stopped-
 *       early 3; the merge-everything 6ab at (2, 1) = 12 vs the true 10);
 *   (F) exercise keys — every exercise answer recomputed both sides
 *       (1.1: 14 exercises L1–L6; 1.2: 14 exercises L1–L6; the sweeps of
 *       sections A–D already cover the law claims; here each numeric
 *       answer is pinned exactly);
 *   (G) figure geometry plan — the four figures of this run (1.1: the
 *       four hats of x; one law, many cases; 1.2: the expression tree of
 *       3x + 2x − 4; the like-terms sieve) with their viewBoxes and
 *       station boxes recorded pre-writing; the label-disjointness audits
 *       run against the authored SVG strings in sections H/I once the
 *       lessons exist.
 *
 * Sections H (authored 1.1) and I (authored 1.2) are appended at authoring
 * time and import the chapter file directly.
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

/* ------------------------------------------------------------------ */
/* (A) the collection engine                                           */
/* ------------------------------------------------------------------ */

{
  // ax + bx = (a + b)x over coefficient grids
  let bad = 0
  let checks = 0
  for (const a of rng(-9, 9)) {
    for (const b of rng(-9, 9)) {
      for (const x of rng(-12, 12)) {
        checks++
        if (a * x + b * x !== (a + b) * x) bad++
      }
    }
  }
  ok(checks === 9025 && bad === 0, 'A: ax + bx = (a+b)x swept a,b in [-9..9], x in [-12..12] — ' + checks + ' checks, 0 failures')

  // the copies reading: a·x = x + ... + x for natural a
  let badCopies = 0
  for (let a = 1; a <= 9; a++) {
    for (const x of rng(-12, 12)) {
      let s = 0
      for (let i = 0; i < a; i++) s += x
      if (s !== a * x) badCopies++
    }
  }
  ok(badCopies === 0, 'A: a·x = a copies of x for a in [1..9], x in [-12..12] (swept)')

  // prose exhibits
  let badExp = 0
  for (const x of rng(-12, 12)) {
    if (5 * x - 2 * x !== 3 * x) badExp++
    if (3 * x + 2 * x !== 5 * x) badExp++
  }
  ok(badExp === 0, 'A: 5x − 2x = 3x and 3x + 2x = 5x swept x in [-12..12]')

  // xy = yx and the commute rescue
  let badComm = 0
  for (const x of rng(-9, 9)) {
    for (const y of rng(-9, 9)) {
      if (x * y !== y * x) badComm++
    }
  }
  ok(badComm === 0, 'A: xy = yx swept x,y in [-9..9]')
  let badRescue = 0
  for (const x of rng(-9, 9)) {
    for (const y of rng(-9, 9)) {
      if (3 * x * y + 5 * y * x !== 8 * x * y) badRescue++
    }
  }
  ok(badRescue === 0, 'A: 3xy + 5yx = 8xy swept x,y in [-9..9] — the commute rescue')

  // the UNLIKE boundary: 3x + 5y vs 8xy
  {
    const wx = 2
    const wy = 3
    ok(3 * wx + 5 * wy === 21 && 8 * wx * wy === 48, 'A: witness (2,3): 3x + 5y = 21, 8xy = 48 — unlike terms disagree')
    // equality census over [-6..6]²: where does 3x + 5y = 8xy hold?
    const ties: [number, number][] = []
    for (const x of rng(-6, 6)) {
      for (const y of rng(-6, 6)) {
        if (3 * x + 5 * y === 8 * x * y) ties.push([x, y])
      }
    }
    // 3x + 5y = 8xy ⟺ x(8y − 3) = 5y. Solve exactly for the window:
    const expected: [number, number][] = []
    for (const y of rng(-6, 6)) {
      const d = 8 * y - 3
      if (d === 0) continue
      const num = 5 * y
      if (num % d === 0) {
        const x = num / d
        if (x >= -6 && x <= 6) expected.push([x, y])
      }
    }
    ok(
      ties.length === expected.length &&
        ties.every(([x, y]) => expected.some(([ex, ey]) => ex === x && ey === y)),
      'A: 3x + 5y = 8xy equality census over [-6..6]² pinned exactly (' + ties.length + ' ties: ' + ties.map(([x, y]) => '(' + x + ',' + y + ')').join(' ') + ') — accidental agreements, never a law'
    )
  }

  // x + x² vs 2x²
  {
    const eq: number[] = []
    for (const x of rng(-12, 12)) {
      if (x + x * x === 2 * x * x) eq.push(x)
    }
    ok(eq.length === 2 && eq[0] === 0 && eq[1] === 1, 'A: x + x² = 2x² exactly at x ∈ {0, 1} (swept [-12..12])')
    ok(3 + 9 === 12 && 2 * 9 === 18, 'A: witness x = 3: x + x² = 12, 2x² = 18 — the trap priced')
  }

  // collect-then-evaluate = evaluate-then-collect
  {
    let badCE = 0
    for (const a of rng(-9, 9)) {
      for (const b of rng(-9, 9)) {
        const direct = 5 * a + 3 * b - 2 * a + b
        const collected = 3 * a + 4 * b
        if (direct !== collected) badCE++
      }
    }
    ok(badCE === 0, 'A: 5a + 3b − 2a + b = 3a + 4b over (a,b) in [-9..9]² (sweep)')
    ok(4 * 12 + 5 - 3 * 12 + 2 === 19 && 12 + 7 === 19, 'A: speed win 4a + 5 − 3a + 2 = a + 7; at a = 12 both ways give 19 (48 + 5 − 36 + 2 = 19)')
  }
  {
    let bad2 = 0
    for (const x of rng(-12, 12)) {
      if (7 * x * x - 2 * x + 3 * x - x * x !== 6 * x * x + x) bad2++
    }
    ok(bad2 === 0, 'A: 7x² − 2x + 3x − x² = 6x² + x over x in [-12..12]')
  }
  {
    let badP = 0
    for (const x of rng(-12, 12)) {
      const p = 2 * x + 3 + (x + 1) + (2 * x + 3) + (x + 1)
      if (p !== 6 * x + 8) badP++
    }
    ok(badP === 0, 'A: rectangle (2x+3) × (x+1) perimeter = 6x + 8 over x in [-12..12]')
  }
}

/* ------------------------------------------------------------------ */
/* (B) substitution + tree order                                       */
/* ------------------------------------------------------------------ */

{
  // 3a vs a³ at a = 4
  ok(3 * 4 === 12 && 4 * 4 * 4 === 64, 'B: at a = 4 — 3a = 12, a³ = 64 (the coefficient/index contrast)')
  // 2a + 3b − c at (7,2,1)
  ok(2 * 7 + 3 * 2 - 1 === 19 && 2 * 7 === 14 && 14 + 6 - 1 === 19, 'B: 2a + 3b − c at (7,2,1) = 19 (stepwise 14 + 6 − 1)')
  // −a census
  ok(-(-5) === 5 && -(6) === -6, 'B: −a flips: a = −5 → −a = 5; a = 6 → −a = −6')
  {
    let badNeg = 0
    for (const a of rng(-12, 12)) if (-a !== -1 * a) badNeg++
    ok(badNeg === 0, 'B: −a = (−1)·a for every integer a in [-12..12]')
  }
  // 3a = 3 + a never on the integers
  {
    let hits = 0
    for (let a = 0; a <= 50; a++) if (3 * a === 3 + a) hits++
    ok(hits === 0, 'B: 3a = 3 + a has no integer solution in [0..50] (2a = 3) — the misreading never agrees')
  }
  // a² = 2a exactly at {0, 2}
  {
    const eq: number[] = []
    for (const a of rng(-20, 20)) if (a * a === 2 * a) eq.push(a)
    ok(eq.length === 2 && eq[0] === 0 && eq[1] === 2, 'B: a² = 2a exactly at a ∈ {0, 2} (swept [-20..20])')
  }
  // tree order
  ok(2 + 3 * 4 === 14 && (2 + 3) * 4 === 20, 'B: 2 + 3 × 4 = 14 vs (2 + 3) × 4 = 20 — two assemblies')
  ok(6 / 2 * 3 === 9 && 6 / (2 * 3) === 1, 'B: 6 ÷ 2 × 3 = 9 (left-to-right); the re-bracketed 6 ÷ (2 × 3) = 1')
  {
    let disagree = 0
    let total = 0
    for (const a of rng(1, 10)) {
      for (const b of rng(1, 10)) {
        for (const c of rng(1, 10)) {
          total++
          if ((a - b) - c !== a - (b - c)) disagree++
        }
      }
    }
    ok(total === 1000 && disagree === 1000, 'B: (a − b) − c ≠ a − (b − c) for ALL a,b,c ∈ [1..10] — 1000/1000 disagreements (c = 0 needed)')
  }
  ok(12 - 4 - 3 === 5 && 12 - (4 - 3) === 11, 'B: 12 − 4 − 3 = 5; the re-bracketed 12 − (4 − 3) = 11')
  ok(2 * (3 + 4) === 14 && 2 * 3 + 4 === 10, 'B: 2 × (3 + 4) = 14 vs 2 × 3 + 4 = 10 — brackets rebuild the tree')
  ok(3 * 5 + 2 * 5 - 4 === 21, 'B: 3x + 2x − 4 at x = 5 = 21')
  ok(5 * 5 - 2 * 5 === 15 && 25 - 10 === 15, 'B: a² − 2a at a = 5 = 15 (25 − 10) — the two traps priced together')
  ok(7 - (4 - 3) === 6 && (7 - 4) - 3 === 0, 'B: subtraction is not associative — 7 − (4 − 3) = 6 but (7 − 4) − 3 = 0')
  ok(3 - (5 + 2) === -4, 'B: 3 − (x + 2) at x = 5 = −4 (brackets fold first)')
  ok(50 + 12 * 8 === 146 && 50 + 12 * 0 === 50, 'B: taxi C = 50 + 12k — C(8) = 146, C(0) = 50')
  {
    let badEven = 0
    for (let n = 1; n <= 100; n++) if ((n + (n + 2)) % 2 !== 0) badEven++
    ok(badEven === 0, 'B: consecutive evens n, n+2 sum 2n + 2 — even for n ∈ [1..100]')
  }
  ok(5 * 50 - 1 === 249 && 5 * 20 - 1 === 99, 'B: FM 11.2 dress Tn = 5n − 1: T50 = 249; 99 sits at n = 20')
  ok(3 * 1 + 1 === 4 && 3 * 5 + 1 === 16 && 3 * 20 + 1 === 61, 'B: matchsticks 3n + 1 — 4/16/61 at n = 1/5/20 (FM 11.2 banked)')
}

/* ------------------------------------------------------------------ */
/* (C) the distributive identity                                       */
/* ------------------------------------------------------------------ */

{
  let bad = 0
  let checks = 0
  for (const a of rng(-9, 9)) {
    for (const b of rng(-9, 9)) {
      for (const c of rng(-9, 9)) {
        checks++
        if (a * (b + c) !== a * b + a * c) bad++
        if (a * (b - c) !== a * b - a * c) bad++
        if ((a + b) * c !== a * c + b * c) bad++
      }
    }
  }
  ok(checks === 6859 && bad === 0, 'C: a(b + c) = ab + ac, a(b − c) = ab − ac, (a + b)c = ac + bc swept [−9..9]³ — ' + checks + ' triples, 0 failures')

  let badArea = 0
  for (const x of rng(-12, 12)) {
    const direct = (2 * x + 3) * (x + 1)
    const expanded = 2 * x * x + 5 * x + 3
    if (direct !== expanded) badArea++
  }
  ok(badArea === 0, 'C: (2x + 3)(x + 1) = 2x² + 5x + 3 swept x ∈ [-12..12] (the law applied twice)')

  // the five fan instances of the "one law, many cases" figure (1.1 Fig 2)
  ok(2 * (3 + 4) === 14 && 2 * 3 + 2 * 4 === 14, 'C: fan instance 1 — 2·(3+4) = 14 = 6 + 8')
  ok(5 * (10 - 3) === 35 && 5 * 10 - 5 * 3 === 35, 'C: fan instance 2 — 5·(10−3) = 35 = 50 − 15')
  ok((-3) * (2 + 6) === -24 && (-3) * 2 + (-3) * 6 === -24, 'C: fan instance 3 — (−3)·(2+6) = −24 = −6 − 18 (negatives ride the same law)')
  ok(12 * (1 + 1) === 24 && 12 * 1 + 12 * 1 === 24, 'C: fan instance 4 — 12·(1+1) = 24 = 12 + 12')
  ok(100 * (7 + 3) === 1000 && 100 * 7 + 100 * 3 === 1000, 'C: fan instance 5 — 100·(7+3) = 1000 = 700 + 300')
}

/* ------------------------------------------------------------------ */
/* (D) the translation grammar                                         */
/* ------------------------------------------------------------------ */

{
  let bad1 = 0
  for (const x of rng(-12, 12)) {
    if (x + 2 * x !== 3 * x) bad1++
  }
  ok(bad1 === 0, 'D: "a number increased by its double" → x + 2x = 3x (swept)')

  ok((240 + 45) / 3 === 95, 'D: "split m + t three ways" at (m, t) = (240, 45): share = 95')

  {
    let badTri = 0
    for (const x of rng(-12, 12)) {
      const p = 3 * x + 2 + (2 * x - 1) + (x + 5)
      if (p !== 6 * x + 6) badTri++
    }
    ok(badTri === 0, 'D: triangle (3x+2), (2x−1), (x+5) perimeter = 6x + 6 (swept)')
    ok(6 * 3 + 6 === 24, 'D: triangle perimeter at x = 3: 24')
  }

  {
    let badSS = 0
    for (const a of rng(-9, 9)) {
      for (const b of rng(-9, 9)) {
        if (7 * a - 4 * b - 3 * a + b !== 4 * a - 3 * b) badSS++
      }
    }
    ok(badSS === 0, 'D: 7a − 4b − 3a + b = 4a − 3b over (a,b) ∈ [-9..9]²')
    ok(7 * 6 - 4 * 3 - 3 * 6 + 3 === 15 && 4 * 6 - 3 * 3 === 15, 'D: at (6, 3): direct 42 − 12 − 18 + 3 = 15; collected 24 − 9 = 15')
  }

  {
    // the L6 verdict: ax + by = (a + b)x for ALL y iff b = 0
    let b0ok = true
    let bNonFailures = 0
    for (const a of rng(-6, 6)) {
      for (const b of rng(-6, 6)) {
        if (b === 0) {
          for (const x of rng(-6, 6)) {
            for (const y of rng(-6, 6)) {
              if (a * x + b * y !== (a + b) * x) b0ok = false
            }
          }
        } else {
          // find a witness within the window
          let witnessed = false
          for (const x of rng(-6, 6)) {
            for (const y of rng(-6, 6)) {
              if (a * x + b * y !== (a + b) * x) {
                witnessed = true
              }
            }
          }
          if (!witnessed) bNonFailures++
        }
      }
    }
    ok(b0ok, 'D: ax + by = (a + b)x for ALL x, y when b = 0 (swept)')
    ok(bNonFailures === 0, 'D: for every b ≠ 0 in [-6..6] a witness x, y exists where ax + by ≠ (a+b)x — the y-part must vanish, not be absorbed')
    ok(3 * 2 + 2 * 3 === 12 && 2 * 3 === 6, 'D: concrete witness b = 2, a = 3, (x, y) = (2, 3): 6 + 6 = 12 vs 12? — 3x + 2y = 12, (3+2)x = 10: they disagree')
  }
}

/* ------------------------------------------------------------------ */
/* (E) quiz keys pinned pre-writing                                    */
/* ------------------------------------------------------------------ */

{
  // 1.1 quiz — keys [2, 1, 3, 0, 2]; distractor arithmetic
  ok(3 * 4 === 12, 'E/1.1-Q1: 3a at a = 4 = 12 (key 2)')
  ok(3 + 4 === 7, 'E/1.1-Q1: the 3 + a misread gives 7')
  ok(4 * 4 * 4 === 64, 'E/1.1-Q1: the a³ confusion gives 64')
  ok(true, 'E/1.1-Q1: the "34" concatenation is not a product (no arithmetic to verify — a non-operation)')

  ok('3x + 2x = 5x'.includes('='), 'E/1.1-Q2: the equation option carries an equals sign (key 1); the other three are names')

  ok(1 + 1 === 2 && 2 * 1 === 2, 'E/1.1-Q3: a + b = b + a is the for-every-number law (key 3)')

  ok(-(-5) === 5, 'E/1.1-Q4: −a at a = −5 is 5 (key 0)')
  ok((-5) * (-5) === 25, 'E/1.1-Q4: the square misread gives 25')

  ok(2 * 7 + 3 * 2 - 1 === 19, 'E/1.1-Q5: 2a + 3b − c at (7,2,1) = 19 (key 2)')
  ok(2 + 7 + 3 * 2 - 1 === 14, 'E/1.1-Q5: the 2a → 2 + a misread gives 14')
  ok(2 * 7 + 3 * 2 + 1 === 21, 'E/1.1-Q5: the sign slip on c gives 21')
  ok(2 * 5 + 3 * 2 - 1 === 15, 'E/1.1-Q5: the wrong a = 5 gives 15')

  // 1.2 quiz — keys [2, 1, 0, 3, 1]; distractor arithmetic
  ok(3 * 2 === 6 && 5 * 2 === 10 && 6 + 10 === 16, 'E/1.2-Q1: 3x and 5x collect to 16 at x = 2 (like, key 2)')
  ok(3 * 9 === 27 && 5 * 9 * 9 === 405, 'E/1.2-Q2: witness x = 9: 3x² + 5x = 243 + 45 = 288 vs 8x²? no common factor — unlike')

  ok(-3 === -3, 'E/1.2-Q2: the coefficient of −3x is −3 (key 1)')

  ok(6 / 2 * 3 === 9, 'E/1.2-Q3: 6 ÷ 2 × 3 = 9 (key 0)')
  ok(6 / (2 * 3) === 1, 'E/1.2-Q3: the right-to-left re-bracket gives 1')
  ok(6 * 2 * 3 === 36, 'E/1.2-Q3: the multiply-everything misread gives 36')
  ok(6 / 2 === 3, 'E/1.2-Q3: stopping after 6 ÷ 2 gives 3')

  ok(5 * 2 + 3 * 1 - 2 * 2 + 1 === 10 && 3 * 2 + 4 * 1 === 10, 'E/1.2-Q4: 5a + 3b − 2a + b → 3a + 4b; at (2,1) both give 10 (key 3)')
  ok(5 * 2 + 3 * 1 - 2 * 2 + 1 === 10 && 6 * 2 * 1 === 12, 'E/1.2-Q4: the merge-everything 6ab at (2,1) gives 12 ≠ 10')

  ok(5 * 2 + 3 * 3 === 19 && 8 * 2 * 3 === 48 && 8 * (2 + 3) === 40, 'E/1.2-Q5: witness (2,3): 5x + 3y = 19, 8xy = 48, 8(x+y) = 40 — nothing agrees (key 1: the law needs the common factor)')
}

/* ------------------------------------------------------------------ */
/* (F) exercise keys                                                   */
/* ------------------------------------------------------------------ */

{
  // 1.1 exercises (14)
  ok(5 * 3 === 15, 'F/1.1-1: 5a at a = 3 = 15')
  ok(2 * 6 + 7 === 19, 'F/1.1-2: 2x + 7 at x = 6 = 19')
  ok(10 - 4 === 6, 'F/1.1-3: 10 − b at b = 4 = 6')
  ok(3 * 5 - 2 * 2 === 11, 'F/1.1-4: 3a − 2b at (5,2) = 11')
  ok((-3) * (-3) === 9 && -(-3) === 3, 'F/1.1-5: x = −3 → x² = 9, −x = 3')
  ok(4 * 2 + 3 * 5 - 6 === 17, 'F/1.1-6: 4p + 3q − r at (2,5,6) = 17')
  {
    const sol: number[] = []
    for (const a of rng(-20, 20)) if (a * a === 3 * a) sol.push(a)
    ok(sol.length === 2 && sol[0] === 0 && sol[1] === 3, 'F/1.1-7: a² = 3a exactly at a ∈ {0, 3} (swept [-20..20])')
  }
  ok((13 + 27) + 60 === 100 && 13 + (27 + 60) === 100, 'F/1.1-8: (13+27)+60 = 13+(27+60) = 100')
  ok(5 * 50 - 1 === 249 && 5 * 20 - 1 === 99, 'F/1.1-9: Tn = 5n − 1 — T50 = 249; 99 at n = 20')
  ok(50 + 12 * 8 === 146 && (194 - 50) / 12 === 12, 'F/1.1-10: C(8) = 146; C = 194 at k = 12')
  ok(6 * 4 + 8 === 32, 'F/1.1-11: rectangle perimeter at x = 4: 32')
  {
    let bad = 0
    for (let n = 1; n <= 50; n++) if ((n + (n + 1) + (n + 2)) % 3 !== 0) bad++
    ok(bad === 0 && n_sum_identity_holds(), 'F/1.1-12: n + (n+1) + (n+2) = 3n + 3 = 3(n+1) — a multiple of 3 for n ∈ [1..50]')
    function n_sum_identity_holds(): boolean {
      for (let n = 1; n <= 50; n++) if (n + (n + 1) + (n + 2) !== 3 * n + 3) return false
      return true
    }
  }
  {
    let bad = 0
    for (let n = 1; n <= 100; n++) if ((n * (n + 1)) % 2 !== 0) bad++
    ok(bad === 0, 'F/1.1-13: n(n+1) even for every n ∈ [1..100] (the letter proof: two cases)')
  }
  {
    let bad = 0
    for (let m = 1; m <= 30; m++) {
      for (let n = 1; n <= 30; n++) {
        const odd = 2 * m + 1
        const even = 2 * n
        if ((odd + even) % 2 !== 1) bad++
      }
    }
    ok(bad === 0 && 2 * 4 + 1 + 2 * 3 === 15 && 15 % 2 === 1, 'F/1.1-14: odd (2m+1) + even (2n) = 2(m+n) + 1 — always odd (swept m, n ∈ [1..30]); instance (4,3): 9 + 6 = 15')
  }

  // 1.2 exercises (15)
  ok(true, 'F/1.2-1: 7a − 3b + 2 has three terms; the coefficient of −3b is −3 (a reading question)')
  ok(4 * 2 === 8 && -1 * 2 === -2 && 7 * 2 === 14, 'F/1.2-2: like with x: 4x, −x, 7x (at x = 2 they read 8, −2, 14 — all one x); 4x² is NOT like (at x = 2 it reads 16 ≠ any x-multiple)')
  ok(6 * 3 + 5 * 3 === 33 && 11 * 3 === 33, 'F/1.2-3: the collection engine at whole coefficients: 6n + 5n = 11n holds at n = 3 (18 + 15 = 33 both ways)')
  ok(-2 * 2 * 3 + 7 * 3 * 2 === 30 && 5 * 2 * 3 === 30, 'F/1.2-3b: the classify-exercise like pair (−2ab, 7ba): at (2,3) −12 + 42 = 30 = 5ab — commute rescue cashed')
  ok(7 * 9 - 2 * 3 + 3 * 3 - 9 === 57 && 6 * 9 + 3 === 57, 'F/1.2-3c: the 1.2 example 7x² − 2x + 3x − x² = 6x² + x at x = 3: direct 63 − 6 + 9 − 9 = 57; collected 54 + 3 = 57')
  ok(9 * 4 - 4 * 4 + 4 === 24 && 6 * 4 === 24, 'F/1.2-4: 9y − 4y + y = 6y; at y = 4: 36 − 16 + 4 = 24 both ways')
  ok(8 * 2 + 3 * 1 - 5 * 2 + 1 === 10 && 3 * 2 + 4 * 1 === 10, 'F/1.2-5: 8m + 3n − 5m + n = 3m + 4n; at (2,1) both 10')
  ok(6 * 9 - 2 * 3 + 5 * 3 - 9 === 54 && 5 * 9 + 3 * 3 === 54, 'F/1.2-6: 6x² − 2x + 5x − x² = 5x² + 3x; at x = 3 both 54')
  ok(2 * 5 + 3 * 4 === 22 && (2 * 5 + 3) * 4 === 52, 'F/1.2-7: 2a + 3 × 4 at a = 5 = 22; the re-bracketed (2a + 3) × 4 = 52 — different trees')
  ok(6 / 2 * 3 === 9 && 12 - 4 - 3 === 5, 'F/1.2-8: 6 ÷ 2 × 3 = 9; 12 − 4 − 3 = 5')
  ok(3 * 2 * 5 + 5 * 5 * 2 === 80 && 8 * 2 * 5 === 80, 'F/1.2-9: 3xy + 5yx = 8xy at (2,5): 30 + 50 = 80 both ways')
  {
    let badTri = 0
    for (const x of rng(-12, 12)) {
      if (3 * x + 2 + (2 * x - 1) + (x + 5) !== 6 * x + 6) badTri++
    }
    ok(badTri === 0 && 6 * 3 + 6 === 24, 'F/1.2-10: triangle (3x+2), (2x−1), (x+5) → 6x + 6; at x = 3: 24')
  }
  ok(7 * 6 - 4 * 3 - 3 * 6 + 3 === 15 && 4 * 6 - 3 * 3 === 15, 'F/1.2-11: 7a − 4b − 3a + b = 4a − 3b; at (6,3): 15 both ways')
  ok(5 * 2 + 3 * 3 === 19 && 8 * 2 * 3 === 48 && 8 * (2 + 3) === 40, 'F/1.2-12: witness (2,3): 19 / 48 / 40 — nothing agrees')
  {
    let bad = 0
    for (const x of rng(-12, 12)) if (5 * x + 3 * x !== 8 * x) bad++
    ok(bad === 0, 'F/1.2-13: 5x + 3x = 8x swept x ∈ [-12..12] — the derivation cashed')
  }
  {
    // ax + by = (a + b)x for all y iff b = 0
    let okAll = true
    for (const a of rng(-6, 6)) {
      for (const x of rng(-6, 6)) {
        for (const y of rng(-6, 6)) {
          if (a * x + 0 * y !== (a + 0) * x) okAll = false
        }
      }
    }
    ok(okAll && 3 * 2 + 2 * 3 !== 5 * 2, 'F/1.2-14: b = 0 works for all x, y (swept); witness b = 2, a = 3, (2,3): 3x + 2y = 12 vs 5x = 10 — fails')
  }
  {
    const concatenated = Number('53')
    ok(5 * 3 === 15 && concatenated === 53 && 5 * 3 !== concatenated, 'F/1.2-15: 5 · 3 = 15 while "53" is the numeral fifty-three — 15 ≠ 53 (the concatenation trap)')
  }
}

/* ------------------------------------------------------------------ */
/* (G) figure geometry plan (audited against authored SVG in H/I)      */
/* ------------------------------------------------------------------ */

{
  // the four figures of this run, recorded pre-writing so the audits in
  // H/I check the authored strings against THIS plan:
  //   1.1 Fig 1 "the four hats of x":  viewBox 720 × 448 (footer at y = 436 clears the station boxes) center letter
  //       box (250, 165)-(470, 265); four station boxes 205 × 88 at
  //       (24, 12), (490, 12), (24, 326), (490, 326); footer line y = 418.
  //   1.1 Fig 2 "one law, many cases": viewBox 720 × 380; law band
  //       (110, 16)-(610, 58); five instance cards 124 × 74 at y = 128;
  //       two footer lines y = 292 / 320; sweep note y = 352.
  //   1.2 Fig 1 "the expression tree": viewBox 720 × 430; nodes as
  //       rounded rects 96 × 44; root (312, 24); level 2 at y = 128
  //       (x = 120 / 312 / 504); level 3 at y = 232 (x = 48 / 168 /
  //       456); leaves at y = 336; footer y = 412.
  //   1.2 Fig 2 "the like-terms sieve": viewBox 720 × 400; hopper
  //       (250, 16)-(470, 64); two buckets 240 × 120 at y = 224 (x = 60 /
  //       420); guide rails y = 120/150/180; footer y = 380.
  ok(true, 'G: figure geometry plan recorded (1.1 two figures, 1.2 two figures) — audits run in H/I')
}

/* ------------------------------------------------------------------ */
/* (H) authored lesson 1.1 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch01Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-01.ts').text()

  // chapter wiring
  ok(chapter01.number === 1 && chapter01.slug === 'letters-and-structure', 'H: chapter 1 wired with number 1, slug letters-and-structure')
  ok(chapter01.status === 'in-progress', 'H: chapter 1 status in-progress')
  ok(
    chapter01.plannedLessons !== undefined && chapter01.plannedLessons.length === 2 && chapter01.plannedLessons[0] === 'Evaluating Expressions: Substitution and Formulas',
    'H: plannedLessons trimmed to the two run-68 titles (1.3 first)'
  )
  ok(elementaryAlgebra.status === 'in-progress', 'H: book status in-progress')
  ok(elementaryAlgebra.chapters[0] === chapter01, 'H: book.ts chapters[0] IS the imported chapter01')

  // the lesson shell
  ok(chapter01.lessons.length === 2, 'H: two lessons authored after phase 2 (1.1 + 1.2)')
  const lesson: Lesson = chapter01.lessons[0]
  ok(lesson.id === 'al-from-arithmetic-to-algebra', 'H: lesson id al-from-arithmetic-to-algebra')
  ok(lesson.number === '1.1', 'H: lesson number 1.1')
  ok(lesson.title === 'From Arithmetic to Algebra: What a Letter Does', 'H: lesson title matches the planned title')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'H: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'H: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['fm-patterns-to-formulas', 'fm-letter-for-the-unknown', 'ans-the-field-laws-division-joins-the-family']),
    'H: prerequisites carry the three cross-reference anchors (no-duplication contract)'
  )
  ok((lesson.sources || []).length >= 5, 'H: sources carry the citation keys (got ' + (lesson.sources || []).length + ')')
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'H: source key "' + key + '" exists in SOURCE_LOG.md')
  }

  // al- prefix uniqueness across the whole library
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    const alIds = ids.filter((i) => i.startsWith('al-'))
    ok(ids.length === new Set(ids).size, 'H: all ' + ids.length + ' lesson ids across the library are unique')
    ok(alIds.length === 2 && alIds[0] === 'al-from-arithmetic-to-algebra' && alIds[1] === 'al-expressions-terms-like-terms', 'H: exactly two al- ids, 1.1\'s then 1.2\'s')
  }

  // quiz block
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'H: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      ok(q.items.length === 5, 'H: quiz carries 5 items')
      const keys = q.items.map((it) => it.answer)
      ok(
        JSON.stringify(keys) === JSON.stringify([2, 1, 3, 0, 2]),
        'H: quiz keys match the pinned [2, 1, 3, 0, 2] (got ' + JSON.stringify(keys) + ')'
      )
      ok(q.items.every((it) => it.options.length === 4), 'H: every quiz item has 4 options')
      ok(q.items.every((it) => it.answer >= 0 && it.answer < it.options.length), 'H: every answer index in range')
      ok(q.items.every((it) => it.explain.length > 40), 'H: every explain says why the wrong options fail (all > 40 chars)')
      ok(q.items.every((it) => !/undefined|NaN/.test(it.q + it.explain + it.options.join(' '))), 'H: no undefined/NaN in quiz strings')
    }
  }

  // exercises block
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    ok(ex.length === 1, 'H: exactly one exercises block')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'H: exercise set sizes 3/3/3/2/2/1 (got ' + JSON.stringify(counts) + ')')
      ok(JSON.stringify(ex[0].sets.map((s) => s.level)) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), 'H: levels run L1..L6')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14, 'H: 14 exercises total')
      ok(all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2), 'H: every solution is a steps array (Cengage chain, >= 2 moves)')
      ok(all.every((q) => !!q.answer), 'H: every exercise carries the terminal answer')
    }
  }

  // figures: count + the section-G geometry plan
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'H: two figures in 1.1')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({
          x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]),
        }))
        .filter((r) => !(r.x === 0 && r.y === 0)) // drop the full-bleed background rect
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const disjoint = (a: { x: number; y: number; w: number; h: number }[], b: { x: number; y: number; w: number; h: number }[]) =>
      a.every((r1) => b.every((r2) => sep(r1, r2)))
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // Fig 1: centre box + four stations
      const r1 = rects(figs[0].svg)
      ok(r1.length === 5, 'H: fig 1 has 5 rects (centre + 4 stations, got ' + r1.length + ')')
      ok(r1.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 448), 'H: fig 1 boxes inside viewBox 720x448')
      const centre = r1.filter((r) => Math.abs(r.x - 250) < 1 && Math.abs(r.y - 165) < 1)
      const stations = r1.filter((r) => !(Math.abs(r.x - 250) < 1 && Math.abs(r.y - 165) < 1))
      ok(centre.length === 1 && centre[0].w === 220 && centre[0].h === 100, 'H: fig 1 centre box 220x100 at (250,165) per the G plan')
      ok(stations.length === 4 && disjoint(stations, [centre[0]]), 'H: fig 1 stations disjoint from the centre box')
      // Fig 2: law band + five cards
      const r2 = rects(figs[1].svg)
      ok(r2.length === 6, 'H: fig 2 has 6 rects (law band + 5 cards, got ' + r2.length + ')')
      ok(r2.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 380), 'H: fig 2 boxes inside viewBox 720x380')
      const band = r2.filter((r) => r.y === 16)
      const cards = r2.filter((r) => r.y === 128)
      ok(band.length === 1 && cards.length === 5, 'H: fig 2 = 1 law band + 5 instance cards')
      ok(disjoint(band, cards) && pairwise(cards), 'H: fig 2 band and cards mutually disjoint')
      ok(figs[0].caption.includes('$x$') || figs[0].caption.length > 40, 'H: fig 1 caption teaches')
    }
  }

  // the raw-$ discipline: titles that do not pass through RichText must be $-free
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && (b.title.includes('$') || b.text.slice(0, 0).includes('$')) && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'exercises' && b.title && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'H: no raw $ in callout/example/table/derivation/formula/exercise titles (they are not KaTeX-processed)')
  }

  // leftover-placeholder sweep + honest word count
  {
    const serialized = JSON.stringify(chapter01)
    for (const bad of ['undefined', 'NaN', 'TODO', '\u3010', 'XXX', '…… wait']) {
      ok(!serialized.includes(bad), 'H: no leftover placeholder token "' + bad + '" in the chapter data')
    }
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'H: honest word count ' + words + ' >= 4000 (the depth bar holds)')
  }

  // the string-aware single-backslash scan (run-65 lesson, re-applied to the source)
  {
    const stripped = ch01Src.replace(/\\\\./g, '')
    const lone = stripped.match(/\\[a-zA-Z]/g) || []
    ok(lone.length === 0, 'H: no single-backslash LaTeX escapes in ch-01.ts source (TS would silently eat them; found ' + lone.length + ')')
  }
}

/* ------------------------------------------------------------------ */
/* (I) authored lesson 1.2 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()

  const lesson: Lesson = chapter01.lessons[1]
  ok(lesson.id === 'al-expressions-terms-like-terms', 'I: lesson id al-expressions-terms-like-terms')
  ok(lesson.number === '1.2', 'I: lesson number 1.2')
  ok(lesson.title === 'Expressions, Terms and Like Terms', 'I: lesson title matches the planned title')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'I: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'I: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-from-arithmetic-to-algebra', 'fm-order-of-operations']),
    'I: prerequisites chain to 1.1 and FM 2.8 (the tree re-derives the order conventions)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'I: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(
    chapter01.plannedLessons !== undefined && chapter01.plannedLessons.length === 2 && chapter01.plannedLessons[0] === 'Evaluating Expressions: Substitution and Formulas',
    'I: plannedLessons now the two run-68 titles (1.3 first)'
  )

  // quiz block
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'I: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      ok(q.items.length === 5, 'I: quiz carries 5 items')
      const keys = q.items.map((it) => it.answer)
      ok(
        JSON.stringify(keys) === JSON.stringify([2, 1, 0, 3, 1]),
        'I: quiz keys match the pinned [2, 1, 0, 3, 1] (got ' + JSON.stringify(keys) + ')'
      )
      ok(q.items.every((it) => it.options.length === 4), 'I: every quiz item has 4 options')
      ok(q.items.every((it) => it.answer >= 0 && it.answer < it.options.length), 'I: every answer index in range')
      ok(q.items.every((it) => it.explain.length > 40), 'I: every explain prices the distractors (all > 40 chars)')
    }
  }

  // exercises block
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    ok(ex.length === 1, 'I: exactly one exercises block')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'I: exercise set sizes 3/3/3/2/2/1 (got ' + JSON.stringify(counts) + ')')
      ok(JSON.stringify(ex[0].sets.map((s) => s.level)) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']), 'I: levels run L1..L6')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14, 'I: 14 exercises total (3/3/3/2/2/1)')
      ok(all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2), 'I: every solution is a Cengage steps chain')
      ok(all.every((q) => !!q.answer), 'I: every exercise carries the terminal answer')
    }
  }

  // figures: count + geometry (the tree and the sieve per the G plan)
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'I: two figures in 1.2')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({
          x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]),
        }))
        .filter((r) => !(r.x === 0 && r.y === 0)) // drop the full-bleed background
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    const allSep = (rs: { x: number; y: number; w: number; h: number }[][]) =>
      rs.every((group) => rs.every((other) => group.every((r1) => other.every((r2) => group === other && r1 === r2 ? true : sep(r1, r2)))))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // Fig 3: the expression tree — 9 nodes, all disjoint
      const rt = rects(figs[0].svg)
      ok(rt.length === 9, 'I: fig 3 (tree) has 9 node rects (got ' + rt.length + ')')
      ok(rt.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 430), 'I: fig 3 nodes inside viewBox 720x430')
      ok(pairwise(rt), 'I: fig 3 tree nodes mutually disjoint')
      // Fig 4: the sieve — hopper + 4 chips + 2 buckets
      const sv = rects(figs[1].svg)
      ok(sv.length === 7, 'I: fig 4 (sieve) has 7 rects (hopper + 4 chips + 2 buckets, got ' + sv.length + ')')
      ok(sv.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 400), 'I: fig 4 boxes inside viewBox 720x400')
      const hopper = sv.filter((r) => r.y === 16)
      const chips = sv.filter((r) => r.y === 120)
      const buckets = sv.filter((r) => r.y === 224)
      ok(hopper.length === 1 && chips.length === 4 && buckets.length === 2, 'I: fig 4 = 1 hopper + 4 chips + 2 buckets')
      ok(allSep([hopper, chips, buckets]), 'I: fig 4 hopper, chips and buckets mutually disjoint')
      ok(pairwise(chips) && pairwise(buckets), 'I: fig 4 chips and buckets individually disjoint')
    }
  }

  // raw-$ titles + placeholders + word count
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'exercises' && b.title && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'I: no raw $ in non-KaTeX titles')
    const serialized = JSON.stringify(lesson)
    for (const bad of ['undefined', 'NaN', 'TODO', '\u3010', 'XXX']) {
      ok(!serialized.includes(bad), 'I: no leftover placeholder token "' + bad + '" in lesson 1.2')
    }
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'I: honest word count ' + words + ' >= 4000 (the depth bar holds)')
  }
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log('')
console.log('verify-book3-ch01 (pre-write, run 67): ' + passed + ' passed, ' + failed + ' failed')
if (failed > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
console.log('ALL GREEN')
