# AA Chapter 1 — "Functions as Objects" authoring master plan

> Written 2026-11-11 (run 90 opening, owner directive: "start authoring the
> lessons… download the drive books… use Vision model, scan the pages…
> internet research… create a master plan… everything is audited… write that
> chapter and move on… create one schedule task, job, and proceed").
> The research protocol, the chapter map, the per-lesson authoring plans,
> the question-type census and the audit protocol all live here. This file is
> the chapter's standing reference for every run until chapter 1 completes.

## 1. The research protocol this chapter follows (run 90 record)

1. **Drive download for the unit** — `M4 Calculus :: 1. Relations and
   Functions` (Drive id `1koE8vUUMJHEN582NTiVuwP1nzktn8Xzj`, 120-page
   scanned PDF, 79 MB) downloaded to `temporary-references/
   m4-01-relations-and-functions.pdf`. Page-offset calibration: printed page
   `1.N` = PDF page `N + 3` (verified by VLM on five pages).
2. **Text extraction attempted first** — `pdftotext` yields ~0 chars: the
   module is a pure scan, so the vision model is mandatory (the sanctioned
   protocol). Vision transcription by `z-ai vision` in three batches
   (5+5+6 pages): printed pages **1.10–1.25** — the Relation section
   through the Quadratic Functions opening — saved to
   `temporary-references/m4scan/tr-book-1.10-1.14.txt`,
   `tr-book-1.15-1.19.txt`, `tr-book-1.20-1.25.txt` (~53K chars).
   What was captured: every definition sentence, every type-of-relation
   treatment, Illustrations 1.30–1.67 with their solution shapes, Concept
   Application Exercises 1.2/1.3/1.4 with answers, the figure inventory
   (arrow diagrams, vertical/horizontal line tests, the four [−1,1] graphs).
3. **Internet research** (2026-11-11): JEE Main syllabus (allen.in /
   vedantu JEE 2026 syllabus listings) — "Relation, type of relations,
   equivalence relations; functions: one-one, into and onto functions,
   composition of functions" = exactly this chapter's scope; NCERT class 12
   ch. 1 arc (empty/universal/trivial/reflexive/symmetric/transitive/
   equivalence + one-one/onto/bijective/invertible — byjus/vedantu syllabus
   summaries); counting formulas cross-checked (math.stackexchange surjection
   count via inclusion–exclusion; aakash.ac.uk ⁿPₘ injective count; bhanzu
   bijective n!).
4. **Study-never-reproduce rule**: the module informs and verifies our
   concepts (the no-duplication + originality law of MASTER_PLAN §2 step 5);
   every worked number, illustration, figure and exercise in our lessons is
   our own, recomputed by the verifier before any prose exists.

Companion sources (banked earlier, no new download needed): Hall & Knight
*Higher Algebra* (Drive, banked run 66 — depth stretch for later chapters),
M2-01 set theory ground (owned by the Set Theory book, cross-referenced),
Khattar QA 4e (aptitude side, later chapters), NCERT class 11–12 arcs and
OpenStax College Algebra (TOC-level, banked in the survey).

## 2. Chapter map — module sections → our eight lessons

| # | Our lesson (planned title) | Module ground (printed pp.) | Owner in our book |
|---|---|---|---|
| 1.1 | Relations: the Set-of-Pairs View | Relation 1.10–1.13 + Function (Mapping) 1.13–1.19 (the relation half) | relation as subset of A×B; roster/set-builder/arrow; domain/range/codomain; 2^pq; inverse relation; the type census (empty, universal, trivial, identity, reflexive, symmetric, transitive, equivalence); function = total + single-valued; n^m count |
| 1.2 | One-One and Onto: Classifying the Machines | Different Types of Functions (Mappings) 1.20–1.24 | one-one/many-one + the three verdict methods (analytical, graphical horizontal probe, the honest calculus-preview note); onto/into + two methods; bijective; the either-or verdicts; the finite-set pigeonhole verdict + the counting engine (ⁿPₘ, inclusion–exclusion surjection count, n!) |
| 1.3 | Composition: Machines in Series | Composite Functions 1.49–1.51 | (run 91+) |
| 1.4 | Inverse Functions: the Machine Undone | Inverse Functions 1.52–1.54 | (run 91+) |
| 1.5 | The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog | Some Elementary Functions 1.16–1.18 + Some More Functions 1.36–1.42 | (later run; modulus is AL-banked, cross-ref) |
| 1.6 | Even and Odd Functions and Their Extensions | Even and Odd Functions 1.43–1.44 | (later run) |
| 1.7 | Graph Transformations: Shifts, Stretches, Flips and the GIF Graph | Transformation of Graphs 1.59–1.63 | (later run) |
| 1.8 | The Period Census: Periods of Transformed and Composite Functions | Periodic Functions 1.45–1.48 | (later run; trig ground named honestly as the Trigonometry book's door) |

Run-90 scope (the two-lessons-per-run cadence): **1.1 and 1.2 only**,
sequentially — 1.1 fully gated before 1.2 starts.

## 3. Lesson 1.1 "Relations: the Set-of-Pairs View" — authoring plan

**Positioning.** Opens exactly on AL 11.3's doorstep (`al-the-function-idea-
the-doorstep` is the prerequisite): the input–output machine now becomes an
object — first as a SET of ordered pairs. Set language (membership, subset,
product) is used as ANS/AL banked it; the Set Theory book (later in the
shelf) will rebuild this ground from the foundations — one honest
forward cross-reference, no duplication.

**Theory sections (Cengage house voice — formal definition, "Thus,"
symbolic restatement, "For example," roman-item runs, properties lists,
boxed notes):**

1. *Why pairs?* — the machine metaphor's honest limit; a relation keeps the
   PAIRS themselves. Cartesian product A×B recalled with our own 3×3 roster
   census (A = {1, 4, 5}, B = {1, 2, 7} → 9 pairs, fully enumerated).
2. *Definition (relation)* — R from A to B is a subset of A×B; "Thus,
   $R \subseteq A \times B$." Relation ON A = subset of A×A. The honesty
   note: any set of pairs is a relation — the rule is OUR choice, no
   "relationship" is required (the module's own best point, restated in our
   words). aRb notation.
3. *Three displays* — roster form, set-builder form, arrow diagram (OUR
   figure: the x < y relation on the 3×3 census, arrows drawn).
   Domain/range/codomain defined; Range ⊆ Codomain; the missing-arrow and
   unused-target reads.
4. *How many relations?* — 2^pq derived from the subset count (the ANS
   power-set ground); verified 2^pq = number of subsets for p·q ∈ {1..12}
   by enumeration in the verifier; the graph note (a curve is a subset of
   ℝ×ℝ — one paragraph, ties to the vertical probe later).
5. *The type census* — empty φ, universal A×A, trivial (both), inverse
   R⁻¹ (pairs flipped; domain/range swap — LAW, verified), identity I_A
   vs reflexive (the module's subtle point: identity ⇒ reflexive, reflexive
   ⇏ identity — OUR counterexample census), symmetric, transitive,
   equivalence = all three. Every type: definition + symbolic restatement +
   our own verified instance/counterinstance.
6. *Equivalence in action* — one full worked equivalence proof
   (a − b divisible by 5 on ℤ: reflexive/symmetric/transitive each shown),
   the class read ([0], [1], …, [4] computed), and the same-parity
   equivalence on a small set; "equivalence = packaging by a rule that
   never disagrees with itself" intuition. Mod-n classes pinned to the ANS
   division-algorithm ground (`ans-division-with-rest-the-division-algorithm`
   named).
7. *From relation to function* — the two extra demands (TOTAL: every
   a ∈ A owns a pair; SINGLE-VALUED: no two pairs share a first element);
   "Thus, $f: A \to B$ with $\mathrm{dom}(f) = A$ and no two pairs of $f$
   share a first element." The four arrow-diagram verdicts (our own
   numbering, verified); the function-count n^m (derived by the chain of
   independent choices — FM's counting discipline); the pigeonhole preview
   that 1.2 cashes.
8. *Equal functions note* — same domain + same rule (the identical-functions
   ground the module opens at 1.18; our version priced on √(x²) = |x|,
   AL-banked).

**Illustrations (all our own numbers, verifier-certified):**
- roster-from-rule (divisibility on A = {1,2,3,4,6} — 12 pairs, domain/range
  read); the W-circle x²+y²=25 (4 pairs);
- the interval relation y = 2x+7 on [−5,5] → range [−3,17] (fold argument);
- reflexive/symmetric/transitive verdict runs on three designed relations
  (a ≤ b² fails all three; |a−b| even passes all; 1 + ab > 0 R+S not T);
- is-it-a-function verdict runs on four rosters (two pass, one fails
  totality, one fails single-valued);
- the n^m count with n(A)=2, n(B)=3 → 9 mappings, enumerated by the verifier.

**Figures (2, vivid palette, viewBox, labels in prose terminology):**
- `arrowDiagramSvg` — the x < y relation as two ellipses with arrows;
  domain/range/codomain annotation;
- `typeCensusSvg` — the equivalence-class packaging of "same remainder mod 5"
  on the integers 0–12 (boxes with class labels) — teaches the deepest idea
  of the lesson in one picture.

**Quiz** — 5 items, keys pinned pre-writing (verifier section G):
roster→domain read; codomain vs range; #relations 2^pq; identity-vs-reflexive
trap; totality-vs-single-valued verdict. Every distractor's failure
explained.

**Exercises** — 14 items across L1–L6 (question-type census in §5):
roster/set-builder conversions; domain/range of interval relations;
type-census verdicts with reasons; equivalence proofs (mod 7, same-parity,
same first letter); number-of-relations; n^m counts; is-it-a-function
roster verdicts; the L6 pigeonhole-flavoured bound (a relation on A with
more pairs than elements — the "cannot be a function" read). Full worked
solution chains (Sol. pill, connective staircase, ∴ answer).

**Formula cards** — the relation laws worth recall (domain/range swap of
R⁻¹; 2^pq; n^m; the equivalence checklist).

**Sources** — `cengage-m2-algebra`/`cengage-jee-style` (style reference),
`ncert-math12-ch1-relations-functions`, `ncert-math11-ch2-functions` carried
from the promotion plan; OpenStax cross-check; Hall & Knight honesty note
(the classic has no modern relations chapter — it is the depth stretch for
chapters 2/7/8/9, stated as such).

## 4. Lesson 1.2 "One-One and Onto: Classifying the Machines" — authoring plan

**Positioning.** The machine (AL 11.3 + lesson 1.1) is now classified by
two independent questions: does it WASTE inputs (one-one?), does it COVER
the codomain (onto?). These two verdicts are independent — a 2×2 table of
examples is the lesson's spine (all four cells filled with verified
examples).

**Theory sections:**

1. *One-one (injective)* — definition + symbolic restatement
   ($x_1 \neq x_2 \Rightarrow f(x_1) \neq f(x_2)$, contrapositive read);
   many-one as the named failure witness (a ≠ b with f(a) = f(b)).
2. *Verdict methods* — (i) analytical: set f(x₁) = f(x₂), factor, decide
   (worked honestly on x³ + x + 1: the (x₁−x₂)(x₁²+x₁x₂+x₂²+1) factorisation
   and the never-negative argument — OUR exposition with the sum-of-squares
   completion verified); (ii) graphical: the horizontal probe (the
   horizontal-line test derived from the definition — the module's twin
   figure of one-one vs many-one graphs redrawn as our own pair);
   (iii) the calculus preview note (f′ ≥ 0 decides one-one for nice machines
   — honestly marked as Differential Calculus' door, one paragraph, the
   discipline AL's doorstep taught).
3. *Onto (surjective)* — definition + symbolic restatement
   ($\forall y \in Y\ \exists x \in X: f(x) = y$, i.e. range = codomain);
   into as the named failure witness (a y with no preimage). Two methods:
   find the range; or solve x = g(y) and check it lands in the domain.
4. *Bijective* — both verdicts; the perfect pairing picture; the honest
   note that bijections are exactly the invertible machines (1.4's promise).
5. *The finite-set pigeonhole verdicts* — n(A) = m, n(B) = n:
   one-one possible iff m ≤ n (ⁿPₘ = n!/(n−m)! injections, derived by the
   choice chain; 0 when m > n — pigeonhole); onto possible iff n ≤ m
   (surjections by inclusion–exclusion $\sum (-1)^k\, {}^nC_k (n-k)^m$,
   derived on the 3-into-2 and 3-into-5 cases and brute-force verified for
   every (m,n) ≤ 5); bijection iff m = n (n! of them). The FM/ANS
   pigeonhole ground named. The either-or laws: every function is exactly
   one of one-one/many-one and exactly one of onto/into.
6. *The codomain is a choice* — onto/into depends on the DECLARED codomain;
   trimming the codomain to the range turns any function onto (the honest
   discipline for "find A so that f is onto" — exam's favourite); worked
   both directions.
7. *Restriction re-classifies* — x² on ℝ is many-one; on [0, ∞) one-one;
   x² : [0,∞) → [0,∞) bijective. Domain and codomain are part of the
   machine's identity (the lesson's closing note; sets up 1.4).

**Illustrations (own numbers, verifier-certified):**
- the 2×2 table of verdicts (four cells: x+1 on ℝ; x² on ℝ; x² : ℝ → [0,∞);
  x² : [0,∞) → [0,∞)) — every cell's verdict verified;
- analytical-method runs: x³ + x + 1 (one-one, two ways); the rational
  (x² + 4x + 7)/(x² + x + 1) many-one (witness pair (0, −1/2) verified);
- onto-method runs: f(x) = 2x + 7 : ℝ → ℝ onto (solve + check);
  x/(1+x) : [0,∞) → [0,1) bijective (the fold argument);
  (x−1)(x−2)(x−3) : ℝ → ℝ onto but many-one (f(1)=f(2)=f(3)=0 + the
  end-behaviour note, honestly argued by continuity-without-the-word);
  x²/(x²+1) : ℝ → A onto ⇒ A = [0, 1) (range by the 1 − 1/(x²+1) fold);
- counting runs: m=3, n=5 → ⁵P₃ = 60 one-one; onto count
  3⁵ − 3·2⁵ + 3·1⁵ = 150 — BOTH brute-force verified in the verifier;
  m = n = 3 → 3! = 6 bijections, enumerated;
- the square-with-parking-type piecewise warm-up is NOT used (stays for
  1.5's zoo) — instead a postage/step example stays algebraic: skipped by
  design; piecewise belongs to 1.5's ground.

**Figures (2):**
- `horizontalProbeSvg` — twin graphs: a one-one curve (x³ + x + 1) with
  horizontal probes passing once vs a many-one curve (x² + 1) with a probe
  cutting twice; labelled with the verdict language.
- `pigeonholeSvg` — the 3-dots-into-2-boxes impossibility picture (one-one
  needs more targets than arrows) + the m=n perfect-pairing ladder.

**Quiz** — 5 items, keys pinned pre-writing: the horizontal-probe read;
the contrapositive discipline; onto-by-trimming-codomain; the pigeonhole
verdict; the either-or law.

**Exercises** — 14 items L1–L6: verdict runs on named machines; find
witness pairs for many-one; find codomains that make machines onto;
counting one-one/onto/bijection numbers for small sets; the condition
p² ≤ 3q for x³ + px² + qx + r one-one (verified numerically by sweep —
L5, the module's CAE 1.4 hardest, our own exposition); L6 the "how many
machines are neither saved nor wasted" style bound + a functional-equation
flavour probe (f(x+y) = f(x)+f(y) on ℚ → one-one/onto verdict — L6
preview of 10.2's ground, verified on the additive law).

**Formula cards** — the verdict definitions (one-one/onto symbolic forms),
ⁿPₘ injection count, the inclusion–exclusion surjection count, n!
bijection count, the either-or laws.

## 5. The question-type census (what examinations actually ask)

From the module's CAE 1.2/1.3/1.4 + Exercises 1.64–1.76 single/multi-
correct, numerical-value, linked-comprehension, matrix-match, archives —
and the JEE syllabus line — the chapter's question families, all of which
1.1 and 1.2 must price:

1. **Verdict questions** — "identify the type of function" (one-one/many-one
   × onto/into, four-cell answer).
2. **Witness questions** — exhibit a pair proving many-one / an element
   with no preimage proving into.
3. **Codomain-finding** — "if f is onto, find the codomain A" (the range
   discipline).
4. **Counting questions** — number of relations 2^pq; functions n^m;
   one-one ⁿPₘ or 0; onto by inclusion–exclusion; bijections n!.
5. **Equivalence proofs** — show R is (or is not) reflexive/symmetric/
   transitive/equivalence, with counterexamples where it fails.
6. **Domain/range of relations and piecewise-defined machines** — roster
   reads, interval folds (the 2x+7 style).
7. **Parameter hunts** — find p/q/k so a family is one-one/onto (the
   p² ≤ 3q family).
8. **Multi-correct and numerical-value formats** — several options correct
   at once; integer answers for counting items (our quiz + L4 sets honour
   these formats).

## 6. The audit protocol (verify-first, runs 67/83 precedent)

`scripts/verify-book4-ch01.ts` is written FIRST and grown green BEFORE any
prose. Pre-writing sections: (A) the relation engine (roster censuses,
domain/range/codomain reads, 2^pq enumeration, inverse-swap law);
(B) the type-census engine (reflexive/symmetric/transitive verdicts on
every designed relation, equivalence-class partitions computed, identity-
vs-reflexive census); (C) the function engine (totality/single-valued
verdicts on every roster exhibit, n^m enumeration); (D) the one-one engine
(factorisation arguments, witness pairs, sum-of-squares non-negativity,
range folds); (E) the onto engine (solve-for-x checks, codomain trims,
range computations incl. the discriminant method for
(x²−x+1)/(x²+x+1) → [1/3, 3]); (F) the counting engine (ⁿPₘ, surjection
inclusion–exclusion vs brute force for all m,n ≤ 5, bijection n!;
pigeonhole verdicts); (G) quiz keys + exercise answer keys pinned with
every distractor computed. Post-authoring sections H (1.1) and I (1.2)
import the chapter file and audit: block-type usage, figure-label-vs-prose
terminology, palette hexes, word counts, quiz key match, exercise counts,
prerequisite ids existence, sources keys existence.

**Standing gates**: `bun run lint`, `tsc --noEmit`, the verifier green,
dev-server route 200 for both lessons, browser E2E (KaTeX renders, quiz
answers score, solutions expand, no console errors, 390px + 1280px), VLM
screenshot inspection light + dark. Docs sync (WORKLOG, PROGRESS,
RESUME_POINTER, WORK_INVENTORY, DETAILED_LOG, SOURCE_LOG) once per run,
after the lessons gate. Commit locally; push when the fire payload carries
the PAT.
