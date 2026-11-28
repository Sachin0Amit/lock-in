import type { Lesson } from '../../../src/data/library/types'

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
  parts.push(geo54Txt(464, 70, '(3,9)', 11.5, c54.orange, 'start'))
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
  parts.push(geo54Txt(O[0] - 14, O[1] - 10, 'O', 12.5, c54.ink, 'end', '700'))
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
  parts.push(geo54Txt(W(1.2, 0)[0], W(1.2, 0)[1] + 48, '2.4 m', 11.5, c54.ink, 'middle'))
  parts.push(geo54Txt(92, 332, 'stake 1.7 m', 11.5, c54.mid))
  parts.push(geo54Txt(W(18, 12.75)[0] + 8, W(18, 12.75)[1] + 4, 'tree 12.75 m', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(W(18, 0)[0] + 6, O[1] + 26, 'shadow 18 m', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(320, 368, 'stake 1.7 m → tree 12.75 m: ONE machine, one k', 12.5, c54.teal))
  return geo54Svg(640, 452, aria, parts)
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
  parts.push(geo54Txt(322, 304, 'BC = 5', 11.5, c54.ink, 'start'))
  parts.push(geo54Txt(358, 372, 'BF = 1.8', 11.5, c54.teal, 'start'))
  parts.push(geo54Txt(292, 282, 'FC = 3.2', 11.5, c54.green, 'start'))
  parts.push(geo54Txt(283, 377, 'h = 2.4', 11.5, c54.orange, 'start'))
  parts.push(geo54Txt(196, 404, 'ABF: scale 0.6', 11.5, c54.teal, 'end'))
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
  parts.push(geo54Txt(160, 244, 'P (3,5)', 11.5, c54.ink, 'end'))
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