# SPEC aa104 — run 122 swarm — AA lesson 10.4 "The Doorstep: Limits and the Changing Output"

You are agent **aa104** (Task ID 2-d) of the run-122 WHOLE-CHAPTER SWARM for Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep". You own ONE distinct deliverable: lesson 10.4 — the book's CLOSING lesson, the handoff to calculus. This spec is your entire world. Write ONLY the two files named in §1.

## 0. The discipline (non-negotiable)

VERIFY-FIRST: every number your prose will print is recomputed by brute force in your engine script FIRST, green before the prose is done. Where this spec and your engine disagree, **THE ENGINE WINS**. All content OUR OWN (study-never-reproduce). THE HONESTY LAW IS ABSOLUTE HERE: this lesson NAMES the limit, PRICES it numerically, and PROVES nothing — every claim that belongs to calculus's machinery is stated as a promise with the door named. Never sneak a proof in; never state a derivative as a derived fact — it is a named target that the numerics approach.

## 1. Output contract (exactly two files)

- `/home/z/my-project/temporary-references/part-aa104.ts` — figure helpers (prefix `dr104`) + `export const lesson104: Lesson = { ... }`.
- `/home/z/my-project/temporary-references/v-aa104.ts` — the verify-first engine+pin script, run with `cd /home/z/my-project && bun run temporary-references/v-aa104.ts`.

Never write any other file. No git commands.

## 2. TS data contract

Part file head: `import type { Lesson } from '../src/data/library/types'`.
Lesson fields: `id`, `number` ('10.4'), `title`, `concepts` (5–8), `objectives` (4–6), `prerequisites`, `sources`, `blocks`. Do NOT set `words`.

Block kinds — para/heading/callout(tones insight|warn|definition|theorem|historical|exam)/terms/equation/derivation/example/figure/table/list/quiz/exercises/formula. Shapes:
- derivation: `title` PLAIN, `statement`, `steps: [{ label (PLAIN), formula? (KaTeX no $), explanation }]`, `result` (RichText — math `$...$` clause-wise, prose bare).
- example: `title` crisp problem statement, `steps: string[]` Cengage chain, optional `figures`.
- quiz: `items: [{ q, options (4), answer, explain }]`. exercises: `sets: [{ level, questions: [{ q, solution: string[], answer?, figures? }] }]`.
- equation: KaTeX without $, `\tag{n}` allowed. table: head PLAIN, cells may carry $math$. formula: `name` PLAIN.

KaTeX doubled backslashes. FORBIDDEN: raw `\\(`, `\\[`, `$$`, `\dfrac`, `\qquad` inside inline `$...$` (mobile law — short inline maths; the h-shrink tables belong in `table` blocks, not one giant inline span). Titles/labels/heads/captions/SVG text PLAIN.

## 3. House voice (Cengage contract)

Definitions formal + symbolic restatement; "For example," + roman-list runs; properties one per bullet with verified instances; Illustrations crisp-problem + Cengage chain (connective-led one-move lines, "Hence …" close, no step numbers); short single-idea Notes/Cautions; `exam` callout honest ("exam-style"). A `historical` callout on Newton/Leibniz and the doorway the limit opened is welcome (facts only: Newton and Leibniz, the 17th century, the independent-invention dispute — no precise dates you cannot verify; keep it qualitative).

## 4. Figure law

≥3 body figures + ≥3 solution figures (0–2 per question, only where they aid). SVG computed from named constants; viewBox ≥8px margins; role="img" + aria-label; strokes ≥1.2px; labels match prose. VIVID palette (never blue/indigo): structure `#16a34a`; primary text `#166534`; mid text `#65a30d`; teal `#0d9488`; connectors `#d97706`; accent `#ea580c`; teal ink `#0f766e`; warning `#dc2626`; panels `#fef3c7`/`#ffedd5`; separators `#fcd34d`; faint `#5eead4`; white-on-fill `#ffffff`. SVG text PLAIN (no `$`, no backslash commands; `x²`, `h → 0`, `Δf/Δx`, `·`, U+2212 minus fine). Dark-safe.

## 5. Lesson outline — 10.4 "The Doorstep: Limits and the Changing Output" (`aa-the-doorstep-limits-and-the-changing-output`)

`prerequisites: ['aa-geometric-progressions-and-the-infinite-tail', 'aa-exponential-and-logarithmic-series', 'aa-function-zoo-modulus-signum-gif-elementary-catalog', 'al-slope-the-steepness-theorem']`
`sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'openstax-college-algebra', 'hall-knight-higher-algebra']`

The book's last new idea is the one it kept deferring: THE LIMIT. 5.2 summed the infinite tail; 9.1 squeezed the irrational rung; 9.5 priced e — the SAME move every time (partials → band → the promise that the band closes). This lesson names the move, cashes it on the CHANGING OUTPUT (rates), and hands the book to its neighbours. All values below are engine-pinned canonical (pin_check_122.py 117/117):

**Arc:**
1. **Opening motivation:** three deferred promises run through the book (the tail's sum, the irrational rung, e's value); each was priced honestly by banding. The doorstep is where the deferral ends — the machine that closes bands is named.
2. **The infinite tail met again** (heading): Sₙ = 9(1 − 0.9ⁿ) for Σ0.9^k — S₁₀ = 5.8618942, S₃₀ = 8.6184796, S₅₀ = 8.9536160; the partials climb, the tail 9 − Sₙ = 9·0.9ⁿ shrinks by the factor 0.9 each step; the DEFINITION-SHAPED promise (callout, `definition` tone): "S converges to 9" means FOR EVERY TOLERANCE ε THERE IS AN N with |Sₙ − 9| < ε past N — priced: ε = 0.1 needs 9·0.9ⁿ < 0.1 → n ≥ 22 (engine-check 0.9²¹ = 0.1094… > 0.1, 0.9²² = 0.0985 < 0.1 — compute exact in engine); ε = 0.001 → n ≥ 66. Stated, not proved (the general machinery is calculus's).
3. **The changing output, measured discretely** (heading): AL 10.2 priced slope for LINES — one number, the steepness theorem. A CURVE has no constant rate: the honest discrete read is the SECANT SLOPE Δf/Δx = (f(x+h) − f(x))/h over an interval of width h. The four-family study (each with its own engine table + where possible a figure):
   - **f(x) = x²** at x = 3: h = 1 → 7; h = 0.1 → 6.1; h = 0.01 → 6.01 — and the ALGEBRA WINS: (x+h)² − x² = 2xh + h² so Δf/Δx = 2x + h → the push h → 0 gives 2x. Derivation: the full quotient algebra. This is the ONE family where the wall falls to school algebra (the binomial's own ch.2/ch.7 cash).
   - **f(x) = 1/x** at x = 2: h = 0.1 → −0.2380952; the algebra: (1/(x+h) − 1/x)/h = −1/(x(x+h)) → −1/x² at x = 2 = −0.25. Algebra wins again (the common-denominator move).
   - **f(x) = 2^x** at x = 1: h = 0.1 → 1.4354693; h = 0.01 → 1.3911100; h = 0.001 → 1.3867749 — THE WALL (a `warn` callout): (a^h − 1)/h has NO algebraic exit; the quotient's target is named 2·ln 2 = 1.3862944 and the numeric ladder closes on it — the target value PRICED by 9.5's series (ln 2 = 0.6931472), not derived here. The (2^h − 1)/h table at x = 0: h = 0.1 → 0.7177346; 0.01 → 0.6955550; 0.001 → 0.6933875; 0.0001 → 0.6931712 → 0.6931472.
   - **the natural base revealed** (heading or callout): the same table for a = e: h = 0.1 → 1.0517092; 0.01 → 1.0050167 → 1. e IS the base whose secant slope at 0 is exactly 1 — the honest reason "natural" (9.2's fold promised this door; it opens here).
   - **f(x) = log₂ x** at x = 1: h = 0.1 → 1.3750352; h = 0.01 → 1.4355293 — approaching 1/ln 2 = 1.4426950 (the log's slope is the exponential's upside down; the algebra: log_a(1+h)/h — again no algebraic exit; the target priced by 9.5's series).
4. **The derivative, named** (heading — `definition` callout): the derivative of f at x is the LIMIT of the secant slopes (f(x+h) − f(x))/h as h → 0 — a NEW MACHINE built on the limit; priced numerically here, proved nowhere. The derivative table for the four families (x² → 2x; 1/x → −1/x²; a^x → a^x·ln a; log_a x → 1/(x·ln a)) as a `table` block — each row marked "named + numerically priced" vs "algebraically derived" (x² and 1/x rows). Formula cards for the four.
5. **Slope for lines vs slope for curves (the AL 10.2 seam)** (heading): a line's rate is ONE number (the steepness theorem — cited, not re-proved); a curve's rate is a NEW FUNCTION. The secant-ladder figure: the same curve with three secant lines (h = 1, 0.5, 0.25) pivoting into the tangent — computed geometry, the tangent LINE named as the h → 0 endpoint of the ladder.
6. **Continuity named as a promise** (heading): the informal read — small input change → small output change (no jumps, no tearing); the jump witnesses the reader already owns (ch.1's function zoo): signum jumps 2 at 0 (signum(0.001) − signum(−0.001) = 2), GIF (the floor) jumps 1 at each integer; the ladder witness for x² at x = 3, h = 0.01: |f(3.01) − f(3)| = 0.0601 — inside the honest band h(2|x|+h) = 0.0601 exactly. A `theorem`-tone callout states the promise honestly: continuity is what makes the derivative's h → 0 push meaningful; the ε–δ machinery is calculus's; here: named, witnessed, never proved.
7. **The handoff — the neighbouring doors** (heading + a closing table or roman list): Calculus (the limit machinery + the rate machine — this book's promises cashed); Coordinate Geometry (graphs reunited — the parabola of ch.2 becomes a geometric object with foci and directrices); Trigonometry (the next machine family — the periodic ones ch.1's period census was waiting for); Probability (ch.6's counts cashed as measure). Each door: one sentence on what walks through it, citing the banked lesson that waits there. The `historical` callout: Newton and Leibniz, the 17th century, the independent invention of the calculus that begins where this book ends.
8. **Vocabulary** (6–8 terms): the limit, the tolerance ε, the secant slope, the difference quotient, the derivative, the tangent line, continuity, the jump.
9. **Formula cards** (4–6): the difference quotient; the x² quotient algebra; the derivative table (the four rows); the ε–N promise for the tail; the continuity band |f(x+h) − f(x)| ≤ h(2|x| + h) for x².
10. **Quiz 5** (§6). **Exercises** ≥16 L1–L6 (§7) with ≥3 solution figures (secant ladders, h-shrink tables as small table-figures, jump charts).

**Body figure plan (≥3):** (a) the secant-ladder (one curve — use x² on [0.5, 3.5] — with three computed secant lines pivoting into the tangent at x = 1.5 or x = 3); (b) the (2^h − 1)/h ladder as a closing-in-on-ln-2 number-line or bars figure; (c) the jump chart (signum/GIF steps vs the smooth x² band). Every coordinate computed from named constants.

## 6. Quiz — 5 items, intended keys `[2, 1, 0, 2, 1]`

q1 → 2, q2 → 1, q3 → 0, q4 → 2, q5 → 1. Exactly 4 options; explains say why wrong options fail. Topics: (1) the secant slope of x² at x = 3 with h = 0.1 (6.1; distractors 6, 6.01, 7); (2) the algebraic quotient of f(x) = x² simplifies to (2x + h; distractors 2x, x² + h, 2x − h); (3) the base whose (a^h − 1)/h → 1 as h → 0 (e; distractors 2, 10, 1); (4) which machine has a jump at 0 (signum — jump 2; distractors x², 2^x, log₂x on positive reals); (5) the digit-sum style read of the ε-promise: Σ0.9^k needs n ≥ what for |Sₙ − 9| < 0.1 (22; distractors 21, 30, 10).

## 7. Exercises — ≥16 questions, L1→L6

Spread L1×3, L2×3, L3×3, L4×3, L5×2, L6×2 (16 min). Every question: steps-array solution + terminal answer. Fresh witnesses of your own design (engine-verify EVERY one): secant slopes of your own functions/points (x² at your own x with your own h; 1/x, √x numerics — √x at x = 4: quotient (2 + h)-flavoured? NO — (√(4+h) − 2)/h has NO algebraic exit at school level; price it numerically toward 1/4 = 0.25 — a lovely wall-family witness); difference-quotient algebra where it exists (x², 1/x, x³? (x+h)³ − x³ = 3x²h + 3xh² + h³ → 3x² — the binomial cash, ALLOWED as algebra); the ε-N reads on your own tails (r = 0.5, 0.8, 0.99 — find the N for a given ε by engine search); continuity witnesses at your own points (jump sizes, band checks); derivative-table reads (given the named table, price a slope numerically and check it approaches the named value — e.g. 2^x at x = 3 toward 8·ln 2 = 5.5451774; log₁₀ x at x = 100 toward 1/(100·ln 10) = 0.0043429). ≥3 solution figures. L6: the honest chain — price (a^h − 1)/h at a = 3 toward ln 3 = 1.0986123 and connect to 9.5's series pricing.

## 8. Engine file discipline (v-aa104.ts)

- ENGINE section (no repo imports): recompute EVERY pinned number: the tail partials S₁₀/S₃₀/S₅₀ + the ε-N searches (ε = 0.1 → n = 22; ε = 0.001 → n = 66; verify by direct check 9·0.9ⁿ < ε); the four-family secant tables (x² at 3; 1/x at 2; 2^x at 1; log₂ at 1 — each at h = 1/0.1/0.01/0.001 as applicable); the quotient algebra symbolic checks (expand (x+h)² − x² numerically at your own points vs 2xh + h²; (x+h)³ − x³ vs 3x²h + 3xh² + h³; the 1/x common denominator); the (2^h − 1)/h and (e^h − 1)/h ladders; 2·ln 2 = 1.3862944, ln 2 = 0.6931472, 1/ln 2 = 1.4426950, 8·ln 2 = 5.5451774, 1/(100·ln 10) = 0.0043429, ln 3 = 1.0986123; the jump witnesses (signum ±0.001 = 2; floor around 1 = 1); the continuity band 0.0601 = h(2·3 + h) at h = 0.01. ≥70 meaningful engine checks.
- PIN section: `import { lesson104 } from './part-aa104'` + `countLessonWords` — quiz keys === `[2,1,0,2,1]`; ≥16 exercise questions across L1..L6 all steps+answers; ≥3 body figures + ≥3 solution figures; terms ≥6; formula cards ≥4; word count ≥ 6000; the HONESTY audit (string checks): the part file states the derivative as a LIMIT-of-secants definition; the derivative table marks which rows are algebra-derived vs numerically-priced; the ε–δ machinery is named as calculus's; the four doors (Calculus, Coordinate Geometry, Trigonometry, Probability) all appear.
- Engines FIRST; pins after prose. Fix the PART on pin failure unless the check contradicts the spec (flag). Harness: counts + exit 1 on fail.

## 9. Report back

(a) both paths; (b) engine + pin counts green; (c) word count; (d) spec-vs-engine catches; (e) 6-line summary (headings, tables, Illustrations, figures, quiz topics, exercise spread).
