import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c31 = {
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
const f31 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo31 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo31Txt = (
  x: number, y: number, s: string,
  size = 13, color = c31.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f31}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo31Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c31.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo31Dot = (x: number, y: number, color = c31.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo31Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo31Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo31Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c31.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo31Line(x1, y1, x2, y2, color, w) + geo31Head(x2, y2, a, color, 8)
}

/** quadratic curve with an arrowhead aligned to the end tangent */
const geo31CurveArrow = (
  x1: number, y1: number, qx: number, qy: number, x2: number, y2: number,
  color = c31.orange, w = 2.4, dash = '',
): string => {
  const a = (Math.atan2(y2 - qy, x2 - qx) * 180) / Math.PI
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    geo31Head(x2, y2, a, color, 8)
}

/** arc on a circle (screen coords: 0 = east, negative = upward on screen) */
const geo31Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/** right-angle mark at a corner: screen corner point + two unit leg vectors */
const geo31RA = (cx: number, cy: number, ux: number, uy: number, vx: number, vy: number, s = 14, color = c31.ink): string =>
  `<path d="M ${(cx + ux * s).toFixed(1)} ${(cy + uy * s).toFixed(1)} L ${(cx + (ux + vx) * s).toFixed(1)} ${(cy + (uy + vy) * s).toFixed(1)} L ${(cx + vx * s).toFixed(1)} ${(cy + vy * s).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.6"/>`

const geo31Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** faint unit grid inside a rectangular plate */
const geo31Grid = (x0: number, x1: number, y0: number, y1: number, step: number, ox: number, oy: number, s: number): string => {
  const parts: string[] = []
  for (let gx = x0; gx <= x1; gx += step) {
    const X = ox + s * gx
    parts.push(geo31Line(X, oy - s * y0, X, oy - s * y1, c31.faint, 1.2))
  }
  for (let gy = y0; gy <= y1; gy += step) {
    const Y = oy - s * gy
    parts.push(geo31Line(ox + s * x0, Y, ox + s * x1, Y, c31.faint, 1.2))
  }
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* F1 — the correspondence diagram: both witness triangles, the three */
/* arrows A->A', B->C', C->B', right angles and side values            */
/* ------------------------------------------------------------------ */
const geo31Corr = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, 'TWO WITNESS TRIANGLES, ONE ORDERED CORRESPONDENCE', 13, c31.ink, 'middle', '700'))
  // T1: A(0,0), B(6,0), C(0,8) at scale 24, base y = 340
  const A1: [number, number] = [85, 340], B1: [number, number] = [229, 340], C1: [number, number] = [85, 148]
  parts.push(geo31Poly([A1, B1, C1], c31.green, 0.1, c31.green, 2.6))
  parts.push(geo31RA(85, 340, 1, 0, 0, -1))
  // T2: A'(0,0), B'(8,0), C'(0,6) at scale 24
  const A2: [number, number] = [415, 340], B2: [number, number] = [607, 340], C2: [number, number] = [415, 196]
  parts.push(geo31Poly([A2, B2, C2], c31.orange, 0.08, c31.orange, 2.6))
  parts.push(geo31RA(415, 340, 1, 0, 0, -1))
  // side values
  parts.push(geo31Txt(157, 362, '6', 13, c31.amber))
  parts.push(geo31Txt(61, 250, '8', 13, c31.amber))
  parts.push(geo31Txt(176, 238, '10', 13, c31.amber))
  parts.push(geo31Txt(511, 362, '8', 13, c31.amber))
  parts.push(geo31Txt(391, 272, '6', 13, c31.amber))
  parts.push(geo31Txt(528, 260, '10', 13, c31.amber))
  // vertex labels
  parts.push(geo31Txt(72, 358, 'A', 13, c31.ink))
  parts.push(geo31Txt(229, 362, 'B', 13, c31.ink))
  parts.push(geo31Txt(72, 144, 'C', 13, c31.ink))
  parts.push(geo31Txt(415, 362, 'A\u2032', 13, c31.orange))
  parts.push(geo31Txt(607, 362, 'B\u2032', 13, c31.orange))
  parts.push(geo31Txt(403, 188, 'C\u2032', 13, c31.orange))
  // correspondence arrows
  parts.push(geo31CurveArrow(89, 352, 250, 424, 411, 352, c31.orange, 2.4))
  parts.push(geo31CurveArrow(85, 140, 300, 36, 603, 330, c31.orange, 2.4))
  parts.push(geo31Arrow(233, 336, 411, 200, c31.amber, 2.4))
  parts.push(geo31Txt(250, 416, 'A \u2192 A\u2032', 13, c31.orange))
  parts.push(geo31Txt(222, 98, 'C \u2192 B\u2032', 13, c31.orange))
  parts.push(geo31Txt(334, 300, 'B \u2192 C\u2032', 13, c31.amber))
  // triangle tags
  parts.push(geo31Txt(160, 318, 'T1', 12.5, c31.tealInk, 'middle', '700'))
  parts.push(geo31Txt(515, 318, 'T2', 12.5, c31.tealInk, 'middle', '700'))
  return geo31Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* the perimeter-trap strip: two segmented bars of equal total length  */
/* (parameterised — F2 uses 24, Exercise 5 uses 20)                    */
/* ------------------------------------------------------------------ */
const geo31Strip = (o: {
  aria: string; title: string
  segsA: number[]; segsB: number[]; total: number
  nameA: string; nameB: string
  noteA: string; noteB: string; verdict: string
}): string => {
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, o.title, 13, c31.ink, 'middle', '700'))
  const sc = 520 / o.total
  const fills = [[c31.panel, c31.amber], [c31.panel2, c31.orange], [c31.white, c31.green]]
  const bar = (segs: number[], y: number, name: string): void => {
    let x = 60
    segs.forEach((s, i) => {
      const w = s * sc
      const [f, st] = fills[i % 3]
      parts.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="34" fill="${f}" stroke="${st}" stroke-width="2"/>`)
      parts.push(geo31Txt(x + w / 2, y + 22, String(s), 13, st, 'middle', '700'))
      x += w
    })
    parts.push(geo31Txt(44, y + 22, name, 13, c31.ink, 'middle', '700'))
  }
  bar(o.segsA, 52, o.nameA)
  bar(o.segsB, 150, o.nameB)
  parts.push(geo31Txt(320, 110, o.noteA, 12.5, c31.tealInk))
  parts.push(geo31Txt(320, 208, o.noteB, 12.5, c31.tealInk))
  parts.push(geo31Txt(320, 232, o.verdict, 13, c31.red, 'middle', '700'))
  // the shared-total bracket
  parts.push(geo31Line(60, 96, 580, 96, c31.faint, 1.2, '3 4'))
  parts.push(geo31Line(60, 140, 60, 96, c31.faint, 1.2, '3 4'))
  parts.push(geo31Line(580, 140, 580, 96, c31.faint, 1.2, '3 4'))
  return geo31Svg(640, 250, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* F3 — the rotation-arc witness: T1, its rot90 image, the quarter arc */
/* ------------------------------------------------------------------ */
const geo31RotArc = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, 'ROTATION BY 90 DEGREES PRESERVES EVERY DISTANCE', 13, c31.ink, 'middle', '700'))
  const ox = 310, oy = 330, s = 20
  parts.push(geo31Line(70, oy, 580, oy, c31.ink, 2))
  parts.push(geo31Line(ox, 390, ox, 80, c31.ink, 2))
  parts.push(geo31Txt(588, 334, 'x', 13, c31.ink))
  parts.push(geo31Txt(310, 72, 'y', 13, c31.ink))
  // T1: A(0,0), B(6,0), C(0,8)
  parts.push(geo31Poly([[ox, oy], [ox + 120, oy], [ox, oy - 160]], c31.green, 0.12, c31.green, 2.6))
  // image: (0,0), (0,6), (-8,0)
  parts.push(geo31Poly([[ox, oy], [ox, oy - 120], [ox - 160, oy]], c31.orange, 0.1, c31.orange, 2.6, '7 5'))
  // quarter-turn arc from (6,0) to (0,6)
  parts.push(geo31Arc(ox, oy, 120, 0, -Math.PI / 2, c31.orange, 2.5))
  parts.push(geo31Arc(ox, oy, 96, 0, -Math.PI / 2, c31.faint, 1.6, '4 4'))
  parts.push(geo31Head(ox, oy - 120, -90, c31.orange, 9))
  parts.push(geo31Txt(430, 232, '90\u00b0 turn', 13, c31.orange))
  // vertex labels
  parts.push(geo31Txt(296, 348, 'A (0, 0)', 13, c31.ink, 'end'))
  parts.push(geo31Txt(436, 352, 'B (6, 0)', 13, c31.ink, 'start'))
  parts.push(geo31Txt(296, 158, 'C (0, 8)', 13, c31.ink, 'end'))
  parts.push(geo31Txt(330, 196, 'B\u2032 (0, 6)', 13, c31.orange, 'start'))
  parts.push(geo31Txt(150, 352, 'C\u2032 (\u22128, 0)', 13, c31.orange))
  parts.push(geo31Dot(ox, oy, c31.ink, 4.5))
  parts.push(geo31Dot(430, 330, c31.green, 4))
  parts.push(geo31Dot(310, 170, c31.green, 4))
  parts.push(geo31Dot(310, 210, c31.orange, 4))
  parts.push(geo31Dot(150, 330, c31.orange, 4))
  return geo31Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F4 — the mirror: the line y = x folding T1 onto T2                  */
/* ------------------------------------------------------------------ */
const geo31Mirror = (o: { aria: string; title: string }): string => {
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, o.title, 13, c31.ink, 'middle', '700'))
  const ox = 170, oy = 350, s = 20
  // mirror line y = x through the origin
  parts.push(geo31Line(86, 434, 334, 186, c31.tealInk, 2.6))
  parts.push(geo31Txt(312, 180, 'y = x', 13, c31.tealInk, 'start', '700'))
  // T1: (0,0), (6,0), (0,8)
  parts.push(geo31Poly([[ox, oy], [ox + 120, oy], [ox, oy - 160]], c31.green, 0.12, c31.green, 2.6))
  // image: (0,0), (0,6), (8,0)
  parts.push(geo31Poly([[ox, oy], [ox, oy - 120], [ox + 160, oy]], c31.orange, 0.1, c31.orange, 2.6, '7 5'))
  // the two fold arrows (each perpendicular to the mirror, bisected by it)
  parts.push(geo31Arrow(290, 350, 170, 230, c31.amber, 2.4))
  parts.push(geo31Arrow(170, 190, 330, 350, c31.amber, 2.4))
  // labels
  parts.push(geo31Txt(158, 368, 'A', 13, c31.ink, 'end'))
  parts.push(geo31Txt(140, 388, 'A = A\u2032', 13, c31.orange, 'end'))
  parts.push(geo31Txt(296, 368, 'B (6, 0)', 13, c31.ink, 'start'))
  parts.push(geo31Txt(156, 178, 'C (0, 8)', 13, c31.ink, 'end'))
  parts.push(geo31Txt(158, 234, '(0, 6)', 13, c31.orange, 'end'))
  parts.push(geo31Txt(336, 388, '(8, 0)', 13, c31.orange, 'start'))
  parts.push(geo31Dot(ox, oy, c31.ink, 4.5))
  parts.push(geo31Dot(290, 350, c31.green, 4))
  parts.push(geo31Dot(170, 190, c31.green, 4))
  parts.push(geo31Dot(170, 230, c31.orange, 4))
  parts.push(geo31Dot(330, 350, c31.orange, 4))
  return geo31Svg(640, 460, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* the tile audit figure (Illustration 3)                              */
/* ------------------------------------------------------------------ */
const geo31Tiles = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, 'TWO TILES, THREE MEASUREMENTS EACH', 13, c31.ink, 'middle', '700'))
  // tile P: right angle at (70,250); legs 30 (horizontal), 40 (vertical), scale 3.2
  parts.push(geo31Poly([[70, 250], [166, 250], [70, 122]], c31.green, 0.1, c31.green, 2.6))
  parts.push(geo31RA(70, 250, 1, 0, 0, -1))
  parts.push(geo31Txt(118, 270, '30 cm', 13, c31.amber))
  parts.push(geo31Txt(52, 186, '40 cm', 13, c31.amber))
  parts.push(geo31Txt(140, 172, '50 cm', 13, c31.amber))
  parts.push(geo31Txt(150, 104, 'tile P', 13, c31.ink, 'middle', '700'))
  // tile Q: right angle at (390,250); legs 40 (horizontal), 30 (vertical)
  parts.push(geo31Poly([[390, 250], [518, 250], [390, 154]], c31.orange, 0.08, c31.orange, 2.6))
  parts.push(geo31RA(390, 250, 1, 0, 0, -1))
  parts.push(geo31Txt(454, 270, '40 cm', 13, c31.amber))
  parts.push(geo31Txt(374, 200, '30 cm', 13, c31.amber))
  parts.push(geo31Txt(474, 190, '50 cm', 13, c31.amber))
  parts.push(geo31Txt(490, 140, 'tile Q', 13, c31.ink, 'middle', '700'))
  parts.push(geo31Txt(320, 288, 'the legs are swapped, the hypotenuse is shared', 12.5, c31.tealInk))
  return geo31Svg(640, 300, aria, parts)
}

/* ------------------------------------------------------------------ */
/* the witness grid (Illustration 1): both triangles on faint unit     */
/* grids, side values, and the correspondence legend                   */
/* ------------------------------------------------------------------ */
const geo31WitnessGrid = (aria: string): string => {
  const s = 20, ox = 200, oy = 370
  const X = (x: number): number => ox + s * x
  const Y = (y: number): number => oy - s * y
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, 'THE SSS DISTANCE CHECK ON THE WITNESS PAIR', 13, c31.ink, 'middle', '700'))
  parts.push(geo31Grid(-2, 14, -2, 14, 2, ox, oy, s))
  parts.push(geo31Line(ox - s * 2 - 10, oy, ox + s * 14 + 10, oy, c31.ink, 2))
  parts.push(geo31Line(ox, oy + s * 2 + 10, ox, oy - s * 14 - 10, c31.ink, 2))
  parts.push(geo31Poly([[X(0), Y(0)], [X(6), Y(0)], [X(0), Y(8)]], c31.green, 0.12, c31.green, 2.6))
  parts.push(geo31Poly([[X(0), Y(0)], [X(8), Y(0)], [X(0), Y(6)]], c31.orange, 0.08, c31.orange, 2.6, '7 5'))
  parts.push(geo31RA(ox, oy, 1, 0, 0, -1))
  // side values: T1 (6, 8, 10) and T2 (8, 6, 10)
  parts.push(geo31Txt(260, 392, '6', 13, c31.amber))
  parts.push(geo31Txt(182, 292, '8', 13, c31.amber, 'end'))
  parts.push(geo31Txt(278, 298, '10', 13, c31.amber))
  parts.push(geo31Txt(286, 392, '8', 13, c31.amber))
  parts.push(geo31Txt(182, 254, '6', 13, c31.amber, 'end'))
  parts.push(geo31Txt(298, 318, '10', 13, c31.amber))
  // vertex labels
  parts.push(geo31Txt(186, 388, 'A = A\u2032', 13, c31.ink, 'end'))
  parts.push(geo31Txt(332, 374, 'B', 13, c31.ink, 'start'))
  parts.push(geo31Txt(200, 198, 'C', 13, c31.ink))
  parts.push(geo31Txt(372, 374, 'B\u2032', 13, c31.orange, 'start'))
  parts.push(geo31Txt(216, 246, 'C\u2032', 13, c31.orange, 'start'))
  // legend
  parts.push(geo31Txt(500, 140, 'correspondence', 12.5, c31.ink, 'start', '700'))
  parts.push(geo31Txt(500, 166, 'A \u2192 A\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(500, 190, 'B \u2192 C\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(500, 214, 'C \u2192 B\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(500, 248, 'side multiset', 12.5, c31.tealInk, 'start'))
  parts.push(geo31Txt(500, 272, '{6, 8, 10} both', 12.5, c31.tealInk, 'start'))
  parts.push(geo31Txt(500, 296, 'perimeter 24', 12.5, c31.tealInk, 'start'))
  parts.push(geo31Txt(500, 320, 'area 24', 12.5, c31.tealInk, 'start'))
  return geo31Svg(640, 430, aria, parts)
}

/* ------------------------------------------------------------------ */
/* the Exercise 4 grid: P(0,0) Q(5,0) R(0,12) against the swapped copy */
/* ------------------------------------------------------------------ */
const geo31Ex4Grid = (aria: string): string => {
  const s = 16, ox = 170, oy = 380
  const X = (x: number): number => ox + s * x
  const Y = (y: number): number => oy - s * y
  const parts: string[] = []
  parts.push(geo31Txt(320, 22, 'THE DISTANCE CHECK GRID FOR EXERCISE 4', 13, c31.ink, 'middle', '700'))
  parts.push(geo31Grid(-2, 14, -2, 14, 2, ox, oy, s))
  parts.push(geo31Line(ox - s * 2 - 10, oy, ox + s * 14 + 10, oy, c31.ink, 2))
  parts.push(geo31Line(ox, oy + s * 2 + 10, ox, oy - s * 14 - 10, c31.ink, 2))
  parts.push(geo31Poly([[X(0), Y(0)], [X(5), Y(0)], [X(0), Y(12)]], c31.green, 0.12, c31.green, 2.6))
  parts.push(geo31Poly([[X(0), Y(0)], [X(12), Y(0)], [X(0), Y(5)]], c31.orange, 0.08, c31.orange, 2.6, '7 5'))
  parts.push(geo31RA(ox, oy, 1, 0, 0, -1))
  // side values: 5, 12, 13 and 12, 5, 13
  parts.push(geo31Txt(212, 396, '5', 13, c31.amber))
  parts.push(geo31Txt(150, 284, '12', 13, c31.amber, 'end'))
  parts.push(geo31Txt(228, 292, '13', 13, c31.amber))
  parts.push(geo31Txt(266, 396, '12', 13, c31.amber))
  parts.push(geo31Txt(150, 340, '5', 13, c31.amber, 'end'))
  parts.push(geo31Txt(300, 348, '13', 13, c31.amber))
  // vertex labels
  parts.push(geo31Txt(156, 384, 'P = P\u2032', 13, c31.ink, 'end'))
  parts.push(geo31Txt(258, 396, 'Q', 13, c31.ink))
  parts.push(geo31Txt(156, 180, 'R', 13, c31.ink, 'end'))
  parts.push(geo31Txt(370, 396, 'Q\u2032', 13, c31.orange))
  parts.push(geo31Txt(186, 296, 'R\u2032', 13, c31.orange, 'start'))
  // legend
  parts.push(geo31Txt(470, 140, 'correspondence', 12.5, c31.ink, 'start', '700'))
  parts.push(geo31Txt(470, 166, 'P \u2192 P\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(470, 190, 'Q \u2192 R\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(470, 214, 'R \u2192 Q\u2032', 13, c31.amber, 'start'))
  parts.push(geo31Txt(470, 248, 'side multiset', 12.5, c31.tealInk, 'start'))
  parts.push(geo31Txt(470, 272, '{5, 12, 13} both', 12.5, c31.tealInk, 'start'))
  parts.push(geo31Txt(470, 296, 'perimeter 30', 12.5, c31.tealInk, 'start'))
  return geo31Svg(640, 430, aria, parts)
}

/* ================================================================== */
/* the lesson object                                                   */
/* ================================================================== */
export const lessonGeo301: Lesson = {
  id: 'geo-congruence-the-idea-of-same-shape-and-size',
  number: '3.1',
  title: 'Congruence: the Idea of Same Shape and Size',
  concepts: ['congruence', 'superposition', 'correspondence', 'rigid motion', 'orientation', 'mirror image', 'SSS distance check'],
  objectives: [
    'Decide whether two figures are congruent using the superposition idea, and state the definition formally with its symbolic restatement',
    'Read a congruence statement as an ORDERED correspondence and extract all six facts (three sides, three angles) it carries',
    'Run the SSS distance check on a coordinate pair: compute the side multiset, match it, and name the unique correspondence of a scalene pair',
    'Classify motions as direct or opposite by their effect on orientation, and explain why mirror images are congruent but not by a direct move',
    'Refute the perimeter, area and angle shortcuts with the pinned counterexamples',
  ],
  prerequisites: ['geo-angle-sum-of-a-triangle-and-its-consequences'],
  sources: ['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'geo-ch03-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'When are two figures the same?' },
    {
      kind: 'para',
      text: 'Two postage stamps from the same sheet. Two floor tiles from the same box. Two machine parts stamped out by the same die. Hold them side by side and something obvious asserts itself: they are not merely alike, they are THE SAME FIGURE in two copies \u2014 same outline, same angles, same side lengths, everything. Mathematics needs that everyday judgement made precise, because half of geometry is the art of proving that two figures which look different are secretly the same, and the other half is proving that two figures which look nearly the same are honestly different. The word the subject uses is congruence, and this lesson \u2014 the opener of our chapter on triangles \u2014 gives the word a definition, a working discipline, and a set of honest warnings.',
    },
    {
      kind: 'para',
      text: 'The definition is an instruction before it is a sentence. Take one figure \u2014 the stamp, the tile, the triangle \u2014 and physically MOVE it: slide it across the page, turn it, and (this is the clause people forget) flip it over if needed. If after some combination of sliding, turning and flipping the moved copy lands exactly on the other figure \u2014 every point on every point, edge on edge, vertex on vertex \u2014 the two figures are congruent. If no amount of moving makes them coincide, they are not. The test is called superposition: one figure is superposed on the other, and the coincidence is the whole verdict. Notice what the definition does NOT say. It does not say the figures have equal area, or equal perimeter, or that they merely look alike. Coincidence under motion is a stronger demand than any of those single measurements, and much of this lesson is about precisely how much stronger.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Congruent figures',
      text: 'Two figures are said to be congruent if one can be carried onto the other by a motion that slides, turns or flips the plane without stretching or shrinking it, so that the two figures coincide exactly, point for point. Thus, $X \\cong Y$ exactly when some rigid motion $M$ carries $X$ onto $Y$, that is, $M(X) = Y$; every distance between corresponding points survives the trip, so shape AND size are both preserved \u2014 the two halves of the school phrase \u201csame shape and same size\u201d.',
    },
    {
      kind: 'para',
      text: 'Two remarks anchor the idea in place. First, the motion allowed is a RIGID motion: the figure travels as if made of stiff cardboard. Stretching, squashing, resizing \u2014 any motion that changes a distance \u2014 is banned, and that ban is the whole content of \u201csame size\u201d. Sliding (translation), turning (rotation) and flipping (reflection) all pass the stiffness test; they rearrange a figure without bending it. Second, the coincidence demanded is EXACT. A near miss is a miss: if one vertex lands a hair off its target, the figures are not congruent, however similar they look. Geometry is generous with equivalences but strict about this one \u2014 and the strictness is exactly what makes congruence useful, because everything true of one figure is then true of the other, without exception.',
    },
    {
      kind: 'para',
      text: 'The idea is ancient, and the instrument is Euclid\u2019s own. Proposition I.4 of the Elements \u2014 the side-angle-side criterion we shall meet properly in the next lesson \u2014 is proved precisely by superposition: Euclid lifts one triangle, applies the motion his argument constructs, and reads off the coincidence of the remaining parts. Two thousand years later the school textbook still teaches the same move in the same words: place one copy on the other and check that they cover each other exactly. Our phrasing is our own, but the debt is real and worth stating: superposition is not a modern simplification of the Elements, it IS the Elements\u2019 own instrument.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The word, and the classical move',
      text: 'The English word congruent comes from the Latin congruere, whose root sense is to meet, to come together, to agree \u2014 con- (together) plus a verb of meeting. The two figures \u201cagree\u201d because they can be brought together exactly; standard dictionaries give the Latin sense, and the geometry uses it literally: superposition is the two figures actually meeting. Euclid\u2019s I.4 (banked ground for this chapter) proves the first triangle criterion by this very instrument \u2014 one triangle applied to another so that equal sides fall on equal sides and the remaining coincidence is read off. We restate the classics in our own words; the move itself we inherit.',
    },
    {
      kind: 'para',
      text: 'This lesson builds the idea in the order the whole chapter will use it. First the CORRESPONDENCE discipline: congruence is not a statement about \u201cthese two triangles\u201d but about THIS vertex answering to THAT vertex, and every equality in geometry\u2019s most-used relation rides on that order. Then the witness pair: two concrete triangles on the coordinate plane, on which we run the full six-permutation census of correspondences and watch exactly one survive \u2014 the SSS distance check in action. Then the machinery: rigid motions, the things that carry figures without distortion, verified by brute force to preserve every pairwise distance. Then the mirror clause: the witness pair\u2019s unique correspondence is realized by a REFLECTION, not by any slide or turn \u2014 mirror images are congruent but not by a direct move. Then the honest negatives: equal perimeter does not force congruence, equal area does not, and (teased for the next lesson) equal angles do not. Finally the worked chains and the drill. One debt to Chapter 2 is assumed throughout and acknowledged here: Lesson 2.4\u2019s angle sum of a triangle \u2014 Euclid I.32\u2019s $180^\\circ$ \u2014 is the consistency check behind every angle computation in this lesson, and the exterior-angle machinery banked there is what the next lesson\u2019s criteria will build on.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the cheap tests lie',
      text: 'Before the machinery, fix the failure modes. \u201cThey look the same\u201d fails on perspective drawings \u2014 a stretched photograph makes a square look like a rectangle. \u201cSame area\u201d fails on the 8 by 2 rectangle against the 4 by 4 square: both 16, no motion carries one onto the other. \u201cSame perimeter\u201d fails on the triangles with sides 6, 8, 10 against 5, 9, 10: both totals 24, different shapes. Single numbers underdetermine shape; congruence demands that EVERY distance match, and the lesson\u2019s job is to find the smallest honest list of matches that certifies all of them.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the correspondence discipline + F1                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The correspondence discipline' },
    {
      kind: 'para',
      text: 'Here is the discipline that separates a geometry student from a geometry writer, and it is this lesson\u2019s signature rigor. The sentence \u201ctriangle ABC is congruent to triangle A\u2032B\u2032C\u2032\u201d is incomplete \u2014 dangerously incomplete \u2014 if you read it as a remark about two shapes. Two triangles can be congruent in essentially only one way, or in several, depending on their symmetries, and WHICH vertices answer to WHICH determines every equality you are entitled to write. The finished statement is ORDERED: triangle $ABC \\cong A\u2032C\u2032B\u2032$ does not merely say \u201cthese triangles are congruent\u201d; it says $A$ answers to $A\u2032$, $B$ answers to $C\u2032$, and $C$ answers to $B\u2032$ \u2014 the order of the letters IS the correspondence. We call the answering scheme a correspondence, and we treat it as data, not decoration.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Correspondence (the ordered statement)',
      text: 'A correspondence between two triangles is a pairing of the vertices of one with the vertices of the other, one-to-one. The statement triangle $ABC \\cong DEF$ asserts the correspondence $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$ IN THAT ORDER, and nothing else. Thus, triangle $ABC \\cong DEF$ carries exactly six facts: $AB = DE$, $BC = EF$, $CA = FD$ (sides, read from consecutive letter pairs) and $\\angle A = \\angle D$, $\\angle B = \\angle E$, $\\angle C = \\angle F$ (angles, read from single letters). A correspondence that makes all six true is a congruence correspondence.',
    },
    {
      kind: 'para',
      text: 'The order law interacts with the chapter\u2019s notation law, and we restate the binding convention once more since every table, figure and engine in this chapter uses it. Triangle $ABC$ carries sides $a = BC$ (opposite $A$), $b = CA$ (opposite $B$), $c = AB$ (opposite $C$); angles $A$, $B$, $C$ sit at the corresponding vertices. When a correspondence is named, each of the six equalities is a CHECKABLE claim: side against side, angle against angle. If even one fails, the correspondence is wrong \u2014 not the geometry. Students who write a congruence statement and then find \u201cthe sides do not match\u201d have usually misread their own statement: the statement is the contract, and the contract names which side must equal which.',
    },
    {
      kind: 'para',
      text: 'Why insist on order? Because the six facts ride it. From one ordered statement you may read off three side equalities (consecutive letter pairs) and three angle equalities (single letters), and NOTHING MORE: the statement does not claim that $AB = B\u2032C\u2032$, nor that $\u2220A = \u2220C\u2032$, unless the order says so. Conversely, once a correspondence is VERIFIED \u2014 all six demands checked \u2014 you own all six facts at once, and the rest of the chapter will extract from them every criterion, every isosceles consequence, every inequality. One ordered statement, six facts, zero extra assumptions: that economy is why geometry writes congruence with letters in a row rather than with a shrug.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, the statement triangle $ABC \\cong A\u2032C\u2032B\u2032$ reads vertex-by-vertex: $A$ answers to $A\u2032$, $B$ answers to $C\u2032$, $C$ answers to $B\u2032$ \u2014 and ONLY that reading is licensed.',
        'For example, the side equalities ride the consecutive pairs: $AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$ \u2014 three facts from one order, none of them optional.',
        'For example, the angles ride the single letters: $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$ \u2014 three more facts, six in all, from the same single sentence.',
      ],
    },
    {
      kind: 'derivation',
      title: 'One ordered statement carries six facts',
      statement: 'Suppose triangle $ABC \\cong A\u2032C\u2032B\u2032$ is stated in order, that is, with the correspondence $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$. Then the three side equalities and the three angle equalities follow from the correspondence alone \u2014 and nothing beyond them does.',
      steps: [
        {
          label: 'The correspondence is the data',
          explanation: 'The ordered statement pairs each vertex of the first triangle with exactly one vertex of the second. Everything below is bookkeeping on that pairing; no picture is consulted.',
        },
        {
          label: 'Sides ride pairs of letters',
          formula: 'AB \\to A\u2032C\u2032,\\quad BC \\to C\u2032B\u2032,\\quad CA \\to B\u2032A\u2032',
          explanation: 'A side is named by its two endpoints; under the correspondence each endpoint is replaced by its partner. The three consecutive pairs of the statement exhaust the three sides of each triangle.',
        },
        {
          label: 'The side demands check numerically on the witnesses',
          formula: 'AB = 6 = A\u2032C\u2032,\\quad BC = 10 = C\u2032B\u2032,\\quad CA = 8 = B\u2032A\u2032',
          explanation: 'On the witness pair of Section 3 (T1 with sides 6, 8, 10 and T2 with sides 8, 6, 10), all three demands hold \u2014 the engine recomputes them before this prose is allowed to stand.',
        },
        {
          label: 'Angles ride single letters',
          formula: '\\angle A = \\angle A\u2032 = 90^\\circ,\\quad \\angle B = \\angle C\u2032,\\quad \\angle C = \\angle B\u2032',
          explanation: 'The angle at a vertex is carried to the angle at its partner. On the witnesses: the right angle at $A$ answers to the right angle at $A\u2032$; the $53.13^\\circ$ angle at $B$ answers to $C\u2032$; the $36.87^\\circ$ angle at $C$ answers to $B\u2032$.',
        },
        {
          label: 'Nothing more is claimed',
          explanation: 'The statement does NOT assert $AB = A\u2032B\u2032$ (that would need $6 = 8$) nor $\\angle B = \\angle B\u2032$ (that would need $53.13^\\circ = 36.87^\\circ$). The order is the whole contract: six true claims inside it, nothing outside it.',
        },
      ],
      result: 'One ordered statement carries exactly $3 + 3 = 6$ facts: $AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$, $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$ \u2014 the order of the letters is the contract.',
    },
    {
      kind: 'figure',
      caption: 'Figure F1 \u2014 the correspondence diagram. The witness triangle T1 (green, sides 6, 8, 10, right angle at A) and T2 (orange, sides 8, 6, 10, right angle at A\u2032), both listed counterclockwise. The arrows carry the unique correspondence: A to A\u2032 along the bottom arc, C to B\u2032 over the top, B to C\u2032 through the middle. The right angle answers the right angle; the 8-leg answers the 8-leg; the 6-leg answers the 6-leg.',
      svg: geo31Corr('Two right triangles side by side with the correspondence arrows carrying A to A prime, B to C prime and C to B prime, with side values 6, 8, 10 and 8, 6, 10 marked.'),
    },
    {
      kind: 'table',
      caption: 'The six facts of the correspondence triangle ABC \u2245 triangle A\u2032C\u2032B\u2032, each with its witness check \u2014 the engine recomputes every row',
      head: ['Fact rides on', 'Statement', 'Witness check'],
      rows: [
        ['side AB (consecutive pair)', '$AB = A\u2032C\u2032$', '$6 = 6$'],
        ['side BC (consecutive pair)', '$BC = C\u2032B\u2032$', '$10 = 10$'],
        ['side CA (consecutive pair)', '$CA = B\u2032A\u2032$', '$8 = 8$'],
        ['angle A (single letter)', '$\\angle A = \\angle A\u2032$', '$90^\\circ = 90^\\circ$'],
        ['angle B (single letter)', '$\\angle B = \\angle C\u2032$', '$53.13^\\circ = 53.13^\\circ$'],
        ['angle C (single letter)', '$\\angle C = \\angle B\u2032$', '$36.87^\\circ = 36.87^\\circ$'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the table once more as a WARNING as much as a promise. The demands the statement does NOT make are just as fixed as the ones it does: $AB$ against $A\u2032B\u2032$ would demand $6 = 8$ and is simply false; $\u2220B$ against $\u2220B\u2032$ would demand $53.13^\\circ = 36.87^\\circ$ and is false. A congruence statement is a machine for generating true equalities, and it malfunctions the moment you feed it the wrong pairing. The examination habit this lesson drills: before writing any equality, write the correspondence; before trusting any correspondence, run the six checks. Both habits cost seconds and save entire problems.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the witness pair and the six-permutation census             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The witness pair and the census of correspondences' },
    {
      kind: 'para',
      text: 'Now we make everything concrete, and we make it concrete ONCE, with two triangles that the whole chapter will reuse the way a locksmith reuses one key. The witness triangle T1 has vertices $A(0,0)$, $B(6,0)$, $C(0,8)$ \u2014 a right triangle with the right angle at the origin, legs 6 and 8, hypotenuse 10. The witness triangle T2 has vertices $A\u2032(0,0)$, $B\u2032(8,0)$, $C\u2032(0,6)$ \u2014 again right-angled at the origin, legs 8 and 6, hypotenuse 10. Both are listed counterclockwise (walk $A \\to B \\to C$ and the interior is on your left). The distance formula settles every side: for T1, $AB = 6$, $BC = \\sqrt{36 + 64} = 10$, $CA = 8$; for T2, $A\u2032B\u2032 = 8$, $B\u2032C\u2032 = 10$, $C\u2032A\u2032 = 6$. Under the notation law: T1 has $a = 10$, $b = 8$, $c = 6$; T2 has $a\u2032 = 10$, $b\u2032 = 6$, $c\u2032 = 8$. Same three lengths, attached to different legs \u2014 and that tiny difference is about to become the most instructive detail in the chapter. The angle facts, when the law of cosines computes them below, will read $90^\\circ$, $53.13^\\circ$, $36.87^\\circ$ in both triangles \u2014 summing to $180^\\circ$ exactly as Lesson 2.4\u2019s angle-sum property demands, a consistency check the engine runs on every witness before this prose stands.',
    },
    {
      kind: 'para',
      text: 'With two triangles and six vertices, exactly how many correspondences are there to consider? A correspondence is a one-to-one pairing of three vertices with three vertices, so the count is $3! = 6$ \u2014 the six permutations. Each permutation makes six demands (three side equalities, three angle equalities), and each either survives all of them or fails at least one. The honest procedure is the CENSUS: run all six, record every verdict, and see what survives. No cleverness, no shortcuts \u2014 just the discipline of checking every case when the case count is six. The engine behind this lesson ran the census by brute force before a word of this prose was written; the table below is its output, verbatim.',
    },
    {
      kind: 'table',
      caption: 'The six-permutation correspondence census on the witness pair, computed by brute force \u2014 each row names the permutation, its first failed side demand (in pair order AB, AC, BC) and the verdict',
      head: ['Permutation (A\u2192, B\u2192, C\u2192)', 'Named reading', 'First failed demand', 'Verdict'],
      rows: [
        ['$A \\to A\u2032$, $B \\to B\u2032$, $C \\to C\u2032$', 'the identity reading', '$AB$ vs $A\u2032B\u2032$: needs $6$, delivers $8$', 'rejected'],
        ['$A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$', 'the leg-swap', 'none \u2014 all three sides and all three angles match', 'VALID \u2014 the unique correspondence'],
        ['$A \\to B\u2032$, $B \\to A\u2032$, $C \\to C\u2032$', 'A and B crossed', '$AB$ vs $B\u2032A\u2032$: needs $6$, delivers $8$', 'rejected'],
        ['$A \\to B\u2032$, $B \\to C\u2032$, $C \\to A\u2032$', 'the cycle', '$AB$ vs $B\u2032C\u2032$: needs $6$, delivers $10$', 'rejected'],
        ['$A \\to C\u2032$, $B \\to A\u2032$, $C \\to B\u2032$', 'the other cycle', '$AC$ vs $C\u2032B\u2032$: needs $8$, delivers $10$', 'rejected'],
        ['$A \\to C\u2032$, $B \\to B\u2032$, $C \\to A\u2032$', 'A and C crossed', '$AB$ vs $C\u2032B\u2032$: needs $6$, delivers $10$', 'rejected'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the census slowly, because it is the lesson\u2019s centrepiece. Five of the six permutations die on their very first side demand \u2014 and look at WHY: every rejected reading tries to land a side of length 6 on a side of length 8 or 10, or a side of length 8 on the length-10 side. The one survivor is the leg-swap: $A \\to A\u2032$ (right angle answers right angle), $B \\to C\u2032$ (the 6-leg lands on the 6-leg), $C \\to B\u2032$ (the 8-leg lands on the 8-leg). Under that single reading, all three side demands hold with the numbers $6 = 6$, $10 = 10$, $8 = 8$, and all three angle demands hold with $90^\\circ = 90^\\circ$, $53.13^\\circ = 53.13^\\circ$, $36.87^\\circ = 36.87^\\circ$. EXACTLY ONE correspondence out of six is a congruence correspondence \u2014 and that is not an accident of these particular triangles but a theorem about scalene ones.',
    },
    {
      kind: 'derivation',
      title: 'The scalene census is exactly one',
      statement: 'Let $T$ be a scalene triangle \u2014 no two sides equal \u2014 and $T\u2032$ a congruent copy. Then exactly one of the six vertex correspondences maps every side of $T$ onto an equal side of $T\u2032$.',
      steps: [
        {
          label: 'The count of candidates',
          formula: '3! = 6',
          explanation: 'A correspondence is a bijection from three vertices to three vertices, so there are exactly six candidates. The census is finite \u2014 this is why brute force is a proof here, not just an experiment.',
        },
        {
          label: 'A valid correspondence must match lengths',
          formula: '\\{|AB|, |BC|, |CA|\\} = \\{|A\u2032B\u2032|, |B\u2032C\u2032|, |C\u2032A\u2032|\\}',
          explanation: 'If a correspondence maps every side onto an equal side, the multiset of side lengths of the image equals the multiset for $T$. This is the SSS screen: necessary, and about to become sharp.',
        },
        {
          label: 'Scalene means each length occurs once',
          explanation: 'In a scalene triangle the three side lengths are distinct, so inside $T\u2032$ there is EXACTLY ONE side of length $|AB|$, one of length $|BC|$, one of length $|CA|$. The side $AB$ has no choice of partner: its endpoints must land on the endpoints of the unique side of the same length in $T\u2032$.',
        },
        {
          label: 'Two forced pairings determine the third vertex',
          explanation: 'The pair $\{A, B\}$ is forced (as above) and the pair $\{B, C\}$ is forced by the same argument applied to $BC$. The two forced pairs share the vertex $B$, and their partners share a vertex of $T\u2032$ \u2014 which must therefore be the image of $B$. The images of $A$ and $C$ are now forced too.',
        },
        {
          label: 'At most one; existence by congruence',
          explanation: 'The argument leaves no freedom: at most ONE correspondence can be valid. Since $T\u2032$ is congruent to $T$, some correspondence IS valid (by the definition of congruence, some rigid motion carries $T$ onto $T\u2032$, and the motion\u2019s vertex pairing survives all six checks). Hence exactly one.',
        },
        {
          label: 'The ladder beyond scalene',
          explanation: 'The engine\u2019s census confirms the boundary: an isosceles triangle with sides 5, 5, 6 admits exactly TWO self-correspondences (the identity and the swap of the two equal-side endpoints), and an equilateral triangle admits ALL SIX. Uniqueness is precisely a scalene phenomenon.',
        },
      ],
      result: 'For a scalene pair the congruence correspondence is UNIQUE \u2014 and finding it IS the SSS distance check: the census runs $1$ (scalene), $2$ (isosceles), $6$ (equilateral).',
    },
    {
      kind: 'para',
      text: 'Turn the theorem into a procedure and you get the workhorse of the whole chapter. To decide whether two triangles are congruent, and to write the statement correctly: FIRST compute the three side lengths of each (the distance formula on coordinates, the ruler on paper) and compare the multisets \u2014 if the multisets differ, stop, the triangles are not congruent, no correspondence can exist. SECOND, if the multisets agree, match equal lengths to equal lengths and let the shared vertices name the correspondence, exactly as the census row did. THIRD, write the statement IN ORDER and, if needed, verify the angle demands as a final audit. The multiset comparison is the SCREEN (fast, one glance); the ordered statement is the CONTRACT (precise, six facts). The next lesson will prove that this side-first procedure is not merely sufficient but minimal \u2014 three matches really do force the whole coincidence \u2014 but already here you should feel why the screen works: sides are the census\u2019s fastest filters.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Finding the correspondence IS the SSS distance check',
      text: 'Students often treat \u201cfinding the correspondence\u201d and \u201crunning the SSS check\u201d as two chores. They are one. The SSS check computes the side multiset of each triangle and demands a match; the only way to state the match precisely is to say WHICH vertex answers to WHICH \u2014 and that statement, once all three side demands are verified, IS the congruence correspondence. On the witness pair the check reads: multiset $\{6, 8, 10\}$ against $\{8, 6, 10\}$ \u2014 equal; the 6 lands on the 6, the 8 on the 8, the 10 on the 10; therefore $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$, and the statement triangle $ABC \\cong A\u2032C\u2032B\u2032$ follows. One procedure, two names.',
    },
    {
      kind: 'para',
      text: 'The ladder deserves one more sentence of respect, because examinations probe its edges. For the ISOSCELES witness with sides 6, 5, 5 (vertices $(0,0)$, $(6,0)$, $(3,4)$), the census finds TWO valid self-correspondences: the identity, and the swap that exchanges the two base vertices while holding the apex \u2014 the triangle\u2019s own symmetry, wearing the clothes of a correspondence. For an EQUILATERAL triangle all six permutations survive, because every side answers every side. So when you state a congruence involving a symmetric triangle, the order matters LESS (more readings are true) \u2014 but the safe habit is unchanged: name the order you mean, check the six facts, and let the census logic, not the picture, decide.',
    },

    /* -------------------------------------------------------------- */
    /* 4. rigid motions: the machinery                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Rigid motions: the machinery behind the idea' },
    {
      kind: 'para',
      text: 'The definition of congruence made a promise about MOTIONS \u2014 \u201cslide, turn or flip without stretching\u201d \u2014 and a promise about motions is only as good as our account of motions themselves. This section names the three basic motions, states each as a formula on coordinates (so that nothing depends on how a picture happens to be drawn), and then does what this book always does with a load-bearing claim: verifies it by brute force. The load-bearing claim is distance preservation \u2014 that these motions change positions but never distances \u2014 because the moment a motion preserves every distance, it carries every figure onto a congruent copy of itself, and superposition stops being a metaphor and becomes a computation.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Rigid motion',
      text: 'A rigid motion of the plane is a map $M$ of the plane onto itself that preserves every distance: $|M(P)\\,M(Q)| = |PQ|$ for every pair of points $P$, $Q$. Thus, translations, rotations and reflections are rigid motions \u2014 and so is any composition of them \u2014 while any map that changes even one distance (a stretch, a shear, a resize) is not. A rigid motion carries every figure onto a CONGRUENT copy of itself, by the very definition of congruence.',
    },
    {
      kind: 'para',
      text: 'The three named motions, in coordinates. A TRANSLATION by a vector $(a, b)$ slides every point the same amount: $(x, y) \\to (x + a,\\ y + b)$. A ROTATION through angle $\\theta$ about the origin turns every point on the circle of its distance from the origin: $(x, y) \\to (x\\cos\\theta - y\\sin\\theta,\\ x\\sin\\theta + y\\cos\\theta)$ \u2014 and a rotation about any other center is this formula plus a translation on either side. A REFLECTION across a line flips the plane like a page: across the line $y = x$, the rule is $(x, y) \\to (y, x)$. Each formula is checkable, each is invertible (slide back, turn back, flip back), and each \u2014 the engine confirms \u2014 leaves every pairwise distance untouched.',
    },
    {
      kind: 'table',
      caption: 'The rigid-motion roster \u2014 the orientation column separates DIRECT motions (orientation kept) from OPPOSITE motions (orientation reversed); distances are kept by every row',
      head: ['Motion', 'Rule (about the origin)', 'Orientation', 'Pairwise distances'],
      rows: [
        ['Translation by $(a, b)$', '$(x, y) \\to (x + a,\\ y + b)$', 'kept \u2014 direct', 'kept'],
        ['Rotation by $\\theta$', '$(x, y) \\to (x\\cos\\theta - y\\sin\\theta,\\ x\\sin\\theta + y\\cos\\theta)$', 'kept \u2014 direct', 'kept'],
        ['Reflection across $y = x$', '$(x, y) \\to (y, x)$', 'REVERSED \u2014 opposite', 'kept'],
      ],
    },
    {
      kind: 'para',
      text: 'Now the verification, because prose that asserts preservation without proof is exactly the kind of claim this book refuses. The engine brute-forced a whole family of motions against the witness triangle T1 with side list $6, 10, 8$: all TWELVE rotations by multiples of $30^\\circ$ (a full turn covered in half-hour steps), the three mirrors across the coordinate axes and the line $y = x$, five sampled translations, and compositions of rotations with translations \u2014 and in every single case all three pairwise distances of T1 came through as $6, 10, 8$, to the last decimal. The headline witness is the pinned quarter-turn: rotation by $90^\\circ$ maps $(6, 0) \\to (0, 6)$ and $(0, 8) \\to (-8, 0)$, and the distances $6$, $10$, $8$ survive intact. Figure F3 draws it: the triangle sweeps through a quarter-turn and nothing about its internal metric changes.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Rigid motions preserve distance (the engine\u2019s witness)',
      text: 'Every translation, rotation and reflection preserves the distance between every pair of points; on the witness triangle this reads: after any motion in the tested family, the three pairwise distances are still $6$, $10$, $8$. The pinned instance: the $90^\\circ$ rotation carries $(6, 0)$ to $(0, 6)$ and $(0, 8)$ to $(-8, 0)$, with $|AB| = 6$, $|BC| = 10$, $|CA| = 8$ before and after. Consequently every rigid motion maps a figure onto a congruent copy \u2014 the definitions mesh exactly.',
    },
    {
      kind: 'figure',
      caption: 'Figure F3 \u2014 the quarter-turn witness. T1 (green, solid) with A(0, 0), B(6, 0), C(0, 8) sweeps through a 90 degree rotation about the origin (the amber quarter-arc from B to B\u2032) into the image triangle (orange, dashed) with vertices (0, 0), (0, 6), (\u22128, 0). Every pairwise distance survives: the leg 6 lands on the leg 6, the leg 8 on the leg 8, the hypotenuse 10 on the hypotenuse 10. Rotation is a DIRECT motion \u2014 the counterclockwise listing stays counterclockwise.',
      svg: geo31RotArc('The right triangle with legs 6 and 8 on the axes rotating through a quarter-turn arc into the image triangle with vertices at the origin, on the y axis at 6 and on the negative x axis at 8.'),
    },
    {
      kind: 'para',
      text: 'One structural fact completes the machinery: the rigid motions are CLOSED under composition \u2014 slide then turn, turn then flip, any chain, is again a motion that preserves every distance (the engine checked compositions too, and the general reason is one line: composing two distance-preserving maps preserves each distance twice over). Closure matters because real superpositions are rarely single moves; \u201cslide it into place, then adjust the angle\u201d is a composition, and closure says the compound is still rigid. It also gives the family its algebraic shape: compositions of translations and rotations generate all the DIRECT motions, and the moment a reflection enters the chain, the compound flips sides \u2014 the direct/opposite split of the roster table, which the next section makes precise. Chapter 5 will re-read this whole section transformation-first: congruence AS the existence of a motion, with the motion itself promoted from proof-technique to object of study.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the mirror clause                                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The mirror clause: congruent is not always reachable without flipping' },
    {
      kind: 'para',
      text: 'The census certified triangle $ABC \\cong A\u2032C\u2032B\u2032$ on the witness pair, and the definition of congruence now owes us a MOTION: some rigid motion must carry $T_1$ onto $T_2$ with $A$ landing on $A\u2032$, $B$ on $C\u2032$, $C$ on $B\u2032$. Try the direct moves first, as any student would. A TRANSLATION would have to send $B(6, 0)$ to $C\u2032(0, 6)$, so the slide vector is $(-6, 6)$; applied to $A(0, 0)$ it lands at $(-6, 6)$ \u2014 but $A$ must land on $A\u2032(0, 0)$. The translation fails on its second vertex. A ROTATION about the origin that sends $B(6, 0)$ to $C\u2032(0, 6)$ must be the $90^\\circ$ turn (the roster\u2019s formula, with $\\theta = 90^\\circ$: $(6, 0) \\to (0, 6)$); applied to $C(0, 8)$ it lands at $(-8, 0)$ \u2014 but $C$ must land on $B\u2032(8, 0)$. The rotation fails too, on the opposite side of the origin. Two failures, one pattern: every direct move that respects one vertex of the correspondence betrays another.',
    },
    {
      kind: 'figure',
      caption: 'Figure F4 \u2014 the mirror does what no slide or turn can. The line y = x (teal) reflects T1 (green, solid) point for point onto T2\u2019s vertices (orange, dashed): A(0, 0) stays fixed as A = A\u2032, B(6, 0) folds across to (0, 6) = C\u2032, and C(0, 8) folds across to (8, 0) = B\u2032. Each amber fold-arrow is perpendicular to the mirror line and cut exactly in half by it \u2014 the geometric signature of a reflection.',
      svg: geo31Mirror({ aria: 'The line y equals x reflecting the triangle with vertices at the origin, 6 units along the x axis and 8 units along the y axis onto the triangle with vertices at the origin, 8 units along the x axis and 6 units along the y axis, with fold arrows perpendicular to the mirror.', title: 'THE MIRROR CARRIES T1 ONTO T2 \u2014 NO DIRECT MOVE CAN' }),
    },
    {
      kind: 'para',
      text: 'The mirror succeeds where every direct move fails. The reflection across $y = x$, rule $(x, y) \\to (y, x)$, acts point for point: $A(0, 0) \\to (0, 0) = A\u2032$; $B(6, 0) \\to (0, 6) = C\u2032$; $C(0, 8) \\to (8, 0) = B\u2032$. That is EXACTLY the unique correspondence the census certified \u2014 not a related one, the very one \u2014 so the reflection is a certified carrier, and the congruence claim is discharged. Look at the figure for the mechanism: each point-image segment (the amber arrows) is perpendicular to the mirror line and bisected by it, which is the geometric fingerprint of a reflection and the reason the two fold arrows in Figure F4 run parallel, never crossing. The long 8-leg of T1, standing up the $y$-axis, folds down onto the long 8-leg of T2 along the $x$-axis; the short 6-leg folds onto the short 6-leg. The mirror swaps the legs because it swaps the axes.',
    },
    {
      kind: 'para',
      text: 'Now the invariant that explains BOTH the failures and the success: ORIENTATION. Walk the vertices of T1 in their listed order $A \\to B \\to C$ and the interior is on your left \u2014 the listing is counterclockwise, and the signed double-area is $+48$. Walk the correspondence\u2019s image $(A\u2032, C\u2032, B\u2032)$ and the interior is on your right: signed double-area $-48$. Direct motions \u2014 translations, rotations, and all their compositions \u2014 keep that sign (the engine verified $+48$ on every direct image in the family sweep); opposite motions \u2014 reflections, and any composition with an odd number of them \u2014 flip it. The demanded correspondence reverses the orientation, so no direct motion CAN realize it: the two failures above were not bad luck but necessity, and the family sweep was the theorem\u2019s data. This is the lesson\u2019s most examinable sentence, so we give it its own box.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The mirror trap: congruent does not mean reachable without flipping',
      text: 'Mirror images are congruent \u2014 every distance matches, every angle matches, SSS certifies them \u2014 but NO direct motion (slide or turn) carries one onto the other when the correspondence reverses orientation. On the witness pair: a translation or rotation that respects one vertex of the unique correspondence must betray another (try it: the slide $(-6, 6)$ wrecks $A$; the $90^\\circ$ turn wrecks $C$). The honest completion of \u201c$T_1$ and $T_2$ are congruent\u201d is \u201c\u2026 by an OPPOSITE motion\u201d. In an exam, when a question offers rotation, translation and reflection as candidate carriers, run the orientation audit first: if the correspondence reverses the vertex order, the answer is the reflection and nothing else.',
    },
    {
      kind: 'para',
      text: 'The orientation audit in practice takes one line. Compute the signed double-area of the source listing and of the demanded image listing; same sign means a direct motion suffices (in principle \u2014 existence still needs the congruence), opposite signs mean only an opposite motion can do it. On the witnesses: $+48$ against $-48$, opposite, so the reflection is forced. The distinction is worth naming because it survives into everything that follows: in the next lesson the criteria are proved BY motions (I.4\u2019s superposition), and in chapter 5 the transformation reading returns to make orientation a first-class citizen of every congruence and similarity question. What this lesson plants is the reflex: after \u201ccongruent?\u201d comes \u201cdirect or opposite?\u201d \u2014 two questions, two answers, one figure pair.',
    },

    /* -------------------------------------------------------------- */
    /* 6. what congruence is NOT                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What congruence is not: the honest negatives' },
    {
      kind: 'para',
      text: 'A definition earns trust by what it refuses as much as by what it admits, and congruence refuses a lot that intuition offers it. Three tempting shortcuts fail, each on a witness small enough to memorize and sharp enough to generalize: equal perimeter does not force congruence, equal area does not, and (the teaser whose full trial comes in the next lesson) equal angles do not. Each negative is a theorem with a two-line proof once you hold the right tool \u2014 the side multiset \u2014 and each becomes, in examination conditions, a lifetime supply of true false-options.',
    },
    {
      kind: 'figure',
      caption: 'Figure F2 \u2014 the perimeter-trap strip. Two bars of equal total length: the top carries the parts 6, 8, 10, the bottom the parts 5, 9, 10. The totals agree (both perimeters 24) and the right edges coincide, but no part of one bar matches the parts of the other pairwise \u2014 the multisets {6, 8, 10} and {5, 9, 10} differ, so SSS refuses congruence. Equal total, different parts: the whole trap in one picture.',
      svg: geo31Strip({
        aria: 'Two horizontal segmented bars of equal total length, the first split into parts 6, 8 and 10 and the second into parts 5, 9 and 10, with the verdict that equal totals do not make congruent triangles.',
        title: 'THE PERIMETER TRAP \u2014 EQUAL TOTALS, DIFFERENT PARTS',
        segsA: [6, 8, 10], segsB: [5, 9, 10], total: 24, nameA: 'X', nameB: 'Y',
        noteA: 'perimeter 24 \u2014 the totals agree',
        noteB: 'the parts differ: {6, 8, 10} against {5, 9, 10}',
        verdict: 'NOT congruent \u2014 SSS demands the parts, not the total',
      }),
    },
    {
      kind: 'para',
      text: 'The perimeter trap, with its numbers. Triangle $X$ has sides $6, 8, 10$; triangle $Y$ has sides $5, 9, 10$; both perimeters are $24$, and both are genuine triangles (the triangle inequality of chapter 2\u2019s sequel holds: $6 + 8 > 10$ and $5 + 9 > 10$). Yet the SSS screen ends the matter in one glance: the side multiset of $X$ is $\{6, 8, 10\}$, of $Y$ is $\{5, 9, 10\}$ \u2014 different multisets, so NO correspondence maps every side onto an equal side, and the triangles are not congruent. The trap\u2019s psychology is worth naming: perimeter is ONE number, and one number feels like a certificate. But congruence demands three side matches \u2014 three equations \u2014 and a single total cannot enforce three. Every student meets a version of this on a test; the strip in Figure F2 is the picture to recall.',
    },
    {
      kind: 'para',
      text: 'The area trap moves the single number from perimeter to area, and the witness changes shape class to prove the negative is not a triangle-specific accident. The $8 \\times 2$ rectangle and the $4 \\times 4$ square both have area $16$. They are not congruent, and two independent audits say so. The side cycle of the rectangle is $(8, 2, 8, 2)$; of the square, $(4, 4, 4, 4)$ \u2014 no correspondence of vertices can match side against side. Or measure the diagonals: $\\sqrt{68} \\approx 8.2462$ against $\\sqrt{32} \\approx 5.6569$ \u2014 a rigid motion carries diagonals to diagonals and would have to preserve that length; it cannot. Same area, different figure: area, too, is one number where congruence wants many.',
    },
    {
      kind: 'para',
      text: 'The angle teaser looks forward, and deliberately so. Take an equilateral triangle of side $1$ and an equilateral triangle of side $2$: every angle in BOTH is $60^\\circ$, so the triangles agree in every angle \u2014 and no rigid motion carries the small one onto the big one, because every side differs ($1$ against $2$). Equal angles therefore do NOT certify congruence; the full post-mortem \u2014 the AAA non-criterion, with the witness that fixes exactly what angles DO pin down \u2014 is lesson 3.2\u2019s opening argument. What the teaser already teaches is the pattern: any SINGLE census of numbers \u2014 one total, one area, one angle list \u2014 underdetermines shape. Congruence is a claim about ALL distances at once, and the criteria of the next lesson are the smallest honest lists that suffice.',
    },
    {
      kind: 'table',
      caption: 'The honest negatives \u2014 three tempting certificates and their pinned witnesses; the engine recomputes every row',
      head: ['Tempting claim', 'Witness pair', 'What matches', 'What differs', 'Verdict'],
      rows: [
        ['equal perimeter forces congruence', 'sides $(6, 8, 10)$ vs $(5, 9, 10)$', 'perimeter $24$ both', 'the side multisets', 'NOT congruent'],
        ['equal area forces congruence', 'the $8 \\times 2$ rectangle vs the $4 \\times 4$ square', 'area $16$ both', 'the side cycle and the diagonal', 'NOT congruent'],
        ['equal angles force congruence', 'equilateral side $1$ vs equilateral side $2$', 'all angles $60^\\circ$', 'every side ($1$ vs $2$)', 'NOT congruent \u2014 the 3.2 teaser'],
      ],
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The audit habit: agreeing numbers are not matching parts',
      text: 'Before writing $\\cong$ on any pair, run the audit: name the correspondence, then match PART to PART \u2014 side to side, angle to angle. Numbers that agree without a correspondence \u2014 a shared perimeter $24$, a shared area $16$, a shared angle sum \u2014 certify nothing. The pinned witnesses above are your refutations: quote them, do not re-derive them under time pressure. And when a multiple-choice option argues from a single agreeing number, cross it out on sight; the exam-setter built it from this exact table.',
    },

    /* -------------------------------------------------------------- */
    /* 7. the three worked chains (Illustrations)                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Congruence in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. The first runs the complete SSS distance check on the witness pair \u2014 all six distances computed, the multiset matched, the correspondence named \u2014 the template for every coordinate-pair question ever set. The second is the mirror-pair read: which motion carries one triangle onto the other, and why the direct moves fail structurally, not accidentally. The third is a real-world audit, where two floor tiles arrive specified by three measurements each and the verdict must be argued, not guessed. In all three, the discipline is identical: correspondence first, equalities second, verdict last.',
    },
    {
      kind: 'example',
      title: 'Carry out the full SSS distance check on the witness pair: triangle $T_1$ with vertices $(0, 0)$, $(6, 0)$, $(0, 8)$ and triangle $T_2$ with vertices $(0, 0)$, $(8, 0)$, $(0, 6)$. Compute all six distances, match the multiset, and name the correspondence.',
      steps: [
        'Sol. Compute the three sides of $T_1$ with the distance formula: $AB = \\sqrt{(6-0)^2 + (0-0)^2} = 6$; $BC = \\sqrt{(0-6)^2 + (8-0)^2} = \\sqrt{36 + 64} = 10$; $CA = \\sqrt{(0-0)^2 + (0-8)^2} = 8$.',
        'Compute the three sides of $T_2$ the same way: $A\u2032B\u2032 = 8$; $B\u2032C\u2032 = \\sqrt{(0-8)^2 + (6-0)^2} = 10$; $C\u2032A\u2032 = 6$.',
        'Run the screen: the multiset for $T_1$ is $\\{6, 8, 10\\}$ and for $T_2$ it is $\\{8, 6, 10\\}$ \u2014 the same multiset, so a correspondence may exist.',
        'Match equal lengths to equal lengths: the $6$ of $T_1$ is $AB$, and the only side of length $6$ in $T_2$ is $C\u2032A\u2032$, so $\\{A, B\\}$ answers to $\\{C\u2032, A\u2032\\}$; the $8$ of $T_1$ is $CA$, the only length-$8$ side of $T_2$ is $A\u2032B\u2032$, so $\\{C, A\\}$ answers to $\\{B\u2032, A\u2032\\}$.',
        'Now, read the shared vertices: $A$ appears in both matched pairs of $T_1$ and $A\u2032$ in both partners in $T_2$, so $A \\to A\u2032$; then $B \\to C\u2032$ and $C \\to B\u2032$.',
        'Verify the three demands in order: $AB = 6 = A\u2032C\u2032$; $BC = 10 = C\u2032B\u2032$; $CA = 8 = B\u2032A\u2032$ \u2014 all three hold (the engine\u2019s census row agrees).',
        'Hence triangle $ABC \\cong A\u2032C\u2032B\u2032$ by SSS, with the unique correspondence $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$; the perimeters ($24$ both) and areas ($24$ both) agree as corollaries, not as certificates.',
      ],
      figures: [
        {
          caption: 'The distance check on the witness pair, drawn: both triangles on the grid, side values 6, 8, 10 and 8, 6, 10, and the unique correspondence A \u2192 A\u2032, B \u2192 C\u2032, C \u2192 B\u2032 in the legend. The multiset {6, 8, 10} matches, and the order does the rest.',
          svg: geo31WitnessGrid('Two right triangles on a coordinate grid, the green one with legs 6 and 8, the orange dashed one with legs 8 and 6, sharing the right-angle vertex at the origin, with the correspondence legend at the right.'),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The mirror-pair read. For the witness pair of Illustration 1, find the single rigid motion that carries $T_1$ onto $T_2$ under the correspondence $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$, and prove that no rotation or translation can do the job.',
      steps: [
        'Sol. Try the direct moves first, as the definition invites. A translation carrying $B(6, 0)$ to $C\u2032(0, 6)$ needs the slide vector $(-6, 6)$; applied to $A(0, 0)$ it lands at $(-6, 6)$, not $A\u2032(0, 0)$ \u2014 the translation dies on its second vertex.',
        'A rotation about the origin carrying $B(6, 0)$ to $C\u2032(0, 6)$ must be the $90^\\circ$ turn: $(x, y) \\to (-y, x)$ gives $(6, 0) \\to (0, 6)$. Applied to $C(0, 8)$ it lands at $(-8, 0)$, not $B\u2032(8, 0)$ \u2014 the rotation dies too.',
        'Find the structural reason: the correspondence carries the counterclockwise listing $(A, B, C)$ onto $(A\u2032, C\u2032, B\u2032)$, which is clockwise \u2014 the signed double-area flips from $+48$ to $-48$. Direct motions KEEP the sign (the engine verified $+48$ on every rotation and translation in the family sweep); so no direct motion can realize this correspondence, whatever its center or angle.',
        'Now, try the mirror: reflection across the line $y = x$, rule $(x, y) \\to (y, x)$. It sends $A(0, 0) \\to (0, 0) = A\u2032$; $B(6, 0) \\to (0, 6) = C\u2032$; $C(0, 8) \\to (8, 0) = B\u2032$.',
        'Check that the landing is exact: the three image points coincide with $T_2$\u2019s vertices point for point \u2014 the reflection realizes EXACTLY the census\u2019s unique correspondence.',
        'Hence the carrier is the reflection across $y = x$ \u2014 an OPPOSITE motion; $T_1$ and $T_2$ are mirror images: congruent by SSS, but reachable only by flipping, never by sliding or turning alone.',
      ],
      figures: [
        {
          caption: 'The mirror line read, drawn: y = x folds T1 onto T2 point for point \u2014 A = A\u2032 on the mirror, B(6, 0) across to (0, 6), C(0, 8) across to (8, 0). Each fold-arrow is perpendicular to the mirror line and bisected by it.',
          svg: geo31Mirror({ aria: 'The line y equals x with the green triangle and its orange dashed mirror image and two fold arrows perpendicular to the mirror line.', title: 'THE MIRROR LINE y = x READS THE PAIR' }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The tile audit. Two floor tiles are specified by three measurements each: tile P is a right triangle with legs $30$ cm and $40$ cm and hypotenuse $50$ cm; tile Q is a right triangle with legs $40$ cm and $30$ cm and hypotenuse $50$ cm. Are the tiles congruent? Argue, do not guess.',
      steps: [
        'Sol. Set up the audit: a tile is a triangle, and the audit tool is the SSS screen \u2014 three measurements are exactly enough data for a triangle\u2019s shape and size (that is the content of lesson 3.2\u2019s SSS criterion; here we verify the pair directly).',
        'List the side data: tile P has sides $30, 40, 50$ (a right triangle, since $30^2 + 40^2 = 900 + 1600 = 2500 = 50^2$); tile Q has sides $40, 30, 50$ \u2014 also right, since $40^2 + 30^2 = 50^2$ the same way.',
        'Run the screen: the multisets $\\{30, 40, 50\\}$ and $\\{40, 30, 50\\}$ agree \u2014 the audit passes its first gate.',
        'Name the correspondence by matching lengths: the $30$ of P must land on the $30$ of Q, the $40$ on the $40$, the $50$ (hypotenuse) on the $50$ (hypotenuse); the right angle \u2014 opposite the $50$ \u2014 answers the right angle.',
        'Verify existence concretely: pick the corner of P where the $30$ and $40$ legs meet; the matching corner of Q is where its $40$ and $30$ legs meet; a flip of the plane that swaps the two leg directions carries P\u2019s legs onto Q\u2019s and the hypotenuse onto the hypotenuse \u2014 a rigid motion (in fact the reflection across the angle bisector, an opposite motion).',
        'Hence the tiles ARE congruent: same three measurements, matched in order, realized by a flip \u2014 and the practical consequence for the tiler is that the tiles fit interchangeably, though one of the pair must be flipped, not merely turned, to sit in the other\u2019s slot.',
      ],
      figures: [
        {
          caption: 'The tile audit drawn: tile P with legs 30 cm and 40 cm, tile Q with the legs swapped, hypotenuse 50 cm shared. The correspondence sends the right angle to the right angle and each leg to its equal; the realizing motion is a flip.',
          svg: geo31Tiles('Two right triangular tiles with their leg measurements marked, 30 and 40 centimetres on the first and 40 and 30 on the second, both with hypotenuse 50 centimetres.'),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 8. the collected law: formula cards + exam corner              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect everything the lesson proved, in the form the revision sheet wants. The first is the correspondence law \u2014 the six-fact contract that gives ordered congruence statements their power. The second is the SSS distance check, the screen-and-name procedure this lesson ran in full on the witness pair and that the next lesson will prove minimal. The third is the definition itself, written as a motion claim. The fourth is the preservation law the engine brute-forced. The fifth is the uniqueness ladder, the census\u2019s boundary between scalene, isosceles and equilateral.',
    },
    {
      kind: 'formula',
      name: 'The correspondence law',
      latex: 'ABC \\cong A\u2032C\u2032B\u2032 \\;\\Rightarrow\\; AB = A\u2032C\u2032,\\ BC = C\u2032B\u2032,\\ CA = B\u2032A\u2032,\\ \\angle A = \\angle A\u2032,\\ \\angle B = \\angle C\u2032,\\ \\angle C = \\angle B\u2032',
      note: 'the order of the letters IS the correspondence: three side facts and three angle facts ride one statement \u2014 and nothing outside the order is claimed',
    },
    {
      kind: 'formula',
      name: 'The SSS distance check (the screen)',
      latex: '\\{|AB|, |BC|, |CA|\\} = \\{|A\u2032B\u2032|, |B\u2032C\u2032|, |C\u2032A\u2032|\\} \\;\\Rightarrow\\; \\text{name the matching correspondence}',
      note: 'screen first (multiset equality), then the order; for a scalene pair the valid correspondence is UNIQUE \u2014 finding it IS the check',
    },
    {
      kind: 'formula',
      name: 'The superposition test',
      latex: 'X \\cong Y \\;\\Leftrightarrow\\; \\text{some rigid motion } M \\text{ carries } X \\text{ onto } Y,\\ M(X) = Y',
      note: 'slide, turn or flip \u2014 never stretch; the coincidence is exact, point for point',
    },
    {
      kind: 'formula',
      name: 'Rigid motions preserve distance',
      latex: '|M(P)\\,M(Q)| = |PQ| \\quad \\text{for translation, rotation, reflection}',
      note: 'the engine\u2019s witness: rotations by multiples of 30 degrees, three mirrors, translations and compositions all keep the witness distances 6, 10, 8',
    },
    {
      kind: 'formula',
      name: 'The uniqueness ladder',
      latex: '\\text{scalene}: 1, \\quad \\text{isosceles}: 2, \\quad \\text{equilateral}: 6',
      note: 'valid self-correspondences per triangle: uniqueness of the congruence correspondence is a scalene phenomenon, verified by the six-permutation census',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: correspondence first, screen second, mirror third',
      text: 'Three habits pay marks here. FIRST, correspondence-first answering: when a question says two triangles are congruent, WRITE the ordered statement before any equality \u2014 the letters in order tell you which side equals which and which angle equals which; an equality read off the wrong pairing (the $6 = 8$ trap) forfeits the whole solution. SECOND, the multiset screen as the fast SSS move: list the three sides of each triangle, sort them, compare \u2014 unequal multisets end the problem instantly (the perimeter trap $\{6, 8, 10\}$ vs $\{5, 9, 10\}$ and the area trap $8 \\times 2$ vs $4 \\times 4$ are the standard false-certificate options); equal multisets earn the right to name a correspondence. THIRD, the mirror trap: when the candidates are slide, turn, flip, run the orientation audit \u2014 if the correspondence reverses the vertex order (signed area flips sign), the only possible carrier is the reflection; \u201ccongruent\u201d alone does NOT license \u201ca rotation carries one to the other\u201d. Typical mark scheme: naming the correspondence is a mark; the three side checks are a mark; the motion verdict with its reason is a mark.',
    },

    /* -------------------------------------------------------------- */
    /* 9. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'congruent figures', def: 'Two figures said to be congruent if one can be carried onto the other by a rigid motion, coinciding exactly, point for point. Symbolically $X \\cong Y$ iff some rigid motion $M$ has $M(X) = Y$: same shape AND same size.' },
        { term: 'superposition', def: 'The defining test of congruence: one figure is placed upon the other by sliding, turning or flipping, and the verdict is read from whether they coincide exactly. Euclid\u2019s own instrument in I.4.' },
        { term: 'correspondence', def: 'A one-to-one pairing of the vertices of one triangle with those of another. The ordered statement triangle $ABC \\cong A\u2032C\u2032B\u2032$ asserts $A \\leftrightarrow A\u2032$, $B \\leftrightarrow C\u2032$, $C \\leftrightarrow B\u2032$ \u2014 the order of the letters is the pairing.' },
        { term: 'the six facts', def: 'What one ordered congruence statement carries: $AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$ (sides ride consecutive letter pairs) and $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$ (angles ride single letters).' },
        { term: 'rigid motion', def: 'A map of the plane onto itself preserving every distance: $|M(P)\\,M(Q)| = |PQ|$ always. Translations, rotations, reflections and their compositions; the carriers licensed by the definition of congruence.' },
        { term: 'direct motion', def: 'A rigid motion that preserves orientation \u2014 translations and rotations, and any composition of them: a counterclockwise listing stays counterclockwise, signed areas keep their sign.' },
        { term: 'opposite motion', def: 'A rigid motion that reverses orientation \u2014 reflections, and any composition involving an odd number of them: a counterclockwise listing comes back clockwise, signed areas flip sign.' },
        { term: 'orientation', def: 'The handedness of a vertex listing, read from the signed double-area: $(A, B, C)$ with $+48$ is counterclockwise on the witness pair; its swap $(A\u2032, C\u2032, B\u2032)$ with $-48$ is clockwise. The invariant that separates direct from opposite motions.' },
        { term: 'mirror image', def: 'The copy a reflection produces: congruent to the original by every distance, yet unreachable from it by any direct motion when the correspondence reverses the vertex order \u2014 the mirror clause of the lesson.' },
        { term: 'SSS distance check', def: 'The congruence procedure: compute all three sides of each triangle, compare the multisets (the screen), then name the correspondence that matches equal lengths (the order). On scalene pairs the valid correspondence is unique.' },
        { term: 'side multiset', def: 'The unordered collection of a triangle\u2019s three side lengths, e.g. $\\{6, 8, 10\\}$. Multiset equality is necessary for congruence; its failure (as for $\\{6, 8, 10\\}$ vs $\\{5, 9, 10\\}$) is instant refutation.' },
        { term: 'the witness pair', def: 'The chapter\u2019s reusable example: $T_1 = (0,0), (6,0), (0,8)$ with sides $6, 10, 8$ and $T_2 = (0,0), (8,0), (0,6)$ with sides $8, 10, 6$, both counterclockwise \u2014 congruent with the unique correspondence $(0, 2, 1)$, realized only by the reflection across $y = x$.' },
        { term: 'the perimeter trap', def: 'The false certificate \u201cequal perimeters, hence congruent\u201d: refuted by sides $(6, 8, 10)$ vs $(5, 9, 10)$, both totals $24$, both genuine triangles, different multisets. One number cannot enforce three matches.' },
        { term: 'the area trap', def: 'The false certificate \u201cequal areas, hence congruent\u201d: refuted by the $8 \\times 2$ rectangle vs the $4 \\times 4$ square, both area $16$, different side cycles and different diagonals ($\\sqrt{68}$ vs $\\sqrt{32}$).' },
        { term: 'the uniqueness ladder', def: 'The census\u2019s boundary values: a scalene triangle admits exactly $1$ valid self-correspondence, an isosceles triangle $2$ (identity plus the equal-sides swap), an equilateral triangle all $6$.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz (key [1,3,0,2,1] — PINNED)                            */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Two plane figures are said to be congruent exactly when \u2014',
          options: [
            'they cover the same area, whatever their sides and angles do',
            'one figure can be moved \u2014 slid, turned, or flipped, with no stretching \u2014 so that it coincides with the other exactly, point for point',
            'their perimeters are equal, since equal boundary length means equal figures',
            'they merely look alike: same rough shape at a glance',
          ],
          answer: 1,
          explain: 'The definition is superposition: some rigid motion (slide, turn or flip \u2014 never a stretch) carries one figure onto the other so that every point lands on its partner exactly. Option (a) fails on the 8 by 2 rectangle vs the 4 by 4 square \u2014 both area 16, no motion carries one onto the other. Option (c) fails on the triangles with sides 6, 8, 10 vs 5, 9, 10 \u2014 both perimeters 24, different side multisets, so SSS refuses. Option (d) is not a definition at all: appearance is not coincidence, and stretched drawings make unequal figures look alike. Only the coincidence under a distance-preserving motion certifies congruence.',
        },
        {
          q: 'A solution writes triangle $ABC \\cong A\u2032C\u2032B\u2032$. What exactly does the ORDER of that statement assert?',
          options: [
            'nothing in particular \u2014 the letters are decoration and only the side lengths matter',
            'that $A$ answers to $A\u2032$, $B$ answers to $B\u2032$, $C$ answers to $C\u2032$, since primes match primes',
            'that the two triangles merely have equal area, whatever the letters say',
            'that $A$ answers to $A\u2032$, $B$ answers to $C\u2032$, $C$ answers to $B\u2032$, so $AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$, and the angles follow in the same pattern',
          ],
          answer: 3,
          explain: 'The order of the letters IS the correspondence: the second letter of the first triangle answers the second letter of the second triangle, and so on. So $ABC \\cong A\u2032C\u2032B\u2032$ pairs $A$ with $A\u2032$, $B$ with $C\u2032$, $C$ with $B\u2032$, carrying exactly six facts: the three side equalities from consecutive letter pairs and the three angle equalities from single letters. Option (a) throws away the contract and licenses false equalities like $AB = A\u2032B\u2032$, which on the witness pair would demand $6 = 8$. Option (b) invents a rule the notation never had \u2014 primes do not auto-match; the POSITION in the ordered list does. Option (c) confuses congruence with the area trap: equal area ($16 = 16$ on the pinned rectangle witness) certifies nothing.',
        },
        {
          q: 'A scalene triangle is compared with a congruent copy. How many of the six vertex correspondences map every side onto an equal side?',
          options: [
            'exactly one \u2014 for a scalene pair the congruence correspondence is unique, and finding it IS the SSS distance check',
            'two \u2014 one for each direction of reading the statement',
            'three \u2014 one for each vertex that could be held fixed',
            'all six \u2014 any relabelling of a congruent pair is automatically valid',
          ],
          answer: 0,
          explain: 'Scalene means all three side lengths are distinct, so each side of the copy has exactly ONE possible partner of equal length; the side of length 6 has no choice, the side of length 10 has no choice, and the shared-vertex logic then forces the third pairing \u2014 at most one correspondence survives, and congruence guarantees one does. The engine\u2019s census confirms it on the witness pair: exactly the permutation $(0, 2, 1)$ is valid, five are rejected on named side demands. Option (d) is the equilateral case, not the scalene one \u2014 only when all sides are equal do all six readings survive. Option (b) describes the isosceles case (two valid self-correspondences). Option (c) has no census meaning: holding a vertex \u201cfixed\u201d is not a correspondence criterion.',
        },
        {
          q: 'The witness pair: $T_1$ has vertices $(0, 0)$, $(6, 0)$, $(0, 8)$ and $T_2$ has vertices $(0, 0)$, $(8, 0)$, $(0, 6)$, both listed counterclockwise. Under the unique correspondence $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$, which motion carries $T_1$ onto $T_2$?',
          options: [
            'a rotation about the origin \u2014 turning the long leg onto the long leg',
            'a translation that slides $T_1$ along the diagonal onto $T_2$',
            'the reflection across the line $y = x$ \u2014 an opposite (orientation-reversing) motion',
            'no rigid motion can, since the two triangles have different areas',
          ],
          answer: 2,
          explain: 'The reflection $(x, y) \\to (y, x)$ acts point for point: $(0, 0) \\to (0, 0)$, $(6, 0) \\to (0, 6)$, $(0, 8) \\to (8, 0)$ \u2014 exactly the unique correspondence. Option (a): the $90^\\circ$ rotation about the origin does carry $(6, 0)$ to $(0, 6)$, but it carries $(0, 8)$ to $(-8, 0)$, not to $(8, 0)$ \u2014 and the general reason is orientation: direct motions keep the signed area at $+48$, while this correspondence demands $-48$. Option (b): the slide that lands $B$ on $C\u2032$ is $(-6, 6)$, which wrecks $A$ (landing at $(-6, 6)$, not the origin). Option (d) is false on the arithmetic \u2014 both triangles have area $24$ (half of 6 by 8 and of 8 by 6); the obstruction is orientation, not area.',
        },
        {
          q: 'Triangle $X$ has sides $6$, $8$, $10$ and triangle $Y$ has sides $5$, $9$, $10$; both perimeters are $24$, and both satisfy the triangle inequality. The verdict is \u2014',
          options: [
            'congruent by SSS \u2014 equal totals force the sides to match',
            'not congruent \u2014 the side multisets $\\{6, 8, 10\\}$ and $\\{5, 9, 10\\}$ differ, so SSS refuses; the shared total certifies nothing',
            'congruent, because a triangle\u2019s shape is determined by its perimeter alone',
            'not congruent, because one of them must be obtuse and the other right-angled',
          ],
          answer: 1,
          explain: 'SSS works on PARTS, not totals: match side against side and the pairs fail pairwise ($6$ against $5$, $8$ against $9$), so no correspondence maps every side onto an equal side and the triangles are not congruent. The witness is the lesson\u2019s pinned perimeter trap: two genuine triangles, both perimeter 24, different multisets. Option (a) is exactly the trap the strip diagram refutes \u2014 one number cannot enforce three matches. Option (c) is false as arithmetic: perimeter does not determine shape (infinitely many triangles share a total; both witnesses here do). Option (d) is false on the facts: the 5, 9, 10 triangle is acute at its largest angle (since $5^2 + 9^2 = 106 > 100$), and the verdict never needed angle talk anyway \u2014 the multiset comparison is complete.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the correspondence discipline and the SSS screen',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Triangle $ABC$ has vertices $A(0, 0)$, $B(6, 0)$, $C(0, 8)$. Compute its three side lengths with the distance formula, its perimeter, and the size of the angle at $A$.',
              solution: [
                'Sol. Apply the distance formula to each side, starting with the base: $AB = \\sqrt{(6-0)^2 + (0-0)^2} = \\sqrt{36} = 6$.',
                'The hypotenuse: $BC = \\sqrt{(0-6)^2 + (8-0)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
                'The vertical leg: $CA = \\sqrt{(0-0)^2 + (0-8)^2} = 8$.',
                'Add for the perimeter: $6 + 10 + 8 = 24$.',
                'Now, the angle at $A$ sits between the legs $AB$ and $CA$, which lie along the two coordinate axes \u2014 they meet at right angles, so $\\angle A = 90^\\circ$; equally, $6^2 + 8^2 = 100 = 10^2$ (the converse Pythagoras check).',
                'Hence the sides are $6$, $10$, $8$, the perimeter is $24$, and the angle at $A$ is $90^\\circ$.',
              ],
              answer: '$AB = 6$, $BC = 10$, $CA = 8$; perimeter $24$; $\\angle A = 90^\\circ$',
            },
            {
              q: 'A solution states triangle $ABC \\cong A\u2032C\u2032B\u2032$. Write down ALL six equalities the statement carries, reading the order correctly.',
              solution: [
                'Sol. Read the correspondence from the positions: the first letters pair, then the second, then the third \u2014 so $A \\leftrightarrow A\u2032$, $B \\leftrightarrow C\u2032$, $C \\leftrightarrow B\u2032$.',
                'Sides ride consecutive letter pairs: $AB$ answers $A\u2032C\u2032$, giving $AB = A\u2032C\u2032$.',
                'Next pair: $BC$ answers $C\u2032B\u2032$, giving $BC = C\u2032B\u2032$.',
                'Closing pair: $CA$ answers $B\u2032A\u2032$, giving $CA = B\u2032A\u2032$.',
                'Angles ride single letters: $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$.',
                'Hence the six facts: $AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$, $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$ \u2014 and nothing outside this order (in particular NOT $AB = A\u2032B\u2032$).',
              ],
              answer: '$AB = A\u2032C\u2032$, $BC = C\u2032B\u2032$, $CA = B\u2032A\u2032$; $\\angle A = \\angle A\u2032$, $\\angle B = \\angle C\u2032$, $\\angle C = \\angle B\u2032$',
            },
            {
              q: 'Triangle $ABC$ has $A(0, 0)$, $B(3, 0)$, $C(3, 4)$; triangle $A\u2032B\u2032C\u2032$ has $A\u2032(0, 0)$, $B\u2032(4, 0)$, $C\u2032(4, 3)$. Are they congruent? If so, name the correspondence in order.',
              solution: [
                'Sol. Compute the sides of $ABC$: $AB = 3$, $BC = \\sqrt{(3-3)^2 + (4-0)^2} = 4$, $CA = \\sqrt{9 + 16} = 5$.',
                'Compute the sides of $A\u2032B\u2032C\u2032$: $A\u2032B\u2032 = 4$, $B\u2032C\u2032 = \\sqrt{(4-4)^2 + (3-0)^2} = 3$, $C\u2032A\u2032 = 5$.',
                'Run the screen: multisets $\\{3, 4, 5\\}$ and $\\{4, 3, 5\\}$ agree \u2014 a correspondence may exist.',
                'Match lengths: $AB = 3$ matches only $B\u2032C\u2032 = 3$, so $\\{A, B\\}$ answers to $\\{B\u2032, C\u2032\\}$; $BC = 4$ matches only $A\u2032B\u2032 = 4$, so $\\{B, C\\}$ answers to $\\{A\u2032, B\u2032\\}$; $CA = 5$ matches $C\u2032A\u2032 = 5$.',
                'Now, read the shared vertices: $B$ (in both of the first two pairs) answers $B\u2032$; then $A \\to C\u2032$ and $C \\to A\u2032$.',
                'Hence the triangles are congruent, and the unique correspondence (the engine\u2019s census agrees: permutation $(2, 1, 0)$, exactly one valid) is $A \\to C\u2032$, $B \\to B\u2032$, $C \\to A\u2032$ \u2014 in statement form, triangle $ABC \\cong C\u2032B\u2032A\u2032$.',
              ],
              answer: 'yes \u2014 triangle $ABC \\cong C\u2032B\u2032A\u2032$ with $A \\to C\u2032$, $B \\to B\u2032$, $C \\to A\u2032$ (the unique valid correspondence)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The distance check. Triangle $PQR$ has $P(0, 0)$, $Q(5, 0)$, $R(0, 12)$; triangle $P\u2032Q\u2032R\u2032$ has $P\u2032(0, 0)$, $Q\u2032(12, 0)$, $R\u2032(0, 5)$. Carry out the full SSS distance check: all six distances, the multiset, the correspondence.',
              solution: [
                'Sol. Sides of $PQR$: $PQ = 5$; $QR = \\sqrt{(0-5)^2 + (12-0)^2} = \\sqrt{25 + 144} = 13$; $RP = 12$.',
                'Sides of $P\u2032Q\u2032R\u2032$: $P\u2032Q\u2032 = 12$; $Q\u2032R\u2032 = \\sqrt{(0-12)^2 + (5-0)^2} = 13$; $R\u2032P\u2032 = 5$.',
                'Run the screen: the multisets $\\{5, 12, 13\\}$ and $\\{12, 13, 5\\}$ agree \u2014 proceed.',
                'Match lengths: the $5$ of $PQR$ is $PQ$; the only length-$5$ side of the copy is $R\u2032P\u2032$, so $\\{P, Q\\}$ answers to $\\{R\u2032, P\u2032\\}$. The $13$ is $QR$, matching $Q\u2032R\u2032$: $\\{Q, R\\}$ answers to $\\{Q\u2032, R\u2032\\}$. The $12$ is $RP$, matching $P\u2032Q\u2032$.',
                'Now, read shared vertices: $P$ appears in the $5$-pair and the $12$-pair and answers $P\u2032$; then $Q \\to R\u2032$ and $R \\to Q\u2032$.',
                'Verify in order: $PQ = 5 = P\u2032R\u2032$; $QR = 13 = R\u2032Q\u2032$; $RP = 12 = Q\u2032P\u2032$ \u2014 all three hold.',
                'Hence triangle $PQR \\cong P\u2032R\u2032Q\u2032$ by SSS, with the unique correspondence $P \\to P\u2032$, $Q \\to R\u2032$, $R \\to Q\u2032$; perimeters agree at $30$ as a corollary.',
              ],
              answer: 'congruent \u2014 triangle $PQR \\cong P\u2032R\u2032Q\u2032$, the unique correspondence $P \\to P\u2032$, $Q \\to R\u2032$, $R \\to Q\u2032$; perimeters $30$ both',
              figures: [
                {
                  caption: 'The distance check grid for Exercise 4: PQR (green) with sides 5, 12, 13 and its swapped copy (orange, dashed), sharing the right-angle vertex, with the correspondence P \u2192 P\u2032, Q \u2192 R\u2032, R \u2192 Q\u2032 in the legend.',
                  svg: geo31Ex4Grid('Two right triangles on a grid, the green one with legs 5 and 12, the orange dashed one with legs 12 and 5, sharing the origin, with the correspondence legend at the right.'),
                },
              ],
            },
            {
              q: 'The 20-unit trap. Triangle $X$ has sides $5$, $6$, $9$; triangle $Y$ has sides $4$, $7$, $9$. Both perimeters are $20$. A student claims: \u201cequal totals, so congruent.\u201d Decide with the SSS screen, and say what the total CAN certify.',
              solution: [
                'Sol. Audit that both are genuine triangles first: $5 + 6 = 11 > 9$ and $4 + 7 = 11 > 9$ \u2014 both pass the triangle inequality, so the claim is not dismissed on a technicality.',
                'Run the screen: multiset of $X$ is $\\{5, 6, 9\\}$; of $Y$ is $\\{4, 7, 9\\}$. The multisets DIFFER.',
                'Conclude by the screen\u2019s logic: no correspondence can map every side onto an equal side (the $5$ of $X$ would need a partner of length $5$ in $Y$, and $Y$ has none) \u2014 the triangles are not congruent.',
                'Diagnose the student\u2019s error: the total $20$ is ONE number; congruence needs THREE side matches. The shared $9$ matches, but $5$ against $4$ and $6$ against $7$ fail \u2014 the total cannot rescue the parts.',
                'Hence NOT congruent; what the total CAN certify is the sum $5 + 6 + 9 = 4 + 7 + 9 = 20$ and nothing about shape \u2014 equal perimeters are a necessary consequence of congruence, never a cause.',
              ],
              answer: 'not congruent \u2014 totals agree at $20$ but the multisets $\\{5, 6, 9\\}$ and $\\{4, 7, 9\\}$ differ; the total certifies only the sum',
              figures: [
                {
                  caption: 'The perimeter trap strip for Exercise 5: two bars of equal total 20, the parts 5, 6, 9 above and 4, 7, 9 below \u2014 the shared total and the differing parts drawn side by side.',
                  svg: geo31Strip({
                    aria: 'Two segmented bars of equal total length 20, split into parts 5, 6, 9 and 4, 7, 9, with the verdict that equal totals do not force congruence.',
                    title: 'THE 20-UNIT PERIMETER TRAP FOR EXERCISE 5',
                    segsA: [5, 6, 9], segsB: [4, 7, 9], total: 20, nameA: 'X', nameB: 'Y',
                    noteA: 'perimeter 20 \u2014 the totals agree',
                    noteB: 'the parts differ: {5, 6, 9} against {4, 7, 9}',
                    verdict: 'NOT congruent \u2014 SSS demands the parts, not the total',
                  }),
                },
              ],
            },
            {
              q: 'A translation by the vector $(2, 2)$ carries triangle $ABC$ with $A(1, 1)$, $B(4, 1)$, $C(1, 5)$ onto a copy. Find the image vertices, verify the side list is preserved, and state why the translation is a rigid motion.',
              solution: [
                'Sol. Apply the rule $(x, y) \\to (x + 2,\\ y + 2)$ to each vertex: $A(1, 1) \\to (3, 3)$; $B(4, 1) \\to (6, 3)$; $C(1, 5) \\to (3, 7)$.',
                'Compute the source sides: $AB = 3$; $BC = \\sqrt{(1-4)^2 + (5-1)^2} = \\sqrt{9 + 16} = 5$; $CA = 4$.',
                'Compute the image sides the same way: $A\u2032B\u2032 = \\sqrt{(6-3)^2 + (3-3)^2} = 3$; $B\u2032C\u2032 = \\sqrt{(3-6)^2 + (7-3)^2} = 5$; $C\u2032A\u2032 = 4$.',
                'Compare: the side list $3, 5, 4$ is preserved exactly \u2014 every pairwise distance survived the slide.',
                'State the reason: a translation adds the same vector to every point, so the DIFFERENCE of two image points equals the difference of the source points; differences are what distances are made of, so every distance is unchanged \u2014 the definition of a rigid motion.',
                'Hence the image is $(3, 3)$, $(6, 3)$, $(3, 7)$ with side list $3, 5, 4$ intact: the copy is congruent to the source, certified by a single explicit motion.',
              ],
              answer: 'the image is $(3, 3)$, $(6, 3)$, $(3, 7)$; the side list $3, 5, 4$ is preserved \u2014 a translation is rigid',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The mirror read. For the witness pair $T_1$: $(0, 0)$, $(6, 0)$, $(0, 8)$ and $T_2$: $(0, 0)$, $(8, 0)$, $(0, 6)$, name the unique correspondence, the motion that realizes it, and the structural reason no rotation or translation can.',
              solution: [
                'Sol. The SSS screen (Illustration 1\u2019s check) certifies triangle $ABC \\cong A\u2032C\u2032B\u2032$: the unique correspondence is $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$.',
                'Test the direct moves: the translation landing $B(6, 0)$ on $C\u2032(0, 6)$ is the slide $(-6, 6)$, which lands $A(0, 0)$ at $(-6, 6)$ \u2014 not $A\u2032(0, 0)$; the $90^\\circ$ rotation landing $B$ on $C\u2032$ lands $C(0, 8)$ at $(-8, 0)$ \u2014 not $B\u2032(8, 0)$.',
                'Find the invariant: the correspondence carries the counterclockwise listing $(A, B, C)$ (signed double-area $+48$) onto $(A\u2032, C\u2032, B\u2032)$ (signed double-area $-48$) \u2014 it REVERSES orientation.',
                'Apply the classification: direct motions (translations, rotations, compositions of them) keep the orientation sign; only opposite motions flip it. So no direct motion can realize this correspondence \u2014 the failures were necessary, not accidental.',
                'Exhibit the carrier: the reflection across the line $y = x$, rule $(x, y) \\to (y, x)$, sends $(0, 0) \\to (0, 0)$, $(6, 0) \\to (0, 6)$, $(0, 8) \\to (8, 0)$ \u2014 exactly the unique correspondence, point for point.',
                'Hence the motion is the reflection across $y = x$: $T_1$ and $T_2$ are mirror images \u2014 congruent by SSS, reachable only by flipping.',
              ],
              answer: 'correspondence $A \\to A\u2032$, $B \\to C\u2032$, $C \\to B\u2032$, realized by the reflection across $y = x$; no direct motion can \u2014 the correspondence reverses orientation',
              figures: [
                {
                  caption: 'The mirror line for Exercise 7: y = x folds T1 onto T2 point for point (A = A\u2032 fixed, (6, 0) across to (0, 6), (0, 8) across to (8, 0)); the fold-arrows are perpendicular to the mirror and bisected by it.',
                  svg: geo31Mirror({ aria: 'The mirror line y equals x folding the green witness triangle onto the orange dashed triangle with two perpendicular fold arrows.', title: 'THE MIRROR LINE y = x FOR EXERCISE 7' }),
                },
              ],
            },
            {
              q: 'The area trap audited. The $8 \\times 2$ rectangle and the $4 \\times 4$ square. Equal areas? Congruent? Give TWO independent invariants that separate them.',
              solution: [
                'Sol. Confirm the tempting fact: $8 \\times 2 = 16$ and $4 \\times 4 = 16$ \u2014 the areas agree.',
                'Invariant one, the side cycle: reading sides in order, the rectangle runs $8, 2, 8, 2$ and the square $4, 4, 4, 4$. A rigid motion between congruent rectangles must carry each side to an equal side; the square has no side of length $8$, so no correspondence of vertices can match side against side.',
                'Invariant two, the diagonal: the rectangle\u2019s diagonal is $\\sqrt{8^2 + 2^2} = \\sqrt{68} \\approx 8.2462$; the square\u2019s is $\\sqrt{4^2 + 4^2} = \\sqrt{32} \\approx 5.6569$. A rigid motion carries diagonals to diagonals and preserves their length; $8.2462 \\ne 5.6569$, so the diagonal alone already forbids it.',
                'Conclude: equal area is necessary for congruence (a rigid motion preserves area) but nowhere near sufficient \u2014 two independent invariants (side cycle, diagonal) separate the pair.',
                'Hence NOT congruent, and the moral generalizes: a single agreeing number \u2014 area $16$, perimeter $24$, angle sum $180^\\circ$ \u2014 never certifies a coincidence that demands every distance.',
              ],
              answer: 'equal areas ($16$ each) but NOT congruent \u2014 separated by the side cycle $(8, 2, 8, 2)$ vs $(4, 4, 4, 4)$ and by the diagonals $\\sqrt{68} \\approx 8.2462$ vs $\\sqrt{32} \\approx 5.6569$',
            },
            {
              q: 'The isosceles census. Triangle with vertices $A(0, 0)$, $B(6, 0)$, $C(3, 4)$ has sides $AB = 6$, $BC = 5$, $CA = 5$. How many of the six self-correspondences map every side onto an equal side? Name them.',
              solution: [
                'Sol. Note the shape: two equal sides $BC = CA = 5$ with base $AB = 6$ \u2014 isosceles with apex at $C$.',
                'Test the identity $(A \\to A, B \\to B, C \\to C)$: every side answers itself \u2014 valid.',
                'Test the base-swap $(A \\to B, B \\to A, C \\to C)$: $AB = 6$ answers $BA = 6$; $BC = 5$ answers $AC = 5$; $CA = 5$ answers $CB = 5$ \u2014 all three demands hold, because the two equal sides exchange places. Valid.',
                'Test a third, say $(A \\to B, B \\to C, C \\to A)$: $AB = 6$ would answer $BC = 5$ \u2014 a $6$ asked to equal a $5$; rejected.',
                'The remaining three permutations each land some $6$ on a $5$ (the base has only one equal-length partner), so each is rejected \u2014 the engine\u2019s census confirms: exactly two valid, the identity and $(1, 0, 2)$.',
                'Hence exactly $2$ self-correspondences: the identity and the swap $A \\leftrightarrow B$ with the apex $C$ fixed \u2014 the isosceles symmetry wearing the clothes of a correspondence, the middle rung of the ladder scalene $1$, isosceles $2$, equilateral $6$.',
              ],
              answer: 'exactly $2$: the identity $(0, 1, 2)$ and the base-swap $(1, 0, 2)$ with $A \\leftrightarrow B$, $C$ fixed',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Correspondence-first answering (exam-style). Triangles $ABC$ and $PQR$ satisfy $AB = PQ = 4$, $BC = QR = 6$, $CA = RP = 8$. Write the congruence statement in order, list the six equalities, and explain why the statement must be settled BEFORE any angle is named.',
              solution: [
                'Sol. Match the given equalities to the letter positions: $AB$ answers $PQ$, $BC$ answers $QR$, $CA$ answers $RP$ \u2014 so the shared letters force $A \\to P$, $B \\to Q$, $C \\to R$.',
                'Write the statement in order: triangle $ABC \\cong PQR$.',
                'Read off the six facts: $AB = PQ = 4$; $BC = QR = 6$; $CA = RP = 8$; and the angles $\\angle A = \\angle P$, $\\angle B = \\angle Q$, $\\angle C = \\angle R$ (their sizes come from the side data, not from a picture).',
                'Explain the ordering discipline: had a student carelessly written $ABC \\cong PRQ$, the statement would demand $AB = PR = 8$ \u2014 false against the given $AB = 4$; the contract would contradict the data, and every angle read from it ($\\angle B = \\angle R$ instead of $\\angle B = \\angle Q$) would inherit the error.',
                'Check the correspondence before the equalities, and the equalities before the angles \u2014 the order is the license for everything downstream.',
                'Hence triangle $ABC \\cong PQR$ with $A \\to P$, $B \\to Q$, $C \\to R$, and the six equalities as listed.',
              ],
              answer: 'triangle $ABC \\cong PQR$ ($A \\to P$, $B \\to Q$, $C \\to R$); the six equalities ride that order',
            },
            {
              q: 'The rotation audit. The point $(3, 1)$ is rotated $90^\\circ$ about the origin. Where does it land? Verify that its distance from the origin is unchanged, and state the general fact this instance illustrates.',
              solution: [
                'Sol. Apply the rotation rule with $\\theta = 90^\\circ$: $(x, y) \\to (x\\cos 90^\\circ - y\\sin 90^\\circ,\\ x\\sin 90^\\circ + y\\cos 90^\\circ) = (-y, x)$.',
                'Now, evaluate: $(3, 1) \\to (-1, 3)$.',
                'Check the distance before: $\\sqrt{3^2 + 1^2} = \\sqrt{10}$.',
                'Check the distance after: $\\sqrt{(-1)^2 + 3^2} = \\sqrt{1 + 9} = \\sqrt{10}$ \u2014 unchanged, as claimed.',
                'State the general fact: a rotation about a center moves every point along the circle of its distance from that center, so that distance is invariant; since a rigid motion preserves ALL pairwise distances, any two points $P$, $Q$ keep $|PQ|$ under rotation \u2014 which is exactly why the engine\u2019s rot90 sweep preserved the witness triangle\u2019s distances $6$, $10$, $8$.',
                'Hence $(3, 1) \\to (-1, 3)$, distance $\\sqrt{10}$ both ways \u2014 one instance of \u201crotations preserve distance\u201d.',
              ],
              answer: '$(3, 1) \\to (-1, 3)$; the distance $\\sqrt{10}$ is unchanged \u2014 rotations preserve distance',
            },
            {
              q: 'The orientation audit. Triangle $A(0, 0)$, $B(4, 0)$, $C(4, 3)$ is reflected across the $y$-axis. Find the image vertices and decide whether the reflection preserved or reversed the orientation, with the signed-area computation.',
              solution: [
                'Sol. Apply the mirror rule $(x, y) \\to (-x, y)$: $A(0, 0) \\to (0, 0)$; $B(4, 0) \\to (-4, 0)$; $C(4, 3) \\to (-4, 3)$.',
                'Compute the signed double-area of the source listing $(A, B, C)$: $(4-0)(3-0) - (0-0)(4-0) = 12$, positive \u2014 counterclockwise.',
                'Compute the signed double-area of the image listing: $(-4-0)(3-0) - (0-0)(-4-0) = -12$, negative \u2014 clockwise.',
                'Compare: the sign flipped, $+12 \\to -12$, while the areas themselves agree at $6$ each \u2014 the reflection changed the handedness, not the size.',
                'Classify the motion: this is exactly the direct/opposite split \u2014 reflections are OPPOSITE motions, reversing orientation while preserving every distance.',
                'Hence the image is $(0, 0)$, $(-4, 0)$, $(-4, 3)$ and the orientation is REVERSED (signed $+12 \\to -12$; areas $6$ both) \u2014 the image is congruent to the source but reachable only by flipping.',
              ],
              answer: 'the image is $(0, 0)$, $(-4, 0)$, $(-4, 3)$; orientation REVERSED (signed $+12 \\to -12$, areas $6$ both)',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Show that equal perimeter never forces congruence: produce two DIFFERENT integer-sided triangles with perimeter $24$, verify both are genuine, and give the SSS verdict. Then state the general moral in one sentence.',
              solution: [
                'Sol. Produce the pair: triangle $X$ with sides $6, 8, 10$ and triangle $Y$ with sides $5, 9, 10$.',
                'Check the totals: $6 + 8 + 10 = 24$ and $5 + 9 + 10 = 24$ \u2014 equal perimeters, as demanded.',
                'Check both are genuine: $6 + 8 = 14 > 10$ and $5 + 9 = 14 > 10$ \u2014 both satisfy the triangle inequality, so neither is dismissed on a technicality.',
                'Run the screen: the multiset of $X$ is $\\{6, 8, 10\\}$, of $Y$ is $\\{5, 9, 10\\}$ \u2014 different multisets, so no correspondence maps every side onto an equal side.',
                'Hence NOT congruent (the SSS verdict), and the moral: a perimeter is ONE number while congruence demands THREE side matches \u2014 equality of totals is a consequence of congruence, never a cause of it.',
              ],
              answer: '$(6, 8, 10)$ and $(5, 9, 10)$: both perimeters $24$, multisets differ \u2014 not congruent',
            },
            {
              q: 'The rotation algebra. A rotation by angle $\\theta$ about the origin maps $(x, y)$ to $(x\\cos\\theta - y\\sin\\theta,\\ x\\sin\\theta + y\\cos\\theta)$. Show algebraically that the distance from the origin is preserved; then witness the result at $\\theta = 30^\\circ$ on the point $(4, 0)$.',
              solution: [
                'Sol. Write the image $P\u2019 = (x\\cos\\theta - y\\sin\\theta,\\ x\\sin\\theta + y\\cos\\theta)$ and square its distance from the origin.',
                'Expand: $|P\u2019|^2 = (x\\cos\\theta - y\\sin\\theta)^2 + (x\\sin\\theta + y\\cos\\theta)^2$.',
                'Open both squares: $= x^2\\cos^2\\theta - 2xy\\cos\\theta\\sin\\theta + y^2\\sin^2\\theta + x^2\\sin^2\\theta + 2xy\\cos\\theta\\sin\\theta + y^2\\cos^2\\theta$.',
                'Collect: the cross terms cancel, and $x^2(\\cos^2\\theta + \\sin^2\\theta) + y^2(\\sin^2\\theta + \\cos^2\\theta) = x^2 + y^2$ by the identity $\\cos^2\\theta + \\sin^2\\theta = 1$.',
                'Hence $|P\u2019|^2 = x^2 + y^2 = |P|^2$: every point keeps its distance from the origin under rotation \u2014 and applying the same argument to the difference of two points shows every pairwise distance survives, which is why the engine\u2019s twelve-rotation sweep never moved the witness distances $6$, $10$, $8$.',
                'Witness it at $\\theta = 30^\\circ$ on $(4, 0)$: the image is $(4\\cos 30^\\circ, 4\\sin 30^\\circ) = (2\\sqrt{3}, 2)$, and indeed $\\sqrt{(2\\sqrt{3})^2 + 2^2} = \\sqrt{12 + 4} = 4$ \u2014 the distance $4$ survives.',
              ],
              answer: 'distance preserved: $|P\u2019|^2 = x^2 + y^2$; at $30^\\circ$ the image of $(4, 0)$ is $(2\\sqrt{3}, 2)$, still at distance $4$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The uniqueness proof. Prove that a scalene triangle admits EXACTLY ONE vertex correspondence onto a congruent copy that maps every side onto an equal side. Support the proof with the census ladder \u2014 scalene witness $1$, isosceles $(5, 5, 6)$ witness $2$, equilateral witness $6$ \u2014 and explain where each rung comes from.',
              solution: [
                'Sol. Set up the census: a correspondence is a bijection of three vertices onto three vertices, so there are exactly $3! = 6$ candidates \u2014 the census is finite, and brute force is a proof, not just an experiment.',
                'Observation: a valid correspondence must map each side onto an equal side, so the side multiset of the image must equal the side multiset of the source \u2014 the SSS screen is a necessary condition.',
                'Now, use scalene: all three side lengths are distinct, so inside the congruent copy there is EXACTLY ONE side of each length. The side $AB$ has a unique partner: its endpoints $\u2223$ the endpoints of the copy\u2019s unique length-$|AB|$ side. Likewise $BC$. Two vertex-pairs are thereby forced.',
                'Finish the forcing: the two forced pairs share the vertex $B$; their partners share a vertex of the copy; that shared vertex must be the image of $B$. The images of $A$ and $C$ are now forced as well \u2014 the correspondence admits no freedom, so AT MOST one candidate is valid.',
                'Existence: since the copy is congruent to the source, some rigid motion carries source onto copy, and its vertex pairing passes all three side demands \u2014 so at least one is valid. At most one, at least one: EXACTLY one.',
                'Read the ladder as the boundary of the argument: scalene $1$ (the engine\u2019s witness-pair census found exactly $(0, 2, 1)$); isosceles $(5, 5, 6)$ $2$ \u2014 the two equal sides make the base-swap $(1, 0, 2)$ valid alongside the identity; equilateral $6$ \u2014 all sides equal, so every permutation passes. The uniqueness step used \u201cexactly one side of each length\u201d, which is precisely the property scalene has and the others lack.',
                'Hence the theorem: for a scalene pair the congruence correspondence is unique \u2014 and finding it IS the SSS distance check; the ladder $1, 2, 6$ shows uniqueness is a scalene phenomenon, not a general one.',
              ],
              answer: 'scalene exactly $1$; isosceles $2$; equilateral $6$ \u2014 uniqueness is a scalene phenomenon, proved by the forced-pairing argument and confirmed by the census',
            },
          ],
        },
      ],
    },
  ],
}
