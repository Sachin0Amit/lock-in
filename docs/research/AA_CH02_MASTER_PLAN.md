# AA Chapter 2 — "The Quadratic at Depth" authoring master plan

> Written 2026-11-15 (run 100 opening, the first authoring run after
> Elementary Algebra re-completed in run 99). Follows the run-90 protocol:
> Drive download → vision transcription → internet research → master plan →
> verify-first → author. This file is the chapter's standing reference for
> every run until chapter 2 completes. NOTE FOR FUTURE FIRES: run 99's
> RESUME_POINTER recorded "author AA 1.7 + 1.8" — that was a misread of a
> stale PROGRESS note; AA chapter 1 CLOSED COMPLETE in run 94 (commit
> a5b97df; 1.7 = 9f2b03c). Chapter 2 is the true next unit.

## 1. The research protocol this chapter follows (run 100 record)

1. **Drive download for the unit** — `M2 Algebra :: 02. Theory of Equations`
   (Drive id `1b4ZfmNHpNaN3LBbJWDx0tp9fINUUM1m6`, 57 MB scanned PDF) →
   `temporary-references/m2-02-theory-of-equations.pdf`. Page-offset
   calibration: printed page `2.N` = PDF page `N + 2` (verified by VLM:
   PDF 16 shows header "2.14 Algebra" opening at Illustration 2.39).
2. **Text extraction attempted first** — `pdftotext` yields 83 chars total:
   a pure scan, so the vision model is mandatory. Vision transcription in
   four batches (4+4+3+3 pages) of exactly the sections the chapter owns:
   printed pp. 2.9–2.11 (Graphs of Polynomial Functions — the
   leading-coefficient + multiplicity reads), 2.13–2.16 (Quadratic Equation
   and Nature of Roots + Finding Range of Function Involving Quadratic
   Expression + the two-variable bound trick), 2.28–2.31 (Quadratic
   Function — the vertex completion, the six sign cases, the always-sign
   law, Illustrations 2.97–2.104), 2.36–2.38 (Solving Inequalities Using
   Location of Roots + CAE 2.13 with answers) →
   `temporary-references/m2scan/tr-2.9-2.11.txt`, `tr-2.13-2.16.txt`,
   `tr-2.28-2.31.txt`, `tr-2.36-2.38.txt` (~45K chars total).
3. **Internet research** (2026-11-15): JEE Main 2026 syllabus algebra unit
   — "quadratic equations and inequalities: quadratic equations with real
   coefficients, the discriminant, relations between roots and coefficients,
   symmetric functions of roots, location of roots, inequalities" — and the
   standard sign-chart/number-line treatment of quadratic inequalities
   (bhanzu/Khan-style canonical arcs). NCERT class 10 ch. 4 owns the school
   side (AL 9 banked it); this chapter is the competitive-depth re-read.
4. **Study-never-reproduce rule**: the module informs and verifies concepts;
   every roster, number, figure and exercise in our lessons is OUR OWN and
   recomputed by the verifier before any prose exists. The module's
   Illustration numbers (2.36–2.48, 2.97–2.104, 2.119–2.122) are studied
   shapes, never copied.

Companion sources (banked earlier): Hall & Knight *Higher Algebra*
(Drive, banked run 66 — ch. XXII "Theory of Quadratic Equations" is the
classic stretch for lessons 2.3/2.4, re-download then), Khattar QA 4e
(aptitude side), NCERT class 10–11 arcs, OpenStax College Algebra.

## 2. Chapter map — module sections → our four lessons

| # | Our lesson (planned title = book.ts plannedLessons) | Module ground (printed pp.) | Notes |
|---|---|---|---|
| 2.1 | Vertex Form at Work: Maxima and Minima | Quadratic Function 2.28–2.30 + Finding Range… 2.15 + nature-of-roots 2.13 | the vertex as an optimization tool: the completion, the range law, the six sign cases, the always-sign law, max/min exhibits, the two-family optimization, the parameter family, the discriminant-range method for rational quadratics |
| 2.2 | Quadratic Inequalities and the Sign Diagram | Solving Inequalities Using Location of Roots 2.36–2.37 + Graphs of Polynomial Functions 2.9–2.11 + the six cases re-read as sign bands | HOSTED FOLDS (TOC_FOLD_LEDGER, m2-02, mode section): "Graphical Interpretation of Zero of an Expression" + "Domain of Equation" must appear as NAMED SUBSECTIONS with definition + worked example each |
| 2.3 | Symmetric Reads and Common Roots | Relation between Roots and Coefficients 2.17–2.22 + Common Roots 2.23–2.24 | HOSTED FOLDS: "Condition for Both Common Roots" (example-family ≥2) + "Repeated Roots" (section). H&K XXII stretch |
| 2.4 | Location of Roots: Doors in Intervals | Location of Roots 2.31–2.37 | the four-condition system, interleaving, Rolle's honesty note |

Run-100 scope: **2.1 and 2.2 only**, strictly sequential (2.1 fully gated
before 2.2 starts). The chapter has 4 lessons, so the run does NOT close it;
the unit-2 review + chapter close ride a later run.

## 3. Lesson 2.1 "Vertex Form at Work: Maxima and Minima" — authoring plan

**Positioning.** AL 9.2 derived completing the square; AL 10.3 drew the
parabola and read its vertex graphically; AL 9.3 priced the discriminant as
the door-census. This lesson cashes all three at competitive depth: the
quadratic stops being an equation to solve and becomes an EXPRESSION whose
extreme values and sign are read off the completed form. The vertex is now
a tool: it prices the range, it decides every "always positive/always
negative" question, it solves optimization word problems, and — via the
discriminant trick on a re-parameterized equation — it finds the range of
rational quadratic expressions.

**Theory sections (Cengage house voice):**

1. *From equation to expression* — AL solved ax² + bx + c = 0; the
   examination's deeper question is ax² + bx + c itself: how large can it
   be? The completion identity a[(x + b/2a)² − D/4a²] DERIVED (the module's
   own completion re-derived in our notation); the vertex (−b/2a, −D/4a)
   and the axis.
2. *The range law* — a > 0 ⇒ range [−D/4a, ∞), min −D/4a at x = −b/2a;
   a < 0 ⇒ range (−∞, −D/4a], max −D/4a. Both proved from the squared
   term's sign, not asserted. The three-position trio for a > 0 (D < 0 all
   above; D = 0 touching; D > 0 dipping) as our figure.
3. *The six sign cases and the always-sign law* — the case table (a ± × D
   ± with the sign read), then the LAW: f ≥ 0 on ℝ ⟺ a > 0 AND D ≤ 0;
   f ≤ 0 on ℝ ⟺ a < 0 AND D ≤ 0 (the note the module prints after its
   case table). The parameter-family application (find the least n so the
   expression is always positive — our own exhibit).
4. *Max/min at work* — the completing-the-square exhibits (min of
   x² − 4x + 7 = 3 at x = 2; max of −x² + 6x − 5 = 4 at x = 3 — our own
   numbers), then the WORD PROBLEMS: the 24 m fence and the maximum-area
   rectangle (A(x) = x(12−x), max 36 at x = 6, the "vertex IS the best
   rectangle" read), the sum-20/product-100 pair, and the two-family
   optimization (max of f = a − (x−1)² − 2 vs min of g = (x−a)² + 11 − a
   − a²: a² + 2a − 13 < 0 ⇒ a ∈ (−1−√14, −1+√14), largest natural a = 2 —
   the module's Illustration 2.99 shape, our numbers).
5. *Vertex reconstruction* — build the expression from the vertex and one
   value (vertex (3, −2), f(0) = 10 ⇒ f(x) = (4/3)x² − 8x + 10 is the
   module's shape; OUR version: vertex (−1, 4), f(1) = 2 ⇒ f(x) =
   −2(x+1)² + 4 = −2x² − 4x + 2; check f(1) = −2−4+2·1... = −2(4)+4 =
   −4 ≠ 2!! CAREFUL: −2(x+1)²+4 at x=1 is −8+4 = −4. Redesign: want
   f(1) = 2 with vertex (−1, 4): f(x) = a(x+1)² + 4; f(1) = 4a + 4 = 2 ⇒
   a = −1/2 ⇒ f(x) = −(x+1)²/2 + 4 = −x²/2 − x + 7/2. Numbers are
   fractional-clean; the verifier will pin them.)
6. *The discriminant-range method* — for y = (quadratic)/(always-positive
   quadratic), rearrange to a quadratic in x and demand real solutions:
   D ≥ 0 in y prices the range. Exhibits: x + 1/x for x > 0 (⇒ y ≥ 2,
   attained at x = 1 — with the honest forward pointer to AA ch. 4's
   AM–GM, which will re-derive it); (2x² + 3x + 6)/(x² + x + 1) ⇒ range
   [(13 − 2√13)/3, (13 + 2√13)/3] ≈ [1.930, 6.737] (our own coefficients;
   the denominator is always positive since its D = −3); the two-variable
   bound trick (x² + 9y² − 4x + 3 = 0 in real (x, y) ⇒ x ∈ [1, 3] and
   y ∈ [−1/3, 1/3] is the module's 2.48 shape; OUR version: x² + 4y² −
   6x + 5 = 0 ⇒ treating as quadratic in x: 36 − 4(4y² + 5) ≥ 0 ⇒
   4y² ≤ 4 ⇒ y ∈ [−1, 1]; as quadratic in y: −4·(x² − 6x + 5) ≥ 0 ⇒
   (x−1)(x−5) ≤ 0 ⇒ x ∈ [1, 5]; verifier checks the bounds are attained).

**Illustrations (all our own, verifier-certified):** the completion
identity verified by expansion; the min/max pair; the fence rectangle with
A(4) = 32, A(6) = 36, A(9) = 27; the two-family gap problem; the vertex
reconstruction; the least-n parameter family (OUR design: least n ∈ ℕ with
(n−3)x² + 6x + (n+1) > 0 ∀x: need n−3 > 0 and D_x = 36 − 4(n−3)(n+1) =
−4n² + 8n + 48 < 0 ⟺ n² − 2n − 12 > 0 ⟺ n > 1 + √13 ≈ 4.606 ⇒
n ≥ 5. CHECK n = 5: 2x² + 6x + 6 = 2(x² + 3x + 3), inner D = 9 − 12 < 0 ✓;
n = 4: x²·1 + 6x + 5 = (x+1)(x+5) — negative between roots ✗. So least
n = 5.); the discriminant-range pair; the two-variable bounds.

**Figures (2, vivid palette, labels match prose):**
- `vertexTrioSvg` — one panel, three teal/amber/lime upward parabolas
  sharing the axis x = 2: x² − 4x + 7 (D = −12, min 3), (x − 2)² (D = 0,
  min 0), x² − 4x + 3 (D = 4, min −1, roots 1 and 3 marked) with the
  range brackets annotated — the three positions of one opening.
- `fenceAreaSvg` — the 24 m fence: A(x) = x(12 − x) as the lime area
  parabola with the vertex (6, 36) marked and the three sample rectangles
  inset (4×8 → 32, 6×6 → 36, 9×3 → 27) — the vertex IS the best rectangle.

**Quiz** — 5 items, keys pinned pre-writing (section E): the vertex read;
the range law direction (a < 0 trap); the always-positive law (the a > 0
AND D ≤ 0 conjunctive trap); the two-family gap verdict; the discriminant-
range read.

**Exercises** — 14 items L1–L6: completion runs; range reads; six-case
verdicts; parameter families; vertex reconstructions; word problems (fence,
number pair, projectile-style height without physics vocabulary — honest
algebraic framing); the discriminant-range method on two rational
expressions; the L5 two-variable bound; L6 the "at least one positive x"
case analysis (the module's 2.119 shape, our coefficients: x² + mx + 3 has
a negative value at some positive x ⟺ m < −2√3).

**Formula cards** — the completion identity; the vertex pair; the two
range laws; the always-sign law; the discriminant-range procedure.

## 4. Lesson 2.2 "Quadratic Inequalities and the Sign Diagram" — authoring plan

**Positioning.** AL 7 solved LINEAR inequalities; 2.1 priced the quadratic
expression's extreme values and its six sign cases; this lesson builds the
SIGN DIAGRAM — the craft that turns "where is the parabola above the line?"
into a two-second read — and then the location-of-roots bridge that JEE
actually examines (conditions that pin both roots, or exactly one, inside a
chosen interval). The two hosted folds ride here as named sections.

**Theory sections:**

1. *Zeros and their graphical interpretation* (HOSTED FOLD, named
   subsection) — the zero of the expression vs the root of the equation
   (the module's 2.5 distinction, our own words + our own worked example):
   the zeros are exactly where the graph meets the x-axis; between a pair
   of distinct real zeros an a > 0 quadratic is BELOW the axis, outside it
   is ABOVE (proved from 2.1's completion: f(x) = a[(x − h)² − D/4a²] with
   the two roots straddling h symmetrically).
2. *The sign diagram* — the four-step recipe (standard form, real roots,
   the sign ladder, the union answer); the sign NEVER changes except at a
   zero (the honest interval argument: between consecutive zeros the
   completed form has fixed sign); strict vs non-strict endpoints; the
   three special answers (all ℝ, all ℝ except one point, ∅) for the D < 0
   and D = 0 families; the a < 0 flip discipline (multiply through by −1
   and flip the inequality — with the "always divide by a², never by a"
   honesty note). Our figure: the sign ladder under x² − 7x + 10.
3. *Domain of an equation* (HOSTED FOLD, named subsection) — the domain
   check before solving: √(quadratic) demands the radicand ≥ 0; 1/(quad)
   demands ≠ 0; the extraneous-root census on our own worked example
   (√(x + 6) = x ⇒ x + 6 = x² ⇒ x = 3 or x = −2, and only x = 3
   survives the radical's non-negativity — the loss-of-root/extraneous
   pair priced honestly; forward pointer to AL's fractional-equations
   lesson which banked the linear case).
4. *The location bridge* — the four-condition system for "both roots in
   (k₁, k₂)": D ≥ 0 (real doors), a·f(k₁) > 0, a·f(k₂) > 0 (the interval
   endpoints OUTSIDE the root pair), k₁ < −b/2a < k₂ (the axis between)
   — each condition justified from the sign diagram, then the worked
   drills (our own): both roots of x² − 4x + m exceed 1 ⇒ 3 < m ≤ 4
   (D ≥ 0 and f(1) > 0 and axis 2 > 1); x² + bx + 4 < 0 for all
   x ∈ (1, 2) ⇒ b < −5 (BOTH endpoints inside the roots — f(1) < 0 and
   f(2) < 0 suffices, no axis check needed, the honest asymmetry); exactly
   one root of x² − 5x + c in (0, 1) ⇒ 0 < c < 4 (f(0) > 0, f(1) < 0);
   roots of x² + (m−1)x + m−5 opposite in sign ⇒ m < 5 (f(0) < 0 — the
   one-condition wonder, justified from the case table).
5. *The interleaving gem* — a < b < c < d ⇒ μ(x−a)(x−c) + λ(x−b)(x−d) = 0
   has a real root for every real μ, λ (proved by the four-value sign
   bracket: F(a) = λ·(a−b)(a−d) is λ·positive, F(c) = λ·(c−b)(c−d) is
   λ·negative — opposite signs whenever λ ≠ 0 — and F(b) = μ·negative,
   F(d) = μ·positive — opposite whenever μ ≠ 0; the μ = 0 / λ = 0 /
   λ = −μ degenerate cases each named). Our numbers: a=1, b=2, c=4, d=7;
   F(1) = 6λ, F(2) = −2μ, F(4) = −6λ, F(7) = 18μ; sweep-verified.

**Illustrations:** the four-step solve on (x−2)(x−5) > 0 and −x²+2x+3 ≥ 0
(⇒ x ∈ [−1, 3]); the ∅ and all-ℝ verdicts; the radical domain example;
the four location drills; the interleaving proof with the numeric instance;
the "at least one positive x" case analysis as the closing stretch.

**Figures (2):**
- `signLadderSvg` — the sign diagram as drawn: the teal parabola
  x² − 7x + 10 with roots 2 and 5 fenced, the sign band BELOW the axis
  showing + − + with the open dots, and the two solution rays shaded.
- `locationChecklistSvg` — the four-condition system as the right-hand
  checklist box beside a drawn parabola with both roots inside (1, 4)
  (our example x² − 5x + 5·(6/5)... — pick x² − 5x + 6 = (x−2)(x−3), both
  in (1, 4): f(1) = 2 > 0, f(4) = 2 > 0, axis 2.5 inside, D = 1 > 0 — all
  four green checkmarks; plus the failing counter-case panel x² − 5x + 4
  with root 1 ON the wall).

**Quiz** — 5 items, keys pinned pre-writing (section E): the between-roots
sign; the strict/non-strict endpoint read; the D ≤ 0 special answers; the
location four-condition discipline (which check is skippable when);
the interleaving verdict.

**Exercises** — 14 items L1–L6: sign-diagram solves (all four families);
domain checks; extraneous-root hunts; location drills (both-inside, both-
left, opposite-sign, exactly-one, at-least-one-negative-value); the
parameter m sweeps; the interleaving L6 with the numeric instance.

**Formula cards** — the sign-diagram recipe; the four-condition location
system; the opposite-sign condition; the always-sign re-read as inequality
answers; the a < 0 flip law.

## 5. The question-type census (what examinations actually ask)

From the module's CAE 2.8/2.12/2.13 + Exercises 2.38–2.48 formats and the
JEE syllabus line:

1. **Max/min value questions** — "the least value of …" (completion or
   discriminant method).
2. **Always-sign questions** — "find k so that the expression is positive
   for all real x" (the conjunctive a > 0 AND D < 0 law).
3. **Parameter hunts** — least n / the range of m for always-sign,
   vertex-given reconstructions.
4. **Rational-expression ranges** — the D ≥ 0 method (incl. the
   degenerate-endpoint check).
5. **Solve-the-inequality** — strict/non-strict, all four case families,
   union answers in interval language.
6. **Location-of-roots systems** — both roots in/left/right of an
   interval, exactly one root inside, opposite signs, at-least-one
   negative value on a half-line; the four-condition system and its
   honest skippable-condition cases.
7. **Two-variable bounds** — real (x, y) satisfying a mixed quadratic
   forces both variables into intervals.
8. **Proof-shaped items** — the interleaving lemma and the two-family gap
   theorem as L5/L6 ladder ends.

## 6. The audit protocol (verify-first, ch. 1 precedent)

`scripts/verify-book4-ch02.ts` is written FIRST and grown green BEFORE any
prose. Pre-writing sections: (A) the vertex engine (the completion identity
expanded for a coefficient sweep; vertex/min/max/range pins on every
designed exhibit; brute-force integer sweeps agreeing); (B) the optimization
engine (the fence census, the sum-product pair, the two-family gap with the
√14 bound exact-checked and the natural witnesses verified, the least-n
family); (C) the discriminant-range engine (the x + 1/x bound with
attainment; the rational pair with exact-form roots, attainment checks and
a fine float sweep agreeing to 1e−9; the two-variable bounds attained);
(D) the inequality/location engine (sign-ladder sweeps on every pinned
quadratic; the four location drills with witness/exclusion witnesses; the
interleaving four-value signs computed and the μ,λ-grid sweep); (E) quiz
keys + every exercise answer for BOTH lessons pinned with the distractor
values computed. Post-authoring sections F (2.1) and G (2.2) import the
chapter file and audit: block census, figure-coordinate pins vs authored
SVGs, quiz keys vs pins, exercise counts, word count, id uniqueness,
prereq resolution, source keys, the hosted-fold sections present with
definition + worked example.

**Standing gates**: `bun run lint`, `tsc --noEmit`, the verifier green,
dev-server route 200, browser E2E (KaTeX, quiz keys live, solutions expand,
no console errors, 390px + 1280px, dark), VLM screenshot inspection light +
dark, layer-1 overlap audit. Docs sync once per run after the lessons gate.
Commit locally; push via the payload PAT's one-time URL.
