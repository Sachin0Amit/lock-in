# AA Chapter 8 Master Plan — The Theory of Equations (run 119 swarm)

**Book:** Advanced Algebra (mathematics shelf, book #4). **Chapter 8, slug
'theory-of-equations'.** Authored whole-unit by the run-119 swarm (owner
directive "launch multiple authoring agents", 2026-11-21; the run-114/115
precedent: one agent per lesson, orchestrator assembles + gates + ships).

**Ground:** the Drive `M2 Algebra :: 02. Theory of Equations` module
(`cengage-m2-02`, id `1b4ZfmNHpNaN3LBbJWDx0tp9fINUUM1m6`, 57 MB, 83 pp;
printed 2.1–2.50 = PDF 3–52, offset +2) — vision-transcribed bands:
definitions/factor-theorem/key-points (printed 2.1–2.8) and symmetric
functions/higher-degree Viète/cubic solving/repeated roots (printed
2.17–2.27); the Hall & Knight Higher Algebra theory-of-equations arc
(`hall-knight-higher-algebra`, 35-chapter TOC banked run 66 — the classic
Cardan/Ferrari/Descartes/transformation/reciprocal territory); the JEE Main
unit list (`jee-main-2026-syllabus`) and the Cengage presentation contract
(`cengage-jee-style`). STUDY-NEVER-REPRODUCE absolute: every roster,
witness, figure, Illustration, quiz item and exercise below is OUR OWN,
engine-pinned in scripts/verify-book4-ch08.ts.

**Chapter arc (book.ts summary, binding):** the polynomial's deepest
algebra — how many roots a degree-n equation truly has (n over ℂ, the
fundamental theorem STATED not proved, multiplicities counted, the
conjugate-pair law derived from ch.3's algebra); Descartes' rule of signs;
Viète generalized to cubics and quartics (the symmetric-function
staircase, reads when the roots are not nice); Cardan and Ferrari (the
cubic and quartic solved, with the casus irreducibilis honesty); the
transformation craft (roots shifted, scaled, inverted — hard cubics turned
transparent, the loss-of-root warning); reciprocal equations (the
palindromic structure reduced to quadratics in x + 1/x).

**Teaching order = plannedLessons order (binding):**
8.1 → 8.2 → 8.3 → 8.4 → 8.5 → 8.6 → 8.R.

## Per-lesson arcs and the SHARED pinned witnesses (every lesson's engine
brute-forces its own numbers; the witnesses below are chapter-wide pins the
review re-audits — the spec rosters refine them per lesson):

- **8.1 'How Many Roots: Degree n, n Roots'** (id `aa-how-many-roots-degree-n-n-roots`)
  — the counting question: definitions (real/complex polynomial — the two
  glossary folds; roots; solution set), the fundamental theorem STATED with
  honesty (n roots over ℂ counted with multiplicity; not proved — the
  platform's honesty note), the factor-theorem census tool (cross-ref
  ch.2's use), multiplicity arithmetic, the conjugate-pair law DERIVED from
  ch.3's algebra (P(z̄) = P(z)̄ for real coefficients), the odd-degree
  corollary. Witnesses: x³−x²+x−1 = (x−1)(x²+1) — degree 3, exactly the
  three roots {1, i, −i}; (x−1)²(x−2)³ degree 5 = five roots with
  multiplicity; the odd-degree sweep (x³+x+1 has a real root ≈ −0.6823;
  x⁵+x+1 sign change between −1 and 0).
- **8.2 'Descartes' Rule of Signs'** (id `aa-descartes-rule-of-signs`) —
  variations vs positive roots (the even-deficit honesty), f(−x) for
  negative roots, the census craft combined with 8.1's conjugate parity.
  Witnesses: x³−7x+6 = (x−1)(x−2)(x+3): +−+ → 2 variations, 2 positive
  roots {1,2}, deficit 0; f(−x) = −x³+7x+6: 1 variation, 1 negative root
  (−3); x³−x²+x−1: 3 variations, 1 positive root, deficit 2 (the ±i pair).
- **8.3 'Cubics and Quartics: the Symmetric Functions'** (id
  `aa-cubics-and-quartics-the-symmetric-functions`) — Viète degree 3 and 4
  (the staircase), the reads when the roots are not nice (power sums by
  Newton identities, reciprocal sums, pairwise reads), the cubic-from-roots
  craft, the factor-theorem cubic solve. Witnesses: {1,2,3} → x³−6x²+11x−6
  (σ₁ = 6, σ₂ = 11, σ₃ = 6); {1,2,3,4} → x⁴−10x³+35x²−50x+24; Newton p₂ =
  14, p₃ = 36 on {1,2,3}; Σ1/r = σ₂/σ₃ = 11/6; the ugly-roots cubic
  x³−4x²+6x−4 = (x−2)((x−1)²+1) with roots 2, 1±i.
- **8.4 'Cardan and Ferrari: the Cubic and Quartic, Solved'** (id
  `aa-cardan-and-ferrari-the-cubic-and-quartic-solved`) — the depressed
  cubic x = t − a/3; Cardan's u+v substitution with 3uv = −p; the
  discriminant Δ = −4p³−27q²; the three cases with the casus irreducibilis
  honesty (three real roots, formula routed through complex cube roots —
  ch.3's De Moivre cashed); Ferrari's resolvent on the depressed quartic;
  the Sophie Germain special case. Witnesses: x³−3x+2 = (x−1)²(x+2)
  (Δ = 0); x³−7x+6 roots 1,2,−3 (Δ = 400 > 0 — the casus; u³,v³ =
  −3 ± (10/√27)i, the three ω-combinations land 1, 2, −3); x³+3x+1
  (Δ = −135 < 0; x = ∛((−1+√5)/2) + ∛((−1−√5)/2) ≈ −0.3222); Ferrari on
  x⁴−25x²+60x−36 = (x−1)(x−2)(x−3)(x+6): resolvent M³−50M²+769M−3600 = 0
  has the rational root M = 9 → m = 3 → the split (x²+3x−18)(x²−3x+2);
  Sophie Germain x⁴+4 = (x²−2x+2)(x²+2x+2).
- **8.5 'Transformation of Equations'** (id
  `aa-transformation-of-equations`) — the craft: shifted roots (P(x−h) has
  the roots r+h), scaled (kr), inverted (1/r via xⁿP(1/x)); the
  diminished-roots craft turning hard cubics transparent; the LOSS-OF-ROOT
  derivation annex (dividing both sides by a common factor drops its
  roots) + the extraneous-roots mirror (squaring expands the domain).
  Witnesses: {1,2,3} cubic x³−6x²+11x−6 shifted by +2 → x³−12x²+47x−60
  (roots {3,4,5}); scaled ×3 → x³−18x²+99x−162 (roots {3,6,9}); inverted
  → 1−6x+11x²−6x³ (roots {1, 1/2, 1/3}); the loss witness x³−x = 0 has
  {0,1,−1} — dividing by x loses 0; the extraneous witness √x = x−2 gains
  x = 1.
- **8.6 'Reciprocal Equations'** (id `aa-reciprocal-equations`) — the
  palindromic structure; the t = x + 1/x reduction (÷ x², pair the terms);
  the ladder x²+1/x² = t²−2, x³+1/x³ = t³−3t; even degree → quadratic in
  t; odd degree → the guaranteed root (x = −1 palindromic, x = 1
  anti-palindromic). Witnesses: x⁴+7x³+14x²+7x+1 = (x²+3x+1)(x²+4x+1):
  t²+7t+12 = (t+3)(t+4) → t ∈ {−3,−4} → x = (−3±√5)/2 and −2±√3 (two
  reciprocal pairs); x³+ax²+ax+1 = (x+1)(x²+(a−1)x+1).
- **8.R 'Unit 8 Completion Review'** (id
  `aa-theory-of-equations-unit-8-review`) — the 6.R/7.R architecture: The
  Arc (six storeys + the promise-cashings: 8.1's conjugate pairs → 8.2's
  real/non-real census; 8.1's multiplicity → 8.3's Viète staircase; 8.3's
  symmetric reads → 8.4's Cardan verification; 8.5's inversion → 8.6's
  reciprocal structure; 8.2's parity → the review's own root-census bench);
  The Master Tables; The Witnesses Re-Audited; The Laws Worth Recalling;
  The Traps the Hall Sets (fundamental theorem 'stated not proved';
  dividing by a common factor; Descartes' even deficit; the transformation
  direction sign; casus trust); The Chapter Closes (handoffs to ch.9
  'Exponentials and Logarithms' — the next unit — and ch.10's synthesis;
  the calculus doorstep named).

## Fold obligations (binding, from TOC_FOLD_LEDGER):
- 8.1 hosts: 'Real Polynomial' (glossary), 'Complex Polynomial' (glossary).
- 8.5 hosts: 'Loss of Root' (derivation-annex).

## Gates: the run-118 discipline — per-agent engine sections green before
that agent's prose; the assembled verify-book4-ch08.ts (sections A–N + Z)
all-green; tsc 0 / lint 0 / lib:pack + check / the three standing gates /
E2E per lesson across 1280 + 390 + dark with quiz 5/5 live / the VLM strict
figure audit (light + dark) / six-file memory set / commit + push.
