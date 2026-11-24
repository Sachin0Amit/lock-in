# SPEC geo103 — lesson 1.3 "Axioms, Theorems and the Shape of a Proof" (run 124, GEOMETRY ch.1)

You are authoring agent geo103 for the LockIn Library. Your ONLY deliverables:
1. `temporary-references/v-geo103.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `temporary-references/part-geo103.ts` — the lesson object, ≥6,000 words
Report (final message): file paths, engine score X/X GREEN, word count, quiz key, figure counts.

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH01_MASTER_PLAN.md`
- `/home/z/my-project/docs/research/aa-ch10-wip/part-aa101.ts.txt` + `v-aa101.ts.txt` (exemplars)
- `/home/z/my-project/temporary-references/pin_check_geo124.py` (pre-flight pins GREEN — reuse the truth-table witnesses)

## LESSON OBJECT (pinned)
- `id: 'geo-axioms-theorems-and-the-shape-of-a-proof'`, `number: '1.3'`, `title: 'Axioms, Theorems and the Shape of a Proof'`
- `concepts`: 5–8 (axiom, theorem, conditional statement, contrapositive, proof by contradiction, counterexample, model, quantifier)
- `prerequisites: ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game']`
- `sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen']`

## CONTENT OUTLINE
1. **Opening motivation**: rules chosen (1.2) — now the game. The axiomatic method's core promise: a statement is believed only when PROVED; everything before the first proof is an agreement or a promise. What separates a proof from a vibe.
2. **The statement family** (taxonomy + table): definition (a naming agreement), axiom/postulate (assumed — the five postulates + common notions from 1.2 are OUR examples), conjecture (believed, unproved — honest label), theorem (proved), lemma (stepping-stone proved result), corollary (one-step consequence). Each with a one-line "who vouches for it" column.
3. **The conditional heart**: $P \Rightarrow Q$; hypothesis + conclusion; the truth table (four rows, engine-checked); $P \Rightarrow Q$ is true when $P$ is false (the vacuous row — explained, not hidden); $P \Rightarrow Q \equiv \neg P \vee Q$; the converse $Q \Rightarrow P$ and inverse $\neg P \Rightarrow \neg Q$ are NOT equivalent to the original (the engine's counterexample: $P$ false, $Q$ true); the contrapositive $\neg Q \Rightarrow \neg P$ IS equivalent — the move Euclid used everywhere. The worked conditional: "if two lines meet, they meet in exactly one point" with its converse/contrapositive spelled out.
4. **The four proof shapes** (each with a worked micro-proof in a `derivation`):
   - Direct: hypothesis → chain → conclusion. Demo: from CN1, "segments equal to the same segment are equal to each other" (transitivity of coincidence-equality).
   - Contrapositive: to prove $\neg Q \Rightarrow \neg P$ prove $\neg Q \Rightarrow \neg P$ directly… i.e. assume $Q$ fails, show $P$ fails. Demo: "if two segments do not coincide exactly, they are not equal in length" (contrapositive of coinciding ⇒ equal).
   - Contradiction (reductio): assume the negation, derive an impossibility. Demo: **a line has no last point** — suppose a last point $L$; the extendability instinct (P2, 1.2) gives a point beyond $L$ on the same line — contradiction. (Every printed step engine-checked as logic.)
   - Counterexample: to REFUTE a universal. Demo: "every two points determine exactly one plane" is refuted by four non-coplanar points (the 3-D model); "all quadrilaterals are squares" refuted by one rectangle.
5. **Quantifiers**: $\forall$, $\exists$, $\exists!$ (existence + uniqueness — the two halves of Hilbert's planar incidence axiom I.1 previewed: exactly one line through two distinct points); order matters: "for every point there EXISTS a line containing it" vs "there EXISTS a line containing every point" — the engine checks both over the four-point plane model (first TRUE, second FALSE — pinned).
6. **Models**: a system obeying the rules is a model; a model proves a set of axioms consistent (it makes them simultaneously true); a model where a statement fails proves the statement is NOT a consequence — the independence idea (this is exactly how the fifth postulate's unprovability was settled — 1.2's history, now with the machinery). Tease 1.4: the four-point plane and the Fano plane are models you can hold in your hand.
7. **The Euclidean anatomy**: statement / construction / argument / conclusion — the four-part shape every Book I proof wears; Q.E.D. (quod erat demonstrandum) as the ancient full stop.
8. **Exam callout**: contrapositive-vs-converse traps, vacuous truth, and proof-shape identification are standard assessment targets (JEE logic items; university bridge courses).
9. **Illustrations** (Cengage chain): (a) classify six statements (definition/axiom/conjecture/theorem/lemma/corollary); (b) exam-shaped: for a given conditional, write converse, inverse, contrapositive and state which are equivalent (with the engine's truth table); a third exercise walk-through on quantifier order.
10. **Figures** (≥3 body): (F1) the statement-family map (taxonomy diagram, computed boxes); (F2) the conditional square — $P \Rightarrow Q$, converse, inverse, contrapositive with equivalence marks (contrapositive highlighted equivalent, converse/inverse flagged not); (F3) the four proof shapes as a flow collage. Solution figures ≥2 (e.g. the vacuous-row picture; the quantifier-order counter-diagram on the 4-point plane).
11. **Quiz** (5, why-they-fail explains) + **Exercises** (15, L1–L6, full steps solutions): witnesses from the engine's truth-table block (the four-row table; the converse counterexample row $P$ false/$Q$ true; the contrapositive equivalence; the quantifier-order model checks; the no-last-point logic), all printed numbers engine-verified.

## FORMAT LAW (binding — identical to spec-geo101.md)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (U+2212 minus); vivid palette only; aria-labels; quiz/exercise indices at intended options; `terms` block; `formula` cards ($P \Rightarrow Q \equiv \neg Q \Rightarrow \neg P$; $P \Rightarrow Q \equiv \neg P \vee Q$); ≥2 example blocks; ≥6,000 words; `const C`/`const FONT`, helpers prefixed `geo13`, `export const lessonGeo103: Lesson`.

## ENGINE LAW (verify-first — identical to spec-geo101)
`temporary-references/v-geo103.ts`: ENGINE section (no repo imports): full truth-table sweep (the 4 rows × the 4 statement forms; equivalence classes; the two counterexample rows pinned), quantifier-order checks over the 4-point plane (lines = 6 pair-lines; ∀point∃line TRUE; ∃line∀points FALSE; ∃line with 2 points TRUE), the no-last-point argument's logical skeleton, statement-classification mapping asserts, quiz-key self-check, exercise witnesses. Engine ALL GREEN → prose → PIN section importing `./part-geo103` auditing the full checklist (words ≥6000, quiz key, 15 exercises, ≥3 body + ≥2 solution figures, terms, no-\qquad-in-math, no-$-in-SVG, id/number/title/sources exact). ALL GREEN. Engine wins.
