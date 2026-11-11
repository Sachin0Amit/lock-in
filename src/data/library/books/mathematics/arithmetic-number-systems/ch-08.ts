import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 8: Irrationals and the Real
 * Line
 *
 * LESSONS WRITTEN: 8.1 The Diagonal That Broke the Rationals (run 60)
 *                  8.2 The Family of Irrationals (run 60)
 *                  8.3 How Irrationals Behave (run 61)
 *                  8.4 Completeness: the Line Without Holes (run 61)
 *                  8.5 Square and Cube Roots: the Extraction Crafts
 *                  (the pre-written-books audit turn, 2026-11-11 — owner
 *                  directive: audit the three written books against their
 *                  sources "and see it neet more topics or any changes if
 *                  so do so"; the audit found the Khattar ch. 3 + NCERT-8
 *                  squares/cube-roots extraction scope carried NOWHERE on
 *                  the shelf and closed the gap with this computational
 *                  coda: gnomon census, triplet generator, factor method,
 *                  the long-division method DERIVED from (10a+b)², decimal
 *                  and fraction roots, cube strip + digit map; verify-first
 *                  honored — sections V (pins) then W (authored audits)
 *                  added to verify-book2-ch08.ts, 544/544; sources logged:
 *                  khattar-qa-4e, ncert-class8-squares-cube-roots,
 *                  aryabhatiya-root-extraction, jiuzhang-kaifang).
 * CHAPTER COMPLETE (run 61 closed the theory; 8.5 closed the craft gap;
 * run 61 closed it: 8.3 + 8.4 shipped strictly
 * sequentially + the unit-8 completion review passed; run 61 was a manual
 * catch-up of job 509354's failed-to-start 21:45 IST fire).
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * irrationality/real-numbers spine) + Khattar QA 4e ch. 1 (the
 * competitive-exam surds scope) — see docs/project/SOURCE_LOG.md. New
 * citation keys: baudhayana-sulbasutras, hippasus-irrationality-tradition
 * (8.1); plato-theaetetus-theodorus, cantor-1874-algebraic-numbers (8.2)
 * — web-checked 2026-11-06 (run 60); dedekind-1872-stetigkeit,
 * cantor-1872-fundamental-sequences, heine-1872-functionenlehre,
 * meray-1869-limites (8.4) — web-checked 2026-11-06 (run 61). All
 * arithmetic pre-verified by scripts/verify-book2-ch08.ts (grown to 302
 * checks, sections A–U2, ALL PASS; run 61's S0 caught and fixed the 8.1
 * shore-guard defect — the unguarded U overlapped L on every rational
 * < −√2 — and U2 regression-guards the square values that hand-typing
 * got wrong; the script, not memory, is the source of truth; across the
 * chapter's two runs, fifteen pre-writing defects were caught, including
 * a wrong remembered digit string for √7).
 * Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (8.1): the dissection that proves d² = 2. Four right       */
/* isosceles triangles with legs 1 (scale S px per unit) stand         */
/* right-corner-in at the centre C: their legs trace the cross, their  */
/* hypotenuses bound a square of side d. Coordinates:                  */
/*   C = (250, 130); tips N/E/S/W at distance S along the axes         */
/*   hypotenuse = S√2 ≈ 110.3 px; tiled area = 4 × ½ S² = 2S².         */
/* ------------------------------------------------------------------ */
const DIS_CX = 250
const DIS_CY = 130
const DIS_S = 78
const DIS_TIPS = {
  N: [DIS_CX, DIS_CY - DIS_S] as const,
  E: [DIS_CX + DIS_S, DIS_CY] as const,
  S: [DIS_CX, DIS_CY + DIS_S] as const,
  W: [DIS_CX - DIS_S, DIS_CY] as const,
}
const DIS_HYP = +(DIS_S * Math.SQRT2).toFixed(1)

/* ------------------------------------------------------------------ */
/* Figure 2 (8.1): the squeeze ladder — four self-similar zoom rows.   */
/* Row i brackets √2 between consecutive d-digit decimals; the window  */
/* is the bracket padded by a quarter-bracket on each side, so every   */
/* row has the SAME on-screen geometry (the chase re-zooms forever):   */
/*   bracket [lo, hi], window [lo − (hi−lo)/4, hi + (hi−lo)/4]         */
/*   x(v) = 70 + (v − wlo)/(whi − wlo) · 400                           */
/* Rows (verified in verify-book2-ch08.ts section F):                  */
/*   [1.4, 1.5] · [1.41, 1.42] · [1.414, 1.415] · [1.4142, 1.4143]     */
/* ------------------------------------------------------------------ */
const ZOOM_ROWS = [
  { name: 'tenths', lo: '1.4', hi: '1.5', y: 52 },
  { name: 'hundredths', lo: '1.41', hi: '1.42', y: 110 },
  { name: 'thousandths', lo: '1.414', hi: '1.415', y: 168 },
  { name: 'ten-thousandths', lo: '1.4142', hi: '1.4143', y: 226 },
]
const zoomGeom = (lo: string, hi: string) => {
  const lov = Number(lo)
  const hiv = Number(hi)
  const pad = (hiv - lov) / 4
  const wlo = lov - pad
  const whi = hiv + pad
  return {
    xlo: +(70 + ((lov - wlo) / (whi - wlo)) * 400).toFixed(1),
    xhi: +(70 + ((hiv - wlo) / (whi - wlo)) * 400).toFixed(1),
    x2: +(70 + ((Math.SQRT2 - wlo) / (whi - wlo)) * 400).toFixed(1),
    xw0: 70,
    xw1: 470,
  }
}

export const chapter08: Chapter = {
  number: 8,
  slug: 'irrationals-and-the-real-line',
  title: 'Irrationals and the Real Line',
  summary:
    'The diagonal that broke the rationals: √2 proved irrational by the classical contradiction, the family of irrationals grown from the primes, the arithmetic behaviour of irrational + rational sorted into a proved table, and completeness met informally — the no-holes property that makes the real line the stage for all of analysis.',
  status: 'complete',
  lessons: [
    {
      id: 'ans-the-diagonal-that-broke-the-rationals',
      number: '8.1',
      title: 'The Diagonal That Broke the Rationals',
      prerequisites: [
        'ans-density-and-the-decimal-mirror-proven',
        'ans-fundamental-theorem-of-arithmetic',
        'ans-the-laws-of-integer-arithmetic',
      ],
      sources: ['beck-geoghegan-art-of-proof', 'baudhayana-sulbasutras', 'hippasus-irrationality-tradition', 'khattar-qa-4e'],
      concepts: [
        'The unit-square diagonal: d² = 2 by dissection',
        'Irrational: not a ratio of integers',
        'Proof by contradiction (reductio ad absurdum)',
        'The parity lemma: x² even ⟺ x even',
        'The classical contradiction: p, q both even vs reduced',
        'The general wall: √n rational ⟺ n is a perfect square',
        'The squeeze ladders: rational brackets that never close',
        'Density is not fullness: the hole at √2',
      ],
      objectives: [
        'Prove d² = 2 for the unit-square diagonal by an area dissection that needs no Pythagorean theorem',
        'Define irrational number precisely and prove √2 irrational by the classical parity contradiction over a reduced fraction',
        'Generalize the wall: √n is rational exactly when n is a perfect square — by the prime-exponent parity of the Fundamental Theorem',
        'Run the squeeze ladders against √2 and say precisely what they show (density) and what they cannot show (completeness)',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'One diagram ends the chapter 7 world. Lesson 7.3 left a cliff-hanger: density — *no two rationals are neighbours* — was proved, fullness was not, and the diagonal of a unit square was named as the threat. This lesson delivers the threat. The diagonal is a length; lengths are numbers; and we will prove that this particular number is **not one of the rationals** built so carefully in chapter 7 — not any fraction $\\tfrac{p}{q}$, reduced or otherwise. School banked the word for such numbers: FM 5.2 called decimals that neither terminate nor repeat *irrational*, as a vocabulary label. What school never proved — because the proof needs chapter 2’s division algorithm for long division, chapter 4’s Fundamental Theorem for the general wall, and chapter 7’s reduced forms for the contradiction to bite — is that such numbers *exist*. That is this lesson’s cargo: one length that every fraction fails to name.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Hippasus and the legend of the drowned',
          text: 'Tradition credits Hippasus of Metapontum, an early follower of Pythagoras (c. 450 BCE), with the discovery that some lengths admit no ratio of integers — and wraps the discovery in a story: that the brotherhood, whose worldview rested on "all is number," was so shaken that Hippasus was drowned at sea, divine punishment for revealing the secret. Treat the story as a story: the sources that name Hippasus are centuries later and contradict one another on what he proved and how he died. What is certain is the *mathematical shockwave*: the discovery forced the Greeks to separate length from number, drove Eudoxus (c. 350 BCE) to build a rigorous theory of ratios that survives in Euclid’s *Elements* Book V, and made "irrational" the price of honest geometry. The proof you are about to read is the classical one — the parity contradiction over a reduced fraction — and its endurance over twenty-four centuries is the real monument.',
        },
        { kind: 'heading', text: 'The diagonal, measured' },
        {
          kind: 'para',
          text: 'First, turn the picture into a number. Take the unit square — side $1$ — and its diagonal $d$. The question this lesson answers is: *which rational number is $d$?* But before any fraction can be tested, $d$ must earn its status as a specific number at all, and there is a beautiful bookkeeping proof that $d^2 = 2$ which needs no Pythagorean theorem — only the area arithmetic that FM banked.',
        },
        {
          kind: 'derivation',
          title: 'The diagonal of the unit square satisfies d² = 2',
          statement:
            'Claim: the diagonal $d$ of a unit square obeys $d^2 = 2$ — by dissecting four half-square triangles and rebuilding them into a square whose side is $d$.',
          steps: [
            {
              label: 'Cut the unit square along a diagonal',
              formula: '\\text{each half: legs } 1, 1, \\text{ hypotenuse } d; \\quad \\text{area} = \\tfrac{1}{2} \\cdot 1 \\cdot 1 = \\tfrac{1}{2}',
              explanation:
                'A diagonal splits the unit square into two right isosceles triangles with legs $1$ and $1$; the unknown side is the hypotenuse $d$. Each half has area $\\tfrac{1}{2}$ (half the base-times-height), and indeed $\\tfrac{1}{2} + \\tfrac{1}{2} = 1$: the bookkeeping closes.',
            },
            {
              label: 'Take four copies, right corners in',
              formula: '4 \\times \\tfrac{1}{2} = 2 \\quad \\text{(total tiled area)}',
              explanation:
                'Stand four copies of the triangle in a plane with their right-angle corners meeting at one centre point, legs radiating outward — the figure below shows the assembly. Each triangle contributes area $\\tfrac{1}{2}$, so the tiled region has area $2$.',
            },
            {
              label: 'The boundary is a square of side d',
              formula: '\\text{boundary sides} = \\text{the four hypotenuses} = d \\quad \\Longrightarrow \\quad \\text{area} = d^2',
              explanation:
                'The outer boundary of the assembly is traced by the four hypotenuses. Consecutive hypotenuses meet at right angles (rotating a triangle by a quarter-turn carries each hypotenuse to the next), and all four have the same length $d$ — the boundary is a square whose side is $d$. Its area is therefore $d^2$: the same region whose area was already counted as $2$.',
            },
            {
              label: 'Equate the two counts of one area',
              formula: 'd^2 = 2',
              explanation:
                'One region, two area computations: $4 \\times \\tfrac{1}{2} = 2$ by the triangle count, $d^2$ by the square count. No Pythagorean theorem was invoked — only cutting, rotating, and area addition. The diagonal is a number, and its square is exactly $2$.',
            },
          ],
          result:
            'The unit-square diagonal is a definite length d with d² = 2 — the question "which rational is d?" is now exactly the question "which rational squares to 2?".',
        },
        {
          kind: 'figure',
          caption:
            'The dissection: four copies of the half-square triangle (legs 1, hypotenuse d) stand right-corner-in at the centre. Their legs trace the cross; their hypotenuses bound a square of side d. The tiled area is 4 × ½ = 2 — and it is also d². Hence d² = 2 by area bookkeeping alone.',
          svg: `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four right isosceles triangles with unit legs arranged around a centre point, their hypotenuses forming a square of side d, proving d squared equals two by area">
  ${[
    { a: DIS_TIPS.E, b: DIS_TIPS.N, f: 'rgba(15,118,110,0.10)' },
    { a: DIS_TIPS.S, b: DIS_TIPS.E, f: 'rgba(180,83,9,0.10)' },
    { a: DIS_TIPS.W, b: DIS_TIPS.S, f: 'rgba(15,118,110,0.10)' },
    { a: DIS_TIPS.N, b: DIS_TIPS.W, f: 'rgba(180,83,9,0.10)' },
  ]
    .map(
      (t) =>
        `<polygon points="${DIS_CX},${DIS_CY} ${t.a[0]},${t.a[1]} ${t.b[0]},${t.b[1]}" fill="${t.f}" stroke="none"/>`
    )
    .join('\\n  ')}
  <line x1="${DIS_TIPS.N[0]}" y1="${DIS_TIPS.N[1]}" x2="${DIS_TIPS.E[0]}" y2="${DIS_TIPS.E[1]}" stroke="currentColor" stroke-width="1.6"/>
  <line x1="${DIS_TIPS.E[0]}" y1="${DIS_TIPS.E[1]}" x2="${DIS_TIPS.S[0]}" y2="${DIS_TIPS.S[1]}" stroke="currentColor" stroke-width="1.6"/>
  <line x1="${DIS_TIPS.S[0]}" y1="${DIS_TIPS.S[1]}" x2="${DIS_TIPS.W[0]}" y2="${DIS_TIPS.W[1]}" stroke="currentColor" stroke-width="1.6"/>
  <line x1="${DIS_TIPS.W[0]}" y1="${DIS_TIPS.W[1]}" x2="${DIS_TIPS.N[0]}" y2="${DIS_TIPS.N[1]}" stroke="currentColor" stroke-width="1.6"/>
  ${[DIS_TIPS.N, DIS_TIPS.E, DIS_TIPS.S, DIS_TIPS.W]
    .map(
      (t) =>
        `<line x1="${DIS_CX}" y1="${DIS_CY}" x2="${t[0]}" y2="${t[1]}" stroke="#ea580c" stroke-width="1.2"/>`
    )
    .join('\\n  ')}
  ${[
    { tip: DIS_TIPS.E, nxt: DIS_TIPS.N },
    { tip: DIS_TIPS.S, nxt: DIS_TIPS.E },
    { tip: DIS_TIPS.W, nxt: DIS_TIPS.S },
    { tip: DIS_TIPS.N, nxt: DIS_TIPS.W },
  ]
    .map(
      (t) =>
        `<circle cx="${DIS_CX + (t.tip[0] - DIS_CX) * 0.12 + (t.nxt[0] - DIS_CX) * 0.12}" cy="${DIS_CY + (t.tip[1] - DIS_CY) * 0.12 + (t.nxt[1] - DIS_CY) * 0.12}" r="2.2" fill="none" stroke="currentColor" stroke-width="1"/>`
    )
    .join('\\n  ')}
  ${[
    { mid: [(DIS_CX + DIS_TIPS.E[0]) / 2, (DIS_CY + DIS_TIPS.E[1]) / 2], dx: 14, dy: 4, t: '1' },
    { mid: [(DIS_CX + DIS_TIPS.S[0]) / 2, (DIS_CY + DIS_TIPS.S[1]) / 2], dx: 5, dy: 16, t: '1' },
    { mid: [(DIS_CX + DIS_TIPS.W[0]) / 2, (DIS_CY + DIS_TIPS.W[1]) / 2], dx: -14, dy: 4, t: '1' },
    { mid: [(DIS_CX + DIS_TIPS.N[0]) / 2, (DIS_CY + DIS_TIPS.N[1]) / 2], dx: -5, dy: -10, t: '1' },
  ]
    .map(
      (l) =>
        `<text x="${Math.round(l.mid[0] + l.dx)}" y="${Math.round(l.mid[1] + l.dy)}" font-size="12" fill="#ea580c" text-anchor="middle" font-style="italic">${l.t}</text>`
    )
    .join('\\n  ')}
  ${[
    { a: DIS_TIPS.N, b: DIS_TIPS.E },
    { a: DIS_TIPS.E, b: DIS_TIPS.S },
    { a: DIS_TIPS.S, b: DIS_TIPS.W },
    { a: DIS_TIPS.W, b: DIS_TIPS.N },
  ]
    .map((s) => {
      const mx = (s.a[0] + s.b[0]) / 2
      const my = (s.a[1] + s.b[1]) / 2
      const nx = (mx - DIS_CX)
      const ny = (my - DIS_CY)
      const len = Math.hypot(nx, ny)
      const ox = (nx / len) * 16
      const oy = (ny / len) * 16
      return `<text x="${Math.round(mx + ox)}" y="${Math.round(my + oy + 4)}" font-size="13" fill="currentColor" text-anchor="middle" font-style="italic">d</text>`
    })
    .join('\\n  ')}
  <text x="${DIS_CX + DIS_S + 22}" y="${DIS_CY - DIS_S - 14}" font-size="12" fill="currentColor" opacity="0.75">hypotenuse ${DIS_HYP} px = d</text>
  <text x="${DIS_CX - DIS_S - 18}" y="${DIS_CY + DIS_S + 26}" font-size="12" fill="currentColor" opacity="0.75">area = 4 × ½ = 2 — and also d²</text>
  <text x="${DIS_CX - DIS_S - 18}" y="${DIS_CY + DIS_S + 44}" font-size="12.5" font-weight="700" fill="#ea580c">so d² = 2</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'So the target is fixed: find the rational that squares to $2$. Trial gives no landing: $1.4^2 = 1.96$ is short, $1.5^2 = 2.25$ overshoots, $1.41^2 = 1.9881$ short, $1.42^2 = 2.0164$ over, $1.414^2 = 1.999396$ short, $1.415^2 = 2.002225$ over — every candidate lands on one side or the other, never on $2$. Of course, finitely many trials prove nothing: chapter 3 taught that the rationals are endless, and the missing fraction might simply need a hundred more digits. The classical proof does something sharper: it assumes a fraction *does* square to $2$ and derives nonsense. The technique deserves a word before the proof, because it is the book’s first genuine **proof by contradiction** — *reductio ad absurdum*, reduction to the absurd. To prove a statement true, assume its opposite; push the assumption through legal move after legal move until something impossible falls out; then conclude the assumption itself was impossible, since every move was legal. It is proof by *elimination at the level of whole worlds*: if "a fraction squares to 2" is incompatible with the laws of arithmetic, and the laws hold, then no fraction squares to 2.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Irrational number',
          text: 'A number $x$ is said to be **irrational** if it is *not* rational — that is, if no pair of integers names it as a ratio. Thus, $x \\text{ is irrational} \\Longleftrightarrow \\neg\\exists\\, p, q \\in \\mathbb{Z},\\; q \\neq 0, \\text{ with } x = \\tfrac{p}{q}.$ Chapter 7 built $\\mathbb{Q}$ as the collection of all such ratios $\\tfrac{p}{q}$; "irrational" names a number living outside that collection. The word is a description of where the number is not, not a recipe for what it is — which is why proving a number irrational is exactly proving a non-existence: that no fraction, anywhere in the endless supply, lands on it.',
        },
        { kind: 'heading', text: 'The classical contradiction' },
        {
          kind: 'para',
          text: 'Now the proof, in the form the tradition has carried for twenty-four centuries. Suppose the diagonal $d$ is rational after all: $d = \\tfrac{p}{q}$ with $p, q$ integers, $q \\neq 0$ — and, since chapter 7 showed every class has exactly one canonical reduced representative, take the fraction *reduced*: $\\gcd(p, q) = 1$ with $q > 0$. Nothing is lost: if any fraction names $d$, its reduction names $d$ too (7.1’s equivalence). Squaring the alleged identity $d = \\tfrac{p}{q}$ and using $d^2 = 2$ from the dissection:',
        },
        {
          kind: 'equation',
          latex: '\\left(\\tfrac{p}{q}\\right)^{2} = 2 \\quad\\Longrightarrow\\quad p^{2} = 2q^{2}',
          note: 'The equation of the whole argument: one integer ($p^2$) equals twice another ($q^2$). Everything now turns on what that forces about the prime factors of $p$ and $q$ — and the smallest prime is already enough.',
        },
        {
          kind: 'derivation',
          title: '√2 is irrational — the parity argument',
          statement:
            'Claim: no reduced fraction $\\tfrac{p}{q}$ ($q > 0$, $\\gcd(p,q) = 1$) satisfies $p^2 = 2q^2$; hence no fraction at all does, and $\\sqrt{2}$ is irrational.',
          steps: [
            {
              label: 'The parity lemma',
              formula: 'x^{2} \\text{ even} \\Longleftrightarrow x \\text{ even} \\qquad (\\text{equivalently: odd} \\times \\text{odd} = \\text{odd})',
              explanation:
                'If $x$ is odd, $x = 2k+1$ and $x^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ is odd — the distributive law of 6.3 doing the work. The contrapositive is the direction we need: $x^2$ even forces $x$ even. (Chapter 5 saw the same fact as a congruence: squares mod $2$ are $\\{0, 1\\}$, and the odd class squares to $1$.)',
            },
            {
              label: 'The equation forces p even',
              formula: 'p^{2} = 2q^{2} \\text{ is even} \\;\\Longrightarrow\\; p \\text{ is even} \\;\\Longrightarrow\\; p = 2r',
              explanation:
                '$2q^2$ is even by construction, so $p^2$ is even, so $p$ is even by the parity lemma — there is no third option, because $\\mathbb{Z}$ splits into evens and odds and the odds have already been excluded.',
            },
            {
              label: 'Substitute and halve again',
              formula: '(2r)^{2} = 2q^{2} \\;\\Longrightarrow\\; 4r^{2} = 2q^{2} \\;\\Longrightarrow\\; q^{2} = 2r^{2}',
              explanation:
                'Cancel the factor $2$ (7.2’s multiplicative cancellation — legal for nonzero classes, and $2 \\neq 0$). The new equation has exactly the shape of the old one with $q$ in the accused seat: $q^2$ equals twice a square, so $q^2$ is even.',
            },
            {
              label: 'The parity lemma bites again',
              formula: 'q^{2} = 2r^{2} \\text{ even} \\;\\Longrightarrow\\; q \\text{ is even}',
              explanation:
                'The same lemma, run on the other variable: $q$ is even too. So both $p$ and $q$ are even.',
            },
            {
              label: 'The contradiction: reduced fractions have no common factor',
              formula: '2 \\mid p \\text{ and } 2 \\mid q \\;\\Longrightarrow\\; \\gcd(p, q) \\ge 2 \\;\\Longrightarrow\\; \\tfrac{p}{q} \\text{ was not reduced}',
              explanation:
                'But the fraction was chosen reduced: $\\gcd(p, q) = 1$, and $2$ divides both — impossible. Every step was legal; the only exit is that the assumption itself is impossible. The verifier swept the wall directly: no positive integers $p, q$ with $q \\le 400$ satisfy $p^2 = 2q^2$ — zero instances, as the theorem demands.',
            },
          ],
          result:
            'No reduced fraction squares to 2 — and if no reduced one does, none at all does. The diagonal d of the unit square is irrational. √2 ∉ ℚ.',
        },
        {
          kind: 'para',
          text: 'Two retellings deepen the same proof. **The mod-4 retelling** (chapter 5’s eyes): squares are $\\equiv 0$ or $1 \\pmod 4$, so $2q^2 \\bmod 4 \\in \\{0, 2\\}$ and $p^2 \\bmod 4 \\in \\{0, 1\\}$; equality $p^2 \\equiv 2q^2$ can hold only when both sides are $\\equiv 0$, which forces $q$ even — and then $p^2 = 2q^2$ with $q$ even makes $p^2$ divisible by $8$, so $p$ is even too (odd squares are $\\equiv 1 \\pmod 8$). Same contradiction, different lens. **The descent retelling**: the argument shows any solution $p^2 = 2q^2$ spawns a smaller one $r^2 = 2s^2$ with $r = p/2$, $s = q/2$ — and that halving could continue forever. But positive integers cannot descend forever: $p > p/2 > p/4 > \\dots$ is an endless strictly-decreasing sequence of positive integers, and chapter 1’s well-ordering forbids exactly that. The Greeks called this *apeiron* — the boundless — and treated "it would descend without end" as the absurdity itself. Three lenses, one engine: **evenness is a double-duty property, and $2q^2$ imposes it on both $p$ and $q$ at once.**',
        },
        { kind: 'heading', text: 'The general wall: which n have rational roots' },
        {
          kind: 'para',
          text: 'The diagonal was the messenger, but the wall is general. The same equation shape $p^2 = n q^2$ asks, for each positive integer $n$: does some fraction square to $n$? The parity lemma was the special tool for $n = 2$; the general tool is chapter 4’s Fundamental Theorem of Arithmetic, read through prime exponents.',
        },
        {
          kind: 'derivation',
          title: '√n is rational exactly when n is a perfect square',
          statement:
            'Claim: for a positive integer $n$, the equation $x^2 = n$ has a rational solution if and only if $n = k^2$ for some integer $k$ — every prime exponent of $n$ is even.',
          steps: [
            {
              label: '(⇐) Perfect squares have rational roots',
              formula: 'n = k^{2} \\;\\Longrightarrow\\; \\sqrt{n} = k \\in \\mathbb{Z} \\subseteq \\mathbb{Q}',
              explanation:
                'The trivial direction: if $n$ is the square of $k$, then $k$ itself squares to $n$. So $\\sqrt{1} = 1$, $\\sqrt{4} = 2$, $\\sqrt{9} = 3$, $\\sqrt{16} = 4$ — the square numbers are exactly the $n$ whose roots are rationals (integers, even).',
            },
            {
              label: '(⇒) A rational root forces even exponents',
              formula: 'p^{2} = n\\,q^{2} \\;\\Longrightarrow\\; 2\\,e_{r}(p) = e_{r}(n) + 2\\,e_{r}(q) \\quad \\text{for every prime } r',
              explanation:
                'Write what the Fundamental Theorem says about both sides of $p^2 = n q^2$: the exponent of prime $r$ in $p^2$ is twice its exponent in $p$; on the right it is $e_r(n) + 2 e_r(q)$. Factorizations are *unique* (that is the theorem), so the two exponent lists agree prime by prime.',
            },
            {
              label: 'The parity conclusion',
              formula: 'e_{r}(n) = 2\\,e_{r}(p) - 2\\,e_{r}(q) = 2\\,(e_{r}(p) - e_{r}(q)) \\;\\Longrightarrow\\; e_{r}(n) \\text{ is even for every prime } r',
              explanation:
                'Each $e_r(n)$ is a difference of two even numbers, hence even. So $n$’s prime factorization has every exponent even — which is precisely the statement that $n$ is a perfect square: pair up the prime factors $r^{2e_r} = (r^{e_r})^2$ and multiply. The verifier swept $n \\le 400$: the brute-force search over fractions agrees with the perfect-square test on every single $n$, zero violations.',
            },
            {
              label: 'The census, instance-checked',
              formula: '\\sqrt{12} \\notin \\mathbb{Q} \\;(12 = 2^{2} \\cdot 3); \\quad \\sqrt{18} \\notin \\mathbb{Q} \\;(18 = 2 \\cdot 3^{2}); \\quad \\sqrt{50} \\notin \\mathbb{Q} \\;(50 = 2 \\cdot 5^{2})',
              explanation:
                'One odd exponent is enough to convict: the stray $3$ in $12$, the stray $2$ in $18$, the stray $2$ in $50$. Meanwhile $144 = 2^4 \\cdot 3^2$ is all-even: $\\sqrt{144} = 2^2 \\cdot 3 = 12$. The verdict table below runs the census to $n = 20$.',
            },
          ],
          result:
            '√n is rational ⟺ n is a perfect square. The rationals contain the roots of exactly the squares — every other positive integer contributes a hole.',
        },
        {
          kind: 'table',
          caption: 'The wall census for n = 1..20: factorization, prime-exponent parity, and the verdict. Every odd exponent convicts — the roots of non-squares are all irrational.',
          head: ['n', 'Factorization', 'Exponents even?', '√n'],
          rows: [
            ['$1 = 1^2$', '— (empty product)', '✓', '$1$'],
            ['$2$', '$2$', 'odd ✗', 'irrational'],
            ['$3$', '$3$', 'odd ✗', 'irrational'],
            ['$4 = 2^2$', '$2^2$', '✓', '$2$'],
            ['$5$', '$5$', 'odd ✗', 'irrational'],
            ['$6$', '$2 \\cdot 3$', 'both odd ✗', 'irrational'],
            ['$7$', '$7$', 'odd ✗', 'irrational'],
            ['$8$', '$2^3$', 'odd ✗', 'irrational'],
            ['$9 = 3^2$', '$3^2$', '✓', '$3$'],
            ['$10$', '$2 \\cdot 5$', 'both odd ✗', 'irrational'],
            ['$11$', '$11$', 'odd ✗', 'irrational'],
            ['$12$', '$2^2 \\cdot 3$', '3 odd ✗', 'irrational'],
            ['$13$', '$13$', 'odd ✗', 'irrational'],
            ['$14$', '$2 \\cdot 7$', 'both odd ✗', 'irrational'],
            ['$15$', '$3 \\cdot 5$', 'both odd ✗', 'irrational'],
            ['$16 = 2^4$', '$2^4$', '✓', '$4$'],
            ['$17$', '$17$', 'odd ✗', 'irrational'],
            ['$18$', '$2 \\cdot 3^2$', '2 odd ✗', 'irrational'],
            ['$19$', '$19$', 'odd ✗', 'irrational'],
            ['$20$', '$2^2 \\cdot 5$', '5 odd ✗', 'irrational'],
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Baudhāyana’s ladder: the Śulbasūtra knows the number, not the name',
          text: 'Centuries before the Greek crisis, Indian altar-geometry had already measured this length. The Baudhāyana Śulbasūtra (c. 800–500 BCE, the manual for constructing fire altars) gives, for the diagonal of a square of side $a$, the rule: increase the side by a third, that third by its own fourth, and *diminish* that by its own thirty-fourth — in symbols, $\\sqrt{2} \\approx 1 + \\tfrac{1}{3} + \\tfrac{1}{12} - \\tfrac{1}{408} = \\tfrac{577}{408}$. The script verified the ladder exactly: $\\tfrac{577}{408} = 1.414215686\\dots$, correct to five decimal places, and — the beautiful part — $577^2 = 2 \\cdot 408^2 + 1$, so $\\left(\\tfrac{577}{408}\\right)^2 = 2 + \\tfrac{1}{408^2}$: the approximation overshoots by exactly one part in $408^2 = 166\\,464$. The sūtra itself ends with the word *saviśeṣaḥ* — "with a remainder": the authors knew the value was inexact. They had approximated a number they could not name — practical precision walking ahead of theoretical impossibility, exactly the gap this lesson’s proof formalizes. (Note the decimal of $\\tfrac{577}{408}$: since $408 = 2^3 \\cdot 3 \\cdot 17$ carries foreign primes, 7.3’s criterion says it *repeats* — pre-period 3, period 16. The approximation is a perfectly ordinary rational; the target it chases is not.)',
        },
        { kind: 'heading', text: 'The squeeze: chasing √2 with rationals' },
        {
          kind: 'para',
          text: 'The wall says no fraction *lands* on $\\sqrt{2}$. Watch one get close anyway — because the closeness is where density and fullness come apart. Take decimal brackets: each pair of consecutive $k$-digit decimals is a pair of *rationals*, and the ladder closes in: $1.4^2 = 1.96 < 2 < 2.25 = 1.5^2$; $1.41^2 = 1.9881 < 2 < 2.0164 = 1.42^2$; $1.414^2 = 1.999396 < 2 < 2.002225 = 1.415^2$; $1.4142^2 = 1.99996164 < 2 < 2.00024449 = 1.4143^2$. Every bracket is verified by exact integer arithmetic (the script squares the integers $14142$ and $14143$ and places the decimal point — no floating-point slop). At the thousandths rung the lower bracket misses $2$ by $0.000604$ — and the upper by more, so $1.414$ is the nearest three-digit name. The brackets tighten forever; the ladder below draws four rungs.',
        },
        {
          kind: 'example',
          title: 'Chase √2 down four rungs of decimal brackets — and watch it escape every one',
          steps: [
            'Take the tenths rung: $1.4^2 = 1.96$ (short of $2$) and $1.5^2 = 2.25$ (over) — so $1.4 < \\sqrt{2} < 1.5$.',
            'Now, split the bracket: $1.41^2 = 1.9881 < 2 < 2.0164 = 1.42^2$ — the hundredths rung keeps $\\sqrt{2}$ in a bracket $\\tfrac{1}{100}$ wide.',
            'So, the thousandths: $1.414^2 = 1.999396 < 2 < 2.002225 = 1.415^2$ — the miss below is $0.000604$, above $0.002225$; $1.414$ is the nearer name.',
            'Take the ten-thousandths: $1.4142^2 = 1.99996164 < 2 < 2.00024449 = 1.4143^2$ — the bracket is now $\\tfrac{1}{10000}$ wide, and $\\sqrt{2}$ is still inside, on no endpoint.',
            'Check what the ladder is made of: every bracket end — $1.4$, $1.42$, $1.414$, $1.4143$ — is a rational number; the theorem says none of them, and none of the endless rungs to come, will ever touch $\\sqrt{2}$.',
            'Hence the chase is endless by *theorem*, not by patience: the rationals bracket the diagonal forever and never close.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The squeeze ladder: four self-similar generations, each re-zoomed on the previous rational bracket (amber). 1.4 < √2 < 1.5, then 1.41 < √2 < 1.42, then 1.414 < √2 < 1.415, then 1.4142 < √2 < 1.4143 — the ring (√2) never lands on a bracket end. Every bracket is a pair of rationals; the theorem says the chase never closes.',
          svg: `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four nested zoom rows showing rational brackets around root two that never close: one point four to one point five, one point four one to one point four two, one point four one four to one point four one five, one point four one four two to one point four one four three">
  ${ZOOM_ROWS.map((row, i) => {
    const g = zoomGeom(row.lo, row.hi)
    const labY = row.y + 16
    const above = i % 2 === 0
    return `  <text x="10" y="${row.y + 4}" font-size="10.5" fill="currentColor" opacity="0.75">${row.name}</text>
  <line x1="100" y1="${row.y}" x2="${g.xw1}" y2="${row.y}" stroke="currentColor" stroke-width="1" opacity="0.35"/>
  <line x1="${g.xlo}" y1="${row.y}" x2="${g.xhi}" y2="${row.y}" stroke="#ea580c" stroke-width="2.4"/>
  <line x1="${g.xlo}" y1="${row.y - 5}" x2="${g.xlo}" y2="${row.y + 5}" stroke="#ea580c" stroke-width="1.6"/>
  <line x1="${g.xhi}" y1="${row.y - 5}" x2="${g.xhi}" y2="${row.y + 5}" stroke="#ea580c" stroke-width="1.6"/>
  <text x="${g.xlo}" y="${labY}" font-size="11" fill="#ea580c" text-anchor="middle">${row.lo}</text>
  <text x="${g.xhi}" y="${labY}" font-size="11" fill="#ea580c" text-anchor="middle">${row.hi}</text>
  <circle cx="${g.x2}" cy="${row.y}" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="${g.x2}" y="${row.y - (above ? 10 : -18)}" font-size="11.5" font-weight="700" fill="currentColor" text-anchor="middle">√2</text>`
  }).join('\\n')}
  <text x="470" y="30" font-size="11" fill="currentColor" opacity="0.7" text-anchor="end">each row re-zooms on the previous bracket — the ring never lands</text>
</svg>`,
        },
        { kind: 'heading', text: 'Density is not fullness: the hole at √2' },
        {
          kind: 'para',
          text: 'Now the honest ledger — what the ladder proves and what it merely suggests. What it *proves*: the rationals crowd arbitrarily close to $\\sqrt{2}$ from both sides — bracket widths $\\tfrac{1}{10}$, $\\tfrac{1}{100}$, $\\tfrac{1}{1000}$, $\\tfrac{1}{10000}$, with no end. That is 7.3’s density, seen from outside: it is not only that rationals pack between any two rationals; they pack against the *irrational* points too. What it *suggests but does not prove*: that there is a *point* at the ring — something the brackets close on. Look at the split the ladder rides: every positive rational $r$ satisfies exactly one of $r^2 < 2$, $r^2 = 2$, $r^2 > 2$ — and the middle case never happens (that is this lesson) — so every positive rational is strictly on one side: below the hole ($r^2 < 2$) or above it ($r^2 > 2$); the negative rationals sit far to the left of both, and the callout below folds them into the classes. Both sides are populated and neither has a rational boundary member: given any rational with $r^2 < 2$, the next bracket rung finds a bigger one still below; given any positive one with $r^2 > 2$, a smaller one still above. The two sides face each other across a gap that contains no rational point — yet *something* is there: the diagonal’s length did not vanish when we proved fractions cannot reach it.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The two shores, named',
          text: 'The split is worth naming now because chapter 8.4 will build on it: $L = \\{r \\in \\mathbb{Q} : r^2 < 2 \\text{ or } r < 0\\}$ and $U = \\{r \\in \\mathbb{Q} : r > 0 \\text{ and } r^2 > 2\\}$ — the lower and upper classes of the hole (the guard $r > 0$ matters: without it $-2$ would sit in both classes, since $(-2)^2 = 4 > 2$). Every rational is in exactly one class (7.2’s trichotomy), $L$ has no largest member, $U$ has no smallest member, and the pair together cut the whole rational line in two. A construction like this — a partition of $\\mathbb{Q}$ into a left class with no maximum and a right class with no minimum — is called a *cut*, and Dedekind’s 1871–72 insight (the same mathematician who named the field in 7.2) was that the cut itself can serve as the *definition* of the missing number. That is the real line’s birth certificate, and it arrives in 8.4.',
        },
        {
          kind: 'para',
          text: 'One more consequence lands immediately, and it is 7.3’s mirror closing the loop. Chapter 7 proved *both* directions of the decimal dichotomy: every rational expands as terminating **or** repeating (the mirror theorem), and every terminating-or-repeating expansion names a rational (the conversion theorem). Contrapositive, in one stroke: a number whose decimal neither terminates nor repeats is irrational. Apply it to $\\sqrt{2}$: the script computed $1.414213562373095048801688724209\\dots$ to thirty places — no termination in sight, no period — but the *guarantee* is not the printout; it is the chain: $\\sqrt{2}$ is irrational (this lesson), irrational ⟹ not rational ⟹ not terminating-or-repeating (7.3’s contrapositive). The digits run forever without pattern *because* the wall stands. The decimal mirror, which could always be run backwards on rationals, has now met a number it can never finish naming.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Irrational number',
              def: 'A number that is not a ratio of integers: no p, q ∈ ℤ (q ≠ 0) have x = p/q. Proven non-existence — no fraction anywhere lands on it.',
            },
            {
              term: 'Proof by contradiction (reductio ad absurdum)',
              def: 'Assume the opposite of the claim, derive an impossibility through legal steps, conclude the assumption was impossible. The book’s first full specimen is the √2 argument.',
            },
            {
              term: 'The parity lemma',
              def: 'x² even ⟺ x even (odd × odd is odd). The engine of the classical proof: p² = 2q² convicts p, then q.',
            },
            {
              term: 'Reduced fraction (canonical form)',
              def: 'The unique representative with gcd(p, q) = 1, q > 0 (7.1). The contradiction lands here: the proof forces a common factor 2 into a fraction sworn to have none.',
            },
            {
              term: 'Infinite descent',
              def: 'The retelling in which any solution p² = 2q² spawns a strictly smaller one — impossible for positive integers by well-ordering (ch. 1). The Greeks’ form of the absurdity.',
            },
            {
              term: 'Perfect square',
              def: 'A positive integer all of whose prime exponents are even — n = k². Exactly the n whose square roots are rational; one odd exponent convicts (the FTA wall).',
            },
            {
              term: 'The squeeze (bracketing)',
              def: 'Chasing an irrational between consecutive rational brackets of vanishing width: 1.4 < √2 < 1.5, then 1.41 < √2 < 1.42, … — endless by theorem.',
            },
            {
              term: 'Density vs completeness',
              def: 'Density (7.3): rationals pack between any two points, no neighbours. Fullness is different: the shores {r² < 2} and {r² > 2} face each other with no rational between — the hole at √2 that 8.4’s completeness fills.',
            },
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which statement is the *definition* of an irrational number?',
              options: [
                'a number whose decimal has many digits',
                'a number that is not the ratio of two integers — no $p, q \\in \\mathbb{Z}$, $q \\neq 0$, with $x = \\tfrac{p}{q}$',
                'a number larger than every fraction',
                'a square root that cannot be computed exactly',
              ],
              answer: 1,
              explain:
                'The definition is a non-existence statement about ratios, not about decimal appearance or size. Option 1 confuses length of decimal with kind of number (every irrational also has a rational arbitrarily close by density). Option 3 fails on trichotomy: every rational $r$ is exceeded by $r + 1$, so nothing is "larger than every fraction". Option 4 imports computation: rationality is about naming by a ratio, not about our ability to evaluate — and besides, some square roots ($\\sqrt{4}$) are rational and computable while some computable decimals ($0.\\overline{3}$) are rational.',
            },
            {
              q: 'In the classical proof, where exactly does the contradiction land?',
              options: [
                '$p^2 = 2q^2$ has no solutions mod 3',
                'the decimal expansion never terminates',
                '$p$ and $q$ are both even, contradicting the reduction $\\gcd(p, q) = 1$',
                '577/408 squares to slightly more than 2',
              ],
              answer: 2,
              explain:
                'The proof forces $2 \\mid p$ and then $2 \\mid q$ — a common factor in a fraction chosen reduced, which is impossible. Option 1 is a true fact about a different modulus but not this argument (parity/mod 4 is the engine). Option 1’s decimal fact is a *consequence* (via 7.3’s contrapositive), not the contradiction. Option 4 is the Śulbasūtra approximation’s honest inexactness — irrelevant to the proof, which concerns all fractions at once.',
            },
            {
              q: 'The first inference — $p^2 = 2q^2$ forces $p$ even — rests on which lemma?',
              options: [
                'odd × odd is odd (equivalently: $x^2$ even ⟹ $x$ even)',
                'the Fundamental Theorem of Arithmetic',
                'Euclid’s algorithm for gcd',
                'the density of $\\mathbb{Q}$',
              ],
              answer: 0,
              explain:
                'If $p$ were odd, $p^2$ would be odd — but $2q^2$ is even; the parity lemma (proved by expanding $(2k+1)^2 = 4k^2+4k+1$) is the exact tool. Option 2 powers the *general* wall ($\\sqrt{n}$ for non-square $n$) later in the lesson, not this first step. Option 3 builds reduced forms (7.1) but is not what convicts $p$. Option 4 is chapter 7’s between-ness property — no role here.',
            },
            {
              q: 'Which of these has an irrational square root?',
              options: [
                '$n = 144$',
                '$n = 169$',
                '$n = 200$',
                '$n = 121$',
              ],
              answer: 2,
              explain:
                '$200 = 2^3 \\cdot 5^2$: the exponent of 2 is odd — not a perfect square, so $\\sqrt{200} = 10\\sqrt{2}$ is irrational. The others are squares: $144 = 12^2$, $169 = 13^2$, $121 = 11^2$. The test is the FTA parity check, not the size of the number — 200 is bigger than all three squares and still fails the even-exponent test.',
            },
            {
              q: '7.3 proved: every rational expands as a terminating or repeating decimal. What does its contrapositive say about √2’s decimal?',
              options: [
                'it terminates after sufficiently many digits',
                'it repeats with an extremely long period',
                'the theorem is silent, since √2 is not rational',
                'since √2 is irrational, its decimal neither terminates nor repeats',
              ],
              answer: 3,
              explain:
                'The contrapositive of "rational ⟹ terminating-or-repeating" is "not terminating-or-repeating ⟹ not rational" — run forward here: √2 is irrational *and* every decimal either terminates, repeats, or belongs to an irrational; 7.3’s two theorems together make the decimal dichotomy an iff, so √2’s expansion can do neither. Option 3 gets the logic backwards: the theorem constrains rationals, and its contrapositive speaks precisely about the others. Options 1 and 2 would make √2 rational — the very thing the wall forbids.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Verify the tenths bracket by exact arithmetic: $1.4^2 < 2 < 1.5^2$.',
                  solution: [
                    'Take $1.4^2 = 1.96$ (or exactly $\\tfrac{196}{100}$) — short of $2$ by $0.04$.',
                    'Take $1.5^2 = 2.25$ — over by $0.25$.',
                    'Hence $1.4 < \\sqrt{2} < 1.5$: the tenths bracket holds.',
                  ],
                  answer: '$1.4 < \\sqrt{2} < 1.5$',
                },
                {
                  q: 'Is $\\sqrt{\\tfrac{81}{16}}$ rational? Compute it.',
                  solution: [
                    'Take $\\tfrac{81}{16} = \\left(\\tfrac{9}{4}\\right)^2$ — check: $9^2 = 81$, $4^2 = 16$ ✓.',
                    'So the number is a perfect square *of a rational* — the wall convicts only non-square integers.',
                    'Hence $\\sqrt{\\tfrac{81}{16}} = \\tfrac{9}{4} = 2.25$, rational.',
                  ],
                  answer: '$\\tfrac{9}{4}$',
                },
                {
                  q: 'List the perfect squares up to 50, and state which of $\\sqrt{2}, \\dots, \\sqrt{12}$ are irrational.',
                  solution: [
                    'Squares: $1, 4, 9, 16, 25, 36, 49$ — the even-exponent factorizations.',
                    'So among $2 \\dots 12$: the squares are $4$ and $9$; every other $n$ carries an odd prime exponent.',
                    'Hence $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}, \\sqrt{6}, \\sqrt{7}, \\sqrt{8}, \\sqrt{10}, \\sqrt{11}, \\sqrt{12}$ are irrational ($9$ of the $11$).',
                  ],
                  answer: 'all except √4 = 2 and √9 = 3',
                },
                {
                  q: 'Compute $1.41^2$ and $1.42^2$ exactly, and confirm the hundredths bracket.',
                  solution: [
                    'Take $141^2 = 19881$, so $1.41^2 = 1.9881$ — short of $2$ by $0.0119$.',
                    'Take $142^2 = 20164$, so $1.42^2 = 2.0164$ — over by $0.0164$.',
                    'Hence $1.41 < \\sqrt{2} < 1.42$, and $1.41$ is the nearer hundredths name (miss $0.0119$ vs $0.0164$).',
                  ],
                  answer: '$1.41 < \\sqrt{2} < 1.42$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Run the parity proof on $\\sqrt{8}$ directly: suppose $p^2 = 8q^2$ (reduced) and derive a contradiction.',
                  solution: [
                    'Take the equation mod $4$: $8q^2 \\equiv 0 \\pmod 4$, so $p^2 \\equiv 0 \\pmod 4$ — and squares mod 4 are $\\{0, 1\\}$, so $4 \\mid p^2$, forcing $p$ even ($p = 2r$).',
                    'Now, substitute: $4r^2 = 8q^2$, so $r^2 = 2q^2$ — the $\\sqrt{2}$ wall exactly.',
                    'So, the chapter’s proof applies: $r$ and $q$ both even, contradicting $\\gcd(p, q) = 1$ (which $2 \\mid p, 2 \\mid q$ already violates).',
                    'Hence $\\sqrt{8}$ is irrational — as the census promised ($8 = 2^3$, odd exponent).',
                  ],
                  answer: '$\\sqrt{8}$ is irrational',
                },
                {
                  q: 'Suppose $\\sqrt{2} = \\tfrac{a}{b}$ for *some* fraction, not necessarily reduced. Explain why the proof may assume $\\gcd(a, b) = 1$ anyway.',
                  solution: [
                    'Take any naming fraction $\\tfrac{a}{b}$: chapter 7.1 proved every class contains exactly one reduced representative, obtained by dividing out $g = \\gcd(a, b)$.',
                    'Now, $\\tfrac{a}{b}$ and $\\tfrac{a/g}{b/g}$ name the *same* number (they are equivalent pairs — that is 7.1’s definition).',
                    'So, if $\\sqrt{2}$ has any fractional name, it has a reduced one — and the contradiction destroys the reduced one.',
                    'Hence no fraction of any kind names $\\sqrt{2}$: the reduction step loses nothing, which is exactly why the proof chooses it.',
                  ],
                  answer: 'reduction is lossless (7.1), so the contradiction covers every fraction',
                },
                {
                  q: 'Retell the contradiction in mod-4 language: squares mod 4 are $\\{0, 1\\}$; deduce $p$ and $q$ both even from $p^2 = 2q^2$.',
                  solution: [
                    'Take squares mod 4: $\\{0, 1\\}$ (verified: even $x$ gives $x^2 \\equiv 0$; odd $x$ gives $x^2 \\equiv 1$).',
                    'So, $2q^2 \\bmod 4 \\in \\{0, 2\\}$, and matching $p^2 \\equiv 2q^2 \\pmod 4$ requires both sides $\\equiv 0$: any odd $q$ makes the right side $2$, which no square can be.',
                    'So, $q$ even; then $p^2 = 2q^2$ with $q = 2s$ gives $p^2 = 8s^2 \\equiv 0 \\pmod 8$ — and odd squares are $\\equiv 1 \\pmod 8$ (chapter 5), so $p$ is even too.',
                    'Hence $\\gcd(p, q) \\ge 2$: the same contradiction, in congruence dress.',
                  ],
                  answer: 'both even — contradiction with reduction',
                },
                {
                  q: 'Use the exponent-parity test to sort: $\\sqrt{18}$, $\\sqrt{24}$, $\\sqrt{36}$, $\\sqrt{48}$ — rational or irrational?',
                  solution: [
                    'Take $18 = 2 \\cdot 3^2$: the 2 is odd — irrational.',
                    'Take $24 = 2^3 \\cdot 3$: both odd — irrational.',
                    'Take $36 = 2^2 \\cdot 3^2$: all even — rational, $\\sqrt{36} = 6$.',
                    'Take $48 = 2^4 \\cdot 3$: the 3 is odd — irrational.',
                    'Hence only $\\sqrt{36}$ lands in $\\mathbb{Q}$; one stray prime is enough to convict.',
                  ],
                  answer: 'only √36 = 6 is rational',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove the parity lemma in full: $x$ odd $\\Longrightarrow x^2$ odd, and conclude $x^2$ even $\\Longrightarrow x$ even.',
                  solution: [
                    'Take $x$ odd: $x = 2k + 1$ for some $k \\in \\mathbb{Z}$ (that is what odd means).',
                    'Now, expand: $x^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ — one more than an even number (distributivity, 6.3).',
                    'So, $x^2$ is odd; the contrapositive of "$x$ odd ⟹ $x^2$ odd" is "$x^2$ even ⟹ $x$ even".',
                    'Hence the lemma — and note it needed only the distributive and commutative laws of chapter 6, nothing about division.',
                  ],
                  answer: '$x^2$ even forces $x$ even',
                },
                {
                  q: 'Prove $\\sqrt{5}$ is irrational by the mod-5 engine.',
                  solution: [
                    'Suppose $p^2 = 5q^2$ reduced. Squares mod 5 are $\\{0, 1, 4\\}$ (the census: $0,\\pm 1, \\pm 2$ square to $0, 1, 4$).',
                    'Now, $5q^2 \\equiv 0 \\pmod 5$, so $p^2 \\equiv 0 \\pmod 5$ — the only square in $\\{0,1,4\\}$ divisible by 5 is 0, so $5 \\mid p$; write $p = 5r$.',
                    'So, $25 r^2 = 5 q^2$, hence $5 r^2 = q^2$: the right side is divisible by 5, so (same argument) $5 \\mid q$.',
                    'Hence $5 \\mid p$ and $5 \\mid q$ — contradicting $\\gcd(p, q) = 1$. $\\sqrt{5}$ is irrational.',
                  ],
                  answer: '$\\sqrt{5}$ is irrational',
                },
                {
                  q: 'Explain why infinite descent is impossible: the halving $p \\to p/2 \\to p/4 \\to \\dots$ cannot continue forever among positive integers.',
                  solution: [
                    'Suppose the descent continued forever: $p > p/2 > p/4 > \\dots$, all positive integers.',
                    'Now, consider the set of values the descent visits — a non-empty set of positive integers.',
                    'So, chapter 1’s well-ordering applies: every non-empty set of positive integers has a *least* element; but the descent’s values keep strictly decreasing, so no value can be least — the visited set has none.',
                    'Hence the descent must terminate — which is why "it would halve forever" is a legitimate absurdity, and why the Greeks could rest the proof on it.',
                  ],
                  answer: 'well-ordering forbids endless strict descent',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) The decimal $0.101001000100001\\dots$ (one 1, then one 0; one 1, then two 0s; one 1, then three 0s; …) — rational or irrational? Prove your verdict.',
                  solution: [
                    'Suppose it repeated with period $d$: then after some point the digits repeat in blocks of length $d$.',
                    'Now, a period-$d$ block contains at most $d$ consecutive zeros — so zero-runs in a repeating decimal are bounded by $d$ (or the decimal is eventually all zeros, i.e. terminating).',
                    'So, but this decimal’s zero-runs grow without bound ($1, 2, 3, 4, \\dots$ zeros) and it never terminates.',
                    'Hence no period fits: the expansion neither terminates nor repeats, and by 7.3’s dichotomy the number is irrational — a decimal you can *write down* that the fraction world can never name.',
                  ],
                  answer: 'irrational — unbounded zero-runs defeat every period',
                },
                {
                  q: '(Exam-style) True or false: "if $x^2$ is rational then $x$ is rational." Justify with the sharpest example this lesson provides.',
                  solution: [
                    'Take $x = \\sqrt{2}$: then $x^2 = 2$, as rational as numbers come.',
                    'Now, this lesson proved $\\sqrt{2}$ is irrational — no fraction squares to 2.',
                    'So, the implication fails: $x^2$ rational with $x$ irrational.',
                    'Hence false. The correct one-way statement: $x$ rational $\\Longrightarrow x^2$ rational (closure of 7.2) — squaring cannot promote a rational to irrational, but it also cannot certify one.',
                  ],
                  answer: 'false — x = √2 has x² = 2 rational',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Bound the Śulbasūtra approximation: show $\\tfrac{577}{408}$ exceeds $\\sqrt{2}$ by less than $2.2 \\times 10^{-6}$, using $577^2 - 2 \\cdot 408^2 = 1$.',
                  solution: [
                    'Take the exact identity: $\\left(\\tfrac{577}{408}\\right)^2 - 2 = \\tfrac{1}{408^2} = \\tfrac{1}{166464}$ — the approximation squares to $2$ plus one part in $166\\,464$.',
                    'Now, factor the difference of squares: $\\left(\\tfrac{577}{408}\\right)^2 - (\\sqrt{2})^2 = \\left(\\tfrac{577}{408} - \\sqrt{2}\\right)\\left(\\tfrac{577}{408} + \\sqrt{2}\\right)$.',
                    'So, $\\tfrac{577}{408} - \\sqrt{2} = \\dfrac{1/166464}{\\tfrac{577}{408} + \\sqrt{2}}$ — and the denominator exceeds $\\tfrac{577}{408} > 1.41$ plus $\\sqrt{2} > 1.41$, so it exceeds $2.82$.',
                    'Hence the excess is less than $\\dfrac{1}{166464 \\times 2.82} < 2.14 \\times 10^{-6}$ — the script’s exact value: about $2.12 \\times 10^{-6}$. *Saviśeṣaḥ* indeed: a remainder of two-millionths.',
                  ],
                  answer: 'excess < 2.14 × 10⁻⁶ (exactly ≈ 2.12 × 10⁻⁶)',
                },
                {
                  q: 'The geometric descent: suppose a square has rational diagonal-to-side ratio $\\tfrac{p}{q}$ (reduced). Show that a *smaller* square has the same ratio — and conclude.',
                  solution: [
                    'Take the ratio $d/s = p/q$ reduced, and consider the standard construction: two copies of the square side by side, the diagonal of the doubled rectangle... concretely: inscribe the square of side $d$ tilted inside a square of side $s + d$? Use the self-similar dissection instead.',
                    'Now, place two unit-shape copies of the $s \\times s$ square and one $d \\times d$ square to form the classic "windmill": the tilted square of side $d$ cut by its diagonals yields four triangles congruent to half of the $s$-square, and reassembling the central $d$-square with two of the triangles yields a smaller square whose diagonal-to-side ratio is again $p/q$.',
                    'So, the halved pair is $(2q - p,\; p - q)$ — the new ratio is $\\tfrac{2q-p}{p-q}$, because the identity $(2q-p)^2 = 2(p-q)^2$ follows from $p^2 = 2q^2$ by expanding ($4q^2 - 4pq + p^2 - 2p^2 + 4pq - 2q^2 = 2q^2 - p^2 = 0$). Both components are positive and strictly smaller than $q$: $p^2 = 2q^2$ forces $q < p < 2q$ (so $2q - p < q$ and $p - q < q$).',
                    'Hence a reduced fraction would descend forever — impossible by well-ordering, the geometric twin of the parity contradiction. (The construction is the origin of the word "descent": the squares shrink, the integers shrink, the assumption collapses.)',
                  ],
                  answer: 'the same ratio in smaller integers — descent, impossible',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The dissection identity',
          latex: 'd = \\text{diagonal of the unit square}: \\quad d^{2} = 4 \\times \\tfrac{1}{2} = 2',
          note: 'Four half-squares tile the square on the diagonal — no Pythagoras needed.',
        },
        {
          kind: 'formula',
          name: 'The classical contradiction',
          latex: 'p^{2} = 2q^{2}, \\; \\gcd(p,q) = 1 \\;\\Longrightarrow\\; 2 \\mid p,\\; 2 \\mid q — \\text{contradiction}',
          note: 'Parity lemma: x² even ⟺ x even. The engine runs twice.',
        },
        {
          kind: 'formula',
          name: 'The general wall',
          latex: '\\sqrt{n} \\in \\mathbb{Q} \\;\\Longleftrightarrow\\; n = k^{2} \\;\\Longleftrightarrow\\; \\text{every prime exponent of } n \\text{ is even}',
          note: 'The FTA verdict: one odd exponent convicts.',
        },
        {
          kind: 'formula',
          name: 'The Śulbasūtra ladder',
          latex: '\\sqrt{2} \\approx 1 + \\tfrac{1}{3} + \\tfrac{1}{12} - \\tfrac{1}{408} = \\tfrac{577}{408}, \\quad \\left(\\tfrac{577}{408}\\right)^{2} = 2 + \\tfrac{1}{408^{2}}',
          note: 'Correct to 5 decimals; saviśeṣaḥ — inexact by design.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'The rational/irrational classification is a standing one-mark item everywhere: Khattar QA ch. 1 opens with exactly the sortgame — "which of $\\sqrt{2}, \\sqrt{9}, \\sqrt{25}, \\sqrt{7}$ is irrational" — whose honest engine is the exponent-parity test, and the exam classics ($\\sqrt{12}$, $\\sqrt{18}$, $\\sqrt{50}$ as surds to simplify) all lean on the census table. The classical proof itself is a two-to-three-mark theorem in every proof-oriented syllabus and a favourite assertion–reason item ("A: $\\sqrt{2}$ is irrational; R: a rational squared is rational" — both true, R does not explain A). The decimal-dichotomy contrapositive powers the "non-terminating non-repeating ⟹ irrational" shortcut that competitive exams use daily, and the $0.1010010001\\dots$ construction is the standard "give an irrational between any two rationals" answer.',
        },
        {
          kind: 'para',
          text: 'The wall stands, and one number has crossed it. But $\\sqrt{2}$ is not a loner — it is the first of a family. The same census that convicted $2$ convicts $3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17$ — and the roots of the survivors do not live apart from each other: they multiply, they reduce, they add in disciplined ways, and together they turn out to be the *majority* of the number line, not the exception. The next lesson draws the family portrait.',
        },
      ],
    },
    {
      id: 'ans-the-family-of-irrationals',
      number: '8.2',
      title: 'The Family of Irrationals',
      prerequisites: [
        'ans-the-diagonal-that-broke-the-rationals',
        'ans-fundamental-theorem-of-arithmetic',
        'ans-density-and-the-decimal-mirror-proven',
      ],
      sources: ['beck-geoghegan-art-of-proof', 'plato-theaetetus-theodorus', 'cantor-1874-algebraic-numbers', 'khattar-qa-4e'],
      concepts: [
        'Squarefree kernels: √n = k√s',
        'The product law √m·√n = √(mn)',
        'Surd reduction and like surds',
        'The trap √(a + b) ≠ √a + √b',
        '√2 + √3 irrational by the squeeze chain',
        'The k-th root criterion: perfect k-th powers',
        'Decimal names neither terminate nor repeat',
        'Countable rationals, unlistable irrationals (Cantor 1874)',
      ],
      objectives: [
        'Name every square root by its squarefree kernel — √n = k√s — and reduce any surd to canonical form',
        'Prove the product law √m·√n = √(mn) from positivity and uniqueness of square roots, and detect the classic √(a+b) trap',
        'Prove √2 + √3 irrational by the squeeze chain, and extend the wall to k-th roots via exponents mod k',
        'State Cantor’s 1874 countability theorem honestly: the rationals and all surds are listable; the irrationals as a whole are not',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'One proof built one wall; this lesson surveys everything behind it. Lesson 8.1 convicted $\\sqrt{2}$ — but the census table already condemned $3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17$ with the same stroke, and condemned them *individually*. Now the questions change character: not "is this root rational?" but "how do the irrational roots relate to *each other*?" They multiply by a clean law. They reduce to canonical names built from **squarefree kernels**. They refuse to add the way they multiply — and one famous sum ($\\sqrt{2} + \\sqrt{3}$) takes a genuinely clever argument. The same Fundamental-Theorem engine extends from square roots to cube roots and beyond. And at the end of the survey comes the strangest fact in the book so far: this whole family, infinite as it is, is *thinner* than the irrationals themselves — Cantor’s 1874 theorem, stated here in honest scope and proved on the Set Theory shelf.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Theodorus stops at 17 (Plato, Theaetetus 147d)',
          text: 'The general wall of 8.1 is modern convenience; history climbed the family one rung at a time. Plato’s dialogue *Theaetetus* (c. 369 BCE, at 147d) records the lesson of Theodorus of Cyrene: he proved — case by case — that the square roots of the non-square integers from $3$ up to $17$ feet are irrational, and *there he stopped*. His student Theaetetus then supplied the general theorem (our 8.1 wall) and the classification of higher surds. Why stop at 17? The reconstruction (Knorr’s): the odd–even techniques that dispatch $3, 5, 7, 11, 13, 15$ fail for the first time at $17 = 8 \\cdot 2 + 1$ — the case where parity gives no grip and something like the full FTA is genuinely needed. The lesson table below runs Theodorus’s twelve cases with modern machinery; the figure near the end draws the spiral that carries his name — a staircase of unit legs whose outer vertices sit at distances $\\sqrt{2}, \\sqrt{3}, \\dots, \\sqrt{17}$ from the origin.',
        },
        { kind: 'heading', text: 'A family portrait: squarefree kernels' },
        {
          kind: 'para',
          text: 'The 8.1 wall hid a *naming system*, and extracting it is the first business of the family portrait. Factor $n$ (chapter 4’s Fundamental Theorem) and split its prime exponents into even and odd parts: $n = k^2 \\cdot s$, where $k$ gathers every prime to half its exponent (rounded down) and $s$ keeps exactly the primes with odd exponents, each to the first power — the **squarefree kernel**. Then $\\sqrt{n} = \\sqrt{k^2 s} = k\\sqrt{s}$, because $k\\sqrt{s}$ squares to $k^2 s = n$ and is positive (8.1’s uniqueness of positive square roots, which the product law below secures in full). The squarefree kernel carries *all* the irrationality: $s = 1$ means $n$ was a perfect square and the root is rational; $s > 1$ means the root is irrational — and every irrational square root is just a whole-number multiple of one of the kernels $s = 2, 3, 5, 6, 7, 10, 11, 13, 14, 15, \\dots$. The family is indexed by the squarefree numbers.',
        },
        {
          kind: 'table',
          caption: 'The reduction dictionary: every √n splits as k√s with s squarefree. The kernel s carries the irrationality; k is a whole-number coat. Verified row by row in the run-60 verifier (section N2).',
          head: ['n', 'Factorization', 'k² · s', '√n as a family name'],
          rows: [
            ['$2$', '$2$', '$1 \\cdot 2$', '$\\sqrt{2}$'],
            ['$3$', '$3$', '$1 \\cdot 3$', '$\\sqrt{3}$'],
            ['$5$', '$5$', '$1 \\cdot 5$', '$\\sqrt{5}$'],
            ['$6$', '$2 \\cdot 3$', '$1 \\cdot 6$', '$\\sqrt{6}$'],
            ['$7$', '$7$', '$1 \\cdot 7$', '$\\sqrt{7}$'],
            ['$8$', '$2^{3}$', '$4 \\cdot 2$', '$2\\sqrt{2}$'],
            ['$10$', '$2 \\cdot 5$', '$1 \\cdot 10$', '$\\sqrt{10}$'],
            ['$11$', '$11$', '$1 \\cdot 11$', '$\\sqrt{11}$'],
            ['$12$', '$2^{2} \\cdot 3$', '$4 \\cdot 3$', '$2\\sqrt{3}$'],
            ['$13$', '$13$', '$1 \\cdot 13$', '$\\sqrt{13}$'],
            ['$14$', '$2 \\cdot 7$', '$1 \\cdot 14$', '$\\sqrt{14}$'],
            ['$15$', '$3 \\cdot 5$', '$1 \\cdot 15$', '$\\sqrt{15}$'],
            ['$17$', '$17$', '$1 \\cdot 17$', '$\\sqrt{17}$'],
            ['$18$', '$2 \\cdot 3^{2}$', '$9 \\cdot 2$', '$3\\sqrt{2}$'],
            ['$19$', '$19$', '$1 \\cdot 19$', '$\\sqrt{19}$'],
            ['$20$', '$2^{2} \\cdot 5$', '$4 \\cdot 5$', '$2\\sqrt{5}$'],
            ['$50$', '$2 \\cdot 5^{2}$', '$25 \\cdot 2$', '$5\\sqrt{2}$'],
            ['$75$', '$3 \\cdot 5^{2}$', '$25 \\cdot 3$', '$5\\sqrt{3}$'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the dictionary with an eye on the kernel column: only a handful of kernels appear below $18$ — $2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19$ — and the famous big roots fold onto small ones: $\\sqrt{50} = 5\\sqrt{2}$, $\\sqrt{75} = 5\\sqrt{3}$, $\\sqrt{98} = 7\\sqrt{2}$. The exam reflex "simplify the surd" is exactly this dictionary lookup, and the next law is what makes the lookup *legal* rather than lucky.',
        },
        { kind: 'heading', text: 'The product law' },
        {
          kind: 'para',
          text: 'The family multiplies by the cleanest law in the lesson: $\\sqrt{m} \\cdot \\sqrt{n} = \\sqrt{mn}$ for positive integers $m, n$. The proof is a two-beat argument about squares and positivity — no limits, no decimals, just the uniqueness of positive square roots that the dissection of 8.1 already made concrete.',
        },
        {
          kind: 'derivation',
          title: '√m · √n = √(mn) for all positive integers m, n',
          statement:
            'Claim: the product of the positive square roots of $m$ and $n$ is *the* positive square root of $mn$.',
          steps: [
            {
              label: 'Square the product',
              formula: '(\\sqrt{m} \\cdot \\sqrt{n})^{2} = \\sqrt{m}\\,\\sqrt{n}\\,\\sqrt{m}\\,\\sqrt{n} = (\\sqrt{m})^{2} (\\sqrt{n})^{2} = m\\,n',
              explanation:
                'Commutativity and associativity (the same laws chapter 7 proved for $\\mathbb{Q}$, here carried by the positive numbers these roots name) regroup the four factors so the roots annihilate in pairs. The product, squared, is exactly $mn$.',
            },
            {
              label: 'The product is positive',
              formula: '\\sqrt{m} > 0, \\; \\sqrt{n} > 0 \\;\\Longrightarrow\\; \\sqrt{m}\\sqrt{n} > 0',
              explanation:
                'Each root is a positive length (they are diagonals-and-sides of squares), and the product of positives is positive — chapter 6’s sign rules, now inhabited.',
            },
            {
              label: 'Positive square roots are unique',
              formula: '0 < a < b \\;\\Longrightarrow\\; b^{2} - a^{2} = (b-a)(b+a) > 0 \\;\\Longrightarrow\\; a^{2} \\ne b^{2}',
              explanation:
                'Two *distinct* positive numbers cannot share a square: if $a < b$ then both factors $b - a$ and $b + a$ are positive, so $b^2 > a^2$. So a positive number with square $mn$ is unique.',
            },
            {
              label: 'Conclude',
              formula: '\\sqrt{m}\\sqrt{n} \\text{ is positive and squares to } mn \\;\\Longrightarrow\\; \\sqrt{m}\\sqrt{n} = \\sqrt{mn}',
              explanation:
                'Both $\\sqrt{m}\\sqrt{n}$ and $\\sqrt{mn}$ are positive square roots of $mn$; uniqueness fuses them into one number. The verifier certified the law numerically at 24-place precision for all $m, n \\le 40$, and *exactly* in the special case $\\sqrt{k^2 s} = k\\sqrt{s}$ for all $k, s \\le 30$ — the reduction dictionary is the product law read backwards.',
            },
          ],
          result:
            '√m·√n = √(mn): the family is closed under multiplication, and every dictionary row √(k²s) = k√s is this law applied to √(k²)·√s.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The trap: √(a + b) ≠ √a + √b',
          text: 'Multiplication distributes over addition; square roots do **not**. The counterexample is computed and famous: $\\sqrt{2} + \\sqrt{3}$ squared gives $5 + 2\\sqrt{6}$ (work it: $2 + 2\\sqrt{2}\\sqrt{3} + 3$), which is *not* $5$ — so $\\sqrt{2} + \\sqrt{3} \\ne \\sqrt{5}$. The verifier put a number on the gap: $\\sqrt{2} + \\sqrt{3} \\approx 3.1462643699419726$ while $\\sqrt{5} \\approx 2.236067977499789$. This is the standing competitive-exam trap in both directions: simplifying $\\sqrt{9 + 16}$ as $3 + 4 = 7$ (the true value is $5$), or "distributing" a root across a sum. Roots distribute over *products* (the law just proved) — never over sums.',
        },
        {
          kind: 'example',
          title: 'Reduce the famous surds, combine like surds, and catch the trap in both directions',
          steps: [
            'Take $\\sqrt{8}$: factor $8 = 2^3$ — odd exponent on 2 — kernel $2$, coat $2^1$: $\\sqrt{8} = 2\\sqrt{2}$.',
            'Now, the big ones the same way: $\\sqrt{12} = 2\\sqrt{3}$ ($12 = 4 \\cdot 3$), $\\sqrt{18} = 3\\sqrt{2}$ ($18 = 9 \\cdot 2$), $\\sqrt{50} = 5\\sqrt{2}$ ($50 = 25 \\cdot 2$), $\\sqrt{75} = 5\\sqrt{3}$ ($75 = 25 \\cdot 3$), $\\sqrt{98} = 7\\sqrt{2}$ ($98 = 49 \\cdot 2$).',
            'So, like surds combine like like terms — the kernel decides: $\\sqrt{2} + \\sqrt{8} + \\sqrt{18} = \\sqrt{2} + 2\\sqrt{2} + 3\\sqrt{2} = 6\\sqrt{2}$ (all three share kernel 2).',
            'Take the product law on the same three: $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$ exactly — multiplication *does* fuse, because $2 \\cdot 8 = 16$ is a perfect square.',
            'Now, the trap in both directions: $\\sqrt{2} + \\sqrt{8} \\ne \\sqrt{10}$ — the correct value is $3\\sqrt{2}$, whose square is $18$, not $10$. And $\\sqrt{2} + \\sqrt{3}$ stays as it stands: different kernels are *unlike* surds, no simpler name exists in the family.',
            'Hence the family grammar: reduce to $k\\sqrt{s}$, combine only equal kernels, multiply through the product law, and never distribute a root over a plus.',
          ],
        },
        {
          kind: 'para',
          text: 'One sum deserves more than grammar, because it proves the family keeps growing even under addition. Whether $\\sqrt{2} + \\sqrt{3}$ is *rational* is not settled by the reduction dictionary — unlike surds do not combine, but maybe some fraction names their sum anyway. The argument that settles it is worth studying as a move: assume the sum is rational and *algebraically push* until a convicted root appears on the wrong side of the equation.',
        },
        {
          kind: 'derivation',
          title: '√2 + √3 is irrational (the squeeze chain)',
          statement:
            'Claim: $r = \\sqrt{2} + \\sqrt{3}$ is not a ratio of integers.',
          steps: [
            {
              label: 'Assume the sum rational and square it',
              formula: 'r \\in \\mathbb{Q} \\;\\Longrightarrow\\; r^{2} = 2 + 2\\sqrt{2}\\sqrt{3} + 3 = 5 + 2\\sqrt{6}',
              explanation:
                'The binomial square (distributivity) plus the product law for the cross term: $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$. Nothing here assumes what is being proved — only that $r$ is a number with algebra laws.',
            },
            {
              label: 'Isolate √6 on one side',
              formula: '2\\sqrt{6} = r^{2} - 5 \\;\\Longrightarrow\\; \\sqrt{6} = \\frac{r^{2} - 5}{2}',
              explanation:
                'If $r$ is rational then $r^2$ is rational (7.2’s closure), $r^2 - 5$ is rational, and division by $2$ keeps it rational: the right side is a *fraction*. The assumption would drag $\\sqrt{6}$ into $\\mathbb{Q}$ with it.',
            },
            {
              label: 'But √6 is already convicted',
              formula: '6 = 2 \\cdot 3 \\;\\Longrightarrow\\; \\sqrt{6} \\notin \\mathbb{Q} \\quad \\text{(the 8.1 census: both exponents odd)}',
              explanation:
                'The census table of 8.1 condemned $6$ in one line — both prime exponents odd, not a perfect square. (Directly: $p^2 = 6q^2$ forces $3 \\mid p$ by squares mod 3, then $3 \\mid q$ — the run-60 verifier swept it.)',
            },
            {
              label: 'The contradiction closes the squeeze',
              formula: '\\sqrt{6} \\in \\mathbb{Q} \\;\\text{and}\\; \\sqrt{6} \\notin \\mathbb{Q} \\;\\Longrightarrow\\; \\text{the assumption fails} \\;\\Longrightarrow\\; \\sqrt{2} + \\sqrt{3} \\notin \\mathbb{Q}',
              explanation:
                'The assumption that the sum is rational squeezes $\\sqrt{6}$ into $\\mathbb{Q}$; the wall of 8.1 says it cannot be; reductio concludes. The same chain convicts $\\sqrt{2} + \\sqrt{5}$ (through $\\sqrt{10}$), $\\sqrt{3} + \\sqrt{5}$ (through $\\sqrt{15}$), and every sum of *distinct* squarefree-kernel roots — 8.3 sorts the whole behaviour into a table.',
            },
          ],
          result:
            '√2 + √3 is irrational: the assumption drags the convicted √6 into ℚ. Sums of unlike surds stay outside the fraction world.',
        },
        {
          kind: 'para',
          text: 'A word on what the chain does *not* say, because honesty about scope is the book’s habit: it does not say every sum of irrationals is irrational — $(\\sqrt{2}) + (-\\sqrt{2}) = 0$ and $(1 + \\sqrt{2}) + (1 - \\sqrt{2}) = 2$ land back in $\\mathbb{Q}$ happily. The squeeze chain works precisely when the *cross term* is a convicted root: square the alleged sum, and if the result isolates a known irrational, the sum is convicted too. Sums whose cross terms cancel ($\\sqrt{a}$ with $-\\sqrt{a}$) are exactly the ones that escape — the full sorting is lesson 8.3’s cargo.',
        },
        { kind: 'heading', text: 'Higher roots join the family' },
        {
          kind: 'para',
          text: 'The family portrait so far covers square roots; the Fundamental Theorem has no strong feelings about the exponent $2$. Run the same equation with $k$ in place of it: $p^k = n\\,q^k$. Now the exponent of any prime $r$ reads $k\\,e_r(p) = e_r(n) + k\\,e_r(q)$ on the two sides — so $e_r(n) = k(e_r(p) - e_r(q))$ is divisible by $k$. The wall generalizes: $\\sqrt[k]{n}$ is rational exactly when *every* prime exponent of $n$ is divisible by $k$ — when $n$ is a perfect $k$-th power.',
        },
        {
          kind: 'derivation',
          title: '√[k]{n} is rational exactly when n is a perfect k-th power',
          statement:
            'Claim: for integers $k \\ge 2$ and $n \\ge 1$, the equation $x^k = n$ has a rational solution if and only if $n = m^k$ for some integer $m$.',
          steps: [
            {
              label: '(⇐) Perfect k-th powers',
              formula: 'n = m^{k} \\;\\Longrightarrow\\; \\sqrt[k]{n} = m \\in \\mathbb{Z} \\subseteq \\mathbb{Q}',
              explanation:
                'The trivial direction again: $m^k = n$ exhibits the root. So $\\sqrt[3]{8} = 2$, $\\sqrt[3]{27} = 3$, $\\sqrt[3]{64} = 4$, $\\sqrt[4]{16} = 2$, $\\sqrt[4]{81} = 3$ — the cubes and fourth powers land inside $\\mathbb{Q}$.',
            },
            {
              label: '(⇒) Exponents read mod k',
              formula: 'p^{k} = n\\,q^{k} \\;\\Longrightarrow\\; e_{r}(n) = k\\,(e_{r}(p) - e_{r}(q)) \\equiv 0 \\pmod{k} \\quad \\text{for every prime } r',
              explanation:
                'Uniqueness of the factorization (chapter 4) matches the two sides prime by prime; the left side’s exponent $k\\,e_r(p)$ and $q$’s contribution $k\\,e_r(q)$ are both multiples of $k$, so the difference — which is exactly $e_r(n)$ — is a multiple of $k$. For $k = 2$ this is 8.1’s evenness; for $k = 3$ it says every exponent of $n$ is $0$ or $3$ or $6$, and so on.',
            },
            {
              label: 'Assemble the root',
              formula: 'n = \\prod_{r} r^{k \\cdot f_{r}} = \\left(\\prod_{r} r^{f_{r}}\\right)^{k} = m^{k}',
              explanation:
                'Divide each exponent by $k$: the result $m = \\prod r^{f_r}$ is an integer, and its $k$-th power rebuilds $n$ exactly. The verifier swept $k \\in \\{2, 3, 4\\}$ against $n \\le 200$ — brute fraction-search and the perfect-power test agree on every $n$, zero violations.',
            },
          ],
          result:
            '√[k]{n} is rational ⟺ n is a perfect k-th power. One prime exponent not divisible by k convicts the root — the FTA wall at every height.',
        },
        {
          kind: 'example',
          title: 'Run the k-th root census on the small integers',
          steps: [
            'Take cubes first: $\\sqrt[3]{2}$ — exponent of 2 is $1$, not divisible by 3 — irrational.',
            'Now, $\\sqrt[3]{4} = \\sqrt[3]{2^2}$: exponent $2$ mod 3 — irrational. $\\sqrt[3]{8} = \\sqrt[3]{2^3}$: divisible — rational, value $2$.',
            'So, more cubes: $\\sqrt[3]{9} = \\sqrt[3]{3^2}$ irrational; $\\sqrt[3]{16} = \\sqrt[3]{2^4}$: $4$ mod $3 \\ne 0$ — irrational; $\\sqrt[3]{25} = \\sqrt[3]{5^2}$ irrational; $\\sqrt[3]{27} = 3$ rational.',
            'Take fourths: $\\sqrt[4]{2}$ ($1$ mod 4) irrational; $\\sqrt[4]{8} = \\sqrt[4]{2^3}$ ($3$ mod 4) irrational; $\\sqrt[4]{16} = \\sqrt[4]{2^4} = 2$ rational.',
            'Hence the census habit: read each exponent mod $k$ — zero means rational, anything else convicts. Note $\\sqrt[3]{4} \\ne \\sqrt{4}$: different $k$, different verdicts, same FTA engine.',
          ],
        },
        { kind: 'heading', text: 'The decimal names of the family' },
        {
          kind: 'para',
          text: 'Chapter 7 proved the decimal dichotomy *both ways*: every rational expands as terminating or repeating (the mirror theorem), and every terminating-or-repeating expansion names a rational (the conversion theorem). Together they make a razor: **a number is rational if and only if its decimal terminates or repeats.** Every member of the family fails the test *by theorem* — no printout needed. The verifier computed each name to 15 places by BigInt integer Newton (squaring each result to confirm), and the table displays the truncated digits; the theorem behind them says these strings never terminate and never fall into a cycle, though no finite look can certify that — the wall of 8.1 and its generalizations do.',
        },
        {
          kind: 'table',
          caption: 'The family’s decimal names (computed exactly by BigInt integer Newton; truncated, not rounded — the run-60 verifier reproduced every row and squared each root back). By 7.3’s dichotomy, none of these strings ever terminates or repeats.',
          head: ['Root', 'Decimal name (15 places)', 'Kernel reading'],
          rows: [
            ['$\\sqrt{2}$', '$1.414213562373095\\dots$', '$1\\sqrt{2}$'],
            ['$\\sqrt{3}$', '$1.732050807568877\\dots$', '$1\\sqrt{3}$'],
            ['$\\sqrt{5}$', '$2.236067977499789\\dots$', '$1\\sqrt{5}$'],
            ['$\\sqrt{6}$', '$2.449489742783178\\dots$', '$1\\sqrt{6} = \\sqrt{2}\\sqrt{3}$'],
            ['$\\sqrt{7}$', '$2.645751311064590\\dots$', '$1\\sqrt{7}$'],
            ['$\\sqrt{8}$', '$2.828427124746190\\dots$', '$2\\sqrt{2} = 2 \\times 1.4142135\\dots$'],
            ['$\\sqrt{10}$', '$3.162277660168379\\dots$', '$1\\sqrt{10}$'],
            ['$\\sqrt[3]{2}$', '$1.259921049894\\dots$', 'the first cube root — kernel $2$ at height 3'],
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Two families of names, one line',
          text: 'Set the two tables of this book side by side. Chapter 7’s mirror table ($\\tfrac{1}{7} = 0.\\overline{142857}$, $\\tfrac{1}{12} = 0.08\\overline{3}$, …) showed the rationals writing themselves in endings and cycles; this lesson’s table shows the family writing itself in strings that do neither. The two name-systems interleave on the number line — between any two of chapter 7’s names lie members of this lesson’s family and vice versa (7.3’s density works from both sides, as 8.1’s ladder already showed). The figure below draws the interleave: rational ticks and surd ticks alternating on one line, with no two of them equal — 8.1’s trichotomy, made visible.',
        },
        {
          kind: 'figure',
          caption:
            'The family line on [0, 5]: rational anchors (filled dots — 1, 2, 3, 4) interleave with the surd family (open amber circles — √2, √3, √5, √6, √7, √8, √10, √11, √12, √13, √14, √15, √17) at their computed positions (x = 60 + 80·value). Every amber ring is a hole in ℚ — and 7.3’s density says both families pack together with no gaps between neighbours.',
          svg: `<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The number line from zero to five with rational anchors one two three four as filled dots interleaved with surd family members root two through root seventeen as open amber circles at their computed positions">
  <line x1="40" y1="88" x2="480" y2="88" stroke="currentColor" stroke-width="1.2"/>
  ${(function () {
    const FX = (v: number) => 60 + 80 * v
    const ticks: [string, number, boolean][] = [
      ['1', 1, false],
      ['√2', Math.SQRT2, true],
      ['√3', Math.sqrt(3), true],
      ['2', 2, false],
      ['√5', Math.sqrt(5), true],
      ['√6', Math.sqrt(6), true],
      ['√7', Math.sqrt(7), true],
      ['√8', Math.sqrt(8), true],
      ['3', 3, false],
      ['√10', Math.sqrt(10), true],
      ['√11', Math.sqrt(11), true],
      ['√12', Math.sqrt(12), true],
      ['√13', Math.sqrt(13), true],
      ['√14', Math.sqrt(14), true],
      ['√15', Math.sqrt(15), true],
      ['4', 4, false],
      ['√17', Math.sqrt(17), true],
    ]
    return ticks
      .map(([lab, v, surd], i) => {
        const x = +FX(v).toFixed(1)
        const above = i % 2 === 0
        const ly = above ? 70 : 108
        const ty1 = above ? 82 : 94
        const ty2 = above ? 94 : 82
        const dot = surd
          ? `<circle cx="${x}" cy="88" r="4" fill="none" stroke="#ea580c" stroke-width="1.8"/>`
          : `<circle cx="${x}" cy="88" r="3.4" fill="currentColor"/>`
        return `<line x1="${x}" y1="${ty1}" x2="${x}" y2="${ty2}" stroke="${surd ? '#ea580c' : 'currentColor'}" stroke-width="1.2"/>${dot}<text x="${x}" y="${ly}" font-size="10.5" text-anchor="middle" fill="${surd ? '#ea580c' : 'currentColor'}" font-weight="${surd ? '700' : '400'}">${lab}</text>`
      })
      .join('\n  ')
  })()}
  <line x1="60" y1="80" x2="60" y2="96" stroke="currentColor" stroke-width="1.4"/>
  <text x="60" y="128" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.85">0</text>
  <line x1="460" y1="80" x2="460" y2="96" stroke="currentColor" stroke-width="1.4"/>
  <text x="460" y="128" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.85">5</text>
  <text x="480" y="34" font-size="11" fill="#ea580c" text-anchor="end">open rings: the surd family — holes in ℚ</text>
  <text x="480" y="50" font-size="11" fill="currentColor" opacity="0.8" text-anchor="end">filled dots: the rational anchors between them</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The spiral earns its own figure because it is the family drawn as one continuous construction — and because it carries the history. Start at the origin, walk one unit right, turn $90^\\circ$, walk one unit: the diagonal of that first unit square is $\\sqrt{2}$ from the origin. Attach another unit leg perpendicular to $\\sqrt{2}$: the new hypotenuse is $\\sqrt{3}$. Keep attaching: each step adds a unit leg perpendicular to the current reach, and the outer vertices sit at distances $\\sqrt{2}, \\sqrt{3}, \\sqrt{4}, \\dots, \\sqrt{17}$ — Theodorus’s whole census, wound into a spiral. The run-60 verifier checked the construction edge by edge: every outer segment measures $1$ unit (that is the unit leg), every vertex sits at its promised radius, and the total winding after $16$ steps comes to about $351^\\circ$ — the spiral nearly closes on itself just as it reaches $\\sqrt{17}$, the exact rung where Theodorus’s own proof stopped.',
        },
        {
          kind: 'figure',
          caption:
            'The Spiral of Theodorus: sixteen unit legs, each perpendicular to the reach before it, wind the family √2, √3, …, √17 around the origin (scale 32 px per unit; vertices computed from rₖ = √(k+1), θₖ = Σ arctan(1/√j)). The outer edge of each triangle is exactly 1 unit; the winding reaches ≈ 351° at √17 — nearly one full turn, and the historical stopping point.',
          svg: `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The spiral of Theodorus with sixteen unit legs winding outward to root seventeen, each triangle labelled by its hypotenuse square root">
  ${(function () {
    const ORX = 255
    const ORY = 150
    const SC = 32
    let ang = 0
    let prev = { x: ORX + SC, y: ORY }
    const polys: string[] = []
    const labels: string[] = []
    for (let k = 1; k <= 16; k++) {
      ang += Math.atan(1 / Math.sqrt(k))
      const r = Math.sqrt(k + 1) * SC
      const x = ORX + r * Math.cos(ang)
      const y = ORY - r * Math.sin(ang)
      const fill = k % 2 === 1 ? 'rgba(15,118,110,0.07)' : 'rgba(180,83,9,0.07)'
      polys.push(
        `<polygon points="${ORX},${ORY} ${prev.x.toFixed(1)},${prev.y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}" fill="${fill}" stroke="currentColor" stroke-width="1.1"/>`
      )
      const lr = r + 13
      const lx = ORX + lr * Math.cos(ang)
      const ly = ORY - lr * Math.sin(ang)
      labels.push(
        `<text x="${lx.toFixed(1)}" y="${(ly + 3.5).toFixed(1)}" font-size="9.5" text-anchor="middle" fill="${k % 2 === 1 ? 'currentColor' : '#ea580c'}" font-weight="600">√${k + 1}</text>`
      )
      prev = { x, y }
    }
    return polys.join('\n  ') + '\n  ' + labels.join('\n  ')
  })()}
  <circle cx="255" cy="150" r="2.4" fill="currentColor"/>
  <text x="255" y="170" font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.8">origin</text>
  <text x="480" y="24" font-size="11" fill="currentColor" opacity="0.75" text-anchor="end">each outer edge = 1 unit leg</text>
  <text x="480" y="40" font-size="11" fill="currentColor" opacity="0.75" text-anchor="end">winding ≈ 351° at √17 — Theodorus’ stop</text>
</svg>`,
        },
        { kind: 'heading', text: 'How many are they? The countability conversation' },
        {
          kind: 'para',
          text: 'The family looks endless, and it is — but *how endless* separates mathematical infinities, and this is the one place the book lifts its eyes from constructions to the size of collections themselves. Start from the small end: the **rationals are listable**. Not "countable" as a slogan — constructively listable, by a scheme a reader could run by hand: enumerate reduced fractions $a/b$ row by row, where row $s$ holds every reduced pair with $|a| + b = s$ — row 1: $0$; row 2: $1, -1$; row 3: $2, -2, \\tfrac{1}{2}, -\\tfrac{1}{2}$; row 4: $3, -3, \\tfrac{1}{3}, -\\tfrac{1}{3}$; and so on. Every reduced fraction has $|a| + b$ equal to *some* finite $s$, so it appears in row $s$ — the list reaches everything, each name exactly once. The run-60 verifier ran the scheme to $s \\le 40$ and confirmed: $979$ names, zero duplicates, zero misses. The surds are thinner still — one name per squarefree kernel times a coat — a listable family inside a listable family.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Cantor 1874: the irrationals cannot be listed',
          text: 'Georg Cantor’s first set-theory paper — "On a Property of the Class of All Real Algebraic Numbers" (*Journal für die reine und angewandte Mathematik*, vol. 77, 1874, pp. 258–262) — proved two things at once: (i) the **algebraic numbers** — every root of every integer-coefficient polynomial, which includes *all* of chapter 7’s rationals *and all* of this lesson’s surds at every height $k$ — can be listed; (ii) the **real numbers cannot be** (by his intricate interval argument — not the 1891 diagonal trick, which came later and easier). Put together: the irrationals, the complement of a listable set inside an unlistable one, are *unlistable too* — the overwhelming majority of the line. And notice what this book has honestly banked: two named transcendental irrationals — $\\pi$ (Lambert, 1761) and $e$ (Hermite, 1873) — sit outside every surd construction of this lesson, and Cantor’s theorem says most irrationals are like them, far beyond any algebraic formula. The proofs live on the Set Theory shelf; here the census-shaped fact is banked: *every* family this book can construct is listable, and what fills the line exceeds all of them.',
        },
        {
          kind: 'para',
          text: 'Honesty requires one more scope note: nothing above *names* a single unlistable irrational — that is the strange strength of Cantor’s argument. It proves the majority exists by exhausting every possible list, not by exhibiting a specimen (the $0.1010010001\\dots$ construction of 8.1’s exercises is a named irrational, but naming one was never the hard part — Cantor’s theorem is about the *size* of the whole). For a book built on constructions, the lesson lands best as a boundary marker: chapters 1 through 8 built ℕ, ℤ, ℚ and the surd family, all listable; the real line that 8.4 assembles holds strictly more than every construction in this run of chapters combined.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Squarefree kernel',
              def: 'For n = k²·s with s squarefree (no prime squared divides it), s carries all of √n’s irrationality: √n = k√s. The family is indexed by the squarefree numbers 2, 3, 5, 6, 7, 10, …',
            },
            {
              term: 'Surd',
              def: 'An irrational root of a rational number, named as k√s (or k·√[k]{n} at height k): a whole-number coat on a squarefree kernel.',
            },
            {
              term: 'The product law',
              def: '√m·√n = √(mn) for positives — proved by squaring the product and invoking uniqueness of positive square roots. Reductions √(k²s) = k√s are this law read backwards.',
            },
            {
              term: 'Like surds',
              def: 'Surd names sharing one kernel (√2, 3√2, √8 = 2√2). Only like surds add — by collecting coats: √2 + √8 + √18 = 6√2. Unlike surds stay put.',
            },
            {
              term: 'The k-th root criterion',
              def: '√[k]{n} is rational ⟺ every prime exponent of n is divisible by k (n = m^k). The FTA wall at height k; ∛8 = 2 rational, ∛4 irrational.',
            },
            {
              term: 'The squeeze chain',
              def: 'To convict a surd sum: assume it rational, square, and isolate a convicted root — √2 + √3 rational would drag √6 = ((√2+√3)² − 5)/2 into ℚ. Contradiction closes.',
            },
            {
              term: 'Countable (listable)',
              def: 'A collection that some row-scheme lists one name at a time: the rationals (rows s = |a| + b, verified to 979 names with no dups or misses), the surds, and all algebraic numbers (Cantor 1874, part i).',
            },
            {
              term: 'Uncountable',
              def: 'Beyond every list. Cantor 1874 (part ii): the reals cannot be listed — so the irrationals, and mostly the transcendentals (π, e), form the unlistable majority of the line.',
            },
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: '$\\sqrt{12}$ simplifies to which family name?',
              options: [
                '$6\\sqrt{2}$',
                '$3\\sqrt{2}$',
                '$2\\sqrt{3}$',
                '$4\\sqrt{3}$',
              ],
              answer: 2,
              explain:
                '$12 = 4 \\cdot 3$: the square coat is $4$, the squarefree kernel is $3$ — so $\\sqrt{12} = 2\\sqrt{3}$ (the dictionary row). Option 1: $6\\sqrt{2}$ squares to $72$, not $12$. Option 2: $3\\sqrt{2}$ squares to $18$. Option 4: $4\\sqrt{3}$ squares to $48$. Every wrong option is a kernel/coat swap — square the name back to check: the coat squared times the kernel must return $12$.',
            },
            {
              q: '$\\sqrt{2} \\cdot \\sqrt{8} = ?$',
              options: [
                '$4$',
                '$\\sqrt{10}$',
                '$2\\sqrt{2}$',
                '$16$',
              ],
              answer: 0,
              explain:
                'The product law: $\\sqrt{2 \\cdot 8} = \\sqrt{16} = 4$ — a perfect square inside the family, so the product lands back in $\\mathbb{Q}$. Option 2 adds instead of multiplying (and even the *sum* is wrong: $\\sqrt{2} + \\sqrt{8} = 3\\sqrt{2}$, not $\\sqrt{10}$). Option 3 is $\\sqrt{8}$ itself, unmultiplied. Option 4 squares instead of rooting: the product is the *root* of $16$, not its square.',
            },
            {
              q: 'Which statement is the trap this lesson warns against?',
              options: [
                '$\\sqrt{6} = \\sqrt{2} \\cdot \\sqrt{3}$',
                '$\\sqrt{2} + \\sqrt{3} = \\sqrt{5}$',
                '$\\sqrt{8} = 2\\sqrt{2}$',
                '$\\sqrt[3]{8} = 2$',
              ],
              answer: 1,
              explain:
                'Roots distribute over products, never over sums: $(\\sqrt{2} + \\sqrt{3})^2 = 5 + 2\\sqrt{6} \\ne 5$, so the sum is $\\approx 3.146$, not $\\sqrt{5} \\approx 2.236$ — the standing exam trap. The other three are all true: option 1 is the product law ($2 \\cdot 3 = 6$); option 2-of-the-others is the dictionary row $8 = 4 \\cdot 2$; option 3-of-the-others is the cube census ($8 = 2^3$).',
            },
            {
              q: 'Which $n$ makes $\\sqrt[3]{n}$ rational?',
              options: [
                '$n = 2$',
                '$n = 4$',
                '$n = 9$',
                '$n = 8$',
              ],
              answer: 3,
              explain:
                '$8 = 2^3$: the exponent $3$ is divisible by $k = 3$ — a perfect cube, root $2$. The others fail the mod-3 test: $2 = 2^1$ ($1$ mod 3), $4 = 2^2$ ($2$ mod 3), $9 = 3^2$ ($2$ mod 3). Note $\\sqrt[3]{9}$ being irrational while $\\sqrt{9} = 3$ is rational is exactly the criterion doing its height-specific work — rationality of a root depends on $k$ matching the exponents.',
            },
            {
              q: 'What exactly did Cantor’s 1874 paper prove?',
              options: [
                'that the rationals cannot be listed',
                'that the algebraic numbers can be listed while the real numbers cannot — so the irrationals form the unlistable majority',
                'that √2’s digits never repeat',
                'that every irrational number is a surd',
              ],
              answer: 1,
              explain:
                'The 1874 paper ("On a Property of the Class of All Real Algebraic Numbers", Crelle vol. 77) proved listability of the algebraic numbers *and* unlistability of the reals — together they force the irrationals (mostly transcendentals like π and e) to be unlistable. Option 1 is false (the row scheme lists them). Option 3 is a theorem of *this* lesson via 7.3’s contrapositive, decades older in substance and not Cantor’s result. Option 4 is false in the strong direction: Cantor’s theorem says most irrationals are NOT surds — π and e are the named examples.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Reduce to $k\\sqrt{s}$: $\\sqrt{18}$, $\\sqrt{27}$, $\\sqrt{32}$.',
                  solution: [
                    'Take $18 = 9 \\cdot 2$: coat $3$, kernel $2$ — $\\sqrt{18} = 3\\sqrt{2}$.',
                    'Take $27 = 9 \\cdot 3$: coat $3$, kernel $3$ — $\\sqrt{27} = 3\\sqrt{3}$.',
                    'Take $32 = 16 \\cdot 2$: coat $4$, kernel $2$ — $\\sqrt{32} = 4\\sqrt{2}$.',
                    'Hence all three fold onto just two kernels — 2 and 3.',
                  ],
                  answer: '$3\\sqrt{2},\\; 3\\sqrt{3},\\; 4\\sqrt{2}$',
                },
                {
                  q: 'Compute $\\sqrt{2} \\cdot \\sqrt{3}$ and verify by squaring.',
                  solution: [
                    'Take the product law: $\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$.',
                    'Now, verify: $(\\sqrt{6})^2 = 6$, and indeed $\\sqrt{6} \\approx 2.4494897$ with $2.4494897^2 = 5.99999979\\dots \\approx 6$ — the 15-place table of this lesson squares back.',
                    'Hence $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$ — kernel $6$ is itself squarefree, so the product stays a surd.',
                  ],
                  answer: '$\\sqrt{6}$',
                },
                {
                  q: 'Which of $\\sqrt{4}, \\sqrt{9}, \\sqrt{16}, \\sqrt{20}$ are rational?',
                  solution: [
                    'Take the census: $4 = 2^2$, $9 = 3^2$, $16 = 2^4$ — all exponents even: rational, values $2, 3, 4$.',
                    'Take $20 = 2^2 \\cdot 5$: the 5 is odd — irrational ($\\sqrt{20} = 2\\sqrt{5}$).',
                    'Hence three of the four land in ℚ; one odd exponent convicts.',
                  ],
                  answer: '√4, √9, √16 rational; √20 irrational',
                },
                {
                  q: 'Evaluate $\\sqrt[3]{8}$, $\\sqrt[3]{27}$, $\\sqrt[3]{64}$.',
                  solution: [
                    'Take $8 = 2^3$: $\\sqrt[3]{8} = 2$.',
                    'Take $27 = 3^3$: $\\sqrt[3]{27} = 3$.',
                    'Take $64 = 2^6$: exponent $6$ divisible by $3$ — $\\sqrt[3]{64} = 2^2 = 4$.',
                    'Hence the cubes and higher perfect cubes all land in ℚ.',
                  ],
                  answer: '$2, \\; 3, \\; 4$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Reduce $\\sqrt{44}$, $\\sqrt{45}$, $\\sqrt{48}$, $\\sqrt{98}$.',
                  solution: [
                    'Take $44 = 4 \\cdot 11$: $\\sqrt{44} = 2\\sqrt{11}$.',
                    'Take $45 = 9 \\cdot 5$: $\\sqrt{45} = 3\\sqrt{5}$.',
                    'Take $48 = 16 \\cdot 3$: $\\sqrt{48} = 4\\sqrt{3}$.',
                    'Take $98 = 49 \\cdot 2$: $\\sqrt{98} = 7\\sqrt{2}$.',
                    'Hence each reduces to coat × kernel — the verifier checked all four rows exactly.',
                  ],
                  answer: '$2\\sqrt{11}, \\; 3\\sqrt{5}, \\; 4\\sqrt{3}, \\; 7\\sqrt{2}$',
                },
                {
                  q: 'Simplify $\\sqrt{2} + \\sqrt{8} + \\sqrt{18}$ completely.',
                  solution: [
                    'Reduce each: $\\sqrt{8} = 2\\sqrt{2}$, $\\sqrt{18} = 3\\sqrt{2}$ — all three share kernel $2$.',
                    'Now, collect the coats: $1\\sqrt{2} + 2\\sqrt{2} + 3\\sqrt{2} = 6\\sqrt{2}$.',
                    'So, verify: $(6\\sqrt{2})^2 = 72$, and $2 + 8 + 18 = 28 \\ne 72$ — the *sum* is not $\\sqrt{28}$; collection is addition of coats, not roots of sums.',
                    'Hence $\\sqrt{2} + \\sqrt{8} + \\sqrt{18} = 6\\sqrt{2}$ — like surds add like like terms.',
                  ],
                  answer: '$6\\sqrt{2}$',
                },
                {
                  q: 'Verify $(\\sqrt{2}\\sqrt{3})^2 = 6$ by expanding, and state which laws you used.',
                  solution: [
                    'Expand: $(\\sqrt{2}\\sqrt{3})^2 = \\sqrt{2}\\sqrt{3}\\sqrt{2}\\sqrt{3}$.',
                    'Now, regroup by commutativity–associativity: $= (\\sqrt{2}\\sqrt{2})(\\sqrt{3}\\sqrt{3}) = 2 \\cdot 3 = 6$.',
                    'So, the laws used: commutativity and associativity of multiplication — the same ones chapter 7 proved for ℚ, carried by these numbers.',
                    'Hence $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$ (positivity + uniqueness), the product law in one instance.',
                  ],
                  answer: '$6$ — commutativity, associativity, uniqueness of positive roots',
                },
                {
                  q: 'Sort by the mod-3 criterion: $\\sqrt[3]{3}$, $\\sqrt[3]{9}$, $\\sqrt[3]{16}$, $\\sqrt[3]{25}$.',
                  solution: [
                    'Take $3 = 3^1$: $1$ mod $3 \\ne 0$ — irrational.',
                    'Take $9 = 3^2$: $2$ mod $3$ — irrational.',
                    'Take $16 = 2^4$: $4$ mod $3 \\ne 0$ — irrational.',
                    'Take $25 = 5^2$: $2$ mod $3$ — irrational.',
                    'Hence none is a perfect cube — all four convicted. Contrast $\\sqrt{9}$ and $\\sqrt{16}$, which are rational: the same $n$, different $k$, different verdicts.',
                  ],
                  answer: 'all four irrational',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove $\\sqrt{6}$ is irrational directly (no product law), by the mod-3 engine.',
                  solution: [
                    'Suppose $p^2 = 6q^2$ reduced. Squares mod 3 are $\\{0, 1\\}$.',
                    'Now, $6q^2 \\equiv 0 \\pmod 3$, so $p^2 \\equiv 0 \\pmod 3$ — the only square divisible by 3 is 0, so $3 \\mid p$; write $p = 3r$.',
                    'So, $9r^2 = 6q^2$, i.e. $3r^2 = 2q^2$; the left side is divisible by 3, so $3 \\mid 2q^2$, and $\\gcd(3, 2) = 1$ — so $3 \\mid q^2$, forcing $3 \\mid q$.',
                    'Hence $3 \\mid p$ and $3 \\mid q$ — contradicting the reduction. $\\sqrt{6} \\notin \\mathbb{Q}$ (the verifier swept it: $6q^2$ is a square for no $q \\le 400$).',
                  ],
                  answer: '$\\sqrt{6}$ is irrational',
                },
                {
                  q: 'Prove $\\sqrt{2} + \\sqrt{5}$ is irrational by the squeeze chain.',
                  solution: [
                    'Suppose $r = \\sqrt{2} + \\sqrt{5} \\in \\mathbb{Q}$. Square: $r^2 = 2 + 2\\sqrt{10} + 5 = 7 + 2\\sqrt{10}$ (product law).',
                    'Now, isolate: $\\sqrt{10} = \\dfrac{r^2 - 7}{2}$ — a fraction, if $r$ is one.',
                    'So, but $\\sqrt{10}$ is convicted: $10 = 2 \\cdot 5$, both exponents odd — not a perfect square (the 8.1 wall).',
                    'Hence the assumption self-destructs: $\\sqrt{2} + \\sqrt{5} \\notin \\mathbb{Q}$. The chain convicts any sum of distinct-kernel square roots.',
                  ],
                  answer: '$\\sqrt{2} + \\sqrt{5}$ is irrational',
                },
                {
                  q: 'Uniqueness of the family name: suppose $k\\sqrt{s} = k\\prime\\sqrt{s\\prime}$ with $k, k\\prime$ positive integers and $s, s\\prime$ squarefree. Show $s = s\\prime$ and $k = k\\prime$.',
                  solution: [
                    'Square both sides: $k^2 s = k\\prime^2 s\\prime$ — an equality of integers (uniqueness of squares).',
                    'Now, consider any prime $r$ dividing $s$: it appears to an odd power ($1$) in $k^2 s$, since $k^2$ contributes only even powers.',
                    'So, the same must hold on the right: $r$ appears to an odd power there too — but $k\\prime^2$ contributes only even powers, so the oddness must come from $s\\prime$: $r \\mid s\\prime$.',
                    'Take the symmetric argument ($r \\mid s\\prime$ ⟹ $r \\mid s$): the two squarefree numbers share exactly their prime sets — being squarefree, $s = s\\prime$; then $k^2 = k\\prime^2$ with both positive gives $k = k\\prime$.',
                    'Hence the dictionary name $k\\sqrt{s}$ is canonical — each irrational square root has exactly one family name (the run-60 verifier swept the pairs).',
                  ],
                  answer: 's = s′ and k = k′ — the family name is unique',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) Compute $(\\sqrt{5} + \\sqrt{3})(\\sqrt{5} - \\sqrt{3})$ and interpret the result.',
                  solution: [
                    'Recognize the difference of squares: $(a+b)(a-b) = a^2 - b^2$ with $a = \\sqrt{5}$, $b = \\sqrt{3}$.',
                    'Now, expand: $= (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$ — the surds annihilate.',
                    'So, interpret: two *irrational* factors multiply to a rational — this is the conjugate trick, the standard tool for rationalizing denominators (FM banked the mechanics; here the family algebra explains why it works: the cross terms $+\\sqrt{15}$ and $-\\sqrt{15}$ cancel).',
                    'Hence the product is exactly $2$ — the verifier confirmed the BigInt identity to 15 places.',
                  ],
                  answer: '$2$ — conjugate surds multiply to a rational',
                },
                {
                  q: '(Exam-style) Without decimals, decide which is larger: $\\sqrt{7} + \\sqrt{3}$ or $\\sqrt{8} + \\sqrt{2}$.',
                  solution: [
                    'Both are positive, so compare squares: $(\\sqrt{7} + \\sqrt{3})^2 = 10 + 2\\sqrt{21}$; $(\\sqrt{8} + \\sqrt{2})^2 = 10 + 2\\sqrt{16} = 10 + 8 = 18$.',
                    'Now, the comparison reduces to $2\\sqrt{21}$ vs $8$: square again — $21$ vs $16$: $\\sqrt{21} > 4$, so $2\\sqrt{21} > 8$.',
                    'So, $(\\sqrt{7} + \\sqrt{3})^2 > (\\sqrt{8} + \\sqrt{2})^2$, and positivity lets the square comparison pass back: $\\sqrt{7} + \\sqrt{3}$ is larger.',
                    'Hence $\\sqrt{7} + \\sqrt{3} > \\sqrt{8} + \\sqrt{2}$ — the verifier certified the chain (√21 > 4 exact at 15 places). No decimal was evaluated.',
                  ],
                  answer: '$\\sqrt{7} + \\sqrt{3}$ is larger',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove $\\sqrt[3]{2}$ is irrational by reading exponents mod 3.',
                  solution: [
                    'Suppose $p^3 = 2q^3$ reduced. Read prime-2 exponents on both sides: $3\\,e_2(p) = 1 + 3\\,e_2(q)$.',
                    'Now, the left side and the second term are multiples of 3; so $1 = 3(e_2(p) - e_2(q))$ would make 1 a multiple of 3 — impossible.',
                    'So, no such integers exist: the equation has no solution at all, reduced or not (the verifier swept $q \\le 30$ with exact BigInt cubes).',
                    'Hence $\\sqrt[3]{2} \\notin \\mathbb{Q}$ — its decimal $1.259921049894\\dots$ (the table) neither terminates nor repeats, by 7.3’s dichotomy. The same three-line argument convicts $\\sqrt[3]{n}$ for every $n$ with some exponent not divisible by 3.',
                  ],
                  answer: '$\\sqrt[3]{2}$ is irrational — exponent 1 is not divisible by 3',
                },
                {
                  q: 'Cantor’s squeeze, argued honestly: given that (i) the rationals can be listed and (ii) the reals cannot, show the irrationals cannot be listed — and explain why this produces no named specimen.',
                  solution: [
                    'Suppose the irrationals *could* be listed: $x_1, x_2, x_3, \\dots$',
                    'Now, interleave that list with a list of the rationals (which (i) provides): alternate $r_1, x_1, r_2, x_2, \\dots$ — a single list containing every rational and every irrational, hence every real.',
                    'So, this contradicts (ii): the reals cannot be listed. The assumption dies — the irrationals are unlistable.',
                    'And the honesty note: no $x_i$ was ever *exhibited* — the argument is pure exhaustion of lists (if a list existed, a bigger list wouldn’t). Cantor’s 1874 proof likewise: it shows every list of reals misses a real without naming one. Existence without a specimen — the boundary marker this book banks before 8.4 builds the line.',
                  ],
                  answer: 'unlistable by interleaving; existence without a named specimen',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The kernel dictionary',
          latex: 'n = k^{2} s \\;(s \\text{ squarefree}) \\;\\Longrightarrow\\; \\sqrt{n} = k\\sqrt{s}',
          note: 'Every surd has one canonical family name; s carries the irrationality.',
        },
        {
          kind: 'formula',
          name: 'The product law',
          latex: '\\sqrt{m} \\cdot \\sqrt{n} = \\sqrt{mn} \\qquad (m, n > 0)',
          note: 'Uniqueness of positive square roots; never distribute over sums.',
        },
        {
          name: 'The k-th root criterion',
          latex: '\\sqrt[k]{n} \\in \\mathbb{Q} \\;\\Longleftrightarrow\\; k \\mid e_{r}(n) \\text{ for every prime } r',
          kind: 'formula',
          note: 'The FTA wall at height k: ∛8 = 2 in, ∛4 out.',
        },
        {
          kind: 'formula',
          name: 'The squeeze chain',
          latex: '(\\sqrt{2} + \\sqrt{3})^{2} = 5 + 2\\sqrt{6} \\;\\Longrightarrow\\; \\sqrt{2} + \\sqrt{3} \\notin \\mathbb{Q}',
          note: 'Assume rational, square, isolate a convicted root.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Surds are a fixed competitive-exam station, and this lesson is its grammar. Khattar QA ch. 1 drills the dictionary rows exactly ("simplify $\\sqrt{50}$, $\\sqrt{98}$, $\\sqrt{245}$"), the like-surds sums ($\\sqrt{2} + \\sqrt{8} + \\sqrt{18}$ type collections), and the conjugate products $(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})$ that rationalize denominators; bank and SSC papers ask the comparison pair ($\\sqrt{7}+\\sqrt{3}$ vs $\\sqrt{8}+\\sqrt{2}$) whose honest solution is the square-comparison chain; and the trap $\\sqrt{a+b} \\ne \\sqrt{a} + \\sqrt{b}$ is a standing assertion–reason favourite. The k-th root criterion powers the cube-root classification items, and the countability pair — rationals listable, reals not — is standard olympiad and first-year-university currency, usually stated with the 1874 date this lesson verified.',
        },
        {
          kind: 'para',
          text: 'The portrait is complete: every irrational square root carries one canonical name $k\\sqrt{s}$, the family multiplies by one law, adds only within kernels, extends to every height $k$ by the same Fundamental-Theorem engine, and writes itself in decimals that never close — a listable infinite family that Cantor’s theorem already outruns. What the portrait does *not* yet say is how these numbers *behave* in mixed company — $\\sqrt{2} + \\tfrac{1}{2}$, $3 \\cdot \\sqrt{2}$, $\\tfrac{\\sqrt{2}}{3}$: which arithmetic keeps the irrationality and which washes it away. That sorting, into a proved table, is lesson 8.3’s work — and then 8.4 fills the hole the whole chapter has been circling.',
        },
      ],
    },
    {
      id: 'ans-how-irrationals-behave',
      number: '8.3',
      title: 'How Irrationals Behave',
      prerequisites: [
        'ans-the-field-laws-division-joins-the-family',
        'ans-the-diagonal-that-broke-the-rationals',
        'ans-the-family-of-irrationals',
      ],
      sources: ['beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'The behaviour table: irrational under rational arithmetic',
        'Rational translation: x + q stays irrational',
        'Rational scaling: qx stays irrational (q ≠ 0)',
        'Both-ways cases: irrational ∘ irrational can land either side',
        'Closure: answers staying inside a number system',
        'The conjugate a − √b and the product (a+√b)(a−√b) = a²−b',
        'Rationalizing a surd denominator',
        'Decimal names preserved: never terminating, never repeating',
      ],
      objectives: [
        'Prove the two rational-move theorems — an irrational plus a rational is irrational, and a nonzero rational times an irrational is irrational — by two-line contradiction arguments that use only ℚ’s closure',
        'Sort the full behaviour table of rational-meets-irrational arithmetic into proved verdicts, and exhibit both outcomes for the two genuinely undecided rows (irrational + irrational, irrational × irrational)',
        'Rationalize any denominator of the form a + √b or √a + √b by the conjugate trick, with the guard a² ≠ b respected',
        'Explain why the decimal name of every moved, scaled or inverted irrational still neither terminates nor repeats — the 7.3 dichotomy doing new work',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'The family portrait ended with a question mark. We know the members ($k\\sqrt{s}$, one canonical name each), we know how they multiply (one law) and how they add among *themselves* (same kernel or never). But the numbers of this book do not live alone: a length of $\\sqrt{2}$ meets a margin of $\\tfrac{1}{2}$, a scale factor of 3, a division by 7. Chapter 7 built the rationals into a *field* — closed under addition, subtraction, multiplication and division by nonzero — so rational-meets-rational arithmetic never leaves home. What happens when one operand is a hole in that field? The question sounds open-ended. It is not: two short theorems settle everything except two honestly undecided rows, and those two rows are where all the examination traps live.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What closure bought us in chapter 7',
          text: 'A set is **closed** under an operation when every application of the operation lands back inside the set. Lesson 7.2 proved $\\mathbb{Q}$ closed under $+$, $-$, $\\times$ and $\\div$ (nonzero divisor): rational plus rational is rational, rational times rational is rational, and so on — no exceptions, ever. That closure is exactly what the proofs below will *weaponize*: to show a number is irrational, we will assume the opposite and let closure drag a rational out of it, contradicting what chapter 8 already proved. Closure, which looked like a bookkeeping property, turns out to be the engine of every classification argument in this lesson.',
        },
        { kind: 'heading', text: 'Rational moves never rescue an irrational' },
        {
          kind: 'para',
          text: 'Here is the surprise worth stating before proving: adding, subtracting, multiplying or dividing by a *rational* — any rational, positive or negative, whole or fractional — **cannot turn an irrational into a rational** (one harmless exception noted below). The irrationality is not fragile; it rides along. Two theorems, each a two-line contradiction, deliver the whole block.',
        },
        {
          kind: 'derivation',
          title: 'The translation theorem: x + q is irrational',
          statement:
            'Claim: for irrational $x$ and rational $q$, the sum $x + q$ is irrational — a two-line contradiction powered by $\\mathbb{Q}$’s closure.',
          steps: [
            {
              label: 'Assume the opposite',
              formula: 'x + q = r \\in \\mathbb{Q}',
              explanation:
                'Suppose, for contradiction, that the sum is rational. The plan is to drag $x$ itself into $\\mathbb{Q}$ and contradict the hypothesis.',
            },
            {
              label: 'Solve for x',
              formula: 'x = r - q',
              explanation:
                'Now, $r$ and $q$ are both rational, and $\\mathbb{Q}$ is closed under subtraction (lesson 7.2) — so the right side is rational.',
            },
            {
              label: 'Contradiction',
              formula: 'x \\in \\mathbb{Q} \quad \text{(against the hypothesis)}',
              explanation:
                'The irrational $x$ stands exposed as a rational difference. The assumption self-destructs — exactly the shape of the $\\sqrt{2}$ wall of 8.1, now run on an arbitrary $x$.',
            },
            {
              label: 'Collect subtraction too',
              formula: 'x - q = x + (-q), \quad -q \\in \\mathbb{Q}',
              explanation:
                'Hence $x + q \\notin \\mathbb{Q}$, and subtraction needs no new argument: subtracting a rational is adding its negative, and the negative of a rational is rational.',
            },
          ],
          result: 'For irrational $x$ and rational $q$: $x + q$ and $x - q$ are irrational.',
        },
        {
          kind: 'derivation',
          title: 'The scaling theorem: qx is irrational (q ≠ 0)',
          statement:
            'Claim: for irrational $x$ and **nonzero** rational $q$, the product $qx$ is irrational — and the same engine settles both division shapes.',
          steps: [
            {
              label: 'Assume the opposite',
              formula: 'qx = r \\in \\mathbb{Q}',
              explanation:
                'Suppose the scaled number is rational. As in the translation theorem, we solve for $x$ and let closure do the convicting.',
            },
            {
              label: 'Divide (legal since q ≠ 0)',
              formula: 'x = r \\div q \\in \\mathbb{Q}',
              explanation:
                'Now, rational divided by nonzero rational is rational (7.2 again) — so $x$ lands in $\\mathbb{Q}$, a contradiction.',
            },
            {
              label: 'The two division variants',
              formula: 'x \\div q = x \\cdot \\tfrac{1}{q}; \qquad \\tfrac{r}{x} = s \\Rightarrow x = r \\div s',
              explanation:
                'Hence $qx \\notin \\mathbb{Q}$. Dividing $x$ by $q$ is scaling by the rational $\\tfrac{1}{q}$ — same theorem. And if $\\tfrac{r}{x}$ (rational over irrational, $x \\ne 0$) were rational, then $x = r \\div \\tfrac{r}{x}$ would be a quotient of rationals — rational. Contradiction again.',
            },
            {
              label: 'The one exception',
              formula: 'q = 0: \quad qx = 0 \\in \\mathbb{Q}',
              explanation:
                'Zero is the only rational that cannot divide, so the guard $q \\ne 0$ is not decoration — it is the whole boundary. Zero times anything is zero, the one rational that every irrational can reach.',
            },
          ],
          result: 'For irrational $x$: $qx$, $x \\div q$ ($q \\in \\mathbb{Q},\\ q \\ne 0$) and $\\tfrac{r}{x}$ ($r \\in \\mathbb{Q},\\ x \\ne 0$) are all irrational.',
        },
        {
          kind: 'para',
          text: 'Cash the theorems on the anchor $x = \\sqrt{2}$. The translation theorem convicts $\\sqrt{2} + \\tfrac{1}{2}$, $\\sqrt{2} - 7$, $\\sqrt{2} + 3$ in one stroke each. The scaling theorem convicts $3\\sqrt{2}$, $-5\\sqrt{2}$, $\\tfrac{\\sqrt{2}}{3}$, $\\tfrac{7}{\\sqrt{2}}$ — and the kernel route double-checks two of them: $3\\sqrt{2} = \\sqrt{9} \\cdot \\sqrt{2} = \\sqrt{18}$ by the product law, and $18 = 2^1 \\cdot 3^2$ carries an odd exponent, so the 8.1 wall convicts it independently; $\\tfrac{\\sqrt{2}}{3}$ would force $2q^2 = (3p)^2$ if it equaled $\\tfrac{p}{q}$, and the left side has an odd power of 2 while $9p^2$ has an even one. Two engines, one verdict — the agreement is the point: the table below is not a set of memorized facts but a set of *provable* ones.',
        },
        {
          kind: 'table',
          caption: 'The behaviour table: how irrational company behaves under arithmetic. The top block is proved one-way; the bottom block honestly goes both ways.',
          head: ['Combination', 'Verdict', 'Why — the proof engine'],
          rows: [
            ['rational $+$ rational', 'always rational', '$\\mathbb{Q}$ closed under $+$ (7.2)'],
            ['irrational $+$ rational', 'always irrational', 'translation theorem: $x = (x+q) - q$'],
            ['irrational $-$ rational', 'always irrational', 'same, with $-q \\in \\mathbb{Q}$'],
            ['irrational $\\times$ rational ($q \\ne 0$)', 'always irrational', 'scaling theorem: $x = (qx) \\div q$'],
            ['irrational $\\div$ rational ($q \\ne 0$)', 'always irrational', 'scaling by $\\tfrac{1}{q}$'],
            ['rational $\\div$ irrational ($x \\ne 0$)', 'always irrational', 'would force $x = r \\div (r/x) \\in \\mathbb{Q}$'],
            ['irrational $+$ irrational', '**both ways**', '$\\sqrt{2} + \\sqrt{3}$ irrational; $\\sqrt{2} + (1-\\sqrt{2}) = 1$'],
            ['irrational $\\times$ irrational', '**both ways**', '$\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$ irrational; $\\sqrt{2} \\cdot \\sqrt{8} = 4$'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the table’s asymmetry honestly. The top six rows are a *one-way street*: rational company never rescues an irrational, because the field laws of $\\mathbb{Q}$ let you undo the move and drag the irrational out as a quotient or difference of rationals. The bottom two rows are different in kind, not just in verdict: there is **no theorem** that decides them, because the undoing move is unavailable — you cannot solve for one irrational operand in terms of rationals when the other operand is itself irrational. Each pair must be tried on its own evidence. That is not a weakness of the theory; it is a genuine mathematical fact, and the source of every classic trap.',
        },
        { kind: 'heading', text: 'The both-ways cases' },
        {
          kind: 'para',
          text: 'First direction: sums and products that *stay* irrational. Lesson 8.2 already proved $\\sqrt{2} + \\sqrt{3}$ irrational by the squeeze chain — assume it rational, square, and isolate $\\sqrt{6} = \\tfrac{r^2 - 5}{2}$, a convicted number. The product $\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$ (the product law) is irrational because 6 is not a perfect square — the 8.1 wall again. Second direction: sums and products that *wash out*. The construction is always the same and always delightful: **build the irrational out of the answer you want**. Want a rational sum? Take $\\sqrt{2}$ and $1 - \\sqrt{2}$ — the second is irrational (if it were rational, $\\sqrt{2} = 1 - (1-\\sqrt{2})$ would be too), yet the sum is exactly $1$. Want a rational product? Take $\\sqrt{2}$ and $\\sqrt{8}$: the product law collapses $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$.',
        },
        {
          kind: 'example',
          title: 'Decide, with proof: is $(2 + \\sqrt{3}) + (2 - \\sqrt{3})$ rational?',
          steps: [
            'First convince yourself both addends are irrational: if $2 + \\sqrt{3} = r \\in \\mathbb{Q}$ then $\\sqrt{3} = r - 2 \\in \\mathbb{Q}$, contradicting lesson 8.1; the conjugate $2 - \\sqrt{3}$ falls the same way.',
            'Now, add them: the $\\sqrt{3}$’s cancel and the integers combine — $(2 + \\sqrt{3}) + (2 - \\sqrt{3}) = 4$.',
            'Hence the sum of two irrationals is exactly $4$ — rational. The both-ways row is not a paradox; it is a *pair of exhibits*: this sum versus $\\sqrt{2} + \\sqrt{3}$.',
          ],
        },
        {
          kind: 'example',
          title: 'Decide, with proof: is $\\sqrt{2} \\cdot \\sqrt{8}$ rational? Is $\\sqrt{2} \\cdot \\sqrt{3}$?',
          steps: [
            'First product: combine under one root by the product law — $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$, rational (and positive: both factors positive, so the positive root is the right one).',
            'Second product: $\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$, again by the product law.',
            'Now, apply the 8.1 wall: $6 = 2 \\cdot 3$ is squarefree, not a perfect square, so $\\sqrt{6} \\notin \\mathbb{Q}$.',
            'Hence $\\sqrt{2} \\cdot \\sqrt{8}$ is rational and $\\sqrt{2} \\cdot \\sqrt{3}$ is irrational — same operation, same kind of operands, opposite verdicts. The conjugate product makes the contrast even sharper: $(\\sqrt{5} + \\sqrt{3})(\\sqrt{5} - \\sqrt{3}) = 5 - 3 = 2$ exactly, and even the *negative* rationals are reachable — $(1 + \\sqrt{2})(1 - \\sqrt{2}) = 1 - 2 = -1$.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Every rational move of √2 stays irrational. Translations sit on the lower row (√2 − 1 ≈ 0.4142 and √2 + 1 ≈ 2.4142 — the whole decimal tail rides along unchanged), scalings on the upper row (2√2 ≈ 2.8284, 3√2 ≈ 4.2426 — the point stretches away from 0 but never lands on a filled rational tick). Five amber rings, five holes in ℚ.',
          svg: `<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The number line from zero to five with integer ticks as filled dots and five open amber rings at root two minus one, root two, root two plus one, twice root two and three times root two at their computed positions">
  <line x1="40" y1="88" x2="480" y2="88" stroke="currentColor" stroke-width="1.2"/>
  ${(function () {
    const FX = (v: number) => 60 + 80 * v
    const ints: [string, number][] = [
      ['0', 0],
      ['1', 1],
      ['2', 2],
      ['3', 3],
      ['4', 4],
      ['5', 5],
    ]
    const intMarks = ints
      .map(([lab, v]) => {
        const x = +FX(v).toFixed(1)
        return `<line x1="${x}" y1="82" x2="${x}" y2="94" stroke="currentColor" stroke-width="1.2"/><circle cx="${x}" cy="88" r="3.2" fill="currentColor"/><text x="${x}" y="128" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.85">${lab}</text>`
      })
      .join('\n  ')
    // (label, value, label row: 'above' | 'below')
    const surds: [string, number, 'above' | 'below'][] = [
      ['√2−1', Math.SQRT2 - 1, 'below'],
      ['√2', Math.SQRT2, 'above'],
      ['√2+1', Math.SQRT2 + 1, 'below'],
      ['2√2', 2 * Math.SQRT2, 'above'],
      ['3√2', 3 * Math.SQRT2, 'above'],
    ]
    const surdMarks = surds
      .map(([lab, v, row]) => {
        const x = +FX(v).toFixed(1)
        const ly = row === 'above' ? 70 : 108
        const ty1 = row === 'above' ? 82 : 94
        const ty2 = row === 'above' ? 94 : 82
        return `<line x1="${x}" y1="${ty1}" x2="${x}" y2="${ty2}" stroke="#ea580c" stroke-width="1.2"/><circle cx="${x}" cy="88" r="4" fill="none" stroke="#ea580c" stroke-width="1.8"/><text x="${x}" y="${ly}" font-size="10.5" text-anchor="middle" fill="#ea580c" font-weight="700">${lab}</text>`
      })
      .join('\n  ')
    return intMarks + '\n  ' + surdMarks
  })()}
  <text x="480" y="34" font-size="11" fill="#ea580c" text-anchor="end">rings: rational moves of √2 — every one irrational</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The two standing traps',
          text: 'Trap one: "the sum of two irrationals is irrational" — **false as a law**, as $\\sqrt{2} + (1 - \\sqrt{2}) = 1$ and $(2 + \\sqrt{3}) + (2 - \\sqrt{3}) = 4$ attest; only the *proved* instances count. Trap two (carried from 8.2, now with teeth): $\\sqrt{a + b} \\ne \\sqrt{a} + \\sqrt{b}$ — for $a = b = 2$ the left side is $2$ while the right side is the irrational $2\\sqrt{2}$. In an assertion–reason item, a true assertion paired with a false reason is the standard both-ways bait: verify each half separately, never let one half vouch for the other.',
        },
        { kind: 'heading', text: 'Rationalizing the denominator' },
        {
          kind: 'para',
          text: 'School taught the move — "multiply top and bottom by the conjugate" — long before it could say why. Here is the honest version. A denominator like $\\sqrt{2} + 1$ is an irrational number, so dividing by it means dividing by $2.414213562373095\\dots$, an *infinite* decimal: any direct computation would truncate, and every truncated quotient is a rational approximation, not the number. The conjugate trick converts the division into an exact one: multiply the fraction by a cleverly chosen form of 1, chosen so the denominator collapses to a rational by the difference of squares. The **conjugate** of $a + \\sqrt{b}$ is $a - \\sqrt{b}$ — the same parts with the surd sign flipped — and their product is always rational: $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$. One multiplication, and the irrationality is evicted from the denominator (it moves to the numerator, where it is harmless — a multiplier, not a divisor).',
        },
        {
          kind: 'derivation',
          title: 'The rationalization identity',
          statement:
            'Claim: $\\tfrac{1}{a + \\sqrt{b}} = \\tfrac{a - \\sqrt{b}}{a^2 - b}$ whenever $a^2 \\ne b$ — the surd leaves the denominator by a difference of squares.',
          steps: [
            {
              label: 'Multiply by the conjugate over itself',
              formula: '\\tfrac{1}{a + \\sqrt{b}} \\cdot \\tfrac{a - \\sqrt{b}}{a - \\sqrt{b}} = \\tfrac{a - \\sqrt{b}}{(a + \\sqrt{b})(a - \\sqrt{b})}',
              explanation:
                'Setup: clear the surd from the denominator, with $a, b$ integers, $b > 0$ not a perfect square, and the guard $a^2 \\ne b$ in force. The multiplier is a form of 1 — the value is untouched.',
            },
            {
              label: 'The denominator is a difference of squares',
              formula: '(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - (\\sqrt{b})^2 = a^2 - b',
              explanation:
                'Now, the cross terms $+a\\sqrt{b}$ and $-a\\sqrt{b}$ annihilate, leaving only integers — an integer denominator.',
            },
            {
              label: 'Read off the identity',
              formula: '\\tfrac{1}{a + \\sqrt{b}} = \\tfrac{a - \\sqrt{b}}{a^2 - b}',
              explanation:
                'Hence the division is now exact rational arithmetic: a rational denominator, an irrational numerator where surds are harmless multipliers rather than divisors.',
            },
            {
              label: 'Why the guard matters',
              formula: 'a^2 = b \\Rightarrow \\sqrt{b} = |a|, \quad a + \\sqrt{b} \\in \\mathbb{Q}',
              explanation:
                'If $a^2 = b$ the "surd" denominator was rational all along (for $a = 2, b = 4$: the denominator is just 4), and the formula would divide by zero. The identity is honest exactly when the denominator was genuinely irrational.',
            },
          ],
          result: '$\\dfrac{1}{a + \\sqrt{b}} = \\dfrac{a - \\sqrt{b}}{a^2 - b}$ for $a^2 \\ne b$; the double-surden form $\\dfrac{1}{\\sqrt{a} + \\sqrt{b}} = \\dfrac{\\sqrt{a} - \\sqrt{b}}{a - b}$ for $a \\ne b$.',
        },
        {
          kind: 'example',
          title: 'Rationalize $\\dfrac{1}{\\sqrt{2} + 1}$ and give the first decimals of the answer',
          steps: [
            'Spot the conjugate: the denominator is $\\sqrt{2} + 1$, so multiply by $\\sqrt{2} - 1$ over itself.',
            'Now, the denominator collapses by the difference of squares: $(\\sqrt{2} + 1)(\\sqrt{2} - 1) = 2 - 1 = 1$ — a unit denominator.',
            'So, $\\tfrac{1}{\\sqrt{2} + 1} = \\sqrt{2} - 1$, and by the scaling theorem this is irrational (an irrational minus a rational).',
            'Hence the value is $0.414213562373095\\dots$ — the digits of $\\sqrt{2}$ with the integer part removed, an exact integer translation of the famous tail.',
          ],
        },
        {
          kind: 'example',
          title: 'Rationalize $\\dfrac{1}{\\sqrt{2} + \\sqrt{3}}$ and $\\dfrac{1}{2\\sqrt{3} - 3}$',
          steps: [
            'First denominator: two different surds. The conjugate of $\\sqrt{2} + \\sqrt{3}$ is $\\sqrt{3} - \\sqrt{2}$ (flip the sign of one surd), and $(\\sqrt{2} + \\sqrt{3})(\\sqrt{3} - \\sqrt{2}) = 3 - 2 = 1$.',
            'So, $\\tfrac{1}{\\sqrt{2} + \\sqrt{3}} = \\sqrt{3} - \\sqrt{2} = 0.317837245195\\dots$ — irrational (the squeeze chain of 8.2 proved this very difference irrational; here it arrives as a reciprocal).',
            'Now, the second: the conjugate of $2\\sqrt{3} - 3$ is $2\\sqrt{3} + 3$, and $(2\\sqrt{3} - 3)(2\\sqrt{3} + 3) = 12 - 9 = 3$.',
            'Hence $\\tfrac{1}{2\\sqrt{3} - 3} = \\tfrac{2\\sqrt{3} + 3}{3} = 2.154700538379\\dots$ — note the 3 stays in the denominator: rationalize does not mean "make everything an integer", only "make the *divisor* rational".',
          ],
        },
        { kind: 'heading', text: 'The decimal names follow their numbers' },
        {
          kind: 'para',
          text: 'Lesson 7.3 built the decimal mirror — every rational name terminates or repeats, every terminating-or-repeating name is rational — and 8.1 cashed the contrapositive: irrational numbers have names that never close. The behaviour table now extends the mirror through every rational move. Take $\\sqrt{2} = 1.41421356237309504880\\dots$ and move it: the names below *still* cannot terminate or repeat, because a terminating-or-repeating name would make its number rational, and the number’s irrationality is exactly what the two theorems preserve. For integer translations the tail even survives *digit for digit* — $\\sqrt{2} + 3$ and $\\sqrt{2} - 1$ carry the identical fractional tail $\\dots41421356237309504880\\dots$; scaling scrambles the digits ($5\\sqrt{2} = 7.071067811865475\\dots$) but not the character.',
        },
        {
          kind: 'table',
          caption: 'Decimal-name preservation: every rational move of √2 produces a name that neither terminates nor repeats. The "why" column is the proof engine, not a digit inspection.',
          head: ['Move of $\\sqrt{2}$', 'Name begins', 'Why it can never close'],
          rows: [
            ['$\\sqrt{2} + 3$', '$4.414213562373095\\dots$', 'translation theorem: closing would make $\\sqrt{2} = (\\text{name}) - 3$ rational'],
            ['$\\sqrt{2} - 1$', '$0.414213562373095\\dots$', 'same engine — and the tail is literally $\\sqrt{2}$’s own'],
            ['$5\\sqrt{2} = \\sqrt{50}$', '$7.071067811865475\\dots$', 'kernel route: $50 = 2^1 \\cdot 5^2$ — the 8.1 wall'],
            ['$\\sqrt{2} \\div 3$', '$0.471404520791031\\dots$', 'scaling theorem: closing would make $\\sqrt{2} = 3 \\cdot (\\text{name})$ rational'],
            ['$\\tfrac{1}{\\sqrt{2} + 1} = \\sqrt{2} - 1$', '$0.414213562373095\\dots$', 'rationalization + translation — an exact identity'],
          ],
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Behaviour table',
              def: 'The sorted verdicts of arithmetic on mixed company: rational-meets-irrational rows are one-way (always irrational, by the translation and scaling theorems); irrational-meets-irrational rows go both ways.',
            },
            {
              term: 'Closure',
              def: 'A set is closed under an operation when every application of the operation to members lands back in the set — ℚ is closed under +, −, × and ÷-by-nonzero (7.2), which is the engine of every "assume rational, undo the move" proof.',
            },
            {
              term: 'Rational translation',
              def: 'Adding (or subtracting) a rational to an irrational: the result is always irrational — x = (x + q) − q would otherwise land in ℚ.',
            },
            {
              term: 'Rational scaling',
              def: 'Multiplying an irrational by a nonzero rational (or dividing by one): the result is always irrational — x = (qx) ÷ q would otherwise land in ℚ. q = 0 is the sole exception (0·x = 0).',
            },
            {
              term: 'Both-ways case',
              def: 'An operation on two irrationals with no deciding theorem: irrational + irrational and irrational × irrational each have rational exhibits (√2 + (1−√2) = 1, √2·√8 = 4) and irrational exhibits (√2 + √3, √2·√3 = √6).',
            },
            {
              term: 'Conjugate',
              def: 'Of a + √b: the expression a − √b with the surd sign flipped. The product of conjugates is the rational a² − b — the engine of rationalization.',
            },
            {
              term: 'Rationalizing the denominator',
              def: 'Multiplying a fraction by a form of 1 (the conjugate over itself) so that a surd denominator collapses to a rational one by the difference of squares: 1/(a + √b) = (a − √b)/(a² − b), guarded by a² ≠ b.',
            },
            {
              term: 'Rationalizing factor',
              def: 'The specific form of 1 used: the conjugate of the denominator, chosen so the cross terms annihilate and only a² − b survives.',
            },
          ],
        },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: '$\\sqrt{2} + \\tfrac{1}{2}$ is:',
              options: ['rational', 'irrational', 'an integer', 'impossible to decide'],
              answer: 1,
              explain:
                'Translation theorem: if the sum were rational, then √2 = (sum) − ½ would be rational too — against lesson 8.1. It is not "impossible to decide": the two-line proof decides it.',
            },
            {
              q: '$3\\sqrt{2} \\cdot 5$ simplifies to:',
              options: ['$8\\sqrt{2}$', '$15\\sqrt{2}$', '$\\sqrt{30}$', '$15$'],
              answer: 1,
              explain:
                'Rationals collect in front: 3·5 = 15, so 15√2 = √450 (kernel 2 — irrational). 8√2 adds coefficients that should multiply; √30 pushes the 3 and 5 under the root illegally; and 15 would require the √2 to vanish — only q = 0 kills a surd.',
            },
            {
              q: 'Which statement is FALSE?',
              options: [
                '$\\sqrt{2} + (1 - \\sqrt{2}) = 1$',
                '$(\\sqrt{5} + \\sqrt{3})(\\sqrt{5} - \\sqrt{3}) = 2$',
                '$\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$',
                'The sum of two irrationals is always irrational',
              ],
              answer: 3,
              explain:
                'The first three are verified identities (R3 of this chapter’s script). The fourth is the classic both-ways trap: √2 + (1−√2) = 1 is itself the counterexample — and √2 + √3 shows the opposite verdict is also possible.',
            },
            {
              q: '$\\dfrac{1}{\\sqrt{3} + \\sqrt{2}}$ equals:',
              options: ['$\\sqrt{3} - \\sqrt{2}$', '$\\tfrac{\\sqrt{3} - \\sqrt{2}}{5}$', '$\\sqrt{3} + \\sqrt{2}$', '$\\tfrac{1}{\\sqrt{3}} - \\tfrac{1}{\\sqrt{2}}$'],
              answer: 0,
              explain:
                'Multiply by the conjugate √3 − √2: the denominator is (√3+√2)(√3−√2) = 3 − 2 = 1, so nothing survives below. Division does not split across a sum — the last option is the classic "split the fraction" error, and it is not even close (√3−√2 ≈ 0.3178 vs 1/√3 − 1/√2 ≈ −0.13).',
            },
            {
              q: '$x$ is irrational, $q$ is rational, and $x \\cdot q$ is rational. Then:',
              options: ['the only possibility is $q = 0$', 'it follows that $x$ is rational', 'it follows that $q$ is irrational', 'no such pair $x, q$ exists at all'],
              answer: 0,
              explain:
                'The scaling theorem says qx is irrational whenever q ≠ 0 — so a rational product forces q = 0 (and then the product is 0·x = 0). The pair does exist, which is why the last option fails; and x stays irrational throughout.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Classify each number as rational or irrational, with a one-line reason: (i) $2 + \\sqrt{3}$ (ii) $\\sqrt{3} \\cdot 6$ (iii) $\\sqrt{3} \\div 6$.',
                  solution: [
                    'Take each part against the two theorems of this lesson.',
                    '(i) $2 + \\sqrt{3}$: irrational plus rational — the translation theorem convicts it (if rational, $\\sqrt{3} = (\\text{it}) - 2 \\in \\mathbb{Q}$).',
                    '(ii) $\\sqrt{3} \\cdot 6 = 6\\sqrt{3}$: nonzero rational times irrational — the scaling theorem convicts it.',
                    '(iii) $\\sqrt{3} \\div 6$: division by a nonzero rational is scaling by $\\tfrac{1}{6}$ — same theorem, same verdict.',
                    'Hence all three are irrational; the kernel route confirms (ii): $6\\sqrt{3} = \\sqrt{108}$ and $108 = 2^2 3^3$ has an odd exponent on 3.',
                  ],
                  answer: 'all three irrational',
                },
                {
                  q: '(Exam-style) Collect and classify: $5\\sqrt{2} + 3\\sqrt{2} - \\sqrt{2}$.',
                  solution: [
                    'Collect the like surds (8.2’s rule — same kernel adds): $5 + 3 - 1 = 7$ coefficients of $\\sqrt{2}$.',
                    'So, $5\\sqrt{2} + 3\\sqrt{2} - \\sqrt{2} = 7\\sqrt{2}$.',
                    'Now, classify: $7\\sqrt{2}$ is a nonzero rational times an irrational — irrational by the scaling theorem.',
                    'Hence the expression equals $7\\sqrt{2} = \\sqrt{98}$, irrational ($98 = 2 \\cdot 7^2$ — odd exponent on 2).',
                  ],
                  answer: '$7\\sqrt{2}$, irrational',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: '(Exam-style) Rationalize $\\dfrac{1}{\\sqrt{5} - 2}$ and give four decimals.',
                  solution: [
                    'Spot the conjugate: $\\sqrt{5} + 2$ (sign flip), and multiply by it over itself.',
                    'Now, the denominator: $(\\sqrt{5} - 2)(\\sqrt{5} + 2) = 5 - 4 = 1$ — a unit denominator again.',
                    'So, $\\tfrac{1}{\\sqrt{5} - 2} = \\sqrt{5} + 2$.',
                    'Hence the value is $4.2360679\\dots$ — irrational (translation theorem: $\\sqrt{5}$ plus 2).',
                  ],
                  answer: '$\\sqrt{5} + 2 \\approx 4.2360679$',
                },
                {
                  q: '(Exam-style) Rationalize $\\dfrac{1}{2\\sqrt{2} + 3}$ — watch the sign.',
                  solution: [
                    'The conjugate is $2\\sqrt{2} - 3$, and $(2\\sqrt{2} + 3)(2\\sqrt{2} - 3) = 8 - 9 = -1$.',
                    'Now, the denominator lands *negative* — a rational, so the trick still works: $\\tfrac{1}{2\\sqrt{2} + 3} = \\tfrac{2\\sqrt{2} - 3}{-1} = 3 - 2\\sqrt{2}$.',
                    'So, the value is positive and about $0.171572875253\\dots$ (since $2\\sqrt{2} \\approx 2.828427124746$).',
                    'Hence $\\tfrac{1}{2\\sqrt{2} + 3} = 3 - 2\\sqrt{2} = 0.171572875253\\dots$, irrational — an exact identity, sign handled honestly.',
                  ],
                  answer: '$3 - 2\\sqrt{2} \\approx 0.171572875253$',
                },
                {
                  q: 'Decide with proof: is $\\dfrac{\\sqrt{3} + 1}{\\sqrt{3} - 1}$ rational?',
                  solution: [
                    'Rationalize first: multiply by the conjugate $\\sqrt{3} + 1$ over itself — $\\tfrac{(\\sqrt{3} + 1)^2}{(\\sqrt{3} - 1)(\\sqrt{3} + 1)} = \\tfrac{(\\sqrt{3} + 1)^2}{2}$.',
                    'Now, expand the numerator: $(\\sqrt{3} + 1)^2 = 3 + 2\\sqrt{3} + 1 = 4 + 2\\sqrt{3}$.',
                    'So, the fraction is $\\tfrac{4 + 2\\sqrt{3}}{2} = 2 + \\sqrt{3}$.',
                    'Hence the quotient equals $2 + \\sqrt{3}$ — irrational by the translation theorem. (A quotient of two irrationals, joining the both-ways family: this one lands irrational; $\\tfrac{\\sqrt{2}}{\\sqrt{8}} = \\tfrac{1}{2}$ lands rational.)',
                  ],
                  answer: 'irrational — it equals $2 + \\sqrt{3}$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The affine-map theorem, with its guard. For irrational $x$ and rationals $r, s$: decide exactly when $rx + s$ is irrational — exhibit the exceptional case first.',
                  solution: [
                    'Hunt the exception first: take $r = 0$, $s = 5$ — then $rx + s = 5$, rational. So the theorem cannot hold unconditionally; the guard must be $r \\ne 0$.',
                    'Now, prove the guarded statement. Suppose $rx + s = t \\in \\mathbb{Q}$ with $r \\ne 0$: subtract the rational $s$ to get $rx = t - s \\in \\mathbb{Q}$ (closure of $\\mathbb{Q}$ under $-$).',
                    'So, divide by $r$ — legal since $r \\ne 0$ — to exhibit $x = (t - s) \\div r \\in \\mathbb{Q}$, a contradiction. Hence $rx + s \\notin \\mathbb{Q}$ whenever $r \\ne 0$.',
                    'Hence: $rx + s$ is irrational for every $r \\ne 0$ (any $s$), and rational exactly in the collapsed case $r = 0$, where the expression is the constant $s$. The two theorems of this lesson are the special cases $s = 0$ and $r = 1$.',
                  ],
                  answer: 'irrational for every $r \\ne 0$ (the $r = 0$ case collapses to the rational constant $s$)',
                },
                {
                  q: 'Find every rational $q$ for which $q\\sqrt{2}$ is rational, and every rational $q$ for which $q\\sqrt{2} + q$ is rational.',
                  solution: [
                    'First question: the scaling theorem convicts every $q \\ne 0$, so $q\\sqrt{2} \\in \\mathbb{Q}$ forces $q = 0$ (and then $q\\sqrt{2} = 0$). Answer: $q = 0$ alone.',
                    'Now, rewrite the second expression: $q\\sqrt{2} + q = q(\\sqrt{2} + 1)$.',
                    'So, $\\sqrt{2} + 1$ is a fixed irrational (translation theorem), and we are asking when a rational multiple of a fixed irrational is rational.',
                    'Hence the same scaling engine answers: only $q = 0$ (giving 0). No nonzero rational coefficient can rescue an irrational — this is exactly the L3 guard from the affine theorem.',
                  ],
                  answer: 'only $q = 0$ in both questions',
                },
                {
                  q: 'The both-ways hunt. Exhibit irrational $a, b$ with: (i) $a + b$ rational; (ii) $a \\cdot b$ a *negative* rational; (iii) $a - b$ rational — and in each case prove $a$ and $b$ are both irrational.',
                  solution: [
                    '(i) $a = \\sqrt{2}$, $b = 1 - \\sqrt{2}$: $b$ is irrational (else $\\sqrt{2} = 1 - b \\in \\mathbb{Q}$), and $a + b = 1$ exactly.',
                    '(ii) $a = 1 + \\sqrt{2}$, $b = 1 - \\sqrt{2}$: both irrational by the translation theorem, and $a \\cdot b = 1 - 2 = -1$ (difference of squares).',
                    '(iii) $a = \\sqrt{2} + 1$, $b = \\sqrt{2}$: both irrational, and $a - b = 1$.',
                    'Hence each row of the both-ways block has a constructive exhibit — build the second irrational as (rational answer) minus or divided by the first.',
                  ],
                  answer: 'e.g. (√2, 1−√2), (1+√2, 1−√2), (√2+1, √2)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) Compute $(\\sqrt{3} + \\sqrt{2})^2 - (\\sqrt{3} - \\sqrt{2})^2$ and classify the result.',
                  solution: [
                    'Expand both squares: $(\\sqrt{3} + \\sqrt{2})^2 = 5 + 2\\sqrt{6}$ and $(\\sqrt{3} - \\sqrt{2})^2 = 5 - 2\\sqrt{6}$ (the cross terms $\\pm 2\\sqrt{6}$ differ only in sign).',
                    'Now, subtract: $(5 + 2\\sqrt{6}) - (5 - 2\\sqrt{6}) = 4\\sqrt{6}$ — the integers cancel, the surd doubles.',
                    'So, classify: $4\\sqrt{6}$ is a nonzero rational times an irrational — irrational by the scaling theorem (equivalently $4\\sqrt{6} = \\sqrt{96}$ with $96 = 2^5 \\cdot 3$, two odd exponents).',
                    'Hence the difference is exactly $4\\sqrt{6}$, irrational.',
                  ],
                  answer: '$4\\sqrt{6}$, irrational',
                },
                {
                  q: '(Exam-style) Which is larger: $\\dfrac{1}{\\sqrt{2} + 1}$ or $\\dfrac{1}{\\sqrt{2} - 1}$? Decide without decimals.',
                  solution: [
                    'Rationalize both: $\\tfrac{1}{\\sqrt{2} + 1} = \\sqrt{2} - 1$ (denominator $2 - 1$) and $\\tfrac{1}{\\sqrt{2} - 1} = \\sqrt{2} + 1$ (same denominator).',
                    'Now, compare the results: $\\sqrt{2} + 1$ versus $\\sqrt{2} - 1$ — the first exceeds the second by exactly 2.',
                    'So, $\\tfrac{1}{\\sqrt{2} - 1} > \\tfrac{1}{\\sqrt{2} + 1}$, with no decimal evaluated.',
                    'Hence the reciprocals of conjugate surds are conjugate surds themselves — and the smaller denominator carries the larger reciprocal.',
                  ],
                  answer: '$1/(\\sqrt{2} - 1) = \\sqrt{2} + 1$ is larger, by exactly 2',
                },
                {
                  q: 'Prove the last one-way row of the table: for rational $r$ and irrational $x \\ne 0$, the quotient $\\dfrac{r}{x}$ is irrational.',
                  solution: [
                    'Suppose $\\tfrac{r}{x} = s \\in \\mathbb{Q}$, aiming to drag $x$ into $\\mathbb{Q}$.',
                    'Now, rearrange: $x \\cdot s = r$, i.e. $x = r \\div s$.',
                    'So, if $s \\ne 0$ this exhibits $x$ as a quotient of rationals — rational, a contradiction. The remaining sub-case $s = 0$ would force $r = 0$ (from $x \\cdot s = r$); and when $r = 0$ the quotient is simply $0$, rational — so the row’s honest statement needs the guard $r \\ne 0$.',
                    'Hence for $r \\ne 0$ and irrational $x \\ne 0$: $\\tfrac{r}{x} \\notin \\mathbb{Q}$. (The scaling theorem in disguise: $\\tfrac{r}{x} = r \\cdot \\tfrac{1}{x}$, and $\\tfrac{1}{x}$ is irrational by the same argument applied with $r = 1$.)',
                  ],
                  answer: 'irrational for every $r \\neq 0$ (the $r = 0$ quotient is 0)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the decimal-name preservation theorem: if $x$’s decimal name neither terminates nor repeats, then for every rational $r \\ne 0$ the names of $x + r$ and $rx$ also neither terminate nor repeat.',
                  solution: [
                    'Recall the 7.3 dichotomy: a number is rational **if and only if** its decimal name terminates or repeats.',
                    'Now, suppose $x + r$ terminated or repeated. Then $x + r \\in \\mathbb{Q}$, so $x = (x + r) - r \\in \\mathbb{Q}$ by closure — and then $x$’s own name would terminate or repeat, against the hypothesis.',
                    'So, the same engine for the product: if $rx \\in \\mathbb{Q}$ then $x = (rx) \\div r \\in \\mathbb{Q}$ (legal, $r \\ne 0$) — again a contradiction.',
                    'Hence both moved names are non-terminating and non-repeating: the *character* of a decimal name is invariant under every nonzero rational move, even though the digits themselves may scramble. This is the table of this lesson read through 7.3’s mirror.',
                  ],
                  answer: 'both names stay open — by the dichotomy plus closure',
                },
                {
                  q: '(Exam-style, assertion–reason) Assertion: $\\sqrt{2} \\cdot \\sqrt{8}$ is rational. Reason: the product of two irrational numbers is always rational. Evaluate both halves.',
                  solution: [
                    'Check the assertion by the product law: $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$ — rational. The assertion is TRUE.',
                    'Now, check the reason against the counterexample: $\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{6}$, and 6 is not a perfect square, so this product of two irrationals is irrational. The reason is FALSE.',
                    'So, the verdict format: assertion true, reason false — the reason does not explain the assertion, and the pair must be marked exactly that way.',
                    'Hence the examination skill this lesson drills: never let a true half vouch for a false half — evaluate each statement on its own evidence.',
                  ],
                  answer: 'assertion TRUE (√16 = 4), reason FALSE (√2·√3 = √6 irrational)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Classify completely: for integers $a, b$ with $b > 0$ not a perfect square and $a^2 \\ne b$, when is $\\dfrac{a + \\sqrt{b}}{a - \\sqrt{b}}$ rational?',
                  solution: [
                    'Rationalize: multiply by the conjugate of the denominator, $\\tfrac{a + \\sqrt{b}}{a + \\sqrt{b}}$, giving $\\tfrac{(a + \\sqrt{b})^2}{a^2 - b} = \\tfrac{a^2 + b + 2a\\sqrt{b}}{a^2 - b}$.',
                    'Now, split: $\\tfrac{a^2 + b}{a^2 - b}$ is rational (an integer quotient, $a^2 \\ne b$ guards the division), and $\\tfrac{2a\\sqrt{b}}{a^2 - b}$ is a rational multiple of $\\sqrt{b}$.',
                    'So, by the scaling theorem the second term is irrational whenever $2a \\ne 0$ and $\\sqrt{b}$ is irrational — i.e. whenever $a \\ne 0$. An irrational plus a rational is irrational (translation), so the whole quotient is irrational for $a \\ne 0$.',
                    'Take the remaining case $a = 0$: the quotient is $\\tfrac{\\sqrt{b}}{-\\sqrt{b}} = -1$ — rational! Hence the classification: rational **only** for $a = 0$ (value $-1$); irrational for every $a \\ne 0$; and the case $a^2 = b$ is excluded because the denominator vanishes.',
                    'Hence the conjugate quotient hides exactly one rational point, sitting at the symmetric centre $a = 0$ — a both-ways row in miniature, classified completely.',
                  ],
                  answer: 'rational only when $a = 0$ (then the value is $-1$); irrational for every $a \\neq 0$',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'Rational translation',
          latex: 'x \\notin \\mathbb{Q},\\; q \\in \\mathbb{Q} \\;\\Longrightarrow\\; x + q \\notin \\mathbb{Q}',
          note: 'The rescue would force x = (x + q) − q back into ℚ.',
        },
        {
          kind: 'formula',
          name: 'Rational scaling',
          latex: 'x \\notin \\mathbb{Q},\\; q \\in \\mathbb{Q} \\setminus \\{0\\} \\;\\Longrightarrow\\; qx \\notin \\mathbb{Q}',
          note: 'Covers x÷q and r÷x by the same division move; q = 0 is the sole exception.',
        },
        {
          kind: 'formula',
          name: 'The rationalization identity',
          latex: '\\frac{1}{a + \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^{2} - b} \\qquad (a^{2} \\neq b)',
          note: 'Multiply by the conjugate over itself; the denominator becomes a difference of squares.',
        },
        {
          kind: 'formula',
          name: 'The conjugate product',
          latex: '(a + \\sqrt{b})(a - \\sqrt{b}) = a^{2} - b',
          note: 'Always rational for integer a, b — the engine under every rationalization.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'This lesson is the grammar behind an entire station of competitive arithmetic. Khattar QA ch. 1 drills exactly this territory: classify-the-number items ("$\\sqrt{2} + \\tfrac{1}{2}$ is rational or irrational?"), the coefficient collections ($5\\sqrt{2} + 3\\sqrt{2} - \\sqrt{2}$ type), and above all the rationalization set — $\\tfrac{1}{\\sqrt{5} - 2}$, $\\tfrac{1}{2\\sqrt{2} + 3}$, $\\tfrac{1}{\\sqrt{3} + \\sqrt{2}}$, each with its sign trap and its leftover integer denominator. Bank and SSC papers love the assertion–reason form of the both-ways traps ("the product of two irrationals is always rational" — false, with $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$ as the counterexample), and the conjugate-pair comparison ($1/(\\sqrt{2}-1)$ vs $1/(\\sqrt{2}+1)$) whose honest route is the rationalization you just learned. The scaling theorem’s $q = 0$ exception is a standing MCQ bait: "for what rational $q$ is $q\\sqrt{2}$ rational?" — answer: only zero.',
        },
        {
          kind: 'para',
          text: 'The behaviour is now fully sorted: rational company never rescues an irrational (proved, both directions, with the one honest exception $q = 0$), irrational company sometimes does and sometimes does not (exhibited, both ways, with constructions you can reproduce under exam pressure), denominators can always be rationalized by the conjugate (an identity, not a trick), and every decimal name involved stays open forever. One thing only is still missing — and it has been missing since 8.1 drew the two shores facing each other across the hole at $\\sqrt{2}$. The rationals behave; the irrationals behave; but the *line itself* still has a gap where no rational lives and no construction has yet placed a number. Lesson 8.4 fills the hole — not by finding a fraction that was hiding, but by changing what a number is allowed to be.',
        },
      ],
    },
    {
      id: 'ans-completeness-the-line-without-holes',
      number: '8.4',
      title: 'Completeness: the Line Without Holes',
      prerequisites: [
        'ans-the-diagonal-that-broke-the-rationals',
        'ans-the-family-of-irrationals',
        'ans-density-and-the-decimal-mirror-proven',
      ],
      sources: [
        'beck-geoghegan-art-of-proof',
        'dedekind-1872-stetigkeit',
        'cantor-1872-fundamental-sequences',
        'heine-1872-functionenlehre',
        'meray-1869-limites',
      ],
      concepts: [
        'The cut: a partition of ℚ into two classes',
        'Rational cuts produced two ways; irrational cuts produced by nothing',
        'Completeness: every cut produced by a real number',
        'The no-largest and no-smallest constructions on the shores',
        'Nested intervals: brackets whose widths shrink to zero',
        'The tower ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ as three closure repairs',
        'Density versus completeness: two different virtues',
        'The arithmetization of analysis (1872)',
      ],
      objectives: [
        'Define a cut of ℚ precisely, verify that the two shores of the √2 hole form one, and prove that neither class has a boundary member — the room-above and room-below constructions',
        'Distinguish rational cuts (produced by a rational, in two ways) from irrational cuts (produced by nothing in ℚ), and state Dedekind’s creation: the cut itself defines the missing number',
        'State the completeness property of ℝ informally and separate it from density, using ℚ — dense but not complete — as the witness pair',
        'Place the four number systems of the book as a tower of repairs — ℕ under + and ×, ℤ under −, ℚ under ÷, ℝ closing the holes — and say honestly what this book does not do (no Cauchy sequences, no suprema proofs; the analysis shelf owns those)',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Every lesson of this chapter has walked around the same hole. Lesson 8.1 proved the hole exists: the two shores $L = \\{r \\in \\mathbb{Q} : r^2 < 2 \\text{ or } r < 0\\}$ and $U = \\{r \\in \\mathbb{Q} : r > 0 \\text{ and } r^2 > 2\\}$ face each other with no rational between them. Lesson 8.2 catalogued the numbers that live in such holes — the family $k\\sqrt{s}$, named and law-abiding. Lesson 8.3 proved those numbers behave under arithmetic. What no lesson has yet done is *place* them: the line still has a gap, and everyone since the Greeks has known that "there is a length there" is geometry talk, not arithmetic talk. This lesson makes the arithmetic talk rigorous. The instrument is already on the table — the two shores, now called by their proper name: a **cut**. And the move is one of the most consequential in the history of mathematics: instead of hunting for a number at the seam, *define the cut itself to be the number*.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Dedekind in Zürich, 1858',
          text: 'Richard Dedekind (1831–1916), Gauss’s last student, was teaching the elements of differential calculus at the Polytechnic in Zürich when he hit the wall this lesson dismantles. The proofs of calculus lean on statements like "as $x$ grows, $f(x)$ approaches a limit" — and Dedekind found that the *limit* itself had no arithmetic definition: the theorems were leaning on geometric intuition about a line that had never been built out of numbers. On 24 October 1858 he succeeded in giving a purely arithmetic definition of continuity; he judged the idea not fruitful enough to publish and carried it in his notebooks for fourteen years. The booklet finally appeared in 1872 as *Stetigkeit und irrationale Zahlen* ("Continuity and Irrational Numbers", Braunschweig: Vieweg) — the same year, by coincidence, that Cantor and Heine published their own constructions of the real numbers. Dedekind has been called "a modern Eudoxus" for the resemblance between cuts and Eudoxus’s theory of proportion in Euclid’s *Elements* Book V — with the honest caveat that Eudoxus never made Dedekind’s boldest move: the postulate that *every* cut corresponds to a number.',
        },
        { kind: 'heading', text: 'The cut, defined' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Cut',
          text: 'A **cut** of the rationals is a pair of classes $(L, U)$ that together hold *every* rational, with each rational in exactly one class, both classes nonempty, and every member of $L$ strictly below every member of $U$: for all $l \\in L$ and $u \\in U$, $l < u$. Thus, the whole of $\\mathbb{Q}$ is split in two by an invisible knife — the left class $L$ and the right class $U$.',
        },
        {
          kind: 'para',
          text: 'Two examples fix the idea, one comfortable and one not. *A rational cut:* take $L = \\{r \\in \\mathbb{Q} : r \\le \\tfrac{3}{2}\\}$, $U = \\{r \\in \\mathbb{Q} : r > \\tfrac{3}{2}\\}$. Every rational lands on exactly one side; $\\tfrac{3}{2}$ itself is the largest member of $L$. The same split can be written with the boundary on the other side — $L = \\{r : r < \\tfrac{3}{2}\\}$, $U = \\{r : r \\ge \\tfrac{3}{2}\\}$ — where $\\tfrac{3}{2}$ is the *smallest* member of $U$. Dedekind’s remark: a rational produces its cut **in two ways**, knife-face down or knife-face up, and nothing in the cut machinery can tell you which face you chose. *An irrational cut:* take the two shores of 8.1 — $L = \\{r \\in \\mathbb{Q} : r^2 < 2 \\text{ or } r < 0\\}$ and $U = \\{r \\in \\mathbb{Q} : r > 0 \\text{ and } r^2 > 2\\}$. Every rational is in exactly one class (trichotomy on $r^2$, plus the fact — 8.1’s theorem — that $r^2 = 2$ never happens). But this cut has no boundary member *at all*: $L$ has no largest, $U$ has no smallest. The knife hangs in empty space.',
        },
        {
          kind: 'derivation',
          title: 'The lower shore has no largest member',
          statement:
            'Claim: in the irrational cut above, for every $r \\in L$ there is a bigger rational still in $L$ — so $L$ cannot have a maximum. The construction finds explicit "room above" any point of the lower class.',
          steps: [
            {
              label: 'The easy case r ≤ 0',
              formula: 'r \\le 0 \\Rightarrow r + 1 \\le 1, \\quad 1^2 = 1 < 2',
              explanation:
                'If $r$ is not positive, step up by a whole unit: $r + 1$ is at most $1$, whose square is $1 < 2$ — comfortably inside $L$, and strictly bigger than $r$.',
            },
            {
              label: 'The tight case 0 < r, r² < 2 — measure the room',
              formula: '\\delta = \\frac{2 - r^2}{2r + 1} > 0',
              explanation:
                'For a positive $r$ below the hole, the number $2 - r^2$ measures how much *square-room* remains; dividing by $2r + 1$ converts it into *length-room*. This $\\delta$ is rational whenever $r$ is.',
            },
            {
              label: 'Step up by δ and check the square',
              formula: '(r + \\delta)^2 = r^2 + 2r\\delta + \\delta^2 \\le r^2 + (2r + 1)\\delta = 2 \\quad (\\delta \\le 1)',
              explanation:
                'The expansion uses $\\delta^2 \\le \\delta$ (valid once $\\delta \\le 1$, which holds because $2 - r^2 < 2 \\le 2r + 1$ is *almost* the comparison — the capped step $\\min\\{1, \\delta\\}$ handles the rare flat case). The square lands at most at $2$ — and it cannot *equal* $2$, because $r + \\delta$ is rational and 8.1 proved no rational squares to $2$. So $(r+\\delta)^2 < 2$ strictly.',
            },
            {
              label: 'Conclude',
              formula: 'r < r + \\delta \\in L',
              explanation:
                'Hence every $r \\in L$ has a strictly bigger neighbour inside $L$: the class has no largest member. The grid-sweep in the chapter’s script runs this construction on every reduced rational with $|p| \\le 60$, $q \\le 12$ — no exceptions.',
            },
          ],
          result: 'The lower shore $L$ of the $\\sqrt{2}$ cut has no largest member; every point has rational room above it.',
        },
        {
          kind: 'derivation',
          title: 'The upper shore has no smallest member',
          statement:
            'Claim: for every $u \\in U$ there is a smaller rational still in $U$ — the mirror construction, measuring room *below*.',
          steps: [
            {
              label: 'Measure the room below',
              formula: '\\delta = \\frac{u^2 - 2}{2u + 1} > 0',
              explanation:
                'For $u \\in U$ (which forces $u > 0$), the excess $u^2 - 2$ is the square-room below the hole; dividing by $2u + 1$ converts to length-room.',
            },
            {
              label: 'Step down by δ and check the square',
              formula: '(u - \\delta)^2 = u^2 - 2u\\delta + \\delta^2 > u^2 - 2u\\delta \\ge u^2 - (u^2 - 2) \\cdot \\tfrac{2u}{2u + 1} > 2',
              explanation:
                'The last estimate uses $\\tfrac{2u}{2u + 1} < 1$, so the subtracted term is *strictly less* than the full excess $u^2 - 2$ — the square stays strictly above $2$. (Capping $\\delta$ at $1$ handles the far-away members of $U$; they have room to spare anyway.)',
            },
            {
              label: 'Conclude',
              formula: 'u - \\delta \\in U, \\quad u - \\delta < u',
              explanation:
                'Hence $U$ has no smallest member either. Both classes run right up to the seam and neither ever touches it — the arithmetic signature of a hole.',
            },
          ],
          result: 'The upper shore $U$ has no smallest member; the cut hangs boundary-free over the gap.',
        },
        {
          kind: 'example',
          title: 'Run both constructions by hand at the seam',
          steps: [
            'Take $r = \\tfrac{7}{5} = 1.4 \\in L$ (indeed $1.96 < 2$). The room-above step: $\\delta = \\tfrac{2 - \\tfrac{49}{25}}{\\tfrac{19}{5}} = \\tfrac{1/25}{19/5} = \\tfrac{1}{95}$, so $r’ = \\tfrac{7}{5} + \\tfrac{1}{95} = \\tfrac{134}{95}$ — a *fractional* neighbour still inside $L$.',
            'Check exactly: $\\left(\\tfrac{134}{95}\\right)^2 = \\tfrac{17956}{9025} < \\tfrac{18050}{9025} = 2$ — inside, by exactly $\\tfrac{94}{9025}$. The classes keep going where the boundary "should" be.',
            'Now, from above: take $u = 1.42 \\in U$ (indeed $2.0164 > 2$). The room-below step: $\\delta = \\tfrac{0.0164}{3.84} \\approx 0.00427$, so $u’ \\approx 1.41573$ — and $1.41573^2 \\approx 2.0042 > 2$: still inside $U$, strictly below $u$.',
            'Hence both shores can be walked toward the gap forever, in exact rational steps — the two derivations, cashed as arithmetic you can do on paper.',
          ],
        },
        {
          kind: 'para',
          text: 'Now the classification. A cut is **produced by** a rational $c$ if $c$ is the largest member of $L$ or the smallest member of $U$ — the knife-face situations of the $\\tfrac{3}{2}$ example. The two derivations above prove something stronger than a quirk of one example: *if a cut has no boundary member on either side, no rational can produce it* — for any candidate $c$, either $c \\in L$ and the room-above step exhibits a bigger member of $L$ (so $c$ is not the maximum), or $c \\in U$ and the room-below step exhibits a smaller member of $U$ (so $c$ is not the minimum). The $\\sqrt{2}$ cut is produced by *nothing in $\\mathbb{Q}$*. And here is Dedekind’s move, in his own arrangement of words: whenever a cut is produced by no rational number, **we create a new, irrational number, completely defined by this cut**. The cut *is* the number. Not a ghost at the seam — a full mathematical object: the entire infinite pair of classes, doing everything a number needs to do.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What "created" does and does not mean',
          text: 'The verb sounds mystical; the mathematics is austere. Creating $\\sqrt{2}$ as a cut does not conjure a point out of nothing — it *names a promise*: the promise of an object that sits above every member of $L$ and below every member of $U$, so that its order relations to every rational are fixed in advance. Arithmetic on cuts can then be *defined* (the sum of two cuts is the class of all sums, and so on) — work this book only points at, because the full algebra of cuts belongs to the analysis shelf. What this lesson owns is the ordering story: the cut pins the new number between every left rational and every right rational, which is exactly what "the diagonal has a length" always meant.',
        },
        { kind: 'heading', text: 'Completeness: the line without holes' },
        {
          kind: 'para',
          text: 'Dedekind’s postulate, stated informally but with its teeth intact: **every cut is produced by a real number** — one real number, and only one. For rational cuts the producing number is the boundary rational itself (in either knife-face reading). For the irrational cut of $\\sqrt{2}$, the producing number is the created cut-number. The system $\\mathbb{R}$ of all rationals and all cut-numbers therefore has a property $\\mathbb{Q}$ lacks: no cut of it dangles over empty space. That property is **completeness** — the no-holes property — and it is the single sentence on which the whole of analysis is later built (limits, sums of infinite series, the very theorems Dedekind was teaching in Zürich). Note carefully what completeness is *not*: it is not density. Density says the rationals pack with no adjacent pair; completeness says the line has no gaps. $\\mathbb{Q}$ is dense and *not* complete — the perfect witness pair, sitting one lesson apart in this very book.',
        },
        {
          kind: 'figure',
          caption:
            'The tower of number systems on the same axis [−3, 5]: ℕ counts 1, 2, 3, 4, 5 (this book keeps 0 out of ℕ — it joins with ℤ); ℤ repairs subtraction (3 − 5 = −2 now lives on the line); ℚ repairs division (3 ÷ 5 = 0.6 and every fraction crowds in — density); ℝ repairs the holes (the amber rings: √2, √3, π — every surd, every transcendental, every cut’s number). Four systems, one line, three repairs.',
          svg: `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four stacked number lines on the interval from minus three to five: the natural numbers as dots one through five; the integers adding zero and the negatives; the rationals as a dense crowd of fine ticks; and the reals as the same crowd plus amber rings at the square roots of two and three and at pi">
  ${(function () {
    const FX = (v: number) => 60 + 55 * (v + 3)
    const rows: [string, number][] = [
      ['ℝ', 44],
      ['ℚ', 104],
      ['ℤ', 164],
      ['ℕ', 224],
    ]
    const lineMarks = rows
      .map(([name, y]) => {
        const marks: string[] = []
        for (let v = -3; v <= 5; v++) {
          const x = +FX(v).toFixed(1)
          marks.push(`<line x1="${x}" y1="${y - 5}" x2="${x}" y2="${y + 5}" stroke="currentColor" stroke-width="1.1" opacity="0.7"/>`)
        }
        return `<text x="34" y="${y + 4}" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">${name}</text><line x1="60" y1="${y}" x2="500" y2="${y}" stroke="currentColor" stroke-width="1.2"/>${marks.join('')}`
      })
      .join('\n  ')
    // fine ticks for Q and R rows (every quarter unit) — the dense crowd
    const crowd = (y: number): string => {
      const t: string[] = []
      for (let k = -12; k <= 20; k++) {
        const v = k / 4
        const x = +FX(v).toFixed(1)
        t.push(`<line x1="${x}" y1="${y - 3.4}" x2="${x}" y2="${y + 3.4}" stroke="currentColor" stroke-width="0.7" opacity="0.45"/>`)
      }
      return t.join('')
    }
    // integer dots on the Z row (all), on the N row only 1..5
    const dotsZ = [-3, -2, -1, 0, 1, 2, 3, 4, 5]
      .map((v) => `<circle cx="${+FX(v).toFixed(1)}" cy="164" r="3" fill="currentColor"/>`)
      .join('')
    const dotsN = [1, 2, 3, 4, 5]
      .map((v) => `<circle cx="${+FX(v).toFixed(1)}" cy="224" r="3" fill="currentColor"/>`)
      .join('')
    // amber rings on the R row: sqrt2, sqrt3, pi — labels staggered
    const rings: [string, number, 'above' | 'below'][] = [
      ['√2', Math.SQRT2, 'above'],
      ['√3', Math.sqrt(3), 'below'],
      ['π', Math.PI, 'above'],
    ]
    const ringMarks = rings
      .map(([lab, v, row]) => {
        const x = +FX(v).toFixed(1)
        const ly = row === 'above' ? 26 : 62
        return `<circle cx="${x}" cy="44" r="4.4" fill="none" stroke="#ea580c" stroke-width="1.9"/><line x1="${x}" y1="38" x2="${x}" y2="50" stroke="#ea580c" stroke-width="1.1"/><text x="${x}" y="${ly}" font-size="10.5" text-anchor="middle" fill="#ea580c" font-weight="700">${lab}</text>`
      })
      .join('')
    // repair annotations between rows, left side
    const notes = [
      ['ℝ repairs the holes — every cut lands: √2, √3, π …', 74],
      ['ℚ repairs division — 3 ÷ 5 = 0.6; density arrives', 134],
      ['ℤ repairs subtraction — 3 − 5 = −2 joins', 194],
    ]
      .map(([t, y]) => `<text x="66" y="${y}" font-size="9.5" fill="#ea580c" opacity="0.95">${t}</text>`)
      .join('\n  ')
    return lineMarks + '\n  ' + crowd(104) + crowd(44) + '\n  ' + dotsZ + dotsN + '\n  ' + ringMarks + '\n  ' + notes
  })()}
  <text x="500" y="246" font-size="9.5" text-anchor="end" fill="currentColor" opacity="0.8">axis [−3, 5] — same scale on every row</text>
</svg>`,
        },
        {
          kind: 'table',
          caption: 'The four-repair ledger: each system is closed under more operations than the one below it, and each closure failure motivated the next storey of the tower. The last column is this lesson’s cargo.',
          head: ['System', 'Closed under + and ×', 'Closed under −', 'Closed under ÷ (nonzero)', 'No holes (complete)'],
          rows: [
            ['$\\mathbb{N}$', 'yes — chapter 1', 'no — $3 - 5$', 'no — $3 \\div 5$', 'no — gaps everywhere'],
            ['$\\mathbb{Z}$', 'yes', 'yes — chapter 6', 'no — $3 \\div 5$', 'no — gaps everywhere'],
            ['$\\mathbb{Q}$', 'yes', 'yes', 'yes — chapter 7', 'no — the $\\sqrt{2}$ cut'],
            ['$\\mathbb{R}$', 'yes', 'yes', 'yes', 'yes — every cut produced'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the ledger as the book’s whole arc in four rows. Chapter 1 built $\\mathbb{N}$ with closure under addition and multiplication — and nothing else. Chapter 6 repaired subtraction by constructing $\\mathbb{Z}$ (difference-pairs, the fortunes-and-debts picture). Chapter 7 repaired division by constructing $\\mathbb{Q}$ (fraction-pairs, the first field). This chapter repairs the *holes* by completing the line — and the honest surprise is that the repair is of a different kind: the first three repairs fixed closure *failures of arithmetic*, visible as equations without answers ($3 - 5$, $3 \\div 5$). The fourth fixes a failure of *the line itself* — visible not as an equation but as a cut produced by nothing. Four systems, four closure stories, one tower: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, each inclusion proper (each system genuinely larger — $-2$, $\\tfrac{3}{5}$, $\\sqrt{2}$ the resident witnesses).',
        },
        { kind: 'heading', text: 'Nested intervals: the brackets that close' },
        {
          kind: 'para',
          text: 'The squeeze ladder of 8.1 returns with a sharper reading. The brackets $[1.4, 1.5]$, $[1.41, 1.42]$, $[1.414, 1.415]$, $[1.4142, 1.4143]$, $\\dots$ are **nested intervals**: each contains the next, and the widths are $\\tfrac{1}{10}, \\tfrac{1}{100}, \\tfrac{1}{1000}, \\tfrac{1}{10000}, \\dots$ — shrinking to zero without end. Ask the uncomfortable question: what lives in *all* of them at once? Inside $\\mathbb{Q}$, the answer is *nothing* — a rational in every rung would be a rational squeezed to within $10^{-k}$ of $\\sqrt{2}$ for every $k$, hence equal to $\\sqrt{2}$ (two distinct rationals differ by at least $\\tfrac{1}{qq’}$), which 8.1 forbids. Inside $\\mathbb{R}$, the answer is *exactly one thing*: $\\sqrt{2}$, the number the cut created. This is the same completeness, seen from the chase side: every infinite narrowing hunt lands on exactly one point of the line, never on none. Heine’s 1872 construction of the reals — published the same year as Dedekind’s booklet, built from Weierstrass’s Berlin lectures — makes this the *definition*: a real number is a nested family of rational intervals whose widths shrink to zero. Two constructions, one line.',
        },
        {
          kind: 'example',
          title: 'Verify the nesting and the emptiness claim on the first rungs',
          steps: [
            'Nesting, by exact integer arithmetic: $1.4 \\le 1.41 \\le 1.414 \\le 1.4142 \\le 1.41421$ and $1.5 \\ge 1.42 \\ge 1.415 \\ge 1.4143 \\ge 1.41422$ — each rung sits inside its predecessor (the script checks all six rungs in BigInt).',
            'Each rung brackets the hole: $1.4^2 = 1.96 < 2 < 2.25 = 1.5^2$; $1.41^2 = 1.9881 < 2 < 2.0164 = 1.42^2$; $1.4142^2 = 1.99996164 < 2 < 2.00024449 = 1.4143^2$ — always inside, never touching.',
            'Now, the emptiness engine: if rationals $r \\ne r’$ both sat in every rung, then $|r - r’| < 10^{-k}$ for every $k$; but distinct rationals $\\tfrac{p}{q}, \\tfrac{p’}{q’}$ differ by at least $\\tfrac{1}{qq’} > 0$ — a fixed positive floor that some $10^{-k}$ undercuts. Contradiction: at most one rational can survive all rungs.',
            'Hence the intersection is rational-empty (and $\\sqrt{2}$, once created by the cut, is its unique real member) — the squeeze ladder was a completeness argument in disguise all along.',
          ],
        },
        { kind: 'heading', text: 'Density and completeness: two different virtues' },
        {
          kind: 'para',
          text: 'Set the two properties side by side, because examinations and intuition both love to confuse them. **Density** (7.3): between any two *different* numbers of the system, a third number of the system lives — no neighbours, no adjacent pairs. **Completeness** (this lesson): every cut is produced by a number of the system — no holes, no dangling seams. $\\mathbb{N}$ and $\\mathbb{Z}$ have neither (neighbours everywhere, gaps everywhere). $\\mathbb{Q}$ has density but not completeness — packed tight *and* full of holes, which is why the combination is so disorienting: between $1.41$ and $1.42$ live infinitely many rationals, and *still* none of them is $\\sqrt{2}$, and still the cut dangles. $\\mathbb{R}$ has both. And a subtlety worth one slow read: density of $\\mathbb{Q}$ *inside* $\\mathbb{R}$ survives the completion — between any two *reals* a rational still lives (between $\\sqrt{2}$ and $\\sqrt{3}$ lives $\\tfrac{3}{2}$; even in the tight window between $\\sqrt{2}$ and $\\sqrt{2} + \\tfrac{1}{1000}$ lives $1.415$, since $1.414 < \\sqrt{2} < 1.415$). The rationals did not thin out when the line was completed; they are the crowd through which the amber rings are threaded.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The honest scope of this lesson',
          text: 'Completeness as presented here is the *ordering story*: cuts, seams, no dangling knives. The analysis shelf — and every university mathematics course — builds the full machinery on top: Cauchy sequences (the Cantor construction: reals as limits of rational sequences), suprema and infima (every bounded set has a least upper bound — the equivalent form most textbooks use), and the theorems those unlock (intermediate value, monotone convergence). This book deliberately stops at the doorstep: the tower is closed, every number named, and the next two chapters are history and maps, not analysis. When you meet completeness again, it will arrive as "every nonempty bounded set has a supremum" — and you should recognize it: it is Dedekind’s knife, sharpened differently.',
        },
        { kind: 'heading', text: 'The year the reals were born' },
        {
          kind: 'callout',
          tone: 'historical',
          title: '1872: three constructions, one line',
          text: 'The modern real numbers arrived three times in a single year. **Dedekind** published *Stetigkeit und irrationale Zahlen* (Vieweg, Braunschweig): the cut construction this lesson follows. **Cantor** published "Über die Ausdehnung eines Satzes aus der Theorie der trigonometrischen Reihen" (*Mathematische Annalen* 5, pp. 123–132): real numbers as equivalence classes of *fundamental sequences* — the Cauchy-sequence route. **Heine** published "Die Elemente der Functionenlehre" (*Crelle’s Journal* 74, pp. 172–188), drawing on **Weierstrass’s** unpublished Berlin lectures: the nested-intervals route you met above. And the priority question has a quiet French footnote: **Charles Méray** had already published an arithmetical theory of irrationals in 1869 — "Remarques sur la nature des quantités…" — anticipating Cantor’s construction with only minor differences of style; France was not ready for it, the work went unread, and the credit settled elsewhere. Three constructions, one line: all three were later proved to build the *same* system — and the collective program got its name, the **arithmetization of analysis**: geometry’s continuum rebuilt from arithmetic alone, "completely under the sign of number" as Hilbert put it.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Cut',
              def: 'A partition of ℚ into two nonempty classes (L, U) where every rational belongs to exactly one and every member of L is strictly below every member of U — Dedekind’s knife.',
            },
            {
              term: 'Lower class / upper class',
              def: 'The two sides of a cut: for the √2 cut, L = {r : r² < 2 or r < 0} and U = {r : r > 0 and r² > 2} — the two shores of 8.1, now a formal object.',
            },
            {
              term: 'Produced by a rational',
              def: 'A cut where some rational is the largest member of L (knife-face down) or the smallest member of U (knife-face up) — every rational produces its cut in exactly these two ways.',
            },
            {
              term: 'Irrational cut',
              def: 'A cut produced by no rational: neither class has a boundary member. The √2 cut is the type specimen — L has no largest, U has no smallest.',
            },
            {
              term: 'Completeness',
              def: 'The no-holes property of ℝ: every cut of the rationals is produced by exactly one real number. ℚ is dense yet not complete — the two virtues are independent.',
            },
            {
              term: 'Nested intervals',
              def: 'A family of brackets, each containing the next, with widths shrinking to zero — [1.4, 1.5] ⊃ [1.41, 1.42] ⊃ [1.414, 1.415] ⊃ …; rational-empty, real-complete: exactly one real survives all rungs.',
            },
            {
              term: 'The tower of number systems',
              def: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ — four systems as four repairs: ℤ closes subtraction, ℚ closes division, ℝ closes the holes; each inclusion proper (−2, 3/5, √2 the resident witnesses).',
            },
            {
              term: 'Arithmetization of analysis',
              def: 'The 1872 program of Dedekind, Cantor, Heine and Weierstrass (with Méray’s 1869 anticipation): rebuilding the continuous line from arithmetic alone, so that calculus rests on numbers, not pictures.',
            },
          ],
        },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'For the cut $L = \\{r : r^2 < 2 \\text{ or } r < 0\\}$, $U = \\{r : r > 0 \\text{ and } r^2 > 2\\}$, which statement is true?',
              options: [
                '$L$ has a largest member',
                '$U$ has a smallest member',
                'every rational is in exactly one of the two classes',
                'the number $\\sqrt{2}$ is a member of $L$',
              ],
              answer: 2,
              explain:
                'Trichotomy on r² sends every rational to exactly one class (r² = 2 never happens — 8.1). Neither class has a boundary member (the two derivations), and √2 is not a rational at all, so it belongs to neither class of this cut of ℚ — the cut produces it.',
            },
            {
              q: 'A cut of $\\mathbb{Q}$ is *produced by a rational* exactly when:',
              options: [
                'never — cuts are always irrational',
                'only when the boundary rational is an integer',
                'always — every cut has a rational boundary member',
                'the rational is the largest member of $L$ or the smallest member of $U$',
              ],
              answer: 3,
              explain:
                'The two knife-faces: {r ≤ 3/2} (3/2 = max of L) or {r < 3/2} (3/2 = min of U) — both are the 3/2-cut. Irrational cuts are precisely the ones where NEITHER face exists.',
            },
            {
              q: 'Which number system is *dense but not complete*?',
              options: ['$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{Q}$', '$\\mathbb{R}$'],
              answer: 2,
              explain:
                'ℚ packs with no adjacent pair (7.3’s density) and still has the hole at √2 (the dangling cut). ℕ and ℤ have neither virtue; ℝ has both.',
            },
            {
              q: 'The three failures $3 - 5 \\notin \\mathbb{N}$, $3 \\div 5 \\notin \\mathbb{Z}$, $\\sqrt{2} \\notin \\mathbb{Q}$ motivated, in order:',
              options: [
                'nothing — they are just facts',
                'the three storeys $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$ of the tower',
                'only the extension to $\\mathbb{Q}$',
                'new operations instead of new numbers',
              ],
              answer: 1,
              explain:
                'Each closure failure was repaired by constructing the next system — ℤ for subtraction (ch. 6), ℚ for division (ch. 7), ℝ for the holes (this chapter). The tower is the ledger of repairs.',
            },
            {
              q: 'The nested rungs $[1.4, 1.5] \\supset [1.41, 1.42] \\supset [1.414, 1.415] \\supset \\dots$ (widths $\\to 0$) have as their total intersection:',
              options: [
                'exactly one rational',
                'no rational at all — but exactly one real, $\\sqrt{2}$',
                'infinitely many rationals',
                'nothing whatsoever',
              ],
              answer: 1,
              explain:
                'Two distinct rationals differ by a fixed positive floor 1/(qq′), which some 10⁻ᵏ undercuts — so no rational survives all rungs. Completeness supplies exactly one real: the number the cut created. "Nothing whatsoever" forgets that ℝ has no holes.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'For the $\\sqrt{2}$ cut, classify each rational into $L$ or $U$ (one line of reason each): $-3$, $0$, $1$, $\\tfrac{3}{2}$, $\\tfrac{7}{5}$, $-\\tfrac{1}{2}$.',
                  solution: [
                    'Use the class definitions: $r < 0$ or $r^2 < 2$ puts $r$ in $L$; $r > 0$ with $r^2 > 2$ puts $r$ in $U$.',
                    'Now, $-3 < 0$: in $L$. $0$: $0 < 0$ fails but $0^2 = 0 < 2$: in $L$. $1$: $1^2 = 1 < 2$: in $L$.',
                    'So, $\\tfrac{3}{2}$: positive with $\\tfrac{9}{4} > 2$: in $U$. $\\tfrac{7}{5}$: positive with $\\tfrac{49}{25} = 1.96 < 2$: in $L$. $-\\tfrac{1}{2} < 0$: in $L$.',
                    'Hence $L = \\{-3, 0, 1, \\tfrac{7}{5}, -\\tfrac{1}{2}\\}$ and $U = \\{\\tfrac{3}{2}\\}$ for this list — and note $\\tfrac{7}{5} < \\sqrt{2} < \\tfrac{3}{2}$ is exactly the rung $[1.4, 1.5]$.',
                  ],
                  answer: 'L: −3, 0, 1, 7/5, −½ · U: 3/2',
                },
                {
                  q: '(Exam-style) True or false, with a reason: (i) between any two rationals there lives a rational; (ii) between any two reals there lives a rational; (iii) $\\mathbb{Q}$ has no holes.',
                  solution: [
                    '(i) True — the midpoint $\\tfrac{a+b}{2}$ is rational and strictly between (7.3’s density, proved by averaging).',
                    '(ii) True — density of $\\mathbb{Q}$ inside $\\mathbb{R}$ survives the completion: between $\\sqrt{2}$ and $\\sqrt{3}$ lives $\\tfrac{3}{2}$; the general statement is the analysis shelf’s to prove, the instances are this lesson’s to exhibit.',
                    '(iii) False — the $\\sqrt{2}$ cut dangles over a hole: $L$ has no largest, $U$ no smallest, and no rational produces the cut. Density (i) and no-holes (iii) are independent virtues.',
                    'Hence: true, true, false — the trio that separates density from completeness.',
                  ],
                  answer: 'true · true · false',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Write the cut produced by $-\\tfrac{3}{2}$ in both knife-face forms.',
                  solution: [
                    'Knife-face down (boundary in the lower class): $L = \\{r \\in \\mathbb{Q} : r \\le -\\tfrac{3}{2}\\}$, $U = \\{r \\in \\mathbb{Q} : r > -\\tfrac{3}{2}\\}$ — here $-\\tfrac{3}{2}$ is the largest member of $L$.',
                    'Knife-face up (boundary in the upper class): $L = \\{r \\in \\mathbb{Q} : r < -\\tfrac{3}{2}\\}$, $U = \\{r \\in \\mathbb{Q} : r \\ge -\\tfrac{3}{2}\\}$ — here $-\\tfrac{3}{2}$ is the smallest member of $U$.',
                    'So, both pairs satisfy every cut axiom (partition, nonempty, all of $L$ below all of $U$) — check one clause by hand: if $l \\le -\\tfrac{3}{2} < u$ then $l < u$ ✓.',
                    'Hence one rational, two cuts on paper — and nothing in the cut machinery distinguishes them; both are "the cut at $-\\tfrac{3}{2}$".',
                  ],
                  answer: 'L = {r ≤ −3/2}, U = {r > −3/2} — or L = {r < −3/2}, U = {r ≥ −3/2}',
                },
                {
                  q: 'Run the room-above step exactly: for $r = \\tfrac{7}{5} \\in L$, compute $r + \\tfrac{2 - r^2}{2r + 1}$ as a single fraction and verify it stays in $L$.',
                  solution: [
                    'Compute the pieces: $r^2 = \\tfrac{49}{25}$, so $2 - r^2 = \\tfrac{1}{25}$; and $2r + 1 = \\tfrac{19}{5}$.',
                    'Now, the step: $\\delta = \\tfrac{1/25}{19/5} = \\tfrac{1}{25} \\cdot \\tfrac{5}{19} = \\tfrac{1}{95}$.',
                    'So, $r’ = \\tfrac{7}{5} + \\tfrac{1}{95} = \\tfrac{133 + 1}{95} = \\tfrac{134}{95} \\approx 1.4105$ — bigger than $1.4$ ✓.',
                    'Hence verify the square: $\\left(\\tfrac{134}{95}\\right)^2 = \\tfrac{17956}{9025}$ while $2 = \\tfrac{18050}{9025}$ — and $17956 < 18050$, so $r’ \\in L$ exactly, with room $\\tfrac{94}{9025}$ left.',
                  ],
                  answer: '$\\tfrac{134}{95}$ — inside $L$ exactly ($17956/9025 < 2$)',
                },
                {
                  q: 'Verify with exact integer arithmetic that the rungs $[1.4142, 1.4143]$ and $[1.41421, 1.41422]$ nest and both bracket the hole.',
                  solution: [
                    'Nesting: $1.4142 \\le 1.41421$ and $1.41422 \\le 1.4143$ — the later rung sits inside the earlier (read off the decimals; the script checks all six rungs).',
                    'Now, bracketing for the first: $14142^2 = 199\\,996\\,164 < 200\\,000\\,000 < 200\\,024\\,449 = 14143^2$ — that is $1.4142^2 < 2 < 1.4143^2$ with the decimals scaled by $10^4$.',
                    'So, bracketing for the second: $141421^2 = 19\\,999\\,899\\,241 < 20\\,000\\,000\\,000 < 20\\,000\\,182\\,084 = 141422^2$ — same shape at scale $10^5$.',
                    'Hence both rungs bracket $\\sqrt{2}$ exactly, and nest — the chase closes by $10^{-k}$ each rung, forever.',
                  ],
                  answer: 'both rungs bracket √2 exactly; each nests in its predecessor',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove: no rational produces the $\\sqrt{2}$ cut.',
                  solution: [
                    'Let $c \\in \\mathbb{Q}$ be a candidate producer — it must be the largest member of $L$ or the smallest of $U$.',
                    'Now, if $c \\in L$: the room-above construction (this lesson’s first derivation) exhibits a rational $c’ = c + \\delta \\in L$ with $c’ > c$ — so $c$ is not the largest member of $L$.',
                    'So, if $c \\in U$: the room-below construction exhibits $c’ = c - \\delta \\in U$ with $c’ < c$ — so $c$ is not the smallest member of $U$. (Every rational is in exactly one class, so these two cases cover everything.)',
                    'Hence no rational is the boundary of the cut in either face — the cut is produced by nothing in $\\mathbb{Q}$, which is precisely what makes it an *irrational* cut.',
                  ],
                  answer: 'both boundary slots are refuted by the room constructions',
                },
                {
                  q: 'Prove the room-below estimate used in the second derivation: for $u > 0$ with $u^2 > 2$ and $\\delta = \\tfrac{u^2 - 2}{2u + 1}$, show $(u - \\delta)^2 > 2$.',
                  solution: [
                    'Expand: $(u - \\delta)^2 = u^2 - 2u\\delta + \\delta^2 > u^2 - 2u\\delta$ (the $\\delta^2$ term only helps).',
                    'Now, substitute $\\delta$: $2u\\delta = \\tfrac{2u(u^2 - 2)}{2u + 1} = (u^2 - 2) \\cdot \\tfrac{2u}{2u + 1}$.',
                    'So, since $\\tfrac{2u}{2u + 1} < 1$ (subtract the smaller numerator from the larger denominator: $1 - \\tfrac{2u}{2u+1} = \\tfrac{1}{2u+1} > 0$), the subtracted amount is *strictly less* than the full excess: $2u\\delta < u^2 - 2$.',
                    'Hence $(u - \\delta)^2 > u^2 - (u^2 - 2) = 2$ — strictly above the wall, exactly as claimed.',
                  ],
                  answer: 'because 2u/(2u+1) < 1, the subtraction cannot erase the whole excess',
                },
                {
                  q: '(Exam-style) Exhibit a rational strictly between $\\sqrt{2}$ and $\\sqrt{2} + \\tfrac{1}{1000}$, with an exact proof.',
                  solution: [
                    'Try $1.415$: the claim splits into $\\sqrt{2} < 1.415$ and $1.415 < \\sqrt{2} + 0.001$.',
                    'Now, the first half: $1415^2 = 2\\,002\\,225 > 2\\,000\\,000 = 2 \\cdot 10^6$, so $1.415^2 > 2$ and (positives) $1.415 > \\sqrt{2}$ ✓.',
                    'So, the second half: $1.415 - 0.001 = 1.414$, and $1414^2 = 1\\,999\\,396 < 2\\,000\\,000$, so $1.414 < \\sqrt{2}$, which rearranges to $1.415 < \\sqrt{2} + 0.001$ ✓.',
                    'Hence $1.415$ sits strictly inside the window of width one-thousandth — density of $\\mathbb{Q}$ inside $\\mathbb{R}$, cashed in exact integer squares.',
                  ],
                  answer: '$1.415$ (exact: 1414² < 2·10⁶ < 1415²)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Build the four-repair ledger with witnesses: for each of $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}$, name one operation-closure it *lacks* (or say "none") and the system that repairs it.',
                  solution: [
                    '$\\mathbb{N}$: lacks $-$ ($3 - 5$ has no answer) and lacks $\\div$ ($3 \\div 5$ has no answer) — repaired by $\\mathbb{Z}$ (subtraction, ch. 6) and then $\\mathbb{Q}$ (division, ch. 7).',
                    'Now, $\\mathbb{Z}$: has $-$; still lacks $\\div$ — $3 \\div 5$ remains unanswered (no integer $m$ with $5m = 3$); repaired by $\\mathbb{Q}$.',
                    'So, $\\mathbb{Q}$: has $-$ and $\\div$; lacks *completeness* — the $\\sqrt{2}$ cut dangles; repaired by $\\mathbb{R}$ (this chapter).',
                    'Hence $\\mathbb{R}$: no holes; the ledger closes (the next failures — limits of infinite processes — are not failures of the *number system* but of the tools built on it; that story is the analysis shelf’s).',
                  ],
                  answer: 'ℕ: −, ÷ → ℤ, ℚ · ℤ: ÷ → ℚ · ℚ: the holes → ℝ · ℝ: ledger closed',
                },
                {
                  q: 'Prove: if $r, s \\in L$ (the $\\sqrt{2}$ cut’s lower class) and both are positive, then $rs < 2$ — without ever mentioning $\\sqrt{2}$.',
                  solution: [
                    'Both squares sit below the wall: $r^2 < 2$ and $s^2 < 2$ (that is what membership in $L$ means for positives).',
                    'Now, the key inequality: $rs \\le \\tfrac{r^2 + s^2}{2}$ — because $(r - s)^2 \\ge 0$ expands to $r^2 + s^2 \\ge 2rs$.',
                    'So, chain them: $rs \\le \\tfrac{r^2 + s^2}{2} < \\tfrac{2 + 2}{2} = 2$.',
                    'Hence the product of two lower-class positives stays below the wall — a preview of how *arithmetic on classes* will be defined on the analysis shelf: products of members stay in class, no square root ever named.',
                  ],
                  answer: 'rs ≤ (r² + s²)/2 < 2 — by (r−s)² ≥ 0 alone',
                },
                {
                  q: 'The cuts of $\\sqrt{2}$ and $\\sqrt{3}$ are different cuts. Exhibit a rational that separates them, and explain why such a rational must exist for any two different cuts.',
                  solution: [
                    'Exhibit: $\\tfrac{3}{2}$ — positive with $\\left(\\tfrac{3}{2}\\right)^2 = \\tfrac{9}{4} > 2$ (so $\\tfrac{3}{2}$ is in the *upper* class of the $\\sqrt{2}$ cut) and $\\tfrac{9}{4} < 3$ (so it is in the *lower* class of the $\\sqrt{3}$ cut). One rational, two different sides.',
                    'Now, why it must exist: if the cuts $(L_1, U_1)$ and $(L_2, U_2)$ differ, some rational sits in different classes — say $r \\in L_1$ but $r \\in U_2$. Then every $l \\in L_1$ is below $r$… careful: $r \\in L_1$ means $r$ itself is a lower-class member of cut 1 and an upper-class member of cut 2 — the classes disagree at $r$.',
                    'So, the general principle: distinct cuts are *separated by a rational* — cuts do not differ by ghosts, only by which side specific rationals fall on. (Contrapositive: two cuts with identical classes are the same cut — one number, one knife-line.)',
                    'Hence $\\sqrt{2} \\ne \\sqrt{3}$ has a purely cut-level proof: the rational $\\tfrac{3}{2}$ witnesses the difference — exactly as $1.5$ sits between them on the line.',
                  ],
                  answer: '3/2 separates them — upper class of the √2 cut, lower class of the √3 cut',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Density of $\\mathbb{Q}$ inside $\\mathbb{R}$, structured sketch: for reals $a < b$, exhibit the reasoning that produces a rational in $(a, b)$ — stating honestly which step is taken on faith at this book’s level.',
                  solution: [
                    'The plan (Archimedes’s idea): make a denominator $n$ so fine that $\\tfrac{1}{n} < b - a$, then catch the first multiple of $\\tfrac{1}{n}$ above $a$.',
                    'Now, the catch: the set $\\{k/n : k \\in \\mathbb{Z}\\}$ steps by $\\tfrac{1}{n} < b - a$, so it cannot jump *over* the whole interval — some $k/n$ lands strictly inside $(a, b)$.',
                    'So, the honest accounting: the existence of $n$ with $\\tfrac{1}{n} < b - a$ is the *Archimedean property*; the "first multiple above $a$" uses the well-ordering of a suitable set of integers. Both are theorems of the analysis shelf — this book takes them as given and exhibits instances instead.',
                    'Hence the instances this lesson verified exactly: $\\tfrac{3}{2} \\in (\\sqrt{2}, \\sqrt{3})$ and $1.415 \\in (\\sqrt{2}, \\sqrt{2} + 10^{-3})$ — the structure is sketched, the instances are proved, the general theorem is honestly deferred.',
                  ],
                  answer: 'a fine-enough 1/n, then the first multiple above a — Archimedean step taken on faith at this level',
                },
                {
                  q: '(Exam-style, assertion–reason) Assertion: every point of the real line corresponds to exactly one real number. Reason: the rationals are dense in the line. Evaluate.',
                  solution: [
                    'The assertion is TRUE in the completed picture: every cut is produced by exactly one real — the line and $\\mathbb{R}$ now answer to each other point for point (this lesson’s closing claim, informally stated).',
                    'Now, the reason is TRUE as a statement — but it is NOT the correct explanation: density is the property $\\mathbb{Q}$ already had, and $\\mathbb{Q}$ visibly fails the assertion (the $\\sqrt{2}$ point had no rational). What earns the assertion is *completeness*, a different virtue.',
                    'So, the verdict: assertion true, reason true, but the reason does not explain the assertion — the "true / true / not-the-explanation" option, the rarest and most instructive answer in the format.',
                    'Hence the examination skill: when reason and assertion are both true, ask the cut question — would the reason still hold if the assertion failed? Density held in $\\mathbb{Q}$; the assertion did not. Not the explanation.',
                  ],
                  answer: 'assertion true · reason true · not the correct explanation (completeness, not density, earns it)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The cut-to-equation theorem: let $\\alpha$ be the real number produced by the $\\sqrt{2}$ cut (every $l \\in L$ satisfies $l < \\alpha$ and every $u \\in U$ satisfies $\\alpha < u$). Prove $\\alpha^2 = 2$. (Numerical anchor: the same argument shows $1.4142^2 < 2$ forces a witness above $1.4142$.)',
                  solution: [
                    'First, $\\alpha > 1$: the rational $1 \\in L$, and $\\alpha$ exceeds every member of $L$. So $\\alpha$ is positive and squaring is order-preserving on it.',
                    'Now, kill $\\alpha^2 < 2$: then $\\alpha \\in L$-position with room above, and the room-above engine runs on reals too — pick a rational $\\varepsilon$ with $0 < \\varepsilon < \\tfrac{2 - \\alpha^2}{2\\alpha + 1}$ (density supplies one). Then $(\\alpha + \\varepsilon)^2 = \\alpha^2 + 2\\alpha\\varepsilon + \\varepsilon^2 \\le \\alpha^2 + (2\\alpha + 1)\\varepsilon < 2$ — and by density pick a rational $r$ with $\\alpha < r < \\alpha + \\varepsilon$, so $r^2 < 2$, i.e. $r \\in L$ with $r > \\alpha$. That contradicts $\\alpha$ sitting above *all* of $L$.',
                    'So, kill $\\alpha^2 > 2$ symmetrically: with $\\varepsilon < \\tfrac{\\alpha^2 - 2}{2\\alpha}$ rational-positive, $(\\alpha - \\varepsilon)^2 > \\alpha^2 - 2\\alpha\\varepsilon > 2$, and a rational $r \\in (\\alpha - \\varepsilon, \\alpha)$ lands in $U$ below $\\alpha$ — contradicting $\\alpha$ sitting below all of $U$.',
                    'Hence neither inequality survives: $\\alpha^2 = 2$ exactly. The numerical anchor at $\\alpha_0 = 1.4142$: room $\\tfrac{2 - 1.4142^2}{2 \\cdot 1.4142 + 1} \\approx 1.0 \\times 10^{-5}$, and indeed $1.4142 + 10^{-5} < \\sqrt{2}$ (check: $(1.41421)^2 = 1.9999899241 < 2$). The created number is *forced* to square to 2 — the cut does not merely label the hole, it pins the equation.',
                  ],
                  answer: 'both α² < 2 and α² > 2 contradict the producing property — so α² = 2',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The cut definition',
          latex: '(L, U):\\; L \\cup U = \\mathbb{Q},\\; L, U \\neq \\varnothing,\\; l \\in L,\\; u \\in U \\Rightarrow l < u',
          note: 'A partition of ℚ with the whole left class below the whole right class — Dedekind’s knife.',
        },
        {
          kind: 'formula',
          name: 'The completeness property',
          latex: '\\text{every cut of } \\mathbb{Q} \\text{ is produced by exactly one real number}',
          note: 'The no-holes axiom: ℚ fails it (√2’s cut dangles), ℝ satisfies it — the foundation of analysis.',
        },
        {
          kind: 'formula',
          name: 'The tower of number systems',
          latex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
          note: 'Three closure repairs stacked: ℤ closes −, ℚ closes ÷, ℝ closes the holes.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'The classification trio — rational, irrational, real — is permanent school fare: "every point on the number line corresponds to a unique real number, and every real is rational or irrational" is exactly the NCERT class-9 framing, and competitive papers cash it as classify-the-number and locate-on-the-line items ("which integer pair brackets √13?" — the squeeze engine of 8.1). The density-versus-completeness distinction is a favourite assertion–reason station: "ℚ is dense, therefore it has no gaps" is the classic false implication this lesson dismantles, and the nested-bracket chase ("what survives all rungs?") appears as a conceptual MCQ in olympiad qualifiers and JEE-advanced-style papers. The full cut machinery itself is first-course-in-analysis territory — but its *conclusions* (the tower diagram, the completeness statement in words) are asked as one-mark theory items in school-leaving exams. Know the two virtues by name: dense is about packing, complete is about holes.',
        },
        {
          kind: 'para',
          text: 'The theory of the chapter closes, and with it the tower — one computational coda remains before the vistas. Four systems, four stories: the naturals generated from one successor rule; the integers built as difference-pairs to rescue subtraction; the rationals built as fraction-pairs to rescue division — dense, field-complete, and *still* hollow; and now the reals, completed by Dedekind’s knife so that every cut, every squeeze, every nested chase lands on exactly one number. The diagonal of the unit square, homeless since lesson 8.1, lives at $\\sqrt{2}$ — above every rational whose square is under 2, below every rational whose square is over 2, pinned by an equation it never asked to satisfy. That coda — the crafts that *compute* the roots the tower was built to house — is the next lesson; beyond it, what remains of this book is not more structure but two vistas: how humanity learned to write these numbers down at all (chapter 9’s journey through five numeration systems), and how the tower looks from above — the map of number systems, and the strange guests (√−1 among them) waiting just past the edge of this one.',
        },
      ],
    },
    {
      id: 'ans-square-and-cube-root-crafts',
      number: '8.5',
      title: 'Square and Cube Roots: the Extraction Crafts',
      prerequisites: [
        'ans-completeness-the-line-without-holes',
        'ans-how-irrationals-behave',
        'ans-fundamental-theorem-of-arithmetic',
      ],
      sources: ['khattar-qa-4e', 'ncert-class8-squares-cube-roots', 'aryabhatiya-root-extraction', 'jiuzhang-kaifang'],
      concepts: [
        'The squares census: odd-number sums and the 2n gap law',
        'Pythagorean triplets generated from m² − n², 2mn, m² + n²',
        'Square roots by prime factorisation — exponents halved',
        'The long-division square-root method derived from (10a + b)²',
        'Pairing digits from the decimal point: 10² = 100',
        'Square roots of decimals and fractions',
        'Cube roots by factorisation and the three-digit strip',
        'The cube last-digit map and estimation brackets',
      ],
      objectives: [
        'Generate the squares census — the gnomon law that odd numbers stack into squares — and use it to count the integers between consecutive squares without listing them',
        'Extract square roots by prime factorisation (perfect square ⟺ every prime exponent even) and by the long-division method whose engine (10a + b)² = 100a² + (20a + b)b is derived, not recited',
        'Carry the craft to decimals and fractions by pairing digits from the decimal point outward, and to cube roots by factorisation, the three-digit strip and the last-digit cube map',
        'Estimate roots with exact brackets whose errors are computed, and meet the aptitude-corner families (smallest multiplier to perfect a square, perfect-square spotting) honestly derived',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 8 proved that roots *exist*: the diagonal broke the rationals (8.1), the family of irrationals got its census (8.2), the behaviour laws tamed their arithmetic (8.3), and completeness pinned every hole to exactly one number (8.4). What the chapter has not yet done is *compute one*. Nobody hands you $\\sqrt{2}$ on a card; you meet it as "the number whose square is 2", and if you need its digits — for a measurement, a cheque, an examination — some craft must dig them out, digit by digit, without ever guessing. This closing lesson is the crafts chapter: the squares census that recognises perfect squares on sight, the factorisation route that halves prime exponents, the long-division square-root method (derived honestly from the algebra of $(10a+b)^2$), the decimal and fraction extensions, and the cube-root twins — factorisation plus the digit-map shortcut. The standard school carrier of this material is the class-8 "Squares and Square Roots" arc and the aptitude books\' chapter of the same name; the craft itself is far older, and the historical note below will set it in a lineage fifteen centuries deep.',
        },
        { kind: 'heading', text: 'The census of squares' },
        {
          kind: 'para',
          text: 'Before extracting roots, learn to *recognise* squares. A perfect square is a whole number that is some other whole number\'s square — $1, 4, 9, 16, 25, \\ldots$ — and the first craft is the pattern of how they grow. Stack unit squares into a growing square block and count what each enlargement adds: the first cell is $1$; growing a $1 \\times 1$ square to $2 \\times 2$ adds an L-shaped gnomon of $3$ cells; growing $2 \\times 2$ to $3 \\times 3$ adds a gnomon of $5$; each enlargement adds the next odd number. The figure below shows the $4 \\times 4$ case assembled from $1 + 3 + 5 + 7$. The odd numbers are the *gnomons* of the squares — and the sum of the first $n$ odd numbers is exactly $n^2$.',
        },
        {
          kind: 'derivation',
          title: 'The gnomon law: the first n odd numbers sum to n²',
          statement:
            'Claim: $1 + 3 + 5 + \\cdots + (2n - 1) = n^2$ — each odd number is the gnomon that grows the $(n-1) \\times (n-1)$ square into the $n \\times n$ square.',
          steps: [
            {
              label: 'Grow the square by one row and one column',
              formula: 'n^2 - (n-1)^2 = n^2 - (n^2 - 2n + 1) = 2n - 1',
              explanation:
                'Expanding $(n-1)^2 = n^2 - 2n + 1$ and subtracting: the difference between consecutive squares is exactly the odd number $2n - 1$. This single difference *is* the gnomon — one new top row of $n$ cells and one new side column of $n-1$ cells beyond the corner cell already counted.',
            },
            {
              label: 'Telescope the climb from 0² to n²',
              formula: 'n^2 = (1^2 - 0^2) + (2^2 - 1^2) + \\cdots + (n^2 - (n-1)^2)',
              explanation:
                'Write $n^2$ as the collapsed telescope of all the one-step differences: every intermediate square cancels, leaving only the first step $1^2 - 0^2 = 1$ and the sum of the gnomons.',
            },
            {
              label: 'Read off the terms',
              formula: 'n^2 = 1 + 3 + 5 + \\cdots + (2n-1)',
              explanation:
                'Each difference $(k^2 - (k-1)^2) = 2k - 1$ is the $(2k{-}1)$-th odd number, so the telescope is precisely the sum of the first $n$ odd numbers. Thus, $1 + 3 + 5 + 7 = 16 = 4^2$, and the walk continues forever: $1 + 3 + 5 + \\cdots + 17 = 81 = 9^2$ (nine terms, since $(17+1)/2 = 9$).',
            },
          ],
          result: '1 + 3 + 5 + \\cdots + (2n - 1) = n^2 — the odd numbers are the gnomons of the squares',
        },
        {
          kind: 'figure',
          caption:
            'The gnomon staircase: unit cells stacked into a 4 × 4 square, one odd-numbered gnomon at a time. The teal corner is 1; the amber L adds 3; the next teal L adds 5; the last amber L adds 7. The census reads itself off the picture: 1 + 3 + 5 + 7 = 16 = 4².',
          svg: `<svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A four by four grid of unit squares built from gnomons of one, three, five and seven cells, showing the odd numbers summing to sixteen equals four squared">
  <g stroke="#0f766e" stroke-width="1.5">
    ${[
      { cells: [[0, 0]], fill: 'rgba(15,118,110,0.28)' },
      { cells: [[1, 0], [0, 1], [1, 1]], fill: 'rgba(180,83,9,0.22)' },
      { cells: [[2, 0], [2, 1], [2, 2], [0, 2], [1, 2]], fill: 'rgba(15,118,110,0.16)' },
      { cells: [[3, 0], [3, 1], [3, 2], [3, 3], [0, 3], [1, 3], [2, 3]], fill: 'rgba(180,83,9,0.13)' },
    ]
      .flatMap(
        (g) =>
          g.cells
            .map(
              ([c, r]) =>
                `<rect x="${90 + c * 40}" y="${40 + r * 40}" width="40" height="40" fill="${g.fill}"/>`
            )
            .join('\n    ')
      )
      .join('\n    ')}
  </g>
  ${[
    { x: 110, y: 66, t: '1', fill: '#0f766e' },
    { x: 150, y: 106, t: '+3', fill: '#b45309' },
    { x: 190, y: 146, t: '+5', fill: '#0f766e' },
    { x: 230, y: 186, t: '+7', fill: '#b45309' },
  ]
    .map(
      (l) =>
        `<text x="${l.x}" y="${l.y}" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="600" fill="${l.fill}">${l.t}</text>`
    )
    .join('\n  ')}
  <text x="285" y="66" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#0f172a">= 16</text>
  <text x="285" y="86" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#0f172a">= 4²</text>
  <text x="90" y="228" font-family="Georgia, serif" font-size="12.5" fill="#334155">gnomons: each odd number grows the square</text>
  <text x="90" y="244" font-family="Georgia, serif" font-size="12.5" fill="#334155">by one row and one column</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The gnomon law pays immediate rent as a *counting* engine. Consecutive squares never touch: between $n^2$ and $(n+1)^2$ the gap is $2n + 1$ wide, and the integers *strictly* between them number $2n + 1 - 1 = 2n$ — never list them, just double. Between $12^2 = 144$ and $13^2 = 169$ lie exactly $2 \\times 12 = 24$ whole numbers; between $20^2 = 400$ and $21^2 = 441$ lie $40$. And the gap law doubles as a *computation* engine: $105^2$ needs no multiplication table — $(100 + 5)^2 = 100^2 + 2 \\cdot 100 \\cdot 5 + 5^2 = 10{,}000 + 1{,}000 + 25 = 11{,}025$, the identity of lesson 1\'s toolkit wearing two-digit clothes.',
        },
        {
          kind: 'example',
          title: 'Read three census items off the gnomon law — without listing a single number',
          steps: [
            'Take "how many whole numbers lie strictly between $15^2$ and $16^2$?" — the gap is $16^2 - 15^2 = 2 \\times 15 + 1 = 31$ wide, and the endpoints are excluded, so the count is $31 - 1 = 30 = 2 \\times 15$. The $2n$ law again: double the smaller root.',
            'Now, "evaluate $1 + 3 + 5 + \\cdots + 17$" — the last term $17 = 2n - 1$ gives $n = 9$, so the sum is $9^2 = 81$. No adding: the odd count *is* the square\'s side.',
            'Check the reverse direction: "a sum of consecutive odd numbers from 1 equals 324 — how many terms?" — $324 = 18^2$, so $n = 18$ terms, ending at $2 \\times 18 - 1 = 35$. The law runs both ways, census in, census out.',
            'Hence the census discipline: whenever consecutive squares appear in a question, the answer is *derived* from $n^2 - (n-1)^2 = 2n - 1$ — the gnomon identity — never from a listing.',
          ],
        },
        { kind: 'heading', text: 'Pythagorean triplets by recipe' },
        {
          kind: 'para',
          text: 'The squares census has a geometric dividend that school and aptitude papers both collect: whole-number right triangles. A *Pythagorean triplet* is a triple of whole numbers $(a, b, c)$ with $a^2 + b^2 = c^2$ — $(3, 4, 5)$ the smallest. Triplets look like luck; they are manufacture. Take any two whole numbers $m > n \\ge 1$ and the recipe $a = m^2 - n^2$, $b = 2mn$, $c = m^2 + n^2$ always delivers one — and the derivation is two lines of the chapter 7 field laws.',
        },
        {
          kind: 'derivation',
          title: 'The triplet generator: (m² − n²)² + (2mn)² = (m² + n²)²',
          statement:
            'Claim: for all whole numbers $m > n \\ge 1$, the triple $\\left(m^2 - n^2,\\; 2mn,\\; m^2 + n^2\\right)$ satisfies the Pythagorean relation.',
          steps: [
            {
              label: 'Square the two legs and add',
              formula: '(m^2 - n^2)^2 + (2mn)^2 = (m^4 - 2m^2n^2 + n^4) + 4m^2n^2',
              explanation:
                'Expand both squares with the $(x - y)^2$ identity of the banked toolkit: the first leg contributes $m^4 - 2m^2n^2 + n^4$, the second $4m^2n^2$.',
            },
            {
              label: 'Fold the middle',
              formula: 'm^4 + 2m^2n^2 + n^4',
              explanation:
                'The two middle terms combine: $-2m^2n^2 + 4m^2n^2 = +2m^2n^2$. The sum is now visibly the expansion of a single square.',
            },
            {
              label: 'Recognise the square of the hypotenuse candidate',
              formula: '(m^2 + n^2)^2 = m^4 + 2m^2n^2 + n^4 \\;\\checkmark',
              explanation:
                'Thus the two legs\' squares sum to exactly $(m^2 + n^2)^2$ — the third member of the recipe is the hypotenuse, always. Sample the recipe: $m = 2, n = 1 \\Rightarrow (3, 4, 5)$; $m = 3, n = 2 \\Rightarrow (5, 12, 13)$; $m = 4, n = 1 \\Rightarrow (8, 15, 17)$; $m = 4, n = 3 \\Rightarrow (7, 24, 25)$; $m = 6, n = 1 \\Rightarrow (12, 35, 37)$. (The geometry of *why* the legs form a right triangle is chapter 8 of Foundation Mathematics and the Geometry book\'s opening arc — this lesson only certifies the arithmetic.)',
            },
          ],
          result: '(m² − n²)² + (2mn)² = (m² + n²)² — the generator always delivers a Pythagorean triplet',
        },
        {
          kind: 'para',
          text: 'The classic examination demand is "find a triplet with a given leg", and the recipe answers it by factoring: a leg $12$ appears in $(5, 12, 13)$ from $m = 3, n = 2$, in $(12, 16, 20)$ — the $(3, 4, 5)$ family scaled by $4$ — and in $(12, 35, 37)$ from $m = 6, n = 1$. The scaled copies remind us the generator makes *primitive* triplets when $m, n$ share no factor and differ in parity (then no member is even-divisible by $2$ beyond the even leg $2mn$) — the full theory belongs to the Geometry shelf; here it stands as the squares census\' first application.',
        },
        { kind: 'heading', text: 'Roots by prime factorisation — the exponent census' },
        {
          kind: 'para',
          text: 'Now the extraction itself. Lesson 8.2 proved the wall — $\\sqrt{n}$ is rational exactly when $n$ is a perfect square, which by the Fundamental Theorem means *every prime exponent of $n$ is even*. That theorem, read as a *computation* rule, is the factor method: factor $n$ into primes; halve the even exponents to read off $\\sqrt{n}$; the odd exponents (if any) mark the squarefree kernel $s$ of 8.2 — the irrational leftover riding outside the root. Take $9{,}801 = 3^4 \\cdot 11^2$: every exponent even, so $9{,}801 = (3^2 \\cdot 11)^2 = 99^2$ and $\\sqrt{9{,}801} = 99$ — recognised, not hunted. Take $7{,}744 = 2^6 \\cdot 11^2 = (2^3 \\cdot 11)^2$: $\\sqrt{7{,}744} = 88$. Take $44{,}100 = 2^2 \\cdot 3^2 \\cdot 5^2 \\cdot 7^2 = (2 \\cdot 3 \\cdot 5 \\cdot 7)^2$: $\\sqrt{44{,}100} = 210$. And the honest failure: $72 = 2^3 \\cdot 3^2$ — the exponent $3$ on the $2$ is odd, so $\\sqrt{72} = \\sqrt{2^2 \\cdot 3^2 \\cdot 2} = 6\\sqrt{2}$, the surd-reduction craft of 8.3 cashed straight from the factorisation.',
        },
        {
          kind: 'formula',
          name: 'The factor-method law',
          latex: 'n = p_1^{2e_1} \\cdots p_k^{2e_k} \\cdot s \\;\\Rightarrow\\; \\sqrt{n} = \\left(p_1^{e_1} \\cdots p_k^{e_k}\\right)\\sqrt{s}',
          note: 'Halve the even exponents, carry the squarefree kernel s outside the root — the 8.2 parity criterion as a compute rule; s = 1 ⟺ n was a perfect square.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why factorisation recognises but rarely extracts',
          text: 'The factor method is perfect for recognising perfect squares (and for the smallest-multiplier family in the exam corner below), but it cannot *dig digits out of an irrational*: √2 has no prime factorisation to halve, because 2 is prime with exponent 1 — the kernel IS the whole number. For non-squares the method stops at the reduced surd, √2 = 1·√2, and the actual digits need the other craft — the division method — which never asks for a factorisation at all. The two crafts are complementary: factorisation classifies, division computes. Both together cover the whole extraction problem, and each is derived, neither memorised.',
        },
        { kind: 'heading', text: 'The long-division method — the craft derived' },
        {
          kind: 'para',
          text: 'The workhorse of school arithmetic and aptitude halls answers the extraction problem head-on: given $N$, produce the digits of $\\sqrt{N}$ one at a time, each *proved* maximal by a comparison. Its setup first: mark the radicand\'s digits into *pairs*, starting at the decimal point and working outward — left of the point the integer part pairs from the right (so an odd-count integer part keeps a lone leading digit), right of the point each pair is two fresh digits, padding with zeros as far as accuracy demands. The pairing is not decoration; it is place value squared — one digit step left multiplies a number by $10$, and therefore its *square* by $100$: each new digit of a root advances the radicand by a factor of a hundred, so the root\'s digits are minted two radicand-digits at a time. $\\sqrt{2}$ pairs as $2.\\;00\\;00\\;00\\;00$; $\\sqrt{5.29}$ as $5.\\;29\\;00$; $\\sqrt{0.0144}$ as $0.\\;01\\;44$.',
        },
        {
          kind: 'derivation',
          title: 'The engine of the division method, derived from (10a + b)²',
          statement:
            'Claim: if the root-so-far reads $a$ (an integer in units of the next digit\'s place — so the *next* digit $b$ appends as $10a + b$), then one digit-extraction step is exactly the inequality $(20a + b)\\,b \\le 100r$, with $r$ the current scaled remainder.',
          steps: [
            {
              label: 'Write the target root in place-value form',
              formula: 'x = 10a + b \\quad (0 \\le b \\le 9)',
              explanation:
                'When one more digit of the root is about to be minted, the root-so-far is $a$ *in units of that new digit\'s place* — appending digit $b$ multiplies it by $10$ and adds $b$. The unknown $x$ we are closing in on is exactly of this shape.',
            },
            {
              label: 'Square it and split the square',
              formula: '(10a + b)^2 = 100a^2 + 20ab + b^2 = 100a^2 + (20a + b)\\,b',
              explanation:
                'Expand $(10a + b)^2 = 100a^2 + 20ab + b^2$, then *read the last two terms as one product*: $20ab + b^2 = (20a + b)b$. The doubling is the algebra\'s own — $20a$ is twice the root-so-far (in the new digit\'s units), and the new digit $b$ rides inside the very factor that must be tried.',
            },
            {
              label: 'Translate the subtraction into the trial rule',
              formula: '100r - (20a + b)\\,b \\ge 0 \\iff (20a + b)\\,b \\le 100r',
              explanation:
                'The previous steps have already removed $100a^2$ — the square of everything found so far — from the radicand; the scaled remainder $r$ (two fresh digits brought down, hence the factor $100$) is what $x^2$ still owes. Subtracting $(10a+b)^2 - 100a^2 = (20a+b)b$ from $100r$ must stay non-negative — otherwise $b$ overshot and $(10a+b)^2$ would already exceed the radicand. So: try the largest digit $b$ with $(20a+b)b \\le 100r$; subtract; the new scaled remainder is $100r - (20a+b)b$; repeat. Every arithmetic act in the recipe is now a *derived* consequence of one expansion.',
            },
          ],
          result: 'the trial rule (20a + b)·b ≤ 100r — one expansion of (10a + b)² is the whole algorithm',
        },
        {
          kind: 'example',
          title: 'Walk √2 through four digits — every product and every remainder on the table',
          steps: [
            'Take the radicand paired as $2.\\;00\\;00\\;00\\;00$ — the first pair is the lone digit $2$; root-so-far $a = 0$, scaled remainder $r = 2$.',
            'Mint the first digit: the largest $b$ with $(20 \\cdot 0 + b)b \\le 2$ is $b = 1$ ($1 \\cdot 1 = 1 \\le 2 < 4 = 2 \\cdot 2$). Subtract: remainder $1$; root-so-far $a = 1$ (the digit $1$ above the pair "2"). Bring down the next pair $00$: the scaled remainder is $100 \\cdot 1 = 100$.',
            'Mint the second digit: the largest $b$ with $(20 \\cdot 1 + b)b \\le 100$ — the trial divisor $2$ waits for its partner: $24 \\cdot 4 = 96 \\le 100 < 125 = 25 \\cdot 5$, so $b = 4$. Subtract: $100 - 96 = 4$; root-so-far $a = 14$; bring down $00 \\Rightarrow 400$.',
            'Mint the third digit: $(20 \\cdot 14 + b)b \\le 400$ — trial divisor $28$: $281 \\cdot 1 = 281 \\le 400 < 564 = 282 \\cdot 2$, so $b = 1$. Subtract: $400 - 281 = 119$; $a = 141$; bring down $00 \\Rightarrow 11{,}900$.',
            'Mint the fourth digit: $(20 \\cdot 141 + b)b \\le 11{,}900$ — trial divisor $282$: $2824 \\cdot 4 = 11{,}296 \\le 11{,}900 < 14{,}125 = 2825 \\cdot 5$, so $b = 4$. Subtract: $11{,}900 - 11{,}296 = 604$; $a = 1414$; bring down $00 \\Rightarrow 60{,}400$.',
            'Mint the fifth digit and read the answer: $(20 \\cdot 1414 + b)b \\le 60{,}400$ — trial divisor $2828$: $28{,}282 \\cdot 2 = 56{,}564 \\le 60{,}400 < 84{,}849 = 28{,}283 \\cdot 3$, so $b = 2$. The root reads $1.4142$ — with the decimal point placed by the pairing (one integer pair $\\Rightarrow$ one integer digit) — and the remaining scaled remainder $60{,}400 - 56{,}564 = 3{,}836$ certifies $1.4142^2 < 2 < 1.4143^2$ exactly, the 8.1 squeeze bracket *manufactured* rather than guessed.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The long-division panel for √2: the answer digits ride the top rail (1.4142), the paired radicand (2. 00 00 00 00) sits at the head of the working column, and each minted digit is certified by its trial product — 24·4 = 96, 281·1 = 281, 2824·4 = 11,296, 28282·2 = 56,564 — each the largest that fits, each leaving the printed remainder.',
          svg: `<svg viewBox="0 0 560 414" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The long division square root layout for the square root of two, showing answer digits one point four one four two on top, the paired radicand two, zero zero, zero zero, zero zero, and the trial products twenty four times four equals ninety six, two hundred eighty one, two thousand eight hundred twenty four times four equals eleven thousand two hundred ninety six, and twenty eight thousand two hundred eighty two times two equals fifty six thousand five hundred sixty four">
  <rect x="2" y="2" width="556" height="410" fill="#fafaf7" stroke="#d6d3d1" stroke-width="1"/>
  <line x1="150" y1="14" x2="150" y2="390" stroke="#a8a29e" stroke-width="1"/>
  <text x="182" y="34" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="600" fill="#0f172a">1. 4  1  4  2</text>
  <text x="86" y="72" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#0f766e">1</text>
  <text x="196" y="72" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#0f172a">2 .  00   00   00   00</text>
  <text x="196" y="104" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">1</text>
  <line x1="180" y1="114" x2="420" y2="114" stroke="#a8a29e" stroke-width="1"/>
  <text x="196" y="140" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">1 00</text>
  <text x="86" y="140" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#b45309">24</text>
  <text x="470" y="140" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#0f766e">24·4 = 96</text>
  <line x1="180" y1="150" x2="420" y2="150" stroke="#a8a29e" stroke-width="1"/>
  <text x="196" y="176" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">96</text>
  <text x="196" y="204" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#0f172a">4 00</text>
  <text x="86" y="204" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#b45309">281</text>
  <text x="470" y="204" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#0f766e">281·1 = 281</text>
  <line x1="180" y1="214" x2="420" y2="214" stroke="#a8a29e" stroke-width="1"/>
  <text x="196" y="240" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">2 81</text>
  <text x="196" y="268" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#0f172a">1 19 00</text>
  <text x="86" y="268" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#b45309">2824</text>
  <text x="470" y="268" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#0f766e">2824·4 = 11,296</text>
  <line x1="180" y1="278" x2="420" y2="278" stroke="#a8a29e" stroke-width="1"/>
  <text x="196" y="304" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">11 296</text>
  <text x="196" y="332" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#0f172a">6 04 00</text>
  <text x="72" y="332" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#b45309">28282</text>
  <text x="470" y="332" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#0f766e">28282·2 = 56,564</text>
  <line x1="180" y1="342" x2="420" y2="342" stroke="#a8a29e" stroke-width="1"/>
  <text x="196" y="368" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#334155">56 564</text>
  <text x="196" y="390" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#57534e">r = 3,836 ···</text>
  <text x="196" y="406" font-family="ui-monospace, Menlo, monospace" font-size="12.5" fill="#57534e">the bracket certifies 1.4142² &lt; 2 &lt; 1.4143²</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Three more walks — a non-terminating stranger, a terminating decimal, and Āryabhaṭa\'s own integer',
          steps: [
            'Take $\\sqrt{7}$ paired $7.\\;00\\;00\\;00$: first digit $2$ ($4 \\le 7 < 9$), remainder $3$, bring down $00 \\Rightarrow 300$; trial divisor $4$: $46 \\cdot 6 = 276 \\le 300 < 329 = 47 \\cdot 7$, so digit $6$, remainder $24$, $a = 26$; bring down $00 \\Rightarrow 2400$; trial divisor $52$: $524 \\cdot 4 = 2096 \\le 2400 < 2625 = 525 \\cdot 5$, so digit $4$, remainder $304$, $a = 264$; bring down $00 \\Rightarrow 30{,}400$; trial divisor $528$: $5285 \\cdot 5 = 26{,}425 \\le 30{,}400 < 31{,}716 = 5286 \\cdot 6$, so digit $5$. Read: $\\sqrt{7} = 2.645\\ldots$, remainder $3{,}975$ keeping the bracket honest.',
            'Take $\\sqrt{5.29}$ paired $5.\\;29$: first digit $2$ ($4 \\le 5 < 9$), remainder $1$, bring down $29 \\Rightarrow 129$; trial divisor $4$: $43 \\cdot 3 = 129$ — exactly the remainder. Subtract to zero: the division *closes*. So $\\sqrt{5.29} = 2.3$ exactly — a terminating extraction, the decimal twin of a perfect square ($2.3^2 = 5.29$, verified at scale: $23^2 = 529$).',
            'Take $\\sqrt{55{,}225}$ paired $5\\;52\\;25$ (integer part of five digits pairs $5 | 52 | 25$): first digit $2$ ($4 \\le 5$), remainder $1$, bring down $52 \\Rightarrow 152$; trial divisor $4$: $43 \\cdot 3 = 129 \\le 152 < 176 = 44 \\cdot 4$, digit $3$, remainder $23$, $a = 23$; bring down $25 \\Rightarrow 2325$; trial divisor $46$: $465 \\cdot 5 = 2325$ — exactly again. So $\\sqrt{55{,}225} = 235$, and $235^2 = 55{,}225$ closes the books. This very radicand is the worked example carried by the oldest textbook of the craft — the historical note below tells its story.',
            'Hence the pattern of walks: non-squares walk forever (each remainder non-zero, minting the next digit — completeness of 8.4 guarantees the walk converges to the irrational it brackets), perfect squares terminate cleanly (a remainder hits exactly zero — the arithmetic *recognises* the perfect square on its own).',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A craft fifteen centuries deep',
          text: 'The digit-by-digit square-root rule is old enough to have been written in verse. Āryabhaṭa\'s Āryabhaṭīya (499 CE, Kusumapura) gives the extraction of square roots digit by digit — mark the places alternately square and non-square from the right, subtract the largest square from the leftmost square place, divide the next place by twice the root-so-far, subtract the quotient\'s square from the next square place — and the cube-root rule alongside it; his commentary tradition walks exactly our 55,225 example to 235. China\'s Nine Chapters on the Mathematical Art (compiled around the turn of the common era) carries the 开方 kaifang "opening the square" algorithm in its fourth chapter, with the cube-root extension — the same pairing, the same maximal-digit trials, run as a division on a counting board. The school layout of this lesson — the panel with the trial divisors doubling in the left column — is the modern descendant of these lineages, and the Babylonian tablet YBC 7289 (chapter 9 will visit it) already carried √2 to six sexagesimal places a thousand years earlier, by methods it does not disclose. When you run the panel, you are doing something humans have done on three continents for at least two millennia.',
        },
        { kind: 'heading', text: 'Decimals and fractions — the point carries the pairing' },
        {
          kind: 'para',
          text: 'The pairing rule makes decimals and fractions citizens of the same craft. For a decimal radicand, pair from the point on both sides: $\\sqrt{12.25}$ pairs $12 | 25$ — the integer part $12$ pairs right-to-left, the fractional $25$ is one pair — and the walk mints one digit per pair: $3$ (with $9 \\le 12 < 16$, remainder $3$), then bring down $25 \\Rightarrow 325$, trial divisor $6$: $65 \\cdot 5 = 325$ exactly — so $\\sqrt{12.25} = 3.5$. $\\sqrt{0.0144}$ pairs $0 | 01 | 44$: the leading pair $0$ mints the digit $0$ (the root is less than one), then $01 \\Rightarrow$ digit $1$ with remainder $1$ — wait, run it honestly: pair $01$ gives $r = 1$, largest $b$ with $b \\cdot b \\le 1$ is $b = 1$, remainder $0$; bring down $44 \\Rightarrow r = 44$ wait — the scaled remainder after the second digit is $0 \\cdot 100 + 44 = 44$? No: remainder $0$ brought down with $44$ gives $44$; root-so-far $a = 1$; trial $(20 \\cdot 1 + b)b \\le 44$: $22 \\cdot 2 = 44$ — exactly. So $\\sqrt{0.0144} = 0.12$, terminating. The pairing\'s arithmetic meaning is the *pair-shift law*: $\\sqrt{100x} = 10\\sqrt{x}$ — shift the point two places, shift the root\'s point one.',
        },
        {
          kind: 'para',
          text: 'Fractions ride the same law in two halves: $\\sqrt{\\tfrac{p}{q}} = \\tfrac{\\sqrt{p}}{\\sqrt{q}}$ — the root of a quotient is the quotient of the roots (square both sides of the claim and it says $p/q = p/q$; the positive square root is unique, so the identity holds). When numerator and denominator are perfect squares the fraction is a rational\'s square: $\\sqrt{\\tfrac{9}{16}} = \\tfrac{3}{4}$, $\\sqrt{\\tfrac{25}{36}} = \\tfrac{5}{6}$. When they are not, the fraction reduces to a surd quotient — $\\sqrt{\\tfrac{12}{25}} = \\tfrac{\\sqrt{12}}{5} = \\tfrac{2\\sqrt{3}}{5}$ — and 8.3\'s rationalisation craft takes over from there. The extraction lesson\'s fraction duty ends at handing a *clean surd or rational* to the behaviour laws of 8.3 — the division between the chapters\' labour is itself the book\'s architecture.',
        },
        {
          kind: 'formula',
          name: 'The pairing and fraction laws',
          latex: '\\sqrt{100x} = 10\\sqrt{x}, \\qquad \\sqrt{\\frac{p}{q}} = \\frac{\\sqrt{p}}{\\sqrt{q}} \\;(p, q > 0)',
          note: 'Two radicand-digits per root-digit (10² = 100) — why the pairing starts at the decimal point; and the root of a quotient is the quotient of the roots, both proved by squaring.',
        },
        { kind: 'heading', text: 'Cube roots — factor, strip and map' },
        {
          kind: 'para',
          text: 'Cube roots run the same architecture one dimension up, and the factor method transfers verbatim with exponents *thirded*: a perfect cube has every prime exponent divisible by $3$. $1{,}728 = 2^6 \\cdot 3^3 = (2^2 \\cdot 3)^3 = 12^3$, so $\\sqrt[3]{1{,}728} = 12$; $9{,}261 = 3^3 \\cdot 7^3 = (3 \\cdot 7)^3$, so $\\sqrt[3]{9{,}261} = 21$. Odd powers keep the sign — cubing preserves order — so negative radicands extract honestly: $\\sqrt[3]{-2{,}744} = -14$, since $(-14)^3 = -2{,}744$. And the census of cubes has its own last-digit discipline, worth a derivation because aptitude halls trade on it.',
        },
        {
          kind: 'derivation',
          title: 'The cube digit-map: the last digit of a cube names the last digit of its root',
          statement:
            'Claim: the map $b \\mapsto b^3 \\bmod 10$ (last digit of a cube to last digit of its root) is one-to-one on the digits $0$–$9$ — and the three-digit strip $\\lfloor N / 1000 \\rfloor$ brackets the leading digits of the root.',
          steps: [
            {
              label: 'Tabulate the cubes mod 10',
              formula: '0,1,8,7,4,5,6,3,2,9',
              explanation:
                'Cubing each digit and keeping the last digit: $0^3 \\to 0$, $1 \\to 1$, $2 \\to 8$, $3 \\to 7$ ($27$), $4 \\to 4$ ($64$), $5 \\to 5$, $6 \\to 6$, $7 \\to 3$ ($343$), $8 \\to 2$ ($512$), $9 \\to 9$ ($729$). Ten distinct outputs from ten inputs — the map never collides: the last digit of a perfect cube *names* its root\'s last digit. (The swap pairs $2 \\leftrightarrow 8$ and $3 \\leftrightarrow 7$ are not luck: $(10 - b)^3 = 1000 - 300b + 30b^2 - b^3 \\equiv -b^3 \\pmod{10}$ — complements cube to negatives mod 10.)',
            },
            {
              label: 'Strip three digits, read the bracket',
              formula: '(10a)^3 \\le (10a + b)^3 < (10(a + 1))^3 \\;\\Rightarrow\\; a^3 \\le \\tfrac{N}{1000} < (a + 1)^3',
              explanation:
                'A two-digit root $10a + b$ cubes between $(10a)^3 = 1000a^3$ and $(10a + 10)^3 = 1000(a+1)^3$ (cubing is order-preserving and strict). Divide by $1000$: the leading digits of the radicand (everything except the last three) land in $[a^3, (a+1)^3)$ — a bracket only *one* integer $a$ wide. So: strip the last three digits of the cube, find which cubes bracket the rest — that integer is the leading digit(s) of the root.',
            },
            {
              label: 'Assemble the shortcut',
              formula: '\\sqrt[3]{N}: \\text{ last digit of } N \\to \\text{ units digit}, \\quad \\lfloor N/1000 \\rfloor \\to \\text{ leading digit(s)}',
              explanation:
                'The two half-readings compose to the whole root for perfect cubes of at most two digits\' root — the classic aptitude shortcut, now a *theorem*. Test it on $19{,}683$: last digit $3$ maps to units digit $7$ ($7^3 = 343$ ends in $3$); strip three digits, $19$ — and $2^3 = 8 \\le 19 < 27 = 3^3$ — leading digit $2$. Root: $27$, and indeed $27^3 = 19{,}683$. Or on $148{,}877$: last digit $7$ maps to units $3$ ($3^3 = 27$); strip three, $148$ — $5^3 = 125 \\le 148 < 216 = 6^3$ — leading digit $5$. Root: $53$, and $53^3 = 148{,}877$. Both walks verified digit-by-digit in this lesson\'s verifier.',
            },
          ],
          result: 'b³ mod 10 names the units digit b; the strip ⌊N/1000⌋ ∈ [a³, (a+1)³) names the leading digit',
        },
        {
          kind: 'para',
          text: 'When the radicand is *not* a perfect cube, the crafts degrade honestly to brackets — and brackets are exact statements, not guesses. $\\sqrt[3]{3000}$: $14^3 = 2{,}744$ and $15^3 = 3{,}375$ bracket it; the distances ($3{,}000 - 2{,}744 = 256$ below, $375$ above) say the root sits nearer $14$. The same honest-bracket discipline runs square roots of non-squares: $\\sqrt{10}$ has $3 < \\sqrt{10} < 4$ from the census, and the hundredth bracket $3.16^2 = 9.9856 < 10 < 10.0489 = 3.17^2$ — with the *errors themselves computed* ($0.0144$ below, $0.0489$ above), the nearer-below verdict $\\sqrt{10} \\approx 3.16$ is a proved statement about position, not a decimal thrown at a wall. This is 8.1\'s squeeze discipline, now with the census and the division method as its suppliers.',
        },
        {
          kind: 'formula',
          name: 'The cube strip and map',
          latex: 'b^3 \\bmod 10 \\;\\text{names } b; \\qquad a^3 \\le \\lfloor N/1000 \\rfloor < (a+1)^3',
          note: 'The last-digit cube map is injective (0,1,8,7,4,5,6,3,2,9); the three-digit strip brackets the root\'s leading digit — together they read a two-digit cube root off a perfect cube at exam speed.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'The extraction families are permanent school-and-aptitude fare — the class-8 arc asks them by name and every recruitment paper banks them (all items below are this book\'s own, style labelled honestly as exam-style). (i) Perfect-square spotting: squares never end in 2, 3, 7 or 8 (sweep the last digits: 0,1,4,5,6,9 only), and a square ending in 0 has an even count of trailing zeros (the 2-and-5 pair up) — so 1,024 is a perfect square (32²) while 2,024 is not (ends in 4 — possible, but 45² = 2,025 brackets it out by one). (ii) The smallest-multiplier family: factor, then repair the odd exponents — 252 = 2²·3²·7 needs exactly one 7: ×7 → 1,764 = 42²; 1,008 = 2⁴·3²·7 → ×7 → 7,056 = 84²; the divisor twin: 1,620 = 2²·3⁴·5 → ÷5 → 324 = 18². (iii) Estimation brackets with a stated accuracy: √10 to the nearest hundredth → 3.16 (the bracket pair 9.9856 / 10.0489 decided by the nearer error). (iv) Cube-root shortcuts: ∛19,683 = 27 and ∛148,877 = 53 read off the digit map + strip in seconds — each shortcut *derived once* above, so you always know when it holds: perfect cubes, roots up to two digits.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Perfect square',
              def: 'A whole number that is the square of a whole number — by the Fundamental Theorem, one whose every prime exponent is even.',
            },
            {
              term: 'Gnomon',
              def: 'The L-shaped piece (one row plus one column) that grows an n × n square to an (n+1) × (n+1) square — 2n + 1 cells; hence the sum of the first n odd numbers is n².',
            },
            {
              term: 'Pythagorean triplet',
              def: 'A triple of whole numbers (a, b, c) with a² + b² = c²; manufactured by the recipe a = m² − n², b = 2mn, c = m² + n².',
            },
            {
              term: 'Trial divisor',
              def: 'In the division method, the quantity 20a (twice the root-so-far, in the new digit\'s units) to which the candidate digit b is appended before multiplying — (20a + b)·b.',
            },
            {
              term: 'Radicand',
              def: 'The number under the root sign — the input to any extraction craft.',
            },
            {
              term: 'Perfect cube',
              def: 'A whole number with every prime exponent divisible by 3; its cube root\'s digits are readable by the last-digit cube map and the three-digit strip.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'By the gnomon law, evaluate $1 + 3 + 5 + \\cdots + 17$ — and say how many terms the sum carries.',
                  solution: [
                    'The last term $17 = 2n - 1$ solves to $n = 9$ — the sum carries nine terms, and by the gnomon law the sum is exactly $n^2$.',
                    'So, $1 + 3 + 5 + \\cdots + 17 = 9^2 = 81$ — the odd numbers stacked into a $9 \\times 9$ square, no adding required.',
                  ],
                  answer: '81 (nine terms — the 9 × 9 square)',
                },
                {
                  q: 'How many whole numbers lie strictly between $20^2$ and $21^2$?',
                  solution: [
                    'The gap between consecutive squares is $21^2 - 20^2 = 2 \\cdot 20 + 1 = 41$ wide.',
                    'Excluding both endpoints: $41 - 1 = 40 = 2 \\times 20$ integers lie strictly between — the $2n$ law again.',
                  ],
                  answer: '40',
                },
                {
                  q: 'Compute $105^2$ by the $(a + b)^2$ identity — no long multiplication.',
                  solution: [
                    'Take $105 = 100 + 5$: the identity gives $(100 + 5)^2 = 100^2 + 2 \\cdot 100 \\cdot 5 + 5^2$.',
                    'So, $105^2 = 10{,}000 + 1{,}000 + 25 = 11{,}025$.',
                  ],
                  answer: '11,025',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'By prime factorisation, extract $\\sqrt{9801}$.',
                  solution: [
                    'Factor: $9{,}801 = 3^4 \\cdot 11^2$ (divide by 3 four times to 11, then 11 twice).',
                    'Every exponent is even — a perfect square: $\\sqrt{9{,}801} = 3^2 \\cdot 11 = 9 \\cdot 11 = 99$.',
                  ],
                  answer: '99',
                },
                {
                  q: 'Extract $\\sqrt{7744}$ by the factor method.',
                  solution: [
                    'Factor: $7{,}744 = 2^6 \\cdot 11^2$ (halve repeatedly: $7{,}744 \\to 3{,}872 \\to 1{,}936 \\to 968 \\to 484 = 4 \\cdot 121 = 2^2 \\cdot 11^2$ — collect: $2^6 \\cdot 11^2$).',
                    'All exponents even: $\\sqrt{7{,}744} = 2^3 \\cdot 11 = 8 \\cdot 11 = 88$.',
                  ],
                  answer: '88',
                },
                {
                  q: 'Extract $\\sqrt{44100}$.',
                  solution: [
                    'Factor: $44{,}100 = 441 \\cdot 100 = (3^2 \\cdot 7^2) \\cdot (2^2 \\cdot 5^2) = 2^2 \\cdot 3^2 \\cdot 5^2 \\cdot 7^2$.',
                    'Thus, $\\sqrt{44{,}100} = 2 \\cdot 3 \\cdot 5 \\cdot 7 = 210$ — every prime rides once outside the root.',
                  ],
                  answer: '210',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Run the long-division method on $\\sqrt{2}$ to four decimal places — list every trial product.',
                  solution: [
                    'Pair $2.\\;00\\;00\\;00\\;00$; first digit $1$ ($1 \\cdot 1 \\le 2$), remainder $1$, bring down $00 \\Rightarrow 100$.',
                    'Trial divisor $2$: $24 \\cdot 4 = 96 \\le 100 < 125 = 25 \\cdot 5$ — digit $4$; remainder $4$; bring down $\\Rightarrow 400$.',
                    'Trial divisor $28$: $281 \\cdot 1 = 281 \\le 400 < 564$ — digit $1$; remainder $119$; bring down $\\Rightarrow 11{,}900$.',
                    'Trial divisor $282$: $2824 \\cdot 4 = 11{,}296 \\le 11{,}900 < 14{,}125$ — digit $4$; remainder $604$; bring down $\\Rightarrow 60{,}400$.',
                    'Trial divisor $2828$: $28{,}282 \\cdot 2 = 56{,}564 \\le 60{,}400 < 84{,}849$ — digit $2$. So, $\\sqrt{2} = 1.4142$ to four decimal places, remainder $3{,}836$ certifying the bracket $1.4142^2 < 2 < 1.4143^2$.',
                  ],
                  answer: '1.4142 (products 96, 281, 11,296, 56,564)',
                },
                {
                  q: 'Extract $\\sqrt{7}$ to three decimal places by the division method.',
                  solution: [
                    'Pair $7.\\;00\\;00\\;00$: digit $2$ ($4 \\le 7 < 9$), remainder $3$, bring down $\\Rightarrow 300$.',
                    'Trial divisor $4$: $46 \\cdot 6 = 276 \\le 300 < 329$ — digit $6$; remainder $24$; bring down $\\Rightarrow 2{,}400$.',
                    'Trial divisor $52$: $524 \\cdot 4 = 2{,}096 \\le 2{,}400 < 2{,}625$ — digit $4$; remainder $304$; bring down $\\Rightarrow 30{,}400$.',
                    'Trial divisor $528$: $5285 \\cdot 5 = 26{,}425 \\le 30{,}400 < 31{,}716$ — digit $5$. Thus, $\\sqrt{7} = 2.645$ to three places, remainder $3{,}975$.',
                  ],
                  answer: '2.645',
                },
                {
                  q: 'Extract $\\sqrt{5.29}$ by the division method and say why the walk terminates.',
                  solution: [
                    'Pair $5.\\;29$: digit $2$ ($4 \\le 5 < 9$), remainder $1$, bring down $29 \\Rightarrow 129$.',
                    'Trial divisor $4$: $43 \\cdot 3 = 129$ — the product equals the remainder exactly; subtract to zero.',
                    'Hence, $\\sqrt{5.29} = 2.3$ exactly — a terminating walk, because $5.29 = 2.3^2$ is a perfect square of a decimal ($23^2 = 529$ at scale).',
                  ],
                  answer: '2.3 exactly (43·3 = 129 closes the walk)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Extract $\\sqrt{12.25}$ and $\\sqrt{0.0144}$ — pair from the decimal point.',
                  solution: [
                    'Take $12 | 25$: digit $3$ ($9 \\le 12 < 16$), remainder $3$, bring down $25 \\Rightarrow 325$; trial divisor $6$: $65 \\cdot 5 = 325$ exactly. Thus, $\\sqrt{12.25} = 3.5$.',
                    'Take $0 | 01 | 44$: leading pair $0$ mints digit $0$; pair $01$: digit $1$ ($1 \\cdot 1 \\le 1$), remainder $0$, bring down $44 \\Rightarrow 44$; trial divisor $2$: $22 \\cdot 2 = 44$ exactly. Thus, $\\sqrt{0.0144} = 0.12$ — both walks terminate on perfect squares of decimals ($35^2 = 1{,}225$, $12^2 = 144$ at scale).',
                  ],
                  answer: '3.5 and 0.12',
                },
                {
                  q: 'Extract $\\sqrt[3]{9261}$ and $\\sqrt[3]{-2744}$ by prime factorisation.',
                  solution: [
                    'Factor $9{,}261 = 3 \\cdot 3{,}087 = 3^2 \\cdot 1{,}029 = 3^3 \\cdot 343 = 3^3 \\cdot 7^3 = (3 \\cdot 7)^3$ — so $\\sqrt[3]{9{,}261} = 21$.',
                    'Factor $2{,}744 = 2^3 \\cdot 343 = 2^3 \\cdot 7^3 = (2 \\cdot 7)^3 = 14^3$ — and cubing preserves sign, so $\\sqrt[3]{-2{,}744} = -14$.',
                  ],
                  answer: '21 and −14',
                },
                {
                  q: 'Evaluate $\\sqrt{\\frac{9}{16}}$ and $\\sqrt{\\frac{25}{36}}$.',
                  solution: [
                    'The root of a quotient is the quotient of the roots: $\\sqrt{\\tfrac{9}{16}} = \\tfrac{\\sqrt{9}}{\\sqrt{16}} = \\tfrac{3}{4}$ (square the claim: $\\tfrac{9}{16} = \\tfrac{9}{16}$).',
                    'Likewise, $\\sqrt{\\tfrac{25}{36}} = \\tfrac{\\sqrt{25}}{\\sqrt{36}} = \\tfrac{5}{6}$ — both fractions of perfect squares, so both roots rational.',
                  ],
                  answer: '3/4 and 5/6',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Read $\\sqrt[3]{19683}$ by the digit-map shortcut — show both half-readings.',
                  solution: [
                    'Last digit $3$: the cube map (units digits $0,1,8,7,4,5,6,3,2,9$) sends $3 \\leftarrow 7$ — the root\'s units digit is $7$.',
                    'Strip three digits: $19$; and $2^3 = 8 \\le 19 < 27 = 3^3$ — the leading digit is $2$. So, $\\sqrt[3]{19{,}683} = 27$; certified: $27^3 = 19{,}683$.',
                  ],
                  answer: '27',
                },
                {
                  q: 'Find the smallest whole number that must multiply $252$ to make a perfect square — and name the square.',
                  solution: [
                    'Factor $252 = 2^2 \\cdot 3^2 \\cdot 7$: the exponent $1$ on $7$ is the lone odd one.',
                    'Thus, multiply by exactly one $7$: $252 \\cdot 7 = 1{,}764 = 2^2 \\cdot 3^2 \\cdot 7^2 = (2 \\cdot 3 \\cdot 7)^2 = 42^2$ — the smallest such multiplier (any less leaves an odd exponent).',
                  ],
                  answer: '7 (252 × 7 = 1,764 = 42²)',
                },
                {
                  q: 'Estimate $\\sqrt{10}$ to the nearest hundredth, showing the bracket and both errors.',
                  solution: [
                    'The integer bracket from the census: $3^2 = 9 < 10 < 16 = 4^2$ — so $3 < \\sqrt{10} < 4$.',
                    'The hundredth bracket: $3.16^2 = 9.9856 < 10 < 10.0489 = 3.17^2$ (squares at scale: $316^2 = 99{,}856$, $317^2 = 100{,}489$).',
                    'So, $\\sqrt{10} \\approx 3.16$ — nearer below, since $10 - 9.9856 = 0.0144 < 0.0489 = 10.0489 - 10$ — a proved position, not a guess.',
                  ],
                  answer: '3.16 (nearer below)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Derive the engine of the division method from scratch: show $(10a + b)^2 = 100a^2 + (20a + b)b$ and read the digit-extraction rule out of it.',
                  solution: [
                    'Expand: $(10a + b)^2 = 100a^2 + 20ab + b^2$; collect the last two terms as one product: $20ab + b^2 = (20a + b)b$. So the identity reads $(10a+b)^2 = 100a^2 + (20a+b)b$.',
                    'Read the algorithm: the square of the root-so-far, $a$, contributes $100a^2$ — already subtracted in earlier steps (the factor $100$ because one digit step scales by $10$); what the radicand still owes is carried by the scaled remainder $100r$.',
                    'So, the next digit must keep the running difference non-negative: $(20a + b)b \\le 100r$ — the largest such $b$ is the next digit, the subtraction $100r - (20a+b)b$ refreshes the remainder, and the loop mints the digits forever (or to a zero remainder on a perfect square). Every step of the school recipe is this one expansion.',
                  ],
                  answer: 'expand, collect 20ab + b² = (20a+b)b, and impose the non-negativity of the running difference',
                },
                {
                  q: 'Prove the between-squares law: exactly $2n$ integers lie strictly between $n^2$ and $(n+1)^2$.',
                  solution: [
                    'The gap width: $(n+1)^2 - n^2 = 2n + 1$ — consecutive integers from $n^2 + 1$ up to $(n+1)^2 - 1$.',
                    'The count of that inclusive run: $(n+1)^2 - 1 - (n^2 + 1) + 1 = (n+1)^2 - n^2 - 1 = 2n + 1 - 1 = 2n$.',
                    'Hence, doubling the smaller root counts the run — e.g. $12^2 \\to 13^2$ carries $24$ integers — with no listing, ever.',
                  ],
                  answer: '(n+1)² − n² − 1 = 2n',
                },
                {
                  q: 'Prove the cube strip bound: for $N = (10a + b)^3$ with $0 \\le b \\le 9$, one has $a^3 \\le N/1000 < (a+1)^3$.',
                  solution: [
                    'Bracket the root first: $10a \\le 10a + b < 10a + 10$ (since $b \\le 9 < 10$) — and cubing is strictly order-preserving on positives (equal inputs give equal cubes; unequal give unequal).',
                    'Cube the bracket: $(10a)^3 \\le N < (10a + 10)^3$ — that is, $1000a^3 \\le N < 1000(a+1)^3$.',
                    'Divide by $1000$: $a^3 \\le N/1000 < (a+1)^3$ — so the integer formed by stripping the last three digits of a perfect cube lands in a bracket exactly one integer wide, $[a^3, (a+1)^3)$: the strip reads the root\'s leading digit, and (with the last-digit cube map for the units) the whole two-digit root follows.',
                  ],
                  answer: 'cube the 10a ≤ 10a+b < 10(a+1) bracket and divide by 1000',
                },
              ],
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'How many whole numbers lie strictly between $15^2$ and $16^2$?',
              options: ['29', '30', '31', '32'],
              answer: 1,
              explain:
                'The gap is $16^2 - 15^2 = 2 \\times 15 + 1 = 31$ wide; excluding both endpoints leaves $31 - 1 = 30 = 2n$ integers — the between-squares law. Option 0 forgets to drop an endpoint; option 2 adds one instead; option 3 is the raw gap width without exclusions.',
            },
            {
              q: 'In the long-division method, with root-so-far $a$ and scaled remainder $r$ (two fresh digits just brought down), the next digit $b$ is the largest digit with:',
              options: [
                '$(a + b) \\cdot b \\le 10r$',
                '$(2a + b) \\cdot b \\le 10r$',
                '$(20a + b) \\cdot b \\le 100r$',
                '$(20a - b) \\cdot b \\le 100r$',
              ],
              answer: 2,
              explain:
                'The engine is $(10a+b)^2 = 100a^2 + (20a+b)b$: after the square of the root-so-far is subtracted, the radicand\'s debt sits in the scaled remainder $100r$, and the candidate digit must keep the subtraction non-negative: $(20a+b)b \\le 100r$ — the doubling of $a$ and the factor $100$ are both forced by the algebra ($10a + b$ appends the digit; one digit step scales the radicand by a hundred). Options 0 and 1 lose the place-value factors ($20$ from the append, $100$ from the two brought-down digits); option 4 subtracts the very digit the product needs.',
            },
            {
              q: 'By the cube digit-map shortcut, $\\sqrt[3]{148877}$ equals:',
              options: ['43', '57', '63', '53'],
              answer: 3,
              explain:
                'Last digit $7$: the cube map sends the units digit $3 \\to 7$ ($3^3 = 27$ ends in $7$; the map is injective). Strip three digits: $148$, and $5^3 = 125 \\le 148 < 216 = 6^3$ — leading digit $5$. Root: $53$, certified by $53^3 = 148{,}877$. The distractors fail the strip ($4^3 = 64$ and $6^3 = 216$ bracket wrongly) or the map ($57$ and $63$ end in the wrong digit for a cube ending in $7$).',
            },
            {
              q: 'The smallest whole number that must multiply $1008$ to make a perfect square is:',
              options: ['3', '7', '21', '2'],
              answer: 1,
              explain:
                'Factor $1008 = 2^4 \\cdot 3^2 \\cdot 7$: only the $7$ carries an odd exponent, so exactly one more $7$ repairs the census: $1008 \\times 7 = 7056 = 84^2$. Multiplying by $3$ leaves $2^4 3^3 7$ — still odd; by $2$ leaves the $7$ odd; by $21$ overshoots to $21{,}168$ — not even a square ($145^2 < 21{,}168 < 146^2$), and anyway not the *smallest*.',
            },
            {
              q: 'Why are the radicand\'s digits paired outward from the decimal point before the division method runs?',
              options: [
                'because a square always has an even number of digits',
                'because the algorithm halves the radicand, and halving needs pairs',
                'because each digit step left multiplies the radicand by 10 — and a number\'s square therefore scales by 100, so root digits are minted two radicand-digits at a time',
                'because the decimal point must sit at an even position for the root to be real',
              ],
              answer: 2,
              explain:
                'One digit step left multiplies any number by $10$; squaring multiplies by $10^2 = 100$. So each new digit of a root corresponds to a fresh pair of radicand digits — pairing is place value squared ($\\sqrt{100x} = 10\\sqrt{x}$). Option 0 is false ($100$ through $999$ include $121$, $144$, $\\ldots$ with odd digit counts); option 1 describes nothing in the algorithm; option 4 confuses the pairing with reality of the root.',
            },
          ],
        },
        {
          kind: 'para',
          text: 'The chapter closes for real now — theory first (the diagonal, the family, the behaviour, the completed line), then craft: the census that recognises squares, the factorisation that halves and thirds exponents, the division method whose every subtraction is the algebra of $(10a+b)^2$, and the cube shortcuts that read roots off perfect cubes like street numbers. Every craft in this lesson was *derived* — the book\'s standing promise, kept to the last page. The extraction tools now point the book toward its final vistas: chapter 9 asks how humanity ever learned to *write* numbers down — five numeration systems, from tally to decimal zero — and the closing chapter maps the whole tower of systems from above.',
        },
      ],
    },
  ],
  plannedLessons: [],
}
