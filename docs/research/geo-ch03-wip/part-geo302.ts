import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c32 = {
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
const f32 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo32 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo32Txt = (
  x: number, y: number, s: string,
  size = 13, color = c32.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f32}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo32Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c32.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo32Dot = (x: number, y: number, color = c32.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo32Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, sw = 2, fo = 1,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${fo}" stroke="${stroke}" stroke-width="${sw}" rx="6"/>`

const geo32Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo32Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo32Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c32.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo32Line(x1, y1, x2, y2, color, w) + geo32Head(x2, y2, a, color, 8)
}

/** quadratic curve with an arrowhead aligned to the end tangent */
const geo32CurveArrow = (
  x1: number, y1: number, qx: number, qy: number, x2: number, y2: number,
  color = c32.orange, w = 2.4, dash = '',
): string => {
  const a = (Math.atan2(y2 - qy, x2 - qx) * 180) / Math.PI
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    geo32Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, negative = upward on screen) */
const geo32Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/** right-angle mark at a corner: screen corner point + two unit leg vectors */
const geo32RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c32.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo32Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ------------------------------------------------------------------ */
/* F1 — the SSA two-triangle construction: base BC = 10, swing side    */
/* BA = 7 at 30 degrees to the base LINE, both A positions with the    */
/* two third sides c1 and c2, both altitudes h = 3.5, both feet        */
/* ------------------------------------------------------------------ */
const geo32SSA = (o: { aria: string; title: string }): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 24, o.title, 13, c32.ink, 'middle', '700'))
  const s = 28, bx = 250, by = 330
  const off = 7 * Math.cos(Math.PI / 6) * s // 6.062178 units -> 169.7 px
  const h = 3.5 * s // 98 px
  const B: [number, number] = [bx, by]
  const C: [number, number] = [bx + 10 * s, by]
  const A1: [number, number] = [bx + off, by - h]
  const A2: [number, number] = [bx - off, by - h]
  parts.push(geo32Line(bx - 210, by, bx + 340, by, c32.ink, 2))
  parts.push(geo32Poly([B, C, A1], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Poly([B, C, A2], c32.orange, 0.08, c32.orange, 2.6, '7 5'))
  parts.push(geo32Line(A1[0], A1[1], A1[0], by, c32.teal, 1.6, '4 4'))
  parts.push(geo32Line(A2[0], A2[1], A2[0], by, c32.teal, 1.6, '4 4'))
  parts.push(geo32RA(A1[0], by, 1, 0, 0, -1, 10, c32.tealInk))
  parts.push(geo32RA(A2[0], by, 1, 0, 0, -1, 10, c32.tealInk))
  parts.push(geo32Dot(A1[0], by, c32.tealInk, 3.5))
  parts.push(geo32Dot(A2[0], by, c32.tealInk, 3.5))
  parts.push(geo32Arc(bx, by, 52, 0, -Math.PI / 6, c32.green, 2.4))
  parts.push(geo32Arc(bx, by, 34, 0, (-5 * Math.PI) / 6, c32.red, 2.4))
  parts.push(geo32Txt(318, 314, '30°', 12.5, c32.green))
  parts.push(geo32Txt(250, 292, '150°', 12.5, c32.red))
  parts.push(geo32Txt(360, 358, '10', 13, c32.amber))
  parts.push(geo32Txt(440, 358, '6.062178', 11.5, c32.tealInk))
  parts.push(geo32Txt(410, 288, 'h = 3.5', 12, c32.tealInk, 'end'))
  parts.push(geo32Txt(354, 268, '7', 13, c32.amber))
  parts.push(geo32Txt(150, 272, '7', 13, c32.amber))
  parts.push(geo32Txt(496, 316, 'c1 = 5.268438', 12, c32.amber, 'start'))
  parts.push(geo32Txt(290, 258, 'c2 = 16.439086', 12, c32.amber))
  parts.push(geo32Txt(240, 352, 'B', 13, c32.ink, 'end'))
  parts.push(geo32Txt(538, 350, 'C', 13, c32.ink, 'start'))
  parts.push(geo32Txt(419.7, 220, 'A', 13, c32.ink))
  parts.push(geo32Txt(80.3, 220, 'A′', 13, c32.orange))
  parts.push(geo32Txt(320, 396, 'sin 30° = sin 150° = 1/2 — the supplement fault', 12.5, c32.tealInk))
  parts.push(geo32Txt(320, 420, 'both triangles keep BA = 7 and BC = 10, heights both 3.5', 12, c32.tealInk))
  return geo32Svg(640, 440, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the criteria map: five green paths to congruence, two red      */
/* failures with their witnesses                                       */
/* ------------------------------------------------------------------ */
const geo32Map = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'THE CRITERIA MAP: FIVE GREEN PATHS, TWO RED', 13, c32.ink, 'middle', '700'))
  parts.push(geo32Txt(100, 46, 'CHECKPOINTS', 11.5, c32.tealInk, 'middle', '700'))
  parts.push(geo32Txt(244, 46, 'CRITERION', 11.5, c32.tealInk, 'middle', '700'))
  parts.push(geo32Txt(470, 46, 'VERDICT', 11.5, c32.tealInk, 'middle', '700'))
  const rows: Array<[string, string, string, boolean]> = [
    ['three side pairs', 'SSS', 'congruent — Euclid I.8 (via I.7)', true],
    ['2 sides + included angle', 'SAS', 'congruent — Euclid I.4 (superposition)', true],
    ['2 angles + included side', 'ASA', 'congruent — Euclid I.26', true],
    ['2 angles + any side', 'AAS', 'congruent — I.26 via the angle sum', true],
    ['right angle + hyp + leg', 'RHS', 'congruent — Pythagoras forces the leg', true],
    ['three angles', 'AAA', 'FAILS — equilateral side 1 vs side 2', false],
    ['2 sides + opposite angle', 'SSA', 'FAILS — the ambiguous case (two triangles)', false],
  ]
  rows.forEach((r, i) => {
    const y = 72 + i * 46
    parts.push(geo32Txt(14, y + 4, r[0], 11.5, c32.ink, 'start'))
    parts.push(geo32Rect(200, y - 16, 88, 30, r[3] ? c32.green : c32.red, r[3] ? c32.ink : c32.red, 2, r[3] ? 0.12 : 0.1))
    parts.push(geo32Txt(244, y + 5, r[1], 13, r[3] ? c32.ink : c32.red, 'middle', '700'))
    parts.push(geo32Arrow(292, y - 1, 303, y - 1, c32.amber, 1.8))
    parts.push(geo32Txt(309, y + 4, r[2], 11.5, r[3] ? c32.tealInk : c32.red, 'start'))
  })
  return geo32Svg(640, 380, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F3 — included versus opposite: the SAS panel and the SSA panel      */
/* side by side, the naming trap drawn                                 */
/* ------------------------------------------------------------------ */
const geo32Incl = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'INCLUDED VERSUS OPPOSITE: THE NAMING TRAP', 13, c32.ink, 'middle', '700'))
  parts.push(geo32Line(320, 40, 320, 372, c32.faint, 1.2, '4 4'))
  // LEFT panel — SAS: the angle at the shared vertex P of the named sides
  const P: [number, number] = [60, 300]
  const Q: [number, number] = [230, 300]
  const R: [number, number] = [60 + 150 * Math.cos((50 * Math.PI) / 180), 300 - 150 * Math.sin((50 * Math.PI) / 180)]
  parts.push(geo32Poly([P, Q, R], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Arc(60, 300, 40, 0, (-50 * Math.PI) / 180, c32.amber, 2.4))
  parts.push(geo32Txt(110, 277, '50°', 12.5, c32.amber))
  parts.push(geo32Txt(145, 322, '5', 13, c32.amber))
  parts.push(geo32Txt(98, 246, '7', 13, c32.amber, 'end'))
  parts.push(geo32Txt(206, 246, 'forced by SAS', 11.5, c32.tealInk, 'start'))
  parts.push(geo32Txt(52, 316, 'P', 13, c32.ink, 'end'))
  parts.push(geo32Txt(238, 316, 'Q', 13, c32.ink, 'start'))
  parts.push(geo32Txt(156, 174, 'R', 13, c32.ink))
  parts.push(geo32Txt(145, 64, 'sides 5 and 7 share the vertex P', 12, c32.tealInk))
  parts.push(geo32Txt(145, 86, 'the 50° angle sits AT P, between them', 12, c32.tealInk))
  parts.push(geo32Txt(145, 352, 'the angle is INCLUDED — SAS works', 12.5, c32.green, 'middle', '700'))
  // RIGHT panel — SSA: the angle at P is opposite the named side QR
  const P2: [number, number] = [380, 300]
  const Q2: [number, number] = [530, 300]
  const R2: [number, number] = [380 + 160 * Math.cos((40 * Math.PI) / 180), 300 - 160 * Math.sin((40 * Math.PI) / 180)]
  parts.push(geo32Poly([P2, Q2, R2], c32.orange, 0.08, c32.orange, 2.6))
  parts.push(geo32Arc(380, 300, 40, 0, (-40 * Math.PI) / 180, c32.red, 2.4))
  parts.push(geo32Txt(434, 282, '40°', 12.5, c32.red))
  parts.push(geo32Txt(455, 322, '5', 13, c32.amber))
  parts.push(geo32Txt(526, 252, '7', 13, c32.amber, 'start'))
  parts.push(geo32Txt(372, 316, 'P', 13, c32.ink, 'end'))
  parts.push(geo32Txt(538, 316, 'Q', 13, c32.ink, 'start'))
  parts.push(geo32Txt(512, 192, 'R', 13, c32.ink, 'start'))
  parts.push(geo32Txt(455, 64, 'sides 5 and 7 named; angle 40° at P', 12, c32.tealInk))
  parts.push(geo32Txt(455, 86, 'the 40° angle OPPOSES the side 7', 12, c32.red))
  parts.push(geo32Txt(455, 352, 'the angle is OPPOSITE — SSA fails', 12.5, c32.red, 'middle', '700'))
  return geo32Svg(640, 380, aria, parts)
}

/* ------------------------------------------------------------------ */
/* Illustration 1 figure — the correspondence-first proof drawn:       */
/* triangle ABC and triangle DCB with the A -> D arrow                 */
/* ------------------------------------------------------------------ */
const geo32Corr = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 24, 'ONE PROOF, CORRESPONDENCE FIRST', 13, c32.ink, 'middle', '700'))
  const B: [number, number] = [100, 340]
  const C: [number, number] = [300, 340]
  const A: [number, number] = [100 + 252 * Math.cos((55 * Math.PI) / 180), 340 - 252 * Math.sin((55 * Math.PI) / 180)]
  const C2: [number, number] = [380, 340]
  const B2: [number, number] = [580, 340]
  const D: [number, number] = [380 + 252 * Math.cos((55 * Math.PI) / 180), 340 - 252 * Math.sin((55 * Math.PI) / 180)]
  parts.push(geo32Poly([B, C, A], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Poly([C2, B2, D], c32.orange, 0.08, c32.orange, 2.6, '7 5'))
  parts.push(geo32Arc(100, 340, 34, 0, (-55 * Math.PI) / 180, c32.amber, 2.2))
  parts.push(geo32Arc(300, 340, 30, Math.PI, (75 * Math.PI) / 6, c32.amber, 2.2))
  parts.push(geo32Arc(380, 340, 34, 0, (-55 * Math.PI) / 180, c32.amber, 2.2))
  parts.push(geo32Arc(580, 340, 30, Math.PI, (75 * Math.PI) / 6, c32.amber, 2.2))
  parts.push(geo32Txt(143, 320, '55°', 12, c32.amber))
  parts.push(geo32Txt(265, 316, '75°', 12, c32.amber))
  parts.push(geo32Txt(423, 320, '55°', 12, c32.amber))
  parts.push(geo32Txt(545, 316, '75°', 12, c32.amber))
  parts.push(geo32CurveArrow(A[0] + 14, A[1] - 6, D[0] - 14, D[1] - 6, 384, 70, c32.orange, 2.4))
  parts.push(geo32Txt(384, 62, 'A → D', 12.5, c32.orange))
  parts.push(geo32Txt(230, 148, 'AB', 12.5, c32.tealInk))
  parts.push(geo32Txt(478, 148, 'DC', 12.5, c32.tealInk))
  parts.push(geo32Txt(200, 364, 'BC', 12.5, c32.tealInk))
  parts.push(geo32Txt(480, 364, 'CB', 12.5, c32.tealInk))
  parts.push(geo32Txt(244.5, 116, '∠BAC = 50°', 11.5, c32.ink))
  parts.push(geo32Txt(524.5, 116, '∠CDB = 50°', 11.5, c32.ink))
  parts.push(geo32Txt(230, 130, 'A', 13, c32.ink, 'end'))
  parts.push(geo32Txt(92, 356, 'B', 13, c32.ink, 'end'))
  parts.push(geo32Txt(308, 356, 'C', 13, c32.ink, 'start'))
  parts.push(geo32Txt(538, 130, 'D', 13, c32.ink, 'start'))
  parts.push(geo32Txt(372, 356, 'C', 13, c32.ink, 'end'))
  parts.push(geo32Txt(588, 356, 'B', 13, c32.ink, 'start'))
  parts.push(geo32Txt(320, 398, 'correspondence A → D, B → C, C → B — SAS on AB = DC, ∠ABC = ∠DCB, BC common', 12, c32.tealInk))
  parts.push(geo32Txt(320, 418, 'then ∠BAC = ∠CDB = 180 − 55 − 75 = 50°', 12, c32.tealInk))
  return geo32Svg(640, 436, aria, parts)
}

/* ------------------------------------------------------------------ */
/* Illustration 2 figure — the CLASSIC ambiguous case: A = 30°,        */
/* b = 7, a = 5; both B positions on the base line, both third sides   */
/* ------------------------------------------------------------------ */
const geo32Amb5 = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'THE CLASSIC AMBIGUOUS CASE: A = 30°, b = 7, a = 5', 13, c32.ink, 'middle', '700'))
  const s = 40, ax = 170, ay = 360
  const C: [number, number] = [ax + 7 * Math.cos(Math.PI / 6) * s, ay - 3.5 * s]
  const B1: [number, number] = [ax + 2.491464 * s, ay]
  const B2: [number, number] = [ax + 9.632892 * s, ay]
  const A: [number, number] = [ax, ay]
  parts.push(geo32Line(ax - 50, ay, ax + 440, ay, c32.ink, 2))
  parts.push(geo32Poly([A, B1, C], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Poly([A, B2, C], c32.orange, 0.08, c32.orange, 2.6, '7 5'))
  parts.push(geo32Arc(ax, ay, 44, 0, -Math.PI / 6, c32.amber, 2.4))
  parts.push(geo32Txt(228, 346, '30°', 12.5, c32.amber))
  parts.push(geo32Txt(282, 282, 'b = 7', 12, c32.amber, 'end'))
  parts.push(geo32Txt(318, 300, 'a = 5', 12, c32.amber, 'end'))
  parts.push(geo32Txt(496, 292, 'a = 5', 12, c32.amber, 'start'))
  parts.push(geo32Txt(205, 380, 'c1 = 2.491464', 12, c32.amber))
  parts.push(geo32Txt(363, 380, 'c2 = 9.632892', 12, c32.amber))
  parts.push(geo32Txt(158, 376, 'A', 13, c32.ink, 'end'))
  parts.push(geo32Txt(272, 380, 'B1', 12.5, c32.green, 'start'))
  parts.push(geo32Txt(556, 380, 'B2', 12.5, c32.orange, 'start'))
  parts.push(geo32Txt(422, 208, 'C', 13, c32.ink, 'start'))
  parts.push(geo32Txt(320, 416, 'both triangles keep the interior angle 30° at A and the side CB = 5', 12, c32.tealInk))
  parts.push(geo32Txt(320, 436, 'c is the pair of roots of c² − 7√3·c + 24 = 0', 12, c32.tealInk))
  return geo32Svg(640, 452, aria, parts)
}

/* ------------------------------------------------------------------ */
/* Illustration 3 figure — the identity read: one triangle with        */
/* angles 50, 60, 70 and the side a read twice (AAS and ASA)           */
/* ------------------------------------------------------------------ */
const geo32Ident = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'ONE DATA SET, TWO CERTIFICATES: AAS AND ASA', 13, c32.ink, 'middle', '700'))
  const B: [number, number] = [180, 340]
  const C: [number, number] = [420, 340]
  const A: [number, number] = [180 + 294.5 * Math.cos((60 * Math.PI) / 180), 340 - 294.5 * Math.sin((60 * Math.PI) / 180)]
  parts.push(geo32Poly([B, C, A], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Arc(180, 340, 36, 0, (-60 * Math.PI) / 180, c32.green, 2.2))
  parts.push(geo32Arc(420, 340, 36, Math.PI, (25 * Math.PI) / 18, c32.green, 2.2))
  parts.push(geo32Arc(A[0], A[1], 30, (70 * Math.PI) / 180, (120 * Math.PI) / 180, c32.red, 2.2))
  parts.push(geo32Txt(225, 314, '60°', 12, c32.green))
  parts.push(geo32Txt(377, 312, '70°', 12, c32.green))
  parts.push(geo32Txt(323, 130, '50°', 12, c32.red))
  parts.push(geo32Txt(240, 210, 'c', 13, c32.amber, 'end'))
  parts.push(geo32Txt(388, 210, 'b', 13, c32.amber, 'start'))
  parts.push(geo32Txt(327, 70, 'A', 13, c32.ink))
  parts.push(geo32Txt(168, 356, 'B', 13, c32.ink, 'end'))
  parts.push(geo32Txt(432, 356, 'C', 13, c32.ink, 'start'))
  parts.push(geo32Txt(300, 362, 'a = BC', 12.5, c32.amber))
  parts.push(geo32Txt(300, 388, 'AAS read: (A, B, a) — a opposite the 50° angle', 11.5, c32.red))
  parts.push(geo32Txt(300, 406, 'ASA read: (B, C, a) — a between the 60° and 70° angles', 11.5, c32.green))
  parts.push(geo32Txt(320, 432, '∠C = 180 − 50 − 60 = 70°, forced by the angle sum', 12, c32.tealInk))
  return geo32Svg(640, 448, aria, parts)
}

/* ------------------------------------------------------------------ */
/* Exercise 9 solution figure — the included-angle repair:             */
/* angles 40, 70, 70 with the side a between the two 70° angles        */
/* ------------------------------------------------------------------ */
const geo32Repair = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'THE INCLUDED-ANGLE REPAIR: AAS BECOMES ASA', 13, c32.ink, 'middle', '700'))
  const B: [number, number] = [205, 380]
  const C: [number, number] = [375, 380]
  const A: [number, number] = [290, 380 - 85 * Math.tan((70 * Math.PI) / 180)]
  parts.push(geo32Poly([B, C, A], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Arc(205, 380, 30, 0, (-70 * Math.PI) / 180, c32.green, 2.2))
  parts.push(geo32Arc(375, 380, 30, Math.PI, (25 * Math.PI) / 18, c32.green, 2.2))
  parts.push(geo32Arc(A[0], A[1], 28, (70 * Math.PI) / 180, (110 * Math.PI) / 180, c32.red, 2.2))
  parts.push(geo32Txt(243, 356, '70°', 12, c32.green))
  parts.push(geo32Txt(337, 356, '70°', 12, c32.green))
  parts.push(geo32Txt(290, 190, '40°', 12, c32.red))
  parts.push(geo32Txt(290, 402, 'a = BC', 12.5, c32.amber))
  parts.push(geo32Txt(290, 132, 'A', 13, c32.ink))
  parts.push(geo32Txt(193, 396, 'B', 13, c32.ink, 'end'))
  parts.push(geo32Txt(387, 396, 'C', 13, c32.ink, 'start'))
  parts.push(geo32Txt(290, 424, '∠B = 180 − 40 − 70 = 70° — found, not given', 11.5, c32.tealInk))
  parts.push(geo32Txt(290, 444, 'side a now sits BETWEEN ∠B and ∠C — the ASA read', 11.5, c32.green))
  return geo32Svg(640, 460, aria, parts)
}

/* ------------------------------------------------------------------ */
/* Exercise 10 solution figure — the RHS pair: two right triangles     */
/* with hypotenuse 13 and leg 5, legs swapped; the 5-12-12 contrast   */
/* ------------------------------------------------------------------ */
const geo32RHSpair = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo32Txt(320, 22, 'THE RHS PAIR: ONE LEG FORCED, BOTH TRIANGLES CLOSED', 13, c32.ink, 'middle', '700'))
  parts.push(geo32Poly([[80, 320], [140, 320], [80, 176]], c32.green, 0.1, c32.green, 2.6))
  parts.push(geo32Poly([[360, 320], [504, 320], [360, 260]], c32.orange, 0.08, c32.orange, 2.6))
  parts.push(geo32RA(80, 320, 1, 0, 0, -1, 14))
  parts.push(geo32RA(360, 320, 1, 0, 0, -1, 14))
  parts.push(geo32Txt(110, 340, '5', 13, c32.amber))
  parts.push(geo32Txt(60, 250, '12', 13, c32.amber, 'end'))
  parts.push(geo32Txt(124, 244, '13', 13, c32.amber, 'start'))
  parts.push(geo32Txt(432, 340, '12', 13, c32.amber))
  parts.push(geo32Txt(342, 292, '5', 13, c32.amber, 'end'))
  parts.push(geo32Txt(448, 286, '13', 13, c32.amber, 'start'))
  parts.push(geo32Txt(68, 336, 'P', 13, c32.ink, 'end'))
  parts.push(geo32Txt(148, 336, 'Q', 13, c32.ink, 'start'))
  parts.push(geo32Txt(70, 172, 'R', 13, c32.ink, 'end'))
  parts.push(geo32Txt(348, 336, 'P′', 13, c32.ink, 'end'))
  parts.push(geo32Txt(512, 336, 'Q′', 13, c32.ink, 'start'))
  parts.push(geo32Txt(350, 256, 'R′', 13, c32.ink, 'end'))
  parts.push(geo32Txt(320, 376, 'the missing leg is forced: √(169 − 25) = 12', 12, c32.tealInk))
  parts.push(geo32Txt(320, 398, 'hypotenuse 13 and leg 5 close both to the pair {5, 12, 13}', 11.5, c32.tealInk))
  parts.push(geo32Txt(320, 420, 'contrast: 5−12−12 is NOT this pair, since 169 ≠ 144', 11.5, c32.red))
  return geo32Svg(640, 440, aria, parts)
}

/* ================================================================== */
/* the lesson object                                                   */
/* ================================================================== */
export const lessonGeo302: Lesson = {
  id: 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
  number: '3.2',
  title: 'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS',
  concepts: ['SAS', 'ASA', 'AAS', 'SSS', 'RHS', 'included angle', 'the SSA failure', 'the AAA failure'],
  objectives: [
    'State each of the five congruence criteria formally and explain, in our own words, the classical argument behind it (superposition for SAS, the angle-sum repair for AAS, the squeeze for SSS, the Pythagoras closure for RHS)',
    'Name the criterion that licenses a given congruence, checking the included-angle discipline before writing any conclusion',
    'Refute AAA and SSA as criteria with the pinned witnesses (the equilateral pair side 1 vs side 2; the ambiguous case with third sides about 5.27 and 16.44)',
    'Repair angle-side data that arrives in the wrong shape: compute the missing angle by the angle sum and re-read the data as ASA or SAS',
    'Write two-triangle proofs correspondence-first: map named, criterion cited by name, conclusion licensed',
  ],
  prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size'],
  sources: ['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'cengage-m1-05', 'geo-ch03-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Why checking all six facts is overkill' },
    {
      kind: 'para',
      text: 'Lesson 3.1 settled what congruence means: two figures are congruent when some rigid motion \u2014 a slide, a turn, a flip, never a stretch \u2014 carries one onto the other so that they coincide exactly, point for point. For triangles that definition unpacks into six facts: three side equalities and three angle equalities. So the brute-force way to prove two triangles congruent is to verify all six facts, one at a time, and then appeal to the definition. It works. It is also wasteful, and geometry has never tolerated wasted work. A surveyor measuring two triangular plots does not measure everything; a machinist checking two stamped brackets does not check everything; an examiner marking a proof does not want six verifications where three will do. The question this lesson answers is precise: WHICH SUBSETS of the six facts already force all six?',
    },
    {
      kind: 'para',
      text: 'Call such a subset a checkpoint set: a collection of facts about a triangle which, when matched by a second triangle, leaves no room for the second triangle to differ. The analogy to treasure is honest \u2014 a checkpoint set pins the triangle down completely. Lesson 3.1 already met one: the SSS distance check, where the three side lengths alone matched the witness pair to a unique correspondence. But sides are not the only currency. Angles carry information too, and the game is to mix them: sides and angles, as few of each as possible. The answer, worked out over twenty-three centuries and drilled into every school syllabus since, is exactly five working combinations \u2014 SAS, ASA, AAS, SSS and RHS \u2014 and, crucially, two seductive combinations that DO NOT work: AAA and SSA. Five green doors and two doors painted green that open onto a drop.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The checkpoint doctrine',
      text: 'A congruence criterion is a minimal checkpoint set: a short list of matched facts (sides, angles, or the right mix) that FORCES every one of the six facts of the correspondence. Proving a criterion means showing that the remaining facts cannot escape; refuting a fake criterion means exhibiting two triangles that pass the checkpoints yet differ \u2014 a witness pair. This lesson certifies five criteria and executes two impostors, each by witness. The discipline throughout: a criterion is a licence, and every licence is signed with a name \u2014 you must be able to say WHICH criterion you used and WHY its shape fits your data.',
    },
    {
      kind: 'para',
      text: 'Why exactly five letters, and why do the two impostors earn a whole section of their own? Because the impostors are not rare accidents \u2014 they are the two most tempting shortcuts in the subject. AAA feels right because angles determine shape; the witness (an equilateral triangle of side 1 against an equilateral triangle of side 2 \u2014 sixty degrees at every corner in both, sides in ratio 1 to 2) kills it in one line and hands us, free of charge, the correct word for what AAA does guarantee: similarity, the subject of chapter 4. SSA feels right because it looks like SAS with the letters shuffled; the witness (a thirty-degree angle, sides 7 and 10 \u2014 satisfied by TWO different triangles) is subtler, and we will build both triangles with our own hands. Between the certificates and the executions sits the lesson\u2019s central trap, purely a matter of naming: SAS demands the angle INCLUDED between the two sides; SSA has the angle OPPOSITE one of them. One preposition is the whole difference between a theorem and a falsehood.',
    },
    {
      kind: 'para',
      text: 'The route map, in order. First the five criteria, each stated formally and each justified \u2014 SAS by superposition (Euclid\u2019s own instrument from I.4), ASA and AAS as one criterion worn twice (I.26 plus the angle sum of lesson 2.4), SSS by the two-triangle squeeze (I.8 leaning on I.7), and RHS by the Pythagoras closure, which is why a criterion shaped like SSA survives when the angle is a right angle. Then the two failures with their witnesses. Then the included-angle discipline and the repair move that turns bad-shaped data into good-shaped data. Then the criteria map \u2014 one table, one diagram, seven rows, five green and two red. Then three worked chains in the Cengage manner, the collected formula cards, the exam corner, the quiz and the drill. Throughout, the engine has recomputed every number we print; where a decimal appears, it was earned.',
    },
    /* -------------------------------------------------------------- */
    /* 2. the five criteria, stated and justified                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The five criteria that work' },
    {
      kind: 'para',
      text: 'Notation first, because the whole lesson leans on it. In triangle $ABC$, side $a = BC$ is the side opposite $A$, side $b = CA$ opposite $B$, side $c = AB$ opposite $C$ \u2014 the lowercase letter answers the uppercase vertex. An angle is INCLUDED between two sides when it sits at their shared vertex, the corner where the two sides actually meet; that is the only place an angle can be said to lie between sides at all. With those two conventions the five criteria can be stated without a single ambiguity, and the two impostors can be named as exactly the shapes that violate the included-angle discipline. We take the five in the order the classical proofs make natural: SAS first, because Euclid proves it first and because everything else in the chapter quietly borrows its superposition instrument.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'SAS \u2014 side-angle-side (Euclid I.4)',
      text: 'If two sides of one triangle are equal to two sides of another, and the angles INCLUDED between those pairs of sides are equal, then the triangles are congruent: in symbols, $AB = A\u2032B\u2032$, $BC = B\u2032C\u2032$ and $\angle B = \angle B\u2032$ imply $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$ \u2014 provided the angle $\angle B$ sits at the vertex shared by the sides $AB$ and $BC$, and likewise for the primed copy. All six facts of the correspondence follow from these three.',
    },
    {
      kind: 'para',
      text: 'Why it works is Euclid\u2019s own argument, restated in our own words: lift the first triangle and place it on the second so that the equal sides and the included angle land on their partners \u2014 the superposition move of lesson 3.1. Once the two sides and the angle between them coincide, the third vertex has nowhere else to go: it is pinned at the far end of the second side, and the third sides must then coincide as well, because two straight lines cannot share two endpoints without being the same line. The full derivation is written out below. The criterion is honest about its demand, and the demand is positional: the angle must be the one BETWEEN the named sides \u2014 at their shared vertex \u2014 not merely any angle in the triangle. Hold that thought; it is the hinge of the whole lesson.',
    },
    {
      kind: 'derivation',
      title: 'Why SAS works: the superposition argument',
      statement: 'Suppose $AB = A\u2032B\u2032$, $\angle B = \angle B\u2032$ and $BC = B\u2032C\u2032$, with each angle included between its two sides. Then $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$: every remaining fact follows from the three given.',
      steps: [
        {
          label: 'Place the first vertex pair',
          explanation: 'Slide and turn the plane (rigid motions, lesson 3.1) so that $B$ lands on $B\u2032$ and the ray $BA$ lands along the ray $B\u2032A\u2032$. Nothing is stretched, so lengths and angles survive the trip intact.',
        },
        {
          label: 'Land the first side',
          formula: 'AB = A\u2032B\u2032 \\;\\Rightarrow\\; A \\text{ lands on } A\u2032',
          explanation: 'Since $AB = A\u2032B\u2032$, the point $A$ cannot overshoot or undershoot its partner: it lands exactly on $A\u2032$. One vertex pair and one full side now coincide.',
        },
        {
          label: 'Ride the included angle',
          formula: '\\angle B = \\angle B\u2032 \\;\\Rightarrow\\; \\text{ray } BC \\text{ lies along ray } B\u2032C\u2032',
          explanation: 'The angle at $B$ was placed on the equal angle at $B\u2032$, so the second ray has no freedom: the ray $BC$ lies exactly along the ray $B\u2032C\u2032$. This step is where inclusion earns its keep \u2014 the angle must be the one at the shared vertex for the ray to be pinned.',
        },
        {
          label: 'Land the second vertex',
          formula: 'BC = B\u2032C\u2032 \\;\\Rightarrow\\; C \\text{ lands on } C\u2032',
          explanation: 'Along the pinned ray, the equal length $BC = B\u2032C\u2032$ forces $C$ to land exactly on $C\u2032$. Now two vertices and two sides coincide.',
        },
        {
          label: 'The third side closes',
          formula: 'CA = C\u2032A\u2032 \\text{ and the angles at } A, C \\text{ follow}',
          explanation: 'Two distinct points determine exactly one straight segment, so the third sides coincide; and with all three vertices paired, the angles at $A$ and $C$ coincide with their partners. All six facts hold \u2014 which is the definition of congruence.',
        },
      ],
      result: 'SAS is a genuine criterion: two sides and the angle included between them form a checkpoint set \u2014 Euclid I.4, by superposition.',
    },
    {
      kind: 'para',
      text: 'A concrete witness, built twice. Take the SAS data \u201csides 6 and 8 enclosing a right angle\u201d and build it with the 6 along the horizontal arm and the 8 along the vertical arm: vertices $(0, 0)$, $(6, 0)$, $(0, 8)$, third side $\sqrt{36 + 64} = 10$. Now swap the roles \u2014 8 along the horizontal, 6 along the vertical: vertices $(0, 0)$, $(8, 0)$, $(0, 6)$, and the third side is $\sqrt{64 + 36} = 10$ again. The two builds share the side multiset $\{6, 8, 10\}$ (the engine confirms both closures), and the correspondence $A \to A$, $B \to C$, $C \to B$ \u2014 realized by the reflection across $y = x$, lesson 3.1\u2019s mirror witness \u2014 carries one onto the other. The data had three numbers in it; the triangle came out with all six facts fixed. That is what a checkpoint set does, and it is why SAS is worth memorising as a shape, not just as an acronym.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'ASA \u2014 angle-side-angle (Euclid I.26, first half)',
      text: 'If one side of a triangle and the two angles ADJACENT to it (at its two endpoints) are equal to the corresponding side and adjacent angles of another triangle, the triangles are congruent: $\angle A = \angle A\u2032$, $AB = A\u2032B\u2032$ and $\angle B = \angle B\u2032$ imply $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$. Here the side is included between the two angles \u2014 the mirror image of SAS\u2019s demand.',
    },
    {
      kind: 'para',
      text: 'The proof idea, in our own words: lay the equal side on the equal side; at each endpoint, the equal adjacent angle pins the direction of the second side, so both remaining sides are rays with fixed starts and fixed directions; equal rays from two fixed endpoints meet in exactly one point, so the third vertex is forced and with it the third side and the third angle. Euclid proves this as the first half of I.26, and the proposition is deliberately doubled \u2014 the same proposition carries ASA and AAS together, which is the next stop. The pinned closure worth remembering: given $\angle B = 30^\circ$ and $\angle C = 60^\circ$ on a fixed side, the angle sum forces $\angle A = 180 - 30 - 60 = 90^\circ$, and the triangle closes as the half-equilateral with sides $1$, $\sqrt{3}$, $2$ \u2014 the engine checks $1^2 + (\sqrt{3})^2 = 4 = 2^2$ and the common sine ratio $2$. The angles were never three independent facts; two of them carry the third.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'AAS \u2014 angle-angle-side (Euclid I.26, second half)',
      text: 'If two angles of one triangle equal two angles of another, and ANY corresponding side of one equals the corresponding side of the other (included or not), the triangles are congruent: for instance $\angle A = \angle A\u2032$, $\angle B = \angle B\u2032$ and $BC = B\u2032C\u2032$ imply $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$ \u2014 even though the side $BC$ sits opposite the angle $A$, not between the two given angles.',
    },
    {
      kind: 'derivation',
      title: 'Why AAS works: one criterion worn twice',
      statement: 'The AAS data (two angles and a non-included side) carries exactly the same information as an ASA certificate on the same triangle: the angle sum converts one into the other.',
      steps: [
        {
          label: 'Count the freedom',
          explanation: 'A triangle\u2019s angles sum to $180^\circ$ (lesson 2.4, Euclid I.32). Given two angles, the third is not data \u2014 it is arithmetic: $\angle C = 180^\circ - \angle A - \angle B$.',
        },
        {
          label: 'Force the third angle',
          formula: '\\angle A = 50^\circ,\\ \\angle B = 60^\circ \\;\\Rightarrow\\; \\angle C = 70^\circ',
          explanation: 'The pair $(50^\circ, 60^\circ)$ pins $\angle C = 70^\circ$ in every triangle that carries it \u2014 the engine\u2019s closure check. No measurement of $\angle C$ is ever needed.',
        },
        {
          label: 'Re-read the side\u2019s position',
          formula: '(A, B, a) \\;\\longrightarrow\\; (B, C, a)',
          explanation: 'The side $a = BC$ was \u201cnon-included\u201d relative to the given pair $(A, B)$, because $\angle A$ sits away from it. But relative to the FOUND pair $(B, C)$, the side $a$ is exactly the included side \u2014 its endpoints are $B$ and $C$, the two vertices of the found angles.',
        },
        {
          label: 'Invoke ASA',
          explanation: 'The data \u201ctwo angles and the side between them\u201d is now on the table, and ASA (I.26, first half) finishes the job. The AAS certificate and the ASA certificate are the same three facts read in two orders \u2014 one criterion worn twice.',
        },
      ],
      result: 'AAS is ASA in disguise: the angle sum is the disguise\u2019s seam. Whenever an exam data set arrives as AAS, repair it to ASA in one line and cite ASA\u2019s proposition.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'SSS \u2014 side-side-side (Euclid I.8)',
      text: 'If the three sides of one triangle are equal to the three sides of another, correspondingly, then the triangles are congruent: $a = a\u2032$, $b = b\u2032$ and $c = c\u2032$ imply $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$. Lesson 3.1 ran this as the SSS distance check on the witness pair; here it enters the roster as a certified criterion.',
    },
    {
      kind: 'para',
      text: 'The justification deserves honesty rather than hand-waving, because SSS is the one criterion whose classical proof does NOT run by naive superposition \u2014 you cannot \u201clay three sides on three sides\u201d the way you lay two sides and their angle. Euclid\u2019s route is I.8, and it leans on the lemma I.7. In our own words: I.7 says that on a given side of a given base, with the two side lengths fixed, there is only ONE point where the two sides can meet \u2014 the apex cannot wander. I.8 then argues by flipping: place the second triangle on the opposite side of a shared base; the segment joining the two apices meets the base, and the two triangles this creates are isosceles twice over, which forces the base angles of the original triangles to match; repeat the flip about a different side and every angle is pinned. The skeleton matters less than the moral: the three lengths squeeze the triangle so hard that no corner can move. We state the squeeze, credit the I.7 lemma, and use the criterion freely \u2014 the engine has verified it by brute force on the witness pair of lesson 3.1, where the multiset $\{6, 8, 10\}$ matched the pair to a unique correspondence.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'RHS \u2014 right angle, hypotenuse, side (the right-triangle criterion)',
      text: 'If the hypotenuse and one leg of a right triangle are equal to the hypotenuse and one leg of another right triangle, the triangles are congruent: right angle, $13 = 13$ on the hypotenuses and $5 = 5$ on one leg of each imply congruence. The other leg is not data \u2014 it is forced: $x = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = 12$, a unique length, so the pair closes to $\{5, 12, 13\}$ on both sides and SSS finishes the argument.',
    },
    {
      kind: 'derivation',
      title: 'Why RHS works: the Pythagoras closure',
      statement: 'In a right triangle, the hypotenuse $h$ and one leg $p$ force the other leg: $q = \sqrt{h^2 - p^2}$ is a single positive number, so a right triangle is determined by $(h, p)$ up to congruence.',
      steps: [
        {
          label: 'Write the constraint',
          formula: 'p^2 + q^2 = h^2',
          explanation: 'Pythagoras (chapter 2, already banked) ties the three sides of every right triangle: the squares of the legs sum to the square of the hypotenuse.',
        },
        {
          label: 'Solve for the missing leg',
          formula: 'q^2 = h^2 - p^2 = 169 - 25 = 144',
          explanation: 'With $h = 13$ and $p = 5$ given, the equation has one unknown. Its square is $144$ \u2014 a fixed number, not a choice.',
        },
        {
          label: 'Take the unique positive root',
          formula: 'q = \sqrt{144} = 12',
          explanation: 'A length must be positive, so the negative root is discarded as a number with no geometric meaning: the leg is $12$, exactly, in every triangle carrying the data. Uniqueness is the whole point \u2014 there is no second value for the leg to take.',
        },
        {
          label: 'Finish by SSS',
          explanation: 'Both triangles now have side multiset $\{5, 12, 13\}$, and the SSS criterion (I.8) certifies the congruence. RHS is thus SSS in disguise, with Pythagoras doing the disguise\u2019s zip.',
        },
      ],
      result: 'RHS holds: right angle + hypotenuse + one leg is a checkpoint set, because $\sqrt{h^2 - p^2}$ is a unique length. The school name RHS (right-angle-hypotenuse-side) is the NCERT Class 7 convention; the substance is classical.',
    },
    {
      kind: 'para',
      text: 'One more observation before the failures, and it is the sharpest one in the lesson: LOOK AT RHS\u2019S SHAPE. The right angle is opposite the hypotenuse \u2014 not between the hypotenuse and the named leg. Structurally, RHS is SSA-shaped data: an angle opposite one of the two named sides, exactly the shape we are about to execute. It works anyway, and the reason is worth saying out loud: the angle is not just any angle, it is a RIGHT angle, and Pythagoras converts the freedom that normally dooms SSA (two possible third sides) into a single forced length $\sqrt{h^2 - p^2}$. RHS is the one SSA-shaped exception that survives, and it survives for a reason you can compute. This is also why the criterion is a genuine shortcut on right triangles: name the right angle, match hypotenuse and one leg, and you never touch the second leg at all \u2014 it closes itself.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Where the five come from',
      text: 'Euclid\u2019s Elements, Book I: SAS is I.4, proved by superposition \u2014 the move some later geometers frowned on as a physical act smuggled into a logical proof, though school mathematics never stopped using it. ASA and AAS live together in I.26, one proposition carrying both halves (Euclid states them for equal angles and equal sides without our acronyms, which are school-book shorthand). SSS is I.8, and its proof leans on I.7, the lemma that pins the apex \u2014 a rare case of Euclid proving a criterion by an auxiliary construction rather than direct placement. RHS is the young one in naming only: the fact itself is Pythagoras plus SSS, and the acronym (right-angle-hypotenuse-side) is the NCERT Class 7 convention that Indian school mathematics has worn for decades. We restate all of these in our own words; the propositions are the banked ground, the phrasing is ours.',
    },
    /* -------------------------------------------------------------- */
    /* 3. the two failures — the lesson's heart                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The two failures: AAA and SSA' },
    {
      kind: 'para',
      text: 'Now the executions, and let us be clear about what an execution requires: not a feeling that a shortcut is risky, but a WITNESS \u2014 two genuine triangles that pass the shortcut\u2019s checkpoints and yet are not congruent. A single witness kills a criterion forever, because a criterion is a universal claim. Both impostors die by witness in this section, and both witnesses are worth carrying into an exam room in your head.',
    },
    {
      kind: 'para',
      text: 'AAA first, because it dies fastest. Take an equilateral triangle of side 1 and an equilateral triangle of side 2. Every angle in the first is $60^\circ$; every angle in the second is $60^\circ$; the two triangles therefore match on ALL THREE ANGLES \u2014 the AAA checkpoints pass completely. Are they congruent? No: a side of one is 1 and the corresponding side of the other is 2, and no rigid motion \u2014 which never stretches \u2014 can carry a segment of length 1 onto a segment of length 2. The perimeters disagree ($3$ against $6$), the areas disagree ($\sqrt{3}/4 \approx 0.433013$ against $\sqrt{3} \approx 1.732051$, a ratio of exactly $4$), and even the heights disagree ($\sqrt{3}/2 \approx 0.866025$ against $\sqrt{3}$). Equal angles fix the SHAPE of a triangle and say nothing \u2014 not one thing \u2014 about its SIZE.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'AAA is not a congruence criterion',
      text: 'The equilateral pair (side 1 vs side 2) is the pinned witness: three equal angles, unequal sides, no congruence. The fault is not an accident of equilaterals \u2014 at ANY scale factor $k \\ne 1$ the two triangles still share all angles and still fail all sides (the engine checks $k = 2, 3, 0.5, 10$). What AAA actually guarantees has a name: SIMILARITY \u2014 same shape, allowed different size \u2014 and that relation is the entire subject of chapter 4. This lesson names the door and defers walking through it: AAA is chapter 4\u2019s doorstep, not chapter 3\u2019s tool.',
    },
    {
      kind: 'para',
      text: 'SSA dies more slowly, and the manner of its death is the most instructive construction in elementary geometry. The data: at a point $B$, an angle of $30^\circ$ opening from a base line; along the upper arm of that angle, a swing side of length $7$; along the base line itself, a side of length $10$ reaching to $C$. So far this is exactly SAS-shaped \u2014 two sides and an angle \u2014 but look at where the angle sits: it is at $B$, between the swing side $BA$ and the base side $BC$ in one reading, yet the letter-shaped description \u201ctwo sides and an angle opposite one of them\u201d is what SSA names, as the next section drills. Drop the altitude from the swing side\u2019s endpoint: its height is $h = 7 \sin 30^\circ = 3.5$, and its foot sits $7 \cos 30^\circ = 7\sqrt{3}/2 \approx 6.062178$ from $B$ along the base line. Now swing the length-7 side about $B$: its endpoint traces a circle of radius 7, and every point of that circle at height $3.5$ is a legal resting place for $A$. There are TWO such points \u2014 one with its foot inside the span $BC$, one with its foot on the far side of $B$ \u2014 and they are different points.',
    },
    {
      kind: 'para',
      text: 'Two legal resting places means TWO TRIANGLES on one data set, and Figure 1 draws both on the same base: triangle $ABC$ with the foot of the altitude between $B$ and $C$, and triangle $A\u2032BC$ with the foot beyond $B$. Count what each triangle keeps: the swing side $BA = BA\u2032 = 7$, the base $BC = 10$, the angle at $B$ made with the base LINE equal to $30^\circ$ in both constructions. The third sides are the killers. For the first triangle, $c_1 = \sqrt{(10 - 6.062178)^2 + 3.5^2} = \sqrt{149 - 70\sqrt{3}} \approx 5.268438$. For the second, $c_2 = \sqrt{(10 + 6.062178)^2 + 3.5^2} = \sqrt{149 + 70\sqrt{3}} \approx 16.439086$. One data set, third sides $5.268438$ and $16.439086$: the triangles are visibly, wildly different, and the engine has recomputed both values by trigonometry AND by coordinates before we dared print them.',
    },
    {
      kind: 'figure',
      caption: 'Figure 1 \u2014 the SSA two-triangle construction: the same base BC = 10, the same swing side of 7 from B, the same 30-degree opening from the base line \u2014 and two distinct triangles, with third sides c1 \u2248 5.268438 (foot of the altitude between B and C) and c2 \u2248 16.439086 (foot beyond B). Both altitudes have height h = 3.5 and foot offset 6.062178; the interior angle at B reads 30 degrees in one triangle and its supplement 150 degrees in the other.',
      svg: geo32SSA({
        aria: 'SSA ambiguous case construction: two triangles share the base BC of length 10 and a side of length 7 from B making thirty degrees with the base line; the first triangle has third side about 5.27 with altitude height 3.5 and foot offset 6.06, the second has third side about 16.44 with the foot beyond B, and the angles at B read thirty and one hundred fifty degrees.',
        title: 'THE SSA DATA SET: TWO TRIANGLES, ONE BASE',
      }),
    },
    {
      kind: 'table',
      caption: 'The ambiguous-case witness, every number recomputed by the engine (trig and coordinate routes agree)',
      head: ['Quantity', 'Value', 'What it says'],
      rows: [
        ['altitude of the swing endpoint, $7 \\sin 30^\\circ$', '$h = 3.5$', 'the ceiling both A-positions share'],
        ['foot offset from $B$, $7 \\cos 30^\\circ = 7\\sqrt{3}/2$', '$\\approx 6.062178$', 'where the altitude meets the base line'],
        ['third side, foot inside', '$\\sqrt{149 - 70\\sqrt{3}} \\approx 5.268438$', 'shorter than the base \u2014 a fat triangle'],
        ['third side, foot beyond $B$', '$\\sqrt{149 + 70\\sqrt{3}} \\approx 16.439086$', 'longer than base and swing combined \u2014 a thin triangle'],
        ['the interior angles at $B$', '$30^\\circ$ and $150^\\circ$', '$\\sin 30^\\circ = \\sin 150^\\circ = 1/2$ \u2014 the supplement fault'],
        ['the pinned ordering', '$3.5 < 7 < 10$', 'the altitude is shortest, the base side longest'],
      ],
    },
    {
      kind: 'para',
      text: 'Honesty time, because the figure deserves a careful sentence and the engine insists on it. In the DRAWN pair, the interior angle at $B$ reads $30^\circ$ in the fat triangle and $150^\circ$ in the thin one \u2014 the two triangles share the angle\u2019s SINE, not the angle itself, and $\sin 30^\circ = \sin 150^\circ = 1/2$ is the exact fault line that the law of sines exposes in every SSA data set. Read the labels LITERALLY \u2014 interior angle $A = 30^\circ$ with the adjacent side $b = 7$ and the opposite side $a = 10$ \u2014 and the data has in fact a UNIQUE solution, because $a = 10 > b = 7$ leaves no room for a second interior fit: the law of cosines quadratic $c^2 - 7\sqrt{3} \\cdot c - 51 = 0$ has one positive root, $c = (7\\sqrt{3} + \\sqrt{351})/2 \\approx 15.429675$. The classic TWO-interior-solution ambiguity needs the opposite side strictly between the altitude and the adjacent side \u2014 the window $b \\sin A < a < b$ \u2014 and the cleanest way to see it is to keep $A = 30^\circ$ and $b = 7$ but shrink the opposite side to $a = 5$: now $3.5 < 5 < 7$, the quadratic becomes $c^2 - 7\\sqrt{3} \\cdot c + 24 = 0$, and BOTH roots are positive: $c = (7\\sqrt{3} \\pm \\sqrt{51})/2 \\approx 2.491464$ or $9.632892$. Two triangles, the same interior angle $30^\circ$ at $A$ in each, the same $b = 7$, the same $a = 5$ \u2014 the genuine ambiguous case, and Illustration 2 below walks it end to end.',
    },
    {
      kind: 'table',
      caption: 'The SSA regime census at A = 30 degrees, b = 7, with the opposite side a sweeping the line \u2014 the engine counts triangles at each stop',
      head: ['The opposite side $a$', 'Position', 'Triangles', 'What happens'],
      rows: [
        ['$a = 3$', 'below the altitude ($3 < 3.5$)', 'none', 'the circle misses the base line entirely \u2014 discriminant $147 - 160 = -13 < 0$'],
        ['$a = 3.5$', 'exactly the altitude ($a = h$)', 'one', 'the circle just touches the line: the double root $c = 6.062178$, a right triangle'],
        ['$a = 5$', 'strictly between ($3.5 < 5 < 7$)', 'TWO', 'the ambiguous window: roots $\u2248 2.491464$ and $9.632892$, sum $7\\sqrt{3}$, product $24$'],
        ['$a = 7$', 'equal to the adjacent side ($a = b$)', 'one', 'the isosceles merge: roots $0$ (degenerate) and $7\\sqrt{3} \\approx 12.124356$'],
        ['$a = 10$', 'beyond the adjacent side ($a > b$)', 'one', 'the long-side regime: unique root $\u2248 15.429675$, no interior ambiguity'],
      ],
    },
    {
      kind: 'para',
      text: 'The census is the honest general condition, stated as a remark rather than a theorem: with $A$ acute, the SSA data $(A, b, a)$ builds no triangle when $a < b \sin A$, exactly one right triangle when $a = b \sin A$, two distinct triangles when $b \sin A < a < b$, and one again when $a \\ge b$. And when the given angle is right or obtuse the ambiguity vanishes altogether \u2014 the supplement of an obtuse angle cannot fit beside it inside $180^\circ$ \u2014 which is precisely the doorway RHS walks through. We do not ask you to memorise the regime for this lesson\u2019s exam; we ask you to remember the two-line summary: SSA is not a criterion because its data can be worn by two different triangles, and the window where that happens is $b \sin A < a < b$.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'SSA is not a congruence criterion',
      text: 'The pinned witness: a $30^\\circ$ opening at $B$, swing side $7$, base side $10$ \u2014 satisfied by a fat triangle with third side $\\approx 5.268438$ and a thin one with third side $\\approx 16.439086$. The engine recomputed both by trigonometry ($\\sqrt{149 \\mp 70\\sqrt{3}}$) and by coordinates ($\\sqrt{(10 \\mp 6.062178)^2 + 3.5^2}$), and the two routes agree. In multiple-choice papers, \u201cSSA\u201d and its alias \u201cASS\u201d are the standard distractor options: data shaped like two-sides-and-an-angle is congruence-certifying ONLY when the angle is included (SAS) or right (RHS).',
    },
    /* -------------------------------------------------------------- */
    /* 4. the included-angle discipline                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The included-angle discipline: one preposition decides' },
    {
      kind: 'para',
      text: 'Here is the trap in its purest form, drawn in Figure 3. On the left: two sides named, $PQ = 5$ and $PR = 7$, and an angle of $50^\circ$ at $P$ \u2014 the vertex where those two sides MEET. That angle is included between the named sides, the data is SAS, and the third side is forced (the engine\u2019s two-build witness showed the forcing concretely: the 6-8-10 pair). On the right: two sides named, $PQ = 5$ and $QR = 7$, and an angle of $40^\circ$ at $P$ \u2014 a vertex where only ONE of the named sides lives. The angle is opposite the side $QR$; it is NOT included; the data is SSA, and the previous section\u2019s two triangles are what that freedom becomes. Same letters on the page, same count of sides and angles \u2014 three facts each \u2014 and one preposition separates a theorem from a falsehood. This is why examiners write \u201cthe angle INCLUDED between\u201d with ritual care, and why you should read every data set with a finger on the vertex: WHERE does the angle sit?',
    },
    {
      kind: 'figure',
      caption: 'Figure 3 \u2014 the included-angle discipline side by side: on the left the SAS shape, where the named sides 5 and 7 share the vertex P and the 50-degree angle sits exactly there, included between them; on the right the SSA shape, where the named sides 5 and 7 do not share the angle\u2019s vertex \u2014 the 40-degree angle at P lies opposite the side QR. Included certifies; opposite does not.',
      svg: geo32Incl('Two triangles side by side: the left one with sides five and seven meeting at P where a fifty-degree angle is marked between them, labelled the SAS shape where the angle is included; the right one with sides five and seven where the forty-degree angle at P is opposite the side seven, labelled the SSA shape where the angle is opposite and fails.'),
    },
    {
      kind: 'para',
      text: 'The discipline in three questions, asked of every alleged criterion before you sign its name. ONE \u2014 which sides are named? TWO \u2014 where is the angle: at the shared vertex of those sides (included), at an endpoint of just one of them (adjacent to one, opposite the other), or nowhere near either? THREE \u2014 does the shape on the table match one of the five certificates? Two sides plus their included angle: SAS. Two sides plus an angle opposite one of them: SSA \u2014 stop, unless the angle is a right angle and the sides are hypotenuse and leg, which is RHS. One side plus the two angles at its endpoints: ASA. Two angles plus any side: AAS, repairable to ASA by the angle sum in one line. Three sides: SSS. Three angles: AAA \u2014 stop entirely; that is similarity, not congruence.',
    },
    {
      kind: 'para',
      text: 'And when the data arrives in the WRONG shape \u2014 an angle opposite a named side, no inclusion anywhere \u2014 there is a repair move worth its weight in marks, and Exercise 9 and the illustration below both run it. Step one: find the missing angle by the angle sum, $180^\circ$ minus the two known angles. Step two: re-read the side\u2019s position relative to the NEW pair of angles \u2014 a side that was opposite a given angle is very often included between a given angle and a found one. Step three: cite the criterion the data has BECOME (usually ASA, sometimes SAS), never the shape it arrived in. The repair never adds information \u2014 the angle sum is arithmetic, not measurement \u2014 it only re-clothes information you already owned. What it buys is a licensed conclusion in place of a shrug.',
    },
    /* -------------------------------------------------------------- */
    /* 5. the criteria map                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The criteria map: five green paths, two red' },
    {
      kind: 'para',
      text: 'Everything this lesson has certified and executed now goes on one page. The table below is the revision sheet: seven rows, five green and two red, each green row carrying the classical proposition that signs it and each red row carrying the witness that kills it. Figure 2 draws the same map as paths \u2014 checkpoint sets flowing into verdicts \u2014 because the visual grammar (green path, red path) is exactly the grammar an examiner\u2019s mark scheme uses: a correct citation walks a green path; a distractor walks off a cliff.',
    },
    {
      kind: 'table',
      caption: 'The criteria map \u2014 five certified paths and two executed impostors; the Criterion column is the name you must cite',
      head: ['Criterion', 'The checkpoints it names', 'Backing', 'Verdict'],
      rows: [
        ['SAS', 'two sides and the angle INCLUDED between them (at their shared vertex)', 'Euclid I.4, by superposition', 'congruent'],
        ['ASA', 'two angles and the side INCLUDED between them (at their shared endpoints)', 'Euclid I.26, first half', 'congruent'],
        ['AAS', 'two angles and ANY corresponding side', 'Euclid I.26, second half, via the angle sum', 'congruent \u2014 ASA worn twice'],
        ['SSS', 'three sides', 'Euclid I.8, via the I.7 apex lemma', 'congruent'],
        ['RHS', 'right angle, hypotenuse, one leg', 'Pythagoras: the other leg $\sqrt{h^2 - p^2}$ is unique', 'congruent \u2014 the SSA-shaped exception'],
        ['AAA', 'three angles', 'no proposition \u2014 the equilateral witness, side 1 vs side 2', 'NOT a criterion \u2014 similarity instead'],
        ['SSA', 'two sides and an angle OPPOSITE one of them', 'no proposition \u2014 the ambiguous case, two triangles on one data set', 'NOT a criterion \u2014 the ambiguous window $b \\sin A < a < b$'],
      ],
    },
    {
      kind: 'figure',
      caption: 'Figure 2 \u2014 the criteria map as paths: five green checkpoint sets (SSS, SAS, ASA, AAS, RHS) flowing to congruence, each signed by its backing proposition (I.8, I.4, I.26, I.26-via-angle-sum, Pythagoras); two red sets (AAA with the equilateral witness side 1 vs side 2, SSA with the ambiguous case) ending in failure.',
      svg: geo32Map('A flow map of congruence criteria: seven rows from checkpoint sets through criterion boxes to verdicts; the five green rows SSS, SAS, ASA, AAS and RHS end in congruence with their Euclid or Pythagoras backing named, and the two red rows AAA and SSA end in failure with their witnesses named.'),
    },
    {
      kind: 'para',
      text: 'Read the map the way an examiner writes it. Every green row is a LICENCE: if your two triangles match the checkpoints of that row, in the correspondence you have named, you may write the congruence and cite the row\u2019s name \u2014 \u201cby SAS\u201d, \u201cby RHS\u201d \u2014 and nothing more is owed. Every red row is a TRAPDOOR: matching its checkpoints licenses exactly nothing, and the witness pair is the proof. Note also what the map does NOT contain: there is no row for \u201ctwo sides and any angle\u201d, because that phrase is ambiguous between SAS and SSA; there is no row for \u201ctwo angles and two sides\u201d, because the angle sum already makes three angles dependent and the honest minimal sets are the five listed. The map is complete for triangles: five doors in, two painted doors that are walls.',
    },
    /* -------------------------------------------------------------- */
    /* 6. worked applications                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Congruence in action: three worked chains' },
    {
      kind: 'para',
      text: 'The three Illustrations below are the three shapes this material takes in an examination. The first is a two-triangle proof written correspondence-first \u2014 the map named before any equality, the criterion cited by name, the conclusion licensed \u2014 which is the template for every geometry proof involving a shared side. The second is the ambiguous case fully walked: both triangles constructed, both third sides computed against the engine\u2019s exact forms, the supplement fault and the classic window both on the table. The third is the identity read: one data set stated as AAS, re-derived as ASA by the angle sum, one conclusion. In all three the discipline is the same: say what corresponds, say which criterion signs it, and only then say what follows.',
    },
    {
      kind: 'example',
      title: 'Correspondence-first: in the figure, $ABCD$ is a quadrilateral with $AB = DC$ and $\angle ABC = \angle DCB$, and $BC$ is of course common. Prove that triangle $ABC \cong$ triangle $DCB$, and find $\angle BAC$ when $\angle ABC = 55^\circ$ and $\angle ACB = 75^\circ$.',
      steps: [
        'Sol. Name the correspondence FIRST, before touching any equality: the shared side $BC$ of the first triangle answers the side $CB$ of the second, so $B \to C$ and $C \to B$ as a pair; the remaining vertices then pair as $A \to D$. The claim to prove is $\triangle ABC \cong \triangle DCB$ under exactly that map \u2014 write it down before checking anything.',
        'Audit the checkpoints under the map: $AB$ (first triangle) answers $DC$ (second) \u2014 equal, given. $BC$ answers $CB$ \u2014 equal, the common side. $\angle ABC$ (at $B$, between $BA$ and $BC$) answers $\angle DCB$ (at $C$, between $CD$ and $CB$) \u2014 equal, given.',
        'Check the shape of the data: the equal angles sit at the endpoints of the equal sides $BC$ and $CB$ \u2014 each angle is INCLUDED between a named side-pair ($BA$ with $BC$; $CD$ with $CB$). Two sides with the angle included between them: the SAS shape.',
        'Cite and conclude: by SAS (Euclid I.4), $\triangle ABC \cong \triangle DCB$ under the correspondence $A \to D$, $B \to C$, $C \to B$ \u2014 the licence is signed, and every fact below rides it.',
        'Now, ride the licence for the angle: the correspondence carries $\angle BAC$ (at $A$, between $AB$ and $AC$) onto $\angle CDB$ (at $D$, between $DC$ and $DB$), so $\angle BAC = \angle CDB$ is a licensed fact, free of further measurement.',
        'Compute with the angle sum (lesson 2.4): $\angle BAC = 180^\circ - 55^\circ - 75^\circ = 50^\circ$.',
        'Hence $\triangle ABC \cong \triangle DCB$ by SAS, and $\angle BAC = \angle CDB = 50^\circ$ \u2014 the second equality purely by correspondence, the value purely by arithmetic.',
      ],
      figures: [
        {
          caption: 'The correspondence-first proof drawn: triangle ABC with angles 55 degrees at B and 75 degrees at C, triangle DCB with the matching angles at C and B, the shared side BC = CB, and the correspondence arrow A to D. SAS licenses the congruence, and the angle sum gives the apex angles 50 degrees.',
          svg: geo32Corr('Two triangles side by side: the green triangle ABC with angles fifty-five and seventy-five at the base and the orange dashed triangle DCB with the same base angles swapped, an arrow from apex A to apex D, and the note that SAS on the equal sides and included angles gives the congruence and apex angles of fifty degrees.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The ambiguous case fully walked. Part one: the supplement pair \u2014 a $30^\circ$ opening at $B$ from the base line, swing side $7$ on the arm, base side $10$ along the line to $C$. Part two: the classic pair \u2014 interior angle $A = 30^\circ$, $b = 7$, $a = 5$. Construct every triangle each data set supports and compute the third sides.',
      steps: [
        'Sol. Part one, decompose the swing: the endpoint of the length-7 side rides a circle about $B$; its altitude above the base line is $h = 7 \sin 30^\circ = 3.5$ and its foot sits $7 \cos 30^\circ = 7\sqrt{3}/2 \approx 6.062178$ from $B$. Every legal resting place for the apex is a circle point at height $3.5$.',
        'Place both apices: one foot INSIDE the span $BC$ (call it $A$), one foot BEYOND $B$ on the far side (call it $A\u2032$) \u2014 both keep the swing side at $7$ and the $30^\circ$ opening from the base LINE. Two triangles on one data set.',
        'Compute the third sides by coordinates: $c_1 = \sqrt{(10 - 6.062178)^2 + 3.5^2} = \sqrt{149 - 70\sqrt{3}} \approx 5.268438$ for the fat triangle, and $c_2 = \sqrt{(10 + 6.062178)^2 + 3.5^2} = \sqrt{149 + 70\sqrt{3}} \approx 16.439086$ for the thin one \u2014 the engine\u2019s two routes (trig and coordinate) agree on both.',
        'Name the fault honestly: the interior angle at $B$ reads $30^\circ$ in the fat triangle and $150^\circ$ in the thin one; $\sin 30^\circ = \sin 150^\circ = 1/2$, and that shared SINE \u2014 not a shared angle \u2014 is what the two triangles truly have in common. Read literally (interior $A = 30^\circ$, $b = 7$ adjacent, $a = 10$ opposite), the data is unique: $a > b$ forces one triangle, $c = (7\sqrt{3} + \sqrt{351})/2 \approx 15.429675$.',
        'Part two, enter the classic window: keep $A = 30^\circ$ and $b = 7$ but shrink the opposite side to $a = 5$, which sits strictly between the altitude and the adjacent side: $3.5 < 5 < 7$. The law of cosines at $A$ becomes $c^2 - 7\sqrt{3} \cdot c + 24 = 0$.',
        'Solve: $c = (7\sqrt{3} \pm \sqrt{51})/2$, that is $c \approx 2.491464$ or $c \approx 9.632892$ \u2014 two positive roots (sum $7\sqrt{3} \approx 12.124356$, product $24$), so two triangles.',
        'Verify both keep the literal data: in each triangle the interior angle at $A$ is exactly $30^\circ$ and the side $CB = 5$ \u2014 the engine checks both closures \u2014 so this is the genuine ambiguous case, not a supplement trick.',
        'Hence SSA fails twice over: the supplement pair wears third sides $\approx 5.268438$ and $16.439086$, the classic pair wears $\approx 2.491464$ and $9.632892$, and the ambiguity window is exactly $b \sin A < a < b$.',
      ],
      figures: [
        {
          caption: 'The classic ambiguous case drawn for Illustration 2, part two: the angle A = 30 degrees with the side b = 7 on its upper arm, and TWO positions of B on the base line at distances c1 \u2248 2.491464 and c2 \u2248 9.632892 from A, each keeping the side CB = 5. Both triangles carry the interior angle 30 degrees at A \u2014 the genuine SSA failure.',
          svg: geo32Amb5('The classic ambiguous case: a thirty-degree angle at A with a side of seven along its arm to C, and two positions of B on the base line, the green triangle with AB about two point four nine and the orange dashed one with AB about nine point six three, both keeping the side from C equal to five.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The identity read. Two triangles carry $(\angle A, \angle B) = (\angle D, \angle E) = (50^\circ, 60^\circ)$ and the matching sides $a = d$ (each opposite its $50^\circ$ angle). Certify the congruence twice: once as AAS, once as ASA \u2014 and note what the doubling teaches.',
      steps: [
        'Sol. Read the data as it arrives: two angles ($50^\circ$ at $A$, $60^\circ$ at $B$) and a side $a = BC$ that lies OPPOSITE the angle at $A$, not between the given angles. The certificate shape is AAS \u2014 two angles and a non-included side.',
        'Force the third angle by the angle sum (lesson 2.4): $\angle C = 180^\circ - 50^\circ - 60^\circ = 70^\circ$; likewise $\angle F = 70^\circ$ in the second triangle. This is arithmetic, not new data.',
        'Re-read the side\u2019s position: $a = BC$ has endpoints $B$ and $C$ \u2014 exactly the vertices of the angles $60^\circ$ and $70^\circ$. Relative to the FOUND pair, the side is included: the data has become (B, C, a) in ASA shape.',
        'Conclude the AAS way: by AAS (Euclid I.26, second half), $\triangle ABC \cong \triangle DEF$ \u2014 the non-included side is legal for AAS.',
        'Conclude the ASA way: by ASA (Euclid I.26, first half) on the angles $60^\circ$ and $70^\circ$ with the side $a$ between them, $\triangle ABC \cong \triangle DEF$ again.',
        'Compare the two conclusions: same correspondence, same six facts, same verdict \u2014 two names for one licence, because the angle sum makes the third angle free and the \u201cnon-included\u201d side included relative to a found angle.',
        'Hence one conclusion, two certificates: AAS and ASA are one criterion worn twice \u2014 and in an exam either citation earns the marks, though ASA-after-repair shows the mechanism.',
      ],
      figures: [
        {
          caption: 'The identity read drawn: one triangle with angles 50, 60 and 70 degrees and the side a = BC read twice \u2014 in the AAS reading (a opposite the 50-degree angle, red) and in the ASA reading (a between the 60-degree and 70-degree angles, green). The angle sum forces the 70-degree angle; one data set, two certificates.',
          svg: geo32Ident('A single triangle with angles fifty, sixty and seventy degrees, the side BC labelled a and annotated twice: in red as opposite the fifty-degree angle for the AAS reading, and in green as between the sixty and seventy degree angles for the ASA reading.'),
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 7. the collected law: formula cards + exam corner               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Seven cards collect what this lesson certified and executed. The first five are the criteria themselves, in the shape the revision sheet wants: the checkpoints, the letter-order, and the backing proposition. The sixth is the included-angle law \u2014 one line that separates SAS from SSA. The seventh is the two-failure card, with both witnesses compressed to a line each, because the fastest way to remember why the impostors die is to carry their corpses with you.',
    },
    {
      kind: 'formula',
      name: 'SAS \u2014 side-angle-side (included)',
      latex: 'AB = A\u2032B\u2032,\\; \\angle B = \\angle B\u2032,\\; BC = B\u2032C\u2032 \\;\\Rightarrow\\; \triangle ABC \cong \triangle A\u2032B\u2032C\u2032',
      note: 'the angle MUST sit at the shared vertex of the two named sides \u2014 Euclid I.4 by superposition; the 6-8-10 two-build witness shows the third side forced',
    },
    {
      kind: 'formula',
      name: 'ASA \u2014 angle-side-angle (side included)',
      latex: '\\angle A = \\angle A\u2032,\\; AB = A\u2032B\u2032,\\; \\angle B = \\angle B\u2032 \\;\\Rightarrow\\; \triangle ABC \cong \triangle A\u2032B\u2032C\u2032',
      note: 'the side sits between the two angles, at their shared endpoints \u2014 Euclid I.26, first half',
    },
    {
      kind: 'formula',
      name: 'AAS \u2014 angle-angle-side (any side)',
      latex: '\\angle A = \\angle A\u2032,\\; \\angle B = \\angle B\u2032,\\; a = a\u2032 \\;\\Rightarrow\\; \triangle ABC \cong \triangle A\u2032B\u2032C\u2032',
      note: 'the third angle is forced: $\angle C = 180^\circ - \angle A - \angle B$, after which the side is included \u2014 Euclid I.26, second half; one criterion worn twice',
    },
    {
      kind: 'formula',
      name: 'SSS \u2014 side-side-side',
      latex: 'a = a\u2032,\\; b = b\u2032,\\; c = c\u2032 \\;\\Rightarrow\\; \triangle ABC \cong \triangle A\u2032B\u2032C\u2032',
      note: 'three lengths squeeze the triangle rigid \u2014 Euclid I.8 via the I.7 apex lemma; lesson 3.1\u2019s distance check',
    },
    {
      kind: 'formula',
      name: 'RHS \u2014 right angle, hypotenuse, side',
      latex: '\\text{right angle} + \\text{hyp} = \\text{hyp} + \\text{leg} \\;\\Rightarrow\\; \cong, \\quad \\text{other leg} = \sqrt{h^2 - p^2}',
      note: 'NCERT\u2019s name; the missing leg is a UNIQUE length ($\sqrt{169 - 25} = 12$), so SSS closes the pair \u2014 the one SSA-shaped shape that survives',
    },
    {
      kind: 'formula',
      name: 'The included-angle law',
      latex: '\\text{included} \\iff \\text{the angle sits at the shared vertex of the two named sides}',
      note: 'SAS\u2019s angle is included; SSA\u2019s is opposite one of the named sides \u2014 the positional fact that separates a theorem from a falsehood',
    },
    {
      kind: 'formula',
      name: 'The two failures (AAA and SSA are not criteria)',
      latex: 'AAA: \\text{equilateral side 1 vs side 2} \\;\\Rightarrow\\; \\text{similar only}; \\quad SSA: b \sin A < a < b \\Rightarrow \\text{two triangles}',
      note: 'AAA fixes shape, not size (chapter 4\u2019s doorstep); SSA\u2019s pinned witness wears third sides $\approx 5.268438$ and $16.439086$, the classic pair $\approx 2.491464$ and $9.632892$',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: name the criterion, dodge the distractor, take the shortcut',
      text: 'Three habits pay marks here. FIRST, cite the criterion BY NAME, every time: \u201cby SAS\u201d, \u201cby ASA\u201d, \u201cby RHS\u201d \u2014 never \u201cby congruency\u201d or \u201cthe triangles are congruent\u201d without the licence named; mark schemes allocate the citation mark to the NAME, and a proof that never names its criterion reads as a guess. SECOND, the SSA distractor: in multiple-choice questions on criteria, \u201cSSA\u201d (or \u201cASS\u201d) is the planted option for any two-sides-and-an-angle data \u2014 before choosing it, put a finger on the angle\u2019s vertex and ask INCLUDED or OPPOSITE; included means SAS, opposite means the distractor, unless the angle is a right angle and the sides are hypotenuse-and-leg, which is the RHS exception. THIRD, the RHS shortcut: the moment a problem says \u201cright triangle\u201d and gives the hypotenuse plus one leg, do NOT compute the other leg \u2014 cite RHS and finish; if a value is needed, it is $\sqrt{h^2 - p^2}$, one line, no criterion talk. And when a proof needs an angle you were not given, remember the repair: $180^\circ$ minus the two known angles, then re-read the side as included and cite ASA. Typical mark scheme: the correspondence is a mark, the criterion citation is a mark, the conclusion with its reason is a mark.',
    },
    /* -------------------------------------------------------------- */
    /* 8. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'congruence criterion', def: 'A minimal checkpoint set of matched facts (sides and angles) that forces all six facts of a correspondence between two triangles: passing the checkpoints leaves no room to differ. The five for triangles are SAS, ASA, AAS, SSS and RHS.' },
        { term: 'included angle', def: 'The angle at the SHARED vertex of two named sides \u2014 the corner where the two sides actually meet. SAS demands the included angle; an angle at any other vertex, opposite one of the named sides, gives the SSA shape instead.' },
        { term: 'SAS (side-angle-side)', def: 'Euclid I.4: two sides and the angle included between them certify congruence, proved by superposition \u2014 place the sides and the angle on their partners and the third vertex has nowhere else to go.' },
        { term: 'ASA and AAS', def: 'Euclid I.26, both halves: two angles with the included side (ASA), or two angles with any side (AAS). The angle sum makes them one criterion worn twice: the third angle is arithmetic, not data.' },
        { term: 'SSS (side-side-side)', def: 'Euclid I.8 via the I.7 apex lemma: three matching lengths squeeze the triangle rigid; lesson 3.1 ran it as the distance check (match the multiset, name the correspondence).' },
        { term: 'RHS (right-angle-hypotenuse-side)', def: 'The right-triangle criterion: right angle, equal hypotenuses and one equal leg certify congruence, because Pythagoras forces the other leg to the unique length $\sqrt{h^2 - p^2}$. NCERT Class 7\u2019s name.' },
        { term: 'the SSA failure (the ambiguous case)', def: 'Two sides and an angle OPPOSITE one of them do NOT certify congruence: the pinned witness (a $30^\circ$ opening, sides 7 and 10) is worn by two triangles with third sides $\approx 5.268438$ and $16.439086$; the classic two-solution window is $b \sin A < a < b$.' },
        { term: 'the AAA failure (similarity\u2019s doorstep)', def: 'Three matching angles do NOT certify congruence: the equilateral pair, side 1 against side 2, matches all angles and no sides. What AAA does guarantee is similarity \u2014 same shape, any size \u2014 the subject of chapter 4.' },
        { term: 'correspondence-first', def: 'The proof discipline: write the vertex map (which letter answers which) before any equality, check the criterion\u2019s checkpoints under that map, cite the criterion by name, and only then state what the licence covers.' },
        { term: 'the supplement fault', def: 'The trigonometric seam SSA slips through: an angle and its supplement share a sine ($\sin 30^\circ = \sin 150^\circ = 1/2$), so data pinning a sine leaves two readings \u2014 the engine\u2019s fault line in every ambiguous case.' },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 9. quiz                                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Self-check quiz' },
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Triangles $PQR$ and $P\u2032Q\u2032R\u2032$ have $PQ = P\u2032Q\u2032 = 5$, $PR = P\u2032R\u2032 = 7$ and $\angle P = \angle P\u2032 = 40^\circ$. Which criterion certifies the congruence?',
          options: [
            'SAS \u2014 the $40^\circ$ angle is included, sitting at $P$, the shared vertex of the two named sides',
            'SSA \u2014 two sides and an angle certify congruence wherever the angle happens to sit',
            'ASA \u2014 any data mixing sides and an angle reduces to the angle-side-angle pattern',
            'RHS \u2014 every triangle with sides 5 and 7 is secretly a right triangle',
          ],
          answer: 0,
          explain: 'The named sides $PQ$ and $PR$ emanate from the SAME vertex $P$, and the given angle sits exactly there, between them \u2014 the included angle \u2014 so the data has the SAS shape and Euclid I.4 signs the licence. Option (b) is the trap the whole lesson arms you against: SSA\u2019s angle is OPPOSITE one of the named sides, and SSA is not a criterion (the ambiguous-case witness: third sides $\approx 5.268438$ and $16.439086$ on one data set). Option (c) miscounts the data: ASA needs two ANGLES and the side between them; here only one angle is given. Option (d) invents a right angle nobody granted \u2014 RHS needs the right angle named, plus hypotenuse and leg.',
        },
        {
          q: 'Triangles $ABC$ and $DEF$ have $\angle A = \angle D = 50^\circ$, $\angle B = \angle E = 60^\circ$, and $BC = EF$ (each side opposite its triangle\u2019s $50^\circ$ angle). Which criterion applies?',
          options: [
            'SSA \u2014 the side $BC$ is opposite the angle at $A$, so the data fails to certify anything',
            'SAS \u2014 two angles and a side always arrange themselves into the side-angle-side shape',
            'AAS \u2014 two angles and a non-included side; the angle sum forces $\angle C = \angle F = 70^\circ$, after which the same facts read as ASA',
            'AAA \u2014 matching angles alone already certify congruence',
          ],
          answer: 2,
          explain: 'Two angles plus a side that is not between them is exactly the AAS certificate \u2014 Euclid I.26\u2019s second half \u2014 and the angle sum repairs it: $\angle C = 180 - 50 - 60 = 70^\circ$, after which $BC$ sits included between the $60^\circ$ and $70^\circ$ angles, the ASA reading of the same three facts. Option (a) confuses the label with the verdict: SSA is the FAILURE shape for two sides and an opposite angle, not for two angles and a side. Option (b) misstates the data: SAS needs the angle included between two named sides; here the givens are two angles. Option (d) is the equilateral trap: angles alone fix shape, not size \u2014 side 1 vs side 2 shares all angles and no sides.',
        },
        {
          q: 'The ambiguous-case data: a $30^\circ$ opening at $B$ from the base line, a swing side of $7$ on the arm, a base side of $10$ along the line. The two triangles this data supports have third sides \u2014',
          options: [
            'both equal to $10$ \u2014 the two given sides pin the third',
            '$\sqrt{149 - 70\sqrt{3}} \approx 5.268438$ and $\sqrt{149 + 70\sqrt{3}} \approx 16.439086$ \u2014 two genuinely different triangles, which is why SSA fails',
            'both equal to $7$ \u2014 the swing side forces an isosceles pair',
            'no triangle exists at all, since the altitude $3.5$ is less than $7$',
          ],
          answer: 1,
          explain: 'Drop the altitude from the swing endpoint: height $3.5$, foot offset $7\sqrt{3}/2 \approx 6.062178$ from $B$. The apex can rest with its foot inside the span (third side $\sqrt{(10 - 6.062178)^2 + 3.5^2} \approx 5.268438$) or beyond $B$ (third side $\sqrt{(10 + 6.062178)^2 + 3.5^2} \approx 16.439086$) \u2014 the engine recomputed both by trigonometry and by coordinates, and the interior angles at $B$ read $30^\circ$ and $150^\circ$ with a shared sine. Option (a) and (c) invent stability the data does not have: nothing pins the third side when the angle is not included. Option (d) misreads the regime: no triangle exists only when the opposite side falls below the altitude ($a < 3.5$ here); the classic two-solution window is $3.5 < a < 7$.',
        },
        {
          q: 'The AAA witness: an equilateral triangle of side 1 and an equilateral triangle of side 2. The verdict is \u2014',
          options: [
            'congruent, since all three angles match at $60^\circ$ in both',
            'congruent after a rotation lines up one vertex of each',
            'not comparable, because the two triangles have different angles',
            'NOT congruent \u2014 every angle is $60^\circ$ in both, yet side 1 fails against side 2; the relation they DO satisfy is similarity, chapter 4\u2019s subject',
          ],
          answer: 3,
          explain: 'Congruence demands all six facts; AAA supplies three and the other three fail: each side of the small triangle is 1 against 2, the perimeters are $3$ against $6$, the areas $\sqrt{3}/4 \approx 0.433013$ against $\sqrt{3} \approx 1.732051$ (ratio exactly $4$). No rigid motion \u2014 which never stretches \u2014 can close a gap of that size. Option (a) is the trap AAA sets in every exam: angles fix shape, not size. Option (b) is doubly wrong \u2014 rotation is a rigid motion, so it preserves size and cannot carry 1 onto 2. Option (c) is false on the facts: the angles are all $60^\circ$ in BOTH triangles; that is precisely why the pair is a witness against AAA and a doorstep to similarity.',
        },
        {
          q: 'RHS in action: two right triangles each have hypotenuse $13$ and one leg $5$. The other leg \u2014',
          options: [
            'can be any length up to $13$, depending on the triangle\u2019s shape',
            'is $11$, since the leg is the hypotenuse minus the given leg',
            'is forced to $\sqrt{169 - 25} = 12$, a unique length \u2014 so the triangles are congruent by RHS without ever measuring that leg',
            'is $13$, making each triangle isosceles',
          ],
          answer: 2,
          explain: 'Pythagoras closes the triangle: $q^2 = 13^2 - 5^2 = 169 - 25 = 144$, and a length must be positive, so $q = 12$ is the ONLY value the leg can take \u2014 uniqueness is what makes RHS a criterion (it is SSS in disguise, the disguise\u2019s zip being Pythagoras). Option (a) describes the freedom SSA would leave \u2014 exactly the freedom a right angle kills. Option (b) is the classic arithmetic slip: legs do not subtract; their SQUARES do ($169 - 25$, not $13 - 5 = 8$, and neither gives 11). Option (d) fails the closure check: a triangle with legs 5 and 13 has hypotenuse $\sqrt{194} \approx 13.93$, not 13 \u2014 the data would not even be right.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. graded exercises (15, L1-L6, full Cengage step solutions)   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Exercises: the criterion discipline' },
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the five criteria, the two failures, the naming trap',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Triangles $ABC$ and $A\u2032B\u2032C\u2032$ have $AB = A\u2032B\u2032$, $AC = A\u2032C\u2032$ and $\angle A = \angle A\u2032$. Name the criterion that certifies the congruence, and justify the naming in one sentence.',
              solution: [
                'Sol. Ask where the angle sits: the named sides $AB$ and $AC$ both emanate from the vertex $A$ \u2014 they share that vertex \u2014 and the given angle is exactly at $A$.',
                'So the angle is INCLUDED between the two named sides: the positional demand of the side-angle-side certificate is met.',
                'Hence the criterion is SAS (Euclid I.4): two sides with the angle included between them force all six facts of the correspondence $A \to A\u2032$, $B \to B\u2032$, $C \to C\u2032$.',
              ],
              answer: 'SAS \u2014 the angle at $A$ is included between the named sides $AB$ and $AC$',
            },
            {
              q: 'Triangles $PQR$ and $P\u2032Q\u2032R\u2032$ have $PQ = P\u2032Q\u2032 = 6$, $QR = Q\u2032R\u2032 = 8$ and $RP = R\u2032P\u2032 = 10$. Which criterion certifies congruence, and which proposition backs it?',
              solution: [
                'Sol. Count the checkpoints: all three side pairs are matched \u2014 $6 = 6$, $8 = 8$, $10 = 10$ \u2014 with no angles given at all.',
                'Three matching sides is the side-side-side certificate: the lengths squeeze each triangle rigid, so no corner can move without breaking a given length.',
                'Hence $\triangle PQR \cong \triangle P\u2032Q\u2032R\u2032$ by SSS, the criterion backed by Euclid I.8 (whose proof leans on the I.7 apex lemma); lesson 3.1 ran this same check as the distance screen on the multiset $\{6, 8, 10\}$.',
              ],
              answer: 'congruent by SSS \u2014 Euclid I.8 (via the I.7 lemma)',
            },
            {
              q: 'A right triangle has hypotenuse $13$ and one leg $5$. Compute the other leg, and say why its value makes RHS a criterion.',
              solution: [
                'Sol. Write the Pythagoras constraint with the unknown leg $q$: $5^2 + q^2 = 13^2$.',
                'Solve: $q^2 = 169 - 25 = 144$, so $q = \sqrt{144} = 12$ \u2014 and since a length must be positive, the negative root is not a length: the value is UNIQUE.',
                'Hence the other leg is $12$; because $\sqrt{13^2 - 5^2}$ is a single fixed number, the data (right angle, hypotenuse, one leg) leaves no freedom \u2014 which is exactly what makes RHS a criterion rather than a gamble.',
              ],
              answer: 'the other leg is $\sqrt{169 - 25} = 12$ \u2014 unique, so RHS certifies',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Triangles $ABC$ and $A\u2032B\u2032C\u2032$ have $\angle B = \angle B\u2032 = 45^\circ$, $\angle C = \angle C\u2032 = 65^\circ$ and $BC = B\u2032C\u2032$. Find $\angle A$ and name the criterion.',
              solution: [
                'Sol. Force the missing angle by the angle sum (lesson 2.4): $\angle A = 180^\circ - 45^\circ - 65^\circ = 70^\circ$.',
                'Locate the side: $BC$ has endpoints $B$ and $C$ \u2014 exactly the vertices of the two given angles \u2014 so the side is INCLUDED between them.',
                'Two angles with the side included between them is the ASA certificate (Euclid I.26, first half); the computed $\angle A = 70^\circ$ is a bonus fact, not needed for the citation.',
                'Hence $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$ by ASA, and $\angle A = \angle A\u2032 = 70^\circ$ follows anyway.',
              ],
              answer: '$\angle A = 70^\circ$; the criterion is ASA (the side $BC$ is included between the given angles)',
            },
            {
              q: 'Triangles $ABC$ and $A\u2032B\u2032C\u2032$ have $\angle A = \angle A\u2032 = 50^\circ$, $\angle B = \angle B\u2032 = 60^\circ$ and $a = a\u2032$ (the sides opposite the $50^\circ$ angles). Repair the data to an ASA certificate and conclude.',
              solution: [
                'Sol. The data arrives as AAS: two angles and a side that is NOT between them ($a = BC$ lies opposite $\angle A$).',
                'Repair by arithmetic: $\angle C = 180^\circ - 50^\circ - 60^\circ = 70^\circ$, and likewise $\angle C\u2032 = 70^\circ$ \u2014 the third angle is forced, not measured.',
                'Re-read the side: $a = BC$ has endpoints $B$ and $C$, the vertices of the angles $60^\circ$ and $70^\circ$ \u2014 so relative to the found angle, the side IS included: the data has become ASA on $(B, C, a)$.',
                'Hence $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$ \u2014 citable as AAS directly (I.26, second half) or as ASA after the one-line repair; one conclusion, two certificates.',
              ],
              answer: '$\angle C = 70^\circ$; the AAS data $(A, B, a)$ is the ASA data $(B, C, a)$ \u2014 congruent either way',
            },
            {
              q: 'The naming trap. Configuration (i): sides $AB$ and $BC$ with $\angle B$. Configuration (ii): sides $AB$ and $BC$ with $\angle A$. Which configuration is SAS, and why does the other one earn no criterion at all?',
              solution: [
                'Sol. Configuration (i): the sides $AB$ and $BC$ share the vertex $B$, and the angle sits exactly there \u2014 included between the named sides. That is the SAS shape.',
                'Configuration (ii): the angle sits at $A$, an endpoint of $AB$ but a stranger to $BC$ \u2014 it is OPPOSITE the side $BC$, not between the named sides. That is the SSA shape.',
                'SSA earns no criterion because its checkpoints can be worn by two different triangles \u2014 the ambiguous case: with a $30^\circ$ angle, swing side $7$ and opposite side $10$, the engine builds third sides $\approx 5.268438$ and $16.439086$ on the same data.',
                'Hence (i) is SAS and certifies; (ii) is SSA and certifies nothing \u2014 unless the angle is a right angle and the sides are hypotenuse and leg, the RHS exception.',
              ],
              answer: '(i) is SAS (the angle at $B$ is included); (ii) is SSA \u2014 the angle at $A$ is opposite $BC$, not a criterion',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The classic ambiguous construction: interior angle $A = 30^\circ$, $b = 7$ (adjacent to the angle) and $a = 5$ (opposite it). Solve completely for the third side $c$.',
              solution: [
                'Sol. Check the regime first: the altitude of the data is $b \sin A = 7 \sin 30^\circ = 3.5$, and the opposite side $a = 5$ lies strictly between $3.5$ and $b = 7$ \u2014 the two-solution window $b \sin A < a < b$.',
                'Write the law of cosines at $A$ with the unknown $c = AB$: $a^2 = b^2 + c^2 - 2bc \cos A$, that is $25 = 49 + c^2 - 7\sqrt{3} \cdot c$, or $c^2 - 7\sqrt{3} \cdot c + 24 = 0$.',
                'Solve the quadratic: $c = (7\sqrt{3} \pm \sqrt{147 - 96})/2 = (7\sqrt{3} \pm \sqrt{51})/2$, which evaluates to $c \approx 2.491464$ or $c \approx 9.632892$.',
                'Verify both roots keep the literal data: each triangle carries the interior angle $30^\circ$ at $A$, the side $b = 7$ and the side $a = 5$ (the engine checks both closures) \u2014 and the roots have sum $7\sqrt{3} \approx 12.124356$ and product $24$, as the quadratic promises.',
                'Hence TWO triangles: $c \approx 2.491464$ or $c \approx 9.632892$ \u2014 which is precisely why SSA is not a criterion.',
              ],
              answer: '$c = (7\sqrt{3} \pm \sqrt{51})/2 \approx 2.491464$ or $\approx 9.632892$ \u2014 two triangles on one data set',
            },
            {
              q: 'The supplement pair. At $B$, a $30^\circ$ opening from the base line; a swing side of $7$ along the arm; a base side of $10$ along the line to $C$. Compute the altitude $h$, the foot offset, and BOTH third sides; explain the two interior angles at $B$.',
              solution: [
                'Sol. Decompose the swing side: its endpoint rides a circle of radius $7$ about $B$; the altitude above the base line is $h = 7 \sin 30^\circ = 3.5$, and the foot of that altitude sits $7 \cos 30^\circ = 7\sqrt{3}/2 \approx 6.062178$ from $B$ along the line.',
                'Place both apices: one with the foot between $B$ and $C$, one with the foot beyond $B$ \u2014 both keep the swing side at $7$ and the $30^\circ$ opening from the base LINE, so both triangles carry the data.',
                'Compute the third sides by coordinates: with the foot inside, $c_1 = \sqrt{(10 - 6.062178)^2 + 3.5^2} = \sqrt{149 - 70\sqrt{3}} \approx 5.268438$; with the foot beyond $B$, $c_2 = \sqrt{(10 + 6.062178)^2 + 3.5^2} = \sqrt{149 + 70\sqrt{3}} \approx 16.439086$.',
                'Explain the angles: in the fat triangle the interior angle at $B$ is $30^\circ$; in the thin one it is the supplement $150^\circ$; the two share the SINE ($\sin 30^\circ = \sin 150^\circ = 1/2$), and that shared sine \u2014 not a shared angle \u2014 is the fault line.',
                'Hence $h = 3.5$, foot offset $\approx 6.062178$, third sides $\approx 5.268438$ and $\approx 16.439086$ \u2014 two triangles, one data set, SSA executed.',
              ],
              answer: '$h = 3.5$, foot offset $\approx 6.062178$; $c_1 \approx 5.268438$ and $c_2 \approx 16.439086$ (interior angles $30^\circ$ and $150^\circ$ at $B$)',
              figures: [
                {
                  caption: 'The SSA supplement-pair construction for this exercise: both triangles on the same base BC = 10, the same swing side of 7 from B, the same 30-degree opening from the base line \u2014 with both altitudes at height 3.5, foot offset 6.062178, and the two third sides 5.268438 and 16.439086 marked.',
                  svg: geo32SSA({
                    aria: 'The SSA supplement pair for the exercise: two triangles share base BC of length ten and a side of seven from B at thirty degrees to the base line, with altitudes of height three point five, foot offset six point zero six, and third sides about five point two seven and sixteen point four four.',
                    title: 'THE SUPPLEMENT PAIR: 30° AND 150° AT B',
                  }),
                },
              ],
            },
            {
              q: 'The included-angle repair. Triangles $ABC$ and $A\u2032B\u2032C\u2032$ have $\angle A = \angle A\u2032 = 40^\circ$, $\angle C = \angle C\u2032 = 70^\circ$ and $a = a\u2032$ (the sides opposite the $40^\circ$ angles). Find $\angle B$ and re-read the data as a certified criterion.',
              solution: [
                'Sol. The data arrives in the wrong shape: the side $a = BC$ is opposite the given angle at $A$, so the certificate looks like AAS \u2014 legal, but let us repair it to see the machinery.',
                'Find the missing angle: $\angle B = 180^\circ - 40^\circ - 70^\circ = 70^\circ$ \u2014 arithmetic, not measurement.',
                'Re-read the side: $a = BC$ has endpoints $B$ and $C$, the vertices of the angles $70^\circ$ and $70^\circ$ \u2014 the side is now INCLUDED between two known angles.',
                'Hence $\angle B = 70^\circ$ and the data is ASA on $(B, C, a)$: cite ASA (Euclid I.26) and conclude $\triangle ABC \cong \triangle A\u2032B\u2032C\u2032$; the repair bought a licensed conclusion from arithmetic alone.',
              ],
              answer: '$\angle B = 70^\circ$; the data re-reads as ASA on $(B, C, a)$ \u2014 the side is included between the found and given angles',
              figures: [
                {
                  caption: 'The included-angle repair drawn: the given angles 40 degrees (red, at A) and 70 degrees (green, at C), the found angle 70 degrees at B, and the side a = BC now sitting BETWEEN the angles at B and C \u2014 the ASA read that repairs the AAS data.',
                  svg: geo32Repair('The included-angle repair: a triangle with a red forty-degree angle at A, green seventy-degree angles at B and C, and the base side a between the two seventy-degree angles, noted as the ASA read.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The RHS pair. Two right triangles each have hypotenuse $13$ and one leg $5$. Are they congruent? And what happens to the verdict if the second triangle\u2019s hypotenuse is some $c \ne 13$ instead?',
              solution: [
                'Sol. Run the closure on the first pair: the missing leg is $q = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = 12$ \u2014 a unique positive length \u2014 so both triangles carry the side multiset $\{5, 12, 13\}$.',
                'Cite: right angle, equal hypotenuses ($13 = 13$), one equal leg ($5 = 5$) \u2014 the RHS certificate; equivalently SSS finishes after the Pythagoras closure. The triangles are congruent.',
                'Now break the hypotenuse: with hypotenuse $c \ne 13$, the second triangle\u2019s missing leg would be $\sqrt{c^2 - 25}$, and its side multiset $\{5, \sqrt{c^2 - 25}, c\}$ can only equal $\{5, 12, 13\}$ if $c = 13$ (the engine checks $c \in \{10, 11, 12, 14, 15\}$: none squares to $169$).',
                'A concrete contrast: hypotenuse $12$ with leg $5$ gives the other leg $\sqrt{144 - 25} = \sqrt{119}$, a triangle whose sides are NOT $\{5, 12, 13\}$ \u2014 the 5-12-12 candidate fails the right-angle check itself, since $5^2 + 12^2 = 169 \ne 144$.',
                'Hence the pair IS congruent by RHS (the forced leg $12$); for any $c \ne 13$ the certificate collapses and the triangles are not congruent.',
              ],
              answer: 'congruent by RHS \u2014 the other leg is forced to $\sqrt{169 - 25} = 12$; for any $c \ne 13$ the data fails',
              figures: [
                {
                  caption: 'The RHS pair drawn: two right triangles with hypotenuse 13 and leg 5, the legs swapped between them, both closing to the multiset {5, 12, 13} because the missing leg is the unique value \u221a(169 \u2212 25) = 12 \u2014 with the 5\u221212\u221212 contrast noted as a non-match.',
                  svg: geo32RHSpair('The RHS pair: a green right triangle with legs five and twelve and hypotenuse thirteen, and an orange right triangle with legs twelve and five and hypotenuse thirteen, both marked with the forced leg twelve and the contrast note about five twelve twelve.'),
                },
              ],
            },
            {
              q: 'Correspondence-first proof. $ABCD$ is a quadrilateral with $AB = DC$, $\angle ABC = \angle DCB$, and $BC$ common. Prove $\triangle ABC \cong \triangle DCB$, then find $\angle BAC$ when $\angle ABC = 55^\circ$ and $\angle ACB = 75^\circ$.',
              solution: [
                'Sol. Name the correspondence first: the common side answers itself with ends swapped, $B \to C$ and $C \to B$; the leftover vertices pair as $A \to D$. The claim is $\triangle ABC \cong \triangle DCB$ under that map.',
                'Audit the checkpoints: $AB$ answers $DC$ (given equal); $BC$ answers $CB$ (common, trivially equal); $\angle ABC$ answers $\angle DCB$ (given equal).',
                'Check inclusion: each angle sits at an endpoint of the common side, between the common side and a named side \u2014 $\angle ABC$ between $BA$ and $BC$, $\angle DCB$ between $CD$ and $CB$ \u2014 so the angle is included: the SAS shape.',
                'Conclude and ride: by SAS, $\triangle ABC \cong \triangle DCB$; the correspondence carries $\angle BAC$ onto $\angle CDB$, so the two are equal as a licensed fact.',
                'Compute: $\angle BAC = 180^\circ - 55^\circ - 75^\circ = 50^\circ$, and therefore $\angle CDB = 50^\circ$ as well.',
                'Hence $\triangle ABC \cong \triangle DCB$ by SAS, and $\angle BAC = \angle CDB = 50^\circ$.',
              ],
              answer: '$\triangle ABC \cong \triangle DCB$ by SAS; $\angle BAC = \angle CDB = 50^\circ$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Structural naming, three configurations. (i) Three pairs of sides equal. (ii) Sides $AB$ and $BC$ equal to $A\u2032B\u2032$ and $B\u2032C\u2032$, with $\angle B = \angle B\u2032$. (iii) Sides $AB$ and $BC$ equal to $A\u2032B\u2032$ and $B\u2032C\u2032$, with $\angle A = \angle A\u2032$. Name the criterion (or the failure) for each, with the reason.',
              solution: [
                'Sol. Configuration (i): no angles, three sides \u2014 the SSS certificate, Euclid I.8; the multiset match squeezes the triangle rigid.',
                'Configuration (ii): the named sides $AB$ and $BC$ share the vertex $B$ and the angle sits there \u2014 included \u2014 so this is SAS, Euclid I.4.',
                'Configuration (iii): the angle sits at $A$, opposite the named side $BC$ \u2014 the SSA shape, which is NOT a criterion: the ambiguous case builds two triangles on such data (third sides $\approx 5.268438$ and $\approx 16.439086$ on the pinned witness).',
                'The moral: the same three letters S, A, S rearrange into a theorem or a falsehood purely by POSITION \u2014 inclusion is everything.',
                'Hence (i) SSS, (ii) SAS, (iii) SSA \u2014 the failure \u2014 and the naming trap is the difference between (ii) and (iii).',
              ],
              answer: '(i) SSS by I.8; (ii) SAS by I.4 (angle included at the shared vertex $B$); (iii) SSA \u2014 not a criterion (angle at $A$ opposite $BC$)',
            },
            {
              q: 'The regime census. Keep $A = 30^\circ$ and $b = 7$ fixed, and let the opposite side $a$ take the values $3$, $3.5$, $5$, $7$, $10$ in turn. For each value, state how many triangles the data supports and what happens geometrically.',
              solution: [
                'Sol. The altitude of the configuration is $h = b \sin A = 7 \sin 30^\circ = 3.5$; the law-of-cosines quadratic in $c$ is $c^2 - 7\sqrt{3} \cdot c + (49 - a^2) = 0$.',
                'At $a = 3$: the opposite side is below the altitude; the discriminant is $147 - 4 \cdot 40 = -13 < 0$ \u2014 no triangle at all (the circle misses the line).',
                'At $a = 3.5$: the side equals the altitude; the quadratic has the double root $c = 7\sqrt{3}/2 \approx 6.062178$ \u2014 exactly one triangle, a right triangle (the circle touches the line).',
                'At $a = 5$: the side is strictly between the altitude and $b$ ($3.5 < 5 < 7$); both roots are positive, $c \approx 2.491464$ and $9.632892$ \u2014 TWO triangles, the ambiguous window.',
                'At $a = 7$: the side equals $b$; the roots are $0$ (degenerate) and $7\sqrt{3} \approx 12.124356$ \u2014 one non-degenerate triangle, the isosceles merge.',
                'At $a = 10$: the side exceeds $b$; the unique positive root is $c = (7\sqrt{3} + \sqrt{351})/2 \approx 15.429675$ \u2014 one triangle, the long-side regime. Hence the census reads 0 / 1 / 2 / 1 / 1.',
              ],
              answer: 'triangle counts $0, 1, 2, 1, 1$ for $a = 3, 3.5, 5, 7, 10$ \u2014 none; one right; TWO (the window $3.5 < a < 7$); one merge; one long-side',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The AAA doorstep. An equilateral triangle has side $1$; a second has side $2$. Compare the angles, the perimeters and the areas; state the verdict and name the relation the pair DOES satisfy.',
              solution: [
                'Sol. Angles: every angle of an equilateral triangle is $60^\circ$, so the two triangles match on all three angles \u2014 the AAA checkpoints pass completely.',
                'Perimeters: $3 \cdot 1 = 3$ against $3 \cdot 2 = 6$ \u2014 unequal.',
                'Areas: $\sqrt{3}/4 \cdot 1^2 \approx 0.433013$ against $\sqrt{3}/4 \cdot 2^2 = \sqrt{3} \approx 1.732051$ \u2014 unequal, with ratio exactly $4$ (the square of the side ratio, a preview of chapter 4).',
                'Verdict: not congruent \u2014 a rigid motion never stretches, so no motion carries a side of length 1 onto a side of length 2; AAA is thereby executed as a criterion.',
                'Hence the pair is similar (same shape, different size) \u2014 the relation AAA genuinely guarantees, and the doorstep of chapter 4.',
              ],
              answer: 'angles all $60^\circ$ in both; perimeters $3$ vs $6$; areas $\approx 0.433013$ vs $\approx 1.732051$ (ratio $4$) \u2014 similar, NOT congruent',
            },
            {
              q: 'The obtuse sharpening. Solve the SSA data $A = 120^\circ$, $b = 7$, $a = 10$ completely: find $\angle B$ and the third side $c$, and explain why no second triangle appears.',
              solution: [
                'Sol. Law of sines for $\angle B$: $\sin B = (b \sin A)/a = (7 \sin 120^\circ)/10 = 7\sqrt{3}/20 \approx 0.606218$.',
                'The acute reading: $B \approx 37.316^\circ$. The supplement $180^\circ - 37.316^\circ \approx 142.684^\circ$ is forbidden: it would give $A + B \approx 262.684^\circ > 180^\circ$, leaving nothing for the third angle \u2014 so $B$ is acute, uniquely.',
                'Close with the law of cosines at $A$: $a^2 = b^2 + c^2 - 2bc \cos A$ gives $100 = 49 + c^2 + 7c$, that is $c^2 + 7c - 51 = 0$.',
                'Solve: $c = (-7 + \sqrt{49 + 204})/2 = (-7 + \sqrt{253})/2 \approx 4.452987$ \u2014 the negative root is not a length, so the solution is unique.',
                'Hence $B \approx 37.316^\circ$ and $c \approx 4.452987$, ONE triangle \u2014 SSA becomes determinate when the given angle is right or obtuse, because the supplement cannot fit inside the angle-sum budget; this is the same doorway RHS exploits.',
              ],
              answer: '$B \approx 37.316^\circ$ (acute only) and $c \approx 4.452987$ \u2014 a unique triangle',
            },
          ],
        },
      ],
    },

  ],
}
