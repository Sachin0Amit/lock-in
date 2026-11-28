# GEOMETRY Book 5 — Chapter 6 'Quadrilaterals and Polygons' MASTER PLAN (RUN 132; RE-BANKED run 132 recovery)

> RECOVERY NOTE (2026-11-28, run 132 close): this plan, the three specs and the pin engine were executed FULLY in run 132 — the swarm landed all three seats green (geo601 99/99, geo602 86/86, geo603 69/69) and verify-book5-ch06 ran 286/286 ALL GREEN — but a rogue concurrent agent operation destroyed the uncommitted artifacts (ch-06.ts, the geo-ch06-wip dir, the scripts) at ~02:45 before the run-end commit. Everything below is RE-BANKED VERBATIM from the orchestrator's context; the specs are PROVEN — run 133 re-executes them exactly.

Chapter: GEOMETRY Book 5, **chapter 6 'Quadrilaterals and Polygons'** — plannedLessons (book.ts census, verbatim): 6.1 'Parallelograms and Their Family Tree', 6.2 'The Midpoint Theorem and the Trapezium', 6.3 'Polygons: Vertex, Side, Angle Sums, Convexity'. Chapter summary (book.ts): the parallelogram family with its diagnoses proved from triangle congruence; the midpoint theorem (and converse) as the classic consequence; polygons in general — interior/exterior angle sums, regular polygons, diagonals; the trapezium midsegment closes the chapter as similarity's first application.

## REFERENCE-SCAN-FIRST (v9.2 amendment 9 — this chapter's scanned ground; the SOURCE_LOG run-132 block SURVIVED on disk and carries it)

1. **Common Core HSG-CO.C.11** (thecorestandards.org/Math/Content/HSG/CO/C/11, fetched verbatim 2026-11-28): "Prove theorems about parallelograms. Theorems include: opposite sides are congruent, opposite angles are congruent, the diagonals of a parallelogram bisect each other, and conversely, rectangles are parallelograms with congruent diagonals." Plus G-CO.C.10 (the triangle midpoint theorem) and G-CO.A.3 (rectangle/parallelogram/trapezoid/regular-polygon symmetries).
2. **NCERT class-8 Mathematics ch. 3 'Understanding Quadrilaterals'** (ncert.nic.in textbook PDF hemh103.pdf — real book; structure web-grounded via the NCERT PDF search snippet + Khan Academy's NCERT-aligned class-8 unit; direct download blocked from the sandbox).
3. **NCERT class-9 'Quadrilaterals'** (ncert.nic.in hegp104.pdf Ganita Prakash + the class-9 exemplar — real books, web-grounded): the Th 8.1-8.10 arc + the midpoint theorem + converse + Varignon (the exemplar's midpoint-theorem-for-quadrilaterals).
4. **The trapezium midsegment theorem** (web canon, four independent sources): M = 1/2 (b1 + b2), parallel to both bases.
5. **Polygon canon** (web, three independent sources): diagonals n(n-3)/2; exterior sum 360; regular interior 180(n-2)/n, exterior 360/n.
6. **Illustrative Mathematics Geometry 2.2.13** (web-grounded): parallelogram diagonals bisect; rectangle diagonals congruent.
7. **S.L. Loney, *Plane Trigonometry* ch. XVI** (Drive library real book, TOC in DRIVE_TOC_SURVEY.md): quadrilaterals + regular polygons ground-check.
8. **Sibling books (internal)**: geo ch.3 (congruence criteria — the proof engine), ch.4 (similarity + BPT), ch.5 (symmetry re-reads), FM 8.4/8.5.

## SEATS (staged, one agent per lesson)

- **geo601 — 6.1 'Parallelograms and Their Family Tree'** (~10-11k words): definition (both pairs parallel); the family tree; the five diagnoses PROVED from ch.3 congruence; the three converses + trap counterexample; rectangle/rhombus/square special properties proved; the vertex law A + C = B + D + shoelace re-read. Quiz key [2,4,0,3,1] PINNED.
- **geo602 — 6.2 'The Midpoint Theorem and the Trapezium'** (~11k words): midpoints as averages; the theorem proved TWICE (SAS double-and-extend + coordinates); the converse; Varignon (honest posthumous-1731 history, half-area law); the trapezium conventions (inclusive stated); the midsegment M = 1/2 (b1 + b2) proved by extending the legs + coordinates; the isosceles trapezium. Quiz key [0,3,1,4,2] PINNED.
- **geo603 — 6.3 'Polygons: Vertex, Side, Angle Sums, Convexity'** (~10-11k words): the polygon charter + naming census; convexity with the dart witness; the triangulation proof of (n-2)*180; the 360 walking proof; diagonals by double counting; regular polygons with the limit re-read + hexagon-as-6-triangles + the 5.3 symmetry re-read; the ch.7 preview. Quiz key [4,0,3,1,2] PINNED.

## VERIFY-FIRST + ASSEMBLY

pin_check_geo132.py pins every number (58/58 GREEN in run 132, one first-draft catch: the dart's walk-turn order). assemble_run132.py (destroyed; rebuild on the assemble_run131.py pattern — index-bounded STATUS splice) builds ch-06.ts + verify-book5-ch06.ts (the three harnesses + the Z closed census: ids/numbers/titles verbatim, floors >= 8000, keys 24031|03142|40312 pairwise distinct, book census ch.1-6 complete) + swaps book.ts. Gates: verifier ALL GREEN; tsc 0; lint 0; lib:pack (+3) + check; completeness 0; routes 200. Run-132 measured: 10,738 / 11,122 / 12,628 words = 34,488 chapter words.
