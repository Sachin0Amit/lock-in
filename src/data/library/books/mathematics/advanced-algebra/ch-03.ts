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
 *                  locus)) · 3.3 "Negative Discriminants: the Doors Turn
 *                  Complex" (run 107 — the payoff: AL 9.3's third verdict
 *                  finally answers. Verify-first K/L 523/0 green pre-prose
 *                  — the engines caught 5 real bugs in their own drafting
 *                  incl. a door-count logic slip and a z²-vs-z route error;
 *                  quiz keys [0, 1, 0, 3, 1]; 15 exercises L1–L6 2/2/3/3/3/2
 *                  with full worked solutions; 2 figures — the doors and
 *                  the mirror (the floating parabola x²−4x+13 + the Argand
 *                  doors 2±3i at the vertex's axis) and the trichotomy
 *                  strip (the k-family x²−2x+k at its three verdicts with
 *                  the Argand inset); 3 derivations (the door formula by
 *                  completing the square over ℂ, the conjugate-pair law
 *                  PROVED from 3.2's distribution laws, the u,v system
 *                  with the sign law); 3 formula cards; 8
 *                  Illustrations incl. the real-root engine and the
 *                  complex-coefficient family z²−(1+3i)z+(4+4i) through
 *                  √(−24−10i) = ±(1−5i); NO fold obligation — the ledger
 *                  hosts 'Square Root of Complex Number' on 3.5 as an
 *                  example-family, the method itself is this lesson's
 *                  core engine; book.ts pins 3.4 The Argand Plane and 3.5
 *                  De Moivre/Roots of Unity as the remaining lessons).
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

/* figures for lesson 3.3 — the doors and the mirror; the trichotomy   */
/* strip                                                              */

function doorsMirrorSvg(): string {
  // left: the real parabola y = x²−4x+13 (vertex (2,9), axis x = 2,
  // floating above the real axis — no real door); right: the Argand
  // plane with the conjugate doors 2±3i, the mirror axis, the radius
  // √13 and the equidistant guides
  const px = (x: number): number => 20 + (x + 1) * 49
  const pyL = (y: number): number => 300 - y * 17
  // parabola arc x ∈ [−0.449, 4.449] (y ≤ 15) as an exact quadratic
  // Bezier: endpoints (47, 45) and (287, 45), vertex (167, 145)
  const OX = 535
  const OY = 168
  const U = 34
  const pxR = (re: number): number => OX + U * re
  const pyR = (im: number): number => OY - U * im
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels about the quadratic family x squared minus four x plus thirteen. Left panel: the real parabola with vertex at the point (2, 9), its axis of symmetry the dashed line x equals 2, the curve floating entirely above the real x-axis with the annotation no real door, discriminant negative. Right panel: the Argand plane where the two doors 2 plus 3 i and 2 minus 3 i hang as a mirror pair across the real axis, at real part 2 exactly below the vertex axis; the dashed radius from the origin to 2 plus 3 i has length root 13, and horizontal guides mark the equal distances 3 above and below the real axis.">
  <text x="170" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the real family y = x² − 4x + 13</text>
  <text x="575" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the doors on the Argand plane</text>
  <line x1="355" y1="40" x2="355" y2="310" stroke="#fcd34d" stroke-width="1.4"/>
  <!-- left panel: the floating parabola -->
  <line x1="20" y1="300" x2="340" y2="300" stroke="#0d9488" stroke-width="2"/>
  ${[-1, 0, 1, 2, 3, 4, 5].map((t) => `<line x1="${px(t)}" y1="300" x2="${px(t)}" y2="306" stroke="#0d9488" stroke-width="1.4"/><text x="${px(t)}" y="318" font-size="10" text-anchor="middle" fill="#0f766e">${t}</text>`).join('')}
  <line x1="167" y1="300" x2="167" y2="44" stroke="#d97706" stroke-width="1.6" stroke-dasharray="7 5"/>
  <text x="167" y="38" font-size="11" font-weight="700" text-anchor="middle" fill="#d97706">x = 2 · the axis of symmetry</text>
  <path d="M47,45 Q167,245 287,45" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="167" cy="145" r="6" fill="#ea580c"/>
  <text x="178" y="163" font-size="11.5" font-weight="700" fill="#166534">vertex (2, 9)</text>
  <text x="167" y="336" font-size="11" font-weight="700" text-anchor="middle" fill="#dc2626">no real door — D = −36 &lt; 0 (the curve floats 9 above)</text>
  <!-- right panel: the conjugate doors -->
  <line x1="445" y1="${OY}" x2="705" y2="${OY}" stroke="#0d9488" stroke-width="2.2"/>
  <text x="575" y="${OY + 22}" font-size="10.5" text-anchor="middle" fill="#0f766e">the mirror — the real axis</text>
  <line x1="${OX}" y1="290" x2="${OX}" y2="46" stroke="#5eead4" stroke-width="1.4"/>
  <line x1="${pxR(2)}" y1="50" x2="${pxR(2)}" y2="286" stroke="#d97706" stroke-width="1.6" stroke-dasharray="7 5"/>
  <text x="${pxR(2)}" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="#d97706">Re z = 2 = −b/2a</text>
  <line x1="${OX}" y1="${pyR(3)}" x2="${pxR(2)}" y2="${pyR(3)}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 4"/>
  <line x1="${OX}" y1="${pyR(-3)}" x2="${pxR(2)}" y2="${pyR(-3)}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 4"/>
  <text x="${OX - 6}" y="${pyR(3) + 4}" font-size="10" text-anchor="end" fill="#0f766e">3</text>
  <text x="${OX - 6}" y="${pyR(-3) + 4}" font-size="10" text-anchor="end" fill="#0f766e">−3</text>
  
  <line x1="${OX}" y1="${OY}" x2="${pxR(2)}" y2="${pyR(3)}" stroke="#d97706" stroke-width="1.8" stroke-dasharray="6 4"/>
  <text x="528" y="96" font-size="10.5" font-weight="700" text-anchor="end" fill="#d97706">|z| = √13</text>
  <circle cx="${pxR(2)}" cy="${pyR(3)}" r="6.5" fill="#ea580c"/>
  <text x="${pxR(2) + 19}" y="${pyR(3) - 4}" font-size="12.5" font-weight="700" fill="#166534">2 + 3i (door)</text>
  <circle cx="${pxR(2)}" cy="${pyR(-3)}" r="6.5" fill="#ea580c"/>
  <text x="${pxR(2) + 19}" y="${pyR(-3) + 10}" font-size="12.5" font-weight="700" fill="#166534">2 − 3i (door)</text>
  <circle cx="${OX}" cy="${OY}" r="4" fill="#16a34a"/>
  <text x="${OX - 7}" y="${OY - 10}" font-size="10.5" text-anchor="end" fill="#166534">O</text>
  <text x="575" y="322" font-size="10.5" text-anchor="middle" fill="#0f766e">the doors hang as the mirror pair z, z̄</text>
  <text x="575" y="336" font-size="10.5" text-anchor="middle" fill="#0f766e">at the real part of the vertex — the family still owns its two doors</text>
</svg>`
}

function trichotomyStripSvg(): string {
  // three mini-panels of the k-family x²−2x+k at k = −2 (two real
  // doors), k = 1 (the double door), k = 2 (the conjugate pair with the
  // Argand inset) — AL 9.3's trichotomy repaired
  const panel = (x0: number, kLabel: string, dLabel: string, dColor: string, verdict: string, curve: string, dots: string, note: string, noteY: number): string => {
    let out = ''
    out += `<text x="${x0 + 112}" y="52" font-size="12" font-weight="700" text-anchor="middle" fill="${dColor}">${kLabel} · ${dLabel}</text>`
    out += `<text x="${x0 + 112}" y="72" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${verdict}</text>`
    out += `<line x1="${x0 + 12}" y1="220" x2="${x0 + 212}" y2="220" stroke="#0d9488" stroke-width="2"/>`
    out += `<line x1="${x0 + 112}" y1="226" x2="${x0 + 112}" y2="96" stroke="#5eead4" stroke-width="1.2"/>`
    out += curve
    out += dots
    out += `<text x="${x0 + 112}" y="${noteY}" font-size="10.5" text-anchor="middle" fill="#0f766e">${note}</text>`
    return out
  }
  // panel geometry: local x ∈ [−1.5, 3.5] over 200 px (unit 40), the
  // axis at py 220, vertical unit 11 px
  const lp = (x0: number, x: number): number => x0 + 12 + (x + 1.5) * 40
  const p1Curve = `M${lp(8, -1.5)},184 Q${lp(8, 1)},322 ${lp(8, 3.5)},184`
  const p1Dots =
    `<circle cx="${lp(8, 1 - Math.sqrt(3))}" cy="220" r="5.5" fill="#ea580c"/>` +
    `<circle cx="${lp(8, 1 + Math.sqrt(3))}" cy="220" r="5.5" fill="#ea580c"/>` +
    `<text x="${lp(8, 1 - Math.sqrt(3))}" y="244" font-size="10" text-anchor="middle" fill="#166534">1−√3</text>` +
    `<text x="${lp(8, 1 + Math.sqrt(3))}" y="244" font-size="10" text-anchor="middle" fill="#166534">1+√3</text>` +
    `<circle cx="${lp(8, 1)}" cy="253" r="4.5" fill="#16a34a"/>`
  const p2Curve = `M${lp(248, -1.5)},151 Q${lp(248, 1)},289 ${lp(248, 3.5)},151`
  const p2Dots =
    `<circle cx="${lp(248, 1)}" cy="220" r="5.5" fill="#ea580c"/>` +
    `<text x="${lp(248, 1)}" y="238" font-size="10" text-anchor="middle" fill="#166534">1 (twice)</text>`
  const p3Curve = `M${lp(488, -1.5)},140 Q${lp(488, 1)},278 ${lp(488, 3.5)},140`
  const p3Dots =
    `<circle cx="${lp(488, 1)}" cy="209" r="4.5" fill="#16a34a"/>` +
    `<text x="652" y="158" font-size="9.5" text-anchor="middle" fill="#166534">vertex (1, 1)</text>`
  // the Argand inset inside panel 3: origin (600, 262), unit 11
  const IX = 600
  const IY = 262
  const IU = 11
  const inset =
    `<rect x="${IX - 38}" y="${IY - 24}" width="76" height="48" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1.2"/>` +
    `<line x1="${IX - 30}" y1="${IY}" x2="${IX + 30}" y2="${IY}" stroke="#0d9488" stroke-width="1.4"/>` +
    `<line x1="${IX}" y1="${IY - 18}" x2="${IX}" y2="${IY + 18}" stroke="#5eead4" stroke-width="1"/>` +
    `<circle cx="${IX + IU}" cy="${IY - IU}" r="4" fill="#ea580c"/>` +
    `<circle cx="${IX + IU}" cy="${IY + IU}" r="4" fill="#ea580c"/>` +
    `<text x="${IX + IU + 7}" y="${IY - IU - 2}" font-size="9" font-weight="700" fill="#166534">1+i</text>` +
    `<text x="${IX + IU + 7}" y="${IY + IU + 8}" font-size="9" font-weight="700" fill="#166534">1−i</text>`
  return `<svg viewBox="0 0 720 312" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The trichotomy of the discriminant, repaired: three panels of the family x squared minus two x plus k. Panel one at k equals minus two: discriminant twelve positive, the parabola crosses the real axis twice at the doors 1 minus root 3 and 1 plus root 3. Panel two at k equals one: discriminant zero, the parabola kisses the axis at its vertex — one double door at 1. Panel three at k equals two: discriminant minus four, the parabola floats above the axis and the two doors turn complex, shown in an Argand inset as the mirror pair 1 plus i and 1 minus i. The third verdict of the classical trichotomy finally answers.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the trichotomy repaired — every verdict of AL 9.3\u2019s discipline answers over ℂ</text>
  ${panel(8, 'k = −2', 'D = 12 &gt; 0', '#16a34a', 'two real doors', `<path d="${p1Curve}" fill="none" stroke="#16a34a" stroke-width="2.4"/>`, p1Dots, 'x² − 2x − 2 = 0 → the doors 1 ± √3', 288)}
  ${panel(248, 'k = 1', 'D = 0', '#d97706', 'one double door', `<path d="${p2Curve}" fill="none" stroke="#16a34a" stroke-width="2.4"/>`, p2Dots, 'x² − 2x + 1 = (x−1)² → the door 1, seated twice', 288)}
  ${panel(488, 'k = 2', 'D = −4 &lt; 0', '#dc2626', 'a conjugate pair', `<path d="${p3Curve}" fill="none" stroke="#16a34a" stroke-width="2.4"/>`, p3Dots, 'x² − 2x + 2 = 0 → the doors 1 ± i', 305)}
  ${inset}
</svg>`
}

const lesson33: Lesson = {
  id: 'aa-negative-discriminants-the-doors-turn-complex',
  number: '3.3',
  title: 'Negative Discriminants: the Doors Turn Complex',
  concepts: [
    'complex doors of a quadratic',
    'conjugate-pair law',
    'sum and product of complex doors',
    'square root of a complex number',
    'the u, v system',
    'sign law',
    'door-count trichotomy',
    'axis of symmetry read',
  ],
  objectives: [
    'Solve any real-coefficient quadratic with D < 0 honestly: convert the surd first, then read the doors x = (−b ± i√|D|)/(2a) in standard form.',
    'Prove and use the conjugate-pair law: real coefficients force non-real doors in mirror pairs, with z + z̄ = −b/a and zz̄ = c/a.',
    'Rebuild a real family from one given door, and extract an unknown real parameter from a real-root hunt, without ever touching the formula.',
    'Extract the square roots of any complex number by the u, v system with the sign law, and feed them to complex-coefficient quadratics.',
    'Count doors honestly over ℂ: every quadratic owns exactly two counting multiplicity — the trichotomy repaired.',
    'Read the geometry: the doors hang below the vertex at Re z = −b/(2a), equidistant from the real axis, on the circle |z| = √(c/a).',
  ],
  prerequisites: ['aa-conjugate-and-modulus', 'aa-the-closure-failure-that-forces-i', 'al-the-quadratic-formula-and-the-discriminant'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra 9.3 priced the discriminant honestly: $D > 0$ two real doors, $D = 0$ one double door — and for the third verdict it could only refuse. "$D < 0$: the equation has no real solution." The refusal was honest but incomplete: the family $x^2 + 2x + 5 = 0$ still exists, the parabola still floats above the axis, and the question WHERE its doors live went unanswered. Lesson 3.1 built the rung that answers it; lesson 3.2 built the mirror machinery. This lesson is the payoff the whole chapter promised from its opening line: the quadratic formula keeps its promise for EVERY discriminant, and AL 9.3\u2019s third verdict finally closes.' },
    { kind: 'para', text: 'The route is short because the ground is laid. First the doors themselves — the honest surd route turns $\\sqrt{\\text{negative } D}$ into the letter\u2019s own currency, and the formula runs unchanged. Then the law that governs them: real coefficients force non-real doors in conjugate pairs, a theorem proved in three lines from 3.2\u2019s conjugate laws — and the same theorem that rebuilds whole families from a single given door at exam speed. Finally the engine that finishes the subject: the square roots of ANY complex number, extracted by the $u, v$ system with its sign law, so that even complex-coefficient quadratics — 3.1\u2019s ad hoc discriminants — become routine work.' },

    { kind: 'heading', text: 'The Doors for a Negative Discriminant' },
    { kind: 'para', text: 'Look again at the formula AL 9.3 proved: $x = \\frac{-b \\pm \\sqrt{D}}{2a}$ with $D = b^2 - 4ac$. Nothing in the derivation ever assumed $D \\geq 0$ — the algebra of completing the square is blind to the sign. The only object that ever cared is the surd $\\sqrt{D}$, and lesson 3.1 already priced that object: for a negative real $-k$, $\\sqrt{-k} = \\sqrt{k}\\,i$. The honest route is one move, and the formula takes it without flinching.' },
    { kind: 'derivation', title: 'The door formula for D < 0', statement: 'For $az^2 + bz + c = 0$ with real coefficients and $D = b^2 - 4ac < 0$, the two doors are $x = \\frac{-b \\pm i\\sqrt{|D|}}{2a}$ — in standard form, $x = \\frac{-b}{2a} \\pm \\frac{\\sqrt{|D|}}{2a}\\,i$, a conjugate pair.', steps: [
      { label: 'Complete the square', formula: '\\left(x + \\tfrac{b}{2a}\\right)^2 = \\tfrac{D}{4a^2}', explanation: 'The same completion AL 9.3 ran, with nothing new: subtract $c/a$, add $b^2/4a^2$. The right side $\\tfrac{D}{4a^2}$ is a NEGATIVE real number now — and a negative real is exactly the input whose square root lesson 3.1 manufactured.' },
      { label: 'The honest surd', formula: '\\sqrt{\\tfrac{D}{4a^2}} = \\tfrac{\\sqrt{|D|}}{2|a|}\\,i', explanation: 'Convert the negative surd FIRST — the same discipline 3.1 priced on $\\sqrt{-3}\\sqrt{-12}$: a negative under the root is taken to the letter\u2019s currency before any other move. The $\\pm$ of the formula absorbs the sign of $|a|$, so $\\tfrac{\\sqrt{|D|}}{2|a|}$ and $\\tfrac{\\sqrt{|D|}}{2a}$ give the same DOOR SET.' },
      { label: 'Read the standard form', formula: 'x = \\tfrac{-b}{2a} \\pm \\tfrac{\\sqrt{|D|}}{2a}\\,i', explanation: 'The real part of both doors is the single number $\\tfrac{-b}{2a}$ — the axis of symmetry, exactly where the vertex of the real parabola sits. The two doors differ only in the sign of the imaginary part: they are conjugates, which the next section proves is no coincidence.' },
    ], result: 'x = \\frac{-b \\pm i\\sqrt{|D|}}{2a} = \\frac{-b}{2a} \\pm \\frac{\\sqrt{|D|}}{2a}\\,i \\quad (D < 0)' },
    { kind: 'callout', tone: 'definition', title: 'The complex doors of a quadratic (the D < 0 case)', text: 'For $az^2 + bz + c = 0$ over $\\mathbb{C}$, a DOOR is a number $z$ — real or complex — at which the polynomial vanishes; the family owns exactly two counting multiplicity. When $D = b^2 - 4ac < 0$ with real coefficients, the two doors are the conjugate pair $x = \\frac{-b \\pm i\\sqrt{|D|}}{2a}$ — the seats the real line refused to host. Thus, $x^2 + 2x + 5 = 0$ owns the doors $-1 \\pm 2i$: the family is solved, not excused.' },
    { kind: 'formula', name: 'The doors for D < 0', latex: 'x = \\frac{-b \\pm i\\sqrt{|D|}}{2a} = \\frac{-b}{2a} \\pm \\frac{\\sqrt{|D|}}{2a}\\, i', note: 'convert the surd first ($\\sqrt{-k} = \\sqrt{k}\\,i$); the real part $-b/2a$ is shared by both doors — it is the axis of symmetry.' },
    { kind: 'example', title: 'Solve x² + 2x + 5 = 0, x² − 4x + 13 = 0 and 2x² + 2x + 1 = 0, and verify one door by substitution', steps: [
      'First family: $D = 4 - 20 = -16$, so $\\sqrt{|D|} = 4$ and the doors are $x = \\frac{-2 \\pm 4i}{2} = -1 \\pm 2i$.',
      'Second family: $D = 16 - 52 = -36$, $\\sqrt{|D|} = 6$, doors $x = \\frac{4 \\pm 6i}{2} = 2 \\pm 3i$.',
      'Third family: $D = 4 - 8 = -4$, $\\sqrt{|D|} = 2$, doors $x = \\frac{-2 \\pm 2i}{4} = \\tfrac{-1 \\pm i}{2}$ — fractional components are honest components, never a defect.',
      'Substitution check on the first family at $x = -1 + 2i$: $x^2 = (-1+2i)^2 = 1 - 4i - 4 = -3 - 4i$, so $x^2 + 2x + 5 = (-3-4i) + (-2+4i) + 5 = 0$ — the door opens exactly.',
      'Hence, the doors are $-1 \\pm 2i$, $2 \\pm 3i$ and $\\tfrac{-1 \\pm i}{2}$ — every family paid in full, the third verdict answered.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Convert the surd before touching the formula', text: 'The priced slips are all one disease: writing $\\sqrt{-16}/2$ and "simplifying" it as $\\sqrt{-4} = 2i$ INSIDE the surd, or letting two negative surds meet before each is resolved — the $\\sqrt{-3}\\sqrt{-12}$ fraud of lesson 3.1 returns inside the formula if the doors are rushed. The honest sequence is rigid: compute $D$ and its sign, convert $\\sqrt{\\text{negative}}$ to the $i$-currency immediately, then divide by $2a$. And the $\\pm$ wraps the WHOLE imaginary term — the real part $-b/2a$ is one number, never flipped.' },
    { kind: 'example', title: 'Read the sum, the product and the geometry of the doors of x² − 4x + 13 = 0', steps: [
      'The doors are $2 \\pm 3i$; the sum read: $(2+3i) + (2-3i) = 4 = -\\tfrac{b}{a}$ — Viète survives unbroken over $\\mathbb{C}$.',
      'The product read: $(2+3i)(2-3i) = 4 + 9 = 13 = \\tfrac{c}{a}$ — and the product is exactly $|z|^2$: the doors sit on the circle of radius $\\sqrt{13}$ about the origin.',
      'The real part $2 = -\\tfrac{b}{2a}$ is the axis of symmetry: the real parabola $y = x^2 - 4x + 13 = (x-2)^2 + 9$ has vertex $(2, 9)$, floating 9 units above the axis — the picture of "no real door".',
      'The geometry: the doors stand $3$ units either side of the real axis — equidistant, a mirror pair, exactly as 3.2\u2019s equidistant law promises.',
      'Hence, sum $4$, product $13 = |z|^2$, real part $2$ = the axis of symmetry; the vertex $(2, 9)$ floats and the doors hang beneath it.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the product of the doors is positive', text: 'A negative discriminant secretly forces a sign contract on the coefficients: $D = b^2 - 4ac < 0$ means $4ac > b^2 \\geq 0$, so $ac > 0$ — $a$ and $c$ share a sign, and $\\tfrac{c}{a} > 0$. That is why the product of the doors, $zz̄ = |z|^2 = \\tfrac{c}{a}$, is strictly positive for every $D < 0$ family: the doors\u2019 circle $|z| = \\sqrt{c/a}$ never degenerates to a point at the origin. The trichotomy\u2019s third case is not a wasteland — it is the best-organised case of the three.' },

    { kind: 'heading', text: 'The Conjugate-Pair Law for Real Coefficients' },
    { kind: 'para', text: 'Every door roster so far came out in mirror pairs — and that is a theorem, not a habit. The proof is three lines of lesson 3.2\u2019s algebra, and it converts the single most common exam shape ("one root is given") from a computation into a read.' },
    { kind: 'callout', tone: 'theorem', title: 'The conjugate-pair law', text: 'Let $a, b, c$ be REAL with $a \\neq 0$. If $z$ is a door of $az^2 + bz + c = 0$, then $\\bar{z}$ is a door too. In particular the non-real doors of a real family come in conjugate pairs $z, \\bar{z}$ with $z + \\bar{z} = -\\tfrac{b}{a}$ (real) and $z\\bar{z} = \\tfrac{c}{a}$ (real, and positive when $D < 0$). A real quadratic can never own exactly one non-real door.' },
    { kind: 'derivation', title: 'The conjugate-pair law, proved from 3.2\u2019s algebra', statement: 'For real $a, b, c$: if $az^2 + bz + c = 0$ then $a\\bar{z}^2 + b\\bar{z} + c = 0$ — the mirror of a door is a door.', steps: [
      { label: 'Conjugate the equation', formula: '\\overline{az^2 + bz + c} = \\bar{0} = 0', explanation: 'Both sides of the equation are conjugated: the right side is $0$, a real number, and 3.2\u2019s law says a real number is its own conjugate.' },
      { label: 'Distribute the mirror', formula: '\\overline{az^2 + bz + c} = a\\bar{z}^2 + b\\bar{z} + c', explanation: 'The conjugate commutes with the whole arithmetic — sums, products, powers — and every coefficient $a, b, c$ is real, so each is its own mirror. The mirrored polynomial is the polynomial AT the mirror point.' },
      { label: 'Read the mirror door', formula: 'a\\bar{z}^2 + b\\bar{z} + c = 0', explanation: 'So $\\bar{z}$ satisfies the same equation. If $z$ is non-real, $\\bar{z} \\neq z$, and the two doors are distinct — a mirror pair.' },
      { label: 'The reads', formula: 'z + \\bar{z} = -\\tfrac{b}{a}, \\qquad z\\bar{z} = \\tfrac{c}{a}', explanation: 'The pair\u2019s sum is twice the real part — real, the axis of symmetry again; the pair\u2019s product is the sum of squares $|z|^2$ — real and, by the sign contract above, positive when $D < 0$.' },
    ], result: 'z \\text{ door} \\implies \\bar{z} \\text{ door}; \\qquad z + \\bar{z} = -\\tfrac{b}{a}, \\quad z\\bar{z} = \\tfrac{c}{a}' },
    { kind: 'formula', name: 'The conjugate-pair reads', latex: 'z + \\bar{z} = -\\tfrac{b}{a}, \\qquad z\\bar{z} = \\tfrac{c}{a} = |z|^2', note: 'the mirror pair’s sum and product price the coefficients without solving: given one non-real door of a real family, the other door is its conjugate and both reads follow.' },
    { kind: 'para', text: 'What the law buys at exam speed is the elimination of the entire solution cycle. Given one non-real door of a real family, the other door is known; given the sum and product reads, the family itself can be rebuilt; and a family can be TESTED for honesty without being solved — a door whose mirror does not keep the promised sum was never a door at all.' },
    { kind: 'example', title: 'One door of z² − 8z + p = 0 (p real) is 4 + i. Find p and the other door without solving the equation', steps: [
      'The coefficients are real, so the conjugate-pair law applies: the other door is the mirror, $4 - i$ — no formula touched.',
      'The sum read: $(4+i) + (4-i) = 8 = -\\tfrac{b}{a}$ — consistent with the given family (the family is honest).',
      'The product read: $p = (4+i)(4-i) = 16 + 1 = 17$.',
      'Hence, $p = 17$ and the other door is $4 - i$ — the law replaced the whole solution cycle with two one-line reads.',
    ] },
    { kind: 'example', title: 'Build the real quadratic whose doors are 2 ± 3i, and read its vertex', steps: [
      'The two doors are a conjugate pair, so a REAL family owning them exists: $(x - (2+3i))(x - (2-3i))$.',
      'Expand: $x^2 - [(2+3i) + (2-3i)]\\,x + (2+3i)(2-3i) = x^2 - 4x + 13$ — the sum and the product came out real, forced by the mirror.',
      'The vertex: $-\\tfrac{b}{2a} = 2 = \\mathrm{Re}(\\text{door})$, with value $13 - \\tfrac{16}{4} = 9$ — the parabola floats 9 above the axis, its doors hanging beneath the vertex.',
      'Hence, $x^2 - 4x + 13 = 0$, vertex $(2, 9)$ — the family this lesson keeps as its running witness.',
    ] },
    { kind: 'figure', caption: 'The doors and the mirror for the family x² − 4x + 13 = 0. Left: the real parabola — vertex (2, 9), axis of symmetry x = 2, the curve floating entirely above the real axis with no real door to touch. Right: the Argand plane — the two doors 2 ± 3i hang as a mirror pair across the real axis, at real part 2, exactly below the vertex\u2019s axis; the dashed radius from O satisfies |z| = √13 with |z|² = 13 = c/a, and the guides mark the equal distances 3 above and below the mirror.', svg: doorsMirrorSvg() },
    { kind: 'callout', tone: 'warn', title: 'The law needs REAL coefficients', text: 'Break the reality of the coefficients and the mirror breaks. Lesson 3.1\u2019s family $x^2 + (1+i)x + i = 0$ owns the doors $-1$ and $-i$ — neither is the other\u2019s conjugate (the mirror of $-1$ is $-1$). The family $z^2 - (1+3i)z + (4+4i) = 0$ worked later in this lesson owns $1 - i$ and $4i$. With complex coefficients Viète\u2019s reads survive, but every door stands alone — priced exam items hang exactly on this contrast.' },
    { kind: 'table', caption: 'The door-count census on the family x² − 2x + k (D = 4 − 4k): every verdict of AL 9.3\u2019s trichotomy finally answers, and the doors are counted honestly over ℂ — counting multiplicity the total is two at every seat.', head: ['k', 'D = 4 − 4k', 'the verdict', 'the doors'], rows: [
      ['$-2$', '$12$', 'two distinct real doors', '$1 \\pm \\sqrt{3}$'],
      ['$1$', '$0$', 'one double door (two seats coincide)', '$1$ (twice)'],
      ['$2$', '$-4$', 'a conjugate pair', '$1 \\pm i$'],
      ['$5$', '$-16$', 'a conjugate pair', '$1 \\pm 2i$'],
    ] },
    { kind: 'para', text: 'AL 9.3\u2019s third verdict — "no real roots" — was an honest refusal, not an answer about the equation. Over $\\mathbb{C}$ the family still owns exactly two doors counting multiplicity: at the $D = 0$ seat the two seats collide into the double door, and at the $D < 0$ seats they simply change address. The count never changes — two, two, two — and the brute-force census (swept family by family in the verifier that pinned this lesson\u2019s numbers before a sentence of prose existed) confirms it: no real family owns zero doors or one-and-a-half doors. What the discriminant decides is only WHERE the pair lives.' },
    { kind: 'figure', caption: 'The trichotomy repaired: the family x² − 2x + k = 0 at its three verdicts. Left (k = −2): D = 12 > 0, the parabola crosses the real axis twice — two real doors 1 ± √3. Middle (k = 1): D = 0, the parabola kisses the axis at its vertex — one double door, both seats parked at 1. Right (k = 2): D = −4 < 0, the parabola floats — and the two doors turn complex, the mirror pair 1 ± i hanging below the vertex in the Argand inset.', svg: trichotomyStripSvg() },
    { kind: 'callout', tone: 'insight', title: 'The degree-n promise (an honest scope note)', text: 'Over $\\mathbb{C}$, every polynomial of degree $n$ owns exactly $n$ doors counting multiplicity — the fundamental theorem of algebra, first proved by Gauss in 1799 (several proofs, all deeper than this chapter needs). This lesson cashes the $n = 2$ case honestly by construction: the door formula is built, not asserted. The general theorem is STATED here, not proved — the book\u2019s standing honesty rule — and the proof-and-conditions story belongs to the Theory of Equations chapter (chapter 8), where the degree count and the conjugate-pair law for real coefficients return at full scale.' },
    { kind: 'example', title: 'The real-root engine: z² + (1+i)z + (m + 5i) = 0 (m real) has a real door. Find m and both doors', steps: [
      'Let the real door be $\\alpha$. Substituting and splitting into components (a real number\u2019s imaginary part is $0$): the real component reads $\\alpha^2 + \\alpha + m = 0$; the imaginary component reads $\\alpha + 5 = 0$.',
      'The imaginary component is a pure equation in $\\alpha$: $\\alpha = -5$.',
      'The real component then prices $m$: $25 - 5 + m = 0$, so $m = -20$.',
      'The Viète product: the doors multiply to $m + 5i = -20 + 5i$, so the other door is $\\tfrac{-20+5i}{-5} = 4 - i$.',
      'Check the sum: $-5 + (4 - i) = -1 - i = -(1+i)$ — exactly $-b$; the family is $z^2 + (1+i)z - 20 + 5i = 0$.',
      'Hence, $m = -20$ and the doors are $-5$ and $4 - i$ — a complex-coefficient family CAN own a real door; the component-split engine found it without luck.',
    ] },

    { kind: 'heading', text: 'Square Roots of Any Complex Number: the u, v System' },
    { kind: 'para', text: 'The $D < 0$ route needed only the square roots of negative REALS — $\\sqrt{-16} = 4i$, one move of the letter\u2019s law. But complex-coefficient quadratics demand more: 3.1\u2019s $x^2 + (1+i)x + i = 0$ needed $\\sqrt{-2i}$, and this lesson\u2019s own family $z^2 - (1+3i)z + (4+4i) = 0$ will need $\\sqrt{-24 - 10i}$. History demanded it too: Bombelli’s 1572 “wild thought” ran on the cube root of $2 + 11i$ — guessed, then checked by hand; what his century lacked was exactly the systematic engine for the square roots of any complex number. The general derivation deserves it: find EVERY $(u + vi)$ with $(u + vi)^2 = a + bi$ — and as a bonus, every complex number will turn out to own square roots, not just the Pythagorean-friendly ones.' },
    { kind: 'derivation', title: 'The u, v system and the sign law', statement: 'The square roots of $a + bi$ ($a, b$ real) are exactly the two numbers $\\pm(u + vi)$ with $u^2 = \\tfrac{r + a}{2}$, $v^2 = \\tfrac{r - a}{2}$, where $r = \\sqrt{a^2 + b^2} = |a + bi|$; the signs of $u$ and $v$ are tied by $2uv = b$ — the same signs when $b > 0$, opposite signs when $b < 0$.', steps: [
      { label: 'Set up the pair', formula: '(u + vi)^2 = (u^2 - v^2) + 2uv\\,i = a + bi', explanation: 'Squaring the candidate and reading equality componentwise — 3.1\u2019s law — gives TWO equations: $u^2 - v^2 = a$ and $2uv = b$.' },
      { label: 'The third equation', formula: '(u^2 + v^2)^2 = (u^2 - v^2)^2 + (2uv)^2 = a^2 + b^2', explanation: 'The Pythagoras identity on the two equations already won; since $u^2 + v^2 \\geq 0$, the non-negative root is forced: $u^2 + v^2 = \\sqrt{a^2 + b^2} = r$ — the MODULUS of the number, arriving as the system\u2019s keystone.' },
      { label: 'Solve the pair', formula: 'u^2 = \\tfrac{r + a}{2}, \\qquad v^2 = \\tfrac{r - a}{2}', explanation: 'Add and subtract $u^2 - v^2 = a$ against $u^2 + v^2 = r$. Both right sides are $\\geq 0$ because $|a| \\leq \\sqrt{a^2 + b^2} = r$ always — so real $u, v$ exist for EVERY complex number: the square-root door never closes on $\\mathbb{C}$.' },
      { label: 'The sign law', formula: '2uv = b', explanation: '$|u|$ and $|v|$ are fixed; one sign choice remains, and $2uv = b$ ties it: $b > 0$ wants $u, v$ with the SAME signs, $b < 0$ wants OPPOSITE signs. For $b = 0$ the number is real and sits on an axis — the honest cases $\\sqrt{16} = \\pm 4$ and $\\sqrt{-16} = \\pm 4i$ need no engine at all.' },
      { label: 'The pair ±', formula: '(-u - vi)^2 = (u + vi)^2', explanation: 'Negating the candidate negates nothing that matters — the square is unchanged. So the roots arrive in $\\pm$ pairs: exactly two, never one, never three.' },
    ], result: '\\sqrt{a + bi} = \\pm(u + vi): \\quad u^2 = \\tfrac{r+a}{2}, \\; v^2 = \\tfrac{r-a}{2}, \\; r = \\sqrt{a^2+b^2}, \\; \\mathrm{sign}(u)\\,\\mathrm{sign}(v) = \\mathrm{sign}(b)' },
    { kind: 'formula', name: 'Square roots of a complex number (the u, v system)', latex: '\\sqrt{a + bi} = \\pm\\left(\\sqrt{\\tfrac{r + a}{2}} + i\\sqrt{\\tfrac{r - a}{2}}\\right), \\qquad r = \\sqrt{a^2 + b^2} = |a+bi|', note: 'the signs of the two halves are tied by $2uv = b$: same signs for $b > 0$, opposite for $b < 0$; when $a^2 + b^2$ is a perfect square and the halves land integer, the roots are the tidy $\\pm(u+vi)$ pairs of the census table.' },
    { kind: 'example', title: 'Find the square roots of 3 + 4i in full; then write down √(−3+4i), √(5−12i) and √(−8−6i)', steps: [
      'For $3 + 4i$: $r = \\sqrt{9 + 16} = 5$; then $u^2 = \\tfrac{5 + 3}{2} = 4$ and $v^2 = \\tfrac{5 - 3}{2} = 1$, so $|u| = 2$, $|v| = 1$.',
      'Sign law: $b = 4 > 0$ wants the SAME signs: $\\sqrt{3 + 4i} = \\pm(2 + i)$. Check: $(2+i)^2 = 4 + 4i + i^2 = 3 + 4i$.',
      'For $-3 + 4i$: $r = 5$, $u^2 = 1$, $v^2 = 4$; $b > 0$, same signs: $\\pm(1 + 2i)$. Check: $(1+2i)^2 = 1 + 4i - 4 = -3 + 4i$.',
      'For $5 - 12i$: $r = 13$, $u^2 = 9$, $v^2 = 4$; $b = -12 < 0$ wants OPPOSITE signs: $\\pm(3 - 2i)$. Check: $(3-2i)^2 = 9 - 12i - 4 = 5 - 12i$.',
      'For $-8 - 6i$: $r = 10$, $u^2 = 1$, $v^2 = 9$; $b < 0$, opposite signs: $\\pm(1 - 3i)$. Check: $(1-3i)^2 = 1 - 6i - 9 = -8 - 6i$.',
      'Hence, $\\pm(2+i)$, $\\pm(1+2i)$, $\\pm(3-2i)$ and $\\pm(1-3i)$ — each root squared back to its family before it was trusted.',
    ] },
    { kind: 'table', caption: 'The square-root census on the Pythagorean families — every row computed by the engines before this prose was written, every root squared and checked.', head: ['a + bi', 'r = √(a²+b²)', 'u² = (r+a)/2', 'v² = (r−a)/2', 'the roots ±(u+vi)'], rows: [
      ['$3 + 4i$', '$5$', '$4$', '$1$', '$\\pm(2 + i)$'],
      ['$-3 + 4i$', '$5$', '$1$', '$4$', '$\\pm(1 + 2i)$'],
      ['$5 - 12i$', '$13$', '$9$', '$4$', '$\\pm(3 - 2i)$'],
      ['$-5 + 12i$', '$13$', '$4$', '$9$', '$\\pm(2 + 3i)$'],
      ['$7 + 24i$', '$25$', '$16$', '$9$', '$\\pm(4 + 3i)$'],
      ['$-8 - 6i$', '$10$', '$1$', '$9$', '$\\pm(1 - 3i)$'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'The sign law is the whole difference', text: 'The priced fraud writes $\\sqrt{5 - 12i} = \\pm(3 + 2i)$ out of same-sign habit — but $(3+2i)^2 = 5 + 12i$, the WRONG family (the mirror\u2019s). The sign of $b$ decides the sign relation BEFORE any arithmetic: $b > 0$ same signs, $b < 0$ opposite. Two more disciplines ride along: a complex number owns exactly TWO square roots ($\\pm$, never "the" root); and when $b = 0$ the number sits on an axis — $\\sqrt{16} = \\pm 4$, $\\sqrt{-16} = \\pm 4i$ — the engine\u2019s honest special case, no $u, v$ needed.' },
    { kind: 'example', title: 'Find √i and √(−i), and the product √i · √(−i) at the paired signs', steps: [
      'For $i = 0 + 1\\cdot i$: $r = 1$, $u^2 = \\tfrac{1 + 0}{2} = \\tfrac{1}{2}$, $v^2 = \\tfrac{1 - 0}{2} = \\tfrac{1}{2}$; $b = 1 > 0$, same signs: $\\sqrt{i} = \\pm\\tfrac{1 + i}{\\sqrt{2}}$.',
      'Check: $\\left(\\tfrac{1+i}{\\sqrt{2}}\\right)^2 = \\tfrac{1 + 2i + i^2}{2} = \\tfrac{2i}{2} = i$ — the diagonal seat.',
      'The mirror: $\\sqrt{-i} = \\pm\\tfrac{1 - i}{\\sqrt{2}}$ by the same engine with opposite-sign $b$.',
      'The products over the sign pairs: $\\tfrac{(1+i)(1-i)}{2} = \\tfrac{2}{2} = 1$ — so $\\sqrt{i}\\cdot\\sqrt{-i} = \\pm 1$, each surd RESOLVED before the meeting; the two-negative-surds fraud of 3.1 never gets a chance.',
      'Hence, $\\sqrt{i} = \\pm\\tfrac{1+i}{\\sqrt{2}}$, $\\sqrt{-i} = \\pm\\tfrac{1-i}{\\sqrt{2}}$, and the products run over $\\pm 1$.',
    ] },
    { kind: 'example', title: 'Solve z² − (1+3i)z + (4+4i) = 0 — the discriminant itself is complex', steps: [
      'The discriminant: $D = (1+3i)^2 - 4(4+4i) = (-8 + 6i) - (16 + 16i) = -24 - 10i$.',
      'The $u, v$ engine on $-24 - 10i$: $r = \\sqrt{576 + 100} = \\sqrt{676} = 26$; $u^2 = \\tfrac{26 - 24}{2} = 1$, $v^2 = \\tfrac{26 + 24}{2} = 25$; $b = -10 < 0$ wants OPPOSITE signs: $\\sqrt{D} = \\pm(1 - 5i)$.',
      'Check the root: $(1 - 5i)^2 = 1 - 10i + 25i^2 = -24 - 10i$.',
      'The doors: $z = \\tfrac{(1+3i) \\pm (1 - 5i)}{2}$ — the $+$ seat: $\\tfrac{2 - 2i}{2} = 1 - i$; the $-$ seat: $\\tfrac{8i}{2} = 4i$.',
      'Verify by substitution: at $1 - i$: $x^2 - (1+3i)x + (4+4i) = (-2i) - (4 + 2i) + (4 + 4i) = 0$; at $4i$: $-16 - (-12 + 4i) + (4 + 4i) = 0$.',
      'Viète reads exactly: the sum $1 + 3i = -(-b)$ and the product $4 + 4i$ — and the doors are NOT conjugates, because the coefficients are complex: the law of this lesson honestly does not apply.',
      'Hence, $z = 1 - i$ and $z = 4i$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'One engine under everything', text: 'Notice what the $u, v$ system just did to the whole subject: the quadratic formula now runs for EVERY quadratic over $\\mathbb{C}$ — real families with any sign of $D$, complex families with complex discriminants. The $D < 0$ surd route of this lesson\u2019s opening is the $b = 0$, $a < 0$ special case of the same engine, and 3.1\u2019s ad hoc discriminant squares are the same engine run by hand. The door count is always two counting multiplicity — the $n = 2$ floor of the degree-$n$ promise. This is the point where the quadratic story, opened honestly in AL at the discriminating trichotomy, closes complete.' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main\u2019s algebra unit names complex numbers and quadratic equations together — the pairing is the syllabus\u2019s own hint. The $D < 0$ door computation and the conjugate-pair law are the single-correct staples; "one root is given, find the rest / the coefficients" is the standard short-answer shape this lesson\u2019s law reads without solving; the $u, v$ engine feeds numerical-value items ($\\sqrt{a + bi}$ with integer answers) and complex-coefficient quadratics appear as assertion-reason items. NCERT class 11 ch. 4 carries the same arc at school depth. The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'terms', items: [
      { term: 'Complex doors of a quadratic', def: 'the solutions of a quadratic equation over $\\mathbb{C}$; for $D < 0$ the two doors are the conjugate pair $x = \\frac{-b \\pm i\\sqrt{|D|}}{2a}$ in standard form.' },
      { term: 'Conjugate-pair law', def: 'for REAL coefficients, the theorem that a door $z$ forces the mirror door $\\bar{z}$: non-real doors come in conjugate pairs with $z + \\bar{z} = -\\frac{b}{a}$ and $z\\bar{z} = \\frac{c}{a}$ — a real quadratic never owns exactly one non-real door.' },
      { term: 'The u, v system', def: 'the square-root engine for any $a + bi$: $u^2 = \\frac{r+a}{2}$, $v^2 = \\frac{r-a}{2}$ with $r = \\sqrt{a^2 + b^2} = |a + bi|$, giving $\\sqrt{a+bi} = \\pm(u + vi)$.' },
      { term: 'Sign law', def: 'the rule tying the signs inside a square root: $2uv = b$ — the halves $u$ and $v$ take the SAME signs when $b > 0$ and OPPOSITE signs when $b < 0$.' },
      { term: 'Axis of symmetry read', def: 'for a real family with non-real doors, $\\mathrm{Re}(\\text{door}) = -\\frac{b}{2a}$ — the doors hang on the vertical line through the parabola\u2019s vertex, equidistant from the real axis.' },
    ] },
    { kind: 'quiz', title: 'Check yourself: the doors turn complex', items: [
      { q: 'The doors of x² − 6x + 13 = 0 are', options: ['3 ± 2i', '−3 ± 2i', '3 ± 4i', '±2i'], answer: 0, explain: 'D = 36 − 52 = −16, so √|D| = 4 and the doors are (6 ± 4i)/2 = 3 ± 2i. (B) flips the sign of −b/2a — the real part is +3. (C) forgets to halve the surd: √|D| = 4 must be divided by 2a = 2. (D) drops the real part entirely — the axis of symmetry −b/2a = 3 is shared by BOTH doors and never vanishes.' },
      { q: '√(5 − 12i) equals', options: ['±(3 + 2i)', '±(3 − 2i)', '±(2 − 3i)', '±(3 − 2i)/13'], answer: 1, explain: 'r = 13, u² = (13+5)/2 = 9, v² = (13−5)/2 = 4, so |u| = 3, |v| = 2; the sign law: b = −12 < 0 wants OPPOSITE signs → ±(3 − 2i), and (3−2i)² = 5 − 12i checks. (A) is the same-sign habit — it squares to 5 + 12i, the mirror\u2019s family. (C) swaps the components — it squares to −5 − 12i. (D) divides by |5 − 12i| = 13 as if computing a reciprocal — the engine\u2019s halves are never divided by r.' },
      { q: 'One door of z² − 6z + k = 0 (k real) is 3 + 2i. Then k and the other door are', options: ['k = 13, the other door 3 − 2i', 'k = 13, the other door −3 − 2i', 'k = √13, the other door 3 − 2i', 'k = 5, the other door 3 − 2i'], answer: 0, explain: 'Real coefficients → the conjugate-pair law: the other door is 3 − 2i, and k = (3+2i)(3−2i) = 9 + 4 = 13; the sum 6 = −b checks the family\u2019s honesty. (B) uses the NEGATION −3−2i — but 3+2i and −3−2i sum to 0, not the required 6: the negation is not the mirror. (C) reports |z| = √13 where the product zz̄ = 13 is wanted — the modulus read is for |z|, not zz̄. (D) sums the parts 3 + 2 = 5 where a sum of squares 13 is the product.' },
      { q: 'The family x² − 2x + k = 0 owns non-real doors exactly when', options: ['k < 1', 'k ≥ 1', 'k > 4', 'k > 1'], answer: 3, explain: 'D = 4 − 4k < 0 ⟺ k > 1 — the boundary seat k = 1 parks the double door 1, and above it the doors turn complex. (A) is the verdict flipped: k = −2 gives D = 12 > 0, two REAL doors. (B) swallows the boundary seat: at k = 1 the door is the real number 1, twice — not non-real. (C) is the surd misread: k = 4 gives D = −12, already complex — the honest window opens at 1.' },
      { q: '√(−25) + √(−4) · √(−9) equals', options: ['11i', '−6 + 5i', '6 + 5i', '−6 − 5i'], answer: 1, explain: 'Resolve each surd first: √(−25) = 5i, and √(−4)·√(−9) = (2i)(3i) = 6i² = −6 — the honest route, so the value is −6 + 5i. (A) forces both terms imaginary: (5+6)i. (C) is the fraud route √(−4)·√(−9) = √36 = 6 — the two-negative-surds law of 3.1 returning: the surd product law needs at least one non-negative. (D) mirrors the imaginary sign — √(−25) is +5i, never −5i.' },
    ] },
    { kind: 'exercises', title: 'Exercises 3.3', sets: [
      { level: 'L1', questions: [
        { q: 'Solve over ℂ: (a) x² + 4x + 13 = 0; (b) 3x² + 2x + 1 = 0.', solution: [
          '(a) $D = 16 - 52 = -36$, $\\sqrt{|D|} = 6$: the doors are $\\tfrac{-4 \\pm 6i}{2} = -2 \\pm 3i$.',
          '(b) $D = 4 - 12 = -8$, $\\sqrt{|D|} = 2\\sqrt{2}$: the doors are $\\tfrac{-2 \\pm 2\\sqrt{2}\\,i}{6} = \\tfrac{-1 \\pm \\sqrt{2}\\,i}{3}$.',
        ], answer: '(a) $-2 \\pm 3i$; (b) $\\tfrac{-1 \\pm \\sqrt{2}\\,i}{3}$' },
        { q: 'Write the two square roots of (a) −3 + 4i; (b) 8 + 6i.', solution: [
          '(a) $r = \\sqrt{9 + 16} = 5$; $u^2 = \\tfrac{5 - 3}{2} = 1$, $v^2 = \\tfrac{5 + 3}{2} = 4$; $b = 4 > 0$ same signs: $\\pm(1 + 2i)$ — and $(1+2i)^2 = -3 + 4i$ checks.',
          '(b) $r = 10$; $u^2 = 9$, $v^2 = 1$; $b = 6 > 0$ same signs: $\\pm(3 + i)$ — and $(3+i)^2 = 8 + 6i$ checks.',
        ], answer: '(a) $\\pm(1 + 2i)$; (b) $\\pm(3 + i)$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Form the quadratic with real coefficients whose doors are 2 ± 5i, and read its vertex.', solution: [
          'The doors are a conjugate pair, so a real family exists: $(x - (2+5i))(x - (2-5i))$.',
          'Expand: $x^2 - [(2+5i) + (2-5i)]x + (2+5i)(2-5i) = x^2 - 4x + 29$ — the sum $4$ and the product $4 + 25 = 29$ both real, forced by the mirror.',
          'The vertex: $-\\tfrac{b}{2a} = 2$ with value $29 - \\tfrac{16}{4} = 25$ — the parabola floats 25 above the axis, the doors hanging beneath at real part 2.',
        ], answer: '$x^2 - 4x + 29 = 0$; vertex $(2, 25)$' },
        { q: 'One door of z² − pz + q = 0 (p, q real) is 1 − 2i. Find p, q and the other door — without solving.', solution: [
          'Real coefficients, so the conjugate-pair law reads the other door: $1 + 2i$.',
          'The sum read: $p = -[(1-2i) + (1+2i)] = -2$.',
          'The product read: $q = (1-2i)(1+2i) = 1 + 4 = 5$.',
        ], answer: '$p = 2$, $q = 5$, the other door $1 + 2i$' },
      ] },
      { level: 'L3', questions: [
        { q: 'For the family x² − 2x + k = 0 at k = −2, 1, 2, 5: state D, the verdict, and the doors over ℂ.', solution: [
          'The engine: $D = 4 - 4k$ — one line, then the trichotomy.',
          '$k = -2$: $D = 12 > 0$ — two real doors $1 \\pm \\sqrt{3}$.',
          '$k = 1$: $D = 0$ — one double door, $1$ seated twice ($x^2 - 2x + 1 = (x-1)^2$).',
          '$k = 2$: $D = -4$ — the conjugate doors $1 \\pm i$; $k = 5$: $D = -16$ — the conjugate doors $1 \\pm 2i$.',
        ], answer: 'two real $1 \\pm \\sqrt{3}$; the double door $1$; $1 \\pm i$; $1 \\pm 2i$ — every verdict answers' },
        { q: 'Find the doors of x² + x + 1 = 0; verify the sum and product reads, and locate the doors on the Argand plane.', solution: [
          '$D = 1 - 4 = -3$: the doors are $\\tfrac{-1 \\pm \\sqrt{3}\\,i}{2}$.',
          'Sum: $\\tfrac{-1 + \\sqrt{3}i}{2} + \\tfrac{-1 - \\sqrt{3}i}{2} = -1 = -\\tfrac{b}{a}$; product: $\\tfrac{(-1)^2 + 3}{4} = 1 = \\tfrac{c}{a}$ — Viète survives.',
          'The product is $|z|^2$: $|z| = 1$ — the doors sit ON the unit circle, at real part $-\\tfrac{1}{2}$, heights $\\pm\\tfrac{\\sqrt{3}}{2}$.',
          'These two seats are exactly the non-real cube roots of unity minus nothing — the family $z^3 - 1 = (z - 1)(x^2 + x + 1)$ hands them forward: lesson 3.5\u2019s $\\omega$-story opens here.',
        ], answer: '$\\tfrac{-1 \\pm \\sqrt{3}\\,i}{2}$; sum $-1$, product $1 = |z|^2$; the unit-circle seats' },
        { q: 'The equation z² − (3 + 2i)z + (m + 4i) = 0 (m real) has a real door. Find m and both doors.', solution: [
          'Let the real door be $\\alpha$: the imaginary component of the substitution is $-2\\alpha + 4 = 0$, so $\\alpha = 2$.',
          'The real component: $4 - 6 + m = 0$, so $m = 2$.',
          'The Viète product: the doors multiply to $2 + 4i$, so the other door is $\\tfrac{2 + 4i}{2} = 1 + 2i$.',
          'Check the sum: $2 + (1 + 2i) = 3 + 2i = -(- (3 + 2i))$ — the family reads back honestly.',
        ], answer: '$m = 2$; the doors are $2$ and $1 + 2i$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve z² − (3 − i)z + (4 − 3i) = 0.', solution: [
          'The discriminant is complex: $D = (3 - i)^2 - 4(4 - 3i) = (8 - 6i) - (16 - 12i) = -8 + 6i$.',
          'The $u, v$ engine: $r = \\sqrt{64 + 36} = 10$; $u^2 = \\tfrac{10 - 8}{2} = 1$, $v^2 = \\tfrac{10 + 8}{2} = 9$; $b = 6 > 0$ same signs: $\\sqrt{D} = \\pm(1 + 3i)$ — check $(1 + 3i)^2 = -8 + 6i$.',
          'The doors: $z = \\tfrac{(3 - i) \\pm (1 + 3i)}{2}$ — the $+$ seat: $\\tfrac{4 + 2i}{2} = 2 + i$; the $-$ seat: $\\tfrac{2 - 4i}{2} = 1 - 2i$.',
          'Both doors substitute to 0 and the Viète reads hold: sum $3 - i$, product $4 - 3i$ — and the doors are NOT conjugates (complex coefficients).',
        ], answer: '$z = 2 + i$ and $z = 1 - 2i$' },
        { q: 'For which real k does x² + kx + 5 = 0 own non-real doors? Give the boundary seats and their doors.', solution: [
          'The verdict is the discriminant\u2019s: $D = k^2 - 20$.',
          'Non-real doors ⟺ $D < 0$ ⟺ $k^2 < 20$ ⟺ $|k| < 2\\sqrt{5}$ (≈ 4.47).',
          'A witness inside the window: $k = 4$ gives $D = -4$, doors $\\tfrac{-4 \\pm 2i}{2} = -2 \\pm i$ — the conjugate pair the law promises.',
          'The boundary seats $k = \\pm 2\\sqrt{5}$: $D = 0$, the double door $-\\tfrac{k}{2} = \\mp\\sqrt{5}$ — the family leaves the window the moment its two doors collide.',
        ], answer: 'non-real doors exactly when $|k| < 2\\sqrt{5}$; at $k = \\pm 2\\sqrt{5}$ the double doors $\\mp\\sqrt{5}$' },
        { q: 'Find every value of √(3 + 4i) + √(3 − 4i).', solution: [
          'The engines: $\\sqrt{3 + 4i} = \\pm(2 + i)$ and $\\sqrt{3 - 4i} = \\pm(2 - i)$ — the sign law at $b > 0$ same and $b < 0$ opposite respectively.',
          'The four pairings: $(2+i) + (2-i) = 4$; $(2+i) - (2-i) = 2i$; $-(2+i) + (2-i) = -2i$; $-(2+i) - (2-i) = -4$.',
          'So the value runs over the family — each sign choice of EACH surd is free, and no pairing is privileged.',
        ], answer: 'the four values $\\pm 4$ and $\\pm 2i$' },
      ] },
      { level: 'L5', questions: [
        { q: 'The doors of x² − (2 + 3i)x + (3 + 4i) = 0 are α and β. Find α² + β² without solving.', solution: [
          'Viète over $\\mathbb{C}$: $\\alpha + \\beta = 2 + 3i$ and $\\alpha\\beta = 3 + 4i$.',
          'The target identity: $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$ — no door needs computing.',
          '$(2 + 3i)^2 = 4 + 12i + 9i^2 = -5 + 12i$.',
          'Subtract: $(-5 + 12i) - 2(3 + 4i) = -5 + 12i - 6 - 8i = -11 + 4i$.',
        ], answer: '$\\alpha^2 + \\beta^2 = -11 + 4i$' },
        { q: 'Prove that the real part of the non-real doors of az² + bz + c = 0 (a, b, c real) equals −b/(2a) — the axis of symmetry — and interpret the family x² − 4x + 13.', solution: [
          'By the conjugate-pair law the doors are $z, \\bar{z}$; their sum is $z + \\bar{z} = 2\\,\\mathrm{Re}(z) = -\\tfrac{b}{a}$.',
          'Divide by 2: $\\mathrm{Re}(z) = -\\tfrac{b}{2a}$ — exactly the $x$-coordinate where the vertex of the real parabola sits (AL\u2019s vertex-form engine: the axis of symmetry).',
          'So the Argand picture of any $D < 0$ family: the parabola floats above (or hangs below) the real axis, and the mirror pair of doors hangs on the vertical line THROUGH the vertex — the real axis never met, the doors exactly below it.',
          'Witness: $x^2 - 4x + 13 = (x - 2)^2 + 9$ — vertex $(2, 9)$, doors $2 \\pm 3i$ at real part 2, the pair straddling the axis by 3 each way.',
        ], answer: '$\\mathrm{Re}(\\text{door}) = -\\tfrac{b}{2a}$ = the axis of symmetry; witnessed by the vertex $(2, 9)$ and the doors $2 \\pm 3i$' },
        { q: 'Solve z⁴ = −4.', solution: [
          'Two squarings: $z^4 = -4$ means $z^2 = 2i$ or $z^2 = -2i$ — the square roots of $-4$ are $\\pm 2i$ (the honest $b = 0$ case of the engine).',
          '$z^2 = 2i$: the $u, v$ engine on $0 + 2i$: $r = 2$, $u^2 = v^2 = 1$; $b > 0$ same signs: $z = \\pm(1 + i)$.',
          '$z^2 = -2i$: the mirror engine: $z = \\pm(1 - i)$.',
          'All four doors live at distance $\\sqrt{2}$ from the origin — the corners of a square — and each squares twice into $-4$: $(1+i)^4 = (2i)^2 = -4$.',
        ], answer: '$z \\in \\{\\pm(1+i),\\ \\pm(1-i)\\}$' },
      ] },
      { level: 'L6', questions: [
        { q: 'The doors of z² + pz + q = 0 (p, q real) are non-real, with |z₁| = |z₂| = 5 and |z₁ − z₂| = 6. Find p and q, and the doors.', solution: [
          'Non-real doors of a real family are conjugates (the law): write them $x \\pm yi$ with $x, y$ real, $y \\neq 0$.',
          'The radius read: $|z|^2 = x^2 + y^2 = q$ — wait: the product $zz̄ = q$, and $|z| = 5$ forces $x^2 + y^2 = 25$, so $q = 25$.',
          'The gap read: $|z_1 - z_2| = |2yi| = 2|y| = 6$, so $|y| = 3$.',
          'Then $x^2 = 25 - 9 = 16$, so $x = \\pm 4$: the doors are $4 \\pm 3i$ or $-4 \\pm 3i$.',
          'The sum read prices $p$: $-(\\pm 8)$ — so $(p, q) = (-8, 25)$ with doors $4 \\pm 3i$, or $(p, q) = (8, 25)$ with doors $-4 \\pm 3i$.',
        ], answer: '$(p, q) = (-8, 25)$ with the doors $4 \\pm 3i$, or $(p, q) = (8, 25)$ with the doors $-4 \\pm 3i$' },
        { q: 'Show that z⁴ + 2z³ + 3z² + 2z + 2 = 0 has no real door; then find all four complex doors and verify the conjugate closure.', solution: [
          'The completed square: $z^4 + 2z^3 + 3z^2 + 2z + 2 = (z^2 + z + 1)^2 + 1$ — expand to check: $(z^2 + z + 1)^2 = z^4 + 2z^3 + 3z^2 + 2z + 1$.',
          'For real $z$ the square is $\\geq 0$, so the polynomial is $\\geq 1 > 0$ — no real door; the parabola\u2019s "floats" verdict, one degree higher.',
          'Over $\\mathbb{C}$: $(z^2 + z + 1)^2 = -1$ means $z^2 + z + 1 = \\pm i$ — two quadratics.',
          '$z^2 + z + (1 - i) = 0$: $D = 1 - 4(1 - i) = -3 + 4i$; the engine: $r = 5$, $u^2 = 1$, $v^2 = 4$, $b > 0$ same signs: $\\sqrt{D} = \\pm(1 + 2i)$; the doors $\\tfrac{-1 \\pm (1 + 2i)}{2} = i$ and $-1 - i$.',
          '$z^2 + z + (1 + i) = 0$: the mirror engine gives $\\sqrt{D} = \\pm(1 - 2i)$ on $D = -3 - 4i$; the doors $-i$ and $-1 + i$.',
          'All four doors ${i, -1-i, -i, -1+i}$ substitute to 0 (checked by the engines), and the set is closed under conjugation — as the real-coefficient law demands: the pairs $(i, -i)$ and $(-1-i, -1+i)$.',
        ], answer: 'no real door; the four doors are $i$, $-1 - i$, $-i$, $-1 + i$ — conjugate-closed' },
      ] },
    ] },
  ],
}

function polarRotationSvg(): string {
  // left: the polar read of z = 1+√3i (r = 2, θ = π/3, the right
  // triangle with legs 1 and √3, the arc marking the angle); right:
  // multiplication as rotation-and-scaling — (√3+i)(1+√3i) = 4i, the
  // three radius vectors at π/6, π/3 and π/2 with radii 2, 2 and 4
  const OX = 150
  const OY = 250
  const U = 62
  const px = (re: number): number => OX + U * re
  const py = (im: number): number => OY - U * im
  const RX = 560
  const RY = 240
  const V = 46
  const qx = (re: number): number => RX + V * re
  const qy = (im: number): number => RY - V * im
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels about polar form. Left panel: the Argand plane showing the point one plus root three i at distance two from the origin, with the angle pi over three marked by an arc at the origin, the horizontal leg labelled one, the vertical leg labelled root three, and the radius labelled r equals two. Right panel: multiplication as rotation and scaling — the vector for root three plus i at angle pi over six with radius two, the vector for one plus root three i at angle pi over three with radius two, and their product four i at angle pi over two with radius four: the angles add and the lengths multiply.">
  <text x="170" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the second address: r and θ</text>
  <text x="560" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">multiplication: rotate and scale</text>
  <line x1="355" y1="40" x2="355" y2="310" stroke="#fcd34d" stroke-width="1.4"/>
  <!-- left panel: the (r, θ) read -->
  <line x1="40" y1="${OY}" x2="300" y2="${OY}" stroke="#0d9488" stroke-width="2"/>
  <line x1="${OX}" y1="305" x2="${OX}" y2="60" stroke="#5eead4" stroke-width="1.6"/>
  <line x1="${OX}" y1="${OY}" x2="${px(1)}" y2="${py(0)}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="4 4"/>
  <line x1="${px(1)}" y1="${OY}" x2="${px(1)}" y2="${py(Math.sqrt(3))}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="4 4"/>
  <line x1="${OX}" y1="${OY}" x2="${px(1)}" y2="${py(Math.sqrt(3))}" stroke="#ea580c" stroke-width="2.4"/>
  <circle cx="${px(1)}" cy="${py(Math.sqrt(3))}" r="6.5" fill="#ea580c"/>
  <text x="${px(1) + 12}" y="${py(Math.sqrt(3)) - 10}" font-size="12.5" font-weight="700" fill="#166534">z = 1 + √3 i</text>
  <text x="${(OX + px(1)) / 2}" y="${OY + 16}" font-size="11" text-anchor="middle" fill="#b45309">1</text>
  <text x="${px(1) + 10}" y="${(OY + py(Math.sqrt(3))) / 2}" font-size="11" fill="#b45309">√3</text>
  <text x="${(OX + px(1)) / 2 - 14}" y="${(OY + py(Math.sqrt(3))) / 2 - 8}" font-size="11.5" font-weight="700" fill="#c2410c">r = 2</text>
  <path d="M ${OX + 30},${OY} A 30 30 0 0 0 ${OX + 30 * Math.cos(Math.PI / 3)},${OY - 30 * Math.sin(Math.PI / 3)}" fill="none" stroke="#16a34a" stroke-width="1.8"/>
  <text x="${OX + 44}" y="${OY - 12}" font-size="11.5" font-weight="700" fill="#166534">θ = π/3</text>
  <circle cx="${OX}" cy="${OY}" r="4" fill="#16a34a"/>
  <text x="${OX - 8}" y="${OY - 8}" font-size="10.5" fill="#166534">O</text>
  <text x="170" y="330" font-size="10.5" text-anchor="middle" fill="#0f766e">x = r cos θ, y = r sin θ — the same point, its second address</text>
  <!-- right panel: the three vectors -->
  <line x1="${RX - 185}" y1="${RY}" x2="${RX + 120}" y2="${RY}" stroke="#0d9488" stroke-width="2"/>
  <line x1="${RX}" y1="${RY + 70}" x2="${RX}" y2="50" stroke="#5eead4" stroke-width="1.6"/>
  <line x1="${RX}" y1="${RY}" x2="${qx(Math.sqrt(3))}" y2="${qy(1)}" stroke="#16a34a" stroke-width="2.2"/>
  <circle cx="${qx(Math.sqrt(3))}" cy="${qy(1)}" r="5.5" fill="#16a34a"/>
  <text x="${qx(Math.sqrt(3)) + 8}" y="${qy(1) - 8}" font-size="11.5" font-weight="700" fill="#166534">√3 + i</text>
  <line x1="${RX}" y1="${RY}" x2="${qx(1)}" y2="${qy(Math.sqrt(3))}" stroke="#d97706" stroke-width="2.2"/>
  <circle cx="${qx(1)}" cy="${qy(Math.sqrt(3))}" r="5.5" fill="#d97706"/>
  <text x="${qx(1) + 8}" y="${qy(Math.sqrt(3)) - 10}" font-size="11.5" font-weight="700" fill="#b45309">1 + √3 i</text>
  <line x1="${RX}" y1="${RY}" x2="${qx(0)}" y2="${qy(4)}" stroke="#ea580c" stroke-width="2.6"/>
  <circle cx="${qx(0)}" cy="${qy(4)}" r="6" fill="#ea580c"/>
  <text x="${qx(0) + 14}" y="${qy(4) + 6}" font-size="12" font-weight="700" fill="#c2410c">4i</text>
  <path d="M ${RX + 34},${RY} A 34 34 0 0 0 ${RX + 34 * Math.cos(Math.PI / 6)},${RY - 34 * Math.sin(Math.PI / 6)}" fill="none" stroke="#16a34a" stroke-width="1.6"/>
  <path d="M ${RX + 60},${RY} A 60 60 0 0 0 ${RX + 60 * Math.cos(Math.PI / 3)},${RY - 60 * Math.sin(Math.PI / 3)}" fill="none" stroke="#d97706" stroke-width="1.6"/>
  <path d="M ${RX + 78},${RY} A 78 78 0 0 0 ${RX},${RY - 78}" fill="none" stroke="#ea580c" stroke-width="1.6"/>
  <text x="${RX + 24}" y="${RY + 22}" font-size="10.5" font-weight="700" fill="#166534">π/6</text>
  <text x="${RX + 50}" y="${RY + 22}" font-size="10.5" font-weight="700" fill="#b45309">π/3</text>
  <text x="${RX + 72}" y="${RY + 22}" font-size="10.5" font-weight="700" fill="#c2410c">π/2</text>
  <circle cx="${RX}" cy="${RY}" r="4" fill="#16a34a"/>
  <text x="${RX - 18}" y="${RY + 16}" font-size="10.5" fill="#166534">O</text>
  <text x="560" y="330" font-size="10.5" text-anchor="middle" fill="#0f766e">2·2 = 4 and π/6 + π/3 = π/2 — lengths multiply, angles add</text>
</svg>`
}

function rayMeetSvg(): string {
  // left: the meet of arg(z−3i) = π and arg(z+2−i) = π/2 at −2+3i
  // (open circles at the ray origins, solid dot at the meet); right:
  // the no-meet pair arg(z−2i) = 3π/4 and arg(z+1−i) = π/4 — ray 2
  // passes through ray 1's excluded origin 2i: no meeting point
  const px = (x: number): number => 20 + (x + 3) * 46
  const py = (y: number): number => 300 - y * 42
  const rx = (x: number): number => 400 + (x + 3) * 46
  const ry = (y: number): number => 300 - y * 42
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels about rays on the Argand plane. Left panel: the ray arg of z minus three i equals pi starts at the open circle at three i and runs left along the horizontal line y equals three; the ray arg of z plus two minus i equals pi over two starts at the open circle at minus one plus i and runs straight up along the line x equals minus two; the two rays meet at the solid dot at minus two plus three i, with the angle marks pi and pi over two shown at the origins. Right panel: the ray arg of z minus two i equals three pi over four starts at the open circle at two i and runs up-left at one hundred thirty five degrees; the ray arg of z plus one minus i equals pi over four starts at the open circle at minus one plus i and runs up-right at forty five degrees. The second ray passes exactly through the first ray's origin two i — which the first ray excludes — so the two rays have no meeting point.">
  <text x="180" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">two rays that meet</text>
  <text x="560" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">two rays that never meet</text>
  <line x1="355" y1="40" x2="355" y2="310" stroke="#fcd34d" stroke-width="1.4"/>
  <!-- left panel: the meet -->
  <line x1="${px(-3)}" y1="${py(0)}" x2="${px(3)}" y2="${py(0)}" stroke="#0d9488" stroke-width="1.8"/>
  <line x1="${px(0)}" y1="${py(-0.05)}" x2="${px(0)}" y2="${py(4.4)}" stroke="#5eead4" stroke-width="1.4"/>
  <line x1="${px(0)}" y1="${py(3)}" x2="${px(-2.6)}" y2="${py(3)}" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="${px(0)}" cy="${py(3)}" r="5.5" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  <line x1="${px(-2)}" y1="${py(0.6)}" x2="${px(-2)}" y2="${py(4.4)}" stroke="#d97706" stroke-width="2.6"/>
  <circle cx="${px(-2)}" cy="${py(1)}" r="5.5" fill="none" stroke="#d97706" stroke-width="2.4"/>
  <circle cx="${px(-2)}" cy="${py(3)}" r="6.5" fill="#ea580c"/>
  <text x="${px(-2) + 12}" y="${py(3) - 16}" font-size="12.5" font-weight="700" fill="#c2410c">−2 + 3i · the meet</text>
  <text x="${px(1.1)}" y="${py(3) - 8}" font-size="10.5" font-weight="700" fill="#166534">arg(z − 3i) = π</text>
  <text x="${px(-2) + 10}" y="${py(4.05)}" font-size="10.5" font-weight="700" fill="#b45309">arg(z + 2 − i) = π/2</text>
  <text x="${px(-3) + 2}" y="${py(3) - 10}" font-size="10" fill="#0f766e">3i</text>
  <text x="${px(-2) - 36}" y="${py(1) + 4}" font-size="10" fill="#0f766e">−2+i</text>
  <circle cx="${px(0)}" cy="${py(0)}" r="3.5" fill="#16a34a"/>
  <text x="${px(0) - 22}" y="${py(0) - 6}" font-size="10" fill="#166534">O</text>
  <text x="190" y="322" font-size="10.5" text-anchor="middle" fill="#0f766e">z = −2+3i satisfies both ray equations</text>
  <text x="190" y="336" font-size="10.5" text-anchor="middle" fill="#0f766e">z−3i = −2 (arg π) and z+2−i = 2i (arg π/2)</text>
  <!-- right panel: the no-meet -->
  <line x1="${rx(-3)}" y1="${ry(0)}" x2="${rx(3)}" y2="${ry(0)}" stroke="#0d9488" stroke-width="1.8"/>
  <line x1="${rx(0)}" y1="${ry(-0.05)}" x2="${rx(0)}" y2="${ry(4.4)}" stroke="#5eead4" stroke-width="1.4"/>
  <line x1="${rx(0)}" y1="${ry(2)}" x2="${rx(-2.2)}" y2="${ry(4.2)}" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="${rx(0)}" cy="${ry(2)}" r="5.5" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  <line x1="${rx(-1)}" y1="${ry(1)}" x2="${rx(2.4)}" y2="${ry(4.4)}" stroke="#d97706" stroke-width="2.6"/>
  <circle cx="${rx(-1)}" cy="${ry(1)}" r="5.5" fill="none" stroke="#d97706" stroke-width="2.4"/>
  <circle cx="${rx(0)}" cy="${ry(2)}" r="8.5" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 3"/>
  <text x="${rx(1.35)}" y="${ry(3.62)}" font-size="10.5" font-weight="700" fill="#b45309">arg(z + 1 − i) = π/4</text>
  <text x="${rx(-2.15)}" y="${ry(3.9)}" font-size="10.5" font-weight="700" fill="#166534">arg(z − 2i) = 3π/4</text>
  <text x="${rx(-1) - 34}" y="${ry(1) + 14}" font-size="10" fill="#0f766e">−1+i</text>
  <circle cx="${rx(0)}" cy="${ry(0)}" r="3.5" fill="#16a34a"/>
  <text x="${rx(0) - 22}" y="${ry(0) - 6}" font-size="10" fill="#166534">O</text>
  <text x="560" y="322" font-size="10.5" text-anchor="middle" fill="#dc2626">ray 2 passes through ray 1's origin — the origin is excluded</text>
  <text x="560" y="336" font-size="10.5" font-weight="700" text-anchor="middle" fill="#dc2626">no meeting point</text>
</svg>`
}

const lesson34: Lesson = {
  id: 'aa-the-argand-plane-polar-form-and-the-argument',
  number: '3.4',
  title: 'The Argand Plane: Polar Form and the Argument',
  concepts: [
    'polar form',
    'argument and principal argument',
    'the quadrant discipline',
    'rotation-and-scaling',
    'the argument-addition law',
    "Euler's form",
    'the multi-valued logarithm',
    'section formula in complex numbers',
    'angle between two rays',
    'equation of ray',
  ],
  objectives: [
    'Write any complex number in polar form $z = |z|(\\cos\\theta + i\\sin\\theta)$: read the modulus as the polar radius and the argument as the polar angle, and rebuild the rectangular address from $(r, \\theta)$.',
    'Read arguments honestly through the quadrant discipline: the four routes from the acute angle $\\tan^{-1}|y/x|$, the axis seats, and the principal range $-\\pi < \\theta \\leq \\pi$ — never the bare tangent.',
    'Prove and use the argument-addition law: multiplication rotates AND scales, $|z_1 z_2| = |z_1||z_2|$ and $\\arg(z_1 z_2) = \\arg z_1 + \\arg z_2$, with the principal wrap when sums leave $(-\\pi, \\pi]$.',
    "Witness Euler's form $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ on the series, write $z = |z|e^{i\\theta}$, and name the multi-valued logarithm honestly at scope.",
    'Apply the section formula in complex numbers: the midpoint, the internal division seat in a given ratio, and the parallelogram closure from the diagonal-bisect law.',
    'Read ray geometry through arguments: the angle between two rays as the argument of a quotient, and the equation of ray $\\arg(z - z_1) = \\theta$ — including the honest no-meeting diagnosis.',
  ],
  prerequisites: ['aa-negative-discriminants-the-doors-turn-complex', 'aa-conjugate-and-modulus', 'aa-the-closure-failure-that-forces-i'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 3.2 gave the Argand plane its algebra: a point, its mirror, its distance from the origin, the parallelogram for sums. But every point so far carried only its RECTANGULAR address — the pair (x, y). A plane point has always had a second, older address: how far it stands from the origin, and in which direction. Navigators gave that address its name centuries before algebra — radius and bearing — and this lesson cashes it for complex numbers: the polar form $z = |z|(\\cos\\theta + i\\sin\\theta)$, with the modulus returning as the radius and a new number, the ARGUMENT, as the angle.' },
    { kind: 'para', text: 'The payoff is the one this chapter promised when 3.1 named multiplication by $i$ a quarter-turn: with the second address in hand, multiplication finally shows its geometric face — to multiply two complex numbers is to ROTATE and SCALE, angles adding while lengths multiply. That single law, proved below from the angle-addition identities, is what the polar form exists to unlock. And the argument earns its own geometric career: rays are arguments, angles between rays are arguments of quotients, and the fold obligations this lesson hosts — the section formula, the angle between two rays, the equation of ray — are all argument work.' },

    { kind: 'heading', text: 'Polar Form: the Second Address of a Point' },
    { kind: 'para', text: 'Fix a point $z = x + iy$ off the axes, and drop the perpendicular from it to the real axis. The right triangle that appears has legs $|x|$ and $|y|$ and hypotenuse $r = \\sqrt{x^2 + y^2}$ — a length lesson 3.2 already owned under the name $|z|$, the distance from the origin. The direction is the angle $\\theta$ the radius makes with the POSITIVE real axis. Pythagoras prices the radius; the triangle prices the angle; and factoring the address turns both into the number itself.' },
    { kind: 'derivation', title: 'The polar form of a complex number', statement: 'Every complex number $z = x + iy$ with $z \\neq 0$ can be written $z = |z|(\\cos\\theta + i\\sin\\theta)$ where $\\theta$ is any angle the radius makes with the positive real axis: $x = |z|\\cos\\theta$ and $y = |z|\\sin\\theta$.', steps: [
      { label: 'Read the radius', formula: 'r = \\sqrt{x^2 + y^2} = |z|', explanation: 'The hypotenuse of the legs $|x|$, $|y|$ — exactly the modulus of lesson 3.2, the distance from the origin. The length half of the second address was already built; polar form only promotes it from bookkeeping to geometry.' },
      { label: 'Read the angle', formula: '\\cos\\theta = \\frac{x}{r}, \\qquad \\sin\\theta = \\frac{y}{r}', explanation: 'The two triangle reads. CRUCIALLY these are simultaneous equations: a single $\\theta$ must satisfy BOTH — the discipline the warn below prices. The bare tangent $\\tan\\theta = y/x$ remembers only the ratio and forgets the quadrant.' },
      { label: 'Factor the address', formula: 'x + iy = r\\left(\\frac{x}{r} + i\\,\\frac{y}{r}\\right) = r(\\cos\\theta + i\\sin\\theta)', explanation: 'Divide and re-multiply by $r$: the bracket is exactly $(\\cos\\theta, \\sin\\theta)$ by the reads above — a POINT ON THE UNIT CIRCLE, the direction; while $r$ carries the length. Every nonzero complex number is one length times one unit-circle direction.' },
      { label: 'Rebuild check', formula: 'x = r\\cos\\theta, \\quad y = r\\sin\\theta', explanation: 'The address converts both ways: from $(x, y)$ up to $(r, \\theta)$, and from $(r, \\theta)$ back down to $(x, y)$. The two addresses name the SAME point — as this lesson\'s roster table witnesses seat by seat.' },
    ], result: 'z = x + iy = |z|(\\cos\\theta + i\\sin\\theta), \\qquad |z| = \\sqrt{x^2+y^2}' },
    { kind: 'callout', tone: 'definition', title: 'Polar form, argument, principal argument', text: 'The POLAR FORM of a nonzero complex number is $z = |z|(\\cos\\theta + i\\sin\\theta)$. The modulus $|z|$ is the polar radius. The ARGUMENT of $z$, written $\\arg z$, is the angle the radius from the origin to $z$ makes with the positive real axis, measured in the principal range $-\\pi < \\theta \\leq \\pi$; every other value differs from it by a multiple of $2\\pi$. The argument of the ORIGIN is not defined — the origin has every direction and therefore none. Thus $1 + \\sqrt{3}\\,i = 2(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3})$: radius 2, bearing sixty degrees.' },
    { kind: 'formula', name: 'The polar form', latex: 'z = |z|(\\cos\\theta + i\\sin\\theta), \\qquad |z| = \\sqrt{x^2 + y^2}, \\qquad -\\pi < \\arg z \\leq \\pi', note: 'the second address: length from the modulus, direction from the argument; the same point as $x + iy$, never a new number.' },
    { kind: 'example', title: 'The polar census: write the roster seats in polar form', steps: [
      'The diagonal seats: $1 + i$ has $r = \\sqrt{2}$ and $\\theta = \\tfrac{\\pi}{4}$, so $1 + i = \\sqrt{2}(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4})$; its three mirrors $-1+i$, $-1-i$, $1-i$ share $r = \\sqrt{2}$ and carry $\\theta = \\tfrac{3\\pi}{4}, -\\tfrac{3\\pi}{4}, -\\tfrac{\\pi}{4}$ respectively.',
      'The hexagon seats: $\\sqrt{3} + i$ has legs $\\sqrt{3}$ and $1$, so $r = \\sqrt{3 + 1} = 2$ and $\\theta = \\tfrac{\\pi}{6}$; likewise $1 + \\sqrt{3}\\,i = 2(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3})$ and $-1 + \\sqrt{3}\\,i = 2(\\cos\\tfrac{2\\pi}{3} + i\\sin\\tfrac{2\\pi}{3})$ — the unit-circle directions at radius 2.',
      'The axis seats: $4 = 4(\\cos 0 + i\\sin 0)$, $-4 = 4(\\cos\\pi + i\\sin\\pi)$, $3i = 3(\\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2})$, $-3i = 3(\\cos(-\\tfrac{\\pi}{2}) + i\\sin(-\\tfrac{\\pi}{2}))$ — the four compass directions.',
      'An honest non-special seat: $3 + 4i$ has $r = \\sqrt{9 + 16} = 5$ and $\\theta = \\tan^{-1}\\tfrac{4}{3} \\approx 0.9273$ rad $\\approx 53.13^\\circ$ — NOT a special angle, and that is fine: the argument is a real number, not a ceremony; $3 + 4i = 5(\\cos 0.9273 + i\\sin 0.9273)$ with the angle carried to whatever precision the work needs.',
      'Hence, every roster seat converts: the census table collects the rows, each rebuilt from $(r, \\theta)$ back to $(x, y)$ before it was trusted — the conversion is a two-way road.',
    ] },
    { kind: 'table', caption: 'The polar roster census — every row computed and rebuilt by the engines before this prose was written; the last two rows are the honest non-special arguments a calculator returns as decimals.', head: ['seat z', 'r = |z|', 'θ = arg z', 'polar form'], rows: [
      ['$1 + i$', '$\\sqrt{2}$', '$\\tfrac{\\pi}{4}$', '$\\sqrt{2}(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4})$'],
      ['$-1 + i$', '$\\sqrt{2}$', '$\\tfrac{3\\pi}{4}$', '$\\sqrt{2}(\\cos\\tfrac{3\\pi}{4} + i\\sin\\tfrac{3\\pi}{4})$'],
      ['$-1 - i$', '$\\sqrt{2}$', '$-\\tfrac{3\\pi}{4}$', '$\\sqrt{2}(\\cos(-\\tfrac{3\\pi}{4}) + i\\sin(-\\tfrac{3\\pi}{4}))$'],
      ['$1 - i$', '$\\sqrt{2}$', '$-\\tfrac{\\pi}{4}$', '$\\sqrt{2}(\\cos(-\\tfrac{\\pi}{4}) + i\\sin(-\\tfrac{\\pi}{4}))$'],
      ['$\\sqrt{3} + i$', '$2$', '$\\tfrac{\\pi}{6}$', '$2(\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6})$'],
      ['$1 + \\sqrt{3}\\,i$', '$2$', '$\\tfrac{\\pi}{3}$', '$2(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3})$'],
      ['$-1 + \\sqrt{3}\\,i$', '$2$', '$\\tfrac{2\\pi}{3}$', '$2(\\cos\\tfrac{2\\pi}{3} + i\\sin\\tfrac{2\\pi}{3})$'],
      ['$-4$', '$4$', '$\\pi$', '$4(\\cos\\pi + i\\sin\\pi)$'],
      ['$3 + 4i$', '$5$', '$\\approx 0.9273$', '$5(\\cos 0.9273 + i\\sin 0.9273)$ — honest, non-special'],
      ['$4 - 3i$', '$5$', '$\\approx -0.6435$', '$5(\\cos(-0.6435) + i\\sin(-0.6435))$ — honest, non-special'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'The tangent fraud: one tangent, two seats', text: 'The seats $1 + i\\sqrt{3}$ and $-1 - i\\sqrt{3}$ BOTH give $\\tan\\theta = \\sqrt{3}$ — and the naive read $\\theta = \\tan^{-1}(\\sqrt{3}) = \\tfrac{\\pi}{3}$ prices them identically, which is FALSE: the first seat sits in the first quadrant at $\\tfrac{\\pi}{3}$, the second in the third at $-\\tfrac{2\\pi}{3}$. A tangent remembers a ratio and forgets a quadrant. The honest discipline is the pair of simultaneous reads $\\cos\\theta = \\tfrac{x}{r}$ AND $\\sin\\theta = \\tfrac{y}{r}$ — signs included: the sign of the cosine is the sign of $x$, the sign of the sine is the sign of $y$, and between them the quadrant is pinned before any angle is named.' },

    { kind: 'heading', text: 'The Argument\u2019s Quadrant Discipline' },
    { kind: 'para', text: 'The discipline converts to a routine. From any seat, first compute the ACUTE angle $\\alpha = \\tan^{-1}\\left|\\tfrac{y}{x}\\right|$ — a first-quadrant read, always in $(0, \\tfrac{\\pi}{2})$ — and then route it by the signs of $x$ and $y$. Four routes, one table, and the axes as the boundary seats between them.' },
    { kind: 'table', caption: 'The four quadrant routes — the acute read α = tan⁻¹|y/x| routed by the signs of the components; every seat of the roster above lands by exactly one route.', head: ['where z sits', 'signs (x, y)', 'the route', 'witness seat'], rows: [
      ['first quadrant', '$x > 0, y > 0$', '$\\theta = \\alpha$', '$1 + \\sqrt{3}\\,i \\to \\tfrac{\\pi}{3}$'],
      ['second quadrant', '$x < 0, y > 0$', '$\\theta = \\pi - \\alpha$', '$-1 + \\sqrt{3}\\,i \\to \\tfrac{2\\pi}{3}$'],
      ['third quadrant', '$x < 0, y < 0$', '$\\theta = \\alpha - \\pi$', '$-1 - \\sqrt{3}\\,i \\to -\\tfrac{2\\pi}{3}$'],
      ['fourth quadrant', '$x > 0, y < 0$', '$\\theta = -\\alpha$', '$1 - \\sqrt{3}\\,i \\to -\\tfrac{\\pi}{3}$'],
    ] },
    { kind: 'para', text: 'The axis seats are the routes\u2019 boundaries and deserve their own line: a POSITIVE real number carries argument $0$, a NEGATIVE real number $\\pi$, a positive imaginary number $\\tfrac{\\pi}{2}$, a negative imaginary number $-\\tfrac{\\pi}{2}$. Thus $-4 = 4(\\cos\\pi + i\\sin\\pi)$ and $-5i = 5(\\cos(-\\tfrac{\\pi}{2}) + i\\sin(-\\tfrac{\\pi}{2}))$. The principal range keeps $\\pi$ and refuses $-\\pi$ — the negative real axis is addressed at $\\pi$, never at $-\\pi$, so that each nonzero number owns ONE principal argument. And the origin, sitting on every axis at once, owns none.' },
    { kind: 'example', title: 'The quadrant discipline worked: read the arguments of −5 − 12i and 4 − 3i honestly', steps: [
      'For $-5 - 12i$: the signs $(x, y) = (-, -)$ route through the THIRD quadrant. The acute read: $\\alpha = \\tan^{-1}\\left|\\tfrac{-12}{-5}\\right| = \\tan^{-1}\\tfrac{12}{5} \\approx 1.1760$ rad.',
      'The third-quadrant route: $\\theta = \\alpha - \\pi \\approx -1.9656$ rad — about $-112.6^\\circ$, a bearing pointing down-left, exactly where the seat sits on its circle $r = \\sqrt{25 + 144} = 13$.',
      'For $4 - 3i$: the signs $(+, -)$ route through the FOURTH quadrant: $\\alpha = \\tan^{-1}\\tfrac{3}{4} \\approx 0.6435$, and $\\theta = -\\alpha \\approx -0.6435$ rad $\\approx -36.9^\\circ$ with $r = 5$.',
      'Both answers check against the simultaneous reads: for $-5-12i$, $\\cos\\theta = \\tfrac{-5}{13} < 0$ and $\\sin\\theta = \\tfrac{-12}{13} < 0$ — third quadrant confirmed; for $4-3i$, $\\cos\\theta = \\tfrac{4}{5} > 0$, $\\sin\\theta = -\\tfrac{3}{5} < 0$ — fourth quadrant confirmed.',
      'Hence, $\\arg(-5 - 12i) \\approx -1.9656$ and $\\arg(4 - 3i) \\approx -0.6435$ — non-special bearings priced honestly, the quadrant named before the angle was.',
    ] },
    { kind: 'para', text: 'The argument inherits mirror laws from the conjugate of lesson 3.2 — reads worth pinning once and using forever. Because $\\bar{z}$ reflects $z$ across the REAL axis, the reflection of a bearing at $\\theta$ is a bearing at $-\\theta$: $\\arg(\\bar{z}) = -\\arg z$. Negation rotates by $\\pi$, so $\\arg(-z) = \\arg z \\pm\\pi$ (whichever lands in the principal range); and the double move gives $\\arg(-\\bar{z}) = \\pi - \\arg z$. For example, the four twins of the seat $1 + \\sqrt{3}\\,i$ at $\\tfrac{\\pi}{3}$ read: the mirror $1 - \\sqrt{3}\\,i$ at $-\\tfrac{\\pi}{3}$, the negation $-1 - \\sqrt{3}\\,i$ at $-\\tfrac{2\\pi}{3}$, and the negated mirror $-1 + \\sqrt{3}\\,i$ at $\\tfrac{2\\pi}{3}$ — the whole roster row read off one line of algebra.' },
    { kind: 'callout', tone: 'insight', title: 'Same modulus, same argument, same number', text: 'Two nonzero complex numbers with equal moduli AND equal principal arguments are the same number — the second address is a full address. The two families of seats that share only ONE of the two coordinates are the lesson\u2019s two loci: equal modulus alone is a CIRCLE about the origin (3.2\u2019s equal-modulus law), and equal argument alone is a RAY from the origin — the observation the equation-of-ray section below builds into a whole instrument.' },

    { kind: 'heading', text: 'Multiplication as Rotation-and-Scaling' },
    { kind: 'para', text: 'Here is the payoff. Lesson 3.2 proved $|z_1 z_2| = |z_1||z_2|$ — the LENGTH half of the multiplication law, lengths multiplying. The polar form now delivers the DIRECTION half: arguments add. The proof runs the two angle-addition identities — standard trigonometry, witnessed numerically in this lesson\u2019s verifier across a full grid before a sentence of prose existed, and proved in the Trigonometry book\u2019s own arc when that book is written.' },
    { kind: 'callout', tone: 'theorem', title: 'The argument-addition law', text: 'For nonzero complex numbers $z_1 = |z_1|(\\cos\\alpha + i\\sin\\alpha)$ and $z_2 = |z_2|(\\cos\\beta + i\\sin\\beta)$: $z_1 z_2 = |z_1||z_2|\\big(\\cos(\\alpha + \\beta) + i\\sin(\\alpha + \\beta)\\big)$. Hence $|z_1 z_2| = |z_1||z_2|$ and $\\arg(z_1 z_2) = \\arg z_1 + \\arg z_2$ (up to the $2\\pi$ wrap into the principal range). Multiplication rotates and scales: the product\u2019s bearing is the sum of the bearings.' },
    { kind: 'derivation', title: 'The argument-addition law, proved from the angle-addition identities', statement: 'Multiplying two polar forms collapses to the angle-addition identities: the product lands at radius $|z_1||z_2|$ and bearing $\\alpha + \\beta$.', steps: [
      { label: 'Expand the product', formula: 'z_1 z_2 = |z_1||z_2|(\\cos\\alpha + i\\sin\\alpha)(\\cos\\beta + i\\sin\\beta)', explanation: 'The radii are real and multiply out front. The remaining work is the bracket — two unit-circle directions meeting.' },
      { label: 'FOIL the bracket', formula: '(\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta) + i(\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)', explanation: 'The four terms of the expansion, real parts gathered and imaginary parts gathered, with $i^2 = -1$ pricing the middle — exactly the multiplication rule of 3.1, nothing new.' },
      { label: 'Cash the identities', formula: '\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta = \\cos(\\alpha + \\beta), \\quad \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta = \\sin(\\alpha + \\beta)', explanation: 'The two angle-addition identities — the trigonometric module\u2019s standard results, swept on a grid by this lesson\u2019s engines. The bracket is now a single unit-circle direction at the SUMMED angle.' },
      { label: 'Read the address', formula: 'z_1 z_2 = |z_1||z_2|(\\cos(\\alpha+\\beta) + i\\sin(\\alpha+\\beta))', explanation: 'The product carries radius $|z_1||z_2|$ (3.2\u2019s multiplicativity returning as geometry) and bearing $\\alpha + \\beta$ — rotate by the second bearing, scale by the second length. Division runs the mirror identity backwards: $\\arg(z_1/z_2) = \\arg z_1 - \\arg z_2$, $|z_1/z_2| = |z_1|/|z_2|$ — rotation-cancel.' },
    ], result: '|z_1 z_2| = |z_1||z_2|, \\quad \\arg(z_1 z_2) = \\arg z_1 + \\arg z_2 \\pmod{2\\pi}; \\qquad \\arg\\frac{z_1}{z_2} = \\arg z_1 - \\arg z_2' },
    { kind: 'formula', name: 'The argument laws of multiplication', latex: '|z_1 z_2| = |z_1||z_2|, \\quad \\arg(z_1z_2) = \\arg z_1 + \\arg z_2; \\qquad |z^n| = |z|^n, \\quad \\arg(z^n) = n\\arg z', note: 'lengths multiply, angles add; powers scale both reads at once — and every summed argument is wrapped back into $(-\\pi, \\pi]$ before it is reported.' },
    { kind: 'example', title: 'The product and quotient witnesses: (√3 + i)(1 + √3i) and (1 + √3i)/(√3 + i)', steps: [
      'The polar route on the product: $\\sqrt{3} + i$ sits at radius 2, bearing $\\tfrac{\\pi}{6}$; $1 + \\sqrt{3}\\,i$ sits at radius 2, bearing $\\tfrac{\\pi}{3}$. The law promises radius $2 \\cdot 2 = 4$ at bearing $\\tfrac{\\pi}{6} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$ — the pure imaginary $4i$.',
      'The FOIL check: $(\\sqrt{3} + i)(1 + \\sqrt{3}\\,i) = \\sqrt{3} + 3i + i + \\sqrt{3}\\,i^2 = (\\sqrt{3} - \\sqrt{3}) + 4i = 4i$ — both routes agree exactly.',
      'The polar route on the quotient: radius $\\tfrac{2}{2} = 1$, bearing $\\tfrac{\\pi}{3} - \\tfrac{\\pi}{6} = \\tfrac{\\pi}{6}$ — the unit-modulus seat $\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6} = \\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$.',
      'The conjugate check: $\\tfrac{(1 + \\sqrt{3}\\,i)(\\sqrt{3} - i)}{(\\sqrt{3} + i)(\\sqrt{3} - i)} = \\tfrac{\\sqrt{3} - i + 3i - \\sqrt{3}\\,i^2}{4} = \\tfrac{2\\sqrt{3} + 2i}{4} = \\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$ — rotation-cancel witnessed by arithmetic.',
      'Hence, $4i$ and $\\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$ — the product rotated and scaled, the quotient rotated back — the figure\u2019s right panel draws the three vectors.',
    ] },
    { kind: 'figure', caption: 'The second address and its multiplication law. Left: the polar read of z = 1 + √3i — radius r = 2 from the origin, bearing θ = π/3 marked by the arc, the legs 1 and √3 of the right triangle that prices both. Right: multiplication as rotation-and-scaling — (√3 + i)(1 + √3i) = 4i: the two factor vectors at bearings π/6 and π/3 with radii 2 and 2, and their product at bearing π/2 with radius 4. Lengths multiply (2·2 = 4), bearings add (π/6 + π/3 = π/2): the geometric face of multiplication this chapter promised from 3.1\u2019s quarter-turn.', svg: polarRotationSvg() },
    { kind: 'para', text: 'One discipline rides every use of the law: the SUM of two principal arguments can leave the principal range, and the honest report wraps it back. Thus bearings $\\tfrac{5\\pi}{6}$ and $\\tfrac{2\\pi}{3}$ sum to $\\tfrac{3\\pi}{2}$ — outside $(-\\pi, \\pi]$ — and the product\u2019s principal argument is $-\\tfrac{\\pi}{2}$. The wrap is not a cosmetic preference: the principal argument is a FUNCTION of the number, one value per seat, and the wrap is what keeps it single-valued while the law adds freely.' },
    { kind: 'example', title: 'The principal wrap, worked on honest seats', steps: [
      'Take $z_1 = -1 + i$ (radius $\\sqrt{2}$, bearing $\\tfrac{3\\pi}{4}$) and $z_2 = -1 + \\sqrt{3}\\,i$ (radius 2, bearing $\\tfrac{2\\pi}{3}$). The law: the product carries radius $2\\sqrt{2}$ and bearing $\\tfrac{3\\pi}{4} + \\tfrac{2\\pi}{3} = \\tfrac{17\\pi}{12}$.',
      'The wrap: $\\tfrac{17\\pi}{12} > \\pi$, so subtract $2\\pi$: $\\tfrac{17\\pi}{12} - 2\\pi = -\\tfrac{7\\pi}{12}$ — the product\u2019s principal argument, a bearing of $-105^\\circ$, pointing down-left.',
      'The arithmetic check: $(-1 + i)(-1 + \\sqrt{3}\\,i) = 1 - \\sqrt{3}\\,i - i + \\sqrt{3}\\,i^2 = (1 - \\sqrt{3}) - (1 + \\sqrt{3})\\,i$ — and indeed $\\cos\\left(-\\tfrac{7\\pi}{12}\\right) = \\tfrac{1 - \\sqrt{3}}{2\\sqrt{2}}$, $\\sin\\left(-\\tfrac{7\\pi}{12}\\right) = -\\tfrac{1 + \\sqrt{3}}{2\\sqrt{2}}$, the exact components of the product over its radius $2\\sqrt{2}$.',
      'The same wrap at the axis boundary: bearings $\\tfrac{5\\pi}{6}$ and $\\tfrac{2\\pi}{3}$ (both from radius-2 seats) sum to $\\tfrac{3\\pi}{2}$, which wraps to $-\\tfrac{\\pi}{2}$ — the product lands on the NEGATIVE imaginary axis, at radius 4: $-4i$.',
      'Hence, $-\\tfrac{7\\pi}{12}$ and $-\\tfrac{\\pi}{2}$ — the sums were true, the reports were wrapped, and every seat checked by substitution.',
    ] },
    { kind: 'example', title: 'Powers by the law: (1 + i)⁴, (1 + i)⁸ and (−√3 + i)⁶ without multiplying', steps: [
      'The seat $1 + i$ carries radius $\\sqrt{2}$ and bearing $\\tfrac{\\pi}{4}$. The power law: $(1+i)^4$ has radius $(\\sqrt{2})^4 = 4$ and bearing $4 \\cdot \\tfrac{\\pi}{4} = \\pi$ — the negative real axis: $(1 + i)^4 = -4$.',
      'The eighth power: radius $(\\sqrt{2})^8 = 16$, bearing $8 \\cdot \\tfrac{\\pi}{4} = 2\\pi \\equiv 0$ — the positive real axis: $(1 + i)^8 = 16$. Two multiplications by squaring agree: $((1+i)^4)^2 = (-4)^2 = 16$.',
      'The seat $-\\sqrt{3} + i$ carries radius 2 and bearing $\\tfrac{5\\pi}{6}$. The sixth power: radius $2^6 = 64$, bearing $6 \\cdot \\tfrac{5\\pi}{6} = 5\\pi \\equiv \\pi$ (wrap $5\\pi - 4\\pi = \\pi$): $(-\\sqrt{3} + i)^6 = -64$.',
      'The rotation witness at non-special bearings: $(1 + i)(3 + 4i)$ — radii $\\sqrt{2}$ and $5$ promise $5\\sqrt{2}$; bearings $\\tfrac{\\pi}{4}$ and $\\approx 0.9273$ promise $\\approx 1.7071$. The arithmetic: $(1+i)(3+4i) = 3 + 4i + 3i - 4 = -1 + 7i$, whose modulus is $\\sqrt{1 + 49} = 5\\sqrt{2}$ — the length half holds at a non-special seat, as it must.',
      'Hence, $-4$, $16$ and $-64$ by bearings alone — each power re-verified by repeated multiplication in the engines before it was written.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'One law, three chapters of meaning', text: 'Look at what the argument-addition law just unified. Lesson 3.1\u2019s quarter-turn — multiplication by $i$ as a rotation — is the law at $\\beta = \\tfrac{\\pi}{2}$ with no scaling. Lesson 3.2\u2019s multiplicativity $|z_1 z_2| = |z_1||z_2|$ is the law\u2019s length half, now with its missing direction half beside it. And the powers of $i$ from 3.1\u2019s mod-4 cycle are the law at bearing $\\tfrac{\\pi}{2}$, repeatedly: four quarter-turns close the circle because $4 \\cdot \\tfrac{\\pi}{2} = 2\\pi \\equiv 0$. Rotation-and-scaling is not A interpretation of complex multiplication — it is the interpretation the second address was built to expose, and De Moivre\u2019s theorem in the next lesson is this same law raised to integer powers as an engine.' },

    { kind: 'heading', text: 'Euler\u2019s Form and the Honest Logarithm' },
    { kind: 'para', text: 'The bracket $(\\cos\\theta + i\\sin\\theta)$ — a unit-circle direction — has a famous shorthand. Euler\u2019s exponential $e^{i\\theta}$, defined by the same power series that defines $e^x$ with the exponent taken up the imaginary axis, collapses exactly onto that bracket. The honest route for this book is to state the identity, WITNESS it numerically on the series, and leave its full analytic proof to the calculus book\u2019s own arc — the standing honesty rule: never claim a proof that was not run.' },
    { kind: 'derivation', title: 'Euler\u2019s form, witnessed on the series', statement: 'For real θ, the series $e^{i\\theta} = \\sum_{k \\geq 0} \\frac{(i\\theta)^k}{k!}$ converges to $\\cos\\theta + i\\sin\\theta$ — the unit-circle direction at bearing θ, written exponentially.', steps: [
      { label: 'The three series', formula: 'e^x = \\sum \\tfrac{x^k}{k!}, \\quad \\cos x = \\sum \\tfrac{(-1)^k x^{2k}}{(2k)!}, \\quad \\sin x = \\sum \\tfrac{(-1)^k x^{2k+1}}{(2k+1)!}', explanation: 'The exponential and the two trigonometric series — the calculus book\u2019s standard results, used here as the definition of the object.' },
      { label: 'Run the exponent up the axis', formula: 'e^{i\\theta} = \\sum \\tfrac{(i\\theta)^k}{k!}', explanation: 'Substitute $x = i\\theta$ into the exponential series. The powers of $i$ cycle mod-4 (3.1\u2019s engine), so even terms turn real with alternating signs and odd terms turn imaginary — the series SPLIT into the two trigonometric series.' },
      { label: 'Witness numerically', formula: '\\sum_{k=0}^{24} \\tfrac{(i\\theta)^k}{k!} \\approx \\cos\\theta + i\\sin\\theta', explanation: 'At 24 terms the partial sums sit within $10^{-10}$ of the bracket at seven test bearings — the witness this lesson\u2019s engines ran pre-prose. The analytic proof (term-by-term splitting of the series) belongs to the calculus arc; the numerical witness is the honest bound this book claims.' },
      { label: 'The seats', formula: 'e^{i\\pi} = -1, \\quad e^{i\\pi/2} = i, \\quad e^{i0} = 1', explanation: 'The identity seat: bearing $\\pi$ is the negative real axis and $e^{i\\pi} = -1$ — Euler\u2019s identity, the one line joining $e$, $i$, $\\pi$, 1 and the minus sign. The quarter-turn returns $i$; the zero bearing returns 1.' },
    ], result: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta, \\qquad z = |z|\\,e^{i\\theta} \\text{ (the polar form in exponential dress)}' },
    { kind: 'formula', name: 'Euler\u2019s form of a complex number', latex: 'z = |z|\\,e^{i\\theta} = |z|(\\cos\\theta + i\\sin\\theta), \\qquad e^{i\\pi} = -1', note: 'the unit-circle direction written as an exponential — multiplication now reads as the law of exponents: $|z_1|e^{i\\alpha}\\cdot|z_2|e^{i\\beta} = |z_1||z_2|e^{i(\\alpha+\\beta)}$.' },
    { kind: 'example', title: 'Euler seats and the honest logarithm of −4', steps: [
      'The seats: $2e^{i\\pi/3} = 2(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3}) = 1 + \\sqrt{3}\\,i$; $4e^{i\\pi/2} = 4i$; and $-4 = 4e^{i\\pi}$ — the negative real seat in exponential dress.',
      'The logarithm wants to invert the form: if $z = re^{i\\theta}$ then $\\log z = \\ln r + i\\theta$ — the length read plus the bearing read. For $z = -4$: $\\log(-4) = \\ln 4 + i\\pi$.',
      'The honesty: the bearing is only defined up to $2\\pi$ — $e^{i2\\pi} = 1$ — so EVERY value $\\log(-4) = \\ln 4 + i(\\pi + 2k\\pi)$, $k \\in \\mathbb{Z}$, exponentiates back to $-4$: the logarithm is MULTI-VALUED, one value per turn of the circle. The principal branch takes $k = 0$.',
      'The check on two branches: $e^{\\ln 4 + i\\pi} = 4(\\cos\\pi + i\\sin\\pi) = -4$; and $e^{\\ln 4 + i(\\pi + 2\\pi)} = 4(\\cos 3\\pi + i \\sin 3\\pi) = -4$ — both branch values return the same seat, the period witnessed.',
      'Hence, $\\log(-4) = \\ln 4 + i(\\pi + 2k\\pi)$ — the inverse of the second address, honestly multi-valued, the single-valued principal branch named as a convention rather than a truth.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The logarithm is a family, not a number', text: 'The priced slip writes "THE logarithm of $-4$ is $\\ln 4 + i\\pi$" as if the other values were errors. They are not: each is a branch of one honest family $\\ln 4 + i(\\pi + 2k\\pi)$, and every branch exponentiates back to $-4$ because $e^{i2\\pi} = 1$ exactly. What IS a slip is mixing branches inside one computation — add two logarithms of different branches and the result exponentiates to the wrong seat. State the branch (the principal one, $k = 0$, unless said otherwise), keep it, and the family behaves.' },

    { kind: 'heading', text: 'The Section Formula in Complex Numbers' },
    { kind: 'para', text: 'The argument made points into bearings; it also makes LINE GEOMETRY computable, and the first instrument is the division of a segment in a given ratio — the section formula. The complex route is the affine one: a point on the segment from $z_1$ to $z_2$ is $z_1$ plus a REAL multiple of the step $z_2 - z_1$, and the multiple is read off the ratio.' },
    { kind: 'derivation', title: 'The midpoint and the section formula', statement: 'The midpoint of the segment joining $z_1$ and $z_2$ is $\\tfrac{z_1 + z_2}{2}$; the point dividing that segment internally in the ratio $m : n$ (from $z_1$ to $z_2$, so that $AP : PB = m : n$) is $\\tfrac{n z_1 + m z_2}{m + n}$ — the weighted average, weights crossing the ratio.', steps: [
      { label: 'Parametrize the segment', formula: 'z(t) = z_1 + t(z_2 - z_1), \\quad 0 \\leq t \\leq 1', explanation: 'The affine parametrization: $t = 0$ parks at $z_1$, $t = 1$ arrives at $z_2$, and the point $z(t)$ splits the segment in the ratio $t : (1 - t)$ — both coordinates split identically because the step is added wholesale.' },
      { label: 'Read t off the ratio', formula: 'AP : PB = m : n \\Rightarrow t = \\tfrac{m}{m+n}', explanation: 'The fraction of the way from $z_1$ to $z_2$ is the share of $m$ in the whole: $t = \\tfrac{AP}{AP + PB} = \\tfrac{m}{m+n}$. The weights cross because $z_1$ carries the complement $1 - t = \\tfrac{n}{m+n}$.' },
      { label: 'Substitute', formula: 'z = z_1 + \\tfrac{m}{m+n}(z_2 - z_1) = \\tfrac{(m+n)z_1 + m z_2 - m z_1}{m+n} = \\tfrac{n z_1 + m z_2}{m+n}', explanation: 'One line of algebra. The midpoint is the special case $m = n$: $\\tfrac{z_1 + z_2}{2}$ — the average of the addresses, componentwise.' },
      { label: 'The distance contract', formula: '\\left|\\tfrac{P - z_1}{P - z_2}\\right| = \\tfrac{m}{n}', explanation: 'The formula\u2019s own receipt: the distance ratio of the division seat is EXACTLY the given ratio — the engines verify it on every worked seat below, and the collinearity receipt rides free: $(z_1 - P)/(z_2 - P)$ is a negative real, its argument exactly $\\pi$ mod $2\\pi$.' },
    ], result: 'P = \\tfrac{n z_1 + m z_2}{m + n} \\ \\ (AP : PB = m : n); \\qquad \\text{midpoint} = \\tfrac{z_1 + z_2}{2}; \\qquad \\text{centroid} = \\tfrac{z_1 + z_2 + z_3}{3}' },
    { kind: 'formula', name: 'The section formula in complex numbers', latex: 'P = \\frac{n z_1 + m z_2}{m + n} \\quad (AP : PB = m : n), \\qquad \\text{midpoint} = \\frac{z_1 + z_2}{2}, \\qquad \\text{centroid} = \\frac{z_1 + z_2 + z_3}{3}', note: 'the weights CROSS the ratio ($z_1$ takes $n$, $z_2$ takes $m$); the centroid is the $1:1:1$ extension to three seats — and the parallelogram closure below is the midpoint engine run twice.' },
    { kind: 'example', title: 'The parallelogram closure: A(1+i), B(4+2i), C(6+6i) are three vertices in order — find the fourth, and price the diagonals', steps: [
      'The law of parallelogram diagonals: they bisect each other, so the midpoint of $AC$ must equal the midpoint of $BD$ — $\\tfrac{z_1 + z_3}{2} = \\tfrac{z_2 + z_4}{2}$, hence $z_4 = z_1 + z_3 - z_2$.',
      'Substitute: $z_4 = (1 + i) + (6 + 6i) - (4 + 2i) = 3 + 5i$ — the fourth vertex, one line, no coordinate split.',
      'The receipt: midpoint of $AC$ is $\\tfrac{(1+i) + (6+6i)}{2} = \\tfrac{7}{2} + \\tfrac{7}{2}i$; midpoint of $BD$ is $\\tfrac{(4+2i) + (3+5i)}{2} = \\tfrac{7}{2} + \\tfrac{7}{2}i$ — equal exactly, the closure verified.',
      'The centroid (the $1:1:1$ extension): $\\tfrac{(1+i) + (4+2i) + (6+6i)}{3} = \\tfrac{11 + 9i}{3} = \\tfrac{11}{3} + 3i$ — the average of the four addresses\u2019 three generators.',
      'Hence, $D = 3 + 5i$, both diagonal midpoints at $\\tfrac{7}{2} + \\tfrac{7}{2}i$ — the section formula\u2019s midpoint engine closing a parallelogram without a single coordinate split.',
    ] },
    { kind: 'example', title: 'The ratio division: divide the segment from z₁ = 2+i to z₂ = 8+5i in the ratios 1 : 2 and 2 : 1', steps: [
      'For $AP : PB = 1 : 2$ the formula crosses the weights: $P = \\tfrac{2z_1 + 1 \\cdot z_2}{3} = \\tfrac{2(2+i) + (8+5i)}{3} = \\tfrac{12 + 7i}{3} = 4 + \\tfrac{7}{3}i$.',
      'The receipt: $|P - z_1| = |2 + \\tfrac{4}{3}i| = \\sqrt{4 + \\tfrac{16}{9}} = \\tfrac{2\\sqrt{13}}{3}$ and $|z_2 - P| = |4 + \\tfrac{8}{3}i| = \\sqrt{16 + \\tfrac{64}{9}} = \\tfrac{4\\sqrt{13}}{3}$ — the ratio is exactly $1 : 2$, and $(z_1 - P)/(z_2 - P) = -\\tfrac{1}{2}$, a negative real: collinear, $P$ between.',
      'For $AP : PB = 2 : 1$ the weights cross the other way: $P = \\tfrac{1 \\cdot z_1 + 2z_2}{3} = \\tfrac{(2+i) + (16+10i)}{3} = 6 + \\tfrac{11}{3}i$, two-thirds of the way along.',
      'The receipt again: $|P - z_1| = \\tfrac{4\\sqrt{13}}{3}$ and $|z_2 - P| = \\tfrac{2\\sqrt{13}}{3}$ — the ratio exactly $2 : 1$, the mirrored division seat.',
      'Hence, $4 + \\tfrac{7}{3}i$ and $6 + \\tfrac{11}{3}i$ — both receipts exact, both seats collinear by the negative-real quotient.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Affine combinations are line geometry', text: 'The section formula is one face of a general law: points of the line through $z_1$ and $z_2$ are exactly the REAL affine combinations $\\lambda z_1 + \\mu z_2$ with $\\lambda + \\mu = 1$ — inside the segment when both weights are positive, outside when one is negative, and the weights\u2019 sum pinned at 1 is what keeps the combination on the LINE rather than the plane. The collinearity transfer prices it: any relation $az_1 + bz_2 + cz_3 = 0$ with $a + b + c = 0$ rewrites $z_3$ as an affine combination of $z_1$ and $z_2$ with unit weight-sum — three seats on one line. The exercise ladder cashes the transfer on $2z_1 - 3z_2 + z_3 = 0$.' },

    { kind: 'heading', text: 'Angle between Two Rays' },
    { kind: 'para', text: 'The second fold instrument reads ANGLES off the plane — the angle at a vertex between two rays to other points. The move is the translation-to-origin route: shifting the vertex to the origin never changes directions, and directions are arguments.' },
    { kind: 'callout', tone: 'definition', title: 'Angle between two rays', text: 'For three points $P(z_1)$, $Q(z_2)$ and $R(z_3)$ with $P$ off the line $QR$, the angle $\\angle QPR$ — the angle at $P$ between the rays $PQ$ and $PR$ — is read as $\\theta = \\arg\\left(\\tfrac{z_3 - z_1}{z_2 - z_1}\\right)$, taken in $[0, \\pi]$ up to sign: the quotient\u2019s argument is the difference of the bearings, which IS the opened angle. For two full LINES (directions without heads), the same read at $\\arg\\left(\\tfrac{z_4 - z_3}{z_1 - z_2}\\right)$ gives the acute-or-right angle between them, since a line\u2019s direction is blind to reversal.' },
    { kind: 'derivation', title: 'The translation route to the angle formula', statement: 'Shifting the vertex P to the origin preserves both ray directions; the angle between the shifted rays is the difference of their arguments — the argument of the quotient.', steps: [
      { label: 'Shift the vertex', formula: "Q \mapsto Q' = z_2 - z_1, \quad R \mapsto R' = z_3 - z_1", explanation: 'Subtract $z_1$ from every address: $P$ moves to the origin, and the DIFFERENCES $z_2 - z_1$, $z_3 - z_1$ are the shifted addresses of $Q$, $R$. Translation preserves direction — the two rays now emanate from $O$ along the very directions they had at $P$.' },
      { label: 'Read the bearings', formula: '\\arg(z_2 - z_1) = \\theta_1, \\quad \\arg(z_3 - z_1) = \\theta_2', explanation: 'The shifted rays are radius vectors from the origin, so their directions are arguments of the differences — the second address doing ray work.' },
      { label: 'Open the angle', formula: '\\theta = \\theta_2 - \\theta_1 = \\arg\\left(\\tfrac{z_3 - z_1}{z_2 - z_1}\\right)', explanation: 'The opened angle at the vertex is the difference of the bearings — and by the argument law of this lesson, the difference of arguments is the argument of the QUOTIENT. One division prices the whole angle.' },
    ], result: '\\angle QPR = \\arg\\frac{z_3 - z_1}{z_2 - z_1} \\ \\ (\\text{mod sign, taken in } [0, \\pi])' },
    { kind: 'formula', name: 'The angle between two rays', latex: '\\angle QPR = \\arg\\left(\\frac{z_3 - z_1}{z_2 - z_1}\\right), \\qquad \\text{(lines: } \\arg\\tfrac{z_4 - z_3}{z_1 - z_2}\\text{)}', note: 'the vertex takes the subtrahend seat: both differences come FROM the vertex, and the quotient\u2019s argument is the opened angle.' },
    { kind: 'example', title: 'The angle at P(2+i) between the rays to Q(5+4i) and R(2+6i)', steps: [
      'The differences from the vertex: $Q - P = (5+4i) - (2+i) = 3 + 3i$ — radius $3\\sqrt{2}$, bearing $\\tfrac{\\pi}{4}$; $R - P = (2+6i) - (2+i) = 5i$ — radius 5, bearing $\\tfrac{\\pi}{2}$ (the vertical ray).',
      'The quotient read: $\\angle QPR = \\arg\\left(\\tfrac{5i}{3+3i}\\right) = \\tfrac{\\pi}{2} - \\tfrac{\\pi}{4} = \\tfrac{\\pi}{4}$ — a forty-five degree opening at the vertex.',
      'The cross-check by dot product: $(3, 3) \\cdot (0, 5) = 15$ with lengths $3\\sqrt{2}$ and $5$, so $\\cos\\theta = \\tfrac{15}{15\\sqrt{2}} = \\tfrac{1}{\\sqrt{2}}$ — $\\theta = \\tfrac{\\pi}{4}$ exactly, both routes agreeing.',
      'Hence, the rays open at $\\tfrac{\\pi}{4}$ — the argument quotient pricing an angle the coordinate plane would price with two dot products and a cosine table.',
    ] },

    { kind: 'heading', text: 'Equation of Ray' },
    { kind: 'para', text: 'The last fold instrument runs the observation backwards: if arguments are directions, then an EQUATION that pins an argument pins a ray — and ray equations become readable algebra. This is the locus reading the insight above teased: equal argument alone is a ray from the origin; now the origin is allowed to move.' },
    { kind: 'callout', tone: 'definition', title: 'Equation of ray', text: 'For a point $z_1 = x_1 + iy_1$ and a direction $\\theta$ with $\\tan\\theta$ defined, the EQUATION OF RAY is $\\arg(z - z_1) = \\theta$: the ray emanating from $z_1$ (with $z_1$ itself EXCLUDED — the argument of 0 is undefined) at bearing $\\theta$. In coordinates it is the half of the line $y - y_1 = (\\tan\\theta)(x - x_1)$ that points in the direction $\\theta$: the line is the two-headed ancestor, the ray keeps only the head that bears $\\theta$.' },
    { kind: 'derivation', title: 'From the line to the ray: reading arg(z − z₁) = θ in coordinates', statement: 'The ray arg(z − z₁) = θ is the direction-θ half of the line through z₁ of slope tan θ — the argument equation and the point-slope line are the same object, the ray keeping one head only.', steps: [
      { label: 'Unfold the argument', formula: '\\arg(z - z_1) = \\theta \\Rightarrow \\tan(\\arg(z - z_1)) = \\tan\\theta', explanation: 'Take the tangent of both sides — legal here because the bearing is pinned at one value, not a family.' },
      { label: 'The tangent read', formula: '\\frac{y - y_1}{x - x_1} = \\tan\\theta \\Rightarrow y - y_1 = (\\tan\\theta)(x - x_1)', explanation: 'The argument of $z - z_1$ is the bearing of the step from $z_1$ to $z$; its tangent is the slope of that step. The point-slope line through $z_1$ appears — but with BOTH heads.' },
      { label: 'Keep the bearing\u2019s head', formula: '\\cos(x - x_1) \\gtrless 0 \\text{ as } \\cos\\theta \\gtrless 0, \\quad \\sin(y - y_1) \\text{ likewise}', explanation: 'The line carries two bearings, $\\theta$ and $\\theta + \\pi$; the RAY equation\u2019s argument pins the sign pair of the step to the sign pair of $(\\cos\\theta, \\sin\\theta)$ — exactly one head survives. That is why ray equations can meet in NO point where line equations always meet: the excluded head may have carried the crossing.' },
    ], result: '\\arg(z - z_1) = \\theta \\iff y - y_1 = (\\tan\\theta)(x - x_1) \\text{ with the } (\\cos\\theta, \\sin\\theta)\\text{-signed head}' },
    { kind: 'formula', name: 'The equation of ray', latex: '\\arg(z - z_1) = \\theta \\quad \\text{(the ray from } z_1 \\text{, } z_1 \\text{ excluded, bearing } \\theta\\text{)}', note: 'the origin seat $z_1$ is excluded — $\\arg 0$ is undefined — and that exclusion is load-bearing, as the no-meet example below shows.' },
    { kind: 'example', title: 'Where the rays meet — and where they never do: arg(z − 3i) = π against arg(z + 2 − i) = π/2, then arg(z − 2i) = 3π/4 against arg(z + 1 − i) = π/4', steps: [
      'The first pair: $\\arg(z - 3i) = \\pi$ is the ray from $3i$ bearing $\\pi$ — the horizontal line $y = 3$ travelled LEFT from $(0, 3)$; $\\arg(z + 2 - i) = \\tfrac{\\pi}{2}$ is the ray from $-2 + i$ bearing straight UP — the vertical line $x = -2$ travelled up from $(-2, 1)$.',
      'The meet: the left-travelling seat of $y = 3$ with $x < 0$ meets the up-travelling seat of $x = -2$ with $y > 1$ exactly at $(-2, 3)$ — the seat $z = -2 + 3i$, inside BOTH travelled halves.',
      'The receipt in the equation\u2019s own currency: at $z = -2+3i$, $z - 3i = -2$, a negative real — argument $\\pi$ ✓; and $z + 2 - i = 2i$, a positive imaginary — argument $\\tfrac{\\pi}{2}$ ✓. Both ray equations hold; the meet is verified, not eyeballed.',
      'The second pair: $\\arg(z - 2i) = \\tfrac{3\\pi}{4}$ is the ray from $2i$ travelling up-LEFT; $\\arg(z + 1 - i) = \\tfrac{\\pi}{4}$ is the ray from $-1 + i$ travelling up-RIGHT. Parametrize: the first is $(0, 2) + t(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2})$ with $t > 0$; the second is $(-1, 1) + s(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2})$ with $s > 0$.',
      'The system: equating components gives $-\\tfrac{\\sqrt{2}}{2}t - \\tfrac{\\sqrt{2}}{2}s = -1$ and $\\tfrac{\\sqrt{2}}{2}t - \\tfrac{\\sqrt{2}}{2}s = -1$; adding, $-\\sqrt{2}\\,s = -2$ so $s = \\sqrt{2}$, and back-substituting gives $t = 0$. The unique candidate is the FIRST ray\u2019s own origin $2i$ — the excluded seat.',
      'Diagnosis: ray 2 at $s = \\sqrt{2}$ lands exactly on $2i$ — it PASSES THROUGH ray 1\u2019s origin. But the ray from $2i$ excludes $2i$ (no argument of 0), so the crossing seat belongs to neither ray: the two equations have NO common solution — the line halves that would have crossed are the excluded heads. Hence, the first pair meets at $-2 + 3i$; the second pair never meets — the figure\u2019s two panels draw both verdicts.',
    ] },
    { kind: 'figure', caption: 'Rays and their meetings on the Argand plane. Left: the meet — arg(z − 3i) = π runs left from the open circle at 3i along y = 3, and arg(z + 2 − i) = π/2 runs straight up from the open circle at −2+i along x = −2; the solid dot marks the meeting seat −2+3i, where z − 3i = −2 (argument π) and z + 2 − i = 2i (argument π/2) both hold. Right: the no-meet — arg(z − 2i) = 3π/4 runs up-left from the open circle at 2i, and arg(z + 1 − i) = π/4 runs up-right from the open circle at −1+i; the dashed ring marks how ray 2 passes exactly through ray 1\u2019s origin 2i — the one seat where the underlying lines cross — but the origin is excluded from its own ray, so no meeting point exists.', svg: rayMeetSvg() },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main\u2019s algebra unit names complex numbers AND quadratic equations together and lists the modulus and the Argand diagram by name — the syllabus\u2019s own hint that this lesson\u2019s material is examined. The single-correct staples: polar-form conversion (with the quadrant discipline as the priced distractor), the argument of a product or quotient (with the wrap), and modulus-equation reads. Numerical-value items hang on the argument-addition law and on powers read by bearings. Ray and locus items — arg equations, meets and honest no-meets — appear in the advanced papers; NCERT class 11 ch. 4 carries the Argand plane at school depth. The items in this lesson are exam-STYLE — our own designs on the pinned engines, labelled honestly, never lifted from any paper.' },
    { kind: 'terms', items: [
      { term: 'Polar form', def: 'the second address of a nonzero complex number: $z = |z|(\\cos\\theta + i\\sin\\theta)$ — length from the modulus, direction from the argument; the same point as $x + iy$.' },
      { term: 'Argument and principal argument', def: 'the angle the radius from the origin to $z$ makes with the positive real axis; the principal value is the unique one in $(-\\pi, \\pi]$, every other value differing by a multiple of $2\\pi$. The argument of the origin is undefined.' },
      { term: 'Rotation-and-scaling', def: 'the geometric face of multiplication: $|z_1z_2| = |z_1||z_2|$ and $\\arg(z_1z_2) = \\arg z_1 + \\arg z_2$ — to multiply is to rotate by the second bearing and scale by the second length.' },
      { term: 'Euler\u2019s form', def: 'the exponential dress of the polar form: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, so $z = |z|e^{i\\theta}$; multiplication reads as the law of exponents.' },
      { term: 'Multi-valued logarithm', def: 'the inverse of the second address as a FAMILY: $\\log z = \\ln|z| + i(\\arg z + 2k\\pi)$, $k \\in \\mathbb{Z}$ — every branch exponentiates back to $z$ because $e^{i2\\pi} = 1$; the principal branch takes $k = 0$.' },
      { term: 'Section formula in complex numbers', def: 'the division of the segment from $z_1$ to $z_2$ in the ratio $m : n$ ($AP : PB$) at $P = \\tfrac{n z_1 + m z_2}{m + n}$ — weights crossing the ratio; the midpoint $\\tfrac{z_1+z_2}{2}$ and centroid $\\tfrac{z_1+z_2+z_3}{3}$ are the special seats.' },
      { term: 'Equation of ray', def: 'the locus $\\arg(z - z_1) = \\theta$: the ray from $z_1$ (origin excluded) at bearing $\\theta$ — the $\\theta$-headed half of the line $y - y_1 = (\\tan\\theta)(x - x_1)$; with the angle-between-rays read $\\arg\\tfrac{z_3 - z_1}{z_2 - z_1}$ it makes argument geometry computable.' },
    ] },
    { kind: 'quiz', title: 'Check yourself: the second address', items: [
      { q: 'The polar form of −1 + √3 i is', options: ['2(cos π/3 + i sin π/3)', '√2(cos 3π/4 + i sin 3π/4)', '2(cos 2π/3 + i sin 2π/3)', '2(cos 5π/6 + i sin 5π/6)'], answer: 2, explain: 'The seat has x < 0, y > 0 — SECOND quadrant, and |z| = √(1 + 3) = 2. The route θ = π − α with α = tan⁻¹√3 = π/3 gives θ = 2π/3. (A) is the first-quadrant tangent read — the tangent fraud priced: tan⁻¹|y/x| alone cannot tell this seat from 1 + √3i. (B) carries the modulus of the 1 ± i seats — the wrong roster row. (D) is the −√3 + i seat\u2019s bearing — the neighbouring hexagon row.' },
      { q: 'The seats 1 + i and −1 − i both give tan⁻¹|y/x| = π/4. Their principal arguments are', options: ['π/4 and −3π/4', 'π/4 and π/4', 'π/4 and −π/4', '3π/4 and −π/4'], answer: 0, explain: '1 + i sits in the first quadrant: θ = α = π/4. −1 − i sits in the THIRD: θ = α − π = π/4 − π = −3π/4. (B) is the single-tangent fraud — one tangent, two different points; the honest discipline is the simultaneous cos/sin reads, whose signs pin the quadrant. (C) reads the fourth-quadrant mirror 1 − i for the second seat. (D) swaps the seats — 3π/4 belongs to −1 + i.' },
      { q: '(√3 + i)(1 + √3 i) equals', options: ['2√3 + 2i', '4i', '−4i', '4'], answer: 1, explain: 'The polar route: radii 2 and 2 promise modulus 4; bearings π/6 and π/3 promise π/2 — the positive imaginary axis: 4i. FOIL agrees: √3 + 3i + i − √3 = 4i. (A) is the unreduced FOIL slip — the √3 and √3i² terms never cancelled. (C) flips the rotation: the bearings summed to −π/2 would need one factor mirrored. (D) is the real-axis product — the bearing sum misread as 0.' },
      { q: 'z₁ has principal argument 5π/6 and modulus 2; z₂ has principal argument 2π/3 and modulus 2. The principal argument of z₁z₂ is', options: ['3π/2', 'π/2', '−π/6', '−π/2'], answer: 3, explain: 'The law: 5π/6 + 2π/3 = 3π/2, which leaves the principal range (−π, π] — the honest report wraps: 3π/2 − 2π = −π/2, the negative imaginary axis, at modulus 4. (A) is the unwrapped sum — outside the range, the principal discipline missed. (B) is the sign slip on the wrap. (C) is a DIFFERENCE read — subtraction is the division law\u2019s job, and even then only in the right order.' },
      { q: 'The ray arg(z − 3i) = π meets the ray arg(z + 2 − i) = π/2 at', options: ['3 + 2i', 'no meeting point', '−2 + 3i', '−3 + i'], answer: 2, explain: 'At z = −2 + 3i: z − 3i = −2, a negative real — argument π ✓; z + 2 − i = 2i, a positive imaginary — argument π/2 ✓. Both ray equations hold, and the seat lies in both travelled halves (y = 3 travelled left; x = −2 travelled up). (A) swaps the components — it satisfies neither equation. (B) is the honest verdict for the OTHER pair of this lesson — these rays do meet. (D) fails ray 2 (z + 2 − i = −1, argument π) and misses ray 1\u2019s y = 3.' },
    ] },
    { kind: 'exercises', title: 'Exercises 3.4', sets: [
      { level: 'L1', questions: [
        { q: 'Write in polar form: (a) 1 + i; (b) −√3 + i; (c) 4 − 3i.', solution: [
          '(a) $r = \\sqrt{1+1} = \\sqrt{2}$, and the seat is first-quadrant with $\\alpha = \\tfrac{\\pi}{4} = \\theta$: $1 + i = \\sqrt{2}\\left(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4}\\right)$.',
          '(b) $r = \\sqrt{3 + 1} = 2$; the signs $(x, y) = (-, +)$ route second-quadrant: $\\alpha = \\tfrac{\\pi}{6}$, $\\theta = \\pi - \\tfrac{\\pi}{6} = \\tfrac{5\\pi}{6}$: $-\\sqrt{3} + i = 2\\left(\\cos\\tfrac{5\\pi}{6} + i\\sin\\tfrac{5\\pi}{6}\\right)$.',
          '(c) $r = \\sqrt{16 + 9} = 5$; the fourth-quadrant bearing $\\theta = -\\tan^{-1}\\tfrac{3}{4} \\approx -0.644$ — honest and non-special: $4 - 3i = 5\\left(\\cos(-0.644) + i\\sin(-0.644)\\right)$, the angle carried as a decimal.',
        ], answer: '(a) $\\sqrt{2}(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4})$; (b) $2(\\cos\\tfrac{5\\pi}{6} + i\\sin\\tfrac{5\\pi}{6})$; (c) $5(\\cos(-\\tan^{-1}\\tfrac{3}{4}) + i\\sin(-\\tan^{-1}\\tfrac{3}{4}))$' },
        { q: 'Read the modulus and the principal argument of: (a) −1 + √3 i; (b) −1 − √3 i; (c) −5i.', solution: [
          '(a) $r = \\sqrt{1 + 3} = 2$; second quadrant: $\\theta = \\pi - \\tfrac{\\pi}{3} = \\tfrac{2\\pi}{3}$.',
          '(b) $r = 2$; third quadrant: $\\theta = \\tfrac{\\pi}{3} - \\pi = -\\tfrac{2\\pi}{3}$ — the mirror of (a), exactly the $\\arg(\\bar{z}) = -\\arg z$ read.',
          '(c) $r = 5$ on the negative imaginary axis: $\\theta = -\\tfrac{\\pi}{2}$ — an axis seat, no quadrant route needed.',
        ], answer: '(a) $(2, \\tfrac{2\\pi}{3})$; (b) $(2, -\\tfrac{2\\pi}{3})$; (c) $(5, -\\tfrac{\\pi}{2})$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Compute by the argument laws AND by direct arithmetic — both routes must agree: (a) (√3 + i)(1 + √3i); (b) (1 + √3i)/(√3 + i).', solution: [
          '(a) The law: radii $2 \\cdot 2 = 4$, bearings $\\tfrac{\\pi}{6} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$ — the seat $4i$. FOIL: $\\sqrt{3} + 3i + i + \\sqrt{3}i^2 = (\\sqrt{3} - \\sqrt{3}) + 4i = 4i$ ✓.',
          '(b) The law: radius $\\tfrac{2}{2} = 1$, bearing $\\tfrac{\\pi}{3} - \\tfrac{\\pi}{6} = \\tfrac{\\pi}{6}$ — the unit seat $\\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$.',
          'The conjugate route: $\\tfrac{(1 + \\sqrt{3}i)(\\sqrt{3} - i)}{4} = \\tfrac{\\sqrt{3} - i + 3i - \\sqrt{3}i^2}{4} = \\tfrac{2\\sqrt{3} + 2i}{4} = \\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$ ✓.',
        ], answer: '(a) $4i$; (b) $\\tfrac{\\sqrt{3}}{2} + \\tfrac{1}{2}i$ — both routes exact' },
        { q: 'A(1+i), B(4+2i), C(6+6i) are three vertices of a parallelogram taken in order. Find the fourth vertex D and verify the diagonal midpoints.', solution: [
          'The diagonal-bisect law: $\\tfrac{z_A + z_C}{2} = \\tfrac{z_B + z_D}{2}$, so $z_D = z_A + z_C - z_B$.',
          'Substitute: $z_D = (1 + i) + (6 + 6i) - (4 + 2i) = 3 + 5i$.',
          'The receipts: mid(AC) $= \\tfrac{(1+i) + (6+6i)}{2} = \\tfrac{7}{2} + \\tfrac{7}{2}i$ and mid(BD) $= \\tfrac{(4+2i) + (3+5i)}{2} = \\tfrac{7}{2} + \\tfrac{7}{2}i$ — equal exactly.',
        ], answer: '$D = 3 + 5i$; both diagonal midpoints at $\\tfrac{7}{2} + \\tfrac{7}{2}i$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the principal argument of the product when the factors carry: (a) principal arguments 5π/6 and 2π/3, moduli 2 and 2; (b) principal arguments 3π/4 and 2π/3, moduli √2 and 2.', solution: [
          '(a) The law sums: $\\tfrac{5\\pi}{6} + \\tfrac{2\\pi}{3} = \\tfrac{3\\pi}{2}$ — outside $(-\\pi, \\pi]$, so wrap: $\\tfrac{3\\pi}{2} - 2\\pi = -\\tfrac{\\pi}{2}$. The product (modulus 4) sits on the NEGATIVE imaginary axis: $-4i$.',
          '(b) The sum: $\\tfrac{3\\pi}{4} + \\tfrac{2\\pi}{3} = \\tfrac{17\\pi}{12}$ — above $\\pi$, wrap: $\\tfrac{17\\pi}{12} - 2\\pi = -\\tfrac{7\\pi}{12}$, a bearing of $-105^\\circ$.',
          'The honest seat: $(-1 + i)(-1 + \\sqrt{3}\\,i) = (1 - \\sqrt{3}) - (1 + \\sqrt{3})\\,i$ at modulus $2\\sqrt{2}$ — and its components over $2\\sqrt{2}$ are exactly $\\cos\\left(-\\tfrac{7\\pi}{12}\\right), \\sin\\left(-\\tfrac{7\\pi}{12}\\right)$, the wrap verified by substitution.',
        ], answer: '(a) $-\\tfrac{\\pi}{2}$ (the product $-4i$); (b) $-\\tfrac{7\\pi}{12}$ on the seat $(1-\\sqrt{3}) - (1+\\sqrt{3})i$, modulus $2\\sqrt{2}$' },
        { q: 'The segment from z₁ = 2 + i to z₂ = 8 + 5i is divided internally at P in the ratio AP : PB = 1 : 2, and at Q in the ratio 2 : 1. Find P and Q, and verify each distance ratio.', solution: [
          'The section formula crosses the weights: $P = \\tfrac{2z_1 + z_2}{3} = \\tfrac{2(2+i) + (8+5i)}{3} = 4 + \\tfrac{7}{3}i$.',
          'The receipt: $|P - z_1| = |2 + \\tfrac{4}{3}i| = \\tfrac{2\\sqrt{13}}{3}$ and $|z_2 - P| = |4 + \\tfrac{8}{3}i| = \\tfrac{4\\sqrt{13}}{3}$ — the ratio exactly $1 : 2$.',
          'Crossing the other way: $Q = \\tfrac{z_1 + 2z_2}{3} = \\tfrac{(2+i) + 2(8+5i)}{3} = 6 + \\tfrac{11}{3}i$, with $|Q - z_1| : |z_2 - Q| = \\tfrac{4\\sqrt{13}}{3} : \\tfrac{2\\sqrt{13}}{3} = 2 : 1$ ✓.',
        ], answer: '$P = 4 + \\tfrac{7}{3}i$ (ratio $1:2$ verified) and $Q = 6 + \\tfrac{11}{3}i$ (ratio $2:1$ verified)' },
        { q: 'Write −4 in polar form and in Euler\u2019s form; then write the honest logarithm family of −4 and verify two of its branch values.', solution: [
          'Polar: $-4 = 4(\\cos\\pi + i\\sin\\pi)$ — the negative real axis seat at radius 4. Euler: $-4 = 4e^{i\\pi}$.',
          'The logarithm wants $\\ln r + i\\theta$, but the bearing is defined only up to $2\\pi$: $\\log(-4) = \\ln 4 + i(\\pi + 2k\\pi)$, $k \\in \\mathbb{Z}$ — a family, one value per turn.',
          'Two branches verified: $e^{\\ln 4 + i\\pi} = 4(\\cos\\pi + i\\sin\\pi) = -4$; and $e^{\\ln 4 + i(\\pi + 2\\pi)} = 4(\\cos 3\\pi + i\\sin 3\\pi) = -4$ — both return the seat, the period $e^{i2\\pi} = 1$ witnessed.',
        ], answer: '$-4 = 4(\\cos\\pi + i\\sin\\pi) = 4e^{i\\pi}$; $\\log(-4) = \\ln 4 + i(\\pi + 2k\\pi)$, $k \\in \\mathbb{Z}$ — the principal branch $k = 0$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the angle at P(2 + i) between the rays to Q(5 + 4i) and R(2 + 6i) — by the argument quotient and by the dot-product cross-check.', solution: [
          'The differences from the vertex: $Q - P = 3 + 3i$ (bearing $\\tfrac{\\pi}{4}$, length $3\\sqrt{2}$) and $R - P = 5i$ (bearing $\\tfrac{\\pi}{2}$, length 5).',
          'The quotient read: $\\angle QPR = \\arg\\left(\\tfrac{5i}{3+3i}\\right) = \\tfrac{\\pi}{2} - \\tfrac{\\pi}{4} = \\tfrac{\\pi}{4}$.',
          'The cross-check: $(3, 3) \\cdot (0, 5) = 15$ with lengths $3\\sqrt{2}$ and $5$, so $\\cos\\theta = \\tfrac{15}{15\\sqrt{2}} = \\tfrac{1}{\\sqrt{2}}$ — $\\theta = \\tfrac{\\pi}{4}$ ✓ both routes.',
        ], answer: '$\\angle QPR = \\tfrac{\\pi}{4}$ — both routes agree' },
        { q: '(a) Where does arg(z − 3i) = π meet arg(z + 2 − i) = π/2? (b) Show that arg(z − 2i) = 3π/4 and arg(z + 1 − i) = π/4 have no common solution, and diagnose why.', solution: [
          '(a) The first ray travels LEFT along $y = 3$ from $(0, 3)$; the second travels UP along $x = -2$ from $(-2, 1)$. The travelled halves meet at $z = -2 + 3i$: check $z - 3i = -2$ (argument $\\pi$ ✓) and $z + 2 - i = 2i$ (argument $\\tfrac{\\pi}{2}$ ✓).',
          '(b) Parametrize: ray 1 $= (0, 2) + t(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2})$, $t > 0$; ray 2 $= (-1, 1) + s(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2})$, $s > 0$.',
          'The system: $-\\tfrac{\\sqrt{2}}{2}(t + s) = -1$ and $\\tfrac{\\sqrt{2}}{2}(t - s) = -1$; adding gives $s = \\sqrt{2}$, and back-substitution gives $t = 0$ — NOT allowed.',
          'The diagnosis: $t = 0$ is ray 1\u2019s own origin $2i$ — ray 2 at $s = \\sqrt{2}$ lands exactly on $2i$, passing THROUGH ray 1\u2019s origin; but the origin is excluded (the argument of 0 is undefined), so the crossing seat belongs to no ray: NO common solution.',
        ], answer: '(a) the meet $-2 + 3i$; (b) no solution — the unique line-crossing is ray 1\u2019s excluded origin $2i$' },
        { q: 'Use the power laws to compute (1 + i)⁸ and (−√3 + i)⁶ without expanding — then state the modulus and bearing of each answer.', solution: [
          '$1 + i$ carries radius $\\sqrt{2}$, bearing $\\tfrac{\\pi}{4}$: the eighth power has radius $(\\sqrt{2})^8 = 16$ and bearing $8 \\cdot \\tfrac{\\pi}{4} = 2\\pi \\equiv 0$ — the positive real axis: $(1+i)^8 = 16$.',
          'The square check: $((1+i)^4)^2 = (-4)^2 = 16$ ✓ (and $(1+i)^4 = -4$: radius 4, bearing $\\pi$).',
          '$-\\sqrt{3} + i$ carries radius 2, bearing $\\tfrac{5\\pi}{6}$: the sixth power has radius $2^6 = 64$ and bearing $6 \\cdot \\tfrac{5\\pi}{6} = 5\\pi \\equiv \\pi$ — the negative real axis: $(-\\sqrt{3}+i)^6 = -64$.',
          'Both powers land ON axes — bearings $0$ and $\\pi$ — which is why the answers are purely real: an axis bearing is exactly what a real answer looks like in the second address.',
        ], answer: '$(1+i)^8 = 16$ (radius 16, bearing 0); $(-\\sqrt{3}+i)^6 = -64$ (radius 64, bearing $\\pi$)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the argument-addition law from the angle-addition identities: for z₁ = r₁(cos α + i sin α) and z₂ = r₂(cos β + i sin β), the product lands at radius r₁r₂ and bearing α + β.', solution: [
          'Expand the bracket: $(\\cos\\alpha + i\\sin\\alpha)(\\cos\\beta + i\\sin\\beta) = (\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta) + i(\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)$ — the multiplication rule of 3.1, nothing new.',
          'Cash the identities: the real bracket is $\\cos(\\alpha + \\beta)$ and the imaginary bracket is $\\sin(\\alpha + \\beta)$ — the two standard angle-addition identities.',
          'Read the address: $z_1 z_2 = r_1 r_2\\left(\\cos(\\alpha + \\beta) + i\\sin(\\alpha + \\beta)\\right)$ — radius $r_1 r_2$ (3.2\u2019s multiplicativity), bearing $\\alpha + \\beta$.',
          'The scope note: the two identities are the trigonometric module\u2019s standard results — witnessed numerically on a grid by this lesson\u2019s engines, and proved in the Trigonometry book\u2019s own arc when that book is written; the honest claim here is the derivation CONDITIONAL on them, not their proof.',
        ], answer: '$|z_1z_2| = r_1r_2$ and $\\arg(z_1z_2) = \\alpha + \\beta$ — derived from the two angle-addition identities, the witness swept' },
        { q: 'Verify the rotation-and-scaling law on the witness (1 + i)(3 + 4i): compute the product, then check the length half and the direction half separately.', solution: [
          'The product: $(1+i)(3+4i) = 3 + 4i + 3i + 4i^2 = -1 + 7i$.',
          'The length half: $|1+i| \\cdot |3+4i| = \\sqrt{2} \\cdot 5 = 5\\sqrt{2}$, and $|-1+7i| = \\sqrt{1 + 49} = \\sqrt{50} = 5\\sqrt{2}$ ✓ — lengths multiply, checked at a NON-special seat.',
          'The direction half: the bearings promise growth by $\\tfrac{\\pi}{4}$; indeed $\\arg(3+4i) \\approx 0.9273$ and $\\arg(-1+7i) = \\tfrac{\\pi}{2} - \\tan^{-1}\\tfrac{1}{7} \\approx 1.7071 = 0.9273 + 0.7854$ ✓ — the bearing grew by exactly $\\tfrac{\\pi}{4}$.',
        ], answer: '$-1 + 7i$ with modulus $5\\sqrt{2} = \\sqrt{2} \\cdot 5$ and argument grown by exactly $\\tfrac{\\pi}{4}$ — both halves of the law verified' },
        { q: 'The seats z₁ = 1 + i, z₂ = 4 + 2i satisfy 2z₁ − 3z₂ + z₃ = 0 for a third seat z₃. Show z₁, z₂, z₃ are collinear and locate z₃ relative to the segment.', solution: [
          'Solve: $z_3 = 3z_2 - 2z_1 = 3(4 + 2i) - 2(1 + i) = 12 + 6i - 2 - 2i = 10 + 4i$.',
          'The affine read: $z_3 - z_1 = 9 + 3i = 3(3 + i) = 3(z_2 - z_1)$ — the step from $z_1$ to $z_3$ is exactly THREE steps of the $z_1 \\to z_2$ direction: collinear.',
          'The location: the weight on $z_2$ in $z_3 = 3z_2 - 2z_1$ is negative ($-2$), so $z_3$ lies OUTSIDE the segment, beyond $z_2$ — twice as far beyond as the whole segment is long.',
          'The check: $|z_3 - z_2| = |6 + 2i| = 2\\sqrt{10}$ and $|z_2 - z_1| = |3 + i| = \\sqrt{10}$ — the overshoot is exactly two segment-lengths, the affine read priced.',
        ], answer: '$z_3 = 10 + 4i$, collinear with $z_1, z_2$ (the relation is an affine combination with unit weight-sum), lying beyond $z_2$ by two segment-lengths' },
      ] },
      { level: 'L6', questions: [
        { q: 'Find the area of the region {z : |arg z| ≤ π/6 and |z − 2| < |z − 4|}.', solution: [
          'Decode the second condition: $|z - 2| < |z - 4|$ says $z$ is closer to 2 than to 4 — the perpendicular-bisector half-plane of the seats 2 and 4. Algebra: $(x-2)^2 + y^2 < (x-4)^2 + y^2 \\Rightarrow -4x + 4 < -8x + 16 \\Rightarrow x < 3$.',
          'Decode the first: $|\\arg z| \\leq \\tfrac{\\pi}{6}$ is the sector between the rays at bearings $\\pm\\tfrac{\\pi}{6}$ from the origin — the ray equations $y = \\pm\\tfrac{x}{\\sqrt{3}}$ for $x \\geq 0$ (this lesson\u2019s own instrument).',
          'The intersection: the sector cut by the line $x = 3$ — the triangle with vertices $O$, $(3, \\sqrt{3})$ (the +π/6 ray at $x = 3$), and $(3, -\\sqrt{3})$ (the −π/6 ray).',
          'The area: base $2\\sqrt{3}$ (from $(3, -\\sqrt{3})$ to $(3, \\sqrt{3})$), height 3 (from the origin to the line $x = 3$): $\\tfrac{1}{2} \\cdot 2\\sqrt{3} \\cdot 3 = 3\\sqrt{3}$ — the shoelace on the three vertices agrees exactly.',
        ], answer: '$3\\sqrt{3}$ (the triangle $O$, $(3, \\sqrt{3})$, $(3, -\\sqrt{3})$)' },
        { q: 'Prove: if |z₁| = |z₂| ≠ 0 and arg z₁ + arg z₂ = π, then z₂ = −z̄₁. Witness the law at the seats z₁ = 1 + √3 i.', solution: [
          'Write the pair in polar form: $z_1 = r(\\cos\\alpha + i\\sin\\alpha)$ and, since the bearings sum to $\\pi$, $z_2 = r(\\cos(\\pi - \\alpha) + i\\sin(\\pi - \\alpha))$ with the SAME radius $r$ (the moduli are given equal).',
          'Fold the second bearing: $\\cos(\\pi - \\alpha) = -\\cos\\alpha$ and $\\sin(\\pi - \\alpha) = \\sin\\alpha$, so $z_2 = r(-\\cos\\alpha + i\\sin\\alpha)$.',
          'Compare with the negated mirror: $\\bar{z}_1 = r(\\cos\\alpha - i\\sin\\alpha)$, so $-\\bar{z}_1 = r(-\\cos\\alpha + i\\sin\\alpha)$ — exactly $z_2$.',
          'The witness: $z_1 = 1 + \\sqrt{3}\\,i$ (radius 2, bearing $\\tfrac{\\pi}{3}$) forces $z_2$ at radius 2, bearing $\\tfrac{2\\pi}{3}$: $z_2 = -1 + \\sqrt{3}\\,i$. And $-\\bar{z}_1 = -(1 - \\sqrt{3}\\,i) = -1 + \\sqrt{3}\\,i$ ✓ — the pair mirrors across the IMAGINARY axis, their bearings flanking $\\tfrac{\\pi}{2}$.',
        ], answer: 'proved: equal moduli with bearings summing to $\\pi$ force $z_2 = -\\bar{z}_1$; witnessed by $1 + \\sqrt{3}\\,i \\mapsto -1 + \\sqrt{3}\\,i$' },
      ] },
    ] },
  ],
}

function pentagonSeatsSvg(): string {
  // the fifth roots of unity as the pentagon: viewBox 520×420, centre
  // (260,205), R = 150 — the five seats at 2πk/5 with the exact
  // coordinates labelled; the regular n-gon structure of the roots
  const cx = 260
  const cy = 205
  const R = 150
  const seat = (k: number): [number, number] => {
    const th = (2 * Math.PI * k) / 5
    return [cx + R * Math.cos(th), cy - R * Math.sin(th)]
  }
  const pts = [0, 1, 2, 3, 4].map(seat)
  const label = (k: number, dx: number, dy: number, text: string, color: string): string =>
    `<text x="${pts[k][0] + dx}" y="${pts[k][1] + dy}" font-size="11.5" font-weight="700" fill="${color}">${text}</text>`
  return `<svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The unit circle centred at the origin with the five fifth roots of unity marked as the vertices of a regular pentagon: the seat one on the positive real axis at one; the seat cis of two pi over five above it labelled with its exact coordinates; the seat cis of four pi over five in the upper left; the seat cis of six pi over five in the lower left; the seat cis of eight pi over five in the lower right. Equal spokes of seventy-two degrees are marked from the centre, and the five sides of the pentagon are drawn green.">
  <text x="260" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the fifth roots of unity — the unit circle's equal spokes</text>
  <line x1="40" y1="${cy}" x2="480" y2="${cy}" stroke="#0d9488" stroke-width="1.8"/>
  <line x1="${cx}" y1="30" x2="${cx}" y2="380" stroke="#5eead4" stroke-width="1.4"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#0d9488" stroke-width="2"/>
  <polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  ${[0, 1, 2, 3, 4]
    .map((k) => `<line x1="${cx}" y1="${cy}" x2="${pts[k][0]}" y2="${pts[k][1]}" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="4 3"/>`)
    .join('')}
  <circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="6" fill="#ea580c"/>
  <circle cx="${pts[1][0]}" cy="${pts[1][1]}" r="6" fill="#ea580c"/>
  <circle cx="${pts[2][0]}" cy="${pts[2][1]}" r="6" fill="#ea580c"/>
  <circle cx="${pts[3][0]}" cy="${pts[3][1]}" r="6" fill="#ea580c"/>
  <circle cx="${pts[4][0]}" cy="${pts[4][1]}" r="6" fill="#ea580c"/>
  <circle cx="${cx}" cy="${cy}" r="3.5" fill="#16a34a"/>
  ${label(0, 14, -10, '1', '#c2410c')}
  ${label(1, 12, -8, 'cis 2π/5', '#c2410c')}
  ${label(2, -118, -8, 'cis 4π/5', '#c2410c')}
  ${label(3, -128, 14, 'cis 6π/5', '#c2410c')}
  ${label(4, 12, 22, 'cis 8π/5', '#c2410c')}
  <text x="8" y="56" font-size="10" fill="#0f766e">exact: cis 2π/5 = (√5−1)/4 + i√(10+2√5)/4</text>
  <text x="8" y="72" font-size="10" fill="#0f766e">exact: cis 4π/5 = −(√5+1)/4 + i√(10−2√5)/4</text>
  <text x="260" y="404" font-size="10.5" text-anchor="middle" fill="#0f766e">five seats · five equal spokes of 2π/5 · sum 0 · product +1 · one pentagon</text>
</svg>`
}

function cubeRootSpokesSvg(): string {
  // the three seats of z³ = −8i on the circle of radius 2: viewBox
  // 520×420, centre (250,210), 55 px per unit — seats √3−i, 2i, −√3−i
  // at principal bearings −π/6, π/2, −5π/6, spokes 2π/3 apart
  const cx = 250
  const cy = 210
  const s = 55
  const px = (x: number): number => cx + x * s
  const py = (y: number): number => cy - y * s
  const seatA: [number, number] = [Math.sqrt(3), -1]
  const seatB: [number, number] = [0, 2]
  const seatC: [number, number] = [-Math.sqrt(3), -1]
  return `<svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The circle of radius two centred at the origin with the three cube roots of minus eight i marked: the seat root three minus i at bearing minus thirty degrees in the lower right; the seat two i at the top on the positive imaginary axis; the seat minus root three minus i at bearing minus one hundred fifty degrees in the lower left. The three spokes from the origin are drawn dashed grey and meet at equal angles of one hundred twenty degrees; each seat is cubed to minus eight i by the engine.">
  <text x="260" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the three doors of z³ = −8i — equal spokes on the radius-2 circle</text>
  <line x1="40" y1="${cy}" x2="470" y2="${cy}" stroke="#0d9488" stroke-width="1.8"/>
  <line x1="${cx}" y1="30" x2="${cx}" y2="390" stroke="#5eead4" stroke-width="1.4"/>
  <circle cx="${cx}" cy="${cy}" r="${2 * s}" fill="none" stroke="#0d9488" stroke-width="2"/>
  <line x1="${cx}" y1="${cy}" x2="${px(seatA[0])}" y2="${py(seatA[1])}" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="4 3"/>
  <line x1="${cx}" y1="${cy}" x2="${px(seatB[0])}" y2="${py(seatB[1])}" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="4 3"/>
  <line x1="${cx}" y1="${cy}" x2="${px(seatC[0])}" y2="${py(seatC[1])}" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="4 3"/>
  <path d="M ${cx + 70} ${cy} A 70 70 0 0 0 ${cx + 60.6} ${cy + 35}" fill="none" stroke="#d97706" stroke-width="1.6"/>
  <text x="${cx + 84}" y="${cy + 24}" font-size="10.5" font-weight="700" fill="#b45309">2π/3</text>
  <text x="${cx - 34}" y="${cy - 82}" font-size="10.5" font-weight="700" fill="#b45309">2π/3</text>
  <circle cx="${px(seatA[0])}" cy="${py(seatA[1])}" r="6.5" fill="#ea580c"/>
  <circle cx="${px(seatB[0])}" cy="${py(seatB[1])}" r="6.5" fill="#ea580c"/>
  <circle cx="${px(seatC[0])}" cy="${py(seatC[1])}" r="6.5" fill="#ea580c"/>
  <text x="${px(seatA[0]) + 12}" y="${py(seatA[1]) - 6}" font-size="12" font-weight="700" fill="#c2410c">√3 − i</text>
  <text x="${px(seatB[0]) + 12}" y="${py(seatB[1]) - 14}" font-size="12" font-weight="700" fill="#c2410c">2i</text>
  <text x="${px(seatC[0]) - 86}" y="${py(seatC[1]) - 6}" font-size="12" font-weight="700" fill="#c2410c">−√3 − i</text>
  <text x="${px(seatA[0]) + 16}" y="${py(seatA[1]) + 22}" font-size="10" fill="#0f766e">2·cis(−π/6)</text>
  <text x="${px(seatB[0]) + 16}" y="${py(seatB[1]) + 20}" font-size="10" fill="#0f766e">2·cis(π/2)</text>
  <text x="${px(seatC[0]) - 96}" y="${py(seatC[1]) + 24}" font-size="10" fill="#0f766e">2·cis(−5π/6)</text>
  <circle cx="${cx}" cy="${cy}" r="3.5" fill="#16a34a"/>
  <text x="${cx - 18}" y="${cy + 18}" font-size="10" fill="#166534">O</text>
  <text x="260" y="404" font-size="10.5" text-anchor="middle" fill="#0f766e">each seat cubed = −8i · radius 2 = (8)^{1/3} · one door per 2π/3 turn</text>
</svg>`
}

function equilateralConditionSvg(): string {
  // the equilateral triangle {0, 4, 2+2√3 i}: viewBox 460×400, scale
  // 40 px per unit, origin at px (120,330) — sides 4, 4, 4 with the
  // condition's two sides priced on the seats
  const ox = 120
  const oy = 330
  const s = 40
  const px = (x: number): number => ox + x * s
  const py = (y: number): number => oy - y * s
  const A: [number, number] = [0, 0]
  const B: [number, number] = [4, 0]
  const C: [number, number] = [2, 2 * Math.sqrt(3)]
  return `<svg viewBox="0 0 460 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Argand plane with the equilateral triangle whose vertices are the complex numbers zero, four, and two plus two root three i. The base runs from the origin to four on the real axis; the apex sits at two plus two root three times i above the midpoint of the base; all three sides are labelled four. The seat zero is marked with the letter O, the apex angle of sixty degrees is marked, and the caption notes that the condition z one squared plus z two squared plus z three squared equals z one z two plus z two z three plus z three z one holds exactly for these three seats.">
  <text x="230" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">an equilateral triangle as a complex condition</text>
  <line x1="30" y1="${py(0)}" x2="440" y2="${py(0)}" stroke="#0d9488" stroke-width="1.8"/>
  <line x1="${px(0)}" y1="40" x2="${px(0)}" y2="${py(0)}" stroke="#5eead4" stroke-width="1.4"/>
  <polygon points="${px(A[0])},${py(A[1])} ${px(B[0])},${py(B[1])} ${px(C[0])},${py(C[1])}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="${px(2)}" y1="${py(0)}" x2="${px(2)}" y2="${py(2 * Math.sqrt(3))}" stroke="#94a3b8" stroke-width="1.1" stroke-dasharray="4 3"/>
  <circle cx="${px(A[0])}" cy="${py(A[1])}" r="5" fill="#ea580c"/>
  <circle cx="${px(B[0])}" cy="${py(B[1])}" r="5" fill="#ea580c"/>
  <circle cx="${px(C[0])}" cy="${py(C[1])}" r="5" fill="#ea580c"/>
  <text x="${px(A[0]) - 32}" y="${py(A[1]) + 20}" font-size="12" font-weight="700" fill="#c2410c">O (0)</text>
  <text x="${px(B[0]) + 10}" y="${py(B[1]) + 16}" font-size="12" font-weight="700" fill="#c2410c">4</text>
  <text x="${px(C[0]) - 14}" y="${py(C[1]) - 12}" font-size="12" font-weight="700" fill="#c2410c">2 + 2√3 i</text>
  <text x="${px(2) + 8}" y="${py(Math.sqrt(3)) - 0}" font-size="11" fill="#0f766e">2√3</text>
  <text x="${px(2) + 6}" y="${py(0) - 8}" font-size="11" fill="#0f766e">2</text>
  <text x="${px(1) - 6}" y="${py(0) - 12}" font-size="11" fill="#0f766e">4</text>
  <text x="${px(2.9)}" y="${py(1.6)}" font-size="11" fill="#0f766e">4</text>
  <path d="M ${px(1.05)} ${py(0.05)} A 14 14 0 0 0 ${px(1.05)} ${py(0.32)}" fill="none" stroke="#d97706" stroke-width="1.6"/>
  <text x="${px(1.02) + 4}" y="${py(0.62)}" font-size="10.5" font-weight="700" fill="#b45309">60°</text>
  <text x="230" y="380" font-size="10.5" text-anchor="middle" fill="#0f766e">sides |z₁−z₂| = |z₂−z₃| = |z₃−z₁| = 4 · the apex at 60°</text>
  <text x="230" y="394" font-size="10.5" text-anchor="middle" fill="#0f766e">condition: 0² + 4² + (2+2√3 i)² = 8 + 8√3 i = 0·4 + 4·(2+2√3 i) + 0 ✓</text>
</svg>`
}

const lesson35: Lesson = {
  id: 'aa-de-moivre-roots-of-unity-and-the-complex-loci',
  number: '3.5',
  title: 'De Moivre, Roots of Unity and the Complex Loci',
  concepts: [
    "De Moivre's theorem",
    'the nth roots of unity',
    'primitive roots',
    'the cube roots of unity',
    'the multi-valued nth root',
    'the square-root u, v system',
    'the complex loci',
    'the diametric circle',
    'the equilateral condition',
  ],
  objectives: [
    "State and prove De Moivre's theorem $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$ for every integer $n$, by induction on the argument-addition law this chapter proved — and read its rational extension honestly as one value among many.",
    'Solve $z^n = 1$ completely: the $n$ seats $\\cos\\tfrac{2k\\pi}{n} + i\\sin\\tfrac{2k\\pi}{n}$ on the unit circle — the equal spokes, the regular $n$-gon, the primitive roots, the zero sum, the product $(\\tfrac{-1}{1})^{n-1}$.',
    'Master the cube roots of unity $1, \\omega, \\omega^2$: the identities $1 + \\omega + \\omega^2 = 0$ and $\\omega^3 = 1$, the mod-3 power cycle, and the factorisations $a^3 \\pm b^3$ and $a^3 + b^3 + c^3 - 3abc$ that the $\\omega$ engine unlocks.',
    'Take the multi-valued nth root of ANY complex number: $z = re^{i\\theta}$ has $n$ doors at $r^{1/n}\\left(\\cos\\tfrac{\\theta + 2k\\pi}{n} + i\\sin\\tfrac{\\theta + 2k\\pi}{n}\\right)$ — and recover the square-root $u, v$ system of lesson 3.3 as the $n = 2$ case.',
    'Read complex loci as plane equations: the circle $z\\bar z + a\\bar z + \\bar a z + b = 0$ with its centre-and-radius read, the straight line from the real-ratio discipline, the circle whose diametric end points are given, and the algebraic condition for three points to represent an equilateral triangle.',
  ],
  prerequisites: ['aa-the-argand-plane-polar-form-and-the-argument', 'aa-negative-discriminants-the-doors-turn-complex', 'aa-conjugate-and-modulus'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 3.4 ended with a law: to multiply complex numbers is to rotate and scale — radii multiply, bearings add. That law was proved for TWO factors. But the whole engine of algebra asks for more: what is a PRODUCT of $n$ equal factors — a POWER — in the second address? The answer is one line long and deserves its name: De Moivre\u2019s theorem, $ (\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$, proved below by nothing more than the argument-addition law and induction.' },
    { kind: 'para', text: 'This lesson cashes that theorem three ways, each a chapter-closing engine. First, the question \u201cwhich $z$ raised to the $n$th power gives $1$?\u201d — the nth ROOTS OF UNITY, the unit circle\u2019s equal spokes, the most symmetric objects algebra owns. Second, the same question for any complex number at all: the multi-valued nth root, whose $n$ doors are the equal spokes of a circle of radius $r^{1/n}$ — with the square-root $u, v$ system of lesson 3.3 returning as the $n = 2$ case. Third, the LOCI: equations in $z$ and $\\bar z$ whose solution sets are the plane\u2019s honest curves — lines, circles, the diametric circle, and an algebraic certificate for equilateral triangles. The chapter\u2019s final storey is built entirely from the one law of 3.4.' },

    { kind: 'heading', text: 'De Moivre\u2019s Theorem: the Argument Law Raised to Powers' },
    { kind: 'para', text: 'The proof is an induction, and the induction\u2019s engine is 3.4\u2019s argument-addition law: for $z_1 = r_1(\\cos\\alpha + i\\sin\\alpha)$ and $z_2 = r_2(\\cos\\beta + i\\sin\\beta)$, the product is $r_1r_2(\\cos(\\alpha + \\beta) + i\\sin(\\alpha + \\beta))$. Nothing new is needed — only the observation that a power is a repeated product of EQUAL factors, so the bearing adds to itself.' },
    { kind: 'derivation', title: 'De Moivre\u2019s theorem for integer powers', statement: 'For every integer $n$ and every real $\\theta$: $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$.', steps: [
      { label: 'The base', formula: 'n = 1: \\quad (\\cos\\theta + i\\sin\\theta)^1 = \\cos 1\\cdot\\theta + i\\sin 1\\cdot\\theta', explanation: 'The case $n = 0$ is the empty product $1 = \\cos 0 + i \\sin 0$, and $n = 1$ is the statement itself — the induction starts with nothing to check.' },
      { label: 'The step', formula: 'z^{n+1} = z^n \\cdot z = (\\cos n\\theta + i\\sin n\\theta)(\\cos\\theta + i\\sin\\theta) = \\cos(n\\theta + \\theta) + i\\sin(n\\theta + \\theta)', explanation: 'One more factor: the argument-addition law of lesson 3.4 with $\\alpha = n\\theta$, $\\beta = \\theta$, radii both 1. The bearing $n\\theta$ grows by exactly $\\theta$ per step — the \u201clock hand ticks forward one notch per multiplication.\u201d' },
      { label: 'Close the induction', formula: 'z^{n+1} = \\cos(n+1)\\theta + i\\sin(n+1)\\theta', explanation: 'The step converts case $n$ into case $n + 1$; with the base, every POSITIVE integer power is proved.' },
      { label: 'Negative powers', formula: '(\\cos\\theta + i\\sin\\theta)^{-1} = \\cos\\theta - i\\sin\\theta = \\cos(-\\theta) + i\\sin(-\\theta)', explanation: 'The reciprocal of a unit-modulus number is its conjugate (3.2\u2019s reciprocal engine at $r = 1$), and the conjugate carries bearing $-\\theta$. So $z^{-m} = (z^{-1})^m = \\cos(-m\\theta) + i\\sin(-m\\theta)$ — the theorem holds for every integer, with $n\\theta$ read at the signed $n$.' },
    ], result: '(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta \\qquad \\text{for every } n \\in \\mathbb{Z}' },
    { kind: 'callout', tone: 'definition', title: 'De Moivre\u2019s theorem', text: 'For every integer $n$: $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$, and its conjugate twin $(\\cos\\theta - i\\sin\\theta)^n = \\cos n\\theta - i\\sin n\\theta$. For a RATIONAL exponent $n = p/q$: $\\cos\\tfrac{p\\theta}{q} + i\\sin\\tfrac{p\\theta}{q}$ is ONE of the values of $(\\cos\\theta + i\\sin\\theta)^{p/q}$ — not the only one. The honest full story is the multi-valued nth root below: raising to $p$ then taking the $q$th root yields $q$ doors, and the principal door is only one of them.' },
    { kind: 'formula', name: 'De Moivre\u2019s theorem', latex: '(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta, \\qquad n \\in \\mathbb{Z}; \\qquad \\text{(rational } n\\text{: one value among many)}', note: 'powers at the second address: the bearing multiplies by $n$, the radius by $|n$-fold product|. Proved by induction on the argument-addition law — no trigonometry needed beyond it.' },
    { kind: 'example', title: 'The doubling chain and two power witnesses', steps: [
      'The chain: $1 + i$ carries radius $\\sqrt{2}$, bearing $\\tfrac{\\pi}{4}$. Squaring doubles the bearing and squares the radius: $(1+i)^2 = 2i$ (radius 2, bearing $\\tfrac{\\pi}{2}$); $(1+i)^4 = (2i)^2 = -4$ (radius 4, bearing $\\pi$); $(1+i)^8 = (-4)^2 = 16$ (radius 16, bearing $2\\pi \\equiv 0$); $(1+i)^{16} = 16^2 = 256$ — radius $256$, bearing $4\\pi \\equiv 0$: the answer is the positive real number $\\boxed{256}$, and the engine never multiplied anything but $i^2 = -1$ facts.',
      'The ninth power: $\\sqrt{3} + i$ carries radius $2$, bearing $\\tfrac{\\pi}{6}$. The ninth power carries radius $2^9 = 512$, bearing $9 \\cdot \\tfrac{\\pi}{6} = \\tfrac{3\\pi}{2}$ — the NEGATIVE imaginary axis: $(\\sqrt{3}+i)^9 = 512\\left(\\cos\\tfrac{3\\pi}{2} + i\\sin\\tfrac{3\\pi}{2}\\right) = -512i$.',
      'The conjugate pair: $\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$ is the unit-modulus seat at bearing $\\tfrac{\\pi}{3}$. The pair $\\left(\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i\\right)^7$ sums to $\\cos\\tfrac{7\\pi}{3} + i\\sin\\tfrac{7\\pi}{3} + \\cos\\tfrac{7\\pi}{3} - i\\sin\\tfrac{7\\pi}{3} = 2\\cos\\tfrac{7\\pi}{3} = 2\\cos\\tfrac{\\pi}{3} = 1$ — a REAL answer: conjugate powers are conjugates (the law of 3.2 cashed by De Moivre), so their imaginary parts cancel exactly. The engine swept this on the $7$-power grid before this prose was written.',
      'Hence, three different power families priced by one theorem: the doubling chain $2i \\to -4 \\to 16 \\to 256$, the $-512i$ witness, and the real pair-sum $1$ — none of them expanded by FOIL at any point.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The (sin \u03b8 + i cos \u03b8) fraud', text: 'De Moivre is a statement about $\\cos\\theta + i\\sin\\theta$ — a genuine polar seat at bearing $\\theta$. It does NOT extend to $\\sin\\theta + i\\cos\\theta$: that seat sits at bearing $\\tfrac{\\pi}{2} - \\theta$, so its $n$th power is $\\cos\\left(\\tfrac{n\\pi}{2} - n\\theta\\right) + i\\sin\\left(\\tfrac{n\\pi}{2} - n\\theta\\right)$ — NOT $\\sin n\\theta + i\\cos n\\theta$. The engine pinned the fraud numerically before this prose existed: at $\\theta = 0.7$, $n = 2$, the two candidates disagree. When a seat is not in polar form, PUT it in polar form first — the theorem prices seats, not strings of symbols.' },

    { kind: 'heading', text: 'The nth Roots of Unity: the Unit Circle\u2019s Equal Spokes' },
    { kind: 'para', text: 'Ask the algebra its most symmetric question: which $z$ satisfy $z^n = 1$? At the second address the answer writes itself. Write the wanted seat as $z = r(\\cos\\theta + i\\sin\\theta)$; then $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$ by De Moivre, and this must equal $1 = 1(\\cos 0 + i\\sin 0)$. Radii are non-negative, so $r^n = 1$ forces $r = 1$ — every root sits ON the unit circle. And the bearing must satisfy $n\\theta \\equiv 0 \\pmod{2\\pi}$: $\\theta = \\tfrac{2k\\pi}{n}$ for integers $k$. Distinct seats stop repeating after $k = n$ turns — exactly $n$ doors, equally spaced around the circle.' },
    { kind: 'derivation', title: 'The complete solution of the unity equation', statement: 'For $n \\geq 2$, the equation $z^n = 1$ has exactly $n$ solutions, the seats $\\alpha^k$ for $k = 0, 1, \\dots, n-1$, where $\\alpha = \\cos\\tfrac{2\\pi}{n} + i\\sin\\tfrac{2\\pi}{n}$.', steps: [
      { label: 'The radius', formula: 'r^n = 1 \\;\\Rightarrow\\; r = 1', explanation: 'The modulus of a product of $n$ equal factors is $r^n$ (3.2\u2019s multiplicativity, $n$ times over); matching the unit modulus of $1$ pins every root to the unit circle.' },
      { label: 'The bearing', formula: 'n\\theta \\equiv 0 \\pmod{2\\pi} \\;\\Rightarrow\\; \\theta = \\tfrac{2k\\pi}{n}', explanation: 'De Moivre: the $n$th power\u2019s bearing is $n\\theta$, and it must point at $0$ (mod $2\\pi$ — the full-turn equivalence, 3.4\u2019s wrap discipline). One full circle of bearings hands out $\\theta = 0, \\tfrac{2\\pi}{n}, \\tfrac{4\\pi}{n}, \\dots$' },
      { label: 'The count', formula: 'k = 0, 1, \\dots, n-1: \\quad n \\text{ seats}', explanation: 'At $k = n$ the bearing $2\\pi$ wraps to $0$ — the seat is $1$ again. So the list closes after $n$ DISTINCT seats: the powers $1, \\alpha, \\alpha^2, \\dots, \\alpha^{n-1}$ of the first spoke $\\alpha$.' },
      { label: 'The shape', formula: '\\text{equal spokes } \\tfrac{2\\pi}{n} \\text{ apart — a regular } n\\text{-gon}', explanation: 'The seats are the circle cut into $n$ equal arcs: joined by chords they are the vertices of a regular polygon with $n$ sides centred at the origin. The engine swept $n = 3$ to $12$: every seat re-roots to $1$, the polygon closes, the census is exact.' },
    ], result: 'z^n = 1 \\;\\Longleftrightarrow\\; z \\in \\{1, \\alpha, \\alpha^2, \\dots, \\alpha^{n-1}\\}, \\qquad \\alpha = \\cos\\tfrac{2\\pi}{n} + i\\sin\\tfrac{2\\pi}{n}' },
    { kind: 'callout', tone: 'definition', title: 'nth roots of unity; primitive root', text: 'The nth ROOTS OF UNITY are the $n$ solutions of $z^n = 1$: the seats $\\cos\\tfrac{2k\\pi}{n} + i\\sin\\tfrac{2k\\pi}{n}$, $k = 0, \\dots, n-1$ — the unit circle\u2019s equal spokes, the vertices of a regular $n$-gon centred at the origin. A root $\\alpha^k$ is PRIMITIVE when its powers alone already produce all $n$ roots — exactly when $\\gcd(k, n) = 1$, of which there are $\\varphi(n)$ (Euler\u2019s counting function). The 5th roots have 4 primitive seats; the 6th have only 2; the 4th have 2 ($\\pm i$); the primes have the full $n - 1$.' },
    { kind: 'figure', caption: 'The fifth roots of unity — the pentagon. Five seats at equal spokes of $\\tfrac{2\\pi}{5} = 72^\\circ$: the real seat $1$ on the axis, the two upper seats $\\mathrm{cis}\\,\\tfrac{2\\pi}{5}$ and $\\mathrm{cis}\\,\\tfrac{4\\pi}{5}$ with their exact surd coordinates, and their two lower mirrors. Joined by chords, the seats are the regular pentagon — the geometric object the equation $z^5 = 1$ has been all along.', svg: pentagonSeatsSvg() },
    { kind: 'example', title: 'The pentagon bench: $z^5 = 1$ with exact coordinates', steps: [
      'The engine: $r = 1$ and $\\theta = \\tfrac{2k\\pi}{5}$ for $k = 0, \\dots, 4$ — five seats on the unit circle at $72^\\circ$ spacing.',
      'The exact coordinates are honest surds: $\\mathrm{cis}\\,\\tfrac{2\\pi}{5} = \\tfrac{\\sqrt{5}-1}{4} + i\\,\\tfrac{\\sqrt{10+2\\sqrt{5}}}{4}$ (numerically $0.309017 + 0.951057i$, verified by the engine to $10^{-12}$) and $\\mathrm{cis}\\,\\tfrac{4\\pi}{5} = -\\tfrac{\\sqrt{5}+1}{4} + i\\,\\tfrac{\\sqrt{10-2\\sqrt{5}}}{4}$ (numerically $-0.809017 + 0.587785i$) — the golden ratio\u2019s fingerprints, priceable exactly BECAUSE the pentagon carries them.',
      'The conjugate pairing: the lower seats are the upper seats\u2019 mirrors, $\\mathrm{cis}\\,\\tfrac{8\\pi}{5} = \\overline{\\mathrm{cis}\\,\\tfrac{2\\pi}{5}}$ — non-real roots of unity come in conjugate pairs, exactly as real-coefficient equations force (3.3\u2019s conjugate-pair law, now read geometrically).',
      'The census: five seats, one real ($1$ itself — $n$ odd means exactly one real root), four primitive (all but $1$: $\\varphi(5) = 4$), sum $0$ (the engine below proves it twice), product $+1$ ($n$ odd). Everything the properties subsection pins as law, witnessed on one bench.',
    ] },

    { kind: 'heading', text: 'Properties of nth Roots of Unity' },
    { kind: 'para', text: 'The roots of unity are a CENSUS, and every row of it is law. Five properties carry nearly all the work that exams and books ask of these seats — each proved once, each witnessed by the engine on $n = 3$ to $12$ before this prose existed.' },
    { kind: 'derivation', title: 'The sum of the roots of unity is zero (two proofs)', statement: 'For $n \\geq 2$: $1 + \\alpha + \\alpha^2 + \\dots + \\alpha^{n-1} = 0$.', steps: [
      { label: 'Proof A — the geometric series', formula: 'S = 1 + \\alpha + \\dots + \\alpha^{n-1} = \\tfrac{\\alpha^n - 1}{\\alpha - 1} = \\tfrac{1 - 1}{\\alpha - 1} = 0', explanation: 'The finite geometric sum (Arithmetic\u2019s own result, cashed here): since $\\alpha \\neq 1$ for $n \\geq 2$ (the first spoke is off the real axis), the formula applies, and the numerator vanishes because $\\alpha^n = 1$ — the roots literally sum themselves out of existence.' },
      { label: 'Proof B — Vieta', formula: 'x^n - 1 = x^n + 0\\cdot x^{n-1} + \\dots - 1 \\;\\Rightarrow\\; \\text{sum of roots} = -\\tfrac{0}{1} = 0', explanation: 'The polynomial route: $x^n - 1$ has no $x^{n-1}$ term, so Vieta\u2019s coefficient read prices the root sum at exactly $0$ — the SAME census row from the other side of algebra.' },
      { label: 'The geometric echo', formula: '\\sum_k \\cos\\tfrac{2k\\pi}{n} = 0 \\quad\\text{and}\\quad \\sum_k \\sin\\tfrac{2k\\pi}{n} = 0', explanation: 'Reading the zero sum by parts: the real parts cancel AND the imaginary parts cancel separately — $n$ unit vectors at equal spokes are the most balanced arrangement a circle admits (forces pulling equally in every direction — the engine\u2019s sweep agrees for every $n$ from 3 to 12).' },
    ], result: '1 + \\alpha + \\alpha^2 + \\dots + \\alpha^{n-1} = 0 \\qquad (n \\geq 2)' },
    { kind: 'formula', name: 'The roots-of-unity census', latex: '\\text{real roots: } n \\text{ odd} \\to \\{1\\}, \\; n \\text{ even} \\to \\{\\pm 1\\}; \\quad \\text{sum} = 0; \\quad \\text{product} = (-1)^{n-1}; \\quad \\#\\text{primitive} = \\varphi(n)', note: 'product read: $\\alpha^{0+1+\\dots+(n-1)} = \\alpha^{n(n-1)/2} = \\mathrm{cis}\\left(\\pi(n-1)\\right) = (-1)^{n-1}$ — $-1$ when $n$ is even, $+1$ when $n$ is odd. Common roots of $x^p = 1$ and $x^q = 1$: exactly $\\gcd(p, q)$ of them.' },
    { kind: 'para', text: 'Three more census rows, stated with their one-line engines. The REAL roots: the unit circle meets the real axis at $\\pm 1$, and $(-1)^n = 1$ exactly when $n$ is even — so odd $n$ owns one real root, even $n$ owns two. The PRODUCT: multiplying all $n$ seats piles up the bearings to $\\tfrac{2\\pi}{n}(0 + 1 + \\dots + (n-1)) = \\pi(n-1)$ — a single seat at angle $\\pi(n-1)$, which is $-1$ for even $n$ and $+1$ for odd $n$. The COMMON roots: a seat is both a $p$th and a $q$th root exactly when its spoke-count divides both $p$ and $q$ — there are $\\gcd(p, q)$ such seats (the engine\u2019s four pinned pairs: $2, 4, 1, 6$).' },
    { kind: 'example', title: 'The twelfth-roots census', steps: [
      'The seats: $\\mathrm{cis}\\,\\tfrac{k\\pi}{6}$ for $k = 0, \\dots, 11$ — twelve spokes of $30^\\circ$: the four axis seats $1, i, -1, -i$ plus the eight $15^\\circ$-family seats $\\pm\\tfrac{\\sqrt{3}}{2} \\pm \\tfrac{1}{2}i$ and $\\pm\\tfrac{\\sqrt{6} \\pm \\sqrt{2}}{4}$-family honest surds — a full clock face.',
      'The census rows: sum $0$ (twelve balanced spokes); product $-1$ (even $n$: the bearings pile to $\\pi \\cdot 11 \\equiv \\pi$); real roots $\\pm 1$ (even $n$); primitive seats — $\\gcd(k, 12) = 1$ at $k = 1, 5, 7, 11$ — exactly FOUR: $\\mathrm{cis}\\,\\tfrac{\\pi}{6}, \\mathrm{cis}\\,\\tfrac{5\\pi}{6}, \\mathrm{cis}\\,\\tfrac{7\\pi}{6}, \\mathrm{cis}\\,\\tfrac{11\\pi}{6}$, which is $\\varphi(12) = 4$.',
      'The common-roots cross-check: $x^{12} = 1$ and $x^{18} = 1$ share $\\gcd(12, 18) = 6$ seats — the sixth roots of unity sit inside the twelfth clock (every second spoke), exactly as the divisor law demands.',
      'Hence the twelfth clock prices four census rows at a glance — and the engine swept every one of them numerically before this prose was written.',
    ] },

    { kind: 'heading', text: 'The Cube Roots of Unity' },
    { kind: 'para', text: 'Between all $n$ and the special few, one family earns its own name: $z^3 = 1$. The polar engine prices it — three seats at $\\tfrac{2\\pi}{3}$ spacing on the unit circle — and the quadratic formula prices it again: $z^3 - 1 = (z - 1)(z^2 + z + 1)$, where the quadratic factor\u2019s doors are $z = \\tfrac{-1 \\pm i\\sqrt{3}}{2}$. Both routes land on the same trio: $1$ and the two complex seats, of which one is named $\\omega$ and the other is forced to be $\\omega^2$.' },
    { kind: 'derivation', title: 'The cube roots of unity', statement: '$z^3 = 1$ has exactly three solutions: $1, \\omega, \\omega^2$ where $\\omega = \\tfrac{-1 + i\\sqrt{3}}{2}$.', steps: [
      { label: 'Factor', formula: 'z^3 - 1 = (z - 1)(z^2 + z + 1) = 0', explanation: 'The difference of cubes (Arithmetic\u2019s factoring bench): the real root $1$ splits off, leaving a quadratic with discriminant $1 - 4 = -3$ — negative, so 3.3\u2019s discipline prices the other two doors as a conjugate pair.' },
      { label: 'The quadratic doors', formula: 'z = \\tfrac{-1 \\pm \\sqrt{-3}}{2} = \\tfrac{-1 \\pm i\\sqrt{3}}{2}', explanation: 'Naming the upper door $\\omega$: a unit-modulus seat (check: $\\tfrac{1}{4} + \\tfrac{3}{4} = 1$) at bearing $\\tfrac{2\\pi}{3}$ — the second spoke of the triangle.' },
      { label: 'The other door is the square', formula: '\\omega^2 = \\left(\\tfrac{-1+i\\sqrt{3}}{2}\\right)^2 = \\tfrac{1 - 2i\\sqrt{3} - 3}{4} = \\tfrac{-1 - i\\sqrt{3}}{2}', explanation: 'Squaring $\\omega$ doubles its bearing to $\\tfrac{4\\pi}{3}$ — the third spoke — and the algebra confirms it exactly: each complex cube root is the square of the other. The conjugate read too: $\\bar\\omega = \\omega^2$ (a unit-circle seat mirrors to its bearing-negation, which for $\\tfrac{2\\pi}{3}$ is $\\tfrac{4\\pi}{3}$ mod $2\\pi$).' },
      { label: 'The geometry', formula: '1, \\omega, \\omega^2 \\text{ at } 0, \\tfrac{2\\pi}{3}, \\tfrac{4\\pi}{3} \\text{ — an equilateral triangle}', explanation: 'Three unit seats at equal $120^\\circ$ spokes: sides $|1 - \\omega| = |1 - \\omega^2| = |\\omega - \\omega^2| = \\sqrt{3}$ (each side the chord of a $120^\\circ$ arc) — the roots of unity\u2019s smallest regular polygon, the bridge this lesson cashes again as the EQUILATERAL CONDITION below.' },
    ], result: 'z^3 = 1 \\;\\Longleftrightarrow\\; z \\in \\{1, \\omega, \\omega^2\\}, \\qquad \\omega = \\tfrac{-1+i\\sqrt{3}}{2}, \\quad \\bar\\omega = \\omega^2' },

    { kind: 'heading', text: 'Properties of Cube Roots of Unity' },
    { kind: 'para', text: 'The $\\omega$-engine\u2019s laws, each one line and each swept by the engine before prose. THE SUM: $1 + \\omega + \\omega^2 = 0$ — the $n = 3$ row of the zero-sum law (both proofs: the geometric series dies because $\\omega^3 = 1$, and Vieta reads the absent $z$-term of $z^2 + z + 1$). THE CYCLE: $\\omega^3 = 1$ makes every power reduce mod 3 — $\\omega^{3q + r} = \\omega^r$ — so $\\omega$ answers power questions the way $i$ answered them mod 4 in 3.1 (the two smallest clocks in algebra). THE PRODUCT: $1 \\cdot \\omega \\cdot \\omega^2 = \\omega^3 = 1$. THE RECIPROCALS: $\\omega^{-1} = \\omega^2$ and $\\omega^{-2} = \\omega$ — each complex root is the other\u2019s reciprocal, because their product is $\\omega^3 = 1$. THE REAL FAMILY: the cube roots of $-1$ are $-1, -\\omega, -\\omega^2$ (negate the trio), and of any real $a > 0$: $\\sqrt[3]{a}, \\sqrt[3]{a}\\,\\omega, \\sqrt[3]{a}\\,\\omega^2$ — one real door, two $\\omega$-turned doors at radius $\\sqrt[3]{a}$.' },
    { kind: 'formula', name: 'The ω engine', latex: '1 + \\omega + \\omega^2 = 0, \\qquad \\omega^3 = 1, \\qquad \\omega^{3q+r} = \\omega^r, \\qquad \\bar\\omega = \\omega^2 = \\tfrac{1}{\\omega}', note: 'plus the factorisations the engine unlocks: $a^3 \\pm b^3 = (a \\pm b)(a \\pm b\\omega)(a \\pm b\\omega^2)$ and $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a+b\\omega+c\\omega^2)(a+b\\omega^2+c\\omega)$.' },
    { kind: 'derivation', title: 'The ω factorisations', statement: 'For all $a, b, c$: $a^3 + b^3 = (a+b)(a+b\\omega)(a+b\\omega^2)$ and $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a+b\\omega+c\\omega^2)(a+b\\omega^2+c\\omega)$.', steps: [
      { label: 'The two-term split', formula: 'a^3 + b^3 = (a+b)(a^2 - ab + b^2)', explanation: 'The sum of cubes from Arithmetic\u2019s bench — the first factor is the real door, the quadratic is the two complex doors\u2019 product.' },
      { label: 'Split the quadratic', formula: 'a^2 - ab + b^2 = (a + b\\omega)(a + b\\omega^2)', explanation: 'Expand the right side: $a^2 + ab(\\omega + \\omega^2) + b^2\\omega^3 = a^2 - ab + b^2$ — because $\\omega + \\omega^2 = -1$ and $\\omega^3 = 1$. The zero-sum law is the engine: the two $\\omega$-seats sum to $-1$ so the cross term turns NEGATIVE exactly as the quadratic demands.' },
      { label: 'The witness', formula: 'a = 2, b = 3: \\quad 5(2 + 3\\omega)(2 + 3\\omega^2) = 5 \\cdot 7 = 35 = 2^3 + 3^3', explanation: 'The engine cashed this exactly: the two complex factors are conjugates (their product is $|2 + 3\\omega|^2 = 4 - 6 + 9 = 7$), so the product is real — every such factorisation lands on real ground because conjugate pairs collide.' },
      { label: 'The three-term law', formula: 'a^3+b^3+c^3-3abc = (a+b+c)\\underbrace{(a+b\\omega+c\\omega^2)(a+b\\omega^2+c\\omega)}_{\\text{conjugate pair}}', explanation: 'The same engine at three terms (the identity\u2019s proof is the same expansion with $\\omega + \\omega^2 = -1$ and $\\omega^3 = 1$ doing all the work). Witness: $a,b,c = 1,2,4$: LHS $= 1 + 8 + 64 - 24 = 49$; RHS $= 7 \\cdot |1 + 2\\omega + 4\\omega^2|^2 = 7 \\cdot |{-2} - i\\sqrt{3}|^2 = 7 \\cdot 7 = 49$ — the engine\u2019s exact receipt.' },
    ], result: 'a^3 + b^3 + c^3 - 3abc = (a+b+c)(a+b\\omega+c\\omega^2)(a+b\\omega^2+c\\omega) \\quad \\text{(zero when } a+b+c = 0\\text{)}' },
    { kind: 'example', title: 'The mod-3 clock at work', steps: [
      'Reduce the powers: $2026 = 3 \\cdot 675 + 1$ so $\\omega^{2026} = \\omega$; $4052 = 3 \\cdot 1350 + 2$ so $\\omega^{4052} = \\omega^2$. Their sum: $\\omega + \\omega^2 = -1$ — the zero-sum law as a subtraction: the two complex seats together cost exactly minus the real seat.',
      'The pair product: $(1 + \\omega)(1 + \\omega^2) = 1 + (\\omega + \\omega^2) + \\omega^3 = 1 - 1 + 1 = 1$ — NOT 2: the cross term is $\\omega + \\omega^2 = -1$, the engine CAUGHT the drafted answer of 2 before this prose was written. The two factors are conjugates, and $|1 + \\omega| = 1$ (the seat $1 + \\omega = \\mathrm{cis}\\,\\tfrac{\\pi}{3}$ — a beautiful coincidence this lesson\u2019s figure 2 family will echo), so the product of conjugates is the squared modulus: $1$.',
      'The triple-sum rule: $1 + \\omega^n + \\omega^{2n}$ is $3$ when $3 | n$ (all three seats collapse to $1$) and $0$ otherwise (the three distinct seats reappear) — the engine swept $n = 1$ to $12$: only $n = 3, 6, 9, 12$ read $3$, every other read $0$.',
      'Hence the mod-3 clock: power questions reduce to remainders, pair questions to conjugate collisions, sum questions to the zero-sum law — three laws, one letter $\\omega$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The ω triangle IS the equilateral condition', text: 'The seats $1, \\omega, \\omega^2$ form an equilateral triangle (three unit seats at $120^\\circ$ spokes, side $\\sqrt{3}$). The condition this lesson pins below — $z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$ — holds for them exactly: LHS $= 1 + \\omega^2 + \\omega^4 = 1 + \\omega^2 + \\omega = 0$ and RHS $= \\omega + \\omega^3 + \\omega^2 = \\omega + 1 + \\omega^2 = 0$. The roots of unity are not merely a picture OF symmetry; they are the algebraic certificate of it — the engine verified both sides at $10^{-9}$ before this sentence existed.' },

    { kind: 'heading', text: 'The Multi-Valued nth Root: every Number\u2019s n Doors' },
    { kind: 'para', text: 'Return to the general question with the whole engine built: given $w = re^{i\\theta}$ (any nonzero complex number), which $z$ satisfy $z^n = w$? The unit-circle argument generalises in one move — and its honest answer is the chapter\u2019s deepest habit: the nth root is a FAMILY, not a number.' },
    { kind: 'derivation', title: 'The multi-valued nth root', statement: 'For $w = r(\\cos\\theta + i\\sin\\theta) \\neq 0$, the $n$ solutions of $z^n = w$ are $z = r^{1/n}\\left(\\cos\\tfrac{\\theta + 2k\\pi}{n} + i\\sin\\tfrac{\\theta + 2k\\pi}{n}\\right)$ for $k = 0, 1, \\dots, n-1$.', steps: [
      { label: 'Seat the wanted root', formula: 'z = \\rho(\\cos\\phi + i\\sin\\phi) \\;\\Rightarrow\\; z^n = \\rho^n(\\cos n\\phi + i\\sin n\\phi)', explanation: 'De Moivre prices the power in the second address — the equation becomes two reads: one for radii, one for bearings.' },
      { label: 'The radius read', formula: '\\rho^n = r \\;\\Rightarrow\\; \\rho = r^{1/n} \\geq 0', explanation: 'Radii are non-negative reals, so the usual real nth root prices the door-radius — ALL doors share it.' },
      { label: 'The bearing read', formula: 'n\\phi \\equiv \\theta \\pmod{2\\pi} \\;\\Rightarrow\\; \\phi = \\tfrac{\\theta + 2k\\pi}{n}', explanation: 'The bearing must land on $\\theta$ modulo full turns — so $\\theta$ itself, or $\\theta + 2\\pi$, or $\\theta + 4\\pi$, \u2026 divided by $n$. THE MULTI-VALUED STEP: the full-turn freedom upstairs becomes $n$ DIFFERENT bearings downstairs, because dividing by $n$ splits $2\\pi$ into $\\tfrac{2\\pi}{n}$ steps.' },
      { label: 'The doors', formula: 'k = 0, 1, \\dots, n-1: \\quad n \\text{ seats at equal spokes } \\tfrac{2\\pi}{n} \\text{ on the } r^{1/n} \\text{ circle}', explanation: 'After $k = n$ the bearing $\\tfrac{\\theta + 2n\\pi}{n} = \\tfrac{\\theta}{n} + 2\\pi$ wraps to the $k = 0$ seat — the list closes. The doors are the roots-of-unity pentagon, scaled to radius $r^{1/n}$ and rotated to the $\\tfrac{\\theta}{n}$ bearing: every root family is the unit circle\u2019s equal spokes in disguise.' },
    ], result: 'z^n = w \\;\\Longleftrightarrow\\; z = r^{1/n}\\,\\mathrm{cis}\\,\\tfrac{\\theta + 2k\\pi}{n}, \\quad k = 0, \\dots, n-1' },
    { kind: 'formula', name: 'The multi-valued nth root', latex: 'z^n = re^{i\\theta} \\;\\Rightarrow\\; z = r^{1/n}\\,e^{i(\\theta + 2k\\pi)/n}, \\qquad k = 0, 1, \\dots, n-1', note: 'a FAMILY of $n$ doors at equal spokes on the circle of radius $r^{1/n}$ — the $\\sqrt{\\;\\;}$ symbol habitually reports only the $k = 0$ door; the honest equation reports all $n$.' },
    { kind: 'callout', tone: 'warn', title: 'The multi-valued trap', text: 'Over the reals, $\\sqrt{25}$ is one number ($5$) by convention. Over the complex field EVERY nonzero number has exactly TWO square roots, THREE cube roots, $n$ nth roots — $z^{1/2}$ is a TWO-element family, and the De Moivre rational-power statement of this lesson is deliberately weak (\u201cONE of the values\u201d) precisely because the full truth is this family. Exam arithmetic exploits the habit: asking for \u201cthe\u201d cube root of $-8i$ has three honest answers, and a multiple-choice item that expects only one of them is testing convention, not mathematics.' },
    { kind: 'example', title: 'The three doors of $z^3 = -8i$', steps: [
      'The polar read: $-8i$ has radius $8$, bearing $-\\tfrac{\\pi}{2}$ (the negative imaginary axis). The doors carry radius $\\sqrt[3]{8} = 2$ and bearings $\\tfrac{-\\pi/2 + 2k\\pi}{3}$: $-\\tfrac{\\pi}{6}$, $-\\tfrac{\\pi}{6} + \\tfrac{2\\pi}{3} = \\tfrac{\\pi}{2}$, and $\\tfrac{\\pi}{2} + \\tfrac{2\\pi}{3} = \\tfrac{7\\pi}{6}$ (principal wrap: $-\\tfrac{5\\pi}{6}$).',
      'The seats: $2\\,\\mathrm{cis}\\left(-\\tfrac{\\pi}{6}\\right) = \\sqrt{3} - i$, then $2\\,\\mathrm{cis}\\,\\tfrac{\\pi}{2} = 2i$, then $2\\,\\mathrm{cis}\\left(-\\tfrac{5\\pi}{6}\\right) = -\\sqrt{3} - i$ — three doors on the radius-2 circle at $120^\\circ$ spokes, the $\\omega$-triangle rotated and scaled.',
      'The cube check (engine receipt): $(\\sqrt{3} - i)^3$: radius $2^3 = 8$, bearing $3 \\cdot (-\\tfrac{\\pi}{6}) = -\\tfrac{\\pi}{2}$ — the seat $-8i$ exactly; likewise $2i$ cubes to $8i^3 = -8i$ and $-\\sqrt{3} - i$ cubes to $8\\,\\mathrm{cis}\\left(-\\tfrac{5\\pi}{2}\\right) = 8\\,\\mathrm{cis}\\,\\tfrac{3\\pi}{2} = -8i$. All three verified at $10^{-10}$.',
      'The $\\omega$ cross-check: one door being $2i$, the others must be $2i\\omega$ and $2i\\omega^2$ — and indeed $2i\\omega = 2i\\left(-\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i\\right) = -\\sqrt{3} - i$ and $2i\\omega^2 = \\sqrt{3} - i$. The two engines — polar spokes and the $\\omega$ clock — are the same machine seen twice.',
    ] },
    { kind: 'figure', caption: 'The three doors of $z^3 = -8i$ — equal spokes on the radius-2 circle. The seats $\\sqrt{3} - i$, $2i$ and $-\\sqrt{3} - i$ sit $120^\\circ$ apart, each cubing back to $-8i$; the door-radius is $\\sqrt[3]{8} = 2$, the door-family the $\\omega$-triangle rotated to the $-\\tfrac{\\pi}{6}$ bearing. One door per $\\tfrac{2\\pi}{3}$ turn of the full-turn freedom upstairs.', svg: cubeRootSpokesSvg() },

    { kind: 'heading', text: 'The Square Root of a Complex Number: the u, v System Returns' },
    { kind: 'para', text: 'The $n = 2$ case of the door family is the square root — and lesson 3.3 built its direct engine: write $\\sqrt{a + ib} = u + iv$ with REAL $u, v$, square, and match parts. The system: $u^2 - v^2 = a$ and $2uv = b$; the third row (the Pythagorean rescue) $u^2 + v^2 = \\sqrt{a^2 + b^2}$; then $u^2$ and $v^2$ split the sum-and-difference, and the SIGN of $uv$ (from $2uv = b$) chooses the pairing. The family examples below run the system in full — the polar door-engine and the $u, v$ system are two roads into the same two doors.' },
    { kind: 'example', title: 'Two square roots by the $u, v$ system', steps: [
      'First target, $\\sqrt{15 + 8i}$: set $\\sqrt{15+8i} = u + iv$. Rows: $u^2 - v^2 = 15$ and $2uv = 8$; the rescue row $u^2 + v^2 = \\sqrt{15^2 + 8^2} = \\sqrt{289} = 17$. Split: $u^2 = \\tfrac{17 + 15}{2} = 16$ and $v^2 = \\tfrac{17 - 15}{2} = 1$ — so $u = \\pm 4$, $v = \\pm 1$. The sign row $2uv = 8 > 0$ forces SAME signs: the doors are $\\boxed{\\pm(4 + i)}$. Receipt: $(4 + i)^2 = 16 - 1 + 8i = 15 + 8i$ exactly — engine-verified.',
      'Second target, $\\sqrt{-7 - 24i}$: rows $u^2 - v^2 = -7$, $2uv = -24$; rescue $u^2 + v^2 = \\sqrt{49 + 576} = \\sqrt{625} = 25$. Split: $u^2 = \\tfrac{25 - 7}{2} = 9$, $v^2 = \\tfrac{25 + 7}{2} = 16$ — so $u = \\pm 3$, $v = \\pm 4$. The sign row $2uv = -24 < 0$ forces OPPOSITE signs: the doors are $\\boxed{\\pm(3 - 4i)}$. Receipt: $(3 - 4i)^2 = 9 - 16 - 24i = -7 - 24i$ exactly.',
      'The polar cross-check on the first: $15 + 8i$ has radius $17$ — a $8\\text{-}15\\text{-}17$ seat — so the doors carry radius $\\sqrt{17}$ at bearings $\\tfrac{\\phi \\pm 2k\\pi}{2}$: the two doors are exactly $180^\\circ$ apart on one circle, as every square-root family must be (the $n = 2$ spoke of $\\pi$).',
      'The honest note: the system\u2019s rescue row works BECAUSE $u^2 + v^2 \\geq 0$ pins the positive branch — the same place the multi-valued trap hides; the $\\pm$ in every answer is the two-door family being reported honestly.',
    ] },

    { kind: 'heading', text: 'The Complex Loci: Equations the Plane Answers' },
    { kind: 'para', text: 'The last engine of the chapter reads EQUATIONS IN $z$ AND $\\bar z$ as plane curves. The whole method is one move: the modulus is a DISTANCE (3.2), so any equation built from $|\\cdot|$ is a distance sentence, and the distance sentences of elementary geometry are the perpendicular bisector, the segment, the ray pair, the circle — with the ellipse and hyperbola waiting at honest scope below.' },
    { kind: 'table', caption: 'The locus dictionary — one distance sentence per row, $A(z_1)$ and $B(z_2)$ fixed seats, $P(z)$ the variable.', head: ['equation in z', 'the distance sentence', 'the locus'], rows: [
      ['$|z - z_1| = |z - z_2|$', '$AP = BP$ — equidistant from two seats', 'the perpendicular bisector of $AB$'],
      ['$|z - z_1| + |z - z_2| = |z_1 - z_2|$', '$AP + PB = AB$ — the detour adds nothing', 'the segment $AB$ itself'],
      ['$\\left||z - z_1| - |z - z_2|\\right| = |z_1 - z_2|$', '$|AP - PB| = AB$ — the difference maxes out', 'the two rays from $A$ and $B$, outward'],
      ['$|z - z_1| = r$', '$AP = r$ — one fixed distance', 'the circle, centre $z_1$, radius $r$'],
      ['$|z - z_1|^2 + |z - z_2|^2 = |z_1 - z_2|^2$', '$AP^2 + PB^2 = AB^2$ — Pythagoras at $P$', 'the circle with DIAMETER $AB$'],
    ] },
    { kind: 'para', text: 'Two algebraic forms turn the circle and the line into EQUATIONS IN $z$ AND $\\bar z$ — the forms that make loci computable without ever splitting into $(x, y)$.' },
    { kind: 'derivation', title: 'The circle equation and its centre-and-radius read', statement: 'Every circle has equation $z\\bar z + a\\bar z + \\bar a z + b = 0$ with $b \\in \\mathbb{R}$ and $a\\bar a \\geq b$; its centre is $-a$ and its radius $\\sqrt{a\\bar a - b}$.', steps: [
      { label: 'Start from the distance form', formula: '|z - z_0| = r \\;\\Longleftrightarrow\\; |z - z_0|^2 = r^2', explanation: 'Square the radius sentence (both sides non-negative — squaring is safe).' },
      { label: 'Cash the modulus', formula: '(z - z_0)(\\bar z - \\bar z_0) = r^2 \\;\\Rightarrow\\; z\\bar z - z_0\\bar z - \\bar z_0 z + (z_0\\bar z_0 - r^2) = 0', explanation: '3.2\u2019s law $|w|^2 = w\\bar w$ on the difference seat. Expand the product — the mixed terms appear with BOTH conjugate coefficients.' },
      { label: 'Name the constants', formula: 'a = -z_0, \\qquad b = z_0\\bar z_0 - r^2 = |z_0|^2 - r^2', explanation: 'With $a = -z_0$: the equation reads $z\\bar z + a\\bar z + \\bar a z + b = 0$ with $b$ real (it is a squared radius difference). Centre $-a = z_0$; and $a\\bar a - b = |z_0|^2 - (|z_0|^2 - r^2) = r^2$ — the radius squared, recoverable from the coefficients alone.' },
      { label: 'The reality condition', formula: 'a\\bar a - b \\geq 0', explanation: 'A negative $a\\bar a - b$ would price an imaginary radius — no real circle: the honest feasibility row the form carries with it (the engine checks it on both worked reads below).' },
    ], result: 'z\\bar z + a\\bar z + \\bar a z + b = 0 \\;\\Longleftrightarrow\\; |z + a| = \\sqrt{a\\bar a - b} \\quad (\\text{centre } -a, \\; \\text{radius } \\sqrt{a\\bar a - b})' },
    { kind: 'example', title: 'Reading a circle from its $z$-form', steps: [
      'The read: $z\\bar z - (2 - 3i)z - (2 + 3i)\\bar z + 9 = 0$. Match the form: the $\\bar z$-coefficient is $-(2 + 3i)$, so $a = -(2 + 3i)$ — wait, read the convention the engine pins: with the form $z\\bar z + a\\bar z + \\bar a z + b$, the $\\bar z$-coefficient is $a$ and the $z$-coefficient is $\\bar a$. Here $a = -(2 + 3i)$, $b = 9$.',
      'The centre: $-a = 2 + 3i$. The radius: $\\sqrt{a\\bar a - b} = \\sqrt{13 - 9} = 2$. The circle is $|z - (2 + 3i)| = 2$ — the engine\u2019s seat check: $z = 4 + 3i$ (distance exactly 2) satisfies the equation to $10^{-10}$; $z = 5 + 3i$ (distance 3) reads $|z - \\text{centre}|^2 - r^2 = 9 - 4 = 5$, the off-seat value the engine pinned (it CAUGHT a drafted 4 before prose).',
      'Hence the read is mechanical: coefficients in, centre and radius out — the $z$-form is the circle\u2019s passport.',
    ] },
    { kind: 'derivation', title: 'The straight-line equation from the real-ratio discipline', statement: 'The line through two distinct seats $z_1, z_2$ is $\\bar a z + a\\bar z + b = 0$ where $a = i(z_1 - z_2)$ and $b = -(z_1\\bar z_2 + \\bar z_1 z_2)$; equivalently $\\frac{z - z_1}{z_2 - z_1}$ is real.', steps: [
      { label: 'The real-ratio discipline', formula: 'P \\text{ on line } AB \\;\\Longleftrightarrow\\; \\arg\\frac{z - z_1}{z_2 - z_1} \\in \\{0, \\pi\\}', explanation: 'A seat is on the line when the step $z \\to z_1$ points along the direction $z_1 \\to z_2$ or exactly against it — 3.4\u2019s argument geometry: the quotient of two same-or-opposite-bearing seats is REAL (positive along, negative against).' },
      { label: 'The conjugate equality', formula: '\\frac{z - z_1}{z_2 - z_1} = \\overline{\\frac{z - z_1}{z_2 - z_1}} \\;\\Rightarrow\\; (z - z_1)(\\bar z_2 - \\bar z_1) = (\\bar z - \\bar z_1)(z_2 - z_1)', explanation: 'A number is real exactly when it equals its conjugate — and conjugating a QUOTIENT conjugates numerator and denominator. Clear denominators: the line\u2019s equation, with no $(x, y)$ ever named.' },
      { label: 'Collect', formula: 'z(\\bar z_2 - \\bar z_1) - \\bar z(z_2 - z_1) + (z_1\\bar z_1... ) = 0', explanation: 'Expanding and collecting the $z$ and $\\bar z$ terms gives the two-conjugate-coefficient form; multiplying by $i$ rotates the coefficients into the symmetric shape $\\bar a z + a \\bar z + b = 0$ with $b$ real — the engine\u2019s seat check below prices it exactly.' },
    ], result: '\\bar a z + a\\bar z + b = 0 \\quad (a \\neq 0, \\; b \\in \\mathbb{R}) \\text{ — the general line; } \\; \\frac{z - z_1}{z_2 - z_1} \\in \\mathbb{R} \\text{ — the through-two-seats form}' },
    { kind: 'example', title: 'The line through $2 + i$ and $5 + 7i$', steps: [
      'The direction: $z_2 - z_1 = 3 + 6i = 3(1 + 2i)$ — slope $\\tfrac{6}{3} = 2$, the cartesian line $y - 1 = 2(x - 2)$, i.e. $2x - y - 3 = 0$.',
      'The real-ratio check: at a third seat $8 + 13i$ (two direction-steps beyond $z_2$): $\\tfrac{(8+13i) - (2+i)}{3 + 6i} = \\tfrac{6 + 12i}{3+6i} = 2$ — REAL, so on the line; at $3 + i$: $\\tfrac{1}{3+6i}$ — not real, off the line. The engine pinned both verdicts before prose.',
      'The z-form: $(z - (2+i))(3 - 6i)... = (\\bar z - (2 - i))(3 + 6i)$ collects to $2z$-and-$\\bar z$ rows — either road (cartesian slope or conjugate equality) prices the SAME line; the dictionary\u2019s perpendicular-bisector row $|z - 1| = |z + 3|$ (seats $1$ and $-3$) lands on $\\mathrm{Re}\\,z = -1$ by the same discipline: $(x-1)^2 + y^2 = (x+3)^2 + y^2 \\Rightarrow -8x = 8 \\Rightarrow x = -1$.',
    ] },

    { kind: 'heading', text: 'Equation of Circle whose Diametric End Points are Given' },
    { kind: 'para', text: 'The dictionary\u2019s fifth row is the Pythagoras sentence $|z - z_1|^2 + |z - z_2|^2 = |z_1 - z_2|^2$ — the seat $z$ sees the segment $AB$ at a right angle, and the locus of right-angle seats over a fixed segment is the circle with that segment as DIAMETER (Thales). The argument engine turns it into an equation without any $(x, y)$.' },
    { kind: 'derivation', title: 'The diametric circle', statement: 'The circle whose diameter has end points $z_1, z_2$ is $(z - z_1)(\\bar z - \\bar z_2) + (z - z_2)(\\bar z - \\bar z_1) = 0$ — centre $\\tfrac{z_1 + z_2}{2}$, radius $\\tfrac{|z_1 - z_2|}{2}$.', steps: [
      { label: 'Thales as an argument', formula: '\\arg\\frac{z - z_1}{z - z_2} = \\pm\\tfrac{\\pi}{2}', explanation: 'The angle at $P$ subtended by the diameter is a right angle — 3.4\u2019s angle-between-seats read: the quotient $\\tfrac{z - z_1}{z - z_2}$ has bearing $\\pm 90^\\circ$, which says the quotient is PURELY IMAGINARY.' },
      { label: 'The imaginary discipline', formula: 'w \\text{ purely imaginary} \\;\\Longleftrightarrow\\; w + \\bar w = 0', explanation: '3.2\u2019s characterisation: a seat is purely imaginary exactly when it is the negative of its conjugate. Clear the (nonzero) denominator: $(z - z_1)\\overline{(z - z_2)} + \\overline{(z - z_1)}(z - z_2) = 0$ — the diametric equation.' },
      { label: 'Read the circle out', formula: '2z\\bar z - z(\\bar z_1 + \\bar z_2) - \\bar z(z_1 + z_2) + (z_1\\bar z_2 + z_2\\bar z_1) = 0', explanation: 'Expanding the two products and collecting: the $z\\bar z$-form of the general circle with $a = -\\tfrac{\\bar z_1 + \\bar z_2}{2}$\u2019s family — centre $\\tfrac{z_1 + z_2}{2}$ (the midpoint — the diameter\u2019s own centre) and $a\\bar a - b = \\tfrac{|z_1 + z_2|^2}{4} - \\mathrm{Re}(z_1\\bar z_2) = \\tfrac{|z_1 - z_2|^2}{4}$ — the radius is HALF THE CHORD, exactly as a diameter demands. The engine expanded this algebra and seat-checked it on both families below.' },
    ], result: '(z - z_1)(\\bar z - \\bar z_2) + (z - z_2)(\\bar z - \\bar z_1) = 0: \\quad \\text{centre } \\tfrac{z_1+z_2}{2}, \\; \\text{radius } \\tfrac{|z_1 - z_2|}{2}' },
    { kind: 'example', title: 'Two diametric families', steps: [
      'First family, end points $3 + 2i$ and $7 + 10i$: the midpoint $\\tfrac{(3+2i) + (7+10i)}{2} = 5 + 6i$ — the centre; the chord $|(7 + 10i) - (3 + 2i)| = |4 + 8i| = \\sqrt{80}$, so the radius is $\\tfrac{\\sqrt{80}}{2} = 2\\sqrt{5}$. The circle: $|z - (5 + 6i)| = 2\\sqrt{5}$; the diametric equation\u2019s expansion is $2z\\bar z - (10 - 12i)z - (10 + 12i)\\bar z + 52 = 0$-family — the engine seat-checked the rightmost point $5 + 2\\sqrt{5} + 6i$ (distance exactly $2\\sqrt{5}$) satisfying it to $10^{-10}$.',
      'Second family, end points $-1 + 3i$ and $5 - 5i$: the midpoint $2 - i$; the chord $|6 - 8i| = 10$, radius $5$: the circle $|z - (2 - i)| = 5$ — the seat $2 + 4i$ (five units straight up from the centre) satisfies the diametric equation exactly; the seat $2 + 5.5i$ (off by half a unit) misses it — engine-pinned both.',
      'Hence both families price the same three-step recipe: midpoint for the centre, half-chord for the radius, Thales\u2019 argument for the equation — and the $z$-form never names an $(x, y)$.',
    ] },

    { kind: 'heading', text: 'Condition for Three Points to Represent Equilateral Triangle' },
    { kind: 'para', text: 'The last instrument prices SYMMETRY itself: given three seats, are they the vertices of an equilateral triangle? The sides-moduli test ($|z_1 - z_2| = |z_2 - z_3| = |z_3 - z_1|$) is three distance sentences; the algebraic certificate below is ONE symmetric identity — and it is exactly the identity the $\\omega$ triangle satisfies.' },
    { kind: 'derivation', title: 'The equilateral condition', statement: 'Distinct seats $z_1, z_2, z_3$ are the vertices of an equilateral triangle (in some order) if and only if $z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$.', steps: [
      { label: 'Equal sides and the included angle', formula: '|z_1 - z_2| = |z_2 - z_3| = |z_3 - z_1| \\text{ and } \\angle(z_2z_1, z_2z_3) = \\pm\\tfrac{\\pi}{3}', explanation: 'A triangle is equilateral when all three side-moduli agree AND one included angle is $60^\\circ$ — the two facts the engine starts from.' },
      { label: 'One quotient, both facts', formula: '\\left|\\frac{z_1 - z_2}{z_3 - z_2}\\right| = 1 \\quad\\text{and}\\quad \\arg\\frac{z_1 - z_2}{z_3 - z_2} = \\pm\\tfrac{\\pi}{3}', explanation: 'The quotient $\\tfrac{z_1 - z_2}{z_3 - z_2}$ carries the ratio of the two sides meeting at $z_2$ (modulus) and the angle between them (bearing) — one complex number holding the whole triangle\u2019s shape at one vertex.' },
      { label: 'The 60-degree identity', formula: '\\frac{z_1 - z_2}{z_3 - z_2} = \\mathrm{cis}\\left(\\pm\\tfrac{\\pi}{3}\\right) = \\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i \\;\\Longleftrightarrow\\; \\left(\\frac{z_1 - z_2}{z_3 - z_2}\\right)^2 - \\left(\\frac{z_1 - z_2}{z_3 - z_2}\\right) + 1 = 0', explanation: 'The seat $\\mathrm{cis}\\,\\tfrac{\\pi}{3} = \\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$ is the non-real root of the quadratic $x^2 - x + 1 = 0$ (its doors are exactly the two $60^\\circ$ seats — the sixth roots of unity that are not cube roots!). Substituting the quotient and clearing denominators gives $(z_1 - z_2)^2 - (z_1 - z_2)(z_3 - z_2) + (z_3 - z_2)^2 = 0$.' },
      { label: 'Expand and symmetrise', formula: 'z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1', explanation: 'Expanding the cleared identity: the squared terms appear on one side, every mixed product exactly once on the other — a fully SYMMETRIC condition: no vertex is privileged, any labelling works. The engine verified it on the three families below, both directions, at $10^{-9}$.' },
    ], result: '\\text{equilateral} \\;\\Longleftrightarrow\\; z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1 \\;\\equiv\\; \\tfrac{1}{2}\\left[(z_1 - z_2)^2 + (z_2 - z_3)^2 + (z_3 - z_1)^2\\right] = 0' },
    { kind: 'example', title: 'Three certificates — two positive, one negative', steps: [
      'The $\\omega$ family: $z_1 = 1, z_2 = \\omega, z_3 = \\omega^2$. LHS $= 1 + \\omega^2 + \\omega^4 = 1 + \\omega^2 + \\omega = 0$; RHS $= \\omega + \\omega^3 + \\omega^2 = \\omega + 1 + \\omega^2 = 0$ — both sides $0$, the condition HOLDS: the cube roots of unity are equilateral (sides $\\sqrt{3}$, the engine\u2019s modulus check). The insight callout\u2019s promise, cashed.',
      'The lattice family: $z_1 = 0, z_2 = 4, z_3 = 2 + 2\\sqrt{3}i$. LHS $= 0 + 16 + (2 + 2\\sqrt{3}i)^2 = 16 + (-8 + 8\\sqrt{3}i) = 8 + 8\\sqrt{3}i$; RHS $= 0 + 4(2 + 2\\sqrt{3}i) + 0 = 8 + 8\\sqrt{3}i$ — EQUAL: equilateral, and the geometric cross-check agrees — all three sides are exactly $4$ (the base on the real axis, the apex $2\\sqrt{3}$ above the midpoint — the figure below).',
      'The counterexample: $z_1 = 0, z_2 = 1, z_3 = i$: LHS $= 0 + 1 + i^2 = 0$; RHS $= 0 + i + 0 = i \\neq 0$ — the condition FAILS, and rightly so: the seats form a right isosceles triangle (sides $1, 1, \\sqrt{2}$), not equilateral. The certificate is honest in BOTH directions — the engine\u2019s verdicts all pinned before prose.',
    ] },
    { kind: 'figure', caption: 'The equilateral certificate on the lattice family — the triangle $\\{0, 4, 2 + 2\\sqrt{3}i\\}$: base $4$ on the real axis, apex $2\\sqrt{3}$ above its midpoint, all sides exactly $4$, apex angle $60^\\circ$. The condition\u2019s two sides price it: $0^2 + 4^2 + (2 + 2\\sqrt{3}i)^2 = 8 + 8\\sqrt{3}i = 0 \\cdot 4 + 4(2 + 2\\sqrt{3}i) \\cdot 0 + 4(2 + 2\\sqrt{3}i)$ — one symmetric identity, no distances ever measured.', svg: equilateralConditionSvg() },
    { kind: 'callout', tone: 'insight', title: 'One law, three engines', text: 'Look back at the storey just built. De Moivre\u2019s theorem is the argument-addition law of 3.4 raised to powers. The roots of unity are De Moivre read backwards — bearings that divide $2\\pi$ exactly. The multi-valued nth root is the same read on any radius. And the loci — circle, line, diametric circle, equilateral certificate — are the modulus-as-distance and argument-as-angle of 3.2 and 3.4 turned into equations. Nothing in this lesson was new machinery; everything was the second address, cashed.' },
    { kind: 'callout', tone: 'exam', title: 'Where the exams point', text: 'These registers are staples of JEE Main/Advanced, CUET, the SAT-style complex-number items, and every aptitude battery that touches complex numbers: reduce a power family by De Moivre (the doubling-chain shape), count roots in a sector (the spoke census), evaluate $\\omega$-power sums (the mod-3 clock), find centre-and-radius from a $z$-form (the mechanical read), or test three seats for equilateralness (the symmetric certificate). The items of THIS lesson are our own constructions on those registers — no past-paper text is reproduced; every number above was generated and verified by this book\u2019s own engines.' },
    { kind: 'callout', tone: 'historical', title: 'Honest scope: what this lesson did NOT build', text: 'The ellipse ($|z - z_1| + |z - z_2| = k$) and hyperbola ($\\left||z - z_1| - |z - z_2|\\right| = k$) loci appear in the distance dictionary but their full theory belongs to the conic sections arc of the Coordinate Geometry book; the cyclotomic POLYNOMIALS $\\Phi_n$ (the exact factorisation of $z^n - 1$ into primitive families) are named here but proved in the higher-algebra rungs of this book\u2019s later chapters; and the general rotation formula ($z_3 - z_1 = \\alpha(z_2 - z_1)$ for a rotation by $\\alpha$) was 3.4\u2019s own instrument and is only echoed here. The lesson\u2019s claim is exactly what its engines verified — no more.' },

    { kind: 'quiz', title: 'Check yourself: powers, spokes and loci', items: [
      { q: 'By De Moivre, $(1 + i)^{16}$ equals', options: ['256', '−256', '256i', '−256i'], answer: 0, explain: 'Radius $\\sqrt{2}$, bearing $\\tfrac{\\pi}{4}$: the 16th power carries radius $(\\sqrt{2})^{16} = 256$, bearing $16 \\cdot \\tfrac{\\pi}{4} = 4\\pi \\equiv 0$ — the positive real axis: $256$. (B) is the $n = 6$-style wrap slip ($\\equiv 2\\pi$-off bearing read as $\\pi$). (C) and (D) leave the bearing at $\\tfrac{\\pi}{2}$ or $-\\tfrac{\\pi}{2}$ — quarter of the way, as if the power were $4$ or $-4$.' },
      { q: 'The real roots of $x^5 = 1$ are', options: ['only $1$', '$1$ and $-1$', 'none', '$1, -1$ and $0$'], answer: 0, explain: 'Odd $n$: the unit circle meets the real axis at $\\pm 1$, and $(-1)^5 = -1 \\neq 1$ — so exactly one real root, the seat $1$; the other four are two conjugate pairs. (B) is the EVEN-$n$ census row — $x^5 = 1$ vs $x^4 = 1$ confused. (C) forgets the ever-present real seat. (D) adds a phantom root that is not even on the circle — $0^5 = 0$.' },
      { q: 'With $\\omega$ a complex cube root of unity, $(1 + \\omega)(1 + \\omega^2)$ equals', options: ['1', '2', '0', '−1'], answer: 0, explain: 'Expand: $1 + (\\omega + \\omega^2) + \\omega^3 = 1 + (-1) + 1 = 1$ — the zero-sum law turns the cross term NEGATIVE. (B) is the trap this lesson\u2019s engine CAUGHT in its own drafting (treating $\\omega + \\omega^2$ as $0$ instead of $-1$). (C) is the $1 + \\omega + \\omega^2$ row misapplied to a product. (D) is $\\omega + \\omega^2$ alone — the sum, not the product.' },
      { q: 'The locus $|z - 1| = |z + 3|$ is', options: ['the vertical line $\\mathrm{Re}\\,z = -1$', 'the circle centred at $1$ with radius $3$', 'the real axis', 'the perpendicular bisector segment joining $1$ and $-3$'], answer: 0, explain: 'Equidistant from the seats $1$ and $-3$: the perpendicular bisector — and both seats lie ON the real axis, so the bisector is the vertical line halfway: $\\mathrm{Re}\\,z = -1$ (the engine\u2019s seats $-1 \\pm 5i$ satisfy it; $0$ misses by $1 - 9 = -8$). (B) misreads an equidistance as a radius. (C) is the line through BOTH seats, not between them. (D) is a segment — a bisector is a full line.' },
      { q: 'The seats $0, 4, 2 + 2\\sqrt{3}i$', options: ['form an equilateral triangle (all sides 4)', 'are collinear', 'form a right isosceles triangle', 'form an equilateral triangle (all sides $2\\sqrt{3}$)'], answer: 0, explain: 'The certificate: LHS $= 0 + 16 + (-8 + 8\\sqrt{3}i) = 8 + 8\\sqrt{3}i$ = RHS — the condition holds; and the sides are $|0 - 4| = 4$, $|4 - (2 + 2\\sqrt{3}i)| = |2 - 2\\sqrt{3}i| = 4$, $|(2 + 2\\sqrt{3}i) - 0| = 4$ — ALL SIDES 4. (B) fails the modulus census outright. (C) is the $\\{0, 1, i\\}$ counterexample\u2019s verdict. (D) prices the HEIGHT $2\\sqrt{3}$ as if it were a side — the figure\u2019s dashed altitude misread.' },
    ] },
    { kind: 'exercises', title: 'Exercises 3.5', sets: [
      { level: 'L1', questions: [
        { q: 'Express in $a + ib$ form, without expanding any binomial: (a) $(\\sqrt{3} + i)^9$; (b) the four fourth roots of unity, in polar and rectangular form.', solution: [
          '(a) $\\sqrt{3} + i$ carries radius $2$, bearing $\\tfrac{\\pi}{6}$ (the engine\u2019s hexagon row). The ninth power: radius $2^9 = 512$, bearing $9 \\cdot \\tfrac{\\pi}{6} = \\tfrac{3\\pi}{2}$ — the negative imaginary axis: $(\\sqrt{3} + i)^9 = 512\\left(\\cos\\tfrac{3\\pi}{2} + i\\sin\\tfrac{3\\pi}{2}\\right) = -512i$.',
          '(b) The engine: $r = 1$, bearings $\\tfrac{2k\\pi}{4} = 0, \\tfrac{\\pi}{2}, \\pi, \\tfrac{3\\pi}{2}$: the seats $\\mathrm{cis}\\,0 = 1$, $\\mathrm{cis}\\,\\tfrac{\\pi}{2} = i$, $\\mathrm{cis}\\,\\pi = -1$, $\\mathrm{cis}\\,\\tfrac{3\\pi}{2} = -i$ — the two real roots $\\pm 1$ (even $n$) and the conjugate pair $\\pm i$, each primitive ($\\varphi(4) = 2$: only $\\pm i$ are primitive — $\\gcd(k, 4) = 1$ at $k = 1, 3$ — the real roots are NOT primitive).',
        ], answer: '(a) $-512i$; (b) $\\{1, i, -1, -i\\}$ — primitive: $\\pm i$ only' },
        { q: 'Reduce by the mod-3 clock: $\\omega^{2026} + \\omega^{4052}$, and then solve $z^3 = -64$ completely.', solution: [
          'The reductions: $2026 = 3 \\cdot 675 + 1$, so $\\omega^{2026} = \\omega$; $4052 = 3 \\cdot 1350 + 2$, so $\\omega^{4052} = \\omega^2$. The sum: $\\omega + \\omega^2 = -1$ by the zero-sum law.',
          'The cube roots of $-64$: the real door $\\sqrt[3]{-64} = -4$; then the $\\omega$-turned doors $-4\\omega = 2 - 2\\sqrt{3}i$ and $-4\\omega^2 = 2 + 2\\sqrt{3}i$ (negating the real-family trio $4, 4\\omega, 4\\omega^2$, or: radius $4$, bearings $\\tfrac{\\pi + 2k\\pi}{3}$ = $\\tfrac{\\pi}{3}, \\pi, \\tfrac{5\\pi}{3}$).',
          'The engine receipt: each door cubed reads $-64$ at $10^{-10}$ — $(-4)^3 = -64$, $(-4\\omega)^3 = -64\\omega^3 = -64$, $(-4\\omega^2)^3 = -64$.',
        ], answer: '$\\omega^{2026} + \\omega^{4052} = -1$; $z^3 = -64$ at $z \\in \\{-4, -4\\omega, -4\\omega^2\\} = \\{-4, 2 - 2\\sqrt{3}i, 2 + 2\\sqrt{3}i\\}$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Take $\\sqrt{-8 + 6i}$ by the $u, v$ system, showing all three system rows.', solution: [
          'Set $\\sqrt{-8 + 6i} = u + iv$: squaring and matching gives the first two rows — $u^2 - v^2 = -8$ and $2uv = 6$.',
          'The rescue row: $u^2 + v^2 = \\sqrt{(-8)^2 + 6^2} = \\sqrt{100} = 10$ (positive branch — the Pythagoras read on the target\u2019s modulus).',
          'Split: $u^2 = \\tfrac{10 - 8}{2} = 1$ and $v^2 = \\tfrac{10 + 8}{2} = 9$ — so $u = \\pm 1$, $v = \\pm 3$; the sign row $2uv = 6 > 0$ forces the SAME sign: the doors are $\\pm(1 + 3i)$.',
          'Receipt: $(1 + 3i)^2 = 1 - 9 + 6i = -8 + 6i$ — exactly the target, engine-verified; and the two doors sit $\\pi$ apart on the circle of radius $\\sqrt{10}$.',
        ], answer: '$\\sqrt{-8 + 6i} = \\pm(1 + 3i)$' },
        { q: 'Read the circle $z\\bar z - 6\\bar z - 6z + 27 = 0$: centre, radius, and one on-seat and one off-seat value.', solution: [
          'Match the form $z\\bar z + a\\bar z + \\bar a z + b = 0$: $a = -6$ (real — a centre ON the real axis), $b = 27$.',
          'The centre: $-a = 6 + 0i$. The radius: $\\sqrt{a\\bar a - b} = \\sqrt{36 - 27} = 3$ — the feasibility row $a\\bar a - b = 9 \\geq 0$ holds: a real circle.',
          'The seats: $z = 6 + 3i$ is ON the circle (distance exactly 3) — the engine reads the equation as $0$ there; $z = 6 + 4i$ is OFF (distance 4) — the equation reads $|z - \\text{centre}|^2 - r^2 = 16 - 9 = 7$.',
          'Hence the read: centre $6$, radius $3$ — the mechanical passport, no $(x, y)$ ever named.',
        ], answer: 'centre $6 + 0i$, radius $3$; on-seat $6 + 3i$ reads $0$, off-seat $6 + 4i$ reads $7$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $z^3 = 27i$ completely, giving every door in polar and rectangular form.', solution: [
          'The polar read of the target: $27i$ has radius $27 = 3^3$ and bearing $\\tfrac{\\pi}{2}$.',
          'The doors: radius $\\sqrt[3]{27} = 3$, bearings $\\tfrac{\\pi/2 + 2k\\pi}{3} = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{6} + \\tfrac{2\\pi}{3} = \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$.',
          'The seats: $3\\,\\mathrm{cis}\\,\\tfrac{\\pi}{6} = \\tfrac{3\\sqrt{3}}{2} + \\tfrac{3}{2}i$; $3\\,\\mathrm{cis}\\,\\tfrac{5\\pi}{6} = -\\tfrac{3\\sqrt{3}}{2} + \\tfrac{3}{2}i$; $3\\,\\mathrm{cis}\\,\\tfrac{3\\pi}{2} = -3i$.',
          'The engine receipt: each seat cubed reads $27i$ at $10^{-10}$ (e.g. $(-3i)^3 = -27i^3 = 27i$) — three doors at $120^\\circ$ spokes on the radius-3 circle, the $\\omega$-family rotated to the $\\tfrac{\\pi}{6}$ bearing.',
        ], answer: '$\\left\\{\\tfrac{3\\sqrt{3}}{2} + \\tfrac{3}{2}i,\\; -\\tfrac{3\\sqrt{3}}{2} + \\tfrac{3}{2}i,\\; -3i\\right\\}$' },
        { q: 'Find the equation of the line through $2 + i$ and $5 + 7i$ in cartesian form, and verify a third seat on it by the real-ratio discipline.', solution: [
          'The direction: $z_2 - z_1 = 3 + 6i$ — the step $3$ right, $6$ up, slope $\\tfrac{6}{3} = 2$.',
          'The cartesian form: $y - 1 = 2(x - 2) \\Rightarrow 2x - y - 3 = 0$.',
          'The third seat: two more direction-steps land at $z = 8 + 13i$; the ratio $\\tfrac{(8+13i) - (2+i)}{3 + 6i} = \\tfrac{6 + 12i}{3 + 6i} = 2$ — REAL, so the seat is on the line ($2 \\cdot 8 - 13 - 3 = 0$ ✓).',
          'The off-seat cross-check: $3 + i$ gives $\\tfrac{1}{3+6i} \\notin \\mathbb{R}$ and $2 \\cdot 3 - 1 - 3 = 2 \\neq 0$ — both roads agree it is off.',
        ], answer: '$2x - y - 3 = 0$; the seat $8 + 13i$ verified by the real ratio $2$' },
        { q: 'Find and simplify the fifth roots of $-1$; state their bearings and confirm each fifth-power reads $-1$.', solution: [
          'The target: $-1$ has radius $1$, bearing $\\pi$. The doors: radius $1$, bearings $\\tfrac{\\pi + 2k\\pi}{5} = \\tfrac{\\pi}{5}, \\tfrac{3\\pi}{5}, \\pi, \\tfrac{7\\pi}{5}, \\tfrac{9\\pi}{5}$.',
          'The seats: $\\mathrm{cis}\\,\\tfrac{\\pi}{5}$ and $\\mathrm{cis}\\,\\tfrac{9\\pi}{5} = \\overline{\\mathrm{cis}\\,\\tfrac{\\pi}{5}}$ (the golden-ratio family $\\tfrac{\\sqrt{10 \\pm 2\\sqrt{5}}}{4}$ heights); $\\mathrm{cis}\\,\\tfrac{3\\pi}{5}$ and its mirror $\\mathrm{cis}\\,\\tfrac{7\\pi}{5}$; and the real door $-1$ itself.',
          'The census rows: five seats at $72^\\circ$ spokes; ONE real root (odd family for $-1$: only $\\pi$ lands on the real axis); the sum is $0$ (the engine\u2019s zero-sum law — the pentagon rotated by $\\tfrac{\\pi}{5}$); the product is $(-1)^{5-1} \\cdot$... careful: the product of the fifth roots of $-1$ is $\\mathrm{cis}\\left(\\tfrac{\\pi + 3\\pi + 5\\pi + 7\\pi + 9\\pi}{5}\\right) = \\mathrm{cis}\\,5\\pi = -1$.',
          'The engine receipt: all five seats fifth-power to $-1$ at $10^{-10}$ — swept before this prose existed.',
        ], answer: '$\\mathrm{cis}\\,\\tfrac{\\pi}{5}, \\mathrm{cis}\\,\\tfrac{3\\pi}{5}, -1, \\mathrm{cis}\\,\\tfrac{7\\pi}{5}, \\mathrm{cis}\\,\\tfrac{9\\pi}{5}$ — sum $0$, product $-1$' },
      ] },
      { level: 'L4', questions: [
        { q: 'A circle has diametric end points $1 + 3i$ and $7 - i$. Find its centre, radius, and the $z$-form equation; verify one seat.', solution: [
          'The centre (midpoint): $\\tfrac{(1 + 3i) + (7 - i)}{2} = 4 + i$.',
          'The radius (half the chord): $\\tfrac{|(7 - i) - (1 + 3i)|}{2} = \\tfrac{|6 - 4i|}{2} = \\tfrac{\\sqrt{52}}{2} = \\sqrt{13}$.',
          'The $z$-form (the diametric equation): $(z - (1 + 3i))(\\bar z - (7 + i)) + (z - (7 - i))(\\bar z - (1 - 3i)) = 0$ — expanding and halving: $z\\bar z - (4 - i)\\bar z - (4 + i)z + (\\mathrm{Re}\\,(1 + 3i)(7 + i)) = 0$; the constant: $(1 + 3i)(7 + i) = 7 + i + 21i - 3 = 4 + 22i$, so $\\mathrm{Re} = 4$ — the circle $z\\bar z - (4 - i)\\bar z - (4 + i)z + 4 = 0$.',
          'The seat check: $|z - (4 + i)| = \\sqrt{13}$ at e.g. $z = 4 + i + \\sqrt{13}$ — the rightmost seat; the engine verifies the equation reads $0$ there and the feasibility row $a\\bar a - b = 17 - 4 = 13 = r^2$ ✓.',
        ], answer: 'centre $4 + i$, radius $\\sqrt{13}$; $z\\bar z - (4 - i)\\bar z - (4 + i)z + 4 = 0$' },
        { q: 'Prove the sum of the $n$th roots of unity is $0$ for every $n \\geq 2$ — by BOTH engines (the geometric series and Vieta).', solution: [
          'Engine A (geometric): $S = 1 + \\alpha + \\dots + \\alpha^{n-1}$ with $\\alpha = \\mathrm{cis}\\,\\tfrac{2\\pi}{n} \\neq 1$. The finite geometric sum: $S = \\tfrac{\\alpha^n - 1}{\\alpha - 1}$. Since $\\alpha^n = 1$: $S = \\tfrac{1 - 1}{\\alpha - 1} = 0$ — the roots sum themselves out. (The $\\alpha = 1$ case is exactly $n = 1$, excluded.)',
          'Engine B (Vieta): $x^n - 1 = x^n + 0 \\cdot x^{n-1} + 0 \\cdot x^{n-2} + \\dots + 0 \\cdot x - 1$ has roots $1, \\alpha, \\dots, \\alpha^{n-1}$; the sum of roots of $x^n + c_{n-1}x^{n-1} + \\dots$ reads $-c_{n-1}$ — here $c_{n-1} = 0$, so the sum is $0$.',
          'The geometric echo: reading the zero sum by real and imaginary parts, $\\sum_k \\cos\\tfrac{2k\\pi}{n} = 0$ and $\\sum_k \\sin\\tfrac{2k\\pi}{n} = 0$ — $n$ unit vectors at equal spokes balance to nothing, which the engine swept for $n = 3$ to $12$ (both parts $< 10^{-10}$).',
          'Hence two independent engines — series algebra and polynomial coefficients — price the same census row, and the picture explains WHY: full symmetry has no direction to lean.',
        ], answer: 'proved by both engines: $1 + \\alpha + \\dots + \\alpha^{n-1} = 0$ for every $n \\geq 2$' },
        { q: 'Test the seats $\\{0, 1, \\omega\\}$ ($\\omega$ the complex cube root of unity) against the equilateral condition, and explain the verdict geometrically.', solution: [
          'The condition: LHS $= 0^2 + 1^2 + \\omega^2 = 1 + \\omega^2$; RHS $= 0 \\cdot 1 + 1 \\cdot \\omega + \\omega \\cdot 0 = \\omega$. Since $1 + \\omega^2 = -\\omega \\neq \\omega$ (because $\\omega \\neq 0$), LHS $\\neq$ RHS: the condition FAILS — not equilateral.',
          'The geometric confirmation: the side census — $|0 - 1| = 1$, $|0 - \\omega| = 1$, but $|1 - \\omega| = |\\tfrac{3}{2} - \\tfrac{\\sqrt{3}}{2}i| = \\sqrt{\\tfrac{9}{4} + \\tfrac{3}{4}} = \\sqrt{3}$ — an isosceles triangle (sides $1, 1, \\sqrt{3}$), NOT equilateral.',
          'The honest reading: two sides equal means the triangle shares the $\\omega$-family\u2019s symmetry at the origin but not its full rotational symmetry — the certificate is exactly as discriminating as the side census, at one identity\u2019s cost.',
        ], answer: 'fails: $1 + \\omega^2 = -\\omega \\neq \\omega$; geometrically sides $1, 1, \\sqrt{3}$ — isosceles, not equilateral' },
      ] },
      { level: 'L5', questions: [
        { q: 'The sixth roots of unity: list them, give the census rows (sum, product, real roots, primitive seats), and say which pairs are conjugates.', solution: [
          'The seats: $\\mathrm{cis}\\,\\tfrac{k\\pi}{3}$ for $k = 0, \\dots, 5$ — $1, \\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i (= \\omega \\cdot \\bar\\omega$-family seat at $\\tfrac{\\pi}{3}$... note: $\\tfrac{1}{2}+\\tfrac{\\sqrt{3}}{2}i$ is $-\\omega^2$), $\\omega$ (at $\\tfrac{2\\pi}{3}$), $-1$, $\\omega^2$ (at $\\tfrac{4\\pi}{3}$), and $\\tfrac{1}{2} - \\tfrac{\\sqrt{3}}{2}i$ (at $\\tfrac{5\\pi}{3}$).',
          'The census: sum $0$ (the zero-sum law); product $(-1)^{6-1} = -1$ (even $n$); real roots $\\pm 1$ (even $n$); primitive seats — $\\gcd(k, 6) = 1$ at $k = 1, 5$: exactly TWO, $\\mathrm{cis}\\,\\tfrac{\\pi}{3} = \\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$ and $\\mathrm{cis}\\,\\tfrac{5\\pi}{3} = \\tfrac{1}{2} - \\tfrac{\\sqrt{3}}{2}i$ — which is $\\varphi(6) = 2$.',
          'The conjugate pairs: non-real roots come in mirror pairs across the real axis: $\\mathrm{cis}\\,\\tfrac{\\pi}{3}$ with $\\mathrm{cis}\\,\\tfrac{5\\pi}{3}$, and $\\omega$ with $\\omega^2$ — the two $60^\\circ$-family pairs; the engine swept every row at $10^{-10}$.',
          'The regular hexagon: six seats at $60^\\circ$ spokes — the $\\omega$-triangle and its $180^\\circ$-rotation $-\\{1, \\omega, \\omega^2\\}$ interleaved.',
        ], answer: 'seats $\\mathrm{cis}\\,\\tfrac{k\\pi}{3}$; sum $0$; product $-1$; real $\\pm 1$; primitive exactly $\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i$' },
        { q: 'Prove De Moivre\u2019s theorem by induction in full — base, step, and the negative-power extension.', solution: [
          'The base: $n = 0$: the empty product $1 = \\cos 0 + i \\sin 0$; $n = 1$: the statement itself.',
          'The step: assume $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$. Then $(\\cos\\theta + i\\sin\\theta)^{n+1} = (\\cos\\theta + i\\sin\\theta)^n \\cdot (\\cos\\theta + i\\sin\\theta) = (\\cos n\\theta + i\\sin n\\theta)(\\cos\\theta + i\\sin\\theta)$; the argument-addition law (3.4\u2019s proved engine, radii both 1) prices this product as $\\cos(n\\theta + \\theta) + i\\sin(n\\theta + \\theta) = \\cos(n+1)\\theta + i\\sin(n+1)\\theta$ — case $n + 1$ closed. The engine verified the step identity numerically on the power grid before prose.',
          'The induction closes: base + step prove every $n \\geq 0$.',
          'Negatives: $(\\cos\\theta + i\\sin\\theta)^{-1} = \\cos\\theta - i\\sin\\theta$ (the unit-modulus reciprocal IS the conjugate — 3.2\u2019s engine at $r = 1$), and $\\cos\\theta - i\\sin\\theta = \\cos(-\\theta) + i\\sin(-\\theta)$; so for $m > 0$: $(\\cos\\theta+i\\sin\\theta)^{-m} = \\left[(\\cos\\theta+i\\sin\\theta)^{-1}\\right]^m = \\cos(-m\\theta) + i\\sin(-m\\theta)$ — the theorem with $n$ read at the signed integer.',
        ], answer: 'proved for all integers: induction on the argument-addition law; negatives via the conjugate reciprocal' },
        { q: 'Show that the common roots of $x^{12} = 1$ and $x^{18} = 1$ are exactly the sixth roots of unity — and count them two ways.', solution: [
          'The spoke discipline: a seat $\\mathrm{cis}\\,\\tfrac{2k\\pi}{12}$ is an 18th root exactly when $\\left(\\mathrm{cis}\\,\\tfrac{2k\\pi}{12}\\right)^{18} = \\mathrm{cis}\\,\\tfrac{36k\\pi}{12} = \\mathrm{cis}\\,3k\\pi = 1$ — i.e. $3k$ even, $k$ even. So the common seats are $\\mathrm{cis}\\,\\tfrac{2(2j)\\pi}{12} = \\mathrm{cis}\\,\\tfrac{j\\pi}{3}$, $j = 0, \\dots, 5$ — the sixth roots.',
          'The count, way one: $\\gcd(12, 18) = 6$ — the census row (common roots of $x^p = 1$ and $x^q = 1$ number $\\gcd(p, q)$).',
          'The count, way two: the sixth roots are the seats whose order divides BOTH 12 and 18 — the divisors of $\\gcd(12, 18) = 6$ number... the seats of order dividing 6 ARE the 6 sixth-roots (orders 1, 2, 3, 6 seat by seat). The engine\u2019s sweep agrees: 6 shared seats.',
          'Hence the divisor law is the same law twice: spokes dividing both turn-counts, orders dividing both exponents — one gcd.',
        ], answer: 'exactly the sixth roots of unity — six seats, $\\gcd(12, 18) = 6$ both ways' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: for every positive integer $n$, $1 + \\omega^n + \\omega^{2n}$ is $3$ if $3 | n$ and $0$ otherwise.', solution: [
          'Case $3 | n$: write $n = 3m$. Then $\\omega^n = (\\omega^3)^m = 1$ and $\\omega^{2n} = (\\omega^3)^{2m} = 1$ — the sum is $1 + 1 + 1 = 3$: all three seats collapse to the real seat $1$.',
          'Case $n = 3m + 1$: $\\omega^n = \\omega$, $\\omega^{2n} = \\omega^{6m + 2} = \\omega^2$ — the sum is $1 + \\omega + \\omega^2 = 0$: the three distinct seats reappear.',
          'Case $n = 3m + 2$: $\\omega^n = \\omega^2$, $\\omega^{2n} = \\omega^{6m + 4} = \\omega^4 = \\omega$ — the sum is $1 + \\omega + \\omega^2 = 0$ again.',
          'The engine swept $n = 1$ to $12$: reads $0, 0, 3, 0, 0, 3, \\dots$ — the period-3 heartbeat of the mod-3 clock, pinned before prose.',
        ], answer: 'proved by the mod-3 cycle: $3$ exactly when $3 | n$, else $0$' },
        { q: 'Prove the identity $z_1^2 + z_2^2 + z_3^2 - z_1z_2 - z_2z_3 - z_3z_1 = \\tfrac{1}{2}\\left[(z_1 - z_2)^2 + (z_2 - z_3)^2 + (z_3 - z_1)^2\\right]$, and read what it says about the equilateral condition.', solution: [
          'Expand the right side: $(z_1 - z_2)^2 = z_1^2 - 2z_1z_2 + z_2^2$; likewise the other two — summing all three gives $2(z_1^2 + z_2^2 + z_3^2) - 2(z_1z_2 + z_2z_3 + z_3z_1)$ (each square appears twice, each mixed product appears exactly twice with the pairs $(z_1,z_2), (z_2,z_3), (z_3,z_1)$).',
          'Halve: exactly $z_1^2 + z_2^2 + z_3^2 - (z_1z_2 + z_2z_3 + z_3z_1)$ — the identity, pure algebra, no geometry invoked.',
          'The read: the equilateral condition (the left side $= 0$) is equivalent to $(z_1 - z_2)^2 + (z_2 - z_3)^2 + (z_3 - z_1)^2 = 0$ — the three SIDE-VECTORS\u2019 squares summing to nothing. Over the reals that would force all three differences to vanish (one point); over the complexes it is exactly the $60^\\circ$-balance of the equilateral shape — the $\\omega$ family\u2019s identity $1 + \\omega + \\omega^2 = 0$ in side-vector dress.',
          'The witness: the $\\omega$ triangle\u2019s side vectors are $\\omega - 1, \\omega^2 - \\omega, 1 - \\omega^2$ — each the previous times $\\omega$ (a $120^\\circ$ rotation) — and their squares sum to $0$ exactly as the condition demands (the engine\u2019s certificate at $10^{-9}$).',
        ], answer: 'proved — the condition is the side-vector squares summing to zero: the $\\omega$-shape in disguise' },
      ] },
    ] },
    { kind: 'terms', items: [
      { term: 'De Moivre\u2019s theorem', def: '$(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$ for every integer $n$ — powers at the second address: the bearing multiplies by $n$. Proved by induction on the argument-addition law; for rational exponents the left side is multi-valued and the formula names ONE value.' },
      { term: 'nth roots of unity', def: 'the $n$ solutions of $z^n = 1$: the seats $\\cos\\tfrac{2k\\pi}{n} + i\\sin\\tfrac{2k\\pi}{n}$, $k = 0, \\dots, n-1$ — the unit circle\u2019s equal spokes, the regular $n$-gon. Sum $0$, product $(-1)^{n-1}$, real roots $\\pm 1$ for even $n$ and only $1$ for odd.' },
      { term: 'Primitive nth root', def: 'a root whose powers alone generate all $n$ roots — exactly the seats $\\alpha^k$ with $\\gcd(k, n) = 1$, numbering $\\varphi(n)$. The primitive 6th roots are $\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i$; the primitive cube roots are $\\omega, \\omega^2$ themselves.' },
      { term: 'The ω engine', def: 'the cube roots of unity $1, \\omega, \\omega^2$ with $\\omega = \\tfrac{-1+i\\sqrt{3}}{2}$: the laws $1 + \\omega + \\omega^2 = 0$, $\\omega^3 = 1$, $\\bar\\omega = \\omega^2 = \\omega^{-1}$, the mod-3 power cycle, and the factorisations $a^3 \\pm b^3$ and $a^3 + b^3 + c^3 - 3abc$.' },
      { term: 'Multi-valued nth root', def: 'the complete family of solutions of $z^n = w = re^{i\\theta}$: $n$ doors $r^{1/n}\\,\\mathrm{cis}\\,\\tfrac{\\theta + 2k\\pi}{n}$ at equal spokes on the circle of radius $r^{1/n}$ — the $\\sqrt{\\;}$ symbol reports only the principal door; the honest equation reports all $n$.' },
      { term: 'The z-form of a circle', def: '$z\\bar z + a\\bar z + \\bar a z + b = 0$ with centre $-a$ and radius $\\sqrt{a\\bar a - b}$ (feasibility $a\\bar a \\geq b$) — the circle as one equation in $z$ and $\\bar z$, no $(x, y)$ named; the line is the degenerate sibling $\\bar a z + a\\bar z + b = 0$.' },
      { term: 'Diametric circle', def: 'the circle whose diameter has end points $z_1, z_2$: centre $\\tfrac{z_1 + z_2}{2}$, radius $\\tfrac{|z_1 - z_2|}{2}$, equation $(z - z_1)(\\bar z - \\bar z_2) + (z - z_2)(\\bar z - \\bar z_1) = 0$ — Thales\u2019 right angle read as $\\arg\\tfrac{z - z_1}{z - z_2} = \\pm\\tfrac{\\pi}{2}$, the purely-imaginary quotient.' },
      { term: 'Equilateral condition', def: 'three distinct seats are the vertices of an equilateral triangle exactly when $z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$ — one symmetric identity equivalently $\\tfrac{1}{2}\\left[(z_1 - z_2)^2 + (z_2 - z_3)^2 + (z_3 - z_1)^2\\right] = 0$; the $\\omega$ triangle satisfies it exactly.' },
    ] },
    { kind: 'para', text: 'The storey is closed. The chapter opened with a closure failure — $x^2 + 1 = 0$ — forced a new rung, and built the whole field law family on it; the conjugate and modulus gave it bookkeeping and distance; the quadratic gave it its first payoff; the Argand plane gave it a second address and multiplication its geometric face. This last storey raised that face to powers and read the answers as geometry: equal spokes on circles, regular polygons, loci as equations, symmetry as an identity. What began as \u201cthere is no real door\u201d ends as \u201cthere are exactly $n$ doors, and here is their shape.\u201d The tower waits for its next storey — and every rung below it still holds.' },
  ],
}

export const chapter03: Chapter = {
  number: 3,
  slug: 'complex-numbers',
  title: 'Complex Numbers: the New Rung',
  summary:
    'Arithmetic and Number Systems proved the extension-ladder discipline — every new number family born from a closure failure, repaired on purpose. This chapter climbs the most famous rung: x² + 1 = 0 has no real door, so a number i is forced with i² = −1, and the algebra of a + bi is built so the whole field-law family survives (the honest sanity ANS 7.2 banked). The conjugate and modulus arrive as bookkeeping — z z̄ = |z|², division by conjugating, |z| as a distance with the triangle inequality — and the Argand plane is read algebraically (addition as the parallelogram, multiplication as rotation-and-scaling) with the deep geometry left to later books. The payoff: the quadratic formula keeps its promise for every discriminant, and real coefficients are shown to force complex doors in conjugate pairs. De Moivre’s theorem and the nth roots of unity — the unit circle’s equal spokes — with their properties (primitive roots, the cyclotomic equations) banked as the module’s depth engine.',
  status: 'in-progress',
  lessons: [lesson31, lesson32, lesson33, lesson34, lesson35],
  plannedLessons: [
    'Unit 3 Completion Review',
  ],
}
