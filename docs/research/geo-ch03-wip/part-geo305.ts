import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c35 = {
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
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f35 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo35 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo35Txt = (
  x: number, y: number, s: string,
  size = 13, color = c35.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f35}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo35Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c35.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo35Dot = (x: number, y: number, color = c35.ink, r = 4): string =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`

const geo35Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** affine frame: maps the math rectangle [xmin,xmax]×[ymin,ymax] (y up) into the pixel rect [x0,y0,w,h] (y down) */
const geo35Frame = (
  xmin: number, xmax: number, ymin: number, ymax: number,
  x0: number, y0: number, w: number, h: number,
): { X: (x: number) => number; Y: (y: number) => number; P: (p: [number, number]) => string } => {
  const s = Math.min(w / (xmax - xmin), h / (ymax - ymin))
  const ox = x0 + (w - s * (xmax - xmin)) / 2
  const oy = y0 + (h - s * (ymax - ymin)) / 2
  const X = (x: number): number => ox + (x - xmin) * s
  const Y = (y: number): number => oy + (ymax - y) * s
  return { X, Y, P: (p: [number, number]) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}` }
}

/* the pinned witness — every figure is computed from these numbers */
const gA: [number, number] = [0, 0]
const gB: [number, number] = [12, 0]
const gC: [number, number] = [0, 9]
const gD: [number, number] = [4, 6]
const gE: [number, number] = [0, 3.6]
const gF: [number, number] = [3, 0]
const gO: [number, number] = [2, 3]
const gDm: [number, number] = [24, -9]
const gEm: [number, number] = [0, 3]
const gFm: [number, number] = [6, 0]

/* ------------------------------------------------------------------ */
/* F1 — the Ceva concurrency witness: D, E, F and O(2,3)               */
/* ------------------------------------------------------------------ */
const geo35Ceva = (): string => {
  const W = 640, H = 470
  const { X, Y, P } = geo35Frame(-1.6, 13.6, -1.6, 10.4, 8, 8, W - 16, H - 66)
  const parts: string[] = []
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.6" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gA[0]), Y(gA[1]), X(gD[0]), Y(gD[1]), c35.green, 2.3))
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gE[0]), Y(gE[1]), c35.tealInk, 2.3))
  parts.push(geo35Line(X(gC[0]), Y(gC[1]), X(gF[0]), Y(gF[1]), c35.amber, 2.3))
  parts.push(geo35Dot(X(gD[0]), Y(gD[1]), c35.green, 4.5) + geo35Dot(X(gE[0]), Y(gE[1]), c35.tealInk, 4.5) + geo35Dot(X(gF[0]), Y(gF[1]), c35.amber, 4.5))
  parts.push(`<circle cx="${X(gO[0]).toFixed(1)}" cy="${Y(gO[1]).toFixed(1)}" r="9" fill="${c35.orange}" fill-opacity="0.22"/>`)
  parts.push(geo35Dot(X(gO[0]), Y(gO[1]), c35.orange, 5.5))
  parts.push(geo35Txt(X(gA[0]) - 13, Y(gA[1]) + 19, 'A', 13.5, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 15, Y(gB[1]) + 19, 'B', 13.5, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 13, Y(gC[1]) - 10, 'C', 13.5, c35.ink))
  parts.push(geo35Txt(X(gD[0]) + 15, Y(gD[1]) + 4, 'D(4, 6)', 12.5, c35.green, 'start'))
  parts.push(geo35Txt(X(gE[0]) - 10, Y(gE[1]) + 4, 'E(0, 3.6)', 12.5, c35.tealInk, 'end'))
  parts.push(geo35Txt(X(gF[0]) + 14, Y(gF[1]) + 17, 'F(3, 0)', 12.5, c35.amber, 'start'))
  parts.push(geo35Txt(X(gO[0]) + 13, Y(gO[1]) + 16, 'O(2, 3)', 13, c35.orange, 'start'))
  parts.push(geo35Txt(X(8.4), Y(7.6), 'BD/DC = 2', 12.5, c35.green))
  parts.push(geo35Txt(X(1.1), Y(4.35), 'CE/EA = 3/2', 12.5, c35.tealInk, 'start'))
  parts.push(geo35Txt(X(3), Y(-1.05), 'AF/FB = 1/3', 12.5, c35.amber))
  parts.push(geo35Txt(W / 2, H - 16, 'Ceva product: 2 \u00d7 3/2 \u00d7 1/3 = 1 \u2014 the three cevians CONCURRENT at O(2, 3)', 12.5, c35.ink))
  return geo35Svg(W, H, 'Right triangle A(0,0), B(12,0), C(0,9) with cevians AD, BE and CF meeting the sides at D(4,6), E(0,3.6) and F(3,0); the three cevians concur at the point O(2,3), with the side ratios 2, 3/2 and 1/3 marked.', parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the Menelaus transversal witness: D(24,-9) beyond B, the       */
/* line y = -x/2 + 3 through D, E(0,3), F(6,0)                         */
/* ------------------------------------------------------------------ */
const geo35Menelaus = (): string => {
  const W = 880, H = 560
  const { X, Y, P } = geo35Frame(-4, 30, -10.8, 10.8, 10, 8, W - 20, H - 82)
  const parts: string[] = []
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.6" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gDm[0]), Y(gDm[1]), c35.faint, 2.2, '7 5')) // BC extended beyond B
  parts.push(geo35Line(X(-2.8), Y(-(-2.8) / 2 + 3), X(27), Y(-27 / 2 + 3), c35.orange, 2.6)) // the transversal
  parts.push(geo35Dot(X(gDm[0]), Y(gDm[1]), c35.red, 5))
  parts.push(geo35Dot(X(gEm[0]), Y(gEm[1]), c35.green, 4.5) + geo35Dot(X(gFm[0]), Y(gFm[1]), c35.green, 4.5))
  parts.push(geo35Txt(X(gA[0]) - 12, Y(gA[1]) + 18, 'A', 13.5, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 2, Y(gB[1]) + 20, 'B', 13.5, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 12, Y(gC[1]) - 10, 'C', 13.5, c35.ink))
  parts.push(geo35Txt(X(gDm[0]) + 10, Y(gDm[1]) - 14, 'D(24, \u22129)', 12.5, c35.red, 'start'))
  parts.push(geo35Txt(X(gEm[0]) + 9, Y(gEm[1]) - 12, 'E(0, 3)', 12.5, c35.ink, 'start'))
  parts.push(geo35Txt(X(gFm[0]) - 2, Y(gFm[1]) + 20, 'F(6, 0)', 12.5, c35.ink))
  parts.push(geo35Txt(X(-2.7), Y(5), 'y = \u2212x/2 + 3', 12.5, c35.orange, 'start'))
  parts.push(geo35Txt(X(1.6), Y(4.5), 'CE/EA = 2', 12.5, c35.green, 'start'))
  parts.push(geo35Txt(X(gFm[0]) - 2, Y(-1.85), 'AF/FB = 1', 12.5, c35.green))
  parts.push(geo35Txt(X(19), Y(-2.4), 'directed BD/DC = \u22121/2', 12.5, c35.red))
  parts.push(geo35Txt(W / 2, H - 16, 'directed product: (\u22121/2) \u00d7 2 \u00d7 1 = \u22121 \u2014 the three side-points COLLINEAR on one line', 12.5, c35.ink))
  return geo35Svg(W, H, 'The same triangle with the side BC extended beyond B to the point D(24, minus 9); the transversal y equals minus x over 2 plus 3 passes through D, E(0,3) and F(6,0), with directed ratios minus one half, 2 and 1 marked.', parts)
}

/* ------------------------------------------------------------------ */
/* F3 — the area-telescoping diagram: the six sub-triangles,           */
/* colour-coded by side, with their engine-verified areas              */
/* ------------------------------------------------------------------ */
const geo35Telescope = (): string => {
  const W = 640, H = 470
  const { X, Y, P } = geo35Frame(-1.6, 13.6, -1.6, 10.4, 8, 8, W - 16, H - 66)
  const tri = (p: [number, number], q: [number, number], r: [number, number], fill: string): string =>
    `<polygon points="${P(p)} ${P(q)} ${P(r)}" fill="${fill}" fill-opacity="0.5" stroke="${fill}" stroke-width="1.4" stroke-linejoin="round"/>`
  const parts: string[] = []
  parts.push(tri(gO, gB, gD, c35.green))
  parts.push(tri(gO, gD, gC, c35.mid))
  parts.push(tri(gO, gC, gE, c35.teal))
  parts.push(tri(gO, gE, gA, c35.tealInk))
  parts.push(tri(gO, gA, gF, c35.amber))
  parts.push(tri(gO, gF, gB, c35.orange))
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="none" stroke="${c35.ink}" stroke-width="2.6" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gA[0]), Y(gA[1]), X(gD[0]), Y(gD[1]), c35.ink, 1.6))
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gE[0]), Y(gE[1]), c35.ink, 1.6))
  parts.push(geo35Line(X(gC[0]), Y(gC[1]), X(gF[0]), Y(gF[1]), c35.ink, 1.6))
  parts.push(geo35Dot(X(gD[0]), Y(gD[1]), c35.ink, 4) + geo35Dot(X(gE[0]), Y(gE[1]), c35.ink, 4) + geo35Dot(X(gF[0]), Y(gF[1]), c35.ink, 4))
  parts.push(geo35Dot(X(gO[0]), Y(gO[1]), c35.ink, 5))
  parts.push(geo35Txt(X(gA[0]) - 13, Y(gA[1]) + 19, 'A', 13.5, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 15, Y(gB[1]) + 19, 'B', 13.5, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 13, Y(gC[1]) - 10, 'C', 13.5, c35.ink))
  parts.push(geo35Txt(X(gD[0]) + 13, Y(gD[1]) + 3, 'D', 12.5, c35.ink, 'start'))
  parts.push(geo35Txt(X(gE[0]) - 10, Y(gE[1]) + 3, 'E', 12.5, c35.ink, 'end'))
  parts.push(geo35Txt(X(gF[0]) + 12, Y(gF[1]) + 3, 'F', 12.5, c35.ink, 'start'))
  parts.push(geo35Txt(X(gO[0]) + 10, Y(gO[1]) - 9, 'O', 13, c35.ink, 'start'))
  parts.push(geo35Txt(X(6), Y(3), 'OBD = 18', 12, c35.paper))
  parts.push(geo35Txt(X(2), Y(6), 'ODC = 9', 12, c35.paper))
  parts.push(geo35Txt(X(0.75), Y(5.3), 'OCE = 5.4', 11.5, c35.paper, 'start'))
  parts.push(geo35Txt(X(0.75), Y(2.05), 'OEA = 3.6', 11.5, c35.paper, 'start'))
  parts.push(geo35Txt(X(1.7), Y(0.95), 'OAF = 4.5', 11.5, c35.paper, 'start'))
  parts.push(geo35Txt(X(5.8), Y(0.95), 'OFB = 13.5', 11.5, c35.paper, 'start'))
  parts.push(geo35Txt(W / 2, H - 16, 'each pair of sub-triangles shares a height \u2014 the area ratio IS the side ratio', 12, c35.ink))
  return geo35Svg(W, H, 'The witness triangle cut by the three cevians through O into six sub-triangles OBD, ODC, OCE, OEA, OAF and OFB, filled in six colours and labelled with their areas 18, 9, 5.4, 3.6, 4.5 and 13.5.', parts)
}

/* ------------------------------------------------------------------ */
/* F4 — the duality twin: same triangle, product +1 vs product −1      */
/* ------------------------------------------------------------------ */
const geo35Duality = (): string => {
  const W = 900, H = 440
  const parts: string[] = []
  parts.push(geo35Txt(230, 30, 'CEVA \u2014 THE PRODUCT IS +1', 13, c35.ink, 'middle', '700'))
  parts.push(geo35Txt(670, 30, 'MENELAUS \u2014 THE PRODUCT IS \u22121', 13, c35.ink, 'middle', '700'))
  {
    const { X, Y, P } = geo35Frame(-1, 13, -0.9, 9.9, 18, 52, 424, 330)
    parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.4" stroke-linejoin="round"/>`)
    parts.push(geo35Line(X(gA[0]), Y(gA[1]), X(gD[0]), Y(gD[1]), c35.green, 2))
    parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gE[0]), Y(gE[1]), c35.tealInk, 2))
    parts.push(geo35Line(X(gC[0]), Y(gC[1]), X(gF[0]), Y(gF[1]), c35.amber, 2))
    parts.push(geo35Dot(X(gO[0]), Y(gO[1]), c35.orange, 5))
    parts.push(geo35Txt(X(gA[0]) - 11, Y(gA[1]) + 16, 'A', 12, c35.ink))
    parts.push(geo35Txt(X(gB[0]) + 12, Y(gB[1]) + 16, 'B', 12, c35.ink))
    parts.push(geo35Txt(X(gC[0]) - 11, Y(gC[1]) - 8, 'C', 12, c35.ink))
    parts.push(geo35Txt(X(gO[0]) + 14, Y(gO[1]) - 6, 'O(2, 3)', 12, c35.orange, 'start'))
    parts.push(geo35Txt(X(gD[0]) + 9, Y(gD[1]) + 3, 'D', 11.5, c35.ink, 'start'))
    parts.push(geo35Txt(X(gE[0]) - 8, Y(gE[1]) + 3, 'E', 11.5, c35.ink, 'end'))
    parts.push(geo35Txt(X(gF[0]) + 9, Y(gF[1]) + 3, 'F', 11.5, c35.ink, 'start'))
    parts.push(geo35Txt(230, 412, 'three cevians \u2014 ONE meeting point', 12.5, c35.tealInk))
  }
  {
    const { X, Y, P } = geo35Frame(-2.5, 27.5, -10, 10, 458, 52, 424, 330)
    parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.4" stroke-linejoin="round"/>`)
    parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gDm[0]), Y(gDm[1]), c35.faint, 1.8, '6 4'))
    parts.push(geo35Line(X(-2), Y(4), X(26), Y(-10), c35.orange, 2.4))
    parts.push(geo35Dot(X(gDm[0]), Y(gDm[1]), c35.red, 4.5))
    parts.push(geo35Dot(X(gEm[0]), Y(gEm[1]), c35.ink, 4) + geo35Dot(X(gFm[0]), Y(gFm[1]), c35.ink, 4))
    parts.push(geo35Txt(X(gA[0]) - 10, Y(gA[1]) + 15, 'A', 12, c35.ink))
    parts.push(geo35Txt(X(gB[0]) + 2, Y(gB[1]) + 17, 'B', 12, c35.ink))
    parts.push(geo35Txt(X(gC[0]) - 10, Y(gC[1]) - 8, 'C', 12, c35.ink))
    parts.push(geo35Txt(X(gDm[0]) - 4, Y(gDm[1]) + 17, 'D(24, \u22129)', 11.5, c35.red, 'end'))
    parts.push(geo35Txt(X(gEm[0]) + 8, Y(gEm[1]) - 10, 'E(0, 3)', 11.5, c35.ink, 'start'))
    parts.push(geo35Txt(X(gFm[0]) - 8, Y(gFm[1]) + 24, 'F(6, 0)', 11.5, c35.ink, 'end'))
    parts.push(geo35Txt(670, 412, 'three side-points \u2014 ONE transversal', 12.5, c35.tealInk))
  }
  return geo35Svg(W, H, 'Two panels with the same triangle: on the left the Ceva configuration with product plus one and three cevians meeting at O(2,3); on the right the Menelaus configuration with directed product minus one and the three side-points on one transversal through D beyond B.', parts)
}

/* ------------------------------------------------------------------ */
/* S1 — solution figure: the concurrency walk landing at (2,3)         */
/* ------------------------------------------------------------------ */
const geo35Land = (): string => {
  const W = 640, H = 470
  const { X, Y, P } = geo35Frame(-1.6, 13.6, -1.6, 10.4, 8, 8, W - 16, H - 66)
  const parts: string[] = []
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.6" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gA[0]), Y(gA[1]), X(gD[0]), Y(gD[1]), c35.green, 2.3))
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gE[0]), Y(gE[1]), c35.tealInk, 2.3))
  parts.push(geo35Line(X(gC[0]), Y(gC[1]), X(gF[0]), Y(gF[1]), c35.amber, 2.3))
  parts.push(geo35Dot(X(gD[0]), Y(gD[1]), c35.green, 4.5) + geo35Dot(X(gE[0]), Y(gE[1]), c35.tealInk, 4.5) + geo35Dot(X(gF[0]), Y(gF[1]), c35.amber, 4.5))
  parts.push(`<circle cx="${X(gO[0]).toFixed(1)}" cy="${Y(gO[1]).toFixed(1)}" r="9" fill="${c35.orange}" fill-opacity="0.22"/>`)
  parts.push(geo35Dot(X(gO[0]), Y(gO[1]), c35.orange, 5.5))
  parts.push(geo35Txt(X(gA[0]) - 13, Y(gA[1]) + 19, 'A', 13.5, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 15, Y(gB[1]) + 19, 'B', 13.5, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 13, Y(gC[1]) - 10, 'C', 13.5, c35.ink))
  parts.push(geo35Txt(X(gO[0]) + 12, Y(gO[1]) + 17, 'O(2, 3)', 13, c35.orange, 'start'))
  parts.push(geo35Txt(X(2.55), Y(3.75), 'O at 1/2 of AD', 12, c35.green, 'end'))
  parts.push(geo35Txt(X(5.8), Y(1.35), 'O at 5/6 of BE', 12, c35.tealInk))
  parts.push(geo35Txt(X(1.75), Y(4.9), 'O at 2/3 of CF', 12, c35.amber, 'start'))
  parts.push(geo35Txt(W / 2, H - 16, 'the walk lands: O = A + 1/2\u00b7AD = B + 5/6\u00b7BE = C + 2/3\u00b7CF = (2, 3)', 12.5, c35.ink))
  return geo35Svg(W, H, 'The witness triangle with the three cevians; the meeting point O(2,3) is marked halfway along AD, five sixths of the way from B to E, and two thirds of the way from C to F.', parts)
}

/* ------------------------------------------------------------------ */
/* S2 — solution figure: the transversal walk (slope + substitution)    */
/* ------------------------------------------------------------------ */
const geo35Slope = (): string => {
  const W = 880, H = 560
  const { X, Y, P } = geo35Frame(-4, 30, -10.8, 10.8, 10, 8, W - 20, H - 82)
  const parts: string[] = []
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.22" stroke="${c35.ink}" stroke-width="2.6" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gDm[0]), Y(gDm[1]), c35.faint, 2.2, '7 5'))
  parts.push(geo35Line(X(-2.8), Y(4.4), X(27), Y(-10.5), c35.orange, 2.6))
  parts.push(geo35Dot(X(gDm[0]), Y(gDm[1]), c35.red, 5))
  parts.push(geo35Dot(X(gEm[0]), Y(gEm[1]), c35.green, 4.5) + geo35Dot(X(gFm[0]), Y(gFm[1]), c35.green, 4.5))
  parts.push(geo35Txt(X(gA[0]) - 12, Y(gA[1]) + 18, 'A', 13.5, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 2, Y(gB[1]) + 20, 'B', 13.5, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 12, Y(gC[1]) - 10, 'C', 13.5, c35.ink))
  parts.push(geo35Txt(X(gDm[0]) + 10, Y(gDm[1]) - 14, 'D(24, \u22129)', 12.5, c35.red, 'start'))
  parts.push(geo35Txt(X(gEm[0]) + 9, Y(gEm[1]) - 12, 'E(0, 3)', 12.5, c35.ink, 'start'))
  parts.push(geo35Txt(X(gFm[0]) - 2, Y(gFm[1]) + 20, 'F(6, 0)', 12.5, c35.ink))
  parts.push(geo35Txt(X(-2.7), Y(5), 'y = \u2212x/2 + 3', 12.5, c35.orange, 'start'))
  parts.push(geo35Txt(X(4.1), Y(1.9), '\u0394y/\u0394x = \u22123/6 = \u22121/2', 12, c35.tealInk, 'start'))
  parts.push(geo35Txt(X(14.6), Y(-5.4), '\u0394y/\u0394x = \u22129/18 = \u22121/2', 12, c35.tealInk))
  parts.push(geo35Txt(W / 2, H - 16, 'slope(E,F) = slope(D,F) = slope(D,E) = \u22121/2, and each of D, E, F satisfies y = \u2212x/2 + 3', 12.5, c35.ink))
  return geo35Svg(W, H, 'The Menelaus witness with the transversal through D, E and F; slope triangles show delta y over delta x equals minus one half both between E and F and between F and D.', parts)
}

/* ------------------------------------------------------------------ */
/* S3 — solution figure: the directed-sign strip on the line AB        */
/* ------------------------------------------------------------------ */
const geo35Strip = (): string => {
  const W = 880, H = 250
  const xt = (t: number): number => 70 + ((t + 0.9) / 2.8) * 760
  const yLine = 140
  const parts: string[] = []
  parts.push(geo35Txt(W / 2, 34, 'the directed ratio r = t/(1 \u2212 t) on the line AB \u2014 sign by POSITION', 13, c35.ink))
  parts.push(`<rect x="${xt(0)}" y="96" width="${xt(1) - xt(0)}" height="88" fill="${c35.green}" fill-opacity="0.18"/>`)
  parts.push(`<rect x="70" y="96" width="${xt(0) - 70}" height="88" fill="${c35.red}" fill-opacity="0.14"/>`)
  parts.push(`<rect x="${xt(1)}" y="96" width="${830 - xt(1)}" height="88" fill="${c35.red}" fill-opacity="0.14"/>`)
  parts.push(geo35Line(70, yLine, 830, yLine, c35.ink, 2.4))
  parts.push(geo35Txt((70 + xt(0)) / 2, 118, 'outside \u2192 NEGATIVE', 11.5, c35.red))
  parts.push(geo35Txt((xt(0) + xt(1)) / 2, 118, 'between \u2192 POSITIVE', 11.5, c35.green))
  parts.push(geo35Txt((xt(1) + 830) / 2, 118, 'outside \u2192 NEGATIVE', 11.5, c35.red))
  const pts: Array<[number, string, string, string]> = [
    [-0.5, 't = \u22121/2', 'r = \u22121/3', c35.red],
    [0.25, 't = 1/4', 'r = 1/3', c35.green],
    [0.5, 't = 1/2', 'r = 1', c35.green],
    [0.75, 't = 3/4', 'r = 3', c35.green],
    [4 / 3, 't = 4/3', 'r = \u22124', c35.red],
  ]
  for (const [t, top, bot, col] of pts) {
    parts.push(geo35Dot(xt(t), yLine, col, 5))
    parts.push(geo35Txt(xt(t), 88, top, 11.5, c35.ink))
    parts.push(geo35Txt(xt(t), 178, bot, 12, col))
  }
  parts.push(geo35Dot(xt(0), yLine, c35.ink, 5.5) + geo35Dot(xt(1), yLine, c35.ink, 5.5))
  parts.push(geo35Txt(xt(0), 176, 'A (t = 0)', 12, c35.ink))
  parts.push(geo35Txt(xt(1), 176, 'B (t = 1)', 12, c35.ink))
  parts.push(geo35Txt(W / 2, 232, 'the sign flips only at the endpoints t = 0 and t = 1 \u2014 between: positive, beyond: negative', 12, c35.tealInk))
  return geo35Svg(W, H, 'A horizontal strip for the line AB with point A at parameter 0 and B at parameter 1: the between-zone is tinted green with positive ratios, the two outside zones red with negative ratios, and sample parameters minus one half, one quarter, one half, three quarters and four thirds marked with their ratios.', parts)
}

/* ------------------------------------------------------------------ */
/* S4 — solution figure: the complement map, two Menelaus lines        */
/* ------------------------------------------------------------------ */
const geo35Complement = (): string => {
  const W = 880, H = 600
  const { X, Y, P } = geo35Frame(-15, 27, -11, 20, 10, 8, W - 20, H - 92)
  const D2: [number, number] = [-12, 18]
  const E2: [number, number] = [0, 6]
  const parts: string[] = []
  parts.push(`<polygon points="${P(gA)} ${P(gB)} ${P(gC)}" fill="${c35.panel}" fill-opacity="0.2" stroke="${c35.ink}" stroke-width="2.4" stroke-linejoin="round"/>`)
  parts.push(geo35Line(X(gB[0]), Y(gB[1]), X(gDm[0]), Y(gDm[1]), c35.faint, 1.8, '6 4')) // BC beyond B
  parts.push(geo35Line(X(gC[0]), Y(gC[1]), X(D2[0]), Y(D2[1]), c35.faint, 1.8, '6 4')) // BC beyond C
  parts.push(geo35Line(X(-2), Y(4), X(26), Y(-10), c35.orange, 2.4)) // y = -x/2 + 3
  parts.push(geo35Line(X(-13), Y(19), X(13), Y(-7), c35.tealInk, 2.4)) // y = -x + 6
  parts.push(geo35Dot(X(gDm[0]), Y(gDm[1]), c35.orange, 4.5))
  parts.push(geo35Dot(X(gEm[0]), Y(gEm[1]), c35.orange, 4) + geo35Dot(X(gFm[0]), Y(gFm[1]), c35.ink, 5))
  parts.push(geo35Dot(X(D2[0]), Y(D2[1]), c35.tealInk, 4.5) + geo35Dot(X(E2[0]), Y(E2[1]), c35.tealInk, 4))
  parts.push(geo35Txt(X(gA[0]) - 10, Y(gA[1]) + 16, 'A', 12, c35.ink))
  parts.push(geo35Txt(X(gB[0]) + 2, Y(gB[1]) + 18, 'B', 12, c35.ink))
  parts.push(geo35Txt(X(gC[0]) - 10, Y(gC[1]) - 8, 'C', 12, c35.ink))
  parts.push(geo35Txt(X(gDm[0]) + 8, Y(gDm[1]) - 10, 'D(24, \u22129)', 11.5, c35.orange, 'start'))
  parts.push(geo35Txt(X(D2[0]) + 8, Y(D2[1]) - 6, 'D2(\u221212, 18)', 11.5, c35.tealInk, 'start'))
  parts.push(geo35Txt(X(gEm[0]) - 8, Y(gEm[1]) + 26, 'E(0, 3)', 11.5, c35.orange, 'end'))
  parts.push(geo35Txt(X(E2[0]) + 9, Y(E2[1]) - 6, 'E2(0, 6)', 11.5, c35.tealInk, 'start'))
  parts.push(geo35Txt(X(gFm[0]) + 11, Y(gFm[1]) + 20, 'F2 = F(6, 0)', 11.5, c35.ink, 'start'))
  parts.push(geo35Txt(215, 100, 'y = \u2212x + 6', 12, c35.tealInk, 'end'))
  parts.push(geo35Txt(X(21.4), Y(-7.6), 'y = \u2212x/2 + 3', 12, c35.orange))
  parts.push(geo35Txt(W / 2, H - 16, 'the complement inverts every ratio: (\u22121/2)(2)(1) = \u22121 becomes (\u22122)(1/2)(1) = \u22121', 12.5, c35.ink))
  return geo35Svg(W, H, 'The witness triangle with the side BC extended both ways: the original Menelaus line y equals minus x over 2 plus 3 through D(24, minus 9), E(0,3) and F(6,0), and the complementary line y equals minus x plus 6 through D2(minus 12, 18), E2(0,6) and the same F.', parts)
}

/* ================================================================== */
/* LESSON 3.5 — The Cevian Theorems: Ceva and Menelaus                 */
/* ================================================================== */
export const lessonGeo305: Lesson = {
  id: 'geo-the-cevian-theorems-ceva-and-menelaus',
  number: '3.5',
  title: 'The Cevian Theorems: Ceva and Menelaus',
  concepts: [
    'cevian',
    "Ceva's theorem",
    "Menelaus's theorem",
    'directed ratio',
    'concurrence',
    'collinearity',
    'area telescoping',
  ],
  objectives: [
    'State the definition of a cevian and fix the chapter\u2019s ratio convention: $BD/DC$, $CE/EA$ and $AF/FB$, each measured in its own side\u2019s direction',
    'Prove Ceva\u2019s theorem by area telescoping and use the product test $(BD/DC)(CE/EA)(AF/FB) = 1$ to decide concurrence',
    'Prove the converse of Ceva and manufacture a concurrent triple of cevians by choosing the third ratio to make the product 1',
    'Use directed ratios (between positive, outside negative) and apply Menelaus\u2019s product $-1$ to decide collinearity of three side-points',
    'Recognise the duality: the same three ratios, product $1$ for concurrence and product $-1$ for collinearity, with the sign census (an odd number of outside points)',
    'Solve concurrency, collinearity and converse problems with a licensed reason for every step',
  ],
  prerequisites: [
    'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
    'geo-inequalities-in-a-triangle-sides-and-angles',
  ],
  sources: ['geo-ch03-web-ground', 'geo-euclid-elements'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census question: when do three cevians agree' },
    {
      kind: 'para',
      text: 'The chapter so far has studied triangles one at a time: we learned when two triangles are congruent, what isosceles symmetry forces, and how sides and angles order each other. This lesson changes the question. Take ONE triangle and draw three special lines in it \u2014 one from each vertex to the opposite side. The medians do this, the altitudes do this, the angle bisectors do this, and in every one of those classical families something remarkable happens: the three lines meet in a SINGLE point. The centroid of the medians, the orthocenter of the altitudes, the incenter of the bisectors \u2014 each is a famous named point of the triangle. Nobody draws three medians and gets two meeting points. Why not? What invisible census taker counts the lines through each point and guarantees the count is one?',
    },
    {
      kind: 'para',
      text: 'The naive way to answer is to draw the picture and look. But looking is not proof, and the meeting point itself is a poor witness: to test whether the third line passes through it you would have to compute the point first, and the point is exactly what you do not know. What we need is a test that reads only the SIDES \u2014 a census law that inspects where each line lands on the opposite side and pronounces, from those three landing spots alone, whether the three lines share a point. That law exists, it is three hundred and fifty years old in its printed form, and it is astonishingly cheap: multiply three ratios, compare with 1. This is Ceva\u2019s theorem, and it is the engine behind every concurrence claim in elementary geometry.',
    },
    {
      kind: 'para',
      text: 'The lesson also builds the theorem\u2019s mirror image. Instead of three lines through the vertices, take three POINTS, one on each side line of the triangle, and ask when they sit on one straight line \u2014 when they are collinear. The answer is Menelaus\u2019s theorem, and it is the same census with one sign flipped: multiply the same three ratios, this time as DIRECTED ratios (positive between the endpoints of a side, negative outside), and compare with $-1$. The two theorems are a matched pair: one converts concurrence into the number 1, the other converts collinearity into the number $-1$, and both directions are if-and-only-if. Between them they own the two questions you can ask about a triangle and three side-points: do the cevians agree, and do the points align?',
    },
    {
      kind: 'para',
      text: 'The plan of the lesson follows the craft. First the vocabulary: cevians, the chapter\u2019s ratio convention and the directed sign law. Then Ceva\u2019s theorem proved the classical way, by area telescoping \u2014 a proof so mechanical the engine behind this lesson verifies every one of its lines numerically before you read it. Then the witness: one completely computed triangle on which every claim lands on exact coordinates. Then the converse, the median special case, Menelaus\u2019s theorem with its directed signs, and the duality that binds the pair together. We close with the history \u2014 which involves an eleventh-century king whose proof was lost for eight centuries \u2014 and the examination corner.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the vocabulary: cevians, ratios, directed lengths           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The vocabulary: cevians, side ratios, directed lengths' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Cevian',
      text: 'A segment drawn from one vertex of a triangle to a point on the opposite side (or on its extension) is said to be a cevian of the triangle. Thus, $AD$ is a cevian from $A$ when $D$ lies on the line $BC$; $BE$ and $CF$ are the cevians from $B$ and $C$ when $E$ lies on the line $CA$ and $F$ lies on the line $AB$. The medians, the altitudes and the internal angle bisectors are all cevian families \u2014 the word names the SHAPE of the line, not its defining property.',
    },
    {
      kind: 'para',
      text: 'The name honours Giovanni Ceva, whose 1678 booklet we meet in the history section, and it earns its keep: instead of saying \u201cthe segment from vertex $B$ to the point $E$ on the opposite side\u201d we say \u201cthe cevian $BE$\u201d and move on. Throughout the lesson we keep the chapter\u2019s notation law. The triangle is $ABC$ with side $a = BC$ opposite $A$, side $b = CA$ opposite $B$ and side $c = AB$ opposite $C$. A cevian from $A$ meets the line $BC$ at $D$, and we write $BD = m$ and $DC = n$ \u2014 the piece $m$ sits next to vertex $B$ (adjacent to side $c$) and the piece $n$ sits next to vertex $C$ (adjacent to side $b$), so $a = m + n$ when $D$ lies between. The landing data of the three cevians is then read as three RATIOS, each taken in its own side\u2019s direction: $BD/DC$ on $BC$, $CE/EA$ on $CA$, and $AF/FB$ on $AB$. Fix this trio now; every table, figure, engine check and exercise below uses it without further comment.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Directed ratio (the sign law)',
      text: 'Let $P$ lie on the line through $X$ and $Y$. The directed ratio of $P$ on $XY$ is $XP/PY$, where both lengths carry the sign of the side\u2019s OWN direction: travelling $X$ to $Y$, a point BETWEEN the endpoints gives a POSITIVE ratio, and a point OUTSIDE the segment gives a NEGATIVE one. Thus on $BC$ (direction $B$ to $C$) the point $D$ between gives $BD/DC > 0$, while a point beyond $B$ or beyond $C$ gives $BD/DC < 0$. Equivalently, if $P = X + t(Y - X)$ then the directed ratio is $t/(1-t)$: the engine of this lesson sweeps this formula over three side lines and verifies the sign law everywhere.',
    },
    {
      kind: 'para',
      text: 'For Ceva\u2019s theorem all three landing points sit between the endpoints, so every ratio is positive and the sign law stays quietly in the background. Menelaus\u2019s theorem is where it steps on stage: a straight line cutting the three side LINES of a triangle cannot meet all three side SEGMENTS (try it \u2014 a line enters the triangle through one side and leaves through another), so at least one of the three points lies outside, and its ratio is negative. The sign is not decoration; it is exactly what turns Ceva\u2019s 1 into Menelaus\u2019s $-1$, and the duality section shows why the number of outside points is always odd. Train the reflex now: see a point beyond an endpoint, write a negative ratio.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, if $D$ divides $BC$ with $BD = 8$ and $DC = 4$, the ratio is $BD/DC = 2$; if instead $D$ lies beyond $B$ with $BD = 8$ and $DC = 4$ (so $C$ is between $B$ and $D$), the directed ratio is $BD/DC = -2$ \u2014 same two numbers, opposite verdicts.',
        'For example, the midpoint of any side has ratio $1$, and the point two-thirds of the way from the first endpoint has ratio $2$: with $t = 2/3$ the formula $t/(1-t)$ gives $(2/3)/(1/3) = 2$.',
        'For example, a point $P$ beyond the second endpoint with $XP/PY = -3$ satisfies $t/(1-t) = -3$, so $t = 3/4$ past the far end \u2014 the ratio determines the position, a fact the converse proof will need.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 3. Ceva's theorem, direct form — the derivation + F3           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Ceva\u2019s theorem: the product test' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Ceva\u2019s theorem (the direct form)',
      text: 'Let $D$, $E$, $F$ be points on the sides $BC$, $CA$, $AB$ of triangle $ABC$, none of them a vertex. Then the cevians $AD$, $BE$, $CF$ are concurrent \u2014 they pass through one common point \u2014 if and only if $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1$. The test reads only the three landing ratios: multiply them; the cevians agree exactly when the product is $1$.',
    },
    {
      kind: 'para',
      text: 'Before the proof, admire the shape of the statement. It is a CENSUS law: it converts a question about lines meeting far from the sides (\u201cwhere do $AD$ and $BE$ cross, and does $CF$ pass through there?\u201d) into arithmetic on the sides themselves. And it is sharp in both directions \u2014 the \u201cif and only if\u201d means the product is not merely necessary but sufficient, so the same multiplication both detects concurrence and manufactures it. The proof we now give is the classical one, and its whole weight rests on a single idea from the congruence chapters: triangles on the SAME base with vertices on a line PARALLEL to the base have equal areas, and more precisely, two triangles that share a height have areas in the ratio of their bases. That is the area-comparison machinery Euclid builds in Book I \u2014 equal bases, equal heights \u2014 doing the heaviest lifting of the chapter.',
    },
    {
      kind: 'derivation',
      title: 'Ceva\u2019s theorem by area telescoping',
      statement: 'Let the cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet $BC$, $CA$, $AB$ at $D$, $E$, $F$, and suppose they are concurrent at an interior point $O$. Then $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1$.',
      steps: [
        {
          label: 'Pair the triangles on BC',
          formula: '\\frac{[ABD]}{[ADC]} = \\frac{BD}{DC} \\quad\\text{and}\\quad \\frac{[OBD]}{[ODC]} = \\frac{BD}{DC}',
          explanation: 'Triangles $ABD$ and $ADC$ stand on the bases $BD$ and $DC$ of the same line $BC$ and share the height from $A$, so their areas are in the ratio of the bases. Triangles $OBD$ and $ODC$ share the height from $O$ the same way. On the engine\u2019s witness both quotients come out $36/18 = 18/9 = 2$.',
        },
        {
          label: 'Subtract the pairs',
          formula: '\\frac{[ABD] - [OBD]}{[ADC] - [ODC]} = \\frac{[ABO]}{[ACO]} = \\frac{BD}{DC}',
          explanation: 'Two fractions equal to the same number stay equal after matching subtractions: since $[ABD]/[ADC] = [OBD]/[ODC]$, removing $[OBD]$ from the top and $[ODC]$ from the bottom leaves the ratio untouched. Geometrically the point $O$ sits on the segment $AD$, so $[ABD] = [ABO] + [OBD]$ and $[ADC] = [ACO] + [ODC]$ \u2014 the subtraction just peels off the two pieces the cevian $AD$ creates. The engine checks $36 - 18 = 18 = [ABO]$ and $18 - 9 = 9 = [ACO]$.',
        },
        {
          label: 'Cycle the three sides',
          formula: '\\frac{BD}{DC} = \\frac{[ABO]}{[ACO]}, \\quad \\frac{CE}{EA} = \\frac{[BCO]}{[BAO]}, \\quad \\frac{AF}{FB} = \\frac{[CAO]}{[CBO]}',
          explanation: 'The same two moves on side $CA$ give $CE/EA = [BCO]/[BAO]$, and on side $AB$ they give $AF/FB = [CAO]/[CBO]$. Each side ratio has become a ratio of two of the three small triangles $ABO$, $BCO$, $CAO$ that the cevians cut out of $ABC$ around the point $O$.',
        },
        {
          label: 'Multiply \u2014 everything cancels',
          formula: '\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = \\frac{[ABO]}{[ACO]} \\cdot \\frac{[BCO]}{[BAO]} \\cdot \\frac{[CAO]}{[CBO]} = 1',
          explanation: 'Read the right-hand side slowly: $[ABO]$ appears once on top and once (as $[BAO]$) on the bottom; $[BCO]$ appears once on top and once (as $[CBO]$) on the bottom; $[CAO]$ appears once on top and once (as $[ACO]$) on the bottom. Every area cancels against itself. Nothing survives but the number $1$ \u2014 the product telescopes.',
        },
      ],
      result: 'Concurrent cevians force $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1$ \u2014 the engine certifies every line numerically: $36/18 = 18/9 = [ABO]/[ACO] = 2$, the cycled readings $3/2$ and $1/3$, and the collapse of the triple product to exactly $1$.',
    },
    {
      kind: 'figure',
      caption: 'Area telescoping on the witness. The cevians through O cut the triangle into six sub-triangles, colour-coded by side: on BC the pair OBD = 18 and ODC = 9 (ratio 2), on CA the pair OCE = 5.4 and OEA = 3.6 (ratio 3/2), on AB the pair OAF = 4.5 and OFB = 13.5 (ratio 1/3). Each pair shares a height, so each pair\u2019s area ratio IS the side ratio; the three big triangles ABO = 18, BCO = 27, CAO = 9 that survive the subtraction carry the whole product, and cancel against each other.',
      svg: geo35Telescope(),
    },
    {
      kind: 'table',
      caption: 'The telescoping census on the witness triangle \u2014 every quotient is the side ratio it claims to be',
      head: ['Side', 'Paired triangles (shared height)', 'Quotient', 'Equals'],
      rows: [
        ['BC', '$[ABD]/[ADC] = 36/18$ and $[OBD]/[ODC] = 18/9$', '2', '$BD/DC = 2$'],
        ['BC, subtracted', '$([ABD]-[OBD])/([ADC]-[ODC]) = 18/9$', '2', '$[ABO]/[ACO]$'],
        ['CA', '$[BCE]/[BEA] = 32.4/21.6$ and $[OCE]/[OEA] = 5.4/3.6$', '3/2', '$CE/EA = 3/2$'],
        ['AB', '$[CAF]/[CFB] = 13.5/40.5$ and $[OAF]/[OFB] = 4.5/13.5$', '1/3', '$AF/FB = 1/3$'],
        ['All three', '$([ABO]/[ACO])([BCO]/[BAO])([CAO]/[CBO]) = (18/9)(27/18)(9/27)$', '1', 'Ceva\u2019s product'],
      ],
    },
    {
      kind: 'para',
      text: 'Two remarks on the proof\u2019s craft. First, the cancellation in the last step is not luck: each of the three small triangles appears exactly twice because each side ratio uses the two small triangles adjacent to that side, and every small triangle is adjacent to exactly two sides. The telescoping is structural, which is why the same proof pattern will reappear in the directed form for Menelaus. Second, the proof assumed $O$ interior \u2014 the honest classical hypothesis for the direct form. When the concurrence point lies outside the triangle, or when a cevian lands on an extension, the SAME algebra runs with signed areas and lands on the same product $1$; the sign bookkeeping is exactly the one Menelaus\u2019s theorem wears on its sleeve, so we develop it there rather than duplicating it here.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why areas, and not the meeting point',
      text: 'The temptation is to compute the intersection of two cevians and check the third. Resist it: the intersection depends on the whole triangle, moves when any vertex moves, and is generally irrational \u2014 while the three side ratios are given to you for free by the problem. The area telescoping is the trick that DELETES the meeting point from the argument: the point $O$ appears only through the three small triangles around it, and those cancel. A proof that removes its own hardest object is worth memorising as a craft move.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the witness, fully walked — F1 + table + Illustration 1     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The witness, fully walked' },
    {
      kind: 'para',
      text: 'Theorems this compact deserve a witness this explicit. Take the right triangle $A(0,0)$, $B(12,0)$, $C(0,9)$ \u2014 legs $12$ and $9$, hypotenuse $15$, area $54$. Choose the landing points by their ratios: $D$ on $BC$ with $BD/DC = 2$ (the two-thirds point of the way from $B$ to $C$), $E$ on $CA$ with $CE/EA = 3/2$, and $F$ on $AB$ with $AF/FB = 1/3$. The ratios place the points exactly: $D = (4,6)$, $E = (0, 3.6)$ \u2014 the fraction $18/5$, note, not a nice decimal \u2014 and $F = (3,0)$. The product is $(2)(3/2)(1/3) = 1$, so Ceva promises concurrence, and direct line intersection delivers it: all three cevians pass through $O(2,3)$. The engine behind the lesson verifies each of those landings to nine decimal places, by both pairings, before a word of this prose was allowed to stand.',
    },
    {
      kind: 'figure',
      caption: 'The Ceva witness. Triangle A(0,0), B(12,0), C(0,9); D(4,6) on BC with BD/DC = 2, E(0,3.6) on CA with CE/EA = 3/2, F(3,0) on AB with AF/FB = 1/3. The product is 1 and the three cevians AD, BE, CF meet at the single point O(2,3) \u2014 the orange landing spot.',
      svg: geo35Ceva(),
    },
    {
      kind: 'table',
      caption: 'The witness ledger \u2014 ratios, exact coordinates and the side parameters that produce them',
      head: ['Point', 'Side line', 'Coordinates', 'Ratio (own direction)', 'Side parameter'],
      rows: [
        ['D', 'BC', '$(4, 6)$', '$BD/DC = 2$', '$t = 2/3$ from B'],
        ['E', 'CA', '$(0, 3.6)$', '$CE/EA = 3/2$', '$t = 3/5$ from C'],
        ['F', 'AB', '$(3, 0)$', '$AF/FB = 1/3$', '$t = 1/4$ from A'],
        ['Product', 'all three', 'cevians meet at $(2,3)$', '$2 \\cdot \\frac{3}{2} \\cdot \\frac{1}{3} = 1$', 'CONCURRENT'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the ledger\u2019s last column with the sign law in mind: the side parameter $t$ is the fraction of the way along the side\u2019s own direction, and the ratio is $t/(1-t)$. For $D$: $t = 2/3$ gives $(2/3)/(1/3) = 2$. For $E$: $t = 3/5$ gives $(3/5)/(2/5) = 3/2$. For $F$: $t = 1/4$ gives $(1/4)/(3/4) = 1/3$. The dictionary runs both ways \u2014 given a ratio $r$, the parameter is $t = r/(1+r)$ \u2014 and that two-way street is precisely what the converse proof will exploit. The first Illustration walks the whole configuration as a model solution.',
    },
    {
      kind: 'example',
      title: 'On triangle A(0,0), B(12,0), C(0,9), the points D(4,6), E(0,3.6) and F(3,0) are marked on BC, CA and AB. Verify the three ratios, apply Ceva\u2019s test, and confirm that the cevians AD, BE, CF are concurrent by finding their common point.',
      steps: [
        'Sol. Verify the landing ratios by distances: $BD = \\sqrt{(12-4)^2 + (0-6)^2} = 10$ and $DC = \\sqrt{4^2 + 3^2} = 5$, so $BD/DC = 10/5 = 2$; $CE = 9 - 3.6 = 5.4$ and $EA = 3.6$, so $CE/EA = 5.4/3.6 = 3/2$; $AF = 3$ and $FB = 9$, so $AF/FB = 1/3$.',
        'Now, multiply: $(2)(3/2)(1/3) = 1$ \u2014 Ceva\u2019s test passes, so the three cevians are concurrent at some point $O$.',
        'Locate $O$ by intersecting the first two cevians. The line $AD$ runs from $(0,0)$ to $(4,6)$, so its equation is $y = \\frac{3}{2}x$; the line $BE$ runs from $(12,0)$ to $(0, 3.6)$, so its equation is $y = -\\frac{3}{10}x + \\frac{18}{5}$.',
        'Equate: $\\frac{3}{2}x = -\\frac{3}{10}x + \\frac{18}{5}$, and multiplying by $10$ gives $15x = -3x + 36$, so $18x = 36$ and $x = 2$; then $y = \\frac{3}{2}(2) = 3$. The first two cevians meet at $O(2,3)$.',
        'Check the third: the line $CF$ from $(0,9)$ to $(3,0)$ is $y = -3x + 9$, and at $x = 2$ it gives $y = 3$ \u2014 so $CF$ passes through the same $O(2,3)$.',
        'Hence the cevians are concurrent at $O(2,3)$: $O$ sits halfway along $AD$ ($t = 1/2$), five-sixths of the way from $B$ to $E$ ($t = 5/6$), and two-thirds of the way from $C$ to $F$ ($t = 2/3$) \u2014 three exact fractions, one point.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 5. the converse — derivation 2 + the caveat + Illustration 3    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The converse: manufacturing concurrence' },
    {
      kind: 'para',
      text: 'Ceva\u2019s test is an if-and-only-if, and the return direction is the one examinations love: you are handed two landing ratios and asked to CHOOSE the third so that concurrence is forced. The proof of the converse is a short, completely general trick \u2014 let the first two cevians meet, send the third vertex\u2019s line through that meeting point, and compare where it lands with where you wanted it to land. The comparison needs one lemma we have already banked: a ratio on a segment determines the point, because the parameter is $t = r/(1+r)$ and two points with the same parameter coincide. The engine verifies the recovery map on every pinned ratio of the lesson.',
    },
    {
      kind: 'derivation',
      title: 'The converse of Ceva',
      statement: 'Let $D$, $E$, $F$ be points on the sides $BC$, $CA$, $AB$ of triangle $ABC$ with $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1$. Then the cevians $AD$, $BE$, $CF$ are concurrent \u2014 except in the degenerate case where all three are parallel.',
      steps: [
        {
          label: 'Meet the first two cevians',
          formula: 'AD \\cap BE = O',
          explanation: 'If $AD$ and $BE$ are not parallel, they meet at some point $O$. (If they are parallel, we are in the degenerate branch named at the end \u2014 the honest exception, not a hidden one.)',
        },
        {
          label: 'Send the third vertex through O',
          formula: 'CO \\cap AB = F\u2032',
          explanation: 'Draw the line from $C$ through $O$ and let it meet the line $AB$ at a point $F\u2032$. The three cevians $AD$, $BE$, $CF\u2032$ are concurrent at $O$ by construction.',
        },
        {
          label: 'Apply Ceva direct to the new triple',
          formula: '\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF\u2032}{F\u2032B} = 1',
          explanation: 'The direct form just proved applies to the genuinely concurrent triple $AD$, $BE$, $CF\u2032$: its product is $1$.',
        },
        {
          label: 'Compare the two products',
          formula: '\\frac{AF\u2032}{F\u2032B} = \\frac{AF}{FB}',
          explanation: 'The given product is also $1$, and the first two factors are literally the same numbers, so the third factors must be equal: divide one equation by the other.',
        },
        {
          label: 'A ratio determines the point',
          formula: '\\frac{AF}{FB} = \\frac{AF\u2032}{F\u2032B} \\;\\Rightarrow\\; F = F\u2032',
          explanation: 'On the segment $AB$ the map from a point to its ratio is injective: a point at parameter $t$ has ratio $t/(1-t)$, and the recovery map $t = r/(1+r)$ turns a ratio back into a unique parameter, hence a unique point. Equal ratios force $F = F\u2032$, so the line $CF$ is the line $CF\u2032$ and it passes through $O$.',
        },
      ],
      result: 'The product $1$ forces the three cevians through one point \u2014 with the single honest exception that all three may instead be pairwise parallel, the degenerate branch the statement names rather than hides.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution: the all-parallel escape hatch',
      text: 'The converse is \u201cproduct $1$ implies concurrent OR all three parallel,\u201d and the second branch is real. Take the three points very close to the far ends of their sides with product exactly $1$ and the three cevians can miss each other pairwise \u2014 each pair parallel instead of crossing. In examination problems the intended branch is almost always concurrence (the cevians are drawn inside the triangle, or the third ratio places $F$ sensibly), but a complete answer names the exception. It costs one clause and buys the difference between a proof and a near-proof.',
    },
    {
      kind: 'example',
      title: 'In triangle ABC with A(0,0), B(12,0), C(0,9), the cevian from A meets BC at D(4,6) and the cevian from B meets CA at E(0,3.6). Where must the cevian from C meet AB so that all three are concurrent, and where do they then meet?',
      steps: [
        'Sol. Read off the two given ratios: $BD/DC = 10/5 = 2$ and $CE/EA = 5.4/3.6 = 3/2$, exactly as in the witness walk.',
        'Force the product: for concurrence, $2 \\cdot \\frac{3}{2} \\cdot \\frac{AF}{FB} = 1$, so $\\frac{AF}{FB} = \\frac{1}{3}$.',
        'Recover the point: the ratio $1/3$ on $AB$ sits at parameter $t = \\frac{1/3}{1 + 1/3} = \\frac{1}{4}$, so $F = A + \\frac{1}{4}(B - A) = (3, 0)$.',
        'Now, intersect the two given cevians: $AD$ is $y = \\frac{3}{2}x$ and $BE$ is $y = -\\frac{3}{10}x + \\frac{18}{5}$; equating gives $x = 2$, $y = 3$, so they meet at $O(2,3)$.',
        'Check the third: the line $C(0,9)$ to $F(3,0)$ is $y = -3x + 9$, and $-3(2) + 9 = 3$ \u2014 it passes through $O(2,3)$, as the product promised.',
        'Hence $F = (3,0)$ and the three cevians are concurrent at $(2,3)$ \u2014 the product test manufactured the configuration, the intersection confirmed it.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 6. the median check                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The median check: the instant corollary' },
    {
      kind: 'para',
      text: 'Every classical concurrence claim is now a one-line Ceva computation. Take the medians: $D$, $E$, $F$ the midpoints of $BC$, $CA$, $AB$. Each ratio is $1$ \u2014 the midpoint splits its side equally \u2014 so the product is $1 \\cdot 1 \\cdot 1 = 1$, and the medians are concurrent. The meeting point is the CENTROID, and on the witness triangle the engine lands all three medians at $G(4,3)$, the average of the vertex coordinates. More is true, and the engine checks it: $G$ sits exactly two-thirds of the way along each median, which is the famous $2:1$ split \u2014 the centroid divides each median in the ratio $2:1$, vertex to midpoint. That split, together with the LENGTH of a median (Stewart\u2019s theorem and its Apollonius special case), is the whole subject of the next lesson, 3.6; we cross-reference it here and develop it there.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The median check as a sanity test',
      text: 'When you meet a claimed concurrence in an examination, run the median test mentally first: if the configuration degenerates to midpoints, the product must read $1 \\cdot 1 \\cdot 1$. More usefully, the medians are the CALIBRATION of the test \u2014 the one family whose ratios you know cold. The altitudes and the bisectors also pass Ceva (their ratios involve cosines and side lengths respectively), and 3.6 develops the bisector ratio $m/n = c/b$ fully. Ceva is the single law behind all of them.',
    },
    /* -------------------------------------------------------------- */
    /* 7. Menelaus's theorem — the mirror derivation + F2              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Menelaus\u2019s theorem: the transversal test' },
    {
      kind: 'para',
      text: 'Now turn the Ceva question inside out. Keep the triangle and keep the three side lines, but throw the cevians away: instead, mark ONE point on each side line \u2014 $D$ on the line $BC$, $E$ on the line $CA$, $F$ on the line $AB$ \u2014 and ask the mirror question. When do the three marked points sit on ONE straight line? A line cutting through a triangle\u2019s three side lines like this is called a TRANSVERSAL, and the answer is Menelaus\u2019s theorem: the census law for alignment. It reads exactly the same three ratios Ceva reads \u2014 $BD/DC$, $CE/EA$ and $AF/FB$, each in its own side\u2019s direction \u2014 but this time as DIRECTED ratios, and it pronounces alignment exactly when their product is $-1$. One theorem turns concurrence into the number 1; the other turns collinearity into the number $-1$. The pair of verdicts is the whole lesson in two symbols.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Menelaus\u2019s theorem (the directed form)',
      text: 'Let $D$, $E$, $F$ be points on the LINES $BC$, $CA$, $AB$ of triangle $ABC$, none of them a vertex. Then $D$, $E$, $F$ are collinear \u2014 they lie on one straight line \u2014 if and only if the directed product $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = -1$, where each ratio carries the sign of its side\u2019s own direction: a point between the endpoints counts positive, a point outside counts negative. The test inspects three landing ratios and pronounces on ALIGNMENT instead of agreement.',
    },
    {
      kind: 'para',
      text: 'Why must the ratios be directed here, when Ceva ran happily on plain ones? Because a straight line cannot cross all three SIDE SEGMENTS of a triangle. Enter the triangle and you must also leave it: the line spends two of its three meetings on the segments and pushes the third outside, or else it misses the triangle altogether and all three meetings land on extensions. Either way at least one of $D$, $E$, $F$ lies outside its side segment, and an unsigned ratio would destroy exactly the information that separates the cases. The sign law from the vocabulary section stops being bookkeeping and becomes the theorem\u2019s engine: the number of negative ratios is the number of outside points, and the sign of the product is the census of them.',
    },
    {
      kind: 'derivation',
      title: 'Menelaus\u2019s theorem by perpendicular telescoping',
      statement: 'Let the transversal $\ell$ meet the lines $BC$, $CA$, $AB$ at $D$, $E$, $F$, none of them a vertex. Then the directed product $\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB}$ equals $-1$.',
      steps: [
        {
          label: 'Drop perpendiculars to the transversal',
          formula: 'BB\u2032 \\perp \\ell, \\quad CC\u2032 \\perp \\ell, \\quad AA\u2032 \\perp \\ell',
          explanation: 'From $B$, $C$ and $A$ drop perpendiculars to $\ell$, with feet $B\u2032$, $C\u2032$ and $A\u2032$. At the landing point $D$ the two lines $BC$ and $\ell$ cross, so the triangles $DBB\u2032$ and $DCC\u2032$ have right angles at $B\u2032$ and $C\u2032$ and vertical angles at $D$ \u2014 similar by AA. The same pairings form at $E$ (triangles $ECC\u2032$ and $EAA\u2032$) and at $F$ (triangles $AFA\u2032$ and $BFB\u2032$).',
        },
        {
          label: 'Read the three magnitude ratios',
          formula: '\\left|\\frac{BD}{DC}\\right| = \\frac{BB\u2032}{CC\u2032}, \\quad \\left|\\frac{CE}{EA}\\right| = \\frac{CC\u2032}{AA\u2032}, \\quad \\left|\\frac{AF}{FB}\\right| = \\frac{AA\u2032}{BB\u2032}',
          explanation: 'Similar triangles pay out ratios of corresponding sides: the hypotenuses lying along the side line pair with the perpendicular legs, so $|BD|/|DC| = BB\u2032/CC\u2032$, and cycling the landing points gives the other two readings. Each perpendicular is a pure HEIGHT \u2014 exactly the quantity Ceva\u2019s area proof traded in, now measured towards the transversal itself instead of towards a meeting point.',
        },
        {
          label: 'Multiply \u2014 the heights telescope',
          formula: '\\left|\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB}\\right| = \\frac{BB\u2032}{CC\u2032} \\cdot \\frac{CC\u2032}{AA\u2032} \\cdot \\frac{AA\u2032}{BB\u2032} = 1',
          explanation: 'Each height appears once on top and once underneath: $BB\u2032$, $CC\u2032$ and $AA\u2032$ all cancel against themselves. The MAGNITUDE of the directed product is exactly $1$ \u2014 the same telescoping craft as Ceva\u2019s area proof, with three perpendiculars in place of three pairs of sub-triangles. Nothing survives the cancellation but the number 1.',
        },
        {
          label: 'The sign census',
          formula: '\\text{outside count} \\in \\{1, 3\\} \\;\\Rightarrow\\; \\text{an odd number of negative ratios}',
          explanation: 'Now the signs. The triangle\u2019s boundary is a closed convex curve, so a line meets it in exactly two points or in none at all \u2014 never once, never three times. Two crossings put two of $D$, $E$, $F$ ON the side segments and one outside; no crossings put all three outside. Either way the outside count is ODD, and by the sign law each outside point contributes exactly one negative ratio.',
        },
        {
          label: 'Combine magnitude with sign',
          formula: '\\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = -1',
          explanation: 'Magnitude 1, sign $(-1)^{\\text{odd}} = -1$: the directed product is exactly $-1$. The engine certifies both branches on real coordinates \u2014 the pinned witness below (one outside point, $(-1/2)(2)(1) = -1$) and the missing line of the next section (three outside points, $(-1/3)(-4)(-3/4) = -1$).',
        },
      ],
      result: 'Three side-points carried by one transversal force the directed product $-1$. The converse rides the same recovery map as Ceva\u2019s: given the product $-1$ at finite points, draw the line through two of them, let it meet the third side line at $F\u2032$, apply the forward theorem to the new triple and compare \u2014 equal ratios force $F\u2032 = F$, so the given three are aligned.',
    },
    {
      kind: 'para',
      text: 'The pinned witness keeps the SAME triangle $A(0,0)$, $B(12,0)$, $C(0,9)$ \u2014 the duality deserves nothing less: one triangle, two verdicts. Choose the landing points this time as $D(24, -9)$ on the line $BC$ BEYOND $B$, $E(0, 3)$ on $CA$ and $F(6, 0)$ on $AB$. The directed ratios read $-1/2$, $2$ and $1$: at $D$ the distances are $BD = 15$ and $DC = 30$ with the point outside, so the directed ratio is $-15/30 = -1/2$; at $E$ and $F$ the points sit between their endpoints, so those ratios are plain positive numbers. The product is $(-1/2)(2)(1) = -1$, and Menelaus pronounces the three points aligned \u2014 on the line $y = -x/2 + 3$, as the figure shows and the Illustration below verifies by slope and by substitution. The engine behind the lesson certifies every number: the landing coordinates, the directed ratios, the product, and the alignment by equal slopes and by substitution, with no floating-point drift anywhere.',
    },
    {
      kind: 'figure',
      caption: 'The Menelaus witness. The same triangle A(0,0), B(12,0), C(0,9); the side BC extended beyond B to D(24, \u22129) with directed BD/DC = \u22121/2, E(0,3) on CA with CE/EA = 2, and F(6,0) on AB with AF/FB = 1. The directed product is (\u22121/2)(2)(1) = \u22121 and the three side-points lie on the transversal y = \u2212x/2 + 3 \u2014 the line that cuts two sides and one extension.',
      svg: geo35Menelaus(),
    },
    {
      kind: 'table',
      caption: 'The Menelaus witness ledger \u2014 directed ratios, exact coordinates and positions on the side lines',
      head: ['Point', 'Side line', 'Coordinates', 'Directed ratio', 'Position'],
      rows: [
        ['D', 'BC, beyond $B$', '$(24, -9)$', '$BD/DC = -1/2$', 'outside \u2014 negative'],
        ['E', 'CA', '$(0, 3)$', '$CE/EA = 2$', 'between \u2014 positive'],
        ['F', 'AB', '$(6, 0)$', '$AF/FB = 1$', 'between \u2014 positive'],
        ['Product', 'all three', 'on the line $y = -x/2 + 3$', '$-\\frac{1}{2} \\cdot 2 \\cdot 1 = -1$', 'ALIGNED'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the ledger\u2019s last row as the duality in miniature. The very triangle that concurred at $(2,3)$ under the product $1$ now aligns under the product $-1$, and the only difference in the data is ONE minus sign \u2014 carried by the single point that moved outside the segment. That is the entire distance between Ceva and Menelaus: position, sign, verdict. The engine lands the alignment two independent ways, by equal slopes (each pair among $D$, $E$, $F$ gives slope $-1/2$) and by substitution into $y = -x/2 + 3$ (all three points satisfy it exactly), so the picture below is not an artist\u2019s impression \u2014 it is a computation drawn.',
    },
    {
      kind: 'example',
      title: 'On the witness triangle A(0,0), B(12,0), C(0,9), the point D(24,\u22129) lies on the line BC beyond B, E(0,3) lies on CA and F(6,0) lies on AB. Compute the three directed ratios, apply Menelaus\u2019s test, and confirm the alignment by finding the line through the three points.',
      steps: [
        'Sol. The ratio at $D$ by distances: $BD = \\sqrt{(24 - 12)^2 + (-9 - 0)^2} = \\sqrt{144 + 81} = 15$ and $DC = \\sqrt{(24 - 0)^2 + (-9 - 9)^2} = \\sqrt{576 + 324} = 30$.',
        'Now, the sign: $D$ sits beyond $B$ on the line $BC$, so the ratio is directed-negative: $BD/DC = -15/30 = -1/2$.',
        'Take the two interior landings: $CE = 9 - 3 = 6$ and $EA = 3$, so $CE/EA = 2$; and $AF = 6$, $FB = 6$, so $AF/FB = 1$.',
        'Multiply: $\\left(-\\frac{1}{2}\\right)(2)(1) = -1$ \u2014 Menelaus\u2019s test passes, so $D$, $E$ and $F$ lie on one straight line.',
        'Find the line: the slope from $E(0,3)$ to $F(6,0)$ is $\\frac{0 - 3}{6 - 0} = -\\frac{1}{2}$ with intercept $3$, so the candidate is $y = -x/2 + 3$.',
        'Check $D$ by substitution: $-24/2 + 3 = -12 + 3 = -9$ \u2014 exactly $D$\u2019s $y$-coordinate; the remaining slopes agree too, since slope$(F, D) = \\frac{-9 - 0}{24 - 6} = -\\frac{9}{18} = -\\frac{1}{2}$ and slope$(D, E) = \\frac{3 - (-9)}{0 - 24} = -\\frac{12}{24} = -\\frac{1}{2}$.',
        'Hence the three side-points are aligned on $y = -x/2 + 3$: one outside point, one negative ratio, product $-1$ \u2014 the exact mirror of the Ceva witness that concurred at $(2,3)$.',
      ],
      figures: [
        {
          caption: 'Solution figure \u2014 the transversal walk: the slope triangles reading \u22123/6 and \u22129/18, both equal to \u22121/2, and the substitution landing of all three points on y = \u2212x/2 + 3 \u2014 the Menelaus verdict drawn for this solution.',
          svg: geo35Slope(),
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution: the minus sign is the whole mark',
      text: 'Examiners report that the lost mark on Menelaus questions is almost never the multiplication \u2014 it is the SIGN. The discipline is one sentence: a point outside its side segment contributes a negative ratio, and exactly the outside points do. When a transversal cuts two sides and one extension, the extension\u2019s point carries the minus; when a line misses the triangle entirely, all three carry it. Write the sign the moment you identify the position \u2014 before any arithmetic \u2014 and the product takes care of itself: $-1$ for alignment, never $+1$.',
    },

    /* -------------------------------------------------------------- */
    /* 8. the sign census — the odd count outside                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The sign census: the odd count outside' },
    {
      kind: 'para',
      text: 'The sign law has earned its place in the statement; now see the arithmetic that stands behind it. The boundary of a triangle is a closed convex curve, and a straight line meets such a curve in exactly two points or in none \u2014 every crossing is an entry paired with an exit. Translate that into the language of the three side-points $D$, $E$, $F$: a crossing line puts exactly TWO of them on the side segments (and pushes the third outside), while a missing line puts NONE of them on the segments (all three sit outside on extensions). The outside count is therefore always $1$ or $3$ \u2014 odd \u2014 and since each outside point contributes exactly one negative directed ratio, the product of the three ratios always carries an odd number of minus signs. That is why the verdict is $-1$ and can never be $+1$: parity, not convention.',
    },
    {
      kind: 'para',
      text: 'Both branches deserve a witness, and the engine supplies both. The pinned Menelaus witness above is the crossing branch: the line $y = -x/2 + 3$ enters through side $CA$ at $E(0,3)$ and leaves through $AB$ at $F(6,0)$, so the third meeting is pushed outside \u2014 $D(24, -9)$ beyond $B$ \u2014 and exactly one ratio is negative. For the missing branch, slide the transversal down: the parallel line $y = -x/2 - 3$ clears the triangle entirely, meeting the line $AB$ at $(-6, 0)$, the line $CA$ at $(0, -3)$ and the line $BC$ at $(48, -27)$ \u2014 every single meeting outside its segment. The directed ratios come out $-1/3$, $-4$ and $-3/4$, three negatives, and the product is still exactly $(-1/3)(-4)(-3/4) = -1$. Exercise 8 walks every one of those landings; the census holds on both branches.',
    },
    {
      kind: 'list',
      marker: 'disc',
      items: [
        'A CROSSING transversal: the line enters through one side and leaves through another \u2014 two points on the segments, one outside, ONE negative ratio. The pinned witness is this case: $D$ beyond $B$ carries the only minus.',
        'A MISSING line: the line clears the triangle entirely \u2014 zero points on the segments, three outside, THREE negative ratios. The line $y = -x/2 - 3$ is this case, with product $(-1/3)(-4)(-3/4) = -1$.',
        'The IMPOSSIBLE censuses: zero outside (the line would have to cross all three side segments \u2014 three boundary crossings) or two outside (a lone crossing) \u2014 both forbidden by the entry-exit pairing of a closed convex boundary.',
      ],
    },
    {
      kind: 'para',
      text: 'The census gives you a free examination reflex, worth stating as a rule: a claimed alignment of three INTERIOR side-points is always false, because it would demand an even outside count of zero. If a problem hands you three points all sitting between their endpoints and asks whether they are aligned, the answer is no before any multiplication \u2014 some point must move outside for the product to reach $-1$. Ceva\u2019s theorem, by contrast, is perfectly content with three interior landings: its product is positive, its census is empty, and its points stay home.',
    },

    /* -------------------------------------------------------------- */
    /* 9. the duality read — F4 + the duality table                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The duality: one trio of ratios, two verdicts' },
    {
      kind: 'para',
      text: 'Stand the two witnesses side by side and the lesson\u2019s signature structure appears. The twin panels below draw them on the SAME triangle $A(0,0)$, $B(12,0)$, $C(0,9)$: on the left, the Ceva configuration with ratios $2$, $3/2$ and $1/3$, product $1$, and three cevians squeezing through the single point $O(2,3)$; on the right, the Menelaus configuration with directed ratios $-1/2$, $2$ and $1$, product $-1$, and three side-points riding the single transversal $y = -x/2 + 3$. The side lines are identical, the ratio notation is identical, the multiplication is identical \u2014 and the verdicts are opposite in both kind and sign: agreement versus alignment, $+1$ versus $-1$.',
    },
    {
      kind: 'figure',
      caption: 'The duality twin. Left: the Ceva configuration on the witness triangle \u2014 ratios 2, 3/2, 1/3 with product +1, three cevians through ONE point O(2,3). Right: the Menelaus configuration on the same triangle \u2014 directed ratios \u22121/2, 2, 1 with product \u22121, three side-points on ONE transversal. The same trio of side lines, read two ways.',
      svg: geo35Duality(),
    },
    {
      kind: 'table',
      caption: 'The duality census \u2014 the same three ratios, read for concurrence or for alignment',
      head: ['Aspect', 'Ceva (concurrence)', 'Menelaus (alignment)'],
      rows: [
        ['The question', 'do three cevians share ONE point?', 'do three side-points lie on ONE line?'],
        ['The verdict', 'product $+1$ \u2014 CONCURRENT', 'directed product $-1$ \u2014 COLLINEAR'],
        ['The ratios used', 'plain ratios, all landings between', 'directed ratios, sign by position'],
        ['The proof engine', 'area telescoping around the meeting point', 'perpendicular heights to the transversal'],
        ['The sign census', 'no signs needed \u2014 three interior landings', 'an ODD number of points outside (1 or 3)'],
        ['The converse trick', 'recovery map $t = r/(1+r)$', 'the same recovery map'],
        ['The classical instance', 'the medians at the centroid', 'the witness transversal of this lesson'],
      ],
    },
    {
      kind: 'para',
      text: 'Why does ONE sign flip the geometry so completely? Because the two theorems count the same data against different backdrops. Ceva asks the side ratios to RECONCILE three lines through a common point \u2014 an inherently positive, constructive demand, met when the product of the landings balances at $1$. Menelaus asks them to RECONCILE three points on a common line \u2014 and a line set against a closed triangle must break its boundary an even number of times, forcing the odd outside count and with it the negative product. The recovery map $t = r/(1+r)$ powers both converses, which is the final hint that the pair is one machine: invert the ratio, recover the point, compare with the constructed competitor. Study the two derivations together and you will find the same skeleton wearing two sign conventions.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'The signature synthesis: 1 versus \u22121',
      text: 'Here is the lesson\u2019s one-line soul. THE SAME THREE RATIOS $(BD/DC)(CE/EA)(AF/FB)$ decide both questions a triangle can ask about three side-points \u2014 multiply them plain and compare with $1$ to learn whether the cevians agree; multiply them directed and compare with $-1$ to learn whether the points align. The sign flip is not a convention bolted on afterwards: it is the census of outside points, forced by the geometry of a straight line against a closed triangle. Ceva and Menelaus are one theorem wearing two signs.',
    },

    /* -------------------------------------------------------------- */
    /* 10. history                                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'History: the king who proved it first' },
    {
      kind: 'para',
      text: 'The printed history of the concurrence test is Italian and surprisingly recent; the true history is older, royal and very nearly lost. The alignment test is older still, and it reaches us through a chain of translations that spans the whole medieval Mediterranean. Both stories are worth five minutes of any geometer\u2019s time \u2014 they are a reminder that the tidy two-theorem pair in this lesson was assembled across roughly nineteen centuries.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Ceva, ibn Hud, and the proposition on the secants',
      text: 'Giovanni Ceva (1648\u20131734), an Italian geometer and hydraulic engineer, published the concurrence theorem in his 1678 booklet De lineis rectis, and the result has carried his name ever since. But a proof was known centuries earlier to Yusuf Al-Mu\u2019taman ibn Hud, the eleventh-century scholar-king of Zaragoza, whose mathematical miscellany contains the theorem essentially in its modern form; his work fell into oblivion and was rediscovered only in 1985. The alignment test is older still: it survives as a lemma in the Sphaerica of Menelaus of Alexandria (c. 100 CE), a work on spherical geometry whose Greek original is lost and which reaches us through Arabic translations \u2014 Ptolemy already applied the plane lemma in the Almagest. Islamic-era geometers knew it as the \u201cproposition on the secants\u201d (shakl al-qatta\u2019), and Thabit ibn Qurra wrote a treatise on the figure of secants. One theorem from a king of Zaragoza, one from Hellenistic Alexandria: the pair brackets a thousand years of transmission.',
    },

    /* -------------------------------------------------------------- */
    /* 11. the examination corner                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The examination corner' },
    {
      kind: 'para',
      text: 'In examinations these two theorems arrive in a small number of costumes, and each costume has a fixed best answer. This closing corner names them so that nothing in the hall surprises you: the decision, the manufacture and the sign trap. Notice how every one of them is answered by the same two moves \u2014 multiply the ratios, compare with the verdict number \u2014 plus, for the manufacture, the recovery map that turns a ratio back into a point.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'The examiner\u2019s three questions',
      text: 'Expect exactly three shapes of question. (1) The DECISION: three ratios given \u2014 multiply and compare; $1$ means concurrent, directed $-1$ means aligned. Always show the product line; a bare verdict without the multiplication earns nothing. (2) The MANUFACTURE: two ratios given, choose the third to force the verdict \u2014 solve the product equation, then recover the point with $t = r/(1+r)$ and state it. (3) The SIGN TRAP: a point on an extension \u2014 the directed minus is precisely the mark the scheme deducts. Two instant checks before you hand in: midpoints give $1 \\cdot 1 \\cdot 1 = 1$ (the centroid, always concurrent), and a claimed alignment of three interior points is impossible \u2014 some point must sit outside. When you invoke Ceva\u2019s converse, name the all-parallel caveat; one clause, full marks.',
    },

    /* -------------------------------------------------------------- */
    /* 12. the revision shelf — terms + formula cards                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The revision shelf: terms and formula cards' },
    {
      kind: 'para',
      text: 'Before the quiz and the exercises, collect the lesson\u2019s working vocabulary in one place. Each term below is used exactly as this chapter uses it \u2014 the ratio convention in particular is the chapter\u2019s own, so reread that entry until it is reflex. The formula cards that follow are the three results to carry out of the lesson cold, plus the one-piece machine that powers both converse proofs.',
    },
    {
      kind: 'terms',
      items: [
        {
          term: 'cevian',
          def: 'A segment from one vertex of a triangle to a point on the opposite side line (or its extension); $AD$ is a cevian from $A$ when $D$ lies on the line $BC$. The medians, the altitudes and the internal angle bisectors are all cevian families.',
        },
        {
          term: 'Ceva\u2019s theorem',
          def: 'The cevians $AD$, $BE$, $CF$ of triangle $ABC$ are concurrent if and only if $(BD/DC)(CE/EA)(AF/FB) = 1$, each ratio read in its own side\u2019s direction; the converse holds with the all-parallel caveat named.',
        },
        {
          term: 'Menelaus\u2019s theorem',
          def: 'Points $D$, $E$, $F$ on the lines $BC$, $CA$, $AB$ of a triangle are collinear if and only if the directed product $(BD/DC)(CE/EA)(AF/FB) = -1$.',
        },
        {
          term: 'directed ratio',
          def: 'The ratio $XP/PY$ of a point $P$ on the line $XY$, signed by the side\u2019s own direction: positive between the endpoints, negative outside; in parameters $r = t/(1-t)$, inverted by the recovery map $t = r/(1+r)$.',
        },
        {
          term: 'concurrence',
          def: 'The property of three or more lines passing through one common point; for cevians it is certified by Ceva\u2019s product $1$, and the meeting point of the medians is the centroid.',
        },
        {
          term: 'collinearity',
          def: 'The property of three or more points lying on one straight line; for side-points of a triangle it is certified by Menelaus\u2019s directed product $-1$.',
        },
        {
          term: 'transversal',
          def: 'A line cutting the side lines of a figure; for a triangle it meets the three side lines at the Menelaus points, with an odd number of them outside the segments.',
        },
        {
          term: 'centroid',
          def: 'The concurrence point of the three medians \u2014 Ceva\u2019s product $1$ in its purest form; on the witness triangle it is the point $(4, 3)$, and it divides each median $2 : 1$, the split Lesson 3.6 develops.',
        },
        {
          term: 'area telescoping',
          def: 'The proof craft of converting side ratios into ratios of triangle areas (or of heights) that cancel in pairs when multiplied \u2014 the engine of both this lesson\u2019s derivations.',
        },
      ],
    },
    {
      kind: 'formula',
      name: 'Ceva\u2019s theorem \u2014 the concurrency product',
      latex: '\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB} = 1',
      note: 'Cevians $AD$, $BE$, $CF$ of a triangle are concurrent iff the product of the three side ratios equals $1$; each ratio in its own side\u2019s direction, the converse with the all-parallel caveat.',
    },
    {
      kind: 'formula',
      name: 'Menelaus\u2019s theorem \u2014 the directed collinearity product',
      latex: '\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB} = -1',
      note: 'Side-points $D$, $E$, $F$ on the lines $BC$, $CA$, $AB$ are collinear iff the DIRECTED product is $-1$: between positive, outside negative, an odd number of points outside.',
    },
    {
      kind: 'formula',
      name: 'The median case \u2014 the centroid',
      latex: '1 \\cdot 1 \\cdot 1 = 1',
      note: 'Midpoints have ratio $1$ each, so the medians are concurrent at the centroid \u2014 the instant calibration of Ceva\u2019s test; the $2 : 1$ split belongs to Lesson 3.6.',
    },
    {
      kind: 'formula',
      name: 'The recovery map \u2014 ratio to point',
      latex: 't = \\frac{r}{1 + r}',
      note: 'A directed ratio $r$ on a side returns the landing parameter $t$ along that side; the inverse of $r = t/(1-t)$ and the engine of both converse proofs.',
    },

    /* -------------------------------------------------------------- */
    /* 13. quiz                                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Check yourself: the five-question census' },
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Cevians $AD$, $BE$, $CF$ of triangle $ABC$ land with $BD/DC = 2$, $CE/EA = 3/2$ and $AF/FB = 1/3$. The Ceva product test pronounces the trio concurrent precisely when the product \u2014',
          options: [
            'equals 0, because three ratios in perfect balance cancel to nothing',
            'equals 1, because (2)(3/2)(1/3) = 1 and the test compares with 1',
            'equals 2, the largest of the three ratios',
            'equals the sum of the three ratios',
          ],
          answer: 1,
          explain: 'Ceva\u2019s census reads only the product: $(2)(3/2)(1/3) = 3/3 = 1$, and the verdict number for concurrence is exactly $1$ \u2014 so the trio is concurrent (it is the lesson\u2019s witness, meeting at $(2,3)$). Option (a) confuses a balanced product with a vanishing one: nothing in the machinery sums to zero, and a product of positive ratios can never be $0$. Option (c) has no licensed source \u2014 the test never compares with a ratio, only with the number 1. Option (d) invents an additive test; the whole force of Ceva is that the criterion is MULTIPLICATIVE, which is why reciprocals pair off and cancel.',
        },
        {
          q: 'Three side-points of a triangle carry directed ratios $-1/2$, $2$ and $1$. Menelaus\u2019s test certifies alignment exactly when the directed product \u2014',
          options: [
            'equals \u22121, because (\u22121/2)(2)(1) = \u22121 and the directed test compares with \u22121',
            'equals 1, as in Ceva\u2019s test',
            'equals 0, because the signs cancel out',
            'equals 3, the count of side-points',
          ],
          answer: 0,
          explain: 'The directed product is $(-1/2)(2)(1) = -1$, and Menelaus\u2019s verdict number for alignment is exactly $-1$ \u2014 this is the lesson\u2019s Menelaus witness, the three points riding $y = -x/2 + 3$. Option (b) applies Ceva\u2019s number to the wrong theorem: concurrence and alignment have opposite verdicts, and mixing them is the classic examination slip. Option (c) misunderstands signs \u2014 one negative factor makes the product negative, it does not vanish; signs cancel only in PAIRS, and here there is just one minus. Option (d) counts points instead of multiplying ratios; the census is multiplicative, never a tally.',
        },
        {
          q: 'Under the directed sign law, a point $P$ on the line $XY$ lying BEYOND the endpoint $Y$ has directed ratio $XP/PY$ \u2014',
          options: [
            'positive, because distances are never negative',
            'zero, because $P$ has passed the end of the segment',
            'negative, because $P$ is outside the segment and the sign law charges it a minus',
            'positive or negative depending on which side is longer',
          ],
          answer: 2,
          explain: 'The sign law reads position, not length: travelling $X$ to $Y$, a point between the endpoints pays a positive ratio and a point outside pays a negative one, so beyond $Y$ the ratio $XP/PY$ is negative \u2014 in parameters, $t > 1$ makes $1 - t < 0$ in $r = t/(1-t)$. Option (a) confuses directed lengths with plain distances; the whole point of the convention is that lengths CARRY a sign. Option (b) mistakes \u201cbeyond the end\u201d for \u201cat the end\u201d: $P = Y$ itself is the excluded vertex case, and no finite outside point gives $0$. Option (d) invents a length test; the sign depends only on position relative to the two endpoints, never on which piece is longer.',
        },
        {
          q: 'The three medians of any triangle pass Ceva\u2019s test with product $1 \\cdot 1 \\cdot 1$, so their concurrence point is the \u2014',
          options: [
            'incenter, the meeting point of the angle bisectors',
            'orthocenter, the meeting point of the altitudes',
            'circumcenter, the centre of the circumscribed circle',
            'centroid, which divides each median 2 : 1 from vertex to midpoint',
          ],
          answer: 3,
          explain: 'Each midpoint ratio is $1$, the product is $1 \\cdot 1 \\cdot 1 = 1$, and the medians\u2019 meeting point is by definition the centroid \u2014 on the witness triangle, $G(4,3)$, riding each median two-thirds of the way down, i.e. in the ratio $2 : 1$. Option (a) names the bisectors\u2019 point, which also passes Ceva but with ratios $c/b$, not all $1$s. Option (b) names the altitudes\u2019 point; its ratios involve cosines and are not all equal. Option (c) names the perpendicular bisectors\u2019 point \u2014 a line family that is not even a cevian family, since those lines need not pass through vertices.',
        },
        {
          q: 'In triangle $ABC$, $D$ on $BC$ has $BD/DC = 3$ and $E$ on $CA$ has $CE/EA = 2$. For the cevians $AD$, $BE$, $CF$ to be concurrent, $F$ on $AB$ must have $AF/FB =$ \u2014',
          options: [
            '1/5, the difference of the two given ratios',
            '1/6, because 3 \u00d7 2 \u00d7 1/6 = 1',
            '6, the product of the two given ratios',
            '1, the midpoint ratio that always works',
          ],
          answer: 1,
          explain: 'Concurrence forces the product to $1$, so $3 \\cdot 2 \\cdot (AF/FB) = 1$ and $AF/FB = 1/6$ \u2014 the product test MANUFACTURES the third ratio, and the recovery map then places $F$ at $t = (1/6)/(7/6) = 1/7$ of the way from $A$ to $B$. Option (a) subtracts where the test multiplies; differences have no standing in the census. Option (c) multiplies but forgets to invert: the third ratio must be the reciprocal of the product of the first two, $1/(3 \\cdot 2)$, not $3 \\cdot 2$. Option (d) is the median reflex misapplied \u2014 the midpoint ratio $1$ works only when the first two ratios multiply to $1$, and here they multiply to $6$.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 14. exercises — 15 questions, L1..L6, full step solutions       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Exercises: the graded census' },
    {
      kind: 'para',
      text: 'Fifteen exercises in six grades, every one answered by the two moves of the lesson \u2014 multiply the ratios, compare with the verdict number \u2014 or by their converses. Levels L1 to L3 drill the product tests and the sign law on the witness triangle and on fresh triangles; L4 adds the parameter strip and the area dictionary; L5 and L6 mix Ceva with Menelaus, close with the centroid split that Lesson 3.6 will prove in general, and end on the complement map that turns one Menelaus line into another. Four solutions carry computed figures: the concurrency landing, the directed-sign strip and the complement twin among them. Work with a reason for every step; the census pays nothing on bare verdicts.',
    },
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the Ceva and Menelaus census',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'In triangle $ABC$, $D$ lies on $BC$ with $BD/DC = 3$ and $E$ lies on $CA$ with $CE/EA = 1/2$. Find the ratio $AF/FB$ that makes the cevians $AD$, $BE$, $CF$ concurrent, and state where $F$ sits on $AB$.',
              solution: [
                'Sol. Ceva\u2019s test: concurrence forces $(BD/DC)(CE/EA)(AF/FB) = 1$, so $3 \\cdot \\frac{1}{2} \\cdot \\frac{AF}{FB} = 1$.',
                'Now, solve for the third factor: $\\frac{AF}{FB} = \\frac{1}{3 \\cdot 1/2} = \\frac{1}{3/2} = \\frac{2}{3}$.',
                'Check by the recovery map: $t = \\frac{2/3}{1 + 2/3} = \\frac{2/3}{5/3} = \\frac{2}{5}$, so $F$ sits two-fifths of the way from $A$ to $B$.',
                'Hence $AF/FB = 2/3$, and the check product $3 \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} = \\frac{3}{2} \\cdot \\frac{2}{3} = 1$ closes the census exactly.',
              ],
              answer: '$AF/FB = 2/3$ ($F$ at $t = 2/5$ from $A$)',
            },
            {
              q: 'On the witness triangle $A(0,0)$, $B(12,0)$, $C(0,9)$, the point $D(4,6)$ lies on $BC$ and $E(0,3.6)$ lies on $CA$. Find the point $F$ on $AB$ for which $AD$, $BE$, $CF$ are concurrent, verify the concurrence by intersecting the first two cevians, and state the fraction of the way along each cevian at which the meeting point sits.',
              solution: [
                'Sol. Ratios first: $BD = \\sqrt{(12-4)^2 + (0-6)^2} = 10$ and $DC = \\sqrt{4^2 + 3^2} = 5$, so $BD/DC = 2$; and $CE = 9 - 3.6 = 5.4$ with $EA = 3.6$, so $CE/EA = 3/2$.',
                'Now, force the product: $2 \\cdot \\frac{3}{2} \\cdot \\frac{AF}{FB} = 1$ gives $\\frac{AF}{FB} = \\frac{1}{3}$, and the recovery map places $t = \\frac{1/3}{4/3} = \\frac{1}{4}$, so $F = A + \\frac{1}{4}(B - A) = (3, 0)$.',
                'Intersect the first two cevians: $AD$ is the line $y = \\frac{3}{2}x$, and $BE$ is $y = -\\frac{3}{10}x + \\frac{18}{5}$; equating gives $15x = -3x + 36$, so $x = 2$ and $y = 3$ \u2014 the meeting point is $O(2,3)$.',
                'Check the third: the line from $C(0,9)$ to $F(3,0)$ is $y = -3x + 9$, and $-3(2) + 9 = 3$, so $CF$ passes through the same $O(2,3)$.',
                'Hence $F = (3,0)$ and the cevians concur at $O(2,3)$, sitting halfway along $AD$ ($1/2$), five-sixths along $BE$ from $B$ ($5/6$) and two-thirds along $CF$ from $C$ ($2/3$) \u2014 three exact fractions, one point.',
              ],
              answer: '$F = (3, 0)$; concurrence at $O(2, 3)$, at fractions $1/2$, $5/6$, $2/3$ along the three cevians',
              figures: [
                {
                  caption: 'Solution figure \u2014 the concurrency landing: the meeting point O(2,3) marked with its exact cevian fractions 1/2 of AD, 5/6 of BE and 2/3 of CF \u2014 the product-1 configuration confirmed by direct intersection.',
                  svg: geo35Land(),
                },
              ],
            },
            {
              q: 'On the line $AB$ with $A(0,0)$ and $B(12,0)$, compute the directed ratio $AF/FB$ for each of the points $X(4,0)$, $Y(16,0)$ and $Z(-3,0)$, and state the position of each point relative to the segment $AB$.',
              solution: [
                'Sol. Use the parameter law: a point at coordinate $x$ on $AB$ has parameter $t = x/12$ and directed ratio $r = t/(1-t)$.',
                'Now, $X(4,0)$: $t = 4/12 = 1/3$, so $r = \\frac{1/3}{2/3} = \\frac{1}{2}$ \u2014 positive, so $X$ lies between $A$ and $B$.',
                'Next, $Y(16,0)$: $t = 16/12 = 4/3$, so $r = \\frac{4/3}{-1/3} = -4$ \u2014 negative, so $Y$ lies beyond $B$; and $Z(-3,0)$: $t = -3/12 = -1/4$, so $r = \\frac{-1/4}{5/4} = -\\frac{1}{5}$ \u2014 negative, so $Z$ lies beyond $A$.',
                'Hence the three directed ratios are $1/2$, $-4$ and $-1/5$: the sign alone reports the position, and the engine\u2019s sweep confirms the law at every parameter.',
              ],
              answer: '$1/2$ (between), $-4$ (beyond $B$), $-1/5$ (beyond $A$)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Prove by Ceva\u2019s theorem that the medians of any triangle are concurrent, and locate the concurrence point for the witness triangle $A(0,0)$, $B(12,0)$, $C(0,9)$.',
              solution: [
                'Sol. Let $D$, $E$, $F$ be the midpoints of $BC$, $CA$, $AB$ respectively. Each median lands at a midpoint, so every ratio is $1$: $BD/DC = 1$, $CE/EA = 1$ and $AF/FB = 1$.',
                'Now, Ceva: the product is $1 \\cdot 1 \\cdot 1 = 1$, so the medians are concurrent \u2014 the census law behind the centroid, in one line.',
                'Locate on the witness: the midpoints are $D(6, 4.5)$ of $BC$, $E(0, 4.5)$ of $CA$ and $F(6, 0)$ of $AB$.',
                'Intersect two medians: $AD$ from $(0,0)$ to $(6,4.5)$ is $y = 0.75x$, and $BE$ from $(12,0)$ to $(0,4.5)$ is $y = -0.375x + 4.5$; equating gives $1.125x = 4.5$, so $x = 4$ and $y = 3$.',
                'Hence the medians meet at the centroid $G(4, 3)$ \u2014 the coordinate average of the vertices \u2014 and the same product $1 \\cdot 1 \\cdot 1$ certifies the medians of EVERY triangle at a stroke.',
              ],
              answer: 'the medians are concurrent at the centroid $G(4, 3)$; Ceva product $1 \\cdot 1 \\cdot 1 = 1$',
            },
            {
              q: 'A line meets the lines $BC$, $CA$, $AB$ of a triangle at $D$, $E$, $F$ with directed ratios $BD/DC = -1/2$, $CE/EA = 2$ and $AF/FB = 1$. Which of the three points lies outside its side segment, where does it lie, and what does the product certify?',
              solution: [
                'Sol. Signs first: the only negative ratio is $BD/DC = -1/2$, so $D$ is the outside point on the line $BC$.',
                'Now, which side of the segment? A beyond-$B$ point has $|BD| < |DC|$ (its distance to $B$ is smaller than the whole run to $C$), giving a magnitude below $1$; a beyond-$C$ point gives a magnitude above $1$. Here the magnitude is $1/2$, so $D$ lies beyond $B$.',
                'The other two ratios, $2$ and $1$, are positive, so $E$ lies between $C$ and $A$ and $F$ lies between $A$ and $B$ \u2014 a crossing transversal with census one.',
                'Multiply: $(-1/2)(2)(1) = -1$ \u2014 exactly Menelaus\u2019s verdict number.',
                'Hence $D$ lies outside, beyond $B$ on the line $BC$, and the directed product $-1$ certifies that $D$, $E$ and $F$ sit on one straight line.',
              ],
              answer: '$D$ is outside, beyond $B$ on line $BC$; the product $-1$ certifies that $D$, $E$, $F$ are collinear',
            },
            {
              q: 'The cevians $AD$, $BE$, $CF$ of a triangle are concurrent, with landing ratios $BD/DC = x/3$, $CE/EA = 4/5$ and $AF/FB = 15/8$. Find $x$.',
              solution: [
                'Sol. Ceva: concurrence forces the product to $1$, so $\\frac{x}{3} \\cdot \\frac{4}{5} \\cdot \\frac{15}{8} = 1$.',
                'Now, assemble the constants: $\\frac{4}{5} \\cdot \\frac{15}{8} = \\frac{60}{40} = \\frac{3}{2}$, so the equation reads $\\frac{x}{3} \\cdot \\frac{3}{2} = \\frac{x}{2} = 1$.',
                'Hence $x = 2$, so the first landing ratio is $BD/DC = 2/3$.',
                'Check: $\\frac{2}{3} \\cdot \\frac{4}{5} \\cdot \\frac{15}{8} = \\frac{2 \\cdot 4 \\cdot 15}{3 \\cdot 5 \\cdot 8} = \\frac{120}{120} = 1$ \u2014 exact.',
              ],
              answer: '$x = 2$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'On the triangle $A(0,0)$, $B(8,0)$, $C(0,6)$, the line $y = -x/2 + 2$ meets the line $CA$ at $E$, the line $AB$ at $F$ and the line $BC$ at $D$. Find the three meeting points, compute the three directed ratios, and verify Menelaus\u2019s product.',
              solution: [
                'Sol. Landing points: on $CA$ (the line $x = 0$) the transversal gives $y = 2$, so $E = (0, 2)$; on $AB$ (the line $y = 0$) it gives $x = 4$, so $F = (4, 0)$.',
                'Now, on $BC$: the line $BC$ has equation $\\frac{x}{8} + \\frac{y}{6} = 1$, that is $3x + 4y = 24$; substituting $y = -x/2 + 2$ gives $3x - 2x + 8 = 24$, so $x = 16$ and $y = -6$: $D = (16, -6)$, beyond $B$.',
                'Directed ratios: $CE/EA = (6 - 2)/2 = 2$ and $AF/FB = 4/4 = 1$, both positive (interior landings); at $D$, $|BD| = \\sqrt{(16-8)^2 + (-6-0)^2} = \\sqrt{64 + 36} = 10$ and $|DC| = \\sqrt{(16-0)^2 + (-6-6)^2} = \\sqrt{256 + 144} = 20$, and $D$ is outside beyond $B$, so $BD/DC = -10/20 = -1/2$.',
                'Menelaus: $(-1/2)(2)(1) = -1$ \u2014 exactly the certifying product.',
                'Hence $D(16,-6)$, $E(0,2)$ and $F(4,0)$ all lie on the given line, and the census reads: one outside point, one negative ratio, product $-1$.',
              ],
              answer: '$D = (16, -6)$, $E = (0, 2)$, $F = (4, 0)$; directed product $(-1/2)(2)(1) = -1$',
            },
            {
              q: 'The line $y = -x/2 - 3$ misses the witness triangle $A(0,0)$, $B(12,0)$, $C(0,9)$ entirely. Find where it meets the three side lines, compute the three directed ratios, and explain why ALL THREE are negative.',
              solution: [
                'Sol. On $AB$ (the line $y = 0$): $-x/2 - 3 = 0$ gives $x = -6$, so the meeting point is $(-6, 0)$, beyond $A$.',
                'Now, on $CA$ (the line $x = 0$): $y = -3$, so the point is $(0, -3)$, beyond $A$ on the extension of $CA$; on $BC$ (the line $3x + 4y = 36$): substituting gives $x - 12 = 36$, so $x = 48$ and $y = -27$ \u2014 the point $(48, -27)$, beyond $B$.',
                'Directed ratios: on $AB$, $t = -6/12 = -1/2$ gives $AF/FB = \\frac{-1/2}{3/2} = -1/3$; on $CA$ in the direction $C$ to $A$, the point $(0,-3)$ sits at $t = 12/9 = 4/3$, giving $\\frac{4/3}{-1/3} = -4$; on $BC$, $(48,-27) = B + (-3)(C - B)$, so $t = -3$ and $BD/DC = \\frac{-3}{1 - (-3)} = -3/4$.',
                'All three points lie outside their segments \u2014 the line clears the triangle \u2014 so by the sign law all three ratios are negative: the missing branch of the census.',
                'Hence the product is $(-1/3)(-4)(-3/4) = -1$: three negative ratios, an odd count, and Menelaus certifies the alignment even though the line never enters the triangle.',
              ],
              answer: '$(-6, 0)$, $(0, -3)$, $(48, -27)$ with ratios $-1/3$, $-4$, $-3/4$; product $-1$',
            },
            {
              q: 'Explain why a straight line meeting the three side LINES of a triangle at non-vertex points always leaves an ODD number of the three points outside the side segments, and deduce that the number of negative directed ratios in Menelaus\u2019s product is odd.',
              solution: [
                'Sol. The boundary of a triangle is a closed convex curve: a line not passing through a vertex crosses it either TWICE or NOT AT ALL, because every crossing is an entry paired with an exit.',
                'Now, count: each crossing point lies on a side segment, so the line meets the side segments in exactly $2$ points or in $0$ points. Since the three side lines are met at $D$, $E$ and $F$, the number of points ON the segments is $2$ or $0$.',
                'So the number OUTSIDE is $3 - 2 = 1$ or $3 - 0 = 3$ \u2014 odd in both cases. (The degenerate middle option, a crossing at a vertex, is excluded by the hypothesis that no landing point is a vertex.)',
                'By the sign law, each outside point contributes exactly one negative ratio, so Menelaus\u2019s product carries an odd number of minus signs \u2014 and since the magnitudes telescope to $1$, the product is exactly $-1$.',
                'Hence the census: one outside point for a crossing transversal, three for a missing line \u2014 never zero, never two.',
              ],
              answer: 'outside count is 1 or 3 (odd); the directed product is $-1$ in both cases',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'A point moves along the line $AB$; write $t$ for its parameter from $A$ ($t = 0$ at $A$, $t = 1$ at $B$), so its directed ratio is $r = t/(1-t)$. Evaluate $r$ at $t = -1/2$, $1/4$, $1/2$, $3/4$ and $4/3$, and state exactly where the sign flips.',
              solution: [
                'Sol. Substitute each parameter into $r = t/(1-t)$.',
                'Now, the first three: $t = -1/2$ gives $r = \\frac{-1/2}{3/2} = -\\frac{1}{3}$ (beyond $A$); $t = 1/4$ gives $r = \\frac{1/4}{3/4} = \\frac{1}{3}$ (between); $t = 1/2$ gives $r = \\frac{1/2}{1/2} = 1$ (the midpoint).',
                'Next, the last two: $t = 3/4$ gives $r = \\frac{3/4}{1/4} = 3$ (between); $t = 4/3$ gives $r = \\frac{4/3}{-1/3} = -4$ (beyond $B$).',
                'Hence $r = -1/3, 1/3, 1, 3, -4$ across the five parameters: the ratio is positive strictly between the endpoints and negative outside them.',
                'So the sign flips exactly at the endpoints $t = 0$ and $t = 1$ \u2014 at $A$ the denominator is $1$ (ratio $0$), and past $t = 1$ the denominator $1 - t$ turns negative.',
              ],
              answer: '$r = -1/3, 1/3, 1, 3, -4$; the sign flips only at the endpoints $t = 0$ and $t = 1$',
              figures: [
                {
                  caption: 'Solution figure \u2014 the directed-sign strip: the parameter line AB with the between-zone tinted positive and both outside zones negative, the five sample parameters marked with their ratios \u2014 the two sign flips sit exactly at the endpoints.',
                  svg: geo35Strip(),
                },
              ],
            },
            {
              q: 'Three points on the side lines of a triangle carry directed ratios $BD/DC = -2/3$, $CE/EA = 3/4$ and $AF/FB = x$, and the three are aligned. Find $x$.',
              solution: [
                'Sol. Menelaus: alignment forces the directed product to $-1$, so $(-2/3)(3/4)x = -1$.',
                'Now, assemble the constants: $(-2/3)(3/4) = -6/12 = -1/2$, so the equation reads $-\\frac{x}{2} = -1$.',
                'Hence $x = 2$, so $AF/FB = 2$ \u2014 a point between $A$ and $B$.',
                'Check the census: one negative ratio already ($D$ outside), so exactly one point is outside and the other two, including $F$, sit between their endpoints \u2014 consistent with $x = 2 > 0$; and $(-2/3)(3/4)(2) = -1$ exactly.',
              ],
              answer: '$x = 2$',
            },
            {
              q: 'Cevians through an interior point $O$ of a triangle cut it into six sub-triangles with $[OAB] = 18$ and $[OCA] = 9$. Deduce the ratio $BD/DC$ at which the cevian $AD$ meets $BC$.',
              solution: [
                'Sol. The telescoping identity reads side ratios straight off the areas around $O$: $BD/DC = [ABO]/[ACO]$, the two small triangles adjacent to the side $BC$.',
                'Now, substitute: $[OAB] = [ABO] = 18$ and $[OCA] = [ACO] = 9$, so $BD/DC = 18/9 = 2$.',
                'Why it is licensed: triangles $ABD$ and $ADC$ stand on the bases $BD$ and $DC$ and share the height from $A$, and triangles $OBD$ and $ODC$ share the height from $O$; subtracting the paired areas leaves $[ABO]$ over $[ACO]$ with the ratio intact \u2014 the subtraction step of the telescoping proof.',
                'Hence $BD/DC = 2$, the two-thirds point of $BC$ from $B$ \u2014 computed without ever locating the point $O$.',
              ],
              answer: '$BD/DC = 18/9 = 2$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'On the witness triangle $A(0,0)$, $B(12,0)$, $C(0,9)$, the centroid is $G(4,3)$. Show that the line $AG$ meets $BC$ at the midpoint of $BC$, and verify the $2 : 1$ split $AG : GD = 2 : 1$ that Lesson 3.6 develops in general.',
              solution: [
                'Sol. The line $AG$ runs from $(0,0)$ through $(4,3)$, so its equation is $y = \\frac{3}{4}x$.',
                'Now, meet it with $BC$: the line $BC$ has equation $3x + 4y = 36$; substituting $y = \\frac{3}{4}x$ gives $3x + 3x = 36$, so $x = 6$ and $y = 4.5$ \u2014 the meeting point is $(6, 4.5)$.',
                'That point is exactly the midpoint of $BC$, since $\\frac{B + C}{2} = \\frac{(12,0) + (0,9)}{2} = (6, 4.5)$ \u2014 so the line $AG$ IS the median from $A$, as the centroid\u2019s definition demands.',
                'Now, the split: $G = (4, 3) = \\frac{2}{3}(6, 4.5)$, so $G$ sits two-thirds of the way from $A$ to the midpoint $D$, giving $AG : GD = \\frac{2}{3} : \\frac{1}{3} = 2 : 1$.',
                'Hence the centroid rides each median at the $2 : 1$ point \u2014 the split 3.6 proves for every triangle; here it is verified on the witness by direct computation, and the same check succeeds on the other two medians.',
              ],
              answer: 'the meeting point is the midpoint $(6, 4.5)$; $AG : GD = 2 : 1$',
            },
            {
              q: 'Cevians $AD$, $BE$, $CF$ are concurrent at an interior point $O$ with $BD/DC = 3$ and $CE/EA = 1/2$. Find $AF/FB$, and determine the area ratio $[OAB] : [OBC] : [OCA]$.',
              solution: [
                'Sol. Ceva first: $3 \\cdot \\frac{1}{2} \\cdot \\frac{AF}{FB} = 1$ gives $AF/FB = \\frac{2}{3}$.',
                'Now, the telescoping dictionary: $BD/DC = [OAB]/[OCA]$, $CE/EA = [OBC]/[OAB]$ and $AF/FB = [OCA]/[OBC]$.',
                'Set $[OCA] = z$; then $[OAB] = 3z$ from the first ratio, and $[OBC] = \\frac{1}{2}[OAB] = \\frac{3}{2}z$ from the second.',
                'Check with the third: $\\frac{[OCA]}{[OBC]} = \\frac{z}{3z/2} = \\frac{2}{3}$ \u2014 exactly the Ceva value, so the dictionary is consistent.',
                'Hence $AF/FB = 2/3$ and $[OAB] : [OBC] : [OCA] = 3z : \\frac{3}{2}z : z = 6 : 3 : 2$, eleven parts in all.',
              ],
              answer: '$AF/FB = 2/3$; $[OAB] : [OBC] : [OCA] = 6 : 3 : 2$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The MIDPOINT COMPLEMENT reflects each landing point of a Ceva or Menelaus configuration in the midpoint of its own side. (a) Apply it to the Menelaus witness $D(24,-9)$, $E(0,3)$, $F(6,0)$ on the triangle $A(0,0)$, $B(12,0)$, $C(0,9)$ and show the new triple is again Menelaus. (b) Apply it to the Ceva witness $D(4,6)$, $E(0,3.6)$, $F(3,0)$ and find the new concurrence point.',
              solution: [
                'Sol. (a) The side midpoints are $M_{BC} = (6, 4.5)$, $M_{CA} = (0, 4.5)$ and $M_{AB} = (6, 0)$; reflecting $P$ in $M$ gives $P\u2032 = 2M - P$.',
                'Now, $D\u2032 = 2(6, 4.5) - (24, -9) = (-12, 18)$, $E\u2032 = 2(0, 4.5) - (0, 3) = (0, 6)$, and $F\u2032 = 2(6, 0) - (6, 0) = (6, 0)$ \u2014 the midpoint $F$ is its own complement.',
                'The ratios invert: $D\u2032$ lies beyond $C$ with directed ratio $BD\u2032/D\u2032C = -2$ (the reciprocal of $-1/2$), $CE\u2032/E\u2032A = 1/2$ (reciprocal of $2$) and $AF\u2032/F\u2032B = 1$; the product is $(-2)(1/2)(1) = -1$ \u2014 Menelaus again, as it must be, since $-1$ is its own reciprocal.',
                'Indeed the new points are collinear on $y = -x + 6$: substituting gives $-(-12) + 6 = 18$, $-0 + 6 = 6$ and $-6 + 6 = 0$ \u2014 all three land exactly.',
                '(b) The Ceva witness complements to $D\u2032 = (8, 3)$, $E\u2032 = (0, 5.4)$ and $F\u2032 = (9, 0)$, with ratios $\\frac{1}{2}$, $\\frac{2}{3}$ and $3$ \u2014 each the reciprocal \u2014 and product $\\frac{1}{2} \\cdot \\frac{2}{3} \\cdot 3 = 1$, so the new cevians are concurrent.',
                'Locate the new meeting point: $AD\u2032$ is $y = \\frac{3}{8}x$ and $BE\u2032$ is $y = -\\frac{9}{20}x + 5.4$; equating gives $\\frac{33}{40}x = 5.4$, so $x = \\frac{72}{11}$ and $y = \\frac{27}{11}$.',
                'Hence the complement preserves both theorems \u2014 ratios invert, the products $1$ and $-1$ stay put, and the Ceva configuration re-concurs at $O\u2032 = (72/11, 27/11)$, where the engine lands all three lines.',
              ],
              answer: '(a) $D\u2032(-12, 18)$, $E\u2032(0, 6)$, $F\u2032(6, 0)$ with product $(-2)(1/2)(1) = -1$ on $y = -x + 6$; (b) ratios $(1/2)(2/3)(3) = 1$, concurrent at $(72/11, 27/11)$',
              figures: [
                {
                  caption: 'Solution figure \u2014 the complement map: the side BC extended both ways, the original Menelaus transversal y = \u2212x/2 + 3 through D, E, F and the complementary transversal y = \u2212x + 6 through D2(\u221212, 18), E2(0, 6) and the self-complement F \u2014 two alignments, one construction.',
                  svg: geo35Complement(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
