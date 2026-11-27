# GEO CH.4 MASTER PLAN — 'Similarity: the Geometry of Proportion' (RUN 130)

## Census (from book.ts plannedLessons)
4 lessons, no unit review: 4.1 'Similar Figures: Same Shape at Any Scale' · 4.2 'The Basic Proportionality Theorem (Thales)' · 4.3 'The Similarity Criteria: AA, SAS, SSS' · 4.4 'Pythagoras Proved: the Theorem Earned'. Target ≥ 9,000 words/lesson (floor 6,000), 15 exercises L1–L6 each with full step solutions, 5 MCQ quiz (pinned keys), ≥3 body + ≥3 solution computed-SVG figures per lesson.

## Arc
Congruence (ch.3) said SAME size; similarity is the relaxed law — same shape, any scale. 4.1 builds the idea from measurement (ratios of sides, invariance of angles) with the map/photo scale machine and the k, k² laws. 4.2 proves Thales' Basic Proportionality Theorem via the equal-altitude area argument, with the converse, the intercept ladder and the midsegment as the k=1/2 case. 4.3 earns the criteria (AA from angle-sum, SAS from the included angle, SSS from the ratio census) with the honest non-criterions (AAA-of-sides is not a thing; SSA dies). 4.4 CASHES the chapter: the altitude-on-hypotenuse split (Euclid VI.8) proves Pythagoras BY SIMILARITY (VI.31), the squares proof by areas runs second, areas scale k² (VI.19 duplicate ratio), the tree-shadow AA application, and the primitive-triple census.

## Notation law (binding, ch.3 continuity)
Triangles named △ABC uppercase vertices; sides a=BC, b=CA, c=AB opposite their vertices; ratios in the colon and fraction forms both introduced; the scale factor k written as the multiplier big→small or small→big ALWAYS stated with its direction; perimeters scale by k, areas by k² — never write k² without saying "areas". U+2212 minus inside SVG only; $...$ clause-wise math in prose; no \qquad, no $$.

## Ground register (amendment 9)
- Euclid Elements Book VI (Joyce's aleph0 edition, fetched 2026-11-27): VI.19 statement + proof structure (third proportional, VI.15 equal-areas lemma, duplicate ratio) — fetched verbatim this run; VI.2 (the BPT), VI.4–VI.6 (criteria), VI.8 (leg = geometric mean), VI.31 (Pythagoras by similarity) via the same edition + cut-the-knot's Euclid-proof page.
- NCERT class 10 ch.6 'Triangles' (the school canon): official PDF fetch BLOCKED from this sandbox (curl interstitial); theorem numbering/statements grounded via the NCERT-site search results + solutions-page fetch (logged in SOURCE_LOG).
- Sibling books on disk: Foundation Mathematics ch.6 (ratio and proportion — the arithmetic the chapter returns to), Geometry ch.1–3 (congruence, the bridge; the Euclid ground register in GEO_CH03_MASTER_PLAN.md).
- RUN 130 pin engine: scripts/pin_check_geo130.py — 62/62 ALL GREEN; FOUR first-draft catches (map-area unit slip cm²→km² needs /100000²; SAS pair swap 9,13.5 is the k=2.25 image, the k=3/2 image of 4,6 is 6,9; same swap in the area check; geometric-mean float artifact) — the parts must satisfy the ENGINE, never the reverse.

## Integration plan
Wip dir docs/research/geo-ch04-wip/ (v-geo4XX.ts + part-geo4XX.ts per lesson). Assembly: scripts/assemble_run130.py (the assemble_run129.py pattern) builds src/data/library/books/mathematics/geometry/ch-04.ts, wraps scripts/verify-book5-ch04.ts, swaps book.ts chapter4 (CHECK the `*/` terminator after the STATUS rewrite — run-129 fragility). Gates: verify-book5-ch04 ALL GREEN · tsc lane-scoped 0 · lint 0 · lib:pack + check · audit-content-completeness (geometry 0 errors) · routes 200 · E2E per lesson (the gen-geo129-e2e.py pattern, live-DOM-calibrated pins).

## Quiz keys (pinned, pairwise distinct)
4.1 → 21304 · 4.2 → 13042 · 4.3 → 04213 · 4.4 → 30421

## Staged-seat law
Every seat: engine first (green), then prose section by section written to disk AS IT COMPLETES (write-early-often — the run-129 law that made the dead transcripts' work count). Hard working window stated in each spec. Smaller spec on retry, fast tier.
