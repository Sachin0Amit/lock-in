# GEO_CH02_MASTER_PLAN — Geometry chapter 2 "Angles, Parallel Lines and the Transversal" (run 126)

Book #5 of the mathematics shelf. Chapter 2 of 12. Opened AND closed whole by
the run-126 swarm (4 lessons, one agent per seat). Chapter 1 closed by runs
124/125 (see GEO_CH01_MASTER_PLAN.md).

## The chapter census (pinned — the assembler's section Z re-checks it)

| # | id | title | words floor |
|---|----|-------|-------------|
| 2.1 | geo-angles-types-pairs-and-measures | Angles: Types, Pairs and Measures | >= 6,000 |
| 2.2 | geo-parallel-lines-and-the-fifth-postulate | Parallel Lines and the Fifth Postulate | >= 6,000 |
| 2.3 | geo-the-transversal-the-eight-angle-census | The Transversal: the Eight-Angle Census | >= 6,000 |
| 2.4 | geo-angle-sum-of-a-triangle-and-its-consequences | Angle Sum of a Triangle and Its Consequences | >= 6,000 |

- chapter: number 2, slug 'angles-and-parallel-lines', title
  'Angles, Parallel Lines and the Transversal', status 'complete',
  plannedLessons [] at close, summary VERBATIM from book.ts (never edit it).
- prerequisites: 2.1 [geo-incidence-how-points-lines-and-planes-interlock];
  2.2 [1.4, 2.1]; 2.3 [1.4, 2.1, 2.2]; 2.4 [1.4, 2.1, 2.2, 2.3].
- sources: 2.1 ['geo-euclid-elements', 'geo-ch02-web-ground'];
  2.2 ['geo-euclid-elements', 'geo-hilbert-grundlagen', 'geo-ch02-web-ground'];
  2.3 ['geo-euclid-elements', 'geo-ch02-web-ground'];
  2.4 ['geo-euclid-elements', 'geo-ch02-web-ground'].

## The chapter arc (the WHY of the order)

Angle arithmetic (2.1) -> the parallel postulate's story and its equivalents
(2.2) -> the transversal census machinery, with the honest split between the
fifth-free converses (Euclid I.27/I.28) and the fifth-costing forward direction
(I.29 — the postulate's first appearance in the Elements) (2.3) -> THE payoff
theorem: the angle sum of a triangle derived from the parallel postulate
(Euclid I.32), exterior angles, polygon sums, and the non-Euclidean door
previewed with the octant (2.4). The arc hands off to ch.3 (triangles,
congruence — where side stories begin).

## The label convention (BINDING across all four lessons)

Transversal t meets line m (upper) at P and line n (lower) at Q. At P:
a1 upper-left, a2 upper-right, a3 lower-right, a4 lower-left (counterclockwise
from upper-left). At Q: a5 upper-left, a6 upper-right, a7 lower-right,
a8 lower-left. Interior region = between m and n (at P: a3, a4; at Q: a5, a6).
All engines and all figures use these labels.

## Pre-flight pins

docs/research/geo-ch02-wip/pin_check_geo126.py — 104/104 ALL GREEN
(complement/supplement arithmetic incl. the self-supplement 90,
self-complement 45, supp=3*comp -> 45; the type-census boundaries; clock
witnesses 90/130/50/180; verticals 118/62; bisectors of a linear pair
perpendicular; the census at a1 in {65, 37.5, 112.75, 90}; the family count
table 4/2/2/2/2/4/8; the three-route reduction to a3=a5; the V4 position
group with the two linear pairings; the zigzag 70; the positive sweep at-most-
one-non-acute; exterior sweeps; polygon sums n=3..12; the honest decimals
128.571429 and 147.272727; the octant 270/excess 90).

## Ground truth register (web-verified 2026-11-26, banked as geo-ch02-web-ground)

- Euclid does not use the fifth postulate until Proposition I.29; nearly all
  of the rest of Book I depends on it (Joyce's Elements, aleph0.clarku.edu/
  ~djoyce/elements/bookI/post5.html; propI-29.htm for the statement).
- I.29: "A straight line falling on parallel straight lines makes the
  alternate angles equal to one another, the exterior angle equal to the
  interior and opposite angle..." (Joyce; themathpage.com/aBookI/propI-29-30.htm).
- The 360-degree circle: Babylonian base-60 sexagesimal astronomy (60
  divisible by 2,3,4,5,6; the year's roughly 360 days), the angle-degree
  standard adopted by the Greeks (historytoday.com "Why a Circle Has 360
  Degrees"; hsm.stackexchange.com/questions/1884).
- Proclus (c. 450 CE, Commentary on the First Book of Euclid's Elements) on
  the fifth postulate: it "ought even to be struck out of the Postulates
  altogether; for it is a theorem involving many difficulties"
  (famousscientists.org/proclus; the Ursinus Lodder mini-project PDF).
- Banked by run 124 under geo-euclid-elements / geo-hilbert-grundlagen:
  Playfair 1795; Saccheri 1733; Lobachevsky 1829; Bolyai 1832; Euclid Book I
  proposition census; Hilbert's axiom groups.

STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure, Illustration,
quiz item and exercise is OUR OWN.

## Integration (run 126)

scripts/assemble_run126.py (on the assemble_run125.py pattern): JOB 1 builds
src/data/library/books/mathematics/geometry/ch-02.ts from the four parts
(import '../../../src/data/library/types' stripped; palette const c2X ->
renamed c21..c24 + f21..f24 per part tag; helpers geo21..geo24); JOB 2 builds
scripts/verify-book5-ch02.ts (the four v-files wrapped whole as async
sections, `mod = await import('./part-geo2XX')` redirected to
`Promise.resolve({ lessonGeo2XX })`, cut at the `/* bottom harness */`
marker, + section Z the closed-chapter census); JOB 3 swaps book.ts
(chapter2 imported, the planned object replaced, STATUS refreshed).
Gates: verifier ALL GREEN, tsc 0, lint 0 errors, lib:pack+check (expect
219 written lessons), standing gates (topic 667, toc 4023, math-shelf
data-dependent), E2E per lesson x3 viewports, VLM figure audit light+dark.
