import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c33 = {
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
const f33 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo33 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo33Txt = (
  x: number, y: number, s: string,
  size = 13, color = c33.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f33}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo33Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c33.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo33Dot = (x: number, y: number, color = c33.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo33Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo33Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo33Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c33.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo33Line(x1, y1, x2, y2, color, w) + geo33Head(x2, y2, a, color, 8)
}

const geo33Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** arc centred on (cx, cy), from screen angle a0 to a1 (radians; 0 = east, positive = clockwise on screen) */
const geo33Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/** single tick mark (equal-side marker) at the midpoint of a segment, perpendicular to it */
const geo33Tick = (x1: number, y1: number, x2: number, y2: number, color = c33.amber, s = 9): string => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const L = Math.hypot(x2 - x1, y2 - y1)
  const nx = -(y2 - y1) / L, ny = (x2 - x1) / L
  return geo33Line(mx - nx * s, my - ny * s, mx + nx * s, my + ny * s, color, 2.6)
}

/** the right-angle square at vertex M between directions to P and Q */
const geo33Right = (M: [number, number], P: [number, number], Q: [number, number], s = 13): string => {
  const nrm = (p: [number, number]): [number, number] => {
    const l = Math.hypot(p[0] - M[0], p[1] - M[1])
    return [(p[0] - M[0]) / l, (p[1] - M[1]) / l]
  }
  const u = nrm(P), v = nrm(Q)
  const p1: [number, number] = [M[0] + u[0] * s, M[1] + u[1] * s]
  const p2: [number, number] = [M[0] + (u[0] + v[0]) * s, M[1] + (u[1] + v[1]) * s]
  const p3: [number, number] = [M[0] + v[0] * s, M[1] + v[1] * s]
  return `<path d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} L ${p3[0].toFixed(1)} ${p3[1].toFixed(1)}" fill="none" stroke="${c33.tealInk}" stroke-width="2.2"/>`
}

/* ------------------------------------------------------------------ */
/* the workhorse: a computed isosceles triangle with apex axis          */
/* half-base hb and height h in USER UNITS, scale = px per unit        */
/* ------------------------------------------------------------------ */
const geo33Tri = (o: {
  aria: string
  hb: number
  h: number
  scale?: number
  W?: number
  yBase?: number
  padTop?: number
  aLab?: string
  bLab?: string
  cLab?: string
  mLab?: string
  sideL?: string
  sideR?: string
  baseL?: string
  halfL?: string
  halfR?: string
  hLab?: string
  apexLab?: string
  bAngLab?: string
  cAngLab?: string
  axis?: boolean
  rightMark?: boolean
  ticks?: boolean
  truss?: boolean
  apexLabSide?: boolean
  note?: string
  halfApexLab?: string
}): string => {
  const k = o.scale ?? 15
  const W = o.W ?? 640
  const yB = o.yBase ?? 396
  const padTop = o.padTop ?? 64
  const cx = W / 2
  const B: [number, number] = [cx - o.hb * k, yB]
  const C: [number, number] = [cx + o.hb * k, yB]
  const A: [number, number] = [cx, yB - o.h * k]
  const M: [number, number] = [cx, yB]
  const legColor = o.truss ? c33.amber : c33.ink
  const baseColor = o.truss ? c33.tealInk : c33.ink
  const axisColor = o.truss ? c33.green : c33.teal
  const parts: string[] = []
  // base + legs
  parts.push(geo33Line(B[0], B[1], C[0], C[1], baseColor, 2.6))
  parts.push(geo33Line(A[0], A[1], B[0], B[1], legColor, o.truss ? 3.4 : 2.6))
  parts.push(geo33Line(A[0], A[1], C[0], C[1], legColor, o.truss ? 3.4 : 2.6))
  // apex axis (median)
  if (o.axis) parts.push(geo33Line(A[0], A[1], M[0], M[1], axisColor, 2.4, '7 5'))
  // right-angle mark at M
  if (o.rightMark) parts.push(geo33Right(M, B, A, 13))
  // equal-side ticks on the legs
  if (o.ticks) {
    parts.push(geo33Tick(A[0], A[1], B[0], B[1], c33.orange))
    parts.push(geo33Tick(A[0], A[1], C[0], C[1], c33.orange))
  }
  // vertices + labels
  parts.push(geo33Dot(A[0], A[1], c33.ink, 4.5) + geo33Dot(B[0], B[1], c33.ink, 4.5) + geo33Dot(C[0], C[1], c33.ink, 4.5))
  if (o.axis) parts.push(geo33Dot(M[0], M[1], c33.tealInk, 3.6))
  parts.push(geo33Txt(A[0], A[1] - 16, o.aLab ?? 'A', 13.5, c33.ink))
  parts.push(geo33Txt(B[0] - 16, B[1] + 20, o.bLab ?? 'B', 13.5, c33.ink))
  parts.push(geo33Txt(C[0] + 16, C[1] + 20, o.cLab ?? 'C', 13.5, c33.ink))
  if (o.axis) parts.push(geo33Txt(M[0] + (o.baseL ? 0 : 14), M[1] + 20, o.mLab ?? 'M', 13, c33.tealInk))
  // side labels (on the legs, outside)
  const midAB: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
  const midAC: [number, number] = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2]
  if (o.sideL) parts.push(geo33Txt(midAB[0] - 30, midAB[1] - 8, o.sideL, 13, o.truss ? c33.amber : c33.mid, 'end'))
  if (o.sideR) parts.push(geo33Txt(midAC[0] + 30, midAC[1] - 8, o.sideR, 13, o.truss ? c33.amber : c33.mid, 'start'))
  if (o.baseL) parts.push(geo33Txt(cx, yB + 44, o.baseL, 13, c33.tealInk))
  if (o.halfL) parts.push(geo33Txt(cx - o.hb * k / 2, yB + 20, o.halfL, 12.5, c33.mid))
  if (o.halfR) parts.push(geo33Txt(cx + o.hb * k / 2, yB + 20, o.halfR, 12.5, c33.mid))
  if (o.hLab) parts.push(geo33Txt(cx + 14, yB - (o.h * k) / 2, o.hLab, 13, c33.tealInk, 'start'))
  // angle arcs
  const angBA = Math.atan2(B[1] - A[1], B[0] - A[0]) // ray A->B (down-left, screen angle in (90,180)deg)
  const angCA = Math.atan2(C[1] - A[1], C[0] - A[0]) // ray A->C (down-right)
  parts.push(geo33Arc(A[0], A[1], 26, angCA, angBA, c33.green, 2.4))
  if (o.apexLab) {
    const bis: [number, number] = [(Math.cos((angCA + angBA) / 2)), (Math.sin((angCA + angBA) / 2))]
    if (o.apexLabSide) {
      // flat triangles: park the apex label left of the axis, clear of the king post
      parts.push(geo33Txt(A[0] - 64, A[1] + bis[1] * 52, o.apexLab, 12.5, c33.green, 'end'))
    } else {
      parts.push(geo33Txt(A[0] + bis[0] * 52, A[1] + bis[1] * 52, o.apexLab, 12.5, c33.green))
    }
  }
  if (o.halfApexLab) {
    parts.push(geo33Arc(A[0], A[1], 40, angCA, (angCA + angBA) / 2, c33.orange, 2.2))
    const bis2 = (angCA + angBA) / 2
    parts.push(geo33Txt(A[0] + Math.cos((angCA + bis2) / 2) * 62, A[1] + Math.sin((angCA + bis2) / 2) * 62, o.halfApexLab, 11.5, c33.orange))
  }
  const angAB = Math.atan2(A[1] - B[1], A[0] - B[0]) // ray B->A (up-right, negative screen angle)
  parts.push(geo33Arc(B[0], B[1], 24, 0, angAB, c33.green, 2.4))
  if (o.bAngLab) {
    const bis = angAB / 2
    const bx = B[0] + Math.cos(bis) * 48
    parts.push(geo33Txt(bx, B[1] + Math.sin(bis) * 48, o.bAngLab, 12.5, c33.green, bx < 70 ? 'start' : bx > W - 70 ? 'end' : 'middle'))
  }
  const angAC = Math.atan2(A[1] - C[1], A[0] - C[0]) // ray C->A (up-left)
  parts.push(geo33Arc(C[0], C[1], 24, Math.PI, angAC, c33.green, 2.4))
  if (o.cAngLab) {
    const bis = (Math.PI + angAC) / 2
    const cx2 = C[0] + Math.cos(bis) * 48
    parts.push(geo33Txt(cx2, C[1] + Math.sin(bis) * 48, o.cAngLab, 12.5, c33.green, cx2 < 70 ? 'start' : cx2 > W - 70 ? 'end' : 'middle'))
  }
  if (o.note) parts.push(geo33Txt(cx, yB + (o.baseL ? 70 : 48), o.note, 12.5, c33.tealInk))
  const H = Math.max(yB + (o.baseL ? 84 : 60) + (o.note ? 4 : 0), yB - o.h * k + padTop + 30)
  return geo33Svg(W, H, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the doubled-triangle proof diagram with correspondence arrows   */
/* ------------------------------------------------------------------ */
const geo33Doubled = (): string => {
  const W = 640, H = 470
  const yB = 330
  const B: [number, number] = [235, yB]
  const C: [number, number] = [385, yB]
  const A: [number, number] = [310, yB - 150]
  const parts: string[] = []
  parts.push(geo33Line(B[0], B[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], B[0], B[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Tick(A[0], A[1], B[0], B[1], c33.orange))
  parts.push(geo33Tick(A[0], A[1], C[0], C[1], c33.orange))
  parts.push(geo33Dot(A[0], A[1], c33.ink, 4.5) + geo33Dot(B[0], B[1], c33.ink, 4.5) + geo33Dot(C[0], C[1], c33.ink, 4.5))
  parts.push(geo33Txt(A[0], A[1] - 46, 'A \u2192 A', 13, c33.orange))
  parts.push(geo33Txt(B[0] - 18, B[1] + 22, 'B', 13.5, c33.ink))
  parts.push(geo33Txt(C[0] + 18, C[1] + 22, 'C', 13.5, c33.ink))
  parts.push(geo33Txt(A[0], A[1] - 18, 'A', 13.5, c33.ink))
  // the swap arcs: B -> C (orange, shallow) and C -> B (amber, deeper, dashed)
  parts.push(geo33Arc(310, yB + 34, 130, (160 * Math.PI) / 180, (20 * Math.PI) / 180, c33.orange, 2.6))
  parts.push(geo33Head(310 + 130 * Math.cos((20 * Math.PI) / 180), yB + 34 + 130 * Math.sin((20 * Math.PI) / 180), -80, c33.orange, 9))
  parts.push(geo33Txt(310, yB + 76, 'B \u2192 C', 13, c33.orange))
  parts.push(geo33Arc(310, yB + 90, 180, (150 * Math.PI) / 180, (30 * Math.PI) / 180, c33.amber, 2.4, '6 5'))
  parts.push(geo33Head(310 + 180 * Math.cos((150 * Math.PI) / 180), yB + 90 + 180 * Math.sin((150 * Math.PI) / 180), 100, c33.amber, 9))
  parts.push(geo33Txt(310, yB + 118, 'C \u2192 B', 13, c33.amber))
  // the SAS data panel
  parts.push(geo33Rect(20, 96, 330, 190, c33.panel, c33.sep))
  parts.push(geo33Txt(185, 124, 'THE DOUBLED READING', 13, c33.ink, 'middle', '700'))
  parts.push(geo33Txt(185, 144, 'one figure, two names', 12, c33.tealInk))
  parts.push(geo33Txt(185, 166, 'triangle ABC  \u2194  triangle ACB', 13, c33.tealInk))
  parts.push(geo33Txt(40, 192, 'AB = AC   (given, read left)', 12.5, c33.mid, 'start'))
  parts.push(geo33Txt(40, 214, 'AC = AB   (given, read again)', 12.5, c33.mid, 'start'))
  parts.push(geo33Txt(40, 236, 'angle BAC = angle CAB (shared, included)', 12.5, c33.mid, 'start'))
  parts.push(geo33Txt(40, 258, 'SAS (I.4): the triangles are congruent', 12.5, c33.ink, 'start'))
  parts.push(geo33Txt(40, 280, 'so angle ABC = angle ACB', 12.5, c33.orange, 'start'))
  // conclusion banner
  parts.push(geo33Rect(372, 96, 246, 76, c33.panel2, c33.sep))
  parts.push(geo33Txt(495, 124, 'PONS ASINORUM \u2014 EUCLID I.5', 12.5, c33.ink, 'middle', '700'))
  parts.push(geo33Txt(495, 148, 'equal legs,', 12.5, c33.tealInk))
  parts.push(geo33Txt(495, 168, 'equal base angles', 12.5, c33.tealInk))
  parts.push(geo33Txt(310, 452, 'no auxiliary construction: SAS on the two namings of one triangle', 12.5, c33.tealInk))
  return geo33Svg(W, H, 'An isosceles triangle ABC with equal legs marked by ticks, orange and amber curved arrows swapping vertices B and C and fixing A, and side panels stating the doubled SAS reading that proves the base angles equal.', parts)
}

/* ------------------------------------------------------------------ */
/* the equilateral figure with the 30-60-90 half                        */
/* ------------------------------------------------------------------ */
const geo33Equi = (o: {
  aria: string
  side: number          // user units
  scale: number         // px per unit
  sideLab?: string
  halfLab?: string
  hLab?: string
  note?: string
}): string => {
  const k = o.scale
  const W = 640
  const yB = 380
  const cx = W / 2
  const B: [number, number] = [cx - (o.side / 2) * k, yB]
  const C: [number, number] = [cx + (o.side / 2) * k, yB]
  const h = (o.side * Math.sqrt(3) / 2) * k
  const A: [number, number] = [cx, yB - h]
  const M: [number, number] = [cx, yB]
  const parts: string[] = []
  parts.push(geo33Line(B[0], B[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], B[0], B[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], M[0], M[1], c33.teal, 2.4, '7 5'))
  parts.push(geo33Right(M, B, A, 13))
  parts.push(geo33Tick(A[0], A[1], B[0], B[1], c33.orange))
  parts.push(geo33Tick(A[0], A[1], C[0], C[1], c33.orange))
  parts.push(geo33Tick(B[0], B[1], C[0], C[1], c33.orange))
  parts.push(geo33Dot(A[0], A[1], c33.ink, 4.5) + geo33Dot(B[0], B[1], c33.ink, 4.5) + geo33Dot(C[0], C[1], c33.ink, 4.5) + geo33Dot(M[0], M[1], c33.tealInk, 3.6))
  parts.push(geo33Txt(A[0], A[1] - 16, 'A', 13.5, c33.ink))
  parts.push(geo33Txt(B[0] - 16, B[1] + 20, 'B', 13.5, c33.ink))
  parts.push(geo33Txt(C[0] + 16, C[1] + 20, 'C', 13.5, c33.ink))
  parts.push(geo33Txt(M[0], M[1] + 20, 'M', 13, c33.tealInk))
  // angle labels: all 60, half-apex 30 at A
  const angBA = Math.atan2(B[1] - A[1], B[0] - A[0])
  const angCA = Math.atan2(C[1] - A[1], C[0] - A[0])
  parts.push(geo33Arc(A[0], A[1], 26, angCA, angBA, c33.green, 2.4))
  parts.push(geo33Txt(A[0] + 4, A[1] + 52, '60\u00b0', 12.5, c33.green))
  parts.push(geo33Arc(A[0], A[1], 44, angCA, (angCA + angBA) / 2, c33.orange, 2.2))
  parts.push(geo33Txt(A[0] + Math.cos((angCA + (angCA + angBA) / 2) / 2) * 66, A[1] + Math.sin((angCA + (angCA + angBA) / 2) / 2) * 66, '30\u00b0', 11.5, c33.orange))
  const angAB = Math.atan2(A[1] - B[1], A[0] - B[0])
  parts.push(geo33Arc(B[0], B[1], 24, 0, angAB, c33.green, 2.4))
  parts.push(geo33Txt(B[0] + Math.cos(angAB / 2) * 48, B[1] + Math.sin(angAB / 2) * 48, '60\u00b0', 12.5, c33.green))
  const angAC = Math.atan2(A[1] - C[1], A[0] - C[0])
  parts.push(geo33Arc(C[0], C[1], 24, Math.PI, angAC, c33.green, 2.4))
  parts.push(geo33Txt(C[0] + Math.cos((Math.PI + angAC) / 2) * 48, C[1] + Math.sin((Math.PI + angAC) / 2) * 48, '60\u00b0', 12.5, c33.green))
  // side labels
  parts.push(geo33Txt((A[0] + B[0]) / 2 - 30, (A[1] + B[1]) / 2 - 8, o.sideLab ?? '1', 13, c33.mid, 'end'))
  parts.push(geo33Txt((A[0] + C[0]) / 2 + 30, (A[1] + C[1]) / 2 - 8, o.sideLab ?? '1', 13, c33.mid, 'start'))
  parts.push(geo33Txt(cx, yB + 44, o.sideLab ?? '1', 13, c33.tealInk))
  parts.push(geo33Txt(cx - (o.side / 4) * k, yB + 20, o.halfLab ?? '1/2', 12.5, c33.mid))
  parts.push(geo33Txt(cx + (o.side / 4) * k, yB + 20, o.halfLab ?? '1/2', 12.5, c33.mid))
  parts.push(geo33Txt(cx + 14, yB - h / 2, o.hLab ?? '\u221a3/2 \u2248 0.866025', 13, c33.tealInk, 'start'))
  if (o.note) parts.push(geo33Txt(cx, yB + 70, o.note, 12.5, c33.tealInk))
  return geo33Svg(W, 460, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* F4 — the sweep family: four isosceles triangles, t = 10, 22.62, 30, 40 */
/* ------------------------------------------------------------------ */
const geo33Sweep = (): string => {
  const W = 640, H = 430
  const L = 148 // leg length in px
  const yB = 322
  const ts = [10, 22.62, 30, 40]
  const centers = [102, 254, 420, 570]
  const parts: string[] = []
  parts.push(geo33Txt(W / 2, 30, 'ONE LAW, FOUR SHAPES \u2014 APEX 2t, BASE ANGLES 90\u00b0 \u2212 t', 13, c33.ink, 'middle', '700'))
  parts.push(geo33Line(24, yB, 616, yB, c33.tealInk, 2))
  ts.forEach((t, i) => {
    const cx = centers[i]
    const rad = (t * Math.PI) / 180
    const hb = L * Math.sin(rad)
    const hh = L * Math.cos(rad)
    const B: [number, number] = [cx - hb, yB]
    const C: [number, number] = [cx + hb, yB]
    const A: [number, number] = [cx, yB - hh]
    parts.push(geo33Line(B[0], B[1], C[0], C[1], c33.ink, 2.4))
    parts.push(geo33Line(A[0], A[1], B[0], B[1], c33.ink, 2.4))
    parts.push(geo33Line(A[0], A[1], C[0], C[1], c33.ink, 2.4))
    parts.push(geo33Dot(A[0], A[1], c33.ink, 3.5) + geo33Dot(B[0], B[1], c33.ink, 3.5) + geo33Dot(C[0], C[1], c33.ink, 3.5))
    // apex label above, base-angle label near B
    parts.push(geo33Txt(cx, A[1] - 12, `2t = ${(2 * t).toFixed(t === 22.62 ? 2 : 0)}\u00b0`, 12, c33.green))
    parts.push(geo33Txt(cx, yB + 20, `t = ${t}\u00b0`, 12.5, c33.orange))
    parts.push(geo33Txt(cx, yB + 38, `base 90 \u2212 t = ${(90 - t).toFixed(t === 22.62 ? 2 : 0)}\u00b0`, 11.5, c33.mid))
    parts.push(geo33Txt(cx, yB + 56, `h/\u2113 = ${Math.cos(rad).toFixed(4)}`, 11.5, c33.tealInk))
  })
  parts.push(geo33Txt(W / 2, 396, 'the axis splits the apex into t + t \u2014 base angle + t = 90\u00b0', 12.5, c33.tealInk))
  parts.push(geo33Txt(W / 2, 416, 'height = \u2113 cos t, half-base = \u2113 sin t', 12.5, c33.tealInk))
  return geo33Svg(W, H, 'Four isosceles triangles sharing a baseline with apex half-angles t of 10, 22.62, 30 and 40 degrees, each labelled with its apex angle 2t, its base angles 90 minus t, and its height-to-leg ratio cos t.', parts)
}

/* ------------------------------------------------------------------ */
/* the base-angle walk figure (expression ladder on the base angles)    */
/* ------------------------------------------------------------------ */
const geo33Walk = (o: { aria: string; bExpr: string; cExpr: string; note: string }): string => {
  const W = 640, H = 400
  const yB = 330
  const B: [number, number] = [180, yB]
  const C: [number, number] = [460, yB]
  const A: [number, number] = [320, yB - 190]
  const parts: string[] = []
  parts.push(geo33Line(B[0], B[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], B[0], B[1], c33.ink, 2.6))
  parts.push(geo33Line(A[0], A[1], C[0], C[1], c33.ink, 2.6))
  parts.push(geo33Dot(A[0], A[1], c33.ink, 4.5) + geo33Dot(B[0], B[1], c33.ink, 4.5) + geo33Dot(C[0], C[1], c33.ink, 4.5))
  parts.push(geo33Txt(A[0], A[1] - 16, 'A', 13.5, c33.ink))
  parts.push(geo33Txt(B[0] - 16, B[1] + 20, 'B', 13.5, c33.ink))
  parts.push(geo33Txt(C[0] + 16, C[1] + 20, 'C', 13.5, c33.ink))
  const angBA = Math.atan2(B[1] - A[1], B[0] - A[0])
  const angCA = Math.atan2(C[1] - A[1], C[0] - A[0])
  parts.push(geo33Arc(A[0], A[1], 30, angCA, angBA, c33.orange, 3))
  parts.push(geo33Txt(A[0], A[1] + 58, 'apex = 180\u00b0 \u2212 2\u00b7base', 12.5, c33.orange))
  const angAB = Math.atan2(A[1] - B[1], A[0] - B[0])
  parts.push(geo33Arc(B[0], B[1], 30, 0, angAB, c33.green, 3))
  parts.push(geo33Arc(B[0], B[1], 38, 0, angAB, c33.green, 2))
  parts.push(geo33Txt(B[0] + Math.cos(angAB / 2) * 74, B[1] + Math.sin(angAB / 2) * 74, o.bExpr, 13, c33.green))
  const angAC = Math.atan2(A[1] - C[1], A[0] - C[0])
  parts.push(geo33Arc(C[0], C[1], 30, Math.PI, angAC, c33.green, 3))
  parts.push(geo33Arc(C[0], C[1], 38, Math.PI, angAC, c33.green, 2))
  parts.push(geo33Txt(C[0] + Math.cos((Math.PI + angAC) / 2) * 74, C[1] + Math.sin((Math.PI + angAC) / 2) * 74, o.cExpr, 13, c33.green))
  parts.push(geo33Txt(320, 384, o.note, 12.5, c33.tealInk))
  return geo33Svg(W, H, o.aria, parts)
}

/* ================================================================== */
/* LESSON 3.3 — Isosceles Triangles: the Classic Consequences          */
/* ================================================================== */
export const lessonGeo303: Lesson = {
  id: 'geo-isosceles-triangles-the-classic-consequences',
  number: '3.3',
  title: 'Isosceles Triangles: the Classic Consequences',
  concepts: [
    'isosceles triangle',
    'pons asinorum',
    'base angles',
    'the converse',
    'equilateral',
    'apex axis',
    'altitude-median-bisector coincidence',
  ],
  objectives: [
    'Define isosceles, scalene and equilateral triangles, and name the apex, the base, the legs and the base angles under the chapter notation law',
    'Prove Euclid I.5 (the pons asinorum) by the doubled-triangle SAS reading and state Pappus\u2019s no-construction observation honestly',
    'Prove the converse I.6 both by the doubled ASA reading and by Euclid\u2019s reductio, and cite the right direction in an exam chain',
    'Derive the equilateral corollary (all sides equal forces all angles 60 degrees) and the height sqrt(3)/2 times side reflex',
    'Use the axis package: in an isosceles triangle the apex-to-midpoint line is median, altitude and angle bisector at once, by SSS',
    'Solve witness, base-angle-walk and roof-truss problems with the half-angle toolkit (base angle = 90 \u2212 t, height = leg cos t)',
  ],
  prerequisites: [
    'geo-congruence-the-idea-of-same-shape-and-size',
    'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
  ],
  sources: ['geo-euclid-elements', 'geo-ch03-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The shape that symmetry builds' },
    {
      kind: 'para',
      text: 'Look at the roof of an ordinary house. Two rafters run up from the walls and meet at a ridge, and \u2014 because the walls are the same height and the roof is symmetric \u2014 those two rafters are the same length. Look at a pair of compasses: two arms, joined at the top, equal in length, opening and closing on a screw. Look at the warning triangle at a road junction: three sides in most drawings, but drawn in silhouette it reads as two equal slanted legs standing on a level base. The isosceles triangle \u2014 literally the \u201cequal-legged\u201d triangle, from the Greek isos (equal) and skelos (leg) \u2014 is the shape geometry reaches for whenever a structure must stand symmetrically on two matching supports. Wherever two equal things lean against each other, an isosceles triangle appears.',
    },
    {
      kind: 'para',
      text: 'But a shape that LOOKS symmetric is not yet a shape that IS symmetric, and the whole point of this chapter is that pictures do not count as proofs. What we want is the theorem: if a triangle has two equal sides, then the angles opposite them \u2014 the two angles at the base \u2014 are equal. And we want its converse: if two angles of a triangle are equal, then the sides opposite them are equal. And we want the structural bonus that makes engineers love the shape: the line from the apex down the middle is simultaneously a median, a perpendicular and an angle bisector \u2014 one line doing three jobs, which is why the king post of a truss and the crease of a folded gable are drawn where they are. Every one of these statements is a theorem of congruence, and every one is proved with the tools of Lessons 3.1 and 3.2: the correspondence discipline and the five criteria.',
    },
    {
      kind: 'para',
      text: 'There is history in this lesson, and it deserves a warning label. The first of these theorems \u2014 equal legs imply equal base angles \u2014 is Proposition I.5 of Euclid\u2019s Elements, and for two thousand years it has carried the nickname pons asinorum, Latin for \u201cthe bridge of asses\u201d. Medieval students gave it that name because it was the first genuinely difficult proposition in Book I: everything before it falls to a line or two, and I.5 suddenly demands that you see a congruence hiding inside a single triangle. Students who could not cross the bridge went no further in geometry. The name stuck, the joke hardened into tradition, and the proposition itself became the gatekeeper of the whole book. We will prove it the clean modern way \u2014 by reading one triangle as two \u2014 and then look honestly at what Euclid himself did, and at the much later shortcut attributed to the commentator Pappus.',
    },
    {
      kind: 'para',
      text: 'The plan of the lesson follows the plan of the theory. First the vocabulary: apex, base, legs, base angles, and the apex axis. Then I.5, the pons asinorum, proved by the doubled triangle. Then the converse I.6, proved twice \u2014 directly, and the way Euclid did it, by contradiction. Then the equilateral corollary and the famous sixty-degree reflex. Then the apex axis package, the structural theorem that ties median, altitude and bisector into one line. Then the half-angle toolkit that turns every isosceles computation into one right triangle. Finally the worked chains: a witness triangle read completely, a base-angle walk, and a roof truss \u2014 the same 5-12-13 half-triangle that builds the witness, laid flat under a roof.',
    },

    /* -------------------------------------------------------------- */
    /* 2. definitions + the notation law                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Isosceles, equilateral: the vocabulary' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Isosceles triangle',
      text: 'A triangle is said to be isosceles if two of its sides are equal. The common vertex of the equal sides is the apex; the side opposite the apex is the base; the two equal sides are the legs; and the two angles at the vertices of the base are the base angles. Thus, $AB = AC$ makes $A$ the apex, $BC$ the base and $AB$, $AC$ the legs. A triangle with all three sides equal is equilateral; a triangle with no equal sides is scalene.',
    },
    {
      kind: 'para',
      text: 'The chapter\u2019s notation law keeps working unchanged. In triangle $ABC$ the side $a = BC$ is opposite $A$, the side $b = CA$ is opposite $B$, and the side $c = AB$ is opposite $C$. In the isosceles reading we take the equal sides to be $AB = AC$ \u2014 so $b = c$, the apex is $A$, the base is $a = BC$, and the base angles are $B$ and $C$. Nothing about this choice is forced: every triangle with SOME pair of equal sides can be re-labelled so that the pair is $AB$ and $AC$, and we freely do so. The apex axis of the triangle is the line from the apex $A$ to the midpoint $M$ of the base $BC$ \u2014 the would-be crease down which you would fold the triangle onto itself if the symmetry were real.',
    },
    {
      kind: 'para',
      text: 'That \u201cif\u201d is exactly what this lesson removes. The fold is a lovely intuition \u2014 hold the triangle up to a window, crease along $AM$, and the two halves cover each other perfectly \u2014 but Lesson 3.1 was strict about this: superposition by physical motion is an intuition for what congruence means, not a proof technique we are allowed to cite. What we CAN cite is the result of that lesson: two triangles are congruent exactly when there is a correspondence under which matching sides and angles agree, and the five criteria of Lesson 3.2 certify such a correspondence from partial data. So the honest programme is: name the two halves of the would-be fold as two triangles, check which criterion applies, and let the congruence deliver the symmetry as a theorem. That programme succeeds four times in this lesson \u2014 for I.5, for I.6, for the equilateral corollary and for the axis package \u2014 and each time the criterion is one of the five.',
    },
    {
      kind: 'list',
      items: [
        'Isosceles: $AB = AC$ \u2014 apex $A$, base $BC = a$, legs $b = c$, base angles $B$ and $C$.',
        'The claim of I.5: $AB = AC$ implies $\angle ABC = \angle ACB$ \u2014 equal legs, equal base angles.',
        'The claim of I.6: $\angle ABC = \angle ACB$ implies $AB = AC$ \u2014 the converse, equal base angles forcing equal legs.',
        'The equilateral corollary: $AB = AC = BC$ implies $A = B = C = 60^\\circ$.',
        'The apex axis package: with $M$ the midpoint of $BC$, the line $AM$ is median, altitude and bisector at once.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 3. I.5 — the doubled triangle                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Pons asinorum: the base angles are equal' },
    {
      kind: 'para',
      text: 'Here is the proposition that stopped medieval students in their tracks. In triangle $ABC$, suppose the two legs are equal: $AB = AC$. The claim is that the two base angles are equal: $\angle ABC = \angle ACB$. On a drawing this looks like the most obvious thing in the world \u2014 of course a symmetric-looking triangle has symmetric-looking angles. But stop and ask yourself how you would PROVE it with the tools assembled so far. The angle sum of Lesson 2.4 tells you $A + B + C = 180^\\circ$, which is one equation in three unknowns and settles nothing by itself. The congruence criteria compare TWO triangles \u2014 and we only have one. That is the wall the theorem asks you to climb, and the climb is a single beautiful idea: compare the triangle with itself.',
    },
    {
      kind: 'para',
      text: 'The idea is called the doubled triangle. Take the one triangle $ABC$ and read it twice: once as $ABC$, and once as $ACB$ \u2014 the same figure named with the letters $B$ and $C$ exchanged. Under this swapped naming, the correspondence at work is $A \to A$, $B \to C$, $C \to B$: the apex is matched with itself, and the two base vertices are matched with each other. Now interrogate the SAS data \u2014 two sides and the included angle \u2014 of the two readings. First side: in triangle $ABC$ it is $AB$; in triangle $ACB$ the matching side is $AC$; and $AB = AC$ is precisely the hypothesis. Second side: in triangle $ABC$ it is $AC$; in triangle $ACB$ the matching side is $AB$; the hypothesis read in the other order gives $AC = AB$, the same statement. Included angle: in triangle $ABC$ it is the angle at $A$ between rays $AB$ and $AC$; in triangle $ACB$ it is the angle at $A$ between rays $AC$ and $AB$ \u2014 the very same angle, read in the opposite order. All three SAS slots match, without drawing anything. The derivation below runs the argument formally, and the figure behind it draws the correspondence as arrows swapping $B$ and $C$ while $A$ stays fixed.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.5, the pons asinorum, by the doubled triangle',
      statement: 'In triangle $ABC$ with $AB = AC$, the base angles are equal: $\angle ABC = \angle ACB$.',
      steps: [
        {
          label: 'Fix the doubled correspondence',
          formula: 'A \to A,\quad B \to C,\quad C \to B',
          explanation: 'Compare triangle $ABC$ with triangle $ACB$: the same figure, named with the two base vertices exchanged. Every statement below matches parts through this correspondence.',
        },
        {
          label: 'Match the two given sides',
          formula: 'AB = AC\ \\text{and}\ AC = AB',
          explanation: 'The hypothesis $AB = AC$, read through the correspondence, supplies both side matches at once: the $AB$-slot of the first triangle meets the $AC$-slot of the second, and vice versa. One given equality does double duty.',
        },
        {
          label: 'Match the included angle',
          formula: '\angle BAC = \angle CAB',
          explanation: 'The angle at the apex between rays $AB$ and $AC$ is literally the same angle as the one between rays $AC$ and $AB$ \u2014 the shared apex angle is the INCLUDED angle in both readings, because it sits between the two matched sides in each.',
        },
        {
          label: 'Apply SAS (Lesson 3.2\u2019s I.4)',
          formula: '\triangle ABC \cong \triangle ACB',
          explanation: 'Two sides and the included angle match, so by the SAS criterion the two readings are congruent triangles under the doubled correspondence $A \to A$, $B \to C$, $C \to B$.',
        },
        {
          label: 'Read off the base angles',
          formula: '\angle ABC = \angle ACB',
          explanation: 'Congruent triangles have equal corresponding parts. The angle at $B$ in triangle $ABC$ corresponds to the angle at $C$ in triangle $ACB$ \u2014 but triangle $ACB$ is the same figure as triangle $ABC$, so this says the base angle at $B$ equals the base angle at $C$.',
        },
      ],
      result: 'In any triangle with $AB = AC$, the base angles are equal: $\angle ABC = \angle ACB$. This is Euclid I.5 \u2014 proved by one application of SAS to the two namings of a single triangle, with no auxiliary construction at all.',
    },
    {
      kind: 'figure',
      caption: 'The doubled triangle. Triangle ABC is read twice, as ABC and as ACB, under the correspondence A to A, B to C, C to B (the curved arrows). The legs carry matching tick marks because AB = AC is the hypothesis; the apex angle is the shared included angle in both readings. SAS certifies the congruence, and the base angles fall out equal \u2014 Euclid I.5, the pons asinorum.',
      svg: geo33Doubled(),
    },
    {
      kind: 'para',
      text: 'Two honest notes on the history of this proof. First, Euclid himself did not argue quite this way. His own figure PRODUCES the sides: he extends $AB$ beyond $B$ to a point and $AC$ beyond $C$ to another point, marks off equal extensions, and joins up to build a genuinely doubled figure with crossing lines \u2014 his diagram, with its construction struts, is the one that later ages thought looked like a bridge. His conclusion is also wider than ours: he concludes not only that the base angles are equal but that the angles BELOW the base \u2014 the exterior supplements at $B$ and $C$ \u2014 are equal as well. The clean modern form keeps the interior statement and recovers the exterior one in a breath: supplements of equal angles are equal, so on our witness triangle the exterior angles at $B$ and $C$ are both $180^\\circ - 67.380135^\\circ = 112.619865^\\circ$. Second, the stripped-down proof we gave \u2014 SAS read directly on the two namings of the one triangle, no auxiliary lines \u2014 is not Euclid\u2019s; the observation belongs to the later commentary tradition and is credited to Pappus of Alexandria, working around the fourth century of our era, more than half a millennium after the Elements was written.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Pappus\u2019s shortcut',
      text: 'The proof of I.5 you just read needs no construction at all: the two \u201ctriangles\u201d are the same triangle, and the SAS data match because the hypothesis $AB = AC$ read in one order is the hypothesis read in the other. This observation is the commentator Pappus\u2019s (fourth century), and it is worth pausing on WHY it works: a congruence is a correspondence, and nothing in the definition requires the two triangles to occupy different places on the page. A triangle is congruent to itself under any correspondence that preserves its parts \u2014 and the swap $B \leftrightarrow C$ preserves the parts exactly when the triangle is isosceles. The pons asinorum is the statement that the isosceles triangle is congruent to its own mirror reading.',
    },
    {
      kind: 'para',
      text: 'Before moving on, watch the theorem work on the lesson\u2019s pinned witness triangle: legs $AB = AC = 13$, base $BC = 10$. Drop the axis from $A$ to the midpoint $M$ of $BC$, so each half is a right triangle with hypotenuse $13$ and base $5$ \u2014 the famous 5-12-13 triangle, whose third side is $\\sqrt{169 - 25} = 12$. The base angle at $B$ satisfies $\\sin B = 12/13$, so $B = \\arcsin(12/13) = 67.380135^\\circ$; the base angle at $C$ satisfies $\\sin C = 12/13$ identically, so $C = 67.380135^\\circ$. Equal, as I.5 promises, and the engine behind this lesson recomputes both from coordinates to six decimals. On a second witness, the 17-17-16 triangle, the halves are 8-15-17 and both base angles come out $\\arcsin(15/17) = 61.927513^\\circ$. The engine also walks a four-triangle family \u2014 apex half-angles $t = 10^\\circ$, $22.62^\\circ$, $30^\\circ$, $40^\\circ$ \u2014 and checks the base angles equal at every member. One theorem, verified everywhere it can be.',
    },
    /* -------------------------------------------------------------- */
    /* 4. the converse I.6                                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The converse: equal base angles force equal legs' },
    {
      kind: 'para',
      text: 'Run the implication backwards. Suppose you are TOLD that the two base angles of a triangle are equal: $\angle ABC = \angle ACB$. Must the legs be equal? Intuition says yes \u2014 a triangle that leans the same way on both sides ought to stand on equal legs \u2014 but intuition is not a licence, and there is a genuinely different theorem hiding here. In problem after problem the data arrives as angles (a survey measures directions, a drawing specifies slopes) and the conclusion wanted is a length; the converse is the bridge across. It is Euclid\u2019s Proposition I.6, and the doubled triangle crosses it in one step, this time reading ASA instead of SAS.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.6, the converse, by the doubled ASA reading',
      statement: 'In triangle $ABC$ with $\angle ABC = \angle ACB$, the opposite sides are equal: $AB = AC$.',
      steps: [
        {
          label: 'Fix the same doubled correspondence',
          formula: 'A \to A,\quad B \to C,\quad C \to B',
          explanation: 'Compare triangle $ABC$ with triangle $ACB$ again \u2014 the same figure, the base vertices swapped. The correspondence is the mirror of the one that proved I.5.',
        },
        {
          label: 'Match the two given angles',
          formula: '\angle ABC = \angle ACB\ \\text{and}\ \angle ACB = \angle ABC',
          explanation: 'The hypothesis $\angle ABC = \angle ACB$, read through the correspondence, supplies both angle matches at once: the $B$-slot of the first triangle meets the $C$-slot of the second, and the $C$-slot meets the $B$-slot. One given equality, two matches.',
        },
        {
          label: 'Match the side between them',
          formula: 'BC = CB',
          explanation: 'The base is a single segment shared by both readings, and it sits BETWEEN the two matched angles in each \u2014 exactly the layout the ASA criterion consumes (angle, side, angle in the same order).',
        },
        {
          label: 'Apply ASA (Lesson 3.2\u2019s I.26)',
          formula: '\triangle ABC \cong \triangle ACB',
          explanation: 'Two angles and the included side match, so by ASA the two readings are congruent under the doubled correspondence.',
        },
        {
          label: 'Read off the legs',
          formula: 'AB = AC',
          explanation: 'Corresponding parts again: the side $AB$ of the first triangle meets the side $AC$ of the second, and both live in the same figure, so the legs are equal \u2014 the sides opposite the equal angles.',
        },
      ],
      result: 'Equal base angles force equal legs: $\angle ABC = \angle ACB$ implies $AB = AC$. This is Euclid I.6, the converse of the pons asinorum, by one application of ASA to the doubled reading.',
    },
    {
      kind: 'para',
      text: 'Euclid\u2019s own proof of I.6 is different in spirit, and it is worth walking through because it is one of the first reductio arguments a geometry student meets. Suppose, for contradiction, that the legs are NOT equal; one is longer, and relabelling if necessary let it be $AB > AC$. Cut off, on the segment $AB$, a point $D$ with $DB = AC$ \u2014 possible precisely because $AB$ is the longer. Join $DC$. Now read the SAS data of triangle $DBC$ against triangle $ACB$: $DB = AC$ by construction, the angle $DBC$ equals the angle $ACB$ (because $D$ lies on $BA$, the angle at $B$ is the original base angle, and the base angles are equal by hypothesis), and $BC$ is common. SAS certifies triangle $DBC \cong$ triangle $ACB$ \u2014 so the two triangles have equal areas. But $D$ lies strictly between $A$ and $B$, which makes triangle $DBC$ a PROPER PART of triangle $ABC$: the part would be equal in area to the whole. Against the common notion that the whole is greater than the part, that is absurd, and the supposition $AB > AC$ dies; the mirror argument kills $AC > AB$; the only survivor is $AB = AC$.',
    },
    {
      kind: 'para',
      text: 'The engine behind this lesson verifies both blades of the contradiction numerically on the witness data, and it is worth seeing the arithmetic. Congruence blade: with $DB = AC = 13$, $\angle DBC = 67.380135^\\circ$ and $BC = 10$, the cosine-rule computation gives $DC^2 = 13^2 + 10^2 - 2(13)(10)\\cos 67.380135^\\circ = 169$, so $DC = 13 = AB$, and the SAS-matched areas both come out $\\frac{1}{2}(13)(10)\\sin 67.380135^\\circ = 60$ \u2014 the congruence forces area $60$ for triangle $DBC$. Containment blade: slide $D$ along $AB$ at the quarter, half and three-quarter marks, and triangle $DBC$ has area $45$, $30$ and $15$ \u2014 always strictly below $60$, because the height of $C$ over the line $AB$ is shared and the base $DB$ is a proper part of $AB$. The assumption demands area exactly $60$ (blade one) and strictly less than $60$ (blade two) at the same time: $60 < 60$, which is false. No real triangle can satisfy the supposition \u2014 which is precisely what a proof by contradiction concludes.',
    },
    {
      kind: 'para',
      text: 'There is a second classical reductio, and it has a feature we want on the table: it USES I.5 to prove I.6 \u2014 the theorem returning as the tool of its own converse. Suppose again $AB > AC$, but this time cut $D$ on segment $AB$ with $AD = AC$. Then triangle $ADC$ is isosceles with apex $A$, so by I.5 \u2014 the theorem of this very lesson \u2014 its base angles are equal: $\\angle ADC = \\angle ACD$; call their common value $\\gamma$. Now compute the apex angle $A$ two ways. In the original triangle, $A = 180^\\circ - 2\\beta$ where $\\beta$ is the common base angle. In triangle $ADC$, $A = 180^\\circ - 2\\gamma$. Same angle, so $\\gamma = \\beta$. But $D$ lies strictly inside the segment $AB$, so the ray $CD$ lies strictly inside the angle $ACB$, which forces $\\gamma = \\angle ACD < \\angle ACB = \\beta$ \u2014 strictly. The chain has produced $\\gamma = \\beta$ AND $\\gamma < \\beta$: absurd. The engine checks the arithmetic of this version too: the identity $180^\\circ - 2\\gamma = 180^\\circ - 2\\beta$ holds exactly when $\\gamma = \\beta$, and on the witness with $D$ at the midpoint of $AB$ the angle $ACD$ comes out about $28.7^\\circ$, safely inside $(0, 67.380135^\\circ)$ \u2014 so the forced equality really does collide with the strict containment.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution: the two directions are two theorems',
      text: 'I.5 and I.6 are a matched pair, and mixing them up costs marks. EQUAL SIDES GIVEN, angles wanted: cite I.5 \u2014 \u201ctriangle isosceles, so base angles equal\u201d. ANGLES GIVEN, sides wanted: cite I.6 \u2014 \u201cbase angles equal, so the sides opposite them are equal\u201d. And note carefully what I.6 is NOT: it compares two parts of ONE triangle. It is not a congruence criterion for two triangles, and it is not AAA \u2014 equal angles in two DIFFERENT triangles certify similarity, not congruence, as Lesson 3.2\u2019s witness showed. One triangle, two angles: equal sides. Two triangles, three angles: nothing of the sort.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the equilateral corollary                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The equilateral corollary: the 60-degree reflex' },
    {
      kind: 'para',
      text: 'Push the hypothesis all the way: suppose all three sides are equal, $AB = AC = BC$. Apply I.5 to each pair in turn. The pair $AB = AC$ (apex $A$) forces $\\angle B = \\angle C$. The pair $AB = BC$ (apex $B$) forces $\\angle A = \\angle C$. The pair $AC = BC$ (apex $C$) forces $\\angle A = \\angle B$. Every pair of angles is equal \u2014 the triangle is equiangular. Now bring in the angle sum of Lesson 2.4: $A + B + C = 180^\\circ$ with all three equal forces $3A = 180^\\circ$, so each angle is exactly $60^\\circ$. No decimals, no rounding: the equilateral triangle is the one triangle in elementary geometry whose angles are forced to a whole number of degrees. The figure below shows the half-triangle that does all the work \u2014 the 30-60-90 half with its height $\\sqrt{3}/2$.',
    },
    {
      kind: 'derivation',
      title: 'The equilateral corollary',
      statement: 'If $AB = AC = BC$, then $\angle A = \angle B = \angle C = 60^\\circ$.',
      steps: [
        {
          label: 'Apply I.5 three times',
          formula: 'AB = AC \Rightarrow B = C;\\ AB = BC \Rightarrow A = C;\\ AC = BC \Rightarrow A = B',
          explanation: 'Each equality of a pair of sides is an isosceles reading with its own apex, and each pays out the equality of the two angles opposite that pair. Together they make every pair of angles equal.',
        },
        {
          label: 'Invoke the angle sum',
          formula: 'A + B + C = 180^\\circ',
          explanation: 'Lesson 2.4\u2019s theorem, available since chapter 2 \u2014 the total of the three angles of any triangle is a straight angle.',
        },
        {
          label: 'Close each at sixty',
          formula: '3A = 180^\\circ,\\ \\text{so}\\ A = 60^\\circ',
          explanation: 'All three angles are the same number, so the sum is three copies of it; dividing, each angle is exactly $60^\\circ$.',
        },
      ],
      result: 'An equilateral triangle is equiangular, and every angle is exactly $60^\\circ$: three equal sides force three sixty-degree angles.',
    },
    {
      kind: 'figure',
      caption: 'The equilateral half-figure. Side 1, axis AM drawn dashed to the midpoint M, right angle marked at M. Each half is the 30-60-90 triangle: half-base 1/2, height sqrt(3)/2 \u2248 0.866025, leg 1. The half-apex is 30\u00b0 (orange arc) inside the full 60\u00b0 apex, and every base angle is 60\u00b0.',
      svg: geo33Equi({
        aria: 'An equilateral triangle of side 1 with a dashed axis from the apex A to the midpoint M of the base BC, a right-angle mark at M, all sides ticked equal, angles labelled 60 degrees, the half-apex labelled 30 degrees, and the height labelled square root of 3 over 2, approximately 0.866025.',
        side: 1,
        scale: 300,
        sideLab: '1',
        halfLab: '1/2',
        hLab: '\u221a3/2 \u2248 0.866025',
        note: 'the 30\u221260\u221290 half: half-base 1/2, height \u221a3/2, leg 1 \u2014 and 3 \u00d7 60\u00b0 = 180\u00b0',
      }),
    },
    {
      kind: 'para',
      text: 'The height deserves its own line, because it is a number you should eventually recall cold. Stand the equilateral triangle of side $s$ on its base and drop the axis: the half-triangle has hypotenuse $s$ (the leg), horizontal side $s/2$ (the half-base) and vertical side $h$ (the height). Pythagoras gives $h^2 = s^2 - s^2/4 = 3s^2/4$, so $h = s\\sqrt{3}/2$ \u2014 and the pinned witness is the side-1 case: $h = \\sqrt{3}/2 \\approx 0.866025$, with area $\\frac{1}{2} \\cdot 1 \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{4} \\approx 0.433013$. The half-triangle is the 30-60-90 triangle of trigonometry, with its sides in the ratio $1 : \\sqrt{3} : 2$ \u2014 the small angle $30^\\circ$ opposite the short leg $s/2$, the big angle $60^\\circ$ opposite the height. The engine verifies all of it on coordinates: sides equal to six decimals, angles $60^\\circ$ each, the half-apex exactly $30^\\circ$, the right angle at $M$ exactly $90^\\circ$.',
    },
    {
      kind: 'para',
      text: 'The reflex direction is just as useful and just as quick. Suppose a triangle is isosceles with legs $\\ell$ and its apex angle is $60^\\circ$. The axis splits the apex into $30^\\circ + 30^\\circ$, and the half-triangle gives the half-base as $\\ell \\sin 30^\\circ = \\ell/2$ \u2014 so the full base is $\\ell$, equal to the legs: the triangle is equilateral, and then I.5\u2019s corollary closes all its angles at $60^\\circ$. In one line: an isosceles triangle with a $60^\\circ$ apex is equilateral. The same reading at a base angle \u2014 isosceles with one $60^\\circ$ base angle \u2014 forces the other base angle to $60^\\circ$ (I.5), the apex to $60^\\circ$ (angle sum), and again the triangle closes equilateral. This \u201ctwo sixty-degree corners finishes the job\u201d reflex is a standard exam shortcut, and it is licensed every step of the way.',
    },
    {
      kind: 'equation',
      latex: 'h = \\frac{\\sqrt{3}}{2}\\,s,\\qquad \\text{area} = \\frac{\\sqrt{3}}{4}\\,s^{2}',
      note: 'the height and area of an equilateral triangle of side $s$ \u2014 the 30-60-90 half does both, since the area is half the base times the height.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the apex axis package                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The apex axis: one line, three jobs' },
    {
      kind: 'para',
      text: 'Now the structural theorem \u2014 the one that makes the isosceles triangle an engineering shape as much as a theorem. In triangle $ABC$ with $AB = AC$, let $M$ be the midpoint of the base, and draw the apex axis $AM$. Three different questions can be asked about this one segment. Is it a MEDIAN \u2014 does it bisect the base? Yes by construction: $BM = CM$. Is it an ALTITUDE \u2014 is it perpendicular to the base? Is it an ANGLE BISECTOR \u2014 does it split the apex angle into equal halves? The last two are theorems, and remarkably they are the SAME theorem, proved by one application of SSS to the two halves. The witness figure below draws the whole tableau: the 13-13-10 triangle, its axis, and the 5-12-13 halves the proof creates.',
    },
    {
      kind: 'figure',
      caption: 'The witness triangle with its apex axis. Legs AB = AC = 13, base BC = 10, midpoint M of the base; the axis AM splits the triangle into two 5-12-13 right triangles (right angle marked at M). Height 12, area 60, apex 2 arcsin(5/13) = 45.24\u00b0, base angles arcsin(12/13) = 67.38\u00b0 each, half-apex 22.62\u00b0 in orange.',
      svg: geo33Tri({
        aria: 'An isosceles triangle with legs 13, base 10 and a dashed apex axis of height 12 to the midpoint M, marked with a right angle, splitting it into two 5-12-13 right triangles, with the apex labelled 45.24 degrees, the base angles 67.38 degrees each and the half-apex 22.62 degrees.',
        hb: 5,
        h: 12,
        scale: 15,
        axis: true,
        rightMark: true,
        ticks: true,
        sideL: '13',
        sideR: '13',
        baseL: 'base 10',
        halfL: '5',
        halfR: '5',
        hLab: 'h = 12',
        apexLab: '45.24\u00b0',
        bAngLab: '67.38\u00b0',
        cAngLab: '67.38\u00b0',
        halfApexLab: 't = 22.62\u00b0',
        note: 'the 5\u221212\u221213 halves: area = (1/2)(10)(12) = 60; cos(apex) = 119/169',
      }),
    },
    {
      kind: 'derivation',
      title: 'The axis package: median, altitude and bisector in one line',
      statement: 'In triangle $ABC$ with $AB = AC$ and $M$ the midpoint of $BC$, the segment $AM$ is at once the median, the altitude and the angle bisector: $BM = CM$, $AM \perp BC$ and $\angle BAM = \angle CAM$.',
      steps: [
        {
          label: 'Halve the base',
          formula: 'BM = CM = \\frac{a}{2}',
          explanation: 'This is the median job, true by the choice of $M$ \u2014 on the witness triangle, $BM = CM = 5$.',
        },
        {
          label: 'Match the halves side for side',
          formula: 'AB = AC,\\quad BM = CM,\\quad AM = AM',
          explanation: 'The two legs are equal (hypothesis), the two half-bases are equal (midpoint), and the axis is the SAME segment counted in both triangles \u2014 shared, like the common side of the doubled-triangle proofs. On the witness the SSS data of each half reads $(13, 5, 12)$.',
        },
        {
          label: 'Apply SSS (Lesson 3.2\u2019s I.8)',
          formula: '\triangle ABM \cong \triangle ACM',
          explanation: 'Three pairs of sides match, so the halves are congruent: every part of one equals the corresponding part of the other.',
        },
        {
          label: 'The linear pair at M turns equality into perpendicularity',
          formula: '\angle AMB + \angle AMC = 180^\\circ\\ \\text{and}\\ \\angle AMB = \angle AMC',
          explanation: 'The two angles at $M$ sit on the straight base, so they sum to $180^\\circ$; the congruence makes them equal; supplementary and equal forces each to be exactly $90^\\circ$. That is the ALTITUDE job: $AM \perp BC$.',
        },
        {
          label: 'The apex splits in half',
          formula: '\angle BAM = \angle CAM = \\frac{1}{2}\\angle BAC',
          explanation: 'The two angles at $A$ are corresponding parts of congruent triangles, so they are equal \u2014 the BISECTOR job. The axis cuts the apex angle into $t + t$ with $t = \\frac{1}{2}\\angle BAC$.',
        },
      ],
      result: 'The apex axis is median, altitude and angle bisector simultaneously: $BM = CM$, $AM \perp BC$ and $\angle BAM = \angle CAM$ \u2014 one line, three jobs, by a single application of SSS to the halves.',
    },
    {
      kind: 'para',
      text: 'Read the whole package off the witness triangle, because every number in the readout is engine-verified. Legs $13$ and $13$, base $10$: the halves are $5$-here, $12$-there, $13$-along \u2014 the 5-12-13 right triangle twice, so the height is $AM = 12$ and the area is $\\frac{1}{2} \\cdot 10 \\cdot 12 = 60$ (or, reading by halves, $2 \\times \\frac{1}{2} \\cdot 5 \\cdot 12 = 30 + 30 = 60$). The half-apex is $t = \\arcsin(5/13) = 22.619865^\\circ$, so the apex is $2t = 45.239730^\\circ$; each base angle is $90^\\circ - t = \\arcsin(12/13) = 67.380135^\\circ$; and the cosine of the apex is $\\frac{13^2 + 13^2 - 10^2}{2 \\cdot 13 \\cdot 13} = \\frac{238}{338} = \\frac{119}{169}$, an independent check the engine runs by the cosine rule. Angle sum: $45.239730 + 67.380135 + 67.380135 = 180$, exactly. Perimeter: $36$. One triangle, every number rational or pinned to six decimals.',
    },
    {
      kind: 'para',
      text: 'Two warnings keep the package honest. First, the coincidence belongs to the APEX axis \u2014 the axis of symmetry. A median drawn from a BASE vertex of the same triangle is a perfectly good median and nothing else: in the 13-13-10 witness, the median from $B$ meets $AC$ at its midpoint and is neither perpendicular to $AC$ nor an angle bisector at $B$. The three jobs collapse into one line exactly when the two endpoints of that line are the apex and the base midpoint of an isosceles reading. Second \u2014 and this is the exam-grade strengthening \u2014 it is enough to know that the apex cevian does ANY TWO of the three jobs; the third follows. If a segment from $A$ bisects the base and is perpendicular to it, then the right triangles it creates are congruent by SAS ($BM = CM$, the right angles equal, $AM$ shared), so $AB = AC$ and the triangle is isosceles, so the segment is also the bisector. If it bisects the base and the apex angle, the halves are congruent by SAS ($BM = CM$, $\angle BAM = \angle CAM$, $AM$ shared), so the base angles at $M$ are equal \u2014 and supplementary \u2014 hence $90^\\circ$ each. The package is a three-way coincidence with two-way triggers.',
    },
    {
      kind: 'para',
      text: 'Where does the package live in the built world? Everywhere a symmetric structure carries load down its middle. The king post of a roof truss IS the apex axis: it drops from the ridge to the middle of the tie beam, and because the rafters are equal it stands perpendicular and bisects the ridge angle for free. The vertical mast of a symmetric A-frame, the spine of a folded paper \u201cgable\u201d, the centre line of a compass \u2014 each is the axis of an isosceles triangle, and the engineer who trusts the perpendicularity is quietly spending this section\u2019s SSS argument. When the roof-truss Illustration computes a king post from a span and a rise, this is the licence it uses.',
    },
    /* -------------------------------------------------------------- */
    /* 7. the half-angle toolkit                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The half-angle toolkit: base angle = 90 degrees minus t' },
    {
      kind: 'para',
      text: 'Every computation in this lesson \u2014 witness, walk, truss, exercises \u2014 is secretly the same computation, and it is time to write it down once. Take an isosceles triangle with legs $\\ell$ and apex angle $2t$. The axis package splits the apex into $t + t$, and each half is a RIGHT triangle with hypotenuse $\\ell$, horizontal leg $\\frac{a}{2}$ (the half-base) and vertical leg $h$ (the height). Inside that half-triangle, the angle $t$ at the apex has the half-base OPPOSITE it and the height ADJACENT to it, so three ratios fall out immediately: $\\sin t = \\frac{a/2}{\\ell}$, $\\cos t = \\frac{h}{\\ell}$, $\\tan t = \\frac{a/2}{h}$. Rearranged, this is the whole toolkit: base $a = 2\\ell\\sin t$, height $h = \\ell\\cos t$, and \u2014 because the half-triangle\u2019s two acute angles must sum to $90^\\circ$ \u2014 the base angle is exactly $90^\\circ - t$. The sweep figure below draws the family at the four pinned values of $t$, one law wearing four shapes.',
    },
    {
      kind: 'figure',
      caption: 'The sweep family. Four isosceles triangles, all with legs of the same length, at apex half-angles t = 10\u00b0, 22.62\u00b0, 30\u00b0 and 40\u00b0. In every one of them the apex reads 2t, both base angles read 90 \u2212 t, and the height-to-leg ratio reads cos t \u2014 one law, four shapes. At t = 30\u00b0 the base equals the leg and the triangle closes equilateral.',
      svg: geo33Sweep(),
    },
    {
      kind: 'table',
      caption: 'The sweep at the four pinned half-angles (legs \u2113 = 1). The base angle column is the law base angle = 90\u00b0 \u2212 t; the last two columns are the half-triangle ratios. The t = 22.62\u00b0 row is the witness triangle rounded (the exact half-apex is arcsin(5/13) = 22.619865\u00b0, with cos t = 12/13 and 2 sin t = 10/13 exactly).',
      head: ['half-apex t', 'apex 2t', 'base angles 90 \u2212 t', 'height / leg', 'base / leg'],
      rows: [
        ['10\u00b0', '20\u00b0', '80\u00b0', '0.9848', '0.3473'],
        ['22.62\u00b0', '45.24\u00b0', '67.38\u00b0', '0.9231', '0.7693'],
        ['30\u00b0', '60\u00b0', '60\u00b0', '0.8660', '1.0000'],
        ['40\u00b0', '80\u00b0', '50\u00b0', '0.7660', '1.2856'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the table across and the geometry of the family appears. As $t$ grows from $10^\\circ$ to $40^\\circ$ the apex opens from $20^\\circ$ to $80^\\circ$, the base angles fall from $80^\\circ$ to $50^\\circ$ in lockstep (always summing with $t$ to $90^\\circ$), the height shrinks gently \u2014 from $0.9848\\ell$ down to $0.7660\\ell$, barely a quarter of the leg \u2014 while the base swells from about a third of the leg to nearly $1.29$ legs. Tall and narrow at one end, wide and flat at the other, and the same three-line toolkit drives every member. Note the $t = 30^\\circ$ row: base/leg $= 2\\sin 30^\\circ = 1$ exactly \u2014 the equilateral triangle is the member of the family whose base has grown to equal its legs, and its base-angle column duly reads $60^\\circ$. Note too that the witness row sits at the printed $t = 22.62^\\circ$; the exact value is $\\arcsin(5/13) = 22.619865^\\circ$, whose cosine is exactly $12/13$ \u2014 the engine checks both the rounded row and the exact identity.',
    },
    {
      kind: 'para',
      text: 'The toolkit also runs backwards, and that is how it earns its keep in problems. Given the base angles, recover $t = 90^\\circ - \\text{base angle}$, then the height from $h = \\ell\\cos t$ if the legs are known, or the legs from $\\ell = \\frac{a}{2\\sin t}$ if the base is known. Given the height and the base, recover $t$ from $\\tan t = \\frac{a/2}{h}$ and read off everything else. The one habit worth forming: ALWAYS draw the axis first. It costs one dashed line, it creates the right triangle that every formula lives in, and it converts an \u201cisosceles problem\u201d into a \u201cright-triangle problem\u201d \u2014 which is to say, into Pythagoras plus one trigonometric ratio.',
    },
    {
      kind: 'equation',
      latex: '\\text{base angle} = 90^\\circ - t,\\qquad h = \\ell\\cos t,\\qquad a = 2\\ell\\sin t',
      note: 'the half-angle toolkit for an isosceles triangle with legs $\\ell$ and apex angle $2t$ \u2014 where $t$ is the half-apex the axis creates.',
    },

    /* -------------------------------------------------------------- */
    /* 8. worked applications                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The classic consequences in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which isosceles triangles are actually used. In the first, the witness triangle is read completely \u2014 every length, angle and area off one figure. In the second, an apex angle and a base are given, and the whole triangle is rebuilt by the half-angle toolkit. In the third, a roof truss puts the axis package to work: span and rise in, rafter and angles out. Watch the licences: each step names the theorem that pays for it.',
    },
    {
      kind: 'example',
      title: 'Read the witness triangle completely. In triangle ABC, AB = AC = 13 and BC = 10. Find the height from A, the area, all three angles, and verify the axis package.',
      steps: [
        'Sol. Set up the axis: let $M$ be the midpoint of $BC$, so $BM = CM = 5$ (the median job), and draw $AM$.',
        'Now, the axis package (SSS on the halves with data $13, 5, AM$) makes $AM$ the altitude: each half is a right triangle with hypotenuse $13$ and base $5$, so $AM = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ \u2014 the 5-12-13 halves.',
        'Compute the area: $\\text{area} = \\frac{1}{2} \\cdot BC \\cdot AM = \\frac{1}{2}(10)(12) = 60$; read by halves, $\\frac{1}{2}(5)(12) + \\frac{1}{2}(5)(12) = 30 + 30 = 60$ \u2014 consistent.',
        'Find the half-apex: in either half, $\\sin t = \\frac{5}{13}$ (opposite over hypotenuse), so $t = \\arcsin(5/13) = 22.619865^\\circ$, and the apex is $2t = 45.239730^\\circ$.',
        'So, each base angle is $90^\\circ - t = 67.380135^\\circ$ (equally $\\arcsin(12/13)$, since $\\sin B = 12/13$ in the half-triangle); check the sum: $45.239730 + 67.380135 + 67.380135 = 180^\\circ$ exactly.',
        'Check the axis package once more: $\\cos(\\text{apex}) = \\frac{13^2 + 13^2 - 10^2}{2(13)(13)} = \\frac{238}{338} = \\frac{119}{169}$, and $AM$ bisects the apex ($22.619865^\\circ + 22.619865^\\circ = 45.239730^\\circ$) \u2014 median, altitude, bisector, one line.',
        'Hence the witness reads: height $12$, area $60$, apex $45.239730^\\circ$, base angles $67.380135^\\circ$ each \u2014 the axis package holding throughout.',
      ],
      figures: [
        {
          caption: 'The witness triangle fully read: the apex axis of height 12 splits the 13-13-10 triangle into two 5-12-13 right triangles; apex 45.24\u00b0, base angles 67.38\u00b0 each, half-apex 22.62\u00b0, area 60.',
          svg: geo33Tri({
            aria: 'The 13-13-10 isosceles witness triangle with its dashed axis of height 12 to the midpoint of the base, right angle marked, half-apex 22.62 degrees, apex 45.24 degrees and base angles 67.38 degrees, with the two 5-12-13 halves labelled.',
            hb: 5,
            h: 12,
            scale: 15,
            axis: true,
            rightMark: true,
            ticks: true,
            sideL: '13',
            sideR: '13',
            baseL: 'base 10',
            halfL: '5',
            halfR: '5',
            hLab: 'h = 12',
            apexLab: '45.24\u00b0',
            bAngLab: '67.38\u00b0',
            cAngLab: '67.38\u00b0',
            halfApexLab: 't = 22.62\u00b0',
            note: 'area 60; angle sum 45.24 + 67.38 + 67.38 = 180',
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'A base-angle walk. An isosceles triangle has apex angle 90\u00b0 and base 16 cm. Find both base angles, the height, the equal sides and the area.',
      steps: [
        'Sol. Find the base angles first: the legs are equal, so the base angles are equal (I.5), and the angle sum gives $2(\\text{base angle}) + 90^\\circ = 180^\\circ$ \u2014 each base angle is $45^\\circ$.',
        'Now, split the apex with the axis: the half-apex is $t = 45^\\circ$, and the axis package makes each half a right triangle with half-base $8$, height $h$ and leg $\\ell$ (the hypotenuse).',
        'Solve for the height: $\\tan 45^\\circ = \\frac{8}{h}$, and $\\tan 45^\\circ = 1$, so $h = 8$ cm.',
        'So, the leg: $\\sin 45^\\circ = \\frac{8}{\\ell}$ gives $\\ell = \\frac{8}{\\sin 45^\\circ} = 8\\sqrt{2} \\approx 11.313708$ cm \u2014 and Pythagoras agrees, $\\ell = \\sqrt{8^2 + 8^2} = \\sqrt{128} = 8\\sqrt{2}$.',
        'Compute the area: $\\frac{1}{2}(16)(8) = 64$ cm\u00b2.',
        'Hence base angles $45^\\circ$ each, height $8$ cm, legs $8\\sqrt{2} \\approx 11.313708$ cm, area $64$ cm\u00b2 \u2014 the half-square triangle in isosceles clothing.',
      ],
      figures: [
        {
          caption: 'The base-angle walk: apex 90\u00b0 and base 16 force base angles 45\u00b0 each; the axis of height 8 and half-base 8 makes each half an isosceles right triangle with leg 8\u221a2 \u2248 11.313708.',
          svg: geo33Tri({
            aria: 'An isosceles triangle with apex 90 degrees and base 16, its dashed axis of height 8 to the midpoint of the base, right angle marked at the midpoint, base angles 45 degrees each, and legs labelled 8 square root 2.',
            hb: 8,
            h: 8,
            scale: 17,
            axis: true,
            rightMark: true,
            ticks: true,
            sideL: '8\u221a2',
            sideR: '8\u221a2',
            baseL: 'base 16',
            halfL: '8',
            halfR: '8',
            hLab: 'h = 8',
            apexLab: '90\u00b0',
            bAngLab: '45\u00b0',
            cAngLab: '45\u00b0',
            halfApexLab: 't = 45\u00b0',
            note: 'tan 45\u00b0 = 8/8 = 1; \u2113 = 8/sin 45\u00b0 = 8\u221a2 \u2248 11.313708; area = 64',
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The roof truss. A symmetric truss spans 24 m on a tie beam with a king post of 5 m dropping from the ridge to the middle of the beam. Find the rafter length, the ridge angle and the eave angles.',
      steps: [
        'Sol. Set up the axis reading: the rafters are equal and the king post meets the tie beam at its midpoint (that is the axis package at work \u2014 the median is the altitude), so each half of the truss is a right triangle with legs $12$ (half the span) and $5$ (the rise).',
        'Find the rafter: $\\ell = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13$ m \u2014 the 5-12-13 triangle again, this time laid flat.',
        'Now, the half-ridge angle: $\\sin t = \\frac{12}{13}$ (the half-span is opposite the angle at the ridge), so $t = \\arcsin(12/13) = 67.380135^\\circ$.',
        'So, the ridge angle is $2t = 134.760270^\\circ$, and each eave angle is $90^\\circ - t = 22.619865^\\circ$ (equally $\\arcsin(5/13)$); the sum closes: $134.760270 + 2(22.619865) = 180^\\circ$.',
        'Check the duality with the tall witness: the witness triangle had apex $2\\arcsin(5/13) = 45.239730^\\circ$; the truss has apex $2\\arcsin(12/13) = 134.760270^\\circ$; and the two sum to $180^\\circ$ exactly, because $\\arcsin(5/13) + \\arcsin(12/13) = 90^\\circ$ \u2014 the same 5-12-13 half stood up versus laid flat.',
        'Hence rafters $13$ m, ridge $134.760270^\\circ$, eaves $22.619865^\\circ$ each \u2014 and the gable triangle\u2019s area is $\\frac{1}{2}(24)(5) = 60$ m\u00b2.',
      ],
      figures: [
        {
          caption: 'The roof truss: span 24 m, king post 5 m (the apex axis), rafters 13 m. Ridge angle 2 arcsin(12/13) = 134.76\u00b0, eave angles 22.62\u00b0 each \u2014 the 5-12-13 half-triangle laid flat under a roof.',
          svg: geo33Tri({
            aria: 'A flat wide isosceles triangle representing a roof truss: span 24 along the base, a dashed king post of height 5 from the ridge to the midpoint of the base with a right-angle mark, rafters of length 13, ridge angle 134.76 degrees and eave angles 22.62 degrees.',
            hb: 12,
            h: 5,
            scale: 21,
            axis: true,
            rightMark: true,
            ticks: true,
            truss: true,
            apexLabSide: true,
            aLab: 'ridge',
            bLab: 'eave',
            cLab: 'eave',
            sideL: 'rafter 13',
            sideR: 'rafter 13',
            baseL: 'span 24 (tie beam)',
            halfL: '12',
            halfR: '12',
            hLab: 'king post 5',
            apexLab: '134.76\u00b0',
            bAngLab: '22.62\u00b0',
            cAngLab: '22.62\u00b0',
            note: 'half-triangle 5\u221212\u221213 laid flat; gable area = (1/2)(24)(5) = 60',
          }),
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 9. history + exam callouts                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The bridge of asses: a short history' },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Pons asinorum \u2014 the bridge of asses',
      text: 'The nickname is medieval student slang, and it is not affectionate. Proposition I.5 of Euclid\u2019s Elements \u2014 the base angles of an isosceles triangle are equal \u2014 was the first proposition of Book I that could not be swallowed at a glance: everything before it is a line or two of angle bookkeeping, and then suddenly the reader is asked to hold a congruence between a triangle and ITSELF in mind. Latin-speaking students called it the pons asinorum, the bridge of asses, and university tradition turned the name into a joke with teeth: the proposition was the bridge out of the elementary material, and the asses \u2014 those who could not prove it \u2014 did not cross. The name may also owe something to the picture: Euclid\u2019s own proof produces the sides and joins the new points, and his two-part figure, squatting on its horizontal base with struts rising from both ends, looks remarkably like a stone bridge with its two approaches. Whatever the exact origin, the phrase stuck for six centuries and spread beyond mathematics entirely \u2014 any hard first test that separates the serious from the casual is still called a pons asinorum. Euclid wrote the Elements around 300 BC in Alexandria; the stripped proof you met in this section, with no construction at all, is credited to the later commentator Pappus, who worked in the same city some six or seven hundred years afterwards \u2014 a reminder that even the classics kept receiving repairs.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the isosceles shortcut list',
      text: 'Four results carry almost every isosceles mark on offer, and each should be citable BY CONTENT in one line. (1) BASE ANGLES: equal legs imply equal base angles (I.5), and conversely equal base angles imply equal legs (I.6) \u2014 name the direction you are using; \u201ctriangle isosceles, so base angles equal\u201d and \u201cbase angles equal, so the sides opposite them are equal\u201d are the phrases examiners want. (2) THE AXIS PACKAGE: the apex-to-midpoint line is median, altitude and angle bisector at once \u2014 cite SSS on the halves; remember that the package is exclusive to the apex axis, and that any TWO of the three jobs trigger the third. (3) THE EQUILATERAL REFLEX: all sides equal implies all angles 60; and an isosceles triangle with any 60-degree angle closes equilateral \u2014 a two-line finish that examiners love to set as a trap for students who compute instead of conclude. (4) THE HEIGHT REFLEX: equilateral height is sqrt(3)/2 times the side, area sqrt(3)/4 times the side squared. The three exam shapes are exactly the three Illustrations: the witness read completely (draw the axis, halve, apply Pythagoras), the base-angle walk (angle sum plus one trigonometric ratio), and the roof truss (span and rise in, rafter out). Exam-style items in the exercise set below follow those three shapes.',
    },
    {
      kind: 'table',
      caption: 'The isosceles shortcut table: what each statement assumes, what it concludes, and the licence that pays for it. Cite the licence, not just the conclusion \u2014 the reason line is where the marks live.',
      head: ['Statement', 'Assumes', 'Concludes', 'Licence'],
      rows: [
        ['Pons asinorum (I.5)', '$AB = AC$', '$\angle ABC = \angle ACB$', 'SAS on the doubled reading'],
        ['The converse (I.6)', '$\angle ABC = \angle ACB$', '$AB = AC$', 'ASA on the doubled reading'],
        ['Equilateral corollary', '$AB = AC = BC$', 'all angles $60^\circ$', 'I.5 three times + angle sum'],
        ['The axis package', '$AB = AC$, $M$ midpoint of $BC$', '$AM \perp BC$, bisects the apex angle', 'SSS on the halves'],
        ['Exterior supplements', '$AB = AC$', 'exterior angles at $B$ and $C$ equal', 'supplements of equals'],
        ['The height reflex', 'equilateral, side $s$', '$h = s\sqrt{3}/2$, area $s^2\sqrt{3}/4$', 'the 30-60-90 half'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. recap: terms + formula cards                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Recap: the vocabulary and the cards' },
    {
      kind: 'para',
      text: 'From the above discussion, it follows that the whole lesson is four congruences wearing four different clothes. The doubled reading of one triangle, taken with SAS, proves I.5; taken with ASA it proves I.6; applied to the two halves created by the midpoint of the base, taken with SSS, it proves the axis package; and applied three times around an equilateral triangle it proves the sixty-degree corollary, with the angle sum closing the books. The terms below harvest the vocabulary; the cards harvest the results you should eventually recall without derivation.',
    },
    {
      kind: 'terms',
      items: [
        { term: 'isosceles triangle', def: 'A triangle with two equal sides. Under the chapter convention we write the equal sides as $AB = AC$, so $A$ is the apex, $BC$ is the base and the base angles are at $B$ and $C$.' },
        { term: 'legs', def: 'The two equal sides of an isosceles triangle, $AB$ and $AC$ in our reading; each is the hypotenuse of the right triangle the axis creates.' },
        { term: 'apex', def: 'The common vertex of the two equal sides \u2014 the vertex where the two legs meet, opposite the base.' },
        { term: 'base', def: 'The side opposite the apex, $BC = a$ in our reading; the side the triangle stands on in the usual drawing.' },
        { term: 'base angles', def: 'The two angles at the vertices of the base. Equal by I.5 whenever the legs are equal; their equality forces equal legs by I.6.' },
        { term: 'pons asinorum', def: 'The medieval nickname for Euclid I.5 \u2014 \u201cthe bridge of asses\u201d \u2014 the first genuinely difficult proposition of Book I: the base angles of an isosceles triangle are equal.' },
        { term: 'the converse', def: 'Euclid I.6: if two angles of a triangle are equal, the sides opposite them are equal. Proved directly by ASA on the doubled reading; Euclid\u2019s own proof is a reductio.' },
        { term: 'doubled triangle', def: 'The device of reading one triangle as two \u2014 $ABC$ and $ACB$ under the correspondence $A \to A$, $B \to C$, $C \to B$ \u2014 so that a congruence criterion can be run on the two namings of a single figure.' },
        { term: 'equilateral triangle', def: 'A triangle with all three sides equal; by the corollary of this lesson, all three angles are then exactly $60^\\circ$.' },
        { term: 'equiangular', def: 'Having all angles equal. In a triangle, equiangular is equivalent to equilateral (I.5 one way, I.6 plus the angle sum the other).' },
        { term: 'apex axis', def: 'The segment from the apex $A$ to the midpoint $M$ of the base \u2014 the would-be fold line of the symmetry.' },
        { term: 'the axis package', def: 'The coincidence that the apex axis is simultaneously the median, the altitude and the angle bisector: $BM = CM$, $AM \perp BC$, $\angle BAM = \angle CAM$ \u2014 by SSS on the halves.' },
        { term: 'the 30-60-90 half', def: 'The right triangle obtained by dropping the axis of an equilateral triangle: half-base $s/2$, height $s\sqrt{3}/2$, leg $s$, with angles $30^\\circ$, $60^\\circ$, $90^\\circ$.' },
        { term: 'the half-angle toolkit', def: 'For legs $\ell$ and apex angle $2t$: base angle $= 90^\\circ - t$, height $h = \ell \cos t$, base $a = 2\ell \sin t$ \u2014 the axis turns every isosceles computation into one right triangle.' },
      ],
    },
    {
      kind: 'formula',
      name: 'Isosceles base angles (pons asinorum)',
      latex: 'AB = AC \\ \\Leftrightarrow\\ \\angle ABC = \\angle ACB',
      note: 'forward is I.5 (SAS on the doubled reading); converse is I.6 (ASA on the doubled reading) \u2014 cite the direction you use',
    },
    {
      kind: 'formula',
      name: 'The axis package (one line, three jobs)',
      latex: 'AB = AC,\\ M\\ \\text{midpoint of } BC \\ \\Rightarrow\\ AM \\perp BC,\\ \\angle BAM = \\angle CAM',
      note: 'the median is the altitude is the bisector \u2014 SSS on the halves; exclusive to the apex axis',
    },
    {
      kind: 'formula',
      name: 'Equilateral angles (the 60-degree reflex)',
      latex: 'AB = AC = BC \\ \\Rightarrow\\ \\angle A = \\angle B = \\angle C = 60^\\circ',
      note: 'I.5 three times plus the angle sum; conversely an isosceles triangle with any 60-degree angle closes equilateral',
    },
    {
      kind: 'formula',
      name: 'Equilateral height and area',
      latex: 'h = \\frac{\\sqrt{3}}{2}\\,s, \\qquad \\text{area} = \\frac{\\sqrt{3}}{4}\\,s^{2}',
      note: 'the 30-60-90 half does both \u2014 at side 1: height 0.866025, area 0.433013',
    },
    {
      kind: 'formula',
      name: 'The half-angle toolkit',
      latex: '\\text{base angle} = 90^\\circ - t, \\qquad h = \\ell \\cos t, \\qquad a = 2\\ell \\sin t',
      note: 'for legs $\ell$ and apex angle $2t$ \u2014 draw the axis first, always',
    },
    {
      kind: 'formula',
      name: 'The half-triangle ratios',
      latex: '\\sin t = \\frac{a}{2\\ell}, \\qquad \\cos t = \\frac{h}{\\ell}, \\qquad \\tan t = \\frac{a}{2h}',
      note: 'the three ratios inside the right triangle the axis creates \u2014 run them forwards or backwards',
    },
    /* -------------------------------------------------------------- */
    /* 11. quiz                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In triangle $ABC$, $AB = AC$ and $\angle ABC = 40^\\circ$. The apex angle $\angle BAC$ equals \u2014',
          options: [
            '40\u00b0, because all three angles of an isosceles triangle are equal',
            '70\u00b0, because the apex is the average of the base angles',
            '100\u00b0, because the base angles are equal (I.5), so the apex is 180 \u2212 40 \u2212 40',
            '140\u00b0, because the apex is the supplement of one base angle',
          ],
          answer: 2,
          explain: 'The legs are equal, so by I.5 the base angles are equal: both are $40^\\circ$. The angle sum then closes the apex: $\angle A = 180^\\circ - 40^\\circ - 40^\\circ = 100^\\circ$. Option (a) confuses isosceles with equilateral \u2014 only the ALL-equal-sided triangle has all angles equal, and $40 + 40 + 40$ is not even $180$. Option (b) computes $(180 - 40)/2$, which is the formula for a base angle when the APEX is $40^\\circ$ \u2014 the roles are swapped. Option (d) subtracts only one base angle; the apex must clear BOTH base angles out of the straight angle.',
        },
        {
          q: 'The name pons asinorum \u2014 \u201cthe bridge of asses\u201d \u2014 was the medieval students\u2019 nickname for \u2014',
          options: [
            'Euclid\u2019s Proposition I.5, the base angles of an isosceles triangle',
            'Euclid\u2019s Proposition I.4, the SAS criterion',
            'Euclid\u2019s Proposition I.6, the converse of the base-angles theorem',
            'the fifth postulate on parallel lines',
          ],
          answer: 0,
          explain: 'I.5 \u2014 equal legs imply equal base angles \u2014 was the first genuinely difficult proposition of Book I, the gate the medieval student had to pass; the name stuck, and the figure\u2019s bridge-like shape may have helped it along. Option (b) is wrong twice over: I.4 (SAS) is earlier but straightforward, and it is an AXIOM-of-method rather than a proposition students stumbled on. Option (c) is the very next proposition and rides across on the same doubled-triangle idea \u2014 once I.5 is crossed, I.6 is not a second bridge. Option (d) is a postulate, not a proposition, and belongs to the theory of parallels, not of isosceles triangles.',
        },
        {
          q: 'In the lesson\u2019s witness triangle, $AB = AC = 13$ and $BC = 10$. The height from $A$ and the area are \u2014',
          options: [
            'height 12 and area 120',
            'height 10 and area 60',
            'height 13 and area 65',
            '12 and 60: the axis splits the base into 5 + 5, the halves are 5-12-13 right triangles, so the height is 12 and the area is (1/2)(10)(12) = 60',
          ],
          answer: 3,
          explain: 'The axis from $A$ to the midpoint $M$ of $BC$ gives $BM = CM = 5$ and, by the axis package, meets the base at right angles \u2014 so each half is a right triangle with hypotenuse $13$ and leg $5$, forcing the height $AM = \\sqrt{169 - 25} = 12$: the 5-12-13 halves. Area $= \\frac{1}{2} \\times 10 \\times 12 = 60$. Option (a) doubles the area \u2014 the classic slip of multiplying base by height and forgetting the half. Option (b) uses the base as the height. Option (c) assumes the height equals the leg, which happens only in the degenerate limit where the base shrinks to a point.',
        },
        {
          q: 'In an isosceles triangle, the segment from the apex to the midpoint of the base is \u2014',
          options: [
            'a median only; the altitude and the bisector are different lines',
            'a median, altitude and angle bisector \u2014 all three at once, by SSS on the halves',
            'an altitude and a median, but a bisector only when the triangle is equilateral',
            'the longest side of the triangle, longer than either leg',
          ],
          answer: 1,
          explain: 'This is the axis package: with $M$ the midpoint of the base, the halves $ABM$ and $ACM$ have $AB = AC$, $BM = CM$ and $AM$ shared, so SSS makes them congruent; the angles at $M$ are equal and supplementary, hence $90^\\circ$ (altitude), and the angles at $A$ are equal (bisector) \u2014 on top of the median property that was built in. Option (a) denies the theorem. Option (c) invents an equilateral exception: the bisector half of the package needs only the TWO equal legs, not three equal sides. Option (d) is false on every witness \u2014 in the 13-13-10 triangle the axis is $12$, shorter than either leg $13$; the axis can exceed the legs only when the apex is very sharp.',
        },
        {
          q: 'An equilateral triangle has side $1$. Its height is \u2014',
          options: [
            '$\\sqrt{3}/2 \\approx 0.866025$ \u2014 the 30-60-90 half has half-base 1/2, so the height is the square root of 1 \u2212 1/4',
            '$1/2$ \u2014 half the side',
            '$\\sqrt{2}/2 \\approx 0.707$ \u2014 the diagonal ratio of the half-square',
            '$\\sqrt{3} \\approx 1.732$ \u2014 the height of the side-2 equilateral',
          ],
          answer: 0,
          explain: 'Drop the axis: the half-triangle has hypotenuse $1$ (the leg), base $1/2$ (the half-side) and height $h$, so $h^2 = 1 - 1/4 = 3/4$ and $h = \\sqrt{3}/2 \\approx 0.866025$ \u2014 the pinned witness of this lesson, and the short leg of the 30-60-90 triangle. Option (b) quotes the half-BASE, not the height. Option (c) quotes the half-square\u2019s diagonal ratio \u2014 that belongs to the isosceles right triangle of Illustration 2, not to the equilateral. Option (d) is the height of the equilateral with side $2$ \u2014 the right number for the wrong triangle, off by the factor that the half-base contributes.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 12. graded exercises (15, L1\u2013L6, full steps solutions)        */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the classic consequences',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Triangle $ABC$ is isosceles with $AB = AC$ and $\\angle ABC = 50^\\circ$. Find $\\angle BAC$, naming the theorem you use.',
              solution: [
                'Sol. Cite the direction: the legs $AB$ and $AC$ are equal, so by I.5 the base angles are equal \u2014 $\\angle ACB = \\angle ABC = 50^\\circ$.',
                'Now, apply the angle sum: $\\angle BAC + \\angle ABC + \\angle ACB = 180^\\circ$, so $\\angle BAC = 180^\\circ - 50^\\circ - 50^\\circ$.',
                'So, $\\angle BAC = 80^\\circ$.',
                'Hence the apex angle is $80^\\circ$, by I.5 plus the angle sum.',
              ],
              answer: '$\\angle BAC = 80^\\circ$ (base angles $50^\\circ$ each by I.5, angle sum $180^\\circ$)',
            },
            {
              q: 'An isosceles triangle has apex angle $40^\\circ$. Find each base angle.',
              solution: [
                'Sol. Set up: the triangle is isosceles, so by I.5 the two base angles are equal; call their common value $\\beta$.',
                'Now, the angle sum: $40^\\circ + \\beta + \\beta = 180^\\circ$, so $2\\beta = 140^\\circ$.',
                'So, $\\beta = 70^\\circ$.',
                'Hence each base angle is $70^\\circ$ \u2014 and as a check, I.6 confirms the legs opposite them are equal, consistent with the hypothesis.',
              ],
              answer: 'Each base angle is $70^\\circ$',
            },
            {
              q: 'An equilateral triangle has side $8$ cm. Find its height and its area.',
              solution: [
                'Sol. Drop the axis from one vertex to the midpoint of the opposite side: by the axis package it is the altitude, and it splits the triangle into two 30-60-90 halves with hypotenuse $8$ and short leg $4$.',
                'Now, Pythagoras on a half: $h^2 = 8^2 - 4^2 = 64 - 16 = 48$, so $h = \\sqrt{48} = 4\\sqrt{3} \\approx 6.928203$ cm \u2014 equally $h = \\frac{\\sqrt{3}}{2}(8)$.',
                'So, the area: $\\frac{1}{2}(8)(4\\sqrt{3}) = 16\\sqrt{3} \\approx 27.712813$ cm\u00b2 \u2014 equally $\\frac{\\sqrt{3}}{4}(8^2) = 16\\sqrt{3}$.',
                'Hence height $4\\sqrt{3} \\approx 6.928203$ cm and area $16\\sqrt{3} \\approx 27.712813$ cm\u00b2.',
              ],
              answer: 'Height $4\\sqrt{3} \\approx 6.928203$ cm; area $16\\sqrt{3} \\approx 27.712813$ cm\u00b2',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Triangle $ABC$ has $AB = AC = 25$ and $BC = 30$. Find the height from $A$, the area, the apex angle and the base angles.',
              solution: [
                'Sol. Draw the axis to the midpoint $M$ of $BC$: $BM = CM = 15$, and by the axis package $AM$ is the altitude.',
                'Now, Pythagoras on half $ABM$: $AM = \\sqrt{25^2 - 15^2} = \\sqrt{625 - 225} = \\sqrt{400} = 20$ \u2014 the halves are 15-20-25.',
                'So, the area: $\\frac{1}{2}(30)(20) = 300$.',
                'Find the half-apex: $\\sin t = 15/25 = 3/5$, so $t = \\arcsin(0.6) = 36.869898^\\circ$, and the apex is $2t = 73.739795^\\circ$.',
                'So, each base angle is $90^\\circ - t = 53.130102^\\circ$ (equally $\\arcsin(20/25) = \\arcsin(0.8)$); check: $73.739795 + 2(53.130102) = 180^\\circ$.',
                'Hence height $20$, area $300$, apex $73.739795^\\circ$, base angles $53.130102^\\circ$ each.',
              ],
              answer: 'Height 20, area 300, apex $73.739795^\\circ$, base angles $53.130102^\\circ$ each',
              figures: [
                {
                  caption: 'The axis-package halves of Exercise 4: the 25-25-30 triangle splits into two 15-20-25 right triangles, height 20, area 300, apex 73.74\u00b0, base angles 53.13\u00b0.',
                  svg: geo33Tri({
                    aria: 'A 25-25-30 isosceles triangle with a dashed axis of height 20 to the midpoint of the base, right angle marked, halves labelled 15 and 20, apex 73.74 degrees and base angles 53.13 degrees.',
                    hb: 15,
                    h: 20,
                    scale: 9,
                    axis: true,
                    rightMark: true,
                    ticks: true,
                    sideL: '25',
                    sideR: '25',
                    baseL: 'base 30',
                    halfL: '15',
                    halfR: '15',
                    hLab: 'h = 20',
                    apexLab: '73.74\u00b0',
                    bAngLab: '53.13\u00b0',
                    cAngLab: '53.13\u00b0',
                    note: 'halves 15\u221220\u221225; area = (1/2)(30)(20) = 300',
                  }),
                },
              ],
            },
            {
              q: 'An isosceles triangle has legs $10$ and apex angle $60^\\circ$. Show that it is equilateral, and find its height and area.',
              solution: [
                'Sol. Split the apex with the axis: the half-apex is $t = 30^\\circ$, and the half-triangle has hypotenuse $10$.',
                'Now, the half-base: $\\frac{a}{2} = 10\\sin 30^\\circ = 10 \\times \\frac{1}{2} = 5$, so the base $a = 10$ \u2014 equal to the legs.',
                'So, the triangle has all three sides equal to $10$: it is equilateral, and by the corollary all its angles are $60^\\circ$ \u2014 the reflex at work.',
                'Find the height: $h = 10\\cos 30^\\circ = 5\\sqrt{3} \\approx 8.660254$.',
                'So, the area: $\\frac{\\sqrt{3}}{4}(10^2) = 25\\sqrt{3} \\approx 43.301270$.',
                'Hence the triangle is equilateral with height $5\\sqrt{3} \\approx 8.660254$ and area $25\\sqrt{3} \\approx 43.301270$.',
              ],
              answer: 'Equilateral (base $10$ = legs); height $5\\sqrt{3} \\approx 8.660254$, area $25\\sqrt{3} \\approx 43.301270$',
            },
            {
              q: 'The base angles of an isosceles triangle are $(2x + 10)^\\circ$ and $(3x - 5)^\\circ$. Find $x$, the base angles and the apex angle.',
              solution: [
                'Sol. Cite the theorem: the triangle is isosceles, so by I.5 the base angles are equal.',
                'Set up: $2x + 10 = 3x - 5$.',
                'Now, collect: $10 + 5 = 3x - 2x$, so $x = 15$.',
                'So, each base angle is $2(15) + 10 = 40^\\circ$ (check: $3(15) - 5 = 40^\\circ$ \u2014 equal, as required).',
                'Find the apex: $180^\\circ - 40^\\circ - 40^\\circ = 100^\\circ$.',
                'Hence $x = 15$, base angles $40^\\circ$ each, apex $100^\\circ$.',
              ],
              answer: '$x = 15$; base angles $40^\\circ$ each; apex $100^\\circ$',
              figures: [
                {
                  caption: 'The base-angle walk of Exercise 6: the two base angles carry the expressions (2x + 10)\u00b0 and (3x \u2212 5)\u00b0; I.5 sets them equal, x = 15, base angles 40\u00b0, apex 100\u00b0.',
                  svg: geo33Walk({
                    aria: 'An isosceles triangle with its two base angles labelled with the expressions 2x plus 10 degrees and 3x minus 5 degrees, and the apex labelled as 180 minus twice the base angle.',
                    bExpr: '(2x + 10)\u00b0',
                    cExpr: '(3x \u2212 5)\u00b0',
                    note: 'I.5: base angles equal \u2014 2x + 10 = 3x \u2212 5 \u21d2 x = 15, base angles 40\u00b0, apex 100\u00b0',
                  }),
                },
              ],
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'A symmetric roof truss spans $16$ m on its tie beam and has rafters of $10$ m. Find the king post, the ridge angle, the eave angles and the area of the gable triangle.',
              solution: [
                'Sol. Set up the axis reading: the king post meets the tie beam at its midpoint (axis package: the median is the altitude), so each half is a right triangle with half-span $8$ and rafter (hypotenuse) $10$.',
                'Find the king post: $k = \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$ m \u2014 the 6-8-10 half.',
                'Now, the half-ridge angle: $\\sin t = 8/10 = 0.8$, so $t = \\arcsin(0.8) = 53.130102^\\circ$, and the ridge angle is $2t = 106.260204^\\circ$.',
                'So, each eave angle is $90^\\circ - t = 36.869898^\\circ$ (equally $\\arcsin(6/10) = \\arcsin(0.6)$); check the sum: $106.260204 + 2(36.869898) = 180^\\circ$.',
                'Find the gable area: $\\frac{1}{2}(16)(6) = 48$ m\u00b2.',
                'Hence king post $6$ m, ridge $106.260204^\\circ$, eaves $36.869898^\\circ$ each, gable area $48$ m\u00b2.',
              ],
              answer: 'King post $6$ m; ridge $106.260204^\\circ$; eave angles $36.869898^\\circ$ each; gable area $48$ m\u00b2',
            },
            {
              q: 'A triangle has angles $72^\\circ$, $72^\\circ$ and $36^\\circ$. Which sides are equal, and why? Show further that the ratio leg : base equals the golden ratio $1.618034$.',
              solution: [
                'Sol. Identify the equal angles: the two $72^\\circ$ angles are equal, so by I.6 the sides OPPOSITE them are equal \u2014 the two legs, with the $36^\\circ$ angle at the apex between them. This is the golden triangle.',
                'Now, drop the axis: the half-apex is $t = 18^\\circ$, and the half-triangle has hypotenuse $\\ell$ (the leg) and short leg $a/2$ (the half-base).',
                'So, $\\frac{a}{2} = \\ell \\sin 18^\\circ$, giving the ratio $\\frac{\\ell}{a} = \\frac{1}{2\\sin 18^\\circ}$.',
                'Compute: $2\\sin 18^\\circ = 0.618034$, so $\\frac{\\ell}{a} = \\frac{1}{0.618034} = 1.618034 = \\frac{1 + \\sqrt{5}}{2}$ \u2014 the golden ratio, engine-verified.',
                'Hence the legs (opposite the $72^\\circ$ angles) are equal by I.6, and leg : base $= 1.618034 : 1$.',
              ],
              answer: 'The sides opposite the $72^\\circ$ angles are equal (I.6); leg : base $= 1.618034 : 1$ (the golden ratio)',
            },
            {
              q: 'Triangle $ABC$ has $AB = AC = 17$ and $BC = 16$. Find the height, the area, the apex angle and the base angles.',
              solution: [
                'Sol. Draw the axis to the midpoint $M$: $BM = CM = 8$, and the axis package makes $AM$ the altitude.',
                'Now, Pythagoras: $AM = \\sqrt{17^2 - 8^2} = \\sqrt{289 - 64} = \\sqrt{225} = 15$ \u2014 the halves are 8-15-17.',
                'So, the area: $\\frac{1}{2}(16)(15) = 120$.',
                'Find the half-apex: $\\sin t = 8/17$, so $t = \\arcsin(8/17) = 28.072487^\\circ$, and the apex is $2t = 56.144974^\\circ$.',
                'So, each base angle is $90^\\circ - t = 61.927513^\\circ$ (equally $\\arcsin(15/17)$); check: $56.144974 + 2(61.927513) = 180^\\circ$.',
                'Hence height $15$, area $120$, apex $56.144974^\\circ$, base angles $61.927513^\\circ$ each.',
              ],
              answer: 'Height 15, area 120, apex $56.144974^\\circ$, base angles $61.927513^\\circ$ each',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Triangle $ABC$ has $AB = AC = 25$ and $BC = 14$. Read the axis package completely: height, area, half-apex, apex angle and base angles.',
              solution: [
                'Sol. Draw the axis: $BM = CM = 7$, altitude by the axis package.',
                'Now, Pythagoras: $AM = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24$ \u2014 the halves are 7-24-25.',
                'So, the area: $\\frac{1}{2}(14)(24) = 168$; read by halves, $2 \\times \\frac{1}{2}(7)(24) = 84 + 84 = 168$.',
                'Find the half-apex: $\\sin t = 7/25 = 0.28$, so $t = \\arcsin(0.28) = 16.260205^\\circ$.',
                'So, the apex is $2t = 32.520409^\\circ$ and each base angle is $90^\\circ - t = 73.739795^\\circ$ (equally $\\arcsin(24/25)$); check: $32.520409 + 2(73.739795) = 180^\\circ$.',
                'Hence height $24$, area $168$, half-apex $16.260205^\\circ$, apex $32.520409^\\circ$, base angles $73.739795^\\circ$ each \u2014 and $AM$ is median, altitude and bisector in one line.',
              ],
              answer: 'Height 24, area 168, half-apex $16.260205^\\circ$, apex $32.520409^\\circ$, base angles $73.739795^\\circ$ each',
            },
            {
              q: '$P$ is a point on the apex axis of the witness triangle ($AB = AC = 13$, $BC = 10$) with $PM = 3$, where $M$ is the midpoint of the base. Prove that $PB = PC$, and compute both.',
              solution: [
                'Sol. Set up: $M$ is the midpoint of $BC$, so $BM = CM = 5$; $P$ lies on $AM$, so by the axis package $PM \\perp BC$ \u2014 the right angles at $M$ on both sides.',
                'Compare the halves: in triangles $PBM$ and $PCM$, we have $BM = CM$ ($5$), $\\angle PMB = \\angle PMC = 90^\\circ$ (axis package), and $PM$ shared.',
                'Now, SAS applies: triangle $PBM \\cong$ triangle $PCM$, so $PB = PC$ \u2014 corresponding parts.',
                'Compute: $PB = PC = \\sqrt{PM^2 + BM^2} = \\sqrt{3^2 + 5^2} = \\sqrt{9 + 25} = \\sqrt{34} \\approx 5.830952$.',
                'Hence $PB = PC = \\sqrt{34} \\approx 5.830952$ \u2014 every point on the axis is equidistant from $B$ and $C$.',
              ],
              answer: '$PB = PC = \\sqrt{34} \\approx 5.830952$, by SAS on the halves $PBM$ and $PCM$',
            },
            {
              q: 'An equilateral triangle has area $9\\sqrt{3}$. Find its side and its height.',
              solution: [
                'Sol. Write the area formula: $\\text{area} = \\frac{\\sqrt{3}}{4}s^2 = 9\\sqrt{3}$.',
                'Now, cancel the $\\sqrt{3}$: $\\frac{s^2}{4} = 9$, so $s^2 = 36$ and $s = 6$.',
                'So, the height: $h = \\frac{\\sqrt{3}}{2}s = \\frac{\\sqrt{3}}{2}(6) = 3\\sqrt{3} \\approx 5.196152$.',
                'Check by the half: the 30-60-90 half has half-base $3$ and hypotenuse $6$, so $h = \\sqrt{36 - 9} = \\sqrt{27} = 3\\sqrt{3}$ \u2014 consistent.',
                'Hence side $6$ and height $3\\sqrt{3} \\approx 5.196152$.',
              ],
              answer: 'Side $6$; height $3\\sqrt{3} \\approx 5.196152$',
              figures: [
                {
                  caption: 'The equilateral half of Exercise 12: side 6, half-base 3, height 3\u221a3 \u2248 5.196152 \u2014 the 30-60-90 half with all angles 60\u00b0.',
                  svg: geo33Equi({
                    aria: 'An equilateral triangle of side 6 with a dashed axis of height 3 square root 3 to the midpoint of the base, right angle marked, half-base 3 labelled, and all angles 60 degrees.',
                    side: 6,
                    scale: 50,
                    sideLab: '6',
                    halfLab: '3',
                    hLab: 'h = 3\u221a3 \u2248 5.196152',
                    note: 'area = (\u221a3/4)(36) = 9\u221a3; height = 3\u221a3 \u2248 5.196152',
                  }),
                },
              ],
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'In triangle $ABC$, $AB = AC$. Points $D$ on $AB$ and $E$ on $AC$ satisfy $AD = AE$. Prove that $DB = EC$ and that $DC = EB$. Verify both numerically when $AD = AE = 5$ on the witness triangle (legs 13, base 10).',
              solution: [
                'Sol. First the subtraction: $AB = AC$ and $AD = AE$, so $DB = AB - AD = AC - AE = EC$.',
                'Now, cite I.5 on the big triangle: $AB = AC$ gives $\\angle ABC = \\angle ACB$ \u2014 call it $\\beta$.',
                'Compare triangles $DBC$ and $ECB$: $DB = EC$ (step 1), $\\angle DBC = \\angle ECB = \\beta$ (step 2, since $D$ lies on $BA$ and $E$ on $CA$), and $BC$ is common \u2014 SAS applies.',
                'So, triangle $DBC \\cong$ triangle $ECB$, and corresponding parts give $DC = EB$.',
                'Verify on the witness with $AD = AE = 5$: $DB = EC = 13 - 5 = 8$; and computing from coordinates, $DC = EB = \\sqrt{17316}/13 \\approx 10.123$.',
                'Hence $DB = EC$ by subtraction and $DC = EB$ by SAS on triangles $DBC$ and $ECB$ \u2014 the small triangle $ADE$ is isosceles by the same I.5 reading.',
              ],
              answer: '$DB = EC = 8$ and $DC = EB \\approx 10.123$ at the witness; the congruence is SAS with the base angles from I.5',
            },
            {
              q: 'Write out the doubled-ASA proof of I.6 in your own words, and witness every step on a triangle whose base angles are $67.380135^\\circ$.',
              solution: [
                'Sol. State the claim: if $\\angle ABC = \\angle ACB$, then $AB = AC$.',
                'Fix the doubled correspondence: compare triangle $ABC$ with triangle $ACB$ under $A \\to A$, $B \\to C$, $C \\to B$.',
                'Match the data: the hypothesis read through the correspondence supplies both angle matches ($\\angle B = \\angle C$ and $\\angle C = \\angle B$), and the base $BC = CB$ sits between them \u2014 ASA applies.',
                'Conclude: triangle $ABC \\cong$ triangle $ACB$, so $AB = AC$ (corresponding sides).',
                'Witness at $\\angle B = \\angle C = 67.380135^\\circ$: the ASA data triple reads $(67.380135^\\circ, BC, 67.380135^\\circ)$ in both namings, and the conclusion lands on $AB = AC$ \u2014 on the witness triangle, both equal $13$, with base $BC = 10$ and apex $45.239730^\\circ$.',
                'Hence equal base angles force equal legs \u2014 Euclid I.6, witnessed: legs $13 = 13$ opposite the equal $67.380135^\\circ$ base angles.',
              ],
              answer: 'I.6 by doubled ASA: data triple $(67.380135^\\circ, 10, 67.380135^\\circ)$; conclusion $AB = AC = 13$ on the witness',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The axis-locus theorem (exam-style, extended). Place $B = (0,0)$ and $C = (10,0)$. Prove that a point $P$ satisfies $PB = PC$ if and only if $P$ lies on the perpendicular bisector of $BC$; deduce that the apex axis of the witness triangle IS that perpendicular bisector. Verify at the three axis points $(5,12)$, $(5,4)$, $(5,-3)$ and at the off-axis point $(6,4)$.',
              solution: [
                'Sol. Forward direction: suppose $PB = PC$ with $P = (x,y)$. Then $x^2 + y^2 = (x-10)^2 + y^2$, so $x^2 = x^2 - 20x + 100$, giving $20x = 100$ and $x = 5$ \u2014 the vertical line through the midpoint of $BC$, which is indeed perpendicular to $BC$.',
                'Now, the reverse direction: if $P = (5,y)$ lies on that line, then $PB = \\sqrt{25 + y^2} = PC$ by the same algebra read backwards \u2014 every point of the line is equidistant from $B$ and $C$.',
                'Connect to the lesson: the apex axis of the witness triangle ($AB = AC = 13$, $BC = 10$) runs from $A = (5,12)$ to $M = (5,0)$ \u2014 it IS the line $x = 5$, the perpendicular bisector of the base; the axis package of this lesson is the synthetic form of the locus statement.',
                'Verify the axis points: at $(5,12)$: $PB = PC = \\sqrt{25 + 144} = 13$; at $(5,4)$: $PB = PC = \\sqrt{25 + 16} = \\sqrt{41}$; at $(5,-3)$: $PB = PC = \\sqrt{25 + 9} = \\sqrt{34} \\approx 5.830952$ \u2014 all equidistant, even the point below the base.',
                'Verify the failure off the axis: at $(6,4)$: $PB = \\sqrt{36 + 16} = \\sqrt{52} \\approx 7.211$ while $PC = \\sqrt{16 + 16} = \\sqrt{32} \\approx 5.657$ \u2014 unequal, as the theorem demands.',
                'Hence $PB = PC$ exactly on the perpendicular bisector of $BC$ \u2014 the axis is the locus, and the SAS argument of Exercise 11 is its synthetic proof.',
              ],
              answer: '$PB = PC \\iff P$ on $x = 5$: at $(5,12)$, $(5,4)$, $(5,-3)$: $PB = PC$ (13, $\\sqrt{41}$, $\\sqrt{34} \\approx 5.830952$); at $(6,4)$: $\\sqrt{52} \\approx 7.211 \\ne \\sqrt{32} \\approx 5.657$',
            },
          ],
        },
      ],
    },
  ],
}
