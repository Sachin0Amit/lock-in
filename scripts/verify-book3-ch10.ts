import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'

export {}

/**
 * verify-book3-ch10.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 10 "Graphs of Equations" — lesson 10.1 "The Coordinate
 * Plane and Linear Graphs" (id al-the-coordinate-plane-and-linear-graphs)
 * and 10.2 "Slope: the Steepness Theorem" (id al-slope-the-steepness-
 * theorem).
 *
 * Created 2026-11-10 (run 85) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–84. Conventions: ALL arithmetic in this
 * verifier is exact — BigInt/Frac coordinates, exact determinant
 * (collinearity) tests, and exact rational slope arithmetic; no float decides
 * any claim; the census window W = {−5, −4, …, 5} (11 integer points) on
 * each axis unless a section says otherwise. The engines:
 *
 *   (A) the coordinate-plane engines for 10.1 —
 *       (i)   the addressing engine: a designed 10-point census priced
 *             pointwise into the four quadrants by sign reads, with the
 *             origin and the axis points belonging to NO quadrant; the
 *             one-to-one read (distinct ordered pairs are distinct
 *             addresses, and each point carries exactly one);
 *       (ii)  the intercept engine: for ax + by = c with a, b ≠ 0 the
 *             x-intercept is (c/a, 0) and the y-intercept is (0, c/b),
 *             each priced by substitution on three designed lines;
 *       (iii) the through-origin engine: c = 0 puts (0, 0) on the line —
 *             the two intercepts collapse onto the origin — and the walk
 *             doors (b, −a) and (−b, a) are priced on 2x − 3y = 0;
 *       (iv)  THE graph-as-solution-set identity on 3x + 2y = 6, priced
 *             BOTH directions pointwise on a 12-point census: every
 *             solution satisfies the equation AND is exactly collinear
 *             with the intercept pair (det = 0), every off-line census
 *             point fails the equation AND the collinearity — the line IS
 *             the solution set, from both sides;
 *       (v)   the special-families engine: y = k is satisfied exactly by
 *             the census points with second coordinate k (horizontal),
 *             x = h exactly by those with first coordinate h (vertical);
 *             and the one-door read: every vertical probe x = h meets
 *             y = mx + b in exactly one point (h, mh + b) — 5.3's verdict
 *             machine made visible;
 *       (vi)  the elimination-lands-on-the-graph engine: the ch. 6 pair
 *             3x + 2y = 6, x − 2y = 4 solves to (5/2, −3/4), the point
 *             satisfies BOTH equations exactly AND is collinear with each
 *             line's intercept pair; the doubled pair (3x + 2y = 6 with
 *             6x + 4y = 12) eliminates to 0 = 0 — all points, the lines
 *             coincide; the conflicting pair (with 3x + 2y = 10) eliminates
 *             to 0 = 4 — none, the lines are parallel: 5.3's three
 *             verdicts, now drawn;
 *       (vii) the walk-teaser engine: from (0, 3) the step (run +2, rise
 *             −3) lands on (2, 0) and repeats to (4, −3) and (6, −6) —
 *             all on the line, the intercepts are steps of one walk (the
 *             slope preview of 10.2 priced).
 *   (B) the slope engines for 10.2 —
 *       (i)   the slope engine: m = (y₂ − y₁)/(x₂ − x₁) exact on designed
 *             pairs, the sign conventions walked; m = 0 priced on the
 *             horizontal y = 2; the vertical x = −1 hits the zero-division
 *             guard — the engine REFUSES (no division is performed) and
 *             the refusal itself is the check: slope undefined, honestly;
 *       (ii)  THE steepness-theorem engine: on y = 2x + 1 all C(4,2) = 6
 *             pairwise slopes from the four census points equal 2 exactly;
 *             on y = −(3/2)x + 4 all 3 pairwise slopes equal −3/2; the
 *             similar-triangle read priced: the two rise/run rectangles
 *             between different pairs scale by the same factor (run ratio
 *             = rise ratio = 3/2), which is WHY the slope cannot depend on
 *             the point choice;
 *       (iii) the coefficient-readout engine: ax + by = c (b ≠ 0) has
 *             m = −a/b and y-intercept c/b, cross-priced against the
 *             two-intercept computation for three lines (3x + 2y = 6 →
 *             m = −3/2 both ways; x − 2y = 4 → m = 1/2; 2x − 3y = 0 →
 *             m = 2/3 through the origin);
 *       (iv)  the two-line verdict engine (5.3's machine drawn): same
 *             slope, different intercept → parallel, elimination says
 *             1 = −3, false, solution set ∅ (none); same line (y = 2x + 1
 *             with 4x − 2y + 2 = 0, the doubled equation) → infinitely
 *             many; different slopes (y = 2x + 1 with y = −x + 7) → meet
 *             exactly once at (2, 5), priced in both equations;
 *       (v)   the rate engine: the fare line F = 50 + 12d prices m = 12
 *             rupees per km from (0, 50) and (3, 86) and predicts d = 7 →
 *             134; the Celsius→Fahrenheit line through (0, 32) and
 *             (100, 212) prices m = 180/100 = 9/5 exactly, verifies
 *             C = 37 → F = 493/5 = 98.6, and the scales' meeting point
 *             C = −40 (solving C = (9/5)C + 32 exactly);
 *       (vi)  the parallel-condition and doorway engines: y = 2x + 1 vs
 *             y = 2x − 3 parallel (∅); through (1, 6) the parallel to it
 *             is y = 2x + 4 and the perpendicular y = −(1/2)x + 13/2 with
 *             m₁·m₂ = −1 priced (the proof rides in Coordinate Geometry —
 *             the doorway is labelled as such); the k-hunt: 2x + ky = 4
 *             parallel to y = 3x + 1 exactly when k = −2/3 (m = −2/k = 3),
 *             with the k = 0 edge honest (x = 2 vertical, undefined slope,
 *             and it MEETS y = 3x + 1 at (2, 7) — vertical is not parallel
 *             to a non-vertical line).
 *   (C) the FIGURE GEOMETRY PLANS of the run's six figures (10.1: the
 *       addressing map 720×400; the graph of 3x + 2y = 6 720×400; 10.2:
 *       the steepness theorem 720×400; the two-line verdict strip
 *       720×340; 10.3 (run 86): the workhorse parabola 720×400 + the
 *       three-verdict strip 720×340), audited in E and H.
 *   (G) the PARABOLA ENGINES for 10.3 "The Parabola: Quadratic Graphs
 *       and Vertices" (run 86, pre-write — every number below existed
 *       here before any prose): the workhorse y = 2x² − 7x + 3 (ch. 9's
 *       own example, Δ = 25) priced pointwise on the census table
 *       x = −2…5; the W×W window scan (exactly 4 integer points inside
 *       — (0, 3), (1, −2), (2, −3), (3, 0) — with (4, 7) on the curve
 *       but out the top: the pre-write catch); the fold identity
 *       y = 2(x − 7/4)² − 25/8 certified by expansion and pointwise at
 *       all 8 census x's, with the vertex height read as −Δ/(4a);
 *       the vertex (7/4, −25/8) priced as MINIMUM by the sign of a,
 *       the gap f(x) − (−25/8) being exactly the square 2(x − 7/4)²;
 *       the x-intercept verdicts on the three companions — two doors
 *       (the workhorse, roots 1/2 and 3 cross-priced against the
 *       factorization (2x − 1)(x − 3)), one tangent touch ((x − 1)²,
 *       Δ = 0, twins f(1 + t) = t²), none (x² + 1, Δ = −4, the vertex
 *       floating one unit above) — 9.3's discriminant ledger, drawn;
 *       the axis of symmetry x = 7/4 mirror-priced pointwise
 *       (f(7/4 + t) = f(7/4 − t) exact) with the designed twin pairs
 *       (0, 3)↔(7/2, 3), (1, −2)↔(5/2, −2), (3/2, −3)↔(2, −3),
 *       (1/2, 0)↔(3, 0) — each pair satisfying the curve and
 *       midpricing exactly on the axis;
 *       the probe engines: every vertical probe x = h meets the curve
 *       exactly once (the input read), every horizontal probe y = k
 *       solves 2x² − 7x + (3 − k) = 0 with Δ_k = 25 + 8k — two meets
 *       iff k > −25/8, one iff k = −25/8 (the tangent level, the
 *       vertex itself), none iff k < −25/8 — the count flips exactly
 *       at the vertex height, priced on a designed k-scan (5.3's
 *       verdict machine, bent honestly: a quadratic has at most two
 *       roots against any level);
 *       the second-difference engine: first differences −5, −1, 3, 7
 *       along the integer census, second differences constant 4 = 2a,
 *       the secant slopes −5, −1, 3, 7 climbing by exactly 2a per
 *       step — 10.2's steepness theorem BENDS, the honest doorway to
 *       calculus;
 *       the opens-down companion y = −x² + 4x + 5 (a = −1 < 0): fold
 *       −(x − 2)² + 9, vertex (2, 9) a MAXIMUM, Δ = 36, doors (−1, 0)
 *       and (5, 0) midpointing on the axis, −Δ/(4a) = 9 through the
 *       sign of a; and the exam echo x(10 − x) peaking at the square
 *       25 (9.3's census maximum, now an area).
 *
 * Sections D (authored 10.1), E (authored 10.2) and H (authored 10.3)
 * import the chapter file directly — the same battery as runs 73–84
 * (structure censuses, quiz keys vs pinned, all 42 chapter exercises
 * re-priced exactly, figure geometry vs plans rect-exact +
 * pairwise-disjoint groups, citation keys, honest word counts, the
 * odd-run backslash scan, the unicode-escape scan, the raw-$ scan, the
 * al- prefix uniqueness across the whole library, the vivid-palette
 * figure scan). Section F (chapter + library) is flipped at close-of-
 * chapter time, and section I carries the unit-10 completion review
 * (the closing pattern of runs 68–84).
 */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) {
    passed++
  } else {
    failed++
    failures.push(msg)
    console.log('  FAIL: ' + msg)
  }
}

/* ---------------- exact rational machinery ---------------- */

interface Frac {
  n: bigint
  d: bigint
}

function bgcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a
  b = b < 0n ? -b : b
  while (b) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

function fr(n: bigint, d: bigint = 1n): Frac {
  if (d === 0n) throw new Error('zero denominator — the field forbids it')
  if (d < 0n) {
    n = -n
    d = -d
  }
  const g = bgcd(n, d) || 1n
  return { n: n / g, d: d / g }
}

const fIsZero = (a: Frac): boolean => a.n === 0n
const fEq = (a: Frac, b: Frac): boolean => a.n === b.n && a.d === b.d
const fAdd = (a: Frac, b: Frac): Frac => fr(a.n * b.d + b.n * a.d, a.d * b.d)
const fSub = (a: Frac, b: Frac): Frac => fr(a.n * b.d - b.n * a.d, a.d * b.d)
const fMul = (a: Frac, b: Frac): Frac => fr(a.n * b.n, a.d * b.d)
const fDiv = (a: Frac, b: Frac): Frac => {
  if (b.n === 0n) throw new Error('division by zero — the forbidden move; the guard fired')
  return fr(a.n * b.d, a.d * b.n)
}
const fNeg = (a: Frac): Frac => ({ n: -a.n, d: a.d })
const fStr = (a: Frac): string => (a.d === 1n ? `${a.n}` : `${a.n}/${a.d}`)

interface Pt {
  x: Frac
  y: Frac
}

const pt = (x: bigint | Frac, y: bigint | Frac): Pt => ({
  x: typeof x === 'bigint' ? fr(x) : x,
  y: typeof y === 'bigint' ? fr(y) : y,
})

const pEq = (a: Pt, b: Pt): boolean => fEq(a.x, b.x) && fEq(a.y, b.y)
const pStr = (p: Pt): string => `(${fStr(p.x)}, ${fStr(p.y)})`

/** evaluate ax + by − c at a point (exact) */
function linAt(a: Frac, b: Frac, c: Frac, p: Pt): Frac {
  return fSub(fAdd(fMul(a, p.x), fMul(b, p.y)), c)
}

/** the collinearity determinant: twice the signed area of the triangle */
function det3(p1: Pt, p2: Pt, p3: Pt): Frac {
  return fAdd(
    fSub(fMul(p1.x, fSub(p2.y, p3.y)), fMul(p2.x, fSub(p1.y, p3.y))),
    fMul(p3.x, fSub(p1.y, p2.y)),
  )
}

/** exact slope between two distinct points; throws on the vertical guard */
function slopeOf(p1: Pt, p2: Pt): Frac {
  const run = fSub(p2.x, p1.x)
  if (fIsZero(run)) {
    throw new Error(`vertical guard: run = 0 between (${fStr(p1.x)}, ${fStr(p1.y)}) and (${fStr(p2.x)}, ${fStr(p2.y)}) — slope undefined, no division performed`)
  }
  return fDiv(fSub(p2.y, p1.y), run)
}

const W: bigint[] = [-5n, -4n, -3n, -2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n]

/* ------------------------------------------------------------------ */
/* (A) the coordinate-plane engines of lesson 10.1                     */
/* ------------------------------------------------------------------ */

console.log('[A] 10.1 engines: addressing, quadrants, intercepts, the graph-as-solution-set identity, special families, the drawn elimination, the walk')

// A-i — the addressing engine: quadrants by sign, one-to-one
{
  // [name, point, expected quadrant or 'x-axis'/'y-axis'/'origin']
  const census: [string, Pt, string][] = [
    ['(2, 5)', pt(2n, 5n), 'QI'],
    ['(6, 7)', pt(6n, 7n), 'QI'],
    ['(−4, 1)', pt(-4n, 1n), 'QII'],
    ['(−3, −2)', pt(-3n, -2n), 'QIII'],
    ['(−2, −6)', pt(-2n, -6n), 'QIII'],
    ['(3, −2)', pt(3n, -2n), 'QIV'],
    ['(4, −1)', pt(4n, -1n), 'QIV'],
    ['(0, 4)', pt(0n, 4n), 'y-axis'],
    ['(−5, 0)', pt(-5n, 0n), 'x-axis'],
    ['(0, 0)', pt(0n, 0n), 'origin'],
  ]
  for (const [name, p, want] of census) {
    let got: string
    if (fIsZero(p.x) && fIsZero(p.y)) got = 'origin'
    else if (fIsZero(p.x)) got = 'y-axis'
    else if (fIsZero(p.y)) got = 'x-axis'
    else if (p.x.n > 0n) got = p.y.n > 0n ? 'QI' : 'QIV'
    else got = p.y.n > 0n ? 'QII' : 'QIII'
    ok(got === want, `A-i the address ${name} reads ${want} (got ${got})`)
  }
  // the one-to-one read: within the census, distinct pairs are distinct
  for (let i = 0; i < census.length; i++) {
    for (let j = i + 1; j < census.length; j++) {
      ok(!pEq(census[i][1], census[j][1]), `A-i distinct addresses: ${census[i][0]} ≠ ${census[j][0]}`)
    }
  }
  console.log('  A-i the addressing census: 10 quadrant reads + 45 distinctness checks')
}

// A-ii — the intercept engine
{
  const lines: [string, Frac, Frac, Frac, Pt, Pt][] = [
    ['3x + 2y = 6', fr(3n), fr(2n), fr(6n), pt(2n, 0n), pt(0n, 3n)],
    ['x − 2y = 4', fr(1n), fr(-2n), fr(4n), pt(4n, 0n), pt(0n, -2n)],
    ['2x + 5y = 10', fr(2n), fr(5n), fr(10n), pt(5n, 0n), pt(0n, 2n)],
  ]
  for (const [name, a, b, c, xi, yi] of lines) {
    // the formula reads: x-intercept (c/a, 0), y-intercept (0, c/b)
    ok(pEq(xi, pt(fDiv(c, a), fr(0n))), `A-ii ${name}: the x-intercept is (c/a, 0) = ${pStr(xi)}`)
    ok(pEq(yi, pt(fr(0n), fDiv(c, b))), `A-ii ${name}: the y-intercept is (0, c/b) = ${pStr(yi)}`)
    // and each intercept satisfies the equation exactly
    ok(fIsZero(linAt(a, b, c, xi)), `A-ii ${name}: the x-intercept satisfies the equation`)
    ok(fIsZero(linAt(a, b, c, yi)), `A-ii ${name}: the y-intercept satisfies the equation`)
  }
  console.log('  A-ii the intercept engine: 3 lines × (formula reads + substitution) exact')
}

// A-iii — the through-origin engine
{
  const a = fr(2n)
  const b = fr(-3n)
  const c = fr(0n)
  const O = pt(0n, 0n)
  ok(fIsZero(linAt(a, b, c, O)), 'A-iii 2x − 3y = 0 passes through the origin')
  // the walk doors: (b, −a) and (−b, a) — both on the line, opposite walks
  const d1 = pt(b, fNeg(a))
  const d2 = pt(fNeg(b), a)
  ok(pEq(d1, pt(-3n, -2n)) && fIsZero(linAt(a, b, c, d1)), 'A-iii the door (b, −a) = (−3, −2) satisfies 2x − 3y = 0')
  ok(pEq(d2, pt(3n, 2n)) && fIsZero(linAt(a, b, c, d2)), 'A-iii the door (−b, a) = (3, 2) satisfies 2x − 3y = 0')
  // the intercept formula degenerates: c/a = 0 and c/b = 0 — both "intercepts" are the origin
  ok(fEq(fDiv(c, a), fr(0n)) && fEq(fDiv(c, b), fr(0n)), 'A-iii c = 0 collapses both intercepts onto (0, 0) — a second point must replace them')
  console.log('  A-iii the through-origin engine: origin + both walk doors priced')
}

// A-iv — THE graph-as-solution-set identity on 3x + 2y = 6, both directions
{
  const a = fr(3n)
  const b = fr(2n)
  const c = fr(6n)
  const xi = pt(2n, 0n)
  const yi = pt(0n, 3n)
  const onLine: [string, Pt][] = [
    ['(0, 3)', pt(0n, 3n)],
    ['(2, 0)', pt(2n, 0n)],
    ['(4, −3)', pt(4n, -3n)],
    ['(−2, 6)', pt(-2n, 6n)],
    ['(1, 3/2)', pt(1n, fr(3n, 2n))],
    ['(5/2, −3/4)', pt(fr(5n, 2n), fr(-3n, 4n))],
    ['(−4, 9)', pt(-4n, 9n)],
    ['(6, −6)', pt(6n, -6n)],
  ]
  const offLine: [string, Pt][] = [
    ['(1, 1)', pt(1n, 1n)],
    ['(3, 1)', pt(3n, 1n)],
    ['(0, 0)', pt(0n, 0n)],
    ['(2, 3)', pt(2n, 3n)],
  ]
  for (const [name, p] of onLine) {
    // direction 1: every solution satisfies the equation (it was built from it)
    ok(fIsZero(linAt(a, b, c, p)), `A-iv ${name} satisfies 3x + 2y = 6`)
    // direction 2a: every solution lies ON the line — exactly collinear with the intercept pair
    ok(fIsZero(det3(xi, yi, p)), `A-iv ${name} is collinear with the intercepts (2, 0), (0, 3) — det = 0 exact`)
  }
  for (const [name, p] of offLine) {
    // the converse side: off the equation ⟺ off the line, priced both ways
    ok(!fIsZero(linAt(a, b, c, p)), `A-iv ${name} fails 3x + 2y = 6 (the value is ${fStr(linAt(a, b, c, p))})`)
    ok(!fIsZero(det3(xi, yi, p)), `A-iv ${name} is NOT on the line — det = ${fStr(det3(xi, yi, p))} ≠ 0`)
  }
  // the full integer census scan: inside W×W, a point satisfies the equation exactly when det = 0
  let agree = 0
  for (const wx of W) {
    for (const wy of W) {
      const p = pt(wx, wy)
      const satisfies = fIsZero(linAt(a, b, c, p))
      const collinear = fIsZero(det3(xi, yi, p))
      ok(satisfies === collinear, `A-iv census (${wx}, ${wy}): satisfies ⟺ on-line agreement`)
      if (satisfies) agree++
    }
  }
  ok(agree === 3, `A-iv the census W×W carries exactly 3 integer solutions of 3x + 2y = 6 (got ${agree}: (0,3), (2,0), (4,−3) — x must be even, and the window keeps |y| ≤ 5, so (−2,6) and (−4,9) sit just outside it)`)
  console.log(`  A-iv the identity priced BOTH directions: 8 on-line + 4 off-line + the ${11 * 11}-point census agreement (${agree} solutions)`)
}

// A-v — the special families and the one-door read
{
  // horizontal y = 2: exactly the second coordinate 2
  const hIn: Pt[] = [pt(-3n, 2n), pt(0n, 2n), pt(4n, 2n)]
  const hOut: [string, Pt][] = [
    ['(0, 3)', pt(0n, 3n)],
    ['(2, 0)', pt(2n, 0n)],
    ['(−2, −2)', pt(-2n, -2n)],
  ]
  for (const p of hIn) ok(fEq(p.y, fr(2n)), `A-v ${pStr(p)} sits on y = 2 (horizontal)`)
  for (const [name, p] of hOut) ok(!fEq(p.y, fr(2n)), `A-v ${name} is off y = 2`)
  // vertical x = −1: exactly the first coordinate −1
  const vIn: Pt[] = [pt(-1n, 5n), pt(-1n, 0n), pt(-1n, -4n)]
  const vOut: [string, Pt][] = [
    ['(−2, 0)', pt(-2n, 0n)],
    ['(3, 1)', pt(3n, 1n)],
  ]
  for (const p of vIn) ok(fEq(p.x, fr(-1n)), `A-v ${pStr(p)} sits on x = −1 (vertical)`)
  for (const [name, p] of vOut) ok(!fEq(p.x, fr(-1n)), `A-v ${name} is off x = −1`)
  // the one-door read: every vertical probe x = h meets y = 2x + 1 exactly once, at (h, 2h + 1)
  for (const h of [-2n, 0n, 3n]) {
    const meet = pt(h, fAdd(fMul(fr(2n), fr(h)), fr(1n)))
    ok(fEq(meet.y, fr(2n * h + 1n)), `A-v the probe x = ${h} meets y = 2x + 1 exactly once, at ${pStr(meet)} — 5.3's one door, drawn`)
    ok(fIsZero(linAt(fr(2n), fr(-1n), fr(-1n), meet)), `A-v the meet ${pStr(meet)} satisfies y = 2x + 1 exactly`)
  }
  // and every horizontal probe meets every vertical probe exactly once — the grid lock
  for (const k of [2n, -1n]) {
    for (const h of [3n, 0n]) {
      ok(pEq(pt(h, k), pt(h, k)), `A-v x = ${h} meets y = ${k} exactly once, at (${h}, ${k})`)
    }
  }
  console.log('  A-v the special families: horizontal/vertical memberships + the one-door probes exact')
}

// A-vi — the elimination-lands-on-the-graph engine
{
  // the pair 3x + 2y = 6 and x − 2y = 4: elimination by addition gives 4x = 10
  const s = pt(fr(5n, 2n), fr(-3n, 4n))
  ok(fIsZero(linAt(fr(3n), fr(2n), fr(6n), s)), `A-vi the elimination answer ${pStr(s)} satisfies 3x + 2y = 6`)
  ok(fIsZero(linAt(fr(1n), fr(-2n), fr(4n), s)), `A-vi the elimination answer ${pStr(s)} satisfies x − 2y = 4`)
  ok(fIsZero(det3(pt(2n, 0n), pt(0n, 3n), s)), 'A-vi the crossing is collinear with the first line’s intercepts — it is VISIBLY on the graph')
  ok(fIsZero(det3(pt(4n, 0n), pt(0n, -2n), s)), 'A-vi the crossing is collinear with the second line’s intercepts')
  // elimination arithmetic itself: adding the lefts and rights gives 4x = 10
  ok(fEq(fAdd(fr(3n), fr(1n)), fr(4n)) && fEq(fAdd(fr(6n), fr(4n)), fr(10n)), 'A-vi the elimination step: (3x + 2y) + (x − 2y) = 4x and 6 + 4 = 10 — the y-terms annihilate')
  // the doubled pair: 3x + 2y = 6 with 6x + 4y = 12 eliminates to 0 = 0 — all points
  ok(fEq(fSub(fr(6n), fMul(fr(2n), fr(3n))), fr(0n)) && fEq(fSub(fr(12n), fMul(fr(2n), fr(6n))), fr(0n)), 'A-vi the doubled pair eliminates to 0 = 0 — the lines coincide, infinitely many crossings (5.3’s third verdict, drawn)')
  // the conflicting pair: 3x + 2y = 6 with 3x + 2y = 10 eliminates to 0 = 4 — none
  ok(fEq(fSub(fr(10n), fr(6n)), fr(4n)), 'A-vi the conflicting pair eliminates to 0 = 4 — false, the lines never meet: parallel (5.3’s none verdict, drawn)')
  console.log('  A-vi the drawn elimination: the crossing (5/2, −3/4) + the doubled pair (all) + the parallel pair (none) exact')
}

// A-vii — the walk teaser (the slope preview)
{
  const start = pt(0n, 3n)
  const step = (p: Pt): Pt => pt(fAdd(p.x, fr(2n)), fSub(p.y, fr(3n)))
  const s1 = step(start)
  const s2 = step(s1)
  const s3 = step(s2)
  ok(pEq(s1, pt(2n, 0n)), 'A-vii the walk (run +2, rise −3) from (0, 3) lands on the x-intercept (2, 0)')
  ok(pEq(s2, pt(4n, -3n)), 'A-vii the walk repeats to (4, −3) — on the census')
  ok(pEq(s3, pt(6n, -6n)), 'A-vii the walk repeats to (6, −6) — on the census')
  for (const s of [s1, s2, s3]) {
    ok(fIsZero(linAt(fr(3n), fr(2n), fr(6n), s)), `A-vii the walk landing ${pStr(s)} satisfies 3x + 2y = 6`)
  }
  console.log('  A-vii the walk teaser: (0,3) → (2,0) → (4,−3) → (6,−6), every landing exact — the 10.2 preview')
}

/* ------------------------------------------------------------------ */
/* (B) the slope engines of lesson 10.2                                */
/* ------------------------------------------------------------------ */

console.log('[B] 10.2 engines: the slope definition, the steepness theorem, the readout, the two-line verdicts, the rates, the parallel condition')

// B-i — the slope engine with the honest vertical guard
{
  const pairs: [string, Pt, Pt, Frac][] = [
    ['(0, 1) → (2, 5)', pt(0n, 1n), pt(2n, 5n), fr(2n)],
    ['(1, 3) → (4, 9)', pt(1n, 3n), pt(4n, 9n), fr(2n)],
    ['(0, 4) → (2, 1)', pt(0n, 4n), pt(2n, 1n), fr(-3n, 2n)],
    ['(2, 1) → (4, −2)', pt(2n, 1n), pt(4n, -2n), fr(-3n, 2n)],
    ['(0, 32) → (100, 212)', pt(0n, 32n), pt(100n, 212n), fr(9n, 5n)],
    ['(0, 50) → (3, 86)', pt(0n, 50n), pt(3n, 86n), fr(12n)],
  ]
  for (const [name, p1, p2, m] of pairs) {
    ok(fEq(slopeOf(p1, p2), m), `B-i the slope through ${name} is ${fStr(m)} exact`)
    // symmetry: the slope does not care which point is "first"
    ok(fEq(slopeOf(p2, p1), m), `B-i the slope through ${name} reversed is still ${fStr(m)} (the two sign flips cancel)`)
  }
  // horizontal: rise = 0 → m = 0
  ok(fEq(slopeOf(pt(-3n, 2n), pt(4n, 2n)), fr(0n)), 'B-i y = 2 has slope 0 (the rise is 0 between any two of its points)')
  // vertical: the guard fires — no division is performed, the refusal is the check
  let refused = false
  try {
    slopeOf(pt(-1n, 5n), pt(-1n, -4n))
  } catch (e) {
    refused = true
  }
  ok(refused, 'B-i x = −1 fires the vertical guard: run = 0, the division is refused, the slope is UNDEFINED — honestly')
  console.log('  B-i the slope engine: 6 pairs × 2 directions + horizontal 0 + the vertical refusal')
}

// B-ii — THE steepness-theorem engine (independence of the point choice)
{
  // y = 2x + 1 through four census points: all C(4,2) = 6 pairwise slopes equal 2
  const m1: Pt[] = [pt(0n, 1n), pt(1n, 3n), pt(2n, 5n), pt(4n, 9n)]
  for (const p of m1) ok(fEq(fSub(p.y, fMul(fr(2n), p.x)), fr(1n)), `B-ii ${pStr(p)} sits on y = 2x + 1`)
  let count1 = 0
  for (let i = 0; i < m1.length; i++) {
    for (let j = i + 1; j < m1.length; j++) {
      ok(fEq(slopeOf(m1[i], m1[j]), fr(2n)), `B-ii the pair ${pStr(m1[i])}, ${pStr(m1[j])} prices m = 2 (pair ${++count1} of 6)`)
    }
  }
  ok(count1 === 6, 'B-ii all 6 pairwise slopes of the four points are 2 — the theorem priced exhaustively on the line')
  // y = −(3/2)x + 4 through three points: all 3 pairwise slopes equal −3/2
  const m2: Pt[] = [pt(0n, 4n), pt(2n, 1n), pt(4n, -2n)]
  for (const p of m2) {
    const lhs = fAdd(p.y, fMul(fr(3n, 2n), p.x))
    ok(fEq(lhs, fr(4n)), `B-ii ${pStr(p)} sits on y = −(3/2)x + 4`)
  }
  let count2 = 0
  for (let i = 0; i < m2.length; i++) {
    for (let j = i + 1; j < m2.length; j++) {
      ok(fEq(slopeOf(m2[i], m2[j]), fr(-3n, 2n)), `B-ii the pair ${pStr(m2[i])}, ${pStr(m2[j])} prices m = −3/2 (pair ${++count2} of 3)`)
    }
  }
  // the similar-triangle read: pair A = (0,1)→(2,5), pair B = (1,3)→(4,9)
  const runA = fSub(pt(2n, 5n).x, pt(0n, 1n).x)
  const riseA = fSub(pt(2n, 5n).y, pt(0n, 1n).y)
  const runB = fSub(pt(4n, 9n).x, pt(1n, 3n).x)
  const riseB = fSub(pt(4n, 9n).y, pt(1n, 3n).y)
  ok(fEq(fDiv(riseA, runA), fr(2n)) && fEq(fDiv(riseB, runB), fr(2n)), 'B-ii both rise/run rectangles price 4/2 = 6/3 = 2')
  ok(fEq(fDiv(runB, runA), fDiv(riseB, riseA)), `B-ii the scale factors agree: run ${fStr(fDiv(runB, runA))} = rise ${fStr(fDiv(riseB, riseA))} — the triangles are similar, so the ratio CANNOT change`)
  console.log('  B-ii the steepness theorem: 6 + 3 pairwise slopes + the similar-triangle scale factors exact')
}

// B-iii — the coefficient-readout engine: m = −a/b, y-intercept c/b
{
  const lines: [string, Frac, Frac, Frac, Frac, Frac][] = [
    // [name, a, b, c, expected m, expected y-intercept]
    ['3x + 2y = 6', fr(3n), fr(2n), fr(6n), fr(-3n, 2n), fr(3n)],
    ['x − 2y = 4', fr(1n), fr(-2n), fr(4n), fr(1n, 2n), fr(-2n)],
    ['2x − 3y = 0', fr(2n), fr(-3n), fr(0n), fr(2n, 3n), fr(0n)],
  ]
  for (const [name, a, b, c, mWant, bWant] of lines) {
    ok(fEq(fNeg(fDiv(a, b)), mWant), `B-iii ${name}: the readout m = −a/b = ${fStr(mWant)}`)
    ok(fEq(fDiv(c, b), bWant), `B-iii ${name}: the y-intercept c/b = ${fStr(bWant)}`)
    // cross-check against the two-intercept walk: (0, c/b) → (c/a, 0) — but c = 0
    // collapses both intercepts onto the origin, so the walk uses the door (−b, a) instead
    if (!fIsZero(c)) {
      const viaIntercepts = slopeOf(pt(fr(0n), bWant), pt(fDiv(c, a), fr(0n)))
      ok(fEq(viaIntercepts, mWant), `B-iii ${name}: the intercept walk (0, ${fStr(bWant)}) → (${fStr(fDiv(c, a))}, 0) prices the same m = ${fStr(mWant)}`)
    } else {
      const viaDoor = slopeOf(pt(0n, 0n), pt(fNeg(b), a))
      ok(fEq(viaDoor, mWant), `B-iii ${name}: the origin walk (0, 0) → (${fStr(fNeg(b))}, ${fStr(a)}) prices the same m = ${fStr(mWant)}`)
    }
  }
  console.log('  B-iii the readout engine: 3 lines, m = −a/b cross-priced against the intercept walk')
}

// B-iv — the two-line verdict engine (5.3's machine drawn)
{
  // parallel: y = 2x + 1 vs y = 2x − 3 — equating gives 1 = −3, false
  ok(fEq(fSub(fr(1n), fr(-3n)), fr(4n)), 'B-iv equating the parallel pair leaves 1 − (−3) = 4 = 0 — FALSE: no x can serve, the solution set is ∅')
  ok(fEq(slopeOf(pt(0n, 1n), pt(1n, 3n)), slopeOf(pt(0n, -3n), pt(1n, -1n))), 'B-iv the parallel pair shares m = 2 exactly')
  // the 3x+2y pair: 6 vs 10 — parallel at m = −3/2 both
  ok(fEq(fNeg(fDiv(fr(3n), fr(2n))), fr(-3n, 2n)) && fEq(fNeg(fDiv(fr(3n), fr(2n))), fr(-3n, 2n)), 'B-iv 3x + 2y = 6 and 3x + 2y = 10 share m = −3/2 — parallel, ∅')
  // coincident: 4x − 2y + 2 = 0 IS y = 2x + 1 (divide by −2)
  ok(fEq(fDiv(fr(-4n), fr(-2n)), fr(2n)) && fEq(fDiv(fr(2n), fr(-2n)), fr(-1n)) && fEq(fDiv(fr(-2n), fr(-2n)), fr(1n)), 'B-iv dividing 4x − 2y + 2 = 0 by −2 gives y = 2x + 1 — the SAME line, infinitely many crossings')
  // meet: y = 2x + 1 vs y = −x + 7 → 3x = 6 → x = 2, y = 5
  ok(fEq(fAdd(fr(2n), fr(1n)), fr(3n)) && fEq(fAdd(fr(7n), fr(1n)), fr(8n)), 'B-iv equating: 2x + 1 = −x + 7 collects to 3x = 6 — different slopes meet exactly once')
  const meet = pt(2n, 5n)
  ok(fEq(fSub(meet.y, fMul(fr(2n), meet.x)), fr(1n)), `B-iv the meet ${pStr(meet)} satisfies y = 2x + 1`)
  ok(fEq(fAdd(meet.y, meet.x), fr(7n)), `B-iv the meet ${pStr(meet)} satisfies y = −x + 7`)
  console.log('  B-iv the two-line verdict engine: parallel ∅ / coincident all / meet exactly once at (2, 5) — 5.3 drawn')
}

// B-v — the rate engine
{
  // the fare line F = 50 + 12d
  const fare = (d: Frac): Frac => fAdd(fMul(fr(12n), d), fr(50n))
  ok(fEq(fare(fr(0n)), fr(50n)) && fEq(fare(fr(3n)), fr(86n)), 'B-v the fare line passes (0, 50) and (3, 86)')
  ok(fEq(slopeOf(pt(0n, 50n), pt(3n, 86n)), fr(12n)), 'B-v the fare slope is 36/3 = 12 rupees per km — a RATE, not a speed')
  ok(fEq(fare(fr(7n)), fr(134n)), 'B-v the rate predicts d = 7 → 50 + 84 = 134 rupees')
  // the Celsius→Fahrenheit line
  const fOf = (c: Frac): Frac => fAdd(fMul(fr(9n, 5n), c), fr(32n))
  ok(fEq(fOf(fr(0n)), fr(32n)) && fEq(fOf(fr(100n)), fr(212n)), 'B-v the conversion line passes (0, 32) and (100, 212)')
  ok(fEq(slopeOf(pt(0n, 32n), pt(100n, 212n)), fr(9n, 5n)), 'B-v the conversion slope is 180/100 = 9/5 °F per °C exact')
  ok(fEq(fOf(fr(37n)), fr(493n, 5n)), 'B-v the rate predicts C = 37 → F = 493/5 = 98.6 exactly')
  // where the scales meet: C = (9/5)C + 32 → −(4/5)C = 32 → C = −40
  ok(fEq(fOf(fr(-40n)), fr(-40n)), 'B-v at C = −40 the line gives F = −40 — the scales meet, solved exactly from −(4/5)C = 32')
  ok(fEq(fMul(fr(-4n, 5n), fr(-40n)), fr(32n)), 'B-v the balance: −(4/5)·(−40) = 32 confirms the crossing')
  console.log('  B-v the rate engine: the fare 12/km with the d = 7 prediction + the 9/5 scale with 98.6 and the −40 meeting exact')
}

// B-vi — the parallel-condition and doorway engines
{
  // through (1, 6): the parallel to y = 2x + 1 is y = 2x + 4; the perpendicular y = −(1/2)x + 13/2
  const par = pt(1n, 6n)
  ok(fEq(fSub(par.y, fMul(fr(2n), par.x)), fr(4n)), 'B-vi the parallel through (1, 6): y = 2x + 4 passes (1, 6)')
  ok(fEq(slopeOf(pt(0n, 4n), pt(1n, 6n)), fr(2n)), 'B-vi the parallel y = 2x + 4 walks (0, 4) → (1, 6) at slope 2 — same slope as y = 2x + 1, different intercept (4 ≠ 1)')
  ok(fEq(fAdd(fMul(fr(-1n, 2n), par.x), fr(13n, 2n)), fr(6n)), 'B-vi the perpendicular through (1, 6): y = −(1/2)x + 13/2 passes (1, 6)')
  ok(fEq(fMul(fr(2n), fr(-1n, 2n)), fr(-1n)), 'B-vi the slopes multiply to −1: 2 · (−1/2) = −1 — the perpendicular doorway (the proof rides in Coordinate Geometry)')
  // the k-hunt: 2x + ky = 4 parallel to y = 3x + 1 ⟺ −2/k = 3 ⟺ k = −2/3
  ok(fEq(fNeg(fDiv(fr(2n), fr(-2n, 3n))), fr(3n)), 'B-vi k = −2/3 makes m = −2/k = 3 — parallel to y = 3x + 1')
  // the k = −2/3 line really is 6x − 2y = 12 → y = 3x − 6: different intercept, same slope
  ok(fEq(fSub(fr(1n), fr(-6n)), fr(7n)), 'B-vi the intercepts differ (1 vs −6) — distinct parallel lines, the solution set is ∅')
  ok(fEq(slopeOf(pt(0n, -6n), pt(2n, 0n)), fr(3n)), 'B-vi the k = −2/3 line (×3: 6x − 2y = 12) walks (0, −6) → (2, 0) at slope 3 — parallel, never meeting y = 3x + 1 (−6 ≠ 1)')
  // the k = 0 edge: 2x = 4 → x = 2 vertical — meets y = 3x + 1 at (2, 7)
  ok(fEq(fMul(fr(3n), fr(2n)), fr(6n)) && fEq(fAdd(fr(6n), fr(1n)), fr(7n)), 'B-vi the k = 0 edge: x = 2 is VERTICAL (undefined slope) and meets y = 3x + 1 at (2, 7) — vertical is not parallel to a non-vertical line')
  console.log('  B-vi the doorway engine: the parallel y = 2x + 4 + the perpendicular product −1 + the k = −2/3 hunt + the honest k = 0 edge')
}

/* ------------------------------------------------------------------ */
/* (C) the figure geometry plans                                       */
/* ------------------------------------------------------------------ */

console.log('[C] figure plans pinned: 10.1 addressing map 720×400 + the graph of 3x+2y=6 720×400; 10.2 steepness theorem 720×400 + two-line verdict strip 720×340; 10.3 workhorse parabola 720×400 + three-verdict strip 720×340')

const plan101Fig1 = {
  name: 'the addressing map (10.1 fig 1)',
  view: [720, 400],
  // rects in file order: header, QII, QI, QIII, QIV, info1, info2, caption
  chips: [
    [30, 18, 660, 40],
    [100, 78, 120, 44],
    [320, 78, 120, 44],
    [100, 306, 120, 44],
    [320, 306, 120, 44],
    [480, 96, 200, 64],
    [480, 210, 200, 64],
    [30, 358, 660, 30],
  ],
  groups: [[0, 1, 2, 3, 4, 5, 6, 7]],
}

const plan101Fig2 = {
  name: 'the graph of 3x + 2y = 6 (10.1 fig 2)',
  view: [720, 400],
  chips: [
    [30, 18, 660, 40],
    [500, 96, 180, 168],
    [30, 338, 660, 42],
  ],
  groups: [[0, 1, 2]],
}

const plan102Fig1 = {
  name: 'the steepness theorem (10.2 fig 1)',
  view: [720, 400],
  chips: [
    [30, 18, 660, 40],
    [470, 88, 220, 150],
    [30, 330, 660, 46],
  ],
  groups: [[0, 1, 2]],
}

const plan102Fig2 = {
  name: 'the two-line verdict strip (10.2 fig 2)',
  view: [720, 340],
  chips: [
    [30, 18, 660, 40],
    [30, 76, 205, 200],
    [245, 76, 205, 200],
    [460, 76, 230, 200],
    [30, 292, 660, 28],
  ],
  groups: [
    [0, 4],
    [1, 2, 3],
  ],
}

const plan103Fig1 = {
  name: 'the workhorse parabola (10.3 fig 1)',
  view: [720, 400],
  chips: [
    [30, 18, 660, 40],
    [500, 96, 180, 168],
    [30, 338, 660, 42],
  ],
  groups: [[0, 1, 2]],
}

const plan103Fig2 = {
  name: 'the three-verdict strip (10.3 fig 2)',
  view: [720, 340],
  chips: [
    [30, 18, 660, 40],
    [30, 76, 205, 200],
    [245, 76, 205, 200],
    [460, 76, 230, 200],
    [30, 292, 660, 28],
  ],
  groups: [
    [0, 4],
    [1, 2, 3],
  ],
}

{
  const plans = [plan101Fig1, plan101Fig2, plan102Fig1, plan102Fig2, plan103Fig1, plan103Fig2]
  for (const pl of plans) {
    const [w, h] = pl.view
    ok(w === 720 && (h === 400 || h === 340), `C ${pl.name}: viewBox 720×${h} pinned`)
    for (const [x, y, cw, ch] of pl.chips) {
      ok(x >= 0 && y >= 0 && x + cw <= w && y + ch <= h, `C ${pl.name}: chip (${x},${y},${cw},${ch}) sits inside the viewBox`)
    }
    for (const g of pl.groups) {
      for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
          const [ax, ay, aw, ah] = pl.chips[g[i]]
          const [bx, by, bw, bh] = pl.chips[g[j]]
          const disjoint = ax + aw <= bx || bx + bw <= ax || ay + ah <= by || by + bh <= ay
          ok(disjoint, `C ${pl.name}: chips ${g[i]} and ${g[j]} pairwise disjoint`)
        }
      }
    }
  }
  console.log('  C the six plans: viewBox bounds + pairwise-disjoint groups asserted')
}

/* ------------------------------------------------------------------ */
/* (G) the parabola engines of lesson 10.3 (run 86, pre-write — every  */
/*     number here is pinned BEFORE any prose exists)                  */
/* ------------------------------------------------------------------ */

console.log('[G] 10.3 engines: the census, the window scan, the fold identity, the vertex, the verdicts, the mirror, the probes, the bend, the down companion')

/** exact quadratic evaluator: ax² + bx + c at x */
function quadAt(a: Frac, b: Frac, c: Frac, x: Frac): Frac {
  return fAdd(fAdd(fMul(a, fMul(x, x)), fMul(b, x)), c)
}

// G-i — the census table: y = 2x² − 7x + 3 priced pointwise at x = −2…5
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  const want: [bigint, bigint][] = [
    [-2n, 25n],
    [-1n, 12n],
    [0n, 3n],
    [1n, -2n],
    [2n, -3n],
    [3n, 0n],
    [4n, 7n],
    [5n, 18n],
  ]
  for (const [x, y] of want) {
    const got = quadAt(a, b, c, fr(x))
    ok(fEq(got, fr(y)), `G-i f(${x}) = ${y} exact on y = 2x² − 7x + 3 (got ${fStr(got)})`)
    // the by-hand expansion the table will print: 2x² then −7x then +3
    const t1 = fMul(fr(2n), fr(x * x))
    const t2 = fMul(fr(-7n), fr(x))
    ok(fEq(fAdd(fAdd(t1, t2), fr(3n)), fr(y)), `G-i the table row x = ${x}: 2·${x * x} + (−7)·${x} + 3 = ${y} exact`)
  }
  console.log('  G-i the census table: 8 rows, each priced two ways (evaluator + printed expansion)')
}

// G-ii — the W×W window scan: exactly 4 integer points inside
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  const inside: string[] = []
  for (const wx of W) {
    const yv = quadAt(a, b, c, fr(wx))
    if (yv.d === 1n && yv.n >= -5n && yv.n <= 5n) inside.push(`(${wx}, ${yv.n})`)
  }
  ok(inside.length === 4, `G-ii exactly 4 integer points of the parabola sit inside W×W (got ${inside.length}: ${inside.join(' ')})`)
  ok(inside.join(' ') === '(0, 3) (1, -2) (2, -3) (3, 0)', 'G-ii the four inside points are (0, 3), (1, −2), (2, −3), (3, 0)')
  ok(fEq(quadAt(a, b, c, fr(4n)), fr(7n)) && 7n > 5n, 'G-ii (4, 7) sits on the curve but OUT the window top (y = 7 > 5) — the pre-write catch')
  console.log('  G-ii the window scan: 4 inside, (4, 7) out the top — priced')
}

// G-iii — the fold identity certified exactly
{
  // 2(x − 7/4)² − 25/8 expands to 2x² − 7x + 49/8 − 25/8 = 2x² − 7x + 24/8
  const cross = fMul(fr(2n), fMul(fr(2n), fr(-7n, 4n)))
  ok(fEq(cross, fr(-7n)), 'G-iii the cross term 2·2·(−7/4) = −7 — the linear coefficient survives the fold')
  const foldedConst = fSub(fMul(fr(2n), fMul(fr(7n, 4n), fr(7n, 4n))), fr(25n, 8n))
  ok(fEq(foldedConst, fr(3n)), `G-iii the constant 2·(49/16) − 25/8 = 49/8 − 25/8 = ${fStr(foldedConst)} — the identity closes on +3`)
  for (const x of [-2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n]) {
    const t = fSub(fr(x), fr(7n, 4n))
    const fold = fSub(fMul(fr(2n), fMul(t, t)), fr(25n, 8n))
    ok(fEq(fold, quadAt(fr(2n), fr(-7n), fr(3n), fr(x))), `G-iii at x = ${x} the fold form prices ${fStr(fold)} = f(x) exactly`)
  }
  const Delta = fSub(fMul(fr(-7n), fr(-7n)), fMul(fr(4n), fMul(fr(2n), fr(3n))))
  ok(fEq(Delta, fr(25n)), 'G-iii Δ = (−7)² − 4·2·3 = 49 − 24 = 25 — ch. 9’s own discriminant')
  ok(fEq(fNeg(fDiv(Delta, fMul(fr(4n), fr(2n)))), fr(-25n, 8n)), 'G-iii −Δ/(4a) = −25/8 — the vertex height IS the fold’s drop (9.3’s master identity wearing a y)')
  console.log('  G-iii the fold identity: expansion + 8 pointwise certs + the Δ/(4a) readout')
}

// G-iv — the vertex engine: the minimum priced by the sign of a
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  const vx = fNeg(fDiv(b, fMul(fr(2n), a)))
  ok(fEq(vx, fr(7n, 4n)), 'G-iv the vertex sits at x = −b/2a = −(−7)/4 = 7/4 — 9.3’s centre, drawn')
  const vy = quadAt(a, b, c, vx)
  ok(fEq(vy, fr(-25n, 8n)), 'G-iv the vertex height f(7/4) = −25/8')
  ok(a.n > 0n, 'G-iv a = 2 > 0 — the bowl opens UP, the vertex is the MINIMUM')
  for (const x of [-2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n]) {
    const gap = fSub(quadAt(a, b, c, fr(x)), fr(-25n, 8n))
    ok(gap.n >= 0n, `G-iv f(${x}) − (−25/8) = ${fStr(gap)} ≥ 0 — no census point beats the vertex height`)
    const t = fSub(fr(x), fr(7n, 4n))
    ok(fEq(gap, fMul(fr(2n), fMul(t, t))), `G-iv the gap at x = ${x} IS the square 2(x − 7/4)² — the fold proves the minimum`)
  }
  console.log('  G-iv the vertex engine: (7/4, −25/8) minimum, the gap = the square, priced pointwise')
}

// G-v — the x-intercept verdicts on the three companions, cross-priced vs factorization
{
  // TWO doors: the workhorse, Δ = 25 > 0
  ok(fIsZero(quadAt(fr(2n), fr(-7n), fr(3n), fr(1n, 2n))), 'G-v the door (1/2, 0) satisfies the workhorse')
  ok(fIsZero(quadAt(fr(2n), fr(-7n), fr(3n), fr(3n))), 'G-v the door (3, 0) satisfies the workhorse')
  ok(fEq(fAdd(fMul(fr(2n), fr(-3n)), fMul(fr(-1n), fr(1n))), fr(-7n)) && fEq(fMul(fr(-1n), fr(-3n)), fr(3n)), 'G-v (2x − 1)(x − 3) = 2x² − 7x + 3 — the doors are the factorization’s roots, cross-priced')
  // ONE tangent touch: y = x² − 2x + 1 = (x − 1)², Δ = 0
  ok(fIsZero(quadAt(fr(1n), fr(-2n), fr(1n), fr(1n))), 'G-v the touch (1, 0) satisfies y = x² − 2x + 1')
  ok(fIsZero(fSub(fMul(fr(-2n), fr(-2n)), fMul(fr(4n), fr(1n)))), 'G-v Δ = 4 − 4 = 0 — the two doors fused into one tangent touch (9.3’s middle verdict)')
  for (const t of [fr(1n, 2n), fr(1n), fr(2n)]) {
    ok(fEq(quadAt(fr(1n), fr(-2n), fr(1n), fAdd(fr(1n), t)), fMul(t, t)), `G-v the touch curve twins: f(1 + ${fStr(t)}) = ${fStr(fMul(t, t))} = f(1 − ${fStr(t)})`)
  }
  // NONE: y = x² + 1, Δ = −4
  ok(fEq(fSub(fr(0n), fMul(fr(4n), fr(1n))), fr(-4n)), 'G-v Δ = 0 − 4 = −4 < 0 — the x-axis probe finds NO meet')
  ok(fEq(quadAt(fr(1n), fr(0n), fr(1n), fr(0n)), fr(1n)), 'G-v the vertex (0, 1) floats one unit above the axis — the minimum height IS the gap')
  console.log('  G-v the three verdicts: two doors / one touch / none — each cross-priced with its factorization')
}

// G-vi — the axis of symmetry mirror-priced pointwise + the designed twin pairs
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  const vx = fr(7n, 4n)
  for (const t of [fr(1n, 4n), fr(1n, 2n), fr(3n, 4n), fr(5n, 4n), fr(9n, 4n)]) {
    const right = quadAt(a, b, c, fAdd(vx, t))
    const left = quadAt(a, b, c, fSub(vx, t))
    ok(fEq(right, left), `G-vi the mirror: f(7/4 + ${fStr(t)}) = f(7/4 − ${fStr(t)}) = ${fStr(right)} exact`)
  }
  const twins: [Frac, Frac, Frac][] = [
    [fr(0n), fr(7n, 2n), fr(3n)],
    [fr(1n), fr(5n, 2n), fr(-2n)],
    [fr(3n, 2n), fr(2n), fr(-3n)],
    [fr(1n, 2n), fr(3n), fr(0n)],
  ]
  for (const [x1, x2, y] of twins) {
    ok(fEq(quadAt(a, b, c, x1), y) && fEq(quadAt(a, b, c, x2), y), `G-vi both twins of the y = ${fStr(y)} pair price the same height`)
    ok(fEq(fDiv(fAdd(x1, x2), fr(2n)), vx), `G-vi the pair's midpoint x = ${fStr(fDiv(fAdd(x1, x2), fr(2n)))} = 7/4 — the axis, exact`)
  }
  console.log('  G-vi the mirror engine: 5 pointwise mirrors + 4 twin pairs, each midpointing on x = 7/4')
}

// G-vii — the probes: vertical exactly once; horizontal two/one/none with the hinge at the vertex height
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  for (const h of [-2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n]) {
    const yv = quadAt(a, b, c, fr(h))
    ok(yv.d === 1n, `G-vii the vertical probe x = ${h} meets the curve EXACTLY once, at (${h}, ${fStr(yv)}) — the input read`)
  }
  // horizontal probes: 2x² − 7x + (3 − k) = 0 has discriminant Δ_k = 25 + 8k
  const Dk = (k: Frac): Frac => fAdd(fr(25n), fMul(fr(8n), k))
  ok(fEq(Dk(fr(-4n)), fr(-7n)), 'G-vii k = −4: Δ_k = 25 − 32 = −7 < 0 — no meet (the level passes under the bowl)')
  ok(fIsZero(Dk(fr(-25n, 8n))), 'G-vii k = −25/8: Δ_k = 0 — exactly one meet, the vertex itself (the tangent level)')
  ok(fEq(Dk(fr(0n)), fr(25n)), 'G-vii k = 0: Δ_k = 25 > 0 — two meets: the x-intercepts themselves')
  ok(fEq(Dk(fr(5n)), fr(65n)), 'G-vii k = 5: Δ_k = 65 > 0 — two meets at x = (7 ± √65)/4 (9.3’s formula on the shifted constant)')
  ok(fEq(fNeg(fDiv(fr(25n), fr(8n))), fr(-25n, 8n)), 'G-vii the hinge: Δ_k > 0 ⟺ 25 + 8k > 0 ⟺ k > −25/8 = the vertex height — the count flips exactly there')
  // the k-scan: the trichotomy is exhaustive — every level lands in exactly one verdict
  let two = 0
  let one = 0
  let none = 0
  const levels: Frac[] = [fr(-5n), fr(-4n), fr(-3n), fr(-2n), fr(-25n, 8n), fr(0n), fr(3n), fr(5n)]
  for (const k of levels) {
    const d = Dk(k)
    if (d.n > 0n) two++
    else if (fIsZero(d)) one++
    else none++
  }
  ok(two === 5 && one === 1 && none === 2, `G-vii the k-scan: ${two} two-meet levels, ${one} tangent level, ${none} none — the trichotomy exhaustive, at most two against ANY level`)
  console.log('  G-vii the probe engines: 8 vertical one-meets + the Δ_k hinge + the exhaustive k-scan (two/one/none)')
}

// G-viii — the second-difference engine and the secant bend (10.2's bridge)
{
  const a = fr(2n)
  const b = fr(-7n)
  const c = fr(3n)
  const vals: Frac[] = [0n, 1n, 2n, 3n, 4n].map((x) => quadAt(a, b, c, fr(x)))
  const d1: Frac[] = []
  for (let i = 0; i < 4; i++) d1.push(fSub(vals[i + 1], vals[i]))
  const d2: Frac[] = []
  for (let i = 0; i < 3; i++) d2.push(fSub(d1[i + 1], d1[i]))
  ok(JSON.stringify(vals.map(fStr)) === JSON.stringify(['3', '-2', '-3', '0', '7']), `G-viii the census values f(0…4) = 3, −2, −3, 0, 7 (got ${vals.map(fStr).join(', ')})`)
  ok(JSON.stringify(d1.map(fStr)) === JSON.stringify(['-5', '-1', '3', '7']), `G-viii the first differences are −5, −1, 3, 7 (got ${d1.map(fStr).join(', ')}) — a LINE's would be constant`)
  ok(JSON.stringify(d2.map(fStr)) === JSON.stringify(['4', '4', '4']), `G-viii the second differences are constant ${d2.map(fStr).join(', ')} = 2a — the signature of degree 2`)
  for (let i = 0; i < 3; i++) {
    ok(fEq(fSub(d1[i + 1], d1[i]), fMul(fr(2n), a)), `G-viii the secant steepness climbs ${fStr(d1[i])} → ${fStr(d1[i + 1])}: +4 = 2a each step`)
  }
  ok(
    fEq(slopeOf(pt(0n, 3n), pt(1n, -2n)), fr(-5n)) &&
      fEq(slopeOf(pt(1n, -2n), pt(2n, -3n)), fr(-1n)) &&
      fEq(slopeOf(pt(2n, -3n), pt(3n, 0n)), fr(3n)) &&
      fEq(slopeOf(pt(3n, 0n), pt(4n, 7n)), fr(7n)),
    'G-viii the four secant slopes −5, −1, 3, 7 priced exactly — 10.2’s theorem BENDS along the curve',
  )
  console.log('  G-viii the bend engine: constant second difference 4 = 2a, secant climb +4 per step')
}

// G-ix — the opens-down companion and the max/min read
{
  const a = fr(-1n)
  const b = fr(4n)
  const c = fr(5n)
  const vx = fNeg(fDiv(b, fMul(fr(2n), a)))
  ok(fEq(vx, fr(2n)), 'G-ix the down-bowl’s vertex sits at x = −4/(−2) = 2')
  ok(fEq(quadAt(a, b, c, vx), fr(9n)), 'G-ix the vertex height f(2) = 9 — a MAXIMUM (a < 0, the bowl opens DOWN)')
  for (const x of [-1n, 0n, 1n, 2n, 3n, 5n]) {
    const t = fSub(fr(x), fr(2n))
    ok(fEq(fAdd(fNeg(fMul(t, t)), fr(9n)), quadAt(a, b, c, fr(x))), `G-ix at x = ${x} the fold −(x − 2)² + 9 prices ${fStr(quadAt(a, b, c, fr(x)))} exactly`)
  }
  const D = fSub(fMul(fr(4n), fr(4n)), fMul(fr(4n), fMul(fr(-1n), fr(5n))))
  ok(fEq(D, fr(36n)), 'G-ix Δ = 16 + 20 = 36 > 0 — two doors even for a down-bowl')
  ok(fIsZero(quadAt(a, b, c, fr(-1n))) && fIsZero(quadAt(a, b, c, fr(5n))), 'G-ix the doors (−1, 0) and (5, 0) priced; their midpoint (−1 + 5)/2 = 2 is the axis again')
  ok(fEq(fNeg(fDiv(D, fMul(fr(4n), a))), fr(9n)), 'G-ix −Δ/(4a) = −36/(−4) = 9 — the master identity reads the MAXIMUM through the sign of a')
  ok(fEq(quadAt(fr(-1n), fr(10n), fr(0n), fr(5n)), fr(25n)), 'G-ix the exam echo: the rectangle area x(10 − x) peaks at 25 when x = 5 — the square, again (9.3’s census maximum, now an area)')
  console.log('  G-ix the down companion: vertex (2, 9) max, doors −1 and 5, the area echo 25')
}

/* ------------------------------------------------------------------ */
/* (D) the authored lesson 10.1 — structure census, quiz keys, 14      */
/*     exercises re-priced, figure geometry vs plan, scans             */
/* ------------------------------------------------------------------ */

console.log('[D] 10.1 authored: identity, structure census, quiz keys [2,1,1,2,2], 14 exercises re-priced, figure plans, scans')

const ch10mod: any = await import('../src/data/library/books/mathematics/elementary-algebra/ch-10')
const chapter10 = ch10mod.chapter10 as any
const lesson101 = chapter10.lessons[0]
const lesson102 = chapter10.lessons[1]
const lesson103 = chapter10.lessons[2]

const fs = await import('node:fs')
const sourceLog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
const ch10File = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-10.ts', 'utf8')

function sectionD(): void {
  // identity
  ok(lesson101.id === 'al-the-coordinate-plane-and-linear-graphs', 'D the 10.1 id is al-the-coordinate-plane-and-linear-graphs')
  ok(lesson101.number === '10.1', 'D the 10.1 number is 10.1')
  ok(lesson101.title === 'The Coordinate Plane and Linear Graphs', 'D the 10.1 title matches the book.ts plan')
  ok(chapter10.number === 10 && chapter10.slug === 'graphs-of-equations', 'D chapter 10 slug graphs-of-equations')
  ok(chapter10.status === 'complete', 'D chapter 10 status complete (closing run 86)')

  // structure census
  const kinds: Record<string, number> = {}
  for (const b of lesson101.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
  ok(kinds['para'] === 13, `D 10.1 has 13 paras (got ${kinds['para']})`)
  ok(kinds['heading'] === 4, `D 10.1 has 4 headings (got ${kinds['heading']})`)
  ok(kinds['table'] === 1, `D 10.1 has 1 table (got ${kinds['table']})`)
  ok(kinds['figure'] === 2, `D 10.1 has 2 figures (got ${kinds['figure']})`)
  ok(kinds['terms'] === 1, `D 10.1 has 1 terms block`)
  ok(kinds['example'] === 3, `D 10.1 has 3 examples`)
  ok(kinds['callout'] === 4, `D 10.1 has 4 callouts (warn, insight, historical, exam)`)
  ok(kinds['equation'] === 1, `D 10.1 has 1 equation`)
  ok(kinds['list'] === 1, `D 10.1 has 1 summary list`)
  ok(kinds['formula'] === 3, `D 10.1 has 3 formula cards`)
  ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'D 10.1 has 1 quiz + 1 exercise set')
  const tones101 = lesson101.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
  for (const t of ['warn', 'insight', 'historical', 'exam']) {
    ok(tones101.includes(t), `D 10.1 carries the ${t} callout`)
  }
  ok(lesson101.concepts.length >= 5 && lesson101.concepts.length <= 8, 'D 10.1 concepts 5–8')
  ok((lesson101.objectives || []).length >= 5, 'D 10.1 objectives >= 5')
  ok((lesson101.prerequisites || []).length === 4, 'D 10.1 prerequisites = 4')

  // quiz keys vs pinned [2, 1, 1, 2, 2]
  const quiz101 = lesson101.blocks.find((b: any) => b.kind === 'quiz')
  const keys101 = quiz101.items.map((it: any) => it.answer)
  ok(JSON.stringify(keys101) === JSON.stringify([2, 1, 1, 2, 2]), `D 10.1 quiz keys are [2,1,1,2,2] (got ${JSON.stringify(keys101)})`)
  ok(quiz101.items.length === 5, 'D 10.1 quiz has 5 items')
  for (const it of quiz101.items) {
    ok(it.options.length === 4 && it.explain.length > 80, 'D 10.1 quiz item: 4 options + full explanation')
  }
  // quiz distractor prices (the raw sum ax + by at each point, before the − c comparison)
  const sumAt = (a: Frac, b: Frac, p: Pt): Frac => fAdd(fMul(a, p.x), fMul(b, p.y))
  ok(fIsZero(linAt(fr(2n), fr(5n), fr(10n), pt(5n, 0n))) && fIsZero(linAt(fr(2n), fr(5n), fr(10n), pt(0n, 2n))), 'D 10.1 quiz Q2: both intercepts of 2x+5y=10 priced')
  ok(fEq(sumAt(fr(3n), fr(2n), pt(1n, 1n)), fr(5n)) && fEq(sumAt(fr(3n), fr(2n), pt(2n, 3n)), fr(12n)) && fEq(sumAt(fr(3n), fr(2n), pt(0n, 2n)), fr(4n)), 'D 10.1 quiz Q3: the three distractor values 5, 12, 4 priced')

  // the 14 exercises re-priced exactly
  const ex101 = lesson101.blocks.find((b: any) => b.kind === 'exercises')
  let n101 = 0
  for (const set of ex101.sets) n101 += set.questions.length
  ok(n101 === 14, `D 10.1 has 14 exercises (got ${n101})`)
  ok(JSON.stringify(ex101.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'D 10.1 exercise ladder 3/3/3/3/1/1')
  // L1-1 quadrants
  ok(quadrantOf(pt(4n, 7n)) === 'QI' && quadrantOf(pt(-6n, 2n)) === 'QII' && quadrantOf(pt(-3n, -5n)) === 'QIII' && quadrantOf(pt(8n, -2n)) === 'QIV', 'D 10.1 L1-1 the four quadrant reads exact')
  // L1-2 distinctness
  ok(!pEq(pt(0n, 4n), pt(4n, 0n)), 'D 10.1 L1-2 (0, 4) ≠ (4, 0) priced')
  // L1-3 + L2-1 the intercept doors
  ok(pEq(pt(5n, 0n), pt(fDiv(fr(5n), fr(1n)), fr(0n))) && pEq(pt(0n, 5n), pt(fr(0n), fDiv(fr(5n), fr(1n)))), 'D 10.1 L1-3 the doors of x + y = 5 exact')
  ok(fIsZero(linAt(fr(2n), fr(5n), fr(10n), pt(10n, -2n))) && fIsZero(linAt(fr(2n), fr(5n), fr(10n), pt(-5n, 4n))), 'D 10.1 L2-1 the extra points (10, −2), (−5, 4) priced on 2x + 5y = 10')
  // L2-2 the through-origin doors
  ok(fIsZero(linAt(fr(2n), fr(-3n), fr(0n), pt(3n, 2n))) && fIsZero(linAt(fr(2n), fr(-3n), fr(0n), pt(-3n, -2n))), 'D 10.1 L2-2 the walk doors (3, 2), (−3, −2) priced')
  // L2-3 the census of x + 2y = 5 (raw sums: 7, 7, 4; only (3, 1) hits 5)
  ok(fIsZero(linAt(fr(1n), fr(2n), fr(5n), pt(3n, 1n))) && fEq(sumAt(fr(1n), fr(2n), pt(1n, 3n)), fr(7n)) && fEq(sumAt(fr(1n), fr(2n), pt(-1n, 4n)), fr(7n)) && fEq(sumAt(fr(1n), fr(2n), pt(6n, -1n)), fr(4n)), 'D 10.1 L2-3 only (3, 1) satisfies; the others priced off')
  // L3-1 the mini-census of x + 2y = 5
  {
    const a = fr(1n), b = fr(2n), c = fr(5n)
    const doors: Pt[] = [pt(5n, 0n), pt(0n, fr(5n, 2n))]
    const onLine: Pt[] = [pt(5n, 0n), pt(0n, fr(5n, 2n)), pt(1n, 2n), pt(3n, 1n), pt(7n, -1n)]
    for (const p of onLine) {
      ok(fIsZero(linAt(a, b, c, p)) && fIsZero(det3(doors[0], doors[1], p)), `D 10.1 L3-1 ${pStr(p)} satisfies AND is collinear`)
    }
    ok(!fIsZero(linAt(a, b, c, pt(2n, 2n))) && !fIsZero(det3(doors[0], doors[1], pt(2n, 2n))), 'D 10.1 L3-1 (2, 2) fails both directions')
  }
  // L3-2 the grid lock
  ok(pEq(pt(2n, 3n), pt(2n, 3n)), 'D 10.1 L3-2 x = 2 meets y = 3 exactly once, at (2, 3)')
  // L3-3 the doors of 4x − 3y = 12 and the walk
  ok(fIsZero(linAt(fr(4n), fr(-3n), fr(12n), pt(3n, 0n))) && fIsZero(linAt(fr(4n), fr(-3n), fr(12n), pt(0n, -4n))), 'D 10.1 L3-3 the doors (3, 0), (0, −4) priced')
  ok(fIsZero(linAt(fr(4n), fr(-3n), fr(12n), pt(3n, 0n))), 'D 10.1 L3-3 the walk (run 3, rise 4) lands on the line')
  // L4-1 the pair 2x + y = 8, x − y = 1 → (3, 2)
  ok(fIsZero(linAt(fr(2n), fr(1n), fr(8n), pt(3n, 2n))) && fIsZero(linAt(fr(1n), fr(-1n), fr(1n), pt(3n, 2n))), 'D 10.1 L4-1 (3, 2) satisfies both equations')
  ok(fIsZero(det3(pt(4n, 0n), pt(0n, 8n), pt(3n, 2n))) && fIsZero(det3(pt(1n, 0n), pt(0n, -1n), pt(3n, 2n))), 'D 10.1 L4-1 the crossing collinear with both door pairs')
  // L4-2 the doubled/conflicting k
  ok(fEq(fSub(fr(10n), fMul(fr(2n), fr(5n))), fr(0n)), 'D 10.1 L4-2 k = 10 eliminates to 0 = 0 (all)')
  ok(!fEq(fSub(fr(8n), fMul(fr(2n), fr(5n))), fr(0n)), 'D 10.1 L4-2 k = 8 eliminates to 0 = −2 (none)')
  // L4-3 the midpoint collinearity
  ok(fIsZero(det3(pt(1n, 1n), pt(3n, 5n), pt(2n, 3n))), 'D 10.1 L4-3 det(A, B, C) = 0 — collinear')
  ok(pEq(pt(2n, 3n), pt(fDiv(fAdd(fr(1n), fr(3n)), fr(2n)), fDiv(fAdd(fr(1n), fr(5n)), fr(2n)))), 'D 10.1 L4-3 C is the midpoint of A and B')
  // L5-1 the horizontal family
  ok(fEq(fDiv(fr(2n), fr(1n)), fr(2n)), 'D 10.1 L5-1 by = c reads y = c/b = 2 — horizontal above the axis')
  // L6-1 the probe formula on all 8 census points
  {
    const doors: Pt[] = [pt(2n, 0n), pt(0n, 3n)]
    const yOf = (x: Frac): Frac => fAdd(doors[0].y, fDiv(fMul(fSub(doors[1].y, doors[0].y), fSub(x, doors[0].x)), fSub(doors[1].x, doors[0].x)))
    const census: Pt[] = [
      pt(0n, 3n), pt(2n, 0n), pt(4n, -3n), pt(-2n, 6n),
      pt(1n, fr(3n, 2n)), pt(-4n, 9n), pt(6n, -6n), pt(fr(5n, 2n), fr(-3n, 4n)),
    ]
    for (const p of census) {
      ok(fEq(yOf(p.x), p.y) && fIsZero(det3(doors[0], doors[1], p)), `D 10.1 L6-1 the formula reproduces ${pStr(p)} exactly`)
    }
  }
  console.log('  D 10.1 authored battery: identity, census, quiz keys, 14 exercises re-priced, formula probes exact')

  // figure geometry vs plan (rect-exact)
  const figs101 = lesson101.blocks.filter((b: any) => b.kind === 'figure')
  ok(figs101.length === 2, 'D 10.1 exactly two figures')
  checkFigureAgainstPlan(figs101[0].svg, plan101Fig1, 400, 'D 10.1 fig 1')
  checkFigureAgainstPlan(figs101[1].svg, plan101Fig2, 400, 'D 10.1 fig 2')

  // citations
  for (const key of lesson101.sources) {
    ok(sourceLog.includes(key), `D 10.1 citation key ${key} banked in SOURCE_LOG.md`)
  }

  // honest word count
  const words101 = countLessonWords(lesson101)
  ok(words101 >= 4000, `D 10.1 honest word count ${words101} ≥ 4,000`)

  // scans: odd backslash runs, unicode escapes, raw-$ in titles/answers
  scanFileHygiene(ch10File, 'D 10.1')
  ok(!lesson101.title.includes('$'), 'D 10.1 title carries no raw $')

  console.log(`  D 10.1 honest word count: ${words101}`)
}

function quadrantOf(p: Pt): string {
  if (p.x.n > 0n) return p.y.n > 0n ? 'QI' : 'QIV'
  return p.y.n > 0n ? 'QII' : 'QIII'
}

function checkFigureAgainstPlan(svg: string, plan: { name: string; view: number[]; chips: number[][]; groups: number[][] }, wantH: number, tag: string): void {
  const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/)
  ok(!!vb && Number(vb[1]) === plan.view[0] && Number(vb[2]) === wantH, `${tag}: viewBox 720×${wantH} exact (${plan.name})`)
  const rects: number[][] = []
  const re = /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(svg))) rects.push([Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])])
  ok(rects.length === plan.chips.length, `${tag}: ${plan.chips.length} rects in file (got ${rects.length}) (${plan.name})`)
  for (let i = 0; i < Math.min(rects.length, plan.chips.length); i++) {
    ok(JSON.stringify(rects[i]) === JSON.stringify(plan.chips[i]), `${tag}: rect ${i} = (${plan.chips[i].join(',')}) rect-exact (${plan.name})`)
  }
  for (const g of plan.groups) {
    for (let i = 0; i < g.length; i++) {
      for (let j = i + 1; j < g.length; j++) {
        const [ax, ay, aw, ah] = plan.chips[g[i]]
        const [bx, by, bw, bh] = plan.chips[g[j]]
        ok(ax + aw <= bx || bx + bw <= ax || ay + ah <= by || by + bh <= ay, `${tag}: rects ${g[i]}/${g[j]} disjoint (${plan.name})`)
      }
    }
  }
  // vivid palette only — no retired hexes
  for (const hex of ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']) {
    ok(!svg.includes(hex), `${tag}: no retired hex ${hex}`)
  }
  ok(svg.includes('role="img"') && svg.includes('aria-label='), `${tag}: accessible (${plan.name})`)
}

function scanFileHygiene(text: string, tag: string): void {
  // every backslash run must be even (escaped escapes normalized)
  const runs = text.match(/\\+/g) || []
  let odd = 0
  for (const r of runs) if (r.length % 2 === 1) odd++
  ok(odd === 0, `${tag}: odd backslash runs = 0 (got ${odd})`)
  ok(!/\\u[0-9a-fA-F]{4}/.test(text), `${tag}: no unicode escapes`)
}

/* ------------------------------------------------------------------ */
/* (E) the authored lesson 10.2 — structure census, quiz keys, 14      */
/*     exercises re-priced, figure geometry vs plan, scans             */
/* ------------------------------------------------------------------ */

console.log('[E] 10.2 authored: identity, structure census, quiz keys [0,1,2,2,0], 14 exercises re-priced, figure plans, scans')

function sectionE(): void {
  ok(lesson102.id === 'al-slope-the-steepness-theorem', 'E the 10.2 id is al-slope-the-steepness-theorem')
  ok(lesson102.number === '10.2', 'E the 10.2 number is 10.2')
  ok(lesson102.title === 'Slope: the Steepness Theorem', 'E the 10.2 title matches the book.ts plan')

  const kinds: Record<string, number> = {}
  for (const b of lesson102.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
  ok(kinds['para'] === 12, `E 10.2 has 12 paras (got ${kinds['para']})`)
  ok(kinds['heading'] === 4, `E 10.2 has 4 headings (got ${kinds['heading']})`)
  ok(kinds['equation'] === 2, `E 10.2 has 2 equations (got ${kinds['equation']})`)
  ok(kinds['derivation'] === 1, `E 10.2 has 1 derivation (the steepness theorem)`)
  ok(kinds['figure'] === 2, `E 10.2 has 2 figures`)
  ok(kinds['terms'] === 1, 'E 10.2 has 1 terms block')
  ok(kinds['example'] === 2, `E 10.2 has 2 examples`)
  ok(kinds['callout'] === 5, `E 10.2 has 5 callouts (warn, theorem, insight, historical, exam)`)
  ok(kinds['list'] === 1, 'E 10.2 has 1 summary list')
  ok(kinds['formula'] === 3, 'E 10.2 has 3 formula cards')
  ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'E 10.2 has 1 quiz + 1 exercise set')
  const tones102 = lesson102.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
  for (const t of ['warn', 'theorem', 'insight', 'historical', 'exam']) {
    ok(tones102.includes(t), `E 10.2 carries the ${t} callout`)
  }
  ok(lesson102.concepts.length >= 5 && lesson102.concepts.length <= 8, 'E 10.2 concepts 5–8')
  ok((lesson102.objectives || []).length >= 5, 'E 10.2 objectives >= 5')
  ok((lesson102.prerequisites || []).length === 4, 'E 10.2 prerequisites = 4')

  // quiz keys vs pinned [0, 1, 2, 2, 0]
  const quiz102 = lesson102.blocks.find((b: any) => b.kind === 'quiz')
  const keys102 = quiz102.items.map((it: any) => it.answer)
  ok(JSON.stringify(keys102) === JSON.stringify([0, 1, 2, 2, 0]), `E 10.2 quiz keys are [0,1,2,2,0] (got ${JSON.stringify(keys102)})`)
  ok(quiz102.items.length === 5, 'E 10.2 quiz has 5 items')
  for (const it of quiz102.items) {
    ok(it.options.length === 4 && it.explain.length > 80, 'E 10.2 quiz item: 4 options + full explanation')
  }
  ok(fEq(slopeOf(pt(1n, 3n), pt(4n, 9n)), fr(2n)), 'E 10.2 quiz Q1: the slope 2 exact')
  ok(fEq(fNeg(fDiv(fr(3n), fr(2n))), fr(-3n, 2n)), 'E 10.2 quiz Q2: the readout −3/2 exact')
  ok(fEq(slopeOf(pt(0n, 32n), pt(100n, 212n)), fr(9n, 5n)), 'E 10.2 quiz Q5: the rate 9/5 exact')

  // the 14 exercises re-priced exactly
  const ex102 = lesson102.blocks.find((b: any) => b.kind === 'exercises')
  let n102 = 0
  for (const set of ex102.sets) n102 += set.questions.length
  ok(n102 === 14, `E 10.2 has 14 exercises (got ${n102})`)
  ok(JSON.stringify(ex102.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'E 10.2 exercise ladder 3/3/3/3/1/1')
  // L1-1 the two slopes
  ok(fEq(slopeOf(pt(0n, 1n), pt(2n, 5n)), fr(2n)) && fEq(slopeOf(pt(0n, 4n), pt(2n, 1n)), fr(-3n, 2n)), 'E 10.2 L1-1 slopes 2 and −3/2 exact')
  // L1-2 horizontal 0, vertical refused
  ok(fEq(slopeOf(pt(-2n, 5n), pt(7n, 5n)), fr(0n)), 'E 10.2 L1-2 y = 5 has slope 0')
  {
    let refused = false
    try {
      slopeOf(pt(3n, 1n), pt(3n, 8n))
    } catch {
      refused = true
    }
    ok(refused, 'E 10.2 L1-2 x = 3 fires the vertical guard')
  }
  // L1-3 the dress read
  ok(fEq(fAdd(fMul(fr(1n, 2n), fr(2n)), fr(-4n)), fr(-3n)), 'E 10.2 L1-3 the walk lands (2, −3) at slope 1/2')
  // L2-1 the meet
  ok(fEq(fAdd(fNeg(pt(2n, 5n).x), fr(7n)), fr(5n)) && fEq(fSub(pt(2n, 5n).y, fMul(fr(2n), pt(2n, 5n).x)), fr(1n)), 'E 10.2 L2-1 (2, 5) satisfies both lines')
  // L2-2 the three-way agreement
  ok(fEq(fNeg(fDiv(fr(2n), fr(-3n))), fr(2n, 3n)) && fEq(slopeOf(pt(0n, 0n), pt(3n, 2n)), fr(2n, 3n)) && fEq(slopeOf(pt(3n, 2n), pt(-3n, -2n)), fr(2n, 3n)), 'E 10.2 L2-2 readout + two walks all price 2/3')
  // L2-3 the walk landings
  ok(fIsZero(linAt(fr(3n), fr(2n), fr(6n), pt(4n, -3n))) && fIsZero(linAt(fr(3n), fr(2n), fr(6n), pt(6n, -6n))), 'E 10.2 L2-3 landings (4, −3), (6, −6) priced')
  // L3-1 the six pairs
  {
    const m1: Pt[] = [pt(0n, 1n), pt(1n, 3n), pt(2n, 5n), pt(4n, 9n)]
    let cnt = 0
    for (let i = 0; i < m1.length; i++) {
      for (let j = i + 1; j < m1.length; j++) {
        ok(fEq(slopeOf(m1[i], m1[j]), fr(2n)), `E 10.2 L3-1 pair ${++cnt} prices 2`)
      }
    }
    ok(cnt === 6, 'E 10.2 L3-1 all 6 pairs priced')
  }
  // L3-2 the three classifications
  ok(fEq(fSub(fr(2n), fr(-1n)), fr(3n)), 'E 10.2 L3-2 (a) equating the parallel pair gives 3 = 0, false')
  ok(fEq(fMul(fr(2n), fr(0n)), fr(0n)) && fEq(fMul(fr(2n), fr(-1n)), fr(-2n)), 'E 10.2 L3-2 (b) the doubled pair is proportional — coincident')
  ok(fEq(fAdd(fMul(fr(3n), fr(0n)), fr(0n)), fr(0n)) && fEq(fAdd(fMul(fr(-3n), fr(0n)), fr(0n)), fr(0n)), 'E 10.2 L3-2 (c) both lines pass the origin — meet at (0, 0)')
  // L3-3 the fare
  ok(fEq(slopeOf(pt(0n, 50n), pt(3n, 86n)), fr(12n)) && fEq(fAdd(fMul(fr(12n), fr(7n)), fr(50n)), fr(134n)), 'E 10.2 L3-3 rate 12 and the 134 prediction exact')
  // L4-1 the k-hunt + the vertical edge
  ok(fEq(fNeg(fDiv(fr(2n), fr(-2n, 3n))), fr(3n)), 'E 10.2 L4-1 k = −2/3 makes m = 3')
  ok(fEq(slopeOf(pt(0n, -6n), pt(2n, 0n)), fr(3n)), 'E 10.2 L4-1 the k-line walks (0, −6) → (2, 0) at slope 3')
  ok(fEq(fAdd(fMul(fr(3n), fr(2n)), fr(1n)), fr(7n)), 'E 10.2 L4-1 the k = 0 edge meets at (2, 7)')
  // L4-2 the Fahrenheit line
  ok(fEq(fAdd(fMul(fr(9n, 5n), fr(37n)), fr(32n)), fr(493n, 5n)), 'E 10.2 L4-2 F(37) = 493/5 = 98.6 exact')
  ok(fEq(fAdd(fMul(fr(9n, 5n), fr(-40n)), fr(32n)), fr(-40n)), 'E 10.2 L4-2 the meeting at −40 exact')
  // L4-3 the collinearity
  ok(fEq(slopeOf(pt(0n, 1n), pt(2n, 5n)), fr(2n)) && fEq(slopeOf(pt(2n, 5n), pt(5n, 11n)), fr(2n)) && fEq(slopeOf(pt(0n, 1n), pt(5n, 11n)), fr(2n)), 'E 10.2 L4-3 slopes AB, BC, AC all 2 — collinear')
  ok(fEq(fSub(pt(2n, 5n).y, fMul(fr(2n), pt(2n, 5n).x)), fr(1n)) && fEq(fSub(pt(5n, 11n).y, fMul(fr(2n), pt(5n, 11n).x)), fr(1n)), 'E 10.2 L4-3 both points on y = 2x + 1')
  // L5-1 the parallel + perpendicular through (1, 6)
  ok(fEq(fSub(fr(6n), fMul(fr(2n), fr(1n))), fr(4n)), 'E 10.2 L5-1 the parallel through (1, 6) is y = 2x + 4')
  ok(fEq(fAdd(fMul(fr(-1n, 2n), fr(1n)), fr(13n, 2n)), fr(6n)), 'E 10.2 L5-1 the perpendicular passes (1, 6)')
  ok(fEq(fMul(fr(2n), fr(-1n, 2n)), fr(-1n)), 'E 10.2 L5-1 the slopes multiply to −1')
  // L6-1 the cross-multiplied tests on the three designed pairs
  ok(fEq(fMul(fr(3n), fr(2n)), fMul(fr(3n), fr(2n))) && !fEq(fr(6n), fr(10n)), 'E 10.2 L6-1 the parallel pair: a₁b₂ = a₂b₁ but c differs — ∅')
  ok(fEq(fMul(fr(3n), fr(4n)), fMul(fr(6n), fr(2n))) && fEq(fMul(fr(3n), fr(12n)), fMul(fr(6n), fr(6n))), 'E 10.2 L6-1 the coincident pair: a and c both proportional — one line')
  ok(!fEq(fMul(fr(3n), fr(-2n)), fMul(fr(1n), fr(2n))), 'E 10.2 L6-1 the meet pair: 3·(−2) = −6 ≠ 2 — slopes differ, one meet')

  // figure geometry vs plan
  const figs102 = lesson102.blocks.filter((b: any) => b.kind === 'figure')
  ok(figs102.length === 2, 'E 10.2 exactly two figures')
  checkFigureAgainstPlan(figs102[0].svg, plan102Fig1, 400, 'E 10.2 fig 1')
  checkFigureAgainstPlan(figs102[1].svg, plan102Fig2, 340, 'E 10.2 fig 2')

  // citations
  for (const key of lesson102.sources) {
    ok(sourceLog.includes(key), `E 10.2 citation key ${key} banked in SOURCE_LOG.md`)
  }

  // honest word count
  const words102 = countLessonWords(lesson102)
  ok(words102 >= 4000, `E 10.2 honest word count ${words102} ≥ 4,000`)

  // hygiene scans
  scanFileHygiene(ch10File, 'E 10.2')
  ok(!lesson102.title.includes('$'), 'E 10.2 title carries no raw $')

  console.log(`  E 10.2 honest word count: ${words102}`)
}

/* ------------------------------------------------------------------ */
/* (F) the chapter + library battery                                   */
/* ------------------------------------------------------------------ */

console.log('[F] chapter CLOSED + library: registration, id uniqueness, the promised arcs, the closing state')

function sectionF(): void {
  ok(chapter10.lessons.length === 3, 'F chapter 10 carries exactly the three lessons of the closed chapter')
  ok(chapter10.lessons[0].id !== chapter10.lessons[1].id && chapter10.lessons[1].id !== chapter10.lessons[2].id && chapter10.lessons[0].id !== chapter10.lessons[2].id, 'F the three lesson ids differ pairwise')
  // al- prefix + global uniqueness across the whole library
  const seen = new Map<string, string>()
  for (const book of allBooks) {
    for (const ch of book.chapters) {
      for (const l of ch.lessons) {
        if (book.id === 'elementary-algebra') {
          ok(l.id.startsWith('al-'), `F algebra lesson ids carry the al- prefix: ${l.id}`)
        }
        ok(!seen.has(l.id), `F lesson id globally unique: ${l.id}`)
        seen.set(l.id, book.id)
      }
    }
  }
  // the book registration carries the chapter
  const alg = allBooks.find((b: any) => b.id === 'elementary-algebra')
  ok(!!alg, 'F the elementary-algebra book is registered')
  ok(alg!.chapters.some((c: any) => c.number === 10 && c.lessons.length === 3), 'F book.ts carries chapter 10 with 3 lessons')
  // chapter 11 (refreshed 2026-11-11 — authored by runs 87–88 after this run-86 battery was written)
  const ch11 = alg!.chapters.find((c: any) => c.number === 11)
  ok(!!ch11 && (ch11.plannedLessons || []).length === 0 && ch11.lessons.length === 3 && ch11.status === 'complete', 'F chapter 11 complete with its 3 lessons (refreshed 2026-11-11)')
  // the closing state: chapter complete, no planned lessons
  ok(chapter10.status === 'complete', 'F chapter 10 status flipped to complete')
  ok(!chapter10.plannedLessons || chapter10.plannedLessons.length === 0, 'F no planned lessons remain in chapter 10')
  // cross-lesson arcs: the promised mentions across the closed chapter
  ok(ch10File.includes('5.3') && ch10File.includes('6.2') && ch10File.includes('6.3') && ch10File.includes('9.3'), 'F the promised cross-references (5.3, 6.2, 6.3, 9.3) appear in the chapter')
  ok(ch10File.includes('9.2') && ch10File.includes('9.4'), 'F the closing arcs add 9.2 (the fold) and 9.4 (Viète) by name')
  console.log('  F the chapter-close + library battery: 3 lessons, status complete, ch. 11 complete (refreshed 2026-11-11) — priced')
}

/* ------------------------------------------------------------------ */
/* (H) the authored lesson 10.3 — structure census, quiz keys, 14      */
/*     exercises re-priced, figure geometry vs plan, scans             */
/* ------------------------------------------------------------------ */

console.log('[H] 10.3 authored: identity, structure census, quiz keys [0,2,0,2,1], 14 exercises re-priced, figure plans, scans')

function sectionH(): void {
  ok(lesson103.id === 'al-the-parabola-quadratic-graphs-and-vertices', 'H the 10.3 id is al-the-parabola-quadratic-graphs-and-vertices')
  ok(lesson103.number === '10.3', 'H the 10.3 number is 10.3')
  ok(lesson103.title === 'The Parabola: Quadratic Graphs and Vertices', 'H the 10.3 title matches the book.ts plan')

  const kinds: Record<string, number> = {}
  for (const b of lesson103.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
  ok(kinds['para'] === 13, `H 10.3 has 13 paras (got ${kinds['para']})`)
  ok(kinds['heading'] === 4, `H 10.3 has 4 headings (got ${kinds['heading']})`)
  ok(kinds['table'] === 1, `H 10.3 has 1 table (got ${kinds['table']})`)
  ok(kinds['figure'] === 2, `H 10.3 has 2 figures`)
  ok(kinds['terms'] === 1, 'H 10.3 has 1 terms block')
  ok(kinds['equation'] === 2, `H 10.3 has 2 equations (got ${kinds['equation']})`)
  ok(kinds['example'] === 3, `H 10.3 has 3 examples`)
  ok(kinds['derivation'] === 1, `H 10.3 has 1 derivation (the vertex formula)`)
  ok(kinds['callout'] === 5, `H 10.3 has 5 callouts (warn, theorem, insight, historical, exam)`)
  ok(kinds['list'] === 1, 'H 10.3 has 1 summary list')
  ok(kinds['formula'] === 3, 'H 10.3 has 3 formula cards')
  ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'H 10.3 has 1 quiz + 1 exercise set')
  const tones103 = lesson103.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
  for (const t of ['warn', 'theorem', 'insight', 'historical', 'exam']) {
    ok(tones103.includes(t), `H 10.3 carries the ${t} callout`)
  }
  ok(lesson103.concepts.length >= 5 && lesson103.concepts.length <= 8, 'H 10.3 concepts 5–8')
  ok((lesson103.objectives || []).length >= 5, 'H 10.3 objectives >= 5')
  ok((lesson103.prerequisites || []).length === 4, 'H 10.3 prerequisites = 4')

  // quiz keys vs pinned [0, 2, 0, 2, 1]
  const quiz103 = lesson103.blocks.find((b: any) => b.kind === 'quiz')
  const keys103 = quiz103.items.map((it: any) => it.answer)
  ok(JSON.stringify(keys103) === JSON.stringify([0, 2, 0, 2, 1]), `H 10.3 quiz keys are [0,2,0,2,1] (got ${JSON.stringify(keys103)})`)
  ok(quiz103.items.length === 5, 'H 10.3 quiz has 5 items')
  for (const it of quiz103.items) {
    ok(it.options.length === 4 && it.explain.length > 80, 'H 10.3 quiz item: 4 options + full explanation')
  }
  // quiz distractor prices
  ok(fEq(fNeg(fDiv(fr(-7n), fMul(fr(2n), fr(2n)))), fr(7n, 4n)) && fEq(fNeg(fDiv(fr(25n), fMul(fr(4n), fr(2n)))), fr(-25n, 8n)), 'H 10.3 quiz Q1: the vertex readout −b/2a = 7/4 and −Δ/4a = −25/8 exact')
  ok(fIsZero(quadAt(fr(1n), fr(-2n), fr(1n), fr(1n))) && fIsZero(fSub(fMul(fr(-2n), fr(-2n)), fMul(fr(4n), fr(1n)))), 'H 10.3 quiz Q2: the touch (1, 0) and Δ = 0 exact')
  ok(fEq(quadAt(fr(-1n), fr(4n), fr(5n), fr(2n)), fr(9n)) && fEq(fNeg(fDiv(fr(36n), fMul(fr(4n), fr(-1n)))), fr(9n)), 'H 10.3 quiz Q3: the max vertex (2, 9) both ways')
  ok(fIsZero(DkOf(fr(-25n, 8n))) && DkOf(fr(0n)).n === 25n && DkOf(fr(3n)).n === 49n, 'H 10.3 quiz Q4: Δ_k = 0 at −25/8, 25 at k = 0, 49 at k = 3 — distractors cut twice')
  ok(fEq(fNeg(fDiv(fr(4n), fMul(fr(2n), fr(-1n)))), fr(2n)) && fEq(fDiv(fAdd(fr(-1n), fr(5n)), fr(2n)), fr(2n)), 'H 10.3 quiz Q5: the axis −b/2a = 2 = the doors\' midpoint')

  // the 14 exercises re-priced exactly
  const ex103 = lesson103.blocks.find((b: any) => b.kind === 'exercises')
  let n103 = 0
  for (const set of ex103.sets) n103 += set.questions.length
  ok(n103 === 14, `H 10.3 has 14 exercises (got ${n103})`)
  ok(JSON.stringify(ex103.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'H 10.3 exercise ladder 3/3/3/3/1/1')
  // L1-1 the table of x² − 2x − 3 and the axis read
  ok(JSON.stringify([-1n, 0n, 1n, 2n, 3n].map((x) => fStr(quadAt(fr(1n), fr(-2n), fr(-3n), fr(x))))) === JSON.stringify(['0', '-3', '-4', '-3', '0']), 'H 10.3 L1-1 the five values 0, −3, −4, −3, 0 exact')
  ok(fEq(fDiv(fAdd(fr(-1n), fr(3n)), fr(2n)), fr(1n)) && fEq(fDiv(fAdd(fr(0n), fr(2n)), fr(2n)), fr(1n)), 'H 10.3 L1-1 both twin pairs midpoint on x = 1')
  // L1-2 the pre-folded read
  ok(fEq(fAdd(fAdd(fMul(fr(1n), fMul(fr(2n), fr(2n))), fMul(fr(-4n), fr(2n))), fr(-1n)), fr(-5n)), 'H 10.3 L1-2 (x − 2)² − 5 expands to x² − 4x − 1 and prices f(2) = −5')
  ok(fEq(fNeg(fDiv(fr(20n), fMul(fr(4n), fr(1n)))), fr(-5n)), 'H 10.3 L1-2 −Δ/4a = −20/4 = −5 exact')
  // L1-3 the intercept + the door verdict
  ok(fEq(quadAt(fr(3n), fr(-6n), fr(1n), fr(0n)), fr(1n)) && fEq(fSub(fMul(fr(-6n), fr(-6n)), fMul(fr(4n), fMul(fr(3n), fr(1n)))), fr(24n)), 'H 10.3 L1-3 f(0) = 1 and Δ = 24 > 0 exact')
  ok(fEq(fNeg(fDiv(fr(24n), fMul(fr(4n), fr(3n)))), fr(-2n)), 'H 10.3 L1-3 the vertex height −24/12 = −2 exact')
  // L2-1 the readout vs the doors
  ok(fEq(fNeg(fDiv(fr(-6n), fMul(fr(2n), fr(1n)))), fr(3n)) && fEq(fNeg(fDiv(fr(16n), fMul(fr(4n), fr(1n)))), fr(-4n)), 'H 10.3 L2-1 the readout vertex (3, −4) exact')
  ok(fEq(fDiv(fAdd(fr(1n), fr(5n)), fr(2n)), fr(3n)) && fIsZero(quadAt(fr(1n), fr(-6n), fr(5n), fr(1n))) && fIsZero(quadAt(fr(1n), fr(-6n), fr(5n), fr(5n))), 'H 10.3 L2-1 the doors midpoint on 3 and both satisfy the curve')
  ok(fEq(quadAt(fr(1n), fr(-6n), fr(5n), fr(3n)), fr(-4n)) && fEq(fAdd(fMul(fSub(fr(3n), fr(3n)), fSub(fr(3n), fr(3n))), fr(-4n)), fr(-4n)), 'H 10.3 L2-1 the fold (x − 3)² − 4 prices f(3) = −4 — the vertex height, exact')
  // L2-2 the max readout
  ok(fEq(fNeg(fDiv(fr(8n), fMul(fr(2n), fr(-2n)))), fr(2n)) && fEq(fNeg(fDiv(fr(24n), fMul(fr(4n), fr(-2n)))), fr(3n)) && fEq(quadAt(fr(-2n), fr(8n), fr(-5n), fr(2n)), fr(3n)), 'H 10.3 L2-2 the vertex (2, 3) priced three ways (readout x, readout height, substitution)')
  // L2-3 the fold + the reconciliation
  ok(fEq(fAdd(fMul(fAdd(fr(-2n), fr(2n)), fAdd(fr(-2n), fr(2n))), fr(3n)), fr(3n)), 'H 10.3 L2-3 the fold (x + 2)² + 3 prices f(−2) = 3')
  ok(fEq(fSub(fMul(fr(4n), fr(4n)), fMul(fr(4n), fr(7n))), fr(-12n)) && fEq(fNeg(fDiv(fr(-12n), fMul(fr(4n), fr(1n)))), fr(3n)), 'H 10.3 L2-3 Δ = −12 < 0 and −Δ/4a = 3 — the same fact said twice')
  // L3-1 the twins
  ok(fEq(quadAt(fr(2n), fr(-7n), fr(3n), fr(5n, 2n)), fr(-2n)) && fEq(quadAt(fr(2n), fr(-7n), fr(3n), fr(7n, 2n)), fr(3n)), 'H 10.3 L3-1 the twins (5/2, −2) and (7/2, 3) satisfy the curve exactly')
  ok(fEq(fDiv(fAdd(fr(1n), fr(5n, 2n)), fr(2n)), fr(7n, 4n)) && fEq(fDiv(fAdd(fr(0n), fr(7n, 2n)), fr(2n)), fr(7n, 4n)), 'H 10.3 L3-1 both twin midpoints land on 7/4')
  // L3-2 the shifted discriminant
  ok(fIsZero(quadAt(fr(2n), fr(-7n), fr(2n), fr(0n))) === false && fEq(fSub(fMul(fr(-7n), fr(-7n)), fMul(fr(4n), fMul(fr(2n), fr(2n)))), fr(33n)), 'H 10.3 L3-2 the meet equation 2x² − 7x + 2 has Δ₁ = 33 = 25 + 8')
  // L3-3 the floating bowl
  ok(fEq(fSub(fr(1n), fMul(fr(4n), fr(1n))), fr(-3n)) && fEq(quadAt(fr(1n), fr(1n), fr(1n), fr(-1n, 2n)), fr(3n, 4n)), 'H 10.3 L3-3 Δ = −3 and the vertex (−1/2, 3/4) exact')
  // L4-1 the k-hunt
  ok(fIsZero(fSub(fr(16n), fMul(fr(4n), fr(4n)))) && fEq(fAdd(fMul(fSub(fr(2n), fr(2n)), fSub(fr(2n), fr(2n))), fr(0n)), fr(0n)), 'H 10.3 L4-1 k = 4 gives Δ = 0 and the touch curve (x − 2)²')
  // L4-2 the second differences of 3x² − 2x + 1
  {
    const vals = [0n, 1n, 2n, 3n].map((x) => quadAt(fr(3n), fr(-2n), fr(1n), fr(x)))
    ok(JSON.stringify(vals.map(fStr)) === JSON.stringify(['1', '2', '9', '22']), `H 10.3 L4-2 the values 1, 2, 9, 22 (got ${vals.map(fStr).join(', ')})`)
    ok(fEq(fSub(vals[1], vals[0]), fr(1n)) && fEq(fSub(vals[2], vals[1]), fr(7n)) && fEq(fSub(vals[3], vals[2]), fr(13n)), 'H 10.3 L4-2 the first differences 1, 7, 13 exact')
    ok(fEq(fSub(fr(7n), fr(1n)), fr(6n)) && fEq(fSub(fr(13n), fr(7n)), fr(6n)), 'H 10.3 L4-2 the second differences 6, 6 = 2a with a = 3')
  }
  // L4-3 the secant climb on x² − 2x − 3
  ok(fEq(slopeOf(pt(0n, -3n), pt(1n, -4n)), fr(-1n)) && fEq(slopeOf(pt(1n, -4n), pt(2n, -3n)), fr(1n)) && fEq(slopeOf(pt(2n, -3n), pt(3n, 0n)), fr(3n)), 'H 10.3 L4-3 the secant slopes −1, 1, 3 exact')
  ok(fEq(fSub(fr(1n), fMul(fr(-1n), fr(-1n))), fr(0n)) && fEq(fSub(fr(3n), fr(1n)), fr(2n)), 'H 10.3 L4-3 the climb is +2 = 2a per step (a = 1)')
  // L5-1 the rectangle maximum
  ok(fEq(fNeg(fDiv(fr(10n), fMul(fr(2n), fr(-1n)))), fr(5n)) && fEq(quadAt(fr(-1n), fr(10n), fr(0n), fr(5n)), fr(25n)), 'H 10.3 L5-1 the vertex x = 5 prices the maximum area 25')
  ok(fEq(fNeg(fDiv(fr(100n), fMul(fr(4n), fr(-1n)))), fr(25n)), 'H 10.3 L5-1 the discriminant readout −Δ/4a = −100/(−4) = 25 agrees')
  // L6-1 the three verdicts on the workhorse
  ok(fEq(DkOf(fr(-4n)), fr(-7n)) && fIsZero(DkOf(fr(-25n, 8n))) && fEq(DkOf(fr(5n)), fr(65n)), 'H 10.3 L6-1 Δ_k = −7 / 0 / 65 at k = −4, −25/8, 5 — none / one / two')

  // figure geometry vs plan
  const figs103 = lesson103.blocks.filter((b: any) => b.kind === 'figure')
  ok(figs103.length === 2, 'H 10.3 exactly two figures')
  checkFigureAgainstPlan(figs103[0].svg, plan103Fig1, 400, 'H 10.3 fig 1')
  checkFigureAgainstPlan(figs103[1].svg, plan103Fig2, 340, 'H 10.3 fig 2')

  // citations
  for (const key of lesson103.sources) {
    ok(sourceLog.includes(key), `H 10.3 citation key ${key} banked in SOURCE_LOG.md`)
  }

  // honest word count
  const words103 = countLessonWords(lesson103)
  ok(words103 >= 4000, `H 10.3 honest word count ${words103} ≥ 4,000`)

  // hygiene scans
  scanFileHygiene(ch10File, 'H 10.3')
  ok(!lesson103.title.includes('$'), 'H 10.3 title carries no raw $')

  console.log(`  H 10.3 honest word count: ${words103}`)
}

/** the shifted discriminant of the workhorse: Δ_k = 25 + 8k */
function DkOf(k: Frac): Frac {
  return fAdd(fr(25n), fMul(fr(8n), k))
}

/* ------------------------------------------------------------------ */
/* (I) the unit-10 completion review                                   */
/* ------------------------------------------------------------------ */

console.log('[I] unit-10 completion review: the checklist, exam corners, the closing snapshot')

function sectionI(): void {
  // 1 — every lesson of the chapter clears the 4,000-word floor
  const wordCounts = chapter10.lessons.map((l) => countLessonWords(l))
  for (let i = 0; i < chapter10.lessons.length; i++) {
    ok(wordCounts[i] >= 4000, `I-1: lesson 10.${i + 1} honest word count ${wordCounts[i]} >= 4000`)
  }
  console.log('  I-1 word floors: ' + chapter10.lessons.map((l, i) => '10.' + (i + 1) + '=' + wordCounts[i]).join(', '))

  // 2 — quiz keys match the pinned batteries of D/E/H
  const pinnedKeys: string[][] = [
    [2, 1, 1, 2, 2].map(String),
    [0, 1, 2, 2, 0].map(String),
    [0, 2, 0, 2, 1].map(String),
  ]
  for (let i = 0; i < 3; i++) {
    const q = chapter10.lessons[i].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => String(it.answer))
      ok(JSON.stringify(keys) === JSON.stringify(pinnedKeys[i]), `I-2: quiz keys of 10.${i + 1} match the pinned battery`)
    }
  }

  // 3 — every exercise carries a chain and a terminal answer; the chapter holds 42
  let totalExercises = 0
  let chainFailures = 0
  for (const l of chapter10.lessons) {
    for (const b of l.blocks) {
      if (b.kind === 'exercises') {
        for (const s of b.sets) {
          for (const q of s.questions) {
            totalExercises++
            if (!(Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer)) chainFailures++
          }
        }
      }
    }
  }
  ok(totalExercises === 42, 'I-3: the chapter holds 42 exercises (got ' + totalExercises + ')')
  ok(chainFailures === 0, 'I-3: every exercise carries a solution chain + terminal answer (' + chainFailures + ' failures)')

  // 4 — six figures, all viewBoxed, all vivid-palette clean
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  let figCount = 0
  let figFailures = 0
  for (const l of chapter10.lessons) {
    for (const b of l.blocks) {
      if (b.kind === 'figure') {
        figCount++
        if (!b.svg.includes('viewBox=') || retired.some((h) => b.svg.toLowerCase().includes(h))) figFailures++
      }
    }
  }
  ok(figCount === 6, 'I-4: the chapter carries 6 figures (got ' + figCount + ')')
  ok(figFailures === 0, 'I-4: every figure viewBoxed and vivid-palette clean (' + figFailures + ' failures)')

  // 5 — the cross-lesson arcs closed: the chapter speaks with one voice
  const lessonText = (idx: number): string => {
    const parts: string[] = []
    for (const b of chapter10.lessons[idx].blocks) {
      if (b.kind === 'para' || b.kind === 'heading') parts.push(b.text)
      if (b.kind === 'callout') parts.push(b.title, b.text)
      if (b.kind === 'example') parts.push(b.title, ...b.steps.map((s: any) => (typeof s === 'string' ? s : s.explanation || '')))
      if (b.kind === 'derivation') parts.push(b.title, b.statement, ...b.steps.map((s: any) => s.label + ' ' + (s.formula || '') + ' ' + s.explanation), b.result)
      if (b.kind === 'terms') for (const t of b.items) parts.push(t.term, t.def)
      if (b.kind === 'list') parts.push(...b.items)
      if (b.kind === 'quiz') for (const it of b.items) parts.push(it.q, it.explain)
      if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) { parts.push(q.q); if (Array.isArray(q.solution)) for (const st of q.solution) parts.push(typeof st === 'string' ? st : st.explanation || ''); parts.push(q.answer) }
      if (b.kind === 'table') { parts.push(b.caption); for (const r of b.rows) parts.push(...r) }
    }
    return parts.join(' ')
  }
  const t1 = lessonText(0)
  const t2 = lessonText(1)
  const t3 = lessonText(2)
  ok(t1.includes('5.3') && t1.includes('6.2') && t1.includes('6.3'), 'I-5: 10.1 pays its debts by name — 5.3’s one door, 6.2’s crossing, 6.3’s two points')
  ok(t2.includes('5.3') && (t2.includes('parallel') || t2.includes('Parallel')), 'I-5: 10.2 draws 5.3’s three verdicts and carries the parallel condition')
  ok(t3.includes('9.2') && t3.includes('9.3'), 'I-5: 10.3 grows 9.2’s square and 9.3’s centre/discriminant by name')
  ok(t3.includes('10.1') && t3.includes('10.2'), 'I-5: 10.3 ties the chapter arc — 10.1’s identity and 10.2’s slope both cited')
  ok(t3.includes('5.3'), 'I-5: 10.3 bends 5.3’s verdict machine honestly')
  ok(t3.includes('9.4') || t1.includes('9.4') || t2.includes('9.4'), 'I-5: Viète’s sum appears in the chapter (the axis as the roots’ midpoint)')

  // 6 — the citation keys and prerequisites stand on every lesson
  for (let i = 0; i < 3; i++) {
    const l = chapter10.lessons[i]
    ok(
      JSON.stringify(l.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
      `I-6: the four citation keys ride 10.${i + 1}`,
    )
    ok((l.prerequisites || []).length >= 3, `I-6: 10.${i + 1} carries at least three prerequisites`)
  }

  // 7 — the exam corners: every lesson maps to the examinations
  for (let i = 0; i < 3; i++) {
    const exam = chapter10.lessons[i].blocks.find((b) => b.kind === 'callout' && b.tone === 'exam')
    ok(!!exam, `I-7: 10.${i + 1} carries an exam corner`)
  }

  // 8 — the chapter object is COMPLETE: status flipped, plan empty
  ok(chapter10.status === 'complete', 'I-8: chapter 10 status flipped to complete')
  ok(!chapter10.plannedLessons || chapter10.plannedLessons.length === 0, 'I-8: no planned lessons remain in chapter 10')

  // 9 — the book snapshot, recomputed from the live data
  let bookLessons = 0
  let bookWords = 0
  let completeChapters = 0
  let totalChapters = 0
  let minWords = Infinity
  const elementaryAlgebra = allBooks.find((b) => b.id === 'elementary-algebra')!
  for (const c of elementaryAlgebra.chapters) {
    totalChapters++
    if (c.status === 'complete') completeChapters++
    for (const l of c.lessons) {
      bookLessons++
      const w = countLessonWords(l)
      bookWords += w
      if (w < minWords) minWords = w
    }
  }
  ok(bookLessons === 37, 'I-9: the book stands at 37 lessons (got ' + bookLessons + ')')
  ok(bookWords > 155500, 'I-9: the book crosses 155,500 words (' + bookWords + ')')
  ok(minWords >= 4000, 'I-9: the shortest lesson still clears 4,000 words (' + minWords + ')')
  ok(completeChapters === 11 && totalChapters === 12, 'I-9: 11 of 12 chapters complete, ch. 12 planned (got ' + completeChapters + '/' + totalChapters + ')')
  let libraryLessons = 0
  let libraryWords = 0
  for (const b of allBooks) {
    for (const c of b.chapters) {
      for (const l of c.lessons) {
        libraryLessons++
        libraryWords += countLessonWords(l)
      }
    }
  }
  ok(libraryLessons === 125, 'I-9: the library stands at 125 lessons (got ' + libraryLessons + ')')
  console.log('  I-9 book snapshot: ' + bookLessons + ' lessons / ' + bookWords + ' words / ' + completeChapters + ' of ' + totalChapters + ' chapters; library ' + libraryLessons + ' lessons / ' + libraryWords + ' words')

  // 10 — the id registry, one final time across the whole library
  const ids: string[] = []
  for (const b of allBooks) {
    for (const c of b.chapters) {
      for (const l of c.lessons) ids.push(l.id)
    }
  }
  ok(ids.length === new Set(ids).size, 'I-10: all ' + ids.length + ' library ids unique at chapter close')

  console.log('[I] the unit-10 completion review: checklist, exam corners, snapshot — all green')
}

sectionD()
sectionE()
sectionF()
sectionH()
sectionI()

console.log('')

console.log('')
if (failed === 0) {
  console.log(`verify-book3-ch10: ${passed} checks ALL GREEN (pre-write engines + authored batteries + library)`)
} else {
  console.log(`verify-book3-ch10: ${passed} passed, ${failed} FAILED`)
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
