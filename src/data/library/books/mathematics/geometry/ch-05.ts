import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 5 "Transformations and Symmetry: the Rigid-Motion
 * Idea" (CLOSED COMPLETE by RUN 131, 2026-11-28 — the maths lane,
 * whole-chapter cadence, v9.2 protocol).
 *
 * The four seats, ALL LANDED WHOLE in one first-wave launch: 5.1 'The
 * Rigid Motions: Slides, Flips and Turns' (geo501 84/84 — 38 engine + 46
 * pins, 10,089 words); 5.2 'Composing Transformations and the Isometry
 * Idea' (geo502 92/92 — 46 + 46, 10,668 words; the engine caught that a
 * slide PERPENDICULAR to the mirror collapses to a pure reflection — the
 * lesson teaches the collapse honestly before building the true glide);
 * 5.3 'Line and Rotational Symmetry' (geo503 84/84 — 37 + 47, 12,303
 * words; the engine proved the spec's "scalene" census triangle was
 * secretly isosceles with a sweep-invisible mirror and replaced it with
 * an honest scalene witness); 5.4 'Dilations, Scale Factors and Similarity
 * Re-Read' (geo504 96/96 — 49 + 47, 11,178 words). The master pin set:
 * scripts/pin_check_geo131.py 81/81 (eight first-draft catches fixed
 * in-engine, including the external/internal similitude-centre k-signs).
 *
 * PROVENANCE: ground = the run-131 reference-scan-first pass (v9.2
 * amendment 9): the Common Core HSG-CO standards (thecorestandards.org,
 * G-CO.2-9 fetched verbatim), Illustrative Mathematics Geometry Unit 1
 * 'Constructions and Rigid Transformations' (the transformation-first
 * curriculum's rigid-motion definition), the NCERT class-7 'Symmetry'
 * chapter structure (web-grounded), the sibling geometry chapters 3-4
 * (the congruence criteria and similarity re-read as invariances) — every
 * source in docs/project/SOURCE_LOG.md under the run-131 block.
 * STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure,
 * Illustration, quiz item and exercise below is OUR OWN, engine-pinned in
 * scripts/verify-book5-ch05.ts (which re-runs the verify-first harnesses
 * against THIS file and closes with the CLOSED chapter census).
 */
/* ================================================================== */
/* lesson 5.1 — from docs/research/geo-ch05-wip/part-geo501.ts            */
/* ================================================================== */
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

/* ================================================================== */
/* lesson 5.2 — from docs/research/geo-ch05-wip/part-geo502.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — the emerald/teal    */
/* family, hue-shifted one step off c51's)                              */
/* ------------------------------------------------------------------ */
const c52 = {
  ink: '#115e59', // primary text — deep emerald ink
  mid: '#0f766e', // mid text — teal
  amber: '#d97706', // connectors, ticks, hop arrows
  orange: '#ea580c', // accent — key values, images, verdicts
  red: '#dc2626', // refusal / wrong-order / non-isometry
  green: '#16a34a', // mirrors, axes, structure strokes
  panel: '#d1fae5', // emerald tinted fill
  panel2: '#e0f2fe', // sky tinted fill
  sep: '#a7f3d0', // light separators
  faint: '#6ee7b7', // faint dots, grids
  white: '#ffffff',
  paper: '#f0fdfa',
}
const f52 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

type Pt = [number, number]

/* ------------------------------------------------------------------ */
/* geo52 SVG helpers (plain text only — no $, minus is U+2212)          */
/* ------------------------------------------------------------------ */
const geo52Txt = (
  x: number, y: number, s: string,
  size = 13, color = c52.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f52}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo52Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c52.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo52Dot = (x: number, y: number, color = c52.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo52Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo52Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}" rx="6"/>`

const geo52Ell = (
  cx: number, cy: number, rx: number, ry: number, rot: number,
  fill: string, stroke: string, sw = 2,
): string =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${fill}" fill-opacity="0.9" stroke="${stroke}" stroke-width="${sw}"/>`

const geo52Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo52Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c52.amber, w = 2, dash = '',
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo52Line(x1, y1, x2, y2, color, w, dash) + geo52Head(x2, y2, a, color, 8)
}

const geo52Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo52Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** math-to-screen mapper: y up, so screen y = oy − s·y */
const geo52Map = (ox: number, oy: number, s: number) => (p: Pt): [number, number] =>
  [ox + s * p[0], oy - s * p[1]]

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the composition map: one point through two machines */
/* ------------------------------------------------------------------ */
const geo52ComposeMap = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE COMPOSITION MAP: ONE POINT THROUGH TWO MACHINES', 13, c52.ink, 'middle', '700'))
  p.push(geo52Dot(80, 170, c52.ink, 5))
  p.push(geo52Txt(80, 148, 'P = (3, 1)', 12, c52.ink))
  p.push(geo52Arrow(95, 170, 148, 170, c52.amber, 2.2))
  p.push(geo52Rect(150, 130, 120, 80, c52.panel, 0.8, c52.mid, 2.2))
  p.push(geo52Txt(210, 165, 'T(2, 0)', 13, c52.ink, 'middle', '700'))
  p.push(geo52Txt(210, 187, 'the slide', 11.5, c52.mid))
  p.push(geo52Arrow(272, 170, 325, 170, c52.amber, 2.2))
  p.push(geo52Dot(340, 170, c52.mid, 5))
  p.push(geo52Txt(340, 148, 'T(P) = (5, 1)', 12, c52.mid))
  p.push(geo52Arrow(358, 170, 408, 170, c52.amber, 2.2))
  p.push(geo52Rect(410, 130, 120, 80, c52.panel2, 0.9, c52.green, 2.2))
  p.push(geo52Txt(470, 165, 'F x = 0', 13, c52.ink, 'middle', '700'))
  p.push(geo52Txt(470, 187, 'the mirror', 11.5, c52.green))
  p.push(geo52Arrow(532, 170, 570, 170, c52.amber, 2.2))
  p.push(geo52Dot(586, 170, c52.orange, 5.5))
  p.push(geo52Txt(586, 148, '(−5, 1)', 12, c52.orange, 'middle', '700'))
  p.push(geo52Txt(320, 250, '(S ∘ T)(P) = S(T(P)) : apply the right-hand motion first', 12.5, c52.mid))
  p.push(geo52Txt(320, 276, 'one machine feeds the next — a composition is a machine of machines', 12, c52.mid))
  return geo52Svg(640, 300, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the order-matters pair, side by side                */
/* ------------------------------------------------------------------ */
const geo52OrderPair = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'ORDER MATTERS: THE SAME TWO MACHINES, DIFFERENT DESTINATIONS', 13, c52.ink, 'middle', '700'))
  // panel A: slide first, then flip
  p.push(geo52Txt(170, 120, 'SLIDE FIRST, THEN FLIP', 12.5, c52.ink, 'middle', '700'))
  p.push(geo52Line(170, 150, 170, 280, c52.green, 3))
  p.push(geo52Txt(170, 144, 'mirror x = 0', 11.5, c52.green))
  p.push(geo52Line(30, 252, 310, 252, c52.faint, 1.2, '4 6'))
  p.push(geo52Dot(236, 230, c52.ink, 4.5))
  p.push(geo52Txt(236, 216, 'P (3, 1)', 11.5, c52.ink))
  p.push(geo52Arrow(236, 230, 276, 230, c52.amber, 2.2))
  p.push(geo52Dot(280, 230, c52.mid, 4.5))
  p.push(geo52Txt(280, 216, '(5, 1)', 11.5, c52.mid))
  p.push(geo52Arrow(280, 230, 66, 230, c52.red, 2.2, '7 5'))
  p.push(geo52Dot(60, 230, c52.orange, 5.5))
  p.push(geo52Txt(60, 216, '(−5, 1)', 12, c52.orange, 'middle', '700'))
  p.push(geo52Txt(170, 296, 'lands at (−5, 1)', 12.5, c52.orange, 'middle', '700'))
  // panel B: flip first, then slide
  p.push(geo52Txt(470, 120, 'FLIP FIRST, THEN SLIDE', 12.5, c52.ink, 'middle', '700'))
  p.push(geo52Line(470, 150, 470, 280, c52.green, 3))
  p.push(geo52Txt(470, 144, 'mirror x = 0', 11.5, c52.green))
  p.push(geo52Line(330, 252, 610, 252, c52.faint, 1.2, '4 6'))
  p.push(geo52Dot(536, 230, c52.ink, 4.5))
  p.push(geo52Txt(536, 216, 'P (3, 1)', 11.5, c52.ink))
  p.push(geo52Arrow(536, 230, 408, 230, c52.red, 2.2, '7 5'))
  p.push(geo52Dot(404, 230, c52.mid, 4.5))
  p.push(geo52Txt(404, 216, '(−3, 1)', 11.5, c52.mid))
  p.push(geo52Arrow(404, 230, 444, 230, c52.amber, 2.2))
  p.push(geo52Dot(448, 230, c52.orange, 5.5))
  p.push(geo52Txt(448, 216, '(−1, 1)', 12, c52.orange, 'middle', '700'))
  p.push(geo52Txt(470, 296, 'lands at (−1, 1)', 12.5, c52.green, 'middle', '700'))
  p.push(geo52Txt(320, 326, 'right-hand first: T acts, then S — swap the order and the destination moves', 12, c52.mid))
  return geo52Svg(640, 340, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — parallel mirrors: the double-gap slide              */
/* ------------------------------------------------------------------ */
const geo52ParallelMirrors = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'TWO PARALLEL MIRRORS: THE DOUBLE-GAP SLIDE', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(140, 210, 48)
  p.push(geo52Line(M([1, 0])[0], 60, M([1, 0])[0], 260, c52.green, 3))
  p.push(geo52Line(M([4, 0])[0], 60, M([4, 0])[0], 260, c52.green, 3))
  p.push(geo52Txt(M([1, 0])[0], 50, 'mirror x = 1', 11.5, c52.green))
  p.push(geo52Txt(M([4, 0])[0], 50, 'mirror x = 4', 11.5, c52.green))
  p.push(geo52Line(60, 210, 560, 210, c52.faint, 1.2, '4 6'))
  // witness point (0,0)
  p.push(geo52Dot(M([0, 0])[0], M([0, 0])[1], c52.ink, 4.5))
  p.push(geo52Txt(M([0, 0])[0], M([0, 0])[1] + 24, '(0, 0)', 11.5, c52.ink))
  p.push(geo52Arrow(M([0, 0])[0], M([0, 0])[1], M([2, 0])[0], M([2, 0])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([2, 0])[0], M([2, 0])[1], c52.mid, 4.5))
  p.push(geo52Txt(M([2, 0])[0], M([2, 0])[1] + 24, '(2, 0)', 11.5, c52.mid))
  p.push(geo52Arrow(M([2, 0])[0], M([2, 0])[1], M([6, 0])[0], M([6, 0])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([6, 0])[0], M([6, 0])[1], c52.orange, 5.5))
  p.push(geo52Txt(M([6, 0])[0], M([6, 0])[1] + 24, '(6, 0)', 12, c52.orange, 'middle', '700'))
  // witness point (1,2)
  p.push(geo52Dot(M([1, 2])[0], M([1, 2])[1], c52.ink, 4.5))
  p.push(geo52Txt(M([1, 2])[0], M([1, 2])[1] - 14, '(1, 2)', 11.5, c52.ink))
  p.push(geo52Arrow(M([1, 2])[0], M([1, 2])[1], M([7, 2])[0], M([7, 2])[1], c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(M([7, 2])[0], M([7, 2])[1], c52.orange, 5.5))
  p.push(geo52Txt(M([7, 2])[0], M([7, 2])[1] - 14, '(7, 2)', 12, c52.orange, 'middle', '700'))
  // net slide arrow
  p.push(geo52Arrow(140, 248, M([6, 0])[0], 248, c52.orange, 2.2))
  p.push(geo52Txt(284, 272, 'shift 6 = 2 × gap 3', 12, c52.orange, 'middle', '700'))
  p.push(geo52Txt(320, 296, 'mirror x = 1 acts first, then x = 4: every point slides right by 6', 12, c52.mid))
  return geo52Svg(640, 312, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — crossing mirrors: the double-angle turn             */
/* ------------------------------------------------------------------ */
const geo52IntersectMirrors = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'TWO CROSSING MIRRORS: THE DOUBLE-ANGLE TURN', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(200, 240, 34)
  // mirrors: x-axis (solid) and y = x (dashed)
  p.push(geo52Line(120, M([0, 0])[1], 520, M([0, 0])[1], c52.green, 3))
  p.push(geo52Line(M([-2, -2])[0], M([-2, -2])[1], M([6, 6])[0], M([6, 6])[1], c52.green, 3, '9 6'))
  p.push(geo52Txt(500, M([0, 0])[1] + 20, 'the x-axis mirror', 11.5, c52.green))
  p.push(geo52Txt(390, M([6, 6])[1] + 16, 'mirror y = x', 11.5, c52.green))
  // the turn arc at the origin
  const a0 = Math.atan2(M([2, 5])[1] - M([0, 0])[1], M([2, 5])[0] - M([0, 0])[0])
  const a1 = Math.atan2(M([5, -2])[1] - M([0, 0])[1], M([5, -2])[0] - M([0, 0])[0])
  p.push(geo52Arc(M([0, 0])[0], M([0, 0])[1], 56, a0, a1, c52.orange, 2.2))
  p.push(geo52Txt(276, 222, 'turn 2θ = −90°', 12, c52.orange, 'start', '700'))
  p.push(geo52Dot(M([0, 0])[0], M([0, 0])[1], c52.ink, 4))
  p.push(geo52Txt(160, 268, 'the mirrors meet at the origin', 11.5, c52.green, 'middle'))
  // the point path
  p.push(geo52Dot(M([2, 5])[0], M([2, 5])[1], c52.ink, 4.5))
  p.push(geo52Txt(250, 62, '(2, 5)', 11.5, c52.ink, 'end'))
  p.push(geo52Arrow(M([2, 5])[0], M([2, 5])[1], M([5, 2])[0], M([5, 2])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([5, 2])[0], M([5, 2])[1], c52.mid, 4.5))
  p.push(geo52Txt(392, 168, '(5, 2)', 11.5, c52.mid, 'start'))
  p.push(geo52Arrow(M([5, 2])[0], M([5, 2])[1], M([5, -2])[0], M([5, -2])[1], c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(M([5, -2])[0], M([5, -2])[1], c52.orange, 5.5))
  p.push(geo52Txt(392, 312, '(5, −2)', 12, c52.orange, 'start', '700'))
  p.push(geo52Txt(320, 346, 'y = x first, then the x-axis: net turn 2 × 45° clockwise — (x, y) → (y, −x)', 12, c52.mid))
  return geo52Svg(640, 360, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F5 — the double mirror is the identity                   */
/* ------------------------------------------------------------------ */
const geo52DoubleIdentity = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 32, 'THE DOUBLE MIRROR: F THEN F AGAIN IS THE IDENTITY', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(120, 150, 30)
  p.push(geo52Line(60, 150, 580, 150, c52.green, 3))
  p.push(geo52Txt(600, 154, 'y = 0', 11.5, c52.green, 'end'))
  // witness (3,2) round trip
  p.push(geo52Dot(M([3, 2])[0], M([3, 2])[1], c52.ink, 4.5))
  p.push(geo52Txt(M([3, 2])[0], M([3, 2])[1] - 16, '(3, 2)', 11.5, c52.ink))
  p.push(geo52Arrow(M([3, 2])[0] - 6, M([3, 2])[1], M([3, -2])[0] - 6, M([3, -2])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([3, -2])[0], M([3, -2])[1], c52.mid, 4.5))
  p.push(geo52Txt(M([3, -2])[0], M([3, -2])[1] + 26, '(3, −2)', 11.5, c52.mid))
  p.push(geo52Arrow(M([3, -2])[0] + 6, M([3, -2])[1], M([3, 2])[0] + 6, M([3, 2])[1], c52.green, 2.2, '7 5'))
  // witness (5,1)
  p.push(geo52Dot(M([5, 1])[0], M([5, 1])[1], c52.ink, 4))
  p.push(geo52Arrow(M([5, 1])[0] + 8, M([5, 1])[1], M([5, -1])[0] + 8, M([5, -1])[1], c52.amber, 1.8, '5 4'))
  p.push(geo52Dot(M([5, -1])[0], M([5, -1])[1], c52.mid, 4))
  p.push(geo52Arrow(M([5, -1])[0] + 16, M([5, -1])[1], M([5, 1])[0] + 16, M([5, 1])[1], c52.green, 1.8, '5 4'))
  p.push(geo52Txt(M([5, 1])[0] + 22, M([5, 1])[1] - 8, '(5, 1)', 11.5, c52.ink, 'start'))
  p.push(geo52Txt(320, 236, 'every point comes home: (3, 2) → (3, −2) → (3, 2) — the mirror is its own undo', 12, c52.mid))
  return geo52Svg(640, 256, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F6 — footprints: the true glide                         */
/* ------------------------------------------------------------------ */
const geo52Footprints = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'FOOTPRINTS: MIRROR + SLIDE ALONG THE MIRROR = THE GLIDE', 13, c52.ink, 'middle', '700'))
  p.push(geo52Line(50, 170, 590, 170, c52.green, 3))
  p.push(geo52Txt(596, 174, 'the glide axis', 11.5, c52.green, 'end'))
  const xs = [90, 170, 250, 330, 410, 490]
  xs.forEach((x, i) => {
    const above = i % 2 === 0
    const y = above ? 150 : 190
    p.push(geo52Ell(x, y, 18, 8, above ? -12 : 12, above ? c52.sep : c52.panel, above ? c52.amber : c52.mid, 2))
    p.push(geo52Txt(x, above ? 130 : 216, String(i + 1), 11, c52.ink))
  })
  p.push(geo52Txt(320, 246, 'each step: slide (2, 0) along the axis, alternating sides of it', 12, c52.amber))
  p.push(geo52Txt(320, 268, 'the print lands on the OPPOSITE side, one slide along: that is the whole glide', 12, c52.mid))
  return geo52Svg(640, 284, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F7 — the pinned perpendicular slide collapses           */
/* ------------------------------------------------------------------ */
const geo52PerpSlide = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'A SLIDE PERPENDICULAR TO THE MIRROR IS NOT A GLIDE', 13, c52.ink, 'middle', '700'))
  p.push(geo52Line(60, 178, 440, 178, c52.green, 3))
  p.push(geo52Txt(250, 166, 'the collapsed mirror y = 1.5', 11.5, c52.green))
  p.push(geo52Dot(302, 178, c52.green, 3.5))
  p.push(geo52Dot(158, 178, c52.green, 3.5))
  p.push(geo52Line(60, 250, 440, 250, c52.amber, 2.4, '8 6'))
  p.push(geo52Txt(250, 272, 'the original mirror y = 0', 11.5, c52.amber))
  // point A: (4,1) -> mirror -> (4,-1) -> slide -> (4,2)
  p.push(geo52Dot(302, 202, c52.ink, 4.5))
  p.push(geo52Txt(322, 206, '(4, 1)', 11.5, c52.ink, 'start'))
  p.push(geo52Arrow(302, 202, 302, 294, c52.amber, 2.2))
  p.push(geo52Dot(302, 298, c52.mid, 4))
  p.push(geo52Txt(322, 302, '(4, −1)', 11.5, c52.mid, 'start'))
  p.push(geo52Arrow(302, 298, 302, 160, c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(302, 154, c52.orange, 5.5))
  p.push(geo52Txt(322, 150, '(4, 2)', 12, c52.orange, 'start', '700'))
  // point B: (1,0) on the mirror, slides to (1,3)
  p.push(geo52Dot(158, 250, c52.ink, 4.5))
  p.push(geo52Txt(138, 254, '(1, 0)', 11.5, c52.ink, 'end'))
  p.push(geo52Arrow(158, 250, 158, 112, c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(158, 106, c52.orange, 5.5))
  p.push(geo52Txt(138, 110, '(1, 3)', 12, c52.orange, 'end', '700'))
  p.push(geo52Txt(320, 334, 'mirror y = 0 + slide (0, 3) = the single reflection in y = 1.5', 12.5, c52.mid))
  p.push(geo52Txt(320, 356, 'the slide must run ALONG the mirror, or the pair collapses', 12, c52.mid))
  return geo52Svg(640, 372, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F8 — the parity tree of compositions                    */
/* ------------------------------------------------------------------ */
const geo52ParityTree = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE PARITY TREE: COUNT THE MIRRORS, NAME THE MOTION', 13, c52.ink, 'middle', '700'))
  p.push(geo52Rect(230, 44, 180, 40, c52.panel, 0.8, c52.ink, 2.2))
  p.push(geo52Txt(320, 68, 'count the mirrors', 12.5, c52.ink, 'middle', '700'))
  p.push(geo52Line(320, 84, 320, 100, c52.ink, 1.6))
  p.push(geo52Line(160, 100, 480, 100, c52.ink, 1.6))
  p.push(geo52Line(160, 100, 160, 120, c52.green, 1.6))
  p.push(geo52Line(480, 100, 480, 120, c52.red, 1.6))
  p.push(geo52Rect(50, 120, 220, 36, c52.panel, 0.7, c52.green, 2.2))
  p.push(geo52Txt(160, 143, 'EVEN — orientation kept', 12, c52.green, 'middle', '700'))
  p.push(geo52Rect(370, 120, 220, 36, c52.panel2, 0.9, c52.red, 2.2))
  p.push(geo52Txt(480, 143, 'ODD — orientation reversed', 12, c52.red, 'middle', '700'))
  const box = (x: number, y: number, head: string, sub: string, stroke: string): void => {
    p.push(geo52Rect(x, y, 240, 54, c52.paper, 0.9, stroke, 1.8))
    p.push(geo52Txt(x + 120, y + 22, head, 12, c52.ink, 'middle', '700'))
    p.push(geo52Txt(x + 120, y + 41, sub, 11.5, c52.mid))
  }
  box(40, 176, '0 mirrors', 'the identity motion', c52.green)
  box(40, 240, '2 parallel mirrors', 'translation: shift 2 × gap', c52.green)
  box(40, 304, '2 crossing mirrors', 'rotation: turn 2θ', c52.green)
  box(360, 176, '1 mirror', 'reflection', c52.red)
  box(360, 240, '1 mirror + slide along it', 'glide reflection', c52.red)
  box(360, 304, '3 parallel mirrors', 'one reflection (the collapse)', c52.red)
  p.push(geo52Line(160, 156, 160, 176, c52.green, 1.6))
  p.push(geo52Line(160, 230, 160, 240, c52.green, 1.6))
  p.push(geo52Line(160, 294, 160, 304, c52.green, 1.6))
  p.push(geo52Line(480, 156, 480, 176, c52.red, 1.6))
  p.push(geo52Line(480, 230, 480, 240, c52.red, 1.6))
  p.push(geo52Line(480, 294, 480, 304, c52.red, 1.6))
  p.push(geo52Txt(320, 396, 'the parity of the mirror count decides the family — the census of Section 5', 12, c52.mid))
  return geo52Svg(640, 412, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F9 — the sandwich collapse on the witness triangle      */
/* ------------------------------------------------------------------ */
const geo52Sandwich = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE SANDWICH: TRIANGLE BETWEEN TWO PARALLEL MIRRORS', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(160, 300, 28)
  p.push(geo52Line(90, M([0, 0])[1], 420, M([0, 0])[1], c52.green, 3))
  p.push(geo52Txt(100, M([0, 0])[1] + 20, 'mirror y = 0', 11.5, c52.green, 'start'))
  p.push(geo52Line(90, M([0, 2])[1], 420, M([0, 2])[1], c52.green, 3))
  p.push(geo52Txt(100, M([0, 2])[1] - 8, 'mirror y = 2', 11.5, c52.green, 'start'))
  // faint intermediate (after mirror y = 0)
  p.push(geo52Poly([M([1, -3]), M([0, 0]), M([4, 0])], c52.white, 0.6, c52.faint, 2, '6 5'))
  p.push(geo52Txt(M([1, -3])[0], M([1, -3])[1] + 20, '(1, −3)', 11.5, c52.mid))
  // original triangle
  p.push(geo52Poly([M([1, 3]), M([0, 0]), M([4, 0])], c52.panel, 0.45, c52.ink, 2.4))
  p.push(geo52Txt(M([0, 0])[0], M([0, 0])[1] + 20, '(0, 0)', 11.5, c52.ink))
  p.push(geo52Txt(M([4, 0])[0], M([4, 0])[1] + 20, '(4, 0)', 11.5, c52.ink))
  p.push(geo52Txt(M([1, 3])[0], M([1, 3])[1] - 12, '(1, 3)', 11.5, c52.ink))
  // final image
  p.push(geo52Poly([M([1, 7]), M([0, 4]), M([4, 4])], c52.panel2, 0.6, c52.orange, 2.4))
  p.push(geo52Txt(146, 182, '(0, 4)', 11.5, c52.orange, 'end'))
  p.push(geo52Txt(286, 182, '(4, 4)', 11.5, c52.orange, 'start'))
  p.push(geo52Txt(M([1, 7])[0], M([1, 7])[1] - 12, '(1, 7)', 12, c52.orange, 'middle', '700'))
  // side labels on the image
  p.push(geo52Txt(216, 200, '4', 11.5, c52.amber))
  p.push(geo52Txt(238, 144, '√18 ≈ 4.24', 11.5, c52.amber, 'start'))
  p.push(geo52Txt(166, 144, '√10 ≈ 3.16', 11.5, c52.amber, 'end'))
  // net slide arrow
  p.push(geo52Arrow(146, 296, 146, 194, c52.orange, 2.2))
  p.push(geo52Txt(120, 246, 'shift 4', 11.5, c52.orange, 'end'))
  p.push(geo52Txt(320, 416, 'y = 0 first, then y = 2: up 4 = 2 × gap 2, every side length intact', 12, c52.mid))
  return geo52Svg(640, 430, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F10 — the congruence-by-motion witness                  */
/* ------------------------------------------------------------------ */
const geo52CongruenceWitness = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'CONGRUENCE BY MOTION: ONE SLIDE CARRIES THE TRIANGLE OVER', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(70, 310, 26)
  p.push(geo52Poly([M([4, 3]), M([0, 0]), M([4, 0])], c52.panel, 0.45, c52.ink, 2.4))
  p.push(geo52Txt(70, 330, 'A (0, 0)', 11.5, c52.ink))
  p.push(geo52Txt(174, 330, 'B (4, 0)', 11.5, c52.ink))
  p.push(geo52Txt(192, 224, 'C (4, 3)', 11.5, c52.ink, 'start'))
  p.push(geo52Poly([M([10, 8]), M([6, 5]), M([10, 5])], c52.panel2, 0.6, c52.orange, 2.4))
  p.push(geo52Txt(226, 166, 'A′ (6, 5)', 11.5, c52.orange))
  p.push(geo52Txt(330, 196, 'B′ (10, 5)', 11.5, c52.orange))
  p.push(geo52Txt(348, 96, 'C′ (10, 8)', 11.5, c52.orange, 'start'))
  p.push(geo52Arrow(M([0, 0])[0], M([0, 0])[1], M([6, 5])[0], M([6, 5])[1], c52.amber, 2, '7 5'))
  p.push(geo52Arrow(M([4, 0])[0], M([4, 0])[1], M([10, 5])[0], M([10, 5])[1], c52.amber, 2, '7 5'))
  p.push(geo52Arrow(M([4, 3])[0], M([4, 3])[1], M([10, 8])[0], M([10, 8])[1], c52.amber, 2, '7 5'))
  p.push(geo52Rect(420, 60, 200, 240, c52.paper, 0.95, c52.sep, 2))
  p.push(geo52Txt(520, 88, 'DISTANCE MATRIX', 12, c52.ink, 'middle', '700'))
  p.push(geo52Txt(520, 116, 'AB = 4 = A′B′', 12, c52.mid))
  p.push(geo52Txt(520, 140, 'BC = 3 = B′C′', 12, c52.mid))
  p.push(geo52Txt(520, 164, 'CA = 5 = C′A′', 12, c52.mid))
  p.push(geo52Txt(520, 196, 'same matrix,', 12, c52.ink))
  p.push(geo52Txt(520, 216, 'same shape, same size', 12, c52.ink))
  p.push(geo52Txt(520, 248, 'CONGRUENT', 12.5, c52.green, 'middle', '700'))
  p.push(geo52Txt(520, 272, 'via the slide T(6, 5)', 11.5, c52.mid))
  p.push(geo52Txt(320, 344, 'T(6, 5) maps all three vertices onto their partners, exactly', 12, c52.mid))
  return geo52Svg(640, 360, aria, p)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F11 — the honest non-isometry: dilation k = 2           */
/* ------------------------------------------------------------------ */
const geo52NonIsometry = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE HONEST NON-ISOMETRY: DILATION k = 2', 13, c52.ink, 'middle', '700'))
  p.push(geo52Line(60, 180, 400, 180, c52.faint, 1.2))
  for (let i = 0; i <= 6; i++) {
    p.push(geo52Line(110 + i * 44, 176, 110 + i * 44, 184, c52.mid, 1.4))
    p.push(geo52Txt(110 + i * 44, 202, String(i), 11, c52.mid))
  }
  p.push(geo52Line(110, 180, 242, 180, c52.ink, 5))
  p.push(geo52Dot(110, 180, c52.ink, 4.5))
  p.push(geo52Dot(242, 180, c52.ink, 4.5))
  p.push(geo52Txt(176, 160, 'length 3', 12, c52.ink, 'middle', '700'))
  p.push(geo52Line(110, 150, 374, 150, c52.orange, 5, '10 7'))
  p.push(geo52Dot(374, 150, c52.orange, 4.5))
  p.push(geo52Txt(242, 132, 'length 6', 12, c52.orange, 'middle', '700'))
  p.push(geo52Arrow(242, 222, 374, 222, c52.orange, 2))
  p.push(geo52Txt(308, 244, 'dilation k = 2 about the origin', 11.5, c52.orange))
  p.push(geo52Txt(320, 268, 'NOT an isometry: every distance doubles — the doorstep to Lesson 5.4', 12.5, c52.red, 'middle', '700'))
  return geo52Svg(640, 284, aria, p)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the two-mirror trace (Exercise 3)              */
/* ------------------------------------------------------------------ */
const geo52TwoMirrorTrace = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE TWO-MIRROR TRACE: x = 0 THEN x = 3', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(190, 190, 34)
  p.push(geo52Line(M([0, 0])[0], 70, M([0, 0])[0], 280, c52.green, 3))
  p.push(geo52Line(M([3, 0])[0], 70, M([3, 0])[0], 280, c52.green, 3))
  p.push(geo52Txt(M([0, 0])[0], 60, 'x = 0', 11.5, c52.green))
  p.push(geo52Txt(M([3, 0])[0], 60, 'x = 3', 11.5, c52.green))
  p.push(geo52Dot(M([1, 2])[0], M([1, 2])[1], c52.ink, 4.5))
  p.push(geo52Txt(M([1, 2])[0], M([1, 2])[1] - 14, '(1, 2)', 11.5, c52.ink))
  p.push(geo52Arrow(M([1, 2])[0], M([1, 2])[1], M([-1, 2])[0], M([-1, 2])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([-1, 2])[0], M([-1, 2])[1], c52.mid, 4.5))
  p.push(geo52Txt(M([-1, 2])[0], M([-1, 2])[1] - 14, '(−1, 2)', 11.5, c52.mid))
  p.push(geo52Arrow(M([-1, 2])[0], M([-1, 2])[1], M([7, 2])[0], M([7, 2])[1], c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(M([7, 2])[0], M([7, 2])[1], c52.orange, 5.5))
  p.push(geo52Txt(M([7, 2])[0], M([7, 2])[1] - 14, '(7, 2)', 12, c52.orange, 'middle', '700'))
  p.push(geo52Dot(M([4, -1])[0], M([4, -1])[1], c52.ink, 4.5))
  p.push(geo52Txt(M([4, -1])[0], M([4, -1])[1] + 22, '(4, −1)', 11.5, c52.ink))
  p.push(geo52Arrow(M([4, -1])[0], M([4, -1])[1], M([-4, -1])[0], M([-4, -1])[1], c52.amber, 2.2))
  p.push(geo52Dot(M([-4, -1])[0], M([-4, -1])[1], c52.mid, 4.5))
  p.push(geo52Txt(M([-4, -1])[0], M([-4, -1])[1] + 22, '(−4, −1)', 11.5, c52.mid))
  p.push(geo52Arrow(M([-4, -1])[0], M([-4, -1])[1], M([10, -1])[0], M([10, -1])[1], c52.amber, 2.2, '7 5'))
  p.push(geo52Dot(M([10, -1])[0], M([10, -1])[1], c52.orange, 5.5))
  p.push(geo52Txt(M([10, -1])[0], M([10, -1])[1] + 22, '(10, −1)', 12, c52.orange, 'middle', '700'))
  p.push(geo52Arrow(M([1, 2])[0], 140, M([7, 2])[0], 140, c52.orange, 2))
  p.push(geo52Txt(326, 132, 'shift 6', 11.5, c52.orange, 'middle', '700'))
  p.push(geo52Txt(320, 310, 'first x = 0, then x = 3: both points land 6 to the right — T(6, 0)', 12, c52.mid))
  return geo52Svg(640, 326, aria, p)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the glide-axis construction (Exercise 5)       */
/* ------------------------------------------------------------------ */
const geo52GlideAxis = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE GLIDE-AXIS CONSTRUCTION: MIRROR x-AXIS, SLIDE (2, 0) ALONG IT', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(80, 200, 40)
  p.push(geo52Line(40, M([0, 0])[1], 600, M([0, 0])[1], c52.green, 3))
  p.push(geo52Txt(520, M([0, 0])[1] - 12, 'the glide axis y = 0', 11.5, c52.green, 'end'))
  const pair = (a: Pt, b: Pt, la: string, lb: string, laSide: 'start' | 'end' | 'middle', laX: number, laY: number, lbX: number, lbY: number): void => {
    p.push(geo52Dot(M(a)[0], M(a)[1], c52.ink, 4.5))
    if (la.length > 0) p.push(geo52Txt(laX, laY, la, 11.5, c52.ink, laSide))
    p.push(geo52Arrow(M(a)[0], M(a)[1], M(b)[0], M(b)[1], c52.amber, 2, '7 5'))
    p.push(geo52Dot(M(b)[0], M(b)[1], c52.orange, 5))
    p.push(geo52Txt(lbX, lbY, lb, 11.5, c52.orange))
    p.push(geo52Dot((M(a)[0] + M(b)[0]) / 2, (M(a)[1] + M(b)[1]) / 2, c52.green, 3.5))
  }
  pair([4, 1], [6, -1], '(4, 1)', '(6, −1)', 'end', 222, 150, 322, 244)
  pair([1, 0], [3, 0], '', '(3, 0)', 'end', 0, 0, 200, 186)
  pair([0, 3], [2, -3], '(0, 3)', '(2, −3)', 'end', 66, 76, 162, 336)
  p.push(geo52Txt(320, 330, 'every join midpoint lands on the axis: the glide signature', 12, c52.mid))
  return geo52Svg(640, 350, aria, p)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the distance-matrix witness (Exercise 11)      */
/* ------------------------------------------------------------------ */
const geo52MatrixWitness = (aria: string): string => {
  const p: string[] = []
  p.push(geo52Txt(320, 24, 'THE DISTANCE-MATRIX WITNESS FOR EXERCISE 11', 13, c52.ink, 'middle', '700'))
  const M = geo52Map(80, 280, 28)
  p.push(geo52Poly([M([4, 3]), M([0, 0]), M([4, 0])], c52.panel, 0.45, c52.ink, 2.4))
  p.push(geo52Txt(80, 302, 'A(0, 0)', 11.5, c52.ink))
  p.push(geo52Txt(192, 302, 'B(4, 0)', 11.5, c52.ink))
  p.push(geo52Txt(210, 190, 'C(4, 3)', 11.5, c52.ink, 'start'))
  p.push(geo52Poly([M([10, 8]), M([6, 5]), M([10, 5])], c52.panel2, 0.6, c52.orange, 2.4))
  p.push(geo52Txt(248, 126, 'A′(6, 5)', 11.5, c52.orange))
  p.push(geo52Txt(360, 158, 'B′(10, 5)', 11.5, c52.orange))
  p.push(geo52Txt(378, 50, 'C′(10, 8)', 11.5, c52.orange, 'start'))
  p.push(geo52Arrow(M([0, 0])[0], M([0, 0])[1], M([6, 5])[0], M([6, 5])[1], c52.amber, 2, '7 5'))
  p.push(geo52Arrow(M([4, 0])[0], M([4, 0])[1], M([10, 5])[0], M([10, 5])[1], c52.amber, 2, '7 5'))
  p.push(geo52Arrow(M([4, 3])[0], M([4, 3])[1], M([10, 8])[0], M([10, 8])[1], c52.amber, 2, '7 5'))
  p.push(geo52Rect(430, 80, 190, 180, c52.paper, 0.95, c52.sep, 2))
  p.push(geo52Txt(525, 106, 'THE SHARED MATRIX', 12, c52.ink, 'middle', '700'))
  p.push(geo52Txt(525, 134, 'AB = 4 = A′B′', 12, c52.mid))
  p.push(geo52Txt(525, 158, 'BC = 3 = B′C′', 12, c52.mid))
  p.push(geo52Txt(525, 182, 'CA = 5 = C′A′', 12, c52.mid))
  p.push(geo52Txt(525, 212, 'identical, entry by entry', 11.5, c52.mid))
  p.push(geo52Txt(525, 240, 'CONGRUENT', 12.5, c52.green, 'middle', '700'))
  p.push(geo52Txt(320, 326, 'one slide T(6, 5) carries the first triangle onto the second, vertex for vertex', 12, c52.mid))
  return geo52Svg(640, 340, aria, p)
}

/* FIGURES ABOVE — later figures insert before this line */

export const lessonGeo502: Lesson = {
  id: 'geo-composing-transformations-and-the-isometry-idea',
  number: '5.2',
  title: 'Composing Transformations and the Isometry Idea',
  concepts: ['composition of transformations', 'glide reflection', 'isometry', 'parity of reflections', 'double-mirror laws', 'inverse motion', 'congruence by rigid motion', 'fixed points'],
  objectives: [
    'Compute compositions (S ∘ T)(P) = S(T(P)) with the right-hand-first reading, and prove by counterexample that order matters',
    'Derive and apply the double-mirror laws: parallel mirrors give a translation by twice the gap, crossing mirrors give a rotation by twice the angle, identical mirrors give the identity',
    'Recognise and compute glide reflections, and run the parity census that predicts the motion family from the number of mirrors',
    'State the isometry laws (G-CO.6): distances, angles, lines and parallelism survive; compositions of rigid motions are rigid; every rigid motion has a rigid inverse (the undo law)',
    'Re-read congruence (G-CO.7/8) as congruence-by-motion with distance-matrix witnesses, and refute the dilation as an honest non-isometry',
  ],
  prerequisites: ['geo-rigid-motions-slides-flips-and-turns', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
  sources: ['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. composition: the machine of machines                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The composition of motions: the machine of machines' },
    {
      kind: 'para',
      text: 'Lesson 5.1 handed you five machines: the slide, the mirror, the turn, the identity that does nothing, and — quietly, in the exercises — the promise that these were not the whole story. This lesson keeps the promise. The new idea is almost embarrassingly simple to state: you can feed the output of one motion into the input of another. Set the slide $T_{(2,0)}$ running, catch its output, and pass it straight into the mirror $F_{x=0}$. The two machines then behave as ONE machine, with a name and a notation: the composition, written $S \\circ T$ and read “$S$ after $T$”. In symbols the definition is one line: $(S \\circ T)(P) = S(T(P))$ — the point $P$ goes into $T$ first, and whatever comes out goes into $S$.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Composition of transformations (the working definition)',
      text: 'If $S$ and $T$ are transformations of the plane, their composition $S \\circ T$ is the transformation defined by $(S \\circ T)(P) = S(T(P))$ for every point $P$ — apply the right-hand motion $T$ FIRST, then apply the left-hand motion $S$ to the result. The reading convention is the whole content of the notation: function composition acts right-to-left, exactly as $f(g(x))$ applies $g$ before $f$ in algebra. Every machine of Lesson 5.1 can be composed with every other, and the result is always a single transformation of the plane — a machine of machines that can itself be fed into further machines.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the composition map. The point P = (3, 1) enters the slide T(2,0) first, emerging as T(P) = (5, 1); that output enters the mirror F x = 0, emerging as (−5, 1). The pair of machines behaves as one: (S ∘ T)(P) = S(T(P)), right-hand motion first.',
      svg: geo52ComposeMap('A flow diagram: the point P equals (3, 1) passes into a box labelled T of (2, 0) the slide, exits as (5, 1), passes into a box labelled F of x equals 0 the mirror, and exits at (minus 5, 1), with the composition law printed below.'),
    },
    {
      kind: 'para',
      text: 'Why should this one line be worth a whole lesson? Because composition is how the geometry of motions actually gets USED. A robot arm performs a turn followed by a slide; a writer of graphics software applies a flip and then a re-centring; a proof in Chapter 3 chased a triangle through a reflection and then a rotation. In each case the practitioner composes motions and needs to know what the composite does — and, crucially, whether the composite is still trustworthy as a rigid motion. The answer, which this lesson earns section by section, is the isometry idea: rigid motions keep every distance, compositions of rigid motions keep every distance, and every rigid motion can be undone by another rigid motion. Composition, parity and the undo law are the three instruments; the isometry idea is the music they play.',
    },
    {
      kind: 'para',
      text: 'One habit from Lesson 5.1 carries over unchanged and must be restated, because compositions make it MORE important, not less: every motion is a function, and every function has a definite input-then-output order. When we write $F_{x=0} \\circ T_{(2,0)}$, the slide acts first — the right-hand machine is the first act. Students meeting the notation for the first time habitually read left-to-right and get the order backwards; the cure is to say the sentence aloud every time: “$S$ after $T$”. The next section shows that the sentence is not pedantry: swap the order and the destination can genuinely move.',
    },

    /* -------------------------------------------------------------- */
    /* 2. order matters                                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Order matters: the same two machines, different destinations' },
    {
      kind: 'para',
      text: 'Take the two machines from Figure F1 — the slide $T_{(2,0)}$ and the mirror $F_{x=0}$ — and run them on the point $P = (3,1)$ in both possible orders, keeping every intermediate value on the table. SLIDE FIRST, THEN FLIP: $T_{(2,0)}$ carries $(3,1)$ to $(5,1)$, and then the mirror in the $y$-axis flips the sign of the $x$-coordinate: $(5,1) \\to (−5,1)$. FLIP FIRST, THEN SLIDE: the mirror carries $(3,1)$ to $(−3,1)$, and then the slide adds $2$ to the $x$-coordinate: $(−3,1) \\to (−1,1)$. The same point, the same two machines, the same plane — and two different destinations: $(−5,1)$ against $(−1,1)$. The engine behind this lesson computed both journeys before this paragraph was permitted to stand, and the pinned pair $(−5,1)$ and $(−1,1)$ is the lesson\u2019s first certificate that ORDER MATTERS.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the order-matters pair. Left panel: P = (3, 1) slides to (5, 1) and then flips to (−5, 1). Right panel: the same P flips to (−3, 1) and then slides to (−1, 1). Same machines, same starting point, different destinations — composition is not commutative.',
      svg: geo52OrderPair('Two side-by-side panels. Left: the point (3, 1) slides right to (5, 1) then flips across the mirror x equals 0 to (minus 5, 1). Right: the same point flips first to (minus 3, 1) then slides right to (minus 1, 1). Captions read lands at minus 5 comma 1 and lands at minus 1 comma 1.'),
    },
    {
      kind: 'para',
      text: 'There is a beautiful postscript to the counterexample, and it teaches the shape of the whole lesson. Ask what each composition IS, as a single machine. Slide first, then flip: the map $(x,y) \\to (−x−2,\\; y)$ — check it: $(3,1) \\to (−5,1)$ — and that is exactly the single mirror $F_{x=−1}$, since $2(−1) − x = −x − 2$. Flip first, then slide: $(x,y) \\to (−x+2,\\; y)$, which is the single mirror $F_{x=1}$. So the two orders do not merely land in different places — each order collapses into ONE reflection, in DIFFERENT mirrors: $x = −1$ against $x = 1$. A slide perpendicular to a mirror never escapes the mirror family; it just picks which mirror. This collapse is the first appearance of the lesson\u2019s deepest theme: compositions of mirrors condense into simpler motions, and WHICH simpler motion is decided by the geometry of the mirrors involved — parallel or crossing — and by the order.',
    },
    {
      kind: 'para',
      text: 'Contrast, for calibration, the two cases where order does NOT matter. Translations compose freely: $T_{(2,0)} \\circ T_{(0,3)}$ and $T_{(0,3)} \\circ T_{(2,0)}$ both equal $T_{(2,3)}$ — the slide family is one commutative clan, because adding vectors does not care which is added first. And a slide ALONG a mirror commutes with that mirror: slide $(2,0)$ then reflect in the $x$-axis agrees with reflect then slide, point for point (the engine swept the agreement over a grid). The failures begin exactly when the slide is PERPENDICULAR to the mirror — as in the pinned pair — or when two mirrors cross at an angle. Keep this calibration in mind: it is the same distinction, dressed in new clothes, that separates the honest glide from the collapsed pair in Section 4.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The reading-direction trap',
      text: 'The single most common error in this topic is reading $S \\circ T$ left-to-right and applying $S$ first. The pinned cost of the error is concrete: on $P = (3,1)$, applying $T_{(2,0)}$ first lands at $(−5,1)$; applying $F_{x=0}$ first lands at $(−1,1)$ — a gap of four units, entirely manufactured by the reading direction. In exam answers, write the sentence as well as the symbols: “slide first, then mirror”. The notation $(S \\circ T)(P) = S(T(P))$ is written from the inside out on purpose: the inner machine touches $P$ first.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the mirror machines compose                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The mirror machines compose: two mirrors make a slide or a turn' },
    {
      kind: 'para',
      text: 'Now the heart of the lesson. Put TWO mirrors into the composition machine and watch what comes out. The answer depends on exactly one geometric question: do the mirrors cross, or are they parallel? Two mirrors in PARALLEL lines produce a TRANSLATION — a pure slide, with no flipping left in it. Two mirrors CROSSING at an angle $\\theta$ produce a ROTATION about the crossing point, through the double angle $2\\theta$. And two mirrors in the SAME line produce the identity — the second flip undoes the first. These are the double-mirror laws, and they are the load-bearing beams of the entire theory of rigid motions, because of a theorem we will state at the end of this section: EVERY rigid motion, however complicated it looks, is a composition of mirrors. Whoever owns the double-mirror laws owns every motion in the plane.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the parallel-mirror machine. The mirrors x = 1 and x = 4 stand three units apart. The point (0, 0) bounces to (2, 0) off the first mirror and lands at (6, 0) off the second; the point (1, 2), sitting on the first mirror, simply slides to (7, 2). The net motion is the translation T(6,0): a shift of twice the gap, 2 × 3 = 6.',
      svg: geo52ParallelMirrors('Two vertical green mirror lines at x = 1 and x = 4. The point (0, 0) hops to (2, 0) and then to (6, 0); the point (1, 2) hops in one dashed sweep to (7, 2). A net arrow beneath is labelled shift 6 equals 2 times gap 3.'),
    },
    {
      kind: 'para',
      text: 'Run the pinned witnesses on the figure and watch the double gap emerge. Mirrors $x = 1$ and $x = 4$, gap $3$, mirror $x = 1$ acting first. The point $(0,0)$ reflects in $x = 1$ to $(2,0)$ — the mirror doubles its distance from the line $x = 1$ — and then reflects in $x = 4$: the point at $x = 2$ is $2$ units left of the second mirror, so it lands $2$ units right, at $x = 6$. Total journey: $(0,0) \\to (6,0)$, a shift of $+6$. The second witness rides shorter: $(1,2)$ sits ON the first mirror, so the first reflection leaves it alone and the second carries it to $(7,2)$ — the same shift $+6$. And the shift is not an accident of these two points: it is $2 \\times 3$, twice the gap between the mirrors, in the direction from the first mirror to the second. The composition of the two reflections is the single translation $T_{(6,0)}$.',
    },
    {
      kind: 'derivation',
      title: 'The parallel-mirror law, proved on coordinates',
      statement: 'Let the mirrors be the vertical lines $x = a$ and $x = b$, with $b > a$, composed right-hand first: $F_{x=b} \\circ F_{x=a}$. The claim: the composition is the translation $T_{(2(b−a),\\,0)}$ — a pure slide by twice the gap, with no mirror flip remaining.',
      steps: [
        {
          label: 'Write each mirror as a coordinate rule',
          formula: 'F_{x=a}:\\; x \\mapsto 2a − x, \\qquad F_{x=b}:\\; x \\mapsto 2b − x',
          explanation: 'Reflection in the vertical line $x = c$ replaces the $x$-coordinate by its mirror image across that line: the point at distance $x − c$ from the line goes to distance $c − x$ on the other side, which is the coordinate $2c − x$. The $y$-coordinate never moves.',
        },
        {
          label: 'Compose, right-hand first',
          formula: 'x \\mapsto 2b − (2a − x) = x + 2(b − a)',
          explanation: 'Feed the first rule into the second: the inner mirror sends $x$ to $2a − x$, and the outer mirror sends that to $2b − (2a − x)$. The minus signs cancel: what remains is $x$ plus twice the gap. The $y$-coordinate is untouched throughout.',
        },
        {
          label: 'Read the result as a machine',
          formula: '(F_{x=b} \\circ F_{x=a})(x, y) = (x + 2(b − a),\\; y) = T_{(2(b − a),\\, 0)}(x, y)',
          explanation: 'This is precisely the slide by the vector $(2(b − a), 0)$ — Lesson 5.1\u2019s translation, no mirror in sight. Two orientation-reversing machines composed give an orientation-KEEPING machine: flip the flip and the flipping cancels.',
        },
        {
          label: 'Witness the pinned numbers',
          explanation: 'With $a = 1$, $b = 4$: the gap is $3$ and the shift is $2 \\times 3 = 6$, so the composition is $T_{(6,0)}$ — matching the figure: $(0,0) \\to (6,0)$ and $(1,2) \\to (7,2)$. The engine also swept the formula over gaps $1$ through $5$ and over a grid of points; the shift was $2 \\times$ gap every time, with no exceptions.',
        },
      ],
      result: 'Two mirrors in parallel lines compose to the translation by twice the gap, in the direction from the first mirror to the second: $F_{x=b} \\circ F_{x=a} = T_{(2(b−a),\\,0)}$. The flip cancels; only the double gap survives.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the crossing-mirror machine. The mirrors y = x and the x-axis cross at the origin at 45°. The point (2, 5) reflects to (5, 2) in y = x, then to (5, −2) in the x-axis. The net motion is the rotation through 2 × 45° = 90° clockwise about the origin: the turn (x, y) → (y, −x), the R270 formula of Lesson 5.1.',
      svg: geo52IntersectMirrors('A solid green horizontal mirror for the x-axis and a dashed green diagonal mirror for y = x crossing at the origin. The point (2, 5) reflects to (5, 2) and then to (5, minus 2), with an orange arc at the origin labelled turn 2 theta equals minus 90 degrees.'),
    },
    {
      kind: 'para',
      text: 'The crossing case, on the pinned witness. Mirrors $y = x$ and the $x$-axis, crossing at the origin at $45^\\circ$, with $y = x$ acting first. The point $(2,5)$ reflects in $y = x$ — the mirror that swaps coordinates — to $(5,2)$, and then reflects in the $x$-axis, which flips the sign of the $y$-coordinate: $(5,2) \\to (5,−2)$. Now hold $(5,−2)$ up against Lesson 5.1\u2019s rotation catalogue: the quarter turn clockwise about the origin is exactly the map $(x,y) \\to (y,−x)$ — the $R_{270}$ counter-clockwise formula — and $(2,5) \\to (5,−2)$ fits it perfectly. So the composition of the two mirrors is the rotation $R_{−90}$ about the origin: no flipping remains, the crossing point never moved (it sits on BOTH mirrors, so both reflections leave it fixed), and the turn angle is $2 \\times 45^\\circ = 90^\\circ$, taken from the first mirror toward the second — here, clockwise, hence the minus sign. The engine verified the same collapse on further witnesses: $(1,4) \\to (4,−1)$ and $(−2,5) \\to (5,2)$, both matching the $(y,−x)$ formula exactly.',
    },
    {
      kind: 'derivation',
      title: 'The crossing-mirror law, witnessed at 45° and stated in general',
      statement: 'Let two mirrors cross at the point $O$ with angle $\\theta$ from the first mirror to the second. The claim: $F_2 \\circ F_1$ is the rotation about $O$ through angle $2\\theta$. The $45^\\circ$ witness is checked by coordinates; the general law is stated here and revisited as an exercise.',
      steps: [
        {
          label: 'The crossing point is fixed',
          explanation: 'The point $O$ lies on both mirror lines, and a reflection fixes every point of its own line — so $O$ survives both reflections untouched. A rigid motion with one fixed point and no flipping left over is a candidate rotation about that point; the census of Section 5 makes this exact.',
        },
        {
          label: 'The 45° witness, by coordinates',
          formula: '(2, 5) \\xrightarrow{F_{y=x}} (5, 2) \\xrightarrow{F_{y=0}} (5, −2) = (y, −x)\\text{ applied to }(2, 5)',
          explanation: 'The composition maps $(2,5)$ to $(5,−2)$, which is exactly the quarter turn clockwise — rotation by $−90^\\circ$. And $−90^\\circ = 2 \\times (−45^\\circ)$: the angle FROM the first mirror ($y = x$, at $45^\\circ$) TO the second (the $x$-axis, at $0^\\circ$) is $−45^\\circ$, and the rotation doubles it.',
        },
        {
          label: 'Why the angle doubles (the picture argument)',
          explanation: 'Reflect a ray making angle $\\alpha$ with the first mirror: it comes out at $−\\alpha$ on the other side. Reflect again in the second mirror, which sits at $\\theta$ from the first: the ray\u2019s angle relative to the second mirror is again reversed. Tracking the arithmetic, the ray\u2019s total swing is $2\\theta$ — each mirror contributes its own angle once, and the composition doubles the geometry of the pair.',
        },
        {
          label: 'State the general law, then test another pair',
          formula: 'F_2 \\circ F_1 = R_{2\\theta}\\text{ about the crossing point}',
          explanation: 'The engine tested the law on a second pair: mirrors $y = x$ and $y = −x$ cross at $90^\\circ$, and the composition maps $(2,5) \\to (−2,−5)$, $(4,1) \\to (−4,−1)$, $(−3,2) \\to (3,−2)$ — exactly the half turn $R_{180}$ about the origin, and $2 \\times 90^\\circ = 180^\\circ$. Two pairs, two angles, one law.',
        },
      ],
      result: 'Two mirrors crossing at angle $\\theta$ compose to the rotation through $2\\theta$ about the crossing point: parallel mirrors slide by twice the gap, crossing mirrors turn by twice the angle. Mirror geometry in, motion geometry out — at double strength.',
    },
    {
      kind: 'figure',
      caption: 'Figure F5 — the double mirror is the identity. The point (3, 2) reflects in the x-axis to (3, −2) and reflects back to (3, 2); the point (5, 1) does the same round trip. The second flip undoes the first: F ∘ F is the identity motion, the motion that moves nothing.',
      svg: geo52DoubleIdentity('A horizontal green mirror line y = 0. The point (3, 2) shows a down arrow to (3, minus 2) and a dashed up arrow back to (3, 2); the point (5, 1) shows the same smaller round trip. Caption: every point comes home.'),
    },
    {
      kind: 'para',
      text: 'The third double-mirror law needs no computation at all, only a sentence: every reflection is its own undo. Reflect $(3,2)$ in the $x$-axis and you land at $(3,−2)$; reflect again and the mirror, being the same line, carries you back — $(3,−2) \\to (3,2)$. The composition $F \\circ F$ is the identity motion, the machine that fixes every point in the plane. The engine confirmed the round trip on six different mirrors and twenty-five points each — one hundred and fifty homecomings, no exceptions. This law looks like a curiosity and is in fact the seed of the parity census: mirrors COME IN PAIRS THAT CANCEL, so what survives a chain of mirrors is decided by how many are left over — even or odd. That census is Section 5.',
    },
    {
      kind: 'list',
      marker: 'decimal',
      items: [
        'The PARALLEL law: mirrors in parallel lines, gap $d$, compose to the translation by $2d$ in the direction from the first mirror to the second — the pinned witness: $x = 1$, $x = 4$, shift $6$, $(0,0) \\to (6,0)$.',
        'The CROSSING law: mirrors crossing at angle $\\theta$ compose to the rotation by $2\\theta$ about the crossing point — the pinned witness: $y = x$ then the $x$-axis, $(2,5) \\to (5,−2) = R_{−90}$.',
        'The IDENTITY law: two reflections in the SAME line compose to the identity — the pinned witness: $(3,2) \\to (3,−2) \\to (3,2)$ through the $x$-axis mirror.',
      ],
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The mirror-machine theorem (stated, and motivated)',
      text: 'EVERY rigid motion of the plane is a composition of at most three reflections. The proof idea is the SSS criterion of Chapter 3 worn as machinery: take any two points $P$ and $Q$ and their images $P^{\\prime}$ and $Q^{\\prime}$ under the motion; a first mirror can carry $P$ to $P^{\\prime}$; a second, placed on the perpendicular bisector of the images of $Q$, can then carry the travelling image of $Q$ onto $Q^{\\prime}$ without disturbing $P^{\\prime}$; and if a third point still wanders, a third mirror finishes it — the distance bookkeeping (the motion preserves all distances) guarantees the third mirror has nothing left to do. Three mirrors suffice, and one, two or three mirrors produce respectively reflections, the double-mirror laws above, and the three-mirror collapses of Section 5. The full proof belongs to a later course; the SSS-motivated sketch is honest motivation, and every census in this lesson is consistent with it.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the glide reflection                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The glide reflection: mirror plus slide, the fourth family' },
    {
      kind: 'para',
      text: 'Lesson 5.1 named three motion families; the census of Section 5 will show that exactly two more exist, and one of them has been waiting in the exercises all along. It is built from two machines you already own: take a mirror, and a slide PARALLEL to that mirror — a slide ALONG the mirror line — and compose them. The result is called the glide reflection: the point is flipped across the mirror and carried along it in the same breath. Neither half survives alone — the composite is not a reflection (it has no line of fixed points) and not a translation (it reverses orientation) — it is a genuinely new machine, the fourth isometry family, and it is the most human of them all: it is how footprints walk.',
    },
    {
      kind: 'para',
      text: 'But first, the honest audit that shows why the definition insists on ALONG. Consider the composition the other natural way — mirror in the $x$-axis, then slide by $(0,3)$, a slide PERPENDICULAR to the mirror. The engine computed the pinned witnesses: $(4,1) \\to (4,−1) \\to (4,2)$, and $(1,0) \\to (1,0) \\to (1,3)$, since $(1,0)$ sits on the mirror and only slides. Every join from a point to its image has its midpoint on the line $y = 1.5$: the midpoint of $(4,1)$ and $(4,2)$ is $(4,1.5)$, and the midpoint of $(1,0)$ and $(1,3)$ is $(1,1.5)$. And then the collapse: the composed map is $(x,y) \\to (x,\\, 3 − y)$ — which is exactly the single reflection in the horizontal line $y = 1.5$. The perpendicular slide just SHIFTS the mirror to its midline; nothing glides. Figure F7 draws the collapse: the V-shaped journey of $(4,1)$ and the straight ascent of $(1,0)$, both landing as if a single mirror at $y = 1.5$ had done all the work.',
    },
    {
      kind: 'figure',
      caption: 'Figure F7 — the perpendicular slide collapses. Mirror y = 0 then slide (0, 3): the point (4, 1) dips to (4, −1) and rises to (4, 2); the point (1, 0) rises straight to (1, 3). Both joins have midpoints on y = 1.5, and the whole composition is the single reflection in y = 1.5 — not a glide.',
      svg: geo52PerpSlide('The dashed amber original mirror y = 0 and the solid green collapsed mirror y = 1.5. The point (4, 1) drops to (4, minus 1) then rises to (4, 2); the point (1, 0) rises straight to (1, 3). Green midpoint dots sit on the collapsed line, with the verdict that the pair equals one reflection.'),
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The perpendicular-slide trap: a shifted mirror is not a glide',
      text: 'The pinned witness pair — mirror $x$-axis then slide $(0,3)$, sending $(4,1)$ to $(4,2)$ and $(1,0)$ to $(1,3)$ — is NOT a glide reflection, and the engine proves it: the composition equals the single reflection in $y = 1.5$, and a reflection fixes its whole mirror line, while a true glide fixes nothing. The definition of the glide demands the slide run ALONG the mirror. When an exam option offers “reflection plus any translation is a glide”, refuse it: only the component of the slide that runs ALONG the mirror survives as gliding; the perpendicular component silently rebalances the mirror, exactly as $(0,3)$ rebalanced $y = 0$ into $y = 1.5$.',
    },
    {
      kind: 'para',
      text: 'Now the real machine. Let $g$ be the mirror in the $x$-axis composed with the slide $(2,0)$ ALONG that mirror: $g(x,y) = (x+2,\\, −y)$. The engine walked the witnesses: $(4,1) \\to (6,−1)$, $(1,0) \\to (3,0)$, $(0,3) \\to (2,−3)$. Each join from a point to its image has its midpoint on the axis $y = 0$ — the midpoints $(5,0)$, $(2,0)$, $(1,0)$ all sit on the glide axis — but the joins themselves are no longer perpendicular to it, and the machine fixes NOTHING: solving $x + 2 = x$ is impossible, and the engine\u2019s grid sweep found zero fixed points among $441$ candidates. Two signatures together — orientation reversed, no fixed point anywhere — belong to no machine in Lesson 5.1\u2019s catalogue. The glide is genuinely new.',
    },
    {
      kind: 'figure',
      caption: 'Figure F6 — footprints. The true glide g: mirror in the x-axis, slide (2, 0) along it. Consecutive prints land on opposite sides of the glide axis, one slide along: the walk of a left-right-left-right walker. The square of the glide is the pure slide T(4,0) — twice the slide along the axis.',
      svg: geo52Footprints('Six alternating footprint shapes above and below a horizontal green glide axis, numbered 1 to 6, stepping to the right: each print lands on the opposite side of the axis one slide of 2 along it, with the label slide (2, 0) along the axis.'),
    },
    {
      kind: 'para',
      text: 'Why footprints? Walk along a straight path, as almost every walker does: each print lands slightly on the opposite side of the path from the one before, and one stride further along. Left, right, left, right — each print is the mirror image of its neighbour across the path line, shifted along the path. The map carrying one print to the next is precisely a glide reflection: mirror in the path, slide along the path. And the machine\u2019s algebra confirms the picture: applying $g$ twice gives $g(g(x,y)) = (x+4,\\, y)$ — the pure slide $T_{(4,0)}$, twice the stride, with the mirroring cancelled (two flips cancel, exactly as the double-mirror law promised). The engine verified $g \\circ g = T_{(4,0)}$ on witnesses — $(4,1) \\to (8,1)$, $(−2,3) \\to (2,3)$ — and verified that $g$ NEVER returns a point home: $g^n(4,1)$ marches off to infinity for every $n$, so unlike the reflection (order $2$) the glide has infinite order. A walker who repeats the same stride forever never steps on a print twice.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the parity census                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The parity census: count the mirrors, name the motion' },
    {
      kind: 'para',
      text: 'Everything in Sections 3 and 4 now compresses into one classification scheme, and the compression is the payoff of the whole lesson so far. Since every rigid motion is a composition of mirrors (the mirror-machine theorem), classify motions by HOW MANY mirrors compose them — the parity of the mirror count. EVEN numbers of mirrors keep orientation; ODD numbers reverse it — because each mirror flips the plane\u2019s handedness once, and flips cancel in pairs. The signed area makes orientation countable: the witness triangle $(0,0),(4,0),(1,3)$ has signed area $+6$ by the shoelace formula; under any slide or turn it stays $+6$; under any single mirror it flips to $−6$; under the glide it flips to $−6$ as well. One number, one bit — and the bit sorts the whole plane\u2019s motions into two shelves.',
    },
    {
      kind: 'figure',
      caption: 'Figure F8 — the parity tree. Even mirror counts (orientation kept) produce the identity, translations (two parallel mirrors) and rotations (two crossing mirrors). Odd counts (orientation reversed) produce reflections (one mirror), glide reflections (one mirror plus a slide along it) and — by the sandwich collapse — again a single reflection (three parallel mirrors).',
      svg: geo52ParityTree('A tree diagram: a root box labelled count the mirrors branches to an even box, orientation kept, listing the identity, the translation by twice the gap and the rotation by twice the angle; and to an odd box, orientation reversed, listing the reflection, the glide reflection and the three-mirror collapse to one reflection.'),
    },
    {
      kind: 'para',
      text: 'The three-mirror sandwich completes the even-odd bookkeeping with a surprise collapse. Compose three reflections in parallel mirrors — the engine\u2019s witnesses used $x = 0$, then $x = 2$, then $x = 4$, right-hand first. Track the point $(1,0)$: the first mirror sends it to $(−1,0)$, the second to $(5,0)$, the third to $(3,0)$. Track $(3,2)$: $(−3,2) \\to (7,2) \\to (1,2)$. Track $(−1,5)$: $(1,5) \\to (3,5) \\to (5,5)$. In every case the composite agrees with the SINGLE mirror $x = 2$ — the engine swept twenty-seven triples of mirror positions on grids of points and the collapse held every time, with the surviving mirror sitting at $c − b + a$ when the original mirrors sat at $a$, $b$, $c$. Odd parity cannot escape the mirror family: three parallel mirrors condense into ONE reflection in the sandwich family. The flip from the odd mirror out survives; the paired flips inside cancel into slides that then reconstitute a mirror. That is the parity census at work.',
    },
    {
      kind: 'figure',
      caption: 'Figure F9 — the parallel-mirror sandwich on the witness triangle. Mirrors y = 0 then y = 2 carry the triangle (0, 0), (4, 0), (1, 3) through the faint intermediate (with vertex (1, −3)) up to (0, 4), (4, 4), (1, 7): a pure slide of 4 = 2 × gap 2, and all three side lengths — 4, √18 ≈ 4.24, √10 ≈ 3.16 — ride along unchanged, the isometry witness.',
      svg: geo52Sandwich('Two horizontal green mirrors y = 0 and y = 2. The ink triangle with vertices (0, 0), (4, 0) and (1, 3) sits below; a faint dashed intermediate shows the flipped vertex (1, minus 3); the orange image triangle with vertices (0, 4), (4, 4) and (1, 7) sits above, with side labels 4, root 18 approx 4.24 and root 10 approx 3.16, and a net arrow labelled shift 4.'),
    },
    {
      kind: 'para',
      text: 'The sandwiched triangle is also the lesson\u2019s first ISOMETRY WITNESS, and worth reading slowly. The original triangle has sides $4$ (the base), $\\sqrt{18} \\approx 4.2426407$ (from $(4,0)$ to $(1,3)$) and $\\sqrt{10} \\approx 3.1622777$ (from $(1,3)$ back to $(0,0)$). The image triangle $(0,4),(4,4),(1,7)$ has sides computed the honest way: base $4$ again, $\\sqrt{(4−1)^2 + (4−7)^2} = \\sqrt{18}$ again, $\\sqrt{1 + 9} = \\sqrt{10}$ again. Every length survived the double reflection — because the double reflection is a translation, and translations preserve every distance (Lesson 5.1\u2019s invariance census). The census below now names all five families and their signatures: what each does to orientation, what each fixes, and which mirror count produces it.',
    },
    {
      kind: 'table',
      caption: 'The parity census — every rigid motion of the plane, sorted by its mirror count',
      head: ['Mirrors', 'Parity', 'Orientation', 'Family', 'Signature'],
      rows: [
        ['0', 'even', 'kept', 'identity', 'fixes every point'],
        ['1', 'odd', 'reversed', 'reflection', 'fixes its mirror line point by point'],
        ['2 parallel', 'even', 'kept', 'translation', 'shift $2 \\times$ gap: $T_{(6,0)}$ for gap 3'],
        ['2 crossing', 'even', 'kept', 'rotation', 'turn $2\\theta$ about the crossing: $R_{−90}$ for $\\theta = 45^\\circ$'],
        ['1 + slide along it', 'odd', 'reversed', 'glide', 'no fixed points; $g^2 = T_{(4,0)}$ for slide $(2,0)$'],
        ['3 parallel', 'odd', 'reversed', 'reflection', 'the sandwich collapses: mirrors at 0, 2, 4 give one mirror $x = 2$'],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Five families, no more',
      text: 'The census is exhaustive: the identity, translations, rotations, reflections and glide reflections are THE five isometry families of the plane — every rigid motion is exactly one of these, decided by parity plus the geometry of the mirrors. The quick diagnostic to memorise: orientation kept and everything fixed — identity; orientation kept and nothing fixed — translation; orientation kept and one point fixed — rotation; orientation reversed and a whole line fixed — reflection; orientation reversed and nothing fixed — glide. Lesson 5.3 will put the census to work on symmetry, where a figure\u2019s symmetries are precisely the isometries that leave it fixed.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the isometry idea (G-CO.6)                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The isometry idea: what rigid motions never change' },
    {
      kind: 'para',
      text: 'Step back from the machinery and name the principle that makes it all trustworthy. An ISOMETRY is a transformation of the plane that preserves every distance: for any two points $P$ and $Q$, the distance from $P$ to $Q$ equals the distance from the image of $P$ to the image of $Q$. The slides, mirrors and turns of Lesson 5.1 are isometries — each was checked against its own invariance census — and the glide of Section 4 is one too, mirror and slide each preserving distance in turn. The standard (G-CO.6) frames it technically: a rigid motion takes lines to lines, rays to rays, angles to angles, and parallel lines to parallel lines, because every one of those objects is BUILT from distances. An angle is two rays hinged at a vertex; a ray is a point plus a distance direction; a line is determined by two points a fixed distance apart. Preserve every distance and there is nothing left to break.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The isometry laws (G-CO.6, composed and inverted)',
      text: 'ONE — the distance law: isometries preserve every distance, hence carry lines to lines, angles to equal angles, and parallel lines to parallel lines. TWO — the composition law: the composition of two isometries is an isometry (two distance-preserving maps in a row still preserve every distance — the engine verified the chain $|S(T(P))\\,S(T(Q))| = |P Q|$ for mixed chains including mirror-after-slide and glide-after-turn). The compositions of rigid motions form a closed family: five families, closed under composition. THREE — the undo law: every isometry has an inverse that is itself an isometry — the counter-slide, the same mirror again, the opposite turn, the counter-glide — so the family is not merely closed but REVERSIBLE. These three laws make the isometries a group in the algebraist\u2019s sense, though the word can wait; the working content is that the plane\u2019s rigid machinery neither leaks nor jams.',
    },
    {
      kind: 'derivation',
      title: 'The undo law, with the shoes-and-socks order',
      statement: 'Every isometry $M$ has an isometry inverse $M^{−1}$ with $M^{−1} \\circ M$ equal to the identity — and when $M$ is itself a composition, the inverse composes the inverses in REVERSE order: $(S \\circ T)^{−1} = T^{−1} \\circ S^{−1}$.',
      steps: [
        {
          label: 'The pure cases',
          explanation: 'Each family carries its own undo: the counter-slide $T_{(−2,0)}$ undoes $T_{(2,0)}$ — the pinned witness runs $(5,1) \\to (7,1) \\to (5,1)$, home exactly; a mirror undoes ITSELF (the double-mirror identity law, the witness $(3,2) \\to (3,−2) \\to (3,2)$); the turn $R_{90}$ is undone by $R_{270}$ (the engine returned twenty-five grid points home through the pair); and the glide\u2019s undo is the glide with the slide reversed: $(x,y) \\to (x − 2, −y)$ walks every witness back.',
        },
        {
          label: 'Why reverse the order when undoing a composition',
          explanation: 'To undo “slide, then flip” you must first undo the flip — the LAST machine acts on the point most recently, so it must be undone FIRST. Undoing in the wrong order would leave the outer machine\u2019s work sitting on top of an unrestored interior.',
        },
        {
          label: 'The pinned pair undone, step by step',
          explanation: 'The order-matters composition $F_{x=0} \\circ T_{(2,0)}$ carries $(3,1)$ to $(−5,1)$. Undo it: the mirror is its own inverse, so apply $F_{x=0}$ — $(−5,1) \\to (5,1)$ — and then the counter-slide $T_{(−2,0)}$ — $(5,1) \\to (3,1)$. Home. The engine checked the full round trip: $T_{(−2,0)} \\circ F_{x=0}$ applied to $(−5,1)$ is $(3,1)$, which is exactly the shoes-and-socks claim $(F \\circ T)^{−1} = T^{−1} \\circ F$ for this pair.',
        },
        {
          label: 'Why the inverse is an isometry',
          explanation: 'The inverse of a distance-preserving map preserves distances too: if $|M(P)\\,M(Q)| = |P Q|$ for all pairs, then applying $M^{−1}$ to the images $M(P), M(Q)$ measures the original distance — the inequality has no room to enter. So the undo law does not merely restore points; it restores them with a machine of the same trustworthy kind.',
        },
      ],
      result: '$(S \\circ T)^{−1} = T^{−1} \\circ S^{−1}$: undo in reverse order, and every undo is itself an isometry. The plane\u2019s rigid motions can always be walked back home, by rigid means.',
    },
    {
      kind: 'formula',
      name: 'The composition law',
      latex: '(S \\circ T)(P) = S(T(P))',
      note: 'Apply the right-hand motion $T$ first, then the left-hand motion $S$. The pinned order-matters pair: on $(3,1)$, slide-then-mirror lands $(−5,1)$ while mirror-then-slide lands $(−1,1)$.',
    },
    {
      kind: 'formula',
      name: 'The double-mirror laws',
      latex: 'F_{x=b} \\circ F_{x=a} = T_{(2(b-a),\\,0)}, \\qquad F_2 \\circ F_1 = R_{2\\theta}, \\qquad F \\circ F = \\mathrm{id}',
      note: 'Parallel mirrors slide by twice the gap (witness: $x=1$, $x=4$, shift $6$); crossing mirrors turn by twice the angle about the crossing (witness: $y=x$ then the $x$-axis, $(2,5) \\to (5,−2)$); identical mirrors cancel to the identity.',
    },
    {
      kind: 'formula',
      name: 'The glide reflection and its square',
      latex: 'g = T_{(s,\\,0)} \\circ F_{y=0}:\\; g(x, y) = (x + s, −y), \\qquad g \\circ g = T_{(2s,\\,0)}',
      note: 'Mirror plus slide ALONG the mirror (witness slide $(2,0)$: $(4,1) \\to (6,−1)$, no fixed points); the square is the pure slide by twice the stride, $T_{(4,0)}$. A perpendicular slide collapses instead: mirror $y=0$ plus slide $(0,3)$ is the single reflection in $y = 1.5$.',
    },
    {
      kind: 'formula',
      name: 'The isometry (invariance) law',
      latex: '|M(P)\\, M(Q)| = |P Q| \\text{ for all } P, Q',
      note: 'Isometries preserve every distance, hence lines, angles and parallelism; compositions of isometries are isometries; every isometry has an isometry inverse. The honest counter-example: the dilation $k=2$ is NOT an isometry — it doubles distances.',
    },
    {
      kind: 'formula',
      name: 'Congruence by rigid motion',
      latex: 'F_1 \\cong F_2 \\iff M(F_1) = F_2 \\text{ for some isometry } M',
      note: 'Two figures are congruent exactly when a rigid motion carries one onto the other (G-CO.7/8). The witness: triangles $(0,0),(4,0),(4,3)$ and $(6,5),(10,5),(10,8)$ share the distance matrix $4, 3, 5$, and $T_{(6,5)}$ carries the first onto the second vertex-for-vertex.',
    },

    /* -------------------------------------------------------------- */
    /* 7. congruence re-read                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Congruence re-read: two figures, one motion' },
    {
      kind: 'para',
      text: 'Chapter 3 defined congruence by the SSS distance screen: two figures are congruent when their corresponding distances match. This lesson can now say the same thing in the language of motion, and the two languages are one. The standard\u2019s definition (G-CO.7/8): two figures are congruent EXACTLY WHEN some rigid-motion sequence carries one onto the other. The equivalence is the mirror-machine theorem in civilian clothes — if a motion carries figure $A$ onto figure $B$, every distance survives, so the distance matrices match (the Chapter 3 screen); conversely, if the distance matrices match, the SSS superposition argument builds a mirror composition that performs the carry. Distance-matching and motion-carrying are two readings of one fact.',
    },
    {
      kind: 'figure',
      caption: 'Figure F10 — the congruence-by-motion witness. The triangle (0, 0), (4, 0), (4, 3) and the triangle (6, 5), (10, 5), (10, 8) carry identical distance matrices — AB = BC-side 4, 3, 5 in both — and the single slide T(6, 5) maps (0, 0) to (6, 5), (4, 0) to (10, 5) and (4, 3) to (10, 8): congruent by motion.',
      svg: geo52CongruenceWitness('Two congruent right triangles, one with vertices (0, 0), (4, 0), (4, 3) and one with vertices (6, 5), (10, 5), (10, 8), joined by dashed amber arrows from each vertex to its partner. A panel lists the shared distance matrix AB = 4, BC = 3, CA = 5 and the verdict CONGRUENT via the slide T(6, 5).'),
    },
    {
      kind: 'para',
      text: 'The pinned witness, audited in full. Triangle one: $A(0,0)$, $B(4,0)$, $C(4,3)$ — distances $AB = 4$, $BC = 3$, $CA = 5$ (a 3-4-5 right triangle, the right angle at $B$). Triangle two: $A^{\\prime}(6,5)$, $B^{\\prime}(10,5)$, $C^{\\prime}(10,8)$ — distances $A^{\\prime}B^{\\prime} = 4$, $B^{\\prime}C^{\\prime} = 3$, $C^{\\prime}A^{\\prime} = 5$: the SAME matrix, entry by entry. And the motion is staring at us: from $(0,0)$ to $(6,5)$, from $(4,0)$ to $(10,5)$, from $(4,3)$ to $(10,8)$ — every image is the original plus $(6,5)$, so the single slide $T_{(6,5)}$ carries the first triangle onto the second, vertex for vertex. One motion, no residual, verdict CONGRUENT. Notice how the Chapter 3 criteria re-read themselves in the new language: SAS, ASA, SSS are not merely screening tests — each is an INVARIANCE CERTIFICATE, a promise that the named sides and angles will survive every rigid motion, because rigid motions preserve exactly the data those criteria name.',
    },
    {
      kind: 'para',
      text: 'And now the honest contrast, because a definition is only as good as what it refuses. The DILATION with scale factor $k = 2$ about the origin sends every point $(x,y)$ to $(2x, 2y)$. It preserves angles, lines and parallelism beautifully — but it does NOT preserve distances, and one witness catches it: the segment from $(0,0)$ to $(3,0)$ has length $3$, and its image runs from $(0,0)$ to $(6,0)$, length $6$. Every distance doubles — the engine verified the witness triangle too: sides $4, 3, 5$ become $8, 6, 10$. So the dilation is NOT an isometry, and congruence-by-motion refuses it — while Chapter 4\u2019s similarity machine, which scales distances by a common factor, will welcome it. Preserving SHAPE is weaker than preserving SIZE, and the dilation sits exactly on the boundary: the honest doorstep to Lesson 5.4.',
    },
    {
      kind: 'figure',
      caption: 'Figure F11 — the honest non-isometry. The dilation k = 2 about the origin carries the segment of length 3 from (0, 0) to (3, 0) onto the segment of length 6 from (0, 0) to (6, 0): every distance doubles, so the dilation is NOT an isometry — the doorstep to Lesson 5.4.',
      svg: geo52NonIsometry('A number line with ticks 0 to 6. A solid ink segment from 0 to 3 labelled length 3, and a dashed orange segment from 0 to 6 labelled length 6, with a dilation arrow labelled k = 2 about the origin and the verdict NOT an isometry: every distance doubles.'),
    },
    {
      kind: 'para',
      text: 'The composition census below collects the lesson\u2019s computed verdicts into one audit sheet — every row a composition the engine re-derived, every image cell a pinned value. Read it as a field guide: two machines in, one simpler machine out, and the parity column explains which shelf each composite lands on.',
    },
    {
      kind: 'table',
      caption: 'The composition census — pinned composites, each engine-recomputed',
      head: ['Composition (right-hand first)', 'Witness input', 'Image', 'The single motion it equals'],
      rows: [
        ['$F_{x=0} \\circ T_{(2,0)}$ — slide, then mirror', '$(3,1)$', '$(−5, 1)$', 'the mirror $x = −1$ (slide perpendicular collapses)'],
        ['$T_{(2,0)} \\circ F_{x=0}$ — mirror, then slide', '$(3,1)$', '$(−1, 1)$', 'the mirror $x = 1$ (same two machines, different mirror)'],
        ['$F_{y=2} \\circ F_{y=0}$ — the parallel sandwich', 'triangle $(0,0),(4,0),(1,3)$', '$(0,4),(4,4),(1,7)$', 'the slide $T_{(0,4)}$'],
        ['$F_{x=4} \\circ F_{x=1}$ — the parallel pair', '$(0,0)$', '$(6,0)$', 'the slide $T_{(6,0)}$, shift $2 \\times$ gap 3'],
        ['$F_{y=0} \\circ F_{y=x}$ — the crossing pair', '$(2,5)$', '$(5,−2)$', 'the turn $R_{−90}$ about the origin'],
        ['$F_{y=0} \\circ F_{y=0}$ — the double mirror', '$(3,2)$', '$(3,2)$', 'the identity'],
        ['dilation $k = 2$ — the honest refusal', '$(3,0)$', '$(6,0)$', 'NOT an isometry — distance doubles'],
      ],
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: name the composite before you compute it',
      text: 'Composition questions reward a three-step discipline. STEP 1 — read the order: the right-hand motion acts first; say it aloud. STEP 2 — classify by parity and geometry: two mirrors? Parallel means a slide of twice the gap, crossing means a turn of twice the angle, identical means nothing; mirror plus an along-slide means glide. STEP 3 — verify on ONE witness point before you commit: run a single point through both machines and check it against the claimed composite. The classic traps, all engine-pinned: reading $S \\circ T$ left-to-right (the $(−5,1)$ versus $(−1,1)$ gap); calling a perpendicular slide a glide (it is the reflection in the midline $y = 1.5$); and assuming every composition of rigid motions is exotic — most collapse to one of the five families, and the census table above is the answer key.',
    },

    /* -------------------------------------------------------------- */
    /* 8. three worked chains (Illustrations)                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Composing transformations in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below run the lesson\u2019s three central computations end to end: a full two-mirror trace with the slide named, a crossing-mirror trace with the turn named, and the congruence audit that joins Chapter 3\u2019s distance screen to this lesson\u2019s motion definition. In all three the discipline is identical: read the order right-hand first, run one witness point through both machines, then name the single motion the pair collapses to.',
    },
    {
      kind: 'example',
      title: 'The two-mirror computation. Mirrors stand at $x = 0$ and $x = 3$, composed right-hand first ($F_{x=3} \\circ F_{x=0}$). Carry the points $(1,2)$ and $(4,−1)$ through both mirrors step by step, name the single motion the pair equals, and verify your answer on both points.',
      steps: [
        'Sol. Read the order aloud: the right-hand mirror $F_{x=0}$ acts first, then the left-hand mirror $F_{x=3}$.',
        'Point $(1,2)$: reflect in $x = 0$ — the mirror doubles the signed distance, so $x \\to 2(0) − 1 = −1$ — landing $(−1,2)$. Reflect in $x = 3$: $x \\to 2(3) − (−1) = 7$, landing $(7,2)$. Net: $(1,2) \\to (7,2)$, a shift of $+6$.',
        'Point $(4,−1)$: reflect in $x = 0$ to $(−4,−1)$, then in $x = 3$: $x \\to 6 − (−4) = 10$, landing $(10,−1)$. Net: $(4,−1) \\to (10,−1)$ — the same shift $+6$.',
        'Name the composite: both points slid $+6$ with no flip surviving, and the gap is $3$, so by the parallel-mirror law the pair equals $T_{(6,0)}$ — the shift is twice the gap, $2 \\times 3 = 6$.',
        'Verify by formula instead of hops: $F_{x=3} \\circ F_{x=0}$ sends $x \\to 6 − (0 − x) = x + 6$ — the slide rule itself, agreeing on both witnesses.',
        'Hence $(1,2) \\to (7,2)$ and $(4,−1) \\to (10,−1)$, and the composition is the single translation $T_{(6,0)}$.',
      ],
    },
    {
      kind: 'example',
      title: 'The crossing-mirror computation. The mirrors $y = x$ and the $x$-axis cross at the origin at $45^\\circ$, composed right-hand first ($F_{y=0} \\circ F_{y=x}$). Carry $(2,5)$ and $(1,4)$ through both mirrors, name the single motion, and confirm the turn angle from the geometry of the mirror pair.',
      steps: [
        'Sol. Read the order: mirror $y = x$ acts first, then the $x$-axis mirror.',
        'Point $(2,5)$: reflect in $y = x$ — that mirror swaps coordinates — landing $(5,2)$. Reflect in the $x$-axis — the $y$-sign flips — landing $(5,−2)$. Net: $(2,5) \\to (5,−2)$.',
        'Point $(1,4)$: $y = x$ swaps to $(4,1)$; the $x$-axis flips to $(4,−1)$. Net: $(1,4) \\to (4,−1)$.',
        'Name the composite: both results match the rule $(x,y) \\to (y,−x)$ — Lesson 5.1\u2019s $R_{270}$ counter-clockwise formula, the quarter turn clockwise about the origin.',
        'Confirm the angle from the geometry: the first mirror sits at $45^\\circ$, the second at $0^\\circ$, so the turn is $2 \\times (0^\\circ − 45^\\circ) = −90^\\circ$ about the crossing point — twice the angle, as the crossing-mirror law demands, and the origin itself (on both mirrors) never moved.',
        'Hence $(2,5) \\to (5,−2)$ and $(1,4) \\to (4,−1)$, and the composition is the single rotation $R_{−90}$ about the origin.',
      ],
    },
    {
      kind: 'example',
      title: 'The congruence audit. Triangle $T_1$ has vertices $(0,0)$, $(4,0)$, $(4,3)$; triangle $T_2$ has vertices $(6,5)$, $(10,5)$, $(10,8)$. Compute both distance matrices, decide congruence by the motion definition, and exhibit the motion that carries $T_1$ onto $T_2$ vertex for vertex.',
      steps: [
        'Sol. Matrix of $T_1$: $AB = \\sqrt{(4−0)^2 + 0^2} = 4$; $BC = \\sqrt{0 + (3−0)^2} = 3$; $CA = \\sqrt{4^2 + 3^2} = 5$.',
        'Matrix of $T_2$: $A^{\\prime}B^{\\prime} = \\sqrt{4^2 + 0} = 4$; $B^{\\prime}C^{\\prime} = \\sqrt{0 + 3^2} = 3$; $C^{\\prime}A^{\\prime} = \\sqrt{4^2 + 3^2} = 5$ — identical, entry by entry: $4, 3, 5$ in both.',
        'Exhibit the motion: compare each vertex with its partner — $(0,0) \\to (6,5)$, $(4,0) \\to (10,5)$, $(4,3) \\to (10,8)$ — every image is original $+\\,(6,5)$, so $T_{(6,5)}$ carries $T_1$ onto $T_2$ vertex for vertex.',
        'Verify the carrier is rigid: a slide preserves every distance (Lesson 5.1\u2019s census), so the matching matrices are no coincidence — they are what the slide guarantees.',
        'Re-read the two definitions: the matching distance matrix is Chapter 3\u2019s SSS screen; the exhibiting motion is this lesson\u2019s G-CO.7 definition — and the mirror-machine theorem says the two readings are one fact.',
        'Hence $T_1 \\cong T_2$ by motion: the single slide $T_{(6,5)}$ does the carrying, with the shared matrix $4, 3, 5$ as the certificate.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. the term census                                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'composition of transformations', def: 'The machine of machines: $(S \\circ T)(P) = S(T(P))$ — the right-hand motion acts first, then the left-hand one. Compositions of isometries are isometries, and most collapse to a single simpler motion.' },
        { term: 'the double-mirror laws', def: 'Two mirrors in parallel lines compose to the translation by twice the gap; two mirrors crossing at $\\theta$ compose to the rotation by $2\\theta$ about the crossing; two mirrors in one line compose to the identity. Witnesses: shift $6$ for gap $3$; $(2,5) \\to (5,−2)$ for the $45^\\circ$ pair.' },
        { term: 'glide reflection', def: 'The fourth isometry family: a mirror composed with a slide ALONG the mirror. Witness $g(x,y) = (x+2, −y)$: no fixed points, orientation reversed, and $g^2 = T_{(4,0)}$ — the square is the pure double stride.' },
        { term: 'the perpendicular-slide collapse', def: 'A slide perpendicular to the mirror is NOT a glide: mirror $y = 0$ then slide $(0,3)$ equals the single reflection in the midline $y = 1.5$ — the pinned witnesses $(4,1) \\to (4,2)$ and $(1,0) \\to (1,3)$ with join midpoints on $y = 1.5$.' },
        { term: 'parity of reflections', def: 'Even numbers of mirrors keep orientation; odd numbers reverse it. The census: 0 mirrors — identity; 1 — reflection; 2 parallel — translation; 2 crossing — rotation; 3 parallel — one reflection (the sandwich collapse).' },
        { term: 'the sandwich collapse', def: 'Three reflections in parallel mirrors at $a$, $b$, $c$ compose to ONE reflection at $c − b + a$: the witnesses at $0, 2, 4$ collapse to the mirror $x = 2$. Odd parity can never escape the mirror family.' },
        { term: 'isometry', def: 'A transformation preserving every distance: $|M(P)\\,M(Q)| = |P Q|$. Isometries carry lines to lines and angles to equal angles; their compositions close and every one has an isometry inverse. The dilation $k = 2$ is the honest non-isometry: length $3$ becomes $6$.' },
        { term: 'the undo law', def: 'Every isometry has an isometry inverse, and compositions undo in reverse order: $(S \\circ T)^{−1} = T^{−1} \\circ S^{−1}$. Witness: the pinned pair lands $(3,1)$ at $(−5,1)$, and mirror-then-counter-slide walks it home.' },
        { term: 'congruence by rigid motion', def: 'Two figures are congruent exactly when a rigid-motion sequence carries one onto the other (G-CO.7/8); matching distance matrices are the certificate. Witness: the triangles with matrices $4, 3, 5$ carried by $T_{(6,5)}$ vertex for vertex.' },
        { term: 'distance matrix', def: 'The list of all pairwise distances of a figure, in a fixed correspondence order — the congruence witness Chapter 3 screened with and this lesson re-reads: identical matrices certify that some rigid motion can do the carrying.' },
        { term: 'fixed point', def: 'A point a motion leaves where it stood. The census signatures: the identity fixes everything; a translation and a glide fix nothing; a rotation fixes exactly its centre; a reflection fixes its whole mirror line.' },
        { term: 'the mirror-machine theorem', def: 'Every rigid motion of the plane is a composition of at most three reflections — motivated by the SSS superposition argument of Chapter 3, and the reason the parity census classifies ALL isometries.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. self-check quiz (key [1,4,2,0,3] — PINNED)                 */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In the composition $(S \\circ T)(P)$, which motion acts first — and does the order matter?',
          options: [
            '$S$ acts first, and the order never matters: composition of motions is commutative',
            '$T$ acts first — the right-hand motion goes first — and the order genuinely matters: on $(3,1)$, slide-then-mirror lands $(−5,1)$ while mirror-then-slide lands $(−1,1)$',
            'both act simultaneously, so the question of order is meaningless',
            'the left-hand motion acts first, always, by the reading convention',
          ],
          answer: 1,
          explain: 'The definition $(S \\circ T)(P) = S(T(P))$ feeds $P$ to the INNER machine first: $T$ acts, then $S$ acts on the result — the right-hand-first reading. Option (a) is refuted by the pinned counterexample: the same two machines land $(3,1)$ at $(−5,1)$ in one order and $(−1,1)$ in the other, four units apart. Option (c) invents simultaneity — motions are functions applied in sequence. Option (d) has the convention backwards, which is precisely the trap: reading left-to-right turns every composition question into a wrong answer.',
        },
        {
          q: 'Two mirrors stand at $x = 1$ and $x = 4$, composed right-hand first. What single motion does the pair equal, and where does $(0,0)$ land?',
          options: [
            'the identity — two mirrors always cancel',
            'a reflection in the midline $x = 2.5$',
            'a rotation about $x = 2.5$',
            'a translation by the gap: a shift of 3, so $(0,0)$ lands at $(3,0)$',
            'a translation by twice the gap — a shift of 6, so $(0,0)$ lands at $(6,0)$',
          ],
          answer: 4,
          explain: 'By the parallel-mirror law the pair is the slide $T_{(6,0)}$: twice the gap $3$, in the direction from the first mirror to the second, and the witness runs $(0,0) \\to (2,0) \\to (6,0)$. Option (a) confuses identical mirrors (which cancel) with parallel ones (which double the gap). Option (b) is the perpendicular-slide collapse — it belongs to mirror-plus-perpendicular-slide, not to two mirrors. Option (c) belongs to crossing mirrors. Option (d) forgets the doubling: one reflection moves a point twice its distance to the mirror, so TWO reflections move it twice the gap, not once.',
        },
        {
          q: 'The mirrors $y = x$ and the $x$-axis cross at the origin at $45^\\circ$, composed with $y = x$ first. The composite is —',
          options: [
            'a translation along the line $y = x$',
            'a reflection in a third mirror through the origin',
            'a rotation about the origin through $2 \\times 45^\\circ = 90^\\circ$ — here the quarter turn clockwise, $(x,y) \\to (y,−x)$',
            'a glide reflection along the axis $y = x$',
            'the identity, since the mirrors meet',
          ],
          answer: 2,
          explain: 'The crossing-mirror law: two mirrors crossing at $\\theta$ compose to the rotation through $2\\theta$ about the crossing point — pinned witness $(2,5) \\to (5,2) \\to (5,−2)$, matching the turn $(x,y) \\to (y,−x)$ exactly. Option (a) belongs to parallel mirrors, and these cross. Option (b) is the three-mirror collapse territory — one mirror composes to a reflection, two to a rotation. Option (d) needs a slide ALONG a mirror; no slide is present. Option (e) confuses meeting with coinciding: only identical mirrors cancel.',
        },
        {
          q: 'Which of these is NOT an isometry of the plane?',
          options: [
            'the dilation $k = 2$ about the origin — it carries the segment $(0,0)$–$(3,0)$ to a segment of length $6$: every distance doubles',
            'the glide reflection with mirror the $x$-axis and slide $(2,0)$ along it',
            'the rotation $R_{90}$ about the origin',
            'the composition $F_{y=2} \\circ F_{y=0}$ of two parallel mirrors',
          ],
          answer: 0,
          explain: 'The dilation doubles every distance — the pinned witness: length $3$ becomes $6$, and the witness triangle\u2019s sides $4, 3, 5$ become $8, 6, 10$ — so it fails the isometry law $|M(P)M(Q)| = |PQ|$. Option (b) preserves every distance: mirror and along-slide each do. Option (c) is a rigid motion of Lesson 5.1. Option (d) is the parallel-mirror slide $T_{(0,4)}$ — the sandwich composite, distances intact. The dilation keeps shape but not size, which is exactly why it waits for the similarity lesson (5.4) rather than this one.',
        },
        {
          q: 'A motion reverses orientation and has NO fixed points anywhere. Which family is it, and what is its parity?',
          options: [
            'a reflection — odd parity, fixing its whole mirror line',
            'a rotation — even parity, one fixed point',
            'a translation — odd parity, no fixed points',
            'a glide reflection — odd parity, orientation-reversing, no fixed points, and its square is a pure translation',
            'the identity — even parity, fixing everything',
          ],
          answer: 3,
          explain: 'Run the census: orientation reversed means odd mirror count, and no fixed point rules out the reflection (which fixes its mirror line) — leaving the glide, witness $g(x,y) = (x+2, −y)$ with zero fixed points on the engine grid and $g^2 = T_{(4,0)}$. Option (a) has the right parity but a whole line of fixed points. Option (b) keeps orientation. Option (c) invents odd parity for a slide — translations keep orientation (signed area stays $+6$ on the witness triangle). Option (e) fixes everything. The diagnostic — parity plus fixed points — names every motion family.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — composing machines, running the census, certifying congruence',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Carry the point $(3,2)$ through the slide $T_{(2,0)}$ and then the mirror in the $x$-axis. Then run the same two machines in the reverse order. Compare the destinations and explain the verdict.',
              solution: [
                'Sol. Order one — slide first, then mirror: $T_{(2,0)}$ sends $(3,2)$ to $(5,2)$; the $x$-axis mirror flips the $y$-sign: $(5,2) \\to (5,−2)$.',
                'Order two — mirror first, then slide: the mirror sends $(3,2)$ to $(3,−2)$; the slide adds $(2,0)$: $(3,−2) \\to (5,−2)$.',
                'Compare: both orders land at $(5,−2)$ — the intermediate points $(5,2)$ and $(3,−2)$ differ, but the destinations agree.',
                'Explain the verdict: the slide $(2,0)$ runs ALONG the mirror line $y = 0$, and a slide parallel to a mirror commutes with it — flipping after sliding along is the same as sliding along after flipping.',
                'Hence both orders land at $(5,−2)$: order is harmless HERE, precisely because the slide is parallel to the mirror — the contrast case is the next exercise.',
              ],
              answer: 'both orders land $(5,−2)$; the slide runs along the mirror, so the machines commute',
            },
            {
              q: 'Carry the point $(2,3)$ through the slide $T_{(3,−2)}$ and then the mirror in the $y$-axis. Then run the reverse order. Compute both destinations and state the lesson of the pair.',
              solution: [
                'Sol. Order one — slide first, then mirror: $T_{(3,−2)}$ sends $(2,3)$ to $(5,1)$; the $y$-axis mirror flips the $x$-sign: $(5,1) \\to (−5,1)$.',
                'Order two — mirror first, then slide: the mirror sends $(2,3)$ to $(−2,3)$; the slide adds $(3,−2)$: $(−2,3) \\to (1,1)$.',
                'Compare: the destinations $(−5,1)$ and $(1,1)$ are different — six units apart in $x$.',
                'State the lesson: this slide is NOT parallel to this mirror — it has a component across it — so the machines do not commute, and the reading convention (right-hand first) decides the destination.',
                'Hence slide-then-mirror lands $(−5,1)$ and mirror-then-slide lands $(1,1)$: order matters whenever the slide crosses the mirror.',
              ],
              answer: 'slide first lands $(−5,1)$; mirror first lands $(1,1)$ — order matters',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Two mirrors stand at $x = 0$ and $x = 3$, composed right-hand first ($F_{x=3} \\circ F_{x=0}$). Trace the points $(1,2)$ and $(4,−1)$ through both mirrors hop by hop, name the single motion the pair equals, and state the shift.',
              solution: [
                'Sol. Trace $(1,2)$: reflect in $x = 0$ — the mirror doubles the signed distance, $x \\to 2(0) − 1 = −1$ — landing $(−1,2)$; then reflect in $x = 3$: $x \\to 2(3) − (−1) = 7$, landing $(7,2)$.',
                'Trace $(4,−1)$: reflect in $x = 0$ to $(−4,−1)$; then in $x = 3$: $x \\to 6 − (−4) = 10$, landing $(10,−1)$.',
                'Read the pattern: both points moved $+6$ in $x$ and kept their $y$ — a pure slide with no flip surviving.',
                'Name the motion: the gap between the mirrors is $3$, so the composite is the translation $T_{(6,0)}$ — twice the gap, in the direction from the first mirror to the second.',
                'Hence $(1,2) \\to (7,2)$ and $(4,−1) \\to (10,−1)$, and $F_{x=3} \\circ F_{x=0} = T_{(6,0)}$.',
              ],
              answer: '$(1,2) \\to (7,2)$, $(4,−1) \\to (10,−1)$; the composite is the slide $T_{(6,0)}$, shift $6$',
              figures: [
                {
                  caption: 'The two-mirror trace for Exercise 3: mirrors x = 0 and x = 3, with (1, 2) hopping to (−1, 2) and then to (7, 2), and (4, −1) hopping to (−4, −1) and then to (10, −1) — both points landing a shift of 6 to the right, the slide T(6,0).',
                  svg: geo52TwoMirrorTrace('Two green vertical mirrors at x = 0 and x = 3. The point (1, 2) hops left to (minus 1, 2) then in a long dashed hop to (7, 2); the point (4, minus 1) hops left to (minus 4, minus 1) then in a long dashed hop to (10, minus 1). A net arrow is labelled shift 6.'),
                },
              ],
            },
            {
              q: 'The mirrors $y = x$ and the $x$-axis are composed right-hand first ($F_{y=0} \\circ F_{y=x}$). Trace $(1,4)$ and $(−2,5)$ through both mirrors, and show that both destinations match the single turn $(x,y) \\to (y,−x)$ about the origin.',
              solution: [
                'Sol. Trace $(1,4)$: mirror $y = x$ swaps coordinates: $(1,4) \\to (4,1)$; the $x$-axis flips the $y$-sign: $(4,1) \\to (4,−1)$.',
                'Trace $(−2,5)$: $y = x$ swaps to $(5,−2)$; the $x$-axis flips to $(5,2)$.',
                'Check against the turn: the rule $(x,y) \\to (y,−x)$ applied to $(1,4)$ gives $(4,−1)$ — match; applied to $(−2,5)$ gives $(5,2)$ — match.',
                'Name the motion: $(y,−x)$ is Lesson 5.1\u2019s $R_{270}$ — the quarter turn clockwise about the origin — and the crossing-mirror law confirms the angle: $2 \\times (0^\\circ − 45^\\circ) = −90^\\circ$, with the origin (on both mirrors) fixed throughout.',
                'Hence $(1,4) \\to (4,−1)$ and $(−2,5) \\to (5,2)$, and the composite is the single rotation $R_{−90}$ about the origin.',
              ],
              answer: '$(1,4) \\to (4,−1)$, $(−2,5) \\to (5,2)$; the composite is the turn $(x,y) \\to (y,−x)$, that is $R_{−90}$ about the origin',
            },
            {
              q: 'The glide $g$ mirrors in the $x$-axis and then slides $(2,0)$ ALONG that mirror, so $g(x,y) = (x+2,−y)$. Apply $g$ to $(4,1)$, $(1,0)$ and $(0,3)$; compute the midpoint of each join from point to image; and use the midpoints to name the glide axis.',
              solution: [
                'Sol. Apply $g$: $(4,1) \\to (6,−1)$; $(1,0) \\to (3,0)$; $(0,3) \\to (2,−3)$.',
                'Midpoints of the joins: from $(4,1)$ to $(6,−1)$ the midpoint is $(5,0)$; from $(1,0)$ to $(3,0)$ it is $(2,0)$; from $(0,3)$ to $(2,−3)$ it is $(1,0)$.',
                'Read the signature: all three midpoints have $y = 0$ — every join-midpoint sits on the line $y = 0$, the mirror line itself, which is therefore the glide axis.',
                'Confirm the glide signature: no point is fixed ($x + 2 = x$ is impossible), orientation is reversed, and the joins are not perpendicular to the axis — the midpoint-on-axis property without perpendicular joins is exactly the glide\u2019s fingerprint.',
                'Hence the images are $(6,−1)$, $(3,0)$, $(2,−3)$; the midpoints $(5,0)$, $(2,0)$, $(1,0)$ all lie on the glide axis $y = 0$.',
              ],
              answer: 'images $(6,−1)$, $(3,0)$, $(2,−3)$; midpoints $(5,0)$, $(2,0)$, $(1,0)$ all on the glide axis $y = 0$',
              figures: [
                {
                  caption: 'The glide-axis construction for Exercise 5: the glide g carries (4, 1) to (6, −1), (1, 0) to (3, 0) and (0, 3) to (2, −3), with every join midpoint — (5, 0), (2, 0), (1, 0) — landing on the glide axis y = 0.',
                  svg: geo52GlideAxis('A green horizontal glide axis y = 0. Dashed amber joins carry (4, 1) to (6, minus 1), (1, 0) to (3, 0) and (0, 3) to (2, minus 3), each join carrying a green midpoint dot on the axis.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The triangle with vertices $(0,0)$, $(4,0)$, $(1,3)$ is reflected in the mirror $y = 0$ and then in the mirror $y = 2$. Compute the image triangle, name the single motion, and verify that all three side lengths survive the journey.',
              solution: [
                'Sol. First mirror $y = 0$ (the $x$-axis): $(0,0) \\to (0,0)$, $(4,0) \\to (4,0)$, $(1,3) \\to (1,−3)$ — the two base vertices sit on the mirror and stay.',
                'Second mirror $y = 2$: each $y$-coordinate reflects across $2$, so $y \\to 4 − y$: $(0,0) \\to (0,4)$, $(4,0) \\to (4,4)$, $(1,−3) \\to (1,7)$. Image triangle: $(0,4)$, $(4,4)$, $(1,7)$.',
                'Name the motion: the mirrors are parallel with gap $2$, so the composite is the slide $T_{(0,4)}$ — twice the gap, upward.',
                'Verify the sides: original — base $4$; from $(4,0)$ to $(1,3)$: $\\sqrt{9 + 9} = \\sqrt{18} \\approx 4.2426$; from $(1,3)$ to $(0,0)$: $\\sqrt{1 + 9} = \\sqrt{10} \\approx 3.1623$. Image — base $4$; from $(4,4)$ to $(1,7)$: $\\sqrt{9 + 9} = \\sqrt{18}$; from $(1,7)$ to $(0,4)$: $\\sqrt{1 + 9} = \\sqrt{10}$ — all three survive.',
                'Hence the image is $(0,4)$, $(4,4)$, $(1,7)$, carried by the single slide $T_{(0,4)}$ with every side length intact — the sandwich is an isometry witness.',
              ],
              answer: 'image $(0,4)$, $(4,4)$, $(1,7)$ via the slide $T_{(0,4)}$; sides $4$, $\\sqrt{18}$, $\\sqrt{10}$ all preserved',
            },
            {
              q: 'The triangle with vertices $(0,0)$, $(4,0)$, $(4,3)$ is carried by $F_{x=0} \\circ T_{(2,0)}$ (slide first) and, separately, by $T_{(2,0)} \\circ F_{x=0}$ (mirror first). Compute both image triangles, confirm each is congruent to the original, and confirm the two images differ.',
              solution: [
                'Sol. Slide first: $T_{(2,0)}$ sends the vertices to $(2,0)$, $(6,0)$, $(6,3)$; the $y$-axis mirror then flips $x$: the image is $(−2,0)$, $(−6,0)$, $(−6,3)$.',
                'Mirror first: $F_{x=0}$ sends the vertices to $(0,0)$, $(−4,0)$, $(−4,3)$; the slide then adds $(2,0)$: the image is $(2,0)$, $(−2,0)$, $(−2,3)$.',
                'Check congruence for image one: its sides are $\\sqrt{(−2+6)^2 + 0} = 4$, $\\sqrt{0 + 9} = 3$ and $\\sqrt{16 + 9} = 5$ — the original\u2019s $4, 3, 5$ exactly, as both carrier machines are rigid.',
                'Check congruence for image two: sides $4$, $3$, $5$ again — congruent to the original as well.',
                'Compare the images: $(−2,0)$ against $(2,0)$ — the two images sit in different places (reflections about $x = −1$ and $x = 1$ respectively), so same shape, different destinations.',
                'Hence both images are congruent to the original with sides $4, 3, 5$, and the two images differ: order matters on a whole triangle, not just a point.',
              ],
              answer: 'slide-first image $(−2,0)$, $(−6,0)$, $(−6,3)$; mirror-first image $(2,0)$, $(−2,0)$, $(−2,3)$; both congruent (sides $4$, $3$, $5$) and different',
            },
            {
              q: 'A mystery motion $M$ sends $(0,0) \\to (4,0)$, $(2,2) \\to (6,−2)$ and $(5,0) \\to (9,0)$. Compute the midpoints of the three joins, test the fixed-point signature, and name $M$\u2019s family with its axis.',
              solution: [
                'Sol. Midpoints: of $(0,0)$ and $(4,0)$: $(2,0)$; of $(2,2)$ and $(6,−2)$: $(4,0)$; of $(5,0)$ and $(9,0)$: $(7,0)$ — all three have $y = 0$.',
                'Test fixed points: solving $M(x,y) = (x+4,−y) = (x,y)$ forces $−y = y$, so $y = 0$, and then $x + 4 = x$ — impossible: $M$ fixes nothing.',
                'Test orientation: the motion flips the $y$-sign like a mirror, so orientation is reversed — the signed area of a witness triangle goes negative under $M$.',
                'Name the family: orientation reversed plus zero fixed points plus midpoints on one line is the glide signature; the line $y = 0$ is the axis, and the map $(x,y) \\to (x+4,−y)$ is the mirror in the $x$-axis composed with the slide $(4,0)$ ALONG it.',
                'Hence $M$ is the glide reflection with axis $y = 0$ and slide $(4,0)$ — join midpoints $(2,0)$, $(4,0)$, $(7,0)$, no fixed points, orientation reversed.',
              ],
              answer: 'the glide reflection with axis $y = 0$ and slide $(4,0)$; midpoints $(2,0)$, $(4,0)$, $(7,0)$ on the axis; no fixed points',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Three parallel mirrors stand at $x = 0$, $x = 2$ and $x = 4$, composed right-hand first ($F_{x=4} \\circ F_{x=2} \\circ F_{x=0}$). Carry $(1,0)$, $(3,2)$ and $(−1,5)$ through all three mirrors hop by hop, and show the composite is the single mirror $x = 2$.',
              solution: [
                'Sol. Track $(1,0)$: mirror $x = 0$ sends it to $(−1,0)$; mirror $x = 2$ sends $x \\to 4 − (−1) = 5$: $(5,0)$; mirror $x = 4$ sends $x \\to 8 − 5 = 3$: $(3,0)$.',
                'Track $(3,2)$: $(−3,2) \\to (7,2) \\to (1,2)$. Track $(−1,5)$: $(1,5) \\to (3,5) \\to (5,5)$.',
                'Test the claimed collapse: the single mirror $x = 2$ sends $(1,0) \\to (3,0)$, $(3,2) \\to (1,2)$, $(−1,5) \\to (5,5)$ — all three agree with the three-hop journey.',
                'Read the law: mirrors at $a$, $b$, $c$ collapse to one mirror at $c − b + a$ — here $4 − 2 + 0 = 2$ — so odd parity in the parallel family always lands on ONE reflection.',
                'Hence the composite equals the single reflection in the mirror $x = 2$: the sandwich collapse, verified on all three points.',
              ],
              answer: 'the three mirrors collapse to the single mirror $x = 2$ — witnesses $(1,0) \\to (3,0)$, $(3,2) \\to (1,2)$, $(−1,5) \\to (5,5)$',
            },
            {
              q: 'The composition $F_{x=0} \\circ T_{(2,0)}$ (slide first, then mirror) carries $(3,1)$ to $(−5,1)$. Undo the journey step by step back to $(3,1)$, and state the general rule for undoing a composition, with its name.',
              solution: [
                'Sol. The point sits at $(−5,1)$ after slide-then-mirror. The LAST machine to act was the mirror, so undo it FIRST: apply $F_{x=0}$ again — the mirror is its own inverse — carrying $(−5,1) \\to (5,1)$.',
                'Now undo the slide: apply the counter-slide $T_{(−2,0)}$: $(5,1) \\to (3,1)$ — home exactly.',
                'Verify the order claim: the undo used mirror-then-counter-slide, which is $T_{(−2,0)} \\circ F_{x=0}$ applied to $(−5,1)$ — the REVERSE of the original order, as the rule demands.',
                'State the rule: $(S \\circ T)^{−1} = T^{−1} \\circ S^{−1}$ — undo in reverse order, last machine off first — the shoes-and-socks law, and every inverse here is itself an isometry.',
                'Hence the undo chain is $(−5,1) \\to (5,1) \\to (3,1)$, run by $T_{(−2,0)} \\circ F_{x=0}$: shoes-and-socks, walked point by point.',
              ],
              answer: '$(−5,1) \\to (5,1) \\to (3,1)$ via mirror then $T_{(−2,0)}$; the rule is $(S \\circ T)^{−1} = T^{−1} \\circ S^{−1}$',
            },
            {
              q: 'Triangle $T_1$ has vertices $(0,0)$, $(4,0)$, $(4,3)$; triangle $T_2$ has vertices $(6,5)$, $(10,5)$, $(10,8)$. Compute both distance matrices, exhibit the single motion carrying $T_1$ onto $T_2$ vertex for vertex, and state the congruence verdict in the language of Lesson 5.2.',
              solution: [
                'Sol. Matrix of $T_1$: $AB = \\sqrt{4^2 + 0} = 4$; $BC = \\sqrt{0 + 3^2} = 3$; $CA = \\sqrt{(4−0)^2 + (3−0)^2} = 5$.',
                'Matrix of $T_2$: $A^{\\prime}B^{\\prime} = \\sqrt{4^2 + 0} = 4$; $B^{\\prime}C^{\\prime} = \\sqrt{0 + 3^2} = 3$; $C^{\\prime}A^{\\prime} = \\sqrt{4^2 + 3^2} = 5$ — identical, entry by entry.',
                'Exhibit the motion: each image is the original plus $(6,5)$ — $(0,0) \\to (6,5)$, $(4,0) \\to (10,5)$, $(4,3) \\to (10,8)$ — so the slide $T_{(6,5)}$ carries $T_1$ onto $T_2$ vertex for vertex.',
                'Confirm the carrier is rigid: a slide preserves every distance, so the matching matrices are guaranteed, not lucky.',
                'State the verdict: by the motion definition (G-CO.7), $T_1 \\cong T_2$ — congruent because one rigid motion does the carrying, with the shared matrix $4, 3, 5$ as the certificate.',
                'Hence $T_1 \\cong T_2$ via the slide $T_{(6,5)}$: distance screen and motion definition agree, as the mirror-machine theorem promises.',
              ],
              answer: 'matrices both $4, 3, 5$; the slide $T_{(6,5)}$ carries $T_1$ onto $T_2$; verdict: congruent by motion',
              figures: [
                {
                  caption: 'The distance-matrix witness for Exercise 11: both triangles carry the identical matrix 4, 3, 5, and the single slide T(6,5) maps (0, 0) to (6, 5), (4, 0) to (10, 5) and (4, 3) to (10, 8) — congruent by motion.',
                  svg: geo52MatrixWitness('Two congruent right triangles with vertices (0, 0), (4, 0), (4, 3) and (6, 5), (10, 5), (10, 8), joined by dashed amber vertex arrows, beside a panel listing the shared matrix AB = 4, BC = 3, CA = 5 and the verdict CONGRUENT.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Prove the parallel-mirror law on coordinates: for mirrors $x = a$ and $x = b$, the composition $F_{x=b} \\circ F_{x=a}$ acts as $(x,y) \\to (x + 2(b−a), y)$. Then witness the law at $a = 1$, $b = 4$, and state what happens to the flip.',
              solution: [
                'Sol. Write each mirror as a rule: reflection in $x = c$ sends $x \\to 2c − x$ and leaves $y$ alone — the mirror doubles the signed distance to the line.',
                'Compose, right-hand first: the inner mirror sends $x \\to 2a − x$; the outer sends that to $2b − (2a − x) = 2b − 2a + x = x + 2(b−a)$.',
                'Read the composite: $(x, y) \\to (x + 2(b−a),\\; y)$ — precisely the translation $T_{(2(b−a),\\,0)}$, with no $x$-sign flip anywhere: the two minus signs cancelled.',
                'Witness at $a = 1$, $b = 4$: the shift is $2(4−1) = 6$, so the composite is $T_{(6,0)}$ — the engine\u2019s pinned values: $(0,0) \\to (6,0)$ and $(1,2) \\to (7,2)$.',
                'State the flip\u2019s fate: each reflection reverses orientation once; two of them cancel, so the composite keeps orientation — a slide, not a mirror.',
                'Hence $F_{x=b} \\circ F_{x=a} = T_{(2(b−a),\\,0)}$ — twice the gap, flip cancelled, proved in three lines and witnessed at shift $6$.',
              ],
              answer: 'proved: $(x,y) \\to (x + 2(b−a), y)$; at $a = 1$, $b = 4$ the composite is $T_{(6,0)}$; the flip cancels',
            },
            {
              q: 'The dilation $D$ with scale factor $k = 2$ about the origin sends $(x,y) \\to (2x, 2y)$. Carry the segment from $(0,0)$ to $(3,0)$ and the triangle $(0,0)$, $(4,0)$, $(4,3)$ through $D$, compute every image distance, and deliver the verdict with the isometry law as your criterion.',
              solution: [
                'Sol. The segment: $(0,0) \\to (0,0)$ and $(3,0) \\to (6,0)$ — the image segment runs from $(0,0)$ to $(6,0)$, so its length is $6$ against the original $3$: doubled.',
                'The triangle\u2019s vertices: $(0,0) \\to (0,0)$, $(4,0) \\to (8,0)$, $(4,3) \\to (8,6)$.',
                'The image distances: base $\\sqrt{8^2} = 8$ (was $4$); side $\\sqrt{0 + 6^2} = 6$ (was $3$); hypotenuse $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$ (was $5$) — every distance doubled.',
                'Apply the isometry law: an isometry demands $|M(P)M(Q)| = |PQ|$ for EVERY pair; here $|D(P)D(Q)| = 2|PQ|$ — the law fails, so $D$ is NOT an isometry.',
                'Note what does survive: angles are preserved (the right angle at $(4,0)$ lands at $(8,0)$ with dot product $0$ still), so shape is kept while size is not — the honest doorstep to similarity in Lesson 5.4.',
                'Hence the verdict: the dilation $k = 2$ is not an isometry — length $3$ became $6$, sides $4, 3, 5$ became $8, 6, 10$, distances doubled everywhere.',
              ],
              answer: 'NOT an isometry: the length-3 segment becomes length $6$; the sides $4, 3, 5$ become $8, 6, 10$ — every distance doubles',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The mirrors $y = x$ and $y = −x$ cross at the origin at $90^\\circ$, composed right-hand first ($F_{y=−x} \\circ F_{y=x}$). Verify on $(2,5)$, $(4,1)$ and $(−3,2)$ that the composite is the half turn $R_{180}$ about the origin, and reconcile the angle arithmetic $2 \\times (−90^\\circ)$ with the result.',
              solution: [
                'Sol. Recall the mirror rules: $y = x$ swaps coordinates, $(x,y) \\to (y,x)$; $y = −x$ sends $(x,y) \\to (−y,−x)$.',
                'Track $(2,5)$: swap to $(5,2)$; then $y = −x$: $(−2,−5)$. The half turn $R_{180}$ sends $(2,5) \\to (−2,−5)$ — match.',
                'Track $(4,1)$: swap to $(1,4)$; then $(−4,−1)$. And $R_{180}(4,1) = (−4,−1)$ — match.',
                'Track $(−3,2)$: swap to $(2,−3)$; then $(3,−2)$. And $R_{180}(−3,2) = (3,−2)$ — match.',
                'Reconcile the angles: the angle from the first mirror ($45^\\circ$) to the second ($−45^\\circ$) is $−90^\\circ$, and the crossing-mirror law doubles it: $2 \\times (−90^\\circ) = −180^\\circ$, which is the same turn as $180^\\circ$ — the half turn, either way round.',
                'Hence the composite is $R_{180}$ about the origin on all three witnesses: two perpendicular mirrors build the half turn, twice $90^\\circ$ by the law.',
              ],
              answer: 'the composite is $R_{180}$ about the origin: $(2,5) \\to (−2,−5)$, $(4,1) \\to (−4,−1)$, $(−3,2) \\to (3,−2)$; $2 \\times (−90^\\circ) \\equiv 180^\\circ$',
            },
            {
              q: 'Let $g$ be the glide with mirror the $x$-axis and slide $(2,0)$ along it, so $g(x,y) = (x+2, −y)$. Prove that $g \\circ g$ is the pure slide $T_{(4,0)}$, witness it on $(4,1)$ and $(−2,3)$, and then read the order of each family: how many repeats return identity for the reflection, the quarter turn, and the glide?',
              solution: [
                'Sol. Compose $g$ with itself: $g(g(x,y)) = g(x+2, −y) = (x + 2 + 2, −(−y)) = (x + 4, y)$ — the flip cancels and the strides add.',
                'Name the composite: $(x,y) \\to (x+4, y)$ is exactly the translation $T_{(4,0)}$ — twice the slide, with no mirroring left.',
                'Witness: $(4,1) \\to g \\to (6,−1) \\to g \\to (8,1)$, and $(8,1) = T_{(4,0)}(4,1)$; likewise $(−2,3) \\to (0,−3) \\to (2,3) = T_{(4,0)}(−2,3)$.',
                'Read the orders: the reflection has order $2$ — one repeat returns identity, since $F \\circ F$ fixes everything (witness $(3,2) \\to (3,−2) \\to (3,2)$); the quarter turn $R_{90}$ has order $4$ — the engine cycled $(4,1)$ through $(−1,4)$, $(−4,−1)$, $(1,−4)$ and home; the glide has order infinity — $g^n(x,y) = (x + 2n, \\pm y)$ never returns for any $n \\ge 1$, as the engine confirmed for $n = 1$ to $8$.',
                'Hence $g \\circ g = T_{(4,0)}$ with witnesses $(4,1) \\to (8,1)$ and $(−2,3) \\to (2,3)$; orders: reflection $2$, quarter turn $4$, glide infinite — the square of a glide walks, but never arrives.',
              ],
              answer: '$g \\circ g = T_{(4,0)}$: $(4,1) \\to (8,1)$, $(−2,3) \\to (2,3)$; orders — reflection $2$, quarter turn $4$, glide infinite',
            },
          ],
        },
      ],
    },

/* -- APPEND TAIL (sections land above this line) -- */
  ],
}

/* ================================================================== */
/* lesson 5.3 — from docs/research/geo-ch05-wip/part-geo503.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — c31's structure     */
/* hue-shifted to the symmetry family, cyan ink)                       */
/* ------------------------------------------------------------------ */
const c53 = {
  ink: '#155e75', // primary text — deep cyan ink
  mid: '#0e7490', // mid text — cyan
  teal: '#0891b2', // captions, light strokes, secondary structure
  amber: '#d97706', // mirror lines, connectors, ticks
  orange: '#ea580c', // accent — highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // surviving structure strokes
  panel: '#cffafe', // cyan tinted fill
  panel2: '#fef9c3', // amber tinted fill
  sep: '#a5f3fc', // light separators
  faint: '#67e8f9', // faint candidate lines, grids
  white: '#ffffff',
  paper: '#f0fdfa',
}
const f53 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo53 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo53Txt = (
  x: number, y: number, s: string,
  size = 13, color = c53.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f53}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo53Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c53.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo53Dot = (x: number, y: number, color = c53.ink, r = 4): string =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`

const geo53Open = (x: number, y: number, color = c53.red, r = 5): string =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c53.white}" stroke="${color}" stroke-width="2"/>`

const geo53Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo53Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo53Path = (
  pts: Array<[number, number]>, color: string, w = 2.2, dash = '',
): string =>
  `<polyline points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo53Circle = (cx: number, cy: number, r: number, color: string, w = 2.4, dash = ''): string =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo53Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo53Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c53.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo53Line(x1, y1, x2, y2, color, w) + geo53Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, positive = downward on screen) */
const geo53Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo53Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** rotation of a point about a centre (screen coordinates) */
const geo53Rot = (p: [number, number], c: [number, number], deg: number): [number, number] => {
  const t = (deg * Math.PI) / 180
  const x = p[0] - c[0], y = p[1] - c[1]
  return [c[0] + x * Math.cos(t) - y * Math.sin(t), c[1] + x * Math.sin(t) + y * Math.cos(t)]
}

/** a capital letter drawn as strokes inside a 30 by 40 box at (x, y), scaled by s */
const geo53Letter = (ch: string, x: number, y: number, s: number, color: string, w = 2.4): string => {
  const P: Record<string, number[][][]> = {
    A: [[[0, 40], [15, 0], [30, 40]], [[7, 26], [23, 26]]],
    M: [[[0, 40], [0, 0], [15, 20], [30, 0], [30, 40]]],
    T: [[[0, 0], [30, 0]], [[15, 0], [15, 40]]],
    U: [[[0, 0], [0, 30], [6, 39], [15, 40], [24, 39], [30, 30], [30, 0]]],
    V: [[[0, 0], [15, 40], [30, 0]]],
    W: [[[0, 0], [7, 40], [15, 16], [23, 40], [30, 0]]],
    Y: [[[0, 0], [15, 18], [30, 0]], [[15, 18], [15, 40]]],
    H: [[[0, 0], [0, 40]], [[30, 0], [30, 40]], [[0, 20], [30, 20]]],
    I: [[[15, 0], [15, 40]], [[5, 0], [25, 0]], [[5, 40], [25, 40]]],
    X: [[[0, 0], [30, 40]], [[30, 0], [0, 40]]],
    N: [[[0, 40], [0, 0], [30, 40], [30, 0]]],
    Z: [[[0, 0], [30, 0], [0, 40], [30, 40]]],
    S: [[[28, 5], [21, 0], [9, 0], [2, 7], [2, 15], [10, 20], [20, 20], [28, 25], [28, 33], [21, 40], [9, 40], [2, 35]]],
    F: [[[30, 0], [4, 0], [4, 40]], [[4, 16], [22, 16]]],
    G: [[[30, 10], [24, 2], [12, 0], [4, 8], [2, 20], [4, 32], [12, 40], [24, 38], [30, 30], [30, 22], [18, 22]]],
    J: [[[10, 0], [26, 0], [26, 32], [20, 40], [10, 40], [4, 32]]],
    L: [[[4, 0], [4, 40], [28, 40]]],
    P: [[[4, 40], [4, 0], [24, 0], [30, 8], [30, 16], [24, 24], [4, 24]]],
    R: [[[4, 40], [4, 0], [24, 0], [30, 8], [30, 14], [24, 20], [12, 20]], [[12, 20], [24, 40]]],
  }
  if (ch === 'O') {
    return `<ellipse cx="${(x + 15 * s).toFixed(1)}" cy="${(y + 20 * s).toFixed(1)}" rx="${(15 * s).toFixed(1)}" ry="${(20 * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
  }
  const strokes = P[ch] ?? []
  return strokes.map((pl) => geo53Path(pl.map(([px, py]) => [x + px * s, y + py * s] as [number, number]), color, w)).join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — what a symmetry is: mirror panel + turn panel      */
/* ------------------------------------------------------------------ */
const geo53SymIdea = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'A SYMMETRY IS A MOTION THAT CARRIES THE FIGURE ONTO ITSELF', 13, c53.ink, 'middle', '700'))
  // left: line symmetry
  parts.push(geo53Txt(130, 52, 'LINE SYMMETRY (A REFLECTION)', 12.5, c53.mid, 'middle', '700'))
  parts.push(geo53Poly([[60, 240], [200, 240], [130, 110]], c53.panel, 0.5, c53.ink, 2.6))
  parts.push(geo53Line(130, 92, 130, 256, c53.amber, 2, '6 4'))
  parts.push(geo53Dot(130, 110, c53.orange, 3.5))
  parts.push(geo53Arrow(122, 130, 108, 146, c53.amber, 1.8))
  parts.push(geo53Arrow(138, 130, 152, 146, c53.amber, 1.8))
  parts.push(geo53Txt(130, 276, 'fold: the halves coincide', 12, c53.mid, 'middle'))
  // right: rotational symmetry — a 4-blade pinwheel
  parts.push(geo53Txt(460, 52, 'ROTATIONAL SYMMETRY (A TURN)', 12.5, c53.mid, 'middle', '700'))
  const hub: [number, number] = [460, 168]
  const blade = (deg: number): void => {
    const p1 = geo53Rot([hub[0] + 72, hub[1] - 14], hub, deg)
    const p2 = geo53Rot([hub[0] + 92, hub[1]], hub, deg)
    parts.push(geo53Poly([hub, p1, p2], c53.panel2, 0.75, c53.orange, 2.2))
  }
  ;[0, 90, 180, 270].forEach((d) => blade(d))
  parts.push(geo53Dot(hub[0], hub[1], c53.ink, 4.5))
  parts.push(geo53Arc(hub[0], hub[1], 46, 0, Math.PI / 2, c53.amber, 2.2))
  parts.push(geo53Head(hub[0] + 46 * Math.cos(Math.PI / 2 - 0.12), hub[1] + 46 * Math.sin(Math.PI / 2 - 0.12) + 2, 90 - 7 + 90, c53.amber, 8))
  parts.push(geo53Txt(hub[0] + 62, hub[1] + 42, '90°', 12.5, c53.amber, 'start', '700'))
  parts.push(geo53Txt(460, 276, 'a 90° turn maps it to itself — order 4', 12, c53.mid, 'middle'))
  return geo53Svg(640, 300, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the regular n-gon mirror-line family               */
/* ------------------------------------------------------------------ */
const geo53RegularCensus = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE REGULAR POLYGON CENSUS: n MIRRORS, ORDER n, ANGLE 360/n', 13, c53.ink, 'middle', '700'))
  // the hexagon, drawn fully: 6 mirror lines through vertices and edge midpoints
  const HX = 185, HY = 205, R = 108
  const hex = (k: number): [number, number] => {
    const t = ((90 + 60 * k) * Math.PI) / 180
    return [HX + R * Math.cos(t), HY - R * Math.sin(t)]
  }
  parts.push(geo53Poly([0, 1, 2, 3, 4, 5].map(hex), c53.panel, 0.4, c53.ink, 2.8))
  for (const a of [0, 30, 60, 90, 120, 150]) {
    const t = (a * Math.PI) / 180
    parts.push(geo53Line(HX - R * Math.cos(t), HY + R * Math.sin(t), HX + R * Math.cos(t), HY - R * Math.sin(t), c53.amber, 1.8, '6 4'))
  }
  parts.push(geo53Dot(HX, HY, c53.ink, 3.5))
  parts.push(geo53Txt(HX, 352, 'hexagon: 6 mirrors, order 6, angle 60°', 12.5, c53.mid, 'middle', '700'))
  parts.push(geo53Txt(HX, 372, '3 vertex axes, 3 side axes', 11.5, c53.mid, 'middle'))
  // three small census panels on the right
  const mini = (cx: number, cy: number, n: number, R2: number, angles: number[]): void => {
    const vs = (k: number): [number, number] => {
      const t = ((90 + (360 / n) * k) * Math.PI) / 180
      return [cx + R2 * Math.cos(t), cy - R2 * Math.sin(t)]
    }
    parts.push(geo53Poly(Array.from({ length: n }, (_, k) => vs(k)), c53.panel, 0.4, c53.ink, 2.2))
    for (const a of angles) {
      const t = (a * Math.PI) / 180
      parts.push(geo53Line(cx - R2 * Math.cos(t), cy + R2 * Math.sin(t), cx + R2 * Math.cos(t), cy - R2 * Math.sin(t), c53.amber, 1.5, '5 4'))
    }
    parts.push(geo53Dot(cx, cy, c53.ink, 3))
  }
  mini(470, 95, 4, 38, [0, 45, 90, 135])
  parts.push(geo53Txt(625, 92, 'square', 12, c53.ink, 'end', '700'))
  parts.push(geo53Txt(625, 110, '4 lines, order 4', 11.5, c53.mid, 'end'))
  mini(470, 205, 5, 40, [18, 54, 90, 126, 162])
  parts.push(geo53Txt(625, 202, 'pentagon', 12, c53.ink, 'end', '700'))
  parts.push(geo53Txt(625, 220, '5 lines, order 5', 11.5, c53.mid, 'end'))
  mini(470, 315, 8, 44, [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5])
  parts.push(geo53Txt(625, 312, 'octagon', 12, c53.ink, 'end', '700'))
  parts.push(geo53Txt(625, 330, '8 lines, order 8', 11.5, c53.mid, 'end'))
  return geo53Svg(640, 390, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the three-panel quadrilateral census               */
/* ------------------------------------------------------------------ */
const geo53QuadCensus = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'FOUR SIDES, FOUR DIFFERENT MIRROR CENSUSES', 13, c53.ink, 'middle', '700'))
  // square: all four lines
  parts.push(geo53Rect(50, 100, 120, 120, c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Line(110, 100, 110, 220, c53.green, 1.8, '6 4'))
  parts.push(geo53Line(50, 160, 170, 160, c53.green, 1.8, '6 4'))
  parts.push(geo53Line(50, 100, 170, 220, c53.amber, 1.8, '6 4'))
  parts.push(geo53Line(170, 100, 50, 220, c53.amber, 1.8, '6 4'))
  parts.push(geo53Txt(110, 248, 'square: 4 lines', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(110, 266, 'order 4, angle 90°', 11.5, c53.mid, 'middle'))
  // rectangle: the two midlines only
  parts.push(geo53Rect(250, 110, 140, 100, c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Line(320, 110, 320, 210, c53.green, 1.8, '6 4'))
  parts.push(geo53Line(250, 160, 390, 160, c53.green, 1.8, '6 4'))
  parts.push(geo53Line(250, 110, 390, 210, c53.red, 1.5, '3 4'))
  parts.push(geo53Line(390, 110, 250, 210, c53.red, 1.5, '3 4'))
  parts.push(geo53Txt(320, 248, 'rectangle: exactly 2', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(320, 266, 'the midlines (diagonals fail)', 11.5, c53.mid, 'middle'))
  // rhombus: the two diagonals only
  parts.push(geo53Poly([[470, 160], [530, 110], [590, 160], [530, 210]], c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Line(470, 160, 590, 160, c53.amber, 1.8, '6 4'))
  parts.push(geo53Line(530, 110, 530, 210, c53.amber, 1.8, '6 4'))
  parts.push(geo53Line(500, 135, 560, 185, c53.red, 1.5, '3 4'))
  parts.push(geo53Line(560, 135, 500, 185, c53.red, 1.5, '3 4'))
  parts.push(geo53Txt(530, 248, 'rhombus: exactly 2', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(530, 266, 'diagonals; midlines fail', 11.5, c53.mid, 'middle'))
  parts.push(geo53Txt(320, 306, 'green: a mirror survives · red: a mirror fails', 11.5, c53.mid, 'middle'))
  return geo53Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the parallelogram's failed mirror (vertex chase)   */
/* ------------------------------------------------------------------ */
const geo53FailedMirror = (aria: string): string => {
  const parts: string[] = []
  const T = (p: [number, number]): [number, number] => [120 + 48 * p[0], 250 - 48 * p[1]]
  const A = T([0, 0]), B = T([5, 0]), C = T([6, 2]), D = T([1, 2])
  parts.push(geo53Txt(320, 22, 'THE PARALLELOGRAM\u2019S FAILED MIRROR: THE VERTEX CHASE', 13, c53.ink, 'middle', '700'))
  parts.push(geo53Poly([A, B, C, D], c53.panel, 0.4, c53.ink, 2.8))
  parts.push(geo53Line(A[0], A[1], C[0], C[1], c53.red, 2, '7 5'))
  parts.push(geo53Txt(268, 188, 'attempted mirror: diagonal AC', 12, c53.red, 'middle'))
  parts.push(geo53Txt(240, 270, '5', 12.5, c53.amber, 'middle', '700'))
  parts.push(geo53Txt(146, 208, '√5 ≈ 2.2361', 12, c53.amber, 'start', '700'))
  // the chase: B reflected in AC lands at (4,3); D lands at (2,−1)
  const Bim = T([4, 3]), Dim = T([2, -1])
  parts.push(geo53Arrow(B[0] - 10, B[1] - 8, Bim[0] + 8, Bim[1] + 8, c53.red, 1.8))
  parts.push(geo53Open(Bim[0], Bim[1], c53.red, 5.5))
  parts.push(geo53Txt(Bim[0] + 10, Bim[1] - 12, 'B lands at (4,3)', 12, c53.red, 'start', '700'))
  parts.push(geo53Arrow(D[0] - 4, D[1] + 10, Dim[0] + 2, Dim[1] - 10, c53.red, 1.8))
  parts.push(geo53Open(Dim[0], Dim[1], c53.red, 5.5))
  parts.push(geo53Txt(Dim[0] + 12, Dim[1] + 6, 'D lands at (2,−1)', 12, c53.red, 'start', '700'))
  parts.push(geo53Dot(A[0], A[1], c53.ink, 4)); parts.push(geo53Dot(B[0], B[1], c53.ink, 4))
  parts.push(geo53Dot(C[0], C[1], c53.ink, 4)); parts.push(geo53Dot(D[0], D[1], c53.ink, 4))
  parts.push(geo53Txt(A[0] - 14, A[1] + 4, 'A', 12, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(B[0] + 14, B[1] + 4, 'B', 12, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(C[0] + 14, C[1] - 6, 'C', 12, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(D[0] - 14, D[1] - 6, 'D', 12, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(320, 316, 'a mirror must swap EQUAL sides: 5 ≠ √5', 12.5, c53.red, 'middle', '700'))
  return geo53Svg(640, 334, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F5 — the rotational-order wheel (8 spokes, 45°)         */
/* ------------------------------------------------------------------ */
const geo53OrderWheel = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE ROTATIONAL-ORDER WHEEL: 8 SPOKES, ANGLE 45°', 13, c53.ink, 'middle', '700'))
  const CX = 240, CY = 178, R = 118
  parts.push(geo53Circle(CX, CY, R, c53.ink, 2.8))
  parts.push(geo53Circle(CX, CY, 12, c53.ink, 2.2))
  for (let k = 0; k < 8; k++) {
    const t = (k * 45 * Math.PI) / 180
    parts.push(geo53Line(CX, CY, CX + (R - 14) * Math.cos(t), CY + (R - 14) * Math.sin(t), k % 2 === 0 ? c53.mid : c53.mid, 3))
    parts.push(geo53Dot(CX + (R - 8) * Math.cos(t), CY + (R - 8) * Math.sin(t), c53.orange, 4))
  }
  parts.push(geo53Arc(CX, CY, 64, 0, Math.PI / 4, c53.amber, 2.6))
  parts.push(geo53Head(CX + 64 * Math.cos(Math.PI / 4 - 0.1), CY + 64 * Math.sin(Math.PI / 4 - 0.1), 45 + 80, c53.amber, 8))
  parts.push(geo53Txt(CX + 92, CY - 52, '45°', 13, c53.amber, 'middle', '700'))
  parts.push(geo53Txt(CX, 316, 'the wheel matches itself 8 times in a full turn', 12, c53.mid, 'middle'))
  // the order/angle law panel
  parts.push(geo53Line(410, 80, 410, 250, c53.sep, 1.6))
  parts.push(geo53Txt(524, 108, 'ORDER AND ANGLE', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(524, 138, 'order = matches per', 12, c53.mid, 'middle'))
  parts.push(geo53Txt(524, 156, 'full 360° turn', 12, c53.mid, 'middle'))
  parts.push(geo53Txt(524, 190, 'angle of rotation', 12, c53.mid, 'middle'))
  parts.push(geo53Txt(524, 208, '= 360/order', 12.5, c53.orange, 'middle', '700'))
  parts.push(geo53Txt(524, 240, 'wheel: 360/8 = 45°', 12.5, c53.mid, 'middle', '700'))
  return geo53Svg(640, 334, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F6 — the 180°-about-the-centre witness                  */
/* ------------------------------------------------------------------ */
const geo53CentreWitness = (aria: string): string => {
  const parts: string[] = []
  const T = (p: [number, number]): [number, number] => [120 + 48 * p[0], 250 - 48 * p[1]]
  const A = T([0, 0]), B = T([5, 0]), C = T([6, 2]), D = T([1, 2]), O = T([3, 1])
  parts.push(geo53Txt(320, 22, 'THE 180° WITNESS: HALF A TURN ABOUT (3,1) MAPS IT ONTO ITSELF', 13, c53.ink, 'middle', '700'))
  parts.push(geo53Poly([A, B, C, D], c53.panel, 0.4, c53.ink, 2.8))
  parts.push(geo53Line(A[0], A[1], C[0], C[1], c53.amber, 2, '7 5'))
  parts.push(geo53Line(B[0], B[1], D[0], D[1], c53.amber, 2, '7 5'))
  parts.push(geo53Dot(O[0], O[1], c53.orange, 5))
  parts.push(geo53Txt(O[0] + 10, O[1] + 18, '(3,1)', 12, c53.orange, 'start', '700'))
  parts.push(geo53Arc(O[0], O[1], 34, -0.5, 2.6, c53.green, 2.2))
  parts.push(geo53Head(O[0] + 34 * Math.cos(2.6 + 0.14), O[1] + 34 * Math.sin(2.6 + 0.14), (2.6 * 180) / Math.PI + 90, c53.green, 8))
  parts.push(geo53Txt(O[0] - 40, O[1] - 44, '180°', 12.5, c53.green, 'middle', '700'))
  parts.push(geo53Dot(A[0], A[1], c53.ink, 4)); parts.push(geo53Dot(B[0], B[1], c53.ink, 4))
  parts.push(geo53Dot(C[0], C[1], c53.ink, 4)); parts.push(geo53Dot(D[0], D[1], c53.ink, 4))
  parts.push(geo53Txt(320, 296, 'each vertex lands on its opposite: the diagonals bisect each other at (3,1)', 12.5, c53.mid, 'middle'))
  parts.push(geo53Txt(320, 316, 'no mirror survives — yet half a turn is a perfect symmetry: rotational-only, order 2', 12, c53.mid, 'middle'))
  return geo53Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F7 — the triangle census (3 / 1 / 0)                    */
/* ------------------------------------------------------------------ */
const geo53TriCensus = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE TRIANGLE CENSUS: 3 LINES, 1 LINE, 0 LINES', 13, c53.ink, 'middle', '700'))
  // equilateral: 3 mirrors
  const E1: [number, number] = [60, 240], E2: [number, number] = [192, 240], E3: [number, number] = [126, 126]
  parts.push(geo53Poly([E1, E2, E3], c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Line(E3[0], E3[1], 126, 240, c53.amber, 1.8, '6 4'))
  parts.push(geo53Line(E1[0], E1[1], 159, 183, c53.amber, 1.8, '6 4'))
  parts.push(geo53Line(E2[0], E2[1], 93, 183, c53.amber, 1.8, '6 4'))
  parts.push(geo53Txt(126, 272, 'equilateral: 3, order 3', 12, c53.ink, 'middle', '700'))
  // isosceles: 1 mirror
  const I1: [number, number] = [250, 240], I2: [number, number] = [426, 240], I3: [number, number] = [338, 108]
  parts.push(geo53Poly([I1, I2, I3], c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Line(338, 108, 338, 240, c53.amber, 1.8, '6 4'))
  parts.push(geo53Txt(338, 272, 'isosceles: 1 line, no rotation', 12, c53.ink, 'middle', '700'))
  // scalene: nothing
  const S1: [number, number] = [450, 240], S2: [number, number] = [620, 240], S3: [number, number] = [518, 138]
  parts.push(geo53Poly([S1, S2, S3], c53.panel, 0.4, c53.ink, 2.6))
  parts.push(geo53Txt(535, 272, 'scalene: nothing at all', 12, c53.red, 'middle', '700'))
  parts.push(geo53Txt(535, 290, 'sides 5, 4.24, 3.61', 11.5, c53.mid, 'middle'))
  parts.push(geo53Txt(320, 308, 'the isosceles triangle is the letter A archetype: mirror without rotation', 11.5, c53.mid, 'middle'))
  return geo53Svg(640, 326, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F8 — the alphabet census strip                          */
/* ------------------------------------------------------------------ */
const geo53AlphabetStrip = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE ALPHABET CENSUS', 13, c53.ink, 'middle', '700'))
  const cell = (x: number, y: number, ch: string, s: number, label: string[], mirror: 'vert' | 'both' | 'none', rot = false): void => {
    parts.push(geo53Letter(ch, x + 15, y, s, c53.ink, 2.6))
    if (mirror === 'vert') parts.push(geo53Line(x + 30, y - 6, x + 30, y + 46 * s + 6, c53.amber, 1.6, '5 4'))
    if (mirror === 'both') {
      parts.push(geo53Line(x + 30, y - 6, x + 30, y + 46 * s + 6, c53.amber, 1.6, '5 4'))
      parts.push(geo53Line(x + 10, y + 20 * s, x + 50, y + 20 * s, c53.amber, 1.6, '5 4'))
    }
    if (rot) {
      parts.push(geo53Arc(x + 30, y + 20 * s, 30, -0.9, 0.9, c53.green, 1.8))
      parts.push(geo53Head(x + 30 + 30 * Math.cos(0.9 + 0.12), y + 20 * s + 30 * Math.sin(0.9 + 0.12), (0.9 * 180) / Math.PI + 80, c53.green, 7))
    }
    label.forEach((t, i) => parts.push(geo53Txt(x + 30, y + 46 * s + 22 + i * 17, t, 11.5, i === 0 ? c53.ink : c53.mid, 'middle', i === 0 ? '700' : '400')))
  }
  cell(30, 60, 'A', 1.9, ['A: 1 line', 'apex fold'], 'vert')
  cell(175, 60, 'M', 1.9, ['M: 1 line', 'centre drop'], 'vert')
  cell(320, 60, 'T', 1.9, ['T: 1 line', 'down the stem'], 'vert')
  cell(465, 60, 'H', 1.9, ['H: 2 lines', '+ order 2'], 'both')
  cell(30, 190, 'N', 1.9, ['N: order 2', 'NO mirror'], 'none', true)
  cell(175, 190, 'Z', 1.9, ['Z: order 2', 'NO mirror'], 'none', true)
  cell(320, 190, 'F', 1.9, ['F: nothing', 'no symmetry'], 'none')
  cell(465, 190, 'O', 1.9, ['O: infinite', 'every diameter'], 'both', true)
  parts.push(geo53Txt(320, 322, 'one line: A M T U V W Y · two lines: H I X · only-turn: N S Z · nothing: F G J L P R', 11, c53.mid, 'middle'))
  return geo53Svg(640, 340, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F9 — the four-way classification diagram                */
/* ------------------------------------------------------------------ */
const geo53FourWay = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE FOUR-WAY CLASSIFICATION', 13, c53.ink, 'middle', '700'))
  const box = (x: number, y: number, head: string, headColor: string, sub: string, members: string, glyph: string): void => {
    parts.push(geo53Rect(x, y, 295, 148, c53.paper, 1, headColor, 2.2))
    parts.push(geo53Txt(x + 148, y + 26, head, 12.5, headColor, 'middle', '700'))
    parts.push(geo53Txt(x + 148, y + 46, sub, 11.5, c53.ink, 'middle'))
    if (glyph === 'square') {
      parts.push(geo53Rect(x + 22, y + 66, 62, 62, c53.panel, 0.5, c53.ink, 2))
      parts.push(geo53Line(x + 53, y + 66, x + 53, y + 128, c53.amber, 1.4, '4 3'))
      parts.push(geo53Line(x + 22, y + 97, x + 84, y + 97, c53.amber, 1.4, '4 3'))
      parts.push(geo53Line(x + 22, y + 66, x + 84, y + 128, c53.amber, 1.4, '4 3'))
      parts.push(geo53Line(x + 84, y + 66, x + 22, y + 128, c53.amber, 1.4, '4 3'))
    }
    if (glyph === 'iso') {
      parts.push(geo53Poly([[x + 22, y + 128], [x + 84, y + 128], [x + 53, y + 66]], c53.panel, 0.5, c53.ink, 2))
      parts.push(geo53Line(x + 53, y + 66, x + 53, y + 128, c53.amber, 1.4, '4 3'))
    }
    if (glyph === 'para') {
      parts.push(geo53Poly([[x + 22, y + 122], [x + 72, y + 122], [x + 88, y + 74], [x + 38, y + 74]], c53.panel, 0.5, c53.ink, 2))
      parts.push(geo53Line(x + 30, y + 98, x + 80, y + 98, c53.red, 1.4, '4 3'))
    }
    if (glyph === 'scal') {
      parts.push(geo53Poly([[x + 22, y + 128], [x + 88, y + 128], [x + 44, y + 70]], c53.panel, 0.5, c53.ink, 2))
    }
    parts.push(geo53Txt(x + 148, y + 96, members.split(' | ')[0], 11.5, c53.mid, 'middle'))
    parts.push(geo53Txt(x + 148, y + 114, members.split(' | ')[1] ?? '', 11.5, c53.mid, 'middle'))
    if (members.split(' | ')[2]) parts.push(geo53Letter(members.split(' | ')[2], x + 110, y + 62, 1.5, c53.ink, 2.2))
  }
  box(15, 44, 'BOTH', c53.green, 'mirrors AND order of at least 2', 'square 4 · rectangle 2 · rhombus 2 | regular n-gons · H · I · X', 'square')
  box(330, 44, 'ONLY LINE', c53.amber, 'exactly one mirror, order 1', 'the isosceles triangle | letters A · M · T · U · V · W · Y', 'iso')
  box(15, 206, 'ONLY ROTATIONAL', c53.orange, 'NO mirror, yet order 2', 'the generic parallelogram | letters N · S · Z', 'para')
  box(330, 206, 'NEITHER', c53.red, 'no mirror, order 1', 'the scalene triangle | letters F · G · J · L · P · R', 'scal')
  return geo53Svg(640, 372, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F10 — the 5-blade fan (order 5, 72°)                    */
/* ------------------------------------------------------------------ */
const geo53Fan = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE 5-BLADE FAN: ORDER 5, ANGLE 72°', 13, c53.ink, 'middle', '700'))
  const CX = 240, CY = 165
  const u = (deg: number, r: number): [number, number] => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)]
  for (let k = 0; k < 5; k++) {
    const a = 90 + 72 * k
    parts.push(geo53Poly([u(a - 14, 30), u(a, 112), u(a + 14, 30)], c53.panel2, 0.8, c53.orange, 2.2))
    parts.push(geo53Line(CX, CY, u(a, 104)[0], u(a, 104)[1], c53.amber, 1.4, '4 3'))
  }
  parts.push(geo53Dot(CX, CY, c53.ink, 6))
  parts.push(geo53Arc(CX, CY, 56, (90 * Math.PI) / 180, (162 * Math.PI) / 180, c53.green, 2.4))
  parts.push(geo53Head(u(162, 56)[0] + 6, u(162, 56)[1] + 2, 162 + 90, c53.green, 8))
  parts.push(geo53Txt(u(126, 78)[0] + 24, u(126, 78)[1] + 4, '72°', 13, c53.green, 'middle', '700'))
  parts.push(geo53Txt(CX, 300, '5 blades · 5 matches per turn · 360/5 = 72°', 12.5, c53.mid, 'middle', '700'))
  parts.push(geo53Txt(510, 120, 'count the matches', 12, c53.mid, 'middle'))
  parts.push(geo53Txt(510, 140, 'in ONE full turn:', 12, c53.mid, 'middle'))
  parts.push(geo53Txt(510, 168, 'order = the count', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(510, 192, 'angle = 360/order', 12.5, c53.orange, 'middle', '700'))
  return geo53Svg(640, 320, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the mirror-sweep sketch (Exercise 11)          */
/* ------------------------------------------------------------------ */
const geo53SweepSketch = (aria: string): string => {
  const parts: string[] = []
  const T = (p: [number, number]): [number, number] => [140 + 40 * p[0], 250 - 40 * p[1]]
  const A = T([0, 0]), B = T([5, 0]), C = T([6, 2]), D = T([1, 2]), O = T([3, 1])
  parts.push(geo53Txt(320, 22, 'THE MIRROR SWEEP ON THE PARALLELOGRAM', 13, c53.ink, 'middle', '700'))
  parts.push(geo53Poly([A, B, C, D], c53.panel, 0.4, c53.ink, 2.6))
  for (let d = 0; d < 180; d += 15) {
    const t = (d * Math.PI) / 180
    const hot = d === 0 || d === 90
    parts.push(geo53Line(O[0] - 100 * Math.cos(t), O[1] + 100 * Math.sin(t), O[0] + 100 * Math.cos(t), O[1] - 100 * Math.sin(t), hot ? c53.amber : c53.faint, hot ? 2 : 1.3, hot ? '' : '3 4'))
    if (hot) {
      parts.push(geo53Txt(O[0] + 104 * Math.cos(t), O[1] - 104 * Math.sin(t) - 4, 'fails', 11.5, c53.red, 'middle', '700'))
      parts.push(geo53Txt(O[0] - 104 * Math.cos(t), O[1] + 104 * Math.sin(t) - 4, 'fails', 11.5, c53.red, 'middle', '700'))
    }
  }
  parts.push(geo53Dot(O[0], O[1], c53.orange, 4.5))
  parts.push(geo53Txt(320, 300, '180 candidates through the centre, one per degree — verdict: 0 survive', 12.5, c53.red, 'middle', '700'))
  parts.push(geo53Txt(320, 318, 'the same sweep gives the rectangle 2, the rhombus 2, the square 4', 11.5, c53.mid, 'middle'))
  return geo53Svg(640, 330, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the parallelogram contradiction (Exercise 7)   */
/* ------------------------------------------------------------------ */
const geo53ParaContradiction = (aria: string): string => {
  const parts: string[] = []
  const T = (p: [number, number]): [number, number] => [120 + 48 * p[0], 258 - 48 * p[1]]
  const A = T([0, 0]), B = T([5, 0]), C = T([6, 2]), D = T([1, 2])
  parts.push(geo53Txt(320, 22, 'THE CONTRADICTION DIAGRAM: A MIRROR MUST SWAP EQUAL SIDES', 13, c53.ink, 'middle', '700'))
  parts.push(geo53Poly([A, B, C, D], c53.panel, 0.4, c53.ink, 2.8))
  parts.push(geo53Line(A[0], A[1], C[0], C[1], c53.red, 2, '7 5'))
  parts.push(geo53Txt(292, 178, 'candidate mirror AC', 12, c53.red, 'middle'))
  parts.push(geo53Txt(240, 278, 'AB = 5', 12.5, c53.amber, 'middle', '700'))
  parts.push(geo53Txt(140, 200, 'AD = √5 ≈ 2.2361', 12, c53.amber, 'start', '700'))
  const Bim = T([4, 3]), Dim = T([2, -1])
  parts.push(geo53Open(Bim[0], Bim[1], c53.red, 5.5))
  parts.push(geo53Txt(Bim[0] + 10, Bim[1] - 10, 'B → (4,3)', 12, c53.red, 'start', '700'))
  parts.push(geo53Open(Dim[0], Dim[1], c53.red, 5.5))
  parts.push(geo53Txt(Dim[0] + 12, Dim[1] + 4, 'D → (2,−1)', 12, c53.red, 'start', '700'))
  parts.push(geo53Dot(A[0], A[1], c53.ink, 4)); parts.push(geo53Dot(B[0], B[1], c53.ink, 4))
  parts.push(geo53Dot(C[0], C[1], c53.ink, 4)); parts.push(geo53Dot(D[0], D[1], c53.ink, 4))
  parts.push(geo53Txt(320, 320, 'B and D land OFF the figure — no mirror exists', 12.5, c53.red, 'middle', '700'))
  return geo53Svg(640, 338, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the alphabet strip answer (Exercise 5)         */
/* ------------------------------------------------------------------ */
const geo53AlphabetAnswer = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo53Txt(320, 22, 'THE ALPHABET ANSWER STRIP', 13, c53.ink, 'middle', '700'))
  const col = (x: number, head: string, hc: string, glyphs: string[], sub: string): void => {
    parts.push(geo53Txt(x, 54, head, 12, hc, 'middle', '700'))
    glyphs.forEach((g, i) => parts.push(geo53Letter(g, x - 42 + i * 42, 70, 1.35, c53.ink, 2.2)))
    parts.push(geo53Txt(x, 140, sub, 11.5, c53.mid, 'middle'))
  }
  col(95, 'ONE LINE', c53.amber, ['A', 'M', 'T'], 'also U V W Y')
  col(245, 'TWO LINES + ORDER 2', c53.green, ['H', 'I', 'X'], 'the double-mirror club')
  col(405, 'ORDER 2, NO MIRROR', c53.orange, ['N', 'S', 'Z'], 'rotational only')
  col(555, 'NOTHING', c53.red, ['F', 'P', 'L'], 'also G J R')
  parts.push(geo53Letter('O', 300, 165, 1.35, c53.ink, 2.2))
  parts.push(geo53Txt(430, 195, 'O: every diameter a mirror, every angle a rotation', 11.5, c53.mid, 'middle'))
  parts.push(geo53Txt(320, 240, 'four cells, every letter placed: both · only line · only rotational · neither', 12.5, c53.ink, 'middle', '700'))
  parts.push(geo53Txt(320, 262, 'the engine verified N and Z by coordinate outline: 0 of 360 candidate mirrors, order 2', 11.5, c53.mid, 'middle'))
  return geo53Svg(640, 280, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the rectangle diagonal witness (Exercise 14)   */
/* ------------------------------------------------------------------ */
const geo53RectDiagWitness = (aria: string): string => {
  const parts: string[] = []
  const T = (p: [number, number]): [number, number] => [140 + 40 * p[0], 250 - 40 * p[1]]
  const A = T([0, 0]), B = T([6, 0]), C = T([6, 4]), D = T([0, 4])
  parts.push(geo53Txt(320, 22, 'WHY THE RECTANGLE DIAGONAL FAILS: THE VERTEX CHASE', 13, c53.ink, 'middle', '700'))
  parts.push(geo53Rect(140, 90, 240, 160, c53.panel, 0.4, c53.ink, 2.8))
  parts.push(geo53Line(A[0], A[1], C[0], C[1], c53.red, 2, '7 5'))
  parts.push(geo53Txt(282, 182, 'attempted mirror AC', 12, c53.red, 'middle'))
  const Bim = T([30 / 13, 72 / 13]), Dim = T([48 / 13, -20 / 13])
  parts.push(geo53Open(Bim[0], Bim[1], c53.red, 5.5))
  parts.push(geo53Txt(Bim[0] + 12, Bim[1] + 4, 'B → (2.31, 5.54)', 12, c53.red, 'start', '700'))
  parts.push(geo53Open(Dim[0], Dim[1], c53.red, 5.5))
  parts.push(geo53Txt(Dim[0] + 12, Dim[1] - 6, 'D → (3.69, −1.54)', 12, c53.red, 'start', '700'))
  parts.push(geo53Dot(A[0], A[1], c53.ink, 4)); parts.push(geo53Dot(B[0], B[1], c53.ink, 4))
  parts.push(geo53Dot(C[0], C[1], c53.ink, 4)); parts.push(geo53Dot(D[0], D[1], c53.ink, 4))
  parts.push(geo53Txt(320, 296, 'both chased vertices land OFF the rectangle: the diagonal is NOT a mirror', 12.5, c53.red, 'middle', '700'))
  parts.push(geo53Txt(320, 314, 'only the midlines x = 3 and y = 2 survive — order 2 about (3,2)', 12, c53.mid, 'middle'))
  return geo53Svg(640, 326, aria, parts)
}

export const lessonGeo503: Lesson = {
  id: 'geo-line-and-rotational-symmetry',
  number: '5.3',
  title: 'Line and Rotational Symmetry',
  concepts: ['line symmetry', 'mirror line', 'rotational symmetry', 'order of rotational symmetry', 'angle of rotation', 'centre of rotation', 'regular polygon symmetry', 'rotational-only symmetry'],
  objectives: [
    'Define a symmetry as a rigid motion that carries a figure onto itself, and split it into line symmetry (a reflection fixes the figure) and rotational symmetry (a non-identity turn fixes it)',
    'Run the mirror census: a regular n-gon carries exactly n mirror lines and rotational order n, with angle of rotation 360/n (120°, 90°, 72°, 60°, 45°, 36° for n = 3, 4, 5, 6, 8, 10)',
    'Classify the quadrilaterals: square 4 lines + order 4; rectangle exactly 2 (the midlines); rhombus exactly 2 (the diagonals); generic parallelogram 0 lines yet order 2 — rotational-only',
    'Prove censuses with the brute-force mirror sweep through the centroid, and run the vertex-chase contradiction (the unequal adjacent sides 5 and √5) that kills every parallelogram mirror',
    'Classify the triangles (equilateral 3 + order 3, isosceles exactly 1, scalene nothing) and the alphabet archetypes into the four-way scheme: both, only line, only rotational, neither',
    'Explain why a dilation is the one motion that is a symmetry of nothing but a point, bridging to Lesson 5.4',
  ],
  prerequisites: ['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea'],
  sources: ['geo-ncert-symmetry-ground-131', 'geo-common-core-gco-ground-131'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. symmetry as motion                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Symmetry as motion: when a figure carries itself onto itself' },
    {
      kind: 'para',
      text: 'Chapter 5 has so far treated rigid motions as CARRIERS: a translation hauled one triangle onto another, a reflection flipped a figure onto its mirror twin, a rotation turned one shape into a copy sitting at a new angle. In every one of those scenes there were two figures — a start and an end — and the motion was the bridge between them. This lesson collapses the two figures into one. A SYMMETRY of a figure is a rigid motion that carries the figure ONTO ITSELF: a motion $M$ with $M(F) = F$, where the image and the original coincide exactly, point for point. Nothing moves to a new place; the figure lands back on its own footprints. The motion is still there — a reflection still flips, a rotation still turns — but the figure it acts on is its own destination. Symmetry is the chapter\u2019s whole machinery pointed at a single object.',
    },
    {
      kind: 'para',
      text: 'The definition inherits every discipline of the two lessons before it, and it is worth pausing on how much work those lessons quietly do here. From Lesson 5.1 we take the roster of motions — slides, flips, turns, all distance-preserving — and the guarantee that each one is a rigid map of the whole plane. From Lesson 5.2 we take composition: if two motions each carry $F$ onto itself, their composition does too (do the first, the figure returns to itself; do the second, it returns again), so the symmetries of a figure form a closed family with the identity among them. That closure is why censuses like the ones in this lesson are FINITE lists of numbers — how many mirror lines, what order of rotation — rather than open-ended hunts: the symmetries assemble into a tidy structure, and the census counts its members.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Line symmetry and rotational symmetry (the working definitions)',
      text: 'A figure $F$ has LINE SYMMETRY when some reflection carries $F$ onto itself; the mirror of that reflection is called a mirror line (or axis) of the figure. A figure $F$ has ROTATIONAL SYMMETRY when some rotation through a NON-ZERO angle carries $F$ onto itself. The ORDER of rotational symmetry is the number of distinct rotations (the identity included) that carry $F$ onto itself — equivalently, the number of times the figure coincides with itself during one full $360^\\circ$ turn. The ANGLE OF ROTATION is $360^\\circ$ divided by the order: the smallest positive turn that lands the figure back on itself. A figure with no non-identity rotation has order 1 — the identity alone.',
    },
    {
      kind: 'para',
      text: 'Two reading notes on the definitions, because both carry weight later. First, the mirror line is not a property of the paper — it is a full line of the plane, and the reflection acts on EVERYTHING, not just the figure\u2019s outline: the reflection in a mirror line carries each point of the plane to its mirror twin, and the figure happens to land on itself. Second, the identity rotation technically fixes every figure, which is why the definition of rotational symmetry demands a NON-ZERO angle: without that clause, every blob in the universe would claim rotational symmetry through the trivial do-nothing turn. The order counts the identity among its members (a symmetric figure of order 4 has FOUR fixing rotations: $90^\\circ$, $180^\\circ$, $270^\\circ$ and $0^\\circ$), but the identity never CONFERNS symmetry — only the non-identity motions do.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the two kinds of symmetry. Left: line symmetry, where the reflection in the dashed mirror line folds the figure onto itself — NCERT\u2019s fold test made rigorous. Right: rotational symmetry, where a 90° turn about the marked centre carries the 4-blade pinwheel onto itself (order 4, angle of rotation 90°). The two kinds are independent: a figure can carry either, both, or neither.',
      svg: geo53SymIdea('Left, an isosceles triangle folded onto itself across a dashed vertical mirror line. Right, a four-blade pinwheel rotated onto itself by a 90-degree turn about its centre, with an arc marking the quarter turn and the caption order 4, angle 90 degrees.'),
    },
    {
      kind: 'para',
      text: 'The deepest habit this lesson builds is the FIXED-SET view: stop asking what a motion does to pairs of figures and start asking which figures it leaves alone. From that vantage the whole chapter reorganizes itself. The reflection of Lesson 5.1 was defined by its mirror; now the mirror line of a figure is the figure\u2019s own bisector machinery — every mirror line of a polygon runs through vertices, side midpoints, or the intersection of diagonals, the same landmarks the congruence chapters taught you to hunt for. The rotation of Lesson 5.1 needed a centre and an angle; now the centre of rotational symmetry of a quadrilateral is exactly the diagonal intersection that the parallelogram\u2019s diagonals taught you to compute. Symmetry is not a new topic bolted onto the motions — it is the motions, finally standing still.',
    },
    {
      kind: 'para',
      text: 'And the two kinds are independent — this is the structural fact the whole lesson will drum in by census. A figure can have line symmetry without rotational symmetry (the isosceles triangle: one fold, no turn beyond the identity); rotational symmetry without line symmetry (the generic parallelogram: a perfect half-turn, not one honest mirror); both at once (the square: four folds and four turns); or neither (the scalene triangle: nothing). Because the two properties answer different questions — does a FLIP fix it, does a TURN fix it — neither can force the other, and any census worth trusting must count them separately. That is exactly what the next five sections do: first the regular polygons, where the census comes out maximally tidy; then the quadrilaterals, where four shapes earn four different answers; then the triangles; then the brute-force machine that PROVES every count; and finally the world beyond polygons — wheels, fans, and the alphabet.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The word, and NCERT\u2019s two readings',
      text: 'Symmetry comes from the Greek symmetria — “same measure” — and it entered mathematics as a claim about PROPORTION before it became a claim about motion. The school treatment keeps both residues. NCERT\u2019s classic presentation reads line symmetry as the fold test (fold the paper along the line: do the two halves coincide?) and rotational symmetry through the pinwheel and the turnstile: rotate the figure through one full turn and COUNT the positions in which it looks unchanged — that count is the order, and the smallest angle between two matches is the angle of rotation. Both readings are exactly the motion definition of this lesson: a fold is a reflection that carries the figure onto itself; a matching position in the turn is a rotation that does the same. The vocabulary of this lesson — mirror line, centre of rotation, order, angle of rotation — is NCERT\u2019s, and the Common Core standard G-CO.3 states the same idea the transformation way: identify the rotations and reflections that carry a given figure onto itself.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the mirror census of the regular polygons                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The mirror census of the regular polygons' },
    {
      kind: 'para',
      text: 'Nowhere is the fixed-set view more rewarding than on the regular polygons, because a regular polygon is maximal symmetry made visible: $n$ equal sides forcing $n$ equal angles, every vertex interchangeable with every other. A figure that regular cannot help but be symmetric, and the census asks the two questions of this lesson and answers both with the same number. How many mirror lines does a regular $n$-gon carry? Exactly $n$. What is its order of rotational symmetry? Exactly $n$. The count of folds and the count of turns coincide — and the engine behind this lesson verified it by brute force, reflecting each polygon\u2019s coordinate vertices across 360 candidate lines through the centre (one every half degree) and rotating them through every one-degree turn, for $n = 3$, $4$, $5$, $6$, $8$ and $10$, before a word of this census was allowed to stand.',
    },
    {
      kind: 'para',
      text: 'The mirror lines themselves come in two flavours, and the hexagon in the figure below displays both. For odd $n$, every mirror line runs from a VERTEX to the midpoint of the opposite side — the pentagon\u2019s five axes each pierce one apex. For even $n$, the axes alternate: half run through opposite VERTICES, half through opposite SIDE MIDPOINTS. The hexagon ($n = 6$) carries three vertex axes and three side axes; the square ($n = 4$) carries two of each, which is precisely the pair of diagonals plus the pair of midlines that Section 3 will count again as 4. In every case the $n$ mirror lines are evenly spaced at angles of $180/n$ degrees apart — half the angle of rotation — and all of them pass through the centre, a fact Section 5 will prove rather than observe.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the regular polygon mirror census. The hexagon drawn with all six mirror lines (three through opposite vertices, three through opposite side midpoints, evenly spaced at 30°), beside the square (4 lines), pentagon (5) and octagon (8). Every regular n-gon carries exactly n mirror lines, rotational order n, and angle of rotation 360/n.',
      svg: geo53RegularCensus('A regular hexagon with its six dashed mirror lines through the centre, beside smaller square, pentagon and octagon each drawn with their full sets of four, five and eight dashed mirror lines.'),
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The regular polygon census (the mirror law and the turn law)',
      text: 'A regular $n$-gon ($n$ at least 3) carries EXACTLY $n$ mirror lines and has rotational symmetry of EXACTLY order $n$. The angle of rotation is $360^\\circ / n$: the smallest turn that maps the polygon onto itself, and every multiple of it up to $360^\\circ$ works too. Witnesses: $n = 3$ gives $120^\\circ$; $n = 4$ gives $90^\\circ$; $n = 5$ gives $72^\\circ$; $n = 6$ gives $60^\\circ$; $n = 8$ gives $45^\\circ$; $n = 10$ gives $36^\\circ$. The order is exact, not a floor: rotating the square by $89^\\circ$ or $91^\\circ$ fails — only the multiples of $90^\\circ$ survive, exactly four turns in a full circle.',
    },
    {
      kind: 'table',
      caption: 'The regular n-gon census for n = 3, 4, 5, 6, 8, 10 — mirror lines, rotational order and angle of rotation; every cell recomputed by the engine\u2019s sweep',
      head: ['Regular n-gon', 'Mirror lines', 'Rotational order', 'Angle of rotation'],
      rows: [
        ['equilateral triangle (n = 3)', '3 mirror lines', 'order 3', '$120^\\circ$'],
        ['square (n = 4)', '4 mirror lines', 'order 4', '$90^\\circ$'],
        ['regular pentagon (n = 5)', '5 mirror lines', 'order 5', '$72^\\circ$'],
        ['regular hexagon (n = 6)', '6 mirror lines', 'order 6', '$60^\\circ$'],
        ['regular octagon (n = 8)', '8 mirror lines', 'order 8', '$45^\\circ$'],
        ['regular decagon (n = 10)', '10 mirror lines', 'order 10', '$36^\\circ$'],
      ],
    },
    {
      kind: 'para',
      text: 'The identity between the two counts — $n$ mirrors and order $n$ — deserves a moment of admiration, because for these figures it is not a coincidence but a bookkeeping identity. A turn of $360/n$ degrees cycles the vertices one step around: vertex 1 lands on vertex 2, 2 on 3, and so on home. Composing that quarter-step turn with itself $n$ times returns every vertex to its start, so the rotations fixing the polygon are exactly the $n$ multiples of $360/n$ — order $n$, no more no less. The mirrors line up with the same cycle: each mirror either pins a vertex (and swaps the vertices symmetric about it) or pins a side midpoint, and the $n$ evenly spaced choices exhaust the axes. Same cycle, two readings — folds counted one way, turns counted the other.',
    },
    {
      kind: 'derivation',
      title: 'Why order n forces the angle 360/n',
      statement: 'If a figure has rotational symmetry of order $n$, its angle of rotation — the smallest positive turn fixing it — is exactly $360^\\circ / n$. The argument is a division of the full turn, and it is worth owning cold.',
      steps: [
        {
          label: 'The matches must divide the turn',
          explanation: 'Let the smallest positive fixing turn be $\\theta$. If the figure matches itself at $\\theta$, it matches at every multiple of $\\theta$ (do the turn again, and again — each composition still fixes the figure, by the closure of Lesson 5.2). So the full $360^\\circ$ circle is tiled by copies of $\\theta$.',
        },
        {
          label: 'Count the tiles',
          formula: 'k\\theta = 360^\\circ \\quad \\text{for some whole number } k',
          explanation: 'Some whole number $k$ of the small turns makes up the full circle — the $(k+1)$-st application would overshoot into a turn that must also fix the figure but is smaller than $\\theta$ unless the tiles close exactly. So $360^\\circ = k\\theta$: the fixing turns in a full circle are exactly $k$, the order.',
        },
        {
          label: 'Read the order off the tiles',
          formula: '\\text{order} = k, \\qquad \\theta = \\frac{360^\\circ}{k} = \\frac{360^\\circ}{\\text{order}}',
          explanation: 'The number of matches in one full turn IS the order — NCERT\u2019s counting reading — and the smallest angle between consecutive matches is the total divided by the count. For the wheel of Section 6: 8 matches, angle $360/8 = 45^\\circ$. For the fan: 5 matches, $360/5 = 72^\\circ$.',
        },
        {
          label: 'Why the engine still brute-forces it',
          explanation: 'The one-line argument assumes the matches are evenly spaced — true for rotations fixing a set, since the composition of two fixing rotations fixes it and the family is closed. The engine verifies the conclusion the honest way anyway: rotating each witness through every degree from 1 to 359 and recording the smallest survivor. Agreement between the clever argument and the dumb machine is what a pin means.',
        },
      ],
      result: 'Order $n$ means $n$ evenly spaced matches in a full turn, so the angle of rotation is $360^\\circ / n$ — one law with the count built in.',
    },
    {
      kind: 'formula',
      name: 'The mirror census law (regular polygons)',
      latex: '\\text{mirror lines} = n \\;=\; \\text{rotational order}, \\qquad \\text{angle of rotation} = \\frac{360^\\circ}{n}',
      note: 'For a regular n-gon. Witnesses: 120°, 90°, 72°, 60°, 45°, 36° at n = 3, 4, 5, 6, 8, 10.',
    },
    {
      kind: 'formula',
      name: 'The angle-of-rotation law',
      latex: '\\text{order} \\times \\text{angle of rotation} = 360^\\circ',
      note: 'Order counts the matches in a full turn; the angle is the smallest gap between them. One product, pinned at 360° for every rotationally symmetric figure.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the quadrilateral census                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The quadrilateral census: four shapes, four different answers' },
    {
      kind: 'para',
      text: 'The quadrilateral family is where the census earns its keep, because here the answers stop being uniform and start being a diagnostic. Four figures with four sides each — square, rectangle, rhombus, generic parallelogram — turn out to carry FOUR different mirror counts: $4$, $2$, $2$, $0$. The rotational orders diverge less (all at least 2), and that divergence pattern is the lesson\u2019s first big lesson in itself: extra constraints (equal angles, equal sides) purchase mirrors, while the bare parallelogram structure purchases only turns. The engine re-derived the whole column by the 180-candidate mirror sweep of Section 5 — reflecting each witness\u2019s coordinates across one candidate line per degree through the centre — and the column it returned is the one printed here.',
    },
    {
      kind: 'para',
      text: 'Start from the top. The SQUARE $(0,0)$, $(4,0)$, $(4,4)$, $(0,4)$ is the regular 4-gon, so the regular-polygon census applies with $n = 4$: four mirror lines — the two midlines $x = 2$ and $y = 2$ and the two diagonals $y = x$ and $y = 4 - x$, at $45^\\circ$, $90^\\circ$, $135^\\circ$ and $0^\\circ$ to each other — and rotational order 4 with angle $90^\\circ$ about the centre $(2,2)$. The RECTANGLE $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$ loses the equal sides and immediately loses two mirrors: its diagonals connect unequal side-pairs and fail the vertex chase (Exercise 14 chases the vertices off the figure), leaving exactly the two midlines $x = 3$ and $y = 2$ — the perpendicular bisectors of the opposite sides. Its centre survives as the diagonal intersection $(3,2)$: the $180^\\circ$ turn about that point maps $(0,0)$ to $(6,4)$, $(6,0)$ to $(0,4)$, and each of the other two vertices to its opposite — order 2, angle $180^\\circ$.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the three-panel quadrilateral census. The square carries all four lines (two midlines green, two diagonals amber); the rectangle keeps only the two midlines (its diagonals drawn red — attempted and failed); the rhombus keeps only the two diagonals (its attempted midlines drawn red and failed). Mirror counts 4, 2, 2 — and the parallelogram below completes the census at 0.',
      svg: geo53QuadCensus('Three panels: a square with four dashed mirror lines, a rectangle with its two midlines dashed and its diagonals marked as failing, and a rhombus with its two diagonal mirror lines dashed and its midlines marked as failing.'),
    },
    {
      kind: 'para',
      text: 'The RHOMBUS $(0,0)$, $(2,1)$, $(4,0)$, $(2,-1)$ is the rectangle\u2019s mirror image in the census — literally. Equal SIDES replace equal angles as the constraint, and the surviving mirrors swap teams: the rhombus\u2019s diagonals ARE mirror lines (the diagonal from $(0,0)$ to $(4,0)$ bisects the angles at both ends and swaps the two off-axis vertices $(2,1)$ and $(2,-1)$; so does the vertical diagonal from $(2,1)$ to $(2,-1)$), while its would-be midlines — the perpendicular bisectors between opposite sides — are not (they cut across unequal sides, and the sweep kills them). All four sides measure $\\sqrt{5} = 2.2360680$; the diagonals measure $4$ and $2$, unequal; and the sweep returns exactly two survivors, at $0^\\circ$ and $90^\\circ$ — the diagonals. Rotational order 2 about the centre $(2,0)$, where the diagonals cross.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Midlines and diagonals: each figure keeps its own pair',
      text: 'The most common examination slip in this census is crediting the rectangle with four mirror lines (the square\u2019s generosity) or crediting the rhombus with four (the same slip from the other side). Check the sides: the rectangle\u2019s diagonals join vertices with UNEQUAL adjacent sides, so no reflection across a diagonal can map the figure onto itself — a reflection preserves length and would have to swap unequal sides. The rhombus\u2019s midlines run between unequal sides too and die the same death. Exactly one of the two pairs survives in each figure: the rectangle keeps its midlines, the rhombus keeps its diagonals, and only the square keeps both. Draw all four candidates, chase the vertices, and let the refusals be visible.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the parallelogram\u2019s failed mirror, vertex by vertex. Reflecting B(5,0) in the diagonal AC lands at (4,3) and reflecting D(1,2) lands at (2,−1) — both off the figure. The root cause is printed on the sides: AB = 5 but AD = √5 ≈ 2.2361, and a reflection preserves length.',
      svg: geo53FailedMirror('A parallelogram with vertices A, B, C and D, its diagonal AC drawn as a dashed red attempted mirror, side AB labelled 5 and side AD labelled root 5 about 2.2361, and arrows chasing B to an open point at (4,3) and D to an open point at (2, −1) outside the figure.'),
    },
    {
      kind: 'para',
      text: 'And then the bottom of the column — the famous case. The GENERIC PARALLELOGRAM $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$ carries ZERO mirror lines. Not one. Every candidate through the centre dies, and the diagonal AC dies visibly: the reflection of $B(5,0)$ across it lands at $(4,3)$ and that of $D(1,2)$ lands at $(2,-1)$, both strictly off the figure. The structural reason is the unequal adjacent sides: $AB = 5$ exactly while $AD = \\sqrt{5} = 2.2360680$, and any reflection mapping the figure onto itself would have to swap the sides meeting at $A$ — reflections preserve length, and $5 \\neq \\sqrt{5}$. The same inequality kills every other candidate line, as Section 5\u2019s derivation makes airtight. Yet the SAME figure turns a perfect half-turn: about the diagonal intersection $(3,1)$, the $180^\\circ$ rotation maps $(0,0) \\to (6,2)$, $(5,0) \\to (1,2)$, $(6,2) \\to (0,0)$, $(1,2) \\to (5,0)$ — every vertex onto its opposite, order 2, angle $180^\\circ$. NCERT singles this figure out as THE rotational-only case: a shape that a turn fixes but no fold ever will.',
    },
    {
      kind: 'derivation',
      title: 'Why the generic parallelogram has zero mirror lines yet order 2',
      statement: 'For the parallelogram with vertices $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$: no reflection maps it onto itself, but the $180^\\circ$ rotation about $(3,1)$ does. Both halves are proved, not observed.',
      steps: [
        {
          label: 'Any mirror must pass through the centre',
          explanation: 'A reflection carrying the vertex set onto itself must fix the set\u2019s centroid (the centroid of the image equals the image of the centroid, and the set is unchanged). The centroid here is $(3,1)$ — which is also where the diagonals cross. So the only candidates are the lines through $(3,1)$; every other line in the plane is eliminated without being tested.',
        },
        {
          label: 'A mirror must swap equal-length sides at every vertex it unpins',
          formula: 'AB = 5, \\quad AD = \\sqrt{5}, \\quad AB \\neq AD',
          explanation: 'A reflection fixing vertex $A$ (a line through $A$ and the centre) would swap the two sides leaving $A$: side $AB$ of length $5$ with side $AD$ of length $\\sqrt{5} = 2.2360680$. A reflection preserves every distance, so it cannot map a segment of length 5 onto one of length $\\sqrt{5}$. Every candidate through $A$ dies. The same inequality (read at the other vertices) kills the candidates through $B$, $C$ and $D$.',
        },
        {
          label: 'The centre-piercing candidates die by the vertex chase',
          explanation: 'The remaining candidates through $(3,1)$ but not through any vertex include the diagonal $AC$ itself: reflecting $B(5,0)$ in the line $AC$ lands at $(4,3)$ and reflecting $D(1,2)$ lands at $(2,-1)$ — neither is a vertex, so the line fails. The 180-candidate sweep of Section 5 runs this chase on every remaining line through the centre and reports zero survivors.',
        },
        {
          label: 'The half-turn succeeds',
          formula: 'R_{180}(P) = 2O - P \\quad \\text{with } O = (3,1)',
          explanation: 'The rotation through $180^\\circ$ about $O$ sends each point $P$ to $2O - P$: $(0,0) \\to (6,2)$, $(5,0) \\to (1,2)$, $(6,2) \\to (0,0)$, $(1,2) \\to (5,0)$. Each vertex lands exactly on its opposite — which is precisely the statement that the diagonals bisect each other, the parallelogram\u2019s defining property from Chapter 3, now re-read as a symmetry.',
        },
      ],
      result: 'Zero mirror lines (the unequal adjacent sides 5 and √5 block every candidate) yet rotational order 2 about the diagonal intersection (3,1) — the rotational-only case, proved both ways.',
    },
    {
      kind: 'table',
      caption: 'The quadrilateral census — the engine\u2019s 180-candidate sweep and rotation census, one row per shape; centres are the diagonal intersections',
      head: ['Shape (witness)', 'Mirror lines', 'Rotational order', 'Centre of rotation', 'Angle'],
      rows: [
        ['square (0,0),(4,0),(4,4),(0,4)', '4 mirror lines', 'order 4', '(2,2)', '$90^\\circ$'],
        ['rectangle (0,0),(6,0),(6,4),(0,4)', '2 mirror lines (the midlines)', 'order 2', '(3,2)', '$180^\\circ$'],
        ['rhombus (0,0),(2,1),(4,0),(2,−1)', '2 mirror lines (the diagonals)', 'order 2', '(2,0)', '$180^\\circ$'],
        ['parallelogram (0,0),(5,0),(6,2),(1,2)', '0 mirror lines', 'order 2', '(3,1)', '$180^\\circ$'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 4. the triangle census                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The triangle census: three sides, three answers' },
    {
      kind: 'para',
      text: 'Triangles run the same census with a smaller cast and a sharper moral. The EQUILATERAL triangle $(0,0)$, $(3,0)$, $(1.5, 2.5981)$ is the regular 3-gon: three mirror lines — one from each vertex down to the midpoint of the opposite side — and rotational order 3 with angle $120^\\circ$ about the centre. All three sides measure 3, and the engine\u2019s sweep finds the survivors at $30^\\circ$, $90^\\circ$ and $150^\\circ$, evenly spaced by $60^\\circ$... one third of the circle\u2019s mirror spacing $180/3$, exactly as the regular census promises. Nothing about the triangle census is new machinery; it is the regular census at $n = 3$, witnessed on coordinates.',
    },
    {
      kind: 'para',
      text: 'The ISOSCELES triangle $(0,0)$, $(4,0)$, $(2,3)$ keeps exactly one mirror line: the vertical axis $x = 2$, which runs from the apex $(2,3)$ down the median to the base midpoint $(2,0)$ — the fold that swaps the two equal sides $\\sqrt{13} = 3.6055513$ with each other and pins the base. And then the census stops: the sweep returns exactly one survivor, and the rotation census returns order 1 — NO non-identity turn fixes the triangle (a $180^\\circ$ turn about any point would put the apex at the bottom). This is NCERT\u2019s line-symmetry-only archetype, the geometric twin of the letter A, and together with the parallelogram it completes the independence demonstration: the isosceles triangle has a mirror and NO rotation; the parallelogram has rotation and NO mirror. Either property can live without the other.',
    },
    {
      kind: 'para',
      text: 'The SCALENE triangle $(0,0)$, $(5,0)$, $(2,3)$ carries nothing: zero mirror lines (its sides measure $5$, $\\sqrt{18} = 4.2426407$ and $\\sqrt{13} = 3.6055513$ — all different, and a reflection would have to swap equal sides it does not have) and order 1 (no non-identity turn fixes it). It is the geometric twin of the letter F, and the bottom row of every classification table in this lesson. One honesty note, recorded because the engine caught it: the triangle $(0,0)$, $(5,0)$, $(1,3)$ that a first draft proposed as the scalene witness is NOT scalene — its sides $AB$ and $BC$ both measure exactly $5$, making it isosceles with a genuine mirror line of slope $-1/3$ through $B$, one a coarse one-degree sweep never samples. The lesson\u2019s witness is the honestly scalene $(0,0)$, $(5,0)$, $(2,3)$, verified at half-degree granularity. Census claims deserve their verification down to the last degree.',
    },
    {
      kind: 'figure',
      caption: 'Figure F7 — the triangle census. The equilateral triangle with its three mirror lines (order 3, angle 120°); the isosceles triangle with its single mirror line down the axis (and no rotational symmetry); the scalene triangle with sides 5, 4.24, 3.61 and no symmetry of either kind.',
      svg: geo53TriCensus('Three triangles side by side: an equilateral triangle with three dashed mirror lines, an isosceles triangle with one dashed vertical mirror line, and a scalene triangle with no mirror lines at all.'),
    },
    {
      kind: 'table',
      caption: 'The triangle census — one row per side discipline; every verdict engine-checked by the mirror sweep',
      head: ['Triangle (witness)', 'Sides', 'Mirror lines', 'Rotational order'],
      rows: [
        ['equilateral (0,0),(3,0),(1.5,2.5981)', '3, 3, 3', '3 mirror lines', 'order 3 ($120^\\circ$)'],
        ['isosceles (0,0),(4,0),(2,3)', '4, √13, √13', 'exactly 1 mirror line', 'order 1 — none'],
        ['scalene (0,0),(5,0),(2,3)', '5, 4.2426, 3.6056', '0 mirror lines', 'order 1 — none'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 5. how the census is proved: the brute-force machine           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'How the census is proved: the brute-force mirror sweep' },
    {
      kind: 'para',
      text: 'Every census so far has been reported; this section proves the reporting machine, because a census you cannot re-derive is a census you cannot trust. The machine rests on one lemma and one bookkeeping fact. The LEMMA: any mirror line of a figure must pass through its centroid. The proof is one line — a reflection carrying a finite vertex set onto itself carries its centroid onto the centroid of the image, and the image IS the original set, so the centroid is FIXED, and the fixed points of a reflection are exactly the points of its mirror. (The same argument in the rotational direction pins the centre of rotation: the centroid of a rotationally symmetric set sits on the centre.) The BOOKKEEPING: a line has no arrow — the reflection in the line through the centre at angle $\\theta$ is the same reflection as at $\\theta + 180^\\circ$ — so the infinitely many lines through the centre collapse to a finite fan: $180^\\circ$ worth of directions, one candidate per degree (or per half-degree when the axes refuse to sit on whole degrees). The census becomes a FINITE sweep.',
    },
    {
      kind: 'derivation',
      title: 'The sweep lemma: every mirror line passes through the centroid',
      statement: 'If a reflection maps a figure\u2019s vertex set $V$ onto itself, then the mirror passes through the centroid of $V$. Dually, if a rotation maps $V$ onto itself, its centre is the pivot about which the centroid sits still.',
      steps: [
        {
          label: 'Image of the centroid',
          formula: 'G = \\frac{1}{n}\\sum_{i=1}^{n} V_i \\quad\\Rightarrow\\quad M(G) = \\frac{1}{n}\\sum_{i=1}^{n} M(V_i)',
          explanation: 'Every rigid motion commutes with averaging: the image of an average is the average of the images, because the motion is an affine map and additions and divisions survive it. So the centroid of the image set is $M(G)$.',
        },
        {
          label: 'The set is its own image',
          explanation: 'If $M$ is a symmetry, the image set equals the original set — same points, possibly relabelled. A set has ONE centroid regardless of the order you sum it in, so the centroid of the image is $G$ itself: $M(G) = G$.',
        },
        {
          label: 'Fixed points of a reflection',
          explanation: 'A reflection fixes exactly the points of its mirror line. So $G$ fixed forces $G$ onto the mirror: the mirror passes through the centroid. For the rectangle witness the centroid is $(3,2)$ — the diagonal intersection — so the sweep tests only lines through $(3,2)$; for the parallelogram it is $(3,1)$; for the rhombus $(2,0)$; for the square $(2,2)$. The centres of Section 3 were never assumptions; they were lemmas.',
        },
        {
          label: 'Finishing the finiteness',
          formula: '\\theta \\equiv \\theta + 180^\\circ \\pmod{180^\\circ}',
          explanation: 'Lines through a point come in a one-parameter family of directions modulo a half-turn, so $180$ one-degree candidates (or $360$ half-degree candidates when a figure\u2019s axes sit between degrees) exhaust them. The sweep is a finite loop, and its verdict is a proof: a line that fails the vertex chase is not a mirror, and a line that survives every chase is one.',
        },
      ],
      result: 'Every mirror line of a figure pierces its centroid; every candidate direction through that centre can be tested; the census is therefore a finite, exhaustive, mechanically checkable sweep.',
    },
    {
      kind: 'figure',
      caption: 'Figure F6 — the 180° witness. Both diagonals of the parallelogram cross at (3,1), and the half-turn about that point swings every vertex onto its opposite (the green arc marks the turn). The figure that refused every mirror still turns perfectly onto itself: rotational-only symmetry, order 2, angle 180°.',
      svg: geo53CentreWitness('A parallelogram with both diagonals drawn dashed and crossing at the marked centre (3,1), a green arc showing a half turn about that centre, and the caption that each vertex lands on its opposite while no mirror survives.'),
    },
    {
      kind: 'para',
      text: 'Run the machine and collect the verdicts. The parallelogram $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$: $0$ of the $180$ candidates survive. The rectangle: exactly $2$ (the midlines at $0^\\circ$ and $90^\\circ$; both diagonal directions $33.69^\\circ$ and $146.31^\\circ$ die by the vertex chase). The rhombus: exactly $2$ (the diagonals — which as lines through the centre sit at $0^\\circ$ and $90^\\circ$). The square: exactly $4$ ($0^\\circ$, $45^\\circ$, $90^\\circ$, $135^\\circ$ — midlines and diagonals both survive). The equilateral triangle: $3$; the isosceles: $1$; the scalene: $0$. Seven witnesses, one sweep, one column of numbers — the column the tables of Sections 2, 3 and 4 printed, now earned.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The granularity trap: coarse sweeps can miss real mirrors',
      text: 'A sweep is only as honest as its grid. The draft witness triangle $(0,0)$, $(5,0)$, $(1,3)$ reports ZERO surviving mirrors on a one-degree sweep — and yet it has one: $|AB| = |BC| = 5$ exactly, so the triangle is isosceles with its mirror along the line of slope $-1/3$ through $B(5,0)$, an axis sitting at $161.565^\\circ$ between the grid points. The engine\u2019s finer check (reflecting the vertices in that exact line) catches what the coarse grid hid, and the lesson\u2019s scalene witness was replaced by the genuinely scalene $(0,0)$, $(5,0)$, $(2,3)$. Moral, worth keeping for every brute-force argument in this book: a sweep that finds nothing has found nothing ON ITS GRID; the verdict becomes a proof only when the grid is fine enough — or when a structural argument (here, the unequal-sides chase) covers the gaps between the grid points.',
    },
    {
      kind: 'list',
      marker: 'decimal',
      items: [
        'The sweep is DEDUCTIVE, not observational: each candidate line is a hypothesis, the vertex chase is its test, and only survivors are reported — the machine never takes a figure\u2019s word for its own symmetry.',
        'The sweep is EXHAUSTIVE by the lemma: with all lines through the centroid tested (and the half-turn equivalence halving the work), no mirror can hide between candidates except on a coarse grid — the trap the callout above documents.',
        'The sweep is REUSABLE: the same 180-candidate loop settles the quadrilateral census, the triangle census and (at half-degree) the wheel, the fan and the alphabet outlines of Section 6 — one machine, every verdict in this lesson.',
        'The sweep EXPLAINS the counts, not just the numbers: the rectangle\u2019s two survivors are its midlines because only they swap equal opposite sides; the rhombus\u2019s two are its diagonals for the same reason with sides and angles exchanged; the square\u2019s four are both pairs at once.',
      ],
    },
    {
      kind: 'para',
      text: 'It is worth noticing what the machine did NOT need: it never used a formula about angles, never measured an area, never appealed to similarity. The whole census runs on the two structures Lessons 5.1 and 5.2 built — reflections and rotations as rigid motions, composition for the closure — plus coordinates. That is the transformation-first promise of this chapter kept: the motions are the objects, the figures are their fixed sets, and the properties of the motions alone decide every question the census asks. The next section takes the machine into the world beyond the textbook polygons, where the fixed sets are wheels and letters and the answers stop being polygon-flavoured at all.',
    },

    /* -------------------------------------------------------------- */
    /* 6. beyond polygons: wheels, fans, and the alphabet             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Beyond polygons: wheels, fans, and the alphabet census' },
    {
      kind: 'para',
      text: 'Symmetry does not stop at polygon boundaries, and neither does the machine. The 8-SPOKE WHEEL is the order-8 archetype: eight spokes evenly spaced at $45^\\circ$, so the wheel matches itself eight times in a full turn — order 8, angle of rotation $360/8 = 45^\\circ$. The wheel also carries eight mirror lines (four along spoke directions and four bisecting the gaps between spokes — the engine\u2019s half-degree sweep finds them at $0^\\circ$, $22.5^\\circ$, $45^\\circ$, $67.5^\\circ$ and their opposites), but the headline number is the order: spin a wheel one spoke\u2019s worth and the eye cannot tell. The 5-BLADE FAN is the same structure at order 5: five blades at $72^\\circ$ apart, five matches per turn, angle $360/5 = 72^\\circ$, and five mirror lines along the blade axes at $18^\\circ$, $54^\\circ$, $90^\\circ$, $126^\\circ$ and $162^\\circ$. Order and angle obey the product law of Section 2 in both cases — order times angle is exactly $360^\\circ$ — and the counting reading (how many matches in one full spin?) works even when there is no polygon anywhere in sight.',
    },
    {
      kind: 'figure',
      caption: 'Figure F5 — the rotational-order wheel. Eight spokes evenly spaced at 45° with the amber arc marking one spoke-to-spoke turn: order 8, angle of rotation 45°, and the order-angle law 8 × 45° = 360° printed beside it.',
      svg: geo53OrderWheel('A wheel with eight spokes at 45-degree spacing, an amber arc marking the 45-degree turn between adjacent spokes, and a panel stating that the order is the number of matches per full turn and the angle equals 360 divided by the order.'),
    },
    {
      kind: 'figure',
      caption: 'Figure F10 — the 5-blade fan. Five blades at 72° with the green arc marking the blade-to-blade turn: order 5, angle 72°, five matches per full turn — the product law 5 × 72° = 360° on a shape with no sides to count.',
      svg: geo53Fan('A five-blade fan with dashed blade axes and a green arc marking the 72-degree turn from one blade to the next, captioned order 5 and angle 360 divided by 5 equals 72 degrees.'),
    },
    {
      kind: 'para',
      text: 'Then the alphabet — the census everyone can run on the kitchen table. The capital letters sort into the four cells the lesson has been building all along. ONE mirror line each: A (the apex fold), M (the centre drop), T (down the stem), U, V, W and Y — line symmetry only, rotational order 1. TWO mirror lines and order 2: H (vertical and horizontal folds), I and X — the both-symmetries club in letter form. ROTATIONAL ONLY, order 2 and NO mirror: N, S and Z — the half-turn club, the alphabet\u2019s parallelograms. NOTHING: F, G, J, L, P and R — neither property, order 1, the scalene club. And O stands alone in a fifth cell the polygons never reach: the circle\u2019s census is INFINITE — every diameter is a mirror line and every angle is a rotation, so the order is unbounded and the angle of rotation collapses to zero. The engine verified the letter N and the letter Z the hard way, from coordinate outlines of ten corners each: the half-turn about the centre maps every corner onto its opposite (for the N: $(0,0) \\to (4,5)$, $(1,0) \\to (3,5)$, $(3,3) \\to (1,2)$, $(3,0) \\to (1,5)$, $(4,0) \\to (0,5)$) and none of the 360 candidate mirror lines survives.',
    },
    {
      kind: 'figure',
      caption: 'Figure F8 — the alphabet census strip. A M T U V W Y carry one mirror line each; H I X carry two lines plus order 2; N S Z carry order 2 and no mirror (the green arcs mark the half-turns); F G J L P R carry nothing; O carries the infinite census of the circle.',
      svg: geo53AlphabetStrip('Two rows of capital letters drawn as strokes: A, M and T each with one dashed vertical mirror line, H with two dashed mirror lines, N and Z with green half-turn arcs and no mirror lines, F with no marks, and O with an ellipse and both marks.'),
    },
    {
      kind: 'figure',
      caption: 'Figure F9 — the four-way classification. Both: square, rectangle, rhombus, the regular n-gons, H, I, X. Only line symmetry: the isosceles triangle, A, M, T, U, V, W, Y. Only rotational: the generic parallelogram, N, S, Z. Neither: the scalene triangle, F, G, J, L, P, R. (O rides above the table with its infinite census.)',
      svg: geo53FourWay('A two-by-two classification grid: BOTH with a small square carrying four mirror lines, ONLY LINE with a small isosceles triangle carrying one, ONLY ROTATIONAL with a small parallelogram whose mirror attempt fails, and NEITHER with a small scalene triangle, each cell listing its letter members.'),
    },
    {
      kind: 'table',
      caption: 'The four-way classification — the two census questions asked together; every cell carries a geometric witness and its letter twins',
      head: ['Cell', 'Mirror lines', 'Rotational order', 'Geometric witness', 'Letter members'],
      rows: [
        ['Both', 'at least 1', 'at least 2', 'square (4 lines, order 4); rectangle, rhombus (2, 2)', 'H, I, X'],
        ['Only line symmetry', 'exactly 1 (or more, order 1)', 'order 1', 'isosceles triangle (exactly 1)', 'A, M, T, U, V, W, Y'],
        ['Only rotational', '0 mirror lines', 'order 2', 'generic parallelogram (0 lines, order 2)', 'N, S, Z'],
        ['Neither', '0 mirror lines', 'order 1', 'scalene triangle (0 lines, order 1)', 'F, G, J, L, P, R'],
        ['The circle\u2019s cell', 'infinitely many', 'unbounded', 'O and every circle', 'O'],
      ],
    },
    {
      kind: 'para',
      text: 'The alphabet strip rewards one more reading, because it shows the census functioning as a DIAGNOSTIC rather than a list. Take an unfamiliar capital and ask the two questions in order: does a fold fix it (and how many folds), does a turn fix it (and what order)? The two answers place the letter in exactly one cell — the cells are jointly exhaustive and mutually exclusive, which is what makes the four-way table a classification rather than a bag of examples. A stencil-cut F fails both questions; a stencil-cut N passes the turn question and fails the fold question; a stencil-cut H passes both. Nothing in the procedure cares that the shapes are letters; the same two questions classified the parallelogram and the isosceles triangle three sections ago. One machine, run on everything.',
    },

    /* -------------------------------------------------------------- */
    /* 7. why symmetry earns its lesson                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Why symmetry earns its lesson' },
    {
      kind: 'para',
      text: 'A fair question at this point: the census is pretty, but what did it BUY? The first answer is structural, and it is the deepest. Symmetry is the fixed-set view of the rigid motions — the chapter\u2019s machinery finally acting on a single figure — and every landmark this book has taught reappears in the new light. The mirror line of a figure is its own bisector machinery: the axes of the census run through vertices, side midpoints, angle bisectors and perpendicular bisectors, the same construction points Chapter 3 taught. The centre of rotational symmetry of a quadrilateral is the diagonal intersection the parallelogram already made you compute — Section 3 never needed a new definition of \u201ccentre\u201d, because $(3,2)$, $(3,1)$, $(2,0)$ and $(2,2)$ were all found by crossing the diagonals, the skill the quadrilateral family drilled. Even the sweep lemma is old friends: a centroid fixed by a motion is the argument that Chapter 3\u2019s distance-preservation underwrites.',
    },
    {
      kind: 'para',
      text: 'The second answer is worldly, and closer than it looks. Every wheel you have ever ridden is order-8 or finer; every fan, every propeller, every flower with five petals (order 5, angle $72^\\circ$ — the fan of Section 6 with petals for blades), every snowflake (six mirrors and order 6, the hexagon\u2019s census in ice), every honeycomb cell (the hexagon again), every stop sign (the octagon\u2019s 8 and 45°), every tile pattern, every typeface designed to be read upside down on a spade or an aeroplane — all of them are the census of this lesson, out in the world. Engineers check symmetry before balancing a wheel, because rotational symmetry of order n about the axle is exactly the condition that the wheel runs true; printers check the alphabet\u2019s census before cutting a stencil; and NCERT\u2019s pinwheel-and-fold presentation exists because the two questions — does it fold, does it spin true — are questions about physical objects that mathematics answers exactly.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The census is a bridge in both directions',
      text: 'Look back and look forward. Backward: the census re-derived, in one lesson, nearly every landmark construction of Chapters 3 and 4 — angle bisectors, perpendicular bisectors, medians, diagonal intersections — as MIRROR LINES, each one now the axis of an actual rigid motion that carries the figure onto itself. Forward: one motion remains unclassified, and it is the motion Lesson 5.4 is about. A DILATION changes size — the one thing every rigid motion swore to preserve — so a dilation can be a symmetry of NOTHING except a single point (which any dilation about that point fixes trivially). Every figure in this lesson\u2019s census is dilation-proof: enlarge the parallelogram by $k = 2$ and no turn, fold or slide carries the enlarged copy onto the original, because size has moved. Lesson 5.4 takes that motion seriously anyway — enlargements turn out to be the engine of SIMILARITY, the fixed-set idea relaxed from \u201csame size\u201d to \u201csame shape\u201d — and this lesson\u2019s classification table is exactly the map of what similarity has to leave behind.',
    },
    {
      kind: 'para',
      text: 'The last word belongs to method, because the census was proved and not recited. Nothing in this lesson asked you to TRUST that the parallelogram has no mirrors: the sweep tested all 180 candidates, the vertex chase convicted each one, and the unequal sides 5 and $\\sqrt{5}$ explained why conviction was inevitable. Nothing asked you to trust that the rectangle\u2019s diagonals fail: Exercise 14 chases their vertices off the figure in two computed reflections. This is the chapter\u2019s method made visible — definitions by motions, theorems by composition, verdicts by brute force — and it is precisely the apparatus Lesson 5.4 will invert: there the motion will finally be allowed to change size, and the whole question will become how much structure survives when the one sacred promise breaks.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Examination notes (G-CO.3 and the school syllabus)',
      text: 'Examiners test this lesson with exactly five recurring moves. (1) State the census: a regular $n$-gon has $n$ mirror lines, order $n$, angle $360/n$ — and they probe the angles 120°, 90°, 72°, 60°, 45°, 36° for $n = 3, 4, 5, 6, 8, 10$. (2) Distinguish rectangle from rhombus: the rectangle\u2019s mirrors are the MIDLINES, the rhombus\u2019s are the DIAGONALS — crediting either figure with four lines is the classic lost mark. (3) The parallelogram: zero mirror lines yet order 2 about the diagonal intersection — state BOTH facts; half the answer earns half nothing. (4) The alphabet: sort given letters into the four cells, and the favourites are S and N (rotational-only) and H and I (two lines, order 2). (5) Find the order and angle of a given figure — count the matches in one full turn and divide 360 by the count. Justify with the vertex chase, not the eye: a reflection preserves length, so a mirror must swap equal sides.',
    },

    /* -------------------------------------------------------------- */
    /* 8. collected terms and laws                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected terms and laws of the lesson' },
    {
      kind: 'formula',
      name: 'The symmetry test (the two-question census)',
      latex: 'F \\text{ has a symmetry} \\iff \\exists \\text{ rigid motion } M,\\ M(F) = F; \\quad \\text{ask: does a fold fix } F \\text{? does a turn fix } F \\text{?}',
      note: 'Line symmetry: some reflection carries the figure onto itself. Rotational symmetry: some non-zero turn does. The two answers are independent — four cells.',
    },
    {
      kind: 'formula',
      name: 'The order-and-angle product law',
      latex: '\\text{order} \\times \\text{angle of rotation} = 360^\\circ',
      note: 'The wheel: 8 × 45°. The fan: 5 × 72°. The square: 4 × 90°. Every rotational symmetry obeys it.',
    },
    {
      kind: 'formula',
      name: 'The half-turn witness law',
      latex: 'R_{180,\\,O}(P) = 2O - P',
      note: 'The 180° rotation about O sends each point P to twice O minus P: the parallelogram\u2019s vertices swap in pairs about (3,1), the rectangle\u2019s about (3,2).',
    },
    {
      kind: 'terms',
      items: [
        { term: 'symmetry of a figure', def: 'A rigid motion $M$ with $M(F) = F$: a motion that carries the figure onto itself. The identity is always a (trivial) symmetry; the interesting ones are the reflections and non-identity rotations.' },
        { term: 'line symmetry', def: 'The property that some reflection carries $F$ onto itself. NCERT\u2019s fold test: fold along the mirror line and the halves coincide.' },
        { term: 'mirror line (axis)', def: 'The mirror of a reflection that fixes the figure. Every mirror line of a polygon runs through vertices, side midpoints or diagonal intersections, and all of them pass through the centroid.' },
        { term: 'rotational symmetry', def: 'The property that some rotation through a NON-ZERO angle carries $F$ onto itself. The identity never counts.' },
        { term: 'order of rotational symmetry', def: 'The number of distinct fixing rotations including the identity — equivalently, the number of matches in one full $360^\\circ$ turn. Order 1 means no rotational symmetry.' },
        { term: 'angle of rotation', def: '$360^\\circ$ divided by the order: the smallest positive turn carrying the figure onto itself. Wheel: $45^\\circ$; fan: $72^\\circ$; square: $90^\\circ$; parallelogram: $180^\\circ$.' },
        { term: 'centre of rotation', def: 'The fixed point of the fixing rotations — for the quadrilateral witnesses, always the diagonal intersection: $(2,2)$ square, $(3,2)$ rectangle, $(2,0)$ rhombus, $(3,1)$ parallelogram.' },
        { term: 'the regular polygon census', def: 'A regular $n$-gon carries exactly $n$ mirror lines (vertex axes and side axes alternating when $n$ is even) and rotational order $n$, with angle $360/n$: $120^\\circ$, $90^\\circ$, $72^\\circ$, $60^\\circ$, $45^\\circ$, $36^\\circ$ at $n = 3, 4, 5, 6, 8, 10$.' },
        { term: 'the quadrilateral census', def: 'Square: 4 mirror lines, order 4. Rectangle: exactly 2 (the midlines), order 2. Rhombus: exactly 2 (the diagonals), order 2. Generic parallelogram: 0 mirror lines, order 2 — the rotational-only case.' },
        { term: 'rotational-only symmetry', def: 'Rotational symmetry with NO mirror line. The archetype is the generic parallelogram: unequal adjacent sides 5 and $\\sqrt{5} = 2.2360680$ block every candidate reflection, while the half-turn about $(3,1)$ succeeds. Letter twins: N, S, Z.' },
        { term: 'the vertex chase', def: 'The refutation method: reflect the figure\u2019s vertices in a candidate mirror and check where they LAND. The parallelogram\u2019s diagonal AC sends $B(5,0)$ to $(4,3)$ and $D(1,2)$ to $(2,-1)$ — off the figure — so AC is no mirror.' },
        { term: 'the mirror sweep', def: 'The brute-force census machine: by the sweep lemma every mirror passes through the centroid, so test every candidate line through it (one per degree — 180 candidates — or per half-degree where axes sit between degrees) and count the survivors. Parallelogram 0, rectangle 2, rhombus 2, square 4, equilateral 3, isosceles 1, scalene 0.' },
        { term: 'the sweep lemma', def: 'Every mirror line of a finite figure passes through its centroid: the image of the centroid is the centroid of the image, the set is its own image, and a reflection\u2019s fixed points are exactly its mirror. Dual for rotations: the centre is where the centroid sits still.' },
        { term: 'the four-way classification', def: 'Both (mirrors and order at least 2: square, rectangle, rhombus, H, I, X) · only line symmetry (isosceles triangle, A, M, T, U, V, W, Y) · only rotational (parallelogram, N, S, Z) · neither (scalene triangle, F, G, J, L, P, R) — with O above the table in the circle\u2019s infinite cell.' },
        { term: 'the circle\u2019s infinite census', def: 'The letter O and every circle: every diameter is a mirror line and every angle is a rotation, so the mirror count and the rotational order are unbounded and no finite angle of rotation exists.' },
        { term: 'dilation (the non-symmetry, a preview)', def: 'The Lesson 5.4 motion: it multiplies every distance by $k$ and changes size. It is a symmetry of nothing except a single point — and that failure is precisely what similarity, the next lesson\u2019s topic, will relax and re-use.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. worked illustrations                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census at work: three illustrated chains' },
    {
      kind: 'example',
      title: 'Illustration 1 — the stop-sign census: a regular octagon',
      steps: [
        'Sol. Name the figure: a regular octagon, the stop-sign shape — 8 equal sides, 8 equal angles, vertices evenly spaced on a circle.',
        'Apply the regular census: a regular $n$-gon carries exactly $n$ mirror lines and order $n$, so the octagon carries 8 mirror lines and rotational order 8.',
        'Split the mirrors by flavour (n even): 4 axes through opposite VERTICES and 4 through opposite SIDE MIDPOINTS, evenly spaced at $180/8 = 22.5^\\circ$.',
        'Compute the angle of rotation: $360/8 = 45^\\circ$ — one spoke\u2019s worth of turn lands the sign back on itself, and 8 × 45° = 360° checks the product law.',
        'Check exactness the engine\u2019s way: a turn of $44^\\circ$ or $46^\\circ$ fails to map the vertex set onto itself — only the multiples of $45^\\circ$ survive, exactly 8 in a full turn.',
        'Hence the stop sign: 8 mirror lines (4 vertex, 4 side), order 8, angle of rotation 45°.',
      ],
      answer: '8 mirror lines (4 through opposite vertices, 4 through opposite side midpoints), rotational order 8, angle of rotation $360/8 = 45^\\circ$',
    },
    {
      kind: 'example',
      title: 'Illustration 2 — is the rectangle\u2019s diagonal a mirror? Run the chase',
      steps: [
        'Sol. Set up the witness: the rectangle $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$, centre $(3,2)$, candidate mirror the diagonal through $(0,0)$ and $(6,4)$.',
        'Chase $B(6,0)$: reflecting in the diagonal (direction $(6,4)$) — projection factor $t = (6 \\cdot 6 + 0 \\cdot 4)/52 = 36/52 = 9/13$, foot $(54/13, 36/13)$, image $(30/13, 72/13) \\approx (2.3077, 5.5385)$.',
        'Read the verdict on $B$: $(2.3077, 5.5385)$ is NOT one of the four vertices (it lies above the top edge $y = 4$) — the diagonal fails the first chase.',
        'Chase the midlines for contrast: the reflection in $x = 3$ swaps $(0,0) \\leftrightarrow (6,0)$ and $(0,4) \\leftrightarrow (6,4)$; the reflection in $y = 2$ swaps $(0,0) \\leftrightarrow (0,4)$ and $(6,0) \\leftrightarrow (6,4)$ — both survive, and no other line does (the sweep\u2019s verdict: exactly 2).',
        'State the symmetry that remains: order 2 about $(3,2)$ — the $180^\\circ$ turn maps $(0,0) \\to (6,4)$, $(6,0) \\to (0,4)$ and back.',
        'Hence the diagonal is NOT a mirror (image $(30/13, 72/13) \\approx (2.3077, 5.5385)$ off the figure); the rectangle keeps exactly the two midlines and order 2.',
      ],
      answer: 'the diagonal fails — $B$ lands at $(30/13, 72/13) \\approx (2.3077, 5.5385)$; exactly 2 mirror lines (the midlines $x = 3$, $y = 2$) and order 2 about $(3,2)$',
    },
    {
      kind: 'example',
      title: 'Illustration 3 — classify the letters M, S and B',
      steps: [
        'Sol. Run the two-question test on each letter: does a FOLD fix it, and how many? does a TURN fix it, and at what order?',
        'M: the vertical centre drop is a mirror line (fold top-left onto top-right along it) — exactly 1 mirror; no non-identity turn fixes M (a half-turn puts the apexes at the bottom). Cell: only line symmetry, order 1.',
        'S: no fold fixes S — the top hook and the bottom hook curl the SAME way, so every candidate reflection lands one hook curling the other way. But the half-turn about the centre carries S onto itself: rotational-only, order 2, angle $180^\\circ$ — the letter twin of the parallelogram, engine-verified with Z on coordinate outlines.',
        'B: the horizontal midline is a mirror (fold top onto bottom — the two bowls swap); the vertical fold fails (bowls face right, the fold would face them left). Exactly 1 mirror, no rotation: only line symmetry — A\u2019s cell, entered sideways.',
        'Place all three in the four-way table: M and B in only-line, S in only-rotational — three letters, three cells, no overlaps.',
        'Hence M: 1 mirror, order 1; S: 0 mirrors, order 2; B: 1 mirror, order 1 — the two-question test decides every letter without a drawing.',
      ],
      answer: 'M: exactly 1 mirror line, no rotational symmetry; S: rotational-only, order 2, angle $180^\\circ$, no mirror; B: exactly 1 mirror line (horizontal), no rotational symmetry',
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz (key [4,1,0,3,2] — PINNED)                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Self-check quiz' },
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'The generic parallelogram with vertices $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$ — which statement is TRUE?',
          options: [
            'It has 2 mirror lines — the diagonals, as in the rhombus',
            'It has 2 mirror lines — the midlines, as in the rectangle',
            'It has 4 mirror lines, as in the square, because opposite sides are parallel',
            'It has no symmetry of any kind — only the identity fixes it',
            'It has NO mirror line at all, yet rotational symmetry of order 2 about $(3,1)$ — the 180° turn swaps each vertex with its opposite',
          ],
          answer: 4,
          explain: 'The parallelogram is THE rotational-only case. Option (a) is the rhombus\u2019s privilege, earned by EQUAL sides — here the adjacent sides are 5 and $\\sqrt{5} = 2.2360680$, and the vertex chase dumps $B(5,0)$ at $(4,3)$ and $D(1,2)$ at $(2,-1)$, off the figure. Option (b) is the rectangle\u2019s privilege, earned by equal ANGLES — the midlines here run between unequal sides and fail the same chase. Option (c) credits the square\u2019s four lines to a figure with neither equal sides nor equal angles beyond the parallel pairs. Option (d) forgets the half-turn entirely: about the diagonal intersection $(3,1)$, $(0,0) \\to (6,2)$ and $(5,0) \\to (1,2)$ — a genuine symmetry of order 2. Only the last option holds both facts: zero mirrors, order 2.',
        },
        {
          q: 'The angle of rotation of a regular pentagon is —',
          options: [
            '$60^\\circ$, because the pentagon is built from equilateral triangles',
            '$72^\\circ$, because $360/5 = 72$ — the pentagon matches itself five times in a full turn',
            '$45^\\circ$, the octagon\u2019s angle, since both have 5-fold symmetry',
            '$90^\\circ$, the square\u2019s angle, since the order and the angle are independent',
          ],
          answer: 1,
          explain: 'The order of a regular $n$-gon is $n$, and the angle of rotation is $360/n$: for $n = 5$ that is $360/5 = 72^\\circ$, with 5 matches per full turn (and 5 mirror lines at 18°, 54°, 90°, 126°, 162°). Option (a) borrows the hexagon\u2019s $60^\\circ = 360/6$ and the triangle-build story is false for pentagons anyway. Option (c) is doubly wrong: $45^\\circ = 360/8$ belongs to order 8, and an octagon has 8-fold symmetry, not 5-fold. Option (d) denies the product law — order times angle is ALWAYS $360^\\circ$ (here $5 \\times 72^\\circ = 360^\\circ$), so the two are never independent.',
        },
        {
          q: 'The isosceles triangle with vertices $(0,0)$, $(4,0)$, $(2,3)$ has —',
          options: [
            'exactly one mirror line — the axis $x = 2$ from apex to base midpoint — and no rotational symmetry beyond the identity',
            'three mirror lines and order 3, like the equilateral triangle',
            'rotational symmetry of order 2 about the base midpoint $(2,0)$',
            'no symmetry of any kind, like the scalene triangle',
          ],
          answer: 0,
          explain: 'The equal sides $\\sqrt{13} = 3.6055513$ meet at the apex $(2,3)$, and the fold along $x = 2$ swaps them while pinning the base — the sweep returns exactly one survivor at 90°. Option (b) is the EQUILATERAL census: it needs all three sides equal, and the base here is 4 against $\\sqrt{13}$. Option (c) forgets what a half-turn does to an upward apex — it points the triangle DOWN, and no rotation about $(2,0)$ (or anywhere) fixes it; the rotation census returns order 1. Option (d) is the scalene slander: unequal sides kill mirrors, but the isosceles pair keeps one — the mirror-without-rotation archetype.',
        },
        {
          q: 'The rectangle with vertices $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$ — its mirror lines are —',
          options: [
            'the two diagonals through $(0,0)$, $(6,4)$ and $(6,0)$, $(0,4)$',
            'all four lines — the two midlines and the two diagonals, as in the square',
            'none — a rectangle has rotational symmetry only',
            'exactly the two midlines $x = 3$ and $y = 2$, with order 2 about the diagonal intersection $(3,2)$',
          ],
          answer: 3,
          explain: 'The rectangle keeps its MIDLINES and loses its diagonals. Chase a vertex: reflecting $B(6,0)$ in the diagonal through $(0,0)$ and $(6,4)$ lands at $(30/13, 72/13) \\approx (2.3077, 5.5385)$ — off the figure — so option (a) dies. Option (b) is the square\u2019s census: it needs equal sides so the diagonals become angle bisectors, and $6 \\neq 4$. Option (c) undercounts — the midlines DO survive (each swaps a pair of opposite vertices) and the sweep returns exactly 2 survivors at $0^\\circ$ and $90^\\circ$. Only option (d) states both the count and the centre: two midlines, order 2, centre $(3,2)$ — the diagonal intersection.',
        },
        {
          q: 'The letters N, S and Z carry —',
          options: [
            'one mirror line each — the vertical centre drop, as M does',
            'two mirror lines and order 2, as H, I and X do',
            'rotational symmetry of order 2 about the centre and NO mirror line',
            'no symmetry of any kind, as F, G, J, L, P and R do',
          ],
          answer: 2,
          explain: 'N, S and Z are the alphabet\u2019s parallelograms: the half-turn club. The engine verified N and Z from coordinate outlines: the 180° turn about the centre maps every outline corner onto its opposite (for the N: $(0,0) \\to (4,5)$, $(1,0) \\to (3,5)$, $(3,3) \\to (1,2)$, $(3,0) \\to (1,5)$, $(4,0) \\to (0,5)$), while none of the 360 candidate mirror lines through the centre survives — a reflection would flip the diagonal\u2019s slope or a hook\u2019s curl the wrong way. Option (a) is M\u2019s cell (M\u2019s drop is a mirror; N\u2019s diagonal bars it). Option (b) is H, I, X\u2019s cell. Option (d) is F, G, J, L, P, R\u2019s cell — those letters fail BOTH questions; N, S, Z fail only the fold.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full step solutions)           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Graded exercises' },
    {
      kind: 'exercises',
      title: 'Graded exercises',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Run the census on the regular hexagon: how many mirror lines does it carry, what is its rotational order, and what is its angle of rotation? Name the two flavours of mirror line.',
              solution: [
                'Sol. Identify the figure: a regular 6-gon — 6 equal sides, 6 equal angles — so the regular census applies.',
                'Mirror count: exactly $n = 6$ mirror lines, evenly spaced at $180/6 = 30^\\circ$.',
                'Split the flavours ($n$ even): 3 axes through opposite VERTICES and 3 through opposite SIDE MIDPOINTS.',
                'Rotational order: exactly 6 — the vertex cycle steps one vertex per $60^\\circ$, so the fixing turns are the multiples of $60^\\circ$: 6 of them in a full turn.',
                'Angle of rotation: $360/6 = 60^\\circ$; the product law checks: $6 \\times 60^\\circ = 360^\\circ$.',
                'Hence 6 mirror lines (3 vertex axes, 3 side axes), order 6, angle of rotation $60^\\circ$.',
              ],
              answer: '6 mirror lines (3 through opposite vertices, 3 through opposite side midpoints); rotational order 6; angle of rotation $60^\\circ$',
            },
            {
              q: 'The isosceles triangle with vertices $(0,0)$, $(4,0)$, $(2,3)$: find its mirror lines, its rotational order, and the lengths of its three sides.',
              solution: [
                'Sol. Compute the sides first: $|(0,0)(4,0)| = 4$; $|(0,0)(2,3)| = \\sqrt{4 + 9} = \\sqrt{13} = 3.6055513$; $|(4,0)(2,3)| = \\sqrt{4 + 9} = \\sqrt{13} = 3.6055513$ — the two slanted sides are equal, so the apex is $(2,3)$.',
                'Mirror lines: the fold along $x = 2$ runs from the apex down the median to the base midpoint $(2,0)$, swapping the two equal sides and pinning the base — the sweep returns exactly ONE survivor, at $90^\\circ$.',
                'Rotational order: 1 — no non-identity turn fixes the triangle (a $180^\\circ$ turn points the apex downward), so there is no rotational symmetry.',
                'Classify: line symmetry WITHOUT rotational symmetry — the isosceles archetype, the geometric twin of the letter A.',
                'Hence exactly 1 mirror line (the axis $x = 2$), order 1, and sides 4, 3.6055513, 3.6055513.',
              ],
              answer: 'exactly 1 mirror line ($x = 2$); rotational order 1 (none); sides 4, $\\sqrt{13} = 3.6055513$, $\\sqrt{13} = 3.6055513$',
            },
            {
              q: 'Classify the letters A, M and O without drawing: for each, state how many mirror lines it has and its rotational order.',
              solution: [
                'Sol. Run the two-question test on each letter: does a fold fix it, and does a turn fix it?',
                'A: the fold down the apex swaps the two slanted strokes and pins the crossbar — exactly 1 mirror line. A half-turn points the apex down, so no rotation: order 1. Cell: only line symmetry.',
                'M: the vertical centre drop swaps the two outer strokes and pins the middle V — exactly 1 mirror line; no rotation (a half-turn turns the peaks into valleys): order 1. Cell: only line symmetry.',
                'O: the circle\u2019s census — every diameter is a mirror line and every angle is a rotation, so the mirror count and the order are unbounded: the infinite cell.',
                'Hence A: 1 mirror line, order 1; M: 1 mirror line, order 1; O: infinitely many mirror lines, unbounded order.',
              ],
              answer: 'A: exactly 1 mirror line, order 1; M: exactly 1 mirror line, order 1; O: infinitely many mirror lines, unbounded order',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Full square census on the witness $(0,0)$, $(4,0)$, $(4,4)$, $(0,4)$: list the four mirror lines, the centre, the rotational order and the angle of rotation.',
              solution: [
                'Sol. The square is the regular 4-gon, so the census applies with $n = 4$: four mirror lines, order 4.',
                'List the lines: the midlines $x = 2$ and $y = 2$ (swapping opposite sides) and the diagonals $y = x$ and $y = 4 - x$ (swapping opposite vertices) — the sweep\u2019s survivors sit at $0^\\circ$, $45^\\circ$, $90^\\circ$ and $135^\\circ$.',
                'Centre: the diagonal intersection $(2,2)$ — also the centroid, as the sweep lemma promises.',
                'Rotations: the fixing turns are $90^\\circ$, $180^\\circ$, $270^\\circ$ and the identity — order 4, angle $90^\\circ$; a turn of $89^\\circ$ or $91^\\circ$ fails.',
                'Product law: $4 \\times 90^\\circ = 360^\\circ$ — consistent.',
                'Hence 4 mirror lines (two midlines at $0^\\circ$ and $90^\\circ$, two diagonals at $45^\\circ$ and $135^\\circ$), centre $(2,2)$, order 4, angle of rotation $90^\\circ$.',
              ],
              answer: '4 mirror lines ($x = 2$, $y = 2$, $y = x$, $y = 4 - x$); centre $(2,2)$; order 4; angle $90^\\circ$',
            },
            {
              q: 'Rectangle witness $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$: (a) show the $180^\\circ$ rotation about $(3,2)$ is a symmetry by mapping each vertex; (b) state the mirror lines and the order; (c) explain in one sentence why the diagonals are NOT mirrors.',
              solution: [
                'Sol. (a) The half-turn about $(3,2)$ sends $P$ to $2(3,2) - P$: $(0,0) \\to (6,4)$, $(6,0) \\to (0,4)$, $(6,4) \\to (0,0)$, $(0,4) \\to (6,0)$ — every vertex lands on its opposite, so the turn is a symmetry.',
                'Read off the order: exactly 2 fixing rotations (the identity and the half-turn) — order 2, angle $180^\\circ$, centre $(3,2)$ = the diagonal intersection.',
                '(b) Mirror lines: the sweep returns exactly 2 survivors, the midlines $x = 3$ and $y = 2$ — each swaps a pair of opposite vertices and pins the other pair.',
                '(c) The diagonals fail the vertex chase: reflecting $(6,0)$ in the diagonal through $(0,0)$ and $(6,4)$ lands at $(30/13, 72/13) \\approx (2.3077, 5.5385)$, off the figure, because a reflection preserves length and the adjacent sides 6 and 4 are unequal.',
                'Hence (a) $(0,0) \\to (6,4)$, $(6,0) \\to (0,4)$, $(6,4) \\to (0,0)$, $(0,4) \\to (6,0)$; (b) exactly the midlines $x = 3$, $y = 2$, order 2 about $(3,2)$; (c) unequal adjacent sides 6 and 4 kill the diagonal mirrors.',
              ],
              answer: '(a) $(0,0) \\to (6,4)$, $(6,0) \\to (0,4)$, $(6,4) \\to (0,0)$, $(0,4) \\to (6,0)$; (b) 2 mirror lines ($x = 3$, $y = 2$), order 2 about $(3,2)$; (c) unequal adjacent sides 6 and 4 — the chase lands $(6,0)$ at $(2.3077, 5.5385)$, off the figure',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The vertex chase on the parallelogram $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$: show that the diagonal through $(0,0)$ and $(6,2)$ is not a mirror by computing where $B(5,0)$ and $D(1,2)$ land, and connect the failure to the adjacent side lengths.',
              solution: [
                'Sol. Set up the chase: the candidate mirror is the diagonal $AC$ through $(0,0)$ and $(6,2)$ — direction $(6,2)$.',
                'Reflect $B(5,0)$: projection factor $t = (5 \\cdot 6 + 0 \\cdot 2)/40 = 30/40 = 3/4$; foot $(4.5, 1.5)$; image $2(4.5, 1.5) - (5,0) = (4, 3)$.',
                'Reflect $D(1,2)$: projection factor $t = (6 + 4)/40 = 1/4$; foot $(1.5, 0.5)$; image $2(1.5, 0.5) - (1,2) = (2, -1)$.',
                'Read the verdict: $(4,3)$ and $(2,-1)$ are NOT vertices of the parallelogram — the reflection scatters two of the four corners, so $AC$ is no mirror.',
                'Connect to the sides: $|AB| = 5$ exactly but $|AD| = \\sqrt{1 + 4} = \\sqrt{5} = 2.2360680$ — unequal. A reflection preserves length and any mirror fixing $A$ would have to swap the sides leaving $A$; $5 \\neq \\sqrt{5}$ forbids it, and the same inequality kills every other candidate through the centre.',
                'Hence the diagonal is not a mirror ($B$ lands at $(4,3)$, $D$ at $(2,-1)$), and the root cause is the unequal adjacent sides 5 and $\\sqrt{5} = 2.2360680$.',
              ],
              figures: [
                {
                  caption: 'The contradiction diagram for Exercise 7: the parallelogram with its diagonal AC drawn as a failed mirror, side AB labelled 5 and side AD labelled √5 ≈ 2.2361, and the chased images B → (4,3) and D → (2,−1) landing off the figure.',
                  svg: geo53ParaContradiction('The parallelogram with diagonal AC dashed as an attempted mirror, sides labelled 5 and root 5 about 2.2361, and the reflected images of B and D shown as open points at (4,3) and (2, −1) outside the figure.'),
                },
              ],
              answer: '$B$ lands at $(4,3)$ and $D$ at $(2,-1)$ — both off the figure, so the diagonal fails; cause: $|AB| = 5$ vs $|AD| = \\sqrt{5} = 2.2360680$',
            },
            {
              q: 'A wheel has 8 identical spokes evenly spaced. Find its order of rotational symmetry and its angle of rotation, verify the product law, and state how many mirror lines the full wheel carries.',
              solution: [
                'Sol. Count the matches: turning the wheel from one spoke to the next lands it back on itself, and there are 8 such positions in a full turn — order 8.',
                'Angle of rotation: the smallest gap between matches is $360/8 = 45^\\circ$.',
                'Product law: $8 \\times 45^\\circ = 360^\\circ$ — the count and the gap are two readings of one division.',
                'Mirror lines: the half-degree sweep on the 8-point spoke set returns exactly 8 — four along spoke directions ($0^\\circ$, $45^\\circ$, $90^\\circ$, $135^\\circ$) and four bisecting the gaps ($22.5^\\circ$, $67.5^\\circ$, $112.5^\\circ$, $157.5^\\circ$).',
                'Compare with the polygon census: the spoke set is a regular 8-point set, so order 8 is the octagon\u2019s order — the wheel is the order-8 archetype with or without a rim.',
                'Hence order 8, angle of rotation $45^\\circ$, 8 mirror lines, product law verified at $8 \\times 45^\\circ = 360^\\circ$.',
              ],
              answer: 'order 8; angle of rotation $360/8 = 45^\\circ$; 8 mirror lines (4 along spokes, 4 between); $8 \\times 45^\\circ = 360^\\circ$',
            },
            {
              q: 'Full rhombus audit on $(0,0)$, $(2,1)$, $(4,0)$, $(2,-1)$: compute the four sides, the two diagonals, the surviving mirror lines (with their directions), and the centre and order of rotation.',
              solution: [
                'Sol. Sides: $\\sqrt{4 + 1} = \\sqrt{5} = 2.2360680$ for each of the four — equal, as a rhombus demands.',
                'Diagonals: $|(0,0)(4,0)| = 4$ and $|(2,1)(2,-1)| = 2$ — unequal to each other, which is exactly why the rhombus is not a square.',
                'Mirror sweep: exactly 2 survivors, at $0^\\circ$ and $90^\\circ$ — the two DIAGONALS (the horizontal one through $(0,0)$ and $(4,0)$, the vertical one through $(2,1)$ and $(2,-1)$). Each diagonal swaps the two off-axis vertices.',
                'The would-be midlines die: their directions ($26.57^\\circ$ and $153.43^\\circ$, parallel to the sides) fail the chase, since they would have to swap unequal diagonals.',
                'Centre and order: the diagonals cross at $(2,0)$, and the half-turn about it swaps both vertex pairs — order 2, angle $180^\\circ$.',
                'Hence sides $\\sqrt{5} = 2.2360680$ all four; diagonals 4 and 2; exactly 2 mirror lines (the diagonals, at $0^\\circ$ and $90^\\circ$); centre $(2,0)$; order 2.',
              ],
              answer: 'sides $\\sqrt{5} = 2.2360680$ (all four); diagonals 4 and 2; exactly 2 mirror lines (the diagonals at $0^\\circ$ and $90^\\circ$); centre $(2,0)$; order 2',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Explain the mirror-sweep machine: why is it enough to test only candidate lines through the centroid, why do 180 one-degree candidates cover all directions, and what does the sweep return for the parallelogram, rectangle, rhombus, square, equilateral, isosceles and scalene witnesses?',
              solution: [
                'Sol. The lemma: a reflection fixing a finite vertex set fixes its centroid (the image of the centroid is the centroid of the image, and the set is its own image), and a reflection\u2019s fixed points are exactly its mirror — so every mirror line passes through the centroid, and lines elsewhere are eliminated without testing.',
                'The bookkeeping: a line has no arrow — the reflection at angle $\\theta$ equals the reflection at $\\theta + 180^\\circ$ — so directions live modulo a half-turn, and 180 one-degree candidates through the centroid exhaust them (half-degree steps where axes sit between degrees).',
                'The chase: each candidate is tested by reflecting all vertices and checking they land on vertices — a finite, exhaustive loop.',
                'The verdicts, engine-verified: parallelogram 0, rectangle 2, rhombus 2, square 4, equilateral 3, isosceles 1, scalene 0 — the column the lesson\u2019s tables print.',
                'The honesty clause: a coarse grid can MISS a real mirror (the draft triangle $(0,0)$, $(5,0)$, $(1,3)$ is isosceles with a mirror of slope $-1/3$ that a one-degree sweep never samples) — the verdict is a proof only with a fine grid or a structural argument covering the gaps.',
                'Hence the machine: centroid lemma + 180 candidates + vertex chase = the pinned column 0, 2, 2, 4, 3, 1, 0.',
              ],
              figures: [
                {
                  caption: 'The mirror-sweep sketch for Exercise 10: twelve of the 180 candidate lines fanned through the parallelogram\u2019s centre (3,1), the horizontal and vertical attempts marked as failing, and the verdict 0 of 180 survive — while the same sweep gives the rectangle 2, the rhombus 2 and the square 4.',
                  svg: geo53SweepSketch('A small parallelogram with a fan of faint candidate lines through its marked centre, the horizontal and vertical candidates highlighted and labelled as failing, and the verdict that zero of 180 candidates survive.'),
                },
              ],
              answer: 'mirrors must pierce the centroid; 180 candidates because line at $\\theta$ = line at $\\theta + 180^\\circ$; verdicts 0, 2, 2, 4, 3, 1, 0',
            },
            {
              q: 'Compare the regular pentagon and the regular decagon: mirror counts, rotational orders, and angles of rotation. Which has the larger angle, and by what factor do the angles compare?',
              solution: [
                'Sol. Pentagon ($n = 5$): exactly 5 mirror lines (each from a vertex to the opposite side\u2019s midpoint), order 5, angle $360/5 = 72^\\circ$.',
                'Decagon ($n = 10$): exactly 10 mirror lines (5 through opposite vertices, 5 through opposite side midpoints), order 10, angle $360/10 = 36^\\circ$.',
                'Compare angles: $72^\\circ$ against $36^\\circ$ — the pentagon\u2019s angle is larger, exactly twice as large, because its order is half as large.',
                'Product law on both: $5 \\times 72^\\circ = 360^\\circ$ and $10 \\times 36^\\circ = 360^\\circ$ — one law, two rows.',
                'Note the trade: doubling $n$ doubles the mirror count and the order but HALVES the angle of rotation — the matches crowd together as the polygon rounds toward the circle.',
                'Hence pentagon 5/5/72°, decagon 10/10/36°, and the angle ratio is exactly 2.',
              ],
              answer: 'pentagon: 5 mirror lines, order 5, $72^\\circ$; decagon: 10 mirror lines, order 10, $36^\\circ$; the pentagon\u2019s angle is exactly twice the decagon\u2019s',
            },
            {
              q: 'The letter N is drawn as a 10-corner outline with corners $(0,0)$, $(1,0)$, $(3,3)$, $(3,0)$, $(4,0)$, $(4,5)$, $(3,5)$, $(1,2)$, $(1,5)$, $(0,5)$. Rotate the first five corners through $180^\\circ$ about $(2,2.5)$, and state the symmetry verdict for the letter with its order.',
              solution: [
                'Sol. The half-turn about $(2,2.5)$ sends $P$ to $(4,5) - P$ (twice the centre minus the point).',
                'Map the corners: $(0,0) \\to (4,5)$; $(1,0) \\to (3,5)$; $(3,3) \\to (1,2)$; $(3,0) \\to (1,5)$; $(4,0) \\to (0,5)$ — every image is a corner of the outline.',
                'The other five corners are the images\u2019 partners and map back symmetrically, so the whole outline is invariant under the half-turn.',
                'Verdict on mirrors: none of the 360 half-degree candidate lines through $(2,2.5)$ survives the chase — a reflection would flip the diagonal bar\u2019s slope.',
                'State the census: rotational symmetry of order 2, angle $180^\\circ$, zero mirror lines — the rotational-only cell, with S and Z as letter twins.',
                'Hence the corner map $(0,0) \\to (4,5)$, $(1,0) \\to (3,5)$, $(3,3) \\to (1,2)$, $(3,0) \\to (1,5)$, $(4,0) \\to (0,5)$, and the verdict: order 2, no mirrors.',
              ],
              answer: 'images $(4,5)$, $(3,5)$, $(1,2)$, $(1,5)$, $(0,5)$ — all outline corners; verdict: rotational order 2, angle $180^\\circ$, 0 mirror lines',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Compare the 8-spoke wheel and the 5-blade fan: orders, angles of rotation, and mirror-line counts. State which figure has the larger order and which has the larger angle, and verify the product law on both.',
              solution: [
                'Sol. Wheel: 8 spokes evenly spaced — order 8, angle $360/8 = 45^\\circ$; the sweep returns 8 mirror lines (4 along spokes at $0^\\circ$, $45^\\circ$, $90^\\circ$, $135^\\circ$ and 4 between at $22.5^\\circ$, $67.5^\\circ$, $112.5^\\circ$, $157.5^\\circ$).',
                'Fan: 5 blades evenly spaced — order 5, angle $360/5 = 72^\\circ$; the sweep returns 5 mirror lines along the blade axes at $18^\\circ$, $54^\\circ$, $90^\\circ$, $126^\\circ$, $162^\\circ$.',
                'Compare: the wheel has the larger order (8 against 5); the fan has the larger angle ($72^\\circ$ against $45^\\circ$) — more matches means smaller gaps.',
                'Product law: $8 \\times 45^\\circ = 360^\\circ$ and $5 \\times 72^\\circ = 360^\\circ$ — both verified, one law.',
                'Note the engine numbers: the wheel\u2019s between-spoke mirrors sit at half-degree grid points ($22.5^\\circ$ and so on), which is why its sweep ran at half-degree granularity.',
                'Hence wheel 8/45°/8 mirrors, fan 5/72°/5 mirrors; wheel wins on order, fan wins on angle, and both satisfy order × angle = $360^\\circ$.',
              ],
              answer: 'wheel: order 8, angle $45^\\circ$, 8 mirror lines; fan: order 5, angle $72^\\circ$, 5 mirror lines; wheel has the larger order, fan the larger angle; $8 \\times 45^\\circ = 5 \\times 72^\\circ = 360^\\circ$',
            },
            {
              q: 'Prove that the diagonal through $(0,0)$ and $(6,4)$ is not a mirror of the rectangle $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$ by chasing BOTH off-axis vertices, and state what survives instead.',
              solution: [
                'Sol. Chase $B(6,0)$: projection factor onto the diagonal direction $(6,4)$ is $t = (36 + 0)/52 = 9/13$; foot $(54/13, 36/13)$; image $2(54/13, 36/13) - (6,0) = (108/13 - 6, 72/13) = (30/13, 72/13) \\approx (2.3077, 5.5385)$ — above the top edge $y = 4$, NOT a vertex.',
                'Chase $D(0,4)$: projection factor $t = (0 + 16)/52 = 4/13$; foot $(24/13, 16/13)$; image $(48/13, 32/13 - 4) = (48/13, -20/13) \\approx (3.6923, -1.5385)$ — below the bottom edge $y = 0$, NOT a vertex.',
                'Both off-axis vertices scatter, so the diagonal fails on two independent counts — no need to test $A$ and $C$ (they sit ON the candidate line and stay put).',
                'The structural cause: the reflection would have to swap the sides leaving $(0,0)$ — lengths 6 and 4, unequal — and a reflection preserves every length.',
                'What survives: the midlines $x = 3$ and $y = 2$ (each swaps a pair of opposite vertices), exactly 2 mirror lines, and the half-turn about $(3,2)$ — order 2.',
                'Hence images $(30/13, 72/13) \\approx (2.3077, 5.5385)$ and $(48/13, -20/13) \\approx (3.6923, -1.5385)$ both miss the vertex set: the diagonal is no mirror; the midlines and order 2 survive.',
              ],
              figures: [
                {
                  caption: 'The rectangle diagonal witness for Exercise 14: the rectangle with its diagonal drawn as a failed mirror, B chased to (30/13, 72/13) ≈ (2.31, 5.54) above the top edge and D chased to (48/13, −20/13) ≈ (3.69, −1.54) below the bottom edge, with the surviving midlines stated beneath.',
                  svg: geo53RectDiagWitness('The rectangle with its diagonal dashed as an attempted mirror, the chased images of B and D shown as open points at about (2.31, 5.54) and (3.69, −1.54) outside the rectangle, and the caption that only the midlines survive.'),
                },
              ],
              answer: '$B \\to (30/13, 72/13) \\approx (2.3077, 5.5385)$ and $D \\to (48/13, -20/13) \\approx (3.6923, -1.5385)$ — both off the figure; the midlines $x = 3$, $y = 2$ and order 2 about $(3,2)$ survive',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Build the four-way classification yourself: place one geometric witness and one set of letters in EACH cell (both, only line, only rotational, neither), and justify each placement with the two census numbers (mirror count, order). Where does O sit, and why is it not in any of the four cells?',
              solution: [
                'Sol. The cells are defined by the two census numbers: (mirror lines, rotational order).',
                'BOTH (mirrors at least 1, order at least 2): the square — 4 mirror lines, order 4; letters H, I, X — 2 mirror lines, order 2. Justification: folds AND turns both survive.',
                'ONLY LINE (mirrors at least 1, order 1): the isosceles triangle $(0,0)$, $(4,0)$, $(2,3)$ — exactly 1 mirror line, order 1; letters A, M, T, U, V, W, Y — 1 mirror each, no non-identity turn. Justification: the fold survives, no turn does.',
                'ONLY ROTATIONAL (0 mirror lines, order 2): the generic parallelogram $(0,0)$, $(5,0)$, $(6,2)$, $(1,2)$ — 0 of the 180 candidates survive, yet the half-turn about $(3,1)$ is a symmetry; letters N, S, Z — order 2, no mirror (engine-verified on N and Z outlines).',
                'NEITHER (0 mirror lines, order 1): the scalene triangle $(0,0)$, $(5,0)$, $(2,3)$ — sides 5, 4.2426, 3.6056 all different, 0 mirrors, order 1; letters F, G, J, L, P, R.',
                'O sits in a fifth cell: the circle\u2019s census is infinite — every diameter a mirror, every angle a rotation — so neither census number is finite and no four-way cell can hold it.',
                'Hence both: square + H, I, X; only line: isosceles + A, M, T, U, V, W, Y; only rotational: parallelogram + N, S, Z; neither: scalene + F, G, J, L, P, R; O above the table with its infinite census.',
              ],
              figures: [
                {
                  caption: 'The alphabet answer strip for Exercise 15: the four classification columns with their letter members — one line (A M T, also U V W Y), two lines plus order 2 (H I X), order 2 with no mirror (N S Z), nothing (F P L, also G J R) — and O set apart with the circle\u2019s infinite census.',
                  svg: geo53AlphabetAnswer('Four columns of stroked capital letters under the headings one line, two lines plus order 2, order 2 no mirror, and nothing, with the letter O drawn apart beside the note that every diameter is a mirror and every angle a rotation.'),
                },
              ],
              answer: 'both: square (4, order 4) + H, I, X (2, order 2); only line: isosceles (1, order 1) + A, M, T, U, V, W, Y; only rotational: parallelogram (0, order 2) + N, S, Z; neither: scalene (0, order 1) + F, G, J, L, P, R; O: the infinite fifth cell',
            },
            {
              q: 'The anti-symmetry theorem (a flagged bridge to Lesson 5.4): explain why NO dilation with scale factor $k \\neq 1$ can be a symmetry of any figure except a single point. Your argument should name the promise rigid motions make, what a dilation does instead, and what the only fixed set of a dilation can be.',
              solution: [
                'Sol. Name the promise: a rigid motion preserves EVERY distance — that is the clause every symmetry of this lesson exploited, since a reflection or rotation carrying a figure onto itself must carry each side onto an equal side.',
                'Name the violation: a dilation with factor $k \\neq 1$ multiplies EVERY distance by $|k|$ — two points at distance $d$ land at distance $|k|d \\neq d$. Any figure containing two distinct points (any figure worth the name) has a pair of distances, and the dilation changes them all.',
                'Run the fixed-set test: for the dilated image to coincide with the original figure, every pair of the figure\u2019s points would need $|PQ| = |k| \\cdot |PQ|$ — possible only for $|PQ| = 0$, that is, for $P = Q$.',
                'Conclude: the only sets a dilation $k \\neq 1$ fixes are sets with no two distinct points — the empty set and a single point (the dilation\u2019s own centre, which is the one point it leaves put). No polygon, letter, wheel or fan survives.',
                'Place the bridge: Lesson 5.4 studies this motion anyway, because relaxing the size promise is exactly how SIMILARITY is born — the dilation is the motion that breaks the symmetry contract and pays for the whole theory of Lesson 4.1\u2019s scale factor $k$.',
                'Hence a dilation with $k \\neq 1$ is a symmetry of nothing but a single point — the theorem the census\u2019s fourth cell was pointing at all along.',
              ],
              answer: 'a dilation with $k \\neq 1$ multiplies every distance by $|k|$, so only sets with no two distinct points — the empty set and the centre point — survive it; no figure of this lesson\u2019s census is dilation-symmetric',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}

/* ================================================================== */
/* lesson 5.4 — from docs/research/geo-ch05-wip/part-geo504.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — c31's structure     */
/* hue-shifted to the dilation/emerald family)                         */
/* ------------------------------------------------------------------ */
const c54 = {
  ink: '#065f46', // primary text — deep emerald ink
  mid: '#059669', // mid text — emerald
  teal: '#0d9488', // captions, secondary structure
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#0f766e', // structure strokes — axes, polygons
  panel: '#d1fae5', // emerald tinted fill
  panel2: '#fce7f3', // pink tinted fill
  sep: '#a7f3d0', // light separators (bar fills)
  faint: '#6ee7b7', // faint dots, grids, unpicked borders
  white: '#ffffff',
  paper: '#f0fdfa',
}
const f54 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo54 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo54Txt = (
  x: number, y: number, s: string,
  size = 13, color = c54.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f54}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo54Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c54.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo54Dot = (x: number, y: number, color = c54.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo54Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo54Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo54Circle = (cx: number, cy: number, r: number, fill: string, fillOp: number, stroke: string, sw = 2.6, dash = ''): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo54RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c54.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo54Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo54Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c54.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo54Line(x1, y1, x2, y2, color, w) + geo54Head(x2, y2, a, color, 8)
}

const geo54Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the dilation machine: rays, k = 3, the witness     */
/* ------------------------------------------------------------------ */
const geo54Machine = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE DILATION MACHINE: D(O, k) SENDS P TO O + k(P − O)', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [150, 360], u = 24
  const P = (x: number, y: number): [number, number] => [O[0] + u * x, O[1] - u * y]
  // axes + rays
  parts.push(geo54Line(90, O[1], 600, O[1], c54.faint, 1.4))
  parts.push(geo54Line(O[0], 400, O[0], 110, c54.faint, 1.4))
  parts.push(geo54Line(O[0], O[1], P(12, 0)[0], O[1], c54.amber, 1.8, '5 4'))
  parts.push(geo54Line(O[0], O[1], P(0, 9)[0], P(0, 9)[1], c54.amber, 1.8, '5 4'))
  // image triangle, then original on top
  parts.push(geo54Poly([O, P(12, 0), P(0, 9)], c54.panel2, 0.55, c54.green, 2.6))
  parts.push(geo54Poly([O, P(4, 0), P(0, 3)], c54.panel, 0.95, c54.mid, 2.6))
  parts.push(geo54RA(O[0], O[1], 1, 0, 0, -1, 11, c54.ink))
  // the pinned witness point
  parts.push(geo54Dot(P(2, 1)[0], P(2, 1)[1], c54.orange, 4.5))
  parts.push(geo54Dot(P(6, 3)[0], P(6, 3)[1], c54.orange, 4.5))
  parts.push(geo54Arrow(P(2, 1)[0], P(2, 1)[1], P(6, 3)[0] - 6, P(6, 3)[1] + 5, c54.orange, 1.8))
  parts.push(geo54Txt(P(2, 1)[0] - 10, P(2, 1)[1] + 4, '(2,1)', 11.5, c54.orange, 'end'))
  parts.push(geo54Txt(P(6, 3)[0] + 8, P(6, 3)[1] + 14, '(6,3)', 11.5, c54.orange, 'start'))
  // labels
  parts.push(geo54Txt(O[0] - 12, O[1] + 16, 'O', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(P(4, 0)[0] + 8, O[1] + 16, '(4,0)', 11.5, c54.mid, 'start'))
  parts.push(geo54Txt(P(0, 3)[0] - 8, P(0, 3)[1] - 6, '(0,3)', 11.5, c54.mid, 'end'))
  parts.push(geo54Txt(P(12, 0)[0] - 6, O[1] + 16, '(12,0)', 11.5, c54.green, 'end'))
  parts.push(geo54Txt(P(0, 9)[0] - 8, P(0, 9)[1] - 6, '(0,9)', 11.5, c54.green, 'end'))
  parts.push(geo54Arrow(262, 176, 420, 176, c54.orange, 2.2))
  parts.push(geo54Txt(341, 166, 'k = 3', 12.5, c54.orange, 'middle', '700'))
  parts.push(geo54Txt(300, 236, 'area 6 → 54 = 9 × 6', 12, c54.teal, 'start'))
  parts.push(geo54Txt(320, 420, 'every ray from O is kept; every distance from O is tripled', 12.5, c54.teal))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the k-family: k = 1/2, 1, 3 on one figure          */
/* ------------------------------------------------------------------ */
const geo54KFamily = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'ONE TRIANGLE, THREE SCALE FACTORS', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [120, 370], u = 26
  const P = (x: number, y: number): [number, number] => [O[0] + u * x, O[1] - u * y]
  parts.push(geo54Line(O[0], O[1], P(12, 0)[0], O[1], c54.faint, 1.4, '4 4'))
  parts.push(geo54Line(O[0], O[1], P(0, 9)[0], P(0, 9)[1], c54.faint, 1.4, '4 4'))
  parts.push(geo54Poly([O, P(12, 0), P(0, 9)], c54.panel2, 0.5, c54.orange, 2.6))
  parts.push(geo54Poly([O, P(4, 0), P(0, 3)], c54.sep, 0.5, c54.green, 2.4))
  parts.push(geo54Poly([O, P(2, 0), P(0, 1.5)], c54.panel, 0.95, c54.teal, 2.6))
  parts.push(geo54RA(O[0], O[1], 1, 0, 0, -1, 10, c54.ink))
  parts.push(geo54Txt(O[0] - 12, O[1] + 16, 'O', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(150, 322, 'k = 1/2', 12, c54.teal, 'start', '700'))
  parts.push(geo54Txt(176, 292, 'area 1.5', 11, c54.teal, 'start'))
  parts.push(geo54Txt(262, 250, 'k = 1', 12, c54.green, 'start', '700'))
  parts.push(geo54Txt(262, 266, 'area 6 (fixed)', 11, c54.green, 'start'))
  parts.push(geo54Txt(330, 160, 'k = 3', 12, c54.orange, 'start', '700'))
  parts.push(geo54Txt(330, 176, 'area 54', 11, c54.orange, 'start'))
  parts.push(geo54Txt(320, 415, 'one centre, one knob: k = 1/2 shrinks, k = 1 fixes every point, k = 3 enlarges', 12.5, c54.teal))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — k = −2: the half-turn sense                        */
/* ------------------------------------------------------------------ */
const geo54NegK = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'k = −2: THE HALF-TURN SENSE', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [320, 200], u = 30
  const P = (x: number, y: number): [number, number] => [O[0] + u * x, O[1] - u * y]
  parts.push(geo54Line(110, O[1], 530, O[1], c54.faint, 1.4, '4 4'))
  parts.push(geo54Line(O[0], 330, O[0], 70, c54.faint, 1.4, '4 4'))
  // the witness point and its image
  parts.push(geo54Arrow(P(1, 2)[0], P(1, 2)[1], P(-2, -4)[0] + 5, P(-2, -4)[1] - 6, c54.orange, 2))
  parts.push(geo54Dot(P(1, 2)[0], P(1, 2)[1], c54.ink, 4.5))
  parts.push(geo54Dot(P(-2, -4)[0], P(-2, -4)[1], c54.orange, 4.5))
  parts.push(geo54Txt(P(1, 2)[0] + 10, P(1, 2)[1] - 4, '(1,2)', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(P(-2, -4)[0] - 10, P(-2, -4)[1] + 16, '(−2,−4)', 11.5, c54.orange, 'end'))
  // a small flag triangle and its half-turned image
  parts.push(geo54Poly([P(1, 0), P(2, 0), P(1, 1)], c54.panel, 0.9, c54.teal, 2.4))
  parts.push(geo54Poly([P(-2, 0), P(-4, 0), P(-2, -2)], c54.panel2, 0.9, c54.green, 2.4))
  parts.push(geo54Txt(P(1.5, 0.5)[0] + 14, P(1.5, 0.5)[1], 'a small flag', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(P(-3, -1)[0] - 14, P(-3, -1)[1] + 4, 'its image', 11.5, c54.green, 'end'))
  parts.push(geo54Txt(O[0] + 10, O[1] + 16, 'O', 12.5, c54.ink, 'start', '700'))
  parts.push(geo54Txt(320, 356, 'the image lands on the OPPOSITE ray, distance × |k| = 2 — the half-turn sense', 12.5, c54.teal))
  return geo54Svg(640, 380, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the ray structure: self-map vs parallel image      */
/* ------------------------------------------------------------------ */
const geo54Lines = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE RAY STRUCTURE: WHAT HAPPENS TO A LINE', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Line(340, 44, 340, 316, c54.sep, 1.6))
  // left panel — line through O maps to itself
  parts.push(geo54Txt(170, 50, 'THROUGH THE CENTRE: STAYS', 12, c54.teal, 'middle', '700'))
  const OL: [number, number] = [100, 296], uL = 30
  const PL = (x: number, y: number): [number, number] => [OL[0] + uL * x, OL[1] - uL * y]
  parts.push(geo54Line(56, 318, 290, 84, c54.faint, 1.4))
  parts.push(geo54Line(OL[0], OL[1], PL(3.6, 7.2)[0], PL(3.6, 7.2)[1], c54.mid, 2.6))
  parts.push(geo54Dot(PL(1, 2)[0], PL(1, 2)[1], c54.ink, 4.5))
  parts.push(geo54Dot(PL(3, 6)[0], PL(3, 6)[1], c54.orange, 4.5))
  parts.push(geo54Txt(OL[0] - 10, OL[1] + 16, 'O', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(PL(1, 2)[0] - 8, PL(1, 2)[1] + 18, '(1,2)', 11.5, c54.ink, 'end'))
  parts.push(geo54Txt(PL(3, 6)[0] + 8, PL(3, 6)[1] + 4, '(3,6)', 11.5, c54.orange, 'start'))
  parts.push(geo54Txt(170, 336, 'y = 2x maps to itself under k = 3', 12, c54.teal))
  // right panel — line off O goes parallel
  parts.push(geo54Txt(490, 50, 'OFF THE CENTRE: GOES PARALLEL', 12, c54.teal, 'middle', '700'))
  const OR: [number, number] = [380, 268], uR = 24
  const PR = (x: number, y: number): [number, number] => [OR[0] + uR * x, OR[1] - uR * y]
  parts.push(geo54Line(OR[0] - 14, OR[1] + 10, OR[0] + 6, OR[1] - 38, c54.faint, 1.4, '3 4'))
  parts.push(geo54Line(PR(0, 1)[0] - 20, PR(0, 1)[1] + 40, PR(1, 3)[0] + 14, PR(1, 3)[1] - 28, c54.mid, 2.6))
  parts.push(geo54Line(PR(0, 3)[0] - 30, PR(0, 3)[1] - 4, PR(3, 9)[0] + 10, PR(3, 9)[1] - 70, c54.green, 2.6, '7 5'))
  parts.push(geo54Dot(PR(0, 1)[0], PR(0, 1)[1], c54.ink, 4.5))
  parts.push(geo54Dot(PR(1, 3)[0], PR(1, 3)[1], c54.ink, 4.5))
  parts.push(geo54Dot(PR(0, 3)[0], PR(0, 3)[1], c54.orange, 4.5))
  parts.push(geo54Dot(PR(3, 9)[0], PR(3, 9)[1], c54.orange, 4.5))
  parts.push(geo54Txt(OR[0] - 6, OR[1] + 16, 'O', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(PR(1, 3)[0] + 8, PR(1, 3)[1] + 12, '(1,3)', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(PR(3, 9)[0] - 8, PR(3, 9)[1] - 8, '(3,9)', 11.5, c54.orange, 'end'))
  parts.push(geo54Txt(388, 292, 'y = 2x + 1: (0,1), (1,3)', 11.5, c54.mid, 'start'))
  parts.push(geo54Txt(452, 120, 'image: y = 2x + 3', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(320, 372, 'slope 2 → slope 2: the image is PARALLEL — a dilation never turns a line', 12.5, c54.teal))
  return geo54Svg(640, 392, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F5 — the area–k² grid witness (9 copies tile 54)        */
/* ------------------------------------------------------------------ */
const geo54AreaGrid = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE AREA DIAL AT k = 3: NINE COPIES OF AREA 6 FILL AREA 54', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [180, 380], u = 22
  const P = (x: number, y: number): [number, number] => [O[0] + u * x, O[1] - u * y]
  const up = (i: number, j: number): string =>
    geo54Poly([P(4 * i, 3 * j), P(4 * i + 4, 3 * j), P(4 * i, 3 * j + 3)], c54.panel, 0.85, c54.green, 1.8)
  const inv = (i: number, j: number): string =>
    geo54Poly([P(4 * i + 4, 3 * j), P(4 * i, 3 * j + 3), P(4 * i + 4, 3 * j + 3)], c54.panel2, 0.85, c54.teal, 1.8)
  // six upright copies (including the original at the corner) + three inverted
  parts.push(up(0, 0), up(1, 0), up(2, 0), up(0, 1), up(1, 1), up(0, 2))
  parts.push(inv(0, 0), inv(1, 0), inv(0, 1))
  parts.push(geo54RA(P(0, 0)[0], P(0, 0)[1], 1, 0, 0, -1, 10, c54.ink))
  parts.push(geo54Txt(P(4, 0)[0] - 4, P(4, 0)[1] + 16, '(4,0)', 11, c54.ink, 'middle'))
  parts.push(geo54Txt(P(8, 3)[0] + 8, P(8, 3)[1] - 4, '(8,3)', 11, c54.ink, 'start'))
  parts.push(geo54Txt(P(4, 6)[0] - 8, P(4, 6)[1] - 6, '(4,6)', 11, c54.ink, 'end'))
  parts.push(geo54Txt(P(12, 0)[0], P(12, 0)[1] + 16, '(12,0)', 11, c54.green, 'middle'))
  parts.push(geo54Txt(P(0, 9)[0] - 8, P(0, 9)[1] - 6, '(0,9)', 11, c54.green, 'end'))
  parts.push(geo54Txt(240, 350, 'upright copies', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(300, 262, 'half-turn copies', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(320, 416, 'area 6 × 9 = 54: areas ride k², with k² = 9 — counted copy by copy', 12.5, c54.teal))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F6 — the honest failure: 2×6 against 3×4                */
/* ------------------------------------------------------------------ */
const geo54RectFail = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE HONEST FAILURE: 2×6 AGAINST 3×4', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Rect(100, 90, 52, 156, c54.panel, 0.8, c54.mid, 2.4))
  parts.push(geo54Txt(126, 172, '2×6', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(126, 266, 'short/long = 2/6 = 1/3', 11.5, c54.mid))
  parts.push(geo54Rect(300, 138, 78, 104, c54.panel2, 0.8, c54.teal, 2.4))
  parts.push(geo54Txt(339, 192, '3×4', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(339, 266, 'short/long = 3/4', 11.5, c54.teal))
  parts.push(geo54Arrow(170, 170, 285, 170, c54.amber, 2.2))
  parts.push(geo54Txt(227, 158, 'k = ?', 12.5, c54.amber, 'middle', '700'))
  parts.push(geo54Txt(320, 292, 'same angles, same area 12 — the ratio test still refuses', 12, c54.teal))
  parts.push(geo54Txt(320, 320, 'walk one onto the other: 2/3, 3/2, 2/3, 3/2 — TWO values, no single k', 12.5, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(320, 352, 'NOT similar — no dilation carries one onto the other', 12.5, c54.red, 'middle', '700'))
  return geo54Svg(640, 380, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F7 — the honest 1:3 family, all dilations of 1×3        */
/* ------------------------------------------------------------------ */
const geo54Family13 = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE HONEST 1 : 3 FAMILY — ONE KNOB, FOUR SIZES', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [150, 395], u = 22
  parts.push(geo54Rect(O[0], O[1] - 15 * u, 5 * u, 15 * u, c54.panel2, 0.55, c54.orange, 2.6))
  parts.push(geo54Rect(O[0], O[1] - 12 * u, 4 * u, 12 * u, c54.panel, 0.6, c54.green, 2.4))
  parts.push(geo54Rect(O[0], O[1] - 9 * u, 3 * u, 9 * u, c54.panel, 0.8, c54.teal, 2.4))
  parts.push(geo54Rect(O[0], O[1] - 3 * u, 1 * u, 3 * u, c54.panel, 1, c54.mid, 2.6))
  const leaders: Array<[number, string, string]> = [
    [O[1] - 15 * u, 'k = 5: 5 × 15 (area 75)', c54.orange],
    [O[1] - 12 * u, 'k = 4: 4 × 12 (area 48)', c54.green],
    [O[1] - 9 * u, 'k = 3: 3 × 9 (area 27)', c54.teal],
    [O[1] - 3 * u + 33, 'k = 1: the 1 × 3 seed (area 3)', c54.mid],
  ]
  leaders.forEach(([y, s, col]) => {
    parts.push(geo54Line(268, y, 300, y, c54.faint, 1.4))
    parts.push(geo54Txt(306, y + 4, s, 11.5, col, 'start'))
  })
  parts.push(geo54Txt(O[0] - 12, O[1] + 16, 'O', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(320, 415, '3/9 = 4/12 = 5/15 = 1/3: one proportion — every member is a dilation of the seed', 12.5, c54.teal))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F8 — the Thales shadow dilation re-read (true to scale) */
/* ------------------------------------------------------------------ */
const geo54Shadow = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THALES RE-READ: THE SHADOW DILATION', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(320, 44, 'one dilation, centre O at the shadow tip: k = 18/2.4 = 7.5', 12, c54.teal))
  const O: [number, number] = [30, 392], s = 26
  const W = (x: number, y: number): [number, number] => [O[0] + s * x, O[1] - s * y]
  parts.push(geo54Line(20, O[1], 566, O[1], c54.ink, 2.2))
  parts.push(geo54Line(O[0], O[1], W(18, 12.75)[0], W(18, 12.75)[1], c54.amber, 1.8, '6 5'))
  parts.push(geo54Line(W(2.4, 0)[0], W(2.4, 0)[1], W(2.4, 1.7)[0], W(2.4, 1.7)[1], c54.mid, 5, ''))
  parts.push(geo54Line(W(18, 0)[0], W(18, 0)[1], W(18, 12.75)[0], W(18, 12.75)[1], c54.green, 6, ''))
  parts.push(geo54Dot(O[0], O[1], c54.orange, 5))
  parts.push(geo54Dot(W(2.4, 1.7)[0], W(2.4, 1.7)[1], c54.mid, 4))
  parts.push(geo54Dot(W(18, 12.75)[0], W(18, 12.75)[1], c54.green, 4))
  parts.push(geo54Txt(O[0] - 4, O[1] + 26, 'O (shadow tip)', 11.5, c54.orange, 'start'))
  parts.push(geo54Txt(W(1.2, 0)[0], W(1.2, 0)[1] + 26, '2.4 m', 11.5, c54.ink, 'middle'))
  parts.push(geo54Txt(92, 332, 'stake 1.7 m', 11.5, c54.mid))
  parts.push(geo54Txt(W(18, 12.75)[0] + 8, W(18, 12.75)[1] + 4, 'tree 12.75 m', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(W(18, 0)[0] + 6, O[1] + 26, 'shadow 18 m', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(320, 368, 'stake 1.7 m → tree 12.75 m: ONE machine, one k', 12.5, c54.teal))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F9 — the 3-4-5 altitude as two dilations                */
/* ------------------------------------------------------------------ */
const geo54Altitude = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE 3, 4, 5 ALTITUDE: TWO DILATIONS OF ONE TRIANGLE', 13, c54.ink, 'middle', '700'))
  const u = 36
  const A: [number, number] = [240, 390], B: [number, number] = [240 + 3 * u, 390], C: [number, number] = [240, 390 - 4 * u]
  const F: [number, number] = [240 + 1.92 * u, 390 - 1.44 * u]
  parts.push(geo54Poly([A, B, C], c54.panel, 0.5, c54.mid, 2.6))
  parts.push(geo54Poly([A, B, F], c54.panel, 0.85, c54.teal, 2))
  parts.push(geo54Poly([A, F, C], c54.panel2, 0.85, c54.green, 2))
  parts.push(geo54Line(A[0], A[1], F[0], F[1], c54.orange, 2.4, '6 4'))
  parts.push(geo54RA(A[0], A[1], 1, 0, 0, -1, 11, c54.ink))
  parts.push(geo54RA(F[0], F[1], -0.6, -0.8, 0.8, -0.6, 10, c54.ink))
  parts.push(geo54Txt(A[0] - 12, A[1] + 16, 'A', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(B[0] + 10, B[1] + 4, 'B', 12.5, c54.ink, 'start', '700'))
  parts.push(geo54Txt(C[0] - 12, C[1] - 6, 'C', 12.5, c54.ink, 'end', '700'))
  parts.push(geo54Txt(F[0] + 10, F[1] - 6, 'F', 12.5, c54.orange, 'start', '700'))
  parts.push(geo54Txt((A[0] + B[0]) / 2, A[1] + 16, 'AB = 3', 11.5, c54.ink))
  parts.push(geo54Txt(A[0] - 10, (A[1] + C[1]) / 2, 'AC = 4', 11.5, c54.ink, 'end'))
  parts.push(geo54Txt(322, 296, 'BC = 5', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(358, 372, 'BF = 1.8', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(292, 282, 'FC = 3.2', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(266, 374, 'h = 2.4', 11.5, c54.orange, 'end'))
  parts.push(geo54Txt(216, 404, 'ABF: scale 0.6', 11.5, c54.teal, 'end'))
  parts.push(geo54Txt(400, 404, 'AFC: scale 0.8', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(320, 424, 'h² = 1.8 × 3.2 = 5.76, h = 2.4 — and 9 = 5 × 1.8, 16 = 5 × 3.2', 12, c54.teal))
  return geo54Svg(640, 436, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F10 — the two centres of similitude                     */
/* ------------------------------------------------------------------ */
const geo54Similitude = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE DOORSTEP: TWO CENTRES OF SIMILITUDE', 13, c54.ink, 'middle', '700'))
  const S = 28, OY = 215
  const W = (x: number): number => 8 + (x + 5) * S
  parts.push(geo54Circle(W(0), OY, 2 * S, c54.panel, 0.6, c54.mid, 2.6))
  parts.push(geo54Circle(W(10), OY, 6 * S, c54.white, 0, c54.green, 2.6))
  parts.push(geo54Line(W(-5), OY, W(16), OY, c54.faint, 1.4, '4 4'))
  parts.push(geo54Arrow(W(0) + 8, OY - 8, W(10) - 10, OY - 8, c54.amber, 2))
  parts.push(geo54Txt((W(0) + W(10)) / 2, OY - 14, 'k = +3 maps O1 onto O2', 12, c54.amber, 'middle', '700'))
  parts.push(geo54Arrow(W(0) + 8, OY + 12, W(10) - 10, OY + 12, c54.red, 2))
  parts.push(geo54Txt((W(0) + W(10)) / 2, OY + 30, 'k = −3 maps O1 onto O2 too', 12, c54.red, 'middle', '700'))
  parts.push(geo54Dot(W(-5), OY, c54.red, 5))
  parts.push(geo54Dot(W(2.5), OY, c54.orange, 5))
  parts.push(geo54Dot(W(0), OY, c54.ink, 5))
  parts.push(geo54Dot(W(10), OY, c54.ink, 5))
  parts.push(geo54Txt(W(-5) + 2, OY + 48, 'external (−5,0)', 11.5, c54.red, 'start', '700'))
  parts.push(geo54Txt(W(2.5), OY + 48, 'internal (2.5,0)', 11.5, c54.orange, 'middle', '700'))
  parts.push(geo54Txt(W(0), OY - 12, 'O1, r = 2', 11.5, c54.ink))
  parts.push(geo54Txt(W(10), OY - 12, 'O2, r = 6', 11.5, c54.ink))
  parts.push(geo54Txt(320, 398, 'DIRECT: k = +3 about (−5,0), distances 5 : 15 = 2 : 6', 12, c54.red, 'middle', '700'))
  parts.push(geo54Txt(320, 416, 'OPPOSITE: k = −3 about (2.5,0), distances 2.5 : 7.5 = 1 : 3', 12, c54.orange, 'middle', '700'))
  return geo54Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the foreign-centre construction (Illustration 1)*/
/* ------------------------------------------------------------------ */
const geo54Foreign = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'CONSTRUCTION: D AT CENTRE (1,1) WITH k = 2 AT (3,5)', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Line(120, 300, 255, 165, c54.faint, 1.4, '4 4'))
  parts.push(geo54Arrow(120, 300, 180, 240, c54.amber, 2.2))
  parts.push(geo54Arrow(120, 300, 240, 180, c54.teal, 2.2))
  parts.push(geo54Dot(120, 300, c54.ink, 4.5))
  parts.push(geo54Dot(180, 240, c54.ink, 4.5))
  parts.push(geo54Dot(240, 180, c54.orange, 4.5))
  parts.push(geo54Txt(150, 282, 'P − O = (2,4)', 11.5, c54.amber, 'start'))
  parts.push(geo54Txt(208, 236, '2 × (P − O) = (4,8)', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(108, 318, 'O (1,1)', 11.5, c54.ink, 'end'))
  parts.push(geo54Txt(172, 256, 'P (3,5)', 11.5, c54.ink, 'end'))
  parts.push(geo54Txt(250, 176, 'image (5,9)', 11.5, c54.orange, 'start'))
  parts.push(geo54Txt(320, 340, '(3,5) → (5,9): subtract, scale, add back — the inverse runs it in reverse', 12, c54.teal))
  return geo54Svg(640, 360, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the shadow dilation compact (Illustration 2)   */
/* ------------------------------------------------------------------ */
const geo54ShadowSol = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE SHADOW DILATION, ONE MORE TIME', 13, c54.ink, 'middle', '700'))
  const O: [number, number] = [40, 300], s = 20
  const W = (x: number, y: number): [number, number] => [O[0] + s * x, O[1] - s * y]
  parts.push(geo54Line(20, O[1], 560, O[1], c54.ink, 2))
  parts.push(geo54Line(O[0], O[1], W(18, 12.75)[0], W(18, 12.75)[1], c54.amber, 1.6, '5 4'))
  parts.push(geo54Line(W(2.4, 0)[0], W(2.4, 0)[1], W(2.4, 1.7)[0], W(2.4, 1.7)[1], c54.mid, 4))
  parts.push(geo54Line(W(18, 0)[0], W(18, 0)[1], W(18, 12.75)[0], W(18, 12.75)[1], c54.green, 5))
  parts.push(geo54Dot(O[0], O[1], c54.orange, 4.5))
  parts.push(geo54Dot(W(2.4, 1.7)[0], W(2.4, 1.7)[1], c54.mid, 3.5))
  parts.push(geo54Dot(W(18, 12.75)[0], W(18, 12.75)[1], c54.green, 3.5))
  parts.push(geo54Txt(250, 70, 'k = 18/2.4 = 7.5', 12, c54.amber, 'middle', '700'))
  parts.push(geo54Txt(88, 254, 'stake 1.7 m', 11.5, c54.mid))
  parts.push(geo54Txt(408, 48, 'tree 12.75 m', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(28, 316, 'O', 11.5, c54.orange, 'start'))
  parts.push(geo54Txt(64, 318, '2.4 m', 11.5, c54.ink))
  parts.push(geo54Txt(400, 318, '18 m', 11.5, c54.ink))
  parts.push(geo54Txt(320, 336, '1.7 × 7.5 = 12.75 m — the machine does the measuring', 12, c54.teal))
  return geo54Svg(640, 348, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the similitude-centre ratio strip (Illus. 3)   */
/* ------------------------------------------------------------------ */
const geo54SimSol = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE TWO CENTRES IN ONE PICTURE', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Line(40, 180, 600, 180, c54.faint, 1.4, '4 4'))
  parts.push(geo54Circle(127.5, 180, 35, c54.panel, 0.6, c54.mid, 2.4))
  parts.push(geo54Circle(312.5, 180, 105, c54.white, 0, c54.green, 2.4))
  parts.push(geo54Dot(40, 180, c54.red, 5))
  parts.push(geo54Dot(127.5, 180, c54.ink, 5))
  parts.push(geo54Dot(181, 180, c54.orange, 5))
  parts.push(geo54Dot(312.5, 180, c54.ink, 5))
  parts.push(geo54Txt(40, 206, 'X (−5,0)', 11.5, c54.red, 'middle', '700'))
  parts.push(geo54Txt(181, 206, 'N (2.5,0)', 11.5, c54.orange, 'middle', '700'))
  parts.push(geo54Txt(127, 142, 'O1', 11.5, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(312, 68, 'O2', 11.5, c54.ink, 'middle', '700'))
  parts.push(geo54Txt(84, 172, '5', 11.5, c54.red))
  parts.push(geo54Txt(220, 168, '15', 11.5, c54.red))
  parts.push(geo54Txt(154, 172, '2.5', 11.5, c54.orange))
  parts.push(geo54Txt(250, 172, '7.5', 11.5, c54.orange))
  parts.push(geo54Txt(320, 318, '5 : 15 = 2 : 6 → DIRECT k = +3 about X (−5,0)', 12, c54.red, 'middle', '700'))
  parts.push(geo54Txt(320, 340, '2.5 : 7.5 = 1 : 3 → OPPOSITE k = −3 about N (2.5,0)', 12, c54.orange, 'middle', '700'))
  return geo54Svg(640, 360, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the area dial bars (Exercise 6)                */
/* ------------------------------------------------------------------ */
const geo54AreaBars = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE AREA DIAL: 6 → 24 → 54 (× k²)', 13, c54.ink, 'middle', '700'))
  const y0 = 300, sc = 200 / 54
  parts.push(geo54Line(90, y0, 560, y0, c54.ink, 2))
  const bars: Array<[number, number, string, string]> = [
    [142, 6 * sc, '6', 'k = 1 (×1)'],
    [298, 24 * sc, '24', 'k = 2 (×4)'],
    [458, 54 * sc, '54', 'k = 3 (×9)'],
  ]
  bars.forEach(([cx, h, v, lab]) => {
    parts.push(geo54Rect(cx, y0 - h, 36, h, c54.sep, 1, c54.ink, 1.8))
    parts.push(geo54Txt(cx + 18, y0 - h - 8, v, 11.5, c54.ink))
    parts.push(geo54Txt(cx + 18, y0 + 20, lab, 11.5, c54.teal, 'middle', '700'))
  })
  parts.push(geo54Txt(320, 345, 'areas ride k², never k: 6 × 1, 6 × 4, 6 × 9', 12, c54.teal))
  return geo54Svg(640, 360, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the walking audit strip (Exercise 11)          */
/* ------------------------------------------------------------------ */
const geo54Walk = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'THE WALKING AUDIT: 2/3, 3/2, 2/3, 3/2', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Rect(120, 60, 48, 144, c54.panel, 0.8, c54.mid, 2.4))
  parts.push(geo54Txt(144, 136, '2×6', 12.5, c54.ink, 'middle', '700'))
  parts.push(geo54Rect(420, 84, 72, 96, c54.panel2, 0.8, c54.teal, 2.4))
  parts.push(geo54Txt(456, 136, '3×4', 12.5, c54.ink, 'middle', '700'))
  parts.push(geo54Arrow(180, 90, 410, 90, c54.amber, 2))
  parts.push(geo54Txt(295, 80, 'side 2 → 3: ratio 2/3', 12, c54.amber, 'middle'))
  parts.push(geo54Arrow(410, 190, 180, 190, c54.amber, 2))
  parts.push(geo54Txt(295, 208, 'side 6 → 4: ratio 3/2', 12, c54.amber, 'middle'))
  parts.push(geo54Txt(320, 262, 'two values — no single k, the machine refuses', 12.5, c54.red, 'middle', '700'))
  parts.push(geo54Txt(320, 284, 'a true dilation repeats ONE ratio everywhere', 12, c54.teal))
  return geo54Svg(640, 300, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S6 — recovering a hidden centre (Exercise 14)       */
/* ------------------------------------------------------------------ */
const geo54Centre = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo54Txt(320, 22, 'RECOVERING A HIDDEN CENTRE AT k = 2', 13, c54.ink, 'middle', '700'))
  parts.push(geo54Arrow(140, 240, 276, 172, c54.amber, 2.2))
  parts.push(geo54Arrow(140, 240, 412, 104, c54.teal, 2.2))
  parts.push(geo54Dot(140, 240, c54.ink, 4.5))
  parts.push(geo54Dot(276, 172, c54.ink, 4.5))
  parts.push(geo54Dot(412, 104, c54.orange, 4.5))
  parts.push(geo54Txt(208, 222, 'P − O = (4,2)', 11.5, c54.amber, 'start'))
  parts.push(geo54Txt(300, 180, 'image − O = 2 × (4,2)', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(140, 266, 'O = (−3,−1)', 11.5, c54.ink, 'middle'))
  parts.push(geo54Txt(276, 158, 'P (1,1)', 11.5, c54.ink, 'middle'))
  parts.push(geo54Txt(412, 92, 'image (5,3)', 11.5, c54.orange, 'middle'))
  parts.push(geo54Txt(320, 300, 'O = 2P − image = (−3,−1) — then the machine maps (2,2) → (7,5)', 12, c54.teal))
  return geo54Svg(640, 320, aria, parts)
}

export const lessonGeo504: Lesson = {
  id: 'geo-dilations-scale-factors-and-similarity-re-read',
  number: '5.4',
  title: 'Dilations, Scale Factors and Similarity Re-Read',
  concepts: ['dilation', 'centre of dilation', 'scale factor', 'area scaling k²', 'ray structure', 'similarity re-read', 'centre of similitude'],
  objectives: [
    'Run the dilation machine D(O, k)(P) = O + k(P − O) in coordinates, for centres at the origin and anywhere else, in both directions (forward and inverse reads)',
    'State what scales and what does not: distances and perimeters by |k|, areas by k², angles never — with the right-angle dot-product witness',
    'Refute the false certificates of similarity with the 2×6 vs 3×4 audit (ratios 2/3 and 3/2, no single k) and confirm the honest 1:3 family by dilation',
    'Re-read Lessons 4.1–4.4 mechanically: similarity as dilation + motion, Thales as the shadow dilation (k = 18/2.4 = 7.5), the 3-4-5 altitude segments as scale arithmetic',
    'Construct the external and internal centres of similitude of two circles and read their direct (k = +3) and opposite (k = −3) homotheties',
  ],
  prerequisites: [
    'geo-rigid-motions-slides-flips-and-turns',
    'geo-composing-transformations-and-the-isometry-idea',
    'geo-similar-figures-same-shape-at-any-scale',
    'geo-the-basic-proportionality-theorem-thales',
    'geo-the-similarity-criteria-aa-sas-sss',
    'geo-pythagoras-proved-the-theorem-earned',
  ],
  sources: ['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. the dilation machine                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The dilation machine: a centre, a knob, and one rule' },
    {
      kind: 'para',
      text: 'Lessons 5.1 and 5.2 built the rigid motions — translations, reflections, rotations, and their compositions — and Lesson 5.2 closed on the honest boundary of that family: every rigid motion preserves distance exactly, and that preservation is precisely what the word isometry means. Lesson 4.1 built the other family — similar figures, same shape at any scale — and left a quiet gap between them: WHAT motion actually produces a similar copy? The answer is the last transformation this chapter needs, and it completes the Common Core picture the chapter opened with: the rigid motions preserve distance and do not preserve shape at more than one size; the dilation preserves shape and does not preserve distance at any size other than $k = 1$. Between the two families, the whole G-CO contrast — preserve distance versus not — finally has both of its poles standing on the same floor.',
    },
    {
      kind: 'para',
      text: 'The machine itself is one line of coordinate arithmetic. A dilation with centre $O$ and scale factor $k$ sends any point $P$ to the point on the ray from $O$ through $P$ whose distance from $O$ is $|k|$ times the old one — written in coordinates as $D_{O,k}(P) = O + k(P - O)$. Read the formula slowly, because every clause is load-bearing. The vector $P - O$ points from the centre to the point; multiplying it by $k$ stretches or shrinks that displacement, keeping its direction when $k$ is positive; adding $O$ back puts the centre where the formula needs it, so that $P = O$ maps to $O$ itself — the centre is always fixed. The scale factor is ONE knob: there is no second dial to turn, no direction that gets stretched more than another. That one-knob discipline is exactly what Lesson 4.1 demanded of a similarity — one common ratio for every pair of corresponding lengths — and the dilation is the machine that delivers it.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'The dilation machine (the working definition)',
      text: 'For a centre $O$ and a scale factor $k$, the dilation $D_{O,k}$ sends $P$ to $O + k(P - O)$. The centre $O$ is fixed ($D_{O,k}(O) = O$). If $k > 1$ the machine enlarges: every point moves OUT along its ray, distances from $O$ multiply by $k$. If $0 < k < 1$ it shrinks: distances multiply by $k < 1$. If $k = 1$ it is the identity — every point stays put, and the dilation collapses into doing nothing (the rigid motions are the $|k| = 1$ rung of the same ladder). If $k$ is negative, the image lands on the OPPOSITE ray — the machine applies the half-turn sense on the way past, with distances still multiplied by $|k|$.',
    },
    {
      kind: 'para',
      text: 'Run the machine at the pinned settings and watch the rule hold with no exceptions. About the origin with $k = 3$: the point $(2,1)$ lands on $(6,3)$ — each coordinate tripled, the ray from the origin through $(2,1)$ preserved. With $k = 1/2$: $(4,6)$ lands on $(2,3)$ — each coordinate halved, the point pulled toward the centre. With $k = -2$: $(1,2)$ lands on $(-2,-4)$ — each coordinate doubled AND negated, the image diagonally opposite the centre at twice the distance. The negative case deserves its honest paragraph, because many school treatments quietly restrict $k$ to positive values: the formula does not. A negative $k$ multiplies the displacement vector by a negative number, which reverses its direction while rescaling its length — geometrically, a half-turn about the centre composed with a positive dilation. The pinned witness is the picture below: $(1,2)$ and its image $(-2,-4)$ on opposite rays through $O$, with $\\sqrt{5}$ of distance becoming $2\\sqrt{5}$ — the distance law $|k|$ unbroken, the direction law honestly reported.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the dilation machine. The witness triangle with vertices (0,0), (4,0), (0,3) about the origin at k = 3: every vertex rides its ray from O outward, (2,1) → (6,3) marked on its own ray, the area growing 6 → 54 = 9 × 6. The centre O is fixed; the rays are kept; the distances triple.',
      svg: geo54Machine('The dilation machine: a right triangle with vertices (0,0), (4,0) and (0,3) about the origin at scale factor k = 3, its image with vertices (0,0), (12,0) and (0,9), rays from O through corresponding vertices, the point (2,1) mapping to (6,3), and the area growing from 6 to 54.'),
    },
    {
      kind: 'para',
      text: 'One figure, three futures: the same witness triangle run at $k = 1/2$, $k = 1$ and $k = 3$ shows the knob through its whole travel. At $k = 1/2$ the triangle pulls in toward $O$ — its area does not halve but quarter, to $1.5$, a preview of the section after next. At $k = 1$ nothing moves: this is the identity, the degenerate rung where dilation and rigid motion shake hands, and where similarity (Chapter 4) and congruence (Chapter 3) were always the same idea. At $k = 3$ the triangle sweeps out to area $54$. Three settings, one centre, one rule — and notice that all three images sit on the SAME rays from $O$: whatever $k$ does to distances, it never moves a point off its ray. That ray structure is not a curiosity; it is the load-bearing wall of the whole lesson, and two sections from now it will explain what a dilation does to every line in the plane.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the k-family. The witness triangle about one centre at k = 1/2 (area 1.5), k = 1 (the identity — area 6, every point fixed) and k = 3 (area 54). All three images live on the same rays from O; only the distances change.',
      svg: geo54KFamily('One right triangle about a centre O drawn at three scale factors: k = 1/2 shrunk with area 1.5, k = 1 fixed with area 6, and k = 3 enlarged with area 54, all nested on the same rays from O.'),
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — the negative scale factor, honestly drawn. D at k = −2 carries (1,2) to (−2,−4): the opposite ray through O, the distance doubled from √5 to 2√5. The small flag triangle and its image show the half-turn sense the negative sign carries.',
      svg: geo54NegK('A centre O with the point (1,2) mapping to the opposite point (−2,−4) at k = −2, distances doubling through the centre, with a small flag triangle and its half-turned image on opposite rays.'),
    },
    {
      kind: 'para',
      text: 'A note on what the machine is NOT, to keep the account from Lesson 5.2 honest. A dilation with $|k| \\ne 1$ is not an isometry — re-run that lesson\u2019s witness and the segment of length $3$ about the origin at $k = 2$ comes back with length $6$. Distance is not preserved; the isometry idea does not cover this machine. But neither is a dilation a distortion of the kind Lesson 4.1 refused: a photo-lab stretch that widens by $2$ and heightens by $3$ turns ONE knob into two and destroys shape. The dilation is the third thing, precisely midway: it changes every distance by the SAME factor, so shape survives while size moves. That sentence — same factor everywhere, shape survives, size moves — is the entire content of this lesson, and everything that follows is it wearing different clothes.',
    },

    /* -------------------------------------------------------------- */
    /* 2. reading k off images                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Reading k off images: the coordinate machine at work' },
    {
      kind: 'para',
      text: 'The machine runs forward from $(O, k, P)$ to image; the working questions of this topic run backward. Given a point and its image, read the machine\u2019s settings. The origin case is a one-step division: if $(2,3)$ is carried to $(5,7.5)$ about the origin, then each coordinate was multiplied by the same hidden factor, and $5/2 = 2.5$, $7.5/3 = 2.5$ — both reads agree on $k = 2.5$. The agreement is not decoration; it is the test. Had the two coordinates disagreed — say $(2,3)$ carried to $(5,9)$, with reads $2.5$ and $3$ — no dilation about the origin explains the pair, and the honest verdict is that some TWO-knob distortion did it, not a dilation. One image pair is a full audit of one knob.',
    },
    {
      kind: 'para',
      text: 'A foreign centre changes the arithmetic but not the idea. The formula $D_{O,k}(P) = O + k(P - O)$ runs in three moves: subtract the centre, scale, add the centre back. Take the pinned foreign-centre witnesses. Centre $(1,1)$ with $k = 2$ at the point $(3,5)$: subtract to get $(2,4)$; scale to get $(4,8)$; add back to land on $(5,9)$. Centre $(2,3)$ with $k = 1/2$ at the point $(6,7)$: subtract to get $(4,4)$; halve to get $(2,2)$; add back to land on $(4,5)$. Both examples read BOTH ways — that is the discipline worth drilling. The inverse machine subtracts the centre, scales by $1/k$, adds back: the image $(5,9)$ with centre $(1,1)$ and $k = 2$ takes back to $(1,1) + \\tfrac{1}{2}(4,8) = (3,5)$, and $(4,5)$ with centre $(2,3)$, $k = 1/2$ takes back to $(2,3) + 2(2,2) = (6,7)$. Forward and backward are the same formula with $k$ replaced by $1/k$ — the direction discipline of Lesson 4.1, now running inside a coordinate machine.',
    },
    {
      kind: 'table',
      caption: 'The coordinate machine at the pinned settings — every image recomputed by the engine, both directions',
      head: ['Centre O', 'k', 'Point P', 'Image D(P)', 'The inverse read'],
      rows: [
        ['(0,0)', '$3$', '$(2,1)$', '$(6,3)$', '$(6,3) \\to (2,1)$ at $k = 1/3$'],
        ['(0,0)', '$1/2$', '$(4,6)$', '$(2,3)$', '$(2,3) \\to (4,6)$ at $k = 2$'],
        ['(0,0)', '$-2$', '$(1,2)$', '$(-2,-4)$', '$(-2,-4) \\to (1,2)$ at $k = -1/2$'],
        ['(1,1)', '$2$', '$(3,5)$', '$(5,9)$', '$(5,9) \\to (3,5)$ at $k = 1/2$'],
        ['(2,3)', '$1/2$', '$(6,7)$', '$(4,5)$', '$(4,5) \\to (6,7)$ at $k = 2$'],
      ],
    },
    {
      kind: 'para',
      text: 'And the read generalizes from points to shapes without new machinery, because the machine acts on each vertex independently. The scale factor read off ONE faithful pair — a point and its image, both coordinates agreeing — is the scale factor for EVERYTHING in the figure: every vertex, every side, every diagonal. So $k = 2.5$ read from $(2,3) \\to (5,7.5)$ is immediately $k = 2.5$ for the whole plane, and any prediction made with it is a prediction about every point: $(6,1)$ must land on $(15,2.5)$, a segment of length $4$ must come back with length $10$, and an area of $8$ must come back multiplied by $k^2 = 6.25$ to $50$. The engine verified each of those before this sentence was allowed to stand — the last one because it is the next section\u2019s whole subject: areas do NOT ride $k$, and the number $6.25$ is where the surprise lives.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Two reads, one k — or no dilation at all',
      text: 'When you read $k$ off an image pair, read BOTH coordinates (or both endpoints of a side). If the reads disagree, the honest conclusion is NOT “pick the nicer one” — it is that no single dilation explains the data: the mapping stretched one direction more than another, which is exactly the distortion Lesson 4.1 taught you to refuse. The two-read audit is the coordinate-age version of that lesson\u2019s ratio test, and it costs one division.',
    },

    /* -------------------------------------------------------------- */
    /* 3. what scales and what does not                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What scales and what does not: the |k|, k² census' },
    {
      kind: 'para',
      text: 'The machine\u2019s action on distances is the whole census, and everything else follows from it. Take the pinned segment: $(1,1)$ to $(4,5)$, length $5$. Under the origin dilation at $k = 3$ the endpoints land on $(3,3)$ and $(12,15)$, and the image length is $15$ — exactly $3 \\times 5$. The proof is two lines and worth owning: $D(P) - D(Q) = \\big(O + k(P-O)\\big) - \\big(O + k(Q-O)\\big) = k(P - Q)$, so the image displacement is the original displacement scaled by $k$, and lengths scale by $|k|$ — the absolute value only because a negative $k$ reverses direction while keeping the length law. Every length in the plane obeys the same law at once: sides, perimeters, diagonals, heights, radii. The perimeter of the witness triangle is $12$; at $k = 3$ it is $36$ — a length made of lengths, riding the same dial.',
    },
    {
      kind: 'derivation',
      title: 'Why distances scale by |k| and angles never move',
      statement: 'Under $D_{O,k}$, every distance multiplies by $|k|$ and every angle is unchanged — the two facts that make the dilation the engine of similarity.',
      steps: [
        {
          label: 'Displacements scale exactly',
          formula: 'D(P) - D(Q) = k\\,(P - Q)',
          explanation: 'The centre cancels in the difference: the image of the vector from $Q$ to $P$ is $k$ times that vector. Lengths therefore scale by $|k|$ — the machine stretches every displacement by the same factor, which is precisely the one-knob discipline.',
        },
        {
          label: 'Dot products scale by k²',
          formula: '(ku) \\cdot (kv) = k^2\\,(u \\cdot v)',
          explanation: 'An angle is computed from a dot product divided by two lengths: $\\cos\\theta = \\frac{u \\cdot v}{|u|\\,|v|}$. Under the machine the top picks up $k^2$ and the bottom picks up $k^2$ — the factors cancel, and the cosine, hence the angle, is untouched.',
        },
        {
          label: 'The right-angle witness at k = 3',
          formula: '(12, 0) \\cdot (0, 9) = 0',
          explanation: 'The witness triangle\u2019s right angle at the origin has image vectors $(12,0)$ and $(0,9)$ — dot product $0$, so the right angle survives exactly. The engine ran the general check too: the 3-4-5 angles $90°$, $53.1301°$, $36.8699°$ come back identical at $k = 3$, to the last decimal.',
        },
        {
          label: 'Why |k| and not k',
          explanation: 'At $k = -2$ the displacement reverses direction (the half-turn sense of Section 1) but its LENGTH is still multiplied by $2$: distances are unsigned, so the law carries an absolute value. Angles inherit the same immunity — the half-turn turns lines through $O$ by $180°$ but every angle between two rays is preserved, as the flag-and-image picture in Figure F3 shows.',
        },
      ],
      result: 'Distances and perimeters scale by |k|; areas scale by k²; angles NEVER move. Three dials, one knob — and the angle dial is welded shut.',
    },
    {
      kind: 'para',
      text: 'Areas are the surprise, and the grid picture makes the surprise countable rather than mystical. Dilate the witness triangle — area $6$ — by $k = 3$ about the origin: the image has vertices $(0,0)$, $(12,0)$, $(0,9)$ and area $54$, which is $9 \\times 6$: the square of the scale. The grid figure shows where the nine copies hide. The image triangle tiles into NINE copies of the original — six upright (the original itself at the corner, then translates $(4,0)$, $(8,0)$, $(0,3)$, $(4,3)$, $(0,6)$ along the lattice) and three half-turned copies filling the far sides of the grid cells. Each copy has area exactly $6$, the total is $9 \\times 6 = 54$, and the count is the theorem: $k^2 = 9$ copies, because area is a product of TWO lengths and each contributes its factor of $k$. At $k = 1/2$ the same count runs backward: $k^2 = 1/4$ of the copies fit, and the area is $6 \\times 1/4 = 1.5$, as Figure F2 promised.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the area–k² grid witness. The k = 3 image (0,0), (12,0), (0,9) of the witness triangle, tiled by nine copies of the original: six upright (green) and three half-turned (pink), each of area 6. The lattice points (4,0), (8,3), (4,6) sit exactly on the image hypotenuse 3x + 4y = 36.',
      svg: geo54AreaGrid('The enlarged triangle with vertices (0,0), (12,0) and (0,9) tiled by nine copies of the original 3-by-4 right triangle: six upright and three half-turned, each of area 6, filling area 54, with the lattice points (4,0), (8,3) and (4,6) on the hypotenuse.'),
    },
    {
      kind: 'table',
      caption: 'The what-scales census — three dials, one knob, every row witnessed on the pinned triangle (area 6, perimeter 12)',
      head: ['Quantity', 'Law', 'At k = 3', 'At k = 1/2', 'Witness'],
      rows: [
        ['distances from O', '$\\times\\,|k|$', '$\\times 3$', '$\\times 0.5$', 'segment $5 \\to 15$ at $k = 3$'],
        ['perimeter', '$\\times\\,|k|$', '$12 \\to 36$', '$12 \\to 6$', 'a sum of lengths'],
        ['area', '$\\times\\,k^2$', '$6 \\to 54$', '$6 \\to 1.5$', 'nine copies in the grid'],
        ['angles', 'NEVER', 'unchanged', 'unchanged', '$(12,0) \\cdot (0,9) = 0$'],
      ],
    },
    {
      kind: 'para',
      text: 'The census has one more row that behaves unlike any other: the lines of the plane. Run the origin dilation at $k = 3$ on the line $y = 2x + 1$, sampled at $(0,1)$ and $(1,3)$: the images are $(0,3)$ and $(3,9)$, and the line through THEM has slope $(9-3)/(3-0) = 2$ — the same slope, so the image is a line PARALLEL to the original. It is not the same line: $(0,3)$ does not satisfy $y = 2x + 1$; it satisfies $y = 2x + 3$. The derivation below shows this is structural, not accidental: image displacements are $k$ times originals, so image slopes equal original slopes. But a line THROUGH the centre behaves differently: $y = 2x$ sampled at $(1,2)$ gives image $(3,6)$ — and $(3,6)$ is still on $y = 2x$, because $6 = 2 \\times 3$. The line maps to ITSELF, point by point sliding along itself. This asymmetry — through the centre: self-map; off the centre: parallel copy — is the ray structure of Section 1 drawn in lines, and it is why a dilation takes any triangle to a similar one: sides through no common point go to parallel copies, angles are preserved, and Lesson 4.1\u2019s double demand is met by machine.',
    },
    {
      kind: 'derivation',
      title: 'Why the image of a line is a parallel line',
      statement: 'Under a dilation, any line not through the centre maps to a PARALLEL line; a line through the centre maps to itself.',
      steps: [
        {
          label: 'Slope is a ratio of displacements',
          formula: 'm = \\frac{\\Delta y}{\\Delta x}',
          explanation: 'A line\u2019s slope is computed from ANY two of its points — the displacement between them. The dilation acts on displacements by the factor $k$ in BOTH coordinates (Section 3\u2019s first law).',
        },
        {
          label: 'The k cancels in the ratio',
          formula: 'm' + "' = \\frac{k\\,\\Delta y}{k\\,\\Delta x} = m",
          explanation: 'Image slope equals original slope: the image of a line is a line with the SAME slope — either the line itself or a parallel twin.',
        },
        {
          label: 'Which twin? Ask the ray structure',
          explanation: 'A point $P$ on a line through $O$ maps along the ray $OP$, which lies IN the line — so the image stays in the line and the line maps to itself (witness: $(1,2) \\to (3,6)$ still on $y = 2x$). A line missing $O$ has its points carried off their line onto a parallel one (witness: $(0,1) \\to (0,3)$, landing on $y = 2x + 3$, not $y = 2x + 1$).',
        },
      ],
      result: 'Off-centre lines go to parallel copies; centre lines map to themselves — the ray structure, read in slopes.',
    },
    {
      kind: 'figure',
      caption: 'Figure F5 — the ray structure in lines. Left: y = 2x passes through O and maps to itself — (1,2) slides to (3,6) along the same line. Right: y = 2x + 1 misses O and maps to the PARALLEL line y = 2x + 3 — (0,1) → (0,3), (1,3) → (3,9), slope 2 both times.',
      svg: geo54Lines('Two panels: on the left the line y = 2x through the centre O mapping to itself with the point (1,2) sliding to (3,6); on the right the line y = 2x + 1 mapping to the parallel image line y = 2x + 3 with (0,1) going to (0,3) and (1,3) to (3,9).'),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The census is the similarity licence',
      text: 'Assemble the census and the Chapter 4 definition falls out for free. A dilation preserves every angle (the dot-product law), puts every side of the image at ONE common ratio $k$ to its original (the distance law), and moves nothing off its ray. So the image of ANY figure under ANY dilation is similar to the original in exactly Lesson 4.1\u2019s sense — all angles equal, all sides in one common ratio, direction stated. The machine does not merely illustrate similarity; it MASS-PRODUCES it, one $k$ at a time.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the honest non-similarity                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The honest non-similarity: when no dilation exists' },
    {
      kind: 'para',
      text: 'The census of Section 3 shows what the dilation machine DOES; the honest question is the converse one. Lesson 4.1 proved that two rectangles can share every angle and even an area and still fail to be similar — and now, with the machine on the table, that refusal can be stated in its strongest form: there is NO dilation, about ANY centre, with ANY scale factor, that carries a $2 \\times 6$ rectangle onto a $3 \\times 4$ one. The proof is the machine\u2019s own law turned against the pair. A dilation multiplies EVERY displacement by the same $|k|$ — so walk around the $2 \\times 6$ rectangle pairing each side with the corresponding side of the $3 \\times 4$: the short sides would demand $2/3$, the long sides $3/2$, and those are two different numbers. A machine with one knob cannot produce a copy whose sides answered to two; the walking audit reads $2/3$, $3/2$, $2/3$, $3/2$ around the polygon — exactly two distinct values, and no single $k$ anywhere.',
    },
    {
      kind: 'figure',
      caption: 'Figure F6 — the honest failure re-read as a machine refusal. The 2×6 and 3×4 rectangles: all angles 90°, both areas 12, and the candidate k reads 2/3 and 3/2 disagreeing — no dilation carries one onto the other, which is Lesson 4.1\u2019s verdict now stated with the engine that would have to produce it.',
      svg: geo54RectFail('Two rectangles, one 2 by 6 and one 3 by 4, with a question-mark arrow between them, the ratio reads 2/3 and 3/2, the shared facts of right angles and area 12, and the verdict NOT similar because no dilation carries one onto the other.'),
    },
    {
      kind: 'para',
      text: 'The diagonal read sharpens the refusal into a third number. The $2 \\times 6$ rectangle has diagonal $\\sqrt{2^2 + 6^2} = \\sqrt{40} \\approx 6.3246$; the $3 \\times 4$ has diagonal $5$. If a dilation with factor $k$ carried one onto the other, the diagonal ratio would have to BE $k$ — the same $k$ the sides vote for. But $6.3246/5 \\approx 1.2649$ matches neither $2/3 \\approx 0.6667$ nor $3/2 = 1.5$: three gauges, three readings, one conclusion. This is Lesson 4.1\u2019s three-inconsistent-ratios audit verbatim — the machine adds nothing new to the arithmetic and everything to the meaning: those mismatched ratios are the fingerprint of a copy that no one-knob machine could have made.',
    },
    {
      kind: 'table',
      caption: 'The honest-negatives table — the two tempting certificates and the machine\u2019s refusal, cell by cell',
      head: ['Witness pair', 'What agrees', 'The ratio audit', 'The verdict'],
      rows: [
        ['2×6 vs 3×4', 'all angles $90°$; areas both $12$', '$2/3$ against $3/2$ — two values', 'NOT similar — no single k, no dilation'],
        ['2×6 vs 5×3 (perimeters $16$ both)', 'equal perimeters', '$1/3$ against $5/3$ — two values', 'NOT similar — no single k, no dilation'],
        ['2×6 vs its $k = 3$ image 6×18', 'same shape by construction', '$1/3$ everywhere — ONE value', 'similar — the dilation $k = 3$ did it'],
      ],
    },
    {
      kind: 'para',
      text: 'The contrast that closes the case is a family the machine happily produces. Start with the $1 \\times 3$ rectangle — the seed — and run the origin dilation at $k = 3$, $4$, $5$: the seed’s far corner $(1,3)$ maps to $(3,9)$, $(4,12)$, $(5,15)$ — the $3 \\times 9$, $4 \\times 12$, $5 \\times 15$ rectangles. Every member keeps the seed\u2019s proportion exactly ($3/9 = 4/12 = 5/15 = 1/3$), every member is reachable from the seed by ONE machine setting, and the areas climb $3 \\to 27 \\to 48 \\to 75$ — multiplied by $9$, $16$, $25$: the $k^2$ dial, run three times. Here the walking audit reads the same ratio at every corner, and the machine\u2019s signature — one number repeated everywhere — is unmistakable. Same shape is not a vibe; it is the presence or absence of a single $k$, and the dilation machine is the instrument that decides.',
    },
    {
      kind: 'figure',
      caption: 'Figure F7 — the honest 1:3 family. The 1×3 seed and its images at k = 3, 4, 5 — the 3×9, 4×12 and 5×15 rectangles — all nested on one corner ray: areas 3, 27, 48, 75, the proportion 1/3 everywhere, one machine setting per member.',
      svg: geo54Family13('Four nested rectangles sharing a corner at O — the 1 by 3 seed and its dilations at k = 3, 4 and 5 giving 3 by 9, 4 by 12 and 5 by 15 — labelled with their areas 3, 27, 48 and 75 and the constant proportion 1/3.'),
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: '“No dilation exists” is a strong statement — and checkable',
      text: 'When this lesson says two figures are NOT similar, it means the machine search fails GLOBALLY: no centre, no scale factor, no order of composition succeeds. The check is cheap because the machine has one knob: ANY candidate $k$ must repeat identically on every pair of corresponding lengths, so TWO disagreeing reads already finish the search. The $2/3$ against $3/2$ audit is not evidence toward a verdict; it IS the verdict.',
    },

    /* -------------------------------------------------------------- */
    /* 5. similarity re-read: dilation + motion                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Similarity re-read: dilation plus motion' },
    {
      kind: 'para',
      text: 'Everything now stands ready for the chapter\u2019s payoff, which is a re-reading of the whole of Chapter 4 through one lens. Two figures are SIMILAR exactly when a dilation followed by an isometry (or the isometry first, then the dilation — the order will not matter) carries one onto the other. Similarity is dilation plus motion: the machine that changes size, composed with the machines of Lessons 5.1 and 5.2 that change position and orientation without touching size. Read this against the Chapter 3 and Chapter 4 line: congruence was isometry alone ($k = 1$, the machine at rest); similarity, as Lesson 4.1 defined it by angles and ratios, is what you get when the $k$ knob is allowed to leave its rest position. The G-CO.2 contrast that this chapter opened with — transformations that preserve distance versus transformations that do not — is now complete: the rigid motions preserve distance and move shape into position; the dilation preserves shape and scales distance; and their compositions produce exactly the similar copies, no more and no less.',
    },
    {
      kind: 'para',
      text: 'Why the order does not matter, in one computed witness. Dilate the witness triangle $(0,0), (4,0), (0,3)$ by $k = 3$ about the origin, THEN translate by $(10,5)$: the images are $(10,5)$, $(22,5)$, $(10,14)$, with sides $12$, $15$, $9$. But this two-step map is itself a single dilation — same $k = 3$ — about a shifted centre $(-5,-2.5)$: running that one machine on the original vertices returns $(10,5)$, $(22,5)$, $(10,14)$ identically, vertex by vertex. A dilation followed by a TRANSLATION is always one dilation about a new centre (the engine verified the collapse on all three vertices); with reflections or rotations in the composition the same principle holds with the centre carried along by the motion. So the phrase “dilation plus motion” hides no depth: every similarity in the plane IS one dilation, seen after a change of scenery. That is why Lesson 4.1 needed only ONE $k$ — there was only ever one machine at work.',
    },
    {
      kind: 'para',
      text: 'Chapter 4\u2019s criteria re-read themselves in this light, one by one. The AA criterion of Lesson 4.3 — two angle matches force similarity — is, in machine language, the statement that angles NEVER move under dilation (Section 3\u2019s welded-shut dial) plus the fact that a triangle\u2019s shape is pinned by two angles: dilate one triangle until one pair of corresponding sides matches (always possible: choose $k$ as the side ratio), and the preserved angles then force the second side pair to land exactly on its partners. The Basic Proportionality Theorem of Lesson 4.2 is the ray structure in disguise: dilate about a vertex and the parallels it creates cut the opposite side in the ratio $k$ — Thales\u2019 theorem is what the machine\u2019s parallel-image law looks like from inside a triangle. And Lesson 4.1\u2019s direction discipline is simply the fact that the machine runs both ways, at $k$ and at $1/k$. Nothing from Chapter 4 is discarded; every result is re-homed as a statement about one machine.',
    },
    {
      kind: 'para',
      text: 'The oldest similar-triangles story in the record now gets the oldest reading too. Lesson 4.2 told Thales at the pyramid through ratios; here is the same measurement as ONE dilation. The sun\u2019s rays at a given moment are parallel, so the stake and its shadow, and the tree and its shadow, form two right triangles sharing the angle at the shadow tips — and the dilation that carries one onto the other is centred at the SHADOW TIP itself, where both triangles sit on the same ground line. The pinned numbers: a $1.7$ m stake casts a $2.4$ m shadow; a tree casts an $18$ m shadow at the same moment. The machine\u2019s setting is read off the shadows: $k = 18/2.4 = 7.5$. Applying it to the stake\u2019s height: $1.7 \\times 7.5 = 12.75$ — the tree is $12.75$ m tall. The figure shows the single machine at work: one centre, one $k$, the stake triangle swept onto the tree triangle. The cross-check the engine ran — $1.7 \\times 18 = 30.6$, and $30.6/2.4 = 12.75$ — is the same computation with the $k$ never written down, which is exactly why the ratio method of 4.2 and the machine method of 5.4 are the same method.',
    },
    {
      kind: 'figure',
      caption: 'Figure F8 — the Thales shadow dilation re-read (drawn true to scale at 26 px per metre). The stake (1.7 m at 2.4 m from the shadow tip) and the tree (12.75 m at 18 m) on one ground line: the dashed ray from the shadow tip O through the stake top continues through the tree top — one dilation, centre O, k = 18/2.4 = 7.5, carrying 1.7 m onto 12.75 m.',
      svg: geo54Shadow('A ground line with the shadow tip O, a 1.7 metre stake standing 2.4 metres from O and a tree 12.75 metres tall standing 18 metres from O, one dashed ray through the stake top and tree top, labelled k = 18/2.4 = 7.5 with the stake mapping to the tree.'),
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'One machine, twenty-six centuries',
      text: 'Thales of Miletus (c. 624–546 BCE) measured what he could not reach by comparing shadows; the story survives through later commentators rather than his own writings, so it is honoured here as tradition, not as a documented experiment. What is documentable is the mathematical content: the shadow method NEEDS the similarity of the two shadow triangles, Lesson 4.3\u2019s AA criterion licenses that step, and the dilation machine of this lesson shows the licence was always one knob and one centre. The dilation-completes-the-family framing is the ground this lesson cites: the machine is the missing member between the rigid motions (which preserve distance) and the distortions (which preserve nothing worth naming).',
    },

    /* -------------------------------------------------------------- */
    /* 6. Pythagoras re-read: the altitude as two dilations           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Pythagoras re-read: the altitude as two dilations' },
    {
      kind: 'para',
      text: 'Lesson 4.4 earned the geometric-mean machine — the altitude-to-the-hypotenuse construction with its leg-square laws — and proved it with congruent-triangle machinery. Now watch the same construction run on the 3-4-5 witness, and watch the numbers organize themselves into scale arithmetic. Place the right angle at $A = (0,0)$ with legs $AB = 3$ and $AC = 4$ and hypotenuse $BC = 5$; drop the altitude from $A$ to $BC$, meeting it at $F$. The engine\u2019s coordinates: $F = (1.92, 1.44)$, giving $BF = 1.8$, $FC = 3.2$, and altitude $h = 2.4$. Three numbers, and every one of them is a dilation reading in disguise — because the altitude splits the big triangle into two small right triangles, and EACH small triangle is the big one at a machine setting.',
    },
    {
      kind: 'para',
      text: 'The readings, checked ratio by ratio. Triangle $ABF$ (right-angled at $F$, hypotenuse $AB$) has sides $AB = 3$, $BF = 1.8$, $AF = 2.4$ — and against the big triangle\u2019s matching sides these read $3/5$, $1.8/3$, $2.4/4$: all equal to $3/5 = 0.6$. Triangle $ABF$ is the big triangle at $k = 0.6$. Triangle $AFC$ (hypotenuse $AC$) has sides $AC = 4$, $FC = 3.2$, $AF = 2.4$ — reading $4/5$, $3.2/4$, $2.4/3$: all equal to $4/5 = 0.8$. Triangle $AFC$ is the big triangle at $k = 0.8$. The two settings are forced, not chosen: $0.6 + 0.8 = 1.4$ is not the story — the story is that the two machines must together account for the whole hypotenuse, $0.6 \\times 5 + 0.8 \\times 5 = 3 + 4 = 7$ of scaled material that reassembles as the legs, and the engine verified all six side ratios before this paragraph stood.',
    },
    {
      kind: 'figure',
      caption: 'Figure F9 — the 3-4-5 altitude as two dilations. The big triangle (0,0), (3,0), (0,4) split by the altitude h = 2.4 into ABF (the big triangle at scale 0.6) and AFC (at scale 0.8); BF = 1.8, FC = 3.2, F = (1.92, 1.44), and the leg² laws 9 = 5 × 1.8, 16 = 5 × 3.2 printed where they live.',
      svg: geo54Altitude('The right triangle with legs AB = 3 and AC = 4 and hypotenuse BC = 5, split by the altitude h = 2.4 from the right angle A to the foot F on BC into two smaller triangles labelled scale 0.6 and scale 0.8, with BF = 1.8 and FC = 3.2 marked and right angles at A and F.'),
    },
    {
      kind: 'derivation',
      title: 'The leg-square laws as scale arithmetic',
      statement: 'With the altitude foot $F$ on the hypotenuse $BC = 5$: $AB^2 = BC \\cdot BF$ (here $9 = 5 \\times 1.8$), $AC^2 = BC \\cdot FC$ (here $16 = 5 \\times 3.2$), and $h^2 = BF \\cdot FC$ (here $2.4^2 = 1.8 \\times 3.2$). Lesson 4.4 proved these by congruence; the dilation reading proves them by arithmetic.',
      steps: [
        {
          label: 'Read the small triangle\u2019s k',
          formula: 'k = \\frac{AB}{CB} = \\frac{3}{5} = 0.6',
          explanation: 'Triangle $ABF$ is the big triangle at scale $0.6$ (Section 6\u2019s ratio check). So its sides are the big triangle\u2019s sides multiplied by $0.6$ — in particular $BF = 0.6 \\times AB = 0.6 \\times 3 = 1.8$ and $AF = 0.6 \\times AC = 2.4$, both matching the coordinates.',
        },
        {
          label: 'Turn the scale read into the leg² law',
          formula: 'AB = 0.6\\,BC \\;\\Rightarrow\\; AB^2 = 0.6\\,BC \\cdot AB = BC \\cdot BF',
          explanation: 'Substitute $BF = 0.6 \\times AB$ into $AB^2$: the leg squared is the hypotenuse times the adjacent segment. Numerically $9 = 5 \\times 1.8$ — the law Lesson 4.4 proved, now three keystrokes of scale arithmetic.',
        },
        {
          label: 'The mirror rung',
          formula: 'AC^2 = BC \\cdot FC: \\quad 16 = 5 \\times 3.2',
          explanation: 'Triangle $AFC$ runs the identical argument at $k = 0.8$: $FC = 0.8 \\times AC$, hence $AC^2 = BC \\cdot FC$. The two legs split the hypotenuse\u2019s square between them, in the proportions the two machine settings dictate.',
        },
        {
          label: 'The altitude as the geometric mean',
          formula: 'h^2 = BF \\cdot FC = 1.8 \\times 3.2 = 5.76, \\quad h = 2.4',
          explanation: 'The altitude belongs to BOTH small triangles: from $ABF$ at $k = 0.6$, $h = 0.6 \\times AC$; from $AFC$ at $k = 0.8$, $h = 0.8 \\times AB$. Multiply the two expressions: $h^2 = 0.48 \\times AB \\cdot AC = BF \\cdot FC$ — and numerically $1.8 \\times 3.2 = 5.76 = 2.4^2$. The geometric-mean machine of 4.4 is the two scale settings multiplying.',
        },
      ],
      result: 'BF = 1.8, FC = 3.2, h = 2.4 — three numbers, two machine settings (0.6 and 0.8), and the leg-square laws as pure scale arithmetic.',
    },
    {
      kind: 'para',
      text: 'The re-read is worth pausing on, because it shows what the dilation buys over the congruence proof. Lesson 4.4\u2019s argument was structural: match angles, cite similarity, conclude. The machine\u2019s argument is NUMERICAL: the two small triangles are not merely similar to the big one, they are the big one AT SETTINGS — $0.6$ and $0.8$ — and those settings can be read, predicted, and multiplied like any other numbers. The foot $F$ divides the hypotenuse in the ratio of the squares of the legs ($1.8 : 3.2 = 9 : 16$), the altitude is the geometric mean of the two segments, and the whole construction computes in one line of scale arithmetic what once took a page of triangle chasing. That is the chapter\u2019s quiet theme repeating: the machine does not replace the theorems; it gives them a common currency.',
    },

    /* -------------------------------------------------------------- */
    /* 7. the doorstep: centres of similitude                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The doorstep: centres of similitude' },
    {
      kind: 'para',
      text: 'One construction closes the lesson and opens the next chapter. Take two circles: radius $2$ centred at $(0,0)$, radius $6$ centred at $(10,0)$. A dilation that carries one circle onto the other must carry the centre to the centre and multiply the radius by $|k|$ — so $|k| = 6/2 = 3$ is forced, and the only freedom is the centre and the sign. There are exactly two answers, and they are two of the most useful points in geometry. The DIRECT solution: $k = +3$, centre on the far side, at $(-5,0)$ — distances from it to the two circle centres are $5$ and $15$, in the ratio $5 : 15 = 2 : 6$, exactly the radii\u2019 ratio; the machine at $k = +3$ maps $(0,0)$ to $(10,0)$ and sweeps the small circle onto the large one, both circles on the SAME side of the centre. The OPPOSITE solution: $k = -3$, centre between the circles at $(2.5,0)$ — distances $2.5$ and $7.5$, again in ratio $1 : 3$; the machine at $k = -3$ ALSO maps $(0,0)$ to $(10,0)$, flipping through the centre so that the circles sit on OPPOSITE sides. The engine verified both homotheties on five probe points of the small circle: every one lands on the large circle, under either setting.',
    },
    {
      kind: 'figure',
      caption: 'Figure F10 — the two centres of similitude for the circles r = 2 at (0,0) and r = 6 at (10,0), drawn true to scale at 28 px per unit. The external centre (−5,0) with distances 5 : 15 = 2 : 6 and the direct homothety k = +3; the internal centre (2.5,0) with distances 2.5 : 7.5 = 1 : 3 and the opposite homothety k = −3. Both map the small circle onto the large one.',
      svg: geo54Similitude('Two circles, radius 2 centred at (0,0) and radius 6 centred at (10,0), with the external centre of similitude at (−5,0) and the internal centre at (2.5,0) marked on the centre line, arrows labelled k = +3 and k = −3 both mapping the small circle onto the large one, with the distance ratios 5 : 15 = 2 : 6 and 2.5 : 7.5 = 1 : 3.'),
    },
    {
      kind: 'table',
      caption: 'The two similitude centres of the r = 2 and r = 6 circles — every cell engine-checked',
      head: ['Centre', 'Distances to O1, O2', 'Ratio', 'Machine setting', 'Sides'],
      rows: [
        ['external $(-5,0)$', '$5$ and $15$', '$5 : 15 = 2 : 6$', '$k = +3$ (DIRECT)', 'both circles on the same side'],
        ['internal $(2.5,0)$', '$2.5$ and $7.5$', '$2.5 : 7.5 = 1 : 3$', '$k = -3$ (OPPOSITE)', 'circles on opposite sides'],
      ],
    },
    {
      kind: 'para',
      text: 'These two points have classical names — centres of similitude, or homothety centres — and a classical job: every COMMON TANGENT of the two circles passes through one of them. The direct centre $(-5,0)$ is where the two EXTERNAL common tangents (the ones that touch both circles without crossing between them) meet; the internal centre $(2.5,0)$ is where the two INTERNAL common tangents (the crossed pair) meet. The reason is the ray structure doing what it was built for: a tangent line to the small circle maps under the homothety to a tangent line to the large one, and since a dilation maps lines to parallel lines or to themselves, a tangent through the homothety centre maps to ITSELF — the same line tangent to both circles. That argument is the reason the tangent constructions of the circle chapter work, and Chapter 7 will build its common-tangent machinery on exactly this doorstep. The lesson ends with the pattern it began with: one machine, one knob, and the whole plane\u2019s geometry queueing up to use it.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The family portrait, for the record',
      text: 'The transformation family of this chapter now stands complete. Rigid motions (5.1, 5.2): preserve distance, move shape — the isometries. Symmetries (5.3): rigid motions that leave a figure looking unchanged. Dilations (5.4): preserve shape, scale distance by $|k|$ — the similarity engines. Compose them and you get every similar copy of every figure and nothing else: that is the machine definition of similarity, and it is the frame the circle chapter (common tangents through homothety centres) and coordinate geometry (scaling about arbitrary centres) both hang on.',
    },

    /* -------------------------------------------------------------- */
    /* 8. similarity in action: three worked chains                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Similarity in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. The first runs the coordinate machine at a foreign centre, forward and inverse — the template for every read-the-settings question. The second is the shadow dilation end to end, with the direction discipline making the difference between an answer and its reciprocal. The third constructs both centres of similitude and their two homotheties — the doorstep computation in full. In all three the discipline is identical: locate the centre, read or choose $k$, run the three moves (subtract, scale, add back), and check the result with a second read.',
    },
    {
      kind: 'example',
      title: 'The foreign-centre run, both ways. The dilation with centre $(1,1)$ and $k = 2$ carries $(3,5)$ to what point? And the dilation with centre $(2,3)$ and $k = 1/2$ carries $(6,7)$ to what point? Then run both machines BACKWARD from their images.',
      steps: [
        'Sol. Machine one, forward: subtract the centre — $(3,5) - (1,1) = (2,4)$.',
        'Scale: $2 \\times (2,4) = (4,8)$. Add back: $(1,1) + (4,8) = (5,9)$. The image is $(5,9)$.',
        'Machine two, forward: $(6,7) - (2,3) = (4,4)$; halve to $(2,2)$; add back to $(2,3) + (2,2) = (4,5)$. The image is $(4,5)$.',
        'Machine one, inverse: from the image $(5,9)$, subtract the centre — $(4,8)$ — scale by $1/2$ to $(2,4)$, add back to $(3,5)$. The original comes home exactly.',
        'Machine two, inverse: $(4,5) - (2,3) = (2,2)$; scale by $2$ to $(4,4)$; add back to $(6,7)$ — home again, no drift.',
        'Check the direction discipline: forward at $k$ and inverse at $1/k$ are the same machine with the arrow reversed — reading $k = 2$ toward $(5,9)$ and $k = 1/2$ back to $(3,5)$ are both true statements about ONE dilation.',
        'Hence $(3,5) \\to (5,9)$ at $k = 2$ about $(1,1)$, and $(6,7) \\to (4,5)$ at $k = 1/2$ about $(2,3)$ — each verified forward and back.',
      ],
      figures: [
        {
          caption: 'The foreign-centre construction for Illustration 1: O = (1,1), the displacement P − O = (2,4) drawn and doubled to (4,8), landing on the image (5,9) — subtract, scale, add back, with the ray structure keeping everything on one line.',
          svg: geo54Foreign('A centre O at (1,1) with the point (3,5), the displacement vector (2,4) drawn from O and doubled to (4,8) reaching the image (5,9), all on one dashed ray, with the three construction moves labelled.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The shadow dilation, end to end. A $1.7$ m stake casts a $2.4$ m shadow; at the same moment a tree casts an $18$ m shadow. Find the dilation that carries the stake triangle onto the tree triangle, state its centre and $k$, and compute the tree\u2019s height — then read the same machine BACKWARD to recover the stake.',
      steps: [
        'Sol. Locate the centre: the sun\u2019s parallel rays put both triangles on the same ground line, tips touching — the dilation is centred at the shadow tip $O$ itself.',
        'Read $k$ off the shadows: the stake\u2019s base sits $2.4$ m from $O$ and the tree\u2019s base $18$ m from $O$, so $k = 18/2.4 = 7.5$ — one read, from base to base.',
        'Confirm the read on the heights: the stake top at height $1.7$ maps to $1.7 \\times 7.5 = 12.75$ — the tree top, exactly where the dashed ray through the stake top meets the tree.',
        'The cross-check with no $k$ at all: $1.7 \\times 18 = 30.6$, and $30.6/2.4 = 12.75$ — the ratio method of Lesson 4.2 and the machine method of this lesson are one computation in two costumes.',
        'Run the machine BACKWARD: the tree top at $12.75$ maps back at $k = 1/7.5$ to $12.75/7.5 = 1.7$ — the stake\u2019s height recovered; the machine undoes itself.',
        'Hence one dilation, centre at the shadow tip, $k = 7.5$, carries the stake triangle onto the tree triangle, and the tree stands $12.75$ m tall.',
      ],
      figures: [
        {
          caption: 'The shadow dilation for Illustration 2, compact and true to scale: the shadow tip O, the 1.7 m stake at 2.4 m, the 12.75 m tree at 18 m, one dashed ray through both tops, and the setting k = 18/2.4 = 7.5 printed along the ray.',
          svg: geo54ShadowSol('A compact shadow scene: shadow tip O on a ground line, a 1.7 metre stake 2.4 metres from O, a 12.75 metre tree 18 metres from O, a dashed ray through the stake top and tree top, labelled k = 18/2.4 = 7.5.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The two centres of similitude, constructed. For the circles of radius $2$ at $(0,0)$ and radius $6$ at $(10,0)$, find BOTH homothety centres, the distance ratios at each, and the two machine settings that carry the small circle onto the large one.',
      steps: [
        'Sol. The scale is forced before any centre is known: a dilation carrying circle one onto circle two must multiply the radius by $|k| = 6/2 = 3$.',
        'The DIRECT centre (same side, $k = +3$): it divides the segment $(0,0)$–$(10,0)$ externally in the ratio $2 : 6$. Solve $|XO_1| : |XO_2| = 2 : 6$ with $X$ outside: $X = (-5,0)$ — distances $5$ and $15$, ratio $5 : 15 = 2 : 6$.',
        'Check the direct machine: $(-5,0) + 3\\big((0,0) - (-5,0)\\big) = (-5,0) + (15,0) = (10,0)$ — the centre maps onto the centre, and radius $2 \\times 3 = 6$ finishes the circle.',
        'The OPPOSITE centre (flipped, $k = -3$): it divides the segment internally in the ratio $2 : 6$, so it sits $1/4$ of the way along: $(2.5,0)$ — distances $2.5$ and $7.5$, ratio $2.5 : 7.5 = 1 : 3$.',
        'Check the opposite machine: $(2.5,0) - 3\\big((0,0) - (2.5,0)\\big) = (2.5,0) + (7.5,0) = (10,0)$ — the half-turn sense flips the ray, the size still lands: $k = -3$ carries the small circle onto the large one too.',
        'Hence external centre $(-5,0)$ with DIRECT $k = +3$, and internal centre $(2.5,0)$ with OPPOSITE $k = -3$ — the two and only two dilations between the circles, and the points where Chapter 7\u2019s common tangents will meet.',
      ],
      figures: [
        {
          caption: 'The similitude construction for Illustration 3: the two circles on one centre line with the external centre X (−5,0) and internal centre N (2.5,0) marked, the distances 5, 15 and 2.5, 7.5 ticked along the line, and both homothety readings printed beneath.',
          svg: geo54SimSol('The two circles of radii 2 and 6 on a centre line, the external centre X at (−5,0) and internal centre N at (2.5,0) marked as dots, the distances 5 and 15 above the left span and 2.5 and 7.5 along the middle, with the direct and opposite homothety readings printed below.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. the collected law: formula cards + exam corner              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect everything the lesson built, in the form the revision sheet wants. The first is the machine itself, with the centre and the sign conventions written on the card. The second is the census — what scales, by how much, and what never moves. The third is the similarity definition this lesson re-homes: dilation plus motion. The fourth carries the altitude\u2019s leg-square laws as scale arithmetic. The fifth is the doorstep card, both similitude centres with their ratios and settings, ready for the circle chapter to collect.',
    },
    {
      kind: 'formula',
      name: 'The dilation machine',
      latex: 'D_{O,k}(P) = O + k\\,(P - O)',
      note: 'centre O fixed; k > 1 enlarges, 0 < k < 1 shrinks, k = 1 the identity, k < 0 the half-turn sense with distances ×|k| — witnesses: (2,1)→(6,3) at k = 3 about the origin; (3,5)→(5,9) at k = 2 about (1,1)',
    },
    {
      kind: 'formula',
      name: 'The scaling census (lengths |k|, areas k², angles never)',
      latex: "P' = |k|\\,P,\\quad A' = k^2 A,\\quad \\theta' = \\theta",
      note: 'distances and perimeters ×|k| (segment 5 → 15 at k = 3); areas ×k² (6 → 54, nine copies); angles NEVER ((12,0)·(0,9) = 0) — lines through O self-map, other lines go parallel',
    },
    {
      kind: 'formula',
      name: 'Similarity re-read (the machine definition)',
      latex: 'X \\sim Y \\iff \\text{a dilation and an isometry (either order) carry } X \\text{ onto } Y',
      note: 'dilation + motion — congruence is the k = 1 rung; the order never matters (dilate k = 3 then translate (10,5) is ONE dilation about (−5,−2.5))',
    },
    {
      kind: 'formula',
      name: 'The leg-square laws (the altitude as two dilations)',
      latex: 'a^2 = c \\cdot BF,\\quad b^2 = c \\cdot FC,\\quad h^2 = BF \\cdot FC',
      note: 'witness on the 3-4-5: BF = 1.8, FC = 3.2, h = 2.4, and 9 = 5 × 1.8, 16 = 5 × 3.2, 2.4² = 1.8 × 3.2 — the small triangles are the big one at scales 3/5 = 0.6 and 4/5 = 0.8',
    },
    {
      kind: 'formula',
      name: 'Centres of similitude (the doorstep)',
      latex: 'r_1 : r_2 \\text{ divided externally and internally}',
      note: 'witness: circles r = 2 at (0,0), r = 6 at (10,0) — external (−5,0): 5 : 15 = 2 : 6 with DIRECT k = +3; internal (2.5,0): 2.5 : 7.5 = 1 : 3 with OPPOSITE k = −3; the common tangents of ch.7 pass through these',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: centre, knob, direction, dimension',
      text: 'Four habits pay the marks on this topic. FIRST, centre before arithmetic: every dilation question hides the question “which machine?” — locate $O$ (given, or recovered from $O = \\frac{\\text{image} - k \\cdot P}{1 - k}$ … in practice from ONE pair: at $k = 2$, $O = 2P - \\text{image}$) before computing anything else. SECOND, both coordinates vote: reading $k$ off $(2,3) \\to (5,7.5)$ means checking $5/2$ AND $7.5/3$ agree at $2.5$ — a disagreement is the no-dilation verdict, not a rounding note. THIRD, direction before multiplication: $k = 7.5$ from stake to tree is $1/7.5$ from tree to stake; half the wrong answers in shadow problems are the reciprocal taken in the wrong direction. FOURTH, dimension before the factor: lengths ride $|k|$ (perimeter $12 \\to 36$ at $k = 3$), areas ride $k^2$ ($6 \\to 54$, never $18$), angles ride nothing. The classic traps: reading $k$ from the area ratio directly ($6 \\to 54$ gives $k^2 = 9$, so $k = 3$, not $9$); forgetting the negative sign\u2019s half-turn; and demanding ONE $k$ from the $2 \\times 6$ vs $3 \\times 4$ pair where $2/3$ and $3/2$ already refuse it.',
    },

    /* -------------------------------------------------------------- */
    /* 10. terms                                                      */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'dilation', def: 'The transformation $D_{O,k}(P) = O + k(P - O)$: centre $O$, scale factor $k$, one knob. It preserves shape, scales every distance by $|k|$, and fixes its centre — the similarity engine of the plane.' },
        { term: 'centre of dilation', def: 'The fixed point $O$ of the machine: every point moves along the ray from $O$ through it, and $O$ itself never moves. Foreign centres (like $(1,1)$ or $(2,3)$) run the same three moves as the origin case.' },
        { term: 'scale factor (k)', def: 'The machine\u2019s one knob: $k > 1$ enlarges, $0 < k < 1$ shrinks, $k = 1$ is the identity, $k < 0$ flips to the opposite ray (the half-turn sense) with distances still scaled by $|k|$. Read off images coordinate by coordinate — both reads must agree.' },
        { term: 'ray structure', def: 'Every image point stays on the ray from the centre through the original. Consequences: a line through $O$ maps to itself; a line not through $O$ maps to a PARALLEL line (slope preserved: $y = 2x + 1 \\to y = 2x + 3$ at $k = 3$).' },
        { term: 'area scaling k²', def: 'Areas multiply by the SQUARE of the scale factor: the witness triangle\u2019s area $6$ becomes $54$ at $k = 3$ — nine copies in the grid, six upright and three half-turned. Areas never ride $k$ itself.' },
        { term: 'angle invariance', def: 'Angles NEVER move under a dilation: the dot product scales by $k^2$ and the two lengths by $k$ each, so the cosine is untouched — the right-angle witness $(12,0) \\cdot (0,9) = 0$ at $k = 3$.' },
        { term: 'similarity re-read', def: 'Two figures are similar exactly when a dilation followed by an isometry (or the composition in either order) carries one onto the other — dilation plus motion, the machine definition that contains congruence at $k = 1$.' },
        { term: 'shadow dilation', def: 'The Thales measurement of Lesson 4.2 seen as one machine: centre at the shadow tip, $k$ read off the shadows ($18/2.4 = 7.5$), stake height $1.7$ mapped to tree height $12.75$.' },
        { term: 'geometric-mean machine', def: 'The altitude construction of Lesson 4.4 re-read as scale arithmetic: the two small triangles are the big one at $3/5 = 0.6$ and $4/5 = 0.8$, giving $BF = 1.8$, $FC = 3.2$, $h = 2.4$, and $h^2 = BF \\cdot FC$.' },
        { term: 'centre of similitude', def: 'A point from which one circle dilates onto another: the external centre divides the centre segment externally in the radii\u2019 ratio (here $(-5,0)$, $5 : 15$), the internal centre divides it internally (here $(2.5,0)$, $2.5 : 7.5$).' },
        { term: 'direct and opposite homothety', def: 'The two settings between two circles: DIRECT $k = +r_2/r_1$ about the external centre (same side), OPPOSITE $k = -r_2/r_1$ about the internal centre (flipped through the centre). Both carry the small circle onto the large one.' },
        { term: 'honest non-similarity', def: 'The refusal that makes the definition honest: $2 \\times 6$ vs $3 \\times 4$ — angles and area agree, but the walking audit reads $2/3, 3/2, 2/3, 3/2$, so NO dilation exists; while the $1:3$ family $(3,9), (4,12), (5,15)$ are all dilations of $(1,3)$.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. quiz (key [0,3,2,4,1] — PINNED)                            */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'A dilation runs with $k = 1/2$ about its centre $O$. What does it do?',
          options: [
            'every point slides along its ray toward $O$ — every distance from $O$ shrinks by the factor $1/2$, and the centre itself stays fixed',
            'it moves every point to the opposite ray through $O$, since shrinking reverses direction',
            'it halves areas as well as distances, by the one-knob rule',
            'it is an isometry, since no direction is favoured',
          ],
          answer: 0,
          explain: 'With $0 < k < 1$ the machine shrinks: every distance from $O$ multiplies by $k = 1/2$ (witness: $(4,6) \\to (2,3)$ about the origin), and the centre is fixed — option (a). Option (b) describes a NEGATIVE $k$: the opposite ray belongs to the half-turn sense, not to shrinking. Option (c) is the classic dimension slip: areas ride $k^2 = 1/4$, not $k = 1/2$ — the witness area $6 \\to 1.5$, one quarter. Option (d) fails because shrinking triples no distance: an isometry needs $|k| = 1$, and $1/2$ is not $1$.',
        },
        {
          q: 'About the origin, a point $(2,3)$ is carried to $(5,7.5)$. The scale factor is —',
          options: [
            '$k = 7.5$, read off the larger coordinate',
            '$k = 2$, the difference $5 - 3$',
            '$k = 3$, the sum of the reads',
            '$k = 2.5$, since $5/2 = 2.5$ and $7.5/3 = 2.5$ agree — one k, both coordinates',
          ],
          answer: 3,
          explain: 'Read BOTH coordinates: $5/2 = 2.5$ and $7.5/3 = 2.5$ — the two reads agree, so $k = 2.5$, option (d). Option (a) reads only one coordinate and returns the image value, not the ratio. Option (b) subtracts where the machine multiplies — differences have no role in scaling. Option (c) adds the reads — another operation the machine never performs. The agreement of the two reads is the whole audit: had they disagreed, the verdict would be NO dilation, not a picked favourite.',
        },
        {
          q: 'A figure of area $8$ is dilated by $k = 2.5$. The image area is —',
          options: [
            '$20$, since areas scale by k',
            '$16$, since areas scale by k − the square root',
            '$50$, since areas scale by $k^2 = 6.25$ and $8 \\times 6.25 = 50$',
            '$18.5$, adding the extra factor',
          ],
          answer: 2,
          explain: 'Areas ride $k^2$: $2.5^2 = 6.25$, so the image area is $8 \\times 6.25 = 50$, option (c). Option (a) is the dimension slip — the most common wrong answer in the topic (the pinned witness: area $6 \\to 54$ at $k = 3$, nine times, not three). Option (b) invents a square-root law — the return direction, $k = \\sqrt{6.25}$, is for READING $k$ off an area ratio, not for scaling forward. Option (c) is the only dial the census allows. Option (d) adds where the machine multiplies.',
        },
        {
          q: 'The $2 \\times 6$ and $3 \\times 4$ rectangles: all angles $90°$, areas both $12$. What does the dilation machine say?',
          options: [
            'similar, since every angle matches',
            'similar, since the areas match at $12$',
            'similar with $k = 2/3$, the ratio of the short sides',
            'similar with $k = 3/2$, the ratio of the long sides',
            'NOT similar — the walking audit reads $2/3, 3/2, 2/3, 3/2$, two values, so no single k and no dilation exists',
          ],
          answer: 4,
          explain: 'Walk one onto the other: short sides vote $2/3$, long sides vote $3/2$ — two different numbers, so no single $k$ exists and NO dilation carries one onto the other, option (e). Option (a) is the angle trap: equal angles force similarity for TRIANGLES (AA, Lesson 4.3) but not for rectangles, which carry a spare proportion. Option (b) is the area trap — equal areas with different shapes is exactly this pair. Options (c) and (d) each quote HALF the audit: a real dilation repeats ONE ratio on every pair of corresponding sides, and the diagonal read ($\\sqrt{40} \\approx 6.3246$ against $5$) confirms the refusal with a third number.',
        },
        {
          q: 'Two circles: radius $2$ at $(0,0)$ and radius $6$ at $(10,0)$. The EXTERNAL centre of similitude sits at —',
          options: [
            '$(5,0)$, halfway between the centres',
            '$(-5,0)$, with distances $5$ and $15$ in the ratio $2 : 6$, carrying the small circle at $k = +3$',
            '$(2.5,0)$, dividing the segment internally',
            '$(10,0)$, at the far circle\u2019s centre',
            'nowhere: two circles of different radii are never related by a dilation',
          ],
          answer: 1,
          explain: 'The external centre divides the centre line EXTERNALLY in the radii\u2019 ratio $2 : 6$: at $(-5,0)$ the distances are $5$ and $15$, and $5 : 15 = 2 : 6$ — option (b), which also runs the direct machine $k = +3$: $(-5,0) + 3(5,0) = (10,0)$. Option (c) is the INTERNAL centre $(2.5,0)$ — a true point, but it belongs to the opposite homothety $k = -3$, not the external one. Option (a) invents a midpoint rule that ignores the radii. Option (d) cannot work: a dilation about $(10,0)$ fixes that centre, so it cannot carry $(0,0)$ there. Option (e) gives up exactly what the machine delivers — the $k = +3$ homothety sweeps the whole small circle onto the large one.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 12. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the dilation machine and its audits',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Run the origin dilation with $k = 3$ on the point $(2,1)$, and the origin dilation with $k = 1/2$ on the point $(4,6)$. State the images, and give the inverse read for each.',
              solution: [
                'Sol. First machine: subtract the centre (the origin, so nothing to do), scale — $3 \\times (2,1) = (6,3)$ — add back: the image is $(6,3)$.',
                'Second machine: $\\frac{1}{2} \\times (4,6) = (2,3)$ — the image is $(2,3)$.',
                'Inverse reads: $(6,3)$ takes back to $(2,1)$ at $k = 1/3$, and $(2,3)$ takes back to $(4,6)$ at $k = 2$ — the same machines with the arrows reversed.',
                'Check the distance law: $(2,1)$ sits at distance $\\sqrt{5}$ from the origin and $(6,3)$ at $3\\sqrt{5}$ — tripled, as $|k| = 3$ demands.',
                'Hence $(2,1) \\to (6,3)$ at $k = 3$ and $(4,6) \\to (2,3)$ at $k = 1/2$, with inverse reads $1/3$ and $2$.',
              ],
              answer: '$(2,1) \\to (6,3)$ at $k = 3$; $(4,6) \\to (2,3)$ at $k = 1/2$; inverse reads $k = 1/3$ and $k = 2$',
            },
            {
              q: 'The triangle with vertices $(0,0)$, $(4,0)$, $(0,3)$ is dilated about the origin by $k = 1/2$. Find the image vertices, the image area and the image perimeter, and state what fraction of the original area the image carries.',
              solution: [
                'Sol. Each vertex scales by $1/2$: the images are $(0,0)$, $(2,0)$, $(0,1.5)$.',
                'Image area: $\\frac{1}{2} \\times 2 \\times 1.5 = 1.5$ — or by the census, $6 \\times k^2 = 6 \\times \\frac{1}{4} = 1.5$. Both roads agree.',
                'Image perimeter: the legs are $2$ and $1.5$, the hypotenuse $\\sqrt{2^2 + 1.5^2} = 2.5$ — perimeter $2 + 1.5 + 2.5 = 6 = 12 \\times 0.5$, the $|k|$ dial on lengths.',
                'The area fraction is $k^2 = 1/4$: shrinking to half size quarters the area — the census in one sentence.',
                'Hence image vertices $(0,0)$, $(2,0)$, $(0,1.5)$; area $1.5$; perimeter $6$; area fraction $1/4$.',
              ],
              answer: 'vertices $(0,0)$, $(2,0)$, $(0,1.5)$; area $1.5$; perimeter $6$; the image carries $1/4$ of the area',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Foreign centres, both of them. Compute the image of $(3,5)$ under the dilation with centre $(1,1)$ and $k = 2$, and the image of $(6,7)$ under the dilation with centre $(2,3)$ and $k = 1/2$. Then verify each by running the machine backward from the image.',
              solution: [
                'Sol. Machine one: subtract — $(3,5) - (1,1) = (2,4)$; scale — $2 \\times (2,4) = (4,8)$; add back — $(1,1) + (4,8) = (5,9)$.',
                'Machine two: subtract — $(6,7) - (2,3) = (4,4)$; halve — $(2,2)$; add back — $(2,3) + (2,2) = (4,5)$.',
                'Inverse one: $(5,9) - (1,1) = (4,8)$; $\\frac{1}{2} \\times (4,8) = (2,4)$; plus $(1,1)$ gives $(3,5)$ — home.',
                'Inverse two: $(4,5) - (2,3) = (2,2)$; $\\times 2 = (4,4)$; plus $(2,3)$ gives $(6,7)$ — home.',
                'Note the foreign centre is not an obstacle: the three moves (subtract, scale, add back) are the origin machine wearing a translation.',
                'Hence $(3,5) \\to (5,9)$ at centre $(1,1)$, $k = 2$; $(6,7) \\to (4,5)$ at centre $(2,3)$, $k = 1/2$ — each verified both ways.',
              ],
              answer: '$(3,5) \\to (5,9)$; $(6,7) \\to (4,5)$; both verified by the inverse runs',
            },
            {
              q: 'The segment from $(1,1)$ to $(4,5)$ has length $5$. Dilate it about the origin by $k = 3$: where do the endpoints land, and how long is the image segment? Confirm the length law explicitly.',
              solution: [
                'Sol. Endpoints: $3 \\times (1,1) = (3,3)$ and $3 \\times (4,5) = (12,15)$ — each vertex rides its own ray from the origin.',
                'Image length: $\\sqrt{(12-3)^2 + (15-3)^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15$.',
                'The length law: $15 = 3 \\times 5$ — every distance multiplied by $|k| = 3$, exactly as the census demands.',
                'Bonus audit: the original slope is $(5-1)/(4-1) = 4/3$ and the image slope is $(15-3)/(12-3) = 12/9 = 4/3$ — the segment and its image are parallel, the line law at work on a piece of one.',
                'Hence the images are $(3,3)$ and $(12,15)$, the image segment has length $15 = 3 \\times 5$, and the slope survives unchanged.',
              ],
              answer: 'endpoints $(3,3)$ and $(12,15)$; image length $15 = 3 \\times 5$; slope $4/3$ preserved',
            },
            {
              q: 'The negative knob. Dilate $(1,2)$ about the origin with $k = -2$. Where does it land, how far from the origin is the image compared with the original, and what does the negative sign DO geometrically?',
              solution: [
                'Sol. Apply the machine: $-2 \\times (1,2) = (-2,-4)$ — each coordinate doubled and negated.',
                'Distances: the original sits at $\\sqrt{1^2 + 2^2} = \\sqrt{5}$ from the origin; the image sits at $\\sqrt{(-2)^2 + (-4)^2} = 2\\sqrt{5}$ — the distance law $|k| = 2$ is intact.',
                'Direction: $(1,2)$ and $(-2,-4)$ point in exactly opposite senses from $O$ — the image is on the OPPOSITE ray, and their dot product $1 \\times (-2) + 2 \\times (-4) = -10$ is negative, the algebraic fingerprint of opposite rays.',
                'The geometric reading: $k = -2$ is the half-turn about $O$ composed with the positive dilation $k = 2$ — flip, then scale.',
                'Hence the image is $(-2,-4)$, at twice the distance on the opposite ray — the negative sign flips, the $|k|$ scales.',
              ],
              answer: '$(1,2) \\to (-2,-4)$: distance $\\sqrt{5} \\to 2\\sqrt{5}$ on the opposite ray — the half-turn sense of a negative k',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The area dial, swept. A figure of area $6$ is dilated about a fixed centre by $k = 1$, then $k = 2$, then $k = 3$. Compute the three image areas, display the multipliers against $k$ and $k^2$, and state the law the sweep exhibits.',
              solution: [
                'Sol. At $k = 1$: area $6 \\times 1^2 = 6$ — the identity, as it must be.',
                'At $k = 2$: area $6 \\times 2^2 = 24$ — the multiplier $4$, not $2$.',
                'At $k = 3$: area $6 \\times 3^2 = 54$ — the multiplier $9$, not $3$.',
                'The pattern: length multipliers $1, 2, 3$; area multipliers $1, 4, 9$ — the perfect squares against the counting numbers.',
                'Count the copies if you doubt it: at $k = 3$ the witness triangle tiles into nine copies of itself (six upright, three half-turned), $9 \\times 6 = 54$ — the square is COUNTABLE, not just formulaic.',
                'Hence areas $6, 24, 54$ at $k = 1, 2, 3$ — the law: every area multiplies by $k^2$, one factor of $k$ for each of the two dimensions that make an area.',
              ],
              answer: 'areas $6$, $24$, $54$ at $k = 1, 2, 3$ — multipliers $1, 4, 9$, the $k^2$ law',
              figures: [
                {
                  caption: 'The area dial for this exercise: bars for 6, 24 and 54 at k = 1, 2, 3 with multipliers ×1, ×4, ×9 — the quadratic climb the census demands, drawn to one scale.',
                  svg: geo54AreaBars('Three bars on one axis labelled k = 1, 2 and 3 with heights 6, 24 and 54, each bar topped with its value and its multiplier ×1, ×4 or ×9, showing areas riding k squared.'),
                },
              ],
            },
            {
              q: 'Reading k off images. About the origin, a point $(2,3)$ is carried to $(5,7.5)$. Find $k$ with its full two-coordinate audit, predict the image of $(6,1)$, and give the area multiplier the machine forces.',
              solution: [
                'Sol. Read coordinate one: $5/2 = 2.5$. Read coordinate two: $7.5/3 = 2.5$. The reads AGREE — the machine has one knob and this pair is faithful to it: $k = 2.5$.',
                'Predict: $(6,1) \\to (2.5 \\times 6,\\ 2.5 \\times 1) = (15, 2.5)$ — one knob, applied everywhere.',
                'Area multiplier: $k^2 = 2.5^2 = 6.25$ — an area of $8$ would come back at $50$.',
                'The inverse read: $(5,7.5)$ takes back to $(2,3)$ at $k = 1/2.5 = 0.4$ — the direction discipline, always.',
                'Hence $k = 2.5$ (origin dilation), $(6,1) \\to (15,2.5)$, and every area rides the multiplier $6.25$.',
              ],
              answer: '$k = 2.5$ (both reads agree); $(6,1) \\to (15,2.5)$; area multiplier $k^2 = 6.25$',
            },
            {
              q: 'The line audit. Dilate the line $y = 2x + 1$ (sample it at $(0,1)$ and $(1,3)$) about the origin by $k = 3$, and identify the image line. Then dilate the line $y = 2x$ the same way and explain why its fate is different.',
              solution: [
                'Sol. Sample images: $3 \\times (0,1) = (0,3)$ and $3 \\times (1,3) = (3,9)$.',
                'Image slope: $(9-3)/(3-0) = 2$ — the same slope as the original, so the image is a line PARALLEL to $y = 2x + 1$.',
                'Identify it: $(0,3)$ satisfies $y = 2x + 3$ (and $(3,9)$ does too: $2 \\times 3 + 3 = 9$) — the image line is $y = 2x + 3$, a different line, not the original.',
                'Now $y = 2x$, which passes through the centre: the sample $(1,2)$ maps to $(3,6)$, and $6 = 2 \\times 3$ — the image is still ON the line.',
                'The distinction: a line through $O$ maps to itself (every point slides along its own ray, which lies in the line); a line missing $O$ maps to a parallel twin, because image displacements are $k$ times originals and the $k$ cancels in the slope.',
                'Hence $y = 2x + 1 \\to y = 2x + 3$ (parallel copy, slope 2) and $y = 2x \\to$ itself — the ray structure read in lines.',
              ],
              answer: '$y = 2x + 1$ maps to the parallel line $y = 2x + 3$ (slope 2 preserved); $y = 2x$ maps to itself',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The shadow dilation. A $1.7$ m stake casts a $2.4$ m shadow; at the same moment a tree casts an $18$ m shadow. Identify the dilation that carries the stake triangle onto the tree triangle (centre and $k$), compute the tree\u2019s height, and run one independent cross-check.',
              solution: [
                'Sol. Centre: the parallel sun rays put both triangles on the same ground line with tips touching — the dilation is centred at the shadow tip $O$.',
                'Read $k$ off the shadows: $k = 18/2.4 = 7.5$, enlarging the stake triangle onto the tree triangle.',
                'Height: $1.7 \\times 7.5 = 12.75$ — the tree is $12.75$ m tall.',
                'Cross-check without $k$: heights and shadows are corresponding lengths, so $h/18 = 1.7/2.4$, giving $h = 1.7 \\times 18 / 2.4 = 30.6/2.4 = 12.75$ — the same number, no machine needed.',
                'Direction discipline: the machine runs at $k = 7.5$ from stake to tree and at $k = 1/7.5$ backward — measuring the tree from the stake is the forward trip.',
                'Hence one dilation, centre at the shadow tip, $k = 7.5$, tree height $12.75$ m — Lesson 4.2\u2019s shadow method as one machine.',
              ],
              answer: 'centre at the shadow tip, $k = 18/2.4 = 7.5$; the tree is $12.75$ m tall (cross-check $1.7 \\times 18/2.4 = 12.75$)',
            },
            {
              q: 'The 3-4-5 altitude as scale arithmetic. Place the right angle at $A = (0,0)$, legs $AB = 3$, $AC = 4$, hypotenuse $BC = 5$. Find the altitude foot $F$ on $BC$, the segments $BF$ and $FC$, and the altitude $h$; then verify the leg-square laws $9 = 5 \\times 1.8$ and $16 = 5 \\times 3.2$, and state the two machine settings hidden in the figure.',
              solution: [
                'Sol. The foot: project $A$ onto $BC$ — the coordinates come out $F = (1.92, 1.44)$, with $BF = 1.8$ and $FC = 3.2$ (they sum to $5$, as they must).',
                'The altitude: $h = \\sqrt{1.92^2 + 1.44^2} = \\sqrt{5.76} = 2.4$ — also area both ways: $\\frac{1}{2} \\times 3 \\times 4 = 6 = \\frac{1}{2} \\times 5 \\times h$, so $h = 12/5 = 2.4$.',
                'Leg-square law one: $AB^2 = BC \\cdot BF$ reads $9 = 5 \\times 1.8$ — verified.',
                'Leg-square law two: $AC^2 = BC \\cdot FC$ reads $16 = 5 \\times 3.2$ — verified.',
                'The machine settings: triangle $ABF$ has sides $3, 1.8, 2.4$ — every one $3/5 = 0.6$ of the big triangle\u2019s matching side; triangle $AFC$ has sides $4, 3.2, 2.4$ — every one $4/5 = 0.8$. The two small triangles are the big one at $k = 0.6$ and $k = 0.8$.',
                'Hence $BF = 1.8$, $FC = 3.2$, $h = 2.4$, the leg-square laws hold, and the altitude figure is TWO dilations of the 3-4-5 triangle — Lesson 4.4\u2019s geometric-mean machine as scale arithmetic.',
              ],
              answer: '$F = (1.92, 1.44)$; $BF = 1.8$, $FC = 3.2$, $h = 2.4$; $9 = 5 \\times 1.8$, $16 = 5 \\times 3.2$; settings $0.6$ and $0.8$',
            },
            {
              q: 'The refusal and the family. (a) Walk the $2 \\times 6$ rectangle onto the $3 \\times 4$ rectangle side by side and show no dilation connects them. (b) Then show that $(1,3)$ dilated by $k = 3, 4, 5$ produces a family that IS connected, and give its areas.',
              solution: [
                'Sol. (a) The walking audit: pair side by side around the polygon — the short sides read $2/3$, the long sides $3/2$, then $2/3$, $3/2$ again: TWO distinct values.',
                'A dilation repeats ONE ratio on every pair of corresponding lengths — two values already finish the search: no single $k$, no dilation, NOT similar (the diagonal read $\\sqrt{40} \\approx 6.3246$ against $5$ adds a third mismatched number).',
                '(b) The seed $(1,3)$ at the origin: $k = 3$ maps $(1,3) \\to (3,9)$; $k = 4$ maps to $(4,12)$; $k = 5$ maps to $(5,15)$ — the $3 \\times 9$, $4 \\times 12$, $5 \\times 15$ rectangles.',
                'Every member keeps the proportion: $3/9 = 4/12 = 5/15 = 1/3$ — one value everywhere, the machine\u2019s signature.',
                'Areas: seed $3$; images $27$, $48$, $75$ — the multipliers $9$, $16$, $25$: the $k^2$ dial run at three settings.',
                'Hence (a) the $2 \\times 6$ vs $3 \\times 4$ pair is honestly NOT similar, and (b) the $1:3$ family is three dilations of one seed — the machine decides both verdicts with the same audit.',
              ],
              answer: '(a) ratios $2/3$ and $3/2$ disagree — NOT similar, no dilation; (b) $(3,9)$, $(4,12)$, $(5,15)$, areas $27$, $48$, $75$ — all dilations of $(1,3)$',
              figures: [
                {
                  caption: 'The walking audit for this exercise: the 2×6 and 3×4 rectangles with the two side-pair arrows labelled ratio 2/3 (short sides) and ratio 3/2 (long sides) — two values, and the machine\u2019s refusal drawn.',
                  svg: geo54Walk('Two rectangles, 2 by 6 and 3 by 4, with arrows pairing the short sides labelled ratio 2/3 and the long sides labelled ratio 3/2, and the caption that two values mean no single k.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'The two similitude centres. For the circles of radius $2$ at $(0,0)$ and radius $6$ at $(10,0)$, construct the external and internal centres of similitude, verify both distance ratios, and show that $k = +3$ about the external centre and $k = -3$ about the internal centre each carry the small circle onto the large one (check one non-centre point of the small circle under each).',
              solution: [
                'Sol. The scale is forced first: $|k| = 6/2 = 3$ — any dilation between the circles must triple the radius.',
                'External centre: divide $(0,0)$–$(10,0)$ externally in the ratio $2 : 6$. Solving gives $X = (-5,0)$: the distances are $5$ to $(0,0)$ and $15$ to $(10,0)$, and $5 : 15 = 2 : 6$ — verified.',
                'Direct machine: $X + 3\\big((0,0) - X\\big) = (-5,0) + (15,0) = (10,0)$ — centre onto centre; and the point $(2,0)$ on the small circle maps to $(-5,0) + 3(7,0) = (16,0)$, which sits $6$ from $(10,0)$ — on the large circle.',
                'Internal centre: divide internally in the ratio $2 : 6$ — one quarter of the way along: $N = (2.5,0)$, with distances $2.5$ and $7.5$, ratio $2.5 : 7.5 = 1 : 3$ — verified.',
                'Opposite machine: $N - 3\\big((0,0) - N\\big) = (2.5,0) + (7.5,0) = (10,0)$ — centre onto centre again; and $(0,2)$ on the small circle maps to $(2.5,0) - 3(-2.5,2) = (10,-6)$, which is $6$ from $(10,0)$ — on the large circle.',
                'Hence external $(-5,0)$ with DIRECT $k = +3$ and internal $(2.5,0)$ with OPPOSITE $k = -3$ — the two and only two dilations between the circles, and the meeting points of ch.7\u2019s common tangents.',
              ],
              answer: 'external $(-5,0)$, distances $5 : 15 = 2 : 6$, DIRECT $k = +3$; internal $(2.5,0)$, distances $2.5 : 7.5 = 1 : 3$, OPPOSITE $k = -3$; both carry the circle onto the circle',
            },
            {
              q: 'Dilation plus motion, collapsed. Dilate the triangle $(0,0)$, $(4,0)$, $(0,3)$ about the origin by $k = 3$, then translate the result by $(10,5)$. List the final image vertices, verify the side lengths, and show that the two-step map is a SINGLE dilation — state its centre.',
              solution: [
                'Sol. Step one, the dilation: $(0,0) \\to (0,0)$, $(4,0) \\to (12,0)$, $(0,3) \\to (0,9)$.',
                'Step two, the translation by $(10,5)$: $(10,5)$, $(22,5)$, $(10,14)$ — the final image.',
                'Side check: $(22,5) - (10,5) = (12,0)$ has length $12 = 3 \\times 4$; $(10,14) - (10,5) = (0,9)$ has length $9 = 3 \\times 3$; and the third side is $\\sqrt{12^2 + 9^2} = 15 = 3 \\times 5$ — all three sides tripled: a faithful $k = 3$ similarity.',
                'The collapse: a dilation of factor $k$ followed by a translation is ONE dilation of the same factor about a shifted centre — here $O\' = (-5,-2.5)$.',
                'Verify on a vertex: $(-5,-2.5) + 3\\big((0,0) - (-5,-2.5)\\big) = (-5,-2.5) + (15,7.5) = (10,5)$ — matches; and the other two vertices check identically.',
                'Hence the image is $(10,5)$, $(22,5)$, $(10,14)$ with sides $12, 15, 9$, and the whole two-step map is one dilation about $(-5,-2.5)$ — dilation plus motion, collapsed to one machine.',
              ],
              answer: 'image $(10,5)$, $(22,5)$, $(10,14)$ with sides $12$, $15$, $9$; the composition is ONE dilation, $k = 3$, centre $(-5,-2.5)$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Recovering a hidden centre. A dilation with unknown centre $O$ and $k = 2$ carries $(1,1)$ to $(5,3)$. Find $O$, verify your answer by running the machine forward, then compute where the same machine sends $(2,2)$ — and explain why one point pair sufficed.',
              solution: [
                'Sol. The machine\u2019s equation: image $= O + 2(P - O) = 2P - O$. Rearranged: $O = 2P - \\text{image}$.',
                'Substitute: $O = 2(1,1) - (5,3) = (2,2) - (5,3) = (-3,-1)$.',
                'Verify forward: $(-3,-1) + 2\\big((1,1) - (-3,-1)\\big) = (-3,-1) + 2(4,2) = (-3,-1) + (8,4) = (5,3)$ — the pair is faithfully produced.',
                'Predict: $(-3,-1) + 2\\big((2,2) - (-3,-1)\\big) = (-3,-1) + 2(5,3) = (-3,-1) + (10,6) = (7,5)$.',
                'Why one pair sufficed: the pair $(P, \\text{image})$ with $k$ known pins $O$ by ONE linear equation set — the centre is the unique point from which $P$ sits on the ray to its image at the right fraction ($\\frac{1}{1-k}$ of the way, here half). With $k = 1$ the question would be degenerate (the identity has every centre).',
                'Hence $O = (-3,-1)$, the machine sends $(2,2) \\to (7,5)$, and one faithful pair pins the centre because a dilation has exactly one.',
              ],
              answer: '$O = (-3,-1)$; the machine maps $(2,2) \\to (7,5)$; one pair pins the centre because the machine has one knob',
              figures: [
                {
                  caption: 'The centre recovery for this exercise: O = (−3,−1), the point P (1,1), the doubled displacement landing on the image (5,3), and the prediction (2,2) → (7,5) — the hidden machine drawn from one pair.',
                  svg: geo54Centre('A hidden centre O at (−3,−1) with the point (1,1) and its image (5,3) on one ray, the displacement (4,2) doubled, and the extra prediction sending (2,2) to (7,5).'),
                },
              ],
            },
            {
              q: 'The full audit, one figure. A triangle of area $6$ and perimeter $12$ is dilated to a similar triangle of area $54$. (a) Find $k$ and the image perimeter. (b) Prove the right angle at the original\u2019s origin vertex survives, using the image vectors. (c) Confirm that the SAME machine carries the circle of radius $2$ at $(0,0)$ onto the circle of radius $6$ at $(10,0)$ when the centre is $(-5,0)$, by checking the centre map and one circle point.',
              solution: [
                'Sol. (a) The area ratio: $54/6 = 9 = k^2$, so $k = 3$ (the positive read for an enlargement). The perimeter: $12 \\times 3 = 36$ — lengths ride $|k|$, never $k^2$.',
                '(b) The original right angle at $(0,0)$ sits between the leg vectors $(4,0)$ and $(0,3)$; under $k = 3$ the image vectors are $(12,0)$ and $(0,9)$, and their dot product is $12 \\times 0 + 0 \\times 9 = 0$ — a zero dot product is exactly a right angle, so it survives.',
                '(c) The centre map: $(-5,0) + 3\\big((0,0) - (-5,0)\\big) = (-5,0) + (15,0) = (10,0)$ — the small circle\u2019s centre lands on the large circle\u2019s centre.',
                '(c) A circle point: $(2,0)$ sits on the radius-$2$ circle; it maps to $(-5,0) + 3(7,0) = (16,0)$, and $\\sqrt{(16-10)^2 + 0^2} = 6$ — exactly the large radius. The whole circle follows (a dilation maps a circle of radius $r$ to a circle of radius $|k|r$ about the image centre).',
                'Hence (a) $k = 3$ and perimeter $36$; (b) the right angle survives by the dot-product witness $(12,0) \\cdot (0,9) = 0$; (c) the $k = +3$ dilation about $(-5,0)$ carries circle onto circle — one machine, three audits, all green.',
              ],
              answer: '(a) $k = 3$, perimeter $36$; (b) $(12,0) \\cdot (0,9) = 0$ — the right angle survives; (c) $(-5,0) + 3(5,0) = (10,0)$ and $(2,0) \\to (16,0)$, distance $6$ from $(10,0)$ — the circle maps onto the circle',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}

export const chapter5: Chapter = {
  number: 5,
  slug: 'transformations-and-symmetry',
  title: 'Transformations and Symmetry: the Rigid-Motion Idea',
  summary:
    'Congruence and similarity earn their machine definitions: translations, reflections and rotations written as functions of the plane \u2014 the rigid motions \u2014 their compositions read as the isometry idea, line and rotational symmetry found as the fixed sets of those motions, and dilations as the scale engines that re-derive similarity. The Common Core\u2019s transformation-first route and NCERT\u2019s symmetry chapters are both honoured: SAS/ASA/SSS are re-read as invariances under motion, and the ground is laid for the homothety reading of centres of similitude in the circle chapter and for the shifting of axes in Coordinate Geometry.',
  status: 'complete',
  lessons: [lessonGeo501, lessonGeo502, lessonGeo503, lessonGeo504],
  plannedLessons: [],
}
