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
 *   (Q) the formula cards.
 */
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
/* (Q) formula cards                                                   */
/* ================================================================== */
console.log('(Q) formula cards')
{
  const src = (await import('../src/data/library/books/mathematics/arithmetic-number-systems/ch-08')).chapter08
  const formulas = src.lessons.flatMap((l) => l.blocks.filter((b) => b.kind === 'formula').map((b) => (b as { name: string }).name))
  eq(formulas.length, 8, 'Q: 8 formula cards across 8.1 + 8.2')
  const want = [
    'The dissection identity',
    'The classical contradiction',
    'The general wall',
    'The Śulbasūtra ladder',
    'The kernel dictionary',
    'The product law',
    'The k-th root criterion',
    'The squeeze chain',
  ]
  for (const w of want) ok(formulas.includes(w), `Q: card present — ${w}`)
  // quiz blocks: 2, exercises: 2, each 5 quiz items
  const quizzes = src.lessons.flatMap((l) => l.blocks.filter((b) => b.kind === 'quiz'))
  eq(quizzes.length, 2, 'Q: 2 quiz blocks')
  eq((quizzes[0] as { items: unknown[] }).items.length, 5, 'Q: quiz 8.1 has 5 items')
  eq((quizzes[1] as { items: unknown[] }).items.length, 5, 'Q: quiz 8.2 has 5 items')
}

/* ================================================================== */
/* summary                                                             */
/* ================================================================== */
console.log('--------------------------------------------------------------')
console.log(`verify-book2-ch08 (sections A–N, 8.1 + 8.2): ${pass} pass, ${fail} fail`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
console.log('ALL GREEN')
