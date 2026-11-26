# GEO_CH03_MASTER_PLAN — Geometry chapter 3 "Triangles: Congruence and the Craft of Proof" (run 128)

Book #5 of the mathematics shelf. Chapter 3 of 12. To be opened AND closed whole by
the run-128 swarm (six lessons, one agent per seat, v9.2 reference-grounded).
Chapters 1-2 closed (runs 124-127). Pattern authority: GEO_CH02_MASTER_PLAN.md.

## The chapter census (pinned — the assembler's section Z re-checks it)

| # | id | title | words floor |
|---|----|-------|-------------|
| 3.1 | geo-congruence-the-idea-of-same-shape-and-size | Congruence: the Idea of Same Shape and Size | >= 6,000 |
| 3.2 | geo-the-congruence-criteria-sas-asa-aas-sss-rhs | The Congruence Criteria: SAS, ASA, AAS, SSS, RHS | >= 6,000 |
| 3.3 | geo-isosceles-triangles-the-classic-consequences | Isosceles Triangles: the Classic Consequences | >= 6,000 |
| 3.4 | geo-inequalities-in-a-triangle-sides-and-angles | Inequalities in a Triangle: Sides and Angles | >= 6,000 |
| 3.5 | geo-the-cevian-theorems-ceva-and-menelaus | The Cevian Theorems: Ceva and Menelaus | >= 6,000 |
| 3.6 | geo-stewarts-theorem-and-the-median-relation | Stewart's Theorem and the Median Relation | >= 6,000 |

- chapter: number 3, slug 'triangles-congruence-and-proof', title
  'Triangles: Congruence and the Craft of Proof', status 'complete',
  plannedLessons [] at close, summary VERBATIM from book.ts (never edit it).
- prerequisites: 3.1 [geo-angle-sum-of-a-triangle-and-its-consequences];
  3.2 [geo-congruence-the-idea-of-same-shape-and-size];
  3.3 [3.1, 3.2]; 3.4 [3.1, 3.2, 3.3]; 3.5 [3.2, 3.4]; 3.6 [3.2, 3.4].
- quiz keys (PINNED, pairwise distinct): 3.1 [1,3,0,2,1] = 13021;
  3.2 [0,2,1,3,2] = 02132; 3.3 [2,0,3,1,0] = 20310; 3.4 [3,1,2,0,3] = 31203;
  3.5 [1,0,2,3,1] = 10231; 3.6 [0,3,1,2,0] = 03120.
- exercises: 15 per lesson, levels L1-L6, full Cengage step solutions, each
  lesson >= 3 body figures + >= 3 solution figures (computed SVG; the triangle
  chapter is SVG's home ground — NO AI rasters needed anywhere in ch.3).
- sources: 3.1 ['geo-euclid-elements', 'ncert-math7-ch7-congruence',
  'geo-ch03-web-ground']; 3.2 ['geo-euclid-elements',
  'ncert-math7-ch7-congruence', 'cengage-m1-05', 'geo-ch03-web-ground'];
  3.3 ['geo-euclid-elements', 'geo-ch03-web-ground'];
  3.4 ['geo-euclid-elements', 'cengage-m1-05', 'geo-ch03-web-ground'];
  3.5 ['geo-ch03-web-ground', 'geo-euclid-elements'];
  3.6 ['geo-ch03-web-ground', 'cengage-m1-05'].

## The chapter arc (the WHY of the order)

The coincidence idea and the correspondence discipline (3.1) -> the five
criteria as postulates-of-method, with the honest WITNESS that SSA and AAA
fail (3.2) -> the first great consequences PROVED the Euclidean way: pons
asinorum I.5 and its converse I.6, the equilateral corollary (3.3) -> the
inequality side of the theory: the triangle inequality I.20, larger-side
larger-angle I.18/I.19, exterior angle I.16, the hinge theorem (3.4) -> the
cevian census: Ceva's product = 1 for concurrence, Menelaus' directed
product = -1 for collinearity (3.5) -> Stewart's theorem as the cevian
length law, Apollonius' median case, the centroid 2:1, the angle-bisector
length (3.6). The arc hands off to ch.4 (similarity — Thales, and the
ratio methods that re-derive Ceva and Stewart for similar triangles).

## The notation law (BINDING across all six lessons)

Triangle ABC: side a = BC opposite A, side b = CA opposite B, side c = AB
opposite C. Angles A, B, C at the corresponding vertices. Cevian from A
meets BC at D: BD = m adjacent to c, DC = n adjacent to b, a = m + n,
cevian length d. Directed ratios on a side use the side's direction
(B->C on BC, C->A on CA, A->B on AB): a point BETWEEN the endpoints gives
a POSITIVE ratio, a point OUTSIDE gives a NEGATIVE one. Every engine and
every figure uses these labels. Congruence statements name the
correspondence in ORDER: triangle ABC congruent to triangle DEF means
A<->D, B<->E, C<->F (and AB = DE, BC = EF, CA = FD, angle A = angle D...).

## Pre-flight pins (pin_check_geo128.py — ALL GREEN before any spec ships)

- 3.1: T1 = (0,0),(6,0),(0,8) — sides 6, 8, 10 (right triangle, right
  angle at (0,0)); T2 = (0,0),(8,0),(0,6) — sides 8, 6, 10. Both listed
  counterclockwise. The 6-permutation correspondence census: EXACTLY 1
  permutation maps all three sides to equal sides — the scalene
  congruence correspondence is UNIQUE (A->A, B->C, C->B); it is realized
  by the REFLECTION across y = x (an orientation-REVERSING motion), and
  NO direct motion (rotation/translation) realizes it — the mirror-image
  teaching point. Same perimeter 24, different shapes: (6,8,10) vs
  (5,9,10) — NOT congruent. Same area 16, different shapes: the 8x2
  rectangle vs the 4x4 square — NOT congruent. Rigid-motion
  distance-preservation witness: rotation by 90 degrees maps
  (6,0)->(0,6) and preserves every pairwise distance.
- 3.2: SSA NOT a criterion — the ambiguous-case witness: angle A = 30
  degrees, b = CA = 7, a = BC = 10 (so h = b sin A = 3.5, foot offset from C
  = b cos A = 7 cos 30 = 7 sqrt(3)/2 approx 6.062178); two DISTINCT triangles
  with third sides c = sqrt(149 -+ 70 sqrt(3)): c1 = sqrt(149 - 70 sqrt 3)
  approx 5.268438, c2 = sqrt(149 + 70 sqrt 3) approx 16.439086; condition
  b sin A < b < a (3.5 < 7 < 10). AAA NOT a criterion: equilateral side 1
  vs equilateral side 2 — same angles, NOT congruent. SAS is Euclid I.4,
  ASA/AAS Euclid I.26, SSS Euclid I.8 (via I.7), RHS the right-angle case
  (NCERT names it; Euclid I.34-adjacent; Hilbert's axiom group sharpens it).
- 3.3: isosceles 13-13-10: height 12 (two 5-12-13 halves), apex angle
  arccos(119/169)... cos(apex) = (169+169-100)/338 = 119/169; apex =
  2 arcsin(5/13) approx 45.239730 degrees; base angles arcsin(12/13)
  approx 67.380135 each; area 60. Equilateral side 1: height sqrt(3)/2
  approx 0.866025, all angles 60. Pappus shortcut for I.5 noted.
- 3.4: the integer-triangle census 1 <= a <= b <= c <= 10 with a+b>c:
  the engine counts them (expect 125 — verify). 3-5-7: angles
  arccos(13/14) approx 21.786789, arccos(11/14) approx 38.213211,
  arccos(-1/2) = 120; A+B = 60 EXACTLY; ordering a<b:c <-> A<B<C. Exterior
  angle: at C the exterior 60 = A + B (I.16's arithmetic on this witness).
  Hinge: equal sides 5,5 — included angle 40 deg gives third side
  10 sin 20 approx 3.420201; included angle 60 deg gives 10 sin 30 = 5.
- 3.5: Ceva witness A(0,0), B(12,0), C(0,9): D on BC with BD/DC = 2 ->
  D(4,6); E on CA with CE/EA = 3/2 -> E(0,3.6); F on AB with AF/FB = 1/3 ->
  F(3,0); product (2)(3/2)(1/3) = 1; AD, BE, CF CONCURRENT at (2,3)
  (engine verifies by line intersection). Median check: midpoints, product
  1, concurrency at the centroid ((4,3)). Menelaus witness same triangle:
  D on line BC BEYOND B with directed BD/DC = -1/2 -> D(24,-9); E(0,3) on
  CA (CE/EA = 2); F(6,0) on AB (AF/FB = 1); directed product = -1; D, E, F
  COLLINEAR on y = -x/2 + 3 (engine verifies slope-equality).
- 3.6: the 13-14-15 triangle, a = BC = 14, b = CA = 13, c = AB = 15:
  B(0,0), C(14,0), A(9,12) (x = (c^2 + a^2 - b^2)/(2a) = 9, height 12);
  area 84 (Heron s = 21, sqrt(21*8*7*6) = sqrt(7056) = 84). Median from A:
  d^2 = (2b^2 + 2c^2 - a^2)/4 = 148, d = 2 sqrt(37) approx 12.165525.
  Angle bisector from A: m = 7.5, n = 6.5 (m/n = c/b = 15/13), d^2 =
  bc(1 - a^2/(b+c)^2) = 146.25, d approx 12.093387; Stewart check:
  b^2 m + c^2 n = 2730 = a(d^2 + mn) = 14(146.25 + 48.75). Centroid
  (23/3, 4); AG = (2/3) * median approx 8.110350 = 4 sqrt(37)/3.
  Median-sum identity: m_a^2 = 148, m_b^2 = 673/4 = 168.25, m_c^2 =
  505/4 = 126.25; sum = 442.5 = (3/4)(a^2 + b^2 + c^2) = (3/4)(590)
  — the engine verifies both readings.

## Ground truth register (fetched 2026-11-27, banked per v9.2 amendment 9)

- Euclid I.4 (SAS by superposition), I.5 pons asinorum, I.6 converse,
  I.8 (SSS via I.7), I.16 (exterior angle, fifth-free), I.18/I.19
  (side-angle order, each proved from the other's tools), I.20 (triangle
  inequality) — the ch.3 spine, banked ground geo-euclid-elements
  (runs 124-126; Clark Joyce edition used then).
- Pons asinorum: Latin "bridge of asses"; medieval students' name for
  I.5, the first genuinely difficult proposition of Book I; the figure
  resembles a bridge (en.wikipedia.org/wiki/Pons_asinorum;
  mathworld.wolfram.com/PonsAsinorum.html).
- Ceva: Giovanni Ceva, De lineis rectis, 1678; earlier proof by Yusuf
  Al-Mu'taman ibn Hud, 11th-century king of Zaragoza, rediscovered 1985;
  converse also true (with the all-three-parallel caveat); sine-form
  generalization exists (en.wikipedia.org/wiki/Ceva%27s_theorem;
  math.osu.edu/sites/math.osu.edu/files/ceva-menelaus.pdf).
- Menelaus: signed product = -1; oldest extant exposition in Menelaus of
  Alexandria's Sphaerica, Greek lost, survives via Arabic translation;
  Ptolemy applied it in the Almagest; Islamic-era name "the proposition on
  the secants" (shakl al-qatta'); Thabit ibn Qurra wrote a treatise on it
  (en.wikipedia.org/wiki/Menelaus%27s_theorem; britannica.com Menelaus of
  Alexandria).
- Stewart: Matthew Stewart, "Some General Theorems of Considerable Use in
  the Higher Parts of Mathematics", 1746 (published while a candidate to
  succeed Maclaurin at Edinburgh); probably known to Archimedes; used by
  Simson 1748 and Simpson 1752 per Hutton & Gregory 1843. The median case
  is Apollonius' theorem. (en.wikipedia.org/wiki/Stewart%27s_theorem —
  NOTE: no Simpson-1740 claim is supported; use 1746/Archimedes honestly.)
- NCERT Class 7 ch.7 "Congruence of Triangles" (text layer read
  temporary-references/geo-ch03/ncert7-ch7-congruence.pdf): the
  superposition definition — "same shape and same size", exact copies;
  the criteria SAS/ASA/RHS named in the school canon (SAS/ASA/RHS in
  ch.7; SSS alongside) — our own wording built on this ground, never
  reproduced.
- Cengage M1 module 5 "Properties and Solutions of Triangle" (Drive
  m1-05, downloaded temporary-references/geo-ch03/cengage-m1-05.pdf,
  vision-extracted notes docs/research/geo-ch03-wip/cengage-m105-extract.txt):
  the trig-side companions (sine/cosine rules, Illustration shapes,
  practice archetypes) — use as STRUCTURE reference for 3.4/3.6 witnesses
  and exercise archetypes, re-created as our own, never reproduced.
- CATCH LOGGED (honesty): the first vision call ran with positional image
  args and silently attached nothing; the working form is `z-ai vision -p
  "$PROMPT" -i img1 -i img2 ...` (the audit-script pattern). The banked
  extract was produced only after the fix.

STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure, Illustration,
quiz item and exercise is OUR OWN.

## Integration (run 128 — the assemble_run127.py pattern)

scripts/assemble_run128.py: JOB 1 builds
src/data/library/books/mathematics/geometry/ch-03.ts from the six parts
(strip the wip import paths; palette consts c3X/f3X renamed c31..c36 +
f31..f36 per part tag; helpers geo31..geo36; import lines
`import type { Lesson } from '../../../src/data/library/types'` replaced so
each part's export becomes a named const; assemble the Chapter object with
lessons in census order, status 'complete', plannedLessons [], summary
VERBATIM from book.ts). JOB 2 builds scripts/verify-book5-ch03.ts (the six
v-files wrapped whole as async sections, each `mod =
await import('./part-geo3XX')` redirected to
`Promise.resolve({ lessonGeo3XX })`, cut at the `/* bottom harness */`
marker, report labels unified, plus section Z: the closed-chapter census —
six lessons present in census order with the pinned ids, word floors,
quiz keys pairwise distinct, prerequisites chains, chapter object shape).
JOB 3 swaps book.ts (chapter3 imported, the planned object replaced,
STATUS comment refreshed). Gates: verifier ALL GREEN, tsc 0 (lane-scoped),
lint 0 errors, lib:pack+check (expect 230 written lessons), standing gates
(topic 667, toc 4023, math-shelf), routes 200, E2E per lesson x3 viewports
(gen-geo127-e2e.py pattern), the chapter-wide VLM light+dark figure sweep
(sweep_vlm_geo127.sh + audit_vlm_geo127.sh pattern, `-i` flag form).
