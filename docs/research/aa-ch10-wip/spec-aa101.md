# SPEC aa101 — run 122 swarm — AA lesson 10.1 "Competition Algebra: the Advanced Craft"

You are agent **aa101** (Task ID 2-a) of the run-122 WHOLE-CHAPTER SWARM for Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep". You own ONE distinct deliverable: lesson 10.1. You see no repo, no protocol, no other agent — this spec is your entire world. Work self-contained; write ONLY the two files named in §1.

## 0. The discipline (non-negotiable)

VERIFY-FIRST: every number your prose will print is recomputed by brute force in your engine script FIRST, and the engine script must run GREEN before the prose is declared done. Where this spec and your engine disagree, **THE ENGINE WINS** — fix the prose (and flag the catch in your report). All content is OUR OWN (study-never-reproduce): original witnesses, original figures, original exercises; no book text reproduced.

## 1. Output contract (exactly two files)

- `/home/z/my-project/temporary-references/part-aa101.ts` — the lesson part: figure helper functions (prefix EVERY helper name `in101`, e.g. `in101LadderSvg`) + `export const lesson101: Lesson = { ... }`.
- `/home/z/my-project/temporary-references/v-aa101.ts` — the verify-first engine+pin script, self-contained, run with `cd /home/z/my-project && bun run temporary-references/v-aa101.ts`.

Never write any other file. Do not run git commands.

## 2. TS data contract

Part file head:
```ts
import type { Lesson } from '../src/data/library/types'
```
The Lesson object: `id`, `number` ('10.1'), `title`, `concepts` (5–8 phrases), `objectives` (4–6, may carry $math$), `prerequisites`, `sources`, `blocks` (see below). Do NOT set `words` (computed honestly).

Block kinds (verbatim from src/data/library/types.ts):
- `{ kind: 'para', text }` — prose, `$inline math$`, `**bold**`, `*italic*`
- `{ kind: 'heading', text }` — Title Case words only (rendered uppercase)
- `{ kind: 'callout', tone: 'insight'|'warn'|'definition'|'theorem'|'historical'|'exam', title, text }`
- `{ kind: 'terms', items: [{ term, def }] }` — def may carry $math$
- `{ kind: 'equation', latex, note? }` — KaTeX WITHOUT $ delimiters; `\tag{n}` numbers it
- `{ kind: 'derivation', title, statement, steps: [{ label, formula?, explanation }], result }` — `formula` = KaTeX without $; `label` PLAIN words; `result` = RichText: math inside `$...$` CLAUSE-WISE (short clauses!), prose tails bare
- `{ kind: 'example', title, steps: string[], figures?: [{ caption, svg }] }` — title is a CRISP PROBLEM STATEMENT (plain words + $math$ allowed inside the statement); steps = Cengage solution chain lines (see §3)
- `{ kind: 'figure', caption, svg }` — svg = full `<svg ...>...</svg>` string
- `{ kind: 'table', caption?, head: string[], rows: string[][] }` — head PLAIN; cells may carry $math$
- `{ kind: 'list', items, marker?: 'disc'|'decimal'|'roman' }`
- `{ kind: 'quiz', items: [{ q, options: string[], answer: number, explain }] }` — exactly 4 options per item
- `{ kind: 'exercises', title?, sets: [{ level: 'L1'|'L2'|'L3'|'L4'|'L5'|'L6', questions: [{ q, solution: string[], answer?, figures? }] }] }`
- `{ kind: 'formula', name, latex, note? }` — name PLAIN

KaTeX in TS source needs doubled backslashes (`\\frac`, `\\sqrt`, `\\log_2`). FORBIDDEN anywhere: raw `\\(`, `\\[`, `$$`, `\dfrac`, `\qquad` inside INLINE `$...$` (mobile-width law — keep inline maths short and breakable; family lists become per-member maths). Derivation/example/callout TITLES, step labels, table heads, formula names, captions, SVG text: PLAIN — raw TeX there is a defect.

## 3. House voice (Cengage presentation contract)

- Definitions open formally ("*X* is said to be … if …") + symbolic restatement on its own line ("Thus, $…$."); keep the `definition` callout AND a `terms` entry.
- Example runs after a definition: "For example," + `list` with `marker: 'roman'` (items (i) (ii) (iii)).
- Properties lists: one property per bullet, each with a verified instance.
- Illustrations: `example.title` = crisp problem statement; `steps` = the Cengage chain — first line states the setup, later lines ONE move each led by natural connectives (Split / Take / Check / Now, / So, / or / But / And / Hence), final line concludes ("Hence …"). NO step numbers. `answer`-style terminal lines live in the steps' last line (Hence $…$).
- Notes/cautions: short, boxed, single-idea (`insight` = Note, `warn` = Caution).
- Exam mapping: an `exam` callout tying the craft to the JEE Main arc (label exam-style items honestly — "exam-style", never claim a real paper).

## 4. Figure law (v9.0 amendment 2 + FIGURE_VERIFICATION_PROTOCOL)

- ≥3 BODY figures (figure blocks) + ≥3 SOLUTION figures (inside exercise solutions, 0–2 per question, only where the diagram genuinely aids THAT solution). Solution figures carry their own caption.
- SVG: computed geometry only — every coordinate derived from named constants in the helper (no magic numbers); `viewBox` with ≥8px margins; `role="img"` + `aria-label` on the root; strokes ≥1.2px; labels match prose terminology.
- VIVID PALETTE ONLY (hard-coded hex; NEVER blue/indigo; the retired muted set is forbidden): structure strokes/axes/boxes `#16a34a`; primary text `#166534`; mid text/formulas `#65a30d`; captions/teal strokes `#0d9488`; connectors/ticks `#d97706`; accent/arrows/highlights `#ea580c`; teal structure `#0d9488`; teal ink `#0f766e`; warning `#dc2626`; tinted panels `#fef3c7`/`#ffedd5`; separators `#fcd34d`; faint grids/dots `#5eead4`; white text on filled bars `#ffffff`. Text ≥4.5:1 on the `#fffdf5` plate.
- SVG `<text>` content: PLAIN forms only — `2^x`, `√2`, `x ≈ 4.5615528`, `·`, `−` (U+2212 for minus). FORBIDDEN inside SVG text: `$`, `\\frac`, `\\times`, `\\sqrt`, `\\geq`, any backslash command (the E2E gate greps these).
- Dark-mode safe by construction (figures render on a fixed light plate in both themes).

## 5. Lesson outline — 10.1 "Competition Algebra: the Advanced Craft" (`aa-competition-algebra-the-advanced-craft`)

`prerequisites: ['al-competition-algebra-identities-and-substitutions', 'aa-symmetric-reads-and-common-roots', 'aa-the-arithmetic-geometric-mean-inequality', 'aa-special-series-and-the-method-of-differences', 'aa-binomial-coefficients-at-work', 'aa-the-laws-of-logarithms-and-the-change-of-base']`
`sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'cengage-m1-01']`

The ADVANCED sequel to AL 11.2's competition lesson: the same five craft moves re-welded onto the five machine families this book built (chapters 2, 4, 5, 7, 9). Never re-teach a banked lesson — cite it by id and move on. All values below are engine-pinned (pin_check_122.py 117/117 green — these ARE the canonical values; your engines recompute them):

**Arc:**
1. **Opening motivation:** AL 11.2 banked five moves on the identity bank; chapters 2–9 built five machine families. The sequel's question: what do the SAME moves do on the NEW machines? A craft lesson — depth over novelty.
2. **The substitution game at depth** (heading): nested-quadratic substitutions beyond AL 11.2's single t-swap. Anchor Illustration: `(x²−5x+5)² − 7(x²−5x+5) + 12 = 0` → t²−7t+12 = 0 → t ∈ {3, 4} → the four roots `(5±√17)/2, (5±√21)/2` — engine-witnesses: discriminants 17 and 21; the root sum 10 and root product 2 by Vieta (the cross-check); numerics (5+√17)/2 = 4.5615528, (5−√17)/2 = 0.4384472, (5+√21)/2 = 4.7912879, (5−√21)/2 = 0.2087121; every root satisfies the original to ≤1e−6. The x+1/x LADDER at depth: x + 1/x = 3 → s₂ = 7, s₃ = 18, s₄ = 47, s₅ = 123 via s_{k+1} = 3s_k − s_{k−1}; the engine sweep continues s₆ = 322, s₇ = 843, s₈ = 2207, s₉ = 5778. A figure: the ladder (each rung born from the two below it).
3. **Symmetric reads via the roots** (heading): α, β the roots of x²−7x+11 = 0 → α+β = 7, αβ = 11 → α³+β³ = 7³ − 3·11·7 = 112; α⁴+β⁴ = (α²+β²)² − 2(αβ)² = 27² − 242 = 487; (α−β)² = 49−44 = 5; 1/α + 1/β = 7/11. Engine numerics: α = 4.7912879, β = 2.2087121. The cubic staple α³+β³+γ³ − 3αβγ = (α+β+γ)(α²+β²+γ²−αβ−βγ−γα) named (ch.8.3's) with one verified instance.
4. **AM–GM maxima under constraints** (heading, ch.4 cashed): min x + 4/x = 4 at x = 2; min 9x + 4/x = 12 at x = 2/3 (weighted split 9x + 4/x = 9x + 4/x ≥ 2√(9x·4/x) = 12); max x(6−x) = 9 at x = 3 (product under fixed sum: ≤ ((x + (6−x))/2)²); max xyz = 64 under x+y+z = 12 (three terms at 4,4,4). The boundary discipline (Caution): the AM–GM bound binds ONLY at equality — a max/min claim must name the equality witness; a constraint that never reaches equality prices no maximum.
5. **Series sums priced by difference and telescoping** (heading, ch.5 cashed): Σ_{k=1}^{n} 1/(k(k+2)) = (1/2)(3/2 − 1/(n+1) − 1/(n+2)) — S₅ = 0.5952381, S₁₀ = 0.6287937, the tail → 3/4 (S₁₀₀₀ = 0.7497500); Σ_{k=1}^{n} k·k! = (n+1)! − 1 (S₅ = 719 = 6!−1, S₇ = 7·8!−... engine: S₇ = 13698); Σ_{k=1}^{n} k/2^k = 2 − (n+2)/2ⁿ — S₆ = 1.875, S₁₀ = 1.98828125, the infinite value 2 (5.2's tail priced by the AGP shift). Derivation: the telescoping split of 1/(k(k+2)) into (1/2)(1/k − 1/(k+2)).
6. **Binomial term hunts** (heading, ch.7 cashed): the general term of (1+x)^12; coefficient of x⁵ = C(12,5) = 792; the greatest coefficient C(12,6) = 924 (the middle-turning law); Σ C(12,k) = 4096 = 2^12 and the alternating sum 0; the independent term of (2x − 1/x)^10 = −8064 (k = 5: C(10,5)·2⁵·(−1)⁵); the x⁴ coefficient = −15360 (k = 3: C(10,3)·2⁷·(−1)³). Derivation: the general-term setup T_{k+1} = C(10,k)(2x)^{10−k}(−1/x)^k.
7. **Log speed reads** (heading, ch.9 cashed): the ordering chain log₂3 = 1.5849625 > log₃4 = 1.2618595 > log₄5 = 1.1609640 > log₅6 = 1.1132827 > log₆7 = 1.0860331 — strictly decreasing, and WHY (monotonicity + change of base: log_{n+1} n = 1/log_n(n+1) with the denominator climbing); digits of 8^25: 25·log₁₀8 = 22.5772497 → 23 digits (the 9.6 digit-count law); the duel 2^300 vs 3^200 settled by 300·ln2 = 207.9441542 < 200·ln3 = 219.7224577.
8. **The mixed craft — one problem, three families** (heading + the exam corner): an Illustration chaining AM–GM (the bound) + Vieta (the certification) + a binomial count (the census); the `exam` callout names the JEE Main arc (exam-style).
9. **Vocabulary** (`terms`, 6–8 entries): nested substitution, the ladder recurrence, the symmetric read, the constraint boundary, the telescoping split, the general term, the digit-count read, the equality witness.
10. **Formula cards** (4–6): the ladder recurrence; the product-under-fixed-sum law; the telescoping split; the general term; the digit-count law; the log-ordering monotonicity read.
11. **Quiz 5** (keys pinned — §6). **Exercises** ≥16 L1–L6 (§7) with ≥3 solution figures.

**Body figure plan (≥3):** (a) the substitution map (the t-machine collapsing a quartic's four roots into two quadratic families); (b) the x+1/x ladder rungs; (c) the AM–GM boundary (x(6−x) against its 9-ceiling with the equality point marked); optionally (d) the log-ordering chain as a decreasing staircase.

## 6. Quiz — 5 items, intended keys `[2, 0, 1, 3, 1]`

Write 5 quiz items so that the CORRECT option index equals the pinned key per item: item 1 → index 2, item 2 → index 0, item 3 → index 1, item 4 → index 3, item 5 → index 1. Each item: a crisp question (may carry $math$), exactly 4 options, `explain` that says why EACH wrong option fails. Topics: (1) the value of s₃ when x+1/x = 3 (18; distractors: 21, 27, 15 — the classic wrong recurrence); (2) α³+β³ for x²−7x+11 (112; distractors from sign slips); (3) the min of 9x+4/x for x>0 (12; distractors 6, 13, "no minimum"); (4) the independent term of (2x − 1/x)^10 (−8064; distractors 8064, −792, −252); (5) digits of 8^25 (23; distractors 22, 24, 21 — off-by-one on the floor law).

## 7. Exercises — ≥16 questions, L1→L6

Level spread: L1×3, L2×3, L3×3, L4×3, L5×2, L6×2 (16 minimum; 17 welcome). Exam typology named in the block title or an exam callout: Single Correct / Multiple Correct / Numerical Value (JEE arc). EVERY question: full `solution` as a steps array (Cengage chain), terminal `answer`. Design your OWN fresh witnesses (do not reuse the Illustrations' numbers verbatim) — ideas: nested substitutions with your own constants (engine-verified), ladder recurrences at other seeds, symmetric reads on other quadratics (keep the discriminants honest), weighted AM–GM mins, telescoping families (1/(k(k+1)), 1/(k(k+3)), k(k+1)·k!, Σ C(n,k) identities), binomial coefficient hunts (specific coefficients, greatest terms, independent terms of your own binomials), digit-counts of your own powers, log-ordering duels of your own bases. ≥3 questions carry a solution figure (the §4 law). At least one L6 multi-family chain (the mixed craft).

## 8. Engine file discipline (v-aa101.ts)

Shape (mirror this exactly):
- Header comment: file purpose + the discipline statement ("the engine wins over the spec").
- NO repo imports in the ENGINE section (pure arithmetic — recompute EVERY pinned number: the four substitution roots by solving the two quadratics + substituting back into the original; the ladder sweep to s₉; the symmetric reads; the AM–GM minimax grids; the telescoping partials vs closed forms; Σk·k!; the k/2^k partials; the binomial coefficients (implement comb(n,k) or use a factorial route); the log chain values via Math.log; the digit counts via string lengths of BigInt/exact integers; 2^300 vs 3^200 via logs AND direct BigInt comparison).
- Collect with `check(name, ok, detail)` into engine tallies (aTotal/aPass) — target ≥60 engine checks, every one meaningful (not `1==1` padding).
- The PIN section (P01…) imports your part file: `import { lesson101 } from './part-aa101'` + `import { countLessonWords, type Lesson } from '../src/data/library/types'` — and checks: quiz keys `lesson101.blocks.find(b => b.kind === 'quiz').items.map(i => i.answer)` === `[2,0,1,3,1]`; ≥4 exercises sets spanning L1..L6 with ≥16 questions total and every question carrying a non-empty steps-array solution + answer; ≥3 body figures + ≥3 solution figures; ≥1 terms block ≥6 items; ≥4 formula cards; word count `countLessonWords(lesson101) >= 6000`; every quiz item has exactly 4 options; the intended correct option of each quiz item is textually present (print the options in the detail so a human can eyeball the maths); every exercise answer appears in its solution's last line (string containment, loosened to the numeric core).
- Run it green (engines BEFORE prose exists — write the engine first, run, then author; the pin section runs green only after the prose). If a pin fails, fix the PART, not the check (unless the check itself contradicts this spec — flag it).
- Bottom harness: print `<id>: <pass> pass, <fail> fail` and `process.exit(1)` on fail.

## 9. Report back (your final message)

Return: (a) the two file paths; (b) engine check count + pin check count, both green; (c) word count; (d) any spec-vs-engine catches (the engine's value + what you changed); (e) a 6-line content summary (headings, Illustrations count, figure count, quiz topics, exercise level spread).
