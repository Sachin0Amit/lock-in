import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 8: Irrationals and the Real
 * Line
 *
 * LESSONS WRITTEN: 8.1 The Diagonal That Broke the Rationals (run 60)
 *                  8.2 The Family of Irrationals (run 60)
 * CHAPTER IN PROGRESS (run 60 — the first two-lessons-per-run run under
 * the owner's 2026-11-06 v2 hourly directive; 8.3 + 8.4 + the unit-8
 * review belong to the next runs).
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * irrationality/real-numbers spine) + Khattar QA 4e ch. 1 (the
 * competitive-exam surds scope) — see docs/project/SOURCE_LOG.md. New
 * citation keys: baudhayana-sulbasutras, hippasus-irrationality-tradition
 * (8.1); plato-theaetetus-theodorus, cantor-1874-algebraic-numbers (8.2)
 * — web-checked 2026-11-06. All arithmetic pre-verified by
 * scripts/verify-book2-ch08.ts (94 checks, sections A–N, ALL PASS before
 * writing; nine pre-writing defects caught, including a wrong remembered
 * digit string for √7 — the script, not memory, is the source of truth).
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
  status: 'in-progress',
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
        `<line x1="${DIS_CX}" y1="${DIS_CY}" x2="${t[0]}" y2="${t[1]}" stroke="#b45309" stroke-width="1.2"/>`
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
        `<text x="${Math.round(l.mid[0] + l.dx)}" y="${Math.round(l.mid[1] + l.dy)}" font-size="12" fill="#b45309" text-anchor="middle" font-style="italic">${l.t}</text>`
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
  <text x="${DIS_CX - DIS_S - 18}" y="${DIS_CY + DIS_S + 44}" font-size="12.5" font-weight="700" fill="#b45309">so d² = 2</text>
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
  <line x1="${g.xlo}" y1="${row.y}" x2="${g.xhi}" y2="${row.y}" stroke="#b45309" stroke-width="2.4"/>
  <line x1="${g.xlo}" y1="${row.y - 5}" x2="${g.xlo}" y2="${row.y + 5}" stroke="#b45309" stroke-width="1.6"/>
  <line x1="${g.xhi}" y1="${row.y - 5}" x2="${g.xhi}" y2="${row.y + 5}" stroke="#b45309" stroke-width="1.6"/>
  <text x="${g.xlo}" y="${labY}" font-size="11" fill="#b45309" text-anchor="middle">${row.lo}</text>
  <text x="${g.xhi}" y="${labY}" font-size="11" fill="#b45309" text-anchor="middle">${row.hi}</text>
  <circle cx="${g.x2}" cy="${row.y}" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="${g.x2}" y="${row.y - (above ? 10 : -18)}" font-size="11.5" font-weight="700" fill="currentColor" text-anchor="middle">√2</text>`
  }).join('\\n')}
  <text x="470" y="30" font-size="11" fill="currentColor" opacity="0.7" text-anchor="end">each row re-zooms on the previous bracket — the ring never lands</text>
</svg>`,
        },
        { kind: 'heading', text: 'Density is not fullness: the hole at √2' },
        {
          kind: 'para',
          text: 'Now the honest ledger — what the ladder proves and what it merely suggests. What it *proves*: the rationals crowd arbitrarily close to $\\sqrt{2}$ from both sides — bracket widths $\\tfrac{1}{10}$, $\\tfrac{1}{100}$, $\\tfrac{1}{1000}$, $\\tfrac{1}{10000}$, with no end. That is 7.3’s density, seen from outside: it is not only that rationals pack between any two rationals; they pack against the *irrational* points too. What it *suggests but does not prove*: that there is a *point* at the ring — something the brackets close on. Look at the split the ladder rides: every rational $r$ satisfies exactly one of $r^2 < 2$, $r^2 = 2$, $r^2 = 2$ impossible (that is this lesson), so every rational is strictly on one side — $r^2 < 2$ (the lower shore) or $r^2 > 2$ (the upper shore). Both shores are populated and neither has a rational boundary member: given any rational with $r^2 < 2$, the next bracket rung finds a bigger one still below; given any with $r^2 > 2$, a smaller one still above. The two shores face each other across a gap that contains no rational point — yet *something* is there: the diagonal’s length did not vanish when we proved fractions cannot reach it.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The two shores, named',
          text: 'The split is worth naming now because chapter 8.4 will build on it: $L = \\{r \\in \\mathbb{Q} : r^2 < 2 \\text{ or } r < 0\\}$ and $U = \\{r \\in \\mathbb{Q} : r^2 > 2\\}$ — the lower and upper shores of the hole. Every rational is in exactly one shore (7.2’s trichotomy), $L$ has no largest member, $U$ has no smallest member, and the pair together cut the whole rational line in two. A construction like this — a partition of $\\mathbb{Q}$ into a left class with no maximum and a right class with no minimum — is called a *cut*, and Dedekind’s 1871–72 insight (the same mathematician who named the field in 7.2) was that the cut itself can serve as the *definition* of the missing number. That is the real line’s birth certificate, and it arrives in 8.4.',
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
          ? `<circle cx="${x}" cy="88" r="4" fill="none" stroke="#b45309" stroke-width="1.8"/>`
          : `<circle cx="${x}" cy="88" r="3.4" fill="currentColor"/>`
        return `<line x1="${x}" y1="${ty1}" x2="${x}" y2="${ty2}" stroke="${surd ? '#b45309' : 'currentColor'}" stroke-width="1.2"/>${dot}<text x="${x}" y="${ly}" font-size="10.5" text-anchor="middle" fill="${surd ? '#b45309' : 'currentColor'}" font-weight="${surd ? '700' : '400'}">${lab}</text>`
      })
      .join('\n  ')
  })()}
  <line x1="60" y1="80" x2="60" y2="96" stroke="currentColor" stroke-width="1.4"/>
  <text x="60" y="128" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.85">0</text>
  <line x1="460" y1="80" x2="460" y2="96" stroke="currentColor" stroke-width="1.4"/>
  <text x="460" y="128" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.85">5</text>
  <text x="480" y="34" font-size="11" fill="#b45309" text-anchor="end">open rings: the surd family — holes in ℚ</text>
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
        `<text x="${lx.toFixed(1)}" y="${(ly + 3.5).toFixed(1)}" font-size="9.5" text-anchor="middle" fill="${k % 2 === 1 ? 'currentColor' : '#b45309'}" font-weight="600">√${k + 1}</text>`
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
  ],
  plannedLessons: ['How Irrationals Behave', 'Completeness: the Line Without Holes'],
}
