import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — blueprint hues,     */
/* c31's structure hue-shifted to the similarity/map family)           */
/* ------------------------------------------------------------------ */
const c41 = {
  ink: '#1e40af', // primary text — rich blueprint ink
  mid: '#0284c7', // mid text — bright sky
  teal: '#0891b2', // captions, light strokes, secondary structure (cyan)
  tealInk: '#0e7490', // cyan ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#7c3aed', // structure strokes — boxes, axes, polygons (violet)
  panel: '#e0f2fe', // sky tinted fill
  panel2: '#ede9fe', // violet tinted fill
  sep: '#93c5fd', // light separators (bar fills)
  faint: '#a5b4fc', // faint dots, grids, unpicked borders
  white: '#ffffff',
  paper: '#f5f8ff',
}
const f41 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo41 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo41Txt = (
  x: number, y: number, s: string,
  size = 13, color = c41.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f41}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo41Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c41.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo41Dot = (x: number, y: number, color = c41.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo41Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo41Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, fillOp: number, stroke: string, sw = 2.4,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${sw}"/>`

const geo41RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c41.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo41Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo41Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c41.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo41Line(x1, y1, x2, y2, color, w) + geo41Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, positive = downward on screen) */
const geo41Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo41Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** pointy-top regular hexagon vertices about (cx, cy) with circumradius R */
const geo41HexPts = (cx: number, cy: number, R: number): Array<[number, number]> =>
  [0, 1, 2, 3, 4, 5].map((i) => {
    const t = ((90 + 60 * i) * Math.PI) / 180
    return [cx + R * Math.cos(t), cy - R * Math.sin(t)] as [number, number]
  })

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the 3-4-5 family at k = 1, 2, 3 + the ratio table  */
/* ------------------------------------------------------------------ */
const geo41Family = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE 3, 4, 5 FAMILY AT k = 1, 2, 3', 13, c41.ink, 'middle', '700'))
  const u = 14, base = 380
  const tri = (x: number, k: number, stroke: string, fill: string): void => {
    const A: [number, number] = [x, base], B: [number, number] = [x + 3 * u * k, base], C: [number, number] = [x, base - 4 * u * k]
    parts.push(geo41Poly([A, B, C], fill, 0.12, stroke, 2.6))
    parts.push(geo41RA(x, base, 1, 0, 0, -1, 11, stroke))
    parts.push(geo41Txt(x + (1.5 * u * k), base + 18, String(3 * k), 12.5, c41.amber))
    parts.push(geo41Txt(x - 14, base - 2 * u * k, String(4 * k), 12.5, c41.amber, 'end'))
    parts.push(geo41Txt(x + 1.9 * u * k, base - 2.3 * u * k, String(5 * k), 12.5, c41.amber))
    parts.push(geo41Dot(A[0], A[1], c41.ink, 3.5))
    parts.push(geo41Dot(B[0], B[1], c41.ink, 3.5))
    parts.push(geo41Dot(C[0], C[1], c41.ink, 3.5))
  }
  tri(60, 1, c41.tealInk, c41.panel)
  tri(150, 2, c41.green, c41.panel)
  tri(290, 3, c41.orange, c41.panel2)
  parts.push(geo41Txt(81, 412, 'k = 1', 12.5, c41.tealInk, 'middle', '700'))
  parts.push(geo41Txt(192, 412, 'k = 2', 12.5, c41.green, 'middle', '700'))
  parts.push(geo41Txt(371, 412, 'k = 3', 12.5, c41.orange, 'middle', '700'))
  // the ratio table
  parts.push(geo41Txt(528, 92, 'THE RATIO TABLE', 12.5, c41.ink, 'middle', '700'))
  parts.push(geo41Line(448, 104, 616, 104, c41.sep, 1.6))
  parts.push(geo41Line(448, 232, 616, 232, c41.sep, 1.6))
  const cols = [458, 520, 576, 608]
  parts.push(geo41Txt(cols[0], 122, 'k', 12.5, c41.tealInk, 'middle', '700'))
  parts.push(geo41Txt(cols[1], 122, 'sides', 12.5, c41.tealInk, 'middle', '700'))
  parts.push(geo41Txt(cols[2], 122, 'P', 12.5, c41.tealInk, 'middle', '700'))
  parts.push(geo41Txt(cols[3], 122, 'A', 12.5, c41.tealInk, 'middle', '700'))
  const rows: Array<[string, string, string, string]> = [
    ['1', '3, 4, 5', '12', '6'],
    ['2', '6, 8, 10', '24', '24'],
    ['3', '9, 12, 15', '36', '54'],
    ['5', '15, 20, 25', '60', '150'],
  ]
  rows.forEach((r, i) => {
    const y = 148 + i * 26
    parts.push(geo41Txt(cols[0], y, r[0], 12.5, c41.ink))
    parts.push(geo41Txt(cols[1], y, r[1], 12.5, c41.ink))
    parts.push(geo41Txt(cols[2], y, r[2], 12.5, c41.ink))
    parts.push(geo41Txt(cols[3], y, r[3], 12.5, c41.ink))
  })
  parts.push(geo41Txt(532, 258, 'P ×k, A ×k²', 12.5, c41.orange, 'middle', '700'))
  return geo41Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the k / k² machine chart (bar pairs, k = 1..5)     */
/* ------------------------------------------------------------------ */
const geo41Machine = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE k AND k² MACHINE: PERIMETER ×k, AREA ×k²', 13, c41.ink, 'middle', '700'))
  const y0 = 350, yTop = 90, sc = (y0 - yTop) / 150
  // axes
  parts.push(geo41Line(70, y0, 610, y0, c41.ink, 2))
  parts.push(geo41Line(70, y0, 70, yTop - 12, c41.ink, 2))
  for (const v of [0, 50, 100, 150]) {
    const y = y0 - v * sc
    parts.push(geo41Line(70, y, 610, y, c41.faint, 1.2))
    parts.push(geo41Txt(62, y + 4, String(v), 11, c41.tealInk, 'end'))
  }
  // bars
  const centers = [130, 234, 338, 442, 546]
  for (let k = 1; k <= 5; k++) {
    const cx = centers[k - 1]
    const P = 12 * k, A = 6 * k * k
    const hP = P * sc, hA = A * sc
    parts.push(geo41Rect(cx - 40, y0 - hP, 36, hP, c41.sep, 1, c41.ink, 1.8))
    parts.push(geo41Rect(cx + 4, y0 - hA, 36, hA, c41.panel2, 1, c41.orange, 1.8))
    parts.push(geo41Txt(cx - 22, y0 - hP - 8, String(P), 11.5, c41.ink))
    parts.push(geo41Txt(cx + 22, y0 - hA - 8, String(A), 11.5, c41.orange))
    parts.push(geo41Txt(cx, y0 + 22, `k = ${k}`, 12.5, c41.ink, 'middle', '700'))
  }
  // legend
  parts.push(geo41Rect(84, 42, 18, 14, c41.sep, 1, c41.ink, 1.8))
  parts.push(geo41Txt(110, 54, 'perimeter P = 12k', 12.5, c41.ink, 'start'))
  parts.push(geo41Rect(84, 62, 18, 14, c41.panel2, 1, c41.orange, 1.8))
  parts.push(geo41Txt(110, 74, 'area A = 6k²', 12.5, c41.orange, 'start'))
  parts.push(geo41Txt(320, 404, 'the area column pulls away: ×k² beats ×k for every k above 1', 12.5, c41.tealInk))
  return geo41Svg(640, 420, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — nested similar hexagons + the 2×6 vs 3×4 failure   */
/* ------------------------------------------------------------------ */
const geo41HexFail = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'HEXAGONS: ONE SHAPE. RECTANGLES: A FAMILY OF SHAPES', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Line(340, 50, 340, 330, c41.faint, 1.2))
  // nested hexagons, center (160, 190)
  const cx = 160, cy = 190
  parts.push(geo41Poly(geo41HexPts(cx, cy, 84), c41.white, 0, c41.orange, 2.6))
  parts.push(geo41Poly(geo41HexPts(cx, cy, 42), c41.sep, 0.4, c41.tealInk, 2.4))
  // 120° marks: small hexagon top vertex (160, 148); large hexagon bottom vertex (160, 274)
  const d2r = (d: number): number => (d * Math.PI) / 180
  parts.push(geo41Arc(cx, cy - 42, 15, d2r(30), d2r(150), c41.red, 2))
  parts.push(geo41Txt(cx, 183, '120°', 11.5, c41.red))
  parts.push(geo41Arc(cx, cy + 84, 22, d2r(-150), d2r(-30), c41.red, 2))
  parts.push(geo41Txt(cx, 256, '120°', 11.5, c41.red))
  // side labels
  parts.push(geo41Txt(196, 152, 's', 12.5, c41.tealInk, 'start'))
  parts.push(geo41Txt(208, 120, '2s', 12.5, c41.orange, 'start'))
  parts.push(geo41Txt(cx, 62, 'k = 2: every angle stays 120°', 12.5, c41.tealInk))
  parts.push(geo41Txt(cx, 322, 'perimeter ×2, area ×4', 12.5, c41.orange, 'middle', '700'))
  // the rectangle counterexample
  parts.push(geo41Txt(492, 74, 'same angles, same area, NOT similar', 12.5, c41.tealInk))
  parts.push(geo41Rect(402, 88, 180, 60, c41.panel, 0.7, c41.tealInk, 2.4))
  parts.push(geo41Txt(492, 126, '2×6', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(492, 172, '2/6 = 1/3', 12.5, c41.amber))
  parts.push(geo41Rect(432, 196, 120, 90, c41.panel2, 0.7, c41.orange, 2.4))
  parts.push(geo41Txt(492, 248, '3×4', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(492, 304, '3/4', 12.5, c41.amber))
  parts.push(geo41Txt(492, 330, 'no single k — NOT similar', 12.5, c41.red, 'middle', '700'))
  return geo41Svg(640, 350, aria, parts)
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the map scale: 6 cm on the map, 3 km on the ground */
/* ------------------------------------------------------------------ */
const geo41Map = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE 1:50000 MAP: 6 cm STANDS FOR 3 km', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(320, 46, '6 × 50000 = 300000 cm = 3000 m = 3 km', 12.5, c41.tealInk))
  // the map sheet
  parts.push(geo41Rect(90, 70, 200, 120, c41.panel, 0.8, c41.ink, 2.4))
  parts.push(geo41Txt(190, 92, 'THE MAP', 12.5, c41.tealInk, 'middle', '700'))
  parts.push(geo41Line(120, 130, 260, 130, c41.orange, 3))
  parts.push(geo41Dot(120, 130, c41.orange, 4.5))
  parts.push(geo41Dot(260, 130, c41.orange, 4.5))
  parts.push(geo41Txt(190, 154, '6 cm on the map', 12.5, c41.ink))
  // the scale arrow
  parts.push(geo41Arrow(190, 200, 190, 236, c41.amber, 2.4))
  parts.push(geo41Txt(206, 222, 'scale 1 : 50000', 12.5, c41.amber, 'start'))
  // the ground bar
  parts.push(geo41Rect(60, 252, 520, 18, c41.sep, 1, c41.ink, 2))
  parts.push(geo41Dot(60, 261, c41.ink, 5))
  parts.push(geo41Dot(580, 261, c41.ink, 5))
  parts.push(geo41Txt(320, 296, '3,000 m = 3 km on the ground', 13, c41.ink, 'middle', '700'))
  return geo41Svg(640, 310, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the enlargement ladder (Illustration 1)        */
/* ------------------------------------------------------------------ */
const geo41Ladder = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE ENLARGEMENT LADDER: k = 1, THEN 2, THEN 3', 13, c41.ink, 'middle', '700'))
  const base = 210, u = 10
  const tri = (x: number, k: number, stroke: string, fill: string): void => {
    parts.push(geo41Poly([[x, base], [x + 3 * u * k, base], [x, base - 4 * u * k]], fill, 0.14, stroke, 2.4))
    parts.push(geo41RA(x, base, 1, 0, 0, -1, 9, stroke))
    parts.push(geo41Txt(x + 1.5 * u * k, base + 18, String(3 * k), 11.5, c41.amber))
    parts.push(geo41Txt(x - 12, base - 2 * u * k, String(4 * k), 11.5, c41.amber, 'end'))
    parts.push(geo41Txt(x + 1.8 * u * k, base - 2.2 * u * k, String(5 * k), 11.5, c41.amber))
  }
  tri(80, 1, c41.tealInk, c41.panel)
  tri(250, 2, c41.green, c41.panel)
  tri(470, 3, c41.orange, c41.panel2)
  parts.push(geo41Arrow(196, 120, 240, 120, c41.amber, 2.2))
  parts.push(geo41Txt(218, 110, 'k = 2', 12, c41.amber))
  parts.push(geo41Arrow(326, 100, 456, 100, c41.amber, 2.2))
  parts.push(geo41Txt(391, 90, 'k = 3', 12, c41.amber))
  parts.push(geo41Txt(95, 240, 'P = 12, A = 6', 12, c41.ink))
  parts.push(geo41Txt(280, 240, 'P = 24, A = 24', 12, c41.ink))
  parts.push(geo41Txt(515, 240, 'P = 36, A = 54', 12, c41.ink))
  parts.push(geo41Txt(320, 274, 'perimeter ×k; area ×k² — the ladder rule at every rung', 12.5, c41.tealInk))
  return geo41Svg(640, 296, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the map area conversion (Illustration 2)       */
/* ------------------------------------------------------------------ */
const geo41MapArea = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'MAP AREA: 36 cm² → 9 km²', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(320, 46, '1 km² = 10,000,000,000 cm²', 11.5, c41.tealInk))
  // map square 6 cm x 6 cm
  parts.push(geo41Rect(110, 90, 72, 72, c41.panel, 0.8, c41.ink, 2.4))
  parts.push(geo41Txt(146, 132, '6 cm', 12, c41.ink))
  parts.push(geo41Txt(146, 184, '6 cm × 6 cm', 12.5, c41.ink))
  parts.push(geo41Txt(146, 204, 'area 36 cm²', 12.5, c41.tealInk))
  // the scale arrow
  parts.push(geo41Arrow(212, 126, 330, 126, c41.orange, 2.6))
  parts.push(geo41Txt(271, 112, '× 50000²', 12.5, c41.orange))
  // ground square 3 km x 3 km
  parts.push(geo41Rect(360, 60, 180, 180, c41.panel2, 0.8, c41.orange, 2.4))
  parts.push(geo41Txt(450, 158, '3 km', 12, c41.ink))
  parts.push(geo41Txt(450, 264, '3 km × 3 km', 12.5, c41.ink))
  parts.push(geo41Txt(450, 286, 'area 9 km²', 12.5, c41.tealInk))
  return geo41Svg(640, 302, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the photo enlargement (Illustration 3)         */
/* ------------------------------------------------------------------ */
const geo41Photo = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE 4×6 ENLARGEMENT: k = 2, AREA ×4', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Rect(120, 120, 64, 96, c41.panel, 0.8, c41.tealInk, 2.4))
  parts.push(geo41Txt(152, 236, '4×6', 12.5, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(152, 256, 'area 24', 12.5, c41.tealInk))
  parts.push(geo41Arrow(215, 168, 325, 168, c41.orange, 2.4))
  parts.push(geo41Txt(270, 156, 'k = 2', 12.5, c41.orange))
  parts.push(geo41Rect(340, 60, 128, 192, c41.panel2, 0.8, c41.orange, 2.4))
  parts.push(geo41Txt(404, 272, '8×12', 12.5, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(404, 292, 'area 96 = 4 × 24', 12.5, c41.tealInk))
  return geo41Svg(640, 310, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — hexagon angle invariance (Exercise 5)          */
/* ------------------------------------------------------------------ */
const geo41HexInv = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'HEXAGON ANGLES: 120° AT EVERY SIZE', 13, c41.ink, 'middle', '700'))
  const d2r = (d: number): number => (d * Math.PI) / 180
  // small hexagon, s = 4
  parts.push(geo41Poly(geo41HexPts(180, 160, 32), c41.panel, 0.7, c41.tealInk, 2.4))
  parts.push(geo41Arc(180, 128, 12, d2r(30), d2r(150), c41.red, 2))
  parts.push(geo41Txt(180, 150, '120°', 11.5, c41.red))
  parts.push(geo41Txt(180, 218, 's = 4', 12.5, c41.tealInk, 'middle', '700'))
  // large hexagon, s = 10
  parts.push(geo41Poly(geo41HexPts(460, 160, 64), c41.panel2, 0.7, c41.orange, 2.4))
  parts.push(geo41Arc(460, 96, 20, d2r(30), d2r(150), c41.red, 2))
  parts.push(geo41Txt(460, 126, '120°', 11.5, c41.red))
  parts.push(geo41Txt(460, 250, 's = 10', 12.5, c41.orange, 'middle', '700'))
  parts.push(geo41Txt(320, 278, 'same angles at every scale — the shape is fixed, only the size moves', 12.5, c41.tealInk))
  return geo41Svg(640, 292, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the photo chain (Exercise 10)                  */
/* ------------------------------------------------------------------ */
const geo41PhotoChain = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE CHAIN: 4×6 → 8×12 → 20×30', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(320, 44, 'total k = 5: area 24 → 600', 12.5, c41.tealInk))
  parts.push(geo41Rect(90, 150, 28, 42, c41.panel, 0.8, c41.tealInk, 2.2))
  parts.push(geo41Txt(104, 212, '4×6', 12, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(104, 230, 'area 24', 11.5, c41.tealInk))
  parts.push(geo41Rect(250, 122, 56, 84, c41.panel, 0.8, c41.green, 2.2))
  parts.push(geo41Txt(278, 226, '8×12', 12, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(278, 244, 'area 96', 11.5, c41.tealInk))
  parts.push(geo41Rect(470, 60, 140, 210, c41.panel2, 0.8, c41.orange, 2.4))
  parts.push(geo41Txt(540, 288, '20×30', 12.5, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(540, 306, 'area 600', 11.5, c41.tealInk))
  parts.push(geo41Arrow(132, 170, 240, 170, c41.amber, 2.2))
  parts.push(geo41Txt(186, 158, 'k = 2', 12, c41.amber))
  parts.push(geo41Arrow(322, 170, 460, 170, c41.amber, 2.2))
  parts.push(geo41Txt(391, 158, 'k = 2.5', 12, c41.amber))
  return geo41Svg(640, 316, aria, parts)
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S6 — the rectangle audit strip (Exercise 4)         */
/* ------------------------------------------------------------------ */
const geo41RectPair = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo41Txt(320, 22, 'THE RECTANGLE AUDIT: 2×6 AGAINST 3×4', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(320, 48, 'every angle is 90° in both — the ratio test still refuses', 12, c41.tealInk))
  parts.push(geo41Rect(100, 78, 240, 80, c41.panel, 0.7, c41.tealInk, 2.4))
  parts.push(geo41Txt(220, 126, '2×6', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(220, 184, '2/6 = 1/3', 12.5, c41.amber))
  parts.push(geo41Txt(220, 204, 'area 12', 11.5, c41.tealInk))
  parts.push(geo41Rect(430, 78, 160, 120, c41.panel2, 0.7, c41.orange, 2.4))
  parts.push(geo41Txt(510, 146, '3×4', 13, c41.ink, 'middle', '700'))
  parts.push(geo41Txt(510, 218, '3/4', 12.5, c41.amber))
  parts.push(geo41Txt(510, 238, 'area 12', 11.5, c41.tealInk))
  parts.push(geo41Txt(320, 266, 'NOT similar — the ratios differ, so no single k exists', 12.5, c41.red, 'middle', '700'))
  return geo41Svg(640, 282, aria, parts)
}

export const lessonGeo401: Lesson = {
  id: 'geo-similar-figures-same-shape-at-any-scale',
  number: '4.1',
  title: 'Similar Figures: Same Shape at Any Scale',
  concepts: ['similar figures', 'scale factor', 'similarity statement', 'corresponding parts', 'perimeter and area scaling', 'scale drawings', 'similar solids'],
  objectives: [
    'Define similar figures precisely: all corresponding angles equal AND all corresponding sides in one common ratio k, with k stated with its direction',
    'Read and write a similarity statement triangle ABC ~ triangle DEF as an ordered correspondence, extracting the side ratios and angle equalities it licenses',
    'Apply the k, k² machine: perimeters and every length scale by k, areas by k², and use the direction discipline to invert reads',
    'Refute the false certificates of similarity (equal angles alone, equal area, equal perimeter) with the pinned 2×6 vs 3×4 and 2×6 vs 5×3 witnesses',
    'Run map-scale conversions in one and two dimensions (1:50000 lengths and areas), and state the similar-solids k³ teaser',
  ],
  prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
  sources: ['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. the photograph idea                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Same shape, different size: the photograph idea' },
    {
      kind: 'para',
      text: 'Hold a photograph up to its enlargement. The small print is 4 inches by 6; the poster version is 8 by 12. Nobody needs a definition to see that the two pictures show the SAME scene in the SAME arrangement — every line of the composition, every angle at which a roof meets a street, every proportion of a face — and yet the poster is undeniably bigger. The two rectangles are alike in a way that a 4-by-6 print and a 5-by-7 print are NOT alike, even though the 5-by-7 is closer to the original in size. Geometry needs that everyday judgement made precise, because this chapter is about the most productive relaxation in all of elementary mathematics: we take the congruence of Chapter 3 — same shape AND same size — and we let go of the size. What survives is called similarity: same shape at any scale.',
    },
    {
      kind: 'para',
      text: 'The word deserves a slow reading. Similar, from the Latin similis, “like, of the same kind” — and the geometers of the ancient Mediterranean meant by it exactly what a photographer means: a figure and a copy of it produced by a clean enlargement or reduction, with no stretching in one direction only, no shear, no distortion. Euclid organises the entire second half of his geometry around it: Book VI of the Elements is the theory of similar figures, and it is there — not in Book I — that the deepest results of school geometry live, including a proof of Pythagoras\u2019 theorem that this chapter will earn in its final lesson. The idea is old, and it is load-bearing, and it is worth building carefully.',
    },
    {
      kind: 'para',
      text: 'Here is the careful build, in the order this lesson runs it. First the QUESTION of what exactly must match for two figures to deserve the word — because the honest answer is not “they look alike” but a precise double demand: every angle must match, and every side must sit in one common ratio. Then the DEFINITION, written with its correspondence stated, exactly as congruence statements were written in Chapter 3 — the letters in order, the ratio $k$ with its direction named. Then the MACHINE: the remarkable fact that once the sides scale by $k$, the perimeter scales by $k$ but the AREA scales by $k^2$ — the law that makes enlargements expensive in paint and cheap in wire. Then the reach of the idea beyond triangles: similar hexagons, the map in your pocket, and — in one careful paragraph — similar solids. Finally the HISTORY: Thales of Miletus measuring a pyramid by its shadow, the oldest similar-triangles story on record, and the reason the chapter will spend two full lessons earning the criteria that make his trick legal.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Congruence was the special case all along',
      text: 'Look back at Chapter 3 for one moment before relaxing it. Two figures were congruent when some rigid motion carried one onto the other — same shape, same size. Similarity keeps the “same shape” clause and pays for it with a new kind of motion: an enlargement (or reduction) about a center, which multiplies every distance by one fixed factor $k$ and changes nothing else. When $k = 1$ the enlargement is the identity and similarity collapses back into congruence. So every congruent pair is similar (with $k = 1$), and the whole theory of this chapter genuinely contains Chapter 3 as its degenerate rung — a good habit of mathematical bookkeeping: new chapters should tell you exactly what they generalise.',
    },
    {
      kind: 'para',
      text: 'One warning before the machinery starts, because it is the warning the whole lesson exists to make permanent. “Same shape” is NOT a certificate you can read off a single number. The 2-by-6 rectangle and the 3-by-4 rectangle have the same angles — four right angles each — and even the same area, $12$; they are still not similar, because their side ratios are $1/3$ and $3/4$, and no single stretch factor can turn one ratio into the other. A photograph lab that enlarged your 4-by-6 print into a 5-by-9 print would have stretched it — 4 grows by a factor of $1.25$ on the way to 5, while 6 grows by a factor of $1.5$ on the way to 9 — and the faces in the picture would come back visibly wrong. Shape is a joint property of ALL the proportions at once, and the definition below is the honest price of admitting that.',
    },

    /* -------------------------------------------------------------- */
    /* 2. what must match — and what need not                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What must match — and what need not' },
    {
      kind: 'para',
      text: 'Take the witness family that will carry this entire lesson: the right triangle with sides $3$, $4$, $5$, and its enlargements. Enlarge by $k = 2$ and you get $6$, $8$, $10$; enlarge by $k = 3$ and you get $9$, $12$, $15$; enlarge by $k = 5$ and you get $15$, $20$, $25$. Now interrogate the family like an auditor. What is the same across all four triangles, and what has moved?',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 — the 3-4-5 family. The original (k = 1) and its enlargements at k = 2 and k = 3, drawn to one scale with the ratio table (k = 1, 2, 3, 5) beside them: perimeters 12, 24, 36, 60; areas 6, 24, 54, 150. Every angle is identical across the family; every side has grown by the same factor as every other; the perimeter grows like k and the area like k².',
      svg: geo41Family('Three right triangles with sides 3, 4 and 5, then 6, 8 and 10, then 9, 12 and 15, drawn side by side to one scale, with a ratio table listing perimeters 12, 24, 36 and 60 and areas 6, 24, 54 and 150.'),
    },
    {
      kind: 'para',
      text: 'The ANGLES are identical, and this is not a casual observation but a computable one. The cosine rule computes each angle from the three sides: the angle opposite the shortest side is $36.8699^\\circ$ (to four decimals), the angle opposite the middle side is $53.1301^\\circ$, and the right angle sits, as $3^2 + 4^2 = 5^2$ promises, opposite the longest side at exactly $90^\\circ$. Run the same computation on the $9$-$12$-$15$ triangle — which is the same computation with every side multiplied by $3$ — and the three answers come back identical to the last decimal: the factor $k$ multiplies every side, hence every SQUARE of a side, and the cosine rule $\\cos C = (a^2 + b^2 - c^2)/(2ab)$ has $k^2$ on top and $k^2$ on the bottom, so the $k$ cancels and the angle survives. Similarity will demand this of every angle, and the engine behind this lesson verified it at $k = 2$, $3$ and $5$ before a word of this prose stood.',
    },
    {
      kind: 'para',
      text: 'The SIDES have all moved — but they moved TOGETHER. Read the ratios within the $k = 2$ member: $6/3 = 2$, $8/4 = 2$, $10/5 = 2$. Within the $k = 3$ member: $9/3 = 3$, $12/4 = 3$, $15/5 = 3$. One number per enlargement, shared by all three sides. This togetherness is the second half of the definition, and it is exactly what the photograph lab preserves when it enlarges cleanly: every length in the picture — the width, the height, the diagonal of a face, the distance between two windows — grows by the SAME factor. A clean enlargement has one knob, not two. That knob is the scale factor, written $k$ throughout this book, and it must be stated WITH ITS DIRECTION: $k = 3$ enlarging small to large means the trip BACK from large to small runs at $k = 1/3$. Forgetting the direction is the silent source of half the wrong answers in this topic.',
    },
    {
      kind: 'table',
      caption: 'The family census — what the four witnesses share and what they do not; the engine recomputes every cell',
      head: ['Property', 'k = 1', 'k = 2', 'k = 3', 'k = 5', 'Shared?'],
      rows: [
        ['angles', '$36.87^\\circ$, $53.13^\\circ$, $90^\\circ$', 'same', 'same', 'same', 'yes — every angle'],
        ['side ratios to original', '—', '$2, 2, 2$', '$3, 3, 3$', '$5, 5, 5$', 'yes — one common k'],
        ['sides', '$3, 4, 5$', '$6, 8, 10$', '$9, 12, 15$', '$15, 20, 25$', 'no — they scale'],
        ['perimeter', '$12$', '$24$', '$36$', '$60$', 'no — scales by k'],
        ['area', '$6$', '$24$', '$54$', '$150$', 'no — scales by k²'],
      ],
    },
    {
      kind: 'para',
      text: 'Now the column that surprises students: the PERIMETERS and the AREAS do not match — and they misbehave in different ways. The perimeters read $12$, $24$, $36$, $60$: each is $12k$, so perimeters scale by $k$ itself, exactly like any other length. The areas read $6$, $24$, $54$, $150$: each is $6k^2$, so areas scale by the SQUARE of $k$. Enlarge a figure to twice its linear size and it needs twice the fencing but FOUR times the paint — a law every muralist, mapmaker and microchip designer feels in the budget. And notice the seductive coincidence hiding in the table: at $k = 2$ the perimeter $24$ and the area $24$ are the same NUMBER. It is a coincidence of this family at this single scale, not a law — at $k = 3$ the perimeter is $36$ while the area is $54$ — and quoting “perimeter equals area” from the $k = 2$ column is exactly the kind of pattern-reading this book exists to cure.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'What similarity does NOT promise',
      text: 'Similar figures do NOT have equal sides (that was congruence), do NOT have equal perimeters, and do NOT have equal areas. What they have is equal ANGLES and side ratios tied to ONE common $k$ — and from that single $k$, the perimeters and areas are fully determined UP TO their scaling laws: $P\u2032 = kP$ and $A\u2032 = k^2 A$. If an exam option says “similar, so their areas are equal”, cross it out on sight: the correct clause is “so their areas are in the ratio $k^2 : 1$”. The pinned witnesses: the $3$-$4$-$5$ and the $9$-$12$-$15$ are similar with $k = 3$, perimeters $12$ and $36$, areas $6$ and $54$ — the area ratio is $9$, not $3$, and never $1$.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the definition, with the correspondence stated              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The definition: similarity, stated with its correspondence' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Similar figures (the working definition)',
      text: 'Two figures are similar when one is an enlargement or reduction of the other: all corresponding angles are equal AND all corresponding sides are in one common ratio. For triangles, the ordered statement $\\triangle ABC \\sim \\triangle DEF$ asserts the correspondence $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ IN THAT ORDER, and carries exactly six demands: the three angle equalities $\\angle A = \\angle D$, $\\angle B = \\angle E$, $\\angle C = \\angle F$, and the three side ratios $DE/AB = EF/BC = FD/CA = k$, one and the same $k$ for all three. The symbol $\\sim$ is read “is similar to”; the ratio $k$ is the scale factor, ALWAYS stated with its direction ($k = DE/AB$ enlarges $ABC$ into $DEF$; the return trip runs at $1/k$).',
    },
    {
      kind: 'para',
      text: 'The definition inherits its discipline straight from Chapter 3, and the inheritance is worth naming. A congruence statement was an ORDERED contract — the letter positions named which vertex answered which, and all six equalities rode that order. A similarity statement is the same contract with the equal signs on sides relaxed into ratios. $\\triangle ABC \\sim \\triangle DEF$ does NOT merely say “these triangles are similar”; it says $A$ answers $D$, $B$ answers $E$, $C$ answers $F$, and therefore $AB$ is paired with $DE$, $BC$ with $EF$, $CA$ with $FD$. Get the order wrong and every ratio you write downstream is wrong: on the witness family, the honest reading pairs $3 \\to 9$, $4 \\to 12$, $5 \\to 15$ (each ratio $3$), while a careless relabelling might pair $4$ with $15$, demanding the ratio $3.75$ — and the definition would refuse the statement, because the three ratios must be ONE number.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, $\\triangle ABC \\sim \\triangle DEF$ with sides $3, 4, 5$ against $9, 12, 15$ reads: $\\angle A = \\angle D$, $\\angle B = \\angle E$, $\\angle C = \\angle F$, and $9/3 = 12/4 = 15/5 = 3$ — one $k$, stated as $k = 3$ enlarging $ABC$ into $DEF$.',
        'For example, the SAME pair read backwards is $\\triangle DEF \\sim \\triangle ABC$ with $k = 1/3$ — the reduction direction; both statements are true, and they are different statements.',
        'For example, on the map figure of Section 6, the map triangle and the ground triangle are similar with $k = 50000$ from map to ground — and it is the DIRECTION of that $k$ that converts centimetres to kilometres, never the other way round by accident.',
      ],
    },
    {
      kind: 'para',
      text: 'Why the double demand — angles AND sides? Because either half alone is honestly too weak, and this lesson pins the witnesses. ALL ANGLES EQUAL is not enough: the $2 \\times 6$ and $3 \\times 4$ rectangles both carry four right angles, and they are not similar ($2/6 = 1/3$ against $3/4$ — no single $k$). ALL SIDES IN ONE RATIO, for polygons generally, is not enough either — though for TRIANGLES it secretly is, and proving that secret is precisely what Lessons 4.2 and 4.3 accomplish. For triangles, angles and side-ratios hold each other up (the angle sum pins the shape; the ratio pins the size); for general polygons the two demands must be checked independently. That asymmetry — triangles are EASY, rectangles are not — is the real content of the section after next, and the honest reason the definition is written as a double demand.',
    },
    {
      kind: 'derivation',
      title: 'Why one common k must hold for all three sides',
      statement: 'Suppose $\\triangle ABC \\sim \\triangle DEF$ under the correspondence $A \\to D$, $B \\to E$, $C \\to F$. Then the three side ratios cannot disagree: if even one pair of corresponding sides carried a different ratio, no enlargement could produce the copy, and the triangles would differ in shape.',
      steps: [
        {
          label: 'The enlargement is one map',
          explanation: 'An enlargement about any center multiplies EVERY distance in the plane by the same factor $k$ — that is what “one knob” means. It cannot stretch the base by $2$ and the height by $3$; a transformation with two different factors is not an enlargement but a distortion.',
        },
        {
          label: 'Sides are distances',
          formula: 'DE = k \\cdot AB,\\quad EF = k \\cdot BC,\\quad FD = k \\cdot CA',
          explanation: 'Each side of the copy is the image of the corresponding side, so each is $k$ times it — the same $k$ three times over, because there is only one map.',
        },
        {
          label: 'The converse trap',
          explanation: 'If the ratios disagreed — say $DE/AB = 2$ but $EF/BC = 3$ — then no single $k$ could serve as the multiplier, so no enlargement carries one triangle onto the other: the shapes differ. This is exactly the $2 \\times 6$ vs $3 \\times 4$ refusal, run on triangles.',
        },
        {
          label: 'Direction discipline',
          formula: 'k = \\frac{DE}{AB} = \\frac{EF}{BC} = \\frac{FD}{CA},\\quad \\frac{1}{k} = \\frac{AB}{DE}',
          explanation: 'The $k$ read from $ABC$ to $DEF$ and the $k$ read from $DEF$ to $ABC$ are reciprocals, two directions of one arrow. Always name the arrow before you name the number.',
        },
      ],
      result: 'Similarity is the one-knob law: all angles equal, all side ratios equal to ONE common $k$ — stated with its direction — and anything less is a distortion, not a similarity.',
    },
    {
      kind: 'para',
      text: 'A historical note on the symbol and the concept, because the notation is younger than the idea by two millennia. Euclid writes “similar and similarly situated” figures (Book VI, Definition 1) and proves the theory without a single equals-sign, let alone a tilde; the symbol $\\sim$ for similarity is a nineteenth-century typographical convenience. The idea, though, is thoroughly Greek and thoroughly practical: it is the mathematics of the SHADOW and the MAP, the tools by which the ancients measured what they could not reach — the height of a pyramid from its shadow, the width of a river from two stakes, the distance to a ship from two headlands. The last section of this lesson returns to Thales at the pyramid; the two lessons that follow earn the theorems (the Basic Proportionality Theorem, then the AA criterion) that make such measurements provable rather than plausible.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the k, k² machine                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The k, k² machine: perimeters, areas, and every length between' },
    {
      kind: 'para',
      text: 'Now the machine itself — the collection of scaling laws that turns one similarity statement into a whole spreadsheet of consequences. The input is the scale factor $k$ with its direction; the output is everything else. The laws, stated for the 3-4-5 family where they can be checked line by line, hold for every pair of similar figures whatsoever:',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The scaling laws (the k, k² machine)',
      text: 'Let one figure be the image of another under a similarity with scale factor $k$ (direction: original $\\to$ image). Then EVERY length scales by $k$: sides, perimeters, diagonals, heights, medians, circumradii — the lot. Areas scale by $k^2$. On the witness family ($k = 1, 2, 3, 4, 5$): perimeters $12, 24, 36, 48, 60$; areas $6, 24, 54, 96, 150$. The converse reads hold too: a perimeter ratio of $k$ or an area ratio of $k^2$ recovers the same $k$ — the three reads can never disagree, because they are three gauges of one knob.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 — the k and k² machine chart. For each k from 1 to 5, the perimeter bar (12k: 12, 24, 36, 48, 60) stands beside the area bar (6k²: 6, 24, 54, 96, 150) on one linear scale. The perimeter climbs in a straight line; the area bends away quadratically — at k = 5 the area bar is two and a half times the perimeter bar in value, and the gap widens without bound.',
      svg: geo41Machine('A paired bar chart for k from 1 to 5: perimeter bars with values 12, 24, 36, 48 and 60 beside area bars with values 6, 24, 54, 96 and 150, the area bars pulling away quadratically above the perimeter bars.'),
    },
    {
      kind: 'derivation',
      title: 'The two scaling laws proved in one pass',
      statement: 'If a figure with perimeter $P$ and area $A$ is enlarged by factor $k$, the image has perimeter $kP$ and area $k^2 A$. Both proofs are two lines, and both are worth owning cold.',
      steps: [
        {
          label: 'Perimeter is a sum of lengths',
          formula: 'P = s_1 + s_2 + s_3 + \\dots',
          explanation: 'Write the perimeter as the sum of the side lengths. Each side of the image is $k$ times its original: $s_i\u2032 = k s_i$. Summing: $P\u2032 = ks_1 + ks_2 + ks_3 + \\dots = k(s_1 + s_2 + s_3 + \\dots) = kP$. A sum of things each scaled by $k$ is scaled by $k$ — the perimeter has no choice.',
        },
        {
          label: 'Area is base times height, and BOTH scale',
          formula: 'A = \\frac{1}{2} b h \\;\\Rightarrow\\; A\u2032 = \\frac{1}{2} (kb)(kh) = k^2 \\cdot \\frac{1}{2} b h = k^2 A',
          explanation: 'Take any triangle of the figure (a polygon subdivides into triangles, and areas add). Its base and its height are both lengths, so both scale by $k$ — and they MULTIPLY in the area formula, so the $k$s multiply too. One factor of $k$ for each dimension of “area”: that is what square units mean.',
        },
        {
          label: 'The numeric witness at k = 3',
          formula: '\\frac{1}{2} \\cdot 12 \\cdot 9 = 54 = 9 \\times 6',
          explanation: 'The 9-12-15 triangle has base $12$ and height $9$ (the image of the $4$ and $3$): its area $54$ is nine times the original $6$ — the $k^2$ law with $k^2 = 9$, checked by the engine before this sentence was allowed to stand.',
        },
        {
          label: 'Why diagonals, medians and heights ride along',
          explanation: 'Every one of those objects is a LENGTH determined by the figure — and the enlargement multiplies every distance in the plane by $k$, not merely the sides. The height to the hypotenuse of the 3-4-5 is $12/5 = 2.4$; at $k = 3$ it is $108/15 = 7.2 = 3 \\times 2.4$. The median to the hypotenuse is $2.5$; at $k = 3$ it is $7.5$. There is no quantity in the figure that gets to opt out.',
        },
      ],
      result: 'Perimeters (and every single length) scale by $k$; areas scale by $k^2$. One knob, two dials — and the area dial is squared.',
    },
    {
      kind: 'table',
      caption: 'The machine read off the 3-4-5 family — every cell recomputed by the engine',
      head: ['k', 'sides', 'perimeter 12k', 'area 6k²', 'P ratio', 'A ratio'],
      rows: [
        ['1', '$3, 4, 5$', '$12$', '$6$', '$1$', '$1$'],
        ['2', '$6, 8, 10$', '$24$', '$24$', '$2$', '$4$'],
        ['3', '$9, 12, 15$', '$36$', '$54$', '$3$', '$9$'],
        ['4', '$12, 16, 20$', '$48$', '$96$', '$4$', '$16$'],
        ['5', '$15, 20, 25$', '$60$', '$150$', '$5$', '$25$'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the two ratio columns together and the machine\u2019s economy appears: the perimeter ratios are $1, 2, 3, 4, 5$ — the perfect counting numbers — while the area ratios are $1, 4, 9, 16, 25$ — the perfect squares. This is where the phrase “similar figures sit in the ratio $k : 1$ for lengths and $k^2 : 1$ for areas” comes from, and it is also the exam-setter\u2019s favourite territory: given that an enlargement doubles a perimeter, by what factor does the area grow? Answer: not $2$ — $k = 2$ from the perimeter read, so the area grows by $k^2 = 4$. Given that an area grew by a factor of $25$? Then $k^2 = 25$, so $k = 5$: every length, including the perimeter, grew fivefold. The two dials are welded to one knob, and questions hop between the dials precisely because the hop is forced.',
    },
    {
      kind: 'para',
      text: 'One more class of rider deserves its own paragraph, because it is the machine\u2019s most-quoted exam line: DIAGONALS, HEIGHTS AND MEDIANS scale by $k$, not by $k^2$. The $3 \\times 8$ rectangle has diagonal $\\sqrt{73} \\approx 8.5440$; its $k = 2$ image, the $6 \\times 16$ rectangle, has diagonal $\\sqrt{292} = 2\\sqrt{73} \\approx 17.0880$ — doubled, not quadrupled, because a diagonal is a LENGTH even though it lives inside an area formula\u2019s family. Students who learn “areas scale by $k^2$” too bluntly will square the diagonal; the cure is to ask, of each object, WHAT it is made of: made of one length (side, perimeter piece, diagonal, height, median, radius) — it scales by $k$; made of two lengths multiplied (area) — it scales by $k^2$; and the three-dimensional analogue (volume, made of three) will make its single teased appearance at the end of the map section.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the three reads of one k',
      text: 'Every scaling question on this topic is one of three reads, and the mark scheme pays for the read, not the arithmetic. READ 1 (sides): the ratio of a pair of corresponding sides IS $k$ — compute it from the cleanest pair available and STATE THE DIRECTION (“$k = 3$ from the small to the large”). READ 2 (perimeter): perimeter ratio is $k$ — so a perimeter pair like $12 \\to 60$ hands you $k = 5$ immediately. READ 3 (area): area ratio is $k^2$ — so an area pair like $6 \\to 150$ hands you $k^2 = 25$, hence $k = 5$, and the perimeter ratio must ALSO be $5$: consistency across reads is free verification, and inconsistency means the figures were never similar. The classic trap: “the perimeter tripled, so the area tripled” — false, the area went up NINE times ($k = 3$, $k^2 = 9$; the witness: $12 \\to 36$ but $6 \\to 54$).',
    },

    /* -------------------------------------------------------------- */
    /* 5. beyond triangles: hexagons and the rectangle failure        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Beyond triangles: hexagons, and the rectangle family\u2019s honest failure' },
    {
      kind: 'para',
      text: 'Everything so far was witnessed on triangles, and triangles are the easy case — so easy that two lessons of this chapter are spent explaining exactly WHY they are easy. To see what the general definition costs, step up one rung of the polygon ladder and ask two questions. Are any two REGULAR hexagons similar? Are any two RECTANGLES similar? The first answer is yes, for a reason worth memorising; the second is no, for a reason worth pinning above your desk.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 — left: nested regular hexagons at k = 2 (side s and side 2s): every angle stays 120°, the perimeter doubles, the area quadruples. Right: the 2×6 and 3×4 rectangles — four right angles each, areas both 12, and still NOT similar, because 2/6 = 1/3 while 3/4, and no single k reconciles them.',
      svg: geo41HexFail('Two nested regular hexagons with 120 degree angles marked and side labels s and 2s, beside two rectangles labelled 2 by 6 and 3 by 4 with the ratio annotations 2/6 = 1/3 and 3/4 and the verdict NOT similar.'),
    },
    {
      kind: 'para',
      text: 'THE HEXAGON ANSWER. A regular hexagon has six equal sides and six equal angles, and the angle is forced: the interior-angle formula $(n - 2) \\times 180^\\circ / n$ with $n = 6$ gives $4 \\times 180^\\circ / 6 = 120^\\circ$, at every vertex, with no freedom left over. So take any two regular hexagons, of sides $s$ and $t$: the angles match ($120^\\circ$ against $120^\\circ$, six times), and the side ratios match ($t/s$, six times — the same number, because all six sides of each are equal). Both demands of the definition hold automatically, with $k = t/s$: ALL regular hexagons are similar, whatever their sizes. The engine checked the angle the honest way — by building hexagons on circumcircles of radius $1$, $7$ and $1000$ and computing every interior angle from the coordinates — and $120^\\circ$ came back every time, because the interior-angle formula never mentions the side length at all. The scaling laws then apply wholesale: at $k = 2$ the perimeter doubles ($6s$ to $12s$ — true for every $s$, swept by the engine from $s = 1$ to $9$) and the area quadruples (the exact areas at $s = 2$ and $s = 4$ are $6\\sqrt{3} \\approx 10.3923$ and $24\\sqrt{3} \\approx 41.5692$, ratio exactly $4$). The same argument runs for equilateral triangles, squares, regular pentagons — every regular $n$-gon is similar to every other of its kind. Regularity is a one-shape guarantee.',
    },
    {
      kind: 'para',
      text: 'THE RECTANGLE ANSWER. A rectangle has four right angles — always, automatically, whatever its proportions. So the ANGLE demand of similarity is free. And yet rectangles are emphatically not all similar, because the side-ratio demand is not free: the ratio of short side to long side is a genuine degree of freedom, ranging over every value in $(0, 1]$, and two rectangles are similar exactly when they share that ratio. The pinned witness: the $2 \\times 6$ rectangle has short-to-long ratio $2/6 = 1/3 \\approx 0.3333$; the $3 \\times 4$ rectangle has $3/4 = 0.75$. Equal angles, then — and equal AREAS too, since $2 \\times 6 = 12 = 3 \\times 4$ — and still NOT similar, because no single scale factor $k$ can carry a $1{:}3$ rectangle onto a $3{:}4$ one. Try to read one off the long sides: $6/4 = 1.5$. Off the short sides: $2/3 \\approx 0.6667$. Those two candidate $k$s already disagree, and the diagonal audit delivers a third: the diagonals are $\\sqrt{40} \\approx 6.3246$ and $5$, ratio $\\approx 1.2649$, matching neither. Three ratios, three different numbers — the signature of a shape mismatch.',
    },
    {
      kind: 'para',
      text: 'This one witness deserves to be generalised, because it is the exam-setter\u2019s favourite false certificate. The rectangles similar to the $2 \\times 6$ are exactly the $1{:}3$ rectangles: the $3 \\times 9$ (reached at $k = 1.5$), the $4 \\times 12$ ($k = 2$), the $5 \\times 15$ ($k = 2.5$) — and NOT the $3 \\times 4$, whatever the shared angles and area say. Equal PERIMETER fares no better than equal area: the $2 \\times 6$ and the $5 \\times 3$ both have perimeter $16$, and their ratios $1/3$ and $5/3$ could not differ more. The pattern is the Chapter 3 lesson retold at a higher level of generality: no SINGLE number — one angle, one area, one perimeter — certifies a claim about ALL proportions jointly. Similarity is exactly that joint claim, and for polygons beyond triangles the definition must be checked in both halves, angle by angle and ratio by ratio.',
    },
    {
      kind: 'table',
      caption: 'The honest negatives — three tempting certificates, three pinned refusals (every cell engine-checked)',
      head: ['Tempting claim', 'Witness pair', 'What agrees', 'What refuses', 'Verdict'],
      rows: [
        ['equal angles force similarity', '$2\\times 6$ vs $3\\times 4$ rectangles', 'four right angles each', 'ratios $1/3$ vs $3/4$', 'NOT similar'],
        ['equal area forces similarity', '$2\\times 6$ vs $3\\times 4$ rectangles', 'area $12$ both', 'same ratio refusal', 'NOT similar'],
        ['equal perimeter forces similarity', '$2\\times 6$ vs $5\\times 3$ rectangles', 'perimeter $16$ both', 'ratios $1/3$ vs $5/3$', 'NOT similar'],
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The rectangle trap: same angles is not same shape',
      text: 'For TRIANGLES, matching all the angles happens to force similarity — that is the AA criterion, and Lessons 4.2 and 4.3 will prove it. The fatal transfer is to carry the rule across to quadrilaterals and general polygons, where it is FALSE: every rectangle on earth has the same four angles, and rectangles come in a continuous family of different shapes. The pinned refutation pair to quote under exam pressure: $2 \\times 6$ against $3 \\times 4$ — same angles, same area $12$, ratios $1/3$ against $3/4$, NOT similar. When a multiple-choice option argues from equal angles on polygons with four or more sides, treat it as wrong until a ratio check says otherwise.',
    },
    {
      kind: 'para',
      text: 'Why are triangles exempt from the trap? In one sentence, because a triangle has no spare proportions: its three angles sum to $180^\\circ$ (Chapter 2\u2019s angle-sum law), so fixing two angles fixes the third, and fixing the shape; only the size remains free, and the size is exactly what $k$ measures. A quadrilateral has an angle left over after the angles are named — or equivalently, a free ratio between its sides — and that freedom is precisely the room in which the $2 \\times 6$ and the $3 \\times 4$ live apart. Making that sentence into theorems (the Basic Proportionality Theorem of 4.2, the AA criterion of 4.3) is the chapter\u2019s central programme; the present lesson only needs the boundary of the trap clearly drawn.',
    },

    /* -------------------------------------------------------------- */
    /* 6. scale drawings and maps + the solids teaser                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Scale drawings and maps: similarity put to work' },
    {
      kind: 'para',
      text: 'A map is the most familiar similar figure in daily life, and the most disciplined: a printed map is a SCALE DRAWING of the ground, similar to it in the strict sense of this lesson, with the scale factor written on the sheet for all to read. The Ordnance Survey legend reads $1 : 50000$ — one unit on the map stands for fifty thousand of the same units on the ground — and that colon notation is a similarity statement in miniature: $k = 50000$ in the map-to-ground direction (and $k = 1/50000$ coming back). Every length on the ground is $50000$ times its printed image; every length on the map is one fifty-thousandth of the thing it depicts.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 — the map-scale machine. The 6 cm segment printed on the map (top plate) and the ground distance it depicts (bottom bar), joined by the scale arrow 1:50000: 6 × 50000 = 300000 cm = 3000 m = 3 km. The conversion is a similarity read with k stated in its direction.',
      svg: geo41Map('A map plate with a 6 centimetre segment, an arrow labelled scale 1 to 50000 pointing down, and a ground bar labelled 3000 metres equals 3 kilometres, with the computation 6 times 50000 equals 300000 centimetres.'),
    },
    {
      kind: 'para',
      text: 'The length conversion is the machine\u2019s first dial. A road printed as $6$ cm on the $1{:}50000$ sheet is $6 \\times 50000 = 300000$ cm on the ground, and the unit ladder finishes the job: $300000$ cm is $3000$ m, which is $3$ km. Read a second one for fluency: a lake printed at $4.8$ cm is $4.8 \\times 50000 = 240000$ cm $= 2400$ m $= 2.4$ km. And the read runs backwards exactly as the direction discipline demands: a $3$ km stretch of river occupies $3\\text{ km} / 50000 = 6$ cm on the sheet. One knob, both directions, no arithmetic creativity required — multiply going up, divide coming down, and always name which way you are travelling before you multiply anything.',
    },
    {
      kind: 'derivation',
      title: 'The map-area conversion, done honestly',
      statement: 'A region printed with area $36\\text{ cm}^2$ on the $1{:}50000$ sheet covers $9\\text{ km}^2$ of ground. The conversion has exactly one trap in it, and the trap is the star of the derivation.',
      steps: [
        {
          label: 'Lengths scale by k — but areas are not lengths',
          explanation: 'The reflex multiplication $36 \\times 50000 = 1800000$ is the trap: it treats an AREA as if it were a length. The result, $1800000\\text{ cm}^2 = 180\\text{ m}^2$, is wrong by a factor of fifty thousand — a back garden, not a district. The engine pinned this wrong path before the right one, because it is the path real students take.',
        },
        {
          label: 'Areas scale by k²',
          formula: '36 \\times 50000^2 = 36 \\times 2.5 \\times 10^9 = 9 \\times 10^{10}\\text{ cm}^2',
          explanation: 'The similarity machine of Section 4 does the conversion: ground area = map area $\\times k^2$, and $k^2 = 50000^2 = 2\\,500\\,000\\,000$. The factor gets squared because area is a product of two lengths, and EACH length carries its own factor of $k$.',
        },
        {
          label: 'The unit ladder, squared',
          formula: '1\\text{ km} = 10^5\\text{ cm} \\;\\Rightarrow\\; 1\\text{ km}^2 = 10^{10}\\text{ cm}^2',
          explanation: 'One kilometre is a hundred thousand centimetres, so one SQUARE kilometre is a hundred thousand SQUARED — ten billion square centimetres. This is the same squaring, applied to the unit instead of the number; forgetting it is the twin of the trap above.',
        },
        {
          label: 'Divide and land',
          formula: '\\frac{9 \\times 10^{10}\\text{ cm}^2}{10^{10}\\text{ cm}^2/\\text{km}^2} = 9\\text{ km}^2',
          explanation: 'The map square of area $36\\text{ cm}^2$ is a $6 \\times 6$ square of the sheet, depicting a $3 \\times 3$ kilometre district — and $3 \\times 3 = 9$ checks the arithmetic from the length side, the free consistency read the machine always offers.',
        },
      ],
      result: '$36\\text{ cm}^2$ of $1{:}50000$ map is $36 \\times 50000^2 = 9 \\times 10^{10}\\text{ cm}^2 = 9\\text{ km}^2$ of ground: square the scale, square the unit, and never multiply an area by a bare $k$.',
    },
    {
      kind: 'para',
      text: 'Run the honest conversion once more for ownership: a park printed at $16\\text{ cm}^2$ covers $16 \\times 2.5 \\times 10^9 = 4 \\times 10^{10}\\text{ cm}^2 = 4\\text{ km}^2$ of ground — the same machine, the same squared ladder, answer $4$. Map questions in examinations are almost always one of these two reads (a length or an area) attached to a stated scale; the mark lives in squaring $k$ for areas and in remembering the $10^{10}$, and the pinned witnesses $6\\text{ cm} \\to 3\\text{ km}$ and $36\\text{ cm}^2 \\to 9\\text{ km}^2$ are the pair to memorise.',
    },
    {
      kind: 'para',
      text: 'And one paragraph, exactly one, on the third dimension — the teaser the spec of this lesson fences off for a later book. Similar SOLIDS obey the same laws with one more power: if a solid is enlarged by $k$, every length scales by $k$, every area by $k^2$, and every VOLUME by $k^3$ — three lengths multiply in a volume, so three factors of $k$ ride along. The witness to hold: a cube of edge $2$ beside a cube of edge $5$ — similar solids with $k = 2.5$, surface areas $24$ and $150$ (ratio $6.25 = 2.5^2$), volumes $8$ and $125$ (ratio $15.625 = 2.5^3$). The pattern — one $k$ per dimension — is the whole story, and it is why a kettle twice the size in every measurement holds eight times the water. That is the entire treatment here; solids ride their own volume-and-surface chapter later in the shelf, and this lesson only plants the signpost.',
    },

    /* -------------------------------------------------------------- */
    /* 7. Thales and the pyramid                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Thales at the pyramid: the oldest similar-triangles story' },
    {
      kind: 'para',
      text: 'The tradition — retold by Plutarch, and by every history of mathematics since — sends Thales of Miletus to Egypt around 600 BCE, where the priests challenge him to measure the height of the Great Pyramid: no ladder, no rope, nothing but the sun, a stick and the ground. Thales plants his staff, waits for the moment its shadow exactly equals its height (or, in the plainer version, simply measures both shadow and staff), and delivers the verdict: the pyramid\u2019s shadow, measured from the centre of its base, is to the pyramid\u2019s height as the stick\u2019s shadow is to the stick. Two triangles — the stick with its shadow and sunbeam, the pyramid with its shadow and sunbeam — share the shape: each holds a right angle at the ground, each holds the same sun angle at the top (the sun\u2019s rays arrive parallel, in effect, for so distant a source), and so each locks the same third angle. Same shape, different size: SIMILAR triangles, with the ratio of heights equal to the ratio of shadows, and the pyramid measured from the safety of the sand.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Thales, and what the story really claims',
      text: 'Thales of Miletus (fl. c. 600 BCE) is the first name in the Greek mathematical tradition — tradition credits him with five geometrical results, including the theorem that the angle in a semicircle is a right angle, and with measuring pyramids by shadows. The pyramid story is first told of him centuries later (Diogenes Laertius, Plutarch), and its arithmetic heart is exactly this lesson\u2019s: similar triangles convert an unreachable length into a reachable ratio. What the story does NOT yet contain is the theorem — the proof that matching two angles really does force the side ratios into one common $k$ (the AA criterion) — and this book refuses to use a tool before earning it. The earning is the programme of 4.2 (the Basic Proportionality Theorem, by the equal-altitude area argument) and 4.3 (the criteria AA, SAS, SSS). Here, the story stands as motivation wearing honest clothes: a two-millennia-old rumour of the machine this chapter builds.',
    },
    {
      kind: 'para',
      text: 'You can already run the SHADOW ARITHMETIC, flagged honestly as a preview, because it is nothing but the $k$-machine with a direction. Suppose a person $1.7$ m tall casts a shadow $2.4$ m long at the moment a tree casts a shadow $18$ m long. The two triangles — person-and-shadow, tree-and-shadow — are similar (two angles match: the right angle at the ground, the sun angle at the top; the third matches because the angle sum is $180^\\circ$), so the heights stand in the same ratio as the shadows: $k = 18 / 2.4 = 7.5$ from person-triangle to tree-triangle, and the tree stands at $1.7 \\times 7.5 = 12.75$ m. Every number in that computation is engine-pinned ($1.7 \\times 18 / 2.4 = 12.75$ exactly); what is NOT yet earned is the license to jump from two matching angles to full similarity — that is the AA criterion, and Lesson 4.3 will make the jump a theorem. Until then, treat the shadow method as a promissory note, and notice how much of practical similarity it already explains: maps, photographs, scale models, shadows — one knob, everywhere.',
    },

    /* -------------------------------------------------------------- */
    /* 8. three worked chains (Illustrations)                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Similarity in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. The first runs the enlargement ladder on the witness family — every rung computed, every ratio checked — the template for all scaling questions. The second is the map audit in both dials: one length conversion and one area conversion, with the squared-scale trap dismantled in the open. The third is the photograph problem every studio meets: a clean enlargement, its $k$, and the area bill. In all three the discipline is identical: read the correspondence, state $k$ with its direction, then let the machine finish the arithmetic.',
    },
    {
      kind: 'example',
      title: 'The enlargement ladder. Starting from the right triangle with sides $3$, $4$, $5$ (perimeter $12$, area $6$), compute the sides, perimeters and areas of the enlargements at $k = 2$ and $k = 3$, verify that the ratios confirm a single $k$ at each rung, and check the angles have not moved.',
      steps: [
        'Sol. Rung $k = 2$: multiply every side by $2$ — sides $6$, $8$, $10$; perimeter $6 + 8 + 10 = 24 = 2 \\times 12$; area $\\frac{1}{2} \\times 6 \\times 8 = 24 = 4 \\times 6$. The $k^2$ factor is $4$, and the perimeter factor is $2$: two dials, one knob.',
        'Rung $k = 3$: sides $9$, $12$, $15$; perimeter $9 + 12 + 15 = 36 = 3 \\times 12$; area $\\frac{1}{2} \\times 9 \\times 12 = 54 = 9 \\times 6$. The area factor $9$ is the square of the perimeter factor $3$, as the machine demands.',
        'Verify the single $k$ at each rung, side by side: at $k = 2$, $6/3 = 8/4 = 10/5 = 2$; at $k = 3$, $9/3 = 12/4 = 15/5 = 3$ — one ratio per rung, shared by all three sides, so the correspondence is honest.',
        'Check the right angles survive: $6^2 + 8^2 = 36 + 64 = 100 = 10^2$ and $9^2 + 12^2 = 81 + 144 = 225 = 15^2$ — both enlargements are right-angled, and the cosine rule returns the same acute angles $36.87^\\circ$ and $53.13^\\circ$ at every rung (the $k^2$ cancels top and bottom).',
        'Read the ladder back down for the direction discipline: from the $9$-$12$-$15$ rung to the original, $k = 3/9 = 1/3$ — the reduction direction; perimeters divide by $3$ ($36 \\to 12$) and areas by $9$ ($54 \\to 6$), the same machine with the arrow reversed.',
        'Hence the ladder: perimeters $12, 24, 36$ ride $k = 1, 2, 3$ while areas $6, 24, 54$ ride $k^2 = 1, 4, 9$ — one knob, two dials, witnessed at every rung.',
      ],
      figures: [
        {
          caption: 'The enlargement ladder for Illustration 1: the 3-4-5 family at k = 1, 2, 3 with the perimeter and area values under each rung (P = 12, 24, 36; A = 6, 24, 54) and the ×k / ×k² rule spelled out beneath.',
          svg: geo41Ladder('Three right triangles growing from sides 3, 4 and 5 to 6, 8 and 10 to 9, 12 and 15, with arrows labelled k = 2 and k = 3 and the perimeter and area values under each rung.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The map audit, both dials. On a $1{:}50000$ map, a road is printed $6$ cm long and a lake is printed with area $36\\text{ cm}^2$. Find the ground length of the road and the ground area of the lake, showing the unit conversions explicitly.',
      steps: [
        'Sol. Dial one, the length: the scale hands you $k = 50000$ in the map-to-ground direction, so the road measures $6 \\times 50000 = 300000$ cm on the ground.',
        'Climb the unit ladder: $300000$ cm $= 3000$ m (divide by $100$) $= 3$ km (divide by $1000$). The road is $3$ km long.',
        'Dial two, the area — and the trap: an area is not a length, so the scale must be SQUARED. Ground area $= 36 \\times 50000^2 = 36 \\times 2\\,500\\,000\\,000 = 9 \\times 10^{10}$ cm².',
        'Square the unit too: $1$ km $= 10^5$ cm, so $1$ km² $= 10^{10}$ cm² — and $9 \\times 10^{10} / 10^{10} = 9$: the lake covers $9$ km² of ground.',
        'Audit the trap you avoided: multiplying the AREA by the bare scale gives $36 \\times 50000 = 1\\,800\\,000$ cm² $= 180$ m² — a garden pond, wrong by a factor of $50000$. The engine pinned this wrong path deliberately; walk it once so you never walk it twice.',
        'Cross-check from the length side for free: $36\\text{ cm}^2$ is a $6 \\times 6$ square of sheet, and $6$ cm maps to $3$ km, so the lake is $3 \\times 3 = 9$ km² — the two dials agree, as they must.',
        'Hence the road is $3$ km and the lake is $9$ km², with the laws: ground length $=$ map length $\\times 50000$; ground area $=$ map area $\\times 50000^2$.',
      ],
      figures: [
        {
          caption: 'The map area conversion for Illustration 2: the 6 cm by 6 cm square of sheet (area 36 cm²) against the 3 km by 3 km district it depicts (area 9 km²), joined by the × 50000² scale arrow and the unit law 1 km² = 10,000,000,000 cm².',
          svg: geo41MapArea('A small square labelled 6 centimetres by 6 centimetres with area 36 square centimetres, an arrow labelled times 50000 squared, and a large square labelled 3 kilometres by 3 kilometres with area 9 square kilometres.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The photograph enlargement. A $4 \\times 6$ photograph is enlarged to $8 \\times 12$. Find the scale factor with its direction, the ratio of areas, and the area of the enlargement; then state the total scale factor if the same original is later blown up to $20 \\times 30$ instead.',
      steps: [
        'Sol. Read the correspondence first: width answers width, height answers height, so $k = 8/4 = 2$ — and the height confirms it, $12/6 = 2$: one $k$, enlarging original to copy.',
        'The area ratio is $k^2 = 4$: the original\u2019s area is $4 \\times 6 = 24$, and the enlargement\u2019s is $8 \\times 12 = 96 = 4 \\times 24$ — four times the print, twice the ink in each direction.',
        'For the $20 \\times 30$ blow-up, the same read gives the total factor $k = 20/4 = 5$, confirmed by $30/6 = 5$; the area ratio is $k^2 = 25$, and indeed $20 \\times 30 = 600 = 25 \\times 24$.',
        'Note what the machine forbids: a $5 \\times 9$ enlargement of the $4 \\times 6$ would carry $k = 5/4 = 1.25$ across the width but $k = 9/6 = 1.5$ across the height — two knobs, hence a DISTORTION, not a similarity; the lab that prints it has stretched the picture.',
        'Hence the enlargement runs at $k = 2$ with areas $24 \\to 96$ (ratio $4$); the blow-up runs at $k = 5$ with areas $24 \\to 600$ (ratio $25$) — and any print that disagrees with itself between width and height is not an enlargement at all.',
      ],
      figures: [
        {
          caption: 'The photo enlargement for Illustration 3: the 4×6 print (area 24) beside its k = 2 image the 8×12 print (area 96 = 4 × 24), with the scale arrow and both areas labelled.',
          svg: geo41Photo('A small 4 by 6 rectangle with area 24, an arrow labelled k equals 2, and a large 8 by 12 rectangle with area 96 equals 4 times 24.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. the collected law: formula cards + exam corner               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect everything the lesson built, in the form the revision sheet wants. The first is the definition itself, with the correspondence and the direction clause. The second is the machine — the two dials welded to one knob. The third extends the machine to every length a figure carries. The fourth is the map law, with its squared-scale warning written on the card where you cannot miss it. The fifth is the three-dimensional teaser, planted for the volume chapter that will cash it.',
    },
    {
      kind: 'formula',
      name: 'Similar figures (the definition, with direction)',
      latex: '\\triangle ABC \\sim \\triangle DEF \\;\\Rightarrow\\; \\angle A = \\angle D,\\ \\angle B = \\angle E,\\ \\angle C = \\angle F,\\quad \\frac{DE}{AB} = \\frac{EF}{BC} = \\frac{FD}{CA} = k',
      note: 'all angles equal AND all sides in ONE common ratio k — state the direction: k enlarges ABC into DEF, and 1/k brings it back',
    },
    {
      kind: 'formula',
      name: 'The perimeter and area laws (the k, k² machine)',
      latex: "P' = kP,\\quad A' = k^2 A",
      note: 'perimeters scale by k, areas by k² — witness: the 3-4-5 family, P = 12, 24, 36, 60 and A = 6, 24, 54, 150 at k = 1, 2, 3, 5',
    },
    {
      kind: 'formula',
      name: 'Every length scales by k',
      latex: "d' = kd",
      note: 'diagonals, heights, medians, circumradii — every one-length object; witness: the 3×8 diagonal √73 ≈ 8.5440 doubles to 2√73 ≈ 17.0880 at k = 2',
    },
    {
      kind: 'formula',
      name: 'The map scale law (1:50000)',
      latex: '\\text{ground length} = \\text{map length} \\times 50000,\\quad \\text{ground area} = \\text{map area} \\times 50000^2',
      note: 'square the scale for areas, and square the unit: 1 km² = 10¹⁰ cm² — witnesses: 6 cm → 3 km, 36 cm² → 9 km²',
    },
    {
      kind: 'formula',
      name: 'Similar solids (the k³ teaser)',
      latex: '\\text{lengths}: k,\\quad \\text{areas}: k^2,\\quad \\text{volumes}: k^3',
      note: 'one k per dimension — witness: cubes of edge 2 and 5 (k = 2.5): surfaces 24 → 150 (×6.25), volumes 8 → 125 (×15.625)',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: correspondence, direction, dimension',
      text: 'Three habits pay marks on this topic. FIRST, correspondence before ratios: write WHICH side answers WHICH before dividing anything — a ratio computed across a misread correspondence is wrong even when the arithmetic is perfect. SECOND, direction before multiplication: every scale factor is an arrow; write “$k = 3$, small to large” (or “$k = 1/3$ to shrink back”) before using it, and half the wrong answers in this topic become impossible to write. THIRD, dimension before the factor: ask what the quantity is MADE of — one length (side, perimeter, diagonal, height, median): $k$; two lengths multiplied (area): $k^2$; three (volume, in the teaser): $k^3$. The standard traps are all dimension slips: “the perimeter doubled, so the area doubled” (false — it quadrupled), “the map is $1{:}50000$, so $36\\text{ cm}^2$ is $36 \\times 50000$ cm²” (false — square the scale, land at $9$ km²), and “same angles, so similar” (false beyond triangles — the $2 \\times 6$ vs $3 \\times 4$ refusal). Typical mark scheme: the correct $k$ with its direction is a mark; each correct scaling law applied is a mark; the units conversion is a mark.',
    },

    /* -------------------------------------------------------------- */
    /* 10. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'similar figures', def: 'Figures related by an enlargement or reduction: all corresponding angles equal AND all corresponding sides in one common ratio $k$. Congruence is the $k = 1$ special case.' },
        { term: 'similarity statement', def: 'The ordered assertion $\\triangle ABC \\sim \\triangle DEF$: the letter positions name the correspondence ($A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$), and all six demands — three angle equalities, three side ratios — ride that order.' },
        { term: 'scale factor (k)', def: 'The single multiplier carrying one figure onto its similar mate: $k = DE/AB$ from $\\triangle ABC$ to $\\triangle DEF$, with the return trip at $1/k$. ALWAYS stated with its direction.' },
        { term: 'corresponding parts', def: 'The paired sides and angles a correspondence names: $AB$ with $DE$, $BC$ with $EF$, $CA$ with $FD$; $\\angle A$ with $\\angle D$, and so on. Ratios and equalities are only licensed between corresponding parts.' },
        { term: 'the k, k² machine', def: 'The scaling laws: every length (sides, perimeter, diagonals, heights, medians) scales by $k$; every area scales by $k^2$. Witness: the 3-4-5 family, perimeters $12, 24, 36, 48, 60$ and areas $6, 24, 54, 96, 150$ at $k = 1$ to $5$.' },
        { term: 'regular polygon similarity', def: 'All regular $n$-gons of the same $n$ are similar: the interior angle $(n-2) \\times 180^\\circ / n$ is forced (a hexagon\u2019s is $120^\\circ$ at every size), and equal sides make the ratio automatically common, $k = t/s$.' },
        { term: 'the rectangle trap', def: 'Equal angles do not force similarity beyond triangles: the $2 \\times 6$ and $3 \\times 4$ rectangles share four right angles and even an area of $12$, but their side ratios $1/3$ and $3/4$ differ, so no single $k$ exists.' },
        { term: 'scale drawing', def: 'A drawing similar to the thing it depicts, with the ratio stated: a $1{:}50000$ map has $k = 50000$ from map to ground — lengths multiply by $50000$, areas by $50000^2$.' },
        { term: 'representative fraction', def: 'The map-maker\u2019s name for the scale written as a ratio of like units, $1 : 50000$; multiplying the printed length by the fraction of the ground unit converts map to ground in one step.' },
        { term: 'the map-area law', def: 'Ground area $=$ map area $\\times k^2$, with the unit squared in step: $1\\text{ km}^2 = 10^{10}\\text{ cm}^2$. The pinned witnesses: $36\\text{ cm}^2 \\to 9\\text{ km}^2$ and $16\\text{ cm}^2 \\to 4\\text{ km}^2$ on the $1{:}50000$ sheet.' },
        { term: 'similar solids', def: 'The three-dimensional continuation (teaser): lengths scale by $k$, areas by $k^2$, volumes by $k^3$ — cubes of edge $2$ and $5$ run $k = 2.5$, surfaces $24 \\to 150$, volumes $8 \\to 125$.' },
        { term: 'Thales\u2019 shadow measurement', def: 'The tradition that Thales of Miletus measured a pyramid by comparing its shadow to a staff\u2019s: two similar right triangles convert an unreachable height into a reachable ratio — legalised as a theorem by AA in Lesson 4.3.' },
        { term: 'ratio of similitude', def: 'Another name for the scale factor between similar figures, used when the correspondence rather than the enlargement is under discussion: the ratio $k : 1$ in which corresponding lengths stand.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. quiz (key [2,1,3,0,4] — PINNED)                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Two figures are similar exactly when —',
          options: [
            'they have equal areas, since area measures overall size',
            'they have equal perimeters, since equal boundary means equal shape',
            'every corresponding angle is equal AND every pair of corresponding sides is in one common ratio $k$ — the same $k$ for all the pairs',
            'they look alike at a glance, the way two rectangles always do',
          ],
          answer: 2,
          explain: 'The definition is double: ALL angles equal and ALL side ratios equal to ONE common $k$. Option (a) fails on the $2 \\times 6$ vs $3 \\times 4$ rectangles — areas $12$ both, not similar. Option (b) fails on the $2 \\times 6$ vs $5 \\times 3$ rectangles — perimeters $16$ both, ratios $1/3$ vs $5/3$, not similar. Option (d) is the photograph stretched: appearance without a ratio check is exactly how distorted prints fool the eye. Only the joint demand — angles and one common ratio together — earns the word similar.',
        },
        {
          q: 'Triangle $ABC$ has sides $3$, $4$, $5$; triangle $DEF$ has sides $9$, $12$, $15$. The scale factor from $ABC$ to $DEF$ is —',
          options: [
            '$k = 1/3$, since the small triangle must be the image',
            '$k = 3$, since $9/3 = 12/4 = 15/5$, one ratio for all three sides',
            '$k = 9$, since the area grows ninefold',
            '$k = 6$, the difference of the perimeters $36 - 12$... wait, the difference of $12$ and $36$',
          ],
          answer: 1,
          explain: 'The side ratios are $9/3 = 3$, $12/4 = 3$, $15/5 = 3$ — one common value, so $k = 3$ in the direction small to large. Option (a) quotes the RECIPROCAL — the reduction direction, $DEF$ to $ABC$ — a true number with the arrow backwards; the direction is part of the answer. Option (c) confuses the area ratio $k^2 = 9$ with $k$ itself. Option (d) is not a similarity read at all: differences of perimeters have no role in the theory — ratios, not subtractions, carry shape.',
        },
        {
          q: 'A model is built at scale factor $k = 2.5$ (original to model). The perimeters and areas of the model, compared with the original, are —',
          options: [
            'perimeters $\\times 2.5$ and areas $\\times 2.5$',
            'perimeters $\\times 5$ and areas $\\times 2.5$',
            'perimeters $\\times 6.25$ and areas $\\times 2.5$',
            'perimeters $\\times 2.5$ and areas $\\times 6.25$',
          ],
          answer: 3,
          explain: 'Perimeter is a sum of lengths, so it inherits the bare factor $k = 2.5$; area is a product of two lengths, so it inherits $k^2 = 6.25$. Option (a) is the dimension slip — the most common wrong answer in the topic (the 3-4-5 witness: perimeters $12 \\to 30$ but areas $6 \\to 37.5$... on the $k = 2.5$ rung the area is $6 \\times 6.25 = 37.5$, not $15$). Options (b) and (c) scramble the two dials; only (d) assigns one $k$ per dimension correctly. Note the consistency read: an area ratio of $6.25$ recovers $k = 2.5$ for EVERY length, including the perimeter.',
        },
        {
          q: 'The $2 \\times 6$ rectangle and the $3 \\times 4$ rectangle: every angle of both is $90^\\circ$, and both areas are $12$. The verdict is —',
          options: [
            'NOT similar — the ratios $2/6 = 1/3$ and $3/4$ differ, so no single $k$ carries one onto the other',
            'similar, because all four angles agree in both figures',
            'similar, because the areas agree at $12$',
            'similar with $k = 2$, since the perimeters differ by $2$',
          ],
          answer: 0,
          explain: 'Run the ratio audit: short-to-long gives $1/3$ against $3/4$ — different, so the side-ratio demand of the definition fails and the rectangles are NOT similar, whatever the angles say. Option (b) is the rectangle trap: equal angles force similarity for TRIANGLES (AA, Lesson 4.3) but not for polygons with a spare proportion. Option (c) is the single-number fallacy — area $12$ both, shapes different; the same pair refutes it. Option (d) invents a difference-of-perimeters rule that does not exist: perimeters $16$ and $14$ differ by $2$, and similarity is stated in ratios, never in differences.',
        },
        {
          q: 'On a $1{:}50000$ map, a road is printed $6$ cm long. On the ground the road is —',
          options: [
            '$300$ m',
            '$30$ km',
            '$0.3$ km',
            '$3000$ cm',
            '3 km',
          ],
          answer: 4,
          explain: 'Multiply by the scale in the map-to-ground direction and climb the unit ladder: $6 \\times 50000 = 300000$ cm $= 3000$ m $= 3$ km. Option (a) slips a factor of ten ($300$ m would need a $1{:}5000$ sheet). Option (b) overshoots by the same slip on the far side. Option (c) divides where it should multiply — the direction discipline exists precisely to prevent this. Option (d) stops before converting units: $300000$ cm is the raw product, not a ground length in sensible units; the last step, $300000$ cm $= 3$ km, is where the answer lives.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 12. graded exercises (15, L1-L6, full Cengage step solutions)   */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the similarity machine and its audits',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'The right triangle with sides $3$, $4$, $5$ is enlarged by $k = 4$. Write down the sides, the perimeter and the area of the enlargement, and state the direction of your $k$.',
              solution: [
                'Sol. Multiply every side by $4$: the sides are $12$, $16$, $20$.',
                'Perimeter: $12 + 16 + 20 = 48$ — the machine\u2019s read $P\\u2032 = kP = 4 \\times 12 = 48$ agrees.',
                'Area: $\\frac{1}{2} \\times 12 \\times 16 = 96$ — the machine\u2019s read $A\\u2032 = k^2 A = 16 \\times 6 = 96$ agrees.',
                'Check the right angle survived: $12^2 + 16^2 = 144 + 256 = 400 = 20^2$ — the enlargement is right-angled, as it must be.',
                'Hence the sides are $12$, $16$, $20$, the perimeter is $48$ and the area is $96$, with $k = 4$ enlarging the $3$-$4$-$5$ original into the copy (the return read is $k = 1/4$).',
              ],
              answer: 'sides $12$, $16$, $20$; perimeter $48$; area $96$ (at $k = 4$, original to enlargement)',
            },
            {
              q: 'A $5 \\times 7$ photograph (area $35$) is enlarged by $k = 3$. Find the dimensions and the area of the enlargement, and the ratio of the two areas.',
              solution: [
                'Sol. Dimensions: width $5 \\times 3 = 15$, height $7 \\times 3 = 21$ — the enlargement is $15 \\times 21$.',
                'Area of the enlargement: $15 \\times 21 = 315$.',
                'Ratio of areas: $315 / 35 = 9 = k^2$ — the squared dial, exactly as the machine demands ($3^2 = 9$).',
                'Hence the enlargement is $15 \\times 21$ with area $315$, and the areas stand in the ratio $9 : 1$.',
              ],
              answer: '$15 \\times 21$; area $315$; area ratio $9 : 1$',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The right triangle with sides $8$, $15$, $17$ is enlarged so that its shortest side becomes $12$. Find $k$ with its direction, the other two sides of the enlargement, and the perimeters and areas of both triangles.',
              solution: [
                'Sol. Read $k$ off the shortest sides: $k = 12/8 = 3/2 = 1.5$, enlarging the $8$-$15$-$17$ original into the copy.',
                'The other sides: $15 \\times 1.5 = 22.5$ and $17 \\times 1.5 = 25.5$ — one $k$ for all three sides, confirmed by $22.5/15 = 25.5/17 = 1.5$.',
                'Check the image is right-angled: $12^2 + 22.5^2 = 144 + 506.25 = 650.25 = 25.5^2$ — the right angle survives, as the angle-invariance law promises.',
                'Perimeters: original $8 + 15 + 17 = 40$; image $12 + 22.5 + 25.5 = 60 = 1.5 \\times 40$ — the $\\times k$ dial.',
                'Areas: original $\\frac{1}{2} \\times 8 \\times 15 = 60$; image $\\frac{1}{2} \\times 12 \\times 22.5 = 135 = 2.25 \\times 60$ — the $\\times k^2$ dial, with $k^2 = 2.25$.',
                'Hence $k = 1.5$ (original to copy), the sides are $12$, $22.5$, $25.5$, the perimeters are $40$ and $60$, and the areas are $60$ and $135$.',
              ],
              answer: '$k = 3/2$ enlarging the original; sides $12$, $22.5$, $25.5$; perimeters $40 \\to 60$; areas $60 \\to 135$',
            },
            {
              q: 'The rectangle audit. A $2 \\times 6$ rectangle and a $3 \\times 4$ rectangle have all four angles equal (right angles) and equal areas. Are they similar? Run the full ratio audit, including the diagonal read, and state the verdict with its reason.',
              solution: [
                'Sol. Note what agrees: every angle is $90^\\circ$ in both, and the areas are $2 \\times 6 = 12$ and $3 \\times 4 = 12$ — two tempting certificates.',
                'Run the side-ratio audit: short-to-long reads $2/6 = 1/3 \\approx 0.3333$ against $3/4 = 0.75$ — DIFFERENT, so already no single $k$ exists.',
                'Try the other direction for honesty: long-to-short reads $6/2 = 3$ against $4/3 \\approx 1.3333$ — different again; and long-side-against-long-side would demand $6/4 = 1.5$ while short-against-short demands $2/3 \\approx 0.6667$ — the candidate ratios disagree whichever way you pair.',
                'Diagonal audit: $\\sqrt{2^2 + 6^2} = \\sqrt{40} \\approx 6.3246$ against $\\sqrt{3^2 + 4^2} = 5$, ratio $\\approx 1.2649$ — a third number, matching none of the others; a true similarity would repeat ONE ratio everywhere.',
                'Hence NOT similar: same angles and same area, but the ratios $1/3$ and $3/4$ differ, so no single scale factor carries one rectangle onto the other — the rectangle trap in full.',
              ],
              answer: 'NOT similar — angles and areas agree, but $2/6 = 1/3 \\ne 3/4$, and the diagonal ratio $\\approx 1.2649$ confirms no single $k$',
              figures: [
                {
                  caption: 'The rectangle audit for Exercise 4: the 2×6 and 3×4 rectangles side by side with the ratio reads 2/6 = 1/3 and 3/4, the shared area 12 noted, and the NOT-similar verdict — the exercise\u2019s audit drawn.',
                  svg: geo41RectPair('Two rectangles, one 2 by 6 and one 3 by 4, with ratio annotations 2/6 = 1/3 and 3/4, both areas marked 12, and the verdict NOT similar.'),
                },
              ],
            },
            {
              q: 'Regular hexagons of side $4$ and side $10$: are they similar? Find $k$ with its direction, the perimeters, the ratio of areas, and the interior angles of both.',
              solution: [
                'Sol. All regular hexagons are similar — the interior angle $(6-2) \\times 180^\\circ / 6 = 120^\\circ$ is forced at every vertex at every size, and equal sides inside each make the side ratio automatically common.',
                'Read $k$: $k = 10/4 = 2.5$, enlarging the side-$4$ hexagon into the side-$10$ one (the return read is $0.4$).',
                'Perimeters: $6 \\times 4 = 24$ and $6 \\times 10 = 60$ — the ratio $60/24 = 2.5 = k$, the length dial.',
                'Areas: the ratio is $k^2 = 6.25$ — the area dial (the exact areas $\\frac{3\\sqrt{3}}{2} \\times 16 \\approx 41.5692$ and $\\frac{3\\sqrt{3}}{2} \\times 100 \\approx 259.8076$ stand in exactly that ratio).',
                'Angles: $120^\\circ$ in BOTH hexagons, every vertex — invariance under scaling is the whole meaning of same shape.',
                'Hence similar with $k = 2.5$ (side-4 to side-10), perimeters $24 \\to 60$, area ratio $6.25 : 1$, interior angles $120^\\circ$ in both.',
              ],
              answer: 'similar with $k = 2.5$; perimeters $24$ and $60$; area ratio $6.25 : 1$; interior angles $120^\\circ$ in both',
              figures: [
                {
                  caption: 'The hexagon angle invariance for Exercise 5: regular hexagons of side 4 and side 10 with the 120° angle marked in each — the shape fixed while the size moves, the similarity of all regular hexagons drawn.',
                  svg: geo41HexInv('Two regular hexagons of different sizes with 120 degree angles marked at a vertex of each and side labels s = 4 and s = 10.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'On a $1{:}50000$ map, a lake is printed $4.8$ cm long. How long is the lake on the ground, in metres and in kilometres? Then read backwards: how long is a $3$ km road on the same sheet?',
              solution: [
                'Sol. Ground length: $4.8 \\times 50000 = 240000$ cm — the scale multiplied in the map-to-ground direction.',
                'Unit ladder: $240000$ cm $= 2400$ m $= 2.4$ km.',
                'Hence the lake is $2400$ m, that is $2.4$ km, long.',
                'Now the reverse read, a $3$ km road: divide by the scale — $3\\text{ km} = 300000$ cm, and $300000 / 50000 = 6$ cm on the sheet.',
                'Check the direction discipline: $k = 50000$ map-to-ground, $k = 1/50000$ ground-to-map; multiplying $3$ by $50000$ would give kilometres of nonsense — the arrow is part of the arithmetic.',
                'Hence the lake measures $2400$ m $= 2.4$ km, and the $3$ km road prints as $6$ cm.',
              ],
              answer: 'the lake is $2400$ m $= 2.4$ km; the $3$ km road prints as $6$ cm',
            },
            {
              q: 'A park is printed with area $16\\text{ cm}^2$ on the $1{:}50000$ sheet. Find the ground area of the park in square kilometres, showing the squared unit conversion; then audit the unsquared slip and say by what factor it is wrong.',
              solution: [
                'Sol. Areas scale by the SQUARE of the scale: ground area $= 16 \\times 50000^2 = 16 \\times 2\\,500\\,000\\,000 = 4 \\times 10^{10}$ cm².',
                'Square the unit: $1$ km $= 10^5$ cm, so $1$ km² $= 10^{10}$ cm².',
                'Divide: $4 \\times 10^{10} / 10^{10} = 4$ — the park covers $4$ km² of ground.',
                'Cross-check from the length side: $16\\text{ cm}^2$ is a $4 \\times 4$ square of sheet; $4$ cm maps to $2$ km, so the park is $2 \\times 2 = 4$ km² — the dials agree.',
                'Audit the slip: multiplying the area by the BARE scale gives $16 \\times 50000 = 800000$ cm² $= 80$ m² — wrong by a factor of $50000$, a tennis court where a district should be.',
                'Hence the park is $4$ km², and the unsquared computation is wrong by a factor of $50000$.',
              ],
              answer: '$4$ km²; the unsquared slip ($800000$ cm² $= 80$ m²) is wrong by a factor of $50000$',
            },
            {
              q: 'Triangle $P$ has sides $7$, $10$, $12$; triangle $Q$ has sides $21$, $30$, $36$. Are they similar? If so, find $k$ with its direction, both perimeters, and the ratio of their areas (no absolute areas are needed).',
              solution: [
                'Sol. Run the ratio audit: $21/7 = 3$, $30/10 = 3$, $36/12 = 3$ — one common ratio, so the side-ratio demand holds.',
                'State $k$ with its direction: $k = 3$, enlarging $P$ into $Q$ (the return read is $1/3$).',
                'Perimeters: $7 + 10 + 12 = 29$ and $21 + 30 + 36 = 87$; the ratio $87/29 = 3 = k$ — the length dial confirms the read.',
                'Area ratio: $k^2 = 9$ — no Heron labour required; the machine hands the RATIO over without ever computing an absolute area.',
                'Hence similar, $k = 3$ from $P$ to $Q$, perimeters $29$ and $87$, area ratio $9 : 1$.',
              ],
              answer: 'similar with $k = 3$ ($P$ to $Q$); perimeters $29$ and $87$; area ratio $9 : 1$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'A triangle has perimeter $18$ and area $12$. A similar triangle is drawn with each side three times as long. Find its perimeter and its area.',
              solution: [
                'Sol. Read $k$ from the sides: “each side three times as long” is $k = 3$, original to copy — the direction is given in the sentence, so quote it.',
                'Perimeter: $P\\u2032 = kP = 3 \\times 18 = 54$ — perimeters are sums of lengths, so they ride the bare $k$.',
                'Area: $A\\u2032 = k^2 A = 9 \\times 12 = 108$ — areas are products of two lengths, so they ride $k^2 = 9$.',
                'Audit the trap: answering $36$ for the area ($3 \\times 12$) is the dimension slip; the $3$-$4$-$5$ witness shows the law ($12 \\to 36$ for perimeter but $6 \\to 54$ for area at $k = 3$).',
                'Hence the similar triangle has perimeter $54$ and area $108$.',
              ],
              answer: 'perimeter $54$; area $108$',
            },
            {
              q: 'The photo chain. A $4 \\times 6$ photograph (area $24$) is enlarged to $8 \\times 12$, and later the SAME original is blown up to $20 \\times 30$. Find $k$ for each step, the total $k$ from original to the final blow-up, and all three areas; verify the total read.',
              solution: [
                'Sol. Step one, $4 \\times 6 \\to 8 \\times 12$: $k = 8/4 = 2$, confirmed by $12/6 = 2$; area $8 \\times 12 = 96 = 4 \\times 24$.',
                'Step two, the blow-up $4 \\times 6 \\to 20 \\times 30$: the total factor is $k = 20/4 = 5$, confirmed by $30/6 = 5$.',
                'Areas: original $24$, first enlargement $96$, blow-up $20 \\times 30 = 600$ — and $600 = 25 \\times 24$, the total $k^2 = 25$.',
                'Verify the chain law: the first step runs at $k = 2$ and the second leg runs at $20/8 = 30/12 = 2.5$; composed, $2 \\times 2.5 = 5$ — the total read, and the direction is original-to-final throughout.',
                'Hence step one $k = 2$ (areas $24 \\to 96$), the total is $k = 5$ (areas $24 \\to 600$), and the three areas are $24$, $96$, $600$.',
              ],
              answer: 'step $k = 2$; total $k = 5$; areas $24$, $96$, $600$',
              figures: [
                {
                  caption: 'The photo chain for Exercise 10: the 4×6 original (area 24), the 8×12 enlargement (area 96) at k = 2, and the 20×30 blow-up (area 600) reached at total k = 5 — the composition of enlargements drawn as one chain.',
                  svg: geo41PhotoChain('Three photographs growing from 4 by 6 to 8 by 12 to 20 by 30, with arrows labelled k = 2 and k = 2.5 and areas 24, 96 and 600 under them.'),
                },
              ],
            },
            {
              q: 'Every length, not just the sides. A $3 \\times 8$ rectangle has diagonal $\\sqrt{73}$. (a) Find the diagonal of the similar rectangle obtained at $k = 2$, as an exact surd and a decimal. (b) A triangle has a median of length $5$ and an altitude of length $4$; find the corresponding median and altitude of its similar copy at $k = 2.4$.',
              solution: [
                'Sol. (a) The image rectangle is $6 \\times 16$, and its diagonal is $\\sqrt{6^2 + 16^2} = \\sqrt{292} = 2\\sqrt{73} \\approx 17.0880$ — the original diagonal is $\\sqrt{73} \\approx 8.5440$, and the ratio is exactly $2$.',
                'Note the law: the diagonal is a LENGTH (one-dimensional), so it scales by $k = 2$, not $k^2$ — squaring it to $4\\sqrt{73}$ is the dimension slip.',
                '(b) The median is a length: $5 \\times 2.4 = 12$. The altitude is a length: $4 \\times 2.4 = 9.6$.',
                'Both are interior segments, but the enlargement multiplies EVERY distance in the plane by $k$ — medians, altitudes, angle bisectors, circumradii: nothing opts out.',
                'Hence the image diagonal is $2\\sqrt{73} \\approx 17.0880$, the image median is $12$ and the image altitude is $9.6$.',
              ],
              answer: 'diagonal $2\\sqrt{73} \\approx 17.0880$; median $12$; altitude $9.6$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Prove the area law: if a triangle with base $b$ and height $h$ is enlarged by factor $k$, its area grows by $k^2$. Then witness the proof on the $3$-$4$-$5$ triangle at $k = 3$, computing both areas explicitly.',
              solution: [
                'Sol. Set up: the area of a triangle is $A = \\frac{1}{2} b h$, where $b$ is any side chosen as base and $h$ is the height perpendicular to it.',
                'Scale: under the enlargement, the base becomes $kb$ (it is a length) and the height becomes $kh$ (it is also a length — the enlargement multiplies every distance by $k$, and perpendicularity survives).',
                'Compute the image area: $A\\u2032 = \\frac{1}{2} (kb)(kh) = \\frac{1}{2} k^2 b h = k^2 \\cdot \\frac{1}{2} b h = k^2 A$ — the two factors of $k$ enter multiplicatively because base and height MULTIPLY inside the formula.',
                'Witness at $k = 3$ on the $3$-$4$-$5$: take base $4$ and height $3$, so $A = \\frac{1}{2} \\times 4 \\times 3 = 6$; the image is the $9$-$12$-$15$ with base $12$ and height $9$, so $A\\u2032 = \\frac{1}{2} \\times 12 \\times 9 = 54$.',
                'Compare: $54 = 9 \\times 6 = k^2 A$ with $k = 3$ — the proof and the arithmetic agree, and the engine recomputed both before this line was allowed to stand.',
                'Hence areas scale by $k^2$: one factor of $k$ per dimension of the quantity, proved from $A = \\frac{1}{2}bh$ and witnessed at $6 \\to 54$.',
              ],
              answer: 'proved: $A\\u2032 = \\frac{1}{2}(kb)(kh) = k^2 A$; witness: $6 \\to 54$ at $k = 3$ on the $3$-$4$-$5$',
            },
            {
              q: 'The double refutation. (a) Exhibit two rectangles with EQUAL perimeters that are not similar, with the full ratio audit. (b) Exhibit two rectangles with EQUAL areas that are not similar. (c) List three rectangles that ARE similar to the $2 \\times 6$, with the $k$ for each.',
              solution: [
                'Sol. (a) The $2 \\times 6$ and the $5 \\times 3$: perimeters $2(2 + 6) = 16$ and $2(5 + 3) = 16$ — equal. Ratios: $2/6 = 1/3 \\approx 0.3333$ against $5/3 \\approx 1.6667$ — different, so NOT similar; equal totals never enforced a common ratio.',
                '(b) The $2 \\times 6$ and the $3 \\times 4$: areas $12$ and $12$ — equal. Ratios: $1/3$ against $3/4$ — different, so NOT similar; the shared area certifies nothing about shape.',
                '(c) The rectangles similar to the $2 \\times 6$ are exactly the $1{:}3$ rectangles: the $3 \\times 9$ (reached at $k = 9/6 = 1.5$), the $4 \\times 12$ (at $k = 12/6 = 2$) and the $5 \\times 15$ (at $k = 15/6 = 2.5$) — in each, short-to-long reads $1/3$, the original\u2019s own ratio.',
                'Moral, stated once: perimeter, area and angles are SINGLE numbers; similarity is a claim about the whole ratio structure at once, and on rectangles the structure is exactly the one number short-to-long — which no single measurement replaces.',
                'Hence (a) $2 \\times 6$ vs $5 \\times 3$ (perimeters $16$ both), (b) $2 \\times 6$ vs $3 \\times 4$ (areas $12$ both), and (c) $3 \\times 9$, $4 \\times 12$, $5 \\times 15$ at $k = 1.5$, $2$, $2.5$ respectively.',
              ],
              answer: '(a) $2 \\times 6$ vs $5 \\times 3$, perimeters $16$ both, NOT similar; (b) $2 \\times 6$ vs $3 \\times 4$, areas $12$ both, NOT similar; (c) $3 \\times 9$, $4 \\times 12$, $5 \\times 15$ at $k = 1.5, 2, 2.5$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The shadow method (a flagged preview of AA). A person $1.7$ m tall casts a shadow $2.4$ m long; at the same moment a tree casts a shadow $18$ m long. Assuming the two shadow triangles are similar (two matching angles — the right angle at the ground and the sun angle — with the third forced by the angle sum; the full licence is the AA criterion of Lesson 4.3), find the height of the tree, and state exactly which claim remains unearned until 4.3.',
              solution: [
                'Sol. Set up the correspondence: person\u2019s height answers tree\u2019s height, person\u2019s shadow answers tree\u2019s shadow (the right angles sit at the ground, the sun angles at the top).',
                'Read $k$ from the shadows: $k = 18/2.4 = 7.5$, from person-triangle to tree-triangle — the direction stated before it is used.',
                'Apply to the heights: the tree stands at $1.7 \\times 7.5 = 12.75$ m.',
                'Arithmetic audit: $1.7 \\times 18 = 30.6$, and $30.6/2.4 = 12.75$ exactly — the engine pinned every number before this solution was written.',
                'Name the unearned step honestly: the jump from “two angles match” to “the triangles are similar” is the AA criterion, proved in Lesson 4.3 (via the Basic Proportionality Theorem of 4.2); this exercise USES it as an assumption, in the flag the question supplies — exactly how Thales\u2019 pyramid story stands until the licence arrives.',
                'Hence the tree is $12.75$ m tall, on the flagged assumption of similarity; the theorem that licenses the assumption is AA, Lesson 4.3.',
              ],
              answer: 'the tree is $12.75$ m tall; the unearned claim is AA — two matching angles forcing similarity — proved in Lesson 4.3',
            },
            {
              q: 'The similar-solids ladder. A cube of edge $2$ and a cube of edge $5$ are similar solids. Compute $k$ with its direction, the ratio of their surface areas (and the two surfaces themselves), and the ratio of their volumes (and the two volumes themselves); then state the general k, k², k³ law the numbers illustrate.',
              solution: [
                'Sol. Read $k$: $k = 5/2 = 2.5$, enlarging the small cube into the large one (the return read is $0.4$).',
                'Surfaces: the small cube carries $6 \\times 2^2 = 24$; the large carries $6 \\times 5^2 = 150$. The ratio is $150/24 = 6.25 = 2.5^2$ — areas ride $k^2$, and a surface is an area.',
                'Volumes: the small cube holds $2^3 = 8$; the large holds $5^3 = 125$. The ratio is $125/8 = 15.625 = 2.5^3$ — volumes ride $k^3$, three lengths multiplied.',
                'State the law: for similar solids, lengths scale by $k$, areas by $k^2$, volumes by $k^3$ — one factor of $k$ per dimension of the quantity, the lesson\u2019s machine extended one rung upward.',
                'Hence $k = 2.5$ (small to large), surfaces $24 \\to 150$ in the ratio $6.25 : 1$, volumes $8 \\to 125$ in the ratio $15.625 : 1$.',
              ],
              answer: '$k = 2.5$; surfaces $24 \\to 150$ (ratio $6.25$); volumes $8 \\to 125$ (ratio $15.625$); law: lengths $k$, areas $k^2$, volumes $k^3$',
            },
          ],
        },
      ],
    },

    /* -- APPEND TAIL (sections land above this line) -- */
  ],
}
