import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 4 "Similarity: the Geometry of Proportion"
 * (OPENED and CLOSED COMPLETE by RUN 130, 2026-11-27 — the maths lane,
 * whole-chapter cadence, v9.2 protocol; all four seats landed engine-green
 * in one swarm against the master pin set scripts/pin_check_geo130.py,
 * 62/62).
 *
 * The four seats: 4.1 'Similar Figures: Same Shape at Any Scale' (95/95);
 * 4.2 'The Basic Proportionality Theorem (Thales)' (96/96); 4.3 'The
 * Similarity Criteria: AA, SAS, SSS' (116/116); 4.4 'Pythagoras Proved:
 * the Theorem Earned' (97/97) — engine+pin scores from the run-130 wip
 * harnesses, re-run against THIS file by scripts/verify-book5-ch04.ts
 * which closes with the CLOSED chapter census.
 *
 * PROVENANCE: ground = the run-130 reference-scan-first pass (v9.2
 * amendment 9): Euclid Elements Book VI via Joyce's aleph0 edition
 * (VI.2 the BPT, VI.4-VI.6 the criteria, VI.8 the geometric-mean leg,
 * VI.19 the duplicate-ratio area law, VI.31 Pythagoras by similarity —
 * fetched this run) plus cut-the-knot's Euclid-proof page; NCERT class 10
 * ch.6 'Triangles' theorem statements via the NCERT-site search results +
 * solutions-page fetch (the official PDF fetch was blocked from the
 * sandbox — logged in docs/project/SOURCE_LOG.md under the run-130 block);
 * sibling books on disk (Foundation Mathematics ch.6 ratio and proportion,
 * Geometry ch.1-3 congruence). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below is
 * OUR OWN, engine-pinned in scripts/verify-book5-ch04.ts.
 */
/* ================================================================== */
/* lesson 4.1 — from docs/research/geo-ch04-wip/part-geo401.ts            */
/* ================================================================== */
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

/* ================================================================== */
/* lesson 4.2 — from docs/research/geo-ch04-wip/part-geo402.ts            */
/* ================================================================== */
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
  parts.push(geo42Txt(112, 342, 'AB = 14', 12.5, c42.tealInk, 'end'))
  parts.push(geo42Txt(484, 100, 'AE = 9', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(514, 258, 'EC = 12', 12.5, c42.tealInk, 'start'))
  parts.push(geo42Txt(534, 342, 'AC = 21', 12.5, c42.tealInk, 'start'))
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

/* ================================================================== */
/* lesson 4.3 — from docs/research/geo-ch04-wip/part-geo403.ts            */
/* ================================================================== */
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

/* ================================================================== */
/* lesson 4.4 — from docs/research/geo-ch04-wip/part-geo404.ts            */
/* ================================================================== */
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
  parts.push(geo44Txt(470, 464, 'a (shorter leg)', 11.5, c44.ink, 'middle'))
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
  return geo44Svg(640, 470, aria, parts)
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
  parts.push(geo44Txt(172, 254, '2 m', 11.5, c44.amber))
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

export const chapter4: Chapter = {
  number: 4,
  slug: 'similarity-and-proportion',
  title: 'Similarity: the Geometry of Proportion',
  summary:
    'Foundation Mathematics 6\u2019s ratio and proportion return as geometry\u2019s scaling law. The Basic Proportionality (Thales) theorem proved, the similarity criteria (AA, SAS, SSS) built on it, and Pythagoras\u2019s theorem PROVED by similarity and again by areas — the theorem the reader has used since Foundation Mathematics is finally earned. Areas scale as the square of the ratio; volumes as the cube.',
  status: 'complete',
  lessons: [lessonGeo401, lessonGeo402, lessonGeo403, lessonGeo404],
  plannedLessons: [],
}
