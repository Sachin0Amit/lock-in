# AA CH09 MASTER PLAN — Advanced Algebra chapter 9 "Exponentials and Logarithms"

**Written:** run 120 (the maths lane, 2026-11-24), before the swarm spec pass.
**Scope of this run:** lessons 9.1 + 9.2 only (two-agent swarm per RUN_PROTOCOL v9.0); 9.3–9.6 + the 9.R review ride the next fires. The chapter STAYS in-progress at close.

## Ground (step-2 research, 2026-11-24)

- **The Cengage M1 Trigonometry module, ch. 1 "Logarithm and Its Properties"** (Drive file id `1hPWvsTTo3qv3jC9ir2Kx8qU_RnJ79F7V`, 27 MB scanned, 44 PDF pages, printed pages 1.1–1.26; the exp/log band printed 1.1–1.10 = PDF 3–12 vision-transcribed this run in three bands → `temporary-references/m1-01-A/B/C.txt`, the citation record). Citation key (new, SOURCE_LOG at ship): `cengage-m1-01`. The band carries: the exponential function definition and restrictions, graphs for different bases (all through (0,1)), the log function as inverse, the mirror graphs, f(f⁻¹(x)) = a^(log_a x), the natural/common log note, ordering/sign/bounds/irrationality illustrations, and the Concept Application Exercises 1.1/1.2 archetypes.
- **Hall & Knight Higher Algebra** ch. X "Logarithms" (the classic stretch, banked run 66 in DRIVE_TOC_SURVEY.md — key `hall-knight-higher-algebra`): the depth stretch mapped to ch. 9's end (9.5 series, 9.6 tables).
- **OpenStax College Algebra 2e** §6 sequencing cross-check (key `openstax-college-algebra`); **Thomas' Calculus 14e** §7.2 Natural Logarithms — the TOC survey source of the "Natural Logarithms" fold hosted by 9.2 (banked survey; the fold's treatment is OUR OWN).
- **JEE Main 2026 unit list** (key `jee-main-2026-syllabus`): exp/log functions and equations are Main units.
- STIDY-NEVER-REPRODUCE absolute: method shapes and topic census only; every witness, figure, Illustration, quiz item and exercise below is OUR OWN, engine-pinned.

## Fold obligations (TOC_FOLD_LEDGER.json, pre-flight)

- **9.1 "The Exponential Family: Every Real Index" hosts NO folds.**
- **9.2 "Logarithms: the Inverse Machine" hosts ONE fold (source `root-thomas-calculus-14e`, topic "Natural Logarithms", mode `section`):** a named subsection "Natural Logarithms" inside 9.2 with a formal definition + at least one worked example treating it. (9.3 hosts the "Logarithm and Its Properties" section fold + the "Reciprocal of Logarithm" example-family; 9.6 hosts the antilog family — NOT this run.)

## Lesson arcs (pinned witnesses — all pre-verified by `temporary-references/pin_check_120.py`, 81/81 green)

### 9.1 "The Exponential Family: Every Real Index" (`aa-the-exponential-family-every-real-index`)

Prerequisites: `al-powers-and-the-laws-of-exponents`, `al-zero-and-negative-exponents-another-repair`, `ans-how-irrationals-behave`.

1. **Opening:** AL 2.1/2.2 banked the laws on integer and zero/negative indices; ANS proved √2 irrational — so `2^√2` is a question the banked laws cannot even STATE. The last rung of the index ladder.
2. **Every real index, honestly:** rational indices via roots (ANS cross-ref); irrational indices by squeezing — `1.41 < √2 < 1.42 ⇒ 2.657372 < 2^√2 < 2.675855`; tighter `1.4142 < √2 < 1.4143 ⇒ 2.665119 < 2^√2 < 2.665195`; value `2.6651441427` (4dp `2.6651`); the completeness promise is the calculus doorstep (ch. 10) — stated, not proved; the laws verified on witnesses (`2^√2 · 2^(2−√2) = 4`).
3. **The definition:** f(x) = a^x, a > 0, a ≠ 1; why each restriction (a = 1 constant/not one-one — blocks 9.2's inverse; a = 0 dead; a < 0 leaves the reals at x = 1/2); domain ℝ, range (0, ∞), through (0, 1).
4. **The shape family:** 2^x witness table ((−3, 0.125) … (10, 1024)); a > 1 increasing / 0 < a < 1 decreasing; horizontal asymptote y = 0; steeper base = steeper rise/fall; the family portrait figure (8^x, 5^x, 3^x, 0.4^x, 0.2^x).
5. **Growth stories priced:** the race `2^x` vs `x^3` (crossings 1.3733548772 and 9.9395351414; above at x = 0, 1; below at 2–9; above from 10 — `1024 > 1000`); compound growth ₹1000 at 10% (A(10) = 2593.74; doubling ln2/ln1.1 = 7.2725408973; the rule of 72 = 7.2, the honest engineering note); the paper fold (0.1 mm sheet, 50 folds → 2^50 = 1125899906842624 × 0.1 mm = 1.1259 × 10^11 m ≈ 0.7526 AU; 42 folds reach the Moon — 2^41 = 2.199 × 10^12 < 3.844 × 10^12 < 4.398 × 10^12 = 2^42).
6. **Illustrations (7):** family/shape classification; `8^(x+1) = 4^(2−x)` → x = 1/5 (both sides 2^3.6 = 12.1257); `3^(x+1) + 3^(x−1) = 270` → x = 4; `(1/2)^(x²−2x) < 1/8` → x < 1−√5 or x > 1+√5; `|x−2|^(2x²−9x+9) = 1` → {1, 3/2, 3}; the ₹1000-at-10% walk; counting `3x−5 = 2^(−x)` (one solution ≈ 1.7638, graphical).
7. **Quiz 5** (keys pinned in the spec); **exercises L1–L6** (16–18 questions) with **≥ 3 solution figures** (v9.0 amendment 2).

### 9.2 "Logarithms: the Inverse Machine" (`aa-logarithms-the-inverse-machine`)

Prerequisites: `aa-the-exponential-family-every-real-index`, `aa-inverse-functions-the-machine-undone`, `ans-fundamental-theorem-of-arithmetic`.

1. **Opening:** ch. 1 built the machine-undo theory; the exponential is strictly monotone → one-one → invertible; this lesson cashes the theory's first big cheque.
2. **The definition:** `log_a y = x ⟺ a^x = y` (a > 0, a ≠ 1, y > 0); read-offs `log_10 1000 = 3`, `log_2 64 = 6`, `log_3 (1/9) = −2`, `log_4 8 = 3/2`, `log_(2√2) 128 = 14/3`; the domain discipline (log of a negative number or zero does not exist — the range law of 9.1 mirrored); `log_a 1 = 0`, `log_a a = 1`; domain (0, ∞) ↔ range ℝ (the swap).
3. **The two inverse identities DERIVED** (not memorized): `log_a(a^x) = x` for all real x; `a^(log_a x) = x` for x > 0; witnesses `3^(log_3 8) = 8`, `7^(2 log_7 3) = 9`, `10^(−3 log 2) = 1/8`, `2^(4 log_2 5) = 625`, nested `log_2 log_2 log_2 log_2 65536 = 1` (65536 → 16 → 4 → 2 → 1).
4. **The mirror law:** (p, q) on `a^x` ⟺ (q, p) on `log_a x`; the mirror figure (y = 2^x + y = log_2 x across y = x, (0,1) ↔ (1,0), asymptotes swapped); behaviour by base; the base family figure (log_2, log_4, log_0.5, log_0.25 all through (1, 0)); the base-symmetry law `log_(1/a) x = −log_a x` DERIVED from `(1/a)^t = a^(−t)`.
5. **Reads:** ordering (`log_2 5 = 2.321928 > log_3 5 = 1.464974 > log_7 5 = 0.827087 > log_0.5 5 = −2.321928`); the sign law both families (log_2 7 > 0; log_0.2 3 < 0; log_(1/3)(1/5) > 0; log_4 (1/3) < 0); bounds `2/5 < log_10 3 < 1/2` (via 3^5 = 243 > 100, 3^2 = 9 < 10; actual 0.477121); irrationality `log_2 7 ∉ ℚ` (2^p = 7^q vs unique factorisation); counting solutions (`log_2(x+3) = 8−x` → the unique root x = 5, both sides 3, by strict monotonicity).
6. **THE FOLD — the named subsection "Natural Logarithms":** the number e (ladder `(1+1/1)^1 = 2`, `(1.1)^10 = 2.593742`, `(1.01)^100 = 2.704814`, `(1.001)^1000 = 2.716924`, `(1+10^-6)^(10^6) = 2.718280`, e = 2.718281828…; band 2.7 < e < 2.8); the formal definition `ln x = log_e x` for x > 0; worked example: `ln(e^3) = 3`, `e^(ln 7) = 7`, solve `e^t = 10` → t = ln 10 ≈ 2.3026 (2.302585), `ln 2 ≈ 0.6931`, `ln 7 ≈ 1.9459`; why "natural" = the doorstep teaser (ch. 10).
7. **Quiz 5; exercises L1–L6** (16–18 questions) with **≥ 3 solution figures** (crossing counts, squeeze bands, mirror witnesses).

## Verify-first (step 3)

`scripts/verify-book4-ch09.ts` opens fresh this run: engines **A (9.1)** + **C (9.2)** grown green BEFORE prose (the agents' `v-aa91.ts` / `v-aa92.ts`, assembled in); pins **B (9.1)** + **D (9.2)** re-read the shipped chapter; **Z** the open-chapter census (2 of 6 lessons, chapter status in-progress, plannedLessons 4 remain). Copy the ch-08 harness shape exactly.

## Ship plan

Assemble `ch-09.ts` from the two parts verbatim; register `chapter09` in `book.ts` (import + chapters array + the STATUS comment: chapters 1–8 complete, ch. 9 IN-PROGRESS 2 of 6); gates: verifier, tsc, lint, lib:pack + lib:check, standing gates (topic-coverage, toc-as-lessons, math-shelf-planning), E2E ×2 lessons ×3 viewports, VLM figure audit light + dark; ledgers: WORKLOG, PROGRESS, RESUME_POINTER (→ run 121: 9.3 + 9.4), SOURCE_LOG (`cengage-m1-01`), WORK_INVENTORY regen, DETAILED_LOG; commit; push ALL unpushed commits (the two audit-era commits ride).
