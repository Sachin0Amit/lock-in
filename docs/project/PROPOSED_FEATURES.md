# PROPOSED FEATURES — awaiting owner decision (nothing implemented)

**Directive (owner chat, 2026-11-11, verbatim):** "creat ai generated image for the books cover and add features or maths interactivity things dont add the features just give the list first then i will tell what to add and what to not."

**Status of this document:** this is the LIST. Nothing below is wired into the site. The AI cover **art assets** were generated this turn (the directive's first half — see "Cover art status" below); every feature that would *use* them (CV-01…CV-06) is a proposal only.

**How to decide:** reply with the IDs to add and the IDs to skip, e.g. *"add CV-01, CV-02, IN-06, IN-13, DR-01; skip the rest"* — or *"add all IN"* / *"add nothing yet"*. Approved items will be implemented in run order (they queue behind the standing authoring cadence unless the owner reorders); skipped items stay parked here.

---

## Cover art status (already DONE this turn — assets only, zero UI wiring)

- **28/28 covers generated** by `scripts/gen_covers.py` (z-ai image CLI, 864×1152 = exact 3:4 book-cover portrait, one art per book, motif keyed to the book's own subject, palette from the book's own `accent` pair — the shelf gradient family).
- **No-text contract, machine-verified:** every cover passed a vision-model sweep (`… check` phase) for text/letters/numbers — 28/28 clean (the art carries no titles; typography will be a CSS overlay so AI-rendered text can never be wrong). Three covers were regenerated until clean; two were regenerated for motif fidelity (linear-algebra, topology) and re-verified.
- **Locations:** full-quality PNGs for review in `download/covers/` (+ `contact-sheet.png` montage); repo-ready optimized WebP in `public/covers/` (28 files, 2.8 MB total). `download/` is git-ignored, so only the WebP set is committed.
- **The site is untouched** — `BookCover` still renders the CSS gradient covers. Wiring the art in is item **CV-01** below.

---

## A. CV — Cover & shelf visuals (uses the new AI art)

| ID | Feature |
|---|---|
| **CV-01** | **Wire the AI covers into the site** — `BookCover` renders the generated art with title/subtitle/level/discipline overlaid as clean CSS typography (the art is text-free by design); automatic fallback to the current gradient for any book without art. |
| **CV-02** | **Hero shelf visual with real art** — the home-page `ShelfVisual` shows miniature front-facing real covers (spines use the accent gradients), with a subtle hover tilt. |
| **CV-03** | **Cover lightbox** — click a cover on the book page to view the full artwork enlarged. |
| **CV-04** | **Social share images** — per-book 1200×630 `og:image` (cover art + typographic title) so shared links preview properly. |
| **CV-05** | **PDF/print export** — per-chapter print stylesheet with the cover as the title-page art. |
| **CV-06** | **Cover regeneration studio** — a small admin utility to re-roll any single cover (motif/palette knobs, regenerate-and-compare) without touching the rest. |

## B. IN — Interactive math tools, one flagship per book (a new `interactive` block type)

All client-side canvas/SVG; no external service. Each embeds in the lessons of its book at the natural teaching moment.

| ID | Book (prefix) | Interactive |
|---|---|---|
| **IN-01** | Foundation Mathematics (`fm-`) | **Fraction bars & number line** — drag 1/4 and 1/6 bars onto a common ruler; watch the common denominator light up; compare/order fractions visually. |
| **IN-02** | Arithmetic & Number Systems (`ans-`) | **Place-value / base converter** — group dots into bundles of 2/10/16; the same quantity re-written in binary/decimal/hexidecimal as you regroup. |
| **IN-03** | Elementary Algebra (`al-`) | **Balance-scale solver** — drag tiles onto both pans; the beam stays level only while the equation holds; "do the same to both sides" made physical. |
| **IN-04** | Advanced Algebra (`aa-`) | **Polynomial root explorer** — drag the coefficients of a quadratic/cubic; roots slide along the axis live with the Viète relations read out. |
| **IN-05** | Advanced Mathematical Foundations (`af-`) | **Proof-idea canvas** — domino induction animation and an implication-arrow chain you build step by step (if p→q, q→r …). |
| **IN-06** | Trigonometry (`tr-`) | **Unit-circle explorer** — drag the angle around the circle; sin/cos/tan segments update live and the point traces the sine wave beside it. |
| **IN-07** | Geometry (`geo-`) | **Construction canvas** — drag a triangle's vertices; centroid/circumcircle/orthocentre/Euler line track in real time; compass-and-straightedge steps replayable. |
| **IN-08** | Coordinate Geometry (`cg-`) | **Conics & transformations studio** — drag the focus/directrix to grow an ellipse/parabola/hyperbola with its equation live; slide/reflect/rotate the whole picture. |
| **IN-09** | Differential Calculus (`dc-`) | **Tangent-line explorer** — drag a point along a curve; slope value + tangent line follow; animate the secant→tangent limit. |
| **IN-10** | Integral Calculus (`ic-`) | **Riemann-sum stepper** — slide n from 4→200, switch left/right/midpoint; watch the bars close in on the true area. |
| **IN-11** | Multivariable Calculus (`mc-`) | **3-D surface viewer** — rotate z=f(x,y) surfaces with level curves projected beneath; gradient arrows toggleable. |
| **IN-12** | Differential Equations (`de-`) | **Phase-plane playground** — a vector field you click to seed initial conditions; trajectories trace themselves; equilibrium types color-coded. |
| **IN-13** | Linear Algebra (`la-`) | **Transformation studio** — drag î and ĵ; the whole grid shears/rotates with you; determinant, area scale and eigen-directions read out live. |
| **IN-14** | Abstract Algebra (`ab-`) | **Symmetry playground** — apply rotations/reflections of a motif as group elements; the orbit diagram and Cayley-style composition table build themselves. |
| **IN-15** | Number Theory (`nt-`) | **Modular clock & Euclid's GCD** — spin the modulus on a residue clock; run the Euclidean algorithm as an animated rectangle-squaring. |
| **IN-16** | Combinatorics (`co-`) | **Pascal's triangle explorer** — hover any cell for its binomial coefficient and the lattice paths that fill it; identity proofs light up row-wise. |
| **IN-17** | Probability Theory (`pr-`) | **Chance simulator** — dice/coins/Galton board; run up to a million trials and watch the empirical bars converge on the theoretical curve. |
| **IN-18** | Statistics (`stat-`) | **Data playground** — drag points on the scatter; mean/median/σ/box-plot/regression line all move together; leverage points glow. |
| **IN-19** | Discrete Mathematics (`dm-`) | **Graph sandbox** — add/drag nodes and edges, then animate BFS, Dijkstra, MST, colourings and Euler/Hamiltonian walks over your own graph. |
| **IN-20** | Mathematical Logic (`ml-`) | **Truth-table builder** — compose a proposition from gates/quantifiers; the truth table fills live; tautology/contradiction verdicts shown. |
| **IN-21** | Set Theory (`st-`) | **Venn playground** — drag set circles; live cardinalities for every region; set-algebra identities verified region-by-region. |
| **IN-22** | Topology (`top-`) | **Deformation studio** — rubber-sheet drag of shapes (tearing forbidden, the surface simply refuses); mug↔doughnut morph slider; genus counter. |
| **IN-23** | Real Analysis (`ra-`) | **ε–δ squeeze demo** — choose ε, hunt for δ; the band around L narrows on screen; the formal statement assembles itself from your moves. |
| **IN-24** | Complex Analysis (`ca-`) | **Complex-plane explorer** — drag z; watch z², 1/z, e^z orbits trace; domain-colouring toggle that paints the plane as a function's range. |
| **IN-25** | Numerical Analysis (`na-`) | **Iteration lab** — cobweb diagram + Newton's method; change x₀ and watch convergence order, basins and the occasional divergence. |
| **IN-26** | Optimization & OR (`or-`) | **Simplex stepper** — a small LP's tableau walks pivot-by-pivot with the feasible polytope and the objective's path highlighted; network-flow animation. |
| **IN-27** | Math Methods for Engineering (`em-`) | **Fourier mixer** — sum sines with amplitude/phase sliders; the composite wave and its spectrum bars update together; square-wave approximation included. |
| **IN-28** | Quantitative Aptitude (`qa-`) | **Exam-speed widgets** — clock-angle dial you drag; speed–time–distance animator (two runners, live meeting point); percentage-of-number slider. |

## C. DR — Derivation & proof interactivity

| ID | Feature |
|---|---|
| **DR-01** | **Step-through derivations** — every `derivation` block becomes reveal-on-click: "next step" buttons, each step's *why-this-step* note on hover, "reveal all" for revision. |
| **DR-02** | **Formula-sheet live derivations** — tap any formula card in a book's formula sheet to open its mini-derivation in place. |
| **DR-03** | **Try-first examples** — worked examples start with the statement and a "attempt it" box; solution steps unfold one at a time after you try. |

## D. PR — Practice & assessment interactivity

| ID | Feature |
|---|---|
| **PR-01** | **Typed-answer checking in lesson exercises** — type your final answer beneath each exercise; instant tolerance-aware check; auto-feeds the existing Mistake Bank (today the reader only self-marks). |
| **PR-02** | **Hint ladders** — a 3-level progressive hint per exercise question (nudge → setup → half-solution), with hint-usage tracked. |
| **PR-03** | **Drag-to-order solution drill** — scrambled Cengage solution-chain lines you re-order as a drag exercise; the reader grades the sequence. |
| **PR-04** | **Misconception tagging** — mistakes get a why-it-was-wrong tag (sign slip / formula recall / setup error / misread); the mistakes tab grows pattern analytics. |

## E. ST — Site & reader experience

| ID | Feature |
|---|---|
| **ST-01** | **LaTeX-aware search** — type `b^2-4ac` or "sin" in the command palette and formula cards + owning lessons surface directly. |
| **ST-02** | **Lesson annotations** — highlight text and attach private notes per lesson (persisted like bookmarks). |
| **ST-03** | **Streaks & XP layer** — daily streak, per-book XP, badges for chapter completions on top of the existing progress store. |
| **ST-04** | **Keyboard navigation** — j/k next/prev lesson, `/` to search, `b` to bookmark, plus scroll-position resume per lesson. |
| **ST-05** | **Offline PWA** — service-worker caching so written lessons read offline on the phone. |

---

## Already on the site (NOT re-proposed — for the owner's reference)

KaTeX typesetting · in-lesson MCQ quizzes with why-wrong explanations · Cengage-style stepped exercise solutions with self-marking into the Mistake Bank · flashcards · auto formula-sheet pages · glossary with mastery tracking · bookmarks + reading progress + resume pointer · SRS revision hub (ledger, knowledge graph, mastery, insights) · practice hub (drills with difficulty bands, exam presets/runner with honest countdown, mistakes tab, readiness) · custom-book builder (PDF upload, TOC matcher, my-books reader with notes) · command palette search · dark mode.

---

**Reaffirmed while this list is pending:** the standing authoring cadence is untouched — run 90 still opens Advanced Algebra 1.1 + 1.2. Approved features queue behind it (or the owner may promote any of them to a dedicated run).
