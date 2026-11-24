# SPEC aa102 — run 122 swarm — AA lesson 10.2 "Functional Equations: Building Functions from Rules"

You are agent **aa102** (Task ID 2-b) of the run-122 WHOLE-CHAPTER SWARM for Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep". You own ONE distinct deliverable: lesson 10.2. This spec is your entire world. Write ONLY the two files named in §1.

## 0. The discipline (non-negotiable)

VERIFY-FIRST: every number your prose will print is recomputed by brute force in your engine script FIRST, and the engine must run GREEN before the prose is declared done. Where this spec and your engine disagree, **THE ENGINE WINS** — fix the prose and flag the catch. All content is OUR OWN (study-never-reproduce): original witnesses, figures, exercises; no book text reproduced.

## 1. Output contract (exactly two files)

- `/home/z/my-project/temporary-references/part-aa102.ts` — figure helpers (prefix `fn102`) + `export const lesson102: Lesson = { ... }`.
- `/home/z/my-project/temporary-references/v-aa102.ts` — the verify-first engine+pin script, run with `cd /home/z/my-project && bun run temporary-references/v-aa102.ts`.

Never write any other file. No git commands.

## 2. TS data contract

Part file head: `import type { Lesson } from '../src/data/library/types'`.
Lesson fields: `id`, `number` ('10.2'), `title`, `concepts` (5–8), `objectives` (4–6, $math$ allowed), `prerequisites`, `sources`, `blocks`. Do NOT set `words`.

Block kinds — identical to the platform contract (para/heading/callout/terms/equation/derivation/example/figure/table/list/quiz/exercises/formula):
- `{ kind: 'derivation', title, statement, steps: [{ label, formula?, explanation }], result }` — `formula` KaTeX WITHOUT $ delimiters; `label` PLAIN; `result` RichText (math in `$...$` CLAUSE-WISE, prose tails bare).
- `{ kind: 'example', title, steps: string[], figures? }` — title a crisp problem statement; steps the Cengage chain (connective-led, one move per line, no step numbers).
- `{ kind: 'quiz', items: [{ q, options (exactly 4), answer, explain }] }`.
- `{ kind: 'exercises', sets: [{ level: 'L1'..'L6', questions: [{ q, solution: string[], answer?, figures? }] }] }`.
- `{ kind: 'figure', caption, svg }`; `{ kind: 'table', caption?, head, rows }` (head PLAIN, cells may carry $math$); `{ kind: 'terms', items: [{ term, def }] }`; `{ kind: 'formula', name, latex, note? }` (name PLAIN); `{ kind: 'equation', latex, note? }` (`\tag{n}` allowed).

KaTeX in TS: doubled backslashes. FORBIDDEN: raw `\\(`, `\\[`, `$$`, `\dfrac`, `\qquad` inside inline `$...$` (mobile law — short inline maths; family lists become per-member maths). Titles/labels/table heads/formula names/captions/SVG text PLAIN (no TeX).

## 3. House voice (Cengage contract)

Definitions formal ("*X* is said to … if …") + symbolic restatement ("Thus, $…$."), `definition` callout + `terms` entry for the same idea; "For example," + roman-list example runs; properties one per bullet with a verified instance; Illustrations = crisp problem statement + Cengage solution chain (Setup → moves led by Split/Take/Check/Now,/So,/or/But/Hence → "Hence …"); Notes short and single-idea (`insight`, `warn`); an `exam` callout maps the craft to the JEE arc ("exam-style" honesty).

## 4. Figure law

≥3 body figures + ≥3 solution figures (inside exercise solutions, 0–2 per question, only where they genuinely aid). SVG: computed geometry from named constants; viewBox ≥8px margins; `role="img"` + `aria-label`; strokes ≥1.2px; labels match prose. VIVID palette only (never blue/indigo): structure `#16a34a`; primary text `#166534`; mid text `#65a30d`; teal strokes/captions `#0d9488`; connectors/ticks `#d97706`; accent/arrows `#ea580c`; teal ink `#0f766e`; warning `#dc2626`; panels `#fef3c7`/`#ffedd5`; separators `#fcd34d`; faint grids `#5eead4`; white on filled bars `#ffffff`. SVG text PLAIN — no `$`, no backslash commands (write `f(x+y)`, `f^2(x)`, `x → −x`, `·`, U+2212 minus). Dark-safe by construction.

## 5. Lesson outline — 10.2 "Functional Equations: Building Functions from Rules" (`aa-functional-equations-building-functions-from-rules`)

`prerequisites: ['aa-composition-machines-in-series', 'aa-inverse-functions-the-machine-undone', 'aa-mathematical-induction-the-domino-principle', 'aa-logarithms-the-inverse-machine']`
`sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']`

The book built functions by FORMULA; the competition arc builds them by RULE. A functional equation prescribes how values combine; the craft finds every machine that obeys (on the stated domain). The lesson cashes chapter 1 (machines, composition, inverses), chapter 7 (induction = the value ladder) and chapter 9 (the exponential/logarithm laws read as RULES). All values below are engine-pinned canonical (pin_check_122.py 117/117):

**Arc:**
1. **Opening motivation:** every lesson so far handed you a formula and asked what it DOES; a functional equation hands you the DOING and asks for the formula. The rule-first turn.
2. **The definition** (`definition` callout + terms): a functional equation on a domain D is a condition tying the values $f$ at combined inputs; a SOLUTION is a machine that satisfies it for every admissible pair. The census idea: find ALL solutions, not one.
3. **The value ladder — the master craft** (heading): f(x+y) = f(x) + f(y) on the reals, f(1) = 3. The ladder: f(0) = 0 (set x=y=0 twice: f(0) = 2f(0), f(0) ≠ 0 forces f(0) = 0 — actually f(0) = f(0)+f(0) directly gives it); f(n) = 3n for every NATURAL n by induction (ch.7's domino on function values); f extends to negatives by f(−x) = −f(x); to RATIONALS by n·f(p/q) = f(p) → f(p/q) = 3p/q. Witnesses: f(2026) = 6078, f(1/2) = 3/2, f(−7) = −21. THE HONEST SCOPE (theorem callout): the ladder reaches every rational WITHOUT continuity; on the FULL real line, wild non-linear solutions exist unless a regularity assumption (monotonicity / boundedness / continuity) is added — named, never proved here (the doorstep promise; the next lesson's continuity is the honest tool).
4. **Monotone + additive → linear (the squeeze cashed on functions)** (heading): f additive AND increasing with f(1) = 2 → f(x) = 2x for ALL real x. The irrational rung by nesting rationals — 9.1's squeeze re-welded: 1.41 < √2 < 1.42 → 2·1.41 < f(√2) < 2·1.42 (monotonicity carries the bracket), tighter rational brackets squeeze f(√2) to 2√2 = 2.8284271. Derivation: the two-sided ladder (for rational pₙ < x < qₙ with pₙ, qₙ → x, both f(pₙ) and f(qₙ) climb to cx).
5. **The shifted ladder (the constant-cleanup move)** (heading): f(x+y) = f(x) + f(y) + 1, f(1) = 3 → set g(x) = f(x) + 1 → g additive with g(1) = 4 → f(x) = 4x − 1 on ℚ (engine both-directions: f(5) = 19; f(x+y) = 4(x+y)−1 equals f(x)+f(y)+1 = (4x−1)+(4y−1)+1 on every witness pair). The class rule named: absorb the constant, re-ladder, translate back. A second instance: f(x+y) = f(x)+f(y)+xy, f(1) = 1 → try g(x) = f(x) − x(x+1)/2... wait — the polynomial solution is f(x) = x(x+1)/2 (see §5.6) — here keep the CONSTANT-shift instance as the craft move and the xy-rule as its own section.
6. **The quadratic-regeneration rule** (heading): f(x+y) = f(x) + f(y) + xy with f(1) = 1 → f(x) = x(x+1)/2 on ℚ. Engine both-directions: f(x+y) = ((x+y)² + (x+y))/2 vs f(x)+f(y)+xy — equal on (2,3), (5,7), (10,10), (1,1). Witnesses: f(6) = 21, f(100) = 5050 — the GAUSS SUM regenerating as function values (the ch.6 tie). Derivation: the u = x+y, v = x−y diagonal trick or the induction ladder on naturals (f(n+1) = f(n) + n+1 with f(1) = 1 → f(n) = n(n+1)/2 by the domino).
7. **The product family (ch.9 read as rules)** (heading): f(x+y) = f(x)·f(y) with f(0) ≠ 0 → f(0) = f(0)² → f(0) = 1; f(n) = f(1)ⁿ — f(1) = 3 → f(4) = 81; negative indices by f(−1) = 1/f(1). The machine census: f(x) = aˣ IS the solution family (ch.9's exponential verified as a rule-obeyer). The multiplicative-over-PRODUCTS family: f(xy) = f(x)·f(y) → f(x) = xⁿ (witness (2·3)⁴ = 2⁴·3⁴ = 1296); the LOGARITHM rule f(xy) = f(x) + f(y) — 9.3's product law read BACKWARD as a rule (f = log_a: log₂6 = log₂2 + log₂3). Table: which banked machines obey which rules (x² additive? NO — (1+2)² = 9 ≠ 5; 2^x additive? NO — 2³ = 8 ≠ 6; 2^x multiplicative-over-sums? YES; log₂ multiplicative-additive? YES; xⁿ multiplicative-over-products? YES). Each NO is an engine-witnessed Caution against the "everything is linear" trap.
8. **Iterations and involutions (ch.1 cashed)** (heading): f(f(x)) = x — the involution definition (callout); the involutions f(x) = c − x and f(x) = 1/x (x ≠ 0) verified by substitution. THE ORDER-4 MACHINE: f(x) = (x−1)/(x+1) (x ≠ −1) — f²(x) = −1/x, f³(x) = (1+x)/(1−x), f⁴(x) = x (engine-swept on five witnesses 2, 3.5, −0.5, 7, 0.25 — f⁴ = identity on all). f^2026(x) = −1/x (2026 ≡ 2 mod 4). Derivation: the f² computation carried line by line. A figure: the four-cycle (cobweb/orbit diagram of the order-4 machine on the extended line).
9. **The craft summary (the routing table)**: which move answers which rule-shape — value ladder (additive), constant-cleanup (shifted additive), the diagonal/polynomial try (quadratic terms), the census (product rules), the cycle sweep (iterations). An `insight` callout: every rule named in this lesson is a BANKED LAW worn backwards (the exponent law, the log product law, the domino principle) — the synthesis is the point.
10. **Vocabulary** (6–8 terms): functional equation, solution family, the value ladder, the constant cleanup, the product rule, the involution, the orbit, the census.
11. **Formula cards** (4–6): the additive ladder (f(n) = n·f(1)); the shifted cleanup (g = f + c); the product ladder (f(n) = f(1)ⁿ); the quadratic regeneration (f(x) = x(x+1)/2); the order-4 cycle (f, −1/x, (1+x)/(1−x), x); the monotone-linear squeeze.
12. **Quiz 5** (§6). **Exercises** ≥16 L1–L6 (§7) with ≥3 solution figures.

**Body figure plan (≥3):** (a) the value-ladder ladder diagram (f(1) → f(2) → … each rung = one rule application); (b) the order-4 orbit cycle (four stations f → −1/x → (1+x)/(1−x) → x); (c) the census table as a machine-rule grid figure OR the monotone squeeze band (rational brackets closing on f(√2)). Optionally (d) the constant-cleanup translation sketch.

## 6. Quiz — 5 items, intended keys `[1, 2, 0, 1, 2]`

Item keys: q1 → 1, q2 → 2, q3 → 0, q4 → 1, q5 → 2. Exactly 4 options each, explains that say why each wrong option fails. Topics: (1) f additive with f(1) = 3, find f(2026) (6078; distractors 2026·2 = 4052, 6081, 6077 — arithmetic slips); (2) f(x+y) = f(x)f(y), f(1) = 3, f(0) ≠ 0 — find f(0) (1; distractors 0, 3, f(0) = f(0)² so "any value"); (3) f(x+y) = f(x)+f(y)+1, f(1) = 3, find f(5) (19; distractors 15 (forgot the shift), 20, 16); (4) f(x) = (x−1)/(x+1) — find f(f(2)) (−1/2; distractors 2, 1/2, 3); (5) which machine obeys f(xy) = f(x) + f(y) on positive reals (log₂ x; distractors 2^x, x², x+1).

## 7. Exercises — ≥16 questions, L1→L6

Spread L1×3, L2×3, L3×3, L4×3, L5×2, L6×2 (16 min). Every question: steps-array solution + terminal answer. Fresh witnesses of your own design (own constants, own seeds — engine-verify EVERY one): additive ladders at other seeds (f(1) = c → f(n), f(p/q), f of negatives); shifted ladders (+2, +xy variants with your own constants); product ladders (f(1) = 2 → f(10) = 1024, half-integer rungs by roots — keep honest: only claim values the rule licenses, e.g. f(1/2) = √f(1) needs the positive branch named); census questions (which of four machines obeys which rule — with computed NO-witnesses); involutions and cycles (f(x) = c−x at your own c; order-3 machines — e.g. f(x) = 1/(1−x) has f³ = id: ENGINE-CHECK before printing — f(2) = −1, f²(2) = 1/(1−(−1)) = 1/2, f³(2) = 1/(1−1/2) = 2 ✓ — build your own order-3 witness and sweep it); f^2026-style power queries by cycle length. ≥3 solution figures (ladder walks, orbit cycles). At least one L6: a mixed rule (additive + product conditions) resolved by laddering BOTH structures to the same machine.

## 8. Engine file discipline (v-aa102.ts)

- ENGINE section: NO repo imports; recompute EVERY pinned number (f(2026) = 6078; the rational ladder f(p/q) = 3p/q on ≥6 witnesses; the squeeze numerics; the shifted-ladder both-directions on ≥4 pairs; the quadratic-regeneration both-directions on ≥4 pairs + f(100) = 5050; the product family f(4) = 81; (2·3)⁴ = 1296; the census NO/YES witnesses; the order-4 sweep to f⁴ = id on 5 witnesses + f²(2) = −0.5 + f³(2) = −3; the order-3 machine 1/(1−x) sweep if you use it; 2026 mod 4 = 2). ≥60 meaningful engine checks.
- PIN section (P01…): `import { lesson102 } from './part-aa102'` + `import { countLessonWords } from '../src/data/library/types'` — quiz keys === `[1,2,0,1,2]`; ≥16 exercise questions across L1..L6, all steps-arrays non-empty with answers; ≥3 body figures + ≥3 solution figures; terms ≥6; formula cards ≥4; countLessonWords(lesson102) >= 6000; 4 options per quiz item; the census table's NO-rows each carry a computed refutation (string-verify the refutation numbers appear).
- Engines FIRST (before prose); pins after. Fix the PART on pin failure unless the check contradicts the spec (then flag). Bottom harness: print counts, exit 1 on fail.

## 9. Report back

(a) both file paths; (b) engine + pin check counts, green; (c) word count; (d) spec-vs-engine catches (engine value + what changed); (e) a 6-line content summary (headings, Illustrations, figures, quiz topics, exercise spread).
