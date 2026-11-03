# DETAILED LOG — everything written and worked on

> **Owner directive (2026-11-03):** *"maintain a log or json of everything you
> have written or worked on in detail."* This file is the human-readable
> record; **`WORK_INVENTORY.json`** in this directory is the machine-readable
> mirror, regenerated from the live chapter data by
> `bun run scripts/build_work_inventory.ts` (numbers are never hand-typed).
> **Both are updated at every unit ship and every platform change** — they are
> now part of MASTER_PLAN §2 step 7. Session-by-session narratives stay in
> `WORKLOG.md`; live pointers stay in `PROGRESS.json` / `RESUME_POINTER.json`.

Generated: 2026-11-03/04 (maintained through **cron run 18, Job 498279**:
FM lesson 4.3 "Comparing Fractions" authored in the Cengage voice +
solution chain, 5,168 words — the comparison engines collected and the
banked SSC MTS 2017 item settled; run 17: push-first (4 queued commits)
+ lesson 4.2; run 16: solutions restyled as the Cengage solution chain;
run 15: step numbers removed; run 14: Cengage book-style theory live
platform-wide; `WORK_INVENTORY.json` regenerated with every ship).

---

## 1. Project identity

| | |
|---|---|
| Project | **LockIn Library** — `github.com/Sachin0Amit/lock-in` |
| Mission | A full-stack educational platform where anyone can learn any major subject **from absolute zero to research level** through complete, professionally written digital textbooks — derivations, figures, worked examples, graded exercises; exam coverage as a by-product of understanding, never the boundary |
| Stack | Next.js 16 App Router (SSG) · TypeScript · Tailwind 4 · shadcn/ui · zustand (persist v2) · KaTeX · next-themes · framer-motion · cmdk · bun |
| Codebase | 82 tracked files under `src/`, **15,775 lines** — 2,864 reader-platform components · 5,445 shadcn/ui primitives · 6,685 content model + book data · 547 routes/pages · 254 hooks + lib |
| Authoring cadence | **One unit (chapter) of one subject at a time** — research → write → verify → ship → log; never batch-draft |

## 2. Standing rules (owner directives — never violate)

1. **One unit (chapter) of one subject at a time** (directive 2026-11-03):
   research → write → verify → ship → log, then the next unit.
2. **No daily-streak / gamified streak features, ever** — removed 2026-11-03
   by owner request; the site must never reintroduce them.
3. **Original content only** — reference books inform and verify concepts;
   protected expression is never reproduced or imitated.
4. **Storage law** — download only the current unit's references into
   `temporary-references/` (gitignored); delete working copies after the unit
   is verified; never touch Drive originals.
5. **Accuracy over volume** — no fabricated formulas, history, data or exam
   questions; exam-style items are labelled "exam-style".
6. **This log and `WORK_INVENTORY.json` are maintained at every unit ship**
   (the directive that created this file).

## 3. Timeline at a glance

| Date | Commit | What happened |
|---|---|---|
| 11-02 14:15 | `526add7` | Repository initialised |
| 11-02 15:09 | `8a37a0b` | Stack scaffold: Next.js 16 + TS + Tailwind 4 + shadcn/ui (62 primitives) + Prisma + ESLint |
| 11-02 15:31 | `1369d26` | **Platform base (v1)** + project-memory system + **lesson 1.1 authored** |
| 11-02 16:13 | `8f1e37c` | **Platform v2**: routed architecture, command palette, flashcards, glossary, reader upgrades, content model v2 |
| 11-02 16:22 | `74d0f93` | Owner directives: unit cadence docs, **streak removed**, push guide (pushed to origin) |
| 11-02 16:32 | `59b1ff9` | Memory: PAT push workflow recorded (last commit on origin/main) |
| 11-02 16:52 | `b4f461c` | **Website v3**: arrangement & visual overhaul |
| 11-03 01:08 | `a29d1b8` | **UNIT 1 SHIPPED** — Foundation Mathematics chapter 1 complete (lessons 1.2 + 1.3), Drive survey, mobile fixes |
| 11-03 | `a5c9c42` | **Detailed logging system** (this file + `WORK_INVENTORY.json` + tracked generator) per owner directive |
| 11-03 | `647f44c` | Owner preference protocol: Drive link persisted (never resend); PATs never stored |
| 11-03 (run 2) | — | **Sandbox recycle recovered**: git history restored from GitHub (public repo), deps + dev server rebuilt, Drive survey re-pulled (89 entries, Khattar id recovered) |
| 11-03 (run 2) | `64b938c` | **UNIT 2 OPENED: lesson 2.1 Addition and the Art of Carrying** — authored, 51 checks verified, E2E green, logged (pushed 11-03 run 3) |
| 11-03 (run 3) | `181f614` | **LESSON 2.2 Subtraction and Borrowing** — authored, 114 checks total, E2E green, figure-label defect found & fixed, logged + pushed with session PAT |
| 11-03 (run 4) | (ship) | **LESSON 2.3 Multiplication as Repeated Addition — and Beyond** — authored, 164 checks total, E2E green, logged; committed locally (no push — cron rule) |
| 11-03 (run 4) | `7d2cac6` | **Push protocol v2** — owner directive: PAT embedded in hourly cron job 498279; all pending commits pushed + verified (origin/main = 7d2cac6) |
| 11-03 (run 5) | — | **Second sandbox recycle recovered** — local .git rolled back to 647f44c while files survived; anonymous fetch + reset --mixed origin/main; Drive survey re-pulled (`scripts/rebuild_drive_survey.ts`); @types/bun restored |
| 11-03 (run 5) | (ship) | **LESSON 2.4 Division, Remainders and Why Zero Never Divides** — authored, 269 checks total, E2E green, logged; **first fully automated push** (protocol v2) |
| 11-03 (run 6) | — | Khattar QA 4e re-downloaded (file id now persisted in the upgraded survey); ch. 4 BODMAS section studied for lesson 2.5; CBSE-aligned BODMAS coverage web-checked |
| 11-03 (run 6) | (ship) | **UNIT 2 COMPLETE: lesson 2.5 Order of Operations and the Language of Expressions** — authored, 165 script checks (324 unit-cumulative), E2E green, unit-2 completion review run, logged; pushed (protocol v2) |
| 11-03 (run 7) | — | **Third sandbox recycle** — only the gitignored Drive survey lost; rebuilt in one command (`rebuild_drive_survey.ts`, ids persisted). Khattar QA 4e re-downloaded via the persisted id; ch. 1 "Numbers" divisibility/prime material studied; NCERT class-6 ch. 3 web-checked |
| 11-03 (run 7) | (ship) | **UNIT 3 OPENED: lesson 3.1 Divisibility and Its Tests** (ch-03.ts created) — authored, 96 pre-writing checks (`verify-unit-3.ts`, gitignore exception added FIRST), E2E green (quiz 5/5, KaTeX 370, flashcards 54), logged; pushed (protocol v2) |
| 11-03 (run 8) | (ship) | **LESSON 3.2 Prime Numbers and Factorisation** — authored, 152 pre-writing checks, E2E green incl. the 390px inline-math fix + INLINE-MATH RULE, fourth recycle rebuilt in one command, logged; pushed (protocol v2) |
| 11-03 (run 9) | — | **Fifth sandbox recycle** — only the gitignored Drive survey lost; rebuilt in one command (`rebuild_drive_survey.ts`, 89 entries, Khattar id intact). Khattar QA 4e re-downloaded via the persisted id; ch. 2 "H.C.F. and L.C.M. of Numbers" studied; NCERT §3.8 web-checked |
| 11-03 (run 9) | (ship) | **LESSON 3.3 Highest Common Factor** — authored, 192 pre-writing checks (sections V–Y, 40 new), Bézout/crossroads debt discharged, E2E green (quiz 5/5 live, flashcards 68, Venn figure verified, 390px exact-fit with ten solutions expanded), two over-escape hits fixed + head/header fix, logged; pushed (protocol v2) |
| 11-03 (figure-fix run) | `87f0f8a` | **Owner-reported figure defects fixed** — six overlapping/clipped SVG figures relaid out (37 patches); `scripts/audit-svg-overlaps.sh` + page-side getBBox-exact detector built and wired into the gates (15 figures re-audited, 0 issues; VLM PASS on all six); logged; pushed (protocol v2) |
| 11-03 (run 10) | (ship) | **LESSON 3.4 Lowest Common Multiple** — authored, 227 pre-writing checks (section Z, 35 new), timetable figure 0 audit issues first pass, E2E green (quiz 5/5 live, flashcards 75, 390px exact-fit with ten solutions expanded), exercises `sets` schema fix, logged; pushed (protocol v2) |
| 11-03 (run 11) | (ship) | **UNIT 3 COMPLETE: lesson 3.5 HCF, LCM and How They Relate** — authored, 260 pre-writing checks (section AA, 33 new), rectangle figure 0 audit issues FIRST pass, E2E green (quiz 5/5 live, flashcards 82, 390px exact-fit with eleven solutions expanded), unit-3 completion review run (BOOK_FORMAT checklist 7/7, exam-coverage audit 5/5, totals recompute 59,076 words), logged; pushed (protocol v2) as 8640085..342f629, remote HEAD verified |
| 11-03 (run 12, owner chat) | `8fd776e` | **Reader width + permalink fix (owner directive)** — lesson article 768→962px measured (container 7xl, article fills grid at xl, figures 3xl, TOC/glossary 5xl, chrome 7xl); visible URL chip (Link2 icon + /book/…/lesson/… text) removed from every lesson; all 12 lessons re-audited 0 SVG issues; audit default list extended with 3.4/3.5/4.1 |
| 11-03 (run 12, owner chat) | (ship) | **UNIT 4 OPENED: lesson 4.1 The Idea of a Fraction** (ch-04.ts created) — authored, 84 pre-writing checks (`verify-unit-4.ts`, gitignore exception added FIRST), both new figures 0 audit issues FIRST pass, E2E green (quiz 5/5 live, KaTeX 221, glossary 91 terms, 390px exact-fit with all ten solutions force-revealed), mediant theorem delivers 3.5's density promise (cross-multiplication licence on credit for 4.2/4.3), logged; pushed (protocol v2) |
| 11-03 (run 13, owner chat) | (ship) | **WORKED-SOLUTION FORMAT shipped** — handwritten-notes style: all 125 exercise solutions converted from prose paragraphs to numbered step lines + boxed Answer rows; platform (solution string\|string[] + answer, SolutionBody renderer) + migration script with per-solution token-preservation assertion (125/125); E2E green incl. 390px exact-fit with every solution expanded; BOOK_FORMAT contract updated; logged; pushed (protocol v2) |
| 11-03 (run 14, owner chat) | (ship) | **CENGAGE BOOK-STYLE THEORY shipped platform-wide** — Drive MATHS modules surveyed (5 modules, 42 chapter PDFs, ids persisted); Cengage M2/01 style-studied (OCR + vision; no content reproduced); reader reskinned print-style (green caps section heads, ILLUSTRATION pills + sage bands + Sol., green exercise/quiz bars, hairline print question rows, note-box callouts, roman (i)(ii)(iii) lists, green chapter-opener headers) — all 14 lessons restyled at once; BOOK_FORMAT/MASTER_PLAN/PROGRESS/RESUME_POINTER/SOURCE_LOG updated; E2E green (VLM fidelity 8.5/10); logged; pushed (protocol v2) |
| 11-03 (run 15, owner chat) | (ship) | **STEP NUMBERS REMOVED (owner directive "no need to show the steps number")** — circled digit badges deleted from all four worked-step renderers (Illustration Sol. steps, derivation rail, exercise solutions, algorithm lines); lead-in words carry the sequence; ILLUSTRATION n / Q-n / roman (i)(ii)(iii) / \tag{n} numbering deliberately kept; BOOK_FORMAT + types.ts contracts updated; E2E gains stepNumberBadges=0 check (KaTeX aria-hidden layer excluded); E2E green on 1.1/2.5/3.2/4.1 + VLM visual clean; logged; **push deferred — no PAT in this chat session** (local commit only; remote HEAD stays `d5a1b43` until the next cron run pushes) |
| 11-03 (run 16, owner chat) | (ship) | **CENGAGE-STYLE SOLUTIONS (owner directive "the solution should also be in cengage style")** — M2/01 solution pages re-studied (OCR + vision; surveys rebuilt after recycle; no content reproduced): Sol. pill INLINE on the first solution line, hanging-indent chain with a connective tag column (∴ for Hence/Thus/Therefore, or, Now,/So,/But/And; Case (i): bold), terminal ∴ answer line in green ink (literal Answer:/Hence: prefix stripped), boxed Answer rows retired — display-only parseStepTag, zero content edits, all 15 lessons at once; BOOK_FORMAT/types/SOURCE_LOG/E2E contracts updated (solutionChain check; KaTeX \therefore is mrel amsrm, not mord); E2E + force-expanded DOM + VLM all green; logged; **push deferred — no PAT in this chat session** (local ahead by three commits: run-15 ship + inventory + this) |
| 11-03 (run 17, cron Job 498279) | (push) | **PUSH FIRST per RESUME_POINTER** — all four queued run-15/16 commits pushed in one command via the one-time HTTPS URL: `d5a1b43..b788c06 HEAD -> main`; remote HEAD verified `b788c06` by one-time-URL ls-remote; origin/main tracking ref resynced; PAT never written to any file/config/log — the runs-15/16 push debt is cleared |
| 11-03 (run 17, cron Job 498279) | (ship) | **LESSON 4.2 Equivalent Fractions and Simplification** — authored NATIVELY in the Cengage voice + solution chain, 5,598 words: equivalence family + roman run + three-bar figure (465px invariant shading), multiplying rule PROVED by regrouping, additive-trap Caution ((n+k)/(d+k) = mediant with 1 dressed k/k — always strictly between), HCF simplification one-step (12/16→3/4, 84/126→2/3, 91/104→7/8 via Euclid), **cross-multiplication licence PAID IN FULL** (both = and < directions via the common bd-ruler; 18-piece ruler figure for 2/3 = 4/6 = 12/18; 4.1's 3/7<4/9 ⟺ 27<28 loan settled), raising to higher terms + 6-row registry, properties list, L6 proofs (lowest-terms uniqueness via Lesson 3.2's crossroads lemma; mediant closure of the family); 6 illustrations, 2 figures, 5-quiz, 12 exercises L1–L6 with terminal ∴ answers; verify-unit-4.ts 84→**148 checks** (sections L–R); E2E extended to 5 lessons — 6 Sol. pills ALL inline, stepNumberBadges 0, legacyAnswerBoxes 0, 18 KaTeX ∴ tags, KaTeX 263, quiz 5/5 live, 12 solutions expand, 390px exact-fit, zero console errors, VLM + screenshot review green; totals: **15 lessons / 70,678 words / 96 terms**; logged; commits push at the next cron run |
| 11-04 (run 18, cron Job 498279) | (ship) | **LESSON 4.3 Comparing Fractions** — authored in the Cengage voice + solution chain, 5,168 words: same-whole proviso (number-line frame), same-denominator + same-numerator rules (definition callouts with Thus-restatements; roman run; inversion-trap Caution 4/11 < 4/7; unit-fraction ladder), **cross-multiplication test wielded as a verdict machine** (3/4 vs 4/5 = 15 < 16 with the 20-ruler check; 7/12 vs 5/8 = 56 < 60 — 4.2's L5 debt PAID, gap 4/96 = 1/24 named), common-denominator method (24-ruler 14 vs 15 with the four-bar figure + highlighted extra cell), **the banked SSC MTS 2017 item SETTLED on the 165-ruler** (7/11 < 2/3 < 4/5, largest 4/5) + zoomed number-line figure, benchmark-1/2 method (2n > d), shared-numerator lists, completing-the-whole insight (7/8 vs 8/9 via 1/8 > 1/9; 9/10 vs 11/12 = 108 < 110), wholes-first rule (3 2/5 vs 3 3/8: 16 > 15; 136/40 > 135/40), six-row toolkit table + three-laws equation + common-denominator formula card; 8 illustrations, 2 figures (0 audit issues FIRST pass each), 6 new terms, 2 formula cards, 5-quiz (1/1/2/3/2), 12 exercises L1–L6 — L6 proves the same-numerator rule and the **mediant ordering** a/b < (a+c)/(b+d) < c/d from the licence; verify-unit-4.ts 148→**199 checks** (sections S–Z) ALL PASS pre-writing; E2E extended to 6 lessons — 8 Sol. pills ALL inline, stepNumberBadges 0, 24 KaTeX ∴ glyphs, KaTeX 177, quiz 5/5 live (B/B/C/D/C), 12 solutions expand, 390px exact-fit, zero console errors, VLM green; totals: **16 lessons / 75,846 words / 102 terms**; logged; pushed (protocol v2) |

## 4. Content written so far (the actual textbooks)

**Library plan:** 11 disciplines · **281 backlog titles** (SUBJECT_BACKLOG.md)
· promotion rule: a backlog book becomes real only after its research phase.
**Live today: 1 book — 3 chapters complete + chapter 4 open at 4.3 — 16
lessons, 75,846 words, 102 flashcard terms.**

### Foundation Mathematics — mathematics shelf · in-progress (1 of 11 chapters)

*From counting to the doorstep of algebra* · Absolute beginner → Secondary
school · accent amber · cover auto-generated.

#### Chapter 1: Numbers and Place Value — **COMPLETE (unit 1, shipped 2026-11-03)**

Chapter totals: **9,709 words · 15 quiz items · 25 graded exercises, every one
with a full worked solution · 16 defined terms (flashcard deck) · 3 original
SVG figures · 3 derivations · 3 formula cards · 1 algorithm block · 6 worked
examples · 4 tables · 11 callouts · 18 paragraphs · 15 headings.**

| Lesson | Words | Read | Quiz | Exercises (L→count) | Terms | Sources | Authored |
|---|---|---|---|---|---|---|---|
| **1.1 Numbers, Digits and Place Value** | 2,852 | 15 min | 5 | L1×4, L2×3, L4×2 | 5 | — (original) | 11-02 · `1369d26` |
| **1.2 Comparing and Ordering Numbers** | 3,421 | 17 min | 5 | L1×2, L2×2, L4×2, L5×1, L6×1 | 6 | khattar-qa-4e · ncert-math6-ch1 | 11-03 · `a29d1b8` |
| **1.3 Rounding and Estimating** | 3,436 | 17 min | 5 | L1×2, L2×2, L4×2, L5×1, L6×1 | 5 | khattar-qa-4e · ncert-math6-ch1 | 11-03 · `a29d1b8` |

**Lesson 1.1 — Numbers, Digits and Place Value.** Authored with the platform
base as the pipeline-validation lesson. Opens with tally marks and the Ishango
bone; fixes the number/numeral/digit vocabulary; place value and expanded
form; zero as a placeholder (Hindu–Arabic history callout: al-Khwarizmi ~825
CE, Fibonacci's Liber Abaci 1202); the number line; international vs Indian
numeration up to 10¹¹ (crore/lakh vs million/billion); exam-relevance callout.
Accuracy pass fixed 4 issues (numeral paragraph, 10¹¹ kharab column,
modular-arithmetic wording, digit-reversal formula 999(a−d)+90(b−c) verified
by substitution).

**Lesson 1.2 — Comparing and Ordering Numbers.** Digit-count rule;
seat-by-seat comparison; full **domination-bound derivation** (geometric
series → 10ʲ − 1 < 10ʲ); place-value comparison figure (4,589 vs 4,598,
deciding tens seat tinted); greatest/smallest digit construction;
digit-rotation with its mod-9 fingerprint; Roman-numeral historical callout;
formula card; 5 quiz items; L1–L6 exercises (L6: lexicographic total order +
mod-9 rearrangement proof).

**Lesson 1.3 — Rounding and Estimating.** Midpoint figure (43/47 on the
40–50 line); **rounding algorithm block** (first content usage of the block
type); close-numbers subtraction trap (4,851 − 4,829); ceiling-vs-nearest (the
bus problem); **error-bound derivation** k × ½·10ⁿ with the tight example
1,200→1,400; banker's rounding / IEEE 754 insight + error-by-digit table
(11 columns); 2 formula cards; 5 quiz items; L1–L6 exercises.

**Verification (unit gates, all passed 2026-11-03):** 66 arithmetic checks
recomputed by script *before* writing (incl. half-up vs half-even error sums
+5 vs 0 at digit level) · `verify-unit-1.ts` ALL CHECKS PASS (ids unique,
quiz indices valid, solutions complete, prerequisites resolve, sources
resolve) · lint + `tsc --noEmit` clean · all routes 200 · browser E2E: KaTeX
154 nodes (1.2) / 114 (1.3), figures + algorithm + 11-column table render,
quiz scored 5/5 with feedback, flashcards a 16-term deck, glossary lists all
new terms + formula cards, TOC shows chapter 1 complete with chapter 2
planned, "Next up" works · mobile 390px exactly no overflow · zero console
errors.

#### Chapter 2: The Four Operations — **COMPLETE (unit 2, 2026-11-03; 5 of 5 lessons — unit-2 completion review passed)**

**Lesson 2.1 — Addition and the Art of Carrying** (id `fm-addition-carrying`,
authored 11-03, commit `64b938c`) — **3,952 words · 17 min read · 6 terms ·
5 quiz items · 8 exercises (L1×2, L2×2, L4×2, L5×1, L6×1) · 2 original SVG
figures (number-line commutativity; carry seat-map for 4,589+2,764) · 1
derivation (the carry bound: 9+9+1 = 19, induction on columns) · 1 sum-bound
equation + 2 formula cards · 1 algorithm block (column addition) · 3 worked
examples · 1 property table · 4 callouts (warn traps, historical Gauss 5,050,
exam, insight) · sources: khattar-qa-4e, ncert-math6-ch2 · prerequisites:
lesson 1.1.** Contents: counting-on vs counting-all; the four laws of
addition (closure, commutative, associative, identity) with verified
instances; column addition algorithm and why right-alignment + units-first;
why the carry can never exceed 1 (proved); when a sum grows a new seat
(999+1); the mod-9 digit-sum checksum — with an honest blind-spot analysis
(transpositions and ±9 slips pass: 7,335 and 7,362 both fingerprint-match);
compensation (8,999+437); Gauss pairing. **Verified:** 51 arithmetic checks
by `scripts/verify-unit-2.ts` ALL PASS before writing (caught one digital-root
convention bug pre-ship); lint + tsc clean repo-wide; routes 200; browser E2E
— KaTeX 118 nodes, quiz 5/5 "perfect", flashcards 16 → 22, glossary + formula
sheet updated, mobile 390px exact-fit, zero console errors.

**Lesson 2.2 — Subtraction and Borrowing** (id `fm-subtraction-borrowing`,
authored 11-03, hourly-run-3 ship commit) — **4,611 words · 23 min read · 6
terms · 5 quiz items · 8 exercises (L1×2, L2×2, L4×2, L5×1, L6×1) · 2
original SVG figures (number line with the 3−7 off-the-edge panel; borrow
seat-map for 4,589−2,764 with struck digits + correction digits 4→3 / 5→15
+ "1 thousand = 10 hundreds" chip) · 1 derivation (the borrow bound:
d+10 ≥ 10 > 9 ≥ bottom, why two would be absurd) · 1 seat-exchange equation
+ 2 formula cards (inverse check = total certification; digit-sum mod-9 for
subtraction) · 1 algorithm block (column subtraction, decomposition method,
zero ripple, leading-zero drop) · 2 worked examples · 1 laws-retried table
(DEAD/DEAD/DEAD/HALF with counterexamples) · 3 callouts (traps, historical
equal-additions, exam) · sources: khattar-qa-4e, ncert-math6-ch2 ·
prerequisites: lesson 2.1.** Contents: subtraction as the inverse of
addition — the missing-addend definition — plus its three faces (take-away,
missing addend, comparison); leftward hops on the number line with the
3−7 walk off the edge (closure dies; Chapter 7 preview); the four laws
retried under subtraction (closure, commutativity, associativity dead;
identity half-alive) and what each death forces onto the layout; column
subtraction by decomposition — worked 4,589−2,764 where ONE borrow undoes
2.1's THREE carries; the borrow-bound proof; the seat-exchange identity
1·10^(k+1) = 10·10^k (carrying and borrowing, opposite directions); the
1,000−1 zero-ripple dissolve as the exact mirror of 999+1; four borrowing
traps each detonated by the inverse check (reflex 2,225 → 4,989 ≠ 4,589;
no-reduce 2,825 → 5,589); checking by running addition backwards — the
inverse check is total, the digit-sum check inherits its ±9/transposition
blind spots; compensation sign-flipped (4,312−2,998 = 1,314); the
shopkeeper's counting-up route (36+200+1,500+89 = 1,825); equal-additions
vs decomposition bookkeeping (42−17 both ways = 25); the complement habit
for zero-ripple exam items (10,000−4,567 = 5,432+1); L6: the nines
complement b* = 10ⁿ−1−b with end-around carry and the negative-result
signal (2,764−4,589 → 8,174, no leading carry → −1,825). **Verified:** 63
new arithmetic checks (114 total) in `scripts/verify-unit-2.ts` ALL PASS
before writing; lint + tsc clean repo-wide; routes 200; browser E2E —
KaTeX 140 nodes, quiz 5/5 "perfect", flashcards 22 → 28, glossary + formula
sheet list the new terms/cards, figures geometry-verified via DOM, mobile
390px exact-fit, dollarInSvg=0, zero console errors.

**Lesson 2.3 — Multiplication as Repeated Addition — and Beyond** (id
`fm-multiplication-repeated-addition`, authored 11-03, hourly-run-4 ship
commit) — **4,028 words · 21 min read · 6 terms · 5 quiz items · 8
exercises (L1×2, L2×2, L4×2, L5×1, L6×1) · 2 original SVG figures
(number line: 4×6 as four equal jumps vs 6×4 as six, both landing on 24;
partial-products seat map for 247×36 with shift annotation and tinted
trailing 0) · 2 derivations (partial-product carry bound ≤ 8, fixed point
9×9+8 = 89, attained by 999×9 = 8,991; product digit bound
k+m−1 ≤ digits ≤ k+m) · 1 partial-product identity equation + 2 formula
cards (product digit bound; digit-sum mod-9 for multiplication) · 1
algorithm block (column multiplication) · 1 worked example · 1 laws table
(closure/commutative/associative/identity-1/distributive with verified
instances incl. 12×(5+4) = 108) · 2 callouts (historical Russian-peasant
binary; exam) · sources: khattar-qa-4e, ncert-math6-ch2 · prerequisites:
lesson 2.1.** Contents: multiplication as compressed addition for equal
groups; the two readings of 4×6 and the times-table symmetry they explain;
the zero property derived from distributivity (a×0 = a×0 + a×0 ⇒ 0);
column multiplication as distributivity laid out in rows — worked 247×36
= 1,482 + 7,410 = 8,892 with the shift explained as the ×10 it is; the
honest checksum section (the 2,223 misalignment product PASSES the
fingerprint because it is a genuine product of 247 — multiply the
guards); speed techniques (×9/×11 ten-routes, 198×7 = 1,386,
24×25 = 600); Russian-peasant multiplication with the binary proof
(247 = 11110111₂, kept rows sum to the product). **Verified:** 50 new
arithmetic checks (164 total) in `scripts/verify-unit-2.ts` ALL PASS
before writing; lint + tsc clean repo-wide; routes 200; browser E2E —
KaTeX 149 nodes, quiz 5/5 "perfect", flashcards 28 → 34, glossary +
formula sheet list the new entries, figures geometry-verified via DOM,
mobile 390px exact-fit, dollarInSvg=0, zero console errors.

**Lesson 2.4 — Division, Remainders and Why Zero Never Divides** (id
`fm-division-remainders-zero`, authored 11-03, hourly-run-5 ship commit) —
**4,693 words · 23 min read · 6 terms · 5 quiz items · 8 exercises (L1×2,
L2×2, L4×2, L5×1, L6×1) · 2 original SVG figures (number line: 24÷6 as
four backward jumps landing on 0 vs 25÷6 landing on 1, the remainder stub;
long-division seat map of 8,892 ÷ 36 with brought-down digits
dashed-circled and quotient digits above their seats) · 3 derivations
(the two-case ÷0 proof — undefined vs indeterminate; the remainder bound
0 ≤ r < b; the quotient digit bound k−m ≤ digits ≤ k−m+1) · 1
division-algorithm equation + 3 formula cards (division check; quotient
size bound; digit-sum mod-9 for division) · 1 algorithm block (long
division, multiply–subtract–bring-down) · 1 worked example (8,892 ÷ 36 =
247 — the un-building of 2.3's product) · 1 laws table (closure fails,
commutative fails, associative fails, one-sided identity, ÷0 bricked
shut) · 2 callouts (historical obelus Rahn 1659 + Euclid Book VII; exam)
· sources: khattar-qa-4e, ncert-math6-ch2 · prerequisites: lesson 2.3.**
Contents: the herder's flock undone — sharing (partitive) vs grouping
(quotative) readings; division as repeated subtraction / equal jumps
backwards; the division-algorithm treaty a = q·b + r with
4,589 = 764 × 6 + 5 (2.2's minuend returns); the laws retried one last
time (25 ÷ 4 = 6 r 1 kills closure; 8 ÷ 4 ≠ 4 ÷ 8; (8 ÷ 4) ÷ 2 ≠
8 ÷ (4 ÷ 2); a ÷ 1 one-sided); the two-case ÷0 proof (7 ÷ 0 no candidate
survives — undefined; 0 ÷ 0 every candidate survives — indeterminate;
0 ÷ b = 0 legal, the hole sits in the divisor seat); long division
left-to-right as the chapter's mirror layout with place-value seat
scaling (the 72 under the leading 88 is really 72 hundreds = 7,200); the
remainder bound as the third guard rail (carry ≤ 1, partial-product
carry ≤ 8, remainder < b) with the ÷10ⁿ corollary (remainder = last n
digits: 4,589 ÷ 10 = 458 r 9, ÷ 100 = 45 r 89); the quotient size bound
(division shaves digits where multiplication pooled them; 1,000 ÷ 9 =
111 r 1 echoes 2.1's 999 + 1); the fingerprint read backwards S(a) ≡
S(q)·S(b) + r (dropped remainders now caught: 8 × 6 = 48 → 3 ≠ 8;
transpositions still pass the fingerprint but the rebuild catches them:
746 × 6 + 5 = 4,481 ≠ 4,589); speed routes (÷5 double-then-÷10: 340 → 68;
÷4/÷8 halving: 248 ÷ 4 = 62, 496 ÷ 8 = 62) + digit-sum screens (8,892 ÷ 9
= 988 exactly); L5 remainder-bound proof + uniqueness via
(q−q′)·b = r′−r with |r′−r| < b; L6 the closed-door essay (the check
equation goes silent exactly when b = 0). **Verified:** 105 new
arithmetic checks (269 total) in `scripts/verify-unit-2.ts` ALL PASS
before writing — the script was recreated after the second recycle ate
the uncommitted run-2 copy, now with exhaustive range loops (check
equation + remainder bound for ALL a ≤ 200 × b ≤ 12; quotient digit
bound for ALL 4-digit dividends × 1–2-digit divisors) and committed;
lint + tsc clean repo-wide (@types/bun restored); routes 200; browser
E2E — KaTeX 148 nodes, quiz 5/5 "perfect", flashcards 34 → 40, glossary
+ formula sheet list the 3 new cards, figures DOM-verified (23 + 32
labels, ÷ glyphs render), mobile 390px exact-fit, dollarInSvg=0, zero
console errors.

**Lesson 2.5 — Order of Operations and the Language of Expressions** (id
`fm-order-of-operations`, authored 11-03, hourly-run-6 ship commit) —
**4,166 words · 21 min read · 7 terms (expression, value, equation,
precedence, bracket, vinculum, BODMAS) · 5 quiz items · 8 exercises (L1×2,
L2×2, L4×2, L5×1, L6×1) · 1 original SVG figure (expression trees: treaty
tree of 8 + 2 × 5 evaluating to 18 vs bracketed tree of (8 + 2) × 5
evaluating to 50; root operations tinted) · 1 derivation (why × precedes
+ — the compression argument, ending in the notation defending its own
compression) · 2 equations (the two readings; the full ladder bar → ( ) →
{ } → [ ] → of → ×/÷ L→R → +/− L→R) · 1 formula card (the order of
operations) · 1 algorithm block (the full BODMAS procedure: bracket
peeling, "of" first claim, two left-to-right sweeps) · 2 worked examples
(the ladder 120 − [2 × (14 − 2 × 5) + {18 ÷ 3 of 2}] = 109 with the
÷-first slip audit (100 — a nine-error); the estimation gate in action:
7,218 ÷ 9 + 98 × 63 estimated 6,800, exact 6,976, fingerprint crossing
the ranks) · 1 table (four wrong roads: 18/50, 4/1, 24/10, 3/12) · 4
callouts (definition of the treaty; insight: natural vs agreed clauses
with Lennes 1917 + Cajori honesty; warn: the mnemonic's two traps; exam)
+ historical callout (PEMDAS/BIDMAS/BEDMAS/BODMAS lineages, the 1917
American Mathematical Monthly dispute, the never-settled
implicit-multiplication edge) · sources: khattar-qa-4e, ncert-math6-ch2 ·
prerequisites: lessons 1.3, 2.1–2.4.**
Contents: the two-clerks opening (one ledger line, two flawless
computations, a gap of 32); expressions named vs equations claimed (true
or false; the check equations of 2.1–2.4 revisited as verified
equations); the treaty as ranks with a reading direction — never a
letter-by-letter queue; division and subtraction inheriting their twins'
ranks; the bracket ladder with the vinculum's strength shown (bar over
3+4: × 2 gives 14 vs 3 + 4 × 2 = 11); the "of" operator (exam
convention ranks it above ÷/×; 18 ÷ 3 of 2 = 3, not 12); the estimation
gate from lesson 1.3 taking the referee's chair; L6 the treaty-maker's
problem (+ and × alone are bracket-independent by associativity —
exhaustively checked over 0..9 — mixed expressions are not, so a
convention is unavoidable; forced clauses vs signed clauses). **Verified:**
60 new arithmetic checks in `scripts/verify-unit-2.ts` (165 in the
post-recycle script; 324 unit-cumulative) ALL PASS before writing; lint
clean; tsc FULLY clean repo-wide including scripts/ (literal-narrowing
TS2367s fixed; rebuild_drive_survey.ts marked as module); routes 200;
browser E2E — KaTeX 113 nodes, all 6 section headings, 4-row table,
quiz 5/5 "perfect" (intended options clicked live), flashcards 40 → 47,
glossary + formula sheet list the new entries, expression-tree figure
screenshot-verified, mobile 390px exact-fit, dollarInSvg=0, zero
console/page errors.

**Unit-2 completion review (run 6, per RESUME_POINTER):** BOOK_FORMAT
verification checklist — all seven boxes pass (math recomputed by script
pre-writing; figure labels match prose terminology; quiz answer indices
verified live in the browser; exercise solutions complete and
numerically verified; lesson ids globally unique; lint clean + chapter
renders in the reader; logs updated). Exam-coverage audit — every lesson
2.1–2.5 carries an exam callout; unit-2 topics mapped: four operations +
laws (NCERT class-6 canon), rapid-arithmetic techniques and BODMAS
simplification (Khattar ch. 4 audience: bank/SSC/Railway staples),
order-of-operations + expression/equation vocabulary (CUET/NTSE items);
no real past-paper questions reproduced (exam-style labelling rule
honoured). Chapter totals recomputed from live data by
`build_work_inventory.ts`: chapter 2 = 21,450 words across 5 lessons;
book = 8 lessons, 31,159 words, 47 terms, 40 quiz items, 65 exercise
questions.

#### Chapter 3: Factors, Multiples and Primes — **OPEN (unit 3, started 2026-11-03; 4 of 5 lessons)**

**Lesson 3.1 — Divisibility and Its Tests** (id `fm-divisibility-and-its-tests`,
authored 11-03, hourly-run-7 ship commit; ch-03.ts created) — **6,477 words ·
32 min read · 7 terms (Divisible, Factor/divisor, Multiple, Digit sum,
Alternating digit sum, Coprime factors, Divisibility test) · 5 quiz items
(answers deliberately spread 2/3/1/2/3) · 8 exercises (L1×2, L2×2, L4×2,
L5×1, L6×1) · 1 original SVG figure (the screening desk: seven screens
cheapest-first — last digit / last two / last three / digit sum / alternating
sum / coprime split / double-and-subtract — divisor labels tinted, plain text
only) · 4 derivations (the tail theorem n ≡ last-k-digits mod 2^k·5^k via
10^k = 2^k×5^k; the digit-sum theorem n ≡ S(n) mod 9 and mod 3 via
10^k = 99…9+1, walked through 4,731; the alternating theorem n ≡ d₀ − d₁ +…
mod 11 via 10 ≡ −1; the 7-gadget equivalence 7 | n ⟺ 7 | (a − 2b) via
2n = 21a − (a − 2b) with gcd(2,7) = 1) · 1 coprime-split derivation (12 = 3×4
works; 2×6 over-admits — 18 passes 2 and 6 but fails 12) · 4 formula cards
(divisibility treaty d | n ⟺ r = 0; tail test; digit-sum test; alternating
test) · 1 algorithm block (screening order = cost order) · 2 worked examples
(the full screen of 4,896 — nine verdicts incl. remainder-1 mod 11 matching
the alternating sum and the 7-chain ending −3; find-the-digit 27*4 → {2,5,8}
and 7,2*8 → 1) · 1 master test table (divisors 2–12, verified instances) · 5
callouts (definition; warn — the digit-sum impersonation 921; warn — four
screening traps; historical — Pascal 1654 *De numeris multiplicibus* as the
one criterion + Fibonacci 1202 casting out nines; exam — bank/SSC/Railway/
NTSE/CUET/CBSE mapping) · sources: khattar-qa-4e, ncert-math6-ch3 ·
prerequisites: lessons 1.1, 2.1, 2.4.** Contents: the confectioner opening
(2,340 sweets ÷ 9 jars answered in five seconds by digit sum 9 vs a full
minute of long division; the exam-hall number 4,896 ÷ 12); the treaty from
Lesson 2.4 (d | n ⟺ remainder 0, with the remainder bound making it crisp);
factors and multiples as the two ends of one multiplication (48's ten factors
in five pairs; multiples of 7 below 100 = fourteen; factors finite, multiples
infinite; the 0/1 edges with Lesson 2.4's blessing); Family 1 tail tests
(5,836 = 25×233 + 11 — the tail even reports the failure size; 48,216 =
8×6,027 = 125×385 + 91; 13,675 = 25×547; Lesson 2.4's ÷10ⁿ corollary
honoured as the engine); Family 2 digit-sum tests (casting out nines; the
screen reports remainders — 8,241 ÷ 9 → r 6; the 921/87,543 impersonation
trap); Family 3 the alternating test (2,728 = 11×248; 1,012 = 11×92;
remainder-reading 91,083 → 3 and 43,291: −5 → 6; units-first sign
convention); Family 4 compound tests (2,376 for 6 and 12; 4,788 = 18×266;
4,965 = 15×331; 9,888 = 24×412; 12,144 = 88×138); Family 5 the stubborn 7
(powers of 10 mod 7 cycle 1,3,2,6,4,5 — no tail/digit/alternating test;
chains 2,401 = 7⁴ → 238 → 7 and 3,192 → 315 → 21 → 0; honesty para — each
step multiplies the residue by −2, so the chain preserves the verdict, not
the remainder); the master table; the screening algorithm; the worked 4,896
screen (nine verdicts, zero long divisions); L6 the a±kb family (13:
a + 4b with 2,795 → 299 → 65 → 26 fixed; 19: a + 2b with 1,919 → 209 → 38 →
19; 17: a − 5b with 867 → 51 → 0; ending in Pascal's criterion — every d
coprime to 10 admits a digit test). Closing para bridges to 3.2 primes (the
tests are a story about how a number relates to 10). **Verified:** 96
arithmetic checks by `scripts/verify-unit-3.ts` ALL PASS before writing
(gitignore exception added FIRST — the /scripts/* trap; the script covers
every prose/figure/table/quiz/exercise number incl. the L6 chains; both
verify scripts made modules after cross-file tsc collisions);
verify-unit-2.ts still passes 165/165; lint clean; tsc fully clean
repo-wide; routes 200; browser E2E — KaTeX 370 nodes, dollarInSvg=0, quiz
answered live with the intended options → "You scored 5/5 · perfect", best
score persisted, flashcards 47 → 54, glossary + formula sheet list the new
entries, screening-desk figure screenshot-verified, mobile 390px exact-fit,
zero console/page errors.

**Lesson 3.2 — Prime Numbers and Factorisation** (id
`fm-prime-numbers-factorisation`, authored 11-03, hourly-run-8 ship commit;
appended to ch-03.ts) — **6,089 words · 7 terms (Prime number, Composite
number, Sieve of Eratosthenes, Trial division, Prime factorisation,
Fundamental theorem of arithmetic, Factor tree) · 5 quiz items (answers
spread 2/1/2/0/3) · 10 exercises (L1×2, L2×2, L3×1, L4×2, L5×2, L6×1) · 1
original SVG figure (two factor trees for 60 — tree A splits 6 × 10, tree B
splits 4 × 15, both converge on the leaves 2 · 2 · 3 · 5; prime leaves
tinted, plain text only) · 3 derivations (the square-root licence — factor
pairs straddle √n, 7² = 49 > 48 closes 3.1's pair walk, primes-only
refinement; uniqueness of prime factorisation — existence by shrink, the
near-miss 2×6 = 3×4 = 12 pushed down to 2×2×3 both ways, Euclid's
crossroads lemma as engine, coprime idea promoted, honest Bézout debt →
Lesson 3.3; the divisor-count formula d(n) = (a₁+1)(a₂+1)⋯(aₖ+1) — every
divisor is a choice of exponents, choices multiply) · 2 equations (the 60
regrouping chain 6×10 → 2×3×2×5 → 2²×3×5; the exam-hall 4,896 strip chain
2×2,448 → 2⁵×153, promoted to display math by the run-8 INLINE-MATH fix) ·
3 formula cards (trial-division licence n prime ⟺ no prime p ≤ √n divides
n; the FTA n = p₁^a₁⋯pₖ^aₖ unique with 1 = the empty product; divisor count
from the atoms) · 1 algorithm block (the sieve of Eratosthenes up to 100 —
workers 2, 3, 5, 7, crossing starts at p², stop when 11² = 121 > 100, 25
survivors) · 1 worked example (certifying 397 prime — eight primes to 19,
every remainder quoted: 7×56+5, alt-sum 1, 13×30+7, 17×23+6, 19×20+17) · 1
gallery table (divisor counts 48/60/96/720/2,401/2,025/4,896 →
10/12/12/30/5/15/36, each row cross-checked) · 6 callouts (definition — the
two-factor treaty; theorem — the FTA with the 1-exclusion load-bearing
padding argument; definition — prime factorisation; historical —
Eratosthenes c. 240 BCE + Euclid VII.30/IX.14 + Gauss 1801; exam —
25-below-100, largest-two-digit 97, false-prime traps 91/51/87/221,
divisor-count items, HCF/LCM engine preview) · sources: khattar-qa-4e,
ncert-math6-ch3 · prerequisites: lessons 3.1, 1.1.** Contents: mosaic-tile
opening (48's five rectangles vs 47's bare line; the 3.1 screens certify
47; 7² = 49 overshoots foreshadows the licence); the two-factor treaty
(exactly two vs three-or-more; 1 has one factor, 0 infinitely many — both
outside); 2 the only even prime (n = 2 × (n÷2) one-liner); composites hide
primes (4 = 2×2, 6 = 2×3, 9 = 3×3); the sieve + harvest (25 primes; 97 the
last — 98 = 2×49, 99 = 9×11; thinning: 10 below 30 vs 3 in the 80s/90s —
83, 89, 97; six twin pairs below 50); the licence retells 3.1 (48's pairs
close at 6×8 since √48 sits between 6 and 7; 47 needs only 2, 3, 5); the
false primes (91 = 7×13 classic; 221 survives 2/3/5/7/11 until the licence
forces 13; 97 certified in four moves); pushing 60 down via two trees →
same atoms (the figure); termination (parts strictly shrink ≥ 2); the FTA
callout (Gauss 1801; if 1 were prime: 60 = 1×60 = 1×1×60 … uniqueness
dies — 3.1's trap callout becomes load-bearing); the exam-hall number
returns atomised (4,896 = 2⁵×3²×17, rebuild 32×153; 2,401 = 7⁴ prime power
with factors {1, 7, 49, 343, 2,401}); the master key (divisors of 4,896 =
choices 6×3×2 = 36; 3.1's ten factors of 48 explained as (4+1)(1+1);
prime p → 2; prime power 7⁴ → 5). Closing para promises 3.3 (shared primes
at the smaller powers → HCF; all primes at the larger powers → LCM).
**Verified:** 55 new checks → `scripts/verify-unit-3.ts` **152/152 ALL
PASS before writing** (sections N–U: helpers divisorsOf/isPrime/primesUpTo/
primeFactors; the 25-prime sieve list equality; all square windows
36<48,47<49 · 81<91<100 · 361<397<400 · 196<221<225 · 100<113<121; the
397 verdict battery; divisor counts enumerated from the atoms incl. all 36
of 4,896 and 15 of 2,025; exercise + quiz numbers; one script-side fix —
R8's window comparison initially written backwards); verify-unit-2.ts
still 165/165; lint clean; tsc clean repo-wide; routes 200; browser E2E —
KaTeX 316 nodes (493 with solutions expanded), dollarInSvg=0, quiz answered
live with the intended options → "You scored 5/5 · perfect", flashcards
54 → 61, zero console errors, and **mobile 390px exact-fit after a caught
defect**: a 573px inline-KaTeX chain escaped the page (inline math cannot
wrap and has no scroll guard, unlike the math-display wrapper) — fixed by
promoting the 4,896 chain to a display equation, splitting the 25-prime
list and the FTA padding chain into separate inline maths, and shortening
the L6 solution chain; re-verified with all ten solutions expanded
(scrollWidth 390, escapers empty); quiz re-run 5/5. New standing rule:
INLINE-MATH RULE (no inline $…$ chain over ~35 chars).

**Lesson 3.3 — Highest Common Factor** (id
`fm-highest-common-factor`, authored 11-03, hourly-run-9 ship commit;
appended to ch-03.ts) — **5,564 words · 7 terms (Common factor, Highest
common factor, Coprime, Euclidean algorithm, Back-substitution, Bézout's
identity, Coprime split) · 5 quiz items (answers spread 1/3/2/0/1) · 10
exercises (L1×2, L2×2, L3×1, L4×2, L5×2, L6×1) · 1 original SVG figure
(Venn territories for 96 vs 720 — left-only 2, overlap 2·2·2·2·3 = 48 =
HCF, right-only 3 × 5, bottom annotations overlap = HCF = 48 and
everything = 2 × 48 × 15 = 1,440 = LCM preview; plain labels) · 3
derivations (the smaller-power rule — divisor caps from the FTA,
independence makes the maximum easy, every common divisor divides the
HCF; the swap lemma — common divisors preserved both directions across
a = q·b + r, termination via 3.1's r < b, HCF = last nonzero remainder;
back-substitution → Bézout — 144 = 720 − 576 = 7 × 720 − 4,896, every
remainder is a difference of multiples) · 2 equations (the min-exponent
formula ∏ p^min(α,β); the seed gcd(84, 126) = 2·3·7 = 42) · 4 formula
cards (HCF from the atoms; the Euclidean ladder gcd(a,b) = r_k where
r_{k+1} = 0; the remainder patterns gcd(x−r₁, y−r₂, z−r₃)) · 2 worked
examples (the ladder for 4,896 & 720 — three rows to 144, atoms
cross-check; three cords 1,152/768/1,248 → 96 cm by ladder folding and
atoms, 12/8/13 pieces) · 2 tables (choosing the route — listing/atoms/
ladder with costs and instances; the three greatest-number patterns —
exact divide, same remainder known → HCF of leftovers 689/1,124/1,706 →
36, same remainder unknown → HCF of differences 152/277/427 → 25) · 7
callouts (definition — HCF with GCD/GCM aliases and edge behaviours;
warn — the larger-power slip 288 and the one-divides-the-other
shortcut 34; definition — coprime; insight — consecutive numbers are
always coprime; theorem — Bézout's identity; theorem — the coprime split
generalised, 2,376 = 12 × 198 instance and 18 counter; historical —
Euclid VII.1–2, al-Khwārizmī, Bachet 1624, Bézout 1779; exam —
SSC/bank/Railway staples, product-rule promise banked for 3.5) · the
crossroads-lemma derivation (five steps: gcd(p,a) = 1 → Bézout → ×b →
p divides both terms → p | b) DISCHARGING 3.2's proof debt · chapter-arc
para (every theorem in the chapter hangs from 2.4's division algorithm) ·
sources: khattar-qa-4e, ncert-math6-ch3 · prerequisites: lessons 3.1,
3.2, 2.4.** Contents: craft-studio cords opening (84 & 126 cm — 3.2's L3
seed made physical; the two-debts framing); what "common" means; Route 1
listing (48 & 60 → 12; the common-factors-are-divisors-of-the-HCF
observation; why listing dies for 4,896/720); Route 2 atoms (96 & 720 →
48 — 3.2's opener returns as the HCF of the gallery pair; 2,025 & 4,896
→ 9; the seed equation); coprime section (sharing not size — 1,024 vs
2,025; consecutive pairs; 3.1's 3×4-vs-2×6 trap named at last, theorem
teased); Route 3 ladder (the machine needs only the division algorithm;
swap lemma; termination; the exam-hall pair in three rows; which route
when); the debt (back-substitution; Bézout; crossroads discharged; the
arc completed; coprime split generalised); the exam patterns (three
costumes; why subtracting remainders works; the unknown-s cancellation).
Closing para hands to 3.4 (the union territory 1,440 named the LCM;
bells/buses/timetables promised).
**Verified:** 40 new checks (sections V–Y: helpers gcd/gcd3) →
`scripts/verify-unit-3.ts` **192/192 ALL PASS before writing** (the seed
42 by atoms and ladder; full 48/60 factor lists + common set + HCF 12;
min-exponent route with exhaustive common-divisor enumeration; coprime
pairs and edges; ladders with every quotient incl. the 8-row 2,025/4,896
one; swap-lemma divisor-set equality; Bézout arithmetic; coprime-split
instances 2,376 = 12 × 198 and the 18 counter; remainder patterns with
prime quotients 19/31/47; the six HCF-12/sum-156 pairs with an
exhaustive no-seventh-pair check; Venn products 48 × 1,440 = 96 × 720);
verify-unit-2.ts still 165/165; lint clean; tsc clean (after the
`header` → `head` TS2561 fix and the over-escape normalisation — two
authoring edits had written \\\\ for \\ and \\\' for \',
caught by tsc at ch-03.ts:1294 and fixed by a python normaliser, then
verified by bun string evaluation: zero double-backslash fields, zero
tabs); routes 200 (unknown id 404); browser E2E — KaTeX 392 expanded
(257 collapsed), dollarInSvg=0, quiz answered live with the intended
options (1/3/2/0/1) → "You scored 5/5 · perfect" with the best score
persisted on the book page, flashcards 61 → 68, glossary lists all 7
new terms, Venn figure screenshot-verified, zero console errors, and
**mobile 390px exact-fit with ALL TEN solutions expanded** (scrollWidth
390; three wide display blocks scroll inside the math-display
overflow-x:auto guard; max SVG width 324).

**Lesson 3.4 — Lowest Common Multiple** (id `fm-lowest-common-multiple`,
authored 11-03, hourly-run-10 ship commit; appended to ch-03.ts) — **5,014
words · 7 terms (Common multiple, Lowest common multiple, Shared primes at
the larger powers, Common-division ladder, Coprime extreme, Divisibility
extreme, Overlap and union territories) · 5 quiz items (answers spread
2/3/1/2/3) · 11 exercises (L1×2, L2×2, L3×2, L4×2, L5×2, L6×1) · 1
original SVG figure (the two-lane timetable: bus A every 12 min, bus B
every 18 min, rings at the shared departures 0/36/72/108, split dashed
connectors so no line crosses a ring digit, plain labels; 0 audit issues
on the FIRST pass of scripts/audit-svg-overlaps.sh) · 2 derivations (the
timetable structure theorem — common multiples are exactly the multiples
of the LCM: every multiple of L is common by L = a·s; every common
multiple m gives r = m − qL a smaller common multiple unless r = 0, via
Lesson 2.4's algorithm and differences of multiples; why the larger power
— common clears max(α, β), the larger-power product clears every bar,
nothing smaller misses a demand) · 1 theorem callout (the larger-power
rule ∏ p^max(α,β) beside 3.3's min rule; Venn pair 96 & 720 →
2⁵ × 3² × 5 = 1,440 = 2 × 48 × 15) · 3 formula cards (the atoms route
∏ p^max; the ladder product = every left divisor × the surviving line;
the remainder patterns LCM side — LCM + r for a same remainder, LCM − d
for equal deficiencies x−r₁ = y−r₂ = z−r₃, floor(N/LCM) for counting) ·
3 worked examples (the listing route 16 & 24 → 48 with the multiples-of-48
shape; the ladder 12/15/20/54 → 540 row by row — 2, 2, then the forced
switch to 3, then 5, survivor 9; the cords flipped 1,152/768/1,248 →
29,952 cm ≈ 300 m of ribbon, quotients 26/39/24) · 2 warn/theorem-adjacent
callouts (the smaller-power slip 48 = HCF not LCM + the dropped-5 slip
288; the divide-back guard 1,440 = 15 × 96 = 2 × 720) · the four
least-number patterns table (36/45/63/80 → 5,040; 12/16/18 r 5 →
144 + 5 = 149 with the k = 0 quotient-0 honesty note; 9/10/15 leaving
4/5/10 → 90 − 5 = 85; up to 300 by 5 & 7 → 8) · Metonic-cycle historical
callout (19 × 365.2422 days vs 235 × 29.5306, agreeing within ~2 hours;
luni-solar calendars live on the common multiple) · exam callout (bells
2,4,6,8,10 → every 120 min, 12 times after the start + 1; product-rule
promise banked for 3.5) · closing para pointing at the product rule and
pair reconstruction. Exercise highlights: the smallest 4-digit number
divisible by 18/24/32 (1,152 = 4 × 288), the 51 deficiency twin (12/15/20
leaving 3/6/11), and the pair-hunter's problem — seven pairs with LCM 18
((1,18), (2,9), (2,18), (3,18), (6,9), (6,18), (9,18)), completeness by
divisor enumeration (fifteen divisor pairs, eight losers named with their
LCMs). 35 new checks (section Z, helpers lcm2/lcm3) → verify-unit-3.ts
**227 checks ALL PASS pre-writing**; verify-unit-2 still 165/165. E2E:
6 routes 200; KaTeX 249 nodes; dollarInSvg = 0; quiz answered live with
the intended options (2/3/1/2/3) → "You scored 5/5 · perfect"; flashcards
68 → 75; glossary lists all 7 new terms + 3/3 formula cards; zero console
errors; **mobile 390px exact-fit with ALL ELEVEN solutions expanded**
(overflowX = 0; the patterns table scrolls inside its wrapper); timetable
figure 0 audit issues first pass + screenshot-verified. Fix-ups en route:
exercises block schema wants `sets` (types.ts), not `intro`/`levels`; Z22
lane arrays typed `number[]`. Khattar ch. 2 LCM sections studied via the
persisted-id re-download; NCERT Ex 3.7 web-checked; working copies
deleted after E2E.

**Lesson 3.5 — HCF, LCM and How They Relate** (id `fm-hcf-lcm-and-how-they-relate`,
authored 11-03, hourly-run-11 ship commit; appended to ch-03.ts) — **4,773
words · 7 terms (Product rule (HCF–LCM), Coprime leftovers, Coprime split,
Pair reconstruction, Feasibility check, Rectangle identity, Two-number
treaty) · 5 quiz items (answers spread 2/1/2/3/1) · 11 exercises (L1×2,
L2×2, L3×2, L4×2, L5×2, L6×1) · 1 original SVG figure (one rectangle, two
squares: a 6 × 4 rectangle tiled by six 2 × 2 squares — side gcd = 2 — and
the same rectangle packing a 12 × 12 square in six copies — side lcm = 12;
middle identity 2 × 12 = 24 = 6 × 4; plain labels; 0 audit issues FIRST
pass of scripts/audit-svg-overlaps.sh) · 2 derivations (why the products
agree — a = O·A, b = O·B, gcd = O, lcm = O·A·B, and O²AB = O·(OAB): the
product double-counts the overlap and the HCF is that second copy; the
coprime-split engine — pairs with gcd h and lcm l are exactly (h·m, h·n)
with m·n = l ÷ h and gcd(m, n) = 1) · 2 theorem callouts (the product rule
with the buses 6 × 36 = 216 = 12 × 18 and the Venn pair 48 × 1,440 = 69,120
= 96 × 720; the feasibility check — a fingerprint (h, l) is worn by some
pair exactly when h | l, with the pair (h, l) itself as free witness) · 1
formula card (the product rule) · 3 worked examples (one member given:
63/1,260/315 → 252 with both demands verified; the richer fingerprint
HCF 12 LCM 720 → four pairs (12,720), (36,240), (48,180), (60,144) via the
coprime splits (1,60), (3,20), (4,15), (5,12) of 60) · 2 warn callouts (the
guard: the HCF divides every member — "HCF 40, one number 315" is a blunder
since 40 × 7 + 35 = 315; the classic slip: forgetting coprimality —
splitting 60 as (2,30) gives (24,360) with gcd 24 and lcm 360, both demands
broken; (6,10) → (72,120) fails identically) · the united pattern table
(3.3's three greatest-number rows + 3.4's least-number rows + the counting
row + the new product-rule row 63/1,260/315 → 252) · Gauss 1801 historical
callout (Disquisitiones Arithmeticae at age 24; the division algorithm as
foundation; the gcd fixed as a first-class object; congruence notation) ·
exam callout (missing member 12/720/48 → 180; product given 16/6,400 → 400
with the pair forced to (16,400); feasibility 24 ∤ 200 — the NCERT genre) ·
two-seats insight callout (the triple 12/18/24: gcd 6, lcm 72,
6 × 72 = 432 ≠ 5,184 = 12 × 18 × 24, yet every pair inside the triple obeys
the rule) · chapter-arc closing para (everything hangs from 2.4's division
algorithm; next unit fractions). Exercise highlights: rebuild HCF 10 LCM 90
→ the unique pair (10,90) via the prime-power leftover 9; HCF 16 product
6,400 → LCM 400 with the pair forced; the 8 × 12 rectangle identity
(4 × 24 = 96 with tile counts 2 × 3 and 3 × 2); the feasibility trio
(9,45) yes / (9,50) no / (9,72) yes with witnesses; and the fingerprint
collector's problem — every pair with HCF 14 LCM 1,260 ((14,1,260),
(28,630), (70,252), (126,140)), completeness by the block argument (three
prime-power blocks of 90 = 2 × 3² × 5 → 2³ ordered → 4 unordered splits).
33 new checks (section AA) → verify-unit-3.ts **260 checks ALL PASS
pre-writing**; verify-unit-2 still 165/165. E2E: 6 routes 200; KaTeX 165
nodes; dollarInSvg = 0; quiz answered live with the intended options
(2/1/2/3/1) → "You scored 5/5 · perfect"; flashcards 75 → 82; glossary
lists all 7 new terms + the product-rule formula card; zero console errors;
**mobile 390px exact-fit with ALL ELEVEN solutions expanded** (overflowX =
0; max SVG width 324). UNIT-3 COMPLETION REVIEW run in the same ship:
BOOK_FORMAT verification checklist 7/7 (math pre-verified by script;
figure labels match prose; quiz answer indices verified live; exercise
solutions complete + verified; lesson ids globally unique — 0 duplicates;
lint + render clean; logs updated), exam-coverage audit (all five lessons
3.1–3.5 carry an exam callout; topics mapped: divisibility, primes/FTA,
HCF/LCM three routes, product rule → NCERT class-6 canon + Khattar ch. 2
patterns; no real past-paper questions reproduced), totals recomputed by
build_work_inventory.ts (book = 13 lessons / 59,076 words / 82 terms /
65 quiz items / 115 exercise questions; ch. 3 = 27,917 words). Khattar
ch. 2 product-rule sections studied (Illustration 14) via the persisted-id
re-download; NCERT Ex 3.7 feasibility genre web-checked; working copies
deleted after E2E.

**UNIT 4 OPENED (run 12, owner chat directive):** lesson 4.1 "The Idea
of a Fraction" — 6,054 words, 84 pre-writing checks (verify-unit-4.ts),
both figures 0 audit issues first pass, E2E green; the part–whole and
division faces, improper↔mixed via the division algorithm, Egyptian unit
fractions with the web-verified Rhind callout, and the mediant theorem
delivering 3.5's density promise (licence on credit). Totals recomputed
by build_work_inventory.ts (book = **14 lessons / 65,130 words / 91
terms / 70 quiz items / 125 exercise questions**; ch. 4 in-progress at
1/5). Khattar re-downloaded (no dedicated fractions chapter — ch. 1 exam
items mined, ch. 2 HCF/LCM-of-fractions rules banked for 4.5); NCERT
class-6 ch. 7 web-checked; working copies deleted after E2E.

**LESSON 4.2 (run 17, cron Job 498279 — push-first run):** "Equivalent
Fractions and Simplification" — 5,598 words, the FIRST lesson authored
natively in the Cengage voice + solution chain (the exemplar for 4.3
onward). Formal definition callouts ("… are said to be equivalent if …",
"… is said to be in its lowest terms …") each with a symbolic
Thus-restatement; "For example," roman (i)–(iv) runs; Illustration
titles as crisp problem statements; solutions as connective-led step
chains with terminal ∴ answers. Content: the equivalence family
(3/4 = 6/8 = 9/12 = 12/16 = 15/20) + three-bar figure with the 465px
invariant shading; the multiplying rule n/d = nk/dk PROVED by the
regrouping derivation; the additive-trap Caution ((n+k)/(d+k) = the
mediant of n/d and the whole 1 dressed as k/k — always strictly between,
so equal additions never stand still: 15 ≠ 16, 888 ≠ 900); HCF
simplification — the ch. 3 atoms returning (12/16 → 3/4 desk-pair;
84/126 → 2/3 with HCF 42 both routes; 91/104 → 7/8 with the hidden atom
13 via Euclid's algorithm); the **cross-multiplication licence PAID IN
FULL** — the derivation raises a/b by k = d and c/d by k = b onto the
common bd-ruler (both applications of the just-proved equivalence rule)
where comparison is whole-number counting, settling BOTH directions
(a/b = c/d ⟺ ad = bc AND a/b < c/d ⟺ ad < bc), with the 18-piece ruler
figure for 2/3 = 4/6 = 12/18 (ad = bc = 12) and the 64-piece arithmetic
check for the desk-pair; 4.1's mediant loan (3/7 < 4/9 ⟺ 27 < 28)
explicitly settled; raising to higher terms (multiple-of-d rule) with
the 3/4 + 5/6 → forty-eighths Illustration and a 6-row registry table;
properties list with verified instances (3/4 of 20 = 15 = 12/16 of 20);
summary equation; Note + Exam-corner callouts; 5-quiz; 12 exercises
L1–L6 as Cengage chains — L6 proves the UNIQUENESS of the lowest-terms
name (licence + Lesson 3.2's crossroads lemma) and the MEDIANT CLOSURE
of the equivalence family ((a+ka)/(b+kb) = a/b raised by 1+k). All three
4.1 ties honoured. verify-unit-4.ts extended 84 → **148 checks**
(sections L–R); E2E extended to 5 lessons; quiz 5/5 live; totals: book =
**15 lessons / 70,678 words / 96 terms / 75 quiz items / 137 exercise
questions** (ch. 4 in-progress at 2/5). No new downloads (references
already logged).

**WORKED-SOLUTION FORMAT (run 13, owner chat directive with a
handwritten-notes photo as the style reference):** exercise solutions now
render like handwritten worked solutions — numbered step lines with words
("Seat the digits right to left…", "Expanded form: $…$", "Thousands seat:
3."), never prose paragraphs. Platform: `ExerciseQuestion.solution`
accepts `string | string[]` + optional `answer` (boxed row); SolutionBody
renderer with numbered chips; search + word-counter handle both shapes.
Content: all 125 solutions migrated by
`scripts/convert-solutions-to-steps.py` with a strict per-solution
`\w+` token-multiset preservation assertion (125/125 — no content lost or
altered; 5 boxed answers extracted). E2E: 1.1 = 36 steps / 31 KaTeX
inside steps; 3.1 = 47 steps + the boxed Factors answer; 2.5/3.5/4.1 =
53/60/60 steps; 390px exact-fit with every solution expanded; zero
console errors. Totals recomputed: **14 lessons / 65,080 words** (−50 =
dropped standalone ';' tokens the old counter counted as words) / 91
terms / 70 quiz / 125 exercises. BOOK_FORMAT now mandates the format for
all future lessons.

**LESSON 4.3 (run 18, cron Job 498279):** "Comparing Fractions" — 5,168
words, the second lesson authored natively in the Cengage voice + solution
chain. Content: the same-whole proviso (the number line makes "larger"
exactly "further right"); the two easy cases as formal definition callouts
with symbolic Thus-restatements (same denominator → count;
same numerator → invert) plus the roman (i)–(iii) run and the
inversion-trap Caution (4/11 < 4/7 despite 11 > 7; 1/100 the smallest
despite 100 the biggest) and the unit-fraction ladder; the
cross-multiplication test WIELDED (formula card; "verdict machine, not a
transformation" fine print) with Illustrations 3/4 vs 4/5 (15 < 16 + the
20-ruler check + the additive-trap fraction placed above) and 7/12 vs 5/8
(56 < 60 — Lesson 4.2's exercise L5 debt paid with the gap named
4/96 = 1/24); the common-denominator method (any legal ruler; LCM
smallest — Lesson 3.4; product always) with the four-bar figure: 12-cut
and 8-cut rulers, then both re-measured on 24-cell rulers (14/24 vs
15/24) with the single extra twenty-fourth highlighted between dashed
boundaries; the ordering section — the trio banked in 4.1's exam callout
(SSC Multi-Tasking Staff 2017, via Khattar's ch. 1 drill set) settled on
the 165-ruler (110, 132, 105 → 7/11 < 2/3 < 4/5, largest 4/5) with the
zoomed [1/2, 1] number-line figure (marks at 239.09/276.67/442px,
labels alternating above/below), the benchmark-1/2 method (2n > d with
zero products) sorting 2/5, 3/7, 5/9 down to one cross-test, and
shared-numerator lists read backwards; anchors 0, 1/2, 1 (proper <
improper across 1 with no computation) + the completing-the-whole
insight (7/8 vs 8/9 via the missing pieces 1/8 > 1/9, cross-checked
63 < 64) + the 9/10 vs 11/12 Illustration (108 < 110); mixed numbers by
the wholes-first rule (4 1/8 > 3 9/10 instantly; 3 2/5 vs 3 3/8 goes to
the fractions 16 > 15, confirmed 136/40 > 135/40); the comparison
toolkit harvest (six-row engines table, the three-laws summary equation,
the common-denominator formula card R = LCM or product, the Note
planting 4.4 via the gap 15/24 − 14/24 = 1/24). 8 Illustrations as
Sol.-inline Cengage chains, 6 new terms (Cross-multiplication test,
Common denominator, Benchmark, Completing the whole, Ascending order,
Wholes-first rule), 2 formula cards, 2 figures, 5-quiz (answers spread
1/1/2/3/2), 12 exercises L1–L6 with terminal ∴ answers — L6 proves the
SAME-NUMERATOR RULE from the licence (cancel a > 0) and the MEDIANT
ORDERING a/b < (a+c)/(b+d) < c/d in two lines (both halves reduce to
ad < bc — 4.1's density machine re-derived from the comparison engine;
instance 2/5 < 5/12 < 3/7 via 24 < 25 and 35 < 36). All ties honoured:
4.2's closing "borrowed time" para cashed, 4.2's L5 exercise answered,
4.1's exam-corner promise paid. verify-unit-4.ts extended 148 → 199
checks (sections S–Z) ALL PASS pre-writing. E2E extended to 6 lessons:
8 ILLUSTRATION pills + 8 Sol. pills ALL inline, 33 step rows,
stepNumberBadges = 0, legacyAnswerBoxes = 0, 24 KaTeX ∴ glyphs, KaTeX
177 nodes, dollarInSvg = 0, quiz answered live (B/B/C/D/C) → "You scored
5/5 · perfect", 12 solutions expand, 390px exact-fit (wide display
equations scroll inside the .math-display guard), zero console errors,
both figures 0 audit issues FIRST pass, VLM green (one JPEG misread of
the terminal ∴ colour DOM-verified book-green). Totals: book = **16
lessons / 75,846 words / 102 terms** (ch. 4 in-progress at 3/5). No new
downloads (references already logged).

#### Chapters 4–11 — planned (not yet written)

| # | Chapter | Planned lessons |
|---|---|---|
| 2 | The Four Operations — **COMPLETE** | ~~2.1 Addition and the Art of Carrying~~ **WRITTEN** · ~~2.2 Subtraction and Borrowing~~ **WRITTEN** · ~~2.3 Multiplication as Repeated Addition — and Beyond~~ **WRITTEN** · ~~2.4 Division, Remainders and Why Zero Never Divides~~ **WRITTEN** · ~~Order of Operations and the Language of Expressions~~ **WRITTEN** |
| 3 | Factors, Multiples and Primes — **COMPLETE** | ~~Divisibility and Its Tests~~ **WRITTEN** · ~~Prime Numbers and Factorisation~~ **WRITTEN** · ~~Highest Common Factor~~ **WRITTEN** · ~~LCM~~ **WRITTEN** · ~~HCF, LCM and How They Relate~~ **WRITTEN** |
| 4 | Fractions — **IN PROGRESS (3/5)** | ~~The Idea of a Fraction~~ **WRITTEN** · ~~Equivalent Fractions and Simplification~~ **WRITTEN** · ~~Comparing Fractions~~ **WRITTEN** · Adding/Subtracting · Multiplying/Dividing |
| 5 | Decimals and Percents | Decimal Places · Decimals↔Fractions · Operating on Decimals · Percent · Change, Discounts, Simple Interest |
| 6 | Ratio, Rate and Proportion | Ratio · Rates and Unit Rates · Proportion · Direct/Inverse Variation · Scaling |
| 7 | Integers | Negative Numbers · Adding/Subtracting · Multiplying + Sign Rules · Absolute Value as Distance |
| 8 | Geometry Foundations | Points/Lines/Planes · Angles · Parallel Lines and Transversals · Triangles and Angle Sum · Perimeter and Area |
| 9 | Measurement | Units as Agreements · Metric System · Converting Without Tables · Precision vs Accuracy |
| 10 | Data and Graphs | Collecting/Tallying · Bar/Line/Pie Charts · Reading Graphs Critically · Mean, Median, Mode |
| 11 | Patterns and the Doorstep of Algebra | Patterns and Rules · From Patterns to Formulas · A Letter for the Unknown |

## 5. Engineering work (platform history)

### Milestones

1. **Repository initialised** (`526add7`, 11-02 14:15) — sandbox scaffold.
2. **Stack scaffolded** (`8a37a0b`, 11-02 15:09) — Next.js 16 App Router,
   TypeScript, Tailwind 4, shadcn/ui (62 primitives), Prisma schema, ESLint,
   bun. +8,239 lines.
3. **Platform base v1** (`1369d26`, 11-02 15:31) — content model with 14
   block types + honest word counter (`types.ts`); 11-discipline taxonomy;
   reader UI (home, book, lesson: KaTeX, interactive quiz, bookmark/complete,
   font scale, dark mode, zustand-persisted progress); Foundation Mathematics
   full 11-chapter TOC; lesson 1.1; 8-file project-memory system.
4. **Platform v2** (`8f1e37c`, 11-02 16:13) — SSG routes with shareable deep
   links + JSON-LD (`/`, book, lesson, revise, glossary, 404); command
   palette (Ctrl/Cmd+K) with token-aware full-text search over
   books/lessons/glossary (cmdk filter off, custom scoring); reader: scrollspy
   "On this page", reading-progress bar, keyboard shortcuts (←/→, B, C),
   prerequisites chips, sources footer; quiz best-score persistence + retake;
   flashcard revision (3D flip, know/again, per-term memory, modes);
   A–Z glossary + auto formula sheet; content model v2 (prerequisites,
   sources, formula + algorithm blocks). Old client-state shell deleted.
5. **Owner directives** (`74d0f93`, 11-02 16:22) — unit-by-unit cadence
   (MASTER_PLAN §2 rewritten, §6 gates per unit); **daily streak removed**
   (header flame badge, desk pill + stat, computeStreak/dayKey helpers
   deleted; desk stat → "Terms mastered"); README "Pushing to GitHub"
   fine-grained-PAT guide. Pushed to origin/main.
6. **PAT workflow recorded** (`59b1ff9`, 11-02 16:32) — pushes use a fresh
   owner-supplied PAT, revoked after use.
7. **Website v3** (`b4f461c`, 11-02 16:52) — home: two-column hero with
   living book-shelf visual (real + ghost spines, one leaning), contextual
   CTAs (Start reading / Continue / Next), inline stat strip, compact "Your
   desk", roadmap chips; book page: breadcrumb, contextual primary button,
   TOC per-chapter counters, "Next up" highlight, quiz best-score chips;
   reader breadcrumb + two-column footer; shared `bits.tsx`
   (DISCIPLINE_ICONS + StatusBadge); `paper-dots` + `spine-label` CSS;
   dev-tools indicator disabled. VLM visual review 8–9/10 per page, dark-mode
   spine contrast fixed.
8. **Unit 1 shipped** (`a29d1b8`, 11-03 01:08) — chapter 1 complete (above) +
   Drive survey + two platform fixes shipped with the unit: mobile 390px
   horizontal overflow (implicit grid track forced max-content → base
   `grid-cols-1` on the three responsive grids) and concept-badge wrapping
   (`whitespace-nowrap` → wrap).
9. **Sandbox recycle recovered** (11-03, hourly run 2) — the platform
   re-bootstrapped the workspace (fresh scaffold git repo with no remote,
   full project intact as untracked files, dev server dead, gitignored
   artifacts wiped). Recovery: anonymous fetch from the public GitHub repo
   restored the full history (`git reset --mixed origin/main`, remote +
   upstream reconfigured); recycle's chmod noise silenced
   (`core.filemode=false` — content byte-identical); resurrected v1
   `app-shell.tsx` removed; `bun install`; dev server restarted; Drive
   survey rebuilt from embeddedfolderview (89 entries, Khattar id
   recovered); tsconfig excludes sandbox dirs; `@types/bun` added.
10. **Unit 2 opened — lesson 2.1 shipped** (11-03, hourly run 2) — see the
    chapter 2 section above; the detailed-logging pipeline ran end-to-end
    (inventory regenerated, DETAILED_LOG + WORKLOG + PROGRESS +
    RESUME_POINTER + SOURCE_LOG updated).
11. **Lesson 2.2 shipped + figure-label rule** (11-03, hourly run 3) — see
    the chapter 2 section above. Also this run: the pending lesson-2.1
    commit `64b938c` and the new ship commit were pushed with the owner's
    session PAT (one-time HTTPS push URLs; token never stored). **Defect
    found & fixed:** lesson 2.1's number-line figure rendered literal
    `$4+3$`/`$3+4$` because figure SVGs are injected raw
    (`dangerouslySetInnerHTML`) — KaTeX `$…$` never runs inside SVG text;
    the page-wide KaTeX-node count had masked it. Fixed to plain labels;
    standing rule recorded (plain labels only in SVG, E2E asserts
    `dollarInSvg=0`).
12. **Lesson 2.3 shipped** (11-03, hourly run 4) — see the chapter 2
    section above. Pipeline fixes this run: 31 double-escaped apostrophes
    in the lesson edit caught by tsc (TS1005) and bulk-corrected; a
    malformed dev-generated `.next/dev/types/validator.ts` removed and
    regenerated (new standing note: delete + curl any route to fix).
    Committed locally — **not pushed** (cron rule: runs never push; the
    owner pastes a fresh PAT when they want commits released).
13. **Lesson 2.4 shipped** (11-03, hourly run 5) — see the chapter 2
    section above. Pipeline notes this run: second sandbox recycle
    recovered via the recorded protocol (anonymous fetch +
    `git reset --mixed origin/main`; only casualties were untracked
    working files — the run-2 verify script and the Drive survey — both
    rebuilt; `scripts/rebuild_drive_survey.ts` added to the recycle kit);
    `@types/bun` restored; `scripts/verify-unit-2.ts` committed this time
    (never untracked again); stray resurrected v1 `app-shell.tsx` removed.
    **Push protocol v2 activated** (owner directive): the PAT now lives in
    the hourly cron job payload (job 498279) and pushes happen
    automatically after gates — pending `f9d22d5` and the ship commit
    pushed and verified (remote HEAD = local HEAD via ls-remote).
14. **UNIT 2 COMPLETE — lesson 2.5 shipped + completion review** (11-03,
    hourly run 6) — see the chapter 2 section above. This run: Khattar QA
    4e re-downloaded for the BODMAS study (the survey upgrade now persists
    per-file Drive ids, so future re-downloads are one step); 60 new
    pre-writing checks (165 script / 324 unit-cumulative); tsc made FULLY
    clean repo-wide including scripts/; the unit-2 completion review per
    RESUME_POINTER (BOOK_FORMAT checklist, exam-coverage audit, chapter
    totals recompute); push per protocol v2.

### Verification log (quality gates actually passed)

| What | Date | Gates passed |
|---|---|---|
| Platform base + lesson 1.1 | 11-02 | lint · tsc · E2E (55 KaTeX nodes, quiz, persistence, dark mode, no overflow 390/1280px, no console errors) · 4 accuracy fixes |
| Platform v2 | 11-02 | lint · routes 200/404 · E2E (palette search, quiz 5/5 + persistence, keyboard, flashcards, scrollspy, hydration-clean) · VLM review |
| Streak removal + docs | 11-03 | lint · tsc (SearchHit union fix) · E2E (zero "streak" occurrences, desk stats correct) |
| Site v3 | 11-03 | lint · tsc · routes · E2E (hero, spines, TOC Next-up, palette) · VLM rounds 8–9/10 · zero console errors |
| Unit 1 (FM ch. 1) | 11-03 | 66 pre-write arithmetic checks · verify-unit-1.ts ALL PASS · lint · tsc · routes · E2E (KaTeX 154/114, quiz 5/5, 16 flashcards, glossary) · mobile 390px exact · zero console errors |
| Unit 2 (FM ch. 2, lesson 2.1) | 11-03 | 51 pre-write arithmetic checks (verify-unit-2.ts ALL PASS, incl. digital-root convention fix) · lint · tsc repo-wide · routes 200 · E2E (KaTeX 118, quiz 5/5 perfect, flashcards 22, glossary + formula sheet, mobile exact-fit) · zero console errors |
| Unit 2 (FM ch. 2, lesson 2.2) | 11-03 | 63 new pre-write arithmetic checks (114 total, ALL PASS) · lint · tsc repo-wide (verify-script literal-narrowing fix) · routes 200 (dev restart) · E2E (KaTeX 140, figures geometry-verified via DOM, quiz 5/5 perfect, flashcards 28, glossary + formula sheet, mobile exact-fit scrollW=390, dollarInSvg=0) · zero console errors |
| Unit 2 (FM ch. 2, lesson 2.3) | 11-03 | 50 new pre-write arithmetic checks (164 total, ALL PASS) · lint · tsc repo-wide (31 escape fixes, 2 narrowing fixes, validator regeneration) · routes 200 (dev restart) · E2E (KaTeX 149, figures geometry-verified, quiz 5/5 perfect, flashcards 34, glossary + formula sheet, mobile exact-fit scrollW=390, dollarInSvg=0) · zero console errors |
| Unit 2 (FM ch. 2, lesson 2.4) | 11-03 | 105 new pre-write arithmetic checks (269 total, ALL PASS; exhaustive range loops) · lint · tsc repo-wide (@types/bun restored) · routes 200 · E2E (KaTeX 148, figures DOM-verified, quiz 5/5 perfect, flashcards 40, glossary + formula sheet, mobile exact-fit scrollW=390, dollarInSvg=0) · zero console errors |
| Unit 2 (FM ch. 2, lesson 2.5) + completion review | 11-03 | 60 new pre-write arithmetic checks (165 script / 324 unit-cumulative, ALL PASS) · lint · tsc FULLY clean repo-wide incl. scripts/ (module marker + 2 narrowing fixes) · routes 200 · E2E (KaTeX 113, 6 headings, 4-row table, quiz 5/5 perfect with intended options clicked live, flashcards 47, glossary + formula sheet updated, expression-tree figure screenshot-verified, mobile exact-fit scrollW=390, dollarInSvg=0) · zero console/page errors · BOOK_FORMAT checklist 7/7 · exam-coverage audit · totals recomputed |
| Unit 4 (FM ch. 4, lesson 4.3) | 11-04 | 51 new pre-write arithmetic checks (199 total, sections S–Z, ALL PASS before writing) · verify-unit-2 165 + verify-unit-3 260 regressions green · lint · tsc clean · routes 200 + unknown 404 · E2E on 6 lessons (4.3: 8 caps headings, 8 ILLUSTRATION pills, 8 inline Sol. pills, 24 KaTeX ∴, stepNumberBadges 0, legacyAnswerBoxes 0, quiz 5/5 live B/B/C/D/C, 12 solutions expand, KaTeX 177, dollarInSvg 0) · both figures 0 audit issues FIRST pass · mobile 390px exact-fit (wide display math inside the .math-display guard) · zero console errors · VLM green on 5 screenshots (one JPEG misread DOM-verified book-green) |

## 6. Research & references

### Google Drive collection (owner-supplied 2026-11-03)

Link-shared folder "books"
(`drive.google.com/drive/folders/1NI-VN0d6bUt_wciV6k0UCLN8qiqoCRO1`), works
without login. Surveyed 2026-11-03 by headless browser (virtualized grid
scrolled to exhaustion): **85 root files, ~2.9 GB, plus 4 subfolders** —
MATHS (M1–M5 JEE module PDFs: Trigonometry, Algebra, Coordinate Geometry,
Calculus, 3D Geometry), CHEMISTRY, PHYSICS, _DPPs (practice sheets). The root
reference library spans calculus, linear algebra, physics (Halliday/Resnick,
Young, Feynman, Griffiths…), chemistry (Atkins, Zumdahl, Clayden, JD Lee…),
CS (CLRS, Sedgewick, Silberschatz OS Concepts, CS:APP, Aho et al.
Compilers…), engineering (Goldstein, Mano, Sedra…), economics (Mankiw…),
humanities (Spectrum Modern India, Russell…), languages (Murphy, Genki,
Hammer's German…). Full machine listing: `temporary-references/inventory.json`
(gitignored); the complete 89-item list with sizes is committed in
`WORK_INVENTORY.json` → `research.driveCollection`.

Note: the Drive is exam/higher-ed oriented; school-level foundation topics
use the sanctioned internet fallback (NCERT-class curricula) plus the Khattar
aptitude book for exam-style coverage (MASTER_PLAN §2 step 6).

### Per-unit download ledger (storage law honoured)

| Unit | Downloaded | Used for | Working copies deleted |
|---|---|---|---|
| unit 1 — FM ch. 1 | Khattar QA 4e PDF (32.4 MB, 1049 pp) + NCERT web outline | lessons 1.2 + 1.3 | yes — 2026-11-03, after unit verification |
| unit 2 — FM ch. 2 (lesson 2.1) | Khattar QA 4e PDF re-downloaded after sandbox recycle (33.9 MB) + NCERT web outlines | lesson 2.1 (Khattar ch. 4 surveyed, BODMAS reserved for 2.5) · lessons 2.2 + 2.3 (web-only — no new download) | yes — 2026-11-03, after each lesson's verification |
| unit 2 — FM ch. 2 (lessons 2.2–2.4) | none — unit's Khattar ch. 4 already surveyed; NCERT class-6 coverage web-checked (sanctioned fallback) | lessons 2.2, 2.3, 2.4 | n/a (no downloads) |
| unit 2 — FM ch. 2 (lesson 2.5) | Khattar QA 4e PDF re-downloaded (33.9 MB; ch. 4 BODMAS section studied; Drive file id now persisted in the upgraded survey) + CBSE-aligned BODMAS web-check | lesson 2.5 | yes — 2026-11-03, after unit-2 verification |

### Citation keys (SOURCE_LOG.md)

- `khattar-qa-4e` — Dinesh Khattar, *Quantitative Aptitude for Competitive
  Examinations*, 4th ed., Pearson (2019), ISBN 9789353439552. Used for FM
  ch. 1: place-value/face-value definitions, Indian system naming,
  exam-style digit problems. Exposition original.
- `ncert-math6-ch1` — NCERT Class 6 Mathematics, ch. 1 "Knowing Our Numbers".
  Used for FM ch. 1: canonical school-level topic coverage (comparing,
  ordering, greatest/smallest, estimation). Exposition original.
- `ncert-math6-ch2` — NCERT Class 6 Mathematics, ch. 2 "Whole Numbers".
  Used for FM ch. 2 lessons 2.1 + 2.2 + 2.3: canonical school-level
  treatment of addition, subtraction and multiplication on the number
  line and the properties of whole numbers under each (including their
  failures for subtraction and the new distributive law for
  multiplication). Exposition original.

### Exam registry

`EXAM_REGISTRY.json` — **44 entry skeletons, none researched yet.** Target:
50+ examinations (≥10 Indian, ≥20 international: JEE, NEET, UPSC, GATE, CAT,
SAT, AP, IB, A Levels, Gaokao, JLPT, IELTS…). Research is a standing task
before any book may be marked complete (MASTER_PLAN §3).

## 7. Git history (complete)

| # | Commit | Date | Message | Scope |
|---|---|---|---|---|
| 1 | `526add7` | 11-02 14:15 | Initial commit | +4/−0 · 3 files |
| 2 | `8a37a0b` | 11-02 15:09 | stack scaffold | +8,239/−2 · 69 files |
| 3 | `1369d26` | 11-02 15:31 | platform base + ch1 §1.1 + memory | +3,300/−100 · 26 files |
| 4 | `8f1e37c` | 11-02 16:13 | platform v2 | +2,324/−502 · 29 files |
| 5 | `74d0f93` | 11-02 16:22 | cadence + streak off + push guide | +152/−102 · 10 files |
| 6 | `59b1ff9` | 11-02 16:32 | PAT push workflow memory | +2/−2 · 2 files |
| 7 | `b4f461c` | 11-02 16:52 | site v3 overhaul | +539/−287 · 10 files |
| 8 | `a29d1b8` | 11-03 01:08 | unit 1: FM chapter 1 complete | +867/−61 · 10 files |
| 9 | `a5c9c42` | 11-03 | detailed work-inventory logging system | +2,526/−9 · 8 files |
| 10 | `647f44c` | 11-03 | standing owner preferences (Drive link persisted, PAT protocol) | +30/−2 · 3 files |
| 11 | `64b938c` | 11-03 | unit 2 opens: FM lesson 2.1 + sandbox-recycle recovery + logs | +955/−207 · 13 files |
| 12 | `181f614` | 11-03 | FM lesson 2.2 (114 checks, E2E green) + figure-label fix | +778/−81 · 9 files |
| 13 | `f9d22d5` | 11-03 | FM lesson 2.3 Multiplication (164 checks, E2E green) — local only | +734/−83 · 9 files |
| 14 | `7d2cac6` | 11-03 | memory: push protocol v2 (cron 498279, automated pushes authorized) | +38/−3 · 3 files |
| 15 | `8e5b681` | 11-03 | FM lesson 2.4 Division & Remainders (269 checks, E2E green) + second-recycle recovery — first automated push | +1,125/−68 · 9 files |
| 16 | `fecd9c4` | 11-03 | memory: run-5 pointers (origin/main synced; next FM 2.5) | +13/−7 · 2 files |
| 17 | `52cc8c4` | 11-03 | UNIT 2 COMPLETE: FM lesson 2.5 Order of Operations (165 checks incl. 60 new, E2E green) + unit-2 completion review + survey upgrade | +956/−97 · 11 files |
| 18 | `8e2e1b1` | 11-03 | memory: run-6 pointers — unit 2 closed, origin/main synced; next unit 3 | +7/−3 · 2 files |
| 19 | `a498f25` | 11-03 | UNIT 3 OPENED: FM lesson 3.1 Divisibility and Its Tests (96 checks incl. all new, E2E green) + verify-unit-3.ts committed + third-recycle one-command rebuild — pushed (protocol v2) | +1,184/−85 · 11 files |
| 20 | `ea0441f` | 11-03 | memory: run-7 pointers — unit 3 opened, origin/main synced; next FM 3.2 | +7/−3 · 2 files |
| 21 | `500a028` | 11-03 | FM lesson 3.2 Prime Numbers and Factorisation (152 checks incl. 55 new, E2E green incl. 390px inline-math fix) + fourth-recycle one-command rebuild — pushed (protocol v2) | +1,158/−151 · 9 files |

Per-commit file-level detail (every path with insertions/deletions) lives in
`WORK_INVENTORY.json` → `gitHistory`.

## 8. Current state & what's next

- HEAD: the run-17 memory commit — **everything is PUSHED**: at run
  start the four queued run-15/16 commits went up (`d5a1b43..b788c06`),
  then the run-17 ship `e008f7b` + inventory bookkeeping, then this
  memory commit (`b788c06..63404d0` covering ship + bookkeeping) — each
  push via the one-time HTTPS URL and verified by one-time-URL
  ls-remote; remote HEAD = local HEAD = `63404d0`. Nothing queued.
- **Sandbox recycle note:** recycled FIVE times on 11-03, fully
  recovered each time; runs 7–10 were the mildest (only the gitignored
  Drive survey lost — rebuilt with one command via the id-persisting
  `rebuild_drive_survey.ts`). Full protocol in RESUME_POINTER.json.
- **CURRENT (hourly cadence): UNIT 4 — FM chapter 4 "Fractions", lesson
  4.4 "Adding and Subtracting Fractions" NEXT** (4.1 shipped run 12,
  4.2 shipped run 17, **4.3 SHIPPED run 18** — chapter 4 is open at 3/5).
  4.4 plan: the common ruler becomes arithmetic — same-denominator
  addition by counting, the LCM as the standard ruler (4.3's engines
  carried over), addition via raising (4.2's move now load-bearing),
  subtraction as the gap-naming 4.3 demonstrated (15/24 − 14/24),
  mixed-number storeys added separately, the Egyptian two-term openings
  4.2 promised (3/10 = 1/4 + 1/20 etc.), word problems. **Authored IN
  THE CENGAGE VOICE per the run-14 owner directive + BOOK_FORMAT house
  style WITH solutions as Cengage chains**
  (steps arrays led by natural connectives, ending `answer: '…'`; no
  step-number badges; no boxed Answer rows). Standing rules: one lesson
  per run; original content; lesson ids stable forever; every new figure
  passes `bash scripts/audit-svg-overlaps.sh <lessonId>` with 0 issues;
  quiz answer indices spread; inline math ≤ ~35 chars; LaTeX with exactly
  two backslashes in source; table blocks use `head:`; exercises use
  `sets`; callout blocks need `title`.
- **Style queue (run-14 owner directive):** the Cengage LOOK is live for
  all 16 lessons; lessons 4.2 and 4.3 are authored natively in the
  Cengage voice + solution chain (the exemplars going forward); the prose
  VOICE polish of the 14 pre-4.2 lessons (1.1 first as the exemplar, one
  lesson per run) is queued alongside unit-4 progression — never
  batch-draft.
- Standing side-task: EXAM_REGISTRY research (44 skeletons → 50+ researched).
