import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c23 = {
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
const f23 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo23 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo23Txt = (
  x: number, y: number, s: string,
  size = 13, color = c23.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f23}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo23Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c23.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo23Dot = (x: number, y: number, color = c23.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo23Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo23Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo23Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c23.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo23Line(x1, y1, x2, y2, color, w) + geo23Head(x2, y2, a, color, 8)
}

/** labelled position node for the V4 square: circle + two-line label */
const geo23CircleLbl = (x: number, y: number, top: string, bot: string): string =>
  `<circle cx="${x}" cy="${y}" r="30" fill="${c23.paper}" stroke="${c23.green}" stroke-width="2.4"/>` +
  geo23Txt(x, y - 2, top, 12.5, c23.ink) +
  geo23Txt(x, y + 16, bot, 13.5, c23.orange)

const geo23Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** arc on a circle, from angle a0 to a1 (radians, screen coords: 0 = east, positive = clockwise on screen) */
const geo23Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/* ------------------------------------------------------------------ */
/* the census picture: lines m (upper) and n (lower), transversal t    */
/* meeting them at P and Q; the eight angles a1..a8 per the label law  */
/* ------------------------------------------------------------------ */
const geo23Census = (o: {
  aria: string
  labels?: string[]
  subs?: Array<string | null>
  hl?: number[]
  hlColor?: string
  band?: boolean
}): string => {
  const W = 640, H = 436
  const yM = 118, yN = 318
  const T1: [number, number] = [140, 408], T2: [number, number] = [470, 38]
  const dx = T2[0] - T1[0], dy = T2[1] - T1[1]
  const sP = (T1[1] - yM) / (T1[1] - T2[1])
  const P: [number, number] = [T1[0] + sP * dx, yM]
  const sQ = (T1[1] - yN) / (T1[1] - T2[1])
  const Q: [number, number] = [T1[0] + sQ * dx, yN]
  const L = Math.hypot(dx, dy)
  const u: [number, number] = [dx / L, dy / L]
  const nl: [number, number] = [u[1], -u[0]] // left-of-t normal (up-left)
  const nrm2 = (a: [number, number]): [number, number] => {
    const l = Math.hypot(a[0], a[1])
    return [a[0] / l, a[1] / l]
  }
  const add = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]]
  const up: [number, number] = [0, -1], dn: [number, number] = [0, 1]
  const neg = (a: [number, number]): [number, number] => [-a[0], -a[1]]
  // quadrant directions UL, UR, LR, LL (unit)
  const quad: Array<[number, number]> = [
    nrm2(add(up, nl)), nrm2(add(up, neg(nl))), nrm2(add(dn, neg(nl))), nrm2(add(dn, nl)),
  ]
  const V: Array<[number, number]> = [P, P, P, P, Q, Q, Q, Q]
  const qd = [0, 1, 2, 3, 0, 1, 2, 3]
  const phiU = Math.atan2(u[1], u[0])
  const phiD = phiU + Math.PI
  // arc spans (a0 -> a1) for UL, UR, LR, LL
  const spans: Array<[number, number]> = [
    [phiU, -Math.PI], [0, phiU], [0, phiD], [phiD, Math.PI],
  ]
  const parts: string[] = []
  if (o.band) parts.push(`<rect x="36" y="${yM}" width="568" height="${yN - yM}" fill="${c23.panel}" fill-opacity="0.28"/>`)
  parts.push(geo23Line(30, yM, 610, yM, c23.ink, 2.5))
  parts.push(geo23Line(30, yN, 610, yN, c23.ink, 2.5))
  parts.push(geo23Line(T1[0], T1[1], T2[0], T2[1], c23.tealInk, 2.5))
  parts.push(geo23Txt(596, yM - 10, 'm', 13.5, c23.ink))
  parts.push(geo23Txt(596, yN - 10, 'n', 13.5, c23.ink))
  parts.push(geo23Txt(476, 34, 't', 13.5, c23.tealInk, 'start'))
  parts.push(geo23Dot(P[0], P[1], c23.ink, 4.5) + geo23Dot(Q[0], Q[1], c23.ink, 4.5))
  parts.push(geo23Txt(P[0] + 13, P[1] + 16, 'P', 13, c23.ink))
  parts.push(geo23Txt(Q[0] + 13, Q[1] + 16, 'Q', 13, c23.ink))
  if (o.band) parts.push(geo23Txt(84, (yM + yN) / 2 + 4, 'interior band', 11.5, c23.tealInk))
  const hl = new Set(o.hl ?? [])
  for (let i = 0; i < 8; i++) {
    const [cx, cy] = V[i]
    const [a0, a1] = spans[qd[i]]
    parts.push(geo23Arc(cx, cy, 22, a0, a1, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.teal, hl.has(i) ? 3 : 2))
    if (hl.has(i)) parts.push(geo23Arc(cx, cy, 28.5, a0, a1, o.hlColor ?? c23.orange, 2))
  }
  const labels = o.labels ?? ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
  for (let i = 0; i < 8; i++) {
    const [vx, vy] = V[i]
    const q = quad[qd[i]]
    parts.push(geo23Txt(vx + q[0] * 42, vy + q[1] * 42, labels[i], 13.5, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.ink))
    const sub = o.subs?.[i]
    if (sub) parts.push(geo23Txt(vx + q[0] * 66, vy + q[1] * 66, sub, 11.5, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.mid))
  }
  return geo23Svg(W, H, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* the mini census panel (for the family figure): same construction,   */
/* smaller canvas, only the highlighted pair labelled                  */
/* ------------------------------------------------------------------ */
const geo23Mini = (x0: number, y0: number, hi: number[], color: string, title: string): string[] => {
  const yM = y0 + 62, yN = y0 + 192
  const T1: [number, number] = [x0 + 70, y0 + 242], T2: [number, number] = [x0 + 268, y0 + 28]
  const dx = T2[0] - T1[0], dy = T2[1] - T1[1]
  const sP = (T1[1] - yM) / (T1[1] - T2[1])
  const P: [number, number] = [T1[0] + sP * dx, yM]
  const sQ = (T1[1] - yN) / (T1[1] - T2[1])
  const Q: [number, number] = [T1[0] + sQ * dx, yN]
  const L = Math.hypot(dx, dy)
  const u: [number, number] = [dx / L, dy / L]
  const nl: [number, number] = [u[1], -u[0]]
  const nrm2 = (a: [number, number]): [number, number] => {
    const l = Math.hypot(a[0], a[1])
    return [a[0] / l, a[1] / l]
  }
  const add = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]]
  const up: [number, number] = [0, -1], dn: [number, number] = [0, 1]
  const neg = (a: [number, number]): [number, number] => [-a[0], -a[1]]
  const quad: Array<[number, number]> = [
    nrm2(add(up, nl)), nrm2(add(up, neg(nl))), nrm2(add(dn, neg(nl))), nrm2(add(dn, nl)),
  ]
  const V: Array<[number, number]> = [P, P, P, P, Q, Q, Q, Q]
  const qd = [0, 1, 2, 3, 0, 1, 2, 3]
  const phiU = Math.atan2(u[1], u[0])
  const phiD = phiU + Math.PI
  const spans: Array<[number, number]> = [
    [phiU, -Math.PI], [0, phiU], [0, phiD], [phiD, Math.PI],
  ]
  const parts: string[] = []
  parts.push(geo23Line(x0 + 20, yM, x0 + 400, yM, c23.ink, 2.2))
  parts.push(geo23Line(x0 + 20, yN, x0 + 400, yN, c23.ink, 2.2))
  parts.push(geo23Line(T1[0], T1[1], T2[0], T2[1], c23.tealInk, 2.2))
  parts.push(geo23Dot(P[0], P[1], c23.ink, 3.5) + geo23Dot(Q[0], Q[1], c23.ink, 3.5))
  parts.push(geo23Txt(P[0] + 10, P[1] + 14, 'P', 11.5, c23.ink))
  parts.push(geo23Txt(Q[0] + 10, Q[1] + 14, 'Q', 11.5, c23.ink))
  const hset = new Set(hi)
  for (let i = 0; i < 8; i++) {
    const [cx, cy] = V[i]
    const [a0, a1] = spans[qd[i]]
    if (hset.has(i)) {
      parts.push(geo23Arc(cx, cy, 25, a0, a1, color, 3))
      parts.push(geo23Arc(cx, cy, 32, a0, a1, color, 2))
      const q = quad[qd[i]]
      parts.push(geo23Txt(cx + q[0] * 46, cy + q[1] * 46, `a${i + 1}`, 13, color))
    } else {
      parts.push(geo23Arc(cx, cy, 20, a0, a1, c23.faint, 1.6))
    }
  }
  parts.push(geo23Txt(x0 + 210, y0 + 236, title, 12.5, c23.ink))
  return parts
}

/* ------------------------------------------------------------------ */
/* the zigzag picture: three parallels, two transversals through B     */
/* ------------------------------------------------------------------ */
const geo23Zigzag = (o: {
  aria: string; aLab: string; bLab: string; xLab: string
  transport?: boolean; note?: string
}): string => {
  const W = 620, H = 402
  const y1 = 70, y2 = 180, y3 = 290
  const B: [number, number] = [320, 180]
  const rad = (d: number) => (d * Math.PI) / 180
  const d1: [number, number] = [Math.cos(rad(130)), -Math.sin(rad(130))] // up-left
  const d2: [number, number] = [Math.cos(rad(60)), -Math.sin(rad(60))] // up-right
  const k1 = (y2 - y1) / -d1[1], k1b = (y3 - y2) / -d1[1]
  const k2 = (y2 - y1) / -d2[1], k2b = (y3 - y2) / -d2[1]
  const A: [number, number] = [B[0] + d1[0] * k1, y1]
  const A2: [number, number] = [B[0] - d1[0] * k1b, y3]
  const C: [number, number] = [B[0] - d2[0] * k2b, y3]
  const C2: [number, number] = [B[0] + d2[0] * k2, y1]
  const phi1 = Math.atan2(d1[1], d1[0]) // t1 up-ray angle
  const phi2 = Math.atan2(d2[1], d2[0]) // t2 up-ray angle
  const bis = (a0: number, a1: number): [number, number] => [Math.cos((a0 + a1) / 2), Math.sin((a0 + a1) / 2)]
  const parts: string[] = []
  parts.push(geo23Line(50, y1, 560, y1, c23.ink, 2.4))
  parts.push(geo23Line(50, y2, 560, y2, c23.ink, 2.4))
  parts.push(geo23Line(50, y3, 560, y3, c23.ink, 2.4))
  parts.push(geo23Line(A[0], A[1], A2[0], A2[1], c23.tealInk, 2.4))
  parts.push(geo23Line(C2[0], C2[1], C[0], C[1], c23.tealInk, 2.4))
  parts.push(geo23Txt(572, 60, 'm1', 13, c23.ink))
  parts.push(geo23Txt(572, 170, 'm2', 13, c23.ink))
  parts.push(geo23Txt(572, 280, 'm3', 13, c23.ink))
  parts.push(geo23Dot(A[0], A[1], c23.ink, 4) + geo23Dot(B[0], B[1], c23.ink, 4.5) + geo23Dot(C[0], C[1], c23.ink, 4))
  parts.push(geo23Txt(A[0] + 2, A[1] - 16, 'A', 12.5, c23.ink))
  parts.push(geo23Txt(B[0] + 12, B[1] + 18, 'B', 13, c23.ink))
  parts.push(geo23Txt(C[0] + 2, C[1] - 16, 'C', 12.5, c23.ink))
  // outer angle arcs
  parts.push(geo23Arc(A[0], A[1], 24, phi1, -Math.PI, c23.green, 2.5))
  parts.push(geo23Arc(C[0], C[1], 24, 0, phi2, c23.green, 2.5))
  const pa = bis(phi1, -Math.PI), pb = bis(0, phi2), px = bis(phi1, phi2)
  parts.push(geo23Txt(A[0] + pa[0] * 46, A[1] + pa[1] * 46, o.aLab, 12.5, c23.green))
  parts.push(geo23Txt(C[0] + pb[0] * 46, C[1] + pb[1] * 46, o.bLab, 12.5, c23.green))
  // the x arc at B between the two up-rays
  parts.push(geo23Arc(B[0], B[1], 38, phi1, phi2, c23.orange, 3))
  parts.push(geo23Txt(B[0] + px[0] * 58, B[1] + px[1] * 58, o.xLab, 13.5, c23.orange))
  if (o.transport) {
    parts.push(geo23Arc(B[0], B[1], 52, phi1, -Math.PI, c23.amber, 2, '5 4'))
    parts.push(geo23Arc(B[0], B[1], 52, 0, phi2, c23.amber, 2, '5 4'))
    parts.push(geo23Txt(B[0] + pa[0] * 74, B[1] + pa[1] * 74, o.aLab, 11.5, c23.amber))
    parts.push(geo23Txt(B[0] + pb[0] * 74, B[1] + pb[1] * 74, o.bLab, 11.5, c23.amber))
  }
  if (o.note) parts.push(geo23Txt(310, 384, o.note, 12.5, c23.tealInk))
  return geo23Svg(W, H, o.aria, parts)
}

/* ================================================================== */
/* LESSON 2.3 — The Transversal: the Eight-Angle Census                */
/* ================================================================== */
export const lessonGeo203: Lesson = {
  id: 'geo-the-transversal-the-eight-angle-census',
  number: '2.3',
  title: 'The Transversal: the Eight-Angle Census',
  concepts: [
    'transversal',
    'corresponding angles',
    'alternate interior angles',
    'alternate exterior angles',
    'co-interior angles',
    'vertically opposite angles',
    'the converse direction',
  ],
  objectives: [
    'State the definition of a transversal and label all eight angles it creates under the chapter\u2019s a1..a8 convention',
    'Recite and use the full eight-angle census when the lines are parallel: four corresponding pairs equal, two alternate pairs equal, two co-interior pairs supplementary',
    'Name the family of any angle pair by POSITION alone, without waiting for a recognisable picture',
    'Distinguish the fifth-free converse direction (Euclid I.27 and I.28) from the forward direction (I.29, the fifth postulate\u2019s first appearance)',
    'Reduce every converse route to the alternate-interior equality a3 = a5 using only vertical and linear facts',
    'Solve one-angle, zigzag and expression-on-the-census problems with a licensed reason for every step',
  ],
  prerequisites: [
    'geo-incidence-how-points-lines-and-planes-interlock',
    'geo-angles-types-pairs-and-measures',
    'geo-parallel-lines-and-the-fifth-postulate',
  ],
  sources: ['geo-euclid-elements', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The instrument that reads the parallel' },
    {
      kind: 'para',
      text: 'Lesson 2.2 ended with a strange bargain. Euclid\u2019s fifth postulate bought us the existence and uniqueness of a parallel through any point, and Playfair\u2019s cleaner restatement made the bargain sound almost free: one line through the point, never meeting the original. But a promise that two lines never meet is a promise about behaviour at infinity, and no ruler can check it. What we needed \u2014 and what this lesson finally builds \u2014 is an INSTRUMENT: something we can lay across two lines at arm\u2019s length that reads off, from angles we can actually measure, everything the parallel promise implies. That instrument is the transversal, and the readout it produces is a census of eight angles.',
    },
    {
      kind: 'para',
      text: 'The idea is disarmingly simple. Take two lines and cut them with a third. At each crossing point four angles appear, and by Lesson 2.1 we already know how those four behave AT A SINGLE VERTEX: vertically opposite angles are equal, adjacent angles on a straight line are supplementary. None of that needed the parallel postulate, and none of it cares whether the two cut lines will someday meet. So the eight angles carry sixteen purely local facts \u2014 eight vertical pairings and eight linear pairings, four at each vertex \u2014 before any question of parallelism arises. The interesting question is what happens ACROSS the two vertices: how the four angles at one crossing talk to the four angles at the other. If the two lines are arbitrary, the answer is \u201chardly at all\u201d. If the two lines are parallel, the answer is a complete census \u2014 every one of the twenty-eight pairs of angles falls into a named family with a fixed verdict.',
    },
    {
      kind: 'para',
      text: 'This lesson is the machinery lesson of the chapter, and we shall build the machine in the proper order. First the definition of a transversal and the labelling convention that the whole chapter uses. Then the census itself: the table of families \u2014 corresponding, alternate interior, alternate exterior, co-interior, co-exterior, vertically opposite, linear \u2014 with the exact verdict each family carries when the lines are parallel. Then the honest history: which direction of the machinery costs the fifth postulate and which direction is free, a split that Euclid himself marked by waiting until Proposition I.29 before spending his most expensive axiom. Then the reduction graph showing that every converse route collapses to a single equality. Then the position group that organises the local facts. Finally the worked chains: given one angle, recover all eight with reasons; untangle a zigzag of three parallels; and solve for an unknown inside expressions written on the census.',
    },
    {
      kind: 'para',
      text: 'A word about why this matters beyond geometry. The pattern \u201ccut a structure and read off invariants of the pieces\u201d is one of the great recurring moves of mathematics: a seismograph cuts the earth and reads its layers, a spectroscope cuts light and reads its elements, a transversal cuts a pair of lines and reads whether they are parallel. In every case the reading is LOCAL \u2014 you only measure near the cut \u2014 and the conclusion is GLOBAL: something about the whole structure. Learning to trust such readings, and to say precisely which axiom licenses each step, is the real training of this lesson.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the definition + the label law + F1                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The label law: eight angles, two vertices' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Transversal',
      text: 'A line $t$ is said to be a transversal of two lines $m$ and $n$ if it meets $m$ and $n$ at two DISTINCT points. Thus, $t$ is a transversal of $m$ and $n$ when $t$ crosses $m$ at a point $P$, crosses $n$ at a point $Q$, and $P$ and $Q$ are different points. The definition extends verbatim to three or more lines: a transversal of a family of lines meets each of them, and no two meeting points coincide.',
    },
    {
      kind: 'para',
      text: 'The distinctness clause is not decoration. If $t$ met $m$ and $n$ at the SAME point, we would have three lines through one point, and the picture would be the single-vertex crossing of Lesson 2.1 \u2014 four angles, not eight, and no notion of \u201cbetween the lines\u201d at all. The transversal is precisely the tool that creates TWO vertices, and with them the strip between $m$ and $n$ whose properties we now study. Note also what the definition does not say: it does not say the lines are parallel, and it does not say the transversal is slanted. A perpendicular cutting two parallels is a perfectly good transversal \u2014 the special one that makes all eight angles right angles.',
    },
    {
      kind: 'para',
      text: 'Eight angles are too many to discuss in prose without names, so we fix the chapter\u2019s labelling convention NOW and use it in every table, figure, engine and exercise that follows. Draw $m$ as the upper line and $n$ as the lower line; let the transversal $t$ climb from lower left to upper right, meeting $m$ at $P$ and $n$ at $Q$. At $P$, going counterclockwise from upper left, the four angles are $a_1$ (upper left), $a_2$ (upper right), $a_3$ (lower right) and $a_4$ (lower left). At $Q$, the same counterclockwise sweep names $a_5$ (upper left), $a_6$ (upper right), $a_7$ (lower right) and $a_8$ (lower left). The region between $m$ and $n$ is the INTERIOR strip: at $P$ the interior pair is the lower two angles $a_3$ and $a_4$; at $Q$ the interior pair is the upper two, $a_5$ and $a_6$. Everything outside the strip \u2014 $a_1$ and $a_2$ above $m$, $a_7$ and $a_8$ below $n$ \u2014 is EXTERIOR.',
    },
    {
      kind: 'figure',
      caption: 'The label law. The transversal t meets line m (upper) at P and line n (lower) at Q. At each vertex the four angles are named counterclockwise from upper left: a1, a2, a3, a4 at P and a5, a6, a7, a8 at Q. The tinted strip between m and n is the interior region \u2014 at P its occupants are a3 and a4, at Q they are a5 and a6; the other four angles are exterior.',
      svg: geo23Census({ aria: 'Two horizontal lines m and n cut by a rising transversal t at points P and Q, with the eight angles labelled a1 to a8 according to the chapter convention and the interior strip tinted.', band: true }),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Position, not picture',
      text: 'Every one of the eight names is a POSITION: upper left, upper right, lower right, lower left, at one of the two vertices. Nothing in the convention depends on the transversal being drawn from lower left to upper right \u2014 flip the picture, tilt the page, or draw $t$ falling instead of climbing, and the rule \u201ccounterclockwise from upper left, $P$ first then $Q$\u201d still pins the same eight names to the same eight regions. Train yourself to name an angle by its position (\u201cupper right at $Q$\u201d, that is, $a_6$) rather than by how the picture happens to look. When an exam rotates the figure \u2014 and it will \u2014 the labels travel with the positions, not with your memory of the drawing.',
    },
    /* -------------------------------------------------------------- */
    /* 3. the census table — the heart                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census: every family at once' },
    {
      kind: 'para',
      text: 'From here to the end of the section, ASSUME $m$ and $n$ are parallel, with transversal $t$ cutting $m$ at $P$ and $n$ at $Q$ as in the label law. What we are about to write down is the single most used table in elementary geometry: the complete list of angle families the eight angles form, with the verdict each family carries. Read it once as a table of facts, then again as a table of PATTERNS \u2014 the F, the Z and the C \u2014 because in an examination you will recognise the families by their shapes before you have time to recite definitions.',
    },
    {
      kind: 'table',
      caption: 'The eight-angle census when m is parallel to n \u2014 all seven families, their pairs under the label law, their verdicts and their counts',
      head: ['Family', 'Pairs (label law)', 'Verdict when m ∥ n', 'Pairs', 'Nickname'],
      rows: [
        ['Corresponding', '$a_1 = a_5$, $a_2 = a_6$, $a_3 = a_7$, $a_4 = a_8$', 'EQUAL', '4', 'the F'],
        ['Alternate interior', '$a_4 = a_6$, $a_3 = a_5$', 'EQUAL', '2', 'the Z'],
        ['Alternate exterior', '$a_1 = a_7$, $a_2 = a_8$', 'EQUAL', '2', '\u2014'],
        ['Co-interior (same-side interior)', '$a_4 + a_5 = 180^\\circ$, $a_3 + a_6 = 180^\\circ$', 'SUM $180^\\circ$', '2', 'the C'],
        ['Co-exterior (same-side exterior)', '$a_1 + a_8 = 180^\\circ$, $a_2 + a_7 = 180^\\circ$', 'SUM $180^\\circ$', '2', '\u2014'],
        ['Vertically opposite', '$a_1 = a_3$, $a_2 = a_4$, $a_5 = a_7$, $a_6 = a_8$', 'EQUAL', '4', 'the X'],
        ['Linear pairs (at P and at Q)', '$a_1{+}a_2$, $a_2{+}a_3$, $a_3{+}a_4$, $a_4{+}a_1$; likewise $a_5$ to $a_8$', 'SUM $180^\\circ$', '8', '\u2014'],
      ],
    },
    {
      kind: 'para',
      text: 'Three of these families live at a single vertex and were proved in Lesson 2.1 with no parallel postulate at all: the four vertically opposite pairs are equal, and the eight linear pairs are supplementary. The other four families are the CROSS-VERTEX families, and each of them is a genuine parallel phenomenon. Corresponding angles occupy the SAME POSITION at the two vertices \u2014 $a_1$ and $a_5$ are both upper left, $a_2$ and $a_6$ both upper right, and so on \u2014 and the table says they are equal. Slide $a_1$ down the transversal until its vertex reaches $Q$ and it lands exactly on $a_5$: this is the F-pattern, the letter F (possibly stretched, flipped or slanted) with one arm on each line. Alternate interior angles are the two interior angles on OPPOSITE sides of the transversal, $a_4$ with $a_6$ and $a_3$ with $a_5$: equal, and traced by the Z-pattern. Alternate exterior angles are their outside twins, $a_1$ with $a_7$ and $a_2$ with $a_8$, equal as well. Co-interior angles \u2014 also called same-side interior \u2014 are the two interior angles on the SAME side of the transversal, $a_4$ with $a_5$ on the left and $a_3$ with $a_6$ on the right: these do NOT equal each other; they SUM to $180^\\circ$, and the C-pattern curls around them. Co-exterior angles are the same-side pairs outside the strip, $a_1$ with $a_8$ and $a_2$ with $a_7$, also summing to $180^\\circ$.',
    },
    {
      kind: 'figure',
      caption: 'The four pattern families, colour-coded. Top left: corresponding angles a1 and a5 trace the F and are EQUAL (green). Top right: alternate interior angles a3 and a5 trace the Z and are EQUAL (orange). Bottom left: co-interior angles a4 and a5 curl inside the C and SUM to 180 degrees (amber). Bottom right: vertically opposite angles a1 and a3 cross in the X and are EQUAL (teal) \u2014 the one family that needs no parallels at all.',
      svg: geo23Svg(880, 600, 'Four mini diagrams of two lines cut by a transversal, each highlighting one pair of angles: corresponding a1 and a5 in green labelled the F, alternate interior a3 and a5 in orange labelled the Z, co-interior a4 and a5 in amber labelled the C, and vertically opposite a1 and a3 in teal labelled the X.', [
        geo23Txt(440, 24, 'THE FOUR PATTERN FAMILIES \u2014 WHO IS EQUAL, WHO SUPPLEMENTS', 13, c23.ink, 'middle', '700'),
        ...geo23Mini(20, 44, [0, 4], c23.green, 'Corresponding: a1 = a5 (the F)'),
        ...geo23Mini(450, 44, [2, 4], c23.orange, 'Alternate interior: a3 = a5 (the Z)'),
        ...geo23Mini(20, 330, [3, 4], c23.amber, 'Co-interior: a4 + a5 = 180\u00b0 (the C)'),
        ...geo23Mini(450, 330, [0, 2], c23.tealInk, 'Vertically opposite: a1 = a3 (the X)'),
      ]),
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.29 in our own words \u2014 the forward direction',
      text: 'A transversal falling on two parallel lines makes the alternate angles equal to one another, the exterior angle equal to the interior and opposite angle on the same side, and the two interior angles on the same side together equal to two right angles. In the language of our census: if $m$ and $n$ are parallel, then $a_3 = a_5$ (alternate), $a_1 = a_5$ (exterior equals interior-and-opposite, that is, corresponding) and $a_4 + a_5 = 180^\\circ$ (co-interior). This is the proposition at which the fifth postulate makes its FIRST appearance in the Elements \u2014 twenty-eight propositions of Book I pass without it.',
    },
    {
      kind: 'para',
      text: 'Notice the arithmetic hiding inside the table. Count the pairs: corresponding gives 4, alternate interior 2, alternate exterior 2, co-interior 2, co-exterior 2, vertically opposite 4, linear 8 \u2014 twenty-four named pairs out of the twenty-eight pairs that eight angles can form. The four leftover pairs, $(a_1, a_6)$, $(a_2, a_5)$, $(a_3, a_8)$ and $(a_4, a_7)$, sit on opposite sides of the transversal with one angle interior and the other exterior; the classical catalogue does not name them, but the census constrains them too \u2014 each of the four also sums to $180^\\circ$. So the complete readout is brutal in its simplicity: of the twenty-eight pairs, TWELVE are equal pairs and SIXTEEN are supplementary pairs, and there is nothing else to know. The engine behind this lesson verifies every one of those twenty-eight verdicts, at four different headline angles, before a single sentence of prose was allowed to stand.',
    },
    {
      kind: 'para',
      text: 'And the deepest row of the table is the one that looks least exciting: the census collapses to ONE number. Given $a_1$, everything is determined \u2014 the odd-numbered angles $a_1$, $a_3$, $a_5$, $a_7$ all equal $a_1$, and the even-numbered angles $a_2$, $a_4$, $a_6$, $a_8$ all equal $180^\\circ - a_1$. One measurement at one vertex, and the instrument has read the whole configuration. This is worth isolating as a drill, because examinations test exactly this collapse.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The census collapse: one number buys eight',
      text: 'When $m$ and $n$ are parallel, the census is completely determined by $a_1$: it reads $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$. Equivalently: the odd angles are all equal, the even angles are all equal, and any odd angle plus any even angle at the same vertex makes $180^\\circ$.',
    },
    {
      kind: 'para',
      text: 'Drill the collapse until it is reflex. If $a_1 = 65^\\circ$, the full census is $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$ \u2014 odds equal, evens equal. The same one-line census holds for any starting value whatsoever, and the engine checks it at three more witnesses besides: at $a_1 = 37.5^\\circ$ the census reads $37.5^\\circ$ and $142.5^\\circ$ alternating; at $a_1 = 112.75^\\circ$ it reads $112.75^\\circ$ and $67.25^\\circ$ alternating; and at $a_1 = 90^\\circ$ \u2014 the perpendicular transversal \u2014 every angle is $90^\\circ$ and the odd\u2013even distinction quietly disappears. The table below is the drill in reusable form.',
    },
    {
      kind: 'table',
      caption: 'The census drill at the four engine-verified witnesses \u2014 given a1, the odd angles equal a1 and the even angles equal 180 degrees minus a1',
      head: ['Given $a_1$', 'Odd angles $a_1, a_3, a_5, a_7$', 'Even angles $a_2, a_4, a_6, a_8$', 'Transversal type'],
      rows: [
        ['$65^\\circ$', '$65^\\circ$', '$115^\\circ$', 'slanted'],
        ['$37.5^\\circ$', '$37.5^\\circ$', '$142.5^\\circ$', 'shallow'],
        ['$112.75^\\circ$', '$112.75^\\circ$', '$67.25^\\circ$', 'steep'],
        ['$90^\\circ$', '$90^\\circ$', '$90^\\circ$', 'perpendicular \u2014 all eight right'],
      ],
    },
    {
      kind: 'para',
      text: 'Two cautions before we move on, both of them standard examination traps. FIRST: equality belongs to the alternate and corresponding families; the same-side families SUPPLEMENT. A pair of interior angles on the same side of the transversal is the C, and the C never pays out equality \u2014 unless both angles happen to be $90^\\circ$, the degenerate case in which equality and supplement coincide. Students who write $a_4 = a_5$ from parallel lines have confused the C with the Z, and the remedy is positional: ask WHICH SIDE of the transversal the two angles occupy. SECOND: the four unnamed cross pairs \u2014 $(a_1, a_6)$ and its three siblings \u2014 also sum to $180^\\circ$, but they are NOT co-interior and NOT corresponding, and no standard theorem names them. Demanding equality of such a pair (writing $a_1 = a_6$ for a generic parallel pair) is a category error the engine exposes immediately: since $a_1 + a_6 = 180^\\circ$ always holds here, the equality $a_1 = a_6$ would force both angles to $90^\\circ$. We shall meet this trap again in the worked chains, armed.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, if $a_1 = 65^\\circ$ then $a_6 = 115^\\circ$: $a_3 = a_1 = 65^\\circ$ (vertically opposite at $P$), and $a_3 + a_6 = 180^\\circ$ (co-interior on the right), so $a_6 = 115^\\circ$.',
        'For example, if $a_4 = 125^\\circ$ then $a_5 = 55^\\circ$: $a_4 + a_5 = 180^\\circ$ (co-interior on the left), the C-pattern paying out its supplement.',
        'For example, if $a_2 = 37.5^\\circ$ then $a_6 = 37.5^\\circ$, because $a_2$ and $a_6$ are corresponding (the F) and the F pays out equality; but $a_7 = 142.5^\\circ$, because $a_2$ and $a_7$, though both on the right of $t$, are co-EXTERIOR (the same-side family outside the strip) and the same-side families supplement. Settle the family before the arithmetic.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 4. the honest history — which direction costs the postulate    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Which direction costs the postulate' },
    {
      kind: 'para',
      text: 'Here is the split that gives this lesson its signature, and it is a split Euclid marked himself \u2014 you can read it off the page numbers of Book I. Every fact in the census table is a conditional of the form \u201cIF the lines are parallel, THEN the angles behave\u201d. That is the FORWARD direction: parallels buy the equalities and the supplements. But each row also has a CONVERSE: \u201cIF a transversal makes the alternate angles equal (or the corresponding angles equal, or the co-interior angles supplementary), THEN the lines are parallel\u201d. The converse direction is how parallels are MANUFACTURED \u2014 how a drawing, a construction or a machine is certified parallel from angle measurements alone. The two directions look like mirror images. They are not. They differ in exactly one respect, and it is the most expensive respect in the history of geometry.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.27 \u2014 the converse that costs nothing',
      text: 'If a straight line falling on two straight lines makes the alternate angles equal to one another, the two straight lines are parallel to one another. In our labels: if $a_3 = a_5$ (or $a_4 = a_6$), then $m$ and $n$ do not meet \u2014 they are parallel. Euclid proves this BEFORE ever using the fifth postulate: it is pure angle-chasing plus the exterior angle theorem (I.16), valid in every geometry that keeps Euclid\u2019s first twenty-eight propositions.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.28 \u2014 the other two converse routes, still free',
      text: 'If a straight line falling on two straight lines makes the exterior angle equal to the interior and opposite angle on the same side, the two lines are parallel; and if it makes the two interior angles on the same side together equal to two right angles, the two lines are parallel. In our labels: $a_1 = a_5$ (corresponding) suffices, and so does $a_4 + a_5 = 180^\\circ$ (co-interior). Both routes are proved from I.27 by one vertical or linear step \u2014 the reduction graph below \u2014 and neither touches the fifth postulate.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The fifth postulate\u2019s first appearance',
      text: 'Euclid gets through twenty-eight propositions of Book I without once invoking his fifth postulate \u2014 the contentious one about two interior angles summing to less than two right angles forcing a meeting. The first proposition that spends it is I.29, the FORWARD direction of this lesson\u2019s census table. Nearly everything after I.29 in Book I \u2014 including the famous angle sum of a triangle in I.32, which is Lesson 2.4\u2019s payoff \u2014 depends on it. Joyce\u2019s commentary on the Elements marks I.29 as exactly this watershed, and the run-126 ground register banks the fact. Two millennia later, the geometers who finally questioned the postulate \u2014 Saccheri, Lobachevsky, Bolyai \u2014 were in effect asking which half of our census table survives when the forward direction dies. The answer: the whole converse half, I.27 and I.28, survives untouched.',
    },
    {
      kind: 'para',
      text: 'So the honest ledger reads: CONVERSE (make parallels from angles) \u2014 I.27 and I.28, proved free of the fifth postulate. FORWARD (angles from parallels) \u2014 I.29, the fifth postulate\u2019s first appearance, the moment Euclid finally pays. Why must the forward direction pay when the converse does not? The converse argues that the lines CANNOT meet: if they did, they would form a triangle with the transversal, and the equality of alternate angles would put two equal angles where the exterior angle theorem demands a strictly larger one \u2014 a contradiction available in neutral geometry. The forward direction must argue that the angles CANNOT help being equal \u2014 a claim about what happens arbitrarily far away along both lines, and taming the far away is precisely what the fifth postulate is for. When you write a solution step citing \u201ccorresponding angles\u201d, you are spending I.29 and, through it, the fifth postulate; when you cite \u201calternate angles equal, hence parallel\u201d, you are spending nothing. Examinations adore asking which is which.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Direction identification is an exam skill',
      text: 'Before citing any census row, ask one question: is the parallel GIVEN (you know $m$ and $n$ are parallel and want angles \u2014 forward, I.29) or DERIVED (you know angles and want the parallel \u2014 converse, I.27/I.28)? Same table, opposite direction of travel, different axioms spent. Half of the lost marks on transversal problems come from citing the census in the wrong direction.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the reduction graph                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The reduction graph: every route folds to I.27' },
    {
      kind: 'para',
      text: 'The census table lists three sufficient conditions for parallelism \u2014 corresponding equal, alternate interior equal, co-interior supplementary \u2014 plus a fourth, alternate exterior equal, that the table implies without naming as a certificate. It looks like four independent theorems. It is one theorem wearing four costumes. The claim of this section is that every converse route reduces, using only the single-vertex facts of Lesson 2.1 (vertical equality and linear supplements, both free of the fifth postulate), to the single alternate-interior equality $a_3 = a_5$ that I.27 consumes. The derivation below checks all three routes; the figure behind it draws the flow.',
    },
    {
      kind: 'derivation',
      title: 'Every converse route reduces to the alternate-interior equality',
      statement: 'Given a transversal $t$ of lines $m$ and $n$ (meeting them at $P$ and $Q$), each of the three hypotheses \u2014 corresponding equality $a_1 = a_5$, co-interior supplement $a_4 + a_5 = 180^\\circ$, alternate-exterior equality $a_1 = a_7$ \u2014 implies the alternate-interior equality $a_3 = a_5$, using only the vertex facts (vertical angles equal; linear pairs supplementary).',
      steps: [
        {
          label: 'Vertex facts are free',
          formula: 'a_3 = a_1,\\quad a_7 = a_5,\\quad a_3 + a_4 = 180^\\circ',
          explanation: 'At $P$, vertically opposite angles are equal, so $a_3 = a_1$, and the linear pair on the right of $t$ gives $a_3 + a_4 = 180^\\circ$. At $Q$, vertical equality gives $a_7 = a_5$. These are Lesson 2.1 facts: they hold at each vertex separately, for any two lines, with no parallel assumption and no fifth postulate.',
        },
        {
          label: 'Route 1: corresponding, via vertical at P',
          formula: 'a_1 = a_5 \\ \\Rightarrow\\ a_3 = a_1 = a_5',
          explanation: 'Assume the corresponding pair is equal. Chain it with the vertical equality at $P$: $a_3 = a_1$ and $a_1 = a_5$ give $a_3 = a_5$ by transitivity. The F collapses to the Z in one step.',
        },
        {
          label: 'Route 2: co-interior, via linear at P',
          formula: 'a_4 + a_5 = 180^\\circ \\ \\Rightarrow\\ a_3 = 180^\\circ - a_4 = a_5',
          explanation: 'Assume the co-interior pair on the left supplements. The linear pair at $P$ also supplements $a_4$, with $a_3$. Two angles that both supplement $a_4$ are equal to each other, so $a_3 = a_5$. The C collapses to the Z through the shared supplement.',
        },
        {
          label: 'Route 3: alternate exterior, via vertical at Q',
          formula: 'a_1 = a_7,\\ a_7 = a_5 \\ \\Rightarrow\\ a_1 = a_5',
          explanation: 'Assume the alternate-exterior pair is equal. The vertical equality at $Q$ turns $a_7$ into $a_5$, so $a_1 = a_5$ \u2014 which is Route 1\u2019s hypothesis, and Route 1 finishes: $a_3 = a_5$.',
        },
        {
          label: 'All three land on I.27',
          formula: 'a_3 = a_5 \\ \\Rightarrow\\ m \\parallel n',
          explanation: 'Each route delivers the alternate-interior equality, and I.27 converts that equality into parallelism without spending the fifth postulate. Hence I.28\u2019s two stated routes, and the alternate-exterior certificate, are all corollaries of I.27 plus vertex facts \u2014 one theorem, four costumes.',
        },
      ],
      result: 'Corresponding-equal, co-interior-supplementary and alternate-exterior-equal all imply $a_3 = a_5$; therefore each is a parallelism certificate through I.27 alone, and the engine confirms the three routes over a free sweep of both vertex angles.',
    },
    {
      kind: 'figure',
      caption: 'The reduction graph. Three converse hypotheses (green boxes) each fold through one free vertex fact (amber boxes) onto the alternate-interior equality a3 = a5 (orange box), which Euclid I.27 converts into parallelism. The alternate-exterior route passes through the corresponding equality on its way down. No route touches the fifth postulate.',
      svg: geo23Svg(880, 486, 'A flow diagram: three given-condition boxes at the top, each with an arrow through a vertex-fact box, all converging on one landing box stating a3 equals a5, with a final note that I.27 finishes the job.', [
        geo23Txt(440, 26, 'EVERY CONVERSE ROUTE LANDS ON a3 = a5', 13.5, c23.ink, 'middle', '700'),
        geo23Rect(40, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(155, 74, 'GIVEN corresponding', 13, c23.ink),
        geo23Txt(155, 96, 'a1 = a5', 12.5, c23.mid),
        geo23Rect(325, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(440, 74, 'GIVEN co-interior', 13, c23.ink),
        geo23Txt(440, 96, 'a4 + a5 = 180\u00b0', 12.5, c23.mid),
        geo23Rect(610, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(725, 74, 'GIVEN alt. exterior', 13, c23.ink),
        geo23Txt(725, 96, 'a1 = a7', 12.5, c23.mid),
        geo23Arrow(155, 112, 155, 152, c23.amber, 2),
        geo23Arrow(440, 112, 440, 152, c23.amber, 2),
        geo23Arrow(725, 112, 725, 152, c23.amber, 2),
        geo23Rect(40, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(155, 182, 'vertical at P: a3 = a1', 12.5, c23.ink),
        geo23Txt(155, 204, 'then a3 = a1 = a5', 12, c23.mid),
        geo23Rect(325, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(440, 182, 'linear at P: a3 + a4 = 180\u00b0', 12.5, c23.ink),
        geo23Txt(440, 204, 'then a3 = 180\u00b0 \u2212 a4 = a5', 12, c23.mid),
        geo23Rect(610, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(725, 182, 'vertical at Q: a7 = a5', 12.5, c23.ink),
        geo23Txt(725, 204, 'then a1 = a5 (route 1)', 12, c23.mid),
        geo23Arrow(155, 224, 330, 306, c23.orange, 2.4),
        geo23Arrow(440, 224, 440, 306, c23.orange, 2.4),
        geo23Arrow(725, 224, 550, 306, c23.orange, 2.4),
        geo23Rect(230, 312, 420, 66, c23.panel2, c23.orange),
        geo23Txt(440, 338, 'a3 = a5 \u2014 alternate interior equality', 13.5, c23.orange, 'middle', '700'),
        geo23Txt(440, 360, 'the Z-pattern certificate', 12, c23.mid),
        geo23Arrow(440, 382, 440, 420, c23.green, 2.4),
        geo23Rect(230, 424, 420, 50, c23.panel, c23.green),
        geo23Txt(440, 446, 'Euclid I.27 \u2014 no fifth postulate: m \u2225 n', 13, c23.ink, 'middle', '700'),
        geo23Txt(440, 476, 'all three routes: converse direction only', 11.5, c23.tealInk),
      ]),
    },
    {
      kind: 'para',
      text: 'The reduction graph has a practical reading and a structural one. Practically: you never need to memorise I.28 as a separate theorem \u2014 remember the Z-certificate and one vertical or linear step, and every other certificate is ten seconds away. Structurally: the graph is the reason the converse direction is postulate-free. Every edge in it is either a vertex fact (Lesson 2.1, no postulate) or I.27 itself (no fifth postulate); there is simply nowhere for the fifth postulate to enter. The forward direction, by contrast, cannot be reduced away \u2014 I.29 must reach across the two vertices and pull equality out of parallelism, and that reach is what the postulate pays for. One diagram, and the lesson\u2019s whole historical burden is visible.',
    },
    /* -------------------------------------------------------------- */
    /* 6. the position group V4                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The position group: four slots, three pairings' },
    {
      kind: 'para',
      text: 'Stand at one vertex \u2014 say $P$ \u2014 and forget the parallel question entirely. The four angles $a_1$, $a_2$, $a_3$, $a_4$ occupy four POSITIONS: upper left, upper right, lower right, lower left. From Lesson 2.1 we know how the positions pair up, and it is worth seeing the pairings side by side, because they are three and only three. VERTICAL pairs sit opposite each other through the vertex: upper-left with lower-right, upper-right with lower-left \u2014 EQUAL. LINEAR pairs across the TRANSVERSAL share a ray of $t$: upper-left with upper-right, lower-left with lower-right \u2014 SUM to $180^\\circ$. LINEAR pairs across the LINE $m$ share a ray of the line: upper-left with lower-left, upper-right with lower-right \u2014 also SUM to $180^\\circ$, and distinctly from the previous pairing. Three pairings, each pairing a perfect matching of the four positions, every angle appearing exactly once in each.',
    },
    {
      kind: 'para',
      text: 'Now the structural punchline, stated in light language but exact in content. Each pairing is an INVOLUTION: apply it twice and every position returns to itself \u2014 the partner of your partner is you. And the three pairings compose: apply the vertical pairing, then the across-the-transversal pairing, and the net effect is exactly the across-the-line pairing \u2014 and this holds in EITHER order. The same holds for every other combination: the composition of any two of the three pairings is the third, and the composition of any pairing with itself is the identity (doing nothing). A set of four objects with an identity, three involutions, and this composition table is a genuine mathematical structure called the Klein four-group, written $V_4$ \u2014 the smallest group that is not a cycle. It is the same structure you will meet later governing the symmetry pairs of a rectangle. The engine behind this lesson builds the three pairings, checks all three involutions, and multiplies out the entire composition table.',
    },
    {
      kind: 'figure',
      caption: 'The position group at one vertex. The four positions UL, UR, LR, LL (occupied by a1, a2, a3, a4 at P) carry exactly three pairings, drawn as the three colours of the complete graph on four nodes: vertically opposite (green, EQUAL), linear across the transversal (amber, SUM 180), linear across the line (orange, SUM 180). Each pairing is an involution, and the composition of any two is the third \u2014 the Klein four-group V4. The same table governs a5..a8 at Q.',
      svg: geo23Svg(560, 452, 'A square of four labelled nodes UL, UR, LR, LL joined by six coloured edges: two green diagonals for vertical equality, a amber top and bottom edge for linear across the transversal, and two orange side edges for linear across the line, with a legend underneath.', [
        geo23Txt(280, 26, 'THE POSITION GROUP \u2014 THREE PAIRINGS, ONE SQUARE', 13, c23.ink, 'middle', '700'),
        geo23Line(170, 120, 390, 120, c23.amber, 3),
        geo23Line(170, 320, 390, 320, c23.amber, 3),
        geo23Line(170, 120, 170, 320, c23.orange, 3),
        geo23Line(390, 120, 390, 320, c23.orange, 3),
        geo23Line(170, 120, 390, 320, c23.green, 3),
        geo23Line(390, 120, 170, 320, c23.green, 3),
        geo23Txt(280, 106, 'across t: a1 + a2 = 180\u00b0', 11.5, c23.amber),
        geo23Txt(280, 342, 'across t: a4 + a3 = 180\u00b0', 11.5, c23.amber),
        geo23Txt(126, 224, 'across m:', 11.5, c23.orange),
        geo23Txt(126, 240, 'a1 + a4 = 180\u00b0', 11.5, c23.orange),
        geo23Txt(434, 224, 'across m:', 11.5, c23.orange),
        geo23Txt(434, 240, 'a2 + a3 = 180\u00b0', 11.5, c23.orange),
        geo23Txt(214, 174, 'vertical: a1 = a3', 11.5, c23.green),
        geo23Txt(346, 286, 'vertical: a1 = a3', 11.5, c23.green),
        geo23Txt(346, 174, 'vertical: a2 = a4', 11.5, c23.green),
        geo23Txt(214, 286, 'vertical: a2 = a4', 11.5, c23.green),
        geo23CircleLbl(170, 120, 'UL', 'a1'),
        geo23CircleLbl(390, 120, 'UR', 'a2'),
        geo23CircleLbl(390, 320, 'LR', 'a3'),
        geo23CircleLbl(170, 320, 'LL', 'a4'),
        geo23Txt(280, 396, 'each pairing is an involution; the composition of any two is the third', 12, c23.tealInk),
        geo23Txt(280, 418, 'the Klein four-group V4 \u2014 four positions, three pairings', 12, c23.tealInk),
        geo23Txt(280, 440, 'census = the V4 facts at P and Q + ONE corresponding equality', 12, c23.ink, 'middle', '700'),
      ]),
    },
    {
      kind: 'para',
      text: 'Why should a geometry student care about a group? Because it tells you what the census is MADE of. Count what you now know: at $P$, the three pairings of the position group bind $a_1$, $a_2$, $a_3$, $a_4$ into one equivalence class of size two \u2014 every angle is either $a_1$ or $180^\\circ - a_1$. At $Q$, the same three pairings do the same for $a_5$ through $a_8$. So before any parallel assumption, the eight angles have collapsed to TWO free numbers: the $P$-class value and the $Q$-class value. The entire content of \u201c$m$ parallel $n$\u201d, read through the transversal, is the single equation $a_1 = a_5$ \u2014 one corresponding equality that welds the two classes together. Every row of the census table is then forced: the twelve equal pairs and sixteen supplementary pairs all fall out of four $V_4$ facts (one table, used at two vertices) plus that one welding equation. When a later lesson derives the angle sum of a triangle from a parallel through a vertex, this is the accounting that will make the derivation transparent.',
    },

    /* -------------------------------------------------------------- */
    /* 7. worked applications (Illustration chains)                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. In the first, one angle is given and all eight are recovered \u2014 every step licensed. In the second, three parallels and two transversals tangle into a zigzag, and the middle angle falls to a straight-angle equation. In the third, the angles arrive dressed as algebraic expressions, and the census itself supplies the equation. Watch the reasons: a solution step without a licence is a guess wearing a suit.',
    },
    {
      kind: 'example',
      title: 'Lines m and n are parallel, cut by transversal t at P and Q under the label law. Given a1 = 65\u00b0, find all eight angles, with a reason for each.',
      steps: [
        'Sol. Set up the census from $a_1$: at $P$, the linear pair on the upper side gives $a_2 = 180^\\circ - 65^\\circ = 115^\\circ$ (angles on a straight line).',
        'Now, the vertical pairing at $P$ pays out twice: $a_3 = a_1 = 65^\\circ$ and $a_4 = a_2 = 115^\\circ$ (vertically opposite angles).',
        'Transport to $Q$ by corresponding angles (the F, I.29): $a_5 = a_1 = 65^\\circ$, $a_6 = a_2 = 115^\\circ$, $a_7 = a_3 = 65^\\circ$, $a_8 = a_4 = 115^\\circ$.',
        'Check by a second family: co-interior on the left, $a_4 + a_5 = 115^\\circ + 65^\\circ = 180^\\circ$ (the C) \u2014 consistent.',
        'Check by the third family: alternate interior $a_3 = a_5 = 65^\\circ$ (the Z) \u2014 consistent.',
        'Hence the census reads $65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ$: odds all $65^\\circ$, evens all $115^\\circ$.',
      ],
      figures: [
        {
          caption: 'The census walk at a1 = 65\u00b0: all eight angles recovered from one measurement \u2014 odds 65, evens 115, every cross-vertex verdict landing as the table promises.',
          svg: geo23Census({
            aria: 'Two parallel lines cut by a transversal with all eight angles labelled a1 to a8 and their values 65 or 115 degrees shown beside each label.',
            subs: ['65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0'],
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The zigzag. Three parallel lines m1, m2, m3 are cut by two transversals that meet at a point B on the middle line m2; the transversals meet m1 at A and m3 at C respectively, with the marked outer angles 50\u00b0 at A and 60\u00b0 at C. Find the angle x at B between the two transversals.',
      steps: [
        'Sol. Transport the outer angles to B. Along the first transversal, $m_1$ and $m_2$ are parallel, so the $50^\\circ$ at $A$ has an equal corresponding copy at $B$ (the F, I.29).',
        'Along the second transversal, $m_2$ and $m_3$ are parallel, so the $60^\\circ$ at $C$ likewise has an equal corresponding copy at $B$.',
        'Now, $m_2$ is a straight line through $B$, so the three angles on one side of it \u2014 the transported $50^\\circ$, the gap $x$ between the two transversals, and the transported $60^\\circ$ \u2014 together make a straight angle: $50^\\circ + x + 60^\\circ = 180^\\circ$.',
        'So, $x = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$.',
        'Check: the vertical copy of $x$ at $B$ is also $70^\\circ$, and the angles on the other side of $m_2$ sum to $180^\\circ - 70^\\circ = 110^\\circ$ \u2014 consistent with the two transported supplements $130^\\circ$ and $120^\\circ$ overlapping correctly.',
        'Hence $x = 70^\\circ$ \u2014 the parallel at B is what turns a tangle of five lines into a single straight-angle story.',
      ],
      figures: [
        {
          caption: 'The zigzag solved: the outer 50\u00b0 and 60\u00b0 are transported to B as corresponding copies (dashed amber arcs), where they sit with x along the straight line m2: 50\u00b0 + x + 60\u00b0 = 180\u00b0, so x = 70\u00b0.',
          svg: geo23Zigzag({
            aria: 'Three parallel lines cut by two transversals meeting at point B on the middle line, with outer angles 50 and 60 degrees marked at A and C, transported dashed copies at B, and x equal to 70 degrees marked between the transversals at B.',
            aLab: '50\u00b0', bLab: '60\u00b0', xLab: 'x = 70\u00b0', transport: true,
            note: 'straight angle at B: 50\u00b0 + x + 60\u00b0 = 180\u00b0',
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The x-ladder. Lines m and n are parallel, cut by transversal t at P and Q under the label law. The corresponding angles satisfy a1 = (2x + 10)\u00b0 and a5 = (3x \u2212 5)\u00b0. Find x and the common angle.',
      steps: [
        'Sol. Set up the equation from the family: $a_1$ and $a_5$ are corresponding angles (both upper left, at $P$ and at $Q$), and parallels make corresponding angles equal (the F, I.29).',
        'So, $(2x + 10) = (3x - 5)$.',
        'Now, collect: $10 + 5 = 3x - 2x$, that is, $15 = x$.',
        'Check the family first, the arithmetic second: had the pair been $(a_1, a_6)$ instead, the census would supply a SUM, not an equality \u2014 $a_1 + a_6 = 180^\\circ$ \u2014 and the equation would be $(2x + 10) + (3x - 5) = 180$ instead, a different problem entirely.',
        'Substitute back: $a_1 = 2(15) + 10 = 40^\\circ$ and $a_5 = 3(15) - 5 = 40^\\circ$ \u2014 equal, as corresponding angles must be.',
        'Hence $x = 15$ and both angles are $40^\\circ$; the full census reads $40^\\circ$ (odds) and $140^\\circ$ (evens).',
      ],
      figures: [
        {
          caption: 'The x-ladder solved: the corresponding pair a1 = (2x + 10)\u00b0 and a5 = (3x \u2212 5)\u00b0 highlighted in orange on the census picture; equality of corresponding angles gives x = 15 and both angles 40\u00b0.',
          svg: geo23Census({
            aria: 'Two parallel lines cut by a transversal with the corresponding angles a1 and a5 highlighted in orange and labelled with the expressions 2x plus 10 degrees and 3x minus 5 degrees.',
            hl: [0, 4], hlColor: c23.orange,
            subs: ['(2x + 10)\u00b0', null, null, null, '(3x \u2212 5)\u00b0', null, null, null],
          }),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 8. the forward census derivation                               */
    /* -------------------------------------------------------------- */
    {
      kind: 'para',
      text: 'It is worth spelling out exactly how much machinery I.29 buys, because the answer is: the entire census table, in one derivation. Euclid states the proposition in three clauses (alternate equal, exterior-equals-interior-opposite, co-interior supplementary), and we shall take its first clause \u2014 the alternate-interior equality \u2014 as the seed, deriving everything else from it by vertex facts alone. This is the mirror image of the reduction graph: there, four converse certificates collapsed to one equality; here, one forward equality explodes into twenty-four family verdicts.',
    },
    {
      kind: 'derivation',
      title: 'The forward census: one I.29 equality generates every family verdict',
      statement: 'Suppose $m$ and $n$ are parallel with transversal $t$, and suppose the I.29 alternate-interior clause $a_3 = a_5$ holds. Then every verdict of the census table follows using only vertex facts.',
      steps: [
        {
          label: 'Seed: the Z from I.29',
          formula: 'a_3 = a_5',
          explanation: 'This is the one cross-vertex fact the fifth postulate pays for. Everything below is bookkeeping at the two vertices.',
        },
        {
          label: 'The other Z pair',
          formula: 'a_4 = 180^\\circ - a_3 = 180^\\circ - a_5 = a_6',
          explanation: 'At $P$, $a_4$ supplements $a_3$ (linear pair); at $Q$, $a_6$ supplements $a_5$. Since $a_3 = a_5$, their supplements are equal: $a_4 = a_6$ \u2014 the second alternate-interior pair.',
        },
        {
          label: 'The F pairs',
          formula: 'a_1 = a_3 = a_5,\\quad a_2 = a_4,\\ a_6 = a_8,\\ a_7 = a_5',
          explanation: 'Vertical equality at $P$ turns $a_1$ into $a_3$, which is $a_5$; similarly $a_2 = a_4$, and vertical equality at $Q$ gives $a_7 = a_5$ and $a_8 = a_6$. Chaining: $a_1 = a_5$, $a_2 = a_6$, $a_3 = a_7$, $a_4 = a_8$ \u2014 all four corresponding pairs equal.',
        },
        {
          label: 'The C pairs',
          formula: 'a_4 + a_5 = (180^\\circ - a_5) + a_5 = 180^\\circ',
          explanation: 'The co-interior pair on the left supplements; substituting $a_4 = 180^\\circ - a_5$ collapses the sum to exactly $180^\\circ$. The right-hand pair $a_3 + a_6$ does the same. The co-exterior pairs $a_1 + a_8$ and $a_2 + a_7$ follow identically.',
        },
        {
          label: 'The collapse',
          formula: 'a_1 = a_3 = a_5 = a_7,\\quad a_2 = a_4 = a_6 = a_8',
          explanation: 'Collecting: every odd-labelled angle equals the seed value, every even-labelled angle equals its supplement. Twelve equal pairs and sixteen supplementary pairs \u2014 the complete twenty-eight-pair readout.',
        },
      ],
      result: 'From the single I.29 clause $a_3 = a_5$, vertex facts alone force the whole census: odds equal $a_1$, evens equal $180^\\circ - a_1$ \u2014 the engine certifies all twenty-eight pairwise verdicts at four witness values of $a_1$.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: patterns, positions, directions',
      text: 'Three skills are examined here, in rising order of credit. PATTERN-FINDING: given a dense figure, shade the F, the Z or the C with your pencil before writing anything \u2014 the shading picks the theorem. POSITION-NAMING: \u201cwhich family is this pair?\u201d is answered from the label law (same position: corresponding; opposite sides both interior: alternate interior; same side interior: co-interior), never from the picture\u2019s tilt. DIRECTION-IDENTIFICATION: state whether the parallel is GIVEN (forward, I.29 \u2014 the fifth postulate is being spent) or DERIVED (converse, I.27/I.28 \u2014 postulate-free): a one-line justification naming the proposition is regularly worth as many marks as the arithmetic. Zigzag and expression questions (Illustrations 2 and 3) are standard competitive-exam shapes; the one-angle census walk (Illustration 1) is the guaranteed opener.',
    },
    /* -------------------------------------------------------------- */
    /* 9. terms + formula cards                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'transversal', def: 'A line that meets two or more lines at DISTINCT points. Under the chapter convention it meets line $m$ (upper) at $P$ and line $n$ (lower) at $Q$, creating the eight angles $a_1$ to $a_8$.' },
        { term: 'interior angles', def: 'The four angles inside the strip between $m$ and $n$: $a_3$ and $a_4$ at $P$, $a_5$ and $a_6$ at $Q$. The other four are exterior.' },
        { term: 'corresponding angles', def: 'Angles in the SAME position at the two vertices: $(a_1, a_5)$, $(a_2, a_6)$, $(a_3, a_7)$, $(a_4, a_8)$. Equal when the lines are parallel \u2014 the F-pattern, I.29.' },
        { term: 'alternate interior angles', def: 'Interior angles on OPPOSITE sides of the transversal: $(a_4, a_6)$ and $(a_3, a_5)$. Equal when the lines are parallel \u2014 the Z-pattern, I.29; their equality also CERTIFIES parallelism, I.27.' },
        { term: 'alternate exterior angles', def: 'Exterior angles on opposite sides of the transversal: $(a_1, a_7)$ and $(a_2, a_8)$. Equal when the lines are parallel; a parallelism certificate via one vertical step.' },
        { term: 'co-interior angles', def: 'Interior angles on the SAME side of the transversal: $(a_4, a_5)$ and $(a_3, a_6)$, also called same-side interior. They SUM to $180^\\circ$ when the lines are parallel \u2014 the C-pattern; never equal unless both are $90^\\circ$.' },
        { term: 'co-exterior angles', def: 'Exterior angles on the same side of the transversal: $(a_1, a_8)$ and $(a_2, a_7)$, summing to $180^\\circ$ under parallelism.' },
        { term: 'vertically opposite angles', def: 'Angles opposite each other at one vertex: $(a_1, a_3)$, $(a_2, a_4)$ at $P$ and $(a_5, a_7)$, $(a_6, a_8)$ at $Q$. Always equal \u2014 Lesson 2.1, no parallel postulate needed.' },
        { term: 'linear pair', def: 'Two adjacent angles on a straight line at one vertex; always supplementary (sum $180^\\circ$). Eight such pairs live in the census, four at each vertex.' },
        { term: 'the converse direction', def: 'From angles to parallels: alternate equal (I.27), corresponding equal or co-interior supplementary (I.28) each FORCE the lines to be parallel \u2014 proved without the fifth postulate.' },
        { term: 'the forward direction', def: 'From parallels to angles: I.29, the first proposition of the Elements that spends the fifth postulate, buying the equalities and supplements of the census table.' },
        { term: 'the census collapse', def: 'Under parallelism one number determines all eight angles: odds equal $a_1$, evens equal $180^\\circ - a_1$ \u2014 twelve equal pairs and sixteen supplementary pairs out of the twenty-eight pairs in total.' },
        { term: 'position group', def: 'The three pairings of the four positions at a vertex \u2014 vertical (EQUAL), linear across the transversal, linear across the line (both SUM $180^\\circ$) \u2014 each an involution, the composition of any two giving the third: the Klein four-group $V_4$.' },
        { term: 'cross pair', def: 'One of the four unnamed pairs $(a_1, a_6)$, $(a_2, a_5)$, $(a_3, a_8)$, $(a_4, a_7)$: opposite sides of the transversal, one interior and one exterior. Under parallelism each sums to $180^\\circ$; demanding their equality forces $90^\\circ$.' },
      ],
    },
    {
      kind: 'formula',
      name: 'Corresponding angles (the F)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_1 = a_5,\\ a_2 = a_6,\\ a_3 = a_7,\\ a_4 = a_8',
      note: 'same position at the two vertices; the forward direction is I.29, and the converse certificate is I.28',
    },
    {
      kind: 'formula',
      name: 'Alternate angles (the Z)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_4 = a_6,\\ a_3 = a_5;\\quad a_3 = a_5 \\ \\Rightarrow\\ m \\parallel n',
      note: 'interior version shown; the exterior pairs a1 = a7, a2 = a8 behave the same \u2014 equality forward, certificate converse',
    },
    {
      kind: 'formula',
      name: 'Co-interior angles (the C)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_4 + a_5 = 180^\\circ,\\ a_3 + a_6 = 180^\\circ',
      note: 'same-side interior angles SUPPLEMENT, they do not equal; the converse certificate is I.28\u2019s second clause',
    },
    {
      kind: 'formula',
      name: 'The census collapse',
      latex: 'a_1 = a_3 = a_5 = a_7,\\qquad a_2 = a_4 = a_6 = a_8 = 180^\\circ - a_1',
      note: 'one measurement buys all eight angles \u2014 drill it at 65\u00b0, 37.5\u00b0, 112.75\u00b0, 90\u00b0',
    },
    {
      kind: 'formula',
      name: 'The zigzag equation',
      latex: '\\alpha + x + \\beta = 180^\\circ',
      note: 'outer angles transported to the meeting point B on the middle parallel sit with x along a straight line',
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ at $P$ and $Q$ under the label law. Given $a_1 = 65^\\circ$, the angle $a_6$ equals \u2014',
          options: [
            '65\u00b0, because a1 and a6 sit in matching corners, so they are corresponding and equal',
            '25\u00b0, because a6 is the complement of a1',
            '115\u00b0, because a3 = a1 = 65\u00b0 (vertical at P) and a3 + a6 = 180\u00b0 (co-interior), so a6 = 115\u00b0',
            '155\u00b0, because a6 is a1 short of a full half-turn on the other side',
          ],
          answer: 2,
          explain: 'The census pins $a_6$ two ways: $a_3 = a_1 = 65^\\circ$ vertically at $P$, then $a_3 + a_6 = 180^\\circ$ co-interior on the right, so $a_6 = 115^\\circ$; equally $a_6 = a_2 = 180^\\circ - a_1$ by corresponding. Option (a) is the classic trap: $a_1$ (upper left at $P$) and $a_6$ (upper right at $Q$) are NOT corresponding \u2014 corresponding means the SAME position, and $a_1$\u2019s partner is $a_5$; the pair $(a_1, a_6)$ is one of the four unnamed cross pairs, which supplement. Option (b) invents a complement where the census deals in supplements \u2014 $90^\\circ$ appears nowhere in this configuration. Option (d) is arithmetic noise: $180^\\circ - 25^\\circ$ has no licensed source, and no family pays out 155\u00b0 here.',
        },
        {
          q: 'Which of the following pairs, under the label law, is a pair of ALTERNATE INTERIOR angles?',
          options: [
            'a4 and a6, because they are the interior angles on opposite sides of the transversal',
            'a1 and a5, because they occupy the same position at the two vertices',
            'a3 and a6, because they are the interior angles on the same side of the transversal',
            'a1 and a7, because they are exterior angles on opposite sides of the transversal',
          ],
          answer: 0,
          explain: 'Alternate interior = both angles INSIDE the strip AND on OPPOSITE sides of $t$: at $P$ the interior pair is $a_3$ (right) and $a_4$ (left); at $Q$ it is $a_5$ (left) and $a_6$ (right). Opposite sides pair them as $(a_4, a_6)$ and $(a_3, a_5)$ \u2014 the Z. Option (b) is the corresponding pair, same position at different vertices \u2014 the F, not the Z. Option (c) is the co-interior pair on the right \u2014 same side, not opposite; it supplements, it does not equal. Option (d) is the alternate EXTERIOR pair \u2014 right idea, wrong side of the strip.',
        },
        {
          q: 'The fifth postulate makes its FIRST appearance in Euclid\u2019s Book I at \u2014',
          options: [
            'Proposition I.27, the alternate-angle converse',
            'Proposition I.28, the corresponding and co-interior converses',
            'the definition of a transversal at the head of Book I',
            'Proposition I.29, the forward direction: parallels buy the angle equalities',
          ],
          answer: 3,
          explain: 'Euclid proves twenty-eight propositions before spending the fifth postulate; I.29 \u2014 a transversal falling on parallels makes alternate angles equal \u2014 is the watershed, and nearly all of the rest of Book I depends on it. Option (a) and option (b) are precisely the propositions that get by WITHOUT the postulate: the converse direction is free. Option (c) has the direction of dependence backwards: definitions never spend postulates \u2014 they only fix vocabulary. The exam-shaped moral: citing \u201ccorresponding angles\u201d from given parallels spends I.29 and the postulate; citing \u201calternate equal, hence parallel\u201d spends nothing.',
        },
        {
          q: 'Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel; the outer marked angles are $50^\\circ$ and $60^\\circ$. The angle $x$ between the transversals at $B$ equals \u2014',
          options: [
            '110\u00b0, because angles round a point sum to 360\u00b0',
            '70\u00b0, because the outer angles transport to B and 50\u00b0 + x + 60\u00b0 = 180\u00b0 along the straight middle line',
            '55\u00b0, because x is the average of the two outer angles',
            '120\u00b0, because x is the supplement of the smaller outer angle twice over',
          ],
          answer: 1,
          explain: 'Transport each outer angle along its own transversal to $B$ as a corresponding copy (the parallels license this, I.29); at $B$ the transported $50^\\circ$, the gap $x$ and the transported $60^\\circ$ lie side by side along the straight line through $B$, so $50^\\circ + x + 60^\\circ = 180^\\circ$ and $x = 70^\\circ$. Option (a) miscounts: only ONE side of the straight line is in play, not the full turn around $B$. Option (c) is pattern-matching without a licence \u2014 averages are not a census family. Option (d) has no licensed source; the supplement of $60^\\circ$ is $120^\\circ$, but nothing transports that supplement to the gap between the transversals.',
        },
        {
          q: 'Lines $m$ and $n$ are parallel; the corresponding angles satisfy $a_1 = (2x + 10)^\\circ$ and $a_5 = (3x - 5)^\\circ$. Then \u2014',
          options: [
            'x = 3 and both angles are 16\u00b0',
            'x = 25 and both angles are 60\u00b0',
            'x = 15, and both angles are 40\u00b0',
            'x = 15, and both angles are 50\u00b0',
          ],
          answer: 2,
          explain: 'Corresponding angles under parallelism are equal (the F, I.29), so $2x + 10 = 3x - 5$, giving $x = 15$; substituting, $a_1 = a_5 = 40^\\circ$, and the full census reads 40\u00b0 on the odds and 140\u00b0 on the evens. Option (a) solves a scrambled equation ($2x + 10 = 3x + 5$), which no family licenses. Option (b) solves $2x + 10 = 3x - 15$, again unlicensed. Option (d) gets $x = 15$ right but substitutes carelessly \u2014 $2(15) + 10 = 40$, not $50$; the check \u201cboth angles equal\u201d instantly kills it, since $2(15) + 10 = 40 \\neq 50 = $ nothing. Note the family audit: had the pair been $(a_1, a_6)$, the census would supply the SUM $a_1 + a_6 = 180^\\circ$, not equality \u2014 a different equation entirely.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1–L6, full steps solutions)         */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the eight-angle census',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ at $P$ and $Q$ under the label law. Given $a_1 = 72^\\circ$, write down all eight angles with a reason for each.',
              solution: [
                'Sol. Start at the given vertex: $a_2 = 180^\\circ - 72^\\circ = 108^\\circ$ (linear pair on a straight line at $P$).',
                'Now, the vertical pairing at $P$ pays out: $a_3 = a_1 = 72^\\circ$ and $a_4 = a_2 = 108^\\circ$ (vertically opposite angles).',
                'Transport to $Q$ by corresponding angles (the F, I.29): $a_5 = a_1 = 72^\\circ$, $a_6 = a_2 = 108^\\circ$, $a_7 = a_3 = 72^\\circ$, $a_8 = a_4 = 108^\\circ$.',
                'Check with a second family: co-interior on the left, $a_4 + a_5 = 108^\\circ + 72^\\circ = 180^\\circ$ (the C) \u2014 consistent.',
                'Hence the census reads $72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ$: odds all $72^\\circ$, evens all $108^\\circ$.',
              ],
              answer: 'Odds $72^\\circ$, evens $108^\\circ$ \u2014 the census reads 72, 108, 72, 108, 72, 108, 72, 108',
              figures: [
                {
                  caption: 'The census walk at a1 = 72\u00b0: the drill of Exercise 1 drawn \u2014 odds 72, evens 108, each cross-vertex step licensed by the F.',
                  svg: geo23Census({
                    aria: 'Two parallel lines cut by a transversal with all eight angles labelled a1 to a8 and their values 72 or 108 degrees shown beside each label.',
                    subs: ['72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0'],
                  }),
                },
              ],
            },
            {
              q: 'Name the family of each pair (parallel lines assumed): (i) $a_3$ and $a_7$; (ii) $a_4$ and $a_6$; (iii) $a_2$ and $a_7$; (iv) $a_5$ and $a_7$; (v) $a_1$ and $a_8$.',
              solution: [
                'Sol. Read positions off the label law: (i) $a_3$ and $a_7$ are both lower-right, at $P$ and at $Q$ \u2014 same position, different vertices: CORRESPONDING (equal).',
                '(ii) $a_4$ (lower-left at $P$) and $a_6$ (upper-right at $Q$) are both interior and on opposite sides of $t$: ALTERNATE INTERIOR (equal, the Z).',
                '(iii) $a_2$ (upper-right at $P$) and $a_7$ (lower-right at $Q$) are both exterior and on the same right side of $t$: CO-EXTERIOR (sum $180^\\circ$).',
                '(iv) $a_5$ and $a_7$ share the vertex $Q$ and sit opposite each other through it: VERTICALLY OPPOSITE (equal).',
                '(v) $a_1$ (upper-left at $P$) and $a_8$ (lower-left at $Q$) are both exterior and on the same left side of $t$: CO-EXTERIOR (sum $180^\\circ$).',
                'Hence: (i) corresponding; (ii) alternate interior; (iii) co-exterior; (iv) vertically opposite; (v) co-exterior.',
              ],
              answer: '(i) corresponding, equal; (ii) alternate interior, equal; (iii) co-exterior, sum 180\u00b0; (iv) vertically opposite, equal; (v) co-exterior, sum 180\u00b0',
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_6 = 48^\\circ$, find $a_1$ by two different reason-chains.',
              solution: [
                'Sol. Chain 1 (through $Q$ then across): $a_5 = 180^\\circ - a_6 = 180^\\circ - 48^\\circ = 132^\\circ$ (linear pair at $Q$), then $a_1 = a_5 = 132^\\circ$ (corresponding angles, the F).',
                'Chain 2 (all at $P$, after one transport): $a_2 = a_6 = 48^\\circ$ (corresponding), then $a_1 = 180^\\circ - a_2 = 132^\\circ$ (linear pair at $P$).',
                'Check: the pair $(a_1, a_6)$ is one of the four unnamed cross pairs, and the census indeed supplies $a_1 + a_6 = 132^\\circ + 48^\\circ = 180^\\circ$ \u2014 consistent.',
                'Hence $a_1 = 132^\\circ$ by either chain.',
              ],
              answer: '$a_1 = 132^\\circ$ (two chains: linear-then-corresponding, or corresponding-then-linear)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_4 = 125^\\circ$, find $a_7$ by two different reason-chains.',
              solution: [
                'Sol. Chain 1 (down the left, across the bottom): $a_4$ and $a_8$ are corresponding (both lower-left), so $a_8 = a_4 = 125^\\circ$; then $a_7 = 180^\\circ - a_8 = 55^\\circ$ (linear pair at $Q$).',
                'Chain 2 (across at $P$, down the right): $a_3 = 180^\\circ - a_4 = 55^\\circ$ (linear pair at $P$), then $a_7 = a_3 = 55^\\circ$ (corresponding).',
                'Check with the Z: $a_3$ and $a_5$ \u2014 $a_5 = a_1 = 180^\\circ - a_2 = a_4 = 125^\\circ$, so alternate interior gives $a_5$ versus $a_3$: equal? No \u2014 $a_3 = 55^\\circ$ pairs with $a_5$: they are co-interior on the left with $a_4$, sum $125^\\circ + 55^\\circ = 180^\\circ$ \u2014 consistent.',
                'Hence $a_7 = 55^\\circ$ by either chain.',
              ],
              answer: '$a_7 = 55^\\circ$ (chains: corresponding $a_4 \\to a_8$ then linear; or linear then corresponding $a_3 \\to a_7$)',
            },
            {
              q: 'The engine-verified drill: lines $m$ and $n$ are parallel, and $a_1 = 37.5^\\circ$. Write the full census and say which of the twenty-eight angle pairs are equal.',
              solution: [
                'Sol. Apply the collapse: odds equal $a_1$, evens equal $180^\\circ - a_1$.',
                'Compute the supplement: $180^\\circ - 37.5^\\circ = 142.5^\\circ$.',
                'Hence the census reads $37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ$.',
                'Count the equal pairs: corresponding 4, vertically opposite 4, alternate interior 2, alternate exterior 2 \u2014 twelve equal pairs in all; the other sixteen pairs (8 linear, 2 co-interior, 2 co-exterior, and the 4 unnamed cross pairs) each sum to $180^\\circ$.',
                'So exactly 12 of the 28 pairs are equal here: every odd\u2013odd or even\u2013even pair.',
              ],
              answer: 'Census 37.5\u00b0 (odds) and 142.5\u00b0 (evens); exactly 12 of the 28 pairs are equal \u2014 every odd\u2013odd or even\u2013even pair',
            },
            {
              q: 'A transversal $t$ meets line $m$ at $P$ and line $n$ at $Q$ (label law), and it is GIVEN that $a_4 = 116^\\circ$ and $a_5 = 64^\\circ$. Prove that $m$ and $n$ are parallel, naming the proposition you use.',
              solution: [
                'Sol. Identify the family: $a_4$ and $a_5$ are the co-interior pair on the left of $t$.',
                'Check the sum: $116^\\circ + 64^\\circ = 180^\\circ$ exactly \u2014 the co-interior pair supplements.',
                'Now, cite the certificate: co-interior angles summing to two right angles force the lines to be parallel \u2014 Euclid I.28, second clause; the parallel here is DERIVED, not given.',
                'Reduce to I.27 for the check: $a_3 = 180^\\circ - a_4 = 64^\\circ$ (linear pair at $P$), so $a_3 = a_5 = 64^\\circ$ \u2014 the alternate-interior equality, which is I.27\u2019s hypothesis directly.',
                'Hence $m$ and $n$ are parallel by I.28 (equivalently by I.27 after one linear step) \u2014 no fifth postulate spent.',
              ],
              answer: '$m \\parallel n$ by I.28 (co-interior supplementary), reducible to I.27 via $a_3 = 180^\\circ - 116^\\circ = 64^\\circ = a_5$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. The corresponding angles satisfy $a_2 = (4x - 14)^\\circ$ and $a_6 = (3x + 10)^\\circ$. Find $x$ and the common angle, then write the full census.',
              solution: [
                'Sol. Audit the family first: $a_2$ and $a_6$ are both upper-right \u2014 corresponding (the F) \u2014 so parallels make them EQUAL.',
                'Set up: $4x - 14 = 3x + 10$.',
                'Now, collect: $4x - 3x = 10 + 14$, so $x = 24$.',
                'Substitute: $a_2 = 4(24) - 14 = 82^\\circ$ and $a_6 = 3(24) + 10 = 82^\\circ$ \u2014 equal, as corresponding angles must be.',
                'Hence $x = 24$, both angles $82^\\circ$; the census reads $98^\\circ$ (odds) and $82^\\circ$ (evens).',
              ],
              answer: '$x = 24$ and both angles are $82^\\circ$; census: odds $98^\\circ$, evens $82^\\circ$',
              figures: [
                {
                  caption: 'The x-ladder of Exercise 7: the corresponding pair a2 = (4x \u2212 14)\u00b0 and a6 = (3x + 10)\u00b0 highlighted in orange; the F pays out equality, x = 24, both 82\u00b0.',
                  svg: geo23Census({
                    aria: 'Two parallel lines cut by a transversal with the corresponding angles a2 and a6 highlighted in orange and labelled with the expressions 4x minus 14 degrees and 3x plus 10 degrees.',
                    hl: [1, 5], hlColor: c23.orange,
                    subs: [null, '(4x \u2212 14)\u00b0', null, null, null, '(3x + 10)\u00b0', null, null],
                  }),
                },
              ],
            },
            {
              q: 'Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel; the outer marked angles are $42^\\circ$ and $67^\\circ$. Find the angle $x$ between the transversals at $B$.',
              solution: [
                'Sol. Transport the outer angles to $B$: along each transversal, the parallels give an equal corresponding copy of the outer angle at $B$ (the F, I.29).',
                'Now, the middle line is straight through $B$, so the transported $42^\\circ$, the gap $x$ and the transported $67^\\circ$ sit side by side along it: $42^\\circ + x + 67^\\circ = 180^\\circ$.',
                'So, $x = 180^\\circ - 42^\\circ - 67^\\circ = 71^\\circ$.',
                'Check: the vertical copy of $x$ at $B$ is also $71^\\circ$, and the other side of the straight line carries $180^\\circ - 71^\\circ = 109^\\circ$.',
                'Hence $x = 71^\\circ$ \u2014 a one-line straight-angle story, licensed by two corresponding transports.',
              ],
              answer: '$x = 71^\\circ$',
              figures: [
                {
                  caption: 'The zigzag of Exercise 8: outer angles 42\u00b0 and 67\u00b0 transported to B (dashed amber), where 42\u00b0 + x + 67\u00b0 = 180\u00b0 along the middle parallel gives x = 71\u00b0.',
                  svg: geo23Zigzag({
                    aria: 'Three parallel lines cut by two transversals meeting at B on the middle line, outer angles 42 and 67 degrees marked, transported dashed copies at B, and x equal to 71 degrees between the transversals.',
                    aLab: '42\u00b0', bLab: '67\u00b0', xLab: 'x = 71\u00b0', transport: true,
                    note: 'straight angle at B: 42\u00b0 + x + 67\u00b0 = 180\u00b0',
                  }),
                },
              ],
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law, and the co-interior pair on the left satisfies $a_4 : a_5 = 7 : 2$. Find both angles, and say which of the two is acute.',
              solution: [
                'Sol. Audit the family: $a_4$ and $a_5$ are co-interior (same side, both interior), so they SUM: $a_4 + a_5 = 180^\\circ$.',
                'Split 180 in the ratio 7 : 2 \u2014 nine parts, each $180^\\circ \\div 9 = 20^\\circ$.',
                'So, $a_4 = 7 \\times 20^\\circ = 140^\\circ$ and $a_5 = 2 \\times 20^\\circ = 40^\\circ$.',
                'Check: $140^\\circ + 40^\\circ = 180^\\circ$ \u2014 the C pays out its supplement; and $a_4 = 180^\\circ - a_5$ matches the census collapse with $a_5 = a_1 = 40^\\circ$.',
                'Hence $a_4 = 140^\\circ$ (obtuse) and $a_5 = 40^\\circ$ \u2014 the acute one is $a_5$.',
              ],
              answer: '$a_4 = 140^\\circ$ and $a_5 = 40^\\circ$; the acute angle is $a_5$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$; the bisector of $a_4$ and the bisector of $a_5$ are drawn. Prove that the two bisectors are perpendicular, and verify numerically at $a_4 = 125^\\circ$.',
              solution: [
                'Sol. Set up: $a_4$ and $a_5$ are co-interior, so $a_4 + a_5 = 180^\\circ$ (the C).',
                'Bisect: the angle between the bisector of $a_4$ and the transversal is $a_4 / 2$; the angle between the bisector of $a_5$ and the transversal (on the same side) is $a_5 / 2$.',
                'Now, the angle between the two bisectors is the sum of those two half-angles: $a_4/2 + a_5/2 = (a_4 + a_5)/2 = 180^\\circ/2 = 90^\\circ$.',
                'Verify at $a_4 = 125^\\circ$: then $a_5 = 55^\\circ$, and the half-angles are $62.5^\\circ$ and $27.5^\\circ$, summing to $62.5^\\circ + 27.5^\\circ = 90^\\circ$.',
                'Hence the bisectors of any co-interior pair are perpendicular \u2014 the co-interior supplement cuts exactly in half.',
              ],
              answer: 'Perpendicular: $a_4/2 + a_5/2 = 90^\\circ$ always; at $a_4 = 125^\\circ$: $62.5^\\circ + 27.5^\\circ = 90^\\circ$',
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_1 = (3x - 10)^\\circ$ and $a_6 = (2x + 25)^\\circ$, find $x$, $a_1$ and $a_6$. Why is this pair NOT solved by setting the expressions equal?',
              solution: [
                'Sol. Audit the family: $a_1$ is upper-left at $P$; $a_6$ is upper-right at $Q$ \u2014 different positions, one exterior and one interior, on opposite sides of $t$. This is one of the four unnamed CROSS pairs, not a corresponding pair.',
                'Find its verdict: $a_1 = a_5$ (corresponding) and $a_5 + a_6 = 180^\\circ$ (linear at $Q$), so $a_1 + a_6 = 180^\\circ$ \u2014 the cross pair SUPPLEMENTS.',
                'Set up the correct equation: $(3x - 10) + (2x + 25) = 180$, that is, $5x + 15 = 180$.',
                'Now, solve: $5x = 165$, so $x = 33$; then $a_1 = 3(33) - 10 = 89^\\circ$ and $a_6 = 2(33) + 25 = 91^\\circ$.',
                'Check: $89^\\circ + 91^\\circ = 180^\\circ$ \u2014 consistent; and the near-miss to $90^\\circ$ is no accident of algebra, just of the chosen coefficients.',
                'Hence $x = 33$, $a_1 = 89^\\circ$, $a_6 = 91^\\circ$. Setting the expressions equal would claim $a_1 = a_6$, which the census permits only when both are $90^\\circ$ \u2014 an equation the given expressions cannot satisfy.',
              ],
              answer: '$x = 33$, $a_1 = 89^\\circ$, $a_6 = 91^\\circ$ \u2014 the cross pair supplements ($a_1 + a_6 = 180^\\circ$); equality would force both to $90^\\circ$',
            },
            {
              q: 'Direction audit (exam-style). For each statement, say whether proving it spends the fifth postulate, and name the Euclid proposition: (i) parallel lines make a pair of co-interior angles supplementary; (ii) a transversal making co-interior angles supplementary forces the lines parallel; (iii) a transversal making alternate angles equal forces the lines parallel. Verify (ii) numerically at $a_4 = 103.5^\\circ$.',
              solution: [
                'Sol. (i) is the FORWARD direction \u2014 parallels given, angles concluded: this is I.29, and it is exactly where the fifth postulate first appears in the Elements.',
                '(ii) is the CONVERSE \u2014 angles given, parallels concluded: I.28, second clause, proved free of the fifth postulate.',
                '(iii) is also converse: I.27, the alternate-angle converse, likewise postulate-free.',
                'Verify (ii): $a_4 = 103.5^\\circ$ needs $a_5 = 180^\\circ - 103.5^\\circ = 76.5^\\circ$, and indeed $103.5^\\circ + 76.5^\\circ = 180^\\circ$ \u2014 the certificate applies.',
                'Hence only (i) spends the postulate (I.29); (ii) is I.28 and (iii) is I.27, both free \u2014 the forward direction pays, the converse does not.',
              ],
              answer: '(i) spends it \u2014 I.29; (ii) free \u2014 I.28 (verified: $103.5^\\circ + 76.5^\\circ = 180^\\circ$); (iii) free \u2014 I.27',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Reverse zigzag. Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel. The angle between the transversals at $B$ is $78^\\circ$, and one outer marked angle is $55^\\circ$. Find the other outer marked angle, and state the size of the angle vertically opposite the $78^\\circ$ one at $B$.',
              solution: [
                'Sol. Transport the known outer angle to $B$ (corresponding copy along its transversal, I.29) and let the other outer angle be $y$.',
                'Now, the straight line at $B$ carries the transported $55^\\circ$, the $78^\\circ$ gap, and the transported $y$: $55^\\circ + 78^\\circ + y = 180^\\circ$.',
                'So, $y = 180^\\circ - 55^\\circ - 78^\\circ = 47^\\circ$.',
                'The angle vertically opposite the $78^\\circ$ gap at $B$ is also $78^\\circ$ (vertically opposite angles); the angles on the other side of the middle line sum to $180^\\circ - 78^\\circ = 102^\\circ$.',
                'Hence the other outer angle is $47^\\circ$ and the vertical copy at $B$ is $78^\\circ$.',
              ],
              answer: 'Other outer angle $47^\\circ$; the vertically opposite angle at $B$ is $78^\\circ$ (other side of the line: $102^\\circ$)',
            },
            {
              q: 'Write out the reduction proof of the F from the Z: assuming ONLY the alternate-interior equality $a_3 = a_5$ and the vertex facts, prove that corresponding angles are equal ($a_1 = a_5$), and witness every step at $a_1 = 65^\\circ$.',
              solution: [
                'Sol. State the tool: vertically opposite angles at one vertex are equal (Lesson 2.1, no postulate).',
                'Apply it at $P$: $a_3 = a_1$, since they sit opposite each other through $P$.',
                'Now, chain with the hypothesis: $a_1 = a_3$ and $a_3 = a_5$ give $a_1 = a_5$ by transitivity \u2014 the corresponding pair is equal, which is I.28\u2019s first certificate.',
                'Witness at $65^\\circ$: the census gives $a_1 = 65^\\circ$, $a_3 = 65^\\circ$, $a_5 = 65^\\circ$ \u2014 the vertical step $a_1 = a_3$ and the given $a_3 = a_5$ both read 65, so $a_1 = a_5 = 65^\\circ$.',
                'Hence the F-certificate follows from the Z-equality plus one vertical step \u2014 route 1 of the reduction graph, postulate-free.',
              ],
              answer: '$a_1 = a_3$ (vertical at $P$) and $a_3 = a_5$ (given Z) give $a_1 = a_5 = 65^\\circ$ at the witness \u2014 the F from the Z',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'A student claims: \u201cif a transversal makes $a_1 = a_6$, then the two lines are parallel.\u201d Refute the claim with an explicit witness, and find the single exceptional value at which the claim accidentally holds.',
              solution: [
                'Sol. Analyse the pair: $(a_1, a_6)$ is a cross pair \u2014 opposite sides of $t$, one exterior, one interior \u2014 and no converse proposition licenses it.',
                'Build the witness: let $a_1 = a_6 = 50^\\circ$ \u2014 two angles, both $50^\\circ$, at the two vertices; nothing forbids this for NON-parallel lines.',
                'Compute the interior sums: $a_3 = a_1 = 50^\\circ$ (vertical at $P$) and $a_4 = a_5 = 130^\\circ$ (linear pairs), so the right-side interior sum is $a_3 + a_6 = 50^\\circ + 50^\\circ = 100^\\circ < 180^\\circ$.',
                'Now, apply the meeting criterion of Lesson 2.2: an interior sum strictly below $180^\\circ$ on a side forces the lines to MEET on that side \u2014 so these lines are not parallel, and the claim fails.',
                'Find the exception: $a_1 = a_6$ combined with the would-be parallel census $a_1 + a_6 = 180^\\circ$ forces $a_1 = a_6 = 90^\\circ$; at exactly $90^\\circ$ the cross pair is also alternate-interior-equal, and I.27 does give parallelism.',
                'Hence the claim is refuted at $a_1 = a_6 = 50^\\circ$ (interior sum $100^\\circ < 180^\\circ$: the lines meet); the only value at which it holds is $90^\\circ$.',
              ],
              answer: 'Refuted: at $a_1 = a_6 = 50^\\circ$ the interior sum $a_3 + a_6 = 100^\\circ < 180^\\circ$, so the lines meet; the claim holds only at the exceptional value $90^\\circ$',
            },
          ],
        },
      ],
    },
  ],
}
