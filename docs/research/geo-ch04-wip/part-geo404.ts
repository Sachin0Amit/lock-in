import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — the cash-out lesson */
/* gets the teal-bronze family: earned ink, bronze operands)           */
/* ------------------------------------------------------------------ */
const c44 = {
  ink: '#134e4a', // primary text — deep teal ink
  mid: '#0f766e', // mid text — teal
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#115e59', // teal ink text
  amber: '#b45309', // connectors, ticks, operand text — bronze
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#be123c', // refusal / negative verdict — rose
  green: '#15803d', // structure strokes — boxes, axes, triangles
  panel: '#ccfbf1', // teal tinted fill
  panel2: '#fef3c7', // amber tinted fill
  sep: '#99f6e4', // light separators
  faint: '#5eead4', // faint dots, grids, arcs
  white: '#ffffff',
  paper: '#f0fdfa',
}
const f44 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo44 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo44Txt = (
  x: number, y: number, s: string,
  size = 13, color = c44.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f44}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo44Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c44.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo44Dot = (x: number, y: number, color = c44.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo44Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo44Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo44RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c44.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo44Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo44Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c44.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo44Line(x1, y1, x2, y2, color, w) + geo44Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, positive = downward on screen) */
const geo44Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo44Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

const d2r = (d: number): number => (d * Math.PI) / 180

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the rebuild from the split (hyp 10)            */
/* ------------------------------------------------------------------ */
const geo44Rebuild = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'REBUILD FROM THE SPLIT: HYP 10, SEGMENTS 6.4 AND 3.6', 13, c44.ink, 'middle', '700'))
  // the hypotenuse bar: 10 units at 30 px, split at 6.4
  const x0 = 100, y0 = 220
  parts.push(geo44Rect(x0, y0 - 9, 192, 18, c44.panel, 0.8, c44.tealInk, 2.2))
  parts.push(geo44Rect(x0 + 192, y0 - 9, 108, 18, c44.panel2, 0.9, c44.orange, 2.2))
  parts.push(geo44Dot(x0 + 192, y0, c44.ink, 4))
  parts.push(geo44Txt(196, 248, '6.4', 12.5, c44.tealInk, 'middle', '700'))
  parts.push(geo44Txt(346, 248, '3.6', 12.5, c44.orange, 'middle', '700'))
  parts.push(geo44Txt(250, 276, 'hypotenuse c = 10', 12.5, c44.ink, 'middle', '700'))
  // the two rebuilt legs, as geometric means
  parts.push(geo44Arrow(196, 208, 196, 158, c44.amber, 2.2))
  parts.push(geo44Txt(196, 142, '√(10 × 6.4) = 8', 12.5, c44.tealInk, 'middle', '700'))
  parts.push(geo44Arrow(346, 208, 346, 158, c44.amber, 2.2))
  parts.push(geo44Txt(346, 142, '√(10 × 3.6) = 6', 12.5, c44.orange, 'middle', '700'))
  parts.push(geo44Txt(320, 96, 'each leg: the geometric mean of the hyp and its segment', 12, c44.tealInk))
  parts.push(geo44Txt(320, 300, 'the 6−8−10 rebuilt from its own split', 12.5, c44.green, 'middle', '700'))
  return geo44Svg(640, 316, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the altitude-on-hypotenuse split of the 3-4-5      */
/* ------------------------------------------------------------------ */
const geo44Split = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'THE ALTITUDE ON THE HYPOTENUSE: 3² + 4² = 5²', 13, c44.ink, 'middle', '700'))
  // the big triangle: right angle at C, legs 3 (CB) and 4 (CA), unit 52 px
  const C: [number, number] = [120, 340], B: [number, number] = [276, 340], A: [number, number] = [120, 132]
  const H: [number, number] = [219.8, 265.1] // foot of the altitude (computed: 1.92, 1.44 units from C)
  parts.push(geo44Poly([A, B, C], c44.panel, 0.35, c44.green, 2.8))
  parts.push(geo44Line(C[0], C[1], H[0], H[1], c44.amber, 2.2, '6 5'))
  parts.push(geo44RA(C[0], C[1], 1, 0, 0, -1, 12, c44.ink))
  parts.push(geo44RA(H[0], H[1], 0.6, 0.8, -0.8, 0.6, 10, c44.ink))
  parts.push(geo44RA(H[0], H[1], -0.6, -0.8, 0.8, -0.6, 10, c44.ink))
  // shared-angle marks: single arc at A, double arc at B
  parts.push(geo44Arc(A[0], A[1], 18, d2r(53.13), d2r(90), c44.red, 2))
  parts.push(geo44Arc(B[0], B[1], 16, d2r(180), d2r(233.13), c44.red, 2))
  parts.push(geo44Arc(B[0], B[1], 22, d2r(180), d2r(233.13), c44.red, 2))
  // vertices
  parts.push(geo44Dot(A[0], A[1], c44.ink, 3.5))
  parts.push(geo44Dot(B[0], B[1], c44.ink, 3.5))
  parts.push(geo44Dot(C[0], C[1], c44.ink, 3.5))
  parts.push(geo44Dot(H[0], H[1], c44.amber, 3.5))
  parts.push(geo44Txt(108, 128, 'A', 13, c44.ink, 'end', '700'))
  parts.push(geo44Txt(290, 350, 'B', 13, c44.ink, 'start', '700'))
  parts.push(geo44Txt(108, 358, 'C', 13, c44.ink, 'end', '700'))
  parts.push(geo44Txt(228, 260, 'H', 13, c44.amber, 'start', '700'))
  // side + segment + altitude labels
  parts.push(geo44Txt(198, 364, '3', 12.5, c44.amber))
  parts.push(geo44Txt(104, 240, '4', 12.5, c44.amber, 'end'))
  parts.push(geo44Txt(216, 224, '5', 12.5, c44.amber))
  parts.push(geo44Txt(183, 189, '3.2', 12.5, c44.orange))
  parts.push(geo44Txt(263, 295, '1.8', 12.5, c44.orange))
  parts.push(geo44Txt(148, 308, '2.4', 12.5, c44.tealInk))
  // the census panel
  parts.push(geo44Txt(472, 78, 'THE THREE-TRIANGLE CENSUS', 12.5, c44.ink, 'middle', '700'))
  parts.push(geo44Line(362, 92, 586, 92, c44.sep, 1.6))
  parts.push(geo44Txt(366, 118, '△ABC: 3, 4, 5 — the whole', 12, c44.ink, 'start'))
  parts.push(geo44Txt(366, 146, '△CBH: 1.8, 2.4, 3 at k = 3/5', 12, c44.ink, 'start'))
  parts.push(geo44Txt(366, 174, '△ACH: 2.4, 3.2, 4 at k = 4/5', 12, c44.ink, 'start'))
  parts.push(geo44Txt(366, 202, 'all three run 36.87°, 53.13°, 90°', 12, c44.tealInk, 'start'))
  parts.push(geo44Txt(366, 230, 'similar by AA — twice over', 12.5, c44.orange, 'start', '700'))
  parts.push(geo44Txt(366, 262, 'p + q = 1.8 + 3.2 = 5', 12, c44.ink, 'start'))
  parts.push(geo44Txt(366, 290, 'areas 2.16 + 3.84 = 6', 12, c44.ink, 'start'))
  parts.push(geo44Txt(472, 326, '(3/5)² and (4/5)² of the whole area', 12, c44.tealInk, 'middle'))
  return geo44Svg(640, 396, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the mean-proportional diagram (semicircle on AB)   */
/* ------------------------------------------------------------------ */
const geo44Mean = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'THE MEAN-PROPORTIONAL DIAGRAM: h² = pq', 13, c44.ink, 'middle', '700'))
  // the semicircle on the hypotenuse AB (5 units at 50 px), C rides the arc
  const Ax = 110, Bx = 360, y0 = 250
  const Mx = 200 // foot: 1.8 units from A
  const T: [number, number] = [200, 130] // C, the right-angle vertex (2.4 units up)
  parts.push(geo44Arc(235, y0, 125, Math.PI, 2 * Math.PI, c44.faint, 1.8, '5 4'))
  parts.push(geo44Line(Ax, y0, Bx, y0, c44.green, 2.8))
  parts.push(geo44Line(Mx, y0, T[0], T[1], c44.amber, 2.4))
  parts.push(geo44Line(Ax, y0, T[0], T[1], c44.green, 2.4))
  parts.push(geo44Line(Bx, y0, T[0], T[1], c44.green, 2.4))
  parts.push(geo44RA(T[0], T[1], -0.6, 0.8, 0.8, 0.6, 12, c44.ink))
  parts.push(geo44RA(Mx, y0, -1, 0, 0, -1, 9, c44.ink))
  parts.push(geo44RA(Mx, y0, 1, 0, 0, -1, 9, c44.ink))
  parts.push(geo44Dot(Ax, y0, c44.ink, 3.5))
  parts.push(geo44Dot(Bx, y0, c44.ink, 3.5))
  parts.push(geo44Dot(Mx, y0, c44.amber, 3.5))
  parts.push(geo44Dot(T[0], T[1], c44.ink, 3.5))
  parts.push(geo44Txt(102, 270, 'A', 13, c44.ink, 'end', '700'))
  parts.push(geo44Txt(370, 270, 'B', 13, c44.ink, 'start', '700'))
  parts.push(geo44Txt(196, 116, 'C', 13, c44.ink, 'end', '700'))
  parts.push(geo44Txt(196, 274, 'H', 12.5, c44.amber, 'end', '700'))
  parts.push(geo44Txt(155, 296, 'p = 1.8', 12.5, c44.orange))
  parts.push(geo44Txt(282, 296, 'q = 3.2', 12.5, c44.orange))
  parts.push(geo44Txt(216, 196, 'h = 2.4', 12.5, c44.tealInk, 'start'))
  parts.push(geo44Txt(136, 196, '3', 12.5, c44.amber, 'end'))
  parts.push(geo44Txt(304, 196, '4', 12.5, c44.amber, 'start'))
  parts.push(geo44Txt(235, 226, '5', 12.5, c44.amber))
  parts.push(geo44Txt(235, 318, 'the semicircle on AB: the right angle rides the arc', 12, c44.tealInk))
  // the relations panel
  parts.push(geo44Txt(504, 96, 'THE THREE READINGS', 12.5, c44.ink, 'middle', '700'))
  parts.push(geo44Line(396, 108, 612, 108, c44.sep, 1.6))
  parts.push(geo44Txt(392, 134, 'h² = pq', 12.5, c44.orange, 'start', '700'))
  parts.push(geo44Txt(392, 160, '2.4² = 1.8 × 3.2 = 5.76', 12, c44.ink, 'start'))
  parts.push(geo44Txt(392, 188, '3² = 5 × 1.8 = 9', 12, c44.ink, 'start'))
  parts.push(geo44Txt(392, 216, '4² = 5 × 3.2 = 16', 12, c44.ink, 'start'))
  parts.push(geo44Txt(392, 244, '√(1.8 × 3.2) = 2.4', 12, c44.tealInk, 'start'))
  parts.push(geo44Txt(392, 274, 'each leg: the geometric mean', 12, c44.tealInk, 'start'))
  parts.push(geo44Txt(392, 300, 'of the hyp and its segment', 12, c44.tealInk, 'start'))
  return geo44Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — squares on the sides: 9 + 16 = 25                  */
/* ------------------------------------------------------------------ */
const geo44Squares = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'SQUARES ON THE SIDES: 9 + 16 = 25', 13, c44.ink, 'middle', '700'))
  // triangle: right angle at C, legs 3 (CB, 45 px/unit) and 4 (CA)
  const C: [number, number] = [255, 350], B: [number, number] = [390, 350], A: [number, number] = [255, 170]
  // square on CB (area 9): below the base
  parts.push(geo44Rect(255, 350, 135, 135, c44.panel, 0.7, c44.tealInk, 2.2))
  parts.push(geo44Txt(322, 425, '9', 14, c44.tealInk, 'middle', '700'))
  // square on CA (area 16): to the left
  parts.push(geo44Rect(75, 170, 180, 180, c44.panel, 0.7, c44.tealInk, 2.2))
  parts.push(geo44Txt(165, 265, '16', 14, c44.tealInk, 'middle', '700'))
  // square on AB (area 25): outward, up-right
  parts.push(geo44Poly([[255, 170], [390, 350], [570, 215], [435, 35]], c44.panel2, 0.8, c44.orange, 2.4))
  parts.push(geo44Txt(413, 193, '25', 14, c44.orange, 'middle', '700'))
  // the triangle itself on top
  parts.push(geo44Poly([A, B, C], c44.white, 0.9, c44.green, 2.8))
  parts.push(geo44RA(C[0], C[1], 1, 0, 0, -1, 12, c44.ink))
  parts.push(geo44Txt(322, 344, '3', 12.5, c44.amber))
  parts.push(geo44Txt(243, 265, '4', 12.5, c44.amber, 'end'))
  parts.push(geo44Txt(336, 250, '5', 12.5, c44.amber))
  parts.push(geo44Txt(470, 452, '9 + 16 = 25 = 5²', 13, c44.orange, 'middle', '700'))
  parts.push(geo44Txt(160, 452, 'the two leg squares', 12, c44.tealInk, 'middle'))
  parts.push(geo44Txt(160, 474, 'tile the hyp square in area', 12, c44.tealInk, 'middle'))
  return geo44Svg(640, 492, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the primitive-triple census scatter                */
/* ------------------------------------------------------------------ */
const geo44Census = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'THE PRIMITIVE TRIPLES WITH HYPOTENUSE ≤ 100: 16 POINTS', 13, c44.ink, 'middle', '700'))
  const x0 = 150, y0 = 440, u = 3.8 // 100 units = 380 px, square plot
  // grid every 20
  for (let g = 1; g <= 4; g++) {
    parts.push(geo44Line(x0 + 20 * g * u, 70, x0 + 20 * g * u, y0, c44.faint, 1.2))
    parts.push(geo44Line(x0, y0 - 20 * g * u, x0 + 380, y0 - 20 * g * u, c44.faint, 1.2))
    parts.push(geo44Txt(x0 + 20 * g * u, y0 + 18, String(20 * g), 11, c44.tealInk))
    parts.push(geo44Txt(x0 - 10, y0 - 20 * g * u + 4, String(20 * g), 11, c44.tealInk, 'end'))
  }
  // the hyp = 100 boundary arc
  parts.push(geo44Arc(x0, y0, 380, -Math.PI / 2, 0, c44.amber, 1.6, '6 4'))
  parts.push(geo44Txt(424, 168, 'hyp = 100', 11.5, c44.amber, 'start'))
  // axes
  parts.push(geo44Arrow(x0, y0, x0 + 396, y0, c44.ink, 2))
  parts.push(geo44Arrow(x0, y0, x0, 66, c44.ink, 2))
  parts.push(geo44Txt(470, 486, 'a (shorter leg)', 11.5, c44.ink, 'middle'))
  parts.push(geo44Txt(142, 58, 'b (longer leg)', 11.5, c44.ink, 'end'))
  // the 16 pinned points
  const pts: Array<[number, number]> = [
    [3, 4], [5, 12], [8, 15], [7, 24], [20, 21], [12, 35], [9, 40], [28, 45], [11, 60],
    [16, 63], [33, 56], [48, 55], [13, 84], [36, 77], [39, 80], [65, 72],
  ]
  pts.forEach((pt) => parts.push(geo44Dot(x0 + pt[0] * u, y0 - pt[1] * u, c44.tealInk, 4)))
  // the highlighted 3-4-5 and the pinned pair
  parts.push(geo44Dot(x0 + 3 * u, y0 - 4 * u, c44.orange, 5.5))
  parts.push(geo44Txt(172, 424, '3, 4, 5', 11.5, c44.orange, 'start', '700'))
  parts.push(geo44Txt(240, 358, '20, 21, 29', 11.5, c44.red, 'start', '700'))
  parts.push(geo44Txt(196, 286, '9, 40, 41', 11.5, c44.red, 'start', '700'))
  // annotation panel (empty top-right of the plot)
  parts.push(geo44Txt(418, 92, 'every dot: a primitive triple', 11.5, c44.tealInk, 'start'))
  parts.push(geo44Txt(418, 112, '(a, b, c) with c ≤ 100', 11.5, c44.tealInk, 'start'))
  parts.push(geo44Txt(418, 132, 'exactly 16 survive the sieve', 11.5, c44.tealInk, 'start'))
  return geo44Svg(640, 492, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the proof ladder (leg² = hyp × segment)        */
/* ------------------------------------------------------------------ */
const geo44Ladder = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'THE PROOF LADDER: leg² = hyp × segment, THEN ADD', 13, c44.ink, 'middle', '700'))
  // rung 1: the leg 3
  parts.push(geo44Rect(90, 60, 110, 44, c44.panel, 0.8, c44.tealInk, 2.2))
  parts.push(geo44Txt(145, 88, '3² = 9', 13, c44.tealInk, 'middle', '700'))
  parts.push(geo44Arrow(208, 82, 258, 82, c44.amber, 2.2))
  parts.push(geo44Txt(268, 87, '5 × 1.8 = 9', 12.5, c44.ink, 'start'))
  // rung 2: the leg 4
  parts.push(geo44Rect(90, 136, 110, 44, c44.panel, 0.8, c44.tealInk, 2.2))
  parts.push(geo44Txt(145, 164, '4² = 16', 13, c44.tealInk, 'middle', '700'))
  parts.push(geo44Arrow(208, 158, 258, 158, c44.amber, 2.2))
  parts.push(geo44Txt(268, 163, '5 × 3.2 = 16', 12.5, c44.ink, 'start'))
  parts.push(geo44Txt(64, 128, '+', 14, c44.ink, 'middle', '700'))
  parts.push(geo44Line(70, 118, 220, 118, c44.sep, 1.6))
  parts.push(geo44Line(70, 186, 220, 186, c44.sep, 1.6))
  // rung 3: the sum
  parts.push(geo44Rect(90, 222, 110, 44, c44.panel2, 0.9, c44.orange, 2.4))
  parts.push(geo44Txt(145, 250, '9 + 16', 13, c44.orange, 'middle', '700'))
  parts.push(geo44Arrow(208, 244, 258, 244, c44.amber, 2.2))
  parts.push(geo44Txt(268, 249, '5 × (1.8 + 3.2) = 5 × 5 = 25', 12.5, c44.ink, 'start'))
  parts.push(geo44Txt(320, 306, 'a² + b² = c(p + q) = c²', 13.5, c44.green, 'middle', '700'))
  return geo44Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the tree shadow (AA cashed)                    */
/* ------------------------------------------------------------------ */
const geo44Shadow = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(340, 22, 'THE TREE SHADOW: 1.5 m STICK, 2 m SHADOW, 12 m TREE SHADOW', 13, c44.ink, 'middle', '700'))
  // ground
  parts.push(geo44Line(50, 270, 660, 270, c44.green, 2.6))
  // the sun rays (parallel — the AA licence)
  parts.push(geo44Line(62, 171, 194, 270, c44.orange, 1.8, '7 5'))
  parts.push(geo44Line(282, 6, 634, 270, c44.orange, 1.8, '7 5'))
  parts.push(geo44Txt(96, 156, 'the sun\u2019s parallel rays', 11.5, c44.orange, 'start'))
  // the stick: 1.5 m at 22 px/m
  parts.push(geo44Line(150, 270, 150, 237, c44.ink, 3))
  parts.push(geo44RA(150, 270, 1, 0, 0, -1, 9, c44.ink))
  parts.push(geo44Txt(138, 252, '1.5 m', 12, c44.ink, 'end'))
  parts.push(geo44Line(150, 262, 194, 262, c44.amber, 3.4))
  parts.push(geo44Txt(140, 268, '2 m', 11.5, c44.amber, 'end'))
  // the tree: 9 m
  parts.push(geo44Line(370, 270, 370, 72, c44.green, 4))
  parts.push(geo44RA(370, 270, 1, 0, 0, -1, 9, c44.ink))
  parts.push(geo44Txt(358, 170, 'h = 9 m', 12.5, c44.green, 'end', '700'))
  parts.push(geo44Line(370, 262, 634, 262, c44.amber, 3.4))
  parts.push(geo44Txt(500, 254, '12 m', 11.5, c44.amber))
  parts.push(geo44Txt(340, 310, 'AA (Lesson 4.3) licenses it; k = 6 on the shadows; height = 1.5 × 6 = 9 m', 12.5, c44.tealInk))
  return geo44Svg(680, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the converse check: 8,15,17 vs 4,5,7           */
/* ------------------------------------------------------------------ */
const geo44Converse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'CONVERSE CHECKS: 8, 15, 17 FIRES — 4, 5, 7 REFUSES', 13, c44.ink, 'middle', '700'))
  // LEFT: the 8-15-17 (right at C, unit 7 px)
  const C1: [number, number] = [150, 240], B1: [number, number] = [206, 240], A1: [number, number] = [150, 135]
  parts.push(geo44Poly([A1, B1, C1], c44.panel, 0.5, c44.green, 2.6))
  parts.push(geo44RA(C1[0], C1[1], 1, 0, 0, -1, 11, c44.ink))
  parts.push(geo44Txt(178, 262, '8² = 64', 12, c44.tealInk))
  parts.push(geo44Txt(136, 192, '15² = 225', 12, c44.tealInk, 'end'))
  parts.push(geo44Txt(252, 178, '17² = 289', 12, c44.tealInk, 'start'))
  parts.push(geo44Txt(180, 298, '64 + 225 = 289 ✓ right', 12.5, c44.green, 'middle', '700'))
  parts.push(geo44Txt(180, 318, '8, 15, 17 — the corner is square', 11.5, c44.ink))
  // RIGHT: the 4-5-7 (bulging corner at C, unit 14 px)
  const C2: [number, number] = [430, 240], B2: [number, number] = [486, 240], A2: [number, number] = [416, 171.4]
  parts.push(geo44Poly([A2, B2, C2], c44.panel2, 0.7, c44.red, 2.6))
  parts.push(geo44Arc(C2[0], C2[1], 22, d2r(-78.5), d2r(0), c44.red, 2.2))
  parts.push(geo44Txt(462, 218, '≈ 101.5°', 11.5, c44.red, 'start', '700'))
  parts.push(geo44Txt(458, 262, '4² = 16', 12, c44.tealInk))
  parts.push(geo44Txt(404, 206, '5² = 25', 12, c44.tealInk, 'end'))
  parts.push(geo44Txt(462, 186, '7² = 49', 12, c44.tealInk, 'start'))
  parts.push(geo44Txt(470, 298, '16 + 25 = 41 ≠ 49 — NOT right', 12.5, c44.red, 'middle', '700'))
  parts.push(geo44Txt(470, 318, '4, 5, 7 — the corner bulges', 11.5, c44.ink))
  return geo44Svg(640, 332, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the special families                           */
/* ------------------------------------------------------------------ */
const geo44Specials = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo44Txt(320, 22, 'THE SPECIAL FAMILIES: 45−45−90 AND 30−60−90', 13, c44.ink, 'middle', '700'))
  // LEFT: 45-45-90, legs 1 (90 px)
  parts.push(geo44Poly([[150, 240], [240, 240], [150, 150]], c44.panel, 0.6, c44.tealInk, 2.6))
  parts.push(geo44RA(150, 240, 1, 0, 0, -1, 11, c44.ink))
  parts.push(geo44Arc(150, 150, 16, d2r(45), d2r(90), c44.red, 2))
  parts.push(geo44Arc(240, 240, 16, d2r(180), d2r(225), c44.red, 2))
  parts.push(geo44Txt(195, 262, '1', 12, c44.amber))
  parts.push(geo44Txt(138, 198, '1', 12, c44.amber, 'end'))
  parts.push(geo44Txt(210, 186, '√2', 12, c44.amber))
  parts.push(geo44Txt(126, 144, '45°', 11.5, c44.red, 'end'))
  parts.push(geo44Txt(252, 228, '45°', 11.5, c44.red, 'start'))
  parts.push(geo44Txt(195, 288, '1 : 1 : √2', 12.5, c44.tealInk, 'middle', '700'))
  parts.push(geo44Txt(195, 308, '√2 ≈ 1.4142136', 12, c44.ink))
  // RIGHT: 30-60-90, short leg 1 (90 px), long leg √3 (155.9 px)
  parts.push(geo44Poly([[430, 240], [520, 240], [430, 84.1]], c44.panel2, 0.7, c44.orange, 2.6))
  parts.push(geo44RA(430, 240, 1, 0, 0, -1, 11, c44.ink))
  parts.push(geo44Arc(430, 84.1, 18, d2r(90), d2r(120), c44.red, 2))
  parts.push(geo44Arc(520, 240, 18, d2r(150), d2r(180), c44.red, 2))
  parts.push(geo44Txt(475, 262, '1', 12, c44.amber))
  parts.push(geo44Txt(418, 164, '√3', 12, c44.amber, 'end'))
  parts.push(geo44Txt(492, 152, '2', 12, c44.amber))
  parts.push(geo44Txt(446, 102, '30°', 11.5, c44.red, 'start'))
  parts.push(geo44Txt(500, 226, '60°', 11.5, c44.red, 'start'))
  parts.push(geo44Txt(508, 288, '1 : √3 : 2', 12.5, c44.tealInk, 'middle', '700'))
  parts.push(geo44Txt(508, 308, '√3 ≈ 1.7320508', 12, c44.ink))
  return geo44Svg(640, 322, aria, parts)
}

export const lessonGeo404: Lesson = {
  id: 'geo-pythagoras-proved-the-theorem-earned',
  number: '4.4',
  title: 'Pythagoras Proved: the Theorem Earned',
  concepts: ['Pythagoras\u2019 theorem', 'altitude on the hypotenuse', 'geometric mean', 'right-triangle similarity', 'Pythagorean triples', 'special right triangles', 'converse of Pythagoras'],
  objectives: [
    'Name the debt precisely: state what has been borrowed about $a^2 + b^2 = c^2$ since Foundation Mathematics, and what it means for this chapter to pay it back',
    'Perform the altitude-on-hypotenuse construction and walk ALL THREE similarity statements ($\\triangle ABC \\sim \\triangle ACH \\sim \\triangle CBH$) by AA, with the scale factors of each piece read with their directions',
    'Read Euclid VI.8 off the split: each leg is the geometric mean of the hypotenuse and its adjacent segment, and the altitude is the geometric mean of the two segments',
    'Prove Pythagoras twice — by similarity (VI.31: $a^2 = cp$, $b^2 = cq$, add) and by areas (the squares on the sides, $9 + 16 = 25$) — and place Euclid I.47\u2019s windmill as the classic cousin',
    'Apply the $k$, $k^2$ machine with Euclid VI.19\u2019s duplicate ratio to similar figures, and cash the tree-shadow application with the AA licence from Lesson 4.3',
    'Run the primitive-triple census with hypotenuse at most $100$ (exactly $16$), use the $45$-$45$-$90$ and $30$-$60$-$90$ similarity families, and test triples with the converse ($8, 15, 17$ yes; $4, 5, 7$ no) — the carpenter\u2019s $3$-$4$-$5$ check included',
  ],
  prerequisites: ['geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-similarity-criteria-aa-sas-sss'],
  sources: ['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. the debt named                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The debt: a formula used for years, never proved' },
    {
      kind: 'para',
      text: 'You have been spending $a^2 + b^2 = c^2$ since Foundation Mathematics. Ladder leaning on a wall: $3^2 + 4^2 = 5^2$, so the foot sits $3$ metres out when the top rests $4$ metres up. Television diagonal: a screen of width $48$ and height $20$ carries a diagonal of $\\sqrt{48^2 + 20^2} = \\sqrt{2704} = 52$. Doorframe diagonal, gate brace, rafter length, shortest path across a rectangular park — thousands of exercises, all running the same one-line law on trust. And the trust was never cashed. Nobody derived the law from anything; you were told it works, you checked it on the $3$-$4$-$5$ triangle ($9 + 16 = 25$ — true), and you used it. That is a loan, and this lesson is the repayment.',
    },
    {
      kind: 'para',
      text: 'Say precisely what was owed. A theorem is not a pattern that survives spot-checks; it is a statement DERIVED from ground already earned, each step licensed by something you already own. This chapter has been quietly assembling exactly that ground. Lesson 4.1 built the definition of similarity and the $k$, $k^2$ machine: same shape at any scale, lengths multiplying by $k$, areas by $k^2$. Lesson 4.2 proved the Basic Proportionality Theorem — a line parallel to one side cuts the others proportionally — the first bridge from angle facts to length ratios. Lesson 4.3 earned the similarity criteria, above all AA: two matching angles force similarity, no third check needed. Those three lessons are the assets. Today they pay for Pythagoras.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'What “earned” means, and why this proof and not that one',
      text: 'Euclid proves the theorem twice. Book I, Proposition 47 — the windmill — does it by areas: squares built on all three sides of the triangle, and a dissection argument showing the two small squares exactly fill the big one. Book VI, Proposition 31 does it by similarity: split the triangle, compare the pieces, and the equation $a^2 + b^2 = c^2$ falls out in three lines. This chapter takes the VI.31 route, because the machinery is already on the table — the altitude construction of this lesson is similarity doing what similarity does — and because VI.31 is the proof that GENERALISES: Euclid notices it works with any similar figures on the sides (triangles, pentagons, even copies of the triangle itself), not just squares. The windmill is the classic; the similarity proof is the one you could have invented after Lesson 4.3. Both are shown here, windmill second.',
    },
    {
      kind: 'para',
      text: 'The plan of the repayment, in order. First the CONSTRUCTION — one added line, the altitude from the right angle to the hypotenuse, which splits the triangle into two smaller triangles. Then the surprise, earned by AA: each small triangle is similar to the original, so one line has manufactured three similar triangles. Then the READ-OFF, Euclid VI.8: comparing corresponding sides hands you three geometric-mean equations, one for each leg and one for the altitude. Then the PROOF itself — the two leg equations, added. Then the second proof by areas, and Euclid\u2019s windmill as its famous cousin. Then the two cash payments: areas of similar figures scale by $k^2$ (Euclid VI.19, the duplicate ratio) and the tree-shadow measurement, the application the chapter promised in 4.1 and can finally legalise with AA. Finally the FAMILIES: the census of primitive triples with hypotenuse at most $100$ — exactly $16$ of them — the two special triangles $45$-$45$-$90$ and $30$-$60$-$90$ as similarity families, and the CONVERSE, the direction carpenters actually use when they check a corner with a $3$-$4$-$5$ measurement. Every number in what follows was recomputed by the engine behind this lesson before a word of prose stood.',
    },
    {
      kind: 'para',
      text: 'One historical honesty before the mathematics starts, because the naming is two thousand years younger than the knowledge. Babylonian scribes, around $1800$ BCE — more than a millennium before Pythagoras of Samos (c. $570$–$495$ BCE) — compiled Plimpton 322, a clay tablet listing pairs that generate what we now call Pythagorean triples; the $3$-$4$-$5$ triangle was furniture of the surveyor\u2019s craft in Egypt and Mesopotamia long before any Greek proof. The tradition credits Pythagoras with the first proof; the record credits Euclid\u2019s Elements (c. $300$ BCE) with the first proofs we can still read — I.47 by areas, VI.31 by similarity. The theorem\u2019s name is a memorial; the proof is the property of whoever works through it. From here on, the notation follows the chapter law: $\\triangle ABC$ has its right angle at $C$, legs $a = BC$ and $b = CA$, hypotenuse $c = AB$, and every scale factor is stated with its direction.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the construction                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The construction: drop the altitude, split the triangle' },
    {
      kind: 'para',
      text: 'Take the witness right triangle — legs $3$ and $4$, hypotenuse $5$, right angle at $C$ — and perform one construction, the only one this lesson needs. Drop the perpendicular from $C$ to the hypotenuse $AB$, and call its foot $H$. The altitude $CH$ slices the big triangle into two smaller ones: the piece $\\triangle CBH$ at the $B$ end and the piece $\\triangle ACH$ at the $A$ end. Nothing else is drawn, extended or assumed; one line, two pieces, three triangles in the figure where there used to be one.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the altitude-on-hypotenuse split of the 3-4-5. The altitude CH (dashed, 2.4) meets the hypotenuse at H, cutting it into segments p = 1.8 (adjacent to the leg 3) and q = 3.2 (adjacent to the leg 4). The single arc at A and the double arc at B mark the shared angles; right angles sit at C and at H on both sides. The census panel records the three triangles and their ratio-to-whole scale factors k = 3/5 and k = 4/5.',
      svg: geo44Split('A right triangle with legs 3 and 4 and hypotenuse 5, the altitude 2.4 dropped from the right angle to the hypotenuse, splitting it into segments 1.8 and 3.2, with angle marks showing all three triangles similar.'),
    },
    {
      kind: 'para',
      text: 'Now interrogate the pieces, and let AA do all the work. The upper piece $\\triangle ACH$ shares the angle at $A$ with the big triangle $\\triangle ABC$ — literally the same angle, drawn once. Its angle at $H$ is a right angle, because $CH$ was built perpendicular to $AB$; that right angle answers the right angle at $C$ of the big triangle. Two angles match, so the third pair matches automatically (angle sums are $180^\\circ$ in both), and AA — earned in Lesson 4.3 — delivers the verdict: $\\triangle ACH \\sim \\triangle ABC$. The lower piece $\\triangle CBH$ runs the same argument with the angle at $B$: shared angle, right angle at $H$ answering the right angle at $C$, so $\\triangle CBH \\sim \\triangle ABC$. And since similarity is transitive — each piece similar to the whole — the pieces are similar to EACH OTHER as well: $\\triangle ACH \\sim \\triangle CBH$. One construction, three similarity statements, all licensed by a criterion proved two lessons ago.',
    },
    {
      kind: 'derivation',
      title: 'The AA census: why all three triangles are similar',
      statement: 'In $\\triangle ABC$ with the right angle at $C$ and the altitude $CH$ dropped to the hypotenuse $AB$, all three triangles in the figure are similar: $\\triangle ABC \\sim \\triangle ACH \\sim \\triangle CBH$.',
      steps: [
        {
          label: 'The upper piece shares two angles with the whole',
          formula: '\\angle A \\text{ common}, \\quad \\angle AHC = \\angle ACB = 90^\\circ',
          explanation: 'The angle at $A$ belongs to both triangles — one drawn angle, two triangles containing it. The altitude was constructed perpendicular to $AB$, so the angle at $H$ in $\\triangle ACH$ is a right angle, answering the right angle at $C$ in $\\triangle ABC$. Two pairs matched.',
        },
        {
          label: 'AA closes the first statement',
          formula: '\\triangle ACH \\sim \\triangle ABC',
          explanation: 'With two angles matched, the third pair is forced ($180^\\circ$ minus the same two leftovers), and the AA criterion of Lesson 4.3 converts two angle equalities into full similarity: all corresponding sides proportional, one common ratio. No side was measured; the licence is purely angular.',
        },
        {
          label: 'The lower piece runs the identical argument',
          formula: '\\angle B \\text{ common}, \\quad \\angle CHB = \\angle ACB = 90^\\circ \\;\\Rightarrow\\; \\triangle CBH \\sim \\triangle ABC',
          explanation: 'The piece $\\triangle CBH$ shares the angle at $B$ and carries its right angle at $H$ (the other side of the same perpendicular). AA fires a second time: the lower piece is similar to the whole as well.',
        },
        {
          label: 'Transitivity completes the census',
          formula: '\\triangle ACH \\sim \\triangle ABC, \\; \\triangle CBH \\sim \\triangle ABC \\;\\Rightarrow\\; \\triangle ACH \\sim \\triangle CBH',
          explanation: 'Similarity is an equivalence: two figures each similar to a third are similar to each other. So the single dropped line has produced a figure in which EVERY triangle is similar to EVERY other — three triangles, one shape, two sizes.',
        },
        {
          label: 'The scale factors, read with their directions',
          formula: '\\frac{CH}{BC} = \\frac{3}{5}, \\quad \\frac{AH}{AC} = \\frac{4}{5} \\;\\text{(piece to whole)}',
          explanation: 'On the witness triangle: $\\triangle CBH$ is $\\triangle ABC$ at $k = 3/5$ read piece-to-whole (its hypotenuse $CB = 3$ against the whole\u2019s $5$), and $\\triangle ACH$ is the whole at $k = 4/5$ (hypotenuse $CA = 4$ against $5$). The return reads are $5/3$ and $5/4$; state the direction before you state the number.',
        },
      ],
      result: 'One perpendicular from the right angle to the hypotenuse splits $\\triangle ABC$ into $\\triangle ACH$ and $\\triangle CBH$, and AA certifies $\\triangle ABC \\sim \\triangle ACH \\sim \\triangle CBH$ — the whole similar to each of its parts.',
    },
    {
      kind: 'para',
      text: 'The census deserves a table, because the three triangles will be read against each other for the rest of the lesson, and every read needs the correspondence spelled out. Note the two bookkeeping facts the table makes visible. First, the two pieces PARTITION the whole: their segments rejoin the hypotenuse ($1.8 + 3.2 = 5$) and their areas rejoin the area ($2.16 + 3.84 = 6$). Second, the pieces carry exactly $(3/5)^2 = 9/25$ and $(4/5)^2 = 16/25$ of the whole\u2019s area — the $k$, $k^2$ machine of Lesson 4.1 running INSIDE a single triangle, and $9/25 + 16/25 = 25/25$: the two fractions of area, like the two segments of hypotenuse, sum to one. That is not a coincidence to admire; it is the seed of the proof, because it says the two pieces TOGETHER are worth exactly the whole.',
    },
    {
      kind: 'table',
      caption: 'The three-triangle census — sides, hypotenuses, ratio to the whole (piece to whole) and areas; every cell recomputed by the engine',
      head: ['triangle', 'sides', 'hypotenuse', 'k to the whole', 'area'],
      rows: [
        ['$\\triangle ABC$ (the whole)', '$3, 4, 5$', '$5$', '$1$', '$6$'],
        ['$\\triangle CBH$ (lower piece)', '$1.8, 2.4, 3$', '$3$', '$3/5$', '$2.16$'],
        ['$\\triangle ACH$ (upper piece)', '$2.4, 3.2, 4$', '$4$', '$4/5$', '$3.84$'],
      ],
    },
    {
      kind: 'para',
      text: 'A detail worth slowing down on, because it is where every wrong answer in this topic is born: the pieces are similar to the whole but SMALLER, and their hypotenuses are the whole\u2019s LEGS. The lower piece $\\triangle CBH$ has hypotenuse $CB = 3$ — the big triangle\u2019s leg $a$. The upper piece has hypotenuse $CA = 4$ — the big triangle\u2019s leg $b$. When you write a ratio between the triangles, the hypotenuse of the piece answers the HYPOTENUSE of the whole ($3$ against $5$, or $4$ against $5$), never a leg. Get that correspondence wrong and every proportion downstream is scrambled; get it right and the geometric means of the next section are one line each. The correspondence is the mathematics; the numbers merely record it.',
    },

    /* -------------------------------------------------------------- */
    /* 3. Euclid VI.8                                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Euclid VI.8: the three geometric-mean readings' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Geometric mean (the mean proportional)',
      text: 'The geometric mean of two positive numbers $x$ and $y$ is the number $m$ with $m^2 = xy$, that is $m = \\sqrt{xy}$. In ratio language, $m$ is the MEAN PROPORTIONAL between $x$ and $y$: the middle position of the proportion $x : m = m : y$, where the whole stands to the mean as the mean stands to the part. Numerically: the geometric mean of $1.8$ and $3.2$ is $\\sqrt{1.8 \\times 3.2} = \\sqrt{5.76} = 2.4$ — the number that splits the pair into one equal ratio. Contrast the arithmetic mean $(x + y)/2$: for $1.8$ and $3.2$ that reads $2.5$, a different animal with different theorems attached.',
    },
    {
      kind: 'para',
      text: 'Name the parts once, in the notation the rest of the lesson keeps: $p = BH = 1.8$ (the segment adjacent to the leg $a = 3$), $q = AH = 3.2$ (adjacent to the leg $b = 4$), $h = CH = 2.4$ (the altitude). Now read the correspondence through, side by side. In $\\triangle CBH \\sim \\triangle ABC$, the hypotenuse $CB = 3$ of the piece answers the hypotenuse $AB = 5$ of the whole, and the leg $BH = p$ of the piece answers the leg $CB = 3$ of the whole — because both are the sides standing opposite the shared angle at $B$... the sides opposite the angle marked with the double arc, in both triangles. Similarity says those two ratios are EQUAL: $p/3 = 3/5$. Clear the fractions and the geometric mean appears: $3^2 = 5p$, that is $9 = 5 \\times 1.8$. The leg $3$ is the geometric mean of the hypotenuse $5$ and the segment $1.8$ adjacent to it. Run the same read on $\\triangle ACH \\sim \\triangle ABC$ and the other leg lands: $4^2 = 5q$, that is $16 = 5 \\times 3.2$. These two equations are Euclid VI.8 — “in right-angled triangles, the square on a leg equals the rectangle contained by the hypotenuse and the segment of the hypotenuse adjacent to that leg”, in the Elements\u2019 own idiom of squares and rectangles.',
    },
    {
      kind: 'example',
      title: 'Illustration 1 — Reading the split: the 3-4-5 machine',
      steps: [
        'Sol. Compute the segments from the leg laws. The segment adjacent to the leg $3$: $p = a^2/c = 9/5 = 1.8$. The segment adjacent to the leg $4$: $q = b^2/c = 16/5 = 3.2$. Check the partition: $p + q = 1.8 + 3.2 = 5 = c$.',
        'Compute the altitude by area, both ways. The whole triangle has area $\\frac{1}{2} \\times 3 \\times 4 = 6$; seen with the hypotenuse as base it is $\\frac{1}{2} \\times 5 \\times h$, so $h = 12/5 = 2.4$.',
        'Verify the altitude law: $h^2 = pq$ reads $2.4^2 = 5.76$ and $1.8 \\times 3.2 = 5.76$ — equal, so the altitude is the geometric mean of the two segments: $\\sqrt{1.8 \\times 3.2} = 2.4$.',
        'Verify both leg laws: $3^2 = 9 = 5 \\times 1.8$ and $4^2 = 16 = 5 \\times 3.2$ — each leg squared equals hypotenuse times its adjacent segment.',
        'Hence the split is pinned: $p = 1.8$, $q = 3.2$, $h = 2.4$, with $p + q = 5$, $h^2 = pq = 5.76$, and the two leg laws $9 = 5 \\times 1.8$, $16 = 5 \\times 3.2$ — the engine recomputed every line before this illustration was allowed to stand.',
      ],
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the mean-proportional diagram. The 3-4-5 redrawn with its hypotenuse AB as the diameter of a semicircle: the right-angle vertex C rides the arc, the altitude foot H splits the diameter into p = 1.8 and q = 3.2, and the altitude h = 2.4 stands between them. The relations panel carries the three geometric-mean readings: h² = pq (2.4² = 1.8 × 3.2 = 5.76), 3² = 5 × 1.8, 4² = 5 × 3.2, and the mean read √(1.8 × 3.2) = 2.4.',
      svg: geo44Mean('A semicircle on the hypotenuse of a 3-4-5 right triangle with the right-angle vertex on the arc, the altitude 2.4 dropped to the diameter splitting it into 1.8 and 3.2, and the geometric-mean relations h squared equals p q, 9 = 5 times 1.8 and 16 = 5 times 3.2 listed beside it.'),
    },
    {
      kind: 'para',
      text: 'The third geometric mean comes from comparing the two pieces WITH EACH OTHER, and it is the prettiest of the three. In $\\triangle ACH \\sim \\triangle CBH$, the altitude $CH = h$ appears in both triangles — as a LEG in each, opposite the single-arc angle in one and the double-arc angle in the other. Reading the corresponding sides: $AH/q$-side against $CH$-side... written cleanly, the proportion is $AH : CH = CH : BH$ — the long segment stands to the altitude as the altitude stands to the short segment. Clear it and you hold $h^2 = pq$: the ALTITUDE is the geometric mean of the two segments. On the witness numbers, $2.4^2 = 5.76 = 1.8 \\times 3.2$, exact to the digit. Euclid states this as part of the same Book VI proposition; school tradition often labels it the “altitude on hypotenuse theorem” and proves it standalone — but inside the three-triangle census it is just one more read of one correspondence.',
    },
    {
      kind: 'para',
      text: 'The semicircle of Figure F2 is worth one paragraph of its own, because it turns the algebra into a picture you can check with a compass. Draw the hypotenuse $AB$ and the semicircle on it as diameter; rest the right-angle vertex $C$ anywhere on the arc — Euclid III.31, the theorem of Thales\u2019 circle from the congruence chapter\u2019s world, says every such $C$ gives a right angle at $C$. Drop the altitude from $C$ back to the diameter: its foot $H$ splits the diameter into $p$ and $q$, and the figure\u2019s two claims are exactly the two altitude facts — $CH^2 = AH \\cdot BH$ (the mean proportional, visible as the standing height between the two segments) and, sliding the correspondence, the leg laws. The geometric mean stops being a formula and becomes a LENGTH in the drawing: the height over the junction of the two segments. Ancient geometers drew means, not decimal expansions; after this figure, so can you.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the proof by similarity                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The proof by similarity: the theorem earned' },
    {
      kind: 'para',
      text: 'Everything is now on the table, and the proof is short because the reading has been done carefully. Euclid VI.8 handed over two equations — one per leg. The altitude partition hands over one more fact — the segments rejoin the hypotenuse. Add the equations, factor, apply the partition, and Pythagoras falls out. That is the entire argument: three lines, each licensed by something earned earlier in this chapter, none of them borrowed. This is Euclid\u2019s Book VI, Proposition 31 — the similarity proof — and it is the cash-out the whole chapter has been saving for.',
    },
    {
      kind: 'derivation',
      title: 'Pythagoras proved by similarity (Euclid VI.31)',
      statement: 'In a right triangle with legs $a$ and $b$, hypotenuse $c$, and the altitude dropped so that $c$ splits into $p$ (adjacent to $a$) and $q$ (adjacent to $b$), the three similarity statements imply $a^2 + b^2 = c^2$.',
      steps: [
        {
          label: 'The two leg laws, already earned',
          formula: 'a^2 = c \\cdot p, \\quad b^2 = c \\cdot q',
          explanation: 'These are Euclid VI.8 verbatim: comparing $\\triangle CBH$ with $\\triangle ABC$ gave $a^2 = cp$, and comparing $\\triangle ACH$ with $\\triangle ABC$ gave $b^2 = cq$. On the witness triangle they read $9 = 5 \\times 1.8$ and $16 = 5 \\times 3.2$ — the engine recomputed both before this line was written.',
        },
        {
          label: 'Add the two equations',
          formula: 'a^2 + b^2 = c \\cdot p + c \\cdot q',
          explanation: 'Adding equalities is free: the left side becomes the familiar $a^2 + b^2$, the right side carries both products. Nothing has been assumed about the triangle that the census has not already licensed.',
        },
        {
          label: 'Factor the right side',
          formula: 'c \\cdot p + c \\cdot q = c(p + q)',
          explanation: 'Both products share the factor $c$ — the hypotenuse appears once in each leg law, because each leg is a mean between the WHOLE hypotenuse and its own segment. This single factor of $c$ on the outside is the shape of the theorem to come.',
        },
        {
          label: 'Close with the partition',
          formula: 'p + q = c \\;\\Rightarrow\\; a^2 + b^2 = c \\cdot c = c^2',
          explanation: 'The foot $H$ lies ON the hypotenuse, so the two segments rejoin it: $p + q = c$ (the witness: $1.8 + 3.2 = 5$). Substituting collapses the right side to $c^2$ exactly — no approximation, no leftover terms.',
        },
        {
          label: 'The witness, run line by line',
          formula: '9 + 16 = 5 \\times 1.8 + 5 \\times 3.2 = 5(1.8 + 3.2) = 5 \\times 5 = 25',
          explanation: 'On the $3$-$4$-$5$ triangle the derivation reads $9 + 16 = 25$ at every intermediate stage — the familiar equation, now REACHED rather than checked. The general argument and the witness agree because the witness is the general argument with numbers pinned on.',
        },
      ],
      result: '$a^2 + b^2 = c^2$ — the square on the hypotenuse equals the sum of the squares on the legs, derived from the altitude split by AA, VI.8 and the partition. The debt is paid.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Pythagoras\u2019 theorem (Euclid I.47 / VI.31 — now earned)',
      text: 'In every right triangle, the square on the hypotenuse equals the sum of the squares on the two legs: $a^2 + b^2 = c^2$, where $c$ is the side opposite the right angle. The proof above derives it from similarity; the next section derives it again from areas. The CONVERSE — if $a^2 + b^2 = c^2$ then the angle opposite $c$ is right — is a separate statement with a separate licence, treated in the final section: do not let the theorem and its converse share a proof they do not share.',
    },
    {
      kind: 'example',
      title: 'Illustration 2 — The ladder on the 3-4-5',
      steps: [
        'Sol. Rung one, the leg-$3$ law: $3^2 = 5 \\times 1.8$, and $5 \\times 1.8 = 9$ — so $9 = 9$, the first rung holds.',
        'Rung two, the leg-$4$ law: $4^2 = 5 \\times 3.2$, and $5 \\times 3.2 = 16$ — so $16 = 16$, the second rung holds.',
        'Add the rungs: $9 + 16 = 5 \\times 1.8 + 5 \\times 3.2 = 5 \\times (1.8 + 3.2)$ — the common factor $5$ comes outside.',
        'Close with the partition: $1.8 + 3.2 = 5$, so the right side is $5 \\times 5 = 25$.',
        'Hence $3^2 + 4^2 = 9 + 16 = 25 = 5^2$ — the equation you have used for years, this time derived: two leg laws, one addition, one partition. The figure below draws the ladder.',
      ],
      figures: [
        {
          caption: 'The proof ladder for Illustration 2: the leg-3 rung (3² = 9 = 5 × 1.8) and the leg-4 rung (4² = 16 = 5 × 3.2) stacked and added, the sum rung reading 9 + 16 = 5 × (1.8 + 3.2) = 5 × 5 = 25, with the general law a² + b² = c(p + q) = c² underneath.',
          svg: geo44Ladder('A three-rung ladder diagram: boxes reading 3 squared equals 9 and 4 squared equals 16 mapping by arrows to 5 times 1.8 and 5 times 3.2, added to 9 plus 16 equals 5 times 5 equals 25, with the formula a squared plus b squared equals c times p plus q equals c squared.'),
        },
      ],
    },
    {
      kind: 'para',
      text: 'Two honesty checks before moving on, because a proof you cannot audit is a proof you do not own. First, CIRCULARITY: did the argument secretly use Pythagoras anywhere? Trace the licences backwards. The proof used VI.8 (ratios from similar triangles), which used AA from Lesson 4.3, which used the angle-sum theorem and the Basic Proportionality Theorem of Lesson 4.2, which used the area theory of triangles on equal bases (Euclid I.37\u2019s family) — and none of that chain ever touched the parallel postulate\u2019s distant cousin $a^2 + b^2 = c^2$. The loan was repaid with genuinely different money. Second, GENERALITY: the argument never once used that the legs were $3$ and $4$ — the numbers were witnesses, not inputs — so it runs verbatim on the $5$-$12$-$13$ ($25 = 13 \\times \\tfrac{25}{13}$, $144 = 13 \\times \\tfrac{144}{13}$, sum $169 = 13 \\times 13$), on the $8$-$15$-$17$, and on every right triangle with irrational legs, where no grid of unit squares could ever be counted. That last point is the deep one, and the next section makes it explicit.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the second proof: squares on the sides                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The second proof: squares on the sides' },
    {
      kind: 'para',
      text: 'The theorem says SQUARES — $a^2 + b^2 = c^2$ is a statement about the areas of three squares — so the second proof draws them. Erect a square outward on each side of the right triangle: on leg $3$ a square of area $9$, on leg $4$ a square of area $16$, on the hypotenuse $5$ a square of area $25$. The theorem claims the two small squares hold exactly as much area as the big one: $9 + 16 = 25$. On the witness triangle you can see it with a pin: the $9$-square fits $3 \\times 3$ unit squares, the $16$-square fits $4 \\times 4$, the $25$-square fits $5 \\times 5$ — and a jig-saw cut of the big square (several are known; Perigal\u2019s from $1873$ slices it with two lines through its center) reassembles the pieces into the two small ones, area for area, no gap and no overlap.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the squares on the sides. The 3-4-5 with the square 9 on the leg 3, the square 16 on the leg 4 and the square 25 on the hypotenuse, drawn in place: the two leg squares (teal) hold together exactly the area of the hypotenuse square (amber), 9 + 16 = 25 = 5².',
      svg: geo44Squares('A right triangle with legs 3 and 4 and a square of area 9 built on the short leg, a square of area 16 on the long leg, and a square of area 25 on the hypotenuse, with the caption 9 plus 16 equals 25.'),
    },
    {
      kind: 'para',
      text: 'Euclid\u2019s own proof — Book I, Proposition 47, the figure schoolbooks nickname the WINDMILL for its turning sails of squares — is grander than a jigsaw and needs no scissors. Build the three squares outward. Draw one auxiliary line: through the right-angle vertex $C$, a line parallel to the inner side of the hypotenuse square, cutting the big square into two rectangles with sides $5 \\times p$ and $5 \\times q$. Now the engine of Book I — congruent triangles, areas on equal bases — converts each leg square into the rectangle beside it: the square on leg $a$ has the same area as the $5 \\times 1.8$ rectangle (both $9$), and the square on leg $b$ matches the $5 \\times 3.2$ rectangle (both $16$). The two rectangles tile the hypotenuse square exactly — it was built as a $5 \\times 5$ — so $9 + 16 = 25$. Notice, and this is the point of showing both proofs: the windmill\u2019s two rectangles measure $c \\times p$ and $c \\times q$, EXACTLY the two products the similarity proof computed as $a^2$ and $b^2$. Book I hides the altitude inside congruence juggling; Book VI drags it into the open, names it $H$, and lets similarity do in three ratios what the windmill does with a parallel line and a stack of congruent triangles. Same theorem, same split, two currencies.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The dissection industry, three cultures deep',
      text: 'The area proof has been reinvented with local style across the world. Euclid\u2019s windmill (Alexandria, c. $300$ BCE) does it with parallels and congruences. In China, the Zhou Bi Suan Jing (compiled around $100$ BCE, with commentary by Zhao Shuang, 3rd c. CE) carries the “hypotenuse diagram”: four copies of the right triangle arranged around a central square, an area count that yields $a^2 + b^2 = c^2$ in one figure — the same arrangement that, drawn as one big square of side $a + b$, gives the standard algebra proof $(a+b)^2 = 4 \\cdot \\tfrac{ab}{2} + c^2$. In India, Bhāskara II (12th century) is traditionally credited with a proof so short he is said to have written only “Behold!” under the figure — four triangles dropped inside the big square. Perigal\u2019s $1873$ dissection is a western cousin. The moral is not priority — it is that the theorem is an AREA fact at heart, and area counting finds it from every direction.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'What the picture suggests, and what a proof must do',
      text: 'Counting $9$, $16$ and $25$ unit squares on the $3$-$4$-$5$ drawing CONFIRMS the theorem; it does not prove it. A proof must cover every right triangle at once — the $5$-$12$-$13$ (where $25 + 144 = 169$), the $8$-$15$-$17$, and the triangle with legs $1$ and $\\sqrt{2}$, whose hypotenuse $\\sqrt{3}$ supports no grid of unit squares at all. The dissection and the windmill generalise (their steps never quote the side lengths); the spot-check does not. Exam writers know this, and an option that says “verified on the 3-4-5 triangle, hence true” is bait — one witness is a sanity check, all witnesses are a proof. The same discipline separates 4.1\u2019s honest families from coincidences like $P = A$ at $k = 2$.',
    },

    /* -------------------------------------------------------------- */
    /* 6. similar areas + the tree shadow                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Similar areas: Euclid VI.19, the duplicate ratio, and the tree shadow paid' },
    {
      kind: 'para',
      text: 'Lesson 4.1 installed the $k$, $k^2$ machine as a law with witnesses — perimeters scale by $k$, areas by $k^2$ — and promised that Book VI would ground it. The grounding is Euclid VI.19: SIMILAR TRIANGLES ARE TO ONE ANOTHER AS THE SQUARES ON THEIR CORRESPONDING SIDES. In the chapter\u2019s language: if the scale factor between similar figures is $k$ (stated with its direction), the ratio of their areas is $k^2$ — the duplicate ratio, the ratio applied to itself twice. Euclid\u2019s term deserves its plain reading: to DUPLICATE a ratio is to multiply it by itself, the way squaring multiplies a number by itself. The duplicate of $3 : 2$ is not $6 : 2$ and not $3 : 4$ — it is $9 : 4$, the ratio of the squares of the terms.',
    },
    {
      kind: 'derivation',
      title: 'Why areas ride k²: two clean routes and one honest sketch',
      statement: 'If one figure is the image of another under similarity with scale factor $k$ (original to image), then corresponding lengths are in ratio $k$ and the areas are in ratio $k^2$. Two routes prove it; Euclid\u2019s own route is sketched honestly alongside.',
      steps: [
        {
          label: 'Route one — the base-times-height count (from 4.1)',
          formula: 'A = \\tfrac{1}{2} b h \\;\\Rightarrow\\; A\u2032 = \\tfrac{1}{2} (kb)(kh) = k^2 A',
          explanation: 'A triangle\u2019s area multiplies two lengths, and each length carries one factor of $k$; the factors multiply. Any polygon subdivides into triangles whose areas add, and a sum of quantities each scaled by $k^2$ is scaled by $k^2$. Witness at $k = 3$ on the $3$-$4$-$5$: area $6 \\to \\tfrac{1}{2}(12)(9) = 54 = 9 \\times 6$, while the perimeter reads $12 \\to 36 = 3 \\times 12$ — the two dials, one knob.',
        },
        {
          label: 'Route two — the duplicate ratio (VI.19\u2019s claim)',
          formula: '\\frac{A\u2032}{A} = \\left(\\frac{s\u2032}{s}\\right)^2 = k^2',
          explanation: 'VI.19 states the area ratio as the duplicate of the side ratio: at $k = 3/2$ (small to large) the areas stand in $9/4$ — so an original of area $8$ maps to $8 \\times 9/4 = 18$, NOT to $8 \\times 3/2 = 12$. The perimeter, a length, would take the bare $k$; the area takes the square. Confusing the two dials is the single most-marked error on this topic.',
        },
        {
          label: 'Euclid\u2019s own machine, sketched honestly',
          formula: '3 : 2 = 2 : x \\Rightarrow x = \\tfrac{4}{3} \\;(\\text{the third proportional})',
          explanation: 'The Book VI proof builds a THIRD triangle in duplicate ratio: to the ratio $3 : 2$ it appends the third proportional $x$ with $3 : 2 = 2 : x$, so $x = 4/3$ and the duplicated ratio $9 : 4$ is assembled from the two steps $3 : 2$ and $2 : \\tfrac{4}{3}$... the chain closes because triangles between the same parallels share areas (the I.37 family, via VI.15\u2019s parallelogram version). The full chase is one lesson of machinery beyond this book\u2019s needs; what matters here is the CLAIM and its licence — the claim is the $k^2$ law, and the licence is Book VI, not folklore.',
        },
        {
          label: 'The in-figure witness — the split pieces',
          formula: '2.16 = 6 \\times \\tfrac{9}{25}, \\quad 3.84 = 6 \\times \\tfrac{16}{25}',
          explanation: 'The altitude split of Section 2 is VI.19 running inside ONE triangle: the piece at $k = 3/5$ (piece to whole) carries $(3/5)^2 = 9/25$ of the area ($2.16$ out of $6$), the piece at $k = 4/5$ carries $16/25$ ($3.84$), and $9/25 + 16/25 = 1$ — the pieces, like the segments, partition the whole. The lesson\u2019s two halves are one machine.',
        },
      ],
      result: 'Lengths scale by $k$, areas by $k^2$ — proved twice over and sketched in Euclid\u2019s own idiom: the duplicate ratio. At $k = 3/2$, think $9/4$; never half-apply the square.',
    },
    {
      kind: 'table',
      caption: 'The duplicate-ratio table — scale factor against area ratio, with the 3-4-5 witness row; every cell recomputed by the engine',
      head: ['k (original to image)', 'area ratio k²', '3-4-5 areas', 'perimeter dial'],
      rows: [
        ['$3/2$', '$9/4$', '$8 \\to 18$ (second witness)', '$\\times 3/2$'],
        ['$2$', '$4$', '$6 \\to 24$', '$12 \\to 24$'],
        ['$5/2$', '$25/4$', '$6 \\to 37.5$', '$\\times 5/2$'],
        ['$3$', '$9$', '$6 \\to 54$', '$12 \\to 36$'],
      ],
    },
    {
      kind: 'para',
      text: 'Now the application this book has owed since Lesson 4.1 told the story of Thales and the pyramid: measuring the unreachable by similar triangles. The licence is finally banked — AA is a theorem, not an assumption — so the tree-shadow measurement can be run as mathematics rather than folklore. A stick $1.5$ metres tall stands vertically and casts a $2$ metre shadow; at the same moment, a tree casts a $12$ metre shadow. The stick\u2019s height-triangle and the tree\u2019s height-triangle both stand perpendicular to the flat ground, and the sun\u2019s rays arrive parallel (they are effectively parallel because the sun is distant — the same idealisation every shadow argument makes, and worth naming when you make it). Right angle matches right angle, sun angle matches sun angle, so AA fires and the triangles are similar. The rest is bookkeeping with the direction discipline: read $k$ where both numbers are known — the shadows, $k = 12/2 = 6$ from stick-triangle to tree-triangle — and apply it where one number is wanted: the height is $1.5 \\times 6 = 9$ metres. Illustration 3 runs it clean.',
    },
    {
      kind: 'example',
      title: 'Illustration 3 — The tree shadow, cashed with AA',
      steps: [
        'Sol. State the licence first: stick and tree both meet the flat ground at right angles, and the sun\u2019s parallel rays give equal angles of elevation at the tops — two angle pairs match, so AA (Lesson 4.3) certifies the two shadow-triangles similar.',
        'Fix the correspondence: stick-height answers tree-height, stick-shadow answers tree-shadow (the right angles sit under the heights, the sun angles above them).',
        'Read $k$ on the shadows, where both lengths are known: $k = 12/2 = 6$, from stick-triangle to tree-triangle — direction stated before the number is used.',
        'Apply $k$ to the heights: the tree stands at $1.5 \\times 6 = 9$ metres.',
        'Cross-check by the direct proportion: $\\frac{1.5}{2} = \\frac{h}{12}$, so $h = \\frac{1.5 \\times 12}{2} = 9$ — the ratio route and the $k$ route agree, and the figure below draws the setup.',
      ],
      figures: [
        {
          caption: 'The tree-shadow figure for Illustration 3: the 1.5 m stick with its 2 m shadow and the tree with its 12 m shadow, sun rays drawn parallel, the two right triangles marked — AA licenses the similarity, k = 6 on the shadows, height = 1.5 × 6 = 9 m.',
          svg: geo44Shadow('A stick 1.5 metres tall with a 2 metre shadow beside a tree with a 12 metre shadow, parallel sun rays overhead, right angles marked at the bases, and the computation k equals 6 giving a tree height of 9 metres.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 7. the census + the special families                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census: primitive triples and the two special families' },
    {
      kind: 'para',
      text: 'Call three whole numbers a PYTHAGOREAN TRIPLE when $a^2 + b^2 = c^2$: $(3, 4, 5)$ is the smallest and the most famous, and it breeds — every multiple of a right triple is a right triple, because the equation survives the $k$-machine ($ka$)^2 + $(kb)^2 = k^2(a^2 + b^2) = (kc)^2$, the family law of Lesson 4.1 applied to the theorem itself. So $(6, 8, 10)$, $(9, 12, 15)$, $(60, 80, 100)$ are all triples, but they are the SAME triple in different sizes. The honest census counts PRIMITIVE triples — ones with $\\gcd(a, b, c) = 1$, wearing no common factor — and asks the natural bookkeeping question: how many primitive triples have hypotenuse at most $100$? The engine behind this lesson sieved every candidate pair; the answer is EXACTLY $16$, and Figure F4 plots them all on the $(a, b)$ grid, bounded by the faint arc where the hypotenuse hits $100$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the primitive-triple census. The 16 primitive triples with hypotenuse ≤ 100 plotted on the (a, b) grid — shorter leg horizontally, longer leg vertically — under the dashed hyp = 100 boundary arc. The 3-4-5 sits highlighted at the origin corner; the pinned pair 20, 21, 29 (nearly isosceles) and 9, 40, 41 (long and thin) are labelled in rose.',
      svg: geo44Census('A scatter plot of sixteen points on a grid of shorter leg against longer leg up to 100, with a dashed quarter-circle arc marking hypotenuse 100, the point 3, 4, 5 highlighted, and the points 20, 21, 29 and 9, 40, 41 labelled.'),
    },
    {
      kind: 'para',
      text: 'How were all $16$ found — and how do we know there are no others? By a factory older than the theorem\u2019s name: choose whole numbers $m > n > 0$ with $\\gcd(m, n) = 1$ and $m - n$ odd, and the recipe $\\;m^2 - n^2,\\; 2mn,\\; m^2 + n^2\\;$ produces a right triple, because $(m^2 - n^2)^2 + (2mn)^2 = m^4 + 2m^2n^2 + n^4 = (m^2 + n^2)^2$ — expand it and watch the cross terms cancel. Euclid states the generation as a lemma towards Book X; the conditions on $m$ and $n$ are exactly what makes the output primitive and prevents repeats. The engine ran the factory for every legal pair with $m^2 + n^2 \\le 100$ and the $16$ rows below fell out in order — each one re-verified for rightness and primitivity before the table was allowed to stand.',
    },
    {
      kind: 'table',
      caption: 'The primitive-triple census with hypotenuse ≤ 100 — exactly 16 rows, each generated by Euclid\u2019s factory (m, n) and re-verified by the engine: right (a² + b² = c²) and primitive (gcd = 1)',
      head: ['triple $(a, b, c)$', '$a^2 + b^2$', '$c^2$', 'factory $(m, n)$'],
      rows: [
        ['$3, 4, 5$', '$9 + 16 = 25$', '$25$', '$(2, 1)$'],
        ['$5, 12, 13$', '$25 + 144 = 169$', '$169$', '$(3, 2)$'],
        ['$8, 15, 17$', '$64 + 225 = 289$', '$289$', '$(4, 1)$'],
        ['$7, 24, 25$', '$49 + 576 = 625$', '$625$', '$(4, 3)$'],
        ['$20, 21, 29$', '$400 + 441 = 841$', '$841$', '$(5, 2)$'],
        ['$12, 35, 37$', '$144 + 1225 = 1369$', '$1369$', '$(6, 1)$'],
        ['$9, 40, 41$', '$81 + 1600 = 1681$', '$1681$', '$(5, 4)$'],
        ['$28, 45, 53$', '$784 + 2025 = 2809$', '$2809$', '$(7, 2)$'],
        ['$11, 60, 61$', '$121 + 3600 = 3721$', '$3721$', '$(6, 5)$'],
        ['$16, 63, 65$', '$256 + 3969 = 4225$', '$4225$', '$(8, 1)$'],
        ['$33, 56, 65$', '$1089 + 3136 = 4225$', '$4225$', '$(7, 4)$'],
        ['$48, 55, 73$', '$2304 + 3025 = 5329$', '$5329$', '$(8, 3)$'],
        ['$13, 84, 85$', '$169 + 7056 = 7225$', '$7225$', '$(7, 6)$'],
        ['$36, 77, 85$', '$1296 + 5929 = 7225$', '$7225$', '$(9, 2)$'],
        ['$39, 80, 89$', '$1521 + 6400 = 7921$', '$7921$', '$(8, 5)$'],
        ['$65, 72, 97$', '$4225 + 5184 = 9409$', '$9409$', '$(9, 4)$'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the census like an auditor, because the readings teach more than the count. The pinned pair: $(20, 21, 29)$ is NEARLY ISOSCELES — its legs differ by $1$, the family trait it shares with $(3, 4, 5)$ — while $(9, 40, 41)$ is long and thin, one leg more than four times the other; the factory makes both kinds without preference. Two hypotenuses repeat: $65$ carries both $(16, 63, 65)$ and $(33, 56, 65)$, and $85$ carries both $(13, 84, 85)$ and $(36, 77, 85)$ — a number can be a hypotenuse twice but (a fact worth a pause) never just once unless it is itself... in fact $25$ appears only inside the non-primitive $(7, 24, 25)$? No: $25$ is primitive there, and $(15, 20, 25)$ is its non-primitive cousin — the census keeps only the first kind. The thinning at the top is real: only $4$ of the $16$ carry hypotenuse $85$ or more. And the standing contrast: the $3$-$4$-$5$ MULTIPLE family alone contributes $20$ members with hypotenuse at most $100$ — $k = 1$ through $20$ — so one non-primitive family outnumbers all sixteen primitives put together. Triples are mostly echoes; the primitives are the voices.',
    },
    {
      kind: 'para',
      text: 'Two shapes are conspicuously absent from the census, and their absence is a theorem. The $45$-$45$-$90$ family — every isosceles right triangle, all of them similar to one another by AA (a right angle and a $45^\\circ$ force the third angle) — runs sides $1 : 1 : \\sqrt{2}$, and the $30$-$60$-$90$ family — the half-equilateral, reached by dropping the altitude of an equilateral triangle, the $k = 1/2$ split of Lesson 4.2 — runs $1 : \\sqrt{3} : 2$. These are SIMILARITY FAMILIES in the purest sense: fix the angles and the shape is fixed, so one ratio serves every member — legs $7$ give hypotenuse $7\\sqrt{2} \\approx 9.8995$; shortest side $5$ gives $5\\sqrt{3} \\approx 8.6603$ and hypotenuse $10$. But neither family contains a single whole-number member: an integer isosceles right triangle would need $2k^2$ to be a perfect square (the engine checked every $k$ up to a thousand — never), and an integer $30$-$60$-$90$ would need the same for $3k^2$. $\\sqrt{2} \\approx 1.4142136$ and $\\sqrt{3} \\approx 1.7320508$ are irrational, and that is precisely why the census, which counts WHOLE numbers, never sees either special family. The two most useful right triangles in practice are exactly the two that refuse whole-number sides.',
    },

    /* -------------------------------------------------------------- */
    /* 8. the converse                                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The converse: earning the right angle back' },
    {
      kind: 'para',
      text: 'The theorem, as proved, runs one way: RIGHT ANGLE $\\to$ EQUATION. Most real questions run the other way: you hold three lengths and want to know about the angle. The CONVERSE of Pythagoras\u2019 theorem says: if a triangle has $a^2 + b^2 = c^2$ with $c$ the longest side, then the angle opposite $c$ is a right angle. A converse is a NEW statement — the converse of a true theorem can be false (every prime is odd... is famously false the other way) — so it needs its own proof, and Euclid gives one: Book I ends with the pair, Proposition 47 the theorem, Proposition 48 the converse. The proof is short and pleasing, because the theorem just earned does the heavy lifting.',
    },
    {
      kind: 'derivation',
      title: 'The converse proved (Euclid I.48)',
      statement: 'If a triangle has sides $a$, $b$, $c$ with $c$ the longest and $a^2 + b^2 = c^2$, then the angle opposite $c$ is a right angle.',
      steps: [
        {
          label: 'Construct a right triangle on the same legs',
          formula: '\\text{draw } \\triangle \\text{ with legs } a, b \\text{ and a right angle between them}',
          explanation: 'Nothing stops us DRAWING a right angle and laying off the two given legs along its arms — construction is free. This fresh triangle is right-angled by design, not by assumption about the given one.',
        },
        {
          label: 'Its hypotenuse is exactly c',
          formula: '\\text{hyp}^2 = a^2 + b^2 = c^2 \\;\\Rightarrow\\; \\text{hyp} = c',
          explanation: 'By the THEOREM — earned two sections ago — the constructed triangle\u2019s hypotenuse squares to $a^2 + b^2$, and the hypothesis says that is $c^2$. Lengths are positive, so the hypotenuse IS $c$.',
        },
        {
          label: 'SSS matches the two triangles',
          formula: 'a, b, c \\;\\text{in both} \\;\\Rightarrow\\; \\text{congruent (SSS)}',
          explanation: 'The given triangle and the constructed one now share all three side lengths, and SSS — Chapter 3\u2019s criterion — certifies congruence: some rigid motion carries one onto the other, angles included.',
        },
        {
          label: 'The right angle rides along',
          formula: '\\angle_{\\text{opposite } c} = \\text{the constructed right angle} = 90^\\circ',
          explanation: 'Congruence matches the angle opposite $c$ in the given triangle with the designed right angle in the constructed one. Hence the given triangle is right-angled — the converse, proved by making the theorem certify its own reflection.',
        },
      ],
      result: 'Sides in, angle out: $a^2 + b^2 = c^2$ with $c$ longest forces the angle opposite $c$ to be right — the carpenter\u2019s licence.',
    },
    {
      kind: 'para',
      text: 'The test itself is one line of arithmetic per candidate: square the two shorter sides, add, compare with the square of the longest. The witness pair to carry in your head: $(8, 15, 17)$ fires — $64 + 225 = 289 = 17^2$, so the corner between the $8$ and $15$ sides is square — and $(4, 5, 7)$ refuses — $16 + 25 = 41 \\ne 49 = 7^2$, and the triangle still exists ($4 + 5 > 7$; the triangle inequality is a different law about a different question) but its widest corner bulges to about $101.5^\\circ$, past right. A third read shows the family inheritance: $(9, 12, 15)$ fires at $81 + 144 = 225 = 15^2$, being the $3$-$4$-$5$ at $k = 3$ — the converse, like the theorem, survives scaling.',
    },
    {
      kind: 'table',
      caption: 'The converse table — three verdicts, one line of arithmetic each; every cell recomputed by the engine',
      head: ['sides', '$a^2 + b^2$', '$c^2$', 'verdict'],
      rows: [
        ['$8, 15, 17$', '$64 + 225 = 289$', '$289$', 'right — the converse fires'],
        ['$4, 5, 7$', '$16 + 25 = 41$', '$49$', 'NOT right — $41 \\ne 49$'],
        ['$9, 12, 15$', '$81 + 144 = 225$', '$225$', 'right — the $3$-$4$-$5$ at $k = 3$'],
      ],
    },
    {
      kind: 'example',
      title: 'Illustration 4 — Testing triples with the converse',
      steps: [
        'Sol. Test $(8, 15, 17)$: the two shorter sides are $8$ and $15$, so compute $8^2 + 15^2 = 64 + 225 = 289$; the longest side squares to $17^2 = 289$. Equal — the converse fires, and the angle opposite $17$ is right.',
        'Test $(4, 5, 7)$: $4^2 + 5^2 = 16 + 25 = 41$ against $7^2 = 49$. NOT equal — the converse refuses; the triangle exists but its widest angle runs about $101.5^\\circ$, bulging past right.',
        'Test $(9, 12, 15)$: $9^2 + 12^2 = 81 + 144 = 225 = 15^2$. Equal — right; and no mystery, since $9$-$12$-$15$ is the $3$-$4$-$5$ scaled by $k = 3$ and the equation survives scaling.',
        'Note the discipline used three times: the LONGEST side plays $c$; the test is exact equality (a near miss is a miss); and no right angle was assumed anywhere — the sides came first.',
        'Hence $(8, 15, 17)$ right, $(4, 5, 7)$ not right, $(9, 12, 15)$ right — three verdicts, one line of arithmetic each.',
      ],
    },
    {
      kind: 'para',
      text: 'Why the converse matters commercially: because the direction of a licence determines what you can DO with it. A builder squaring a room marks $3$ units along one wall and $4$ along the other, then adjusts the far corner until a tape stretched diagonally reads exactly $5$. The builder does not know the corner is right — that is what she is trying to ACHIEVE — she knows the three numbers, and the converse converts them into the certified angle: $9 + 16 = 25$, so the corner between the $3$ and the $4$ is square. Egyptian rope-stretchers knotted this check into twelve-looped cords a thousand years before Euclid; modern framers run the same arithmetic with $6$-$8$-$10$ for longer walls (bigger numbers, smaller relative error, same licence). Without the converse, the $3$-$4$-$5$ ritual would be a superstition that only ever CONFIRMED squareness it had already been given, never created it.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'EXAM: which direction does the licence run?',
      text: 'Given a right angle and two sides, find the third: the THEOREM. Given three sides and asked about the angle: the CONVERSE. The three standing traps: (i) “$41$ is close to $49$, so nearly right” — the test is exact equality, and a near miss is a miss ($4$, $5$, $7$ is NOT right); (ii) testing with the wrong side as $c$ — always square the two SHORTER sides and compare against the LONGEST ($7$ is the candidate in $4$, $5$, $7$; using $7^2 + 5^2$ against $4^2$ is meaningless); (iii) crediting the theorem for the carpenter\u2019s check — the builder runs sides $\\to$ angle, and only the converse (Euclid I.48) licenses that arrow. Carry the witness pair: $8, 15, 17$ fires ($64 + 225 = 289 = 17^2$), $4, 5, 7$ refuses ($41 \\ne 49$).',
    },
    {
      kind: 'para',
      text: 'Close the ledger, because this was the chapter\u2019s cash-out and the accounts should read clean. Lesson 4.1 defined similarity and its $k$, $k^2$ machine; 4.2 proved Thales\u2019 Basic Proportionality Theorem; 4.3 earned the criteria, AA above all. This lesson spent the lot: the altitude split licensed by AA became Euclid VI.8\u2019s three geometric means, the means became the proof of Pythagoras (VI.31), the squares picture and the windmill (I.47) confirmed the theorem is an area fact at heart, VI.19 grounded the $k^2$ law as the duplicate ratio, the tree shadow was paid in full with AA, the triple census counted exactly $16$ primitives under hypotenuse $100$, and the converse earned the right angle back from the sides. The formula you carried on trust since Foundation Mathematics — $a^2 + b^2 = c^2$ — is now property: proved, twice, from ground you walked yourself. That is what a chapter of similarity was for; that is what it means for a theorem to be earned.',
    },

    /* -------------------------------------------------------------- */
    /* 9. revision: terms + formula cards                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Key terms and formulas of Lesson 4.4' },
    {
      kind: 'terms',
      items: [
        { term: 'Pythagoras\u2019 theorem', def: 'In every right triangle, the square on the hypotenuse equals the sum of the squares on the legs: $a^2 + b^2 = c^2$. Proved in this lesson twice — by similarity (Euclid VI.31) and by areas (I.47) — after years of use on trust.' },
        { term: 'altitude on the hypotenuse', def: 'The perpendicular dropped from the right-angle vertex to the hypotenuse. Its foot splits the hypotenuse into segments $p$ and $q$, and the drop creates two triangles EACH similar to the original — the construction behind the similarity proof.' },
        { term: 'geometric mean (mean proportional)', def: 'Of two positive numbers $x$ and $y$: the number $m = \\sqrt{xy}$, the middle of the proportion $x : m = m : y$. In the right triangle each leg is the geometric mean of the hypotenuse and its adjacent segment, and the altitude is the geometric mean of the two segments.' },
        { term: 'Euclid VI.8', def: 'The leg law: in a right triangle, the square on a leg equals the rectangle contained by the hypotenuse and the segment adjacent to that leg — $a^2 = cp$ and $b^2 = cq$ — read straight off the altitude split by similarity.' },
        { term: 'Pythagorean triple', def: 'Three whole numbers with $a^2 + b^2 = c^2$: $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$. Every multiple of a triple is a triple — the equation survives the $k$-machine.' },
        { term: 'primitive triple', def: 'A triple with $\\gcd(a, b, c) = 1$. With hypotenuse at most $100$ there are EXACTLY $16$, from $(3, 4, 5)$ to $(65, 72, 97)$ — the engine\u2019s census.' },
        { term: 'special right triangles', def: 'The two angle-fixed similarity families: $45$-$45$-$90$ with sides $1 : 1 : \\sqrt{2}$ and $30$-$60$-$90$ with sides $1 : \\sqrt{3} : 2$. Every member is similar to every other; NEITHER family contains an integer triple.' },
        { term: 'converse of Pythagoras\u2019 theorem', def: 'If $a^2 + b^2 = c^2$ with $c$ the longest side, then the angle opposite $c$ is right (Euclid I.48). The licence behind the carpenter\u2019s $3$-$4$-$5$ check: sides in, angle out.' },
        { term: 'duplicate ratio (Euclid VI.19)', def: 'A ratio multiplied by itself: the duplicate of $3 : 2$ is $9 : 4$. VI.19: similar triangles stand to one another as the squares on corresponding sides — the licence for the $k^2$ area law.' },
        { term: 'windmill figure', def: 'Euclid I.47\u2019s diagram: squares on all three sides, one auxiliary parallel through the right-angle vertex; the leg squares convert into the rectangles $c \\times p$ and $c \\times q$, which tile the hypotenuse square.' },
      ],
    },
    {
      kind: 'formula',
      name: 'Pythagoras\u2019 theorem',
      latex: 'a^2 + b^2 = c^2',
      note: '$c$ is the side opposite the right angle. Earned by similarity (VI.31) and by areas (I.47) in this lesson.',
    },
    {
      kind: 'formula',
      name: 'The leg law (Euclid VI.8)',
      latex: 'a^2 = c \\cdot p, \\quad b^2 = c \\cdot q',
      note: 'each leg is the geometric mean of the hypotenuse $c$ and the segment adjacent to that leg ($p$ beside $a$, $q$ beside $b$).',
    },
    {
      kind: 'formula',
      name: 'The altitude law',
      latex: 'h^2 = p \\cdot q, \\quad h = \\frac{ab}{c}',
      note: 'the altitude to the hypotenuse is the geometric mean of the two segments; its length is the product of the legs over the hypotenuse.',
    },
    {
      kind: 'formula',
      name: 'The converse test',
      latex: 'a^2 + b^2 = c^2 \\iff \\text{the angle opposite } c \\text{ is right}',
      note: 'with $c$ the longest side; Euclid I.48 licenses the direction sides $\\to$ angle — the carpenter\u2019s $3$-$4$-$5$ check.',
    },
    {
      kind: 'formula',
      name: 'The special right triangles',
      latex: '45\\text{-}45\\text{-}90: \\; 1 : 1 : \\sqrt{2}; \\quad 30\\text{-}60\\text{-}90: \\; 1 : \\sqrt{3} : 2',
      note: 'similarity families — one ratio serves every member; $\\sqrt{2} \\approx 1.4142136$ and $\\sqrt{3} \\approx 1.7320508$.',
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz (key [3,0,4,2,1] — PINNED)                            */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'When the altitude is dropped from the right angle to the hypotenuse of a right triangle, the two resulting pieces are —',
          options: [
            'congruent to each other, since each contains a right angle',
            'similar to each other but NOT similar to the original triangle',
            'always isosceles, since the altitude bisects the hypotenuse',
            'each similar to the original triangle — and hence to each other — by AA: the three-triangle split',
          ],
          answer: 3,
          explain: 'AA fires twice: the upper piece shares $\\angle A$ with the whole and matches the right angle ($H$ answering $C$); the lower piece does the same with $\\angle B$; transitivity then links the pieces to each other. Option (a) confuses “both right-angled” with congruent — on the witness split the pieces measure $1.8$-$2.4$-$3.0$ and $2.4$-$3.2$-$4.0$, different sizes. Option (b) denies transitivity: each piece similar to the whole forces the pieces similar to each other. Option (c): the altitude bisects the hypotenuse only in the isosceles case ($p = q = 2.5$ when the legs match); on the $3$-$4$-$5$ the segments read $1.8$ and $3.2$.',
        },
        {
          q: 'In the $3$-$4$-$5$ right triangle with the altitude dropped to the hypotenuse, the segment adjacent to the leg $3$ measures —',
          options: [
            '$1.8$, since the leg law reads $3^2 = 9 = 5 \\times 1.8$',
            '$3.2$, since the longer segment answers the shorter leg',
            '$2.4$, since the segment equals the altitude',
            '$5$, since the segment spans the hypotenuse',
          ],
          answer: 0,
          explain: 'The segment adjacent to a leg is the one its leg law multiplies: $3^2 = 9 = 5 \\times 1.8$, so $p = 9/5 = 1.8$. Option (b) quotes the OTHER segment — $3.2$ belongs to the leg $4$, since $16 = 5 \\times 3.2$. Option (c) quotes the ALTITUDE, $h = 12/5 = 2.4$ — the geometric mean of the two segments, a different object in the same figure. Option (d) is the whole hypotenuse: the segments are $1.8$ and $3.2$, and they sum to $5$.',
        },
        {
          q: 'Two similar figures have scale factor $k = 3/2$ (small to large). By Euclid VI.19 their areas stand in the ratio —',
          options: [
            '$3 : 2$, since area is a length-like quantity',
            '$9 : 2$, since the square applies to the larger side only',
            '$3 : 4$, since the small side is the one that squares',
            '$27 : 8$, since the factor must be cubed',
            'the duplicate ratio $9/4 = 2.25$ — the square of the scale factor',
          ],
          answer: 4,
          explain: 'VI.19: similar figures stand to one another as the squares on corresponding sides — the duplicate ratio, the scale factor applied twice: $(3/2)^2 = 9/4$. Option (a) is the perimeter dial: lengths do ride the bare $k$, but area is a product of two lengths. Option (b) squares one term and not the other — ratios square whole. Option (c) squares the wrong term and flips the direction. Option (d) cubes the factor, which is the volume law for similar solids, one dimension up. Witness: an original of area $8$ maps to $8 \\times 9/4 = 18$, not $12$.',
        },
        {
          q: 'A triangle has sides $4$, $5$, $7$. Is it right-angled?',
          options: [
            'yes — the triangle inequality holds ($4 + 5 > 7$), and existence forces the right angle',
            'yes — $16 + 25 = 41$, and $41$ is close to $49$',
            'no — $4^2 + 5^2 = 16 + 25 = 41 \\ne 49 = 7^2$, so the converse refuses',
            'impossible to tell without drawing the triangle and measuring the angle',
          ],
          answer: 2,
          explain: 'Test with the longest side as $c$: $4^2 + 5^2 = 41$ against $7^2 = 49$ — unequal, so no right angle; in fact the corner between the $4$ and $5$ sides bulges to about $101.5^\\circ$, past right. Option (a) confuses EXISTENCE (the triangle inequality) with SHAPE (the converse test) — the $4$-$5$-$7$ exists and is simply not right. Option (b) is the “close enough” trap: the converse is an exact equality test, and $41 \\ne 49$ by eight. Option (d): the three sides already determine the angles (SSS, Chapter 3); the arithmetic IS the measurement.',
        },
        {
          q: 'A carpenter squares a corner by marking $3$ and $4$ along two walls and adjusting until the diagonal reads $5$. The inference “the corner is square” is licensed by —',
          options: [
            'Pythagoras\u2019 theorem itself, since a right triangle with legs $3$ and $4$ has hypotenuse $5$',
            'the converse of Pythagoras: $3^2 + 4^2 = 9 + 16 = 25 = 5^2$ forces the angle opposite the $5$ to be right',
            'the primitivity of the triple $3$-$4$-$5$, since $\\gcd(3, 4, 5) = 1$',
            'similarity, since the $3$-$4$-$5$ corner is similar to every right angle',
          ],
          answer: 1,
          explain: 'The builder HOLDS the three lengths and WANTS the angle: the inference runs sides $\\to$ angle, which is exactly the converse (Euclid I.48) — since $9 + 16 = 25$, the angle opposite the $5$ must be right. Option (a) runs the wrong direction: the theorem certifies the hypotenuse of an ALREADY right triangle and cannot create the right angle the builder is trying to achieve. Option (c) is true but irrelevant — primitivity is a whole-number family fact, not an angle licence. Option (d) is decoration: no similarity statement is invoked, and an angle is equal or not — “similar” is for figures.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the theorem, earned and applied',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Drop the altitude from the right angle to the hypotenuse of the $3$-$4$-$5$ right triangle. Compute both segments (naming which is adjacent to which leg), the altitude, and verify $h^2 = pq$.',
              solution: [
                'Sol. The segment adjacent to the leg $3$: $p = a^2/c = 9/5 = 1.8$; the segment adjacent to the leg $4$: $q = b^2/c = 16/5 = 3.2$.',
                'Partition check: $p + q = 1.8 + 3.2 = 5 = c$ — the segments rejoin the hypotenuse.',
                'The altitude by area both ways: $\\frac{1}{2} \\times 3 \\times 4 = 6 = \\frac{1}{2} \\times 5 \\times h$, so $h = 12/5 = 2.4$.',
                'Verify the altitude law: $h^2 = 2.4^2 = 5.76$ and $pq = 1.8 \\times 3.2 = 5.76$ — equal, so $h^2 = pq$ holds.',
                'Hence $p = 1.8$ (adjacent to $3$), $q = 3.2$ (adjacent to $4$), $h = 2.4$, with $h^2 = pq = 5.76$.',
              ],
              answer: '$p = 1.8$ (adjacent to the leg $3$), $q = 3.2$ (adjacent to the leg $4$), $h = 2.4$; $h^2 = pq = 5.76$',
            },
            {
              q: 'Squares are erected on all three sides of the $6$-$8$-$10$ right triangle. Find the three areas and state the relation the theorem guarantees.',
              solution: [
                'Sol. The squares on the legs: $6^2 = 36$ and $8^2 = 64$; the square on the hypotenuse: $10^2 = 100$.',
                'The theorem\u2019s claim: the two leg squares hold together exactly the area of the hypotenuse square.',
                'Check: $36 + 64 = 100$ — exact, no remainder.',
                'Note this is the $3$-$4$-$5$ at $k = 2$: the areas $9$, $16$, $25$ each scaled by $k^2 = 4$, and the equality survives scaling.',
                'Hence the areas are $36$, $64$ and $100$, with $36 + 64 = 100$.',
              ],
              answer: 'areas $36$, $64$, $100$; $36 + 64 = 100$',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Compute the geometric mean of each pair, and state the mean-proportional form $x : m = m : y$ for each: (a) $1.8$ and $3.2$; (b) $5$ and $45$; (c) $4$ and $16$.',
              solution: [
                'Sol. (a) $\\sqrt{1.8 \\times 3.2} = \\sqrt{5.76} = 2.4$ — the proportion $1.8 : 2.4 = 2.4 : 3.2$ (both ratios $0.75$).',
                '(b) $\\sqrt{5 \\times 45} = \\sqrt{225} = 15$ — the proportion $5 : 15 = 15 : 45$ (both ratios $1/3$).',
                '(c) $\\sqrt{4 \\times 16} = \\sqrt{64} = 8$ — the proportion $4 : 8 = 8 : 16$ (both ratios $0.5$).',
                'Contrast the arithmetic mean: for $1.8$ and $3.2$ it reads $2.5$, not $2.4$ — a different dial with different theorems attached.',
                'Hence the geometric means are $2.4$, $15$ and $8$.',
              ],
              answer: '(a) $2.4$; (b) $15$; (c) $8$',
            },
            {
              q: 'A fence post $1.2$ m tall casts a $1.6$ m shadow while a nearby poplar casts a $20$ m shadow. Name the licence, state $k$ with its direction, and find the height of the poplar.',
              solution: [
                'Sol. Licence: both objects stand at right angles to the flat ground and the sun\u2019s rays arrive parallel, so the two shadow-triangles match in two angles — AA (Lesson 4.3) certifies them similar.',
                'Correspondence: post-height answers poplar-height, post-shadow answers poplar-shadow.',
                'Read $k$ on the shadows, where both numbers are known: $k = 20/1.6 = 12.5$, from post-triangle to poplar-triangle.',
                'Apply to the heights: $1.2 \\times 12.5 = 15$ — the poplar stands $15$ m tall.',
                'Cross-check by the direct proportion: $\\frac{1.2}{1.6} = \\frac{h}{20}$, so $h = \\frac{1.2 \\times 20}{1.6} = 15$ — the two routes agree.',
                'Hence the poplar is $15$ m tall (licence AA; $k = 12.5$, post to poplar).',
              ],
              answer: 'the poplar is $15$ m tall (licence AA; $k = 12.5$ post-to-poplar on the shadows)',
            },
            {
              q: 'A right triangle has hypotenuse $10$; the altitude splits it into segments $6.4$ and $3.6$. Use Euclid VI.8 to rebuild both legs, and name the triangle.',
              solution: [
                'Sol. VI.8: each leg is the geometric mean of the hypotenuse and its adjacent segment — the leg squared equals $c$ times its segment.',
                'The leg adjacent to $6.4$: $\\sqrt{10 \\times 6.4} = \\sqrt{64} = 8$.',
                'The leg adjacent to $3.6$: $\\sqrt{10 \\times 3.6} = \\sqrt{36} = 6$.',
                'Audit: the partition $6.4 + 3.6 = 10 = c$ holds, and the rebuilt triangle checks against the theorem: $6^2 + 8^2 = 36 + 64 = 100 = 10^2$.',
                'Hence the legs are $8$ and $6$ — the $6$-$8$-$10$, a $3$-$4$-$5$ at $k = 2$, rebuilt from its own split; the figure draws the rebuild.',
              ],
              answer: 'legs $8$ and $6$ — the $6$-$8$-$10$',
              figures: [
                {
                  caption: 'The rebuild from the split for Exercise 5: the hypotenuse 10 split into segments 6.4 and 3.6, each leg rebuilt as a geometric mean — √(10 × 6.4) = 8 and √(10 × 3.6) = 6 — the 6-8-10 reassembled from its own pieces.',
                  svg: geo44Rebuild('A hypotenuse bar of length 10 split into segments 6.4 and 3.6, with arrows up from each segment to the rebuilt legs 8 and 6 computed as geometric means.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Run the full altitude machine on the $5$-$12$-$13$ triangle: compute $p$, $q$ and $h$ (exact fractions and $4$-decimal decimals), and verify $h^2 = pq$ and both leg laws.',
              solution: [
                'Sol. Segments: $p = 5^2/13 = 25/13 \\approx 1.9231$ (adjacent to the leg $5$) and $q = 12^2/13 = 144/13 \\approx 11.0769$ (adjacent to the leg $12$).',
                'Partition: $25/13 + 144/13 = 169/13 = 13$ — the segments rejoin the hypotenuse.',
                'Altitude by area both ways: $\\frac{1}{2} \\times 5 \\times 12 = 30 = \\frac{1}{2} \\times 13 \\times h$, so $h = 60/13 \\approx 4.6154$.',
                'Altitude law: $h^2 = (60/13)^2 = 3600/169 \\approx 21.3018$ and $pq = \\frac{25}{13} \\times \\frac{144}{13} = \\frac{3600}{169} \\approx 21.3018$ — equal.',
                'Leg laws: $5^2 = 25 = 13 \\times \\frac{25}{13}$ and $12^2 = 144 = 13 \\times \\frac{144}{13}$ — both exact.',
                'Hence $p = 25/13 \\approx 1.9231$, $q = 144/13 \\approx 11.0769$, $h = 60/13 \\approx 4.6154$, with $h^2 = pq = 3600/169 \\approx 21.3018$.',
              ],
              answer: '$p = 25/13 \\approx 1.9231$, $q = 144/13 \\approx 11.0769$, $h = 60/13 \\approx 4.6154$; $h^2 = pq = 3600/169 \\approx 21.3018$',
            },
            {
              q: '(a) A triangle of area $6$ is enlarged by $k = 3$ (original to image): find the new area. (b) The $3$-$4$-$5$ and its $k = 3$ image: find both perimeters. (c) Two similar figures at $k = 3/2$: give the area ratio (naming the Euclid licence) and the image area if the original is $8$.',
              solution: [
                'Sol. (a) Areas ride $k^2$: the image area is $6 \\times 9 = 54$.',
                '(b) Perimeters ride the bare $k$: the $3$-$4$-$5$ perimeter is $12$, so the image reads $12 \\times 3 = 36$.',
                '(c) The licence is Euclid VI.19, the duplicate ratio: the area ratio is $(3/2)^2 = 9/4$.',
                'The image area: $8 \\times 9/4 = 18$ — not the $12$ that the bare $k$ would give; that $12$ is the perimeter-style dial.',
                'Hence (a) $54$; (b) $12 \\to 36$; (c) ratio $9/4$ by VI.19, image area $18$.',
              ],
              answer: '(a) $54$; (b) $12 \\to 36$; (c) ratio $9/4$ (VI.19), image area $18$',
            },
            {
              q: 'The special families. (a) A $45$-$45$-$90$ triangle has legs $7$: find the hypotenuse, exact and to $4$ decimals. (b) A $30$-$60$-$90$ triangle has shortest side $5$: find the other two sides, exact and to $4$ decimals.',
              solution: [
                'Sol. (a) The family ratio is $1 : 1 : \\sqrt{2}$, so the hypotenuse is $7\\sqrt{2}$.',
                'Decimal: $\\sqrt{2} \\approx 1.4142136$, so $7\\sqrt{2} \\approx 9.8995$ (4 dp).',
                '(b) The family ratio is $1 : \\sqrt{3} : 2$: the long leg is $5\\sqrt{3}$ and the hypotenuse is $2 \\times 5 = 10$.',
                'Decimal: $\\sqrt{3} \\approx 1.7320508$, so $5\\sqrt{3} \\approx 8.6603$ (4 dp).',
                'Audit both by the theorem: $7^2 + 7^2 = 98 = (7\\sqrt{2})^2$ and $5^2 + (5\\sqrt{3})^2 = 25 + 75 = 100 = 10^2$.',
                'Hence (a) $7\\sqrt{2} \\approx 9.8995$; (b) $5\\sqrt{3} \\approx 8.6603$ and $10$; the figure draws both families.',
              ],
              answer: '(a) $7\\sqrt{2} \\approx 9.8995$; (b) $5\\sqrt{3} \\approx 8.6603$ and $10$',
              figures: [
                {
                  caption: 'The special families for Exercise 8: the 45-45-90 with sides 1 : 1 : √2 (√2 ≈ 1.4142136) and the 30-60-90 with sides 1 : √3 : 2 (√3 ≈ 1.7320508), angles marked — one shape per family, every member similar to every other.',
                  svg: geo44Specials('A 45-45-90 triangle labelled 1, 1, square root of 2 beside a 30-60-90 triangle labelled 1, square root of 3, 2, with the 45, 30 and 60 degree angles marked and the decimal values of the two square roots.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The proof ladder, numerically. For the $3$-$4$-$5$ split, verify $3^2 = 5 \\times 1.8$ and $4^2 = 5 \\times 3.2$; then add and use the partition to conclude $5^2 = 5 \\times 5$. Which general law does the arithmetic rehearse?',
              solution: [
                'Sol. First rung: $3^2 = 9$ and $5 \\times 1.8 = 9$ — the leg-$3$ law $a^2 = cp$ holds.',
                'Second rung: $4^2 = 16$ and $5 \\times 3.2 = 16$ — the leg-$4$ law $b^2 = cq$ holds.',
                'Add the rungs: $9 + 16 = 5 \\times 1.8 + 5 \\times 3.2 = 5 \\times (1.8 + 3.2)$.',
                'Close with the partition: $1.8 + 3.2 = 5$, so the sum is $5 \\times 5 = 25 = 5^2$.',
                'The arithmetic rehearses Euclid VI.31, the proof by similarity: $a^2 + b^2 = c(p + q) = c^2$ — two leg laws, one addition, one partition.',
                'Hence $3^2 = 5 \\times 1.8$, $4^2 = 5 \\times 3.2$, and $9 + 16 = 25 = 5 \\times 5$, rehearsing $a^2 + b^2 = c(p + q) = c^2$.',
              ],
              answer: '$3^2 = 5 \\times 1.8$; $4^2 = 5 \\times 3.2$; $9 + 16 = 25 = 5 \\times 5$ — the law $a^2 + b^2 = c(p + q) = c^2$ (Euclid VI.31)',
            },
            {
              q: 'Converse tests. Use the converse to verdict each triple, showing the arithmetic: (a) $8$, $15$, $17$; (b) $4$, $5$, $7$; (c) $9$, $12$, $15$.',
              solution: [
                'Sol. (a) $8^2 + 15^2 = 64 + 225 = 289$ and $17^2 = 289$ — equal, so the angle opposite $17$ is right: the converse fires.',
                '(b) $4^2 + 5^2 = 16 + 25 = 41$ and $7^2 = 49$ — $41 \\ne 49$, so NOT right: the converse refuses (the corner bulges).',
                '(c) $9^2 + 12^2 = 81 + 144 = 225$ and $15^2 = 225$ — equal, so right; no surprise, it is the $3$-$4$-$5$ at $k = 3$, and the equation survives scaling.',
                'Note the discipline used three times: the LONGEST side plays $c$, the test is exact equality (a near miss is a miss), and no right angle was assumed anywhere.',
                'Hence (a) right ($289 = 289$); (b) NOT right ($41 \\ne 49$); (c) right ($225 = 225$); the figure draws the two contrasting witnesses.',
              ],
              answer: '(a) right, $289 = 289$; (b) NOT right, $41 \\ne 49$; (c) right, $225 = 225$',
              figures: [
                {
                  caption: 'The converse check for Exercise 10: the 8-15-17 with squares 64 + 225 = 289 (corner square, verdict right) against the 4-5-7 with 16 + 25 = 41 ≠ 49 (corner bulging ≈ 101.5°, verdict NOT right) — the converse run on both witnesses.',
                  svg: geo44Converse('Two triangles side by side: an 8-15-17 with a right-angle mark and the areas 64, 225 and 289 summing correctly, and a 4-5-7 with a bulging corner marked about 101.5 degrees and the areas 16, 25 and 49 not summing.'),
                },
              ],
            },
            {
              q: 'Euclid\u2019s factory. The recipe $(m^2 - n^2, \\; 2mn, \\; m^2 + n^2)$ with $m > n$, $\\gcd(m, n) = 1$ and $m - n$ odd produces primitive triples. Generate the triples for $(m, n) = (2, 1)$, $(3, 2)$, $(4, 1)$, $(5, 2)$, $(7, 4)$; verify each is right and primitive; and check each against the census table.',
              solution: [
                'Sol. $(2, 1)$: $(4 - 1, \\; 4, \\; 4 + 1) = (3, 4, 5)$ — right since $9 + 16 = 25$; primitive since $\\gcd(3, 4, 5) = 1$; in the census.',
                '$(3, 2)$: $(9 - 4, \\; 12, \\; 9 + 4) = (5, 12, 13)$ — $25 + 144 = 169$; gcd $1$; in the census.',
                '$(4, 1)$: $(16 - 1, \\; 8, \\; 16 + 1) = (15, 8, 17)$, written $(8, 15, 17)$ — $64 + 225 = 289$; gcd $1$; in the census.',
                '$(5, 2)$: $(25 - 4, \\; 20, \\; 25 + 4) = (21, 20, 29)$, written $(20, 21, 29)$ — $400 + 441 = 841$; gcd $1$; in the census (a pinned member).',
                '$(7, 4)$: $(49 - 16, \\; 56, \\; 49 + 16) = (33, 56, 65)$ — $1089 + 3136 = 4225$; gcd $1$; in the census (one of the two members with $c = 65$).',
                'Hence the factory yields $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(20, 21, 29)$ and $(33, 56, 65)$ — all right, all primitive, all in the census.',
              ],
              answer: '$(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(20, 21, 29)$, $(33, 56, 65)$ — all right, all primitive, all in the census',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Prove Euclid VI.8 in full: in a right triangle with the altitude dropped to the hypotenuse, each leg is the geometric mean of the hypotenuse and its adjacent segment, and the altitude is the geometric mean of the two segments.',
              solution: [
                'Sol. Set up the split: $\\triangle ABC$ right-angled at $C$; altitude $CH$ with foot $H$ on $AB$; $p = BH$ (adjacent to $a = BC$), $q = AH$ (adjacent to $b = CA$), $h = CH$.',
                'AA census: $\\triangle CBH$ matches $\\triangle ABC$ in $\\angle B$ (shared) and in a right angle ($H$ answering $C$), so $\\triangle CBH \\sim \\triangle ABC$ with correspondence $C \\leftrightarrow A$, $B \\leftrightarrow B$, $H \\leftrightarrow C$; similarly $\\triangle ACH \\sim \\triangle ABC$; and the two pieces are similar to each other.',
                'Leg law for $a$: in $\\triangle CBH \\sim \\triangle ABC$ the hypotenuses answer each other ($BC = a$ against $AB = c$) and the side $BH = p$ answers $BC = a$; so $\\frac{p}{a} = \\frac{a}{c}$, which clears to $a^2 = cp$.',
                'Leg law for $b$: in $\\triangle ACH \\sim \\triangle ABC$ the hypotenuses answer ($CA = b$ against $AB = c$) and $AH = q$ answers $CA = b$; so $\\frac{q}{b} = \\frac{b}{c}$, which clears to $b^2 = cq$.',
                'Altitude law: comparing the pieces, $\\triangle ACH \\sim \\triangle CBH$ with $AH$ answering $CH$ and $CH$ answering $BH$; so $\\frac{q}{h} = \\frac{h}{p}$, which clears to $h^2 = pq$.',
                'Hence each leg is the geometric mean of the hypotenuse and its adjacent segment ($a^2 = cp$, $b^2 = cq$) and the altitude is the geometric mean of the segments ($h^2 = pq$) — Euclid VI.8 complete.',
              ],
              answer: 'proved: $a^2 = cp$, $b^2 = cq$ and $h^2 = pq$, by AA similarity of the three triangles (Euclid VI.8)',
            },
            {
              q: 'Two similar triangles have areas $6$ and $54$. (a) Find the scale factor $k$, both directions. (b) A leg of the smaller is $4$: find the corresponding leg of the larger. (c) The smaller\u2019s perimeter is $12$: find the larger\u2019s.',
              solution: [
                'Sol. (a) The area ratio is $54/6 = 9$, so $k^2 = 9$ and $k = 3$ enlarging small to large; the return read is $k = 1/3$.',
                '(b) Legs are lengths, so they ride the bare $k$: $4 \\times 3 = 12$.',
                '(c) Perimeters are lengths too: $12 \\times 3 = 36$.',
                'Audit the dial discipline: the area ratio $9$ is $k^2$; answering $9$ for a length would be the dimension slip — the leg goes $4 \\to 12$, not $4 \\to 36$.',
                'Hence $k = 3$ (small to large; $1/3$ back), the leg is $12$, the perimeter is $36$.',
              ],
              answer: '$k = 3$ small-to-large ($1/3$ back); leg $12$; perimeter $36$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Two shadow reads in one hour. At mid-morning a $1.8$ m person casts a $2.4$ m shadow. (a) A chimney casts a $40$ m shadow at the same moment: find its height. (b) A mast is known to be $6$ m tall: find the shadow it casts at that same moment.',
              solution: [
                'Sol. Licence: vertical objects on flat ground with the sun\u2019s parallel rays — the right angle and the sun angle match, so AA (Lesson 4.3) makes all the shadow-triangles similar, pairing heights with heights and shadows with shadows.',
                '(a) Read $k$ on the shadows: $k = 40/2.4 = 16.6667$ (person-triangle to chimney-triangle), so the chimney stands $1.8 \\times 16.6667 = 30$ m — or directly, $h = \\frac{1.8 \\times 40}{2.4} = 30$ m.',
                '(b) Run the machine backwards: $k$ on the heights must equal $k$ on the shadows, so the mast\u2019s shadow is $2.4 \\times \\frac{6}{1.8} = 2.4 \\times 3.3333 = 8$ m.',
                'Audit both directions: (a) multiplies the height by the $k$ read on the shadows; (b) divides — the arrow is part of the arithmetic both times, and the licence (AA) never changes.',
                'Hence the chimney is $30$ m tall and the mast casts an $8$ m shadow.',
              ],
              answer: '(a) the chimney is $30$ m tall; (b) the mast\u2019s shadow is $8$ m',
            },
            {
              q: 'The carpenter\u2019s converse, in full. (a) A builder marks $3$ units along one wall and $4$ along the perpendicular-to-be, then adjusts until the diagonal reads $5$. Explain, naming the licence, why the corner is now square. (b) Test $4$, $5$, $7$ the same way. (c) Test $9$, $12$, $15$. (d) Why does the CONVERSE matter commercially — what would go wrong if only the theorem (not the converse) were available?',
              solution: [
                'Sol. (a) The builder holds three lengths and wants the angle: the licence is the CONVERSE of Pythagoras (Euclid I.48), which runs sides $\\to$ angle. The check $3^2 + 4^2 = 9 + 16 = 25 = 5^2$ fires, so the angle opposite the $5$ — the corner between the walls — is a right angle: square.',
                '(b) $4^2 + 5^2 = 16 + 25 = 41$ and $7^2 = 49$: $41 \\ne 49$, so the converse refuses — a $4$-$5$ corner braced at $7$ is NOT square (it bulges).',
                '(c) $9^2 + 12^2 = 81 + 144 = 225 = 15^2$: fires — the corner is square (the $3$-$4$-$5$ at $k = 3$, the family inheritance).',
                '(d) The theorem runs right angle $\\to$ equation: it certifies a corner already known to be square. The builder\u2019s situation is the reverse — three measured lengths, one wanted angle — and only the converse licenses that inference. Without it, the $3$-$4$-$5$ ritual could only CONFIRM squareness it had been given, never create it.',
                'Hence (a) square by the converse ($9 + 16 = 25$); (b) not right ($41 \\ne 49$); (c) right ($81 + 144 = 225$); (d) the converse, not the theorem, converts measured sides into a certified angle.',
              ],
              answer: '(a) square — the converse fires on $9 + 16 = 25$; (b) NOT right ($41 \\ne 49$); (c) right ($81 + 144 = 225$); (d) the converse converts measured sides into a certified right angle — the theorem cannot',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}
