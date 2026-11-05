# DETAILED LOG — everything written and worked on

> **Owner directive (2026-11-03):** *"maintain a log or json of everything you
> have written or worked on in detail."* This file is the human-readable
> record; **`WORK_INVENTORY.json`** in this directory is the machine-readable
> mirror, regenerated from the live chapter data by
> `bun run scripts/build_work_inventory.ts` (numbers are never hand-typed).
> **Both are updated at every unit ship and every platform change** — they are
> now part of MASTER_PLAN §2 step 7. Session-by-session narratives stay in
> `WORKLOG.md`; live pointers stay in `PROGRESS.json` / `RESUME_POINTER.json`.

Maintained through **run 51 (fired 19:00 IST from job 498279 — SIXTH consecutive fire from the re-enabled
old job, logged for the owner; its stale one-lesson payload superseded by the owner's 2026-11-05 two-lesson
directive in memory)**: **ANS CHAPTER 2 OPENS — lessons 2.1 'Division with Rest: The Division Algorithm'
(5,291 words, 8 terms, 5 quiz, 16 exercises, 2 derivations, 2 illustrations, 1 figure, 4 formula cards) and
2.2 'The Algebra of Divisibility' (5,105 words, 8 terms, 5 quiz, 16 exercises, 4 derivations, 3
illustrations, 1 figure, 5 formula cards) shipped verify-first in one run (the owner's two-lesson cadence)**.
verify-book2-ch02.ts CREATED with **166 checks** (sections A–T: the existence instances by repeated
subtraction ONLY swept a = 0..200, b = 1..12 against a = qb + r ∧ 0 ≤ r < b; the remainder band; the descent
shadow — S = {23, 18, 13, 8, 3} least 3 and the 15-element walk for (100, 7); the uniqueness impostor sweep
with exactly one solution everywhere plus the b(q − q′) = r′ − r algebra ladder; the exam-shape instances
103 = 9·11 + 4 and 93 = 8·11 + 5; the mod-9 fingerprint re-derivation swept a ≤ 400; the divisibility
verdicts by multiplier search; transitivity/linear-combination/antisymmetry/cancellation sweeps with the
12 | 3·4 caution; both figures' geometry; all 10 quiz keys + 32 exercise keys; formula cards; sources;
scope guards — the script caught TWO real authoring defects pre-writing: a miscomputed impostor count
(240 − 1 = 239, not 96) and an inverted divisibility direction in the 12 | 3·4 caution). Cengage voice
throughout: formal definition callouts, roman example runs, Illustration pills with Sol. chains, derivation
blocks, figures audited 0/0. Gates: tsc 0 (after clearing the stale tsbuildinfo), lint 0 errors, routes
200/404, E2E e2e-ans-21.page.js + e2e-ans-22.page.js green (whitelisted FIRST; quizzes live 5/5 on keys
0/0/2/0/1 and 1/2/0/1/2; 18 + 19 Sol pills and 102 ∴ glyphs after expansion; 0 raw-$ after two $$ display-math
callout leaks caught live and fixed to inline dresses; 0 katex-errors; mobile 390 exact-fit both; SVG audits
0/0 both figures; console clean on fresh loads). New citation keys: euclid-elements-book-vii (Joyce's Clark U.
edition) + landau-1927-elementare (MacTutor, per Tattersall; Hardy's unpublished 1925 seminar notes the
earlier echo). Chapter 2 closes at run 52 with 2.3 'The Euclidean Algorithm, Proven — and Bézout's Identity'
+ 2.4 'Linear Diophantine Equations' + the unit-2 completion review.

Run 50 (fired 18:00 IST from job 498279 — FIFTH consecutive fire from the re-enabled
old job, logged for the owner; its stale one-lesson payload superseded by the owner's 2026-11-05 two-lesson
directive in memory)**: **ANS CHAPTER 1 COMPLETE — lesson 1.3 'The Least-Number Principle and Recursion'
(6,579 words, 8 terms, 5 quiz, 12 exercises, 3 derivations, 3 illustrations, 2 figures, 4 formula cards)
shipped verify-first + the UNIT-1 COMPLETION REVIEW PASSED** (BOOK_FORMAT checklist 7/7, exam corners 3/3,
ids globally unique book-wide, ch-01 flipped to complete + plannedLessons emptied, totals recomputed — the
chapter stands 3 lessons / 16,921 words / 24 terms / 15 quiz / 36 exercises). verify-book2-ch01.ts extended
124 → **228 checks** (sections AA–AM: least-element instances, the LNP engine over all 4,096 subsets of
{1..12}, the least-failure shadow over a six-statement family, the prime-divisor descent sweep 2..300, the
3-and-5 stamp problem with its Frobenius point 7, the recursion engines swept to 60×60 and 40×40, Fibonacci
to F₂₀ + the sum identity + Zeckendorf to 300, both figures' geometry, all 5 quiz keys + 12 exercise keys;
the script caught three check-code defects pre-writing — an out-of-range sweep, an unbuilt F[31]/F[32] index,
a false empty-conjunction seed). Cengage voice throughout. Gates: tsc 0, lint 0 errors, routes 200/404,
E2E e2e-ans-13.page.js green (quiz live 5/5 on keys 1/2/1/0/3, 15 Sol pills + 81 ∴ glyphs after expansion,
0 raw-$ after one derivation-title math leak fixed, 0 katex-errors, mobile 390 exact-fit, SVG audits 0/0,
console clean). New citation keys: cantor-1883-grundlagen + fibonacci-1202-liber-abaci (web-checked,
sanctioned fallback). Chapter 2 'The Division Algorithm and the Structure of Divisibility' opens at run 51
with lessons 2.1 + 2.2.

Run 49 (fired 17:00 IST from job 498279 — FOURTH consecutive fire from the re-enabled
old job, logged for the owner; its stale one-lesson payload superseded by the owner's 2026-11-05 two-lesson
directive in memory): BOOK #2 AUTHORING BEGAN — ANS chapter 1 'The Natural Numbers as a System' in
progress with lessons 1.1 'The Architecture of Counting: Successors and Order' (5,010 words) and 1.2
'Induction: Proving for Every Number at Once' (5,335 words) shipped verify-first
(scripts/verify-book2-ch01.ts, 124/124 checks: successor/order sweeps, induction sum sweeps n=1..200, BigInt
geometric + divisibility sweeps, Euler's polynomial re-verified prime n=0..39 then 1681 = 41² at n=40, the
no-return echo, both figures' geometry, all 10 quiz keys + 24 exercise keys re-derived; the script caught
three real defects pre-writing, including a float-precision mod sweep rewritten in BigInt). Tree was clean at
HEAD `dc9251b` (no push debt). Cengage voice throughout: formal definition callouts, roman example runs,
Illustration pills with Sol. chains, derivation tags, 2 original SVG figures (audited 0/0), 8+8 terms,
5+5 quiz (live 5/5 on keys 2/0/0/1/1 and 0/1/2/1/3), 12+12 exercises L1–L6, 6 formula cards, exam corners,
FM cross-references (prerequisites + prose per house style). Gates: tsc 0, lint 0 errors, routes 200/404,
E2E dedicated blocks green, mobile 390 exact-fit both. New citation keys: peano-1889-arithmetices +
induction-name-history (web-checked, sanctioned fallback).

Run 48 (fired 16:00 IST from job 498279 — third consecutive fire from the re-enabled
old job, logged for the owner; its stale one-lesson payload superseded by the owner's 2026-11-05 two-lesson
directive in memory)**: **(1) the pending run-47 push executed first** — run 47 had been interrupted after
its ship commit `08e2c74` but before its push; both pending commits (`73787fe` run-46 memory + `08e2c74`
run-47 ship) went in one protocol push, remote main = `08e2c74` verified via one-time-URL ls-remote, sanity
gates re-run first (tsc 0, lint 0). **(2) BOOK #2 PROMOTED: Arithmetic and Number Systems** (Mathematics
shelf #2) — research phase COMPLETE: reference survey (Khattar QA 4e ch. 1 + Cengage M2/01 already persisted,
no downloads; the gitignored Drive survey rebuilt after the recycle — 89 entries intact) + syllabus audit
via the sanctioned internet fallback (five source families: the competitive-exam number-system scope —
divisibility, HCF×LCM product relation, remainders, unit-digit cyclicity, factorial trailing zeros, base
conversion + arithmetic in other bases; the university proof-transition bridge per Beck & Geoghegan's *The
Art of Proof* ("our subject is number systems": ℕ with induction/recursion → ℤ → ℚ → ℝ); OpenStax
*Contemporary Mathematics* §4.2 historical numeration (Babylonian/Mayan/Roman → Hindu–Arabic); Cambridge
IGCSE CS 0478 §1.1 binary/hex/two's-complement representation (deep coverage left to the CS shelf); the
NCERT class 6 ch. 1 + class 8 ch. 16 "Playing with Numbers" canon) + the full **10-chapter / 34-lesson
chapter plan** (1 The Natural Numbers as a System · 2 The Division Algorithm and the Structure of
Divisibility · 3 Positional Systems and Other Bases · 4 Primes and the Fundamental Theorem of Arithmetic ·
5 Congruences: The Arithmetic of Remainders · 6 Building the Integers · 7 Building the Rationals · 8
Irrationals and the Real Line · 9 Numeration Through History · 10 The Map of Number Systems). The book
lives at `src/data/library/books/mathematics/arithmetic-number-systems/book.ts` (status 'planned', `ans-`
lesson-id prefix, full TOC as plannedLessons, per-chapter reference mapping in the file header) and is
registered in `index.ts` → allBooks (2 books library-wide). `scripts/verify-book2-promotion.ts` created
and whitelisted: **121/121 checks** (structure; registry; uniqueness vs FM; the six FM cross-reference
anchors verified to exist — fm-divisibility-and-its-tests, fm-prime-numbers-factorisation,
fm-lowest-common-multiple, fm-decimals-and-fractions-two-ways, fm-negative-numbers-why-they-exist,
fm-patterns-to-formulas; research mapping). Gates: lint 0, tsc 0, routes 200 (book/revise/glossary 200,
unknown lesson + unknown book 404), browser E2E green (home shelf shows the new spine; book page: "0
written · 34 planned" chips, 10 chapter tiles, 8 sampled planned titles render, no dead CTAs, zero console
errors; screenshot reviewed). WORK_INVENTORY.json regenerated — the generator generalized to a books array
(booksLive 2, backlog 280; the gitignored Drive survey had to be rebuilt first after the recycle). Logs:
SOURCE_LOG.md (new research-phase section + 4 reserved citation keys), SUBJECT_BACKLOG.md (FM marked
COMPLETE, ANS marked PROMOTED), PROGRESS.json (library block de-staled: FM complete 11/48/355, new ANS
entry, honest totals block), DETAILED_LOG.md (this update). (The run-47 narrative below stands as history.)
Run 47 (fired 15:00 IST from job 498279): **FM 10.2
"Bar Charts, Line Graphs and Pie Charts" (4,331 words) + FM 10.3 "Reading Graphs
Critically" (4,062 words) shipped** — chapter 10 Data and Graphs in-progress **3/4**
(verify-unit-10.ts 81 → 141 → 186 checks J–Z2, ALL PASS pre-writing): 10.2 one table,
three pictures — the bar chart as the tally standing up (figure 1 at 25 px/student, VLM
9.5/8), the bar-scale law DERIVED as tag 1, the sapling line graph (figure 2, the changes
+3+5+2+7+3 rebuilding the 20 cm total, the day-5 interpolation caution — VLM 9/7.5), the
pie with the central-angle law DERIVED as tag 2 (θ = (f/N) × 360°, the slices closing on
360° BY the check-sum law; figure 3 at 144/108/72/36° — VLM 9/7; the VLM's ellipse claim
disproven by DOM measurement), the which-graph-for-which-data table, Playfair 1786/1801 +
Nightingale 1858; 10.3 a graph is an argument made of ink — the truncated baseline
(figure 1 the two-panel milk confrontation: honest 208/224 px vs the lie's 40/120 px, VLM
9.5/8), the exaggeration law DERIVED as tag 1 (E = v₁(v₂−b)/(v₂(v₁−b)), E(0) = 1 exactly,
climbing monotonically; the milk lie 2.79×, the cricketers 10.7×), the twin-scales trap
with the scale-invariance law DERIVED as tag 2, the mismatch gallery (figure 2: the SAME
8/6/4/2 drawn three ways — the line fraud, the open pie at 252°, the honest bars),
correlation-is-not-causation (ice cream vs drownings — the heat), the five-question
checklist + the re-basing repair, Huff 1954; quizzes live 5/5 both (keys 1/3/2/2/0 and
1/2/1/1/1 — the Y4 key corrected from the live run); new citation keys ncert-math8-ch4 +
huff-1954-lie-with-statistics; book = **44 lessons / 208,869 words / 327 terms / 220 quiz
/ 486 exercises**. (The run-44 narrative below stands as history.) Run 44 (Job 504365 —
the FIRST TWO-CHAPTER RUN): **FM 9.4
"Precision, Accuracy and Rounding in Measurement" shipped + the UNIT-9
COMPLETION REVIEW PASSED (chapter 9 Measurement COMPLETE 4/4) + FM 10.1
"Collecting and Tallying Data" shipped (ch-10.ts created and registered;
chapter 10 Data and Graphs OPEN 1/4)** — verify-unit-9.ts 428 → 534 checks
(AE–AO) and verify-unit-10.ts CREATED with 81 checks (A–I), ALL PASS
pre-writing both; 5,770 + 4,533 body words; the interval law and the check-sum
law derived as the chapters' tags; figures: 9.4's three-rulers plumb-line
(redrawn twice) and four-targets (four passes) VLM-gated 10/9 and 9/8; 10.1's
raw-list-to-tally figure accepted after four passes with audits 0/0 and the
geometry certified; quizzes live 5/5 both (keys 1/1/2/1/0 and 0/2/2/1/1); new
citation keys ncert-math6-ch1 + ncert-ganita-prakash6-ch4; a run-43 defect
fixed en route (a thrice-repeated 9.3 paragraph reduced to one); book = **42
lessons / 200,476 words / 311 terms / 210 quiz / 462 exercises**. (The run-43
narrative below stands as history.) Run 43 (the FIRST TWO-LESSON run under the
owner's 2026-11-05 directive): FM 9.2 "The Metric System" + FM 9.3
"Converting Units Without Memorising Tables" shipped — chapter 9 Measurement
in-progress **3/4** (4,529 + 3,603 body words): 9.2 the metric system as the
treaty's masterstroke — the old world's mess (the pinte 0.93 vs 1.46 L) and the
rejected pendulum; the metric-system Definition + the 1795 prefix law
(7 April: Greek big steps deca/hecto/kilo, Latin small steps deci/centi/milli)
with the seven-rung ladder table; figure 1 the metric staircase (five countable
dashed hops of 3.45 km, per-hop × 10 labels, the quantity anchored — REDESIGNED
twice to VLM 10/8); the point-shift law DERIVED as tag 1 from the swap law
(u₂ = u₁/10ʰ ⇒ n₂ = n₁ × 10ʰ — the digits never change, the point walks) with
the 3.45 km Illustration; the direction-test Caution; the three families
(km–m–cm–mm, kg–g–mg, L–mL) + the kilogram callout (the prefix-wearing base
unit) + the tonne; figure 2 one quantity on three rails (the same × 1000 hop,
10/9); the litre bridge as tag 2 (1 L = 1 dm³ = 1000 cm³, 1 mL = 1 cm³, 1 m³ =
1000 L; the 1901→1964 drift one clause) + the tank Illustration (3 m³ = 3000 L);
the metre's three bodies (Earth 1791 — Delambre/Méchain 1792–1798, the 1799 bar
at 443.296 lignes honestly 0.02% short = 2 km in 10,000 = one part in 5,000 =
0.2 mm; krypton 1960; light 1983, c = 299,792,458 m/s); the 1795 historical
callout (the decimal day 100,000 s vs 86,400, abandoned in two years; the US
1866 legal/1975 voluntary). 9.3 the engine on the ladder: the conversion-factor
Definition (equal measures as a fraction = 1 in disguise); the legality
derivation + tag 1 the factor licence; figure 1 the cancellation machine
striking ONLY the km tokens (rebuilt to 10/9); the direction test + the
four-row table; chains (2.5 km → 250,000 cm; order free by commutativity,
matching not); the reciprocal either-dressing Note (4.5's theorem wearing
units); the speed pipeline derivation (54 km/h → 15 m/s; the 5/18 collapse of
6.2 UNMASKED as two chained identities; the return × 3.6) with figure 2 rebuilt
left-to-right with a pure-factor collapse box (10/9); the squared-factor law as
tag 2 (1 m² = 10⁴ cm² NOT 100; 1 cm² = 10² mm²; 1 m³ = 10⁶ cm³; the hectare and
the tank re-cashed) + the window/spray and relay Illustrations; the identity
economy (six facts + the licence + the power rule) and the false-identity
honesty. Quizzes live 5/5 both (keys 0/2/1/2/3 and 0/1/2/2/1); verify-unit-9.ts
200 → 428 checks A–AD ALL PASS pre-writing; SVG audits 0/0 all four figures;
E2E dedicated 9.2/9.3 blocks green, the suite at 30 lessons; new citation keys
wikipedia-metre-history, usma-1795-decree, sizes-litre-1964,
ncj-measuring-the-meter; book = **40 lessons / 190,363 words / 295 terms /
200 quiz / 438 exercises**. Next: run 44 = FM 9.4 (closes the chapter → the
unit-9 completion review) + ch. 10 opens at 10.1.

Generated: 2026-11-03/04/05 (maintained through **run 42, Job 498279**:
**FM 9.1 "Units as Agreements" shipped and CHAPTER 9 MEASUREMENT OPENS**
(5,501 body words): the question under every number the book has printed —
what actually happens when we measure; the measurement Definition in the
is-said-to-be dress (a count of how many times a chosen unit fills the
quantity) with Q = n × u as tag 1; the desk measured in three handspans
(figure 1: 180 cm read as 10, 9 and 8 numbered spans between shared rails,
hooked one-span dimension braces — REDESIGNED once after VLM 6/6, pass 2
10/9); body (non-standard) units and their one fatal flaw, invariability;
the royal cubit's ancient fix (7 palms × 4 digits = 28 digits; the granite
rod of Maya, 52.3 cm, distributed to building sites — the agreement made
physical); the standard-unit Definition with its three requirements
(invariable, replicable, agreed); the barleycorn inch statute and the
honest Henry-I yard legend; the swap law n₁u₁ = n₂u₂ DERIVED as tag 2
(figure 2: one 2.5 m ribbon under three sticks — 2.5, 5, 25 counts, the
half-chunk dashed; VLM 10/9) with the 2.5 m table (0.0025 km / 2.5 m /
250 cm / 2500 mm), the inverse law (unit ÷ k ⇒ count × k, swept k =
2..100) and the bare-number Caution; base vs derived quantities (m²
cashing 8.5's tiles, m/s cashing 6.2's journeys; the carpet 12 m² =
120,000 cm²; the bus 45 km/h = 12.5 m/s by the 5/18 law); the treaty
section (Metre Convention, Paris, 20 May 1875, 17 states, BIPM at Sèvres;
SI named at the 11th CGPM 1960 — exactly 7 base units; the 2019
redefinitions one-sentence forward colour) and India's page (SOWM Act
1956 → metric compulsory 1 Oct 1960 → Legal Metrology Act 2009); 8 terms,
5-quiz (keys 0/1/2/2/2 verified live 5/5), 12 exercises L1–L6 (L6: the
swap law proved; the 250-no-unit packet fraud cashed); verify-unit-9.ts
CREATED with 200 checks A–M ALL PASS pre-writing (gitignore exceptions
added FIRST); E2E suite 28 lessons exit 0 + dedicated 9.1 block; SVG
audits 0/0 first pass; new citation keys ncert-sci6-curiosity-ch5 +
ncert-phys11-ch2. Chapter 9 OPEN 1/4.
---

Run 41 (kept for context): **FM 8.5 "Perimeter and Area of Rectangles,
Triangles and Circles" shipped and CHAPTER 8 CLOSED 5/5 + voice polish 4.1** (5,998 body words): the two
**FM 8.5 "Perimeter and Area of Rectangles, Triangles and Circles" shipped
and CHAPTER 8 CLOSED 5/5 + voice polish 4.1** (5,998 body words): the two
paying questions, the walk around (perimeter, length units) and the fill
inside (area, square units); P = 2(l + b) derived from the walk as tag 1
with the half-walk named (Illustration 1 the fence 82 m at Rs 15/m); the
fixed-perimeter table (nine rectangles of P = 36, areas 17 to 81 climbing
to the square), the square-wins law swept over every even perimeter 4..200,
the fixed-area mirror, the perimeter-never-fixes-area Caution; A = l × b
from the tiling as tag 2 (figure 1 the tiled 5 × 3 rectangle halved by its
diagonal; Illustration 2 the 80-tile floor both ways); area units by the
rescaled tile (1 m² = 10⁴ cm² with the ×100-reflex Caution; 1 hectare =
10⁴ m², the 3-hectare field); the triangle's area derived as tag 3 — two
copies of a right triangle tile its leg-rectangle (the half-turn about the
hypotenuse midpoint, swept p, q = 1..12), the altitude split whose x
cancels (500 pseudo-random triangles, apex outside the base included), the
perpendicular-height Caution (½·4·5 = 10 refused against 6), Illustration 3
the 3-4-5 audited through all three base-height dresses (hypotenuse
altitude 12/5 = 2.4); π DEFINED as the constant C/d, C = πd = 2πr as tag 4
with figure 2 the circumference unrolled straight to scale (2π × 90 ≈ 565.5
px for r = 90 px), the working values priced (22/7 +0.04%, 3.14 −0.05%),
Illustration 5 the r = 7 round-trip and C = 132 → d = 42; the sector
rearrangement drawn FLUSH (tips interleaved between the edges, every
straight edge continuing its neighbour's, arcs tiling both edges) as
figure 3 behind tag 5 A = πr² = πd²/4 — redesigned once after the first
VLM pass came in 7/6 (midpoint-tip construction looked ragged; the flush
classic pass scored 9/9); the diameter-fraud Caution (πd² overshoots ×4),
Illustration 6 the fill/walk round-trip at r = 7 with the A = 154 inverse;
composite dissection (L-shape 88 m² walk 42 m; interior cuts never walked)
and Illustration 7 the arched window (glass 13,982 cm², beading 471.4 cm);
the exam corner and the historical callout (Archimedes' 96-gon squeeze
3 10/71 < π < 3 1/7; Aryabhata's 62832/20000 = 3.1416; Zu Chongzhi's Milü
355/113; Lambert 1761; Lindemann 1882; William Jones 1706 the letter,
Euler's adoption); 12 terms, 5-quiz (keys 1/2/3/1/2 verified live 5/5),
12 exercises L1–L6; verify-unit-8.ts EXTENDED 339 → 429 checks (AO–AZ) ALL
PASS pre-writing; E2E 27 lessons exit 0 + dedicated 8.5 block (quiz live
5/5, 12 solutions, 3 figures, mobile 390 exact-fit, 0 raw-$, 0 katex
errors); SVG audits 0/0/0 FIRST pass; VLM figures 10/9, 9/8, 9/9; UNIT-8
COMPLETION REVIEW PASSED (checklist 7/7, exam coverage, ids unique; ch. 8
= 26,299 words / 54 terms / 25 quiz / 61 exercises; book = 37 lessons /
176,712 words / 271 terms / 185 quiz / 402 exercises); ch-08 status →
complete; VOICE POLISH 4.1 (the treaty definition recast is-said-to-be +
the Thus-line, zero new numerals) with the bonus repair of a latent
katex-error (\tfrac{\text{Rs } 20} → plain Rs dress) — the pre-4.2 voice
queue now EMPTY; new citation keys ncert-math6-gp-ch6 + ncert-math7-ch11.
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
| 11-04 (run 19, cron Job 498279) | (ship) | **LESSON 4.4 Adding and Subtracting Fractions** — authored in the Cengage voice + solution chain, 4,916 words; 4.3's quiet calculation promoted to arithmetic: like-ruler counting (distributive proof, walk-on-the-line, the ch. 2 laws verified: commutative/associative/identity 0, subtraction's failure), simplify-always (6/9 → 2/3, 2/8 → 1/4, 8/10 → 4/5), sums past the whole (12/8 = 3/2), the straight-across fraud Caution (2/5 = the mediant, trapped between addends), the **LCM as standard equipment** (1/4 + 1/6 = 3/12 + 2/12 = 5/12, five-bar figure with stacked contributions + dashed boundary; 7/12 + 3/10 = 53/60 on both the 60- and 120-rulers; lists on the 18-ruler), **subtraction as gap-naming** (5/8 − 7/12 = 15/24 − 14/24 = 1/24 — 4.3's extra twenty-fourth an answer; licence form (60−56)/96; number-line arc exactly 1/24 of the unit), complements (1 − 5/9 = 4/9; tank 7/12 full → 5/12 empty), mixed-number storeys (overflow 2 3/4 + 1 1/2 = 4 1/4; underflow 3 1/5 − 1 2/5 = 1 4/5 via 2 6/5; improper routes agree), **Egyptian two-term openings** (greedy: 3/10 = 1/4 + 1/20; 5/6 = 1/2 + 1/3; 1/5 + 1/10 non-greedy), 6-row toolkit table + three-laws equation + exam corner; 7 illustrations, 2 figures (0 audit issues FIRST pass), 6 new terms, 2 formula cards, 5-quiz (1/2/2/1/0), 12 exercises L1–L6 — L6 proves the like-ruler rule (distributivity) and the straight-across fraud theorem (ad² + b²c > 0); verify-unit-4.ts 199 → **261 checks** (AA–AH) ALL PASS pre-writing; E2E 7 lessons — 7 Sol. pills ALL inline, badges 0, 21 ∴ glyphs, KaTeX 162, quiz 5/5 live, 390px exact-fit, zero console errors; totals: **17 lessons / 80,762 words / 108 terms**; logged; pushed (protocol v2) |
| 11-04 (run 20, cron Job 498279) | (ship) | **LESSON 4.5 Multiplying and Dividing Fractions — UNIT 4 FINALE + completion review** — authored in the Cengage voice + solution chain, 5,172 words: multiplication as 'of' (the re-cutting reading, half of three quarters = six shaded eighths), the multiplying rule ac/bd **proved from the rulers** as a derivation block (cut every piece into b, sieve a of every b, read ac of bd), the area figure (2/3 × 3/5 = 6/15 = 2/5, the doubly-shaded overlap exactly 2/5 of the pixels), scaling and the retired makes-bigger reflex (the two-frauds Caution: straight-across × is the truth, hunting a common ruler for a product is the new fraud), cross-cancellation licensed across × (5/6 × 3/10 = 1/2 × 1/2 = 1/4), the reciprocal (0 has none — why division by 0 is banned), the division theorem **proved on the bd-ruler** (5/6 ÷ 2/3 = 10/8 = 5/4; the flip IS the measuring count; division figure: six 85px eighth-steps arcing 0 → 3/4), the see-saw (÷ proper grows / × 1/2 IS ÷ 2), the flip-only-the-divisor Caution, **the HCF/LCM-of-fractions shortcuts banked since run 12 cashed** (measuring defined; HCF 2/9 / LCM 8/3 for 2/3 & 8/9; the product rule survives: 2/9 × 8/3 = 16/27 = 2/3 × 8/9), mixed numbers converted first (2 1/2 × 1 3/4 = 4 3/8; 1 1/2 ÷ 2 1/4 = 2/3), 6-row toolkit + three-laws equation + exam corner; 5 illustrations, 2 figures, 6 new terms, 3 formula cards, 5-quiz (1/2/1/0/3 verified live 5/5), 12 exercises L1–L6 — L6 proves the sieve-and-ruler rule and the division theorem with the zero ban; verify-unit-4.ts 261 → **330 checks** (AI–AN) ALL PASS pre-writing (AM caught the real 14/9-not-10/9 quiz distractor); **unit-4 completion review: BOOK_FORMAT 7/7, exam-coverage 5/5, ch. 4 = 26,905 words / 32 terms, book = 18 lessons / 85,934 words / 114 terms, ch. 4 status 'complete'**; E2E 8 lessons — 5 Sol. pills inline, badges 0, legacy boxes 0, KaTeX 204, 12/12 expand, quiz 5/5 live, 390px exact-fit, VLM 8.5/10 (division arc fixed to a smooth 255/46 ellipse and re-verified), zero console errors; logged; pushed (protocol v2) |
| 11-04 (run 21, cron Job 498279) | (ship) | **LESSON 5.1 Decimal Places and the Point — CHAPTER 5 OPENS** — authored in the Cengage voice + solution chain, 5,350 words: the opening scene (the 7-and-a-bit mm screw, the rupee's 100 paise, the kilo's 1000 grams — keep cutting into tens), the decimal-point treaty Definition (the point as the fraction bar standing upright; 2.74 = 2 + 7/10 + 4/100), the tenths→hundredths→thousandths ladder (ten of each piece rebuild the next coarser), the **place-value mirror** (figure 1: ×10 left / ÷10 right about the hinge at the ones; 305.274 dissected digit by digit at columns x = 40/144/248 \| 396/500/604, hinge x = 374), reading rules ("point two seven four" — digits one at a time, the roman example run) + expanded form + 7 = 7.0, Illustrations 1–2 run the bridge both ways (7/10, 47/100, 305/1000 ⇄ 0.7, 0.47, 0.305 = 305/1000 = 61/200), **the atom test as a derivation block** (lowest terms a/b wears an exact decimal dress ⟺ b = 2^m·5^n, needing max(m, n) places — re-cut direction multiplies by 5^(m−n) to reach 10^m; refusal direction: 10^k = 2^k·5^k carries no other atoms by Lesson 3.2's uniqueness, 10^k mod 3 = 1 forever; 5/12 and 22/7 named as 5.2's recurring territory), **locating by zooming** (Illustration 3 walks 2.74; figure 2: two-panel zoom 2.7 → 2.74, 62 px steps, dashed trapezoid connectors), **comparing by aligning the points** with the **trailing-zero licence as a derivation block** (appending a zero = multiplying rule with 10/10 = 1; 7 = 70/10) + the more-digits Caution (0.5 > 0.45; 0.05 ≠ 0.5 — leading zeros load-bearing), Illustration 4 settles 5.64 vs 5.603 (hundredths 4 > 0), the equivalent-decimals Definition, **money/length/mass** + the zero-filling-trap Caution (₹8.05 not ₹8.5; 3 kg 60 g = 3.06 kg) + Illustration 5 (₹8 and 5 paise; 9 cm 8 mm = 9.8 cm), 6-row toolkit table + bridge-on-one-line equation + 3 formula cards + exam corner (the two comparison decoys, "the single most examined zero"); 5 illustrations, 2 figures (0 audit issues after figure 2's zoom-box/connector fix), 7 new terms, 3 formula cards, 5-quiz (1/2/3/1/2 verified live 5/5), 12 exercises L1–L6 — L6 proves the trailing-zero licence and the atom test with applications; new **verify-unit-5.ts: 165 checks** ALL PASS pre-writing (+ regressions 330/260/165; the 2..500 sweep proves divides-a-power-of-ten ⟺ atoms ⊆ {2,5}); E2E extended to **9 lessons** — 5 Sol. pills ALL inline, badges 0, legacy boxes 0, 15 ∴ tags, KaTeX 209, dollarInSvg 0, quiz 5/5 live, 12/12 expand, 390px exact-fit, zero console errors, VLM 9/10 across opener/mirror/zoom/illustration; totals: **19 lessons / 91,284 words / 121 terms**, ch. 5 in progress 1/5; logged; pushed (protocol v2) |
| 11-04 (run 22, cron Job 498279) | (ship) | **LESSON 5.2 Decimals and Fractions, Two Ways of Writing the Same Numbers — THE BRIDGE FINISHED** — authored in the Cengage voice + solution chain, 5,407 words: the opening fence (the refuseniks need decimal names; let division run past the point), the **step machine** equation tag 1 (digit ⌊10r/b⌋, remainder 10r mod b, justified from Lesson 4.2's multiplying rule), **terminating decimals** (Illustration 1: 3 ÷ 8 → 0.375, remainder 0 after three places = max(3, 0); the division-side atom test: each step adds one 2-atom + one 5-atom of paying power), **recurring decimals** (Illustration 2: 5 ÷ 12 → 0.416̄ — remainder 8 returns, the digit 6 waltzes; the head is the 2²-part paying out), **the dresses theorem as a derivation block** (deterministic walk on b remainder cells; cell 0 ends the walk; pigeonhole on the b − 1 nonzero cells forces a return; determinism replays the block — repetend ≤ b − 1 digits; no third dress), **figure 1: the remainder carousel of 1/7** (cells 1→3→2→6→4→5→1, amber arrowheads + emitted digits 1 4 2 8 5 7 in walking order; geometry script-verified, audit 0 issues after moving node labels outside the circles, VLM 10/10), the slow walk (10 = 1×7+3 … 50 = 7×7+1), **pure vs mixed recurrence** (roman run: 1/3 cycle 1, 1/11 cycle 2 via 10 ≡ −1, 1/37 cycle 3 via 999 = 27 × 37, 1/7 cycle 6; mixed: 1/6, 7/30, 13/22 = 0.590̄, 11/150 = 0.073̄), **the head-length theorem as a derivation block** (head = exactly max(m, n) places, then the coprime-to-ten tail walks purely), **figure 2: the map of the bridge** (three-lane classifier with instances 7/8, 5/12, 1/3; audit 0 issues, VLM 9/10), **shift-and-subtract backwards** (Illustrations 3–5: 0.3̄ = 1/3; 0.142857̄ = 1/7 over six nines; 0.245̄45̄ = 27/110 over 990; the shift rule as equation tag 2; Lesson 2.5's vinculum returns as the repetend bar), the **0.9̄ = 1 Caution** and the **atoms-of-the-base Note** (base twelve: thirds terminate, sevenths still cycle 6), the exam-style **2/7 vs 0.2857** Illustration (20000 > 19999 — the fraction wins by exactly 1/70000) and the **22/7 ≠ π warning** (3.142857̄ vs 3.14159…, ≈ 0.0013 apart — **5.1's misprint corrected this run**), the 6-row dress catalogue + census equation + 3 formula cards + exam corner; 6 illustrations, 2 figures (0 audit issues), 7 new terms, 5-quiz (0/2/2/1/0 verified live 5/5 · perfect), 12 exercises L1–L6 — L6 proves the dresses theorem and the 142857 rotation family from 142857 × 7 = 999999; verify-unit-5.ts 165 → **273 checks** (P–AC) ALL PASS pre-writing (+ regressions 330/260/165); E2E extended to **10 lessons** with a dedicated 5.2 block (6 inline Sol. pills, 18 with exercises, 30 ∴ tags, KaTeX 307, dollarInSvg 0, badges 0, legacy boxes 0, 12/12 expand, 390px exact-fit, zero console errors); totals: **20 lessons / 96,691 words / 128 terms**, ch. 5 in progress 2/5; logged; pushed (protocol v2) |
| 11-04 (run 26, cron Job 498279) | (ship) | **LESSON 6.1 Ratio as a Comparison — CHAPTER 6 OPENS: THE DIVISION LENS** — authored in the Cengage voice + solution chain, 4,442 words: the opening ties ch. 5's close and names **the two lenses** (difference asks "how much more?", ratio asks "how many times?"; equal differences may hide unequal ratios — classes 24/16 vs 48/40 both differ by 8 but run 3:2 vs 6:5 — and equal ratios may sit on unequal differences — 100/50 and 200/100 both 2:1) + the two-lenses Note; **Definition callout** (same-kind, same-unit quantities; a : b = a/b, b ≠ 0, a pure number) as **equation tag 1** with the Leibniz-colon + Euclid–Eudoxus provenance note; the roman run (15:5 = 3:1; 50:50 = 1:1; 110:105 = 22:21); **the two-faces Note** (a : b is the part–part face, a/b the part–whole face: 24 : 16 = 3 : 2 against 24/40 = 3/5 in the class of 40; a ratio alone never recovers the whole — 3 : 2 fits 40 as well as 200); **the same-units law** with the convert-first Caution (Rs 5 : 50 paise = 10 : 1, not 1 : 10) + Illustration (5 m : 80 cm = 25 : 4, HCF 20); **simplest form by ch. 3's HCF machinery** (formula card; Illustration 1: 24 : 36 = 2 : 3 via HCF 12; Illustration 2: 91 : 104 = 7 : 8 via Euclid's runs; the **uniqueness Note** carried from 4.2's lowest-terms theorem; decimals and fractions cleared first — Illustration 0.75 : 1.25 = 3 : 5, plus 2/3 : 5/6 = 4 : 5 and 3/4 : 9/16 = 4 : 3 inline); **equivalent ratios as equation tag 2** (a : b = ka : kb, k ≠ 0; the cross-test licence a : b = c : d ⟺ ad = bc from 4.3; fill-the-blank 3 : 5 = □ : 20 → 12; verdicts 15 : 25 = 21 : 35 both 3 : 5 vs 4 : 7 ≠ 5 : 9 — 36 ≠ 35); **figure 1: one ratio, many sizes** (three rows of dots 3+5, 6+10, 9+15 at 24 px pitch, dashed divider at x 296 in the 88 px gap, ratio labels at x 696; audit 0 issues FIRST pass, VLM 10/10 math + 9/10 clarity); **the recognition table** (five benchmark ratios splitting Rs 630 integrally: 1:1 → 315/315, 1:2 → 210/420, 2:3 → 252/378, 3:4 → 270/360, 4:5 → 280/350); **three-term (continued) ratios** (simplest = HCF of ALL three; Illustration 45 : 60 : 90 = 3 : 4 : 6 via common stock 15; 120 : 150 : 210 = 4 : 5 : 7; **the joint-simplicity Caution** — 6 : 10 : 15 is simplest though every pair reduces (HCFs 2, 5, 3), full argument in exercise L6; the pair-chain splice A : B = 2 : 3, B : C = 6 : 7 → 4 : 6 : 7 via lcm(3, 6) = 6); **sharing in a given ratio as the unitary method's next dress** (the one-part engine: 3 + 5 = 8 equal parts of Rs 1,200, one part 150, shares 450/750, both checks — rebuild the whole + carry the ratio; **figure 2: the sharing map** (8 cells of 80 px, A 240 px = 3 cells shaded, B 400 px = 5 cells, bracket rails y 92; audit 0 issues FIRST pass, VLM 10/10 math + 8/10 clarity); **the share formula PROVED as a derivation block** (a + b equal parts make the whole → one part T/(a+b) → shares (a/(a+b))T and (b/(a+b))T → the rebuild check (a+b)/(a+b) T = T exact by construction; result: share = parts/total parts × T — sharing is the part–whole fraction in action); Illustration Rs 1,200 in 3 : 5 → 450/750; Illustration Rs 18,000 in 2 : 3 : 4 → 4,000/6,000/8,000 (9 parts of 2,000); Illustration the difference story (3 : 5 with difference 120 → 2k = 120, k = 60 → 180 and 300); the inverse read (450 is 3/8 of the total → total 450 × 8/3 = 1,200); **properties of ratios** (5 bullets, each with a verified instance); exam corner (NCERT class-6 ch. 12 §12.1 + class-7 §§8.1–8.2 canon; SSC/bank/RRB shapes — simplest form, sharing, ratio + sum/difference, the A : B : C splice seeding partnership); 7 new terms (Ratio, Terms of a ratio, Simplest form, Equivalent ratios, Continued ratio, Sharing in a ratio, One part), 4 formula cards (the ratio / simplest form / equivalent ratios / sharing); 8 illustrations, 2 figures (0 audit issues), 5-quiz (2/1/3/2/0 verified live 5/5), 12 exercises L1–L6 — L6 carries the 6 : 10 : 15 justification and the A : B : C chain (Rs 1,020 in 4 : 6 : 7 → 17 parts of 60 → 240/360/420, ratios read back); **VOICE POLISH 1.1** (queued per-run extra, 1.1 first): formal Definition callout "Number, numeral and digit" (is-said-to-be shape + Thus-line) + roman example run (the number seven; the numerals 7, VII, "seven"; the digits — Devanagari ११ = two digits naming eleven) + a Thus-line on the base-ten para — zero numbers changed; new **verify-unit-6.ts: 93 checks** (sections A–K) ALL PASS pre-writing (+ regressions 455/330/260/165; the pre-writing audit forced the L6 shares onto the clean 17-parts-of-60 road — same answers, simplest route); E2E extended to **14 lessons** with a dedicated 6.1 block (8 caps-over-rule headings, 8 Illustration pills, 8 Sol. pills ALL inline, 25 step rows, badges 0, thereforeTags 24, legacy boxes 0, KaTeX 293, dollarInSvg 0, quiz 5/5 live with 2/1/3/2/0, 12/12 expand, 36 collapsibles, 390px exact-fit, console clean); **SANDBOX NOTE: dev-mode lesson routes 404 for ALL lessons in this recycled instance** — bisected by stashing the run's changes and re-testing pre-change code (still 404): an environment regression of Next dev's dynamicParams=false handling, not a content defect; the quality gate ran against the **PRODUCTION build** (bun run build + start: new lesson 200, old lessons 200, unknown id 404 — platform contract preserved); totals: **24 lessons / 115,172 words / 157 terms / 120 quiz items / 245 exercise questions**, ch. 6 open 1/5, next 6.2 Rates and Unit Rates; logged; pushed (protocol v2) |
| 11-04 (run 31, owner chat directive) | (ship) | **SITE-WIDE ARROW & DIAGRAM POLISH** — owner flagged the 6.4 flip figure's arrows ("the arrow in this does not look nicely — make it nicely or use images if you want; do such fixes everywhere wherever needed"): **figure 2 (the flip) REDESIGNED** — the two straight crossing lines with open-V chevron heads (stroke 1, tips floating 9 px above row 2) replaced by two **mirror-symmetric cubic Bézier swap-arcs** (`M 448 120 C 448 138, 588 146, 588 175` / `M 588 120 C 588 138, 448 146, 448 175`, vertical departure/arrival tangents, crossing at (518, 143.375)), **r 3 filled anchor dots** at the departures, **solid filled 12 × 16 heads** flush on the stroke ends with tips 1 px INTO the row-2 box tops, stroke 2 round caps; **figure 1 (the panels) — the hyperbola SMOOTHED**: xy = 240 was a 6-vertex polyline with a visible kink at the (540,80) dot (VLM sweep catch) → redrawn as a **36-vertex dense path** (uniform-t on [8/3,7] + exact dot abscissae 3/4/5/6), every vertex on the pixel invariant **(x−420)(320−y) = 28800** (max deviation 15.4 < 16), endpoints + all four dot points exact, max chord turn 3.24° = the curve's own tangent turn; generator persisted (`scripts/gen_smooth_hyperbola.py`, gitignore exception); **the "4 × 60" label RELOCATED** off the curve (its left half sat ON the hyperbola — pre-existing but invisible while the curve was an unaudited polyline; moved to (600,128) with 15 px clearance, "6 × 40" preemptively to (676,188) with 9 px); **ALL 45 FIGURES SWEPT** (screenshots + VLM batches): ch-01 3/3 PASS (markers + Q-arcs), ch-05 10/10 PASS (solid polygon heads), ch-06 6.1/6.2/6.3 6/6 PASS, ch-02/03/04 carry no directional arrows (ch-02's diagonals are digit strikethroughs — intentional); **zero `<polyline>` elements remain**; verify-unit-6.ts AJ10/AJ11/AM4/AM5 rewritten (361 checks ALL PASS; regressions 455/330/260/165); audits 0/0 both touched figures; lint + tsc clean; routes 200/200/200/404; full 17-lesson E2E exit 0 (quiz 5/5 live, 12/12 expand, mobile 390 exact, console clean); VLM: flip glyph clean no-glitch, panels 9/10; totals unchanged (27 lessons / 128,994 words — geometry only); push DEFERRED (no PAT in the owner chat — 5 unpushed commits await the next cron-delivered run, which must push them FIRST) |
| 11-04 (run 30, cron Job 498279) | (finish + ship + queued extra) | **LESSON 6.4 Direct and Inverse Variation — THE TWO LOCKS NAMED** — finished from the interrupted 15:18 delivery's in-flight commit `407c0fe` (the lesson, verify sections AF–AP and the e2e registration were authored; gates/bookkeeping/push were not) and shipped in the Cengage voice + solution chain, 5,373 words: 6.3's off-line gatekeeper promoted to the definition (the shop's own rice line 96/3 = 160/5 = 256/8 = 32 as **direct variation** y/x = k, y ∝ x, the constant of variation k named; **Definition callout** + equation tag 1); **the parking-table fraud** (4 h Rs 60, 8 h Rs 100, 12 h Rs 140, 24 h Rs 180 — 15 → 12.5 → 35/3 → 7.5 per hour: growing WITHOUT agreeing, contrasted with the rice line 65/1 = 130/2 = 325/5); **the direct engine** (machine 840/6 = 140 bottles/h → 700 in 5 h; truck 14/25 km/min → 168 km in 300 min; pole 560/320 = 7/4 per cm of shadow ↔ 1,050 cm pole → 600 cm shadow; bacteria 5/50,000 cm × 20,000 = 2 cm by engine AND factor m = 2/5); **inverse variation** xy = k (**Definition callout** + equation tag 2; sweets 24 × 5 = 120; game show Rs 1,00,000 — 4 → 25,000, 5 → 20,000, 8 → 12,500, 10 → 10,000, 20 → 5,000; spokes 360°; periods 8 × 45 = 360 min); **one journey, two bindings** — figure 1 the two panels (line d = 60t with (1, 60), (3, 180) vs the hyperbola xy = 240 with (3, 80), (4, 60), (6, 40) and dotted guides; TITLES RAISED 48 → 40, km/h tag cleared of the 90 tick, the "3 × 80" label relocated into the guides' empty pocket (480, 108) after VLM flagged the crowding twice — final VLM 10/10 math + 9/10 clarity); **the factor laws PROVED from the constants** (x₂ = m x₁ ⟹ y₂ = m y₁ direct, y₂ = y₁/m inverse; van 120 → 240 doubled; journey 6 h → 3 h at double speed; the m = 3/2 guard 240/90 = 8/3 h = 2 h 40 min); **the recognition drill** (7 rows with verified constants — rewiring 12, speed 60, journey 240, yield 4 t/ha, land 12,000, shadow 1.75, spokes 360); **the flip** — figure 2 REBUILT after VLM scored the single one-way arrow 6/10: TWO crossing legs (the 4 leg (470, 122) → (566, 178), the d leg (566, 122) → (470, 178), crossing at (518, 150)), the label moved to the band's clear left region, title/captions recentered onto the box grid x 358 — final VLM 10/10 + 9/10; invertendo cashed (3 : 4 :: d : 4 → d = 3; the naive direct layout 3 : 4 :: 4 : d → 16/3 absurd); **the work problems** (rewiring 3 × 4 = 12 person-days → 3 days; machines 42 × 63 = 2,646 → 49; cattle 20 × 6 = 120 → 4 days; windows 2 × 3 = 6; boxes 300 → 15); exam corner (NCERT class-8 ch. 13 §§13.1–13.2 + Ex. 13.1/13.2 canon, class-6 ch. 12, class-7 ch. 8, Khattar staples); 8 terms, 5-quiz (2/1/1/2/1 verified live 5/5), 12 exercises L1–L6 (L6: the van 240 km by product AND factor; the flip proved); **E2E gap fixed:** the interrupted run had registered the lesson in the e2e LESSONS array but never written the dedicated block — added this run (keys 2/1/1/2/1 clicked → "You scored 5/5" live, 12/12 expand, 21 Sol. pills, mobile 390 exact, console clean; full 17-lesson suite exit 0); verify-unit-6.ts 253 → **361 checks** ALL PASS (AJ10/AJ13/AJ14 + AM4/AM5 rewritten for the polished figures); audits 0/0 both figures; lint + tsc clean; routes 200/200/200/404; **VOICE POLISH 2.1** (queued per-run extra, fourth): the formal is-said-to-be Definition callout "Expression" + the roman run (8 + 2 × 5 = 18; (8 + 2) × 5 = 50; 18 ÷ 3 of 2 = 3 — the lesson's own numbers only) + the Thus-line handing the ladder to figure 1's expression trees; queue corrected (ch. 1 closed at 3 lessons — remaining pre-4.2 = 2.2–2.5, 3.1–3.5, 4.1); the gitignored Drive survey rebuilt after the recycle (89 entries); totals: **27 lessons / 128,994 words / 178 terms / 135 quiz items / 281 exercise questions**, ch. 6 open 4/5, next 6.5 Scaling: Maps, Models and Recipes; logged; pushed (protocol v2) |
| 11-04 (run 29, cron Job 498279) | (ship + queued extra) | **LESSON 6.3 Proportion and Cross-Multiplication — 6.2'S CLOSING QUESTION MADE OFFICIAL** — authored in the Cengage voice + solution chain, 4,132 words: the opening pays the 6.2 debt with the Illustration (pantry 3 kg for Rs 96 vs shop 5 kg for Rs 160 — both 32 : 1, cross 96 × 5 = 480 = 3 × 160 — "one rate, said twice") + the roman run of the shop's line (96:3, 160:5, 256:8 — one simplest name, uniqueness of 6.1 doing the legitimating); **Definition callout 'Proportion'** in the formal shape (four non-zero quantities in order; a : b = c : d; written a : b :: c : d, read "a is to b as c is to d"; a SENTENCE, not a number — 2.2's equation–expression split in new dress) as **equation tag 1** + the order-fraud paragraph (5 : 3 :: 6 : 10 false — 5/3 ≠ 3/5); **figure 1: one statement, four seats** (boxes a:b::c:d at pitch 160 with first/second/third/fourth beneath, the extremes arc over the outer pair, the means arc under the inner pair, the cross law as the bold bottom strip; audit 0 issues FIRST pass, VLM 10/10 math + 10/10 clarity); **the cross law PROVED as a derivation block in BOTH directions** (multiply by bd — the b and d cancel to ad and bc; divide by bd — back to the ratios; the iff closes; \xrightarrow arrows; balance licence of ch. 2 named) + **formula card** + **the extremes-means recognition table** (8:12::10:15 → 120 = 120 both 2:3; 21:14::33:22 → 462; 9:4::27:12 → 108; the failing row 6:10::9:16 — 96 ≠ 90) + **the flip Caution** (3 : 5 :: 10 : 6 false, 18 ≠ 50 — multiply the terms in their printed seats); **the test-and-fill engine**: **equation tag 2** (a : b = c : x ⟹ x = bc/a — the missing term is the means' product divided by the term opposite it; every seat has its own dress); Illustrations — the test pass 45 : 63 :: 35 : 49 (products 2205 both; both ratios 5 : 7) and the test fail 30 : 42 vs 24 : 35 (1050 ≠ 1008); the fourth seat 8 : 12 = 10 : □ → 15; the 6-9-12 fourth → 18; **the harder first seat** □ : 24 :: 30 : 45 → first 16; **the unit-rate identity** (the fill engine IS the one-part engine's third dress — 10 × 12/8 = 15 the same scaling; the cross law survives unfriendly numbers: 45x = 720 → 16) + **the gatekeeper** (rival stall 4 kg for Rs 120 → 120 : 4 = 30 ≠ 32 — off the shop's line); **alternendo and invertendo proved free** (a : c :: b : d cross-multiplies to the SAME two products ad and bc; b : a :: d : c flips both — verified: 3 : 5 :: 6 : 10 → 3 : 6 :: 5 : 10 both 1 : 2 and → 5 : 3 :: 10 : 6 both 5 : 3 — two lines each because the cross law compresses everything into ad = bc); **continued proportion** (a : b :: b : c — the middle term in BOTH mean seats) with **the mean proportional** b² = ac, b = √ac > 0 (**formula card**; Illustration 8 & 50 → 20, check 8 : 20 = 2 : 5 = 20 : 50; the **arithmetic-mean Caution** — between 5 and 45 the average 25 does NOT finish the chain, only 15 does: averages add, proportions multiply; positivity named — the negative algebraic root is not a proportional) and **the third proportional** x = b²/a (**formula card**; Illustration to 8 and 12 → 18; 4 and 6 → 9 in prose); **proportion at work**: **figure 2: the line of agreement** (the Rs 32/kg double ruler — kg 0–8 over Rs 0–256 at 80 px per kg, dashed connectors, dots on (3, 96), (5, 160), (8, 256), two proportion brackets reading 3 : 5 :: 96 : 160 and 5 : 8 :: 160 : 256 with the cross-law arithmetic in the caption (480 = 480; 1280 = 1280); audit 0 issues FIRST pass, VLM 10/10 math + 9/10 clarity); the **tea Illustration** (5 kg → Rs 480, 8 kg → Rs 768 — cross law 5x = 3840 AND unit-rate engine 96 × 8, the same answer twice); **the off-line gatekeeper paragraph launching 6.4** (the line forces quantities to grow TOGETHER — double the rice, double the price — direct variation named as next lesson's business); **properties of proportions** (6 bullets: statement-not-number, order part of the claim 80 ≠ 180, alternendo, invertendo, the law runs both ways, the mean in both seats — each with a verified instance); exam corner (NCERT class-6 ch. 12 §12.2 + Ex. 12.2 canon — definition, :: notation, extremes/means — + class-7 ch. 8 bridge + Khattar staples; SSC/bank/RRB/CUET/NTSE shapes — test, fill any seat, name the couples, mean/third proportional, extend-a-rate word problems); 7 new terms (Proportion, Extremes, Means, Fourth proportional, Continued proportion, Mean proportional, Third proportional), 3 formula cards (the fourth proportional lives as equation tag 2), 2 equation tags + 1 derivation, 9 illustrations, 2 figures (0 audit issues), 5-quiz (0/1/2/3/2 verified live 5/5), 12 exercises L1–L6 — L6 carries the recovered partner (mean 20, one number 16 → other 25 via 20² = 16c) and alternendo proved + verified; **RUN-OPENER NOTE: the 13:18 delivery died before starting work — every filesystem tool call failed (Bash/Read/Glob) while internal tools responded; blocker reported in-session per protocol (tree clean, 0 unpushed, PAT untouched); this delivery recovered on the restarted sandbox**; verify-unit-6.ts extended 165 → **253 checks** (V–AE) ALL PASS pre-writing — the audit caught 3 of the run's own check bugs (a nonsense W6 instance, a 516-for-518 colon typo, a reversed 496−540 gap); post-writing drift reconciled (quiz Q5 renumbered 18/24/36 → 12 to avoid duplicating the 24/30/45 Illustration; L5a renumbered to 12 & 18 → 27; formula cards honestly 3; properties order-flip instance added as W10); 4 TS2367 literal-comparison errors in new check lines rewritten as computed expressions; regressions 455/330/260/165; lint + tsc clean; production build 26 lesson pages; routes 200/200/404; E2E extended to **16 lessons** + a dedicated 6.3 block (7 caps-over-rule headings, 9 Illustration pills, 21 Sol. pills ALL inline, 27 step rows, badges 0, thereforeTags 33 with exercises, legacy boxes 0, note boxes Definition/Theorem/Caution ×2 + 3 Remember cards + Exam corner, KaTeX 291, dollarInSvg 0, 2 svg figures, quiz 5/5 live with 0/1/2/3/2, 12/12 expand, 36 collapsibles, 390px exact-fit, console clean); **VOICE POLISH 1.3** (queued per-run extra, 1.3 third): the formal Definition callout "The rounding rule" (is-said-to-be shape + the deciding digit named + the midpoint convention) + the roman run (43 → 40, 47 → 50, 45 → 50 — every number reused from the lesson's own text, zero new numerals) + the Thus-line handing the rule to figure 1's geometry; totals: **26 lessons / 123,621 words / 171 terms / 130 quiz items / 269 exercise questions**, ch. 6 open 3/5, next 6.4 Direct and Inverse Variation; logged; pushed (protocol v2) |
| 11-04 (run 28, cron Job 498279) | (platform fix + reconciliation) | **OBJECTIVES MATH FIX + SANDBOX-ROLLBACK RECONCILIATION** — run open found local HEAD `d505977` with run 27's whole 6.2 work sitting uncommitted while its Git: block claimed ship `d98ba02` + bookkeeping `0380e71` pushed (both SHAs nonexistent locally); **anonymous ls-remote returned remote HEAD `d920f20`** — run 27 HAD pushed four commits (`d98ba02` ship / `0380e71` inventory / `dc0a489` push-verification memory / `d920f20` WORKLOG-record completion) and the sandbox was then restored to a **pre-commit disk snapshot**, deleting the local objects while the remote kept them; reconciled by anonymous fetch + `git diff FETCH_HEAD` (working tree matched the remote exactly except this run's fix) + reset --hard + origin/main tracking-ref resync — run-27's logs verified **verbatim-true, zero corrections**; the untracked `app-shell.tsx` leftover (index-deleted since v2, resurrected by the snapshot restore) removed; **the fix:** VLM review of fresh E2E screenshots flagged raw LaTeX in 6.2's objectives box — `lesson-view.tsx` rendered `lesson.objectives` as plain `<li>{o}</li>`, the one header surface that never passed the math renderer; repo-wide scan (`scripts/check-objectives-math.py`, kept as tooling) found exactly **two affected objectives** (6.1's ratio $a : b$ vs fraction $a/b$; 6.2's $\tfrac{5}{18}$ km/h ↔ m/s law); objectives now render through the same **RichText** used by every block; verified: lint clean, tsc clean, production build SSG (25 lesson paths), prod routes 6.2/5.1 200 + unknown 404, objectives KaTeX 1 node (6.2) / 2 nodes (6.1) with zero raw-TeX leakage, full **15-lesson E2E green** (badges 0, legacy boxes 0, KaTeX counts unchanged, mobile 390px exact-fit), quiz live beyond the harness's score read-race (5.1 manual replay with correct indices 1/2/3/1/2 → "You scored 5/5 · perfect"; 6.2 answered live 5/5), VLM double-ruler re-check 10/10 math + 9/10 clarity; no content numbers changed — render-path fix only; logged; pushed (protocol v2) |
| 11-04 (run 32, cron Job 498279) | (ship) | **LESSON 6.5 Scaling: Maps, Models and Recipes — CHAPTER 6 CLOSED (5/5)** — scale in three dresses, RF 1 cm : 18 km = 1 : 18,00,000, atlas bar-scale figure (road exactly four bar-segments long), photocopy insight, model van 1 : 24, area law (areas carry m²), recipe multiplier + khichdi table, clock-is-not-an-ingredient Caution; unit-6 completion review; details in WORKLOG.md |
| 11-04 (run 33, cron Job 498279) | (ship) | **CHAPTER 7 OPENED: LESSON 7.1 Negative Numbers and Why They Exist** — the two-direction failure + the chosen zero, ℤ as tag 1 + ℕ ⊂ W ⊂ ℤ as tag 2, the ordering law with the −8 < −3 trap, opposites via the double reflection, absolute value's first look, elevation-section figure, rods-to-Brahmagupta-to-Descartes historical callout; 70 verify checks; site-wide raw-$ Illustration-title leak fixed in ExampleBlock; details in WORKLOG.md |
| 11-04 (run 34, cron Job 498279) | (ship) | **LESSON 7.2 Adding and Subtracting Integers** — the movement model, five-case sign table, subtraction as adding the opposite (tag 2), double-sign table, two-panel walk + subtraction-map figures, Brahmagupta's subtraction verses; 148 verify checks; details in WORKLOG.md |
| 11-04 (run 35, cron Job 498279) | (ship) | **LESSON 7.3 Multiplying Integers and the Sign Rules** — the repeated-walk model, the staircase + distributive derivations of minus-times-minus (tags 1–2), six properties, sign parity, Brahmagupta's multiplication verses; 231 verify checks; details in WORKLOG.md |
| 11-05 (run 36, cron Job 498279) | (finish + ship + queued extra + chapter close) | **LESSON 7.4 Absolute Value as Distance — CHAPTER 7 CLOSED (4/4)** — finished from the in-flight auto-checkpoint `ab19d64` per standing rule 0 and shipped in the Cengage voice + solution chain, 4,207 words: the distance Definition callout (is-said-to-be) + the piecewise rule as equation tag 1 + the roman run |7| |−11| |0|; the rule's derivation (distance is a count — never negative; the mirror twin −x; both lines meeting at |0| = 0); figure 1 the distance-from-zero braces (|−8| = 8, |5| = 5 at 40 px/step); ordering-by-magnitude cash of 7.1's trap; the five properties with grid certificates (mirror sweep on [−60,60]; multiplicative on 441 pairs; triangle fact with the equality condition ab ≥ 0 brute-forced); the outside-minus Caution; figure 2 the two-panel distance-between-points (opposite sides |5−(−3)| = 8 = 3 + 5; same side |7−2| = 5 nested braces); the distance formula gap(a,b) = |a−b| = |b−a| as tag 2 CASHING every counted gap (the lift 9 both orders, the mall 12/24, the Everest–Dead Sea 9288.64 m, the Vostok–Phalodi 140.2°); the |x| = k verdict table (two/one/none) + the bars-erase-one-bit insight; the historical callout (Argand 1806 modulus; Weierstrass 1841 bars, MacTutor-grounded); 8 terms, 5-quiz keys 2/1/0/1/3 live 5/5 · perfect, 12 exercises L1–L6 (L6 the distance derivation at (−5,8); the equality condition proved by cases); verify-unit-7.ts 231→**302 checks** (AC–AH) ALL PASS pre-writing; unit-7 completion review passed (ids unique, totals recomputed: ch. 7 = 16,720 words; book = 32 lessons / 150,259 words / 217 terms / 160 quiz / 341 exercises), ch-07 status **complete** + summary corrected, book.ts catalog appended; audits 0/0 both figures; VLM 10 math/9 clarity each; 22-lesson E2E sweep exit 0 + dedicated 7.4 block (mobile 390 exact-fit, console clean); **voice polish 3.1** (the is-said-to-be treaty callout + Thus-line at 6 | 48, zero new numerals, live-verified); stale top-level library counters corrected (26/133,379/171 → 32/150,259/217); logged; pushed (protocol v2, one-time URL from the 01:27 payload) |
| 11-05 (run 37) | (ship) | **LESSON 8.1 Points, Lines and Planes — CHAPTER 8 OPENS** — 104 pre-writing checks (verify-unit-8.ts created, A–N), 5,245 words, two figures 0-audit, VLM-reviewed to the bar; details in WORKLOG.md and §7 |
| 11-05 (run 38) | (ship) | **LESSON 8.2 Angles and Their Measurement** — 189 checks (O–W), 4,560 words, five-sizes gallery + protractor figures, quiz live 5/5; details in WORKLOG.md and §7 |
| 11-05 (run 39) | (ship) | **LESSON 8.3 Parallel Lines and Transversals** — 253 checks (X–AE), 5,114 words, the eight-angle scene + F/Z/C patterns, quiz live 5/5; details in WORKLOG.md and §7 |
| 11-05 (run 40) | (ship + repair + queued extra) | **LESSON 8.4 Triangles and the Angle Sum** — PRE-FLIGHT REPAIR of run 39's unescaped-apostrophe book.ts (dev 500) + e2e-83 reconstruction; 339 checks (AF–AN); 5,382 words; the angle sum DERIVED through the parallel XY, the exterior angle, classification, the triangle inequality swept over all 5,832 integer triples; VLM 9/9/9; quiz live 5/5; voice polish 3.5; details in WORKLOG.md and §7 |
| 11-05 (run 41, cron Job 498279) | (ship + chapter close + unit review + queued extra) | **LESSON 8.5 Perimeter and Area of Rectangles, Triangles and Circles — CHAPTER 8 CLOSED (5/5)** — authored in the Cengage voice + solution chain, 5,998 words: see the header narrative above; 429 pre-writing checks (AO–AZ, 90 new); E2E 27 lessons + dedicated 8.5 block (quiz live 5/5); SVG audits 0/0/0 FIRST pass; VLM 10/9, 9/8, then figure 3 redesigned to the flush construction and re-reviewed 9/9; unit-8 completion review passed (totals recomputed, ch-08 → complete); voice polish 4.1 + the Rs-tfrac katex repair (queue empty); new citation keys ncert-math6-gp-ch6 + ncert-math7-ch11; logged; pushed (protocol v2) |
| 11-04 (run 27, cron Job 498279) | (ship) | **LESSON 6.2 Rates and Unit Rates — THE BOUNDARY CROSSED ON PURPOSE** — authored in the Cengage voice + solution chain, 4,152 words: the opening names 6.1's same-kind boundary and crosses it deliberately (the grocer weighs rupees against kilograms, the driver counts kilometres against litres, the typist races words against minutes — the units can no longer cancel, so they ride); **Definition callout 'Rate'** in the formal shape (different kinds, division, *per* = "for each", units attached — a rate is NOT a pure number) as **equation tag 1** with the two-direction note (18 km/L vs its twin 1/18 L/km); the roman run of rates in the wild (Rs 40/kg → 120 kg costs 4,800; 18 km/L → 3 L carries 54 km; 72 wpm → 360 words in 5 min; 60 beats/min → 45 beats in 45 s), each with the rate × quantity read-back; **the unit rate** as the one-part engine of 5.3/6.1 wearing units (Illustration Rs 96 for 3 kg → Rs 32/kg with the rebuild check; **formula card**; the **scale-to-friendly-unit road** — Rs 22.50 per 250 g ×4 → Rs 90/kg, no decimal division, 6.1's equivalence family in rate dress; the **inverse read** in prose — Rs 90 for 6 pens → Rs 15/pen → Rs 210 buys 14 pens); **comparing rates by the same-way law** (Illustration shops 96/3 = 32 vs 155/5 = 31 with the Rs 5 saving on the 5-kg buy; the **direction-fraud Caution** — Rs 32/kg vs 0.03125 kg/Rs face away and compare nothing; the **bulk-illusion Illustration** — 2 kg at Rs 30 vs 4 kg at Rs 30.50, the bigger sack dearer); **figure 1: one rate, two rulers** (0–5 kg locked to Rs 0–160 at 128 px per kg, dashed connectors, the constant Rs 32 step annotated; audit 0 issues FIRST pass, VLM 10/10 math + 10/10 clarity); **the recognition table** of five offers with the tie (A Rs 87/3 kg = B Rs 232/8 kg = Rs 29/kg — one unit rate in two sizes — and E the largest bag dearest at Rs 31: the bulk illusion caught in the act); **speed: the flagship rate** (the **Definition callout** — distance per time, uniform speed named; **equation tag 2** with the speed family — the two extra doors opened by ch. 2's balance licence; **formula card**; Illustration 240 km in 4 h → 60 km/h; **figure 2: the journey map** — four equal hourly cells of 60 km, uniform speed drawn, audit 0 issues FIRST pass, VLM 10/10 math + 10/10 clarity; the sprint Illustration 100 m in 12.5 s → 8 m/s — the definition never changes, only the units dress); **changing the units of a rate** (conversion factors as names for 1; the **km/h ↔ m/s law PROVED as a derivation block**: 1 km = 1000 m, 1 h = 3600 s → 1 km/h = 1000/3600 = 5/18 m/s (HCF 200 from ch. 3), the reciprocal 18/5 = 3.6; **formula card** with anchors 5 m/s = 18 km/h, 20 m/s = 72 km/h, 25 m/s = 90 km/h; Illustrations 72 km/h → 20 m/s and 12 m/s → 43.2 km/h); **rates at work** (the tank Illustration 5,400 L at 45 L/min → 120 min = 2 h; masons/couriers/printers as the same two-pedal engine); **average speed** (the **Caution**: total distance ÷ total time, the plain mean a fraud on unequal times; Illustration 120 km out at 60 + 120 km back at 40 → 240 km in 5 h → 48 km/h, NOT 50 — the mean would claim 250 km driven; **formula card**); **properties of rates** (5 bullets with verified instances); exam corner (NCERT class-6 ch. 12 Ex. 12.3 unitary-method canon + class-7 science Motion and Time + Khattar speed staples; SSC/bank/RRB shapes — best buys, the speed triad, the 5/18 drill, average-speed traps, pipe rates); 7 new terms (Rate, Unit rate, Unit price, Speed, Uniform speed, Average speed, Conversion factor), 4 formula cards, 2 equation tags + 1 derivation, 10 illustrations, 2 figures (0 audit issues), 5-quiz (1/0/1/2/1 verified live 5/5), 12 exercises L1–L6 — L6 carries the typists' 45 vs 50 wpm and the unequal-legs average (70 ≠ 75, the mean fraud exposed); **VOICE POLISH 1.2** (queued per-run extra, 1.2 second): the formal Definition callout "The comparison rule" (is-said-to-be shape — a is greater than b when the first differing seat on a left-to-right reading carries the larger digit; the deciding seat named, every seat to its right overruled) + the roman example run (9,999 vs 10,000; 98,341 vs 9,843; 4,589 vs 4,598) + the Thus-line handing the rule to the domination-bound proof — every number reused from the lesson's own text, zero new numerals; **verify-unit-6.ts extended 93 → 165 checks** (sections L–U) ALL PASS pre-writing (+ regressions 455/330/260/165; the audit caught the pens inverse-read being misplanned as an 11th Illustration — it lives in prose; U1 corrected); new citation key **ncert-sci7-motion**; E2E extended to **15 lessons** with a dedicated 6.2 block (8 caps-over-rule headings, 10 Illustration pills, 22 Sol. pills ALL inline, 30 step rows, badges 0, thereforeTags 30, legacy boxes 0, note boxes Definition ×2 / Caution ×2 + 4 Remember cards + Exam corner, KaTeX 117, dollarInSvg 0, 2 svg figures, quiz 5/5 live with 1/0/1/2/1, 12/12 expand, 36 collapsibles, 390px exact-fit, zero console errors); SANDBOX NOTE: quality gate again against the **PRODUCTION build** (dev-mode lesson routes 404 regression persists in this recycled instance — new lesson 200, old 200, bogus 404); the gitignored Drive survey rebuilt after the recycle before the inventory regen; totals: **25 lessons / 119,489 words / 164 terms / 125 quiz items / 257 exercise questions**, ch. 6 open 2/5, next 6.3 Proportion and Cross-Multiplication; logged; pushed (protocol v2) |
| 11-04 (run 25, cron Job 498279) | (ship + platform + unit review) | **LESSON 5.5 Percentage Change, Discounts and Simple Interest — THE PERCENT AT WORK (CH. 5 CLOSES)** — authored in the Cengage voice + solution chain, ~3,700 words: the opening ties 5.4's closing promise and names the discipline — **the one question "of what?"** (Note box: four named bases — original, cost price, marked price, principal); **Definition callout** (percentage change judged on the ORIGINAL, r = (N − O)/O × 100, Thus-line) + the roman run (250→300 = +20%; 48,000→44,640 = −7%; 800→720 = −10%); **the factor law as equation tag 1** (N = O(100 ± r)/100) **PROVED as a derivation block** (definition rearranged → distributivity → the bracket as one fraction → the HCF-trimmed brackets: +25% = ×5/4, −10% = ×9/10); Illustration 1 the salary (12,500 → 14,000 = 12% with the forward check ×112/100); **the two-base trap Caution** (+25% then −25% is not flat — the bases differ); Illustration 2 the round trip (Rs 8,000 × 5/4 → 10,000 × 3/4 → 7,500; net −6.25%); the return-ticket paragraph (undo = divide by the factor, never subtract the percent); **figure 1: the round-trip map** (12,500 → +20% ×6/5 → 15,000; the wrong −20% ticket lands 12,000 — five hundred short, amber dashed; the right ×5/6 ticket lands home; audit 0 issues FIRST pass, VLM 10/10 math + 9/10 clarity); **the r²/100 % law** named from the figure and PROVED in exercise L6 via chapter 2's (a+b)(a−b) identity (up r% then down r% multiplies to 1 − r²/10000, a net fall of r²/100 %); Illustration 3 the phone (Rs 15,000 after +20% → Rs 12,500 by the return ticket AND the unitary method at 120%); **profit/loss percent on the COST price** (Definition callout with the Thus-line; **equation tag 2** SP = CP(100 ± p)/100 — the ledger dress of the factor law; Illustration 4 the cycle 2,400 → 2,760 = 15%; the **wrong-base fraud Caution** — 360 judged on SP ≈ 13.04% answers a different question; Illustration 5 the fridge CP 12,000 recovered from SP 10,200 at a 15% loss by the return ticket AND the 85% ladder); **discount on the MARKED price** (Definition callout SP = M(100 − d)/100; Illustration 6 the sweater 1,600 → 1,360 with the backwards check; Illustration 7 the lamp 600 +40% markup −20% discount → 672 — the festival never undoes the markup); **the multiplier law Note** (successive changes MULTIPLY their factors: 1.40 × 0.80 = 1.12, a net +12% — percents never add across moving bases); **figure 2: the two-lane map** (CP 600 +15% → 690 and MP 750 −8% → 690: two percents, two bases, ONE selling price; audit 0 issues, VLM PASS math/layout/rendering); **simple interest from the one-percent-a-year unit** (I = PRT/100 **PROVED as a derivation block** from 5.4's percent-of + repeated addition — R% of P for one year, T copies of the same rent because the base never moves; **equation tag 3** I = PRT/100, A = P + I; Illustration 8 the loan Rs 5,000 at 8% for 3 years → Rs 1,200, amount Rs 6,200; Illustration 9 the rate recovered 900 = 120R → R = 7.5%; the **per-annum trap Caution** — T strictly in years, 8 months = 2/3, the silent mark-loser; the **"simple" promise Note** — flat rent on the original principal, compound interest the open door); 8 new terms (Percentage change, Cost price, Selling price, Marked price, Discount, Principal, Simple interest, Amount), 4 formula cards (the factor law / the ledger law / the discount law / simple interest), exam corner (NCERT class-7 §§8.5–8.6 + class-8 §§8.2–8.4 canon; the SSC/bank/Railway staples per Khattar; the five classic traps); 9 illustrations, 2 figures (0 audit issues), 5-quiz (0/1/1/2/3 verified live 5/5 perfect + VLM screenshot of the score bar), 12 exercises L1–L6 — L6 proves the r²/100 % law and works the halving chain (Rs 12,000 at 6.25% for 2½ years = Rs 1,875 by 12,000/16 × 2.5); **PLATFORM CATCH: the RichText parser matched **…** before the $…$ it enclosed, so math inside bold/italic never rendered (raw $…$ leaked into the page) — a repo-wide scan found 12 latent instances across chs. 2–5 (7 pre-existing, live since their ships); fixed by making the bold/italic branches recurse into RichText — zero content edits, all 12 repaired; verified 0 raw-$ leaks on the SSR HTML**; verify-unit-5.ts 394 → **455 checks** (BT–CC) ALL PASS pre-writing (+ regressions 330/260/165; the pre-writing audit caught 3 real defects — a malformed BT4 fraction check, a BU2 M()-scaling error, a BW4 float slip — before any content existed); E2E extended to **13 lessons** with a dedicated 5.5 block (4 caps-over-rule headings, 9 Illustration pills, 9 Sol. pills ALL inline, 32 step rows, badges 0, thereforeTags 27, legacy boxes 0, KaTeX 229, dollarInSvg 0, quiz 5/5 live, 12/12 expand, 390px exact-fit, console clean); **UNIT-5 COMPLETION REVIEW PASSED** (BOOK_FORMAT checklist 7/7; exam-coverage 5/5; ids unique; ch-05 status → complete; plannedLessons emptied; book.ts STATUS/notes updated); totals: **23 lessons / 110,548 words / 150 terms / 115 quiz items / 233 exercise questions**, ch. 5 CLOSED 5/5, next chapter 6 Ratio, Rate and Proportion; logged; pushed (protocol v2) |
| 11-04 (run 24, cron Job 498279) | (ship) | **LESSON 5.4 Percent and Its Meaning — THE STANDARDISED DRESS** — authored in the Cengage voice + solution chain, 3,769 words: the opening (one denominator for everyone — the standardised denominator as the common currency of fractions; per centum etymology + the % sign historical callout from the Italian per-cento ledgers through "P c°"); **Definition callout** ("x is said to be expressed as a percent when…", Thus-line, the % sign an instruction to divide by 100 not a unit) + the roman example run (35% = 7/20; 8% = 2/25; 120% = 6/5 legal beyond the whole; 0.5% = 1/200); **figure 1: the 100-square** (10 × 10 grid at 30px cells, 35 shaded as the 25% + 10% benchmark build with amber brackets + legend + three-dress strip; audit 0 issues FIRST pass, VLM 9/10 math + 8/10 clarity — its one bracket-alignment complaint DISPROVEN by exact DOM measurement: rail 2 right end = 280 = shaded block right edge); **the two-hop law as equation tag 1** (x% = x/100; p = x/100 ⟺ x = 100p) **PROVED as a derivation block** (definition → x/10² as the point-shift of 5.3 at k = 2 → the reverse reading; exact, no rounding); Illustrations 1–3 (35% → 7/20 by the HCF; 7/8 → 0.875 → 87.5% by the atom test + two hops; 0.065 → 6.5% NOT 65% — one room = a factor of ten); **the 33 1/3% Caution** (33 1/3% = 1/3 exactly, 33.3% = 333/1000 a thousandth short); **figure 2: the conversion map** (FRACTION/DECIMAL/PERCENT stations, the step machine (5.2) forward + the place reading (5.1) back, × 100 / ÷ 100 two-room arrows, the direct-hop arc, worked strip incl. 1/3 = 0.(3) = 33 1/3%; audit 0 issues, VLM 9.5/10 + 9/10); **percent-of as equation tag 2** (x% of A = (x/100) × A; A = part × 100/x — the unitary method in percent dress) + **the benchmark ladder table** (100/75/50/25/20/12.5/10/5/1% with fraction + decimal dresses) + the halving chain explained by the atoms (100 = 2² × 5² — the fives never block a halving: 12.5% = 1/8, 6.25% = 1/16, 3.125% = 1/32); Illustrations 4–6 (15% of 460 = 69 by benchmark build AND direct dress; 348/500 = 69.6% — cancel 100/500 = 1/5 then the step machine; 8% of n = 56 → 1% = 7 → n = 700, the unitary method returned with the forward check closing the loop); the roman word-problem run (33% of 600 = 198 pass mark, 210 clears by 12 = 2% of the paper; 60% of 45 = 27 boys + 18 girls = 45; 30% of Rs 18,500 = Rs 5,550 saved, Rs 12,950 left); **the commutativity gem Note** (x% of y = y% of x — flip the ugly percent onto the friendly number); 7 new terms (Percent, The % sign, Standardised denominator, Two-hop conversion, Percent of a quantity, Benchmark percents, The 1% unit), 3 formula cards (percent definition / two-hop conversion / percent-of + the whole), exam corner (the halving chain prices 512 and 640 in one step; the standing traps 0.5% ≠ 50%, 120% legal, 33 1/3% exact); 6 illustrations, 2 figures (0 audit issues), 5-quiz (0/1/1/2/2 verified live 5/5 perfect), 12 exercises L1–L6 — L6 proves the gem and works the halving chain (6.25% of 512 = 32; 3.125% of 640 = 20); verify-unit-5.ts 341 → **394 checks** (BK–BS) ALL PASS pre-writing (+ regressions 330/260/165; the pre-writing audit caught 2 real defects — a float artifact in BP4 and a wrong kill-condition in BQ4 — before any content existed); E2E extended to **12 lessons** with a dedicated 5.4 block (6 Illustration pills, 6 inline Sol. pills, 22 step rows, badges 0, thereforeTags 18, legacy boxes 0, KaTeX 229, dollarInSvg 0, quiz 5/5 live, 12/12 expand, 390px exact-fit, console clean); totals: **22 lessons / 104,922 words / 142 terms**, ch. 5 in progress 4/5; logged; pushed (protocol v2) |
| 11-04 (run 23, cron Job 498279) | (ship) | **LESSON 5.3 Operating on Decimals — THE DRESS GOES TO WORK** — authored in the Cengage voice + solution chain, 4,462 words: the opening (like units only — the idea that governed the fractions governs the point), **addition and subtraction by aligning the points** (the point as the fencepost that fixes the columns; Definition callout with Thus-restatement; Illustration 1: 15.75 + 8.4 + 0.905 = 25.055 with the licence padding; Illustration 2: 34.6 − 18.87 = 15.73 with the borrow chain walking across the point; **the inverse test Note** — every subtraction checked by one hidden addition; **the digit-add fraud Caution** 0.9 + 0.09 + 0.009 = 0.999, not 0.27), **multiplication as engine + count** (stage one the whole-number engine, stage two the places-add law as equation tag 1: (a/10^j)(b/10^k) = ab/10^(j+k)); **the places-add rule PROVED as a derivation block** (fraction reading → 4.2's multiplying rule → the law of powers; alignment never enters the argument — that is why none is needed); Illustration 3: 3.42 × 5.6 = 19.152; the roman run ending whole (0.3 × 0.2 = 0.06; 0.75 × 0.4 = 0.3; 12.5 × 0.08 = 1); **the point-shift rule** (× 10^k hops k rooms right, ÷ 10^k k left) with **figure 1: the point-hops ladder** (seven rooms thousand→thousandth, 4.75 in place, amber climb/slide arrows + the worked strip; audit 0 issues FIRST pass, VLM 10/10 math + 9/10 clarity); **the max-places fraud Caution** (1.5 × 2.25 = 3.375, not 33.75 — the sum-vs-max slip costs exactly a factor of 10) and the **counting-places-counts-the-dress Note** (48.50 wears one true place; 48.50 × 3.5 = 169.75, not 16.975), **division: the step machine continued** (the quotient's point rides the dividend's; Illustration 4: 128.76 ÷ 12 = 10.73; **figure 2: the full tableau** with amber point-drop + bring-down arrows; audit 0 issues FIRST pass; the VLM's two alignment complaints DISPROVEN by DOM measurement — both point circles cx = 420.0 exactly, quotient digits at exact 48px pitches); **clearing the divisor** (the scaling law as equation tag 2; Illustration 5: 16.24 ÷ 2.8 = 5.8; the 9.1 ÷ 5 = 1.82 past-the-point step and the dresses-theorem tie for the never-landing case); **the ÷ 100 fraud Caution** (45.6 ÷ 100 = 0.456, not 4560 — the hop has a direction); **word problems: money (the fixed 2-place dress) + the bill Illustration** (42.75 + 18.60 + 96.05 = 157.40; change 42.60), length/mass roman run (2.4 kg ÷ 6 = 0.4 kg; 3.75 m ÷ 0.25 m = 15 pieces; 7.5 cm − 42 mm = 3.3 cm) and **the unitary method** (18.6 km on 1.5 L → 12.4 km/L; 4 L → 49.6 km); 7 new terms (Aligning the points, Borrowing across the point, Whole-number engine, Places-add rule, Point-shift rule, Clearing the divisor, Unitary method), 3 formula cards (alignment / places-add / clearing), exam corner (the one-engine hop family 0.45 × 0.067 = 0.045 × 0.67 = 4.5 × 0.0067 = 0.03015); 6 illustrations, 2 figures (0 audit issues), 5-quiz (2/1/2/0/1 verified live 5/5 · perfect), 12 exercises L1–L6 — L6 proves the places-add rule from the fraction reading + the termination deduction (terminating × recurring recurs: 0.5 × 0.3̄ = 0.16̄); verify-unit-5.ts 273 → **341 checks** (AD–BJ) ALL PASS pre-writing (+ regressions 330/260/165); E2E extended to **11 lessons** with a dedicated 5.3 block (6 inline Sol. pills, 18 with exercises, 30 ∴ tags, KaTeX 248, dollarInSvg 0, badges 0, legacy boxes 0, 12/12 expand, 390px exact-fit, zero console errors); totals: **21 lessons / 101,153 words / 135 terms**, ch. 5 in progress 3/5; logged; pushed (protocol v2) |

## 4. Content written so far (the actual textbooks)

**Library plan:** 11 disciplines · **281 backlog titles listed, 280 remaining** (SUBJECT_BACKLOG.md:
book #2 Arithmetic and Number Systems promoted run 48)
· promotion rule: a backlog book becomes real only after its research phase.
**Live today: 2 books — Foundation Mathematics COMPLETE (11/11 chapters, 48
lessons, 227,569 words, 355 flashcard terms) + Arithmetic and Number Systems
IN PROGRESS (ch. 1 in progress: 2 of 3 lessons written, 10,345 words / 16 terms /
10 quiz / 24 exercises; 8 chapters still planned)** (regenerated 11-05, run 49).

### Foundation Mathematics — mathematics shelf · **COMPLETE (11/11 chapters, run 47)**

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

**LESSON 4.4 (run 19, cron Job 498279):** "Adding and Subtracting
Fractions" — 4,916 words, the third lesson authored natively in the
Cengage voice + solution chain; 4.3's quiet calculation (14/24 + 1/24 =
15/24) promoted to a method. Content: like-ruler addition/subtraction as
pooling counts (formal definition callout with symbolic Thus-restatement,
the distributive one-line proof — Lesson 2.2 returning, the walk-on-the-
line reading, a verified properties list: commutativity 1/4 + 1/6 =
1/6 + 1/4, associativity on the 18-ruler 15 + 2 = 9 + 8 = 17, identity
0, subtraction's failure repeating), the simplify-always habit (6/9 →
2/3, 2/8 → 1/4, 8/10 → 4/5) and sums passing the whole (12/8 = 3/2),
the **straight-across fraud Caution** (1/2 + 1/3 ≠ 2/5 — the fake answer
is the mediant, trapped strictly between the addends by 4.3's L6);
unlike rulers with the **LCM as standard equipment** (1/4 + 1/6 = 3/12 +
2/12 = 5/12 with the five-bar figure — contributions stacked on the sum
bar, boundary dashed, the 3-twelfths shading proving the raising
invariant at 155 px; the product ruler agreeing on 7/12 + 3/10 = 53/60
via 35 + 18 = 70 + 36; lists on one ruler), two formula cards
(like-ruler ± and the LCM method); **subtraction as gap-naming**
(5/8 − 7/12 = 15/24 − 14/24 = 1/24 — Lesson 4.3's extra twenty-fourth
now an answer, licence check (60 − 56)/96 = 4/96, the number-line figure
whose arc is exactly 1/24 of the unit = 28.33 px), complements
(1 − 5/9 = 4/9; tank 7/12 full → 5/12 empty) and the legality boundary
(3/8 − 5/8 names no gap); **mixed-number storeys** with overflow
(2 3/4 + 1 1/2 = 4 1/4 via 5/4 = 1 1/4; improper route 17/4 agrees) and
underflow (3 1/5 − 1 2/5 = 1 4/5 via 2 6/5) and the regrouping
definition callout; **Egyptian two-term openings** — 4.1/4.2's promise
cashed by the greedy split: compare (1/3 > 3/10 > 1/4), subtract
(6/20 − 5/20 = 1/20), so 3/10 = 1/4 + 1/20, with 5/6 = 1/2 + 1/3 and
the non-greedy 1/5 + 1/10 noted; six-row toolkit table, three-laws
equation, exam corner (remainder items 1 − 13/20 = 7/20, fill-and-empty,
mixed quantities; LCMs 12/20/24/60 on sight); 7 illustrations, 2 figures
(0 audit issues FIRST pass each), 6 new terms (Like fractions, Unlike
fractions, LCM method, Regrouping, Complement, Greedy split), 5-quiz
(1/2/2/1/0), 12 exercises L1–L6 — L6 proves the like-ruler rule by
distributivity and the **straight-across fraud theorem**
(true sum − mediant = (ad² + b²c)/(bd(b+d)) > 0). verify-unit-4.ts
199 → **261 checks** (sections AA–AH) ALL PASS pre-writing; E2E extended
to 7 lessons — 7 Sol. pills ALL inline, stepNumberBadges 0, 21 KaTeX ∴
glyphs, KaTeX 162, quiz 5/5 live (indices 1/2/2/1/0), 12 solutions
expand, 390px exact-fit, zero console errors, figures reviewed directly;
totals: **17 lessons / 80,762 words / 108 terms**; logged; pushed
(protocol v2).

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

#### Chapters 4–11 — shipped (unit cadence, runs 20–47)

| # | Chapter | Planned lessons |
|---|---|---|
| 2 | The Four Operations — **COMPLETE** | ~~2.1 Addition and the Art of Carrying~~ **WRITTEN** · ~~2.2 Subtraction and Borrowing~~ **WRITTEN** · ~~2.3 Multiplication as Repeated Addition — and Beyond~~ **WRITTEN** · ~~2.4 Division, Remainders and Why Zero Never Divides~~ **WRITTEN** · ~~Order of Operations and the Language of Expressions~~ **WRITTEN** |
| 3 | Factors, Multiples and Primes — **COMPLETE** | ~~Divisibility and Its Tests~~ **WRITTEN** · ~~Prime Numbers and Factorisation~~ **WRITTEN** · ~~Highest Common Factor~~ **WRITTEN** · ~~LCM~~ **WRITTEN** · ~~HCF, LCM and How They Relate~~ **WRITTEN** |
| 4 | Fractions — **COMPLETE (5/5, run 20)** | ~~The Idea of a Fraction~~ · ~~Equivalent Fractions and Simplification~~ · ~~Comparing Fractions~~ · ~~Adding/Subtracting Fractions~~ · ~~Multiplying/Dividing Fractions~~ — all **WRITTEN** |
| 5 | Decimals and Percents — **COMPLETE (5/5, run 25)** | ~~Decimal Places and the Point~~ · ~~Decimals↔Fractions~~ · ~~Operating on Decimals~~ · ~~Percent and Its Meaning~~ · ~~Change, Discounts, Simple Interest~~ — all **WRITTEN** |
| 6 | Ratio, Rate and Proportion — **COMPLETE (5/5, run 32)** | ~~Ratio as a Comparison~~ · ~~Rates and Unit Rates~~ · ~~Proportion and Cross-Multiplication~~ · ~~Direct/Inverse Variation~~ · ~~Scaling: Maps, Models and Recipes~~ — all **WRITTEN** |
| 7 | Integers — **COMPLETE (4/4, run 36)** | ~~Negative Numbers and Why They Exist~~ **WRITTEN (run 33)** · ~~Adding and Subtracting Integers~~ **WRITTEN (run 34)** · ~~Multiplying Integers and the Sign Rules~~ **WRITTEN (run 35)** · ~~Absolute Value as Distance~~ **WRITTEN (run 36)** |
| 8 | Geometry Foundations — **COMPLETE (5/5, run 41)** | ~~Points/Lines/Planes~~ **WRITTEN (run 37)** · ~~Angles~~ **WRITTEN (run 38)** · ~~Parallel Lines and Transversals~~ **WRITTEN (run 39)** · ~~Triangles and the Angle Sum~~ **WRITTEN (run 40)** · ~~Perimeter and Area of Rectangles, Triangles and Circles~~ **WRITTEN (run 41)** |
| 9 | Measurement — **COMPLETE (4/4, run 44)** | ~~Units as Agreements~~ · ~~The Metric System~~ · ~~Converting Without Tables~~ · ~~Precision, Accuracy and Rounding~~ — all **WRITTEN (9.1 run 42; 9.2 + 9.3 run 43; 9.4 run 44)**; unit-9 completion review passed |
| 10 | Data and Graphs — **COMPLETE (4/4, run 46; unit-10 review passed)** | ~~Collecting and Tallying Data~~ **WRITTEN (run 44)** · ~~Bar/Line/Pie Charts~~ **WRITTEN (run 45)** · ~~Reading Graphs Critically~~ **WRITTEN (run 45)** · ~~Mean, Median, Mode~~ **WRITTEN (run 46)** |
| 11 | Patterns and the Doorstep of Algebra — **COMPLETE (3/3, run 47; unit-11 review passed — the book closes)** | ~~Patterns and Rules~~ **WRITTEN (run 46)** · ~~From Patterns to Formulas~~ **WRITTEN (run 47)** · ~~A Letter for the Unknown~~ **WRITTEN (run 47)** |

### Arithmetic and Number Systems — mathematics shelf · **IN PROGRESS (promoted run 48; ch. 1 COMPLETE 3/3 — runs 49–50)**

*Why arithmetic works — and how the number systems were built* · Upper primary →
first-year university bridge · accent teal · cover auto-generated.

The structural sequel to Foundation Mathematics: FM taught the operations; this book
proves why the operations obey the laws they obey, and how ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ were each
built to repair a closure failure. Research phase (run 48, 2026-11-05): reference
survey (Khattar QA 4e ch. 1 + Cengage M2/01 persisted; no downloads) + syllabus audit
(CAT/IPMAT number-system scope · Beck & Geoghegan *The Art of Proof* · OpenStax
*Contemporary Mathematics* §4.2 · Cambridge IGCSE CS 0478 §1.1 · NCERT class 6/8 canon)
+ the chapter plan below. `verify-book2-promotion.ts` 121/121; E2E green. **Authoring
began at ch. 1, run 49 (two lessons per run); chapter 1 COMPLETE at run 50 with the unit-1
completion review passed — 3 lessons / 16,921 words / 24 terms / 15 quiz / 36 exercises.**

| # | Chapter (slug) | Planned lessons |
|---|---|---|
| 1 | The Natural Numbers as a System (`natural-numbers-as-a-system`) — **COMPLETE 3/3** (runs 49–50) | 1.1 The Architecture of Counting: Successors and Order (5,010 w) · 1.2 Induction: Proving for Every Number at Once (5,332 w) · 1.3 The Least-Number Principle and Recursion (6,579 w) |
| 2 | The Division Algorithm and the Structure of Divisibility (`division-algorithm-and-divisibility`) | Division with Rest: The Division Algorithm · The Algebra of Divisibility · The Euclidean Algorithm, Proven — and Bézout's Identity · Linear Diophantine Equations |
| 3 | Positional Systems and Other Bases (`positional-systems-and-bases`) | The Representation Theorem: Every Number Has Exactly One Name · Converting Between Bases · Arithmetic in Other Bases · Binary, Hexadecimal and the Machine |
| 4 | Primes and the Fundamental Theorem of Arithmetic (`primes-and-the-fundamental-theorem`) | The Primes Never End: Euclid's Proof and the Sieve · The Fundamental Theorem of Arithmetic · Divisors from DNA: Divisor Counts and Factorial Zeros · How the Primes Are Distributed |
| 5 | Congruences: The Arithmetic of Remainders (`congruences`) | Remainders Become Numbers: Congruence Defined · Why the Divisibility Tests Work · The Unit Digit and Cycles of Powers · Linear Congruences and a Glimpse of Fermat |
| 6 | Building the Integers (`building-the-integers`) | The Closure Failures That Force Extension · Constructing the Integers from the Naturals · The Laws of Integer Arithmetic |
| 7 | Building the Rationals (`building-the-rationals`) | From Fractions to the Rational System · The Field Laws: Division Joins the Family · Density and the Decimal Mirror, Proven |
| 8 | Irrationals and the Real Line (`irrationals-and-the-real-line`) | The Diagonal of the Square: √2 Is Irrational · The Irrationals Are Everywhere · The Real Line: Order, Density and Completeness |
| 9 | Numeration Through History (`numeration-through-history`) | Tallies, Groupings and Additive Systems · Place Value Before Its Time: Babylon and Mesoamerica · The Indian Decimal Revolution and Zero |
| 10 | The Map of Number Systems (`the-map-of-number-systems`) | The Great Extension Story · Numbers That Guard Data: Checksums and Casting Out Nines · The Toolkit Synthesis |

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
| Unit 8 lesson 2 (FM ch. 8, lesson 8.2) | 11-05 | 85 new pre-write checks (189 total, sections O–W, ALL PASS before writing; the pair census n = 2..8, the 24-divisor enumeration of 360, the classification sweep 0..360, the supp − comp identity swept over every integer degree, every clock/equation cash re-derived, both figures’ label boxes swept ≥ 8 px from every stroke by exact point-to-segment distance) · lint · tsc clean · routes 200/200/200/404 · both figures 0 audit issues · VLM fig 1 9 math/9 clarity (publishable as-is); fig 2 9 math/8 clarity pass 1 with two REAL notes fixed (the crossing dot on the arc at (514.99,169.13) — the long 50° tick is collinear with the arm and hid beneath it; vertical end-stop ticks at 0/180) → pass 2 9 math/9 clarity publication-ready · 24-lesson E2E sweep exit 0 + dedicated 8.2 block (quiz keys 1/1/0/2/2 live "You scored 5/5", 12/12 solutions expand, 36 collapsibles, Sol. pills 17 inline, thereforeTags 15, KaTeX 338, dollarInText 0 after the derivation-label fix, katexErrors 0, rawDollarInSvg 0, tables 1, mobile 390 exact-fit docScrollW 390 articleW 358, console clean) · ids globally unique · voice polish 3.3 live-verified (is-said-to-be ×2, Thus-line, KaTeX 264, errors 0, dollarInText 0) |
| Unit 8 opener (FM ch. 8, lesson 8.1) | 11-05 | 104 pre-write checks (verify-unit-8.ts sections A–N, ALL PASS before writing; sweep machinery: the two-lines-at-most-one-point sweep over 15 slopes × 15 intercepts, the 441-pair length re-sweep, pair enumeration n = 2..8 + closed form to n = 20, line-classification enumerations incl. the 4-point-3-collinear pool to 4 lines and the parabola no-three-collinear certificate over all 56 triples) · lint · tsc clean · routes 200/200/200/404 · both figures 0 audit issues · VLM fig 1 9.5 math/9 clarity; fig 2 three passes (8 → 8 → 8 with every note cosmetic — (a)(b)(c) markers + enlarged l/m labels + solid double-headed arrowheads on all seven drawn lines added per review; the run-34 cosmetic-notes precedent) · 23-lesson E2E sweep exit 0 + dedicated 8.1 block (quiz keys 3/1/1/2/3 live "You scored 5/5", 12/12 solutions expand, 36 collapsibles, Sol. pills 17 inline, thereforeGlyphs 29, KaTeX 361, dollarInText 0, katexErrors 0, rawDollarInSvg 0, mobile 390 exact-fit docScrollW 390 articleW 358) · ids globally unique · voice polish 3.2 live-verified (is-said-to-be ×2, Thus-line, KaTeX 326, errors 0, dollarInText 0) |
| Unit 7 (FM ch. 7, lesson 7.4) + unit-7 completion review | 11-05 | 71 new pre-write checks (302 total, sections AC–AH, ALL PASS before writing; regressions 231/148/70) · lint · tsc clean · routes 200/200/200/404 · both figures 0 audit issues · VLM fig 1 10 math/9 clarity + fig 2 10 math/9 clarity · 22-lesson E2E sweep exit 0 + dedicated 7.4 block (quiz keys 2/1/0/1/3 live "You scored 5/5 · perfect", 12/12 solutions expand, 36 collapsibles, Sol. pills 8 inline, thereforeGlyphs 24, KaTeX 276, dollarInText 0, katexErrors 0, rawDollarInSvg 0, tables 1, mobile 390 exact-fit docScrollW 390 articleW 358, fresh-load console clean) · BOOK_FORMAT checklist 7/7 · ids globally unique · totals recomputed (ch. 7 = 16,720 words; book = 32 lessons / 150,259 words / 217 terms) · voice polish 3.1 live-verified (KaTeX 369, errors 0, dollarInText 0) |
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

| 22 | `43b1c86` (+ `00676d1`, `c830cd8`) | 11-04 | FM lesson 5.2 Decimals and Fractions, Two Ways (273 checks incl. 108 new, dresses theorem + 1/7 carousel, 5.1's 22/7 digits corrected) — pushed (protocol v2) | ~+5,900/−80 · 8 files |
| 23 | `6b0e99f` (+ `0ace05b`, `c35cfe0`) | 11-04 | FM lesson 5.3 Operating on Decimals (341 checks incl. 68 new, align-the-points + places-add + point-shift + clearing + unitary method, ladder + tableau figures) — pushed (protocol v2) | ~+4,900/−60 · 7 files |
| 24 | `b4f023d` (+ `26312a1`, `700ba0f`) | 11-04 | FM lesson 5.4 Percent and Its Meaning (394 checks incl. 53 new, x/100 definition + two-hop law + benchmark ladder + unitary return, 100-square + conversion map) — pushed (protocol v2) | ~+4,200/−50 · 7 files |
| 25 | `c265eb7` (+ `94f1962`, `b490cf7`) | 11-04 | FM lesson 5.5 Percentage Change, Discounts and Simple Interest — ch. 5 CLOSED (455 checks incl. 61 new; RichText parser upgraded: $math$ inside bold/italic, 12 latent leaks repaired site-wide; unit-5 completion review passed) — pushed (protocol v2) | ~+4,800/−70 · 9 files |
| 26 | `dcff4f6` (+ `adb18f9`, memory) | 11-04 | FM lesson 6.1 Ratio as a Comparison — ch. 6 opens (verify-unit-6.ts created, 93 checks A–K; 4,442 words; dots-family + sharing-map figures; voice polish landed on 1.1; quality gates run against the PRODUCTION build after dev-mode route regression in the recycled sandbox — bisected against pre-change code) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 27 | `d98ba02` (+ `0380e71`, memory `dc0a489`/`d920f20`) | 11-04 | FM lesson 6.2 Rates and Unit Rates — the boundary crossed on purpose (verify-unit-6.ts 93 → 165 checks L–U; 4,152 words; double-ruler + journey-map figures; voice polish landed on 1.2; new citation key ncert-sci7-motion) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 28 | `038805e` (+ `a78a30d`, memory `e3f1158`) | 11-04 | Objectives math fix (lesson-view objectives through RichText; 6.1 + 6.2 were the only math-bearing objectives) + sandbox-rollback reconciliation of run 27 (anonymous fetch + reset --hard; run-27 logs verified verbatim-true; app-shell.tsx leftover removed) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 30 | `407c0fe` + ship (+ bookkeeping, memory) | 11-04 | FM lesson 6.4 Direct and Inverse Variation — finished from the 15:18 delivery's in-flight auto-commit `407c0fe` (lesson + verify AF–AP + e2e registration authored; gates/bookkeeping/push missing): dedicated 6.4 E2E block written, both figures VLM-polished (one-arc flip → two crossing legs; label relocations; 361 checks), voice polish landed on 2.1, Drive survey rebuilt + inventory regenerated (27 lessons / 128,994 words) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 29 | `356a52b` (+ bookkeeping, memory) | 11-04 | FM lesson 6.3 Proportion and Cross-Multiplication — 6.2's closing question made official (verify-unit-6.ts 165 → 253 checks V–AE; 4,132 words; four-seats + line-of-agreement figures, 0 audit issues first pass; voice polish landed on 1.3; run-opener: the 13:18 delivery died on dead filesystem tools pre-work, recovered here) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 37 | ship + bookkeeping + memory | 11-05 | FM lesson 8.1 Points, Lines and Planes — chapter 8 OPENS (verify-unit-8.ts created, 104 checks A–N incl. the incidence sweep + the counting-law brute force; 5,245 words; three-avatars + meeting-layouts figures, fig 2 through three VLM passes with markers/labels/arrowheads added; voice polish landed on 3.2; new citation keys ncert-math6-ch4 + ncert-math9-ch5) — pushed (protocol v2) | see WORK_INVENTORY gitHistory |

| 38 | ship + bookkeeping + memory | 11-05 | FM lesson 8.2 Angles and Their Measurement — verify-unit-8.ts extended to 189 checks O–W (85 new); 4,560 words; five-sizes gallery + protractor figures (fig 2 through two VLM passes: crossing dot + end ticks added); the supp − comp = 90° identity derived; voice polish landed on 3.3; new citation key ncert-math6-gp-ch2 — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 39 | ship + bookkeeping + memory | 11-05 | FM lesson 8.3 Parallel Lines and Transversals — verify-unit-8.ts extended to 253 checks X–AE (64 new: the transversal facts derived geometrically via half-plane classification swept over six slopes; the three parallel tests swept as biconditionals over five slopes; both figures' label clearances swept); 5,114 words; the eight-angle scene + F/Z/C pattern figures (fig 1 through one REAL fix: the t-label relocated out of the title's band; audits 0/0 both; VLM 10/10+10/10 and 10/10+9/10); the corresponding-angles axiom presented as THE assumption + everything else derived; quiz keys 1/2/1/0/2 verified live 5/5; 12/12 solutions expand; 390px exact-fit; voice polish landed on 3.4; new citation keys ncert-math7-gp-ch5 + ncert-math9-ch6 — pushed (protocol v2) | see WORK_INVENTORY gitHistory |
| 40 | ship + bookkeeping + memory | 11-05 | FM lesson 8.4 Triangles and the Angle Sum + the pre-flight repair (escaped apostrophes, e2e-83/84 whitelisted) — verify-unit-8.ts 253 → 339 checks (AF–AN); 5,382 words; quiz live 5/5; voice polish 3.5; pushed per protocol (dedc21e, remote-verified) |
| 41 | ship + bookkeeping + memory | 11-05 | FM lesson 8.5 Perimeter and Area of Rectangles, Triangles and Circles — CHAPTER 8 CLOSED — verify-unit-8.ts 339 → 429 checks (AO–AZ); 5,998 words; figure 3 redesigned to the flush rearrangement after VLM 7/6 → 9/9; quiz live 5/5; unit-8 completion review; voice polish 4.1 + Rs-tfrac katex repair; new citation keys ncert-math6-gp-ch6 + ncert-math7-ch11; pushed per protocol |
| 42 | ship + bookkeeping + memory | 11-05 | FM lesson 9.1 Units as Agreements — CHAPTER 9 MEASUREMENT OPENS — verify-unit-9.ts CREATED (200 checks A–M; gitignore exceptions FIRST); 5,501 words; figure 1 redesigned after VLM 6/6 → 10/9 (numbered spans, shared rails, hooked braces); figure 2 10/9; quiz live 5/5 (keys 0/1/2/2/2); swap law derived + inverse law swept; new citation keys ncert-sci6-curiosity-ch5 + ncert-phys11-ch2; pushed per protocol |
| 43 | ship + bookkeeping + memory | 11-05 | FM lessons 9.2 The Metric System (4,529 words) + 9.3 Converting Units Without Memorising Tables (3,603 words) — THE FIRST TWO-LESSON RUN (job 504365) — verify-unit-9.ts 200 → 428 checks (N–AD); chapter 9 in-progress 3/4; fig redesigns: 9.2 fig1 ×2 → 10/8, 9.3 fig1 token-strikes → 10/9, 9.3 fig2 rebuild → 10/9; quizzes live 5/5 both; new citation keys wikipedia-metre-history, usma-1795-decree, sizes-litre-1964, ncj-measuring-the-meter; pushed per protocol |
| 44 | ship + bookkeeping + memory | 11-05 | FM lesson 9.4 Precision, Accuracy and Rounding in Measurement (5,770 words) — CHAPTER 9 CLOSED with the unit-9 completion review passed — + FM lesson 10.1 Collecting and Tallying Data (4,533 words; ch-10.ts created + registered) — THE FIRST TWO-CHAPTER RUN — verify-unit-9.ts 428 → 534 checks (AE–AO) + verify-unit-10.ts CREATED (81 checks A–I); 9.3's thrice-repeated paragraph reduced to one; fig work: 9.4 plumb-line redrawn twice → 10/9, four-targets four passes → 9/8, 10.1 fig1 four passes (chips numbered, arrow removed, ruled frequency column) + the caption's 14-vs-12 fix; quizzes live 5/5 both; new citation keys ncert-math6-ch1 + ncert-ganita-prakash6-ch4; book = 42 lessons / 200,476 words; pushed per protocol |
| 45 | ship + bookkeeping + memory | 11-05 | FM lesson 10.2 Bar Charts, Line Graphs and Pie Charts (4,331 words) + FM lesson 10.3 Reading Graphs Critically (4,062 words) — fired from the RE-ENABLED job 498279 (the stale one-lesson payload superseded by the two-lesson directive in memory; the duplicate-hourly-trigger logged for the owner) — verify-unit-10.ts 81 → 141 → 186 checks (J–Z2); laws derived: bar-scale + central-angle (10.2), exaggeration + scale-invariance (10.3); fig work: bar/line/pie labels re-laid after audits, the day-5 tick added, the pie's boundary degrees + counts added (the VLM ellipse claim disproven by DOM measurement), the mismatch gallery unified on the shared 8/6/4/2 data, the Y4 quiz key corrected from the live run; quizzes live 5/5 both; new citation keys ncert-math8-ch4 + huff-1954-lie-with-statistics; book = 44 lessons / 208,869 words; pushed per protocol |
| 46 | ship + bookkeeping + memory | 11-05 | FM lesson 10.4 Mean, Median and Mode — CHAPTER 10 CLOSED with the unit-10 completion review passed — + FM lesson 11.1 Patterns and Rules (chapter 11 OPENS; job 504365's first fully-executed fire); verify-unit-10.ts → Z-final + verify-unit-11.ts CREATED; pushed per protocol |
| 47 | ship | 11-05 | FM lesson 11.2 From Patterns to Formulas (3,931 words) + FM 11.3 A Letter for the Unknown (4,021 words) — CHAPTER 11 CLOSED, UNIT-11 COMPLETION REVIEW PASSED — FOUNDATION MATHEMATICS COMPLETE 11-for-11 (48 lessons / 227,569 words / 355 terms / 240 quiz / 534 exercises); verify-unit-11.ts 74 → 187 checks (P–Z, AA–AL); quiz keys 0/1/1/0/0 live 5/5 both; audits 0/0 all four figures; **run interrupted after the ship commit `08e2c74` but BEFORE the push — push debt inherited by run 48** |
| 48 | ship + bookkeeping + memory | 11-05 | (1) the pending run-47 push executed first (both commits, remote = `08e2c74` verified); (2) BOOK #2 PROMOTED: Arithmetic and Number Systems — research phase complete (survey + syllabus audit + 10-chapter/34-lesson plan), book.ts + registry + verify-book2-promotion.ts 121/121 + gates + E2E green; generator generalized (booksLive 2, backlog 280); 4 citation keys reserved — pushed per protocol |
| 49 | ship | 11-05 | BOOK #2 AUTHORING BEGAN — ANS ch. 1 lessons 1.1 The Architecture of Counting: Successors and Order (5,010 words) + 1.2 Induction: Proving for Every Number at Once (5,335 words), shipped verify-first (verify-book2-ch01.ts 124/124; quiz keys 2/0/0/1/1 + 0/1/2/1/3 live 5/5; audits 0/0 both figures; 10,345 words / 16 terms / 10 quiz / 24 exercises); book status → in-progress; new citation keys peano-1889-arithmetices + induction-name-history |
| 49 | memory | 11-05 | run-49 synced sha recorded (`fa9eb9d`) — remote-verified via one-time-URL ls-remote = local HEAD; next run 50 = ANS ch. 1 lesson 1.3 The Least-Number Principle and Recursion + the unit-1 completion review |
| 50 | ship + bookkeeping + memory | 11-05 | ANS ch. 1 lesson 1.3 + the unit-1 completion review — CHAPTER 1 COMPLETE 3/3; verify-book2-ch01.ts → 228 checks; new citation keys cantor-1883-grundlagen + fibonacci-1202-liber-abaci — pushed per protocol |
| 50 | memory | 11-05 | run-50 synced sha recorded — remote-verified via one-time-URL ls-remote = local HEAD; next run 51 = ANS ch. 2 opens with lessons 2.1 Division with Rest + 2.2 The Algebra of Divisibility (verify-book2-ch02.ts FIRST) |
| 50 | ship + bookkeeping + memory | 11-05 | ANS ch. 1 lesson 1.3 The Least-Number Principle and Recursion (6,579 words; verify-book2-ch01.ts 124 → 228 checks AA–AM; quiz keys 1/2/1/0/3 live 5/5; audits 0/0 both figures) + UNIT-1 COMPLETION REVIEW PASSED — CHAPTER 1 COMPLETE 3/3 (16,921 words / 24 terms / 15 quiz / 36 exercises); ch-01 → complete; new citation keys cantor-1883-grundlagen + fibonacci-1202-liber-abaci; fired from job 498279 (fifth consecutive fire, logged for the owner) — pushed per protocol |
Per-commit file-level detail (every path with insertions/deletions) lives in
`WORK_INVENTORY.json` → `gitHistory`.

## 8. Current state & what's next

- **CURRENT (run 50, 2026-11-05): ANS CHAPTER 1 COMPLETE.** Tree was clean
  at HEAD `44e2755` (the run-49 memory commit; the run-49 ship `fa9eb9d`
  was already remote-verified). ANS chapter 1 'The Natural Numbers as a
  System' COMPLETE 3/3: lesson 1.3 'The Least-Number Principle and
  Recursion' (6,579 words) shipped verify-first — verify-book2-ch01.ts
  extended to 228 checks (sections AA–AM, created BEFORE writing; caught
  three check-code defects pre-writing) — plus the UNIT-1 COMPLETION
  REVIEW (checklist 7/7, exam corners 3/3, ids unique book-wide, ch-01
  → complete, plannedLessons emptied, totals recomputed: the chapter
  stands 16,921 words / 24 terms / 15 quiz / 36 exercises; the book 1/10
  chapters). Gates: tsc 0, lint 0 errors, routes 200/404, E2E
  e2e-ans-13.page.js green (quiz live 5/5 on keys 1/2/1/0/3, 15 Sol
  pills + 81 ∴ glyphs, 0 raw-$ after one derivation-title math leak
  fixed, 0 katex-errors, mobile 390 exact-fit, SVG audits 0/0, console
  clean). WORK_INVENTORY.json regenerated (51 lessons / 244,490 words
  library-wide); two new citation keys web-checked (cantor-1883-
  grundlagen, fibonacci-1202-liber-abaci). The fire came from the old
  job 498279 (FIFTH consecutive fire; the stale one-lesson payload
  superseded per the memory files) — logged for the owner in WORKLOG.
- **NEXT (run 51): OPEN ANS CHAPTER 2 'The Division Algorithm and the
  Structure of Divisibility'** — author lessons 2.1 'Division with Rest:
  The Division Algorithm' + 2.2 'The Algebra of Divisibility'
  (two-lesson cadence). Create scripts/verify-book2-ch02.ts FIRST
  (existence instances by repeated subtraction, uniqueness algebra,
  boundary instances r = 0 / r = b−1, divisibility-law instances, figure
  geometry, quiz + exercise keys), then author both lessons into a NEW
  ch-02.ts (existence by DESCENT — 1.3's least-number principle burning;
  cross-ref fm-division-remainders-zero, never duplicate FM's
  procedure), register in book.ts, full gates + single ship + protocol
  push. Chapter 2 completes at run 52 with 2.3 + 2.4 + the unit-2
  completion review.
- HEAD: the run-47 ship + its memory commit pushed and remote-verified
  (protocol v2, one-time URL from the firing payload); synced shas
  recorded in WORKLOG.md / RESUME_POINTER.json. Run 47 = FM 11.2 +
  FM 11.3 shipped; chapter 11 COMPLETE (unit-11 review passed) —
  FOUNDATION MATHEMATICS COMPLETE 11-for-11. The fire came from the old
  job 498279 (both jobs enabled; the stale one-lesson payload superseded
  per the memory files) — logged for the owner in WORKLOG run 47.
- **CURRENT (post-book): FOUNDATION MATHEMATICS COMPLETE — FM 11.2
  "From Patterns to Formulas" (3,931 words; the an+b dress derived as
  tag 1 with the check-the-first-term Caution, the staircase pairing
  n(n+1)/2 as tag 2 with the interlock figure, the matchstick 3n + 1
  seen structurally, the Gauss story hedged) and FM 11.3 "A Letter for
  the Unknown" (4,021 words; the balance law derived as tag 1 with the
  three-state balance figure re-laid once after the audit, the undo
  machine as tag 2 with the machine figure, equations from words with
  the check-both-conditions Caution, the aha → al-jabr history, and
  the book's closing paragraph opening the named doorstep).
  verify-unit-11.ts 74 → 187 checks (P–Z + AA–AL) ALL PASS
  pre-writing; quiz keys 0/1/1/0/0 live 5/5 both; audits 0/0 all four
  figures. Unit-11 completion review passed: checklist 7/7, exam
  corners 3/3, ids unique 48/48, ch-11 flipped complete,
  plannedLessons emptied, totals recomputed — book = 48 lessons /
  227,569 words / 355 terms / 240 quiz / 534 exercises. New citation
  keys ncert-math7-gp-ch4 + ncert-math6-ch11 + ncert-math7-ch4.
  NEXT: book #2 "Arithmetic and Number Systems" — research phase
  first (reference survey + syllabus audit; promote only after
  research; never an empty shell). Voice queue EMPTY.**
- HEAD (run 46 history): the run-46 ship + its memory commit pushed and remote-verified
  (protocol v2, one-time URL from job 504365's payload); synced shas
  recorded in WORKLOG.md / RESUME_POINTER.json. Run 46 = FM 10.4 +
  FM 11.1 shipped; chapter 10 COMPLETE (unit-10 review passed),
  chapter 11 open 1/3. Job 504365's first two fires (10:30:44,
  12:11:34) produced zero tool calls — each was consumed by a
  session-summary interruption across three context windows; fire 3
  (14:11:35) executed in full. Logged for the owner in WORKLOG run 46.
- **Sandbox recycle note:** recycled FIVE times on 11-03, fully
  recovered each time; runs 7–10 were the mildest (only the gitignored
  Drive survey lost — rebuilt with one command via the id-persisting
  `rebuild_drive_survey.ts`). Run 23 opened with the same mild recycle
  (survey rebuilt in one command; content untouched). Full protocol in
  RESUME_POINTER.json.
- **RUN 46 (history): CH. 10 "Data and Graphs" COMPLETE —
  FM 10.4 "Mean, Median and Mode" shipped run 46 and closed the chapter
  (5,783 words; the balance law + rebuild law derived as tag 1 with the
  figure-1 balance beam, the position law as tag 2 with the
  fifteen-shoe strip, the outlier section, the which-average-when
  table, the average-from-the-sea history); the unit-10 completion
  review passed (checklist 7/7, exam corners 4/4, ids unique 46/46,
  ch-10 flipped complete). verify-unit-10.ts 186 → 301 checks (AA–AP)
  ALL PASS pre-writing; quiz keys 2/1/2/3/2 live 5/5; VLM 9/8 + 9/8;
  audits 0/0. THEN CH. 11 "Patterns and the Doorstep of Algebra"
  OPENED 1/3 — FM 11.1 "Patterns and Rules" shipped the same run
  (4,965 words; ch-11.ts created + registered; the jump law derived as
  tag 1 with the matchstick figure redesigned twice to a three-stroke
  grammar (heavy = counted, dashed = borrowed), the gnomon law as tag 2
  with the wrap figure 9/9, the circle-game trap 1, 2, 4, 8, 16, 31,
  the Virahanka/Pingala/Hemachandra history); verify-unit-11.ts CREATED
  72 checks (A–O) ALL PASS pre-writing; quiz keys 1/0/2/3/2 live 5/5;
  audits 0/0. Book = 46 lessons / 219,617 words / 343 terms / 230 quiz /
  510 exercises. New citation keys ncert-math7-ch3 +
  ncert-ganita-prakash6-ch1. (Run 45's narrative below stands as
  history.)**
- **RUN 45 (history): CH. 10 "Data and Graphs" reached 3/4 —
  FM 10.2 "Bar Charts, Line Graphs and Pie Charts" + FM 10.3 "Reading
  Graphs Critically" shipped run 45** (job 504365 — the FIRST TWO-LESSON
  run under the owner's 2026-11-05 directive). verify-unit-9.ts
  200 → 428 checks A–AD ALL PASS pre-writing; 4,529 + 3,603 words in
  the Cengage voice + solution chain; all four figures audited 0/0 and
  VLM-gated (9.2 fig1 redesigned twice to 10/8; 9.2 fig2 10/9; 9.3 fig1
  rebuilt to token-strikes 10/9; 9.3 fig2 rebuilt left-to-right 10/9);
  quiz keys 0/2/1/2/3 and 0/1/2/2/1 verified live 5/5; the point-shift
  law derived as tag 1 and the factor licence as tag 1 / power law as
  tag 2; the 5/18 law of 6.2 unmasked as a chain of identities; new
  citation keys wikipedia-metre-history, usma-1795-decree,
  sizes-litre-1964, ncj-measuring-the-meter. Book totals recomputed by
  the generator: 40 lessons / 190,363 words / 295 terms / 200 quiz /
  438 exercises. Voice queue EMPTY. (The run-42 narrative below stands
  as history.) verify-unit-9.ts CREATED with 200 checks A–M before a word
  was written (gitignore exceptions added FIRST — the /scripts/* trap);
  5,501 words in the Cengage voice + solution chain; both figures
  audited 0/0 and VLM-reviewed (figure 1 REDESIGNED once: 6/6 → 10/9
  with numbered spans, shared rails and hooked dimension braces;
  figure 2's ½ mark bumped: 9/8 → 10/9); quiz keys 0/1/2/2/2 verified
  live 5/5; the swap law n₁u₁ = n₂u₂ derived as tag 2 with the inverse
  law swept k = 2..100; the treaty story (1875 Metre Convention → 1960
  SI, 7 base units) and India's page (1956 → 1960 → 2009) grounded by
  web-check; new citation keys ncert-sci6-curiosity-ch5 +
  ncert-phys11-ch2. Book totals recomputed by the generator: 38
  lessons / 182,231 words / 279 terms / 190 quiz / 414 exercises.
  Voice queue EMPTY.
- **NEXT (hourly cadence): FM 11.2 "From Patterns to Formulas" +
  FM 11.3 "A Letter for the Unknown"** — for EACH lesson extend
  scripts/verify-unit-11.ts with that lesson's sections FIRST, author
  per BOOK_FORMAT + the ch-01 exemplar; complete and gate 11.2 fully
  before starting 11.3; on 11.3's gates run the unit-11 completion
  review (flip ch-11 to complete, empty plannedLessons, recompute
  totals — Foundation Mathematics is then 11-for-11 chapters
  complete). Two lessons per run. The voice queue is empty:
  per-run extras shift to unit reviews, exam-registry research, or
  DETAILED_LOG/SOURCE_LOG upkeep until a new queue is named. Chapter
  11 planned: Patterns and Rules **WRITTEN** · From Patterns to
  Formulas · A Letter for the Unknown.
  Memorising Tables · Precision, Accuracy and Rounding in Measurement.