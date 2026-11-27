# GEO_CH05_MASTER_PLAN.md — RUN 131 (maths lane, 2026-11-28, the 02:05 IST fire)

Chapter: GEOMETRY Book 5, **chapter 5 'Transformations and Symmetry: the Rigid-Motion Idea'** —
plannedLessons (book.ts census, verbatim): 5.1 'The Rigid Motions: Slides, Flips and Turns',
5.2 'Composing Transformations and the Isometry Idea', 5.3 'Line and Rotational Symmetry',
5.4 'Dilations, Scale Factors and Similarity Re-Read'. No separate unit review lesson (the
ch.2/ch.4 pattern: 4 planned lessons, the chapter close IS the review gate).

## Reference-scan-first (amendment 9) — what was scanned and banked

1. **Common Core HSG-CO standards** (thecorestandards.org/Math/Content/HSG/CO, fetched verbatim
   this run): G-CO.2 (transformations as FUNCTIONS taking points to points; preserve distance
   and angle vs not), G-CO.3 (rotations/reflections carrying rectangle/parallelogram/trapezoid/
   regular polygon onto itself — the symmetry census standard), G-CO.4 (definitions of rotation/
   reflection/translation in terms of angles, circles, perpendicular/parallel lines), G-CO.5
   (draw the transformed figure; specify a sequence), G-CO.6-8 (congruence DEFINED by rigid
   motions; the criteria SAS/ASA/SSS as consequences — the re-read spine of 5.2), G-CO.9
   (perpendicular-bisector equidistance theorem — the reflection-machine pin of 5.1).
2. **Illustrative Mathematics Geometry Unit 1 'Constructions and Rigid Transformations'**
   (im.kendallhunt.com/HS/teachers/2/1 — the transformation-first curriculum): the working
   definition "a rigid transformation is a translation, reflection, rotation, or any sequence
   of the three; rigid transformations take lines to lines, angles to angles of the same
   measure" — banked as the 5.1/5.2 invariance framing.
3. **NCERT class-7 'Symmetry' chapter** (structure grounded via search results: allen.in CBSE
   notes + byjus listing + the qumath-hosted NCERT PDF snippet; the byjus page itself 408'd —
   honest log): line symmetry, lines of symmetry for regular polygons (n lines for regular
   n-gon), rotational symmetry, order of rotational symmetry = number of self-alignments in a
   full turn, angle of rotation 360/order, centre of rotation (rectangle: diagonal
   intersection), and the classic classification — isosceles triangle line-symmetry-only,
   parallelogram rotational-only (order 2, ZERO lines), square/rectangle both, scalene neither.
   The N/S/Z letter archetype (order 2, no mirror) is NCERT's own.
4. **Sibling books (internal)**: geometry ch.3 (the congruence criteria 3.2 — re-read as
   invariances under motion in 5.2), ch.4 (similarity whole — re-read as dilation+isometry in
   5.4; the Thales tree witness 1.7/2.4/18/12.75 and the 3-4-5 altitude legs BF=1.8/FC=3.2/h=2.4
   from 4.4 re-derive as dilation readings), FM's number-line mirror-symmetry motifs (ch-02/07).
5. **Drive library**: surveyed (DRIVE_TOC_SURVEY) — no transformational-geometry book on the
   Drive; the temporary-references inventory was lost to the sandbox recycle (honest note),
   so the fetch duty fell to the internet references above (BOOKS AND INTERNET BOTH satisfied:
   NCERT = real book via web-grounded structure; IM = real open curriculum; Core Standards =
   official standard text).

## Verify-first

`scripts/pin_check_geo131.py` — **81/81 GREEN** (eight first-draft catches fixed in-engine:
the T-image of (1,4) is (4,2) not (4,4); the rhombus draft was accidentally a square; the
right-angle vertex of the dilation witness; the 3-4-5 altitude initially read the leg as the
hypotenuse; the external/internal similitude centres had k-signs swapped — external is the
DIRECT k=+3 centre, internal the OPPOSITE k=-3 centre). Every number the four specs print is
banked there; seats re-derive them in their own TS engines.

## Seat map (swarm, one agent per lesson)

| seat | lesson | part | harness | quiz key | word floor |
|---|---|---|---|---|---|
| geo501 | 5.1 Rigid Motions | part-geo501.ts | v-geo501.ts | [3,0,4,1,2] | 9,000 |
| geo502 | 5.2 Composing | part-geo502.ts | v-geo502.ts | [1,4,2,0,3] | 9,000 |
| geo503 | 5.3 Symmetry | part-geo503.ts | v-geo503.ts | [4,1,0,3,2] | 8,500 |
| geo504 | 5.4 Dilations | part-geo504.ts | v-geo504.ts | [0,3,2,4,1] | 9,000 |

Assembler: `scripts/assemble_run131.py` (clone of 129/130: builds ch-05.ts from the four
parts, builds verify-book5-ch05.ts wrapping the four harnesses + the Z closed census, swaps
book.ts ch.5 planned object for the shipped chapter5 import, STATUS refresh). Gates: the four
harnesses, verify-book5-ch05, tsc lane-scoped, lint, lib:pack, audit-content-completeness,
E2E grid + routes, VLM sweep if the clock holds (else debt-first rider for run 132).
