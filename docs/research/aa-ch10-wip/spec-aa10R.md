# SPEC aa10R — run 122 swarm — AA lesson 10.R "Unit 10 Completion Review"

You are agent **aa10R** (Task ID 2-e) of the run-122 WHOLE-CHAPTER SWARM for Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep". You own ONE distinct deliverable: the unit review 10.R — the book's LAST page. This spec is your entire world. Write ONLY the two files named in §1.

## 0. The discipline (non-negotiable)

VERIFY-FIRST: every number your prose will print is recomputed by brute force in your engine script FIRST, green before the prose is done. Where this spec and your engine disagree, **THE ENGINE WINS**. All content OUR OWN. A review CONSOLIDATES and runs a MIXED bench; it REFUSES to re-teach — every re-derivation is one move with its owner lesson cited by id.

## 1. Output contract (exactly two files)

- `/home/z/my-project/temporary-references/part-aa10R.ts` — figure helpers (prefix `rv10R`) + `export const lesson10R: Lesson = { ... }`.
- `/home/z/my-project/temporary-references/v-aa10R.ts` — the verify-first engine+pin script, run with `cd /home/z/my-project && bun run temporary-references/v-aa10R.ts`.

Never write any other file. No git commands.

## 2. TS data contract

Part file head: `import type { Lesson } from '../src/data/library/types'`.
Lesson fields: `id`, `number` ('10.R'), `title` ('Unit 10 Completion Review'), `concepts` (5–8), `objectives` (4–6), `prerequisites`, `sources`, `blocks`. Do NOT set `words`.

Block kinds — para/heading/callout(tones insight|warn|definition|theorem|historical|exam)/terms/equation/derivation/example/figure/table/list/quiz/exercises/formula. Shapes:
- derivation: `title` PLAIN, `statement`, `steps: [{ label (PLAIN), formula? (KaTeX no $), explanation }]`, `result` (RichText — math `$...$` clause-wise, prose bare).
- example: `title` crisp problem statement, `steps: string[]` Cengage chain, optional `figures`.
- quiz: `items: [{ q, options (4), answer, explain }]`. exercises: `sets: [{ level, questions: [{ q, solution: string[], answer?, figures? }] }]`.
- equation: KaTeX without $, `\tag{n}` allowed. table: head PLAIN, cells may carry $math$. formula: `name` PLAIN.

KaTeX doubled backslashes. FORBIDDEN: raw `\\(`, `\\[`, `$$`, `\dfrac`, `\qquad` inside inline `$...$` (mobile law). Titles/labels/heads/captions/SVG text PLAIN.

## 3. House voice (Cengage contract)

Definitions formal + symbolic restatement; "For example," + roman-list runs; properties one per bullet with verified instances; Illustrations crisp-problem + Cengage chain (connective-led one-move lines, "Hence …", no step numbers); short single-idea Notes/Cautions; `exam` callout honest ("exam-style").

## 4. Figure law

≥3 body figures + ≥3 solution figures (0–2 per exercise question). SVG computed from named constants; viewBox ≥8px margins; role="img" + aria-label; strokes ≥1.2px; labels match prose. VIVID palette (never blue/indigo): structure `#16a34a`; primary text `#166534`; mid text `#65a30d`; teal `#0d9488`; connectors `#d97706`; accent `#ea580c`; teal ink `#0f766e`; warning `#dc2626`; panels `#fef3c7`/`#ffedd5`; separators `#fcd34d`; faint `#5eead4`; white-on-fill `#ffffff`. SVG text PLAIN (no `$`, no backslash commands; `f^2(x)`, `−1/x`, `·`, U+2212 minus fine). Dark-safe.

## 5. Lesson outline — 10.R "Unit 10 Completion Review" (`aa-the-synthesis-and-the-doorstep-unit-10-review`)

`prerequisites: ['aa-competition-algebra-the-advanced-craft', 'aa-functional-equations-building-functions-from-rules', 'aa-the-book-in-one-page-synthesis', 'aa-the-doorstep-limits-and-the-changing-output']`
`sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']`

Follow the unit-review pattern of this book (each chapter closes with one): the chapter in one table, the essentials re-derived in one move each, the audit bench (cross-lesson chains), the mixed bench (17 fresh questions), the doorstep. As the BOOK's final page, the closing coda also reads the whole-book handoff once more. All values below are engine-pinned canonical (pin_check_122.py 117/117):

**Arc:**
1. **Opening (2–3 paras):** the chapter's four lessons in one walk — the craft (10.1), the rules (10.2), the map (10.3), the limit (10.4); what a review does and refuses (consolidate + audit; never re-teach); the order of business.
2. **The chapter in one table:** four rows — lesson | the object it built | the engine-recomputed witness:
   - 10.1 The Advanced Craft — the five moves on the new machines; witness the nested substitution's four roots ((5±√17)/2, (5±√21)/2 — root sum 10, product 2) or the ladder 7, 18, 47, 123;
   - 10.2 Functional Equations — the rule-first turn; witness the order-4 machine (f = (x−1)/(x+1): f² = −1/x, f⁴ = x; f^2026 = −1/x) or the Gauss regeneration f(100) = 5050;
   - 10.3 The Book in One Page — the honest map; witness the C(50,25) = 126410606437752 digit chain (15 digits) or the log chain = 2;
   - 10.4 The Doorstep — the limit named; witness the (2^h − 1)/h ladder closing on 0.6931472 and the x² quotient algebra (2x + h → 2x).
   Every witness recomputed by YOUR engines before the prose is fixed (say so).
3. **The formula family gathered** (display equations `\tag{}` + formula cards): the craft's tools (the ladder recurrence s_{k+1} = (x + 1/x)s_k − s_{k−1}; the product-under-fixed-sum bound; the telescoping split; the general term); the rules' families (the additive ladder f(n) = n·f(1); the product ladder f(n) = f(1)ⁿ; the quadratic regeneration x(x+1)/2; the order-4 cycle f, −1/x, (1+x)/(1−x), x); the doorstep's machines (the difference quotient; the derivative table rows for x², 1/x, a^x, log_a x; the ε–N promise). 8–10 cards, each with its home lesson.
4. **The essentials re-derived in one move each** (heading + 4 short derivations, owners cited):
   - the nested substitution, recalled in two moves (the t-swap + the two quadratic solves — owner 10.1);
   - the value ladder, recalled in two moves (the domino step + the rational extension — owner 10.2, with 7.1 cited);
   - the honesty ledger, recalled (the deferred list in one sentence with the doors — owner 10.3);
   - the secant push, recalled (the x² quotient algebra collapsing h → 0 — owner 10.4, with AL 10.2 cited).
5. **The audit bench (cross-lesson chains)** (heading + Illustrations):
   - the additive→exponential chain: f(x+y) = f(x)f(y), f(1) = 2 → f(n) = 2ⁿ → f(100) = 2^100 → 31 digits by the 9.6 digit-count law (10.2 + 9.6 in one number — the engine writes out 2^100 in full);
   - the order-4 power chain: f(x) = (x−1)/(x+1), f^2026(x) = f²(x) = −1/x (10.2's cycle + the mod-4 read);
   - the Gauss chain: f(x+y) = f(x)+f(y)+xy, f(1) = 1 → f(100) = 5050 (10.2's rule + 7.1's induction + 6.x's triangular census);
   - the craft chain: maximize x(6−x) = 9 by AM–GM, certify by the discriminant's double root, and confirm Σ of the roots of x²−6x+9 by Vieta (10.1 + ch.2 + ch.8 registers);
   - the binomial-digit chain: C(50,25) has 15 digits via log₁₀ = 14.1017 (10.1's hunt + 9.6's law);
   - the doorstep chain: (a^h − 1)/h at a = 3 closes on ln 3 = 1.0986123, the value 9.5's series prices (10.4 + 9.5).
6. **The mixed bench:** 17 fresh questions L1→L6 crossing every lesson boundary (ideas: a new nested substitution; a ladder at a new seed; a new AM–GM boundary with the equality witness named; a telescoping family with your own split; a new rule-family census row; a new involution/cycle sweep; a new ε–N read on a new tail; a secant table on a new function; a derivative-table read checked numerically; a digit-count of a new power; a symmetric read with new constants) — every one a NEW witness (never reuse the lessons' own numbers verbatim), full steps-array solutions + terminal answers, ≥3 carrying solution figures, ≥5 crossing at least two lesson boundaries explicitly.
7. **The closing coda (the book's last page):** the handoff read once more — Calculus (the limits + the rates), Coordinate Geometry (graphs reunited), Trigonometry (the periodic family ch.1's census awaited), Probability (the counts cashed as measure); the honest boundaries restated (what the book PROVED — the AM–GM, the induction schema, the binomial theorem at positive index, the log laws, the Vieta machinery — vs what it OPENED — the convergence proofs, the ε–δ machinery, the derivative's full theory); the census sentence: sixty-seven written lessons across ten chapters (62 banked + these 5 — say "sixty-seven" in words), one arc from the set-of-pairs view to the doorstep of the calculus. End the book the way the reviews end: with the bench run and the doors named.
8. **Quiz 5** (§6). **Vocabulary** (6–8 terms): the craft register, the rule register, the map register, the limit register, the audit chain, the mixed bench, the handoff, the census.
9. **Formula cards**: the 8–10 gathered in §5.3.

**Body figure plan (≥3):** (a) the chapter's four-station rail (craft → rules → map → limit) with the audit chains as cross-rails; (b) the order-4 cycle re-drawn as the review's own orbit (your own computed layout, not 10.2's); (c) the book's door chart (four doors, what walks through each). Compute every coordinate from named constants.

## 6. Quiz — 5 items, intended keys `[1, 0, 2, 1, 2]`

q1 → 1, q2 → 0, q3 → 2, q4 → 1, q5 → 2. Exactly 4 options; explains say why wrong options fail. Topics: (1) s₄ when x + 1/x = 3 (47; distractors 45, 108, 322); (2) f additive with f(1) = 3 — the value f(7) (21; distractors 18, 24, 10); (3) the machine with f⁴ = id (f(x) = (x−1)/(x+1); distractors f(x) = x², f(x) = 2^x, f(x) = x+1); (4) the secant slope of x² at x = 3 with h = 0.01 (6.01; distractors 6, 6.1, 9); (5) digits of 2^100 (31; distractors 30, 32, 100).

## 7. Exercises — 17 questions, L1→L6

Spread L1×3, L2×3, L3×3, L4×3, L5×3, L6×2. Every question: steps-array solution + terminal answer. ALL witnesses fresh (your own constants). ≥3 with solution figures. ≥5 explicitly cross lesson boundaries (say which, in the solution's first line, e.g. "Crosses 10.2 and 9.6:").

## 8. Engine file discipline (v-aa10R.ts)

- ENGINE section (no repo imports): recompute EVERY witness: the ladder sweep (s₂..s₉ at seed 3 AND at least one new seed of your own); the nested substitution roots + substitution-back check; the AM–GM grid check; the telescoping partials; Σk·k! = (n+1)!−1; the k/2^k partials; C(12,5)/C(12,6)/ΣC(12,k); the log chain = 2; the digit counts (8^25 → 23; 2^100 → 31 with the full decimal printed; C(50,25) → 15); the additive/product ladders at your own seeds; the quadratic regeneration f(100) = 5050; the order-4 sweep to f⁴ = id + f²(2) = −0.5; the (2^h−1)/h and (e^h−1)/h ladders; the x²/1/x secant tables; 2·ln 2, 1/ln 2, ln 3; the ε–N searches on your own tail. ≥80 meaningful engine checks.
- PIN section: `import { lesson10R } from './part-aa10R'` + `countLessonWords` — quiz keys === `[1,0,2,1,2]`; exactly 17 exercise questions across L1..L6 all steps+answers; ≥3 body figures + ≥3 solution figures; terms ≥6; formula cards ≥8; word count ≥ 5000 (reviews may run slightly lighter than lessons — 10.R's own bar); the table names all four lessons (string-verify '10.1'..'10.4' present); the coda names the four doors + the sixty-seven census sentence (string-verify 'Coordinate Geometry', 'Trigonometry', 'Calculus', 'Probability' present).
- Engines FIRST; pins after prose. Fix the PART on pin failure unless the check contradicts the spec (flag). Harness: counts + exit 1 on fail.

## 9. Report back

(a) both paths; (b) engine + pin counts green; (c) word count; (d) spec-vs-engine catches; (e) 6-line summary (table rows, derivations, bench items, figures, quiz topics, exercise spread).
