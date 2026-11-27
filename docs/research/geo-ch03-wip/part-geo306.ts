import type { Lesson } from '../../../src/data/library/types'

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
  parts.push(`<text x="266" y="234" font-family="${f36}" font-size="12.5" fill="${c36.orange}" text-anchor="end" font-weight="600" stroke="#ffffff" stroke-width="3" paint-order="stroke">d = 3\u221a17 \u2248 12.37</text>`)
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
