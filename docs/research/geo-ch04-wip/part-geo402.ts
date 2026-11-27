import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only,     */
/* the c31 warm family carried to ch.4's proportionality lesson)       */
/* ------------------------------------------------------------------ */
const c42 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, triangles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, grids, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f42 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo42 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo42Txt = (
  x: number, y: number, s: string,
  size = 13, color = c42.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f42}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo42Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c42.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo42Dot = (x: number, y: number, color = c42.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo42Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo42Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo42RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c42.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo42Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo42Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c42.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo42Line(x1, y1, x2, y2, color, w) + geo42Head(x2, y2, a, color, 8)
}

/** a single parallel-mark chevron at point (x, y) on a line of direction (dx, dy) */
const geo42Tick = (x: number, y: number, dx: number, dy: number, color = c42.amber, s = 9): string => {
  const len = Math.hypot(dx, dy)
  const u = [dx / len, dy / len]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.5, y - u[1] * s + v[1] * s * 0.5]
  const p2 = [x - u[0] * s - v[0] * s * 0.5, y - u[1] * s - v[1] * s * 0.5]
  return geo42Line(p1[0], p1[1], p2[0], p2[1], color, 2)
}

const geo42Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the BPT configuration (the proof's own figure)     */
/* right-triangle witness A=(0,0), B=(14,0), C=(0,21), D=(6,0), E=(0,9)*/
/* mapped affinely: original x -> down the left rail, original y ->    */
/* along the top rail (parallelism and the right angle at A survive)   */
/* ------------------------------------------------------------------ */
const geo42Bpt = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE BPT CONFIGURATION: DE ∥ BC', 13, c42.ink, 'middle', '700'))
  const sx = 240 / 14, sy = 240 / 21
  const P = (x: number, y: number): [number, number] => [80 + y * sy, 70 + x * sx]
  const [A, B, C, D, E] = [[0, 0], [14, 0], [0, 21], [6, 0], [0, 9]].map((p) => P(p[0], p[1]))
  // the two auxiliary triangles of the proof, shaded
  parts.push(geo42Poly([B, D, E], c42.sep, 0.55, c42.tealInk, 1.8))
  parts.push(geo42Poly([C, D, E], c42.panel2, 0.65, c42.orange, 1.8))
  // the outer triangle
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  // the parallel DE
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  // right angle at A
  parts.push(geo42RA(A[0], A[1], 0, 1, 1, 0, 13))
  // parallel chevrons on DE and BC
  parts.push(geo42Tick((D[0] + E[0]) / 2, (D[1] + E[1]) / 2, E[0] - D[0], E[1] - D[1], c42.orange))
  parts.push(geo42Tick((B[0] + C[0]) / 2, (B[1] + C[1]) / 2, C[0] - B[0], C[1] - B[1], c42.amber))
  // vertices
  for (const [p, n] of [[A, 'A'], [B, 'B'], [C, 'C'], [D, 'D'], [E, 'E']] as Array<[[number, number], string]>) {
    parts.push(geo42Dot(p[0], p[1], c42.ink, 4))
  }
  parts.push(geo42Txt(A[0] - 13, A[1] - 6, 'A', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(B[0] - 13, B[1] + 13, 'B', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(C[0] + 13, C[1] - 6, 'C', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(D[0] - 13, D[1] + 4, 'D', 13, c42.orange, 'middle', '700'))
  parts.push(geo42Txt(E[0] + 4, E[1] - 10, 'E', 13, c42.orange, 'middle', '700'))
  // the witness values on the rails
  parts.push(geo42Txt(D[0] + 12, (A[1] + D[1]) / 2 + 4, 'AD = 6', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(D[0] + 12, (D[1] + B[1]) / 2 + 4, 'DB = 8', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt((A[0] + E[0]) / 2, A[1] - 8, 'AE = 9', 12.5, c42.tealInk))
  parts.push(geo42Txt((E[0] + C[0]) / 2, C[1] - 8, 'EC = 12', 12.5, c42.tealInk))
  // the shaded-area verdict
  parts.push(geo42Txt(200, 240, '[BDE] = [CDE]', 12.5, c42.red, 'middle', '700'))
  parts.push(geo42Txt(200, 258, 'both = 36', 12.5, c42.red))
  // the ratio panel
  const panel: Array<[number, string]> = [
    [108, 'THE WITNESS VALUES'],
    [136, 'AB = 14 = 6 + 8'],
    [161, 'AC = 21 = 9 + 12'],
    [186, 'AD/DB = 6/8 = 3/4'],
    [211, 'AE/EC = 9/12 = 3/4'],
    [236, 'AD/AB = 6/14 = 3/7'],
    [261, 'DE/BC = 3/7 (engine)'],
  ]
  panel.forEach(([y, t]) => parts.push(geo42Txt(352, y, t, 12.5, y === 108 ? c42.tealInk : c42.ink, 'start', y === 108 ? '700' : '600')))
  parts.push(geo42Line(352, 118, 620, 118, c42.sep, 1.6))
  return geo42Svg(640, 350, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the equal-altitude area lemma (sliding vertex)     */
/* ------------------------------------------------------------------ */
const geo42Lemma = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'SAME BASE + SAME PARALLELS = SAME AREA', 13, c42.ink, 'middle', '700'))
  const B: [number, number] = [140, 290], C: [number, number] = [420, 290]
  const yTop = 110
  const verts: Array<[number, number]> = [[200, yTop], [300, yTop], [390, yTop]]
  const cols = [c42.tealInk, c42.green, c42.orange]
  verts.forEach((v, i) => {
    parts.push(geo42Poly([B, C, v], i === 2 ? c42.panel2 : c42.panel, i === 2 ? 0.5 : 0.35, cols[i], 2.2))
  })
  // the two parallels
  parts.push(geo42Line(96, yTop, 612, yTop, c42.amber, 2, '7 6'))
  parts.push(geo42Line(B[0], B[1], C[0] + 40, C[1], c42.ink, 2.8))
  // the fixed height indicator
  parts.push(geo42Line(300, yTop, 300, B[1], c42.red, 2, '4 5'))
  parts.push(geo42Txt(310, 205, 'h = 6', 12.5, c42.red))
  // vertices
  parts.push(geo42Txt(B[0] - 14, B[1] + 8, 'B', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(C[0] + 22, C[1] + 8, 'C', 13, c42.ink, 'middle', '700'))
  verts.forEach((v, i) => {
    parts.push(geo42Dot(v[0], v[1], cols[i], 4.5))
    parts.push(geo42Txt(v[0], v[1] - 12, `P${i + 1}`, 12.5, cols[i], 'middle', '700'))
  })
  parts.push(geo42Txt(320, 316, 'one shared base BC = 10', 12.5, c42.tealInk))
  parts.push(geo42Txt(606, yTop - 8, 'same parallels', 12.5, c42.amber, 'end'))
  parts.push(geo42Txt(320, 348, '[BP₁C] = [BP₂C] = [BP₃C] = ½ × 10 × 6 = 30', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(320, 368, 'slide the vertex anywhere on the parallel — the area cannot see the slide', 12.5, c42.tealInk))
  return geo42Svg(640, 382, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the intercept ladder (3 rungs, 4 parts)            */
/* ------------------------------------------------------------------ */
const geo42Ladder = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE INTERCEPT LADDER: 3 RUNGS, 4 PARTS', 13, c42.ink, 'middle', '700'))
  const A: [number, number] = [320, 60], B: [number, number] = [140, 330], C: [number, number] = [500, 330]
  parts.push(geo42Line(A[0], A[1], B[0], B[1], c42.ink, 2.8))
  parts.push(geo42Line(A[0], A[1], C[0], C[1], c42.ink, 2.8))
  parts.push(geo42Line(B[0], B[1], C[0], C[1], c42.ink, 2.8))
  const on = (P: [number, number], Q: [number, number], t: number): [number, number] =>
    [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]
  const fracs = [1 / 4, 2 / 4, 3 / 4]
  fracs.forEach((t, i) => {
    const D = on(A, B, t), E = on(A, C, t)
    parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 2.6))
    parts.push(geo42Dot(D[0], D[1], c42.orange, 3.5))
    parts.push(geo42Dot(E[0], E[1], c42.orange, 3.5))
    parts.push(geo42Txt(D[0] - 12, D[1] + 4, `${i + 1}/4`, 11.5, c42.orange, 'end'))
  })
  // equal-segment ticks on each rail: 4 per rail
  for (const [P, Q] of [[A, B], [A, C]] as Array<[[number, number], [number, number]]>) {
    for (let i = 0; i < 4; i++) {
      const m = on(P, Q, (i + 0.5) / 4)
      parts.push(geo42Tick(m[0], m[1], Q[0] - P[0], Q[1] - P[1], c42.tealInk, 8))
    }
  }
  parts.push(geo42Txt(A[0], A[1] - 12, 'A', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(B[0] - 12, B[1] + 10, 'B', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(C[0] + 12, C[1] + 10, 'C', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(320, 352, '3 rungs ∥ BC, equally spaced', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 371, '4 equal parts on each rail (3 gaps → 3 + 1 = 4 parts)', 13, c42.ink, 'middle', '700'))
  return geo42Svg(640, 386, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the midsegment (k = 1/2) with its construction     */
/* ------------------------------------------------------------------ */
const geo42Mid = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE MIDSEGMENT: DE = BC/2 AT k = 1/2', 13, c42.ink, 'middle', '700'))
  const A: [number, number] = [290, 50], B: [number, number] = [90, 320], C: [number, number] = [490, 320]
  const D: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
  const E: [number, number] = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2]
  const X: [number, number] = [2 * E[0] - D[0], 2 * E[1] - D[1]]
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  // the construction: extend DE by its own length to X, join CX
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  parts.push(geo42Line(E[0], E[1], X[0], X[1], c42.orange, 2.4, '7 6'))
  parts.push(geo42Line(C[0], C[1], X[0], X[1], c42.tealInk, 2.2, '7 6'))
  // DE = EX ticks
  parts.push(geo42Tick((D[0] + E[0]) / 2, (D[1] + E[1]) / 2, E[0] - D[0], E[1] - D[1], c42.orange, 9))
  parts.push(geo42Tick((E[0] + X[0]) / 2, (E[1] + X[1]) / 2, X[0] - E[0], X[1] - E[1], c42.orange, 9))
  // DB = CX ticks (the parallelogram's equal opposite sides)
  parts.push(geo42Tick((D[0] + B[0]) / 2, (D[1] + B[1]) / 2, B[0] - D[0], B[1] - D[1], c42.tealInk, 9))
  parts.push(geo42Tick((C[0] + X[0]) / 2, (C[1] + X[1]) / 2, X[0] - C[0], X[1] - C[1], c42.tealInk, 9))
  for (const [p, n, dx, dy] of [
    [A, 'A', -12, -8], [B, 'B', -12, 10], [C, 'C', 12, 10], [D, 'D', -12, 0], [E, 'E', 8, -10], [X, 'X', 12, -8],
  ] as Array<[[number, number], string, number, number]>) {
    parts.push(geo42Dot(p[0], p[1], c42.ink, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, n === 'D' || n === 'E' ? c42.orange : c42.ink, 'middle', '700'))
  }
  parts.push(geo42Txt(290, 240, 'D, E midpoints of AB, AC', 12.5, c42.tealInk))
  parts.push(geo42Txt(290, 260, 'DE = BC/2', 13, c42.orange, 'middle', '700'))
  parts.push(geo42Txt(320, 352, 'extend DE its own length to X: SAS gives △ADE ≅ △CEX', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 371, 'then DBCX is a parallelogram → DX = BC → DE = BC/2', 12.5, c42.tealInk))
  return geo42Svg(640, 386, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the numeric 14/6/21 computation ladder         */
/* ------------------------------------------------------------------ */
const geo42Numeric = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE NUMERIC LADDER: 14, 6, 21, 28', 13, c42.ink, 'middle', '700'))
  const A: [number, number] = [320, 52], B: [number, number] = [96, 322], C: [number, number] = [544, 322]
  const on = (P: [number, number], Q: [number, number], t: number): [number, number] =>
    [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]
  const D = on(A, B, 6 / 14), E = on(A, C, 9 / 21)
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  parts.push(geo42Tick((D[0] + E[0]) / 2, (D[1] + E[1]) / 2 - 8, E[0] - D[0], E[1] - D[1], c42.orange))
  parts.push(geo42Tick((B[0] + C[0]) / 2, (B[1] + C[1]) / 2 - 8, C[0] - B[0], C[1] - B[1], c42.amber))
  for (const [p, n, dx, dy] of [
    [A, 'A', 0, -12], [B, 'B', -12, 12], [C, 'C', 12, 12], [D, 'D', -14, 0], [E, 'E', 14, 0],
  ] as Array<[[number, number], string, number, number]>) {
    parts.push(geo42Dot(p[0], p[1], c42.ink, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, c42.ink, 'middle', '700'))
  }
  parts.push(geo42Txt(158, 100, 'AD = 6', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(132, 258, 'DB = 8', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(92, 366, 'AB = 14', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(484, 100, 'AE = 9', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(514, 258, 'EC = 12', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(556, 366, 'AC = 21', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(320, 348, 'BC = 28', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 146, 'DE = 12', 13, c42.orange, 'middle', '700'))
  parts.push(geo42Txt(320, 376, 'checks: 6/8 = 9/12 = 3/4 and 6/14 = 9/21 = 12/28 = 3/7', 13, c42.red, 'middle', '700'))
  return geo42Svg(640, 392, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the converse test (4/5 mismatch, visibly not   */
/* parallel): A=(0,0), B=(7,0), C=(5,20), D=(3,0), E=(4/9)C, E'=(3/7)C */
/* ------------------------------------------------------------------ */
const geo42Converse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE CONVERSE TEST: 3/4 AGAINST 4/5', 13, c42.ink, 'middle', '700'))
  const px = 34, py = 14, ox = 120, oy = 330
  const P = (x: number, y: number): [number, number] => [ox + x * px, oy - y * py]
  const [A, B, C, D] = [[0, 0], [7, 0], [5, 20], [3, 0]].map((p) => P(p[0], p[1]))
  const E = P(20 / 9, 80 / 9), Ep = P(15 / 7, 60 / 7)
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  // DE extended well past E (solid orange): from D through E to the top
  const tTop = (oy - 50) / (oy - E[1])
  const Etop: [number, number] = [D[0] + tTop * (E[0] - D[0]), 50]
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  parts.push(geo42Line(E[0], E[1], Etop[0], Etop[1], c42.orange, 2.4, '7 6'))
  // BC, and the TRUE parallel through D (dashed green) to the same height
  parts.push(geo42Line(B[0], B[1], C[0], C[1], c42.ink, 2.8))
  const Dpar: [number, number] = [D[0] + (C[0] - B[0]), D[1] + (C[1] - B[1])]
  const tP = (oy - 50) / (oy - Dpar[1])
  const Partop: [number, number] = [D[0] + tP * (Dpar[0] - D[0]), 50]
  parts.push(geo42Line(D[0], D[1], Partop[0], Partop[1], c42.green, 2.4, '7 6'))
  // the gap arrow near the top between the DE-line and the BC-line
  const gapDE: [number, number] = [D[0] + ((oy - 66) / (oy - E[1])) * (Etop[0] - D[0]) / tTop * tTop, 66]
  const yLine = 66
  const xDE = D[0] + ((oy - yLine) / (oy - Etop[1])) * (Etop[0] - D[0])
  const xBC = B[0] + ((oy - yLine) / (oy - C[1])) * (C[0] - B[0])
  void gapDE
  parts.push(geo42Arrow(xDE + 6, yLine, xBC - 6, yLine, c42.red, 2.2))
  parts.push(geo42Txt((xDE + xBC) / 2, yLine - 8, 'the lines diverge', 11.5, c42.red))
  // vertices
  for (const [p, n, dx, dy, col] of [
    [A, 'A', -12, 10, c42.ink], [B, 'B', 12, 10, c42.ink], [C, 'C', 10, -8, c42.ink],
    [D, 'D', 0, 14, c42.orange], [E, 'E', -14, -6, c42.red], [Ep, 'E′', 12, 6, c42.green],
  ] as Array<[[number, number], string, number, number, string]>) {
    parts.push(geo42Dot(p[0], p[1], col, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, col, 'middle', '700'))
  }
  // the ratio panel
  const panel: Array<[number, string, string]> = [
    [92, 'THE DATA', c42.tealInk],
    [120, 'AD/DB = 3/4', c42.ink],
    [145, 'but AE/EC = 4/5', c42.red],
    [170, '3/4 ≠ 4/5', c42.red],
    [198, 'so DE is NOT parallel', c42.red],
    [223, 'to BC — the ratios', c42.red],
    [248, 'disagree', c42.red],
    [278, 'the true parallel lands', c42.green],
    [303, 'at E′ with ratio 3/4', c42.green],
  ]
  panel.forEach(([y, t, col]) => parts.push(geo42Txt(400, y, t, 12.5, col, 'start', '600')))
  parts.push(geo42Line(400, 102, 620, 102, c42.sep, 1.6))
  return geo42Svg(640, 360, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the midsegment computation (10, 14, 18)        */
/* ------------------------------------------------------------------ */
const geo42MidCalc = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE MIDSEGMENT COMPUTATION: 10, 14, 18', 13, c42.ink, 'middle', '700'))
  // code-computed vertex: B=(100,300), C=(460,300), |AB|=10u, |AC|=14u, u=20
  const u = 20
  const B: [number, number] = [100, 300], C: [number, number] = [460, 300]
  const bc = 18 * u
  const xA = (10 * 10 * u * u - 14 * 14 * u * u + bc * bc) / (2 * bc)
  const yA = Math.sqrt(10 * 10 * u * u - xA * xA)
  const A: [number, number] = [B[0] + xA, B[1] - yA]
  const D: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
  const E: [number, number] = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2]
  const F: [number, number] = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  parts.push(geo42Poly([D, E, F], c42.panel, 0.7, c42.orange, 2.4))
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  for (const [p, n, dx, dy] of [
    [A, 'A', 0, -12], [B, 'B', -12, 12], [C, 'C', 12, 12],
    [D, 'D', -14, 0], [E, 'E', 14, 0], [F, 'F', 0, 14],
  ] as Array<[[number, number], string, number, number]>) {
    parts.push(geo42Dot(p[0], p[1], c42.ink, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, c42.ink, 'middle', '700'))
  }
  parts.push(geo42Txt((D[0] + E[0]) / 2, (D[1] + E[1]) / 2 - 10, 'DE = 9', 12.5, c42.orange, 'middle', '700'))
  parts.push(geo42Txt((D[0] + F[0]) / 2 - 16, (D[1] + F[1]) / 2 + 4, 'DF = 7', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt((E[0] + F[0]) / 2 + 16, (E[1] + F[1]) / 2 + 4, 'EF = 5', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(150, 210, 'AB = 10', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(496, 210, 'AC = 14', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(170, 330, 'BC = 18', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 352, 'perimeter of △DEF: 9 + 7 + 5 = 21 = 42/2', 13, c42.ink, 'middle', '700'))
  parts.push(geo42Txt(320, 372, 'each midsegment is half the side it misses', 12.5, c42.tealInk))
  return geo42Svg(640, 388, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the intercept machine on two rails (Ex 7)      */
/* ------------------------------------------------------------------ */
const geo42Intercept = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'ONE SET OF PARALLELS, TWO RAILS', 13, c42.ink, 'middle', '700'))
  const ys = [80, 150, 220, 290]
  ys.forEach((y) => parts.push(geo42Line(90, y, 560, y, c42.green, 2.2)))
  // transversal 1: (140,50) -> (200,320); transversal 2: (420,50) -> (330,320)
  const cross1 = ys.map((y) => [140 + ((y - 50) / 270) * 60, y] as [number, number])
  const cross2 = ys.map((y) => [420 + ((y - 50) / 270) * (-90), y] as [number, number])
  parts.push(geo42Line(140, 50, 200, 320, c42.ink, 2.6))
  parts.push(geo42Line(420, 50, 330, 320, c42.ink, 2.6))
  cross1.forEach((p) => parts.push(geo42Dot(p[0], p[1], c42.orange, 3.5)))
  cross2.forEach((p) => parts.push(geo42Dot(p[0], p[1], c42.orange, 3.5)))
  // gap labels (code-checked equal within each rail)
  for (let i = 0; i < 3; i++) {
    const m1: [number, number] = [(cross1[i][0] + cross1[i + 1][0]) / 2, (cross1[i][1] + cross1[i + 1][1]) / 2]
    const m2: [number, number] = [(cross2[i][0] + cross2[i + 1][0]) / 2, (cross2[i][1] + cross2[i + 1][1]) / 2]
    parts.push(geo42Txt(m1[0] + 14, m1[1] + 4, '6 cm', 12, c42.tealInk, 'start'))
    parts.push(geo42Txt(m2[0] - 14, m2[1] + 4, '8 cm', 12, c42.tealInk, 'end'))
  }
  parts.push(geo42Txt(170, 350, '24 cm rail → parts of 6', 12.5, c42.ink, 'start', '600'))
  parts.push(geo42Txt(470, 350, '32 cm rail → parts of 8', 12.5, c42.ink, 'end', '600'))
  parts.push(geo42Txt(320, 374, 'equal parts on every rail; different rails, different parts', 12.5, c42.tealInk))
  return geo42Svg(640, 390, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the refutation sketch (Exercise 9)            */
/* ------------------------------------------------------------------ */
const geo42Refute = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'THE REFUTATION: 3/4 AGAINST 4/5', 13, c42.ink, 'middle', '700'))
  const A: [number, number] = [320, 44], B: [number, number] = [140, 270], C: [number, number] = [500, 270]
  const on = (P: [number, number], Q: [number, number], t: number): [number, number] =>
    [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]
  const D = on(A, B, 3 / 7), E = on(A, C, 4 / 9)
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.red, 3))
  parts.push(geo42Line(B[0], B[1], C[0], C[1], c42.green, 3))
  for (const [p, n, dx, dy, col] of [
    [A, 'A', 0, -12, c42.ink], [B, 'B', -12, 12, c42.ink], [C, 'C', 12, 12, c42.ink],
    [D, 'D', -14, 0, c42.red], [E, 'E', 14, 0, c42.red],
  ] as Array<[[number, number], string, number, number, string]>) {
    parts.push(geo42Dot(p[0], p[1], col, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, col, 'middle', '700'))
  }
  parts.push(geo42Txt(190, 96, 'AD/DB = 3/4', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(452, 96, 'AE/EC = 4/5', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(320, 300, 'the cut lines are not parallel — the ratios disagree', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 326, 'NOT parallel: 3/4 ≠ 4/5', 13, c42.red, 'middle', '700'))
  return geo42Svg(640, 344, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S6 — two parallels in one triangle (Exercise 13)   */
/* ------------------------------------------------------------------ */
const geo42TwoPar = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo42Txt(320, 22, 'TWO PARALLELS: k = 2/5 AND k = 4/5, BC = 30', 13, c42.ink, 'middle', '700'))
  const A: [number, number] = [320, 44], B: [number, number] = [110, 300], C: [number, number] = [530, 300]
  const on = (P: [number, number], Q: [number, number], t: number): [number, number] =>
    [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]
  const D = on(A, B, 2 / 5), E = on(A, C, 2 / 5), F = on(A, B, 4 / 5), G = on(A, C, 4 / 5)
  parts.push(geo42Poly([A, B, C], c42.white, 0, c42.ink, 2.8))
  parts.push(geo42Line(D[0], D[1], E[0], E[1], c42.orange, 3))
  parts.push(geo42Line(F[0], F[1], G[0], G[1], c42.tealInk, 3))
  parts.push(geo42Rect(D[0], D[1], E[0] - D[0], F[1] - D[1], c42.panel, 0.4, c42.faint, 1.4))
  for (const [p, n, dx, dy, col] of [
    [A, 'A', 0, -12, c42.ink], [B, 'B', -12, 12, c42.ink], [C, 'C', 12, 12, c42.ink],
    [D, 'D', -14, 0, c42.orange], [E, 'E', 14, 0, c42.orange], [F, 'F', -14, 0, c42.tealInk], [G, 'G', 14, 0, c42.tealInk],
  ] as Array<[[number, number], string, number, number, string]>) {
    parts.push(geo42Dot(p[0], p[1], col, 4))
    parts.push(geo42Txt(p[0] + dx, p[1] + dy, n, 13, col, 'middle', '700'))
  }
  parts.push(geo42Txt(320, D[1] - 10, 'DE = 12 (k = 2/5)', 12.5, c42.orange, 'middle', '700'))
  parts.push(geo42Txt(320, F[1] - 10, 'FG = 24 (k = 4/5)', 12.5, c42.tealInk, 'middle', '700'))
  parts.push(geo42Txt(320, 318, 'BC = 30', 12.5, c42.tealInk))
  parts.push(geo42Txt(320, 344, 'DE/FG = 12/24 = 1/2; the strip is a trapezium', 12.5, c42.tealInk))
  return geo42Svg(640, 360, aria, parts)
}

export const lessonGeo402: Lesson = {
  id: 'geo-the-basic-proportionality-theorem-thales',
  number: '4.2',
  title: 'The Basic Proportionality Theorem (Thales)',
  concepts: [
    'basic proportionality theorem',
    'equal-altitude area lemma',
    'converse of the BPT',
    'intercept theorem',
    'midsegment theorem',
    'ratio arithmetic',
    'Thales configuration',
  ],
  objectives: [
    'State the Basic Proportionality Theorem precisely: a line parallel to one side of a triangle divides the other two sides in the same ratio, and read it in both ratio forms (part-to-part and part-to-whole)',
    'Prove the BPT from the equal-altitude area lemma: join BE and CD, observe the equal areas [BDE] = [CDE], and divide through by the common-altitude triangles',
    'Convert between the two ratio reads by componendo and dividendo, and state the scale factor k of the parallel line with its direction (k and 1/k)',
    'Apply the converse of the BPT to certify or refute parallels, including the pinned 3/4-against-4/5 refusal',
    'Use the intercept ladder to divide a segment into any number of equal parts, and derive the midsegment theorem as the k = 1/2 case with its converse',
  ],
  prerequisites: ['geo-similar-figures-same-shape-at-any-scale', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
  sources: ['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. Thales and the shadow story                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Thales at the pyramid: a story that needs a theorem' },
    {
      kind: 'para',
      text: 'Lesson 4.1 ended with a promissory note. The tradition — and it is a tradition, retold by Plutarch and Diogenes Laertius centuries after the fact — says that Thales of Miletus, around 600 BCE, measured the height of the Great Pyramid by its shadow: he waited (says one version) for the moment when a staff\u2019s shadow exactly equalled the staff\u2019s own height, and then announced that the pyramid\u2019s shadow, measured from the centre of its base, equalled the pyramid\u2019s height. No ladder, no rope, no climbing — just the sun, a stick, and one idea: the two triangles, stick-with-shadow and pyramid-with-shadow, have the same shape, so their corresponding lengths stand in one common ratio. The note promised that this chapter would turn the idea into a theorem. This lesson is where the promise is kept, and the keeping is more interesting than the story, because the proof Thales himself never wrote down runs through an idea he would have loved: areas.',
    },
    {
      kind: 'para',
      text: 'Be clear about what is tradition and what is mathematics, because this book refuses to blur the two. That Thales of Miletus flourished around 600 BCE, that he stood at the head of the Greek geometrical tradition, and that measuring heights by shadows is ancient practice — these are solid. That the specific pyramid scene happened exactly as retold, with the staff and the waiting for the magic moment — that is a story told centuries later, and we label it as such: a tradition, valuable as a picture of how the mathematics was used, not as a record of an afternoon. The mathematics underneath, however, is entirely real and entirely ours to earn: IF two triangles are the same shape, THEN corresponding lengths stand in a common ratio — that direction is nearly free. What is not free — and what this lesson proves — is the converse-flavoured engine that makes the whole theory of similarity run: when a line runs parallel to one side of a triangle, the side-segments it creates are locked into one ratio, willy-nilly, provably, by areas.',
    },
    {
      kind: 'para',
      text: 'Here is the plan of the lesson, so the architecture is visible before the bricks arrive. First the ENGINE: a two-line fact about triangle areas — two triangles standing on the same base, wedged between the same two parallels, have equal areas — proved and then sharpened into a ratio form. Then the THEOREM: the Basic Proportionality Theorem, called after Thales in much of the world and Proposition VI.2 in Euclid, stated cleanly. Then the PROOF — the chapter\u2019s centrepiece: two auxiliary lines, two equal areas, one division, and the ratio falls out. Then the CONVERSE, proved honestly by contradiction, with the pinned counterexample showing what happens when the ratios disagree. Then two applications that every examination loves: the intercept ladder (equally spaced parallels cut equal segments — three gaps give four parts) and the midsegment theorem (the $k = 1/2$ case, with its own classical proof by congruence). At the end, the trapezium teaser that Chapter 5 will cash.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Thales, the theorem, and the name on the envelope',
      text: 'Thales of Miletus (fl. c. 600 BCE) is the first name in the Greek mathematical tradition; later summaries credit him with five results, including the angle-in-a-semicircle theorem of Lesson 2.5. The proportionality theorem this lesson proves is often called Thales\u2019 theorem or the intercept theorem on the Continent, and the Basic Proportionality Theorem (BPT) in the NCERT tradition this book follows; Euclid states and proves it as Proposition VI.2 of the Elements, in the language of Book VI\u2019s proportion theory. The pyramid-shadow story is first told of him centuries later (Plutarch, drawing on earlier sources; Diogenes Laertius quoting Hieronymus) — tradition, not minutes. What Euclid\u2019s Book VI.2 gives us that the story lacks is the proof: the equal-altitude area argument that follows, which is why the story opens the lesson and the areas carry it.',
    },
    {
      kind: 'para',
      text: 'One more piece of bookkeeping before the machinery starts. Lesson 4.1 built the vocabulary: the scale factor $k$, always stated with its direction; the ratio reads part-to-part ($AD/DB$) and part-to-whole ($AD/AB$); the law that lengths scale by $k$ and areas by $k^2$. This lesson lives one level down: it explains WHERE the common ratio comes from — why a parallel line cannot help but cut the sides proportionally. Lesson 4.3 will then harvest what is planted here (the similarity criteria AA, SAS, SSS), and Lesson 4.4 will spend the harvest on Pythagoras himself. In that chain, 4.2 is the load-bearing wall: everything downstream leans on the area argument you are about to meet.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the equal-altitude area lemma                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The engine of the chapter: the equal-altitude area lemma' },
    {
      kind: 'para',
      text: 'Start with the only piece of area theory the proof needs, and notice how little it costs. Draw a fixed base $BC$, say of length $10$. Draw a line parallel to $BC$, at height $6$ above it. Now drop a vertex $P$ anywhere on that upper parallel — directly above the middle of the base, or above one end, or off to the left of $B$, or off to the right of $C$, it does not matter — and form the triangle $BP C$. Question: what is its area? Answer, every single time: $\\frac{1}{2} \\times 10 \\times 6 = 30$. The base is shared, the height is the fixed gap between the parallels, and the area formula cannot see where along the parallel the vertex sits. The engine behind this lesson verified it by coordinates before this paragraph stood: vertices at $(2,6)$, $(7,6)$, $(-3,6)$ and $(11.5,6)$ on the base from $(0,0)$ to $(10,0)$ — the last two hanging well past the ends of the base — all return area exactly $30$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the equal-altitude area lemma: one shared base BC = 10, one fixed height h = 6 between the parallels, and three vertex positions P1, P2, P3 sliding along the upper parallel. Every triangle has area ½ × 10 × 6 = 30; the vertex may hang past the ends of the base and the area still cannot see it.',
      svg: geo42Lemma('One horizontal base segment BC with three triangles sharing it, their vertices at three positions along a dashed parallel line above, all labelled area 30.'),
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The equal-altitude area lemma',
      text: 'Triangles on the same base (or on equal bases lying on one line) and between the same parallels have EQUAL areas. Proof: each area is $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$; the base is shared and the height is the distance between the parallels, which is the same number for every vertex position on the upper parallel — so every such area is the same number. The companion ratio form, which the BPT proof actually uses: if two triangles share one vertex (hence one altitude) while their bases lie on the same line through that altitude\u2019s foot, their areas are in the ratio of their bases: $[PXY] : [PXZ] = XY : XZ$.',
    },
    {
      kind: 'derivation',
      title: 'The two forms of the lemma, proved in one pass',
      statement: 'Let $BC$ be a fixed segment on a line $\\ell$, and let $P$, $Q$ be any two points on a line parallel to $\\ell$. Then $[PBC] = [QBC]$. Moreover, if $X$, $Y$, $Z$ are collinear points and $P$ is off their line, then $[PXY]/[PXZ] = XY/XZ$.',
      steps: [
        {
          label: 'The equal-area form',
          formula: '[PBC] = \\tfrac{1}{2} \\cdot BC \\cdot h',
          explanation: 'The height of triangle $PBC$ over the base $BC$ is the perpendicular distance from $P$ to $\\ell$ — and because $P$ rides the parallel of $\\ell$, that distance is the same fixed $h$ for every position of $P$. Same base, same height, same area: $[PBC] = [QBC] = \\frac{1}{2} \\cdot BC \\cdot h$. On the drawn witness ($BC = 10$, $h = 6$): area $30$, at every slide position.',
        },
        {
          label: 'The ratio form (common vertex)',
          formula: '\\frac{[PXY]}{[PXZ]} = \\frac{\\tfrac{1}{2} \\cdot XY \\cdot h\'}{\\tfrac{1}{2} \\cdot XZ \\cdot h\'} = \\frac{XY}{XZ}',
          explanation: 'Now hold the VERTEX fixed and slide the base. Both triangles $PXY$ and $PXZ$ draw their altitude from the same point $P$ down to the same line, so they share the one height $h\'$; their areas are $\\frac{1}{2}XY \\cdot h\'$ and $\\frac{1}{2}XZ \\cdot h\'$, and the common factor $\\frac{1}{2}h\'$ cancels in the ratio. Equal heights turn area ratios into base ratios — this is the lever that will pry the BPT loose.',
        },
        {
          label: 'The engine\u2019s witness of both forms',
          formula: '\\frac{27}{36} = \\frac{6}{8} = \\frac{3}{4}',
          explanation: 'In the right-triangle witness that will carry the whole lesson — $A$ at the right angle, $AB = 14$, $AC = 21$, the parallel cutting at $AD = 6$ and $AE = 9$ — the triangles $[EAD]$ and $[EDB]$ share the vertex $E$ with bases $AD = 6$, $DB = 8$ on one line: their areas compute to $27$ and $36$, and $27/36 = 3/4 = 6/8$, the ratio form exact to the last digit.',
        },
        {
          label: 'Why the lemma deserves its name as the chapter\u2019s engine',
          explanation: 'Both forms are consequences of one fact — an area is half a base times a height, so SHARING one of the two factors cancels it out of every comparison. Share the base: areas are equal. Share the height: areas ride the bases. The BPT proof needs exactly these two moves and nothing else, which is why Euclid proves this lemma first (his VI.1, in the language of proportion) and the theorem second.',
        },
      ],
      result: 'Same base and same parallels: equal areas. Same vertex and collinear bases: areas in the ratio of the bases. Two lines of area theory — and the whole Basic Proportionality Theorem rides on them.',
    },
    {
      kind: 'para',
      text: 'Two habits of honest reading before applying the lemma. First, the phrase “between the same parallels” means the triangles live in the strip bounded by the two parallel lines — every vertex of every base on one of the two lines. Triangles that merely LOOK squeezed between non-parallel lines get nothing. Second, the ratio form cuts BOTH ways: it converts area ratios into length ratios (that is how the proof will run) and it converts length ratios into area ratios (that is how Lesson 4.4 will prove the $k^2$ area law for similar figures). One lemma, two directions of spend — bank it now, spend it twice.',
    },
    {
      kind: 'table',
      caption: 'The lemma in numbers — every cell recomputed by the engine before this table stood',
      head: ['Witness', 'Configuration', 'Areas', 'The lemma\u2019s read'],
      rows: [
        ['sliding vertex', 'base 10, height 6, vertices at $(2,6)$, $(7,6)$, $(-3,6)$, $(11.5,6)$', '$30, 30, 30, 30$', 'same base + same parallels: equal'],
        ['fixed base, growing height', 'base 10, heights $3, 6, 9$', '$15, 30, 45$', 'areas ride the heights: ratio $1:2:3$'],
        ['fixed vertex, sliding base', 'bases $AD = 6$, $DB = 8$ on one line, vertex $E$', '$27, 36$', 'areas ride the bases: $27/36 = 6/8 = 3/4$'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 3. the BPT, stated                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The Basic Proportionality Theorem, stated' },
    {
      kind: 'para',
      text: 'Now the configuration itself, drawn once and then never out of sight again. Take a triangle $ABC$. Mark a point $D$ on the side $AB$ — strictly between $A$ and $B$, not at the ends. Through $D$, draw the line parallel to the third side $BC$; let it meet the side $AC$ at $E$. The picture is a small triangle $ADE$ nestling in the corner at $A$, with a trapezium $DBCE$ filling the rest of the original triangle. The claim of the theorem is that the parallel cannot cut one side proportionally and the other one sloppily: the cut points divide the two sides in EXACTLY the same ratio.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The Basic Proportionality Theorem (Thales; Euclid VI.2)',
      text: 'If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, then the other two sides are divided in the same ratio: with $D$ on $AB$, $E$ on $AC$ and $DE \\parallel BC$, one has $\\frac{AD}{DB} = \\frac{AE}{EC}$. Equivalent part-to-whole forms (by componendo, Section 5): $\\frac{AD}{AB} = \\frac{AE}{AC}$, the fraction of the way along one side equalling the fraction of the way along the other. The engine\u2019s pinned witness: $AD = 6$, $DB = 8$ forces $AE = 9$, $EC = 12$ — the ratios $6/8$ and $9/12$ both reduce to $3/4$, and the part-to-whole reads $6/14$ and $9/21$ both reduce to $3/7$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the BPT configuration, which is also the proof\u2019s own figure: triangle ABC with DE ∥ BC, the two auxiliary triangles BDE (shaded yellow) and CDE (shaded orange) that the proof joins and compares. The witness values are pinned: AD = 6, DB = 8 on AB = 14; AE = 9, EC = 12 on AC = 21; the shaded areas are equal, [BDE] = [CDE] = 36.',
      svg: geo42Bpt('A right triangle with a horizontal top side of 21, a vertical left side of 14, a line parallel to the hypotenuse cutting the legs at D and E, two shaded triangles BDE and CDE marked equal area 36, and a panel listing the witness ratios 3/4 and 3/7.'),
    },
    {
      kind: 'para',
      text: 'Read the theorem\u2019s grammar carefully, because every word is load-bearing. “Parallel to ONE side” — there is exactly one freedom in the setup, the choice of the cutting line\u2019s distance from $A$; once $D$ is chosen, $E$ is determined (the parallel through $D$ meets $AC$ in one point). “Divides the other two sides in the SAME ratio” — not similar lengths, not equal lengths, but one shared ratio $AD : DB = AE : EC$. Slide the cutting line towards $A$ and both ratios shrink together; slide it towards $BC$ and both grow together; at no position whatsoever do the two sides disagree. That togetherness — forced, not observed — is the entire content, and it is what the proof must manufacture.',
    },
    {
      kind: 'para',
      text: 'Why does this deserve the word “basic” in its name, and a whole lesson? Because it is the exact hinge between the arithmetic of ratio (Foundation Mathematics) and the geometry of shape. Congruence, Chapter 3, was the theory of SAME size: rigid motions, equal lengths. Similarity is the theory of SAME shape, and SAME shape is precisely the statement that certain ratios agree. The BPT is the first theorem that produces such an agreement — it takes a parallel line, a purely angular object (parallelism is about DIRECTIONS), and squeezes out of it a purely metric conclusion (a ratio of lengths on a line). Angular information in, linear information out. Every similarity criterion in Lesson 4.3, and Pythagoras-by-similarity in 4.4, is a corollary of this exchange rate.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, with $D$ one quarter of the way from $A$ to $B$, so that $AD/AB = 1/4$, the theorem (in part-to-whole form) gives $AE/AC = 1/4$ — and the part-to-part ratio is $AD/DB = AE/EC = (1/4)/(3/4) = 1/3$.',
        'For example, with the cut at the midpoint ($AD = DB$), the ratio is $1/1$ and the parallel bisects BOTH sides — the midsegment configuration of Section 8, where the theorem also delivers the length $DE = BC/2$.',
        'For example, the pinned witness: $AD/DB = 3/4$ forces $AE/EC = 3/4$; equivalently $AD/AB = AE/AC = 3/7$, and the return read from $ABC$ down to $ADE$ runs at the reciprocal $k = 7/3$ — direction discipline exactly as Lesson 4.1 taught it.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 4. the proof                                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The proof: two joins, two equal areas, one division' },
    {
      kind: 'para',
      text: 'The proof is a four-move argument, and every move is either the lemma or arithmetic. Two auxiliary lines are drawn — the joins $BE$ and $CD$ — and they create two triangles, $BDE$ and $CDE$, that the lemma will prove equal. The common small triangle $ADE$ is then divided into each of two comparison triangles, and the ratio falls out of the cancellation. Watch how the two forms of the lemma each do exactly one job: the equal-area form certifies $[BDE] = [CDE]$, and the common-vertex form converts each area ratio into a length ratio. Nothing else happens.',
    },
    {
      kind: 'derivation',
      title: 'The Basic Proportionality Theorem proved from the area lemma',
      statement: 'In triangle $ABC$, let $D$ lie on $AB$ and $E$ on $AC$ with $DE \\parallel BC$. Then $\\frac{AD}{DB} = \\frac{AE}{EC}$.',
      steps: [
        {
          label: 'Join BE and CD',
          explanation: 'Draw the two auxiliary segments $BE$ and $CD$. They carve the strip between the parallels into pieces, and two of those pieces — the triangles $BDE$ and $CDE$ — share the base $DE$ while their third vertices $B$ and $C$ both sit on the line $BC$, which is parallel to $DE$.',
        },
        {
          label: 'Equal areas by the lemma',
          formula: '[BDE] = [CDE]',
          explanation: 'The triangles $BDE$ and $CDE$ stand on the SAME base $DE$, and their vertices $B$ and $C$ lie on the line $BC$ parallel to $DE$ — they live between the same parallels. By the equal-altitude lemma, $[BDE] = [CDE]$. In the pinned witness both areas are exactly $36$, and the engine further checked the honest way: $B$ and $C$ each stand at distance $24/\\sqrt{13}$ from the line $DE$, and $\\frac{1}{2} \\cdot DE \\cdot 24/\\sqrt{13} = \\frac{1}{2} \\cdot 3\\sqrt{13} \\cdot 24/\\sqrt{13} = 36$.',
        },
        {
          label: 'Divide by the common-altitude triangle on AB',
          formula: '\\frac{[ADE]}{[BDE]} = \\frac{AD}{DB}',
          explanation: 'The triangles $ADE$ and $BDE$ share the vertex $E$; their bases $AD$ and $DB$ lie on the one line $AB$, so they share the single altitude from $E$ to the line $AB$. The ratio form of the lemma converts the area ratio into the base ratio: $[ADE]/[BDE] = AD/DB$. On the witness: $27/36 = 6/8 = 3/4$.',
        },
        {
          label: 'Divide by the common-altitude triangle on AC',
          formula: '\\frac{[ADE]}{[CDE]} = \\frac{AE}{EC}',
          explanation: 'Likewise the triangles $ADE$ and $CDE$ share the vertex $D$ with bases $AE$ and $EC$ on the one line $AC$: $[ADE]/[CDE] = AE/EC$. On the witness: $27/36 = 9/12 = 3/4$ again.',
        },
        {
          label: 'Equate the two divisions',
          formula: '\\frac{AD}{DB} = \\frac{[ADE]}{[BDE]} = \\frac{[ADE]}{[CDE]} = \\frac{AE}{EC}',
          explanation: 'The middle equality is Step 2\u2019s $[BDE] = [CDE]$ — the same number $[ADE]$ divided by two equal numbers gives the same quotient both times. The outer equalities are Steps 3 and 4. Stringing them left to right: $\\frac{AD}{DB} = \\frac{AE}{EC}$, which is the theorem.',
        },
        {
          label: 'The engine\u2019s audit of the whole chain',
          formula: '27/36 = 27/36 = 3/4; \\quad 6/8 = 9/12 = 3/4',
          explanation: 'The engine recomputed every area of the proof from coordinates before a word of this prose stood: $[ADE] = 27$, $[BDE] = 36$, $[CDE] = 36$, and both divisions return $3/4$, which equals $6/8$ and $9/12$ separately. It then swept the whole machinery across nine cut positions $k = 1/5, 1/4, 1/3, 2/5, 1/2, 3/7, 3/5, 3/4, 4/5$: at every single cut, $DE \\parallel BC$ holds, $[BDE] = [CDE]$ holds, and both common-altitude divisions return $k/(1-k)$ exactly. The proof is not a lucky draw — it is a machine.',
        },
      ],
      result: '$DE \\parallel BC$ forces $\\frac{AD}{DB} = \\frac{AE}{EC}$: two joins, two equal areas from the same-base lemma, two divisions by the common-vertex lemma, and the ratio is cornered.',
    },
    {
      kind: 'para',
      text: 'Three remarks to make the proof yours rather than the book\u2019s. FIRST, find the auxiliary triangles before anything else — on this witness they are $BDE$ and $CDE$, shaded in Figure F1, and every exam proof of this shape begins by naming the two triangles that the lemma will certify equal. SECOND, notice what the proof did NOT use: no angles beyond the parallelism itself, no circle theorems, no trigonometry — the entire argument is area bookkeeping, which is why it survives translation into any proportion language Euclid or a modern syllabus prefers. THIRD, feel the structure of the final equation: a ratio on the left rail equals a ratio on the right rail because BOTH equal the same area ratio $[ADE]/[BDE] = [ADE]/[CDE]$. The little triangle $ADE$ is the hinge that couples the two sides — remember this image, because the converse proof in Section 6 uncouples the hinge and watches the ratio fail.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why areas, and why this proof is two millennia old and still first',
      text: 'Euclid proves this theorem as Elements VI.2, on the shoulders of VI.1 — his version of the equal-altitude lemma — and the architecture has never been bettered: convert a question about LENGTHS into a question about AREAS (which the lemma can compare), cancel, convert back. The strategy — “when a ratio hides, make an area ratio stand in for it” — pays out again in Lesson 4.4, where the altitude-on-hypotenuse split of Pythagoras is proved with the same two-form lemma. Learn the two forms of the lemma cold, and you own the mechanism behind half of Book VI.',
    },

    /* -------------------------------------------------------------- */
    /* 5. reading the ratios: componendo and the k of the parallel     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Reading the ratios: componendo, and the k of the parallel line' },
    {
      kind: 'para',
      text: 'The theorem gives the part-to-part ratio $AD/DB = AE/EC$. Examinations — and the two lessons that follow — constantly want the part-to-whole reads instead, and the conversion is pure ratio arithmetic, learned in Foundation Mathematics and worth sixty seconds of rehearsal here. If $AD/DB = 3/4$, then $AD$ is $3$ parts and $DB$ is $4$ parts of one common unit, so the whole $AB$ is $3 + 4 = 7$ parts and $AD/AB = 3/7$. This move — adding the denominator to the numerator, “componendo” in the classical name — works on any ratio: $AD/DB = r$ gives $AD/AB = r/(1+r)$, and read backwards, $AD/AB = k$ gives $AD/DB = k/(1-k)$. Both directions must be fluent, because data arrives in both shapes: a question may hand you $AD = 6$, $AB = 14$ (the whole) or $AD = 6$, $DB = 8$ (the parts), and the same triangle hides behind either wording.',
    },
    {
      kind: 'table',
      caption: 'The witness census — the pinned numeric ladder, every cell engine-checked before the table stood',
      head: ['Quantity', 'Symbolic read', 'Value on the witness', 'Cross-check'],
      rows: [
        ['the given cut on AB', '$AD/DB = 6/8$', '$3/4$', '$6 + 8 = 14 = AB$'],
        ['the forced cut on AC', '$AE/EC = 9/12$', '$3/4$', '$9 + 12 = 21 = AC$'],
        ['part-to-whole on AB', '$AD/AB = 6/14$', '$3/7$', 'componendo: $3/(3+4)$'],
        ['part-to-whole on AC', '$AE/AC = 9/21$', '$3/7$', 'the same $k$ on the other rail'],
        ['the parallel\u2019s own ratio', '$DE/BC = 12/28$', '$3/7$', '$28 \\times 3/7 = 12$'],
        ['the return direction', '$BC/DE = 28/12$', '$7/3$', 'reciprocal of $3/7$, as 4.1 taught'],
      ],
    },
    {
      kind: 'para',
      text: 'The last two rows deserve their own paragraph, because they make the strongest claim of the lesson and honesty demands the receipt. The parallel line sits at a definite SCALE between the corner triangle and the whole: the little triangle $ADE$ is a scaled copy of $ABC$ — its angles match, since $\\angle ADE = \\angle ABC$ and $\\angle AED = \\angle ACB$ are corresponding angles off the parallel $DE$ (the engine computed both pairs in the coordinate witness: $56.3099^\\circ$ and $33.6901^\\circ$, equal to four decimals) — and its sides then stand to the big triangle\u2019s sides in one common ratio $k = AD/AB = 3/7$, including the parallel side itself, $DE/BC = 3/7$. The engine pinned this last ratio from coordinates: $DE = 3\\sqrt{13} \\approx 10.8167$ against $BC = 7\\sqrt{13} \\approx 25.2389$, ratio exactly $3/7$. What this lesson has EARNED so far is that the ratio law governs the two cut sides; the full statement “$\\triangle ADE$ is similar to $\\triangle ABC$ with all six parts in proportion” is formalised as the AA criterion, proved in Lesson 4.3 — BY MEANS of this theorem. Until then, treat $DE/BC = k$ as the pinned engine truth it is: true on every witness the engine swept, and cashed as a theorem one lesson downstream.',
    },
    {
      kind: 'para',
      text: 'Meanwhile, the k-table is worth internalising, because it converts the theorem into a lookup. Read the cut as a FRACTION OF THE WHOLE $k = AD/AB$ and the part-to-part ratio is $k/(1-k)$: at the quarter cut ($k = 1/4$) the parts stand $1/4 \\div 3/4 = 1/3$; at the third ($k = 1/3$) they stand $1/2$; at $k = 2/5$ they stand $2/3$; at the pinned $k = 3/7$ they stand $3/4$; at the midpoint $k = 1/2$ they stand $1/1$ — the bisect; at $k = 3/5$ they stand $3/2$; at $k = 3/4$ they stand $3$. The return reads are the reciprocals, $3, 2, 3/2, 4/3, 1, 2/3, 1/3$, and the engine swept all seven rows in both directions before this sentence was allowed to stand. A student who owns this table reads a BPT question the way a pianist reads a chord: the shape arrives whole.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The two classic ratio slips',
      text: 'SLIP ONE: writing $AD/DB = AE/EC$ as $AD/DB = EC/AE$ — crossing the second rail. The correspondence is SAME-RAIL: the near part on $AB$ answers the near part on $AC$ (both are the pieces adjacent to $A$), the far part answers the far part. SLIP TWO: reading $k = AD/AB$ off a part-to-part ratio and forgetting the componendo — if $AD/DB = 3/4$ then $AD$ is $3$ parts of a $7$-part whole, so $AD/AB = 3/7$, NOT $3/4$ and NOT $4/7$. The pinned witness kills both slips in one image: $6/8 = 9/12 = 3/4$ on the part-to-part rails, $6/14 = 9/21 = 12/28 = 3/7$ on the part-to-whole rails, and never the twain shall meet.',
    },
    {
      kind: 'para',
      text: 'A quick word on the notation $[XYZ]$, used throughout: square brackets mean “the area of”. So $[BDE] = [CDE]$ reads “the area of triangle $BDE$ equals the area of triangle $CDE$”, and the proof\u2019s central equation $[ADE]/[BDE] = [ADE]/[CDE]$ is a statement about quotients of areas. The convention keeps area symbols compact inside displayed mathematics, and it is standard in examination marking schemes; the pinned witness carries $[ADE] = 27$ and $[BDE] = [CDE] = 36$ — numbers you will meet again in Exercise 15, where you run the entire proof\u2019s audit yourself.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the converse                                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The converse: when matching ratios force a parallel' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The converse of the Basic Proportionality Theorem',
      text: 'If a line divides two sides of a triangle in the same ratio, then it is parallel to the third side: with $D$ on $AB$ and $E$ on $AC$, the equality $\\frac{AD}{DB} = \\frac{AE}{EC}$ forces $DE \\parallel BC$. Read as a test: ratios agreeing is not merely consistent with parallelism — it CERTIFIES it. And by contraposition, disagreeing ratios certify non-parallelism: if $AD/DB = 3/4$ while $AE/EC = 4/5$, then $DE$ is NOT parallel to $BC$, full stop.',
    },
    {
      kind: 'derivation',
      title: 'The converse proved by contradiction (the unique-point argument)',
      statement: 'In triangle $ABC$, let $D$ lie on $AB$, $E$ on $AC$, with $\\frac{AD}{DB} = \\frac{AE}{EC}$. Then $DE \\parallel BC$.',
      steps: [
        {
          label: 'Draw the true parallel',
          explanation: 'Through $D$ there is exactly one line parallel to $BC$ (the parallel postulate, Chapter 2). Let it meet the side $AC$ at a point we call $E\'$. By the forward theorem (Section 4), this genuine parallel cuts the sides in the same ratio: $AD/DB = AE\'/E\'C$.',
        },
        {
          label: 'The two ratios coincide',
          formula: '\\frac{AE\'}{E\'C} = \\frac{AD}{DB} = \\frac{AE}{EC}',
          explanation: 'The hypothesis says $AE/EC = AD/DB$ and the forward theorem says $AE\'/E\'C = AD/DB$; chaining, the given point $E$ and the parallel\u2019s point $E\'$ cut the SAME segment $AC$ in the SAME ratio.',
        },
        {
          label: 'One ratio, one point',
          formula: '\\frac{AE}{EC} = r \\;\\Rightarrow\\; AE = \\frac{r}{1+r} \\cdot AC',
          explanation: 'On a fixed segment, the ratio determines the point: solving $AE/EC = r$ with $AE + EC = AC$ gives $AE = \\frac{r}{1+r} \\cdot AC$, a single value. The engine checked the pinned pair: on $AC = 21$, the ratio $3/4$ puts $AE$ at exactly $9$, the ratio $4/5$ puts it at $28/3 \\approx 9.3333$ — different ratios, different points, always. So $E$ and $E\'$, sharing one ratio, are one and the same point.',
        },
        {
          label: 'Conclude — no room for a second line',
          explanation: 'Since $E = E\'$, the line $DE$ IS the line $DE\'$, which was parallel to $BC$ by construction. Hence $DE \\parallel BC$. The contradiction framing: if you assume $DE$ is not parallel to $BC$, then $E \\ne E\'$, and Step 3\u2019s one-ratio-one-point law makes the two ratios differ — contradicting the hypothesis. The assumption dies; the parallel stands.',
        },
        {
          label: 'The engine\u2019s two verdicts',
          formula: '\\text{match: } 6/8 = 9/12 \\Rightarrow \\text{parallel}; \\quad \\text{clash: } 3/4 \\ne 4/5 \\Rightarrow \\text{NOT parallel}',
          explanation: 'In coordinates, the matching data $AD = 6$, $DB = 8$, $AE = 9$, $EC = 12$ gives a zero cross product between the directions of $DE$ and $BC$ — parallel, certified. The clashing data $AD/DB = 3/4$ with $AE/EC = 4/5$ gives cross product $20/9 \\ne 0$ — not parallel, certified — and the true parallel through $D$ lands at $E\' = (3/7)C$, a genuinely different point, $|E - E\'| = 5\\sqrt{17}/63 \\approx 0.3271$ away.',
        },
      ],
      result: 'Equal ratios on the two rails force the cutting line to BE the parallel through $D$ — the converse holds, and the certificate is constructive: one ratio, one point.',
    },
    {
      kind: 'para',
      text: 'Now the counterexample that the engine pinned and Figure S2 draws, because seeing the failure is worth a page of abstract talk. Take the witness triangle with $AB = 7$ cut at $AD = 3$ — so $AD/DB = 3/4$ — and choose $E$ on $AC$ with $AE/EC = 4/5$, close to $3/4$ but not equal (as fractions of the whole side: $4/9 \\approx 0.444$ against $3/7 \\approx 0.429$ — near-coincident points, which is why the figure exaggerates the drawing). The line $DE$ misses being parallel by a small but REAL angle: extended towards the far side of the triangle, it drifts away from the direction of $BC$, and the cross product of the two directions computes to $20/9$, comfortably non-zero. Small data errors do not create small theorems: the parallel demands EXACT ratio agreement, and nothing less. In applications this is a feature, not a bug — it is what lets a surveyor certify that two lines are parallel by measuring segments alone, never touching an angle.',
    },
    {
      kind: 'table',
      caption: 'The converse\u2019s verdicts — three data sets, two certified outcomes (engine-checked by cross products)',
      head: ['Data on the two rails', 'The ratio test', 'Verdict'],
      rows: [
        ['$AD = 6$, $DB = 8$; $AE = 9$, $EC = 12$', '$6/8 = 3/4$ and $9/12 = 3/4$ — agree', 'parallel (converse applies)'],
        ['$AD = 3$, $DB = 4$; $AE = 4$, $EC = 5$', '$3/4$ against $4/5$ — disagree', 'NOT parallel'],
        ['$AD = 5$, $DB = 5$; $AE = 7$, $EC = 7$', '$1/1$ and $1/1$ — agree at the bisect', 'parallel, and both sides bisected'],
      ],
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the three questions this theorem is asked',
      text: 'QUESTION ONE (forward): given $DE \\parallel BC$ and three of the four segment lengths, find the fourth — write $AD/DB = AE/EC$, substitute, solve the proportion; the pinned drill is $AB = 14$, $AD = 6$, $AC = 21$ giving $AE = 9$, $EC = 12$, and with $BC = 28$ the parallel itself runs at $DE = 28 \\times 3/7 = 12$. QUESTION TWO (converse): given all four segments, decide parallelism — reduce both ratios and COMPARE; $6/8 = 9/12$ certifies parallel, $3/4 \\ne 4/5$ refutes it, and the mark is for the comparison, not the arithmetic. QUESTION THREE (proof): reproduce the area argument — name the auxiliary triangles $BDE$ and $CDE$, cite the same-base-same-parallels lemma for $[BDE] = [CDE]$, divide $[ADE]$ by each, equate. Marking schemes typically pay one mark for the auxiliary joins, one for the equal areas with reason, one for each common-altitude division, one for the conclusion — five marks, four of them bookkeeping you now own.',
    },

    /* -------------------------------------------------------------- */
    /* 7. the intercept ladder                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The intercept ladder: equally spaced parallels cut equal segments' },
    {
      kind: 'para',
      text: 'Here is the oldest practical use of the theorem, and the reason the Continent calls it Thales\u2019 INTERCEPT theorem. Suppose you must divide a length into equal parts — a rail into four equal pieces, a field boundary into five — with nothing but a set square and a straightedge. The BPT does the dividing. Draw a ray from one end of the segment. On the ray, step off equal intervals with your compass — say three steps of one unit each, ending at a point $Q$. Join $Q$ to the far end of your segment, and through each step-off point draw a line parallel to that join. By the BPT, each parallel cuts the SAME FRACTION off the side it meets — because it cut that fraction off the ray — and the fractions cascade into equal parts. Step off $3$ equal gaps and you have cut the target into $3 + 1 = 4$ equal segments: three gaps, four parts. The engine verified the cascade directly: with marks at $1/4$, $2/4$, $3/4$ of one side and parallels through them, the second side is cut at exactly $1/4$, $2/4$, $3/4$ of its length — four equal pieces, each $\\sqrt{2.5}$ on the engine\u2019s coordinate witness, to the last decimal.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the intercept ladder inside a triangle: three rungs parallel to BC through the quarter marks of AB cut BOTH rails into four equal parts (the equal tick marks on each rail). Three gaps between rungs give 3 + 1 = 4 parts; the count of parts is always one more than the count of gaps.',
      svg: geo42Ladder('A triangle with a vertex A at top and base BC, three horizontal rungs parallel to the base at the quarter, half and three-quarter heights, cutting both slanted rails into four equal parts marked by ticks.'),
    },
    {
      kind: 'para',
      text: 'The same fact read outside any triangle — the form the intercept theorem takes in its own right — says: if three or more parallel lines cut off equal segments on ONE transversal, they cut off equal segments on EVERY transversal. Equal spacing along one crossing line forces equal spacing along all of them. But — and this is the point the engine pinned with two directions, $(3,10)$ and $(4,10)$, against the same four parallels — the SIZE of the equal segments depends on the angle of the crossing: the steeply slanted transversal collects gaps of $\\sqrt{109} \\approx 10.4403$ while the shallower one collects gaps of $\\sqrt{116} \\approx 10.7703$. Equal within each rail, different across rails. A railway sleeper fence shows this to any eye: the sleepers are equally spaced, but a road crossing the fence obliquely is cut into longer equal stretches than a road crossing it squarely.',
    },
    {
      kind: 'para',
      text: 'Notice how the ladder reads as pure BPT. In the triangle picture, the rung through the mark at fraction $t$ of one side is the parallel of the theorem with $k = t$: by the pinned ratio law of Section 5, that rung\u2019s own length is $t$ times the base. With the base $QR = 24$ and rungs at $1/4$, $2/4$, $3/4$, the rungs measure $6$, $12$, $18$ — the engine\u2019s exact sweep — and the fourth rung would be the base itself at $24$. This is the arithmetic of Exercise 11, and it is also the professional\u2019s trick for scaling drawings: to draw a line at $3/7$ of a given length, do not measure $3/7$ (your ruler may not have sevenths) — cut any convenient ray into $7$ equal compass steps, join, and draw the parallel through the third mark. The intercept ladder is a ratio engine that never computes a ratio.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, a 24 cm rail under three equally spaced rungs is cut into four parts of $24/4 = 6$ cm each; a 32 cm rail under the SAME rungs is cut into four parts of $32/4 = 8$ cm each — same parallels, different rails, different parts, all equal within each rail.',
        'For example, to cut a 28 cm stretch into four equal parts, step off three equal gaps on a ray and draw the parallels: the stretch falls into parts of $28/4 = 7$ cm, and the rung through the $3/4$ mark of a 24 cm side would run $24 \\times 3/4 = 18$ cm.',
        'For example, the census generalises by counting: $3$ gaps give $4$ parts, $4$ gaps give $5$ parts, $5$ gaps give $6$ — $n$ gaps always give $n + 1$ parts, because parts are bounded by marks and marks are one more than gaps.',
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the ladder is the theorem in work clothes',
      text: 'Strip the ladder picture to its data and the BPT reappears: two transversals (the rails) crossed by parallels (the rungs), with equal fractions stepped off on one rail forcing equal fractions on the other. The “divide a segment into $n$ equal parts” construction that took a paragraph in Chapter 1\u2019s ruler-and-compass world is here seen to be a COROLLARY of proportionality — one compass, one join, and a bundle of parallels, no measurement anywhere. When a carpenter marks out equal bays along a sloping eave by stepping a template along a level line and projecting, that is Book VI, Prop. 2, with sawdust on it.',
    },

    /* -------------------------------------------------------------- */
    /* 8. the midsegment: the k = 1/2 case                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The midsegment: the k = 1/2 case, proved and cashed' },
    {
      kind: 'para',
      text: 'One cut in the k-table deserves its own theorem because it is the cut everyone meets first: the midpoint cut, $k = 1/2$. Let $D$ and $E$ be the midpoints of $AB$ and $AC$. The BPT applies with ratio $AD/DB = AE/EC = 1/1$ — the parallel through midpoints bisects both sides, as it must — and the pinned ratio law of Section 5 goes further: the parallel itself runs at half the base, $DE/BC = AD/AB = 1/2$. The segment $DE$ is called the MIDSEGMENT (or midline) of the triangle, and the full statement is worth boxing: the segment joining the midpoints of two sides of a triangle is parallel to the third side and equal to half of it. Both directions of the scale factor are worth saying aloud: $k = 1/2$ reading from the whole triangle down to the midsegment triangle, and $k = 2$ reading back up — the small triangle doubles into the big one.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the midsegment with its classical construction: D and E are the midpoints of AB and AC; extend DE beyond E by its own length to X (tick marks: DE = EX). SAS congruence on △ADE and △CEX gives CF ∥ DB with CF = DB, so DBCX is a parallelogram and DX = BC — hence DE = BC/2 at k = 1/2.',
      svg: geo42Mid('A triangle with the midsegment DE drawn between the midpoints of two sides, extended by its own length to a point X, with a dashed line from the third vertex to X and tick marks showing equal segments, labelled DE equals BC over 2.'),
    },
    {
      kind: 'para',
      text: 'The proof the engine audited is the classical one, and it is a Chapter 3 proof in disguise — congruence, not areas, which is a healthy reminder that the toolbox has more than one drawer. The engine ran every claim on the coordinate witness $A = (0,0)$, $B = (6,0)$, $C = (2,8)$, where $D = (3,0)$ and $E = (1,4)$: there, $DE = 2\\sqrt{5}$ and $BC = 4\\sqrt{5}$ — the ratio is exactly $1/2$, no rounding, because both lengths carry the factor $\\sqrt{5}$ that cancels in the quotient. The same witness displays all three midsegments at once: the midpoints of $AB$, $AC$, $BC$ are $D$, $E$, $F$, and the midsegment triangle $DEF$ has sides $2\\sqrt{5}$, $3$, $\\sqrt{17}$ — each exactly half of the side it misses ($4\\sqrt{5}$, $6$, $2\\sqrt{17}$). Add them: the perimeter of the midsegment triangle is HALF the perimeter of the original — $11.5952$ against $23.1904$ on the witness, and $21$ against $42$ on the cleaner numeric witness $10$-$14$-$18$ that Illustration 3 computes.',
    },
    {
      kind: 'derivation',
      title: 'The midsegment theorem proved by the extend-and-congrue construction',
      statement: 'In triangle $ABC$, let $D$ and $E$ be the midpoints of $AB$ and $AC$. Then $DE \\parallel BC$ and $DE = \\frac{1}{2} BC$.',
      steps: [
        {
          label: 'The parallel is already earned',
          explanation: 'Since $AD/DB = AE/EC = 1/1$ (midpoints), the converse of the BPT (Section 6) certifies $DE \\parallel BC$ with no further work. What remains is the LENGTH claim.',
        },
        {
          label: 'Extend DE by its own length',
          formula: 'X = 2E - D, \\;\\text{so that}\\; EX = ED',
          explanation: 'Produce the segment $DE$ beyond $E$ to a point $X$ with $EX = ED$ — the tick marks on Figure F4. Now $E$ is the midpoint of BOTH $AC$ and $DX$: the vertical angles $\\angle AED$ and $\\angle CEX$ are equal (opposite rays on both lines), so triangles $ADE$ and $CEX$ have $AE = CE$, $ED = EX$, and the included angles equal: SAS congruence, Chapter 3\u2019s workhorse. The engine verified the angle equality by dot products: both cosines compute to $14/\\sqrt{340} \\approx 0.7593$.',
        },
        {
          label: 'Harvest the parallelogram',
          formula: 'CF \\parallel DB \\;\\text{and}\\; CF = DB',
          explanation: 'Corresponding parts of the congruent triangles give $AD = CX$ and $\\angle ADE = \\angle CXE$. The angle equality says the line $CX$ makes the same angle with the line $DX$ as $AB$ makes with $DE$ — hence $CX \\parallel AB$, and since $AD = DB$ (midpoint), also $CX = DB$. A quadrilateral with one pair of opposite sides parallel AND equal is a parallelogram: $DBCX$ is one. On the engine\u2019s witness, $|CX| = |DB| = 3$ exactly, with the cross product of their directions zero.',
        },
        {
          label: 'Opposite sides of the parallelogram',
          formula: 'DX = BC \\;\\Rightarrow\\; 2\\,DE = BC',
          explanation: 'Opposite sides of a parallelogram are equal, so $DX = BC$. But $D$, $E$, $X$ are collinear with $E$ the midpoint of $DX$, so $DX = 2\\,DE$ — and $2\\,DE = BC$, that is, $DE = BC/2$. On the witness: $|DX| = |BC| = 4\\sqrt{5}$ and $|DE| = 2\\sqrt{5}$, the halving exact.',
        },
        {
          label: 'The converse-of-midsegment read',
          explanation: 'Run the theorem backwards: the line through the midpoint $D$ of $AB$, drawn parallel to $BC$, must meet $AC$ at its midpoint — because the BPT forces $AE/EC = AD/DB = 1/1$. The engine solved the intersection on the witness and landed at $(1,4)$, exactly the midpoint of $AC$. “Parallel through a midpoint bisects the third side” — the bisecting line you will use a hundred times in exercises and in Chapter 5\u2019s parallelogram theory.',
        },
      ],
      result: 'The midsegment joining the midpoints of two sides is parallel to the third side and equal to half of it — $k = 1/2$ in both directions — and conversely, the parallel through a midpoint bisects the third side.',
    },
    {
      kind: 'para',
      text: 'The midsegment earns its keep immediately, because it converts perimeter and length questions about a triangle\u2019s middle into questions about its sides, at half price. The midsegment triangle (the triangle formed by all three midsegments — the MEDIAL triangle) has each side half the side it misses, so its perimeter is exactly half the original\u2019s; its angles, each caught between two parallels to the original\u2019s sides, all match the original\u2019s — it is the $k = 1/2$ scaled copy in full, the cleanest self-similar object in elementary geometry. Surveyors use the midsegment to find the width of a river without crossing it: stand at two points $A$, $B$ on your bank, walk the midpoints of the two sight-lines to a landmark across the river, and the segment between your two midpoint stations runs at exactly half the landmark distance — parallel to the bank-to-bank line you cannot walk. The engine\u2019s numeric witness for the drill: sides $10$, $14$, $18$ carry midsegments $9$, $7$, $5$ with the medial perimeter $21$ against the original $42$.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The trapezium teaser (rides Chapter 5)',
      text: 'One shape is begging for the same treatment and will not get it yet: the TRAPEZIUM, the quadrilateral with exactly one pair of parallel sides. Its midsegment — joining the midpoints of the two non-parallel legs — is parallel to both bases (each half of the argument above runs) and its length is the AVERAGE of the bases, $(a + b)/2$: the engine pinned the witness with bases $8$ and $12$ landing at $10$, computed honestly from the leg midpoints by coordinates. Proving it properly wants the parallelogram and quadrilateral theory of Chapter 5, so the fact is planted here as a teaser and earned there. If you meet it on a quiz before Chapter 5, you read it here first.',
    },

    /* -------------------------------------------------------------- */
    /* 9. the theorem in action: three worked chains                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The theorem in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which examinations meet this theorem. The first is the numeric ladder — four segment lengths given, the fifth and sixth forced, the parallel\u2019s own length pinned last, every ratio checked both ways. The second is the converse test — ratios that ALMOST agree and the honest refusal that follows, with the true parallel located for contrast. The third is the midsegment computation — the $k = 1/2$ machine run on a clean numeric triangle, midsegments and medial perimeter in one pass. In all three the discipline is the same: name the correspondence (which segment answers which), write the proportion, solve, and CHECK by reducing both ratios.',
    },
    {
      kind: 'example',
      title: 'The numeric ladder. In $\\triangle ABC$, $DE \\parallel BC$ with $AB = 14$, $AD = 6$, $AC = 21$ and $BC = 28$. Find $DB$, $AE$, $EC$ and $DE$, and verify the ratio reads in both forms.',
      steps: [
        'Sol. The missing piece on the first rail: $DB = AB - AD = 14 - 6 = 8$.',
        'Read $k$ as a fraction of the whole: $k = AD/AB = 6/14 = 3/7$ — the parallel sits $3/7$ of the way down from $A$ (and the part-to-part ratio is $6/8 = 3/4$, the componendo image of the same cut).',
        'Apply to the second rail: $AE = k \\times AC = \\frac{3}{7} \\times 21 = 9$, and then $EC = AC - AE = 21 - 9 = 12$.',
        'Verify the theorem\u2019s own form: $AD/DB = 6/8 = 3/4$ and $AE/EC = 9/12 = 3/4$ — the rails agree, as the theorem promises they must.',
        'The parallel\u2019s own length: $DE = k \\times BC = \\frac{3}{7} \\times 28 = 12$ — the pinned engine value, with the ratio read $DE/BC = 12/28 = 3/7$ confirming the same $k$ a third time.',
        'State the return direction for completeness: reading from $\\triangle ABC$ down to $\\triangle ADE$ the factor is $k = 3/7$; reading back up it is $BC/DE = 28/12 = 7/3$.',
        'Hence $DB = 8$, $AE = 9$, $EC = 12$, $DE = 12$, with every ratio check green: $6/8 = 9/12 = 3/4$ and $6/14 = 9/21 = 12/28 = 3/7$.',
      ],
      figures: [
        {
          caption: 'The numeric computation ladder for Illustration 1: the BPT configuration with AD = 6, DB = 8 on AB = 14; AE = 9, EC = 12 on AC = 21; BC = 28 and DE = 12, with the ratio checks 6/8 = 9/12 = 3/4 and 6/14 = 9/21 = 12/28 = 3/7 written beneath.',
          svg: geo42Numeric('A triangle with a line parallel to its base cutting the left side into segments 6 and 8 totalling 14 and the right side into 9 and 12 totalling 21, with base 28 and parallel 12, and ratio checks written below.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The converse test. In $\\triangle ABC$, $D$ lies on $AB$ with $AD = 3$, $DB = 4$, and $E$ lies on $AC$ with $AE = 4$, $EC = 5$. Is $DE$ parallel to $BC$? Locate the point $E\'$ through which the parallel through $D$ would pass, and justify the verdict.',
      steps: [
        'Sol. Reduce both ratios: $AD/DB = 3/4$ on the first rail, $AE/EC = 4/5$ on the second.',
        'Compare: $3/4 = 0.75$ while $4/5 = 0.8$ — the ratios DISAGREE, so by the converse (its contrapositive form), $DE$ is NOT parallel to $BC$. No diagram is needed for the verdict; the data have already testified.',
        'Locate the true point: the parallel through $D$ meets $AC$ at the point $E\'$ with $AE\'/E\'C = 3/4$ — the ratio that matches the first rail.',
        'As a fraction of the whole side, that point sits at $AE\'/AC = 3/7 \\approx 0.429$, while the given $E$ sits at $AE/AC = 4/9 \\approx 0.444$ — near neighbours, but on a fixed segment one ratio means one point, so $E \\ne E\'$ (the engine\u2019s coordinate witness separates them by $5\\sqrt{17}/63 \\approx 0.3271$).',
        'See the failure geometrically: extended across the triangle, the line $DE$ drifts off the direction of $BC$ — the engine\u2019s cross product of the two directions is $20/9$, not zero — which is exactly what Figure S2 exaggerates for the eye.',
        'Moral for the mark scheme: the converse demands EXACT equality of ratios; “nearly equal” certifies nothing, and the near-miss $4/9$ against $3/7$ is the pinned trap.',
        'Hence $DE$ is NOT parallel to $BC$; the parallel through $D$ would meet $AC$ at the $3/7$ point $E\'$, not at the given $4/9$ point $E$.',
      ],
      figures: [
        {
          caption: 'The converse test for Illustration 2: the mismatch configuration with AD/DB = 3/4 but AE/EC = 4/5, the line DE drawn extending visibly away from the direction of BC, the true parallel through D landing at the separate point E′ — the drawn refusal of the ratio test.',
          svg: geo42Converse('A tall triangle with a point D on the base and points E and E prime on the slanted side, the line through D and E diverging visibly from the side BC, a dashed parallel through D to BC meeting the side at E prime, and a red gap arrow between the diverging lines.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The midsegment computation. $\\triangle ABC$ has $AB = 10$, $AC = 14$ and $BC = 18$. Let $D$, $E$, $F$ be the midpoints of $AB$, $AC$, $BC$ respectively. Find the three midsegments $DE$, $EF$, $FD$ and the perimeter of the midsegment triangle $DEF$, and state the scale factor with its direction.',
      steps: [
        'Sol. Identify the midsegments: $DE$ joins the midpoints of $AB$ and $AC$, so it answers the THIRD side: $DE = BC/2 = 18/2 = 9$.',
        'Likewise $EF$ joins the midpoints of $AC$ and $BC$, answering $AB$: $EF = AB/2 = 10/2 = 5$.',
        'And $FD$ joins the midpoints of $BC$ and $AB$, answering $AC$: $FD = AC/2 = 14/2 = 7$.',
        'Perimeter of the midsegment triangle: $9 + 5 + 7 = 21$ — exactly half of the original\u2019s $10 + 14 + 18 = 42$, as the half-perimeter law demands.',
        'State the direction: reading from $\\triangle ABC$ down to $\\triangle DEF$ the factor is $k = 1/2$ (every length halved); reading back up it is $k = 2$ (every length doubled).',
        'Check the parallel claims while you are there: $DE \\parallel BC$, $EF \\parallel AB$, $FD \\parallel AC$ — each midsegment parallel to the side it halves, by the midsegment theorem.',
        'Hence $DE = 9$, $EF = 5$, $FD = 7$, the perimeter of $\\triangle DEF$ is $21 = 42/2$, and the triangles stand at $k = 1/2$ (big to small) or $k = 2$ (small to big).',
      ],
      figures: [
        {
          caption: 'The midsegment computation for Illustration 3: the 10-14-18 triangle with all three midsegments drawn (DE = 9 answering BC, EF = 5 answering AB, FD = 7 answering AC), the shaded medial triangle carrying perimeter 21 = 42/2.',
          svg: geo42MidCalc('A triangle with sides 10, 14 and 18 and all three midsegments drawn, forming a shaded inner triangle labelled with midsegment lengths 9, 5 and 7 and the perimeter note 21 equals 42 over 2.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. the collected law                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect what the lesson built, in the form the revision sheet wants. The first is the theorem itself with its converse riding beside it. The second is the area lemma — the engine, stated in both forms. The third is the ratio arithmetic that shuttles between part-to-part and part-to-whole reads. The fourth is the intercept law the ladder runs on. The fifth is the midsegment law at $k = 1/2$ with its converse. Read them once here, then again from the auto-generated formula sheet at revision time.',
    },
    {
      kind: 'formula',
      name: 'Basic Proportionality Theorem (Thales, Euclid VI.2)',
      latex: 'DE \\parallel BC \\;\\Rightarrow\\; \\frac{AD}{DB} = \\frac{AE}{EC}, \\qquad \\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC} = k',
      note: 'a line parallel to one side divides the other two sides in the same ratio — witness: AD = 6, DB = 8 forces AE = 9, EC = 12; k = 3/7 part-to-whole, 3/4 part-to-part',
    },
    {
      kind: 'formula',
      name: 'Converse of the BPT (the ratio test for parallels)',
      latex: '\\frac{AD}{DB} = \\frac{AE}{EC} \\;\\Rightarrow\\; DE \\parallel BC',
      note: 'equal ratios certify the parallel; disagreeing ratios refute it — the pinned refusal: 3/4 against 4/5 is NOT parallel',
    },
    {
      kind: 'formula',
      name: 'The equal-altitude area lemma (the engine)',
      latex: '[PBC] = [QBC] \\;(P, Q \\text{ on a parallel of } BC); \\qquad \\frac{[PXY]}{[PXZ]} = \\frac{XY}{XZ}',
      note: 'same base + same parallels: equal areas; same vertex + collinear bases: areas ride the bases — the proof\u2019s two moves',
    },
    {
      kind: 'formula',
      name: 'The ratio arithmetic (componendo and back)',
      latex: '\\frac{AD}{DB} = r \\;\\Leftrightarrow\\; \\frac{AD}{AB} = \\frac{r}{1+r}; \\qquad \\frac{AD}{AB} = k \\;\\Leftrightarrow\\; \\frac{AD}{DB} = \\frac{k}{1-k}',
      note: 'part-to-part and part-to-whole are two readings of one cut — witness: 3/4 parts means 3/7 of the whole',
    },
    {
      kind: 'formula',
      name: 'The intercept ladder and the midsegment (k = 1/2)',
      latex: 'n \\text{ equal gaps} \\Rightarrow n+1 \\text{ equal parts}; \\qquad DE = \\tfrac{1}{2}BC \\;(D, E \\text{ midpoints}), \\; DE \\parallel BC',
      note: 'equally spaced parallels cut every transversal into equal segments; the midpoint cut halves the third side — and the parallel through a midpoint bisects the third side',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the working discipline for every BPT question',
      text: 'FIRST, draw the figure and LABEL the four segments before touching algebra — the two near pieces ($AD$, $AE$) and the two far pieces ($DB$, $EC$); most wrong answers are correspondence errors, not arithmetic ones. SECOND, choose your ratio form deliberately: part-to-part ($AD/DB = AE/EC$) when the data are the pieces, part-to-whole ($AD/AB = AE/AC = DE/BC = k$) when a total is involved — and convert by componendo, never by guessing. THIRD, for converse questions, reduce both ratios fully and COMPARE them in the written line (“$6/8 = 3/4$, $9/12 = 3/4$, equal, hence parallel” earns the mark; a bare “yes” does not). FOURTH, in proofs, name the two auxiliary triangles and cite the lemma form for each claim — “$[BDE] = [CDE]$ (same base $DE$, same parallels $DE \\parallel BC$)” is a full-mark sentence. The pinned witnesses to memorise: $14$-$6$-$8$ with $21$-$9$-$12$ and $DE = 12$; the $3/4$-against-$4/5$ refusal; $3$ gaps $\\to 4$ parts; $k = 1/2$ with perimeter $42 \\to 21$.',
    },

    /* -------------------------------------------------------------- */
    /* 11. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'basic proportionality theorem', def: 'A line parallel to one side of a triangle divides the other two sides in the same ratio: $DE \\parallel BC$ gives $AD/DB = AE/EC$ (Thales\u2019 theorem; Euclid VI.2). Proved by the equal-altitude area argument.' },
        { term: 'equal-altitude area lemma', def: 'Triangles on the same base and between the same parallels have equal areas; dually, triangles sharing a vertex with bases on one line have areas in the ratio of their bases. The two-form engine behind the BPT proof.' },
        { term: 'converse of the BPT', def: 'If a line divides two sides of a triangle in the same ratio, it is parallel to the third side. Certified by the one-ratio-one-point argument; refuted by the pinned mismatch $3/4 \\ne 4/5$.' },
        { term: 'componendo (ratio arithmetic)', def: 'Converting between ratio reads: $AD/DB = r$ gives $AD/AB = r/(1+r)$, and back. On the witness: parts $3{:}4$ mean $3/7$ of the whole — the part-to-part read $3/4$ and the part-to-whole read $3/7$ are one cut seen two ways.' },
        { term: 'intercept theorem', def: 'If equally spaced parallels cut one transversal into equal segments, they cut every transversal into equal segments; $n$ equal gaps produce $n + 1$ equal parts. The ladder form of the BPT, and the compass-and-parallel method for dividing a segment into any number of equal parts.' },
        { term: 'midsegment (midline)', def: 'The segment joining the midpoints of two sides of a triangle: parallel to the third side and equal to half of it, $DE = BC/2$ at $k = 1/2$ (return read $k = 2$). Proved by extending the midsegment its own length and harvesting a parallelogram.' },
        { term: 'medial triangle', def: 'The triangle formed by the three midsegments: each side half the side it misses, perimeter half the original ($21$ against $42$ on the $10$-$14$-$18$ witness), angles matching the original — the $k = 1/2$ scaled copy.' },
        { term: 'converse of the midsegment theorem', def: 'The line through the midpoint of one side, parallel to a second side, bisects the third side — the BPT at ratio $1{:}1$.' },
        { term: 'one-ratio-one-point law', def: 'On a fixed segment, the ratio $AE/EC$ determines the point: $AE = \\frac{r}{1+r} \\cdot AC$. The injectivity that makes the converse proof close — different ratios, different points, always.' },
        { term: 'Thales configuration', def: 'The BPT picture — a triangle with a parallel cutting its two sides — together with its shadow-measurement heritage: similar triangles converting unreachable lengths into reachable ratios, as in the pyramid tradition.' },
        { term: 'trapezium midsegment (teaser)', def: 'The segment joining the midpoints of the legs of a trapezium: parallel to the bases with length the average $(a+b)/2$ (witness: $8$ and $12$ giving $10$). Earned in Chapter 5\u2019s quadrilateral theory.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 12. quiz (key [1,3,0,4,2] — PINNED)                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In $\\triangle ABC$, the line $DE$ is drawn with $D$ on $AB$, $E$ on $AC$ and $DE \\parallel BC$. The Basic Proportionality Theorem guarantees —',
          options: [
            '$AD/AE = DB/EC$, each side\u2019s pieces crossed against the other side\u2019s',
            '$AD/DB = AE/EC$ — the near pieces over the far pieces, the same ratio on both sides',
            '$AD/AB = EC/AE$, the whole of one side against the far piece of the other',
            '$AB/AD = AC/EC$, the totals over one piece each',
          ],
          answer: 1,
          explain: 'The theorem\u2019s ratio is SAME-RAIL: the piece adjacent to $A$ on $AB$ answers the piece adjacent to $A$ on $AC$, and the far pieces answer each other — $AD/DB = AE/EC$, here $6/8 = 9/12 = 3/4$. Option (a) CROSSES the rails, pairing $AD$ with $AE$ and $DB$ with $EC$ — a true proportion only in special cases, never a theorem. Option (c) mixes a part-to-whole read on one side with an upside-down read on the other. Option (d) inverts the natural direction and mismatches pieces. The honest part-to-whole companion, $AD/AB = AE/AC$, is a componendo consequence, not the statement itself.',
        },
        {
          q: 'With $DE \\parallel BC$, suppose $AD = 6$ and $DB = 8$. Then the part-to-whole ratio $AD/AB$ is —',
          options: [
            '$3/4$, since the part-to-part ratio carries over unchanged',
            '$4/7$, the far piece over the whole',
            '$2/3$, half of $3/4$ rounded to a book fraction',
            '$3/7$, since $AD$ is $3$ parts of the $3 + 4 = 7$ parts that make $AB$',
          ],
          answer: 3,
          explain: 'Componendo: if $AD/DB = 6/8 = 3/4$, then $AD$ is $3$ common parts, $DB$ is $4$, and the whole $AB = AD + DB$ is $7$ parts — so $AD/AB = 6/14 = 3/7$. Option (a) is the classic slip of quoting the part-to-part ratio where the whole is wanted. Option (b) computes $DB/AB$ — the far piece\u2019s share, $4/7$, which is a true but different number (and wrote it for the wrong piece). Option (c) is arithmetic noise. Both reads describe one cut: $3/4$ part-to-part, $3/7$ part-to-whole, and the engine pinned both on the $14$-$6$-$8$ witness.',
        },
        {
          q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AB = 14$, $AD = 6$, $AC = 21$ and $BC = 28$. The length $DE$ is —',
          options: [
            '$12$, since $DE/BC = AD/AB = 6/14 = 3/7$ and $28 \\times 3/7 = 12$',
            '$9$, the same as $AE$ — the parallel matches the near piece',
            '$28/3$, reading the proportion upside down',
            '$10.5$, half of $21$, since parallels halve things',
          ],
          answer: 0,
          explain: 'The parallel runs at the same fraction of the base as the cut runs along the sides: $k = AD/AB = 6/14 = 3/7$, so $DE = k \\times BC = \\frac{3}{7} \\times 28 = 12$ — the pinned engine value. Option (b) confuses the parallel\u2019s length with the side-piece $AE = 9$; there is no theorem equalling those. Option (c) multiplies by the reciprocal $7/3$, the return-direction slip ($BC = DE \\times 7/3$, not $DE = BC \\times 7/3$). Option (d) imports the midsegment halving, which belongs to the $k = 1/2$ midpoint cut — here the cut is at $3/7$, not $1/2$.',
        },
        {
          q: 'A line cuts $AB$ at $D$ and $AC$ at $E$ with $AD/DB = 3/4$ and $AE/EC = 4/5$. The verdict on $DE$ and $BC$ is —',
          options: [
            'parallel, since both ratios exceed $1/2$',
            'parallel, by the converse of the midsegment theorem',
            'parallel, since $3/4$ and $4/5$ are close enough for proportionality',
            'cannot be determined from ratios alone — an angle measurement is needed',
            'NOT parallel — the ratios disagree ($3/4 \\ne 4/5$), and the converse demands exact equality',
          ],
          answer: 4,
          explain: 'The converse certifies a parallel ONLY when the two rail ratios are exactly equal; $3/4 = 0.75$ against $4/5 = 0.8$ disagree, so $DE$ is NOT parallel to $BC$ — the engine\u2019s coordinate check gives a cross product of $20/9$ between the two directions, not zero. Option (a) invents a threshold — proportionality is equality, not “both big”. Option (b) misfiles the midsegment converse, which needs ratios $1/1$ at midpoints. Option (c) is the pinned near-miss trap: as fractions of the whole side, $3/7 \\approx 0.429$ and $4/9 \\approx 0.444$ sit close, but close is not equal, and one ratio means one point. Option (d) underrates the data — ratios alone settle the question, which is exactly why surveyors love this test.',
        },
        {
          q: '$D$ and $E$ are the midpoints of $AB$ and $AC$ in $\\triangle ABC$. Then the midsegment $DE$ equals —',
          options: [
            '$BC \\times 2$, the midpoint cut doubling the base',
            '$BC^2$, an area-flavoured read of the midline',
            '$BC/2$, the $k = 1/2$ case of the proportionality law',
            '$BC/4$, a quarter since two sides are halved',
          ],
          answer: 2,
          explain: 'The midsegment theorem: the segment joining the midpoints of two sides is parallel to the third side and equal to HALF of it — $k = AD/AB = 1/2$, so $DE = BC/2$ (return read $k = 2$). Option (a) reverses the direction: it is the BIG triangle that is the double of the small one, not the midsegment that doubles the base. Option (b) imports the area law $k^2$ — but $DE$ is a length, and lengths ride the bare $k$; on the $10$-$14$-$18$ witness the midsegments are $9$, $7$, $5$, not $81$, $49$, $25$. Option (d) double-halves: one cut at $1/2$ per side, one factor of $1/2$ for the parallel, not two.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 13. graded exercises (15, L1-L6, full Cengage step solutions)   */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the proportionality machine and its audits',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AD = 4$, $DB = 6$ and $AC = 20$. Write down $AD/DB$, then find $AE$ and $EC$.',
              solution: [
                'Sol. The part-to-part ratio on the first rail: $AD/DB = 4/6 = 2/3$.',
                'By the BPT the second rail carries the same ratio: $AE/EC = 2/3$.',
                'Read $k$ as a fraction of the whole: $k = AD/AB = 4/10 = 2/5$.',
                'Apply to the second rail: $AE = k \\times AC = \\frac{2}{5} \\times 20 = 8$, and $EC = 20 - 8 = 12$.',
                'Hence $AD/DB = 2/3$, with $AE = 8$ and $EC = 12$ (check: $8/12 = 2/3$).',
              ],
              answer: '$AD/DB = 2/3$; $AE = 8$; $EC = 12$',
            },
            {
              q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AB = 10$, $AD = 4$ and $AC = 15$. Find $DB$, $AE$ and $EC$, and state the ratio $AD/AB$.',
              solution: [
                'Sol. The far piece on the first rail: $DB = AB - AD = 10 - 4 = 6$.',
                'The cut as a fraction of the whole: $AD/AB = 4/10 = 2/5$ — and by componendo the part-to-part ratio is $4/6 = 2/3$, one cut seen two ways.',
                'Apply the fraction to the second rail: $AE = \\frac{2}{5} \\times 15 = 6$, and $EC = 15 - 6 = 9$.',
                'Verify the theorem\u2019s form: $AD/DB = 4/6 = 2/3$ and $AE/EC = 6/9 = 2/3$ — the rails agree.',
                'Hence $DB = 6$, $AE = 6$, $EC = 9$, with $AD/AB = 2/5$.',
              ],
              answer: '$DB = 6$; $AE = 6$; $EC = 9$; $AD/AB = 2/5$',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AD = 3$, $DB = 5$ and $AE = 4.5$. Find $EC$ and $AC$.',
              solution: [
                'Sol. Write the proportion from the theorem: $AD/DB = AE/EC$, that is $3/5 = 4.5/EC$.',
                'Solve: $EC = 4.5 \\times 5/3 = 7.5$.',
                'The whole side: $AC = AE + EC = 4.5 + 7.5 = 12$.',
                'Check both rails: $3/5 = 0.6$ and $4.5/7.5 = 0.6$ — equal, as the parallel demands.',
                'Hence $EC = 7.5$ and $AC = 12$.',
              ],
              answer: '$EC = 7.5$; $AC = 12$',
            },
            {
              q: 'Solve for $x$: in $\\triangle ABC$, $DE \\parallel BC$ with $AD = x$, $DB = 12$, $AE = 6$ and $EC = 8$.',
              solution: [
                'Sol. The theorem\u2019s proportion: $AD/DB = AE/EC$, that is $x/12 = 6/8$.',
                'Reduce the known ratio: $6/8 = 3/4$.',
                'Solve: $x = 12 \\times 3/4 = 9$.',
                'Check the part-to-whole consistency: $AD/AB = 9/21 = 3/7$, and $AE/AC = 6/14 = 3/7$ — the same fraction of the whole on both rails.',
                'Hence $x = 9$.',
              ],
              answer: '$x = 9$',
            },
            {
              q: 'In $\\triangle ABC$, $D$ lies on $AB$ with $AD = 6$, $DB = 8$, and $E$ lies on $AC$ with $AE = 9$, $EC = 12$. Is $DE \\parallel BC$? Justify with the converse.',
              solution: [
                'Sol. Reduce both rail ratios: $AD/DB = 6/8 = 3/4$ and $AE/EC = 9/12 = 3/4$.',
                'Compare: the ratios are exactly equal.',
                'By the converse of the BPT, equal ratios certify the parallel: $DE \\parallel BC$.',
                'Extra confidence, free of charge: the part-to-whole reads also agree ($6/14 = 9/21 = 3/7$), and — the engine\u2019s coordinate check — the directions of $DE$ and $BC$ have cross product $0$.',
                'Hence yes: $DE \\parallel BC$, certified by the ratio test.',
              ],
              answer: 'yes — $6/8 = 9/12 = 3/4$, so $DE \\parallel BC$ by the converse',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AB = 12$, $AC = 18$, $AD = 8$ and $BC = 15$. Find $DB$, $AE$, $EC$ and $DE$, and state $k$ with its direction.',
              solution: [
                'Sol. The far piece: $DB = 12 - 8 = 4$.',
                'The cut fraction: $k = AD/AB = 8/12 = 2/3$ (part-to-part: $8/4 = 2/1$ — one cut, two reads).',
                'The second rail: $AE = \\frac{2}{3} \\times 18 = 12$, so $EC = 18 - 12 = 6$.',
                'Verify: $AD/DB = 8/4 = 2$ and $AE/EC = 12/6 = 2$ — equal.',
                'The parallel\u2019s length: $DE = k \\times BC = \\frac{2}{3} \\times 15 = 10$.',
                'Hence $DB = 4$, $AE = 12$, $EC = 6$, $DE = 10$, with $k = 2/3$ reading from $\\triangle ABC$ down to $\\triangle ADE$ (return read $3/2$).',
              ],
              answer: '$DB = 4$; $AE = 12$; $EC = 6$; $DE = 10$ (at $k = 2/3$, whole to corner triangle)',
            },
            {
              q: 'The divide-a-segment machine. A 24 cm rail and a 32 cm rail are both crossed by the same four equally spaced parallel lines (three gaps between consecutive parallels). Find the parts cut on each rail, and explain why the parts are equal on each rail but different between the rails.',
              solution: [
                'Sol. Count: four parallels make three gaps, and by the intercept law the parts they cut on any transversal number three gaps plus the two end pieces — but in the ladder picture, the parallels through the quarter marks of one rail cut that rail into $3 + 1 = 4$ equal parts.',
                'On the 24 cm rail: four equal parts of $24/4 = 6$ cm each.',
                'On the 32 cm rail, the SAME parallels: four equal parts of $32/4 = 8$ cm each.',
                'Why equal within a rail: each rung sits at the same FRACTION of the way along every transversal it meets (the BPT cascade), so equal fractions of one length are equal lengths.',
                'Why different across rails: the fraction is of a DIFFERENT total — $1/4$ of 24 cm is 6 cm, $1/4$ of 32 cm is 8 cm; equally spaced parallels cut equal fractions, not equal lengths, and the steeper the crossing angle the longer the collected parts (the engine\u2019s two transversals collected $\\sqrt{109}$ against $\\sqrt{116}$).',
                'Hence the 24 cm rail falls into parts of 6 cm and the 32 cm rail into parts of 8 cm.',
              ],
              answer: '24 cm rail: four parts of 6 cm; 32 cm rail: four parts of 8 cm',
              figures: [
                {
                  caption: 'The intercept machine for Exercise 7: one set of four equally spaced parallels crossing two transversals — the 24 cm rail cut into four 6 cm parts, the 32 cm rail into four 8 cm parts, equal within each rail and different across rails.',
                  svg: geo42Intercept('Four equally spaced horizontal parallel lines crossing two slanted transversals, one cut into segments labelled 6 centimetres and the other into segments labelled 8 centimetres.'),
                },
              ],
            },
            {
              q: '$\\triangle ABC$ has $AB = 10$, $AC = 14$, $BC = 18$. Let $D$, $E$, $F$ be the midpoints of $AB$, $AC$, $BC$. Find $DE$, $EF$, $FD$, and the perimeters of $\\triangle ABC$ and $\\triangle DEF$.',
              solution: [
                'Sol. The midsegment $DE$ joins the midpoints of $AB$ and $AC$, so it answers the third side: $DE = BC/2 = 18/2 = 9$.',
                'Likewise $EF$ answers $AB$: $EF = AB/2 = 10/2 = 5$; and $FD$ answers $AC$: $FD = AC/2 = 14/2 = 7$.',
                'Perimeter of the original: $10 + 14 + 18 = 42$.',
                'Perimeter of the midsegment triangle: $9 + 5 + 7 = 21$ — exactly half.',
                'State the scale: the medial triangle is the $k = 1/2$ copy (big to small); reading up, $k = 2$.',
                'Hence $DE = 9$, $EF = 5$, $FD = 7$, with perimeters $42$ and $21 = 42/2$.',
              ],
              answer: '$DE = 9$; $EF = 5$; $FD = 7$; perimeters $42$ and $21$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The refutation, in full. In $\\triangle ABC$, $D$ lies on $AB$ with $AD/DB = 3/4$, and $E$ lies on $AC$ with $AE/EC = 4/5$. Prove that $DE$ is not parallel to $BC$, and locate the point $E\'$ at which the parallel through $D$ would meet $AC$.',
              solution: [
                'Sol. Suppose, for contradiction, that $DE \\parallel BC$. Then by the BPT, $AD/DB = AE/EC$, i.e. $3/4 = 4/5$ — which is false ($0.75 \\ne 0.8$).',
                'The supposition dies: $DE$ is NOT parallel to $BC$. (Equivalently: the converse requires exact ratio agreement, and agreement fails.)',
                'Locate the true point: the parallel through $D$ meets $AC$ at $E\'$ satisfying $AE\'/E\'C = AD/DB = 3/4$.',
                'Convert to a fraction of the whole: $AE\'/AC = 3/(3+4) = 3/7$, whereas the given $E$ sits at $AE/AC = 4/(4+5) = 4/9$.',
                'One ratio means one point ($3/7 \\ne 4/9$, since $27 \\ne 28$), so $E\' \\ne E$ — the engine\u2019s coordinates separate them by $5\\sqrt{17}/63 \\approx 0.3271$ and give the $DE$-against-$BC$ cross product $20/9 \\ne 0$.',
                'Hence $DE$ is not parallel to $BC$; the parallel through $D$ lands at the $3/7$-point $E\'$ of $AC$, not at the given $4/9$-point $E$.',
              ],
              answer: 'NOT parallel ($3/4 \\ne 4/5$); the true parallel meets $AC$ at $E\'$ with $AE\'/AC = 3/7$ (the given $E$ is at $4/9$)',
              figures: [
                {
                  caption: 'The refutation sketch for Exercise 9: the cut at ratio 3/4 on one rail and 4/5 on the other, the cut line DE drawn against the base BC — visibly not parallel, since the ratios disagree and the converse demands exact equality.',
                  svg: geo42Refute('A triangle with a point D on the left side at ratio three quarters and a point E on the right side at ratio four fifths, the cut line DE drawn in red and the base BC in green, labelled NOT parallel since three quarters differs from four fifths.'),
                },
              ],
            },
            {
              q: 'In $\\triangle ABC$, $DE \\parallel BC$ with $AB = 21$, $AD = 9$, $AC = 14$ and $BC = 35$. Find $DB$, $AE$, $EC$ and $DE$, and verify all three ratio reads.',
              solution: [
                'Sol. The far piece: $DB = 21 - 9 = 12$.',
                'The cut fraction: $k = AD/AB = 9/21 = 3/7$ (part-to-part: $9/12 = 3/4$).',
                'The second rail: $AE = \\frac{3}{7} \\times 14 = 6$, so $EC = 14 - 6 = 8$.',
                'The parallel: $DE = \\frac{3}{7} \\times 35 = 15$.',
                'Verify all three reads: $AD/DB = 9/12 = 3/4$; $AE/EC = 6/8 = 3/4$; $AD/AB = 9/21 = 3/7$ and $AE/AC = 6/14 = 3/7$ and $DE/BC = 15/35 = 3/7$ — one $k$ across the whole configuration.',
                'Hence $DB = 12$, $AE = 6$, $EC = 8$, $DE = 15$, the $3/4$-$3/7$ structure a second time.',
              ],
              answer: '$DB = 12$; $AE = 6$; $EC = 8$; $DE = 15$ (all reads: $3/4$ part-to-part, $3/7$ part-to-whole)',
            },
            {
              q: 'Quartering a triangle. In $\\triangle PQR$, points divide $PQ$ into four equal parts, and through each division point a line is drawn parallel to $QR$, meeting $PR$. If $PR = 28$ and $QR = 24$, find the parts cut on $PR$, the position of the meeting point of the $3/4$-mark parallel (measured from $P$), and that parallel\u2019s own length.',
              solution: [
                'Sol. The quarter marks on $PQ$ sit at fractions $1/4$, $2/4$, $3/4$ from $P$; by the BPT the parallels through them cut $PR$ at the same fractions.',
                'The parts on $PR$: four equal pieces of $28/4 = 7$ each ($3$ gaps $\\to 3 + 1 = 4$ parts).',
                'The $3/4$-mark parallel meets $PR$ at $\\frac{3}{4} \\times 28 = 21$ from $P$ (so it cuts $PR$ into $21$ and $7$).',
                'Its own length: the rung runs at $k = 3/4$ of the base, so $\\frac{3}{4} \\times 24 = 18$.',
                'Consistency read: on the $PR$ rail the part-to-part ratio at that rung is $21/7 = 3/1$, the componendo image of $k = 3/4$ — the k-table row as drawn.',
                'Hence $PR$ falls into parts of 7; the $3/4$ rung meets $PR$ at 21 from $P$ and itself runs 18 long.',
              ],
              answer: 'parts of $7$; the $3/4$-mark parallel meets $PR$ at $21$ from $P$ and has length $18$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Prove the converse of the midsegment theorem: in $\\triangle ABC$, the line through the midpoint $D$ of $AB$, drawn parallel to $BC$, meets $AC$ at its midpoint. Then witness it: with $AC = 16$, state where the line meets $AC$.',
              solution: [
                'Sol. Let the line through $D$ parallel to $BC$ meet $AC$ at $E$. Because $DE \\parallel BC$, the BPT applies: $AD/DB = AE/EC$.',
                'Substitute the midpoint data: $AD = DB$, so $AD/DB = 1/1$.',
                'Hence $AE/EC = 1/1$, i.e. $AE = EC$: the line bisects $AC$, and $E$ is the midpoint — the parallel through one midpoint bisects the third side.',
                'Witness: with $AC = 16$, the line meets it at $AE = EC = 16/2 = 8$.',
                'Check the midsegment length claim while there: $DE$ is now the midsegment, so $DE = BC/2$ at $k = 1/2$ (return $k = 2$).',
                'Hence proved, and the meeting point sits at the midpoint: 8 and 8 on the 16-unit side.',
              ],
              answer: 'proved ($AD/DB = 1$ forces $AE/EC = 1$); on $AC = 16$ the line meets at $AE = EC = 8$',
            },
            {
              q: 'Two parallels in one triangle. In $\\triangle ABC$, $DE \\parallel BC$ with $AD/AB = 2/5$, and $FG \\parallel BC$ with $AF/AB = 4/5$ ($D$ between $A$ and $F$). If $BC = 30$, find $DE$ and $FG$, the ratio $DE/FG$, and the fraction of $AB$ by which $D$ and $F$ are separated.',
              solution: [
                'Sol. Each parallel runs at its own cut fraction: $DE = \\frac{2}{5} \\times 30 = 12$ and $FG = \\frac{4}{5} \\times 30 = 24$.',
                'The ratio: $DE/FG = 12/24 = 1/2$ — the two-fifths parallel is half the four-fifths parallel (in general $DE/FG = 2/4$ from the fractions).',
                'The separation on the rail: $DF/AB = 4/5 - 2/5 = 2/5$.',
                'Part-to-part reads for honesty: at $D$, $AD/DB = 2/3$ (componendo of $2/5$); at $F$, $AF/FB = 4/1$ (componendo of $4/5$).',
                'The strip between the parallels is a trapezium with parallel sides $12$ and $24$ — the shape whose midsegment length $(12 + 24)/2 = 18$ Chapter 5 will certify (and which the $D$-to-$F$ midpoint rung would carry).',
                'Hence $DE = 12$, $FG = 24$, $DE/FG = 1/2$, with $D$ and $F$ separated by $2/5$ of $AB$.',
              ],
              answer: '$DE = 12$; $FG = 24$; $DE/FG = 1/2$; $DF/AB = 2/5$',
              figures: [
                {
                  caption: 'The two-parallels strip for Exercise 13: DE at k = 2/5 measuring 12, FG at k = 4/5 measuring 24, both parallel to BC = 30 — the strip between them a trapezium with parallel sides 12 and 24.',
                  svg: geo42TwoPar('A triangle with two parallels to the base, one at two fifths of the height labelled DE = 12 and one at four fifths labelled FG = 24, with the base BC = 30 and a shaded strip between the parallels.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The uniqueness lemma, proved and witnessed. (a) Prove: on a fixed segment $AC$, if $AE/EC = AE\'/E\'C$ with $E$, $E\'$ both interior points, then $E = E\'$. (b) Witness it: on $AC = 21$, locate the points with ratios $3/4$ and $4/5$, and confirm they differ.',
              solution: [
                'Sol. (a) Let the common ratio be $r$. From $AE/EC = r$ and $AE + EC = AC$: $AE = r \\cdot EC = r(AC - AE)$, so $AE(1 + r) = r \\cdot AC$ and $AE = \\frac{r}{1+r} \\cdot AC$ — a single value determined by $r$ alone.',
                'The same computation with $E\'$ gives $AE\' = \\frac{r}{1+r} \\cdot AC$ — the same value, and on a segment a distance from $A$ determines the point: $E = E\'$.',
                '(Equivalently, monotonicity: $AE/(AC - AE)$ strictly increases as $AE$ runs from $0$ to $AC$ — the engine swept it value by value — so the ratio read is injective.)',
                '(b) The $3/4$ point: $AE = \\frac{3/4}{7/4} \\times 21 = \\frac{3}{7} \\times 21 = 9$, so $E$ sits at 9 with $EC = 12$.',
                'The $4/5$ point: $AE\' = \\frac{4/5}{9/5} \\times 21 = \\frac{4}{9} \\times 21 = \\frac{28}{3} \\approx 9.3333$, so $E\'$ sits at $28/3 \\ne 9$.',
                'Hence one ratio means one point: the map $r \\mapsto \\frac{r}{1+r} AC$ is injective, witnessed by $9 \\ne 28/3$ on the 21-unit segment — the engine of the converse proof.',
              ],
              answer: '(a) $AE = \\frac{r}{1+r} \\cdot AC$ is determined by $r$ alone, so equal ratios force equal points; (b) the $3/4$ point is at $9$, the $4/5$ point at $28/3 \\approx 9.3333$ — different',
            },
            {
              q: 'The proof audited by areas. In $\\triangle ABC$, $AB = 14$, $AC = 21$, and $DE \\parallel BC$ with $AD = 6$, $AE = 9$ (the right angle at $A$). Join $BE$ and $CD$. Compute $[ADE]$, $[BDE]$ and $[CDE]$, verify $[BDE] = [CDE]$, and show that the two common-altitude divisions return $AD/DB$ and $AE/EC$ — the entire proof of Section 4, run numerically.',
              solution: [
                'Sol. Place the witness on coordinates: $A = (0,0)$, $B = (14,0)$, $C = (0,21)$, so $D = (6,0)$ and $E = (0,9)$.',
                'Compute $[ADE] = \\frac{1}{2} \\times AD \\times AE = \\frac{1}{2} \\times 6 \\times 9 = 27$ (the right angle at $A$ makes the legs the base and height).',
                'Compute $[BDE] = \\frac{1}{2} \\times DB \\times$ (height of $E$ over $AB$) $= \\frac{1}{2} \\times 8 \\times 9 = 36$.',
                'Compute $[CDE] = \\frac{1}{2} \\times EC \\times$ (height of $D$ over $AC$) $= \\frac{1}{2} \\times 12 \\times 6 = 36$.',
                'Verify the equal-area step: $[BDE] = [CDE] = 36$ — same base $DE$, vertices $B$ and $C$ on the parallel $BC$, exactly the lemma\u2019s certificate.',
                'Run the divisions: $[ADE]/[BDE] = 27/36 = 3/4 = AD/DB$ (common vertex $E$) and $[ADE]/[CDE] = 27/36 = 3/4 = AE/EC$ (common vertex $D$) — chaining, $AD/DB = AE/EC$, the theorem, its whole proof compressed into four areas.',
                'Hence $[ADE] = 27$, $[BDE] = [CDE] = 36$, and the two divisions both return $3/4$ — the proof audited number by number.',
              ],
              answer: '$[ADE] = 27$; $[BDE] = [CDE] = 36$; the divisions give $27/36 = 3/4 = AD/DB = AE/EC$',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}
