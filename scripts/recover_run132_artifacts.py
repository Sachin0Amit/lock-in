#!/usr/bin/env python3
"""recover_run132_artifacts.py — re-banks every durable RUN 132 artifact that
a rogue concurrent agent operation destroyed at ~02:45 (ch-06.ts, the whole
geo-ch06-wip dir, the run-132 scripts, the VLM verdicts; tracked files and
the 504 figure fixes survived). The orchestrator holds every source in
context; this script re-emits them to disk so RUN 133 can re-author ch.6
from PROVEN specs (they landed 3/3 seats green in run 132's first wave:
geo601 99/99, geo602 86/86, geo603 69/69, verify-book5-ch06 286/286 —
before the deletion).
"""
import os

ROOT = "/home/z/my-project"
W = lambda p, s: open(os.path.join(ROOT, p), "w", encoding="utf-8").write(s)

os.makedirs(f"{ROOT}/docs/research/geo-ch06-wip", exist_ok=True)
os.makedirs(f"{ROOT}/docs/research/geo-ch05-wip/vlm-sweep-run132-verdicts", exist_ok=True)

# ---------------------------------------------------------------- master plan
W("docs/research/GEO_CH06_MASTER_PLAN.md", """# GEOMETRY Book 5 — Chapter 6 'Quadrilaterals and Polygons' MASTER PLAN (RUN 132; RE-BANKED run 132 recovery)

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
""")

# ---------------------------------------------------------------- specs
SPEC_COMMON_TAIL = """
## Hard laws
- Minus U+2212 everywhere in SVG text; NO TeX inside SVG strings (plain text only); prose math in `$...$` inline only (never `$$`, never `\\qquad`); no `words` field; headings plain text.
- `export const lessonGeo6XX: Lesson`; parts end with the APPEND TAIL marker exactly as the exemplar; file must be valid TypeScript after every staged write.
- ORIGINAL content only — the references inform, every sentence and figure is ours. House voice: reasons before results, every number earned.
- SVG true-to-scale where the figure shows measured geometry; accurate aria-labels; no label collisions (compute label extents; keep >=3px clearance; NUDGE LABELS AWAY from strokes, never let text sit on a segment).

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
Write-early-often: (1) v-geo6XX.ts engine section green FIRST; (2) part skeleton (palette/helpers + export shell) saved; (3) sections landed one at a time, saving after each; (4) exercises + solutions; (5) quiz + terms + report. Staged saves must always leave valid TS. Run `bun run docs/research/geo-ch06-wip/v-geo6XX.ts` at the end — ALL GREEN required (engine x/x + pins x/x).

## REPORT BACK: the three paths + word count (countLessonWords) + engine/pin score + body & solution figure counts + quiz key + any pin you had to re-derive (with the engine's value).
"""

W("docs/research/geo-ch06-wip/spec-geo601.md", """# SPEC geo601 — 'Parallelograms and Their Family Tree' (GEOMETRY 6.1, RUN 132; RE-BANKED — PROVEN, it landed 99/99 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo501.ts` — the exemplar part: palette block, namespaced SVG helpers, figure usage, section/exercise/quiz shape, the `/* -- APPEND TAIL -- */` marker at the end. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law); `countLessonWords` exported here.
3. `docs/research/geo-ch05-wip/v-geo501.ts` — the exemplar engine+pin harness (staged-seat shape: engine section recomputes everything; pin section imports ./part-geo601 and tolerates a MISSING part by exiting 0 engine-only).
4. This spec — the pinned numbers are IMMUTABLE (master pin engine `scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-parallelograms-and-their-family-tree`; number: `'6.1'`; title: `'Parallelograms and Their Family Tree'`
- prereqs: the congruence criteria (geometry 3.2), the rigid-motion idea (geometry 5.1)
- sources: `geo-common-core-gco11-ground-132`, `geo-ncert9-quadrilaterals-ground-132`
- palette: `const c61` — emerald family hue-shift off the c51 teal family: ink #14532d, mid #15803d, teal #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #dcfce7, panel2 #fef3c7, sep #bbf7d0, faint #86efac, white #ffffff, paper #f0fdf4. Font family string as exemplar; helpers prefixed `geo61`.

## Arc (sections, ~7)
1. The quadrilateral charter: four sides, four vertices, the angle sum 360° via ONE diagonal splitting into two triangles (the 6.3 preview, honestly flagged); the definition under test — BOTH pairs of opposite sides parallel.
2. The first diagnosis: a diagonal divides a parallelogram into two congruent triangles — the alternate-interior + ASA proof.
3. The diagnosis cascade: opposite sides equal; opposite angles equal; adjacent angles supplementary; the 70°/110° running witness.
4. The diagonals bisect each other — the vertical-angle SAS proof (G-CO.C.11 verbatim acknowledged).
5. The converses (the conditions for a parallelogram): both pairs of opposite sides equal; ONE pair equal AND parallel; diagonals bisect each other — each proved, plus the counterexample discipline.
6. The family tree: rectangle (equal diagonals, proved), rhombus (perpendicular bisecting diagonals, proved), square (both — the meet); the honest inclusion chain (inclusive trapezium convention stated).
7. Coordinates and the vertex law: A + C = B + D; the shoelace re-read; the coordinate machine as the 10-second diagnosis.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Running parallelogram ABCD: A(1,1), B(7,1), C(9,5), D(3,5). AB ∥ DC (slope 0 both); AD ∥ BC (slope 2 both); AB = DC = 6; AD = BC = √20 = 2√5 ≈ 4.4721.
- Diagonals AC = √80 = 4√5 ≈ 8.9443, BD = √32 = 4√2 ≈ 5.6569; BOTH midpoints (5,3).
- Vertex law: A + C = B + D = (10,6). Shoelace area 24 = base 6 × height 4.
- Angle witness: angles 70°, 110°, 70°, 110°.
- Trap counterexample (NOT a parallelogram): A(0,0), B(4,0), C(5,3), D(1,4) — vertex law fails ((5,3) ≠ (5,4)); DC slope −1/4 ≠ AB slope 0.
- Condition engine: A(0,0), B(5,0), C(6,3), D(1,3) — AB = DC = 5, AB ∥ DC → parallelogram (AD slope 3 = BC slope 3); area 15.
- Rectangle 8×5: A(0,0), B(8,0), C(8,5), D(0,5) — both diagonals √89 ≈ 9.4340, midpoint (4,2.5).
- Rhombus: diagonals 10 and 24 → half-diagonals 5,12 → side 13; area 120; side² = (d₁/2)² + (d₂/2)².
- Family census: square is both a rectangle and a rhombus; every parallelogram is a trapezium (inclusive convention).

## Figures (>=9 body + >=3 solution, ALL code-computed SVG, every one referenced in prose)
The running ABCD with both slope-2 side pairs marked; the diagonal-split congruence figure (ASA tick marks); the angle cascade 70/110; the diagonal bisection with midpoint ticks; the three converse figures; the trap counterexample; THE family-tree diagram (nested containers, square at the meet); the rectangle equal-diagonals witness; the rhombus 10-24 perpendicular diagonals; the vertex-law coordinate figure. Solution figures: the trap-quad disproof; the 5-12-13 rhombus construction; the coordinate diagnosis check.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [2,4,0,3,1]. Terms >=6. Formula block: the family inclusions + the vertex law + the rhombus diagonal law.
""" + SPEC_COMMON_TAIL.replace("6XX", "01"))

W("docs/research/geo-ch06-wip/spec-geo602.md", """# SPEC geo602 — 'The Midpoint Theorem and the Trapezium' (GEOMETRY 6.2, RUN 132; RE-BANKED — PROVEN, it landed 86/86 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo502.ts` — the exemplar part. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law).
3. `docs/research/geo-ch05-wip/v-geo502.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — the pinned numbers are IMMUTABLE (`scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-the-midpoint-theorem-and-the-trapezium`; number: `'6.2'`; title: `'The Midpoint Theorem and the Trapezium'`
- prereqs: the congruence criteria (geometry 3.2), similarity and BPT (geometry 4.2), line symmetry (geometry 5.3)
- sources: `geo-ncert9-midpoint-ground-132`, `geo-midsegment-web-canon-132`
- palette: `const c62` — indigo family hue-shift off the c51 teal family: ink #312e81, mid #4338ca, teal #0e7490, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #e0e7ff, panel2 #fef3c7, sep #c7d2fe, faint #a5b4fc, white #ffffff, paper #eef2ff. Helpers prefixed `geo62`.

## Arc (sections, ~7)
1. Midpoints as averages: M = (A+B)/2; the theorem stated (G-CO.C.10's wording acknowledged).
2. Proof one — the congruence construction: extend MN beyond N to P with MN = NP; the SAS chase; the parallelogram sandwich.
3. Proof two — coordinates: M(4,0), N(1,3); vector BC = (−6,6) = 2 × vector MN.
4. The converse: through a midpoint parallel to a side bisects the third side (uniqueness of parallels).
5. Varignon's parallelogram: midpoints of ANY quadrilateral (two midpoint-theorem applications); honest history (Pierre Varignon 1654–1722, Élemens de mathematique published posthumously 1731); the half-area law.
6. The trapezium: the honest conventions note (inclusive school convention adopted and stated); the midsegment theorem M = ½(b₁ + b₂) — extend-the-legs similar-triangles proof + coordinate proof; the average fact.
7. The isosceles trapezium: equal legs, equal base angles, the mirror line, equal diagonals; the exam corner.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Witness triangle A(0,0), B(8,0), C(2,6): M(4,0), N(1,3); vector BC = (−6,6) = 2·vector MN = 2·(−3,3); |BC| = 6√2 ≈ 8.4853, |MN| = 3√2 ≈ 4.2426; triangle area 24.
- Converse: through M(4,0) parallel to BC meets AC at exactly (1,3) (t = 1/2).
- Varignon quadrilateral A(0,0), B(10,0), C(8,6), D(2,7): midpoints P(5,0), Q(9,3), R(5,6.5), S(1,3.5); PQ = SR = (4,3), QR = PS = (−4,3.5); quad area 52, Varignon area 26 = exactly half; Varignon sides are half the DIAGONALS.
- Trapezium A(0,0), B(12,0), C(9,4), D(3,4): bases 12 and 6; legs' midpoints E(1.5,2), F(10.5,2); midsegment EF = 9 = ½(12+6); 6 < 9 < 12.
- Extend-the-legs: bases 8 and 14 → ratio 4:7; leg split 4:3.
- Isosceles trapezium A(0,0), B(10,0), C(8,4), D(2,4): legs √20 ≈ 4.4721; mirror x = 5; base angles atan(4/2) = 63.4349°; diagonals both √80 ≈ 8.9443.

## Figures (>=9 body + >=3 solution, ALL code-computed SVG)
The witness triangle with MN and BC; the double-and-extend construction; the coordinate proof figure; the converse figure; THE Varignon figure; the trapezium with midsegment 9; the extend-legs 4:7 figure; the isosceles trapezium with mirror; the equal-diagonals figure. Solution figures: the Varignon half-area diagram; the midsegment round-trip; the isosceles diagonal check.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [0,3,1,4,2]. Terms >=6. Formula block: midpoint theorem + converse + midsegment law + Varignon half-area.
""" + SPEC_COMMON_TAIL.replace("6XX", "02"))

W("docs/research/geo-ch06-wip/spec-geo603.md", """# SPEC geo603 — 'Polygons: Vertex, Side, Angle Sums, Convexity' (GEOMETRY 6.3, RUN 132; RE-BANKED — PROVEN, it landed 69/69 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo503.ts` — the exemplar part. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law).
3. `docs/research/geo-ch05-wip/v-geo503.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — the pinned numbers are IMMUTABLE (`scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-polygons-vertex-side-angle-sums-convexity`; number: `'6.3'`; title: `'Polygons: Vertex, Side, Angle Sums, Convexity'`
- prereqs: the triangle angle sum (FM 8.4 sibling), line and rotational symmetry (geometry 5.3), the parallelogram family (geometry 6.1)
- sources: `geo-ncert8-polygons-ground-132`, `geo-polygon-canon-132`, `loney-trig-ch16-ground-132`
- palette: `const c63` — rose family hue-shift off the c51 teal family: ink #881337, mid #be123c, teal #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #ffe4e6, panel2 #fef3c7, sep #fecdd3, faint #fda4af, white #ffffff, paper #fff1f2. Helpers prefixed `geo63`.

## Arc (sections, ~7)
1. The polygon charter: simple closed polyline; the naming census n = 3..12 (triangle→dodecagon, honest n-gon beyond).
2. Convexity: the every-diagonal-inside test; the dart witness; the honest convex-only note for the angle-sum proofs.
3. The interior angle sum (n−2)×180°: the triangulation proof from one vertex; the Euclid I.32/Proclus lineage; the census table.
4. The exterior angle sum 360°: the walking proof; ONE exterior angle per vertex (the two-at-a-vertex trap); the solve-back engines.
5. Diagonals: n(n−3)/2 by double counting; the octagon's 20; the handshake analogy.
6. Regular polygons: interior 180(n−2)/n, exterior 360/n; the limit re-read; the solve-back census; the hexagon = 6 equilateral triangles (area 24√3 for s = 4); the symmetry re-read from 5.3 (G-CO.A.3).
7. Why this matters: the ch.7 circle preview; the exam corner.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Angle sums (n−2)×180° for n = 3..12: 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800.
- Diagonals n(n−3)/2 for n = 3..12: 0, 2, 5, 9, 14, 20, 27, 35, 44, 54; octagon 8×5/2 = 20.
- Regular interior angles for n = 3,4,5,6,8,9,10,12: 60, 90, 108, 120, 135, 140, 144, 150; exteriors: 120, 90, 72, 60, 45, 40, 36, 30; interior + exterior = 180 (census 3..20); exteriors sum 360 (n = 3..12).
- Solve-backs: interior 144° → n=10; 150° → n=12; 140° → n=9; 165° → n=24. Exterior 22.5° → n=16; 36° → n=10; 30° → n=12; 45° → n=8.
- Dart A(0,0), B(4,0), C(1,1), D(0,4): cross products [4, −8, 4, 16] — one negative → concave, reflex at C; diagonal BD (x+y=4) passes OUTSIDE (C at x+y=2); the walk turns [+90°, +161.5651°, −53.1301°, +161.5651°] at A,B,C,D totalling 360° (the engine-caught run-132 catch).
- Contrast square (0,0),(4,0),(4,4),(0,4): all cross products +16.
- Regular hexagon: central angle 60°, side = circumradius; area for s = 4: 24√3 ≈ 41.5692.
- Triangulation: n−2 triangles (9-gon → 7).

## Figures (>=9 body + >=3 solution, ALL code-computed SVG)
The polygon zoo (convex vs the dart); the naming census strip; the 9-gon triangulation fan (7 triangles); THE walking pentagon (five 72° turns); the octagon's 20 diagonals; the census table; the hexagon-as-6-triangles; the pentagon symmetry (5 mirrors + 72° rotation); the limit ladder. Solution figures: the missing-angle engine; the decagon diagonal check; the 144° solve-back.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [4,0,3,1,2]. Terms >=6. Formula block: (n−2)×180°, 360°, n(n−3)/2, 180(n−2)/n, 360/n.
""" + SPEC_COMMON_TAIL.replace("6XX", "03"))

print("master plan + 3 specs re-banked")
