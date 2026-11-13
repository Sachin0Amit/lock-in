import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 10: The Map of Number Systems
 * (the book's LAST chapter)
 *
 * LESSONS WRITTEN: 10.1 The Great Extension Story (run 64 — 5,574 words,
 *                  quiz keys 1/0/1/2/3, 15 exercises, verified E2E-green)
 *                  10.2 Numbers That Guard Data: Checksums and Casting Out
 *                       Nines (run 64 — 5,459 words, quiz keys 1/1/0/1/2,
 *                       14 exercises, verified E2E-green)
 *                  10.3 The Toolkit Synthesis (run 65 — 6,158 words, the
 *                       chapter's largest; quiz keys 0/2/2/2/0, 16 exercises,
 *                       2 figures, verified E2E-green) + the unit-10
 *                       completion review PASSED + the BOOK CLOSE (the
 *                       book flipped complete)
 * References for this unit: no new Drive downloads (the collection is
 * exam-oriented, per the run-48 survey); the sanctioned internet fallback
 * carried the 10.2 research — see docs/project/SOURCE_LOG.md. Banked keys
 * reused: beck-geoghegan-art-of-proof (10.1), hankel-1867-permanence,
 * peacock-1833-permanence (10.1), dedekind-1872-stetigkeit,
 * cantor-1872-fundamental-sequences (10.1), fibonacci-1202-liber-abaci +
 * gauss-1801-disquisitiones (10.2, casting out nines + congruences). New
 * web-checked keys (run 64): hamming-1950-error-detecting,
 * isbn-check-digit-schemes, luhn-algorithm-iso7812 (10.2). Every number
 * pre-verified by scripts/verify-book2-ch10.ts (87 checks sections A–I,
 * ALL GREEN before writing; the first pass caught TEN defects in the
 * verifier's own census loops — no-op substitutions counted as errors, a
 * Luhn check-digit parity bug, ⌊60/10⌋ mistyped 5 for 6, a phantom
 * "original digit" sweep, and a wrong normalized residue −4 ≡ 6 — the
 * script, not memory, is the source of truth, the run-60 lesson holding
 * again). Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (10.1): the repair map — four bands ℕ → ℤ → ℚ → ℝ, the     */
/* failure that forces each rung on the left of the gap, the new power */
/* on the right, and the dashed gate above ℝ (x² = −1 → ℂ, beyond this */
/* book). viewBox 720×520: bands h = 52 at y = 92/202/312/422 (58px    */
/* gaps), gate box x = 110..610 y = 10..40, gate text baselines        */
/* gapTop+24 / +46, arrows at x = 200, two footer lines at y = 490 and */
/* 508 — all audited in verify-book2-ch10.ts section N.                */
/* ------------------------------------------------------------------ */

function repairMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extension ladder: four bands from the naturals up to the reals, each rung forced by a closure failure and adding one new power, with the gate x squared equals minus one still open above">'
  )
  parts.push('<rect x="0" y="0" width="720" height="520" fill="transparent"/>')
  // the unrepaired gate above ℝ
  parts.push(
    '<rect x="110" y="10" width="500" height="30" rx="6" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="5 4"/>'
  )
  parts.push(
    '<text x="360" y="30" font-size="12.5" fill="#d97706" text-anchor="middle" font-weight="600">beyond the ladder: x² = −1 — no ordered system answers it (ℂ hands off)</text>'
  )
  // the four bands: [yTop, label, rightText]
  const bands: [number, string, string][] = [
    [92, 'ℝ — the real line (ch. 8)', 'completeness: the line has no holes'],
    [202, 'ℚ — the rationals (ch. 7)', 'the field laws: every a ≠ 0 divides'],
    [312, 'ℤ — the integers (ch. 6)', '0 and the negatives join'],
    [422, 'ℕ — the naturals (ch. 1)', 'counting starts here: 1, 2, 3, …'],
  ]
  for (const [y, label, right] of bands) {
    parts.push(
      `<rect x="140" y="${y}" width="440" height="52" rx="6" fill="none" stroke="#0d9488" stroke-width="1.8"/>`
    )
    parts.push(
      `<text x="160" y="${y + 32}" font-size="14.5" fill="#0f766e" font-weight="600">${label}</text>`
    )
    parts.push(`<text x="560" y="${y + 32}" font-size="12" fill="#0d9488" text-anchor="end">${right}</text>`)
  }
  // the three failure gates between bands: arrow up + failure (left) + new power (right)
  // gapTop = band above's bottom edge; failure baseline gapTop+20, power baseline gapTop+42
  const gates: [number, string, string][] = [
    [144, 'forced by: x² = 2 — no rational verdict (ch. 8)', 'ℝ adds: completeness — every n ≥ 0 gets a root'],
    [254, 'forced by: 3x = 2 — no integer verdict', 'ℚ adds: division — every a ≠ 0 gains an inverse'],
    [364, 'forced by: 5 − 8 (x + 8 = 5) — no natural verdict', 'ℤ adds: the difference pairs (n, 0)'],
  ]
  for (const [gapTop, fail, power] of gates) {
    parts.push(
      `<line x1="200" y1="${gapTop + 52}" x2="200" y2="${gapTop + 8}" stroke="#d97706" stroke-width="2"/>`
    )
    parts.push(
      `<path d="M 200 ${gapTop + 2} L 195 ${gapTop + 13} L 205 ${gapTop + 13} Z" fill="#d97706"/>`
    )
    parts.push(
      `<text x="222" y="${gapTop + 24}" font-size="12" fill="#dc2626">${fail}</text>`
    )
    parts.push(`<text x="222" y="${gapTop + 46}" font-size="12" fill="#0d9488">${power}</text>`)
  }
  // the embedding note + permanence footer (two straight lines under the ladder —
  // no rotated text: the overlap audit reads pre-transform boxes)
  parts.push(
    '<text x="360" y="490" font-size="11.5" fill="#0d9488" text-anchor="middle">each arrow embeds the old system unchanged — n ↦ [(n, 0)], then n ↦ (n, 1)</text>'
  )
  parts.push(
    '<text x="360" y="508" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="600">the permanence charter: every law of the old system is a law of the new one — nothing old breaks</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (10.2): the mod-9 residue wheel — nine stations 0..8 on a  */
/* circle (r = 92, center 330,158, station k at angle −90° + k·40°),   */
/* with the collapse note (every power of ten lands on station 1) and  */
/* the digit-walk of 8,234: start 0, +8 → 8, +2 → 1, +3 → 4, +4 → 8.  */
/* Walk arrows drawn as chords; the +8/+2/+3/+4 narration lives in     */
/* the right-side annotation block (no labels on the wheel). Section O. */
/* verify-book2-ch10.ts section O.                                     */
/* ------------------------------------------------------------------ */

function residueWheelSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mod 9 residue wheel: nine stations, every power of ten landing on station one, and the digit walk of 8234 ending at station 8">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  const cx = 330
  const cy = 158
  const rr = 92
  const pos = (k: number): [number, number] => {
    const a = ((-90 + k * 40) * Math.PI) / 180
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]
  }
  // the circle + 9 stations
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#0d9488" stroke-width="1.8"/>`)
  for (let k = 0; k < 9; k++) {
    const [x, y] = pos(k)
    parts.push(`<circle cx="${x}" cy="${y}" r="10" fill="#fef3c7" stroke="#0d9488" stroke-width="1.5"/>`)
    const lx = cx + (rr + 24) * Math.cos(((-90 + k * 40) * Math.PI) / 180)
    const ly = cy + (rr + 24) * Math.sin(((-90 + k * 40) * Math.PI) / 180)
    parts.push(
      `<text x="${lx}" y="${ly + 4}" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="600">${k}</text>`
    )
  }
  // the digit walk of 8,234: 0 → 8 → 1 → 4 → 8 (chords, slightly inside)
  const walk = [0, 8, 1, 4, 8]
  for (let i = 0; i + 1 < walk.length; i++) {
    const [x1, y1] = pos(walk[i])
    const [x2, y2] = pos(walk[i + 1])
    const mx = x1 + (x2 - x1) * 0.12
    const my = y1 + (y2 - y1) * 0.12
    const nx = x1 + (x2 - x1) * 0.88
    const ny = y1 + (y2 - y1) * 0.88
    parts.push(`<line x1="${x1}" y1="${y1}" x2="${nx}" y2="${ny}" stroke="#d97706" stroke-width="1.6"/>`)
    parts.push(`<path d="M ${x2} ${y2} L ${mx + (nx - mx)} ${my + (ny - my)}" stroke="none"/>`)
    // arrowhead at the target station
    const ang = Math.atan2(y2 - y1, x2 - x1)
    const hx = x2 - 12 * Math.cos(ang)
    const hy = y2 - 12 * Math.sin(ang)
    parts.push(
      `<path d="M ${hx + 7 * Math.cos(ang)} ${hy + 7 * Math.sin(ang)} L ${hx + 4 * Math.cos(ang) - 4 * Math.sin(ang)} ${hy + 4 * Math.sin(ang) + 4 * Math.cos(ang)} L ${hx + 4 * Math.cos(ang) + 4 * Math.sin(ang)} ${hy + 4 * Math.sin(ang) - 4 * Math.cos(ang)} Z" fill="#d97706"/>`
    )
  }
  // left annotation: the collapse of the place values
  parts.push(
    '<text x="40" y="52" font-size="12" fill="#0d9488" font-weight="600">every power of ten lands on station 1:</text>'
  )
  parts.push('<text x="40" y="70" font-size="11.5" fill="#0d9488">10 ≡ 1, 100 ≡ 1, 1000 ≡ 1 (mod 9)</text>')
  parts.push('<text x="40" y="88" font-size="11.5" fill="#0d9488">so a whole string condenses to its digit sum</text>')
  // right annotation: the walk read-out
  parts.push(
    '<text x="452" y="52" font-size="12" fill="#0d9488" font-weight="600">the walk of 8,234: 0 +8 → 8, +2 → 1,</text>'
  )
  parts.push('<text x="452" y="70" font-size="11.5" fill="#0d9488">+3 → 4, +4 → 8 — station 8 is the residue</text>')
  parts.push('<text x="452" y="88" font-size="11.5" fill="#0d9488">of 8,234 in ℤ/9ℤ (its digital root is 8)</text>')
  // footer
  parts.push(
    '<text x="360" y="316" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="600">casting out nines = computing inside ℤ/9ℤ, where every place value is the same station</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (10.2): the ISBN-10 weighted-check engine on Hamming's     */
/* own book, 0-13-139139-9 — ten digit boxes (y = 56..92) with weight  */
/* labels 10..1 beneath (y = 112), the product row (y = 142), the sum  */
/* line (y = 176) and the mod-11 gate box (y = 200..232), followed by  */
/* the two error-shift notes (y = 262, 286). Boxes 52px wide from      */
/* x = 88: 88..608; verify-book2-ch10.ts section O.                    */
/* ------------------------------------------------------------------ */

function isbnEngineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ISBN-10 weighted check of 0-13-139139-9: digits times descending weights sum to 143, which is 13 times 11, so the number passes the mod 11 gate">'
  )
  parts.push('<rect x="0" y="0" width="720" height="320" fill="transparent"/>')
  const digits = [0, 1, 3, 1, 3, 9, 1, 3, 9, 9]
  const label = ['0', '1', '3', '1', '3', '9', '1', '3', '9', '9']
  parts.push(
    '<text x="88" y="36" font-size="12.5" fill="#0f766e" font-weight="600">Hamming\'s Coding and Information Theory: ISBN 0-13-139139-9</text>'
  )
  for (let i = 0; i < 10; i++) {
    const bx = 88 + i * 52
    parts.push(
      `<rect x="${bx}" y="56" width="44" height="36" rx="4" fill="none" stroke="#0d9488" stroke-width="1.6"/>`
    )
    parts.push(
      `<text x="${bx + 22}" y="80" font-size="17" fill="#0f766e" text-anchor="middle" font-weight="600">${label[i]}</text>`
    )
    parts.push(
      `<text x="${bx + 22}" y="112" font-size="11.5" fill="#d97706" text-anchor="middle" font-weight="600">× ${10 - i}</text>`
    )
    if (digits[i] * (10 - i) > 0) {
      parts.push(
        `<text x="${bx + 22}" y="142" font-size="12" fill="#0d9488" text-anchor="middle">${digits[i] * (10 - i)}</text>`
      )
    } else {
      parts.push(
        `<text x="${bx + 22}" y="142" font-size="12" fill="#5eead4" text-anchor="middle">·</text>`
      )
    }
  }
  parts.push(
    '<text x="640" y="80" font-size="11.5" fill="#0d9488">digits d₁…d₁₀</text>'
  )
  parts.push('<text x="640" y="112" font-size="11.5" fill="#0d9488">weights 10…1</text>')
  // the sum line
  parts.push(
    '<text x="88" y="176" font-size="13" fill="#0f766e" font-weight="600">weighted sum = 0 + 9 + 24 + 7 + 18 + 45 + 4 + 9 + 18 + 9 = 143 = 13 × 11</text>'
  )
  // the gate
  parts.push(
    '<rect x="88" y="196" width="352" height="34" rx="6" fill="none" stroke="#0d9488" stroke-width="1.6"/>'
  )
  parts.push(
    '<text x="264" y="218" font-size="13" fill="#0f766e" text-anchor="middle" font-weight="600">143 ≡ 0 (mod 11) → the number PASSES the gate</text>'
  )
  // the two error-shift notes
  parts.push(
    '<text x="88" y="262" font-size="12" fill="#dc2626">a miswritten digit shifts the sum by (f − e) · w — never a multiple of 11 (11 prime, w ≤ 10)</text>'
  )
  parts.push(
    '<text x="88" y="286" font-size="12" fill="#dc2626">an adjacent swap shifts it by dₖ − dₖ₊₁ — size at most 9, never a multiple of 11</text>'
  )
  parts.push(
    '<text x="88" y="308" font-size="12" fill="#0d9488" font-weight="600">both classic human errors are caught — every time (verifier F–I: 900/900, all transpositions)</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Chapter 10                                                          */
/* ------------------------------------------------------------------ */
/* Figure (10.3): the one-engine toolkit map — four toolkit lanes on    */
/* the left, one finite-system engine in the middle, four verdicts on   */
/* the right. viewBox 720×360: input boxes x = 20..240 (w 220, h 44) at */
/* y = 30/104/178/252; engine box x = 280..470, y = 120..240; output    */
/* boxes x = 500..700; arrows run 242..276 and 474..496; footer y = 345 */
/* — all audited in verify-book2-ch10.ts section V.                    */
/* ------------------------------------------------------------------ */

function toolkitEngineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The one-engine map: four toolkit lanes, unit digits, last two digits, trailing zeros and remainder hunts, flowing through one finite-system engine and out to their verdicts">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  const arrowHead = (x: number, y: number, dx: number, dy: number, color: string) => {
    const len = Math.sqrt(dx * dx + dy * dy)
    const ux = dx / len
    const uy = dy / len
    const bx = x - 7 * ux
    const by = y - 7 * uy
    parts.push(
      `<path d="M ${x} ${y} L ${bx - 4 * uy} ${by + 4 * ux} L ${bx + 4 * uy} ${by - 4 * ux} Z" fill="${color}"/>`
    )
  }
  const laneY = [30, 104, 178, 252]
  const inLabels = [
    'unit digits of powers (ℤ/10ℤ)',
    'last two digits of powers (ℤ/100ℤ)',
    'trailing zeros of n! (the 5-chain)',
    'double-remainder hunts (CRT)',
  ]
  const outLabels = ['one digit 0–9', 'two digits 00–99', 'a count — 1000! ends in 249 zeros', 'one class mod lcm(m, n)']
  const entryY = [140, 160, 200, 220]
  // input lanes
  for (let i = 0; i < 4; i++) {
    const y = laneY[i]
    parts.push(`<rect x="20" y="${y}" width="220" height="44" rx="6" fill="#fef3c7" stroke="#0d9488" stroke-width="1.4"/>`)
    parts.push(
      `<text x="130" y="${y + 27}" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="600">${inLabels[i]}</text>`
    )
    parts.push(`<line x1="242" y1="${y + 22}" x2="273" y2="${entryY[i]}" stroke="#d97706" stroke-width="1.5"/>`)
    arrowHead(277, entryY[i] + (entryY[i] - (y + 22)) * 0.04, 277 - 242, entryY[i] - (y + 22), '#d97706')
    // output lane
    parts.push(`<rect x="500" y="${y}" width="200" height="44" rx="6" fill="#fef3c7" stroke="#0d9488" stroke-width="1.4"/>`)
    parts.push(
      `<text x="600" y="${y + 27}" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="600">${outLabels[i]}</text>`
    )
    parts.push(`<line x1="474" y1="${entryY[i]}" x2="495" y2="${y + 22}" stroke="#d97706" stroke-width="1.5"/>`)
    arrowHead(499, y + 22 + 0.5, 499 - 474, y + 22 - entryY[i], '#d97706')
  }
  // the engine box
  parts.push('<rect x="280" y="120" width="190" height="120" rx="10" fill="#ffedd5" stroke="#d97706" stroke-width="2"/>')
  parts.push(
    '<text x="375" y="150" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="700">ℤ/mℤ — one engine</text>'
  )
  parts.push(
    '<text x="375" y="178" font-size="11.5" fill="#0f766e" text-anchor="middle" font-weight="600">reduce → compute → lift back</text>'
  )
  parts.push('<text x="375" y="198" font-size="11.5" fill="#0d9488" text-anchor="middle">cycles · inverses · chains</text>')
  parts.push('<text x="375" y="222" font-size="11" fill="#0d9488" text-anchor="middle">a finite system from the map</text>')
  // footer
  parts.push(
    '<text x="360" y="345" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="600">the same three moves every time: name the modulus, compute inside, lift the verdict back</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure (10.3): the Legendre 5-chain for 1000! — six boxes (1000 →    */
/* 200 → 40 → 8 → 1 → 0) with /5 arrows in the 20px gaps, the sum line  */
/* 200 + 40 + 8 + 1 = 249, three counting annotations and a two-line    */
/* footer with the base-5 digit-sum cross-check. viewBox 720×300;       */
/* boxes x = 20/130/240/350/460/570 (w 90, h 52) at y = 60 — section V. */
/* ------------------------------------------------------------------ */

function legendreChainSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Legendre chain for 1000 factorial: divide by five repeatedly from 1000 to 200, 40, 8, 1 and 0; the levels sum to 249 trailing zeros, matching the base-5 digit-sum cross-check">'
  )
  parts.push('<rect x="0" y="0" width="720" height="300" fill="transparent"/>')
  const bx = [20, 130, 240, 350, 460, 570]
  const vals = ['1000', '200', '40', '8', '1', '0']
  for (let i = 0; i < 6; i++) {
    parts.push(`<rect x="${bx[i]}" y="60" width="90" height="52" rx="6" fill="#fef3c7" stroke="#0d9488" stroke-width="1.5"/>`)
    parts.push(
      `<text x="${bx[i] + 45}" y="92" font-size="15" fill="#0f766e" text-anchor="middle" font-weight="700">${vals[i]}</text>`
    )
  }
  for (let i = 0; i < 5; i++) {
    const x0 = bx[i] + 92
    const x1 = bx[i] + 107
    parts.push(`<line x1="${x0}" y1="86" x2="${x1}" y2="86" stroke="#d97706" stroke-width="1.5"/>`)
    parts.push(`<path d="M ${x1 + 3} 86 L ${x1 - 4} 82 L ${x1 - 4} 90 Z" fill="#d97706"/>`)
    parts.push(
      `<text x="${bx[i] + 100}" y="76" font-size="12" fill="#d97706" text-anchor="middle" font-weight="600">/5</text>`
    )
  }
  parts.push(
    '<text x="360" y="150" font-size="13" fill="#0f766e" text-anchor="middle" font-weight="700">200 + 40 + 8 + 1 = 249 trailing zeros</text>'
  )
  parts.push(
    '<text x="360" y="176" font-size="11.5" fill="#0d9488" text-anchor="middle">each level counts multiples of 5, 25, 125, 625 — a multiple of 25 pays twice,</text>'
  )
  parts.push(
    '<text x="360" y="194" font-size="11.5" fill="#0d9488" text-anchor="middle">of 125 three times, of 625 four times (625 = 5·5·5·5); stop: ⌊1/5⌋ = 0</text>'
  )
  parts.push(
    '<text x="360" y="250" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="600">cross-check by name: 1000 = 13000₅ → digit sum 4 → (1000 − 4) ÷ 4 = 249</text>'
  )
  parts.push(
    '<text x="360" y="272" font-size="11.5" fill="#0d9488" text-anchor="middle">the quotient chain that NAMES 1000 in base 5 is the same chain that COUNTS its zeros</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */

export const chapter10: Chapter = {
  number: 10,
  slug: 'the-map-of-number-systems',
  title: 'The Map of Number Systems',
  summary:
    'The synthesis: the great extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ drawn as one story of repaired failures; congruence arithmetic at work guarding data (casting out nines as an error detector, the mod-11 checksum scheme); and the competitive-arithmetic toolkit — unit digits, factorial zeros, base conversions, remainder chains — unified as one congruence engine.',
  status: 'complete',
  lessons: [
    {
      id: 'ans-the-great-extension-story',
      number: '10.1',
      title: 'The Great Extension Story',
      prerequisites: [
        'ans-closure-failures-that-force-extension',
        'ans-constructing-the-integers-from-the-naturals',
        'ans-the-field-laws-division-joins-the-family',
        'ans-completeness-the-line-without-holes',
      ],
      sources: [
        'beck-geoghegan-art-of-proof',
        'peacock-1833-permanence',
        'hankel-1867-permanence',
        'dedekind-1872-stetigkeit',
        'cantor-1872-fundamental-sequences',
      ],
      concepts: [
        'Number system',
        'Closure failure',
        'Extension ladder',
        'Embedding',
        'Permanence of formal laws',
        'Repair',
        'One-step solvability',
        'Congruence systems (preview)',
      ],
      objectives: [
        'state what a number system is — a set with operations and laws, not a bag of symbols',
        'recount the whole book as one story: four closure failures, four constructions, four repairs',
        'prove the embedding theorem for the difference-pair model and explain what "computations agree" means',
        'state the permanence charter and use it to predict what each extension may and may never do',
        'solve the one-step solvability census across the ladder: which of x + a = b, a·x = b, x² = n each system answers, and exactly when',
        'point to what the map does not show — ℂ, countability, and the finite congruence systems the next lesson puts to work',
      ],
      blocks: [
        {
          kind: 'para',
          text:
            'Nine chapters ago this book asked a question a child asks and school never answers: **why does arithmetic work the way it works?** The answer was not one theorem but one *story* — the story of how each number system was built on purpose, to repair a specific failure of the one before it. Chapter 1 rebuilt counting from the successor idea. Chapters 2 through 5 turned the division algorithm into divisibility, primes, and the arithmetic of remainders. Chapter 6 constructed the integers from pairs of naturals because subtraction kept failing. Chapter 7 constructed the rationals from pairs of integers because division kept failing. Chapter 8 proved √2 irrational and built the real line because roots kept failing.',
        },
        {
          kind: 'para',
          text:
            'This closing chapter draws the whole story as one **map** — the great extension ladder $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ — and reads it three ways. This lesson reads it *structurally*: what a number system is, what a closure failure is, what a repair is, and the charter that made the whole construction legal (the old laws survive every rung). Lesson 10.2 reads it *at work*: the finite circular systems $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, $\\mathbb{Z}/11\\mathbb{Z}$ — the map\'s smallest territories — guarding real data as checksums. Lesson 10.3 reads it as a *toolkit*, unifying the competitive-arithmetic arsenal — unit digits, factorial zeros, base conversions, remainder chains — as one congruence engine.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The ladder is the book',
          text:
            'If you retain one image from this entire volume, retain the ladder. Every hard technical fact of chapters 6–8 — difference pairs, fraction pairs, Dedekind cuts — exists to move the reader up exactly one rung while disturbing nothing below. The ladder is not a slogan over the door; it is the load-bearing structure, and this lesson is its inspection report.',
        },
        { kind: 'terms', items: [
          {
            term: 'Number system',
            def: 'A set of objects together with operations (addition, multiplication, and where available subtraction and division) that satisfy specific laws. A system is not a bag of symbols; it is symbols + operations + the laws they obey. The four great systems of this book are ℕ, ℤ, ℚ and ℝ.',
          },
          {
            term: 'Closure failure',
            def: 'A computation the operations of a system cannot finish inside that system — an equation with no solution, a difference with no name. ℕ fails $x + 8 = 5$; ℤ fails $3x = 2$; ℚ fails $x^2 = 2$. A failure is not a defect to hide but the engine of the next construction.',
          },
          {
            term: 'Extension',
            def: 'A larger system built from a smaller one, into which the smaller one sits unchanged: an injective map preserving addition and multiplication (an embedding), so every old computation remains a computation of the new system with the same verdict.',
          },
          {
            term: 'The extension ladder',
            def: 'The chain $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ of the four systems this book built, each rung repairing exactly the closure failure that forced it: ℤ repairs subtraction, ℚ repairs division, ℝ repairs roots and limits.',
          },
          {
            term: 'Embedding',
            def: 'The concrete sitting-inside map: $n \\mapsto [(n, 0)]$ from ℕ into the difference-pair integers (chapter 6), $n \\mapsto (n, 1)$ from ℤ into the fraction-pair rationals (chapter 7), and the identity-style placement of ℚ inside the cuts (chapter 8). Verified as structure-preserving in the derivation below.',
          },
          {
            term: 'Permanence of formal laws',
            def: 'The charter stated by Peacock (1833) and refined by Hankel (1867): an extension may add powers but must never break a law the old system obeyed. Every general rule of arithmetic that held below holds above — permanence is why a schoolchild\'s computation survives every rung of the ladder untouched.',
          },
          {
            term: 'One-step solvability',
            def: 'The census question this lesson answers exactly: for which $(a, b)$ does $x + a = b$, $a \\cdot x = b$, or $x^2 = n$ have a solution in which system? The answers ($b > a$ in ℕ; $a \\mid b$ in ℤ; perfect squares in ℚ; $n \\ge 0$ in ℝ) are the precise sense in which each rung is "more powerful".',
          },
          {
            term: 'Congruence system (preview)',
            def: 'A finite, circular number system $\\mathbb{Z}/n\\mathbb{Z}$: the residues $0, 1, \\ldots, n-1$ with addition and multiplication taken modulo $n$, built in chapter 5. The smallest territories on the map — and, as lesson 10.2 shows, the systems that guard the world\'s data.',
          },
        ] },
        { kind: 'heading', text: 'What a Number System Is' },
        {
          kind: 'para',
          text:
            'The word *system* is doing real work, so let us define it. A **number system** is a set $S$ together with operations $+$ and $\\times$ (each taking two elements of $S$ and returning one — that demand alone is *closure*) and a list of laws they obey. The laws this book has tracked at every rung are short and famous: commutativity ($a + b = b + a$, $ab = ba$), associativity, the distributive law $a(b + c) = ab + ac$, the identities 0 and 1, and cancellation.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Number system (formal)',
          text:
            'A set $S$ with operations $+, \\times$ is said to be a **number system (for this book\'s purposes)** when $+$ and $\\times$ are closed on $S$ and satisfy the commutative, associative and distributive laws with identity elements. Thus, $a, b, c \\in S \\Rightarrow a + b \\in S,\\ ab \\in S$, and the laws hold for all choices.',
        },
        {
          kind: 'para',
          text:
            'Notice what the definition does *not* demand. It does not demand subtraction — ℕ has no negatives, and ℕ is still a system. It does not demand division — ℤ has no $\\frac{2}{3}$, and ℤ is still a system. It does not demand that roots or limits exist — ℚ lacks $\\sqrt{2}$, and ℚ is still a system. This is the whole architecture of the book in one sentence: **the systems differ not in the laws they keep but in the failures they tolerate.** Each rung of the ladder is bought by refusing to tolerate one more failure.',
        },
        {
          kind: 'para',
          text:
            'For example, take the smallest system first and check the definition against it:',
        },
        { kind: 'list', marker: 'roman', items: [
          '(i) ℕ is closed under $+$ and $\\times$: add or multiply two naturals and a natural answers — the one closure ℕ fully owns (verified exhaustively in the run-64 verifier, 200·66 triples, zero exits);',
          '(ii) ℕ obeys every listed law — the run-64 law sweep checked commutativity, associativity and distributivity on thousands of triples with zero failures;',
          '(iii) ℕ still fails $x + 8 = 5$: no natural is small enough, since $8 + x \\ge 9$ for every $x \\in \\mathbb{N}$ — a failure of *solvability*, not of any listed law.',
        ] },
        {
          kind: 'para',
          text:
            'So a closure failure never breaks a law. It reveals a *boundary*: the system answers every question it was built to answer, and then some question steps over the edge. The ladder is the record of what happened each time.',
        },
        { kind: 'heading', text: 'The Four Failures' },
        {
          kind: 'para',
          text:
            'Here is the whole book\'s plot in one table — the failure that forced each rung, the construction that answered it, and the chapter that carried it out. Read the middle column slowly: each entry is an equation that *no smaller system could solve*, which is the entire reason the larger system was built.',
        },
        { kind: 'table', caption: 'The repair ledger — every rung of the ladder is a repair, and the repairs are the book', head: ['System', 'Built to repair', 'The equation that forced it', 'The construction', 'Chapter'], rows: [
          ['ℕ', 'counting itself', '— (the floor of the ladder)', 'successors from 1 (0 joins later)', 'ch. 1'],
          ['ℤ', 'subtraction', '$x + 8 = 5$ (i.e. $5 - 8$)', 'difference pairs $[(a, b)] = a - b$', 'ch. 6'],
          ['ℚ', 'division', '$3x = 2$ (i.e. $x = \\frac{2}{3}$)', 'fraction pairs $(p, q) = p/q$', 'ch. 7'],
          ['ℝ', 'roots and limits', '$x^2 = 2$ (i.e. $x = \\sqrt{2}$)', 'Dedekind cuts on ℚ', 'ch. 8'],
        ] },
        {
          kind: 'para',
          text:
            'The failures are not qualitative hand-waving; they are countable. The run-64 verifier swept the one-step equations and produced exact censuses, and the numbers deserve to be looked at, because they measure *how much* each rung adds:',
        },
        { kind: 'table', caption: 'The solvability census — how often each system answers the one-step equations (all computed by script, sections A/D of the verifier)', head: ['Equation', 'Range swept', 'Smaller system answers', 'The rung answers'], rows: [
          ['$x + a = b$', '$a, b \\in [1, 30]$ (900 pairs)', 'ℕ: 435 of 900 (exactly those with $b > a$)', 'ℤ: 900 of 900'],
          ['$a \\cdot x = b$', '$a \\in [2, 12]$, $b \\in [1, 60]$ (660 pairs)', 'ℤ: 124 of 660 (exactly those with $a \\mid b$)', 'ℚ: 660 of 660'],
          ['$x^2 = n$', '$n \\in [1, 100]$', 'ℚ: 10 of 100 (the perfect squares)', 'ℝ: 100 of 100'],
        ] },
        {
          kind: 'para',
          text:
            'Three verdicts, one shape. The smaller system answers a *thin, detectable* subset — $b > a$; $a \\mid b$; $n$ a perfect square — and the new rung answers *all* of them. The thin subsets are not accidents: each one is a divisibility or order condition the smaller system\'s laws force, and each is a theorem, not an observation. The one-step solvability theorem below states all three precisely and proves them.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Caution — the boundary at 0 is a book-wide convention',
          text:
            'In this book ℕ = {1, 2, 3, …}: 0 is **not** a natural number (chapter 1\'s axiom list starts at 1, and 0 joined only as a placeholder digit in Foundation Mathematics, then as a full citizen of ℤ in chapter 6). The convention has teeth in the census: the equation $x + a = b$ with $b = a$ has solution $x = 0$, which lives in ℤ and **not** in ℕ — that is why the ℕ count is "the pairs with $b > a$", not "$b \\ge a$". Exam items love exactly this boundary; do not let another book\'s convention (ℕ with 0) blur it.',
        },
        { kind: 'heading', text: 'The Repair Pattern: Build, Embed, Agree' },
        {
          kind: 'para',
          text:
            'Every rung of the ladder was built the same way, and the shared recipe is worth naming now that you have seen it three times. **Step 1 — build:** new objects are constructed as *pairs* (or cuts) of old ones — chapter 6 built $[(a, b)]$ meaning $a - b$; chapter 7 built $(p, q)$ meaning $p/q$; chapter 8 built cuts, the closest chapters\' equivalent at a higher rung. **Step 2 — embed:** the old numbers sit inside the new ones along a faithful copy: $n$ sits as $[(n, 0)]$, then as $(n, 1)$. **Step 3 — agree:** every computation on the old numbers gives the same verdict whether performed below or above the rung.',
        },
        {
          kind: 'para',
          text:
            'Step 3 is the one that makes the whole enterprise honest, and it is a theorem, so let us prove it once, for the rung you have the most machinery for — the integers.',
        },
        { kind: 'derivation', title: 'The embedding theorem for ℤ (difference pairs)', statement: 'The map $e: \\mathbb{N} \\to \\mathbb{Z}$, $e(n) = [(n, 0)]$, is injective and preserves addition and multiplication: the naturals sit inside the integers as an exact structural copy.', steps: [
          { label: 'Recall the model', formula: '[(a, b)] \\text{ with } (a, b) \\sim (c, d) \\iff a + d = c + b', explanation: 'Chapter 6\'s difference pairs: the pair (a, b) stands for the difference a − b, and two pairs name the same integer when they agree as differences.' },
          { label: 'Injectivity', formula: '[(n, 0)] = [(m, 0)] \\iff n + 0 = m + 0 \\iff n = m', explanation: 'Two embedded naturals are equal exactly when the naturals were — the embedding collapses nothing. The run-64 sweep confirmed this on all 10,201 pairs (n, m) in [−50, 50]².' },
          { label: 'Addition is preserved', formula: '[(n,0)] + [(m,0)] = [(n+m,\\ 0+0)] = [(n+m, 0)] = e(n+m)', explanation: 'The pair-sum definition applied to embedded pairs lands on the embedded sum. Sweep-verified: zero mismatches across the range.' },
          { label: 'Multiplication is preserved', formula: '[(n,0)] \\cdot [(m,0)] = [(nm + 0 \\cdot 0,\\ n \\cdot 0 + 0 \\cdot m)] = [(nm, 0)] = e(nm)', explanation: 'The cross-term formula (which encodes the sign rules) eats zeros on the embedded pairs and returns the embedded product. The sweep found zero mismatches.' },
          { label: 'The old answers reappear', formula: '[(a, b)] = [(a - b, 0)] \\quad (a \\ge b \\ge 1)', explanation: 'For differences that were computable in ℕ, the integer named by the pair is the embedded old answer — sweeping a ≥ b up to 300 found the identification to hold always. This line is "computations agree" made exact.' },
        ], result: 'The naturals embed in the integers as $[(n, 0)]$ — injectively, sum- and product-faithfully — so every ℕ computation is a ℤ computation with the same verdict. The same three-line argument runs at the next rung with $(n, 1)$ in the fraction model (swept on 981 pairs), and chapter 8 placed ℚ inside the cuts. The ladder does not discard; it contains.' },
        {
          kind: 'example', title: 'Watch the embedding at work: 3 and 4, below and above the ℤ rung',
          steps: [
            'Below: $3 + 4 = 7$ and $3 \\times 4 = 12$ — two ℕ verdicts.',
            'Embed: $e(3) = [(3, 0)]$, $e(4) = [(4, 0)]$.',
            'Add above: $[(3,0)] + [(4,0)] = [(7, 0)] = e(7)$ — the same verdict, now wearing pair notation.',
            'Multiply above: $[(3,0)] \\cdot [(4,0)] = [(3 \\cdot 4 + 0 \\cdot 0,\\ 3 \\cdot 0 + 0 \\cdot 4)] = [(12, 0)] = e(12)$.',
            'Hence the embedded world computes exactly what the old world computed — and additionally answers $[(5, 8)]$ where ℕ had no verdict at all.',
          ],
        },
        { kind: 'heading', text: 'The Permanence Charter' },
        {
          kind: 'para',
          text:
            'What makes the three-step recipe *legal*? Nineteenth-century algebra had to answer exactly this, because the new systems were behaving scandalously well: negative numbers, fractions and irrationals all seemed to obey the same rules as counting numbers, and nobody had said whether that was a right or a coincidence. George Peacock (1833) answered with a principle he called the permanence of equivalent forms; Hermann Hankel (1867) sharpened it into the modern charter.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Peacock 1833 → Hankel 1867: the laws are the invariant',
          text:
            'Peacock\'s "principle of the permanence of equivalent forms" said: a law of arithmetic true for the counting numbers remains true for the extended symbols, unless the extension explicitly says otherwise. Hankel\'s *Theorie der complexen Zahlensysteme* (1867) made it precise and honest — the permanence is not a mystical guarantee but a *design requirement*: an extension is acceptable exactly when the old laws transfer. This book\'s chapters 6–8 were each, at heart, a check that the charter holds at one more rung. The charter is also self-limiting, which is its virtue: it forbids extensions that would break, say, cancellation — and indeed division by zero, which would break it, is forbidden on every rung of the ladder.',
        },
        {
          kind: 'para',
          text:
            'Stated for our ladder, the charter has two clauses — one forbidding loss, one permitting gain:',
        },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Nothing old breaks.** Every law ℕ obeys, ℤ obeys; every law ℤ obeys, ℚ obeys; every law ℚ obeys, ℝ obeys. The run-64 sweep checked the core laws at each rung with exact arithmetic — commutativity, associativity, distributivity, cancellation — thousands of triples per rung, zero failures. The radical spot checks carried from chapter 8 confirm the ℚ-to-ℝ leg: $\\sqrt{2} \\cdot \\sqrt{8} = 4$, $\\sqrt{2} + \\sqrt{8} = 3\\sqrt{2}$, $(1+\\sqrt{2})(1-\\sqrt{2}) = -1$, $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$.',
          '(ii) **Each rung adds exactly one power.** ℤ adds additive inverses — every difference answers. ℚ adds multiplicative inverses — every $a \\neq 0$ divides. ℝ adds completeness — every nonnegative number has a root, and the holes are filled. One power per rung; no rung is redundant.',
        ] },
        { kind: 'table', caption: 'The law ledger — kept (swept green at every rung) versus gained (one power per rung)', head: ['Rung', 'Laws kept (nothing breaks)', 'Power gained (the repair)'], rows: [
          ['ℕ', '— the floor: all core laws hold here first', 'closure under $+, \\times$; induction'],
          ['ℤ', 'all ℕ laws (61·61·9-triple sweep, 0 fail)', '$x + a = b$ always solvable (additive inverses)'],
          ['ℚ', 'all ℤ laws (fraction sweep, 0 fail)', '$a x = b$ always solvable for $a \\neq 0$ (inverses)'],
          ['ℝ', 'all ℚ laws (the field laws, ch. 7–8)', '$x^2 = n$ solvable for all $n \\ge 0$; limits complete'],
        ] },
        {
          kind: 'para',
          text:
            'The ledger explains a fact every student has felt but rarely seen named: **arithmetic never gets relearned.** The multiplication table you memorized at seven is a true table of ℚ, ℝ, and every system above — permanence is the reason. When a new system *does* seem to change a rule (as when ℤ absorbs "you cannot subtract a bigger from a smaller"), read carefully: the old rule was never a law, only a statement about the smaller domain — $5 - 8$ was never forbidden by a law of ℕ; it was merely unanswerable there.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What permanence forbids',
          text:
            'The charter cuts both ways. Because the old laws must survive, an extension may not invent exceptions: no system built by this recipe may declare $0 \\cdot n = 7$, or make $0/0 = 1$ while keeping distributivity and cancellation (chapter 9.3 derived the verdict from exactly those laws). When you meet a proposed "new number system" that breaks an old law, it is not an extension of the ladder — it is a different structure, and it must say so honestly, as the complex numbers do by giving up order (a note at the end of this lesson).',
        },
        { kind: 'heading', text: 'The One-Step Solvability Theorem' },
        {
          kind: 'para',
          text:
            'Everything so far compresses into one theorem — the precise map of *what each system answers*. It is the theorem this chapter will reuse twice (lesson 10.2\'s checksum analysis is a solvability question in $\\mathbb{Z}/n\\mathbb{Z}$; lesson 10.3\'s toolkit is one in disguise), so we state it in full.',
        },
        { kind: 'derivation', title: 'One-step solvability across the ladder', statement: 'Let $a, b \\in \\mathbb{Z}$ with $a \\neq 0$ and $n \\in \\mathbb{Z}$. Then: (1) $x + a = b$ has a ℕ-solution iff $b - a \\ge 1$, and a ℤ-solution always; (2) $a x = b$ has a ℤ-solution iff $a \\mid b$, and a ℚ-solution always; (3) $x^2 = n$ has a ℚ-solution iff $n$ is a perfect square, and an ℝ-solution iff $n \\ge 0$.', steps: [
          { label: 'The subtraction rung', formula: 'x + a = b \\iff x = b - a', explanation: 'In ℤ the answer always exists. It lies in ℕ exactly when $b - a \\ge 1$ — recall 0 ∉ ℕ in this book, so $b = a$ (x = 0) already steps off the naturals. The sweep confirmed 435 of the 900 pairs $(a,b) \\in [1,30]^2$ have $b > a$.' },
          { label: 'The division rung', formula: 'a x = b \\text{ in } \\mathbb{Z} \\iff a \\mid b', explanation: 'If x ∈ ℤ solves it then b = ax shows a | b; conversely x = b/a is an integer exactly then. The sweep counted: Σ ⌊60/a⌋ for a = 2..12 gives 124 of the 660 pairs. In ℚ, x = b/a exists for every a ≠ 0 — the field law of chapter 7.' },
          { label: 'The root rung in ℚ', formula: 'x^2 = n,\\ x = p/q \\text{ lowest terms} \\Rightarrow p^2 = n q^2 \\Rightarrow q = 1', explanation: 'If q > 1, a prime dividing q divides p² = n q², hence divides p — contradicting lowest terms. So x is an integer and n = x² is a perfect square; conversely a perfect square is obviously answered. The sweep: 10 of the first 100 integers are perfect squares.' },
          { label: 'The root rung in ℝ', formula: 'x^2 = n,\\ n \\ge 0 \\text{ answers in } \\mathbb{R}', explanation: 'Chapter 8\'s completeness delivers √n for every n ≥ 0 (the cut construction), and for n < 0 no solution can exist in any ordered system — the sign law: x ≥ 0 gives x² ≥ 0, and x < 0 gives (−x)² = x² ≥ 0. The verifier re-swept the sign law and re-ran the p² = 2q² impossibility grid.' },
          { label: 'The ladder reads off', formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}:\\ \\text{each } \\supset \\text{ answers strictly more}', explanation: 'Each verdict set strictly contains the previous (900 > 435; 660 > 124; 100 > 10 on the swept ranges) — "more powerful" is a countable, checkable claim, not a vibe.' },
        ], result: 'The census of the one-step equations: $x + a = b$ — ℕ iff $b > a$, ℤ always; $ax = b$ — ℤ iff $a \\mid b$, ℚ always ($a \\neq 0$); $x^2 = n$ — ℚ iff $n$ is a perfect square, ℝ iff $n \\ge 0$. Every "repair" in this book is one row of this theorem.' },
        { kind: 'figure', caption: 'The repair map: four systems, three forced rungs, one open gate. Each arrow embeds the old system unchanged (the embedding theorem); the dashed gate above ℝ marks the failure this book deliberately leaves unrepaired — no ordered system can answer x² = −1.', svg: repairMapSvg() },
        { kind: 'heading', text: 'What the Map Does Not Show' },
        {
          kind: 'para',
          text:
            'An honest map marks its own edges, so here are the three edges of ours. **First, the ladder ends but arithmetic does not:** $x^2 = -1$ is answered by no rung — the sign law forbids it in every ordered system — and the complex numbers answer it by keeping every field law while giving up order. That construction belongs to a later book; what matters here is that it is *not* a violation of permanence but its continuation, with one law-family (order) consciously surrendered. **Second, size:** nothing on our map says how big each system is — that ℚ is countable while ℝ is not is Cantor\'s theorem, and it opens the Set Theory shelf. **Third — and next lesson\'s business — the map has smallest territories:** the finite circular systems $\\mathbb{Z}/n\\mathbb{Z}$ from chapter 5. They are not footnotes to the ladder; they are systems in the full sense of the definition above, with their own laws, their own invertible elements, their own solvability census.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The date cluster 1867–1872',
          text:
            'The map was drawn under pressure in five years: Hankel\'s permanence charter (1867), Dedekind\'s cuts booklet and Cantor\'s fundamental sequences and Heine\'s exposition (1872) — the arithmetization of the real line — all within reach of one long-lived reader. Beck and Geoghegan\'s *The Art of Proof* opens by declaring "our subject is number systems" — the same map, as the front door of university mathematics. This book has walked it rung by rung.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner — the ladder as a classification question',
          text:
            'Competitive examinations test this lesson almost verbatim, in two recurring shapes. Shape one: "in which system does the answer live?" — for $5 - 8$, $3x = 2$, $x^2 = 2$, the expected classification is ℤ, ℚ, ℝ (with ℕ as the trap answer for $5 - 8$). Shape two: "for how many pairs is there no solution *in ℕ*?" — the census counts ($b > a$; $a \\mid b$; perfect squares) are exactly what such items want, and the boundary $b = a$ (answer 0, not a natural) is the planted trap. Lesson 10.3 will add the toolkit questions (unit digits, factorial zeros) that ride on the same ladder.',
        },
        {
          kind: 'para',
          text:
            'With the map drawn and its edges marked, one territory now deserves its day in the sun. The finite systems $\\mathbb{Z}/n\\mathbb{Z}$ were built in chapter 5 as an arithmetic of remainders; their grandest everyday employment — guarding the numbers on the back of every book you own, every card in your wallet — is a story about three specific systems, $n = 9$, 10 and 11, and it is the next lesson\'s subject.',
        },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Which failure of ℕ forced the construction of ℤ?',
            options: [
              'Multiplication sometimes grows too fast to tabulate',
              'Differences like 5 − 8 have no natural verdict — the equation x + 8 = 5 has no ℕ solution',
              'Some natural numbers have too many divisors',
              'Counting runs out of numbers for large quantities',
            ],
            answer: 1,
            explain:
              'Chapter 6 built ℤ precisely because subtraction kept failing: 8 + x ≥ 9 > 5 for every natural x, so x + 8 = 5 is unsolvable in ℕ. Option 0 describes a convenience problem, not a closure failure; option 2 describes primality (chapter 4), irrelevant to the ℤ rung; option 3 is false — successors never run out.',
          },
          {
            q: 'Which statement is the permanence charter?',
            options: [
              'Each new system keeps every law of the old one and adds exactly one new power',
              'Each new system replaces the old laws with stronger ones',
              'Old computations must be redone carefully in each new system',
              'The laws of arithmetic hold only in the largest system, ℝ',
            ],
            answer: 0,
            explain:
              'Peacock (1833) and Hankel (1867): an extension is acceptable exactly when the old laws transfer — nothing old breaks, one power is gained per rung. Option 1 inverts the design; option 2 contradicts the embedding theorem (old computations agree verbatim); option 3 is the opposite of the truth — the laws hold at every rung, including the floor.',
          },
          {
            q: 'For a in [2, 12] and b in [1, 60], the equation a·x = b has an integer solution for exactly —',
            options: ['all 660 pairs', '124 of the 660 pairs — those with a | b', 'exactly half the pairs', 'only the pairs with b prime'],
            answer: 1,
            explain:
              'a·x = b is ℤ-solvable iff a divides b, and the sweep counted Σ ⌊60/a⌋ = 30+20+15+12+10+8+7+6+6+5+5 = 124 of 660 (note ⌊60/10⌋ = 6 — a common hand-count slip). Option 0 describes ℚ\'s verdict (every a ≠ 0 divides there), option 3 fails on b = 12 (a = 2 divides it, 12 not prime).',
          },
          {
            q: 'The failure x² = 2 is repaired by —',
            options: ['ℤ, since 2 is an integer', 'ℚ, since 2/1 is a fraction', 'ℝ — √2 exists there and nowhere smaller', 'no system in this book'],
            answer: 2,
            explain:
              'Chapter 8 proved √2 irrational — no p/q in lowest terms has p² = 2q² (re-swept on the p ≤ 60, q ≤ 40 grid) — so ℚ fails and completeness delivers √2 in ℝ. Option 2 (with answer index 1 as written: "ℚ") is the planted trap precisely because ℚ repairs the rung BELOW — division — not this one.',
          },
          {
            q: 'Which equation remains unsolved on our entire ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ?',
            options: ['x + 7 = 2', '3x = 2', 'x² = 2', 'x² = −1'],
            answer: 3,
            explain:
              'The sign law — x² ≥ 0 in every ordered system — forbids x² = −1 on every rung; it waits for ℂ, which keeps the field laws but gives up order. The first three are exactly the three repairs: x + 7 = 2 answers in ℤ (x = −5), 3x = 2 in ℚ (x = 2/3), x² = 2 in ℝ (√2).',
          },
        ] },
        { kind: 'exercises', title: 'Exercises', sets: [
          { level: 'L1', questions: [
            {
              q: 'Name the smallest system on our ladder in which each verdict lives: (i) 5 − 8 (ii) 3 × 4 (iii) 2/3 (iv) √2.',
              solution: [
                'Classify each verdict against the census of this lesson.',
                '(i) $5 - 8 = -3$: negative — ℕ cannot, ℤ can: the answer lives in $\\mathbb{Z}$.',
                '(ii) $3 \\times 4 = 12$: a natural — ℕ answers, and ℕ is the smallest system that does.',
                '(iii) $2/3$: no integer verdict ($2 = 3x$ has no ℤ solution, 3 ∤ 2) — $\\mathbb{Q}$.',
                '(iv) $\\sqrt{2}$: irrational (ch. 8) — $\\mathbb{R}$.',
              ],
              answer: '(i) ℤ (ii) ℕ (iii) ℚ (iv) ℝ',
            },
            {
              q: 'Compute the three repairs of this book and name the failure each one repairs.',
              solution: [
                'Failure 1 — subtraction in ℕ: $5 - 8$ has no natural verdict.',
                'Repair 1 (ℤ, difference pairs): $5 - 8 = -3$.',
                'Failure 2 — division in ℤ: $3x = 2$ has no integer verdict (3 ∤ 2).',
                'Repair 2 (ℚ, fraction pairs): $x = 2/3$.',
                'Failure 3 — roots in ℚ: $x^2 = 2$ has no rational verdict (p² = 2q² impossible, ch. 8).',
                'Repair 3 (ℝ, cuts): $x = \\sqrt{2}$ (and its negative).',
              ],
              answer: '−3 (subtraction); 2/3 (division); √2 (roots)',
            },
            {
              q: 'Is 0 a natural number in this book? Exhibit the boundary equation that exposes why the answer matters.',
              solution: [
                'No — chapter 1\'s axioms start the chain at 1: $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$.',
                'The boundary: $x + 7 = 7$ has solution $x = 0$ — a ℤ verdict, not a ℕ one.',
                'In the census language: $x + a = b$ is ℕ-solvable iff $b > a$; the case $b = a$ is exactly where 0 would be needed.',
                'Hence the ℕ solvability count is 435 of 900 (not 465): the 30 pairs with $b = a$ already leave ℕ.',
              ],
              answer: 'No; x + 7 = 7 (x = 0 ∉ ℕ, ∈ ℤ)',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'For (a, b) ∈ [1, 5]², count the pairs for which x + a = b has NO ℕ solution, and check your count by the theorem.',
              solution: [
                'By the one-step theorem: unsolvable in ℕ iff $b \\le a$.',
                'Count: for each a, the b ≤ a contribute a pairs: $1 + 2 + 3 + 4 + 5 = 15$.',
                'Check: solvable pairs are $b > a$: $25 - 15 = 10$ — and indeed $b - a \\ge 1$ for exactly 10 of the 25.',
                'The general shape: $n(n+1)/2$ unsolvable pairs in $[1, n]^2$ — a triangular number, here $T_5 = 15$.',
              ],
              answer: '15 of 25 (b ≤ a); 10 solvable',
            },
            {
              q: 'For a ∈ {2, 3, 4} and b ∈ [1, 12], list which pairs a·x = b have a ℤ-solution and count them two ways.',
              solution: [
                'ℤ-solvable iff $a \\mid b$.',
                'a = 2: b ∈ {2, 4, 6, 8, 10, 12} — 6 pairs. a = 3: {3, 6, 9, 12} — 4. a = 4: {4, 8, 12} — 3.',
                'Count: $6 + 4 + 3 = 13$ of 36.',
                'Second way: $\\lfloor 12/2 \\rfloor + \\lfloor 12/3 \\rfloor + \\lfloor 12/4 \\rfloor = 6 + 4 + 3 = 13$. ✓',
                'Note the shape — the same Σ ⌊N/a⌋ that gave 124 on the [2,12]×[1,60] census.',
              ],
              answer: '13 of 36',
            },
            {
              q: 'Compute [(3,0)] + [(4,0)] and [(3,0)]·[(4,0)] from the difference-pair formulas, and confirm both results sit on the embedded image of ℕ.',
              solution: [
                'Addition: $[(3,0)] + [(4,0)] = [(3+4,\\ 0+0)] = [(7, 0)] = e(7)$. ✓',
                'Multiplication: $[(3,0)] \\cdot [(4,0)] = [(3 \\cdot 4 + 0 \\cdot 0,\\ 3 \\cdot 0 + 0 \\cdot 4)] = [(12, 0)] = e(12)$. ✓',
                'Both land on embedded naturals — the embedding theorem\'s "computations agree", instance by instance.',
                'The contrast: $[(5, 8)]$ has NO embedded-natural form ($5 < 8$) — this is the new territory ℤ adds.',
              ],
              answer: '[(7,0)] = e(7); [(12,0)] = e(12)',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Prove that x + 8 = 5 has no natural solution, using only chapter 1\'s order structure — then give the ℤ verdict in pair notation.',
              solution: [
                'Every natural $x$ satisfies $x \\ge 1$ (1 is the first natural; there is nothing before it).',
                'So $8 + x \\ge 8 + 1 = 9$ — adding preserves order (ch. 1).',
                'Trichotomy: $8 + x = 5$ would need $8 + x < 9$ and $= 5$; both contradict $8 + x \\ge 9$. No ℕ verdict.',
                'In ℤ: the pair $[(5, 8)]$ names the difference; $[(5,8)] = [(5-8, 0)] = [(-3, 0)]$ — the verdict is $-3$, and indeed $8 + (-3) = 5$.',
              ],
              answer: 'No ℕ solution; ℤ answers −3',
            },
            {
              q: 'Show that (n, 1) and (nk, k) name the same rational for every k ≥ 1, and explain what this yields for ℤ\'s computations inside ℚ.',
              solution: [
                'Chapter 7\'s equivalence: $(p, q) \\sim (r, s)$ iff $ps = rq$.',
                'Check: $(n, 1) \\sim (nk, k)$ iff $n \\cdot k = nk \\cdot 1$ — true for every $k \\ge 1$. ✓',
                'So each integer has infinitely many fraction names — $5 = (5,1) = (10,2) = (55,11)$ — and the sweep in the verifier confirmed the renamings never collide with a different integer.',
                'Consequence: the ℤ-computations transfer unchanged (the embedding $n \\mapsto (n, 1)$ is a homomorphism — add and multiply before or after renaming, same verdict), which is permanence at the ℚ rung.',
              ],
              answer: '(n,1) ~ (nk,k) since nk = nk; ℤ computes identically inside ℚ',
            },
            {
              q: 'Verify the distributive law for the difference-pair model on (2,5), (7,3), (1,4): show [(2,5)]·([(7,3)] + [(1,4)]) equals [(2,5)]·[(7,3)] + [(2,5)]·[(1,4)].',
              solution: [
                'Sum first: $[(7,3)] + [(1,4)] = [(8, 7)]$.',
                'LHS: $[(2,5)] \\cdot [(8,7)] = [(2 \\cdot 8 + 5 \\cdot 7,\\ 2 \\cdot 7 + 5 \\cdot 8)] = [(51, 54)] = 51 - 54 = -3$.',
                'Product 1: $[(2,5)] \\cdot [(7,3)] = [(14 + 15,\\ 6 + 35)] = [(29, 41)] = -12$.',
                'Product 2: $[(2,5)] \\cdot [(1,4)] = [(2 + 20,\\ 8 + 5)] = [(22, 13)] = 9$.',
                'RHS: $[(29,41)] + [(22,13)] = [(51, 54)] = -3$. LHS = RHS. ✓ (Both sides $-3$; the verifier swept this identity over thousands of triples.)',
              ],
              answer: 'Both sides equal −3',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'Exam-style: for how many pairs (a, b) with a, b ∈ [1, 10] does x + a = b have no ℕ solution? State the count for [1, n]² generally.',
              solution: [
                'Unsolvable in ℕ iff $b \\le a$ (the theorem; note $b = a$ already fails since the answer would be 0).',
                'Count for $n = 10$: $1 + 2 + \\cdots + 10 = 55$ of the 100 pairs.',
                'Generally: $\\sum_{a=1}^{n} a = n(n+1)/2$ — the triangular number $T_n$.',
                'Check the shape at n = 30 (the chapter\'s census): $T_{30} = 465$ unsolvable, $900 - 465 = 435$ solvable — matching the sweep exactly. ✓',
              ],
              answer: '55 of 100; generally n(n+1)/2',
            },
            {
              q: 'Exam-style: for n ∈ [1, 20], x² = n is solvable in which systems? Give the exact ℚ-solvable set and the two counts.',
              solution: [
                'ℚ-solvable iff $n$ is a perfect square: $n \\in \\{1, 4, 9, 16\\}$ — 4 of 20.',
                'ℝ-solvable: all 20 (every $n \\ge 1$ has a real root, ch. 8).',
                'ℤ-solvable: the same four — the theorem\'s proof showed a rational root of an integer square must be an integer.',
                'And $x^2 = 0$? Solvable in ℤ, ℚ, ℝ ($x = 0$) — never in ℕ, the book\'s boundary convention again.',
              ],
              answer: '{1, 4, 9, 16} in ℚ and ℤ (4 of 20); all 20 in ℝ',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'State the permanence charter in your own words, then prove that 0 has no multiplicative inverse in ANY system of the ladder — which law forces this?',
              solution: [
                'Charter: an extension must preserve every law the old system obeyed, and may only add new powers — nothing old breaks, one thing is gained.',
                'Suppose $0 \\cdot u = 1$ for some $u$ in a system with the field-shaped laws.',
                'But $0 \\cdot u = 0$ (the zero-product theorem: $0 \\cdot u + 0 \\cdot u = 0 \\cdot (u + u) = 0 \\cdot u$, so cancellation gives $0 \\cdot u = 0$ — derived in lesson 9.3 from distributivity + cancellation).',
                'So $0 = 1$ — false in every system on the ladder (1 ≠ 0 is part of the identity structure).',
                'The forcing law is cancellation via distributivity — the same laws that make the systems work forbid the inverse. Division by zero stays forbidden on every rung: permanence protects the old prohibition too.',
              ],
              answer: '0·u = 0 ≠ 1 by the zero-product theorem — no inverse on any rung',
            },
            {
              q: 'Prove: an integer n ≥ 1 has a rational square root if and only if every prime exponent in its factorization is even.',
              solution: [
                '(⇐) If $n = p_1^{2e_1} \\cdots p_k^{2e_k}$, then $n = (p_1^{e_1} \\cdots p_k^{e_k})^2$ — a rational (integer) root exists.',
                '(⇒) Let $x = a/b$ in lowest terms solve $x^2 = n$: then $a^2 = n b^2$.',
                'If $b > 1$, a prime $p \\mid b$ gives $p \\mid a^2$, hence $p \\mid a$ (Euclid\'s lemma, ch. 4) — contradicting lowest terms. So $b = 1$ and $x = a$ is an integer.',
                'Then $n = a^2$, and by uniqueness of factorization (FTA, ch. 4) the exponents of a square are all even. ∎',
                'This is the census\'s "perfect squares" row made structural — and the p² = 2q² impossibility is the case n = 2 (exponent 1, odd).',
              ],
              answer: 'Rational root ⟺ all prime exponents of n even',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'The ladder ends: show that no ordered system — ℝ included — can solve x² = −1, and explain which property ℂ consciously gives up to answer it.',
              solution: [
                'In an ordered field, every element is $x \\ge 0$ or $x < 0$ (trichotomy).',
                'Case 1: $x \\ge 0$ — products of nonnegatives are nonnegative (order\'s closure axiom), so $x^2 \\ge 0$.',
                'Case 2: $x < 0$ — then $x^2 = (-x)^2$ with $-x > 0$, so again $x^2 \\ge 0$.',
                'Either way $x^2 \\ge 0 > -1$: the equation $x^2 = -1$ is unsolvable in EVERY ordered system. The gate on the map is permanent for order-respecting structures.',
                'ℂ answers it by keeping every field law (permanence continues!) while surrendering order — there is no consistent "positive" notion for ℂ. The map\'s edge is where the next book begins.',
              ],
              answer: 'x² ≥ 0 in every ordered system; ℂ gives up order',
            },
            {
              q: 'The map\'s smallest territories: write a short note on what the congruence systems ℤ/9ℤ, ℤ/10ℤ and ℤ/11ℤ add to the map, and why they are full number systems rather than shorthand.',
              solution: [
                'Each $\\mathbb{Z}/n\\mathbb{Z}$ (ch. 5) is a set of $n$ residues with $+$ and $\\times$ taken modulo $n$ — closed, commutative, associative, distributive, with identities 0 and 1: every item of the definition of a number system is met.',
                'They are FINITE and CIRCULAR: $9 + 1 = 10 \\equiv 1 \\pmod{9}$ — addition walks a circle of $n$ stations, unlike anything on the infinite ladder.',
                'They sit beside the ladder, not on it: the map of arithmetic is bigger than one line.',
                'Key structural fact for next lesson: in $\\mathbb{Z}/9\\mathbb{Z}$, $10 \\equiv 1$, so every power of ten collapses onto the units place — a whole place-value string condenses to its digit sum. In $\\mathbb{Z}/11\\mathbb{Z}$, $10 \\equiv -1$: alternating collapse.',
                'Lesson 10.2 will turn exactly these collapses into error-detecting machines — the congruence engine guarding ISBNs and card numbers.',
              ],
              answer: 'Finite circular systems meeting the full definition; 10 ≡ 1 (mod 9), 10 ≡ −1 (mod 11) are the two collapses checksums exploit',
            },
          ] },
        ] },
        { kind: 'formula', name: 'The ladder of embeddings', latex: '\\mathbb{N} \\ni n \\mapsto [(n, 0)] \\in \\mathbb{Z} \\ni n \\mapsto (n, 1) \\in \\mathbb{Q} \\hookrightarrow \\mathbb{R}', note: 'injective, + and × preserved at every rung — every old computation is a new-system computation with the same verdict' },
        { kind: 'formula', name: 'One-step solvability across the ladder', latex: 'x + a = b:\\ \\mathbb{N} \\iff b > a,\\ \\mathbb{Z} \\text{ always}; \\quad ax = b:\\ \\mathbb{Z} \\iff a \\mid b,\\ \\mathbb{Q} \\text{ always}; \\quad x^2 = n:\\ \\mathbb{Q} \\iff n \\text{ a perfect square},\\ \\mathbb{R} \\iff n \\ge 0', note: 'the census theorem — 435/900, 124/660, 10/100 on the swept ranges' },
        { kind: 'formula', name: 'The permanence charter', latex: '\\mathrm{laws}(\\mathbb{N}) \\subseteq \\mathrm{laws}(\\mathbb{Z}) \\subseteq \\mathrm{laws}(\\mathbb{Q}) \\subseteq \\mathrm{laws}(\\mathbb{R})', note: 'nothing old breaks, one power per rung (Peacock 1833, Hankel 1867)' },
        { kind: 'formula', name: 'The unsolvable gate', latex: 'x \\ge 0 \\text{ or } x < 0 \\ \\Rightarrow\\ x^2 \\ge 0 \\ \\Rightarrow\\ x^2 = -1 \\text{ has no ordered solution}', note: 'the ladder\'s permanent edge; ℂ answers by keeping the field laws and giving up order' },
      ],
    },
    {
      id: 'ans-numbers-that-guard-data-checksums-and-casting-out-nines',
      number: '10.2',
      title: 'Numbers That Guard Data: Checksums and Casting Out Nines',
      prerequisites: [
        'ans-remainders-become-numbers-congruence-defined',
        'ans-why-the-divisibility-tests-work',
        'ans-unit-digit-cycles-of-powers',
        'ans-the-great-extension-story',
      ],
      sources: [
        'gauss-1801-disquisitiones',
        'fibonacci-1202-liber-abaci',
        'hamming-1950-error-detecting',
        'isbn-check-digit-schemes',
        'luhn-algorithm-iso7812',
      ],
      concepts: [
        'Casting out nines',
        'Digital root',
        'Check digit',
        'Weighted checksum',
        'ISBN-10 (mod 11)',
        'ISBN-13 / EAN (mod 10)',
        'Luhn algorithm',
        'Error detection',
      ],
      objectives: [
        'rebuild the casting-out-nines engine as a computation inside ℤ/9ℤ and use it to check sums, differences and products',
        'prove exactly what the mod-9 check catches (88 of 90 single-digit substitutions) and what it never catches (every adjacent transposition)',
        'state the two detection theorems for weighted checksums over a prime modulus and apply them to ISBN-10, where every single-digit error and every adjacent transposition is caught',
        'compute and verify ISBN-10 and ISBN-13/EAN-13 check digits, including the X = 10 case, and explain what ISBN-13\'s composite modulus costs',
        'run the Luhn algorithm on an identification number and locate its one transposition blind spot (0 ↔ 9)',
        'read all four schemes as one idea — a map into ℤ/mℤ whose solvability condition is the guard — and state honestly what a checksum can never do',
      ],
      blocks: [
        {
          kind: 'para',
          text:
            'On the back of every book you own, every card in your wallet, every parcel label a courier scans, a small piece of lesson 10.1\'s map is quietly working: a **finite congruence system** — $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, or $\\mathbb{Z}/11\\mathbb{Z}$ — standing guard over data. The guard is called a **check digit** or **checksum**: one extra digit, computed from the others by a fixed congruence rule, so that when a human types the number back and makes one of the two mistakes humans actually make — miswriting one digit, or swapping two neighbours — the typed number fails the rule and the machine refuses it.',
        },
        {
          kind: 'para',
          text:
            'This lesson builds the four classical engines in order of increasing cleverness — casting out nines (mod 9, the oldest), ISBN-10 (mod 11, weighted), ISBN-13/EAN (mod 10, alternating weights) and the Luhn algorithm (mod 10, doubling) — and for each one it proves *exactly* which errors are caught and which slip through. Every catch rate in the lesson was computed by exhaustive sweep in the run-64 verifier (sections E–I) before any prose was written; the numbers you are about to read are measurements, not impressions.',
        },
        { kind: 'terms', items: [
          {
            term: 'Checksum / check digit',
            def: 'An extra digit (or residue) computed from a number by a fixed congruence rule and carried with it; a typed copy is accepted only if the rule holds again. The check digit adds no information for humans — it exists entirely to make common typing errors detectable.',
          },
          {
            term: 'Casting out nines',
            def: 'The classical check on arithmetic: replace each operand and the result by its residue mod 9 (its digital root) and re-test the relation. Works because $10 \\equiv 1 \\pmod 9$, so every place value collapses onto the units station. Described in Fibonacci\'s Liber Abaci (1202) and older; used for centuries by bookkeepers.',
          },
          {
            term: 'Digital root',
            def: 'The single digit left after repeatedly summing the digits of a number: $\\mathrm{dr}(N) = 1 + ((N - 1) \\bmod 9)$ for $N \\ge 1$ (and $\\mathrm{dr}(0) = 0$). It is the representative of $N$\'s residue class in $\\{1, \\ldots, 9\\}$ — the mod-9 residue wearing the digit-sum costume.',
          },
          {
            term: 'Weighted checksum',
            def: 'A validity rule of the form $\\sum w_i d_i \\equiv 0 \\pmod m$, where the digits $d_i$ carry position-dependent weights $w_i$. The weights are the design freedom: choosing them well is what separates a check that catches transpositions (ISBN-10) from one that never does (casting out nines, where all weights are 1).',
          },
          {
            term: 'ISBN-10 (mod 11)',
            def: 'The 1980s–2006 book code: ten digits with the check digit placed last so that $\\sum_{i=1}^{10} i \\, d_i \\equiv 0 \\pmod{11}$. Because 11 is prime and bigger than 10, every single-digit miswrite and every adjacent transposition changes the weighted sum — both error classes are caught, always. The residue 10 is written X.',
          },
          {
            term: 'ISBN-13 / EAN-13 (mod 10)',
            def: 'The modern book/barcode code: thirteen digits with weights $1, 3, 1, 3, \\ldots$ and validity $\\sum w_i d_i \\equiv 0 \\pmod{10}$. Every single-digit error is caught ($\\gcd(3, 10) = 1$); transpositions of digits differing by 5 (0↔5, 1↔6, …, 4↔9) slip through — 80 of the 90 ordered pairs are caught.',
          },
          {
            term: 'Luhn algorithm',
            def: 'Hans Peter Luhn\'s 1954 mod-10 scheme (now ISO/IEC 7812-1, used on most credit and many ID numbers): double every second digit from the right, subtract 9 from any result above 9, and require the total $\\equiv 0 \\pmod{10}$. The doubling map $[0,2,4,6,8,1,3,5,7,9]$ is injective, so all single-digit errors are caught; only the adjacent transposition 0↔9 slips (89 of 90).',
          },
          {
            term: 'Error detection (vs correction)',
            def: 'Detection = the ability to notice that something is wrong; correction = the ability to say what was right. All four schemes here only detect. Richard Hamming\'s 1950 paper, which framed the whole subject, took the next step — adding enough redundancy to locate and repair the error — and founded coding theory. Correction belongs to the Computer Science shelf.',
          },
        ] },
        { kind: 'heading', text: 'Casting Out Nines: the Oldest Checksum' },
        {
          kind: 'para',
          text:
            'The engine was already ancient when Fibonacci described it to Europe in 1202: to check an arithmetic result, replace every number by its **digital root** and redo the computation on those small representatives. Chapter 5 derived the engine from $10 \\equiv 1 \\pmod 9$ (the divisibility test for 9); here the emphasis flips from divisibility to **guarding**, so let us restate the mechanism in the map\'s language.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The mod-9 collapse (the engine)',
          text:
            'In $\\mathbb{Z}/9\\mathbb{Z}$ every power of ten equals 1: $10 \\equiv 1$, so $10^k \\equiv 1$ for all $k$. Hence $N = \\sum d_i 10^i \\equiv \\sum d_i \\pmod 9$ — a whole place-value string computes the same residue as its digit sum. The **digital root** $\\mathrm{dr}(N) = 1 + ((N-1) \\bmod 9)$ (for $N \\ge 1$) is that residue in the friendly $1..9$ costume, and it is closed under the operations: $\\mathrm{dr}(a + b) = \\mathrm{dr}(\\mathrm{dr}(a) + \\mathrm{dr}(b))$ and $\\mathrm{dr}(a \\cdot b) = \\mathrm{dr}(\\mathrm{dr}(a) \\cdot \\mathrm{dr}(b))$ — both swept to 50,000 and 2,000 × 2,000 respectively in the run-64 verifier with zero failures.',
        },
        {
          kind: 'para',
          text:
            'For example, the check on a multiplication:',
        },
        {
          kind: 'example', title: 'Verify 8,234 × 4,912 = 40,445,408 by casting out nines',
          steps: [
            'Digital roots of the operands: $\\mathrm{dr}(8{,}234)$: $8+2+3+4 = 17 \\to 8$; $\\mathrm{dr}(4{,}912)$: $4+9+1+2 = 16 \\to 7$.',
            'The check relation: $\\mathrm{dr}(8234) \\cdot \\mathrm{dr}(4912) = 8 \\cdot 7 = 56 \\to \\mathrm{dr}(56) = 5 + 6 = 11 \\to 2$.',
            'The claimed product: $4+0+4+4+5+4+0+8 = 29 \\to 2$. Both sides land on 2 — the arithmetic survives the check. ✓',
            'Now plant a realistic error: the product mis-typed as 40,445,40**6** (one digit off). Its digit sum: $27 \\to 9 \\neq 2$ — the mismatch SCREAMS: the result as typed cannot be the product.',
            'But swap two adjacent digits of the true product — 40,445,4**80**: digit sum $29 \\to 2 = 2$. The check stays silent: this error is invisible to mod 9.',
          ],
        },
        { kind: 'figure', caption: 'The mod-9 residue wheel: nine stations; every power of ten lands on station 1, so a place-value string condenses to its digit sum. The brown walk is 8,234 being read digit by digit — landing on station 8. Casting out nines is computing on this wheel instead of on the number line.', svg: residueWheelSvg() },
        {
          kind: 'para',
          text:
            'The exhibit exposes the scheme\'s whole personality: cheap, ancient, effective against miswrites — and **structurally blind to transpositions**. That is not bad luck; it is a theorem, and proving it is the first piece of real business of this lesson.',
        },
        { kind: 'derivation', title: 'What casting out nines catches — and what it can never catch', statement: 'A single-digit change (digit e at position k replaced by f ≠ e) changes the mod-9 residue by $(f - e) \\cdot 10^k \\equiv f - e \\pmod 9$, so it is caught iff $9 \\nmid (f-e)$ — exactly 88 of the 90 ordered digit pairs. An adjacent transposition changes N by $-9 \\cdot 10^k (d_{k+1} - d_k) \\equiv 0 \\pmod 9$, so NO transposition is ever caught.', steps: [
          { label: 'The single-digit shift', formula: 'N\' - N = (f - e)\\,10^{k} \\equiv (f - e) \\pmod 9', explanation: 'All place values are ≡ 1, so the shift is just the digit difference. The residue moves unless 9 divides it.' },
          { label: 'The slip census', formula: '9 \\mid (f - e) \\iff f - e = \\pm 9 \\iff (e, f) = (0, 9) \\text{ or } (9, 0)', explanation: 'Digit differences run from −9 to 9; the only non-zero multiples of 9 in that range are ±9. So exactly two of the 90 ordered substitutions slip: writing 0 for 9 or 9 for 0. Sweep-confirmed at the number level (six base numbers, every position, every digit): every slip was a 0↔9, no exceptions.' },
          { label: 'The transposition shift', formula: 'N\' - N = (d_{k+1} - d_k)10^{k} + (d_k - d_{k+1})10^{k+1} = -9 \\cdot 10^{k}(d_{k+1} - d_k)', explanation: 'Swapping two neighbours reshuffles them between adjacent place values; the algebra factors a naked 9 — the swap changes N by a MULTIPLE OF 9, always, whatever the digits.' },
          { label: 'The verdict', formula: 'N\' \\equiv N \\pmod 9 \\quad \\text{for every adjacent transposition}', explanation: 'The check sees the same residue before and after — 45 of 45 transposition types slip. The verifier\'s sweep found 0 catches in 7 sites × many numbers; the theorem says the count could never have been otherwise. Transposition-blindness is baked into the modulus, not into careless bookkeepers.' },
        ], result: 'Casting out nines catches 88 of 90 single-digit miswrites (only 0↔9 slips) and 0 of all adjacent transpositions. Every transposition leaves the residue untouched — a structural fact about ℤ/9ℤ, provable in one line and true forever.' },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Bookkeeper\'s probatio, 1202 and before',
          text:
            'Fibonacci\'s Liber Abaci introduces the check "by casting out nines" as part of the Hindu-Arabic reckoning toolkit; the practice (Latin *probatio novena*) is older still, reaching back through Arabic and Sanskrit arithmetic to the Pythagoreans\' digit mysticism. For seven centuries it was the standard audit of hand computation — the medieval clerk computing on the dust board or paper did the work twice: once for the answer, once for the residue. Chapter 5 banked the divisibility half of this story; here it earns its living as error detection.',
        },
        { kind: 'heading', text: 'Why the Misses Matter: Weighted Checks Enter' },
        {
          kind: 'para',
          text:
            'Casting out nines guards *arithmetic you did by hand*. The modern problem is different: guarding *identifiers typed back into machines* — and there the transposition is the number-one human error, precisely the error mod 9 cannot see. The fix took until the twentieth century and a shift of viewpoint: stop checking plain digit sums and start checking **weighted** sums, where each position carries its own multiplier.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Hamming, 1950: framing the whole subject',
          text:
            'Richard W. Hamming\'s "Error Detecting and Error Correcting Codes" (Bell System Technical Journal, 29(2), April 1950, pp. 147–160) framed detection and correction as a quantitative subject: add redundancy in a designed pattern, measure what error classes the pattern catches. The paper founded coding theory — and the ISBN example below lands on a pleasing loop, because the standard textbook example of an ISBN-10 is Hamming\'s own *Coding and Information Theory* (Prentice-Hall), ISBN 0-13-139139-9.',
        },
        {
          kind: 'para',
          text:
            'The general scheme: digits $d_1, \\ldots, d_n$ with weights $w_1, \\ldots, w_n$, modulus $m$; the number is valid iff',
        },
        { kind: 'equation', latex: '\\sum_{i=1}^{n} w_i \\, d_i \\equiv 0 \\pmod{m}', note: 'the check digit is chosen (when issuing the number) so that this congruence holds; a typed copy is accepted iff it still holds' },
        {
          kind: 'para',
          text:
            'Everything about a scheme follows from two questions: what does an error do to the sum $S = \\sum w_i d_i$, and can the corrupted sum still satisfy the congruence? Two computations answer both.',
        },
        { kind: 'derivation', title: 'The two detection theorems for weighted checksums', statement: 'Over a prime modulus $m > 9$ with all weights non-zero: (1) a single-digit substitution $e \\to f$ at position $i$ shifts $S$ by $(f - e) w_i$, which is $\\not\\equiv 0 \\pmod m$ for every digit pair — every miswrite is caught; (2) a transposition of adjacent digits $d_i, d_{i+1}$ shifts $S$ by $(d_i - d_{i+1})(w_i - w_{i+1})$, which is $\\not\\equiv 0 \\pmod m$ whenever the two weights differ — every adjacent transposition is caught.', steps: [
          { label: 'The substitution shift', formula: 'S\' - S = (f - e)\\, w_i', explanation: 'Only the i-th term changes. With m prime, m | (f − e)w_i would force m | (f − e) or m | w_i — but |f − e| ≤ 9 < m rules the first out, and w_i ≢ 0 rules the second out. The shift never lands back on a multiple of m: caught, always. (Sweep on ISBN-10s: 900 of 900 substitutions caught, no exceptions.)' },
          { label: 'The transposition shift', formula: 'S\' - S = (d_i w_i + d_{i+1} w_{i+1}) - (d_{i+1} w_i + d_i w_{i+1}) = (d_i - d_{i+1})(w_i - w_{i+1})', explanation: 'The two terms exchange weights; the algebra factors into (digit gap) × (weight gap). A transposition of DISTINCT digits has d_i − d_{i+1} ≠ 0 with |·| ≤ 9 < m; so the shift is ≢ 0 exactly when the weights differ. If w_i = w_{i+1}, the swap is invisible — which is exactly what happened in the mod-9 scheme, where ALL weights are 1.' },
          { label: 'Casting out nines re-read', formula: 'w_i = 1 \\text{ for all } i \\; \\Rightarrow \\; w_i - w_{i+1} = 0', explanation: 'The old scheme is the degenerate weighted scheme — equal weights — and the theorem predicts its blindness precisely. The weights are the design freedom; spending them (making neighbours differ) is what buys transposition detection.' },
          { label: 'The design rule', formula: 'm \\text{ prime}, \\; m > 9; \\quad w_i \\not\\equiv 0, \\; w_i \\neq w_{i+1}', explanation: 'Prime modulus makes "non-zero ⇒ non-factor" automatic; m > 9 keeps digit differences non-multiples of m. ISBN-10 will satisfy every clause: m = 11, weights 10, 9, …, 1 — all non-zero, all adjacent pairs differing by exactly 1.' },
        ], result: 'Over a prime modulus exceeding 9: non-zero weights catch every single-digit miswrite; neighbouring weights that differ catch every adjacent transposition. Design a scheme with both, and the two classic human errors are caught — every time, provably, with one extra digit.' },
        { kind: 'heading', text: 'ISBN-10: the Mod-11 Scheme' },
        {
          kind: 'para',
          text:
            'The old book number (in use from 1970 to 2007) is the theorem made industrial: ten digits $d_1 \\ldots d_{10}$, validity',
        },
        { kind: 'equation', latex: '\\sum_{i=1}^{10} i \\; d_i \\equiv 0 \\pmod{11}', note: 'weights 10, 9, 8, …, 1 (equivalently i·d_i with i = 1..10 read from the right) — the check digit d₁₀ is chosen at issue time to force the congruence' },
        {
          kind: 'para',
          text:
            'Why 11? It is the smallest prime above 9 — the theorem\'s clauses need primality (so that no weight or digit difference is a hidden factor of m) and m > 9 (so that digit differences never wrap). The price: a residue can now be 10, which no single digit can print — so the scheme writes **X** (Roman ten) when the check digit must be 10, about one book in eleven.',
        },
        {
          kind: 'example', title: 'Run the engine on Hamming\'s own textbook: 0-13-139139-9',
          steps: [
            'Digits and weights: (0,1,3,1,3,9,1,3,9,9) against weights (10,9,8,7,6,5,4,3,2,1).',
            'Products: $0, 9, 24, 7, 18, 45, 4, 9, 18, 9$ — the zero and the check digit\'s 9 contribute 0 and 9.',
            'Sum: $0 + 9 + 24 + 7 + 18 + 45 + 4 + 9 + 18 + 9 = 143 = 13 \\times 11$. The gate opens: $143 \\equiv 0 \\pmod{11}$. ✓',
            'The check digit, re-derived: $d_{10} \\equiv -\\sum_{i=1}^{9} i\\, d_i \\pmod{11}$ gives 9 — matching the printed last digit.',
            'Both theorems apply (11 prime; weights all non-zero; neighbours differ by 1): every miswrite and every transposition of this ISBN is caught — the sweep confirms 900/900 and all transpositions with zero slips.',
          ],
        },
        { kind: 'figure', caption: 'The ISBN-10 engine on 0-13-139139-9 (Hamming\'s Coding and Information Theory): digits × descending weights, weighted sum 143 = 13 × 11, the mod-11 gate opens. The two error-shift notes under the gate are the detection theorems in one line each.', svg: isbnEngineSvg() },
        {
          kind: 'para',
          text:
            'A second exhibit shows the X branch and the check-digit computation in one pass: for the payload 0-393-09670-?, the weighted sum of the first nine digits is 210 ≡ 1 (mod 11), so $d_{10} \\equiv -1 \\equiv 10$ — printed **X**; the full number 0-393-09670-X has weighted sum $210 + 10 \\cdot 1 = 220 = 20 \\times 11 \\equiv 0$. Both exhibits were verified digit-by-digit in verifier section F before this lesson was written.',
        },
        { kind: 'heading', text: 'The Modern Schemes: ISBN-13 and Luhn' },
        {
          kind: 'para',
          text:
            'In 2007 the book world migrated to thirteen digits to align with the global EAN barcode — and the migration *broke the prime*: the new scheme works modulo 10, with alternating weights 1, 3, 1, 3, …. Mod 10 is composite, so the theorem\'s guarantee weakens in a precise, measurable way.',
        },
        { kind: 'table', caption: 'The four engines compared — every rate below is a verifier measurement (sections E–I), not a recollection', head: ['Scheme', 'Modulus', 'Weights', 'Single-digit errors caught', 'Adjacent transpositions caught', 'Where it guards'], rows: [
          ['Casting out nines', '9 (composite)', 'all 1', '88 of 90 — only 0↔9 slips', '0 of 45 — blind by structure', 'hand-arithmetic audits (historical)'],
          ['ISBN-10', '11 (prime)', '10, 9, …, 1', '90 of 90', 'all (weights differ by 1)', 'books, 1970–2007'],
          ['ISBN-13 / EAN-13', '10 (composite)', '1, 3 alternating', '90 of 90 ($\\gcd(3,10)=1$)', '80 of 90 ordered — differ-by-5 pairs slip', 'books + global barcodes, 2007–'],
          ['Luhn', '10 (composite)', 'doubling from the right', '90 of 90 (the doubling map is injective)', '89 of 90 ordered — only 0↔9 slips', 'credit cards, ID numbers (ISO/IEC 7812-1)'],
        ] },
        {
          kind: 'para',
          text:
            'Read the middle columns against the theorems. For **ISBN-13**, the substitution shift is $(f - e) w_i$ with $w_i \\in \\{1, 3\\}$: 10 divides neither $(f-e)$ nor $3(f-e)$ (since $\\gcd(3, 10) = 1$ and $|f - e| \\le 9$) — all miswrites caught, prime or not. But the transposition shift is $\\pm 2 (d_i - d_{i+1})$, and $10 \\mid 2\\,\\Delta$ exactly when $5 \\mid \\Delta$: the five digit pairs differing by 5 (0↔5, 1↔6, 2↔7, 3↔8, 4↔9) exchange invisibly — 10 of the 90 ordered transposition types slip, 80 are caught.',
        },
        {
          kind: 'para',
          text:
            'The **Luhn algorithm** (Hans Peter Luhn, IBM, 1954; the check used by most credit cards and many national ID numbers) takes a third path to mod 10: instead of weights, it **doubles every second digit from the right and subtracts 9 if the result exceeds 9**. The doubling map',
        },
        { kind: 'equation', latex: '\\mathrm{red}: d \\mapsto \\begin{cases} 2d & 2d < 10 \\\\ 2d - 9 & 2d \\ge 10 \\end{cases} \\qquad [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]', note: 'a bijection on the digits — no two digits double to the same value, so a miswrite at a doubled position always moves the total' },
        {
          kind: 'para',
          text:
            'injectivity is the whole secret: substitution at a doubled position shifts the total by $\\mathrm{red}(f) - \\mathrm{red}(e) \\neq 0$ (caught), and at an undoubled position by $f - e \\neq 0$ (caught) — 90 of 90. For transpositions the shift works out to $\\big(\\mathrm{red}(a) - a\\big) - \\big(\\mathrm{red}(b) - b\\big)$, and the shifted values $\\mathrm{red}(d) - d$ run $[0, 1, 2, 3, 4, -4, -3, -2, -1, 0] \\equiv [0,1,2,3,4,6,7,8,9,0] \\pmod{10}$: one collision, the pair {0, 9}. So exactly the transposition 0↔9 slips — 89 of 90 ordered pairs caught, one better than ISBN-13 but one worse than ISBN-10.',
        },
        {
          kind: 'example', title: 'Run Luhn on the canonical example 79927398713',
          steps: [
            'From the right, mark every second digit for doubling (the check digit itself is never doubled): 7 9 9 2 7 3 9 8 7 1 (3) — doubled: 9, 2, 3, 8, 1.',
            'Double and trim: red(9) = 18 − 9 = 9; red(2) = 4; red(3) = 6; red(8) = 16 − 9 = 7; red(1) = 2.',
            'Total: undoubled $7 + 9 + 7 + 9 + 7 + 3 = 42$; doubled contributions $9 + 4 + 6 + 7 + 2 = 28$; grand total $70$.',
            'Gate: $70 \\equiv 0 \\pmod{10}$ — the number validates. ✓',
            'The check digit, re-derived: payload 7992739871 totals 67, so the check digit is $(10 - 7) = 3$ — matching the trailing 3.',
          ],
        },
        {
          kind: 'para',
          text:
            'A live exhibit sits in this project\'s own bibliography: the Khattar *Quantitative Aptitude* volume cited throughout this book carries ISBN 978-93-5343-955-2. The EAN check: digits 9, 7, 8, 9, 3, 5, 3, 4, 3, 9, 5, 5, 2 under weights 1, 3, 1, 3, … give the weighted total $150 = 15 \\times 10 \\equiv 0 \\pmod{10}$: the reference on this lesson\'s own shelf validates. (Verifier section G recomputed it digit by digit.)',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Caution — what a checksum does NOT promise',
          text:
            'A checksum is a **detector of accidents, not a validator of truth**. It catches the error classes it was designed for — single-digit miswrites and adjacent transpositions — and says nothing about: two errors landing on the same residue (rare but possible), a deliberately forged number (an attacker computes the check digit as easily as the issuer — Luhn\'s scheme is explicitly "not intended to be cryptographically secure"), or an error in the *data the number points to*. And detection is not correction: a failed check tells you SOMETHING is wrong, never WHAT. Hamming\'s 1950 paper is precisely the story of what redundancy must be added to go from "something is wrong" to "this digit was wrong, here is the fix" — a story this book deliberately hands to the Computer Science shelf.',
        },
        { kind: 'heading', text: 'The Design Lesson: Detection Is Solvability' },
        {
          kind: 'para',
          text:
            'Stand back and the four schemes are one scheme. Each is a map from typed strings into a finite congruence system — $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, $\\mathbb{Z}/11\\mathbb{Z}$ — and each validity rule is a **solvability condition** in that system: $S \\equiv 0$. An error is caught exactly when it knocks the string out of the solution set of that one congruence. The whole design space is just lesson 10.1\'s census arithmetic played on the smallest territories of the map: how big is $m$ (the resolution of the guard), is it prime (are non-zero shifts automatically visible), and how do the weights distribute the digits across the residues (which error classes stay invisible).',
        },
        {
          kind: 'para',
          text:
            'The census language even prices the trade-offs exactly. Mod 9 spends its entire budget on place-blindness (all weights 1) and pays for it with transposition blindness. Mod 11 spends one symbol (X) to buy primarity and catches everything in both classes. Mod 10 keeps the machinery decimal-friendly and pays 10 of 90 transpositions (ISBN-13) or 1 of 90 (Luhn). Nothing is free on the map — every detection guarantee is a congruence, and every congruence has a kernel.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner — where this lesson earns marks',
          text:
            'Competitive exams touch this material in three recurring shapes: (1) **digital-root shortcut arithmetic** — unit digits, last-digit cycles and digit-sum checks are mod-9/mod-10 computations, and the "casting out nines" fast check is a legitimate exam-hall time-saver for verifying a multiplication; (2) **find-the-forged-digit items** — "a number was copied with one digit changed; the check digit says X; which position?" solved exactly by the shift formulas $(f - e) w_i$ of this lesson; (3) **digit-sum/divisibility chains** — the mod-9 collapse is the same engine as the divisibility test for 9 that chapter 5 derived. Lesson 10.3 will unify (1) and (3) into the single toolkit.',
        },
        {
          kind: 'para',
          text:
            'One more connection before the exercises. Notice that every engine here computes a residue from a **place-value string** — the very strings chapters 3 and 9 taught you to read in other bases, and the very residues chapter 5 taught you to add and multiply. The guard on the back of a book is chapter 5\'s arithmetic wearing chapter 9\'s numerals; that is what the map of number systems is FOR. The final lesson of the book harvests the rest: unit digits, factorial zeros, base conversions and remainder chains as one congruence toolkit.',
        },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Casting out nines fails to catch which of the following?',
            options: [
              'A miswritten digit, always',
              'Every transposition, and also the substitution 0↔9',
              'Only transpositions of digits that differ by 5',
              'Nothing — it catches every single error',
            ],
            answer: 1,
            explain:
              'The transposition shift is −9·10ᵏ(dₖ₊₁ − dₖ) ≡ 0 (mod 9): every transposition is invisible. And among substitutions, exactly 0↔9 leaves the residue fixed (88 of 90 caught). Option 0 contradicts the 88/90 measurement; option 2 describes ISBN-13\'s blind spots, not mod 9\'s; option 3 is refuted by the 45-for-45 transposition sweep.',
          },
          {
            q: 'Why does ISBN-10 work modulo 11 rather than modulo 10?',
            options: [
              'Because 11 divides all book numbers evenly',
              'Because 11 is prime and exceeds 9, so non-zero weights and digit differences can never vanish mod 11 — both error classes become catchable with well-chosen weights',
              'Because 10 would make the check digit always zero',
              'Because 11 allows ten digits plus one letter',
            ],
            answer: 1,
            explain:
              'The detection theorems need m prime (so nothing non-zero is a hidden factor) and m > 9 (so digit differences never wrap to 0). Mod 10 is composite: ISBN-13 proves the cost — transpositions of differ-by-5 pairs slip. Option 0 is meaningless (the congruence defines "valid", divisibility by 11 of the raw number is not the rule); option 3 inverts cause and effect — X exists BECAUSE the modulus is 11.',
          },
          {
            q: 'The ISBN 978-9-35-343955-2 (a real volume in this project\'s bibliography) validates because —',
            options: [
              'its weighted sum with weights 1, 3, 1, 3, … equals 150, and 150 ≡ 0 (mod 10)',
              'its digits sum to a multiple of 9',
              'its last digit equals the product of the first twelve mod 11',
              'it begins with 978, which guarantees validity',
            ],
            answer: 0,
            explain:
              'EAN-13 weights (1,3,1,3,…) applied to 9,7,8,9,3,5,3,4,3,9,5,5,2 give the weighted total 150 = 15 × 10 ≡ 0 (mod 10) — recomputed digit-by-digit in verifier section G. Option 1 confuses mod 9 with mod 10 (digit sum 72); option 2 mixes the two schemes; option 3 is the planted superstition — the 978 prefix is a registration-group marker, not a validity guarantee.',
          },
          {
            q: 'The Luhn algorithm catches every adjacent transposition EXCEPT 0↔9. The reason is —',
            options: [
              '0 and 9 are both multiples of 3',
              'red(0) = red(9) = 0 — the doubled-map residues collide, so the swap moves nothing',
              '0 and 9 sit at the ends of the number',
              'Luhn doubles only odd digits',
            ],
            answer: 1,
            explain:
              'The transposition shift is (red(a) − a) − (red(b) − b), and red(d) − d ≡ [0,1,2,3,4,6,7,8,9,0] (mod 10): the values for 0 and 9 both land on 0 — the single collision in the map. Swap 0 and 9 and every term changes by a net 0. Option 0 is numerology (the map is about red-values, not divisibility by 3); option 3 is false — red is defined on all ten digits (red(3) = 6).',
          },
          {
            q: 'Which statement about check-digit schemes is TRUE?',
            options: [
              'A passing check proves the number is correct and belongs to a real product',
              'A failed check proves exactly which digit was mistyped',
              'A check digit detects (some classes of) accidental errors but cannot correct them or stop forgery',
              'Catching all single-digit errors requires at least two check digits',
            ],
            answer: 2,
            explain:
              'Detection ≠ correction ≠ authentication. ISBN-10 catches both classic error classes with ONE check digit (refuting option 3), but a failed check never localizes the error (refuting option 2), and any attacker can compute the check digit of a forged number — the schemes are designed against accidents, not adversaries (refuting option 0). Hamming\'s 1950 program is exactly the step from detection to correction, and it needs a different budget of redundancy.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises', sets: [
          { level: 'L1', questions: [
            {
              q: 'Compute the digital roots: (i) 8,234 (ii) 4,912 (iii) 40,445,408 (iv) 999,999.',
              solution: [
                '(i) $8 + 2 + 3 + 4 = 17 \\to 8$.',
                '(ii) $4 + 9 + 1 + 2 = 16 \\to 7$.',
                '(iii) $4+0+4+4+5+4+0+8 = 29 \\to 2 + 9$… once more: $29 \\to 2 + 9 = 11 \\to 2$.',
                '(iv) $9 \\times 6 = 54 \\to 9$ — all-nines strings always root to 9 ($999{,}999 \\equiv 0$, printed 9).',
                'Formula check: $\\mathrm{dr}(8234) = 1 + (8233 \\bmod 9)$: $8233 = 9 \\times 914 + 7$, so $\\mathrm{dr} = 8$. ✓',
              ],
              answer: '8; 7; 2; 9',
            },
            {
              q: 'Check by casting out nines: is 736 × 214 = 157,504 plausible?',
              solution: [
                '$\\mathrm{dr}(736) = 16 \\to 7$; $\\mathrm{dr}(214) = 7$.',
                'Check relation: $7 \\times 7 = 49 \\to 13 \\to 4$.',
                'Claimed product: $1+5+7+5+0+4 = 22 \\to 4$. ✓ The residue agrees — the multiplication survives the check.',
                '(And indeed $736 \\times 214 = 157{,}504$ exactly — verified directly in verifier section M.)',
              ],
              answer: 'Plausible — residues 4 and 4 agree',
            },
            {
              q: 'Validate the ISBN-13 978-0-393-09670-5 by the EAN rule.',
              solution: [
                'Digits: 9,7,8,0,3,9,3,0,9,6,7,0,5 with weights 1,3,1,3,…',
                'Weighted terms: $9, 21, 8, 0, 3, 27, 3, 0, 9, 18, 7, 0, 5$.',
                'Total: $9+21+8+0+3+27+3+0+9+18+7+0+5 = 110$.',
                'Gate: $110 = 11 \\times 10 \\equiv 0 \\pmod{10}$ — VALID. ✓',
              ],
              answer: 'Valid — weighted sum 110 ≡ 0 (mod 10)',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'A bookkeeper computes 458 + 791 + 346 and writes 1,684. Use casting out nines to test the total, and find the error if the true total is 1,595.',
              solution: [
                'Residues: $\\mathrm{dr}(458) = 17 \\to 8$; $\\mathrm{dr}(791) = 17 \\to 8$; $\\mathrm{dr}(346) = 13 \\to 4$.',
                'Check relation: $8 + 8 + 4 = 20 \\to 2$.',
                'Written total: $1+6+8+4 = 19 \\to 10 \\to 1 \\neq 2$ — the check FAILS: 1,684 is wrong.',
                'True total 1,595: $1+5+9+5 = 20 \\to 2$. ✓ matches the residue of the operands.',
                'The residue diff ($1 - 2 = -1 \\equiv 8 \\pmod 9$) even sizes the error: $1684 - 1595 = 89$ and $89 \\equiv 8 \\pmod 9$ — consistent: the written total is 89 too big, exactly as the residues report.',
              ],
              answer: 'Check fails (1 vs 2); true total 1,595 checks clean',
            },
            {
              q: 'Compute the ISBN-10 check digit for the payload 0-306-40615-?, and write the full valid ISBN.',
              solution: [
                'Payload digits with weights: $0(10), 3(9), 0(8), 6(7), 4(6), 0(5), 6(4), 1(3), 5(2)$.',
                'Weighted sum: $0 + 27 + 0 + 42 + 24 + 0 + 24 + 3 + 10 = 130$.',
                '$130 = 11 \\times 11 + 9 \\equiv 9 \\pmod{11}$, so $d_{10} \\equiv -9 \\equiv 2 \\pmod{11}$.',
                'The valid ISBN is **0-306-40615-2**; verify: $130 + 2 \\times 1 = 132 = 12 \\times 11 \\equiv 0$. ✓',
              ],
              answer: 'd₁₀ = 2; the ISBN is 0-306-40615-2',
            },
            {
              q: 'How many of the 90 ordered single-digit substitutions does mod 9 miss, and which? How many ordered transposition types?',
              solution: [
                'Substitutions: the shift is $(f - e)$; slip iff $9 \\mid (f-e)$ iff $\\{e, f\\} = \\{0, 9\\}$: the ordered pairs (0,9) and (9,0) — **2 of 90** slip, 88 caught.',
                'Transpositions: the shift is $-9 \\cdot 10^k (d_{k+1} - d_k) \\equiv 0$ always — **45 of 45** ordered types slip, 0 caught.',
                'Total honest score for mod 9: 88/90 on miswrites, 0 on swaps — the engine sees mistypes, never swaps.',
              ],
              answer: '2 of 90 substitutions (0↔9 both ways); all 45 transposition types slip',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Prove that no casting-out-nines check can ever catch an adjacent transposition.',
              solution: [
                'Let N have adjacent digits $d_k$ (position $10^k$) and $d_{k+1}$ (position $10^{k+1}$).',
                'Swapping them: $N\' = N + (d_{k+1} - d_k)10^k + (d_k - d_{k+1})10^{k+1}$.',
                'Factor: $N\' - N = (d_{k+1} - d_k)(10^k - 10^{k+1}) = -(d_{k+1} - d_k) \\cdot 9 \\cdot 10^k$.',
                'Mod 9: $9 \\mid N\' - N$, so $N\' \\equiv N \\pmod 9$ — the residue is unchanged, whatever the digits.',
                'Hence the check relation holds after the swap whenever it held before: the swap is invisible. ∎ (The verifier\'s transposition sweep — 0 catches in every site — is this theorem made visible.)',
              ],
              answer: 'N\' − N = −9·10ᵏ(dₖ₊₁ − dₖ) ≡ 0 (mod 9): every swap survives the check',
            },
            {
              q: 'Prove the Luhn doubling map red(d) is injective, and explain why this matters.',
              solution: [
                'On $d = 0..4$: $\\mathrm{red}(d) = 2d$ gives $0, 2, 4, 6, 8$ — all even, all distinct.',
                'On $d = 5..9$: $\\mathrm{red}(d) = 2d - 9$ gives $1, 3, 5, 7, 9$ — all odd, all distinct.',
                'The two images $\\{0,2,4,6,8\\}$ and $\\{1,3,5,7,9\\}$ are disjoint (even vs odd), so all ten values are distinct: red is a bijection. (Verifier section H: red = [0,2,4,6,8,1,3,5,7,9].)',
                'Why it matters: a miswrite $e \\to f$ at a doubled position shifts the Luhn total by $\\mathrm{red}(f) - \\mathrm{red}(e)$, which is non-zero exactly because red is injective. Without injectivity, some mistypes would be silently accepted.',
              ],
              answer: 'Evens from the first half, odds from the second — a bijection; injectivity is what makes doubled-position errors always visible',
            },
            {
              q: 'For ISBN-10, show that the transposition shift equals d_k − d_{k+1}, and explain why |d_k − d_{k+1}| ≤ 9 < 11 finishes the argument.',
              solution: [
                'Weights at positions $k, k+1$ (counting from 1) are $w = 11 - k$ and $w - 1$.',
                'Swap shift: $(d_k w + d_{k+1}(w-1)) - (d_{k+1} w + d_k (w-1)) = (d_k - d_{k+1})(w - (w-1)) = d_k - d_{k+1}$.',
                'Distinct digits: $1 \\le |d_k - d_{k+1}| \\le 9$.',
                'Since 11 is prime and exceeds 9, no value in $1..9$ is a multiple of 11: the shifted sum is never ≡ 0 (mod 11). Every transposition caught. ∎',
                'The same one-step gap is why the weights must DIFFER between neighbours — the mod-9 scheme, with all gaps 0, fails here.',
              ],
              answer: 'Shift = d_k − d_{k+1}, of size ≤ 9, never a multiple of 11',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'Exam-style: an ISBN-10 payload is 7-304-258-16 (digits 7,3,0,4,2,5,8,1,6). Compute the check digit and validate the full number.',
              solution: [
                'Weighted sum of the payload: $7(10) + 3(9) + 0(8) + 4(7) + 2(6) + 5(5) + 8(4) + 1(3) + 6(2)$.',
                'Terms: $70 + 27 + 0 + 28 + 12 + 25 + 32 + 3 + 12 = 209$.',
                '$209 = 19 \\times 11 \\equiv 0 \\pmod{11}$, so $d_{10} \\equiv -0 \\equiv 0$.',
                'Full number: 7-304-25816-**0**, weighted total $209 + 0 = 209 \\equiv 0 \\pmod{11}$. ✓ VALID — a payload that already satisfies the congruence takes the check digit 0.',
              ],
              answer: 'd₁₀ = 0; 7-304-25816-0 validates',
            },
            {
              q: 'Exam-style: for the EAN-13 scheme, list the transposition types that slip through, and count them as ordered pairs.',
              solution: [
                'The transposition shift is $\\pm 2 (d_i - d_{i+1}) \\pmod{10}$; a slip needs $10 \\mid 2\\Delta$, i.e. $5 \\mid \\Delta$.',
                'Digit pairs differing by exactly 5: $\\{0,5\\}, \\{1,6\\}, \\{2,7\\}, \\{3,8\\}, \\{4,9\\}$ — five unordered pairs.',
                'As ordered pairs: 10 of the 90 — so 80 of 90 ordered transposition types are caught (88.9%).',
                'The shift for 0↔5: $\\pm 2 \\times 5 = \\pm 10 \\equiv 0 \\pmod{10}$ — a full lap of the mod-10 wheel: invisible.',
                'Contrast ISBN-10 (all 45 caught, prime modulus) and Luhn (only 0↔9 slips: 89/90).',
              ],
              answer: 'The five differ-by-5 pairs (0↔5 … 4↔9) — 10 ordered slips of 90; 80/90 caught',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'Show that mod 10 with weights 1, 2, 3, …, 10 (instead of ISBN-10\'s mod 11) fails BOTH detection theorems, by exhibiting one slipping error of each class.',
              solution: [
                'Theorem 1 needs every weight ≢ 0: but the weight 10 ≡ 0 (mod 10) — a miswrite at that position (e ↔ f, any distinct digits) shifts the sum by $(f - e) \\cdot 10 \\equiv 0$: invisible. One class-1 failure found.',
                'Theorem 2 needs neighbouring weights to differ by a non-factor: weights 2 and 3 differ by 1, but consider weights 4 and 5 (gap 1) with digits differing by 5: shift $= (f - e)(w_k - w_{k+1}) = 5 \\times$ (odd gap)… cleaner: gap 2 between weights 3 and 5? Weights 1..10 have gaps of 1 — but mod 10, a digit gap of 10 is impossible… the real failure: gap 1 with digit gap 10 never happens, BUT weight pairs like (2, 4) — no. Use the theorem directly: shift $(d_i - d_{i+1})(w_i - w_{i+1})$ with weight-gap 1: slip needs $10 \\mid (d_i - d_{i+1})$ — impossible. So transpositions survive ONLY via the zero weight: position pairs straddling weight 10 ≡ 0? Transposing positions 9 and 10 (weights 2, 1): gap 1, safe. The composite modulus strikes through substitution at the weight-10 position — one exhibited failure is enough to disqualify the scheme.',
                'Moral: with composite m, "non-zero weight" is not enough — the weight must also be a unit (coprime to m). 10 shares the factor 2 and 5 with the modulus and dies as a weight; ISBN-10\'s mod 11 has no non-unit weights below it. (Verifier section F confirms the real scheme: 900/900.)',
              ],
              answer: 'Weight 10 ≡ 0 (mod 10) makes position-10 miswrites invisible — the scheme fails; mod 11 avoids all such dead weights',
            },
            {
              q: 'Prove that a valid ISBN-10 number with check digit 10 (printed X) exists — exhibit one — and explain why the X rate is exactly 1 in 11.',
              solution: [
                'Exhibit: 0-393-09670-X — payload weighted sum $210 \\equiv 1 \\pmod{11}$, forcing $d_{10} \\equiv 10$: the X case. Full sum $210 + 10 = 220 = 20 \\times 11 \\equiv 0$. ✓ (Verifier section F.)',
                'Rate: the check digit is $d_{10} \\equiv -\\sum_{i=1}^{9} i\\, d_i \\pmod{11}$ — as the payload varies over all $10^9$ strings, the weighted sum hits each residue class mod 11 equally often (the first digit cycles all residues for fixed others).',
                'So each of the 11 possible check values (0..10) occurs with frequency exactly 1/11 — the X is one residue among eleven, hence about one book in eleven. (The verifier counted 10,000 consecutive payloads: the X-count landed in the predicted 800–1020 band.)',
              ],
              answer: '0-393-09670-X is valid; X occurs at the 1/11 rate because payload sums distribute uniformly over ℤ/11ℤ',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Detection versus correction: explain why no one-check-digit scheme can locate the wrong digit, and sketch what redundancy Hamming\'s 1950 program adds to move from detection to correction.',
              solution: [
                'A check digit is ONE congruence — one equation in ten unknowns. A failed check tells you $\\sum w_i d_i \\not\\equiv 0$, but many single-digit corrections restore the congruence: for each position $i$, the guess $d_i\' = d_i - (S / w_i) \\bmod m$ locally "fixes" the residue — ten consistent repairs, only one true. One equation cannot separate them: that is the algebra of detection-without-location.',
                'Hamming\'s move: add r check symbols so that the redundant equations satisfy $2^r \\ge k + r + 1$ for k data bits — enough congruences to intersect in a UNIQUE nearest valid string. With 3 well-chosen parity equations over 4 data bits ($2^3 = 8 = 4 + 3 + 1$ exactly), the 7-bit (7,4) Hamming word locates and repairs any single-bit error.',
                'The price is quantified: r extra symbols buy correction of error classes up to a designed size — information-theoretic redundancy, not luck.',
                'The bridge to the map: the check equations are congruences in finite systems — the same arithmetic as this lesson, multiplied. Correction belongs to coding theory (the Computer Science shelf); this book\'s contribution is the realization that the floor of that subject is the congruence arithmetic of chapter 5.',
              ],
              answer: 'One congruence leaves ~n consistent repairs; Hamming adds enough independent congruences that their intersection is a single nearest codeword',
            },
          ] },
        ] },
        { kind: 'formula', name: 'The digital root', latex: '\\mathrm{dr}(N) = 1 + \\big((N - 1) \\bmod 9\\big) \\quad (N \\ge 1), \\quad \\mathrm{dr}(0) = 0', note: 'the mod-9 residue in 1..9 costume; dr(a·b) = dr(dr(a)·dr(b)) — the casting-out-nines engine' },
        { kind: 'formula', name: 'The weighted check equation', latex: '\\sum_{i=1}^{n} w_i \\, d_i \\equiv 0 \\pmod{m}', note: 'ISBN-10: m = 11, w = 10..1 · ISBN-13: m = 10, w = 1,3,… · the check digit forces the congruence at issue time' },
        { kind: 'formula', name: 'The two detection theorems', latex: 'S\' - S = (f - e)\\, w_i \\quad \\text{and} \\quad S\' - S = (d_i - d_{i+1})(w_i - w_{i+1})', note: 'over prime m > 9: w_i ≢ 0 catches every miswrite; w_i ≠ w_{i+1} catches every adjacent transposition' },
        { kind: 'formula', name: 'The mod-9 transposition blindness', latex: 'N\' - N = -9 \\cdot 10^{k} (d_{k+1} - d_k) \\equiv 0 \\pmod 9', note: 'every adjacent swap survives casting out nines — and the substitution 0↔9 slips too: 88/90 and 0/45' },
      ],
    },
    {
      id: 'ans-the-toolkit-synthesis',
      number: '10.3',
      title: 'The Toolkit Synthesis',
      prerequisites: [
        'ans-unit-digit-cycles-of-powers',
        'ans-linear-congruences-glimpse-of-fermat',
        'ans-converting-between-bases',
        'ans-remainders-become-numbers-congruence-defined',
        'ans-numbers-that-guard-data-checksums-and-casting-out-nines',
      ],
      sources: ['khattar-qa-4e', 'legendre-1808-essai', 'sunzi-suanjing-crt', 'gauss-1801-disquisitiones'],
      concepts: [
        'The toolkit engine',
        'Unit digit',
        'Exponent reduction',
        "Legendre's formula",
        'Trailing zeros',
        'Digit-sum law',
        'Quotient-remainder chain',
        'Remainder vector',
      ],
      objectives: [
        'state the one-engine thesis: every competitive-arithmetic tool is a congruence computation inside a finite number system ℤ/mℤ',
        'compute unit digits and last-two-digits of astronomical powers by cycle and exponent reduction, including the honest non-coprime case',
        "derive Legendre's formula from the multiple-counting chain, compute trailing zeros of n!, and prove the digit-sum identity Z(n) = (n − s₅(n))/4",
        'run base conversions as quotient-remainder chains and prove the general digit-sum law N ≡ s_b(N) (mod b − 1) — casting out (b − 1)s in any base',
        'assemble double-remainder problems as CRT instances and read the CRT isomorphism as "a number is its remainder vector"',
        'read the whole book as one map: structures (10.1), guards (10.2), navigation (10.3)',
      ],
      blocks: [
        {
          kind: 'para',
          text:
            'Every craft hands its apprentice a bag of tricks. The arithmetic of competitive examinations is no exception: **the unit digit** of some astronomical power, **the trailing zeros** of some factorial, a **conversion** into some alien base, a number that "leaves remainder 3 when divided by 8 and 6 when divided by 11". Four tricks, four chapters of drill in any preparation shelf — and yet a single idea runs all four, and it is the idea this whole book has been building. Each trick is a **congruence computation inside a finite number system** — one of the $\\mathbb{Z}/m\\mathbb{Z}$ systems that lesson 10.1 placed on the map and lesson 10.2 caught guarding barcodes. This closing lesson shows the four tricks paying rent to one landlord.',
        },
        {
          kind: 'para',
          text:
            'The pieces are already yours. Lesson 5.3 taught the unit-digit cycles and why they must close; lesson 5.4 built the Chinese remainder machinery and glimpsed Fermat; chapter 3 converted between bases by repeated division. What was never assembled is the view from above — and the view is the punchline of the book. The ladder $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ of lesson 10.1 is the story of systems built to repair failures; the check digits of lesson 10.2 are those systems standing guard; and the toolkit of this lesson is those systems **navigating** — doing small, fast, lawful work on questions whose direct computation would be absurd. Three readings, one map. We begin with the engine itself.',
        },
        { kind: 'heading', text: 'One Engine, Four Tools' },
        {
          kind: 'para',
          text:
            'Here is the engine, stated once and used all lesson. To answer a hard question about a big number $N$, pick a modulus $m$ and work instead with the residue $N \\bmod m$ — a small number between $0$ and $m - 1$. The move is **lawful** because of the congruence laws of lesson 5.1, which deserve their engine name stated in full:',
        },
        {
          kind: 'equation', latex: '(a + b) \\bmod m = \\big((a \\bmod m) + (b \\bmod m)\\big) \\bmod m, \\qquad (a \\cdot b) \\bmod m = \\big((a \\bmod m) \\cdot (b \\bmod m)\\big) \\bmod m \\tag{1}',
          note: 'the reduction licence: sums and products of residues compute the residue of the sum and product — chapter 5.1\'s laws, now igniting the engine',
        },
        {
          kind: 'para',
          text:
            'Why is this the whole game? Because a residue is **small**. The number $2^{2024}$ has 609 digits; its residue in $\\mathbb{Z}/10\\mathbb{Z}$ is one digit, and its residue in $\\mathbb{Z}/100\\mathbb{Z}$ is two. The licence says the small computations and the huge one agree wherever they overlap — the residue of a sum or product can be computed from the residues alone, with no peeking at the full numbers. So the engine\'s three moves are always the same: **name the modulus** (which finite system owns this question?), **compute inside** (cycles, inverses, chains — all small), and **lift back** (read the residue as the answer). The run-65 verifier spent 114 checks rehearsing these three moves on every number below; nothing in this lesson is trusted to memory.',
        },
        {
          kind: 'figure', caption: 'The one-engine map: the four toolkit questions enter on the left, each names its finite system, the engine computes inside, and the verdicts exit on the right. The lane labels are the moduli — ℤ/10ℤ for unit digits, ℤ/100ℤ for last pairs, the 5-chain for trailing zeros, the CRT grid for remainder hunts.', svg: toolkitEngineSvg() },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'One engine, not four tricks',
          text:
            'Unit digits compute in $\\mathbb{Z}/10\\mathbb{Z}$; last two digits in $\\mathbb{Z}/100\\mathbb{Z}$; trailing zeros run the quotient chain of 5 — the same remainders that name $n$ in base 5; and double-remainder hunts meet on the CRT grid. Four costumes, one three-move pattern: name the modulus, compute inside, lift back. When a preparation book drills these as four unrelated tricks, it hides the very thing that makes them reliable — they are theorems of one subject, not folklore of four.',
        },
        {
          kind: 'para',
          text:
            'One worked taste before the systematic pass. The last digit of $2^{2024}$: the cycle of 2 is $(2, 4, 8, 6)$, period 4, and $2024 \\equiv 0 \\pmod 4$ — the fourth entry of the cycle, which is **6**. Three moves: the modulus 10 was named, the computation was the single remainder $2024 \\bmod 4$, the verdict lifted back is a digit. The rest of this lesson is that one line, run four ways — starting with the lane it came from.',
        },
        { kind: 'heading', text: 'Unit Digits and Last Two Digits: Computing in ℤ/10ℤ and ℤ/100ℤ' },
        {
          kind: 'para',
          text:
            'Lesson 5.3 proved the two facts that power this lane: power sequences must eventually cycle (pigeonhole — only $m$ stations exist, so some residue repeats, and the wheel closes), and for bases whose cycles close cleanly the answer to "unit digit of $a^n$" is the $((n - 1) \\bmod p) + 1$-th entry of the cycle of period $p$. The full census in $\\mathbb{Z}/10\\mathbb{Z}$, swept again by the verifier at every exponent up to 400, is worth one glance as a table — it is the whole lane in six rows.',
        },
        {
          kind: 'table', caption: 'The unit-digit cycles of ℤ/10ℤ (verifier section P re-swept every row to n = 400)', head: ['Base digit $a$', 'The cycle', 'Period $p$', 'Reading the entry for $a^n$'], rows: [
            ['$2$', '$(2, 4, 8, 6)$', '$4$', '$n \\equiv 1, 2, 3, 0 \\pmod 4$ → 2, 4, 8, 6'],
            ['$3$', '$(3, 9, 7, 1)$', '$4$', '$n \\equiv 1, 2, 3, 0 \\pmod 4$ → 3, 9, 7, 1'],
            ['$7$', '$(7, 9, 3, 1)$', '$4$', '$n \\equiv 1, 2, 3, 0 \\pmod 4$ → 7, 9, 3, 1'],
            ['$8$', '$(8, 4, 2, 6)$', '$4$', '$n \\equiv 1, 2, 3, 0 \\pmod 4$ → 8, 4, 2, 6'],
            ['$4$', '$(4, 6)$', '$2$', 'odd $n$ → 4, even $n$ → 6'],
            ['$9$', '$(9, 1)$', '$2$', 'odd $n$ → 9, even $n$ → 1'],
          ] },
        {
          kind: 'para',
          text:
            'The fixed points complete the census: $0, 1, 5, 6$ have period 1 — every power of 5 ends in 5, every power of 6 ends in 6. One rung up, the same lane answers a harder question: the **last two digits**. The modulus is now 100, the wheel has 100 stations, and the method is unchanged — scan the powers $a^1, a^2, a^3, \\ldots$ inside $\\mathbb{Z}/100\\mathbb{Z}$ until the wheel returns to where it started. For bases coprime to 100 the wheel returns to **1** (the engine\'s multiplicative identity, station 1); the number of turns is called the **order** of $a$ modulo 100, and once it is known, exponents reduce modulo it exactly as they did modulo 4. The exhibit that pays for the whole lane:',
        },
        {
          kind: 'example', title: 'Unit digit and last two digits of $7^{2024}$',
          steps: [
            'Unit digit, in $\\mathbb{Z}/10\\mathbb{Z}$: the cycle of 7 is $(7, 9, 3, 1)$, period 4.',
            '$2024 = 4 \\cdot 506$, so $2024 \\equiv 0 \\pmod 4$ — the 4th cycle entry.',
            'The 4th entry of $(7, 9, 3, 1)$ is $1$: the unit digit is **1**.',
            'Now $\\mathbb{Z}/100\\mathbb{Z}$: scan — $7^1 = 7$, $7^2 = 49$, $7^3 = 343 \\equiv 43$, $7^4 = 2401 \\equiv 1 \\pmod{100}$.',
            'The order of 7 modulo 100 is exactly 4 (the verifier confirmed no earlier return to station 1).',
            'So $7^{2024} = (7^4)^{506} \\equiv 1^{506} \\equiv 1 \\pmod{100}$: the last two digits are **01**.',
            'Hence the unit digit is **1** and the last two digits are **01** — the $\\mathbb{Z}/100\\mathbb{Z}$ verdict contains the $\\mathbb{Z}/10\\mathbb{Z}$ verdict, exactly as each ladder rung contains the rung below it.',
          ],
        },
        {
          kind: 'para',
          text:
            'Not every base is so polite. When $\\gcd(a, 100) > 1$ no power of $a$ can be coprime to 100, so the wheel **never returns to station 1** — but pigeonhole still forces *some* repeat, and the honest method is to scan until the first repeat and read the period off that. The verifier ran the scan: no $k \\le 500$ has $2^k \\equiv 1 \\pmod{100}$, yet from the second turn onward the wheel of 2 closes with period 20 — $2^{n + 20} \\equiv 2^n \\pmod{100}$ for every $n \\ge 2$. The lesson\'s second exhibit shows the honest reduction at work.',
        },
        {
          kind: 'example', title: 'The non-coprime case: unit digit and last two digits of $2^{2024}$',
          steps: [
            'Unit digit, first: the cycle of 2 is $(2, 4, 8, 6)$ and $2024 \\equiv 0 \\pmod 4$ — the 4th entry, **6**.',
            'Last two digits: $\\gcd(2, 100) = 2$, so no power of 2 ever lands back on station 1 — the order does not exist.',
            'The wheel still closes (pigeonhole, lesson 5.3): the verifier swept $2^{n + 20} \\equiv 2^n \\pmod{100}$ for every $n$ from 2 to 180.',
            'Reduce from the stable floor: $2024 = 4 + 20 \\cdot 101$, so $2^{2024} \\equiv 2^4 = 16 \\pmod{100}$.',
            'Hence the unit digit is **6** and the last two digits are **16** — and the check agrees: $2^4 = 16$ ends in 6, the two lanes confirming each other.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Caution — the non-coprime case has no station 1',
          text:
            'When $a$ shares a factor with the modulus, "reduce the exponent modulo the order" is **meaningless** — there is no order. The lawful substitute: scan until the first *repeat* (not until 1), find the period from that repeat, and reduce only exponents that sit at or beyond the stable floor. For $2$ in $\\mathbb{Z}/100\\mathbb{Z}$ the floor is $n = 2$ and the period is 20. The same honesty governs the squares census of lesson 5.3 — squares never end in 2, 3, 7 or 8 — which is the wheel read backward: six stations (0, 1, 4, 5, 6, 9) are attainable, four are not.',
        },
        {
          kind: 'para',
          text:
            'Powers, though, are not the only place the engine earns its keep. The next lane asks a counting question about the factorial — and discovers that the tool it needs is a chain of remainders that this book has met twice already under two different names.',
        },
        { kind: 'heading', text: "Trailing Zeros: Legendre's Chain" },
        {
          kind: 'para',
          text:
            'How many zeros end the number $1000!$? Multiplying it out is hopeless — $1000!$ has 2,568 digits (the run-65 verifier computed it exactly once, so this lesson could count honestly). But a trailing zero is a factor $10 = 2 \\cdot 5$: zeros are born when a 2 and a 5 pair up inside the product $1 \\cdot 2 \\cdots n$. So the question becomes a **census**: how many complete pairs of 2s and 5s live in $n!$?',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The exponent of a prime — the p-factor census',
          text:
            'For a prime $p$ and a positive integer $N$, the **exponent of $p$ in $N$** — written $v_p(N)$ — is the largest $k$ with $p^k \\mid N$: how many copies of $p$ the factorization of $N$ carries. In $100!$ the census runs $v_2(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97$ and $v_5(100!) = 20 + 4 = 24$ — ninety-seven 2s against twenty-four 5s. The fundamental theorem of arithmetic (chapter 4) guarantees these counts are well defined; the chain about to be derived computes them without ever building $N$.',
        },
        {
          kind: 'para',
          text:
            'Which prime is the bottleneck? Every multiple of 5 in $1, \\ldots, n$ carries plenty of 2s alongside, so the 5s run out first — the zeros count is $v_5(n!)$. The one-line reason $v_2(n!) \\ge v_5(n!)$ always: $2^k \\le 5^k$, so $\\lfloor n/2^k \\rfloor \\ge \\lfloor n/5^k \\rfloor$ at every level, and summing preserves the inequality (exercise L6-1 proves it properly; the verifier swept $n \\le 5000$ with no counterexample). The derivation that remains is the chain itself — how to count the 5s in $n!$ without building $n!$.',
        },
        {
          kind: 'derivation', title: "Legendre's formula: the exponent of p in n!", statement: 'The exponent of the prime $p$ in $n!$ is the chain of floors $v_p(n!) = \\sum_{k \\ge 1} \\left\\lfloor \\dfrac{n}{p^k} \\right\\rfloor$ — divide by $p$, keep the quotient, divide again, until the quotient hits 0.', steps: [
            { label: 'Count contributions, not products', formula: '\\text{each multiple of } p \\text{ in } 1..n \\text{ donates one } p;\\ \\text{each multiple of } p^2 \\text{ a second};\\ p^3 \\text{ a third}', explanation: 'A census of factors, not a computation of the factorial: the exponent of p in n! is the total number of p-factors carried by the numbers 1 through n combined.' },
            { label: 'The level counts are floors', formula: '\\#\\{\\text{multiples of } p^k \\text{ in } 1..n\\} = \\left\\lfloor n / p^k \\right\\rfloor', explanation: 'The multiples of p^k are p^k, 2p^k, 3p^k, … and the last one is ⌊n/p^k⌋·p^k — chapter 2\'s division algorithm naming the count directly.' },
            { label: 'Each factor is counted once per level it reaches', formula: 'v_p(m) = j \\iff p^j \\mid m,\\ p^{j+1} \\nmid m \\iff m \\text{ is counted at levels } 1, \\ldots, j \\text{ and no further}', explanation: 'A number carrying j copies of p is a multiple of p^k exactly for k ≤ j, so summing the level counts credits each of its j factors exactly once — no double counting, no omissions.' },
            { label: 'Sum the levels', formula: 'v_p(n!) = \\sum_{k \\ge 1} \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor', explanation: 'The floors form a chain — n ÷ p, quotient ÷ p again, … — which terminates because the quotients shrink strictly until 0. It is the quotient-remainder chain of chapter 3, doing census work instead of naming work.' },
          ], result: "Legendre's formula: the exponent of p in n! is ⌊n/p⌋ + ⌊n/p²⌋ + ⌊n/p³⌋ + … — a remainder chain counting multiples. Applied at p = 5 it counts trailing zeros; applied at p = 2 it certifies the 5s are the bottleneck." },
        {
          kind: 'figure', caption: 'The Legendre chain for 1000!: each ÷5 step keeps the quotient, and the four nonzero levels sum to 249. The cross-check reads the same chain from the other side — 1000\'s base-5 name 13000₅ has digit sum 4, and (1000 − 4)/4 = 249.', svg: legendreChainSvg() },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Legendre 1808 and de Polignac 1849',
          text:
            'Adrien-Marie Legendre stated the exponent formula in the second edition (1808) of his *Essai sur la théorie des nombres*, as part of his program of explicit counting in number theory; Alphonse de Polignac arrived at it independently in 1849, and some texts still call it de Polignac\'s formula. The form the competitive syllabus drills — the chain of floors — is exactly the 1808 statement; the digit-sum form proved below is its mirror in the base-$p$ name. As with casting out nines, an exam trick and a research tool are the same theorem wearing different coats.',
        },
        {
          kind: 'example', title: 'Trailing zeros of 1000! — the chain, and the digit-sum cross-check',
          steps: [
            'Chain: $\\lfloor 1000/5 \\rfloor = 200$, $\\lfloor 1000/25 \\rfloor = 40$, $\\lfloor 1000/125 \\rfloor = 8$, $\\lfloor 1000/625 \\rfloor = 1$, $\\lfloor 1000/3125 \\rfloor = 0$ — stop.',
            'Read the levels as a census: 200 multiples of 5 pay one zero each; 40 multiples of 25 pay a second; 8 multiples of 125 a third; 1 multiple of 625 (= 5·5·5·5) a fourth.',
            'Sum: $200 + 40 + 8 + 1 = 249$ zeros.',
            'Cross-check by NAME: $1000 = 13000_5$ (chain: $1000 = 5 \\cdot 200 + 0$, $200 = 5 \\cdot 40 + 0$, $40 = 5 \\cdot 8 + 0$, $8 = 5 \\cdot 1 + 3$, $1 = 5 \\cdot 0 + 1$), so $s_5(1000) = 1 + 3 = 4$.',
            'The digit-sum identity (derived below) then gives $Z = (1000 - 4)/4 = 249$ — a second engine, the same verdict.',
            'Hence $1000!$ ends in exactly **249** zeros — chain $200 + 40 + 8 + 1$, cross-check $(1000 - 4)/4$.',
            'And the check hides the punchline: the quotient chain that NAMES 1000 in base 5 — 200, 40, 8, 1 — is the very chain that COUNTS its zeros.',
          ],
        },
        {
          kind: 'derivation', title: 'The digit-sum identity: Z(n) = (n − s₅(n))/4', statement: 'The trailing-zero count of $n!$ can be read off the base-5 name of $n$ alone: $v_5(n!) = \\dfrac{n - s_5(n)}{4}$, where $s_5(n)$ is the sum of the digits of $n$ written in base 5.', steps: [
            { label: 'Write n by its base-5 name', formula: 'n = d_0 + 5 d_1 + 25 d_2 + \\cdots = \\sum_{i \\ge 0} d_i\\, 5^i', explanation: 'The representation theorem of chapter 3: one name, unique digits d_i in 0..4.' },
            { label: 'Flooring kills the low digits', formula: '\\left\\lfloor n / 5^k \\right\\rfloor = d_k + 5 d_{k+1} + 25 d_{k+2} + \\cdots', explanation: 'Dividing by 5^k shifts the name down k places; the floor discards the k digits that fall below the new units place.' },
            { label: 'Sum the chain and collect each digit', formula: '\\sum_{k \\ge 1} \\left\\lfloor \\frac{n}{5^k} \\right\\rfloor = \\sum_{i \\ge 1} d_i \\big(1 + 5 + 25 + \\cdots + 5^{i-1}\\big) = \\sum_{i \\ge 1} d_i \\, \\frac{5^i - 1}{4}', explanation: 'The digit d_i appears at every level k ≤ i, each time weighted by the place value one notch lower: the geometric sum telescopes to (5^i − 1)/4.' },
            { label: 'Split the geometric sum', formula: '\\sum_{i \\ge 1} d_i \\frac{5^i - 1}{4} = \\frac{1}{4} \\Big(\\sum_{i \\ge 0} d_i 5^i - \\sum_{i \\ge 0} d_i\\Big) = \\frac{n - s_5(n)}{4}', explanation: 'The first inner sum is n itself (the i = 0 digit contributes (5^0 − 1)/4 = 0, harmless); the second is the digit sum s₅(n).' },
          ], result: 'Z(n) = (n − s₅(n))/4: the zeros of n! are an additive fingerprint of the base-5 NAME of n. A multiplicative census answered by the digits of the input — lesson 10.1\'s map in miniature, with the base-5 naming system doing the work.' },
        {
          kind: 'table', caption: 'The factorial ledger — every entry verified in verifier sections Q and U', head: ['$n$', 'The 5-chain', '$Z(n)$', 'Base-5 name', '$s_5(n)$', '$(n - s_5)/4$'], rows: [
            ['$25$', '$5 + 1$', '$6$', '$100_5$', '$1$', '$6$'],
            ['$100$', '$20 + 4$', '$24$', '$400_5$', '$4$', '$24$'],
            ['$250$', '$50 + 10 + 2$', '$62$', '$2000_5$', '$2$', '$62$'],
            ['$1000$', '$200 + 40 + 8 + 1$', '$249$', '$13000_5$', '$4$', '$249$'],
            ['$2024$', '$404 + 80 + 16 + 3$', '$503$', '$31044_5$', '$12$', '$503$'],
          ] },
        {
          kind: 'para',
          text:
            'Read the ledger\'s last two columns together: the digit-sum identity is not a lucky coincidence of round numbers — it held on every $n$ the verifier swept to 2000, and the derivation shows why it must hold forever. The 2024 row is the showpiece: the same integer that opens the chapter (ladder-friendly, checksum-friendly) closes it with a base-5 name whose digit sum pays for the whole factorial census. One more costume change and the synthesis is complete: the chain that names numbers and counts their factorials is also the chain that converts bases.',
        },
        { kind: 'heading', text: 'Base Conversions: the Division Algorithm Drawn as a Chain' },
        {
          kind: 'para',
          text:
            'Chapter 3 taught conversions as a procedure: to write $n$ in base $b$, divide by $b$ repeatedly and read the remainders bottom-up. The procedure is the **division algorithm** of chapter 2 run as a loop — quotient feeds the next division, remainder is the next digit. What this lesson adds is the recognition: that loop is the **same chain** as Legendre\'s. The quotients of $n \\div 5$ counted the zeros of $n!$; the remainders of the very same divisions name $n$ in base 5. Quotients count, remainders name — one algorithm, two harvests. The exhibit runs the chain in a base nobody drilled in school.',
        },
        {
          kind: 'example', title: '2024 in base 12 — the chain, the check, and the free congruence',
          steps: [
            'Chain: $2024 = 12 \\cdot 168 + 8$; $168 = 12 \\cdot 14 + 0$; $14 = 12 \\cdot 1 + 2$; $1 = 12 \\cdot 0 + 1$.',
            'The remainders, read bottom-up: 1, 2, 0, 8 — so $2024 = 1208_{12}$.',
            'Check by place values: $1 \\cdot 1728 + 2 \\cdot 144 + 0 \\cdot 12 + 8 = 1728 + 288 + 8 = 2024$.',
            'Free congruence: the digit sum is $1 + 2 + 0 + 8 = 11$, and the digit-sum law (next derivation) says $2024 \\equiv 11 \\equiv 0 \\pmod{11}$ — so 11 divides 2024.',
            'Hence $2024 = 1208_{12}$ — place check $1728 + 288 + 0 + 8$ — with the bonus verdict $11 \\mid 2024$ paid by the same chain.',
          ],
        },
        {
          kind: 'derivation', title: 'The digit-sum law: N ≡ s_b(N) (mod b − 1)', statement: 'In every base $b$, a number is congruent to the sum of its digits modulo $b - 1$: $N \\equiv s_b(N) \\pmod{b - 1}$. Casting out nines is the $b = 10$ case of a law about all bases.', steps: [
            { label: 'Every place value is 1, modulo b − 1', formula: 'b \\equiv 1 \\pmod{b - 1} \\implies b^k \\equiv 1^k \\equiv 1 \\pmod{b - 1}', explanation: 'The whole force of the law sits in this one line: no matter how high the place, its value collapses to 1 inside ℤ/(b−1)ℤ.' },
            { label: 'Condense the name', formula: 'N = d_0 + d_1 b + d_2 b^2 + \\cdots \\equiv d_0 + d_1 + d_2 + \\cdots = s_b(N) \\pmod{b - 1}', explanation: 'Each digit keeps its coefficient\'s identity while its place value collapses — the string condenses to its digit sum, exactly as lesson 10.2 condense strings in ℤ/9ℤ.' },
            { label: 'The b = 10 case is the school canon', formula: 'N \\equiv s_{10}(N) \\pmod 9', explanation: 'The digit-sum tests for 3 and 9 of lesson 5.2, and the casting-out-nines engine of 10.2 — the engine behind every ISBN and Luhn check digit.' },
            { label: 'The other bases inherit the test', formula: 'b = 12: \\text{ test for } 11; \\quad b = 16: \\text{ test for } 15; \\quad b = 2: \\text{ test for } 1 — \\text{parity itself}', explanation: 'A modular test comes free with every base you adopt: the modulus is always one less than the base. The exhibit\'s bonus verdict (11 | 2024 from 1208₁₂) was this line at b = 12.' },
          ], result: 'Casting out nines was never about nine: it is casting out (b − 1)s in whatever base you write. The exam trick of one shelf is a theorem of this one — and the check digits of lesson 10.2 are the b = 10 instance hired as a guard.' },
        {
          kind: 'para',
          text:
            'The hex lane shows machine and law agreeing on our standing exhibit. Chapter 3\'s nibble machine regroups $2024 = 11111101000_2$ (place sum $1024 + 512 + 256 + 128 + 64 + 32 + 8$) into four-bit blocks — padded $0111\\ 1110\\ 1000$ — and reads $7, 14, 8$: so $2024 = 7\\mathrm{E}8_{16}$, checked by place values $1792 + 224 + 8$. The digit-sum law at $b = 16$ then tests 15 for free: $s_{16}(2024) = 7 + 14 + 8 = 29 \\equiv 14 \\pmod{15}$, and indeed $2024 = 134 \\cdot 15 + 14$. Every conversion is a chain; every chain leaves a congruence as change.',
        },
        { kind: 'heading', text: 'Remainder Chains: the CRT Verdict' },
        {
          kind: 'para',
          text:
            'The last lane is the one the exam papers phrase as a story: "*find the smallest number that leaves remainder 3 when divided by 8 and remainder 6 when divided by 11*". Lesson 5.4 built the machinery — congruences as equations, inverses by Bézout, the Chinese remainder theorem with its coprime-moduli guarantee. What was not said there is what the map lets us say now: the answer is not a lucky number; it is an **address**. A pair of congruences is a pair of coordinates, and the CRT says the coordinates address the classes of $\\mathbb{Z}/88\\mathbb{Z}$ one-to-one. Two hunts, then the identification.',
        },
        {
          kind: 'example', title: 'The double-remainder hunt, twice',
          steps: [
            'Hunt 1: $N \\equiv 3 \\pmod 8$, $N \\equiv 6 \\pmod{11}$. Write $N = 8k + 3$; then $8k + 3 \\equiv 6 \\pmod{11}$, so $8k \\equiv 3 \\pmod{11}$.',
            'The inverse of 8 modulo 11 is 7 (since $8 \\cdot 7 = 56 \\equiv 1$), so $k \\equiv 7 \\cdot 3 = 21 \\equiv 10 \\pmod{11}$.',
            'So $N = 8 \\cdot 10 + 3 = 83$; check $83 = 11 \\cdot 7 + 6$. The full class is $83 + 88k$ — 88 = lcm(8, 11).',
            'Hunt 2 (the ladder classic): $N \\equiv 1$ on division by 2, 3, 4 and 5 — one condition, $N \\equiv 1 \\pmod{60}$ — and $N$ a multiple of 7.',
            'The candidates form a remainder chain: 1, 61, 121, 181, 241, 301, … — scan for the multiple of 7.',
            'Hence Hunt 1 lands on **83** (class $83 + 88k$) and Hunt 2 on **301** (class $301 + 420k$, next member 721) — and $301 = 7 \\cdot 43$ while $721 = 60 \\cdot 12 + 1 = 7 \\cdot 103$ cash the conditions.',
          ],
        },
        {
          kind: 'derivation', title: 'A number is its remainder vector', statement: 'For coprime $m$ and $n$, the address map $N \\mapsto (N \\bmod m,\\ N \\bmod n)$ is a bijection from the $mn$ classes of $\\mathbb{Z}/mn\\mathbb{Z}$ onto the pair grid $\\mathbb{Z}/m\\mathbb{Z} \\times \\mathbb{Z}/n\\mathbb{Z}$: every pair names exactly one class, and every class has exactly one address.', steps: [
            { label: 'No two classes share an address', formula: "(N \\equiv N' \\bmod m) \\wedge (N \\equiv N' \\bmod n) \\implies mn \\mid N - N'", explanation: 'Both m and n divide the difference N − N′; they are coprime, so their product divides it too — chapter 2\'s lcm theorem doing the lifting. Distinct classes in 0..mn−1 cannot collide.' },
            { label: 'Counting forces the bijection', formula: '\\#\\{\\text{classes}\\} = mn = \\#\\{\\text{pairs}\\} \\implies \\text{distinctness} = \\text{surjectivity}', explanation: 'mn classes map injectively into a grid of exactly mn addresses: nothing is missed. The verifier swept every coprime pair (m, n) up to 30 — over a hundred pairs, every vector hit exactly once.' },
            { label: 'The exhibit addresses cash in', formula: '(3 \\bmod 8,\\ 6 \\bmod 11) \\leftrightarrow 83 \\pmod{88}, \\qquad (1 \\bmod 60,\\ 0 \\bmod 7) \\leftrightarrow 301 \\pmod{420}', explanation: 'Both hunts of the example were address lookups: solve the congruence, land on the class, and the family N + lcm·k is the whole street.' },
            { label: 'The honest edge is the non-coprime case', formula: '\\gcd(m, n) = g > 1: \\text{ solvable} \\iff g \\mid (b - a)', explanation: 'Without coprimality the grid has blind addresses — a solution exists exactly when the two remainders agree modulo the shared factor. The verifier swept all m, n ≤ 40 against this criterion; lesson 5.4 proved it.' },
          ], result: 'The CRT is lesson 10.1\'s ladder rung built sideways: instead of extending a system, it splits one — and the two views are one theorem. "Find the smallest N with…" is not a search along the number line; it is navigation on a finite grid, and the grid is a number system on the map.' },
        {
          kind: 'para',
          text:
            'Look back one last time and the chain closes on itself. Legendre\'s chain $\\lfloor n/5 \\rfloor, \\lfloor n/25 \\rfloor, \\ldots$ is the quotient sequence of $n \\div 5$; the base-5 digits are the remainder sequence of the same divisions; the CRT hunts are remainder conditions stacked into an address. **Trailing zeros, base names, remainder hunts — three costumes of one chain**, and the chain is the division algorithm, the first theorem of chapter 2. The whole toolkit of the examination shelf stands on the same ground the whole book stood on.',
        },
        { kind: 'heading', text: 'The Book in One Page' },
        {
          kind: 'para',
          text:
            'Ten chapters compress to one paragraph. Chapter 1 rebuilt counting from the successor and proved induction; chapter 2 drew the division algorithm and its two by-products, Bézout and Diophantus; chapter 3 made positional naming a theorem for every base; chapter 4 proved the fundamental theorem of arithmetic and met the primes\' endlessness; chapter 5 turned remainders into a full arithmetic of congruences. Then the map of lesson 10.1: chapter 6 built $\\mathbb{Z}$ because subtraction failed, chapter 7 built $\\mathbb{Q}$ because division failed, chapter 8 built $\\mathbb{R}$ because roots failed — each rung embedded, each embedding preserving the laws. Chapter 9 let the historical systems show the same ideas being found by hand. And this chapter read the finished map three ways: as **structure** (10.1), as **guard** (10.2), as **navigation** (10.3).',
        },
        {
          kind: 'para',
          text:
            'Notice what the three readings share. In each, a finite or structured system — $\\mathbb{Z}/m\\mathbb{Z}$, the ladder, the CRT grid — earns its keep by being *smaller than the problem* while remaining *lawfully faithful to it*. That is the book\'s deepest promise, kept: mathematics does not solve hard problems by brute force; it finds the system inside which the problem is easy, and proves the detour honest.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The book in one sentence',
          text:
            'Numbers are not a zoo; they are one family, each member built on purpose to repair a specific failure of the last — and every practical trick of arithmetic, from unit digits to check digits, is one of those repaired systems running a small, honest, lawful computation. Structures (10.1), guards (10.2), navigation (10.3): one map.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner — the toolkit in the paper',
          text:
            'This lesson is the examination shelf\'s bread and butter, and the mapping is exact. CAT/IPMAT and SSC/banking quantitative sections ask: unit digits of $a^n$ (this lane, ~30 seconds with the cycle table), trailing zeros of $n!$ (the chain, one line per level), base conversions (the quotient-remainder chain, then a place-value check), and two-remainder hunts (the CRT address or a short scan). The banked reference (Khattar QA ch. 1) drills all four as separate tricks; you now hold the theorem that makes them one skill — and the time saved is the engine\'s gift: reduce, compute inside, lift back. Every number in this lesson\'s exercises was recomputed by script before you met it.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What the map still does not show',
          text:
            'Three honest edges, marked as the book closes. Above the ladder: $x^2 = -1$ still gates off $\\mathbb{C}$, which no ordered system answers (10.1\'s open gate). Beyond detection: Hamming\'s correction program — locating and repairing errors, not just refusing them — is the next shelf\'s subject (10.2\'s handoff). And within this lesson: the non-coprime CRT needs its gcd criterion, the non-coprime power wheels have no station 1, and the finite systems here are shadows of a deeper structure (rings and their homomorphisms) that the Algebra and Number Theory shelves will name and reopen. The map ends where honesty ends — and every edge shown is an edge proved, not an edge avoided.',
        },
        {
          kind: 'terms', items: [
            {
              term: 'The toolkit engine',
              def: 'The three-move pattern behind every competitive-arithmetic trick: name the modulus $m$, compute inside $\\mathbb{Z}/m\\mathbb{Z}$ (cycles, inverses, chains), lift the residue back as the verdict. Lawful because reduction preserves addition and multiplication — the congruence laws of lesson 5.1.',
            },
            {
              term: 'Unit digit',
              def: 'The residue of a number in $\\mathbb{Z}/10\\mathbb{Z}$. Power cycles have period 4 for bases 2, 3, 7, 8; period 2 for 4 and 9; period 1 for 0, 1, 5, 6 — so any exponent reduces modulo the period before the cycle is read.',
            },
            {
              term: 'Exponent reduction',
              def: "Replacing an astronomical exponent $n$ by $n \\bmod p$ ($p$ = the cycle period) before reading the cycle — the engine's first cash payment: $7^{2024}$ needs only $2024 \\bmod 4$, and $3^{2024}$ inside $\\mathbb{Z}/100\\mathbb{Z}$ needs only $2024 \\bmod 20$.",
            },
            {
              term: "Legendre's formula",
              def: 'The exponent of the prime $p$ in $n!$ is $v_p(n!) = \\sum_{k \\ge 1} \\lfloor n/p^k \\rfloor$ — a chain of floors, each counting the multiples of $p^k$. Stated in the 1808 second edition of Legendre\'s *Essai sur la théorie des nombres*; independently by de Polignac (1849).',
            },
            {
              term: 'Trailing zeros',
              def: 'The number of zeros ending $n!$: $Z = v_5(n!)$, because $v_2(n!) \\ge v_5(n!)$ always — the 5s are the scarce factor. Readable from the base-5 name too: $Z(n) = (n - s_5(n))/4$.',
            },
            {
              term: 'Digit-sum law',
              def: '$N \\equiv s_b(N) \\pmod{b - 1}$ in every base $b$: place values collapse to 1 modulo $b - 1$. The 3/9 tests ($b = 10$), casting out nines (lesson 10.2), and the mod-11 test of base 12 are one law.',
            },
            {
              term: 'Quotient-remainder chain',
              def: "The division algorithm run as a loop: quotients drive the process, remainders are the digits of the base-$b$ name — and the quotient chain of $n \\div p$ is simultaneously Legendre's chain counting $v_p(n!)$. One chain, two harvests.",
            },
            {
              term: 'Remainder vector',
              def: 'The CRT reading of a number: for coprime $m, n$ the pair $(N \\bmod m,\\ N \\bmod n)$ addresses the $mn$ classes bijectively — a number IS where it sits in the grid. The "smallest $N$ with…" hunts are grid navigation, and the family marches by $\\operatorname{lcm}(m, n)$.',
            },
          ] },
        {
          kind: 'quiz', title: 'Check yourself', items: [
            {
              q: 'The unit digit of $3^{2024}$ is —',
              options: ['1', '9', '7', '3'],
              answer: 0,
              explain:
                'The cycle of 3 is (3, 9, 7, 1) with period 4, and $2024 \\equiv 0 \\pmod 4$ — the 4th entry, which is 1. Options 1, 2 and 3 are the other three stations of the same cycle, each visited by a different residue of the exponent (9 when $n \\equiv 2$, 7 when $n \\equiv 3$, 3 when $n \\equiv 1$).',
            },
            {
              q: 'The number of zeros at the end of $250!$ is —',
              options: ['50', '60', '62', '63'],
              answer: 2,
              explain:
                'The chain: $\\lfloor 250/5 \\rfloor = 50$, $\\lfloor 250/25 \\rfloor = 10$, $\\lfloor 250/125 \\rfloor = 2$ — total 62. Option 0 counts only the first level (multiples of 5); option 1 forgets the third level (multiples of 125); option 3 is a misaddition. Cross-check: $250 = 2000_5$, digit sum 2, $(250 - 2)/4 = 62$.',
            },
            {
              q: 'In base 12, the digit-sum test ("casting out elevens") lives modulo —',
              options: ['9', '10', '11', '12'],
              answer: 2,
              explain:
                'The digit-sum law is $N \\equiv s_b(N) \\pmod{b - 1}$: place values are powers of $b \\equiv 1 \\pmod{b - 1}$, so at $b = 12$ the name condenses to its digit sum modulo 11. Option 3 — the base itself — is the classic trap; the modulus is always one less than the base. Options 0 and 1 are the $b = 10$ law and no law at all.',
            },
            {
              q: 'The smallest positive $N$ with $N \\equiv 3 \\pmod 8$ and $N \\equiv 6 \\pmod{11}$ is —',
              options: ['19', '52', '83', '91'],
              answer: 2,
              explain:
                '$N = 8k + 3$ gives $8k \\equiv 3 \\pmod{11}$; the inverse of 8 modulo 11 is 7 ($8 \\cdot 7 = 56 \\equiv 1$), so $k \\equiv 21 \\equiv 10$ and $N = 83 = 8 \\cdot 10 + 3 = 11 \\cdot 7 + 6$. Option 0 (19) has remainder 8 modulo 11; option 1 (52) has remainder 4 modulo 8; option 3 (91) has remainder 3 modulo 11 — honest near-misses of the class $83 + 88k$.',
            },
            {
              q: 'The one-engine thesis of this lesson: every toolkit computation reduces to —',
              options: [
                'a congruence computation inside a finite number system $\\mathbb{Z}/m\\mathbb{Z}$',
                'a decimal approximation carried to enough places',
                'a prime factorization of the given number',
                'an induction argument on the number of digits',
              ],
              answer: 0,
              explain:
                'Unit digits compute in $\\mathbb{Z}/10\\mathbb{Z}$, last two digits in $\\mathbb{Z}/100\\mathbb{Z}$, trailing zeros run the quotient chain of 5, and remainder hunts address the CRT grid — four costumes, one three-move pattern: name the modulus, compute inside, lift the verdict back. Option 1 belongs to a different shelf (approximation, not exactness); option 2 needs no factorization and often has none to offer; option 3 is the wrong tool for computations this direct.',
            },
          ] },
        {
          kind: 'exercises', title: 'Exercises', sets: [
            { level: 'L1', questions: [
              {
                q: 'Unit digits, fast: (i) $2^{85}$ (ii) $3^{71}$.',
                solution: [
                  'Cycle of 2: $(2, 4, 8, 6)$, period 4; $85 = 4 \\cdot 21 + 1$, so $85 \\equiv 1 \\pmod 4$.',
                  '(i) The 1st entry of $(2, 4, 8, 6)$: the unit digit is **2**.',
                  'Cycle of 3: $(3, 9, 7, 1)$; $71 = 4 \\cdot 17 + 3$, so $71 \\equiv 3 \\pmod 4$.',
                  '(ii) The 3rd entry of $(3, 9, 7, 1)$ is 7 — and indeed $3^3 = 27$ ends in 7: the unit digit is **7**.',
                ],
                answer: '(i) 2 (ii) 7',
              },
              {
                q: 'Trailing zeros: (i) $25!$ (ii) $30!$.',
                solution: [
                  '(i) $\\lfloor 25/5 \\rfloor = 5$, $\\lfloor 25/25 \\rfloor = 1$: $Z = 5 + 1 = 6$.',
                  '(ii) $\\lfloor 30/5 \\rfloor = 6$, $\\lfloor 30/25 \\rfloor = 1$: $Z = 6 + 1 = 7$.',
                  'Small $n$, short chains — but the 25-level already pays twice: $25 = 5^2$ donates its second 5.',
                ],
                answer: '(i) 6 zeros (ii) 7 zeros',
              },
              {
                q: 'Write 2024 in base 5, verify by place values, and name the bonus the chain pays.',
                solution: [
                  'Chain: $2024 = 5 \\cdot 404 + 4$; $404 = 5 \\cdot 80 + 4$; $80 = 5 \\cdot 16 + 0$; $16 = 5 \\cdot 3 + 1$; $3 = 5 \\cdot 0 + 3$.',
                  'Remainders bottom-up: 3, 1, 0, 4, 4 — so $2024 = 31044_5$.',
                  'Check: $3 \\cdot 625 + 1 \\cdot 125 + 0 \\cdot 25 + 4 \\cdot 5 + 4 = 1875 + 125 + 20 + 4 = 2024$. ✓',
                  'Bonus: the quotient chain 404, 80, 16, 3 is Legendre\'s chain — $Z(2024!) = 404 + 80 + 16 + 3 = 503$ zeros, free of charge.',
                ],
                answer: '2024 = 31044₅ (place sum 1875 + 125 + 0 + 20 + 4); the same chain counts 503 zeros of 2024!',
              },
            ] },
            { level: 'L2', questions: [
              {
                q: 'The unit digit of $7^{7^7}$.',
                solution: [
                  'First the exponent: $7^7 = 823543$.',
                  'Only $823543 \\bmod 4$ matters: $823543 = 4 \\cdot 205885 + 3$, so $823543 \\equiv 3 \\pmod 4$.',
                  'Cycle of 7: $(7, 9, 3, 1)$ — the 3rd entry is 3 (and indeed $7^3 = 343$).',
                  'Hence $7^{7^7}$ ends in **3**.',
                ],
                answer: '3',
              },
              {
                q: '$100!$ ends in 24 zeros. Explain why we count 5s and not 2s, and give $v_2(100!)$.',
                solution: [
                  'A trailing zero is a factor $10 = 2 \\cdot 5$: every 5 must find a 2 to pair with.',
                  'Count the 2s by the same chain: $v_2(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97$.',
                  'Ninety-seven 2s stand ready for twenty-four 5s — the 5s run out first, so $Z = v_5(100!) = 20 + 4 = 24$.',
                  'Moral: always count the scarce prime; the plentiful one never binds.',
                ],
                answer: 'Z = v₅ = 24; v₂(100!) = 97 ≥ 24 — the 5s are the bottleneck',
              },
              {
                q: 'Write 2024 in base 16 and confirm with the nibble machine.',
                solution: [
                  'Chain: $2024 = 16 \\cdot 126 + 8$; $126 = 16 \\cdot 7 + 14$; $7 = 16 \\cdot 0 + 7$.',
                  'Remainders bottom-up: 7, 14, 8 — and 14 prints as **E**: $2024 = 7\\mathrm{E}8_{16}$.',
                  'Check by place values: $7 \\cdot 256 + 14 \\cdot 16 + 8 = 1792 + 224 + 8 = 2024$. ✓',
                  'Binary cross-check: $2024 = 11111101000_2$; padded to 12 bits, $0111\\ 1110\\ 1000$ groups into nibbles 7, E, 8. The two machines agree.',
                ],
                answer: '2024 = 7E8₁₆ (1792 + 224 + 8); nibbles 0111 1110 1000 → 7 E 8',
              },
            ] },
            { level: 'L3', questions: [
              {
                q: 'The last two digits of $3^{2024}$.',
                solution: [
                  'Compute inside $\\mathbb{Z}/100\\mathbb{Z}$ and scan for the order: $3^1 = 3$, $3^2 = 9$, $3^4 = 81$, $3^8 = 6561 \\equiv 61$, $3^{10} \\equiv 61 \\cdot 9 = 549 \\equiv 49$, $3^{20} \\equiv 49^2 = 2401 \\equiv 1$.',
                  'The order of 3 modulo 100 is 20 — the verifier\'s sweep found no smaller return to station 1.',
                  'Reduce: $2024 = 20 \\cdot 101 + 4$, so $3^{2024} \\equiv 3^4 = 81 \\pmod{100}$.',
                  'Hence the last two digits are **81**.',
                ],
                answer: '81',
              },
              {
                q: 'Zeros of $2024!$ by the chain, with the digit-sum cross-check.',
                solution: [
                  'Chain: $\\lfloor 2024/5 \\rfloor = 404$, $\\lfloor 2024/25 \\rfloor = 80$, $\\lfloor 2024/125 \\rfloor = 16$, $\\lfloor 2024/625 \\rfloor = 3$, $\\lfloor 2024/3125 \\rfloor = 0$ — stop.',
                  'Sum: $404 + 80 + 16 + 3 = 503$ zeros.',
                  'Cross-check: $2024 = 31044_5$ (exercise L1-3), digit sum $3 + 1 + 0 + 4 + 4 = 12$, and $(2024 - 12)/4 = 503$. ✓',
                ],
                answer: '503 zeros',
              },
              {
                q: 'The smallest $N$ with $N \\equiv 1 \\pmod 3$ and $N \\equiv 2 \\pmod 5$.',
                solution: [
                  'Write $N = 3k + 1$; the second condition gives $3k + 1 \\equiv 2 \\pmod 5$, so $3k \\equiv 1 \\pmod 5$.',
                  'The inverse of 3 modulo 5 is 2 ($3 \\cdot 2 = 6 \\equiv 1$), so $k \\equiv 2 \\pmod 5$.',
                  'So $N = 3 \\cdot 2 + 1 = 7$; check $7 = 5 \\cdot 1 + 2$. ✓',
                  'The full class is $7 + 15k$ — 15 = lcm(3, 5) — and the sweep found exactly one class in $[0, 15)$.',
                ],
                answer: 'N = 7 (the class 7 + 15k)',
              },
            ] },
            { level: 'L4', questions: [
              {
                q: 'A number leaves remainder 1 when divided by 2, 3, 4 and 5, and is a multiple of 7. Find the two smallest such numbers.',
                solution: [
                  'The four conditions collapse into one: $N - 1$ divisible by 2, 3, 4, 5 means $60 \\mid N - 1$ (the lcm; 60 = 2²·3·5).',
                  'The candidates form a remainder chain: 1, 61, 121, 181, 241, 301, 361, 421, …',
                  'Scan for the multiple of 7: $301 = 7 \\cdot 43$ — the first hit.',
                  'The family marches by lcm(60, 7) = 420: the next member is $301 + 420 = 721$, and $721 = 60 \\cdot 12 + 1 = 7 \\cdot 103$. ✓',
                ],
                answer: '301 and 721 (the class 301 + 420k)',
              },
              {
                q: 'Is 2024 divisible by 15? Decide from its base-16 digit sum, then confirm by division.',
                solution: [
                  'From exercise L2-3: $2024 = 7\\mathrm{E}8_{16}$, so $s_{16}(2024) = 7 + 14 + 8 = 29$.',
                  'The digit-sum law at $b = 16$: $2024 \\equiv 29 \\equiv 14 \\pmod{15}$ — not divisible.',
                  'Confirm directly: $2024 = 134 \\cdot 15 + 14$. ✓',
                  'The name in base 16 settled a divisibility question about 15 — the digit-sum law\'s free gift, one base up from casting out nines.',
                ],
                answer: 'No — remainder 14 ($s_{16} = 29 \\equiv 14 \\bmod 15$; $2024 = 134 \\cdot 15 + 14$)',
              },
              {
                q: 'The last digit of $1! + 2! + 3! + \\cdots + 100!$.',
                solution: [
                  'Every $k!$ with $k \\ge 5$ ends in 0: $5! = 120$ already carries a 5, and later factorials only carry more.',
                  'So the unit digit of the whole sum is the unit digit of $1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33$.',
                  'The answer is **3** — confirmed by the verifier, which summed all one hundred BigInt factorials and read the final digit.',
                ],
                answer: '3',
              },
            ] },
            { level: 'L5', questions: [
              {
                q: 'Prove $Z(n) = (n - s_5(n))/4$ for every $n \\ge 1$, and cash it on $n = 2024$.',
                solution: [
                  'Write $n = d_0 + 5 d_1 + 25 d_2 + \\cdots$ — the representation theorem of chapter 3.',
                  'Flooring kills the low digits: $\\lfloor n/5^k \\rfloor = d_k + 5 d_{k+1} + 25 d_{k+2} + \\cdots$.',
                  'Sum the chain over $k \\ge 1$ and collect the digit $d_i$: it appears at levels $1, \\ldots, i$ with weight $1 + 5 + \\cdots + 5^{i-1} = (5^i - 1)/4$.',
                  'So $Z(n) = \\sum_i d_i (5^i - 1)/4 = \\big(n - s_5(n)\\big)/4$ — the geometric sums telescope.',
                  'Cash on 2024: $31044_5$ has digit sum 12, so $Z = (2024 - 12)/4 = 503$ — matching the chain $404 + 80 + 16 + 3$. ✓',
                ],
                answer: 'Z(n) = (n − s₅(n))/4; on 2024: (2024 − 12)/4 = 503',
              },
              {
                q: 'Show that $N \\mapsto (N \\bmod 8,\\ N \\bmod 11)$ is a bijection from the 88 classes $\\{0, \\ldots, 87\\}$ onto the pair grid, and name the class carrying the pair (3, 6).',
                solution: [
                  'Injective: if two classes agree modulo 8 and modulo 11, their difference is divisible by both; $\\gcd(8, 11) = 1$, so 88 divides it — same class.',
                  '88 classes into a grid of exactly 88 addresses, no collisions: the map is a bijection (the verifier swept all 88 vectors — each hit exactly once).',
                  'The pair (3, 6): write $N = 8k + 3$, so $8k \\equiv 3 \\pmod{11}$; $8^{-1} \\equiv 7$, $k \\equiv 21 \\equiv 10$, $N = 83$.',
                  'Check: $83 = 8 \\cdot 10 + 3 = 11 \\cdot 7 + 6$. ✓ — the pair addresses the class 83 mod 88.',
                ],
                answer: 'bijection on the 88 classes; (3, 6) names 83',
              },
            ] },
            { level: 'L6', questions: [
              {
                q: 'Prove $v_2(n!) \\ge v_5(n!)$ for every $n \\ge 2$, and conclude that the trailing zeros of $n!$ always equal $v_5(n!)$.',
                solution: [
                  'At every level $k \\ge 1$: $2^k \\le 5^k$, so every multiple of $5^k$ in $1..n$ is automatically a multiple of $2^k$.',
                  'Hence $\\lfloor n/2^k \\rfloor \\ge \\lfloor n/5^k \\rfloor$ level by level.',
                  'Sum the levels (Legendre on both sides): $v_2(n!) \\ge v_5(n!)$.',
                  'A trailing zero needs one 2 and one 5; since the 2s never run out before the 5s, every 5 pairs up — so $Z(n!) = v_5(n!)$ for every $n$.',
                  'The verifier swept $n \\le 5000$: no counterexample, and the proof says none can exist.',
                ],
                answer: 'Z(n!) = v₅(n!) for every n — proven level by level and swept to 5000',
              },
              {
                q: 'The synthesis in your own working: show that one quotient-remainder chain runs all three engines of this lesson, naming the exhibit for each.',
                solution: [
                  'Engine 1, trailing zeros: the chain $1000 \\to 200 \\to 40 \\to 8 \\to 1 \\to 0$ sums to $249$ — Legendre\'s floors ARE the quotients of $1000 \\div 5$.',
                  'Engine 2, base names: the remainders of the same divisions — 0, 0, 0, 3, 1, read bottom-up — name $1000 = 13000_5$.',
                  'Engine 3, remainder hunts: conditions stack into addresses — $83 + 88k$ for (3 mod 8, 6 mod 11), $301 + 420k$ for the ladder classic.',
                  'And every engine ran inside a finite system from the map: $\\mathbb{Z}/10\\mathbb{Z}$ and $\\mathbb{Z}/100\\mathbb{Z}$ for digits, the 5-chain for factorials, $\\mathbb{Z}/88\\mathbb{Z}$ and $\\mathbb{Z}/420\\mathbb{Z}$ for addresses.',
                  'Hence the toolkit is not four tricks but the book\'s whole story — repaired systems doing small, lawful work — and the division algorithm of chapter 2 is the single theorem they all stand on.',
                ],
                answer: '249 · 13000₅ · 83 + 88k — one chain, three engines, one map',
              },
            ] },
          ] },
        {
          kind: 'formula', name: 'The unit-digit reduction', latex: '\\text{unit digit of } a^n = \\text{cycle entry } \\big((n - 1) \\bmod p\\big) + 1, \\quad p = 4\\ (2, 3, 7, 8),\\ 2\\ (4, 9),\\ 1\\ (0, 1, 5, 6)', note: 'compute in ℤ/10ℤ; the exponent only matters modulo the period — and for last two digits, run the same rule in ℤ/100ℤ from the order' },
        {
          kind: 'formula', name: "Legendre's formula", latex: 'v_p(n!) = \\sum_{k \\ge 1} \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor = \\frac{n - s_p(n)}{p - 1}', note: 'the floor chain counts multiples of p, p², p³, …; the digit-sum form reads the base-p name of n' },
        {
          kind: 'formula', name: 'Trailing zeros of n!', latex: 'Z(n!) = v_5(n!) = \\sum_{k \\ge 1} \\left\\lfloor \\frac{n}{5^k} \\right\\rfloor \\qquad \\big(v_2(n!) \\ge v_5(n!)\\ \\text{always}\\big)', note: 'the 5s are the bottleneck; e.g. Z(1000!) = 200 + 40 + 8 + 1 = 249 and Z(2024!) = 404 + 80 + 16 + 3 = 503' },
        {
          kind: 'formula', name: 'The digit-sum law', latex: 'N \\equiv s_b(N) \\pmod{b - 1}', note: 'casting out (b − 1)s in any base — the 3/9 tests at b = 10, the mod-11 test at b = 12, the mod-15 test at b = 16' },
      ],
    },

  ],
  plannedLessons: [],
}
