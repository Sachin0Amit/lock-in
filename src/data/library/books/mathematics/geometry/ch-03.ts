import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 3 "Triangles: Congruence and the Craft of Proof"
 * (OPENED by the RUN 128 swarm with lesson 3.1; CLOSED COMPLETE by RUN 129,
 * 2026-11-27 — the maths lane, whole-chapter cadence, v9.2 protocol).
 *
 * The six seats: 3.1 'Congruence: the Idea of Same Shape and Size' (96/96,
 * run 128 — the only seat the run-128 swarm wall let land); 3.2 'The
 * Congruence Criteria: SAS, ASA, AAS, SSS, RHS' (100/100 — the run-129
 * continuation seat: engine banked green run 128, part written fresh);
 * 3.3 'Isosceles Triangles: the Classic Consequences' (113/113, first-wave
 * seat); 3.4 'Inequalities in a Triangle: Sides and Angles' (115/115,
 * first-wave seat); 3.5 'The Cevian Theorems: Ceva and Menelaus' (103/103 —
 * continuation seat finishing the half-banked part); 3.6 "Stewart's Theorem
 * and the Median Relation" (106/106 — continuation seat). The run-129 swarm
 * wall: the 6-up launch died at the transcript deadline with all six engines
 * and three parts on disk (staged seats + write-early-often made it count);
 * the continuation relaunch landed 302/305/306 green.
 *
 * PROVENANCE: ground = the run-128 reference-scan-first pass (v9.2
 * amendment 9): Cengage M1-05 'Properties and Solutions of Triangle'
 * (Drive library, vision-extracted), NCERT Class 7 ch.7 'Congruence of
 * Triangles' (text layer), the Euclid I.4/I.5/I.6/I.8/I.16/I.18/I.19/I.20
 * banked ground, and the Ceva/Menelaus/Stewart history via WebSearch+
 * WebFetch — every URL and page in docs/project/SOURCE_LOG.md under the
 * run-128 block. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch03.ts (which re-runs the
 * verify-first harnesses against THIS file and closes with the CLOSED
 * chapter census).
 */
/* ================================================================== */
/* lesson 3.1 — from docs/research/geo-ch03-wip/part-geo301.ts            */
/* ================================================================== */
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
  parts.push(geo31Txt(336, 368, '(8, 0)', 13, c31.orange, 'start'))
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

/* ================================================================== */
/* lesson 3.2 — from docs/research/geo-ch03-wip/part-geo302.ts            */
/* ================================================================== */
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
  parts.push(geo32Txt(322, 300, 'a = 5', 12, c32.amber))
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

/* ================================================================== */
/* lesson 3.3 — from docs/research/geo-ch03-wip/part-geo303.ts            */
/* ================================================================== */
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

/* ================================================================== */
/* lesson 3.4 — from docs/research/geo-ch03-wip/part-geo304.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c34 = {
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
const f34 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo34 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo34Txt = (
  x: number, y: number, s: string,
  size = 13, color = c34.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f34}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo34Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c34.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo34Dot = (x: number, y: number, color = c34.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo34Poly = (
  pts: Array<[number, number]>, fill: string, fillOp: number,
  stroke: string, w = 2.6, dash = '',
): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

/** arc on a circle (screen coords: angle 0 = east, increasing = clockwise on screen) */
const geo34Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

const geo34Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo34Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c34.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo34Line(x1, y1, x2, y2, color, w) + geo34Head(x2, y2, a, color, 8)
}

/** single tick mark across the middle of a segment (equal-length marker) */
const geo34Tick = (x1: number, y1: number, x2: number, y2: number, color = c34.red, len = 13, w = 2.4): string => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const L = Math.hypot(x2 - x1, y2 - y1)
  const nx = -(y2 - y1) / L, ny = (x2 - x1) / L
  return geo34Line(mx - (nx * len) / 2, my - (ny * len) / 2, mx + (nx * len) / 2, my + (ny * len) / 2, color, w)
}

const geo34Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ------------------------------------------------------------------ */
/* F1 — the collapse strip: the genuine 3-5-7 arch (3 + 5 = 8 > 7)     */
/* beside the degenerate 3 + 5 = 8 laid flat; the apex swings down the */
/* arc of radius CA about C and dies on the line exactly at c = 8.     */
/* ------------------------------------------------------------------ */
const geo34Collapse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE COLLAPSE: WHEN 3 + 5 = 8 THE TRIANGLE FLATTENS', 13, c34.ink, 'middle', '700'))
  const s = 30
  const y0 = 268
  // LEFT — the genuine witness: B(0,0), C(3,0), A(5.5, 4.330127) at scale s
  const B: [number, number] = [50, y0], C: [number, number] = [50 + 3 * s, y0]
  const A: [number, number] = [50 + 5.5 * s, y0 - 4.330127 * s]
  parts.push(geo34Poly([B, C, A], c34.green, 0.12, c34.green, 2.6))
  parts.push(geo34Dot(B[0], B[1], c34.ink, 4) + geo34Dot(C[0], C[1], c34.ink, 4) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 13, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(A[0] + 4, A[1] - 12, 'A', 13, c34.ink))
  parts.push(geo34Txt((B[0] + C[0]) / 2, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(228, 208, '5', 13, c34.amber))
  parts.push(geo34Txt(122, 206, '7', 13, c34.amber))
  parts.push(geo34Txt(160, 322, '3 + 5 = 8 > 7: THE ARCH HOLDS', 12.5, c34.tealInk))
  // RIGHT — the degenerate triple: B2, C2 same spacing, apex swung flat to D
  const B2: [number, number] = [340, y0], C2: [number, number] = [340 + 3 * s, y0], D: [number, number] = [340 + 8 * s, y0]
  const A2: [number, number] = [340 + 5.5 * s, y0 - 4.330127 * s] // the lifted (genuine) position of the apex
  // the swing arc: apex slides down the circle of radius CA about C2
  const a0 = Math.atan2(A2[1] - C2[1], A2[0] - C2[0])
  const a1 = Math.atan2(D[1] - C2[1], D[0] - C2[0])
  parts.push(geo34Arc(C2[0], C2[1], 5 * s, a0, a1, c34.red, 2, '6 5'))
  parts.push(geo34Poly([B2, C2, A2], c34.red, 0.05, c34.red, 1.6, '4 5'))
  parts.push(geo34Line(B2[0], y0, D[0], y0, c34.red, 3))
  parts.push(geo34Dot(B2[0], y0, c34.ink, 4) + geo34Dot(C2[0], y0, c34.ink, 4) + geo34Dot(D[0], y0, c34.red, 4.5))
  parts.push(geo34Txt(B2[0] - 13, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C2[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(D[0], y0 + 24, 'A flat', 12.5, c34.red))
  parts.push(geo34Txt((B2[0] + C2[0]) / 2, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt((C2[0] + D[0]) / 2, y0 + 34, '5', 13, c34.amber))
  parts.push(geo34Txt(460, 152, 'the apex swings down', 11.5, c34.tealInk))
  parts.push(geo34Txt(460, 168, 'the arc of radius 5', 11.5, c34.tealInk))
  parts.push(geo34Txt(460, 322, '3 + 5 = 8 = 8: FLAT, REFUSED', 12.5, c34.red))
  return geo34Svg(640, 344, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the hinge: compass arms of length 5 from one vertex O, the     */
/* common lower arm, openings 40 and 60, both third sides drawn.       */
/* ------------------------------------------------------------------ */
const geo34Hinge = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE HINGE: COMPASS ARMS OF LENGTH 5', 13, c34.ink, 'middle', '700'))
  parts.push(geo34Txt(320, 46, 'the wider the opening, the farther the tips', 12, c34.tealInk))
  const O: [number, number] = [130, 300]
  const R = 170
  const P1: [number, number] = [O[0] + R, O[1]]
  const rad = (d: number): number => (d * Math.PI) / 180
  const arm = (deg: number): [number, number] => [O[0] + R * Math.cos(rad(deg)), O[1] - R * Math.sin(rad(deg))]
  const T40 = arm(40), T60 = arm(60)
  // common lower arm + the two upper arms
  parts.push(geo34Line(O[0], O[1], P1[0], P1[1], c34.green, 2.8))
  parts.push(geo34Line(O[0], O[1], T40[0], T40[1], c34.amber, 2.6))
  parts.push(geo34Line(O[0], O[1], T60[0], T60[1], c34.orange, 2.8))
  // third sides: 10 sin 20 (dashed amber) and 10 sin 30 (orange)
  parts.push(geo34Line(T40[0], T40[1], P1[0], P1[1], c34.amber, 2.6, '7 5'))
  parts.push(geo34Line(T60[0], T60[1], P1[0], P1[1], c34.orange, 3))
  // the two opening arcs at O
  parts.push(geo34Arc(O[0], O[1], 48, 0, rad(-40), c34.amber, 2.4))
  parts.push(geo34Arc(O[0], O[1], 68, 0, rad(-60), c34.orange, 2.6))
  // dots + vertex label
  parts.push(geo34Dot(O[0], O[1], c34.ink, 4.5) + geo34Dot(P1[0], P1[1], c34.ink, 4) + geo34Dot(T40[0], T40[1], c34.amber, 4) + geo34Dot(T60[0], T60[1], c34.orange, 4))
  parts.push(geo34Txt(O[0] - 14, O[1] + 6, 'O', 13, c34.ink))
  parts.push(geo34Txt(P1[0] + 12, P1[1] + 6, 'T', 13, c34.ink))
  // labels: arm lengths, openings, third-side values
  parts.push(geo34Txt(208, 322, '5', 13, c34.mid))
  parts.push(geo34Txt(206, 246, '5', 13, c34.mid))
  parts.push(geo34Txt(146, 226, '5', 13, c34.mid))
  parts.push(geo34Txt(186, 281, '40°', 12.5, c34.amber, 'end'))
  parts.push(geo34Txt(204, 254, '60°', 12.5, c34.orange, 'start'))
  parts.push(geo34Txt(316, 252, '≈ 3.42', 12.5, c34.amber, 'start'))
  parts.push(geo34Txt(244, 214, '= 5', 12.5, c34.orange, 'end'))
  parts.push(geo34Txt(320, 331, 'THIRD SIDES: 10 sin 20° ≈ 3.42 (DASHED) AND 10 sin 30° = 5', 12, c34.ink))
  return geo34Svg(640, 344, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F3 — the exterior angle at C on the 3-5-7 witness: extension of BC  */
/* beyond C, the 60° exterior arc, remotes 21.79° and 38.21°, the      */
/* sum-vs-each annotation.                                             */
/* ------------------------------------------------------------------ */
const geo34Exterior = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'THE EXTERIOR ANGLE AT C ON THE 3, 5, 7 WITNESS', 13, c34.ink, 'middle', '700'))
  const s = 40
  const y0 = 300
  const B: [number, number] = [70, y0], C: [number, number] = [70 + 3 * s, y0]
  const A: [number, number] = [70 + 5.5 * s, y0 - 4.330127 * s]
  const X: [number, number] = [C[0] + 150, y0] // the extension ray
  // triangle + extension
  parts.push(geo34Poly([B, C, A], c34.green, 0.1, c34.green, 2.6))
  parts.push(geo34Arrow(C[0], y0, X[0], y0, c34.teal, 2.4))
  parts.push(geo34Dot(B[0], y0, c34.ink, 4) + geo34Dot(C[0], y0, c34.ink, 4) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 14, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(A[0] + 12, A[1] - 6, 'A', 13, c34.ink))
  parts.push(geo34Txt(130, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(252, 222, '5', 13, c34.amber))
  parts.push(geo34Txt(160, 210, '7', 13, c34.amber))
  parts.push(geo34Txt(300, 288, 'extension of BC', 11.5, c34.tealInk))
  // interior angle at C = 120 (arc from direction pi to direction 5 pi / 3)
  const dCA = Math.atan2(A[1] - C[1], A[0] - C[0]) // direction of ray C->A
  parts.push(geo34Arc(C[0], C[1], 30, Math.PI, dCA + 2 * Math.PI, c34.mid, 2))
  parts.push(geo34Txt(163, 252, '120°', 12, c34.mid))
  // exterior angle at C = 60 (arc from ray C->A to the eastward extension)
  parts.push(geo34Arc(C[0], C[1], 48, dCA + 2 * Math.PI, 2 * Math.PI, c34.orange, 3))
  parts.push(geo34Txt(248, 270, '60°', 13.5, c34.orange))
  // remote interior angles: 21.79 at A, 38.21 at B
  const dAB = Math.atan2(B[1] - A[1], B[0] - A[0]) // ray A->B
  const dAC = Math.atan2(C[1] - A[1], C[0] - A[0]) // ray A->C
  parts.push(geo34Arc(A[0], A[1], 42, dAC, dAB, c34.tealInk, 2.2))
  parts.push(geo34Txt(256, 166, '21.79°', 12, c34.tealInk))
  const dBA = Math.atan2(A[1] - B[1], A[0] - B[0]) // ray B->A
  parts.push(geo34Arc(B[0], B[1], 46, dBA, 0, c34.tealInk, 2.2))
  parts.push(geo34Txt(122, 286, '38.21°', 12, c34.tealInk))
  // the sum-vs-each annotation (the exam-gold distinction)
  parts.push(geo34Txt(486, 120, 'exterior at C = 60°', 12.5, c34.ink))
  parts.push(geo34Txt(486, 142, '60 = 21.79 + 38.21 (angle sum)', 12, c34.mid))
  parts.push(geo34Txt(486, 164, '60 > 21.79 and 60 > 38.21', 12, c34.orange))
  parts.push(geo34Txt(486, 186, 'each remote separately (I.16)', 12, c34.orange))
  return geo34Svg(640, 352, aria, parts)
}

/* ------------------------------------------------------------------ */
/* F4 — Euclid's I.20 chain on the witness: extend BC beyond C to D    */
/* with CD = CA (isosceles detour; equilateral on this witness).       */
/* ------------------------------------------------------------------ */
const geo34I20 = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(320, 24, 'EUCLID\u2019S I.20 CHAIN: THE ISOSCELES DETOUR', 13, c34.ink, 'middle', '700'))
  parts.push(geo34Txt(320, 46, 'I.19 on triangle ABD: BD = 8 > BA = 7, so BA < BC + CA', 12, c34.tealInk))
  const s = 40
  const y0 = 296
  const B: [number, number] = [50, y0], C: [number, number] = [50 + 3 * s, y0], D: [number, number] = [50 + 8 * s, y0]
  const A: [number, number] = [50 + 5.5 * s, y0 - 4.330127 * s]
  // the extended base + the two triangles
  parts.push(geo34Line(B[0], y0, D[0], y0, c34.ink, 2.6))
  parts.push(geo34Poly([B, C, A], c34.green, 0.12, c34.green, 2.6))
  parts.push(geo34Poly([C, D, A], c34.panel, 0.55, c34.amber, 2.4, '7 5'))
  parts.push(geo34Dot(B[0], y0, c34.ink, 4) + geo34Dot(C[0], y0, c34.ink, 4) + geo34Dot(D[0], y0, c34.red, 4.5) + geo34Dot(A[0], A[1], c34.ink, 4))
  parts.push(geo34Txt(B[0] - 14, y0 + 18, 'B', 13, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 18, 'C', 13, c34.ink))
  parts.push(geo34Txt(D[0] + 13, y0 + 6, 'D', 13, c34.red))
  parts.push(geo34Txt(A[0] - 14, A[1] - 8, 'A', 13, c34.ink))
  // side values + the equal-length ticks on CA and CD
  parts.push(geo34Txt(110, y0 + 34, '3', 13, c34.amber))
  parts.push(geo34Txt(214, 208, '5', 13, c34.amber))
  parts.push(geo34Txt(142, 208, '7', 13, c34.amber))
  parts.push(geo34Txt(270, y0 + 34, '5', 13, c34.amber))
  parts.push(geo34Txt(334, 210, '5', 13, c34.amber))
  parts.push(geo34Tick(C[0], y0, A[0], A[1], c34.red))
  parts.push(geo34Tick(C[0], y0, D[0], y0, c34.red))
  // angle marks: 60 at D, 60 (CAD) and 81.79 (BAD) and 21.79 (BAC) at A
  const dDA = Math.atan2(A[1] - D[1], A[0] - D[0])
  parts.push(geo34Arc(D[0], D[1], 40, Math.PI, dDA + 2 * Math.PI, c34.amber, 2.4))
  parts.push(geo34Txt(334, 278, '60°', 12.5, c34.amber))
  const dAB = Math.atan2(B[1] - A[1], B[0] - A[0])
  const dAC = Math.atan2(C[1] - A[1], C[0] - A[0])
  const dAD = Math.atan2(D[1] - A[1], D[0] - A[0])
  parts.push(geo34Arc(A[0], A[1], 34, dAD, dAC, c34.amber, 2.4))
  parts.push(geo34Txt(A[0], A[1] + 46, '60°', 12.5, c34.amber))
  parts.push(geo34Arc(A[0], A[1], 66, dAD, dAB, c34.orange, 2.6))
  parts.push(geo34Txt(A[0] - 18, A[1] + 76, '81.79°', 12.5, c34.orange))
  parts.push(geo34Arc(A[0], A[1], 88, dAC, dAB, c34.tealInk, 2))
  parts.push(geo34Txt(A[0] + 34, A[1] - 26, '21.79°', 12, c34.tealInk))
  // the BD verdict line under the base
  parts.push(geo34Line(B[0], y0 + 46, D[0], y0 + 46, c34.faint, 1.4, '4 4'))
  parts.push(geo34Txt(210, y0 + 66, 'BD = BC + CD = 3 + 5 = 8', 12.5, c34.red))
  return geo34Svg(640, 376, aria, parts)
}

/* ------------------------------------------------------------------ */
/* solution mini-figures — the named trio: the collapse, the hinge     */
/* swing, the detour path                                              */
/* ------------------------------------------------------------------ */
const geo34SolCollapse = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE COLLAPSE 3 + 5 = 8', 13, c34.ink, 'middle', '700'))
  const s = 22
  const y0 = 150
  const B: [number, number] = [30, y0], C: [number, number] = [30 + 3 * s, y0], D: [number, number] = [30 + 8 * s, y0]
  const A: [number, number] = [30 + 5.5 * s, y0 - 4.330127 * s] // the genuine (c = 7) apex position
  const a0 = Math.atan2(A[1] - C[1], A[0] - C[0])
  const a1 = Math.atan2(D[1] - C[1], D[0] - C[0])
  parts.push(geo34Arc(C[0], C[1], 5 * s, a0, a1, c34.red, 2, '5 4'))
  parts.push(geo34Poly([B, C, A], c34.red, 0.06, c34.red, 1.6, '4 4'))
  parts.push(geo34Line(B[0], y0, D[0], y0, c34.red, 2.8))
  parts.push(geo34Dot(B[0], y0, c34.ink, 3.5) + geo34Dot(C[0], y0, c34.ink, 3.5) + geo34Dot(D[0], y0, c34.red, 4))
  parts.push(geo34Txt(B[0] - 11, y0 + 16, 'B', 12, c34.ink))
  parts.push(geo34Txt(C[0], y0 + 16, 'C', 12, c34.ink))
  parts.push(geo34Txt(D[0] + 10, y0 + 4, 'A flat', 11.5, c34.red, 'start'))
  parts.push(geo34Txt((B[0] + C[0]) / 2, y0 + 32, '3', 12, c34.amber))
  parts.push(geo34Txt((C[0] + D[0]) / 2, y0 + 32, '5', 12, c34.amber))
  parts.push(geo34Txt(210, 196, 'the two shorter sides end to end exactly reach 8:', 11.5, c34.tealInk))
  parts.push(geo34Txt(210, 212, 'area 0, three collinear points — REFUSED', 12, c34.red))
  return geo34Svg(420, 224, aria, parts)
}

const geo34SolHinge = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE HINGE SWING: 40° VERSUS 60°', 13, c34.ink, 'middle', '700'))
  const O: [number, number] = [70, 178]
  const R = 110
  const rad = (d: number): number => (d * Math.PI) / 180
  const P1: [number, number] = [O[0] + R, O[1]]
  const T40: [number, number] = [O[0] + R * Math.cos(rad(40)), O[1] - R * Math.sin(rad(40))]
  const T60: [number, number] = [O[0] + R * Math.cos(rad(60)), O[1] - R * Math.sin(rad(60))]
  parts.push(geo34Line(O[0], O[1], P1[0], P1[1], c34.green, 2.4))
  parts.push(geo34Line(O[0], O[1], T40[0], T40[1], c34.amber, 2.2))
  parts.push(geo34Line(O[0], O[1], T60[0], T60[1], c34.orange, 2.4))
  parts.push(geo34Line(T40[0], T40[1], P1[0], P1[1], c34.amber, 2.2, '6 4'))
  parts.push(geo34Line(T60[0], T60[1], P1[0], P1[1], c34.orange, 2.6))
  parts.push(geo34Arc(O[0], O[1], 32, 0, rad(-40), c34.amber, 2))
  parts.push(geo34Arc(O[0], O[1], 46, 0, rad(-60), c34.orange, 2.2))
  parts.push(geo34Dot(O[0], O[1], c34.ink, 3.5) + geo34Dot(P1[0], P1[1], c34.ink, 3.5) + geo34Dot(T40[0], T40[1], c34.amber, 3.5) + geo34Dot(T60[0], T60[1], c34.orange, 3.5))
  parts.push(geo34Txt(O[0] - 12, O[1] + 5, 'O', 12, c34.ink))
  parts.push(geo34Txt(137, 196, '5', 12, c34.mid))
  parts.push(geo34Txt(136, 148, '5', 12, c34.mid))
  parts.push(geo34Txt(104, 136, '5', 12, c34.mid))
  parts.push(geo34Txt(128, 170, '40°', 11.5, c34.amber, 'end'))
  parts.push(geo34Txt(122, 150, '60°', 11.5, c34.orange, 'end'))
  parts.push(geo34Txt(212, 160, '≈ 3.42', 12, c34.amber, 'start'))
  parts.push(geo34Txt(172, 122, '= 5', 12, c34.orange, 'end'))
  parts.push(geo34Txt(210, 218, 'arms 5 and 5: 10 sin 20° ≈ 3.42 < 10 sin 30° = 5', 11.5, c34.tealInk))
  return geo34Svg(420, 230, aria, parts)
}

const geo34SolDetour = (aria: string): string => {
  const parts: string[] = []
  parts.push(geo34Txt(210, 22, 'THE DETOUR VERSUS THE STRAIGHT PATH', 13, c34.ink, 'middle', '700'))
  const s = 26
  const P: [number, number] = [50, 190], R: [number, number] = [50 + 3 * s, 190 - 4 * s], Q: [number, number] = [50 + 8 * s, 190 - 4 * s]
  // the broken path P -> R -> Q (refused length) and the straight segment
  parts.push(geo34Arrow(P[0], P[1], R[0], R[1], c34.red, 2.2))
  parts.push(geo34Arrow(R[0], R[1], Q[0], Q[1], c34.red, 2.2))
  parts.push(geo34Line(P[0], P[1], Q[0], Q[1], c34.green, 3))
  parts.push(geo34Dot(P[0], P[1], c34.ink, 4) + geo34Dot(R[0], R[1], c34.red, 4) + geo34Dot(Q[0], Q[1], c34.ink, 4))
  parts.push(geo34Txt(P[0] - 14, P[1] + 5, 'P', 12.5, c34.ink))
  parts.push(geo34Txt(R[0], R[1] - 12, 'R', 12.5, c34.red))
  parts.push(geo34Txt(Q[0] + 14, Q[1] + 5, 'Q', 12.5, c34.ink))
  parts.push(geo34Txt(70, 122, '5', 12.5, c34.red))
  parts.push(geo34Txt(180, 100, '5', 12.5, c34.red))
  parts.push(geo34Txt(150, 186, 'straight: 4√5 ≈ 8.94', 12, c34.green))
  parts.push(geo34Txt(210, 218, 'broken path 5 + 5 = 10 > 8.94: the straight route wins', 11.5, c34.tealInk))
  return geo34Svg(420, 232, aria, parts)
}

/* ================================================================== */
/* LESSON 3.4 — Inequalities in a Triangle: Sides and Angles           */
/* ================================================================== */
export const lessonGeo304: Lesson = {
  id: 'geo-inequalities-in-a-triangle-sides-and-angles',
  number: '3.4',
  title: 'Inequalities in a Triangle: Sides and Angles',
  concepts: [
    'triangle inequality',
    'degenerate triangle',
    'exterior angle inequality',
    'larger side larger angle',
    'larger angle larger side',
    'hinge theorem',
    'converse of the hinge',
  ],
  objectives: [
    'State the triangle inequality (Euclid I.20) and use it as an existence screen on triples of lengths, refusing the short and the degenerate cases with named reasons',
    'Convert the three pair-sum inequalities into the bound $|b - c| < a < b + c$ and apply it as an instant eliminator on multiple-choice items',
    'State the exterior angle inequality (Euclid I.16) and distinguish its strict verdict on EACH remote interior angle from the equality with their SUM',
    'Use the ordering theorems I.18 and I.19 in both directions to pair the longest side with the largest angle without any computation',
    'State and apply the hinge theorem and its converse to compare third sides of triangles with two pairwise equal sides',
  ],
  prerequisites: [
    'geo-congruence-the-idea-of-same-shape-and-size',
    'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
    'geo-isosceles-triangles-the-classic-consequences',
  ],
  sources: ['geo-euclid-elements', 'cengage-m1-05', 'geo-ch03-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'From equalities to inequalities: the shadow of the craft' },
    {
      kind: 'para',
      text: 'Lessons 3.2 and 3.3 were equality theorems. The five congruence criteria certify that two triangles match exactly; pons asinorum certifies that two angles of one triangle match exactly. Beautiful — and dangerously incomplete, because the triangles of the real world are rarely asked whether they match. They are asked whether they CAN EXIST. Will three struts of lengths $3$, $5$ and $8$ close into a bridge truss? No: laid end to end the two shorter ones exactly span the third, and the frame collapses flat onto the ground. Will a fence of length $10$ reach from one post to another if it must bend round a depot? No: the bend makes it longer than the straight route it competes with, and it sags or falls short. Both failures are INEQUALITY failures — the mathematics of what is bigger than what — and this lesson is the chapter\u2019s dedicated study of that shadow side.',
    },
    {
      kind: 'para',
      text: 'The questions we shall answer are exactly the three a designer asks. FIRST, the existence question: which triples of lengths close into a triangle at all? The answer is the triangle inequality, Euclid\u2019s Proposition I.20 — in his own words, in any triangle two sides taken together in any manner are greater than the remaining one. SECOND, the ordering question: in a triangle that does exist, which side is longest and which angle is largest, and how are those two questions related? The answer is the ordering pair, I.18 and I.19 — the greater side subtends the greater angle, and conversely. THIRD, the comparison question: two triangles built on equal pairs of sides — which one has the longer third side? The answer is the hinge theorem and its converse. Between the existence law and the ordering laws sits one more gem, Euclid I.16: the exterior angle of a triangle exceeds each remote interior angle, a fact Euclid proves WITHOUT the parallel postulate and which powers the proofs of both ordering theorems.',
    },
    {
      kind: 'para',
      text: 'The discipline of the lesson is the chapter\u2019s discipline: the engine first, prose second. Every number you will read here — the $125$ genuine triples out of $220$ candidates in the existence census, the angles $21.786789°$, $38.213211°$ and $120°$ of the pinned $3$-$5$-$7$ witness, the hinge lengths $3.420201$ and $5$ on arms of length $5$ — has been recomputed by brute force before a word of this text was fixed. The witness triangle is announced now and used throughout: sides $a = 3$, $b = 5$, $c = 7$ under the chapter notation law, so that every theorem can be SEEN acting on one set of numbers, and every figure in the lesson draws that same triangle.',
    },
    {
      kind: 'para',
      text: 'A last word on why this material is exam gold rather than mere caution. Inequality facts are the fastest eliminations in the entire subject: a multiple-choice option proposing a third side of $14$ for a triangle already holding sides $4$ and $9$ is dead on arrival ($4 + 9 = 13 < 14$), killed in one line with no drawing at all. The inequality theory is where wrong designs collapse before anyone builds them — and the craft of citing I.16, I.18, I.19 and I.20 by content, not by number, is what turns a lucky guess into a proof.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the triangle inequality I.20 + the degenerate case + census  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The triangle inequality: the existence law (Euclid I.20)' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.20 — the triangle inequality',
      text: 'In any triangle, each side is strictly less than the sum of the other two. Under the chapter notation ($a = BC$ opposite $A$, $b = CA$ opposite $B$, $c = AB$ opposite $C$) the law reads: $a < b + c$, $b < c + a$ and $c < a + b$. Equivalently — and this is the form the existence screen uses — three lengths can close into a triangle exactly when the longest of them is less than the sum of the other two.',
    },
    {
      kind: 'para',
      text: 'The equivalence in the last sentence deserves one honest line of proof, because it halves the work of every application. Order the lengths so that $a \le b \le c$. Then the two inequalities not mentioning the longest side are automatic: $a + c \ge b + 1 > b$ and $b + c > a$ hold for any positive lengths with $c$ largest. So of the three pair-sum demands, only $a + b > c$ can ever fail — the screen may consult the longest side alone. The engine verifies this single-screen law across the entire census of the lesson: for every one of the $220$ ordered triples with $1 \le a \le b \le c \le 10$, the three-inequality verdict and the one-inequality verdict agree exactly.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.20 — the triangle inequality, the existence law',
      statement: 'We prove the representative inequality $BA < BC + CA$; the other two follow by relabelling the vertices. Euclid\u2019s proof plants an isosceles detour on the extended base and lets the ordering theorem I.19 pull the conclusion out of an angle comparison.',
      steps: [
        {
          label: 'Set up the extension',
          formula: 'D \\text{ beyond } C \\text{ on line } BC,\\quad CD = CA',
          explanation: 'Produce the side $BC$ past $C$ and mark the point $D$ on the extension with $CD = CA$ (Euclid builds it with his Proposition I.3). A new triangle $ACD$ appears alongside the original — isosceles by construction, and this detour triangle is the engine of the proof.',
        },
        {
          label: 'The isosceles detour',
          formula: '\\angle CAD = \\angle ADC',
          explanation: 'Since $CA = CD$, pons asinorum (Lesson 3.3, Euclid I.5) gives the base angles of triangle $ACD$ equal: the angle $CAD$ at $A$ equals the angle $ADC$ at $D$.',
        },
        {
          label: 'The split at A',
          formula: '\\angle BAD = \\angle BAC + \\angle CAD',
          explanation: 'The point $C$ sits between $B$ and $D$ on the line, so the ray $AC$ lies inside the angle $BAD$, and the whole angle is the sum of its two parts. The whole is greater than the part — Euclid\u2019s Common Notion 5, one of his axioms.',
        },
        {
          label: 'The angle comparison',
          formula: '\\angle BAD > \\angle ADC = \\angle ADB',
          explanation: 'Chaining the last two steps: $\\angle BAD > \\angle CAD = \\angle ADC$. And the angle $ADC$ is the very same angle as $ADB$, because $B$ and $C$ lie on the same side of $D$ — the rays $DB$ and $DC$ coincide.',
        },
        {
          label: 'I.19 on triangle ABD',
          formula: '\\angle BAD > \\angle ADB \\;\\Rightarrow\\; BD > BA',
          explanation: 'In triangle $ABD$ the angle at $A$ beats the angle at $D$, so by I.19 — the greater angle is subtended by the greater side, proved in this lesson from I.18 — the side facing the greater angle is greater: $BD > BA$.',
        },
        {
          label: 'Substitute the extension',
          formula: 'BD = BC + CD = BC + CA > BA',
          explanation: 'But $D$ was built beyond $C$ on the line, so $BD = BC + CD = BC + CA$. Combining: $BA < BC + CA$, which is the law for the side $BA$; relabelling gives all three sides.',
        },
      ],
      result: 'Each side of a triangle is strictly less than the sum of the other two: $a < b + c$, $b < c + a$, $c < a + b$. On the $3$-$5$-$7$ witness the engine certifies every link of the chain: $CD = CA = 5$, the base angles $\\angle ADC = \\angle CAD = 60°$, $\\angle BAD = 81.786789° > 60°$, and $BD = 8 > BA = 7$.',
    },
    {
      kind: 'figure',
      caption: 'Euclid\u2019s I.20 chain drawn on the witness: the base BC of the 3, 5, 7 triangle is extended beyond C to D with CD = CA = 5 (the ticks mark the equal pair), planting the isosceles detour triangle ACD — which on this witness happens to be equilateral, since the exterior angle at C is exactly 60°. The angle BAD = 81.79° beats the angle ADB = 60°, I.19 hands down BD > BA, and BD = BC + CD = 3 + 5 = 8 beats BA = 7.',
      svg: geo34I20('The 3-5-7 triangle with its base extended beyond C to a point D with CD equal to CA, forming an isosceles detour triangle; the angles 60, 81.79 and 21.79 degrees are marked and the verdict BD = 8 > BA = 7 is annotated.'),
    },
    {
      kind: 'para',
      text: 'Notice what the proof did NOT do: it never measured anything. The extension created a flat rival $BD$ for the side $BA$ — a rival assembled from exactly the pieces $BC$ and $CA$ whose sum we want — and then the ordering theorem certified the rival LONGER. On the witness the flat rival is the segment of length $8$, and the comparison $7 < 8$ is the triangle inequality made visible. The equilateral detour on this witness is a coincidence worth naming as one: the proof needs only $CA = CD$, and it is the accident of the exterior angle at $C$ being exactly $60°$ that promotes the isosceles detour to an equilateral one.',
    },
    {
      kind: 'para',
      text: 'The inequality is STRICT, and the strictness is not pedantry — it is the boundary between geometry and its collapse. Suppose the three lengths satisfy $a + b = c$ with $a \le b \le c$. Place the sides of lengths $a$ and $b$ end to end along a line and they exactly span the length $c$: the would-be vertex $A$ lands ON the line $BC$, the three points are collinear, and the region enclosed is empty. The engine watches this collapse happen numerically on the witness family: hold $a = 3$ and $b = 5$ fixed and let the third side grow $c = 7$, $7.5$, $7.9$, $8$ — the apex slides down its arc of radius $5$ about $C$, its height above the line dying through $4.330127$, $3.353843$, $1.606168$ to exactly $0$. At $c = 8$ the area is $0$ and no triangle exists; for every $c$ strictly between $|5 - 3| = 2$ and $8$ the apex lifts off and the triangle is genuine.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Degenerate triangle',
      text: 'A triple of lengths with $a + b = c$ (the two shorter summing exactly to the longest) is said to be degenerate: the three points it pins are forced into collineity, the enclosed area is $0$, and the figure is a SEGMENT walked twice, not a triangle. Thus, a genuine triangle requires $a + b > c$ strictly — the existence screen refuses the equality as firmly as it refuses the shortfall.',
    },
    {
      kind: 'figure',
      caption: 'The collapse, side by side with the genuine arch. Left: the 3, 5, 7 triangle — the two shorter sides sum to 8, which strictly beats the third side 7, and the apex A holds its height of about 4.33 above the base. Right: the same sides 3 and 5 with the third stretched to 8 — the apex swings down the dashed arc of radius 5 about C and lands exactly on the line at the point marked A flat; the region enclosed dies to zero and the existence screen refuses the triple.',
      svg: geo34Collapse('Two panels: on the left the genuine 3-5-7 triangle with apex lifted; on the right the degenerate 3-plus-5-equals-8 triple drawn flat on the line, with a dashed arc showing the apex swinging down to the line.'),
    },
    {
      kind: 'para',
      text: 'How generous is the existence law? The engine answers with a census. Take every ordered triple $1 \le a \le b \le c \le 10$ — there are $220$ of these candidates — and run the screen $a + b > c$ on each. Exactly $125$ pass: those, and only those, are the integer triangles with sides up to $10$. The other $95$ fail, every one of them through the longest side ($a + b \le c$; the single-screen law guarantees no other failure mode exists). The table below is the census by longest side, and its last column carries a compact surprise: the count of genuine triples with longest side $c$ is exactly $\\frac{(c+1)^2}{4}$ rounded down — the closed form $\\lfloor (c+1)^2/4 \\rfloor$ — which the engine verifies column by column.',
    },
    {
      kind: 'table',
      caption: 'The existence census on ordered triples 1 <= a <= b <= c <= 10 — 220 candidates, 125 genuine by the screen a + b > c, 95 refused',
      head: ['Longest side c', 'Pairs (a, b) tested', 'Genuine (a + b > c)', 'Refused (a + b ≤ c)', 'Closed form'],
      rows: [
        ['1', '1', '1', '0', 'floor(4/4) = 1'],
        ['2', '3', '2', '1', 'floor(9/4) = 2'],
        ['3', '6', '4', '2', 'floor(16/4) = 4'],
        ['4', '10', '6', '4', 'floor(25/4) = 6'],
        ['5', '15', '9', '6', 'floor(36/4) = 9'],
        ['6', '21', '12', '9', 'floor(49/4) = 12'],
        ['7', '28', '16', '12', 'floor(64/4) = 16'],
        ['8', '36', '20', '16', 'floor(81/4) = 20'],
        ['9', '45', '25', '20', 'floor(100/4) = 25'],
        ['10', '55', '30', '25', 'floor(121/4) = 30'],
        ['Total', '220', '125', '95', '—'],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Reading the census',
      text: 'Two patterns earn a pause. FIRST, the growth: with longest side $c$ fixed, the surviving pairs $(a, b)$ number $\\lfloor (c+1)^2/4 \\rfloor$ — roughly a QUARTER of the $c(c+1)/2$ candidates — so existence is not a rare accident but the typical fate of a triple. SECOND, the shifted column: the refusal count for longest side $c$ equals the genuine count for longest side $c - 1$ (read the table: $1, 2, 4, 6, 9, 12, 16, 20, 25$ march one row down in both columns). The engine confirms this count identity for every $c$ from $2$ to $10$; the reason is the complement structure of the screen — the pairs refused at level $c$ pair up, length for length, with the pairs that survive at level $c - 1$.',
    },
    {
      kind: 'equation',
      latex: '|b - c| < a < b + c',
      note: 'the bound form of the triangle inequality for a side $a$ against the other two sides $b$ and $c$ — derived in Exercise 10 from the three pair-sum inequalities; the ends are EXCLUDED, with equality meaning degeneracy.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution: the ends are excluded',
      text: 'The commonest examination error on this material writes the third-side bound with weak inequalities: for sides $4$ and $9$, the answer $5 \\le x \\le 13$ is WRONG at both ends. At $x = 13$ the sides $4$, $9$, $13$ satisfy $4 + 9 = 13$ — degenerate, flat, refused; at $x = 5$ likewise $9 - 4 = 5$ puts the longest side exactly at the difference, again flat. The correct screen is $5 < x < 13$, both ends strict. Whenever a multiple-choice option shows a closed bracket on a third-side range, kill it without further computation.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the exterior angle inequality I.16                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The exterior angle inequality (Euclid I.16), proved fifth-free' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.16 — the exterior angle inequality',
      text: 'Extend one side of a triangle, say $BC$ beyond $C$. The exterior angle this creates at $C$ — the supplement of the interior angle $C$ — is greater than EACH of the two remote interior angles, the angles at the other two vertices, one at a time. In symbols: with the exterior angle at $C$ called $\\theta$, we have $\\theta > A$ AND $\\theta > B$, separately and strictly.',
    },
    {
      kind: 'para',
      text: 'The theorem has a famous pedigree of logical economy: Euclid proves it in Book I BEFORE the parallel postulate is ever spent — it is fifth-free, part of the neutral geometry that would survive even in a world of curved space. Chapter 2 banked this fact\u2019s direction when it built the transversal theory, and the proof idea belongs to the same family as the one Euclid uses: slide a midpoint construction across the triangle and compare. What the present lesson needs from I.16 is its ROLE in the hierarchy: it is the engine that drives I.18, which drives I.19, which drives I.20. Every inequality in this lesson ultimately leans on the exterior angle beating the remotes.',
    },
    {
      kind: 'figure',
      caption: 'The exterior angle at C on the witness. The base BC of the 3, 5, 7 triangle is extended beyond C (teal arrow); the exterior angle between that extension and the side CA is 60°, while the remote interior angles measure 21.79° at A and 38.21° at B. The annotation carries the exam-gold distinction in full: 60 = 21.79 + 38.21 exactly (the angle-sum arithmetic), while 60 > 21.79 and 60 > 38.21 each separately (the I.16 verdict).',
      svg: geo34Exterior('The 3-5-7 triangle with the base extended beyond C, the 60-degree exterior angle marked in orange between the extension and side CA, the remote interior angles 21.79 and 38.21 degrees marked, and the sum-versus-each annotation at the right.'),
    },
    {
      kind: 'para',
      text: 'On the witness the two facts sit side by side, and the distinction between them is worth reading twice. The exterior angle at $C$ is $180° - 120° = 60°$. The remote interiors are $A = 21.786789°$ and $B = 38.213211°$, and their sum is $A + B = 60°$ EXACTLY — because the three interiors sum to $180°$, the exterior, being the supplement of $C$, must equal what the other two interiors add to. So the exterior EQUALS the sum of the remotes. But that equality is the ANGLE-SUM THEOREM\u2019s statement, not I.16\u2019s. Proposition I.16 says something logically cheaper and deeper at once: $60 > 21.786789$ and $60 > 38.213211$, each remote beaten SEPARATELY, strictly — and Euclid proves that without spending the parallel postulate, centuries before anyone could assert the angle sum of a triangle with proof. When an examination asks which proposition gives \u201cthe exterior angle exceeds either remote interior angle\u201d, the licensed citation is I.16 by content, not the angle-sum theorem.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why fifth-free matters',
      text: 'Euclid\u2019s Book I is a tower of dependencies, and the inequality block I.16 through I.20 stands entirely on the neutral floors: common notions, the isosceles machinery of I.5, and the congruence criteria of I.4 and I.8. The parallel postulate is not spent until I.29. This is not trivia — it is the observation that makes non-Euclidean geometry possible: in spherical or hyperbolic worlds the angle sum of a triangle departs from $180°$, the exterior no longer EQUALS the sum of the remotes, and yet I.16 and the entire inequality block SURVIVE. A theorem proved fifth-free is a theorem you can take to any world.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the ordering theorems I.18 and I.19 + the witness fully read */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The ordering theorems: I.18 and I.19, the interlocking pair' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.18 — the greater side subtends the greater angle',
      text: 'In any triangle, the longer of two sides faces the larger angle: $a > b$ implies $A > B$ (with $A$ the angle opposite $a$, per the notation law). Read operationally: the largest angle of a triangle is opposite the longest side, and the shortest side has the smallest angle against it.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.18 — the greater side subtends the greater angle',
      statement: 'We prove the representative case: if $BC > CA$ in triangle $ABC$, then $\\angle BAC > \\angle ABC$. The proof plants the isosceles detour INSIDE the triangle this time, and lets the exterior angle inequality I.16 do the pulling.',
      steps: [
        {
          label: 'Cut the greater side down',
          formula: 'D \\text{ between } B \\text{ and } C,\\quad CD = CA',
          explanation: 'On the greater side $BC$ mark the point $D$ with $CD = CA$, the length of the lesser side. This plants a small isosceles triangle $ACD$ inside the original one, with the equal sides meeting at $C$.',
        },
        {
          label: 'Isosceles detour',
          formula: '\\angle CAD = \\angle ADC',
          explanation: '$CA = CD$, so pons asinorum (I.5) makes the base angles of triangle $ACD$ equal — the same detour move that drove I.20, folded inward instead of outward.',
        },
        {
          label: 'The exterior angle beats a remote',
          formula: '\\angle ADC > \\angle ABD',
          explanation: 'The angle $ADC$ is exterior to triangle $ABD$ at $D$, because its arm $DC$ is the extension of $DB$ past $D$; its remote interiors are the angles at $A$ and at $B$ of triangle $ABD$. Euclid I.16 gives the exterior greater than EITHER remote — in particular greater than the one at $B$.',
        },
        {
          label: 'The split at A',
          formula: '\\angle BAC = \\angle BAD + \\angle DAC > \\angle DAC',
          explanation: 'The ray $AD$ lies inside the angle $BAC$, since $D$ sits on the segment $BC$; so the whole angle at $A$ is the sum of $\\angle BAD$ and $\\angle DAC$, hence greater than $\\angle DAC = \\angle ADC$ (Common Notion 5 again).',
        },
        {
          label: 'Chain and conclude',
          formula: '\\angle BAC > \\angle ADC > \\angle ABD = \\angle ABC',
          explanation: 'Since $D$ lies on $BC$, the angle $ABD$ IS the angle $ABC$. Stringing the chain: the angle at $A$ exceeds the angle at $B$, which is the claim that the greater side $BC$ subtends the greater angle.',
        },
      ],
      result: 'Greater side, greater angle: $a > b$ implies $A > B$. The engine certifies the chain on a relabelled witness ($BC = 7 > CA = 5$): the detour angles $\\angle CAD = \\angle ADC = 79.106605°$, the I.16 verdict $79.106605° > 38.213211°$, and the conclusion $\\angle BAC = 120° > \\angle ABC = 38.213211°$.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.19 — the greater angle is subtended by the greater side',
      text: 'The converse: in any triangle, the larger of two angles faces the longer side: $A > B$ implies $a > b$. Operationally: find the largest angle and you have found the longest side, with no measurement at all.',
    },
    {
      kind: 'derivation',
      title: 'Euclid I.19 — the greater angle is subtended by the greater side',
      statement: 'Euclid argues by contradiction, spending I.18\u2019s statement and the isosceles case. The two ordering theorems therefore INTERLOCK — each converse built on the other\u2019s tools — rather than nesting one inside the other.',
      steps: [
        {
          label: 'Suppose the conclusion fails',
          formula: '\\angle A > \\angle B \\text{ and } a \\le b',
          explanation: 'Assume, for contradiction, that the angle at $A$ is the greater while the side $a$ opposite it is not: by trichotomy, either $a = b$ or $a < b$.',
        },
        {
          label: 'Case a = b dies',
          formula: 'a = b \\;\\Rightarrow\\; A = B \\text{ (I.5)}',
          explanation: 'If $a = b$ the triangle is isosceles with its equal sides meeting at $C$, and pons asinorum forces the base angles equal: $A = B$, contradicting the hypothesis $A > B$. The engine checks the shape of this case on the $5$-$5$-$6$ isosceles: base angles $53.130102°$ each.',
        },
        {
          label: 'Case a < b dies',
          formula: 'a < b \\;\\Rightarrow\\; B > A \\text{ (I.18)}',
          explanation: 'If $a < b$, then $b$ is the greater side, and I.18 — just proved, from I.16 — makes the angle opposite it the greater: $B > A$, contradicting $A > B$ a second way.',
        },
        {
          label: 'Both cases impossible',
          formula: 'a > b',
          explanation: 'Both options inside $a \\le b$ contradict the hypothesis, so the third option $a > b$ must hold: the greater angle is subtended by the greater side.',
        },
      ],
      result: 'Greater angle, greater side: $A > B$ implies $a > b$. The proof spends I.18 and I.5 only — no I.20, no angle sum — so the pair I.18/I.19 interlocks cleanly and the chain I.16 $\\to$ I.18 $\\to$ I.19 $\\to$ I.20 is genuinely a chain, each link forged from the ones before it.',
    },
    {
      kind: 'para',
      text: 'Say the interlock honestly, because it is a place where textbooks blur. I.19\u2019s proof USES I.18\u2019s statement — that is what a converse proved by contradiction does. I.18\u2019s proof uses I.16 and I.5, NOT I.19; so there is no circle. What the pair shares is a toolset — the isosceles detour and the exterior angle inequality — and a trichotomy of cases (greater, equal, lesser) that the contradiction format forces into the open. The chapter\u2019s dependency tower in the inequality block therefore reads: I.16 (fifth-free) drives I.18, I.18 drives I.19, and I.19 closes I.20 — four propositions, one idea compounding at each floor.',
    },
    {
      kind: 'para',
      text: 'The engine cross-examines the ordering law across a family of witnesses — the integer triangles $(2, 3, 4)$, $(3, 4, 5)$, $(4, 5, 6)$, $(5, 5, 6)$, $(2, 2, 3)$, $(5, 6, 10)$, $(4, 5, 8)$, $(6, 7, 9)$ and $(3, 5, 7)$ — computing every angle by the cosine rule and checking pair by pair that side order matches angle order, with equality pairing with equality (the isosceles cases). All nine witnesses agree: $a < b$ exactly when $A < B$. That is the practical form of the theorem — ORDER ONLY, NO MEASUREMENT: to rank the angles of a triangle, rank the sides and read the ranking backwards.',
    },
    {
      kind: 'para',
      text: 'Now read the witness triangle in full — the one figure every theorem of this lesson touches. Sides $a = 3$, $b = 5$, $c = 7$; angles $A = \\arccos(13/14) = 21.786789°$, $B = \\arccos(11/14) = 38.213211°$, $C = \\arccos(-1/2) = 120°$ exactly. The cosine-rule numerators are worth a glance: each is an exact rational, $13/14$ and $11/14$ and $-1/2$, which is why this triple was pinned — the engine certifies all six decimals and the exact forms agree. The ordering law reads off instantly: $3 < 5 < 7$ and $21.786789° < 38.213211° < 120°$, rank for rank. The exterior at $C$ is $60°$, equal to $A + B$ exactly and greater than each remote separately. And the existence screen passes strictly: $3 + 5 = 8 > 7$, with the bound form reading $2 < 7 < 8$.',
    },
    {
      kind: 'table',
      caption: 'The 3-5-7 witness, fully read — every row recomputed by the engine',
      head: ['Quantity', 'Value', 'Certificate'],
      rows: [
        ['Sides $a, b, c$', '3, 5, 7', 'placed at $B(0,0)$, $C(3,0)$, $A(5.5, 4.330127)$'],
        ['Angle $A$ opposite $a$', '$\\arccos(13/14) = 21.786789°$', 'cosine rule, exact numerator'],
        ['Angle $B$ opposite $b$', '$\\arccos(11/14) = 38.213211°$', 'cosine rule, exact numerator'],
        ['Angle $C$ opposite $c$', '$\\arccos(-1/2) = 120°$', 'cosine rule, exact'],
        ['Angle sum', '$180°$', 'to six decimals'],
        ['Exterior at $C$', '$60° = A + B$ exactly', 'supplement of $C$'],
        ['Remote comparison', '$60 > 21.786789$ and $60 > 38.213211$', 'I.16, each separately'],
        ['Ordering', '$a < b < c$ matches $A < B < C$', 'I.18 forward, I.19 backward'],
        ['Existence screen', '$3 + 5 = 8 > 7$ strict', 'I.20'],
        ['The bound', '$2 < 7 < 8$', '$|a - b| < c < a + b$'],
        ['Area', '$15\\sqrt{3}/4 \\approx 6.495191$', 'half of base times height'],
      ],
    },
    /* -------------------------------------------------------------- */
    /* 5. the hinge theorem and its converse                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The hinge theorem and its converse: the compass-arms law' },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The hinge theorem (the SAS inequality)',
      text: 'Two triangles have two sides pairwise equal — $p$ with $p$, $q$ with $q$ — meeting at included angles $\\alpha$ and $\\beta$. If $\\alpha < \\beta$, then the third side facing $\\alpha$ is SHORTER than the third side facing $\\beta$: the wider opening reaches farther. Picture a compass or a pair of shears: same arm lengths, and the gap between the tips grows as the jaws open.',
    },
    {
      kind: 'para',
      text: 'The compass-arms picture below is the theorem in one look. Two triangles share a vertex $O$ and a lower arm of length $5$; their upper arms, also of length $5$ each, are opened to $40°$ and to $60°$. The third sides — the gaps between the tips — measure $10\\sin 20° \\approx 3.420201$ and $10\\sin 30° = 5$ exactly, and the wider opening owns the longer gap. The engine goes further than the picture: sweeping the opening through $20°$, $30°$, $40°$, $50°$, $60°$ it certifies the third side growing STRICTLY at every step ($1.736482$, $2.588190$, $3.420201$, $4.226183$, $5.000000$), and a dense sweep confirms strict growth across the whole range of openings from $1°$ to $179°$ — there is no plateau, no dip, no tie.',
    },
    {
      kind: 'figure',
      caption: 'The hinge as compass arms. From the shared vertex O, a common lower arm of length 5 and two upper arms of length 5 opened at 40° (amber) and 60° (orange). The gap between the tips — the third side — measures 10 sin 20° ≈ 3.42 for the narrow opening (dashed) and 10 sin 30° = 5 for the wide one: the wider the opening, the farther the tips.',
      svg: geo34Hinge('A shared vertex O with a common lower arm of length 5 and two upper arms of length 5 at openings of 40 and 60 degrees; the third sides are drawn between the tips and labelled 3.42 and 5, showing the wider opening reaching farther.'),
    },
    {
      kind: 'derivation',
      title: 'The hinge theorem and its converse — the compass-arms pair',
      statement: 'Triangle 1 has sides $p$ and $q$ from a vertex with included angle $\\alpha$ and third side $x$; triangle 2 has the same sides $p$ and $q$ from a vertex with included angle $\\beta$ and third side $y$. We prove the pair of implications $\\alpha < \\beta \\Leftrightarrow x < y$ in one computation.',
      steps: [
        {
          label: 'Cosine rule on each triangle',
          formula: 'x^2 = p^2 + q^2 - 2pq\\cos\\alpha,\\quad y^2 = p^2 + q^2 - 2pq\\cos\\beta',
          explanation: 'Write each third side by the cosine rule. (The cosine rule is the theorem our Trigonometry chapter derives in full; Euclid proves its two cases synthetically as Book II Propositions 12 and 13, the obtuse and acute cases.)',
        },
        {
          label: 'Subtract',
          formula: 'y^2 - x^2 = 2pq\\,(\\cos\\alpha - \\cos\\beta)',
          explanation: 'The difference of the squared third sides is a positive multiple of the difference of the cosines — the factor $2pq$ is positive because it is a product of lengths.',
        },
        {
          label: 'Cosine runs downhill on the angle range',
          formula: '0° < \\alpha, \\beta < 180° \\;\\Rightarrow\\; \\alpha < \\beta \\Leftrightarrow \\cos\\alpha > \\cos\\beta',
          explanation: 'On the open interval of possible included angles the cosine is STRICTLY decreasing, so angle order is exactly reversed cosine order — the analytic heart of the compass picture.',
        },
        {
          label: 'Assemble forward: hinge',
          formula: '\\alpha < \\beta \\;\\Rightarrow\\; y^2 > x^2 \\;\\Rightarrow\\; y > x',
          explanation: 'Wider opening, smaller cosine, larger squared third side for the wide triangle — and squares of positive lengths compare as the lengths do. The engine certifies the identity $x^2 = 50 - 50\\cos\\theta$ on arms $5$ and $5$ at every sweep angle.',
        },
        {
          label: 'Assemble backward: converse',
          formula: 'x < y \\;\\Rightarrow\\; \\cos\\alpha > \\cos\\beta \\;\\Rightarrow\\; \\alpha < \\beta',
          explanation: 'Run the chain in reverse: a strictly decreasing function is one-to-one, so the implications invert cleanly. Longer third side forces the wider included angle — the SSS-inequality, the converse hinge.',
        },
      ],
      result: 'The hinge pair, proved together: with two sides pairwise equal, $\\alpha < \\beta \\Leftrightarrow x < y$. On the pinned swing (arms $5$ and $5$, openings $40°$ and $60°$) the engine certifies third sides $3.420201$ and $5$, with strict growth across the whole sweep.',
    },
    {
      kind: 'para',
      text: 'Two honest notes attach to this derivation. FIRST, the synthetic route: Euclid proves the hinge pair without any trigonometry — the hinge appears as Book I Proposition 24 (built from the angle-transfer I.23 and the ordering I.19) and its converse as I.25 — so the theorem is solidly Euclidean; our analytic proof was chosen because the engine can verify every number of it, and the synthetic proof belongs to the same tradition we have been reading all chapter. SECOND, the trigonometric companion: the sine rule will later tell us that $a > b$ if and only if $\\sin A > \\sin B$ (both sides divided by the same positive circumdiameter). That companion is real and useful, but it belongs to the Trigonometry chapter\u2019s toolkit, not to this lesson\u2019s — we name the bridge honestly and prove here only what the synthetic and cosine-rule instruments can carry.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The converse hinge (the SSS inequality)',
      text: 'Two triangles have two sides pairwise equal, and their third sides satisfy $x < y$. Then the included angle facing $x$ is SMALLER than the included angle facing $y$. Operationally: with the arms fixed, the third side READS OFF the opening — measure the gap and you know the angle order without any protractor.',
    },
    {
      kind: 'table',
      caption: 'The hinge sweep on arms 5 and 5 — the third side 10 sin(theta over 2) grows strictly with the opening; growth per 10° step shown in the last column',
      head: ['Included angle', 'Third side on arms 5, 5', 'Step growth'],
      rows: [
        ['20°', '10 sin 10° = 1.736482', '—'],
        ['30°', '10 sin 15° = 2.588190', '+0.851708'],
        ['40°', '10 sin 20° = 3.420201', '+0.832011'],
        ['50°', '10 sin 25° = 4.226183', '+0.805982'],
        ['60°', '10 sin 30° = 5.000000', '+0.773817'],
      ],
    },
    {
      kind: 'para',
      text: 'Read the sweep table with a designer\u2019s eye. The growth column shrinks as the opening widens — from $+0.851708$ per $10°$ step at narrow openings to $+0.773817$ near $60°$ — because the third side $10\\sin(\\theta/2)$ climbs the sine arch, steepest near the middle of the range and flattening toward the ends. A scissors-joint designer feels exactly this: the first degrees of opening buy the most tip-travel. But note what never happens: no step is zero or negative. STRICT growth at every step is the theorem\u2019s content; the varying rate is the sine\u2019s ornament.',
    },

    /* -------------------------------------------------------------- */
    /* 6. worked applications                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The inequality toolkit in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. The first is the existence screen on three claimed strut triples — accept, refuse, and refuse-with-reason. The second is the shortest-path read: the detour through a depot against the straight segment, with the triangle inequality playing the straight line\u2019s charter. The third reads the $3$-$5$-$7$ witness completely — angles computed against the engine\u2019s certified values, the ordering stated both ways, the exterior read with the sum-versus-each distinction. In all three, the discipline is one: screen first, reason second, verdict last.',
    },
    {
      kind: 'example',
      title: 'The existence screen. A workshop receives three claimed strut triples: (i) $5$, $6$, $10$; (ii) $3$, $4$, $8$; (iii) $3$, $5$, $8$. For each, decide whether the struts can close into a triangle, with the inequality checked and the refusal reason named.',
      steps: [
        'Sol. Run the screen on (i): the lengths are already ordered $5 \\le 6 \\le 10$, so consult the longest side alone: $5 + 6 = 11 > 10$, the screen passes, and by the single-screen law no other check is needed.',
        'Check (ii): $3 \\le 4 \\le 8$ with $3 + 4 = 7 < 8$ — the two shorter struts, laid out dead straight end to end, still fall $1$ short of the span they must bridge; no triangle closes.',
        'Check (iii): $3 \\le 5 \\le 8$ with $3 + 5 = 8$ EXACTLY — not less, not greater: the two shorter sides end to end precisely reach the third, so the would-be triangle collapses flat onto a line (the degenerate case of the definition callout, area $0$).',
        'State the verdicts with reasons: (i) accepted, because $11 > 10$; (ii) refused by shortfall, because $7 < 8$; (iii) refused as degenerate, because $8 = 8$ forces collineity.',
        'Hence only the $5$-$6$-$10$ triple closes into a genuine triangle. Note for the design desk: cases (ii) and (iii) fail in DIFFERENT ways — one by a shortfall of $1$, one by exact flatness — and only the flat one sits on the boundary of the existence range $2 < c < 8$ for the sides $3$ and $5$.',
      ],
    },
    {
      kind: 'example',
      title: 'The shortest-path read. A supply route runs straight from $P(0, 0)$ to $Q(8, 4)$; a proposed detour bends through the depot $R(3, 4)$. Verify that the detour is longer than the straight route, and compute by how much.',
      steps: [
        'Sol. Compute the two legs of the detour: $PR = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ and $RQ = \\sqrt{(8 - 3)^2 + (4 - 4)^2} = 5$ — so the broken path $P \\to R \\to Q$ measures $5 + 5 = 10$ in total.',
        'Compute the straight route: $PQ = \\sqrt{8^2 + 4^2} = \\sqrt{80} = 4\\sqrt{5} \\approx 8.944272$.',
        'Compare with the charter: $P$, $R$ and $Q$ are three non-collinear points (the depot sits off the line through $P$ and $Q$), so they form a genuine triangle, and I.20 applied to its sides gives $PR + RQ > PQ$ — the straight segment is structurally shorter than ANY broken path through a third point, whatever the depot\u2019s position.',
        'Quantify the waste: $10 - 4\\sqrt{5} \\approx 1.055728$, which is about $11.8\\%$ of the straight distance — the detour gives away roughly a ninth of the route.',
        'Hence the straight route wins by about $1.055728$; and the inequality did more than confirm this one comparison — it certified that NO detour through any off-segment point can ever tie or beat the straight route. That is the straight line\u2019s charter: I.20 is why \u201cthe shortest path between two points is the straight one\u201d is a theorem here, not a slogan.',
      ],
    },
    {
      kind: 'example',
      title: 'The witness fully ordered. For the triangle with sides $a = 3$, $b = 5$, $c = 7$: compute all three angles, verify the ordering law both ways, and read the exterior angle at $C$.',
      steps: [
        'Sol. Compute the angles with the cosine rule: $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{25 + 49 - 9}{70} = \\frac{13}{14}$, so $A = \\arccos(13/14) \\approx 21.786789°$.',
        'Likewise $\\cos B = \\frac{c^2 + a^2 - b^2}{2ca} = \\frac{49 + 9 - 25}{42} = \\frac{11}{14}$, so $B \\approx 38.213211°$; and $\\cos C = \\frac{a^2 + b^2 - c^2}{2ab} = \\frac{9 + 25 - 49}{30} = -\\frac{1}{2}$, so $C = 120°$ exactly.',
        'Check the arithmetic: $21.786789 + 38.213211 + 120 = 180$ — and the engine certifies the stronger split $A + B = 60$ EXACTLY, the exterior angle at $C$.',
        'Read the ordering both ways: the sides rise $3 < 5 < 7$ and the angles rise $21.786789° < 38.213211° < 120°$ in the same order — forward (I.18): the greater side $7$ subtends the greater angle $120°$; backward (I.19): the greatest angle $120°$ is subtended by the greatest side $7$.',
        'Read the exterior at $C$: extend $BC$ beyond $C$; the exterior angle is $180° - 120° = 60°$, which EQUALS $A + B = 21.786789° + 38.213211°$ exactly, and EXCEEDS each remote interior angle separately — $60 > 21.786789$ and $60 > 38.213211$ — the I.16 verdict on the witness.',
        'Hence the witness is fully ordered: smallest angle $21.786789°$ opposite the shortest side $3$, the exact $120°$ opposite $7$, exterior $60°$ at $C$ equal to the remote sum and greater than each remote — every theorem of the lesson visible in one triangle, every number engine-certified.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 7. the collected law + exam corner                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law of the lesson' },
    {
      kind: 'para',
      text: 'Five cards collect everything the lesson proved, in the form the revision sheet wants. The first is the bound — the triangle inequality in its examination shape, with both ends strict. The second is the exterior angle verdict of I.16, with the sum-versus-each distinction written into the note. The third and fourth are the hinge pair, forward and converse. The fifth is the ordering law of I.18 and I.19, the single line that ranks every triangle\u2019s sides against its angles.',
    },
    {
      kind: 'formula',
      name: 'The triangle inequality bound (I.20)',
      latex: '|b - c| < a < b + c \\quad \\text{(and cyclically)}',
      note: 'the third side of a triangle holding sides b and c lies strictly between their difference and their sum; equality at either end is the degenerate collapse, refused by the screen',
    },
    {
      kind: 'formula',
      name: 'The exterior angle inequality (I.16)',
      latex: '\\text{exterior at a vertex} > \\text{each remote interior angle, separately}',
      note: 'proved fifth-free, before any parallel postulate; the exterior also EQUALS the sum of the remotes, but that is the angle-sum theorem talking, not I.16',
    },
    {
      kind: 'formula',
      name: 'The hinge theorem (SAS inequality)',
      latex: '\\alpha < \\beta \\;\\Rightarrow\\; x < y \\quad \\text{(two sides pairwise equal)}',
      note: 'equal arms, wider opening: the third side grows — 10 sin 20° ≈ 3.42 against 10 sin 30° = 5 on the pinned swing',
    },
    {
      kind: 'formula',
      name: 'The converse hinge (SSS inequality)',
      latex: 'x < y \\;\\Rightarrow\\; \\alpha < \\beta \\quad \\text{(two sides pairwise equal)}',
      note: 'longer third side forces the wider included angle; the cosine-rule identity runs the chain both ways',
    },
    {
      kind: 'formula',
      name: 'The side-angle ordering (I.18 and I.19)',
      latex: 'a > b \\;\\Leftrightarrow\\; A > B',
      note: 'the greater side subtends the greater angle and conversely; equality pairs with equality — the isosceles case',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the inequality as an instant eliminator',
      text: 'Four habits pay marks here. FIRST, the two-sides screen, cold: given sides $4$ and $9$, the third side must satisfy $5 < x < 13$ — between the difference and the sum, BOTH ends strict; any option with a weak inequality, or with the sum swapped for the difference, dies without a drawing. SECOND, the sum-versus-each trap: \u201cthe exterior angle equals the sum of the remote interiors\u201d is TRUE but is the angle-sum theorem; I.16\u2019s licensed content is the STRICT verdict on EACH remote separately — quote the right one for the mark. THIRD, ordering without computation: to find a triangle\u2019s largest angle, find its longest side and look opposite (I.18); given the angle ranking, read the side ranking backwards (I.19) — these one-line citations are regularly worth a mark each. FOURTH, cite by content, not by number unless sure: \u201cthe triangle inequality (Euclid I.20)\u201d, \u201cthe exterior angle inequality (I.16)\u201d, \u201cthe greater side subtends the greater angle (I.18)\u201d and its converse (I.19) — the hinge pair rounds out the list for comparison questions. The degenerate refusal ($3 + 5 = 8$) and the hinge swing ($3.42 < 5$ on arms $5$ and $5$) are the two standard witness shapes; recognise both on sight.',
    },

    /* -------------------------------------------------------------- */
    /* 8. terms                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'triangle inequality', def: 'Euclid I.20: in any triangle each side is strictly less than the sum of the other two — $a < b + c$, $b < c + a$, $c < a + b$. As a screen: three lengths close into a triangle exactly when the longest is less than the sum of the other two.' },
        { term: 'degenerate triangle', def: 'A triple of lengths with $a + b = c$: the three pinned points are forced into collineity, the enclosed area is $0$, and the figure is a segment walked twice. The existence screen refuses it as firmly as a shortfall.' },
        { term: 'existence screen', def: 'The single check $a + b > c$ on the longest side $c$. With $a \\le b \\le c$ the other two pair-sum inequalities are automatic, so one comparison decides existence. On ordered triples up to $10$: $125$ of $220$ candidates pass.' },
        { term: 'exterior angle inequality', def: 'Euclid I.16: the exterior angle at a vertex — the supplement of the interior angle there — is greater than EACH remote interior angle separately, strictly. Proved fifth-free, before any parallel postulate is spent.' },
        { term: 'remote interior angles', def: 'For an exterior angle at a vertex, the two interior angles at the OTHER two vertices. I.16 beats each of them separately; the angle-sum theorem additionally makes their sum EQUAL the exterior.' },
        { term: 'larger side larger angle', def: 'Euclid I.18: the greater side subtends the greater angle — $a > b$ implies $A > B$. Proved by cutting the greater side down to the lesser (isosceles detour) and applying I.16.' },
        { term: 'larger angle larger side', def: 'Euclid I.19: the greater angle is subtended by the greater side — $A > B$ implies $a > b$. Proved by contradiction from I.18 and the isosceles case; the pair interlocks rather than nests.' },
        { term: 'hinge theorem', def: 'The SAS inequality: two triangles with two sides pairwise equal — the one with the larger included angle has the longer third side. Compass arms: the wider the opening, the farther the tips. On arms $5$ and $5$: openings $40°$ and $60°$ give third sides $3.420201$ and $5$.' },
        { term: 'converse of the hinge', def: 'The SSS inequality: two triangles with two sides pairwise equal — the one with the longer third side has the larger included angle. The third side reads the opening off, no protractor needed.' },
        { term: 'the bound', def: 'The examination shape of the triangle inequality: $|b - c| < a < b + c$ for any side against the other two — derived from the three pair-sum inequalities, with BOTH ends excluded and equality meaning degeneracy.' },
        { term: 'the witness triangle', def: 'The chapter\u2019s reusable $3$-$5$-$7$ example: $a = 3$, $b = 5$, $c = 7$ with angles $\\arccos(13/14) = 21.786789°$, $\\arccos(11/14) = 38.213211°$ and exactly $120°$; exterior $60°$ at $C$; every theorem of the lesson acts on it.' },
        { term: 'the isosceles detour', def: 'The shared proof move of I.18 and I.20: cut or extend to plant a segment equal to a side ($CA = CD$), summon pons asinorum for the base angles, then let I.16 or I.19 convert the angle comparison into the side conclusion.' },
        { term: 'the straight-line charter', def: 'I.20 read as a path statement: any broken route from $P$ to $Q$ through a third point exceeds the straight segment $PQ$ — the inequality IS the theorem behind \u201cthe shortest path is the straight one\u201d.' },
        { term: 'the existence census', def: 'The engine\u2019s count of genuine integer triangles on ordered triples $1 \\le a \\le b \\le c \\le 10$: exactly $125$ of $220$ candidates pass the screen, $95$ are refused, and the per-longest-side counts follow the closed form $\\lfloor (c+1)^2/4 \\rfloor$.' },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. quiz (key [3,1,2,0,3] — PINNED)                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Two sides of a triangle measure $4$ and $9$. The third side $x$ must satisfy —',
          options: [
            '$13 < x < 17$, since the third side must exceed the sum of the given sides',
            '$4 < x < 13$, using the difference of the given sides the wrong way round',
            '$5 \\le x \\le 13$, since the boundary values still pin a triangle',
            'the strict screen $5 < x < 13$: the third side lies between $|9 - 4| = 5$ and $9 + 4 = 13$, excluded at both ends',
          ],
          answer: 3,
          explain: 'The bound form of the triangle inequality: any side $a$ satisfies $|b - c| < a < b + c$, so with sides $4$ and $9$ the third is strictly between $9 - 4 = 5$ and $9 + 4 = 13$. Option (a) inverts the law — no side of a triangle exceeds the sum of the other two, and $x > 13$ is precisely the refused region. Option (b) computes a difference wrongly ($9 - 4$ is $5$, not $4$) — the classic slip of subtracting the smaller from the larger and misplacing it. Option (c) is the degenerate trap: at $x = 13$ the sides satisfy $4 + 9 = 13$ exactly — three collinear points, area $0$ — and at $x = 5$ likewise $9 = 4 + 5$; both boundary values are refused, so the inequality is strict at both ends.',
        },
        {
          q: 'The exterior angle inequality of Euclid I.16 states that an exterior angle of a triangle is —',
          options: [
            'equal to the sum of the two remote interior angles, since angles on a line are supplementary',
            'greater than either remote interior angle, one at a time — the strict verdict I.16 actually proves, fifth-free',
            'greater than the sum of the two remote interior angles, since the whole beats the parts',
            'supplementary to each remote interior angle, pairing the exterior with both remotes',
          ],
          answer: 1,
          explain: 'I.16\u2019s licensed content is the STRICT comparison with EACH remote interior angle separately: exterior $> A$ and exterior $> B$, one at a time, proved without any parallel postulate. Option (a) states a true fact with the wrong attribution — the exterior does equal the sum of the remotes, but that is the angle-sum theorem\u2019s arithmetic (interiors sum to $180°$), which needs Euclid\u2019s parallel postulate machinery; citing it as I.16 loses the mark. Option (c) overshoots: on the $3$-$5$-$7$ witness the exterior at $C$ is $60°$ while the remote sum is $21.786789° + 38.213211° = 60°$ — equal, not greater. Option (d) is dimension talk without meaning: the exterior supplements the INTERIOR angle at its own vertex ($60° = 180° - 120°$ on the witness), not the remotes.',
        },
        {
          q: 'In the triangle with sides $3$, $5$ and $7$, the largest angle is —',
          options: [
            'the angle between the sides $3$ and $5$, and it measures $90°$, since $3$-$5$-$7$ is nearly a right triangle',
            'the angle opposite the side $5$, measuring about $38.21°$',
            'the angle opposite the side $7$, namely $120°$ exactly, since $\\cos C = (9 + 25 - 49)/30 = -1/2$',
            'the angle opposite the side $3$, measuring about $21.79°$, the sharpest corner carrying the largest turn',
          ],
          answer: 2,
          explain: 'By I.18 the longest side subtends the largest angle, and $7$ is the longest; the cosine rule then pins it exactly: $\\cos C = (a^2 + b^2 - c^2)/(2ab) = (9 + 25 - 49)/30 = -1/2$, so $C = 120°$. Option (a) has the position right (the angle between $3$ and $5$ IS the angle opposite $7$) but the measure wrong — and badly so: the witness is obtuse, not right. Option (b) names the angle opposite $5$, which is the MIDDLE angle, $\\arccos(11/14) \\approx 38.21°$ — right computation, wrong ranking. Option (d) picks the smallest angle, opposite the shortest side $3$ ($\\arccos(13/14) \\approx 21.79°$) — the ordering law read backwards.',
        },
        {
          q: 'Two triangles each have two sides of lengths $5$ and $5$ meeting at a vertex, with included angles $40°$ and $60°$. Their third sides compare as —',
          options: [
            'the $60°$ triangle\u2019s third side is longer: $10\\sin 30° = 5$ beats $10\\sin 20° \\approx 3.42$',
            'equal, since both triangles have the same two side lengths',
            'the $40°$ triangle\u2019s third side is longer, since a narrower opening reaches farther between the tips',
            'undetermined: two sides and the included angle do not fix a triangle',
          ],
          answer: 0,
          explain: 'This is the hinge theorem (SAS inequality): with the two arms pairwise equal, the larger included angle faces the longer third side. The engine\u2019s pinned swing computes both: third side $= 2 \\cdot 5 \\sin(\\theta/2)$, giving $10\\sin 20° \\approx 3.420201$ at the $40°$ opening and $10\\sin 30° = 5$ at $60°$ — the wider opening reaches farther, strictly. Option (b) is the congruence reflex misfiring: SAS EQUALITY needs the included angles equal, and here they differ — the theorem at work is an inequality, not a congruence. Option (c) inverts the compass picture: opening the jaws wider moves the tips APART, never together. Option (d) denies the cosine rule: two sides with the included angle fix the triangle completely (that is SAS), so the comparison is determined, not open.',
        },
        {
          q: 'Which of the following triples CANNOT be the side lengths of a (non-degenerate) triangle?',
          options: [
            '$2$, $3$, $4$ — the two shorter sides fail to reach',
            '$4$, $5$, $7$ — the longest side is more than twice the shortest',
            '$6$, $7$, $12$ — the gap between the longest and shortest is too large',
            'the triple 3, 5, 8 — refused because $3 + 5 = 8$ exactly: the degenerate collapse onto a line',
          ],
          answer: 3,
          explain: 'Run the screen on each, consulting the longest side only. For $3$, $5$, $8$: $3 + 5 = 8$ EXACTLY — the two shorter sides end to end precisely span the longest, the three points are collinear, the area is $0$, and the existence screen refuses the triple as degenerate. Option (a) is genuine: $2 + 3 = 5 > 4$ passes. Option (b) is genuine and its stated reason is nonsense twice over: $4 + 5 = 9 > 7$ passes, and no triangle law forbids the longest side from exceeding twice the shortest. Option (c) is genuine: $6 + 7 = 13 > 12$ passes — the difference $12 - 6 = 6$ is well below the middle side $7$, which is all the bound $|b - c| < a$ ever demands.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. graded exercises (15, L1-L6, full Cengage step solutions)  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the existence screen, the ordering laws and the hinge',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'The existence screen, three times. Decide whether each claimed triple of strut lengths can close into a triangle, checking the inequality and naming the refusal reason: (i) $5$, $6$, $10$; (ii) $3$, $4$, $8$; (iii) $3$, $5$, $8$.',
              solution: [
                'Sol. Screen (i): the lengths are ordered $5 \\le 6 \\le 10$, so consult the longest side alone: $5 + 6 = 11 > 10$ — the screen passes, and the single-screen law says no other check is needed.',
                'Screen (ii): $3 \\le 4 \\le 8$ with $3 + 4 = 7 < 8$ — even laid out dead straight, the two shorter struts fall $1$ short of the span; no triangle closes.',
                'Screen (iii): $3 \\le 5 \\le 8$ with $3 + 5 = 8$ exactly — the two shorter sides end to end precisely reach the third, so the figure collapses flat onto a line: the degenerate case, area $0$, refused.',
                'Hence (i) is accepted ($11 > 10$); (ii) is refused by shortfall ($7 < 8$); (iii) is refused as degenerate ($8 = 8$) — two different failure modes, only the third sitting on the boundary of the existence range.',
              ],
              answer: 'only $(5, 6, 10)$ closes; $(3, 4, 8)$ is short ($7 < 8$), and $(3, 5, 8)$ is degenerate ($8 = 8$)',
              figures: [
                {
                  caption: 'The collapse figure for this solution: the refused triple 3, 5, 8 laid on a line, with the ghost of the genuine 3, 5, 7 apex and the dashed arc of radius 5 down which it slides to the flat position — area 0, three collinear points.',
                  svg: geo34SolCollapse('A mini figure of the degenerate triple 3, 5, 8 drawn flat on a line with a dashed arc showing where the apex of a genuine triangle would have been.'),
                },
              ],
            },
            {
              q: 'Two sides of a triangle measure $7$ and $10$. Between what bounds must the third side $x$ lie, and why are both ends excluded?',
              solution: [
                'Sol. Write the bound form of the triangle inequality for the side $x$ against the other two: $|10 - 7| < x < 10 + 7$.',
                'Compute the ends: $|10 - 7| = 3$ and $10 + 7 = 17$, so the screen reads $3 < x < 17$.',
                'Both ends are excluded because equality is degeneracy: at $x = 17$ the sides satisfy $7 + 10 = 17$ — flat, collinear, refused; at $x = 3$ likewise $10 = 7 + 3$ puts the longest side exactly at the difference — flat again.',
                'Hence the third side lies strictly between $3$ and $17$: the bound $3 < x < 17$ with both ends refused by the strict inequality.',
              ],
              answer: '$3 < x < 17$, both ends strict',
            },
            {
              q: 'In the triangle with sides $a = 3$, $b = 5$, $c = 7$: name the largest and the smallest angles (with their measures, to the engine\u2019s six decimals), citing the ordering law you used.',
              solution: [
                'Sol. Rank the sides first: $3 < 5 < 7$, so $c = 7$ is the longest and $a = 3$ the shortest.',
                'Apply I.18 (the greater side subtends the greater angle) forward: the largest angle is $C$, opposite the longest side $7$; the smallest is $A$, opposite the shortest side $3$.',
                'Compute the measures with the cosine rule: $\\cos C = (9 + 25 - 49)/30 = -1/2$, so $C = 120°$ exactly; $\\cos A = (25 + 49 - 9)/70 = 13/14$, so $A = 21.786789°$.',
                'Hence the largest angle is $C = 120°$ opposite the side $7$, and the smallest is $A = 21.786789°$ opposite the side $3$ — the ordering $A < B < C$ matching $a < b < c$ rank for rank, with $B = 38.213211°$ between them.',
              ],
              answer: 'largest $C = 120°$ opposite $7$; smallest $A = 21.786789°$ opposite $3$ (by I.18)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'A triangle has angles $50°$, $60°$ and $70°$ at $A$, $B$ and $C$ respectively. Order the sides $a$, $b$, $c$ from shortest to longest, citing the theorem, and justify the ranking with the sine rule companion.',
              solution: [
                'Sol. Rank the angles: $50° < 60° < 70°$, so the largest angle is $C$ and the smallest is $A$.',
                'Apply I.19 (the greater angle is subtended by the greater side): the side opposite $70°$, which is $c$, is the longest; the side opposite $50°$, which is $a$, is the shortest.',
                'Justify with the sine-rule companion, cited honestly as the Trigonometry bridge: $a : b : c = \\sin 50° : \\sin 60° : \\sin 70°$, and the sines run $0.766044 < 0.866025 < 0.939693$ (all three angles acute, where sine climbs with the angle).',
                'Hence the side order is $a < b < c$ — shortest opposite $50°$, longest opposite $70°$, no measurement of the sides needed at all.',
              ],
              answer: '$a < b < c$ — shortest opposite $50°$, longest opposite $70°$ (by I.19)',
            },
            {
              q: 'Two sides of a triangle measure $5$ and $9$, and the third side must be a whole number of units. List the possible values, and count them.',
              solution: [
                'Sol. Write the screen: $|9 - 5| < x < 9 + 5$, that is $4 < x < 14$.',
                'List the whole numbers strictly inside: $5, 6, 7, 8, 9, 10, 11, 12, 13$ — nine values.',
                'Check the ends are rightly excluded: $x = 4$ would give $5 + 4 = 9$, flat; $x = 14$ would give $5 + 9 = 14$, flat again — both degenerate, both refused.',
                'Hence the third side can be any of the nine integers from $5$ to $13$ inclusive: $5, 6, 7, 8, 9, 10, 11, 12, 13$.',
              ],
              answer: 'the nine integers $5, 6, 7, 8, 9, 10, 11, 12, 13$',
            },
            {
              q: 'A triangle has remote interior angles $47°$ and $68°$ at $A$ and $B$. Find the exterior angle at $C$, verify I.16\u2019s verdict on each remote separately, and state the interior angle at $C$.',
              solution: [
                'Sol. Compute the interior at $C$ first: the angle sum gives $C = 180° - 47° - 68° = 65°$.',
                'The exterior at $C$ is the supplement: $180° - 65° = 115°$ — equally, the exterior equals the remote sum $47° + 68° = 115°$.',
                'Verify I.16\u2019s strict verdict on each remote separately: $115 > 47$ and $115 > 68$ — each holds strictly, as the theorem promises.',
                'Hence the exterior angle at $C$ is $115°$, beating each remote interior angle separately ($115 > 47$ and $115 > 68$), with the interior at $C$ equal to $65°$.',
              ],
              answer: 'exterior $115°$ (with $115 > 47$ and $115 > 68$ separately); interior $C = 65°$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Two triangles each have two sides of lengths $5$ and $5$ meeting at a vertex, with included angles $40°$ and $60°$. Compute both third sides to six decimals, state which is longer, and name the theorem.',
              solution: [
                'Sol. Set up the hinge computation: with equal arms $p = q = 5$, the third side is $x = 2 \\cdot 5 \\sin(\\theta/2) = 10\\sin(\\theta/2)$.',
                'Compute at the narrow opening: $10\\sin 20° = 3.420201$ to six decimals.',
                'Compute at the wide opening: $10\\sin 30° = 5$ exactly.',
                'Compare: $3.420201 < 5$, so the triangle with the $60°$ opening has the longer third side — the hinge theorem (SAS inequality): equal arms, wider opening, farther tips.',
                'Hence the third sides are $3.420201$ and $5$, the $60°$ one longer, by the hinge theorem — the engine\u2019s sweep confirms strict growth at every step from $20°$ to $60°$.',
              ],
              answer: '$10\\sin 20° = 3.420201$ versus $10\\sin 30° = 5$: the $60°$ opening reaches farther (hinge theorem)',
              figures: [
                {
                  caption: 'The hinge swing figure for this solution: compass arms of length 5 from a shared vertex, openings 40° and 60°, the two third sides drawn between the tips and labelled with their values 3.42 and 5 — the wider opening reaches farther.',
                  svg: geo34SolHinge('A mini compass-arms figure with two openings of 40 and 60 degrees on arms of length 5, third sides 3.42 and 5 drawn between the tips.'),
                },
              ],
            },
            {
              q: 'Two triangles have two sides pairwise equal (lengths $5$ and $5$), and their third sides measure $4$ and $5$. Which triangle has the larger included angle? Compute both angles and cite the converse hinge.',
              solution: [
                'Sol. Read the opening off the third side: with arms $5$ and $5$, a third side $x$ satisfies $x = 10\\sin(\\theta/2)$, so $\\theta = 2\\arcsin(x/10)$.',
                'Compute for $x = 4$: $\\theta = 2\\arcsin(0.4) = 47.156357°$ to six decimals.',
                'Compute for $x = 5$: $\\theta = 2\\arcsin(0.5) = 60°$ exactly.',
                'Compare: $47.156357° < 60°$, so the triangle with third side $5$ has the larger included angle — the converse hinge (SSS inequality): longer third side, wider opening.',
                'Hence the $5$-third-side triangle opens wider ($60°$ against $47.156357°$), by the converse of the hinge theorem.',
              ],
              answer: 'the third-side-$5$ triangle: $60°$ versus $47.156357°$ (converse hinge)',
            },
            {
              q: 'A route runs straight from $P(0, 0)$ to $Q(8, 4)$; a detour is proposed through $R(3, 4)$. Compute both route lengths, verify the detour is longer, and find the saving of the straight route.',
              solution: [
                'Sol. Compute the detour legs: $PR = \\sqrt{3^2 + 4^2} = 5$ and $RQ = \\sqrt{(8-3)^2 + (4-4)^2} = 5$, so the broken path measures $5 + 5 = 10$.',
                'Compute the straight route: $PQ = \\sqrt{8^2 + 4^2} = \\sqrt{80} = 4\\sqrt{5} = 8.944272$ to six decimals.',
                'Verify with the charter: $P$, $R$, $Q$ are non-collinear, so triangle $PRQ$ is genuine and I.20 gives $PR + RQ > PQ$ — indeed $10 > 8.944272$.',
                'Find the saving: $10 - 4\\sqrt{5} = 1.055728$ to six decimals — the straight route wins by about $1.06$ units.',
                'Hence the detour measures $10$ against the straight $8.944272$, the inequality certifies the straight route shorter, and the saving is $1.055728$.',
              ],
              answer: 'detour $10$ versus straight $8.944272$; saving $10 - 4\\sqrt{5} = 1.055728$',
              figures: [
                {
                  caption: 'The detour path figure for this solution: the broken route P to R to Q (two legs of 5 each) against the straight segment PQ of length 4√5 ≈ 8.94 — the triangle inequality in PQR certifies the straight route shorter.',
                  svg: geo34SolDetour('A mini figure with points P, R and Q, the broken two-leg path through R in red arrows totalling 10 and the straight segment PQ in green measuring 8.94.'),
                },
              ],
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Derive the bound form $|b - c| < a < b + c$ from the three pair-sum inequalities of I.20, and verify it on the triangle with sides $5$, $9$ and $7$.',
              solution: [
                'Sol. Write the three inequalities of I.20: $a < b + c$, $b < c + a$ and $c < a + b$.',
                'Take the upper bound straight from the first: $a < b + c$ is the right half of the bound.',
                'For the lower bound, rearrange the other two: $b < c + a$ gives $b - c < a$; $c < a + b$ gives $c - b < a$. Together the two say that $a$ exceeds both $b - c$ and $c - b$ — that is, $a$ exceeds $|b - c|$.',
                'Combine: $|b - c| < a < b + c$, with both ends strict because equality on either side would flatten the triangle.',
                'Verify on sides $5$, $9$, $7$ with $a = 7$, $b = 9$, $c = 5$: $|9 - 5| = 4 < 7 < 14 = 9 + 5$ — the bound holds, engine-checked.',
                'Hence the bound follows from I.20 by using one inequality for the ceiling and the other two for the floor: $|b - c| < a < b + c$.',
              ],
              answer: '$|b - c| < a < b + c$; on sides $5$, $9$, $7$: $4 < 7 < 14$',
            },
            {
              q: 'Euclid\u2019s chain on coordinates. Place $B(0, 0)$, $C(3, 0)$ and $A(5.5, 4.330127)$ — the $3$-$5$-$7$ witness. Extend $BC$ beyond $C$ to the point $D$ with $CD = CA$, and walk the I.20 proof: verify the isosceles detour angles, the angle comparison, and the final side inequality.',
              solution: [
                'Sol. Place $D$: beyond $C$ on the line at distance $CD = CA = 5$, so $D = (8, 0)$.',
                'Verify the detour triangle: $CA = 5$, $CD = 5$ and (on this witness) $AD = 5$ too — the isosceles detour happens to be equilateral.',
                'Verify the isosceles base angles (I.5): $\\angle ADC = \\angle CAD = 60°$ each, by direct computation on the coordinates.',
                'Verify the split at $A$: $\\angle BAD = \\angle BAC + \\angle CAD = 21.786789° + 60° = 81.786789°$, which strictly exceeds $\\angle ADB = 60°$.',
                'Apply I.19 on triangle $ABD$: the greater angle $BAD$ is subtended by the greater side, so $BD > BA$ — indeed $BD = 8 > 7 = BA$.',
                'Substitute: $BD = BC + CD = BC + CA = 3 + 5 = 8$, hence $BA = 7 < 8 = BC + CA$ — the triangle inequality, proved on the coordinates.',
              ],
              answer: '$D = (8, 0)$; $\\angle ADC = \\angle CAD = 60°$, $\\angle BAD = 81.786789° > 60°$, so $BD = 8 > BA = 7 = BC + CA - 1$… that is, $BA < BC + CA$',
            },
            {
              q: 'The $4$-$5$-$6$ triangle, fully ordered. Compute all three angles by the cosine rule (six decimals), check the angle sum, verify the ordering law, and read the exterior angle at the vertex opposite the side $6$.',
              solution: [
                'Sol. Compute the angles: $\\cos A = (25 + 36 - 16)/60 = 3/4$, so $A = 41.409622°$; $\\cos B = (36 + 16 - 25)/48 = 9/16$, so $B = 55.771134°$; $\\cos C = (16 + 25 - 36)/40 = 1/8$, so $C = 82.819244°$.',
                'Check the sum: $41.409622 + 55.771134 + 82.819244 = 180$ to six decimals — engine-certified.',
                'Verify the ordering: sides $4 < 5 < 6$ and angles $41.409622° < 55.771134° < 82.819244°$ — rank for rank, as I.18 demands.',
                'Read the exterior at $C$ (opposite the side $6$): $180° - 82.819244° = 97.180756°$, which equals $A + B$ exactly and beats each remote separately ($97.180756 > 41.409622$ and $97.180756 > 55.771134$) — the I.16 verdict.',
                'Hence the $4$-$5$-$6$ triangle carries angles $41.409622°$, $55.771134°$, $82.819244°$, ordered with the sides, with exterior $97.180756°$ at the vertex opposite $6$.',
              ],
              answer: '$A = 41.409622°$, $B = 55.771134°$, $C = 82.819244°$ (sum $180$); ordering matches; exterior at $C$ is $97.180756°$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'A triangle has sides $x$, $x + 2$ and $x + 7$. Find the range of $x$ for which the triangle exists, test the boundary value, and name the smallest whole-number $x$ that works.',
              solution: [
                'Sol. Order the expressions: for $x > 0$ we have $x < x + 2 < x + 7$, so the longest side is $x + 7$ and the screen is $x + (x + 2) > x + 7$.',
                'Solve the screen: $2x + 2 > x + 7$ gives $x > 5$.',
                'Test the boundary: at $x = 5$ the triple is $(5, 7, 12)$ with $5 + 7 = 12$ — degenerate, flat, refused; the boundary itself is excluded.',
                'Test the next value: at $x = 6$ the triple is $(6, 8, 13)$ with $6 + 8 = 14 > 13$ — genuine, accepted.',
                'Hence the triangle exists exactly when $x > 5$, and the smallest whole-number value is $x = 6$, giving the genuine triangle $6$, $8$, $13$.',
              ],
              answer: '$x > 5$; smallest whole number $x = 6$ (the triple $6, 8, 13$)',
            },
            {
              q: 'Classify the largest angle. A triangle has sides $4$, $5$ and $8$: show that $4^2 + 5^2 < 8^2$, deduce that the angle opposite the side $8$ is obtuse, and compute it to six decimals.',
              solution: [
                'Sol. Square and compare: $4^2 + 5^2 = 16 + 25 = 41$, while $8^2 = 64$ — so $41 < 64$, the signature of an obtuse angle opposite the longest side.',
                'Deduce with the cosine rule: $\\cos C = (16 + 25 - 64)/(2 \\cdot 4 \\cdot 5) = -23/40$, which is negative, so $C$ is obtuse — and by I.18 it is the largest angle of the triangle, opposite the longest side $8$.',
                'Compute it: $C = \\arccos(-23/40) = 125.099632°$ to six decimals.',
                'Sanity-check with the screen: $4 + 5 = 9 > 8$, so the triangle genuinely exists — obtuse, but real.',
                'Hence the largest angle is $C = 125.099632°$, obtuse because $41 < 64$ forces $\\cos C = -23/40 < 0$.',
              ],
              answer: 'obtuse: $C = \\arccos(-23/40) = 125.099632°$, opposite the side $8$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The median inequality (exam-style). Let $D$ be the midpoint of side $BC$ in triangle $ABC$. Prove that $AB + AC > 2AD$, and verify the inequality numerically on the witness $A(1, 5)$, $B(0, 0)$, $C(6, 0)$.',
              solution: [
                'Sol. Construct the reflection of $A$ through $D$: extend $AD$ beyond $D$ to the point $E$ with $DE = AD$, so that $AE = 2AD$.',
                'Prove the congruence: in triangles $ABD$ and $ECD$ we have $BD = DC$ ($D$ is the midpoint), $AD = DE$ (construction) and $\\angle ADB = \\angle EDC$ (vertically opposite angles at $D$) — so triangle $ABD \\cong$ triangle $ECD$ by SAS.',
                'Harvest the corresponding part: $EC = AB$.',
                'Apply I.20 to triangle $ACE$: the points $A$, $C$, $E$ are not collinear (the median from a non-degenerate triangle\u2019s vertex never lies along the side), so $AC + CE > AE$.',
                'Substitute the harvest: $AC + AB > 2AD$, the median inequality.',
                'Verify on the witness $A(1, 5)$, $B(0, 0)$, $C(6, 0)$: the midpoint is $D = (3, 0)$; $AB = \\sqrt{26} = 5.099020$ and $AC = \\sqrt{50} = 7.071068$, summing to $12.170087$; while $AD = \\sqrt{29} = 5.385165$, so $2AD = 10.770330$.',
                'Check the congruence numerically: $E = (5, -5)$, and indeed $EC = \\sqrt{26} = AB$ and $AE = 10.770330 = 2AD$ — the construction closes.',
                'Hence $AB + AC = 12.170087 > 10.770330 = 2AD$: the median inequality holds, proved by reflection + SAS + I.20 and certified on the witness.',
              ],
              answer: 'proved; on the witness $AB + AC = 12.170087 > 10.770330 = 2AD$',
            },
          ],
        },
      ],
    },
  ],
}

/* ================================================================== */
/* lesson 3.5 — from docs/research/geo-ch03-wip/part-geo305.ts            */
/* ================================================================== */
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
  parts.push(geo35Txt(X(gDm[0]) + 10, Y(gDm[1]) + 3, 'D(24, \u22129)', 12.5, c35.red, 'start'))
  parts.push(geo35Txt(X(gEm[0]) + 9, Y(gEm[1]) - 12, 'E(0, 3)', 12.5, c35.ink, 'start'))
  parts.push(geo35Txt(X(gFm[0]) - 2, Y(gFm[1]) + 20, 'F(6, 0)', 12.5, c35.ink))
  parts.push(geo35Txt(X(-2.7), Y(5), 'y = \u2212x/2 + 3', 12.5, c35.orange, 'start'))
  parts.push(geo35Txt(X(1.6), Y(4.5), 'CE/EA = 2', 12.5, c35.green, 'start'))
  parts.push(geo35Txt(X(gFm[0]) - 2, Y(-1.15), 'AF/FB = 1', 12.5, c35.green))
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
    parts.push(geo35Txt(X(gO[0]) + 9, Y(gO[1]) + 3, 'O(2, 3)', 12, c35.orange, 'start'))
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
    parts.push(geo35Txt(X(gFm[0]) + 8, Y(gFm[1]) + 4, 'F(6, 0)', 11.5, c35.ink, 'start'))
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
  parts.push(geo35Txt(X(gDm[0]) + 10, Y(gDm[1]) + 3, 'D(24, \u22129)', 12.5, c35.red, 'start'))
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

/* ================================================================== */
/* lesson 3.6 — from docs/research/geo-ch03-wip/part-geo306.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c36 = {
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
const f36 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo36 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo36Txt = (
  x: number, y: number, s: string,
  size = 13, color = c36.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f36}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo36Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c36.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo36Dot = (x: number, y: number, color = c36.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo36Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo36Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** the small right-angle square at a foot on a horizontal base, opening upward toward dir */
const geo36RightAngle = (x: number, y: number, dir: 1 | -1, color = c36.teal): string =>
  `<path d="M ${x} ${y} L ${x + 12 * dir} ${y} L ${x + 12 * dir} ${y - 12}" fill="none" stroke="${color}" stroke-width="1.6"/>`

/** a short vertical position tick on a horizontal line */
const geo36Tick = (x: number, y: number, color: string, h = 12, w = 2.4): string =>
  geo36Line(x, y - h / 2, x, y + h / 2, color, w)

/* ------------------------------------------------------------------ */
/* the witness mapper: math coords (x along BC from B, y up) to SVG    */
/* F1/F3 use origin (84, 390), scale 26; F2 uses (120, 390), scale 26  */
/* ------------------------------------------------------------------ */
const geo36W1 = (mx: number, my: number): [number, number] => [84 + mx * 26, 390 - my * 26]
const geo36W2 = (mx: number, my: number): [number, number] => [120 + mx * 26, 390 - my * 26]

/* ------------------------------------------------------------------ */
/* F1 — the Stewart anatomy on the 13-14-15 witness (cevian m = 6)     */
/* ------------------------------------------------------------------ */
const geo36F1 = (): string => {
  const B = geo36W1(0, 0), C = geo36W1(14, 0), A = geo36W1(9, 12)
  const D = geo36W1(6, 0), F = geo36W1(9, 0)
  const parts: string[] = []
  parts.push(geo36Line(60, 390, 470, 390, c36.ink, 2.5))
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(A[0], A[1], F[0], F[1], c36.teal, 2, '6 5'))
  parts.push(geo36Line(A[0], A[1], D[0], D[1], c36.orange, 2.7))
  parts.push(geo36RightAngle(F[0], F[1], 1))
  parts.push(geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4) + geo36Dot(A[0], A[1], c36.ink, 4.5))
  parts.push(geo36Dot(D[0], D[1], c36.orange, 4.5) + geo36Dot(F[0], F[1], c36.teal, 4))
  parts.push(geo36Txt(A[0], A[1] - 16, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(D[0], D[1] + 22, 'D', 13, c36.orange))
  parts.push(geo36Txt(F[0] - 12, F[1] - 16, 'F', 12, c36.teal, 'end'))
  parts.push(geo36Txt((B[0] + D[0]) / 2, 412, 'm = 6', 12.5, c36.mid))
  parts.push(geo36Txt((D[0] + C[0]) / 2, 412, 'n = 8', 12.5, c36.mid))
  parts.push(geo36Txt((B[0] + C[0]) / 2, 436, 'a = 14', 12.5, c36.ink))
  parts.push(geo36Txt(266, 234, 'd = 3\u221a17 \u2248 12.37', 12.5, c36.orange, 'end'))
  parts.push(geo36Txt(326, 234, 'h = 12', 12.5, c36.teal, 'start'))
  parts.push(geo36Txt(395, 234, 'b = 13', 12.5, c36.ink, 'start'))
  parts.push(geo36Txt(188, 210, 'c = 15', 12.5, c36.ink, 'end'))
  parts.push(geo36Txt(280, 30, 'THE STEWART ANATOMY ON THE 13\u201314\u201315 WITNESS', 13, c36.ink, 'middle', '700'))
  parts.push(geo36Txt(280, 52, 'cevian AD with BD = m, DC = n, AD = d', 11.5, c36.tealInk))
  return geo36Svg(560, 448, 'Triangle ABC with B at the left, C at the right and A above; a cevian from A meets BC at D splitting the base into m and n; the altitude to the foot F is dashed; sides b and c, the cevian length d and the height h are labelled.', parts)
}

/* ------------------------------------------------------------------ */
/* F2 — the three-cevian comparison from A + magnified foot strip      */
/* ------------------------------------------------------------------ */
const geo36F2 = (): string => {
  const B = geo36W2(0, 0), C = geo36W2(14, 0), A = geo36W2(9, 12)
  const M = geo36W2(7, 0), T = geo36W2(7.5, 0), F = geo36W2(9, 0)
  const parts: string[] = []
  parts.push(geo36Line(96, 390, 508, 390, c36.ink, 2.5))
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.4))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.ink, 2.4))
  parts.push(geo36Line(A[0], A[1], M[0], M[1], c36.orange, 2.6))
  parts.push(geo36Line(A[0], A[1], T[0], T[1], c36.amber, 2.6))
  parts.push(geo36Line(A[0], A[1], F[0], F[1], c36.teal, 2.6))
  parts.push(geo36RightAngle(F[0], F[1], 1))
  parts.push(geo36Dot(M[0], M[1], c36.orange, 4.5) + geo36Dot(T[0], T[1], c36.amber, 4.5) + geo36Dot(F[0], F[1], c36.teal, 4.5))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Txt(A[0], A[1] - 16, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(M[0], 412, 'M', 12.5, c36.orange))
  parts.push(geo36Txt(T[0], 432, 'T', 12.5, c36.amber))
  parts.push(geo36Txt(F[0], 412, 'F', 12.5, c36.teal))
  parts.push(geo36Txt(266, 188, 'c = 15', 12.5, c36.ink, 'end'))
  parts.push(geo36Txt(414, 204, 'b = 13', 12.5, c36.ink, 'start'))
  parts.push(geo36Rect(30, 56, 236, 118, c36.panel, c36.green))
  parts.push(geo36Txt(148, 78, 'FROM VERTEX A', 12.5, c36.ink, 'middle', '700'))
  parts.push(geo36Line(44, 98, 68, 98, c36.orange, 3))
  parts.push(geo36Txt(76, 102, 'median: 2\u221a37 \u2248 12.17', 11.5, c36.ink, 'start'))
  parts.push(geo36Line(44, 122, 68, 122, c36.amber, 3))
  parts.push(geo36Txt(76, 126, 'bisector: \u221a146.25 \u2248 12.09', 11.5, c36.ink, 'start'))
  parts.push(geo36Line(44, 146, 68, 146, c36.teal, 3))
  parts.push(geo36Txt(76, 150, 'altitude: 12 (exact)', 11.5, c36.ink, 'start'))
  parts.push(geo36Txt(330, 30, 'THE THREE-CEVIAN COMPARISON FROM VERTEX A', 13, c36.ink, 'middle', '700'))
  // the magnified foot strip: m in [5.5, 10.5] mapped to [150, 610]
  const stripX = (m: number): number => 150 + (m - 5.5) * 92
  parts.push(geo36Line(150, 470, 610, 470, c36.ink, 2))
  parts.push(geo36Tick(stripX(7), 470, c36.orange))
  parts.push(geo36Tick(stripX(7.5), 470, c36.amber))
  parts.push(geo36Tick(stripX(9), 470, c36.teal))
  parts.push(geo36Txt(stripX(7), 456, 'M = 7', 12, c36.orange))
  parts.push(geo36Txt(stripX(7.5), 494, 'T = 7.5', 12, c36.amber))
  parts.push(geo36Txt(stripX(9), 456, 'F = 9', 12, c36.teal))
  parts.push(geo36Txt(150, 494, 'towards B', 11, c36.tealInk, 'start'))
  parts.push(geo36Txt(610, 494, 'towards C', 11, c36.tealInk, 'end'))
  parts.push(geo36Txt(380, 516, 'the three feet on BC, magnified 3.5 times', 11.5, c36.tealInk))
  return geo36Svg(660, 528, 'The 13-14-15 witness triangle with three cevians from A: the orange median to M, the amber bisector to T and the teal altitude to F, with a legend of their lengths and a magnified strip showing the three feet at m = 7, 7.5 and 9.', parts)
}

/* ------------------------------------------------------------------ */
/* F3 — the centroid: all three medians and the 2:1 split              */
/* ------------------------------------------------------------------ */
const geo36F3 = (): string => {
  const B = geo36W1(0, 0), C = geo36W1(14, 0), A = geo36W1(9, 12)
  const M = geo36W1(7, 0), N = geo36W1(11.5, 6), P = geo36W1(4.5, 6)
  const G = geo36W1(23 / 3, 4)
  const parts: string[] = []
  parts.push(geo36Line(B[0], B[1], C[0], C[1], c36.ink, 2.5))
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(A[0], A[1], M[0], M[1], c36.green, 2.4))
  parts.push(geo36Line(B[0], B[1], N[0], N[1], c36.green, 2.4))
  parts.push(geo36Line(C[0], C[1], P[0], P[1], c36.green, 2.4))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Dot(M[0], M[1], c36.green, 4) + geo36Dot(N[0], N[1], c36.green, 4) + geo36Dot(P[0], P[1], c36.green, 4))
  parts.push(geo36Dot(G[0], G[1], c36.orange, 5.5))
  parts.push(geo36Txt(A[0], A[1] - 16, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(M[0], M[1] + 22, 'M', 12.5, c36.tealInk))
  parts.push(geo36Txt(N[0] + 14, N[1] - 2, 'N', 12.5, c36.tealInk, 'start'))
  parts.push(geo36Txt(P[0] - 14, P[1] - 2, 'P', 12.5, c36.tealInk, 'end'))
  parts.push(geo36Txt(G[0] + 14, G[1] - 2, 'G', 13.5, c36.orange, 'start', '700'))
  parts.push(geo36Txt(272, 274, '2 : 1', 11.5, c36.orange, 'end'))
  parts.push(geo36Txt(242, 304, '2 : 1', 11.5, c36.tealInk, 'end'))
  parts.push(geo36Txt(334, 314, '2 : 1', 11.5, c36.amber, 'start'))
  parts.push(geo36Rect(105, 424, 360, 54, c36.panel, c36.green))
  parts.push(geo36Txt(285, 446, 'm_a = 2\u221a37 \u2248 12.17 \u00b7 m_b = \u221a673/2 \u2248 12.97', 11.5, c36.ink))
  parts.push(geo36Txt(285, 468, 'm_c = \u221a505/2 \u2248 11.24 \u00b7 AG : GD = 2 : 1 on every median', 11.5, c36.ink))
  parts.push(geo36Txt(280, 30, 'THE CENTROID: THE 2 : 1 SPLIT ON ALL THREE MEDIANS', 13, c36.ink, 'middle', '700'))
  return geo36Svg(560, 490, 'The 13-15-13 labelled witness triangle with all three medians drawn in green: from A to the midpoint M of BC, from B to the midpoint N of CA and from C to the midpoint P of AB; the orange centroid dot G sits on all three, and each median carries a 2 to 1 tag; a legend lists the three median lengths.', parts)
}

/* ------------------------------------------------------------------ */
/* F4 — the cevian census parabola d²(m) = h² + (m − x)²               */
/* ------------------------------------------------------------------ */
const geo36F4 = (): string => {
  const mx = (m: number): number => 108 + m * 36
  const my = (v: number): number => 380 - (v - 130) * (320 / 105)
  const parts: string[] = []
  // axes
  parts.push(geo36Line(90, 380, 640, 380, c36.ink, 2.2))
  parts.push(geo36Line(mx(0), 380, mx(0), 52, c36.ink, 2.2))
  for (let m = 0; m <= 14; m += 2) {
    parts.push(geo36Tick(mx(m), 380, c36.ink, 8, 1.8))
    parts.push(geo36Txt(mx(m), 398, String(m), 11, c36.mid))
  }
  parts.push(geo36Tick(mx(9), 380, c36.teal, 10, 2.2))
  parts.push(geo36Txt(mx(9), 398, '9', 11, c36.teal))
  for (const v of [140, 160, 180, 200, 220]) {
    parts.push(geo36Line(mx(0) - 6, my(v), mx(0), my(v), c36.mid, 1.4))
    parts.push(geo36Txt(mx(0) - 10, my(v) + 4, String(v), 11, c36.mid, 'end'))
  }
  parts.push(geo36Txt(mx(0), 44, 'd\u00b2', 12.5, c36.ink))
  parts.push(geo36Txt(360, 422, 'm = BD, the position of D along the base from B (0) to C (14)', 11.5, c36.tealInk))
  // the parabola d² = 144 + (m − 9)²
  const pts: string[] = []
  for (let m = -0.5; m <= 14.5001; m += 0.5) pts.push(`${mx(m).toFixed(1)},${my(144 + (m - 9) ** 2).toFixed(1)}`)
  parts.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${c36.orange}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`)
  // twin-value line at d² = 169
  parts.push(geo36Line(mx(4), my(169), mx(14), my(169), c36.amber, 2, '7 5'))
  parts.push(geo36Txt(430, 250, 'd = 13 at m = 4 and at m = 14 (the side b)', 11.5, c36.amber))
  // dashed drop to the minimum
  parts.push(geo36Line(mx(9), 380, mx(9), my(144) + 4, c36.teal, 1.8, '5 4'))
  parts.push(geo36Txt(440, 356, 'altitude: d\u00b2 = 144', 11.5, c36.teal, 'start'))
  // census dots
  parts.push(geo36Dot(mx(0), my(225), c36.green, 4.5))
  parts.push(geo36Dot(mx(4), my(169), c36.green, 4.5))
  parts.push(geo36Dot(mx(6), my(153), c36.green, 4.5))
  parts.push(geo36Dot(mx(14), my(169), c36.green, 4.5))
  parts.push(geo36Dot(mx(7), my(148), c36.orange, 5))
  parts.push(geo36Dot(mx(7.5), my(146.25), c36.amber, 5))
  parts.push(geo36Dot(mx(9), my(144), c36.teal, 6))
  parts.push(geo36Dot(mx(10), my(145), c36.green, 4.5))
  // labels
  parts.push(geo36Txt(120, 84, '(0, 225) = c\u00b2', 11.5, c36.ink, 'start'))
  parts.push(geo36Txt(mx(4), 246, '(4, 169)', 11.5, c36.ink))
  parts.push(geo36Txt(296, 328, '(6, 153)', 11.5, c36.ink))
  parts.push(geo36Txt(mx(10), 322, '(10, 145)', 11.5, c36.ink))
  // legend for the median / bisector / minimum cluster
  parts.push(geo36Rect(150, 340, 260, 50, c36.panel, c36.green))
  parts.push(geo36Dot(166, 356, c36.orange, 4.5))
  parts.push(geo36Txt(178, 360, 'median (7, 148)', 11.5, c36.ink, 'start'))
  parts.push(geo36Dot(166, 372, c36.amber, 4.5))
  parts.push(geo36Txt(178, 376, 'bisector (7.5, 146.25)', 11.5, c36.ink, 'start'))
  parts.push(geo36Txt(330, 26, 'THE CEVIAN CENSUS: EVERY CEVIAN LENGTH FROM ONE PARABOLA', 13, c36.ink, 'middle', '700'))
  parts.push(geo36Txt(330, 48, 'd\u00b2 = h\u00b2 + (m \u2212 9)\u00b2 on the witness', 11.5, c36.tealInk))
  return geo36Svg(660, 436, 'A parabola plot: the squared cevian length d squared on the vertical axis against the split m from 0 to 14 on the horizontal axis, with the census points marked, the minimum at m = 9 labelled as the altitude, and a dashed twin line at d squared equals 169 through m = 4 and m = 14.', parts)
}

/* ------------------------------------------------------------------ */
/* S1 — solution figure: the Stewart anatomy at m = 4 (d = 13 = b)     */
/* ------------------------------------------------------------------ */
const geo36S1 = (): string => {
  const B: [number, number] = [70, 378], C: [number, number] = [406, 378], A: [number, number] = [286, 90]
  const D: [number, number] = [166, 378]
  const parts: string[] = []
  parts.push(`<polygon points="${A[0]},${A[1]} ${D[0]},${D[1]} ${C[0]},${C[1]}" fill="${c36.panel}" fill-opacity="0.5"/>`)
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.4))
  parts.push(geo36Line(B[0], B[1], C[0], C[1], c36.ink, 2.4))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.amber, 2.7))
  parts.push(geo36Line(A[0], A[1], D[0], D[1], c36.orange, 2.7))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Dot(D[0], D[1], c36.orange, 4.5))
  parts.push(geo36Txt(A[0], A[1] - 16, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(D[0], D[1] + 22, 'D', 13, c36.orange))
  parts.push(geo36Txt((B[0] + D[0]) / 2, 400, 'm = 4', 12.5, c36.mid))
  parts.push(geo36Txt((D[0] + C[0]) / 2, 400, 'n = 10', 12.5, c36.mid))
  parts.push(geo36Txt(238, 424, 'a = 14', 12.5, c36.ink))
  parts.push(geo36Txt(214, 238, 'd = 13', 12.5, c36.orange, 'end'))
  parts.push(geo36Txt(358, 238, 'b = 13', 12.5, c36.amber, 'start'))
  parts.push(geo36Txt(166, 210, 'c = 15', 12.5, c36.ink, 'end'))
  parts.push(geo36Txt(280, 430, 'AD = AC = 13, so triangle ADC is isosceles \u2014 DC = 10 is its base', 11.5, c36.tealInk))
  parts.push(geo36Txt(280, 30, 'THE STEWART ANATOMY: THE m = 4 CEVIAN', 12.5, c36.ink, 'middle', '700'))
  return geo36Svg(560, 440, 'The 13-14-15 witness with the cevian from A to the point D at m = 4 from B; the shaded triangle ADC has AD = AC = 13, so it is isosceles with base DC = 10.', parts)
}

/* ------------------------------------------------------------------ */
/* S2 — solution figure: the centroid 2:1 split, compact               */
/* ------------------------------------------------------------------ */
const geo36S2 = (): string => {
  const B: [number, number] = [70, 390], C: [number, number] = [406, 390], A: [number, number] = [286, 102]
  const M: [number, number] = [238, 390]
  const G: [number, number] = [254, 294]
  const parts: string[] = []
  parts.push(geo36Line(B[0], B[1], C[0], C[1], c36.ink, 2.4))
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.4))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.ink, 2.4))
  parts.push(geo36Line(A[0], A[1], M[0], M[1], c36.green, 2.6))
  parts.push(geo36Line(A[0], A[1], G[0], G[1], c36.orange, 3))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Dot(M[0], M[1], c36.green, 4) + geo36Dot(G[0], G[1], c36.orange, 5))
  parts.push(geo36Txt(A[0], A[1] - 14, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(M[0], M[1] + 22, 'M', 12.5, c36.tealInk))
  parts.push(geo36Txt(G[0] + 13, G[1] - 2, 'G', 13.5, c36.orange, 'start', '700'))
  parts.push(geo36Txt(262, 196, 'AG = 4\u221a37/3 \u2248 8.11', 12, c36.orange, 'end'))
  parts.push(geo36Txt(230, 346, 'GD = 2\u221a37/3 \u2248 4.06', 12, c36.amber, 'end'))
  parts.push(geo36Txt(276, 254, '2 : 1', 11.5, c36.ink, 'start'))
  parts.push(geo36Txt(280, 430, 'median AM = 2\u221a37 \u2248 12.17; AG : GD = 2 : 1', 11.5, c36.tealInk))
  parts.push(geo36Txt(280, 30, 'THE CENTROID 2 : 1 SPLIT ON THE WITNESS', 12.5, c36.ink, 'middle', '700'))
  return geo36Svg(560, 440, 'The witness triangle with the single median from A to the midpoint M of BC; the centroid G divides it with AG about 8.11 in orange and GD about 4.06 below, marked 2 to 1.', parts)
}

/* ------------------------------------------------------------------ */
/* S3 — solution figure: the equality case (isosceles 13-13-10)        */
/* ------------------------------------------------------------------ */
const geo36S3 = (): string => {
  const B: [number, number] = [60, 380], C: [number, number] = [320, 380], A: [number, number] = [190, 68]
  const F: [number, number] = [190, 380]
  const parts: string[] = []
  parts.push(geo36Line(B[0], B[1], C[0], C[1], c36.ink, 2.5))
  parts.push(geo36Line(B[0], B[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(C[0], C[1], A[0], A[1], c36.ink, 2.5))
  parts.push(geo36Line(A[0], A[1], F[0], F[1], c36.green, 2.8))
  parts.push(geo36RightAngle(F[0], F[1], 1))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.ink, 4) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Dot(F[0], F[1], c36.green, 4.5))
  parts.push(geo36Txt(A[0], A[1] - 16, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(F[0], F[1] + 22, 'M = T = F', 12, c36.tealInk))
  parts.push(geo36Txt((B[0] + F[0]) / 2, 402, '5', 12.5, c36.mid))
  parts.push(geo36Txt((F[0] + C[0]) / 2, 402, '5', 12.5, c36.mid))
  parts.push(geo36Txt(F[0], 424, '10', 12.5, c36.ink))
  parts.push(geo36Txt(120, 214, '13', 12.5, c36.ink, 'end'))
  parts.push(geo36Txt(262, 214, '13', 12.5, c36.ink, 'start'))
  parts.push(geo36Rect(330, 120, 200, 122, c36.panel, c36.green))
  parts.push(geo36Txt(430, 142, 'b = c: ALL THREE COINCIDE', 11.5, c36.ink, 'middle', '700'))
  parts.push(geo36Dot(348, 164, c36.orange, 4.5))
  parts.push(geo36Txt(360, 168, 'median: 12', 12, c36.ink, 'start'))
  parts.push(geo36Dot(348, 192, c36.amber, 4.5))
  parts.push(geo36Txt(360, 196, 'bisector: 12', 12, c36.ink, 'start'))
  parts.push(geo36Dot(348, 220, c36.teal, 4.5))
  parts.push(geo36Txt(360, 224, 'altitude: 12', 12, c36.ink, 'start'))
  parts.push(geo36Txt(280, 30, 'THE EQUALITY CASE: b = c MAKES ALL THREE COINCIDE', 12.5, c36.ink, 'middle', '700'))
  return geo36Svg(560, 430, 'An isosceles triangle with sides 13, 13 and base 10; the single segment from the apex A to the midpoint of the base carries all three roles at once, median, bisector and altitude, each of length 12, with the right angle marked at the foot.', parts)
}

/* ------------------------------------------------------------------ */
/* S4 — solution figure: a right-angle comparison (3-4-5 at B)         */
/* ------------------------------------------------------------------ */
const geo36S4 = (): string => {
  const B: [number, number] = [90, 390], C: [number, number] = [222, 390], A: [number, number] = [90, 214]
  const T: [number, number] = [148.7, 390], M: [number, number] = [156, 390]
  const parts: string[] = []
  parts.push(geo36Line(B[0], B[1], C[0], C[1], c36.ink, 2.4))
  parts.push(geo36Line(A[0], A[1], C[0], C[1], c36.ink, 2.4))
  parts.push(geo36Line(A[0], A[1], B[0], B[1], c36.teal, 2.8))
  parts.push(geo36Line(A[0], A[1], T[0], T[1], c36.amber, 2.6))
  parts.push(geo36Line(A[0], A[1], M[0], M[1], c36.orange, 2.6))
  parts.push(geo36RightAngle(B[0], B[1], 1))
  parts.push(geo36Dot(A[0], A[1], c36.ink, 4.5) + geo36Dot(B[0], B[1], c36.teal, 4.5) + geo36Dot(C[0], C[1], c36.ink, 4))
  parts.push(geo36Dot(T[0], T[1], c36.amber, 4.5) + geo36Dot(M[0], M[1], c36.orange, 4.5))
  parts.push(geo36Txt(A[0] - 12, A[1] - 6, 'A', 13.5, c36.ink))
  parts.push(geo36Txt(B[0] - 12, B[1] + 22, 'B', 13.5, c36.ink))
  parts.push(geo36Txt(C[0] + 12, C[1] + 22, 'C', 13.5, c36.ink))
  parts.push(geo36Txt(100, 302, 'c = 4', 12, c36.ink, 'start'))
  parts.push(geo36Txt(168, 296, 'b = 5', 12, c36.ink, 'start'))
  parts.push(geo36Txt(156, 436, 'a = 3', 12, c36.ink))
  parts.push(geo36Rect(250, 140, 292, 128, c36.panel, c36.green))
  parts.push(geo36Txt(396, 162, 'FROM VERTEX A', 12, c36.ink, 'middle', '700'))
  parts.push(geo36Line(264, 184, 288, 184, c36.teal, 3))
  parts.push(geo36Txt(296, 188, 'altitude = 4 (to B)', 11.5, c36.ink, 'start'))
  parts.push(geo36Line(264, 212, 288, 212, c36.amber, 3))
  parts.push(geo36Txt(296, 216, 'bisector = 4\u221a10/3 \u2248 4.22 (to T)', 11.5, c36.ink, 'start'))
  parts.push(geo36Line(264, 240, 288, 240, c36.orange, 3))
  parts.push(geo36Txt(296, 244, 'median = \u221a73/2 \u2248 4.27 (to M)', 11.5, c36.ink, 'start'))
  parts.push(geo36Txt(280, 30, 'A RIGHT-ANGLE COMPARISON', 13, c36.ink, 'middle', '700'))
  // the magnified foot strip: m in [-0.3, 3.3] mapped to [80, 500]
  const stripX = (m: number): number => 80 + (m + 0.3) * (420 / 3.6)
  parts.push(geo36Line(80, 470, 500, 470, c36.ink, 2))
  parts.push(geo36Tick(stripX(0), 470, c36.teal))
  parts.push(geo36Tick(stripX(4 / 3), 470, c36.amber))
  parts.push(geo36Tick(stripX(1.5), 470, c36.orange))
  parts.push(geo36Tick(stripX(3), 470, c36.ink))
  parts.push(geo36Txt(stripX(0), 456, 'B', 12, c36.teal))
  parts.push(geo36Txt(stripX(4 / 3), 494, 'T (4/3)', 12, c36.amber))
  parts.push(geo36Txt(stripX(1.5), 456, 'M (1.5)', 12, c36.orange))
  parts.push(geo36Txt(stripX(3), 456, 'C (3)', 12, c36.ink))
  parts.push(geo36Txt(290, 516, 'the feet on BC, magnified', 11.5, c36.tealInk))
  return geo36Svg(560, 528, 'A right triangle with the right angle at B, legs 3 and 4 and hypotenuse 5; from vertex A the altitude is the side AB itself of length 4, the bisector meets BC at T at 4 thirds from B and the median meets at the midpoint M; a legend lists the three lengths and a magnified strip shows the feet.', parts)
}

/* ================================================================== */
/* LESSON 3.6 — Stewart's Theorem and the Median Relation              */
/* ================================================================== */
export const lessonGeo306: Lesson = {
  id: 'geo-stewarts-theorem-and-the-median-relation',
  number: '3.6',
  title: "Stewart's Theorem and the Median Relation",
  concepts: [
    "Stewart's theorem",
    'cevian length',
    "Apollonius's theorem",
    'median relation',
    'centroid 2:1 split',
    'angle-bisector length',
    'the three-cevian comparison',
  ],
  objectives: [
    'State and apply Stewart\u2019s theorem $b^2 m + c^2 n = a(d^2 + mn)$ for a cevian of any split, under the chapter\u2019s notation law',
    'Derive Apollonius\u2019s median formula from Stewart and run the three-median census with the median-sum identity',
    'Locate the centroid by coordinates and prove the 2 : 1 split on every median',
    'Derive the angle-bisector length from Stewart by the ratio substitution and compute it on witnesses',
    'Order the altitude, the bisector and the median from one vertex, naming the equality cases honestly',
    'Read the cevian census parabola $d^2 = h^2 + (m - x)^2$ as the complete list of cevian lengths from one vertex',
  ],
  prerequisites: [
    'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
    'geo-inequalities-in-a-triangle-sides-and-angles',
  ],
  sources: ['geo-ch03-web-ground', 'cengage-m1-05'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The length question every builder asks' },
    {
      kind: 'para',
      text: 'Lesson 3.5 closed with a census of WHERE cevians go: Ceva\u2019s product told us when three of them meet at a point, and Menelaus\u2019 directed product told us when three points lie on a line. But a builder who straps a brace across a roof truss does not only ask where the brace lands. The brace must be CUT TO LENGTH, and a strut cut one centimetre short is as useless as one cut one centimetre long. This lesson finally asks the question every draftsperson, every structural engineer and every surveyor actually puts to geometry: given a triangle and a point on one of its sides, HOW LONG is the segment from the opposite vertex to that point? The king post of a roof, the diagonal brace of a gate, the strut of a bridge truss, the median cable of a suspension span \u2014 each is a cevian, and each must be ordered by length before it is ordered by number.',
    },
    {
      kind: 'para',
      text: 'Fix the notation once, in the chapter\u2019s law, and let it ride for the whole lesson. Triangle $ABC$ carries sides $a = BC$ opposite $A$, $b = CA$ opposite $B$ and $c = AB$ opposite $C$. A cevian from $A$ meets the side $BC$ at a point $D$; write $BD = m$ for the part of the base next to $B$ (and so next to the side $c$), $DC = n$ for the part next to $C$ (next to the side $b$), so that $a = m + n$, and write $d = AD$ for the cevian\u2019s length. Six letters, $a$, $b$, $c$, $m$, $n$, $d$, and one question: which of them determines the others? The answer we are about to earn is the finest bargain in elementary triangle geometry: the five lengths $a$, $b$, $c$, $m$, $n$ determine $d$ by a single equation, and that one equation is Stewart\u2019s theorem.',
    },
    {
      kind: 'para',
      text: 'Every number in this lesson is recomputed by an engine before it reaches the page, and the engine works on one fixed witness so that you can check every claim by hand. The witness is the 13-14-15 triangle: $a = BC = 14$, $b = CA = 13$, $c = AB = 15$, placed with $B$ at the origin, $C$ at $(14, 0)$ and $A$ at $(9, 12)$. That placement is not a lucky guess \u2014 the foot of the altitude from $A$ lands exactly at $(9, 0)$, the height is exactly $12$, and the area is exactly $84$. We will walk the witness placement by placement, then cut it by a median, a bisector, an altitude and two arbitrary cevians, computing every length two ways and checking that the two ways agree to the digit.',
    },
    {
      kind: 'para',
      text: 'The plan of the lesson follows the plan of the theorem. First Stewart\u2019s theorem itself, proved honestly from two Pythagorean squares. Then the two special cevians the theorem dignifies with names of their own: the median, whose formula is Apollonius\u2019s theorem and whose three-fold sum is a lovely identity, and the angle bisector, whose length formula falls out of Stewart by one substitution. Then the centroid, where the medians meet and split in the ratio 2 : 1. Finally the signature census: from ONE vertex, the altitude, the bisector and the median always fall in that order of length, and the full list of cevian lengths traces a parabola \u2014 a picture so clean that Stewart\u2019s algebra becomes a curve you can read with a finger.',
    },

    /* -------------------------------------------------------------- */
    /* 2. Stewart's theorem                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Stewart\u2019s theorem: one law for every cevian' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Cevian and cevian length',
      text: 'A segment drawn from one vertex of a triangle to a point on the opposite side is said to be a CEVIAN of the triangle. Thus, in triangle $ABC$, if $D$ lies on $BC$, then $AD$ is a cevian from $A$, with split $BD = m$, $DC = n$, $a = m + n$, and cevian length $d = AD$. The medians, the angle bisectors and the altitudes are all cevians \u2014 they are the three special splits of the same family, at $m = n$, at $m/n = c/b$, and at the foot of the perpendicular.',
    },
    {
      kind: 'para',
      text: 'Stewart\u2019s theorem is the tariff table for the whole family. It prices ONE cevian in the sides of the triangle and the two parts of the base \u2014 no angles, no areas, no trigonometry \u2014 and it prices every cevian at once: choose any split $m$ you like, and the same equation returns the matching $d$. Here is the theorem, in our notation law.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Stewart\u2019s theorem',
      text: 'Let $AD$ be a cevian of triangle $ABC$ with $BD = m$, $DC = n$, $a = m + n$ and $AD = d$. Then $b^2 m + c^2 n = a(d^2 + mn)$. Equivalently, solving for the cevian length, $d^2 = \\frac{b^2 m + c^2 n}{a} - mn$. The proof needs nothing beyond the Pythagorean theorem applied twice \u2014 the miracle is only that the awkward offset of the altitude\u2019s foot cancels out completely, whichever side of $D$ it falls on.',
    },
    {
      kind: 'para',
      text: 'Before the proof, fix the PAIRING, because the pairing is where every examination mark is lost and won. Read the left side $b^2 m + c^2 n$ letter by letter: $b = CA$ is the side that does NOT touch $B$, and it multiplies $m = BD$, the piece of the base that DOES sit at $B$; likewise $c = AB$ misses $C$ and multiplies $n = DC$, the piece at $C$. The memory hook is: EACH SQUARE TAKES THE PIECE AT THE VERTEX IT MISSES. Swap the pairing \u2014 write $b^2 n + c^2 m$ \u2014 and the equation is simply false; on our witness with $m = 4$ the correct left side is $169 \\cdot 4 + 225 \\cdot 10 = 2926$ while the swapped one is $2590$, a different number entirely. The engine behind this lesson checks both pairings so that the wrong one has nowhere to hide.',
    },
    {
      kind: 'derivation',
      title: 'Stewart\u2019s theorem from two right triangles',
      statement: 'For a cevian $AD$ with $BD = m$, $DC = n$, $a = m + n$, $d = AD$ in triangle $ABC$, prove that $b^2 m + c^2 n = a(d^2 + mn)$. The foot of the perpendicular from $A$ to the line $BC$ may fall between $B$ and $D$, between $D$ and $C$, or exactly ON $D$ \u2014 the proof must survive all three placements.',
      steps: [
        {
          label: 'Drop the perpendicular and sign the offset',
          formula: 'AF \\perp BC,\\quad AF = h,\\quad u = \\text{the signed offset of } F \\text{ from } D',
          explanation: 'Let $F$ be the foot of the perpendicular from $A$ to the line $BC$, with $AF = h$. Define the SIGNED offset $u$ so that $BF = m + u$ and $FC = n - u$ hold as algebra, whatever the picture: $u$ is positive when $F$ lies on the $C$-side of $D$, negative when $F$ lies on the $B$-side, and zero when $F$ coincides with $D$. One signed letter will carry all three pictures at once.',
        },
        {
          label: 'Pythagoras in triangle ABF',
          formula: 'c^2 = (m + u)^2 + h^2',
          explanation: 'Triangle $ABF$ is right-angled at $F$, and its horizontal leg is $BF = m + u$ by the signed convention. Squaring destroys the sign: this single line is correct whether $F$ sits left of $D$, right of $D$, or on $D$.',
        },
        {
          label: 'Pythagoras in triangle ACF',
          formula: 'b^2 = (n - u)^2 + h^2',
          explanation: 'Triangle $ACF$ is right-angled at $F$ with horizontal leg $FC = n - u$, again by the same signed convention. Two right triangles now share the height $h$ and the line $BC$ \u2014 the whole configuration is priced by $m$, $n$, $u$ and $h$.',
        },
        {
          label: 'Weight and add: n times the first plus m times the second',
          formula: 'm\\,b^2 + n\\,c^2 = m(n - u)^2 + n(m + u)^2 + (m + n)h^2',
          explanation: 'Multiply the $b^2$ line by $m$ and the $c^2$ line by $n$ and add. The choice of weights $m$ and $n$ is the entire trick of the proof: it is chosen so that the cross terms $-2mnu$ and $+2nmu$ cancel exactly in the expansion, leaving nothing asymmetric behind.',
        },
        {
          label: 'Expand and watch the offset cancel',
          formula: 'm(n - u)^2 + n(m + u)^2 = mn(m + n) + (m + n)u^2',
          explanation: 'Expanding: $mn^2 - 2mnu + mu^2 + nm^2 + 2nmu + nu^2 = mn(m + n) + (m + n)u^2$. The signed offset survives only as $u^2$ \u2014 its sign, and with it the picture-dependence, is gone. This is the algebraic heart of Stewart\u2019s theorem.',
        },
        {
          label: 'Recognise the cevian length',
          formula: 'd^2 = u^2 + h^2 \\quad\\text{(triangle AFD)}',
          explanation: 'Triangle $AFD$ is right-angled at $F$ with legs $|u| = FD$ and $h$, so $d^2 = u^2 + h^2$. Substituting, the whole right side becomes $(m + n)(mn + u^2 + h^2) = a(mn + d^2)$, since $m + n = a$.',
        },
        {
          label: 'Conclude',
          formula: 'b^2 m + c^2 n = a(d^2 + mn)',
          explanation: 'Both sides equal $(m + n)(mn + u^2 + h^2)$, so they are equal to each other. The engine verifies the landing at $m = 4$ (foot between $D$ and $C$), at $m = 10$ (foot between $B$ and $D$) and at $m = 9$ (foot exactly on $D$, the altitude itself) \u2014 all three sign cases, one algebra.',
        },
      ],
      result: 'For every cevian $AD$ of every triangle, $b^2 m + c^2 n = a(d^2 + mn)$ \u2014 equivalently $d^2 = \\frac{b^2 m + c^2 n}{a} - mn$. The engine certifies the identity over a grid of triangles and every interior split, plus both sign cases and the foot-on-$D$ case on the witness.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'What the proof really shows',
      text: 'Strip the bookkeeping and the proof says something unforgettable: every cevian from $A$ satisfies $d^2 = h^2 + u^2$, the square of the height plus the square of the offset of its foot from the altitude\u2019s foot. That is just Pythagoras in triangle $AFD$ \u2014 of course it is true. Stewart\u2019s theorem is this one Pythagorean fact, re-expressed in quantities you are actually GIVEN ($a$, $b$, $c$, $m$, $n$) instead of the ones you are not ($h$, $u$). When we reach the cevian census at the end of the lesson, we will plot $d^2$ against $m$ and watch this relation become a parabola.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The swap trap',
      text: 'The commonest Stewart error in examinations is the swapped pairing $b^2 n + c^2 m$. The trap is seductive because the swapped equation is DIMENSIONALLY perfect and even comes true in special cases \u2014 when $m = n$ (the median) or $b = c$ (isosceles at $A$) the two pairings coincide, so a student who drills only those cases never meets the failure. Drill the witness instead: at $m = 4$, $n = 10$ the correct pairing gives $169 \\cdot 4 + 225 \\cdot 10 = 2926$ and the swapped one gives $2590$; only the first satisfies the theorem with $d = 13$. Say the hook aloud as you write the formula: each square takes the piece at the vertex it misses.',
    },
    {
      kind: 'formula',
      name: 'Stewart\u2019s theorem (cevian length)',
      latex: 'b^2 m + c^2 n = a(d^2 + mn),\\qquad d^2 = \\frac{b^2 m + c^2 n}{a} - mn',
      note: 'each side-square multiplies the base piece at the vertex it misses; true for every split $m$, every sign of the altitude offset',
    },
    {
      kind: 'para',
      text: 'Notice what the theorem does NOT need: it never asks whether the cevian is perpendicular, or bisects an angle, or anything about angles at all. It is a pure length tariff. Given $a$, $b$, $c$ and the split $m$, the length $d$ is one substitution away; and \u2014 running the theorem backwards \u2014 given a length $d$, the split $m$ solves a quadratic equation, a reversal we will exercise on the witness, where a cevian of length exactly $13$ turns out to hide two possible landing points, one genuine and one degenerate. But first, the witness itself.',
    },
    /* -------------------------------------------------------------- */
    /* 3. the witness triangle, fully walked                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The witness triangle: one triangle, every cevian' },
    {
      kind: 'para',
      text: 'Every number this lesson prints is certified on one fixed witness, and the witness is chosen so that a reader with graph paper can check everything by hand. Take the 13-14-15 triangle with $a = BC = 14$, $b = CA = 13$ and $c = AB = 15$, and place it with $B$ at the origin and $C$ at $(14, 0)$. Where must the apex $A$ go? If $A = (x, h)$ with $h > 0$, the distance formula demands $AB = 15$ and $AC = 13$ at once. Eliminating $h$ between the two squared equations gives the placement law $x = (c^2 + a^2 - b^2)/(2a)$, which here reads $x = (225 + 196 - 169)/28 = 252/28 = 9$; then $h = \\sqrt{c^2 - x^2} = \\sqrt{225 - 81} = 12$ exactly. So $A = (9, 12)$, and the whole witness is pinned to the grid with integer coordinates throughout.',
    },
    {
      kind: 'para',
      text: 'The area now falls out twice, from two independent machines, and the agreement is the first integrity check of the lesson. By base times height the area is $\\frac{1}{2} \\cdot 14 \\cdot 12 = 84$. By Heron\u2019s formula the semiperimeter is $s = 21$, and $s(s-a)(s-b)(s-c) = 21 \\cdot 8 \\cdot 7 \\cdot 6 = 7056$, whose square root is exactly $84$. Better still, the altitude\u2019s foot $F = (9, 0)$ splits the base into $BF = 9$ and $FC = 5$, and the witness turns out to be two classical right triangles glued at the altitude: triangle $ABF$ is the $9$-$12$-$15$ (the $3$-$4$-$5$ triple scaled by three) and triangle $AFC$ is the $5$-$12$-$13$. The cosines come free with the same split: $\\cos B = 9/15 = 3/5$, $\\cos C = 5/13$, and $\\cos A = 33/65$. Nothing in this triangle is accidental, which is exactly why it can carry the whole lesson.',
    },
    {
      kind: 'figure',
      caption: 'Figure 1 \u2014 the Stewart anatomy on the witness: a cevian $AD$ at the split $m = 6$, $n = 8$ with length $d = 3\\sqrt{17} \\approx 12.37$, the dashed altitude $AF = 12$ to its foot $F$ at $m = 9$, and the sides $b = 13$, $c = 15$ labelled. One picture carries the entire notation law of the lesson.',
      svg: geo36F1(),
    },
    {
      kind: 'para',
      text: 'Figure 1 shows the anatomy at one particular split, $m = 6$, $n = 8$. Run Stewart on it right now, as a first taste: the left side is $b^2 m + c^2 n = 169 \\cdot 6 + 225 \\cdot 8 = 1014 + 1800 = 2814$; dividing by $a = 14$ gives $201$; subtracting $mn = 48$ leaves $d^2 = 153$, so $d = \\sqrt{153} = 3\\sqrt{17} \\approx 12.37$. The coordinate route must agree: $D = (6, 0)$ and $A = (9, 12)$, so $d^2 = (9 - 6)^2 + 12^2 = 9 + 144 = 153$. Two utterly different computations, one answer \u2014 that agreement is what the rest of the lesson industrialises. The engine behind the page recomputes it at every split, and the census section will show all of these lengths living on one parabola.',
    },
    {
      kind: 'example',
      title: 'Set up the 13-14-15 witness completely: place the vertices, verify the sides, compute the area two independent ways, and name the two right triangles the altitude cuts out.',
      steps: [
        'Sol. Place $B = (0, 0)$ and $C = (14, 0)$, so the base $BC$ has length $a = 14$ along the $x$-axis, and write the apex as $A = (x, h)$ with $h > 0$.',
        'Translate the side demands into equations: $AB = 15$ gives $x^2 + h^2 = 225$, and $AC = 13$ gives $(x - 14)^2 + h^2 = 169$.',
        'Subtract to eliminate $h$: $x^2 - (x - 14)^2 = 56$, that is $28x - 196 = 56$, so $x = 252/28 = 9$ \u2014 the placement law $x = (c^2 + a^2 - b^2)/(2a)$ in action.',
        'Recover the height: $h = \\sqrt{225 - 81} = \\sqrt{144} = 12$, so $A = (9, 12)$; check by distance formula that $AC = \\sqrt{(9 - 14)^2 + 144} = \\sqrt{25 + 144} = 13$.',
        'Compute the area by base times height: $\\frac{1}{2} \\cdot 14 \\cdot 12 = 84$.',
        'Now, cross-check with Heron: $s = (14 + 13 + 15)/2 = 21$, and $\\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$ \u2014 the two machines agree exactly.',
        'Read off the two right triangles the altitude cuts out: $ABF$ with legs $9$ and $12$ and hypotenuse $15$ (the $3$-$4$-$5$ family), and $AFC$ with legs $5$ and $12$ and hypotenuse $13$ \u2014 indeed $81 + 144 = 225$ and $25 + 144 = 169$.',
        'Hence the witness sits at $B(0, 0)$, $C(14, 0)$, $A(9, 12)$ with area $84$, and every cevian from $A$ to a point $D = (m, 0)$ of the base will have length $d = \\sqrt{(9 - m)^2 + 144}$ \u2014 the coordinate tariff the whole lesson checks against.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 4. Apollonius: the median case                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Apollonius\u2019s theorem: the median case' },
    {
      kind: 'para',
      text: 'The first special cevian is the one every course examines first: the MEDIAN, the cevian to the midpoint of the base, with split $m = n = a/2$. Because the split is symmetric, Stewart\u2019s equation simplifies dramatically, and the simplified form has been known for so long that it carries its own name \u2014 Apollonius\u2019s theorem, after Apollonius of Perga, who worked roughly eighteen centuries before Stewart. The derivation below is one substitution and two lines of algebra; the point of displaying it as a derivation rather than quoting it is that you then never have to memorise the median formula as a separate fact \u2014 it is Stewart at $m = n$, recoverable in fifteen seconds whenever the exact shape of it slips your mind.',
    },
    {
      kind: 'derivation',
      title: 'Apollonius from Stewart, and the median-sum identity',
      statement: 'For the median from $A$ in triangle $ABC$ \u2014 the cevian with $m = n = a/2$ \u2014 prove that $d^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$, and deduce that the three medians $m_a$, $m_b$, $m_c$ satisfy $m_a^2 + m_b^2 + m_c^2 = \\frac{3}{4}(a^2 + b^2 + c^2)$.',
      steps: [
        {
          label: 'Substitute the symmetric split',
          formula: 'm = n = \\tfrac{a}{2}',
          explanation: 'The median meets $BC$ at its midpoint, so $BD = DC = a/2$. Write this into Stewart\u2019s theorem $b^2 m + c^2 n = a(d^2 + mn)$: the left side becomes $\\frac{a}{2}(b^2 + c^2)$ and the product $mn$ becomes $\\frac{a^2}{4}$.',
        },
        {
          label: 'Divide by a and isolate',
          formula: 'd^2 = \\tfrac{b^2 + c^2}{2} - \\tfrac{a^2}{4} = \\tfrac{2b^2 + 2c^2 - a^2}{4}',
          explanation: 'Dividing $\\frac{a}{2}(b^2 + c^2) = a(d^2 + \\frac{a^2}{4})$ by $a$ and tidying gives Apollonius\u2019s theorem. On the witness it reads $d^2 = (338 + 450 - 196)/4 = 592/4 = 148$, so the median is $2\\sqrt{37} \\approx 12.165525$ \u2014 and Stewart\u2019s own cross-check holds: $169 \\cdot 7 + 225 \\cdot 7 = 2758 = 14 \\cdot (148 + 49)$.',
        },
        {
          label: 'Cycle the letters',
          formula: 'm_b^2 = \\tfrac{2c^2 + 2a^2 - b^2}{4},\\; m_c^2 = \\tfrac{2a^2 + 2b^2 - c^2}{4}',
          explanation: 'The median from $B$ plays the same game on the base $CA$, and the median from $C$ on the base $AB$ \u2014 the notation law cycles automatically. On the witness: $m_b^2 = 673/4 = 168.25$ and $m_c^2 = 505/4 = 126.25$, each confirmed by the engine as a direct midpoint distance.',
        },
        {
          label: 'Add all three',
          formula: 'm_a^2 + m_b^2 + m_c^2 = \\tfrac{3(a^2 + b^2 + c^2)}{4}',
          explanation: 'Sum the three numerators: $(2b^2 + 2c^2 - a^2) + (2c^2 + 2a^2 - b^2) + (2a^2 + 2b^2 - c^2) = 3(a^2 + b^2 + c^2)$, because each square appears twice with a plus and once with a minus, netting $+2 - 1 = +1$ copies three times over.',
        },
        {
          label: 'Conclude on the witnesses',
          formula: '148 + 168.25 + 126.25 = 442.5 = \\tfrac{3}{4} \\cdot 590',
          explanation: 'On the 13-14-15 witness the identity reads $442.5 = \\frac{3}{4}(196 + 169 + 225)$; on the small witness $(a, b, c) = (4, 5, 6)$ it reads $26.5 + 19.75 + 11.5 = 57.75 = \\frac{3}{4} \\cdot 77$. The engine verifies both readings digit for digit, and Exercise 12 asks you to run the second one yourself.',
        },
      ],
      result: 'The median from $A$ has $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$ (Apollonius, the $m = n = a/2$ case of Stewart), and the three medians always satisfy $m_a^2 + m_b^2 + m_c^2 = \\frac{3}{4}(a^2 + b^2 + c^2)$ \u2014 the median-sum identity, verified on the 13-14-15 witness as $148 + 168.25 + 126.25 = 442.5$.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Median and Apollonius\u2019s theorem',
      text: 'A MEDIAN of a triangle is the cevian from a vertex to the midpoint of the opposite side \u2014 the split $m = n = a/2$. APOLLONIUS\u2019S THEOREM (the median relation) gives its length: $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$. Every triangle has three medians, one per vertex, and their squared lengths always sum to $\\frac{3}{4}(a^2 + b^2 + c^2)$. On the witness the three medians measure $m_a = 2\\sqrt{37} \\approx 12.165525$, $m_b = \\sqrt{673}/2 \\approx 12.971122$ and $m_c = \\sqrt{505}/2 \\approx 11.236103$.',
    },
    {
      kind: 'formula',
      name: 'Apollonius\u2019s theorem (the median relation)',
      latex: 'm_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4},\\;\\; \\text{the } m = n = \\tfrac{a}{2} \\text{ case of Stewart}',
      note: 'the instant median formula: two squares of the flanking sides, minus the square of the base, over four \u2014 recoverable from Stewart in fifteen seconds',
    },
    {
      kind: 'formula',
      name: 'The median-sum identity',
      latex: 'm_a^2 + m_b^2 + m_c^2 = \\tfrac{3}{4}\\,(a^2 + b^2 + c^2)',
      note: 'all three medians at once: on the witness $148 + 168.25 + 126.25 = 442.5 = \\frac{3}{4} \\cdot 590$; a favourite examination shortcut',
    },
    {
      kind: 'para',
      text: 'Two remarks before moving on. First, the median-sum identity is a genuine census: it prices all three medians in one line, and it makes some examination questions instant \u2014 given the three sides, the sum of the squared medians is $\\frac{3}{4}$ of the sum of the squared sides, no matter which vertex you measure from. Second, the identity has a structural reading: the medians of a triangle are the sides of a related triangle (their total square is three quarters of the original total), which is one way to see that medians can themselves form a triangle \u2014 a fact the chapter returns to when it builds the median triangle. The engine confirms the census on every witness it sweeps.',
    },
    /* -------------------------------------------------------------- */
    /* 5. the centroid and the 2:1 split                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The centroid: three medians, one point, the 2 : 1 split' },
    {
      kind: 'para',
      text: 'Lesson 3.5 proved with Ceva that the three medians of any triangle are concurrent: each median splits its base in the ratio $1 : 1$, the product around the triangle is $1 \\cdot 1 \\cdot 1 = 1$, and Ceva\u2019s product test fires. But Ceva is silent about WHERE along each median the meeting point sits. The answer is one of the most useful facts in elementary geometry: the medians meet at the CENTROID, and the centroid divides every median in the ratio $2 : 1$ \u2014 two parts from the vertex, one part from the base. A carpenter who balances a triangular plate on a fingertip has found this point experimentally; the derivation below finds it exactly, by the honest coordinate route.',
    },
    {
      kind: 'derivation',
      title: 'The centroid 2 : 1 split, by coordinates',
      statement: 'Prove that the three medians of triangle $ABC$ meet at the single point $G = \\left(\\frac{x_A + x_B + x_C}{3}, \\frac{y_A + y_B + y_C}{3}\\right)$, and that $G$ divides each median in the ratio $2 : 1$ from the vertex: $AG = 2\\,GM$, where $M$ is the midpoint of $BC$.',
      steps: [
        {
          label: 'Name the midpoint',
          formula: 'M = \\left(\\tfrac{x_B + x_C}{2}, \\tfrac{y_B + y_C}{2}\\right)',
          explanation: 'The median from $A$ runs from $A$ to the midpoint $M$ of the opposite side. Points on the segment $AM$ can be written as $(1 - t)A + tM$ for $0 \\le t \\le 1$: at $t = 0$ we stand at $A$, at $t = 1$ we stand at $M$.',
        },
        {
          label: 'Walk two thirds of the way',
          formula: 'G = \\tfrac{1}{3}A + \\tfrac{2}{3}M',
          explanation: 'Take $t = \\frac{2}{3}$, two thirds of the way from the vertex. Expanding $\\frac{1}{3}A + \\frac{2}{3}M = \\frac{1}{3}A + \\frac{1}{3}B + \\frac{1}{3}C$, because $\\frac{2}{3} \\cdot \\frac{1}{2} = \\frac{1}{3}$ in each coordinate.',
        },
        {
          label: 'Watch the symmetry',
          formula: 'G = \\tfrac{A + B + C}{3}',
          explanation: 'The point $G = \\frac{1}{3}(A + B + C)$ \u2014 the coordinate average of the three vertices \u2014 is symmetric in $A$, $B$ and $C$. Re-run the same two-thirds walk from $B$ toward the midpoint of $CA$, or from $C$ toward the midpoint of $AB$: the same symmetric formula comes out. So all three medians pass through the one point $G$, which is the concurrency Ceva promised, now located exactly.',
        },
        {
          label: 'Read off the ratio',
          formula: 'AG = \\tfrac{2}{3}\\,AM,\\;\\; GM = \\tfrac{1}{3}\\,AM',
          explanation: 'Since $G$ sits at parameter $t = \\frac{2}{3}$ of the walk from $A$ to $M$, the vertex-side piece is $\\frac{2}{3}$ of the whole median and the base-side piece is $\\frac{1}{3}$ \u2014 the ratio $AG : GM = 2 : 1$ on every median of every triangle, with no metric input at all: this argument never measured a length.',
        },
        {
          label: 'Witness it on the 13-14-15 triangle',
          formula: 'G = \\left(\\tfrac{23}{3}, 4\\right),\\; AG = \\tfrac{4\\sqrt{37}}{3} \\approx 8.110350',
          explanation: 'With $B = (0,0)$, $C = (14,0)$, $A = (9,12)$: $G = ((9 + 0 + 14)/3, (12 + 0 + 0)/3) = (23/3, 4)$. The midpoint of $BC$ is $M = (7, 0)$, the median has length $2\\sqrt{37} \\approx 12.165525$, and $AG = \\frac{2}{3} \\cdot 2\\sqrt{37} = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$ while $GM = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$ \u2014 the engine certifies both by direct distance, and certifies $BG = 2\\,GN$ and $CG = 2\\,GP$ on the other two medians as well.',
        },
      ],
      result: 'The medians are concurrent at the centroid $G = \\frac{1}{3}(A + B + C)$, and each median is split in the ratio $2 : 1$ from the vertex: $AG = \\frac{2}{3}$ of the median from $A$, $GM = \\frac{1}{3}$. On the witness, $G = (23/3, 4)$ with $AG = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$ and $GM = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$.',
    },
    {
      kind: 'figure',
      caption: 'Figure 2 \u2014 the centroid on the witness: all three medians in green, from $A$ to the midpoint $M$ of $BC$, from $B$ to the midpoint $N$ of $CA$ and from $C$ to the midpoint $P$ of $AB$; the orange centroid dot $G$ lies on all three, and every median carries its $2 : 1$ tag. The legend lists the three median lengths.',
      svg: geo36F3(),
    },
    {
      kind: 'para',
      text: 'Figure 2 is the picture to carry in your head: three medians, one shared point, three tags all reading $2 : 1$. On the witness the other two medians measure $m_b = \\sqrt{673}/2 \\approx 12.971122$ (from $B$ to the midpoint $N = (11.5, 6)$ of $CA$) and $m_c = \\sqrt{505}/2 \\approx 11.236103$ (from $C$ to the midpoint $P = (4.5, 6)$ of $AB$), and the engine\u2019s direct-distance check gives $BG = \\sqrt{673}/3$ against $GN = \\sqrt{673}/6$, and $CG = \\sqrt{505}/3$ against $GP = \\sqrt{505}/6$ \u2014 the doubled ratio holds on all three medians at once, exactly as the symmetric derivation promised. Note also what the centroid is NOT: it is not the meeting point of the altitudes (that is the orthocenter) nor of the perpendicular bisectors (that is the circumcenter). It is the medians\u2019 own point, and the $2 : 1$ law is its fingerprint.',
    },
    {
      kind: 'formula',
      name: 'The centroid 2 : 1 split',
      latex: 'G = \\tfrac{A + B + C}{3},\\;\\; AG = \\tfrac{2}{3}\\,m_a,\\;\\; GM = \\tfrac{1}{3}\\,m_a',
      note: 'the centroid averages the vertices and takes two thirds of every median from the vertex side; on the witness $G = (23/3, 4)$ and $AG = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$',
    },
    {
      kind: 'example',
      title: 'Locate the centroid of the 13-14-15 witness, verify the 2 : 1 split by direct distance on the median from $A$, and confirm the split on the other two medians as well.',
      steps: [
        'Sol. Write down the vertices: $A = (9, 12)$, $B = (0, 0)$, $C = (14, 0)$, and average them coordinate-wise.',
        'Compute the centroid: $G = \\left(\\frac{9 + 0 + 14}{3}, \\frac{12 + 0 + 0}{3}\\right) = \\left(\\frac{23}{3}, 4\\right) \\approx (7.667, 4)$.',
        'Take the median from $A$: the midpoint of $BC$ is $M = (7, 0)$, and Apollonius (or the direct distance $\\sqrt{(9-7)^2 + 144} = \\sqrt{148}$) gives the whole median $AM = 2\\sqrt{37} \\approx 12.165525$.',
        'Now, measure $AG$ directly: $AG = \\sqrt{\\left(9 - \\frac{23}{3}\\right)^2 + (12 - 4)^2} = \\sqrt{\\frac{16}{9} + 64} = \\sqrt{\\frac{592}{9}} = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$.',
        'Measure $GM$ directly: $GM = \\sqrt{\\left(\\frac{23}{3} - 7\\right)^2 + 4^2} = \\sqrt{\\frac{4}{9} + 16} = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$.',
        'Check the ratio: $8.110350 = 2 \\cdot 4.055175$ exactly \u2014 the split on this median is $2 : 1$ to the digit, and both pieces rebuild the median: $\\frac{4\\sqrt{37}}{3} + \\frac{2\\sqrt{37}}{3} = 2\\sqrt{37}$.',
        'Confirm the other medians: from $B$, $BG = \\sqrt{\\frac{529}{9} + 16} = \\frac{\\sqrt{673}}{3} \\approx 8.647415$ against $GN = \\frac{\\sqrt{673}}{6}$ to the midpoint $N = (11.5, 6)$; from $C$, $CG = \\frac{\\sqrt{505}}{3} \\approx 7.490737$ against $GP = \\frac{\\sqrt{505}}{6}$ \u2014 doubled again on both.',
        'Hence $G = (23/3, 4)$ is the centroid, and every median of the witness is split $2 : 1$ from the vertex, three independent distance computations agreeing with the parameter walk.',
      ],
      figures: [
        {
          caption: 'The centroid 2 : 1 split on the witness, drawn for the solution: the single median from $A$ to the midpoint $M$, the centroid $G$ on it, with $AG = 4\\sqrt{37}/3 \\approx 8.11$ in orange above $G$ and $GM = 2\\sqrt{37}/3 \\approx 4.06$ below \u2014 the $2 : 1$ tag between them.',
          svg: geo36S2(),
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 6. the angle-bisector length                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The angle bisector: one substitution' },
    {
      kind: 'para',
      text: 'The second special cevian is the ANGLE BISECTOR from $A$ \u2014 the cevian that splits the angle at $A$ into two equal pieces. Lesson 3.3 constructed it with compass and straightedge, and the angle-bisector theorem of that lesson fixed its split: the bisector meets $BC$ at the point $D$ with $\\frac{m}{n} = \\frac{c}{b}$ \u2014 the pieces of the base are proportional to the flanking sides. Solve that ratio together with $m + n = a$ and the split is pinned: $m = \\frac{ac}{b + c}$ and $n = \\frac{ab}{b + c}$. On the witness, $\\frac{m}{n} = \\frac{15}{13}$ with $m + n = 14$ gives $m = 7.5$ and $n = 6.5$ \u2014 clean halves-and-quarters, no wonder the engine keeps this triangle on retainer.',
    },
    {
      kind: 'derivation',
      title: 'The angle-bisector length from Stewart',
      statement: 'For the bisector of angle $A$ in triangle $ABC$, with split $m = \\frac{ac}{b + c}$, $n = \\frac{ab}{b + c}$, prove that the bisector length $\\ell$ satisfies $\\ell^2 = bc\\left(1 - \\frac{a^2}{(b + c)^2}\\right)$, equivalently $\\ell^2 = bc - mn$.',
      steps: [
        {
          label: 'Write the defining split',
          formula: 'm = \\tfrac{ac}{b+c},\\;\\; n = \\tfrac{ab}{b+c}',
          explanation: 'The angle-bisector ratio $\\frac{m}{n} = \\frac{c}{b}$ plus $m + n = a$ solves to these two values. Check the ratio: $\\frac{m}{n} = \\frac{ac}{ab} = \\frac{c}{b}$, as demanded. On the witness: $m = \\frac{14 \\cdot 15}{28} = 7.5$ and $n = \\frac{14 \\cdot 13}{28} = 6.5$.',
        },
        {
          label: 'Substitute into Stewart',
          formula: 'b^2 \\cdot \\tfrac{ac}{b+c} + c^2 \\cdot \\tfrac{ab}{b+c} = a(d^2 + mn)',
          explanation: 'Stewart holds for EVERY cevian, so it holds for this one. The mission is to simplify the left side \u2014 and it collapses completely.',
        },
        {
          label: 'Watch the left side collapse',
          formula: 'b^2 m + c^2 n = \\tfrac{abc(b + c)}{b+c} = abc',
          explanation: 'Factor the common $\\frac{abc}{b+c}$ out of $\\frac{ab^2 c}{b+c} + \\frac{abc^2}{b+c}$: what remains is $b + c$, which cancels the denominator. This collapse $b^2 m + c^2 n = abc$ is the cleanest route to the formula \u2014 on the witness it reads $169 \\cdot 7.5 + 225 \\cdot 6.5 = 2730 = 13 \\cdot 15 \\cdot 14$.',
        },
        {
          label: 'Divide by a and read the first form',
          formula: 'd^2 = bc - mn',
          explanation: 'Since $abc = a(d^2 + mn)$, divide by $a$: $d^2 = bc - mn$. On the witness: $195 - 48.75 = 146.25$, so the bisector has $\\ell = \\sqrt{146.25} \\approx 12.093387$. The full Stewart check: $a(d^2 + mn) = 14 \\cdot (146.25 + 48.75) = 14 \\cdot 195 = 2730$ \u2014 equal to the collapsed left side, to the digit.',
        },
        {
          label: 'Rewrite as the standard form',
          formula: '\\ell^2 = bc\\left(1 - \\tfrac{a^2}{(b+c)^2}\\right)',
          explanation: 'The product of the splits is $mn = \\frac{a^2 bc}{(b+c)^2}$, so $d^2 = bc - mn = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right)$. On the witness: $195 \\cdot \\left(1 - \\frac{196}{784}\\right) = 195 \\cdot \\frac{588}{784} = 195 \\cdot 0.75 = 146.25$ \u2014 the same number from a second road.',
        },
        {
          label: 'Conclude',
          formula: '\\ell^2 = bc - mn = bc\\left(1 - \\tfrac{a^2}{(b+c)^2}\\right)',
          explanation: 'Both forms are worth knowing: $bc - mn$ for fast substitution once the split is computed, the factored form for questions that give only the sides. The engine verifies the substitution algebra and both witness readings, $146.25$ and $12.093387$.',
        },
      ],
      result: 'The angle bisector from $A$ has $\\ell^2 = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = bc - mn$, where $m = \\frac{ac}{b+c}$, $n = \\frac{ab}{b+c}$. On the witness: $\\ell^2 = 146.25$, $\\ell \\approx 12.093387$, with the Stewart cross-check $2730 = 2730$.',
    },
    {
      kind: 'formula',
      name: 'Angle-bisector length',
      latex: '\\ell^2 = bc\\left(1 - \\tfrac{a^2}{(b+c)^2}\\right) = bc - mn,\\;\\; m = \\tfrac{ac}{b+c},\\; n = \\tfrac{ab}{b+c}',
      note: 'the sides flanking the angle, times one minus the square of the base over the square of their sum; on the witness $195 \\cdot 0.75 = 146.25$',
    },
    {
      kind: 'example',
      title: 'Compute the bisector from $A$ of the 13-14-15 witness two independent ways: by the split-and-Stewart road, and by the factored formula \u2014 and cross-check with the full Stewart equation.',
      steps: [
        'Sol. Set up the split first: the bisector theorem gives $\\frac{m}{n} = \\frac{c}{b} = \\frac{15}{13}$ with $m + n = a = 14$, so $m = \\frac{15}{28} \\cdot 14 = 7.5$ and $n = \\frac{13}{28} \\cdot 14 = 6.5$.',
        'Run Stewart on this split: the left side is $b^2 m + c^2 n = 169 \\cdot 7.5 + 225 \\cdot 6.5 = 1267.5 + 1462.5 = 2730$.',
        'Collapse it (or notice the shortcut): $2730 = 13 \\cdot 15 \\cdot 14 = abc$, so the equation $abc = a(d^2 + mn)$ gives $d^2 = bc - mn = 195 - 48.75 = 146.25$.',
        'Now, take the second road, the factored formula: $d^2 = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = 195\\left(1 - \\frac{196}{784}\\right) = 195 \\cdot 0.75 = 146.25$ \u2014 identical.',
        'Take the square root: $\\ell = \\sqrt{146.25} \\approx 12.093387$ (the engine\u2019s value to six decimals).',
        'Close the loop with the full Stewart equation: $a(d^2 + mn) = 14 \\cdot (146.25 + 48.75) = 14 \\cdot 195 = 2730$, matching the left side of step 2 exactly.',
        'Hence the bisector from $A$ has $\\ell = \\sqrt{146.25} \\approx 12.093387$, certified by the split road, the formula road and the full equation \u2014 three routes, one number.',
      ],
    },
    {
      kind: 'para',
      text: 'A comparison is now irresistible, and it is the signposting for the lesson\u2019s final act. The median from $A$ measured $2\\sqrt{37} \\approx 12.165525$; the bisector from the same vertex measures $\\sqrt{146.25} \\approx 12.093387$; and the altitude \u2014 the perpendicular from $A$ to the line $BC$, dropping $12$ exactly \u2014 is the shortest of the three. Altitude, then bisector, then median: is that order an accident of the witness, or is it forced? The next section answers with a table, a figure and an identity.',
    },
    /* -------------------------------------------------------------- */
    /* 7. the three-cevian comparison + the census parabola            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The three-cevian comparison: altitude, bisector, median' },
    {
      kind: 'para',
      text: 'From one vertex of one triangle, three cevians claim special status: the altitude (perpendicular to the base), the angle bisector (equal angles at the vertex) and the median (equal pieces of the base). On the witness, all three have now been computed exactly, and the table collects them side by side. Read the length column top to bottom: $12$, then $\\sqrt{146.25} \\approx 12.093387$, then $2\\sqrt{37} \\approx 12.165525$. The altitude is shortest, the bisector sits between, the median is longest \u2014 and the gaps are small, which is exactly why the order is worth proving rather than eyeballing.',
    },
    {
      kind: 'table',
      caption: 'The three-cevian comparison from vertex A of the 13-14-15 witness',
      head: ['Cevian from A', 'Foot on BC', 'Split (m, n)', 'Squared length', 'Length', 'Defining property'],
      rows: [
        ['altitude', 'F at $m = 9$', '$9$ and $5$', '$144$', '$12$ exactly', 'perpendicular to $BC$ \u2014 the shortest, being the distance to the LINE'],
        ['angle bisector', 'T at $m = 7.5$', '$7.5$ and $6.5$', '$146.25$', '$\\approx 12.093387$', '$m/n = c/b = 15/13$, the bisector theorem of 3.3'],
        ['median', 'M at $m = 7$', '$7$ and $7$', '$148$', '$2\\sqrt{37} \\approx 12.165525$', '$m = n$; Apollonius\u2019s theorem'],
      ],
    },
    {
      kind: 'figure',
      caption: 'Figure 3 \u2014 the three-cevian comparison from vertex $A$: the orange median to $M$, the amber bisector to $T$ and the teal altitude to $F$, with the three lengths in the legend and a magnified strip showing the three feet at $m = 7$, $7.5$ and $9$ \u2014 the altitude foot farthest toward $C$, the median foot farthest toward $B$.',
      svg: geo36F2(),
    },
    {
      kind: 'para',
      text: 'Figure 3 makes the mechanism visible. All three cevians hang from the same vertex $A$ at height $h = 12$, and Pythagoras prices every one of them as $d^2 = h^2 + (\\text{offset of the foot from } F)^2$, where $F$ is the altitude\u2019s foot. The altitude itself has offset $0$, so it is the shortest possible segment from $A$ to the LINE $BC$ \u2014 no cevian can beat it, ever. The median\u2019s foot sits at the midpoint $m = 7$, an offset of $2$ from $F = 9$; the bisector\u2019s foot sits at $m = 7.5$, an offset of only $1.5$. Smaller offset, smaller square: that is the whole reason the bisector loses to the median on this witness, $144 + 2.25 = 146.25$ against $144 + 4 = 148$.',
    },
    {
      kind: 'para',
      text: 'Is the order forced in general, or does the witness flatter us? Argue it honestly, in two steps. First, the altitude is always last: its offset is $0$ and squares are non-negative, so $h \\le d$ for every cevian from the vertex, with equality only for a cevian whose foot IS the altitude\u2019s foot. Second, compare the bisector and the median through their feet. The median foot sits at $a/2$; the bisector foot sits at $\\frac{ac}{b+c}$; the altitude foot sits at $x = \\frac{c^2 + a^2 - b^2}{2a}$. A short computation (Exercise 15 walks it) shows the bisector foot is always the FIXED FRACTION $1 - \\frac{a^2}{(b+c)^2}$ of the way from the altitude foot to the midpoint \u2014 on the witness, $1.5 = 0.75 \\cdot 2$. That fraction lies strictly between $0$ and $1$ (the triangle inequality gives $a < b + c$, so the fraction is positive; and it is below $1$ for any genuine base), so the bisector\u2019s offset never exceeds the median\u2019s, and $\\ell \\le m_a$ always \u2014 with equality exactly when both offsets vanish together, which happens precisely when $b = c$. The engine certifies the whole story across a grid of triangles: the order altitude $\\le$ bisector $\\le$ median holds universally, and all three are equal exactly in the isosceles case.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The three-cevian order, with its equality case',
      text: 'From any vertex of any triangle, the altitude $h$, the angle bisector $\\ell$ and the median $m_a$ satisfy $h \\le \\ell \\le m_a$. The left equality needs the bisector\u2019s foot to be the altitude\u2019s foot; the right equality forces $b = c$. When $b = c$ the triangle is isosceles at $A$, all three feet coincide at the midpoint of the base, and all three lengths are EQUAL. A squared-identity form of the right half: $m_a^2 - \\ell^2 = \\frac{(b - c)^2\\left(2(b + c)^2 - a^2\\right)}{4(b + c)^2} \\ge 0$ \u2014 on the witness it reads $148 - 146.25 = 1.75$, and it collapses to $0$ exactly when $b = c$. On the witness the order is strict: $12 < 12.093387 < 12.165525$.',
    },
    {
      kind: 'example',
      title: 'The comparison walk: from vertex $A$ of the 13-14-15 witness, compute the altitude, the bisector and the median, and decide their order with reasons.',
      steps: [
        'Sol. Start with the altitude: the foot is $F = (9, 0)$ (the placement computation of the witness section), so $h = 12$ exactly, and $h^2 = 144$.',
        'Compute the bisector: the split is $m = 7.5$, $n = 6.5$, and the formula gives $\\ell^2 = bc - mn = 195 - 48.75 = 146.25$, so $\\ell \\approx 12.093387$.',
        'Compute the median: Apollonius gives $m_a^2 = \\frac{2 \\cdot 169 + 2 \\cdot 225 - 196}{4} = 148$, so $m_a = 2\\sqrt{37} \\approx 12.165525$.',
        'Now, order them: $144 < 146.25 < 148$, and square roots preserve order (all quantities positive), so $h < \\ell < m_a$ \u2014 altitude, bisector, median, strictly on this witness.',
        'Explain the altitude\u2019s last place: $d^2 = h^2 + (\\text{offset})^2 \\ge h^2$ for every cevian from $A$, because the offset squares away its sign \u2014 the perpendicular is the shortest segment to the LINE.',
        'Explain the median\u2019s first place: the offsets from $F = 9$ are $2$ for the median (foot at $7$) and $1.5$ for the bisector (foot at $7.5$), and $144 + 2^2 = 148 > 146.25 = 144 + 1.5^2$ \u2014 the bisector foot is trapped between the altitude foot and the midpoint, so it can never lose by less than nothing.',
        'Check the equality case for contrast: in the isosceles triangle with sides $13$, $13$, base $10$, all three feet sit at the midpoint and all three lengths equal $12$ \u2014 the order degenerates to a triple tie precisely because $b = c$ there.',
        'Hence on the witness $12 < 12.093387 < 12.165525$, an instance of the general law $h \\le \\ell \\le m_a$ with equality exactly in the isosceles case.',
      ],
    },
    {
      kind: 'para',
      text: 'One more honest note before the census. The comparison table\u2019s three rows are three points of a much larger picture: between $m = 0$ and $m = 14$ there live infinitely many cevians, and Stewart prices every single one. The right way to see them all at once is to plot $d^2$ against $m$ \u2014 and the plot is not a cloud, it is a parabola.',
    },
    { kind: 'heading', text: 'The cevian census: every cevian on one parabola' },
    {
      kind: 'para',
      text: 'Recall the insight callout from the proof of Stewart: every cevian from $A$ satisfies $d^2 = h^2 + u^2$, the height squared plus the offset squared, where $u$ is the signed distance from the altitude\u2019s foot to the cevian\u2019s foot. On the witness, $h = 12$ and the altitude foot sits at $x = 9$, so a cevian landing at $m$ has offset $m - 9$ and $d^2 = 144 + (m - 9)^2$. That is a parabola in $m$ \u2014 vertex at the altitude foot, minimum value $h^2 = 144$, opening upward \u2014 and it is the COMPLETE price list of cevians from $A$: every point of the base gives one point of the curve, and Stewart\u2019s equation and the curve agree at every single $m$ (the engine checks them in steps of $0.25$ across the whole base). The table below is a census of named points on this curve.',
    },
    {
      kind: 'table',
      caption: 'The cevian census on the witness: d\u00b2 = 144 + (m \u2212 9)\u00b2 at the named splits',
      head: ['Split $m$', 'Split $n$', '$d^2$ (Stewart)', 'Length $d$', 'What this cevian is'],
      rows: [
        ['$0$', '$14$', '$225$', '$15$', 'degenerate: $D = B$, the side $c$ itself'],
        ['$4$', '$10$', '$169$', '$13$', 'the isosceles cevian: $AD = AC = 13$, triangle $ADC$ isosceles'],
        ['$6$', '$8$', '$153$', '$3\\sqrt{17} \\approx 12.37$', 'the anatomy split of Figure 1'],
        ['$7$', '$7$', '$148$', '$2\\sqrt{37} \\approx 12.17$', 'the median \u2014 Apollonius\u2019s point'],
        ['$7.5$', '$6.5$', '$146.25$', '$\\approx 12.09$', 'the angle bisector'],
        ['$9$', '$5$', '$144$', '$12$', 'the altitude \u2014 the vertex of the parabola, the minimum'],
        ['$10$', '$4$', '$145$', '$\\sqrt{145} \\approx 12.04$', 'the fourth pinned cevian (foot left of $F$)'],
        ['$14$', '$0$', '$169$', '$13$', 'degenerate: $D = C$, the side $b$ itself'],
      ],
    },
    {
      kind: 'figure',
      caption: 'Figure 4 \u2014 the cevian census parabola: $d^2 = 144 + (m - 9)^2$ plotted against the split $m$ from $0$ to $14$, with the census points marked, the minimum at the altitude foot $m = 9$ labelled, and the dashed twin-value line at $d^2 = 169$ passing through both $m = 4$ and $m = 14$.',
      svg: geo36F4(),
    },
    {
      kind: 'para',
      text: 'Figure 4 rewards a slow read. The curve touches $d^2 = 144$ exactly at $m = 9$: the altitude is the unique shortest cevian, the vertex of the parabola. At the ends, the curve passes through $(0, 225)$ and $(14, 169)$ \u2014 the degenerate cevians are the sides themselves, $d(0) = c = 15$ and $d(14) = b = 13$, which is a pleasant sanity check: the family of cevians closes at both ends onto the family of sides. The median at $(7, 148)$ and the bisector at $(7.5, 146.25)$ sit next to each other on the left flank of the parabola, both below the level $145$ of the $m = 10$ cevian on the right flank. And the dashed line at height $169$ cuts the parabola TWICE, at $m = 4$ and $m = 14$: a cevian of length exactly $13$ can land at either of two points \u2014 one genuine interior split, one the degenerate landing at $C$. That double landing is the reverse Stewart question, and it is Exercise 10.',
    },
    {
      kind: 'example',
      title: 'Expand Stewart\u2019s equation into the census parabola, complete the square, and read three named cevians off the quadratic \u2014 the curve and the equation are one law.',
      steps: [
        'Sol. Start from Stewart\u2019s theorem on the witness ($a = 14$, $b = 13$, $c = 15$) with the cevian from $A$ landing at split $m$, so $n = 14 - m$: the equation reads $b^2 m + c^2 n = a(d^2 + mn)$, that is $169m + 225(14 - m) = 14(d^2 + m(14 - m))$.',
        'Expand both sides in $m$. The left side is $169m + 3150 - 225m = 3150 - 56m$. The right side is $14d^2 + 196m - 14m^2$. Setting them equal and solving for $d^2$: $14d^2 = 3150 - 56m - 196m + 14m^2 = 14m^2 - 252m + 3150$, so $d^2 = m^2 - 18m + 225$ \u2014 a QUADRATIC in the landing point $m$, exactly as the census promised.',
        'Complete the square: $m^2 - 18m + 225 = (m - 9)^2 + 225 - 81 = (m - 9)^2 + 144$. The vertex sits at $m = 9$ with minimum value $d^2 = 144$, so the shortest cevian lands at the altitude\u2019s foot and has length exactly $h = 12$ \u2014 the vertex of the parabola IS the altitude.',
        'Read three named points off the quadratic. The median lands at $m = 7$: $d^2 = 49 - 126 + 225 = 148$, so $d = 2\\sqrt{37}$. The angle bisector lands at $m = 7.5$: $d^2 = 56.25 - 135 + 225 = 146.25$. The isosceles cevian lands at $m = 4$: $d^2 = 16 - 72 + 225 = 169$, so $d = 13$ \u2014 each row of the census table is one substitution into the quadratic.',
        'Conclusion: the quadratic $d^2 = (m - 9)^2 + 144$ and the altitude form $d^2 = h^2 + u^2$ agree at every $m$ (the engine checks them in steps of $0.25$ across the whole base), and both are Stewart rearranged. One law, three readings: equation, parabola, price list.',
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the census matters',
      text: 'The parabola $d^2 = h^2 + (m - x)^2$ says something conceptual that Stewart\u2019s equation only whispers: from a fixed vertex, the SQUARED cevian length is a quadratic function of the landing point, with minimum at the altitude foot. Everything else in this lesson is a reading of special points off this curve \u2014 the sides at the endpoints, the median at the midpoint, the bisector at the fixed fraction, the altitude at the vertex. When an examination asks for a cevian length you have never memorised a formula for, remember that you can always price it as height squared plus offset squared, provided you can place the altitude foot \u2014 the parabola is Stewart with the geometry showing.',
    },
    /* -------------------------------------------------------------- */
    /* 8. the collected law: history + exam corner                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The collected law, the history, and the exam corner' },
    {
      kind: 'para',
      text: 'The lesson now holds one master theorem, three special cevians priced off it, one concurrency with a ratio law, and one census curve that contains them all. Before the drill, two short closing panels: the history that names the theorem, and the examination habits that convert it into marks. Both are short because the substance is already on the page \u2014 the history explains the name on the box, and the exam corner tells you which hand to put into the box first.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Matthew Stewart, 1746 \u2014 and a pedigree that runs back to Archimedes',
      text: 'The theorem takes its name from the Scottish mathematician Matthew Stewart, who published it in 1746 in a paper titled \u201cSome General Theorems of Considerable Use in the Higher Parts of Mathematics\u201d, written while he was a candidate to succeed Colin Maclaurin in the chair at Edinburgh \u2014 a mathematical job application, in effect, and a successful one. The result spread quickly through the British textbooks: by the account of Hutton and Gregory in 1843, Simson was already using it in 1748 and Simpson in 1752. The priority is older and hazier than all of this: Coxeter and Greitzer note that the theorem was probably known to Archimedes, some two thousand years earlier \u2014 and \u201cprobably\u201d is the honest word, since no surviving Archimedean text states it outright. The median special case is older still in its attribution: it carries the name of Apollonius of Perga, eighteen centuries before Stewart. One caution from the chapter\u2019s source register: a popular claim that Simpson stated the theorem in 1740 is NOT supported by the references \u2014 we stay with 1746, name the users, and let the ancient haze remain haze.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: the substitution reflex and four instant answers',
      text: 'Five habits pay marks here. FIRST, the Stewart substitution reflex: the question gives a ratio for the split (bisector, or a stated $m : n$), you convert it to $m$ and $n$ via $m + n = a$, then ONE equation $b^2 m + c^2 n = a(d^2 + mn)$ prices the cevian \u2014 never re-derive, never drop the $mn$ term. SECOND, Apollonius as the instant median: median squared is flanking squares doubled, minus base squared, over four \u2014 on a 13-14-15 triangle that is $148$ in one line. THIRD, the 2 : 1 centroid split: two thirds of the median from the vertex, one third from the base \u2014 if a question gives a median of $12$, the centroid pieces are $8$ and $4$ with no computation at all. FOURTH, the bisector length in the form $bc - mn$: compute the split from the ratio, then the answer is one product minus another \u2014 the factored form $bc(1 - a^2/(b+c)^2)$ when only the sides are given. FIFTH, the ordering answer: asked to order altitude, bisector, median from one vertex, answer $h \\le \\ell \\le m_a$, equality exactly when the triangle is isosceles at that vertex \u2014 a complete sentence that earns the mark without any length computation. Typical mark scheme: the split is a mark, the correct pairing is a mark, the arithmetic landing is a mark.',
    },
    /* -------------------------------------------------------------- */
    /* 9. terms                                                        */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'cevian', def: 'A segment from one vertex of a triangle to a point on the opposite side (or its extension). In the chapter\u2019s notation, the cevian from $A$ meets $BC$ at $D$ with $BD = m$, $DC = n$, $a = m + n$ and cevian length $d = AD$. Medians, angle bisectors and altitudes are the three special cevians.' },
        { term: 'Stewart\u2019s theorem', def: 'The cevian tariff: $b^2 m + c^2 n = a(d^2 + mn)$, equivalently $d^2 = \\frac{b^2 m + c^2 n}{a} - mn$. True for every cevian of every triangle; the pairing law is that each side-square multiplies the base piece at the vertex it misses.' },
        { term: 'the swap trap', def: 'The commonest Stewart error: writing $b^2 n + c^2 m$ instead of $b^2 m + c^2 n$. Dimensionally perfect, and accidentally true when $m = n$ or $b = c$ \u2014 which is why drilling only medians or isosceles triangles hides it. On the witness at $m = 4$: correct $2926$, swapped $2590$.' },
        { term: 'median', def: 'The cevian from a vertex to the midpoint of the opposite side: the split $m = n = a/2$. The three medians of a triangle are concurrent at the centroid.' },
        { term: 'Apollonius\u2019s theorem', def: 'The median case of Stewart: $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$, named for Apollonius of Perga. On the 13-14-15 witness it gives $148$, the median $2\\sqrt{37} \\approx 12.165525$.' },
        { term: 'median-sum identity', def: 'The census of all three medians at once: $m_a^2 + m_b^2 + m_c^2 = \\frac{3}{4}(a^2 + b^2 + c^2)$. On the witness: $148 + 168.25 + 126.25 = 442.5 = \\frac{3}{4} \\cdot 590$.' },
        { term: 'centroid', def: 'The meeting point of the three medians, at the coordinate average $G = \\frac{1}{3}(A + B + C)$. On the witness: $(23/3, 4)$. It divides every median in the ratio $2 : 1$ from the vertex.' },
        { term: 'the 2 : 1 split', def: 'The centroid\u2019s fingerprint: $AG = \\frac{2}{3}$ of the median from $A$ and $GM = \\frac{1}{3}$ of it, on every median of every triangle. On the witness: $AG = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$, $GM = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$.' },
        { term: 'angle-bisector length', def: 'The bisector from $A$ has $\\ell^2 = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = bc - mn$, where the split comes from the bisector theorem $\\frac{m}{n} = \\frac{c}{b}$, that is $m = \\frac{ac}{b+c}$, $n = \\frac{ab}{b+c}$. On the witness: $\\ell = \\sqrt{146.25} \\approx 12.093387$.' },
        { term: 'the three-cevian comparison', def: 'From one vertex, the altitude, bisector and median always satisfy $h \\le \\ell \\le m_a$, with equality exactly when the triangle is isosceles at that vertex ($b = c$), in which case all three coincide. On the witness the order is strict: $12 < 12.093387 < 12.165525$.' },
        { term: 'cevian census parabola', def: 'The curve $d^2 = h^2 + (m - x)^2$ plotting squared cevian length against the landing point $m$, where $x$ is the altitude foot. Vertex at the altitude (the minimum $h^2$), passing through the sides at the endpoints $d(0) = c$ and $d(a) = b$.' },
        { term: 'the witness triangle', def: 'The chapter\u2019s reusable 13-14-15 example: $a = BC = 14$, $b = CA = 13$, $c = AB = 15$, placed at $B(0,0)$, $C(14,0)$, $A(9,12)$, area $84$ by both base-height and Heron, and split by its altitude into a 9-12-15 and a 5-12-13 right triangle.' },
        { term: 'the isosceles cevian', def: 'On the witness, the cevian at $m = 4$, $n = 10$: Stewart gives $d = 13 = AC$, so triangle $ADC$ is isosceles with $AD = AC$. The census twin of the side $b$: the horizontal line at $d^2 = 169$ meets the parabola at $m = 4$ and $m = 14$.' },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. quiz (key [0,3,1,2,0] — PINNED)                             */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Stewart\u2019s theorem prices a cevian $AD$ with split $BD = m$, $DC = n$, $a = m + n$ and length $d$. The correct statement is \u2014',
          options: [
            '$b^2 m + c^2 n = a(d^2 + mn)$ \u2014 each side-square multiplies the base piece at the vertex it misses',
            '$b^2 n + c^2 m = a(d^2 + mn)$ \u2014 each side-square multiplies the base piece nearest to it',
            '$b^2 m + c^2 n = a \\cdot d^2$ \u2014 the product $mn$ plays no role',
            '$b^2 + c^2 = a(d^2 + mn)$ \u2014 the split drops out of the equation entirely',
          ],
          answer: 0,
          explain: 'The pairing is the whole game: $b = CA$ misses $B$, so it takes the piece at $B$, which is $m = BD$; likewise $c$ takes $n$. Option (b) is the swap trap: dimensionally perfect, accidentally true for medians ($m = n$) and isosceles triangles ($b = c$), but false in general \u2014 on the witness at $m = 4$ it reads $2590$ where the true left side is $2926$. Option (c) forgets the $mn$ term: at $m = n = 7$ on the witness it would demand $2758 = 14 \\cdot 148 = 2072$, which fails. Option (d) drops the split entirely, which cannot be right \u2014 the cevian length genuinely depends on where $D$ sits, as the census parabola shows.',
        },
        {
          q: 'In the 13-14-15 witness ($a = 14$, $b = 13$, $c = 15$), the median from $A$ has length \u2014',
          options: [
            '$\\sqrt{146.25} \\approx 12.09$ \u2014 the bisector value, by the formula $bc - mn$',
            '$12$ exactly \u2014 the altitude, since the median is perpendicular to the base',
            '$13$ \u2014 equal to the side $b$, since the median lands at the midpoint',
            '$2\\sqrt{37} \\approx 12.17$, by Apollonius: $\\frac{2 \\cdot 169 + 2 \\cdot 225 - 196}{4} = 148$',
          ],
          answer: 3,
          explain: 'Apollonius is the instant median formula: flanking squares doubled, minus base squared, over four \u2014 $(338 + 450 - 196)/4 = 592/4 = 148$, so the median is $\\sqrt{148} = 2\\sqrt{37} \\approx 12.165525$. Option (a) is the bisector\u2019s number ($146.25$): the median is strictly longer on this scalene witness. Option (b) confuses median with altitude: the altitude is $12$, and the three-cevian order says the median is the LONGEST of the three, not the shortest. Option (c) is the isosceles cevian\u2019s value ($m = 4$ gives $d = 13$); the median lands at $m = 7$, not where $AD = AC$.',
        },
        {
          q: 'The centroid $G$ of the witness triangle $B(0,0)$, $C(14,0)$, $A(9,12)$ divides the median from $A$. The distance $AG$ is \u2014',
          options: [
            '$2\\sqrt{37} \\approx 12.17$ \u2014 the whole median, since $G$ is the midpoint of it',
            '$\\frac{4\\sqrt{37}}{3} \\approx 8.11$ \u2014 two thirds of the median, the centroid split',
            '$\\sqrt{37} \\approx 6.08$ \u2014 one third of the median from the vertex',
            '$4$ \u2014 the height of the centroid above the base, which is also its distance from $A$',
          ],
          answer: 1,
          explain: 'The centroid takes two thirds of every median from the vertex: $AG = \\frac{2}{3} \\cdot 2\\sqrt{37} = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$, with $GM = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$ below it \u2014 the engine certifies both by direct distance from $G = (23/3, 4)$. Option (a) is the whole median \u2014 $G$ is not the midpoint of the median but its $2 : 1$ splitter. Option (c) is the base-side piece, not the vertex-side piece \u2014 read the ratio from the VERTEX. Option (d) confuses coordinates with distances: the centroid\u2019s height above $BC$ is indeed $4$, but $AG$ is the slant distance from $A(9,12)$ down to $G$, which is $\\sqrt{(4/3)^2 + 8^2} = \\frac{4\\sqrt{37}}{3}$.',
        },
        {
          q: 'The angle bisector from $A$ of the witness meets $BC$ at $D$. The split is \u2014',
          options: [
            '$BD = DC = 7$ \u2014 the bisector always hits the midpoint',
            '$BD = 9$ and $DC = 5$ \u2014 the bisector always passes through the altitude\u2019s foot',
            '$BD = 7.5$ and $DC = 6.5$, the ratio $m/n = c/b = 15/13$ of the bisector theorem',
            '$BD = 6.5$ and $DC = 7.5$ \u2014 the ratio reversed, $m/n = b/c$',
          ],
          answer: 2,
          explain: 'The bisector theorem of lesson 3.3 fixes the split: the pieces of the base are proportional to the flanking sides, $m/n = c/b = 15/13$, and with $m + n = 14$ that solves to $m = 7.5$, $n = 6.5$. Option (a) is the MEDIAN\u2019s split \u2014 the bisector hits the midpoint only when $b = c$. Option (b) is the altitude\u2019s foot ($m = 9$), which the bisector shares only in the isosceles case. Option (d) has the ratio backwards: the piece at $B$ goes with the side $c = AB$ at $B$; the reversed split would bisect the EXTERNAL angle\u2019s dividing line, not the internal one. The resulting length, either way you compute it, is $\\sqrt{146.25} \\approx 12.093387$.',
        },
        {
          q: 'From one vertex of a scalene triangle, the altitude $h$, the angle bisector $\\ell$ and the median $m_a$ always satisfy \u2014',
          options: [
            'the altitude is shortest and the median longest: $h \\le \\ell \\le m_a$, with equality of all three exactly when $b = c$',
            'the median is shortest, since it is the most symmetric: $m_a \\le \\ell \\le h$',
            'the bisector is always the shortest, being exactly halfway between the other two directions',
            'no fixed order exists \u2014 which one is longest depends on the shape in an irregular way',
          ],
          answer: 0,
          explain: 'Two forces fix the order. The altitude has zero offset from the altitude foot, and $d^2 = h^2 + (\\text{offset})^2$ makes it the minimum \u2014 the perpendicular is the shortest segment to the LINE. And the bisector\u2019s foot is always the fixed fraction $1 - a^2/(b+c)^2$ of the way from the altitude foot to the midpoint, a fraction strictly between $0$ and $1$, so the bisector\u2019s offset never exceeds the median\u2019s. Hence $h \\le \\ell \\le m_a$, with full equality exactly in the isosceles case $b = c$ (all three feet coincide at the midpoint) \u2014 the engine\u2019s grid sweep confirms it, with the equality cases counted. Option (b) reverses the truth. Option (c) invents a symmetry the bisector does not have. Option (d) is refuted by the squared identity $m_a^2 - \\ell^2 = \\frac{(b-c)^2(2(b+c)^2 - a^2)}{4(b+c)^2} \\ge 0$, which holds for every triangle.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1-L6, full Cengage step solutions)   */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the cevian tariff, drilled',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'A triangle has sides $a = 8$, $b = 5$, $c = 7$. Find the length of the median from $A$ by Apollonius, and cross-check the answer with Stewart at the split $m = n = 4$.',
              solution: [
                'Sol. Apply Apollonius to the median from $A$: $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$.',
                'Substitute: $m_a^2 = \\frac{2 \\cdot 25 + 2 \\cdot 49 - 64}{4} = \\frac{50 + 98 - 64}{4} = \\frac{84}{4} = 21$.',
                'Take the square root: $m_a = \\sqrt{21} \\approx 4.582576$.',
                'Now, cross-check with Stewart at $m = n = 4$: the left side is $b^2 m + c^2 n = 25 \\cdot 4 + 49 \\cdot 4 = 296$.',
                'The right side: $a(d^2 + mn) = 8 \\cdot (21 + 16) = 8 \\cdot 37 = 296$ \u2014 equal to the digit.',
                'Hence the median from $A$ is $m_a = \\sqrt{21} \\approx 4.58$, certified by both roads.',
              ],
              answer: '$m_a = \\sqrt{21} \\approx 4.58$ (with $m_a^2 = 21$; the Stewart check reads $296 = 296$)',
            },
            {
              q: 'A median of a triangle has length $12$. How far is the centroid from the vertex end of this median, and how far from the base end?',
              solution: [
                'Sol. Recall the centroid law: the centroid divides every median in the ratio $2 : 1$, measured from the vertex.',
                'Vertex piece: $AG = \\frac{2}{3} \\cdot 12 = 8$.',
                'Base piece: $GM = \\frac{1}{3} \\cdot 12 = 4$.',
                'Check the arithmetic both ways: $8 + 4 = 12$ rebuilds the median, and $8 = 2 \\cdot 4$ is exactly the demanded ratio.',
                'Hence the centroid sits $8$ from the vertex and $4$ from the base \u2014 no computation beyond the thirds was needed.',
              ],
              answer: '$AG = 8$ from the vertex, $GM = 4$ from the base (ratio $8 : 4 = 2 : 1$)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'For the witness triangle $B(0,0)$, $C(14,0)$, $A(9,12)$: find the centroid, then verify by direct distance that it splits the median from $A$ in the ratio $2 : 1$.',
              solution: [
                'Sol. Average the vertices coordinate-wise: $G = \\left(\\frac{9 + 0 + 14}{3}, \\frac{12 + 0 + 0}{3}\\right) = \\left(\\frac{23}{3}, 4\\right)$.',
                'The median from $A$ runs to the midpoint $M = (7, 0)$ of $BC$, and Apollonius gives $AM = 2\\sqrt{37} \\approx 12.165525$ (since $m_a^2 = 148$).',
                'Now, measure the vertex piece directly: $AG = \\sqrt{\\left(9 - \\frac{23}{3}\\right)^2 + 8^2} = \\sqrt{\\frac{16}{9} + 64} = \\frac{4\\sqrt{37}}{3} \\approx 8.110350$.',
                'Measure the base piece directly: $GM = \\sqrt{\\left(\\frac{23}{3} - 7\\right)^2 + 4^2} = \\frac{2\\sqrt{37}}{3} \\approx 4.055175$.',
                'Compare: $8.110350 = 2 \\cdot 4.055175$, so $AG : GM = 2 : 1$; and the pieces rebuild the median: $\\frac{4\\sqrt{37}}{3} + \\frac{2\\sqrt{37}}{3} = 2\\sqrt{37}$.',
                'Hence $G = (23/3, 4)$ with $AG \\approx 8.110350$ and $GM \\approx 4.055175$, the split certified by direct distance.',
              ],
              answer: '$G = (23/3, 4)$; $AG \\approx 8.110350$ and $GM \\approx 4.055175$, ratio $2 : 1$',
            },
            {
              q: 'A roof truss has two rafters of length $13$ meeting over a base of length $10$. (a) How long is the king post, the central strut from the apex to the midpoint of the base? (b) A diagonal strut runs from the apex to a point $4$ along the base from one wall. Show that the diagonal strut is LONGER than the king post, and by how much.',
              solution: [
                'Sol. Model the truss as the isosceles triangle with $b = c = 13$ and base $a = 10$; the king post is the median from the apex.',
                'King post by Apollonius: $m_a^2 = \\frac{2 \\cdot 169 + 2 \\cdot 169 - 100}{4} = \\frac{576}{4} = 144$, so the king post has length $12$ exactly.',
                'Diagonal strut: the split is $m = 4$, $n = 6$, so Stewart gives $d^2 = \\frac{b^2 m + c^2 n}{a} - mn = \\frac{169 \\cdot 4 + 169 \\cdot 6}{10} - 24$.',
                'Compute: $\\frac{676 + 1014}{10} - 24 = \\frac{1690}{10} - 24 = 169 - 24 = 145$, so $d = \\sqrt{145} \\approx 12.041595$.',
                'Compare: $\\sqrt{145} > \\sqrt{144} = 12$, so the strut is longer than the king post by $\\sqrt{145} - 12 \\approx 0.041595$ \u2014 about four units in a twelve-unit truss, small but real.',
                'Hence the king post is $12$ and the diagonal strut is $\\sqrt{145} \\approx 12.041595$; the strut loses because its foot sits $1$ off the symmetry axis ($m = 4$ against the axis at $m = 5$).',
              ],
              answer: 'king post $12$; strut $\\sqrt{145} \\approx 12.041595$ \u2014 the strut is longer by $\\approx 0.041595$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The cevian from $A$ of the 13-14-15 witness lands at $D$ with $BD = 4$ and $DC = 10$. Find its length by Stewart, and explain the geometric meaning of the answer.',
              solution: [
                'Sol. Run Stewart at $m = 4$, $n = 10$: the left side is $b^2 m + c^2 n = 169 \\cdot 4 + 225 \\cdot 10 = 676 + 2250 = 2926$.',
                'Solve for the length: $d^2 = \\frac{2926}{14} - 4 \\cdot 10 = 209 - 40 = 169$, so $d = 13$.',
                'Cross-check by coordinates: $D = (4, 0)$ and $A = (9, 12)$, so $d = \\sqrt{(9 - 4)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ \u2014 both roads agree.',
                'Now, the meaning: $d = 13 = b = AC$, so the cevian equals the side it leans toward \u2014 triangle $ADC$ is isosceles with $AD = AC = 13$ and base $DC = 10$.',
                'Hence the cevian has length $13$: one of the two landings where the census parabola meets the level $d^2 = 169$ (the other is the degenerate landing at $C$).',
              ],
              answer: '$d = 13$; triangle $ADC$ is isosceles with $AD = AC = 13$ and base $DC = 10$',
              figures: [
                {
                  caption: 'The Stewart anatomy at the split $m = 4$, drawn for the solution: the witness with the cevian $AD$ in orange and the triangle $ADC$ shaded \u2014 $AD = AC = 13$ makes it isosceles with base $DC = 10$, the interior landing of the length-$13$ cevian.',
                  svg: geo36S1(),
                },
              ],
            },
            {
              q: 'In a triangle with $a = 16$, $b = 15$, $c = 9$, the bisector of angle $A$ meets $BC$ at $D$ with $BD : DC = 3 : 5$. Find the split, then the length of the bisector, two ways.',
              solution: [
                'Sol. Convert the ratio using $m + n = a = 16$: $BD : DC = 3 : 5$ gives $m = \\frac{3}{8} \\cdot 16 = 6$ and $n = \\frac{5}{8} \\cdot 16 = 10$.',
                'Check the split against the bisector theorem: $\\frac{m}{n} = \\frac{6}{10} = \\frac{3}{5} = \\frac{c}{b} = \\frac{9}{15}$ \u2014 consistent.',
                'Run Stewart: $b^2 m + c^2 n = 225 \\cdot 6 + 81 \\cdot 10 = 1350 + 810 = 2160$.',
                'Then $d^2 = \\frac{2160}{16} - 6 \\cdot 10 = 135 - 60 = 75$, so $d = \\sqrt{75} = 5\\sqrt{3} \\approx 8.660254$.',
                'Now, the second road, the bisector formula: $bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = 135\\left(1 - \\frac{256}{576}\\right) = 135 \\cdot \\frac{320}{576} = 135 \\cdot \\frac{5}{9} = 75$ \u2014 the same $d^2 = 75$.',
                'Hence the split is $BD = 6$, $DC = 10$, and the bisector from $A$ has length $5\\sqrt{3} \\approx 8.660254$.',
              ],
              answer: '$BD = 6$, $DC = 10$; bisector length $d = 5\\sqrt{3} \\approx 8.660254$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'For the triangle with sides $(a, b, c) = (4, 5, 6)$, compute all three squared medians and verify the median-sum identity.',
              solution: [
                'Sol. Median from $A$ (base $a = 4$, flanking sides $5$ and $6$): $m_a^2 = \\frac{2 \\cdot 25 + 2 \\cdot 36 - 16}{4} = \\frac{106}{4} = 26.5$.',
                'Median from $B$ (base $b = 5$, flanking sides $4$ and $6$): $m_b^2 = \\frac{2 \\cdot 16 + 2 \\cdot 36 - 25}{4} = \\frac{79}{4} = 19.75$.',
                'Median from $C$ (base $c = 6$, flanking sides $4$ and $5$): $m_c^2 = \\frac{2 \\cdot 16 + 2 \\cdot 25 - 36}{4} = \\frac{46}{4} = 11.5$.',
                'Add the three: $26.5 + 19.75 + 11.5 = 57.75$.',
                'Compare with the identity\u2019s right side: $\\frac{3}{4}(a^2 + b^2 + c^2) = \\frac{3}{4}(16 + 25 + 36) = \\frac{3}{4} \\cdot 77 = 57.75$ \u2014 equal to the digit.',
                'Hence $m_a^2 = 26.5$, $m_b^2 = 19.75$, $m_c^2 = 11.5$, and their sum $57.75$ confirms the median-sum identity on this witness.',
              ],
              answer: '$26.5 + 19.75 + 11.5 = 57.75 = \\frac{3}{4} \\cdot 77$',
            },
            {
              q: 'Walk the census. On the 13-14-15 witness, use Stewart to compute $d^2$ at the splits $m = 0, 4, 6, 7, 7.5, 9, 10, 14$, and name the cevian each value belongs to.',
              solution: [
                'Sol. Write the tariff once: $d^2 = \\frac{169m + 225(14 - m)}{14} - m(14 - m)$.',
                'At $m = 0$: $\\frac{3150}{14} - 0 = 225$ \u2014 the degenerate cevian $D = B$, which is the side $c = 15$ itself.',
                'At $m = 4$: $\\frac{676 + 2250}{14} - 40 = 209 - 40 = 169$ \u2014 the isosceles cevian with $d = 13 = AC$.',
                'At $m = 6$: $\\frac{1014 + 1800}{14} - 48 = 201 - 48 = 153$ \u2014 the anatomy split of Figure 1, with $d = 3\\sqrt{17}$.',
                'At $m = 7$: $\\frac{1183 + 1575}{14} - 49 = 197 - 49 = 148$ \u2014 the median, $d = 2\\sqrt{37}$.',
                'At $m = 7.5$: $\\frac{1267.5 + 1462.5}{14} - 48.75 = 195 - 48.75 = 146.25$ \u2014 the angle bisector; at $m = 9$: $\\frac{1521 + 1125}{14} - 45 = 189 - 45 = 144$ \u2014 the altitude, the census minimum; at $m = 10$: $\\frac{1690 + 900}{14} - 40 = 185 - 40 = 145$; and at $m = 14$: $\\frac{2366}{14} - 0 = 169$ \u2014 the degenerate landing $D = C$, the side $b = 13$ itself.',
                'Hence the census reads $225, 169, 153, 148, 146.25, 144, 145, 169$ across the splits $m = 0, 4, 6, 7, 7.5, 9, 10, 14$ \u2014 every value a point of the parabola $d^2 = 144 + (m - 9)^2$.',
              ],
              answer: '$d^2 = 225, 169, 153, 148, 146.25, 144, 145, 169$ at $m = 0, 4, 6, 7, 7.5, 9, 10, 14$',
            },
            {
              q: 'Prove the bisector identity $\\ell^2 = bc - mn$ from Stewart, and verify it on the witness and on the triangle with $a = 16$, $b = 15$, $c = 9$.',
              solution: [
                'Sol. Start from the bisector split $m = \\frac{ac}{b+c}$, $n = \\frac{ab}{b+c}$ and substitute into Stewart\u2019s left side.',
                'Collapse it: $b^2 m + c^2 n = \\frac{ab^2 c}{b+c} + \\frac{abc^2}{b+c} = \\frac{abc(b + c)}{b + c} = abc$.',
                'So Stewart reads $abc = a(d^2 + mn)$, and dividing by $a$ leaves $d^2 = bc - mn$ \u2014 the identity.',
                'Witness check: $bc - mn = 195 - 48.75 = 146.25$, the squared bisector length; and the collapse itself reads $169 \\cdot 7.5 + 225 \\cdot 6.5 = 2730 = 13 \\cdot 15 \\cdot 14$.',
                'Second triangle: $bc - mn = 135 - 60 = 75$, matching the squared bisector length $75$ found at the $3 : 5$ split ($m = 6$, $n = 10$).',
                'Hence $\\ell^2 = bc - mn$ always, with the two witnesses reading $146.25$ and $75$.',
              ],
              answer: '$\\ell^2 = bc - mn$; witnesses: $195 - 48.75 = 146.25$ and $135 - 60 = 75$',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'The isosceles triangle with sides $13$, $13$ and base $10$: compute the median, the angle bisector and the altitude from the apex, and explain why all three answers coincide.',
              solution: [
                'Sol. Median by Apollonius: $m_a^2 = \\frac{2 \\cdot 169 + 2 \\cdot 169 - 100}{4} = \\frac{576}{4} = 144$, so the median is $12$.',
                'Bisector by the length formula: $\\ell^2 = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) = 169\\left(1 - \\frac{100}{676}\\right) = 169 - 25 = 144$, so the bisector is $12$.',
                'Altitude by area: Heron gives $s = 18$ and area $\\sqrt{18 \\cdot 5 \\cdot 5 \\cdot 8} = \\sqrt{3600} = 60$, so $h = \\frac{2 \\cdot 60}{10} = 12$.',
                'All three equal $12$, and the reason is structural: $b = c$ forces the altitude foot, the midpoint and the bisector foot to be the SAME point of the base, so the three cevians are the same segment wearing three names.',
                'This is the equality case of the three-cevian comparison: $h \\le \\ell \\le m_a$ collapses to $12 = 12 = 12$ precisely because the triangle is isosceles at the apex.',
                'Hence median = bisector = altitude = $12$, the single symmetry axis of the triangle.',
              ],
              answer: 'all three are $12$: $m_a = \\ell = h = 12$ (the isosceles equality case, $b = c$)',
              figures: [
                {
                  caption: 'The equality case drawn for the solution: the isosceles 13-13-10 triangle in which the median, the bisector and the altitude from the apex coincide as one segment of length $12$, with the right angle marked at the shared foot $M = T = F$.',
                  svg: geo36S3(),
                },
              ],
            },
            {
              q: 'A right triangle has its right angle at $B$, with $AB = 4$, $BC = 3$ and $CA = 5$. From the vertex $A$, compute the altitude, the angle bisector and the median to the line $BC$, and put the three lengths in order.',
              solution: [
                'Sol. Set the notation: $a = BC = 3$, $b = CA = 5$, $c = AB = 4$, with the right angle at $B$.',
                'Altitude from $A$ to the line $BC$: since $AB \\perp BC$, the perpendicular from $A$ to that line lands at $B$ itself \u2014 the altitude IS the side $AB$, of length $4$.',
                'Bisector: the split is $m = \\frac{ac}{b+c} = \\frac{3 \\cdot 4}{9} = \\frac{4}{3}$ with $n = \\frac{5}{3}$; then $\\ell^2 = bc - mn = 20 - \\frac{20}{9} = \\frac{160}{9}$, so $\\ell = \\frac{4\\sqrt{10}}{3} \\approx 4.216370$.',
                'Median: $m_a^2 = \\frac{2 \\cdot 25 + 2 \\cdot 16 - 9}{4} = \\frac{73}{4}$, so $m_a = \\frac{\\sqrt{73}}{2} \\approx 4.272002$.',
                'Cross-check the bisector with full Stewart: $b^2 m + c^2 n = 25 \\cdot \\frac{4}{3} + 16 \\cdot \\frac{5}{3} = \\frac{100 + 80}{3} = 60$, and $a(d^2 + mn) = 3\\left(\\frac{160}{9} + \\frac{20}{9}\\right) = 3 \\cdot 20 = 60$ \u2014 equal.',
                'Order them: $4 < 4.216370 < 4.272002$ \u2014 altitude, bisector, median, the general law holding in a right triangle too, strictly because $b \\ne c$.',
                'Hence the altitude is $4$, the bisector $\\frac{4\\sqrt{10}}{3} \\approx 4.216370$, the median $\\frac{\\sqrt{73}}{2} \\approx 4.272002$, in that order.',
              ],
              answer: 'altitude $4$, then bisector $\\frac{4\\sqrt{10}}{3} \\approx 4.216370$, then median $\\frac{\\sqrt{73}}{2} \\approx 4.272002$',
              figures: [
                {
                  caption: 'A right-angle comparison drawn for the solution: the right triangle with legs $3$ and $4$ and hypotenuse $5$; from vertex $A$ the altitude is the side $AB$ itself (foot at $B$), the bisector foot $T$ sits at $4/3$ from $B$, and the median foot $M$ at the midpoint \u2014 the legend lists the three lengths in order.',
                  svg: geo36S4(),
                },
              ],
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Reverse Stewart on the witness: find every point $D$ on $BC$ for which the cevian $AD$ has length exactly $13$, and interpret the two answers.',
              solution: [
                'Sol. Let $D$ sit at $m$ from $B$, so $n = 14 - m$; Stewart demands $169m + 225(14 - m) = 14\\left(169 + m(14 - m)\\right)$ with $d = 13$.',
                'Left side: $169m + 3150 - 225m = 3150 - 56m$. Right side: $14 \\cdot 169 + 196m - 14m^2 = 2366 + 196m - 14m^2$.',
                'Set them equal and tidy: $3150 - 56m = 2366 + 196m - 14m^2$ becomes $14m^2 - 252m + 784 = 0$, that is $m^2 - 18m + 56 = 0$.',
                'Factor: $(m - 4)(m - 14) = 0$, so $m = 4$ or $m = 14$.',
                'Interpret: $m = 4$ is the genuine interior cevian (triangle $ADC$ isosceles with $AD = AC = 13$); $m = 14$ is the degenerate landing $D = C$, where the cevian IS the side $b = 13$.',
                'Check the degenerate root in Stewart: $169 \\cdot 14 + 225 \\cdot 0 = 2366$ and $14 \\cdot (169 + 0) = 2366$ \u2014 it satisfies the equation exactly.',
                'Hence exactly two landings give length $13$: the interior split $m = 4$ and the endpoint $m = 14$ \u2014 the two intersections of the census parabola with the level $d^2 = 169$.',
              ],
              answer: '$m = 4$ (the isosceles cevian) and $m = 14$ (degenerate: $D = C$, the side $b$ itself)',
            },
            {
              q: 'Prove the median-sum identity $m_a^2 + m_b^2 + m_c^2 = \\frac{3}{4}(a^2 + b^2 + c^2)$, and verify it on both chapter witnesses.',
              solution: [
                'Sol. Write the three Apollonius readings: $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$, $m_b^2 = \\frac{2c^2 + 2a^2 - b^2}{4}$, $m_c^2 = \\frac{2a^2 + 2b^2 - c^2}{4}$.',
                'Add the numerators: each of $a^2$, $b^2$, $c^2$ appears twice with a plus and once with a minus, netting three copies of each square, so the total is $3(a^2 + b^2 + c^2)$.',
                'Hence the sum is $\\frac{3(a^2 + b^2 + c^2)}{4}$ \u2014 the identity, proved once for all triangles.',
                'Witness 1, the 13-14-15: $148 + 168.25 + 126.25 = 442.5$, and $\\frac{3}{4}(196 + 169 + 225) = \\frac{3}{4} \\cdot 590 = 442.5$ \u2014 equal.',
                'Witness 2, the 4-5-6: $26.5 + 19.75 + 11.5 = 57.75$, and $\\frac{3}{4}(16 + 25 + 36) = \\frac{3}{4} \\cdot 77 = 57.75$ \u2014 equal again.',
                'Hence the identity is proved and witnessed: $442.5 = \\frac{3}{4} \\cdot 590$ on the 13-14-15 and $57.75 = \\frac{3}{4} \\cdot 77$ on the 4-5-6.',
              ],
              answer: 'proved; witnesses $442.5 = \\frac{3}{4} \\cdot 590$ (13-14-15) and $57.75 = \\frac{3}{4} \\cdot 77$ (4-5-6)',
            },
            {
              q: 'Prove the squared comparison identity $m_a^2 - \\ell^2 = \\frac{(b - c)^2\\left(2(b + c)^2 - a^2\\right)}{4(b + c)^2}$, and evaluate it on the witness and on the isosceles 13-13-10 triangle.',
              solution: [
                'Sol. Write both ingredients: $m_a^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$ and $\\ell^2 = bc - mn$ with $mn = \\frac{a^2 bc}{(b+c)^2}$.',
                'Subtract: $m_a^2 - \\ell^2 = \\frac{2b^2 + 2c^2 - a^2}{4} - bc + \\frac{a^2 bc}{(b+c)^2}$; combining the first two terms, $\\frac{2b^2 + 2c^2 - a^2}{4} - bc = \\frac{2(b - c)^2 - a^2}{4}$.',
                'Now, put everything over $4(b+c)^2$: the numerator is $\\left(2(b-c)^2 - a^2\\right)(b+c)^2 + 4a^2bc = 2(b-c)^2(b+c)^2 - a^2\\left((b+c)^2 - 4bc\\right) = (b-c)^2\\left(2(b+c)^2 - a^2\\right)$, since $(b+c)^2 - 4bc = (b - c)^2$.',
                'Hence $m_a^2 - \\ell^2 = \\frac{(b-c)^2\\left(2(b+c)^2 - a^2\\right)}{4(b+c)^2}$, which is $\\ge 0$ because the triangle inequality $a < b + c$ makes $2(b+c)^2 - a^2 > 0$ \u2014 the median never loses to the bisector.',
                'Witness: $(13 - 15)^2 = 4$ and $2 \\cdot 28^2 - 196 = 1568 - 196 = 1372$, so the identity gives $\\frac{4 \\cdot 1372}{4 \\cdot 784} = \\frac{5488}{3136} = 1.75$, matching $148 - 146.25 = 1.75$.',
                'Isosceles 13-13-10: $b - c = 0$, so the identity gives $0$ \u2014 all three cevians coincide at length $12$, as the L5 exercise computed.',
                'Hence the identity reads $1.75$ on the witness and $0$ on the isosceles triangle, exactly as the three-cevian comparison demands.',
              ],
              answer: '$m_a^2 - \\ell^2 = \\frac{(b-c)^2\\left(2(b+c)^2 - a^2\\right)}{4(b+c)^2}$; value $1.75$ on the witness, $0$ on the isosceles',
            },
            {
              q: 'Offset decomposition and the fraction law. On the witness, show that $m_a^2 = 144 + 4$ and $\\ell^2 = 144 + 2.25$ through the offsets from the altitude foot, and prove that the bisector foot is always the fixed fraction $1 - \\frac{a^2}{(b+c)^2}$ of the way from the altitude foot to the midpoint.',
              solution: [
                'Sol. The altitude foot sits at $x = 9$. The median foot sits at $a/2 = 7$, an offset of $x - a/2 = 2$; Pythagoras gives $m_a^2 = 144 + 2^2 = 144 + 4 = 148$.',
                'The bisector foot sits at $\\frac{ac}{b+c} = 7.5$, an offset of $x - 7.5 = 1.5$; so $\\ell^2 = 144 + 1.5^2 = 144 + 2.25 = 146.25$.',
                'Now, prove the law. From the placement formula, $x - \\frac{a}{2} = \\frac{c^2 + a^2 - b^2}{2a} - \\frac{a}{2} = \\frac{c^2 - b^2}{2a}$.',
                'Likewise $x - \\frac{ac}{b+c} = \\frac{(b+c)(c^2 + a^2 - b^2) - 2a^2c}{2a(b+c)}$; expanding, the $a^2$ terms combine as $a^2(b - c)$ and the rest is $(c - b)(b+c)^2$, leaving $\\frac{(c-b)\\left((b+c)^2 - a^2\\right)}{2a(b+c)}$.',
                'Divide the two offsets: $\\frac{x - m_{bis}}{x - a/2} = \\frac{(b+c)^2 - a^2}{(b+c)^2} = 1 - \\frac{a^2}{(b+c)^2}$ \u2014 the bisector foot is this fixed fraction of the way from the altitude foot to the midpoint, in every triangle.',
                'Witness check: $1 - \\frac{196}{784} = 1 - 0.25 = 0.75$, and indeed $\\frac{1.5}{2} = 0.75$; since the fraction is below $1$, the bisector\u2019s offset never exceeds the median\u2019s, which is the comparison law again.',
                'Hence $m_a^2 = 148 = 144 + 4$, $\\ell^2 = 146.25 = 144 + 2.25$, and the fraction law explains the gap: the bisector foot sits three quarters of the way from the altitude foot to the midpoint.',
              ],
              answer: '$m_a^2 = 144 + 4 = 148$ and $\\ell^2 = 144 + 2.25 = 146.25$; the fraction is $\\frac{1.5}{2} = 0.75 = 1 - \\frac{196}{784}$',
            },
          ],
        },
      ],
    },
  ],
}

export const chapter3: Chapter = {
  number: 3,
  slug: 'triangles-congruence-and-proof',
  title: 'Triangles: Congruence and the Craft of Proof',
  summary:
    'The chapter that makes geometers: congruence as exact coincidence, the five criteria (SAS, ASA, AAS, SSS, RHS) stated as postulates-of-method and used with discipline, and the classic consequences PROVED — isosceles triangles, the equilateral case, and the side/angle inequalities. Every proof is written the Euclidean way: statement, construction, argument, conclusion.',
  status: 'complete',
  lessons: [lessonGeo301, lessonGeo302, lessonGeo303, lessonGeo304, lessonGeo305, lessonGeo306],
  plannedLessons: [],
}
