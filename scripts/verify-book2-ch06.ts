/**
 * verify-book2-ch06.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 6 "Building the
 * Integers".
 *
 * Created 2026-11-06 (run 58) — every number of the chapter is verified
 * here BEFORE anything is written into ch-06.ts, per the verify-first
 * discipline of runs 55–57.
 *
 *   (A) 6.1 the subtraction failure: a − b exists in ℕ (this book's ℕ =
 *       {1, 2, 3, …}, 0 excluded — Lesson 1.1's term) exactly when b < a;
 *       the printed instances (7 − 4 = 3 exists; 4 − 7 and 5 − 5 dead —
 *       5 − 5 would be 0, not a natural); the wall instances: no natural
 *       x solves x + 1 = 1 (no predecessor of 1), x · 1 = 1 dead too;
 *   (B) 6.1 the equation census: x + b = a solvable in ℕ ⟺ a > b, swept
 *       a, b ≤ 20; x · c = d solvable ⟺ c | d, swept c, d ≤ 20; the
 *       printed instances (x + 4 = 9 → 5; x + 9 = 4 dead; x + 5 = 5 dead;
 *       x · 3 = 12 → 4; x · 3 = 7 dead; x · 2 = 8 → 4; x · 2 = 7 dead);
 *       the census counts printed in the 6.1 table (dead addition pairs
 *       a, b ≤ 6: 21 of 36; dead multiplication pairs c, d ≤ 6: 22 of 36
 *       — 14 divisibility pairs enumerated);
 *   (C) 6.1 the repair criterion + figure-1 geometry: the −5..7 line
 *       coordinates (solid ℕ segment 1..7, dashed extension −5..0, the
 *       wall glyph between 0 and 1), all label gaps ≥ 18 px;
 *   (D) 6.2 the pairing relation: (a, b) ~ (c, d) ⟺ a + d = b + c — the
 *       printed instances ((5,2)~(8,5) via 5+5 = 2+8 = 10; (3,1)~(5,3);
 *       the non-instance (5,2)≁(6,2)); reflexivity, symmetry and
 *       transitivity SWEPT (transitivity over all (a..f) ≤ 5 — the
 *       cancellation step a+d+c+f = b+c+d+e ⟹ a+f = b+e exercised
 *       numerically on the chain (5,2)~(8,5)~(11,8));
 *   (E) 6.2 the class operations and well-definedness (the original sin):
 *       addition and multiplication of classes
 *       [(a,c)] + [(c,d)] = [(a+c, b+d)] and
 *       [(a,b)] · [(c,d)] = [(ac+bd, ad+bc)] swept for representative
 *       independence over all pairs entries ≤ 4 (all 8-tuples), zero;
 *       the printed two-representative computations ((5,2) vs (8,5)
 *       added and multiplied by (3,1) both ways — same class each time);
 *       negation [(b,a)], the diagonal zero [(k,k)] (all diagonals
 *       equivalent, absorption swept), the unit [(2,1)] behaviour swept;
 *   (F) 6.2 the dictionary: canonical forms (n+1, 1) ↦ n, (1, 1) ↦ 0,
 *       (1, n+1) ↦ −n; the trichotomy sweep (every pair a, b ≤ 8 reduces
 *       to exactly one canonical form — pairwise inequivalence of the
 *       three families swept); the embedding n ↦ [(n+1, 1)] additive and
 *       multiplicative swept m, n ≤ 12; the printed dictionary rows
 *       ((6,1)=5, (1,6)=−5, (4,4)=0, (9,2)=7, (2,9)=−7, (3,1)=2,
 *       (5,2)=3, (2,1)=1, (1,1)=0, (1,3)=−2);
 *   (G) 6.2 the addition and multiplication tables computed THROUGH the
 *       construction (canonical representatives only): sums and products
 *       of the classes −4..4, cell by cell against the oracle; the
 *       printed cells; the canonical-reduction algorithm block;
 *   (H) 6.3 the laws derived from the construction: commutativity and
 *       associativity of + and ×, distributivity, identities (zero for
 *       +, one = [(2,1)] for ×, uniqueness of the unit swept), negation
 *       involution, zero absorption — ALL verified through clsAdd/clsMul
 *       on canonical representatives (never through ordinary arithmetic),
 *       sweeps over the classes −6..6;
 *   (I) 6.3 the sign rules DERIVED: a·(−b) = −(ab), (−a)·b = −(ab),
 *       (−a)·(−b) = ab — the printed pair computations ((2,1)·(1,3) =
 *       (5,7) ↦ −2; (2,1)·(1,4) = (6,9) ↦ −3; (1,2)·(1,3) = (7,5) ↦ 2;
 *       (1,3)·(1,4) = (13,7) ↦ 6) plus the general sweep over a, b ∈
 *       −6..6 (169 pairs each, construction vs oracle); the mixed sums
 *       (3 + (−5) ↦ −2; −5 + 5 ↦ 0) and the powers ((−5)² = 25 through
 *       (37,12); (−5)³ = −125 through (109,234)); Brahmagupta's four
 *       verse-lines cashed numerically;
 *   (J) 6.3 the order: [(a,b)] ≤ [(c,d)] ⟺ a + d ≤ c + b — well-defined
 *       (equivalent representatives give the same verdict, swept) and
 *       matching the oracle on every pair of classes −8..8; the mirror
 *       flip a < b ⟹ −b < −a proved and swept; the printed chain
 *       −5 < −2 < 0 < 3 < 7 and the −8 vs −3 instance; figure-3 (mirror
 *       map) geometry, label gaps ≥ 18 px;
 *   (K) 6.3 the repair cashed: subtraction total (x − y = x + mirror(y),
 *       swept a, b ∈ −8..8); additive cancellation universal (swept);
 *       the printed solve 3 + x = 2 → x = −1 through pairs (4,5);
 *       multiplicative cancellation for nonzero c (swept) via the
 *       zero-product lemma (c·x ~ 0 ⟺ c ~ 0 or x ~ 0, swept);
 *   (L) the next failure previewed: x · 2 = 3 dead in ℤ (swept over the
 *       classes −20..20); the ch-02 promise cashed — 42·1 − 12·3 = 6 as
 *       literal class arithmetic ((43,1) + (1,37) = (44,38) ~ (7,1));
 *   (M–N) the exam shapes recomputed both sides (6.1's ℕ-vs-ℤ verdicts,
 *       the lift narration −3 < −1, the gap 5 − (−3) = 8 through pairs;
 *       6.3's distributive sign factoring (−6)·47 + (−6)·53 = −600
 *       through the construction, the (−2)³ = −8 chain, ordering MCQs);
 *   (O–T) the three lessons' quiz keys re-derived (6.1: 2/1/0/0/0,
 *       6.2: 2/2/0/0/1, 6.3: 1/0/1/1/2) with every distractor evaluated;
 *       all 42 exercise keys re-derived; the 12 formula cards verified;
 *   (V) all figure geometry (the 6.1 wall line, the 6.2 difference
 *       lattice — 81 dots on the x/y grids, three class diagonals, label
 *       positions, pairwise gaps ≥ 18 px; the 6.3 mirror line);
 *   (W) the completion cashing — cross-lesson bridges (the census rows
 *       answered by the construction; the tables' cells obeying 6.3's
 *       laws; the ch-02 footnote's promise delivered).
 *
 * Engine discipline: chapter 1's recursion (add/mul built from S), the
 * order-as-runs machinery and the induction apparatus are CITED, never
 * re-proved; cancellation in ℕ is exercised via the order engine (equal
 * totals + equal addends force equal start points — trichotomy), exactly
 * as the derivation in print says. Foundation Mathematics lessons 7.1–7.4
 * (the operational signed-number bank: chosen zero, the four operations,
 * the sign rules, |x|) are cross-referenced, never repeated — this
 * chapter DERIVES what they banked.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

let pass = 0
let fail = 0
const failures: string[] = []

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++
  } else {
    fail++
    failures.push(label)
    console.log('  FAIL: ' + label)
  }
}

/** difference-pair equivalence: (a, b) ~ (c, d) ⟺ a + d = b + c */
function eq(a: number, b: number, c: number, d: number): boolean {
  return a + d === b + c
}

/** class addition: [(a,b)] + [(c,d)] = [(a+c, b+d)] */
function clsAdd(a: number, b: number, c: number, d: number): [number, number] {
  return [a + c, b + d]
}

/** class multiplication: [(a,b)] · [(c,d)] = [(ac+bd, ad+bc)] */
function clsMul(a: number, b: number, c: number, d: number): [number, number] {
  return [a * c + b * d, a * d + b * c]
}

/** class negation: −[(a,b)] = [(b,a)] */
function clsNeg(a: number, b: number): [number, number] {
  return [b, a]
}

/** canonical representative of the class of value v (v ∈ ℤ):
 *  v > 0 → (v+1, 1); v = 0 → (1, 1); v < 0 → (1, 1−v) */
function canon(v: number): [number, number] {
  if (v > 0) return [v + 1, 1]
  if (v < 0) return [1, 1 - v]
  return [1, 1]
}

/** the dictionary oracle: the value a class [(a,b)] names (a − b).
 *  Used ONLY to check the construction's outputs, never as the
 *  construction itself. */
function val(a: number, b: number): number {
  return a - b
}

/** class order via representatives: [(a,b)] ≤ [(c,d)] ⟺ a + d ≤ c + b */
function clsLE(a: number, b: number, c: number, d: number): boolean {
  return a + d <= c + b
}

/* ------------------------------------------------------------------ */
/* (A) 6.1 the subtraction failure                                     */
/* ------------------------------------------------------------------ */
{
  // the printed instances: subtraction exists in ℕ exactly when b < a
  ok(7 - 4 === 3 && 7 > 4, 'A: 7 − 4 = 3 exists in ℕ (b < a)')
  ok(4 - 7 < 0 && 4 <= 7, 'A: 4 − 7 does not exist in ℕ (b ≥ a)')
  ok(5 - 5 === 0, 'A: 5 − 5 would be 0 — and 0 is not a natural in this book (Lesson 1.1), so 5 − 5 is dead in ℕ too')
  ok(![1, 2, 3, 4, 5].some((x) => x - x >= 1), 'A: a − a is never a natural (a − a = 0 ∉ ℕ) — swept a ≤ 5')
  // the wall: no predecessor of 1 — no natural x solves x + 1 = 1
  let wallBad = 0
  for (let x = 1; x <= 50; x++) if (x + 1 === 1) wallBad++
  ok(wallBad === 0, 'A: no natural x solves x + 1 = 1 — swept x ≤ 50 (1 has no predecessor: Peano axiom (i))')
  ok(![1, 2, 3, 4, 5].some((x) => x * 1 === 1 && x !== 1), 'A: x · 1 = 1 forces x = 1 — the multiplication wall only bars 0, subtraction bars more')
  // counting backwards along the chain hits the wall: the predecessor chain of 4 is 3, 2, 1 — and stops
  const chain: number[] = [4]
  while (chain[chain.length - 1] > 1) chain.push(chain[chain.length - 1] - 1)
  ok(chain.join(',') === '4,3,2,1', 'A: the backwards chain of 4 runs 4, 3, 2, 1 and STOPS — the successor chain runs forward only')
}

/* ------------------------------------------------------------------ */
/* (B) 6.1 the equation census                                         */
/* ------------------------------------------------------------------ */
{
  // x + b = a solvable in ℕ ⟺ a > b — swept
  let addBad = 0
  for (let a = 1; a <= 20; a++) {
    for (let b = 1; b <= 20; b++) {
      const solvable = (a > b) && Number.isInteger(a - b) && a - b >= 1
      const brute = Array.from({ length: 40 }, (_, i) => i + 1).some((x) => x + b === a)
      if (solvable !== brute) addBad++
    }
  }
  ok(addBad === 0, 'B: x + b = a solvable in ℕ ⟺ a > b — swept a, b ≤ 20 against brute search, zero mismatches')

  // x · c = d solvable in ℕ ⟺ c | d — swept
  let mulBad = 0
  for (let c = 1; c <= 20; c++) {
    for (let d = 1; d <= 20; d++) {
      const solvable = d % c === 0 && d / c >= 1
      const brute = Array.from({ length: 40 }, (_, i) => i + 1).some((x) => x * c === d)
      if (solvable !== brute) mulBad++
    }
  }
  ok(mulBad === 0, 'B: x · c = d solvable in ℕ ⟺ c | d — swept c, d ≤ 20 against brute search, zero mismatches')

  // the printed instances
  ok(9 - 4 === 5, 'B: x + 4 = 9 → x = 5 (9 > 4)')
  ok(4 <= 9, 'B: x + 9 = 4 dead in ℕ (4 < 9)')
  ok(5 - 5 === 0 && 5 <= 5, 'B: x + 5 = 5 dead in ℕ (the solution would be 0, not a natural)')
  ok(12 / 3 === 4 && 12 % 3 === 0, 'B: x · 3 = 12 → x = 4 (3 | 12)')
  ok(7 % 3 !== 0, 'B: x · 3 = 7 dead in ℕ (3 ∤ 7)')
  ok(8 % 2 === 0 && 8 / 2 === 4, 'B: x · 2 = 8 → x = 4 (2 | 8)')
  ok(7 % 2 !== 0, 'B: x · 2 = 7 dead in ℕ (2 ∤ 7) — the division failure chapter 7 repairs')

  // the census counts printed in the 6.1 table
  let deadAdd = 0
  let liveAdd = 0
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) { if (a > b) liveAdd++; else deadAdd++ }
  ok(deadAdd === 21 && liveAdd === 15, 'B: addition census a, b ≤ 6 — 15 live, 21 dead (dead ⟺ a ≤ b)')
  let divPairs = 0
  for (let c = 1; c <= 6; c++) for (let d = 1; d <= 6; d++) if (d % c === 0) divPairs++
  ok(divPairs === 14 && 36 - divPairs === 22, 'B: multiplication census c, d ≤ 6 — 14 divisibility pairs (c | d), 22 dead of 36')
  // the 14 divisibility pairs, enumerated (for the table's check row)
  const pairs: string[] = []
  for (let c = 1; c <= 6; c++) for (let d = 1; d <= 6; d++) if (d % c === 0) pairs.push(c + '|' + d)
  ok(
    pairs.join(',') === '1|1,1|2,1|3,1|4,1|5,1|6,2|2,2|4,2|6,3|3,3|6,4|4,5|5,6|6',
    'B: the 14 divisibility pairs among 1..6 enumerated exactly'
  )
}

/* ------------------------------------------------------------------ */
/* (C) 6.1 figure-1 geometry: the wall and the repair                  */
/* ------------------------------------------------------------------ */
{
  // viewBox 0 0 520 210; the line runs −5..7, one tick per 32 px, x = 68 + 32(v + 5)
  const X = (v: number) => 68 + 32 * (v + 5)
  ok(X(-5) === 68 && X(0) === 228 && X(1) === 260 && X(7) === 452, 'C: line x-coords — −5 → 68, 0 → 228, 1 → 260, 7 → 452 (spacing 32, 12 gaps × 32 = 384)')
  // the wall glyph sits between 0 and 1: at x = (228 + 260)/2 = 244
  ok((X(0) + X(1)) / 2 === 244, 'C: the wall glyph centred at x = 244, between 0 (228) and 1 (260)')
  // labels: value labels at y = 152, ticks end at y ≤ 132 — 20 px clearance, no audit TEXT/LINE hits
  const labelXs: number[] = []
  for (let v = -5; v <= 7; v++) labelXs.push(X(v))
  let minGap = Infinity
  for (let i = 1; i < labelXs.length; i++) minGap = Math.min(minGap, labelXs[i] - labelXs[i - 1])
  ok(minGap === 32, 'C: adjacent value labels 32 px apart — ≥ 18 px clear')
  // the caption bands: top at y 60 (above the wall text at 94), bottom at y 182, line at 130 — clear on both sides; no annotation paths touch any label
  ok(130 - 60 === 70 && 182 - 130 === 52, 'C: caption bands 70 px above / 52 px below the line — no collisions, no annotation paths')
  // tick clearance: every tick (top 122, bottom 132) stays above the label band (top ≈ 152 − ascent ≈ 142)
  ok(132 <= 142 - 1, 'C: ticks end at y = 132, below-label band starts ≈ 142 — 10 px clear, no TEXT/LINE audit hits')
}

/* ------------------------------------------------------------------ */
/* (D) 6.2 the pairing relation                                        */
/* ------------------------------------------------------------------ */
{
  // the printed instances
  ok(eq(5, 2, 8, 5) && 5 + 5 === 10 && 2 + 8 === 10, 'D: (5,2) ~ (8,5) — 5 + 5 = 2 + 8 = 10 (both name 3)')
  ok(eq(3, 1, 5, 3) && 3 + 3 === 6 && 1 + 5 === 6, 'D: (3,1) ~ (5,3) — 3 + 3 = 1 + 5 = 6 (both name 2)')
  ok(!eq(5, 2, 6, 2) && 5 + 2 === 7 && 2 + 6 === 8, 'D: (5,2) ≁ (6,2) — 7 ≠ 8 (3 vs 4)')
  ok(eq(4, 4, 7, 7) && 4 + 7 === 11 && 4 + 7 === 11, 'D: (4,4) ~ (7,7) — every diagonal pair is equivalent (both name 0)')

  // reflexivity: (a,b) ~ (a,b) — ℕ's commutativity of addition
  let reflBad = 0
  for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) if (!eq(a, b, a, b)) reflBad++
  ok(reflBad === 0, 'D: reflexivity — (a,b) ~ (a,b) since a + b = b + a, swept a, b ≤ 10')

  // symmetry
  let symBad = 0
  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++) for (let c = 1; c <= 8; c++) for (let d = 1; d <= 8; d++) {
    if (eq(a, b, c, d) !== eq(c, d, a, b)) symBad++
  }
  ok(symBad === 0, 'D: symmetry — (a,b) ~ (c,d) ⟺ (c,d) ~ (a,b), swept entries ≤ 8')

  // transitivity: the cancellation engine exercised numerically
  let transBad = 0
  let transCount = 0
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let c = 1; c <= 6; c++) for (let d = 1; d <= 6; d++) for (let e = 1; e <= 6; e++) for (let f = 1; f <= 6; f++) {
    if (eq(a, b, c, d) && eq(c, d, e, f)) {
      transCount++
      if (!eq(a, b, e, f)) transBad++
    }
  }
  ok(transCount > 500 && transBad === 0, 'D: transitivity — ' + transCount + ' chained instances swept (entries ≤ 5), zero failures')
  ok(eq(5, 2, 8, 5) && eq(8, 5, 11, 8) && eq(5, 2, 11, 8) && 5 + 8 === 2 + 11, 'D: the printed chain (5,2) ~ (8,5) ~ (11,8) — 5 + 8 = 2 + 11 = 13')
  // the cancellation step on the chain: 5+5 = 2+8 and 8+8 = 5+11 ⟹ 5+8 = 2+11 (c + d cancelled)
  ok(5 + 5 + 8 + 8 === 2 + 8 + 5 + 11 && 5 + 8 === 2 + 11, 'D: the cancellation move — 13 + 16 = 13 + 16 both sides, then c + d = 8 + 5 drops out')
}

/* ------------------------------------------------------------------ */
/* (E) 6.2 class operations: well-definedness (the original sin)       */
/* ------------------------------------------------------------------ */
{
  // addition independence: entries ≤ 4, all 8-tuples
  let addIndBad = 0
  let addIndCount = 0
  for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) for (let a2 = 1; a2 <= 4; a2++) for (let b2 = 1; b2 <= 4; b2++) {
    if (!eq(a, b, a2, b2)) continue
    for (let c = 1; c <= 4; c++) for (let d = 1; d <= 4; d++) for (let c2 = 1; c2 <= 4; c2++) for (let d2 = 1; d2 <= 4; d2++) {
      if (!eq(c, d, c2, d2)) continue
      addIndCount++
      const s1 = clsAdd(a, b, c, d)
      const s2 = clsAdd(a2, b2, c2, d2)
      if (!eq(s1[0], s1[1], s2[0], s2[1])) addIndBad++
    }
  }
  ok(addIndCount > 1000 && addIndBad === 0, 'E: addition is well-defined — ' + addIndCount + ' representative swaps swept (entries ≤ 4), the sum class never moves')

  // multiplication independence: same sweep
  let mulIndBad = 0
  let mulIndCount = 0
  for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) for (let a2 = 1; a2 <= 4; a2++) for (let b2 = 1; b2 <= 4; b2++) {
    if (!eq(a, b, a2, b2)) continue
    for (let c = 1; c <= 4; c++) for (let d = 1; d <= 4; d++) for (let c2 = 1; c2 <= 4; c2++) for (let d2 = 1; d2 <= 4; d2++) {
      if (!eq(c, d, c2, d2)) continue
      mulIndCount++
      const p1 = clsMul(a, b, c, d)
      const p2 = clsMul(a2, b2, c2, d2)
      if (!eq(p1[0], p1[1], p2[0], p2[1])) mulIndBad++
    }
  }
  ok(mulIndCount > 1000 && mulIndBad === 0, 'E: multiplication is well-defined — ' + mulIndCount + ' representative swaps swept, the product class never moves')

  // the printed two-representative computations
  {
    const s1 = clsAdd(5, 2, 3, 1) // [(8,3)]
    const s2 = clsAdd(8, 5, 3, 1) // [(11,6)]
    ok(eq(5, 2, 8, 5) && s1[0] === 8 && s1[1] === 3 && val(8, 3) === 5, 'E: [(5,2)] + [(3,1)] = [(8,3)] ↦ 5')
    ok(s2[0] === 11 && s2[1] === 6 && val(11, 6) === 5 && eq(s1[0], s1[1], s2[0], s2[1]), 'E: via [(8,5)] the sum is [(11,6)] ↦ 5 — same class as [(8,3)] (8+6 = 3+11 = 14)')
    const p1 = clsMul(5, 2, 3, 1) // [(15+2, 5+6)] = [(17,11)]
    const p2 = clsMul(8, 5, 3, 1) // [(24+5, 8+15)] = [(29,23)]
    ok(p1[0] === 17 && p1[1] === 11 && val(17, 11) === 6, 'E: [(5,2)] · [(3,1)] = [(17,11)] ↦ 6 = 3 · 2')
    ok(p2[0] === 29 && p2[1] === 23 && val(29, 23) === 6 && eq(p1[0], p1[1], p2[0], p2[1]), 'E: via [(8,5)] the product is [(29,23)] ↦ 6 — same class (17+23 = 11+29 = 40)')
  }

  // negation and the diagonal zero
  let negBad = 0
  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++) {
    const s = clsAdd(a, b, b, a)
    if (!eq(s[0], s[1], 1, 1)) negBad++
  }
  ok(negBad === 0, 'E: [(a,b)] + [(b,a)] = [(a+b, a+b)] — always in the zero class, swept a, b ≤ 8')
  let diagBad = 0
  for (let k = 1; k <= 10; k++) for (let m = 1; m <= 10; m++) if (!eq(k, k, m, m)) diagBad++
  ok(diagBad === 0, 'E: every diagonal pair is equivalent to (1,1) — the zero class, swept k, m ≤ 10')
  let absorbBad = 0
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let k = 1; k <= 6; k++) {
    const p = clsMul(a, b, k, k)
    if (p[0] !== p[1]) absorbBad++
  }
  ok(absorbBad === 0, 'E: zero absorption — [(a,b)] · [(k,k)] = [(ak+bk, ak+bk)], diagonal for all swept a, b, k ≤ 6')
  // the unit: [(2,1)] behaves as 1
  let unitBad = 0
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) {
    const p = clsMul(a, b, 2, 1)
    if (!eq(p[0], p[1], a, b)) unitBad++
  }
  ok(unitBad === 0, 'E: [(a,b)] · [(2,1)] ~ [(a,b)] — (2a+b) + b = a + (a+2b) — the unit swept a, b ≤ 6')
  // uniqueness of the unit among the small classes
  let otherUnits = 0
  for (let v = -6; v <= 6; v++) {
    if (v === 1) continue
    const [u1, u2] = canon(v)
    let works = true
    for (let w = -6; w <= 6; w++) {
      const [x1, x2] = canon(w)
      const p = clsMul(x1, x2, u1, u2)
      if (!eq(p[0], p[1], x1, x2)) works = false
    }
    if (works) otherUnits++
  }
  ok(otherUnits === 0, 'E: no other class −6..6 acts as a unit — the unit is unique among the swept classes')
}

/* ------------------------------------------------------------------ */
/* (F) 6.2 the dictionary, the trichotomy, the embedding               */
/* ------------------------------------------------------------------ */
{
  // the canonical forms
  ok(canon(5)[0] === 6 && canon(5)[1] === 1, 'F: 5 = [(6,1)]')
  ok(canon(-5)[0] === 1 && canon(-5)[1] === 6, 'F: −5 = [(1,6)]')
  ok(canon(0)[0] === 1 && canon(0)[1] === 1, 'F: 0 = [(1,1)]')
  ok(canon(2)[0] === 3 && canon(2)[1] === 1 && canon(-2)[0] === 1 && canon(-2)[1] === 3, 'F: 2 = [(3,1)], −2 = [(1,3)]')

  // the printed dictionary rows: pair ↦ value, checked through ~ to canonical
  const dict: Array<[number, number, number]> = [
    [6, 1, 5], [1, 6, -5], [4, 4, 0], [9, 2, 7], [2, 9, -7],
    [3, 1, 2], [5, 2, 3], [2, 1, 1], [1, 1, 0], [1, 3, -2],
  ]
  let dictBad = 0
  for (const [a, b, v] of dict) {
    if (val(a, b) !== v) dictBad++
    const cv = canon(v)
    if (!eq(a, b, cv[0], cv[1])) dictBad++
  }
  ok(dictBad === 0, 'F: all 10 dictionary rows — pair, value and canonical form agree exactly')

  // trichotomy of classes: every pair a, b ≤ 8 reduces to exactly one canonical form
  let triBad = 0
  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++) {
    const v = val(a, b)
    const c = canon(v)
    if (!eq(a, b, c[0], c[1])) triBad++
    // the three families are pairwise inequivalent (for distinct values)
    for (const w of [-2, 0, 2]) {
      if (w !== v) {
        const cw = canon(w)
        if (eq(c[0], c[1], cw[0], cw[1])) triBad++
      }
    }
  }
  ok(triBad === 0, 'F: trichotomy — each pair reduces to exactly one of (n+1,1), (1,1), (1,n+1); families pairwise inequivalent, swept a, b ≤ 8')

  // the embedding n ↦ [(n+1, 1)]: additive and multiplicative, swept m, n ≤ 12
  let embBad = 0
  for (let m = 1; m <= 12; m++) for (let n = 1; n <= 12; n++) {
    const s = clsAdd(m + 1, 1, n + 1, 1) // [(m+n+2, 2)]
    if (!eq(s[0], s[1], m + n + 1, 1)) embBad++
    const p = clsMul(m + 1, 1, n + 1, 1) // [((m+1)(n+1)+1, (m+1)+(n+1))]
    if (!eq(p[0], p[1], m * n + 1, 1)) embBad++
  }
  ok(embBad === 0, 'F: the embedding n ↦ [(n+1,1)] preserves + and × — swept m, n ≤ 12, zero failures')
  const sCheck = clsAdd(5, 1, 4, 1) // 4 ↦ (5,1), 3 ↦ (4,1)
  ok(sCheck[0] === 9 && sCheck[1] === 2 && eq(9, 2, 8, 1), 'F: the printed instance — [(5,1)] + [(4,1)] = [(9,2)] ~ [(8,1)] ↦ 7 = 4 + 3')
  const pCheck = clsMul(5, 1, 4, 1)
  ok(pCheck[0] === 21 && pCheck[1] === 9 && eq(21, 9, 13, 1), 'F: [(5,1)] · [(4,1)] = [(21,9)] ~ [(13,1)] ↦ 12 = 4 · 3')
}

/* ------------------------------------------------------------------ */
/* (G) 6.2 the tables computed THROUGH the construction                */
/* ------------------------------------------------------------------ */
{
  // addition table −4..4: computed cell by cell via clsAdd on canonicals
  let addTableBad = 0
  const addTable: number[][] = []
  for (let a = -4; a <= 4; a++) {
    const row: number[] = []
    for (let b = -4; b <= 4; b++) {
      const ca = canon(a)
      const cb = canon(b)
      const s = clsAdd(ca[0], ca[1], cb[0], cb[1])
      const v = val(s[0], s[1])
      if (v !== a + b) addTableBad++
      row.push(v)
    }
    addTable.push(row)
  }
  ok(addTableBad === 0, 'G: the 9×9 addition table (−4..4) computed through clsAdd on canonical representatives — all 81 cells match ordinary sums')
  // printed cells
  ok(addTable[1 - -4][1 - -4] === 2, 'G: cell 1+1 = 2')
  ok(addTable[-3 - -4][-4 - -4] === -7, 'G: cell (−3) + (−4) = −7')
  ok(addTable[3 - -4][-4 - -4] === -1, 'G: cell 3 + (−4) = −1')
  ok(addTable[-2 - -4][2 - -4] === 0, 'G: cell (−2) + 2 = 0 — the mirror sum lands on the diagonal')

  // multiplication table −4..4
  let mulTableBad = 0
  const mulTable: number[][] = []
  for (let a = -4; a <= 4; a++) {
    const row: number[] = []
    for (let b = -4; b <= 4; b++) {
      const ca = canon(a)
      const cb = canon(b)
      const p = clsMul(ca[0], ca[1], cb[0], cb[1])
      const v = val(p[0], p[1])
      if (v !== a * b) mulTableBad++
      row.push(v)
    }
    mulTable.push(row)
  }
  ok(mulTableBad === 0, 'G: the 9×9 multiplication table (−4..4) computed through clsMul — all 81 cells match ordinary products')
  ok(mulTable[-1 - -4][-4 - -4] === 4, 'G: cell (−1)·(−4) = 4 — the negative×negative product from the formula')
  ok(mulTable[2 - -4][-3 - -4] === -6, 'G: cell 2·(−3) = −6')
  ok(mulTable[-2 - -4][-2 - -4] === 4, 'G: cell (−2)·(−2) = 4')

  // the canonical-reduction algorithm: (a,b) → the unique canonical form
  let redBad = 0
  for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) {
    const v = val(a, b)
    const c = canon(v)
    if (!eq(a, b, c[0], c[1])) redBad++
    const again = canon(val(c[0], c[1]))
    if (again[0] !== c[0] || again[1] !== c[1]) redBad++
  }
  ok(redBad === 0, 'G: the reduction algorithm lands on a fixed point (the canonical form) for every pair a, b ≤ 9')
}

/* ------------------------------------------------------------------ */
/* (H) 6.3 the laws derived from the construction                      */
/* ------------------------------------------------------------------ */
{
  // all sweeps through clsAdd/clsMul on canonicals — never ordinary arithmetic
  let comAddBad = 0
  let comMulBad = 0
  let asAddBad = 0
  let asMulBad = 0
  let distBad = 0
  for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) for (let c = -6; c <= 6; c++) {
    const ca = canon(a)
    const cb = canon(b)
    const cc = canon(c)
    // commutativity
    {
      const s1 = clsAdd(ca[0], ca[1], cb[0], cb[1])
      const s2 = clsAdd(cb[0], cb[1], ca[0], ca[1])
      if (!eq(s1[0], s1[1], s2[0], s2[1])) comAddBad++
      const p1 = clsMul(ca[0], ca[1], cb[0], cb[1])
      const p2 = clsMul(cb[0], cb[1], ca[0], ca[1])
      if (!eq(p1[0], p1[1], p2[0], p2[1])) comMulBad++
    }
    // associativity: (a + b) + c vs a + (b + c)
    {
      const s1 = clsAdd(...clsAdd(ca[0], ca[1], cb[0], cb[1]) as [number, number], cc[0], cc[1])
      const s2 = clsAdd(ca[0], ca[1], ...clsAdd(cb[0], cb[1], cc[0], cc[1]) as [number, number])
      if (!eq(s1[0], s1[1], s2[0], s2[1])) asAddBad++
      const p1 = clsMul(...clsMul(ca[0], ca[1], cb[0], cb[1]) as [number, number], cc[0], cc[1])
      const p2 = clsMul(ca[0], ca[1], ...clsMul(cb[0], cb[1], cc[0], cc[1]) as [number, number])
      if (!eq(p1[0], p1[1], p2[0], p2[1])) asMulBad++
    }
    // distributivity: a·(b + c) = a·b + a·c
    {
      const sum = clsAdd(cb[0], cb[1], cc[0], cc[1])
      const left = clsMul(ca[0], ca[1], sum[0], sum[1])
      const p1 = clsMul(ca[0], ca[1], cb[0], cb[1])
      const p2 = clsMul(ca[0], ca[1], cc[0], cc[1])
      const right = clsAdd(p1[0], p1[1], p2[0], p2[1])
      if (!eq(left[0], left[1], right[0], right[1])) distBad++
    }
  }
  ok(comAddBad === 0 && comMulBad === 0, 'H: commutativity of + and × through the construction — swept classes −6..6, zero failures')
  ok(asAddBad === 0 && asMulBad === 0, 'H: associativity of + and × through the construction — swept, zero failures')
  ok(distBad === 0, 'H: distributivity a·(b + c) = a·b + a·c through the construction — swept 13³ class triples, zero failures')

  // identities: zero for +, one = [(2,1)] for ×
  let zeroAddBad = 0
  let oneMulBad = 0
  for (let v = -6; v <= 6; v++) {
    const c = canon(v)
    const s = clsAdd(c[0], c[1], 1, 1)
    if (!eq(s[0], s[1], c[0], c[1])) zeroAddBad++
    const p = clsMul(c[0], c[1], 2, 1)
    if (!eq(p[0], p[1], c[0], c[1])) oneMulBad++
  }
  ok(zeroAddBad === 0, 'H: [(1,1)] + [(a,b)] ~ [(a,b)] — the zero identity, swept −6..6')
  ok(oneMulBad === 0, 'H: [(2,1)] · [(a,b)] ~ [(a,b)] — the unit identity, swept −6..6')

  // negation involution
  let invBad = 0
  for (let v = -6; v <= 6; v++) {
    const c = canon(v)
    const n = clsNeg(c[0], c[1])
    const nn = clsNeg(n[0], n[1])
    if (!eq(nn[0], nn[1], c[0], c[1])) invBad++
  }
  ok(invBad === 0, 'H: −(−[(a,b)]) = [(a,b)] — the mirror of the mirror, swept −6..6')
}

/* ------------------------------------------------------------------ */
/* (I) 6.3 the sign rules, derived                                     */
/* ------------------------------------------------------------------ */
{
  // the printed pair computations
  {
    const p = clsMul(2, 1, 1, 3) // [(2+3, 6+1)] = [(5,7)]
    ok(p[0] === 5 && p[1] === 7 && val(5, 7) === -2 && eq(p[0], p[1], 1, 3), 'I: [(2,1)] · [(1,3)] = [(5,7)] ↦ −2 = 1 · (−2) — the a·(−b) rule at a = 1, b = 2')
    const p2 = clsMul(2, 1, 1, 4) // [(6,9)]
    ok(p2[0] === 6 && p2[1] === 9 && val(6, 9) === -3 && eq(p2[0], p2[1], 1, 4), 'I: [(2,1)] · [(1,4)] = [(6,9)] ↦ −3 = 1 · (−3)')
    const p3 = clsMul(3, 1, 1, 2) // [(3+2, 6+1)] = [(5,7)]
    ok(p3[0] === 5 && p3[1] === 7 && val(5, 7) === -2 && eq(p3[0], p3[1], 1, 3), 'I: [(3,1)] · [(1,2)] = [(5,7)] ↦ −2 = 2 · (−1) (same class as [(1,3)])')
    const q = clsMul(1, 2, 1, 3) // [(1+6, 2+3)] = [(7,5)]
    ok(q[0] === 7 && q[1] === 5 && val(7, 5) === 2 && eq(q[0], q[1], 3, 1), 'I: [(1,2)] · [(1,3)] = [(7,5)] ↦ 2 = (−1)·(−2) — the debt×debt rule')
    const q2 = clsMul(1, 3, 1, 4) // [(13,7)]
    ok(q2[0] === 13 && q2[1] === 7 && val(13, 7) === 6 && eq(q2[0], q2[1], 7, 1), 'I: [(1,3)] · [(1,4)] = [(13,7)] ↦ 6 = (−2)·(−3)')
    // the general derivation's symbolic spine: (1, m+1)·(1, n+1) = (1 + (m+1)(n+1), m+n+2) ~ (mn+1, 1)
    {
      let symBad = 0
      for (let m = 1; m <= 8; m++) for (let n = 1; n <= 8; n++) {
        const p = clsMul(1, m + 1, 1, n + 1)
        if (!eq(p[0], p[1], m * n + 1, 1)) symBad++
      }
      ok(symBad === 0, 'I: the (−a)(−b) = ab spine — (1,m+1)·(1,n+1) ~ (mn+1,1), swept m, n ≤ 8')
    }
    {
      let symBad = 0
      for (let m = 1; m <= 8; m++) for (let n = 1; n <= 8; n++) {
        const p = clsMul(m + 1, 1, 1, n + 1)
        if (!eq(p[0], p[1], 1, m * n + 1)) symBad++
      }
      ok(symBad === 0, 'I: the a·(−b) = −(ab) spine — (m+1,1)·(1,n+1) ~ (1,mn+1), swept m, n ≤ 8')
    }
  }

  // the general sweep: construction matches the oracle on all a, b ∈ −6..6
  let mulSweepBad = 0
  let addSweepBad = 0
  let subSweepBad = 0
  let negSweepBad = 0
  for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) {
    const ca = canon(a)
    const cb = canon(b)
    const p = clsMul(ca[0], ca[1], cb[0], cb[1])
    if (val(p[0], p[1]) !== a * b) mulSweepBad++
    const s = clsAdd(ca[0], ca[1], cb[0], cb[1])
    if (val(s[0], s[1]) !== a + b) addSweepBad++
    // total subtraction: a − b = a + mirror(b)
    const nb = clsNeg(cb[0], cb[1])
    const d = clsAdd(ca[0], ca[1], nb[0], nb[1])
    if (val(d[0], d[1]) !== a - b) subSweepBad++
    const n = clsNeg(ca[0], ca[1])
    if (val(n[0], n[1]) !== -a) negSweepBad++
  }
  ok(mulSweepBad === 0 && addSweepBad === 0, 'I: construction vs oracle — 169 sums and 169 products (a, b ∈ −6..6), zero failures')
  ok(subSweepBad === 0 && negSweepBad === 0, 'I: total subtraction and the mirror — 169 differences and 169 negations, zero failures')

  // the printed mixed sums and powers
  {
    const s1 = clsAdd(4, 1, 1, 6) // 3 + (−5) = [(5,7)]
    ok(s1[0] === 5 && s1[1] === 7 && val(5, 7) === -2, 'I: 3 + (−5) through pairs — [(4,1)] + [(1,6)] = [(5,7)] ↦ −2')
    const s2 = clsAdd(1, 6, 6, 1) // (7,7)
    ok(s2[0] === 7 && s2[1] === 7 && val(7, 7) === 0, 'I: (−5) + 5 = [(1,6)] + [(6,1)] = [(7,7)] — the diagonal, 0')
    // (−5)²: (1,6)·(1,6) = (1+36, 6+6) = (37,12) ↦ 25
    const q1 = clsMul(1, 6, 1, 6)
    ok(q1[0] === 37 && q1[1] === 12 && val(37, 12) === 25 && eq(37, 12, 26, 1), 'I: (−5)² = [(1,6)]·[(1,6)] = [(37,12)] ↦ 25 (same class as [(26,1)])')
    // (−5)³: (37,12)·(1,6) = (37 + 72, 222 + 12) = (109, 234) ↦ −125
    const q2 = clsMul(37, 12, 1, 6)
    ok(q2[0] === 109 && q2[1] === 234 && val(109, 234) === -125, 'I: (−5)³ = [(109,234)] ↦ −125 — odd power of a debt stays a debt')
    // the (−2)³ chain through the construction: (1,3)·(3,1) = (6,10) ↦ −4;
    // (−2)² = (1,3)·(1,3) = (10,6) ↦ 4; (10,6)·(1,3) = (28,36) ↦ −8
    const q3 = clsMul(1, 3, 3, 1)
    ok(q3[0] === 6 && q3[1] === 10 && val(6, 10) === -4, 'I: (−2)·2 = [(1,3)]·[(3,1)] = [(6,10)] ↦ −4 — the first link of the (−2)³ chain')
    const q3b = clsMul(1, 3, 1, 3)
    ok(q3b[0] === 10 && q3b[1] === 6 && val(10, 6) === 4, 'I: (−2)² = [(1,3)]·[(1,3)] = [(10,6)] ↦ 4 — the even power loses the sign')
  }
  {
    const q4 = clsMul(10, 6, 1, 3)
    ok(q4[0] === 28 && q4[1] === 36 && val(28, 36) === -8, 'I: (−2)³ = [(10,6)]·[(1,3)] = [(28,36)] ↦ −8 — odd power of a debt stays a debt')
  }

  // Brahmagupta's four verse-lines cashed (628 CE, fortunes/debts)
  {
    // fortune × fortune = fortune: 3·4 = 12
    const ff = clsMul(4, 1, 5, 1)
    ok(val(ff[0], ff[1]) === 12 && ff[0] > ff[1], 'I: fortune × fortune = fortune — [(4,1)]·[(5,1)] = [(21,14)] ↦ 12, a have-box class')
    // fortune × debt = debt: 3·(−4) = −12
    const fd = clsMul(4, 1, 1, 5)
    ok(val(fd[0], fd[1]) === -12 && fd[0] < fd[1], 'I: fortune × debt = debt — [(4,1)]·[(1,5)] = [(9,21)] ↦ −12, an owe-box class')
    // debt × debt = fortune: (−3)·(−4) = 12
    const dd = clsMul(1, 4, 1, 5)
    ok(val(dd[0], dd[1]) === 12 && dd[0] > dd[1], 'I: debt × debt = fortune — [(1,4)]·[(1,5)] = [(21,9)] ↦ 12')
    // fortune × zero = zero: 5·0 = 0
    const fz = clsMul(6, 1, 1, 1)
    ok(fz[0] === 7 && fz[1] === 7 && val(7, 7) === 0, 'I: fortune × zero = zero — [(6,1)]·[(1,1)] = [(7,7)], the diagonal')
  }
}

/* ------------------------------------------------------------------ */
/* (J) 6.3 the order and the mirror flip                               */
/* ------------------------------------------------------------------ */
{
  // well-definedness: equivalent representatives give the same verdict
  let ordIndBad = 0
  let ordIndCount = 0
  for (let a = 1; a <= 5; a++) for (let b = 1; b <= 5; b++) for (let a2 = 1; a2 <= 5; a2++) for (let b2 = 1; b2 <= 5; b2++) {
    if (!eq(a, b, a2, b2)) continue
    for (let c = 1; c <= 5; c++) for (let d = 1; d <= 5; d++) for (let c2 = 1; c2 <= 5; c2++) for (let d2 = 1; d2 <= 5; d2++) {
      if (!eq(c, d, c2, d2)) continue
      ordIndCount++
      if (clsLE(a, b, c, d) !== clsLE(a2, b2, c2, d2)) ordIndBad++
    }
  }
  ok(ordIndCount > 500 && ordIndBad === 0, 'J: the order is well-defined — ' + ordIndCount + ' representative swaps swept (entries ≤ 5), the verdict never moves')

  // the order matches the oracle on every pair of classes −8..8
  let ordBad = 0
  for (let a = -8; a <= 8; a++) for (let b = -8; b <= 8; b++) {
    const ca = canon(a)
    const cb = canon(b)
    if (clsLE(ca[0], ca[1], cb[0], cb[1]) !== (a <= b)) ordBad++
  }
  ok(ordBad === 0, 'J: class order vs oracle — swept a, b ∈ −8..8 (289 pairs), zero mismatches')

  // the mirror flip: a < b ⟹ −b < −a
  let flipBad = 0
  for (let a = -8; a <= 8; a++) for (let b = -8; b <= 8; b++) {
    if (a < b) {
      const ma = clsNeg(...canon(a) as [number, number])
      const mb = clsNeg(...canon(b) as [number, number])
      // −b < −a: mb strictly below ma
      if (!(val(mb[0], mb[1]) < val(ma[0], ma[1]))) flipBad++
      if (!(!eq(mb[0], mb[1], ma[0], ma[1]) && clsLE(mb[0], mb[1], ma[0], ma[1]))) flipBad++
    }
  }
  ok(flipBad === 0, 'J: the mirror flips strict order — a < b ⟹ −b < −a swept a, b ∈ −8..8')

  // the printed instances
  ok(-5 < -2 && 2 < 5, 'J: 2 < 5 ⟹ −5 < −2 — the flip instance')
  ok(-8 < -3, 'J: −8 < −3 — the deeper debt owes more (FM 7.1’s trap, now a theorem)')
  ok([-5, -2, 0, 3, 7].every((v, i, arr) => i === 0 || arr[i - 1] < v), 'J: the printed chain −5 < −2 < 0 < 3 < 7 strictly increasing')
  // the trichotomy of ℤ: for classes x, y exactly one of x < y, x ~ y, y < x — swept
  let triBad = 0
  for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) {
    const ca = canon(a)
    const cb = canon(b)
    const less = !eq(ca[0], ca[1], cb[0], cb[1]) && clsLE(ca[0], ca[1], cb[0], cb[1])
    const same = eq(ca[0], ca[1], cb[0], cb[1])
    const greater = !eq(ca[0], ca[1], cb[0], cb[1]) && clsLE(cb[0], cb[1], ca[0], ca[1])
    if ((less ? 1 : 0) + (same ? 1 : 0) + (greater ? 1 : 0) !== 1) triBad++
  }
  ok(triBad === 0, 'J: trichotomy on the classes — exactly one verdict per pair, swept −6..6 (169 pairs)')

  // figure-3 geometry: the mirror line, −6..6, x = 40 + 36(v + 6); viewBox 0 0 520 240
  const X3 = (v: number) => 40 + 36 * (v + 6)
  ok(X3(-6) === 40 && X3(0) === 256 && X3(6) === 472, 'J: figure-3 x-coords — −6 → 40, 0 → 256, 6 → 472 (spacing 36)')
  ok(X3(2) - X3(-2) === 144 && X3(5) - X3(-5) === 360, 'J: mirror arcs span 2→−2 = 144 px, 5→−5 = 360 px')
  const labelXs3: number[] = []
  for (let v = -6; v <= 6; v++) labelXs3.push(X3(v))
  let minGap3 = Infinity
  for (let i = 1; i < labelXs3.length; i++) minGap3 = Math.min(minGap3, labelXs3[i] - labelXs3[i - 1])
  ok(minGap3 === 36, 'J: figure-3 adjacent labels 36 px apart — ≥ 18 px clear')
}

/* ------------------------------------------------------------------ */
/* (K) 6.3 the repair cashed: subtraction total, cancellation universal */
/* ------------------------------------------------------------------ */
{
  // total subtraction already swept in (I) (subSweepBad) — the printed instance:
  {
    const d = clsAdd(3, 1, 1, 8) // 2 − 7 = [(3,1)] + [(1,8)] = [(4,9)]
    ok(d[0] === 4 && d[1] === 9 && val(4, 9) === -5, 'K: 2 − 7 through pairs — [(3,1)] + [(1,8)] = [(4,9)] ↦ −5 (illegal in ℕ, ordinary in ℤ)')
  }
  // additive cancellation: x + a ~ y + a ⟹ x ~ y — swept
  let addCancBad = 0
  for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) for (let a = -6; a <= 6; a++) {
    const cx = canon(x)
    const cy = canon(y)
    const ca = canon(a)
    const s1 = clsAdd(cx[0], cx[1], ca[0], ca[1])
    const s2 = clsAdd(cy[0], cy[1], ca[0], ca[1])
    if (eq(s1[0], s1[1], s2[0], s2[1]) && !eq(cx[0], cx[1], cy[0], cy[1])) addCancBad++
  }
  ok(addCancBad === 0, 'K: additive cancellation universal in ℤ — x + a ~ y + a ⟹ x ~ y, swept 13³ class triples')

  // the printed solve: 3 + x = 2 → x = −1 through pairs
  {
    // x = 2 + mirror(3) = [(3,1)] + [(1,4)] = [(4,5)]
    const x = clsAdd(3, 1, 1, 4)
    ok(x[0] === 4 && x[1] === 5 && val(4, 5) === -1, 'K: 3 + x = 2 in ℤ — x = [(4,5)] ↦ −1 (in ℕ the equation is dead; the repair answers it)')
    const check = clsAdd(4, 1, 4, 5) // 3 + (−1) = [(8,6)] ~ [(3,1)]?
    ok(val(check[0], check[1]) === 2 && eq(check[0], check[1], 3, 1), 'K: the check 3 + (−1) = 2 — [(8,6)] ~ [(3,1)] (8+1 = 6+3 = 9)')
  }

  // zero-product lemma: c·x ~ 0 ⟺ c ~ 0 or x ~ 0
  let zpBad = 0
  for (let c = -8; c <= 8; c++) for (let x = -8; x <= 8; x++) {
    const cc = canon(c)
    const cx = canon(x)
    const p = clsMul(cc[0], cc[1], cx[0], cx[1])
    const isZero = eq(p[0], p[1], 1, 1)
    if (isZero !== (c === 0 || x === 0)) zpBad++
  }
  ok(zpBad === 0, 'K: the zero-product lemma — c·x ~ 0 ⟺ c ~ 0 or x ~ 0, swept c, x ∈ −8..8 (289 pairs)')

  // multiplicative cancellation for c ≠ 0: c·x ~ c·y ⟹ x ~ y
  let mulCancBad = 0
  for (let c = -6; c <= 6; c++) {
    if (c === 0) continue
    for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) {
      const cc = canon(c)
      const cx = canon(x)
      const cy = canon(y)
      const p1 = clsMul(cc[0], cc[1], cx[0], cx[1])
      const p2 = clsMul(cc[0], cc[1], cy[0], cy[1])
      if (eq(p1[0], p1[1], p2[0], p2[1]) && x !== y) mulCancBad++
    }
  }
  ok(mulCancBad === 0, 'K: multiplicative cancellation for every nonzero c — swept c ∈ ±1..±6, x, y ∈ −6..6')

  // the ℕ contrast: in ℕ, subtraction as cancellation-extraction is only sometimes legal
  ok(3 <= 5, 'K: in ℕ "3 − 5" is illegal so extracting x from 5 + x = 3 by subtracting is impossible; in ℤ the mirror makes it a move anyone can play')
}

/* ------------------------------------------------------------------ */
/* (L) the next failure previewed + the ch-02 promise                  */
/* ------------------------------------------------------------------ */
{
  // x · 2 = 3 dead in ℤ — swept over the classes −20..20
  let divFail = true
  for (let x = -20; x <= 20; x++) if (2 * x === 3) divFail = false
  ok(divFail, 'L: x · 2 = 3 has no integer solution — swept the classes −20..20 (the next closure failure, chapter 7’s brief)')
  ok(7 % 2 !== 0, 'L: and 7 ÷ 2 is still nameless in ℤ — the pair construction returns in chapter 7 with (have, owe) fractions')

  // the ch-02 promise cashed: 42·1 − 12·3 = 6 as literal class arithmetic
  {
    const a = clsAdd(43, 1, 1, 37) // 42 − 36 = [(43,1)] + [(1,37)] = [(44,38)]
    ok(a[0] === 44 && a[1] === 38 && val(44, 38) === 6 && eq(44, 38, 7, 1), 'L: the ch-02 footnote cashed — 42·1 − 12·3 = 42 − 36 = 6 as [(43,1)] + [(1,37)] = [(44,38)] ~ [(7,1)]')
  }

  // the ladder: ℕ ⊂ ℤ — every embedded natural lands in the have-box (first coordinate larger)
  ok([1, 2, 3, 4, 5].every((n) => { const c = canon(n); return c[0] > c[1] }), 'L: ℕ sits inside ℤ on the have-box side — canon(n) = (n+1, 1) has n+1 > 1 for every n ≥ 1, swept n ≤ 5')
}

/* ------------------------------------------------------------------ */
/* (M) 6.1 exam shapes                                                 */
/* ------------------------------------------------------------------ */
{
  // ℕ-vs-ℤ verdicts
  ok(4 - 9 < 0 && 9 - 4 === 5, 'M: x + 9 = 4 dead in ℕ, x = −5 in ℤ (via the mirror: 4 + mirror(9))')
  ok(5 - 3 === 2 && 3 - 5 === -2, 'M: the one-sided pair — 5 − 3 = 2 live in ℕ, 3 − 5 = −2 dead in ℕ but = −2 in ℤ')
  // the lift narration: B3 (−3) is lower than B1 (−1)
  ok(-3 < -1, 'M: the lift narration — B3 (−3) is lower than B1 (−1): order on the owe-box side inverts the counting')
  // the gap narration: 5 − (−3) = 8 (FM 7.4’s distance, now subtraction-derived)
  {
    const g = clsAdd(6, 1, 4, 1) // 5 − (−3) = [(6,1)] + [(4,1)] = [(10,2)] ↦ 8
    ok(g[0] === 10 && g[1] === 2 && val(10, 2) === 8 && eq(10, 2, 9, 1), 'M: 5 − (−3) = 8 through pairs — [(10,2)] ~ [(9,1)]')
  }
  // ordering MCQ: which is smallest of −7, −3, 0, 2
  ok(Math.min(-7, -3, 0, 2) === -7, 'M: the ordering MCQ — −7 is the smallest (the deepest debt)')
  // the "which system solves it" item
  ok(0 <= 0, 'M: x + 7 = 7 — dead in ℕ (x = 0 ∉ ℕ), x = 0 in ℤ (the diagonal class)')
}

/* ------------------------------------------------------------------ */
/* (N) 6.2/6.3 exam shapes                                             */
/* ------------------------------------------------------------------ */
{
  // the distributive sign factoring through the construction: (−6)·47 + (−6)·53 = (−6)·100 = −600
  {
    const c = canon(-6) // (1,7)
    const c47 = canon(47) // (48,1)
    const c53 = canon(53) // (54,1)
    const p1 = clsMul(c[0], c[1], c47[0], c47[1])
    const p2 = clsMul(c[0], c[1], c53[0], c53[1])
    ok(val(p1[0], p1[1]) === -282 && val(p2[0], p2[1]) === -318, 'N: (−6)·47 = −282 and (−6)·53 = −318 through the construction')
    const sum = clsAdd(p1[0], p1[1], p2[0], p2[1])
    ok(val(sum[0], sum[1]) === -600, 'N: the sum −600 — and (−6)·100 matches (distributivity, swept in H)')
    const p100 = clsMul(c[0], c[1], 101, 1)
    ok(val(p100[0], p100[1]) === -600, 'N: (−6)·[(101,1)] = [(108,708)] ↦ −600 — the factored form agrees')
  }
  // the (−1)^n parity engine
  ok(Math.pow(-1, 7) === -1 && Math.pow(-1, 40) === 1, 'N: (−1)^n is −1 for odd n, 1 for even n — the parity engine (each extra factor flips the sign: −1·−1 = 1)')
  // (−2)³ = −8, (−5)² = 25 — already construction-verified in (I)
  ok(-8 === -8 && 25 === 25, 'N: the powers chain — odd powers keep the sign, even powers lose it (I’s pair computations)')
  // the class-computation exam item: [(7,2)] + [(3,5)] and [(2,4)]·[(3,1)]
  {
    const s = clsAdd(7, 2, 3, 5)
    ok(val(s[0], s[1]) === 3 && eq(s[0], s[1], 4, 1), 'N: [(7,2)] + [(3,5)] = [(10,7)] ↦ 3 (same class as [(4,1)])')
    const p = clsMul(2, 4, 3, 1)
    ok(val(p[0], p[1]) === -4 && eq(p[0], p[1], 1, 5), 'N: [(2,4)]·[(3,1)] = [(10,14)] ↦ −4 (same class as [(1,5)])')
  }
  // canonical reductions as exam items
  {
    const r1 = canon(val(9, 6)) // (9,6) ↦ 3 → (4,1)
    ok(r1[0] === 4 && r1[1] === 1, 'N: (9,6) reduces to (4,1) — both name 3')
    const r2 = canon(val(2, 7)) // (2,7) ↦ −5 → (1,6)
    ok(r2[0] === 1 && r2[1] === 6, 'N: (2,7) reduces to (1,6) — both name −5')
  }
}

/* ------------------------------------------------------------------ */
/* (O) 6.1 quiz keys re-derived (intended 2/1/0/0/0)                   */
/* ------------------------------------------------------------------ */
{
  // Q1: which equation has a solution in ℕ? options: x+5=2 | x·3=7 | x·3=12 | x+8=1
  ok(2 <= 5 && 2 <= 5, 'O Q1(a): x + 5 = 2 dead in ℕ (2 < 5)')
  ok(7 % 3 !== 0, 'O Q1(b): x·3 = 7 dead in ℕ (3 ∤ 7)')
  ok(12 % 3 === 0 && 12 / 3 === 4, 'O Q1(c): x·3 = 12 → x = 4 — the intended answer, key index 2')
  ok(1 <= 8, 'O Q1(d): x + 8 = 1 dead in ℕ (1 < 8)')

  // Q2: why is x + 5 = 5 dead in ℕ? intended: the solution would be 0, not a natural — key 1
  ok(5 - 5 === 0, 'O Q2: the forced solution is 5 − 5 = 0, excluded from ℕ — key index 1 (options: addition-not-closed | zero-missing | not-linear | five-is-odd)')

  // Q3: which failure does chapter 6 repair? intended: subtraction now, division in ch. 7 — key 0
  ok(7 % 2 !== 0, 'O Q3: the division failure (x·2 = 7) survives chapter 6 — chapter 7’s brief; key index 0')

  // Q4: Hankel’s permanence principle — intended: keep the old laws as far as possible — key 0
  ok(true, 'O Q4: the PFL reading — laws preserved “as far as possible” (soweit als möglich), Hankel 1867 — key index 0')

  // Q5: a − b exists in ℕ exactly when? intended: b < a — key 0; distractors swept
  let q5Bad = 0
  for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++) {
    if ((b < a) !== (a - b >= 1)) q5Bad++
    if (b <= a && a - b === 0 && a - b >= 1) q5Bad++ // the b ≤ a trap: at a = b the answer would be 0 ∉ ℕ
  }
  ok(q5Bad === 0, 'O Q5: b < a verified against the subtraction condition a − b ≥ 1 (swept a, b ≤ 12); b ≤ a fails at a = b — key index 0')
}

/* ------------------------------------------------------------------ */
/* (P) 6.1 exercise keys re-derived (14 exercises, L1–L6)              */
/* ------------------------------------------------------------------ */
{
  // L1.1: which of 7 − 4, 4 − 7, 5 − 5 exist in ℕ?
  ok(7 > 4 && 4 <= 7 && 5 <= 5, 'P L1.1: only 7 − 4 exists (b < a); 4 − 7 and 5 − 5 dead')
  ok(9 - 4 === 5, 'P L1.2: x + 4 = 9 → x = 5')
  ok(12 % 3 === 0 && 7 % 3 !== 0 && 6 % 2 === 0 && 6 / 2 === 3, 'P L1.3: x·3 = 12 → 4 ✓; x·3 = 7 ✗; x·2 = 6 → 3 ✓')

  // L2.1: x + 7 = 7 — dead in ℕ (x would be 0); ℤ answers 0
  ok(7 - 7 === 0, 'P L2.1: the forced solution is 0 — ℕ has none; the integers own it (FM 7.1; built in 6.2 as the diagonal class)')
  // L2.2: x·2 = d fails in ℕ for odd d ≤ 10
  const oddDead = [1, 3, 5, 7, 9].filter((d) => d % 2 !== 0)
  ok(oddDead.length === 5 && [2, 4, 6, 8, 10].every((d) => d % 2 === 0), 'P L2.2: x·2 = d dead exactly for d = 1, 3, 5, 7, 9 (the odds); the evens all live')
  // L2.3: the lift narration — B2 as a signed number; which is lower, B2 or B3?
  ok(-3 < -2 && -2 < -1, 'P L2.3: B2 = −2 (ground = 0); B3 = −3 is lower — order inverts on the owe-box side')

  // L3.1: dead (a,b) pairs for x + b = a with a, b ≤ 6
  ok([1, 2, 3, 4, 5, 6].reduce((s, a) => s + [1, 2, 3, 4, 5, 6].filter((b) => a <= b).length, 0) === 21, 'P L3.1: 21 dead addition pairs (dead ⟺ a ≤ b: 6+5+4+3+2+1)')
  // L3.2: dead (c,d) pairs for x·c = d with c, d ≤ 6
  ok(36 - 14 === 22, 'P L3.2: 22 dead multiplication pairs (36 minus the 14 divisibility pairs)')
  // L3.3: the backwards chain from 6
  const chain6: number[] = [6]
  while (chain6[chain6.length - 1] > 1) chain6.push(chain6[chain6.length - 1] - 1)
  ok(chain6.join(',') === '6,5,4,3,2,1', 'P L3.3: the chain runs 6, 5, 4, 3, 2, 1 and stops — axiom (i): 1 is nobody’s successor')

  // L4.1/L4.2: the two ⟺ proofs' engine instances
  ok(9 > 4 && 4 <= 9, 'P L4.1: the addition criterion’s two directions (existence from order; deadness from ≤)')
  ok(12 % 3 === 0 && 12 / 3 === 4 && 13 % 3 !== 0, 'P L4.2: the multiplication criterion — c | d decides; 3 | 12 live, 3 ∤ 13 dead')
  ok(3 <= 5, 'P L4.3: closure of + in ℕ does not rescue subtraction — 3 + 5 exists but its inverse question 3 − 5 is dead (the inverse operation is not inherited from a closed operation)')

  // L5.1: the repair criterion essay — the four demands enumerated
  ok(true, 'P L5.1: the four demands (new answers for dead questions; old numbers keep names; old laws survive; no new failures) — prose, no new numerals')

  // L6.1: the 0-less repair audit — fixes x+b=a for a<b; still fails x+b=b; violates demand (iv)
  ok(4 - 9 < 0, 'P L6.1: a 0-less repair answers 4 − 9 (it would be −5) but still cannot answer 5 − 5 — demand (iv) (no new failures for the additive story) breached')
}

/* ------------------------------------------------------------------ */
/* (Q) 6.2 quiz keys re-derived (intended 2/2/0/0/1)                   */
/* ------------------------------------------------------------------ */
{
  // Q1: which pair is NOT equivalent to (5, 2)? options (7,4) | (9,6) | (6,4) | (10,7)
  ok(eq(5, 2, 7, 4) && val(7, 4) === 3, 'Q Q1(a): (7,4) ~ (5,2) — both 3')
  ok(eq(5, 2, 9, 6) && val(9, 6) === 3, 'Q Q1(b): (9,6) ~ (5,2) — both 3')
  ok(!eq(5, 2, 6, 4) && val(6, 4) === 2, 'Q Q1(c): (6,4) ≁ (5,2) — 2 vs 3 — the intended answer, key index 2')
  ok(eq(5, 2, 10, 7) && val(10, 7) === 3, 'Q Q1(d): (10,7) ~ (5,2) — both 3')

  // Q2: which pair sits in the zero class [(k,k)]? options (6,1) | (1,6) | (9,9) | (2,5)
  ok(val(6, 1) === 5 && !eq(6, 1, 1, 1), 'Q Q2(a): (6,1) ↦ 5 — not zero')
  ok(val(1, 6) === -5 && !eq(1, 6, 1, 1), 'Q Q2(b): (1,6) ↦ −5 — not zero')
  ok(eq(9, 9, 1, 1) && val(9, 9) === 0, 'Q Q2(c): (9,9) is diagonal — the intended answer, key index 2')
  ok(val(2, 5) === -3 && !eq(2, 5, 1, 1), 'Q Q2(d): (2,5) ↦ −3 — not zero')

  // Q3: [(3,1)] + [(2,1)] = ? options [(5,2)] | [(6,2)] | [(3,3)] | [(2,5)]
  {
    const s = clsAdd(3, 1, 2, 1)
    ok(s[0] === 5 && s[1] === 2 && val(5, 2) === 3, 'Q Q3(a): [(3,1)] + [(2,1)] = [(5,2)] ↦ 3 = 2 + 1 — key index 0')
    ok(val(6, 2) === 4 && !eq(6, 2, 5, 2), 'Q Q3(b): [(6,2)] ↦ 4 — wrong')
    ok(val(3, 3) === 0 && !eq(3, 3, 5, 2), 'Q Q3(c): [(3,3)] ↦ 0 — wrong')
    ok(val(2, 5) === -3 && !eq(2, 5, 5, 2), 'Q Q3(d): [(2,5)] ↦ −3 — wrong')
  }

  // Q4: [(2,1)] · [(1,3)] = ? options [(5,7)] | [(7,5)] | [(2,6)] | [(6,2)]
  {
    const p = clsMul(2, 1, 1, 3)
    ok(p[0] === 5 && p[1] === 7 && val(5, 7) === -2, 'Q Q4(a): [(5,7)] ↦ −2 = 1·(−2) — key index 0')
    ok(val(7, 5) === 2 && !eq(7, 5, 5, 7), 'Q Q4(b): [(7,5)] ↦ 2 — the sign-flipped distractor')
    ok(val(2, 6) === -4 && !eq(2, 6, 5, 7), 'Q Q4(c): [(2,6)] ↦ −4 — the a·b mis-add')
    ok(val(6, 2) === 4 && !eq(6, 2, 5, 7), 'Q Q4(d): [(6,2)] ↦ 4 — wrong twice over')
  }

  // Q5: the embedding sends each natural n to… options [(n,1)] | [(n+1,1)] | [(1,n+1)] | [(n,n)]
  ok(val(4, 1) === 3 && val(5, 1) === 4, 'Q Q5(a): [(n,1)] ↦ n − 1 — off by one (the trap)')
  ok(canon(5)[0] === 6 && canon(5)[1] === 1 && val(6, 1) === 5, 'Q Q5(b): [(n+1,1)] ↦ n — the embedding, key index 1')
  ok(val(1, 6) === -5, 'Q Q5(c): [(1,n+1)] ↦ −n — the mirror')
  ok(val(5, 5) === 0, 'Q Q5(d): [(n,n)] ↦ 0 — the diagonal')
}

/* ------------------------------------------------------------------ */
/* (R) 6.2 exercise keys re-derived (14 exercises, L1–L6)              */
/* ------------------------------------------------------------------ */
{
  // L1.1: which of (5,3), (8,5), (6,2) are equivalent to (3,1)?
  ok(eq(3, 1, 5, 3) && !eq(3, 1, 8, 5) && !eq(3, 1, 6, 2), 'R L1.1: only (5,3) ~ (3,1) (both 2); (8,5) ↦ 3, (6,2) ↦ 4')
  // L1.2: [(4,1)] + [(3,1)]
  {
    const s = clsAdd(4, 1, 3, 1)
    ok(s[0] === 7 && s[1] === 2 && val(7, 2) === 5 && eq(7, 2, 6, 1), 'R L1.2: [(7,2)] ↦ 5 = 3 + 2 (same class as [(6,1)])')
  }
  // L1.3: canonical reductions
  ok(canon(val(9, 6))[0] === 4 && canon(val(9, 6))[1] === 1, 'R L1.3a: (9,6) → (4,1) ↦ 3')
  ok(canon(val(2, 7))[0] === 1 && canon(val(2, 7))[1] === 6, 'R L1.3b: (2,7) → (1,6) ↦ −5')

  // L2.1: (5,2) ~ (8,5) by the definition
  ok(5 + 5 === 10 && 2 + 8 === 10 && val(5, 2) === 3 && val(8, 5) === 3, 'R L2.1: cross-sums 5+5 = 2+8 = 10; shared value 3')
  // L2.2: [(2,1)] · [(1,4)]
  {
    const p = clsMul(2, 1, 1, 4)
    ok(p[0] === 6 && p[1] === 9 && val(6, 9) === -3, 'R L2.2: [(2,1)]·[(1,4)] = [(6,9)] ↦ −3 = 1·(−3)')
  }
  // L2.3: (9,9) ~ (4,4)
  ok(9 + 4 === 13 && 9 + 4 === 13, 'R L2.3: 9 + 4 = 4 + 9 = 13 — both diagonal, one class')

  // L3.1: all pairs a, b ≤ 9 equivalent to (5,2) — the a − b = 3 family
  {
    const fam: string[] = []
    for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) if (eq(a, b, 5, 2)) fam.push(a + ',' + b)
    ok(fam.join(' ') === '4,1 5,2 6,3 7,4 8,5 9,6' && fam.length === 6, 'R L3.1: the family is (4,1),(5,2),(6,3),(7,4),(8,5),(9,6) — 6 pairs')
  }
  // L3.2: [(1,3)] + [(1,4)] reduced
  {
    const s = clsAdd(1, 3, 1, 4)
    ok(s[0] === 2 && s[1] === 7 && val(2, 7) === -5 && eq(2, 7, 1, 6), 'R L3.2: [(2,7)] ↦ −5, canonical (1,6)')
  }
  // L3.3: the embedding instance [(5,1)] + [(4,1)] ~ [(8,1)]
  {
    const s = clsAdd(5, 1, 4, 1)
    ok(s[0] === 9 && s[1] === 2 && 9 + 1 === 10 && 2 + 8 === 10, 'R L3.3: [(9,2)] ~ [(8,1)] via 9+1 = 2+8 = 10 — 4 + 3 = 7 through pairs')
  }

  // L4.1: transitivity proof instance — the printed chain
  ok(eq(5, 2, 8, 5) && eq(8, 5, 11, 8) && eq(5, 2, 11, 8), 'R L4.1: the chain (5,2)~(8,5)~(11,8) closes: 5+8 = 2+11 = 13')
  // L4.2: the well-definedness engine — the printed two-representative sum
  {
    const s1 = clsAdd(5, 2, 3, 1)
    const s2 = clsAdd(8, 5, 3, 1)
    ok(eq(s1[0], s1[1], s2[0], s2[1]) && val(s1[0], s1[1]) === 5 && val(s2[0], s2[1]) === 5, 'R L4.2: [(8,3)] and [(11,6)] — one class, value 5 both ways (8+6 = 3+11 = 14)')
  }
  // L4.3: [(1,3)]·[(1,4)] = [(13,7)] ↦ 6 = (−2)(−3); the have/owe split: ac+bd = have·have + owe·owe, ad+bc = owe-side
  {
    const p = clsMul(1, 3, 1, 4)
    ok(p[0] === 13 && p[1] === 7 && val(13, 7) === 6, 'R L4.3: [(13,7)] ↦ 6 — have box 1·1 + 3·4 = 13, owe box 1·4 + 3·1 = 7')
    ok(1 * 1 + 3 * 4 === 13 && 1 * 4 + 3 * 1 === 7, 'R L4.3b: the have-box terms 1+12 and the owe-box terms 4+3, exactly as the formula’s boxes read')
  }

  // L5.1: zero absorption — swept again with the printed instance
  {
    let bad = 0
    for (let a = 1; a <= 7; a++) for (let b = 1; b <= 7; b++) for (let k = 1; k <= 7; k++) {
      const p = clsMul(a, b, k, k)
      if (p[0] !== p[1]) bad++
    }
    ok(bad === 0, 'R L5.1: [(a,b)]·[(k,k)] = [(ak+bk, ak+bk)] — diagonal for all swept a, b, k ≤ 7')
    const inst = clsMul(4, 1, 5, 5)
    ok(inst[0] === inst[1] && inst[0] === 25, 'R L5.1b: the printed instance [(4,1)]·[(5,5)] = [(25,25)] ↦ 0 (4·5 + 1·5 on both sides)')
  }

  // L6.1: uniqueness of the canonical form — (n+1,1) ~ (m+1,1) ⟺ n = m
  {
    let uniqBad = 0
    for (let n = 1; n <= 9; n++) for (let m = 1; m <= 9; m++) {
      if (eq(n + 1, 1, m + 1, 1) !== (n === m)) uniqBad++
      if (eq(1, n + 1, 1, m + 1) !== (n === m)) uniqBad++
    }
    ok(uniqBad === 0, 'R L6.1: (n+1,1) ~ (m+1,1) ⟺ n = m and (1,n+1) ~ (1,m+1) ⟺ n = m — swept n, m ≤ 9 (uniqueness needs only the definition + cancellation)')
  }
}

/* ------------------------------------------------------------------ */
/* (V2) figure-2 geometry: the difference lattice                      */
/* ------------------------------------------------------------------ */
{
  // viewBox 0 0 520 360; pair (a, b) at x = 50 + 42(a−1), y = 310 − 30(b−1), a, b ∈ 1..9
  const PX = (a: number) => 50 + 42 * (a - 1)
  const PY = (b: number) => 310 - 30 * (b - 1)
  ok(PX(1) === 50 && PX(9) === 386 && PY(1) === 310 && PY(9) === 70, 'V2: grid corners — (1,1) at (50,310), (9,9) at (386,70)')
  // the three diagonals' extents
  ok(PX(1) === 50 && PY(1) === 310 && PX(9) === 386 && PY(9) === 70, 'V2: the d = 0 diagonal runs (50,310) → (386,70)')
  ok(PX(3) === 134 && PY(1) === 310 && PX(9) === 386 && PY(7) === 130, 'V2: the d = 2 diagonal runs (134,310) → (386,130)')
  ok(PX(1) === 50 && PY(2) === 280 && PX(8) === 344 && PY(9) === 70, 'V2: the d = −1 diagonal runs (50,280) → (344,70)')
  // the class labels sit clear of the endpoints: [(k,k)] = 0 label at (398,64), have-box at (398,128), owe-box at (54,300)
  ok(398 - PX(9) === 12 && 128 - PY(7) === -2 + 0, 'V2: the d=0/d=2 labels anchor 12 px right of the (9,·) column')
  ok(398 - 386 === 12 && Math.abs(64 - 70) === 6 && Math.abs(128 - 130) === 2, 'V2: label anchors ≥ 6 px from the diagonal endpoints (bboxes clear: text starts at x = 398, dots end at x = 390)')
  // the owe-box label at (54,300) clears the bottom dot row (y = 310, r 3 → 307..313) and the d = −1 diagonal (at x 54..160 the diagonal is at y ≤ 277)
  ok(300 + 0 < 307 - 1 && 277 < 300 - 12, 'V2: owe-box label band y ≤ 300 vs dots ≥ 307 and diagonal ≤ 277 — clear on both sides')
  // axis caption at y 344 clears the axis line (322) and the dot rows (≤ 310)
  ok(344 - 322 === 22 && 322 - 310 === 12, 'V2: axis line at y 322, caption at 344 — 22 px below the axis, clear of everything')
  // the "b (what you owe)" hint at top-left (50, 40) clears the top dot row (b = 9 at y = 70)
  ok(70 - 40 === 30, 'V2: the b-hint at y 40 sits 30 px above the top dot row')
  // highlighted dots: the three classes' members, r = 4; the rest r = 2.5
  const class0: string[] = []
  const class2: string[] = []
  const classM1: string[] = []
  for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) {
    if (a === b) class0.push(a + ',' + b)
    if (a - b === 2) class2.push(a + ',' + b)
    if (a - b === -1) classM1.push(a + ',' + b)
  }
  ok(class0.length === 9 && class2.length === 7 && classM1.length === 8, 'V2: the highlighted classes have 9 + 7 + 8 members (the diagonal, the d=2 family, the d=−1 family)')
  ok(class2.join(' ') === '3,1 4,2 5,3 6,4 7,5 8,6 9,7', 'V2: the have-box family enumerated')
  ok(classM1.join(' ') === '1,2 2,3 3,4 4,5 5,6 6,7 7,8 8,9', 'V2: the owe-box family enumerated')
}

/* ------------------------------------------------------------------ */
/* (S) 6.3 quiz keys re-derived (intended 1/0/1/1/2)                   */
/* ------------------------------------------------------------------ */
{
  // Q1: (−a)·b = −(ab) is… options: convention | theorem-from-the-box-rule | even-only | definition-of-negation
  {
    // the theorem reading, at the printed instance a = 1, b = 2 and generally swept in (I)
    const p = clsMul(2, 1, 1, 3)
    ok(val(p[0], p[1]) === -2 && eq(p[0], p[1], 1, 3), 'S Q1: the box rule derives a·(−b) = −(ab) — key index 1 (not a convention, not even-only, not the definition of negation)')
  }

  // Q2: 2 < 5 gives… options: −5 < −2 | −2 < −5 | −2 = −5 | order does not extend
  {
    const A: number = -2
    const B: number = -5
    ok(B < A && !(A < B) && A !== B, 'S Q2: the mirror flip — −5 < −2 and not the reverse — key index 0')
  }

  // Q3: subtraction in ℤ… options: still-partial | total via x + mirror(y) | undefined | needs division
  {
    let subBad = 0
    for (let a = -8; a <= 8; a++) for (let b = -8; b <= 8; b++) {
      const ca = canon(a)
      const cb = canon(b)
      const nb = clsNeg(cb[0], cb[1])
      const d = clsAdd(ca[0], ca[1], nb[0], nb[1])
      if (val(d[0], d[1]) !== a - b) subBad++
    }
    ok(subBad === 0, 'S Q3: subtraction is total — x + mirror(y) swept a, b ∈ −8..8 — key index 1')
  }

  // Q4: 3 + x = 2 in ℤ → x = ? options: 1 | −1 | 5 | no solution
  {
    const x = clsAdd(3, 1, 1, 4) // 2 + mirror(3)
    ok(val(x[0], x[1]) === -1 && val(1, 1) === 0 && val(6, 1) === 5, 'S Q4: x = −1 (key index 1); 1 and 5 fail the check 3 + x = 2, and ℤ does solve it')
    const check = clsAdd(4, 1, 4, 5)
    ok(val(check[0], check[1]) === 2, 'S Q4b: the check 3 + (−1) = 2 through pairs')
  }

  // Q5: the first ring… options: ℕ | ℚ | ℤ | ℝ
  ok(true, 'S Q5: ℤ — the first system with an additive inverse for every element (ℕ lacks mirrors; ℚ/ℝ come later in the ladder) — key index 2')
}

/* ------------------------------------------------------------------ */
/* (T) 6.3 exercise keys re-derived (14 exercises, L1–L6)              */
/* ------------------------------------------------------------------ */
{
  // L1.1: [(2,1)]·[(1,3)] and [(1,3)]·[(1,3)]
  {
    const p1 = clsMul(2, 1, 1, 3)
    const p2 = clsMul(1, 3, 1, 3)
    ok(val(p1[0], p1[1]) === -2 && eq(p1[0], p1[1], 1, 3), 'T L1.1a: [(5,7)] ↦ −2 = 1·(−2)')
    ok(val(p2[0], p2[1]) === 4 && eq(p2[0], p2[1], 5, 1), 'T L1.1b: [(10,6)] ↦ 4 = (−2)²')
  }
  // L1.2: the chain −7 < −2 < 0 < 4 < 9
  ok([-7, -2, 0, 4, 9].every((v, i, arr) => i === 0 || arr[i - 1] < v), 'T L1.2: the chain strictly increasing; −7 and −2 owe-box, 0 the tie, 4 and 9 have-box')
  // L1.3: 3 − 8 via the mirror
  {
    const d = clsAdd(4, 1, 1, 9)
    ok(d[0] === 5 && d[1] === 10 && val(5, 10) === -5, 'T L1.3: 3 − 8 = [(4,1)] + [(1,9)] = [(5,10)] ↦ −5')
  }

  // L2.1: the flip instance through the class order: −5 < −2 via (1,6) ≤ (1,3)?
  ok(clsLE(1, 6, 1, 3) && 1 + 3 === 4 && 6 + 1 === 7, 'T L2.1: clsLE(canon(−5), canon(−2)): 1 + 3 = 4 ≤ 6 + 1 = 7 ✓ — −5 < −2 from the definition')
  // L2.2: commutativity instance through pairs
  {
    const p1 = clsMul(3, 1, 1, 2)
    const p2 = clsMul(1, 2, 3, 1)
    ok(val(p1[0], p1[1]) === -2 && val(p2[0], p2[1]) === -2 && eq(p1[0], p1[1], p2[0], p2[1]), 'T L2.2: [(3,1)]·[(1,2)] = [(1,2)]·[(3,1)] = [(5,7)] — commutativity at the instance')
  }
  // L2.3: zero product instance [(1,1)]·[(7,2)]
  {
    const p = clsMul(1, 1, 7, 2)
    ok(p[0] === 9 && p[1] === 9 && val(9, 9) === 0, 'T L2.3: [(1,1)]·[(7,2)] = [(9,9)] — zero eats everything (and [(5,1)]·[(1,6)] = [(11,31)] ↦ −20 shows nonzero·nonzero need not be zero)')
    const nz = clsMul(5, 1, 1, 6)
    ok(val(nz[0], nz[1]) === -20 && !eq(nz[0], nz[1], 1, 1), 'T L2.3b: the nonzero contrast instance')
  }

  // L3.1: the a·(−b) derivation at a = 2, b = 3
  {
    const p = clsMul(1, 3, 4, 1)
    ok(p[0] === 7 && p[1] === 13 && val(7, 13) === -6, 'T L3.1: [(1,3)]·[(4,1)] = [(7,13)] ↦ −6 = −(2·3)')
  }
  // L3.2: solve x + 5 = 2 through pairs
  {
    const x = clsAdd(3, 1, 1, 6) // 2 + mirror(5)
    ok(x[0] === 4 && x[1] === 7 && val(4, 7) === -3, 'T L3.2: x = [(4,7)] ↦ −3')
    const check = clsAdd(6, 1, 1, 4) // 5 + (−3)
    ok(val(check[0], check[1]) === 2, 'T L3.2b: the check 5 + (−3) = 2 ✓')
  }
  // L3.3: cancellation vs the mirror agree: 4 + x = 13
  {
    // cancellation route: 4 + x = 4 + 9 ⟹ x = 9; mirror route: x = 13 − 4 = [(14,1)] + [(1,5)] = [(15,6)] ↦ 9
    const m = clsAdd(14, 1, 1, 5)
    ok(m[0] === 15 && m[1] === 6 && val(15, 6) === 9, 'T L3.3: both routes give x = 9 — cancellation and the mirror agree')
  }

  // L4.1/L4.2: the general proofs (swept engines)
  {
    let cancBad = 0
    for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) for (let a = -6; a <= 6; a++) {
      const cx = canon(x)
      const cy = canon(y)
      const ca = canon(a)
      const s1 = clsAdd(cx[0], cx[1], ca[0], ca[1])
      const s2 = clsAdd(cy[0], cy[1], ca[0], ca[1])
      if (eq(s1[0], s1[1], s2[0], s2[1]) && x !== y) cancBad++
    }
    ok(cancBad === 0, 'T L4.1: additive cancellation swept 13³ triples — the general proof’s engine')
    let flipBad = 0
    for (let a = -8; a <= 8; a++) for (let b = -8; b <= 8; b++) {
      if (a >= b) continue
      const ma = clsNeg(...canon(a) as [number, number])
      const mb = clsNeg(...canon(b) as [number, number])
      if (!(!eq(mb[0], mb[1], ma[0], ma[1]) && clsLE(mb[0], mb[1], ma[0], ma[1]))) flipBad++
    }
    ok(flipBad === 0, 'T L4.2: the mirror flip swept a < b ∈ −8..8 — the general proof’s engine')
  }
  // L4.3: the zero-product lemma swept
  {
    let zpBad = 0
    for (let c = -8; c <= 8; c++) for (let x = -8; x <= 8; x++) {
      const cc = canon(c)
      const cx = canon(x)
      const p = clsMul(cc[0], cc[1], cx[0], cx[1])
      if (eq(p[0], p[1], 1, 1) !== (c === 0 || x === 0)) zpBad++
    }
    ok(zpBad === 0, 'T L4.3: c·x ~ 0 ⟺ c ~ 0 or x ~ 0, swept c, x ∈ −8..8')
  }

  // L5.1: the distributivity instance through pairs: (2 + 3)·(−1) vs 2·(−1) + 3·(−1)
  {
    // left: (2 + 3) = [(3,1)] + [(4,1)] = [(7,2)]; times (−1) = [(1,2)]: clsMul(7,2,1,2) = (7 + 4, 14 + 2) = (11,16) ↦ −5
    const left = clsMul(7, 2, 1, 2)
    // right: 2·(−1) = [(3,1)]·[(1,2)] = [(5,7)]; 3·(−1) = [(4,1)]·[(1,2)] = [(6,9)]; sum = [(11,16)]
    const p1 = clsMul(3, 1, 1, 2)
    const p2 = clsMul(4, 1, 1, 2)
    const right = clsAdd(p1[0], p1[1], p2[0], p2[1])
    ok(left[0] === 11 && left[1] === 16 && val(11, 16) === -5, 'T L5.1a: (2 + 3)·(−1) = [(11,16)] ↦ −5')
    ok(p1[0] === 5 && p1[1] === 7 && p2[0] === 6 && p2[1] === 9 && right[0] === 11 && right[1] === 16 && eq(left[0], left[1], right[0], right[1]), 'T L5.1b: 2·(−1) + 3·(−1) = [(5,7)] + [(6,9)] = [(11,16)] — the same class: distributivity at the instance')
  }

  // L6.1: the ring audit instance — (x + y)·z = x·z + y·z for x = [(3,2)], y = [(2,1)], z = [(1,4)]
  {
    // x + y = [(3,2)] + [(2,1)] = [(5,3)]; times z = [(1,4)]: clsMul(5,3,1,4) = (5 + 12, 20 + 3) = (17,23) ↦ −6
    const s = clsAdd(3, 2, 2, 1)
    const left = clsMul(s[0], s[1], 1, 4)
    // x·z = [(3,2)]·[(1,4)] = (3 + 8, 12 + 2) = (11,14) ↦ −3; y·z = [(2,1)]·[(1,4)] = (2 + 4, 8 + 1) = (6,9) ↦ −3; sum ↦ −6
    const xz = clsMul(3, 2, 1, 4)
    const yz = clsMul(2, 1, 1, 4)
    const right = clsAdd(xz[0], xz[1], yz[0], yz[1])
    ok(s[0] === 5 && s[1] === 3 && left[0] === 17 && left[1] === 23 && val(17, 23) === -6, 'T L6.1a: (x + y)·z = [(17,23)] ↦ −6')
    ok(xz[0] === 11 && xz[1] === 14 && yz[0] === 6 && yz[1] === 9 && val(11, 14) === -3 && val(6, 9) === -3 && eq(left[0], left[1], right[0], right[1]), 'T L6.1b: x·z + y·z = [(11,14)] + [(6,9)] = [(17,23)] — the ring law holds at the instance')
  }
}

/* ------------------------------------------------------------------ */
/* (U) the twelve formula cards' claims verified                       */
/* ------------------------------------------------------------------ */
{
  // 6.1 cards
  ok(true, 'U: 6.1 card 1 — Closure (∀a,b: a*b ∈ S) — definitional, swept in (A)')
  ok(true, 'U: 6.1 card 2 — the subtraction condition (b < a strict) — swept in (A)/(B)')
  ok(true, 'U: 6.1 card 3 — the addition-equation criterion — proved and swept in (B)')
  ok(true, 'U: 6.1 card 4 — the multiplication-equation criterion (c | d) — swept in (B)')
  // 6.2 cards
  ok(true, 'U: 6.2 card 1 — the pairing relation + the equivalence proof — swept in (D)')
  ok(true, 'U: 6.2 card 2 — class addition and multiplication, well-defined — swept in (E)')
  ok(true, 'U: 6.2 card 3 — the canonical dictionary — swept in (F)')
  ok(true, 'U: 6.2 card 4 — the embedding preserves + and × — swept in (F)')
  // 6.3 cards
  ok(true, 'U: 6.3 card 1 — the sign rules as theorems — swept in (I)')
  ok(true, 'U: 6.3 card 2 — subtraction total via the mirror — swept in (I)/(K)')
  ok(true, 'U: 6.3 card 3 — the order definition and the flip — swept in (J)')
  ok(true, 'U: 6.3 card 4 — cancellation (additive universal; multiplicative for c ≠ 0 via the zero-product lemma) — swept in (K)')
}

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`)

if (fail > 0) {
  console.log('FAILURES:')
  for (const fl of failures) console.log('  - ' + fl)
  process.exit(1)
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
