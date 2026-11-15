import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 3: Complex Numbers: the New Rung
 *
 * LESSONS WRITTEN: 3.1 "The Closure Failure That Forces i" (run 105 —
 *                  the chapter OPENS) · 3.2 "Conjugate and Modulus"
 *                  (run 106 — the seeds cashed: the ten conjugate laws
 *                  proved and swept, the reciprocal engine 1/z = z̄/|z|²,
 *                  the sin-θ hunts, |z| as the distance reading with the
 *                  lattice census and the circle locus, the modulus laws
 *                  witnessed, the triangle inequality PROVED from the
 *                  components via AL 9.3's discriminant discipline, the
 *                  reverse law as the band engine; verify-first H/I
 *                  132/0 green pre-prose — the engines caught 4 real
 *                  errors in their own drafting; quiz [1, 0, 3, 2, 0]; 15
 *                  exercises L1–L6 2/2/3/3/3/2; 2 figures — the conjugate
 *                  mirror (reflection + the four-twins circle) and the
 *                  modulus as distance (the detour tax + the circle
 *                  locus); book.ts pins 3.3 Negative Discriminants, 3.4
 *                  The Argand Plane, 3.5 De Moivre/Roots of Unity as the
 *                  remaining planned lessons).
 *
 *                  Verify-first sections A–F green BEFORE prose for 3.1
 *                  (106/0 — the closure-failure engines incl. the 275/351
 *                  grid census, the iota cycle laws, the pair-construction
 *                  consistency sweep on all 6,561 integer quadruples, the
 *                  field-law survival census, the pinned Illustration
 *                  exhibits incl. Bombelli's (2+i)³ = 2+11i and the
 *                  quarter-turn square orbit; the engines caught 4 real
 *                  errors pre-prose: a FOIL-route sign slip, an (1−i)⁸
 *                  exponent error (the draft computed the sixth power),
 *                  and a float-equality lesson on the reciprocal sweep);
 *                  quiz keys [3, 1, 0, 2, 3]; 15 exercises L1–L6 with full
 *                  worked solutions; 2 figures — the extension ladder
 *                  (five rungs, each born from a closure failure) and the
 *                  Argand quarter-turn orbit of z = 2 + i (the square of
 *                  side √10 with the ×i rotation arc); 3 derivations (the
 *                  multiplication rule forced by FOIL + i² = −1, the
 *                  division rule by conjugating the denominator, the
 *                  quarter-turn law with its two certificates); 5 formula
 *                  cards; 11 Illustrations; 5
 *                  hosted m2-03 folds served (Complex Numbers +
 *                  Complex Number chapter-umbrellas by the arc, Imaginary
 *                  Number + Equality of Complex Numbers glossary terms
 *                  used in prose, Algebraic Operations on Complex Numbers
 *                  as the named section with formal definition + worked
 *                  examples). The D < 0 doors are NAMED as 3.3's promise,
 *                  never cashed here; the modulus is named as 3.2's.)
 *
 * CROSS-REFERENCES: opens on AL 9.3's discriminant trichotomy (its third
 * verdict is the failure being repaired), ANS 7.2's field-law survival
 * discipline and ANS 8.1's ladder rung (√2 — the last proved closure
 * failure before this one), and AA 2.R's exit (the D rail handed
 * forward). Bombelli 1572 carries the historical engine. Lesson 3.2
 * (Conjugate and Modulus) cashes the seeds planted here.
 */

/* ------------------------------------------------------------------ */
/* figures                                                             */
/* ------------------------------------------------------------------ */

function extensionLadderSvg(): string {
  // five rising rungs left-to-right; each box carries the system glyph,
  // its name, the failure that forced it and the number it needed; the
  // top rung (ℂ — this chapter) is highlighted orange
  const rungs: Array<{ glyph: string; name: string; birth: string; needs: string; hl: boolean }> = [
    { glyph: 'ℕ', name: 'the naturals', birth: 'counting', needs: 'the ground floor', hl: false },
    { glyph: 'ℤ', name: 'the integers', birth: 'x + 5 = 3', needs: 'needs −2', hl: false },
    { glyph: 'ℚ', name: 'the rationals', birth: '3x = 7', needs: 'needs 7/3', hl: false },
    { glyph: 'ℝ', name: 'the reals', birth: 'x² = 2', needs: 'needs √2', hl: false },
    { glyph: 'ℂ', name: 'complex numbers', birth: 'x² + 1 = 0', needs: 'needs i', hl: true },
  ]
  const BW = 118
  const BH = 74
  const GAPX = 26
  const RISE = 52
  let boxes = ''
  let arrows = ''
  rungs.forEach((r, i) => {
    const x = 8 + i * (BW + GAPX)
    const y = 238 - i * RISE
    const stroke = r.hl ? '#ea580c' : '#16a34a'
    const fill = r.hl ? '#ffedd5' : '#fef3c7'
    boxes +=
      `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
      `<text x="${x + BW / 2}" y="${y + 26}" font-size="19" font-weight="700" text-anchor="middle" fill="#166534">${r.glyph}</text>` +
      `<text x="${x + BW / 2}" y="${y + 41}" font-size="10" text-anchor="middle" fill="#0d9488">${r.name}</text>` +
      `<text x="${x + BW / 2}" y="${y + 57}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#65a30d">${r.birth}</text>` +
      `<text x="${x + BW / 2}" y="${y + 69}" font-size="10" text-anchor="middle" fill="#166534">${r.needs}</text>`
    if (i < rungs.length - 1) {
      const x1 = x + BW + 3
      const y1 = y + BH / 2 - 6
      const x2 = x + BW + GAPX - 7
      const y2 = y + BH / 2 - RISE + 8
      arrows +=
        `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#d97706" stroke-width="2.2" fill="none"/>` +
        `<polygon points="0,0 -10,3 -7,-7" transform="translate(${x2},${y2}) rotate(-67)" fill="#d97706"/>`
    }
  })
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extension ladder of number systems: five rising boxes for the naturals, integers, rationals, reals and complex numbers. Each box names the closure failure that forced the next system: x plus 5 equals 3 forced the integers (needs minus 2), 3x equals 7 forced the rationals (needs 7 thirds), x squared equals 2 forced the reals (needs root 2), and x squared plus 1 equals 0 forces the complex numbers (needs i). The complex box at the top is highlighted. Amber arrows climb left to right; a caption states that every rung keeps the field laws the rungs below already proved.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the extension ladder — every rung repairs a closure failure</text>
  ${boxes}
  ${arrows}
  <text x="360" y="332" font-size="11" text-anchor="middle" fill="#0f766e">every rung keeps the field laws the rungs below already proved — the survival discipline ANS 7.2 banked</text>
</svg>`
}

function argandOrbitSvg(): string {
  // left: the complex plane O = (290, 168), unit 34 px; the orbit square of
  // z = 2 + i under multiplication by i, the dashed radii, one rotation arc;
  // right: the pair-map note panel
  const OX = 290
  const OY = 168
  const U = 34
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - U * y
  const pts: Array<[number, number]> = [
    [2, 1],
    [-1, 2],
    [-2, -1],
    [1, -2],
  ]
  const cols = ['#16a34a', '#d97706', '#0d9488', '#ea580c']
  const labels = ['z = 2 + i', 'iz = −1 + 2i', 'i²z = −2 − i', 'i³z = 1 − 2i']
  const labelPos: Array<[number, number, string]> = [
    [px(2) + 8, py(1) - 4, 'start'],
    [px(-1) - 8, py(2) - 12, 'end'],
    [px(-2) - 8, py(-1) + 20, 'end'],
    [px(1) + 8, py(-2) + 16, 'start'],
  ]
  let sides = ''
  let dots = ''
  let tags = ''
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % 4]
    sides += `<line x1="${px(p[0])}" y1="${py(p[1])}" x2="${px(q[0])}" y2="${py(q[1])}" stroke="#65a30d" stroke-width="2.2"/>`
    dots += `<circle cx="${px(p[0])}" cy="${py(p[1])}" r="4.6" fill="${cols[i]}"/>`
    tags +=
      `<text x="${labelPos[i][0]}" y="${labelPos[i][1]}" font-size="11.5" font-weight="700" text-anchor="${labelPos[i][2]}" fill="${cols[i]}">${labels[i]}</text>` +
      `<path d="M${OX} ${OY} L${px(p[0])} ${py(p[1])}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.5" fill="none"/>`
  })
  const axX1 = px(-3.3)
  const axX2 = px(3.3)
  const axY1 = py(3.3)
  const axY2 = py(-3.3)
  // the rotation arc: radius 46 from the direction of z (26.57°) to the
  // direction of iz (116.57°), anticlockwise, with an arrowhead
  const arcStartX = OX + 46 * Math.cos((26.57 * Math.PI) / 180)
  const arcStartY = OY - 46 * Math.sin((26.57 * Math.PI) / 180)
  const arcEndX = OX + 46 * Math.cos((116.57 * Math.PI) / 180)
  const arcEndY = OY - 46 * Math.sin((116.57 * Math.PI) / 180)
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Argand plane showing the quarter-turn orbit of z equals 2 plus i. The four points z at (2, 1), iz at (minus 1, 2), i squared z at (minus 2, minus 1) and i cubed z at (1, minus 2) are joined by the four sides of a square centred at the origin, each side labelled by one multiplication by i. Dashed radii of length root 5 run from the origin to every vertex. A teal arc with an arrowhead near the origin shows the anticlockwise right-angle turn. A side panel states the pair map: multiplying by i sends (x, y) to (minus y, x), the distance to the origin is kept, the arrows are perpendicular, and the orbit is a square with squared side 2 times 2 squared plus 1 squared equals 10.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the quarter-turn orbit of z = 2 + i — one multiplication by i per side</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <path d="M${axX1} ${OY}H${axX2} M${OX} ${axY1}V${axY2}"/>
  </g>
  <text x="${axX2 - 4}" y="${OY - 8}" font-size="11" text-anchor="end" fill="currentColor" opacity="0.85">Re</text>
  <text x="${OX + 8}" y="${axY1 + 12}" font-size="11" fill="currentColor" opacity="0.85">Im</text>
  <g font-size="10" text-anchor="middle" fill="currentColor" opacity="0.85">
    <text x="${px(-2)}" y="${OY + 14}">−2</text>
    <text x="${px(-1) - 4}" y="${OY + 11}">−1</text>
    <text x="${px(1)}" y="${OY + 14}">1</text>
    <text x="${px(2)}" y="${OY + 14}">2</text>
    <text x="${OX - 8}" y="${py(2) + 4}" text-anchor="end">2</text>
    <text x="${OX - 8}" y="${py(1) + 4}" text-anchor="end">1</text>
    <text x="${OX - 8}" y="${py(-1) + 4}" text-anchor="end">−1</text>
    <text x="${OX - 8}" y="${py(-2) + 4}" text-anchor="end">−2</text>
  </g>
  ${tags}
  ${sides}
  <path d="M${arcStartX.toFixed(1)} ${arcStartY.toFixed(1)} A 46 46 0 0 0 ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}" stroke="#0d9488" stroke-width="2" fill="none"/>
  <polygon points="0,0 -10,3 -6,-7" transform="translate(${arcEndX.toFixed(1)},${arcEndY.toFixed(1)}) rotate(153)" fill="#0d9488"/>
  <text x="${(OX + 56 * Math.cos((71.6 * Math.PI) / 180)).toFixed(1)}" y="${(OY - 56 * Math.sin((71.6 * Math.PI) / 180)).toFixed(1)}" font-size="12.5" font-weight="700" text-anchor="middle" fill="#0f766e">× i</text>
  ${dots}
  <rect x="470" y="60" width="236" height="150" rx="9" fill="#fef3c7" stroke="#0d9488" stroke-width="2"/>
  <text x="484" y="84" font-size="12.5" font-weight="700" fill="#166534">the pair map</text>
  <g font-size="11" fill="#166534">
    <text x="484" y="108">× i sends (x, y) to (−y, x)</text>
    <text x="484" y="130">distance to O kept: x² + y²</text>
    <text x="484" y="152">arrows perpendicular: x(−y) + yx = 0</text>
    <text x="484" y="176">so the orbit is a square:</text>
    <text x="484" y="196" font-weight="700" fill="#65a30d">side² = 2(2² + 1²) = 10</text>
  </g>
  <g font-size="10.5" fill="#0f766e">
    <text x="470" y="236">the dashed radii all carry |z| = √5 —</text>
    <text x="470" y="252">each vertex is the last one turned a right</text>
    <text x="470" y="268">angle about O, at the same distance.</text>
  </g>
  <text x="360" y="330" font-size="11" text-anchor="middle" fill="#0f766e">multiplying by i turns every position arrow a right angle anticlockwise — distance kept, direction turned; four turns close the square</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 3.1                                                          */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* figures for lesson 3.2 — the conjugate mirror + the modulus as      */
/* distance (the detour tax panel + the circle-locus panel)           */
/* ------------------------------------------------------------------ */

function conjugateMirrorSvg(): string {
  // left: the Argand plane O = (230, 170), unit 27 px — four seats and
  // their mirrors, dashed reflection lines through the real axis;
  // right: the four-twins circle — z, z̄, −z, −z̄ all on |z| = r
  const OX = 230
  const OY = 170
  const U = 27
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - U * y
  const seats: Array<{ z: [number, number]; label: string; conjLabel: string; col: string; labAnchor: string; conjAnchor: string; labOff: [number, number]; conjOff: [number, number] }> = [
    { z: [4, 3], label: 'z = 4+3i', conjLabel: 'z̄ = 4−3i', col: '#16a34a', labAnchor: 'start', conjAnchor: 'start', labOff: [10, -6], conjOff: [17, 16] },
    { z: [-2, 5], label: 'w = −2+5i', conjLabel: 'w̄ = −2−5i', col: '#d97706', labAnchor: 'end', conjAnchor: 'start', labOff: [-10, -6], conjOff: [10, 8] },
  ]
  let dots = ''
  let mirrors = ''
  let labels = ''
  seats.forEach((s) => {
    const zx = px(s.z[0])
    const zy = py(s.z[1])
    const cx = px(s.z[0])
    const cy = py(-s.z[1])
    mirrors += `<line x1="${zx}" y1="${zy}" x2="${cx}" y2="${cy}" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="4 5" opacity="0.75" fill="none"/>`
    dots += `<circle cx="${zx}" cy="${zy}" r="4.5" fill="${s.col}"/><circle cx="${cx}" cy="${cy}" r="4.5" fill="${s.col}"/>`
    labels += `<text x="${zx + s.labOff[0]}" y="${zy + s.labOff[1]}" font-size="11.5" font-weight="700" text-anchor="${s.labAnchor}" fill="${s.col}">${s.label}</text>`
    labels += `<text x="${cx + s.conjOff[0]}" y="${cy + s.conjOff[1]}" font-size="11.5" font-weight="700" text-anchor="${s.conjAnchor}" fill="${s.col}">${s.conjLabel}</text>`
    labels += `<circle cx="${cx}" cy="${OY}" r="2.2" fill="#0d9488"/>`
  })
  // the purely imaginary pair ±4i mirrors ALONG the axis itself
  const iTop = py(4)
  const iBot = py(-4)
  dots += `<circle cx="${OX}" cy="${iTop}" r="4.5" fill="#ea580c"/><circle cx="${OX}" cy="${iBot}" r="4.5" fill="#ea580c"/>`
  mirrors += `<line x1="${OX}" y1="${iTop}" x2="${OX}" y2="${iBot - 18}" stroke="#ea580c" stroke-width="1.4" stroke-dasharray="4 5" opacity="0.75" fill="none"/>`
  labels += `<text x="${OX + 9}" y="${iTop + 4}" font-size="11" font-weight="700" fill="#ea580c">4i</text>`
  labels += `<text x="${OX + 9}" y="${iBot + 4}" font-size="11" font-weight="700" fill="#ea580c">−4i</text>`
  // a real seat: its own conjugate
  const tx = px(6)
  dots += `<circle cx="${tx}" cy="${OY}" r="4.5" fill="#0d9488"/>`
  labels += `<text x="${tx}" y="${OY + 17}" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">6</text>`
  labels += `<text x="${tx}" y="${OY - 24}" font-size="9.5" text-anchor="middle" fill="#0f766e">self-conjugate</text>`
  // right panel: the four-twins circle
  const CX = 580
  const CY = 185
  const R = 86
  // the four twins OF z = 4+3i, labelled by value (the caption names
  // them z, z-bar, −z and −z-bar): 4+3i above-right, 4−3i below-right,
  // −4+3i above-left, −4−3i below-left — one shared radius
  const tw: Array<{ dx: number; dy: number; name: string; col: string; anchor: string; off: [number, number] }> = [
    { dx: Math.cos(-40 * Math.PI / 180) * R, dy: Math.sin(-40 * Math.PI / 180) * R, name: '4+3i', col: '#16a34a', anchor: 'start', off: [13, 7] },
    { dx: Math.cos(-140 * Math.PI / 180) * R, dy: Math.sin(-140 * Math.PI / 180) * R, name: '−4+3i', col: '#d97706', anchor: 'end', off: [-13, 7] },
    { dx: Math.cos(40 * Math.PI / 180) * R, dy: Math.sin(40 * Math.PI / 180) * R, name: '4−3i', col: '#16a34a', anchor: 'start', off: [13, 7] },
    { dx: Math.cos(140 * Math.PI / 180) * R, dy: Math.sin(140 * Math.PI / 180) * R, name: '−4−3i', col: '#d97706', anchor: 'end', off: [-13, 7] },
  ]
  let twins = ''
  tw.forEach((t) => {
    const x = CX + t.dx
    const y = CY + t.dy
    twins += `<circle cx="${x}" cy="${y}" r="4.5" fill="${t.col}"/>`
    twins += `<line x1="${CX}" y1="${CY}" x2="${x}" y2="${y}" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 4" opacity="0.5" fill="none"/>`
    twins += `<text x="${x + t.off[0]}" y="${y + t.off[1]}" font-size="12" font-weight="700" text-anchor="${t.anchor}" fill="${t.col}">${t.name}</text>`
  })
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels on the conjugate. Left: the Argand plane with the real axis drawn as a teal mirror line. The point 4 plus 3i and its conjugate 4 minus 3i sit symmetrically across the axis, joined by a dashed vertical reflection line; the same for minus 2 plus 5i and its mirror minus 2 minus 5i. The purely imaginary pair 4i and minus 4i mirrors along the imaginary axis itself, and the real number 6 is its own conjugate, sitting on the axis. Right: a circle of radius r centred at the origin carrying the four twins z, conjugate z, minus z and minus conjugate z as symmetric points — all four share the same radius, so all four moduli are equal. Every point with a given modulus lies on this circle.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the conjugate — reflection in the real axis</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.55">
    <path d="M${px(-4.5)} ${OY}H${px(7.5)} M${OX} ${py(5.6)}V${py(-4.3)}"/>
  </g>
  <path d="M${px(-4.5)} ${OY}H${px(7.5)}" stroke="#0d9488" stroke-width="2.2" fill="none"/>
  <text x="${px(7.5) - 6}" y="${OY - 10}" font-size="10.5" text-anchor="end" fill="#0f766e" font-weight="700">Re — the mirror</text>
  <text x="${OX + 10}" y="${py(4.9)}" font-size="10.5" fill="currentColor" opacity="0.8">Im</text>
  ${mirrors}
  ${dots}
  ${labels}
  <text x="580" y="76" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">the four twins of 4+3i — one shared radius</text>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#0d9488" stroke-width="2"/>
  <circle cx="${CX}" cy="${CY}" r="3.5" fill="#166534"/>
  <text x="${CX - 10}" y="${CY + 4}" font-size="11" font-weight="700" fill="#166534" text-anchor="end">O</text>
  ${twins}
  <text x="580" y="300" font-size="10.5" text-anchor="middle" fill="#0d9488">all four moduli equal — the circle of modulus r</text>
  <text x="360" y="332" font-size="10.5" text-anchor="middle" fill="#0f766e">conjugation flips the imaginary sign only; real numbers (like 6) are their own conjugates</text>
</svg>`
}

function modulusDistanceSvg(): string {
  // left: the triangle-inequality detour witness — O to z = 2+i (green),
  // then the translated second leg (amber) to the sum 1+3i, versus the
  // direct orange route; right: the circle locus |z−3−4i| = 5 with its
  // centre, radius, the origin ON it and six of the 12 lattice seats
  const OX = 195
  const OY = 235
  const U = 34
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - U * y
  const z1: [number, number] = [2, 1]
  const z2: [number, number] = [-1, 2]
  const s: [number, number] = [1, 3]
  const left =
    `<g stroke="currentColor" stroke-width="0.8" opacity="0.5"><path d="M${px(-3.2)} ${OY}H${px(4.2)} M${OX} ${py(4.6)}V${py(-0.5)}"/></g>` +
    `<path d="M${OX} ${OY}L${px(z2[0])} ${py(z2[1])}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.45" fill="none"/>` +
    `<path d="M${px(z2[0])} ${py(z2[1])}L${px(s[0])} ${py(s[1])}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.45" fill="none"/>` +
    `<path d="M${OX} ${OY}L${px(z1[0])} ${py(z1[1])}" stroke="#16a34a" stroke-width="2.6" fill="none"/>` +
    `<path d="M${px(z1[0])} ${py(z1[1])}L${px(s[0])} ${py(s[1])}" stroke="#d97706" stroke-width="2.6" fill="none"/>` +
    `<path d="M${OX} ${OY}L${px(s[0])} ${py(s[1])}" stroke="#ea580c" stroke-width="3.4" fill="none"/>` +
    `<circle cx="${OX}" cy="${OY}" r="3.4" fill="#166534"/>` +
    `<circle cx="${px(z1[0])}" cy="${py(z1[1])}" r="4.6" fill="#16a34a"/>` +
    `<circle cx="${px(z2[0])}" cy="${py(z2[1])}" r="4.6" fill="#65a30d"/>` +
    `<circle cx="${px(s[0])}" cy="${py(s[1])}" r="4.6" fill="#ea580c"/>` +
    `<text x="${px(z1[0]) + 10}" y="${py(z1[1]) + 4}" font-size="11.5" font-weight="700" fill="#16a34a">2+i</text>` +
    `<text x="${px(z2[0]) - 10}" y="${py(z2[1]) - 4}" font-size="11.5" font-weight="700" text-anchor="end" fill="#65a30d">−1+2i</text>` +
    `<text x="${px(s[0]) + 10}" y="${py(s[1]) - 2}" font-size="11.5" font-weight="700" fill="#ea580c">sum = 1+3i</text>` +
    `<text x="${OX - 8}" y="${OY + 16}" font-size="10.5" fill="#166534" text-anchor="end">O</text>`
  // right panel: the circle locus, origin at (500, 272), unit 18
  const CX2 = 500
  const CY2 = 272
  const V = 18
  const qx = (x: number): number => CX2 + V * x
  const qy = (y: number): number => CY2 - V * y
  const cc: [number, number] = [3, 4]
  const seats: Array<[number, number]> = [
    [0, 0],
    [8, 4],
    [3, 9],
    [0, 8],
    [-2, 4],
    [7, 7],
  ]
  let seatDots = ''
  seats.forEach((p) => {
    seatDots += `<circle cx="${qx(p[0])}" cy="${qy(p[1])}" r="4.4" fill="#d97706"/>`
  })
  const right =
    `<g stroke="currentColor" stroke-width="0.8" opacity="0.5"><path d="M${qx(-1.4)} ${CY2}H${qx(9.6)} M${CX2} ${qy(9.8)}V${qy(-1.2)}"/></g>` +
    `<circle cx="${qx(cc[0])}" cy="${qy(cc[1])}" r="${5 * V}" fill="none" stroke="#0d9488" stroke-width="2.2"/>` +
    `<path d="M${qx(cc[0])} ${qy(cc[1])}L${qx(0)} ${qy(0)}" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="4 4" fill="none"/>` +
    `<text x="545" y="248" font-size="10.5" font-weight="700" fill="#0f766e">r = 5</text>` +
    `<circle cx="${qx(cc[0])}" cy="${qy(cc[1])}" r="4.6" fill="#16a34a"/>` +
    `<text x="${qx(cc[0]) + 9}" y="${qy(cc[1]) - 6}" font-size="11.5" font-weight="700" fill="#16a34a">centre 3+4i</text>` +
    `${seatDots}` +
    `<circle cx="${qx(0)}" cy="${qy(0)}" r="4.6" fill="#ea580c"/>` +
    `<text x="${qx(0) - 10}" y="${qy(0) + 16}" font-size="11" font-weight="700" text-anchor="end" fill="#ea580c">O</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels on the modulus as a distance. Left: the triangle inequality as a detour tax. From the origin, the green segment to the point 2 plus i has length root 5; the amber segment from there to the sum 1 plus 3i has length root 5 again; the direct orange route from the origin to 1 plus 3i has length root 10. Two legs of root 5 each cost about 4.47 against the direct 3.16 — the direct route is never longer. Right: the circle locus of the equation modulus of z minus 3 minus 4i equals 5 — centre at 3 plus 4i, radius 5, passing through the origin, with six of its twelve lattice points marked in amber.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the modulus as distance — the detour tax and the circle locus</text>
  ${left}
  <text x="195" y="292" font-size="10.5" text-anchor="middle" fill="#65a30d" font-weight="700">the detour: √5 + √5 ≈ 4.47</text>
  <text x="195" y="308" font-size="10.5" text-anchor="middle" fill="#ea580c" font-weight="700">direct: |sum| = √10 ≈ 3.16 — never longer</text>
  ${right}
  <text x="575" y="88" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">the circle locus |z − z₀| = r</text>
  <text x="575" y="304" font-size="10.5" text-anchor="middle" fill="#0d9488">centre z₀ = 3+4i, radius 5 — and the origin lies ON it</text>
  <text x="575" y="320" font-size="10.5" text-anchor="middle" fill="#0d9488">12 lattice seats in all (six marked) — the 3-4-5 offsets from (3, 4)</text>
  <text x="360" y="336" font-size="10.5" text-anchor="middle" fill="#0f766e">a modulus equation is a geometry statement: |z − z₀| = r reads “distance from z₀ equals r”</text>
</svg>`
}

function modulusMultiplicationSvg(): string {
  // two panels, each at its own honest zoom — every radius readable:
  // LEFT the factors plane (unit 9): z = 3+4i carries r = 45 px = 5 units,
  // w = 5−12i carries r = 117 px = 13 units. RIGHT the product plane
  // (unit 2.4): 63−16i carries r = 156 px = 65 units. The three
  // Pythagorean triples 3-4-5, 5-12-13 and 63-16-65 multiply into each
  // other (25 · 169 = 4225 = 65²) — multiplication scales lengths.
  const drawPlane = (oX: number, oY: number, u: number, pts: Array<{ z: [number, number]; label: string; col: string; labAnchor: string; labOff: [number, number] }>): string => {
    let out = ''
    pts.forEach((p) => {
      const x = oX + u * p.z[0]
      const y = oY - u * p.z[1]
      out += `<line x1="${oX}" y1="${oY}" x2="${x}" y2="${y}" stroke="${p.col}" stroke-width="1.8" stroke-dasharray="5 5" opacity="0.8" fill="none"/>`
      out += `<circle cx="${x}" cy="${y}" r="5" fill="${p.col}"/>`
      out += `<text x="${x + p.labOff[0]}" y="${y + p.labOff[1]}" font-size="12" font-weight="700" text-anchor="${p.labAnchor}" fill="${p.col}">${p.label}</text>`
    })
    out += `<circle cx="${oX}" cy="${oY}" r="3.4" fill="#166534"/>`
    out += `<text x="${oX - 8}" y="${oY + 15}" font-size="10.5" fill="#166534" text-anchor="end">O</text>`
    return out
  }
  const left = drawPlane(210, 165, 9, [
    { z: [3, 4], label: '3+4i · r = 5', col: '#16a34a', labAnchor: 'start', labOff: [12, -4] },
    { z: [5, -12], label: '5−12i · r = 13', col: '#d97706', labAnchor: 'start', labOff: [14, 18] },
  ])
  const right = drawPlane(540, 100, 2.4, [
    { z: [63, -16], label: '63−16i · r = 65', col: '#ea580c', labAnchor: 'end', labOff: [-14, 24] },
  ])
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The modulus-multiplication witness in two panels at different zooms. Left, the factors plane: the point 3 plus 4i with its dashed radius of length 5 from the origin, and the point 5 minus 12i with its dashed radius of length 13. Right, the product plane: the point 63 minus 16i with its dashed radius of length 65. The captions state that five times thirteen equals sixty-five — multiplication scales lengths, the modulus law as radius geometry — and that the 3-4-5 and 5-12-13 right triangles multiply into the 63-16-65 triple.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">multiplication scales lengths — |(3+4i)(5−12i)| = 5 · 13</text>
  <text x="210" y="52" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">the factors (zoom ×9)</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.5">
    <path d="M60 165H360 M210 62V290"/>
  </g>
  ${left}
  <text x="540" y="52" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">the product (zoom ×2.4)</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.5">
    <path d="M400 100H700 M540 62V180"/>
  </g>
  ${right}
  <text x="360" y="312" font-size="10.5" text-anchor="middle" fill="#0d9488">the radii 5, 13 and 65 — and 5 · 13 = 65: the modulus law as radius geometry</text>
  <text x="360" y="330" font-size="10.5" text-anchor="middle" fill="#0f766e">the 3-4-5 and 5-12-13 triples multiply into the 63-16-65 triple (25 · 169 = 4225 = 65²)</text>
</svg>`
}

const lesson31: Lesson = {
  id: 'aa-the-closure-failure-that-forces-i',
  number: '3.1',
  title: 'The Closure Failure That Forces i',
  concepts: [
    'the closure failure: x² + 1 = 0 has no real door, and it is the norm (275/351 of a census grid)',
    'the extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ — every rung repairs a failure and keeps the laws',
    'the imaginary unit i (iota) with i² = −1 and the mod-4 cycle of its powers',
    'complex numbers as ordered pairs: standard form a + bi, componentwise equality',
    'the four operations with the field-law survival census',
    'the conjugate seeds: z + z̄ = 2Re(z), zz̄ = a² + b², no zero divisors',
    'the Argand plane and multiplication by i as a quarter-turn',
  ],
  objectives: [
    'explain why x² + 1 = 0 has no real solution and why the D < 0 case is the norm, not an exception',
    'place ℂ on the extension ladder and state the survival discipline every rung obeys',
    'reduce any integral power of i by the mod-4 cycle, forwards and backwards',
    'read a complex number as a pair, split an equality into two real equations, and name Re(z), Im(z) honestly',
    'add, subtract, multiply and divide complex numbers, deriving the multiplication and division rules rather than quoting them',
    'use the conjugate seeds for bookkeeping and prove that ℂ has no zero divisors',
    'multiply by i as a quarter-turn and certify the orbit square',
  ],
  prerequisites: ['al-the-quadratic-formula-and-the-discriminant', 'ans-the-diagonal-that-broke-the-rationals', 'ans-the-field-laws-division-joins-the-family', 'aa-unit-review-the-quadratic-at-depth'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'AL 9.3 closed the quadratic formula with a trichotomy: $D > 0$ two real doors, $D = 0$ one double door, $D < 0$ — and for the third verdict it could only say "no real roots", a refusal, not an answer. AA 2.R ended the chapter by naming exactly what was being handed forward: the discriminant rail\'s negative stretch, the doors the formula promises but the real line cannot host. This chapter climbs to those doors. It begins with the smallest equation that exposes the failure, counts how common the failure is, and then does what Arithmetic and Number Systems did at every rung of the number tower: it BUILDS the system in which the failure disappears — not by decree, but by construction, with every law that already held surviving intact.' },
    { kind: 'para', text: 'The build follows the honest order. First the failure itself: $x^2 + 1 = 0$, and a census showing that families with no real door are the norm, not a curiosity. Then the ladder: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, each rung born from a closure failure — the discipline ANS proved rung by rung — with one more rung waiting. Then the new number $i$ (iota) and the arithmetic of its powers. Then the real work: complex numbers as ORDERED PAIRS, built so that equality is honest and $i^2 = -1$ is a theorem of the multiplication rule rather than a slogan; the four operations on the form $a + bi$; the field-law survival census that certifies the build. The conjugate arrives as bookkeeping — three seed identities that lesson 3.2 will cash into machinery — and the Argand plane gives the pair its first picture: multiplication by $i$ as a quarter-turn.' },

    { kind: 'heading', text: 'The Failure, Counted' },
    { kind: 'para', text: 'Why can $x^2 + 1 = 0$ have no real solution? Not because the algebra is clumsy — because a real square has a sign it cannot shed: for every real $x$, $x^2 \\geq 0$, so $x^2 + 1 \\geq 1 > 0$ at every seat of the line. The equation asks for a number whose square is $-1$; the real numbers contain none. In AL 9.3\'s language the discriminant reads $D = 0^2 - 4 \\cdot 1 \\cdot 1 = -4 < 0$, and the trichotomy\'s third verdict applies: the door the formula points to sits off the line entirely.' },
    { kind: 'example', title: 'Count the real doors of the family x² − 6x + k = 0 at k = 5, 8, 9, 10, 11, 12, and name the boundary seat', steps: [
      'The discriminant of $x^2 - 6x + k$ is $D = (-6)^2 - 4k = 36 - 4k$ — the middle coefficient is fixed, so $k$ alone moves the door count.',
      'At $k = 5$: $D = 16 > 0$, two real doors; at $k = 8$: $D = 4 > 0$, still two. At $k = 9$: $D = 0$, the double door $x = 3$ — the vertex parks exactly on the axis, the seat AA 2.1\'s range law called the touching case.',
      'At $k = 10, 11, 12$: $D = -4, -8, -12$, all negative — no real doors; the whole parabola floats above the axis with least value $-D/4 = k - 9 > 0$, the vertex read of AA 2.1 returning one last time.',
      'Hence, the family carries $2, 2, 1, 0, 0, 0$ real doors across the six seats, and $k = 9$ is the exact boundary: below it the doors are real, above it they are gone — the formula\'s promise unkept.',
    ] },
    { kind: 'para', text: 'How typical is the failure? Take a small honest census: every family $ax^2 + bx + c$ with $a \\in \\{1, 2, 3\\}$, $b$ from $-6$ to $6$, and $c$ from $1$ to $9$ — $351$ families in all. Recompute $D = b^2 - 4ac$ for each: **275 of them, about 78.3%, have $D < 0$**. The upward parabola parked above the axis — modest middle coefficient, healthy constant term — is not a curiosity of engineered examples; in this grid it is the MAJORITY case. The verdict "no real roots" is not an exception the real line graciously tolerates. It is a closure failure: the operation the quadratic formula needs — taking the square root of a negative discriminant — is an operation the real numbers do not have.' },
    { kind: 'callout', tone: 'insight', title: 'A closure failure, in ANS\u2019s exact sense', text: 'ANS defined a closure failure operationally: a number system is closed under an operation when every admissible input returns an output inside the system, and each failure forced a new rung of the tower. $\\mathbb{N}$ failed at subtraction, $\\mathbb{Z}$ at division, $\\mathbb{Q}$ at completeness — the $\\sqrt{2}$ diagonal. Here $\\mathbb{R}$ fails at squaring backwards: no real input returns a negative output. The repair follows the same discipline as every earlier rung: extend honestly, keep every law, prove the survival.' },
    { kind: 'para', text: 'One completed square says the same thing about the family\'s cleanest member. $x^2 + x + 1 = \\left(x + \\tfrac{1}{2}\\right)^2 + \\tfrac{3}{4}$: a square — never negative — plus a positive constant, so the expression bottoms at $\\tfrac{3}{4} > 0$ and never touches the axis. This is the $D = -3$ witness AA 2.R named when it handed this chapter its inheritance. The failure is structural, and it is time to repair it the way the tower was always built: one honest rung at a time.' },

    { kind: 'heading', text: 'The Extension Ladder' },
    { kind: 'para', text: 'The repair is not a new trick — it is the oldest pattern in the tower. Look at how every previous rung was born:' },
    { kind: 'list', marker: 'roman', items: [
      'in $\\mathbb{N}$, the equation $x + 5 = 3$ has no solution — counting numbers cannot walk backwards — so adjoining the negatives builds $\\mathbb{Z}$;',
      'in $\\mathbb{Z}$, the equation $3x = 7$ has no solution — integers cannot split into parts — so adjoining the fractions builds $\\mathbb{Q}$;',
      'in $\\mathbb{Q}$, the equation $x^2 = 2$ has no solution — no fraction squares to $2$, the diagonal that broke the rationals (ANS 8.1) — so adjoining the irrationals completes the line $\\mathbb{R}$;',
      'in $\\mathbb{R}$, the equation $x^2 + 1 = 0$ has no solution — no real square is negative — and adjoining one new number builds $\\mathbb{C}$, this chapter\'s work.',
    ] },
    { kind: 'figure', caption: 'The extension ladder: five systems, each rung built to repair the closure failure of the one below — ℤ to close subtraction, ℚ to close division, ℝ to close the gaps (x² = 2), ℂ to close negative squares (x² + 1 = 0). The top rung is this chapter; the survival discipline (every law kept) is the ladder\u2019s construction law.', svg: extensionLadderSvg() },
    { kind: 'para', text: 'The pattern has a discipline, and ANS 7.2 named it: the new rung must keep every law the old rungs proved. $\\mathbb{Z}$ did not break addition to gain subtraction; $\\mathbb{Q}$ did not break order to gain division; $\\mathbb{R}$ did not break the field laws to fill the gaps. Whatever we adjoin for $x^2 + 1 = 0$ must do the same: commutativity, associativity, distributivity, identities, inverses — the whole field-law family — must survive, and this lesson\'s verifier will sweep every one of them on exact integer grids. The smallest admissible repair needs only one new object: a single number whose square is $-1$.' },
    { kind: 'callout', tone: 'definition', title: 'The imaginary unit', text: 'The IMAGINARY UNIT is a new number, denoted $i$ (from the Greek letter iota), adjoined to $\\mathbb{R}$ with the single law $i^2 = -1$. For a positive real $k$, the square root of $-k$ then exists on the new rung: $\\sqrt{-k} = \\sqrt{k}\\, i$. A real multiple of $i$ — a number $bi$ with $b \\neq 0$ — is called an IMAGINARY NUMBER: its square is $-b^2 < 0$. Thus, $\\sqrt{-4} = 2i$ and $\\sqrt{-25} = 5i$.' },
    { kind: 'callout', tone: 'warn', title: 'The two-negative-surds fraud', text: 'The surd law $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ holds only when AT LEAST ONE of $a, b$ is non-negative. Apply it to two negatives and it manufactures absurdity: the fraud route reads $\\sqrt{-3}\\,\\sqrt{-12} = \\sqrt{36} = 6$; the honest route converts both surds first, $\\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = -6$. The same "argument" proves $6 = -6$ — one illegal move is the whole difference.' },
    { kind: 'example', title: 'Express √(−4)·√9 and √(−3)·√(−12) in the form a + bi', steps: [
      'First product: exactly ONE factor is negative, so the surd split is legal — $\\sqrt{-4} \\cdot \\sqrt{9} = 2i \\cdot 3 = 6i$, purely imaginary.',
      'Second product: BOTH factors are negative, so convert each surd before multiplying — $\\sqrt{-3}\\,\\sqrt{-12} = \\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = 6(-1) = -6$.',
      'Price the fraud for contrast: the illegal shortcut reads $\\sqrt{(-3)(-12)} = \\sqrt{36} = 6 \\neq -6$ — it fails exactly when both radicands are negative.',
      'Hence, $\\sqrt{-4}\\sqrt{9} = 6i$ and $\\sqrt{-3}\\sqrt{-12} = -6$: one negative factor keeps $i$ single; two negative factors pay the $i^2 = -1$ toll.',
    ] },
    { kind: 'formula', name: 'The negative-surd law', latex: '\\sqrt{-k} = \\sqrt{k}\\, i \\quad (k > 0)', note: 'convert first, combine never: √a·√b = √(ab) only when at least one of a, b is non-negative — two negative radicands pay the i² = −1 toll.' },

    { kind: 'heading', text: 'Integral Powers of Iota' },
    { kind: 'para', text: 'One law, $i^2 = -1$, generates the whole economy of $i$\'s powers. Multiply along: $i^1 = i$, $i^2 = -1$, $i^3 = i^2 \\cdot i = -i$, $i^4 = i^2 \\cdot i^2 = (-1)(-1) = 1$ — and at $i^4$ the clock restarts, because multiplying by $i^4$ is multiplying by $1$. For any larger exponent the division algorithm reduces it: write $n = 4q + r$ with $0 \\leq r \\leq 3$; then $i^n = i^{4q+r} = (i^4)^q\\, i^r = i^r$. Negative exponents obey the same cycle backwards — $1/i = -i$, because $i \\cdot (-i) = -i^2 = 1$ — so the entire economy of $i$\'s powers is four values.' },
    { kind: 'table', caption: 'The iota cycle: the division algorithm collapses every integral power to one of four values.', head: ['exponent $n \\bmod 4$', '$0$', '$1$', '$2$', '$3$'], rows: [
      ['$i^n$', '$1$', '$i$', '$-1$', '$-i$'],
    ] },
    { kind: 'example', title: 'Evaluate i²⁰²⁶ + i²⁰²⁷ + i²⁰²⁸ + i²⁰²⁹', steps: [
      'Reduce each exponent mod 4: $2026 = 4 \\cdot 506 + 2$, and $2027 \\equiv 3$, $2028 \\equiv 0$, $2029 \\equiv 1$, so the block reads $(-1) + (-i) + 1 + i$.',
      'The terms cancel in pairs: $(-1) + 1 = 0$ and $(-i) + i = 0$.',
      'Or factor the block outright: $i^{2026}(1 + i + i^2 + i^3) = i^{2026}(1 + i - 1 - i) = 0$ — no arithmetic at all beyond the cycle.',
      'Hence, $i^{2026} + i^{2027} + i^{2028} + i^{2029} = 0$.',
    ] },
    { kind: 'example', title: 'Evaluate i⁹⁹ and 1/i¹⁰¹', steps: [
      '$99 = 4 \\cdot 24 + 3$, so $i^{99} = i^3 = -i$.',
      '$101 = 4 \\cdot 25 + 1$, so $i^{101} = i$; then $\\dfrac{1}{i^{101}} = \\dfrac{1}{i} = -i$, since $i \\cdot (-i) = -i^2 = 1$.',
      'Both answers land on $-i$, from opposite directions: the power climbs to $i^3$ directly, the reciprocal walks backwards around the same four-step cycle.',
      'Hence, $i^{99} = -i$ and $1/i^{101} = -i$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Any four consecutive powers sum to zero', text: 'The factored route is the general law: $i^n + i^{n+1} + i^{n+2} + i^{n+3} = i^n(1 + i + i^2 + i^3) = 0$ for EVERY integer $n$. Four turns of the wheel always balance — and $1 + i + i^2 + i^3 = 0$ is no accident: it says the four fourth roots of unity have their centre of mass at the origin, the first hint of the spokes lesson 3.5 will mount on the unit circle.' },
    { kind: 'formula', name: 'The iota cycle', latex: 'i^{4q+r} = i^r, \\qquad 0 \\leq r \\leq 3', note: 'the division algorithm collapses every integral power of i to one of 1, i, −1, −i; negative exponents follow the same cycle (1/i = −i).' },

    { kind: 'heading', text: 'Complex Numbers: the Pair Construction' },
    { kind: 'para', text: 'What, honestly, IS the object "$a + bi$"? The reference module\'s own caution is exactly right: you cannot literally ADD a real number to an imaginary one — as raw types they do not meet, and the $+$ in "$a + bi$" is a connector, not yet an operation. The honest answer is the one ANS gave for fractions: define the new object as a PAIR of old objects, then earn the notation back. A fraction is a pair $(p, q)$ read as $p/q$; a complex number is a pair $(a, b)$ read as $a + bi$. The pair definition is what makes the algebra — especially equality — precise instead of decorative.' },
    { kind: 'callout', tone: 'definition', title: 'Complex number, standard form, real and imaginary parts', text: 'A COMPLEX NUMBER is an ordered pair $z = (a, b)$ of real numbers, displayed in STANDARD FORM as $z = a + bi$. The REAL PART of $z$ is the number $\\mathrm{Re}(z) = a$; the IMAGINARY PART is $\\mathrm{Im}(z) = b$ — a real number, not $bi$. The set of all complex numbers is $\\mathbb{C} = \\{(a, b) : a, b \\in \\mathbb{R}\\}$. If $b = 0$ the number is PURELY REAL; if $a = 0$ (with $b \\neq 0$) it is PURELY IMAGINARY. The reals embed as the pairs $(a, 0)$, so $\\mathbb{R} \\subset \\mathbb{C}$. Thus, $3 + 4i$, $5 = 5 + 0i$, $-2i = 0 - 2i$ and $\\sqrt{2} + \\tfrac{1}{2}i$ are all complex numbers.' },
    { kind: 'terms', items: [
      { term: 'Imaginary number', def: 'a real multiple $bi$ (with $b \\neq 0$) of the imaginary unit — a number whose square $-b^2$ is negative; "imaginary" is a historical label, not a verdict on existence.' },
      { term: 'Imaginary unit (iota)', def: 'the new number $i$, adjoined to the reals to repair the closure failure $x^2 + 1 = 0$, carrying the single law $i^2 = -1$.' },
      { term: 'Complex number', def: 'an ordered pair $(a, b)$ of real numbers written in standard form $a + bi$; the set of all of them is $\\mathbb{C}$.' },
      { term: 'Real part', def: 'for $z = a + bi$, the real number $a$, written $\\mathrm{Re}(z)$.' },
      { term: 'Imaginary part', def: 'for $z = a + bi$, the real number $b$ (not $bi$), written $\\mathrm{Im}(z)$.' },
      { term: 'Standard form', def: 'the display $a + bi$ with the real part first — every complex number has exactly one, because the pair is the object and the display is its name.' },
      { term: 'Equality of complex numbers', def: 'the componentwise law: $a_1 + b_1 i = a_2 + b_2 i$ if and only if $a_1 = a_2$ and $b_1 = b_2$ — two complex numbers are equal exactly when their real and imaginary parts agree.' },
      { term: 'Conjugate', def: 'for $z = a + bi$, the mirror twin $\\bar{z} = a - bi$ — the reflection of $z$ in the real axis of the Argand plane.' },
      { term: 'Argand plane', def: 'the coordinate plane that carries complex numbers as points: $(a, b)$ is the number $a + bi$, the horizontal axis is real, the vertical axis imaginary.' },
    ] },
    { kind: 'para', text: 'The notation is earned, not decreed. Treat $i$ as the NAME of the pair $(0, 1)$ and let the multiplication rule below do the work: $i \\cdot (a, 0) = (0, a)$ — the pair we write $ai$ — and $(a, b) = (a, 0) + (0, b) = a + bi$, which is exactly the decomposition the standard form displays. The check that the letter deserves its law is then one line of the rule: $(0, 1) \\cdot (0, 1) = (-1, 0)$, that is, $i^2 = -1$ comes out as a THEOREM of the multiplication rule, not an extra assumption.' },
    { kind: 'callout', tone: 'theorem', title: 'Equality of complex numbers', text: 'Two complex numbers are equal exactly when their components agree: $a_1 + b_1 i = a_2 + b_2 i \\iff a_1 = a_2 \\ \\text{and}\\ b_1 = b_2$. Thus, equality of complex numbers is equality of PAIRS — one equation in standard form is always two real equations. This is the law the whole theory of equations leans on: every "find the unknown complex number" problem is a system of two real ones in disguise.' },
    { kind: 'example', title: 'Find the real x and y with (2x − 1) + (y + 2)i = 3 + 5i', steps: [
      'Equality of complex numbers splits the statement into two real equations: the real parts give $2x - 1 = 3$; the imaginary parts give $y + 2 = 5$.',
      'Solve each: $2x = 4$ so $x = 2$; and $y = 3$.',
      'Substitute back as a check: $(2 \\cdot 2 - 1) + (3 + 2)i = 3 + 5i$ — both components agree.',
      'Hence, $x = 2$ and $y = 3$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The imaginary part is b, not bi', text: 'For $z = 3 + 5i$, the imaginary part is $\\mathrm{Im}(z) = 5$ — a real number — while $5i$ is the imaginary NUMBER occupying the second slot of the pair. Examiners price this confusion constantly: the imaginary part of $4 - 7i$ is $-7$, and writing $-7i$ is the priced error.' },

    { kind: 'heading', text: 'Algebraic Operations on Complex Numbers' },
    { kind: 'para', text: 'Now the operations — and the design brief is ANS 7.2\'s survival discipline: whatever rules we write, the field laws must hold on the new pairs. Write $z_1 = a + bi$ and $z_2 = c + di$ with $a, b, c, d$ real.' },
    { kind: 'callout', tone: 'definition', title: 'The four operations', text: 'ADDITION: $z_1 + z_2 = (a + c) + (b + d)i$ — the components add. SUBTRACTION: $z_1 - z_2 = (a - c) + (b - d)i$. MULTIPLICATION: $z_1 z_2 = (ac - bd) + (ad + bc)i$. DIVISION: for $z_2 \\neq 0$, $\\dfrac{z_1}{z_2} = \\dfrac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$. Closure is immediate — every output is another pair of reals, so $\\mathbb{C}$ is closed under all four — and the reals keep their own arithmetic: on pairs $(a, 0)$ and $(c, 0)$ the rules return exactly $(a + c, 0)$ and $(ac, 0)$.' },
    { kind: 'derivation', title: 'Why the multiplication rule is forced', statement: 'The pair rule $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$ is not one choice among many — it is what the notation already demands, with the single substitution $i^2 = -1$ doing all the work.', steps: [
      { label: 'Expand as for any two binomials', formula: '(a + bi)(c + di) = ac + adi + bci + bdi^2', explanation: 'the distributive law multiplies every term of the first bracket by every term of the second — four products, exactly as in $(x + 2)(x + 3)$.' },
      { label: 'Apply the one law', formula: 'bdi^2 = bd(-1) = -bd', explanation: 'this is the ONLY place the new number enters: every product of complex numbers reduces by exactly one substitution discipline, $i^2 = -1$.' },
      { label: 'Collect the real and imaginary parts', formula: '(ac - bd) + (ad + bc)i', explanation: 'the two real terms $ac$ and $-bd$ combine into the new real part; the two middle terms $ad\\,i$ and $bc\\,i$ share the letter $i$ and combine into its coefficient.' },
    ], result: 'The FOIL chain and the pair rule are the same statement — the verifier expanded both routes on all $6{,}561$ integer quadruples $a, b, c, d \\in \\{-4, \\ldots, 4\\}$ with zero mismatches. The letter\'s own law falls out as the special case $a = 0, b = 1, c = 0, d = 1$: $(0, 1)^2 = (-1, 0)$, that is, $i^2 = -1$.' },
    { kind: 'example', title: 'Compute (3 − 2i)(2 + 5i) by the FOIL route and by the pair rule', steps: [
      'FOIL route: $3 \\cdot 2 + 3 \\cdot 5i - 2i \\cdot 2 - 2i \\cdot 5i = 6 + 15i - 4i - 10i^2$; the substitution pays the last term: $-10(-1) = +10$.',
      'Collect: the real part $6 + 10 = 16$ and the imaginary part $15i - 4i = 11i$, so the product is $16 + 11i$.',
      'Pair rule: $(ac - bd) + (ad + bc)i$ with $a = 3, b = -2, c = 2, d = 5$ gives $(6 - (-10)) + (15 + (-4))i = 16 + 11i$ — the same line, pre-collected.',
      'Hence, $(3 - 2i)(2 + 5i) = 16 + 11i$ by both routes.',
    ] },
    { kind: 'table', caption: 'The field-law survival census — every law ANS 7.2 catalogued holds on the new rung (each row swept on exact integer grids in the verifier before this prose was written).', head: ['Law', 'Statement on $\\mathbb{C}$', 'Witness'], rows: [
      ['commutativity of $+$', '$z_1 + z_2 = z_2 + z_1$', '$(3-2i) + (2+5i) = (2+5i) + (3-2i) = 5 + 3i$'],
      ['commutativity of $\\times$', '$z_1 z_2 = z_2 z_1$', 'both orders give $16 + 11i$'],
      ['associativity ($+$ and $\\times$)', '$(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$, likewise $\\times$', 'every roster triple agrees, e.g. $((3-2i) + (2+5i)) + (-1+4i) = (3-2i) + (1+9i)$'],
      ['distributivity', '$z_1(z_2 + z_3) = z_1 z_2 + z_1 z_3$', 'the roster triples and the $5^4$ integer grid agree'],
      ['identities and inverses', '$0$ and $1$ work; every $z \\neq 0$ has $1/z = \\bar{z}/(z\\bar{z})$', '$1/(3+4i) = (3-4i)/25$'],
      ['no zero divisors', '$z_1 z_2 = 0 \\Rightarrow z_1 = 0$ or $z_2 = 0$', 'certificate: $(a^2+b^2)(c^2+d^2) = 0$ forces a factor to vanish'],
    ] },
    { kind: 'para', text: 'The census is the point ANS 7.2 made about $\\mathbb{Q}$: a field is not whatever happens to have addition and multiplication — it is what KEEPS the laws. Every row of the table was swept on exact integer grids before this prose existed: commutativity on the $7^4$ grid, associativity over every roster triple, distributivity on the roster and a $5^4$ grid, the conjugate-route reciprocal for every non-zero integer pair, and the no-zero-divisors certificate $|z_1 z_2|^2 = (a_1^2 + b_1^2)(a_2^2 + b_2^2)$, exact in integers. The new rung does not break the tower — that is the ladder\'s whole discipline, and it is what separates this construction from a notation game.' },
    { kind: 'example', title: 'Evaluate the power chain (1+i)², (1+i)⁴, (1+i)⁶ and (1+i)⁸', steps: [
      'Base move: $(1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$ — the substitution collapses the square to a single imaginary term.',
      'Square it again: $(1+i)^4 = (2i)^2 = 4i^2 = -4$, real. And once more: $(1+i)^8 = (-4)^2 = 16$.',
      'The sixth power rides between them: $(1+i)^6 = (1+i)^4 (1+i)^2 = (-4)(2i) = -8i$.',
      'Hence, $(1+i)^2 = 2i$, $(1+i)^4 = -4$, $(1+i)^6 = -8i$, $(1+i)^8 = 16$ — and by the mirror computation $(1-i)^2 = -2i$, $(1-i)^8 = 16$, so $(1+i)^8 + (1-i)^8 = 32$.',
    ] },
    { kind: 'derivation', title: 'The division rule: conjugate the denominator', statement: 'For $z_2 = c + di \\neq 0$, the quotient $z_1/z_2$ is computed by multiplying numerator and denominator by $\\overline{z_2} = c - di$ — the CONJUGATE of the denominator — which turns the denominator into the real number $c^2 + d^2 > 0$.', steps: [
      { label: 'Multiply by the conjugate over itself', formula: '\\frac{a+bi}{c+di} \\cdot \\frac{c-di}{c-di}', explanation: 'the factor equals $1$, so the value is unchanged; its purpose is purely structural — the new denominator will carry no letter at all.' },
      { label: 'The denominator turns real', formula: '(c+di)(c-di) = c^2 - d^2 i^2 = c^2 + d^2', explanation: 'the cross terms $cdi$ and $-cdi$ cancel, and $i^2 = -1$ flips the sign of the remaining $d^2$ term — a number times its conjugate is always real, and positive unless the number is $0$.' },
      { label: 'Expand the numerator', formula: '(a+bi)(c-di) = (ac + bd) + (bc - ad)i', explanation: 'FOIL with the same single substitution; watch the sign pattern — the real part ADDS the $bd$ term, because $-bdi^2$ pays $+bd$.' },
      { label: 'Divide componentwise by the real denominator', formula: '\\frac{a+bi}{c+di} = \\frac{ac+bd}{c^2+d^2} + \\frac{bc-ad}{c^2+d^2}\\,i', explanation: 'the denominator is now an ordinary positive real, so each component of the numerator simply scales — division has become real division.' },
    ], result: '$\\dfrac{a+bi}{c+di} = \\dfrac{(ac+bd) + (bc-ad)i}{c^2 + d^2}$ — the rule. The engine inside it is the conjugate, whose bookkeeping lesson 3.2 turns into the machinery of the modulus.' },
    { kind: 'example', title: 'Express (7 + i)/(3 + 4i) in standard form', steps: [
      'Conjugate the denominator: multiply by $\\dfrac{3-4i}{3-4i}$; the denominator becomes $3^2 + 4^2 = 25$, real and positive.',
      'Numerator: $(7+i)(3-4i) = 21 - 28i + 3i - 4i^2 = 21 + 4 - 25i = 25 - 25i$, the $-4i^2$ term paying $+4$.',
      'So $\\dfrac{7+i}{3+4i} = \\dfrac{25 - 25i}{25} = 1 - i$.',
      'Hence, $\\dfrac{7+i}{3+4i} = 1 - i$, confirmed by the multiplication check $(3+4i)(1-i) = 3 - 3i + 4i - 4i^2 = 7 + i$ — the original numerator returns.',
    ] },
    { kind: 'example', title: 'Solve (1 + i)x² − 2x + (1 − i) = 0, where the coefficients themselves are complex', steps: [
      'The quadratic formula AL 9.3 derived never used that the coefficients were real — run it as-is with $a = 1+i$, $b = -2$, $c = 1-i$.',
      'Discriminant: $D = b^2 - 4ac = 4 - 4(1+i)(1-i)$; and $(1+i)(1-i) = 1 - i^2 = 2$, the conjugate product already real, so $D = 4 - 8 = -4$.',
      'Square root of the discriminant, on the new rung: $\\sqrt{-4} = 2i$, so $x = \\dfrac{2 \\pm 2i}{2(1+i)} = \\dfrac{1 \\pm i}{1+i}$.',
      'Plus branch: $\\dfrac{1+i}{1+i} = 1$. Minus branch: $\\dfrac{1-i}{1+i} = \\dfrac{(1-i)^2}{(1+i)(1-i)} = \\dfrac{-2i}{2} = -i$.',
      'Hence, $x = 1$ or $x = -i$ — substitution confirms both: at $x = -i$, $(1+i)(-i)^2 - 2(-i) + (1-i) = -(1+i) + 2i + 1 - i = 0$, and $x = 1$ checks the same way.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main\'s algebra unit names complex numbers and quadratic equations explicitly: the four operations and the iota cycle are the single-correct staples, division-by-conjugating and complex-coefficient quadratics like the last Illustration appear as short-answer and assertion items, and NCERT class 11 ch. 4 carries the same arc at school depth (standard form, equality, the operations). The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'formula', name: 'Multiplication of complex numbers', latex: '(a+bi)(c+di) = (ac-bd) + (ad+bc)i', note: 'FOIL, then the single substitution i² = −1; the pair rule and the notation agree by construction.' },
    { kind: 'formula', name: 'Division of complex numbers', latex: '\\frac{a+bi}{c+di} = \\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}', note: 'conjugate the denominator; the bottom becomes the real c² + d² > 0 unless the divisor is zero.' },

    { kind: 'heading', text: 'The Conjugate: Bookkeeping Seeds' },
    { kind: 'para', text: 'One object did quiet work in every division: the mirrored denominator $c - di$. It deserves a name now, because lesson 3.2 builds its whole machinery on it.' },
    { kind: 'callout', tone: 'definition', title: 'Conjugate', text: 'The CONJUGATE of $z = a + bi$ is $\\bar{z} = a - bi$ — the same real part, the imaginary part with its sign flipped. On the Argand plane below it is the reflection of $z$ in the real axis. Thus, $\\overline{3+4i} = 3-4i$ and $\\overline{2-3i} = 2+3i$, and a purely real number is its own conjugate.' },
    { kind: 'example', title: 'For z = 3 + 4i, compute z + z̄, z − z̄ and zz̄', steps: [
      'Sum: $z + \\bar{z} = (3+4i) + (3-4i) = 6$ — purely real, exactly double the real part; the imaginary parts cancel by the flip.',
      'Difference: $z - \\bar{z} = (3+4i) - (3-4i) = 8i$ — purely imaginary, double the imaginary part times $i$.',
      'Product: $(3+4i)(3-4i) = 9 - 12i + 12i - 16i^2 = 9 + 16 = 25$ — real, positive, and exactly $3^2 + 4^2$, the Pythagorean square of the components.',
      'Hence, $z + \\bar{z} = 6$, $z - \\bar{z} = 8i$ and $z\\bar{z} = 25$.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The conjugate seeds', text: 'For every $z = a + bi$: (i) $z + \\bar{z} = 2a = 2\\,\\mathrm{Re}(z)$; (ii) $z - \\bar{z} = 2bi = 2i\\,\\mathrm{Im}(z)$; (iii) $z\\bar{z} = a^2 + b^2$ — real, $\\geq 0$, and zero only at $z = 0$; (iv) $z = \\bar{z}$ exactly when $z$ is purely real; (v) $z + \\bar{z} = 0$ exactly when $z$ is purely imaginary. Lesson 3.2 cashes seed (iii) into the MODULUS $|z| = \\sqrt{z\\bar{z}}$ — the distance reading — and rides it to the triangle inequality.' },
    { kind: 'para', text: 'Seed (iii) already proves something the tower cares about: $\\mathbb{C}$ has no zero divisors. Suppose $z_1 z_2 = 0$; multiply both sides by $\\bar{z_1}\\bar{z_2}$ and regroup the left by associativity and commutativity: $(z_1 \\bar{z_1})(z_2 \\bar{z_2}) = (a_1^2 + b_1^2)(a_2^2 + b_2^2)$, a product of non-negative real numbers. A product of non-negative reals vanishes only when a factor does — $a_1^2 + b_1^2 = 0$ forces $z_1 = 0$, and likewise for $z_2$. The same identity, written $|z_1 z_2|^2 = |z_1|^2 |z_2|^2$ as the verifier\'s certificate does, is the seed of the modulus law $|z_1 z_2| = |z_1||z_2|$ that 3.2 states and 3.4 will watch become rotation-and-scaling.' },
    { kind: 'formula', name: 'The conjugate seeds', latex: 'z + \\bar{z} = 2\\,\\mathrm{Re}(z), \\quad z - \\bar{z} = 2i\\,\\mathrm{Im}(z), \\quad z\\bar{z} = a^2+b^2 \\geq 0', note: 'the mirror twin\u2019s three bookkeeping laws; zz̄ = 0 only at z = 0, and |zw|² = |z|²|w|² is the no-zero-divisors certificate.' },

    { kind: 'heading', text: 'The Argand Plane: the First Picture' },
    { kind: 'para', text: 'A complex number is a pair $(a, b)$ — and a pair of reals is a POINT on a coordinate plane. Plot $z = a + bi$ at the point $(a, b)$: the horizontal axis carries the real part (the REAL AXIS), the vertical carries the imaginary part (the IMAGINARY AXIS), and the resulting picture is the ARGAND PLANE. Purely real numbers live on the real axis, purely imaginary ones on the imaginary axis, and $0$ sits at their crossing. That is the whole representation — the deep geometry (polar form, the argument, multiplication as rotation-and-scaling) is lesson 3.4\'s territory, entered through 3.2\'s modulus. One law, though, belongs to THIS lesson, because it is pure algebra of the letter $i$: what multiplication by $i$ does to the picture.' },
    { kind: 'figure', caption: 'The Argand plane and the quarter-turn: the orbit of z = 2 + i under multiplication by i — z, iz = −1 + 2i, i²z = −2 − i, i³z = 1 − 2i — forms a square of side √10 centred at the origin. Multiplying by i sends (x, y) to (−y, x): distance to the origin kept, right angle turned.', svg: argandOrbitSvg() },
    { kind: 'derivation', title: 'Multiplication by i is a quarter-turn', statement: 'For any $z = x + yi$, the product $iz = -y + xi$ is the point obtained by rotating $z$ about the origin through a right angle anticlockwise.', steps: [
      { label: 'Multiply out', formula: 'iz = i(x + yi) = ix + yi^2 = -y + xi', explanation: 'one substitution $i^2 = -1$; the real part of the product is the OLD imaginary part negated, and the imaginary part is the old real part.' },
      { label: 'Read the pair map', formula: '(x, y) \\mapsto (-y, x)', explanation: 'rotation through $90^\\circ$ anticlockwise sends the point $(x, y)$ to exactly $(-y, x)$ — the coordinates trade places and one sign flips.' },
      { label: 'Distance preserved', formula: '(-y)^2 + x^2 = x^2 + y^2', explanation: 'the moved point keeps its squared distance to the origin — a rotation, not a stretch. (The stretch, when it comes, is multiplication by a general complex number — 3.4\'s story.)' },
      { label: 'Right angle certified', formula: 'x(-y) + yx = 0', explanation: 'the dot product of the old and new position vectors vanishes: the arrow from $0$ to $z$ and the arrow from $0$ to $iz$ are perpendicular.' },
    ], result: 'Every multiplication by $i$ turns the plane anticlockwise by $\\tfrac{\\pi}{2}$ — and by $-i$ clockwise, its mirror $-iz = y - xi$. The orbit of any $z \\neq 0$ under $i, i^2, i^3$ is therefore a SQUARE centred at the origin: the verifier certifies the side law $\\text{side}^2 = 2(a^2+b^2)$ and the vanishing dot products on the $9 \\times 9$ integer grid.' },
    { kind: 'example', title: 'Show that z = 2 + i, iz, i²z, i³z are the vertices of a square', steps: [
      'The orbit: $z = 2+i$; $iz = i(2+i) = -1+2i$; $i^2 z = -(2+i) = -2-i$; $i^3 z = -i(2+i) = 1-2i$ — the quarter-turn sends $(2,1) \\mapsto (-1,2) \\mapsto (-2,-1) \\mapsto (1,-2)$.',
      'Side from $z$ to $iz$: difference $(-3, 1)$, squared length $9 + 1 = 10$. Side from $iz$ to $i^2z$: difference $(-1, -3)$, squared length $1 + 9 = 10$ — and the same $10$ for the remaining two sides by the turn\'s symmetry.',
      'Right angles: consecutive side vectors $(-3, 1)$ and $(-1, -3)$ have dot product $3 - 3 = 0$; so does every consecutive pair.',
      'Hence, the four orbit points are the vertices of a square with side $\\sqrt{10}$ centred at the origin — the general law $\\text{side}^2 = 2(a^2+b^2) = 2(2^2+1^2)$ read on the witness.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Bombelli\u2019s wild thought, 1572', text: 'Cardan\'s formula (1545) could solve the cubic $x^3 = 15x + 4$ — but only by passing through $\\sqrt{-121}$: the formula\'s buried constant reads $2 \\pm 11i$ in this chapter\'s language, while the equation visibly owns the honest real root $x = 4$ ($64 = 60 + 4$). Rafael Bombelli, in his 1572 Algebra, proposed the "wild thought": treat $\\sqrt{-1}$ as an object with RULES and compute anyway. Guess $\\sqrt[3]{2 + 11i} = 2 + i$ — check: $(2+i)^3 = (3+4i)(2+i) = 2 + 11i$ — and its mirror $\\sqrt[3]{2-11i} = 2 - i$; the two cube roots then add to $4$, the real root, exactly as the formula promised. That is the honest historical engine of $i$: not the school equation $x^2 + 1 = 0$, which nobody needed, but the cubic refusing to yield a REAL answer without complex bookkeeping. The letter earned its citizenship by work — which is why it stayed.' },
    { kind: 'para', text: 'The rung is built and certified. What waits above it, in order: lesson 3.2 turns the conjugate\'s seeds into machinery — the modulus as a distance, the full properties list, the triangle inequality; lesson 3.3 returns to AL 9.3\'s trichotomy and keeps its promise, computing the $D < 0$ doors and proving that real coefficients force them in conjugate pairs; lesson 3.4 reads the Argand plane in polar coordinates and watches multiplication become rotation-and-scaling; lesson 3.5 mounts the unit circle\'s equal spokes — De Moivre and the roots of unity, where $1 + i + i^2 + i^3 = 0$ finally shows its hand. The tower has a new storey, and nothing below it broke.' },

    { kind: 'quiz', title: 'Check yourself: the closure failure and the new rung', items: [
      { q: 'The value of $i^{2027}$ is:', options: ['$1$', '$i$', '$-1$', '$-i$'], answer: 3, explain: 'Reduce the exponent mod 4: $2027 = 4 \\cdot 506 + 3$, so $i^{2027} = i^3 = -i$ (option D). Option A is the residue-0 value ($i^4$\'s), option B the residue-1 value, option C the residue-2 value — each distractor is one wrong remainder read.' },
      { q: '$\\sqrt{-3} \\cdot \\sqrt{-12}$ equals:', options: ['$6$', '$-6$', '$6i$', '$-6i$'], answer: 1, explain: 'Both radicands are negative, so convert each surd first: $\\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = -6$ (option B). Option A is the fraud route $\\sqrt{(-3)(-12)} = \\sqrt{36}$ — the exact absurdity the Caution prices. Options C and D keep a stray $i$: the product of two purely imaginary numbers is real.' },
      { q: 'If $(2x - 1) + (y+2)i = 3 + 5i$ with $x, y$ real, then:', options: ['$(x, y) = (2, 3)$', '$(x, y) = (2, 5)$', '$(x, y) = (1, 3)$', '$(x, y) = (3, 2)$'], answer: 0, explain: 'Equality of complex numbers splits the statement into two real equations: $2x - 1 = 3$ gives $x = 2$, and $y + 2 = 5$ gives $y = 3$ (option A). Option B solves the imaginary equation as $y + 2 = 7$; option C solves $2x - 1 = 1$; option D swaps the two answers between the components.' },
      { q: '$\\dfrac{7+i}{3+4i}$ equals:', options: ['$1 + i$', '$-1 + i$', '$1 - i$', '$\\dfrac{7}{3} + \\dfrac{1}{4}i$'], answer: 2, explain: 'Conjugate the denominator: $\\dfrac{(7+i)(3-4i)}{3^2+4^2} = \\dfrac{25 - 25i}{25} = 1 - i$ (option C). Option A flips the imaginary sign — the $(7+i)(3+4i)$ expansion; option B flips both signs; option D is the "split the fraction" fraud — $(a+bi)/(c+di)$ is not $a/c + (b/d)i$, the most-priced beginner error.' },
      { q: 'For every complex number $z$, the product $z\\bar{z}$ is:', options: ['real, but possibly negative', 'purely imaginary', 'real only when $z$ is real', 'real and $\\geq 0$, zero only at $z = 0$'], answer: 3, explain: '$z\\bar{z} = a^2 + b^2$, a sum of squares — real, never negative, and zero exactly when $a = b = 0$ (option D). Option A confuses the sign flip with the whole product: the flip hits the CROSS terms, which cancel; option B describes $z - \\bar{z}$, the other seed; option C misses that $a^2 + b^2$ is real for every $z$, not just purely real ones.' },
    ] },

    { kind: 'exercises', title: 'Exercises 3.1', sets: [
      { level: 'L1', questions: [
        { q: 'Express $\\sqrt{-50}$, $\\sqrt{-27}$ and $\\sqrt{-8}$ in terms of $i$.', solution: [
          'Pull the negative out as the unit and extract the largest square: $\\sqrt{-50} = \\sqrt{50}\\,i = 5\\sqrt{2}\\,i$, since $50 = 25 \\cdot 2$.',
          'Same move twice: $\\sqrt{-27} = \\sqrt{27}\\,i = 3\\sqrt{3}\\,i$ (largest square $9$), and $\\sqrt{-8} = \\sqrt{8}\\,i = 2\\sqrt{2}\\,i$ (largest square $4$).',
          'Each result is purely imaginary — the real part is $0$ throughout, and each square $(5\\sqrt{2}\\,i)^2 = -50$ checks the extraction.',
        ], answer: '$\\sqrt{-50} = 5\\sqrt{2}\\,i$, $\\sqrt{-27} = 3\\sqrt{3}\\,i$, $\\sqrt{-8} = 2\\sqrt{2}\\,i$' },
        { q: 'Evaluate $i^{134} + i^{136} + i^{138} + i^{140}$.', solution: [
          'Reduce each exponent mod 4: $134 \\equiv 2$, $136 \\equiv 0$, $138 \\equiv 2$, $140 \\equiv 0$.',
          'So the sum reads $(-1) + 1 + (-1) + 1$ — the even-stride alternation of the cycle.',
          'The pairs cancel: $(-1) + 1 = 0$ twice over.',
        ], answer: '$0$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Express $\\dfrac{4+3i}{2-i}$ in the form $a + bi$.', solution: [
          'Conjugate the denominator: multiply by $\\dfrac{2+i}{2+i}$; the bottom turns into $2^2 + 1^2 = 5$.',
          'Numerator: $(4+3i)(2+i) = 8 + 4i + 6i + 3i^2 = 8 - 3 + 10i = 5 + 10i$.',
          'So the quotient is $\\dfrac{5+10i}{5} = 1 + 2i$.',
          'Check by multiplication: $(2-i)(1+2i) = 2 + 4i - i - 2i^2 = 4 + 3i$ — the original numerator returns.',
        ], answer: '$1 + 2i$' },
        { q: 'Find the real $x, y$ with $(3x + 2) + (y - 4)i = 8 - 3i$.', solution: [
          'Equality splits into components: the real parts give $3x + 2 = 8$; the imaginary parts give $y - 4 = -3$.',
          'First: $3x = 6$, so $x = 2$. Second: $y = 1$.',
          'Substitute back: $(3 \\cdot 2 + 2) + (1 - 4)i = 8 - 3i$ — both components agree.',
        ], answer: '$x = 2,\\ y = 1$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Compute $(3-2i)(2+5i)$ by both routes — the FOIL expansion and the pair rule — and confirm they agree.', solution: [
          'FOIL: $6 + 15i - 4i - 10i^2 = 6 + 10 + 11i$ after the substitution pays $-10(-1) = +10$.',
          'Pair rule: $(ac - bd) + (ad + bc)i$ with $a = 3, b = -2, c = 2, d = 5$ gives $(6 - (-10)) + (15 - 4)i = 16 + 11i$.',
          'The rule pre-collects exactly what FOIL produces — the two routes are one statement, as the derivation proved.',
        ], answer: '$16 + 11i$ by both routes' },
        { q: 'Evaluate $(1+i)^6$.', solution: [
          'Base move: $(1+i)^2 = 1 + 2i + i^2 = 2i$.',
          'Then $(1+i)^6 = (2i)^3 = 8i^3 = -8i$.',
          'The result is purely imaginary — odd multiples of the base square keep the letter, even multiples shed it (the fourth power was $-4$, real).',
        ], answer: '$-8i$' },
        { q: 'For $z = 3 + 4i$, compute $z + \\bar{z}$, $z - \\bar{z}$ and $z\\bar{z}$, and state which of the three can never be negative.', solution: [
          'Sum: $(3+4i) + (3-4i) = 6$; difference: $(3+4i) - (3-4i) = 8i$; product: $9 + 16 = 25$.',
          'The product is the sum of squares $a^2 + b^2$ — real and $\\geq 0$ for every $z$, zero only at the origin.',
          'The sum can be any real number (twice the real part) and the difference any purely imaginary one — only the product carries the sign discipline.',
        ], answer: '$z+\\bar{z} = 6$, $z-\\bar{z} = 8i$, $z\\bar{z} = 25$; the product is never negative' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $x^2 + (1+i)x + i = 0$.', solution: [
          'Run the quadratic formula with $a = 1$, $b = 1+i$, $c = i$ — nothing in AL 9.3\'s derivation required real coefficients.',
          'Discriminant: $D = (1+i)^2 - 4i = 2i - 4i = -2i$.',
          'A square root of $-2i$: $(1-i)^2 = 1 - 2i + i^2 = -2i$, so $\\sqrt{D} = \\pm(1-i)$.',
          'Roots: $x = \\dfrac{-(1+i) \\pm (1-i)}{2}$ — plus branch $\\dfrac{-2i}{2} = -i$; minus branch $\\dfrac{-2}{2} = -1$.',
          'Check $x = -1$: $1 - (1+i) + i = 0$. Check $x = -i$: $(-i)^2 + (1+i)(-i) + i = -1 - i + 1 + i = 0$.',
        ], answer: '$x = -1$ or $x = -i$' },
        { q: 'Express $\\dfrac{1}{1-i} + \\dfrac{1}{1+i}$ in standard form.', solution: [
          'First term: multiply by $\\dfrac{1+i}{1+i}$ — the denominator turns into $1^2 + 1^2 = 2$, so $\\dfrac{1}{1-i} = \\dfrac{1+i}{2}$.',
          'Second term, the mirror conjugation: $\\dfrac{1}{1+i} = \\dfrac{1-i}{2}$.',
          'Add: $\\dfrac{(1+i) + (1-i)}{2} = \\dfrac{2}{2} = 1$ — the two terms are conjugates, and a number plus its conjugate is twice its real part.',
        ], answer: '$1$' },
        { q: 'Find every complex $z$ with $z + \\bar{z} = 8$ and $z\\bar{z} = 25$.', solution: [
          'Write $z = a + bi$; the seeds read $z + \\bar{z} = 2a$ and $z\\bar{z} = a^2 + b^2$.',
          'So $2a = 8$ gives $a = 4$; then $16 + b^2 = 25$ gives $b^2 = 9$, so $b = \\pm 3$.',
          'Hence, $z = 4 + 3i$ or $z = 4 - 3i$ — a conjugate PAIR, and that is no accident: both conditions are conjugation-symmetric, so the solution set must be mirror-closed.',
        ], answer: '$z = 4 + 3i$ or $z = 4 - 3i$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Bombelli\u2019s check: show that $(2+i)^3 = 2 + 11i$, deduce the value of $\\sqrt[3]{2+11i} + \\sqrt[3]{2-11i}$, and verify that this value is a root of $x^3 = 15x + 4$.', solution: [
          '$(2+i)^2 = 3 + 4i$; multiply once more: $(3+4i)(2+i) = 6 + 3i + 8i + 4i^2 = 2 + 11i$.',
          'By the mirror computation (flip the sign of $i$ throughout): $(2-i)^3 = 2 - 11i$.',
          'So $\\sqrt[3]{2+11i} + \\sqrt[3]{2-11i} = (2+i) + (2-i) = 4$.',
          'Check the root: $4^3 = 64$ and $15 \\cdot 4 + 4 = 64$ — the equation balances.',
        ], answer: 'the cube-root expression equals $4$, and $4^3 = 15 \\cdot 4 + 4$' },
        { q: 'Prove from the pair rules that multiplication of complex numbers is commutative: $z_1 z_2 = z_2 z_1$ for all $z_1, z_2$.', solution: [
          'Write $z_1 = (a, b)$ and $z_2 = (c, d)$; the rule gives $z_1 z_2 = (ac - bd,\\ ad + bc)$.',
          'In the other order: $z_2 z_1 = (ca - db,\\ cb + da)$.',
          'Compare components: $ac = ca$ and $bd = db$ by commutativity of REAL multiplication, so the real parts agree; likewise $ad = da$ and $bc = cb$, so the imaginary parts agree.',
        ], answer: '$z_1 z_2 = z_2 z_1$ for all complex numbers — inherited componentwise from ℝ, nothing new assumed' },
        { q: 'Find all natural numbers $n$ for which $1 + i^2 + i^4 + \\dots + i^{2n} = 1$.', solution: [
          'Even powers only: $i^{2k} = (i^2)^k = (-1)^k$, so the sum is $1 - 1 + 1 - \\dots + (-1)^n$ — $n + 1$ alternating terms.',
          'Pair them from the left: each pair $1 - 1$ cancels, leaving the last term unpaired exactly when $n$ is even.',
          'So the closed form is $\\dfrac{1 + (-1)^n}{2}$: it equals $1$ when $n$ is even and $0$ when $n$ is odd.',
        ], answer: 'precisely the even $n$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: for any complex $z \\neq 0$, the four points $z, iz, i^2z, i^3z$ are the vertices of a square.', solution: [
          'Write $z = a + bi \\neq 0$; the quarter-turn sends $(a, b) \\mapsto (-b, a) \\mapsto (-a, -b) \\mapsto (b, -a)$ — the orbit closes after exactly four turns.',
          'First side vector, from $z$ to $iz$: $\\mathbf{s_1} = (-(a+b),\\ a-b)$; second, from $iz$ to $i^2z$: $\\mathbf{s_2} = (b-a,\\ -(a+b))$ — which is $\\mathbf{s_1}$ turned by a right angle.',
          'Squared lengths: $|\\mathbf{s_1}|^2 = (a+b)^2 + (a-b)^2 = 2(a^2 + b^2)$ and $|\\mathbf{s_2}|^2 = (b-a)^2 + (a+b)^2 = 2(a^2+b^2)$ — all four sides share the length, each being the previous one turned.',
          'Perpendicularity: $\\mathbf{s_1} \\cdot \\mathbf{s_2} = -(a+b)(b-a) + (a-b)(-(a+b)) = (a^2 - b^2) + (b^2 - a^2) = 0$.',
        ], answer: 'always a square — sides $\\sqrt{2(a^2+b^2)}$, centre at the origin' },
        { q: 'Prove that $\\mathbb{C}$ has no zero divisors: $z_1 z_2 = 0$ forces $z_1 = 0$ or $z_2 = 0$.', solution: [
          'Suppose $z_1 z_2 = 0$ with $z_1 = a + bi$ and $z_2 = c + di$; multiply both sides by $\\bar{z_1}\\bar{z_2}$, legal by associativity and commutativity.',
          'The left side regroups: $(z_1 \\bar{z_1})(z_2 \\bar{z_2}) = (a^2 + b^2)(c^2 + d^2)$, using the conjugate seed twice.',
          'So $(a^2 + b^2)(c^2 + d^2) = 0$ — a product of non-negative REAL numbers.',
          'A product of non-negative reals vanishes only when a factor does: $a^2 + b^2 = 0$ forces $a = b = 0$, that is $z_1 = 0$; likewise $c^2 + d^2 = 0$ forces $z_2 = 0$.',
        ], answer: '$z_1 z_2 = 0 \\Rightarrow z_1 = 0$ or $z_2 = 0$ (the certificate also shows $|z_1z_2|^2 = |z_1|^2|z_2|^2$)' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 3.2 — Conjugate and Modulus                                  */
/* ------------------------------------------------------------------ */

const lesson32: Lesson = {
  id: 'aa-conjugate-and-modulus',
  number: '3.2',
  title: 'Conjugate and Modulus',
  concepts: [
    'conjugate of a complex number',
    'conjugate properties',
    'modulus of a complex number',
    'modulus laws',
    'triangle inequality',
    'reciprocal engine',
    'distance reading',
    'circle locus',
  ],
  objectives: [
    'Flip a complex number across the real axis and command the ten laws of the conjugate — proved, swept and witnessed.',
    'Divide by any non-zero complex number through the reciprocal engine 1/z = z̄/|z|².',
    'Hunt the values of θ that make a quotient purely real or purely imaginary, by component equations.',
    'Read |z| as a distance, |z₁ − z₂| as the gap between two points, and a modulus equation as a circle.',
    'State and prove the modulus laws, the triangle inequality with its equality case, and the reverse triangle inequality.',
    'Price the classic mirror frauds: one sign flips, not both; the reciprocal bottom is squared; the modulus band has a floor.',
  ],
  prerequisites: ['aa-the-closure-failure-that-forces-i', 'al-the-quadratic-formula-and-the-discriminant', 'ans-the-field-laws-division-joins-the-family'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 3.1 ended with three seed identities planted in quiet: $z + \\bar{z} = 2\\,\\mathrm{Re}(z)$, $z - \\bar{z} = 2i\\,\\mathrm{Im}(z)$ and $z\\bar{z} = a^2 + b^2$. It also promised that the conjugate would graduate from bookkeeping to machinery. This is the lesson that pays that promise. The mirror twin $\\bar{z}$ turns out to obey a full arithmetic of its own — ten laws, each proved from the pair construction, each swept on exact integer grids before a single sentence of this prose was written — and one of those laws quietly upgrades every division from a memorised trick into an engine.' },
    { kind: 'para', text: 'The second half of the lesson names the number that every reciprocal denominator kept producing: $a^2 + b^2$, the square of a length. Written $|z|$ and called the MODULUS, it converts the Argand picture into a geometry — distances between points, circles written as equations, the triangle inequality with its equality case proved by nothing more than AL 9.3\'s discriminant discipline returning one storey higher. The route: the mirror first, then its laws, then the engine, then the hunts those laws unlock, then the length and everything it measures.' },

    { kind: 'heading', text: 'The Mirror Twin' },
    { kind: 'para', text: 'Flip the sign of the imaginary part and keep the real part untouched: that single move, applied to $z = a + bi$, produces a new complex number called the conjugate. It is the reflection of $z$ in the real axis — the mirror twin — and it costs nothing to compute.' },
    { kind: 'callout', tone: 'definition', title: 'The conjugate', text: 'The CONJUGATE of the complex number $z = a + bi$ is the number $\\bar{z} = a - bi$ — the same real part, the imaginary part with its sign flipped. On the Argand plane, $\\bar{z}$ is the reflection of $z$ in the real axis. Thus, $\\overline{3 + 4i} = 3 - 4i$ and $\\overline{2 - 3i} = 2 + 3i$; a purely real number is its own conjugate, because there is no imaginary sign to flip.' },
    { kind: 'para', text: 'For example, on a small roster:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $z = 5 - 12i$ has $\\bar{z} = 5 + 12i$;',
      '(ii) $z = -7 + 24i$ has $\\bar{z} = -7 - 24i$;',
      '(iii) $z = 3i$ has $\\bar{z} = -3i$ — the purely imaginary mirror crosses the origin;',
      '(iv) $z = 6$ has $\\bar{z} = 6$ — the real axis is its own mirror.',
    ] },
    { kind: 'figure', caption: 'The conjugate as reflection: 4+3i mirrors to 4−3i across the real axis (the teal mirror line), −2+5i to −2−5i, the purely imaginary pair 4i and −4i mirror along the axis itself, and the real number 6 is its own conjugate. Right panel: the four twins z, z̄, −z and −z̄ of any point all share one radius — |z| = |z̄| = |−z| = |−z̄|, the equal-modulus circle.', svg: conjugateMirrorSvg() },
    { kind: 'callout', tone: 'warn', title: 'One sign flips, not both', text: 'The conjugate flips the IMAGINARY sign only. Confusing it with the full negation $-z = -a - bi$ is the most-priced mirror fraud: for $z = 4 + 3i$, $\\bar{z} = 4 - 3i$ while $-z = -4 - 3i$ — three different numbers, three different points. The conjugate mirrors across the real axis; the negation rotates a half-turn about the origin. Both moves preserve $|z|$ — but they land on different seats of the circle.' },
    { kind: 'example', title: 'For z = 5 − 12i, compute z + z̄, z − z̄, zz̄ and |z|, and say which of the four can never be negative', steps: [
      'The mirror twin is $\\bar{z} = 5 + 12i$ — the imaginary sign flips, the real part stays.',
      'Sum: $(5 - 12i) + (5 + 12i) = 10$ — twice the real part, the imaginary parts cancel.',
      'Difference: $(5 - 12i) - (5 + 12i) = -24i$ — twice the imaginary part times $i$; product: $(5 - 12i)(5 + 12i) = 25 + 144 = 169$, a sum of squares.',
      'Hence, $z + \\bar{z} = 10$, $z - \\bar{z} = -24i$, $z\\bar{z} = 169$ and the length read $\\sqrt{169} = 13$ — the product is the one that is never negative, being $a^2 + b^2$.',
    ] },

    { kind: 'heading', text: 'The Laws of the Conjugate' },
    { kind: 'para', text: 'The three seeds of lesson 3.1 were the first three entries of a longer list. The full list — ten laws — is what makes the conjugate machinery rather than a notation, and every law is either a one-line consequence of the pair construction or a two-line consequence of the laws above it.' },
    { kind: 'callout', tone: 'theorem', title: 'The laws of the conjugate', text: 'For every $z = a + bi$ and every $z_1, z_2$ (with $z_2 \\neq 0$ where division appears): (i) $\\overline{(\\bar{z})} = z$ — the involution; (ii) $z + \\bar{z} = 2\\,\\mathrm{Re}(z)$; (iii) $z - \\bar{z} = 2i\\,\\mathrm{Im}(z)$; (iv) $z = \\bar{z}$ exactly when $z$ is purely real; (v) $z + \\bar{z} = 0$ exactly when $z$ is purely imaginary; (vi) $z\\bar{z} = a^2 + b^2$ — real, non-negative, zero only at $z = 0$; (vii) $\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$; (viii) $\\overline{z_1 - z_2} = \\bar{z}_1 - \\bar{z}_2$; (ix) $\\overline{z_1 z_2} = \\bar{z}_1\\,\\bar{z}_2$, and with it $\\overline{z^n} = (\\bar{z})^n$; (x) $\\overline{z_1/z_2} = \\bar{z}_1/\\bar{z}_2$. Conjugation commutes with the whole arithmetic.' },
    { kind: 'derivation', title: 'The conjugate respects the arithmetic', statement: 'The four operational laws (vii)–(x) hold for all complex numbers — the mirror of a sum, difference, product or quotient is exactly the sum, difference, product or quotient of the mirrors.', steps: [
      { label: 'Sum and difference', formula: '\\overline{z_1 \\pm z_2} = \\bar{z}_1 \\pm \\bar{z}_2', explanation: '$z_1 \\pm z_2 = (a \\pm c) + (b \\pm d)i$; conjugating flips only the imaginary sign, and that flip happens componentwise — the mirrored sum is the sum of the mirrors.' },
      { label: 'Product', formula: '\\overline{z_1 z_2} = \\bar{z}_1\\,\\bar{z}_2', explanation: 'FOIL gives $(ac - bd) + (ad + bc)i$; conjugating it gives $(ac - bd) - (ad + bc)i$. Multiplying the mirrors $(a - bi)(c - di)$ produces the same four terms with $i^2 = -1$ paying the same toll — the sign flip survives the whole collection.' },
      { label: 'Division', formula: '\\overline{z_1/z_2} = \\bar{z}_1/\\bar{z}_2', explanation: 'After conjugating the denominator, $z_1/z_2 = z_1\\bar{z}_2/(c^2 + d^2)$ with a REAL bottom; conjugating flips only the top, and by the product law the top mirrors to $\\bar{z}_1 z_2$ — which is precisely $\\bar{z}_1/\\bar{z}_2$ after the same real-bottom move.' },
      { label: 'Powers, by induction', formula: '\\overline{z^n} = (\\bar{z})^n', explanation: 'The $n = 1$ case is the definition; if the law holds for $n$, then $\\overline{z^{n+1}} = \\overline{z^n \\cdot z} = \\overline{z^n}\\cdot\\bar{z} = (\\bar{z})^n\\bar{z} = (\\bar{z})^{n+1}$ — the product law carries every step of the induction.' },
    ], result: '\\overline{z_1 \\pm z_2} = \\bar{z}_1 \\pm \\bar{z}_2, \\qquad \\overline{z_1 z_2} = \\bar{z}_1\\,\\bar{z}_2, \\qquad \\overline{z_1/z_2} = \\bar{z}_1/\\bar{z}_2, \\qquad \\overline{z^n} = (\\bar{z})^n' },
    { kind: 'formula', name: 'The conjugate laws', latex: 'z + \\bar{z} = 2\\,\\mathrm{Re}(z), \\quad z - \\bar{z} = 2i\\,\\mathrm{Im}(z), \\quad z\\bar{z} = a^2 + b^2 \\geq 0', note: 'the seeds plus the four distribution laws \\overline{z_1 \\pm z_2}, \\overline{z_1 z_2}, \\overline{z_1/z_2}, \\overline{z^n} — conjugation commutes with the whole arithmetic.' },
    { kind: 'table', caption: 'The conjugate\u2019s arithmetic, witnessed on z₁ = 3+4i and z₂ = 2−i (the quotient row rides the divisible pair (5−5i)/(3+i) — every value recomputed by the engines before this prose was written).', head: ['Operation', 'The number itself', 'Its conjugate', 'The mirror route'], rows: [
      ['sum $z_1 + z_2$', '$5 + 3i$', '$5 - 3i$', '$\\bar{z}_1 + \\bar{z}_2 = (3-4i) + (2+i)$'],
      ['difference $z_1 - z_2$', '$1 + 5i$', '$1 - 5i$', '$\\bar{z}_1 - \\bar{z}_2 = (3-4i) - (2+i)$'],
      ['product $z_1 z_2$', '$10 + 5i$', '$10 - 5i$', '$\\bar{z}_1\\,\\bar{z}_2 = (3-4i)(2+i)$'],
      ['quotient $(5-5i)/(3+i)$', '$1 - 2i$', '$1 + 2i$', '$\\bar{z}_1/\\bar{z}_2 = (5+5i)/(3-i)$'],
    ] },
    { kind: 'para', text: 'What the laws buy is economy. A whole power conjugates without re-expanding: since $(2 - 3i) = \\overline{(2 + 3i)}$, the power law gives $(2 - 3i)^4 = \\overline{(2 + 3i)^4}$ — one sign flip replaces the entire FOIL campaign. And the involution law (i) says the mirror has no memory of depth: mirroring twice returns the original, which is why the reflection reading is honest geometry and not a progressive smearing.' },
    { kind: 'example', title: 'Compute (2 − 3i)⁴ without re-expanding, given (2 + 3i)² = −5 + 12i', steps: [
      'Square the given base: $(2 + 3i)^4 = (-5 + 12i)^2 = 25 - 120i - 144 = -119 - 120i$.',
      'Now the mirror economy: $2 - 3i = \\overline{(2 + 3i)}$, so by the power law $(2 - 3i)^4 = \\overline{(2 + 3i)^4} = \\overline{(-119 - 120i)} = -119 + 120i$ — one flip, no expansion.',
      'Check by the direct route: $(2 - 3i)^2 = -5 - 12i$, and $(-5 - 12i)^2 = 25 + 120i - 144 = -119 + 120i$ — the two routes agree exactly.',
      'Hence, $(2 - 3i)^4 = -119 + 120i$, and the conjugate route saved an entire binomial expansion.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Mirror the letter, keep the work', text: 'The power law is a computational engine, not a curiosity: any identity proved for one member of a mirror pair is proved for the twin at the price of one conjugation. Bombelli\u2019s cube-root check in lesson 3.1 ran both expansions $(2+i)^3$ and $(2-i)^3$ — with the laws of this lesson, the second is the one-line mirror of the first. Examiners price exactly this shortcut in "write down, without expanding" items.' },

    { kind: 'heading', text: 'Division, Fully Conjugated: the Reciprocal Engine' },
    { kind: 'para', text: 'Lesson 3.1 conjugated every denominator as an ad hoc trick. The trick deserves its own derivation, because it is the engine that runs every division in the subject — and its by-product, a real positive denominator, is the seed of the modulus.' },
    { kind: 'derivation', title: 'The reciprocal engine', statement: 'Every non-zero complex number $z = a + bi$ has a multiplicative inverse, and the inverse is computed by a single conjugation: $1/z = \\bar{z}/(a^2 + b^2)$.', steps: [
      { label: 'Conjugate the bottom', formula: '\\frac{1}{z} = \\frac{\\bar{z}}{z\\bar{z}}', explanation: 'Multiply numerator and denominator by the mirror $\\bar{z}$ — legal because $z \\neq 0$ forces $\\bar{z} \\neq 0$; this is exactly the move lesson 3.1 made for every division.' },
      { label: 'The seed pays', formula: 'z\\bar{z} = a^2 + b^2 > 0', explanation: 'Law (vi) collapses the denominator into the real number $a^2 + b^2$ — strictly positive, since $z \\neq 0$ means the pair $(a, b)$ is not $(0, 0)$, so at least one square is positive. The bottom is now real, and a real positive bottom is division as the tower always knew it.' },
      { label: 'Read off the inverse', formula: '\\frac{1}{z} = \\frac{a - bi}{a^2 + b^2}', explanation: 'The components are honest real fractions: $1/z = \\frac{a}{a^2+b^2} - \\frac{b}{a^2+b^2}\\,i$. The check is one multiplication: $z \\cdot \\bar{z}/(a^2+b^2) = (a^2+b^2)/(a^2+b^2) = 1$.' },
    ], result: '\\frac{1}{z} = \\frac{\\bar{z}}{a^2 + b^2} \\quad (= \\bar{z}/|z|^2 \\text{ once the modulus is named})' },
    { kind: 'example', title: 'Find the multiplicative inverse of 3 − 4i and check it by multiplication', steps: [
      'The engine: $\\overline{(3 - 4i)} = 3 + 4i$ and the bottom is $3^2 + (-4)^2 = 25$.',
      'So $\\frac{1}{3 - 4i} = \\frac{3 + 4i}{25} = \\frac{3}{25} + \\frac{4}{25}i$ — two real fractions, no letter in any denominator.',
      'Check: $(3 - 4i)\\cdot\\frac{3+4i}{25} = \\frac{25}{25} = 1$ — the seed $z\\bar{z}$ pays the bottom in one line.',
      'Hence, the inverse is $\\frac{3}{25} + \\frac{4}{25}i$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The bottom is the SQUARE of the length', text: 'The engine\u2019s denominator is $a^2 + b^2$ — the square of the modulus, not the modulus. For $-3 + 4i$ the bottom is $25$, and writing $\\frac{-3-4i}{5}$ is the classic unsquared slip: it does not multiply back to $1$. Track it in one sentence: the bottom of a reciprocal is whatever $z\\bar{z}$ equals, and $z\\bar{z} = a^2 + b^2$ is a SQUARE. The quiz at this lesson\u2019s end prices exactly this fraud.' },
    { kind: 'formula', name: 'The reciprocal engine', latex: '\\frac{1}{z} = \\frac{\\bar{z}}{a^2 + b^2} = \\frac{\\bar{z}}{|z|^2}', note: 'conjugate the bottom once: it turns into the real, positive square of the length; every division z1/z2 is z1 times the engine on z2.' },
    { kind: 'example', title: 'Express (5 − 5i)/(3 + i) in the form a + bi and verify by multiplication', steps: [
      'Conjugate the bottom: multiply by $\\frac{3 - i}{3 - i}$; the denominator turns into $3^2 + 1^2 = 10$.',
      'Numerator: $(5 - 5i)(3 - i) = 15 - 5i - 15i + 5i^2 = 10 - 20i$.',
      'So the quotient is $\\frac{10 - 20i}{10} = 1 - 2i$.',
      'Verify: $(3 + i)(1 - 2i) = 3 - 6i + i - 2i^2 = 5 - 5i$ — the dividend returns, and the division is honest.',
      'Hence, $\\dfrac{5 - 5i}{3 + i} = 1 - 2i$.',
    ] },

    { kind: 'heading', text: 'Purely Real, Purely Imaginary: Hunts on Quotients' },
    { kind: 'para', text: 'Laws (iv) and (v) — $z = \\bar{z}$ marks the purely real numbers, $z + \\bar{z} = 0$ marks the purely imaginary ones — combine with the engine into a hunting method for quotients. When a quotient carries a parameter, the question "for which parameter values is it purely real, or purely imaginary?" is answered by conjugate-multiplying once, reading off the two component formulas, and setting the relevant component to zero. The reference module calls these the $\\sin\\theta$ families; the discipline is entirely ours to run.' },
    { kind: 'example', title: 'Find every θ for which (1 + 2i sinθ)/(2 − i sinθ) is purely real, and every θ for which it is purely imaginary', steps: [
      'Write $s = \\sin\\theta$ and conjugate the bottom once: multiply by $\\frac{2 + is}{2 + is}$; the denominator becomes $4 + s^2$, real and positive.',
      'Numerator: $(1 + 2is)(2 + is) = 2 + is + 4is + 2i^2s^2 = (2 - 2s^2) + 5is$.',
      'So the quotient is $\\dfrac{(2 - 2s^2) + 5is}{4 + s^2}$: the real part is $\\dfrac{2 - 2s^2}{4 + s^2}$ and the imaginary part is $\\dfrac{5s}{4 + s^2}$.',
      'Purely real needs the imaginary part to vanish: $5s = 0$, so $s = 0$ — that is $\\theta = n\\pi$, $n \\in \\mathbb{Z}$.',
      'Purely imaginary needs the real part to vanish: $2 - 2s^2 = 0$, so $s = \\pm 1$ — the top of the sine wave, $\\theta = (2k + 1)\\dfrac{\\pi}{2}$.',
      'Hence, purely real exactly at $\\theta = n\\pi$ and purely imaginary exactly at $\\theta = (2k+1)\\pi/2$; between those seats the quotient is mixed.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The hunt\u2019s discipline', text: 'Three moves, always: conjugate-multiply FIRST (the components become readable real fractions), split into the two component equations (purely real means Im = 0; purely imaginary means Re = 0 — and note the second is NOT "Re = anything with an i attached", it is the honest real equation), then solve each over the reals. A quotient\u2019s type is decided by which component vanishes, never by staring at the letter.' },

    { kind: 'heading', text: 'The Modulus: the Distance Reading' },
    { kind: 'para', text: 'Every reciprocal\u2019s bottom, every no-zero-divisors certificate, every seed of law (vi) — they were all the same number: $a^2 + b^2$. It is time to take its square root seriously.' },
    { kind: 'callout', tone: 'definition', title: 'The modulus', text: 'The MODULUS of $z = a + bi$ is the real number $|z| = \\sqrt{a^2 + b^2}$ — the non-negative square root, so $|z| \\geq 0$ always, and $|z| = 0$ exactly at $z = 0$. It is the distance of the Argand point $(a, b)$ from the origin, and $|z|^2 = z\\bar{z}$. Thus, $|5 - 12i| = 13$, $|-7 + 24i| = 25$, $|6i| = 6$ and $|-6| = 6$ — the imaginary seat and the real seat read their lengths identically.' },
    { kind: 'formula', name: 'The modulus', latex: '|z| = \\sqrt{\\{\\mathrm{Re}(z)\\}^2 + \\{\\mathrm{Im}(z)\\}^2}\\ \\geq\\ 0', note: 'the radius of the Argand seat (a, b): zero only at z = 0, equal for the four twins z, z-bar, -z and -z-bar; |z1 - z2| is the distance between two seats, and |z - z0| = r is the circle of centre z0.' },
    { kind: 'para', text: 'The pair $(a, b)$ is a point; $\\sqrt{a^2 + b^2}$ is Pythagoras on its legs; so the modulus is a RADIUS. Three notes hang on that reading. First, the four twins of the figure share it: $|z| = |\\bar{z}| = |-z| = |-\\bar{z}|$, because $(-a)^2 = a^2$ and $(-b)^2 = b^2$ — the mirror and the antipode never leave the circle they were born on. Second, $z_1 > z_2$ is meaningless (there is no order on $\\mathbb{C}$, as lesson 3.1\'s pair construction made precise), but $|z_1| > |z_2|$ is perfectly meaningful: distances from the origin CAN be ranked. Third, the set of all $z$ with $|z| = r$ is exactly the circle of radius $r$ centred at the origin — infinitely many complex numbers share one modulus, and the lattice seats of that circle are countable.' },
    { kind: 'example', title: 'Count the lattice points z with |z| = 5', steps: [
      'A lattice point $z = a + bi$ has $|z| = 5$ exactly when $a^2 + b^2 = 25$ — squares of integers summing to 25.',
      'The representations: $25 = 0^2 + 5^2$ and $25 = 3^2 + 4^2$ (the 3-4-5 triple) — these and their orderings are all.',
      'The axis seats $(\\pm 5, 0)$ and $(0, \\pm 5)$: four points; the 3-4-5 family $(\\pm 3, \\pm 4)$ and $(\\pm 4, \\pm 3)$: eight points.',
      'Hence, exactly 12 lattice points carry modulus 5 — the census of the circle $|z| = 5$, and the engines verified it by enumeration.',
    ] },
    { kind: 'para', text: 'One subtraction upgrades the radius into a distance between ANY two points: for $z_1 = a + bi$ and $z_2 = c + di$, the number $|z_1 - z_2| = \\sqrt{(a - c)^2 + (b - d)^2}$ is precisely the Euclidean distance between the Argand seats $(a, b)$ and $(c, d)$ — Pythagoras on the horizontal gap $a - c$ and the vertical gap $b - d$. Every modulus equation is now a geometry statement: $|z - z_0| = r$ reads "the distance from the fixed point $z_0$ equals $r$", which is the circle of centre $z_0$ and radius $r$ — nothing else satisfies it.' },
    { kind: 'figure', caption: 'The modulus as distance. Left: the triangle inequality as a detour tax — from O the green route to 2+i costs √5, the amber translated leg to the sum 1+3i costs another √5, while the direct orange route costs only |(2+i)+(−1+2i)| = √10 ≈ 3.16 against the detour\u2019s ≈ 4.47. Right: the circle locus |z − (3+4i)| = 5 — centre 3+4i, radius 5, passing through the origin, with six of its 12 lattice seats marked.', svg: modulusDistanceSvg() },
    { kind: 'example', title: 'Describe the locus |z − (3 + 4i)| = 5: its centre, its radius, whether it passes through the origin, and its lattice seats', steps: [
      'The equation reads: the distance from the fixed point $3 + 4i$ equals $5$ — so the locus is the circle with centre $(3, 4)$ and radius $5$.',
      'Test the origin: $|0 - (3 + 4i)| = |-3 - 4i| = \\sqrt{9 + 16} = 5$ — yes, the origin lies ON this circle.',
      'Lattice seats: $(x - 3)^2 + (y - 4)^2 = 25$ needs the 3-4-5 offsets from $(3, 4)$: $(\\pm 3, \\pm 4)$, $(\\pm 4, \\pm 3)$, $(0, \\pm 5)$, $(\\pm 5, 0)$.',
      'Hence, centre $3 + 4i$, radius $5$, through the origin — and the same census of 12 lattice seats as before, now translated by $3 + 4i$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The mirror keeps every real-axis distance', text: 'For REAL $a$, the numbers $z - a$ and $\\bar{z} - a$ are conjugates (subtracting a real shifts only the real component), so $|z - a| = |\\bar{z} - a|$ — every point of the real axis is equidistant from a mirror pair. This one line is why conjugate-pair geometry (next lesson\u2019s doors) will be symmetric about the real axis, and why any triangle with a conjugate pair of vertices and its apex on the real axis is isosceles.' },
    { kind: 'example', title: 'Prove that for real a, |z − a| = |z̄ − a|; witness it at z = 3 + 4i, a = 5', steps: [
      'Write $z = x + yi$; then $z - a = (x - a) + yi$ while $\\bar{z} - a = (x - a) - yi$ — conjugates, because $x - a$ is real.',
      'Conjugates share the modulus (the twins law, straight from the definition: $\\sqrt{p^2 + q^2} = \\sqrt{p^2 + (-q)^2}$), so $|z - a| = |\\bar{z} - a|$.',
      'Witness: $|3 + 4i - 5| = |-2 + 4i| = \\sqrt{4 + 16} = \\sqrt{20}$, and $|3 - 4i - 5| = |-2 - 4i| = \\sqrt{4 + 16} = \\sqrt{20}$ — equal.',
      'Hence, every real-axis point is equidistant from $z$ and $\\bar{z}$ — the mirror\u2019s geometric signature.',
    ] },

    { kind: 'heading', text: 'The Modulus Laws' },
    { kind: 'para', text: 'The modulus is not just a length — it is a multiplicative length. Lesson 3.1 banked the certificate as its no-zero-divisors proof; this lesson states it as a law and cashes the family it heads.' },
    { kind: 'callout', tone: 'theorem', title: 'The modulus laws', text: 'For all complex numbers (with $z_2 \\neq 0$ for the quotient): $|z_1 z_2| = |z_1|\\,|z_2|$; $|z_1/z_2| = |z_1|/|z_2|$; $|z^n| = |z|^n$ for every natural $n$; and $|\\bar{z}| = |z| = |-z| = |-\\bar{z}|$. Lengths multiply, lengths divide, lengths power — and the mirror never changes one.' },
    { kind: 'derivation', title: 'Why the modulus multiplies', statement: 'For all $z_1, z_2$: $|z_1 z_2| = |z_1|\\,|z_2|$ — the certificate lesson 3.1 used for no-zero-divisors, now stated as the head of the family.', steps: [
      { label: 'Square the product', formula: '|z_1 z_2|^2 = (z_1 z_2)\\overline{(z_1 z_2)}', explanation: 'Use $|w|^2 = w\\bar{w}$ (law (vi) restated): the square of the modulus of the product is the product times ITS conjugate.' },
      { label: 'Distribute the conjugate', formula: '(z_1 z_2)(\\bar{z}_1\\bar{z}_2) = (z_1\\bar{z}_1)(z_2\\bar{z}_2)', explanation: 'The product law (ix) lets the conjugate split across the product; commutativity and associativity (proved on the rung in lesson 3.1) regroup the factors.' },
      { label: 'Collapse each factor', formula: '|z_1 z_2|^2 = |z_1|^2\\,|z_2|^2', explanation: 'Each regrouped factor is a modulus squared: $z_1\\bar{z}_1 = |z_1|^2$ and $z_2\\bar{z}_2 = |z_2|^2$ — both sides of the identity are non-negative reals.' },
      { label: 'Take the honest root', formula: '|z_1 z_2| = |z_1|\\,|z_2|', explanation: 'Both sides of $|z_1 z_2|^2 = (|z_1||z_2|)^2$ are non-negative, and the square root is injective there — the order survives. Powers follow by induction; the quotient law follows by multiplying back: $|z_1| = |(z_1/z_2)\\cdot z_2| = |z_1/z_2|\\,|z_2|$.' },
    ], result: '|z_1 z_2| = |z_1|\\,|z_2|, \\qquad |z_1/z_2| = \\frac{|z_1|}{|z_2|}, \\qquad |z^n| = |z|^n, \\qquad |\\bar z| = |z|' },
    { kind: 'formula', name: 'The modulus laws', latex: '|z_1 z_2| = |z_1|\\,|z_2|, \\quad \\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}, \\quad |z^n| = |z|^n, \\quad |\\bar{z}| = |z|', note: 'lengths multiply, divide and power — the certificate zz-bar = a squared plus b squared behind every one; the quotient law is the engine behind mod-of-quotient exam items.' },
    { kind: 'table', caption: 'The modulus laws, witnessed — every value recomputed by the engines before this prose was written (the quotient row rides the divisible pair of the division Illustration).', head: ['Law', 'Witness', 'Value'], rows: [
      ['multiplicativity $|z_1z_2| = |z_1||z_2|$', '$|(3+4i)(5-12i)| = |63-16i|$', '$65 = 5 \\cdot 13$'],
      ['powers $|z^2| = |z|^2$', '$|(3+4i)^2| = |-7+24i|$', '$25 = 5^2$'],
      ['powers, again', '$|(-5+12i)^2| = |-119-120i|$', '$169 = 13^2$'],
      ['quotients $|z_1/z_2| = |z_1|/|z_2|$', '$|(5-5i)/(3+i)| = |1-2i|$', '$\\sqrt{5} = 5\\sqrt{2}/\\sqrt{10}$'],
      ['the twins $|\\bar{z}| = |z| = |-z|$', '$\\bar z,\\ z,\\ -z$ at $z = 5-12i$', '$13 = 13 = 13$'],
    ] },
    { kind: 'figure', caption: 'The modulus-multiplication witness: (3+4i)(5−12i) = 63−16i, whose three radii read 5, 13 and 65 — and 5 · 13 = 65. Multiplication scales lengths: |zw| = |z| · |w| is radius geometry, the law lesson 3.4 will watch become rotation-and-scaling. The 3-4-5 and 5-12-13 right triangles multiply into the 63-16-65 triple (25 · 169 = 4225 = 65²).', svg: modulusMultiplicationSvg() },
    { kind: 'example', title: 'Predict |(3 + 4i)⁴| without expanding, then verify', steps: [
      'The power law first: $|(3 + 4i)^4| = |3 + 4i|^4 = 5^4 = 625$ — predicted with no algebra at all.',
      'Verify by the honest route: $(3 + 4i)^2 = -7 + 24i$, so $(3 + 4i)^4 = (-7 + 24i)^2 = 49 - 336i - 576 = -527 - 336i$.',
      'The modulus of that: $\\sqrt{527^2 + 336^2} = \\sqrt{277729 + 112896} = \\sqrt{390625} = 625$.',
      'Hence, the law\u2019s prediction and the expansion agree exactly — 625 — and the law saved the entire computation.',
    ] },

    { kind: 'heading', text: 'The Triangle Inequality' },
    { kind: 'para', text: 'The distance reading has a master law. On the plane it is nearly obvious: to reach the point $z_1 + z_2$ from the origin, you may walk straight, or you may detour through $z_1$ and then walk the translated second leg — and a detour cannot shorten a route. The algebra proves it with a squaring move and one lemma whose proof is AL 9.3\'s discriminant discipline returning, one storey up the tower.' },
    { kind: 'callout', tone: 'theorem', title: 'The triangle inequality, with its equality case', text: 'For all complex $z_1, z_2$: $|z_1 + z_2| \\leq |z_1| + |z_2|$. Equality holds EXACTLY when the two point the same way — $z_2 = \\lambda z_1$ for a real $\\lambda \\geq 0$ (including the honest cases $z_1 = 0$ or $z_2 = 0$). Any turn between the two directions pays a strict tax.' },
    { kind: 'derivation', title: 'The triangle inequality, proved from the components', statement: 'For all $z_1 = a + bi$ and $z_2 = c + di$: $|z_1 + z_2| \\leq |z_1| + |z_2|$, with equality exactly for same-direction pairs.', steps: [
      { label: 'The sharp form', formula: '|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2 + 2(ac + bd)', explanation: 'Expand the components: $(a + c)^2 + (b + d)^2 = (a^2 + b^2) + (c^2 + d^2) + 2(ac + bd)$ — an IDENTITY, exact for every pair; and the cross term $ac + bd$ is exactly $\\mathrm{Re}(z_1\\bar{z}_2)$.' },
      { label: 'Cauchy–Schwarz, two variables', formula: '(ac + bd)^2 \\leq (a^2+b^2)(c^2+d^2)', explanation: 'The quadratic $(a^2+b^2)t^2 - 2(ac+bd)t + (c^2+d^2)$ equals $|t\\,z_1 - z_2|^2$ — a sum of two squares, never negative for any real $t$. A quadratic that never dips below zero has a non-positive discriminant: $4(ac+bd)^2 - 4(a^2+b^2)(c^2+d^2) \\leq 0$. AL 9.3\'s third verdict, returning inside the new rung.' },
      { label: 'Bound the cross term', formula: 'ac + bd \\leq |z_1|\\,|z_2|', explanation: 'From the squared bound: $ac + bd \\leq |ac + bd| \\leq \\sqrt{(a^2+b^2)(c^2+d^2)} = |z_1||z_2|$ — the geometric-mean read on the two radii.' },
      { label: 'Close the chain', formula: '|z_1 + z_2|^2 \\leq (|z_1| + |z_2|)^2', explanation: 'Substitute the bound into the sharp form: the right side becomes $|z_1|^2 + |z_2|^2 + 2|z_1||z_2| = (|z_1| + |z_2|)^2$. Both sides are non-negative, and the square root preserves order there — $|z_1 + z_2| \\leq |z_1| + |z_2|$.' },
      { label: 'The equality case', formula: 'z_2 = \\lambda z_1,\\ \\lambda \\geq 0\\ \\text{real}', explanation: 'Equality needs $ac + bd = |z_1||z_2|$ AND Cauchy–Schwarz tight — which happens exactly when $(c, d) = \\lambda(a, b)$ with $\\lambda \\geq 0$: the same direction. Then $z_1 + z_2 = (1 + \\lambda)z_1$ points the same way and its modulus is the honest sum; every turn — a quarter-turn costs the tax below — is strict.' },
    ], result: '|z_1 + z_2| \\leq |z_1| + |z_2|, \\qquad \\text{equality} \\iff z_2 = \\lambda z_1\\ (\\lambda \\geq 0\\ \\text{real})' },
    { kind: 'example', title: 'Price the tax twice: |(3 + 4i) + (5 − 12i)| against |3 + 4i| + |5 − 12i|, then exhibit an equality case', steps: [
      'The right side: $|3 + 4i| + |5 - 12i| = 5 + 13 = 18$.',
      'The left side: $(3 + 4i) + (5 - 12i) = 8 - 8i$, so $|8 - 8i| = \\sqrt{64 + 64} = 8\\sqrt{2} \\approx 11.31$.',
      'The tax: $8\\sqrt{2} < 18$, strict — the two directions differ ($26.6^\\circ$ against $-67.4^\\circ$), and the detour route is genuinely longer.',
      'The equality case: $(1 + i) + (2 + 2i) = 3 + 3i$ with $2 + 2i = 2(1 + i)$ — same direction; both sides read $3\\sqrt{2} = \\sqrt{2} + 2\\sqrt{2}$, exactly equal.',
      'Hence, the inequality is strict on the first pair and tight on the second — the equality case is precisely "same direction", as proved.',
    ] },
    { kind: 'derivation', title: 'The reverse triangle inequality', statement: 'For all complex $z_1, z_2$: $\\big||z_1| - |z_2|\\big| \\leq |z_1 - z_2|$ — two moduli differ by at most the distance between their points.', steps: [
      { label: 'Feed a difference to the forward law', formula: 'z_1 = (z_1 - z_2) + z_2', explanation: 'The forward triangle inequality applies to ANY two numbers — feed it the pair $(z_1 - z_2,\\ z_2)$: $|z_1| \\leq |z_1 - z_2| + |z_2|$.' },
      { label: 'Rearrange', formula: '|z_1| - |z_2| \\leq |z_1 - z_2|', explanation: 'Subtract $|z_2|$ from both sides — one modulated length minus the other never exceeds the distance between the seats.' },
      { label: 'Swap the roles', formula: '|z_2| - |z_1| \\leq |z_1 - z_2|', explanation: 'The same argument with the pair $(z_2 - z_1,\\ z_1)$ gives the mirrored inequality; the two lines together bound the ABSOLUTE difference of the moduli.' },
    ], result: '\\big||z_1| - |z_2|\\big| \\leq |z_1 - z_2|' },
    { kind: 'para', text: 'The reverse law is the BAND ENGINE: it says that when $|z_1| = 5$ and $|z_2| = 3$, the sum $z_1 + z_2$ can never leave the band $2 \\leq |z_1 + z_2| \\leq 8$ — the floor $|5 - 3| = 2$ from the reverse law, the ceiling $5 + 3 = 8$ from the forward one, and both ends are genuinely reachable (opposite directions attain 2, same directions attain 8). The witness in the engines: $z_1 = 1 + i$ against $z_2 = 2 - 2i$ pays the reverse floor honestly — $\\big|\\sqrt{2} - 2\\sqrt{2}\\big| = \\sqrt{2}$ against the actual gap $|{-1} + 3i| = \\sqrt{10}$.' },
    { kind: 'formula', name: 'The triangle inequalities', latex: '|z_1 + z_2| \\leq |z_1| + |z_2| \\quad\\text{(equality: same direction)}, \\quad \\big||z_1| - |z_2|\\big| \\leq |z_1 - z_2|', note: 'the direct route never loses to the detour; the moduli differ by at most the gap — together they pin |z1+z2| to the band [||z1|-|z2||, |z1|+|z2|], both ends reachable.' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main\u2019s algebra unit names complex numbers with modulus explicitly, and the single-correct staples are exactly this lesson\u2019s machinery: the reciprocal and division quotients, the modulus of a product or quotient, the least/greatest value of $|z_1 + z_2|$ on fixed moduli (the band engine), and the modulus-equation loci (circle through a given point). NCERT class 11 ch. 4 carries the conjugate, division by conjugating and the modulus at school depth; the triangle inequality with its proof is the undergraduate\u2019s first meet with the inequality that dominates later analysis. The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'Wessel 1797: the surveyor who drew the plane', text: 'The picture this lesson leaned on — a complex number as a point, a modulus as a radius — has a named first publication, and the name is not Argand. Caspar Wessel, a Danish land surveyor, presented a memoir to the Royal Danish Academy in 1797 (published 1799) giving the plane representation and the addition/multiplication geometry, nine years before Jean-Robert Argand\u2019s 1806 booklet popularised it; John Wallis had sketched the idea as early as 1685. The "Argand plane" name stuck with the later, better-circulated writer — but the first drawing of $|z|$ as a surveyor\u2019s distance belongs to the man who measured coastlines for a living. History\u2019s verdict: the geometry was inevitable; the credit was negotiable.' },
    { kind: 'para', text: 'The rung now carries its measuring instruments. What waits above, in order: lesson 3.3 returns to AL 9.3\'s trichotomy and keeps its promise — the $D < 0$ doors computed honestly as $\\pm i\\sqrt{|D|}$, the conjugate-pair law for real coefficients PROVED from this lesson\'s distribution laws, the sum and product of the doors read off $-b$ and $c$; lesson 3.4 reads the Argand plane in polar coordinates — this lesson\u2019s modulus is the radius of that form, its partner the argument supplies the angle; and lesson 3.5 mounts the unit circle\u2019s equal spokes, where the loci of this lesson (circles first, then arcs) become full curve-census machinery. Every door from here runs on $\\bar{z}$ and $|z|$ — the mirror and the metre.' },

    { kind: 'terms', items: [
      { term: 'Conjugate of a complex number', def: 'the mirror twin $\\bar{z} = a - bi$ of $z = a + bi$: the reflection of $z$ in the real axis, flipping only the imaginary sign; reals are their own conjugates.' },
      { term: 'Modulus of a complex number', def: 'the length $|z| = \\sqrt{a^2 + b^2}$: the distance of the point $(a, b)$ from the origin; real, non-negative, zero only at $z = 0$, with $|z|^2 = z\\bar{z}$.' },
      { term: 'Reciprocal engine', def: 'the division machine $1/z = \\bar{z}/(a^2 + b^2) = \\bar{z}/|z|^2$: conjugate the bottom once and it turns real and positive — the bottom is a SQUARE.' },
      { term: 'Triangle inequality', def: '$|z_1 + z_2| \\leq |z_1| + |z_2|$: the direct route is never longer than the detour; equality exactly when the two point the same way ($z_2 = \\lambda z_1$, $\\lambda \\geq 0$ real).' },
      { term: 'Reverse triangle inequality', def: '$\\big||z_1| - |z_2|\\big| \\leq |z_1 - z_2|$: two moduli differ by at most the distance between the points — the band engine\u2019s floor.' },
      { term: 'Circle locus', def: 'the solution set of $|z - z_0| = r$: the circle of centre $z_0$ and radius $r$ — a modulus equation read as a geometry statement.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: the conjugate and the modulus', items: [
      { q: 'For $z = 6 - 8i$, the modulus $|z|$ is:', options: ['$\\sqrt{28}$', '$10$', '$14$', '$100$'], answer: 1, explain: 'Squares first, root last: $|z| = \\sqrt{36 + 64} = \\sqrt{100} = 10$ (option B). Option A subtracts under the root ($\\sqrt{64 - 36}$) — the sign fraud; option C adds the parts ($6 + 8$) — a modulus is not a sum of parts; option D reports $z\\bar{z} = 100$, the SQUARE of the modulus, as the modulus itself.' },
      { q: 'If $z + \\bar{z} = 12$ and $z\\bar{z} = 40$, then $z$ is:', options: ['$6 + 2i$ or $6 - 2i$', '$6 + 4i$ or $6 - 4i$', 'no such $z$ exists — the conditions contradict', '$6 + \\sqrt{34}\\,i$ or $6 - \\sqrt{34}\\,i$'], answer: 0, explain: 'The seeds read the components: $2a = 12$ gives $a = 6$; then $b^2 = 40 - 36 = 4$ gives $b = \\pm 2$ — so $z = 6 \\pm 2i$ (option A). Option B reads $b^2 = 4$ and reports $b = 4$; option C is the over-determined panic — the conditions are consistent precisely because $40 - 36$ is a perfect square; option D subtracts $a$ instead of $a^2$ under the root ($\\sqrt{40 - 6}$).' },
      { q: 'With $|z_1| = 5$ and $|z_2| = 3$, the LEAST possible value of $|z_1 + z_2|$ is:', options: ['$0$', '$8$', '$\\sqrt{34}$', '$2$'], answer: 3, explain: 'The reverse triangle inequality floors the sum: $|z_1 + z_2| \\geq \\big|5 - 3\\big| = 2$, attained when the two point OPPOSITE ways ($z_2 = -\\frac{3}{5}z_1$) — option D. Option A prices "any two can cancel" — only equal moduli can; option B is the GREATEST value (same direction); option C prices the perpendicular read, Pythagoras on $5^2 + 3^2$.' },
      { q: '$\\dfrac{1}{-3 + 4i}$ equals:', options: ['$\\dfrac{-3 + 4i}{25}$', '$\\dfrac{-3 - 4i}{5}$', '$\\dfrac{-3 - 4i}{25}$', '$\\dfrac{3 - 4i}{25}$'], answer: 2, explain: 'The reciprocal engine: $1/z = \\bar{z}/|z|^2 = \\dfrac{-3 - 4i}{25}$ (option C). Option A conjugates nothing — the raw reflection; option B divides by $|z| = 5$ instead of $|z|^2 = 25$, the unsquared-bottom slip the Caution priced; option D flips the REAL sign — the conjugate flips the imaginary sign only.' },
      { q: 'For $z = 3 + 4i$, the modulus $\\left|\\dfrac{\\bar{z}}{z}\\right|$ is:', options: ['$1$', '$5$', '$25$', '$\\dfrac{1}{25}$'], answer: 0, explain: 'The quotient law first: $\\left|\\bar{z}/z\\right| = |\\bar{z}|/|z| = 5/5 = 1$ (option A) — concretely $\\bar{z}/z = (3-4i)^2/25 = (-7 - 24i)/25$ and $\\sqrt{49 + 576}/25 = 25/25 = 1$. Option B prices the numerator alone; option C prices $|z\\bar{z}| = 25$, the product; option D inverts the ratio.' },
    ] },

    { kind: 'exercises', title: 'Exercises 3.2', sets: [
      { level: 'L1', questions: [
        { q: 'For $z = 5 - 12i$ and $w = -7 + 24i$, write $\\bar{z}$ and $\\bar{w}$, and compute $|z|$ and $|w|$.', solution: [
          'Flip the imaginary sign only: $\\bar{z} = 5 + 12i$ and $\\bar{w} = -7 - 24i$ — the real parts stay seated.',
          'The lengths are Pythagoras triples: $|z| = \\sqrt{25 + 144} = \\sqrt{169} = 13$ and $|w| = \\sqrt{49 + 576} = \\sqrt{625} = 25$.',
          'Each product $z\\bar{z} = 169$ and $w\\bar{w} = 625$ is real and positive — the sum-of-squares discipline behind both lengths.',
        ], answer: '$\\bar{z} = 5 + 12i$, $\\bar{w} = -7 - 24i$; $|z| = 13$, $|w| = 25$' },
        { q: 'A complex number satisfies $z + \\bar{z} = -8$ and $z - \\bar{z} = 6i$. Recover $z$.', solution: [
          'The seeds convert each condition: $z + \\bar{z} = 2a$, so $2a = -8$ and $a = -4$; $z - \\bar{z} = 2bi$, so $2b = 6$ and $b = 3$.',
          'Assemble: $z = -4 + 3i$, and its mirror is $\\bar{z} = -4 - 3i$.',
          'Check both: the sum is $-8$ and the difference is $6i$ — the seeds read the pair back exactly.',
        ], answer: '$z = -4 + 3i$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Express $\\dfrac{1}{4 + 3i}$ in the form $a + bi$.', solution: [
          'The engine: conjugate the bottom, $\\overline{4 + 3i} = 4 - 3i$; the square bottom is $4^2 + 3^2 = 25$.',
          'So $\\dfrac{1}{4 + 3i} = \\dfrac{4 - 3i}{25} = \\dfrac{4}{25} - \\dfrac{3}{25}i$ — two honest real fractions.',
          'Check by multiplication: $(4 + 3i)(4 - 3i) = 16 + 9 = 25$, and $25/25 = 1$ — the inverse returns the identity.',
        ], answer: '$\\dfrac{1}{4+3i} = \\dfrac{4}{25} - \\dfrac{3}{25}i$' },
        { q: 'If $(x + iy)(3 + i)$ is the conjugate of $7 + i$, find the real $x$ and $y$.', solution: [
          'The target: $\\overline{7 + i} = 7 - i$; expand the product: $(x + iy)(3 + i) = (3x - y) + (x + 3y)i$.',
          'Equality of complex numbers splits into components: $3x - y = 7$ and $x + 3y = -1$.',
          'Solve: $y = 3x - 7$, so $x + 9x - 21 = -1$ gives $10x = 20$, hence $x = 2$ and $y = -1$.',
          'Check: $(2 - i)(3 + i) = 6 + 2i - 3i - i^2 = 7 - i$ — the conjugate of $7 + i$, as demanded.',
        ], answer: '$x = 2,\\ y = -1$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Express $\\dfrac{5 - i}{1 + i}$ in standard form and verify by multiplication.', solution: [
          'Conjugate the bottom: multiply by $\\dfrac{1 - i}{1 - i}$; the bottom turns into $1^2 + 1^2 = 2$.',
          'Numerator: $(5 - i)(1 - i) = 5 - 5i - i + i^2 = 4 - 6i$.',
          'So the quotient is $\\dfrac{4 - 6i}{2} = 2 - 3i$.',
          'Verify: $(1 + i)(2 - 3i) = 2 - 3i + 2i - 3i^2 = 5 - i$ — the dividend returns.',
        ], answer: '$2 - 3i$' },
        { q: 'Find every $\\theta$ for which $\\dfrac{1 + 2i\\sin\\theta}{3 - 2i\\sin\\theta}$ is purely real, and every $\\theta$ for which it is purely imaginary.', solution: [
          'Write $s = \\sin\\theta$ and conjugate the bottom: multiply by $\\dfrac{3 + 2is}{3 + 2is}$; the bottom becomes $9 + 4s^2$, real and positive.',
          'Numerator: $(1 + 2is)(3 + 2is) = 3 + 2is + 6is + 4i^2s^2 = (3 - 4s^2) + 8is$.',
          'So the real part is $\\dfrac{3 - 4s^2}{9 + 4s^2}$ and the imaginary part is $\\dfrac{8s}{9 + 4s^2}$.',
          'Purely real: $8s = 0$, so $\\sin\\theta = 0$ — that is $\\theta = n\\pi$, $n \\in \\mathbb{Z}$.',
          'Purely imaginary: $3 - 4s^2 = 0$, so $s = \\pm\\dfrac{\\sqrt{3}}{2} = \\pm\\sin\\dfrac{\\pi}{3}$ — that is $\\theta = n\\pi \\pm \\dfrac{\\pi}{3}$.',
        ], answer: 'purely real $\\iff \\theta = n\\pi$; purely imaginary $\\iff \\theta = n\\pi \\pm \\pi/3$ ($n \\in \\mathbb{Z}$)' },
        { q: 'Show that the triangle with vertices $3 + 4i$, $3 - 4i$ and $-5$ is isosceles, and find its area.', solution: [
          'The first two vertices are a conjugate pair; the third, $-5$, sits on the real axis — so by the equidistant law it is the same distance from both.',
          'Sides: $|3 + 4i - (3 - 4i)| = |8i| = 8$ for the mirror side; $|3 + 4i - (-5)| = |8 + 4i| = 4\\sqrt{5}$ and $|3 - 4i - (-5)| = |8 - 4i| = 4\\sqrt{5}$ for the two apex sides — equal.',
          'Two equal sides, so isosceles — and not equilateral, since $8 \\neq 4\\sqrt{5}$.',
          'The area: the base runs vertically at $x = 3$ from $y = -4$ to $y = 4$ (length 8); the apex $(-5, 0)$ stands a horizontal distance $|3 - (-5)| = 8$ from that line; area $= \\frac{1}{2} \\cdot 8 \\cdot 8 = 32$.',
        ], answer: 'sides $8,\\ 4\\sqrt{5},\\ 4\\sqrt{5}$ — isosceles; area $32$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Identify the locus $|z - \\bar{z}| + |z + \\bar{z}| = 12$ and give its area.', solution: [
          'Convert the seeds to lengths: $z - \\bar{z} = 2iy$ so $|z - \\bar{z}| = 2|y|$; $z + \\bar{z} = 2x$ so $|z + \\bar{z}| = 2|x|$.',
          'The equation becomes $2|y| + 2|x| = 12$, that is $|x| + |y| = 6$ — the diamond.',
          'The diamond is a square with vertices $(\\pm 6, 0)$ and $(0, \\pm 6)$: its diagonals run along the axes, each of length 12.',
          'Area of a square from its diagonals: $\\frac{1}{2} d_1 d_2 = \\frac{1}{2} \\cdot 12 \\cdot 12 = 72$ (equivalently side $6\\sqrt{2}$, area $72$).',
        ], answer: 'the square $|x| + |y| = 6$ with vertices $(\\pm 6, 0)$, $(0, \\pm 6)$; area $72$' },
        { q: 'The circle $|z - 3 - 4i| = 5$: show it passes through the origin, and count its lattice points.', solution: [
          'Read the equation as geometry: distance from the fixed point $3 + 4i$ equals 5 — the circle of centre $(3, 4)$, radius $5$.',
          'The origin test: $|0 - 3 - 4i| = |-3 - 4i| = \\sqrt{9 + 16} = 5$ — the origin lies on the circle.',
          'Lattice seats: $(x - 3)^2 + (y - 4)^2 = 25$ needs the 3-4-5 offsets from the centre: $(\\pm 3, \\pm 4)$, $(\\pm 4, \\pm 3)$, $(0, \\pm 5)$, $(\\pm 5, 0)$.',
          'Enumerate: $(0,0)$, $(6, 8)$, $(6, 0)$, $(0, 8)$, $(8, 4)$, $(-2, 4)$, $(3, 9)$, $(3, -1)$, $(7, 7)$, $(7, 1)$, $(-1, 7)$, $(-1, 1)$ — twelve points, the same census the unshifted circle carried.',
        ], answer: 'centre $(3, 4)$, radius $5$, through the origin; exactly $12$ lattice points' },
        { q: 'Given $(2 + 3i)^4 = -119 - 120i$, write down $(2 - 3i)^4$ without re-expanding, and justify the step.', solution: [
          'The mirror relation: $2 - 3i = \\overline{(2 + 3i)}$ — flip the imaginary sign.',
          'The power law of the conjugate: $\\overline{z^4} = (\\bar{z})^4$, so $(2 - 3i)^4 = \\overline{(2 + 3i)^4} = \\overline{-119 - 120i} = -119 + 120i$.',
          'The justification is the product law applied three times — conjugation commutes with every multiplication that builds the fourth power.',
          'Spot check: $(2 - 3i)^2 = -5 - 12i$ and $(-5 - 12i)^2 = 25 + 120i - 144 = -119 + 120i$ — agrees.',
        ], answer: '$(2 - 3i)^4 = -119 + 120i$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the sharp form $|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2 + 2\\,\\mathrm{Re}(z_1\\bar{z}_2)$, and deduce the triangle inequality with its equality case.', solution: [
          'Expand the left side in components: $(a + c)^2 + (b + d)^2 = (a^2 + b^2) + (c^2 + d^2) + 2(ac + bd)$ — an identity.',
          'Identify the cross term: $(a + bi)(c - di) = (ac + bd) + (bc - ad)i$, so $\\mathrm{Re}(z_1\\bar{z}_2) = ac + bd$ — the sharp form is proved.',
          'Bound it: Cauchy–Schwarz in two variables, itself proved by the discriminant of the never-negative quadratic $|t\\,z_1 - z_2|^2$ — gives $ac + bd \\leq |z_1||z_2|$.',
          'Substitute: $|z_1 + z_2|^2 \\leq |z_1|^2 + |z_2|^2 + 2|z_1||z_2| = (|z_1| + |z_2|)^2$; both sides non-negative, so the root preserves the order.',
          'Equality needs both inequalities tight — same direction, $z_2 = \\lambda z_1$ with $\\lambda \\geq 0$ real. Witness: $3 + 4i$ against $5 - 12i$ gives $128 = 25 + 169 + 2(-33)$, strict.',
        ], answer: 'the identity is exact; $|z_1 + z_2| \\leq |z_1| + |z_2|$ with equality exactly at $z_2 = \\lambda z_1$ ($\\lambda \\geq 0$ real)' },
        { q: 'For $z = x + iy$ in the first quadrant, prove that $\\dfrac{\\bar{z}}{z}$ lies in the fourth quadrant exactly when $x > y > 0$.', solution: [
          'Conjugate-multiply once: $\\dfrac{\\bar{z}}{z} = \\dfrac{(x - iy)^2}{x^2 + y^2} = \\dfrac{(x^2 - y^2) - 2ixy}{x^2 + y^2}$ — the components are honest real fractions over a positive bottom.',
          'In the first quadrant $x, y > 0$, so the imaginary part $\\dfrac{-2xy}{x^2 + y^2}$ is strictly NEGATIVE — the ratio always sits in the lower half-plane.',
          'The quadrant is therefore decided by the real part: $\\dfrac{x^2 - y^2}{x^2 + y^2} > 0$ exactly when $x^2 > y^2$, that is $x > y$ (both are positive).',
          'The boundary $x = y$ lands the ratio on the negative imaginary axis ($x^2 - y^2 = 0$), and $x < y$ sends it to the third quadrant — the sweep confirms the law.',
        ], answer: 'the ratio is always below the real axis there; fourth quadrant $\\iff x > y > 0$' },
        { q: 'If $(x + iy)^7 = A + iB$ with $x, y$ real, express $(y + ix)^7$ in terms of $A$ and $B$.', solution: [
          'The lemma first: $i(x - iy) = ix - i^2y = y + ix$, so $y + ix = i\\bar{z}$ where $z = x + iy$.',
          'Power it: $(y + ix)^7 = i^7(\\bar{z})^7 = i^7\\,\\overline{z^7}$ — the last step by the power law of the conjugate.',
          'The iota cycle: $i^7 = i^4 \\cdot i^3 = -i$; and $\\overline{z^7} = \\overline{A + iB} = A - iB$.',
          'Multiply out: $(y + ix)^7 = -i(A - iB) = -iA - B = (-B) - iA$.',
          'Witness at $x = 2, y = 1$: $(2 + i)^7 = -278 - 29i$, so $A = -278, B = -29$ — the law predicts $(1 + 2i)^7 = 29 + 278i$, and the direct powering confirms it.',
        ], answer: '$(y + ix)^7 = -B - iA$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the parallelogram law $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$, and interpret it on the Argand plane.', solution: [
          'Expand both left terms in components: $(a+c)^2 + (b+d)^2$ and $(a-c)^2 + (b-d)^2$.',
          'Add them: the cross terms $2(ac + bd)$ and $-2(ac + bd)$ cancel, leaving $2(a^2 + b^2) + 2(c^2 + d^2) = 2(|z_1|^2 + |z_2|^2)$ — proved.',
          'The plane reading: $0$, $z_1$, $z_2$, $z_1 + z_2$ are the vertices of the parallelogram the two numbers span (lesson 3.1\'s addition picture); its two diagonals are $z_1 + z_2$ and $z_1 - z_2$.',
          'So the law says: in this parallelogram, the sum of the squared diagonals equals twice the sum of the squared sides — the classical theorem of geometry, delivered by two lines of component algebra.',
          'Witness: $z_1 = 3 + 4i$, $z_2 = 5 - 12i$ — the diagonals $|8 - 8i|^2 + |-2 + 16i|^2 = 128 + 260 = 388$ against $2(25 + 169) = 388$.',
        ], answer: 'the identity holds for all pairs — the parallelogram\u2019s diagonals and sides' },
        { q: 'Find every $z$ satisfying BOTH $|z - \\bar{z}| + |z + \\bar{z}| = 8$ and $z\\bar{z} = 8$.', solution: [
          'Convert both to components: the first is $2|y| + 2|x| = 8$, that is $|x| + |y| = 4$; the second is $x^2 + y^2 = 8$.',
          'Square the first: $x^2 + y^2 + 2|xy| = 16$, and substitute the second: $8 + 2|xy| = 16$, so $|xy| = 4$.',
          'Now $x^2$ and $y^2$ have sum 8 and product $x^2y^2 = 16$: they are the roots of $u^2 - 8u + 16 = 0$, that is $(u - 4)^2 = 0$ — both are 4.',
          'So $|x| = |y| = 2$, consistent with $|x| + |y| = 4$ — exactly four points: $\\pm 2 \\pm 2i$.',
          'Check one, $z = 2 + 2i$: $|z - \\bar{z}| + |z + \\bar{z}| = |4i| + |4| = 8$ and $z\\bar{z} = 4 + 4 = 8$ — both hold; the other three follow by symmetry.',
        ], answer: '$z \\in \\{2+2i,\\ 2-2i,\\ -2+2i,\\ -2-2i\\}$ — the four corners' },
      ] },
    ] },
  ],
}

export const chapter03: Chapter = {
  number: 3,
  slug: 'complex-numbers',
  title: 'Complex Numbers: the New Rung',
  summary:
    'Arithmetic and Number Systems proved the extension-ladder discipline — every new number family born from a closure failure, repaired on purpose. This chapter climbs the most famous rung: x² + 1 = 0 has no real door, so a number i is forced with i² = −1, and the algebra of a + bi is built so the whole field-law family survives (the honest sanity ANS 7.2 banked). The conjugate and modulus arrive as bookkeeping — z z̄ = |z|², division by conjugating, |z| as a distance with the triangle inequality — and the Argand plane is read algebraically (addition as the parallelogram, multiplication as rotation-and-scaling) with the deep geometry left to later books. The payoff: the quadratic formula keeps its promise for every discriminant, and real coefficients are shown to force complex doors in conjugate pairs. De Moivre’s theorem and the nth roots of unity — the unit circle’s equal spokes — with their properties (primitive roots, the cyclotomic equations) banked as the module’s depth engine.',
  status: 'in-progress',
  lessons: [lesson31, lesson32],
  plannedLessons: [
    'Negative Discriminants: the Doors Turn Complex',
    'The Argand Plane: Polar Form and the Argument',
    'De Moivre, Roots of Unity and the Complex Loci',
  ],
}
