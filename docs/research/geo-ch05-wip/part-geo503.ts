import type { Lesson } from '../../../src/data/library/types'

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
