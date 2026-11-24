# SPEC aa103 — run 122 swarm — AA lesson 10.3 "The Book in One Page: Synthesis"

You are agent **aa103** (Task ID 2-c) of the run-122 WHOLE-CHAPTER SWARM for Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep". You own ONE distinct deliverable: lesson 10.3 — the book's own consolidation page. This spec is your entire world. Write ONLY the two files named in §1.

## 0. The discipline (non-negotiable)

VERIFY-FIRST: every number your prose will print is recomputed by brute force in your engine script FIRST, green before the prose is declared done. Where this spec and your engine disagree, **THE ENGINE WINS**. All content OUR OWN (study-never-reproduce).

## 1. Output contract (exactly two files)

- `/home/z/my-project/temporary-references/part-aa103.ts` — figure helpers (prefix `syn103`) + `export const lesson103: Lesson = { ... }`.
- `/home/z/my-project/temporary-references/v-aa103.ts` — the verify-first engine+pin script, run with `cd /home/z/my-project && bun run temporary-references/v-aa103.ts`.

Never write any other file. No git commands.

## 2. TS data contract

Part file head: `import type { Lesson } from '../src/data/library/types'`.
Lesson fields: `id`, `number` ('10.3'), `title`, `concepts` (5–8), `objectives` (4–6), `prerequisites`, `sources`, `blocks`. Do NOT set `words`.

Block kinds — para/heading/callout(tones insight|warn|definition|theorem|historical|exam)/terms/equation/derivation/example/figure/table/list/quiz/exercises/formula. Shapes:
- derivation: `title` PLAIN, `statement`, `steps: [{ label (PLAIN), formula? (KaTeX no $), explanation }]`, `result` (RichText — math in `$...$` clause-wise, prose bare).
- example: `title` crisp problem statement, `steps: string[]` Cengage chain, optional `figures`.
- quiz: `items: [{ q, options (4), answer, explain }]`. exercises: `sets: [{ level, questions: [{ q, solution: string[], answer?, figures? }] }]`.
- equation: KaTeX without $, `\tag{n}` allowed. table: head PLAIN, cells may carry $math$. formula: `name` PLAIN.

KaTeX doubled backslashes in TS. FORBIDDEN: raw `\\(`, `\\[`, `$$`, `\dfrac`, `\qquad` inline (mobile law). Titles/labels/heads/captions/SVG text PLAIN.

## 3. House voice (Cengage contract)

Definitions formal + symbolic restatement; roman-list example runs; properties one per bullet with verified instances; Illustrations crisp-problem + Cengage chain (connective-led one-move lines, "Hence …" close, no step numbers); short single-idea Notes/Cautions; `exam` callout honest ("exam-style").

## 4. Figure law

≥3 body figures + ≥3 solution figures (0–2 per exercise question, only where they aid). SVG computed from named constants; viewBox ≥8px margins; role="img" + aria-label; strokes ≥1.2px; labels match prose. VIVID palette (never blue/indigo): structure `#16a34a`; primary text `#166534`; mid text `#65a30d`; teal `#0d9488`; connectors `#d97706`; accent `#ea580c`; teal ink `#0f766e`; warning `#dc2626`; panels `#fef3c7`/`#ffedd5`; separators `#fcd34d`; faint `#5eead4`; white-on-fill `#ffffff`. SVG text PLAIN (no `$`, no backslash commands; `x²`, `√2`, `·`, U+2212 minus fine). Dark-safe.

## 5. Lesson outline — 10.3 "The Book in One Page: Synthesis" (`aa-the-book-in-one-page-synthesis`)

`prerequisites: ['aa-exponentials-and-logarithms-unit-9-review', 'aa-unit-review-functions-as-objects', 'al-the-function-idea-the-doorstep']`
`sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']`

This is the book's own map of itself — the honest census of ten chapters: what was BUILT, what was only OPENED, where each door leads. It consolidates; it does NOT re-teach (every banked lesson is cited, never repeated). A synthesis page is dense with tables and shelves, but it still carries the full anatomy (motivation, definitions, Illustrations, figures, terms, formula cards, quiz, exercises). All values below are engine-pinned canonical (pin_check_122.py 117/117):

**Arc:**
1. **Opening motivation:** nine chapters walked one machine at a time; this page holds the whole book in one hand. What "one page" honestly means: one table, one shelf, one ledger, one bench — and the promise that the map, read twice, is shorter the second time.
2. **The book in one table** (heading): a 10-row table (captions above) — chapter | the object it built | the engine-recomputed witness:
   - ch.1 Functions as Objects — the machine grammar; witness g(f(3)) = 49 vs f(g(3)) = 19 on f = 2x+1, g = x²;
   - ch.2 The Quadratic at Depth — the vertex; witness max of −2x²+12x−7 = 11 at x = 3;
   - ch.3 Complex Numbers — the closure repair; witness (1+i)⁸ = 16;
   - ch.4 Inequalities — the classical engine; witness min 9x+4/x = 12 at x = 2/3;
   - ch.5 Sequences and Series — the climbs and tails; witness Σk/2^k = 2 (S₁₀ = 1.98828125);
   - ch.6 Counting — the exact counts; witness C(10,3) = 120, 10P3 = 720;
   - ch.7 Induction + Binomial — the proof engine; witness ΣC(12,k) = 4096 and Σk = 5050 at n = 100;
   - ch.8 Theory of Equations — the deep polynomial algebra; witness α³+β³ = 112 on x²−7x+11;
   - ch.9 Exponentials and Logarithms — the inverse family; witness the log chain (log₃4)⋯(log₈9) = 2 and e = 2.7182818 (2^100 has 31 digits);
   - ch.10 Synthesis + the Doorstep — the map and the limit; witness the book itself.
   Every witness recomputed by YOUR engines before this prose is fixed (the honest sentence the lesson prints).
3. **The wiring** (heading): the dependency chain named chapter by chapter — the function grammar → the quadratic as a working object → the complex rung (closure repaired) → the inequality engine (bounds become tools) → the series (sums priced) → the exact counts → the proof engine + the binomial → the polynomial's deep algebra → the inverse family → the synthesis. Include the no-duplication contract sentence: FM/ANS/AL banked the ground (number sense, proofs, the first algebra course) and every chapter cited rather than repeated — with the anchor ids named in prose (e.g. `al-the-function-idea-the-doorstep` as AL's own doorstep).
4. **The formula family gathered** (heading): one shelf per chapter family as formula cards (≥8 cards): the composition/inverse pair (f∘g, f⁻¹); the vertex form and the discriminant read; the modulus-argument pair (|z|, arg z, de Moivre); AM–GM (a+b ≥ 2√(ab)), Cauchy–Schwarz, the triangle inequality; the AP/GP sums + the infinite tail a/(1−r); the C(n,k) identities (symmetry, the sum row = 2ⁿ, Pascal); the induction schema; Vieta's pair (sum, product); the definition pair + the log law family + the digit-count law; the secant-slope ladder (10.4's own — one card, forward-referencing the next lesson honestly as the chapter's own new machine).
5. **What was only opened (the honesty ledger)** (heading — a `definition`-tone callout titled "The deferred ledger" or a table): the convergence proofs (9.1's nested brackets, e's limit definition, the fast-series remainder — USED, never proved); the completeness of the reals (assumed at the squeezes); the instantaneous rate (10.4 names the wall); the ε–δ machinery; each row = the promise + the door that owns it (Calculus, mostly). This ledger is the lesson's spine: a synthesis that hides what it did not prove is not honest.
6. **The cross-references made good** (heading): the forward doors — Coordinate Geometry (graphs reunited: the parabola of ch.2 meets the coordinate plane as GEOMETRY), Trigonometry (the next machine family — the periodic ones ch.1's period census was waiting for), Calculus (the rates + the limits), Probability (ch.6's counts cashed as measure); the backward anchors — FM (the number sense), ANS (the proof discipline), AL (the first algebra course, its 11.2 craft lesson and its 11.3 function doorstep). A roman-list walk of the four doors, one verified fact each (e.g. the parabola y = ax²+bx+c IS ch.2's vertex object in coordinates).
7. **The audit bench (cross-chapter chains)** (heading + Illustrations): single calculations that cross chapters:
   - the max-chain: maximize x(6−x) by AM–GM (= 9 at x = 3), certify the roots of x²−6x+9 = 0 by the discriminant (a double root — ch.2), and read (x−3)² ≤ 0 as the same fact (ch.4's register);
   - the binomial-digit chain: C(50,25) = 126410606437752 has 15 digits — log₁₀C(50,25) = 14.1017 (the 9.6 law cashed on a ch.7 object);
   - the induction-Gauss chain: Σk = n(n+1)/2 proved by the domino (7.1), priced at n = 100 = 5050 (the same 5050 the 10.2 rule regenerates — one number, three chapters);
   - the complex-Vieta chain: x²+x+1 = 0's roots ω, ω² with ω³ = 1 (ch.3's machine closing ch.8's fundamental theorem's promise).
8. **Vocabulary** (6–8 terms): the census, the wiring, the formula shelf, the honesty ledger, the cross-chapter chain, the forward door, the backward anchor, the witness.
9. **Formula cards** for THIS lesson's own objects: the witness table's repeated patterns (e.g. "every witness is one computation, recomputed, not remembered"); keep the chapter-family cards in §5.4 — this section's cards are the synthesis tools.
10. **Quiz 5** (§6). **Exercises** ≥16 L1–L6 (§7) — the mixed bench: at least one question per chapter family (1–9), each fresh (new constants), full steps + answers, ≥3 solution figures.

**Body figure plan (≥3):** (a) the book's wiring diagram — ten chapter stations on a rail with their handoffs labelled (the dependency chain as a computed SVG flow); (b) the honesty ledger as a two-column figure (promise | owning door) OR the formula-shelf sketch; (c) the cross-chapter chain diagram (one problem, the three registers it visits — the max-chain as stations). Keep every coordinate computed from named constants.

## 6. Quiz — 5 items, intended keys `[0, 2, 1, 0, 3]`

q1 → 0, q2 → 2, q3 → 1, q4 → 0, q5 → 3. Exactly 4 options each; explains say why wrong options fail. Topics: (1) the object ch.1 built (functions as machines — the set-of-pairs view; distractors: only polynomials, only graphs, only equations); (2) the witness value of α³+β³ on x²−7x+11 (112; distractors 343, 231, 90); (3) ΣC(12,k) (4096; distractors 924, 2048, 8192); (4) which chapter owns the digit-count law (ch.9 — exponentials/logarithms; distractors ch.6, ch.7, ch.4); (5) what the honesty ledger defers (the convergence proofs and the ε–δ machinery — to Calculus; distractors: "nothing was deferred", "the counting laws", "the quadratic formula").

## 7. Exercises — ≥16 questions, L1→L6

Spread L1×3, L2×3, L3×3, L4×3, L5×2, L6×2 (16 min). THE MIXED BENCH: ≥1 fresh question per chapter family (ch.1–ch.9), each with NEW constants (not the table's witnesses), full steps-array solutions + terminal answers; ≥3 carry solution figures; the L6 pair are two multi-chapter chains of your own design (engine-verified end to end). Ideas: a composition census at your own constants; a vertex optimization with a constraint; a modulus/argument computation; a Cauchy–Schwarz bound with the equality witness; a telescoping sum with your own split; a distribution count with your own census; an induction proof priced at your own n; a transformation-of-equations read (roots shifted by your own constant); a digit-count of a binomial coefficient of your own; a log-chain of your own bases.

## 8. Engine file discipline (v-aa103.ts)

- ENGINE section (no repo imports): recompute EVERY table witness + every chain value: g(f(3)) = 49, f(g(3)) = 19; the ch.2 vertex (complete the square AND grid-scan); (1+i)⁸ via complex multiplication (implement it, or via modulus/argument); min 9x+4/x (grid); Σk/2^k = 2 (partials to n = 400); C(10,3) = 120, 10P3 = 720 (implement both counts); ΣC(12,k) = 4096, Σk(100) = 5050; α³+β³ = 112 (solve x²−7x+11, cube, sum — and via the identity, both routes); the log chain via Math.log (product = 2 to 1e−9); e to 7 decimals (the 9.5 series to n = 15); digits of 2^100 via BigInt string length; C(50,25) exact + its digit count; ω³ = 1 (implement complex multiplication for ω = (−1+i√3)/2); the max-chain's three registers. ≥70 meaningful engine checks (this is the synthesis lesson — the engine is the book's re-audit).
- PIN section: `import { lesson103 } from './part-aa103'` + `countLessonWords` — quiz keys === `[0,2,1,0,3]`; ≥16 exercise questions across L1..L6 all steps+answers; ≥3 body figures + ≥3 solution figures; terms ≥6; formula cards ≥8; word count ≥ 6000; the honesty ledger present (string-verify the part file mentions the deferred convergence proofs and names Calculus as the door); the wiring names all ten chapter objects (string-verify each chapter title word-set: "Functions as Objects", "Quadratic", "Complex", "Inequalities", "Sequences", "Counting", "Induction", "Binomial", "Theory of Equations", "Exponentials").
- Engines FIRST; pins after the prose. Fix the PART on pin failure unless the check contradicts the spec (flag). Harness: counts + exit 1 on fail.

## 9. Report back

(a) both paths; (b) engine + pin counts green; (c) word count; (d) spec-vs-engine catches; (e) 6-line summary (headings, table rows, Illustrations, figures, quiz topics, exercise spread).
