import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 2: Exponents and Powers
 *
 * LESSONS WRITTEN: 2.1 Powers and the Laws of Exponents (run 69 — quiz
 * keys 0/1/1/2/1, 14 exercises, two figures, verified E2E-green)
 *                  2.2 Zero and Negative Exponents: Another Repair (run 69)
 *                  — pending this run's second lesson
 *
 * References for this unit: the Drive copy `Elementary-Algebra_text.pdf`
 * is H. S. Hall & S. R. Knight, *Elementary Algebra for Schools*
 * (Macmillan, first edition 1885; this 1942 reprint) — its chapter XXX
 * "The Theory of Indices" (book pp. 258 ff.) informed the arc of this
 * run: the laws proved directly from the repeated-multiplication
 * definition, then zero and negative indices demanded BECAUSE the same
 * laws should govern them (the permanence charter ANS ch. 6 named).
 * Banked keys reused: ncert-math8-ch10-exponents (the school canon's
 * negative-exponent arc — 2.3 takes its standard-form bill),
 * cengage-jee-style (the presentation contract), hankel-1867-permanence +
 * peacock-1833-permanence (2.2's repair criterion, banked in ANS ch. 6).
 * One download this run (the H&K Elementary 23 MB, for the ch. XXX arc
 * study) — working copy deleted after the run's E2E (storage law); no
 * content reproduced, exposition original.
 *
 * Every number of lessons 2.1–2.2 was pre-verified by
 * scripts/verify-book3-ch02.ts (sections A–G, 80 checks ALL GREEN before
 * any prose; the first pass caught four of the author's own bugs — two
 * sweep-count miscounts, one botched expansion exhibit and one base-count
 * error — all corrected before writing). Sections H (authored 2.1) and I
 * (authored 2.2) import the chapter file directly.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (2.1): the copies ledger — the product law as counted      */
/* copies. Header band (30,18,660,44); three panels 200x220 at y=90    */
/* (x = 30 / 260 / 490); unit boxes 40x28 stacked inside; footer       */
/* y = 336. Geometry pinned in verify-book3-ch02.ts section G.         */
/* ------------------------------------------------------------------ */

function copiesLedgerSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The product law counted by copies: a squared is two copies of a, a cubed is three copies, and multiplying them stacks all five copies into a to the fifth — two plus three equals five">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the product law, counted by copies</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">a² · a³ stacks every copy of a — 2 + 3 = 5</text>')
  // three panels
  const panels: [number, string, string][] = [
    [30, 'a²', '2 copies'],
    [260, 'a³', '3 copies'],
    [490, 'a⁵', '5 copies'],
  ]
  for (const [x, title, sub] of panels) {
    parts.push(`<rect x="${x}" y="90" width="200" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 100}" y="116" font-size="17" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 100}" y="134" font-size="11.5" fill="#0d9488" text-anchor="middle">${sub} of a</text>`)
  }
  // unit boxes: one "a" per copy (40x28), centred per panel
  const stacks: [number, number[]][] = [
    [110, [176, 210]],
    [340, [142, 176, 210]],
    [570, [142, 176, 210, 244, 278]],
  ]
  for (const [bx, ys] of stacks) {
    for (const y of ys) {
      parts.push(`<rect x="${bx}" y="${y}" width="40" height="28" rx="4" fill="none" stroke="#65a30d" stroke-width="1.3"/>`)
      parts.push(`<text x="${bx + 20}" y="${y + 19}" font-size="13" fill="#166534" text-anchor="middle" font-style="italic">a</text>`)
    }
  }
  // plus and equals connectors between panels
  parts.push('<text x="245" y="205" font-size="22" fill="#166534" text-anchor="middle">+</text>')
  parts.push('<text x="475" y="205" font-size="22" fill="#166534" text-anchor="middle">=</text>')
  // footer (y = 336 clears the panels, which end at 310)
  parts.push('<text x="360" y="336" font-size="12" fill="#0d9488" text-anchor="middle">multiplying powers of the same base adds the copy counts — the same counting shape as 1.2\\u2019s collection law</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (2.1): the sign alternator — (−2)ⁿ for n = 1..6. Two sign  */
/* bands (24,14,684,34) and (24,58,684,34); six value boxes 92x64 at   */
/* y=110, x = 24 + 118·i (last box ends at 706); footer y = 270.       */
/* ------------------------------------------------------------------ */

function signAlternatorSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The powers of negative two from exponent one to six: minus two, four, minus eight, sixteen, minus thirty-two, sixty-four — the sign alternates, positive on even exponents and negative on odd exponents">'
  )
  parts.push('<rect x="0" y="0" width="720" height="300" fill="transparent"/>')
  // the two sign bands
  parts.push('<rect x="24" y="14" width="684" height="34" rx="8" fill="none" stroke="#16a34a" stroke-width="1.4"/>')
  parts.push('<text x="366" y="36" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">even exponent — the sign forgives: the answer is positive</text>')
  parts.push('<rect x="24" y="58" width="684" height="34" rx="8" fill="none" stroke="#16a34a" stroke-width="1.4"/>')
  parts.push('<text x="366" y="80" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">odd exponent — the sign survives: the answer is negative</text>')
  // six value boxes
  const vals: [string, string][] = [
    ['(−2)¹', '−2'],
    ['(−2)²', '4'],
    ['(−2)³', '−8'],
    ['(−2)⁴', '16'],
    ['(−2)⁵', '−32'],
    ['(−2)⁶', '64'],
  ]
  for (let i = 0; i < 6; i++) {
    const x = 24 + 118 * i
    parts.push(`<rect x="${x}" y="110" width="92" height="64" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>`)
    parts.push(`<text x="${x + 46}" y="136" font-size="14.5" fill="#166534" text-anchor="middle" font-weight="700">${vals[i][0]}</text>`)
    parts.push(`<text x="${x + 46}" y="160" font-size="13" fill="#65a30d" text-anchor="middle">${vals[i][1]}</text>`)
  }
  // footer (y = 270 clears the boxes, which end at 174)
  parts.push('<text x="360" y="270" font-size="12" fill="#0d9488" text-anchor="middle">the sign of (−a)ⁿ rides the parity of n — sweep-verified for every base a ∈ [1..9] and n ∈ [1..12]</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (2.2): the extension ladder for the exponent family.       */
/* viewBox 720x380; header (24,14,684,34); left panel (24,60,320,240)  */
/* with 2 inner boxes (44,100,280,80) and (44,200,280,80); right panel */
/* (376,60,320,240) with 3 inner boxes (396,100/166/232,280,56);       */
/* footer y = 352. Geometry pinned in verify-book3-ch02.ts section G.  */
/* ------------------------------------------------------------------ */

function extensionLadderSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extension ladder: before the repair the exponents are positive counts and the quotient law works only when the top exponent is larger; after the repair the exponents span all integers and every law works for every nonzero base, with zero excluded">'
  )
  parts.push('<rect x="0" y="0" width="720" height="380" fill="transparent"/>')
  parts.push('<rect x="24" y="14" width="684" height="34" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="366" y="36" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="700">the same ladder ANS climbed — now run on the exponents</text>')
  // left panel: BEFORE
  parts.push('<rect x="24" y="60" width="320" height="240" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="184" y="86" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">BEFORE (Lesson 2.1)</text>')
  parts.push('<rect x="44" y="100" width="280" height="80" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="58" y="124" font-size="12" fill="#166534" font-weight="700">exponents are counts</text>')
  parts.push('<text x="58" y="144" font-size="11.5" fill="#0d9488">m, n ∈ 1, 2, 3, …</text>')
  parts.push('<text x="58" y="164" font-size="11.5" fill="#0d9488">a⁰ unspeakable</text>')
  parts.push('<rect x="44" y="200" width="280" height="80" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="58" y="224" font-size="12" fill="#166534" font-weight="700">quotient law restricted</text>')
  parts.push('<text x="58" y="244" font-size="11.5" fill="#0d9488">a^m / a^n needs m &gt; n</text>')
  parts.push('<text x="58" y="264" font-size="11.5" fill="#0d9488">2² / 2⁵ = 1/8 unspeakable</text>')
  // right panel: AFTER
  parts.push('<rect x="376" y="60" width="320" height="240" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="536" y="86" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">AFTER (this lesson)</text>')
  parts.push('<rect x="396" y="100" width="280" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="410" y="122" font-size="12" fill="#166534" font-weight="700">exponents span all integers</text>')
  parts.push('<text x="410" y="142" font-size="11.5" fill="#0d9488">…, −2, −1, 0, 1, 2, …</text>')
  parts.push('<rect x="396" y="166" width="280" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="410" y="188" font-size="12" fill="#166534" font-weight="700">every law survives</text>')
  parts.push('<text x="410" y="208" font-size="11.5" fill="#0d9488">product, quotient, towers — swept</text>')
  parts.push('<rect x="396" y="232" width="280" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="410" y="254" font-size="12" fill="#166534" font-weight="700">one base stays outside</text>')
  parts.push('<text x="410" y="274" font-size="11.5" fill="#0d9488">a = 0: no 0⁰, no 0⁻ⁿ — honest</text>')
  // arrow between panels
  parts.push('<text x="356" y="185" font-size="20" fill="#166534" text-anchor="middle">→</text>')
  parts.push('<text x="360" y="352" font-size="12" fill="#0d9488" text-anchor="middle">the charter: new answers for dead questions, old numbers unchanged, old laws alive, no new failures</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (2.2): the fraction-bar flip map. viewBox 720x340; header  */
/* (24,14,684,36); left panel (30,80,300,180) with 2 inner boxes;      */
/* right panel (390,80,300,180) with 2 inner boxes; footer y = 310.    */
/* ------------------------------------------------------------------ */

function flipMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The fraction-bar flip map: a negative exponent moves its factor across the fraction bar and the exponent turns positive — numerators with negative exponents go down, denominators with negative exponents come up">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="24" y="14" width="684" height="36" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="366" y="37" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="700">a negative exponent means: cross the bar, lose the sign</text>')
  // left panel: above the bar
  parts.push('<rect x="30" y="80" width="300" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="180" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">above the bar (numerator)</text>')
  parts.push('<rect x="50" y="126" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="180" y="150" font-size="13.5" fill="#166534" text-anchor="middle">x⁻⁵ sits on top</text>')
  parts.push('<text x="180" y="170" font-size="11.5" fill="#0d9488" text-anchor="middle">it moves DOWN as x⁵</text>')
  parts.push('<rect x="50" y="192" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="180" y="216" font-size="13.5" fill="#166534" text-anchor="middle">x⁵ · x⁻³ = x² stays top</text>')
  parts.push('<text x="180" y="236" font-size="11.5" fill="#0d9488" text-anchor="middle">the −3 rides along legally</text>')
  // right panel: below the bar
  parts.push('<rect x="390" y="80" width="300" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="540" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">below the bar (denominator)</text>')
  parts.push('<rect x="410" y="126" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="540" y="150" font-size="13.5" fill="#166534" text-anchor="middle">y⁻⁴ sits underneath</text>')
  parts.push('<text x="540" y="170" font-size="11.5" fill="#0d9488" text-anchor="middle">it comes UP as y⁴ — multiply</text>')
  parts.push('<rect x="410" y="192" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="540" y="216" font-size="13.5" fill="#166534" text-anchor="middle">x⁻² / y⁻³ = y³ / x²</text>')
  parts.push('<text x="540" y="236" font-size="11.5" fill="#0d9488" text-anchor="middle">both cross — it inverts</text>')
  // arrow between panels
  parts.push('<text x="356" y="175" font-size="20" fill="#166534" text-anchor="middle">⇅</text>')
  parts.push('<text x="360" y="310" font-size="12" fill="#0d9488" text-anchor="middle">swept Frac-exact: 1/x⁻ⁿ = xⁿ, x⁻ᵃ/y⁻ᵇ = yᵇ/xᵃ, (a/b)⁻ⁿ = (b/a)ⁿ — the sign of the exponent flips, the value never lies</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 5 (2.3): the powers-of-ten ladder — the exponent rungs with  */
/* their prefix names. viewBox 720x360; header (24,14,684,34); six     */
/* stations 104x120 at y=90, x = 24 + 116·i (last ends 704); arrow     */
/* band (24,240,684,40); footer y = 336. Geometry pinned in section J. */
/* ------------------------------------------------------------------ */

function powersOfTenLadderSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The powers-of-ten ladder from ten to the minus six up to ten to the ninth, each rung labelled with its SI prefix name: micro at ten to the minus six, milli at ten to the minus three, one at ten to the zero, kilo at ten to the three, mega at ten to the six, giga at ten to the nine — every rung multiplies by ten">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="24" y="14" width="684" height="34" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="366" y="36" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="700">the exponent is the rung count on the ladder of tens</text>')
  const stations: [string, string, string][] = [
    ['10⁻⁶', 'micro- (µ)', 'millionth'],
    ['10⁻³', 'milli- (m)', 'thousandth'],
    ['10⁰', 'one', 'the unit rung'],
    ['10³', 'kilo- (k)', 'thousand'],
    ['10⁶', 'mega- (M)', 'million'],
    ['10⁹', 'giga- (G)', 'billion'],
  ]
  for (let i = 0; i < 6; i++) {
    const x = 24 + 116 * i
    parts.push(`<rect x="${x}" y="90" width="104" height="120" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 52}" y="122" font-size="17" fill="#166534" text-anchor="middle" font-weight="700">${stations[i][0]}</text>`)
    parts.push(`<text x="${x + 52}" y="152" font-size="12" fill="#65a30d" text-anchor="middle">${stations[i][1]}</text>`)
    parts.push(`<text x="${x + 52}" y="176" font-size="11" fill="#0d9488" text-anchor="middle">${stations[i][2]}</text>`)

  }
  parts.push('<rect x="24" y="240" width="684" height="40" rx="8" fill="none" stroke="#65a30d" stroke-width="1.4"/>')
  parts.push('<text x="366" y="265" font-size="12.5" fill="#166534" text-anchor="middle">each rung multiplies by 10 — the six school prefixes of FM 9.2 (kilo to milli) extended by mega, giga, micro</text>')
  parts.push('<text x="360" y="336" font-size="12" fill="#0d9488" text-anchor="middle">the standard form names a number by its rung (the exponent) and its digits (the coefficient) — two dials, one number</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 6 (2.3): the two dials of a x 10^k. viewBox 720x340; header  */
/* (24,14,684,36); left panel (30,80,300,180) with 2 inner boxes       */
/* (50,126,260,56) and (50,192,260,56); right panel (390,80,300,180)   */
/* with 2 inner boxes (410,...,260x56); footer y = 310.                */
/* ------------------------------------------------------------------ */

function twoDialsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two dials of a number in standard form: the coefficient carries the digits between one inclusive and ten exclusive — the precision dial; the exponent carries the place-shifts — the size dial; worked rows show one point zero seven three seven four one eight two four times ten to the ninth and six point two times ten to the minus four">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="24" y="14" width="684" height="36" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="366" y="37" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="700">a × 10^k — two dials, one number</text>')
  // left panel: the coefficient (precision dial)
  parts.push('<rect x="30" y="80" width="300" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="180" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the coefficient a — precision dial</text>')
  parts.push('<rect x="50" y="126" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="180" y="150" font-size="13" fill="#166534" text-anchor="middle">1 ≤ a &lt; 10 — the digits you measured</text>')
  parts.push('<text x="180" y="170" font-size="11.5" fill="#0d9488" text-anchor="middle">its length = the significant digits</text>')
  parts.push('<rect x="50" y="192" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="180" y="216" font-size="13" fill="#166534" text-anchor="middle">1.073741824 → ten digits, all exact</text>')
  parts.push('<text x="180" y="236" font-size="11.5" fill="#0d9488" text-anchor="middle">1.07 → three digits, a softer claim</text>')
  // right panel: the exponent (size dial)
  parts.push('<rect x="390" y="80" width="300" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="540" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the exponent k — size dial</text>')
  parts.push('<rect x="410" y="126" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="540" y="150" font-size="13" fill="#166534" text-anchor="middle">k = the place-shifts of the point</text>')
  parts.push('<text x="540" y="170" font-size="11.5" fill="#0d9488" text-anchor="middle">k &gt; 0 big, k &lt; 0 small, k = 0 the unit rung</text>')
  parts.push('<rect x="410" y="192" width="260" height="56" rx="6" fill="none" stroke="#65a30d" stroke-width="1.3"/>')
  parts.push('<text x="540" y="216" font-size="13" fill="#166534" text-anchor="middle">10^9 → nine shifts right (giga rung)</text>')
  parts.push('<text x="540" y="236" font-size="11.5" fill="#0d9488" text-anchor="middle">10^-4 → four shifts left (a ten-thousandth)</text>')
  // arrow between panels
  parts.push('<text x="356" y="175" font-size="20" fill="#166534" text-anchor="middle">↔</text>')
  parts.push('<text x="360" y="310" font-size="12" fill="#0d9488" text-anchor="middle">changing a refines the claim; changing k moves the number — the two dials never trade jobs</text>')
  parts.push('</svg>')
  return parts.join('')
}

export const chapter02: Chapter = {
  number: 2,
  slug: 'exponents-and-powers',
  title: 'Exponents and Powers',
  summary:
    'Powers promoted from shorthand to system: the exponent laws (product, quotient, power-of-a-power) proved from the definition rather than drilled, then the family completed — zero and negative exponents as the same closure repair ANS performed on the number systems, with every old law preserved. Scientific notation and orders of magnitude pay the practical bill.',
  status: 'complete',
  lessons: [
    {
      id: 'al-powers-and-the-laws-of-exponents',
      number: '2.1',
      title: 'Powers and the Laws of Exponents',
      concepts: [
        'base and exponent anatomy',
        'the repeated-multiplication definition',
        'the product law of exponents',
        'the quotient law of exponents',
        'the power-of-a-power law',
        'the sign law for negative bases',
        'the exponent as a count of copies',
        'the m > n boundary of the quotient law',
      ],
      objectives: [
        'read any power correctly — naming its base, its exponent and the copy count it compresses',
        'prove the product, quotient and power-of-a-power laws from the definition by counting copies',
        'verify each law on chosen numbers before trusting it, and say what the quotient law cannot yet do',
        'handle zero, one and negative bases honestly — including the sign law and the bracket trap',
        'apply the laws to simplify products, quotients and towers, and evaluate them at chosen values',
      ],
      prerequisites: ['al-expressions-terms-like-terms', 'fm-numbers-digits-place-value'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math8-ch10-exponents', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 1.1 taught the letter to stand for a number, and Lesson 1.2 taught copies of that number to combine: $3x + 2x = 5x$ because three copies plus two copies is five copies. But some quantities grow not by addition of copies — by **multiplication of copies**. A culture of bacteria doubles every hour; a runner\\u2019s prize fund doubles every round of a tournament; the seats of our place-value system (Foundation Mathematics 1.1) march in thousands, ten-thousands, lakhs and crores, each seat ten times the last. Repeated addition got its own shorthand ($3x$ instead of $x + x + x$) back in Lesson 1.2. Repeated multiplication deserves the same dignity — and it gets one, the **power**, whose shorthand is so compact that the whole law book of this chapter fits in three lines.' },
        { kind: 'para', text: 'The plan of this lesson: first define the power honestly (from repeated multiplication, with every word of the definition doing work), then read its anatomy (base, exponent, value), and then — the heart of the chapter — **prove the three exponent laws** from that definition rather than memorise them. The proofs are all the same one move: count the copies. That is the very move Lesson 1.2 used to prove the collection law, so the letter work of chapter 1 pays its first great dividend here. Along the way we keep every boundary honest: what zero does, what negative bases do to the sign, where the quotient law works and — crucially — where it does not (that failure is next lesson\\u2019s raw material).' },
        { kind: 'heading', text: 'What a Power Is: the Definition' },
        { kind: 'para', text: 'The definition follows the classic school texts closely in spirit, because it must: a power is a statement about repeated multiplication, and every law we prove later hangs off the exact wording. A quantity $a$ is said to be raised to the power $n$ when $n$ copies of $a$ are multiplied together. The number being copied is the **base**; the copy count is the **exponent** (older books, Hall and Knight among them, say **index**, plural **indices** — the same idea under a second name, and you will meet both names in examination papers).' },
        { kind: 'callout', tone: 'definition', title: 'Definition — power of a number', text: 'A base $a$ raised to a positive whole-number exponent $n$ is the product of $n$ copies of $a$. Thus $a^{n} = a \\cdot a \\cdot \\ldots \\cdot a$ with $a$ appearing exactly $n$ times. For example, $2^{5} = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$ (five copies of 2), and $x^{4} = x \\cdot x \\cdot x \\cdot x$ (four copies of $x$).' },
        {
          kind: 'equation',
          latex: 'a^{n} \\;=\\; \\underbrace{a \\cdot a \\cdot \\, \\cdots \\, \\cdot a}_{n \\text{ copies}} \\qquad (n = 1, 2, 3, \\ldots)',
          note: 'the whole chapter is contained here: the exponent counts copies, the base supplies them',
        },
        { kind: 'para', text: 'Two readings of the definition must be kept apart, because examinations prey on the confusion. The **value** of the power is the product you get after multiplying ($2^{5}$ has value 32). The **exponent** is not that value — it is the *count* of copies ($2^{5}$ has exponent 5, because 5 copies of 2 were multiplied). Lesson 1.1 met the contrast for a bare letter ($3a$ is 3 copies added; $a^{3}$ is 3 copies multiplied — 12 against 64 at $a = 4$); here the same contrast appears with numbers as the base: $2 \\cdot 3 = 6$ (two threes added) against $2^{3} = 8$ (two copied three times), and $5 \\cdot 2 = 10$ against $5^{2} = 25$. Swapping base and exponent changes the answer too: $2^{3} = 8$ but $3^{2} = 9$. The exponent is a count, not a multiplier — and neither is the value.' },
        { kind: 'para', text: 'The anatomy table below runs five powers through the full reading. Notice the last row: place value (Foundation Mathematics 1.1) was already quietly using powers — the numeral $4725$ weights its digits by $10^{3}, 10^{2}, 10^{1}, 10^{0}$, and that lesson even flashed $10^{0} = 1$ as the ones seat without stopping to explain it. That $10^{0}$ is exactly the boundary this chapter walks to: Lesson 2.2 will *derive* why any nonzero base to the power zero must be 1. For now the positive exponents carry all the weight.' },
        {
          kind: 'table',
          caption: 'The anatomy of a power — base, exponent, expanded form, value',
          head: ['Power', 'Base', 'Exponent (index)', 'Expanded form', 'Value'],
          rows: [
            ['$2^{5}$', '2', '5', '$2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$', '32'],
            ['$5^{2}$', '5', '2', '$5 \\cdot 5$', '25'],
            ['$(-3)^{2}$', '−3', '2', '$(-3) \\cdot (-3)$', '9'],
            ['$a^{4}$', '$a$', '4', '$a \\cdot a \\cdot a \\cdot a$', 'depends on $a$'],
            ['$10^{3}$', '10', '3', '$10 \\cdot 10 \\cdot 10$', '1000'],
          ],
        },
        { kind: 'para', text: 'One special case the definition settles immediately: the **first power**. One copy of $a$ is just $a$, so $a^{1} = a$ — the exponent 1 changes nothing, it only *counts* that nothing was multiplied. (There is no exponent 0 in this definition yet: zero copies multiply to what? Hold that thought — it is the doorway to Lesson 2.2.) Likewise the base $1$ is its own bore: $1^{n} = 1$ for every $n$, since multiplying ones never moves the value. And zero as base is honest but abrupt: $0^{n} = 0$ for every positive $n$, because the very first factor is zero and annihilates the product. None of these need memorising — each follows from the definition read literally.' },
        { kind: 'heading', text: 'The Exponent Laws: Proved, Not Memorised' },
        { kind: 'para', text: 'Arithmetic and Number Systems Lesson 7.2 proved the field laws — commutativity, associativity and their partners — and Lesson 1.1 of this book restated them in letter form, because a law worth having is a law worth *proving*. The exponent laws deserve the same treatment, and they need almost nothing to prove them: just the definition and the courage to count. We state each law, prove it by counting copies, and then verify it on chosen numbers — the sweep discipline of Lesson 1.1 applied at desk scale.' },
        { kind: 'para', text: 'For example, $a^{2} \\cdot a^{3}$: by the definition this is two copies of $a$ multiplied by three copies of $a$. But multiplying two copies by three copies just makes one long line of copies — five of them. So $a^{2} \\cdot a^{3} = a^{5}$, and the 5 came from $2 + 3$. The general law is the same argument with letters for the counts.' },
        {
          kind: 'derivation',
          title: 'The Product Law — multiplying powers of the same base',
          statement: 'For every base $a$ and positive exponents $m, n$: $a^{m} \\cdot a^{n} = a^{m+n}$.',
          steps: [
            { label: 'Expand both powers', formula: 'a^{m} \\cdot a^{n} = (\\underbrace{a \\cdots a}_{m}) \\times (\\underbrace{a \\cdots a}_{n})', explanation: 'By the definition, $a^{m}$ is $m$ copies of $a$ multiplied, and $a^{n}$ is $n$ copies.' },
            { label: 'Count the copies in the single product', formula: '= \\underbrace{a \\cdot a \\cdot \\ldots \\cdot a}_{m + n \\text{ copies}}', explanation: 'Multiplication of the two runs of copies is just one longer run: first the $m$ copies, then the $n$ copies — $m + n$ of them in all.' },
            { label: 'Recognise the definition again', formula: '= a^{m+n}', explanation: 'A product of $m + n$ copies of $a$ is, by the definition, exactly $a^{m+n}$. No algebra happened here — only counting.' },
          ],
          result: 'Multiplying powers of the same base adds the exponents: $a^{m} \\cdot a^{n} = a^{m+n}$.',
        },
        { kind: 'para', text: 'Read the proof once more and notice what it never used: commutativity of addition, distributivity, anything about what $a$ is. It used one fact — that multiplying a run of $m$ copies into a run of $n$ copies yields a run of $m + n$ copies — which is why the law works for *every* nonzero base, including negative ones, with no extra work. A verification at chosen numbers keeps us honest: $2^{2} \\cdot 2^{3} = 4 \\cdot 8 = 32$ and $2^{5} = 32$; $(-2)^{4} \\cdot (-2)^{3} = 16 \\cdot (-8) = -128$ and $(-2)^{7} = -128$. Same law, sign and all.' },
        { kind: 'figure', caption: 'The copies ledger: $a^{2}$ (two copies) times $a^{3}$ (three copies) stacks all five copies of $a$ into $a^{5}$ — the count adds, $2 + 3 = 5$.', svg: copiesLedgerSvg() },
        { kind: 'callout', tone: 'insight', title: 'The same counting shape as Lesson 1.2', text: 'Compare the two proofs. Lesson 1.2 proved the collection law $3x + 2x = 5x$ by counting copies of $x$ under *addition*: three copies plus two copies is five copies. This chapter proves the product law $a^{2} \\cdot a^{3} = a^{5}$ by counting copies of $a$ under *multiplication*: two copies times three copies is five copies. One counting move, two operations — which is why both laws feel inevitable once seen. The difference matters just as much: addition of copies requires the *same letter part* (like terms); multiplication of copies requires the *same base*. $3x + 2y$ stays apart, and so does $a^{2} \\cdot b^{3}$.' },
        { kind: 'para', text: 'The quotient law is the same argument run backwards. Take $a^{5}/a^{2}$: five copies on top, two copies below, and the two below cancel two of the five above — leaving three. So $a^{5}/a^{2} = a^{3}$, and the 3 came from $5 - 2$. In letters: $a^{m}/a^{n} = a^{m-n}$, provided $m > n$ so that the subtraction $m - n$ stays a genuine count of leftover copies. Check it: $2^{5}/2^{2} = 32/4 = 8 = 2^{3}$. The law works, and its whole content is cancellation.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the quotient law has a boundary, and it will matter', text: 'The moment $m \\le n$, the subtraction $m - n$ is no longer a count: $2^{2}/2^{5} = 4/32 = 1/8$, and no positive exponent says "one over eight copies". The classical school course simply forbids this case — our law table will carry the condition $m > n$ in brackets, exactly as the older texts do. But the honest reaction is curiosity, not avoidance: $1/8$ is a perfectly good number (ANS chapter 7 built it), and Lesson 2.2 will *repair* the exponent family until it can say $2^{-3} = 1/8$ with every old law still true. The boundary is next lesson\\u2019s doorway.' },
        {
          kind: 'derivation',
          title: 'The Power-of-a-Power Law — raising a power to a power',
          statement: 'For every base $a$ and positive exponents $m, n$: $(a^{m})^{n} = a^{mn}$.',
          steps: [
            { label: 'Read the outside exponent', formula: '(a^{m})^{n} = \\underbrace{a^{m} \\cdot a^{m} \\cdot \\ldots \\cdot a^{m}}_{n \\text{ copies of } a^{m}}', explanation: 'By the definition, $(a^{m})^{n}$ is $n$ copies of the quantity $a^{m}$, multiplied.' },
            { label: 'Count the inner copies in each block', formula: '= \\underbrace{(a \\cdots a)}_{m} \\cdot \\underbrace{(a \\cdots a)}_{m} \\cdots \\; (n \\text{ blocks})', explanation: 'Each of the $n$ blocks is itself $m$ copies of $a$ — a rectangle of copies, $n$ rows deep and $m$ copies across.' },
            { label: 'Count the whole rectangle', formula: '= \\underbrace{a \\cdot a \\cdot \\ldots \\cdot a}_{mn \\text{ copies}} = a^{mn}', explanation: 'The rectangle holds $n \\times m = mn$ copies of $a$ in one run — and that is $a^{mn}$ by the definition. Check: $(a^{3})^{4} = a^{12}$, and at $a = 2$: $8^{4} = 4096 = 2^{12}$. The exponent law *is* the multiplication table.' },
          ],
          result: 'Raising a power to a power multiplies the exponents: $(a^{m})^{n} = a^{mn}$.',
        },
        {
          kind: 'equation',
          latex: 'a^{m} \\cdot a^{n} = a^{m+n}, \\qquad \\frac{a^{m}}{a^{n}} = a^{m-n} \\;\\; (m > n), \\qquad (a^{m})^{n} = a^{mn}',
          note: 'the three laws of this lesson, proved from the definition — add, subtract, multiply: the exponent behaves like a ledger of copies',
        },
        {
          kind: 'table',
          caption: 'The law table — each law with its counting reason and a verified instance',
          head: ['Law', 'In letters', 'In words', 'Verified instance'],
          rows: [
            ['Product', '$a^{m} \\cdot a^{n} = a^{m+n}$', 'multiplying adds the copy counts', '$2^{2} \\cdot 2^{3} = 32 = 2^{5}$'],
            ['Quotient', '$\\dfrac{a^{m}}{a^{n}} = a^{m-n}$ ($m > n$)', 'cancellation removes copies pairwise', '$2^{5}/2^{2} = 8 = 2^{3}$'],
            ['Power of a power', '$(a^{m})^{n} = a^{mn}$', 'a rectangle of copies, $n$ by $m$', '$(2^{3})^{4} = 4096 = 2^{12}$'],
          ],
        },
        { kind: 'heading', text: 'Zero, One and Negative Bases: the Honest Cases' },
        { kind: 'para', text: 'The laws were proved with the base letter $a$, and the proofs never once asked whether $a$ was positive. That generality is worth cashing in carefully, case by case. **Base zero**: $0^{n} = 0$ for every positive $n$ — the first factor is already zero, so every product dies (verified for all $n$ from 1 to 20). **Base one**: $1^{n} = 1$ for every positive $n$ — ones multiply to ones. **Base $-1$**: $(-1)^{n}$ flips sign with the parity of $n$, giving $+1$ on even exponents and $-1$ on odd — the smallest possible sign alternation, and the seed of the next paragraph.' },
        { kind: 'para', text: 'One case is deliberately *not* defined: $0^{0}$. The definition needs at least one copy to multiply — with zero copies of zero there is no factor to read a value off, and no law of this chapter forces a value either. Some older textbooks casually write $0^{0} = 1$ as a convention; this course keeps the honest gap until a genuine reason appears. Nothing in school algebra ever needs it, and pretending otherwise is how conventions masquerade as theorems.' },
        { kind: 'para', text: '**Negative bases** are where students lose the most marks, so the pattern deserves its own figure. Compute $(-2)^{n}$ for $n = 1$ to $6$: the values run $-2, 4, -8, 16, -32, 64$. The magnitude follows the usual doubling; the *sign* alternates — positive on even exponents, negative on odd. The reason is pure sign arithmetic: each new copy of $-2$ multiplies the running value by $-2$, and multiplying by a negative flips the sign. Two flips in a row cancel, so parity is everything.' },
        { kind: 'figure', caption: 'The sign alternator: $(-2)^{n}$ for $n = 1$ to $6$ — the sign rides the parity of the exponent, positive on even, negative on odd.', svg: signAlternatorSvg() },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Theorem — the sign law for negative bases',
          text: 'For a positive base $a$ and positive exponent $n$: $(-a)^{n}$ is **positive** when $n$ is even and **negative** when $n$ is odd. The rule is verified for every $a$ in $1$ through $9$ and every $n$ in $1$ through $12$ — and its reason is one line long: each copy of $-a$ flips the sign, and $n$ flips cancel in pairs exactly when $n$ is even. Equivalently, $(-a)^{n} = a^{n}$ for even $n$ and $(-a)^{n} = -a^{n}$ for odd $n$.',
        },
        { kind: 'callout', tone: 'warn', title: 'Caution — brackets decide: (−2)² against −2²', text: 'Without brackets, the exponent binds to the number it touches: $-2^{2}$ means $-(2^{2}) = -4$, the negation applied *after* the power. With brackets, the base itself is negative: $(-2)^{2} = 4$. The two agree exactly when the exponent is odd ($(-2)^{3} = -8 = -2^{3}$) and disagree on every even exponent — a census over bases $1$ through $9$ and exponents $1$ through $12$ confirms 54 agreements (all odd) and 54 disagreements (all even). Lesson 1.3\\u2019s rule — negatives ride in brackets — is doing precise work here.' },
        { kind: 'heading', text: 'Exponent or Coefficient? the Contrast That Decides' },
        { kind: 'para', text: 'Lesson 1.1 staged the contrast $3a$ against $a^{3}$ (12 against 64 at $a = 4$); now we can say precisely why they differ. A **coefficient** multiplies — it is a number of copies *added*. An **exponent** counts copies *multiplied*. The two move a quantity at different speeds, which is why $2 \\cdot 3 = 6$ while $2^{3} = 8$, and why $5 \\cdot 2 = 10$ while $5^{2} = 25$. When an expression carries both ($3x^{4}$), read it as a partnership: 3 copies of $x^{4}$ — the coefficient answers "how many blocks", the exponent answers "how heavy is each block".' },
        { kind: 'para', text: 'The same reading explains the oldest trap in the book: the exponent does **not** distribute over addition. $(3 + 2)^{2} = 5^{2} = 25$, while $3^{2} + 2^{2} = 9 + 4 = 13$ — and Lesson 1.3\\u2019s lie-detector already swept the pair $(a + b)^{2}$ and $a^{2} + b^{2}$ over the grid $1$ through $10$ in each direction and found disagreement in all 100 cells. The missing piece is the cross-term $2 \\cdot 3 \\cdot 2 = 12$ (two of each pair, multiplied): $9 + 12 + 4 = 25$. Chapter 3 will expand $(a + b)^{2}$ properly with the distributive law; for now the census verdict stands — powers of a *sum* are not sums of powers.' },
        {
          kind: 'example',
          title: 'Simplify 2x³ · 3x⁴ and evaluate the result at x = 2',
          steps: [
            'Now, split each block into its number part and its letter part: $2x^{3} = 2 \\cdot x^{3}$ and $3x^{4} = 3 \\cdot x^{4}$.',
            'So, $2x^{3} \\cdot 3x^{4} = (2 \\cdot 3) \\cdot (x^{3} \\cdot x^{4})$ — numbers multiply with numbers, copies with copies.',
            'Hence the number part gives $2 \\cdot 3 = 6$ and the letter part gives $x^{3+4} = x^{7}$ by the product law: the answer is $6x^{7}$.',
            'Check, at $x = 2$: the original reads $(2 \\cdot 8) \\cdot (3 \\cdot 16) = 16 \\cdot 48 = 768$, and the simplified form reads $6 \\cdot 2^{7} = 6 \\cdot 128 = 768$. The two agree — the law did no damage.',
          ],
        },
        {
          kind: 'example',
          title: 'Show that (−2)⁴ · (−2)³ = (−2)⁷ and evaluate both sides',
          steps: [
            'Check the left side directly: $(-2)^{4} = 16$ (even exponent forgives) and $(-2)^{3} = -8$ (odd keeps the sign), so the product is $16 \\cdot (-8) = -128$.',
            'Now, the right side: $(-2)^{7}$ has an odd exponent, so it is negative; its magnitude is $2^{7} = 128$, giving $-128$.',
            'Hence both sides read $-128$ — the product law holds for negative bases exactly as proved, because the proof never asked about the sign of $a$.',
          ],
        },
        { kind: 'heading', text: 'Powers at Work: Growth That Compounds' },
        { kind: 'para', text: 'Why did arithmetic spend centuries developing this shorthand? Because repeated multiplication is how the world actually grows. A population that doubles every hour is a power of 2 in disguise; money at compound interest is a power of the growth factor; and the seat names of Foundation Mathematics 1.1 — thousand, lakh, crore — are the powers of ten wearing everyday clothes. The practical signature of a power is **compounding**: adding one to the exponent does not add a fixed amount, it multiplies the whole value by the base. The tower $2^{n}$ climbs $2, 4, 8, 16, 32, \\ldots$ — slowly at first, then unreasonably. By $n = 30$ the tower stands above a billion: $2^{30} = 1{,}073{,}741{,}824$, which is why a computer\\u2019s "gibibyte" (algebraically $2^{30}$ bytes) slightly overshadows the decimal "gigabyte" ($10^{9} = 1{,}000{,}000{,}000$ bytes) — the same exponent, different base, a real seven-percent gap. The same tower crushes $3^{13} = 1{,}594{,}323$ despite the larger base: thirty copies of 2 outweigh thirteen copies of 3.' },
        {
          kind: 'example',
          title: 'A culture of 5 bacteria doubles every hour: N(t) = 5 · 2ᵗ. Find N(6), and the first hour the count passes 1000',
          steps: [
            'Now, read the model: at hour $t$ the starting 5 has doubled $t$ times — $N(t) = 5 \\cdot 2^{t}$, a power with a rider.',
            'Take $t = 6$: $N(6) = 5 \\cdot 2^{6} = 5 \\cdot 64 = 320$ bacteria.',
            'Take $t = 7$: $N(7) = 5 \\cdot 128 = 640$ — still under 1000. Take $t = 8$: $N(8) = 5 \\cdot 256 = 1280$.',
            'Hence the count passes 1000 first at $t = 8$ hours — between the 7th and 8th doublings, exactly the compounding jump the tower diagram promised.',
          ],
        },
        { kind: 'para', text: 'A final teaser, verified by a full sweep rather than claimed on faith: compare $2^{n}$ with $n^{2}$ for every $n$ from 1 to 20. The census has three regimes. They *tie* at $n = 2$ ($4 = 4$) and $n = 4$ ($16 = 16$); the square wins exactly once, at $n = 3$ ($9 > 8$); and from $n = 5$ onward the power wins every single time — $32 > 25$, $64 > 36$, and the gap only ever widens. This is a miniature of one of mathematics\\u2019 deep patterns (exponential growth eventually outruns polynomial growth), and the pattern\\u2019s full story belongs to later books. What belongs here is the *method*: the census settled the question by checking every case, the same sweep discipline Lesson 1.1 used on the misreadings and this chapter\\u2019s verifier ran over 18 bases and 8 exponent pairs for each law.' },
        { kind: 'terms', items: [
          { term: 'Base', def: 'The number being copied in a power. In $a^{n}$ the base is $a$ — the quantity that appears $n$ times in the expanded product. In $(-2)^{5}$ the base is $-2$ (brackets make the whole signed number the base).' },
          { term: 'Exponent (index)', def: 'The count of copies in a power. In $a^{n}$ the exponent $n$ says how many copies of $a$ are multiplied. Older British texts — Hall and Knight\\u2019s among them — call it the index (plural: indices); the two names are interchangeable.' },
          { term: 'Power', def: 'The product of $n$ copies of a base: $a^{n}$. Read aloud as "the $n$-th power of $a$" or "$a$ to the $n$". The square ($n = 2$) and cube ($n = 3$) carry their geometric nicknames from area and volume.' },
          { term: 'First power', def: 'The exponent 1 changes nothing: $a^{1} = a$, one copy multiplied by nothing. The notation marks that no multiplication has happened yet.' },
          { term: 'Product law of exponents', def: 'Multiplying powers of the same base adds the exponents: $a^{m} \\cdot a^{n} = a^{m+n}$. Proved by counting copies — a run of $m$ copies times a run of $n$ copies is one run of $m + n$ copies.' },
          { term: 'Quotient law of exponents', def: 'Dividing powers of the same base subtracts the exponents: $a^{m}/a^{n} = a^{m-n}$, valid while $m > n$ so the difference remains a copy count. The $m \\le n$ case is the boundary Lesson 2.2 repairs.' },
          { term: 'Power-of-a-power law', def: 'Raising a power to a power multiplies the exponents: $(a^{m})^{n} = a^{mn}$ — a rectangle of copies, $n$ rows of $m$.' },
          { term: 'Sign law for negative bases', def: '$(-a)^{n}$ is positive when $n$ is even and negative when $n$ is odd — each copy of $-a$ flips the sign, and even counts of flips cancel. The law drives the whole parity table of Figure 2.' },
        ] },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The exponent laws are the most reliable marks in school algebra — *if* you respect their boundaries. The recurring examination traps, all priced in this lesson: multiplying the exponents on a product ($a^{4} \\cdot a^{3}$ is $a^{7}$, never $a^{12}$); treating a product of powers as like terms to collect ($2x^{3} \\cdot 3x^{4} = 6x^{7}$ by the product law, not $5x^{7}$ — coefficients multiply, they do not add); losing the brackets on negative bases ($(-3)^{2} = 9$ but $-3^{2} = -9$); and distributing an exponent over a sum ($(3+2)^{2} = 25$, never $13$). Competitive papers add the cascade forms — simplify $p^{7}/p^{4} \\cdot p^{2}$ left to right ($p^{5}$), or fold three factors $a^{5} \\cdot a^{3} \\cdot a = a^{9}$ — and expect the check-by-substitution habit this lesson ran on every illustration: evaluate the original and the simplified form at a chosen value; they must agree.' },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'Evaluate $2^{5}$.',
              options: ['32', '25', '10', '7'],
              answer: 0,
              explain: 'Five copies of 2 multiplied: $2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$. The distractors are the classic misreadings, each priced: 25 is $5^{2}$ (base and exponent swapped — $2^{3} = 8$ but $3^{2} = 9$, the swap is not harmless), 10 is $2 \\cdot 5$ (the exponent read as a multiplier), and 7 is $2 + 5$ (the exponent read as an addend). The exponent is a count of copies, not a factor.',
            },
            {
              q: 'Simplify $a^{4} \\cdot a^{3}$.',
              options: ['$a^{12}$', '$a^{7}$', '$2a^{7}$', '$a^{1}$'],
              answer: 1,
              explain: 'The product law adds the copy counts: $4 + 3 = 7$, so $a^{4} \\cdot a^{3} = a^{7}$. $a^{12}$ multiplied the exponents — that move belongs to the power-of-a-power law $(a^{4})^{3}$, not to a product of powers. $2a^{7}$ collected the powers like like terms (adding coefficients $1 + 1$) — collection is for sums $a^{4} + a^{3}$, which stay apart. $a^{1}$ subtracted $4 - 3$, the quotient-law move that belongs to division. At $a = 2$ the four options read 4096, 128, 256 and 2 — only $a^{7} = 128$ matches the original $16 \\cdot 8 = 128$.',
            },
            {
              q: 'Which of these equals $9$?',
              options: ['$-3^{2}$', '$(-3)^{2}$', '$(-3)^{3}$', '$-(-3)^{3}$'],
              answer: 1,
              explain: '$(-3)^{2} = (-3) \\cdot (-3) = 9$ — a negative base to an even exponent forgives the sign. The distractors: $-3^{2}$ means $-(3^{2}) = -9$ (without brackets the exponent binds to 3 first, the negation comes after); $(-3)^{3} = -27$ (odd exponent keeps the sign); $-(-3)^{3} = -(-27) = 27$ (the double negation flips it back positive but overshoots to twenty-seven).',
            },
            {
              q: 'Simplify $(a^{3})^{4}$.',
              options: ['$a^{7}$', '$4a^{3}$', '$a^{12}$', '$a^{1}$'],
              answer: 2,
              explain: 'The power-of-a-power law multiplies the exponents: $(a^{3})^{4} = a^{3 \\cdot 4} = a^{12}$ — four copies of $a^{3}$, a $4 \\times 3$ rectangle of copies of $a$. $a^{7}$ added the exponents (the product-law move); $4a^{3}$ pulled the outside exponent out as a coefficient (3 copies of a block, not 4 — and the block is $a^{3}$, not $a$); $a^{1}$ subtracted. At $a = 2$: the original is $8^{4} = 4096$, and $2^{12} = 4096$ confirms the law while 128, 32 and 2 expose the misreads.',
            },
            {
              q: 'The exponent does not distribute over addition: $(3 + 2)^{2}$ equals',
              options: ['13', '25', '36', '10'],
              answer: 1,
              explain: 'Brackets first (FM 2.8): $(3 + 2)^{2} = 5^{2} = 25$. The distractors are the three misreads: 13 is the distribute-everything error $3^{2} + 2^{2} = 9 + 4$ — it misses the cross term $2 \\cdot 3 \\cdot 2 = 12$ (and Lesson 1.3\\u2019s census showed the pair disagreeing in all 100 cells of the $[1..10]$ grid); 36 is $(3 \\cdot 2)^{2}$ — the plus quietly turned into a times; 10 is $2(3 + 2)$ — the exponent read as a multiplier of the sum.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 2.1',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Evaluate $3^{4}$, $2^{6}$ and $10^{3}$.',
                  solution: [
                    'Take $3^{4}$: four copies of 3 multiplied — $3 \\cdot 3 \\cdot 3 \\cdot 3 = 81$.',
                    'Take $2^{6}$: six copies of 2 — $2, 4, 8, 16, 32, 64$, so $2^{6} = 64$.',
                    'Take $10^{3}$: three copies of 10 — $10 \\cdot 10 \\cdot 10 = 1000$ (the thousands seat of place value).',
                  ],
                  answer: '$3^{4} = 81$, $2^{6} = 64$, $10^{3} = 1000$',
                },
                {
                  q: 'Evaluate $(-4)^{2}$ and $(-4)^{3}$.',
                  solution: [
                    'Take $(-4)^{2}$: two copies of $-4$ multiplied — $(-4) \\cdot (-4) = 16$ (the even exponent forgives the sign).',
                    'Take $(-4)^{3}$: three copies — $(-4) \\cdot (-4) \\cdot (-4) = 16 \\cdot (-4) = -64$ (the odd exponent keeps it).',
                    'Hence the pair shows the sign law on one base: even positive, odd negative.',
                  ],
                  answer: '$(-4)^{2} = 16$, $(-4)^{3} = -64$',
                },
                {
                  q: 'Evaluate $1^{7}$ and $0^{5}$.',
                  solution: [
                    'Take $1^{7}$: seven copies of 1 multiplied — ones never move the value: $1^{7} = 1$.',
                    'Take $0^{5}$: five copies of 0 — the first factor is already zero, so the product dies: $0^{5} = 0$.',
                    'So, both follow from the definition read literally — no rule to memorise.',
                  ],
                  answer: '$1^{7} = 1$, $0^{5} = 0$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Simplify $a^{6} \\cdot a^{2}$, then verify at $a = 2$.',
                  solution: [
                    'Split, by the product law: same base, so add the copy counts — $a^{6} \\cdot a^{2} = a^{6+2} = a^{8}$.',
                    'Check, at $a = 2$: the original reads $2^{6} \\cdot 2^{2} = 64 \\cdot 4 = 256$.',
                    'Now, the simplified form reads $2^{8} = 256$ — agreement, so the law did no damage.',
                  ],
                  answer: '$a^{8}$ (256 at $a = 2$, both sides)',
                },
                {
                  q: 'Simplify $\\dfrac{x^{5}}{x^{2}}$ ($x \\neq 0$), then verify at $x = 3$.',
                  solution: [
                    'Take the quotient law: five copies on top, two below cancel two above — $x^{5-2} = x^{3}$ (and $5 > 2$, so the condition holds).',
                    'Check, at $x = 3$: the original reads $3^{5}/3^{2} = 243/9 = 27$.',
                    'Hence the simplified form reads $3^{3} = 27$ — the cancellation removed exactly two copies.',
                  ],
                  answer: '$x^{3}$ (27 at $x = 3$, both sides)',
                },
                {
                  q: 'Simplify $(y^{2})^{5}$, then verify at $y = 2$.',
                  solution: [
                    'Take the power-of-a-power law: five copies of $y^{2}$ — a $5 \\times 2$ rectangle of copies of $y$ — so $(y^{2})^{5} = y^{2 \\cdot 5} = y^{10}$.',
                    'Check, at $y = 2$: the original reads $4^{5} = 1024$.',
                    'Now, the simplified form reads $2^{10} = 1024$ — the rectangle held exactly a thousand and twenty-four copies.',
                  ],
                  answer: '$y^{10}$ (1024 at $y = 2$, both sides)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Simplify $2x^{3} \\cdot 3x^{4}$ and evaluate the result at $x = 2$.',
                  solution: [
                    'Split, into number parts and letter parts: $(2 \\cdot 3) \\cdot (x^{3} \\cdot x^{4})$.',
                    'So, the numbers multiply to 6 and the letters fold by the product law to $x^{7}$: the result is $6x^{7}$.',
                    'Check, at $x = 2$: the original reads $(2 \\cdot 8) \\cdot (3 \\cdot 16) = 16 \\cdot 48 = 768$, and $6 \\cdot 2^{7} = 6 \\cdot 128 = 768$.',
                  ],
                  answer: '$6x^{7}$ (768 at $x = 2$, both sides)',
                },
                {
                  q: 'Simplify $a^{5} \\cdot a^{3} \\cdot a$.',
                  solution: [
                    'Now, three factors with the same base — fold them in one sweep: the exponents add, $5 + 3 + 1$.',
                    'Take care with the last factor: $a$ is $a^{1}$ (one copy), so the sum is $5 + 3 + 1 = 9$ and the result is $a^{9}$.',
                    'Check, at $a = 2$: $32 \\cdot 8 \\cdot 2 = 512$, and $2^{9} = 512$ — the product law chains without extra steps.',
                  ],
                  answer: '$a^{9}$ (512 at $a = 2$, both sides)',
                },
                {
                  q: 'Simplify $\\dfrac{p^{7}}{p^{4}} \\cdot p^{2}$ ($p \\neq 0$), then verify at $p = 2$.',
                  solution: [
                    'Split, left to right (the tree of Lesson 1.2): the division settles first — $p^{7-4} = p^{3}$.',
                    'So, the expression is $p^{3} \\cdot p^{2}$, and the product law folds it to $p^{3+2} = p^{5}$.',
                    'Check, at $p = 2$: the original reads $128/16 \\cdot 4 = 8 \\cdot 4 = 32$, and $2^{5} = 32$.',
                    'Hence the order mattered: dividing first, then multiplying — $p^{5}$, not $p^{7-4-2} = p$.',
                  ],
                  answer: '$p^{5}$ (32 at $p = 2$, both sides)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Show that $(-2)^{4} \\cdot (-2)^{3} = (-2)^{7}$ and evaluate both sides.',
                  solution: [
                    'Take the left side by the sign law: $(-2)^{4} = 16$ (even) and $(-2)^{3} = -8$ (odd), so the product is $16 \\cdot (-8) = -128$.',
                    'Now, the right side: $(-2)^{7}$ is odd, so negative, with magnitude $2^{7} = 128$ — the value $-128$.',
                    'Hence both sides read $-128$: the product law extended to a negative base untouched, because its proof only counted copies.',
                  ],
                  answer: '$(-2)^{4} \\cdot (-2)^{3} = (-2)^{7} = -128$',
                },
                {
                  q: 'A culture of 5 bacteria doubles every hour, so its count is $N(t) = 5 \\cdot 2^{t}$ at hour $t$. Find $N(6)$, and find the first hour the count passes 1000.',
                  solution: [
                    'Take $t = 6$: $N(6) = 5 \\cdot 2^{6} = 5 \\cdot 64 = 320$ bacteria.',
                    'Now, walk the tower forward: $N(7) = 5 \\cdot 128 = 640$ — still short of 1000.',
                    'Take $t = 8$: $N(8) = 5 \\cdot 256 = 1280$ — past it.',
                    'Hence the count first exceeds 1000 at hour 8 — one doubling turned 640 into 1280, the compounding jump.',
                  ],
                  answer: '$N(6) = 320$; the count first passes 1000 at $t = 8$',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Simplify $((a^{2})^{3})^{2}$ and $a^{2} \\cdot (a^{3})^{2}$. Are the results equal?',
                  solution: [
                    'Take the first expression from the inside out: $(a^{2})^{3} = a^{6}$, then $(a^{6})^{2} = a^{12}$.',
                    'Take the second by the power-of-a-power law inside and the product law outside: $(a^{3})^{2} = a^{6}$, so $a^{2} \\cdot a^{6} = a^{8}$.',
                    'So, the results are $a^{12}$ and $a^{8}$ — different expressions, and the letters confirm it: towers multiply exponents, products add them.',
                    'Check, at $a = 2$: the first reads $4096$ and the second reads $256$ — no accidental agreement.',
                  ],
                  answer: '$((a^{2})^{3})^{2} = a^{12}$ and $a^{2} \\cdot (a^{3})^{2} = a^{8}$ — not equal',
                },
                {
                  q: 'Which is larger: $2^{30}$ or $3^{13}$? And which is larger: $2^{30}$ or $10^{9}$?',
                  solution: [
                    'Compute $2^{30}$ by repeated doubling: $2^{10} = 1024$, so $2^{30} = 1024^{3} = 1{,}073{,}741{,}824$.',
                    'Now, $3^{13}$: $3^{2} = 9$, $3^{4} = 81$, $3^{8} = 6561$, so $3^{13} = 3^{8} \\cdot 3^{4} \\cdot 3 = 6561 \\cdot 81 \\cdot 3 = 1{,}594{,}323$.',
                    'Take the second pair: $10^{9} = 1{,}000{,}000{,}000$, and $1{,}073{,}741{,}824 > 1{,}000{,}000{,}000$.',
                    'Hence $2^{30}$ wins both comparisons — thirty copies of 2 outweigh thirteen copies of 3 and also edge past a decimal billion (the gibibyte-over-gigabyte gap of the prose).',
                  ],
                  answer: '$2^{30} > 3^{13}$ and $2^{30} > 10^{9}$ ($1{,}073{,}741{,}824$ beats $1{,}594{,}323$ and $1{,}000{,}000{,}000$)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Compare $2^{n}$ with $n^{2}$ for every $n$ from 1 to 20, and state the full census: where they tie, where the square wins, and from where the power wins forever.',
                  solution: [
                    'Sweep, every $n$ from 1 to 20, computing both sides: $n = 1$: $2 > 1$; $n = 2$: $4 = 4$ (tie); $n = 3$: $8 < 9$ (the square wins — the only loss); $n = 4$: $16 = 16$ (tie again).',
                    'Now, from $n = 5$ onward the power wins every case: $32 > 25$, $64 > 36$, $128 > 49$, $256 > 64$, and onward to $2^{20} = 1{,}048{,}576$ against $400$.',
                    'So, the census has three regimes: ties at $n = 2$ and $n = 4$, one loss at $n = 3$, wins from $n = 5$ to $20$.',
                    'Hence the pattern is a miniature of exponential-versus-polynomial growth: each step multiplies $2^{n}$ by 2 but adds only a shrinking sliver to $n^{2}$ — the gap from $n$ to $n+1$ on the square side is $2n + 1$, while the power side doubles. The full story of that divergence belongs to later books; the census method belongs here.',
                  ],
                  answer: 'ties at $n = 2, 4$; the square wins only at $n = 3$; $2^{n} > n^{2}$ for every $n \\ge 5$',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'The definition of a power', latex: 'a^{n} = \\underbrace{a \\cdot a \\cdot \\cdots \\cdot a}_{n \\text{ copies}}', note: 'the exponent counts copies of the base — $a^{1} = a$, and $0^{0}$ stays undefined in this course' },
        {
          kind: 'formula',
          name: 'The three exponent laws',
          latex: 'a^{m} \\cdot a^{n} = a^{m+n}, \\qquad \\frac{a^{m}}{a^{n}} = a^{m-n} \\; (m > n), \\qquad (a^{m})^{n} = a^{mn}',
          note: 'add on multiplication, subtract on division, multiply on towers — every law proved by counting copies, all valid for any nonzero base',
        },
      ],
    },
    {
      id: 'al-zero-and-negative-exponents-another-repair',
      number: '2.2',
      title: 'Zero and Negative Exponents: Another Repair',
      concepts: [
        'the zero exponent repair',
        'negative exponents as reciprocals',
        'the permanence principle',
        'the extended exponent laws',
        'the flip rule across the fraction bar',
        'the base-zero boundary',
        'the closure-repair discipline',
        'the quotient law completed',
      ],
      objectives: [
        'say precisely where the exponent family of 2.1 breaks, and why those breaks are diseases not flaws',
        'derive x⁰ = 1 from the laws rather than accept it as a convention — and name the two routes that agree',
        'derive x⁻ⁿ = 1/xⁿ from the repaired zero exponent, and move factors across a fraction bar both directions',
        'verify that every law of 2.1 survives the extension, and evaluate expressions over all integer exponents',
        'state the base-zero boundary honestly — which derivations die at zero, and why no repair can save them',
      ],
      prerequisites: ['al-powers-and-the-laws-of-exponents', 'ans-closure-failures-that-force-extension'],
      sources: ['hall-knight-elementary-algebra', 'hankel-1867-permanence', 'peacock-1833-permanence', 'ncert-math8-ch10-exponents'],
      blocks: [
        { kind: 'para', text: 'Lesson 2.1 ended with a boundary line in its own law table: the quotient law $a^{m}/a^{n} = a^{m-n}$ works only while $m > n$, because $m - n$ must remain a count of copies. But arithmetic refuses to stay inside the boundary. Compute $2^{2}/2^{5}$ and the answer is a perfectly respectable number, $4/32 = 1/8$ — a fraction ANS chapter 7 built the whole rational system to hold. The exponent language simply cannot say it yet: $2 - 5 = -3$, and $-3$ is not a count. This lesson performs the repair, and the repair is not invented here — it is the *third* rung of a ladder this book series has been climbing since ANS chapter 6.' },
        { kind: 'para', text: 'The pattern will feel familiar. The natural numbers could not answer $4 - 9$, so the integers were built (ANS ch. 6) — new answers for dead questions, old numbers untouched, old laws alive. The integers could not answer $3 \\div 5$, so the rationals were built (ANS ch. 7) under the same charter. Now the exponent family cannot answer $2^{-3}$, and the same surgery is performed on it: **zero exponents and negative exponents are defined so that every law of Lesson 2.1 survives**. Nothing is arbitrary; every new meaning is *forced* — this lesson derives each one twice, from two independent routes that must agree.' },
        { kind: 'heading', text: 'The Disease: Where the Exponent Family Breaks' },
        { kind: 'para', text: 'Two dead spots need naming before any medicine. **Dead spot one**: the exponent zero. The definition of Lesson 2.1 needs at least one copy to multiply — "zero copies of $a$" multiplies to nothing readable, so $a^{0}$ has no meaning under the definition. Place value (FM 1.1) flashed $10^{0} = 1$ for the ones seat, but that lesson borrowed the symbol on credit; nothing in the definition repaid it. **Dead spot two**: negative exponents. For $a^{m}/a^{n}$ with $m < n$, the exponent $m - n$ goes negative, and no run of "$-3$ copies" can be multiplied. The disease is real, but so is the medicine — and the charter of ANS 6.1 states exactly what good medicine must do.' },
        { kind: 'callout', tone: 'insight', title: 'The repair charter (the permanence principle)', text: 'ANS chapter 6 named the four clauses every honest extension must satisfy — Peacock called it the principle of the permanence of equivalent forms (1830s), Hankel restated it in 1867: **(i)** new answers for dead questions (the extension may only fill gaps, never relabel old ground); **(ii)** old numbers unchanged (every positive exponent keeps its exact old value); **(iii)** old laws alive (the product, quotient and power-of-a-power laws keep working); **(iv)** no new failures (the extension must not break arithmetic that already worked). The extension-ladder discipline — ℕ to ℤ to ℚ — ran on precisely this charter, and Lesson 2.2 runs on it too. A definition that violated any clause would be refused, however convenient.' },
        { kind: 'para', text: 'One more discipline before the surgery: the repair must be *derived*, not decreed. It would be easy to announce "$a^{0} = 1$ because we say so" — school books sometimes do — but that is a convention wearing a theorem’s clothes. The honest route asks: *what must* $a^{0}$ *equal if the laws of 2.1 are to keep working?* The laws themselves pin the answer, with no room to choose.' },
        { kind: 'heading', text: 'Repairing the Zero Exponent' },
        { kind: 'para', text: 'Demand that the product law survive the exponent 0: whatever $a^{0}$ means, the statement $a^{0} \\cdot a^{n} = a^{0+n} = a^{n}$ must hold for every $n$. So $a^{0}$ is a quantity which, multiplied by anything, leaves that anything unchanged — and Lesson 1.1’s field laws named the unique quantity with that property: the multiplicative identity, 1. There is no second candidate. (Test one: if $v$ claimed to be $a^{0}$, then $v \\cdot a = a$ at $n = 1$ forces $v = 1$; the candidate $v = 2$ fails on the very first exponent, since $2 \\cdot a \\neq a$.)' },
        {
          kind: 'derivation',
          title: 'The zero exponent, forced two ways',
          statement: 'For every nonzero base $a$: $a^{0} = 1$.',
          steps: [
            { label: 'Route one — the product law', formula: 'a^{0} \\cdot a^{n} = a^{0+n} = a^{n} \\quad \\Longrightarrow \\quad a^{0} = 1', explanation: 'The product law must keep working. Multiplying by $a^{0}$ changes nothing, and the only number that multiplies without changing is the identity 1 — the field laws (ANS 7.2) guarantee it is unique.' },
            { label: 'Route two — the quotient law', formula: '\\frac{a^{n}}{a^{n}} = a^{n-n} = a^{0} \\quad \\text{and} \\quad \\frac{a^{n}}{a^{n}} = 1', explanation: 'Any number divided by itself is 1. The quotient law computes the same quotient as $a^{n-n} = a^{0}$. Two routes, one answer: $a^{0} = 1$.' },
            { label: 'Agreement is the certificate', formula: 'a^{0} = 1 \\quad \\text{for every } a \\neq 0', explanation: 'The two routes are independent — one reads the product law, the other reads self-division — and they agree exactly. That agreement is what makes the definition a theorem rather than a convention.' },
          ],
          result: 'Every nonzero base to the power zero equals 1: $a^{0} = 1$ ($a \\neq 0$), forced by the laws, not chosen by us.',
        },
        {
          kind: 'equation',
          latex: 'a^{0} = 1 \\qquad (a \\neq 0)',
          note: 'the ones seat of place value (FM 1.1) finally paid for: $10^{0} = 1$ was this theorem all along',
        },
        { kind: 'para', text: 'The checks run instantly: $5^{0} = 1$, $(-3)^{0} = 1$, $1^{0} = 1$, $\\left(\\tfrac{2}{3}\\right)^{0} = 1$ — every nonzero base collapses to the identity. And the pattern FM 1.1 used silently now stands explained: $10^{3} = 1000$, $10^{2} = 100$, $10^{1} = 10$, $10^{0} = 1$ — each step down the seats divides by ten, and the ones seat is where the dividing stops. The base-zero case stays excluded, and the derivation shows exactly why: route two divides $a^{n}$ by itself, and at $a = 0$ that reads $0/0$ — the division ANS chapter 7 refused to define. The repair needs a working division to run; zero base has none.' },
        {
          kind: 'table',
          caption: 'The before/after ledger — every meaning the repair changed, and the clause that forced it',
          head: ['Expression', 'Before this lesson', 'After the repair', 'What forced it'],
          rows: [
            ['$a^{0}$ ($a \\neq 0$)', 'unspeakable — the definition needs a copy', '$1$, for every nonzero base', 'the product law (identity preserved) + the quotient law ($a^{n}/a^{n}$)'],
            ['$a^{-n}$ ($a \\neq 0$)', 'unspeakable — $m - n$ was not a count', '$1/a^{n}$, the reciprocal', 'the product law against $a^{0} = 1$ (reciprocal unique, ANS 7.2)'],
            ['$2^{2}/2^{5}$', 'computable ($1/8$) but unsayable in exponents', '$2^{-3}$ — the quotient law says it directly', 'clause (iii): old laws alive over the new exponents'],
            ['$0^{n}$, $n \\ge 1$', '$0$', '$0$ — unchanged', 'clause (ii): old numbers never move'],
            ['$0^{0}$, $0^{-n}$', '— (no case)', 'still undefined — the honest boundary', 'the derivations die: $0/0$ and $1/0$'],
          ],
        },
        { kind: 'heading', text: 'Repairing the Negative Exponents' },
        { kind: 'para', text: 'With $a^{0} = 1$ banked, the negative exponents fall to the same squeeze. Demand that the product law survive exponent $-n$: the statement $a^{-n} \\cdot a^{n} = a^{-n+n} = a^{0} = 1$ must hold. So $a^{-n}$ is the quantity which multiplied by $a^{n}$ gives 1 — and ANS chapter 7 named the unique quantity with that property: the **reciprocal** $1/a^{n}$. Again there is no second candidate, and again the derivation can be run a second way: the quotient law demands $a^{n}/a^{n+1} = a^{-1}$, while direct cancellation of the fraction gives $a^{n}/a^{n+1} = 1/a$ — agreement.' },
        {
          kind: 'derivation',
          title: 'The negative exponent, forced',
          statement: 'For every nonzero base $a$ and positive $n$: $a^{-n} = 1/a^{n}$.',
          steps: [
            { label: 'Read the product law across the new exponent', formula: 'a^{-n} \\cdot a^{n} = a^{-n+n} = a^{0} = 1', explanation: 'The repaired zero exponent joins the product law: the two exponents cancel through addition, landing on the identity.' },
            { label: 'Recognise the reciprocal', formula: 'a^{-n} = \\frac{1}{a^{n}}', explanation: 'A quantity which multiplied by $a^{n}$ yields 1 is, by definition, the reciprocal of $a^{n}$ — and ANS 7.2 proves reciprocals unique. No choice remains.' },
            { label: 'Cross-check by the quotient law', formula: '\\frac{a^{m}}{a^{n}} = a^{m-n} \\quad \\text{now works for EVERY } m, n', explanation: 'With negative exponents defined, the subtraction $m - n$ is always a legal exponent — the $m > n$ restriction of Lesson 2.1 dissolves entirely. The disease is cured at its own door.' },
          ],
          result: 'Negative exponents are reciprocals: $a^{-n} = 1/a^{n}$ ($a \\neq 0$) — and the quotient law now holds for every pair of integer exponents.',
        },
        {
          kind: 'equation',
          latex: 'a^{-n} = \\frac{1}{a^{n}} \\qquad (a \\neq 0, \\; n = 1, 2, 3, \\ldots)',
          note: 'the negative exponent is not a sign — it is an instruction to reciprocate; $2^{-3} = 1/8$ finally says what $2^{2}/2^{5}$ computed',
        },
        { kind: 'para', text: 'The reading skill matters more than the symbol: $2^{-3} = 1/2^{3} = 1/8$ — the negative exponent does **not** make the value negative (that misread gives $-8$; the true value is a positive $	frac{1}{8}$). The exponent’s sign says which *side of the fraction bar* the copying happens on, nothing about the value’s sign. And the sign law of Lesson 2.1 rides straight through the bar: $(-2)^{-2} = 1/(-2)^{2} = 1/4$ (even exponent forgives), $(-2)^{-3} = 1/(-2)^{3} = -	frac{1}{8}$ (odd exponent keeps the sign).' },
        {
          kind: 'example',
          title: 'Simplify x⁵/x⁹ (x ≠ 0), then verify at x = 2 — the case Lesson 2.1 had to refuse',
          steps: [
            'Take the quotient law, now unrestricted: $x^{5}/x^{9} = x^{5-9} = x^{-4}$ — the subtraction 5 − 9 is finally a legal exponent.',
            'Now, translate to the positive-exponent form by the repair: $x^{-4} = 1/x^{4}$.',
            'Check, at $x = 2$: the original reads $2^{5}/2^{9} = 32/512 = 1/16$, and the repaired form reads $2^{-4} = 1/16$ — agreement, exactly where the old law table said "$m > n$" and stopped.',
          ],
        },
        { kind: 'heading', text: 'Every Old Law Survives: the Permanence Test' },
        { kind: 'para', text: 'A repair is only as good as its audit. The charter’s third and fourth clauses demand that every law of Lesson 2.1 keep working over the *extended* family — so the honest response is the sweep discipline: check all three laws over a full grid of integer exponents, with every value computed as an exact fraction. This chapter’s verifier did precisely that: ten nonzero bases (positive and negative, $\\pm 1$ through $\\pm 7$) crossed with every exponent pair $m, n$ from $-6$ to $6$ — 169 pairs — and all three laws checked on each: $5{,}070$ exact-fraction checks, zero failures. Base zero is excluded *by design*; the sweep asserts its own exclusion, because the repair never claims it.' },
        { kind: 'para', text: 'The result deserves its own law table, because it *is* a new law table: every restriction of Lesson 2.1 has dissolved. Read the middle column against 2.1’s — the conditions in brackets are gone.' },
        {
          kind: 'table',
          caption: 'The extended law table — the same three laws over all integer exponents (base nonzero)',
          head: ['Law', 'Lesson 2.1 said', 'Now it says', 'Verified instance'],
          rows: [
            ['Product', '$a^{m} \\cdot a^{n} = a^{m+n}$', '$a^{m} \\cdot a^{n} = a^{m+n}$, every integer $m, n$', '$2^{-3} \\cdot 2^{7} = 2^{4} = 16$'],
            ['Quotient', '$a^{m}/a^{n} = a^{m-n}$ ($m > n$)', '$a^{m}/a^{n} = a^{m-n}$, every integer $m, n$', '$x^{5}/x^{9} = x^{-4} = 1/x^{4}$'],
            ['Power of a power', '$(a^{m})^{n} = a^{mn}$', '$(a^{m})^{n} = a^{mn}$, every integer $m, n$', '$(2^{-1})^{-3} = 2^{3} = 8$'],
          ],
        },
        { kind: 'para', text: 'The tower law deserves a second look, because negative exponents give it a new talent: $(2^{-1})^{-3} = 2^{(-1)\\cdot(-3)} = 2^{3} = 8$. Reading it: one half, reciprocated three times, rebuilds eight eighths — the algebra says $8$ and direct arithmetic agrees ($\\left(\\tfrac{1}{2}\\right)^{-3} = 1/(\\tfrac{1}{2})^{3} = 1/\\tfrac{1}{8} = 8$). A negative exponent in a tower flips the quantity; a second negative flips it back. Two negatives multiply to a positive, exactly as the sign rules of FM chapter 7 always said — the permanence charter keeps even the *grammar* consistent.' },
        {
          kind: 'example',
          title: 'Simplify (x⁻²y³)⁻² and verify at x = 2, y = 3 — a mixed letter expression over the extended laws',
          steps: [
            'Take the tower law factor by factor: $(x^{-2}y^{3})^{-2} = (x^{-2})^{-2} \\cdot (y^{3})^{-2} = x^{4} \\cdot y^{-6}$.',
            'Now, translate to positive-exponent form: $x^{4}y^{-6} = x^{4}/y^{6}$ — the $y$ part reciprocates, the $x$ part does not.',
            'Check, at $x = 2$, $y = 3$: the original reads $(\\tfrac{9}{4})^{-2} = \\tfrac{16}{729}$ (the negative exponent flips the fraction $9/4$), and the repaired form reads $16/729$ — agreement, exact.',
          ],
        },
        { kind: 'para', text: 'The daily working form of the repair is the **flip rule**: a factor with a negative exponent moves across the fraction bar and its exponent turns positive. $1/x^{-5} = x^{5}$ — the $x^{-5}$ sat under the bar, so it comes up rewritten as $x^{5}$. And a fraction built of two negative exponents inverts outright: $x^{-2}/y^{-3} = y^{3}/x^{2}$. Neither move is a trick to memorise; each is the definition $a^{-n} = 1/a^{n}$ applied twice, and the verifier swept both across explicit grids (bases $2, 3, 5, 7$ for the bar hop; the bases $2$, $3$ and $5$ for the inversion with exponents to 4 for the inversion) with zero failures.' },
        { kind: 'figure', caption: 'The extension ladder: the exponent family before the repair (positive counts, restricted quotient law) and after (all integer exponents, every law alive, zero honestly excluded).', svg: extensionLadderSvg() },
        { kind: 'figure', caption: 'The fraction-bar flip map: negative exponents move factors across the bar and turn positive — the one working habit the repair asks you to build.', svg: flipMapSvg() },
        { kind: 'callout', tone: 'warn', title: 'Caution — the three negative-exponent misreads, priced', text: 'The repair’s grammar attracts three predictable misreads. **Sign slip**: $3^{-2} = 1/9$, never $-9$ — the exponent’s sign commands reciprocation, not negation. **Double slip**: $-1/9$ would need a *negative value* reciprocated — the base is positive, so nothing turns negative. **Bar amnesia**: $2^{-3} \\cdot 2^{5}$ is $2^{2} = 4$ by the product law (the exponents add, $-3 + 5 = 2$), not $1/8$ — students see the negative exponent and reciprocate *the whole product* out of habit. The sweep-priced quiz below catches all three; each has been worth real marks in real papers.' },
        { kind: 'heading', text: 'The Boundary No Repair Crosses: Zero' },
        { kind: 'para', text: 'Every clause of the charter is now honoured but one base, and the exclusion is not prudishness — it is the charter’s own machinery refusing. Walk the derivations at $a = 0$ and watch each die. Route two of the zero-exponent derivation needs $0^{n}/0^{n}$, which reads $0/0$ — the quotient ANS chapter 7 explicitly declined to define (its verification script *rejects* zero denominators, and so does this book’s fraction class). Route one of the negative-exponent derivation needs $1/0^{n} = 1/0$ — no fraction, same refusal. Meanwhile $0^{n} = 0$ keeps its positive-exponent value unchanged (clause (ii) holds for the bases it can hold for). The extension simply has no purchase where division by zero blocks the door.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — why "just define 0⁰ = 1" is refused here', text: 'Some references set $0^{0} = 1$ as a convention (combinatorics finds an empty product handy, and some programming languages return 1). The convention is not *false* — it is *unforced*: no law of arithmetic requires it at the zero base, and at least one honest obstruction (the quotient route $0^{n}/0^{n}$) dies before the question can even be asked. This course states the boundary rather than papering over it: $a^{0} = 1$ and $a^{-n} = 1/a^{n}$ **for every nonzero base**, and the zero base keeps only its positive exponents. An examination asking "which has no defined value?" is testing exactly this line — $5^{0}$, $2^{-2}$, $1^{-3}$ all live; $0^{-2}$ does not.' },
        {
          kind: 'example',
          title: 'A signal fades to half every 3 hours: N(t) = 100 · 2⁻ᵗ/³. Read N(0) and N(12)',
          steps: [
            'Take $t = 0$: the exponent is $0/3 = 0$, so $N(0) = 100 \\cdot 2^{0} = 100 \\cdot 1 = 100$ — the repair at work: zero exponent means the starting value, not zero signal.',
            'Now, $t = 12$: the exponent is $-12/3 = -4$, so $N(12) = 100 \\cdot 2^{-4} = 100/16 = 25/4 = 6.25$.',
            'Hence the negative exponent rode the fraction bar twice (once in the exponent, once into the value) and the decay model stays exact: 100 down to 6.25 over four halvings.',
          ],
        },
        { kind: 'heading', text: 'Another Repair, the Same Ladder' },
        { kind: 'para', text: 'Step back and see the ladder whole. ANS chapter 6 repaired subtraction with the integers; ANS chapter 7 repaired division with the rationals; this lesson repaired the quotient law with zero and negative exponents. Three repairs, one charter — new answers for dead questions, old numbers unchanged, old laws alive, no new failures — and each repair *tightened* the algebra it entered: subtraction became total, division became total, and now the exponent laws became unconditional. The classical texts felt the same pressure: Hall and Knight’s chapter on indices proves the positive-exponent laws first and then requires the zero, negative and fractional indices "to be governed by the same laws" — the permanence principle in full 1885 dress. (Fractional indices — $a^{1/2}$ as the square root — are the ladder’s next rung, and they wait for a later course where roots can be defined honestly.)' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the permanence principle', text: 'Peacock stated the principle of the permanence of equivalent forms in the 1830s (his *Algebra* argued that the laws of ordinary arithmetic should remain in force for the extended symbols), and Hankel sharpened it in 1867 into the permanence principle this series quotes: extensions of a number system may introduce new answers, but must preserve the old laws. The zero and negative exponents are the principle’s cleanest school-level illustration — the laws *force* $a^{0} = 1$ and $a^{-n} = 1/a^{n}$ on any nonzero base, leaving nothing to taste. ANS chapter 6 carried the same principle through the integers; it will carry the complex numbers two books from now.' },
        { kind: 'para', text: 'The payoff for the repair arrives immediately. With negative exponents available, numbers grotesquely small stop being grotesque: $0.000{,}000{,}0207$ becomes $2.07 \\times 10^{-8}$ — one line, every digit significant, the exponent carrying the decimal journey. That is **scientific notation**, and it pays the whole practical bill of this chapter; Lesson 2.3 collects. First, the summary of what this lesson banked.' },
        { kind: 'terms', items: [
          { term: 'Zero exponent', def: '$a^{0} = 1$ for every nonzero base — forced by the product law (identity preserved) and the quotient law ($a^{n}/a^{n}$), not chosen as a convention. The ones seat of place value was this theorem on credit.' },
          { term: 'Negative exponent', def: '$a^{-n} = 1/a^{n}$ for every nonzero base — the exponent’s sign commands reciprocation across the fraction bar, never negation of the value. $2^{-3} = 1/8$, a positive quantity.' },
          { term: 'Reciprocal', def: 'The unique quantity that multiplies a given nonzero quantity to 1 (ANS 7.2). The negative exponent *is* a reciprocal instruction: $a^{-n}$ is the reciprocal of $a^{n}$.' },
          { term: 'Permanence principle', def: 'The extension charter — new answers for dead questions, old numbers unchanged, old laws alive, no new failures. Peacock (1830s) and Hankel (1867) named it; ANS ch. 6 applied it to the integers; this lesson applies it to the exponents.' },
          { term: 'Closure repair', def: 'A surgery that enlarges a family precisely to cure a stated failure. The quotient law’s $m > n$ restriction was the disease; zero and negative exponents are the cure; the swept law table is the post-operative audit.' },
          { term: 'Extended law table', def: 'The three exponent laws restated over all integer exponents with every restriction dissolved — product, quotient and tower laws now unconditional for nonzero bases (5,070 Frac-exact sweep checks, zero failures).' },
          { term: 'Flip rule', def: 'The working habit the repair builds: a factor with a negative exponent crosses the fraction bar and its exponent turns positive — $1/x^{-5} = x^{5}$, $x^{-2}/y^{-3} = y^{3}/x^{2}$.' },
          { term: 'Base-zero boundary', def: '$0^{0}$ and $0^{-n}$ stay undefined — the derivations need $0/0$ and $1/0$, the two divisions ANS ch. 7 declined. The positive exponents of zero ($0^{n} = 0$) are unchanged.' },
        ] },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Zero and negative exponents are pure mark-scoring territory once the two derivations are owned — every examination question is one of: evaluate ($5^{0} = 1$, $3^{-2} = 1/9$, $(-2)^{-3} = -1/8$ — the sign law survives the bar); rewrite with positive exponents ($x^{-5} = 1/x^{5}$); simplify a cascade left to right ($a^{-2} \\cdot a^{5}/a^{-3} = a^{6}$ — the exponents add across the whole chain, $-2 + 5 + 3$); or catch the misread (the quiz’s sign-slip, double-slip and bar-amnesia traps, each priced). The boundary question — "which expression has no defined value?" — separates candidates who memorised $a^{0} = 1$ from those who know its $a \\neq 0$ clause. Competitive papers add the mixed forms: $(x^{-2}y^{3})^{-2} = x^{4}/y^{6}$, and the flip-rule inversions $3^{-2}/4^{-2} = 16/9$. The check-by-substitution habit still rules: every simplified form was evaluated against its original at a chosen value in this lesson’s illustrations.' },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'Evaluate $5^{0}$.',
              options: ['0', '1', '5', 'undefined — no value'],
              answer: 1,
              explain: 'The repair forces $a^{0} = 1$ for every nonzero base: the product law needs $5^{0} \\cdot 5^{n} = 5^{n}$, and only 1 multiplies without changing. 0 is the zero-power misread (that would make $5^{0} \\cdot 5 = 0 \\neq 5$ — the product law would die); 5 ignores the exponent; and "undefined" was the honest pre-repair answer, but this lesson *derived* the value, so it is defined. Note the clause: base 5 is nonzero, so the boundary never bites here.',
            },
            {
              q: 'Evaluate $3^{-2}$.',
              options: ['$-9$', '$9$', '$\\tfrac{1}{9}$', '$-\\tfrac{1}{9}$'],
              answer: 2,
              explain: 'The negative exponent reciprocates, it does not negate: $3^{-2} = 1/3^{2} = 1/9$. $-9$ is the sign slip (the exponent’s sign commands the fraction bar, not the value’s sign); $9$ ignores the minus entirely; $-\\tfrac{1}{9}$ double-slips (reciprocating *and* negating, neither commanded). The true value is a positive quantity smaller than 1.',
            },
            {
              q: '$x^{-5}$ rewritten with a positive exponent is',
              options: ['$-x^{5}$', '$\\dfrac{1}{x^{5}}$', '$-\\dfrac{1}{x^{5}}$', '$x^{5}$'],
              answer: 1,
              explain: 'By the repair, $x^{-5} = 1/x^{5}$ — the factor crosses the bar and the exponent turns positive. $-x^{5}$ negated instead of reciprocated; $-\\dfrac{1}{x^{5}}$ reciprocated and then smuggled in a sign the base never authorized; $x^{5}$ dropped the repair altogether. At $x = 2$ the four options read $-32$, $1/32$, $-1/32$ and $32$ — only $1/32$ matches $2^{-5}$.',
            },
            {
              q: 'Simplify $2^{-3} \\cdot 2^{5}$.',
              options: ['$2^{-15}$', '$\\tfrac{1}{8}$', '$2^{2}$', '$-4$'],
              answer: 2,
              explain: 'The product law reads the negative exponent as a legal count: $2^{-3} \\cdot 2^{5} = 2^{-3+5} = 2^{2} = 4$. $2^{-15}$ multiplied the exponents (the tower-law move, $(-3) \\cdot 5 = -15$, giving $1/32768$ — priced and absurd); $\\tfrac{1}{8}$ is bar amnesia — reciprocating the whole product on sight of the minus sign, then stopping before the second factor; $-4$ sign-slips the true $2^{2}$. Direct check: $\\tfrac{1}{8} \\cdot 32 = 4$ — agreement.',
            },
            {
              q: 'Which expression has NO defined value in this course?',
              options: ['$5^{0}$', '$2^{-2}$', '$1^{-3}$', '$0^{-2}$'],
              answer: 3,
              explain: 'The base-zero boundary: $0^{-2}$ would need $1/0^{2} = 1/0$, the division ANS chapter 7 refused to define, and the quotient-route derivation dies at $0/0$ — no repair can reach it. The others all live: $5^{0} = 1$ (nonzero base, the zero-exponent theorem), $2^{-2} = 1/4$ (the reciprocal repair), $1^{-3} = 1/1^{3} = 1$ (base 1 is nonzero — the repair covers it, it merely gives back 1).',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 2.2',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Evaluate $7^{0}$, $1^{0}$ and $(-3)^{0}$.',
                  solution: [
                    'Take $7^{0}$: a nonzero base to the power zero — the repair gives $7^{0} = 1$.',
                    'Take $1^{0}$: base 1 is nonzero, so the repair covers it — $1^{0} = 1$ (and ones always multiply to ones).',
                    'Take $(-3)^{0}$: the base is $-3$, still nonzero — $(-3)^{0} = 1$. The sign of the base never touches the zero-exponent theorem.',
                  ],
                  answer: '$7^{0} = 1^{0} = (-3)^{0} = 1$',
                },
                {
                  q: 'Evaluate $2^{-1}$, $2^{-3}$ and $5^{-2}$.',
                  solution: [
                    'Take $2^{-1}$: reciprocate one copy — $2^{-1} = 1/2$.',
                    'Take $2^{-3}$: reciprocate three copies — $2^{-3} = 1/2^{3} = 1/8$.',
                    'Take $5^{-2}$: reciprocate two copies — $5^{-2} = 1/25$.',
                  ],
                  answer: '$2^{-1} = \\tfrac{1}{2}$, $2^{-3} = \\tfrac{1}{8}$, $5^{-2} = \\tfrac{1}{25}$',
                },
                {
                  q: 'Evaluate $(-2)^{-2}$ and $(-2)^{-3}$.',
                  solution: [
                    'Take $(-2)^{-2}$: reciprocate the square — $(-2)^{-2} = 1/(-2)^{2} = 1/4$ (the even exponent forgives through the bar).',
                    'Take $(-2)^{-3}$: reciprocate the cube — $(-2)^{-3} = 1/(-2)^{3} = -1/8$ (the odd exponent keeps the sign).',
                    'Hence the sign law of 2.1 survives the repair untouched — parity still rules.',
                  ],
                  answer: '$(-2)^{-2} = \\tfrac{1}{4}$, $(-2)^{-3} = -\\tfrac{1}{8}$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Write $3^{-4}$ with a positive exponent and evaluate.',
                  solution: [
                    'Take the repair directly: $3^{-4} = 1/3^{4}$ — the factor crosses the bar.',
                    'Now, evaluate the denominator: $3^{4} = 81$, so the value is $1/81$.',
                    'Hence one line of algebra where the pre-repair course had silence.',
                  ],
                  answer: '$3^{-4} = \\dfrac{1}{81}$',
                },
                {
                  q: 'Simplify $x^{5}/x^{9}$ ($x \\neq 0$), then verify at $x = 2$ — the case Lesson 2.1 had to refuse.',
                  solution: [
                    'Take the quotient law, now unrestricted: $x^{5}/x^{9} = x^{5-9} = x^{-4}$ — the subtraction is finally a legal exponent.',
                    'Now, translate by the repair: $x^{-4} = 1/x^{4}$.',
                    'Check, at $x = 2$: the original reads $32/512 = 1/16$, and the repaired form reads $2^{-4} = 1/16$ — agreement exactly where 2.1 stopped.',
                  ],
                  answer: '$x^{5}/x^{9} = x^{-4} = \\dfrac{1}{x^{4}}$ ($\\tfrac{1}{16}$ at $x = 2$, both sides)',
                },
                {
                  q: 'Simplify $2^{-3} \\cdot 2^{7}$.',
                  solution: [
                    'Take the product law across the integer exponents: $2^{-3+7} = 2^{4}$.',
                    'Now, evaluate: $2^{4} = 16$.',
                    'Check, directly: $\\tfrac{1}{8} \\cdot 128 = 16$ — the repair and the law agree.',
                  ],
                  answer: '$2^{-3} \\cdot 2^{7} = 2^{4} = 16$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Simplify $a^{-2} \\cdot a^{5}/a^{-3}$ ($a \\neq 0$), then verify at $a = 2$.',
                  solution: [
                    'Sweep, left to right: all three factors share the base, so the exponents add across the whole chain — $-2 + 5 + 3 = 6$.',
                    'So, the result is $a^{6}$ — note the division by $a^{-3}$ *adds* 3 (subtracting a negative exponent).',
                    'Check, at $a = 2$: the original reads $\\tfrac{1}{4} \\cdot 32 \\div \\tfrac{1}{8} = 8 \\cdot 8 = 64$, and $2^{6} = 64$ — agreement.',
                  ],
                  answer: '$a^{-2} \\cdot a^{5}/a^{-3} = a^{6}$ (64 at $a = 2$, both sides)',
                },
                {
                  q: 'Simplify $(2^{-1})^{-3}$.',
                  solution: [
                    'Take the tower law over the extended family: $(2^{-1})^{-3} = 2^{(-1) \\cdot (-3)} = 2^{3}$.',
                    'Now, evaluate: $2^{3} = 8$.',
                    'Check, by hand: $(2^{-1})^{-3} = (\\tfrac{1}{2})^{-3} = 1/(\\tfrac{1}{2})^{3} = 1/\\tfrac{1}{8} = 8$ — the two negatives rebuilt eight eighths.',
                  ],
                  answer: '$(2^{-1})^{-3} = 2^{3} = 8$',
                },
                {
                  q: 'Simplify $(x^{-2}y^{3})^{-2}$ ($x, y \\neq 0$), then verify at $x = 2$, $y = 3$.',
                  solution: [
                    'Take the tower law factor by factor: $(x^{-2})^{-2} = x^{4}$ and $(y^{3})^{-2} = y^{-6}$.',
                    'So, the expression is $x^{4}y^{-6}$, which the flip rule writes as $x^{4}/y^{6}$.',
                    'Check, at $x = 2$, $y = 3$: the original reads $(9/4)^{-2} = 16/729$, and the repaired form reads $16/729$ — exact.',
                  ],
                  answer: '$(x^{-2}y^{3})^{-2} = \\dfrac{x^{4}}{y^{6}}$ ($\\tfrac{16}{729}$ at $(2, 3)$, both sides)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Evaluate $1/2^{-4}$ and $3^{-2}/4^{-2}$.',
                  solution: [
                    'Take the flip rule on the first: $2^{-4}$ sits under the bar, so it comes up — $1/2^{-4} = 2^{4} = 16$.',
                    'Take the second by crossing both factors: $3^{-2}/4^{-2} = 4^{2}/3^{2} = 16/9$ — the fraction inverts outright.',
                    'Hence both values are exact rationals — the flip rule turned two awkward readings into two clean ones.',
                  ],
                  answer: '$1/2^{-4} = 16$; $3^{-2}/4^{-2} = \\dfrac{16}{9}$',
                },
                {
                  q: 'A medicine signal fades to half every 3 hours: $N(t) = 100 \\cdot 2^{-t/3}$ micrograms. Read $N(0)$ and $N(12)$.',
                  solution: [
                    'Take $t = 0$: the exponent is $0$, so $N(0) = 100 \\cdot 2^{0} = 100 \\cdot 1 = 100$ micrograms — the zero-exponent repair means *start*, not nothing.',
                    'Now, $t = 12$: the exponent is $-12/3 = -4$, so $N(12) = 100 \\cdot 2^{-4} = 100/16 = 25/4 = 6.25$ micrograms.',
                    'Hence four halvings took 100 down to 6.25 — the negative exponent carried the whole decay on one line.',
                  ],
                  answer: '$N(0) = 100$; $N(12) = 6.25$ micrograms ($25/4$)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Show that $x^{0} = 1$ is forced rather than chosen: suppose some value $v$ is to act as $x^{0}$ while the product law $x^{0} \\cdot x^{n} = x^{n}$ holds for every $n$ in $1$ through $5$. Pin $v$.',
                  solution: [
                    'Write, the demand at $n = 1$: $v \\cdot x = x$ — the candidate $v$ must multiply $x$ without changing it.',
                    'Take, the candidate $v = 2$: $2 \\cdot x = 2x \\neq x$ (they differ whenever $x \\neq 0$ — the sweep confirms $2x = x$ only at $x = 0$, which is excluded). Any $v \\neq 1$ fails the same way.',
                    'So, $v = 1$ is the only survivor across all five demands — and the quotient route ($x^{n}/x^{n} = x^{0}$, a self-division worth 1) pins the same value independently.',
                    'Hence the definition is forced, not decreed: two routes, one answer, no room to choose — which is what makes $x^{0} = 1$ a theorem and $0^{0}$ (where both routes die) a boundary.',
                  ],
                  answer: '$v = 1$ — the only value that satisfies $v \\cdot x^{n} = x^{n}$ for all $n$; any other candidate fails at $n = 1$',
                },
                {
                  q: 'Explain precisely which step of each derivation dies for the base zero — why $0^{0}$ and $0^{-n}$ stay undefined while $0^{n} = 0$ (positive $n$) is untouched.',
                  solution: [
                    'Take, the zero-exponent derivation at $a = 0$: route two needs $0^{n}/0^{n}$, which reads $0/0$ — the quotient ANS chapter 7 declined to define, so the derivation never starts.',
                    'Take, the negative-exponent derivation at $a = 0$: it needs $1/0^{n} = 1/0$ — no fraction exists with a zero denominator (the fraction class rejects it outright), so this route never starts either.',
                    'Now, the positive exponents: $0^{n} = 0$ follows from the repeated-multiplication definition alone (the first factor annihilates), needing no division — so it stays, exactly as clause (ii) of the charter demands.',
                    'Hence the boundary is the charter’s own machinery refusing: the repair runs on division, and at the zero base division is what does not exist.',
                  ],
                  answer: 'both derivations die on division by zero ($0/0$ and $1/0$); $0^{n} = 0$ survives because it needs no division',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The sandwich hunt: find every integer $n$ with $2^{n} < \\tfrac{1}{10} < 2^{n+1}$, and justify that your answer is the only one.',
                  solution: [
                    'Sweep, the integers $n$ from $-10$ to $9$, computing $2^{n}$ and $2^{n+1}$ as exact fractions and testing both inequalities.',
                    'Take, the candidate $n = -4$: $2^{-4} = 1/16 = 0.0625$ and $2^{-3} = 1/8 = 0.125$ — and $1/16 < 1/10 < 1/8$ holds (compare denominators: 16 > 10 and 10 < 8 is false the other way — careful: $1/10 < 1/8$ because 10 > 8).',
                    'Now, uniqueness: the powers $2^{n}$ increase strictly with $n$ even across the bar (each step multiplies by 2), so the fractions $\\ldots, 1/64, 1/32, 1/16, 1/8, \\ldots$ form one increasing line, and $1/10$ sits strictly between exactly one adjacent pair.',
                    'Hence $n = -4$ is the unique pin — the sweep confirms no other integer in the range satisfies both halves, and the doubling argument extends the uniqueness to every $n$ beyond it.',
                  ],
                  answer: '$n = -4$ is the unique solution: $2^{-4} = \\tfrac{1}{16} < \\tfrac{1}{10} < \\tfrac{1}{8} = 2^{-3}$',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'The repaired exponents', latex: 'a^{0} = 1 \\quad \\text{and} \\quad a^{-n} = \\frac{1}{a^{n}} \\qquad (a \\neq 0)', note: 'both forced by the laws of 2.1, not chosen — the zero base keeps only its positive exponents ($0^{n} = 0$), and $0^{0}$, $0^{-n}$ stay undefined' },
        {
          kind: 'formula',
          name: 'The extended exponent laws',
          latex: 'a^{m} \\cdot a^{n} = a^{m+n}, \\qquad \\frac{a^{m}}{a^{n}} = a^{m-n}, \\qquad (a^{m})^{n} = a^{mn} \\qquad (a \\neq 0, \\; m, n \\in \\mathbb{Z})',
          note: 'every restriction dissolved — verified by a 5,070-check exact-fraction sweep over ten bases and all exponent pairs from −6 to 6',
        },
      ],
    },
    {
      id: 'al-scientific-notation-and-orders-of-magnitude',
      number: '2.3',
      title: 'Scientific Notation and Orders of Magnitude',
      concepts: [
        'the standard form a x 10^k',
        'the canonical clause 1 <= a < 10',
        'converting large and small numbers',
        'computing with the exponent laws',
        'renormalization after multiplying',
        'significant digits as precision claims',
        'orders of magnitude as rungs',
        'the two dials of a number',
      ],
      objectives: [
        'convert any decimal — grotesquely large or vanishingly small — into the standard form a x 10^k with 1 <= a < 10',
        'explain why the standard form is a NAME (unique per number) rather than a choice',
        'multiply and divide in standard form using the exponent laws of 2.1 and 2.2, renormalising when the coefficient leaves [1, 10)',
        'state what a coefficient claims about precision, and count its significant digits',
        'compare numbers by exponent rungs — orders of magnitude — and say what that comparison hides',
      ],
      prerequisites: ['al-zero-and-negative-exponents-another-repair', 'fm-the-metric-system'],
      sources: ['ncert-math8-ch10-exponents', 'ncert-phys11-ch2', 'cengage-jee-style', 'archimedes-sand-reckoner'],
      blocks: [
        { kind: 'para', text: 'The chapter’s practical bill comes due. The exponent family now spans every integer (Lesson 2.2), and the moment has come to spend it. Consider the numbers a working scientist or an engineer actually meets: the mass of an electron is $0.0000000000000000000000000000009109$ kilograms — thirty leading zeros before the digits begin — and a processor’s transistor count runs past $10,000,000,000$. Written as plain decimals, the zeros crowd out the information: counting them is slow, copying them invites errors, and no eye can compare two such numbers at a glance. The repair of 2.2 turns both into one-liners: $9.109 \\times 10^{-31}$ kg and $10^{10}$ transistors. This lesson builds that shorthand properly — as a *form* with a uniqueness theorem, a conversion engine, arithmetic driven by the laws we proved, and an honest account of what the form says and does not say.' },
        { kind: 'para', text: 'One habit from Foundation Mathematics rides the whole lesson: place value (FM 1.1) already taught that a digit’s seat is a power of ten, and the metric ladder (FM 9.2) already named six rungs — kilo to milli — as prefixes on units. This lesson promotes both to a general notation for *numbers as such*, extends the ladder up to giga and down to micro, and adds the second thing place value never needed: a way to say how *precise* a written number claims to be.' },
        { kind: 'heading', text: 'The Form: a × 10^k, Done Honestly' },
        { kind: 'callout', tone: 'definition', title: 'Definition — standard form (scientific notation)', text: 'A number is said to be in **standard form** (also called **scientific notation**) when it is written as $a \\times 10^{k}$ with the coefficient $a$ satisfying $1 \\le a < 10$ and the exponent $k$ an integer. Thus $4725 = 4.725 \\times 10^{3}$, and $0.000000207 = 2.07 \\times 10^{-7}$. Numbers like $47.25 \\times 10^{2}$ (coefficient 47.25, too big) or $0.4725 \\times 10^{4}$ (coefficient 0.4725, too small) name the same value but are *not* standard form.' },
        { kind: 'para', text: 'Why the clause $1 \\le a < 10$? Because it makes the form a **name**. Without it, one value wears many costumes — $45{,}000$ can be written $45 \\times 10^{3}$, $0.45 \\times 10^{5}$, $450 \\times 10^{2}$, $4500 \\times 10^{1}$, $4.5 \\times 10^{4}$ — and nothing in the writing tells you which costume is *the* number. With the clause, exactly one costume qualifies: the exponent $k$ is forced (it counts how many seats the decimal point must shift) and the coefficient follows. The uniqueness is a theorem, and this chapter’s verifier checked it empirically: every integer from 1 to 9,999 lands on exactly one canonical pair $(a, k)$, and every $d/10^{6}$ for $d$ from 1 to 999 admits exactly one canonical exponent — zero exceptions in 10,998 trials.' },
        { kind: 'para', text: 'The conversion engine reads straight off place value. **A large number**: shift the point left until one nonzero digit remains in front; the number of shifts is $k$. So $89{,}200$ becomes $8.92 \\times 10^{4}$ (four shifts) and $4725$ becomes $4.725 \\times 10^{3}$ (three shifts) — a quick check: $k$ equals one less than the digit count, because the first digit already sits one seat above the ones place. **A small number**: shift the point right until the first nonzero digit leads; the number of rightward shifts, negated, is $k$. So $0.000301$ becomes $3.01 \\times 10^{-4}$ (four shifts right) and $0.0047$ becomes $4.7 \\times 10^{-3}$ (three shifts right). Lesson 2.2’s flip rule is the small-number engine in algebraic dress: dividing by $10^{k}$ *is* multiplying by $10^{-k}$.' },
        { kind: 'figure', caption: 'The powers-of-ten ladder: the exponent names the rung, the prefix names the rung — FM 9.2’s six school prefixes (kilo down to milli) extended by mega, giga and micro.', svg: powersOfTenLadderSvg() },
        {
          kind: 'table',
          caption: 'The conversion gallery — large and small, all exact',
          head: ['Plain decimal', 'Standard form', 'The reading'],
          rows: [
            ['$4725$', '$4.725 \\times 10^{3}$', 'three shifts left'],
            ['$89{,}200$', '$8.92 \\times 10^{4}$', 'four shifts left'],
            ['$2^{30} = 1{,}073{,}741{,}824$', '$1.073741824 \\times 10^{9}$', 'nine shifts left (the giga rung)'],
            ['$0.0047$', '$4.7 \\times 10^{-3}$', 'three shifts right (the milli rung)'],
            ['$0.000301$', '$3.01 \\times 10^{-4}$', 'four shifts right'],
            ['$0.000000207$', '$2.07 \\times 10^{-7}$', 'seven shifts right'],
            ['$2^{-3} = 0.125$', '$1.25 \\times 10^{-1}$', 'one shift right'],
          ],
        },
        { kind: 'para', text: 'The ladder figure shows why the same notation serves both directions: the exponent counts rungs from the unit rung at $10^{0} = 1$ — up for big, down for small — and the everyday prefix names (FM 9.2 banked kilo through milli; the SI carries mega at $10^{6}$, giga at $10^{9}$, micro at $10^{-6}$, nano at $10^{-9}$, per the units chapter of NCERT class 11 physics) ride the same rail. A gigahertz, a microsecond, a nanometre — each name is an exponent wearing a prefix.' },
        { kind: 'para', text: 'The rungs are not decoration — they are the daily vocabulary of technology. A phone’s processor has features measured in **nanometres** ($10^{-9}$ m — a billionth of a metre, a few hundred atoms across); its clock ticks in **gigahertz** ($10^{9}$ cycles per second); a coffee cup cools on the scale of **minutes** ($10^{2}$ seconds) while a microprocessor switch flips in **nanoseconds** ($10^{-9}$ s); the wifi bands live at 2.4 **giga**hertz while the mains hums at 50 **hertz** — nine rungs apart, which is why the mains hum never interferes with the wifi. Every one of those sentences is an order-of-magnitude statement, and the notation lets you make it without writing a single run of zeros.' },
        { kind: 'para', text: 'One refinement keeps the comparison honest. The **exponent gap** between two numbers is usually, but not exactly, the base-ten logarithm of their ratio — when the coefficients are both near the middle of their range, the gap counts the rungs well; when a coefficient sits at an edge (like 1.073741824 just above 1), the true ratio can climb a rung beyond what the gap suggests. The exact reading is always available: compute the ratio itself and put IT in standard form. For the chapter’s running pair, $2^{30}/2^{-4} = 2^{34} = 17{,}179{,}869{,}184 = 1.7179869184 \\times 10^{10}$ — the ratio’s own exponent says ten whole orders (plus a factor 1.7), while the rung gap counts eleven inclusive rungs. Two honest counts, two slightly different questions; the standard form answers both.' },
        { kind: 'heading', text: 'Computing in Standard Form: the Laws Do the Work' },
        { kind: 'para', text: 'Here the chapter pays its deepest dividend: **no new arithmetic is needed**. Multiplying two standard-form numbers is two independent jobs — the coefficients multiply (plain number arithmetic), the exponents add (the product law of 2.1). Dividing subtracts the exponents (the quotient law, unrestricted since 2.2). A power applies the tower law (exponents multiply). The only new habit is **renormalisation**: the raw result’s coefficient can drift outside $[1, 10)$ — say to $13.5$ or to $0.5$ — and then the whole thing walks one or more rungs until the clause is satisfied. Renormalisation is not a trick; it is the definition of the form applied again.' },
        { kind: 'para', text: 'For example, $(4.5 \\times 10^{6}) \\times (3 \\times 10^{3})$: coefficients give $13.5$, exponents give $10^{9}$, so the raw result reads $13.5 \\times 10^{9}$ — a fine *value* with an illegal name. The repair moves one factor of ten from the coefficient side to the exponent side: $13.5 \\times 10^{9} = 1.35 \\times 10^{10}$. The coefficient shrank by ten and the exponent grew by one — place value, wearing algebra.' },
        {
          kind: 'example',
          title: 'Compute (2.5 x 10⁶) · (4 x 10⁻³) and keep the result in standard form',
          steps: [
            'Take the two jobs separately: coefficients $2.5 \\cdot 4 = 10$; exponents $10^{6 + (-3)} = 10^{3}$ (the product law adds, and 2.2 made $-3$ a legal count).',
            'So, the raw result is $10 \\times 10^{3}$ — the coefficient has walked out of $[1, 10)$: renormalise.',
            'Now, one factor of ten crosses over: $10 \\times 10^{3} = 1 \\times 10^{4}$.',
            'Check, by expanding: $2.5 \\times 10^{6} = 2{,}500{,}000$ and $4 \\times 10^{-3} = 0.004$; their product is $10{,}000 = 10^{4}$ — agreement, exact.',
          ],
        },
        {
          kind: 'example',
          title: 'Compute (9.6 x 10⁷) / (3.2 x 10³), then (8 x 10⁻⁵) / (2 x 10⁻³)',
          steps: [
            'Take the first quotient: coefficients $9.6/3.2 = 3$; exponents $10^{7-3} = 10^{4}$ (the quotient law, unrestricted). The result $3 \\times 10^{4}$ is already canonical — no renormalisation needed.',
            'Check, by expanding: $96{,}000{,}000 / 3{,}200 = 30{,}000 = 3 \\times 10^{4}$ — agreement.',
            'Take the second quotient: coefficients $8/2 = 4$; exponents $10^{-5 - (-3)} = 10^{-2}$ — note subtracting a negative exponent adds.',
            'Hence the result is $4 \\times 10^{-2} = 1/25$ — and this is exactly 2.2’s cross-bar flip ($x^{-2}/y^{-3}$ shape) seen from the standard-form side.',
          ],
        },
        { kind: 'heading', text: 'Significant Digits: How Much the Form Can Say' },
        { kind: 'para', text: 'The standard form separates two jobs that plain decimals tangle together: the **exponent** says how *big*, the **coefficient** says how *well-measured*. The digits of $a$ — all of them, including zeros between nonzero digits and trailing zeros after the decimal point — are the number’s **significant digits**: the digits the writer is *claiming to know*. $1.073741824 \\times 10^{9}$ claims ten digits (the exact value of $2^{30}$); $1.07 \\times 10^{9}$ claims three; $1 \\times 10^{9}$ claims one. Same rung, different honesty. The gap between the ten-digit and three-digit claims is real: $1{,}073{,}741{,}824 - 1{,}070{,}000{,}000 = 3{,}741{,}824$ — about $0.35\\%$ of the whole, thrown away silently by the shorter form.' },
        { kind: 'para', text: 'The rule of thumb: zeros that *pad* (leading zeros of a small decimal, like the four zeros in $0.000301$) carry no information and never enter the coefficient; zeros that *sit inside or trail the coefficient* ($6.200 \\times 10^{-4}$) are measured claims and count as significant — four digits there, not two. This is the same precision discipline Foundation Mathematics 9.4 built for measurements (that lesson’s accuracy-versus-precision split); the standard form simply gives it a house.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the form does not create precision', text: 'Rewriting never adds digits worth trusting: $3.0 \\times 10^{8}$ m/s (two significant digits) and $2.998 \\times 10^{8}$ m/s (four) are different *claims* about the speed of light, not different numbers dressed up. A calculator that shows eight digits after a measurement supports three is printing fiction — the extra digits are the arithmetic’s noise, not the quantity’s detail. When an exam question says "give your answer to 2 significant figures", it is asking you to *state a claim*, not to round decoratively.' },
        { kind: 'heading', text: 'Orders of Magnitude: Comparing by the Rung' },
        { kind: 'para', text: 'The coarsest useful comparison ignores coefficients entirely: two numbers’ ratio is roughly $10^{k_{1} - k_{2}}$, so the **exponent gap** *is* the comparison. Each gap of one in $k$ means a factor of ten — one **order of magnitude**. Numbers sharing a rung ($k_{1} = k_{2}$) differ by less than a factor of ten, and the coefficient then decides: $1.594323 \\times 10^{6} < 5 \\times 10^{6}$ because $1.59 < 5$. The lesson-2.1 thread makes the point precisely: $2^{30} = 1.073741824 \\times 10^{9}$ and $10^{9}$ share the giga rung — their $7.37\\%$ gap is invisible at order-of-magnitude resolution — while $3^{13} = 1.594323 \\times 10^{6}$ sits three rungs down (a factor of roughly $10^{3}$, about 674 times smaller) and $2^{-4} = 6.25 \\times 10^{-2}$ sits eleven rungs below $2^{30}$ (their ratio is exactly $2^{34} = 17{,}179{,}869{,}184 \\approx 1.7 \\times 10^{10}$).' },
        {
          kind: 'table',
          caption: 'The significant-digit gallery and the family order',
          head: ['Number', 'Standard form', 'Significant digits'],
          rows: [
            ['$470$', '$4.7 \\times 10^{2}$', '2'],
            ['$1{,}073{,}741{,}824$', '$1.073741824 \\times 10^{9}$', '10 (exact)'],
            ['$0.00062$ (as $6.200 \\times 10^{-4}$)', '$6.200 \\times 10^{-4}$', '4 (trailing zeros are claims)'],
            ['$5{,}000{,}000$', '$5 \\times 10^{6}$', '1'],
          ],
        },
        {
          kind: 'example',
          title: 'How many times larger is 9.6 x 10⁷ than 3.2 x 10³? And how far does light travel in 8 minutes?',
          steps: [
            'Take the ratio: $(9.6 \\times 10^{7})/(3.2 \\times 10^{3}) = 3 \\times 10^{4}$ — thirty thousand times larger.',
            'Read, the rung story: the exponents differ by $7 - 3 = 4$, and indeed $10^{4} = 10{,}000$ — the coefficient ratio $3$ sits inside one rung, so the rung gap alone nearly answers it.',
            'Take, the light story: light covers $3 \\times 10^{8}$ m each second; the Sun stands about $1.5 \\times 10^{11}$ m away.',
            'So, the journey time is $(1.5 \\times 10^{11})/(3 \\times 10^{8}) = 0.5 \\times 10^{3}$ — the coefficient has slipped below 1: renormalise to $5 \\times 10^{2}$ seconds.',
            'Hence $500$ seconds $= 8\\tfrac{1}{3}$ minutes — the famous eight-minute journey from the Sun to you, computed in two lines of exponent law.',
          ],
        },
        { kind: 'figure', caption: 'The two dials: the coefficient carries the digits (the precision claim), the exponent carries the place-shifts (the size) — changing one never does the other’s job.', svg: twoDialsSvg() },
        { kind: 'heading', text: 'Who Thought This Way First? the Sand Reckoner' },
        { kind: 'para', text: 'The impulse to ride powers of ten past every written zero is very old. In the 3rd century BC, Archimedes wrote the *Sand Reckoner* (*Psammites*) for the young Syracusean king Gelon: a short treatise that set out to count — or rather to bound — the grains of sand the universe could hold, against the common claim that the count was infinite. To say any such number aloud in Greek, which named numbers only into the myriads (ten-thousands), Archimedes had to invent a naming machine: periods and orders built on the **myriad-myriad** ($10^{8}$), a base-ten ladder of ladders that climbed far past anything commerce needed. The answer his machinery produced: no more than $10^{63}$ grains ("ten thousand units of the eighth order" in his phrasing) under the astronomy he assumed. The number is not the point; the *method* is — name the rungs, let the rungs do the talking, and let the exponent carry the size so the digits can carry the detail. That is exactly the two-dial discipline of this lesson, twenty-two centuries before the notation settled.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — from Sand Reckoner to standard form', text: 'Archimedes’ periods-of-10^8 scheme (3rd century BC) was the first systematic power-ladder naming; the decimal point’s standard form with a clause like $1 \\le a < 10$ settled much later, riding on the place-value decimal system (Stevin, 1585) and the exponent notation itself (Descartes’ 1637 superscripts, met in Lesson 1.1). The phrase "order of magnitude" belongs to the same metric-era family as the SI prefixes of FM 9.2 — each prefix (mega, giga, micro, nano) is one rung of Archimedes’ ladder wearing its modern name.' },
        { kind: 'para', text: 'What the chapter has built, assembled in one place: Lesson 2.1 defined the power and proved three laws; Lesson 2.2 repaired the family across zero and negative exponents under the permanence charter; this lesson spent the family on the standard form — the notation that turns place value into a general language for size. Chapter 3 picks the letters back up: polynomials, where the exponent finally applies to *letters* systematically and the laws of this chapter become the engine of algebra itself.' },
        { kind: 'terms', items: [
          { term: 'Standard form (scientific notation)', def: 'The canonical writing $a \\times 10^{k}$ with $1 \\le a < 10$ and $k$ an integer — one name per number. $4.725 \\times 10^{3}$ qualifies; $47.25 \\times 10^{2}$ names the same value but breaks the coefficient clause.' },
          { term: 'Coefficient (mantissa)', def: 'The $a$ of $a \\times 10^{k}$: the digits of the number, all of them significant, sitting in $[1, 10)$. It is the precision dial of the two-dial reading.' },
          { term: 'Canonical clause', def: 'The requirement $1 \\le a < 10$ that makes standard form unique — the exponent is forced by the value, so the form is a NAME, not a choice. Verified by sweep: one canonical exponent per number across 10,998 trials.' },
          { term: 'Place-shift', def: 'The move of the decimal point that conversion performs: leftward shifts give positive exponents (large numbers), rightward shifts give negative ones (small numbers). The count of shifts is $|k|$.' },
          { term: 'Renormalisation', def: 'The walk that returns a raw product to canonical dress when the coefficient leaves $[1, 10)$: $13.5 \\times 10^{9} = 1.35 \\times 10^{10}$ — one factor of ten crosses from the coefficient to the exponent.' },
          { term: 'Significant digits', def: 'The digits of the coefficient — the digits the writer claims to know. Leading zeros never count; trailing zeros after the point do ($6.200 \\times 10^{-4}$ claims four). More digits = a stronger claim, not a bigger number.' },
          { term: 'Order of magnitude', def: 'One rung of the powers-of-ten ladder — a factor of ten. Numbers with the same exponent sit in the same order of magnitude; the exponent gap counts the rungs between two numbers, and the coefficient settles same-rung ties.' },
          { term: 'Sand Reckoner', def: 'Archimedes’ 3rd-century-BC treatise bounding the sand the universe holds (at most $10^{63}$ grains under his astronomy), built on a naming ladder of periods and orders over $10^{8}$ — the first surviving systematic power-ladder notation.' },
        ] },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Standard-form questions are free marks when the two-dial reading is owned, and expensive when it is not. The recurring items: convert (large: $89{,}200 \\to 8.92 \\times 10^{4}$; small: $0.000301 \\to 3.01 \\times 10^{-4}$ — count the shifts, watch the sign); compute with renormalisation ($(2.5 \\times 10^{6})(4 \\times 10^{-3}) = 1 \\times 10^{4}$, and the sneaky $0.5 \\times 10^{3} \\to 5 \\times 10^{2}$); spot the non-canonical costume ($47.25 \\times 10^{2}$ is *equal* to $4.725 \\times 10^{3}$ but not standard form — the coefficient clause); count significant digits ($6.200 \\times 10^{-4}$ has four, not two); and compare by rung (the same-order question: $2^{30}$ and $10^{9}$ share the giga rung). Competitive papers add the two-step stories — the light-time quotient $(1.5 \\times 10^{11})/(3 \\times 10^{8}) = 5 \\times 10^{2}$ s, the hair-count $(1 \\times 10^{-2})/(7 \\times 10^{-5}) = 1000/7 \\approx 1.4 \\times 10^{2}$ — where the final answer must be renormalised AND sensibly rounded. The check-by-expansion habit still rules: expand both forms at a pin value; they must agree.' },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'Write $4725$ in standard form.',
              options: ['$4.725 \\times 10^{2}$', '$47.25 \\times 10^{2}$', '$4.725 \\times 10^{3}$', '$4.725 \\times 10^{4}$'],
              answer: 2,
              explain: 'Three shifts left, one nonzero digit in front: $4.725 \\times 10^{3} = 4725$. The distractors are priced: $4.725 \\times 10^{2} = 47.25$ (one shift short — tenfold too small), $47.25 \\times 10^{2} = 4725$ (the right VALUE but the coefficient $47.25$ breaks $1 \\le a < 10$ — equal, yet not standard form), and $4.725 \\times 10^{4} = 47{,}250$ (one shift too many — tenfold too big).',
            },
            {
              q: 'Write $0.00062$ in standard form.',
              options: ['$6.2 \\times 10^{-3}$', '$6.2 \\times 10^{-4}$', '$6.2 \\times 10^{-5}$', '$-6.2 \\times 10^{4}$'],
              answer: 1,
              explain: 'Four shifts right to bring the 6 in front, so $k = -4$: $6.2 \\times 10^{-4} = 0.00062$. $6.2 \\times 10^{-3} = 0.0062$ (three shifts — one short); $6.2 \\times 10^{-5} = 0.000062$ (five — one long); and $-6.2 \\times 10^{4}$ is the sign-slip absurdity — the exponent’s sign commands the direction of the shift, never a negative value, and a width cannot go negative.',
            },
            {
              q: 'Compute $(2.5 \\times 10^{6}) \\cdot (4 \\times 10^{-3})$ and keep standard form.',
              options: ['$10 \\times 10^{3}$', '$1.0 \\times 10^{4}$', '$1 \\times 10^{9}$', '$2.5 \\times 10^{3}$'],
              answer: 1,
              explain: 'Coefficients: $2.5 \\cdot 4 = 10$. Exponents: $6 + (-3) = 3$ (the product law). Raw result $10 \\times 10^{3}$ — right value, illegal name (coefficient 10 is not below 10) — so renormalise: $1.0 \\times 10^{4}$. Option 0 is the honest intermediate (the same 10,000, but non-canonical); $1 \\times 10^{9}$ is the sign-dropped misread $6 + 3 = 9$; $2.5 \\times 10^{3} = 2500$ dropped the second coefficient and mangled the exponent. Expanded check: $2{,}500{,}000 \\cdot 0.004 = 10{,}000$ — agreement.',
            },
            {
              q: 'How many significant digits does $6.200 \\times 10^{-4}$ carry?',
              options: ['2', '3', '4', '7'],
              answer: 2,
              explain: 'Four: $6$, $2$, and both trailing zeros after the decimal point — trailing zeros in the coefficient are measured claims, not padding. 2 counts only the nonzero digits (wrong: the zeros assert something); 3 misses the last zero; 7 counts the digits of the whole written form including the exponent — the exponent is a size dial, not a digit of measurement.',
            },
            {
              q: 'Which number is the SAME order of magnitude as $2^{30} = 1.073741824 \\times 10^{9}$?',
              options: ['$3^{13} \\ (= 1.594323 \\times 10^{6})$', '$10^{9}$', '$10^{12}$', '$2^{-4} \\ (= 6.25 \\times 10^{-2})$'],
              answer: 1,
              explain: 'Same order of magnitude means the same exponent rung: $10^{9}$ sits beside $1.073741824 \\times 10^{9}$ on the giga rung — their $7.37\\%$ gap is invisible at order resolution. $3^{13}$ sits three rungs down (rung 6); $10^{12}$ sits three up; $2^{-4}$ sits eleven rungs below. The ratio check: $2^{30}/10^{9} = 1.0737\\ldots$, inside one rung — same order.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 2.3',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Write in standard form: $3400$, $89{,}200$ and $0.0047$.',
                  solution: [
                    'Take $3400$: three shifts left, first digit 3 in front — $3.4 \\times 10^{3}$.',
                    'Take $89{,}200$: four shifts left — $8.92 \\times 10^{4}$.',
                    'Take $0.0047$: three shifts right, first nonzero digit 4 — $4.7 \\times 10^{-3}$.',
                    'Check, by expansion: $3.4 \\times 1000 = 3400$; $8.92 \\times 10{,}000 = 89{,}200$; $4.7 \\times 0.001 = 0.0047$ — all three agree.',
                  ],
                  answer: '$3.4 \\times 10^{3}$; $8.92 \\times 10^{4}$; $4.7 \\times 10^{-3}$',
                },
                {
                  q: 'Write in plain decimals: $5 \\times 10^{3}$ and $9.1 \\times 10^{-2}$.',
                  solution: [
                    'Take $5 \\times 10^{3}$: three shifts right of the point — $5000$.',
                    'Take $9.1 \\times 10^{-2}$: two shifts left — $0.091$.',
                    'Hence the reading runs both ways: the exponent tells the point where to go.',
                  ],
                  answer: '$5000$ and $0.091$',
                },
                {
                  q: 'Write $2^{6}$ and $2^{-3}$ in standard form.',
                  solution: [
                    'Take $2^{6}$: Lesson 2.1’s tower gives $64$, so the shift count is one — $6.4 \\times 10^{1}$.',
                    'Take $2^{-3}$: Lesson 2.2’s repair gives $1/8 = 0.125$, one shift right — $1.25 \\times 10^{-1}$.',
                    'So, both powers land one rung from the unit rung, on opposite sides — the tower law and the repair feed the notation directly.',
                  ],
                  answer: '$2^{6} = 6.4 \\times 10^{1}$; $2^{-3} = 1.25 \\times 10^{-1}$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Write $730{,}000$ and $0.000301$ in standard form, and count the significant digits of each.',
                  solution: [
                    'Take $730{,}000$: five shifts left — $7.3 \\times 10^{5}$, two significant digits (the 7 and the 3; the padding zeros never entered the coefficient).',
                    'Take $0.000301$: four shifts right — $3.01 \\times 10^{-4}$, three significant digits (the interior zero sits between nonzero digits and counts).',
                    'Hence the coefficient’s length is the precision claim, independent of the size dial.',
                  ],
                  answer: '$7.3 \\times 10^{5}$ (2 sig figs); $3.01 \\times 10^{-4}$ (3 sig figs)',
                },
                {
                  q: '$47.25 \\times 10^{2}$ and $4.725 \\times 10^{3}$ name the same value. Which is standard form, and why?',
                  solution: [
                    'Check, the values: $47.25 \\times 100 = 4725$ and $4.725 \\times 1000 = 4725$ — the same number, two costumes.',
                    'Take, the clause: standard form demands $1 \\le a < 10$; the coefficient $47.25$ breaks it, $4.725$ satisfies it.',
                    'Hence $4.725 \\times 10^{3}$ is the standard form — and the form is a NAME: exactly one costume per value, which is what makes comparisons and searches well-defined.',
                  ],
                  answer: '$4.725 \\times 10^{3}$ — the only one whose coefficient satisfies $1 \\le a < 10$',
                },
                {
                  q: 'Count the significant digits: $1.074 \\times 10^{9}$, $5 \\times 10^{6}$, $6.200 \\times 10^{-4}$.',
                  solution: [
                    'Take $1.074 \\times 10^{9}$: four digits — the interior zero counts (it sits between nonzero digits).',
                    'Take $5 \\times 10^{6}$: one digit — a one-digit coefficient is a coarse but honest claim.',
                    'Take $6.200 \\times 10^{-4}$: four digits — both trailing zeros are measured claims.',
                    'Hence the three coefficients demonstrate all three zero-rules: interior counts, absence pads, trailing asserts.',
                  ],
                  answer: '4, 1 and 4 significant digits respectively',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Compute $(3 \\times 10^{4}) \\cdot (2.5 \\times 10^{-2})$ and keep standard form.',
                  solution: [
                    'Take the two jobs: coefficients $3 \\cdot 2.5 = 7.5$; exponents $10^{4 + (-2)} = 10^{2}$.',
                    'So, the result is $7.5 \\times 10^{2}$ — already canonical, no renormalisation.',
                    'Check, by expanding: $30{,}000 \\cdot 0.025 = 750 = 7.5 \\times 10^{2}$ — agreement.',
                  ],
                  answer: '$7.5 \\times 10^{2}$ (= 750)',
                },
                {
                  q: 'Compute $(9.6 \\times 10^{7}) / (3.2 \\times 10^{3})$.',
                  solution: [
                    'Take the two jobs: coefficients $9.6/3.2 = 3$; exponents $10^{7-3} = 10^{4}$.',
                    'So, the result is $3 \\times 10^{4}$ — canonical as it lands.',
                    'Check, by expanding: $96{,}000{,}000 / 3{,}200 = 30{,}000$ — agreement, and the rung gap $4$ already whispered the answer’s size.',
                  ],
                  answer: '$3 \\times 10^{4}$ (= 30,000)',
                },
                {
                  q: 'Compute $(8 \\times 10^{-5}) / (2 \\times 10^{-3})$.',
                  solution: [
                    'Take the two jobs: coefficients $8/2 = 4$; exponents $10^{-5-(-3)} = 10^{-2}$ — subtracting a negative adds.',
                    'So, the result is $4 \\times 10^{-2} = 1/25$.',
                    'Check, by expanding: $0.00008/0.002 = 0.04$ — agreement; and this is 2.2’s cross-bar flip in standard-form dress.',
                  ],
                  answer: '$4 \\times 10^{-2}$ (= 0.04)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A human hair is about $7 \\times 10^{-5}$ m wide. How many hair-widths make $1$ cm ($10^{-2}$ m)? Give the exact value and a standard-form estimate.',
                  solution: [
                    'Set, the quotient: $(1 \\times 10^{-2})/(7 \\times 10^{-5})$.',
                    'Take the two jobs: coefficients $1/7$; exponents $10^{-2-(-5)} = 10^{3}$.',
                    'So, the raw result is $(1/7) \\times 10^{3} = 0.142857\\ldots \\times 10^{3}$ — the coefficient has slipped below 1.',
                    'Now, renormalise: one factor of ten crosses right, giving $1.42857\\ldots \\times 10^{2}$ — the exact value is $1000/7$.',
                    'Hence about $1.4 \\times 10^{2}$ hair-widths per centimetre — roughly 143, a two-digit estimate of a three-digit truth, honestly labelled.',
                  ],
                  answer: '$1000/7 = 1.42857\\ldots \\times 10^{2} \\approx 1.4 \\times 10^{2}$ hair-widths',
                },
                {
                  q: 'Light travels about $3 \\times 10^{8}$ m/s; the Sun stands about $1.5 \\times 10^{11}$ m away. How long does sunlight take to reach Earth?',
                  solution: [
                    'Set, the quotient: $(1.5 \\times 10^{11})/(3 \\times 10^{8})$.',
                    'Take the two jobs: coefficients $1.5/3 = 0.5$; exponents $10^{11-8} = 10^{3}$.',
                    'So, the raw result is $0.5 \\times 10^{3}$ — renormalise: $5 \\times 10^{2}$ seconds.',
                    'Now, translate: $500$ s $= 500/60 = 8\\tfrac{1}{3}$ minutes.',
                    'Hence about eight minutes and twenty seconds — the two-dial method computing a famous fact in two lines.',
                  ],
                  answer: '$5 \\times 10^{2}$ s $= 8\\tfrac{1}{3}$ minutes (about 8 min 20 s)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'State what each of $1.073741824 \\times 10^{9}$, $1.07 \\times 10^{9}$ and $1 \\times 10^{9}$ claims, and compute the cost of the shortest claim.',
                  solution: [
                    'Take the ten-digit form: the exact value of $2^{30}$ — every digit known, zero uncertainty claimed.',
                    'Take the three-digit form: a claim to know $2^{30}$ within half a percent or so — an honest estimate, not the number.',
                    'Take the one-digit form: a claim to the giga rung only — the order of magnitude.',
                    'Now, price the gap: $1{,}073{,}741{,}824 - 1{,}070{,}000{,}000 = 3{,}741{,}824$, about $0.35\\%$ of the value.',
                    'Hence the three forms name the same number but make three different promises — the coefficient is a contract, and shortening it silently weakens the terms.',
                  ],
                  answer: 'the absolute gap is $3{,}741{,}824$ — about $0.35\\%$ thrown away by the three-digit claim',
                },
                {
                  q: 'Show that $45{,}000$ has exactly one standard-form name by exhibiting four equal non-canonical costumes and one canonical one.',
                  solution: [
                    'Write, the four non-canonical costumes: $45 \\times 10^{3}$, $0.45 \\times 10^{5}$, $450 \\times 10^{2}$, $4500 \\times 10^{1}$.',
                    'Check, each by expansion: $45{,}000$, $45{,}000$, $45{,}000$, $45{,}000$ — all equal, all disqualified ($a$ too big, too small, too big, too big).',
                    'Take, the canonical one: $4.5 \\times 10^{4}$ — the coefficient sits in $[1, 10)$, four shifts left.',
                    'Hence one value, five costumes, exactly one name — the uniqueness clause doing its quiet work (and the verifier swept the same fact across 10,998 values).',
                  ],
                  answer: 'only $4.5 \\times 10^{4}$ is standard form; the other four costumes are equal but non-canonical',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Order the family $\\{2^{30},\\ 3^{13},\\ 10^{9},\\ 2^{-4},\\ 5 \\times 10^{6}\\}$ from smallest to largest using standard forms, naming the rung of each member and the tie-break rule on equal rungs.',
                  solution: [
                    'Convert, every member: $2^{-4} = 6.25 \\times 10^{-2}$ (rung $-2$); $3^{13} = 1.594323 \\times 10^{6}$ (rung 6); $5 \\times 10^{6}$ (rung 6); $10^{9}$ (rung 9); $2^{30} = 1.073741824 \\times 10^{9}$ (rung 9).',
                    'Order, by rung first: rung $-2$, then rung 6, then rung 9.',
                    'Take, the tie-breaks: on rung 6, $1.594323 < 5$, so $3^{13} < 5 \\times 10^{6}$; on rung 9, $1 < 1.073741824$, so $10^{9} < 2^{30}$.',
                    'Hence the full order: $2^{-4} < 3^{13} < 5 \\times 10^{6} < 10^{9} < 2^{30}$ — rungs decide coarsely, coefficients decide finely, and both decisions were verified exactly.',
                  ],
                  answer: '$2^{-4} < 3^{13} < 5 \\times 10^{6} < 10^{9} < 2^{30}$ (rungs $-2, 6, 6, 9, 9$; same-rung pairs settled by coefficient)',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'The standard form', latex: 'N = a \\times 10^{k}, \\qquad 1 \\le a < 10, \\quad k \\in \\mathbb{Z}', note: 'one name per number — the coefficient carries the digits, the exponent carries the place-shifts; large numbers shift left (k > 0), small shift right (k < 0)' },
        {
          kind: 'formula',
          name: 'Computing in standard form',
          latex: '(a \\times 10^{m})(b \\times 10^{n}) = ab \\times 10^{m+n}, \\qquad \\frac{a \\times 10^{m}}{b \\times 10^{n}} = \\frac{a}{b} \\times 10^{m-n}',
          note: 'the laws of 2.1–2.2 at work; renormalise whenever the coefficient leaves [1, 10) — one factor of ten crosses between the dials',
        },
      ],
    },
  ],
  plannedLessons: [],
}