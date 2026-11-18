# AA Chapter 4 — "Inequalities: the Classical Engine" authoring master plan

> Written 2026-11-18, the PARALLEL-SWARM RUN (owner chat directive: "launch
> multiple agents for authoring lessons"). The one-unit-at-a-time cadence is
> honored exactly: ONE chapter (ch. 4) is opened and closed whole; no second
> chapter is touched. The unit is authored by six parallel lesson agents + one
> review agent + one assembler/gates pass, in the architecture of §5. This file
> is the chapter's standing reference until chapter 4 completes — which this
> run closes.

## 1. The research protocol this run follows (2026-11-18 record)

1. **Drive download for the unit** — `M2 Algebra :: 06. Inequalities Involving
   Means` (Drive id `12CiHJdju-UwSlkUc1spPagX6gCfPc4Eg`, 13 MB scanned PDF,
   24 pages) → `temporary-references/m2-06-inequalities-involving-means.pdf`
   via `scripts/download_drive_file.sh`. `pdftotext` yields 24 chars over the
   whole file: a pure scan (as the Drive survey records), so the vision model
   is mandatory.
2. **Page-offset calibration** — printed `6.N` = PDF `N + 2`, the SAME
   offset the m2-02/m2-03 modules carry, proven by the first take's markers
   (PDF 11 = printed 6.9): the survey's front-matter census was a misread,
   honestly recorded here. The core theory band printed 6.1–6.8 = PDF 3–10;
   printed 6.9–6.14 = PDF 11–16; the solutions S.115–S.122 = PDF 17–24.
3. **Vision transcription** (`scripts/transcribe-m2-06.sh` take 1 +
   `scripts/transcribe-m2-06b.sh` take 2, batches at 100 DPI JPEG, sequential
   with pacing per the 2026-11-17 429 lesson) — take 1 landed the bands
   6.9–6.12, 6.13–6.14 + solutions start, S.117–119 under their TRUE band
   names; take 2 landed the core theory:
   - `temporary-references/m2scan/tr-6.1-6.4.txt` (Simple Means of Two +
     CAE 6.1 + Simple Means of n + AM-GM + GM-HM start — 4.1's primary)
   - `temporary-references/m2scan/tr-6.5-6.8.txt` (GM-HM tail + CAE 6.2 +
     Weighted Means + CAE 6.3 + Means of mth Power start — 4.2's primary)
   - `temporary-references/m2scan/tr-6.9-6.12.txt` (Means of mth Power tail +
     CAE 6.4 + the exercise band start — 4.2's secondary)
   - `temporary-references/m2scan/tr-6.13-6.14-sol.txt` (archives/answers +
     solutions start)
   - `temporary-references/m2scan/tr-s.117-119.txt` (CAE 6.4 + exercise
     SOLUTIONS — incl. the sin-concavity centroid argument, the studied shape
     behind 4.5's Jensen arc)
4. **Internet research** (banked keys + fresh checks recorded in SOURCE_LOG at
   close): NCERT class 11 ch. 5 "Linear Inequalities" (key
   `ncert-math11-ch5-linear-inequalities`), OpenStax *College Algebra 2e*
   (key `openstax-college-algebra`), the JEE Main 2026 syllabus audit (key
   `jee-main-2026-syllabus` — its unit list carries NO separate inequalities
   unit; mean-inequality items ride the algebra bank — every exam item is
   labelled exam-style honestly), Hall & Knight *Higher Algebra* (key
   `hall-knight-higher-algebra`), Khattar QA 4e (key `khattar-qa-4e`).
   Lessons 4.3–4.5 have NO module ground (the m2-06 TOC carries no Cauchy,
   rearrangement/Chebyshev or Jensen section) — their canon statements are
   web-checked by their own agents and recorded as proposed keys in the run
   report, banked into SOURCE_LOG at close.
5. **Study-never-reproduce rule** — the module informs and verifies METHOD
   SHAPES only; every roster, number, figure, Illustration and exercise in
   chapter 4 is OUR OWN, recomputed by the verify engines before any prose.

## 2. Chapter map — module sections → our seven lessons

book.ts pins the six planned titles (exact strings, curly apostrophes in
"Engel's Form" and "Jensen's" — \u2019); the 4.R completion review closes the
unit, on the 2.R/3.R precedent.

| # | Our lesson (exact plannedLessons title) | Ground |
|---|---|---|
| 4.1 | The Arithmetic-Geometric Mean Inequality | module 6.1–6.4 (Simple Means of Two + CAE 6.1 + Simple Means of n + AM-GM + GM-HM) |
| 4.2 | The Weighted AM-GM and Its Consequences | module 6.5–6.10 (GM-HM tail + CAE 6.2 + Weighted Means + CAE 6.3 + Means of mth Power + CAE 6.4) |
| 4.3 | Cauchy-Schwarz and Engel's Form | NO module section — our own synthesis; the AL 9.3 discriminant discipline returns as the proof engine |
| 4.4 | The Rearrangement and Chebyshev Inequalities | NO module section — our own synthesis on ordered sequences |
| 4.5 | Jensen's Inequality and Convexity | NO module section — our own synthesis; convexity without calculus (chords), the AM-GM reread |
| 4.6 | Absolute Value at Depth: the Triangle Inequality | NO module section — FM 7.4's distance + AL 7.1–7.3's order ground carried deeper, our proofs |
| 4.R | Unit 4 Completion Review | the whole band consolidated + the m4-01 review-page fold |

**Hosted folds from TOC_FOLD_LEDGER.json binding this chapter (binding
obligations — a lesson that misses its hosted fold is INCOMPLETE):**

- 4.1 hosts (m2-06) "Weighted Means" — mode `example-family`: at least two
  worked `example` blocks inside 4.1 of exactly the weighted-means type
  (title or setup names the family). 4.2 is the full weighted engine later;
  4.1's two examples are the teaser the fold demands.
- 4.1 hosts (m4-01) "Real Number System and Inequalities" — mode
  `review-page`: the host lesson must NAME the topic in its prose (one
  honest sentence situating the means on the ordered real-number ground),
  and the chapter's completion review (4.R) carries the treatment: names it
  and gives it at least one exercise.

No other fold entry is hosted on a ch. 4 lesson title (ledger grep 2026-11-18).

## 3. The seven arcs in one line each (the writing spine)

- **4.1** — the three two-number means born (A, G, H as A₂, G₂, H₂), each
  order proved from a square that cannot be negative (A−G = (√a−√b)²/2 ≥ 0;
  G−H via reciprocals), the equality discipline (equal numbers, the
  (√a−√b)² = 0 certificate), the n-number statement honestly: the doubling
  ladder proved (2→4→2² by pairing), the general-n certificate deferred to
  ch. 7's induction exactly as ch. 5's power sums are, GM ≤ AM ≤ the
  QM/harmonic neighbourhood, the fixed-sum/fixed-product discipline (max
  product at the equal split; the fencing witnesses), the two
  weighted-means example-family folds, the m4-01 prose naming.
- **4.2** — weights enter: the weighted AM-GM for whole-number weights
  (replication: weights = repeated entries, honest AM-GM of a longer list),
  rational weights by scaling, the real-weight statement honestly noted as
  the ch. 9 doorstep (logs), the power-mean ladder M_r (r = 2, 1, 0, −1)
  monotone in r with M₀ = G read honestly as the limit case (the module's
  "Means of mth Power" ground), the consequences engine: normalization
  (weights chosen to make the product a fixed sum), the three-variable
  symmetric bounds, exam-speed splitting (n = a + b discipline).
- **4.3** — Cauchy-Schwarz ((Σab)² ≤ Σa²Σb²) PROVED by the AL 9.3
  discriminant discipline one storey higher (Σ(aᵢt + bᵢ)² ≥ 0 for every t →
  the quadratic in t keeps a non-positive discriminant), the equality
  discipline (aᵢ/bᵢ constant), the two-variable sharp form cross-referenced
  to 3.2's |z| engine (proved there by the same discipline), Engel's form
  (Σ aᵢ²/bᵢ ≥ (Σaᵢ)²/Σbᵢ, bᵢ > 0) derived and worked as the fraction-sum
  speed tool, the witnesses: Nesbitt's Σ a/(b+c) ≥ 3/2, the
  (a+b+c)² ≤ 3(a²+b²+c²) family, min-hunts on x + 4/x and
  (x²+…)/(x+…) shapes, the triangle-inequality connection named forward
  (4.6 cashes it).
- **4.4** — the rearrangement inequality (the sorted dot product is the max,
  the reversed is the min) PROVED by the exchange argument (swapping an
  inversion never decreases the sum — one clean swap certificate), equality
  discipline, Chebyshev's sum inequality for similarly sorted sequences
  ((1/n)Σaᵢbᵢ ≥ (avg a)(avg b)) derived from rearrangement, the mixed
  witnesses ((a+b+c)(1/a+1/b+1/c) ≥ 9 by both engines — AM-GM's and
  Chebyshev's), the sequence-order reads at exam speed.
- **4.5** — convexity WITHOUT calculus: the chord-above-graph definition,
  midpoint convexity, the honest continuity equivalence noted as beyond this
  book's tools, Jensen's inequality for the two-point weighted case (the
  definition cashed as a theorem), the n-point doubling ladder on the 4.1
  precedent, the equal-weights statement, the witnesses: x² Jensen = the
  QM–AM inequality (M₂ ≥ M₁ of the 4.2 ladder — the engine family
  reunited), |x| Jensen, the AM-GM-from-Jensen door NAMED for ch. 9 (when
  the logarithm arrives, AM-GM falls out in one line — a promise, never
  cashed here), the graph discipline (chords drawn, the curved side named).
- **4.6** — the absolute value FM 7.4 priced as distance, now as a bound
  machine: the verdict discipline |f| < g ⟺ −g < f < g (g > 0) and
  |f| > g ⟺ f > g or f < −g, cross-referenced to AL 7.3's
  intersection/union discipline (cited, never re-taught), the triangle
  inequality PROVED by squaring (|a+b|² ≤ (|a|+|b|)² with both sides
  non-negative — squaring is honest), the equality case (ab ≥ 0), the
  reverse form ||a|−|b|| ≤ |a−b|, the detour tax |x−a|+|x−b| ≥ |a−b| (the
  FM distance engine reread), |x|+|y| ≥ |x+y| mixed exhibits, the complex
  triangle inequality of 3.2 cross-referenced as the same law on the plane,
  the |f|+|g| bound machines at exam speed.
- **4.R** — the review that walks the chapter's six engines in one room: the
  engine MAP (fixed sum → AM-GM; fraction sum → Engel; sorted sequences →
  rearrangement/Chebyshev; curved shape → Jensen; distance bound →
  triangle), the master table of the classical family (statement, equality
  case, when to reach for it), the witnesses re-audited, the consolidated
  laws, the traps (the equality discipline forgotten; multiplying an
  inequality by an unverified positive; the unweighted mean used where the
  weighted is due), the 15-question mixed bench, and the m4-01 fold carried
  ("Real Number System and Inequalities" named + at least one exercise).

## 4. Standing obligations for every lesson of this chapter

- **Prereq spine** (ids verified live): 4.1 → `al-solving-linear-inequalities`
  + `al-compound-inequalities-and-applications` +
  `aa-vertex-form-at-work-maxima-and-minima`; 4.2 adds 4.1; 4.3 adds 4.2;
  4.4 adds 4.3; 4.5 adds 4.2 (the ladder) + 4.1; 4.6 adds
  `fm-absolute-value-as-distance` + 4.1; 4.R cites its chapter siblings'
  ids. Prerequisites cite, never re-teach.
- **Verify-first**: each lesson's engine sections are grown green BEFORE the
  prose is declared done (the agents author engine + lesson together, the
  engine sweeping every number; the assembled `verify-book4-ch04.ts` re-runs
  everything against the shipped chapter file). Section letters: A/B = 4.1,
  C/D = 4.2, E/F = 4.3, G/H = 4.4, I/J = 4.5, K/L = 4.6, M/N = 4.R, Z = the
  chapter census (assembler's).
- **Figures**: the vivid palette table only (BOOK_FORMAT.md), original SVG,
  labels matching the prose; 2 per lesson is the house norm.
- **Exam callouts**: label everything "exam-style" honestly; the JEE Main
  2026 unit list carries no separate inequalities unit (the audit's honest
  note) — mean-inequality items ride the algebra bank + Khattar QA.
- **Prose cross-references**: AL 7.2/7.3 (order and compound discipline),
  AA 2.1 (vertex maxima — the calculus-free maxima the chapter generalizes),
  3.2 (the triangle inequality first read), FM 7.4 (distance) — cite, never
  re-teach. The ch. 5 (means in progressions) and ch. 7 (induction
  certificates) forward promises are NAMED, never cashed.

## 5. The swarm architecture (this run's own record)

- **Wave 1 — six parallel lesson agents** (Task ids 4-a … 4-f), one per
  lesson 4.1–4.6. Each agent writes ONLY, under `scripts/aa-ch04-work/`:
  `l4-X.ts` (the complete `Lesson` object, exact shapes below), `v4-X.ts`
  (the engine sections as exported functions over the lesson), a
  `run-4X.ts` runner, and the `e2e-aa-4X.page.js` + `e2e-aa-4X.sh` pair
  (the e2e-aa-31 pattern with its own pins). The engine must be green
  (`bun run scripts/aa-ch04-work/run-4X.ts`) before the lesson is declared
  done. Agents touch NOTHING else — no git, no shared ledgers, no dev
  server, no sibling files.
- **Wave 2 — the review agent** (Task id 4-g) authors 4.R against the six
  banked lesson parts + this plan.
- **Assembly (the orchestrator)** — `ch-04.ts` is assembled as ONE
  self-contained chapter file (the audit-content-completeness gate reads
  `^ch-\d+\.ts$` files only — the one-file-per-chapter layout of
  BOOK_FORMAT.md is preserved; the part files are the authoring workspace,
  not the ship). book.ts swaps its inline planned chapter-4 object for the
  `chapter04` import, plannedLessons empties, status → complete.
  `scripts/verify-book4-ch04.ts` is assembled from the section bodies +
  the census section Z, run green; the e2e pairs move to `scripts/` and
  are whitelisted in `.gitignore`; the six ledgers update; one commit
  closes the unit. Push rides the next PAT-bearing push.
- **Structural pins** (section B/D/F/H/J/L/N check every one): quiz exactly
  5 items with valid answer indices and full explains; exercises exactly 15
  in sets L1–L6 = 2/2/3/3/3/2, every question with a full steps-array
  solution; ≥ 2 figures; ≥ 3 derivations; ≥ 3 formula cards; ≥ 8 example
  (Illustration) blocks; ≥ 6 terms; word floor 4,500 (R: 4,000) by
  `countLessonWords`; sources keys all banked in SOURCE_LOG.md.
