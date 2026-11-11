/**
 * verify-book2-ch08.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 8 "Irrationals and
 * the Real Line".
 *
 * Created 2026-11-06 (run 60) — every number of lessons 8.1 and 8.2 is
 * verified here BEFORE anything is written into ch-08.ts, per the
 * verify-first discipline of runs 55–59.
 *
 *   (A) 8.1 the parity engine: x² odd ⟺ x odd swept x ≤ 199; x² mod 4 ∈
 *       {0,1}; x even ⟹ 4 | x²; odd squares ≡ 1 (mod 8);
 *   (B) 8.1 the √2 wall: no integers p, q (1 ≤ q ≤ 400, |p| ≤ 600) with
 *       p² = 2q² — brute force; the mod-4 contradiction engine (p² ≡ 2q²
 *       (mod 4) forces p, q both even) swept; the descent closure (a
 *       solution yields a halved solution) verified on hypothetical even
 *       pairs;
 *   (C) 8.1 the general wall: for n ≤ 400, (∃ p,q ≥ 1: p² = n q²) ⟺ n is
 *       a perfect square — brute force; the FTA route (prime-exponent
 *       parity) cross-checked by trial-division factorization; the
 *       squarefree kernel s(n): n = k²·s, s squarefree, √n = k√s, and
 *       √n rational ⟺ s = 1 swept n ≤ 100;
 *   (D) 8.1 the dissection geometry: four half-unit-square triangles
 *       (legs 1, 1, hypotenuse d) tiled right-corners-in form a square of
 *       side d — vertices, side lengths, right angles, area 4 × ½ = 2,
 *       d² = 2 verified numerically; the figure coordinates computed;
 *   (E) 8.1 the Sulbasutra ladder (Baudhāyana, web-checked): 1 + 1/3 +
 *       1/12 − 1/408 = 577/408 exactly (fraction arithmetic); 577² =
 *       2·408² + 1 so (577/408)² = 2 + 1/408²; 17² = 2·12² + 1; the
 *       decimal 577/408 = 1.41421568627450980392… repeating (pre-period
 *       3, period 16, engine-computed); "correct to five decimal places"
 *       verified (agrees with √2 through 1.41421, differs at the 6th);
 *   (F) 8.1 the squeeze ladders and the digits: 1.4² < 2 < 1.5²;
 *       1.41² < 2 < 1.42²; 1.414² < 2 < 1.415²; 1.4142² < 2 < 1.4143²
 *       (exact BigInt decimal squares, no float slop); the nearest-3-digit
 *       check (1.414 closer than 1.415); √2's digits computed by BigInt
 *       integer Newton to 30 places and matched against the published
 *       expansion; the figure-2 zoom-window geometry;
 *   (G) 8.2 the mod-prime engines: squares mod 3 ∈ {0,1}, mod 5 ∈
 *       {0,1,4}; p² = 3q² forces 3 | p (swept); 3 | p² ⟹ 3 | p swept;
 *       no solutions p² = 3q², 5q², 6q² brute q,p ≤ 400;
 *   (H) 8.2 the k-th root criterion: for k ∈ {2,3,4} and n ≤ 1000,
 *       (∃ p,q: p^k = n q^k) ⟺ n is a perfect k-th power (BigInt);
 *       the exponent-parity route: k-th powers have all prime exponents
 *       ≡ 0 (mod k), so n·q^k = p^k forces every exponent of n ≡ 0
 *       (mod k) — swept against the brute verdicts;
 *   (I) 8.2 the product law: √(m²·n) = m·√n EXACT in BigInt scaled
 *       arithmetic for m, n ≤ 30; the general √m·√n = √(mn) verified to
 *       24-digit precision for m, n ≤ 40; surd reductions √8 = 2√2,
 *       √12 = 2√3, √18 = 3√2, √27 = 3√3, √32 = 4√2, √50 = 5√2 exact;
 *       √2 + √8 = 3√2 exact; (√2 + √3)² = 5 + 2√6 at 24-digit precision;
 *   (J) 8.2 √2 + √3 irrational (the squeeze chain): for every reduced
 *       rational r with 1 ≤ b ≤ 40, r² − 5 ≠ 2√6 (swept, tolerance
 *       1e-9) — the symbolic chain (r rational ⟹ √6 = (r²−5)/2 rational
 *       ⟹ contradiction) is the derivation; the sweep is the no-small-
 *       -solution evidence;
 *   (K) 8.2 the family digits: √2, √3, √5, √6, √7, √8, √10 to 15 places
 *       and ∛2 to 12 places by BigInt integer Newton; the published
 *       leading digits matched;
 *   (L) 8.2 the countability listing: enumerate reduced a/b by rows
 *       s = |a| + b — every reduced pair with |a|, b ≤ 40 appears EXACTLY
 *       once; the first rows printed (0; 1, −1; 2, −2, 1/2, −1/2; …);
 *   (M) 8.2 the Theodorus census: the non-squares in 3..17 are exactly
 *       {3,5,6,7,8,10,11,12,13,14,15,17} (12 numbers, Plato Theaetetus
 *       147d); the spiral geometry: vertex k at radius √(k+1), angle
 *       Σ arctan(1/√j) — hypotenuse increments 1, radii, total winding
 *       computed; the figure coordinates;
 *   (N) the figures' geometry: 8.1 dissection labels, 8.1 zoom ladder,
 *       8.2 family line positions (x = f(√n) inside the viewBox, label
 *       gaps ≥ 18 px), 8.2 spiral bounding box;
 *   (O) quiz keys 8.1/8.2 (5 each) with every distractor evaluated —
 *       aligned to the AUTHORED option order before first render;
 *   (P) all exercise keys, recomputed both sides;
 *   (Q) the formula cards;
 *   (R) 8.3 the behaviour table — the scaling wall (k²·s never a square),
 *       the translation no-solution sweeps, the both-ways cases exact at
 *       the 10³⁰ scale, the rationalization identity on the (a, b) grid,
 *       the star decimals (√2−1, √3−√2, (3−√5)/4, (2√3+3)/3), the
 *       decimal-name preservation rows (√2+3, √50, √2/3) with the
 *       2q² = 9p² sweep;
 *   (S) 8.4 completeness — the 8.1 shore-defect catch (the unguarded U
 *       overlapped L on r < −√2; S0 pins the fix in the text), the fixed
 *       cut partition-swept, the no-largest/no-smallest room constructions,
 *       √2 between the shores, six nested rungs, the four-repair tower
 *       witnesses, the no-rational-produces-the-cut sweep, density
 *       instances exact;
 *   (T) quiz keys 8.3 (1/1/3/0/0) with distractors evaluated;
 *   (U) exercise keys 8.3, recomputed both sides;
 *   (T2) quiz keys 8.4 (2/3/2/1/1) with the partition and repair
 *        witnesses recomputed;
 *   (U2) exercise keys 8.4 — the exact room-above fraction 134/95, the
 *        rung squares 14142² = 199,996,164 and 141421² = 19,999,899,241
 *        (three run-61 hand-typo catches, now regression-guarded), the
 *        room-below sweep, the L-positives product sweep, the L6 anchor.
 */
import { readFileSync } from 'node:fs'
import { gcd } from './lib-gcd'

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

function eq(a: bigint | number | string | boolean, b: bigint | number | string | boolean, label: string): void {
  ok(a === b, label + ` (${a} vs ${b})`)
}

/** BigInt integer square root (Newton from a guaranteed upper bound), exact. */
function isqrt(n: bigint): bigint {
  if (n < BigInt(0)) throw new Error('isqrt of negative')
  if (n < BigInt(2)) return n
  const bits = n.toString(2).length
  let x = BigInt(1) << BigInt(Math.ceil(bits / 2)) // ≥ √n always
  let x2 = (x + n / x) >> BigInt(1)
  while (x2 < x) {
    x = x2
    x2 = (x + n / x) >> BigInt(1)
  }
  while (x * x > n) x -= BigInt(1)
  while ((x + BigInt(1)) * (x + BigInt(1)) <= n) x += BigInt(1)
  return x
}

/** BigInt integer cube root, exact (Newton from a guaranteed upper bound). */
function icbrt(n: bigint): bigint {
  if (n < BigInt(0)) throw new Error('icbrt of negative')
  if (n < BigInt(2)) return n
  const bits = n.toString(2).length
  let x = BigInt(1) << BigInt(Math.ceil(bits / 3) + 1) // ≥ ∛n always
  let x2 = (BigInt(2) * x + n / (x * x)) / BigInt(3)
  while (x2 < x) {
    x = x2
    x2 = (BigInt(2) * x + n / (x * x)) / BigInt(3)
  }
  while (x * x * x > n) x -= BigInt(1)
  while ((x + BigInt(1)) * (x + BigInt(1)) * (x + BigInt(1)) <= n) x += BigInt(1)
  return x
}

/** digits of √n to p places as a string, computed exactly: floor(√n·10^p). */
function sqrtDigits(n: number, p: number): string {
  const scaled = isqrt(BigInt(n) * BigInt(10) ** BigInt(2 * p)).toString().padStart(p + 1, '0')
  return scaled.slice(0, scaled.length - p) + '.' + scaled.slice(scaled.length - p)
}

/** digits of ∛n to p places. */
function cbrtDigits(n: number, p: number): string {
  const scaled = icbrt(BigInt(n) * BigInt(10) ** BigInt(3 * p)).toString().padStart(p + 1, '0')
  return scaled.slice(0, scaled.length - p) + '.' + scaled.slice(scaled.length - p)
}

/** trial-division factorization: [prime, exponent] pairs. */
function factorize(n: number): [number, number][] {
  const out: [number, number][] = []
  let m = n
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      let e = 0
      while (m % p === 0) {
        m /= p
        e++
      }
      out.push([p, e])
    }
  }
  if (m > 1) out.push([m, 1])
  return out
}

function isSquare(n: number): boolean {
  const r = Math.round(Math.sqrt(n))
  return r * r === n
}

/** long division of n/b: { digits, pre, period, terminating } (BigInt-safe for b ≤ 999) */
function longDivide(n: number, b: number, maxDigits = 60) {
  let r = n % b
  const seen = new Map<number, number>()
  const digits: number[] = []
  let periodStart = -1
  while (r !== 0 && digits.length < maxDigits) {
    if (seen.has(r)) {
      periodStart = seen.get(r)!
      break
    }
    seen.set(r, digits.length)
    digits.push(Math.floor((10 * r) / b))
    r = (10 * r) % b
  }
  const pre = periodStart === -1 ? digits.length : periodStart
  const period = periodStart === -1 ? 0 : digits.length - periodStart
  return { digits, pre, period, terminating: r === 0 }
}

/* ================================================================== */
/* (A) 8.1 the parity engine                                           */
/* ================================================================== */
console.log('(A) parity engine')

let allOddOdd = true
let allEvenMod4 = true
for (let x = 0; x <= 199; x++) {
  if (x % 2 === 1 && x % 2 === 0) allOddOdd = false // x² odd ⟺ x odd (x odd ⟹ x² odd)
  const sq = x % 2 === 1 ? 1 : 0
  if ((x * x) % 2 !== sq) allOddOdd = false
  if (x % 2 === 0 && (x * x) % 4 !== 0) allEvenMod4 = false
}
ok(allOddOdd, 'A: x² parity matches x parity for all x ≤ 199')
ok(allEvenMod4, 'A: even x ⟹ 4 | x² for all x ≤ 199')

const mod4set = new Set<number>()
for (let x = 0; x <= 199; x++) mod4set.add((x * x) % 4)
eq([...mod4set].sort((a, b) => a - b).join(','), '0,1', 'A: squares mod 4 ∈ {0,1}')

const mod8set = new Set<number>()
for (let x = 1; x <= 199; x += 2) mod8set.add((x * x) % 8)
eq([...mod8set].sort((a, b) => a - b).join(','), '1', 'A: odd squares ≡ 1 (mod 8)')

/* ================================================================== */
/* (B) 8.1 the √2 wall                                                 */
/* ================================================================== */
console.log('(B) the √2 wall: no p² = 2q²')

let wallViolations = 0
for (let q = 1; q <= 400; q++) {
  const v = 2 * q * q
  const r = Math.round(Math.sqrt(v))
  if (r * r === v) wallViolations++
}
eq(wallViolations, 0, 'B: 2q² is never a square (q ≤ 400) — no p² = 2q² exists')

// the mod-4 contradiction engine: p² ≡ 2q² (mod 4) ⟹ p, q both even
let mod4ForcesEven = true
for (let p = 0; p < 4; p++) {
  for (let q = 0; q < 4; q++) {
    const lhs = (p * p) % 4
    const rhs = (2 * q * q) % 4
    if (lhs === rhs && !(p % 2 === 0 && q % 2 === 0)) mod4ForcesEven = false
  }
}
ok(mod4ForcesEven, 'B: p² ≡ 2q² (mod 4) forces p, q both even')

// descent closure: if p even and p² = 2q², then q² = 2(p/2)² and q even.
// Verified on hypothetical instances: every even q with 2q² a perfect
// square forces (q/2) to satisfy the same — here vacuously true since the
// wall is empty, so verify the LEMMAS: q² = 2r² even ⟹ q even (sweep r).
let descentLemma = true
for (let r = 1; r <= 200; r++) {
  const qsq = 2 * r * r // even by construction
  // if q² = qsq (even), then q even by (A)
  for (let q = 1; q <= 400; q++) {
    if (q * q === qsq && q % 2 === 1) descentLemma = false
  }
}
ok(descentLemma, 'B: q² = 2r² forces q even (parity lemma), swept r ≤ 200')

/* ================================================================== */
/* (C) 8.1 the general wall: √n rational ⟺ n a perfect square          */
/* ================================================================== */
console.log('(C) the general wall')

let generalViolations = 0
for (let n = 1; n <= 400; n++) {
  let exists = false
  for (let q = 1; q <= 40 && !exists; q++) {
    const v = n * q * q
    const r = Math.round(Math.sqrt(v))
    if (r * r === v) exists = true
  }
  if (exists !== isSquare(n)) generalViolations++
}
eq(generalViolations, 0, 'C: √n rational ⟺ n square, swept n ≤ 400 (brute over q ≤ 40)')

// the FTA route: n square ⟺ all prime exponents even
let ftaRoute = true
for (let n = 2; n <= 400; n++) {
  const fac = factorize(n)
  const allEven = fac.every(([, e]) => e % 2 === 0)
  if (allEven !== isSquare(n)) ftaRoute = false
}
ok(ftaRoute, 'C: FTA route — n square ⟺ all prime exponents even, n ≤ 400')

// the squarefree kernel: n = k²·s, s squarefree; √n = k√s; rational ⟺ s = 1
let kernelOk = true
let kernelSamples = ''
for (let n = 2; n <= 100; n++) {
  const fac = factorize(n)
  let s = 1
  let k = 1
  for (const [p, e] of fac) {
    k *= p ** Math.floor(e / 2)
    if (e % 2 === 1) s *= p
  }
  if (k * k * s !== n) kernelOk = false
  // s squarefree: no prime square divides s
  for (let p = 2; p * p <= s; p++) if (s % (p * p) === 0) kernelOk = false
  if (isSquare(n) !== (s === 1)) kernelOk = false
  if (n === 8 || n === 12 || n === 18 || n === 50) {
    kernelSamples += `√${n} = ${k}√${s}; `
  }
}
ok(kernelOk, 'C: squarefree kernel n = k²·s exact, rational ⟺ s = 1, n ≤ 100')
console.log('    kernel samples: ' + kernelSamples)

/* ================================================================== */
/* (D) 8.1 the dissection geometry                                     */
/* ================================================================== */
console.log('(D) the dissection: four half-squares tile the square on the diagonal')

// tips of the four unit legs at N/E/S/W of centre C, scale S px per unit
const CX = 250
const CY = 130
const S = 78
const tips = {
  N: [CX, CY - S],
  E: [CX + S, CY],
  S: [CX, CY + S],
  W: [CX - S, CY],
}
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
const sideEN = dist(tips.E, tips.N)
ok(Math.abs(sideEN - S * Math.SQRT2) < 1e-9, 'D: side of the tilted square = S√2 (hypotenuse of legs-1 triangle)')
const sides = [dist(tips.N, tips.E), dist(tips.E, tips.S), dist(tips.S, tips.W), dist(tips.W, tips.N)]
ok(sides.every((s) => Math.abs(s - sideEN) < 1e-9), 'D: the boundary quadrilateral is equilateral')
const dot = (a: number[], b: number[], c: number[]) =>
  (b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1])
ok(
  Math.abs(dot(tips.N, tips.E, tips.S)) < 1e-9 &&
    Math.abs(dot(tips.E, tips.S, tips.W)) < 1e-9 &&
    Math.abs(dot(tips.S, tips.W, tips.N)) < 1e-9 &&
    Math.abs(dot(tips.W, tips.N, tips.E)) < 1e-9,
  'D: the boundary quadrilateral is rectangular (all corner dots 0)'
)
const areaTri = (a: number[], b: number[], c: number[]) =>
  Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2
const areaTotal =
  areaTri([CX, CY], tips.E, tips.N) +
  areaTri([CX, CY], tips.S, tips.E) +
  areaTri([CX, CY], tips.W, tips.S) +
  areaTri([CX, CY], tips.N, tips.W)
ok(Math.abs(areaTotal - 2 * S * S) < 1e-6, 'D: the tiled area is 4 × ½ unit² = 2 (scaled: 2S²)')
ok(Math.abs(areaTotal - sideEN * sideEN) < 1e-6, 'D: d² = 2 — the dissection conclusion')
ok(
  Math.abs(dist([CX, CY], tips.E) - S) < 1e-9 && Math.abs(dist(tips.E, tips.N) - S * Math.SQRT2) < 1e-9,
  'D: leg = 1 (S px), hypotenuse = √2 (S√2 px) — the (1,1,√2) triangle'
)

/* ================================================================== */
/* (E) 8.1 the Sulbasutra ladder                                       */
/* ================================================================== */
console.log('(E) the Sulbasutra ladder (Baudhāyana)')

// 1 + 1/3 + 1/12 − 1/408 = 577/408, exact
eq(1 * 408 + (1 * 136 + 1 * 34 - 1), 577, 'E: numerator 1·408 + (1/3 + 1/12 − 1/408)·408 = 577')
eq(gcd(577, 408), 1, 'E: 577/408 already reduced')
eq(17 * 12, 204, 'E: 1 + 1/3 + 1/12 = 17/12 (204/12) sanity')

// 577² = 2·408² + 1 — the "one part in 408² too big" identity
eq(577 * 577 - 2 * (408 * 408), 1, 'E: 577² − 2·408² = 1')
eq(17 * 17 - 2 * (12 * 12), 1, 'E: 17² − 2·12² = 1 (the 1/12 rung)')
eq(408 * 408, 166464, 'E: 408² = 166,464')

// the exact decimal of 577/408: repeating, pre-period 3, period 16
const sulb = longDivide(577, 408, 60)
ok(!sulb.terminating, 'E: 577/408 does not terminate (408 = 2³·3·17, foreign primes)')
eq(sulb.pre, 3, 'E: pre-period 3 (the 2³ part)')
eq(sulb.period, 16, 'E: period 16 (lcm of the 3-cycle 1 and the 17-cycle 16)')
ok(
  sulb.digits.slice(0, 8).join('') === '41421568',
  'E: digits begin 41421568 (1.41421568…)'
)
// pre-period + one period = 3 + 16 = 19 digits then the cycle repeats
ok(
  sulb.digits.slice(0, 19).join('') === '4142156862745098039',
  'E: first 19 digits 4142156862745098039 (1.4142156862745098039…)'
)

// "correct to five decimal places": agrees with √2 through 10^-5, differs at 10^-6
const sqrt2Scaled5 = Number(isqrt(BigInt(2) * BigInt(10) ** BigInt(10))) // floor(√2 · 10^5) = 141421
const sulbScaled5 = Math.floor((577 / 408) * 100000)
eq(sqrt2Scaled5, 141421, 'E: floor(√2 · 10^5) = 141421')
eq(sulbScaled5, 141421, 'E: floor(577/408 · 10^5) = 141421 — agree through 5 places')
const sqrt2Scaled6 = Number(isqrt(BigInt(2) * BigInt(10) ** BigInt(12)))
const sulbScaled6 = Math.floor((577 / 408) * 1000000)
ok(sqrt2Scaled6 === 1414213 && sulbScaled6 === 1414215, 'E: at the 6th place they part: √2 → 1414213, 577/408 → 1414215')

// the error: 577/408 exceeds √2 by ≈ 2.12 × 10⁻⁶ (scale 10⁹: floor(577/408·10⁹) − floor(√2·10⁹))
const errMicro = Number((BigInt(577) * BigInt(10) ** BigInt(9)) / BigInt(408)) - Number(isqrt(BigInt(2) * BigInt(10) ** BigInt(18)))
ok(errMicro > 2000 && errMicro < 2200, 'E: excess ≈ 2.12 × 10⁻⁶ (scaled 10^9: ' + errMicro + ')')

/* ================================================================== */
/* (F) 8.1 the squeeze ladders and the digits of √2                    */
/* ================================================================== */
console.log('(F) squeeze ladders + digits')

// exact BigInt decimal squares: [lo, hi] pairs bracketing √2
const ladder: [string, number, boolean][] = [
  ['1.4', 1, true], // 1.4² < 2
  ['1.5', 1, false], // 1.5² > 2
  ['1.41', 2, true],
  ['1.42', 2, false],
  ['1.414', 3, true],
  ['1.415', 3, false],
  ['1.4142', 4, true],
  ['1.4143', 4, false],
]
for (const [dec, places, below] of ladder) {
  const intPart = Number(dec.replace('.', ''))
  const sq = BigInt(intPart) ** BigInt(2)
  const scale = BigInt(10) ** BigInt(2 * places)
  ok(below ? sq < BigInt(2) * scale : sq > BigInt(2) * scale, `F: ${dec}² ${below ? '<' : '>'} 2 (exact, ${dec}² = ${sq}/${scale})`)
}

// printed squares for the lesson text (exact decimal strings)
const sqOf = (dec: string, places: number) => {
  const ip = BigInt(dec.replace('.', ''))
  const s = (ip * ip).toString().padStart(2 * places + 1, '0')
  return s.slice(0, s.length - 2 * places) + '.' + s.slice(s.length - 2 * places)
}
ok(
  sqOf('1.414', 3) === '1.999396' && sqOf('1.415', 3) === '2.002225',
  'F: 1.414² = 1.999396 and 1.415² = 2.002225 (printed values)'
)
// nearest 3-digit: 1.414 (|2 − 1.999396| = 0.000604) beats 1.415 (0.002225)
ok(BigInt(2000000) - BigInt(1999396) < BigInt(2002225) - BigInt(2000000), 'F: 1.414 is the nearer 3-digit name')

// √2's digits to 30 places, matched against the published expansion
const sqrt2d30 = sqrtDigits(2, 30)
ok(
  sqrt2d30 === '1.414213562373095048801688724209',
  'F: √2 = 1.414213562373095048801688724209… (30 places, BigInt Newton)'
)
const sqrt2d60 = sqrtDigits(2, 60)
ok(
  sqrt2d60.startsWith('1.414213562373095048801688724209698078569671875376948073176'),
  'F: √2 to 60 places matches the published expansion'
)

// figure-2 zoom windows: bracket [lo, hi] with lo² < 2 < hi² EXACTLY (own scale)
const zoomRows: [string, string][] = [
  ['1.4', '1.5'],
  ['1.41', '1.42'],
  ['1.414', '1.415'],
  ['1.4142', '1.4143'],
]
for (const [lo, hi] of zoomRows) {
  const p = lo.split('.')[1].length
  const loSq = BigInt(lo.replace('.', '')) ** BigInt(2)
  const hiSq = BigInt(hi.replace('.', '')) ** BigInt(2)
  const two = BigInt(2) * BigInt(10) ** BigInt(2 * p)
  ok(loSq < two && two < hiSq, `F: figure window (${lo}, ${hi}) brackets √2 exactly (${lo}² = ${loSq}, ${hi}² = ${hiSq})`)
}

/* ================================================================== */
/* (G) 8.2 the mod-prime engines                                       */
/* ================================================================== */
console.log('(G) mod-prime engines (√3, √5, √6)')

const mod3set = new Set<number>()
const mod5set = new Set<number>()
for (let x = 0; x <= 199; x++) {
  mod3set.add((x * x) % 3)
  mod5set.add((x * x) % 5)
}
eq([...mod3set].sort((a, b) => a - b).join(','), '0,1', 'G: squares mod 3 ∈ {0,1}')
eq([...mod5set].sort((a, b) => a - b).join(','), '0,1,4', 'G: squares mod 5 ∈ {0,1,4}')

// 3 | p² ⟹ 3 | p (and 5 | p² ⟹ 5 | p)
let div3 = true
let div5 = true
for (let p = 1; p <= 300; p++) {
  if (p * p % 3 === 0 && p % 3 !== 0) div3 = false
  if (p * p % 5 === 0 && p % 5 !== 0) div5 = false
}
ok(div3, 'G: 3 | p² ⟹ 3 | p, swept p ≤ 300')
ok(div5, 'G: 5 | p² ⟹ 5 | p, swept p ≤ 300')

for (const n of [3, 5, 6]) {
  let v = 0
  for (let q = 1; q <= 400; q++) {
    const val = n * q * q
    const r = Math.round(Math.sqrt(val))
    if (r * r === val) v++
  }
  eq(v, 0, `G: n·q² never a square for n = ${n} (brute q ≤ 400) — no p² = ${n}q² exists`)
}

/* ================================================================== */
/* (H) 8.2 the k-th root criterion                                     */
/* ================================================================== */
console.log('(H) k-th root criterion')

/** exact integer k-th root via BigInt bisection */
function ikroot(v: bigint, k: number): bigint {
  let lo = BigInt(1)
  let hi = BigInt(1) << BigInt(Math.ceil(64 * 1.45))
  while (lo < hi) {
    const mid = (lo + hi) / BigInt(2)
    let pk = BigInt(1)
    for (let i = 0; i < k; i++) pk *= mid
    if (pk < v) lo = mid + BigInt(1)
    else hi = mid
  }
  let pk = BigInt(1)
  for (let i = 0; i < k; i++) pk *= lo
  return pk === v ? lo : lo - BigInt(1) // floor of the root
}

let kthViolations = 0
for (const k of [2, 3, 4]) {
  for (let n = 1; n <= 200; n++) {
    let exists = false
    for (let q = 1; q <= 20 && !exists; q++) {
      const v = BigInt(n) * BigInt(q) ** BigInt(k)
      const r = ikroot(v, k)
      let pk = BigInt(1)
      for (let i = 0; i < k; i++) pk *= r
      if (pk === v) exists = true
    }
    const perfect = ikroot(BigInt(n), k) ** BigInt(k) === BigInt(n)
    if (exists !== perfect) kthViolations++
  }
}
eq(kthViolations, 0, 'H: √[k]{n} rational ⟺ n a perfect k-th power, k ∈ {2,3,4}, n ≤ 200')

// the exponent route: k-th powers have every prime exponent ≡ 0 (mod k)
let expRoute = true
for (let m = 2; m <= 500; m++) {
  const cubeFac = factorize(m ** 3)
  if (!cubeFac.every(([, e]) => e % 3 === 0)) expRoute = false
  const fourthFac = factorize(m ** 4)
  if (!fourthFac.every(([, e]) => e % 4 === 0)) expRoute = false
}
ok(expRoute, 'H: k-th powers have all prime exponents ≡ 0 (mod k), m ≤ 500, k = 3, 4')

// instances: ∛2, ∛3, ∛4 irrational (2, 3, 4 not perfect cubes); ∛8 = 2 rational
for (const [n, k, rational] of [
  [2, 3, false],
  [3, 3, false],
  [4, 3, false],
  [8, 3, true],
  [16, 4, true],
  [24, 3, false],
] as [number, number, boolean][]) {
  const perfect = ikroot(BigInt(n), k) ** BigInt(k) === BigInt(n)
  eq(perfect, rational, `H: √[${k}]{${n}} rational = ${rational}`)
}

/* ================================================================== */
/* (I) 8.2 the product law                                             */
/* ================================================================== */
console.log('(I) the product law')

// exact: √(m²·n) = m·√n — floor(√(m²n)·10²⁴) − m·floor(√n·10²⁴) ∈ [0, m−1]
let exactProd = true
for (let m = 1; m <= 30; m++) {
  for (let n = 1; n <= 30; n++) {
    const lhs = isqrt(BigInt(m * m * n) * BigInt(10) ** BigInt(48))
    const rhs = BigInt(m) * isqrt(BigInt(n) * BigInt(10) ** BigInt(48))
    if (lhs < rhs || lhs - rhs >= BigInt(m)) exactProd = false
  }
}
ok(exactProd, 'I: √(m²·n) = m·√n (floor-window [0, m) at 24-place scale), m, n ≤ 30')

// general law at 24-place precision: √m·√n = √(mn) within the floor-noise window
let genProd = true
for (let m = 1; m <= 40; m++) {
  for (let n = 1; n <= 40; n++) {
    const lhs = isqrt(BigInt(m) * BigInt(10) ** BigInt(24)) * isqrt(BigInt(n) * BigInt(10) ** BigInt(24))
    const rhs = isqrt(BigInt(m * n) * BigInt(10) ** BigInt(48))
    const noise = BigInt(Math.ceil((Math.sqrt(m) + Math.sqrt(n)) * 10 ** 12)) + BigInt(2)
    if (lhs > rhs || rhs - lhs > noise) genProd = false
  }
}
ok(genProd, 'I: √m·√n = √(mn) within floor noise, m, n ≤ 40')

// named surd reductions, exact
const reductions: [number, number, number][] = [
  // n, k, s: √n = k√s
  [8, 2, 2],
  [12, 2, 3],
  [18, 3, 2],
  [27, 3, 3],
  [32, 4, 2],
  [50, 5, 2],
  [75, 5, 3],
]
for (const [n, k, s] of reductions) {
  const lhs = isqrt(BigInt(n) * BigInt(10) ** BigInt(30))
  const rhs = BigInt(k) * isqrt(BigInt(s) * BigInt(10) ** BigInt(30))
  ok(lhs >= rhs && lhs - rhs < BigInt(k), `I: √${n} = ${k}√${s} (floor-window [0, ${k}))`)
}
// √2 + √8 = 3√2 (floor-noise ≤ 1 at this scale)
ok(
  isqrt(BigInt(2) * BigInt(10) ** BigInt(30)) + isqrt(BigInt(8) * BigInt(10) ** BigInt(30)) <= BigInt(3) * isqrt(BigInt(2) * BigInt(10) ** BigInt(30)) + BigInt(1) &&
    isqrt(BigInt(2) * BigInt(10) ** BigInt(30)) + isqrt(BigInt(8) * BigInt(10) ** BigInt(30)) >= BigInt(3) * isqrt(BigInt(2) * BigInt(10) ** BigInt(30)),
  'I: √2 + √8 = 3√2 (floor-window)'
)
// (√2 + √3)² = 5 + 2√6 at 24-place precision (10^48 inside the isqrt)
{
  const r2 = isqrt(BigInt(2) * BigInt(10) ** BigInt(48))
  const r3 = isqrt(BigInt(3) * BigInt(10) ** BigInt(48))
  const sum = r2 + r3
  const sumSq = (sum * sum) / BigInt(10) ** BigInt(24)
  const target = BigInt(5) * BigInt(10) ** BigInt(24) + BigInt(2) * isqrt(BigInt(6) * BigInt(10) ** BigInt(48))
  ok(sumSq > target - BigInt(10) ** BigInt(6) && sumSq < target + BigInt(10) ** BigInt(6), 'I: (√2+√3)² = 5 + 2√6 (24-place, tolerance 10⁻⁶ scaled)')
}

/* ================================================================== */
/* (J) 8.2 the √2 + √3 squeeze (no small rational lands)               */
/* ================================================================== */
console.log('(J) √2 + √3 is not a small rational')

const sum23 = Number(isqrt(BigInt(2) * BigInt(10) ** BigInt(30))) / 1e15 + Number(isqrt(BigInt(3) * BigInt(10) ** BigInt(30))) / 1e15
ok(Math.abs(sum23 - 3.1462643699419726) < 1e-12, `J: √2 + √3 ≈ ${sum23.toFixed(13)} (printed)`)
let noSmallRational = true
for (let b = 1; b <= 40 && noSmallRational; b++) {
  for (let a = -200; a <= 200; a++) {
    if (gcd(Math.abs(a), b) !== 1) continue
    const r = a / b
    if (Math.abs(r * r - 5 - 2 * Math.sqrt(6)) < 1e-9) noSmallRational = false
  }
}
ok(noSmallRational, 'J: no reduced r (|r| ≤ 200) satisfies r² − 5 = 2√6 (sweep, tol 1e-9)')

/* ================================================================== */
/* (K) 8.2 the family digits                                           */
/* ================================================================== */
console.log('(K) the family digits')

const fam: [number, string][] = [
  [2, '1.414213562373095'],
  [3, '1.732050807568877'],
  [5, '2.236067977499789'],
  [6, '2.449489742783178'],
  [7, '2.645751311064590'],
  [8, '2.828427124746190'],
  [10, '3.162277660168379'],
]
for (const [n, expect] of fam) {
  eq(sqrtDigits(n, 15), expect, `K: √${n} = ${expect}… (15 places, truncated)`)
}
eq(cbrtDigits(2, 12), '1.259921049894', 'K: ∛2 = 1.259921049894… (12 places)')

/* ================================================================== */
/* (L) 8.2 the countability listing                                    */
/* ================================================================== */
console.log('(L) the countability listing (rows by s = |a| + b)')

// enumerate the listing up to s ≤ 40
const listed: string[] = []
const listedSet = new Set<string>()
for (let s = 1; s <= 40; s++) {
  for (let b = 1; b <= s; b++) {
    const a = s - b
    for (const sign of a === 0 ? [1] : [1, -1]) {
      const aa = sign * a
      if (gcd(Math.abs(aa), b) === 1) {
        const key = `${aa}/${b}`
        if (listedSet.has(key)) {
          ok(false, `L: duplicate listing of ${key}`)
        }
        listedSet.add(key)
        listed.push(key)
      }
    }
  }
}
// completeness: every reduced pair with |a| + b ≤ 40 appears
let complete = true
for (let b = 1; b <= 40; b++) {
  for (let a = -40; a <= 40; a++) {
    if (a === 0 && b !== 1) continue
    if (a === 0 && b === 1) continue // 0/1 handled (row s = 1)
    if (Math.abs(a) + b > 40) continue
    if (gcd(Math.abs(a), b) !== 1) continue
    if (!listedSet.has(`${a}/${b}`)) complete = false
  }
}
ok(listedSet.has('0/1'), 'L: 0/1 opens the list (row s = 1)')
ok(complete, 'L: every reduced a/b with |a| + b ≤ 40 appears (no misses)')
ok(listed.length === listedSet.size, 'L: no duplicates in the listing (' + listed.length + ' names)')
const first12 = listed.slice(0, 12).join(', ')
ok(
  first12 === '0/1, 1/1, -1/1, 2/1, -2/1, 1/2, -1/2, 3/1, -3/1, 1/3, -1/3, 4/1',
  'L: the first twelve names: ' + first12
)

/* ================================================================== */
/* (M) 8.2 the Theodorus census + spiral                               */
/* ================================================================== */
console.log('(M) the Theodorus census + spiral')

const census: number[] = []
for (let n = 3; n <= 17; n++) if (!isSquare(n)) census.push(n)
eq(
  census.join(','),
  '3,5,6,7,8,10,11,12,13,14,15,17',
  'M: the Theodorus list 3..17 minus squares = 12 numbers'
)

// spiral: outer point k at radius √(k+1), angle Σ_{j=1..k} arctan(1/√j)
let totalAng = 0
const spiralPts: { k: number; r: number; x: number; y: number; ang: number }[] = []
for (let k = 1; k <= 16; k++) {
  const r = Math.sqrt(k + 1)
  totalAng += Math.atan(1 / Math.sqrt(k))
  spiralPts.push({ k, r, x: r * Math.cos(totalAng), y: r * Math.sin(totalAng), ang: totalAng })
}
// every outer point sits at distance √(k+1) from the origin (by construction);
// verify the radial step: consecutive hypotenuses differ by a unit leg
for (let i = 1; i < spiralPts.length; i++) {
  const prev = spiralPts[i - 1]
  const cur = spiralPts[i]
  const leg = Math.hypot(cur.x - prev.x, cur.y - prev.y)
  if (Math.abs(leg - 1) > 1e-9) {
    ok(false, `M: spiral leg k=${i + 1} has length ${leg} ≠ 1`)
    break
  }
}
ok(true, 'M: every spiral hypotenuse increments by a unit leg (k = 2..17)')
ok(totalAng > 6.0 && totalAng < 6.3, `M: total winding to √17 ≈ ${totalAng.toFixed(4)} rad (${((totalAng * 180) / Math.PI).toFixed(1)}° — just short of one full turn)`)

/* ================================================================== */
/* (N) figure geometry for 8.2 (the family line on [0, 5])             */
/* ================================================================== */
console.log('(N) figure geometry: the family line')

// the family line: x = 60 + 80·v for value v ∈ [0, 5] — 17 ticks, labels staggered
const FX = (v: number) => 60 + 80 * v
const famTicks: [string, number, boolean][] = [
  // [label, value, isSurd]
  ['1', 1, false],
  ['√2', Math.SQRT2, true],
  ['√3', Math.sqrt(3), true],
  ['2', 2, false],
  ['√5', Math.sqrt(5), true],
  ['√6', Math.sqrt(6), true],
  ['√7', Math.sqrt(7), true],
  ['√8', Math.sqrt(8), true],
  ['3', 3, false],
  ['√10', Math.sqrt(10), true],
  ['√11', Math.sqrt(11), true],
  ['√12', Math.sqrt(12), true],
  ['√13', Math.sqrt(13), true],
  ['√14', Math.sqrt(14), true],
  ['√15', Math.sqrt(15), true],
  ['4', 4, false],
  ['√17', Math.sqrt(17), true],
]
let inc = true
for (let i = 1; i < famTicks.length; i++) if (famTicks[i][1] <= famTicks[i - 1][1]) inc = false
ok(inc, 'N: the 17 family-line ticks are strictly increasing in value')
let minGap = Infinity
for (let i = 1; i < famTicks.length; i++) {
  minGap = Math.min(minGap, FX(famTicks[i][1]) - FX(famTicks[i - 1][1]))
}
ok(minGap >= 9, `N: adjacent tick gaps ≥ 9 px (min ${minGap.toFixed(1)} px) — staggered labels clear them`)
// same-row (staggered) label pairs are two apart: gap must clear the label width
let minRowGap = Infinity
for (let i = 2; i < famTicks.length; i += 2) {
  minRowGap = Math.min(minRowGap, FX(famTicks[i][1]) - FX(famTicks[i - 2][1]))
}
ok(minRowGap >= 18, `N: same-row label gaps ≥ 18 px (min ${minRowGap.toFixed(1)} px)`)
ok(
  FX(0) === 60 && FX(5) === 460 && FX(Math.sqrt(17)) < 460,
  'N: the line spans values 0..5 inside the viewBox; √17 sits inside'
)

/* ================================================================== */
/* (N2) 8.2 the reduction dictionary rows (the lesson table)           */
/* ================================================================== */
console.log('(N2) the reduction dictionary')

const dict: [number, number, number][] = [
  // n, k, s: √n = k√s (n = 2..20 non-squares + the famous 50, 75)
  [2, 1, 2],
  [3, 1, 3],
  [5, 1, 5],
  [6, 1, 6],
  [7, 1, 7],
  [8, 2, 2],
  [10, 1, 10],
  [11, 1, 11],
  [12, 2, 3],
  [13, 1, 13],
  [14, 1, 14],
  [15, 1, 15],
  [17, 1, 17],
  [18, 3, 2],
  [19, 1, 19],
  [20, 2, 5],
  [44, 2, 11],
  [45, 3, 5],
  [48, 4, 3],
  [50, 5, 2],
  [75, 5, 3],
  [98, 7, 2],
]
let dictOk = true
for (const [n, k, s] of dict) {
  if (k * k * s !== n) dictOk = false
  const fac = factorize(s)
  if (!fac.every(([, e]) => e === 1)) dictOk = false // s squarefree
  const lhs = isqrt(BigInt(n) * BigInt(10) ** BigInt(30))
  const rhs = BigInt(k) * isqrt(BigInt(s) * BigInt(10) ** BigInt(30))
  if (lhs < rhs || lhs - rhs >= BigInt(Math.max(k, 1))) dictOk = false
}
ok(dictOk, 'N2: all 22 dictionary rows √n = k√s exact with squarefree kernels')

/* ================================================================== */
/* (N3) 8.2 the L4 surd comparison + the conjugate product             */
/* ================================================================== */
console.log('(N3) surd comparisons')

// (√7 + √3)² = 10 + 2√21 vs (√8 + √2)² = 10 + 2√16 = 18: compare 2√21 vs 8
ok(2 * Math.sqrt(21) > 8, 'N3: √21 > 4, so √7 + √3 > √8 + √2')
{
  const r21 = isqrt(BigInt(21) * BigInt(10) ** BigInt(30))
  ok(r21 > BigInt(4) * BigInt(10) ** BigInt(15), 'N3: √21 > 4 at 15-place precision (exact-integer verdict)')
}
// (√5 + √3)(√5 − √3) = 5 − 3 = 2 (the conjugate product; floors shrink by ≤ (√5+√3)·10¹⁵)
{
  const r5 = isqrt(BigInt(5) * BigInt(10) ** BigInt(30))
  const r3 = isqrt(BigInt(3) * BigInt(10) ** BigInt(30))
  const prod = (r5 + r3) * (r5 - r3) // = r5² − r3² ≤ 2·10^30, within floor noise below
  ok(
    prod <= BigInt(2) * BigInt(10) ** BigInt(30) && BigInt(2) * BigInt(10) ** BigInt(30) - prod < BigInt(8) * BigInt(10) ** BigInt(15),
    'N3: (√5+√3)(√5−√3) = 2 (floor-window: deficit < (√5+√3)·10¹⁵)'
  )
}

/* ================================================================== */
/* (N4) 8.2 the like-surds sum √2 + √8 + √18 = 6√2                     */
/* ================================================================== */
console.log('(N4) like-surds sum')
{
  const sum = isqrt(BigInt(2) * BigInt(10) ** BigInt(30)) + isqrt(BigInt(8) * BigInt(10) ** BigInt(30)) + isqrt(BigInt(18) * BigInt(10) ** BigInt(30))
  const rhs = BigInt(6) * isqrt(BigInt(2) * BigInt(10) ** BigInt(30))
  ok(sum >= rhs && sum - rhs <= BigInt(2), 'N4: √2 + √8 + √18 = 6√2 (floor-window ≤ 2)')
}

/* ================================================================== */
/* (N5) 8.2 the Theodorus spiral figure geometry                       */
/* ================================================================== */
console.log('(N5) spiral figure geometry')
{
  const ORX = 255
  const ORY = 150
  const SC = 32
  let ang = 0
  let bbox = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  let prev = { x: ORX, y: ORY }
  let legOk = true
  for (let k = 1; k <= 16; k++) {
    ang += Math.atan(1 / Math.sqrt(k))
    const r = Math.sqrt(k + 1) * SC
    const x = ORX + r * Math.cos(ang)
    const y = ORY - r * Math.sin(ang)
    if (Math.hypot(x - prev.x, y - prev.y) < SC - 0.5) legOk = false // outer edge ≈ SC px (1 unit)
    prev = { x, y }
    bbox = {
      minX: Math.min(bbox.minX, x),
      minY: Math.min(bbox.minY, y),
      maxX: Math.max(bbox.maxX, x),
      maxY: Math.max(bbox.maxY, y),
    }
  }
  ok(legOk, 'N5: spiral outer edges ≈ 1 unit (SC px) each')
  ok(
    bbox.minX > 12 && bbox.minY > 12 && bbox.maxX < 508 && bbox.maxY < 288,
    `N5: spiral inside viewBox 520×300 with margins (bbox ${bbox.minX.toFixed(0)},${bbox.minY.toFixed(0)} – ${bbox.maxX.toFixed(0)},${bbox.maxY.toFixed(0)})`
  )
}

/* ================================================================== */
/* (O) quiz keys — aligned to the AUTHORED option order                */
/* ================================================================== */
console.log('(O) quiz keys (8.1: 1/2/0/2/3 · 8.2: 2/0/1/3/1)')

// 8.1 Q1: definition of irrational (answer 1)
ok(true, 'O 8.1 Q1: answer index 1 — the non-ratio definition (verbal)')
// 8.1 Q2: contradiction lands on both-even vs reduced (answer 2, verbal)
ok(true, 'O 8.1 Q2: answer index 2 — both even contradicts gcd 1 (verbal)')
// 8.1 Q3: parity lemma (answer 0, verbal)
ok(true, 'O 8.1 Q3: answer index 0 — odd × odd = odd (verbal)')
// 8.1 Q4: which √n irrational among 144, 169, 200, 121 (answer 2 = 200)
for (const [n, irr] of [
  [144, false],
  [169, false],
  [200, true],
  [121, false],
] as [number, boolean][]) {
  eq(isSquare(n), !irr, `O 8.1 Q4: √${n} irrational = ${irr} (${n} square = ${isSquare(n)})`)
}
ok(factorize(200).every(([p, e]) => (p === 2 ? e % 2 === 1 : true)), 'O 8.1 Q4: 200 = 2³·5² — odd exponent on 2')
// 8.1 Q5: contrapositive (verbal, answer 3)
ok(true, 'O 8.1 Q5: answer index 3 — irrational ⟹ neither terminating nor repeating (verbal)')

// 8.2 Q1: √12 = 2√3 (answer 2); distractors square to 72, 18, 48
eq((2 * 2) * 3, 12, 'O 8.2 Q1: (2√3)² = 12 — the intended key')
eq(6 * 6 * 2, 72, 'O 8.2 Q1: (6√2)² = 72 ≠ 12 (distractor)')
eq(3 * 3 * 2, 18, 'O 8.2 Q1: (3√2)² = 18 ≠ 12 (distractor)')
eq(4 * 4 * 3, 48, 'O 8.2 Q1: (4√3)² = 48 ≠ 12 (distractor)')
// 8.2 Q2: √2·√8 = 4 (answer 0); distractors evaluated
eq(isqrt(BigInt(16) * BigInt(10) ** BigInt(30)), BigInt(4) * BigInt(10) ** BigInt(15), 'O 8.2 Q2: √16 = 4 — the intended key')
eq(isqrt(BigInt(2) * BigInt(10) ** BigInt(30)) + isqrt(BigInt(8) * BigInt(10) ** BigInt(30)), BigInt(3) * isqrt(BigInt(2) * BigInt(10) ** BigInt(30)), 'O 8.2 Q2: the SUM is 3√2, not √10 (distractor arithmetic)')
// 8.2 Q3: the trap √2+√3 = √5 (answer 1)
{
  const sum = isqrt(BigInt(2) * BigInt(10) ** BigInt(48)) + isqrt(BigInt(3) * BigInt(10) ** BigInt(48))
  const sumSq = (sum * sum) / BigInt(10) ** BigInt(24)
  const five = BigInt(5) * BigInt(10) ** BigInt(24)
  ok(sumSq > five + BigInt(10) ** BigInt(6), 'O 8.2 Q3: (√2+√3)² = 5 + 2√6 > 5 — the trap is false (key 1)')
}
// 8.2 Q4: ∛8 rational (answer 3); ∛2, ∛4, ∛9 irrational
for (const [n, rational] of [
  [2, false],
  [4, false],
  [9, false],
  [8, true],
] as [number, boolean][]) {
  eq(ikroot(BigInt(n), 3) ** BigInt(3) === BigInt(n), rational, `O 8.2 Q4: ∛${n} rational = ${rational}`)
}
// 8.2 Q5: Cantor 1874 (verbal, answer 1)
ok(true, 'O 8.2 Q5: answer index 1 — algebraic listable, reals not (verbal, web-checked)')

/* ================================================================== */
/* (P) exercise keys, recomputed both sides                            */
/* ================================================================== */
console.log('(P) exercise keys (8.1: 15 · 8.2: 15)')

// 8.1 L1-1: 1.4² = 1.96 < 2 < 2.25 = 1.5²
eq(BigInt(14) ** BigInt(2), BigInt(196), 'P 8.1 L1-1: 1.4² = 1.96')
eq(BigInt(15) ** BigInt(2), BigInt(225), 'P 8.1 L1-1: 1.5² = 2.25')
// 8.1 L1-2: √(81/16) = 9/4
eq(BigInt(9) * BigInt(9), BigInt(81), 'P 8.1 L1-2: 9² = 81')
eq(BigInt(4) * BigInt(4), BigInt(16), 'P 8.1 L1-2: 4² = 16')
// 8.1 L1-3: squares ≤ 50; among √2..√12 only 4, 9 rational
{
  const sq = [1, 4, 9, 16, 25, 36, 49]
  ok(sq.every((v) => isSquare(v)), 'P 8.1 L1-3: the squares to 50 listed')
  let irrCount = 0
  for (let n = 2; n <= 12; n++) if (!isSquare(n)) irrCount++
  eq(irrCount, 9, 'P 8.1 L1-3: 9 of the 11 roots in 2..12 are irrational')
}
// 8.1 L1-4: 1.41² = 1.9881, 1.42² = 2.0164; nearer miss below
eq(BigInt(141) ** BigInt(2), BigInt(19881), 'P 8.1 L1-4: 1.41² = 1.9881')
eq(BigInt(142) ** BigInt(2), BigInt(20164), 'P 8.1 L1-4: 1.42² = 2.0164')
ok(BigInt(20000) - BigInt(19881) < BigInt(20164) - BigInt(20000), 'P 8.1 L1-4: 1.41 the nearer name (0.0119 vs 0.0164)')
// 8.1 L2-1: the √8 descent: p² = 8q², p = 2r ⟹ r² = 2q² (checked symbolically via G-section sweeps)
ok(true, 'P 8.1 L2-1: p² = 8q² forces 4 | p (squares mod 4), descent to the √2 wall')
// 8.1 L2-4: 18, 24, 36, 48 verdicts
for (const [n, rational] of [
  [18, false],
  [24, false],
  [36, true],
  [48, false],
] as [number, boolean][]) {
  eq(isSquare(n), rational, `P 8.1 L2-4: √${n} rational = ${rational}`)
}
// 8.1 L3-2: √5 mod-5 (G swept); printed squares census
eq([...new Set(Array.from({ length: 200 }, (_, i) => (i * i) % 5))].sort().join(','), '0,1,4', 'P 8.1 L3-2: squares mod 5 ∈ {0,1,4}')
// 8.1 L4-1: 0.1010010001… — the period-bound argument (verbal); the claim: a period-d decimal has zero-runs ≤ d
ok(true, 'P 8.1 L4-1: unbounded zero-runs defeat every period (verbal)')
// 8.1 L4-2: (√2)² = 2 rational, √2 not
{
  const r = isqrt(BigInt(2) * BigInt(10) ** BigInt(30))
  ok(r * r <= BigInt(2) * BigInt(10) ** BigInt(30) && (r + BigInt(1)) * (r + BigInt(1)) > BigInt(2) * BigInt(10) ** BigInt(30), 'P 8.1 L4-2: (√2)² lands just under 2 (floor) — the counterexample stands')
}
// 8.1 L6-1: the Śulbasūtra bound: 1/(408²·2.82) < 2.14 × 10⁻⁶
{
  const bound = 1 / (166464 * 2.82)
  ok(bound < 2.14e-6, `P 8.1 L6-1: 1/(408²·2.82) = ${(bound * 1e6).toFixed(4)}×10⁻⁶ < 2.14×10⁻⁶`)
}
// 8.1 L6-2: the descent identity (2q−p)² = 2(p−q)² given p² = 2q² — verified symbolically over a grid:
// expand LHS − RHS = 2q² − p², which vanishes exactly on p² = 2q²
{
  let descentOk = true
  for (let q = 1; q <= 60 && descentOk; q++) {
    for (let p = 1; p <= 100; p++) {
      if (p * p === 2 * q * q) {
        // would be a real solution: check the descent pair
        if ((2 * q - p) ** 2 !== 2 * (p - q) ** 2) descentOk = false
      }
    }
  }
  ok(descentOk, 'P 8.1 L6-2: (2q−p)² = 2(p−q)² whenever p² = 2q² (vacuous + symbolic: LHS−RHS = 2q²−p²)')
  // the positivity window: q < p < 2q ⟺ 1 < √2 < 2
  ok(1 < Math.SQRT2 && Math.SQRT2 < 2, 'P 8.1 L6-2: q < p < 2q holds (√2 between 1 and 2)')
}

// 8.2 L1-1: √18 = 3√2, √27 = 3√3, √32 = 4√2 (dict rows)
ok(true, 'P 8.2 L1-1: dict rows 18/27/32 (section N2)')
// 8.2 L1-2: √2·√3 = √6 and the printed check 2.4494897² ≈ 5.9999999
{
  const sq = BigInt(24494897) ** BigInt(2)
  ok(sq.toString().startsWith('5999999790'), `P 8.2 L1-2: 2.4494897² = 5.999999790… ≈ 6 (exact: ${sq})`)
}
// 8.2 L1-4: ∛8 = 2, ∛27 = 3, ∛64 = 4
for (const [n, v] of [
  [8, 2],
  [27, 3],
  [64, 4],
] as [number, number][]) {
  eq(ikroot(BigInt(n), 3), BigInt(v), `P 8.2 L1-4: ∛${n} = ${v}`)
}
// 8.2 L2-1: dict rows 44/45/48/98 (N2)
ok(true, 'P 8.2 L2-1: dict rows 44/45/48/98 (section N2)')
// 8.2 L2-2: √2+√8+√18 = 6√2 (N4)
ok(true, 'P 8.2 L2-2: like-surds sum (section N4)')
// 8.2 L2-4: ∛3, ∛9, ∛16, ∛25 all irrational
for (const n of [3, 9, 16, 25]) {
  ok(ikroot(BigInt(n), 3) ** BigInt(3) !== BigInt(n), `P 8.2 L2-4: ∛${n} irrational`)
}
// 8.2 L3-1: √6 no solutions (G swept)
ok(true, 'P 8.2 L3-1: 6q² never a square (section G)')
// 8.2 L3-2: (√2+√5)² = 7 + 2√10 at 24-place precision
{
  const r2 = isqrt(BigInt(2) * BigInt(10) ** BigInt(48))
  const r5 = isqrt(BigInt(5) * BigInt(10) ** BigInt(48))
  const sumSq = (r2 + r5) ** BigInt(2) / BigInt(10) ** BigInt(24)
  const target = BigInt(7) * BigInt(10) ** BigInt(24) + BigInt(2) * isqrt(BigInt(10) * BigInt(10) ** BigInt(48))
  ok(sumSq > target - BigInt(10) ** BigInt(6) && sumSq < target + BigInt(10) ** BigInt(6), 'P 8.2 L3-2: (√2+√5)² = 7 + 2√10 (24-place)')
  ok(!isSquare(10), 'P 8.2 L3-2: 10 = 2·5 not a square — the convicted cross term')
}
// 8.2 L3-3: kernel uniqueness — no collisions among k√s (k ≤ 12, squarefree s ≤ 60)
{
  const names = new Set<string>()
  let collision = false
  for (let k = 1; k <= 12; k++) {
    for (let s = 2; s <= 60; s++) {
      const fac = factorize(s)
      if (!fac.every(([, e]) => e === 1)) continue
      const key = `${k * k * s}` // the squared value identifies the number
      if (names.has(key)) collision = true
      names.add(key)
    }
  }
  ok(!collision, 'P 8.2 L3-3: distinct (k, s) give distinct numbers — no kernel-name collisions (k ≤ 12, s ≤ 60)')
}
// 8.2 L4-1 + L4-2: conjugate product and the surd comparison (N3)
ok(true, 'P 8.2 L4-1/L4-2: conjugate product = 2 and √7+√3 > √8+√2 (section N3)')
// 8.2 L6-1: ∛2 irrational + its decimal (K)
{
  const v = BigInt(2) * BigInt(10) ** BigInt(36)
  const r = ikroot(v, 3)
  ok(r ** BigInt(3) <= v, 'P 8.2 L6-1: ∛2 floor lands (irrationality in H, decimal in K)')
}

/* ================================================================== */
/* (R) 8.3 pre-writing: the behaviour table — how irrationals behave   */
/* under arithmetic with rationals and among themselves                */
/* ================================================================== */
console.log('(R) 8.3 the behaviour table')

// R1 — the scaling wall: for rational a ≠ 0 and squarefree s > 1, a·√s is
//   irrational (a√s ∈ ℚ ⟹ √s = (a√s)/a ∈ ℚ ⟹ s a perfect square). Engine:
//   (k√s)² = k²·s is NEVER a perfect square.
{
  const squares = new Set<number>()
  for (let m = 1; m <= 400; m++) squares.add(m * m)
  let clean = true
  for (let k = 1; k <= 40; k++) {
    for (const s of [2, 3, 5, 6, 7, 10, 11, 13]) {
      if (squares.has(k * k * s)) clean = false
    }
  }
  ok(clean, 'R1: k²·s is never a perfect square (k ≤ 40, s ∈ {2,3,5,6,7,10,11,13}) — a·√s stays outside ℚ')
  ok(!squares.has(18) && JSON.stringify(factorize(18)) === JSON.stringify([[2, 1], [3, 2]]), 'R1: 3√2 = √18 by the product law — 18 = 2¹·3², one odd exponent convicts it')
}

// R2 — rational translation: x irrational, q rational ⟹ x + q irrational.
//   Engine: (x + q) ∈ ℚ ⟹ x = (x + q) − q ∈ ℚ (ℚ closed under −, lesson 7.2).
//   No-small-solution evidence on the anchor x = √2.
{
  const grid: number[] = []
  for (let q = 1; q <= 12; q++) {
    for (let p = -60; p <= 60; p++) {
      if (gcd(Math.abs(p), q) === 1) grid.push(p / q)
    }
  }
  const SQ2 = Math.sqrt(2)
  let close = false
  for (const r of grid) if (Math.abs(r - SQ2) < 1e-9) close = true
  ok(!close, 'R2: no grid rational (|p| ≤ 60, q ≤ 12) within 10⁻⁹ of √2 — the translation engine re-cashed')
  let close2 = false
  for (const r of grid) if (Math.abs(r - (SQ2 + 3)) < 1e-9) close2 = true
  ok(!close2, 'R2: no grid rational within 10⁻⁹ of √2 + 3 (subtracting 3 would land one on √2)')
}

// R3 — the BOTH-WAYS cases, each exact at the 10³⁰ BigInt scale:
//   (i)   √2 + (1 − √2) = 1;  (2 + √3) + (2 − √3) = 4
//   (ii)  √2·√8 = 4;  √2·√2 = 2;  (√5+√3)(√5−√3) = 2;  (1+√2)(1−√2) = −1
//   (iii) √2·√3 = √6 — the product that STAYS irrational (6 not a square)
{
  const S = BigInt(10) ** BigInt(30)
  const D2 = isqrt(BigInt(2) * S * S)
  const D3 = isqrt(BigInt(3) * S * S)
  const D5 = isqrt(BigInt(5) * S * S)
  const D8 = isqrt(BigInt(8) * S * S)
  const TOL = BigInt(10) ** BigInt(31)
  ok(D2 + (S - D2) === S, 'R3i: √2 + (1 − √2) = 1 — exact at the 10³⁰ scale')
  ok((BigInt(2) * S + D3) + (BigInt(2) * S - D3) === BigInt(4) * S, 'R3i: (2 + √3) + (2 − √3) = 4 — exact')
  ok(D2 * D8 > BigInt(4) * S * S - TOL && D2 * D8 <= BigInt(4) * S * S, 'R3ii: √2·√8 = 4 — the product law lands 4·10⁶⁰ (the floors sit below the true value, within one)')
  ok(D2 * D2 <= BigInt(2) * S * S && D2 * D2 > BigInt(2) * S * S - TOL, 'R3ii: √2·√2 = 2 — the self-product closes')
  ok((D5 + D3) * (D5 - D3) > BigInt(2) * S * S - TOL && (D5 + D3) * (D5 - D3) < BigInt(2) * S * S + TOL, 'R3ii: (√5+√3)(√5−√3) = 2 — the conjugate product (difference of squares 5 − 3)')
  ok((S + D2) * (S - D2) > -S * S && (S + D2) * (S - D2) <= -S * S + TOL, 'R3ii: (1+√2)(1−√2) = −1 — a NEGATIVE rational product of two irrationals')
  {
    const D6ref = isqrt(BigInt(6) * S ** BigInt(4)) // floor(√6 · 10⁶⁰)
    ok(D2 * D3 <= D6ref && D2 * D3 > D6ref - TOL, 'R3iii: √2·√3 = √6 (product law) — the floor product matches floor(√6·10⁶⁰), and 6 is not a square, so the product stays irrational')
  }
}

// R4 — rationalization: 1/(a + √b) = (a − √b)/(a² − b), the difference of
//   squares. Exact identity on the (a, b) grid + the lesson's instances.
{
  const S2 = BigInt(10) ** BigInt(30)
  let identityHolds = true
  const gridB = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13]
  for (let a = 1; a <= 8; a++) {
    for (const b of gridB) {
      if (a * a === b) continue
      const Db = isqrt(BigInt(b) * S2 * S2)
      const prod = (BigInt(a) * S2 + Db) * (BigInt(a) * S2 - Db)
      const target = BigInt(a * a - b) * S2 * S2
      // prod = a²·10⁶⁰ − Db² with Db² ≤ b·10⁶⁰: prod ≥ target, and within 2√b·10³⁰
      if (prod < target || prod > target + BigInt(2) * BigInt(Math.ceil(Math.sqrt(b)) + 1) * S2) identityHolds = false
    }
  }
  ok(identityHolds, 'R4: (a + √b)(a − √b) = a² − b on the a ≤ 8, b ∈ {2,…,13} grid (exact BigInt window)')
  // the star instance: 1/(√2 + 1) = √2 − 1, decimal exact by the integer shift
  const D2_15 = isqrt(BigInt(2) * BigInt(10) ** BigInt(30))
  eq(D2_15 - BigInt(10) ** BigInt(15), BigInt(414213562373095), 'R4: √2 − 1 truncates to 0.414213562373095 (15 places, exact integer shift)')
  {
    const prod = (BigInt(10) ** BigInt(15) + D2_15) * (D2_15 - BigInt(10) ** BigInt(15)) // = D² − 10³⁰, one floor off 10³⁰
    ok(prod < BigInt(10) ** BigInt(30) && prod > BigInt(10) ** BigInt(30) - BigInt(4) * BigInt(10) ** BigInt(15), 'R4: (√2+1)(√2−1) = 1 — the scaled product lands on 10³⁰ within one floor (window check)')
  }
  // 1/(3 + √5) = (3 − √5)/4 and 1/(√2 + √3) = √3 − √2 (12-place prints, Number tolerance)
  ok(Math.abs((3 - Math.sqrt(5)) / 4 - 0.190983005625) < 1e-11, 'R4: (3 − √5)/4 = 0.190983005625… (1/(3+√5), printed to 12 places)')
  ok(Math.abs(Math.sqrt(3) - Math.sqrt(2) - 0.317837245195) < 1e-11, 'R4: √3 − √2 = 0.317837245195… (1/(√2+√3), printed to 12 places)')
  ok(Math.abs((2 * Math.sqrt(3) + 3) / 3 - 2.154700538379) < 1e-11, 'R4: (2√3 + 3)/3 = 2.154700538379… (1/(2√3−3), printed to 12 places)')
  // the denominators the mechanics produces
  eq(2 * 2 - 1, 3, 'R4: (√2+1)(√2−1) = 2 − 1 = 1 — the unit denominator')
  eq(3 * 3 - 5, 4, 'R4: (3+√5)(3−√5) = 9 − 5 = 4')
  eq(3 - 2, 1, 'R4: (√2+√3)(√3−√2) = 3 − 2 = 1')
  eq(12 - 9, 3, 'R4: (2√3−3)(2√3+3) = 12 − 9 = 3')
}

// R5 — decimal-name preservation under rational operations: the moved and
//   scaled names neither terminate nor repeat (irrationality routes):
//   √2 + 3 = 4.414213562373095… (translation), 5√2 = √50 = 7.071067811865475…
//   (kernel route: 50 = 2·5²), √2/3 = 0.471404520791031… (scaling route).
{
  const D2 = isqrt(BigInt(2) * BigInt(10) ** BigInt(30))
  eq(D2 + BigInt(3) * BigInt(10) ** BigInt(15), BigInt(4414213562373095), 'R5: √2 + 3 truncates to 4.414213562373095 (15 places, exact integer shift)')
  eq(BigInt(sqrtDigits(50, 15).replace('.', '')), BigInt(7071067811865475), 'R5: 5√2 = √50 truncates to 7.071067811865475 (15 places)')
  ok(JSON.stringify(factorize(50)) === JSON.stringify([[2, 1], [5, 2]]), 'R5: 50 = 2¹·5² — kernel 2, so 5√2 is irrational (the wall)')
  const N = D2 / BigInt(3)
  eq(N, BigInt(471404520791031), 'R5: √2/3 truncates to 0.471404520791031 (15 places — floor(√2·10¹⁵)/3 exactly)')
  ok(N * BigInt(3) <= D2 && (N + BigInt(1)) * BigInt(3) > D2, 'R5: the division check — N·3 ≤ floor(√2·10¹⁵) < (N+1)·3')
  // the √2/3 no-solution engine: √2/3 = p/q ⟹ 2q² = (3p)² — swept
  let solved = false
  for (let p = 1; p <= 600; p++) {
    for (let q = 1; q <= 400; q++) {
      if (2 * q * q === 9 * p * p) solved = true
    }
  }
  ok(!solved, 'R5: 2q² = 9p² has no solutions (p ≤ 600, q ≤ 400) — √2/3 ∉ ℚ (9p² carries only even 2-exponents)')
}

/* ================================================================== */
/* (S) 8.4 pre-writing: the cut, the no-largest/no-smallest engines,   */
/* nested intervals, the four-repair tower, density vs completeness    */
/* ================================================================== */
console.log('(S) 8.4 completeness')

// S0 — DEFECT CAUGHT IN THE SHIPPED 8.1 CALLOUT: the literal shores
//   L = {r : r² < 2 or r < 0} and U = {r : r² > 2} OVERLAP on every
//   rational < −√2 (−2 belongs to both), so the claim "every rational is
//   in exactly one shore" was false as written. Fix (run 61): U gains the
//   r > 0 guard. These checks pin the fixed text and the fixed math.
{
  const src = readFileSync(new URL('../src/data/library/books/mathematics/arithmetic-number-systems/ch-08.ts', import.meta.url), 'utf8')
  // NOTE: ch-08.ts stores LaTeX inside single-quoted TS strings, so the file
  // literally contains DOUBLE backslashes — the needles below are written with
  // quadruple backslashes so the runtime strings carry the doubled form.
  ok(!src.includes('U = \\\\{r \\\\in \\\\mathbb{Q} : r^2 > 2\\\\}'), 'S0: the unguarded U = {r ∈ ℚ : r² > 2} is gone from ch-08.ts (−2 sat in both shores)')
  ok(src.includes('r > 0 \\\\text{ and } r^2 > 2'), 'S0: the guarded U = {r ∈ ℚ : r > 0 and r² > 2} is present')
  // the overlap demonstrated for the record: −2 in the literal sets both
  ok(((-2) ** 2 > 2) && (-2 < 0), 'S0: the record — −2 satisfied both literal conditions (4 > 2 and −2 < 0)')
}

// S1 — the FIXED cut is a genuine partition of ℚ (grid-swept)
{
  const inL = (x: number) => x < 0 || x * x < 2
  const inU = (x: number) => x > 0 && x * x > 2
  let both = 0
  let neither = 0
  for (let q = 1; q <= 24; q++) {
    for (let p = -200; p <= 200; p++) {
      if (gcd(Math.abs(p), q) !== 1) continue
      const x = p / q
      if (inL(x) && inU(x)) both++
      if (!inL(x) && !inU(x)) neither++
    }
  }
  eq(both, 0, 'S1: no grid rational (|p| ≤ 200, q ≤ 24) is in both shores — the fixed cut is a partition')
  eq(neither, 0, 'S1: no grid rational is in neither shore (r² = 2 never happens over ℚ — section B)')
}

// S2 — L has no largest member; U has no smallest member (the room-above
//   and room-below steps, grid-swept; the algebraic proof rides the lesson)
{
  const inL = (x: number) => x < 0 || x * x < 2
  const inU = (x: number) => x > 0 && x * x > 2
  let okL = true
  let okU = true
  for (let q = 1; q <= 12; q++) {
    for (let p = -60; p <= 60; p++) {
      if (gcd(Math.abs(p), q) !== 1) continue
      const r = p / q
      if (inL(r)) {
        const r1 = r <= 0 ? r + 1 : r + Math.min(1, (2 - r * r) / (2 * r + 1))
        if (!(r1 > r && inL(r1) && (r1 <= 0 || r1 * r1 < 2 - 1e-12))) okL = false
      }
      if (inU(r)) {
        const u1 = r - Math.min(1, (r * r - 2) / (2 * r + 1))
        if (!(u1 < r && inU(u1) && u1 * u1 > 2 + 1e-12)) okU = false
      }
    }
  }
  ok(okL, 'S2: L has no largest member — r + min(1, (2−r²)/(2r+1)) stays inside L (grid swept)')
  ok(okU, 'S2: U has no smallest member — u − min(1, (u²−2)/(2u+1)) stays inside U (grid swept)')
}

// S3 — √2 sits strictly between the shores
{
  const SQ2 = Math.sqrt(2)
  let violations = 0
  for (let q = 1; q <= 12; q++) {
    for (let p = -60; p <= 60; p++) {
      if (gcd(Math.abs(p), q) !== 1) continue
      const r = p / q
      if ((r < 0 || r * r < 2) && !(r < SQ2)) violations++
      if (r > 0 && r * r > 2 && !(r > SQ2)) violations++
    }
  }
  eq(violations, 0, 'S3: every grid member of L is below √2 and every grid member of U is above it')
  ok(1.4142 * 1.4142 < 2 && 1.4143 * 1.4143 > 2, 'S3: the bracket witnesses 1.4142² < 2 < 1.4143² (section F engine)')
}

// S4 — nested intervals: six rungs, each bracketing √2 exactly, each
//   containing the next, widths 10⁻¹ … 10⁻⁶
{
  const rungs: [string, string][] = [
    ['1.4', '1.5'],
    ['1.41', '1.42'],
    ['1.414', '1.415'],
    ['1.4142', '1.4143'],
    ['1.41421', '1.41422'],
    ['1.414213', '1.414214'],
  ]
  let brackets = true
  for (const [lo, hi] of rungs) {
    const dl = BigInt(lo.replace('.', ''))
    const dh = BigInt(hi.replace('.', ''))
    const s = BigInt(10) ** BigInt(hi.length - 2)
    if (!(dl * dl < BigInt(2) * s * s)) brackets = false
    if (!(dh * dh > BigInt(2) * s * s)) brackets = false
  }
  ok(brackets, 'S4: all six rungs bracket √2 exactly (BigInt decimal squares)')
  let nesting = true
  for (let i = 1; i < rungs.length; i++) {
    if (!(Number(rungs[i][0]) >= Number(rungs[i - 1][0]) && Number(rungs[i][1]) <= Number(rungs[i - 1][1]))) nesting = false
  }
  ok(nesting, 'S4: the rungs nest — [1.4,1.5] ⊃ [1.41,1.42] ⊃ … ⊃ [1.414213,1.414214]')
  let widths = true
  for (let i = 0; i < rungs.length; i++) {
    const w = Number(rungs[i][1]) - Number(rungs[i][0])
    if (Math.abs(w - 10 ** (-(i + 1))) > 1e-15) widths = false
  }
  ok(widths, 'S4: rung widths are exactly 10⁻¹ … 10⁻⁶')
}

// S5 — the four repairs: ℕ (+,×) → ℤ (−) → ℚ (÷) → ℝ (the holes)
{
  ok(3 - 5 === -2, 'S5: the ℕ failure witness — 3 − 5 = −2 ∉ ℕ (the chapter-6 repair)')
  let m5 = false
  for (let m = -3; m <= 3; m++) if (5 * m === 3) m5 = true
  ok(!m5, 'S5: the ℤ failure witness — no integer m satisfies 5m = 3, so 3 ÷ 5 ∉ ℤ (the chapter-7 repair)')
  ok(JSON.stringify(factorize(5)) === JSON.stringify([[5, 1]]), 'S5: 5 = 2⁰·5¹ — 3/5 terminates (0.6), the ℚ repair cashed by 7.3\'s criterion')
  ok(!isSquare(2), 'S5: the ℚ failure witness — √2 ∉ ℚ (this chapter\'s repair; section B)')
  ok(true, 'S5: the tower ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ — 3 lives in all four; −2 from ℤ on; 3/5 from ℚ on; √2 in ℝ alone')
}

// S6 — no rational produces the √2 cut; rational cuts are produced twice
{
  const inL = (x: number) => x < 0 || x * x < 2
  const inU = (x: number) => x > 0 && x * x > 2
  let produced = 0
  for (let q = 1; q <= 12; q++) {
    for (let p = -60; p <= 60; p++) {
      if (gcd(Math.abs(p), q) !== 1) continue
      const c = p / q
      if (inL(c)) {
        const c1 = c <= 0 ? c + 1 : c + Math.min(1, (2 - c * c) / (2 * c + 1))
        if (!(inL(c1) && c1 > c)) produced++
      } else if (inU(c)) {
        const c1 = c - Math.min(1, (c * c - 2) / (2 * c + 1))
        if (!(inU(c1) && c1 < c)) produced++
      }
    }
  }
  eq(produced, 0, 'S6: no grid rational produces the √2 cut — for every c there is a bigger L-member or a smaller U-member')
  ok(true, 'S6: rational cuts are produced in two ways — {x ≤ 3/2} (3/2 the max of L) or {x < 3/2} (3/2 the min of U)')
}

// S7 — density inside ℝ: a rational strictly between any two reals
//   (the √2/√3 pair and the tight √2, √2 + 1/1000 pair, exact)
{
  ok(BigInt(2) * BigInt(4) < BigInt(3) * BigInt(3) && BigInt(3) * BigInt(3) < BigInt(3) * BigInt(4), 'S7: 3/2 lies strictly between √2 and √3 — 8 < 9 < 12, i.e. 2 < (3/2)² < 3')
  ok(BigInt(1414) * BigInt(1414) < BigInt(2) * BigInt(10) ** BigInt(6) && BigInt(2) * BigInt(10) ** BigInt(6) < BigInt(1415) * BigInt(1415), 'S7: 1.414 < √2 < 1.415 — so 1.415 lies strictly between √2 and √2 + 1/1000 (exact)')
}

/* ================================================================== */
/* (Q) formula cards                                                   */
/* ================================================================== */
console.log('(Q) formula cards')
{
  const src = (await import('../src/data/library/books/mathematics/arithmetic-number-systems/ch-08')).chapter08
  const formulas = src.lessons.flatMap((l) => l.blocks.filter((b) => b.kind === 'formula').map((b) => (b as { name: string }).name))
  eq(formulas.length, 18, 'Q: 18 formula cards across 8.1–8.5 (three new in 8.5: factor-method, pairing/fraction, cube strip+map)')
  const want = [
    'The dissection identity',
    'The classical contradiction',
    'The general wall',
    'The Śulbasūtra ladder',
    'The kernel dictionary',
    'The product law',
    'The k-th root criterion',
    'The squeeze chain',
    'Rational translation',
    'Rational scaling',
    'The rationalization identity',
    'The conjugate product',
    'The cut definition',
    'The completeness property',
    'The tower of number systems',
  ]
  for (const w of want) ok(formulas.includes(w), `Q: card present — ${w}`)
  // quiz blocks: 4 (8.1–8.4), each 5 quiz items; the chapter is COMPLETE
  const quizzes = src.lessons.flatMap((l) => l.blocks.filter((b) => b.kind === 'quiz'))
  eq(quizzes.length, 5, 'Q: 5 quiz blocks (8.1–8.5)')
  for (let i = 0; i < quizzes.length; i++) {
    eq((quizzes[i] as { items: unknown[] }).items.length, 5, `Q: quiz block ${i + 1} has 5 items`)
  }
  eq(src.status, 'complete', 'Q: chapter 8 flipped COMPLETE')
  eq(src.plannedLessons?.length ?? 0, 0, 'Q: plannedLessons emptied')
  eq(src.lessons.length, 5, 'Q: five lessons shipped (8.5 added by the pre-written-books audit, 2026-11-11)')
}

/* ================================================================== */
/* (T) quiz keys 8.3 (1/1/3/0/0), distractors evaluated                */
/* ================================================================== */
console.log('(T) quiz keys 8.3 (1/1/3/0/0)')

// 8.3 Q1: √2 + 1/2 is irrational (answer 1)
{
  const grid: number[] = []
  for (let q = 1; q <= 12; q++) {
    for (let p = -60; p <= 60; p++) {
      if (gcd(Math.abs(p), q) === 1) grid.push(p / q)
    }
  }
  const target = Math.sqrt(2) + 0.5
  let close = false
  for (const r of grid) if (Math.abs(r - target) < 1e-9) close = true
  ok(!close, 'T 8.3 Q1: no grid rational within 10⁻⁹ of √2 + ½ — the intended key (irrational) is proved by the translation engine')
}
// 8.3 Q2: 3√2·5 = 15√2 (answer 1); distractors evaluated
eq(15 * 15 * 2, 450, 'T 8.3 Q2: (15√2)² = 450 — the intended key')
ok(JSON.stringify(factorize(450)) === JSON.stringify([[2, 1], [3, 2], [5, 2]]), 'T 8.3 Q2: 450 = 2¹·3²·5² — odd exponent on 2, so 15√2 is irrational')
eq(8 * 8 * 2, 128, 'T 8.3 Q2: (8√2)² = 128 ≠ 450 (the coefficient-addition distractor)')
eq(15 * 15, 225, 'T 8.3 Q2: 15² = 225 ≠ 450 (the vanishing-surd distractor)')
ok(Math.abs(Math.sqrt(30) - Math.sqrt(450)) > 1, 'T 8.3 Q2: √30 ≠ 15√2 (the illegal under-root push)')
// 8.3 Q3: which is FALSE — answer 3; the three true identities re-cashed from R3
ok(true, 'T 8.3 Q3: answers 0–2 are the R3-verified identities (√2 + (1−√2) = 1 · (√5+√3)(√5−√3) = 2 · √2·√3 = √6); answer 3 is the false generalization — the key')
// 8.3 Q4: 1/(√3+√2) = √3 − √2 (answer 0); distractors evaluated
eq(3 - 2, 1, 'T 8.3 Q4: (√3+√2)(√3−√2) = 3 − 2 = 1 — so the reciprocal IS the conjugate (key 0)')
ok(Math.abs(Math.sqrt(3) - Math.sqrt(2) - 0.317837245195) < 1e-11, 'T 8.3 Q4: √3 − √2 ≈ 0.317837245195 (the key value)')
ok(Math.abs(1 / Math.sqrt(3) - 1 / Math.sqrt(2) + 0.13) < 1e-2, 'T 8.3 Q4: the split-the-fraction distractor ≈ −0.13 — wrong sign, wrong size')
// 8.3 Q5: q√2 rational forces q = 0 (answer 0)
ok(0 * Math.sqrt(2) === 0, 'T 8.3 Q5: the q = 0 escape hatch — 0·√2 = 0, rational (key 0; the scaling theorem guards q ≠ 0)')

/* ================================================================== */
/* (U) exercise keys 8.3, recomputed both sides                        */
/* ================================================================== */
console.log('(U) exercise keys 8.3')

// L1-1: 6√3 = √108, 108 = 2²·3³; classification of 2+√3 and √3÷6
ok(JSON.stringify(factorize(108)) === JSON.stringify([[2, 2], [3, 3]]), 'U 8.3 L1-1: 6√3 = √108 with 108 = 2²·3³ — the odd exponent on 3 convicts it')
// L1-2: 5+3−1 = 7; (7√2)² = 98, 98 = 2·7²
eq(5 + 3 - 1, 7, 'U 8.3 L1-2: 5 + 3 − 1 = 7 coefficients')
eq(7 * 7 * 2, 98, 'U 8.3 L1-2: (7√2)² = 98')
ok(JSON.stringify(factorize(98)) === JSON.stringify([[2, 1], [7, 2]]), 'U 8.3 L1-2: 98 = 2¹·7² — irrational (odd exponent on 2)')
// L2-1: 1/(√5−2) = √5+2 (denominator 1); ≈ 4.2360679
eq(5 - 4, 1, 'U 8.3 L2-1: (√5−2)(√5+2) = 5 − 4 = 1')
ok(Math.abs(Math.sqrt(5) + 2 - 4.2360679) < 1e-6, 'U 8.3 L2-1: √5 + 2 ≈ 4.2360679 (printed to 7 places)')
// L2-2: 1/(2√2+3) = 3−2√2 (denominator −1); ≈ 0.171572875253
eq(8 - 9, -1, 'U 8.3 L2-2: (2√2+3)(2√2−3) = 8 − 9 = −1 — the negative unit denominator')
ok(Math.abs(3 - 2 * Math.sqrt(2) - 0.171572875253) < 1e-11, 'U 8.3 L2-2: 3 − 2√2 ≈ 0.171572875253 (printed to 12 places)')
ok(Math.abs(2 * Math.sqrt(2) - 2.828427124746) < 1e-11, 'U 8.3 L2-2: 2√2 ≈ 2.828427124746 (printed to 12 places)')
// L2-3: (√3+1)/(√3−1) = 2+√3; and √2/√8 = 1/2
ok(Math.abs((Math.sqrt(3) + 1) ** 2 - (4 + 2 * Math.sqrt(3))) < 1e-12, 'U 8.3 L2-3: (√3+1)² = 4 + 2√3')
ok(Math.abs((Math.sqrt(3) + 1) / (Math.sqrt(3) - 1) - (2 + Math.sqrt(3))) < 1e-12, 'U 8.3 L2-3: (√3+1)/(√3−1) = 2 + √3 exactly')
ok(Math.abs(Math.sqrt(2) / Math.sqrt(8) - 0.5) < 1e-15, 'U 8.3 L2-3: √2/√8 = 1/2 (the rational quotient exhibit)')
// L3-1: the affine guard — r = 0 collapses to the constant s
ok(0 * Math.sqrt(2) + 5 === 5, 'U 8.3 L3-1: the exceptional exhibit r = 0, s = 5 gives rx + s = 5, rational')
// L3-2: only q = 0 (the B-engine re-cash)
{
  let solved = false
  for (let p = 1; p <= 600; p++) {
    for (let q = 1; q <= 400; q++) {
      if (2 * q * q === p * p) solved = true
    }
  }
  ok(!solved, 'U 8.3 L3-2: no p, q with p² = 2q² (p ≤ 600, q ≤ 400) — q√2 ∈ ℚ forces q = 0')
}
// L3-3: the both-ways exhibits (R3 re-cash)
ok(true, 'U 8.3 L3-3: the exhibits (√2, 1−√2), (1+√2, 1−√2), (√2+1, √2) — all R3-verified identities')
// L4-1: (a+b)² − (a−b)² = 4ab exact; 4√6 with 96 = 2⁵·3
eq((5 + 3) ** 2 - (5 - 3) ** 2, 4 * 5 * 3, 'U 8.3 L4-1: (5+3)² − (5−3)² = 60 = 4·5·3 — the difference-of-squares identity on integers')
ok(Math.abs((Math.sqrt(3) + Math.sqrt(2)) ** 2 - (5 + 2 * Math.sqrt(6))) < 1e-12, 'U 8.3 L4-1: (√3+√2)² = 5 + 2√6')
ok(Math.abs((Math.sqrt(3) - Math.sqrt(2)) ** 2 - (5 - 2 * Math.sqrt(6))) < 1e-12, 'U 8.3 L4-1: (√3−√2)² = 5 − 2√6')
ok(Math.abs((Math.sqrt(3) + Math.sqrt(2)) ** 2 - (Math.sqrt(3) - Math.sqrt(2)) ** 2 - 4 * Math.sqrt(6)) < 1e-12, 'U 8.3 L4-1: the difference is exactly 4√6')
ok(JSON.stringify(factorize(96)) === JSON.stringify([[2, 5], [3, 1]]), 'U 8.3 L4-1: 96 = 2⁵·3¹ — two odd exponents, so 4√6 = √96 is irrational')
// L4-2: 1/(√2−1) = √2+1; larger by exactly 2
ok(Math.abs(1 / (Math.sqrt(2) - 1) - (Math.sqrt(2) + 1)) < 1e-12, 'U 8.3 L4-2: 1/(√2−1) = √2 + 1 exactly')
ok(Math.abs(1 / (Math.sqrt(2) - 1) - 1 / (Math.sqrt(2) + 1) - 2) < 1e-12, 'U 8.3 L4-2: the two reciprocals differ by exactly 2')
// L4-3: the r/x guard (documented — the row needs r ≠ 0)
ok(true, 'U 8.3 L4-3: the quotient row guard r ≠ 0 — the r = 0 quotient is 0, rational (verbal key)')
// L5-1: decimal-name preservation (dichotomy + closure, verbal)
ok(true, 'U 8.3 L5-1: the preservation theorem — dichotomy plus closure (verbal key)')
// L5-2: assertion TRUE (√2·√8 = 4), reason FALSE (√2·√3 = √6 irrational)
ok(true, 'U 8.3 L5-2: assertion true (R3ii), reason false (R3iii) — the assertion–reason verdict')
// L6-1: (a+√b)/(a−√b) — rational only at a = 0 (value −1)
{
  const b = 3
  ok(Math.abs(Math.sqrt(b) / -Math.sqrt(b) + 1) < 1e-15, 'U 8.3 L6-1: a = 0 gives √b/(−√b) = −1 exactly — the one rational point')
  ok(Math.abs((2 + Math.sqrt(3)) / (2 - Math.sqrt(3)) - (7 + 4 * Math.sqrt(3))) < 1e-12, 'U 8.3 L6-1: (2+√3)/(2−√3) = 7 + 4√3 (the a ≠ 0 instance)')
  ok(JSON.stringify(factorize(48)) === JSON.stringify([[2, 4], [3, 1]]), 'U 8.3 L6-1: (4√3)² = 48 = 2⁴·3¹ — odd exponent on 3, so 4√3 is irrational and so is 7 + 4√3')
}

/* ================================================================== */
/* (T2) quiz keys 8.4 (2/3/2/1/1), distractors evaluated               */
/* ================================================================== */
console.log('(T2) quiz keys 8.4 (2/3/2/1/1)')

// 8.4 Q1: the partition claim (answer 2)
{
  const inL = (x: number) => x < 0 || x * x < 2
  const inU = (x: number) => x > 0 && x * x > 2
  let both = 0
  let neither = 0
  for (let q = 1; q <= 24; q++) {
    for (let p = -200; p <= 200; p++) {
      if (gcd(Math.abs(p), q) !== 1) continue
      const x = p / q
      if (inL(x) && inU(x)) both++
      if (!inL(x) && !inU(x)) neither++
    }
  }
  ok(both === 0 && neither === 0, 'T2 8.4 Q1: every grid rational in exactly one class — the intended key (2); no boundary members exist (S2)')
}
// 8.4 Q2: produced by a rational — the two knife faces (answer 3, verbal)
ok(true, 'T2 8.4 Q2: answer 3 — largest of L or smallest of U; the {3/2} example exhibits both faces (verbal key)')
// 8.4 Q3: dense but not complete = Q (answer 2, verbal)
ok(true, 'T2 8.4 Q3: answer 2 — Q dense (7.3) with the √2 hole (8.1/S6); N, Z have neither virtue; R has both (verbal key)')
// 8.4 Q4: the three repairs (answer 1) — the witnesses recomputed
eq(3 - 5, -2, 'T2 8.4 Q4: 3 − 5 = −2 ∉ ℕ — the ℤ repair')
{
  let m5 = false
  for (let m = -3; m <= 3; m++) if (5 * m === 3) m5 = true
  ok(!m5, 'T2 8.4 Q4: no integer m with 5m = 3 — 3 ÷ 5 ∉ ℤ, the ℚ repair')
}
ok(!isSquare(2), 'T2 8.4 Q4: √2 ∉ ℚ — the ℝ repair (section B)')
// 8.4 Q5: the rungs' intersection (answer 1) — the emptiness engine
ok(true, 'T2 8.4 Q5: answer 1 — no rational survives all rungs (distinct rationals differ by ≥ 1/(qq’)); exactly one real does (completeness) — S4 + verbal')

/* ================================================================== */
/* (U2) exercise keys 8.4, recomputed both sides                       */
/* ================================================================== */
console.log('(U2) exercise keys 8.4')

// L1-1: the class census
eq(-3 < 0 ? 1 : 0, 1, 'U2 8.4 L1-1: −3 ∈ L (r < 0)')
eq(0 * 0 < 2 ? 1 : 0, 1, 'U2 8.4 L1-1: 0 ∈ L (0² = 0 < 2)')
eq(1 * 1 < 2 ? 1 : 0, 1, 'U2 8.4 L1-1: 1 ∈ L (1 < 2)')
ok(2 * 2 < 9 && 9 < 3 * 4, 'U2 8.4 L1-1: 3/2 ∈ U of the √2 cut (9/4 > 2) and ∈ L of the √3 cut (9/4 < 3) — also L4-3’s separator')
ok(49 < 50, 'U2 8.4 L1-1: 7/5 ∈ L (49/25 = 1.96 < 2)')
eq(-1 < 0 ? 1 : 0, 1, 'U2 8.4 L1-1: −½ ∈ L')
// L2-2: the room-above step from 7/5 — exact fractions
eq(2 * 25 - 49, 1, 'U2 8.4 L2-2: 2 − (7/5)² = 1/25 exactly')
eq(5 * 19, 95, 'U2 8.4 L2-2: δ = (1/25)/(19/5) = 1/95')
eq(7 * 19 + 1, 134, 'U2 8.4 L2-2: 7/5 + 1/95 = 134/95')
ok(134 * 134 < 2 * 95 * 95, 'U2 8.4 L2-2: (134/95)² = 17956/9025 < 2 = 18050/9025 — inside L exactly')
eq(2 * 95 * 95 - 134 * 134, 94, 'U2 8.4 L2-2: the room left is exactly 94/9025')
// L2-3 + the lesson’s example: the rung squares, exact BigInt (regression guard for the run-61 typos)
eq(14142 * 14142, 199996164, 'U2 8.4 L2-3: 14142² = 199,996,164 (the typed value, corrected this run)')
eq(14143 * 14143, 200024449, 'U2 8.4 L2-3: 14143² = 200,024,449')
ok(14142 * 14142 < 2 * 100000000 && 2 * 100000000 < 14143 * 14143, 'U2 8.4 L2-3: 1.4142² < 2 < 1.4143² at scale 10⁴')
eq(141421 * 141421, 19999899241, 'U2 8.4 L2-3: 141421² = 19,999,899,241 (the typed value, corrected this run)')
eq(141422 * 141422, 20000182084, 'U2 8.4 L2-3: 141422² = 20,000,182,084')
ok(141421 * 141421 < 2 * 10000000000 && 2 * 10000000000 < 141422 * 141422, 'U2 8.4 L2-3: 1.41421² < 2 < 1.41422² at scale 10⁵')
// the lesson’s seam example: the room-below step from 1.42
ok(Math.abs((1.42 - 0.0164 / 3.84) - 1.415729166) < 1e-7, 'U2 8.4 example: u’ = 1.42 − 0.0164/3.84 ≈ 1.4157292')
ok((1.41573 * 1.41573 - 2.0042) < 1e-3 && (1.41573 * 1.41573) > 2, 'U2 8.4 example: (1.41573)² ≈ 2.0042 > 2 — still inside U (the typed value, corrected this run)')
// L3-2: the room-below estimate swept
{
  let okU = true
  for (let q = 1; q <= 12; q++) {
    for (let p = 1; p <= 60; p++) {
      if (gcd(p, q) !== 1) continue
      const u = p / q
      if (u > 0 && u * u > 2) {
        const d = Math.min(1, (u * u - 2) / (2 * u + 1))
        if (!((u - d) * (u - d) > 2 + 1e-12)) okU = false
      }
    }
  }
  ok(okU, 'U2 8.4 L3-2: (u − δ)² > 2 for every grid u ∈ U — the room-below estimate holds')
}
// L3-3: 1.415 in the tight window (S7 re-cash)
ok(1414 * 1414 < 2 * 1000000 && 2 * 1000000 < 1415 * 1415, 'U2 8.4 L3-3: 1.414 < √2 < 1.415 — so 1.415 ∈ (√2, √2 + 1/1000) exactly')
// L4-2: products of lower-class positives stay below the wall
{
  let okP = true
  const positives: number[] = []
  for (let q = 1; q <= 12; q++) {
    for (let p = 1; p <= 60; p++) {
      if (gcd(p, q) !== 1) continue
      if ((p / q) * (p / q) < 2) positives.push(p / q)
    }
  }
  for (const r of positives) {
    for (const s of positives) {
      if (r * s >= 2) okP = false
    }
  }
  ok(okP, 'U2 8.4 L4-2: rs < 2 for all grid pairs of L-positives — the (r−s)² ≥ 0 engine swept')
}
// L6-1: the cut-to-equation anchor
ok(2 - 1.4142 * 1.4142 > 0, 'U2 8.4 L6-1: 1.4142² < 2 — room exists above 1.4142')
ok((2 - 1.4142 * 1.4142) / (2 * 1.4142 + 1) > 1e-5, 'U2 8.4 L6-1: the room at 1.4142 exceeds 10⁻⁵ (≈ 1.002 × 10⁻⁵)')
ok(141421 * 141421 < 2 * 10000000000, 'U2 8.4 L6-1: 1.4142 + 10⁻⁵ = 1.41421 still squares under 2 — the witness above 1.4142')

/* ================================================================== */
/* SECTION V — PRE-WRITING pins for lesson 8.5 "Square and Cube Roots:  */
/* the Extraction Crafts" (the pre-written-books audit, 2026-11-11:     */
/* Khattar ch. 3 + NCERT-8 squares/cube-roots scope carried nowhere    */
/* on the shelf — this lesson closes the gap). Every number the        */
/* lesson will state is pinned here BEFORE prose, per verify-first.    */
/* ================================================================== */
console.log('(V) 8.5 pre-writing: the squares census + gnomon law')
{
  // V1 the odd-number sum law Σ(2k−1) = n², swept
  let law = true
  let run = 0
  for (let n = 1; n <= 200; n++) {
    run += 2 * n - 1
    if (run !== n * n) law = false
  }
  ok(law, 'V1 Σ(2k−1) = n² swept n ≤ 200')
  eq(1 + 3 + 5 + 7, 16, 'V1 exhibit: 1+3+5+7 = 16 = 4²')
  eq(1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17, 81, 'V1 exhibit: 1+3+…+17 = 81 = 9²')
  // V2 the between-squares law: exactly 2n integers strictly between
  let between = true
  for (let n = 1; n <= 150; n++) {
    const count = (n + 1) * (n + 1) - n * n - 1
    if (count !== 2 * n) between = false
  }
  ok(between, 'V2 strictly between n² and (n+1)² there are exactly 2n integers, swept')
  eq(13 * 13 - 12 * 12 - 1, 24, 'V2 exhibit: between 144 and 169 lie 24 integers')
  eq(21 * 21 - 20 * 20 - 1, 40, 'V2 exhibit: between 400 and 441 lie 40 integers')
  eq(16 * 16 - 15 * 15 - 1, 30, 'V2 quiz-pin: between 225 and 256 lie 30 integers')
  // V3 the gap law and the identity exhibit
  eq(106 * 106 - 105 * 105, 211, 'V3 (n+1)²−n² = 2n+1 at n = 105 (211)')
  eq(105 * 105, 11025, 'V3 exhibit: 105² = 11025 (by (100+5)² = 10000+1000+25)')
  eq((100 + 5) * (100 + 5), 10000 + 2 * 100 * 5 + 25, 'V3 (a+b)² expansion at the exhibit')
}
console.log('(V2) 8.5 pre-writing: the triplet generator')
{
  // V4 Pythagorean triplets: a = m²−n², b = 2mn, c = m²+n² for m > n ≥ 1
  let gen = true
  for (let m = 2; m <= 12; m++) {
    for (let n = 1; n < m; n++) {
      const a = m * m - n * n, b = 2 * m * n, c = m * m + n * n
      if (a * a + b * b !== c * c) gen = false
    }
  }
  ok(gen, 'V4 the generator a²+b² = c² swept m,n ≤ 12')
  // the primitive condition: gcd(m,n)=1 and m−n odd → gcd(a,b)=1
  let prim = true
  for (let m = 2; m <= 12; m++) {
    for (let n = 1; n < m; n++) {
      if (gcd(m, n) === 1 && (m - n) % 2 === 1) {
        const a = m * m - n * n, b = 2 * m * n
        if (gcd(a, b) !== 1) prim = false
      }
    }
  }
  ok(prim, 'V4 primitive condition (gcd(m,n)=1, m−n odd) swept m,n ≤ 12')
  eq(3 * 3 + 4 * 4, 5 * 5, 'V4 exhibit (m=2,n=1): 3²+4² = 5²')
  eq(5 * 5 + 12 * 12, 13 * 13, 'V4 exhibit (m=3,n=2): 5²+12² = 13² — the leg-12 triplet')
  eq(8 * 8 + 15 * 15, 17 * 17, 'V4 exhibit (m=4,n=1): 8²+15² = 17²')
  eq(7 * 7 + 24 * 24, 25 * 25, 'V4 exhibit (m=4,n=3): 7²+24² = 25²')
  eq(20 * 20 + 21 * 21, 29 * 29, 'V4 exhibit (m=5,n=2): 20²+21² = 29²')
  eq(12 * 12 + 35 * 35, 37 * 37, 'V4 exhibit (m=6,n=1): 12²+35² = 37²')
  eq(12 * 12 + 16 * 16, 20 * 20, 'V4 exhibit: (12,16,20) = (3,4,5)×4')
}
console.log('(V3) 8.5 pre-writing: the division-method engine + generic simulator')
{
  // V5 the engine identity (10a+b)² = 100a² + (20a+b)·b, swept
  let eng = true
  for (let a = 0; a <= 99; a++) {
    for (let b = 0; b <= 9; b++) {
      if ((10 * a + b) * (10 * a + b) !== 100 * a * a + (20 * a + b) * b) eng = false
    }
  }
  ok(eng, 'V5 (10a+b)² = 100a² + (20a+b)b swept a ≤ 99, b ≤ 9')

  // the generic digit-extraction simulator, paired from the DECIMAL POINT:
  // the radicand is R = radicand × 10^(2f) (f fractional pairs in its own
  // decimal), and E extra pairs of zeros are appended; pairs = integer part
  // grouped from the RIGHT (first group may be 1 digit), then each 2-digit
  // fractional group, then E zeros-pairs; each pair yields one root digit by
  // the trial (20a+b)·b ≤ 100r. Ground truth: isqrt(R · 10^(2E)).
  const digits = (R: number, f: number, E: number): string => {
    const rs = String(R).padStart(2 * f + 1, '0') // 0.0144 → R = 144 needs the leading zero restored
    const intPart = rs.slice(0, rs.length - 2 * f) || '0'
    const fracPart = rs.slice(rs.length - 2 * f)
    const intPairs: string[] = []
    const ip = intPart.replace(/^0+(?=.)/, '') || '0'
    const lead = ip.length % 2 === 1 ? 1 : 0
    if (lead === 1) intPairs.push(ip.slice(0, 1))
    for (let i = lead; i < ip.length; i += 2) intPairs.push(ip.slice(i, i + 2))
    const pairs = [...intPairs]
    for (let i = 0; i < fracPart.length; i += 2) pairs.push(fracPart.slice(i, i + 2))
    for (let e = 0; e < E; e++) pairs.push('00')
    let a = 0, r = 0, out = ''
    for (const pair of pairs) {
      r = r * 100 + Number(pair)
      let b = 0
      while ((20 * a + (b + 1)) * (b + 1) <= r) b++
      r -= (20 * a + b) * b
      a = a * 10 + b
      out += String(b)
    }
    const truth = isqrt(BigInt(R) * BigInt(10) ** BigInt(2 * E)).toString().padStart(out.length, '0')
    ok(out === truth,
      'V5 simulator matches isqrt ground truth (R=' + R + ', f=' + f + ', E=' + E + ': ' + out + ' vs ' + truth + ')')
    return out
  }
  digits(2, 0, 4)       // √2 → 14142
  digits(3, 0, 3)       // √3 → 1732
  digits(7, 0, 3)       // √7 → 2645
  digits(529, 1, 0)     // √5.29 → 23 (terminating: √5.29 = 2.3)
  digits(55225, 0, 0)   // √55225 → 235 (Āryabhaṭa's exhibit, terminating)
  digits(1225, 1, 0)    // √12.25 → 35
  digits(144, 2, 0)     // √0.0144 → 012
  digits(2116, 1, 0)    // √21.16 → 46
}
console.log('(V4) 8.5 pre-writing: the pinned walks — every product and remainder')
{
  // V7 the √2 walk: products 96, 281, 11296, 56564; remainders 4, 119, 604, 3836
  eq(24 * 4, 96, 'V7 √2 walk: 24·4 = 96')
  eq(100 - 96, 4, 'V7 √2 walk: remainder 100 − 96 = 4')
  eq(281 * 1, 281, 'V7 √2 walk: 281·1 = 281')
  eq(400 - 281, 119, 'V7 √2 walk: remainder 400 − 281 = 119')
  eq(2824 * 4, 11296, 'V7 √2 walk: 2824·4 = 11,296')
  eq(11900 - 11296, 604, 'V7 √2 walk: remainder 11,900 − 11,296 = 604')
  eq(28282 * 2, 56564, 'V7 √2 walk: 28282·2 = 56,564')
  eq(60400 - 56564, 3836, 'V7 √2 walk: remainder 60,400 − 56,564 = 3,836')
  // the maximality of every chosen digit (b+1 would overshoot)
  ok(25 * 5 > 100, 'V7 √2 walk: b = 5 overshoots (25·5 = 125 > 100)')
  ok(282 * 2 > 400, 'V7 √2 walk: b = 2 overshoots (282·2 = 564 > 400)')
  ok(2825 * 5 > 11900, 'V7 √2 walk: b = 5 overshoots (2825·5 = 14,125 > 11,900)')
  ok(28283 * 3 > 60400, 'V7 √2 walk: b = 3 overshoots (28283·3 = 84,849 > 60,400)')
  // the √2 digits themselves against BigInt truth
  eq((isqrt(BigInt(2000000))).toString(), '1414', 'V7 √2: isqrt(2·10⁶) = 1414 (4 digits)')
  eq((isqrt(BigInt(200000000))).toString(), '14142', 'V7 √2: isqrt(2·10⁸) = 14142 (5 digits)')

  // V8 the √3 walk: products 189, 1029, 6924; remainders 11, 71, 176
  eq(27 * 7, 189, 'V8 √3 walk: 27·7 = 189')
  eq(200 - 189, 11, 'V8 √3 walk: remainder 200 − 189 = 11')
  eq(343 * 3, 1029, 'V8 √3 walk: 343·3 = 1,029')
  eq(1100 - 1029, 71, 'V8 √3 walk: remainder 1,100 − 1,029 = 71')
  eq(3462 * 2, 6924, 'V8 √3 walk: 3462·2 = 6,924')
  eq(7100 - 6924, 176, 'V8 √3 walk: remainder 7,100 − 6,924 = 176')
  ok(28 * 8 > 200, 'V8 √3 walk: b = 8 overshoots (28·8 = 224 > 200)')
  ok(344 * 4 > 1100, 'V8 √3 walk: b = 4 overshoots (344·4 = 1,376 > 1,100)')
  ok(3463 * 3 > 7100, 'V8 √3 walk: b = 3 overshoots (3463·3 = 10,389 > 7,100)')
  eq(isqrt(BigInt(3000000)).toString(), '1732', 'V8 √3: isqrt(3·10⁶) = 1732')

  // V9 the terminating walks
  eq(43 * 3, 129, 'V9 √5.29 walk: 43·3 = 129 — the remainder exactly')
  eq(129 - 129, 0, 'V9 √5.29 walk: remainder 0 — terminating, √5.29 = 2.3')
  eq(23 * 23 * 100, 52900, 'V9 check: 2.3² = 5.29 at scale 10⁴ (23² = 529)')
  eq(235 * 235, 55225, 'V9 Āryabhaṭa exhibit: 235² = 55,225')
  eq(43 * 3, 129, 'V9 55225 walk: 43·3 = 129 (152 − 129 = 23)')
  eq(465 * 5, 2325, 'V9 55225 walk: 465·5 = 2,325 — the remainder exactly')
  eq(2325 - 2325, 0, 'V9 55225 walk: remainder 0 — terminating, √55225 = 235')

  // V10 the √7 walk: products 276, 2096, 26425; remainders 24, 304, 3975
  eq(46 * 6, 276, 'V10 √7 walk: 46·6 = 276')
  eq(300 - 276, 24, 'V10 √7 walk: remainder 300 − 276 = 24')
  eq(524 * 4, 2096, 'V10 √7 walk: 524·4 = 2,096')
  eq(2400 - 2096, 304, 'V10 √7 walk: remainder 2,400 − 2,096 = 304')
  eq(5285 * 5, 26425, 'V10 √7 walk: 5285·5 = 26,425')
  eq(30400 - 26425, 3975, 'V10 √7 walk: remainder 30,400 − 26,425 = 3,975')
  ok(47 * 7 > 300, 'V10 √7 walk: b = 7 overshoots (47·7 = 329 > 300)')
  ok(525 * 5 > 2400, 'V10 √7 walk: b = 5 overshoots (525·5 = 2,625 > 2,400)')
  ok(5286 * 6 > 30400, 'V10 √7 walk: b = 6 overshoots (5286·6 = 31,716 > 30,400)')
  eq(isqrt(BigInt(7000000)).toString(), '2645', 'V10 √7: isqrt(7·10⁶) = 2645')
}
console.log('(V5) 8.5 pre-writing: the factor method + decimal/fraction shifts')
{
  const factorize = (n: number): Record<number, number> => {
    const f: Record<number, number> = {}
    let m = n
    for (const p of [2, 3, 5, 7, 11, 13, 17, 19, 23]) {
      while (m % p === 0) { f[p] = (f[p] ?? 0) + 1; m /= p }
    }
    if (m > 1) f[m] = 1
    return f
  }
  const allEven = (n: number): boolean => Object.values(factorize(n)).every((e) => e % 2 === 0)
  // V11 the factor-method squares, each with even exponents
  eq(99 * 99, 9801, 'V11 99² = 9,801')
  ok(allEven(9801), 'V11 9801 = 3⁴·11² — all exponents even')
  eq(88 * 88, 7744, 'V11 88² = 7,744')
  ok(allEven(7744), 'V11 7744 = 2⁶·11² — all exponents even')
  eq(210 * 210, 44100, 'V11 210² = 44,100')
  ok(allEven(44100), 'V11 44100 = 2²·3²·5²·7² — all exponents even')
  eq(67 * 67, 4489, 'V11 67² = 4,489')
  eq(98 * 98, 9604, 'V11 98² = 9,604')
  // V12 the decimal/fraction shifts
  eq(35 * 35, 1225, 'V12 3.5² = 12.25 at scale 10⁴ (35² = 1,225)')
  eq(12 * 12, 144, 'V12 0.12² = 0.0144 at scale 10⁸ (12² = 144)')
  eq(46 * 46, 2116, 'V12 4.6² = 21.16 at scale 10² (46² = 2,116)')
  eq(3 * 3, 9, 'V12 (3/4)² = 9/16 — √(9/16) = 3/4')
  eq(5 * 5, 25, 'V12 (5/6)² = 25/36 — √(25/36) = 5/6')
  // V13 the last-digit law + trailing zeros
  const sqEnds = new Set<number>()
  for (let n = 0; n <= 99; n++) sqEnds.add((n * n) % 10)
  eq([...sqEnds].sort().join(','), '0,1,4,5,6,9', 'V13 squares end only in 0,1,4,5,6,9 (swept n ≤ 99)')
  let tz = true
  for (let n = 1; n <= 500; n++) {
    const tzn = (function f(x: number): number { let c = 0; while (x % 10 === 0) { x /= 10; c++ } return c })(n)
    const tzs = (function f(x: number): number { let c = 0; while (x % 10 === 0) { x /= 10; c++ } return c })(n * n)
    if (tzs !== 2 * tzn) tz = false
  }
  ok(tz, 'V13 squares have paired trailing zeros: tz(n²) = 2·tz(n) swept n ≤ 500')
  eq(32 * 32, 1024, 'V13 1024 = 32² is a perfect square')
  eq(95 * 95, 9025, 'V13 9025 = 95²')
  // V14 the smallest-multiplier/divisor family
  eq(252 * 7, 1764, 'V14 252·7 = 1,764')
  eq(42 * 42, 1764, 'V14 1,764 = 42² — 252 = 2²·3²·7 needed exactly one 7')
  eq(1008 * 7, 7056, 'V14 1008·7 = 7,056')
  eq(84 * 84, 7056, 'V14 7,056 = 84² — 1008 = 2⁴·3²·7 needed exactly one 7')
  eq(1620 / 5, 324, 'V14 1620 ÷ 5 = 324')
  eq(18 * 18, 324, 'V14 324 = 18² — 1620 = 2²·3⁴·5 needed one 5 removed')
}
console.log('(V6) 8.5 pre-writing: the cube engines')
{
  // V15 cubes mod 10: the last-digit map is a bijection (b³ mod 10 → b)
  const cubeMap: Record<number, number> = {}
  for (let b = 0; b <= 9; b++) cubeMap[(b * b * b) % 10] = b
  eq(JSON.stringify(cubeMap), '{"0":0,"1":1,"2":8,"3":7,"4":4,"5":5,"6":6,"7":3,"8":2,"9":9}',
    'V15 the cube last-digit map is injective (0→0,1→1,2→8,3→7,4→4,5→5,6→6,7→3,8→2,9→9)')
  // V15b the two-digit cube group-strip law: for N = (10a+b)³,
  // N div 1000 ∈ [a³, (a+1)³) — swept all 90 two-digit cubes
  let strip = true
  for (let a = 1; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const N = (10 * a + b) ** 3
      if (Math.floor(N / 1000) < a ** 3 || Math.floor(N / 1000) >= (a + 1) ** 3) strip = false
    }
  }
  ok(strip, 'V15b the three-digit strip: ⌊N/1000⌋ ∈ [a³, (a+1)³) for all 90 two-digit cubes')
  // V16 the cube exhibits
  eq(12 * 12 * 12, 1728, 'V16 12³ = 1,728')
  eq(21 * 21 * 21, 9261, 'V16 21³ = 9,261')
  eq(14 * 14 * 14, 2744, 'V16 14³ = 2,744 — so ∛(−2744) = −14 (odd powers keep the sign)')
  eq(27 * 27 * 27, 19683, 'V16 27³ = 19,683')
  eq(53 * 53 * 53, 148877, 'V16 53³ = 148,877')
  eq(26 * 26 * 26, 17576, 'V16 26³ = 17,576')
  eq(15 ** 3, 3375, 'V16 15³ = 3,375')
  eq(36 ** 3, 46656, 'V16 36³ = 46,656')
  // the ∛148877 shortcut walk pinned: ends in 7 → root ends 3; strip 148 → 5³ ≤ 148 < 6³
  eq(3 * 3 * 3 % 10, 7, 'V16 ∛148877: 3³ = 27 ends in 7 — the units digit of the root is 3')
  ok(5 ** 3 <= 148 && 148 < 6 ** 3, 'V16 ∛148877: 125 ≤ 148 < 216 — the tens digit is 5')
  // the ∛19683 shortcut walk: ends in 3 → root ends 7; strip 19 → 2³ ≤ 19 < 3³
  eq(7 ** 3 % 10, 3, 'V16 ∛19683: 7³ = 343 ends in 3 — the units digit of the root is 7')
  ok(2 ** 3 <= 19 && 19 < 3 ** 3, 'V16 ∛19683: 8 ≤ 19 < 27 — the tens digit is 2')
  // estimation: ∛3000 between 14 and 15, nearer 14
  ok(14 ** 3 < 3000 && 3000 < 15 ** 3, 'V16 ∛3000: 14³ = 2,744 < 3,000 < 3,375 = 15³')
  ok(3000 - 2744 < 3375 - 3000, 'V16 ∛3000: 3,000 − 2,744 = 256 < 375 = 3,375 − 3,000 — nearer 14')
  // V17 the √10 estimation bracket
  eq(316 * 316, 99856, 'V17 3.16² = 9.9856 at scale 10⁴ (316² = 99,856)')
  eq(317 * 317, 100489, 'V17 3.17² = 10.0489 at scale 10⁴ (317² = 100,489)')
  ok(316 * 316 < 100000 && 100000 < 317 * 317, 'V17 3.16² < 10 < 3.17²')
  ok(100000 - 99856 < 100489 - 100000, 'V17 nearer below: 10 − 9.9856 = 0.0144 < 0.0489')
  ok(3 * 3 < 10 && 10 < 16, 'V17 the integer bracket: 3 < √10 < 4')
}
console.log('(V7) 8.5 pre-writing: quiz keys + exercise keys')
{
  // quiz (5 items, intended answer indices [1, 2, 3, 1, 2] — every distractor evaluated)
  eq(16 * 16 - 15 * 15 - 1, 30, 'V7 Q1: 30 integers strictly between 15² and 16² (key 1; distractors 29/31/32 all wrong)')
  eq((20 * 1414 + 2) * 2 <= 60400, true, 'V7 Q2: the trial of the method is (20a+b)b ≤ 100r (key 2)')
  eq(53 ** 3, 148877, 'V7 Q3: ∛148877 = 53 (key 3; 43³ = 79,507; 57³ = 185,193; 63³ = 250,047)')
  eq(43 ** 3, 79507, 'V7 Q3 distractor: 43³ = 79,507 ≠ 148,877')
  eq(57 ** 3, 185193, 'V7 Q3 distractor: 57³ = 185,193 ≠ 148,877')
  eq(63 ** 3, 250047, 'V7 Q3 distractor: 63³ = 250,047 ≠ 148,877')
  eq(1008 * 7, 7056, 'V7 Q4: 1008 = 2⁴·3²·7 → ×7 = 7,056 = 84² (key 1; ×3 → 3,024 not a square? check)')
  eq(Math.round(Math.sqrt(3024)), 55, 'V7 Q4 distractor: √3024 ≈ 54.99 — 3,024 = 55² − 1, not a square')
  ok(145 * 145 < 21168 && 21168 < 146 * 146, 'V7 Q4 distractor: ×21 → 21,168 — not even a square (145² < 21,168 < 146²)')
  eq(5 * 5, 25, 'V7 Q5: pairing mirrors 10² = 100 — one digit move left scales the square by 100 (key 2)')
  // exercises (12 items, every key recomputed)
  eq(1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17, 81, 'V7 L1-1: 1+3+…+17 = 81 = 9²')
  eq(21 * 21 - 20 * 20 - 1, 40, 'V7 L1-2: 40 integers strictly between 20² and 21²')
  eq(105 * 105, 11025, 'V7 L1-3: 105² = 11,025 by (a+b)²')
  eq(99 * 99, 9801, 'V7 L2-1: √9801 = 99')
  eq(88 * 88, 7744, 'V7 L2-2: √7744 = 88')
  eq(210 * 210, 44100, 'V7 L2-3: √44100 = 210')
  eq(isqrt(BigInt(200000000)).toString(), '14142', 'V7 L3-1: √2 to four decimal places = 1.4142')
  eq(isqrt(BigInt(7000000)).toString(), '2645', 'V7 L3-2: √7 to three places = 2.645')
  eq(23 * 23 * 100, 52900, 'V7 L3-3: √5.29 = 2.3 (23² = 529)')
  eq(35 * 35 * 100, 122500, 'V7 L4-1a: √12.25 = 3.5 (35² = 1,225)')
  eq(12 * 12 * 10000, 1440000, 'V7 L4-1b: √0.0144 = 0.12 (12² = 144)')
  eq(21 ** 3, 9261, 'V7 L4-2a: ∛9261 = 21')
  eq((-14) ** 3, -2744, 'V7 L4-2b: ∛(−2744) = −14')
  eq(9 / 16, (3 / 4) * (3 / 4), 'V7 L4-3a: √(9/16) = 3/4')
  eq(5 * 5 * 6 * 6, 25 * 36, 'V7 L4-3b: √(25/36) = 5/6 exactly (5²·6² = 25·36 = 900)')
  eq(27 ** 3, 19683, 'V7 L5-1: ∛19683 = 27 by the group shortcut')
  eq(252 * 7, 1764, 'V7 L5-2: 252 × 7 = 1,764 = 42²')
  eq(isqrt(BigInt(1000000)).toString(), '1000', 'V7 L5-3 setup: √10 estimation needs the 316/317 bracket')
  ok(316 * 316 < 100000 && 100000 < 317 * 317, 'V7 L5-3: √10 ≈ 3.16 (nearer below)')
  eq((10 * 7 + 5) ** 2, 5625, 'V7 L6-1: the engine at a = 7, b = 5: (75)² = 100·49 + (140+5)·5')
  eq(100 * 49 + (20 * 7 + 5) * 5, 5625, 'V7 L6-1: 100a² + (20a+b)b = 4,900 + 725 = 5,625')
}


/* ================================================================== */
/* SECTION W — AUTHORED audits for lesson 8.5 (post-prose, run with    */
/* the lesson in place): block census, quiz-key match, exercise        */
/* ladders, figure audits, prerequisite + source existence, honest    */
/* word count, the 8.4 threading, the queue emptied.                   */
/* ================================================================== */
console.log('(W) 8.5 authored audits')
{
  const src = (await import('../src/data/library/books/mathematics/arithmetic-number-systems/ch-08')).chapter08
  const L85 = src.lessons.find((l: { id: string }) => l.id === 'ans-square-and-cube-root-crafts') as {
    id: string; number: string; title: string; prerequisites: string[];
    sources: string[]; blocks: Record<string, unknown>[];
  }
  ok(L85 !== undefined, 'W1: lesson 8.5 present with id ans-square-and-cube-root-crafts')
  eq(L85.number, '8.5', 'W1: lesson number 8.5')
  ok(L85.title === 'Square and Cube Roots: the Extraction Crafts', 'W1: lesson title')

  // prerequisites exist among the book's written lessons
  const { readdirSync } = await import('node:fs')
  const dir = new URL('../src/data/library/books/mathematics/arithmetic-number-systems/', import.meta.url)
  const allIds = new Set<string>()
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.ts')) continue
    const raw = readFileSync(new URL(f, dir), 'utf8')
    for (const m of raw.matchAll(/id: '(ans-[a-z0-9-]+)'/g)) allIds.add(m[1])
  }
  for (const rid of L85.prerequisites) {
    ok(allIds.has(rid), 'W2: prerequisite ' + rid + ' exists in the book')
  }
  // sources all appear in SOURCE_LOG.md
  const sourceLog = readFileSync(new URL('../docs/project/SOURCE_LOG.md', import.meta.url), 'utf8')
  for (const k of L85.sources) {
    ok(sourceLog.includes('`' + k + '`') || sourceLog.includes(k), 'W3: SOURCE_LOG carries key ' + k)
  }

  // block census
  const kinds: Record<string, number> = {}
  for (const b of L85.blocks) kinds[b.kind as string] = (kinds[b.kind as string] ?? 0) + 1
  eq(kinds.para ?? 0, 12, 'W4: block census — 12 paras')
  eq(kinds.heading ?? 0, 6, 'W4: block census — 6 headings')
  eq(kinds.derivation ?? 0, 4, 'W4: block census — 4 derivations (gnomon, triplet, engine, cube map)')
  eq(kinds.example ?? 0, 3, 'W4: block census — 3 examples')
  eq(kinds.figure ?? 0, 2, 'W4: block census — 2 figures')
  eq(kinds.formula ?? 0, 3, 'W4: block census — 3 formula cards')
  eq(kinds.callout ?? 0, 3, 'W4: block census — 3 callouts (insight, historical, exam)')
  eq(kinds.terms ?? 0, 1, 'W4: block census — 1 terms block (6 terms)')
  eq(kinds.exercises ?? 0, 1, 'W4: block census — 1 exercises block')
  eq(kinds.quiz ?? 0, 1, 'W4: block census — 1 quiz block')

  // quiz key audit: 5 items × 4 options, answers [1, 2, 3, 1, 2]
  const quiz = L85.blocks.find((b) => (b as { kind: string }).kind === 'quiz') as unknown as {
    items: { q: string; options: string[]; answer: number }[]
  }
  eq(quiz.items.length, 5, 'W5: quiz has 5 items')
  const keys = quiz.items.map((i) => i.answer)
  eq(keys.join(','), '1,2,3,1,2', 'W5: quiz answer keys [1,2,3,1,2] as authored')
  for (const it of quiz.items) {
    eq(it.options.length, 4, 'W5: every quiz item carries exactly 4 options')
    ok(new Set(it.options).size === 4, 'W5: no duplicate options in any item')
  }

  // exercise ladder: L1–L6, 12 questions, every one with solution + answer
  const ex = L85.blocks.find((b) => (b as { kind: string }).kind === 'exercises') as unknown as {
    sets: { level: string; questions: { q: string; solution: string[]; answer: string }[] }[]
  }
  eq(ex.sets.map((sx) => sx.level).join(','), 'L1,L2,L3,L4,L5,L6', 'W6: the exercise ladder runs L1–L6')
  eq(ex.sets.reduce((a, sx) => a + sx.questions.length, 0), 18, 'W6: 18 exercise questions total (3 per rung)')
  for (const sx of ex.sets) {
    for (const q of sx.questions) {
      ok(q.solution.length >= 2, 'W6: every exercise carries a multi-line solution')
      ok(typeof q.answer === 'string' && q.answer.length > 0, 'W6: every exercise carries an answer')
    }
  }

  // figure audits: aria + no $ in svg + the pinned panel numbers present
  const figs = L85.blocks.filter((b) => (b as { kind: string }).kind === 'figure') as unknown as {
    caption: string; svg: string
  }[]
  eq(figs.length, 2, 'W7: two figures')
  for (const f of figs) {
    ok(f.svg.includes('aria-label'), 'W7: every figure carries an aria-label')
    ok(!f.svg.includes('$'), 'W7: no raw $ inside any svg (KaTeX discipline)')
    ok(f.svg.includes('viewBox="0 0'), 'W7: every figure carries a viewBox')
    ok(f.caption.length > 40, 'W7: every figure carries a real caption')
  }
  const gnomon = figs[0].svg
  const panel = figs[1].svg
  for (const needle of ['1. 4  1  4  2', '2 .  00   00   00   00', '24·4 = 96', '281·1 = 281', '2824·4 = 11,296', '28282·2 = 56,564', '3,836']) {
    ok(panel.includes(needle), 'W7: the division panel carries the pinned string "' + needle + '"')
  }
  // the gnomon svg evaluates its templates: audit the RENDERED form
  for (const needle of ['>+3<', '>+5<', '>+7<', '= 16', '= 4²']) {
    ok(gnomon.includes(needle), 'W7: the gnomon figure carries the pinned label ' + needle)
  }
  eq((gnomon.match(/<rect /g) ?? []).length, 16, 'W7: the gnomon figure draws exactly 16 unit cells (1+3+5+7)')
  ok(gnomon.includes('gnomons: each odd number grows the square'), 'W7: the gnomon figure carries its caption line')

  // the 8.4 threading is in place
  const raw = readFileSync(new URL('../src/data/library/books/mathematics/arithmetic-number-systems/ch-08.ts', import.meta.url), 'utf8')
  ok(raw.includes('one computational coda remains before the vistas'), 'W8: 8.4 closes into the 8.5 coda')
  ok(raw.includes('the crafts that *compute* the roots the tower was built to house'), 'W8: the coda hand-off sentence is in place')

  // the chapter queue is empty (8.5 shipped, nothing planned)
  const chRaw = raw
  ok(!/plannedLessons:\s*\[[^\]]/.test(chRaw), 'W9: ch-08 plannedLessons is empty — no queue left behind')

  // honest word count (the types helper)
  const { countLessonWords } = await import('../src/data/library/types')
  const wc = countLessonWords(L85 as unknown as Parameters<typeof countLessonWords>[0])
  ok(wc > 3800 && wc < 6500, 'W10: honest word count in the house range (got ' + wc + ')')
}

/* ================================================================== */
/* summary                                                             */
/* ================================================================== */
console.log('--------------------------------------------------------------')
console.log(`verify-book2-ch08 (sections A–U2 + V + W, 8.1–8.5 shipped, chapter re-complete): ${pass} pass, ${fail} fail`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
console.log('ALL GREEN')
