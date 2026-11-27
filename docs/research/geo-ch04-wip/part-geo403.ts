import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — teal-emerald hues,  */
/* the ch.4 similarity family continued: 4.1 took blueprint, 4.3 takes */
/* the deep-teal criterion family)                                     */
/* ------------------------------------------------------------------ */
const c43 = {
  ink: '#115e59', // primary text — deep teal ink
  mid: '#0d9488', // mid text — bright teal
  teal: '#0891b2', // captions, light strokes, secondary structure (cyan)
  tealInk: '#0e7490', // cyan ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#059669', // structure strokes — boxes, triangles, nodes (emerald)
  panel: '#ccfbf1', // teal tinted fill
  panel2: '#d1fae5', // emerald tinted fill
  sep: '#5eead4', // light separators
  faint: '#99f6e4', // faint dots, grids, unpicked borders
  white: '#ffffff',
  paper: '#f0fdfa', // cool paper plate
}
const f43 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo43 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo43Txt = (
  x: number, y: number, s: string,
  size = 13, color = c43.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f43}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo43Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c43.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo43Dot = (x: number, y: number, color = c43.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo43Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo43Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo43RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c43.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo43Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo43Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c43.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo43Line(x1, y1, x2, y2, color, w) + geo43Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, positive = downward on screen) */
const geo43Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo43Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** single tick mark at the midpoint of a side, perpendicular to it */
const geo43Tick = (x1: number, y1: number, x2: number, y2: number, n = 1, color = c43.amber): string => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const px = -dy / len, py = dx / len
  const parts: string[] = []
  for (let i = 0; i < n; i++) {
    const off = (i - (n - 1) / 2) * 6
    parts.push(geo43Line(mx + px * off - dx / len * 5, my + py * off - dy / len * 5, mx + px * off + dx / len * 5, my + py * off + dy / len * 5, color, 2))
  }
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the AA construction proof: the copy on the shared  */
/* angle, the forced parallel, the three ratios 3/5                    */
/* A=(0,0), B=(10,0), C=8 at 40 deg, D=(6,0), E=0.6C (engine E07-E09) */
/* ------------------------------------------------------------------ */
const geo43AAProof = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE AA CONSTRUCTION: COPY ON THE SHARED ANGLE', 13, c43.ink, 'middle', '700'))
  const A: [number, number] = [90, 350]
  const B: [number, number] = [430, 350]
  const C: [number, number] = [90 + 6.1283555 * 34, 350 - 5.1423009 * 34]
  const D: [number, number] = [294, 350]
  const E: [number, number] = [90 + 0.6 * 6.1283555 * 34, 350 - 0.6 * 5.1423009 * 34]
  // big triangle ABC
  parts.push(geo43Poly([A, B, C], c43.green, 0.08, c43.green, 2.8))
  // copy ADE
  parts.push(geo43Poly([A, D, E], c43.orange, 0.16, c43.orange, 2.4))
  // the forced parallel DE (dash echo) and BC
  parts.push(geo43Line(D[0], D[1], E[0], E[1], c43.orange, 2.4, '6 5'))
  parts.push(geo43Txt(253, 316, 'DE \u2225 BC', 12.5, c43.orange))
  // angle at A: 40 deg shared
  parts.push(geo43Arc(A[0], A[1], 52, 0, -40 * Math.PI / 180, c43.amber, 2.2))
  parts.push(geo43Txt(158, 328, '40\u00b0', 12.5, c43.amber))
  // angle copies at B and D
  parts.push(geo43Arc(D[0], D[1], 34, Math.PI, Math.PI + 0.75, c43.tealInk, 1.8))
  parts.push(geo43Txt(268, 332, '\u2220D = \u2220B', 11.5, c43.tealInk))
  // vertices
  parts.push(geo43Txt(76, 368, 'A', 13, c43.ink))
  parts.push(geo43Txt(434, 368, 'B', 13, c43.ink))
  parts.push(geo43Txt(306, 160, 'C', 13, c43.ink))
  parts.push(geo43Txt(294, 368, 'D', 13, c43.orange))
  parts.push(geo43Txt(200, 240, 'E', 13, c43.orange))
  parts.push(geo43Dot(A[0], A[1], c43.ink, 4))
  parts.push(geo43Dot(B[0], B[1], c43.ink, 4))
  parts.push(geo43Dot(C[0], C[1], c43.ink, 4))
  parts.push(geo43Dot(D[0], D[1], c43.orange, 4))
  parts.push(geo43Dot(E[0], E[1], c43.orange, 4))
  // side labels
  parts.push(geo43Txt(180, 366, 'AD = 6', 12, c43.orange))
  parts.push(geo43Txt(352, 340, 'DB = 4', 11.5, c43.mid))
  parts.push(geo43Txt(262, 366, 'AB = 10', 12, c43.green))
  parts.push(geo43Txt(66, 250, 'AC = 8', 12, c43.green, 'end'))
  parts.push(geo43Txt(128, 300, 'AE = 4.8', 12, c43.orange))
  parts.push(geo43Txt(368, 250, 'BC \u2248 6.4368', 12, c43.green))
  parts.push(geo43Txt(300, 290, 'DE \u2248 3.8621', 12, c43.orange))
  // the ratio verdict
  parts.push(geo43Rect(150, 62, 340, 40, c43.panel, 0.9, c43.tealInk, 2))
  parts.push(geo43Txt(320, 88, 'AD/AB = AE/AC = DE/BC = 3/5', 13.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Txt(320, 130, 'the parallel through D forces every ratio \u2014 BPT does the work', 12, c43.tealInk))
  return geo43Svg(640, 392, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the SAS pair: 4,6@60 deg vs 6,9@60 deg, k = 3/2    */
/* with the included-angle arcs and the tick correspondence            */
/* ------------------------------------------------------------------ */
const geo43SASPair = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'SAS-SIMILARITY: 4, 6 @ 60\u00b0 AGAINST 6, 9 @ 60\u00b0', 13, c43.ink, 'middle', '700'))
  // small triangle: P(100,300), Q(280,300), R at 60 deg from P, side 4
  const P: [number, number] = [100, 300]
  const Q: [number, number] = [280, 300]
  const R: [number, number] = [100 + 4 * 30 * Math.cos(Math.PI / 3), 300 - 4 * 30 * Math.sin(Math.PI / 3)]
  parts.push(geo43Poly([P, Q, R], c43.green, 0.1, c43.green, 2.6))
  parts.push(geo43Arc(P[0], P[1], 40, 0, -Math.PI / 3, c43.amber, 2.2))
  parts.push(geo43Txt(146, 284, '60\u00b0', 12.5, c43.amber))
  parts.push(geo43Tick(P[0], P[1], R[0], R[1], 1, c43.orange))
  parts.push(geo43Tick(P[0], P[1], Q[0], Q[1], 2, c43.tealInk))
  parts.push(geo43Txt(78, 240, '4', 13, c43.ink))
  parts.push(geo43Txt(190, 322, '6', 13, c43.ink))
  parts.push(geo43Txt(214, 226, '\u221a28 \u2248 5.2915026', 12, c43.tealInk))
  parts.push(geo43Txt(84, 322, 'P', 13, c43.ink))
  parts.push(geo43Txt(288, 322, 'Q', 13, c43.ink))
  parts.push(geo43Txt(146, 190, 'R', 13, c43.ink))
  // big triangle: P'(370,320), Q'(604,320), R' with side 6 at 60 deg
  const P2: [number, number] = [370, 320]
  const Q2: [number, number] = [604, 320]
  const R2: [number, number] = [370 + 6 * 26 * Math.cos(Math.PI / 3), 320 - 6 * 26 * Math.sin(Math.PI / 3)]
  parts.push(geo43Poly([P2, Q2, R2], c43.orange, 0.09, c43.orange, 2.6))
  parts.push(geo43Arc(P2[0], P2[1], 46, 0, -Math.PI / 3, c43.amber, 2.2))
  parts.push(geo43Txt(424, 302, '60\u00b0', 12.5, c43.amber))
  parts.push(geo43Tick(P2[0], P2[1], R2[0], R2[1], 1, c43.orange))
  parts.push(geo43Tick(P2[0], P2[1], Q2[0], Q2[1], 2, c43.tealInk))
  parts.push(geo43Txt(344, 240, '6', 13, c43.ink))
  parts.push(geo43Txt(487, 344, '9', 13, c43.ink))
  parts.push(geo43Txt(520, 224, '\u221a63 \u2248 7.9372539', 12, c43.tealInk))
  parts.push(geo43Txt(354, 344, 'P\u2032', 13, c43.ink))
  parts.push(geo43Txt(612, 344, 'Q\u2032', 13, c43.ink))
  parts.push(geo43Txt(428, 178, 'R\u2032', 13, c43.ink))
  // the k bridge
  parts.push(geo43Arrow(300, 260, 356, 260, c43.amber, 2.2))
  parts.push(geo43Txt(328, 246, 'k = 3/2', 12.5, c43.amber))
  parts.push(geo43Txt(328, 278, 'small \u2192 big', 11.5, c43.mid))
  // verdict strip
  parts.push(geo43Rect(96, 66, 448, 42, c43.panel, 0.9, c43.tealInk, 2))
  parts.push(geo43Txt(320, 92, '6/4 = 9/6 = \u221a63/\u221a28 = 3/2 \u2014 one k on all three pairs', 13, c43.tealInk, 'middle', '700'))
  return geo43Svg(640, 366, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the SSS ratio census: 6,8,10 vs 9,12,15 with the   */
/* per-pair ratios, plus the 11-side counter                           */
/* ------------------------------------------------------------------ */
const geo43SSSCensus = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE SSS RATIO CENSUS: 6, 8, 10 AGAINST 9, 12, 15', 13, c43.ink, 'middle', '700'))
  // small right triangle: legs 8 (horiz, 20px/u) and 6 (vert), right angle at O1
  const O1: [number, number] = [120, 240]
  const B1: [number, number] = [280, 240]
  const C1: [number, number] = [120, 120]
  parts.push(geo43Poly([O1, B1, C1], c43.green, 0.1, c43.green, 2.6))
  parts.push(geo43RA(O1[0], O1[1], 1, 0, 0, -1, 12, c43.green))
  parts.push(geo43Txt(88, 186, '6', 13, c43.ink))
  parts.push(geo43Txt(200, 262, '8', 13, c43.ink))
  parts.push(geo43Txt(226, 172, '10', 13, c43.ink))
  parts.push(geo43Txt(104, 258, 'O', 12.5, c43.ink))
  parts.push(geo43Txt(288, 258, 'B', 12.5, c43.ink))
  parts.push(geo43Txt(104, 112, 'C', 12.5, c43.ink))
  // big right triangle: legs 12 (horiz, 20px/u) and 9 (vert)
  const O2: [number, number] = [390, 276]
  const B2: [number, number] = [630, 276]
  const C2: [number, number] = [390, 96]
  parts.push(geo43Poly([O2, B2, C2], c43.orange, 0.09, c43.orange, 2.6))
  parts.push(geo43RA(O2[0], O2[1], 1, 0, 0, -1, 12, c43.orange))
  parts.push(geo43Txt(360, 190, '9', 13, c43.ink))
  parts.push(geo43Txt(510, 298, '12', 13, c43.ink))
  parts.push(geo43Txt(545, 176, '15', 13, c43.ink))
  parts.push(geo43Txt(374, 294, 'O\u2032', 12.5, c43.ink))
  parts.push(geo43Txt(620, 294, 'B\u2032', 12.5, c43.ink))
  parts.push(geo43Txt(374, 88, 'C\u2032', 12.5, c43.ink))
  // ratio chips between the triangles
  const chip = (x: number, y: number, s: string, ok: boolean): void => {
    parts.push(geo43Rect(x - 52, y - 16, 104, 26, ok ? c43.panel2 : '#ffffff', 0.9, ok ? c43.green : c43.red, 2))
    parts.push(geo43Txt(x, y + 2, s, 12.5, ok ? c43.green : c43.red, 'middle', '700'))
  }
  chip(320, 130, '9/6 = 3/2', true)
  chip(320, 178, '12/8 = 3/2', true)
  chip(320, 226, '15/10 = 3/2', true)
  parts.push(geo43Arrow(296, 130, 246, 150, c43.amber, 2))
  parts.push(geo43Arrow(296, 178, 296, 186, c43.amber, 2))
  parts.push(geo43Arrow(296, 226, 252, 208, c43.amber, 2))
  // the counter strip
  parts.push(geo43Rect(70, 320, 500, 60, c43.white, 0.9, c43.red, 2))
  parts.push(geo43Txt(320, 344, 'THE COUNTER: 6, 8, 11 against 9, 12, 15', 12.5, c43.red, 'middle', '700'))
  parts.push(geo43Txt(320, 366, '9/6 = 3/2 and 12/8 = 3/2, but 15/11 \u2248 1.3636 \u2014 REFUSED', 12.5, c43.red))
  parts.push(geo43Txt(320, 300, 'angles agree: 36.87\u00b0, 53.13\u00b0, 90\u00b0 in both', 12, c43.tealInk))
  return geo43Svg(640, 392, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the SSA failure, re-armed for similarity:          */
/* A = 30 deg, b = 7, a = 5 gives TWO triangles (c = 2.4914636 and     */
/* 9.6328920) — two sides in common ratio 1, still not similar         */
/* ------------------------------------------------------------------ */
const geo43SSAFail = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'SSA RE-ARMED: ONE DATA SET, TWO TRIANGLES', 13, c43.ink, 'middle', '700'))
  parts.push(geo43Txt(320, 44, 'A = 30\u00b0, b = 7, a = 5 \u2014 the circle of radius 5 about C cuts the base ray twice', 12, c43.tealInk))
  const A: [number, number] = [80, 330]
  const u = 26
  const C: [number, number] = [A[0] + 7 * u * Math.cos(-Math.PI / 6), A[1] + 7 * u * Math.sin(-Math.PI / 6)]
  const B1: [number, number] = [A[0] + 2.4914636 * u, A[1]]
  const B2: [number, number] = [A[0] + 9.6328920 * u, A[1]]
  // ground ray
  parts.push(geo43Line(A[0] - 20, A[1], 600, A[1], c43.faint, 1.4))
  // the two triangles
  parts.push(geo43Poly([A, B1, C], c43.green, 0.12, c43.green, 2.6))
  parts.push(geo43Poly([A, B2, C], c43.white, 0.0, c43.orange, 2.4, '7 5'))
  // the circle of radius a = 5 about C, through both B points
  parts.push(geo43Arc(C[0], C[1], 5 * u, Math.PI / 2 - 0.92, Math.PI / 2 + 0.62, c43.red, 1.6, '5 4'))
  parts.push(geo43Txt(C[0] + 96, C[1] + 66, 'radius a = 5', 11.5, c43.red))
  // angle at A
  parts.push(geo43Arc(A[0], A[1], 44, 0, -Math.PI / 6, c43.amber, 2.2))
  parts.push(geo43Txt(134, 312, '30\u00b0', 12.5, c43.amber))
  // side labels
  parts.push(geo43Txt(140, 240, 'b = 7', 12.5, c43.ink))
  parts.push(geo43Txt(196, 300, 'c \u2248 2.4914636', 11.5, c43.green))
  parts.push(geo43Txt(322, 352, 'c \u2248 9.6328920', 11.5, c43.orange))
  parts.push(geo43Txt(150, 280, 'a = 5', 11.5, c43.tealInk))
  parts.push(geo43Txt(346, 268, 'a = 5', 11.5, c43.tealInk))
  // vertices
  parts.push(geo43Txt(66, 348, 'A', 13, c43.ink))
  parts.push(geo43Txt(142, 348, 'B\u2081', 13, c43.green))
  parts.push(geo43Txt(330, 348, 'B\u2082', 13, c43.orange))
  parts.push(geo43Txt(232, 200, 'C', 13, c43.ink))
  parts.push(geo43Dot(A[0], A[1], c43.ink, 4))
  parts.push(geo43Dot(B1[0], B1[1], c43.green, 4))
  parts.push(geo43Dot(B2[0], B2[1], c43.orange, 4))
  parts.push(geo43Dot(C[0], C[1], c43.ink, 4))
  // the angle disagreement
  parts.push(geo43Txt(120, 176, '\u2220B\u2081 \u2248 135.5729960\u00b0 (fat)', 12, c43.green))
  parts.push(geo43Txt(452, 232, '\u2220B\u2082 \u2248 44.4270040\u00b0 (thin)', 12, c43.orange))
  // verdict
  parts.push(geo43Rect(110, 62, 420, 42, c43.white, 0.9, c43.red, 2))
  parts.push(geo43Txt(320, 88, 'a/a\u2032 = 1 and b/b\u2032 = 1, \u2220A = \u2220A\u2032 \u2014 still NOT similar', 12.5, c43.red, 'middle', '700'))
  return geo43Svg(640, 370, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the tree-shadow AA computation (Illustr. 1)    */
/* stick 1.5 m, shadow 2 m, tree shadow 12 m, height 9 m               */
/* ------------------------------------------------------------------ */
const geo43Shadow = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE SHADOW METHOD: 1.5 m STICK, 12 m TREE SHADOW', 13, c43.ink, 'middle', '700'))
  const g = 310
  parts.push(geo43Line(40, g, 610, g, c43.ink, 2))
  // the sun rays (parallel, from upper left)
  parts.push(geo43Line(96, 172, 176, 232, c43.orange, 1.6, '6 5'))
  parts.push(geo43Arrow(300, 60, 360, 105, c43.orange, 1.8))
  parts.push(geo43Txt(286, 52, 'sun rays \u2225', 12, c43.orange))
  // stick at x = 130, height 1.5 m at 22 px/m
  parts.push(geo43Line(130, g, 130, g - 33, c43.green, 4))
  parts.push(geo43RA(130, g, 1, 0, 0, -1, 10, c43.green))
  parts.push(geo43Txt(112, 282, '1.5 m', 12, c43.green))
  // stick shadow 2 m
  parts.push(geo43Line(130, g, 174, g, c43.amber, 4))
  parts.push(geo43Txt(152, 330, '2 m', 12, c43.amber))
  // ray from stick top to shadow tip
  parts.push(geo43Line(130, g - 33, 174, g, c43.orange, 1.8, '6 5'))
  // tree at x = 330, height 9 m = 198 px
  parts.push(geo43Line(330, g, 330, g - 198, c43.green, 5))
  parts.push(geo43RA(330, g, 1, 0, 0, -1, 10, c43.green))
  parts.push(geo43Txt(310, 200, 'h = 9 m', 12.5, c43.green))
  // tree shadow 12 m = 264 px
  parts.push(geo43Line(330, g, 594, g, c43.amber, 5))
  parts.push(geo43Txt(462, 330, '12 m', 12.5, c43.amber))
  // ray from treetop to shadow tip
  parts.push(geo43Line(330, g - 198, 594, g, c43.orange, 1.8, '6 5'))
  // the proportion
  parts.push(geo43Rect(150, 62, 340, 44, c43.panel, 0.9, c43.tealInk, 2))
  parts.push(geo43Txt(320, 90, 'h/12 = 1.5/2, so h = 12 \u00d7 0.75 = 9 m', 13.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Txt(320, 130, 'AA: right angle at the ground + the shared sun angle', 12, c43.tealInk))
  return geo43Svg(640, 352, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the SAS third-side law-of-cosines ladder       */
/* (Illustration 2): 4,6@60 vs 6,9@60, thirds, areas, ratio 9/4        */
/* ------------------------------------------------------------------ */
const geo43Ladder = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE LAW-OF-COSINES LADDER', 13, c43.ink, 'middle', '700'))
  const P: [number, number] = [86, 250]
  const Q: [number, number] = [206, 250]
  const R: [number, number] = [86 + 80 * Math.cos(Math.PI / 3), 250 - 80 * Math.sin(Math.PI / 3)]
  parts.push(geo43Poly([P, Q, R], c43.green, 0.1, c43.green, 2.4))
  parts.push(geo43Arc(P[0], P[1], 30, 0, -Math.PI / 3, c43.amber, 2))
  parts.push(geo43Txt(120, 238, '60\u00b0', 11.5, c43.amber))
  parts.push(geo43Txt(70, 200, '4', 12.5, c43.ink))
  parts.push(geo43Txt(146, 270, '6', 12.5, c43.ink))
  parts.push(geo43Txt(180, 196, '\u221a28', 12, c43.tealInk))
  const P2: [number, number] = [306, 250]
  const Q2: [number, number] = [486, 250]
  const R2: [number, number] = [306 + 120 * Math.cos(Math.PI / 3), 250 - 120 * Math.sin(Math.PI / 3)]
  parts.push(geo43Poly([P2, Q2, R2], c43.orange, 0.09, c43.orange, 2.4))
  parts.push(geo43Arc(P2[0], P2[1], 36, 0, -Math.PI / 3, c43.amber, 2))
  parts.push(geo43Txt(346, 236, '60\u00b0', 11.5, c43.amber))
  parts.push(geo43Txt(288, 186, '6', 12.5, c43.ink))
  parts.push(geo43Txt(396, 270, '9', 12.5, c43.ink))
  parts.push(geo43Txt(442, 180, '\u221a63', 12, c43.tealInk))
  parts.push(geo43Arrow(228, 214, 292, 214, c43.amber, 2.2))
  parts.push(geo43Txt(260, 200, 'k = 3/2', 12, c43.amber))
  // the ladder panel
  parts.push(geo43Rect(96, 288, 448, 118, c43.panel, 0.85, c43.tealInk, 2))
  parts.push(geo43Txt(320, 310, 'c\u00b2 = 4\u00b2 + 6\u00b2 \u2212 2\u00b74\u00b76\u00b7cos60\u00b0 = 28', 12.5, c43.ink, 'middle', '700'))
  parts.push(geo43Txt(320, 332, 'c\u00b2 = 6\u00b2 + 9\u00b2 \u2212 2\u00b76\u00b79\u00b7cos60\u00b0 = 63', 12.5, c43.ink, 'middle', '700'))
  parts.push(geo43Txt(320, 354, '\u221a63/\u221a28 = \u221a(63/28) = 1.5 exactly \u2014 the k holds', 12.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Txt(320, 384, 'areas: 6\u221a3 = 10.3923048 and 13.5\u221a3 = 23.3826859, ratio 9/4 = k\u00b2', 12.5, c43.orange, 'middle', '700'))
  return geo43Svg(640, 416, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the SSS check walk (Illustration 3)            */
/* ------------------------------------------------------------------ */
const geo43SSSCheck = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE SSS CHECK, PAIR BY PAIR', 13, c43.ink, 'middle', '700'))
  const O1: [number, number] = [110, 210]
  const B1: [number, number] = [230, 210]
  const C1: [number, number] = [110, 132]
  parts.push(geo43Poly([O1, B1, C1], c43.green, 0.1, c43.green, 2.4))
  parts.push(geo43RA(O1[0], O1[1], 1, 0, 0, -1, 10, c43.green))
  parts.push(geo43Txt(88, 174, '6', 12.5, c43.ink))
  parts.push(geo43Txt(170, 230, '8', 12.5, c43.ink))
  parts.push(geo43Txt(186, 164, '10', 12.5, c43.ink))
  const O2: [number, number] = [430, 218]
  const B2: [number, number] = [610, 218]
  const C2: [number, number] = [430, 101]
  parts.push(geo43Poly([O2, B2, C2], c43.orange, 0.09, c43.orange, 2.4))
  parts.push(geo43RA(O2[0], O2[1], 1, 0, 0, -1, 10, c43.orange))
  parts.push(geo43Txt(408, 162, '9', 12.5, c43.ink))
  parts.push(geo43Txt(520, 238, '12', 12.5, c43.ink))
  parts.push(geo43Txt(542, 152, '15', 12.5, c43.ink))
  // the three ratio rows
  const row = (y: number, s: string, ok: boolean): void => {
    parts.push(geo43Rect(216, y - 15, 208, 26, ok ? c43.panel2 : c43.white, 0.9, ok ? c43.green : c43.red, 1.8))
    parts.push(geo43Txt(320, y + 3, s, 12.5, ok ? c43.green : c43.red, 'middle', '700'))
  }
  row(96, '9/6 = 3/2 \u2713', true)
  row(128, '12/8 = 3/2 \u2713', true)
  row(160, '15/10 = 3/2 \u2713', true)
  parts.push(geo43Txt(320, 192, 'SIMILAR \u2014 k = 3/2 (small \u2192 big)', 12.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Txt(320, 248, 'angle echo: 36.87\u00b0, 53.13\u00b0, 90\u00b0 in both', 12, c43.tealInk))
  // the counter strip
  parts.push(geo43Rect(96, 274, 448, 52, c43.white, 0.9, c43.red, 2))
  parts.push(geo43Txt(320, 296, 'THE HONEST SWAP: replace the 10-side by an 11-side', 12, c43.red, 'middle', '700'))
  parts.push(geo43Txt(320, 316, '6, 8, 11 against 9, 12, 15: the third ratio reads 15/11 \u2248 1.3636 \u2014 REFUSED', 12, c43.red))
  return geo43Svg(640, 338, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the workshop pole (Exercise 6):                */
/* 2.4 m pole, 3.2 m shadow, 24 m building shadow, height 18 m          */
/* ------------------------------------------------------------------ */
const geo43Workshop = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE INDIRECT-MEASUREMENT WORKSHOP', 13, c43.ink, 'middle', '700'))
  const g = 280
  const m = 14 // px per metre
  parts.push(geo43Line(30, g, 612, g, c43.ink, 2))
  // pole at x = 110
  parts.push(geo43Line(110, g, 110, g - 2.4 * m, c43.green, 4))
  parts.push(geo43RA(110, g, 1, 0, 0, -1, 9, c43.green))
  parts.push(geo43Txt(88, g - 18, '2.4 m', 12, c43.green))
  parts.push(geo43Line(110, g, 110 + 3.2 * m, g, c43.amber, 4))
  parts.push(geo43Txt(132, g + 18, '3.2 m', 12, c43.amber))
  parts.push(geo43Line(110, g - 2.4 * m, 110 + 3.2 * m, g, c43.orange, 1.6, '5 4'))
  // building at x = 250, height 18 m
  parts.push(geo43Rect(250, g - 18 * m, 64, 18 * m, c43.panel, 0.5, c43.green, 2.4))
  parts.push(geo43RA(250, g, 1, 0, 0, -1, 9, c43.green))
  parts.push(geo43Txt(282, g - 18 * m - 10, 'h = 18 m', 12.5, c43.green))
  // building shadow 24 m
  parts.push(geo43Line(314, g, 314 + 24 * m - 64, g, c43.amber, 4))
  parts.push(geo43Txt(450, g + 18, '24 m', 12.5, c43.amber))
  // ray from building top to shadow tip
  parts.push(geo43Line(250, g - 18 * m, 314 + 24 * m - 64, g, c43.orange, 1.6, '5 4'))
  parts.push(geo43Txt(282, g - 18 * m + 18, 'same sun \u2014 same ratios', 11.5, c43.orange))
  // the proportion panel
  parts.push(geo43Rect(170, 52, 300, 42, c43.panel, 0.9, c43.tealInk, 2))
  parts.push(geo43Txt(320, 78, 'h/24 = 2.4/3.2 = 3/4, so h = 18 m', 13, c43.tealInk, 'middle', '700'))
  return geo43Svg(640, 314, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the ambiguous pair on the number line (Ex 10)  */
/* ------------------------------------------------------------------ */
const geo43SSARoots = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'BOTH ROOTS ARE GENUINE TRIANGLES', 13, c43.ink, 'middle', '700'))
  parts.push(geo43Txt(320, 46, 'c\u00b2 \u2212 7\u221a3\u00b7c + 24 = 0 \u2014 the law of cosines as a quadratic in c', 12.5, c43.tealInk))
  // number line 0..10
  const x0 = 80, x1 = 560, y = 130
  parts.push(geo43Arrow(x0, y, x1, y, c43.ink, 2))
  for (let i = 0; i <= 10; i++) {
    const x = x0 + (i * (x1 - x0 - 20)) / 10
    parts.push(geo43Line(x, y - 6, x, y + 6, c43.ink, 1.6))
    if (i % 5 === 0 || i === 10) parts.push(geo43Txt(x, y + 24, String(i), 11.5, c43.mid))
  }
  const px = (v: number): number => x0 + (v * (x1 - x0 - 20)) / 10
  // the two roots
  const r1 = 2.4914636, r2 = 9.6328920
  parts.push(geo43Dot(px(r1), y, c43.green, 6))
  parts.push(geo43Dot(px(r2), y, c43.orange, 6))
  parts.push(geo43Txt(px(r1), y - 34, 'c\u2081 \u2248 2.4914636', 12.5, c43.green))
  parts.push(geo43Txt(px(r1), y - 18, '\u2220B = 135.5729960\u00b0', 11.5, c43.green))
  parts.push(geo43Txt(px(r2) - 6, y - 34, 'c\u2082 \u2248 9.6328920', 12.5, c43.orange))
  parts.push(geo43Txt(px(r2) - 6, y - 18, '\u2220B = 44.4270040\u00b0', 11.5, c43.orange))
  // sum and product chips
  parts.push(geo43Rect(96, 176, 220, 34, c43.panel, 0.9, c43.tealInk, 1.8))
  parts.push(geo43Txt(206, 198, 'sum = 7\u221a3 = 12.1243557', 12.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Rect(324, 176, 220, 34, c43.panel, 0.9, c43.tealInk, 1.8))
  parts.push(geo43Txt(434, 198, 'product = 24', 12.5, c43.tealInk, 'middle', '700'))
  parts.push(geo43Txt(320, 242, 'two sides in common ratio 1 + an equal NON-included angle', 12, c43.red, 'middle', '700'))
  parts.push(geo43Txt(320, 262, '\u2014 and the verdict is still NO', 12.5, c43.red, 'middle', '700'))
  return geo43Svg(640, 278, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S6 — the numeric construction (Exercise 13):        */
/* angle A = 50 deg, AB = 10, AC = 9, D on AB with AD = 4              */
/* ------------------------------------------------------------------ */
const geo43AANumeric = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo43Txt(320, 22, 'THE CONSTRUCTION RUN AT FRESH NUMBERS', 13, c43.ink, 'middle', '700'))
  parts.push(geo43Txt(320, 44, '\u2220A = 50\u00b0, AB = 10, AC = 9, AD = 4 \u2014 DE \u2225 BC', 12, c43.tealInk))
  const A: [number, number] = [90, 330]
  const B: [number, number] = [390, 330]
  const C: [number, number] = [90 + 9 * 30 * Math.cos(50 * Math.PI / 180), 330 - 9 * 30 * Math.sin(50 * Math.PI / 180)]
  const D: [number, number] = [210, 330]
  const E: [number, number] = [A[0] + 0.4 * (C[0] - A[0]), A[1] + 0.4 * (C[1] - A[1])]
  parts.push(geo43Poly([A, B, C], c43.green, 0.08, c43.green, 2.6))
  parts.push(geo43Poly([A, D, E], c43.orange, 0.16, c43.orange, 2.2))
  parts.push(geo43Line(D[0], D[1], E[0], E[1], c43.orange, 2.2, '6 5'))
  parts.push(geo43Arc(A[0], A[1], 46, 0, -50 * Math.PI / 180, c43.amber, 2.2))
  parts.push(geo43Txt(150, 306, '50\u00b0', 12.5, c43.amber))
  parts.push(geo43Txt(76, 348, 'A', 13, c43.ink))
  parts.push(geo43Txt(396, 348, 'B', 13, c43.ink))
  parts.push(geo43Txt(258, 122, 'C', 13, c43.ink))
  parts.push(geo43Txt(210, 348, 'D', 13, c43.orange))
  parts.push(geo43Txt(148, 262, 'E', 13, c43.orange))
  parts.push(geo43Dot(A[0], A[1], c43.ink, 4))
  parts.push(geo43Dot(B[0], B[1], c43.ink, 4))
  parts.push(geo43Dot(C[0], C[1], c43.ink, 4))
  parts.push(geo43Dot(D[0], D[1], c43.orange, 4))
  parts.push(geo43Dot(E[0], E[1], c43.orange, 4))
  parts.push(geo43Txt(150, 366, 'AD = 4', 12, c43.orange))
  parts.push(geo43Txt(300, 366, 'AB = 10', 12, c43.green))
  parts.push(geo43Txt(64, 230, 'AC = 9', 12, c43.green, 'end'))
  parts.push(geo43Txt(112, 292, 'AE = 3.6', 12, c43.orange))
  parts.push(geo43Txt(330, 200, 'BC \u2248 8.0807320', 12, c43.green))
  parts.push(geo43Txt(262, 274, 'DE \u2248 3.2322928', 12, c43.orange))
  parts.push(geo43Rect(150, 62, 340, 40, c43.panel, 0.9, c43.tealInk, 2))
  parts.push(geo43Txt(320, 88, 'AD/AB = AE/AC = DE/BC = 2/5', 13.5, c43.tealInk, 'middle', '700'))
  return geo43Svg(640, 380, aria, parts)
}

export const lessonGeo403: Lesson = {
  id: 'geo-the-similarity-criteria-aa-sas-sss',
  number: '4.3',
  title: 'The Similarity Criteria: AA, SAS, SSS',
  concepts: ['similarity criterion', 'AA (angle-angle)', 'SAS-similarity', 'SSS-similarity', 'RHS-similarity', 'included angle', 'indirect measurement', 'the ambiguous case'],
  objectives: [
    'Explain why a criterion is a short gate: the full check demands six measurements (three angles and three ratios), and AA needs only two because the angle sum forces the third angle',
    'Prove the AA criterion with the construction on the shared angle: the copied angle forces the parallel, and the Basic Proportionality Theorem forces every ratio',
    'Apply SAS-similarity and SSS-similarity with the common-ratio discipline, computing third sides by the law of cosines and areas by the k-squared law',
    'Refute the false gates: SSA re-armed for similarity (the ambiguous pair), the AAA relabelling, and the honest k = 1 collapse of the congruence criteria',
    'Run the shadow method for indirect measurement and choose the right criterion for a given figure',
  ],
  prerequisites: ['geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
  sources: ['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. why criteria at all                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Why criteria at all: the price of the full check' },
    {
      kind: 'para',
      text: 'Lesson 4.1 defined similarity honestly, and the honest definition is expensive. To certify that triangle $ABC$ is similar to triangle $PQR$ in a named correspondence, the definition demands every corresponding angle equal AND every corresponding side in one common ratio $k$ \u2014 and if you count what that really takes, the bill is six measurements: three angle equalities and three side ratios, each one checked, each one vulnerable to arithmetic error, and every one of them requiring data you may not even have. A surveyor holding a sextant and a tape measure cannot afford six measurements per triangle. A geometer staring at a figure with only two angles marked on it cannot run the full check at all. This lesson is about what the last two lessons secretly built: the discovery that the six demands are not independent, that a small handful of them drags the rest along, and that the SHORT LIST is enough to certify the whole contract. A short list that certifies the full contract is called a criterion, and the congruence chapter has already rehearsed the idea: SAS, ASA, SSS and RHS were exactly such short lists for the $k = 1$ case. Now the scale factor is freed, and the criteria come with it.',
    },
    {
      kind: 'para',
      text: 'The echo of Chapter 3 is worth one deliberate sentence before the new work, because the whole structure of this lesson is the congruence chapter replayed one tone lower. There, the question was which small sets of equalities force ALL SIX equalities of congruence; here, the question is which small sets of angle equalities and ratio equalities force the full similarity contract \u2014 three equal angles plus one common $k$. The answer will look almost illegally frugal. Two angles are enough (the AA criterion). Two sides in a common ratio with the included angle equal are enough (SAS-similarity). Three sides in a common ratio are enough (SSS-similarity). And for right triangles, the right angle plus the hypotenuse ratio and one leg ratio are enough (RHS-similarity). Each criterion is a GATE: show the checkpoint data, cite the gate by name, and the entire similarity contract is licensed \u2014 every angle, every ratio, every consequence, including the area law $k^2$ from Lesson 4.1 that we shall re-earn rather than assume.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A criterion is a short gate, not a weaker contract',
      text: 'Be precise about what a criterion does and does not do. It does NOT weaken the definition of similarity \u2014 the contract is still three equal angles and one common ratio $k$ across all three sides. It CERTIFIES the full contract from a fragment of the data, the way a signature certifies a whole document. When we write triangle $ABC \\sim DEF$ by AA, we have not lowered the bar; we have shown that two measurements drag the other four along by mathematical force. The discipline of this lesson is watching that force at work \u2014 and, just as carefully, watching where it FAILS, because SSA-style data will refuse to certify anything and the lesson will refuse to look away.',
    },
    {
      kind: 'table',
      caption: 'The cost census: what the full definition demands against what each gate demands \u2014 the engine recomputes the dependency column before this prose stands',
      head: ['The check', 'Measurements it demands', 'What frees the rest'],
      rows: [
        ['the full definition (4.1)', '3 angle equalities + 3 side ratios = 6', 'nothing \u2014 the honest, expensive check'],
        ['AA', '2 angle equalities', 'the angle sum $180^\\circ$ forces the third angle; the BPT then forces the ratios'],
        ['SAS-similarity', '2 side ratios (one common $k$) + 1 included angle', 'the law of cosines builds the third side at scale $k$'],
        ['SSS-similarity', '3 side ratios (one common $k$)', 'the law of cosines hands back all three angles'],
        ['RHS-similarity', 'right angle + hypotenuse ratio + 1 leg ratio', 'Pythagoras builds the missing leg at scale $k$'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the table\u2019s last column slowly, because it is the engine of everything below: every gate is powered by a theorem that converts the fragment you measured into the parts you did not. AA is powered by the angle-sum property of Lesson 2.4 and then by the Basic Proportionality Theorem of Lesson 4.2 \u2014 the parallel-line ratio machine we have just finished earning. SAS-similarity is powered by the law of cosines, which manufactures the third side from the two sides and the included angle, at any scale we like. SSS-similarity is powered by the same law of cosines run backwards, converting three ratios into three angles. RHS-similarity is powered by Pythagoras \u2014 which is a pleasing circularity, since the NEXT lesson will prove Pythagoras BY similarity, cashing the chapter\u2019s biggest cheque. The criteria are not free gifts; they are theorems wearing badges, and each section of this lesson opens one of them and shows the machinery inside.',
    },

    /* -------------------------------------------------------------- */
    /* 2. AA                                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'AA: two angles are enough' },
    {
      kind: 'para',
      text: 'Begin with the frugal one, because its engine is a theorem the reader has owned since Lesson 2.4. Suppose triangle $ABC$ and triangle $PQR$ share two angles: $\u2220A = \u2220P = 40^\\circ$ and $\u2220B = \u2220Q = 60^\\circ$, say. The angle sum of a triangle is $180^\\circ$, so the third angles are FORCED: $\u2220C = 180^\\circ - 40^\\circ - 60^\\circ = 80^\\circ$ and $\u2220R = 180^\\circ - 40^\\circ - 60^\\circ = 80^\\circ$. One dependency, exploited: two angle equalities dragged a third along for free. What is remarkable \u2014 and what the construction proof below will establish \u2014 is that this is the whole story for the SHAPE. Any two triangles with the same two angles have the same three angles, and triangles with the same three angles are similar: the side ratios are not an extra freedom the triangles enjoy; they are locked to the angles. The engine verified it brutally before this paragraph was allowed to exist: at the pinned pair $40^\\circ$-$60^\\circ$-$80^\\circ$, the sides are proportional to $\\sin 40^\\circ$, $\\sin 60^\\circ$, $\\sin 80^\\circ$ \u2014 namely $0.6427876$, $0.8660254$, $0.9848078$ at unit size \u2014 and at ANY scale factor $k$ the three side ratios between the enlarged copy and the original all read exactly $k$. Same angles, any size, one common $k$: similar, always.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The AA criterion (Euclid VI.4, first half)',
      text: 'If two angles of one triangle are equal to two angles of another triangle \u2014 in a named correspondence \u2014 then the triangles are similar: the third angles are equal (forced by the angle sum $180^\\circ$), and all three pairs of corresponding sides are in one common ratio $k$. Two measurements in, the full contract out.',
    },
    {
      kind: 'para',
      text: 'Notice what the criterion does not say, because the omission is the power. It says nothing about sides. The triangles may be the size of a fingernail and the size of a football pitch; the criterion is deaf to size. It also does not ask WHICH two angles \u2014 any pair works, since knowing any two determines the third. And it quietly forbids a misreading: the equality must be read in a correspondence. $\u2220A = 40^\\circ$ answers $\u2220P = 40^\\circ$; $\u2220B = 60^\\circ$ answers $\u2220R = 60^\\circ$ if those are the two that match \u2014 the letters in the similarity statement triangle $ABC \\sim PRQ$ would then carry the correspondence, exactly as the letter discipline of Chapter 3 demands. A student who matches the $40$s but pairs the $60^\\circ$ with an $80^\\circ$ has not found a counterexample; they have misfiled the letters.',
    },
    {
      kind: 'derivation',
      title: 'The AA criterion proved: construct the copy, let the parallel force the ratios',
      statement: 'Let triangle $ABC$ and triangle $PQR$ have $\u2220A = \u2220P$ and $\u2220B = \u2220Q$. Then triangle $ABC \\sim PQR$: all three angles agree and the three side ratios share one common $k$.',
      steps: [
        {
          label: 'Reduce to a shared vertex',
          explanation: 'Similarity cares about shape, not position, so we may picture the proof on ONE triangle: lay a copy of the angle pair at the vertex $A$ of triangle $ABC$ itself. Concretely, pick $D$ on side $AB$ and draw through $D$ the line that copies $\u2220B$; the copy meets $AC$ at a point $E$. The claim to prove is that triangle $ADE$ is similar to triangle $ABC$ \u2014 then the same argument transplants to any two triangles sharing two angles.',
        },
        {
          label: 'The copied angle forces the parallel',
          formula: '\u2220ADE = \u2220ABC \u21d2 DE \u2225 BC',
          explanation: 'The angle at $D$ between $DA$ (which lies along $BA$) and $DE$ equals the angle at $B$ between $BA$ and $BC$, in exactly the corresponding position: by the converse of the corresponding-angles law of Lesson 2.2, the line $DE$ is parallel to $BC$. This is the hinge of the whole proof \u2014 an angle copied in the right position becomes a parallel.',
        },
        {
          label: 'The parallel forces the ratios (the BPT)',
          formula: 'AD/AB = AE/AC',
          explanation: 'Now the Basic Proportionality Theorem of Lesson 4.2 \u2014 Thales\u2019 theorem, Euclid VI.2 \u2014 takes over: a line parallel to one side of a triangle cuts the other two sides proportionally. So $\\frac{AD}{DB}$... no, in its cleanest form: $\\frac{AD}{AB} = \\frac{AE}{AC}$. Two of the three ratios are forced equal, and the engine\u2019s numbers below pin the value.',
        },
        {
          label: 'The third ratio rides along',
          formula: 'DE/BC = AD/AB',
          explanation: 'The same parallelism, read with the intercept machinery of Lesson 4.2, gives the third ratio: the segment $DE$ cut off between the parallel lines is the SAME fraction of $BC$. So all three ratios agree \u2014 one common $k$, which is $\\frac{AD}{AB}$ here, a number between 0 and 1 read small-to-big as the copy sits inside the original.',
        },
        {
          label: 'Conclude and transplant',
          explanation: 'Triangle $ADE$ has the angles of triangle $ABC$ (shared at $A$, copied at $D$, forced at $E$ by the angle sum) and all three sides in the common ratio $\\frac{AD}{AB}$: triangle $ADE \\sim ABC$. Any triangle sharing two angles with $ABC$ is a relocated, rescaled copy of this construction, so the proof is complete \u2014 AA is a criterion.',
        },
        {
          label: 'The engine\u2019s numerical witness',
          formula: 'A=(0,0),\ B=(10,0),\ C = 8\\text{ at } 40^\\circ,\ D=(6,0)',
          explanation: 'With $\u2220A = 40^\\circ$, $AB = 10$, $AC = 8$ and $AD = 6$, the brute coordinate intersection puts $E$ at exactly $0.6$ of the way to $C$: $AE = 4.8$, $DE \\approx 3.8621031$ against $BC \\approx 6.4368384$, and all three ratios read $3/5$ to the last digit. The parallel did the work; the arithmetic merely watched.',
        },
      ],
      result: 'AA is a criterion: two shared angles force the third (angle sum) and force all three side ratios into one common $k$ (the parallel-line construction plus the BPT). On the witness: $AD/AB = AE/AC = DE/BC = 3/5$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 \u2014 the AA construction proof. Triangle ABC (green) with the angle 40\u00b0 at A; the copy triangle ADE (orange) built on the same vertex with AD = 6 on the 10-side. The copied angle at D forces DE parallel to BC, and the Basic Proportionality Theorem forces every ratio: AD/AB = AE/AC = DE/BC = 3/5, with AE = 4.8, DE \u2248 3.8621031 and BC \u2248 6.4368384 \u2014 all three ratios recomputed by the engine\u2019s coordinate intersection.',
      svg: geo43AAProof('The AA construction proof: a green triangle ABC with an orange copy ADE on the shared 40 degree angle at A, the side DE parallel to BC, and the three ratios AD over AB, AE over AC and DE over BC all equal to three fifths.'),
    },
    {
      kind: 'para',
      text: 'Sit with the shape of that proof for a moment, because it is the chapter\u2019s thesis in miniature. We did not verify six demands; we verified two, and then deployed two banked theorems \u2014 the angle sum and the BPT \u2014 to convert them into the rest. The construction on the shared angle is worth drawing by hand at least once in a geometry life: draw any triangle, pick any point $D$ on one side, copy the far angle at $D$, and WATCH the new line run parallel to the far side. The parallel is not a coincidence you hope for; it is a logical consequence you can rely on, and once it is there, Thales\u2019 theorem of last lesson takes the wheel. This is also why AA, alone among the criteria, needs no side data whatsoever: the parallel construction manufactures the ratios from nothing but angles.',
    },

    /* -------------------------------------------------------------- */
    /* 3. SAS-similarity                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'SAS-similarity: the included angle holds the scale' },
    {
      kind: 'para',
      text: 'The congruence chapter\u2019s hardest-working criterion was SAS: two sides and the angle they enclose. Its similarity twin keeps the included angle EQUAL but relaxes the sides to a common RATIO \u2014 and the placement discipline survives untouched. The criterion: if $\u2220A = \u2220A\u2032$ and the two sides forming that angle satisfy $\\frac{A\u2032B\u2032}{AB} = \\frac{A\u2032C\u2032}{AC} = k$, the SAME $k$ on both pairs, then the triangles are similar. The included angle is not a decorative detail; it is the clamp that fixes the triangle\u2019s shape while the two sides stretch. Change the angle and the same two sides build a different triangle \u2014 that is exactly why the angle must be the included one, between the two sides whose ratio you took.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'SAS-similarity (Euclid VI.6, relaxed)',
      text: 'Two triangles are similar by SAS-similarity when one angle of the first equals one angle of the second (in the named correspondence) and the two sides INCLUDING that angle are in one common ratio $k$ \u2014 the same $k$ for both pairs, with its direction stated. The conclusion is the full contract: third sides in the ratio $k$, all angles equal, areas in the ratio $k^2$.',
    },
    {
      kind: 'para',
      text: 'The pinned witness pair deserves to be computed slowly, because every number in it is engine-verified and each one teaches. Small triangle: sides $4$ and $6$ enclosing $60^\\circ$. Large triangle: sides $6$ and $9$ enclosing $60^\\circ$. The ratio discipline first: $\\frac{6}{4} = \\frac{3}{2}$ and $\\frac{9}{6} = \\frac{3}{2}$ \u2014 the SAME $k$ on both pairs, $k = \\frac{3}{2}$ read small-to-big. The included angles agree at $60^\\circ$. SAS-similarity applies, and now the machine pays out. Third sides by the law of cosines: the small one is $\\sqrt{4^2 + 6^2 - 2 \u00b7 4 \u00b7 6 \u00b7 \\cos 60^\\circ} = \\sqrt{16 + 36 - 24} = \\sqrt{28} = 5.2915026$, and the large one is $\\sqrt{6^2 + 9^2 - 2 \u00b7 6 \u00b7 9 \u00b7 \\cos 60^\\circ} = \\sqrt{36 + 81 - 54} = \\sqrt{63} = 7.9372539$. The third ratio: $\\frac{\\sqrt{63}}{\\sqrt{28}} = \\sqrt{\\frac{63}{28}} = \\sqrt{2.25} = 1.5$ EXACTLY \u2014 not approximately, exactly, because $63 = 2.25 \u00b7 28$ and the law of cosines is linear in the squares. The angle echo: both triangles carry the angles $60^\\circ$, $40.8933946^\\circ$, $79.1066054^\\circ$ (sum $180^\\circ$), because a triangle with all three sides in the ratio $k$ has all its angles cloned \u2014 the engine checks $\\sin \\alpha = \\frac{4 \\sin 60^\\circ}{\\sqrt{28}} = \\sqrt{3/7} = 0.6546537$ in BOTH triangles, the same fraction from the same law of sines.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 \u2014 the SAS-similarity witness. Left (green): sides 4 and 6 enclosing 60\u00b0, third side \u221a28 \u2248 5.2915026. Right (orange): sides 6 and 9 enclosing 60\u00b0, third side \u221a63 \u2248 7.9372539. The amber arcs mark the equal included angles; the tick marks carry the correspondence (single tick: 4 answers 6; double tick: 6 answers 9). The bridge reads k = 3/2 small \u2192 big, and 6/4 = 9/6 = \u221a63/\u221a28 = 3/2 on all three pairs.',
      svg: geo43SASPair('Two triangles side by side: the green one with sides 4 and 6 enclosing a marked 60 degree angle and third side root 28, the orange one with sides 6 and 9 enclosing a marked 60 degree angle and third side root 63, joined by an arrow labeled k equals three halves.'),
    },
    {
      kind: 'derivation',
      title: 'The area ratio re-earned: k-squared falls out of SAS-similarity',
      statement: 'Under SAS-similarity with common ratio $k$, the areas of the two triangles stand in the ratio $k^2$ \u2014 the law of Lesson 4.1, re-derived here from the criterion rather than assumed.',
      steps: [
        {
          label: 'Write both areas with the included angle',
          formula: 'A_1 = \\tfrac{1}{2}ab\\sin C,\\quad A_2 = \\tfrac{1}{2}(ka)(kb)\\sin C',
          explanation: 'The area formula needs two sides and the angle they enclose \u2014 exactly the data the criterion controls. If the small triangle has sides $a$ and $b$ enclosing angle $C$, the large one has $ka$ and $kb$ enclosing the SAME angle $C$ (that is the criterion\u2019s clause).',
        },
        {
          label: 'Take the ratio',
          formula: 'A_2/A_1 = k \u00b7 k \u00b7 1 = k^2',
          explanation: 'The halves cancel, the sines cancel (the angle is equal, not scaled), and the two side factors each contribute one factor of $k$. Two lengths multiply in an area, so the scale factor enters TWICE \u2014 once per dimension.',
        },
        {
          label: 'Witness it on the pinned pair',
          formula: 'A_1 = \\tfrac{1}{2} \u00b7 4 \u00b7 6 \u00b7 \\sin 60^\\circ = 6\\sqrt{3} = 10.3923048',
          explanation: 'The small area is $6\\sqrt{3}$; the large area is $\\tfrac{1}{2} \u00b7 6 \u00b7 9 \u00b7 \\sin 60^\\circ = 13.5\\sqrt{3} = 23.3826859$; and the ratio is $\\frac{13.5\\sqrt{3}}{6\\sqrt{3}} = 2.25 = \\left(\\frac{3}{2}\\right)^2$ exactly. The engine recomputed all three numbers before this line was written.',
        },
        {
          label: 'Read the direction honestly',
          explanation: 'The ratio $k^2 = 2.25$ here is read SMALL to BIG, because $k = \\frac{3}{2}$ was stated small-to-big. Reversing the read gives $\\frac{4}{9}$ \u2014 the reciprocal squared. The direction discipline of Lesson 4.1 is not pedantry; half the area errors in examinations are direction errors.',
        },
      ],
      result: 'Areas scale by $k^2$ under any similarity, and SAS-similarity shows it directly: $A_2 = k^2 A_1$. On the witness: $10.3923048 \\to 23.3826859$ with ratio $9/4$.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The two ways SAS-similarity dies',
      text: 'First, the ratios must AGREE: against sides $4, 6$ enclosing $60^\\circ$, the pair $6, 8$ enclosing $60^\\circ$ has ratios $\\frac{6}{4} = \\frac{3}{2}$ but $\\frac{8}{6} = \\frac{4}{3}$ \u2014 no common $k$, no criterion. The engine\u2019s verdict on the third sides is unambiguous: $\\sqrt{28} = 5.2915026$ against $\\sqrt{52} = 7.2111026$, ratio $1.3627703$, which is NOT $1.5$, and the angles opposite the second side read $79.1066054^\\circ$ against $73.8978862^\\circ$. Second, the angle must be INCLUDED: slide the same $60^\\circ$ to a non-included position and you have SSA data \u2014 the section on the negative census will show two different triangles living on exactly that data set. And a warning from the run-130 pin engine, recorded here so the reader never makes it: the $k = \\frac{3}{2}$ image of the side pair $(4, 6)$ is $(6, 9)$ \u2014 multiply BOTH sides by $\\frac{3}{2}$. The pair $(9, 13.5)$ is the image under $k = \\frac{9}{4}$, a different scale entirely; swapping the two was a first-draft error the engine caught, and the lesson keeps the scar as a caution.',
    },
    {
      kind: 'example',
      title: 'The SAS third-side ladder. For the pair $4, 6$ enclosing $60^\\circ$ against $6, 9$ enclosing $60^\\circ$: verify the criterion\u2019s hypotheses, compute both third sides by the law of cosines, confirm the third ratio, and read off both areas and their ratio.',
      steps: [
        'Sol. Check the gate first: the included angles are both $60^\\circ$, and the side ratios read $\\frac{6}{4} = \\frac{3}{2}$ and $\\frac{9}{6} = \\frac{3}{2}$ \u2014 one common $k = \\frac{3}{2}$ (small $\\to$ big). SAS-similarity applies.',
        'Compute the small third side: $c^2 = 4^2 + 6^2 - 2 \u00b7 4 \u00b7 6 \u00b7 \\cos 60^\\circ = 16 + 36 - 24 = 28$, so $c = \\sqrt{28} = 5.2915026$.',
        'Compute the large third side: $c\u2032^2 = 6^2 + 9^2 - 2 \u00b7 6 \u00b7 9 \u00b7 \\cos 60^\\circ = 36 + 81 - 54 = 63$, so $c\u2032 = \\sqrt{63} = 7.9372539$.',
        'Confirm the third ratio: $\\frac{c\u2032}{c} = \\frac{\\sqrt{63}}{\\sqrt{28}} = \\sqrt{\\frac{63}{28}} = \\sqrt{2.25} = 1.5$ exactly \u2014 the common $k$ holds on the pair the criterion never measured.',
        'Read the areas: $\\tfrac{1}{2} \u00b7 4 \u00b7 6 \u00b7 \\sin 60^\\circ = 6\\sqrt{3} = 10.3923048$ and $\\tfrac{1}{2} \u00b7 6 \u00b7 9 \u00b7 \\sin 60^\\circ = 13.5\\sqrt{3} = 23.3826859$.',
        'Conclude: ratio of areas $= \\frac{23.3826859}{10.3923048} = 2.25 = \\left(\\frac{3}{2}\\right)^2 = k^2$ \u2014 areas by $k^2$, lengths by $k$, exactly as the scaling laws demand.',
      ],
      figures: [
        {
          caption: 'The law-of-cosines ladder for the SAS pair: the two triangles with their computed third sides \u221a28 = 5.2915026 and \u221a63 = 7.9372539, the third-ratio check 63/28 = 2.25 under the square root, and the two areas 6\u221a3 = 10.3923048 and 13.5\u221a3 = 23.3826859 with ratio 9/4 = k\u00b2.',
          svg: geo43Ladder('The law of cosines ladder: a small green triangle with sides 4 and 6 at 60 degrees and third side root 28, a large orange one with 6 and 9 at 60 degrees and third side root 63, and a panel computing the cosines, the exact ratio 1.5, and the areas with ratio 9 fourths.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 4. SSS-similarity                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'SSS-similarity: the honest ratio census' },
    {
      kind: 'para',
      text: 'The third gate asks for all three sides \u2014 and pays back the whole angle list. The criterion: if the three sides of one triangle and the three sides of another stand in one common ratio $k$ \u2014 $\\frac{a\u2032}{a} = \\frac{b\u2032}{b} = \\frac{c\u2032}{c}$, the SAME $k$ across all three pairs, in the correspondence your letters name \u2014 the triangles are similar. The proof idea is the law of cosines run in reverse: the angle opposite side $a$ satisfies $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$, and if every side in that fraction carries a factor of $k$, the $k$s cancel top and bottom \u2014 the cosine, hence the angle, is identical in the two triangles. Three ratios in, three angles out, and the third ratio confirms the contract the first two only promised.',
    },
    {
      kind: 'para',
      text: 'The pinned witness is the oldest triple in this book. Small triangle $6, 8, 10$; large triangle $9, 12, 15$. The census, pair by pair: $\\frac{9}{6} = \\frac{3}{2}$, $\\frac{12}{8} = \\frac{3}{2}$, $\\frac{15}{10} = \\frac{3}{2}$ \u2014 one common $k = \\frac{3}{2}$, small to big, all three rows green. The law of cosines then hands back the angles, and they are old friends: opposite the $6$-side (and the $9$) sits $\\arccos 0.8 = 36.8698976^\\circ$; opposite the $8$-side (and the $12$) sits $\\arccos 0.6 = 53.1301024^\\circ$; opposite the $10$ (and the $15$) sits $90^\\circ$ \u2014 both are right triangles, the $3$-$4$-$5$ shape doubled and tripled. The engine verified the fractions directly: $\\frac{36 + 100 - 64}{2 \u00b7 6 \u00b7 10} = \\frac{72}{120} = 0.6$ and $\\frac{81 + 225 - 144}{2 \u00b7 9 \u00b7 15} = \\frac{162}{270} = 0.6$ \u2014 identical cosine fractions from scaled sides, which is the whole proof in two lines of arithmetic.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 \u2014 the SSS ratio census. The 6-8-10 triangle (green) and the 9-12-15 triangle (orange) with the three per-pair ratio chips 9/6 = 3/2, 12/8 = 3/2, 15/10 = 3/2 and the angle echo 36.87\u00b0, 53.13\u00b0, 90\u00b0 in both. The lower strip is the counter: swap the 10-side for an 11-side and the third ratio reads 15/11 \u2248 1.3636 \u2014 the census refuses.',
      svg: geo43SSSCensus('The SSS ratio census: a green 6-8-10 right triangle and an orange 9-12-15 right triangle with three ratio chips all reading three halves, and a red counter strip showing that replacing the 10 side by an 11 side breaks the third ratio to about 1.36.'),
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The honest check: k must be the SAME across ALL pairs',
      text: 'Two matching ratios do not license the third. Take $6, 8, 11$ against $9, 12, 15$: the census reads $\\frac{9}{6} = \\frac{3}{2}$ and $\\frac{12}{8} = \\frac{3}{2}$ \u2014 two green rows \u2014 but the third reads $\\frac{15}{11} = 1.3636364$, and $1.3636364 \\ne 1.5$. No common $k$, so no similarity, and the failure is visible in the angles: the angle opposite the $11$-side has cosine $\\frac{36 + 64 - 121}{96} = \\frac{-21}{96} = -0.21875$, an obtuse $102.6356251^\\circ$, while the angle opposite the $15$ is exactly $90^\\circ$. Both triangles are genuine (the engine checks all six triangle inequalities \u2014 $6 + 8 = 14 > 11$ and $9 + 12 = 21 > 15$), so nothing dismisses the witness on a technicality: it stands as the permanent counterexample to reading two ratios and stopping.',
    },
    {
      kind: 'example',
      title: 'The SSS check, pair by pair. For triangles with sides $6, 8, 10$ and $9, 12, 15$: run the full ratio census, confirm the angles by the law of cosines, and then run the honest swap \u2014 the same census on $6, 8, 11$ against $9, 12, 15$ \u2014 and state both verdicts with reasons.',
      steps: [
        'Sol. Run the census: $\\frac{9}{6} = \\frac{3}{2}$, $\\frac{12}{8} = \\frac{3}{2}$, $\\frac{15}{10} = \\frac{3}{2}$ \u2014 three green rows, one common $k = \\frac{3}{2}$ (small $\\to$ big). SSS-similarity applies.',
        'Confirm an angle: opposite the $8$-side, $\\cos B = \\frac{6^2 + 10^2 - 8^2}{2 \u00b7 6 \u00b7 10} = \\frac{72}{120} = 0.6$; opposite the $12$-side, $\\cos B\u2032 = \\frac{9^2 + 15^2 - 12^2}{2 \u00b7 9 \u00b7 15} = \\frac{162}{270} = 0.6$ \u2014 equal cosines from scaled sides.',
        'Read the whole angle list: $36.8698976^\\circ$, $53.1301024^\\circ$, $90^\\circ$ in both triangles \u2014 the $3$-$4$-$5$ shape at two scales, with the right angle opposite the $10$ and the $15$.',
        'Now the honest swap: replace the $10$-side by $11$. The census reads $\\frac{9}{6} = \\frac{3}{2}$, $\\frac{12}{8} = \\frac{3}{2}$, $\\frac{15}{11} = 1.3636364$ \u2014 the third row breaks the pattern.',
        'Diagnose in the angles: $\\cos = \\frac{36 + 64 - 121}{96} = -0.21875$ gives $102.6356251^\\circ$ opposite the $11$, while the $15$ still faces $90^\\circ$ \u2014 obtuse against right, shapes genuinely different.',
        'Conclude: $6, 8, 10 \\sim 9, 12, 15$ by SSS-similarity with $k = \\frac{3}{2}$; $6, 8, 11$ is NOT similar to $9, 12, 15$ \u2014 two green rows and one red is a refusal, not a majority vote.',
      ],
      figures: [
        {
          caption: 'The SSS check walk: the three ratio rows 9/6 = 3/2, 12/8 = 3/2, 15/10 = 3/2 with the verdict SIMILAR \u2014 k = 3/2, the angle echo 36.87\u00b0, 53.13\u00b0, 90\u00b0 in both triangles, and the honest-swap counter strip where 15/11 \u2248 1.3636 refuses the gate.',
          svg: geo43SSSCheck('The SSS check: two right triangles with three green ratio chips reading three halves and a verdict strip, then a red counter strip where swapping the 10 side for an 11 side makes the third ratio read about 1.36 and refuse similarity.'),
        },
      ],
    },
    {
      kind: 'para',
      text: 'One more piece of honesty belongs to SSS-similarity, because it is the criterion students most often run sloppily. The three ratios must be taken in the CORRESPONDENCE the letters name \u2014 $\\frac{a\u2032}{a}$ against $\\frac{b\u2032}{b}$ against $\\frac{c\u2032}{c}$, not a sorted comparison of multisets. For the witness pair the sorted reading happens to work because both triangles are right and the correspondence is legible; in general, the discipline is Chapter 3\u2019s: name the correspondence first, then check what it demands. And notice the pleasing economy of the three gates so far: AA measures NO sides, SAS-similarity measures two sides and one angle, SSS-similarity measures three sides and no angles. Between them they cover every way a triangle\u2019s data can arrive \u2014 which is exactly what makes them worth naming.',
    },

    /* -------------------------------------------------------------- */
    /* 5. RHS-similarity                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'RHS-similarity: the right-angle short gate' },
    {
      kind: 'para',
      text: 'Chapter 3 gave right triangles their own congruence gate \u2014 RHS: right angle, hypotenuse, one side \u2014 and the similarity family inherits it. The criterion: if two right triangles have their hypotenuses in a ratio $k$ and ONE pair of legs in the same ratio $k$, the triangles are similar, and the remaining legs are forced into the ratio $k$ by Pythagoras. The engine\u2019s witness is the $(5, 12, 13)$ triangle against its double $(10, 24, 26)$: $10^2 + 24^2 = 100 + 576 = 676 = 26^2$, so the large one is genuinely right; the ratios read $\\frac{10}{5} = \\frac{24}{12} = \\frac{26}{13} = 2$ on hypotenuse and BOTH legs; $k = 2$, small to big. The forcing is worth seeing written out, because it is Pythagoras doing criterion work a chapter before the next lesson proves Pythagoras BY similarity \u2014 a circularity we shall enjoy openly. If $\\frac{h\u2032}{h} = \\frac{a\u2032}{a} = k$, then $b\u2032 = \\sqrt{h\u2032^2 - a\u2032^2} = \\sqrt{k^2 h^2 - k^2 a^2} = k\\sqrt{h^2 - a^2} = k \u00b7 b$: the subtraction under the square root is linear in the squares, so the square root hands back exactly one factor of $k$. The engine confirms it on a second family: $8, 15, 17$ at $k = 1.5$ gives $12, 22.5, 25.5$, and indeed $12^2 + 22.5^2 = 144 + 506.25 = 650.25 = 25.5^2$.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'RHS-similarity (the right triangle\u2019s own gate)',
      text: 'If two right triangles have equal right angles, and their hypotenuses are in the ratio $k$ while one pair of corresponding legs is in the SAME ratio $k$, then the triangles are similar: the other legs are in the ratio $k$ (Pythagoras forces them), all acute angles agree, and areas are in the ratio $k^2$. At $k = 1$ this is exactly Chapter 3\u2019s RHS congruence criterion \u2014 hypotenuse and one side equal, right angle equal.',
    },
    {
      kind: 'para',
      text: 'Two remarks keep the gate honest. First, the right angle must be KNOWN \u2014 not assumed because a figure looks square. In the witness pair the engine verifies both right angles by Pythagoras before the criterion is allowed to speak; in an examination you cite the right angle from the data (a marked square, the word \u201cperpendicular\u201d, a vertical against a level ground). Second, the hypotenuse must be matched with the hypotenuse. The ratio is taken on the longest sides of the two triangles; pairing a hypotenuse with a leg is the RHS version of the correspondence error, and it produces confident nonsense \u2014 against $(5, 12, 13)$, the pair $(10, 24, 26)$ has leg $24$ which exceeds the small hypotenuse $13$, and a moment\u2019s thought about which side is longest saves the whole computation. With those two cautions banked, RHS-similarity is the fastest gate in the house for the right-triangle figures that dominate shadow, ladder and mirror problems \u2014 including the shadow method this lesson cashes below.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the negative census                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The negative census: SSA dies, AAA is AA, congruence is k = 1' },
    {
      kind: 'para',
      text: 'A chapter that names the true gates owes the reader the false ones, named with equal care. The negative census has three entries, and the first is the old enemy from Lesson 3.2, re-armed for similarity. SSA data \u2014 two sides and an angle NOT included between them \u2014 fails for congruence because one data set can carry two triangles; it fails for similarity for the same reason, and the failure is sharper to state: TWO sides in a common ratio plus an equal non-included angle do NOT force similarity. The witness is the ambiguous pair itself, used at $k = 1$. Fix $\u2220A = 30^\\circ$, the adjacent side $b = 7$, and the opposite side $a = 5$. The law of cosines, written as a quadratic in the third side $c$, reads $c^2 - 7\\sqrt{3} \u00b7 c + 24 = 0$, and BOTH roots are positive: $c = \\frac{7\\sqrt{3} - \\sqrt{51}}{2} = 2.4914636$ and $c = \\frac{7\\sqrt{3} + \\sqrt{51}}{2} = 9.6328920$ (sum $7\\sqrt{3} = 12.1243557$, product $24$ \u2014 the engine checks both). Each root builds a genuine triangle \u2014 all six triangle inequalities hold \u2014 and the two triangles share $a = 5$, $b = 7$ and $\u2220A = 30^\\circ$ exactly. Two sides in common ratio $1$; an equal angle; and the triangles are NOT similar, because $c$ differs (the ratio $\\frac{9.6328920}{2.4914636} = 3.8663$ is not $1$) and the angles disagree: $\u2220B = 135.5729960^\\circ$ in the fat triangle, $\u2220B = 44.4270040^\\circ$ in the thin one \u2014 a supplementary pair, which is the algebra\u2019s way of saying both roots share a sine.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 \u2014 the SSA failure re-armed for similarity. The data A = 30\u00b0, b = 7, a = 5: the circle of radius a = 5 about C cuts the base ray twice, at B\u2081 (c \u2248 2.4914636, fat triangle, \u2220B\u2081 \u2248 135.5729960\u00b0) and B\u2082 (c \u2248 9.6328920, thin dashed triangle, \u2220B\u2082 \u2248 44.4270040\u00b0). Both triangles carry the same a, the same b and the same angle A \u2014 two sides in common ratio 1 with an equal non-included angle \u2014 and they are still not similar. (Adapted from Lesson 3.2\u2019s ambiguous-case figure; every number recomputed by this lesson\u2019s engine.)',
      svg: geo43SSAFail('The SSA ambiguous pair: a green fat triangle and an orange dashed thin triangle sharing the vertex A with a 30 degree angle, the side b equals 7 along the upper ray, and both triangles closing with a side of length 5 from C to two different base points.'),
    },
    {
      kind: 'para',
      text: 'Why does the re-arming matter, when the congruence chapter already killed SSA? Because the similarity version is the trap students actually fall into: they see two proportional sides and one equal angle, and the phrase \u201ctwo sides and an angle\u201d feels like SAS. It is not. The criterion demands the angle INCLUDED between the two sides whose ratios you took; SSA has the angle opposite one of them. The witness makes the difference visceral: the same $a$, $b$ and $\u2220A$ close into a fat triangle and a thin one, and no common $k$ can reconcile $c = 2.4914636$ with $c = 9.6328920$. And the failure scales: double both triangles and the hypotheses persist at $k = 2$, quadruple them at $k = 4$ \u2014 the ambiguous pair kills the \u201ccriterion\u201d at every scale, which is why the engine pins the $k = 1$ witness as sufficient. When an examiner offers two proportional sides with an angle opposite one of them, the honest answer is that NOTHING is licensed until the angle\u2019s position is known.',
    },
    {
      kind: 'table',
      caption: 'The negative census: the data sets that certify nothing, each with its permanent witness',
      head: ['The false gate', 'What it demands', 'The witness that kills it'],
      rows: [
        ['SSA-similarity', 'two sides in a common ratio + an angle OPPOSITE one of them', '$A = 30^\\circ$, $b = 7$, $a = 5$: two triangles ($c = 2.4914636$ and $9.6328920$), not similar even at $k = 1$'],
        ['AAA as a new criterion', 'three angle equalities, advertised as stronger than AA', 'not false \u2014 EMPTY: the third equality is forced by the angle sum ($40 + 60 + 80 = 180$), so AAA is AA wearing a second hat'],
        ['two ratios out of three', 'two matching side ratios, third unchecked', '$6, 8, 11$ against $9, 12, 15$: ratios $3/2$, $3/2$, then $15/11 = 1.3636364$ \u2014 refused'],
        ['equal perimeters or areas', 'one agreeing number', 'Lesson 4.1\u2019s $2 \\times 6$ against $3 \\times 4$: same angles, same area $12$, ratios $1/3$ against $3/4$'],
      ],
    },
    {
      kind: 'para',
      text: 'The second census entry deserves its own paragraph, because it is a LABelling lesson rather than a failure. \u201cAAA\u201d is sometimes advertised as a similarity criterion distinct from AA, and the honest verdict is stranger than true or false: AAA is exactly AA, because the third angle equality is not an independent demand. Both angle triples sum to $180^\\circ$ (Lesson 2.4); match two pairs and the third pair matches by subtraction, $40^\\circ + 60^\\circ + 80^\\circ = 180^\\circ$ on both sides of the ledger. Three equations, one dependency, two free: writing \u201cAAA\u201d as the criterion is like signing a cheque twice \u2014 harmless, redundant, and mildly suspicious to an examiner who wants to know whether you understand WHICH measurements carry the force. This book\u2019s convention: say AA, and know why the third angle is free. (The relabelling does carry one legitimate echo: for CONGRUENCE, three equal angles certify nothing \u2014 Lesson 3.2\u2019s equilateral pair with sides $1$ and $2$ \u2014 which is precisely the gap that opens when $k$ is freed: equal angles force a common $k$, but never force $k = 1$.)',
    },
    {
      kind: 'derivation',
      title: 'The k = 1 collapse: congruence as the special case',
      statement: 'Set $k = 1$ in each similarity criterion and the congruence criteria of Chapter 3 fall out \u2014 the two chapters are one subject at two scales.',
      steps: [
        {
          label: 'SSS-similarity at k = 1',
          formula: 'a\u2032/a = b\u2032/b = c\u2032/c = 1 \u21d2 a\u2032 = a,\ b\u2032 = b,\ c\u2032 = c',
          explanation: 'A common ratio of $1$ is three equalities: SSS congruence. The engine\u2019s witness reads it directly on the pair $6, 8, 10$ against itself.',
        },
        {
          label: 'SAS-similarity at k = 1',
          formula: '\u2220A = \u2220A\u2032,\ \\tfrac{A\u2032B\u2032}{AB} = \\tfrac{A\u2032C\u2032}{AC} = 1',
          explanation: 'The included angle equal, both side ratios $1$: SAS congruence, Euclid I.4 \u2014 the proposition the congruence chapter proved by superposition.',
        },
        {
          label: 'RHS-similarity at k = 1',
          explanation: 'Right angles equal, hypotenuse ratio $1$, one leg ratio $1$: RHS congruence. On the witness: $13 = 13$, $5 = 5$, $12 = 12$ \u2014 the ratio demands have become equality demands, letter for letter.',
        },
        {
          label: 'What AA at k = 1 becomes',
          explanation: 'AA plus the demand $k = 1$ says: equal angles AND a side ratio of $1$ \u2014 which is the ASA/AAS family in disguise (two angles and any side fix the scale). The congruence chapter\u2019s angle criteria are the $k = 1$ shadows of the similarity chapter\u2019s angle criterion.',
        },
        {
          label: 'The reverse reading',
          explanation: 'The collapse runs one way only: the similarity criteria are STRICT generalisations. SAS congruence does not know what $\\frac{3}{2}$ means; SAS-similarity does, and at $k = 1$ it forgets on purpose. This is the cleanest example in elementary geometry of a theorem family generalising by freeing a parameter.',
        },
      ],
      result: 'Congruence is similarity at $k = 1$: SSS, SAS and RHS collapse onto their Chapter 3 twins, and AA at $k = 1$ is the ASA/AAS family. One subject, two scales.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Euclid\u2019s Book VI, where the criteria live',
      text: 'The similarity criteria are Euclid\u2019s Book VI, propositions 4 through 6: VI.4 ( equiangular triangles have proportional sides \u2014 our AA), VI.5 and VI.6 (proportional sides give equiangular triangles, and the SAS-similarity form), all of them riding on VI.2 \u2014 the Basic Proportionality Theorem that Lesson 4.2 earned by the equal-altitude area argument. Euclid\u2019s order is this lesson\u2019s order: prove the parallel-line ratio machine first, then cash it for the triangle criteria. The relabelling is ours (AA for \u201cequiangular\u201d, $k$ for Euclid\u2019s spoken proportions), and the RHS-similarity gate is the school tradition\u2019s addition \u2014 but the architecture, twenty-three centuries old, is exactly the one on this page.',
    },

    /* -------------------------------------------------------------- */
    /* 7. the shadow method                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The shadow method: Thales cashed' },
    {
      kind: 'para',
      text: 'Lesson 4.1 told the story and deferred the arithmetic; the criteria now pay for the deferral. A stick of height $1.5$ m stands on level ground and casts a shadow $2$ m long; at the same moment, a tree casts a shadow $12$ m long. How tall is the tree? The criterion analysis first, because the computation is only licensed by it. Each object with its shadow and its sunbeam forms a triangle: a right angle at the ground (vertical object on level ground), the sun\u2019s elevation angle at the tip of the shadow, and the object as the third side. The two triangles share the right angle AND the elevation angle \u2014 the same sun, at the same moment, rays effectively parallel \u2014 so the third angles agree too, and AA applies. Similar triangles: corresponding ratios equal. The height answers the height and the shadow answers the shadow, so $\\frac{h}{12} = \\frac{1.5}{2}$, and $h = 12 \\times 0.75 = 9$ m. The tree is nine metres tall, measured without touching it.',
    },
    {
      kind: 'example',
      title: 'The shadow computation, end to end. Stick 1.5 m with shadow 2 m; tree with shadow 12 m at the same moment. Establish the criterion, compute the height, and state the sun\u2019s elevation.',
      steps: [
        'Sol. Name the triangles: stick-triangle and tree-triangle, each with the right angle at the ground and the sun angle at the shadow tip.',
        'Open the gate: both are right (vertical on level ground) and share the sun\u2019s elevation (parallel rays, one moment) \u2014 two angles equal, so AA applies and the triangles are similar.',
        'Write the correspondence honestly: height answers height, shadow answers shadow, so $\\frac{h}{12} = \\frac{1.5}{2}$.',
        'Compute: $\\frac{1.5}{2} = 0.75$, so $h = 12 \\times 0.75 = 9$ m \u2014 the tree stands $9$ m.',
        'Bonus read, the elevation: $\\tan \\theta = \\frac{1.5}{2} = 0.75$, so $\\theta = 36.8698976^\\circ$ \u2014 the $3$-$4$-$5$ angle again, since $1.5 : 2 = 3 : 4$.',
        'Check the third angle for consistency: $90^\\circ + 36.8698976^\\circ = 126.8698976^\\circ$, leaving $53.1301024^\\circ$ at the treetop \u2014 the angle sum closes the audit.',
      ],
      figures: [
        {
          caption: 'The tree-shadow AA computation: the 1.5 m stick with its 2 m shadow and the 9 m tree with its 12 m shadow, the parallel sun rays dashed, right angles marked at the ground, and the proportion h/12 = 1.5/2 with h = 9 m \u2014 the elevation 36.87\u00b0 shared by both triangles.',
          svg: geo43Shadow('The shadow method: a small green stick with a 1.5 metre height and 2 metre shadow, a tall green tree with a 9 metre height and 12 metre shadow, dashed orange sun rays from the tops to the shadow tips, and a panel reading h over 12 equals 1.5 over 2 so h equals 9 metres.'),
        },
      ],
    },
    {
      kind: 'para',
      text: 'The method deserves its historical weight, because it is the oldest similar-triangles computation in the tradition \u2014 the story of Thales at the Great Pyramid, told in Lesson 4.1, is exactly this gate opened in Egypt around 600 BCE. And the method\u2019s fine print deserves the same weight. The ground must be LEVEL and the objects VERTICAL, or the right angles fail. The shadows must be measured AT THE SAME MOMENT, or the elevation angles drift apart \u2014 the sun moves about $15^\\circ$ an hour, which is more than enough to wreck the ratio. And the two triangles must be read in the right correspondence: the stick\u2019s height answers the tree\u2019s height, each shadow answers the other shadow; a student who divides a height by a shadow across the pair has not made a small error, they have answered a different question. Exercise 6 runs the workshop version \u2014 a $2.4$ m pole, a $3.2$ m shadow, a building whose shadow reads $24$ m \u2014 and the engine notes the pleasing fact that $\\frac{2.4}{3.2} = 0.75$ again: same sun, same ratios, $18$ m of building.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why AA is the shadow method\u2019s gate, and not SAS or SSS',
      text: 'Look at what the field actually offers: two right angles (free, from physics), one shared sun angle (free, from the sky). No side of either triangle is measurable except the shadows and the stick \u2014 the tree\u2019s height and both hypotenuses are precisely the unknowns. AA is the only gate that runs on angles alone, which is why indirect measurement is AA\u2019s home turf: the angles come free from the setup, and the one measurable pair of corresponding sides (stick against tree-shadow-cross-ratio) carries the scale. Choosing the gate that fits the DATA is the last skill of this lesson \u2014 and the workshop below drills it.',
    },

    /* -------------------------------------------------------------- */
    /* 8. choosing the gate                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Choosing the gate: criteria in the wild' },
    {
      kind: 'para',
      text: 'Examinations rarely announce their criteria; they hand you a figure with some marks on it and expect the gate to be identified, named and cited. The discipline is a two-second audit, run the same way every time. WHAT is marked? If two angle pairs are marked or derivable (vertical angles, shared angles, the parallel-line families of Chapter 2) \u2014 the gate is AA, and it is the only gate that needs nothing else. If two side pairs carry ratios or tick marks AND an angle is marked at the vertex where those sides MEET \u2014 the gate is SAS-similarity; check the two ratios agree before citing. If all three side pairs are given or computable \u2014 the gate is SSS-similarity; run the full census, all three rows. If the figure is built of right triangles with hypotenuses in view \u2014 RHS-similarity, matching hypotenuse to hypotenuse. And if the data is two sides with an angle opposite one of them \u2014 no gate; say so, and either find more data or walk away. The audit converts a mystery figure into a named citation in the time it takes to reread the given.',
    },
    {
      kind: 'table',
      caption: 'The gate census \u2014 what the figure hands you, which gate opens, and this lesson\u2019s engine-witnessed example of each row',
      head: ['The data in the figure', 'The gate', 'Engine-witnessed row'],
      rows: [
        ['two angle pairs (marked, vertical, shared or parallel-derived)', 'AA', 'the $40^\\circ$-$60^\\circ$-$80^\\circ$ pair: similar at any size, sides $\\propto \\sin$ of angles'],
        ['two side ratios agreeing + the INCLUDED angle marked', 'SAS', '$4, 6 @ 60^\\circ$ against $6, 9 @ 60^\\circ$: thirds $\\sqrt{28}$, $\\sqrt{63}$, ratio exactly $1.5$'],
        ['all three side pairs', 'SSS', '$6, 8, 10$ against $9, 12, 15$: ratios $3/2$, $3/2$, $3/2$, angles cloned'],
        ['right angles + hypotenuse ratio + one leg ratio', 'RHS', '$5, 12, 13$ against $10, 24, 26$: $k = 2$, third leg forced $24$'],
        ['two side ratios + angle OPPOSITE one of them', 'NO GATE', '$A = 30^\\circ$, $b = 7$, $a = 5$: the ambiguous pair, not similar'],
      ],
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: cite the gate, then cash it',
      text: 'The marking scheme for a similarity problem is almost always two marks for the criterion and the rest for the arithmetic \u2014 and the criterion marks are the cheapest in the paper when the audit above is automatic. Write the citation BEFORE the computation: \u201ctriangle $ABC \\sim PQR$ by AA ($\u2220A = \u2220P$ given, $\u2220B = \u2220Q$ vertically opposite)\u201d \u2014 naming the correspondence in the statement, as Chapter 3 drilled. Then cash: read the proportion in the same order the letters taught you, solve, and box the scale factor\u2019s DIRECTION with the answer. The three most expensive habits in examination similarity: citing SSA as SAS, stopping at two of three ratios in an SSS census, and multiplying by $k$ in the wrong direction on the area law. Each has a witness in this lesson; each costs nothing to avoid once it has a face.',
    },
    {
      kind: 'para',
      text: 'One last figure-first skill, because the wild rarely labels its triangles in correspondence order. When two triangles overlap \u2014 sharing a vertex, or nested one inside the other with a parallel side \u2014 redrawing them SEPARATELY, in the same orientation, is worth more than any formula. The shared angle marks itself; the parallel side pair converts to equal angles by Chapter 2\u2019s corresponding-angle law; and the separated picture makes the correspondence writable in letters, which is what the citation demands. The workshop\u2019s nested figures (Exercise 11\u2019s shared-vertex pair, Exercise 13\u2019s inner triangle) both yield to the same move: redraw, name, cite, cash. The engine verified both witnesses \u2014 Exercise 11\u2019s pair carries $\\frac{AD}{AB} = \\frac{12}{8} = \\frac{3}{2}$ with $AE = 15$ forced, and Exercise 13\u2019s construction reads $\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC} = \\frac{2}{5}$ on fresh numbers \u2014 before either exercise was written.',
    },
    {
      kind: 'para',
      text: 'This lesson banked four gates and two permanent refusals, and the chapter\u2019s account is now nearly settled. The definition of similarity (Lesson 4.1) said WHAT; the Basic Proportionality Theorem (Lesson 4.2) said WHY the ratios ride the parallels; this lesson said WHEN three measurements may stand in for six. What remains is the largest single debt in elementary geometry: Pythagoras, used without proof since the earliest chapters, is next proved twice \u2014 once by similar triangles (the altitude-on-hypotenuse split, Euclid VI.8 and VI.31) and once by areas \u2014 and the proof will run on nothing but the gates opened here. The reader who can cite AA, SAS-similarity, SSS-similarity and RHS-similarity, and refuse SSA with a witness, holds every tool the next lesson needs.',
    },

    /* -------------------------------------------------------------- */
    /* summary furniture: terms, formulas                              */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'similarity criterion', def: 'A short list of measurements that CERTIFIES the full similarity contract (three equal angles plus one common ratio $k$) without checking all six demands: a gate, not a weaker contract.' },
        { term: 'AA (angle-angle)', def: 'If two angles of one triangle equal two angles of another (in a named correspondence), the triangles are similar: the third angles are forced by the angle sum $180^\\circ$, and the side ratios by the parallel-line construction plus the BPT.' },
        { term: 'SAS-similarity', def: 'If one angle of each triangle is equal and the two sides INCLUDING that angle are in one common ratio $k$ (the same $k$ on both pairs), the triangles are similar; the third sides fall into the ratio $k$ by the law of cosines.' },
        { term: 'SSS-similarity', def: 'If the three pairs of corresponding sides are in one common ratio $k$ \u2014 all three, the honest census \u2014 the triangles are similar; the law of cosines hands back all three angles equal.' },
        { term: 'RHS-similarity', def: 'For right triangles: equal right angles, hypotenuses in the ratio $k$, and one pair of legs in the same ratio $k$ \u2014 then the remaining legs are forced into the ratio $k$ by Pythagoras, and the triangles are similar.' },
        { term: 'included angle', def: 'The angle formed by the two sides under discussion. SAS demands it; SSA has the angle opposite one of the sides instead, and dies by the ambiguous pair.' },
        { term: 'the ambiguous pair', def: 'The two genuine triangles carried by one SSA data set ($A = 30^\\circ$, $b = 7$, $a = 5$ gives $c = 2.4914636$ or $9.6328920$) \u2014 the permanent witness that two sides in a common ratio plus a non-included equal angle certify nothing.' },
        { term: 'indirect measurement', def: 'Computing an unreachable length by building a similar, measurable triangle (the shadow method) and reading the proportion \u2014 Thales\u2019 pyramid, the surveyor\u2019s tree, the workshop\u2019s building.' },
      ],
    },
    { kind: 'formula', name: 'AA criterion', latex: '\u2220A = \u2220D \\text{ and } \u2220B = \u2220E \u21d2 \u25b3ABC \\sim \u25b3DEF', note: 'Two angles in, the full contract out: the third angle is forced by the angle sum, the ratios by the BPT.' },
    { kind: 'formula', name: 'SAS-similarity criterion', latex: '\u2220A = \u2220D \\text{ and } \\frac{DE}{AB} = \\frac{DF}{AC} = k \u21d2 \u25b3ABC \\sim \u25b3DEF', note: 'The angle must be INCLUDED between the two sides whose ratios agree; areas then stand in the ratio $k^2$.' },
    { kind: 'formula', name: 'SSS-similarity criterion', latex: '\\frac{DE}{AB} = \\frac{EF}{BC} = \\frac{FD}{CA} = k \u21d2 \u25b3ABC \\sim \u25b3DEF', note: 'All three ratios, one common $k$ \u2014 two green rows and a red is a refusal ($6, 8, 11$ against $9, 12, 15$).' },
    { kind: 'formula', name: 'RHS-similarity criterion', latex: '\\text{right angles} + \\frac{h\u2032}{h} = \\frac{a\u2032}{a} = k \u21d2 \u25b3 \\sim \u25b3,\\ \\tfrac{b\u2032}{b} = k \\text{ forced}', note: 'Pythagoras builds the missing leg at scale $k$; at $k = 1$ this is Chapter 3\u2019s RHS congruence.' },
    { kind: 'formula', name: 'The shadow proportion', latex: '\\frac{\\text{height}}{\\text{shadow}} = \\frac{\\text{stick}}{\\text{stick shadow}}', note: 'AA in the field: $\\frac{h}{12} = \\frac{1.5}{2}$ gives $h = 9$ m \u2014 same sun, same moment, level ground.' },

    /* -------------------------------------------------------------- */
    /* quiz                                                           */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Check yourself: the four gates and the two refusals',
      items: [
        {
          q: 'Triangle $ABC$ has $\u2220A = 40^\\circ$ and $\u2220B = 60^\\circ$; triangle $PQR$ has $\u2220P = 40^\\circ$ and $\u2220Q = 80^\\circ$. The licensed verdict is \u2014',
          options: [
            'similar by AA \u2014 the 40° at $A$ answers the 40° at $P$, the 60° at $B$ answers $\u2220R = 60^\\circ$ (forced, since $180 - 40 - 80 = 60$), and the two 80° angles answer each other; no side is needed',
            'not similar \u2014 the 60° at $B$ has no partner, because triangle $PQR$ contains no 60° angle',
            'similar, but only after measuring one side in each triangle \u2014 angles alone never certify similarity',
            'congruent by ASA \u2014 two angles and the shared 40° fix both triangles completely',
            'not similar \u2014 the angle sums differ, $180^\\circ$ in one and $188^\\circ$ in the other',
          ],
          answer: 0,
          explain: 'Option (a) is the AA gate: the angle sum forces $\u2220C = 180 - 40 - 60 = 80^\\circ$ and $\u2220R = 180 - 40 - 80 = 60^\\circ$, so the triples read $40, 60, 80$ in both triangles and the correspondence $A \\leftrightarrow P$, $B \\leftrightarrow R$, $C \\leftrightarrow Q$ matches all three. Option (b) forgets $\u2220R$: the third angle of $PQR$ is exactly the missing $60^\\circ$. Option (c) is the definition-level anxiety this lesson retired \u2014 AA is precisely the criterion that certifies similarity from two angles with no side data. Option (d) invents side equalities: congruence would need a side, and even then $k$ is unknown. Option (e) is arithmetic fiction \u2014 every triangle\u2019s angles sum to $180^\\circ$.',
        },
        {
          q: 'One triangle has sides 4 and 6 enclosing $60^\\circ$; another has sides 6 and 9 enclosing $60^\\circ$. The third sides and their ratio are \u2014',
          options: [
            '$\\sqrt{28} = 5.2915026$ and $\\sqrt{63} = 7.9372539$, with ratio $2.25$ \u2014 the area-ratio law',
            '$5.2915026$ and $7.9372539$, but the pair is not similar \u2014 SAS-similarity would need all three sides given',
            '$5.2915026$ and $7.2111026$, with ratio $\\approx 1.3628$ \u2014 the scale drifts on the third pair',
            '6 and 9 \u2014 the equal included angle forces the third sides to copy the given sides exactly',
            '$\\sqrt{28} = 5.2915026$ and $\\sqrt{63} = 7.9372539$ by the law of cosines, and the ratio is exactly $1.5 = k$ \u2014 SAS-similarity applies',
          ],
          answer: 4,
          explain: 'Option (e) is the engine-verified read: $c^2 = 16 + 36 - 24 = 28$ and $c\u2032^2 = 36 + 81 - 54 = 63$, so $\\frac{\\sqrt{63}}{\\sqrt{28}} = \\sqrt{2.25} = 1.5$ EXACTLY \u2014 the common $k$ holds on the pair the criterion never measured. Option (a) quotes the AREA ratio $2.25 = k^2$, not the length ratio \u2014 the classic dimension slip. Option (b) misstates the criterion: two sides in a common ratio plus the included angle certify the whole contract, third side included. Option (c) describes a DIFFERENT pair \u2014 the failure witness $6, 8 @ 60^\\circ$, whose ratios $3/2$ and $4/3$ disagree. Option (d) confuses equality with ratio: the thirds are not 6 and 9.',
        },
        {
          q: 'Triangles with sides $6, 8, 11$ and $9, 12, 15$. The verdict is \u2014',
          options: [
            'similar by SSS-similarity \u2014 two of the three ratios already read $3/2$, and the third follows along',
            'similar by SSS-similarity \u2014 the perimeters $25$ and $36$ are in a clean ratio',
            'not similar \u2014 the census reads $\\frac{9}{6} = \\frac{3}{2}$ and $\\frac{12}{8} = \\frac{3}{2}$, but 15/11 $\\approx 1.3636$: the common $k$ must be the SAME on all three pairs',
            'similar by RHS-similarity \u2014 both triangles are right-angled',
            'undecidable from side data \u2014 only angles can open a gate',
          ],
          answer: 2,
          explain: 'Option (c) is the honest census: two green rows and one red is a REFUSAL, not a majority vote \u2014 $6, 8, 11$ against $9, 12, 15$ fails on $\\frac{15}{11}$, and the angles confirm it ($102.6356251^\\circ$ opposite the $11$ against $90^\\circ$ opposite the $15$). Option (a) is exactly the trap the warn callout pinned: the third ratio is not free to follow; it is a demand. Option (b) leans on perimeters, which Lesson 4.1 retired as certificates (the $2 \\times 6$ against $3 \\times 4$ witness). Option (d) is false on the data: $36 + 64 = 100 \\ne 121$, so the small triangle is not right. Option (e) is backwards \u2014 SSS-similarity is the all-sides gate, and it decides this pair firmly in the negative.',
        },
        {
          q: 'A stick of height 1.5 m casts a 2 m shadow; at the same moment, a tree casts a 12 m shadow. The tree\u2019s height is \u2014',
          options: [
            '6 m \u2014 heights and shadows exchange roles, so $12 \\div 2$',
            '9 m \u2014 AA gives $\\frac{h}{12} = \\frac{1.5}{2} = 0.75$, so $h = 12 \\times 0.75 = 9$ m',
            '16 m \u2014 the proportion read backwards: $12 \\times \\frac{2}{1.5}$',
            '12 m \u2014 at this sun angle every object equals its own shadow',
            'not computable \u2014 the sun\u2019s elevation angle is not given',
          ],
          answer: 1,
          explain: 'Option (b) is the shadow method: two right angles (level ground, vertical objects) plus the shared sun angle open the AA gate, height answers height and shadow answers shadow, and $\\frac{h}{12} = \\frac{1.5}{2}$ gives $h = 9$ m. Option (a) divides instead of multiplying by the shadow ratio $6$. Option (c) is the DIRECTION error \u2014 $\\frac{2}{1.5}$ is the reciprocal read, and $16$ m is what you get from it; the ratio must be taken in the order the correspondence names. Option (d) describes the special $45^\\circ$ moment when shadow equals height \u2014 the elevation here is $\\arctan 0.75 = 36.8698976^\\circ$, not $45^\\circ$. Option (e) misses the entire point of AA: the method works precisely BECAUSE the elevation cancels \u2014 both triangles share it, whatever it is.',
        },
        {
          q: 'The exact relation between Chapter 3\u2019s congruence criteria and this lesson\u2019s similarity criteria is \u2014',
          options: [
            'no relation \u2014 congruence and similarity share no checkpoints',
            'similarity relaxes the angle demands only; the side demands are identical in the two chapters',
            'AA at $k = 1$ becomes the SAS congruence criterion',
            'the congruence criteria are the $k = 1$ special cases: SSS-similarity at $k = 1$ is SSS congruence, SAS-similarity at $k = 1$ is SAS, and RHS-similarity at $k = 1$ is RHS',
            'the similarity criteria are weaker statements that certify less from less',
          ],
          answer: 3,
          explain: 'Option (d) is the collapse table: a common ratio of $1$ turns every ratio demand into an equality demand, so each similarity criterion specialises onto its Chapter 3 twin \u2014 and AA at $k = 1$ lands on the ASA/AAS family, not SAS. Option (a) ignores that SAS and RHS keep their letters across the chapters for exactly this reason. Option (b) has it backwards: the ANGLE demands survive (equal is equal) while the SIDE demands are what relax, from equality to common ratio. Option (c) mismatches the families \u2014 AA carries angles, so its $k = 1$ shadow is an angle-side criterion. Option (e) undervalues the criteria: similarity certifies the SAME six-fact contract from a fragment \u2014 the fragment is smaller, the contract is not.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* exercises                                                      */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercise set 4.3 \u2014 the gates, the refusals, the field work',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Triangle $ABC$ has $\u2220A = 40^\\circ$ and $\u2220B = 60^\\circ$; triangle $PQR$ has $\u2220P = 40^\\circ$ and $\u2220Q = 80^\\circ$. Decide whether the triangles are similar, and if so, name the full correspondence.',
              solution: [
                'Sol. Compute the forced thirds: $\u2220C = 180^\\circ - 40^\\circ - 60^\\circ = 80^\\circ$ and $\u2220R = 180^\\circ - 40^\\circ - 80^\\circ = 60^\\circ$.',
                'Match the angles: the $40^\\circ$ pair answers itself, $\u2220A \\leftrightarrow \u2220P$; the $60^\\circ$ at $B$ answers the forced $60^\\circ$ at $R$; the two $80^\\circ$ angles ($C$ and $Q$) answer each other.',
                'Cite the gate: two angle pairs match, so AA applies \u2014 no side data is needed or used.',
                'Hence the triangles are similar, with the correspondence $A \\leftrightarrow P$, $B \\leftrightarrow R$, $C \\leftrightarrow Q$ \u2014 the statement to write is triangle $ABC \\sim PRQ$, in that order.',
              ],
              answer: 'similar by AA: $A \\leftrightarrow P$ (40°), $B \\leftrightarrow R$ (60°), $C \\leftrightarrow Q$ (80°) \u2014 triangle $ABC \\sim PRQ$',
            },
            {
              q: 'Triangle $ABC \\sim PQR$ with scale factor $k = \\frac{3}{2}$ read $ABC \\to PQR$. Given $AB = 8$ and $AC = 10$, find $PQ$ and $PR$, and state what the criterion licenses about the angles.',
              solution: [
                'Sol. Read the direction first: $k = \\frac{3}{2}$ from $ABC$ to $PQR$ means every side of $PQR$ is $\\frac{3}{2}$ times its answering side in $ABC$.',
                'Compute the sides: $PQ = \\frac{3}{2} \\times 8 = 12$ (answering $AB$) and $PR = \\frac{3}{2} \\times 10 = 15$ (answering $AC$).',
                'License the angles: the similarity statement carries $\u2220P = \u2220A$, $\u2220Q = \u2220B$, $\u2220R = \u2220C$ \u2014 equal, not scaled; angles never carry $k$.',
                'Hence $PQ = 12$ and $PR = 15$, with all three angle pairs equal by the correspondence the statement names.',
              ],
              answer: '$PQ = 12$ and $PR = 15$; the angles satisfy $\u2220P = \u2220A$, $\u2220Q = \u2220B$, $\u2220R = \u2220C$ (equal, never scaled)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The SAS screen. One triangle has sides 5 and 10 enclosing $45^\\circ$; another has sides 6 and 12 enclosing $45^\\circ$. Decide similarity, find $k$, and compute both third sides, confirming the third ratio.',
              solution: [
                'Sol. Check the ratios: $\\frac{6}{5} = 1.2$ and $\\frac{12}{10} = 1.2$ \u2014 one common $k = \\frac{6}{5}$, with the included angles equal at $45^\\circ$. SAS-similarity applies.',
                'Compute the small third side: $c^2 = 25 + 100 - 2 \u00b7 5 \u00b7 10 \u00b7 \\cos 45^\\circ = 125 - 50\\sqrt{2}$, so $c \\approx 7.3681288$.',
                'Compute the large third side: $c\u2032^2 = 36 + 144 - 2 \u00b7 6 \u00b7 12 \u00b7 \\cos 45^\\circ = 180 - 72\\sqrt{2}$, so $c\u2032 \\approx 8.8417545$.',
                'Confirm the third ratio: $\\frac{8.8417545}{7.3681288} = 1.2$ exactly (its square is $\\frac{180 - 72\\sqrt{2}}{125 - 50\\sqrt{2}} = 1.44 = k^2$).',
                'Hence the triangles are similar by SAS-similarity with $k = \\frac{6}{5} = 1.2$ (small $\\to$ big), third sides $\\approx 7.3681288$ and $\\approx 8.8417545$ in the same ratio.',
              ],
              answer: 'similar by SAS-similarity, $k = \\frac{6}{5} = 1.2$; third sides $\\approx 7.3681288$ and $\\approx 8.8417545$, third ratio exactly 1.2',
            },
            {
              q: 'The SSS census. Triangles with sides $8, 10, 14$ and $12, 15, 21$: run the full three-row ratio census, verify one angle by the law of cosines, and state the verdict.',
              solution: [
                'Sol. Run the census: $\\frac{12}{8} = \\frac{3}{2}$, $\\frac{15}{10} = \\frac{3}{2}$, $\\frac{21}{14} = \\frac{3}{2}$ \u2014 three green rows, one common $k = \\frac{3}{2}$ (small $\\to$ big).',
                'Verify an angle: opposite the $14$-side, $\\cos = \\frac{64 + 100 - 196}{2 \u00b7 8 \u00b7 10} = \\frac{-32}{160} = -0.2$, an obtuse angle $\\approx 101.5369590^\\circ$.',
                'Check the answering angle: opposite the $21$-side, $\\cos = \\frac{144 + 225 - 441}{2 \u00b7 12 \u00b7 15} = \\frac{-72}{360} = -0.2$ \u2014 the same cosine, hence the same angle $\\approx 101.5369590^\\circ$.',
                'Hence similar by SSS-similarity with $k = \\frac{3}{2}$: the equal cosines from scaled sides are the criterion\u2019s proof running in front of your eyes.',
              ],
              answer: 'similar by SSS-similarity with $k = \\frac{3}{2}$; the angles opposite the $14$-side and the $21$-side both read $\\approx 101.5369590^\\circ$ (cos $= -0.2$ in both)',
            },
            {
              q: 'The refusal. Triangles with sides $5, 6, 10$ and $10, 12, 15$: run the census, give the verdict, and exhibit the disagreement in the angles.',
              solution: [
                'Sol. Run the census: $\\frac{10}{5} = 2$, $\\frac{12}{6} = 2$, but $\\frac{15}{10} = 1.5$ \u2014 the third row breaks the pattern; no common $k$ exists.',
                'Confirm in the angles: opposite the $10$-side, $\\cos = \\frac{25 + 36 - 100}{60} = \\frac{-39}{60} = -0.65$, so the angle is $\\approx 130.5416019^\\circ$ (very obtuse).',
                'Opposite the $15$-side: $\\cos = \\frac{100 + 144 - 225}{240} = \\frac{19}{240} \\approx 0.0792$, so the angle is $\\approx 85.4593327^\\circ$ \u2014 acute against very obtuse.',
                'Hence NOT similar: two matching ratios do not license the third, and the $130.5416019^\\circ$ against $85.4593327^\\circ$ is the shape disagreement made visible.',
              ],
              answer: 'NOT similar \u2014 the ratios read $2, 2, 1.5$: the third pair breaks the common $k$, and the big angles disagree ($\\approx 130.5416019^\\circ$ against $\\approx 85.4593327^\\circ$)',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The indirect-measurement workshop. A 2.4 m pole casts a 3.2 m shadow; at the same moment a building casts a 24 m shadow. Establish the criterion, compute the building\u2019s height, and state the sun\u2019s elevation.',
              solution: [
                'Sol. Name the triangles: pole-triangle and building-triangle, each right-angled at the ground (vertical objects, level ground) and sharing the sun\u2019s elevation at the shadow tip.',
                'Open the gate: two angles equal \u2014 the right angles and the shared elevation \u2014 so AA applies and the triangles are similar.',
                'Write the proportion: height answers height, shadow answers shadow, so $\\frac{h}{24} = \\frac{2.4}{3.2} = \\frac{3}{4} = 0.75$.',
                'Compute: $h = 24 \\times 0.75 = 18$ \u2014 the building stands 18 m.',
                'State the elevation: $\\tan \\theta = \\frac{2.4}{3.2} = 0.75$, so $\\theta = 36.8698976^\\circ$ \u2014 the same sun as the lesson\u2019s tree example, since $\\frac{1.5}{2} = 0.75$ as well.',
                'Hence the building is 18 m tall, measured without leaving the ground, with the elevation $36.8698976^\\circ$ as a free bonus of the same proportion.',
              ],
              answer: 'the building stands 18 m; the sun\u2019s elevation is $\\arctan 0.75 = 36.8698976^\\circ$ \u2014 the same 0.75 as the stick example ($2.4/3.2 = 3/4$)',
              figures: [
                {
                  caption: 'The workshop figure: the 2.4 m pole with its 3.2 m shadow against the 18 m building with its 24 m shadow, the dashed parallel sun rays, right angles at the ground, and the proportion h/24 = 2.4/3.2 = 3/4 \u2014 the AA gate opened in the field.',
                  svg: geo43Workshop('The indirect measurement workshop: a small green pole of 2.4 metres with a 3.2 metre shadow, a tall building of 18 metres with a 24 metre shadow, dashed orange sun rays, and a panel reading h over 24 equals 2.4 over 3.2 equals three quarters.'),
                },
              ],
            },
            {
              q: 'The SAS ladder, recomputed. For sides 4 and 6 enclosing $60^\\circ$ against 6 and 9 enclosing $60^\\circ$: verify the hypotheses, compute both third sides by the law of cosines, confirm the third ratio, and read both areas with their ratio.',
              solution: [
                'Sol. Verify the gate: the included angles are both $60^\\circ$; the ratios read $\\frac{6}{4} = \\frac{3}{2}$ and $\\frac{9}{6} = \\frac{3}{2}$ \u2014 one common $k = \\frac{3}{2}$ (small $\\to$ big). SAS-similarity applies.',
                'Small third side: $c^2 = 16 + 36 - 24 = 28$, so $c = \\sqrt{28} = 5.2915026$.',
                'Large third side: $c\u2032^2 = 36 + 81 - 54 = 63$, so $c\u2032 = \\sqrt{63} = 7.9372539$.',
                'Third ratio: $\\frac{\\sqrt{63}}{\\sqrt{28}} = \\sqrt{\\frac{63}{28}} = \\sqrt{2.25} = 1.5$ exactly \u2014 the $k$ the criterion promised.',
                'Areas: $\\frac{1}{2} \u00b7 4 \u00b7 6 \u00b7 \\sin 60^\\circ = 6\\sqrt{3} = 10.3923048$ and $\\frac{1}{2} \u00b7 6 \u00b7 9 \u00b7 \\sin 60^\\circ = 13.5\\sqrt{3} = 23.3826859$.',
                'Area ratio: $\\frac{23.3826859}{10.3923048} = 2.25 = \\frac{9}{4} = k^2$ \u2014 lengths by $k$, areas by $k^2$, both directions stated.',
              ],
              answer: 'thirds $\\sqrt{28} = 5.2915026$ and $\\sqrt{63} = 7.9372539$ (ratio exactly 1.5); areas $10.3923048$ and $23.3826859$ (ratio $\\frac{9}{4} = k^2$)',
            },
            {
              q: 'Both halves of the SSS story. First run the census on $6, 8, 10$ against $9, 12, 15$ and confirm one angle. Then swap the $10$-side for an $11$-side and show exactly where the census refuses.',
              solution: [
                'Sol. First census: $\\frac{9}{6} = \\frac{3}{2}$, $\\frac{12}{8} = \\frac{3}{2}$, $\\frac{15}{10} = \\frac{3}{2}$ \u2014 three green rows, $k = \\frac{3}{2}$, SSS-similarity applies.',
                'Confirm an angle: opposite the $10$-side, $\\cos = \\frac{36 + 64 - 100}{96} = 0$, so the angle is $90^\\circ$; opposite the $15$, the same computation gives $90^\\circ$ \u2014 both right, the $3$-$4$-$5$ family at two scales, with the full lists reading $36.8698976^\\circ$, $53.1301024^\\circ$, $90^\\circ$ in both triangles.',
                'Now the swap: $6, 8, 11$ against $9, 12, 15$. The census reads $\\frac{9}{6} = \\frac{3}{2}$, $\\frac{12}{8} = \\frac{3}{2}$, but $\\frac{15}{11} = 1.3636364 \\ne 1.5$ \u2014 the third row refuses.',
                'See it in the angles: opposite the $11$, $\\cos = \\frac{36 + 64 - 121}{96} = -0.21875$, an obtuse $\\approx 102.6356251^\\circ$; the $15$ still faces $90^\\circ$.',
                'Hence the first pair is similar with $k = \\frac{3}{2}$, and the swapped pair is NOT similar \u2014 two green rows and one red is a refusal, and both triangles in the second pair are genuine (all six inequalities hold).',
              ],
              answer: '$6, 8, 10 \\sim 9, 12, 15$ with $k = \\frac{3}{2}$ (angles $36.8698976^\\circ$, $53.1301024^\\circ$, $90^\\circ$ in both); $6, 8, 11$ is refused \u2014 the third ratio $\\frac{15}{11} \\approx 1.3636364$ breaks the pattern',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The RHS gate. Two right triangles have hypotenuses 13 and 26, with one pair of legs 5 and 10. Verify the right angles, find $k$, compute the remaining legs, and cite the criterion.',
              solution: [
                'Sol. Verify the right angles from the data: the small triangle\u2019s missing leg is $\\sqrt{169 - 25} = \\sqrt{144} = 12$, and $5^2 + 12^2 = 169 = 13^2$ \u2014 genuinely right.',
                'The large triangle\u2019s missing leg is $\\sqrt{676 - 100} = \\sqrt{576} = 24$, and $10^2 + 24^2 = 676 = 26^2$ \u2014 genuinely right.',
                'Read the ratios: $\\frac{26}{13} = 2$ on the hypotenuses and $\\frac{10}{5} = 2$ on the given legs \u2014 the same $k = 2$ (small $\\to$ big).',
                'The remaining legs confirm: $\\frac{24}{12} = 2$ \u2014 Pythagoras forced the third ratio, exactly as the criterion promises.',
                'Hence similar by RHS-similarity with $k = 2$: right angles, hypotenuse ratio, one leg ratio \u2014 the whole contract from three checkpoints.',
              ],
              answer: 'similar by RHS-similarity with $k = 2$: the remaining legs are $12$ and $24$ ($\\sqrt{169 - 25} = 12$ and $\\sqrt{676 - 100} = 24$, ratio 2 forced by Pythagoras)',
            },
            {
              q: 'The SSA refusal, armed. With $\u2220A = 30^\\circ$, the adjacent side $b = 7$ and the opposite side $a = 5$: show that the data carries TWO genuine triangles, compute both third sides, and explain why the pair refutes \u201cSSA-similarity\u201d.',
              solution: [
                'Sol. Write the law of cosines as a quadratic in the third side: $a^2 = b^2 + c^2 - 2bc\\cos A$ becomes $25 = 49 + c^2 - 7\\sqrt{3}\,c$, that is, $c^2 - 7\\sqrt{3}\,c + 24 = 0$.',
                'Solve: $c = \\frac{7\\sqrt{3} \\pm \\sqrt{51}}{2}$, so $c \\approx 2.4914636$ or $c \\approx 9.6328920$ \u2014 both roots positive (product $24 > 0$, sum $7\\sqrt{3} > 0$).',
                'Both are genuine: all six triangle inequalities hold ($5 + 2.4914636 > 7$ and $5 + 9.6328920 > 7$ among them) \u2014 no technicality dismisses either triangle.',
                'Compare them: the two triangles share $a = 5$, $b = 7$ and $\u2220A = 30^\\circ$ \u2014 two sides in common ratio $1$ and an equal NON-included angle.',
                'But they are not similar: the $c$-ratio is $\\frac{9.6328920}{2.4914636} \\approx 3.8663 \\ne 1$, and the angles at $B$ read $\\approx 135.5729960^\\circ$ and $\\approx 44.4270040^\\circ$ \u2014 a supplementary pair sharing a sine, not an angle.',
                'Hence the pair is the permanent refutation: two proportional sides plus an equal opposite angle certify NOTHING \u2014 and scaling both triangles by any $k$ preserves the hypotheses and the failure.',
              ],
              answer: 'two triangles: $c \\approx 2.4914636$ ($\u2220B \\approx 135.5729960^\\circ$) and $c \\approx 9.6328920$ ($\u2220B \\approx 44.4270040^\\circ$) \u2014 two sides in ratio 1 plus an equal non-included angle, and still not similar',
              figures: [
                {
                  caption: 'The ambiguous pair on the number line: the quadratic c\u00b2 \u2212 7\u221a3\u00b7c + 24 = 0 has two positive roots c \u2248 2.4914636 (fat triangle, \u2220B \u2248 135.5729960\u00b0) and c \u2248 9.6328920 (thin, \u2220B \u2248 44.4270040\u00b0), with sum 7\u221a3 = 12.1243557 and product 24 \u2014 both genuine, neither similar to the other.',
                  svg: geo43SSARoots('The ambiguous pair on a number line from 0 to 10: two marked roots at about 2.49 and 9.63 with their B angles labelled 135.57 and 44.43 degrees, and chips showing the sum 7 root 3 equals 12.1243557 and the product 24.'),
                },
              ],
            },
            {
              q: 'AA in the wild, nested figure. Triangles $ABC$ and $ADE$ share the angle at $A$; a further pair of equal angles $\u2220B = \u2220D$ is marked. Given $AB = 8$, $AC = 10$ and $AD = 12$, cite the criterion and find $AE$ and the ratio $\\frac{DE}{BC}$.',
              solution: [
                'Sol. Redraw the triangles separately, sharing the vertex $A$: the correspondence is $A \\leftrightarrow A$, $B \\leftrightarrow D$, $C \\leftrightarrow E$.',
                'Cite the gate: $\u2220A$ is common and $\u2220B = \u2220D$ is given \u2014 two angle pairs, so AA applies (the third pair is forced by the angle sum).',
                'Read the scale on the sides that straddle the shared angle: $\\frac{AD}{AB} = \\frac{12}{8} = \\frac{3}{2}$, so $k = \\frac{3}{2}$ (big $ADE$ $\\to$ small $ABC$ read backwards; state your direction).',
                'Compute: $\\frac{AE}{AC} = \\frac{3}{2}$ gives $AE = \\frac{3}{2} \\times 10 = 15$.',
                'The remaining ratio rides along: $\\frac{DE}{BC} = \\frac{3}{2}$ \u2014 the third pair needs no measurement once the gate is open.',
                'Hence $AE = 15$ and $\\frac{DE}{BC} = \\frac{3}{2}$, both forced by AA with $k = \\frac{AD}{AB}$.',
              ],
              answer: '$AE = 15$ (AA with $k = \\frac{AD}{AB} = \\frac{12}{8} = \\frac{3}{2}$), and $\\frac{DE}{BC} = \\frac{3}{2}$ \u2014 the third ratio rides the gate',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'The $k, k^2$ machine with a stated direction. Triangle $T\u2032$ is similar to triangle $T$ with $k = \\frac{5}{2}$ read $T \\to T\u2032$. If $T$ has area 12 and perimeter 18, find the area and perimeter of $T\u2032$, and explain why the two multipliers differ.',
              solution: [
                'Sol. Read the direction: $k = \\frac{5}{2}$ from $T$ to $T\u2032$ means every LENGTH of $T\u2032$ is $\\frac{5}{2}$ times its answering length in $T$.',
                'Perimeter: it is a sum of lengths, so it scales like a length \u2014 $18 \\times \\frac{5}{2} = 45$.',
                'Area: it is a product of two lengths, so the scale factor enters twice \u2014 $12 \\times \\left(\\frac{5}{2}\\right)^2 = 12 \\times \\frac{25}{4} = 75$.',
                'Explain the difference: perimeters are one-dimensional (one factor of $k$), areas two-dimensional ($k^2$) \u2014 the SAS-similarity derivation of this lesson shows the sines cancelling and the two side factors each contributing one $k$.',
                'Hence $T\u2032$ has perimeter 45 and area 75 \u2014 and reversing the direction would give the reciprocals $\\frac{2}{5}$ and $\\frac{4}{25}$.',
              ],
              answer: 'perimeter $45$ (lengths by $k = \\frac{5}{2}$) and area $75$ (areas by $k^2 = \\frac{25}{4}$): one factor of $k$ per dimension',
            },
            {
              q: 'The construction proof at fresh numbers. In triangle $ABC$, $\u2220A = 50^\\circ$, $AB = 10$, $AC = 9$; $D$ lies on $AB$ with $AD = 4$, and $DE$ is drawn parallel to $BC$ meeting $AC$ at $E$. Compute $AE$, $BC$, $DE$, and check all three ratios.',
              solution: [
                'Sol. The parallel through $D$ meets $AC$ at $E$; by the BPT (Lesson 4.2), $\\frac{AD}{AB} = \\frac{AE}{AC}$.',
                'Compute the ratio: $\\frac{AD}{AB} = \\frac{4}{10} = \\frac{2}{5}$.',
                'Compute $AE$: $\\frac{AE}{9} = \\frac{2}{5}$, so $AE = \\frac{2}{5} \\times 9 = 3.6$.',
                'Compute $BC$ by the law of cosines: $BC^2 = 100 + 81 - 2 \u00b7 10 \u00b7 9 \u00b7 \\cos 50^\\circ = 181 - 180\\cos 50^\\circ$, so $BC \\approx 8.0807320$.',
                'Compute $DE$: the intercept machinery gives $\\frac{DE}{BC} = \\frac{2}{5}$, so $DE \\approx 0.4 \\times 8.0807320 = 3.2322928$.',
                'Check all three ratios: $\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC} = \\frac{2}{5}$ \u2014 triangle $ADE \\sim ABC$ by the AA construction, with the copied angle at $D$ equal to $\u2220B \\approx 58.5603484^\\circ$.',
              ],
              answer: '$AE = 3.6$, $BC \\approx 8.0807320$, $DE \\approx 3.2322928$, and $\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC} = \\frac{2}{5}$',
              figures: [
                {
                  caption: 'The construction at fresh numbers: triangle ABC with the 50\u00b0 angle at A, AB = 10, AC = 9, and the inner triangle ADE with AD = 4 and DE parallel to BC \u2014 the engine\u2019s coordinate intersection gives AE = 3.6 and DE \u2248 3.2322928, all three ratios 2/5.',
                  svg: geo43AANumeric('The construction run at fresh numbers: a green triangle with angle A equal to 50 degrees, sides AB 10 and AC 9, and an orange inner triangle ADE with AD 4 and DE parallel to BC, with a panel reading all three ratios equal to two fifths.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Prove the AA criterion in full: given $\u2220A = \u2220P$ and $\u2220B = \u2220Q$ for triangles $ABC$ and $PQR$, show that all three angles agree and that the three side ratios share one common $k$. Support the proof with the construction and a numerical witness.',
              solution: [
                'Sol. Third angle: $\u2220C = 180^\\circ - \u2220A - \u2220B = 180^\\circ - \u2220P - \u2220Q = \u2220R$ \u2014 the angle sum forces the third equality (Lesson 2.4).',
                'Construct the copy: on triangle $ABC$ itself, pick $D$ on $AB$ and copy $\u2220B$ at $D$ on the side toward $A$; the copy meets $AC$ at $E$. Then $\u2220ADE = \u2220ABC$ in the corresponding position, so $DE \\parallel BC$ by the converse of the corresponding-angles law.',
                'Force two ratios: by the Basic Proportionality Theorem (Lesson 4.2, Euclid VI.2), the parallel gives $\\frac{AD}{AB} = \\frac{AE}{AC}$.',
                'Force the third: the same parallelism, read with the intercept ladder, gives $\\frac{DE}{BC} = \\frac{AD}{AB}$ \u2014 one common ratio $k = \\frac{AD}{AB}$ on all three sides.',
                'Conclude the similarity: triangle $ADE$ has the angles of $ABC$ and all sides in the common ratio $k$, so triangle $ADE \\sim ABC$; and any triangle sharing two angles with $ABC$ is a relocated, rescaled copy of this construction, so triangle $ABC \\sim PQR$.',
                'Numerical witness: with $\u2220A = 40^\\circ$, $AB = 10$, $AC = 8$, $AD = 6$, the coordinate intersection lands $E$ at exactly $0.6$ of the way along $AC$: $AE = 4.8$, $BC \\approx 6.4368384$, $DE \\approx 3.8621031$, and all three ratios read $\\frac{3}{5}$ \u2014 the engine\u2019s brute-force check of every step above.',
              ],
              answer: 'AA proved: the copy on the shared angle runs $DE \\parallel BC$, the BPT forces $\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC}$ (witness $\\frac{3}{5}$), and the angle sum forces the third angle \u2014 triangle $ADE \\sim ABC$, hence any two-angle pair is similar',
            },
            {
              q: 'Refute \u201cSSA-similarity\u201d in full: show that two sides in a common ratio plus an equal angle NOT included between them cannot certify similarity, prove that the failure persists at every scale $k$, and identify the structural reason the angle data goes wrong.',
              solution: [
                'Sol. State the claimed criterion: if $\\frac{a\u2032}{a} = \\frac{b\u2032}{b} = k$ and $\u2220A = \u2220A\u2032$ (the angle opposite $a$, NOT included), then \u2014 allegedly \u2014 the triangles are similar.',
                'Deploy the witness at $k = 1$: $A = 30^\\circ$, $b = 7$, $a = 5$ gives the quadratic $c^2 - 7\\sqrt{3}\,c + 24 = 0$ with roots $c \\approx 2.4914636$ and $c \\approx 9.6328920$ \u2014 two genuine triangles, both carrying the claimed data.',
                'Verify the failure: the two triangles share $a$, $b$ and $\u2220A$ yet are not similar \u2014 their third sides differ (ratio $\\approx 3.8663 \\ne 1$) and their angles at $B$ read $\\approx 135.5729960^\\circ$ against $\\approx 44.4270040^\\circ$.',
                'Prove scale-invariance of the failure: multiply all sides of BOTH witness triangles by any $k > 0$. The side ratios stay $1$, the shared angle stays $30^\\circ$, and the two scaled triangles are still not similar (each is similar only to its own scaling). So no choice of $k$ rescues the criterion.',
                'Identify the structural fault: the law of cosines ties $a^2 = b^2 + c^2 - 2bc\\cos A$ \u2014 with $a$, $b$, $A$ fixed, this is a QUADRATIC in $c$, and when the discriminant $b^2\\sin^2 A \\cdot$-window admits two positive roots, both close the triangle. The equal angle lives opposite one measured side, so it cannot clamp the third side the way an included angle does.',
                'Hence SSA-similarity is refuted: the $k = 1$ ambiguous pair is a permanent counterexample, scaling cannot launder it, and the included-angle demand in SAS-similarity is precisely the clause that kills the ambiguity.',
              ],
              answer: 'SSA-similarity refuted: the ambiguous pair ($c \\approx 2.4914636$ or $9.6328920$ on the data $A = 30^\\circ$, $b = 7$, $a = 5$) shares two sides in ratio 1 and the angle, yet is not similar \u2014 and scaling both triangles preserves both the hypotheses and the failure',
            },
          ],
        },
      ],
    },
  ],
}
