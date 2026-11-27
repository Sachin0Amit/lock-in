import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c34 = {
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
  faint: '#5eead4', // faint dots, unpicked borders, grids
  white: '#ffffff',
  paper: '#fffdf5',
}
const f34 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo34 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo34Txt = (
  x: number, y: number, s: string,
  size = 13, color = c34.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f34}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo34Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c34.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo34Dot = (x: number, y: number, color = c34.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo34Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

/** arc on a circle (screen coords: angle 0 = east, increasing = clockwise on screen) */
const geo34Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo34Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo34Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c34.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo34Line(x1, y1, x2, y2, color, w) + geo34Head(x2, y2, a, color, 8)
}

/** single tick mark across the middle of a segment (equal-length marker) */
const geo34Tick = (x1: number, y1: number, x2: number, y2: number, color = c34.red, len = 13, w = 2.4): string => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const L = Math.hypot(x2 - x1, y2 - y1)
  const nx = -(y2 - y1) / L, ny = (x2 - x1) / L
  return geo34Line(mx - (nx * len) / 2, my - (ny * len) / 2, mx + (nx * len) / 2, my + (ny * len) / 2, color, w)
}

const geo34Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ------------------------------------------------------------------ */
/* F1 — the collapse strip: the genuine 3-5-7 arch (3 + 5 = 8 > 7)     */
/* beside the degenerate 3 + 5 = 8 laid flat; the apex swings down the */
/* arc of radius CA about C and dies on the line exactly at c = 8.     */
/* ------------------------------------------------------------------ */
const geo34Collapse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE COLLAPSE: WHEN 3 + 5 = 8 THE TRIANGLE FLATTENS', 13, c34.ink, 'middle', '700'))
  const s = 30
  const y0 = 268
  // LEFT — the genuine witness: B(0,0), C(3,0), A(5.5, 4.330127) at scale s
  const B: [number, number] = [50, y0], C: [number, number] = [50 + 3 * s, y0]
  const A: [number, number] = [50 + 5.5 * s, y0 - 4.330127 * s]
  parts.push(geo34Poly([B, C, A], c34.green, 0.12, c34.green, 2.6))
  parts.push(geo34Dot(B[0], B[1], c34.ink, 4) + geo34Dot(C[0], C[1], c34.ink, 4) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 13, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(A[0] + 4, A[1] - 12, 'A', 13, c34.ink))
  parts.push(geo34Txt((B[0] + C[0]) / 2, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(228, 208, '5', 13, c34.amber))
  parts.push(geo34Txt(122, 206, '7', 13, c34.amber))
  parts.push(geo34Txt(160, 322, '3 + 5 = 8 > 7: THE ARCH HOLDS', 12.5, c34.tealInk))
  // RIGHT — the degenerate triple: B2, C2 same spacing, apex swung flat to D
  const B2: [number, number] = [340, y0], C2: [number, number] = [340 + 3 * s, y0], D: [number, number] = [340 + 8 * s, y0]
  const A2: [number, number] = [340 + 5.5 * s, y0 - 4.330127 * s] // the lifted (genuine) position of the apex
  // the swing arc: apex slides down the circle of radius CA about C2
  const a0 = Math.atan2(A2[1] - C2[1], A2[0] - C2[0])
  const a1 = Math.atan2(D[1] - C2[1], D[0] - C2[0])
  parts.push(geo34Arc(C2[0], C2[1], 5 * s, a0, a1, c34.red, 2, '6 5'))
  parts.push(geo34Poly([B2, C2, A2], c34.red, 0.05, c34.red, 1.6, '4 5'))
  parts.push(geo34Line(B2[0], y0, D[0], y0, c34.red, 3))
  parts.push(geo34Dot(B2[0], y0, c34.ink, 4) + geo34Dot(C2[0], y0, c34.ink, 4) + geo34Dot(D[0], y0, c34.red, 4.5))
  parts.push(geo34Txt(B2[0] - 13, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C2[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(D[0], y0 + 24, 'A flat', 12.5, c34.red))
  parts.push(geo34Txt((B2[0] + C2[0]) / 2, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt((C2[0] + D[0]) / 2, y0 + 34, '5', 13, c34.amber))
  parts.push(geo34Txt(460, 152, 'the apex swings down', 11.5, c34.tealInk))
  parts.push(geo34Txt(460, 168, 'the arc of radius 5', 11.5, c34.tealInk))
  parts.push(geo34Txt(460, 322, '3 + 5 = 8 = 8: FLAT, REFUSED', 12.5, c34.red))
  return geo34Svg(640, 344, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the hinge: compass arms of length 5 from one vertex O, the     */
/* common lower arm, openings 40 and 60, both third sides drawn.       */
/* ------------------------------------------------------------------ */
const geo34Hinge = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE HINGE: COMPASS ARMS OF LENGTH 5', 13, c34.ink, 'middle', '700'))
  parts.push(geo34Txt(320, 46, 'the wider the opening, the farther the tips', 12, c34.tealInk))
  const O: [number, number] = [130, 300]
  const R = 170
  const P1: [number, number] = [O[0] + R, O[1]]
  const rad = (d: number): number => (d * Math.PI) / 180
  const arm = (deg: number): [number, number] => [O[0] + R * Math.cos(rad(deg)), O[1] - R * Math.sin(rad(deg))]
  const T40 = arm(40), T60 = arm(60)
  // common lower arm + the two upper arms
  parts.push(geo34Line(O[0], O[1], P1[0], P1[1], c34.green, 2.8))
  parts.push(geo34Line(O[0], O[1], T40[0], T40[1], c34.amber, 2.6))
  parts.push(geo34Line(O[0], O[1], T60[0], T60[1], c34.orange, 2.8))
  // third sides: 10 sin 20 (dashed amber) and 10 sin 30 (orange)
  parts.push(geo34Line(T40[0], T40[1], P1[0], P1[1], c34.amber, 2.6, '7 5'))
  parts.push(geo34Line(T60[0], T60[1], P1[0], P1[1], c34.orange, 3))
  // the two opening arcs at O
  parts.push(geo34Arc(O[0], O[1], 48, 0, rad(-40), c34.amber, 2.4))
  parts.push(geo34Arc(O[0], O[1], 68, 0, rad(-60), c34.orange, 2.6))
  // dots + vertex label
  parts.push(geo34Dot(O[0], O[1], c34.ink, 4.5) + geo34Dot(P1[0], P1[1], c34.ink, 4) + geo34Dot(T40[0], T40[1], c34.amber, 4) + geo34Dot(T60[0], T60[1], c34.orange, 4))
  parts.push(geo34Txt(O[0] - 14, O[1] + 6, 'O', 13, c34.ink))
  parts.push(geo34Txt(P1[0] + 12, P1[1] + 6, 'T', 13, c34.ink))
  // labels: arm lengths, openings, third-side values
  parts.push(geo34Txt(208, 322, '5', 13, c34.mid))
  parts.push(geo34Txt(206, 246, '5', 13, c34.mid))
  parts.push(geo34Txt(146, 226, '5', 13, c34.mid))
  parts.push(geo34Txt(186, 281, '40°', 12.5, c34.amber, 'end'))
  parts.push(geo34Txt(204, 254, '60°', 12.5, c34.orange, 'start'))
  parts.push(geo34Txt(316, 252, '≈ 3.42', 12.5, c34.amber, 'start'))
  parts.push(geo34Txt(244, 214, '= 5', 12.5, c34.orange, 'end'))
  parts.push(geo34Txt(320, 331, 'THIRD SIDES: 10 sin 20° ≈ 3.42 (DASHED) AND 10 sin 30° = 5', 12, c34.ink))
  return geo34Svg(640, 344, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F3 — the exterior angle at C on the 3-5-7 witness: extension of BC  */
/* beyond C, the 60° exterior arc, remotes 21.79° and 38.21°, the      */
/* sum-vs-each annotation.                                             */
/* ------------------------------------------------------------------ */
const geo34Exterior = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE EXTERIOR ANGLE AT C ON THE 3, 5, 7 WITNESS', 13, c34.ink, 'middle', '700'))
  const s = 40
  const y0 = 300
  const B: [number, number] = [70, y0], C: [number, number] = [70 + 3 * s, y0]
  const A: [number, number] = [70 + 5.5 * s, y0 - 4.330127 * s]
  const X: [number, number] = [C[0] + 150, y0] // the extension ray
  // triangle + extension
  parts.push(geo34Poly([B, C, A], c34.green, 0.1, c34.green, 2.6))
  parts.push(geo34Arrow(C[0], y0, X[0], y0, c34.teal, 2.4))
  parts.push(geo34Dot(B[0], y0, c34.ink, 4) + geo34Dot(C[0], y0, c34.ink, 4) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 14, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(A[0] + 12, A[1] - 6, 'A', 13, c34.ink))
  parts.push(geo34Txt(130, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(252, 222, '5', 13, c34.amber))
  parts.push(geo34Txt(160, 210, '7', 13, c34.amber))
  parts.push(geo34Txt(300, 288, 'extension of BC', 11.5, c34.tealInk))
  // interior angle at C = 120 (arc from direction pi to direction 5 pi / 3)
  const dCA = Math.atan2(A[1] - C[1], A[0] - C[0]) // direction of ray C->A
  parts.push(geo34Arc(C[0], C[1], 30, Math.PI, dCA + 2 * Math.PI, c34.mid, 2))
  parts.push(geo34Txt(163, 252, '120°', 12, c34.mid))
  // exterior angle at C = 60 (arc from ray C->A to the eastward extension)
  parts.push(geo34Arc(C[0], C[1], 48, dCA + 2 * Math.PI, 2 * Math.PI, c34.orange, 3))
  parts.push(geo34Txt(248, 270, '60°', 13.5, c34.orange))
  // remote interior angles: 21.79 at A, 38.21 at B
  const dAB = Math.atan2(B[1] - A[1], B[0] - A[0]) // ray A->B
  const dAC = Math.atan2(C[1] - A[1], C[0] - A[0]) // ray A->C
  parts.push(geo34Arc(A[0], A[1], 42, dAC, dAB, c34.tealInk, 2.2))
  parts.push(geo34Txt(256, 166, '21.79°', 12, c34.tealInk))
  const dBA = Math.atan2(A[1] - B[1], A[0] - B[0]) // ray B->A
  parts.push(geo34Arc(B[0], B[1], 46, dBA, 0, c34.tealInk, 2.2))
  parts.push(geo34Txt(122, 286, '38.21°', 12, c34.tealInk))
  // the sum-vs-each annotation (the exam-gold distinction)
  parts.push(geo34Txt(486, 120, 'exterior at C = 60°', 12.5, c34.ink))
  parts.push(geo34Txt(486, 142, '60 = 21.79 + 38.21 (angle sum)', 12, c34.mid))
  parts.push(geo34Txt(486, 164, '60 > 21.79 and 60 > 38.21', 12, c34.orange))
  parts.push(geo34Txt(486, 186, 'each remote separately (I.16)', 12, c34.orange))
  return geo34Svg(640, 352, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F4 — Euclid's I.20 chain on the witness: extend BC beyond C to D    */
/* with CD = CA (isosceles detour; equilateral on this witness).       */
/* ------------------------------------------------------------------ */
const geo34I20 = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'EUCLID\u2019S I.20 CHAIN: THE ISOSCELES DETOUR', 13, c34.ink, 'middle', '700'))
  parts.push(geo34Txt(320, 46, 'I.19 on triangle ABD: BD = 8 > BA = 7, so BA < BC + CA', 12, c34.tealInk))
  const s = 40
  const y0 = 296
  const B: [number, number] = [50, y0], C: [number, number] = [50 + 3 * s, y0], D: [number, number] = [50 + 8 * s, y0]
  const A: [number, number] = [50 + 5.5 * s, y0 - 4.330127 * s]
  // the extended base + the two triangles
  parts.push(geo34Line(B[0], y0, D[0], y0, c34.ink, 2.6))
  parts.push(geo34Poly([B, C, A], c34.green, 0.12, c34.green, 2.6))
  parts.push(geo34Poly([C, D, A], c34.panel, 0.55, c34.amber, 2.4, '7 5'))
  parts.push(geo34Dot(B[0], y0, c34.ink, 4) + geo34Dot(C[0], y0, c34.ink, 4) + geo34Dot(D[0], y0, c34.red, 4.5) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 14, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(D[0] + 13, y0 + 6, 'D', 13, c34.red))
  parts.push(geo34Txt(A[0] - 14, A[1] - 8, 'A', 13, c34.ink))
  // side values + the equal-length ticks on CA and CD
  parts.push(geo34Txt(110, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(214, 208, '5', 13, c34.amber))
  parts.push(geo34Txt(142, 208, '7', 13, c34.amber))
  parts.push(geo34Txt(270, y0 + 34, '5', 13, c34.amber))
  parts.push(geo34Txt(334, 210, '5', 13, c34.amber))
  parts.push(geo34Tick(C[0], y0, A[0], A[1], c34.red))
  parts.push(geo34Tick(C[0], y0, D[0], y0, c34.red))
  // angle marks: 60 at D, 60 (CAD) and 81.79 (BAD) and 21.79 (BAC) at A
  const dDA = Math.atan2(A[1] - D[1], A[0] - D[0])
  parts.push(geo34Arc(D[0], D[1], 40, Math.PI, dDA + 2 * Math.PI, c34.amber, 2.4))
  parts.push(geo34Txt(334, 278, '60°', 12.5, c34.amber))
  const dAB = Math.atan2(B[1] - A[1], B[0] - A[0])
  const dAC = Math.atan2(C[1] - A[1], C[0] - A[0])
  const dAD = Math.atan2(D[1] - A[1], D[0] - A[0])
  parts.push(geo34Arc(A[0], A[1], 34, dAD, dAC, c34.amber, 2.4))
  parts.push(geo34Txt(A[0], A[1] + 46, '60°', 12.5, c34.amber))
  parts.push(geo34Arc(A[0], A[1], 66, dAD, dAB, c34.orange, 2.6))
  parts.push(geo34Txt(A[0] - 18, A[1] + 76, '81.79°', 12.5, c34.orange))
  parts.push(geo34Arc(A[0], A[1], 88, dAC, dAB, c34.tealInk, 2))
  parts.push(geo34Txt(A[0] + 34, A[1] - 26, '21.79°', 12, c34.tealInk))
  // the BD verdict line under the base
  parts.push(geo34Line(B[0], y0 + 46, D[0], y0 + 46, c34.faint, 1.4, '4 4'))
  parts.push(geo34Txt(210, y0 + 66, 'BD = BC + CD = 3 + 5 = 8', 12.5, c34.red))
  return geo34Svg(640, 376, aria, parts)
}

/* ------------------------------------------------------------------ */
/* solution mini-figures — the named trio: the collapse, the hinge     */
/* swing, the detour path                                              */
/* ------------------------------------------------------------------ */
const geo34SolCollapse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE COLLAPSE 3 + 5 = 8', 13, c34.ink, 'middle', '700'))
  const s = 22
  const y0 = 150
  const B: [number, number] = [30, y0], C: [number, number] = [30 + 3 * s, y0], D: [number, number] = [30 + 8 * s, y0]
  const A: [number, number] = [30 + 5.5 * s, y0 - 4.330127 * s] // the genuine (c = 7) apex position
  const a0 = Math.atan2(A[1] - C[1], A[0] - C[0])
  const a1 = Math.atan2(D[1] - C[1], D[0] - C[0])
  parts.push(geo34Arc(C[0], C[1], 5 * s, a0, a1, c34.red, 2, '5 4'))
  parts.push(geo34Poly([B, C, A], c34.red, 0.06, c34.red, 1.6, '4 4'))
  parts.push(geo34Line(B[0], y0, D[0], y0, c34.red, 2.8))
  parts.push(geo34Dot(B[0], y0, c34.ink, 3.5) + geo34Dot(C[0], y0, c34.ink, 3.5) + geo34Dot(D[0], y0, c34.red, 4))
  parts.push(geo34Txt(B[0] - 11, y0 + 16, 'B', 12, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 16, 'C', 12, c34.ink))
  parts.push(geo34Txt(D[0] + 10, y0 + 4, 'A flat', 11.5, c34.red, 'start'))
  parts.push(geo34Txt((B[0] + C[0]) / 2, y0 + 32, '3', 12, c34.amber))
  parts.push(geo34Txt((C[0] + D[0]) / 2, y0 + 32, '5', 12, c34.amber))
  parts.push(geo34Txt(210, 196, 'the two shorter sides end to end exactly reach 8:', 11.5, c34.tealInk))
  parts.push(geo34Txt(210, 212, 'area 0, three collinear points — REFUSED', 12, c34.red))
  return geo34Svg(420, 224, aria, parts)
}

const geo34SolHinge = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE HINGE SWING: 40° VERSUS 60°', 13, c34.ink, 'middle', '700'))
  const O: [number, number] = [70, 178]
  const R = 110
  const rad = (d: number): number => (d * Math.PI) / 180
  const P1: [number, number] = [O[0] + R, O[1]]
  const T40: [number, number] = [O[0] + R * Math.cos(rad(40)), O[1] - R * Math.sin(rad(40))]
  const T60: [number, number] = [O[0] + R * Math.cos(rad(60)), O[1] - R * Math.sin(rad(60))]
  parts.push(geo34Line(O[0], O[1], P1[0], P1[1], c34.green, 2.4))
  parts.push(geo34Line(O[0], O[1], T40[0], T40[1], c34.amber, 2.2))
  parts.push(geo34Line(O[0], O[1], T60[0], T60[1], c34.orange, 2.4))
  parts.push(geo34Line(T40[0], T40[1], P1[0], P1[1], c34.amber, 2.2, '6 4'))
  parts.push(geo34Line(T60[0], T60[1], P1[0], P1[1], c34.orange, 2.6))
  parts.push(geo34Arc(O[0], O[1], 32, 0, rad(-40), c34.amber, 2))
  parts.push(geo34Arc(O[0], O[1], 46, 0, rad(-60), c34.orange, 2.2))
  parts.push(geo34Dot(O[0], O[1], c34.ink, 3.5) + geo34Dot(P1[0], P1[1], c34.ink, 3.5) + geo34Dot(T40[0], T40[1], c34.amber, 3.5) + geo34Dot(T60[0], T60[1], c34.orange, 3.5))
  parts.push(geo34Txt(O[0] - 12, O[1] + 5, 'O', 12, c34.ink))
  parts.push(geo34Txt(137, 196, '5', 12, c34.mid))
  parts.push(geo34Txt(136, 148, '5', 12, c34.mid))
  parts.push(geo34Txt(104, 136, '5', 12, c34.mid))
  parts.push(geo34Txt(128, 170, '40°', 11.5, c34.amber, 'end'))
  parts.push(geo34Txt(122, 150, '60°', 11.5, c34.orange, 'end'))
  parts.push(geo34Txt(212, 160, '≈ 3.42', 12, c34.amber, 'start'))
  parts.push(geo34Txt(172, 122, '= 5', 12, c34.orange, 'end'))
  parts.push(geo34Txt(210, 218, 'arms 5 and 5: 10 sin 20° ≈ 3.42 < 10 sin 30° = 5', 11.5, c34.tealInk))
  return geo34Svg(420, 230, aria, parts)
}

const geo34SolDetour = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE DETOUR VERSUS THE STRAIGHT PATH', 13, c34.ink, 'middle', '700'))
  const s = 26
  const P: [number, number] = [50, 190], R: [number, number] = [50 + 3 * s, 190 - 4 * s], Q: [number, number] = [50 + 8 * s, 190 - 4 * s]
  // the broken path P -> R -> Q (refused length) and the straight segment
  parts.push(geo34Arrow(P[0], P[1], R[0], R[1], c34.red, 2.2))
  parts.push(geo34Arrow(R[0], R[1], Q[0], Q[1], c34.red, 2.2))
  parts.push(geo34Line(P[0], P[1], Q[0], Q[1], c34.green, 3))
  parts.push(geo34Dot(P[0], P[1], c34.ink, 4) + geo34Dot(R[0], R[1], c34.red, 4) + geo34Dot(Q[0], Q[1], c34.ink, 4))
  parts.push(geo34Txt(P[0] - 14, P[1] + 5, 'P', 12.5, c34.ink))
  parts.push(geo34Txt(R[0], R[1] - 12, 'R', 12.5, c34.red))
  parts.push(geo34Txt(Q[0] + 14, Q[1] + 5, 'Q', 12.5, c34.ink))
  parts.push(geo34Txt(70, 122, '5', 12.5, c34.red))
  parts.push(geo34Txt(180, 100, '5', 12.5, c34.red))
  parts.push(geo34Txt(150, 186, 'straight: 4√5 ≈ 8.94', 12, c34.green))
  parts.push(geo34Txt(210, 218, 'broken path 5 + 5 = 10 > 8.94: the straight route wins', 11.5, c34.tealInk))
  return geo34Svg(420, 232, aria, parts)
}

/* ================================================================== */
/* LESSON 3.4 — Inequalities in a Triangle: Sides and Angles           */
/* ================================================================== */
export const lessonGeo304: Lesson = {
  id: 'geo-inequalities-in-a-triangle-sides-and-angles',
  number: '3.4',
  title: 'Inequalities in a Triangle: Sides and Angles',
  concepts: [
    'triangle inequality',
    'degenerate triangle',
    'exterior angle inequality',
    'larger side larger angle',
    'larger angle larger side',
    'hinge theorem',
    'converse of the hinge',
  ],
  objectives: [
    'State the triangle inequality (Euclid I.20) and use it as an existence screen on triples of lengths, refusing the short and the degenerate cases with named reasons',
    'Convert the three pair-sum inequalities into the bound $|b - c| < a < b + c$ and apply it as an instant eliminator on multiple-choice items',
    'State the exterior angle inequality (Euclid I.16) and distinguish its strict verdict on EACH remote interior angle from the equality with their SUM',
    'Use the ordering theorems I.18 and I.19 in both directions to pair the longest side with the largest angle without any computation',
    'State and apply the hinge theorem and its converse to compare third sides of triangles with two pairwise equal sides',
  ],
  prerequisites: [
    'geo-congruence-the-idea-of-same-shape-and-size',
    'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
    'geo-isosceles-triangles-the-classic-consequences',
  ],
  sources: ['geo-euclid-elements', 'cengage-m1-05', 'geo-ch03-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'From equalities to inequalities: the shadow of the craft' },
    {
      kind: 'para',
      text: 'Lessons 3.2 and 3.3 were equality theorems. The five congruence criteria certify that two triangles match exactly; pons asinorum certifies that two angles of one triangle match exactly. Beautiful — and dangerously incomplete, because the triangles of the real world are rarely asked whether they match. They are asked whether they CAN EXIST. Will three struts of lengths $3$, $5$ and $8$ close into a bridge truss? No: laid end to end the two shorter ones exactly span the third, and the frame collapses flat onto the ground. Will a fence of length $10$ reach from one post to another if it must bend round a depot? No: the bend makes it longer than the straight route it competes with, and it sags or falls short. Both failures are INEQUALITY failures — the mathematics of what is bigger than what — and this lesson is the chapter\u2019s dedicated study of that shadow side.',
    },
    {
      kind: 'para',
      text: 'The questions we shall answer are exactly the three a designer asks. FIRST, the existence question: which triples of lengths close into a triangle at all? The answer is the triangle inequality, Euclid\u2019s Proposition I.20 — in his own words, in any triangle two sides taken together in any manner are greater than the remaining one. SECOND, the ordering question: in a triangle that does exist, which side is longest and which angle is largest, and how are those two questions related? The answer is the ordering pair, I.18 and I.19 — the greater side subtends the greater angle, and conversely. THIRD, the comparison question: two triangles built on equal pairs of sides — which one has the longer third side? The answer is the hinge theorem and its converse. Between the existence law and the ordering laws sits one more gem, Euclid I.16: the exterior angle of a triangle exceeds each remote interior angle, a fact Euclid proves WITHOUT the parallel postulate and which powers the proofs of both ordering theorems.',
    },
    {
      kind: 'para',
      text: 'The discipline of the lesson is the chapter\u2019s discipline: the engine first, prose second. Every number you will read here — the $125$ genuine triples out of $220$ candidates in the existence census, the angles $21.786789°$, $38.213211°$ and $120°$ of the pinned $3$-$5$-$7$ witness, the hinge lengths $3.420201$ and $5$ on arms of length $5$ — has been recomputed by brute force before a word of this text was fixed. The witness triangle is announced now and used throughout: sides $a = 3$, $b = 5$, $c = 7$ under the chapter notation law, so that every theorem can be SEEN acting on one set of numbers, and every figure in the lesson draws that same triangle.',
    },
    {
      kind: 'para',
      text: 'A last word on why this material is exam gold rather than mere caution. Inequality facts are the fastest eliminations in the entire subject: a multiple-choice option proposing a third side of $14$ for a triangle already holding sides $4$ and $9$ is dead on arrival ($4 + 9 = 13 < 14$), killed in one line with no drawing at all. The inequality theory is where wrong designs collapse before anyone builds them — and the craft of citing I.16, I.18, I.19 and I.20 by content, not by number, is what turns a lucky guess into a proof.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the triangle inequality I.20 + the degenerate case + census  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The triangle inequality: the existence law (Euclid I.20)' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.20 — the triangle inequality',
      text: 'In any triangle, each side is strictly less than the sum of the other two. Under the chapter notation ($a = BC$ opposite $A$, $b = CA$ opposite $B$, $c = AB$ opposite $C$) the law reads: $a < b + c$, $b < c + a$ and $c < a + b$. Equivalently — and this is the form the existence screen uses — three lengths can close into a triangle exactly when the longest of them is less than the sum of the other two.',
    },
    {
      kind: 'para',
      text: 'The equivalence in the last sentence deserves one honest line of proof, because it halves the work of every application. Order the lengths so that $a \le b \le c$. Then the two inequalities not mentioning the longest side are automatic: $a + c \ge b + 1 > b$ and $b + c > a$ hold for any positive lengths with $c$ largest. So of the three pair-sum demands, only $a + b > c$ can ever fail — the screen may consult the longest side alone. The engine verifies this single-screen law across the entire census of the lesson: for every one of the $220$ ordered triples with $1 \le a \le b \le c \le 10$, the three-inequality verdict and the one-inequality verdict agree exactly.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.20 — the triangle inequality, the existence law',
      statement: 'We prove the representative inequality $BA < BC + CA$; the other two follow by relabelling the vertices. Euclid\u2019s proof plants an isosceles detour on the extended base and lets the ordering theorem I.19 pull the conclusion out of an angle comparison.',
      steps: [
        {
          label: 'Set up the extension',
          formula: 'D \\text{ beyond } C \\text{ on line } BC,\\quad CD = CA',
          explanation: 'Produce the side $BC$ past $C$ and mark the point $D$ on the extension with $CD = CA$ (Euclid builds it with his Proposition I.3). A new triangle $ACD$ appears alongside the original — isosceles by construction, and this detour triangle is the engine of the proof.',
        },
        {
          label: 'The isosceles detour',
          formula: '\\angle CAD = \\angle ADC',
          explanation: 'Since $CA = CD$, pons asinorum (Lesson 3.3, Euclid I.5) gives the base angles of triangle $ACD$ equal: the angle $CAD$ at $A$ equals the angle $ADC$ at $D$.',
        },
        {
          label: 'The split at A',
          formula: '\\angle BAD = \\angle BAC + \\angle CAD',
          explanation: 'The point $C$ sits between $B$ and $D$ on the line, so the ray $AC$ lies inside the angle $BAD$, and the whole angle is the sum of its two parts. The whole is greater than the part — Euclid\u2019s Common Notion 5, one of his axioms.',
        },
        {
          label: 'The angle comparison',
          formula: '\\angle BAD > \\angle ADC = \\angle ADB',
          explanation: 'Chaining the last two steps: $\\angle BAD > \\angle CAD = \\angle ADC$. And the angle $ADC$ is the very same angle as $ADB$, because $B$ and $C$ lie on the same side of $D$ — the rays $DB$ and $DC$ coincide.',
        },
        {
          label: 'I.19 on triangle ABD',
          formula: '\\angle BAD > \\angle ADB \\;\\Rightarrow\\; BD > BA',
          explanation: 'In triangle $ABD$ the angle at $A$ beats the angle at $D$, so by I.19 — the greater angle is subtended by the greater side, proved in this lesson from I.18 — the side facing the greater angle is greater: $BD > BA$.',
        },
        {
          label: 'Substitute the extension',
          formula: 'BD = BC + CD = BC + CA > BA',
          explanation: 'But $D$ was built beyond $C$ on the line, so $BD = BC + CD = BC + CA$. Combining: $BA < BC + CA$, which is the law for the side $BA$; relabelling gives all three sides.',
        },
      ],
      result: 'Each side of a triangle is strictly less than the sum of the other two: $a < b + c$, $b < c + a$, $c < a + b$. On the $3$-$5$-$7$ witness the engine certifies every link of the chain: $CD = CA = 5$, the base angles $\\angle ADC = \\angle CAD = 60°$, $\\angle BAD = 81.786789° > 60°$, and $BD = 8 > BA = 7$.',
    },
    {
      kind: 'figure',
      caption: 'Euclid\u2019s I.20 chain drawn on the witness: the base BC of the 3, 5, 7 triangle is extended beyond C to D with CD = CA = 5 (the ticks mark the equal pair), planting the isosceles detour triangle ACD — which on this witness happens to be equilateral, since the exterior angle at C is exactly 60°. The angle BAD = 81.79° beats the angle ADB = 60°, I.19 hands down BD > BA, and BD = BC + CD = 3 + 5 = 8 beats BA = 7.',
      svg: geo34I20('The 3-5-7 triangle with its base extended beyond C to a point D with CD equal to CA, forming an isosceles detour triangle; the angles 60, 81.79 and 21.79 degrees are marked and the verdict BD = 8 > BA = 7 is annotated.'),
    },
    {
      kind: 'para',
      text: 'Notice what the proof did NOT do: it never measured anything. The extension created a flat rival $BD$ for the side $BA$ — a rival assembled from exactly the pieces $BC$ and $CA$ whose sum we want — and then the ordering theorem certified the rival LONGER. On the witness the flat rival is the segment of length $8$, and the comparison $7 < 8$ is the triangle inequality made visible. The equilateral detour on this witness is a coincidence worth naming as one: the proof needs only $CA = CD$, and it is the accident of the exterior angle at $C$ being exactly $60°$ that promotes the isosceles detour to an equilateral one.',
    },
    {
      kind: 'para',
      text: 'The inequality is STRICT, and the strictness is not pedantry — it is the boundary between geometry and its collapse. Suppose the three lengths satisfy $a + b = c$ with $a \le b \le c$. Place the sides of lengths $a$ and $b$ end to end along a line and they exactly span the length $c$: the would-be vertex $A$ lands ON the line $BC$, the three points are collinear, and the region enclosed is empty. The engine watches this collapse happen numerically on the witness family: hold $a = 3$ and $b = 5$ fixed and let the third side grow $c = 7$, $7.5$, $7.9$, $8$ — the apex slides down its arc of radius $5$ about $C$, its height above the line dying through $4.330127$, $3.353843$, $1.606168$ to exactly $0$. At $c = 8$ the area is $0$ and no triangle exists; for every $c$ strictly between $|5 - 3| = 2$ and $8$ the apex lifts off and the triangle is genuine.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Degenerate triangle',
      text: 'A triple of lengths with $a + b = c$ (the two shorter summing exactly to the longest) is said to be degenerate: the three points it pins are forced into collineity, the enclosed area is $0$, and the figure is a SEGMENT walked twice, not a triangle. Thus, a genuine triangle requires $a + b > c$ strictly — the existence screen refuses the equality as firmly as it refuses the shortfall.',
    },
    {
      kind: 'figure',
      caption: 'The collapse, side by side with the genuine arch. Left: the 3, 5, 7 triangle — the two shorter sides sum to 8, which strictly beats the third side 7, and the apex A holds its height of about 4.33 above the base. Right: the same sides 3 and 5 with the third stretched to 8 — the apex swings down the dashed arc of radius 5 about C and lands exactly on the line at the point marked A flat; the region enclosed dies to zero and the existence screen refuses the triple.',
      svg: geo34Collapse('Two panels: on the left the genuine 3-5-7 triangle with apex lifted; on the right the degenerate 3-plus-5-equals-8 triple drawn flat on the line, with a dashed arc showing the apex swinging down to the line.'),
    },
    {
      kind: 'para',
      text: 'How generous is the existence law? The engine answers with a census. Take every ordered triple $1 \le a \le b \le c \le 10$ — there are $220$ of these candidates — and run the screen $a + b > c$ on each. Exactly $125$ pass: those, and only those, are the integer triangles with sides up to $10$. The other $95$ fail, every one of them through the longest side ($a + b \le c$; the single-screen law guarantees no other failure mode exists). The table below is the census by longest side, and its last column carries a compact surprise: the count of genuine triples with longest side $c$ is exactly $\\frac{(c+1)^2}{4}$ rounded down — the closed form $\\lfloor (c+1)^2/4 \\rfloor$ — which the engine verifies column by column.',
    },
    {
      kind: 'table',
      caption: 'The existence census on ordered triples 1 <= a <= b <= c <= 10 — 220 candidates, 125 genuine by the screen a + b > c, 95 refused',
      head: ['Longest side c', 'Pairs (a, b) tested', 'Genuine (a + b > c)', 'Refused (a + b ≤ c)', 'Closed form'],
      rows: [
        ['1', '1', '1', '0', 'floor(4/4) = 1'],
        ['2', '3', '2', '1', 'floor(9/4) = 2'],
        ['3', '6', '4', '2', 'floor(16/4) = 4'],
        ['4', '10', '6', '4', 'floor(25/4) = 6'],
        ['5', '15', '9', '6', 'floor(36/4) = 9'],
        ['6', '21', '12', '9', 'floor(49/4) = 12'],
        ['7', '28', '16', '12', 'floor(64/4) = 16'],
        ['8', '36', '20', '16', 'floor(81/4) = 20'],
        ['9', '45', '25', '20', 'floor(100/4) = 25'],
        ['10', '55', '30', '25', 'floor(121/4) = 30'],
        ['Total', '220', '125', '95', '—'],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Reading the census',
      text: 'Two patterns earn a pause. FIRST, the growth: with longest side $c$ fixed, the surviving pairs $(a, b)$ number $\\lfloor (c+1)^2/4 \\rfloor$ — roughly a QUARTER of the $c(c+1)/2$ candidates — so existence is not a rare accident but the typical fate of a triple. SECOND, the shifted column: the refusal count for longest side $c$ equals the genuine count for longest side $c - 1$ (read the table: $1, 2, 4, 6, 9, 12, 16, 20, 25$ march one row down in both columns). The engine confirms this count identity for every $c$ from $2$ to $10$; the reason is the complement structure of the screen — the pairs refused at level $c$ pair up, length for length, with the pairs that survive at level $c - 1$.',
    },
    {
      kind: 'equation',
      latex: '|b - c| < a < b + c',
      note: 'the bound form of the triangle inequality for a side $a$ against the other two sides $b$ and $c$ — derived in Exercise 10 from the three pair-sum inequalities; the ends are EXCLUDED, with equality meaning degeneracy.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution: the ends are excluded',
      text: 'The commonest examination error on this material writes the third-side bound with weak inequalities: for sides $4$ and $9$, the answer $5 \\le x \\le 13$ is WRONG at both ends. At $x = 13$ the sides $4$, $9$, $13$ satisfy $4 + 9 = 13$ — degenerate, flat, refused; at $x = 5$ likewise $9 - 4 = 5$ puts the longest side exactly at the difference, again flat. The correct screen is $5 < x < 13$, both ends strict. Whenever a multiple-choice option shows a closed bracket on a third-side range, kill it without further computation.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the exterior angle inequality I.16                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The exterior angle inequality (Euclid I.16), proved fifth-free' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.16 — the exterior angle inequality',
      text: 'Extend one side of a triangle, say $BC$ beyond $C$. The exterior angle this creates at $C$ — the supplement of the interior angle $C$ — is greater than EACH of the two remote interior angles, the angles at the other two vertices, one at a time. In symbols: with the exterior angle at $C$ called $\\theta$, we have $\\theta > A$ AND $\\theta > B$, separately and strictly.',
    },
    {
      kind: 'para',
      text: 'The theorem has a famous pedigree of logical economy: Euclid proves it in Book I BEFORE the parallel postulate is ever spent — it is fifth-free, part of the neutral geometry that would survive even in a world of curved space. Chapter 2 banked this fact\u2019s direction when it built the transversal theory, and the proof idea belongs to the same family as the one Euclid uses: slide a midpoint construction across the triangle and compare. What the present lesson needs from I.16 is its ROLE in the hierarchy: it is the engine that drives I.18, which drives I.19, which drives I.20. Every inequality in this lesson ultimately leans on the exterior angle beating the remotes.',
    },
    {
      kind: 'figure',
      caption: 'The exterior angle at C on the witness. The base BC of the 3, 5, 7 triangle is extended beyond C (teal arrow); the exterior angle between that extension and the side CA is 60°, while the remote interior angles measure 21.79° at A and 38.21° at B. The annotation carries the exam-gold distinction in full: 60 = 21.79 + 38.21 exactly (the angle-sum arithmetic), while 60 > 21.79 and 60 > 38.21 each separately (the I.16 verdict).',
      svg: geo34Exterior('The 3-5-7 triangle with the base extended beyond C, the 60-degree exterior angle marked in orange between the extension and side CA, the remote interior angles 21.79 and 38.21 degrees marked, and the sum-versus-each annotation at the right.'),
    },
    {
      kind: 'para',
      text: 'On the witness the two facts sit side by side, and the distinction between them is worth reading twice. The exterior angle at $C$ is $180° - 120° = 60°$. The remote interiors are $A = 21.786789°$ and $B = 38.213211°$, and their sum is $A + B = 60°$ EXACTLY — because the three interiors sum to $180°$, the exterior, being the supplement of $C$, must equal what the other two interiors add to. So the exterior EQUALS the sum of the remotes. But that equality is the ANGLE-SUM THEOREM\u2019s statement, not I.16\u2019s. Proposition I.16 says something logically cheaper and deeper at once: $60 > 21.786789$ and $60 > 38.213211$, each remote beaten SEPARATELY, strictly — and Euclid proves that without spending the parallel postulate, centuries before anyone could assert the angle sum of a triangle with proof. When an examination asks which proposition gives \u201cthe exterior angle exceeds either remote interior angle\u201d, the licensed citation is I.16 by content, not the angle-sum theorem.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why fifth-free matters',
      text: 'Euclid\u2019s Book I is a tower of dependencies, and the inequality block I.16 through I.20 stands entirely on the neutral floors: common notions, the isosceles machinery of I.5, and the congruence criteria of I.4 and I.8. The parallel postulate is not spent until I.29. This is not trivia — it is the observation that makes non-Euclidean geometry possible: in spherical or hyperbolic worlds the angle sum of a triangle departs from $180°$, the exterior no longer EQUALS the sum of the remotes, and yet I.16 and the entire inequality block SURVIVE. A theorem proved fifth-free is a theorem you can take to any world.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the ordering theorems I.18 and I.19 + the witness fully read */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The ordering theorems: I.18 and I.19, the interlocking pair' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.18 — the greater side subtends the greater angle',
      text: 'In any triangle, the longer of two sides faces the larger angle: $a > b$ implies $A > B$ (with $A$ the angle opposite $a$, per the notation law). Read operationally: the largest angle of a triangle is opposite the longest side, and the shortest side has the smallest angle against it.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.18 — the greater side subtends the greater angle',
      statement: 'We prove the representative case: if $BC > CA$ in triangle $ABC$, then $\\angle BAC > \\angle ABC$. The proof plants the isosceles detour INSIDE the triangle this time, and lets the exterior angle inequality I.16 do the pulling.',
      steps: [
        {
          label: 'Cut the greater side down',
          formula: 'D \\text{ between } B \\text{ and } C,\\quad CD = CA',
          explanation: 'On the greater side $BC$ mark the point $D$ with $CD = CA$, the length of the lesser side. This plants a small isosceles triangle $ACD$ inside the original one, with the equal sides meeting at $C$.',
        },
        {
          label: 'Isosceles detour',
          formula: '\\angle CAD = \\angle ADC',
          explanation: '$CA = CD$, so pons asinorum (I.5) makes the base angles of triangle $ACD$ equal — the same detour move that drove I.20, folded inward instead of outward.',
        },
        {
          label: 'The exterior angle beats a remote',
          formula: '\\angle ADC > \\angle ABD',
          explanation: 'The angle $ADC$ is exterior to triangle $ABD$ at $D$, because its arm $DC$ is the extension of $DB$ past $D$; its remote interiors are the angles at $A$ and at $B$ of triangle $ABD$. Euclid I.16 gives the exterior greater than EITHER remote — in particular greater than the one at $B$.',
        },
        {
          label: 'The split at A',
          formula: '\\angle BAC = \\angle BAD + \\angle DAC > \\angle DAC',
          explanation: 'The ray $AD$ lies inside the angle $BAC$, since $D$ sits on the segment $BC$; so the whole angle at $A$ is the sum of $\\angle BAD$ and $\\angle DAC$, hence greater than $\\angle DAC = \\angle ADC$ (Common Notion 5 again).',
        },
        {
          label: 'Chain and conclude',
          formula: '\\angle BAC > \\angle ADC > \\angle ABD = \\angle ABC',
          explanation: 'Since $D$ lies on $BC$, the angle $ABD$ IS the angle $ABC$. Stringing the chain: the angle at $A$ exceeds the angle at $B$, which is the claim that the greater side $BC$ subtends the greater angle.',
        },
      ],
      result: 'Greater side, greater angle: $a > b$ implies $A > B$. The engine certifies the chain on a relabelled witness ($BC = 7 > CA = 5$): the detour angles $\\angle CAD = \\angle ADC = 79.106605°$, the I.16 verdict $79.106605° > 38.213211°$, and the conclusion $\\angle BAC = 120° > \\angle ABC = 38.213211°$.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.19 — the greater angle is subtended by the greater side',
      text: 'The converse: in any triangle, the larger of two angles faces the longer side: $A > B$ implies $a > b$. Operationally: find the largest angle and you have found the longest side, with no measurement at all.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.19 — the greater angle is subtended by the greater side',
      statement: 'Euclid argues by contradiction, spending I.18\u2019s statement and the isosceles case. The two ordering theorems therefore INTERLOCK — each converse built on the other\u2019s tools — rather than nesting one inside the other.',
      steps: [
        {
          label: 'Suppose the conclusion fails',
          formula: '\\angle A > \\angle B \\text{ and } a \\le b',
          explanation: 'Assume, for contradiction, that the angle at $A$ is the greater while the side $a$ opposite it is not: by trichotomy, either $a = b$ or $a < b$.',
        },
        {
          label: 'Case a = b dies',
          formula: 'a = b \\;\\Rightarrow\\; A = B \\text{ (I.5)}',
          explanation: 'If $a = b$ the triangle is isosceles with its equal sides meeting at $C$, and pons asinorum forces the base angles equal: $A = B$, contradicting the hypothesis $A > B$. The engine checks the shape of this case on the $5$-$5$-$6$ isosceles: base angles $53.130102°$ each.',
        },
        {
          label: 'Case a < b dies',
          formula: 'a < b \\;\\Rightarrow\\; B > A \\text{ (I.18)}',
          explanation: 'If $a < b$, then $b$ is the greater side, and I.18 — just proved, from I.16 — makes the angle opposite it the greater: $B > A$, contradicting $A > B$ a second way.',
        },
        {
          label: 'Both cases impossible',
          formula: 'a > b',
          explanation: 'Both options inside $a \\le b$ contradict the hypothesis, so the third option $a > b$ must hold: the greater angle is subtended by the greater side.',
        },
      ],
      result: 'Greater angle, greater side: $A > B$ implies $a > b$. The proof spends I.18 and I.5 only — no I.20, no angle sum — so the pair I.18/I.19 interlocks cleanly and the chain I.16 $\\to$ I.18 $\\to$ I.19 $\\to$ I.20 is genuinely a chain, each link forged from the ones before it.',
    },
    {
      kind: 'para',
      text: 'Say the interlock honestly, because it is a place where textbooks blur. I.19\u2019s proof USES I.18\u2019s statement — that is what a converse proved by contradiction does. I.18\u2019s proof uses I.16 and I.5, NOT I.19; so there is no circle. What the pair shares is a toolset — the isosceles detour and the exterior angle inequality — and a trichotomy of cases (greater, equal, lesser) that the contradiction format forces into the open. The chapter\u2019s dependency tower in the inequality block therefore reads: I.16 (fifth-free) drives I.18, I.18 drives I.19, and I.19 closes I.20 — four propositions, one idea compounding at each floor.',
    },
    {
      kind: 'para',
      text: 'The engine cross-examines the ordering law across a family of witnesses — the integer triangles $(2, 3, 4)$, $(3, 4, 5)$, $(4, 5, 6)$, $(5, 5, 6)$, $(2, 2, 3)$, $(5, 6, 10)$, $(4, 5, 8)$, $(6, 7, 9)$ and $(3, 5, 7)$ — computing every angle by the cosine rule and checking pair by pair that side order matches angle order, with equality pairing with equality (the isosceles cases). All nine witnesses agree: $a < b$ exactly when $A < B$. That is the practical form of the theorem — ORDER ONLY, NO MEASUREMENT: to rank the angles of a triangle, rank the sides and read the ranking backwards.',
    },
    {
      kind: 'para',
      text: 'Now read the witness triangle in full — the one figure every theorem of this lesson touches. Sides $a = 3$, $b = 5$, $c = 7$; angles $A = \\arccos(13/14) = 21.786789°$, $B = \\arccos(11/14) = 38.213211°$, $C = \\arccos(-1/2) = 120°$ exactly. The cosine-rule numerators are worth a glance: each is an exact rational, $13/14$ and $11/14$ and $-1/2$, which is why this triple was pinned — the engine certifies all six decimals and the exact forms agree. The ordering law reads off instantly: $3 < 5 < 7$ and $21.786789° < 38.213211° < 120°$, rank for rank. The exterior at $C$ is $60°$, equal to $A + B$ exactly and greater than each remote separately. And the existence screen passes strictly: $3 + 5 = 8 > 7$, with the bound form reading $2 < 7 < 8$.',
    },
    {
      kind: 'table',
      caption: 'The 3-5-7 witness, fully read — every row recomputed by the engine',
      head: ['Quantity', 'Value', 'Certificate'],
      rows: [
        ['Sides $a, b, c$', '3, 5, 7', 'placed at $B(0,0)$, $C(3,0)$, $A(5.5, 4.330127)$'],
        ['Angle $A$ opposite $a$', '$\\arccos(13/14) = 21.786789°$', 'cosine rule, exact numerator'],
        ['Angle $B$ opposite $b$', '$\\arccos(11/14) = 38.213211°$', 'cosine rule, exact numerator'],
        ['Angle $C$ opposite $c$', '$\\arccos(-1/2) = 120°$', 'cosine rule, exact'],
        ['Angle sum', '$180°$', 'to six decimals'],
        ['Exterior at $C$', '$60° = A + B$ exactly', 'supplement of $C$'],
        ['Remote comparison', '$60 > 21.786789$ and $60 > 38.213211$', 'I.16, each separately'],
        ['Ordering', '$a < b < c$ matches $A < B < C$', 'I.18 forward, I.19 backward'],
        ['Existence screen', '$3 + 5 = 8 > 7$ strict', 'I.20'],
        ['The bound', '$2 < 7 < 8$', '$|a - b| < c < a + b$'],
        ['Area', '$15\\sqrt{3}/4 \\approx 6.495191$', 'half of base times height'],
      ],
    },
    /* -------------------------------------------------------------- */
    /* 5. the hinge theorem and its converse                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The hinge theorem and its converse: the compass-arms law' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The hinge theorem (the SAS inequality)',
      text: 'Two triangles have two sides pairwise equal — $p$ with $p$, $q$ with $q$ — meeting at included angles $\\alpha$ and $\\beta$. If $\\alpha < \\beta$, then the third side facing $\\alpha$ is SHORTER than the third side facing $\\beta$: the wider opening reaches farther. Picture a compass or a pair of shears: same arm lengths, and the gap between the tips grows as the jaws open.',
    },
    {
      kind: 'para',
      text: 'The compass-arms picture below is the theorem in one look. Two triangles share a vertex $O$ and a lower arm of length $5$; their upper arms, also of length $5$ each, are opened to $40°$ and to $60°$. The third sides — the gaps between the tips — measure $10\\sin 20° \\approx 3.420201$ and $10\\sin 30° = 5$ exactly, and the wider opening owns the longer gap. The engine goes further than the picture: sweeping the opening through $20°$, $30°$, $40°$, $50°$, $60°$ it certifies the third side growing STRICTLY at every step ($1.736482$, $2.588190$, $3.420201$, $4.226183$, $5.000000$), and a dense sweep confirms strict growth across the whole range of openings from $1°$ to $179°$ — there is no plateau, no dip, no tie.',
    },
    {
      kind: 'figure',
      caption: 'The hinge as compass arms. From the shared vertex O, a common lower arm of length 5 and two upper arms of length 5 opened at 40° (amber) and 60° (orange). The gap between the tips — the third side — measures 10 sin 20° ≈ 3.42 for the narrow opening (dashed) and 10 sin 30° = 5 for the wide one: the wider the opening, the farther the tips.',
      svg: geo34Hinge('A shared vertex O with a common lower arm of length 5 and two upper arms of length 5 at openings of 40 and 60 degrees; the third sides are drawn between the tips and labelled 3.42 and 5, showing the wider opening reaching farther.'),
    },
    {
      kind: 'derivation',
      title: 'The hinge theorem and its converse — the compass-arms pair',
      statement: 'Triangle 1 has sides $p$ and $q$ from a vertex with included angle $\\alpha$ and third side $x$; triangle 2 has the same sides $p$ and $q$ from a vertex with included angle $\\beta$ and third side $y$. We prove the pair of implications $\\alpha < \\beta \\Leftrightarrow x < y$ in one computation.',
      steps: [
        {
          label: 'Cosine rule on each triangle',
          formula: 'x^2 = p^2 + q^2 - 2pq\\cos\\alpha,\\quad y^2 = p^2 + q^2 - 2pq\\cos\\beta',
          explanation: 'Write each third side by the cosine rule. (The cosine rule is the theorem our Trigonometry chapter derives in full; Euclid proves its two cases synthetically as Book II Propositions 12 and 13, the obtuse and acute cases.)',
        },
        {
          label: 'Subtract',
          formula: 'y^2 - x^2 = 2pq\\,(\\cos\\alpha - \\cos\\beta)',
          explanation: 'The difference of the squared third sides is a positive multiple of the difference of the cosines — the factor $2pq$ is positive because it is a product of lengths.',
        },
        {
          label: 'Cosine runs downhill on the angle range',
          formula: '0° < \\alpha, \\beta < 180° \\;\\Rightarrow\\; \\alpha < \\beta \\Leftrightarrow \\cos\\alpha > \\cos\\beta',
          explanation: 'On the open interval of possible included angles the cosine is STRICTLY decreasing, so angle order is exactly reversed cosine order — the analytic heart of the compass picture.',
        },
        {
          label: 'Assemble forward: hinge',
          formula: '\\alpha < \\beta \\;\\Rightarrow\\; y^2 > x^2 \\;\\Rightarrow\\; y > x',
          explanation: 'Wider opening, smaller cosine, larger squared third side for the wide triangle — and squares of positive lengths compare as the lengths do. The engine certifies the identity $x^2 = 50 - 50\\cos\\theta$ on arms $5$ and $5$ at every sweep angle.',
        },
        {
          label: 'Assemble backward: converse',
          formula: 'x < y \\;\\Rightarrow\\; \\cos\\alpha > \\cos\\beta \\;\\Rightarrow\\; \\alpha < \\beta',
          explanation: 'Run the chain in reverse: a strictly decreasing function is one-to-one, so the implications invert cleanly. Longer third side forces the wider included angle — the SSS-inequality, the converse hinge.',
        },
      ],
      result: 'The hinge pair, proved together: with two sides pairwise equal, $\\alpha < \\beta \\Leftrightarrow x < y$. On the pinned swing (arms $5$ and $5$, openings $40°$ and $60°$) the engine certifies third sides $3.420201$ and $5$, with strict growth across the whole sweep.',
    },
    {
      kind: 'para',
      text: 'Two honest notes attach to this derivation. FIRST, the synthetic route: Euclid proves the hinge pair without any trigonometry — the hinge appears as Book I Proposition 24 (built from the angle-transfer I.23 and the ordering I.19) and its converse as I.25 — so the theorem is solidly Euclidean; our analytic proof was chosen because the engine can verify every number of it, and the synthetic proof belongs to the same tradition we have been reading all chapter. SECOND, the trigonometric companion: the sine rule will later tell us that $a > b$ if and only if $\\sin A > \\sin B$ (both sides divided by the same positive circumdiameter). That companion is real and useful, but it belongs to the Trigonometry chapter\u2019s toolkit, not to this lesson\u2019s — we name the bridge honestly and prove here only what the synthetic and cosine-rule instruments can carry.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The converse hinge (the SSS inequality)',
      text: 'Two triangles have two sides pairwise equal, and their third sides satisfy $x < y$. Then the included angle facing $x$ is SMALLER than the included angle facing $y$. Operationally: with the arms fixed, the third side READS OFF the opening — measure the gap and you know the angle order without any protractor.',
    },
    {
      kind: 'table',
      caption: 'The hinge sweep on arms 5 and 5 — the third side 10 sin(theta over 2) grows strictly with the opening; growth per 10° step shown in the last column',
      head: ['Included angle', 'Third side on arms 5, 5', 'Step growth'],
      rows: [
        ['20°', '10 sin 10° = 1.736482', '—'],
        ['30°', '10 sin 15° = 2.588190', '+0.851708'],
        ['40°', '10 sin 20° = 3.420201', '+0.832011'],
        ['50°', '10 sin 25° = 4.226183', '+0.805982'],
        ['60°', '10 sin 30° = 5.000000', '+0.773817'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the sweep table with a designer\u2019s eye. The growth column shrinks as the opening widens — from $+0.851708$ per $10°$ step at narrow openings to $+0.773817$ near $60°$ — because the third side $10\\sin(\\theta/2)$ climbs the sine arch, steepest near the middle of the range and flattening toward the ends. A scissors-joint designer feels exactly this: the first degrees of opening buy the most tip-travel. But note what never happens: no step is zero or negative. STRICT growth at every step is the theorem\u2019s content; the varying rate is the sine\u2019s ornament.',
    },

    /* -------------------------------------------------------------- */
    /* 6. worked applications                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The inequality toolkit in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. The first is the existence screen on three claimed strut triples — accept, refuse, and refuse-with-reason. The second is the shortest-path read: the detour through a depot against the straight segment, with the triangle inequality playing the straight line\u2019s charter. The third reads the $3$-$5$-$7$ witness completely — angles computed against the engine\u2019s certified values, the ordering stated both ways, the exterior read with the sum-versus-each distinction. In all three, the discipline is one: screen first, reason second, verdict last.',
    },
    {
      kind: 'example',
      title: 'The existence screen. A workshop receives three claimed strut triples: (i) $5$, $6$, $10$; (ii) $3$, $4$, $8$; (iii) $3$, $5$, $8$. For each, decide whether the struts can close into a triangle, with the inequality checked and the refusal reason named.',
      steps: [
        'Sol. Run the screen on (i): the lengths are already ordered $5 \\le 6 \\le 10$, so consult the longest side alone: $5 + 6 = 11 > 10$, the screen passes, and by the single-screen law no other check is needed.',
        'Check (ii): $3 \\le 4 \\le 8$ with $3 + 4 = 7 < 8$ — the two shorter struts, laid out dead straight end to end, still fall $1$ short of the span they must bridge; no triangle closes.',
        'Check (iii): $3 \\le 5 \\le 8$ with $3 + 5 = 8$ EXACTLY — not less, not greater: the two shorter sides end to end precisely reach the third, so the would-be triangle collapses flat onto a line (the degenerate case of the definition callout, area $0$).',
        'State the verdicts with reasons: (i) accepted, because $11 > 10$; (ii) refused by shortfall, because $7 < 8$; (iii) refused as degenerate, because $8 = 8$ forces collineity.',
        'Hence only the $5$-$6$-$10$ triple closes into a genuine triangle. Note for the design desk: cases (ii) and (iii) fail in DIFFERENT ways — one by a shortfall of $1$, one by exact flatness — and only the flat one sits on the boundary of the existence range $2 < c < 8$ for the sides $3$ and $5$.',
      ],
    },
    {
      kind: 'example',
      title: 'The shortest-path read. A supply route runs straight from $P(0, 0)$ to $Q(8, 4)$; a proposed detour bends through the depot $R(3, 4)$. Verify that the detour is longer than the straight route, and compute by how much.',
      steps: [
        'Sol. Compute the two legs of the detour: $PR = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ and $RQ = \\sqrt{(8 - 3)^2 + (4 - 4)^2} = 5$ — so the broken path $P \\to R \\to Q$ measures $5 + 5 = 10$ in total.',
        'Compute the straight route: $PQ = \\sqrt{8^2 + 4^2} = \\sqrt{80} = 4\\sqrt{5} \\approx 8.944272$.',
        'Compare with the charter: $P$, $R$ and $Q$ are three non-collinear points (the depot sits off the line through $P$ and $Q$), so they form a genuine triangle, and I.20 applied to its sides gives $PR + RQ > PQ$ — the straight segment is structurally shorter than ANY broken path through a third point, whatever the depot\u2019s position.',
        'Quantify the waste: $10 - 4\\sqrt{5} \\approx 1.055728$, which is about $11.8\\%$ of the straight distance — the detour gives away roughly a ninth of the route.',
        'Hence the straight route wins by about $1.055728$; and the inequality did more than confirm this one comparison — it certified that NO detour through any off-segment point can ever tie or beat the straight route. That is the straight line\u2019s charter: I.20 is why \u201cthe shortest path between two points is the straight one\u201d is a theorem here, not a slogan.',
      ],
    },
    {
      kind: 'example',
      title: 'The witness fully ordered. For the triangle with sides $a = 3$, $b = 5$, $c = 7$: compute all three angles, verify the ordering law both ways, and read the exterior angle at $C$.',
      steps: [
        'Sol. Compute the angles with the cosine rule: $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{25 + 49 - 9}{70} = \\frac{13}{14}$, so $A = \\arccos(13/14) \\approx 21.786789°$.',
        'Likewise $\\cos B = \\frac{c^2 + a^2 - b^2}{2ca} = \\frac{49 + 9 - 25}{42} = \\frac{11}{14}$, so $B \\approx 38.213211°$; and $\\cos C = \\frac{a^2 + b^2 - c^2}{2ab} = \\frac{9 + 25 - 49}{30} = -\\frac{1}{2}$, so $C = 120°$ exactly.',
        'Check the arithmetic: $21.786789 + 38.213211 + 120 = 180$ — and the engine certifies the stronger split $A + B = 60$ EXACTLY, the exterior angle at $C$.',
        'Read the ordering both ways: the sides rise $3 < 5 < 7$ and the angles rise $21.786789° < 38.213211° < 120°$ in the same order — forward (I.18): the greater side $7$ subtends the greater angle $120°$; backward (I.19): the greatest angle $120°$ is subtended by the greatest side $7$.',
        'Read the exterior at $C$: extend $BC$ beyond $C$; the exterior angle is $180° - 120° = 60°$, which EQUALS $A + B = 21.786789° + 38.213211°$ exactly, and EXCEEDS each remote interior angle separately — $60 > 21.786789$ and $60 > 38.213211$ — the I.16 verdict on the witness.',
        'Hence the witness is fully ordered: smallest angle $21.786789°$ opposite the shortest side $3$, the exact $120°$ opposite $7$, exterior $60°$ at $C$ equal to the remote sum and greater than each remote — every theorem of the lesson visible in one triangle, every number engine-certified.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 7. the collected law + exam corner                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect everything the lesson proved, in the form the revision sheet wants. The first is the bound — the triangle inequality in its examination shape, with both ends strict. The second is the exterior angle verdict of I.16, with the sum-versus-each distinction written into the note. The third and fourth are the hinge pair, forward and converse. The fifth is the ordering law of I.18 and I.19, the single line that ranks every triangle\u2019s sides against its angles.',
    },
    {
      kind: 'formula',
      name: 'The triangle inequality bound (I.20)',
      latex: '|b - c| < a < b + c \\quad \\text{(and cyclically)}',
      note: 'the third side of a triangle holding sides b and c lies strictly between their difference and their sum; equality at either end is the degenerate collapse, refused by the screen',
    },
    {
      kind: 'formula',
      name: 'The exterior angle inequality (I.16)',
      latex: '\\text{exterior at a vertex} > \\text{each remote interior angle, separately}',
      note: 'proved fifth-free, before any parallel postulate; the exterior also EQUALS the sum of the remotes, but that is the angle-sum theorem talking, not I.16',
    },
    {
      kind: 'formula',
      name: 'The hinge theorem (SAS inequality)',
      latex: '\\alpha < \\beta \\;\\Rightarrow\\; x < y \\quad \\text{(two sides pairwise equal)}',
      note: 'equal arms, wider opening: the third side grows — 10 sin 20° ≈ 3.42 against 10 sin 30° = 5 on the pinned swing',
    },
    {
      kind: 'formula',
      name: 'The converse hinge (SSS inequality)',
      latex: 'x < y \\;\\Rightarrow\\; \\alpha < \\beta \\quad \\text{(two sides pairwise equal)}',
      note: 'longer third side forces the wider included angle; the cosine-rule identity runs the chain both ways',
    },
    {
      kind: 'formula',
      name: 'The side-angle ordering (I.18 and I.19)',
      latex: 'a > b \\;\\Leftrightarrow\\; A > B',
      note: 'the greater side subtends the greater angle and conversely; equality pairs with equality — the isosceles case',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the inequality as an instant eliminator',
      text: 'Four habits pay marks here. FIRST, the two-sides screen, cold: given sides $4$ and $9$, the third side must satisfy $5 < x < 13$ — between the difference and the sum, BOTH ends strict; any option with a weak inequality, or with the sum swapped for the difference, dies without a drawing. SECOND, the sum-versus-each trap: \u201cthe exterior angle equals the sum of the remote interiors\u201d is TRUE but is the angle-sum theorem; I.16\u2019s licensed content is the STRICT verdict on EACH remote separately — quote the right one for the mark. THIRD, ordering without computation: to find a triangle\u2019s largest angle, find its longest side and look opposite (I.18); given the angle ranking, read the side ranking backwards (I.19) — these one-line citations are regularly worth a mark each. FOURTH, cite by content, not by number unless sure: \u201cthe triangle inequality (Euclid I.20)\u201d, \u201cthe exterior angle inequality (I.16)\u201d, \u201cthe greater side subtends the greater angle (I.18)\u201d and its converse (I.19) — the hinge pair rounds out the list for comparison questions. The degenerate refusal ($3 + 5 = 8$) and the hinge swing ($3.42 < 5$ on arms $5$ and $5$) are the two standard witness shapes; recognise both on sight.',
    },

    /* -------------------------------------------------------------- */
    /* 8. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'triangle inequality', def: 'Euclid I.20: in any triangle each side is strictly less than the sum of the other two — $a < b + c$, $b < c + a$, $c < a + b$. As a screen: three lengths close into a triangle exactly when the longest is less than the sum of the other two.' },
        { term: 'degenerate triangle', def: 'A triple of lengths with $a + b = c$: the three pinned points are forced into collineity, the enclosed area is $0$, and the figure is a segment walked twice. The existence screen refuses it as firmly as a shortfall.' },
        { term: 'existence screen', def: 'The single check $a + b > c$ on the longest side $c$. With $a \\le b \\le c$ the other two pair-sum inequalities are automatic, so one comparison decides existence. On ordered triples up to $10$: $125$ of $220$ candidates pass.' },
        { term: 'exterior angle inequality', def: 'Euclid I.16: the exterior angle at a vertex — the supplement of the interior angle there — is greater than EACH remote interior angle separately, strictly. Proved fifth-free, before any parallel postulate is spent.' },
        { term: 'remote interior angles', def: 'For an exterior angle at a vertex, the two interior angles at the OTHER two vertices. I.16 beats each of them separately; the angle-sum theorem additionally makes their sum EQUAL the exterior.' },
        { term: 'larger side larger angle', def: 'Euclid I.18: the greater side subtends the greater angle — $a > b$ implies $A > B$. Proved by cutting the greater side down to the lesser (isosceles detour) and applying I.16.' },
        { term: 'larger angle larger side', def: 'Euclid I.19: the greater angle is subtended by the greater side — $A > B$ implies $a > b$. Proved by contradiction from I.18 and the isosceles case; the pair interlocks rather than nests.' },
        { term: 'hinge theorem', def: 'The SAS inequality: two triangles with two sides pairwise equal — the one with the larger included angle has the longer third side. Compass arms: the wider the opening, the farther the tips. On arms $5$ and $5$: openings $40°$ and $60°$ give third sides $3.420201$ and $5$.' },
        { term: 'converse of the hinge', def: 'The SSS inequality: two triangles with two sides pairwise equal — the one with the longer third side has the larger included angle. The third side reads the opening off, no protractor needed.' },
        { term: 'the bound', def: 'The examination shape of the triangle inequality: $|b - c| < a < b + c$ for any side against the other two — derived from the three pair-sum inequalities, with BOTH ends excluded and equality meaning degeneracy.' },
        { term: 'the witness triangle', def: 'The chapter\u2019s reusable $3$-$5$-$7$ example: $a = 3$, $b = 5$, $c = 7$ with angles $\\arccos(13/14) = 21.786789°$, $\\arccos(11/14) = 38.213211°$ and exactly $120°$; exterior $60°$ at $C$; every theorem of the lesson acts on it.' },
        { term: 'the isosceles detour', def: 'The shared proof move of I.18 and I.20: cut or extend to plant a segment equal to a side ($CA = CD$), summon pons asinorum for the base angles, then let I.16 or I.19 convert the angle comparison into the side conclusion.' },
        { term: 'the straight-line charter', def: 'I.20 read as a path statement: any broken route from $P$ to $Q$ through a third point exceeds the straight segment $PQ$ — the inequality IS the theorem behind \u201cthe shortest path is the straight one\u201d.' },
        { term: 'the existence census', def: 'The engine\u2019s count of genuine integer triangles on ordered triples $1 \\le a \\le b \\le c \\le 10$: exactly $125$ of $220$ candidates pass the screen, $95$ are refused, and the per-longest-side counts follow the closed form $\\lfloor (c+1)^2/4 \\rfloor$.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. quiz (key [3,1,2,0,3] — PINNED)                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Two sides of a triangle measure $4$ and $9$. The third side $x$ must satisfy —',
          options: [
            '$13 < x < 17$, since the third side must exceed the sum of the given sides',
            '$4 < x < 13$, using the difference of the given sides the wrong way round',
            '$5 \\le x \\le 13$, since the boundary values still pin a triangle',
            'the strict screen $5 < x < 13$: the third side lies between $|9 - 4| = 5$ and $9 + 4 = 13$, excluded at both ends',
          ],
          answer: 3,
          explain: 'The bound form of the triangle inequality: any side $a$ satisfies $|b - c| < a < b + c$, so with sides $4$ and $9$ the third is strictly between $9 - 4 = 5$ and $9 + 4 = 13$. Option (a) inverts the law — no side of a triangle exceeds the sum of the other two, and $x > 13$ is precisely the refused region. Option (b) computes a difference wrongly ($9 - 4$ is $5$, not $4$) — the classic slip of subtracting the smaller from the larger and misplacing it. Option (c) is the degenerate trap: at $x = 13$ the sides satisfy $4 + 9 = 13$ exactly — three collinear points, area $0$ — and at $x = 5$ likewise $9 = 4 + 5$; both boundary values are refused, so the inequality is strict at both ends.',
        },
        {
          q: 'The exterior angle inequality of Euclid I.16 states that an exterior angle of a triangle is —',
          options: [
            'equal to the sum of the two remote interior angles, since angles on a line are supplementary',
            'greater than either remote interior angle, one at a time — the strict verdict I.16 actually proves, fifth-free',
            'greater than the sum of the two remote interior angles, since the whole beats the parts',
            'supplementary to each remote interior angle, pairing the exterior with both remotes',
          ],
          answer: 1,
          explain: 'I.16\u2019s licensed content is the STRICT comparison with EACH remote interior angle separately: exterior $> A$ and exterior $> B$, one at a time, proved without any parallel postulate. Option (a) states a true fact with the wrong attribution — the exterior does equal the sum of the remotes, but that is the angle-sum theorem\u2019s arithmetic (interiors sum to $180°$), which needs Euclid\u2019s parallel postulate machinery; citing it as I.16 loses the mark. Option (c) overshoots: on the $3$-$5$-$7$ witness the exterior at $C$ is $60°$ while the remote sum is $21.786789° + 38.213211° = 60°$ — equal, not greater. Option (d) is dimension talk without meaning: the exterior supplements the INTERIOR angle at its own vertex ($60° = 180° - 120°$ on the witness), not the remotes.',
        },
        {
          q: 'In the triangle with sides $3$, $5$ and $7$, the largest angle is —',
          options: [
            'the angle between the sides $3$ and $5$, and it measures $90°$, since $3$-$5$-$7$ is nearly a right triangle',
            'the angle opposite the side $5$, measuring about $38.21°$',
            'the angle opposite the side $7$, namely $120°$ exactly, since $\\cos C = (9 + 25 - 49)/30 = -1/2$',
            'the angle opposite the side $3$, measuring about $21.79°$, the sharpest corner carrying the largest turn',
          ],
          answer: 2,
          explain: 'By I.18 the longest side subtends the largest angle, and $7$ is the longest; the cosine rule then pins it exactly: $\\cos C = (a^2 + b^2 - c^2)/(2ab) = (9 + 25 - 49)/30 = -1/2$, so $C = 120°$. Option (a) has the position right (the angle between $3$ and $5$ IS the angle opposite $7$) but the measure wrong — and badly so: the witness is obtuse, not right. Option (b) names the angle opposite $5$, which is the MIDDLE angle, $\\arccos(11/14) \\approx 38.21°$ — right computation, wrong ranking. Option (d) picks the smallest angle, opposite the shortest side $3$ ($\\arccos(13/14) \\approx 21.79°$) — the ordering law read backwards.',
        },
        {
          q: 'Two triangles each have two sides of lengths $5$ and $5$ meeting at a vertex, with included angles $40°$ and $60°$. Their third sides compare as —',
          options: [
            'the $60°$ triangle\u2019s third side is longer: $10\\sin 30° = 5$ beats $10\\sin 20° \\approx 3.42$',
            'equal, since both triangles have the same two side lengths',
            'the $40°$ triangle\u2019s third side is longer, since a narrower opening reaches farther between the tips',
            'undetermined: two sides and the included angle do not fix a triangle',
          ],
          answer: 0,
          explain: 'This is the hinge theorem (SAS inequality): with the two arms pairwise equal, the larger included angle faces the longer third side. The engine\u2019s pinned swing computes both: third side $= 2 \\cdot 5 \\sin(\\theta/2)$, giving $10\\sin 20° \\approx 3.420201$ at the $40°$ opening and $10\\sin 30° = 5$ at $60°$ — the wider opening reaches farther, strictly. Option (b) is the congruence reflex misfiring: SAS EQUALITY needs the included angles equal, and here they differ — the theorem at work is an inequality, not a congruence. Option (c) inverts the compass picture: opening the jaws wider moves the tips APART, never together. Option (d) denies the cosine rule: two sides with the included angle fix the triangle completely (that is SAS), so the comparison is determined, not open.',
        },
        {
          q: 'Which of the following triples CANNOT be the side lengths of a (non-degenerate) triangle?',
          options: [
            '$2$, $3$, $4$ — the two shorter sides fail to reach',
            '$4$, $5$, $7$ — the longest side is more than twice the shortest',
            '$6$, $7$, $12$ — the gap between the longest and shortest is too large',
            'the triple 3, 5, 8 — refused because $3 + 5 = 8$ exactly: the degenerate collapse onto a line',
          ],
          answer: 3,
          explain: 'Run the screen on each, consulting the longest side only. For $3$, $5$, $8$: $3 + 5 = 8$ EXACTLY — the two shorter sides end to end precisely span the longest, the three points are collinear, the area is $0$, and the existence screen refuses the triple as degenerate. Option (a) is genuine: $2 + 3 = 5 > 4$ passes. Option (b) is genuine and its stated reason is nonsense twice over: $4 + 5 = 9 > 7$ passes, and no triangle law forbids the longest side from exceeding twice the shortest. Option (c) is genuine: $6 + 7 = 13 > 12$ passes — the difference $12 - 6 = 6$ is well below the middle side $7$, which is all the bound $|b - c| < a$ ever demands.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the existence screen, the ordering laws and the hinge',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'The existence screen, three times. Decide whether each claimed triple of strut lengths can close into a triangle, checking the inequality and naming the refusal reason: (i) $5$, $6$, $10$; (ii) $3$, $4$, $8$; (iii) $3$, $5$, $8$.',
              solution: [
                'Sol. Screen (i): the lengths are ordered $5 \\le 6 \\le 10$, so consult the longest side alone: $5 + 6 = 11 > 10$ — the screen passes, and the single-screen law says no other check is needed.',
                'Screen (ii): $3 \\le 4 \\le 8$ with $3 + 4 = 7 < 8$ — even laid out dead straight, the two shorter struts fall $1$ short of the span; no triangle closes.',
                'Screen (iii): $3 \\le 5 \\le 8$ with $3 + 5 = 8$ exactly — the two shorter sides end to end precisely reach the third, so the figure collapses flat onto a line: the degenerate case, area $0$, refused.',
                'Hence (i) is accepted ($11 > 10$); (ii) is refused by shortfall ($7 < 8$); (iii) is refused as degenerate ($8 = 8$) — two different failure modes, only the third sitting on the boundary of the existence range.',
              ],
              answer: 'only $(5, 6, 10)$ closes; $(3, 4, 8)$ is short ($7 < 8$), and $(3, 5, 8)$ is degenerate ($8 = 8$)',
              figures: [
                {
                  caption: 'The collapse figure for this solution: the refused triple 3, 5, 8 laid on a line, with the ghost of the genuine 3, 5, 7 apex and the dashed arc of radius 5 down which it slides to the flat position — area 0, three collinear points.',
                  svg: geo34SolCollapse('A mini figure of the degenerate triple 3, 5, 8 drawn flat on a line with a dashed arc showing where the apex of a genuine triangle would have been.'),
                },
              ],
            },
            {
              q: 'Two sides of a triangle measure $7$ and $10$. Between what bounds must the third side $x$ lie, and why are both ends excluded?',
              solution: [
                'Sol. Write the bound form of the triangle inequality for the side $x$ against the other two: $|10 - 7| < x < 10 + 7$.',
                'Compute the ends: $|10 - 7| = 3$ and $10 + 7 = 17$, so the screen reads $3 < x < 17$.',
                'Both ends are excluded because equality is degeneracy: at $x = 17$ the sides satisfy $7 + 10 = 17$ — flat, collinear, refused; at $x = 3$ likewise $10 = 7 + 3$ puts the longest side exactly at the difference — flat again.',
                'Hence the third side lies strictly between $3$ and $17$: the bound $3 < x < 17$ with both ends refused by the strict inequality.',
              ],
              answer: '$3 < x < 17$, both ends strict',
            },
            {
              q: 'In the triangle with sides $a = 3$, $b = 5$, $c = 7$: name the largest and the smallest angles (with their measures, to the engine\u2019s six decimals), citing the ordering law you used.',
              solution: [
                'Sol. Rank the sides first: $3 < 5 < 7$, so $c = 7$ is the longest and $a = 3$ the shortest.',
                'Apply I.18 (the greater side subtends the greater angle) forward: the largest angle is $C$, opposite the longest side $7$; the smallest is $A$, opposite the shortest side $3$.',
                'Compute the measures with the cosine rule: $\\cos C = (9 + 25 - 49)/30 = -1/2$, so $C = 120°$ exactly; $\\cos A = (25 + 49 - 9)/70 = 13/14$, so $A = 21.786789°$.',
                'Hence the largest angle is $C = 120°$ opposite the side $7$, and the smallest is $A = 21.786789°$ opposite the side $3$ — the ordering $A < B < C$ matching $a < b < c$ rank for rank, with $B = 38.213211°$ between them.',
              ],
              answer: 'largest $C = 120°$ opposite $7$; smallest $A = 21.786789°$ opposite $3$ (by I.18)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'A triangle has angles $50°$, $60°$ and $70°$ at $A$, $B$ and $C$ respectively. Order the sides $a$, $b$, $c$ from shortest to longest, citing the theorem, and justify the ranking with the sine rule companion.',
              solution: [
                'Sol. Rank the angles: $50° < 60° < 70°$, so the largest angle is $C$ and the smallest is $A$.',
                'Apply I.19 (the greater angle is subtended by the greater side): the side opposite $70°$, which is $c$, is the longest; the side opposite $50°$, which is $a$, is the shortest.',
                'Justify with the sine-rule companion, cited honestly as the Trigonometry bridge: $a : b : c = \\sin 50° : \\sin 60° : \\sin 70°$, and the sines run $0.766044 < 0.866025 < 0.939693$ (all three angles acute, where sine climbs with the angle).',
                'Hence the side order is $a < b < c$ — shortest opposite $50°$, longest opposite $70°$, no measurement of the sides needed at all.',
              ],
              answer: '$a < b < c$ — shortest opposite $50°$, longest opposite $70°$ (by I.19)',
            },
            {
              q: 'Two sides of a triangle measure $5$ and $9$, and the third side must be a whole number of units. List the possible values, and count them.',
              solution: [
                'Sol. Write the screen: $|9 - 5| < x < 9 + 5$, that is $4 < x < 14$.',
                'List the whole numbers strictly inside: $5, 6, 7, 8, 9, 10, 11, 12, 13$ — nine values.',
                'Check the ends are rightly excluded: $x = 4$ would give $5 + 4 = 9$, flat; $x = 14$ would give $5 + 9 = 14$, flat again — both degenerate, both refused.',
                'Hence the third side can be any of the nine integers from $5$ to $13$ inclusive: $5, 6, 7, 8, 9, 10, 11, 12, 13$.',
              ],
              answer: 'the nine integers $5, 6, 7, 8, 9, 10, 11, 12, 13$',
            },
            {
              q: 'A triangle has remote interior angles $47°$ and $68°$ at $A$ and $B$. Find the exterior angle at $C$, verify I.16\u2019s verdict on each remote separately, and state the interior angle at $C$.',
              solution: [
                'Sol. Compute the interior at $C$ first: the angle sum gives $C = 180° - 47° - 68° = 65°$.',
                'The exterior at $C$ is the supplement: $180° - 65° = 115°$ — equally, the exterior equals the remote sum $47° + 68° = 115°$.',
                'Verify I.16\u2019s strict verdict on each remote separately: $115 > 47$ and $115 > 68$ — each holds strictly, as the theorem promises.',
                'Hence the exterior angle at $C$ is $115°$, beating each remote interior angle separately ($115 > 47$ and $115 > 68$), with the interior at $C$ equal to $65°$.',
              ],
              answer: 'exterior $115°$ (with $115 > 47$ and $115 > 68$ separately); interior $C = 65°$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Two triangles each have two sides of lengths $5$ and $5$ meeting at a vertex, with included angles $40°$ and $60°$. Compute both third sides to six decimals, state which is longer, and name the theorem.',
              solution: [
                'Sol. Set up the hinge computation: with equal arms $p = q = 5$, the third side is $x = 2 \\cdot 5 \\sin(\\theta/2) = 10\\sin(\\theta/2)$.',
                'Compute at the narrow opening: $10\\sin 20° = 3.420201$ to six decimals.',
                'Compute at the wide opening: $10\\sin 30° = 5$ exactly.',
                'Compare: $3.420201 < 5$, so the triangle with the $60°$ opening has the longer third side — the hinge theorem (SAS inequality): equal arms, wider opening, farther tips.',
                'Hence the third sides are $3.420201$ and $5$, the $60°$ one longer, by the hinge theorem — the engine\u2019s sweep confirms strict growth at every step from $20°$ to $60°$.',
              ],
              answer: '$10\\sin 20° = 3.420201$ versus $10\\sin 30° = 5$: the $60°$ opening reaches farther (hinge theorem)',
              figures: [
                {
                  caption: 'The hinge swing figure for this solution: compass arms of length 5 from a shared vertex, openings 40° and 60°, the two third sides drawn between the tips and labelled with their values 3.42 and 5 — the wider opening reaches farther.',
                  svg: geo34SolHinge('A mini compass-arms figure with two openings of 40 and 60 degrees on arms of length 5, third sides 3.42 and 5 drawn between the tips.'),
                },
              ],
            },
            {
              q: 'Two triangles have two sides pairwise equal (lengths $5$ and $5$), and their third sides measure $4$ and $5$. Which triangle has the larger included angle? Compute both angles and cite the converse hinge.',
              solution: [
                'Sol. Read the opening off the third side: with arms $5$ and $5$, a third side $x$ satisfies $x = 10\\sin(\\theta/2)$, so $\\theta = 2\\arcsin(x/10)$.',
                'Compute for $x = 4$: $\\theta = 2\\arcsin(0.4) = 47.156357°$ to six decimals.',
                'Compute for $x = 5$: $\\theta = 2\\arcsin(0.5) = 60°$ exactly.',
                'Compare: $47.156357° < 60°$, so the triangle with third side $5$ has the larger included angle — the converse hinge (SSS inequality): longer third side, wider opening.',
                'Hence the $5$-third-side triangle opens wider ($60°$ against $47.156357°$), by the converse of the hinge theorem.',
              ],
              answer: 'the third-side-$5$ triangle: $60°$ versus $47.156357°$ (converse hinge)',
            },
            {
              q: 'A route runs straight from $P(0, 0)$ to $Q(8, 4)$; a detour is proposed through $R(3, 4)$. Compute both route lengths, verify the detour is longer, and find the saving of the straight route.',
              solution: [
                'Sol. Compute the detour legs: $PR = \\sqrt{3^2 + 4^2} = 5$ and $RQ = \\sqrt{(8-3)^2 + (4-4)^2} = 5$, so the broken path measures $5 + 5 = 10$.',
                'Compute the straight route: $PQ = \\sqrt{8^2 + 4^2} = \\sqrt{80} = 4\\sqrt{5} = 8.944272$ to six decimals.',
                'Verify with the charter: $P$, $R$, $Q$ are non-collinear, so triangle $PRQ$ is genuine and I.20 gives $PR + RQ > PQ$ — indeed $10 > 8.944272$.',
                'Find the saving: $10 - 4\\sqrt{5} = 1.055728$ to six decimals — the straight route wins by about $1.06$ units.',
                'Hence the detour measures $10$ against the straight $8.944272$, the inequality certifies the straight route shorter, and the saving is $1.055728$.',
              ],
              answer: 'detour $10$ versus straight $8.944272$; saving $10 - 4\\sqrt{5} = 1.055728$',
              figures: [
                {
                  caption: 'The detour path figure for this solution: the broken route P to R to Q (two legs of 5 each) against the straight segment PQ of length 4√5 ≈ 8.94 — the triangle inequality in PQR certifies the straight route shorter.',
                  svg: geo34SolDetour('A mini figure with points P, R and Q, the broken two-leg path through R in red arrows totalling 10 and the straight segment PQ in green measuring 8.94.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Derive the bound form $|b - c| < a < b + c$ from the three pair-sum inequalities of I.20, and verify it on the triangle with sides $5$, $9$ and $7$.',
              solution: [
                'Sol. Write the three inequalities of I.20: $a < b + c$, $b < c + a$ and $c < a + b$.',
                'Take the upper bound straight from the first: $a < b + c$ is the right half of the bound.',
                'For the lower bound, rearrange the other two: $b < c + a$ gives $b - c < a$; $c < a + b$ gives $c - b < a$. Together the two say that $a$ exceeds both $b - c$ and $c - b$ — that is, $a$ exceeds $|b - c|$.',
                'Combine: $|b - c| < a < b + c$, with both ends strict because equality on either side would flatten the triangle.',
                'Verify on sides $5$, $9$, $7$ with $a = 7$, $b = 9$, $c = 5$: $|9 - 5| = 4 < 7 < 14 = 9 + 5$ — the bound holds, engine-checked.',
                'Hence the bound follows from I.20 by using one inequality for the ceiling and the other two for the floor: $|b - c| < a < b + c$.',
              ],
              answer: '$|b - c| < a < b + c$; on sides $5$, $9$, $7$: $4 < 7 < 14$',
            },
            {
              q: 'Euclid\u2019s chain on coordinates. Place $B(0, 0)$, $C(3, 0)$ and $A(5.5, 4.330127)$ — the $3$-$5$-$7$ witness. Extend $BC$ beyond $C$ to the point $D$ with $CD = CA$, and walk the I.20 proof: verify the isosceles detour angles, the angle comparison, and the final side inequality.',
              solution: [
                'Sol. Place $D$: beyond $C$ on the line at distance $CD = CA = 5$, so $D = (8, 0)$.',
                'Verify the detour triangle: $CA = 5$, $CD = 5$ and (on this witness) $AD = 5$ too — the isosceles detour happens to be equilateral.',
                'Verify the isosceles base angles (I.5): $\\angle ADC = \\angle CAD = 60°$ each, by direct computation on the coordinates.',
                'Verify the split at $A$: $\\angle BAD = \\angle BAC + \\angle CAD = 21.786789° + 60° = 81.786789°$, which strictly exceeds $\\angle ADB = 60°$.',
                'Apply I.19 on triangle $ABD$: the greater angle $BAD$ is subtended by the greater side, so $BD > BA$ — indeed $BD = 8 > 7 = BA$.',
                'Substitute: $BD = BC + CD = BC + CA = 3 + 5 = 8$, hence $BA = 7 < 8 = BC + CA$ — the triangle inequality, proved on the coordinates.',
              ],
              answer: '$D = (8, 0)$; $\\angle ADC = \\angle CAD = 60°$, $\\angle BAD = 81.786789° > 60°$, so $BD = 8 > BA = 7 = BC + CA - 1$… that is, $BA < BC + CA$',
            },
            {
              q: 'The $4$-$5$-$6$ triangle, fully ordered. Compute all three angles by the cosine rule (six decimals), check the angle sum, verify the ordering law, and read the exterior angle at the vertex opposite the side $6$.',
              solution: [
                'Sol. Compute the angles: $\\cos A = (25 + 36 - 16)/60 = 3/4$, so $A = 41.409622°$; $\\cos B = (36 + 16 - 25)/48 = 9/16$, so $B = 55.771134°$; $\\cos C = (16 + 25 - 36)/40 = 1/8$, so $C = 82.819244°$.',
                'Check the sum: $41.409622 + 55.771134 + 82.819244 = 180$ to six decimals — engine-certified.',
                'Verify the ordering: sides $4 < 5 < 6$ and angles $41.409622° < 55.771134° < 82.819244°$ — rank for rank, as I.18 demands.',
                'Read the exterior at $C$ (opposite the side $6$): $180° - 82.819244° = 97.180756°$, which equals $A + B$ exactly and beats each remote separately ($97.180756 > 41.409622$ and $97.180756 > 55.771134$) — the I.16 verdict.',
                'Hence the $4$-$5$-$6$ triangle carries angles $41.409622°$, $55.771134°$, $82.819244°$, ordered with the sides, with exterior $97.180756°$ at the vertex opposite $6$.',
              ],
              answer: '$A = 41.409622°$, $B = 55.771134°$, $C = 82.819244°$ (sum $180$); ordering matches; exterior at $C$ is $97.180756°$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'A triangle has sides $x$, $x + 2$ and $x + 7$. Find the range of $x$ for which the triangle exists, test the boundary value, and name the smallest whole-number $x$ that works.',
              solution: [
                'Sol. Order the expressions: for $x > 0$ we have $x < x + 2 < x + 7$, so the longest side is $x + 7$ and the screen is $x + (x + 2) > x + 7$.',
                'Solve the screen: $2x + 2 > x + 7$ gives $x > 5$.',
                'Test the boundary: at $x = 5$ the triple is $(5, 7, 12)$ with $5 + 7 = 12$ — degenerate, flat, refused; the boundary itself is excluded.',
                'Test the next value: at $x = 6$ the triple is $(6, 8, 13)$ with $6 + 8 = 14 > 13$ — genuine, accepted.',
                'Hence the triangle exists exactly when $x > 5$, and the smallest whole-number value is $x = 6$, giving the genuine triangle $6$, $8$, $13$.',
              ],
              answer: '$x > 5$; smallest whole number $x = 6$ (the triple $6, 8, 13$)',
            },
            {
              q: 'Classify the largest angle. A triangle has sides $4$, $5$ and $8$: show that $4^2 + 5^2 < 8^2$, deduce that the angle opposite the side $8$ is obtuse, and compute it to six decimals.',
              solution: [
                'Sol. Square and compare: $4^2 + 5^2 = 16 + 25 = 41$, while $8^2 = 64$ — so $41 < 64$, the signature of an obtuse angle opposite the longest side.',
                'Deduce with the cosine rule: $\\cos C = (16 + 25 - 64)/(2 \\cdot 4 \\cdot 5) = -23/40$, which is negative, so $C$ is obtuse — and by I.18 it is the largest angle of the triangle, opposite the longest side $8$.',
                'Compute it: $C = \\arccos(-23/40) = 125.099632°$ to six decimals.',
                'Sanity-check with the screen: $4 + 5 = 9 > 8$, so the triangle genuinely exists — obtuse, but real.',
                'Hence the largest angle is $C = 125.099632°$, obtuse because $41 < 64$ forces $\\cos C = -23/40 < 0$.',
              ],
              answer: 'obtuse: $C = \\arccos(-23/40) = 125.099632°$, opposite the side $8$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The median inequality (exam-style). Let $D$ be the midpoint of side $BC$ in triangle $ABC$. Prove that $AB + AC > 2AD$, and verify the inequality numerically on the witness $A(1, 5)$, $B(0, 0)$, $C(6, 0)$.',
              solution: [
                'Sol. Construct the reflection of $A$ through $D$: extend $AD$ beyond $D$ to the point $E$ with $DE = AD$, so that $AE = 2AD$.',
                'Prove the congruence: in triangles $ABD$ and $ECD$ we have $BD = DC$ ($D$ is the midpoint), $AD = DE$ (construction) and $\\angle ADB = \\angle EDC$ (vertically opposite angles at $D$) — so triangle $ABD \\cong$ triangle $ECD$ by SAS.',
                'Harvest the corresponding part: $EC = AB$.',
                'Apply I.20 to triangle $ACE$: the points $A$, $C$, $E$ are not collinear (the median from a non-degenerate triangle\u2019s vertex never lies along the side), so $AC + CE > AE$.',
                'Substitute the harvest: $AC + AB > 2AD$, the median inequality.',
                'Verify on the witness $A(1, 5)$, $B(0, 0)$, $C(6, 0)$: the midpoint is $D = (3, 0)$; $AB = \\sqrt{26} = 5.099020$ and $AC = \\sqrt{50} = 7.071068$, summing to $12.170087$; while $AD = \\sqrt{29} = 5.385165$, so $2AD = 10.770330$.',
                'Check the congruence numerically: $E = (5, -5)$, and indeed $EC = \\sqrt{26} = AB$ and $AE = 10.770330 = 2AD$ — the construction closes.',
                'Hence $AB + AC = 12.170087 > 10.770330 = 2AD$: the median inequality holds, proved by reflection + SAS + I.20 and certified on the witness.',
              ],
              answer: 'proved; on the witness $AB + AC = 12.170087 > 10.770330 = 2AD$',
            },
          ],
        },
      ],
    },
  ],
}



