import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c24 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f24 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo24 SVG helpers (plain text only — no $, minus is U+2212)         */
/* Every arc, vertex and label below is COMPUTED from coordinates —    */
/* nothing in any figure is eyeballed.                                 */
/* ------------------------------------------------------------------ */
const geo24Txt = (
  x: number, y: number, s: string,
  size = 13, color = c24.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f24}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo24Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c24.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo24Circle = (
  cx: number, cy: number, r: number, color = c24.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo24Dot = (x: number, y: number, color = c24.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo24Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo24Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo24Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c24.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo24Line(x1, y1, x2, y2, color, w) + geo24Head(x2, y2, a, color, 8)
  )
}

const geo24Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

type PT = [number, number]

/** computed angle (degrees) at vertex V between rays V→P1 and V→P2 */
const geo24Ang = (V: PT, P1: PT, P2: PT): number => {
  const u = [P1[0] - V[0], P1[1] - V[1]]
  const w = [P2[0] - V[0], P2[1] - V[1]]
  const cr = u[0] * w[1] - u[1] * w[0]
  const dot = u[0] * w[0] + u[1] * w[1]
  return (Math.abs(Math.atan2(cr, dot)) * 180) / Math.PI
}

/** computed angle-arc path + optional arrowhead + optional label at the bisector */
const geo24AngleArc = (
  V: PT, P1: PT, P2: PT, r: number, color = c24.ink, w = 2,
  label = '', labelColor = '', arrowEnd = false, lr = 16,
): string => {
  let a1 = (Math.atan2(P1[1] - V[1], P1[0] - V[0]) * 180) / Math.PI
  let a2 = (Math.atan2(P2[1] - V[1], P2[0] - V[0]) * 180) / Math.PI
  let d = (a2 - a1 + 360) % 360
  if (d > 180) { const t = a1; a1 = a2; a2 = t; d = 360 - d }
  const p = (a: number, rad: number): PT => [V[0] + rad * Math.cos((a * Math.PI) / 180), V[1] + rad * Math.sin((a * Math.PI) / 180)]
  const [x1, y1] = p(a1, r)
  const [x2, y2] = p(a2, r)
  let out = `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
  if (arrowEnd) out += geo24Head(x2, y2, a2 + 90, color, 7)
  if (label) {
    const [lx, ly] = p(a1 + d / 2, r + lr)
    out += geo24Txt(lx, ly + 4, label, 12.5, labelColor || color, 'middle', '700')
  }
  return out
}

/** apex A of the triangle on base B→C with base angles beta (at B) and gamma (at C), degrees */
const geo24Apex = (B: PT, C: PT, beta: number, gamma: number): PT => {
  const db: PT = [Math.cos((beta * Math.PI) / 180), -Math.sin((beta * Math.PI) / 180)]
  const dc: PT = [Math.cos(((180 - gamma) * Math.PI) / 180), -Math.sin(((180 - gamma) * Math.PI) / 180)]
  const rhs = C[0] - B[0]
  const t = rhs / (db[0] - dc[0])
  return [B[0] + t * db[0], B[1] + t * db[1]]
}

/** vertices of a regular n-gon on a circle (screen angles, deg) */
const geo24RegPoly = (cx: number, cy: number, n: number, R: number, rot = -90): PT[] =>
  Array.from({ length: n }, (_, i): PT => {
    const a = ((rot + (360 * i) / n) * Math.PI) / 180
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)]
  })

const geo24Poly = (pts: PT[], color = c24.green, w = 2.5, dash = '', fill = 'none'): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo24PathPts = (pts: PT[], color = c24.green, w = 2.5, dash = '', fill = 'none'): string =>
  `<path d="M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ')}${fill !== 'none' ? ' Z' : ''}" fill="${fill}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

/** orthographic sphere projection, tilt 18° — world (x east, y toward viewer, z up) */
const geo24SPX = 380, geo24SPY = 300, geo24SPR = 190
const geo24Sph = (wx: number, wy: number, wz: number): PT => {
  const t = (18 * Math.PI) / 180
  const u = wx
  const v = -wy * Math.sin(t) + wz * Math.cos(t)
  return [geo24SPX + u, geo24SPY - v]
}
const geo24SphPt = (lam: number, s: number): PT => {
  const L = (lam * Math.PI) / 180, S = (s * Math.PI) / 180
  return geo24Sph(geo24SPR * Math.cos(L) * Math.cos(S), geo24SPR * Math.sin(L) * Math.cos(S), geo24SPR * Math.sin(S))
}
const geo24EqPt = (t: number): PT => {
  const T = (t * Math.PI) / 180
  return geo24Sph(geo24SPR * Math.cos(T), geo24SPR * Math.sin(T), 0)
}

/** the octant sphere figure (body variant: angles; solution variant: Girard area) */
const geo24OctantSphere = (withArea: boolean): string => {
  const tau = (18 * Math.PI) / 180
  const parts: string[] = []
  // sphere + axis
  parts.push(geo24Circle(geo24SPX, geo24SPY, geo24SPR, c24.green, 3))
  const N = geo24SphPt(45, 90), S = geo24SphPt(45, -90)
  parts.push(geo24Line(N[0], N[1], S[0], S[1], c24.faint, 1.6, '5,6'))
  // equator: front (t 0..180) solid, back dashed
  const front: PT[] = [], back: PT[] = []
  for (let t = 0; t <= 180; t += 4) front.push(geo24EqPt(t))
  for (let t = 180; t <= 360; t += 4) back.push(geo24EqPt(t))
  parts.push(geo24PathPts(back, c24.teal, 1.6, '5,6'))
  parts.push(geo24PathPts(front, c24.teal, 2.4))
  // octant region: N -> meridian 135 down to E2 -> equator 135..45 -> meridian 45 up to N
  const region: PT[] = []
  for (let s = 90; s >= 0; s -= 4) region.push(geo24SphPt(135, s))
  for (let t = 135; t >= 45; t -= 4) region.push(geo24EqPt(t))
  for (let s = 0; s <= 90; s += 4) region.push(geo24SphPt(45, s))
  parts.push(geo24PathPts(region, c24.orange, 2.6, '', c24.panel))
  // meridians 45 and 135: solid above the visibility horizon, dashed below
  for (const lam of [45, 135]) {
    const a = Math.sin((lam * Math.PI) / 180) * Math.cos(tau)
    const b = Math.sin(tau)
    const sStar = (-((Math.atan2(a, b) * 180) / Math.PI))
    const vis: PT[] = [], hid: PT[] = []
    for (let s = 90; s >= -90; s -= 4) (s >= sStar ? vis : hid).push(geo24SphPt(lam, s))
    parts.push(geo24PathPts(hid, c24.amber, 1.6, '5,6'))
    parts.push(geo24PathPts(vis, c24.amber, 2.6))
  }
  const E1 = geo24EqPt(45), E2 = geo24EqPt(135)
  // right-angle markers (small computed squares along the tangent directions)
  const mark = (V: PT, t1: PT, t2: PT): string => {
    const q = (t: PT): PT => [t[0] / Math.hypot(t[0], t[1]), t[1] / Math.hypot(t[0], t[1])]
    const u = q(t1), v = q(t2), k = 17
    const p1: PT = [V[0] + k * u[0], V[1] + k * u[1]]
    const p2: PT = [V[0] + k * (u[0] + v[0]), V[1] + k * (u[1] + v[1])]
    const p3: PT = [V[0] + k * v[0], V[1] + k * v[1]]
    return geo24PathPts([p1, p2, p3], c24.red, 2.2)
  }
  // at N: tangents toward E1 (meridian 45) and E2 (meridian 135)
  const mTan = (lam: number): PT => {
    const L = (lam * Math.PI) / 180
    const du = -Math.cos(L), dv = Math.sin(L) * Math.sin(tau)
    return [du, -dv] // toward decreasing s (down from the pole)
  }
  parts.push(mark(N, mTan(45), mTan(135)))
  parts.push(geo24Txt(N[0], N[1] + 42, '90°', 12.5, c24.red, 'middle', '700'))
  // at E1: toward N (up the meridian) and toward E2 (along the equator, increasing t)
  const eqTan = (t: number): PT => {
    const T = (t * Math.PI) / 180
    return [-Math.sin(T), Math.cos(T) * Math.sin(tau)]
  }
  parts.push(mark(E1, [0, -Math.cos(tau)], eqTan(45)))
  parts.push(geo24Txt(E1[0] - 46, E1[1] - 14, '90°', 12.5, c24.red, 'middle', '700'))
  parts.push(mark(E2, [0, -Math.cos(tau)], [eqTan(135)[0], -eqTan(135)[1]]))
  parts.push(geo24Txt(E2[0] + 46, E2[1] - 14, '90°', 12.5, c24.red, 'middle', '700'))
  // labels
  parts.push(geo24Txt(N[0], N[1] - 12, 'N', 13, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(S[0], S[1] + 20, 'S', 12.5, c24.tealInk, 'middle', '700'))
  parts.push(geo24Txt(E1[0] + 20, E1[1] + 18, 'E1', 12.5, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(E2[0] - 20, E2[1] + 18, 'E2', 12.5, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(geo24SPX, geo24SPY + geo24SPR * Math.sin(tau) + 22, 'equator', 12, c24.tealInk))
  parts.push(geo24Txt(geo24SPX - geo24SPR * 0.72, geo24SPY - geo24SPR * 0.86, 'meridian', 11.5, c24.amber, 'middle', '600'))
  if (withArea) {
    parts.push(geo24Txt(geo24SPX, geo24SPY + 152, 'octant area = (π/2)·R² with R = 10', 13, c24.orange, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 176, '= 50π ≈ 157.0796 = one eighth of 4πR²', 13, c24.ink, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 200, 'sum = 270°, excess = 90°', 12.5, c24.tealInk, 'middle', '700'))
  } else {
    parts.push(geo24Txt(geo24SPX, geo24SPY + 152, 'three right angles: sum = 270°', 13.5, c24.orange, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 178, 'spherical excess = 270° − 180° = 90°', 13, c24.ink, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 202, 'hyperbolic triangles: sum < 180°', 12, c24.tealInk, 'middle', '600'))
  }
  return geo24Svg(760, 560, withArea
    ? 'The octant triangle on a sphere with its area computed by Girard: one eighth of the surface, 50 pi for radius 10.'
    : 'The octant triangle on a sphere: north pole and two equator points ninety degrees apart, with three right angles marked.', parts)
}

/* ================================================================== */
/* LESSON 2.4 — Angle Sum of a Triangle and Its Consequences           */
/* ================================================================== */
export const lessonGeo204: Lesson = {
  id: 'geo-angle-sum-of-a-triangle-and-its-consequences',
  number: '2.4',
  title: 'Angle Sum of a Triangle and Its Consequences',
  concepts: [
    'angle sum property',
    'exterior angle',
    'remote interior angles',
    'interior angle sum of a polygon',
    'exterior angle sum',
    'spherical excess',
    'triangle classification',
  ],
  objectives: [
    'Reproduce the proof of Euclid I.32 — the 180° angle sum — naming every licence it uses, above all the one parallel line through the vertex',
    'State and apply the exterior angle theorem: the exterior angle equals the sum of the two remote interior angles, and exceeds each of them',
    'Classify triangles as acute, right or obtuse, and explain why a triangle can carry at most one non-acute angle',
    'Compute interior and exterior angle sums of any convex polygon by dissection and by the walk-around, including the honest decimals for the regular 7-gon and 11-gon',
    'Solve regular-polygon problems as two-equation systems built on interior + exterior = 180',
    'Describe the octant triangle on a sphere, compute its spherical excess, and explain why the 180° sum and the parallel postulate stand or fall together',
  ],
  prerequisites: [
    'geo-incidence-how-points-lines-and-planes-interlock',
    'geo-angles-types-pairs-and-measures',
    'geo-parallel-lines-and-the-fifth-postulate',
    'geo-the-transversal-the-eight-angle-census',
  ],
  sources: ['geo-euclid-elements', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The theorem you have used all your life' },
    {
      kind: 'para',
      text: 'You have used it since your first geometry lesson, probably without once being asked to justify it: the three angles of a triangle add up to $180^\\circ$. Teachers state it, exams assume it, carpenters measure with it, navigators triangulate with it. And yet for the first two lessons of this chapter it has been sitting in front of you like an unpaid bill. The angles of a triangle live at three different vertices, formed by three different pairs of lines — nothing in the arithmetic of 2.1, nothing in the incidence facts of 1.4, says anything about how angles at DIFFERENT vertices compare. To add angles that live in different places, something must CARRY them to one place. This lesson names the carrier, and the carrier is a parallel line.',
    },
    {
      kind: 'para',
      text: 'Everything since 2.1 converges here. Lesson 2.1 built the arithmetic of a single vertex: complements, supplements, the straight angle of $180^\\circ$, linear pairs that feed it. Lesson 2.2 told the story of the fifth postulate and gave us Playfair\'s form: through a point not on a line, exactly ONE parallel to that line. Lesson 2.3 built the eight-angle census: when a transversal crosses two parallel lines, corresponding angles are equal, alternate interiors are equal, co-interiors sum to $180^\\circ$ — and we were scrupulously honest about which direction of that census costs the fifth postulate (the forward direction is Euclid I.29, the postulate\'s first appearance in the Elements) and which converses are fifth-free. The angle sum of a triangle is what all of that machinery was FOR. Euclid proves it as Proposition I.32, the summit of the first third of Book I, and everything after it in the Elements leans on it.',
    },
    {
      kind: 'para',
      text: 'Here is the entire proof in one sentence, so you can watch how short it is: through the top vertex of the triangle draw the line parallel to the base, and the triangle\'s two base angles are carried up to the top vertex as alternate interior angles, where they line up next to the top angle along a straight line worth $180^\\circ$. One new line, two census readings, one straight angle — done. The earning of $a + b + c = 180^\\circ$ takes exactly one parallel line, and that is not an accident: we shall end the lesson by showing that on a sphere, where parallels do not exist, triangles genuinely have angle sums ABOVE $180^\\circ$, and in the hyperbolic plane, where parallels abound, the sums fall BELOW it. The theorem you have always used is not a universal truth about space — it is a PRECISE PORTRAIT of the Euclidean choice. That is why it was worth earning honestly.',
    },
    {
      kind: 'para',
      text: 'The plan of the lesson follows the consequences outward. First the proof itself, licence by licence — the chapter\'s centrepiece. Then the exterior angle theorem, which is I.32\'s second half and the single most useful inequality in school geometry. Then the classification census of acute, right and obtuse triangles, which the sum law settles in one sweep. Then polygons: the dissection that turns a convex $n$-gon into $n - 2$ triangles, the walk-around that turns one lap into $360^\\circ$, and the regular-polygon tables with their honest decimals. The last door is the non-Euclidean one — the octant triangle with three right angles on the sphere you live on — and the deep equivalence, proved in chapter 11, that the $180^\\circ$ angle sum and the parallel postulate are two names for one assumption. As always, every number, sweep and witness in this lesson was recomputed by engine before a word of prose was written; where the engine and intuition disagree, the engine wins.',
    },
    /* -------------------------------------------------------------- */
    /* 2. THE proof — Euclid I.32                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The proof: Euclid I.32, licence by licence' },
    {
      kind: 'para',
      text: 'Let the triangle be $ABC$, and let us aim the proof at the vertex $A$: we want the three angles $a = \\angle BAC$, $b = \\angle ABC$ and $c = \\angle BCA$ gathered at ONE point, so that 2.1\'s arithmetic can add them. The plan is to build, at $A$, a straight line on which the three angles sit side by side. Draw the line $\\ell$ through $A$ parallel to $BC$. Two licences make this legitimate. EXISTENCE: Playfair\'s axiom (2.2) guarantees, through the point $A$ off the line $BC$, exactly one line parallel to $BC$. CONSTRUCTION: actually drawing that parallel with ruler and compass is a job for chapter 8\'s construction toolkit — the copy-an-angle machine — and we name the debt here rather than pretend to pay it. For the proof we only need the line to EXIST, and Playfair vouches for that.',
    },
    {
      kind: 'para',
      text: 'Now the line $\\ell$ plays the upper line and $BC$ plays the lower line of 2.3\'s census, and the triangle\'s two sides become TRANSVERSALS. The side $AB$ crosses $\\ell$ at $A$ and $BC$ at $B$; the side $AC$ crosses $\\ell$ at $A$ and $BC$ at $C$. Read each transversal with the census. On transversal $AB$, the triangle\'s angle $b$ at $B$ is the upper-right interior angle at the lower line — the $a_6$ position — so the census hands us the alternate interior angle at the upper line: the angle between the ray $A\\!\\to\\!B$ and the LEFTWARD ray of $\\ell$. Alternate interiors under parallel lines are equal — the $a_4 = a_6$ licence, Euclid I.29 — so that angle at $A$ is exactly $b$. On transversal $AC$ the same reading carries $c$ across: the angle $c$ at $C$ is the $a_5$ position, and its alternate interior partner at $A$ — between the ray $A\\!\\to\\!C$ and the RIGHTWARD ray of $\\ell$ — is exactly $c$, by the $a_3 = a_5$ licence. The census has now delivered both base angles to the vertex $A$, and it delivered them for free, because 2.3 already paid for I.29.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Theorem (Euclid I.32, first half) — the angle sum property',
      text: 'In any triangle, the three interior angles sum to two right angles: $a + b + c = 180^\\circ$. The proof uses one parallel line through a vertex, the alternate-interior equality of the transversal census (I.29 — the fifth postulate\'s first consequence), and the straight angle of 2.1. Nothing else.',
    },
    {
      kind: 'derivation',
      title: 'The proof of I.32 — one parallel line, two census readings, one straight angle',
      statement: 'Claim: for triangle $ABC$ with angles $a$ at $A$, $b$ at $B$, $c$ at $C$, we have $a + b + c = 180^\\circ$. Every licence used is named at the moment it is used.',
      steps: [
        { label: 'Draw the one new line', formula: '\\ell \\text{ through } A,\\ \\ell \\parallel BC', explanation: 'Existence is Playfair\'s axiom from 2.2: through the point $A$, not on line $BC$, there is exactly one line parallel to $BC$. The ruler-and-compass construction of $\\ell$ rides chapter 8; the proof needs only existence.' },
        { label: 'Read transversal AB', formula: 'a_4 = a_6 \\Rightarrow \\text{carried } b \\text{ at } A', explanation: 'The side $AB$ meets the parallels $\\ell$ (above) and $BC$ (below). The triangle\'s angle $b$ sits in the $a_6$ position at $B$; by I.29 (2.3\'s census — the licence that costs the fifth postulate), the alternate interior angle at $A$, between ray $A\\!\\to\\!B$ and the leftward ray of $\\ell$, equals $b$.' },
        { label: 'Read transversal AC', formula: 'a_3 = a_5 \\Rightarrow \\text{carried } c \\text{ at } A', explanation: 'The side $AC$ is the second transversal. The triangle\'s angle $c$ sits in the $a_5$ position at $C$; the same alternate-interior licence (I.29) makes the angle between ray $A\\!\\to\\!C$ and the rightward ray of $\\ell$ equal to $c$.' },
        { label: 'Line the three angles up on the straight line', formula: 'b + a + c \\text{ along } \\ell', explanation: 'At the point $A$ on the line $\\ell$, going from the leftward ray to the rightward ray, we pass exactly three angles in order: the carried copy of $b$, then the triangle\'s own angle $a$ between the rays $A\\!\\to\\!B$ and $A\\!\\to\\!C$, then the carried copy of $c$. These three fill the straight angle with no gaps and no overlap.' },
        { label: 'Invoke the straight angle of 2.1', formula: 'b + a + c = 180^\\circ', explanation: 'A straight angle measures $180^\\circ$ — two right angles — by 2.1\'s definition of the degree and the straight line. The left side is exactly that straight angle, now decomposed. The sum is earned.' },
      ],
      result: '$a + b + c = 180^\\circ$ — the angle sum of a triangle, Euclid I.32: one parallel line (Playfair), two alternate-interior carries (I.29), one straight angle (2.1).',
    },
    {
      kind: 'figure',
      caption: 'The proof of I.32 in one picture. Through the vertex $A$ runs the line $\\ell$ parallel to $BC$ (existence: Playfair; the drawn chevrons mark the parallel pair). The census carries the angle $b$ from $B$ up to $A$ along transversal $AB$ — alternate interiors, the $a_4 = a_6$ licence — and carries $c$ from $C$ up to $A$ along transversal $AC$ ($a_3 = a_5$). At $A$ the three angles $b$, $a$, $c$ now sit side by side along $\\ell$, filling the dashed $180^\\circ$ straight-angle brace. Every arc in this figure is computed from the drawn coordinates.',
      svg: (() => {
        const A: PT = [320, 250], B: PT = [150, 470], C: PT = [560, 470]
        const L: PT = [90, 250], R: PT = [670, 250]
        const parts: string[] = []
        // the parallel pair, marked with chevrons
        parts.push(geo24Line(L[0], L[1], R[0], R[1], c24.ink, 3))
        parts.push(geo24Line(B[0], B[1], C[0], C[1], c24.ink, 3))
        for (const x of [600, 620]) {
          parts.push(geo24Line(x, 243, x + 10, 250, c24.amber, 2.2))
          parts.push(geo24Line(x, 257, x + 10, 250, c24.amber, 2.2))
          parts.push(geo24Line(x, 463, x + 10, 470, c24.amber, 2.2))
          parts.push(geo24Line(x, 477, x + 10, 470, c24.amber, 2.2))
        }
        parts.push(geo24Txt(70, 240, 'ℓ', 14, c24.tealInk, 'middle', '700'))
        // the triangle
        parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
        // straight-angle brace (computed semicircle below A, radius 96)
        parts.push(geo24AngleArc(A, R, L, 96, c24.orange, 2.2, '', '', false, 0))
        parts.push(geo24Txt(A[0], A[1] + 128, '180°', 13, c24.orange, 'middle', '700'))
        // carried angles at A (radius 58) + the triangle's own angle a (radius 40)
        parts.push(geo24AngleArc(A, L, B, 58, c24.amber, 2.6, 'b', c24.amber))
        parts.push(geo24AngleArc(A, B, C, 40, c24.green, 2.6, 'a', c24.green))
        parts.push(geo24AngleArc(A, C, R, 58, c24.teal, 2.6, 'c', c24.teal))
        // the original base angles at B and C (matching colours)
        parts.push(geo24AngleArc(B, C, A, 42, c24.amber, 2.6, 'b', c24.amber))
        parts.push(geo24AngleArc(C, A, B, 42, c24.teal, 2.6, 'c', c24.teal))
        // vertices
        parts.push(geo24Dot(A[0], A[1], c24.ink), geo24Dot(B[0], B[1], c24.ink), geo24Dot(C[0], C[1], c24.ink))
        parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(B[0] - 16, B[1] + 22, 'B', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(C[0] + 16, C[1] + 22, 'C', 13.5, c24.ink, 'middle', '700'))
        return geo24Svg(760, 520, 'Euclid I.32: triangle ABC with the parallel line through A; the base angles b and c are carried to A as alternate interior angles and line up with a along the straight angle of 180 degrees.', parts)
      })(),
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — the theorem behind two millennia of measuring',
      text: 'Euclid proved I.32 around 300 BCE, and the result had already been used for surveying in Egypt and Babylon long before it was proved — the Rhind-era rope-stretchers worked with triangle arithmetic empirically. What Euclid added was the CERTIFICATE: from that point on, every triangulation from land survey to stellar parallax rested on a licensed argument rather than a habit. The theorem also closed a circle that had opened with Thales, who reportedly measured pyramid heights from shadows using similar triangles. When 19th-century surveyors triangulated entire countries, and when GPS receivers today fix position from satellite geometry, the ledger balancing every network of triangles is still this one: each triangle contributes exactly $180^\circ$, each error in the field must cancel somewhere, and the parallel postulate is quietly vouching for every degree.',
    },
    {
      kind: 'para',
      text: 'Pause on how CHEAP the proof is — one line, two census readings — and on how EXPENSIVE its one input is. The only step in the chain that the last twenty-three centuries argued about is the quiet first one: the parallel line through $A$. Euclid himself never draws attention to it, but his fifth postulate is exactly what licenses I.29, and I.29 is what carries both base angles up to the top. Strip the fifth postulate away and the proof collapses at step two; keep it and the triangle\'s angle sum is forced. We return to this at the end of the lesson, because it is the hinge on which the whole non-Euclidean door swings: on a sphere, where the parallel simply does not exist, the proof fails AND the conclusion fails — the octant triangle really does have $270^\\circ$ in it. The theorem and the postulate live and die together, and chapter 11 proves that equivalence properly.',
    },
    {
      kind: 'para',
      text: 'One more habit worth installing now, before the consequences start flowing: when a problem hands you two angles of a triangle, the third is not "probably" determined — it is EXACTLY determined, by subtraction. And when a problem hands you three angles that CLAIM to be a triangle, the claim is testable: they must sum to $180^\\circ$ AND each must be strictly between $0^\\circ$ and $180^\\circ$. The degenerate case deserves its own honesty. Three collinear points — say $P$, $Q$, $R$ on one line with $Q$ between — do bound a "flat triangle" of angles $180^\\circ$, $0^\\circ$, $0^\\circ$: the sum still reads $180^\\circ$, which is exactly why the sum alone cannot certify triangularity. The angle-sum law is a theorem about triangles; a triangle is a figure with three POSITIVE angles, and the engine\'s sweeps in this lesson run over positive angles only. When an exam wants to trap you with a fake triangle, the trap is almost always a zero or negative "angle" hiding inside a sum that looks right.',
    },
    {
      kind: 'example',
      title: 'Re-perform the proof walk on the triangle with angles $62^\\circ$ and $54^\\circ$ at $B$ and $C$',
      steps: [
        'Sol. The triangle has $b = 62^\\circ$ at $B$ and $c = 54^\\circ$ at $C$; the angle $a$ at $A$ is what the walk must produce.',
        'Draw $\\ell$ through $A$ parallel to $BC$ — Playfair licenses exactly one such line.',
        'Carry $b$ up transversal $AB$: the alternate interior angle at $A$, on the far side of $AB$, is $62^\\circ$ (the $a_4 = a_6$ licence).',
        'Carry $c$ up transversal $AC$: the alternate interior angle at $A$, on the far side of $AC$, is $54^\\circ$ (the $a_3 = a_5$ licence).',
        'Now, the three angles at $A$ line up along the straight line $\\ell$: $62^\\circ + a + 54^\\circ = 180^\\circ$.',
        'Hence $a = 180^\\circ - 62^\\circ - 54^\\circ = 64^\\circ$ — the same subtraction the sum law sells you, but watched happening on the parallel line itself.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 3. the exterior angle                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The exterior angle: the sum law in action' },
    {
      kind: 'para',
      text: 'Extend one side of the triangle past a vertex, and a new angle appears outside the figure. In triangle $ABC$, extend side $BC$ past $C$ to a point $D$: the angle $ACD$ — between the ray $C\\!\\to\\!A$ and the ray $C\\!\\to\\!D$ — is the EXTERIOR angle at $C$. Its study is I.32\'s second half, and it converts the sum law from a ledger identity into a working tool, because the exterior angle is equal to the SUM of the two remote interior angles — the angles at the vertices the extension does not touch. In our labels: $\\angle ACD = a + b$. The proof is two lines long, and one of them is 2.1.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Exterior angle and remote interior angles',
      text: 'An exterior angle of a triangle at a vertex is the angle between one side of the triangle and the EXTENSION of the other side past that vertex. The two interior angles at the OTHER two vertices are called the remote interior angles of that exterior angle. Thus, if side $BC$ is extended past $C$, the exterior angle is $\\angle ACD$, and its remote interior angles are $a$ at $A$ and $b$ at $B$.',
    },
    {
      kind: 'derivation',
      title: 'The exterior angle equals the sum of its remote interior angles',
      statement: 'Claim: in triangle $ABC$ with side $BC$ extended past $C$ to $D$, the exterior angle $\\angle ACD$ equals $a + b$, the sum of the two remote interior angles.',
      steps: [
        { label: 'The linear pair at C', formula: '\\angle ACD + c = 180^\\circ', explanation: 'The ray $C\\!\\to\\!B$ and the ray $C\\!\\to\\!D$ point in opposite directions along one straight line, so the interior angle $c$ and the exterior angle $\\angle ACD$ form a linear pair — 2.1\'s supplement arithmetic.' },
        { label: 'The angle sum at work', formula: 'a + b + c = 180^\\circ', explanation: 'The three interior angles sum to $180^\\circ$ — Euclid I.32, just proved. This is the step that costs the fifth postulate.' },
        { label: 'Subtract', formula: '\\angle ACD = 180^\\circ - c = a + b', explanation: 'Both right-hand quantities equal $180^\\circ - c$: the linear pair supplies one, the sum law rearranged supplies the other. The exterior angle is exactly the sum of the two remote interiors.' },
        { label: 'The inequality falls out for free', formula: 'a + b > a \\text{ and } a + b > b', explanation: 'Because every angle of a genuine triangle is positive, $b > 0$ makes $a + b > a$, and $a > 0$ makes $a + b > b$: the exterior angle EXCEEDS each remote interior angle, strictly.' },
      ],
      result: 'Exterior angle $=$ sum of remote interiors: $\\angle ACD = a + b$, and strictly $\\angle ACD > a$, $\\angle ACD > b$ — the two-line consequence of I.32 plus a linear pair.',
    },
    {
      kind: 'formula',
      name: 'Exterior angle of a triangle',
      latex: '\\angle ACD = a + b',
      note: 'the exterior angle equals the SUM of the two remote interior angles; it exceeds each of them strictly',
    },
    {
      kind: 'figure',
      caption: 'The exterior angle and its remote-sum ledger. Side $BC$ is extended past $C$ to $D$; the exterior angle $\\angle ACD = 108^\\circ$ (orange arc) is bracketed against the two remote interior angles $47^\\circ$ at $A$ and $61^\\circ$ at $B$ (amber brace below): $47^\\circ + 61^\\circ = 108^\\circ$. At $C$ itself, the interior angle $72^\\circ$ and the exterior $108^\\circ$ form the linear pair $72^\\circ + 108^\\circ = 180^\\circ$. The triangle is constructed FROM the angles $61^\\circ$ and $72^\\circ$, so every arc and label is computed, not eyeballed.',
      svg: (() => {
        const B: PT = [150, 400], C: PT = [450, 400]
        const A: PT = geo24Apex(B, C, 61, 72)
        const D: PT = [640, 400]
        const parts: string[] = []
        parts.push(geo24Line(B[0], B[1], D[0], D[1], c24.ink, 3))
        parts.push(geo24Head(D[0], D[1], 0, c24.ink, 9))
        parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
        parts.push(geo24AngleArc(C, A, D, 54, c24.orange, 3, '108°', c24.orange))
        parts.push(geo24AngleArc(C, B, A, 36, c24.green, 2.6, '72°', c24.green))
        parts.push(geo24AngleArc(B, C, A, 42, c24.amber, 2.6, '61°', c24.amber))
        parts.push(geo24AngleArc(A, B, C, 40, c24.teal, 2.6, '47°', c24.teal))
        parts.push(geo24Dot(A[0], A[1]), geo24Dot(B[0], B[1]), geo24Dot(C[0], C[1]), geo24Dot(D[0], D[1]))
        parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(B[0] - 16, B[1] + 24, 'B', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(C[0], C[1] + 24, 'C', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(D[0] + 12, D[1] - 8, 'D', 13.5, c24.ink, 'middle', '700'))
        // remote-sum brace: drop lines from A and B, bracket, ledger
        parts.push(geo24Line(A[0], A[1] + 10, A[0], 452, c24.teal, 1.6, '5,6'))
        parts.push(geo24Line(B[0], B[1] + 10, B[0], 452, c24.teal, 1.6, '5,6'))
        parts.push(geo24Line(B[0], 452, A[0], 452, c24.amber, 2.2))
        parts.push(geo24Line(B[0], 446, B[0], 458, c24.amber, 2.2))
        parts.push(geo24Line(A[0], 446, A[0], 458, c24.amber, 2.2))
        parts.push(geo24Txt((A[0] + B[0]) / 2, 476, 'remote interiors: 47° + 61° = 108°', 13, c24.amber, 'middle', '700'))
        parts.push(geo24Txt(560, 452, '72° + 108° = 180°', 12.5, c24.tealInk, 'middle', '700'))
        return geo24Svg(760, 500, 'Triangle ABC with side BC extended past C to D; the exterior angle 108 degrees at C equals the sum of the remote interior angles 47 and 61, bracketed below; the linear pair 72 plus 108 equals 180.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The engine swept this claim the way it sweeps every claim: over ALL of them. For every positive integer pair $(a, b)$ with $a + b < 180$ — that is $15{,}931$ pairs — the exterior angle $180^\\circ - c$ (where $c = 180^\\circ - a - b$) equals $a + b$ exactly, and exceeds both $a$ and $b$ strictly. There is no exception to find, and now you know why: the equality is two lines of algebra on top of I.32, and the strict inequality is nothing more than the positivity of the third angle. Which raises a question the 2.3 discipline trained you to ask: WHICH of these two facts — the equality and the inequality — actually needs the fifth postulate?',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — which results cost the postulate',
      text: 'Euclid proves the INEQUALITY (the exterior angle exceeds each remote interior) as Proposition I.16, well before he ever touches the fifth postulate — the Elements first uses the postulate at I.29, and the ground-truth register of 2.2 confirms the ordering: $16 < 29 < 32$. The inequality survives in geometries without parallels. The EQUALITY (exterior $=$ remote sum) is I.32, sits after I.29, and dies with the fifth postulate: on a sphere the exterior angle of the octant triangle is genuinely SMALLER than the sum of its remote interiors. The 2.3 discipline — name the price of every theorem — applies to the last digit of this chapter exactly as it applied to the first.',
    },
    {
      kind: 'para',
      text: 'Why should anyone care about a result that follows in two lines? Because the exterior-angle equality is where the sum law becomes a HUNTING tool. When a diagram shows an angle OUTSIDE a triangle touching two remote angles inside, the equality converts the outside angle into the sum of the insides — no parallel line needs to be drawn, because the parallel line that proved the theorem is not part of USING it. Conversely, when two of the three entries are known, the third is a subtraction away. Competitive papers lean on this constantly: the exterior angle is the "free" angle of a diagram, computable from rooms it never enters. The exercises below include several of these hunts, and the next two sections build the two biggest generalisations of the sum law — to every classification question about triangles, and to every polygon in the plane.',
    },
    /* -------------------------------------------------------------- */
    /* 4. the classification census                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The classification census: acute, right, obtuse' },
    {
      kind: 'para',
      text: 'Triangles come in three temperaments, sorted by their LARGEST angle. If all three angles are below $90^\\circ$, the triangle is ACUTE. If one angle is exactly $90^\\circ$, it is RIGHT. If one angle exceeds $90^\\circ$, it is OBTUSE. The angle-sum law immediately answers the counting question hiding inside this definition: how many non-acute angles can one triangle carry? Suppose two of them did — say angles of $91^\\circ$ and $95^\\circ$. Their sum alone is $186^\\circ$, already past $180^\\circ$, leaving the third angle at $180^\\circ - 186^\\circ = -6^\\circ$: not a number an angle can be. The engine states it as a positive sweep: over all $15{,}931$ positive integer triples $(a, b, c)$ with $a + b + c = 180$, at most one of the three ever reaches $90^\\circ$ or more. A triangle has AT MOST ONE non-acute angle — one right angle or one obtuse angle, never two, never a right angle beside an obtuse one.',
    },
    {
      kind: 'table',
      caption: 'The classification census — engine-swept witnesses',
      head: ['Class', 'Witness (angles in degrees)', 'Largest angle', 'Engine verdict'],
      rows: [
        ['obtuse', '$100, 40, 40$', '100', 'exactly one non-acute angle — the census allows it'],
        ['right', '$90, 62, 28$', '90', 'one right angle; the other two sum to 90'],
        ['acute', '$61, 60, 59$', '61', 'all three below 90 — the census is silent about acutes'],
      ],
    },
    {
      kind: 'para',
      text: 'The right triangle earns its own line, because its arithmetic rings a bell from the very first lesson of this chapter. If one angle is $90^\\circ$, the sum law forces the other two to sum to $90^\\circ$ — and 2.1 gave that sum a name: the two acute angles of a right triangle are COMPLEMENTARY. Lesson 2.1\'s complement arithmetic, learned for angles sharing a vertex, turns out to govern the two far corners of a right triangle as well — the right angle at the big vertex is quietly "eating" the $90^\\circ$ that the other two would need to reach a straight line. So the chapter opens and closes on the same number: $90^\\circ$ at a single vertex in 2.1, $90^\\circ$ split between two vertices here. One more census line completes the symmetry: the two acute angles of a right triangle can be ANY positive pair summing to $90^\\circ$ — the engine swept $a = 1$ to $89$ — and every such pair really occurs.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — the sum law certifies nothing about sides',
      text: 'The classification census is a census of ANGLES. Knowing the angles $(61, 60, 59)$ tells you the triangle is acute, and nothing whatever about whether it is equilateral, isosceles or scalene — a $(70, 70, 40)$ triangle is isosceles AND acute, a $(30, 30, 120)$ triangle is isosceles AND obtuse, and a $(45, 45, 90)$ triangle is both isosceles and right. Side classification (chapter 3\'s business, where congruence begins) and angle classification are independent sorting keys. Exams love to shuffle them: "an isosceles triangle must be acute" is FALSE — witness $(30, 30, 120)$.',
    },
    /* -------------------------------------------------------------- */
    /* 5. polygon sums by dissection                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Polygon sums by dissection' },
    {
      kind: 'para',
      text: 'The sum law earns its keep the moment we leave triangles behind. Take any CONVEX polygon — a polygon whose every interior angle is below $180^\\circ$, so that it bulges outward everywhere and any segment joining two of its points stays inside — and pick ONE vertex. From that vertex, draw every possible diagonal to the non-adjacent vertices: for an $n$-gon that is $n - 3$ diagonals, and they carve the polygon into $n - 2$ triangles that tile it with no gaps and no overlap. Every angle of every piece is borrowed from the polygon\'s own angles — the dissection cuts THROUGH vertices only at the chosen one, never through an interior angle elsewhere — so the polygon\'s interior angle sum is just the sum of its triangles\' angle sums: $(n - 2) \\cdot 180^\\circ$. The pentagon makes the counting visible: $5 - 3 = 2$ diagonals from one vertex, $5 - 2 = 3$ triangles, $3 \\cdot 180^\\circ = 540^\\circ$.',
    },
    {
      kind: 'derivation',
      title: 'Interior angle sum of a convex n-gon by dissection',
      statement: 'Claim: a convex polygon with $n$ sides has interior angle sum $(n - 2) \\cdot 180^\\circ$. The proof dissects the polygon into triangles from one vertex and counts.',
      steps: [
        { label: 'Count the diagonals from one vertex', formula: 'n - 3 \\text{ diagonals}', explanation: 'From the chosen vertex, a diagonal may run to every vertex except itself and its two neighbours: $n - 3$ targets, each giving one diagonal. In the pentagon: $2$.' },
        { label: 'Count the triangles', formula: 'n - 2 \\text{ triangles}', explanation: 'The $n - 3$ diagonals split the polygon into $n - 2$ triangular pieces: one new piece per diagonal, plus the first. In the pentagon: $3$ triangles — check it on the figure below.' },
        { label: 'Verify the tiling is angle-honest', formula: '\\sum(\\text{polygon angles}) = \\sum(\\text{triangle angles})', explanation: 'Each diagonal starts at the chosen vertex, so no interior angle of the polygon is ever cut in two; every triangle angle is a whole slice of a polygon angle, and every polygon angle is reassembled from its slices. Convexity keeps all diagonals inside.' },
        { label: 'Apply the sum law to each triangle', formula: '(n - 2) \\cdot 180^\\circ', explanation: 'Each of the $n - 2$ triangles contributes $180^\\circ$ by I.32, and the contributions add to the polygon\'s total. For $n = 3$ the formula returns the sum law itself — the triangle IS the base case.' },
      ],
      result: 'Interior sum of a convex $n$-gon $= (n - 2) \\cdot 180^\\circ$ — the triangle sum, batch-produced by dissection; $n - 3$ diagonals from one vertex, $n - 2$ triangles in the ledger.',
    },
    {
      kind: 'formula',
      name: 'Interior angle sum of a polygon',
      latex: 'S_{\\text{interior}} = (n - 2) \\cdot 180^\\circ',
      note: 'holds for every CONVEX n-gon; the dissection from one vertex gives n − 2 triangles',
    },
    {
      kind: 'table',
      caption: 'The pinned polygon ledger, n = 3 to 12 — every entry engine-swept',
      head: ['$n$', 'diagonals from one vertex', 'triangles', 'interior sum (degrees)'],
      rows: [
        ['3', '0', '1', '180'],
        ['4', '1', '2', '360'],
        ['5', '2', '3', '540'],
        ['6', '3', '4', '720'],
        ['7', '4', '5', '900'],
        ['8', '5', '6', '1080'],
        ['9', '6', '7', '1260'],
        ['10', '7', '8', '1440'],
        ['11', '8', '9', '1620'],
        ['12', '9', '10', '1800'],
      ],
    },
    {
      kind: 'figure',
      caption: 'The pentagon ledger and the walk-around. LEFT reading: from vertex $A$ the two diagonals $AC$ and $AD$ dissect the pentagon into three triangles (tinted), each contributing $180^\\circ$: the interior ledger reads $3 \\times 180^\\circ = 540^\\circ$. RIGHT reading: walk the boundary keeping the interior on your left, and at each vertex you TURN through the exterior angle — the small orange turning arcs; for the regular pentagon each turn is $72^\\circ$, and one full lap of ANY convex polygon turns you exactly $360^\\circ$. The same $360^\\circ$ is forced by algebra: five linear pairs give $540^\\circ + (\\text{exterior sum}) = 5 \\cdot 180^\\circ$, so the exterior sum is $360^\\circ$.',
      svg: (() => {
        const cx = 320, cy = 290, R = 140
        const V = geo24RegPoly(cx, cy, 5, R, -90)
        const [A, B, C, D, E] = V
        const parts: string[] = []
        // three dissected triangles, tinted
        parts.push(geo24Poly([A, B, C], c24.green, 1.4, '', c24.panel))
        parts.push(geo24Poly([A, C, D], c24.green, 1.4, '', c24.panel2))
        parts.push(geo24Poly([A, D, E], c24.green, 1.4, '', c24.paper))
        parts.push(geo24Poly(V, c24.green, 3))
        parts.push(geo24Line(A[0], A[1], C[0], C[1], c24.amber, 2.4))
        parts.push(geo24Line(A[0], A[1], D[0], D[1], c24.amber, 2.4))
        // 180 labels at the three centroids
        const cen = (p: PT[]): PT => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length]
        const g1 = cen([A, B, C]), g2 = cen([A, C, D]), g3 = cen([A, D, E])
        parts.push(geo24Txt(g1[0] + 16, g1[1], '180°', 12.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(g2[0], g2[1] + 6, '180°', 12.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(g3[0] - 16, g3[1], '180°', 12.5, c24.ink, 'middle', '700'))
        // walk-around turning arcs at each vertex (exterior angle, computed)
        for (let i = 0; i < 5; i++) {
          const Vi = V[i], Vp = V[(i + 4) % 5], Vn = V[(i + 1) % 5]
          const ux = Vi[0] - Vp[0], uy = Vi[1] - Vp[1]
          const ul = Math.hypot(ux, uy)
          const Pext: PT = [Vi[0] + (34 * ux) / ul, Vi[1] + (34 * uy) / ul]
          parts.push(geo24AngleArc(Vi, Pext, Vn, 24, c24.orange, 2.2, '', '', true, 12))
        }
        parts.push(geo24Txt(V[0][0], V[0][1] - 46, '72°', 12, c24.orange, 'middle', '700'))
        parts.push(geo24Txt(V[2][0] + 42, V[2][1] + 16, '72°', 12, c24.orange, 'middle', '700'))
        // vertices + labels
        const labs = ['A', 'B', 'C', 'D', 'E']
        const off: PT[] = [[0, -20], [22, -8], [24, 18], [-24, 18], [-22, -8]]
        for (let i = 0; i < 5; i++) {
          parts.push(geo24Dot(V[i][0], V[i][1], c24.ink, 4.2))
          parts.push(geo24Txt(V[i][0] + off[i][0], V[i][1] + off[i][1] + 14, labs[i], 13, c24.ink, 'middle', '700'))
        }
        parts.push(geo24Txt(cx, 468, 'interior ledger: 3 × 180° = 540°', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(cx, 496, 'walk-around: 5 × 72° = 360°', 13.5, c24.orange, 'middle', '700'))
        return geo24Svg(640, 520, 'A regular pentagon dissected from vertex A into three triangles each labelled 180 degrees, with exterior-angle turning arcs of 72 degrees at each vertex; the interior ledger 540 and the walk-around 360 noted below.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The walk-around deserves its own derivation, because it is the second, deeper reading of the exterior angle sum — the reading that survives even when the polygon is not regular, and the one a navigator or a robot would give. Walk the boundary of any convex polygon, keeping the interior on your left. At each vertex you TURN LEFT by exactly the exterior angle — the supplement of the interior angle there. When you arrive back at your starting point, facing your starting direction, you have turned through one full revolution: $360^\\circ$. The algebra agrees: $n$ linear pairs give $\\text{interior sum} + \\text{exterior sum} = n \\cdot 180^\\circ$, and substituting the interior sum $(n - 2) \\cdot 180^\\circ$ leaves the exterior sum exactly $360^\\circ$, for every $n$.',
    },
    {
      kind: 'derivation',
      title: 'The exterior-angle sum is 360 degrees for every convex polygon',
      statement: 'Claim: taking one exterior angle at each vertex of a convex $n$-gon, the exterior angles sum to $360^\\circ$, independent of $n$. Two proofs — the turning reading and the linear-pair algebra.',
      steps: [
        { label: 'The turning reading', formula: '\\sum \\text{turns} = 360^\\circ', explanation: 'Walk the boundary with the interior on your left. Each vertex contributes one left turn equal to its exterior angle; a closed lap returns you to your starting heading, and the total heading change of one lap is one full revolution.' },
        { label: 'The linear-pair algebra', formula: '\\text{interior}_i + \\text{exterior}_i = 180^\\circ', explanation: 'At each vertex the interior and exterior angle form a linear pair — 2.1 again. Summing over all $n$ vertices: total interior + total exterior $= n \\cdot 180^\\circ$.' },
        { label: 'Substitute the dissection sum', formula: '(n - 2) \\cdot 180^\\circ + \\text{exterior sum} = n \\cdot 180^\\circ', explanation: 'The interior total is $(n - 2) \\cdot 180^\\circ$ by the dissection just proved. The $n$ cancels on the right: the exterior sum cannot depend on the count of vertices.' },
        { label: 'Conclude', formula: '\\text{exterior sum} = 360^\\circ', explanation: 'One lap, one revolution: the walk-around total is $360^\\circ$ for the triangle, the hectogon, and everything between. The engine checked the identity for $n = 3$ to $12$.' },
      ],
      result: 'Exterior-angle sum $= 360^\\circ$ for EVERY convex polygon — the turning reading, confirmed by the linear-pair algebra; the number $n$ drops out entirely.',
    },
    {
      kind: 'formula',
      name: 'Exterior angle sum of a convex polygon',
      latex: '\\sum_{i=1}^{n} \\text{exterior}_i = 360^\\circ',
      note: 'one exterior angle per vertex, taken in the same walk direction; independent of n — one lap is one revolution',
    },
    {
      kind: 'example',
      title: 'A pentagon ledger: four interior angles $130^\\circ$, $108^\\circ$, $112^\\circ$, $95^\\circ$ — find the fifth',
      steps: [
        'Sol. The pentagon has $n = 5$ sides, so the interior ledger holds $(5 - 2) \\cdot 180^\\circ = 540^\\circ$.',
        'Add the four given angles: $130^\\circ + 108^\\circ + 112^\\circ + 95^\\circ = 445^\\circ$.',
        'Subtract from the ledger: the fifth angle is $540^\\circ - 445^\\circ = 95^\\circ$.',
        'Check convexity and honesty: $95^\\circ$ is strictly between $0^\\circ$ and $180^\\circ$, and so is every given angle — the answer is a genuine convex pentagon angle, and the engine confirmed $445 + 95 = 540$.',
        'Hence the fifth interior angle is $95^\\circ$ — the dissection ledger spent, one subtraction.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 6. regular polygons                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Regular polygons and the honest decimals' },
    {
      kind: 'para',
      text: 'A polygon is REGULAR when all its sides are equal and all its angles are equal — the equilateral triangle and the square are the first two. For a regular $n$-gon the two ledger theorems turn into single-division facts, because $n$ equal interior angles must share the interior sum equally and $n$ equal exterior angles must share $360^\\circ$ equally: each interior angle is $\\frac{(n - 2) \\cdot 180^\\circ}{n}$ and each exterior angle is $\\frac{360^\\circ}{n}$. Note the pleasant cross-check: the two formulas agree through the linear pair, since $\\frac{(n-2) \\cdot 180}{n} = 180 - \\frac{360}{n}$ — the interior is the exterior\'s supplement, vertex by vertex, as it must be.',
    },
    {
      kind: 'table',
      caption: 'Regular-polygon angles — every entry engine-swept; interiors for n = 3, 4, 5, 6, 8, 9, 10, 12 and exteriors for n = 3, 5, 6, 8, 9, 10, 12',
      head: ['$n$', 'name', 'interior angle (degrees)', 'exterior angle (degrees)'],
      rows: [
        ['3', 'equilateral triangle', '60', '120'],
        ['4', 'square', '90', '—'],
        ['5', 'regular pentagon', '108', '72'],
        ['6', 'regular hexagon', '120', '60'],
        ['8', 'regular octagon', '135', '45'],
        ['9', 'regular nonagon', '140', '40'],
        ['10', 'regular decagon', '144', '36'],
        ['12', 'regular dodecagon', '150', '30'],
      ],
    },
    {
      kind: 'para',
      text: 'Two rows of that table are deliberately missing, and their absence is the most instructive thing in the section. The regular $7$-gon (the heptagon) and the regular $11$-gon (the hendecagon) have interior angles $\\frac{900^\\circ}{7}$ and $\\frac{1620^\\circ}{11}$ — and neither fraction is a whole number of degrees. This book does not round what it can compute, so we print both faces of each number, exact fraction beside honest decimal: the heptagon\'s interior angle is $\\frac{900}{7} = 128\\frac{4}{7} \\approx 128.571429^\\circ$ (six decimal places), and the hendecagon\'s is $\\frac{1620}{11} = 147\\frac{3}{11} \\approx 147.272727^\\circ$. The engine audited the round trips: seven copies of $128.571429$ miss $900$ by less than one part in a hundred thousand, and eleven copies of $147.272727$ miss $1620$ the same way — the decimals are honest to their stated precision, and the fractions beside them are exact forever. When an exam asks for the interior angle of a regular heptagon, give the fraction; the decimal is a courtesy, not the answer.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the two-equation system every regular-polygon problem solves',
      text: 'Nearly every regular-polygon question in examinations is the same two-equation system in costume. Equation one is the linear pair: $i + e = 180^\\circ$, interior plus exterior at any vertex. Equation two is whatever the problem hands you — the interior is five times the exterior, or the exterior is $24^\\circ$, or the interior is $165^\\circ$. Solve the two-line system, then recover $n$ from the exterior: $n = \\frac{360^\\circ}{e}$, which must come out a whole number greater than 2 — the built-in check that catches arithmetic slips. If your $n$ is not an integer, you have made an error, because no regular polygon exists for fractional $n$.',
    },
    {
      kind: 'example',
      title: 'A regular-polygon system: the interior angle is triple the exterior angle — which polygon is it?',
      steps: [
        'Sol. Set up the two-equation system: the linear pair gives $i + e = 180^\\circ$, and the problem\'s condition gives $i = 3e$.',
        'Substitute: $3e + e = 180^\\circ$, so $4e = 180^\\circ$ and $e = 45^\\circ$.',
        'Recover the interior: $i = 180^\\circ - 45^\\circ = 135^\\circ$.',
        'Recover the count: $n = \\frac{360^\\circ}{45^\\circ} = 8$ — an integer, so the check passes.',
        'Hence the polygon is the regular octagon, with interior angles $135^\\circ$ and exterior angles $45^\\circ$ — matching the engine-swept table row for $n = 8$.',
      ],
    },
    {
      kind: 'formula',
      name: 'Regular polygon angles',
      latex: 'i = \\frac{(n - 2) \\cdot 180^\\circ}{n}, \\qquad e = \\frac{360^\\circ}{n}',
      note: 'equal angles share the ledgers equally; the two agree through the linear pair i + e = 180',
    },
    /* -------------------------------------------------------------- */
    /* 7. the non-Euclidean door                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The non-Euclidean door: when the sum is not 180' },
    {
      kind: 'para',
      text: 'Everything in this lesson so far rests on the one line the proof drew through the vertex, and that line exists because of the parallel postulate. It is time to show that the dependence is REAL — not an artefact of the proof but a property of the theorem — by exhibiting a world where the line cannot be drawn and the sum genuinely differs. You are standing on one. On a sphere, the "lines" — the curves of shortest travel, the great circles — all meet: every two great circles intersect in a pair of antipodal points, so through a point not on a great circle there are ZERO parallels to it. That is the first column of 2.2\'s census (Euclid $1$, sphere $0$, hyperbolic $\\infty$), and it means Playfair fails and the proof of I.32 cannot even begin.',
    },
    {
      kind: 'para',
      text: 'Here is the pinned construction, the smallest honest counterexample in the subject. Take the north pole $N$, and take two points $E_1$ and $E_2$ on the equator, a quarter of the way around from each other — $90^\\circ$ of longitude apart. The three great-circle arcs $N E_1$, $N E_2$ and the equatorial arc $E_1 E_2$ bound a triangle: one eighth of the sphere\'s surface, called the OCTANT. Now measure its angles. At $E_1$: the meridian arc strikes the equator at a right angle — meridians run due north-south, the equator runs due east-west, and the engine verified the perpendicularity as an honest dot product of the two tangent directions. At $E_2$, identically: $90^\\circ$. At $N$: the two meridians differ by $90^\\circ$ of longitude, and the engine verified their tangent directions at the pole are perpendicular as well. The octant has THREE RIGHT ANGLES: its angle sum is $270^\\circ$, and its spherical excess — the amount by which the sum exceeds $180^\\circ$ — is $90^\\circ$.',
    },
    {
      kind: 'figure',
      caption: 'The octant triangle. The north pole $N$ and the equator points $E_1$, $E_2$, ninety degrees of longitude apart, bound a triangle of three right angles (red square marks, each computed from the tangent directions): sum $= 270^\\circ$, spherical excess $= 90^\\circ$. The sphere is drawn in honest orthographic projection tilted $18^\\circ$ — every meridian, the equator, the visible and hidden halves, and the three right-angle markers are computed from the projection, not sketched. On the sphere the proof of I.32 cannot start: no parallel to the equator through $N$ exists, because every great circle meets the equator.',
      svg: geo24OctantSphere(false),
    },
    {
      kind: 'para',
      text: 'The excess is not a curiosity — it is the heartbeat of a whole geometry. On a sphere of any size, a triangle\'s angles sum to MORE than $180^\\circ$, and the excess $E = (a + b + c) - 180^\\circ$ is proportional to the triangle\'s area (Girard\'s theorem; the constant is such that the octant, one eighth of the whole surface, carries exactly $90^\\circ$ of excess — the engine cross-checked both routes). Small spherical triangles have small excess, which is why surveyors working on town-sized patches can pretend they live on Euclid\'s plane and get away with it. In the hyperbolic plane — the geometry with INFINITELY many parallels through a point, the third column of 2.2\'s census — the inequality flips: every triangle\'s angles sum to LESS than $180^\\circ$, with a DEFICIT that grows with area. Between them, the three geometries sweep the field: sum exactly $180^\\circ$ in Euclid\'s, more on the sphere, less in the hyperbolic world.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the equivalence, named honestly',
      text: 'The deepest fact on this street, and the reason the fifth postulate was worth two thousand years of argument: the Euclidean angle sum $180^\\circ$ and the parallel postulate are EQUIVALENT. In one direction you have watched it — the postulate proves the sum (I.32). In the other direction, if every triangle has angle sum $180^\\circ$, then the parallel postulate follows: the octant shows the contrapositive in action, for on the sphere the sum fails and so do the parallels. The full proof — both directions, in clean modern dress — is chapter 11\'s business, and this lesson hands it the machinery: the sum law, the exterior angle theorem, and the octant witness. When you arrive there, remember where the two-thousand-year argument ended: the postulate can never be PROVED from the rest, because worlds exist without it, and in those worlds the angle sum is the first thing to change.',
    },
    {
      kind: 'formula',
      name: 'Spherical excess',
      latex: 'E = (a + b + c) - 180^\\circ',
      note: 'the sphere\'s angle sum exceeds 180 by E; the octant (three right angles) carries E = 90 degrees — hyperbolic triangles instead run a deficit',
    },
    {
      kind: 'formula',
      name: 'Angle sum of a triangle (Euclid I.32)',
      latex: 'a + b + c = 180^\\circ',
      note: 'the chapter\'s payoff theorem: one parallel line through the vertex, two census carries, one straight angle — Euclidean geometry only',
    },
    /* -------------------------------------------------------------- */
    /* 8. exam corner + terms                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Exam corner: the four standard traps' },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — where this lesson loses marks, and how not to',
      text: 'TRAP ONE, the exterior angle at the WRONG vertex. The exterior angle theorem names the remote interiors — the two angles AWAY from the extended vertex. If side $BC$ is extended past $C$, the exterior angle equals $a + b$ (at $A$ and $B$), NOT $180^\\circ - a$, NOT $a + c$, NOT "the supplement of the far angle". Before writing anything, point at the extension and say which vertex it leaves from. TRAP TWO, the $n - 2$ versus $n$ miscount. The interior sum of an $n$-gon is $(n - 2) \\cdot 180^\\circ$, not $n \\cdot 180^\\circ$; the dissection count is $n - 2$ triangles from $n - 3$ diagonals. Sanity check: the formula must return $180^\\circ$ at $n = 3$. TRAP THREE, the degenerate triangle. Three collinear points give "angles" of $180^\\circ$, $0^\\circ$, $0^\\circ$ — the sum reads $180^\\circ$ and certifies nothing. A triangle needs three POSITIVE angles; if a computed third angle comes out $0^\\circ$ or negative, the figure was never a triangle. TRAP FOUR, forgetting the system. Regular-polygon questions are two equations: $i + e = 180^\\circ$ plus the given condition, then $n = 360^\\circ / e$ as the integer check. Candidates who multiply the interior by $n$ and hope — instead of solving the system — are guessing with extra steps.',
    },
    {
      kind: 'para',
      text: 'A closing word on presentation. When an examiner reads your solution to a triangle-angle problem, the full marks live in the NAMES of the licences, not the arithmetic: "angles on a line sum to $180^\\circ$" (2.1), "alternate interior angles are equal" (I.29), "the exterior angle equals the sum of the remote interiors" (I.32). The numbers are checkable by machine; the licence chain is the mathematics. This lesson has given you four such licences and one centrepiece proof — the next section\'s recap gathers them, and the quiz and exercises below make you use them until the names come without thinking.',
    },
    {
      kind: 'terms',
      items: [
        { term: 'angle sum property', def: 'the three interior angles of any (Euclidean) triangle sum to exactly $180^\\circ$ — Euclid I.32, proved with one parallel line through a vertex.' },
        { term: 'exterior angle', def: 'the angle between one side of a triangle and the extension of another side past their shared vertex; it equals the sum of the two remote interior angles.' },
        { term: 'remote interior angles', def: 'the two interior angles at the vertices NOT touched by a given exterior angle\'s extension.' },
        { term: 'acute, right, obtuse triangle', def: 'classified by the largest angle: all below $90^\\circ$; exactly one equal to $90^\\circ$; exactly one above $90^\\circ$. At most one non-acute angle is possible.' },
        { term: 'complementary acute angles of a right triangle', def: 'the two non-right angles of a right triangle sum to $90^\\circ$ — 2.1\'s complement arithmetic returning at scale.' },
        { term: 'convex polygon', def: 'a polygon whose interior angles are all below $180^\\circ$; every diagonal lies inside it, so the one-vertex dissection is honest.' },
        { term: 'regular polygon', def: 'a polygon with all sides equal and all angles equal; each interior angle is $(n - 2) \\cdot 180^\\circ / n$ and each exterior angle is $360^\\circ / n$.' },
        { term: 'spherical excess', def: 'the amount $E = (a + b + c) - 180^\\circ$ by which a spherical triangle\'s angle sum exceeds $180^\\circ$; the octant triangle carries $E = 90^\\circ$.' },
        { term: 'exterior angle sum (walk-around)', def: 'taking one exterior angle per vertex of any convex polygon, in one walk direction, the total is $360^\\circ$ — one lap is one revolution.' },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 9. quiz                                                        */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In the proof of I.32, after the line $\\ell$ is drawn through $A$ parallel to $BC$, the angle $b$ at $B$ is carried up to $A$ by which census licence?',
          options: [
            'Corresponding angles: $a_1 = a_5$',
            'alternate interior angles: $a_4 = a_6$, the I.29 licence',
            'Vertically opposite angles: $a_1 = a_3$',
            'Co-interior angles summing to $180^\\circ$',
          ],
          answer: 1,
          explain: 'On transversal $AB$, the triangle\'s angle $b$ occupies the $a_6$ position at $B$ (upper-right interior at the lower line), and its partner at $A$ is the lower-left interior angle $a_4$ — opposite sides of the transversal, both between the parallels: that is the definition of ALTERNATE interior angles, equal by I.29. Option (a) fails: corresponding angles pair same-side same-position angles like $a_1$ with $a_5$; the carried angle sits across the transversal, not in the corresponding position. Option (c) fails: vertical angles need two crossing lines at ONE vertex — $A$ and $B$ are different vertices, so nothing is vertically opposite here. Option (d) fails: co-interior angles are SUPPLEMENTS ($a_3 + a_6 = 180^\\circ$), and using that would give $180^\\circ - b$ at $A$, not $b$ — the sum would then overshoot.',
        },
        {
          q: 'Side $BC$ of triangle $ABC$ is extended past $C$ to $D$. The exterior angle $\\angle ACD$ equals —',
          options: [
            'the interior angle $c$ at $C$',
            '$180^\\circ$ minus the interior angle at $A$',
            'the sum of the interior angle at $C$ and the interior angle at $A$',
            'the sum of the two remote interior angles $a + b$',
          ],
          answer: 3,
          explain: 'The exterior angle at $C$ is the supplement of the adjacent interior $c$ (linear pair), and by I.32 that supplement is exactly $a + b$: the sum of the two remote interiors — option (d). Option (a) confuses the exterior with the interior it leans on; they are supplements, not equals. Option (b) computes $180^\\circ - a$, which equals $b + c$ — the sum involving the WRONG pair, adjacent-plus-remote instead of both remotes. Option (c) adds the adjacent interior $c$ to the remote $a$ — same wrong pair, and note it would exceed $180^\\circ - b$, an impossible exterior bound.',
        },
        {
          q: 'A convex heptagon ($n = 7$) is dissected into triangles from one vertex. How many triangles, and what is the interior angle sum?',
          options: [
            '5 triangles, 900°',
            '7 triangles, 1260°',
            '4 triangles, 720°',
            '5 triangles, 540°',
          ],
          answer: 0,
          explain: 'From one vertex of an $n$-gon the dissection draws $n - 3 = 4$ diagonals and produces $n - 2 = 5$ triangles; each contributes $180^\\circ$, so the interior sum is $5 \\cdot 180^\\circ = 900^\\circ$ — option (a). Option (b) commits the classic $n$ versus $n - 2$ miscount: seven triangles would need the sum $1260^\\circ$, which the dissection cannot deliver. Option (c) undercounts the diagonals-to-triangles step: four diagonals give FIVE triangles, not four (each new diagonal adds one region to the first one). Option (d) gets the triangle count right but the arithmetic wrong: $5 \\cdot 180^\\circ$ is $900^\\circ$, not $540^\\circ$.',
        },
        {
          q: 'On a sphere, the octant triangle (north pole plus two equator points $90^\\circ$ apart in longitude) has angle sum —',
          options: [
            'exactly 180°, because I.32 is a theorem about all triangles',
            'less than 180°, the spherical deficit',
            'a sum of 270°, with spherical excess 90°',
            'exactly 360°, because the equator is a great circle',
          ],
          answer: 2,
          explain: 'Each angle of the octant is a right angle — the meridians meet the equator perpendicularly and the two meridians differ by $90^\\circ$ of longitude — so the sum is $270^\\circ$ and the excess over $180^\\circ$ is $90^\\circ$: option (c). Option (a) is the trap the whole section arms you against: I.32 uses the parallel postulate, and on the sphere (zero parallels through a point) the proof cannot run and the conclusion genuinely fails. Option (b) describes the HYPERBOLIC plane, the third geometry of 2.2\'s census — on the sphere the excess is positive, not negative. Option (d) confuses the angle sum with a walk-around total; $360^\\circ$ is the exterior-turn sum of a polygon, not the angle sum of any triangle.',
        },
        {
          q: 'Two angles of a proposed triangle measure $91^\\circ$ and $95^\\circ$. What does the angle-sum law say?',
          options: [
            'The third angle is $-6^\\circ$, a reflex angle',
            'no such triangle exists — the two given angles already sum to more than 180°',
            'The third angle is $6^\\circ$, and the triangle is obtuse',
            'The third angle is $6^\\circ$, and the triangle is acute',
          ],
          answer: 1,
          explain: 'A triangle carries at most one non-acute angle; $91^\\circ + 95^\\circ = 186^\\circ$ already exceeds the whole $180^\\circ$ budget, leaving nothing (or less than nothing) for the third angle — so no such triangle exists: option (b). Option (a) invents a "reflex third angle" to save the figure; angles of a triangle are strictly between $0^\\circ$ and $180^\\circ$, and the angle-sum law is about genuine triangles. Options (c) and (d) both compute $180^\\circ - 186^\\circ = -6^\\circ$ and misreport it as $+6^\\circ$ — and even at $6^\\circ$ the triangle would still be impossible, which is why (d)\'s "acute" verdict doubles the error.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. graded exercises (15, L1–L6, full steps solutions)         */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the sum law and its consequences',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Two angles of a triangle measure $47^\\circ$ and $68^\\circ$. Find the third angle, and name the licence you used.',
              solution: [
                'Sol. The angle-sum property (Euclid I.32) says the three interior angles total $180^\\circ$.',
                'Write the ledger: $47^\\circ + 68^\\circ + x = 180^\\circ$.',
                'Add the given pair: $47^\\circ + 68^\\circ = 115^\\circ$.',
                'Subtract: $x = 180^\\circ - 115^\\circ = 65^\\circ$.',
                'Hence the third angle is $65^\\circ$, by the angle-sum property — the same subtraction the proof watched happening on the parallel line.',
              ],
              answer: 'The third angle is $65^\\circ$',
            },
            {
              q: 'In triangle $PQR$, side $PR$ is extended past $R$. The two remote interior angles measure $52^\\circ$ and $61^\\circ$. Find the exterior angle at $R$ and the interior angle at $R$.',
              solution: [
                'Sol. The exterior angle equals the sum of the two remote interior angles (I.32\'s second half).',
                'Add the remotes: $52^\\circ + 61^\\circ = 113^\\circ$ — that IS the exterior angle.',
                'The interior angle at $R$ is its linear-pair partner: $180^\\circ - 113^\\circ = 67^\\circ$.',
                'Check with the full ledger: $52^\\circ + 61^\\circ + 67^\\circ = 180^\\circ$ — the sum law holds.',
                'Hence the exterior angle at $R$ is $113^\\circ$ and the interior angle at $R$ is $67^\\circ$.',
              ],
              answer: 'Exterior $113^\\circ$; interior at $R$ is $67^\\circ$',
            },
            {
              q: 'A right triangle has one acute angle of $34^\\circ$. Find the other acute angle, and name the 2.1 concept that your answer illustrates.',
              solution: [
                'Sol. One angle of the triangle is $90^\\circ$, so the other two must share the remaining $90^\\circ$.',
                'Write the complement ledger: $34^\\circ + y = 90^\\circ$.',
                'Subtract: $y = 90^\\circ - 34^\\circ = 56^\\circ$.',
                'Check by the sum law: $90^\\circ + 34^\\circ + 56^\\circ = 180^\\circ$ — consistent.',
                'Hence the other acute angle is $56^\\circ$; the two acute angles of a right triangle are COMPLEMENTARY — 2.1\'s complement arithmetic, now at two different vertices.',
              ],
              answer: 'The other acute angle is $56^\\circ$ (the acute angles are complementary)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The angles of a triangle are in the ratio $2 : 3 : 4$. Find all three angles and classify the triangle.',
              solution: [
                'Sol. A ratio means a common multiple: the angles are $2k$, $3k$ and $4k$ degrees.',
                'Apply the sum law: $2k + 3k + 4k = 180^\\circ$, so $9k = 180^\\circ$.',
                'Divide: $k = 20^\\circ$.',
                'Recover the angles: $2k = 40^\\circ$, $3k = 60^\\circ$, $4k = 80^\\circ$.',
                'Hence the angles are $40^\\circ$, $60^\\circ$, $80^\\circ$ — all below $90^\\circ$, so the triangle is acute.',
              ],
              answer: 'Angles $40^\\circ$, $60^\\circ$, $80^\\circ$; the triangle is acute',
              figures: [
                {
                  caption: 'The $2:3:4$ triangle, constructed from its angles: arcs $40^\\circ$ at $B$, $60^\\circ$ at $C$, $80^\\circ$ at the apex $A$ — every arc computed from the constructed coordinates.',
                  svg: (() => {
                    const B: PT = [130, 350], C: PT = [430, 350]
                    const A: PT = geo24Apex(B, C, 60, 80)
                    const parts: string[] = []
                    parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
                    parts.push(geo24AngleArc(B, C, A, 46, c24.amber, 2.6, '60°', c24.amber))
                    parts.push(geo24AngleArc(C, B, A, 46, c24.teal, 2.6, '80°', c24.teal))
                    parts.push(geo24AngleArc(A, B, C, 44, c24.green, 2.6, '40°', c24.green))
                    parts.push(geo24Dot(A[0], A[1]), geo24Dot(B[0], B[1]), geo24Dot(C[0], C[1]))
                    parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt(B[0] - 16, B[1] + 22, 'B', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt(C[0] + 16, C[1] + 22, 'C', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt((A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3 + 40, '2k + 3k + 4k = 9k = 180°', 12, c24.tealInk, 'middle', '700'))
                    return geo24Svg(560, 420, 'Triangle with base angles 60 and 80 degrees and apex angle 40 degrees, labelled A, B, C, with the ratio ledger 2k plus 3k plus 4k equals 180.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'A convex polygon has interior angle sum $1260^\\circ$. How many sides does it have, and how many diagonals were drawn in the one-vertex dissection that proves it?',
              solution: [
                'Sol. The dissection ledger says the interior sum of an $n$-gon is $(n - 2) \\cdot 180^\\circ$.',
                'Set up: $(n - 2) \\cdot 180^\\circ = 1260^\\circ$.',
                'Divide by $180^\\circ$: $n - 2 = 7$, so $n = 9$ — a nonagon.',
                'The dissection draws $n - 3 = 9 - 3 = 6$ diagonals from one vertex, producing the $n - 2 = 7$ triangles.',
                'Hence the polygon has $9$ sides (a nonagon), and the dissection drew $6$ diagonals to make $7$ triangles.',
              ],
              answer: '$n = 9$ sides (a nonagon); the dissection draws $6$ diagonals',
            },
            {
              q: 'The interior angle of a regular polygon measures $165^\\circ$. Find the number of sides and the total interior sum.',
              solution: [
                'Sol. Use the linear pair at any vertex: interior plus exterior $= 180^\\circ$.',
                'Exterior angle: $e = 180^\\circ - 165^\\circ = 15^\\circ$.',
                'Recover the count: $n = \\frac{360^\\circ}{15^\\circ} = 24$ — an integer, so the built-in check passes.',
                'Interior sum: $(n - 2) \\cdot 180^\\circ = 22 \\cdot 180^\\circ = 3960^\\circ$.',
                'Hence the polygon has $24$ sides, with interior sum $3960^\\circ$ — a regular 24-gon.',
              ],
              answer: '$n = 24$ sides; interior sum $3960^\\circ$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The exterior angle at a vertex of a triangle measures $100^\\circ$. The two remote interior angles measure $(3x + 5)^\\circ$ and $(2x + 15)^\\circ$. Find $x$, both remote angles, and the interior angle at the extended vertex.',
              solution: [
                'Sol. The exterior angle equals the sum of the remote interiors.',
                'Write the equation: $(3x + 5) + (2x + 15) = 100$.',
                'Combine: $5x + 20 = 100$, so $5x = 80$ and $x = 16$.',
                'Recover the remotes: $3(16) + 5 = 53^\\circ$ and $2(16) + 15 = 47^\\circ$; check the sum: $53^\\circ + 47^\\circ = 100^\\circ$.',
                'The interior angle at the extended vertex is the linear-pair partner: $180^\\circ - 100^\\circ = 80^\\circ$; the full ledger reads $53 + 47 + 80 = 180$.',
                'Hence $x = 16$, the remote angles are $53^\\circ$ and $47^\\circ$, and the interior angle at the extended vertex is $80^\\circ$.',
              ],
              answer: '$x = 16$; remotes $53^\\circ$ and $47^\\circ$; interior at the vertex $80^\\circ$',
            },
            {
              q: 'Four angles of a convex pentagon measure $115^\\circ$ each. Find the fifth angle, and verify the answer is compatible with convexity.',
              solution: [
                'Sol. A pentagon has $n = 5$, so the interior ledger holds $(5 - 2) \\cdot 180^\\circ = 540^\\circ$.',
                'Add the four given angles: $4 \\cdot 115^\\circ = 460^\\circ$.',
                'Subtract: the fifth angle is $540^\\circ - 460^\\circ = 80^\\circ$.',
                'Convexity check: every angle — the four $115^\\circ$s and the $80^\\circ$ — lies strictly between $0^\\circ$ and $180^\\circ$, so the answer describes a genuine convex pentagon.',
                'Hence the fifth angle is $80^\\circ$; such a pentagon really exists (a cyclic one with central gaps $100^\\circ, 30^\\circ, 100^\\circ, 30^\\circ, 100^\\circ$ has exactly these angles — the engine constructed it).',
              ],
              answer: 'The fifth angle is $80^\\circ$ — convexity holds',
              figures: [
                {
                  caption: 'The pentagon with four angles of $115^\\circ$ and one of $80^\\circ$, constructed on a circle with central gaps $100^\\circ, 30^\\circ, 100^\\circ, 30^\\circ, 100^\\circ$ — the engine\'s realisation that the five given angles coexist convexly.',
                  svg: (() => {
                    const gaps = [100, 30, 100, 30, 100]
                    const cx = 300, cy = 280, R = 150
                    const V: PT[] = []
                    let a = -90
                    for (let i = 0; i < 5; i++) {
                      const rad = (a * Math.PI) / 180
                      V.push([cx + R * Math.cos(rad), cy + R * Math.sin(rad)])
                      a += gaps[i]
                    }
                    const parts: string[] = []
                    parts.push(geo24Circle(cx, cy, R, c24.faint, 1.6))
                    parts.push(geo24Poly(V, c24.green, 3, '', c24.paper))
                    for (let i = 0; i < 5; i++) {
                      const Vi = V[i], Vp = V[(i + 4) % 5], Vn = V[(i + 1) % 5]
                      const lbl = i === 0 ? '80°' : '115°'
                      parts.push(geo24AngleArc(Vi, Vp, Vn, i === 0 ? 42 : 34, i === 0 ? c24.orange : c24.amber, 2.4, lbl, i === 0 ? c24.orange : c24.amber, false, 14))
                      parts.push(geo24Dot(Vi[0], Vi[1], c24.ink, 4))
                    }
                    parts.push(geo24Txt(cx, 486, 'four angles 115° + one angle 80° = 540°', 13, c24.ink, 'middle', '700'))
                    return geo24Svg(600, 510, 'A convex pentagon on a circle with four interior angles marked 115 degrees and the fifth marked 80 degrees, with the ledger 540 below.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'A convex polygon has exterior angles (one per vertex, same walk direction) of $30^\\circ$, $45^\\circ$, $60^\\circ$ and three further EQUAL angles. Find the equal exterior angles, the number of sides, and all the interior angles.',
              solution: [
                'Sol. The walk-around law: the exterior angles of a convex polygon total $360^\\circ$.',
                'Add the known three: $30^\\circ + 45^\\circ + 60^\\circ = 135^\\circ$.',
                'The three equal exteriors share the rest: $3x = 360^\\circ - 135^\\circ = 225^\\circ$, so $x = 75^\\circ$.',
                'Count sides: $3 + 3 = 6$ sides, so the interior ledger is $(6 - 2) \\cdot 180^\\circ = 720^\\circ$.',
                'Interiors are the supplements: $150^\\circ$, $135^\\circ$, $120^\\circ$ and three of $105^\\circ$; check: $150 + 135 + 120 + 3 \\cdot 105 = 720^\\circ$.',
                'Hence the equal exterior angles are $75^\\circ$, the polygon has $6$ sides, and the interiors are $150^\\circ$, $135^\\circ$, $120^\\circ$, $105^\\circ$, $105^\\circ$, $105^\\circ$.',
              ],
              answer: 'Equal exteriors $75^\\circ$; $n = 6$; interiors $150^\\circ, 135^\\circ, 120^\\circ, 105^\\circ, 105^\\circ, 105^\\circ$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The interior angle of a regular polygon is five times its exterior angle. Find the polygon, its angles, and its interior sum.',
              solution: [
                'Sol. This is the two-equation system: the linear pair gives $i + e = 180^\\circ$.',
                'The condition gives $i = 5e$; substitute: $5e + e = 180^\\circ$, so $6e = 180^\\circ$.',
                'Solve: $e = 30^\\circ$ and $i = 150^\\circ$.',
                'Recover the count: $n = \\frac{360^\\circ}{30^\\circ} = 12$ — an integer, check passes.',
                'Interior sum: $(12 - 2) \\cdot 180^\\circ = 1800^\\circ$; cross-check via exteriors: $12 \\cdot 30^\\circ = 360^\\circ$ walk-around total.',
                'Hence the polygon is the regular dodecagon: interior $150^\\circ$, exterior $30^\\circ$, interior sum $1800^\\circ$.',
              ],
              answer: 'Regular dodecagon ($n = 12$): interior $150^\\circ$, exterior $30^\\circ$, interior sum $1800^\\circ$',
              figures: [
                {
                  caption: 'The regular 12-gon as a computed ring: one side extended to display the $30^\\circ$ exterior turn (orange), and the dashed circular arrow marks the walk-around — one lap $= 12 \\times 30^\\circ = 360^\\circ$.',
                  svg: (() => {
                    const cx = 300, cy = 280, R = 150
                    const V = geo24RegPoly(cx, cy, 12, R, -90)
                    const parts: string[] = []
                    parts.push(geo24Poly(V, c24.green, 3, '', c24.paper))
                    // extend the side V11->V0 beyond V0 and mark the 30-degree exterior turn
                    const V0 = V[0], V11 = V[11], V1 = V[1]
                    const ux = V0[0] - V11[0], uy = V0[1] - V11[1]
                    const ul = Math.hypot(ux, uy)
                    const Pext: PT = [V0[0] + (60 * ux) / ul, V0[1] + (60 * uy) / ul]
                    parts.push(geo24Line(V0[0], V0[1], Pext[0], Pext[1], c24.orange, 2.2))
                    parts.push(geo24AngleArc(V0, Pext, V1, 40, c24.orange, 2.4, '30°', c24.orange))
                    // walk-around ring: dashed circular arrow
                    parts.push(`<path d="M ${cx + 205} ${cy} A 205 205 0 1 1 ${cx - 205} ${cy - 0.01}" fill="none" stroke="${c24.amber}" stroke-width="2.2" stroke-dasharray="8,7"/>`)
                    parts.push(geo24Head(cx - 205, cy, 180, c24.amber, 9))
                    parts.push(geo24Txt(cx, 62, 'one lap: 12 × 30° = 360°', 13, c24.amber, 'middle', '700'))
                    parts.push(geo24Txt(cx, 512, 'regular 12-gon: interior 150°, exterior 30°', 13, c24.ink, 'middle', '700'))
                    return geo24Svg(600, 530, 'A regular dodecagon with one side extended showing the 30 degree exterior angle and a dashed circular walk-around arrow labelled one lap equals 360 degrees.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'In quadrilateral $ABCD$, the angles at $A$ and $C$ are supplementary: $\\angle A + \\angle C = 180^\\circ$ (with $\\angle A = 110^\\circ$). Prove that $\\angle B + \\angle D = 180^\\circ$, and give a witness quadrilateral.',
              solution: [
                'Sol. The quadrilateral is a 4-gon, so the interior ledger is $(4 - 2) \\cdot 180^\\circ = 360^\\circ$.',
                'Write the full ledger: $\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ$.',
                'Group: $(\\angle A + \\angle C) + (\\angle B + \\angle D) = 360^\\circ$.',
                'Substitute the given supplement: $180^\\circ + (\\angle B + \\angle D) = 360^\\circ$, so $\\angle B + \\angle D = 180^\\circ$ — supplementary as well.',
                'Witness: $\\angle A = 110^\\circ$, $\\angle C = 70^\\circ$ (sum $180^\\circ$), with $\\angle B = 95^\\circ$, $\\angle D = 85^\\circ$ (sum $180^\\circ$); the ledger reads $110 + 70 + 95 + 85 = 360$.',
                'Hence opposite angles supplementary on one pair forces the other pair supplementary too — the dissection ledger doing a proof\'s work in one line (a fact chapter 6 will meet again when cyclic quadrilaterals arrive).',
              ],
              answer: '$\\angle B + \\angle D = 180^\\circ$; witness $110^\\circ, 95^\\circ, 70^\\circ, 85^\\circ$',
            },
            {
              q: 'An isosceles triangle has vertex angle $36^\\circ$. Find the base angles, the exterior angle at a base vertex, and the exterior angle at the vertex.',
              solution: [
                'Sol. The sum law with equal base angles: $36^\\circ + 2b = 180^\\circ$.',
                'Solve: $2b = 144^\\circ$, so each base angle is $b = 72^\\circ$.',
                'Exterior at a base vertex: sum of the remote interiors $= 36^\\circ + 72^\\circ = 108^\\circ$.',
                'Exterior at the vertex: remote interiors are the two base angles, so it is $72^\\circ + 72^\\circ = 144^\\circ$.',
                'Check both by linear pairs: $108^\\circ + 72^\\circ = 180^\\circ$ at the base, $144^\\circ + 36^\\circ = 180^\\circ$ at the vertex.',
                'Hence the base angles are $72^\\circ$; the exterior at a base vertex is $108^\\circ$; the exterior at the vertex is $144^\\circ$.',
              ],
              answer: 'Base angles $72^\\circ$; exteriors $108^\\circ$ (base vertex) and $144^\\circ$ (vertex)',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Compute the interior angle sum of a convex 2025-gon, and state its exterior-angle sum. Then: how many triangles does the one-vertex dissection produce, and how many diagonals does it draw?',
              solution: [
                'Sol. The dissection ledger applies to every convex $n$-gon, however large: interior sum $= (n - 2) \\cdot 180^\\circ$.',
                'Substitute $n = 2025$: $(2025 - 2) \\cdot 180^\\circ = 2023 \\cdot 180^\\circ = 364{,}140^\\circ$.',
                'The exterior-angle sum is $360^\\circ$ — one lap is one revolution, whatever the count of vertices.',
                'Triangles: $n - 2 = 2023$; diagonals from the one vertex: $n - 3 = 2022$.',
                'Check the vertex identity: $364{,}140^\\circ + 360^\\circ = 364{,}500^\\circ = 2025 \\cdot 180^\\circ$ — the linear-pair total, as it must be.',
                'Hence the interior sum is $364{,}140^\\circ$, the exterior sum is $360^\\circ$, from $2023$ triangles and $2022$ diagonals.',
              ],
              answer: 'Interior sum $364{,}140^\\circ$; exterior sum $360^\\circ$; $2023$ triangles, $2022$ diagonals',
            },
            {
              q: 'The book refuses to round what it can compute. Write the interior angle of the regular 7-gon and the regular 11-gon as exact fractions AND as decimals to six places, then audit both decimals by the round trip.',
              solution: [
                'Sol. Each interior angle of a regular $n$-gon is $\\frac{(n - 2) \\cdot 180^\\circ}{n}$.',
                'Regular 7-gon: $\\frac{5 \\cdot 180^\\circ}{7} = \\frac{900^\\circ}{7} = 128\\frac{4}{7}^\\circ \\approx 128.571429^\\circ$.',
                'Regular 11-gon: $\\frac{9 \\cdot 180^\\circ}{11} = \\frac{1620^\\circ}{11} = 147\\frac{3}{11}^\\circ \\approx 147.272727^\\circ$.',
                'Round trip, 7-gon: $7 \\times 128.571429 = 900.000003$, which misses $900$ by $0.000003$ — within one part in a hundred thousand, honest to the stated six places.',
                'Round trip, 11-gon: $11 \\times 147.272727 = 1619.999997$, missing $1620$ by the same negligible margin.',
                'Hence the exact answers are $\\frac{900}{7}^\\circ$ and $\\frac{1620}{11}^\\circ$ (the fractions are the answers; the decimals are courtesies audited to six places).',
              ],
              answer: 'Regular 7-gon: $\\frac{900}{7} = 128\\frac{4}{7} \\approx 128.571429^\\circ$; regular 11-gon: $\\frac{1620}{11} = 147\\frac{3}{11} \\approx 147.272727^\\circ$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Girard\'s theorem says the area of a spherical triangle is its spherical excess (in radians) times $R^2$. Use it to find the area of the octant triangle on a sphere of radius $10$, and verify the answer by dividing the whole surface area — the engine\'s two-route cross-check.',
              solution: [
                'Sol. The octant\'s angles are $90^\\circ$, $90^\\circ$, $90^\\circ$: sum $270^\\circ$, excess $E = 270^\\circ - 180^\\circ = 90^\\circ$.',
                'Convert the excess to radians: $90^\\circ = \\frac{\\pi}{2}$.',
                'Girard: area $= E \\cdot R^2 = \\frac{\\pi}{2} \\cdot 10^2 = 50\\pi \\approx 157.0796$ square units.',
                'Second route: the octant is one eighth of the sphere\'s surface, and the full surface is $4\\pi R^2 = 400\\pi$.',
                'Divide: $\\frac{400\\pi}{8} = 50\\pi$ — the two routes agree exactly.',
                'Hence the octant\'s area on the $R = 10$ sphere is $50\\pi \\approx 157.0796$ — Girard\'s excess rule and the one-eighth dissection of the surface give the same number, which is exactly why the octant is the standard witness for every spherical-excess claim in this book.',
              ],
              answer: 'Area $= 50\\pi \\approx 157.0796$ square units — both routes agree',
              figures: [
                {
                  caption: 'The octant\'s area by dissection: the sphere\'s surface $4\\pi R^2$ (here $R = 10$) splits into eight octant triangles, so each carries $50\\pi$ — matching Girard\'s $E \\cdot R^2 = \\frac{\\pi}{2} \\cdot 100$.',
                  svg: geo24OctantSphere(true),
                },
              ],
            },
          ],
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. closing                                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What you now own' },
    {
      kind: 'para',
      text: 'Chapter 2 set out to earn one number, and this lesson cashed the cheque. The angle arithmetic of 2.1 supplied the straight angle; the fifth-postulate story of 2.2 supplied the one parallel line; the census of 2.3 supplied the two carries; and Euclid I.32 assembled them into $a + b + c = 180^\\circ$ — the theorem you had used all your life, now watched earning itself in five licensed steps. From it flowed the exterior angle theorem (equality by I.32, inequality already by I.16 — the honest split of which results cost the postulate), the classification census (at most one non-acute angle, by a $15{,}931$-triple sweep), the polygon ledgers ($(n-2) \\cdot 180^\\circ$ inside, $360^\\circ$ around), the regular-polygon tables with their unrounded fractions, and the non-Euclidean door: the octant\'s three right angles on the sphere you live on.',
    },
    {
      kind: 'para',
      text: 'Chapter 3 now opens the first door this lesson unlocked from the other side: triangles as OBJECTS — congruence, the side-angle-side engine, isosceles structure — where the angle facts you just earned become hypotheses to be matched, not just computed. The exterior-angle inequality will do steady work there, exactly as it has since Euclid. And when chapter 11 finally returns to prove that the angle sum and the parallel postulate are equivalent, it will find every tool already on the bench: the sum law, the octant witness, the 1 / 0 / $\\infty$ census of parallels. The two-thousand-year argument about the fifth postulate ended exactly where this lesson stands — with the discovery that the humblest fact in school geometry, $a + b + c = 180^\\circ$, is the parallel postulate wearing a triangle.',
    },
  ],
}
