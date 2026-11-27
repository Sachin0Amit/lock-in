import type { Lesson } from '../../../src/data/library/types'

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
