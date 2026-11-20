# AA Chapter 6 — "Counting: Permutations and Combinations" authoring master plan

> Written 2026-11-20, the chapter-6 parallel-swarm run (the 2026-11-18 owner-chat
> directive "launch multiple agents for authoring lessons", honored a second
> time; the 2026-11-18 ch. 4 swarm is the precedent this file mirrors). The
> one-unit-at-a-time cadence is honored exactly: ONE chapter (ch. 6) is opened
> and closed whole; no second chapter is touched (ch. 5's remaining 5.6 + 5.R
> wait their own run — this swarm does not touch them). The unit is authored
> by six parallel lesson agents + one review agent + one assembler/gates pass,
> in the architecture of §5. This file is the chapter's standing reference
> until chapter 6 completes — which this run closes.

## 1. The research protocol this run follows (2026-11-20 record)

1. **Drive download for the unit** — `M2 Algebra :: 07. Permutation and
   Combination` (Drive id `1689UZ9q8ctrhiBtWLNLBpKCcHUQzS-me`, 67.8 MB scanned
   PDF, 74 PDF pages) → `temporary-references/m2-07-permutation-and-combination.pdf`.
   `pdftotext` yields **0 chars** on the theory pages (verified this run on PDF
   3–5): a pure scan, as every M2 module is — the vision model is mandatory.
   The printed theory band 7.1–7.48 = PDF 3–50; the solutions part = PDF 51–74
   (its own S.xx numbering).
2. **Page-offset calibration** — printed `7.N` = PDF `N + 2`, the SAME offset
   the m2-02/m2-03/m2-05/m2-06 modules carry. Proof, two independent kinds:
   (a) the drivers' own probe record (PDF 4 = printed 7.2 "Algebra" head;
   PDF 5 = printed 7.3 "Permutation and Combination"; PDF 6 = printed 7.4);
   (b) the banked bands themselves — each driver fed a known PDF range and
   the returned transcription's printed headers ran exactly the predicted
   sequence (batch A: PDF 3–7 → printed 7.1–7.5; batch B: PDF 8–11 → 7.6–7.9;
   … batch H: PDF 37–40 → 7.35–7.38; the solutions take: PDF 51–56 →
   S.125–S.129). One honesty note: the VLM's own `[PDF p.x]` guesses inside
   the transcriptions are unreliable (it mislabels first markers — e.g.
   tr-7.14-7.19's first marker reads "PDF p.21" where the fed image was PDF
   16); the PRINTED headers are the ground truth, and they corroborate the
   drivers' page feeds exactly.
3. **Vision transcription** (`scripts/transcribe-m2-07.sh` take 1 +
   `transcribe-m2-07b.sh` continuation + `transcribe-m2-07c.sh`/`-07d.sh`
   solutions takes, batches at 100 DPI JPEG renders in `/tmp/m2pdf07`,
   sequential with 20 s pacing per the 2026-11-17 429 lesson) — ten cleaned
   bands banked at `temporary-references/m2scan/`:
   - `tr-7.1-7.5.txt` (PDF 3–7 = printed 7.1–7.5: Fundamental Principle of
     Counting — multiplication rule + its proof, addition rule, the
     route-tree and door exhibits, ILLUSTRATIONS 7.1–7.19, CAE 7.1) — 6.1's
     primary.
   - `tr-7.6-7.9.txt` (PDF 8–11 = printed 7.6–7.9: Factorial Notation + its
     results + the three false-law notes, Exponent of Prime in n! (Legendre),
     ILLUSTRATIONS 7.20–7.26, CAE 7.2, Permutation + Formula for Permutation,
     ILLUSTRATIONS 7.27–7.34) — 6.2's and 6.3's primary.
   - `tr-7.10-7.13.txt` (PDF 12–15 = printed 7.10–7.13: the dictionary-rank
     craft, CAE 7.3, Permutation when all Objects are Not Distinct (the
     BANANA-type shapes), CAE 7.4, Permutation Under Restriction (the
     together/gap taxonomy), Combination: Elementary start) — 6.3's
     secondary + 6.4's primary + 6.5's head.
   - `tr-7.14-7.19.txt` (PDF 16–21 = printed 7.14–7.19: Properties of nCr —
     symmetry, the equality discipline, Pascal's identity, the ratio law,
     the middle maximum, k! divisibility, p | pCr — ILLUSTRATIONS 7.50–7.76,
     CAE 7.6, Combination and Arrangement start) — the 6.2 hosted-fold ground
     + 6.5's head.
   - `tr-7.20-7.24.txt` (PDF 22–26 = printed 7.20–7.24: the restricted
     arrangement drills (vowels together/separated, letter-gap hunts,
     exactly-k-distinct letters), ILLUSTRATIONS 7.77–7.85, CAE 7.7, Circular
     Permutation — the (n−1)! shift argument — Clockwise and Anticlockwise
     Arrangements — the (n−1)!/2 necklace/garland argument, ILLUSTRATIONS
     7.86–7.93, CAE 7.8, All Possible Combinations start (2^n, 2^n − 1)) —
     6.4's primary + 6.5's head.
   - `tr-7.25-7.29.txt` (PDF 27–31 = printed 7.25–7.29: Number of Divisors
     (τ, σ, the product-of-two census), CAE 7.9, Division and Distribution
     of Distinct Objects (two groups m≠n, three groups, the general formula,
     equal size ÷ k!), Distribution when group sizes are not fixed (r^n and
     the onto formula deferred to PIE), CAE 7.10, Distribution of Identical
     start) — 6.6's primary.
   - `tr-7.30-7.34.txt` (PDF 32–36 = printed 7.30–7.34: identical
     distribution empty-allowed C(n+r−1, r−1) / not-allowed C(n−1, r−1), the
     integral-solutions series method ((1−x)^{−n} coefficients), CAE 7.11,
     Principle of Inclusion and Exclusion (two/three-set Venn census, the
     general statement), ILLUSTRATIONS 7.115–7.132) — 6.6's primary.
   - `tr-7.35-7.38.txt` (PDF 37–40 = printed 7.35–7.38: PIE cashed — the
     derangement D(n) = n!·Σ(−1)^k/k!, D(4) = 9, the exactly-k-correct
     censuses, the couples-grouping shape; Distribution of Distinct if
     empty groups are not allowed; CAE 7.12; the Exercises start) — 6.6's
     primary.
   - `tr-s.first.txt` (PDF 51–56 = printed S.125–S.129: the solutions part's
     opening band — the CAE 7.1–7.8 worked solutions (Exercises 7.1–7.8
     banners)) — every lesson's method-shape ground, never reproduced.
   - `tr-s.130-135.txt` (PDF 57–62 = printed S.130–S.135: the CAE 7.9–7.12 +
     main-Exercises worked solutions) — HONEST RECORD: this band was left
     INCOMPLETE at the research handoff (a 66-byte stub — the brief said
     skip it); a re-check at plan-writing time found the previous agent's
     batch had in fact completed on disk after the handoff snapshot — the
     file is now present and verified complete (six page markers S.130–
     S.135, full content through the main-Exercises solutions start). The
     plan treats it as BONUS method-shape ground for 6.6 only; NO obligation
     in §2–§5 depends on it.
4. **Internet research** (banked keys only — the P&C canon was fully banked
   at the run-89 full-shelf planning pass; no fresh web checks are required
   by this chapter, because every lesson has module ground — unlike ch. 4's
   4.3–4.5): NCERT class 11 ch. 6 "Permutations and Combinations" (banked key
   `ncert-math11-ch6-permutations-combinations` — the school-canon ground),
   the JEE (Main) 2026 syllabus (banked key `jee-main-2026-syllabus` — its
   unit list CARRIES permutations and combinations: unit 4 in the banked
   audit record), Hall & Knight *Higher Algebra* (banked key
   `hall-knight-higher-algebra` — ch. XI "Permutations and Combinations",
   the classic stretch), Khattar QA 4e (banked key `khattar-qa-4e` — the
   aptitude-exam corner), OpenStax *College Algebra 2e* (banked key
   `openstax-college-algebra` — ch. 9 "Sequences, Probability and Counting",
   the sequencing cross-check), the presentation contract (banked key
   `cengage-jee-style`), the module-scope reference (banked key
   `cengage-m2-algebra`). ONE new citation key is proposed, to be banked by
   the orchestrator at close, mirroring the `cengage-m2-06` pattern:
   `cengage-m2-07` — the Drive M2 Algebra module 07 working copy whose
   download, calibration and transcription this §1 records. Any agent that
   genuinely needs a fresh web check records it as a proposed key in its run
   report instead of citing unbanked keys.
5. **Study-never-reproduce rule** — the module informs and verifies METHOD
   SHAPES only (the together/gap taxonomy, the shift argument for (n−1)!,
   the overcount argument for alike things, the partitions-in-gaps picture,
   the PIE sign alternation); every roster, word, number, figure,
   Illustration and exercise in chapter 6 is OUR OWN, recomputed by the
   verify engines before any prose is declared done.

## 2. Chapter map — module sections → our seven lessons

book.ts pins the six planned titles (exact strings, all ASCII-clean — no
apostrophes to protect this time). THE TEACHING ORDER IS PINNED HERE: the
plannedLessons **array** in book.ts lists the titles in a non-pedagogical
order (an artifact of the 2026-11-17 insertion pass), but the chapter's own
summary arc — "the fundamental principle first … then the two great counts
… the chapter closes with the distribution puzzles" — and the research
drivers' ground annotations (batch A → "6.1's primary"; batch D → "the 6.2
fold ground") pin the order below. The assembler ships the lessons in THIS
order, under the ch-04.ts internal naming `lesson61 … lesson66` +
`lessonReview6`.

| # | Our lesson (exact plannedLessons title) | Ground |
|---|---|---|
| 6.1 | The Fundamental Principle of Counting | module 7.1–7.5 (FPC: the multiplication rule + its proof, the addition rule, ILLUSTRATIONS 7.1–7.19, CAE 7.1) + the S.125 solution shapes |
| 6.2 | Factorials and the Counting Toolkit | module 7.6–7.7 (Factorial Notation + results + the false-law notes + Exponent of Prime in n! + CAE 7.2) + 7.14–7.19 (Properties of nCr — the hosted-fold ground, ILLUSTRATIONS 7.50–7.76, CAE 7.6) |
| 6.3 | Permutations: the Arrangement Count | module 7.7–7.12 (Permutation + Formula for Permutation + ILLUSTRATIONS 7.27–7.39 + CAE 7.3 + Permutation when all Objects are Not Distinct + CAE 7.4) + the dictionary-rank craft (7.10) |
| 6.4 | Circular and Restricted Permutations | module 7.12–7.13 (Permutation Under Restriction + CAE 7.5) + 7.20–7.22 (the restricted-arrangement drills 7.77–7.85 + CAE 7.7 + Circular Permutation + Clockwise and Anticlockwise Arrangements + 7.86–7.93 + CAE 7.8) |
| 6.5 | Combinations: the Selection Count | module 7.13–7.24 (Combination: Elementary + the nPr→nCr two-step derivation + Combination and Arrangement 7.19 + All Possible Combinations 7.23–7.24: zero-or-more, at-least-one + ILLUSTRATIONS 7.94–7.98) |
| 6.6 | Distributions and the Classic Counting Puzzles | module 7.24–7.35 (Selection from Identical 7.24 + Number of Divisors 7.25 + CAE 7.9 + Division and Distribution of Distinct Objects 7.26–7.28 + CAE 7.10 + Distribution of Identical 7.29–7.31 + CAE 7.11 + PIE 7.33 + Distribution if empty not allowed + Derangement 7.34–7.35 + CAE 7.12) + the S.130–S.135 bonus shapes |
| 6.R | Unit 6 Completion Review | the whole band consolidated + both solutions bands' method shapes |

Every lesson of THIS chapter has module ground (unlike ch. 4, where 4.3–4.5
were own synthesis). The own-synthesis **loads** layered on the ground: the
small-case census discipline (list n = 2, 3 before trusting any formula —
the house method, this chapter's wrong-model catcher), the outcome-set
formalization on ch. 1's relations ground (a count is the cardinality of a
set of outcomes), the combinatorial rereads of 6.2's factorial algebra
(Pascal's identity by the in/out split beside the algebraic proof), and the
Probability/Combinatorics handoff prose.

**Pinned lesson ids** (permanent, stable forever, globally unique — each
grep-verified UNUSED across `src/data/library/` at 0 hits before pinning;
the slug rule drops the colon of "Permutations: the Arrangement Count" /
"Combinations: the Selection Count", following the aa- slug convention):

- 6.1 `aa-the-fundamental-principle-of-counting`
- 6.2 `aa-factorials-and-the-counting-toolkit`
- 6.3 `aa-permutations-the-arrangement-count`
- 6.4 `aa-circular-and-restricted-permutations`
- 6.5 `aa-combinations-the-selection-count`
- 6.6 `aa-distributions-and-the-classic-counting-puzzles`
- 6.R `aa-counting-unit-6-review` (title convention: `Unit 6 Completion
  Review`, the 3.R/4.R precedent; the id takes the chapter-title fragment
  "counting", as `aa-classical-inequalities-unit-4-review` took "classical
  inequalities")

**Hosted folds from TOC_FOLD_LEDGER.json binding this chapter (binding
obligations — a lesson that misses its hosted fold is INCOMPLETE; 19
entries, ledger grep 2026-11-20; `section` = a named subsection + formal
definition + ≥ 1 worked example, `example-family` = ≥ 2 worked `example`
blocks of exactly that type, traceable by title or setup):**

- **6.1 The Fundamental Principle of Counting** — hosts NOTHING (verified:
  no ledger entry hosts this title). Its own tier-1 lesson ground is the
  survey's "Fundamental Principle of Counting" + "Multiplication Rule" +
  "Addition Rule" lines.
- **6.2 Factorials and the Counting Toolkit** — hosts (m2-07) "Exponent of
  Prime in n!" — mode `section`: a named subsection, formal definition of
  Legendre's E_p(n!), at least one worked example. Hosts (m2-07)
  "Properties of nCr" — mode `section`: a named subsection with the formal
  nCr = n!/(r!(n−r)!) definition + at least one worked example; this is the
  TEASER fold (the ch-04 "Weighted Means in 4.1" precedent) — 6.2 owns the
  factorial-algebra half, 6.5 owns the full selection engine.
- **6.3 Permutations: the Arrangement Count** — hosts (m2-07) "Permutation
  when all Objects are Not Distinct" — mode `section`: named subsection +
  formal statement of the n!/(p! q! …) division + ≥ 1 worked example. Hosts
  (m2-07) "Formula for Permutation" — mode `section` (the 2026-11-17
  reorg's re-fold; the note says the surveyed content rides a named
  subsection of the surviving host): the nPr derivation itself must live as
  a named, formally stated subsection.
- **6.4 Circular and Restricted Permutations** — hosts (m2-07) "Permutation
  Under Restriction" — mode `section`: named subsection + the two restriction
  families defined + ≥ 1 worked example. Hosts (m2-07) "Clockwise and
  Anticlockwise Arrangements" — mode `section`: named subsection + the
  (n−1)!/2 statement + ≥ 1 worked example. (The guide's §4.5 worked example
  — "Circular Permutation" is the tier-1 promotion that BECAME this lesson
  — verified in the ledger's routing, not a fold.)
- **6.5 Combinations: the Selection Count** — hosts (m2-07) "Selection of
  Zero or More Objects from n Different Objects" — mode `example-family`:
  ≥ 2 worked `example` blocks of exactly the 2^n-selection type. Hosts
  (m2-07) "Selection of at Least One Object from n Different Objects" —
  mode `example-family`: ≥ 2 worked `example` blocks of exactly the
  2^n − 1 type.
- **6.6 Distributions and the Classic Counting Puzzles** — hosts ELEVEN
  entries: (m2-07) "Selection from Identical Objects" — `section`;
  "Division and Distribution of Distinct Objects" — `section`;
  "Division and Distribution of (m + n) Distinct Objects into Two Groups of
  Sizes m and n (m ≠ n)" — `example-family`; "Division and Distribution of
  (m + n + p) Distinct Objects into Three Groups of Sizes m, n and p
  (m ≠ n ≠ p)" — `example-family`; "Division and Distribution of Distinct
  Objects into Groups of Equal Size" — `example-family`; "Distribution of
  Distinct Objects when Group Sizes are not Fixed" — `example-family`;
  "Distribution of Identical Objects" — `section`; "Distribution of
  Identical Objects when Empty Groups are not Allowed" — `example-family`;
  "Distribution of Identical Objects when Empty Groups are Allowed" —
  `example-family`; "Number of Integral Solutions Using Series
  (Multinomial Theorem)" — `section`; "Distribution of Distinct Objects if
  Empty Groups are not Allowed" — `example-family`. Six example-family
  folds × 2 examples + five section folds: the lesson's worked-craft
  minimum is large — plan the Illustration budget for it (≥ 8 examples is
  the structural floor, not the fold ceiling).

No other fold entry is hosted on a ch. 6 lesson title (ledger grep
2026-11-20; no entry hosts "The Fundamental Principle of Counting" or the
6.R review).

## 3. The seven arcs in one line each (the writing spine)

- **6.1** — the two rules born from journeys and doors (the 2×3 route tree
  P—Q—R, the five-door room): the multiplication rule PROVED the module's
  way (m ways × n continuations = n added to itself m times = mn — the
  repetition proof, not a slogan), the addition rule with its
  exclusive-alternatives honesty (AND chains multiply, OR forks add, and
  only DISJOINT forks add), the three-storey chains (m·n·p), the
  with-repetition vs without divide (4^5 answer sheets, 26(1+10)-type
  variable censuses), the outcome-set formalization on ch. 1's
  set-of-pairs ground (a count is the size of a set of outcomes; a chain is
  a cartesian product), the small-case census discipline installed as the
  chapter's habit (list sizes 2 and 3 before trusting any formula), the
  complement seed named forward (total − bad, cashed in 6.4 and 6.6), the
  route-tree and room figures.
- **6.2** — factorials as bookkeeping for the shrinking chain: n! born as
  the running product the principle kept producing, the recursion n·(n−1)!
  and the unwinding identities (n!/r! = the top n−r factors;
  n!/(n−r)! = r factors — the toolkit's two fractions, each with its
  small-case check), the three false laws as honest refusals ((m+n)! ≠
  m! + n!, (mn)! ≠ m!·n!, (kn)! ≠ k·n! — each refuted by one tiny witness),
  0! = 1 by the empty-product consistency (nPn = n!/0!), the
  Exponent-of-Prime fold (Legendre's E_p(n!) = Σ⌊n/p^i⌋ as a COUNTING
  argument — multiples of p each contribute one p, of p² a second — with
  the composite honesty (the largest power of 6 in 32! is min(E₂, E₃)) and
  ANS 4.3's trailing-zeros instance cross-referenced, cited never
  re-taught), and the Properties-of-nCr teaser fold (n!/(r!(n−r)!) defined
  as a fraction; symmetry, the equality discipline nCx = nCy ⇒ x = y or
  x + y = n, Pascal's identity, the ratio law nCr/nCr−1 = (n−r+1)/r, the
  middle maximum, k! dividing every product of k consecutive integers, p |
  pCr for prime p — proved by algebra HERE, re-read as selection facts in
  6.5).
- **6.3** — nPr derived from the chain, never memorized: the r vacant
  places filled in n, n−1, …, n−r+1 ways (the boxes figure), the
  multiplication rule closing the chain, n!/(n−r)! as the bookkeeping
  compression (6.2's second fraction cashed), nPn = n!, the
  with-repetition n^r distinguished (each seat free — 6.1's chain, not
  6.3's), the alike-things fold (n!/(p! q! …) via the overcount argument —
  arrange OUR OWN words, and list the 2-alike-of-3 case by hand first),
  the dictionary-rank craft (the alphabetical ladder; rank = 1 + the
  words-before count, priced on our own words), the small-case census
  before every formula.
- **6.4** — restrictions priced by the two families (always-together: the
  bundle and its internal order; never-together: the gap method —
  (n−r+1) gaps), the linear drills (vowels together, vowels separated, the
  fixed-gap hunts — our own words), then the circle: (n−1)! PROVED by the
  shift argument (each circular arrangement unwraps into n linear ones —
  the four-seat figure with its four unwrappings — so divide by n), the
  gap method cashed at round tables (alternation 4!·5!, no-two-women-together),
  together/never-together in the round (the 19! − 2·18! subtraction shape),
  the clockwise/anticlockwise honesty (garlands and necklaces: (n−1)!/2 —
  the observation-side argument; the no-same-neighbours census), and the
  small-case census as the circle's own guard (n = 3, 4 listed by hand).
- **6.5** — the selection count derived from the arrangement count (nPr =
  nCr · r! — the module's own two-step split: select, then arrange; ab and
  ba are ONE selection, TWO arrangements), the order divide installed as
  the first question of every problem, 6.2's algebra PROPERTIES re-read as
  selection facts (symmetry = the complement choose-reject split; Pascal =
  the (n+1)st object in-or-out split — our combinatorial proof beside
  6.2's algebraic one; the ratio law as how a row grows), the zero-or-more
  census 2^n (each object's own binary decision — the per-object census
  figure) and the at-least-one 2^n − 1 as the two hosted example-families,
  the at-least-one-of-each product chains ((2^4−1)(2^2−1) = 45-type on our
  own rosters; the 7·15·31 books-type), the 255-type equation hunts solved
  by the symmetry discipline, selection-then-arrangement words (nCr · r!),
  choosing from two groups (the m·n + p·q taxonomies).
- **6.6** — the puzzle room where every engine interlocks: selection from
  identical (zero-or-more from n identical = n + 1; the (p+1)(q+1) − 1
  mixed censuses; the divisor-count reread cross-referenced to ANS 4.3 —
  cited, never re-taught), division of distinct objects (the (m+n) into
  m, n two-group shape; three groups; the equal-size ÷k! honesty via the
  four-object table (C(4,2) = 6 divisions → 3 — the table figure); the
  general m!/(x₁! x₂! … x_k!) formula), distribution to persons (× the
  group order — groups vs persons, the classic trap), unfixed sizes
  (r^n as ch. 1's function census reread; the at-most-(n−1) subtraction),
  identical distributions (empty allowed C(n+r−1, r−1) via the
  partitions-in-gaps picture — the bars-and-gaps figure; not allowed
  C(n−1, r−1); both equation-reads x₁ + … + x_r = n priced), the
  integral-solutions fold (the series method — coefficient of p^n in the
  product of per-variable geometric strings; the (1−x)^{−n} coefficient law
  NAMED as ch. 7's any-index binomial doorstep, never cashed here), PIE
  built from the two-set Venn census (the general statement, the sign
  alternation) and cashed twice (the divisibility censuses; the onto
  formula r^n − C(r,1)(r−1)^n + … that the module itself deferred to
  PIE), derangements (D(n) = n!·Σ(−1)^k/k! by PIE on the
  correct-envelope events; D(4) = 9 listed by hand first; the
  exactly-k-correct mixed censuses), and the small-case census as the
  closing discipline — every puzzle opened at n = 2, 3 so a wrong model
  is caught before it is priced.
- **6.R** — the review that walks the chapter's DECISION MAP (selection or
  arrangement? identical or distinct? circle or line? groups or persons?
  empty allowed or not?), the master count table (n^r · nPr ·
  n!/(p!q!…) · (n−1)! · (n−1)!/2 · nCr · 2^n · 2^n − 1 ·
  C(n+r−1, r−1) · C(n−1, r−1) · m!/(x₁!…) · D(n) — one row per count, its
  question and its trap), the witnesses re-audited, the consolidated laws,
  the traps (a permutation used where a selection is due; the circle's ÷n
  forgotten; the necklace's ÷2 forgotten; equal-size groups not divided by
  k!; identical treated as distinct; the onto count's signs), the
  fifteen-question mixed bench, and the Probability handoff NAMED (the
  counted universe is the ground Probability inherits — the chapter
  summary's own promise, cashed as closing prose, never as a lesson).

## 4. Standing obligations for every lesson of this chapter

- **Prereq spine** (ids verified live, or pinned by §2 for this run's own
  siblings; never invent ids): 6.1 → `aa-relations-the-set-of-pairs-view`
  (ch. 1.1 — the outcome-set formalization's ground); 6.2 → 6.1 +
  `ans-fundamental-theorem-of-arithmetic` (the prime-factorization ground
  Legendre runs on); 6.3 → 6.1 + 6.2; 6.4 → 6.3; 6.5 → 6.2 + 6.3; 6.6 →
  6.5 + `ans-divisors-from-dna-divisor-counts` (ANS 4.3 — the divisor
  census the identical-selection fold rereads); 6.R cites its chapter
  siblings' six pinned ids. Prerequisites cite, never re-teach.
- **Prose cross-references** (cite, never re-teach): ANS 4.3
  `ans-divisors-from-dna-divisor-counts` (its divisor-counts +
  factorial-zeros instance — 6.2 cites the trailing-zeros special case, 6.6
  cites the τ(n) census); ch. 1's machines (6.6's r^n as the
  functions-count reread); ch. 7's any-index binomial (the (1−x)^{−n}
  door — NAMED forward, never cashed); the Combinatorics book (AA banks
  the fundamentals; its ch. 1 recalls them at depth — bijections,
  generating functions, PIE at full generality — named as the next rung,
  no lesson ids exist there yet, never invented); and THE PROBABILITY
  HANDOFF (the book positioning's own contract: "for the counting ground —
  Probability" — 6.6 and 6.R name the inheritor in prose; no Probability
  lesson ids are cited).
- **Verify-first**: each lesson's engine sections are grown green BEFORE
  the prose is declared done (the agents author engine + lesson together,
  the engine sweeping every number — every Illustration, quiz item,
  exercise solution and figure census; the assembled `verify-book4-ch06.ts`
  re-runs everything against the shipped chapter file). Section letters:
  A/B = 6.1, C/D = 6.2, E/F = 6.3, G/H = 6.4, I/J = 6.5, K/L = 6.6, M/N =
  6.R, Z = the chapter census (assembler's).
- **Figures**: the vivid palette table only (BOOK_FORMAT.md), original
  SVG, labels matching the prose; 2 per lesson is the house norm (the
  natural set: route tree, box-chain, circle shifts + unwrappings, gap
  marks round a table, partition bars in a row, the Venn pair, the
  equal-size table, the decision map).
- **Exam callouts**: label everything "exam-style" honestly — and this
  chapter's exam ground is REAL, unlike ch. 4's "no separate unit" note:
  the JEE (Main) 2026 mathematics unit list CARRIES permutations and
  combinations (the banked `jee-main-2026-syllabus` audit — unit 4), the
  school-canon ground is NCERT class 11 ch. 6 (the banked
  `ncert-math11-ch6-permutations-combinations`), the classic stretch is
  Hall & Knight ch. XI, and the module's own exercise typology (Single
  Correct / Multiple Correct / Linked Comprehension / Matrix Match /
  Numerical Value — the survey TOC's 7.36–7.44 band) is the typology our
  exercise sets mirror. Say all of this in the `exam` callouts; every item
  is our own design, labelled honestly, never lifted from any paper.
- **Sources**: every lesson's `sources` array cites banked keys only —
  `cengage-m2-07` (banked at close), `cengage-jee-style`,
  `ncert-math11-ch6-permutations-combinations`, `jee-main-2026-syllabus`,
  `hall-knight-higher-algebra`, `khattar-qa-4e`, `openstax-college-algebra`
  as each lesson's ground warrants.

## 5. The swarm architecture (this run's own record)

- **Wave 1 — six parallel lesson agents** (Task ids 6-a … 6-f), one per
  lesson 6.1–6.6. Each agent writes ONLY, under `scripts/aa-ch06-work/`:
  `l6-X.ts` (the complete `Lesson` object, the exact TS shapes of the
  ch-04.ts lessons: id/number/title/concepts/objectives/prerequisites/
  sources/blocks), `v6-X.ts` (the engine sections as exported functions
  over the lesson), a `run-6X.ts` runner, and the `e2e-aa-6X.page.js` +
  `e2e-aa-6X.sh` pair (the e2e-aa-41 pattern with its own pins). The
  engine must be green (`bun run scripts/aa-ch06-work/run-6X.ts`) before
  the lesson is declared done. Agents touch NOTHING else — no git, no
  shared ledgers, no dev server, no sibling files. Each agent reads
  ch-04.ts + BOOK_FORMAT.md + this plan as its contract, and consults the
  fold ledger for its OWN lesson (TOC_LESSON_GUIDE.md §2 pre-flight).
- **Wave 2 — the review agent** (Task id 6-g) authors 6.R against the six
  banked lesson parts + this plan.
- **Assembly (the orchestrator)** — `ch-06.ts` is assembled as ONE
  self-contained chapter file (the audit-content-completeness gate reads
  `^ch-\d+\.ts$` files only — the one-file-per-chapter layout of
  BOOK_FORMAT.md is preserved; the part files are the authoring workspace,
  not the ship), lessons in the §2 order. book.ts swaps its inline planned
  chapter-6 object for the `chapter06` import, plannedLessons empties,
  status → complete. `scripts/verify-book4-ch06.ts` is assembled from the
  section bodies + the census section Z, run green; the e2e pairs move to
  `scripts/` and are whitelisted in `.gitignore`; the six ledgers update
  (WORKLOG, RESUME_POINTER, PROGRESS, SOURCE_LOG — banking `cengage-m2-07`
  — and the house's remaining memory files; the fold ledger's hosts verify
  against real written titles); one commit closes the unit. Push rides the
  next PAT-bearing push.
- **Structural pins** (section B/D/F/H/J/L/N check every one): quiz exactly
  5 items with valid answer indices and full explains; exercises exactly 15
  in sets L1–L6 = 2/2/3/3/3/2, every question with a full steps-array
  solution; ≥ 2 figures; ≥ 3 derivations; ≥ 3 formula cards; ≥ 8 example
  (Illustration) blocks (6.6's fold load runs well past this floor); ≥ 6
  terms; word floor 4,500 (R: 4,000) by `countLessonWords`; sources keys
  all banked in SOURCE_LOG.md.
- **The raw-TeX repair list (binding — the 2026-11-18 swarm's lesson,
  enforced from the first draft this time)**: no `$math$` in derivation
  TITLES or step LABELS (they render PLAIN — words only); derivation
  `result` fields render through RichText — math `$`-delimited
  CLAUSE-WISE (short clauses, prose tails bare, `\qquad`/em-dash as
  break-point joins), never whole-wrapped unbreakable spans (the mobile
  390 px overflow class); no raw TeX in plain-rendered fields —
  concepts/objectives/callout + derivation titles/captions/formula note/
  SVG labels; `\tfrac` (never `\dfrac`) inline in roster fractions.
