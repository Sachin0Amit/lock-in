import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — teal/emerald hues,  */
/* c41's blueprint family hue-shifted to the rigid-motion family)      */
/* ------------------------------------------------------------------ */
const c51 = {
  ink: '#0f766e', // primary text — deep teal ink
  mid: '#0d9488', // mid teal — axes, preimage strokes
  teal: '#0891b2', // cyan — captions, light strokes, secondary structure
  amber: '#d97706', // connectors, vectors, motion arrows
  orange: '#ea580c', // accent — images, highlights, key values
  red: '#dc2626', // refusal / centres / marked points
  green: '#16a34a', // structure strokes — polygons, verdicts
  panel: '#ccfbf1', // teal tinted fill
  panel2: '#fef3c7', // amber tinted fill
  sep: '#99f6e4', // light separators (bar fills)
  faint: '#5eead4', // faint dots, grids
  white: '#ffffff',
  paper: '#f0fdfa',
}
const f51 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo51 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo51Txt = (
  x: number, y: number, s: string,
  size = 13, color = c51.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f51}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo51Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c51.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo51Dot = (x: number, y: number, color = c51.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo51Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo51Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo51RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c51.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo51Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo51Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c51.amber, w = 2,
  dash = '',
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo51Line(x1, y1, x2, y2, color, w, dash) + geo51Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, positive = downward on screen) */
const geo51Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo51Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** number with the U+2212 minus for SVG text */
const g51num = (n: number): string => (n < 0 ? `−${Math.abs(n)}` : String(n))

/** coordinate grid + axes + tick labels: math point (x, y) sits at pixel (ox + x*u, oy − y*u) */
const geo51Grid = (
  x0: number, x1: number, y0: number, y1: number,
  u: number, ox: number, oy: number, step = 2,
): string => {
  let s = ''
  for (let x = x0; x <= x1; x++) s += geo51Line(ox + x * u, oy - y1 * u, ox + x * u, oy - y0 * u, c51.faint, 1.2)
  for (let y = y0; y <= y1; y++) s += geo51Line(ox + x0 * u, oy - y * u, ox + x1 * u, oy - y * u, c51.faint, 1.2)
  s += geo51Line(ox + x0 * u, oy, ox + x1 * u, oy, c51.mid, 2)
  s += geo51Line(ox, oy - y1 * u, ox, oy - y0 * u, c51.mid, 2)
  for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) if (x !== 0) s += geo51Txt(ox + x * u, oy + 14, g51num(x), 11, c51.teal)
  for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) if (y !== 0) s += geo51Txt(ox - 8, oy - y * u + 4, g51num(y), 11, c51.teal, 'end')
  s += geo51Txt(ox - 10, oy + 14, 'O', 11, c51.ink, 'end')
  return s
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the slide: T_(3,-2) carries P, Q with one vector   */
/* ------------------------------------------------------------------ */
const geo51Slide = (aria: string): string => {
  const parts: string[] = []
  const u = 36, ox = 68, oy = 232
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'THE SLIDE T_(3, −2): EVERY POINT MOVES BY THE SAME VECTOR', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-2, 12, -4, 4, u, ox, oy))
  parts.push(geo51Line(px(0), py(0), px(5), py(1), c51.mid, 3))
  parts.push(geo51Line(px(3), py(-2), px(8), py(-1), c51.orange, 3))
  parts.push(geo51Arrow(px(5), py(1), px(8), py(-1), c51.amber, 2.2))
  parts.push(geo51Arrow(px(0), py(0), px(3), py(-2), c51.amber, 2.2))
  parts.push(geo51Dot(px(5), py(1), c51.ink, 4.5))
  parts.push(geo51Dot(px(8), py(-1), c51.orange, 4.5))
  parts.push(geo51Dot(px(0), py(0), c51.ink, 4.5))
  parts.push(geo51Dot(px(3), py(-2), c51.orange, 4.5))
  parts.push(geo51Txt(px(5) - 6, py(1) - 14, 'P (5, 1)', 12.5, c51.ink, 'end'))
  parts.push(geo51Txt(px(8) + 4, py(-1) - 12, 'P′ (8, −1)', 12.5, c51.orange, 'start'))
  parts.push(geo51Txt(px(0) + 4, py(0) + 20, 'Q (0, 0)', 12.5, c51.ink, 'start'))
  parts.push(geo51Txt(px(3) + 2, py(-2) + 20, 'Q′ (3, −2)', 12.5, c51.orange, 'start'))
  parts.push(geo51Txt(px(2.4), py(0.7), '√26 ≈ 5.0990199', 12, c51.teal, 'start'))
  parts.push(geo51Txt(px(8.6), py(-1.9), 'the same vector (3, −2)', 12, c51.amber, 'start'))
  parts.push(geo51Txt(320, 404, 'the segment and its image have the SAME length: the slide is a rigid motion', 12.5, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the mirror machine x = 3 (perpendicular bisector)  */
/* ------------------------------------------------------------------ */
const geo51Mirror = (aria: string): string => {
  const parts: string[] = []
  const u = 44, ox = 140, oy = 300
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'THE MIRROR MACHINE x = 3: P (1, 2) → P′ (5, 2)', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-1, 7, -1, 5, u, ox, oy))
  parts.push(geo51Line(px(3), py(5), px(3), py(-1), c51.green, 3.2))
  parts.push(geo51Txt(px(3), py(5) - 8, 'the mirror x = 3', 12, c51.green, 'middle', '700'))
  parts.push(geo51Line(px(1), py(2), px(5), py(2), c51.amber, 2.2, '6 4'))
  parts.push(geo51RA(px(3), py(2), 1, 0, 0, -1, 12, c51.red))
  parts.push(geo51Dot(px(1), py(2), c51.ink, 4.5))
  parts.push(geo51Dot(px(5), py(2), c51.orange, 4.5))
  parts.push(geo51Dot(px(3), py(2), c51.red, 4.5))
  parts.push(geo51Txt(px(1), py(2) + 24, 'P (1, 2)', 12.5, c51.ink, 'middle'))
  parts.push(geo51Txt(px(5), py(2) + 24, 'P′ (5, 2)', 12.5, c51.orange, 'middle'))
  parts.push(geo51Txt(px(2), py(2) - 10, '2', 12.5, c51.amber, 'middle'))
  parts.push(geo51Txt(px(4), py(2) - 10, '2', 12.5, c51.amber, 'middle'))
  parts.push(geo51Txt(px(3) + 10, py(2.6), 'M (3, 2): midpoint, ON the mirror', 12, c51.red, 'start'))
  parts.push(geo51Txt(320, 374, 'cut in half (2 and 2), and the join meets the mirror at 90°', 12.5, c51.teal))
  return geo51Svg(640, 400, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the y = x mirror: the swap                         */
/* ------------------------------------------------------------------ */
const geo51Swap = (aria: string): string => {
  const parts: string[] = []
  const u = 34, ox = 180, oy = 214
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'THE MIRROR y = x: (x, y) → (y, x)', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-5, 6, -5, 6, u, ox, oy))
  parts.push(geo51Line(px(-5), py(-5), px(6), py(6), c51.green, 3, '8 5'))
  parts.push(geo51Txt(px(5.4), py(4.6), 'y = x', 12.5, c51.green, 'middle', '700'))
  parts.push(geo51Line(px(-3), py(4), px(4), py(-3), c51.amber, 2.2, '6 4'))
  parts.push(geo51RA(px(0.5), py(0.5), 0.707, -0.707, 0.707, 0.707, 11, c51.red))
  parts.push(geo51Dot(px(-3), py(4), c51.ink, 4.5))
  parts.push(geo51Dot(px(4), py(-3), c51.orange, 4.5))
  parts.push(geo51Dot(px(0.5), py(0.5), c51.red, 4))
  parts.push(geo51Txt(px(-3), py(4) - 14, 'A (−3, 4)', 12.5, c51.ink, 'middle'))
  parts.push(geo51Txt(px(4) + 6, py(-3) + 18, 'A′ (4, −3)', 12.5, c51.orange, 'start'))
  parts.push(geo51Txt(px(0.5) + 12, py(0.5) - 10, 'midpoint (0.5, 0.5) on the line', 12, c51.red, 'start'))
  parts.push(geo51Txt(500, 300, 'x goes in,', 12.5, c51.teal, 'middle'))
  parts.push(geo51Txt(500, 320, 'y comes out —', 12.5, c51.teal, 'middle'))
  parts.push(geo51Txt(500, 340, 'and the join meets', 12, c51.teal, 'middle'))
  parts.push(geo51Txt(500, 358, 'the mirror at 90°', 12, c51.teal, 'middle'))
  parts.push(geo51Txt(320, 404, 'A (−3, 4) lands on A′ (4, −3): the swap rule, witnessed', 12.5, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the three origin turns on one coordinate figure    */
/* ------------------------------------------------------------------ */
const geo51Turns = (aria: string): string => {
  const parts: string[] = []
  const u = 30, ox = 200, oy = 190
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  const ang = (p: [number, number]): number => Math.atan2(oy - p[1], p[0] - ox)
  parts.push(geo51Txt(320, 22, 'THE THREE TURNS ABOUT O: 90° CCW, 180°, 270° CCW', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-5, 6, -6, 6, u, ox, oy))
  const A: [number, number] = [px(4), py(1)], Ap: [number, number] = [px(-1), py(4)]
  const B: [number, number] = [px(2), py(5)], Bp: [number, number] = [px(-2), py(-5)]
  const Cp: [number, number] = [px(1), py(-4)]
  parts.push(geo51Arc(ox, oy, Math.hypot(A[0] - ox, A[1] - oy), ang(A), ang(Ap), c51.teal, 2.4))
  parts.push(geo51Arc(ox, oy, Math.hypot(B[0] - ox, B[1] - oy), ang(B), ang(Bp) - 2 * Math.PI, c51.orange, 2.4))
  parts.push(geo51Arc(ox, oy, Math.hypot(A[0] - ox, A[1] - oy), ang(A), ang(Cp) - 2 * Math.PI, c51.amber, 2.4))
  parts.push(geo51Dot(ox, oy, c51.red, 5))
  parts.push(geo51Dot(A[0], A[1], c51.ink, 4.5))
  parts.push(geo51Dot(Ap[0], Ap[1], c51.teal, 4.5))
  parts.push(geo51Dot(B[0], B[1], c51.ink, 4.5))
  parts.push(geo51Dot(Bp[0], Bp[1], c51.orange, 4.5))
  parts.push(geo51Dot(Cp[0], Cp[1], c51.amber, 4.5))
  parts.push(geo51Txt(A[0] + 10, A[1] - 6, '(4, 1)', 12, c51.ink, 'start'))
  parts.push(geo51Txt(Ap[0] - 10, Ap[1] - 8, '(−1, 4)', 12, c51.teal, 'end'))
  parts.push(geo51Txt(B[0] + 8, B[1] - 6, '(2, 5)', 12, c51.ink, 'start'))
  parts.push(geo51Txt(Bp[0] - 10, Bp[1] + 14, '(−2, −5)', 12, c51.orange, 'end'))
  parts.push(geo51Txt(Cp[0] + 10, Cp[1] + 12, '(1, −4)', 12, c51.amber, 'start'))
  parts.push(geo51Txt(ox + 14, oy + 16, 'O', 12, c51.red, 'start'))
  parts.push(geo51Txt(268, 86, '90° CCW', 11.5, c51.teal, 'start', '700'))
  parts.push(geo51Txt(96, 128, '270° CCW', 11.5, c51.amber, 'end', '700'))
  parts.push(geo51Txt(104, 250, '180°', 11.5, c51.orange, 'end', '700'))
  parts.push(geo51Txt(500, 110, '(x, y) → (−y, x)', 13, c51.teal, 'middle', '700'))
  parts.push(geo51Txt(500, 130, '90° anticlockwise', 11.5, c51.teal, 'middle'))
  parts.push(geo51Txt(500, 175, '(x, y) → (−x, −y)', 13, c51.orange, 'middle', '700'))
  parts.push(geo51Txt(500, 195, 'half turn', 11.5, c51.orange, 'middle'))
  parts.push(geo51Txt(500, 240, '(x, y) → (y, −x)', 13, c51.amber, 'middle', '700'))
  parts.push(geo51Txt(500, 260, '270° CCW = 90° CW', 11.5, c51.amber, 'middle'))
  parts.push(geo51Txt(320, 404, 'every image keeps its circle distance: |(4, 1)| = √17 ≈ 4.1231056', 12.5, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F5 — a turn about a foreign centre (2, 3)               */
/* ------------------------------------------------------------------ */
const geo51Foreign = (aria: string): string => {
  const parts: string[] = []
  const u = 34, ox = 90, oy = 310
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  const ang = (p: [number, number]): number => Math.atan2(oy - p[1], p[0] - ox)
  parts.push(geo51Txt(320, 22, 'A TURN ABOUT A FOREIGN CENTRE C (2, 3)', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-1, 8, -2, 8, u, ox, oy))
  const C: [number, number] = [px(2), py(3)], P: [number, number] = [px(5), py(3)], Pp: [number, number] = [px(2), py(6)]
  const R: [number, number] = [px(5), py(0)], Rp: [number, number] = [px(5), py(6)]
  parts.push(geo51Arc(C[0], C[1], Math.hypot(P[0] - C[0], P[1] - C[1]), 0, -Math.PI / 2, c51.teal, 2.2))
  parts.push(geo51Arc(C[0], C[1], Math.hypot(R[0] - C[0], R[1] - C[1]), Math.PI / 4, -Math.PI / 4, c51.orange, 2.2))
  parts.push(geo51Line(C[0], C[1], P[0], P[1], c51.teal, 1.8))
  parts.push(geo51Line(C[0], C[1], Pp[0], Pp[1], c51.teal, 1.8))
  parts.push(geo51Line(C[0], C[1], R[0], R[1], c51.orange, 1.8))
  parts.push(geo51Line(C[0], C[1], Rp[0], Rp[1], c51.orange, 1.8))
  parts.push(geo51Dot(C[0], C[1], c51.red, 5.5))
  parts.push(geo51Dot(P[0], P[1], c51.ink, 4.5))
  parts.push(geo51Dot(Pp[0], Pp[1], c51.teal, 4.5))
  parts.push(geo51Dot(R[0], R[1], c51.ink, 4.5))
  parts.push(geo51Dot(Rp[0], Rp[1], c51.orange, 4.5))
  parts.push(geo51RA(C[0], C[1], 1, 0, 0, -1, 12, c51.red))
  parts.push(geo51Txt(C[0] - 12, C[1] + 18, 'C (2, 3)', 12, c51.red, 'end', '700'))
  parts.push(geo51Txt(P[0] + 8, P[1] - 6, 'P (5, 3)', 12, c51.ink, 'start'))
  parts.push(geo51Txt(Pp[0] - 10, Pp[1] - 8, 'P′ (2, 6)', 12, c51.teal, 'end'))
  parts.push(geo51Txt(R[0] + 8, R[1] + 4, 'R (5, 0)', 12, c51.ink, 'start'))
  parts.push(geo51Txt(Rp[0] + 8, Rp[1] - 6, 'R′ (5, 6)', 12, c51.orange, 'start'))
  parts.push(geo51Txt((C[0] + P[0]) / 2, C[1] - 8, '|CP| = 3', 11.5, c51.teal, 'middle'))
  parts.push(geo51Txt((C[0] + R[0]) / 2 - 24, (C[1] + R[1]) / 2 + 16, '|CR| = √18 ≈ 4.2426407', 11.5, c51.orange, 'middle'))
  parts.push(geo51Txt(400, 120, 'THE THREE-STEP MACHINE', 12.5, c51.ink, 'start', '700'))
  parts.push(geo51Txt(400, 142, '1. translate by (−2, −3)', 12, c51.teal, 'start'))
  parts.push(geo51Txt(400, 162, '2. turn 90° CCW about O', 12, c51.teal, 'start'))
  parts.push(geo51Txt(400, 182, '3. translate back by (2, 3)', 12, c51.teal, 'start'))
  parts.push(geo51Txt(400, 208, 'witness: (5, 0) → (5, 6)', 12.5, c51.orange, 'start', '700'))
  parts.push(geo51Txt(320, 404, 'the radii |CP| = 3 and |CR| = √18 survive — the turn is rigid', 12.5, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F6 — midpoint invariance under the slide                */
/* ------------------------------------------------------------------ */
const geo51MidInv = (aria: string): string => {
  const parts: string[] = []
  const u = 40, ox = 150, oy = 310
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'MIDPOINTS TRAVEL WITH THE SLIDE: T_(3, −2)', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(0, 6, -2, 5, u, ox, oy))
  parts.push(geo51Line(px(1), py(1), px(1), py(4), c51.mid, 3.2))
  parts.push(geo51Line(px(4), py(-1), px(4), py(2), c51.orange, 3.2))
  parts.push(geo51Arrow(px(1), py(1), px(4), py(-1), c51.amber, 2))
  parts.push(geo51Arrow(px(1), py(4), px(4), py(2), c51.amber, 2))
  parts.push(geo51Arrow(px(1), py(2.5), px(4), py(0.5), c51.red, 2, '5 4'))
  parts.push(geo51Dot(px(1), py(1), c51.ink, 4.5))
  parts.push(geo51Dot(px(1), py(4), c51.ink, 4.5))
  parts.push(geo51Dot(px(4), py(-1), c51.orange, 4.5))
  parts.push(geo51Dot(px(4), py(2), c51.orange, 4.5))
  parts.push(geo51Dot(px(1), py(2.5), c51.red, 4.5))
  parts.push(geo51Dot(px(4), py(0.5), c51.red, 4.5))
  parts.push(geo51Txt(px(1) - 10, py(1) + 4, 'A (1, 1)', 12, c51.ink, 'end'))
  parts.push(geo51Txt(px(1) - 10, py(4) + 4, 'B (1, 4)', 12, c51.ink, 'end'))
  parts.push(geo51Txt(px(4) + 10, py(-1) + 4, 'A′ (4, −1)', 12, c51.orange, 'start'))
  parts.push(geo51Txt(px(4) + 10, py(2) + 4, 'B′ (4, 2)', 12, c51.orange, 'start'))
  parts.push(geo51Txt(px(1) - 10, py(2.5) - 6, 'M (1, 2.5)', 12, c51.red, 'end'))
  parts.push(geo51Txt(px(4) + 10, py(0.5) - 6, 'M′ (4, 0.5)', 12, c51.red, 'start'))
  parts.push(geo51Txt(470, 200, 'image of the midpoint =', 12.5, c51.ink, 'middle'))
  parts.push(geo51Txt(470, 220, 'midpoint of the images', 12.5, c51.ink, 'middle'))
  parts.push(geo51Txt(470, 246, '(1, 2.5) → (4, 0.5)', 12.5, c51.orange, 'middle', '700'))
  parts.push(geo51Txt(320, 404, 'the slide carries M (1, 2.5) exactly to M′ (4, 0.5)', 12.5, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F7 — signed-area orientation flip (three panels)        */
/* ------------------------------------------------------------------ */
const geo51Orient = (aria: string): string => {
  const parts: string[] = []
  const u = 22
  const panel = (oxp: number, pts: Array<[number, number]>, stroke: string, fill: string, label: string, area: string, ccw: boolean, lx: number, anch: string): void => {
    const px = (x: number): number => oxp + x * u
    const py = (y: number): number => 250 - y * u
    parts.push(geo51Line(px(-4), py(0), px(4.6), py(0), c51.mid, 1.8))
    parts.push(geo51Line(px(0), py(-1), px(0), py(4.6), c51.mid, 1.8))
    parts.push(geo51Poly(pts.map((p) => [px(p[0]), py(p[1])] as [number, number]), fill, 0.35, stroke, 2.6))
    parts.push(geo51Dot(px(0), py(0), c51.red, 3.5))
    // orientation arrow about the centroid (1.33, 1)
    const cx = px(4 / 3), cy = py(1)
    parts.push(geo51Arc(cx, cy, 30, ccw ? -2.4 : -0.7, ccw ? -0.7 : -2.4, stroke, 2))
    const midA = (ccw ? -1.55 : -1.55)
    const hx = cx + 30 * Math.cos(midA), hy = cy + 30 * Math.sin(midA)
    parts.push(geo51Head(hx, hy, ccw ? -90 : 90, stroke, 7))
    parts.push(geo51Txt(oxp + 45, 130, area, 14, stroke, 'middle', '700'))
    parts.push(geo51Txt(lx, 152, label, 11.5, c51.ink, anch))
  }
  parts.push(geo51Txt(320, 22, 'SIGNED AREA: +6 IN THE MIRROR BECOMES −6; IN THE TURN IT STAYS +6', 13, c51.ink, 'middle', '700'))
  panel(110, [[0, 0], [4, 0], [0, 3]], c51.mid, c51.panel, 'area +6, anticlockwise', '+6', true, 155, 'middle')
  panel(320, [[0, 0], [-4, 0], [0, 3]], c51.orange, c51.panel2, 'area −6, clockwise', '−6', false, 365, 'middle')
  panel(530, [[0, 0], [0, 4], [-3, 0]], c51.green, c51.sep, 'area +6, anticlockwise', '+6', true, 630, 'end')
  parts.push(geo51Arrow(196, 196, 250, 196, c51.amber, 2.2))
  parts.push(geo51Txt(223, 186, 'mirror', 11.5, c51.amber, 'middle', '700'))
  parts.push(geo51Txt(223, 212, 'y-axis', 11.5, c51.amber, 'middle'))
  parts.push(geo51Arrow(406, 196, 460, 196, c51.amber, 2.2))
  parts.push(geo51Txt(433, 186, 'turn', 11.5, c51.amber, 'middle', '700'))
  parts.push(geo51Txt(433, 212, '90° CCW', 11.5, c51.amber, 'middle'))
  parts.push(geo51Txt(320, 296, 'shoelace: +6, then −6 in the mirror, then +6 in the turn', 12.5, c51.teal))
  return geo51Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F8 — identify the motion: preimage and image pair       */
/* ------------------------------------------------------------------ */
const geo51Identify = (aria: string): string => {
  const parts: string[] = []
  const u = 36, ox = 320, oy = 210
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'NAME THAT MOTION: PREIMAGE AND IMAGE', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-5, 5, -4, 4, u, ox, oy))
  parts.push(geo51Poly([[px(0), py(0)], [px(4), py(0)], [px(4), py(3)]], c51.panel, 0.4, c51.mid, 3))
  parts.push(geo51Poly([[px(0), py(0)], [px(-4), py(0)], [px(-4), py(-3)]], c51.panel2, 0.45, c51.orange, 3, '7 5'))
  parts.push(geo51Dot(px(0), py(0), c51.red, 5))
  parts.push(geo51Txt(px(0) - 10, py(0) + 18, 'O', 12, c51.red, 'end'))
  parts.push(geo51Txt(px(2), py(0) + 30, 'preimage (0, 0), (4, 0), (4, 3)', 12, c51.mid, 'middle'))
  parts.push(geo51Txt(px(-2), py(-3) - 14, 'image (0, 0), (−4, 0), (−4, −3)', 12, c51.orange, 'middle'))
  parts.push(geo51Txt(320, 404, 'which single motion carries teal onto orange — and fixes O?', 12.5, c51.ink))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F9 — plot-vertex-by-vertex: the mirror y = x worked     */
/* ------------------------------------------------------------------ */
const geo51Craft = (aria: string): string => {
  const parts: string[] = []
  const u = 40, ox = 120, oy = 360
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Txt(320, 22, 'PLOT THE VERTICES ONE BY ONE: THE MIRROR y = x', 13, c51.ink, 'middle', '700'))
  parts.push(geo51Grid(-1, 6, -1, 6, u, ox, oy))
  parts.push(geo51Line(px(-1), py(-1), px(6), py(6), c51.green, 3, '8 5'))
  parts.push(geo51Poly([[px(0), py(0)], [px(4), py(0)], [px(4), py(3)]], c51.panel, 0.4, c51.mid, 2.8))
  parts.push(geo51Poly([[px(0), py(0)], [px(0), py(4)], [px(3), py(4)]], c51.panel2, 0.5, c51.orange, 2.8))
  parts.push(geo51Line(px(4), py(0), px(0), py(4), c51.amber, 1.8, '5 4'))
  parts.push(geo51Line(px(4), py(3), px(3), py(4), c51.amber, 1.8, '5 4'))
  parts.push(geo51Dot(px(2), py(2), c51.red, 4))
  parts.push(geo51Dot(px(3.5), py(3.5), c51.red, 4))
  parts.push(geo51Txt(px(4) + 8, py(0) + 16, '(4, 0)', 11.5, c51.ink, 'start'))
  parts.push(geo51Txt(px(4) + 8, py(3) - 4, '(4, 3)', 11.5, c51.ink, 'start'))
  parts.push(geo51Txt(px(0) - 8, py(4) - 6, '(0, 4)', 11.5, c51.orange, 'end'))
  parts.push(geo51Txt(px(3) + 12, py(4) - 8, '(3, 4)', 11.5, c51.orange, 'middle'))
  parts.push(geo51Txt(px(0) - 8, py(0) + 16, '(0, 0)', 11.5, c51.ink, 'end'))
  parts.push(geo51Txt(px(2) + 10, py(2) - 4, 'foot (2, 2)', 11, c51.red, 'start'))
  parts.push(geo51Txt(px(3.5) + 8, py(3.5) + 16, 'foot (3.5, 3.5)', 11, c51.red, 'start'))
  parts.push(geo51Txt(px(5.6), py(5.6) + 16, 'y = x', 12.5, c51.green, 'middle', '700'))
  parts.push(geo51Txt(480, 150, '(x, y) → (y, x)', 13, c51.orange, 'middle', '700'))
  parts.push(geo51Txt(390, 176, 'each join must meet', 11.5, c51.teal, 'start'))
  parts.push(geo51Txt(390, 194, 'the mirror at 90°', 11.5, c51.teal, 'start'))
  parts.push(geo51Txt(320, 420, 'vertex by vertex: the image is (0, 0), (0, 4), (3, 4)', 12, c51.teal))
  return geo51Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURES                                                    */
/* ------------------------------------------------------------------ */
const geo51SolMirror3 = (aria: string): string => {
  const parts: string[] = []
  const u = 40, ox = 60, oy = 250
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Grid(-1, 7, -1, 5, u, ox, oy))
  parts.push(geo51Line(px(3), py(5), px(3), py(-1), c51.green, 3))
  parts.push(geo51Line(px(1), py(2), px(5), py(2), c51.amber, 2.2, '6 4'))
  parts.push(geo51RA(px(3), py(2), 1, 0, 0, -1, 11, c51.red))
  parts.push(geo51Dot(px(1), py(2), c51.ink, 4.5))
  parts.push(geo51Dot(px(5), py(2), c51.orange, 4.5))
  parts.push(geo51Dot(px(3), py(2), c51.red, 4.5))
  parts.push(geo51Txt(px(1) - 6, py(2) - 12, 'P (1, 2)', 12, c51.ink, 'end'))
  parts.push(geo51Txt(px(5) + 6, py(2) - 12, 'P′ (5, 2)', 12, c51.orange, 'start'))
  parts.push(geo51Txt(px(3), py(2) + 20, 'M (3, 2)', 12, c51.red, 'middle'))
  parts.push(geo51Txt(px(2), py(2) - 10, '2', 12, c51.amber, 'middle'))
  parts.push(geo51Txt(px(4), py(2) - 10, '2', 12, c51.amber, 'middle'))
  return geo51Svg(460, 320, aria, parts)
}

const geo51SolForeign = (aria: string): string => {
  const parts: string[] = []
  const u = 28, ox = 110, oy = 330
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  const ang = (p: [number, number]): number => Math.atan2(oy - p[1], p[0] - ox)
  parts.push(geo51Grid(0, 7, -4, 7, u, ox, oy))
  const R: [number, number] = [px(5), py(0)], T1: [number, number] = [px(3), py(-3)], T2: [number, number] = [px(3), py(3)], Rp: [number, number] = [px(5), py(6)]
  parts.push(geo51Arc(ox, oy, Math.hypot(T1[0] - ox, T1[1] - oy), ang(T1), ang(T2), c51.teal, 2.4))
  parts.push(geo51Arrow(R[0], R[1], T1[0], T1[1], c51.amber, 2))
  parts.push(geo51Arrow(T2[0], T2[1], Rp[0], Rp[1], c51.amber, 2))
  parts.push(geo51Dot(R[0], R[1], c51.ink, 4.5))
  parts.push(geo51Dot(T1[0], T1[1], c51.amber, 4))
  parts.push(geo51Dot(T2[0], T2[1], c51.amber, 4))
  parts.push(geo51Dot(Rp[0], Rp[1], c51.orange, 4.5))
  parts.push(geo51Dot(px(2), py(3), c51.red, 5))
  parts.push(geo51Txt(R[0] + 8, R[1] + 4, '(5, 0)', 11.5, c51.ink, 'start'))
  parts.push(geo51Txt(T1[0] - 8, T1[1] + 14, '(3, −3)', 11.5, c51.amber, 'end'))
  parts.push(geo51Txt(T2[0] - 8, T2[1] - 8, '(3, 3)', 11.5, c51.amber, 'end'))
  parts.push(geo51Txt(Rp[0] + 8, Rp[1] - 6, '(5, 6)', 11.5, c51.orange, 'start'))
  parts.push(geo51Txt(px(2) - 10, py(3) + 16, 'C (2, 3)', 11.5, c51.red, 'end', '700'))
  parts.push(geo51Txt(340, 330, 'step 1: (5, 0) → (3, −3)', 11.5, c51.amber, 'start'))
  parts.push(geo51Txt(340, 350, 'step 2: R90 → (3, 3)', 11.5, c51.teal, 'start'))
  parts.push(geo51Txt(340, 370, 'step 3: back to (5, 6)', 11.5, c51.amber, 'start'))
  parts.push(geo51Txt(265, 440, 'three steps, one turn: |CR| = √18 ≈ 4.2426407 kept', 12, c51.teal))
  return geo51Svg(520, 470, aria, parts)
}

const geo51SolIdentify = (aria: string): string => {
  const parts: string[] = []
  const u = 32, ox = 280, oy = 190
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  const ang = (p: [number, number]): number => Math.atan2(oy - p[1], p[0] - ox)
  parts.push(geo51Grid(-5, 5, -4, 4, u, ox, oy))
  parts.push(geo51Poly([[px(0), py(0)], [px(4), py(0)], [px(4), py(3)]], c51.panel, 0.4, c51.mid, 2.8))
  parts.push(geo51Poly([[px(0), py(0)], [px(-4), py(0)], [px(-4), py(-3)]], c51.panel2, 0.5, c51.orange, 2.8, '7 5'))
  parts.push(geo51Arc(ox, oy, 4 * u, ang([px(4), py(0)]), ang([px(-4), py(0)]), c51.amber, 2.2))
  parts.push(geo51Txt(ox, py(4) + 14, '180°', 12, c51.amber, 'middle', '700'))
  parts.push(geo51Dot(px(0), py(0), c51.red, 5))
  parts.push(geo51Txt(px(0) - 8, py(0) + 16, 'O fixed', 11.5, c51.red, 'end'))
  parts.push(geo51Txt(px(2), py(0) + 28, 'preimage', 12, c51.mid, 'middle'))
  parts.push(geo51Txt(px(-2), py(-3) - 12, 'image', 12, c51.orange, 'middle'))
  parts.push(geo51Txt(280, 430, 'the motion: R180 about the origin, (x, y) → (−x, −y)', 13, c51.green, 'middle', '700'))
  return geo51Svg(560, 450, aria, parts)
}

const geo51SolLine = (aria: string): string => {
  const parts: string[] = []
  const u = 30, ox = 60, oy = 150
  const px = (x: number): number => ox + x * u
  const py = (y: number): number => oy - y * u
  parts.push(geo51Line(px(-1), py(0), px(11), py(0), c51.mid, 3))
  parts.push(geo51Line(px(-1), py(-2), px(11), py(-2), c51.orange, 3))
  parts.push(geo51Arrow(px(0), py(0), px(3), py(-2), c51.amber, 2.2))
  parts.push(geo51Arrow(px(7), py(0), px(10), py(-2), c51.amber, 2.2))
  parts.push(geo51Dot(px(0), py(0), c51.ink, 4.5))
  parts.push(geo51Dot(px(7), py(0), c51.ink, 4.5))
  parts.push(geo51Dot(px(3), py(-2), c51.orange, 4.5))
  parts.push(geo51Dot(px(10), py(-2), c51.orange, 4.5))
  parts.push(geo51Txt(px(0), py(0) - 12, '(0, 0)', 11.5, c51.ink, 'middle'))
  parts.push(geo51Txt(px(7), py(0) - 12, '(7, 0)', 11.5, c51.ink, 'middle'))
  parts.push(geo51Txt(px(3), py(-2) + 20, '(3, −2)', 11.5, c51.orange, 'middle'))
  parts.push(geo51Txt(px(10), py(-2) + 20, '(10, −2)', 11.5, c51.orange, 'middle'))
  parts.push(geo51Txt(px(11) + 8, py(0), 'y = 0', 11.5, c51.mid, 'start'))
  parts.push(geo51Txt(px(11) + 8, py(-2), 'y = −2', 11.5, c51.orange, 'start'))
  parts.push(geo51Txt(280, 290, 'every point slides by (3, −2): the line lands on a parallel line', 12, c51.teal))
  return geo51Svg(560, 310, aria, parts)
}

/* ------------------------------------------------------------------ */
/* lesson object                                                       */
/* ------------------------------------------------------------------ */
export const lessonGeo501: Lesson = {
  id: 'geo-rigid-motions-slides-flips-and-turns',
  number: '5.1',
  title: 'The Rigid Motions: Slides, Flips and Turns',
  concepts: ['transformation', 'image and preimage', 'rigid motion', 'translation', 'reflection', 'rotation', 'invariants', 'orientation'],
  objectives: [
    'Read a transformation of the plane as a FUNCTION: every point in, exactly one point out, and the output called the image of the input',
    'Run the three slide/flip/turn machines by their coordinate rules — T_(a,b), the four mirrors, and the 90/180/270 turns about the origin and about any centre',
    'Verify rigidity numerically: distances, angles, midpoints, parallelism and lines survive every motion, and only the mirror flips the signed-area orientation (+6 to −6)',
    'Draw the image of a figure vertex by vertex on graph paper, and identify the motion that carries a given preimage onto a given image',
    'Re-state congruence as “carried by a rigid motion” and recognise a symmetry as a motion that leaves a figure fixed (the doorstep to Lesson 5.3)',
  ],
  prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size', 'fm-angles-and-their-measurement', 'al-the-coordinate-plane-and-linear-graphs'],
  sources: ['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. the machine idea                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'A machine that eats points: the transformation idea' },
    {
      kind: 'para',
      text: 'Slide a chess piece across the board. Flip a pancake. Turn a key in a lock. Each of these is, in ordinary life, a MOTION — something moves, and the thing that arrives is unmistakably the thing that departed, merely elsewhere or otherwise oriented. Geometry\u2019s masterstroke in this chapter is to stop thinking about the moving object and start thinking about the SPACE itself: what happened to every point of the plane? The chess piece is an distraction — the honest object of study is the rule that assigns to each point of the plane the point it becomes. That rule is called a transformation, and once you see it, you see transformations everywhere: the shadow of a moving hand, the reflection in a still lake, the sweep of a windscreen wiper, the rotation of a wheel.',
    },
    {
      kind: 'para',
      text: 'The formal idea is exactly the idea of a function, which you have met since the earliest algebra days — only now the inputs and outputs are POINTS instead of numbers. A transformation of the plane is a rule that takes every point in and hands back exactly one point out. We write $P \\mapsto P\\u2032$, and we call $P$ the preimage and $P\\u2032$ the image. This is the exact framing of the school geometry standard G-CO.2, and the framing is not decoration: reading transformations as functions is what makes the whole subject computable. A function can be written as a formula, tested at points, composed with another function, undone by an inverse. Every machine in this lesson — every slide, flip and turn — will be handed to you as a coordinate formula, because a coordinate formula is a transformation you can compute with rather than merely imagine.',
    },
    {
      kind: 'para',
      text: 'Three machines dominate this lesson, and everyday language already has their names. The SLIDE moves every point the same amount in the same direction — the formal name is translation. The FLIP reflects the plane across a line, as in a mirror — the formal name is reflection. The TURN swings points around a fixed centre — the formal name is rotation. Everyday name first, formal name second: both belong to your working vocabulary, because exam questions use the formal words while your intuition runs on the everyday ones. What makes all three worth a chapter\u2019s attention is a shared property they will each have to earn: each moves points WITHOUT distorting the plane. Distances out equal distances in; angles out equal angles in. Such a machine is called a rigid motion (or an isometry — same idea, different tradition), and the discovery that slides, flips and turns are the ONLY rigid motions of the plane is the destination this chapter drives toward, reached in Lesson 5.2.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Transformation, image, rigid motion',
      text: 'A transformation of the plane is a function that assigns to every point $P$ exactly one image point $P\\u2032$ (and $P$ is the preimage of $P\\u2032$). A rigid motion (isometry) is a transformation that preserves every distance: $|PQ|\\u2032 = |PQ|$ for every pair of points. Any transformation that preserves all distances automatically preserves angles, midpoints, parallelism and straightness — the invariance census of Section 5 — so distance preservation is the single load-bearing demand. Translation, reflection and rotation are the three rigid motions this lesson builds; each comes with a coordinate rule you can run by hand.',
    },
    {
      kind: 'para',
      text: 'Why insist on the function picture before any formulas? Because the function picture is what protects you from the classic confusions of this topic. Students ask “which point moves?” as if one point were special — but a transformation moves (or fixes) EVERY point at once, the whole plane in one motion. Students describe a reflection as “the triangle flips over” — but the transformation is defined on the entire plane, including the millions of points not in the triangle; the triangle is just the part we chose to watch. And students wonder whether a motion is “legal” if it fixes a point — the origin sits still under a turn about the origin — but a function may perfectly well send some inputs to themselves; fixing a point is ordinary behaviour, not a malfunction. Keep the function picture in view: points in, points out, one output per input, the whole plane served at once.',
    },
    {
      kind: 'para',
      text: 'Here is the route. Section 2 builds the slide and proves, by a vector argument you can check in three lines, that it cannot lose a distance or bend an angle. Section 3 builds the mirrors — the y-axis, the x-axis, the line $y = x$, and the general vertical mirror $x = c$ — and proves the mirror law: the mirror is the perpendicular bisector of every join from a point to its image. Section 4 builds the turns, first about the origin (where the coordinate rules are clean) and then about any centre (by a translate-turn-translate machine). Section 5 takes the census: what survives every machine, and the one thing — orientation — that does not. Section 6 turns the machines into graph-paper craft. Section 7 cashes the chapter\u2019s promise: congruence re-defined as “carried by a rigid motion”, and symmetry as a motion that leaves its figure untouched. Every number in the pinned set — from the image (8, −1) of (5, 1) under the slide $T_{(3,-2)}$ to the signed areas $+6$ flipping to $−6$ — was recomputed by this lesson\u2019s verification engine before the prose you are reading was allowed to stand.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the slide machine                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The slide machine: the translation T_(a, b)' },
    {
      kind: 'para',
      text: 'The simplest rigid motion is the slide: pick two numbers, call them $a$ and $b$, and move every point of the plane $a$ units east (or west, if $a$ is negative) and $b$ units north (or south, if $b$ is negative). The rule, written as a coordinate formula, is the machine $T_{(a,b)}$ of this lesson: $T_{(a,b)}(x, y) = (x + a,\\ y + b)$. The subscript names the slide vector $(a, b)$ — the same arrow for every point, which is the whole character of this machine. Run the witness slide $T_{(3,-2)}$: every point moves 3 east and 2 south. The point $(5, 1)$ lands on $(5 + 3,\\ 1 + (-2)) = (8, -1)$. The origin $(0, 0)$ lands on $(3, -2)$ — the slide vector itself, made visible. Every point obeys the same arithmetic; that uniformity is what the word translation means.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the slide machine T_(3, −2). The segment P(5, 1)–Q(0, 0) and its image P′(8, −1)–Q′(3, −2): both motion arrows carry the same vector (3, −2), and the segment keeps its length |PQ| = √26 ≈ 5.0990199 exactly. A slide moves every point by one shared vector.',
      svg: geo51Slide('Coordinate grid showing the translation T_(3, minus 2): the segment from P at (5, 1) to Q at (0, 0) slides by the vector (3, minus 2) to the image segment from P prime at (8, minus 1) to Q prime at (3, minus 2), with the length square root of 26 marked as preserved.'),
    },
    {
      kind: 'para',
      text: 'Is the slide rigid? Watch the witness segment in Figure F1. Its length is $|PQ| = \\sqrt{(5-0)^2 + (1-0)^2} = \\sqrt{25 + 1} = \\sqrt{26} \\approx 5.0990199$. The image segment runs from $(8, -1)$ to $(3, -2)$, so its length is $\\sqrt{(8-3)^2 + ((-1)-(-2))^2} = \\sqrt{25 + 1} = \\sqrt{26}$ again — the same surd, the same 5.0990199, not approximately equal but exactly equal, because the arithmetic inside the square roots is literally identical. That is the slide\u2019s whole secret, and the derivation below turns the observation into a proof that works for every segment, not just this one.',
    },
    {
      kind: 'derivation',
      title: 'Why the slide preserves every distance (and every angle)',
      statement: 'Claim: for any two points $P$, $Q$ and any slide vector $(a, b)$, the distance between the images equals the distance between the originals. The engine pinned the witness $\\sqrt{26}$; the argument below is why it had to be so.',
      steps: [
        {
          label: 'Write the images',
          formula: 'P\\u2032 = (x_P + a,\\ y_P + b),\\quad Q\\u2032 = (x_Q + a,\\ y_Q + b)',
          explanation: 'Both points ride the same vector $(a, b)$ — one slide, one rule, no exceptions.',
        },
        {
          label: 'Subtract the images',
          formula: 'P\\u2032 - Q\\u2032 = (x_P - x_Q,\\ y_P - y_Q) = P - Q',
          explanation: 'The vector FROM Q TO P survives the slide untouched, because adding $(a, b)$ and then subtracting $(a, b)$ cancels — every difference is unchanged. This one line is the whole proof.',
        },
        {
          label: 'Take the lengths',
          explanation: 'A distance is the length of a difference vector, and the difference vector did not change, so $|P\\u2032Q\\u2032| = |PQ|$ for every pair — exactly, with no rounding anywhere.',
        },
        {
          label: 'Angles follow',
          explanation: 'A triangle is three distances; its image triangle has the same three side lengths, so the two triangles are congruent by SSS (Chapter 3), and congruent triangles have equal angles. The slide bends nothing: every angle of every figure arrives intact.',
        },
      ],
      result: 'The slide $T_{(a,b)}$ preserves every distance and every angle: it is a rigid motion, proved from the one-line cancellation $(x+a) - (y+a) = x - y$.',
    },
    {
      kind: 'para',
      text: 'The slide\u2019s respect for straightness deserves its own sentence, because it explains something you can see in Figure F1 and in the exercises: lines go to lines. Take the line $y = 0$ — the x-axis — and slide it by $T_{(3,-2)}$. Two of its points, $(0, 0)$ and $(7, 0)$, land on $(3, -2)$ and $(10, -2)$; both images sit at height $-2$, and every other point of the line lands at height $-2$ too, so the whole line arrives as the line $y = -2$, parallel to where it started. A slide cannot tilt a line (every point drops by the same amount) and cannot shrink one (distances are kept). Parallel lines stay parallel under any slide — the image of a parallel pair is a parallel pair, since both lines tilt by the same nothing. When Section 6 asks you to draw the image of a whole figure, this is the labour-saving fact: the image of a line is a line, so you may plot two points and join them.',
    },
    {
      kind: 'para',
      text: 'One habit to build immediately, because every exercise in this lesson rewards it: run the rule on the POINTS, then read the FIGURE off the images. Do not try to slide a triangle “as a whole” in your imagination — slide its three vertices, $(x, y) \\mapsto (x + a, y + b)$, one at a time, then connect the image points in the same order. The Illustration in Section 6 works a full example; every exercise that says “find the image” means exactly this: points first, figure second. The machine is defined on the whole plane, but your hands only ever touch points.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the flip machines                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The flip machines: reflections in a mirror' },
    {
      kind: 'para',
      text: 'Hold a letter up to a mirror: what you see is the same size, the same shape — and reversed. A reflection is the geometry of that reversal, with one refinement: the mirror in geometry is a LINE in the plane, not a sheet standing outside it, and the image of a point is determined by that line alone. The rule that defines the machine, stated once and used forever: the image $P\\u2032$ of $P$ in a mirror line sits on the other side of the mirror, at the same perpendicular distance, with the join $P P\\u2032$ cutting the mirror at right angles at its midpoint. Everything concrete in this section — every coordinate rule, every pinned witness — is that one sentence run in coordinates.',
    },
    {
      kind: 'para',
      text: 'The two axis mirrors are the friendliest machines in the family. The y-axis is the vertical mirror: reflecting $(x, y)$ in it flips the x-coordinate and leaves the y-coordinate alone, so the rule is $(x, y) \\mapsto (-x, y)$. Witness: $(-3, 4)$, which sits 3 units west of the y-axis, lands on $(3, 4)$, exactly 3 units east — same height, opposite side. The x-axis is the horizontal mirror with rule $(x, y) \\mapsto (x, -y)$: the same witness $(-3, 4)$, which sits 4 units north of the x-axis, lands on $(-3, -4)$, 4 units south, same longitude. Read the pattern rather than memorising it: the mirror FLIPS THE COORDINATE MEASURED ACROSS IT and keeps the one measured ALONG it. The y-axis separates east from west, so it flips x; the x-axis separates north from south, so it flips y.',
    },
    {
      kind: 'para',
      text: 'The third standard mirror, the diagonal line $y = x$, produces the most beautiful rule of the three: $(x, y) \\mapsto (y, x)$ — the coordinates simply swap. Witness: $(-3, 4)$ lands on $(4, -3)$. The swap makes sense the moment you think about what the line $y = x$ does to the plane: it is the set of points whose coordinates agree, the diagonal where east-west and north-south are equal, so it separates the plane into the half “above the line” ($y$ bigger) and the half “below” ($x$ bigger), and reflection exchanges those halves — the coordinate that was too big becomes the one too small. Figure F3 shows the witness: the join from $(-3, 4)$ to $(4, -3)$ has midpoint $(0.5, 0.5)$, which sits exactly on the line $y = x$ as the law demands, and the join\u2019s direction $(7, -7)$ is perpendicular to the line\u2019s direction $(1, 1)$ because $7 \\cdot 1 + (-7) \\cdot 1 = 0$. The swap rule is the perpendicular-bisector definition, computed.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the y = x mirror swap. A(−3, 4) lands on A′(4, −3): the coordinates trade places. The dashed join meets the mirror line at right angles at the midpoint (0.5, 0.5), which lies on y = x — the mirror law in action on the diagonal machine.',
      svg: geo51Swap('Coordinate grid showing the reflection in the line y equals x: the point A at (minus 3, 4) swaps to A prime at (4, minus 3), the join is perpendicular to the mirror and bisected at the midpoint (0.5, 0.5) which lies on the line.'),
    },
    {
      kind: 'para',
      text: 'What about a mirror that is vertical but not the y-axis — the line $x = c$ for any constant $c$? The same thinking that ran the y-axis machine now runs it one step over. The mirror $x = 3$ separates points with $x < 3$ from points with $x > 3$, and the perpendicular distance across it is measured purely by the x-coordinate, so the rule is $(x, y) \\mapsto (2c - x, y)$: the image\u2019s x-coordinate must sit as far EAST of the mirror as the original sat west, and $2c - x$ is exactly that balanced value. Witness, pinned and engine-checked: $(1, 2)$ reflected in $x = 3$ lands on $(2 \\cdot 3 - 1,\\ 2) = (5, 2)$. The point sat 2 west of the mirror; the image sits 2 east; the midpoint of the join is $(3, 2)$ — on the mirror, as the law demands — and the distances $2$ and $2$ match. Figure F2 draws the whole construction: point, image, dashed join, right-angle mark, midpoint.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the mirror machine x = 3. P(1, 2) flips to P′(5, 2): the join is perpendicular to the mirror and bisected by it at M(3, 2), with the two halves of the join measuring 2 and 2. The mirror is the perpendicular bisector of every join it creates (G-CO.9).',
      svg: geo51Mirror('Coordinate grid showing the reflection in the vertical mirror x = 3: point P at (1, 2) flips to P prime at (5, 2), the dashed join meets the mirror at the midpoint M (3, 2) at a right angle, and the halves of the join both measure 2.'),
    },
    {
      kind: 'derivation',
      title: 'The mirror law: every join is bisected perpendicularly by the mirror (G-CO.9)',
      statement: 'Claim: if $P\\u2032$ is the reflection of $P$ in a mirror line $m$, then $m$ is the perpendicular bisector of the segment $P P\\u2032$. Equivalently: the mirror passes through the midpoint of the join and meets the join at $90^\\circ$, and every point of the mirror is equidistant from $P$ and $P\\u2032$.',
      steps: [
        {
          label: 'Drop the perpendicular',
          explanation: 'Let $F$ be the foot of the perpendicular from $P$ to the mirror — the point where the shortest route from $P$ hits the line. The definition of the reflection pins the image: $P\\u2032$ lies on the SAME perpendicular line, on the FAR side of the mirror, at the SAME distance from $F$.',
        },
        {
          label: 'Read the join',
          explanation: 'The join $P P\\u2032$ is therefore exactly the perpendicular segment continued through the mirror: it meets $m$ at $F$, at a right angle, with $PF = F P\\u2032$. A line that cuts a segment in half at right angles is, by definition, its perpendicular bisector — the claim, proved in two moves.',
        },
        {
          label: 'Equidistance is free',
          explanation: 'Any point $X$ of the mirror now satisfies $XP = XP\\u2032$ by SAS on the two right triangles $XFP$ and $XFP\\u2032$ (shared leg $XF$, equal legs $FP = FP\\u2032$, right angles at $F$). The mirror is the full set of points equidistant from $P$ and $P\\u2032$ — which is why the engine could check “2 and 2” at the midpoint and call it a law rather than a coincidence.',
        },
        {
          label: 'Why the witness had to work',
          explanation: 'For the mirror $x = 3$ and the point $(1, 2)$: the foot is $(3, 2)$, the image must continue the horizontal join one mirrored step to $(5, 2)$, and the midpoint check $(3, 2)$ with distances $2$ and $2$ is the law made arithmetic.',
        },
      ],
      result: 'Every mirror is the perpendicular bisector of the join it creates — the fact that makes reflections drawable, checkable, and invertible (reflect twice and you are home: $P$ itself).',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Three reflection mistakes, named for the fix',
      text: 'FIRST, flipping the wrong coordinate: the y-axis mirror flips $x$ (it separates east from west), not $y$ — the witness $(-3, 4) \\to (3, 4)$, never $(-3, -4)$, which is the x-axis machine\u2019s output. SECOND, forgetting which side: the image is on the OPPOSITE side of the mirror at the SAME distance — reflecting $(1, 2)$ in $x = 3$ gives $(5, 2)$, not $(1, 2)$ or $(7, 2)$ (two west of the mirror is not the same as two east). THIRD, drifting off the perpendicular: the join from $P$ to $P\\u2032$ must MEET the mirror — if your computed image gives a join that misses the mirror line or meets it at a slant, the machine was misread, because the mirror law (just proved) forbids both. Quick audit for any mirror at $x = c$: the y-coordinates of $P$ and $P\\u2032$ must be EQUAL, and $c$ must equal the average $(x_P + x_{P\\u2032})/2$.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the turn machines                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The turn machines: rotations about a centre' },
    {
      kind: 'para',
      text: 'A rotation is a turn of the whole plane about a fixed point, called the centre, through a stated angle in a stated direction. The centre does not move; every other point swings around it on the circle it already sat on. Anticlockwise is the positive direction by universal convention, and every rotation in this book means anticlockwise unless the opposite is said. About the origin the three machines you must own cold are the quarter turn, the half turn and the three-quarter turn: $R_{90}$ sends $(x, y)$ to $(-y, x)$; $R_{180}$ sends $(x, y)$ to $(-x, -y)$; $R_{270}$ sends $(x, y)$ to $(y, -x)$ — which is the same machine as a quarter turn clockwise, since three-quarters anticlockwise finishes where one-quarter clockwise does.',
    },
    {
      kind: 'para',
      text: 'Why those formulas and not others? The cleanest derivation runs the turn on the two unit points and builds up. A quarter turn anticlockwise swings the east point $(1, 0)$ up to the north point $(0, 1)$, and swings the north point $(0, 1)$ over to the west point $(-1, 0)$. So the rule must send the x-coordinate (which lives along the east direction) to the y-direction, and the y-coordinate to the NEGATIVE x-direction: $(x, y) \\mapsto (-y, x)$. Check the witness, pinned and engine-verified: $(4, 1)$ has $x = 4$, $y = 1$, so the image is $(-1, 4)$ — one unit west, four north, on the picture exactly where the quarter turn lands it. The half turn must send every point straight through the centre to the point diametrically opposite: $(x, y) \\mapsto (-x, -y)$; witness $(2, 5) \\mapsto (-2, -5)$. And three-quarters anticlockwise is the quarter turn run the other way: $(x, y) \\mapsto (y, -x)$; witness $(4, 1) \\mapsto (1, -4)$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the three origin rotations on one grid. The point (4, 1) turns to (−1, 4) at 90° CCW and to (1, −4) at 270° CCW; the point (2, 5) turns to (−2, −5) at 180°. Every image sits on the same circle about O as its preimage: |(4, 1)| = √17 ≈ 4.1231056 survives all three turns.',
      svg: geo51Turns('Coordinate grid showing the three rotations about the origin: the point (4, 1) turns anticlockwise to (minus 1, 4) at 90 degrees and to (1, minus 4) at 270 degrees; the point (2, 5) turns to (minus 2, minus 5) at 180 degrees; arcs mark each turn and every image keeps its distance from O.'),
    },
    {
      kind: 'para',
      text: 'Rigidity first, then the craft. A turn about a centre $C$ keeps every point at its original distance FROM $C$ — that is what swinging on a circle means — and the quarter-turn arithmetic above shows the distances really do survive: $|(4, 1)| = \\sqrt{4^2 + 1^2} = \\sqrt{17} \\approx 4.1231056$, and $|(-1, 4)| = \\sqrt{(-1)^2 + 4^2} = \\sqrt{17}$ again. For any TWO points $P$, $Q$ and any turn about the origin, the difference vector $P - Q$ turns by the same angle as the points do, and a turned vector has the same length as its original (rotating a vector spins it without stretching — its components just swap and change sign, as the rules show). So $|P\\u2032Q\\u2032| = |PQ|$ for every pair, angles ride along by the SSS argument from the slide derivation, and the turn is a rigid motion. Figure F4 is worth a slow look for the circle fact alone: preimage and image never leave their shared circle.',
    },
    {
      kind: 'para',
      text: 'What if the centre is not the origin? Geometry refuses to hand you a new formula for every centre; instead it hands you a MACHINE ASSEMBLY: translate, turn, translate back. To rotate about $C = (2, 3)$, first slide the whole plane by $T_{(-2,-3)}$ so that $C$ lands on the origin (you temporarily live in a world where the centre is at $O$); then run the origin machine, say $R_{90}$; then slide back by $T_{(2,3)}$. Run the witness $(5, 3)$: subtract the centre to get $(3, 0)$; turn: $(-0, 3) = (0, 3)$; add the centre back: $(2, 6)$. So $(5, 3) \\mapsto (2, 6)$ about $(2, 3)$ — and the distance from the centre is kept: $|CP| = 3$ before, $|CP\\u2032| = \\sqrt{(2-2)^2 + (6-3)^2} = 3$ after. Run the second witness $(5, 0)$: subtract to get $(3, -3)$; turn to $(3, 3)$; add back to $(5, 6)$. So $(5, 0) \\mapsto (5, 6)$, with $|CR| = \\sqrt{3^2 + (-3)^2} = \\sqrt{18} \\approx 4.2426407$ before and $|CR\\u2032| = \\sqrt{(5-2)^2 + (6-3)^2} = \\sqrt{18}$ after — the radius to the centre never changed, as the circle fact promised. Same centre, same radii, new images.',
    },
    {
      kind: 'figure',
      caption: 'Figure F5 — a turn about the foreign centre C(2, 3). The 90° CCW quarter turn carries P(5, 3) to P′(2, 6) and R(5, 0) to R′(5, 6); the radii |CP| = 3 and |CR| = √18 ≈ 4.2426407 are unchanged. The three-step machine: subtract the centre, turn about O, add the centre back.',
      svg: geo51Foreign('Coordinate grid showing a 90 degree anticlockwise rotation about the foreign centre C at (2, 3): P at (5, 3) turns to P prime at (2, 6) and R at (5, 0) turns to R prime at (5, 6), with the radii 3 and square root of 18 drawn from C and the three-step machine listed.'),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The centre is the motion\u2019s fingerprint',
      text: 'Each turn fixes exactly one point — its centre (unless the angle is a full $360^\\circ$, which fixes everything, or the empty $0^\\circ$). This makes the centre a fingerprint: given a preimage and an image, the centre of the turn that carried one to the other can be recovered from the geometry, because it is the point that never moved. The slide fixes NO point (unless it is the zero slide, which fixes everything); the mirror fixes every point of its mirror line; the turn fixes exactly one. Counting fixed points is a legitimate way to identify a motion — the engine used exactly this read on the Illustration pair of Section 6: the origin was fixed, so the motion could not have been a nonzero slide, and the signed area was kept, so it could not have been a mirror; the half turn remained.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the invariance census                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What never changes: the invariance census' },
    {
      kind: 'para',
      text: 'A census counts what survives. We have watched distances and angles survive each machine as we built it; now we line all three families up and audit the full list, because the census is what makes the machines USEFUL — you may assume every “kept” row without recomputation, and you may exploit the one “flipped” row to tell the families apart. The census rows: distances, angles, midpoints, parallelism, straightness (lines to lines), and orientation — the one property that separates the mirror family from the other two, and the only row where the verdicts disagree.',
    },
    {
      kind: 'para',
      text: 'Midpoints first, with its pinned witness. Under the slide $T_{(3,-2)}$, the segment from $(1, 1)$ to $(1, 4)$ — a vertical stick of length 3 — has images $(4, -1)$ and $(4, 2)$: a vertical stick of length 3 again, 3 columns east and 2 rows south. The midpoint of the original is $(1, 2.5)$; the midpoint of the images is $((4+4)/2,\\ (-1+2)/2) = (4, 0.5)$; and the image of the midpoint is $(1 + 3,\\ 2.5 + (-2)) = (4, 0.5)$ — the same point. The image of the midpoint IS the midpoint of the images (Figure F6 draws it). The reason is the difference-cancellation from the slide derivation: midpoints are averages, averages are built from differences, and slides preserve all differences. The same check passes for the mirror and the turn — run it on any witness you like, and the engine did — so midpoint-preservation is census-wide: every rigid motion carries the middle of a segment to the middle of the image segment.',
    },
    {
      kind: 'figure',
      caption: 'Figure F6 — midpoint invariance under the slide T_(3, −2). The segment (1, 1)–(1, 4) lands on (4, −1)–(4, 2); the midpoint M(1, 2.5) lands exactly on the midpoint M′(4, 0.5) of the images. The middle of a segment cannot escape the middle of its image.',
      svg: geo51MidInv('Coordinate grid showing the segment from (1, 1) to (1, 4) translated by the vector (3, minus 2) to the segment from (4, minus 1) to (4, 2), with midpoint (1, 2.5) sliding exactly onto the midpoint of the images at (4, 0.5).'),
    },
    {
      kind: 'para',
      text: 'Lines and parallels: the slide kept the x-axis as the line $y = -2$ (Section 2\u2019s witness: $(0, 0), (7, 0) \\to (3, -2), (10, -2)$), and the other machines keep straightness too — a mirror reflects a line to a line (reflect two of its points and join; the reflections of ALL the points land on that join, because mirrors preserve collinearity through the distance argument), and a turn swings a line to a line through the same circle arithmetic. Parallel lines therefore map to parallel lines under all three families: two lines that never meet map to two lines that never meet, since if the images met, running the inverse machine on the meeting point would give a meeting point of the originals — contradiction. Distances, angles, midpoints, parallels, lines: kept by every machine in the lesson. The census table at the end of this section records the verdicts; the table in Section 6 collects the rules.',
    },
    {
      kind: 'para',
      text: 'Now the one row where the families disagree, and the most instructive computation in the lesson. Signed area measures the area of a polygon together with its HANDEDNESS: compute the shoelace sum $\\tfrac{1}{2}(x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2))$, and the sign records whether the vertices run anticlockwise (positive) or clockwise (negative) as written. The witness triangle $(0, 0), (4, 0), (0, 3)$, read in that order, runs anticlockwise and the shoelace gives $\\tfrac{1}{2}(0(0-3) + 4(3-0) + 0(0-0)) = \\tfrac{1}{2}(12) = +6$. Reflect it in the y-axis: the image triangle $(0, 0), (-4, 0), (0, 3)$ runs CLOCKWISE in the same reading order, and the shoelace gives $-6$ — the area is the same 6, but the handedness has reversed. Rotate it by $90^\\circ$ about the origin: the image $(0, 0), (0, 4), (-3, 0)$ still runs anticlockwise, and the shoelace still gives $+6$. The mirror flips the sign; the turn keeps it. That is the whole visible difference between the two families — the flip machines reverse orientation, the slide and turn machines preserve it — and Figure F7 shows the flip happening.',
    },
    {
      kind: 'figure',
      caption: 'Figure F7 — the signed-area orientation flip. Left: the witness triangle (0, 0), (4, 0), (0, 3) with shoelace area +6, vertices running anticlockwise. Middle: its y-axis mirror with area −6, now clockwise — the flip. Right: its 90° CCW turn image with area +6, still anticlockwise — the orientation kept.',
      svg: geo51Orient('Three panels: the triangle (0, 0), (4, 0), (0, 3) with signed area plus 6 running anticlockwise; its reflection in the y-axis with signed area minus 6 running clockwise; and its 90 degree rotation image with signed area plus 6 still anticlockwise, showing that mirrors flip orientation and turns keep it.'),
    },
    {
      kind: 'derivation',
      title: 'The shoelace witnesses: +6, then −6 in the mirror, then +6 in the turn',
      statement: 'Compute the signed area of the witness triangle $(0, 0), (4, 0), (0, 3)$, of its y-axis reflection, and of its $90^\\circ$ turn about the origin, using the shoelace formula $A = \\tfrac{1}{2}(x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2))$ in each triangle\u2019s own reading order.',
      steps: [
        {
          label: 'The original',
          formula: 'A = \\tfrac{1}{2}(0(0-3) + 4(3-0) + 0(0-0)) = \\tfrac{1}{2}(12) = +6',
          explanation: 'The vertices as written run anticlockwise, so the sign is positive — and the magnitude 6 is the honest area of the 3-4-5 half-rectangle, $\\tfrac{1}{2} \\cdot 4 \\cdot 3$.',
        },
        {
          label: 'The mirror image',
          formula: 'A = \\tfrac{1}{2}(0(0-3) + (-4)(3-0) + 0(0-0)) = \\tfrac{1}{2}(-12) = -6',
          explanation: 'The y-axis reflection negates every x-coordinate; the shoelace is linear in those coordinates, so the sum negates and the sign flips. Same area 6, opposite handedness: the mirror reverses orientation.',
        },
        {
          label: 'The turn image',
          formula: 'A = \\tfrac{1}{2}(0(4-0) + 0(0-0) + (-3)(0-4)) = \\tfrac{1}{2}(12) = +6',
          explanation: 'The 90° turn sends $(4, 0)$ to $(0, 4)$ and $(0, 3)$ to $(-3, 0)$; the shoelace sum survives with the same sign. The turn keeps orientation — it slides points around but never turns the plane over.',
        },
        {
          label: 'Why this is the census\u2019s decisive row',
          explanation: 'A mirror preserves every distance, angle, midpoint and parallel — everything the slide and turn preserve — yet no mirror can equal a slide or turn, because the signed areas part company: $+6$ versus $-6$ cannot come from the same machine family. Orientation is the visible difference between the flip machines and the slide-and-turn machines.',
        },
      ],
      result: 'Shoelace verdicts: original $+6$, y-axis mirror $-6$, $90^\\circ$ turn $+6$ — reflections reverse orientation; translations and rotations preserve it.',
    },
    {
      kind: 'table',
      caption: 'The invariance census — every row is engine-verified on the pinned witnesses; only the orientation row separates the families',
      head: ['Property', 'translation (slide)', 'reflection (mirror)', 'rotation (turn)', 'Witness'],
      rows: [
        ['distance |PQ|', 'kept', 'kept', 'kept', '√26 ≈ 5.0990199 under T_(3, −2)'],
        ['angles', 'kept', 'kept', 'kept', 'the right angle at (4, 0) survives the y-axis mirror, dot 0'],
        ['midpoints', 'kept', 'kept', 'kept', '(1, 2.5) → (4, 0.5) under T_(3, −2)'],
        ['parallelism', 'kept', 'kept', 'kept', 'y = 0 → y = −2, parallel under T_(3, −2)'],
        ['straightness', 'kept', 'kept', 'kept', 'lines to lines for all three families'],
        ['orientation (signed area)', 'kept: +6 stays +6', 'flips: +6 becomes −6', 'kept: +6 stays +6', 'shoelace on (0, 0), (4, 0), (0, 3)'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the table once more, because it is the strategic map of the whole chapter. If an exam question asks whether a figure and its image are congruent, the census says YES for every machine in this lesson — congruence needs only matching distances (SSS), and every machine keeps distances. If the question asks which machine did the carrying, use the fingerprint column: a motion with no fixed point is a slide; one fixing a whole line is a mirror; one fixing exactly one point is a turn; and if the preimage and image have opposite handedness (signed areas $+6$ and $-6$), the mirror family did it regardless of anything else, because the other two families cannot flip orientation. The census is not trivia — it is the identification kit that Section 6\u2019s craft and the exercises use constantly.',
    },

    /* -------------------------------------------------------------- */
    /* 6. drawing the image: the craft                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Drawing the image: the graph-paper craft' },
    {
      kind: 'para',
      text: 'Knowing a rule and producing a correct drawing are different skills, and the second is the one exams examine (this is the craft the school standard G-CO.5 asks for, in exactly these words: draw the image). The craft is always the same three moves, whatever the machine. FIRST, write the rule — the slide vector, the mirror line, or the turn with its centre and angle — so the direction is fixed before any arithmetic. SECOND, plot the image of each VERTEX, one vertex at a time, running the coordinate formula with full arithmetic shown. THIRD, join the image points IN THE SAME ORDER the originals were joined. The census is your safety net throughout: the finished image must have the same side lengths as the original (ruler-check the drawing), the same angles, and — if the machine was a slide or turn — the same orientation; a drawing that fails the check has an arithmetic slip, and the census tells you where to look.',
    },
    {
      kind: 'example',
      title: 'Illustration 1 — the slide, worked end to end',
      steps: [
        'The figure is the triangle with vertices $A = (1, 1)$, $B = (4, 1)$, $C = (1, 3)$; the machine is the slide $T_{(2,-1)}$: $(x, y) \\mapsto (x + 2,\\ y - 1)$.',
        'Vertex by vertex: $A \\mapsto (1 + 2,\\ 1 - 1) = (3, 0)$; $B \\mapsto (4 + 2,\\ 1 - 1) = (6, 0)$; $C \\mapsto (1 + 2,\\ 3 - 1) = (3, 2)$.',
        'Join in the same order: $A \\to B \\to C \\to A$ becomes $(3, 0) \\to (6, 0) \\to (3, 2) \\to (3, 0)$.',
        'Census check: $|AB| = 3$ and $|A\\u2032B\\u2032| = 3$; $|AC| = 2$ and $|A\\u2032C\\u2032| = 2$; $|BC| = \\sqrt{3^2 + 2^2} = \\sqrt{13} \\approx 3.6055513$ and $|B\\u2032C\\u2032| = \\sqrt{(6-3)^2 + (0-2)^2} = \\sqrt{13}$ again — every side preserved exactly, so the drawing is right.',
        'Orientation check: both triangles read anticlockwise in their vertex order (signed area $+3$ before, $+3$ after) — a slide must keep orientation, and it did.',
      ],
      answer: 'the image triangle is $(3, 0)$, $(6, 0)$, $(3, 2)$, with all three sides preserved (3, 2, √13 ≈ 3.6055513)',
    },
    {
      kind: 'para',
      text: 'The second craft is identification: given a preimage and an image, name the machine. Work it as a census interrogation in order, and the suspects eliminate themselves. Question one: is there a fixed point? A point that coincides with its image rules out every nonzero slide at a stroke. Question two: did orientation survive? Compute (or eyeball) the handedness of both figures — a flip between them convicts the mirror family, whatever else matches. Question three: which machine of the surviving family fits — and a turn announces itself by its fixed centre and the equal radii from that centre. Figure F8 poses a pair; the Illustration below runs the interrogation on it and reaches a verdict the engine verified point-by-point.',
    },
    {
      kind: 'figure',
      caption: 'Figure F8 — the identify-the-motion pair. The teal preimage (0, 0), (4, 0), (4, 3) and the dashed orange image (0, 0), (−4, 0), (−4, −3): the origin is fixed, the sides all match, and the question is which single machine carried one onto the other.',
      svg: geo51Identify('Coordinate grid showing an identification puzzle: the solid preimage triangle (0, 0), (4, 0), (4, 3) and the dashed image triangle (0, 0), (minus 4, 0), (minus 4, minus 3), with the origin fixed and the motion to be named.'),
    },
    {
      kind: 'example',
      title: 'Illustration 2 — the interrogation, worked to a verdict',
      steps: [
        'The pair: preimage $(0, 0), (4, 0), (4, 3)$ and image $(0, 0), (-4, 0), (-4, -3)$ (Figure F8). Every vertex maps to its image point-for-point in the given order.',
        'Fixed point: the origin $(0, 0)$ coincides with its image. A nonzero slide fixes nothing, so the slide family is eliminated.',
        'Distances: the preimage carries sides $4$, $3$, $\\sqrt{4^2 + 3^2} = 5$; the image carries $|\\!(-4) - 0| = 4$, $3$, $5$ — identical, so some rigid motion fits and the pair is congruent by SSS.',
        'Orientation: the shoelace signed area of the preimage is $+6$; of the image, $\\tfrac{1}{2}(0(0+3) + (-4)(-3-0) + (-4)(0-0)) = \\tfrac{1}{2}(12) = +6$ — the sign is KEPT, so the mirror family is eliminated (a mirror would give $-6$).',
        'Verdict: a turn fixing the origin, and the half turn $R_{180}: (x, y) \\mapsto (-x, -y)$ maps $(0, 0) \\mapsto (0, 0)$, $(4, 0) \\mapsto (-4, 0)$, $(4, 3) \\mapsto (-4, -3)$ — every vertex lands on its image. The motion is $R_{180}$ about the origin, engine-checked.',
      ],
      answer: 'the motion is the half turn R180 about the origin (slide eliminated by the fixed point, mirror eliminated by the kept orientation +6)',
    },
    {
      kind: 'para',
      text: 'The third craft is the mirror drawing, where the perpendicular-bisector law becomes a drawing instrument. To reflect a vertex by hand: measure the perpendicular distance to the mirror, continue the same distance on the far side, and mark the image — the mirror must cut the join in half at $90^\\circ$, which is both the definition and the check. Figure F9 runs the craft on the diagonal mirror $y = x$ with the witness triangle $(0, 0), (4, 0), (4, 3)$: the swap rule sends $(4, 0)$ to $(0, 4)$ and $(4, 3)$ to $(3, 4)$, the origin reflects to itself, and each dashed join — drawn on the figure — meets the mirror at its midpoint foot, $(2, 2)$ for the first join and $(3.5, 3.5)$ for the second, at a right angle. Plot the three image vertices, join in the same order, and the image triangle is $(0, 0), (0, 4), (3, 4)$ — with the census confirming all sides preserved.',
    },
    {
      kind: 'figure',
      caption: 'Figure F9 — the plot-vertex-by-vertex worked triangle in the y = x mirror. The preimage (0, 0), (4, 0), (4, 3) and its image (0, 0), (0, 4), (3, 4), with the dashed joins meeting the mirror at the feet (2, 2) and (3.5, 3.5) at right angles — the craft made visible.',
      svg: geo51Craft('Coordinate grid showing the reflection of the triangle (0, 0), (4, 0), (4, 3) in the line y equals x: image vertices (0, 0), (0, 4), (3, 4) plotted one by one, dashed joins meeting the mirror at the feet (2, 2) and (3.5, 3.5) at right angles.'),
    },
    {
      kind: 'example',
      title: 'Illustration 3 — a turn about a foreign centre, three steps',
      steps: [
        'The machine: a $90^\\circ$ anticlockwise turn about the foreign centre $C = (2, 3)$; the point: the origin $P = (0, 0)$.',
        'Step 1, translate so the centre sits at $O$: subtract the centre — $P - C = (0 - 2,\\ 0 - 3) = (-2, -3)$.',
        'Step 2, run the origin machine: $R_{90}$ sends $(x, y) \\mapsto (-y, x)$, so $(-2, -3) \\mapsto (3, -2)$.',
        'Step 3, translate back: add the centre — $(3 + 2,\\ -2 + 3) = (5, 1)$. So $P \\mapsto (5, 1)$.',
        'Census check: $|CP| = \\sqrt{(-2)^2 + (-3)^2} = \\sqrt{13} \\approx 3.6055513$ and $|C P\\u2032| = \\sqrt{(5-2)^2 + (1-3)^2} = \\sqrt{13}$ — the radius survives, so the image is honest; the same three steps ran the pinned witnesses $(5, 3) \\mapsto (2, 6)$ and $(5, 0) \\mapsto (5, 6)$ in Section 4.',
      ],
      answer: 'the origin lands on (5, 1): subtract (2, 3), turn R90, add (2, 3) back, with the radius √13 ≈ 3.6055513 kept',
    },
    {
      kind: 'table',
      caption: 'The motion-rule table — every coordinate rule of the lesson, with the pinned witness that earns it',
      head: ['Machine', 'Coordinate rule', 'Pinned witness'],
      rows: [
        ['slide $T_{(a,b)}$', '(x, y) → (x + a, y + b)', '(5, 1) → (8, −1) under T_(3, −2)'],
        ['mirror in the y-axis', '(x, y) → (−x, y)', '(−3, 4) → (3, 4)'],
        ['mirror in the x-axis', '(x, y) → (x, −y)', '(−3, 4) → (−3, −4)'],
        ['mirror in y = x', '(x, y) → (y, x)', '(−3, 4) → (4, −3)'],
        ['mirror in x = c', '(x, y) → (2c − x, y)', '(1, 2) → (5, 2) in x = 3'],
        ['turn R90 about O', '(x, y) → (−y, x)', '(4, 1) → (−1, 4)'],
        ['turn R180 about O', '(x, y) → (−x, −y)', '(2, 5) → (−2, −5)'],
        ['turn R270 about O', '(x, y) → (y, −x)', '(4, 1) → (1, −4)'],
        ['turn R90 about C (a, b)', 'subtract C, apply (−y, x), add C back', '(5, 0) → (5, 6) about (2, 3)'],
      ],
    },
    {
      kind: 'para',
      text: 'Keep this table beside every exercise. The rules are short enough to memorise, but the WITNESSES are what make the memory safe: if your version of the $y = x$ rule sends $(-3, 4)$ anywhere but $(4, -3)$, the witness catches the slip before it costs marks. Note the pattern that runs down the mirror rows — one coordinate flips, or they swap — and the pattern in the turn rows: the coordinates trade places with a sign change, one sign for the quarter turn, two for the half turn, the other arrangement for three-quarters. Patterns plus witnesses beat memorisation alone, every time.',
    },

    /* -------------------------------------------------------------- */
    /* 7. why this matters                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Why this matters: congruence redefined, and the doorstep to symmetry' },
    {
      kind: 'para',
      text: 'Chapter 3 defined congruence the only way it could before machines existed: two figures are congruent when corresponding sides and angles match. This lesson cashes that definition into motion language, and the upgrade is the exact framing of the school standard G-CO.6 (the opening target of Lesson 5.2): two figures are congruent when ONE rigid motion carries the first onto the second. The census explains why the two definitions agree — a rigid motion keeps every distance and angle, so its image automatically matches the original in the Chapter 3 sense; and the distance-matrix read makes the agreement computational. Take the witness triangle $(0, 0), (4, 0), (4, 3)$ and the triangle $(6, 5), (10, 5), (10, 8)$: their distance matrices — the three pairwise distances $4$, $3$, $5$ in each seat — are IDENTICAL, and the slide $T_{(6,5)}$ carries the first triangle onto the second vertex by vertex. Same matrix, congruent figures, and the machine named: that is what it means, operationally, for two figures to be “the same shape and size”.',
    },
    {
      kind: 'para',
      text: 'And one door opens onto the next lesson\u2019s country. A SYMMETRY of a figure is a rigid motion that carries the figure onto ITSELF — leaves the figure fixed as a set, while possibly shuffling its points. The equilateral triangle has six: the identity, three mirror flips (one per altitude), and two turns of $120^\\circ$ and $240^\\circ$ about its centre; the square has eight; a generic scalene triangle has only the identity. Read that sentence again with this lesson\u2019s vocabulary and you will see it is entirely made of machines: which slides, flips and turns return the figure to its own footprint? Lesson 5.3 answers that question systematically — but you already own every tool it will use: the coordinate rules, the fixed-point fingerprints, and the census that tells mirror from turn.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: rules, witnesses, and the orientation tell',
      text: 'Three habits score on this topic. FIRST, state the rule before computing: “reflection in $y = x$; swap” or “$R_{90}$ about $O$: $(x, y) \\mapsto (-y, x)$” — a stated rule earns the method mark even if an arithmetic slip follows, and it prevents the wrong-machine answers. SECOND, verify with the census, not with hope: check ONE distance (a side), ONE angle (a dot product or the right-angle mark) and the orientation (shoelace sign) — three numbers that every correct image must reproduce, with the mirror\u2019s $+6 \\to -6$ flip as the classic tell. THIRD, identify machines by fingerprint: fixed point — none means slide, a whole line means mirror, exactly one point means turn; then name the machine from the pair. The standard traps, all seen in past papers: flipping the wrong coordinate at an axis mirror (audit: which axis separates WHICH pair?), reflecting to the SAME side of the mirror, using $(x, y) \\mapsto (y, x)$ for the $y = -x$ diagonal (it is the swap with BOTH signs flipped), and rotating about a foreign centre without translating first. Typical mark scheme: the stated rule is a mark; each correctly computed image vertex is a mark; a census check or a correct identification verdict is a mark.',
    },

    /* -------------------------------------------------------------- */
    /* 8. collected law: formula cards                                */
    /* -------------------------------------------------------------- */
    {
      kind: 'para',
      text: 'Five cards collect the machines and the census in the form the revision sheet wants. The first three are the coordinate rules — slide, mirrors, turns — with their pinned witnesses printed on the cards. The fourth is the foreign-centre assembly, the machine that builds every other turn from the origin machines. The fifth is the census itself, with the shoelace test that separates the flip family from the slide-and-turn family.',
    },
    {
      kind: 'formula',
      name: 'The slide machine (translation T_(a, b))',
      latex: 'T_{(a,b)}: (x, y) \\mapsto (x + a,\\ y + b)',
      note: 'every point moves by the same vector (a, b); distances, angles, midpoints, parallelism all kept — witness: (5, 1) → (8, −1) and (0, 0) → (3, −2) under T_(3, −2), |PQ| = √26 ≈ 5.0990199 preserved exactly',
    },
    {
      kind: 'formula',
      name: 'The mirror machines (reflections)',
      latex: 'y\\text{-axis}: (x, y) \\mapsto (-x, y),\\quad x\\text{-axis}: (x, y) \\mapsto (x, -y),\\quad y = x: (x, y) \\mapsto (y, x),\\quad x = c: (x, y) \\mapsto (2c - x, y)',
      note: 'the mirror is the perpendicular bisector of every join P to P′ — midpoint on the mirror, join at 90° (G-CO.9); witnesses: (−3, 4) → (3, 4), (−3, −4), (4, −3); (1, 2) → (5, 2) in x = 3 with midpoint (3, 2) and distances 2 and 2',
    },
    {
      kind: 'formula',
      name: 'The turn machines about the origin (rotations)',
      latex: 'R_{90}: (x, y) \\mapsto (-y, x),\\quad R_{180}: (x, y) \\mapsto (-x, -y),\\quad R_{270}: (x, y) \\mapsto (y, -x)',
      note: 'anticlockwise reads; 270° CCW = 90° CW; every image keeps its distance from O — witness: (4, 1) → (−1, 4) with |(4, 1)| = √17 ≈ 4.1231056 kept; (2, 5) → (−2, −5); (4, 1) → (1, −4)',
    },
    {
      kind: 'formula',
      name: 'A turn about any centre C (a, b) — translate, turn, translate back',
      latex: 'R_{90,\\,C}: (x, y) \\mapsto \\bigl(a - (y - b),\\; b + (x - a)\\bigr)',
      note: 'subtract the centre, run the origin machine, add the centre back; radii from C survive — witnesses about (2, 3): (5, 3) → (2, 6) with |CP| = 3 kept, (5, 0) → (5, 6) with |CR| = √18 ≈ 4.2426407 kept',
    },
    {
      kind: 'formula',
      name: 'The invariance census and the shoelace orientation test',
      latex: 'A_{\\text{signed}} = \\tfrac{1}{2}\\bigl(x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\bigr)',
      note: 'distances, angles, midpoints, parallelism, straightness: kept by every rigid motion; orientation flips ONLY in the mirror family — witness: (0, 0), (4, 0), (0, 3) has signed area +6, −6 after the y-axis mirror, +6 after the 90° turn',
    },

    /* -------------------------------------------------------------- */
    /* 9. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'transformation', def: 'A function of the plane: every point in, exactly one image point out (G-CO.2\u2019s framing). Written $P \\mapsto P\\u2032$; the input is the preimage, the output the image.' },
        { term: 'preimage and image', def: 'The point $P$ a machine starts from is the preimage of $P\\u2032$, the point it lands on. Figures, not just points, have preimages and images: the image of a triangle is the triangle its three image vertices make.' },
        { term: 'rigid motion (isometry)', def: 'A transformation that preserves every distance: $|P\\u2032Q\\u2032| = |PQ|$ for all points. Distance preservation forces angle preservation (SSS), and slides, flips and turns are the rigid motions this lesson builds.' },
        { term: 'translation (slide)', def: 'The machine $T_{(a,b)}: (x, y) \\mapsto (x + a, y + b)$ — one vector for every point. Keeps distances, angles, midpoints, parallelism and orientation; fixes no point unless it is the zero slide.' },
        { term: 'reflection (flip)', def: 'The machine that swaps the two sides of a mirror line: $P\\u2032$ sits at the same perpendicular distance on the far side. Axis rules: y-axis $(x, y) \\mapsto (-x, y)$, x-axis $(x, y) \\mapsto (x, -y)$, y = x swap $(x, y) \\mapsto (y, x)$, general vertical mirror $x = c$: $(x, y) \\mapsto (2c - x, y)$.' },
        { term: 'rotation (turn)', def: 'The machine that swings every point about a fixed centre through one stated angle, anticlockwise by convention. Origin rules: $R_{90}: (x, y) \\mapsto (-y, x)$, $R_{180}: (x, y) \\mapsto (-x, -y)$, $R_{270}: (x, y) \\mapsto (y, -x)$.' },
        { term: 'the mirror law (G-CO.9)', def: 'Every mirror is the perpendicular bisector of the join it creates: the midpoint of $P P\\u2032$ lies on the mirror and the join meets the mirror at $90^\\circ$. Witness: $(1, 2) \\to (5, 2)$ in $x = 3$, midpoint $(3, 2)$, distances 2 and 2.' },
        { term: 'orientation (signed area)', def: 'The handedness of a figure, read off the shoelace sign: positive for anticlockwise vertex order, negative for clockwise. Reflections flip it ($+6 \\to -6$); translations and rotations keep it ($+6 \\to +6$) — the one census row that separates the families.' },
        { term: 'the invariance census', def: 'The audit table of what every rigid motion keeps: distances, angles, midpoints, parallelism, straightness — all kept by slide, mirror and turn alike; orientation kept except under the mirror. The identification kit for naming a motion.' },
        { term: 'fixed points (the fingerprints)', def: 'Points that coincide with their images. A nonzero slide fixes none; a mirror fixes its whole mirror line; a turn fixes exactly its centre. Counting fixed points identifies the machine family.' },
        { term: 'distance matrix', def: 'The square table of pairwise distances among a figure\u2019s vertices. Two triangles with identical distance matrices are congruent (SSS), and some rigid motion carries one onto the other — witness: (0, 0), (4, 0), (4, 3) vs (6, 5), (10, 5), (10, 8), both 3-4-5, matched by $T_{(6,5)}$.' },
        { term: 'symmetry (the preview)', def: 'A rigid motion that carries a figure onto itself. The equilateral triangle owns six (the identity, three flips, two turns of $120^\\circ$ and $240^\\circ$); the square eight; a scalene triangle one. Lesson 5.3 counts them systematically.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz (key [3,0,4,1,2] — PINNED)                            */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'A transformation of the plane is best understood as —',
          options: [
            'a picture of a shape caught mid-motion, drawn by an artist',
            'a rule that moves only the vertices of the triangle you happen to be watching',
            'a formula that changes the size of a figure, like an enlargement',
            'a function of the plane: every point in, exactly one image point out — the whole plane served at once',
          ],
          answer: 3,
          explain: 'The G-CO.2 framing is functional: a transformation assigns to EVERY point of the plane exactly one image point, and figures are just the parts we choose to watch. Option (a) mistakes the illustration for the object. Option (b) is the classic narrow read — the machine serves the entire plane, not a chosen triangle (the census even tracks lines and parallels, which own no vertices). Option (c) describes an enlargement, which is NOT rigid: it multiplies distances, and this lesson\u2019s machines keep every distance. Only (d) states the function picture that makes the subject computable: rules written on points, tested at points, one output per input.',
        },
        {
          q: 'The image of (−3, 4) in the y-axis is —',
          options: [
            '(3, 4) — the y-axis mirror flips the x-coordinate and keeps the height',
            '(−3, −4) — both coordinates flip',
            '(4, −3) — the coordinates swap',
            '(3, −4) — both coordinates flip and swap',
          ],
          answer: 0,
          explain: 'The y-axis separates east from west, so it flips exactly the x-coordinate: $(x, y) \\mapsto (-x, y)$, giving $(3, 4)$ from $(-3, 4)$. Option (b) is the x-axis machine\u2019s output — the horizontal mirror flips the y-coordinate. Option (c) is the $y = x$ swap. Option (d) is neither machine: flipping AND swapping is the rule for the diagonal $y = -x$, not for the y-axis. The audit that catches all slips: the mirror must be halfway between preimage and image — the y-axis sits midway between $x = -3$ and $x = 3$ at equal height.',
        },
        {
          q: 'The 90° anticlockwise turn about the origin carries (4, 1) to —',
          options: [
            '(1, 4)',
            '(4, −1)',
            '(−4, −1)',
            '(1, −4)',
            '(−1, 4)',
          ],
          answer: 4,
          explain: 'The quarter turn about $O$ is $(x, y) \\mapsto (-y, x)$: swap the coordinates and negate the new x — $(4, 1) \\mapsto (-1, 4)$. Option (a) swaps but forgets the sign. Option (b) negates the wrong coordinate (that is the clockwise quarter turn, $(x, y) \\mapsto (y, -x)$). Option (c) negates both — the half turn\u2019s rule. Option (d) is the three-quarter anticlockwise turn. The census check that picks (e) alone: $|(4, 1)| = \\sqrt{17} \\approx 4.1231056$, and only $(-1, 4)$ keeps that distance from $O$.',
        },
        {
          q: 'A triangle has shoelace signed area +6. After a reflection in the line y = x, the image\u2019s signed area is —',
          options: [
            '+6, because reflections keep every distance and angle',
            '−6: the mirror flips the sign — the orientation reverses',
            '+12, because the mirror doubles the sweep',
            '0, because the image lies flat on the mirror',
          ],
          answer: 1,
          explain: 'Reflections preserve every distance and angle (the census rows all say kept) but they REVERSE orientation: the witness triangle $(0, 0), (4, 0), (0, 3)$ has signed area $+6$, and its mirror image reads $-6$ by the same shoelace computation. Option (a) is the subtle trap — “keeps everything” is true for every census row except the one that matters here; signed area is not a distance or an angle. Option (c) invents a doubling that no machine performs (areas are kept in magnitude). Option (d) confuses reflecting with projecting — the image triangle has the same area 6, only the sign flips.',
        },
        {
          q: 'The triangles (0, 0), (4, 0), (4, 3) and (6, 5), (10, 5), (10, 8) — which statement is true?',
          options: [
            'their distance matrices differ, since the second triangle sits higher on the grid',
            'they have the same area but different side lengths',
            'identical distance matrices — congruent, and T_(6, 5) carries the first onto the second',
            'only their angles agree; their sides differ',
          ],
          answer: 2,
          explain: 'The second triangle is exactly the first one slid by $T_{(6,5)}$: $(0, 0) \\to (6, 5)$, $(4, 0) \\to (10, 5)$, $(4, 3) \\to (10, 8)$. The slide keeps every distance, so both triangles carry sides $4$, $3$, $5$ — identical distance matrices, congruent by SSS, and the carrying machine is named. Option (a) confuses position with structure: distance matrices measure the figure\u2019s internal geometry, which no slide touches. Option (b) is impossible for rigidly related figures — equal areas come FROM equal sides here. Option (c)\u2019s phrase is the operational meaning of congruence for G-CO.6. Option (d) contradicts the slide\u2019s distance preservation outright.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the motion machines and their audits',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'The slide $T_{(3,-2)}$ carries every point 3 east and 2 south. Find the images of $(5, 1)$ and $(0, 0)$, and verify that the distance between the two points is preserved exactly.',
              solution: [
                'Sol. Run the rule $(x, y) \\mapsto (x + 3,\\ y - 2)$ on each point.',
                '$(5, 1) \\mapsto (5 + 3,\\ 1 - 2) = (8, -1)$; $(0, 0) \\mapsto (0 + 3,\\ 0 - 2) = (3, -2)$.',
                'Distance before: $|PQ| = \\sqrt{(5-0)^2 + (1-0)^2} = \\sqrt{26} \\approx 5.0990199$.',
                'Distance after: $\\sqrt{(8-3)^2 + ((-1) - (-2))^2} = \\sqrt{25 + 1} = \\sqrt{26}$ — the same surd, exactly.',
                'Hence the images are $(8, -1)$ and $(3, -2)$, and $|PQ| = \\sqrt{26} \\approx 5.0990199$ is preserved exactly.',
              ],
              answer: 'images $(8, -1)$ and $(3, -2)$; $|PQ| = \\sqrt{26} \\approx 5.0990199$ preserved exactly',
            },
            {
              q: 'Reflect the point $(-3, 4)$ in the y-axis, in the x-axis, and in the line $y = x$, naming the rule you use at each step.',
              solution: [
                'Sol. y-axis: the rule $(x, y) \\mapsto (-x, y)$ flips the x-coordinate: $(-3, 4) \\mapsto (3, 4)$.',
                'x-axis: the rule $(x, y) \\mapsto (x, -y)$ flips the y-coordinate: $(-3, 4) \\mapsto (-3, -4)$.',
                'y = x: the rule $(x, y) \\mapsto (y, x)$ swaps the coordinates: $(-3, 4) \\mapsto (4, -3)$.',
                'Audit each with the mirror law: the y-axis is halfway between $x = -3$ and $x = 3$ at equal height; the x-axis is halfway between $y = 4$ and $y = -4$; and the midpoint of the third join, $(0.5, 0.5)$, sits on $y = x$.',
                'Hence the images are $(3, 4)$, $(-3, -4)$ and $(4, -3)$ in order.',
              ],
              answer: 'in the y-axis $(3, 4)$; in the x-axis $(-3, -4)$; in $y = x$ $(4, -3)$',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The mirror is the line $x = 3$. Reflect $(1, 2)$, find the midpoint of the join from point to image, and show that the midpoint lies on the mirror with the two halves of the join equal and the join perpendicular to the mirror.',
              solution: [
                'Sol. The vertical mirror $x = 3$ runs the rule $(x, y) \\mapsto (2 \\cdot 3 - x,\\ y)$: $(1, 2) \\mapsto (5, 2)$.',
                'Midpoint of the join from $(1, 2)$ to $(5, 2)$: $\\bigl(\\tfrac{1+5}{2},\\ \\tfrac{2+2}{2}\\bigr) = (3, 2)$.',
                'On the mirror? The midpoint\u2019s x-coordinate is 3 — yes, $(3, 2)$ sits exactly on the line $x = 3$.',
                'Equal halves? From $(1, 2)$ to $(3, 2)$ is $3 - 1 = 2$; from $(3, 2)$ to $(5, 2)$ is $5 - 3 = 2$ — distances $2$ and $2$.',
                'Perpendicular? The join runs horizontally (y fixed at 2) and the mirror runs vertically — the join meets the mirror at $90^\\circ$, the perpendicular-bisector law of G-CO.9 in full.',
                'Hence $(1, 2) \\mapsto (5, 2)$ with midpoint $(3, 2)$ on the mirror and the halves $2$ and $2$ equal.',
              ],
              answer: 'image $(5, 2)$; midpoint $(3, 2)$ on the mirror; the halves of the join measure $2$ and $2$, meeting the mirror at $90^\\circ$',
              figures: [
                {
                  caption: 'The mirror x = 3 construction for Exercise 3: P(1, 2) reflects to P′(5, 2); the dashed join meets the mirror at the midpoint M(3, 2) at a right angle, with halves 2 and 2 — the perpendicular-bisector law drawn.',
                  svg: geo51SolMirror3('Solution diagram: the vertical mirror x = 3 with point P at (1, 2) reflected to P prime at (5, 2), the join bisected at M (3, 2) on the mirror at a right angle, halves both measuring 2.'),
                },
              ],
            },
            {
              q: 'The turn $R_{90}$ (90° anticlockwise about the origin) acts on $(4, 1)$. Find the image and verify that the distance from the origin survives, as an exact surd and a decimal.',
              solution: [
                'Sol. The quarter-turn rule is $(x, y) \\mapsto (-y, x)$: $(4, 1) \\mapsto (-1, 4)$.',
                'Derive the rule, do not just quote it: $(1, 0) \\mapsto (0, 1)$ and $(0, 1) \\mapsto (-1, 0)$, so the x-direction lands on the y-direction and vice versa with a sign — exactly $(-y, x)$.',
                'Distance before: $\\sqrt{4^2 + 1^2} = \\sqrt{17} \\approx 4.1231056$.',
                'Distance after: $\\sqrt{(-1)^2 + 4^2} = \\sqrt{17} \\approx 4.1231056$ — the same circle about $O$.',
                'Hence the image is $(-1, 4)$, with the radius $\\sqrt{17} \\approx 4.1231056$ kept.',
              ],
              answer: '$(-1, 4)$, with radius $\\sqrt{17} \\approx 4.1231056$ kept',
            },
            {
              q: 'Find the image of $(2, 5)$ under the half turn $R_{180}$ about the origin, and the image of $(4, 1)$ under $R_{270}$ (270° anticlockwise). Explain why $R_{270}$ and a 90° clockwise turn are the same machine.',
              solution: [
                'Sol. Half turn: $(x, y) \\mapsto (-x, -y)$ sends every point through the centre to the diametrically opposite point: $(2, 5) \\mapsto (-2, -5)$.',
                'Three-quarter turn: $(x, y) \\mapsto (y, -x)$: $(4, 1) \\mapsto (1, -4)$.',
                'Why the same machine: turning three-quarters anticlockwise leaves a point one quarter of a circle short of home — the same place a quarter turn clockwise reaches. The rules agree: $(y, -x)$ is the 90°-clockwise formula.',
                'Circle check: $|(-2, -5)| = \\sqrt{29}$ and $|(2, 5)| = \\sqrt{29}$; $|(1, -4)| = \\sqrt{17}$ and $|(4, 1)| = \\sqrt{17}$ — both images keep their radii.',
                'Hence $(2, 5) \\mapsto (-2, -5)$ under $R_{180}$ and $(4, 1) \\mapsto (1, -4)$ under $R_{270}$.',
              ],
              answer: '$(-2, -5)$ under $R_{180}$; $(1, -4)$ under $R_{270}$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Turn $(5, 3)$ through 90° anticlockwise about the foreign centre $(2, 3)$, using the translate-turn-translate machine. Verify that the distance to the centre is preserved.',
              solution: [
                'Sol. Step 1, subtract the centre: $(5, 3) - (2, 3) = (3, 0)$ — the centre now sits at the origin.',
                'Step 2, run the origin machine $R_{90}: (x, y) \\mapsto (-y, x)$: $(3, 0) \\mapsto (0, 3)$.',
                'Step 3, add the centre back: $(0 + 2,\\ 3 + 3) = (2, 6)$. So $(5, 3) \\mapsto (2, 6)$.',
                'Distance check: $|CP| = \\sqrt{(5-2)^2 + (3-3)^2} = 3$ before; $|CP\\u2032| = \\sqrt{(2-2)^2 + (6-3)^2} = 3$ after — the radius survives, as the circle fact demands.',
                'Hence $(5, 3) \\mapsto (2, 6)$ about $(2, 3)$, with $|CP| = 3$ kept.',
              ],
              answer: '$(2, 6)$, with $|CP| = 3$ kept',
            },
            {
              q: 'The slide $T_{(3,-2)}$ acts on the whole x-axis (the line $y = 0$). Find the images of $(0, 0)$ and $(7, 0)$, name the line the axis lands on, and state whether the image line is parallel to the original.',
              solution: [
                'Sol. Images: $(0, 0) \\mapsto (3, -2)$ and $(7, 0) \\mapsto (7 + 3,\\ 0 - 2) = (10, -2)$.',
                'Both images sit at height $-2$, and every other point of the axis lands at height $-2$ too (the slide adds $-2$ to every y-coordinate).',
                'So the axis $y = 0$ lands on the line $y = -2$.',
                'Parallel? Both lines run horizontally — the slide moves every point by the same vector, so no tilt is possible: the image line is parallel to the original.',
                'Hence the images are $(3, -2)$ and $(10, -2)$, and the axis lands on $y = -2$, parallel to $y = 0$.',
              ],
              answer: '$(3, -2)$ and $(10, -2)$: the line $y = -2$, parallel to $y = 0$',
              figures: [
                {
                  caption: 'The slide of a line for Exercise 7: the axis y = 0 carrying the points (0, 0) and (7, 0) slides by the vector (3, −2) onto the parallel line y = −2 through (3, −2) and (10, −2).',
                  svg: geo51SolLine('Solution diagram: the line y = 0 with points (0, 0) and (7, 0) slides by the vector (3, minus 2) onto the parallel line y = minus 2 carrying (3, minus 2) and (10, minus 2), motion arrows parallel.'),
                },
              ],
            },
            {
              q: 'The segment from $(1, 1)$ to $(1, 4)$ is slid by $T_{(3,-2)}$. Find the images of the endpoints, the image of the midpoint $(1, 2.5)$, and the midpoint of the image segment; and verify the midpoint law.',
              solution: [
                'Sol. Endpoints: $(1, 1) \\mapsto (4, -1)$ and $(1, 4) \\mapsto (4, 2)$.',
                'Image of the midpoint: $(1, 2.5) \\mapsto (1 + 3,\\ 2.5 - 2) = (4, 0.5)$.',
                'Midpoint of the images: $\\bigl(\\tfrac{4+4}{2},\\ \\tfrac{-1+2}{2}\\bigr) = (4, 0.5)$.',
                'The two results coincide: the image of the midpoint IS the midpoint of the images — the midpoint law, witnessed in arithmetic.',
                'Hence the images are $(4, -1)$ and $(4, 2)$, and $(1, 2.5) \\mapsto (4, 0.5)$, which equals the midpoint of the image segment.',
              ],
              answer: 'images $(4, -1)$ and $(4, 2)$; the midpoint $(1, 2.5)$ maps to $(4, 0.5)$, the midpoint of the images',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Identify the motion. A triangle with vertices $(0, 0)$, $(4, 0)$, $(4, 3)$ has image $(0, 0)$, $(-4, 0)$, $(-4, -3)$. Run the full interrogation — fixed point, distances, orientation — and name the machine.',
              solution: [
                'Sol. Fixed point: $(0, 0)$ coincides with its image — a nonzero slide fixes nothing, so the slide family is out.',
                'Distances: the preimage carries sides $4$, $3$, $\\sqrt{4^2 + 3^2} = 5$; the image carries $4$, $3$, $5$ — identical, so a rigid motion fits (the pair is congruent by SSS).',
                'Orientation: the shoelace signed area of the preimage is $+6$; of the image, $\\tfrac{1}{2}\\bigl(0(0+3) + (-4)(-3-0) + (-4)(0-0)\\bigr) = \\tfrac{1}{2}(12) = +6$ — kept, so the mirror family is out (a mirror gives $-6$).',
                'A turn fixing the origin: try the half turn $(x, y) \\mapsto (-x, -y)$: $(0, 0) \\mapsto (0, 0)$, $(4, 0) \\mapsto (-4, 0)$, $(4, 3) \\mapsto (-4, -3)$ — every vertex lands on its image.',
                'Hence the motion is $R_{180}$ about the origin.',
              ],
              answer: '$R_{180}$ about the origin — slide eliminated by the fixed point, mirror by the kept orientation $+6$',
              figures: [
                {
                  caption: 'The identify-the-motion answer diagram for Exercise 9: the preimage (0, 0), (4, 0), (4, 3) and its dashed image (0, 0), (−4, 0), (−4, −3) with the 180° arc about the fixed origin — the verdict R180 drawn.',
                  svg: geo51SolIdentify('Answer diagram: the preimage triangle (0, 0), (4, 0), (4, 3) and dashed image triangle (0, 0), (minus 4, 0), (minus 4, minus 3), a 180 degree arc about the fixed origin O, verdict R180 about the origin.'),
                },
              ],
            },
            {
              q: 'Compute the shoelace signed area of the triangle $(0, 0)$, $(4, 0)$, $(0, 3)$; then of its image under the y-axis reflection; then under a 90° anticlockwise turn about the origin. State what the three signs prove.',
              solution: [
                'Sol. Original: $\\tfrac{1}{2}\\bigl(0(0-3) + 4(3-0) + 0(0-0)\\bigr) = \\tfrac{1}{2}(12) = +6$.',
                'y-axis reflection: the image is $(0, 0)$, $(-4, 0)$, $(0, 3)$; shoelace: $\\tfrac{1}{2}\\bigl(0(0-3) + (-4)(3-0) + 0(0-0)\\bigr) = \\tfrac{1}{2}(-12) = -6$.',
                '90° turn: the image is $(0, 0)$, $(0, 4)$, $(-3, 0)$; shoelace: $\\tfrac{1}{2}\\bigl(0(4-0) + 0(0-0) + (-3)(0-4)\\bigr) = \\tfrac{1}{2}(12) = +6$.',
                'Signs: $+6$, then $-6$ in the mirror, then $+6$ in the turn — the magnitudes agree (the area 6 survives), only the MIRROR flips the sign.',
                'Hence the signed areas are $+6$, $-6$, $+6$: the mirror reverses orientation, the turn preserves it — the census\u2019s decisive row.',
              ],
              answer: '$+6$, then $-6$ under the mirror, then $+6$ under the turn — the mirror flips orientation, the turn keeps it',
            },
            {
              q: 'The right angle of the triangle $(0, 0)$, $(4, 0)$, $(4, 3)$ sits at the vertex $(4, 0)$: the vectors from it to $(0, 0)$ and to $(4, 3)$ have dot product $(-4, 0) \\cdot (0, 3) = 0$. Reflect the triangle in the y-axis and verify that the right angle survives at the image vertex.',
              solution: [
                'Sol. Reflect vertex by vertex in the y-axis, $(x, y) \\mapsto (-x, y)$: $(0, 0) \\mapsto (0, 0)$, $(4, 0) \\mapsto (-4, 0)$, $(4, 3) \\mapsto (-4, 3)$.',
                'The right-angle vertex lands on $(-4, 0)$.',
                'Vectors from it: to $(0, 0)$ is $(4, 0)$; to $(-4, 3)$ is $(0, 3)$.',
                'Dot product: $(4, 0) \\cdot (0, 3) = 4 \\cdot 0 + 0 \\cdot 3 = 0$ — a right angle again, dot 0 before and after.',
                'Hence the right angle survives the mirror at the image vertex $(-4, 0)$, dot product $0$ — angles are census-kept even though the mirror flips orientation.',
              ],
              answer: 'the image vertex is $(-4, 0)$ and the dot product there is $0$ — the right angle survives the mirror',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Congruence by distance matrix. Compute the three pairwise distances of the triangle $(0, 0)$, $(4, 0)$, $(4, 3)$ and of the triangle $(6, 5)$, $(10, 5)$, $(10, 8)$; compare the matrices; and name the rigid motion that carries the first triangle onto the second, vertex by vertex.',
              solution: [
                'Sol. First triangle: $|(0,0)(4,0)| = 4$; $|(4,0)(4,3)| = 3$; $|(0,0)(4,3)| = \\sqrt{4^2 + 3^2} = 5$.',
                'Second triangle: $|(6,5)(10,5)| = 4$; $|(10,5)(10,8)| = 3$; $|(6,5)(10,8)| = \\sqrt{4^2 + 3^2} = 5$.',
                'The distance matrices are identical — both triangles are 3-4-5, so they are congruent by SSS.',
                'Name the machine: $(0, 0) \\mapsto (6, 5)$, $(4, 0) \\mapsto (10, 5)$, $(4, 3) \\mapsto (10, 8)$ — every x-coordinate grows by 6, every y-coordinate by 5. The slide $T_{(6,5)}$ carries the first triangle onto the second.',
                'Hence identical matrices (sides $4$, $3$, $5$), and $T_{(6, 5)}$ carries the first onto the second — congruence redefined as “carried by a rigid motion”, witnessed.',
              ],
              answer: 'identical distance matrices (sides $4$, $3$, $5$); $T_{(6, 5)}$ carries the first triangle onto the second',
            },
            {
              q: 'Turn $(5, 0)$ through 90° anticlockwise about the foreign centre $(2, 3)$ with the three-step machine, and verify that the radius $|CR|$ survives, as an exact surd and a decimal.',
              solution: [
                'Sol. Step 1, subtract the centre: $(5, 0) - (2, 3) = (3, -3)$.',
                'Step 2, run $R_{90}: (x, y) \\mapsto (-y, x)$: $(3, -3) \\mapsto (3, 3)$.',
                'Step 3, add the centre back: $(3 + 2,\\ 3 + 3) = (5, 6)$. So $(5, 0) \\mapsto (5, 6)$.',
                'Radius before: $|CR| = \\sqrt{(5-2)^2 + (0-3)^2} = \\sqrt{18} \\approx 4.2426407$.',
                'Radius after: $\\sqrt{(5-2)^2 + (6-3)^2} = \\sqrt{18} \\approx 4.2426407$ — the same circle about $C$.',
                'Hence $(5, 0) \\mapsto (5, 6)$ about $(2, 3)$, with $|CR| = \\sqrt{18} \\approx 4.2426407$ kept.',
              ],
              answer: '$(5, 6)$, with $|CR| = \\sqrt{18} \\approx 4.2426407$ kept',
              figures: [
                {
                  caption: 'The three-step turn for Exercise 13: (5, 0) subtracts the centre to (3, −3), turns 90° anticlockwise to (3, 3), and adds the centre back to land on (5, 6) — |CR| = √18 ≈ 4.2426407 kept throughout.',
                  svg: geo51SolForeign('Solution diagram: the three-step rotation about C (2, 3) — (5, 0) translates to (3, minus 3), turns to (3, 3), and translates back to (5, 6), with the radius square root of 18 kept.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Prove the midpoint law for slides directly from the average formula: for any slide $T_{(a,b)}$ and any segment with endpoints $P$, $Q$, the image of the midpoint equals the midpoint of the images. Then witness the proof on the segment from $(1, 1)$ to $(1, 4)$ under $T_{(3,-2)}$, and state why the census lets you claim the same law for mirrors and turns.',
              solution: [
                'Sol. The midpoint of $P = (x_1, y_1)$ and $Q = (x_2, y_2)$ is $M = \\bigl(\\tfrac{x_1 + x_2}{2},\\ \\tfrac{y_1 + y_2}{2}\\bigr)$.',
                'Slide the midpoint: $M \\mapsto \\bigl(\\tfrac{x_1 + x_2}{2} + a,\\ \\tfrac{y_1 + y_2}{2} + b\\bigr)$.',
                'Midpoint of the images: $P \\mapsto (x_1 + a, y_1 + b)$, $Q \\mapsto (x_2 + a, y_2 + b)$, so their midpoint is $\\bigl(\\tfrac{(x_1 + a) + (x_2 + a)}{2},\\ \\tfrac{(y_1 + b) + (y_2 + b)}{2}\\bigr) = \\bigl(\\tfrac{x_1 + x_2}{2} + a,\\ \\tfrac{y_1 + y_2}{2} + b\\bigr)$ — the same point, because the $a$ and $b$ split evenly between the two halves.',
                'Witness: the segment $(1, 1)$–$(1, 4)$ under $T_{(3,-2)}$ has images $(4, -1)$, $(4, 2)$; the midpoint $(1, 2.5)$ maps to $(4, 0.5)$, which is exactly $\\bigl(\\tfrac{4+4}{2},\\ \\tfrac{-1+2}{2}\\bigr)$.',
                'Census clause: the law is proved for slides, and the engine verified the same witness under the mirror and the turn — midpoint-preservation rides the distance preservation every rigid motion shares, so the claim extends census-wide.',
                'Hence the image of the midpoint $(1, 2.5)$ is $(4, 0.5)$, equal to the midpoint of the images — the midpoint law, proved and witnessed.',
              ],
              answer: 'the image of the midpoint $(1, 2.5)$ is $(4, 0.5)$, the midpoint of the images — proved from the average formula, extended census-wide',
            },
            {
              q: 'The orientation audit. The triangle $(0, 0)$, $(4, 0)$, $(0, 3)$ has signed area $+6$. Its mirror image in the y-axis has signed area $-6$, yet the two triangles are congruent by SSS. Write the full audit: both distance triples, both signed areas, and the conclusion about which family of machines could have done the carrying.',
              solution: [
                'Sol. Distances, original: $|(0,0)(4,0)| = 4$, $|(4,0)(0,3)| = 5$, $|(0,0)(0,3)| = 3$ — a 3-4-5 triangle.',
                'Distances, y-axis image $(0, 0)$, $(-4, 0)$, $(0, 3)$: $4$, $5$, $3$ — the same triple, so the pair is congruent by SSS.',
                'Signed areas: the original reads $+6$ (anticlockwise as written); the image reads $\\tfrac{1}{2}\\bigl(0(0-3) + (-4)(3-0) + 0(0-0)\\bigr) = -6$ (clockwise).',
                'Conclusion: slides and turns keep the sign ($+6 \\to +6$), so neither could have produced this pair; only the mirror family flips $+6$ to $-6$. The carrying machine was a reflection.',
                'Moral: congruence (matching distances) and orientation (matching handedness) are independent reads — the pair is congruent AND mirror-carried, and the signed area is the tell that names the family.',
                'Hence $+6$ and $-6$: congruent by SSS, but the flip convicts the mirror family.',
              ],
              answer: '$+6$ and $-6$: congruent by SSS, but the orientation flip convicts the mirror family',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}
