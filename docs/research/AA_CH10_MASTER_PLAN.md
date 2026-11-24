# AA CH10 MASTER PLAN — Advanced Algebra chapter 10 "The Synthesis and the Doorstep"

**Written:** run 122 (the maths lane, 2026-11-24), before the swarm spec pass.
**Scope of this run:** the WHOLE chapter — 10.1 + 10.2 + 10.3 + 10.4 + the 10.R unit review, FIVE parallel agents (one per lesson, one distinct deliverable each); the chapter closes COMPLETE and with it the BOOK. Never a second chapter in the same run (RUN_PROTOCOL STEP 4).

## Ground (step-2, 2026-11-24)

The pointer's GROUND clause governs: **the book.ts ch.10 summary + the AL/FM/ANS banked arcs it cross-references** — a synthesis chapter re-walks what the book built; no new downloads. The banked ground consulted this run:

- **book.ts ch.10 summary** (pinned at promotion, run 89): the competition craft across all the new families (the advanced sequel to AL 11.2); the book in one page (the honest map, the cross-references made good, the formula family gathered); the doorstep (the infinite tail's limit met again, the changing output measured discretely — slopes of aˣ and log taken the honest, finite way AL 10.2 priced for lines — continuity named as a promise, the handoff to Calculus with Coordinate Geometry (graphs reunited) and Trigonometry (the next family) named as the neighbouring doors).
- **AL 11.2** `al-competition-algebra-identities-and-substitutions` (the boundary lesson): the identity bank, certification by expansion, the geometric read, speed reads, the symmetric reads, the clever substitution, the two-squares identity. **10.1 is its ADVANCED sequel** — the same five moves re-welded onto the NEW families (quadratics at depth ch.2, symmetric reads via roots ch.2/8, AM–GM under constraints ch.4, difference-priced series ch.5, binomial term hunts ch.7, log speed reads ch.9). No re-teaching of AL 11.2's bank.
- **AL 10.2** `al-slope-the-steepness-theorem`: slope = rise over run, the steepness theorem, slope as a rate — priced for LINES (constant rate). **10.4 extends honestly**: curves have no constant rate; the secant slope Δf/Δx varies with h; the derivative is the LIMIT of secant slopes — named, priced numerically, proved nowhere (the calculus door).
- **The AA book's own 62 banked lessons** (ch.1–9, inventory verified from the live registry this run: 9+5+6+7+7+7+7+7+7 = 62; PROGRESS's "57" and the pointer's "60" are stale arithmetic — the honest close is 62 + 5 = **67 written lessons**). The chapter slugs + unit-review lesson ids feed 10.3's synthesis table and 10.R's routing.
- **JEE Main 2026 unit list** (`jee-main-2026-syllabus`): competition algebra and functions are Main units; functional equations live in the competition arc (Hall & Knight's higher-exercises tradition, key `hall-knight-higher-algebra`).
- STUDY-NEVER-REPRODUCE absolute: every witness, figure, Illustration, quiz item and exercise is OUR OWN, engine-pinned in scripts/verify-book4-ch10.ts.

## Fold obligations (TOC_FOLD_LEDGER.json, pre-flight this run)

**Ch.10 hosts ZERO folds.** The ledger's 430 entries were filtered by the four ch.10 lesson titles this run: the ten "doorstep"-titled hits belong to OTHER books (real-analysis, optimization-and-operations-research); all 80 advanced-algebra folds are hosted by ch.1–9 lessons and were discharged in their own runs (the ch.9 folds on run 120/121, per WORKLOG). Nothing to discharge.

## The registry truth (honest census, replaces stale arithmetic)

live registry count this run: ch.1 9 lessons · ch.2 5 · ch.3 6 · ch.4 7 · ch.5 7 · ch.6 7 · ch.7 7 · ch.8 7 · ch.9 7 = **62 written**; +5 this run = **67 at the book's close**; platform total 195 → 200. lib:pack at ship reports the honest final numbers.

## Lesson arcs (witnesses pre-verified by `temporary-references/pin_check_122.py` before the specs are written)

### 10.1 "Competition Algebra: the Advanced Craft" (`aa-competition-algebra-the-advanced-craft`)

Prerequisites: `al-competition-algebra-identities-and-substitutions`, `aa-symmetric-reads-and-common-roots`, `aa-the-arithmetic-geometric-mean-inequality`, `aa-special-series-and-the-method-of-differences`, `aa-binomial-coefficients-at-work`, `aa-the-laws-of-logarithms-and-the-change-of-base`. Sources: `cengage-jee-style`, `jee-main-2026-syllabus`, `hall-knight-higher-algebra`, `cengage-m1-01`.

1. **Opening:** AL 11.2 banked the five competition moves on the identity bank; chapters 2–9 built five new machine families — the sequel's question: what do the SAME moves do on the NEW machines?
2. **The substitution game at depth:** nested-quadratic substitutions beyond AL 11.2's — `(x²−5x+5)² − 7(x²−5x+5) + 12 = 0` → t ∈ {3, 4} → roots `(5±√17)/2, (5±√21)/2` (four real roots, Vieta cross-check: root-sum 10, root-product 2); the x+1/x ladder at depth: x + 1/x = 3 → 7, 18, 47, 123 (the recurrence s_{k+1} = 3s_k − s_{k−1}, engine-swept to k = 8: 322, 843, 2207, 5778, 15127).
3. **Symmetric reads via the roots:** α, β roots of x²−7x+11 = 0 → α+β = 7, αβ = 11 → α³+β³ = 112, α⁴+β⁴ = 487, (α−β)² = 5, 1/α+1/β = 7/11; the cubic read α³+β³+γ³−3αβγ (ch.8.3's staple).
4. **AM–GM maxima under constraints (ch.4 cashed):** min x + 4/x = 4 at x = 2; min 9x + 4/x = 12 at x = 2/3; max x(6−x) = 9 at x = 3 (the product-under-fixed-sum law); max xyz = 64 under x+y+z = 12 (the three-term extension); the two-term boundary discipline (why the constraint must be an equality for the bound to bind).
5. **Series sums priced by difference and telescoping (ch.5 cashed):** Σ 1/(k(k+2)) = (1/2)(3/2 − 1/(n+1) − 1/(n+2)) → 3/4 (S₅ = 0.595238 engine-checked); Σ k·k! = (n+1)! − 1 (S₅ = 719 = 6! − 1); Σ k/2^k = 2 (S₁₀ = 1.98828125, the infinite tail from 5.2 priced by the AGP shift).
6. **Binomial term hunts (ch.7 cashed):** (1+x)^12 — coefficient of x⁵ is C(12,5) = 792; the greatest coefficient C(12,6) = 924; ΣC(12,k) = 4096 = 2^12, alternating sum 0; the independent term of (2x − 1/x)^10 is −8064 (k = 5, C(10,5)·2^5·(−1)^5).
7. **Log speed reads (ch.9 cashed):** the ordering chain log_2 3 = 1.5850 > log_3 4 = 1.2619 > log_4 5 = 1.1610 > log_5 6 = 1.1133 > log_6 7 = 1.0856 (log_{n+1} n strictly decreasing, monotonicity-proved); digits of 8^25 = 23 (25·0.90309 = 22.577 → floor+1); 2^300 vs 3^200 settled by 300·ln2 = 207.9442 < 200·ln3 = 219.7225.
8. **The mixed craft (the exam corner):** one Illustration chains three families (a max under a constraint priced by AM–GM, certified by a Vieta symmetric read, and counted by a binomial coefficient); the L6 exercise set carries JEE-style chains.
9. Quiz 5 (keys pinned `[2,0,1,3,1]`); exercises ≥15 L1–L6 (Single Correct / Multiple Correct / Numerical Value typology named), ≥3 solution figures.

### 10.2 "Functional Equations: Building Functions from Rules" (`aa-functional-equations-building-functions-from-rules`)

Prerequisites: `aa-composition-machines-in-series`, `aa-inverse-functions-the-machine-undone`, `aa-mathematical-induction-the-domino-principle`, `aa-logarithms-the-inverse-machine`. Sources: `cengage-jee-style`, `jee-main-2026-syllabus`, `hall-knight-higher-algebra`.

1. **Opening:** the whole book built functions by FORMULA; the competition arc builds them by RULE — a functional equation prescribes how values combine, and the craft finds every machine that obeys.
2. **The value ladder (the master craft):** f(x+y) = f(x)+f(y), f(1) = 3 → f(0) = 0, f(n) = 3n (ch.7's domino principle cashed on function values!), f(2026) = 6078; on rationals f(p/q) = 3p/q — the ladder reaches every rational WITHOUT continuity; the honest scope note: without a regularity assumption (monotonicity/boundedness/continuity), wild solutions exist on the full real line — named, never proved (the doorstep promise).
3. **Monotone + additive → linear (the squeeze cashed on functions):** f additive and increasing, f(1) = 2 → f(x) = 2x for ALL real x; the irrational rung by nesting rationals — the exact squeeze discipline of 9.1, re-welded: 1.41 < √2 < 1.42 → 2.82 < f(√2) < 2.84, tighter brackets → f(√2) = 2√2 = 2.8284271.
4. **The shifted ladder (the constant-cleanup move):** f(x+y) = f(x)+f(y)+1, f(1) = 3 → g = f+1 additive with g(1) = 4 → f(x) = 4x−1 on ℚ (engine-checked both directions); the class rule: absorb the constant, re-ladder, translate back.
5. **The product family:** f(x+y) = f(x)f(y), f(0) ≠ 0 → f(0) = 1, f(n) = f(1)^n — f(1) = 3 → f(4) = 81; f(x) = a^x is THE solution family (ch.9's machine verified as a rule-obeyer); the multiplicative-over-products family f(xy) = f(x)f(y) with f(x) = x^n (witness (2·3)^4 = 16·81 = 1296); the logarithm rule f(xy) = f(x)+f(y) — ch.9.3's product law read BACKWARD as a rule (log_2 6 = log_2 2 + log_2 3).
6. **The quadratic-regeneration rule:** f(x+y) = f(x)+f(y)+xy, f(1) = 1 → f(x) = x(x+1)/2 on ℚ (the polynomial solution verified both directions in the engine); f(6) = 21, f(100) = 5050 — the Gauss sum regenerating as function values (the ch.6-adjacent tie).
7. **Iterations and involutions (ch.1's machinery cashed):** f(f(x)) = x — the involutions f(x) = c−x, f(x) = 1/x; the ORDER-4 machine f(x) = (x−1)/(x+1): f²(x) = −1/x, f³(x) = (1+x)/(1−x), f⁴(x) = x (engine-swept on five witnesses); f^2026(x) = −1/x (2026 ≡ 2 mod 4); the cycle census and the cobweb figure.
8. **The census table:** which banked machines obey which rules (x² additive? NO — (1+2)² = 9 ≠ 5; 2^x additive? NO; a^x multiplicative-over-sums? YES; log_a multiplicative-over-products-additive? YES; x^n multiplicative-over-products? YES) — a table with engine-verified NO-witnesses (cautions for the "everything is linear" trap).
9. Quiz 5 (keys pinned `[1,2,0,1,2]`); exercises ≥15 L1–L6, ≥3 solution figures (ladder walks, iteration cycles).

### 10.3 "The Book in One Page: Synthesis" (`aa-the-book-in-one-page-synthesis`)

Prerequisites: `aa-exponentials-and-logarithms-unit-9-review`, `aa-unit-review-functions-as-objects`, `al-the-function-idea-the-doorstep`. Sources: `cengage-jee-style`, `jee-main-2026-syllabus`, `hall-knight-higher-algebra`.

1. **Opening:** nine chapters were walked one machine at a time; this page holds the whole book in one hand — the honest map of what was BUILT, what was only OPENED, and where each door leads.
2. **The book in one table:** ten rows (chapters 1–10), each with the object built and one engine-recomputed witness: ch.1 the composition witness (g(f(3)) = 49 vs f(g(3)) = 19 on 2x+1 and x²); ch.2 the vertex maximum of −2x²+12x−7 = 11 at x = 3; ch.3 (1+i)^8 = 16; ch.4 min 9x+4/x = 12; ch.5 Σk/2^k = 2; ch.6 C(10,3) = 120 (arrangements 720); ch.7 ΣC(12,k) = 4096 with Σk = 5050 pinned by induction; ch.8 α³+β³ = 112 on x²−7x+11; ch.9 the telescoping log chain = 2 and e = 2.7182818 (2^100 = 31 digits); ch.10 the book itself.
3. **The wiring:** the dependency chain named chapter by chapter (the function grammar → the quadratic as a working object → the complex rung → the inequality engine → the series → the exact counts → the proof engine and the binomial → the polynomial's deep algebra → the inverse family → the synthesis); the no-duplication contract honored (FM/ANS/AL cross-references cited, never re-taught).
4. **The formula family gathered:** one display shelf per chapter family (the composition/inverse pair; the vertex form; the modulus-argument pair; AM–GM/Cauchy/triangle; the AP/GP sums and the infinite tail; the C(n,k) identities; the induction schema; Vieta's pair; the definition pair and the law family) — formula cards, engine-re-verified.
5. **What was only opened (the honesty ledger):** the deferred convergence proofs (9.1's nested brackets, e's definition, the fast-series remainder — all used, none proved); the completeness assumption; the instantaneous-rate wall (10.4); the continuity machinery — each stated as a PROMISE with its owning door named.
6. **The cross-references made good:** the forward doors named (Coordinate Geometry — graphs reunited with the parabola; Trigonometry — the next family of machines with ch.1's period census waiting; Calculus — the rates; Probability — the counts cashed as measure); the backward anchors re-listed (FM's number sense, ANS's proofs, AL's first course).
7. **The audit bench:** chains that cross chapters in one calculation (the max-with-Vieta-certified chain; the binomial-coefficient digit count — C(50,25) = 126410606437752, 15 digits via the log law; the induction-certified Gauss chain at n = 100).
8. Quiz 5 (keys pinned `[0,2,1,0,3]`); exercises ≥15 L1–L6 (the mixed bench — one question per chapter family minimum), ≥3 solution figures.

### 10.4 "The Doorstep: Limits and the Changing Output" (`aa-the-doorstep-limits-and-the-changing-output`)

Prerequisites: `aa-geometric-progressions-and-the-infinite-tail`, `aa-exponential-and-logarithmic-series`, `aa-function-zoo-modulus-signum-gif-elementary-catalog`, `al-slope-the-steepness-theorem`. Sources: `cengage-jee-style`, `jee-main-2026-syllabus`, `openstax-college-algebra`, `hall-knight-higher-algebra`.

1. **Opening:** the book's last new idea is the one it kept deferring: the limit. 5.2 summed the infinite tail; 9.1 squeezed the irrational rung; 9.5 priced e — every time the SAME move (partial → band → the promise that the band closes). This lesson names the move and cashes it on the changing output.
2. **The infinite tail met again:** Sₙ = 9(1−0.9ⁿ) climbs 5.8618942 (n = 10) → 8.6184857 (n = 30) → 8.9536265 (n = 50) — the partials caged ABOVE 8.9 forever and within ε of 9 eventually; the honest definition-shaped promise (for every band there is an N), stated, not proved.
3. **The changing output, measured discretely (AL 10.2 extended honestly):** the secant slope (f(x+h)−f(x))/h on the new families:
   - f(x) = x² at x = 3: h = 1 → 7; h = 0.1 → 6.1; h = 0.01 → 6.01 — the algebra WINS inside the quotient (2x + h) and the push h → 0 gives 2x: the ONE family where the wall falls to algebra;
   - f(x) = 1/x at x = 2: h = 0.1 → −0.2380952 → −1/x² = −0.25 (algebra wins again after the common-denominator move);
   - f(x) = 2^x at x = 1: h = 0.1 → 1.4354693; h = 0.01 → 1.3875458; h = 0.001 → 1.3833971 — the wall: (a^h−1)/h has NO algebraic exit; the limit is named a^x·ln a; the numeric ladder closes on 2·ln2 = 1.3862944 (9.5's series PRICES the target: ln 2 = 0.6931472);
   - the (a^h−1)/h table at x = 0 for a = 2 (h = 0.1 → 0.7177346; 0.01 → 0.6955550; 0.001 → 0.6934506; 0.0001 → 0.6931712 → 0.6931472) and a = e (h = 0.1 → 1.0517092; 0.01 → 1.0050167 → 1) — WHY e is the natural base: it is the base whose secant slope at 0 is exactly 1;
   - f(x) = log_2 x at x = 1: h = 0.1 → 1.3750352; h = 0.01 → 1.4343049 → 1/ln 2 = 1.4426950 (the log's slope = the exponential's upside down).
4. **Slope for lines vs slope for curves (the AL 10.2 seam):** a line's rate is ONE number (the steepness theorem); a curve's rate is a NEW function — named the derivative, priced numerically here, PROVED nowhere (the calculus door's own lock).
5. **Continuity named as a promise:** the informal read (small input change → small output change) + the jump witnesses the reader already owns (signum's jump of 2 at 0, GIF's jump of 1 at each integer — ch.1's function zoo); the honest ε–δ machinery named as calculus's; the ladder witnesses (|f(3.01)−f(3)| = 0.0601 inside the band 0.07 for x² at x = 3, h = 0.01).
6. **The handoff (the neighbouring doors):** Calculus (the rate machine + the limit machinery), Coordinate Geometry (the parabola of ch.2 reunited with the coordinate plane — graphs become geometry), Trigonometry (the next family of machines — the periodic ones ch.1's period census was waiting for), Probability (ch.6's counts cashed as measure); the book's description named verbatim in spirit.
7. Quiz 5 (keys pinned `[2,1,0,2,1]`); exercises ≥15 L1–L6, ≥3 solution figures (secant ladders, the h-shrink tables as figures, jump charts).

### 10.R "Unit 10 Completion Review" (`aa-the-synthesis-and-the-doorstep-unit-10-review`)

Prerequisites: the four ch.10 lessons. Sources: `cengage-jee-style`, `jee-main-2026-syllabus`, `hall-knight-higher-algebra`.

The 9.R pattern exactly: (a) the chapter in one table — four rows with each lesson's object + engine-recomputed witness; (b) the formula family gathered (the craft moves of 10.1, the rule families of 10.2, the book's one-page shelf, the secant-slope ladder); (c) the essentials re-derived in one move each (the substitution game, the value ladder, the honesty ledger, the secant push) with owner lessons cited; (d) the audit bench — cross-lesson chains in single calculations: the additive-ladder→exponential-rule chain (f(x+y) = f(x)f(y), f(1) = 2 → f(100) = 2^100, 31 digits by the 9.6 law — TWO chapters in one number); the order-4 iteration chain (f^2026(x) = −1/x); the Gauss chain (f(100) = 5050); the max + symmetric-read chain; the binomial + digit-law chain (C(50,25) has 15 digits); (e) the mixed bench — 17 fresh questions L1–L6, every one a new witness, full steps; (f) the closing coda — the book's handoff read once more (Calculus, Coordinate Geometry, Trigonometry, Probability named), the honest boundaries restated (what the book proved vs opened), the 67-lesson census named. Quiz keys `[1,0,2,1,2]`; ≥3 solution figures.

## Verify-first (step 3)

`temporary-references/pin_check_122.py` runs BEFORE the specs are written (the orchestrator's pre-flight pins — every witness above brute-forced in Python). Then `scripts/verify-book4-ch10.ts` opens FRESH (copy the ch-09 harness shape exactly): engines **A (10.1)** + **C (10.2)** + **E (10.3)** + **G (10.4)** + **I (10.R)** grown green BEFORE prose (the agents' v-files, assembled verbatim); pins **B/D/F/H/J** re-read the shipped chapter; **Z** the closed-CHAPTER + closed-BOOK census (five lessons; numbers 10.1,10.2,10.3,10.4,10.R; plannedLessons []; quiz keys pinned; book.ts registration + TEN-chapters status; the book's own status 'complete'; the registry count 67 written; the maths-shelf's four books all complete; the honesty ledger named in 10.3; the doors named in 10.4).

## Ship plan

Assemble `ch-10.ts` from the five parts verbatim (import shims stripped); book.ts: import + chapters array + STATUS comment (TEN chapters COMPLETE — THE BOOK COMPLETE) + book status 'complete'; gates: verifier, tsc, lint, lib:pack + lib:check, standing gates (topic-coverage, toc-as-lessons, math-shelf-planning), E2E ×5 lessons ×3 viewports (1280 + 390 + dark), VLM figure audit light + dark; ledgers: WORKLOG, PROGRESS, RESUME_POINTER (→ the next fire opens **geometry**, the registry's book 5, WHOLE), SOURCE_LOG (no new keys — the ground is banked; the honest note recorded), WORK_INVENTORY regen, DETAILED_LOG row, this master plan's run-122 extension re-appended; new e2e pairs (5) whitelisted in .gitignore; commit; push ALL unpushed commits; ls-remote verify; WORKLOG sha.
