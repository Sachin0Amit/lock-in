import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 8: Geometry Foundations
 *
 * LESSON 8.1 Points, Lines and Planes (run 37, 2026-11-05) — the visual
 * half of mathematics begins, and chapter 7's ruler line turns out to be
 * a geometric object wearing coordinates: the ideal objects defined in
 * the formal shape (a point is said to be a location — an exact position
 * with no size, no parts; a line is said to be a straight path with no
 * width, extending without end in both directions; a plane is said to be
 * a perfectly flat stage extending everywhere), the drawn-versus-ideal
 * Caution, the segment (two endpoints, a measurable length) and the ray
 * (one endpoint, one direction forever) as the line's bounded cousins,
 * the length cash |a−b| re-reading 7.4's distance formula as an untagged
 * equation; figure 1 the three avatars (segment / ray / line on one
 * 760-px stage, endpoint dots vs solid arrowheads); the naming roman run
 * (segment AB = segment BA; ray AB ≠ ray BA; line AB = line BA);
 * Illustration 1 reads the number line as a geometry kit (the mark at
 * −8, the segment [−8, 5] of length 13, the leftward ray, the whole
 * line); the two-point rule as equation tag 1 (two distinct points ⇒
 * exactly one line — existence from Euclid's Postulate 1, the modern
 * incidence dress made explicit), the derivation that two distinct
 * lines share at most one common point (the contrapositive staircase),
 * the meeting verdict (intersecting — exactly one common point — or
 * parallel — none; Euclid's Definition 23 dress with its load-bearing
 * "same plane" clause), the different-planes Note (skew lines exist off
 * the plane; school geometry stays on the stage), the concurrency
 * instance; figure 2 the three meeting layouts (intersecting at the
 * lattice point (95,150); parallel at a constant 60 px offset; three
 * lines concurrent through O = (635,150)); Illustration 2's consistent
 * configuration (l ∩ m = {P}, l ∩ n = {O}, m ∥ n — verified by
 * slope/intercept machinery in the verify script); the counting law
 * N = n(n−1)/2 as equation tag 2 with its double-count derivation
 * (brute-force pair enumeration n = 2..8, closed form to n = 20);
 * lines-versus-segments under collinearity (3 collinear points: 3
 * segments but 1 line; 4 points with exactly 3 collinear: 6 segments
 * but 4 lines; no-three-collinear certified by parabola placement with
 * all 56 triples cross-product tested); Illustrations on the 5-marble
 * count (10 & 10), the 4-point pool (6 segments, 4 lines) and the exam
 * classic 8 points (28 & 28); the segments-don't-care Caution; the
 * harvest para; the exam corner (count-and-classify shapes in the SSC
 * CHSL / RRB NTPC / banking banks — shapes cited, no question
 * reproduced); the historical callout (Euclid's Elements c. 300 BCE in
 * Alexandria — 13 books, 465 propositions; Book I opens with 23
 * definitions, 5 postulates, 5 common notions; Postulate 1 the joining
 * line, Postulate 2 the endless production, Definition 23 the parallel
 * dress; Hilbert's 1899 Grundlagen stating the incidence facts outright);
 * 8 terms, 5-quiz keys 3/1/1/2/3 and 12 exercises L1–L6 (L6: the
 * counting derivation cashed at n = 12 → 66; the three-line triangle
 * theorem proved from the two-point rule). Scope guard: no angle
 * measurement (8.2 owns the turn), no transversal angle facts (8.3), no
 * coordinate-plane machinery in the content — the slope/intercept sweep
 * lives only in the verify script — and no triangle congruence or area
 * (8.4/8.5). Authored natively in the Cengage voice + solution chain;
 * every number pre-verified by scripts/verify-unit-8.ts (102 checks,
 * A–N) BEFORE writing.
 *
 * LESSON 8.2 Angles and Their Measurement (run 38, 2026-11-05) — the
 * first measured quantity that is not a length: the angle defined as
 * two rays with a common endpoint in the is-said-to-be shape (vertex,
 * arms; Euclid's Definition 8 inclination dress), the naming rules as
 * a roman run (∠ABC = ∠CBA, vertex never leaves the middle), the
 * static-vs-dynamic Note; the degree ledger as equation tag 1 (full
 * turn 360°, half 180°, quarter 90°) with the honest Babylonian
 * history (base 60, the sun's ≈1°/day walk, the 24 divisors of 360,
 * "nobody knows for certain") and the sexagesimal minutes/seconds;
 * the five sizes (Euclid Defs 10–12 comparative → degree ranges) with
 * the witness table; figure 1 the five sizes gallery drawn to scale
 * (40/90/130/180/220 at vertices 76/228/380/532/660, ray arms with
 * solid heads, arcs between the arms, the right-angle chevron, all
 * label clearances script-swept); Postulate 4 and the square-corner
 * mark; the smaller-turn convention Note (clock 9:00 → 90 not 270);
 * the protractor section with figure 2 (scale arc r = 210 about
 * (380,330), outer labels at r = 232, inner at r = 186, minor ticks
 * every 10°, the long 50° tick collinear with the upper arm, the
 * two-scales-sum-to-180 fact) and the two-scale trap Caution;
 * Illustration 1 the read (outer 50 vs inner 130, the acute sense
 * check), Illustration 2 the door reflex (360 − 115 = 245); angle
 * arithmetic: complementary/supplementary Definition (comp(x) =
 * 90° − x, supp(x) = 180° − x as tag 2), the supp − comp = 90°
 * identity derived (the x cancels; swept over every integer degree),
 * Illustration 3 comp/supp of 37° (53/143), Illustration 4 the
 * 24°-more-than-its-complement equation (x = 33, angle 57),
 * Illustration 5 the four-ray census (6 angles, n(n−1)/2 again); the
 * harvest roman ledger; the exam corner (classification, comp/supp,
 * equation narrations, clock angles at the hour-hand 30°/h =
 * 0.5°/min and minute-hand 6°/min speeds — shapes cited, none
 * reproduced); the historical callout (Euclid Defs 8/10/11/12 +
 * Postulate 4; Babylonian 360 with honest uncertainty; Huddart's
 * 1801 protractor per Britannica; the one-sentence radian forward
 * pointer); 11 terms, 5-quiz (keys 1/1/0/2/2 verified live), 12
 * exercises L1–L6 (L6: the identity proof cashed at 47° → 133 − 43 =
 * 90; five-times-its-supplement → 150 with the acute impossibility).
 * Scope guard: no linear-pair or vertically-opposite facts (8.3 owns
 * angle pairs on drawn lines), no triangle angle sum (8.4), no
 * transversal facts (8.3), no radian conversion content (a
 * one-sentence forward Note only). Authored in the Cengage voice +
 * solution chain; every number pre-verified by verify-unit-8.ts
 * sections O–W (extended to 187 checks) BEFORE writing.
 *
 * LESSON 8.3 Parallel Lines and Transversals (run 39, 2026-11-05) —
 * parallelism becomes measurable: the transversal defined in the
 * is-said-to-be shape (distinct-points clause tied back to 8.1's
 * concurrency), figure 1 the eight-angle scene (l ∥ m horizontal,
 * t at slope 1 through P (300,120) and Q (460,280), interior band
 * tinted, angles 1–8 numbered clockwise from the top left at each
 * crossing, every label's ≥ 8 px clearance script-swept); the pair
 * families roman run (8 linear + 4 VO + 4 corresponding + 2 alternate
 * interior + 2 co-interior + 2 alternate exterior + 2 co-exterior =
 * 24 named of the 28, four unnamed — the 8.1 census law at n = 8);
 * the linear-pair law derived from 8.2's straight angle (tag 1) and
 * the vertically-opposite theorem derived from two linear pairs (the
 * same cancellation as 8.2's supp − comp identity); the
 * corresponding-angles axiom presented honestly as THE assumption
 * (Euclid's Postulate 5 in school dress), then alternate interior
 * equal and co-interior supplementary DERIVED from it (tags 2);
 * figure 2 the F/Z/C memory patterns (three panels at 60°, arcs on
 * the marked pairs, value labels 120°/120°, 60°/60°, 60°/120°);
 * the three parallel tests as biconditionals (tag 3) with the
 * co-interior test chain derived through the converse axiom; the
 * Playfair uniqueness Note (Proclus c. 450, Ludlam 1785, Playfair
 * 1795); Illustrations 1–6 (the 74° crossing read; the full 130°
 * eight-angle read with reasons; the 2:3 co-interior ratio → 72/108;
 * the 74 + 106 = 180 parallel verdict; the (x + 85)/(2x − 25)
 * equation → x = 40, 125/55; the census 24 + 4 = 28); the harvest
 * roman ledger; the exam corner (read-all-eight, find-x co-interior
 * algebra, corresponding-pair verdicts, ratio items, three-line
 * census — shapes cited, none reproduced); the historical callout
 * (Postulate 5's full dress; I.27 without the postulate vs I.29 the
 * first use; Proclus/Ludlam/Playfair; Lobachevsky 1826/1829–30 and
 * Bolyai 1832 — the postulate independent, Gauss unpublished; the
 * non-Euclidean forward pointer); 11 terms, 5-quiz (keys 1/2/1/0/2
 * verified live), 12 exercises L1–L6 (L6: the co-interior-supplementary
 * proof chained through VO + the converse axiom; the co-exterior
 * 96/84 verdict with the full eight-angle read). Authored in the
 * Cengage voice + solution chain; every number pre-verified by
 * verify-unit-8.ts sections X–AE BEFORE writing.
 *
 * LESSON 8.4 Triangles and the Angle Sum (run 40, 2026-11-05) — the
 * chapter's three tools converge on the first closed figure: the
 * triangle defined in the is-said-to-be shape with the non-collinear
 * clause tied back to 8.1's collinearity test (three collinear points
 * give area 0), vertices/sides/interior angles named in both the
 * capital and small-letter dress with the opposite-pairing roman run,
 * figure 1 the anatomy with side BC produced to D and the dashed
 * exterior angle at C (linear-pair mate of interior ∠C); the angle sum
 * property DERIVED as the derivation block's five-step chain (tag 1):
 * the parallel XY through A (Playfair's uniqueness the licence),
 * alternate-interior equalities ∠XAB = ∠ABC and ∠CAY = ∠ACB (8.3's
 * Z pattern), the straight-angle partition at A (8.2's ledger), the
 * substitution — figure 2 the whole exchange drawn (equal-mark arcs
 * 1/1 and 3/3, the double arc on the staying angle 2, the caption
 * 1 + 2 + 3 = 180°); the third-angle engine ∠C = 180 − ∠A − ∠B; the
 * exterior angle property DERIVED as tag 2 (linear pair + tag 1, the
 * 8.3 cancellation) with the inequality reading (∠ACD > each remote,
 * Euclid I.16's content) — swept over 400 pseudo-random triangles × 3
 * vertices (1200 positions); classifications both axes with the
 * one-right/one-obtuse law derived from the budget argument, tag 3 the
 * right-triangle complement ∠A + ∠B = 90°, the isosceles base-angle
 * theorem stated honestly (Euclid I.5 pons asinorum; classical proofs
 * need SAS congruence — certified numerically over apex 10°…170°,
 * proved when congruence arrives), equilateral 60-60-60 as the only
 * equiangular possibility, the six-family witness table (side
 * witnesses pass the inequality, angle witnesses re-sum), figure 3 the
 * six-panel gallery (scalene/isosceles/equilateral with tick marks;
 * acute/right/obtuse with the square corner mark; all measures
 * recomputed from the panel coordinates); the triangle inequality from
 * the two-circle construction engine swept over all 5832 integer
 * triples 1–18 in three dresses (three-dress, largest-side, the
 * degenerate collinear equality = 8.1's test), Illustrations 1–6
 * (62/45→73; ratio 2:3:4→40/60/80; exterior 120+remote 50→70/60;
 * isosceles apex 40→70/70; right 37→53; (4,6,11) no / (4,6,9) yes);
 * the Proclus polygon Note ((n−2)×180, exterior sum 360°); the exam
 * corner (SSC/RRB/banking angle-chase staples, none reproduced); the
 * historical callout (Euclid I.32's two-part statement and its
 * I.31/I.29/I.13 machinery = our tools; the pons asinorum naming; the
 * angle sum EQUIVALENT to Postulate 5 — the spherical octant triangle
 * computed at 270° > 180°, the hyperbolic defect; the Gauss
 * Brocken–Hohehagen–Inselsberg legend told honestly — Hanover survey
 * 1818–32, Buhler: the space-testing motive a myth); 12 terms, 5-quiz
 * (keys 1/2/1/1/2 verified live), 13 exercises L1–L6 (L6: the
 * exterior-angle proof quoted tool by tool; the isosceles apex-40
 * exterior chase cashed both routes 110° = 110°). Scope guards: no
 * medians/altitudes (8.5), no Pythagoras, no congruence proofs, no
 * polygon-angle general derivation beyond Proclus's Note, no
 * larger-side-larger-angle theorem, no compass constructions, no
 * trigonometry. Authored in the Cengage voice + solution chain; every
 * number pre-verified by verify-unit-8.ts sections AF–AN (339 checks
 * total, extended 253 → 339) BEFORE writing.
 *
 * LESSON 8.3 scope guards (run 39): no triangle angle sum (8.4), no
 * exterior-angle-inequality proof (I.16), no non-Euclidean content
 * beyond the callout, no perpendicular-distance-between-parallels, no
 * compass construction of parallels.
 *
 * LESSON 8.5 Perimeter and Area of Rectangles, Triangles and Circles
 * (run 41, 2026-11-05 — the chapter's closing lesson): the two paying
 * questions, the walk around (perimeter, length units) and the fill
 * inside (area, square units), kept apart by design; the perimeter
 * defined is-said-to-be with the polygon-sum and the regular n × s
 * dress, the rectangle walk derived as tag 1 (P = 2(l + b), square
 * 4a, the half-walk named), Illustration 1 the fence 24 × 17 → 82 m
 * at Rs 15/m → Rs 1,230; the fixed-perimeter table (nine rectangles
 * of P = 36, areas 17..81 — strictly climbing to the square) with the
 * square-wins Note swept over every even perimeter 4..200 and the
 * fixed-AREA mirror (36: walk 74 down to 24), the perimeter-never-
 * fixes-area Caution; area defined is-said-to-be on the unit square,
 * A = l × b derived from the tiling as tag 2 (square a²), figure 1
 * the 5 × 3 tiled rectangle and its diagonal (two copies of one
 * triangle), Illustration 2 the floor 5 × 4 m in 50-cm tiles → 80
 * both ways; area units by the rescaled tile (1 m² = 10⁴ cm², the
 * ×100 reflex Caution; 1 hectare = 10⁴ m², field 200 × 150 = 3 ha);
 * the triangle's area derived as tag 3 — two copies of a right
 * triangle tile its leg-rectangle (the half-turn about the hypotenuse
 * midpoint, script-swept p, q = 1..12), then the altitude split whose
 * x cancels (swept on 500 pseudo-random triangles, apex outside the
 * base included) — A = ½ × b × h, the perpendicular-height Caution
 * (½·4·5 = 10 refused against the true 6), Illustration 3 the 3-4-5
 * audited through all three base-height dresses (the hypotenuse
 * altitude 12/5 = 2.4) and Illustration 4 the sail 15 × 8 → 60;
 * the circle: π DEFINED as the constant ratio C/d, C = πd = 2πr as
 * tag 4 with figure 2 the circumference unrolled straight (drawn to
 * scale, 2π × 90 ≈ 565.5 px for r = 90 px), the two working values
 * priced (22/7 0.04% high, 3.14 0.05% low), Illustration 5 the r = 7
 * → C = 44 round-trip with C = 132 → d = 42; the sector rearrangement
 * (8 slices stood side by side, height r, top edge πr exactly) as
 * figure 3 and the derivation behind tag 5 A = πr² = πd²/4 (the
 * saw-teeth honestly flagged as the school-level licence), the
 * diameter-fraud Caution (πd² overshoots ×4: 616 vs 154 at d = 14),
 * Illustration 6 the r = 7 circle fill/walk both ways plus the
 * A = 154 inverse; composite figures (the L-shape 12 × 9 minus 5 × 4
 * → 88 m², walk 42 m; interior cuts never walked), Illustration 7 the
 * arched window (90 × 120 + semicircle r = 45: glass ≈ 13,982 cm²,
 * beading ≈ 471.4 cm); the exam corner (fence/carpet costs, fixed-
 * perimeter optimals, C↔r↔A round-trips, unit rescalings) and the
 * historical callout (Archimedes' 96-gon squeeze 3 10/71 < π < 3 1/7;
 * Aryabhata's 62832/20000 = 3.1416; Zu Chongzhi's Milü 355/113 to six
 * decimals; Lambert 1761 irrationality + Lindemann 1882; William
 * Jones 1706 the letter, Euler's adoption); 12 terms, 5-quiz (keys
 * 1/2/3/1/2), 12 exercises L1–L6 (L6: the two-copy proof quoted tool
 * by tool; the 3-4-5 audited three ways with the fraud refused);
 * 5,967 words in the Cengage voice + solution chain;
 * verify-unit-8.ts EXTENDED 339 → 429 checks (AO–AZ) ALL PASS
 * pre-writing.
 *
 * References for this unit: NCERT class-6 ch. 4 "Basic Geometrical
 * Ideas" (the point/segment/line/ray charter; parallel lines; §4.11
 * the triangle's parts) + NCERT class-7 ch. 6 "The Triangle and Its
 * Properties" (the exterior-angle and angle-sum properties; web-checked
 * run 40) + NCERT class-9 ch. 5 "Introduction to Euclid's Geometry"
 * (Euclid's definitions, axioms and postulates) + Khattar, Quantitative
 * Aptitude (4e) geometry-counting staples — the NCERT chapter identities
 * web-checked (sanctioned fallback), no content reproduced;
 * see docs/project/SOURCE_LOG.md. Exposition original.
 * 8.5 references: Ganita Prakash class-6 ch. 6 "Perimeter and Area"
 * (perimeter by the sum of sides; area by tiling) + NCERT class-7
 * ch. 11 "Perimeter and Area" (triangles as parts of rectangles;
 * C = 2πr; A = πr²; 1 hectare = 10,000 m²; web-checked run 41) —
 * no content reproduced; exposition original.
 */
export const chapter08: Chapter = {
  number: 8,
  slug: 'geometry-foundations',
  title: 'Geometry Foundations',
  summary:
    'The visual half of mathematics begins and pays: points, lines, planes and angles as ideal objects; measuring angles; parallel lines and transversals; triangles and the angle-sum result; and the walk (perimeter) and fill (area) of the rectangle, the triangle and the circle — every formula derived from the tools before it.',
  status: 'complete',
  lessons: [
    {
      id: 'fm-points-lines-and-planes',
      number: '8.1',
      title: 'Points, Lines and Planes',
      concepts: [
        'Point as pure location',
        'The line — breadthless and endless',
        'Line segment and its length',
        'The ray — one endpoint, one direction',
        'The plane as the flat stage',
        'The two-point rule',
        'Intersecting and parallel lines',
        'Counting segments and lines n(n−1)/2',
      ],
      objectives: [
        'Define the ideal objects — point, line, ray, line segment, plane — and explain why every drawing is only a picture of them',
        'Name segments, rays and lines correctly, and tell apart segment AB = segment BA from ray AB ≠ ray BA',
        'State and use the two-point rule: exactly one line passes through two distinct points — and conclude that two distinct lines share at most one common point',
        'Classify pairs of lines in a plane as intersecting or parallel, recognise concurrent triples, and count segments and lines among n points with N = n(n−1)/2',
        'Re-read the number line as geometry: coordinates as points and 7.4\u2019s distance formula |a − b| as the length of the joining segment',
      ],
      prerequisites: ['fm-absolute-value-as-distance', 'fm-negative-numbers-why-they-exist'],
      sources: ['ncert-math6-ch4', 'ncert-math9-ch5', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Seven chapters lived on a line. The number line of Lesson 1.1 grew from a counting ruler into the two-way stage of chapter 7 — points wearing signed names, walks carrying the operations, bars reading distances — and every idea in this book so far has been, in the end, a story about positions and steps along one straight path. That path was doing double duty without saying so: it was a *line* all along, one of the most stubborn objects mathematics owns. This chapter opens the visual half of the subject properly. The line now shares the stage with the objects it was always secretly made of — points, and the flat *plane* it draws across — and with new children: angles, triangles, the shapes whose logic is looked at rather than counted.',
        },
        {
          kind: 'para',
          text: 'A warning before the first definition, because it explains the whole chapter\u2019s manner. Geometry\u2019s objects are **ideal**: the point has no size, the line no width, the plane no bump — and *nothing drawn is ever the thing*. The dot on paper is a few tenths of a millimetre wide; the point it pictures has no width at all. Every figure in this book is a map, not a territory: it records relationships, and the relationships are exact even where the ink is not. This is not a defect to apologise for but the source of geometry\u2019s power — idealised hard enough, the objects stop arguing back, and whatever is derived about them holds everywhere, for every dot and every stroke, forever.',
        },
        { kind: 'heading', text: 'Points, lines and planes: the ideal objects' },
        {
          kind: 'para',
          text: 'Begin with the smallest idea in mathematics, because every other idea in this chapter is built from it. A **point** marks a place — an *exactly where* with no *how big*. Chapters 1\u20137 have been drawing points all along without naming the notion: each tick of the number line is one, each dot where an arc lands is one. The mark at $-8$ is not the number $-8$ — the number is the name, the point is the place — and the ruler of chapter 7 is best described in new dress: a line whose points have agreed to wear coordinates.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Point',
          text: 'A **point** is said to be a **location** — an exact position that has no size, no shape and no parts. A point is named by a single capital letter: $A$, $B$, $P$. The dot drawn to picture it has width; the point itself has none. Euclid said it first: a point is \u201cthat which has no part\u201d.',
        },
        {
          kind: 'para',
          text: 'For example, the notion is already familiar in three dresses:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'the tick at $-8$ on the number line — a point wearing the coordinate $-8$;',
            'a capital city on a map — the printed circle has area, but the location it names has none;',
            'the corner of this page — where two edges meet, there is exactly a *where*, and nothing left over.',
          ],
        },
        {
          kind: 'para',
          text: 'Slide a point along without ever turning, and its footpath is the next object. The line is the chapter\u2019s old friend in official dress — and the definition is deliberately built from two *absences*, width and end, because those are exactly the two things every drawing has too much of.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Line',
          text: 'A **line** is said to be a **straight path with no width, extending without end in both directions**. A line through two named points $A$ and $B$ is written $\\overleftrightarrow{AB}$; a single small letter — $l$, $m$, $n$ — names a line on its own. Euclid again: \u201ca line is breadthless length\u201d, produced indefinitely both ways.',
        },
        {
          kind: 'para',
          text: 'The line\u2019s two bounded cousins follow by switching the endings back on. Cut a finite piece out of a line — endpoints included — and the piece is a **line segment**: it has two endpoints, it does not continue, and because it stops it has a *length you can measure*. Start from one endpoint and run forever in exactly one direction, and the path is a **ray**: one endpoint, one direction, no other end.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Line segment',
          text: 'A **line segment** is said to be the **part of a line between two given points, endpoints included**. The segment joining $A$ and $B$ is written $\\overline{AB}$ (or plainly \u201csegment $AB$\u201d), and its **length** is the distance between the endpoints — a number, always.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Ray',
          text: 'A **ray** is said to be the **part of a line that starts at one endpoint and extends without end in one direction**. The ray that begins at $A$ and passes through $B$ is written $\\overrightarrow{AB}$: the endpoint is named *first*, because the ray\u2019s whole identity hangs on where it starts and which way it runs.',
        },
        {
          kind: 'para',
          text: 'The segment is the one of the three that chapter 7 has already measured. Put the ruler line under the segment and let the endpoints wear coordinates $a$ and $b$: the length is exactly 7.4\u2019s distance formula, re-read in a geometric accent.',
        },
        {
          kind: 'equation',
          latex: '\\text{length}(\\overline{AB}) \\;=\\; |a - b| \\;=\\; |b - a|',
          note: 'The length of the segment joining the points wearing coordinates $a$ and $b$ on the ruler line — 7.4\u2019s distance formula $\\text{gap}(a,b) = |a-b| = |b-a|$, now read as a *measurable length*. Script-verified on all $441$ pairs in $[-10, 10]^2$: either order, one length, zero exactly when the endpoints coincide.',
        },
        {
          kind: 'para',
          text: 'Figure 1 lines up the three avatars of a straight path so the endpoint logic can be seen at a glance — and the differences are the whole content: how many endpoints, how many directions.',
        },
        {
          kind: 'figure',
          caption:
            'The three avatars of a straight path. The segment has two endpoint dots and stops; it has a measurable length. The ray begins at the endpoint dot $A$, walks through $B$, and leaves forever — one solid head, one direction. The line has no endpoints at all: solid heads at both ends, points $A$ and $B$ merely riding on it. The dots mark points; the solid heads say \u201cno end here\u201d.',
          svg: `<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three stacked panels: a segment with two endpoint dots, a ray with one endpoint dot and one solid arrowhead, and a line with solid arrowheads at both ends">
  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the same straight path, three avatars — how each one begins and ends</text>
  <line x1="160" y1="80" x2="600" y2="80" stroke="currentColor" stroke-width="2"/>
  <circle cx="160" cy="80" r="5" fill="currentColor"/>
  <circle cx="600" cy="80" r="5" fill="currentColor"/>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="160" y="108">A</text><text x="600" y="108">B</text>
  </g>
  <text x="380" y="132" font-size="12.5" fill="currentColor" text-anchor="middle">the segment AB — two endpoints; a length you can measure</text>
  <line x1="160" y1="185" x2="600" y2="185" stroke="currentColor" stroke-width="2"/>
  <circle cx="160" cy="185" r="5" fill="currentColor"/>
  <circle cx="420" cy="185" r="5" fill="currentColor"/>
  <polygon points="600,185 586,179 586,191" fill="currentColor"/>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="160" y="213">A</text><text x="420" y="213">B</text>
  </g>
  <text x="380" y="237" font-size="12.5" fill="currentColor" text-anchor="middle">the ray AB — begins at A, passes through B, never ends</text>
  <line x1="120" y1="290" x2="640" y2="290" stroke="currentColor" stroke-width="2"/>
  <polygon points="120,290 134,284 134,296" fill="currentColor"/>
  <polygon points="640,290 626,284 626,296" fill="currentColor"/>
  <circle cx="280" cy="290" r="5" fill="currentColor"/>
  <circle cx="480" cy="290" r="5" fill="currentColor"/>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="280" y="318">A</text><text x="480" y="318">B</text>
  </g>
  <text x="380" y="342" font-size="12.5" fill="currentColor" text-anchor="middle">the line AB — no endpoints; both directions forever</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Read the number line as a geometry kit: the mark at $-8$, the piece from $-8$ to $5$, the leftward path out of $-8$, and the whole ruler.',
          steps: [
            'Now, the tick at $-8$ is a point — chapter 7 walked on it, geometry names it $P$.',
            'So the piece between $-8$ and $5$, endpoints included, is the segment joining them, and its length is $|5 - (-8)| = |13| = 13$ — 7.4\u2019s formula, now a length.',
            'And the path that starts at $-8$ and runs toward ever-smaller numbers, never stopping, is a ray with endpoint $-8$; the whole ruler extended both ways past every mark is the line.',
            'Hence one instrument, four ideas: point, segment of length $13$, ray, line — the number line was geometry all along.',
          ],
        },
        {
          kind: 'para',
          text: 'Naming deserves its own sentence, because the notation carries information that words must not blur. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\overline{AB} = \\overline{BA}$ — the same segment either way: two endpoints, no direction, one length.',
            '$\\overrightarrow{AB} \\ne \\overrightarrow{BA}$ — different rays: the first begins at $A$ and runs through $B$ forever; the second begins at $B$ and runs away the opposite way. For rays the order of the names is the content.',
            '$\\overleftrightarrow{AB} = \\overleftrightarrow{BA}$ — one line, two names: both points sit on it, and the line forgets which was listed first.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The drawing is not the thing',
          text: 'Every figure in this chapter (and this book) is a picture of the ideal objects, never the objects themselves: the printed dot is several hundred times wider than nothing, the printed line has visible thickness and stops at the frame. Read diagrams the way maps are read — for the *relationships*. When a proof says \u201cthe lines meet at a point\u201d, the exactness lives in the claim, not in the pixel where two strokes cross.',
        },
        {
          kind: 'para',
          text: 'One more object completes the stage. Points are $0$-dimensional wheres, lines are $1$-dimensional paths — and spreading a line sideways, without thickness and without edge, gives the flat, endless **plane**: the tabletop imagined without rim or grain, extending past every horizon in every direction. All of school geometry happens on such a stage; when this book says \u201ctwo lines in a plane\u201d, the plane is the agreement that the lines are players in the same game.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Plane',
          text: 'A **plane** is said to be a **perfectly flat surface that extends without end in every direction** — length and breadth, no thickness. Euclid\u2019s dress: a plane surface \u201clies evenly with the straight lines on itself\u201d. Points and lines live in the plane; a plane is named by a capital letter or by three of its points.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Three points that refuse one line fix one plane',
          text: 'A single point or a single line slides and spins freely on a stage — neither fixes the plane. But three points that are *not* all on one line lock it: set a tripod on the floor and it cannot wobble, because its three feet cannot all slide into one straight path. The tripod fact is the plane\u2019s own stability law — no two-legged stool stands still.',
        },
        { kind: 'heading', text: 'The two-point rule: how a line is fixed' },
        {
          kind: 'para',
          text: 'How much information does it take to pin a line down completely? Less than it seems: *two points are enough*. That two points always admit a joining line is the oldest standing agreement in mathematics — Euclid\u2019s first postulate, \u201cto draw a straight line from any point to any point\u201d. That the line is then *forced* — no second, different line through the same pair — is the uniqueness half, which Euclid\u2019s system supplies and modern axiomatisations state outright. Together the two halves are the rule this chapter will lean on more than any other.',
        },
        {
          kind: 'equation',
          latex: 'P \\ne Q \\;\\Longrightarrow\\; \\text{exactly one line passes through } P \\text{ and } Q',
          note: 'The two-point rule. Existence: Euclid\u2019s Postulate 1 draws the joining line. Uniqueness: a second, different line through the same two points is impossible — and the derivation below harvests the consequence immediately. The rule is why a line may be *named* by any two of its points: the pair fixes the line, so the name names it.',
        },
        {
          kind: 'para',
          text: 'The uniqueness half sounds modest and is not: it forbids two distinct lines from *sharing two points*, and that single prohibition decides every meeting question in the plane.',
        },
        {
          kind: 'derivation',
          title: 'Why two distinct lines share at most one common point',
          statement:
            'Let $l$ and $m$ be two distinct lines in a plane. Why can they share at most one common point — never two?',
          steps: [
            {
              label: 'Suppose they share two distinct points',
              formula: 'P, Q \\in l \\text{ and } P, Q \\in m, \\quad P \\ne Q',
              explanation:
                'Assume, for contradiction, that both lines pass through the same two distinct points $P$ and $Q$.',
            },
            {
              label: 'Summon the two-point rule',
              formula: '\\text{exactly one line passes through } P \\text{ and } Q',
              explanation:
                'By the two-point rule, the pair $\\{P, Q\\}$ fixes its joining line completely — there is no second candidate.',
            },
            {
              label: 'Both lines are that line',
              formula: 'l = \\text{the joining line} = m',
              explanation:
                'Each of $l$ and $m$ is a line through $P$ and $Q$, and only one such line exists — so they coincide, contradicting the assumption that they are distinct.',
            },
            {
              label: 'Read the verdict',
              formula: 'l \\ne m \\;\\Longrightarrow\\; |l \\cap m| \\le 1',
              explanation:
                'The supposition is impossible; two distinct lines share at most one common point. Swept over a grid of $15$ slopes and $15$ intercepts — every distinct pair of lines shares exactly $0$ or $1$ common point, never more.',
            },
          ],
          result:
            'Two distinct lines in a plane meet in exactly one common point, or in none. There is no third way — and no second meeting.',
        },
        {
          kind: 'para',
          text: 'The verdict\u2019s two cases deserve their names. Two distinct lines sharing exactly one common point are **intersecting** lines, and the shared point is where the action is. Two distinct lines in the same plane sharing *no* point are **parallel** — the ruler\u2019s two long edges, the railway track\u2019s two rails, forever close, forever apart.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Parallel lines',
          text: 'Two lines are said to be **parallel** when they lie **in the same plane** and, produced indefinitely in both directions, **never meet** — no common point. Written $l \\parallel m$. Euclid\u2019s Definition 23 says exactly this, and its \u201csame plane\u201d clause is load-bearing: without it the definition wobbles.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Same plane, or the definition wobbles',
          text: 'Off the flat stage, the verdict changes: two lines in *different* planes may share no point yet not be parallel either — they run past each other like one flyover crossing another at a distance, never meeting, never sharing a direction. Such lines are called *skew*, and they are why every careful definition of parallel insists on the same plane. School geometry stays on one stage unless it says otherwise, so from here on \u201ctwo lines\u201d means two lines in a plane.',
        },
        {
          kind: 'para',
          text: 'Figure 2 draws the verdict\u2019s full menu. Panel (a): two lines crossing at exactly one point — the intersection. Panel (b): two lines with equal lean and a constant gap — parallel, no meeting anywhere, ever. Panel (c): a bonus arrangement beyond pairs — three lines all passing through one shared point, the **concurrent** configuration.',
        },
        {
          kind: 'figure',
          caption:
            'How lines meet in a plane — solid heads mark the endless production, as in figure 1. Panel (a) — intersecting: the two drawn lines cross at exactly one point $P$; two distinct lines can never manage a second. Panel (b) — parallel: equal lean, constant gap, produced forever without meeting. Panel (c) — concurrent: three lines sharing one point $O$; several lines may pool in a single point when all of them pass through it.',
          svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three panels: two lines intersecting at a point P, two parallel lines with a constant gap, and three concurrent lines through one point O">
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="110" y="40">(a)</text><text x="375" y="40">(b)</text><text x="635" y="40">(c)</text>
  </g>
  <line x1="20" y1="200" x2="200" y2="80" stroke="currentColor" stroke-width="1.5"/>
  <line x1="20" y1="100" x2="200" y2="220" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="200,80 192.2,90 187.8,83.3" fill="currentColor"/>
  <polygon points="20,200 32.2,196.7 27.8,190" fill="currentColor"/>
  <polygon points="200,220 187.8,216.7 192.2,210" fill="currentColor"/>
  <polygon points="20,100 27.8,110 32.2,103.3" fill="currentColor"/>
  <circle cx="95" cy="150" r="5" fill="currentColor"/>
  <text x="95" y="132" font-size="13" fill="currentColor" text-anchor="middle">P</text>
  <text x="110" y="250" font-size="12.5" fill="currentColor" text-anchor="middle">intersecting — exactly one common point</text>
  <line x1="280" y1="140" x2="470" y2="80" stroke="currentColor" stroke-width="1.5"/>
  <line x1="280" y1="200" x2="470" y2="140" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="470,80 459.8,87.4 457.4,79.8" fill="currentColor"/>
  <polygon points="280,140 292.6,140.2 290.2,132.6" fill="currentColor"/>
  <polygon points="470,140 459.8,147.4 457.4,139.8" fill="currentColor"/>
  <polygon points="280,200 292.6,200.2 290.2,192.6" fill="currentColor"/>
  <text x="478" y="78" font-size="14" fill="currentColor" text-anchor="start">l</text>
  <text x="478" y="148" font-size="14" fill="currentColor" text-anchor="start">m</text>
  <text x="375" y="250" font-size="12.5" fill="currentColor" text-anchor="middle">parallel — no common point</text>
  <line x1="540" y1="150" x2="730" y2="150" stroke="currentColor" stroke-width="1.5"/>
  <line x1="565" y1="220" x2="705" y2="80" stroke="currentColor" stroke-width="1.5"/>
  <line x1="540" y1="102.5" x2="730" y2="197.5" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="730,150 718,154 718,146" fill="currentColor"/>
  <polygon points="540,150 552,154 552,146" fill="currentColor"/>
  <polygon points="705,80 699.3,91.3 693.7,85.7" fill="currentColor"/>
  <polygon points="565,220 576.3,214.3 570.7,208.7" fill="currentColor"/>
  <polygon points="730,197.5 717.5,195.7 721.1,188.6" fill="currentColor"/>
  <polygon points="540,102.5 548.9,111.4 552.5,104.3" fill="currentColor"/>
  <circle cx="635" cy="150" r="5" fill="currentColor"/>
  <text x="635" y="176" font-size="13" fill="currentColor" text-anchor="middle">O</text>
  <text x="635" y="250" font-size="12.5" fill="currentColor" text-anchor="middle">concurrent — three lines, one shared point</text>
  <text x="380" y="296" font-size="12.5" fill="currentColor" text-anchor="middle">two distinct lines in one plane: exactly one common point, or none</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'One configuration, every verdict: three drawn lines $l$, $m$, $n$ with $l$ meeting $m$ at $P$, $l$ meeting $n$ at $O$, and $m$, $n$ never meeting.',
          steps: [
            'Now, $l$ and $m$ share exactly the point $P$ — intersecting, by the definition.',
            'So $l$ and $n$ share exactly the point $O$, distinct from $P$ — intersecting again, and no line can meet $l$ twice.',
            'And $m$ and $n$ share no point while lying in the same plane — parallel by the definition, equal in lean, constant in gap.',
            'Hence one plane, three lines, all three verdicts at once: two intersections and one parallelism — the menu of figure 2 exhausted in a single configuration.',
          ],
        },
        {
          kind: 'para',
          text: 'The concurrent panel earns one more sentence, because concurrency is the meeting verdict\u2019s group portrait. Lines through one point are said to be concurrent, and nothing caps how many: through a *single* point pass infinitely many lines — every lean, every direction, one shared where. The cap appears only when a *second* point is demanded: then the two-point rule slams the door and the crowd collapses to one line.',
        },
        { kind: 'heading', text: 'Counting segments and lines' },
        {
          kind: 'para',
          text: 'The ideal objects are few, but the questions they generate multiply fast, and the commonest family in the examination hall is the census: given a handful of points, how many segments — how many lines? The counting engine is one step up from chapter 3\u2019s pairing arguments: every *pair* of distinct points carries exactly one segment, so counting segments is counting pairs.',
        },
        {
          kind: 'derivation',
          title: 'Why n points carry n(n−1)/2 segments',
          statement:
            'Suppose $n$ points are given, and every pair of them carries one segment with those endpoints. Why is the number of segments exactly $\\dfrac{n(n-1)}{2}$?',
          steps: [
            {
              label: 'Count from each point\u2019s seat',
              formula: 'n \\cdot (n - 1) \\text{ ordered pairs}',
              explanation:
                'Each of the $n$ points pairs with the $n - 1$ others: from $A$ the pairs $AB, AC, \\ldots$ — $n - 1$ choices from each of $n$ seats.',
            },
            {
              label: 'Notice the double count',
              formula: 'AB \\text{ and } BA \\text{ name one segment}',
              explanation:
                'The census has counted every segment twice — once from each endpoint, since $\\overline{AB} = \\overline{BA}$. Five points gave $5 \\times 4 = 20$ ordered pairs but only $10$ segments.',
            },
            {
              label: 'Divide the double away',
              formula: 'N = \\frac{n(n-1)}{2}',
              explanation:
                'Halving the ordered-pair count repairs the double count. Brute-force pair enumeration confirms the closed form for every $n$ from $2$ to $20$.',
            },
          ],
          result:
            'The number of segments with endpoints among $n$ points is $N = \\dfrac{n(n-1)}{2}$ — the pair census, once the echo $AB = BA$ is divided out.',
        },
        {
          kind: 'equation',
          latex: 'N \\;=\\; \\frac{n(n-1)}{2}',
          note: 'The counting law. Cash: $n = 5$ gives $\\frac{5 \\times 4}{2} = 10$ — the marbles of Illustration 3 below; $n = 8$ gives $28$; $n = 12$ gives $66$. Chapter 3\u2019s pairing instincts, formalised.',
        },
        {
          kind: 'example',
          title: 'Five marbles rest on a table, no three in a straight row. How many stretched threads join them in pairs? How many straight lines do the five points determine?',
          steps: [
            'Now, every pair of marbles carries exactly one thread: the census gives $\\frac{5 \\times 4}{2} = 10$ segments.',
            'So for the lines, lean on the promise \u201cno three in a straight row\u201d: no two pairs pool into one line, so every pair owns its own line too.',
            'Hence $10$ threads and $10$ lines — the no-three-collinear promise makes the two censuses agree.',
          ],
        },
        {
          kind: 'para',
          text: 'That last step hid the exam\u2019s favourite trap, and it deserves its own spotlight. **Segments never care about collinearity** — any two points, aligned or not, carry their own segment, so the segment census is always $\\frac{n(n-1)}{2}$. **Lines do care.** Points that *are* collinear — all lying on one line — have their pairs pool: three collinear points carry three segments but only *one* line, because the pairs $AB$, $BC$, $AC$ all name the same straight path. The census of lines therefore depends on the arrangement, and drops every time collinearity pools a family of pairs.',
        },
        {
          kind: 'example',
          title: 'Four points $P$, $Q$, $R$, $S$: $P$, $Q$, $R$ collinear and $S$ off their line. Count the segments and the lines.',
          steps: [
            'Now, segments first, where collinearity is powerless: $\\frac{4 \\times 3}{2} = 6$ — every pair, aligned or not, carries its segment.',
            'So the lines: the three collinear pairs $PQ$, $QR$, $PR$ pool into the *one* line through $P$, $Q$, $R$.',
            'And the remaining pairs $PS$, $QS$, $RS$ each own a fresh line through $S$ — three more, all distinct (no two could coincide without swallowing $S$ into the collinear line).',
            'Hence $6$ segments but $1 + 3 = 4$ lines — the pool cost the census $2$: the raw $6$ minus the $2$ duplicate names the collinear trio absorbed.',
          ],
        },
        {
          kind: 'example',
          title: 'The examination classic: eight points in a plane, no three collinear. How many lines? How many segments?',
          steps: [
            'Now, the no-three-collinear promise means no pooling: every pair of points owns a private line.',
            'So both censuses collapse into the pair count: $\\frac{8 \\times 7}{2} = 28$.',
            'Hence $28$ lines and $28$ segments — and the certificate is honest: eight points planted on the curve $y = x^2$ at $x = 1, \\ldots, 8$ were machine-swept, and all $56$ triples tested non-collinear, the enumerated line count landing exactly on $28$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Segments don\u2019t care; lines do',
          text: 'The single commonest lost mark in counting questions: applying $\\frac{n(n-1)}{2}$ to lines without checking collinearity. The formula counts *segments* unconditionally — but for lines it is a conditional result, exact only when no three of the points sit on one line. Read the promise in the question first; only then choose the census.',
        },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that the stage is set and the grammar is fixed. The ideal objects — point, line, ray, segment, plane — stand defined, with drawings demoted to honest maps; the two-point rule pins a line with a pair of points and caps every meeting at one; the verdict splits all pairs of lines into intersecting or parallel, with concurrency as the group portrait; and the pair census counts segments unconditionally, lines conditionally. Every number this lesson used was computed before it was written — and the same discipline now walks into the chapter\u2019s next idea, where a *ray* spins about its endpoint and the size of the spin gets a name: the angle, measured in degrees, waiting at 8.2.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Points and lines in the examination hall',
          text: 'This lesson\u2019s shapes appear in every aptitude bank as fast scoring items. The census questions — segments and lines among $n$ points, with and without a collinearity twist — recur in SSC CHSL/MTS and RRB NTPC CBT-I banks, where the $\\frac{n(n-1)}{2}$ engine and the collinearity pool are the whole game. Naming and notation items (how many endpoints has a ray; does $\\overline{AB} = \\overline{BA}$; which figure is bounded) appear in banking clerical and CTET-style papers, rewarding the endpoint logic of figure 1. Classification items — intersecting, parallel or concurrent from a description — test the meeting verdict verbatim. And \u201cthe shortest path between two points\u201d reasoning treats the segment\u2019s minimality as common knowledge. The shapes are cited from these banks\u2019 published patterns; none is reproduced. One habit pays for the whole topic: *count pairs, then check the pooling promise*.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Euclid\u2019s Elements: the longest-running textbook in history',
          text: 'Around 300 BCE in Alexandria, Euclid gathered the geometry of his tradition into the *Elements* — thirteen books, $465$ propositions, and the most reprinted textbook mathematics has known. Book I opens not with a theorem but with a vocabulary: $23$ definitions (a point is \u201cthat which has no part\u201d; a line is \u201cbreadthless length\u201d; parallel straight lines lie \u201cin the same plane \u2026 and do not meet\u201d), then $5$ postulates for geometry — the first, \u201cto draw a straight line from any point to any point\u201d, is this lesson\u2019s two-point rule in its birth dress; the second, \u201cto produce a finite straight line continuously in a straight line\u201d, is the line\u2019s endlessness — and $5$ common notions for all of mathematics. Everything else in the thirteen books is *derived* from that slim foundation, which is why the *Elements* became the world\u2019s model of rigorous argument for twenty-two centuries. The foundation needed one modern repair: in 1899 David Hilbert\u2019s *Grundlagen der Geometrie* re-axiomatised the subject and stated the incidence facts outright — the two-point rule among them — closing the gaps that two millennia of careful readers had found in the Greeks\u2019 reliance on diagrams. This lesson\u2019s manner is Euclid\u2019s own: define exactly, assume little, derive everything.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Point',
              def: 'A location — an exact position with no size, no shape, no parts; named by a capital letter. The drawn dot pictures it; the point itself has no width.',
            },
            {
              term: 'Line',
              def: 'A straight path with no width, extending without end in both directions; written $\\overleftrightarrow{AB}$ through points $A$ and $B$, or $l$, $m$, $n$ alone. No endpoints, no length to measure.',
            },
            {
              term: 'Line segment',
              def: 'The part of a line between two endpoints, endpoints included; written $\\overline{AB}$. Bounded and measurable — its length is $|a - b|$ on the ruler line, 7.4\u2019s distance formula re-read.',
            },
            {
              term: 'Ray',
              def: 'The part of a line starting at one endpoint and extending without end in one direction; written $\\overrightarrow{AB}$ with the endpoint named first. One endpoint, one direction — and $\\overrightarrow{AB} \\ne \\overrightarrow{BA}$.',
            },
            {
              term: 'Plane',
              def: 'A perfectly flat surface extending without end in every direction — length and breadth, no thickness. The stage of school geometry; three non-collinear points fix one plane (the tripod fact).',
            },
            {
              term: 'Collinear points',
              def: 'Points all lying on one line. Collinearity pools pairs — three collinear points carry three segments but only one line — and \u201cno three collinear\u201d is the standing promise that makes segment and line censuses agree.',
            },
            {
              term: 'Parallel lines',
              def: 'Two lines in the same plane that, produced indefinitely both ways, never meet — no common point; written $l \\parallel m$. Euclid\u2019s Definition 23, whose \u201csame plane\u201d clause blocks the skew lines of different planes.',
            },
            {
              term: 'Concurrent lines',
              def: 'Three or more lines all passing through one common point. Through a single point pass infinitely many lines — the crowd caps at one only when a second point is demanded.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Through two distinct points, how many straight lines can be drawn?',
              options: ['infinitely many', 'exactly two', 'none', 'exactly one'],
              answer: 3,
              explain:
                'The two-point rule: the pair fixes its joining line, and uniqueness forbids a second (Option 4). Option 1 answers a different question — through ONE point infinitely many lines pass. Options 2 and 0 contradict the rule\u2019s existence half: Euclid\u2019s first postulate draws the line, always.',
            },
            {
              q: 'Which of these has exactly one endpoint?',
              options: ['a line segment', 'a ray', 'a line', 'a plane'],
              answer: 1,
              explain:
                'A ray begins at one endpoint and runs forever in one direction (Option 2). Option 1 has two endpoints; Option 3 has none; Option 4 has none either — a plane\u2019s edges were surrendered in the definition.',
            },
            {
              q: 'The number of line segments with endpoints among 5 points, no three of them collinear, is',
              options: ['$5$', '$10$', '$20$', '$8$'],
              answer: 1,
              explain:
                'The pair census: $\\frac{5 \\times 4}{2} = 10$ (Option 2). Option 3 is the unrepaired double count $5 \\times 4$ — each segment named from both ends. Option 1 confuses the points with their pairs; Option 4 is a stranger to the formula.',
            },
            {
              q: 'Two distinct lines in a plane share no common point. The pair is called',
              options: ['intersecting', 'concurrent', 'parallel', 'collinear'],
              answer: 2,
              explain:
                'Same plane, no meeting — the definition of parallel (Option 3). Option 1 is the exactly-one-common-point verdict; Option 2 needs three or more lines through one point; Option 3 describes points on one line, not lines at all.',
            },
            {
              q: 'On the number line, the length of the segment joining the points $-3$ and $5$ is',
              options: ['$-8$', '$2$', '$5$', '$8$'],
              answer: 3,
              explain:
                'The length is $|5 - (-3)| = |8| = 8$ (Option 4). Option 1 lets a length wear a sign — lengths are distances, never negative. Option 2 subtracts $5 - 3$, dropping the sign inside the bars\u2019 job. Option 3 reads one endpoint and forgets the other.',
            },
          ],
        },
        {
          kind: 'exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Classify each as best modelled by a point, a line segment, a ray or a line: (i) the tip of a compass resting on paper; (ii) a thread pulled taut between two pins, pins included; (iii) a beam that leaves a lighthouse and travels one way forever; (iv) the ideal straight path that has no ends at all.',
                  solution: [
                    'Now, take them in order. (i) the compass tip marks an exact where — a point.',
                    'So (ii) the taut thread runs between two endpoints, both included — a segment.',
                    'And (iii) the beam starts somewhere and never stops, one way — a ray; (iv) the endless path both ways — a line.',
                    'Hence point, segment, ray, line.',
                  ],
                  answer: '(i) point; (ii) segment; (iii) ray; (iv) line',
                },
                {
                  q: 'On the number line, find the length of the segment joining the points $2$ and $9$.',
                  solution: [
                    'Now, the endpoints wear coordinates $2$ and $9$; the length is 7.4\u2019s formula.',
                    'So $|9 - 2| = |7| = 7$.',
                    'Hence $7$ — and the reversed order $|2 - 9| = 7$ agrees, as the formula promised.',
                  ],
                  answer: '$7$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'How many rays are determined by two distinct points $A$ and $B$? Name them.',
                  solution: [
                    'Now, a ray needs an endpoint and a direction, and the pair $A$, $B$ supplies two of each arrangement.',
                    'So $\\overrightarrow{AB}$ begins at $A$ and runs through $B$ forever, and $\\overrightarrow{BA}$ begins at $B$ and runs the opposite way — different rays, since the endpoints differ.',
                    'Hence exactly $2$: ray $\\overrightarrow{AB}$ and ray $\\overrightarrow{BA}$.',
                  ],
                  answer: 'two — $\\overrightarrow{AB}$ and $\\overrightarrow{BA}$',
                },
                {
                  q: 'Four points lie in a plane, no three collinear. How many segments do they determine? How many lines?',
                  solution: [
                    'Now, segments first: $\\frac{4 \\times 3}{2} = 6$ — the pair census, collinearity powerless.',
                    'So the no-three-collinear promise means no pooling: every pair owns a private line, and $6$ pairs give $6$ lines.',
                    'Hence $6$ segments and $6$ lines — the promise made the censuses agree.',
                  ],
                  answer: '$6$ segments; $6$ lines',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Four points $P$, $Q$, $R$, $S$ are such that $P$, $Q$, $R$ are collinear and $S$ is not on their line. How many distinct lines do the four points determine?',
                  solution: [
                    'Now, the six pairs split into two families: the collinear trio $PQ$, $QR$, $PR$, and the rest — $PS$, $QS$, $RS$.',
                    'So the collinear trio pools: all three names belong to the one line through $P$, $Q$, $R$.',
                    'And $PS$, $QS$, $RS$ each own a fresh line through $S$ — three distinct lines, no two coinciding without dragging $S$ onto the collinear line.',
                    'Hence $1 + 3 = 4$ lines — six pairs, pooled into four.',
                  ],
                  answer: '$4$ lines',
                },
                {
                  q: 'Three lines in a plane, no two parallel and not all through one point: what is the greatest number of intersection points they can have? What is the arrangement called if all three DO pass through one point?',
                  solution: [
                    'Now, each pair of distinct lines contributes at most one intersection point — the meeting verdict\u2019s cap.',
                    'So three pairs, one point each: at most $\\frac{3 \\times 2}{2} = 3$ points, and no two parallels plus no triple meeting means every pair actually meets — the cap is attained.',
                    'And if all three pass through one shared point instead, the arrangement is concurrent.',
                    'Hence at most $3$; all-through-one-point is concurrency.',
                  ],
                  answer: '$3$ intersection points; concurrent',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Eight points lie in a plane, no three collinear. How many lines do they determine? How many segments?',
                  solution: [
                    'Now, the promise removes all pooling, so every pair of points owns both a private segment and a private line.',
                    'So both censuses are the pair count: $\\frac{8 \\times 7}{2} = 28$.',
                    'Hence $28$ lines and $28$ segments — the certificate: eight parabola-planted points machine-swept, all $56$ triples non-collinear, enumerated lines exactly $28$.',
                  ],
                  answer: '$28$ lines; $28$ segments',
                },
                {
                  q: 'Lines $l$ and $m$ in a plane share no point; lines $m$ and $n$ meet at exactly one point. State, with the definition, what each pair is called.',
                  solution: [
                    'Now, $l$ and $m$ lie in the same plane and share no point — produced indefinitely, they never meet.',
                    'So $l \\parallel m$: parallel, by the definition\u2019s own words.',
                    'And $m$ and $n$ share exactly one common point: intersecting, the meeting verdict\u2019s other case.',
                    'Hence $l \\parallel m$ (parallel); $m$ and $n$ intersecting.',
                  ],
                  answer: '$l$ and $m$ parallel; $m$ and $n$ intersecting',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Explain why two distinct lines cannot both pass through the same two points.',
                  solution: [
                    'Now, suppose two distinct lines $l$ and $m$ both passed through the distinct points $P$ and $Q$.',
                    'So the two-point rule speaks: exactly one line passes through $P$ and $Q$ — the pair fixes its joining line completely.',
                    'And both $l$ and $m$ are lines through $P$ and $Q$, so each must be that unique joining line — they coincide, contradicting distinctness.',
                    'Hence impossible: two distinct lines share at most one common point — the cap every meeting question in the plane obeys.',
                  ],
                  answer: 'the two-point rule forbids it — two shared points would force the lines to coincide',
                },
                {
                  q: 'A straight mineral shaft runs from a working at level $-120$ m to a platform at $+260$ m. Model the shaft on the number line and find the length of the segment between the two levels.',
                  solution: [
                    'Now, the endpoints wear signed names: the working at $-120$ and the platform at $+260$.',
                    'So the segment\u2019s length is $|260 - (-120)| = |260 + 120| = |380| = 380$ m — the double-sign turn of 7.2 inside 7.4\u2019s bars.',
                    'Hence $380$ m — the shaft measured once, direction discarded.',
                  ],
                  answer: '$380$ m',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Derive the number of segments determined by $n$ points, and cash the result at $n = 12$.',
                  solution: [
                    'Now, seat yourself at each of the $n$ points: from there, $n - 1$ others are available as partners — $n(n-1)$ ordered pairs in the census.',
                    'So every segment has been counted twice, once as $\\overline{AB}$ and once as $\\overline{BA}$ — the double count 7.4\u2019s gap already knew in another dress.',
                    'And dividing the echo away gives $N = \\frac{n(n-1)}{2}$ — brute-force enumeration confirms it for every $n$ from $2$ to $20$.',
                    'Cashed at $n = 12$: $\\frac{12 \\times 11}{2} = 66$.',
                    'Hence $N = \\frac{n(n-1)}{2}$, and $66$ at $n = 12$.',
                  ],
                  answer: '$N = \\frac{n(n-1)}{2}$; at $n = 12$: $66$',
                },
                {
                  q: 'Three points $A$, $B$, $C$ are non-collinear. Show that exactly three lines pass through them in pairs, and that these three lines meet pairwise exactly at $A$, $B$, and $C$.',
                  solution: [
                    'Now, the three pairs $AB$, $BC$, $CA$ each carry a line by the two-point rule\u2019s existence half — at least three lines.',
                    'So the lines are distinct: if the lines through $AB$ and through $BC$ coincided, that one line would contain $A$, $B$, $C$ — contradicting non-collinearity. Exactly three.',
                    'And the meetings: the lines through $AB$ and $AC$ both contain $A$ — and by the two-point rule\u2019s uniqueness cap they share *at most* that one point, so they meet exactly at $A$; the same argument lands $B$ and $C$.',
                    'Hence exactly three lines, pairwise meetings exactly at the three points — the triangle\u2019s sides were there all along, waiting for the cap.',
                  ],
                  answer: 'exactly $3$ lines; they meet pairwise exactly at $A$, $B$, $C$',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-angles-and-their-measurement',
      number: '8.2',
      title: 'Angles and Their Measurement',
      concepts: [
        'The angle — two rays, one vertex',
        'Naming angles vertex-middle',
        'The degree and the 360° full turn',
        'Acute, right, obtuse, straight, reflex',
        'The protractor and the two-scale trap',
        'Complementary and supplementary angles',
        'The clock as an angle machine',
        'Counting angles from n rays',
      ],
      objectives: [
        'Define the angle as two rays with a common endpoint, name its vertex and arms, and write it correctly in the vertex-middle convention',
        'State the degree ledger — full turn 360°, half turn 180°, quarter turn 90° — and tell the honest story of why the circle carries 360 degrees',
        'Classify any angle by size into the five names, including reflex measures recovered as 360° minus the protractor read',
        'Measure angles with the protractor, defeat the two-scale trap with the sense check, and turn the clock face into an angle machine',
        'Compute complements and supplements, prove the identity supp(x) − comp(x) = 90°, and count the angles determined by n rays with n(n−1)/2',
      ],
      prerequisites: ['fm-points-lines-and-planes'],
      sources: ['ncert-math6-gp-ch2', 'ncert-math6-ch4', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'A chapter that opened with objects having no size now meets the first idea that comes with one. Lesson 8.1 built its world out of points and the lines, rays and segments they fix — and twice it brushed past a figure it did not stop to name: two rays leaving one common endpoint. The door on its hinge, the hands of a clock at any hour you care to read, a pair of scissors half shut, the corner of this page — every one is that figure. What the eye compares without ever being taught is *how far one arm has turned away from the other*. That comparison, made exact, is an **angle**, and giving it a number is this lesson\u2019s whole work.',
        },
        {
          kind: 'para',
          text: 'The measuring program will feel familiar in outline, because chapter 1 ran it once already for length: pick a unit, copy it along the thing being measured, count the copies. Length copied a segment. An angle copies a *turn* — and the unit of turn, the **degree**, will get a definition, a history, an instrument and an arithmetic of its own. By the end of the lesson an angle will be as measurable as the segment of 8.1, and the clock on the wall will turn out to have been an angle machine all along.',
        },
        { kind: 'heading', text: 'The angle: two rays, one vertex' },
        {
          kind: 'para',
          text: 'Take the ray of 8.1 — one endpoint, one direction, endless forward — and stand two of them on the same endpoint, pointing in different directions. Something new now exists that neither ray carries alone: the *spreading apart* of the two directions. Euclid opened his Elements with this idea, in the dress of his Definition 8: a plane angle is the inclination to one another of two lines in a plane which meet one another and do not lie in a straight line. The modern charter says it with rays.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Angle, vertex, arms',
          text: 'Two rays with a common endpoint are said to form an **angle**. The common endpoint is said to be the **vertex** of the angle; the two rays are said to be its **arms**. An angle with arms $\u005coverrightarrow{OA}$ and $\u005coverrightarrow{OB}$ is written $\u005cangle AOB$ — the vertex\u2019s letter in the middle, one arm\u2019s letter on each side — and read \u201cthe angle A-O-B\u201d.',
        },
        {
          kind: 'para',
          text: 'Thus, in $\u005cangle AOB$ the vertex is $O$ and the arms are the rays $\u005coverrightarrow{OA}$ and $\u005coverrightarrow{OB}$ — and the naming has rules worth stating in full, because examinations test the rules and not the picture:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'when only one angle lives at a vertex $B$, the single letter names it: $\u005cangle B$;',
            'when several angles share a vertex — as they do wherever lines cross — each needs all three letters, and the middle one is the vertex: $\u005cangle ABC$ has vertex $B$;',
            'the two outer letters commute, since they merely point along the arms: $\u005cangle ABC = \u005cangle CBA$ — but the vertex letter never leaves the middle, so $\u005cangle ACB$ is the name of a different angle, one with vertex $C$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'One figure, two readings',
          text: 'Sit still and the angle is two rays at rest — a picture. Let the arm move and the angle is a *turn*: the ray $\u005coverrightarrow{OA}$ rotating about $O$ until it lies along $\u005coverrightarrow{OB}$, and the angle is the amount of that rotation. The door is the second reading made physical — hinge, arm, swing. Both readings are the same object; the dynamic one is what the measuring below will capture, because a turn is exactly the sort of thing a number can count.',
        },
        { kind: 'heading', text: 'The turn and its unit: the degree' },
        {
          kind: 'para',
          text: 'To measure turns the way chapter 1 measured lengths, a unit turn is needed — the angle that all other angles get counted against. The choice that won, historically and practically, is the **full turn**: one complete revolution, the ray rotating all the way round back to where it began. Civilisations that watched the sky — the Babylonian astronomers above all, counting in a base of sixty — divided the full turn into **360** equal parts, and each part is one **degree**, written $1^\u005ccirc$. The landmarks fall out at once:',
        },
        {
          kind: 'equation',
          latex: '\u005ctext{one full turn} = 360^\u005ccirc, \u005cqquad \u005ctfrac{1}{2}\u005ctext{ turn} = 180^\u005ccirc, \u005cqquad \u005ctfrac{1}{4}\u005ctext{ turn} = 90^\u005ccirc,',
          note: 'so $1^\u005ccirc$ is one 360th of a full turn. The half turn ($180^\u005ccirc$) and the quarter turn ($90^\u005ccirc$) are the two landmarks every classification and every calculation below leans on.',
        },
        {
          kind: 'para',
          text: 'Why 360? The honest answer is that nobody knows for certain, and any account that pretends otherwise is selling certainty it does not have. One old and plausible story runs: the sun walks a full circle against the stars in about 365 days — very close to one degree per day — so a 360-part circle made the sky a calendar; and the Babylonians counted in sixties, a base in which 360 is a round number. What is *not* speculative is the arithmetic dividend: 360 carries exactly 24 divisors — 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360 — so halves, thirds, quarters, fifths, sixths, eighths, ninths and twelfths of a turn are all whole degrees: 180, 120, 90, 72, 60, 45, 40, 36, 30. A unit that splits so cleanly is a unit worth keeping, whatever its origin. The Babylonian base of sixty also left a fingerprint on finer scales: 60 minutes of arc ($60\u2032$) make one degree and 60 seconds ($60\u2033$) make one minute — the same dress the clock face wears, surviving in navigation and astronomy to this day.',
        },
        { kind: 'heading', text: 'The five sizes of an angle' },
        {
          kind: 'para',
          text: 'Euclid owned no protractor and no degrees, and he classified angles the way a carpenter checks a joint: against the right angle. His Definition 10 builds the right angle structurally — a straight line standing on another so that the two angles it makes are equal, each of those equal angles is right — and his Definitions 11 and 12 define the neighbours comparatively: an obtuse angle is *greater* than a right angle, an acute angle *less*. Degrees give the comparative dress exact numbers, and two more boundary cases join the family:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The five sizes',
          text: 'An angle is said to be **acute** when its measure is between $0^\u005ccirc$ and $90^\u005ccirc$; **right** when it is exactly $90^\u005ccirc$; **obtuse** when it is between $90^\u005ccirc$ and $180^\u005ccirc$; **straight** when it is exactly $180^\u005ccirc$; and **reflex** when it is between $180^\u005ccirc$ and $360^\u005ccirc$. Thus every angle with a measure strictly between $0^\u005ccirc$ and $360^\u005ccirc$ carries exactly one of the five names — the boundaries belong to the right angle and the straight angle alone.',
        },
        {
          kind: 'table',
          caption: 'The five sizes, with a witness for each — every range checked against the boundary rule above.',
          head: ['Name', 'Measure', 'Everyday witness'],
          rows: [
            ['acute', '$0^\u005ccirc < \u005ctheta < 90^\u005ccirc$', 'a pair of scissors half closed; the hands of a clock at 2:00'],
            ['right', '$\u005ctheta = 90^\u005ccirc$', 'the corner of a book; a wall meeting the floor'],
            ['obtuse', '$90^\u005ccirc < \u005ctheta < 180^\u005ccirc$', 'a door opened wide; the hands of a clock at 5:00'],
            ['straight', '$\u005ctheta = 180^\u005ccirc$', 'a book opened flat; the hands of a clock at 6:00'],
            ['reflex', '$180^\u005ccirc < \u005ctheta < 360^\u005ccirc$', 'a door swung past flat; the turn from 3:00 back to 12 the long way'],
          ],
        },
        {
          kind: 'para',
          text: 'Figure 1 lines up all five on one stage so the sizes can be compared at a glance — and the figure is honest about its own idealisation, exactly as 8.1 demanded: the arms carry solid heads (they are rays, endless), the vertex is a dot, and the arc between the arms records the turn that is being measured.',
        },
        {
          kind: 'figure',
          caption:
            'The five sizes of an angle, drawn to scale. Each panel shows two rays out of one vertex (solid heads: the arms are rays and never end) with the arc of the turn between them. The right angle carries the small square-corner mark — the sign that needs no number, because all right angles are equal (Euclid\u2019s fourth postulate). The straight angle\u2019s arms collapse into one line; the reflex angle\u2019s turn goes the long way round, over the top.',
          svg: `<svg viewBox="0 0 760 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five panels: acute 40 degrees, right 90 degrees with square mark, obtuse 130 degrees, straight 180 degrees, reflex 220 degrees, each two rays from a vertex with an arc between them">
  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the five sizes — how far one arm has turned from the other</text>
  <line x1="76" y1="250" x2="44.53" y2="163.55" stroke="currentColor" stroke-width="2"/>
  <line x1="76" y1="250" x2="107.47" y2="163.55" stroke="currentColor" stroke-width="2"/>
  <polygon points="44.53,163.55 52.52,172.35 44.06,175.43" fill="currentColor"/>
  <polygon points="107.47,163.55 107.94,175.43 99.48,172.35" fill="currentColor"/>
  <circle cx="76" cy="250" r="4" fill="currentColor"/>
  <line x1="228" y1="250" x2="162.95" y2="184.95" stroke="currentColor" stroke-width="2"/>
  <line x1="228" y1="250" x2="293.05" y2="184.95" stroke="currentColor" stroke-width="2"/>
  <polygon points="162.95,184.95 173.91,189.55 167.55,195.91" fill="currentColor"/>
  <polygon points="293.05,184.95 288.45,195.91 282.09,189.55" fill="currentColor"/>
  <circle cx="228" cy="250" r="4" fill="currentColor"/>
  <line x1="380" y1="250" x2="296.62" y2="211.12" stroke="currentColor" stroke-width="2"/>
  <line x1="380" y1="250" x2="463.38" y2="211.12" stroke="currentColor" stroke-width="2"/>
  <polygon points="296.62,211.12 308.49,211.69 304.69,219.85" fill="currentColor"/>
  <polygon points="463.38,211.12 455.31,219.85 451.51,211.69" fill="currentColor"/>
  <circle cx="380" cy="250" r="4" fill="currentColor"/>
  <line x1="532" y1="250" x2="440" y2="250" stroke="currentColor" stroke-width="2"/>
  <line x1="532" y1="250" x2="624" y2="250" stroke="currentColor" stroke-width="2"/>
  <polygon points="440,250 451,245.5 451,254.5" fill="currentColor"/>
  <polygon points="624,250 613,254.5 613,245.5" fill="currentColor"/>
  <circle cx="532" cy="250" r="4" fill="currentColor"/>
  <line x1="660" y1="250" x2="573.55" y2="281.47" stroke="currentColor" stroke-width="2"/>
  <line x1="660" y1="250" x2="746.45" y2="281.47" stroke="currentColor" stroke-width="2"/>
  <polygon points="573.55,281.47 582.35,273.48 585.43,281.94" fill="currentColor"/>
  <polygon points="746.45,281.47 734.57,281.94 737.65,273.48" fill="currentColor"/>
  <circle cx="660" cy="250" r="4" fill="currentColor"/>
  <path d="M 64.37 218.05 A 34 34 0 0 1 87.63 218.05" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 203.96 225.96 A 34 34 0 0 1 252.04 225.96" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 349.19 235.63 A 34 34 0 0 1 410.81 235.63" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 498 250 A 34 34 0 0 1 566 250" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 628.05 261.63 A 34 34 0 1 1 691.95 261.63" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 239.31 238.69 L 228 227.37 L 216.69 238.69" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="76" y="180">40°</text>
    <text x="228" y="190">90°</text>
    <text x="380" y="190">130°</text>
    <text x="532" y="202">180°</text>
    <text x="660" y="202">220°</text>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="76" y="318">acute</text>
    <text x="228" y="318">right</text>
    <text x="380" y="318">obtuse</text>
    <text x="532" y="318">straight</text>
    <text x="660" y="318">reflex</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The square-corner mark on the right angle deserves a sentence of its own, because it is geometry\u2019s oldest stamp of approval. Euclid\u2019s fourth postulate asserts that *all right angles are equal to one another* — so the mark certifies the angle completely, in every drawing, in every book, in every country, with no number attached. Every protractor ever built is a machine for finding that same quarter turn and slicing it into ninety equal pieces; Postulate 4 is the reason the instrument in your hand agrees with the instrument in mine.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Which of the two angles?',
          text: 'Two rays always make *two* turns: one of measure $\u005ctheta$ and one of measure $360^\u005ccirc - \u005ctheta$ (walk from arm to arm the short way, or the long way). Unqualified, \u201cthe angle between two rays\u201d means the smaller of the two — the reflex measure is named explicitly when it is wanted. The clock at 9:00 shows the convention: the direct sweep from the minute hand to the hour hand is $270^\u005ccirc$, but the angle between the hands is read as $360 - 270 = 90^\u005ccirc$.',
        },
        { kind: 'heading', text: 'The protractor: measuring any angle' },
        {
          kind: 'para',
          text: 'Comparing an angle to the quarter turn sorts it into a family; measuring it exactly wants an instrument. The **protractor** is a semicircular ruler of turns: its curved edge carries a scale from $0^\u005ccirc$ to $180^\u005ccirc$ in one-degree steps, printed *twice* — once running each way — so that angles opening to the left and to the right can both be read without turning the instrument upside down. Its straight edge is the baseline, and a small centre mark at the middle of the baseline is the seat of the vertex. The ritual has three moves: the centre mark goes on the **vertex**; the baseline lies along one **arm**; the number where the other arm crosses the scale is the angle\u2019s measure in degrees.',
        },
        {
          kind: 'figure',
          caption:
            'A protractor on a $50^\u005ccirc$ angle (ticks drawn every $10^\u005ccirc$; a real instrument steps every degree). The centre mark sits on the vertex $O$; the baseline lies along the lower arm; the upper arm crosses the scale exactly at the long 50 tick — the dot on the arc marks the crossing. Read the scale that starts from $0^\u005ccirc$ on the resting arm — the outer one here — and the answer is $50^\u005ccirc$. The inner scale at the same position says 130: the two scales always sum to $180^\u005ccirc$, because they are each other\u2019s supplements.',
          svg: `<svg viewBox="0 0 760 375" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A protractor with its centre on vertex O, baseline along the lower arm, and the upper arm crossing the scale at the 50 degree tick; outer scale labels 0 to 180 and inner scale labels 180 to 0">
  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the protractor: centre on the vertex, baseline along one arm, read where the other arm crosses</text>
  <path d="M 170 330 A 210 210 0 0 1 590 330" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="150" y1="330" x2="648" y2="330" stroke="currentColor" stroke-width="2"/>
  <polygon points="648,330 637,334.5 637,325.5" fill="currentColor"/>
  <line x1="380" y1="330" x2="541.98" y2="136.96" stroke="currentColor" stroke-width="2"/>
  <polygon points="541.98,136.96 538.36,148.28 531.46,142.5" fill="currentColor"/>
  <circle cx="514.99" cy="169.13" r="3.5" fill="currentColor"/>
  <line x1="574.99" y1="295.62" x2="586.81" y2="293.53" stroke="currentColor" stroke-width="1.4"/>
  <line x1="566.06" y1="262.28" x2="577.34" y2="258.18" stroke="currentColor" stroke-width="1.4"/>
  <line x1="531.68" y1="202.73" x2="540.87" y2="195.01" stroke="currentColor" stroke-width="1.4"/>
  <line x1="447.72" y1="143.94" x2="451.82" y2="132.66" stroke="currentColor" stroke-width="1.4"/>
  <line x1="414.38" y1="135.01" x2="416.47" y2="123.19" stroke="currentColor" stroke-width="1.4"/>
  <line x1="345.62" y1="135.01" x2="343.53" y2="123.19" stroke="currentColor" stroke-width="1.4"/>
  <line x1="312.28" y1="143.94" x2="308.18" y2="132.66" stroke="currentColor" stroke-width="1.4"/>
  <line x1="252.73" y1="178.32" x2="245.01" y2="169.13" stroke="currentColor" stroke-width="1.4"/>
  <line x1="228.32" y1="202.73" x2="219.13" y2="195.01" stroke="currentColor" stroke-width="1.4"/>
  <line x1="193.94" y1="262.28" x2="182.66" y2="258.18" stroke="currentColor" stroke-width="1.4"/>
  <line x1="185.01" y1="295.62" x2="173.19" y2="293.53" stroke="currentColor" stroke-width="1.4"/>
  <line x1="499.56" y1="187.52" x2="514.99" y2="169.13" stroke="currentColor" stroke-width="2.2"/>
  <line x1="170" y1="330" x2="170" y2="318" stroke="currentColor" stroke-width="1.4"/>
  <line x1="590" y1="330" x2="590" y2="318" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="380" cy="330" r="4.5" fill="currentColor"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="612" y="352">0</text>
    <text x="580.92" y="214">30</text>
    <text x="496" y="129.08">60</text>
    <text x="380" y="98">90</text>
    <text x="264" y="129.08">120</text>
    <text x="179.08" y="214">150</text>
    <text x="148" y="352">180</text>
    <text x="541.08" y="237">150</text>
    <text x="473" y="168.92">120</text>
    <text x="380" y="144">90</text>
    <text x="287" y="168.92">60</text>
    <text x="218.92" y="237">30</text>
  </g>
  <text x="380" y="354" font-size="14" fill="currentColor" text-anchor="middle">O</text>
  <text x="466.1" y="289.9" font-size="13" fill="currentColor" text-anchor="middle">50°</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The two-scale trap',
          text: 'Every position on the protractor carries two numbers that add to $180^\u005ccirc$ — the outer scale\u2019s and the inner scale\u2019s. Reading the wrong one is the single most common slip in school geometry. Defeat it by sense *before* the read: decide first whether the angle is acute or obtuse, and only then take the number that agrees. An acute angle must read under $90^\u005ccirc$; an obtuse angle over. In the figure, the arm crosses at outer 50 and inner 130 — the angle is visibly acute, so $50^\u005ccirc$ it is.',
        },
        {
          kind: 'example',
          title: 'A protractor rests on an angle: centre on the vertex, baseline along the lower arm, and the upper arm crosses the scales at the marks 50 (outer) and 130 (inner). Find the angle\u2019s measure.',
          steps: [
            'Now, the two scales run opposite ways and every position names two numbers that sum to $180^\u005ccirc$: $50 + 130 = 180$.',
            'So the reading is decided by sense, not by squinting: the drawn angle is acute — visibly less than the $90^\u005ccirc$ right angle.',
            'And only $50$ is under $90$, so the outer scale — the one starting from $0^\u005ccirc$ on the resting arm — is the angle\u2019s own count.',
            'Hence $50^\u005ccirc$; the inner $130$ is its supplement wearing the other scale, and will be read by the angle\u2019s partner on the other side.',
          ],
        },
        {
          kind: 'para',
          text: 'One honest limitation: a protractor\u2019s scale stops at $180^\u005ccirc$, so a reflex angle cannot be laid on it directly. The way round is the full-turn subtraction — measure the ordinary angle between the arms and take the rest:',
        },
        {
          kind: 'example',
          title: 'A classroom door swings open and the protractor at the hinge reads $115^\u005ccirc$ of swing. How many degrees of the full turn remain — the long way round through the wall side?',
          steps: [
            'Now, the swing itself is $115^\u005ccirc$ — an obtuse turn from the closed position, short of the flat.',
            'So the remainder of the full turn is $360 - 115 = 245^\u005ccirc$.',
            'And $245^\u005ccirc$ is reflex: past $180^\u005ccirc$, under $360^\u005ccirc$ — the door\u2019s gap measured the long way round.',
            'Hence $245^\u005ccirc$ — and the rule generalises: every reflex measure is the full turn minus its ordinary partner, $360^\u005ccirc$ minus the read.',
          ],
        },
        { kind: 'heading', text: 'Angle arithmetic: complements and supplements' },
        {
          kind: 'para',
          text: 'Angle measures are numbers, and numbers add. Stand two angles shoulder to shoulder — arms shared, vertex shared — and the outside arms make an angle whose measure is the **sum** of the two. Chapter 4 built the one-linear-equation toolkit; here it finds its most reliable geometric application, because two sum-landmarks recur so often that they carry names of their own.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Complementary and supplementary',
          text: 'Two angles are said to be **complementary** when their measures sum to $90^\u005ccirc$ — each is said to be the **complement** of the other. Two angles are said to be **supplementary** when their measures sum to $180^\u005ccirc$ — each the **supplement** of the other. Thus, the complement of the angle $x$ is $90^\u005ccirc - x$ and its supplement is $180^\u005ccirc - x$. The memory hook is the spelling: **c**omplement before **s**upplement as **c**orner ($90^\u005ccirc$) comes before **s**traight ($180^\u005ccirc$).',
        },
        {
          kind: 'equation',
          latex: '\u005ctext{comp}(x) = 90^\u005ccirc - x \u005cqquad \u005ctext{and} \u005cqquad \u005ctext{supp}(x) = 180^\u005ccirc - x,',
          note: 'the two sums that organise every find-the-missing-angle question at this level: $x + \u005ctext{comp}(x) = 90^\u005ccirc$ and $x + \u005ctext{supp}(x) = 180^\u005ccirc$.',
        },
        {
          kind: 'example',
          title: 'Find the complement and the supplement of a $37^\u005ccirc$ angle.',
          steps: [
            'Now, the complement is $90 - 37 = 53^\u005ccirc$ and the supplement is $180 - 37 = 143^\u005ccirc$.',
            'So the two answers differ by $143 - 53 = 90^\u005ccirc$ — not an accident of this particular angle, as the derivation below shows.',
            'Hence $53^\u005ccirc$ and $143^\u005ccirc$.',
          ],
        },
        {
          kind: 'derivation',
          title: 'Why the supplement beats the complement by exactly 90°',
          statement:
            'Take any angle of measure $x$, with $0 < x < 180$. Its supplement and its complement are one subtraction apart — the claim is that the gap is always the same $90^\u005ccirc$, whatever $x$ may be.',
          steps: [
            {
              label: 'Write both subtractions',
              formula: '\u005ctext{supp}(x) = 180^\u005ccirc - x, \u005cqquad \u005ctext{comp}(x) = 90^\u005ccirc - x',
              explanation:
                'The two definitions of the previous callout, side by side for the same angle $x$.',
            },
            {
              label: 'Subtract complement from supplement',
              formula: '\u005ctext{supp}(x) - \u005ctext{comp}(x) = (180 - x) - (90 - x)',
              explanation: 'The difference of the two measures is the gap whose size is in question.',
            },
            {
              label: 'The x cancels out',
              formula: '= 180 - x - 90 + x = 90^\u005ccirc',
              explanation:
                'The $-x$ and the $+x$ destroy each other: the gap carries no trace of the angle it came from.',
            },
            {
              label: 'Cash the identity',
              formula: '\u005ctext{supp}(x) = \u005ctext{comp}(x) + 90^\u005ccirc',
              explanation:
                'Knowing either of the pair hands you the other at once — at $37^\u005ccirc$: $143 - 53 = 90$; at $47^\u005ccirc$: $133 - 43 = 90$; at every angle the script swept, without exception.',
            },
          ],
          result:
            'For every angle $x$, the supplement exceeds the complement by exactly $90^\u005ccirc$: supp$(x)$ $-$ comp$(x)$ $=$ $90^\u005ccirc$. The gap is a constant of the vocabulary, not of the angle.',
        },
        {
          kind: 'para',
          text: 'The find-the-angle classics now solve themselves — each is chapter 4\u2019s one linear equation in geometric dress. Two worked instances show the whole family:',
        },
        {
          kind: 'example',
          title: 'An angle is $24^\u005ccirc$ more than its complement. Find the angle.',
          steps: [
            'Now, name the complement $x$; the angle itself is then $x + 24$.',
            'So complementarity reads as an equation: $x + (x + 24) = 90$.',
            'And $2x = 66$, so $x = 33$ — the angle is $33 + 24 = 57^\u005ccirc$.',
            'Hence $57^\u005ccirc$ — and the checks both hold: $57 + 33 = 90$ and $57 - 33 = 24$.',
          ],
        },
        {
          kind: 'example',
          title: 'Four rays draw out from one point, no two of them opposite. How many angles do they determine?',
          steps: [
            'Now, an angle is a pair of arms with a common vertex — so counting angles is counting unordered pairs of rays: 8.1\u2019s pair census in a new dress.',
            'So from $4$ rays the count is $\u005cfrac{4 \u005ctimes 3}{2} = 6$.',
            'And the double count explains the halving again: $4$ choices of first arm and $3$ of second give $12$ ordered pairs, each angle listed twice ($\u005cangle AOB$ and $\u005cangle BOA$).',
            'Hence $6$ angles — the same law that counted segments and lines among points: $N = \u005cfrac{n(n-1)}{2}$, cashed here at $n = 4$.',
          ],
        },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that the lesson\u2019s machinery reduces to a short ledger:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'an angle is two rays and their common vertex, named with the vertex\u2019s letter in the middle: $\u005cangle ABC = \u005cangle CBA$;',
            'one full turn is $360^\u005ccirc$, the half turn $180^\u005ccirc$, the quarter turn $90^\u005ccirc$ — and $1^\u005ccirc$ is one 360th of the whole;',
            'the five sizes: acute under $90^\u005ccirc$, right exactly $90^\u005ccirc$, obtuse between $90^\u005ccirc$ and $180^\u005ccirc$, straight exactly $180^\u005ccirc$, reflex between $180^\u005ccirc$ and $360^\u005ccirc$;',
            'the protractor reads centre-on-vertex, baseline-on-arm — with the sense check deciding between two scales that always sum to $180^\u005ccirc$, and reflex measures recovered as $360^\u005ccirc$ minus the read;',
            'complements fill the right angle, supplements the straight angle, and every supplement beats its complement by exactly $90^\u005ccirc$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Angles in the examination hall',
          text: 'The examination banks return to this lesson\u2019s material with remarkable consistency. The recurring shapes: classify-given-the-measure items (a single number, five names to choose from); find-the-complement and find-the-supplement subtractions; one-linear-equation narrations (\u201can angle exceeds its complement by $\u005cldots^\u005ccirc$\u201d, \u201can angle is $n$ times its supplement\u201d); clock-angle items at whole hours and half hours; and small counting questions (how many angles from this many rays). SSC CHSL and MTS papers favour the straight classification and complement items, RRB NTPC CBT-I the clock and the equation narrations, and banking clerical prelims the quick supplement subtractions — the shapes cited here are the banks\u2019 recurring patterns, none reproduced. A clock-face fact worth banking: the hour hand walks $30^\u005ccirc$ per hour — $0.5^\u005ccirc$ per minute — and the minute hand $6^\u005ccirc$ per minute; every clock question is those two speeds plus one subtraction.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The angle without a number, and the degree that gave it one',
          text: 'Euclid\u2019s Elements (c. 300 BCE) handles the angle with no numbers at all: Definition 8 calls it the inclination of two meeting lines; Definition 10 builds the right angle out of equal adjacent angles; Definitions 11 and 12 name the obtuse and acute comparatively — greater or less than a right angle — and Postulate 4 declares all right angles equal. The *degree* came from the sky: Babylonian astronomers counting in base sixty divided the full circle into 360 parts — the sun\u2019s yearly walk being very nearly one part per day — and the exact story of the choice is honestly not settled among historians. The sexagesimal fingerprint survives in the minute ($60\u2032 = 1^\u005ccirc$) and the second ($60\u2033 = 1\u2032$). The protractor as we know it is far younger: Joseph Huddart, an American naval captain, devised an advanced form in 1801 for plotting a ship\u2019s position on navigational charts. And the degree is not the last word — a later book in this library meets the **radian**, the angle measure mathematicians ultimately prefer; the degree, meanwhile, remains the working unit of every schoolroom and every examination board.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Angle',
              def: 'Two rays with a common endpoint, thought of as the amount of turn from one arm to the other; written with the vertex\u2019s letter in the middle, as in \u2220ABC.',
            },
            {
              term: 'Vertex of an angle',
              def: 'The common endpoint of the two arms — the middle letter of the angle\u2019s name, the point the protractor\u2019s centre mark sits on.',
            },
            {
              term: 'Arms of an angle',
              def: 'The two rays that make the angle; each runs from the vertex without end, so the drawn arm always carries a solid head.',
            },
            {
              term: 'Degree',
              def: 'The unit of turn: one 360th of a full turn, written 1°. A full turn is 360°, a half turn 180°, a quarter turn 90°.',
            },
            {
              term: 'Acute angle',
              def: 'An angle strictly between 0° and 90° — less than a right angle, in Euclid\u2019s comparative dress.',
            },
            {
              term: 'Right angle',
              def: 'An angle of exactly 90° — Euclid\u2019s equal-adjacent-angles construction, certified by the square-corner mark; all right angles are equal (Postulate 4).',
            },
            {
              term: 'Obtuse angle',
              def: 'An angle strictly between 90° and 180° — greater than a right angle, less than a straight angle.',
            },
            {
              term: 'Straight angle',
              def: 'An angle of exactly 180° — its arms are opposite rays forming one straight line.',
            },
            {
              term: 'Reflex angle',
              def: 'An angle strictly between 180° and 360° — the long way round; measured as 360° minus the ordinary angle between the arms.',
            },
            {
              term: 'Complementary angles',
              def: 'Two angles whose measures sum to 90°; each is the complement of the other, and comp(x) = 90° − x.',
            },
            {
              term: 'Supplementary angles',
              def: 'Two angles whose measures sum to 180°; each is the supplement of the other, and supp(x) = 180° − x = comp(x) + 90°.',
            },
          ],
        },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'In $\u005cangle PQR$, which letter names the vertex?',
              options: ['$P$, the first letter', '$Q$, the middle letter', '$R$, the last letter', 'any of the three, by convention'],
              answer: 1,
              explain: 'The vertex sits in the middle of the name — always. $P$ and $R$ name the arms; \u201cany of the three\u201d describes no convention at all.',
            },
            {
              q: 'An angle measuring exactly $90^\u005ccirc$ is called —',
              options: ['acute', 'right', 'obtuse', 'straight'],
              answer: 1,
              explain: '$90^\u005ccirc$ is the right angle itself. Acute is strictly under, obtuse strictly over (but under $180^\u005ccirc$), and straight is exactly $180^\u005ccirc$ — the boundaries belong to right and straight alone.',
            },
            {
              q: 'The complement of a $34^\u005ccirc$ angle measures —',
              options: ['$56^\u005ccirc$', '$66^\u005ccirc$', '$146^\u005ccirc$', '$124^\u005ccirc$'],
              answer: 0,
              explain: '$90 - 34 = 56^\u005ccirc$. The trap option $146^\u005ccirc$ is the supplement ($180 - 34$); $66^\u005ccirc$ subtracts from 100 out of habit; $124^\u005ccirc$ adds instead of subtracts.',
            },
            {
              q: 'An angle measuring $118^\u005ccirc$ is —',
              options: ['acute', 'right', 'obtuse', 'straight'],
              answer: 2,
              explain: '$90 < 118 < 180$: obtuse. It is not straight — that name needs exactly $180^\u005ccirc$ — and it is far past the right angle\u2019s boundary.',
            },
            {
              q: 'At 6:00, the hands of a clock make —',
              options: ['an acute angle', 'a right angle', 'a straight angle', 'a reflex angle'],
              answer: 2,
              explain: 'At 6:00 the hour hand stands at 6 and the minute hand at 12: opposite rays, $6 \u005ctimes 30 = 180^\u005ccirc$ exactly — the straight angle. (By the smaller-turn convention the two candidate turns are equal here, both $180^\u005ccirc$.)',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 8.2',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Name the vertex and the two arms of $\u005cangle LMN$, and write the same angle two other ways.',
                  solution: [
                    'Now, the middle letter names the vertex: $M$.',
                    'So the arms are the rays $\u005coverrightarrow{ML}$ and $\u005coverrightarrow{MN}$ — one arm\u2019s letter on each side of the vertex.',
                    'And the outer letters commute, so $\u005cangle NML$ names the same angle; with only one angle living at $M$, the bare $\u005cangle M$ serves too.',
                    'Hence vertex $M$, arms $\u005coverrightarrow{ML}$ and $\u005coverrightarrow{MN}$; the same angle is $\u005cangle NML$, or simply $\u005cangle M$.',
                  ],
                  answer: 'vertex $M$; arms $\u005coverrightarrow{ML}$, $\u005coverrightarrow{MN}$; also $\u005cangle NML = \u005cangle M$',
                },
                {
                  q: 'Classify each measure by size: $23^\u005ccirc$, $90^\u005ccirc$, $164^\u005ccirc$, $180^\u005ccirc$, $205^\u005ccirc$.',
                  solution: [
                    'Now, the five names are ranges around the two landmarks $90$ and $180$.',
                    'So: $23 < 90$ gives acute; $90$ exactly gives right; $90 < 164 < 180$ gives obtuse; $180$ exactly gives straight; $180 < 205 < 360$ gives reflex.',
                    'Hence acute, right, obtuse, straight, reflex — in the order given.',
                  ],
                  answer: 'acute; right; obtuse; straight; reflex',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find the complement and the supplement of a $47^\u005ccirc$ angle.',
                  solution: [
                    'Now, the complement fills the right angle: $90 - 47 = 43^\u005ccirc$; the supplement fills the straight angle: $180 - 47 = 133^\u005ccirc$.',
                    'So the two answers differ by $133 - 43 = 90^\u005ccirc$ — the identity of this lesson, holding here as everywhere.',
                    'Hence $43^\u005ccirc$ and $133^\u005ccirc$.',
                  ],
                  answer: '$43^\u005ccirc$ and $133^\u005ccirc$',
                },
                {
                  q: 'How large is the angle between the hands of a clock at 3:00? At 9:00?',
                  solution: [
                    'Now, the hour hand walks $30^\u005ccirc$ per hour ($360 \u005cdiv 12$), and the minute hand stands at 12 at both hours.',
                    'So at 3:00 the hour hand has walked $3 \u005ctimes 30 = 90^\u005ccirc$ — the gap between the hands is $90^\u005ccirc$.',
                    'And at 9:00 the direct sweep is $9 \u005ctimes 30 = 270^\u005ccirc$; but the angle between two rays is read as the smaller turn: $360 - 270 = 90^\u005ccirc$.',
                    'Hence $90^\u005ccirc$ at both hours — a right angle each time, by two different routes.',
                  ],
                  answer: '$90^\u005ccirc$ at 3:00 and $90^\u005ccirc$ at 9:00',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The complement of an angle is $61^\u005ccirc$. Find the angle, and then its supplement.',
                  solution: [
                    'Now, the angle and its complement fill the right angle together: the angle is $90 - 61 = 29^\u005ccirc$.',
                    'So the supplement is $180 - 29 = 151^\u005ccirc$.',
                    'And the checks: $29 + 61 = 90$ and $29 + 151 = 180$ — both sums land exactly.',
                    'Hence $29^\u005ccirc$, with supplement $151^\u005ccirc$.',
                  ],
                  answer: '$29^\u005ccirc$; supplement $151^\u005ccirc$',
                },
                {
                  q: 'Through how many degrees does the minute hand turn in 25 minutes? The hour hand in the same time?',
                  solution: [
                    'Now, the two hands walk at different speeds: the minute hand $6^\u005ccirc$ per minute ($360 \u005cdiv 60$), the hour hand $0.5^\u005ccirc$ per minute ($30 \u005cdiv 60$).',
                    'So in 25 minutes the minute hand sweeps $25 \u005ctimes 6 = 150^\u005ccirc$, while the hour hand manages $25 \u005ctimes 0.5 = 12.5^\u005ccirc$.',
                    'And the minute hand gains $150 - 12.5 = 137.5^\u005ccirc$ on the slow hand in the same run.',
                    'Hence $150^\u005ccirc$ and $12.5^\u005ccirc$.',
                  ],
                  answer: 'minute hand $150^\u005ccirc$; hour hand $12.5^\u005ccirc$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'An angle is twice its complement. Find the angle.',
                  solution: [
                    'Now, name the complement $x$; the angle itself is then $2x$.',
                    'So complementarity reads as an equation: $x + 2x = 90$, giving $3x = 90$ and $x = 30$.',
                    'And the angle is $2 \u005ctimes 30 = 60^\u005ccirc$ — check: $60 = 2 \u005ctimes 30$ and $60 + 30 = 90$, both true.',
                    'Hence $60^\u005ccirc$.',
                  ],
                  answer: '$60^\u005ccirc$',
                },
                {
                  q: 'Two complementary angles differ by $16^\u005ccirc$. Find both.',
                  solution: [
                    'Now, name the smaller angle $x$; the larger is then $x + 16$.',
                    'So the sum condition reads $x + (x + 16) = 90$, giving $2x = 74$ and $x = 37$.',
                    'And the pair is $37^\u005ccirc$ and $53^\u005ccirc$ — checks: $37 + 53 = 90$ and $53 - 37 = 16$.',
                    'Hence $37^\u005ccirc$ and $53^\u005ccirc$.',
                  ],
                  answer: '$37^\u005ccirc$ and $53^\u005ccirc$',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Five rays draw out from one point, no two of them opposite. How many angles do they determine?',
                  solution: [
                    'Now, each unordered pair of rays carries one angle with its vertex at the common point — the pair census of 8.1 in angle dress.',
                    'So $N = \u005cfrac{5 \u005ctimes 4}{2} = 10$: five choices of first arm, four of second, halved because every angle got listed twice.',
                    'Hence $10$ angles.',
                  ],
                  answer: '$10$ angles',
                },
                {
                  q: 'Find the angle between the hands of a clock at 2:30, and the reflex angle between them.',
                  solution: [
                    'Now, at 2:30 the hour hand has walked $2 \u005ctimes 30 + 30 \u005ctimes 0.5 = 60 + 15 = 75^\u005ccirc$ past 12 — it stands halfway from the 2 to the 3.',
                    'So the minute hand stands at $30 \u005ctimes 6 = 180^\u005ccirc$, and the gap between the hands is $180 - 75 = 105^\u005ccirc$.',
                    'And the reflex turn between them is the rest of the full turn: $360 - 105 = 255^\u005ccirc$.',
                    'Hence $105^\u005ccirc$, with reflex partner $255^\u005ccirc$.',
                  ],
                  answer: '$105^\u005ccirc$; reflex $255^\u005ccirc$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that every angle\u2019s supplement exceeds its complement by exactly $90^\u005ccirc$, and cash the result at $47^\u005ccirc$.',
                  solution: [
                    'Now, take any angle $x$ with $0 < x < 180$: its supplement is $180 - x$ and its complement $90 - x$.',
                    'So the difference is $(180 - x) - (90 - x) = 180 - x - 90 + x$.',
                    'And the $x$ cancels entirely: the difference is $90^\u005ccirc$ — a constant of the vocabulary, not a property of the particular angle.',
                    'Cashed at $47^\u005ccirc$: supplement $133$, complement $43$, and $133 - 43 = 90$.',
                    'Hence $\u005ctext{supp}(x) = \u005ctext{comp}(x) + 90^\u005ccirc$ for every angle — one derivation, every case.',
                  ],
                  answer: '$\u005ctext{supp}(x) - \u005ctext{comp}(x) = 90^\u005ccirc$ for every $x$; at $47^\u005ccirc$: $133 - 43 = 90$',
                },
                {
                  q: 'An angle equals five times its supplement. Find the angle, and explain why no acute angle can have this property.',
                  solution: [
                    'Now, name the angle $x$: the condition reads $x = 5(180 - x)$.',
                    'So $x = 900 - 5x$, giving $6x = 900$ and $x = 150$ — check: the supplement is $30$ and $150 = 5 \u005ctimes 30$.',
                    'And no acute angle can: if $x < 90$ then $180 - x > 90$, so $5(180 - x) > 450$ — but a supplement can never exceed $180^\u005ccirc$, so the equation is unreachable from below the right angle.',
                    'Hence $150^\u005ccirc$, and the acute case impossible: five times any acute angle\u2019s supplement overspills the $180^\u005ccirc$ ceiling outright.',
                  ],
                  answer: '$150^\u005ccirc$; no acute angle can — five times its supplement would exceed $450^\u005ccirc$, far past the $180^\u005ccirc$ ceiling',
                },
              ],
            },
          ],
        },
      ],
    },
      {
        id: 'fm-parallel-lines-and-transversals',
        number: '8.3',
        title: 'Parallel Lines and Transversals',
        concepts: [
          'The transversal',
          'The eight-angle scene',
          'Linear pair',
          'Vertically opposite angles',
          'Corresponding angles',
          'Alternate interior angles',
          'Co-interior (allied) angles',
          'The three parallel tests',
        ],
        objectives: [
          'Define a transversal, name all eight angles it creates at two crossings, and sort them into the interior band and the two exteriors',
          'Prove the linear-pair law and the vertically-opposite theorem from 8.2\u2019s straight-angle ledger \u2014 the two facts that hold at every crossing, parallel lines or not',
          'State the corresponding-angles axiom (the school dress of Euclid\u2019s fifth postulate) and derive the alternate-interior and co-interior consequences from it',
          'Run the three parallel tests in both directions \u2014 to read every angle of a scene from one number, and to certify from measurements alone that two lines are parallel',
          'Count the scene\u2019s 28 angle pairs into the named families and recognise the F, Z and C memory patterns in any examination figure',
        ],
        prerequisites: ['fm-points-lines-and-planes', 'fm-angles-and-their-measurement'],
        sources: ['ncert-math7-gp-ch5', 'ncert-math9-ch6', 'ncert-math6-ch4', 'khattar-qa-4e'],
        blocks: [
          {
            kind: 'para',
            text: 'Lesson 8.1 drew the stage: points, lines and planes, and the two ways a pair of lines can live together in a plane \u2014 crossing exactly once, or never crossing at all. The never-crossing pair got its name there, *parallel*, with a promise that school geometry stays on the flat stage where parallelism makes sense. But 8.1 left the parallel lines themselves untouched, and for a good reason: two lines that never meet look identical, in any finite drawing, to two lines that meet once \u2014 just beyond the paper\u2019s edge. Nothing in the picture alone tells you which pair is which. This lesson builds the missing instrument. The instrument is a third line drawn slantwise across the pair \u2014 a **transversal** \u2014 and the eight angles it creates broadcast the whole story: cut a suspected parallel pair, read the angles, and the pair confesses in one glance.',
          },
          {
            kind: 'para',
            text: 'The payoff runs in both directions. Given the parallels, the transversal *predicts* every angle at both crossings from any single one \u2014 the fact that powers every angle-chase on every examination paper at this level. Given the angles, the transversal *certifies* the parallels \u2014 the only test this book will meet for deciding, from measurements alone, that two lines never meet. One instrument, two directions. And the logic is honest about its one assumption: a single axiom carries the parallel half of the story, and everything else \u2014 every other statement in this lesson \u2014 is derived from it, not asserted.',
          },
          { kind: 'heading', text: 'The transversal: one line crossing two' },
          {
            kind: 'para',
            text: 'Fix two lines $l$ and $m$ in the plane and draw a third line $t$ that cuts across both. The definition asks exactly one thing of the cutter: the crossings must happen at *distinct points*. A line passing through the same point where $l$ and $m$ already cross is not a transversal \u2014 it is just one more line through one point, 8.1\u2019s concurrency wearing a new hat. The transversal\u2019s whole value is that it visits each line separately and can compare what it finds.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'Transversal',
            text: 'A **transversal** is said to be a **line that crosses two or more other lines at distinct points**. In the scene below, the transversal $t$ crosses $l$ at $P$ and $m$ at $Q$ \u2014 two distinct points. The two crossed lines may be parallel or not: the name belongs to the crossing, not to the pair. When the crossed lines *are* parallel, the scene becomes the most productive figure in elementary geometry.',
          },
          {
            kind: 'para',
            text: 'Each crossing of two lines makes four angles \u2014 8.2\u2019s scene at a single vertex \u2014 so a transversal through two lines makes eight. The eight organise themselves at a glance once the two crossed lines are seen as the boundaries of a band: the strip between them is the **interior**, and the two half-planes outside are the **exteriors**. Figure 1 draws the whole scene with the interior tinted, and numbers the eight angles clockwise from the top left at each crossing.',
          },
          {
            kind: 'figure',
            caption:
              'The transversal scene. Lines $l$ and $m$ are cut by the transversal $t$ at the crossings $P$ (upper) and $Q$ (lower); the tinted band between them is the interior. The eight angles are numbered clockwise from the top left at each crossing: $\\angle 1$\u2013$\\angle 4$ live at $P$, $\\angle 5$\u2013$\\angle 8$ at $Q$. The interior band holds angles 3, 4, 5, 6; the exteriors hold 1, 2, 7, 8. Every relation this lesson proves is a statement about where a pair of these eight sits.',
            svg: `<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines l and m cut by a transversal t at crossings P and Q, eight numbered angles, interior band tinted">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the transversal scene — two crossings, eight angles</text>
  <rect x="90" y="120" width="580" height="160" fill="currentColor" opacity="0.08"/>
  <line x1="90" y1="120" x2="670" y2="120" stroke="currentColor" stroke-width="2"/>
  <polygon points="90,120 101,115.5 101,124.5" fill="currentColor"/>
  <polygon points="670,120 659,124.5 659,115.5" fill="currentColor"/>
  <line x1="90" y1="280" x2="670" y2="280" stroke="currentColor" stroke-width="2"/>
  <polygon points="90,280 101,275.5 101,284.5" fill="currentColor"/>
  <polygon points="670,280 659,284.5 659,275.5" fill="currentColor"/>
  <line x1="220" y1="40" x2="540" y2="360" stroke="currentColor" stroke-width="2"/>
  <polygon points="220,40 230.96,44.6 224.6,50.96" fill="currentColor"/>
  <polygon points="540,360 529.04,355.4 535.4,349.04" fill="currentColor"/>
  <circle cx="300" cy="120" r="4.5" fill="currentColor"/>
  <circle cx="460" cy="280" r="4.5" fill="currentColor"/>
  <text x="70" y="108" font-size="14" fill="currentColor" text-anchor="middle">l</text>
  <text x="70" y="298" font-size="14" fill="currentColor" text-anchor="middle">m</text>
  <text x="222" y="78" font-size="14" fill="currentColor" text-anchor="middle">t</text>
  <text x="290" y="88" font-size="14" fill="currentColor" text-anchor="middle">P</text>
  <text x="470" y="320" font-size="14" fill="currentColor" text-anchor="middle">Q</text>
  <text x="260" y="112" font-size="12.5" fill="currentColor" text-anchor="middle">1</text>
  <text x="313" y="92.6" font-size="12.5" fill="currentColor" text-anchor="middle">2</text>
  <text x="346" y="143" font-size="12.5" fill="currentColor" text-anchor="middle">3</text>
  <text x="287" y="155.4" font-size="12.5" fill="currentColor" text-anchor="middle">4</text>
  <text x="420" y="272" font-size="12.5" fill="currentColor" text-anchor="middle">5</text>
  <text x="473" y="252.6" font-size="12.5" fill="currentColor" text-anchor="middle">6</text>
  <text x="506" y="303" font-size="12.5" fill="currentColor" text-anchor="middle">7</text>
  <text x="447" y="315.4" font-size="12.5" fill="currentColor" text-anchor="middle">8</text>
  <text x="598" y="200" font-size="12" fill="currentColor" text-anchor="middle">interior</text>
  <text x="608" y="84" font-size="12" fill="currentColor" text-anchor="middle">exterior</text>
  <text x="608" y="318" font-size="12" fill="currentColor" text-anchor="middle">exterior</text>
</svg>`,
          },
          {
            kind: 'para',
            text: 'The pairs worth naming, in one roman run \u2014 the numbers are figure 1\u2019s, and each claim is checked against the figure\u2019s own geometry by this book\u2019s verification script:',
          },
          {
            kind: 'list',
            marker: 'roman',
            items: [
              '**linear pairs** \u2014 the side-by-side pairs at one crossing: $(1,2)$, $(2,3)$, $(3,4)$, $(4,1)$ at $P$, and $(5,6)$, $(6,7)$, $(7,8)$, $(8,5)$ at $Q$; eight pairs, each sharing an arm and filling one straight edge;',
              '**vertically opposite pairs** \u2014 the diagonal pairs at one crossing: $(1,3)$, $(2,4)$, $(5,7)$, $(6,8)$; four pairs sharing only the vertex;',
              '**corresponding pairs** \u2014 one angle at each crossing, in the same position: $(1,5)$, $(2,6)$, $(3,7)$, $(4,8)$; four pairs, each on the same side of $t$ and the same side of its own line;',
              '**alternate interior pairs** \u2014 inside the band, opposite sides of $t$: $(3,5)$ and $(4,6)$; two pairs, the ends of a Z;',
              '**co-interior pairs** \u2014 inside the band, the same side of $t$: $(3,6)$ and $(4,5)$; two pairs, the ends of a C;',
              'the exteriors hold the cousins: **alternate exterior** $(1,7)$, $(2,8)$ and **co-exterior** $(1,8)$, $(2,7)$ \u2014 two pairs each, same verdicts, outside the band.',
            ],
          },
          {
            kind: 'para',
            text: 'Count the census: eight, four, four, two, two, two, two \u2014 twenty-four named pairs among the $\\frac{8 \\times 7}{2} = 28$ unordered pairs the scene contains. Four pairs \u2014 $(1,6)$, $(2,5)$, $(3,8)$, $(4,7)$, each one exterior matched with one interior on the same side of $t$ \u2014 carry no name, because no relation binds them: no theorem, no examination question, nothing. The census is 8.1\u2019s pair-counting law wearing angles, and the last Illustration returns to it in full.',
          },
          { kind: 'heading', text: 'Linear pairs: the straight angle, split' },
          {
            kind: 'para',
            text: 'The first family needs no parallels and no new ideas \u2014 only 8.2\u2019s ledger. At the crossing $P$, angles 1 and 2 sit side by side: a common arm (the upper ray of $t$), and outer arms \u2014 $l$\u2019s west ray and east ray \u2014 that are opposite rays of one line. Any two angles arranged this way are a **linear pair**, and their measures are locked together by the straight angle.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'Linear pair',
            text: 'Two angles are said to form a **linear pair** when they are adjacent \u2014 one common arm \u2014 and their non-common arms are **opposite rays** of a single line. Thus $\\angle 1$ and $\\angle 2$ of figure 1 form a linear pair, and so do the three other side-by-side pairs at each crossing. The memory hook is the name itself: the pair\u2019s outer arms literally *form a line*.',
          },
          {
            kind: 'equation',
            latex: '\\text{the angles of a linear pair are supplementary:} \\qquad \\angle A + \\angle B = 180^\\circ',
            note: 'the linear-pair law \u2014 8.2\u2019s straight angle (a half-turn, exactly $180^\\circ$) split at the common arm. The script swept transversals of six different slopes: every linear pair in every scene sums to $180^\\circ$, without exception.',
          },
          {
            kind: 'derivation',
            title: 'Why a linear pair sums to 180°',
            statement:
              'Let a ray $\\overrightarrow{PC}$ stand on the line $l$ at the point $P$, making two adjacent angles with it: $\\angle APC$ and $\\angle CPB$, whose outer arms $\\overrightarrow{PA}$ and $\\overrightarrow{PB}$ are opposite rays. Claim: the two measures add to exactly $180^\\circ$.',
            steps: [
              {
                label: 'Read the outer arms',
                formula: '\\overrightarrow{PA},\\ \\overrightarrow{PB} \\text{ are opposite rays of } l',
                explanation:
                  'That is the linear pair\u2019s definition \u2014 and it means the two angles together sweep the entire half-plane on one side of $l$, with no gap and no overlap.',
              },
              {
                label: 'Add the two angles',
                formula: '\\angle APC + \\angle CPB',
                explanation:
                  'The combined angle turns from the west ray to the east ray through the standing ray \u2014 a half-turn about $P$, whatever the standing ray\u2019s tilt.',
              },
              {
                label: 'Cash the straight angle',
                formula: '\\angle APC + \\angle CPB = 180^\\circ',
                explanation:
                  '8.2\u2019s ledger: the half-turn measures exactly $180^\\circ$. Notice the standing ray\u2019s position never entered the arithmetic \u2014 it cancelled the way $x$ cancelled in 8.2\u2019s supplement identity.',
              },
            ],
            result:
              'Every linear pair is supplementary: the two measures add to exactly $180^\\circ$, whatever the tilt of the common arm. Each angle of the pair is the supplement of the other.',
          },
          {
            kind: 'para',
            text: 'One number now buys three at any crossing: given $\\angle 1$, the linear-pair law hands over $\\angle 2$ and $\\angle 4$ (each $180^\\circ$ minus), and the next theorem hands over the fourth.',
          },
          { kind: 'heading', text: 'Vertically opposite angles: the crossing theorem' },
          {
            kind: 'para',
            text: 'Two crossing lines make four angles, and the diagonal pairs \u2014 1 opposite 3, 2 opposite 4 \u2014 look equal in every drawing ever made. The look is a theorem, and its proof is two linear pairs and one cancellation.',
          },
          {
            kind: 'callout',
            tone: 'theorem',
            title: 'Vertically opposite angles',
            text: 'When two lines cross, the angles that are **vertically opposite** \u2014 each diagonal pair sharing only the vertex \u2014 are **equal**. Thus $\\angle 1 = \\angle 3$ and $\\angle 2 = \\angle 4$ at every crossing, parallel lines or not.',
          },
          {
            kind: 'derivation',
            title: 'Vertically opposite angles are equal',
            statement:
              'Lines $l$ and $t$ cross at $P$, making angles 1, 2, 3, 4 in order around the point. Claim: $\\angle 1 = \\angle 3$.',
            steps: [
              {
                label: 'Linear pair along l',
                formula: '\\angle 1 + \\angle 2 = 180^\\circ',
                explanation: 'Angles 1 and 2 sit side by side along $l$: a linear pair, by the law just proved.',
              },
              {
                label: 'Linear pair along t',
                formula: '\\angle 2 + \\angle 3 = 180^\\circ',
                explanation: 'Angles 2 and 3 sit side by side along $t$: another linear pair.',
              },
              {
                label: 'Supplements of one angle',
                formula: '\\angle 1 = 180^\\circ - \\angle 2 = \\angle 3',
                explanation:
                  'Both 1 and 3 are supplements of the same $\\angle 2$, so they are equal \u2014 the same cancellation that proved supp $-$ comp $= 90^\\circ$ in 8.2: the common angle drops out entirely.',
              },
            ],
            result:
              'Vertically opposite angles are equal: $\\angle 1 = \\angle 3$ and likewise $\\angle 2 = \\angle 4$. The crossing itself is the only requirement \u2014 the theorem asks nothing of parallelism, and nothing of how the lines are tilted.',
          },
          {
            kind: 'example',
            title: 'Two lines cross at $O$, and one of the four angles measures $74^\\circ$. Find the other three.',
            steps: [
              'Now, the angle vertically opposite the $74^\\circ$ equals it: $74^\\circ$.',
              'So each remaining angle is the linear-pair supplement: $180 - 74 = 106^\\circ$ \u2014 and the two remaining angles are vertically opposite each other, so both read $106^\\circ$.',
              'Hence $106^\\circ$, $74^\\circ$, $106^\\circ$ \u2014 checks: $74 + 106 = 180$ along each of the two lines.',
            ],
          },
          { kind: 'heading', text: 'The corresponding-angles axiom: where parallelism enters' },
          {
            kind: 'para',
            text: 'Everything so far \u2014 the eight names, the linear-pair law, the vertically-opposite theorem \u2014 asked nothing of the two crossed lines. Cut a transversal across two lines that meet somewhere far off the paper, and every statement of the last two sections still holds. Parallelism now enters, and it enters as an **assumption**: the one place in this lesson where the book asserts rather than derives.',
          },
          {
            kind: 'para',
            text: 'When $l$ and $m$ are parallel, the four corresponding pairs are equal: $\\angle 1 = \\angle 5$, $\\angle 2 = \\angle 6$, $\\angle 3 = \\angle 7$, $\\angle 4 = \\angle 8$. This book\u2019s script swept the claim over transversals of six different slopes \u2014 at every slope, all four pairs equal to the last decimal. But a sweep can only *check*, never *prove*: the fact is genuinely an axiom, Euclid\u2019s fifth postulate wearing school dress. Euclid needed precisely this content as a postulate in his Elements; two thousand years of attempts to prove it from tamer assumptions ended in the discovery that it cannot be done (the historical callout tells that story). The schoolroom takes it as the corresponding-angles axiom and pays exactly one assumption for the whole parallel-angle machinery.',
          },
          {
            kind: 'callout',
            tone: 'theorem',
            title: 'The corresponding-angles axiom',
            text: 'If two **parallel** lines are cut by a transversal, each pair of **corresponding angles** is equal. Thus, in figure 1 with $l \\parallel m$: $\\angle 1 = \\angle 5$, $\\angle 2 = \\angle 6$, $\\angle 3 = \\angle 7$, $\\angle 4 = \\angle 8$. This is the school form of Euclid\u2019s fifth postulate \u2014 assumed, not proved; every other parallel-angle fact of this lesson derives from it.',
          },
          {
            kind: 'para',
            text: 'With the axiom in place, the whole scene folds up. Corresponding equality, chained through the crossing theorems, forces the eight angles into two four-angle families: all four acute angles equal, all four obtuse equal, each acute the supplement of each obtuse. A scene with non-parallel lines spreads over four distinct measures (the script\u2019s sweep confirms four on sloped pairs); the moment the lines are parallel, two. The ledger:',
          },
          {
            kind: 'equation',
            latex: 'l \\parallel m,\\ t \\text{ a transversal} \\;\\Longrightarrow\\; \\angle\\text{corr} = \\angle\\text{corr}, \\quad \\angle\\text{alt} = \\angle\\text{alt}, \\quad \\angle\\text{co-int} + \\angle\\text{co-int} = 180^\\circ',
            note: 'the three forward consequences, proved below: corresponding angles equal by the axiom; alternate interior equal via the vertically-opposite theorem; co-interior supplementary via the linear-pair law.',
          },
          {
            kind: 'derivation',
            title: 'Alternate interior angles are equal',
            statement:
              'With $l \\parallel m$ cut by $t$ at $P$ and $Q$: claim $\\angle 3 = \\angle 5$ (and likewise $\\angle 4 = \\angle 6$).',
            steps: [
              {
                label: 'Corresponding pair',
                formula: '\\angle 3 = \\angle 7',
                explanation:
                  'The axiom at work: angle 3 at the upper crossing corresponds to angle 7 at the lower \u2014 both below their lines, both on the same side of $t$.',
              },
              {
                label: 'Vertically opposite at Q',
                formula: '\\angle 7 = \\angle 5',
                explanation:
                  'Angles 7 and 5 are the diagonal pair at the crossing $Q$ \u2014 the crossing theorem, which needs no parallelism.',
              },
              {
                label: 'Chain the two',
                formula: '\\angle 3 = \\angle 7 = \\angle 5',
                explanation:
                  'Equality chains: 3 equals 7 equals 5. The pair $(3, 5)$ sits inside the band on opposite sides of $t$ \u2014 alternate interior angles, equal.',
              },
            ],
            result:
              'With parallels, alternate interior angles are equal: $\\angle 3 = \\angle 5$ and $\\angle 4 = \\angle 6$. Euclid proves exactly this as Proposition I.29 \u2014 the first proposition of the Elements that needs the fifth postulate.',
          },
          {
            kind: 'derivation',
            title: 'Co-interior angles are supplementary',
            statement:
              'With $l \\parallel m$ cut by $t$: claim $\\angle 3 + \\angle 6 = 180^\\circ$ (and likewise $\\angle 4 + \\angle 5 = 180^\\circ$).',
            steps: [
              {
                label: 'Corresponding pair',
                formula: '\\angle 3 = \\angle 7',
                explanation: 'The axiom again \u2014 the same corresponding pair as in the last derivation.',
              },
              {
                label: 'Linear pair at Q',
                formula: '\\angle 6 + \\angle 7 = 180^\\circ',
                explanation: 'Angles 6 and 7 sit side by side along $m$: a linear pair, parallel or not.',
              },
              {
                label: 'Substitute the equal',
                formula: '\\angle 3 + \\angle 6 = \\angle 7 + \\angle 6 = 180^\\circ',
                explanation:
                  'Replace 3 by its equal 7: the co-interior pair $(3, 6)$ \u2014 same side of $t$, inside the band \u2014 sums to the straight angle.',
              },
            ],
            result:
              'With parallels, co-interior (allied) angles are supplementary: $\\angle 3 + \\angle 6 = 180^\\circ$ and $\\angle 4 + \\angle 5 = 180^\\circ$. The two interior angles on one side of the transversal always fill the straight angle between them.',
          },
          {
            kind: 'para',
            text: 'The three parallel-scene patterns have handed-down names in every examination hall, taken from the letter the two marked angles draw. Figure 2 shows all three, drawn to scale with the transversal at $60^\\circ$ to the parallels.',
          },
          {
            kind: 'figure',
            caption:
              'The three memory patterns, each a scene of parallels cut by a transversal at $60^\\circ$. F: corresponding angles sit in the same position at the two crossings \u2014 here $120^\\circ$ and $120^\\circ$; equal. Z: alternate interior angles sit inside the band on opposite sides of the transversal \u2014 here $60^\\circ$ and $60^\\circ$; equal. C: co-interior angles sit inside the band on the same side \u2014 here $60^\\circ$ and $120^\\circ$; supplementary, since $60 + 120 = 180$.',
            svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three panels F, Z and C showing corresponding, alternate interior and co-interior angle pairs formed by a transversal crossing two parallel lines">
  <text x="30" y="66" font-size="15" font-weight="bold" fill="currentColor" text-anchor="middle">F</text>
  <line x1="60" y1="90" x2="200" y2="90" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="60,90 71,85.5 71,94.5" fill="currentColor"/>
  <polygon points="200,90 189,94.5 189,85.5" fill="currentColor"/>
  <line x1="60" y1="210" x2="200" y2="210" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="60,210 71,205.5 71,214.5" fill="currentColor"/>
  <polygon points="200,210 189,214.5 189,205.5" fill="currentColor"/>
  <line x1="61.34" y1="25" x2="185.47" y2="240" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="61.34,25 70.74,32.28 62.94,36.78" fill="currentColor"/>
  <polygon points="185.47,240 176.07,232.72 183.87,228.22" fill="currentColor"/>
  <path d="M 90.87 76.14 A 16 16 0 0 1 114.87 90" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 160.15 196.14 A 16 16 0 0 1 184.15 210" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="114.87" y="66.3" font-size="12.5" fill="currentColor" text-anchor="middle">120°</text>
  <text x="184.15" y="186.3" font-size="12.5" fill="currentColor" text-anchor="middle">120°</text>
  <text x="130" y="274" font-size="12.5" fill="currentColor" text-anchor="middle">F — corresponding: equal</text>
  <text x="280" y="66" font-size="15" font-weight="bold" fill="currentColor" text-anchor="middle">Z</text>
  <line x1="310" y1="90" x2="450" y2="90" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="310,90 321,85.5 321,94.5" fill="currentColor"/>
  <polygon points="450,90 439,94.5 439,85.5" fill="currentColor"/>
  <line x1="310" y1="210" x2="450" y2="210" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="310,210 321,205.5 321,214.5" fill="currentColor"/>
  <polygon points="450,210 439,214.5 439,205.5" fill="currentColor"/>
  <line x1="311.34" y1="25" x2="435.47" y2="240" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="311.34,25 320.74,32.28 312.94,36.78" fill="currentColor"/>
  <polygon points="435.47,240 426.07,232.72 433.87,228.22" fill="currentColor"/>
  <path d="M 364.87 90 A 16 16 0 0 1 356.87 103.86" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 402.15 210 A 16 16 0 0 1 410.15 196.14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="388.7" y="117" font-size="12.5" fill="currentColor" text-anchor="middle">60°</text>
  <text x="360" y="184" font-size="12.5" fill="currentColor" text-anchor="middle">60°</text>
  <text x="380" y="274" font-size="12.5" fill="currentColor" text-anchor="middle">Z — alternate interior: equal</text>
  <text x="530" y="66" font-size="15" font-weight="bold" fill="currentColor" text-anchor="middle">C</text>
  <line x1="560" y1="90" x2="700" y2="90" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="560,90 571,85.5 571,94.5" fill="currentColor"/>
  <polygon points="700,90 689,94.5 689,85.5" fill="currentColor"/>
  <line x1="560" y1="210" x2="700" y2="210" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="560,210 571,205.5 571,214.5" fill="currentColor"/>
  <polygon points="700,210 689,214.5 689,205.5" fill="currentColor"/>
  <line x1="561.34" y1="25" x2="685.47" y2="240" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="561.34,25 570.74,32.28 562.94,36.78" fill="currentColor"/>
  <polygon points="685.47,240 676.07,232.72 683.87,228.22" fill="currentColor"/>
  <path d="M 614.87 90 A 16 16 0 0 1 606.87 103.86" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 660.15 196.14 A 16 16 0 0 1 684.15 210" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="638.7" y="117" font-size="12.5" fill="currentColor" text-anchor="middle">60°</text>
  <text x="694" y="179" font-size="12.5" fill="currentColor" text-anchor="middle">120°</text>
  <text x="630" y="274" font-size="12.5" fill="currentColor" text-anchor="middle">C — co-interior: supplementary</text>
</svg>`,
          },
          { kind: 'heading', text: 'The parallel tests: reading the scene backward' },
          {
            kind: 'para',
            text: 'Run backward, the same three facts become the working parallel tests: measure one well-chosen pair, and the lines confess. The converse of the axiom \u2014 equal corresponding angles force parallels \u2014 stands as an axiom in its own right in the school treatment; the other two tests then come free, chained through the crossing theorems. No new assumptions anywhere.',
          },
          {
            kind: 'callout',
            tone: 'theorem',
            title: 'The three parallel tests',
            text: 'Two lines cut by a transversal are **parallel** when any one of these holds: (i) a pair of **corresponding angles** is equal; (ii) a pair of **alternate interior angles** is equal; (iii) a pair of **co-interior angles** is supplementary. Each condition is the forward fact run in reverse, and each is an *if and only if*: the lines are parallel exactly when the condition holds.',
          },
          {
            kind: 'derivation',
            title: 'The co-interior test chains through the others',
            statement:
              'Two lines are cut by a transversal; a co-interior pair measures $\\angle 3$ and $\\angle 6$, and $\\angle 3 + \\angle 6 = 180^\\circ$. Claim: the lines are parallel.',
            steps: [
              {
                label: 'Linear pair at Q',
                formula: '\\angle 5 + \\angle 6 = 180^\\circ',
                explanation: 'Angles 5 and 6 sit side by side along the lower line \u2014 a linear pair, parallel or not.',
              },
              {
                label: 'Supplements of one angle',
                formula: '\\angle 3 = 180^\\circ - \\angle 6 = \\angle 5',
                explanation:
                  'Both 3 and 5 are supplements of the same $\\angle 6$, so they are equal \u2014 the alternate-interior equality recovered.',
              },
              {
                label: 'Corresponding via the crossing',
                formula: '\\angle 1 = \\angle 3 = \\angle 5',
                explanation:
                  'Angles 1 and 3 are vertically opposite; chain once more and the corresponding pair $(1, 5)$ comes out equal.',
              },
              {
                label: 'Apply the converse axiom',
                formula: 'l \\parallel m',
                explanation:
                  'Equal corresponding angles force the parallels \u2014 the converse of the corresponding-angles axiom, the school treatment\u2019s second standing assumption.',
              },
            ],
            result:
              'Supplementary co-interior angles certify the parallels. The alternate-interior test chains the same way (equal alternates give equal correspondings through one vertically-opposite step), so one axiom pair \u2014 forward and converse \u2014 carries all three tests.',
          },
          {
            kind: 'equation',
            latex: '\\angle\\text{corr} = \\angle\\text{corr} \\;\\Longleftrightarrow\\; l \\parallel m \\;\\Longleftrightarrow\\; \\angle\\text{alt} = \\angle\\text{alt} \\;\\Longleftrightarrow\\; \\angle\\text{co-int} + \\angle\\text{co-int} = 180^\\circ',
            note: 'the three tests are biconditionals \u2014 each equivalent to parallelism itself. The script swept both directions over five slopes for the second line: each condition held exactly when the slopes agreed, and never otherwise.',
          },
          {
            kind: 'callout',
            tone: 'insight',
            title: 'Exactly one parallel through a point',
            text: 'The tests hide a uniqueness. Given a line $l$ and a point $Q$ not on it, draw any transversal through $Q$: the test says the parallel through $Q$ is the one line making the corresponding angle equal \u2014 so **at most one** parallel to $l$ passes through $Q$ (and drawing one is easy, so exactly one). Proclus stated this in his commentary on Euclid (c. 450 AD); William Ludlam phrased it crisply in 1785; and John Playfair\u2019s 1795 edition of Euclid made it famous as **Playfair\u2019s axiom** \u2014 the modern textbook\u2019s favourite stand-in for Euclid\u2019s fifth postulate.',
          },
          {
            kind: 'example',
            title: 'In figure 1\u2019s scene $l \\parallel m$ and $\\angle 4 = 130^\\circ$. Find all seven remaining angles, naming the reason in each case.',
            steps: [
              'Now, $\\angle 2$ is vertically opposite $\\angle 4$: $130^\\circ$.',
              'So the linear partners at $P$ are the supplements: $\\angle 1 = 180 - 130 = 50^\\circ$ and $\\angle 3 = 50^\\circ$.',
              'And the axiom carries the reading across: $\\angle 8$ corresponds to $\\angle 4$, so $130^\\circ$; $\\angle 7$ corresponds to $\\angle 3$, so $50^\\circ$.',
              'Now, $\\angle 5$ is the alternate partner of $\\angle 3$: $50^\\circ$; and $\\angle 6$ is co-interior with $\\angle 3$: $180 - 50 = 130^\\circ$.',
              'Hence $50, 130, 50, 130, 50, 130, 50, 130$ \u2014 two distinct measures in two four-angle families, every adjacent sum $180^\\circ$.',
            ],
          },
          {
            kind: 'example',
            title: 'Two parallel lines are cut by a transversal, and a pair of co-interior angles stand in the ratio $2 : 3$. Find both angles.',
            steps: [
              'Now, co-interior angles sum to $180^\\circ$: name them $2k$ and $3k$.',
              'So $2k + 3k = 180$, giving $5k = 180$ and $k = 36$.',
              'And the angles are $2 \\times 36 = 72^\\circ$ and $3 \\times 36 = 108^\\circ$.',
              'Hence $72^\\circ$ and $108^\\circ$ \u2014 checks: $72 + 108 = 180$, and $72 : 108 = 2 : 3$.',
            ],
          },
          {
            kind: 'example',
            title: 'A transversal cuts two lines, and the co-interior angles on one side of it measure $74^\\circ$ and $106^\\circ$. Are the lines parallel?',
            steps: [
              'Now, the co-interior sum: $74 + 106 = 180^\\circ$ exactly.',
              'So the co-interior test fires: supplementary co-interior angles certify parallels.',
              'Hence yes \u2014 the lines are parallel, by test (iii) alone; no other measurement is needed.',
            ],
          },
          {
            kind: 'example',
            title: 'The acute and the obtuse angle of a parallel-transversal scene measure $(x + 85)^\\circ$ and $(2x - 25)^\\circ$. Find $x$ and both angles.',
            steps: [
              'Now, an acute and an obtuse angle of the scene are linear partners: their measures sum to $180^\\circ$.',
              'So $(x + 85) + (2x - 25) = 180$, giving $3x + 60 = 180$ and $x = 40$.',
              'And the angles: $40 + 85 = 125^\\circ$ (the obtuse one) and $80 - 25 = 55^\\circ$ (the acute one).',
              'Hence $x = 40$, the angles $125^\\circ$ and $55^\\circ$ \u2014 checks: $125 + 55 = 180$, and the sizes fit the names.',
            ],
          },
          {
            kind: 'example',
            title: 'How many of the 28 pairs among the scene\u2019s eight angles carry a special name? Break the census down.',
            steps: [
              'Now, the scene holds $\\frac{8 \\times 7}{2} = 28$ unordered pairs \u2014 8.1\u2019s pair law cashed at $n = 8$.',
              'So the named families count: $8$ linear $+\\ 4$ vertically opposite $+\\ 4$ corresponding $+\\ 2$ alternate interior $+\\ 2$ alternate exterior $+\\ 2$ co-interior $+\\ 2$ co-exterior $= 24$.',
              'And $28 - 24 = 4$ pairs stay unnamed \u2014 each pairs one exterior angle with one interior angle on the same side of $t$: no relation, no theorem.',
              'Hence 24 named and 4 unnamed among 28 \u2014 the census of the whole scene in one line.',
            ],
          },
          {
            kind: 'para',
            text: 'From the above discussion, it follows that the transversal\u2019s whole story is a short ledger:',
          },
          {
            kind: 'list',
            marker: 'roman',
            items: [
              'a transversal crosses two or more lines at distinct points; two crossings make eight angles \u2014 four interior, four exterior \u2014 and $28$ pairs, $24$ of them named;',
              'a linear pair fills the straight angle: adjacent angles on a line sum to $180^\\circ$, no parallelism required;',
              'vertically opposite angles are equal \u2014 two linear pairs and a cancellation, at every crossing;',
              'with $l \\parallel m$: corresponding angles are equal (the axiom \u2014 Euclid\u2019s fifth postulate in school dress), alternate interior angles are equal, and co-interior angles are supplementary \u2014 the eight angles fold into two equal families;',
              'run backward, the same three statements are the parallel tests \u2014 equal corresponding, equal alternate interior, or supplementary co-interior, any one certifies $l \\parallel m$.',
            ],
          },
          {
            kind: 'callout',
            tone: 'exam',
            title: 'Angle chases in the examination hall',
            text: 'The transversal scene is among the most-drilled figures in the competitive banks. The recurring shapes: read-all-eight from one number; the find-$x$ co-interior algebra ($(2x + 15)^\\circ$ with $(x + 45)^\\circ$, and cousins); corresponding-pair equations that end in a parallel verdict; ratio items (co-interior angles in $2 : 3$ or $1 : 3$); and the counting questions (how many angles, how many distinct measures). SSC CHSL and MTS papers favour the single-crossing linear-pair and vertically-opposite reads; RRB NTPC CBT-I the find-$x$ chases and the are-they-parallel verdicts; banking clerical prelims the quick supplement reads \u2014 the shapes cited here are the banks\u2019 recurring patterns, none reproduced. The memory hooks travel well and are worth banking: **F** for corresponding, **Z** for alternate interior, **C** for co-interior \u2014 spot the letter in the figure and the verdict follows.',
          },
          {
            kind: 'callout',
            tone: 'historical',
            title: 'The postulate that took two thousand years',
            text: 'Euclid\u2019s Elements (c. 300 BCE) states the parallel assumption in its full dress as **Postulate 5**: \u201cThat, if a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if produced indefinitely, meet on that side on which are the angles less than the two right angles.\u201d The Elements itself seems to have felt the awkwardness: Proposition I.27 \u2014 equal alternate angles force parallels \u2014 is proved *without* the postulate, while I.29, the forward direction, is the first place in the whole work where Postulate 5 is ever used. For two thousand years mathematicians tried to earn the postulate from the other four. Proclus (c. 450 AD) already apologised for it and stated the modern form; Ludlam (1785) and Playfair (1795, *Elements of Geometry*) gave the crisp versions \u2014 through a point not on a line passes at most one parallel. The end of the story came from outside every attempt: Nikolai Lobachevsky (lecture at Kazan, 1826; published 1829\u201330) and J\u00e1nos Bolyai (1832 appendix) independently built complete, consistent geometries in which the postulate *fails* \u2014 through the point pass infinitely many parallels \u2014 while Gauss had explored the same territory privately and published nothing. The postulate, they showed, is not a hidden theorem but a genuine choice; deny it, and another geometry answers. A later book in this library visits that world. The schoolroom keeps Euclid\u2019s choice \u2014 and this lesson\u2019s single axiom is its entire price.',
          },
          {
            kind: 'terms',
            items: [
              {
                term: 'Transversal',
                def: 'A line that crosses two or more other lines at distinct points; the instrument that makes parallelism measurable.',
              },
              {
                term: 'Interior angles',
                def: 'The four angles of the transversal scene that live in the band between the two crossed lines \u2014 angles 3, 4, 5, 6 of figure 1.',
              },
              {
                term: 'Exterior angles',
                def: 'The four angles living outside the band \u2014 angles 1, 2, 7, 8 of figure 1.',
              },
              {
                term: 'Linear pair',
                def: 'Two adjacent angles whose non-common arms are opposite rays of one line; their measures always sum to 180\u00b0.',
              },
              {
                term: 'Vertically opposite angles',
                def: 'The diagonal pair made by two crossing lines \u2014 equal at every crossing, proved from two linear pairs.',
              },
              {
                term: 'Corresponding angles',
                def: 'One angle at each crossing in the same position (the F pattern); equal when the lines are parallel \u2014 the corresponding-angles axiom.',
              },
              {
                term: 'Alternate interior angles',
                def: 'A pair inside the band on opposite sides of the transversal (the Z pattern); equal when the lines are parallel.',
              },
              {
                term: 'Alternate exterior angles',
                def: 'The outside cousins of the alternate interior pairs (angles 1 and 7, 2 and 8); equal when the lines are parallel.',
              },
              {
                term: 'Co-interior angles',
                def: 'A pair inside the band on the same side of the transversal (the C pattern, also called allied or consecutive interior); supplementary when the lines are parallel.',
              },
              {
                term: 'The parallel tests',
                def: 'Equal corresponding, equal alternate interior, or supplementary co-interior angles \u2014 each alone certifies that the cut lines are parallel; each is an if-and-only-if.',
              },
              {
                term: 'Playfair\u2019s axiom',
                def: 'Through a point not on a line there passes at most one parallel to the line \u2014 Proclus\u2019 statement, Ludlam\u2019s phrasing (1785), Playfair\u2019s fame (1795); equivalent to Euclid\u2019s fifth postulate.',
              },
            ],
          },
          {
            kind: 'quiz',
            title: 'Check yourself',
            items: [
              {
                q: 'A line that crosses two or more other lines at distinct points is called \u2014',
                options: ['a concurrent line', 'a transversal', 'a parallel line', 'a perpendicular bisector'],
                answer: 1,
                explain: 'The transversal is the cutter. \u201cConcurrent\u201d describes three or more lines through ONE point (8.1\u2019s census), \u201cparallel\u201d describes the never-meeting pair itself, and a perpendicular bisector is a segment\u2019s right-angle cutter \u2014 none of them names the crossing line.',
              },
              {
                q: 'One angle of a linear pair measures $74^\\circ$. The other measures \u2014',
                options: ['$16^\\circ$', '$74^\\circ$', '$106^\\circ$', '$286^\\circ$'],
                answer: 2,
                explain: '$180 - 74 = 106^\\circ$: a linear pair fills the straight angle. The traps: $16^\\circ$ is the complement ($90 - 74$), $74^\\circ$ is the vertically-opposite value, and $286^\\circ = 360 - 74$ is the reflex remainder \u2014 none of them is a supplement.',
              },
              {
                q: 'Two lines cross, and one of the four angles measures $57^\\circ$. The angle vertically opposite it measures \u2014',
                options: ['$123^\\circ$', '$57^\\circ$', '$47^\\circ$', '$133^\\circ$'],
                answer: 1,
                explain: 'Vertically opposite angles are equal: $57^\\circ$. The supplements ($180 - 57 = 123^\\circ$) belong to the linear partners \u2014 the two options near it are the supplement traps.',
              },
              {
                q: '$l \\parallel m$ are cut by a transversal. One co-interior angle measures $68^\\circ$. Its co-interior partner measures \u2014',
                options: ['$112^\\circ$', '$68^\\circ$', '$22^\\circ$', '$90^\\circ$'],
                answer: 0,
                explain: 'Co-interior angles are supplementary with parallels: $180 - 68 = 112^\\circ$. The trap $68^\\circ$ is the ALTERNATE partner\u2019s value \u2014 the Z pattern gives equality, the C pattern gives $180^\\circ$; $22^\\circ$ subtracts from 90 out of habit.',
              },
              {
                q: 'A transversal cuts two lines so that one pair of corresponding angles is equal. Then the two lines are \u2014',
                options: ['intersecting at exactly two points', 'perpendicular', 'parallel', 'concurrent'],
                answer: 2,
                explain: 'Equal corresponding angles are the first parallel test: the lines are parallel. \u201cIntersecting at exactly two points\u201d is impossible outright \u2014 8.1\u2019s two-point rule caps distinct lines at one common point \u2014 and perpendicularity and concurrency are different conditions the scene never asserted.',
              },
            ],
          },
          {
            kind: 'exercises',
            title: 'Exercises 8.3',
            sets: [
              {
                level: 'L1',
                questions: [
                  {
                    q: 'In the numbered scene of figure 1, list the angles that live in the interior band, and the four that live in the exteriors.',
                    solution: [
                      'Now, the interior band runs between the two crossed lines: the angles opening into it are $\\angle 3$ and $\\angle 4$ below $l$, and $\\angle 5$ and $\\angle 6$ above $m$.',
                      'So the interior is $\\{3, 4, 5, 6\\}$.',
                      'And the exteriors take the rest: $\\angle 1$ and $\\angle 2$ above $l$, $\\angle 7$ and $\\angle 8$ below $m$.',
                      'Hence interior $\\{3,4,5,6\\}$; exterior $\\{1,2,7,8\\}$ \u2014 four and four, as the figure\u2019s tinted band shows.',
                    ],
                    answer: 'interior $\\{3,4,5,6\\}$; exterior $\\{1,2,7,8\\}$',
                  },
                  {
                    q: 'At a single crossing, one angle measures $118^\\circ$. Find the angle vertically opposite it, and both linear partners.',
                    solution: [
                      'Now, the vertically opposite partner equals the given angle: $118^\\circ$.',
                      'So each linear partner is the supplement: $180 - 118 = 62^\\circ$ \u2014 and the two partners are themselves vertically opposite, both $62^\\circ$.',
                      'Hence $118^\\circ$, $62^\\circ$, $62^\\circ$ \u2014 checks: $118 + 62 = 180$ along each of the two lines.',
                    ],
                    answer: '$118^\\circ$; linear partners $62^\\circ$ and $62^\\circ$',
                  },
                ],
              },
              {
                level: 'L2',
                questions: [
                  {
                    q: 'In figure 1\u2019s scene $l \\parallel m$ and $\\angle 1 = 35^\\circ$. Find $\\angle 5$, $\\angle 6$, $\\angle 7$ and $\\angle 8$, with reasons.',
                    solution: [
                      'Now, at the upper crossing: $\\angle 2 = 180 - 35 = 145^\\circ$ (linear pair), $\\angle 3 = 35^\\circ$ and $\\angle 4 = 145^\\circ$ (vertically opposite).',
                      'So the axiom carries the upper reading to the lower crossing: $\\angle 5 = \\angle 1 = 35^\\circ$ and $\\angle 6 = \\angle 2 = 145^\\circ$ (corresponding pairs).',
                      'And likewise $\\angle 7 = \\angle 3 = 35^\\circ$ and $\\angle 8 = \\angle 4 = 145^\\circ$ (corresponding pairs).',
                      'Hence $35^\\circ, 145^\\circ, 35^\\circ, 145^\\circ$ \u2014 the two-family fold; check: every adjacent sum is $180^\\circ$.',
                    ],
                    answer: '$\\angle 5 = 35^\\circ$, $\\angle 6 = 145^\\circ$, $\\angle 7 = 35^\\circ$, $\\angle 8 = 145^\\circ$',
                  },
                  {
                    q: 'With $l \\parallel m$, $\\angle 3 = 76^\\circ$. Find its alternate partner, its co-interior partner, and its linear partner.',
                    solution: [
                      'Now, the alternate partner: $\\angle 5 = \\angle 3 = 76^\\circ$ (alternate interior with parallels).',
                      'So the co-interior partner: $\\angle 6 = 180 - 76 = 104^\\circ$ (co-interior supplementary).',
                      'And the linear partner at the same crossing: $\\angle 4 = 180 - 76 = 104^\\circ$ \u2014 indeed $\\angle 4 = \\angle 6$, the corresponding pair, as it should be.',
                      'Hence $76^\\circ$, $104^\\circ$, $104^\\circ$.',
                    ],
                    answer: '$\\angle 5 = 76^\\circ$; $\\angle 6 = 104^\\circ$; $\\angle 4 = 104^\\circ$',
                  },
                ],
              },
              {
                level: 'L3',
                questions: [
                  {
                    q: 'A pair of co-interior angles stand in the ratio $1 : 3$. Find both angles.',
                    solution: [
                      'Now, name them $x$ and $3x$: co-interior angles sum to $180^\\circ$ when the lines are parallel.',
                      'So $x + 3x = 180$, giving $4x = 180$ and $x = 45$.',
                      'And the angles are $45^\\circ$ and $135^\\circ$ \u2014 checks: $45 + 135 = 180$ and $135 = 3 \\times 45$.',
                      'Hence $45^\\circ$ and $135^\\circ$.',
                    ],
                    answer: '$45^\\circ$ and $135^\\circ$',
                  },
                  {
                    q: 'Co-interior angles measure $(2x + 15)^\\circ$ and $(x + 45)^\\circ$. Find $x$ and both angles.',
                    solution: [
                      'Now, the co-interior sum reads as an equation: $(2x + 15) + (x + 45) = 180$.',
                      'So $3x + 60 = 180$, giving $3x = 120$ and $x = 40$.',
                      'And the angles: $2 \\times 40 + 15 = 95^\\circ$ and $40 + 45 = 85^\\circ$ \u2014 check: $95 + 85 = 180$.',
                      'Hence $x = 40$; the angles $95^\\circ$ and $85^\\circ$.',
                    ],
                    answer: '$x = 40$; $95^\\circ$ and $85^\\circ$',
                  },
                ],
              },
              {
                level: 'L4',
                questions: [
                  {
                    q: 'A transversal cuts two lines so that a pair of corresponding angles measures $(2x + 30)^\\circ$ and $(3x - 10)^\\circ$. Find $x$, both angles, and decide whether the lines are parallel.',
                    solution: [
                      'Now, set the corresponding pair equal and solve: $2x + 30 = 3x - 10$.',
                      'So $x = 40$, and both angles measure $2 \\times 40 + 30 = 110^\\circ$ \u2014 check the other: $3 \\times 40 - 10 = 110$, the same.',
                      'And equal corresponding angles are precisely the first parallel test: the lines ARE parallel.',
                      'Hence $x = 40$, both angles $110^\\circ$, and the lines parallel by test (i).',
                    ],
                    answer: '$x = 40$; both angles $110^\\circ$; the lines are parallel',
                  },
                  {
                    q: 'At one crossing of a parallel-transversal scene, one angle is three times its linear partner. Find all eight angles of the scene.',
                    solution: [
                      'Now, name the smaller angle $x$: the larger is $3x$, and a linear pair gives $x + 3x = 180$.',
                      'So $4x = 180$ and $x = 45$: the upper crossing reads $45^\\circ, 135^\\circ, 45^\\circ, 135^\\circ$ in order (the vertically opposite pairs).',
                      'And the corresponding-angles axiom folds the lower crossing identically: $45^\\circ, 135^\\circ, 45^\\circ, 135^\\circ$.',
                      'Hence $\\angle 1 = \\angle 3 = \\angle 5 = \\angle 7 = 45^\\circ$ and $\\angle 2 = \\angle 4 = \\angle 6 = \\angle 8 = 135^\\circ$ \u2014 check: every adjacent sum is $180^\\circ$.',
                    ],
                    answer: '$45^\\circ$ family $\\{1,3,5,7\\}$; $135^\\circ$ family $\\{2,4,6,8\\}$',
                  },
                ],
              },
              {
                level: 'L5',
                questions: [
                  {
                    q: 'A transversal crosses three parallel lines. How many angles does the scene contain, and how many distinct measures?',
                    solution: [
                      'Now, each crossing makes four angles: $3 \\times 4 = 12$ angles in all.',
                      'So the same transversal makes the same angle with every parallel line: every acute angle in the scene equals every other acute angle, and the obtuse ones match likewise.',
                      'And two families exhaust the scene \u2014 the acute measure and its supplement.',
                      'Hence $12$ angles and exactly $2$ distinct measures: the two-line fold carried to three parallels.',
                    ],
                    answer: '$12$ angles; $2$ distinct measures',
                  },
                  {
                    q: 'Co-interior angles measure $70^\\circ$ and $\\left(\\frac{x}{2} + 65\\right)^\\circ$. Find $x$ and the second angle.',
                    solution: [
                      'Now, the co-interior sum: $70 + \\frac{x}{2} + 65 = 180$.',
                      'So $\\frac{x}{2} = 45$, giving $x = 90$.',
                      'And the second angle: $\\frac{90}{2} + 65 = 110^\\circ$ \u2014 check: $70 + 110 = 180$.',
                      'Hence $x = 90$; the co-interior partner $110^\\circ$.',
                    ],
                    answer: '$x = 90$; partner $110^\\circ$',
                  },
                ],
              },
              {
                level: 'L6',
                questions: [
                  {
                    q: 'Two lines are cut by a transversal, and a pair of co-interior angles is supplementary. Prove that the lines are parallel, quoting each theorem used.',
                    solution: [
                      'Now, let the co-interior pair be $\\angle 3$ and $\\angle 6$ with $\\angle 3 + \\angle 6 = 180^\\circ$.',
                      'So at the lower crossing $\\angle 5 + \\angle 6 = 180^\\circ$ (linear pair): both $\\angle 3$ and $\\angle 5$ are supplements of the same $\\angle 6$, so $\\angle 3 = \\angle 5$.',
                      'And at the upper crossing $\\angle 1 = \\angle 3$ (vertically opposite), so $\\angle 1 = \\angle 5$: a corresponding pair, equal.',
                      'Hence by the converse axiom \u2014 equal corresponding angles force parallels \u2014 the lines are parallel: one linear pair, one cancellation, one crossing theorem, one axiom.',
                    ],
                    answer: 'co-int supp $\\Rightarrow$ $\\angle 3 = \\angle 5$ (supplements of $\\angle 6$) $\\Rightarrow$ $\\angle 1 = \\angle 5$ (VO) $\\Rightarrow$ $l \\parallel m$ (converse axiom)',
                  },
                  {
                    q: 'A transversal cuts two lines, and a pair of co-exterior angles measures $96^\\circ$ and $84^\\circ$. Are the lines parallel? If so, read all eight angles.',
                    solution: [
                      'Now, the co-exterior sum: $96 + 84 = 180^\\circ$ \u2014 the test-shaped fact; the chain: the linear partner of the $84^\\circ$ angle at its crossing measures $180 - 84 = 96^\\circ$, which corresponds to the given $96^\\circ$ angle.',
                      'So the corresponding pair is equal, and the converse axiom certifies the parallels.',
                      'And the scene folds: $\\angle 1 = \\angle 3 = \\angle 5 = \\angle 7 = 96^\\circ$ and $\\angle 2 = \\angle 4 = \\angle 6 = \\angle 8 = 84^\\circ$ \u2014 check: $\\angle 8$ was given as $84^\\circ$, consistent.',
                      'Hence parallel; the eight angles read $96, 84, 96, 84, 96, 84, 96, 84$ \u2014 every adjacent sum $180^\\circ$, both families verified.',
                    ],
                    answer: 'parallel; $\\{1,3,5,7\\} = 96^\\circ$, $\\{2,4,6,8\\} = 84^\\circ$',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'fm-triangles-and-the-angle-sum',
        number: '8.4',
        title: 'Triangles and the Angle Sum',
        concepts: [
          'The triangle',
          'Vertices, sides and interior angles',
          'The exterior angle',
          'The angle sum property',
          'The exterior angle property',
          'Scalene, isosceles, equilateral',
          'Acute, right, obtuse',
          'The triangle inequality',
        ],
        objectives: [
          'Define the triangle — three non-collinear points, three joining segments, and the region they enclose — and name its parts in both the capital-letter and the small-letter dress',
          'Prove the angle sum property from the parallel through one vertex, spending exactly three tools already owned: the straight angle of 8.2, the alternate-interior theorem of 8.3, and the uniqueness of the parallel through a point',
          'Derive the exterior angle property (exterior = the sum of the two remote interior angles) and its inequality reading, and use both to run exterior-angle chases',
          'Classify triangles by sides (scalene, isosceles, equilateral) and by angles (acute, right, obtuse), and prove the one-right/one-obtuse law and the right-triangle complement reflex from the angle sum',
          'Decide from three lengths alone whether a triangle exists, using the triangle inequality in its three-dress and largest-side forms',
        ],
        prerequisites: ['fm-parallel-lines-and-transversals', 'fm-angles-and-their-measurement'],
        sources: ['ncert-math7-ch6', 'ncert-math6-ch4', 'khattar-qa-4e'],
        blocks: [
          {
            kind: 'para',
            text: 'Three lessons of instruments, and now the bill falls due. Lesson 8.1 forged the ideal objects — points, segments, lines — and taught the two-point rule that fixes a line from any two of its points. Lesson 8.2 built the angle and its degree ledger, and closed with the straight angle: a half-turn, $180^\\circ$, the amount that fills any line at any of its points. Lesson 8.3 attached handles to the parallels — the alternate-interior theorem and its companions — all derived from the single honest axiom the chapter admits. Each instrument was built for a purpose that was pointedly not revealed. This lesson collects: the triangle, the first *closed* figure in the book, is the stage on which the three tools meet, and the angle sum — the oldest famous fact in geometry — is the receipt.',
          },
          {
            kind: 'para',
            text: 'The plan is worth watching as it unfolds, because it is the chapter\u2019s method in miniature. First the object is defined and its parts named (every drawing in this chapter is a map, never the territory — 8.1\u2019s Caution still governs). Then the headline theorem is *derived*, not asserted, and the derivation is audited: exactly three borrowed facts enter, each quoted from the lesson that earned it. From the headline, corollaries tumble in a chain — the exterior angle property, the one-right/one-obtuse law, the right-triangle complement — each a one-line consequence, each script-verified before it was written here. The lesson ends with a question about *lengths* instead of angles: which triples of numbers can be the sides of a triangle at all? The answer is the triangle inequality, and it ties the chapter back to 8.1\u2019s collinearity test in a single stroke.',
          },
          { kind: 'heading', text: 'The triangle and its parts' },
          {
            kind: 'para',
            text: 'Take three points. If they all sit on one line — 8.1 called such points *collinear* — the three joining segments fold onto that line and enclose nothing; the figure collapses into a segment wearing three names. So the definition refuses that case outright, in exactly the is-said-to-be dress the book\u2019s definitions wear.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'Triangle',
            text: 'A **triangle** is said to be formed by **three points not on one line**, called its **vertices**, together with the **three segments** $AB$, $BC$ and $CA$ that join them pairwise; the segments are its **sides**, and the region bounded by the three sides belongs to the figure. The triangle on vertices $A$, $B$, $C$ is written $\\triangle ABC$ (read: *triangle ABC*).',
          },
          {
            kind: 'para',
            text: 'Every triangle, then, carries three of each: three vertices, three sides, three **interior angles** — one at each vertex, opening into the region the sides enclose. The parts pair up by opposition, and the pairing is the triangle\u2019s own address book:',
          },
          {
            kind: 'list',
            marker: 'roman',
            items: [
              'the side $BC$ lies opposite the vertex $A$, so it faces the interior angle $\\angle BAC$ — written $\\angle A$ for short;',
              'the side $CA$ lies opposite the vertex $B$, facing $\\angle ABC$ — written $\\angle B$;',
              'the side $AB$ lies opposite the vertex $C$, facing $\\angle ACB$ — written $\\angle C$.',
            ],
          },
          {
            kind: 'para',
            text: 'For algebra it pays to dress the sides in small letters, each the mate of its opposite capital: $a = |BC|$, $b = |CA|$, $c = |AB|$. Figure 1 shows the whole apparatus at once — the named vertices, the small-letter sides, the three interior angles — and one more object worth meeting early: a side *produced*.',
          },
          {
            kind: 'para',
            text: 'Produce (extend) the side $BC$ past $C$ to a point $D$. At the vertex $C$ the new ray $CD$ and the old side $CA$ now form an angle that lives *outside* the triangle: an **exterior angle**. It is no stranger — 8.2 and 8.3 already own the machinery — because $\\angle ACD$ and the interior $\\angle ACB$ are two angles on one line at one point: a **linear pair**, summing to $180^\\circ$. Each vertex of a triangle owns two exterior angles this way (produce either neighbouring side), and the two at one vertex are vertically opposite — 8.3\u2019s theorem — so they measure the same. Six positions, three distinct measures.',
          },
          {
            kind: 'figure',
            caption:
              'The parts of $\\triangle ABC$: vertices $A$, $B$, $C$; sides $a = |BC|$, $b = |CA|$, $c = |AB|$ (each letter opposite its capital); the three interior angles marked with plain arcs. The side $BC$ is produced past $C$ to $D$, and the angle between $CA$ and the produced ray — marked with a dashed arc — is the exterior angle at $C$: the linear-pair mate of interior $\\angle C$, so $\\angle ACD = 180^\\circ - \\angle ACB$.',
            svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with vertices, sides a b c, interior angle arcs, and side BC produced to D with the dashed exterior angle at C">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the parts of a triangle, and the exterior angle at C</text>
  <line x1="250" y1="70" x2="120" y2="320" stroke="currentColor" stroke-width="1.8"/>
  <line x1="120" y1="320" x2="700" y2="320" stroke="currentColor" stroke-width="1.8"/>
  <line x1="600" y1="320" x2="250" y2="70" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="700,320 689,324.5 689,315.5" fill="currentColor"/>
  <circle cx="250" cy="70" r="4" fill="currentColor"/>
  <circle cx="120" cy="320" r="4" fill="currentColor"/>
  <circle cx="600" cy="320" r="4" fill="currentColor"/>
  <path d="M 274.41 87.44 A 30 30 0 0 1 236.16 96.62" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 133.87 293.4 A 30 30 0 0 1 150 320" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 570 320 A 30 30 0 0 1 575.59 302.56" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 583.73 308.37 A 20 20 0 0 1 620 320" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="246" y="50" font-size="14" fill="currentColor" text-anchor="middle">A</text>
  <text x="100" y="338" font-size="14" fill="currentColor" text-anchor="middle">B</text>
  <text x="616" y="344" font-size="14" fill="currentColor" text-anchor="middle">C</text>
  <text x="712" y="306" font-size="14" fill="currentColor" text-anchor="middle">D</text>
  <text x="360" y="306" font-size="13" fill="currentColor" text-anchor="middle">a</text>
  <text x="414" y="210" font-size="13" fill="currentColor" text-anchor="middle">b</text>
  <text x="201" y="203" font-size="13" fill="currentColor" text-anchor="middle">c</text>
  <text x="648" y="284" font-size="12" fill="currentColor" text-anchor="middle">exterior</text>
</svg>`,
          },
          { kind: 'heading', text: 'The angle sum property' },
          {
            kind: 'para',
            text: 'Cut any triangle out of paper, tear off its three corners, and lay the three angles side by side along a ruler edge: they compose a straight angle. The claim is older than the paper it gets demonstrated on — but a paper demonstration only shows the claim is *plausible*, and this book settles for nothing less than *derived*. The derivation needs nothing new. Its cast: one straight angle (8.2), one alternate-interior theorem (8.3), and the uniqueness of the parallel through a point (8.3\u2019s Playfair note). The idea is to carry the two far angles of the triangle to the vertex of the third — and the vehicle that carries angles without changing them is precisely a parallel line.',
          },
          {
            kind: 'derivation',
            title: 'The three interior angles of a triangle total 180°',
            statement:
              'Let $\\triangle ABC$ be any triangle. Draw the line $XY$ through $A$ parallel to the side $BC$ — it exists, and by Playfair\u2019s uniqueness it is the *only* such line. Claim: $\\angle A + \\angle B + \\angle C = 180^\\circ$.',
            steps: [
              {
                label: 'The parallel collects the first far angle',
                formula: '\\angle XAB = \\angle ABC',
                explanation:
                  'The parallels $XY$ and $BC$ are cut by the transversal $AB$; the angles $\\angle XAB$ and $\\angle ABC$ are alternate interior partners in 8.3\u2019s Z pattern, and alternate interior angles with parallels are **equal**.',
              },
              {
                label: 'It collects the second far angle',
                formula: '\\angle CAY = \\angle ACB',
                explanation:
                  'The same two parallels are cut by the transversal $AC$; $\\angle CAY$ and $\\angle ACB$ are again alternate interior partners, hence equal.',
              },
              {
                label: 'The straight angle at A splits three ways',
                formula: '\\angle XAB + \\angle BAC + \\angle CAY = 180^\\circ',
                explanation:
                  'The rays $AX$, $AB$, $AC$, $AY$ leave $A$ in order through the lower half-plane, and $XAY$ is a straight line: the three angles on it sum to the straight angle (8.2\u2019s ledger).',
              },
              {
                label: 'Substitute the two equalities',
                formula: '\\angle ABC + \\angle BAC + \\angle ACB = 180^\\circ',
                explanation:
                  'Replace $\\angle XAB$ by its mate $\\angle ABC$ and $\\angle CAY$ by its mate $\\angle ACB$: the three angles of the triangle now stand where the three angles on the line stood.',
              },
              {
                label: 'Read the receipt',
                formula: '\\angle A + \\angle B + \\angle C = 180^\\circ',
                explanation:
                  'Every claim used is quoted: the straight angle from 8.2, the alternate-interior equality from 8.3 (itself derived from the corresponding-angles axiom), and the parallel\u2019s existence-and-uniqueness from 8.3\u2019s Playfair note. Nothing was asserted; the theorem is *earned*. The figure below shows the whole exchange at one glance.',
              },
            ],
            result: '\\angle A + \\angle B + \\angle C = 180^\\circ',
          },
          {
            kind: 'equation',
            latex: '\\angle A + \\angle B + \\angle C \\;=\\; 180^\\circ \\qquad \\text{(the angle sum property)}',
            note: 'Tag 1. Script-verified twice before this sentence was written: once symbol-by-symbol on the proof figure\u2019s own triangle, and once on a sweep of $400$ pseudo-random triangles — every dot-product-measured triple summing to $180^\\circ$ within a tolerance a billionth of a degree.',
          },
          {
            kind: 'figure',
            caption:
              'The derivation as a picture. The line $XY$ through $A$ is parallel to $BC$. The transversal $AB$ makes $\\angle XAB$ (arc marked $1$ at $A$) alternate-interior with $\\angle ABC$ (arc marked $1$ at $B$) — equal. The transversal $AC$ makes $\\angle CAY$ (marked $3$ at $A$) alternate-interior with $\\angle ACB$ (marked $3$ at $C$) — equal. The angle $\\angle BAC$ (marked $2$) never left home. But $1 + 2 + 3 = 180^\\circ$, because the three of them fill the straight angle on the line $XY$ — and those same three numbers are exactly the interior angles of $\\triangle ABC$.',
            svg: `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with line XY through A parallel to BC; the three angles at A marked 1, 2, 3 and the matching marks at B and C">
  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the line XY through A, parallel to BC</text>
  <line x1="90" y1="120" x2="680" y2="120" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="90,120 101,115.5 101,124.5" fill="currentColor"/>
  <polygon points="680,120 669,124.5 669,115.5" fill="currentColor"/>
  <line x1="130" y1="340" x2="590" y2="340" stroke="currentColor" stroke-width="1.8"/>
  <line x1="300" y1="120" x2="130" y2="340" stroke="currentColor" stroke-width="1.8"/>
  <line x1="300" y1="120" x2="590" y2="340" stroke="currentColor" stroke-width="1.8"/>
  <circle cx="300" cy="120" r="4" fill="currentColor"/>
  <circle cx="130" cy="340" r="4" fill="currentColor"/>
  <circle cx="590" cy="340" r="4" fill="currentColor"/>
  <path d="M 281.66 143.74 A 30 30 0 0 1 270 120" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 330 120 A 30 30 0 0 1 323.9 138.13" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 320.71 135.71 A 26 26 0 0 1 284.1 140.57" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 327.09 140.55 A 34 34 0 0 1 279.21 146.9" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 148.34 316.26 A 30 30 0 0 1 160 340" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M 560 340 A 30 30 0 0 1 566.1 321.87" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="74" y="142" font-size="14" fill="currentColor" text-anchor="middle">X</text>
  <text x="696" y="142" font-size="14" fill="currentColor" text-anchor="middle">Y</text>
  <text x="286" y="102" font-size="14" fill="currentColor" text-anchor="middle">A</text>
  <text x="114" y="360" font-size="14" fill="currentColor" text-anchor="middle">B</text>
  <text x="606" y="360" font-size="14" fill="currentColor" text-anchor="middle">C</text>
  <text x="257" y="147" font-size="12.5" fill="currentColor" text-anchor="middle">1</text>
  <text x="195" y="316" font-size="12.5" fill="currentColor" text-anchor="middle">1</text>
  <text x="370" y="150" font-size="12.5" fill="currentColor" text-anchor="middle">3</text>
  <text x="540" y="332" font-size="12.5" fill="currentColor" text-anchor="middle">3</text>
  <text x="307" y="178" font-size="12.5" fill="currentColor" text-anchor="middle">2</text>
  <text x="380" y="398" font-size="12.5" fill="currentColor" text-anchor="middle">1 + 2 + 3 = 180° on the line XY — and the same three angles sit inside △ABC</text>
</svg>`,
          },
          {
            kind: 'para',
            text: 'The derivation\u2019s engine converts instantly into a formula for everyday use: any one angle of a triangle is determined by the other two.',
          },
          {
            kind: 'equation',
            latex: '\\angle C \\;=\\; 180^\\circ - \\angle A - \\angle B',
            note: 'The third-angle engine. Given any two interior angles, the third follows by one subtraction — the five-seconds reflex behind half of the angle chases on every examination paper at this level.',
          },
          {
            kind: 'example',
            title: 'Two angles of a triangle measure $62^\\circ$ and $45^\\circ$. Find the third.',
            steps: [
              'Now, the angle sum property says the three interior angles total $180^\\circ$.',
              'So the third angle measures $180 - 62 - 45 = 73^\\circ$.',
              'And the check re-sums: $62 + 45 + 73 = 180$ — the ledger closes.',
              'Hence the third angle is $73^\\circ$.',
            ],
          },
          {
            kind: 'example',
            title: 'The angles of a triangle stand in the ratio $2 : 3 : 4$. Find all three.',
            steps: [
              'Now, name the angles $2x$, $3x$ and $4x$ — the ratio\u2019s parts (chapter 6\u2019s sharing dress).',
              'So the angle sum reads $2x + 3x + 4x = 180$, giving $9x = 180$ and $x = 20$.',
              'And the angles are $2 \\times 20 = 40^\\circ$, $3 \\times 20 = 60^\\circ$, $4 \\times 20 = 80^\\circ$ — check: $40 + 60 + 80 = 180$, and $40 : 60 : 80$ really is $2 : 3 : 4$.',
              'Hence $40^\\circ$, $60^\\circ$, $80^\\circ$ — all acute, as $80 < 90$ confirms.',
            ],
          },
          { kind: 'heading', text: 'The exterior angle property' },
          {
            kind: 'para',
            text: 'Figure 1\u2019s dashed angle now earns its keep. The exterior angle at $C$ is the linear-pair mate of the interior $\\angle C$, so it measures $180^\\circ - \\angle C$; but the angle sum property makes $180^\\circ - \\angle C$ exactly $\\angle A + \\angle B$. One substitution, and a new theorem falls out — no drawing required.',
          },
          {
            kind: 'derivation',
            title: 'The exterior angle equals the sum of the two remote interior angles',
            statement:
              'In $\\triangle ABC$, produce the side $BC$ past $C$ to $D$, making the exterior angle $\\angle ACD$. Claim: $\\angle ACD = \\angle A + \\angle B$.',
            steps: [
              {
                label: 'The linear pair at C',
                formula: '\\angle ACD + \\angle ACB = 180^\\circ',
                explanation:
                  'The exterior angle and its adjacent interior angle sit on the produced line $BD$ — a linear pair (8.2\u2019s law), so they sum to the straight angle.',
              },
              {
                label: 'The angle sum spends its budget',
                formula: '\\angle ACB = 180^\\circ - \\angle A - \\angle B',
                explanation:
                  'Rearranging tag 1: the interior $\\angle C$ is exactly the amount left of $180^\\circ$ after the two remote angles take theirs.',
              },
              {
                label: 'Substitute and cancel',
                formula: '\\angle ACD = 180^\\circ - (180^\\circ - \\angle A - \\angle B) = \\angle A + \\angle B',
                explanation:
                  'The two $180^\\circ$s cancel — the same cancellation 8.3 used to derive the vertically-opposite theorem — and the exterior angle is revealed as the *sum* of the two interior angles it does not touch.',
              },
              {
                label: 'The inequality reading',
                formula: '\\angle ACD > \\angle A \\quad \\text{and} \\quad \\angle ACD > \\angle B',
                explanation:
                  'Each remote angle is a positive part of the sum, so the exterior angle exceeds each of them alone — Euclid\u2019s Proposition I.16 in modern dress. An exterior angle never loses to a remote interior angle.',
              },
            ],
            result: '\\angle ACD = \\angle A + \\angle B',
          },
          {
            kind: 'equation',
            latex: '\\angle ACD \\;=\\; \\angle A + \\angle B \\qquad \\text{(the exterior angle property)}',
            note: 'Tag 2, where $D$ lies on $BC$ produced. Script-verified on all $1200$ exterior positions of the $400$-triangle sweep: at every one, the exterior equals the sum of the two remote interiors and exceeds each of them.',
          },
          {
            kind: 'callout',
            tone: 'theorem',
            title: 'Exterior angle property',
            text: 'When any side of a triangle is produced, the **exterior angle** so formed is **equal to the sum of the two remote interior angles** — the two that do not share the produced vertex — and therefore **greater than either of them alone**. Thus in figure 1\u2019s dress: $\\angle ACD = \\angle A + \\angle B > \\angle A$ and $> \\angle B$.',
          },
          {
            kind: 'example',
            title: 'An exterior angle of a triangle measures $120^\\circ$, and one of its remote interior angles measures $50^\\circ$. Find the other two interior angles.',
            steps: [
              'Now, the exterior angle property points straight at the unknown remote angle: $\\angle B = 120 - 50 = 70^\\circ$.',
              'So the adjacent interior angle is its linear-pair mate: $\\angle C = 180 - 120 = 60^\\circ$.',
              'And the angle sum re-checks everything: $50 + 70 + 60 = 180$ — and $50 + 70 = 120$ is exactly the given exterior.',
              'Hence the interior angles are $50^\\circ$, $70^\\circ$, $60^\\circ$; both routes to $\\angle C$ agree.',
            ],
          },
          { kind: 'heading', text: 'Classifying triangles' },
          {
            kind: 'para',
            text: 'Triangles sort into families along two independent axes — by their *sides* and by their *angles* — and the angle sum property is the referee for the second sorting. Neither sorting asks about the other: a triangle from any side-family may land in any angle-family.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'The side families and the angle families',
            text: 'A triangle is said to be **scalene** if it has **no two equal sides**; **isosceles** if it has **at least two equal sides**; **equilateral** if **all three sides are equal** (so every equilateral triangle is also isosceles — the *at least* is doing quiet work). Independently, a triangle is said to be **acute** if **all three angles are acute**; **right** if **one angle is a right angle**; **obtuse** if **one angle is obtuse**.',
          },
          {
            kind: 'para',
            text: 'The angle families need a licence before the definitions even make sense: why does no triangle carry *two* right angles, or two obtuse ones? Because two angles of $90^\\circ$ or more would already fill the whole $180^\\circ$ budget of tag 1, leaving nothing — less than nothing — for the third. So *one* right angle, or *one* obtuse angle, is the most any triangle can hold, and the definitions are unambiguous. The same licence converts a right triangle into a two-angle machine: with $\\angle C = 90^\\circ$, tag 1 reads $\\angle A + \\angle B + 90^\\circ = 180^\\circ$, so',
          },
          {
            kind: 'equation',
            latex: '\\angle A + \\angle B \\;=\\; 90^\\circ \\qquad \\text{(in a right triangle)}',
            note: 'Tag 3: the two acute angles of a right triangle are **complementary** — the angle-sum property with the right angle paid upfront. Swept over all right triangles with legs $1$ through $12$: every acute pair sums to $90^\\circ$ exactly.',
          },
          {
            kind: 'para',
            text: 'One theorem about the isosceles family gets stated here and used for the rest of the book, and honesty requires saying exactly what was done to it. Euclid\u2019s Proposition I.5 — the *pons asinorum*, the “bridge of asses” — says the angles at the base of an isosceles triangle are equal; every classical proof of it (Euclid\u2019s own, and Pappus\u2019s clever self-congruence) leans on the congruence toolkit, which this book does not yet own. So the theorem is **stated**, **certified numerically** — swept over apex angles from $10^\\circ$ to $170^\\circ$, the base angles by exact dot-product computation landing on $(180^\\circ - \\text{apex})/2$ every time — and **proved for real when congruence arrives**.',
          },
          {
            kind: 'callout',
            tone: 'theorem',
            title: 'Isosceles base angles (Euclid I.5, stated and certified)',
            text: 'In an isosceles triangle, the angles opposite the equal sides — the **base angles** — are **equal**. Consequently an apex angle $\\theta$ forces both base angles to $\\frac{180^\\circ - \\theta}{2}$, and an equilateral triangle, being isosceles twice over, forces all three angles to $60^\\circ$.',
          },
          {
            kind: 'callout',
            tone: 'insight',
            title: 'Why 60° is the only equiangular answer',
            text: 'If all three angles of a triangle are equal, tag 1 splits the budget three equal ways: $180^\\circ \\div 3 = 60^\\circ$. No other value is possible — the equilateral triangle is the angle sum\u2019s most democratic citizen. (The paper-fold test shows the isosceles base-angle fact at a glance: crease an isosceles triangle along the line from apex to base midpoint and the two halves match — but a fold is a demonstration, not a derivation, which is why Euclid\u2019s theorem above is only certified here.)',
          },
          {
            kind: 'table',
            caption: 'The six families, with a verified witness each — the side witnesses pass the triangle inequality (the lesson\u2019s last section), the angle witnesses re-sum to 180 degrees.',
            head: ['Family', 'Defined by', 'Witness', 'Verdict check'],
            rows: [
              ['scalene', 'no two sides equal', 'sides $4$, $5$, $6$', '$4+5 > 6$, all sides distinct'],
              ['isosceles', 'at least two equal sides', 'sides $5$, $5$, $8$', '$5+5 > 8$, the two $5$s equal'],
              ['equilateral', 'all three sides equal', 'sides $6$, $6$, $6$', 'angles forced to $60^\\circ$, $60^\\circ$, $60^\\circ$'],
              ['acute', 'all angles $< 90^\\circ$', '$50^\\circ$, $60^\\circ$, $70^\\circ$', 'sums to $180$; largest $70 < 90$'],
              ['right', 'one angle $= 90^\\circ$', '$30^\\circ$, $60^\\circ$, $90^\\circ$', 'sums to $180$; acute pair $30 + 60 = 90$'],
              ['obtuse', 'one angle $> 90^\\circ$', '$100^\\circ$, $40^\\circ$, $40^\\circ$', 'sums to $180$; largest $100 > 90$'],
            ],
          },
          {
            kind: 'figure',
            caption:
              'The six families as drawn shapes. Top row, by sides: the scalene panel (no tick marks — no two sides claim equality), the isosceles panel (one tick on each of the two equal sides), the equilateral panel (ticks on all three sides; its angles are forced to $60^\\circ$ apiece). Bottom row, by angles: the acute panel ($66^\\circ$, $57^\\circ$, $57^\\circ$ computed from the drawn shape), the right panel (the square corner mark at the bottom-left vertex), the obtuse panel (apex $105^\\circ$, computed). Every measure in this caption was recomputed from the panel coordinates by script before printing.',
            svg: `<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six panels: scalene, isosceles, equilateral triangles with tick marks, then acute, right and obtuse triangles">
  <text x="380" y="22" font-size="12.5" fill="currentColor" text-anchor="middle">six kinds of triangle — by their sides, then by their angles</text>
  <polygon points="115,58 60,158 200,158" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <text x="130" y="182" font-size="12.5" fill="currentColor" text-anchor="middle">scalene — no equal sides</text>
  <polygon points="380,58 310,158 450,158" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <line x1="340.08" y1="104.56" x2="349.92" y2="111.44" stroke="currentColor" stroke-width="1.6"/>
  <line x1="410.08" y1="111.44" x2="419.92" y2="104.56" stroke="currentColor" stroke-width="1.6"/>
  <text x="380" y="182" font-size="12.5" fill="currentColor" text-anchor="middle">isosceles — two equal sides</text>
  <polygon points="630,58 572.265,158 687.735,158" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <line x1="595.94" y1="105" x2="606.33" y2="111" stroke="currentColor" stroke-width="1.6"/>
  <line x1="653.67" y1="111" x2="664.06" y2="105" stroke="currentColor" stroke-width="1.6"/>
  <line x1="630" y1="164" x2="630" y2="152" stroke="currentColor" stroke-width="1.6"/>
  <text x="630" y="182" font-size="12.5" fill="currentColor" text-anchor="middle">equilateral — all sides equal</text>
  <polygon points="130,212 65,312 195,312" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <text x="130" y="332" font-size="12.5" fill="currentColor" text-anchor="middle">acute — all angles under 90°</text>
  <polygon points="310,212 310,312 450,312" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <polyline points="324,312 324,298 310,298" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="380" y="332" font-size="12.5" fill="currentColor" text-anchor="middle">right — one angle exactly 90°</text>
  <polygon points="630,252 552,312 708,312" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <text x="630" y="332" font-size="12.5" fill="currentColor" text-anchor="middle">obtuse — one angle over 90°</text>
</svg>`,
          },
          {
            kind: 'example',
            title: 'An isosceles triangle has apex angle $40^\\circ$. Find its base angles.',
            steps: [
              'Now, the base angles of an isosceles triangle are equal (Euclid I.5, certified above) — name them each $b$.',
              'So the angle sum gives $40 + b + b = 180$, whence $2b = 140$ and $b = 70$.',
              'And the check: $40 + 70 + 70 = 180$ — and $70 = \\frac{180 - 40}{2}$, the formula\u2019s dress.',
              'Hence each base angle is $70^\\circ$.',
            ],
          },
          {
            kind: 'example',
            title: 'A right triangle has one acute angle of $37^\\circ$. Find the other.',
            steps: [
              'Now, the two acute angles of a right triangle are complementary (tag 3).',
              'So the other acute angle measures $90 - 37 = 53^\\circ$.',
              'And the full ledger: $37 + 53 + 90 = 180$ — the angle sum agrees.',
              'Hence the other acute angle is $53^\\circ$.',
            ],
          },
          { kind: 'heading', text: 'Which lengths make a triangle?' },
          {
            kind: 'para',
            text: 'Angles had their property; now lengths ask for theirs. Fix three positive numbers $a$, $b$, $c$ and try to build a triangle whose sides measure them: lay the side $c$ from $A$ to $B$, then hunt for a point $C$ sitting at distance $b$ from $A$ and $a$ from $B$ — the intersection of two circles. The circles either cross twice (one point above the line, its mirror below — two triangles, congruent in fact), touch at exactly one point on the line, or miss each other entirely. The touching case is the revealing one: the “triangle” has collapsed onto the segment $AB$, with $C$ lying *on* it — which forces $c$ to equal $a + b$ (or the corresponding collapse with another side). Collinearity, 8.1\u2019s old test, is exactly the sound of a triangle failing to exist.',
          },
          {
            kind: 'para',
            text: 'Running the two-circle construction over every integer triple from $1$ to $18$ — $5832$ of them — confirms the pattern in both directions: the circles cross at a genuine off-line point precisely when each length is less than the sum of the other two, and touch on the line precisely when one length *equals* the sum of the other two. This is the **triangle inequality**, stated in its three equal dresses:',
          },
          {
            kind: 'list',
            marker: 'roman',
            items: [
              'the three-dress: $a + b > c$, $\\;b + c > a$, and $\\;c + a > b$ — every side less than the other two together;',
              'the largest-side dress: the largest of the three lengths is less than the sum of the other two (the other two inequalities then hold of themselves);',
              'the failed-triangle dress: three lengths make NO triangle exactly when one of them is at least the sum of the other two — with equality giving the degenerate collinear case.',
            ],
          },
          {
            kind: 'callout',
            tone: 'insight',
            title: 'The inequality sees the boundary, not just the inside',
            text: 'The test $a + b > c$ is strict on purpose: at equality the two circles touch on the line and the three points are collinear — a segment, not a triangle. The lesson\u2019s exercise set includes exactly such a triple, $(5, 7, 12)$, so the reflex “$5 + 7 = 12$, equality, therefore NO” gets practised on purpose rather than met by surprise in an examination hall.',
          },
          {
            kind: 'example',
            title: 'Decide whether lengths $4$, $6$, $11$ can form a triangle; then decide $4$, $6$, $9$.',
            steps: [
              'Now, apply the largest-side test: for $(4, 6, 11)$ the largest side is $11$, and $4 + 6 = 10 < 11$.',
              'So the two circles miss each other: no triangle exists — the sum falls short.',
              'And for $(4, 6, 9)$: the largest side is $9$, and $4 + 6 = 10 > 9$; the other two sums ($13 > 6$, $15 > 4$) hold of themselves.',
              'Hence $(4, 6, 11)$: no; $(4, 6, 9)$: yes — one unit of shortfall decides.',
            ],
          },
          {
            kind: 'callout',
            tone: 'insight',
            title: 'From triangles to polygons: Proclus\u2019s corollaries',
            text: 'The angle sum scales. Draw all the diagonals from one vertex of a convex polygon with $n$ sides: they fan the polygon into $n - 2$ triangles, each contributing its $180^\\circ$ — so a quadrilateral carries $2 \\times 180 = 360^\\circ$ of interior angle, a pentagon $3 \\times 180 = 540^\\circ$, and the pattern $(n - 2) \\times 180^\\circ$ continues. Proclus (5th century) recorded this and its companion as corollaries to Euclid I.32: the *exterior* angles of any convex polygon, one per vertex, together make four right angles — $360^\\circ$ — the full turn you make walking around any closed loop. Both await the polygon chapter; the triangle just paid the deposit.',
          },
          {
            kind: 'callout',
            tone: 'exam',
            title: 'Triangles in the examination hall',
            text: 'The angle-sum machinery is a standing question bank. The third-angle engine ($\\angle C = 180^\\circ - \\angle A - \\angle B$) and the ratio-of-angles items (parts of $180^\\circ$) are SSC CGL/CHSL and RRB NTPC staples, usually worded with one twist — a ratio, or “one angle is twice the second”. Isosceles apex/base swaps and right-triangle complement reflexes ($90^\\circ$ minus what you see) recur in banking clerical prelims, where the five-seconds target is the point. Exterior-angle chases — find the unknown from the *outside* of the triangle — appear in both SSC and NTSE banks, rewarding tag 2 over tag 1 for speed. Existence checks (“which of these can be the sides of a triangle?”) are CBSE class-7 favourites and Railway group-D regulars: apply the largest-side dress and answer in one line. No past-paper question is reproduced here; every number above is fresh and script-verified.',
          },
          {
            kind: 'callout',
            tone: 'historical',
            title: 'Two right angles, twenty centuries, and a mountain legend',
            text: 'The angle sum is Proposition I.32 of Euclid\u2019s *Elements* (c. 300 BCE), and its statement is a two-for-one: “In any triangle, if one of the sides is produced, then the exterior angle equals the sum of the two interior and opposite angles, and the sum of the three interior angles of the triangle equals two right angles.” Euclid\u2019s proof is the one this lesson ran — he draws the parallel through the *other* end (through $C$, by his I.31), quotes equal alternate angles (his I.29), and closes with the two-right-angles-on-a-line (his I.13): the very tools 8.2 and 8.3 spent two lessons forging. The isosceles theorem behind Illustration 4 is his I.5, the *pons asinorum*, nicknamed for its shaggy-looking diagram and the crowd of students it allegedly weeded out. And the angle sum carries the chapter\u2019s deepest honesty: it is *equivalent* to the parallel postulate. Loosen Postulate 5 and the sum bends — on a sphere, the triangle formed by the north pole and two quarter-arcs of the equator has three right angles inside it, $270^\\circ$ in all (computed on the unit sphere for this lesson); in Lobachevsky\u2019s hyperbolic plane every triangle sums to *less* than $180^\\circ$, the shortfall growing with the triangle\u2019s area. The $180^\\circ$ is not a universal law of nature — it is the flat plane\u2019s signature, purchased with the parallel axiom. A famous story credits Gauss with measuring the great triangle between the mountain peaks Brocken, Hohehagen and Inselsberg to test whether space itself is Euclidean; the triangle really was measured, in his Hanover survey of $1818$–$1832$, but his biographer Buhler calls the space-testing motive a legend — the survey was cartography, not cosmology. The truth is anyway the prettier half: the geometry was settled not on mountains but on paper, by daring to *drop* the axiom.',
          },
          {
            kind: 'terms',
            items: [
              {
                term: 'Triangle',
                def: 'The figure formed by three points not on one line (its vertices) together with the three joining segments (its sides) and the region they enclose; written $\\triangle ABC$.',
              },
              {
                term: 'Interior angle',
                def: 'The angle of a triangle at one of its vertices, opening into the region the sides enclose; the three of them total $180^\\circ$ (the angle sum property).',
              },
              {
                term: 'Exterior angle',
                def: 'The angle a side of a triangle makes with a neighbouring side produced; the linear-pair mate of the adjacent interior angle, equal to the sum of the two remote interior angles.',
              },
              {
                term: 'Angle sum property',
                def: 'The theorem that the three interior angles of any triangle total $180^\\circ$; derived from the straight angle and the alternate-interior theorem via the parallel through one vertex.',
              },
              {
                term: 'Exterior angle property',
                def: 'The theorem that an exterior angle of a triangle equals the sum of the two remote interior angles, and so is greater than either alone.',
              },
              {
                term: 'Scalene triangle',
                def: 'A triangle with no two equal sides.',
              },
              {
                term: 'Isosceles triangle',
                def: 'A triangle with at least two equal sides; the angles opposite the equal sides (the base angles) are equal (Euclid I.5).',
              },
              {
                term: 'Equilateral triangle',
                def: 'A triangle with all three sides equal — a special isosceles triangle; all three angles are forced to $60^\\circ$.',
              },
              {
                term: 'Acute triangle',
                def: 'A triangle all three of whose angles are acute.',
              },
              {
                term: 'Right triangle',
                def: 'A triangle with one right angle; its two acute angles are complementary ($\\angle A + \\angle B = 90^\\circ$).',
              },
              {
                term: 'Obtuse triangle',
                def: 'A triangle with one obtuse angle; no triangle can hold two right angles or two obtuse ones, since two such angles already exhaust the $180^\\circ$ budget.',
              },
              {
                term: 'Triangle inequality',
                def: 'The existence test for lengths: three lengths form a triangle exactly when each is less than the sum of the other two — equivalently, when the largest is less than the sum of the other two. Equality gives the degenerate collinear case.',
              },
            ],
          },
          {
            kind: 'quiz',
            title: 'Check yourself',
            items: [
              {
                q: 'Two angles of a triangle measure $74^\\circ$ and $31^\\circ$. The third measures —',
                options: ['$65^\\circ$', '$75^\\circ$', '$95^\\circ$', '$85^\\circ$'],
                answer: 1,
                explain: '$180 - 74 - 31 = 75^\\circ$. The traps: $65^\\circ$ subtracts from $139$ by a slip ($180 - 74 - 41$), $95^\\circ$ adds instead of subtracts ($74 + 31 = 105 \\ne 95$-related), and $85^\\circ$ is the complement reflex $180 - 95$ doing someone else\u2019s problem.',
              },
              {
                q: 'The angles of a triangle stand in the ratio $3 : 4 : 5$. The largest measures —',
                options: ['$45^\\circ$', '$60^\\circ$', '$75^\\circ$', '$90^\\circ$'],
                answer: 2,
                explain: 'Twelve parts share $180^\\circ$, so one part is $15^\\circ$ and the largest is $5 \\times 15 = 75^\\circ$ (the angles are $45^\\circ$, $60^\\circ$, $75^\\circ$). The trap $90^\\circ$ is the reflex answer for the “3-4-5 triangle” — but that famous $3$-$4$-$5$ shape is about SIDE lengths with a right angle; for ANGLES in ratio $3:4:5$ the triangle is acute.',
              },
              {
                q: 'An exterior angle of a triangle equals —',
                options: ['its adjacent interior angle', 'the sum of the two remote interior angles', 'half the sum of all three interior angles', '$90^\\circ$ always'],
                answer: 1,
                explain: 'The exterior angle property (tag 2): exterior = sum of the two remote interiors, which is also why it exceeds each of them. It equals $180^\\circ$ minus the ADJACENT interior angle — so option (a) gets the wrong partner, and (c) and (d) have no theorem at all behind them.',
              },
              {
                q: 'An isosceles triangle has apex angle $100^\\circ$. Each base angle measures —',
                options: ['$30^\\circ$', '$40^\\circ$', '$50^\\circ$', '$80^\\circ$'],
                answer: 1,
                explain: 'The base angles are equal, so $2b = 180 - 100 = 80$ and $b = 40^\\circ$. The trap $80^\\circ$ is the SUM of the two base angles (one of them, not both); $50^\\circ$ halves $100$ instead of subtracting it.',
              },
              {
                q: 'Which of these CANNOT be the sides of a triangle?',
                options: ['$3$, $4$, $5$', '$2$, $2$, $3$', '$4$, $5$, $10$', '$6$, $8$, $10$'],
                answer: 2,
                explain: 'The largest-side test: $4 + 5 = 9 < 10$, so the circles miss and no triangle exists. The others all pass: $3 + 4 > 5$, $2 + 2 > 3$, $6 + 8 > 10$. (The $4$-$5$-$10$ trap is set for readers who check only ONE sum — all three dresses must hold, or just use the largest side.)',
              },
            ],
          },
          {
            kind: 'exercises',
            title: 'Exercises 8.4',
            sets: [
              {
                level: 'L1',
                questions: [
                  {
                    q: 'Two angles of a triangle measure $71^\\circ$ and $52^\\circ$. Find the third angle.',
                    solution: [
                      'Now, the angle sum property: the three interior angles total $180^\\circ$.',
                      'So the third angle measures $180 - 71 - 52 = 57^\\circ$.',
                      'And the check: $71 + 52 + 57 = 180$ — the ledger closes.',
                      'Hence the third angle is $57^\\circ$.',
                    ],
                    answer: '$57^\\circ$',
                  },
                  {
                    q: 'A right triangle has one acute angle of $28^\\circ$. Find the other acute angle.',
                    solution: [
                      'Now, tag 3: the two acute angles of a right triangle are complementary.',
                      'So the other acute angle measures $90 - 28 = 62^\\circ$.',
                      'And the check: $28 + 62 = 90$ and $28 + 62 + 90 = 180$.',
                      'Hence $62^\\circ$.',
                    ],
                    answer: '$62^\\circ$',
                  },
                ],
              },
              {
                level: 'L2',
                questions: [
                  {
                    q: 'The angles of a triangle stand in the ratio $3 : 5 : 7$. Find all three and name the family.',
                    solution: [
                      'Now, name them $3x$, $5x$, $7x$: the angle sum gives $15x = 180$, so $x = 12$.',
                      'So the angles are $36^\\circ$, $60^\\circ$, $84^\\circ$ — check: $36 + 60 + 84 = 180$.',
                      'And the family: the largest is $84 < 90$ and no angle is right or obtuse — the triangle is acute.',
                      'Hence $36^\\circ$, $60^\\circ$, $84^\\circ$; an acute triangle.',
                    ],
                    answer: '$36^\\circ$, $60^\\circ$, $84^\\circ$; acute',
                  },
                  {
                    q: 'An exterior angle at $B$ of a triangle measures $134^\\circ$, and a remote interior angle at $A$ measures $41^\\circ$. Find the interior angles.',
                    solution: [
                      'Now, the exterior angle property at $B$: the other remote interior angle (at $C$) measures $134 - 41 = 93^\\circ$.',
                      'So the adjacent interior angle is the linear-pair mate: $\\angle B = 180 - 134 = 46^\\circ$.',
                      'And the angle sum re-checks the set: $41 + 46 + 93 = 180$ — and $41 + 93 = 134$, the given exterior.',
                      'Hence the interior angles are $41^\\circ$, $46^\\circ$, $93^\\circ$.',
                    ],
                    answer: '$41^\\circ$, $46^\\circ$, $93^\\circ$',
                  },
                ],
              },
              {
                level: 'L3',
                questions: [
                  {
                    q: 'An isosceles triangle has apex angle $76^\\circ$. Find its base angles.',
                    solution: [
                      'Now, the base angles are equal (Euclid I.5): name them each $b$.',
                      'So $76 + 2b = 180$, giving $2b = 104$ and $b = 52$.',
                      'And the check: $76 + 52 + 52 = 180$.',
                      'Hence each base angle is $52^\\circ$.',
                    ],
                    answer: '$52^\\circ$ each',
                  },
                  {
                    q: 'An isosceles triangle has base angles of $55^\\circ$ each. Find its apex angle.',
                    solution: [
                      'Now, the angle sum with the two equal bases: $55 + 55 + a = 180$.',
                      'So the apex angle $a = 180 - 110 = 70^\\circ$.',
                      'And the check: $70 = 180 - 2 \\times 55$ — the apex/base swap of the isosceles formula.',
                      'Hence the apex angle is $70^\\circ$.',
                    ],
                    answer: '$70^\\circ$',
                  },
                  {
                    q: 'The angles of a triangle measure $x^\\circ$, $2x^\\circ$ and $3x^\\circ$. Find $x$ and all three angles, and name the family.',
                    solution: [
                      'Now, the angle sum: $x + 2x + 3x = 180$, giving $6x = 180$ and $x = 30$.',
                      'So the angles are $30^\\circ$, $60^\\circ$, $90^\\circ$.',
                      'And the family: one angle is exactly $90^\\circ$ — a right triangle, and indeed the acute pair $30 + 60 = 90$ is complementary (tag 3 agrees).',
                      'Hence $x = 30$; the angles $30^\\circ$, $60^\\circ$, $90^\\circ$ — right, with the $3x$ angle the right one.',
                    ],
                    answer: '$x = 30$; $30^\\circ$, $60^\\circ$, $90^\\circ$; right',
                  },
                ],
              },
              {
                level: 'L4',
                questions: [
                  {
                    q: 'Decide whether lengths $5$, $7$, $12$ can form a triangle; then decide $5$, $7$, $11$.',
                    solution: [
                      'Now, $(5, 7, 12)$: the largest side is $12$ and $5 + 7 = 12$ — equality, not strictness.',
                      'So the two circles touch on the line: the three points would be collinear (8.1\u2019s test), a segment and not a triangle. NO.',
                      'And $(5, 7, 11)$: $5 + 7 = 12 > 11$, and the other sums ($16 > 7$, $18 > 5$) hold of themselves.',
                      'Hence $(5, 7, 12)$: no (degenerate); $(5, 7, 11)$: yes.',
                    ],
                    answer: '$(5,7,12)$ no; $(5,7,11)$ yes',
                  },
                  {
                    q: 'In a triangle, an exterior angle measures $(2x + 20)^\\circ$ and the two remote interior angles measure $x^\\circ$ and $50^\\circ$. Find $x$, the exterior angle, and the third interior angle.',
                    solution: [
                      'Now, the exterior angle property reads as an equation: $2x + 20 = x + 50$.',
                      'So $x = 30$, and the exterior angle measures $2 \\times 30 + 20 = 80^\\circ$ — check: $30 + 50 = 80$, the remote sum.',
                      'And the adjacent interior angle is the linear-pair mate: $180 - 80 = 100^\\circ$.',
                      'Hence $x = 30$; the exterior angle $80^\\circ$; the remaining interior angle $100^\\circ$ (the triangle is obtuse).',
                    ],
                    answer: '$x = 30$; exterior $80^\\circ$; third interior $100^\\circ$',
                  },
                ],
              },
              {
                level: 'L5',
                questions: [
                  {
                    q: 'One angle of a triangle is twice the second, and the third is $20^\\circ$ more than the second. Find all three.',
                    solution: [
                      'Now, name the second angle $x$: the angles are $2x$, $x$ and $x + 20$.',
                      'So the angle sum: $2x + x + x + 20 = 180$, giving $4x = 160$ and $x = 40$.',
                      'And the angles are $80^\\circ$, $40^\\circ$, $60^\\circ$ — check: $80 + 40 + 60 = 180$, and the relations hold ($80 = 2 \\times 40$, $60 = 40 + 20$).',
                      'Hence $80^\\circ$, $40^\\circ$, $60^\\circ$ — an acute triangle (largest $80 < 90$).',
                    ],
                    answer: '$80^\\circ$, $40^\\circ$, $60^\\circ$',
                  },
                  {
                    q: 'In a right triangle the two acute angles stand in the ratio $2 : 3$. Find both acute angles.',
                    solution: [
                      'Now, tag 3 says the acute pair shares $90^\\circ$: name them $2x$ and $3x$, so $2x + 3x = 90$.',
                      'So $5x = 90$ and $x = 18$: the acute angles are $36^\\circ$ and $54^\\circ$.',
                      'And the checks: $36 + 54 = 90$, the ratio $36 : 54 = 2 : 3$ holds, and the full sum $36 + 54 + 90 = 180$.',
                      'Hence $36^\\circ$ and $54^\\circ$.',
                    ],
                    answer: '$36^\\circ$ and $54^\\circ$',
                  },
                ],
              },
              {
                level: 'L6',
                questions: [
                  {
                    q: 'Prove the exterior angle property — when any side of $\\triangle ABC$ is produced past $C$ to $D$, the exterior angle $\\angle ACD$ equals $\\angle A + \\angle B$ — quoting every theorem used.',
                    solution: [
                      'Now, the produced line $BD$ runs straight through $C$, so $\\angle ACD$ and the interior $\\angle ACB$ form a linear pair: $\\angle ACD + \\angle ACB = 180^\\circ$ (8.2\u2019s linear-pair law).',
                      'So the angle sum property (tag 1) rearranges to $\\angle ACB = 180^\\circ - \\angle A - \\angle B$: the interior angle is what the two remote angles leave of the budget.',
                      'And substitute: $\\angle ACD = 180^\\circ - (180^\\circ - \\angle A - \\angle B) = \\angle A + \\angle B$ — the two straight angles cancel, and the exterior angle is the remote sum.',
                      'Hence $\\angle ACD = \\angle A + \\angle B$; and since each remote angle is a positive part of the sum, $\\angle ACD > \\angle A$ and $\\angle ACD > \\angle B$ — Euclid I.16\u2019s inequality rides free.',
                    ],
                    answer: '$\\angle ACD = 180^\\circ - \\angle ACB$ (linear pair) $= 180^\\circ - (180^\\circ - \\angle A - \\angle B)$ (tag 1) $= \\angle A + \\angle B$',
                  },
                  {
                    q: 'An isosceles triangle has apex angle $40^\\circ$ at $A$, with the side $BC$ produced past $C$ to $D$. Find the exterior angle at $C$ twice — once by the exterior angle property, once by the linear pair — and reconcile the two answers.',
                    solution: [
                      'Now, the isosceles base angles: each is $\\frac{180 - 40}{2} = 70^\\circ$ (Euclid I.5, certified in the lesson).',
                      'So route one, the exterior angle property: $\\angle ACD = \\angle A + \\angle B = 40 + 70 = 110^\\circ$.',
                      'And route two, the linear pair: the adjacent interior is $\\angle ACB = 70^\\circ$, so $\\angle ACD = 180 - 70 = 110^\\circ$.',
                      'Hence both routes return $110^\\circ$ — they must agree, because tag 2 was DERIVED from tag 1 plus the very linear pair used here; the two answers are one answer wearing two dresses.',
                    ],
                    answer: '$110^\\circ$ by both routes (exterior sum $40 + 70$; linear pair $180 - 70$)',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'fm-perimeter-and-area-rectangles-triangles-circles',
        number: '8.5',
        title: 'Perimeter and Area of Rectangles, Triangles and Circles',
        concepts: [
          'Perimeter as the walk around',
          'Area as the fill inside',
          'The unit square',
          'P = 2(l + b), A = l × b',
          'A = ½ × base × height',
          'Circumference C = 2πr',
          'Area of the circle πr²',
          'Hectares and unit conversion',
        ],
        objectives: [
          'Define perimeter and area honestly — the walk around a figure and the fill inside it — and keep the two questions (and their units) apart for life',
          'Derive the rectangle laws P = 2(l + b) and A = l × b from the walk and the tiling, and prove that a fixed perimeter never fixes an area (the square sweeps the board)',
          'Derive the triangle formula A = ½ × base × height from the rectangle — two copies tile the box, and the altitude split cancels — and choose base-height dresses safely',
          'Define π as the constant ratio C/d, derive C = 2πr and A = πr² (the sector rearrangement), and compute with both working values 22/7 and 3.14 at known accuracy',
          'Convert area units by rescaling the tile (1 m² = 10⁴ cm², 1 hectare = 10⁴ m²) and dissect composite figures into the three measured shapes',
        ],
        prerequisites: ['fm-triangles-and-the-angle-sum', 'fm-angles-and-their-measurement'],
        sources: ['ncert-math6-gp-ch6', 'ncert-math7-ch11', 'khattar-qa-4e'],
        blocks: [
          {
            kind: 'para',
            text: 'Four lessons built the instruments; this one puts them to work. From 8.1 we own the segment and its length; from 8.2, the right angle and the degree ledger; from 8.3, the parallels; from 8.4, the triangle and its angle sum. Not one of those lessons asked the two questions that pay for the whole chapter: *how far is the walk around a figure?* and *how much surface does the figure enclose?* The first is **perimeter**, the second is **area** — and although they are asked about the same shape at the same time, they are different questions with different answers, different units and different frauds. This lesson derives the walk and the fill for the three figures that run the world\u2019s fences, floors and wheels: the rectangle, the triangle and the circle.',
          },
          {
            kind: 'para',
            text: 'The method is the chapter\u2019s method, one last time. Each formula is *derived*, not asserted: the perimeter of the rectangle from the walk itself, the area of the rectangle from counting tiles, the area of the triangle from the rectangle, the circumference and area of the circle from the single number that measures roundness. Every derivation spends only tools already earned, and every number that appears below was recomputed by script before it was written here. Two Caution boxes guard the classic frauds — the perimeter\u2013area mix-up and the square-unit conversion trap — and the closing historical note tells the story of \u03c0, the only new number this lesson must introduce.',
          },
          { kind: 'heading', text: 'Perimeter — the walk around' },
          {
            kind: 'para',
            text: 'The word is Greek in plain sight: *peri*, around, plus *metron*, measure — the measure around. Take any closed figure and walk along its boundary, one full circuit, ending where you began. The distance walked is the figure\u2019s perimeter. Because a walk is a length, perimeter is measured in units of length: centimetres, metres, kilometres. No square units appear in this half of the lesson — that is the first discipline.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'Perimeter',
            text: 'A closed figure is said to have **perimeter** equal to the total length of its boundary — the distance covered by one complete walk along the boundary, starting and ending at the same point. For a **polygon** (a figure whose boundary is a collection of segments, 8.1\u2019s dress), the perimeter is the sum of all its sides. Thus, for a polygon with sides of lengths $s_1, s_2, \\ldots, s_n$, the perimeter is $P = s_1 + s_2 + \\cdots + s_n$; and when the polygon is **regular** — all sides equal, 8.4\u2019s equilateral idea in the general dress — this collapses to $P = n \\times s$, where $s$ is the common side length.',
          },
          {
            kind: 'para',
            text: 'For example, the perimeters fall out as plain sums:',
          },
          {
            kind: 'list',
            marker: 'roman',
            items: [
              'the 3-4-5 right triangle of 8.4 walks $3 + 4 + 5 = 12$ units — and the chapter\u2019s witness triangle $A(0,0)$, $B(4,0)$, $C(0,3)$ walks the same total, $4 + 3 + 5 = 12$;',
              'a rectangle of $8$ by $5$ walks $8 + 5 + 8 + 5 = 26$;',
              'a square of side $7$ walks $7 + 7 + 7 + 7 = 28$;',
              'a regular pentagon of side $6$ walks $5 \\times 6 = 30$ — the regular-polygon shortcut $n \\times s$ at work.',
            ],
          },
          {
            kind: 'para',
            text: 'The rectangle earns a formula because its walk has a pattern: the four sides are two lengths and two breadths. The derivation is one line of bookkeeping, but it is worth watching once, formally.',
          },
          {
            kind: 'derivation',
            title: 'The perimeter of a rectangle',
            statement: 'A rectangle has length $l$ and breadth $b$. Walking the boundary crosses $l$, then $b$, then $l$ again, then $b$ again.',
            steps: [
              {
                label: 'Walk the boundary',
                formula: 'P = l + b + l + b',
                explanation: 'One full circuit crosses each of the four sides exactly once; opposite sides of a rectangle are equal (the two pairs forced by the right angles and the closed figure).',
              },
              {
                label: 'Collect the pairs',
                formula: 'P = (l + l) + (b + b) = 2l + 2b',
                explanation: 'The two lengths contribute $2l$, the two breadths $2b$.',
              },
              {
                label: 'Factor the common 2',
                formula: 'P = 2(l + b)',
                explanation: 'Distributivity — chapter 2\u2019s law — reads the walk in its compact dress: twice the half-walk.',
              },
            ],
            result: 'The perimeter of a rectangle is $P = 2(l + b)$; the square is the special case $l = b$, giving $P = 4a$. The half-walk $l + b$ is worth naming too: given a perimeter, the sum $l + b$ is what any formula or equation will actually handle.',
          },
          {
            kind: 'equation',
            latex: 'P_{\\text{rect}} = 2(l + b), \\qquad P_{\\text{square}} = 4a',
            note: 'Tag 1. Script-verified against the literal walk $l + b + l + b$ for every $l, b$ from 1 to 60, and the square case for every side from 1 to 100.',
          },
          {
            kind: 'para',
            text: 'For example, the 8-by-5 rectangle has half-walk $8 + 5 = 13$, so $P = 2 \\times 13 = 26$ — quoting $13$ metres of fence for a $26$-metre walk leaves two sides open, a fraud worth a Caution below. Illustration 1 runs the full cost computation the exam papers love.',
          },
          {
            kind: 'example',
            title: 'A rectangular garden measures $24$ m by $17$ m. Find the length of fence that encloses it, and the cost of fencing at Rs $15$ per metre.',
            steps: [
              'Now, the fence runs once along the boundary, so its length is the perimeter of the $24 \\times 17$ rectangle.',
              'So the half-walk is $24 + 17 = 41$ m, and the perimeter is $2 \\times 41 = 82$ m.',
              'And the cost is the walk priced per metre: $82 \\times 15 = 1230$, that is, Rs $1{,}230$.',
              'Hence the fence is $82$ m long and costs Rs $1{,}230$.',
            ],
          },
          { kind: 'heading', text: 'Fixed perimeter, wandering area' },
          {
            kind: 'para',
            text: 'Here is the question that separates the careful from the careless at every examination: *if two figures have the same perimeter, must they have the same area?* The answer is no — and seeing how violently no it is, is the whole education. Fix the perimeter at $36$ and list every rectangle with whole-number sides. The half-walk must be $18$, so the length-breadth pairs run from $(17, 1)$ up to $(9, 9)$, and the areas wander wildly:',
          },
          {
            kind: 'table',
            caption: 'Nine rectangles, one perimeter (36), nine different areas — the area grows as the rectangle squares off.',
            head: ['length × breadth', 'half-walk check', 'perimeter check', 'area'],
            rows: [
              ['$17 \\times 1$', '18', '$2(18) = 36$', '17'],
              ['$16 \\times 2$', '18', '$2(18) = 36$', '32'],
              ['$15 \\times 3$', '18', '$2(18) = 36$', '45'],
              ['$14 \\times 4$', '18', '$2(18) = 36$', '56'],
              ['$13 \\times 5$', '18', '$2(18) = 36$', '65'],
              ['$12 \\times 6$', '18', '$2(18) = 36$', '72'],
              ['$11 \\times 7$', '18', '$2(18) = 36$', '77'],
              ['$10 \\times 8$', '18', '$2(18) = 36$', '80'],
              ['$9 \\times 9$', '18', '$2(18) = 36$', '81'],
            ],
          },
          {
            kind: 'callout',
            tone: 'insight',
            title: 'Note — the square wins',
            text: 'Reading the table from top to bottom, the area climbs without exception as the shape squares off, and the square $9 \\times 9$ takes the largest share, $81$. The pattern is a theorem in miniature: **among all rectangles with a given perimeter, the square encloses the greatest area.** The script swept every even perimeter from 4 to 200 and the champion was always the balanced rectangle $\\frac{P}{4} \\times \\frac{P}{4}$ (or, when $\\frac{P}{4}$ is not a whole number, the nearest balanced pair). The mirror theorem holds for a fixed area: the $6 \\times 6$ square of area 36 has the *shortest* walk ($24$) among the whole-number rectangles of that area, from $36 \\times 1$ (walk 74) down. Balanced shapes are frugal with boundary.',
          },
          {
            kind: 'callout',
            tone: 'warn',
            title: 'Caution — perimeter never fixes area',
            text: 'The strip $17 \\times 1$ and the square $9 \\times 9$ have the *same* perimeter, 36 — and their areas differ by $81 - 17 = 64$, nearly a factor of five. Perimeter measures the walk; area measures the fill; no walk length alone decides a fill. Every examination question of the form \u201cthe perimeter is \u2026, find the area\u201d must carry extra information (a ratio of sides, a difference, a \u201cit is a square\u201d) — if it does not, the question is underdetermined and the answer is *cannot be decided*.',
          },
          { kind: 'heading', text: 'Area — the fill inside' },
          {
            kind: 'para',
            text: 'Perimeter ignored everything the boundary encloses; area is the enclosure itself — the amount of flat surface the figure covers. To *measure* a surface the way a mason measures a floor, an agreement is needed first: a unit of fill. The natural choice is the **unit square**, a square of side $1$ cm carrying area $1$ cm$^2$ (read: *one square centimetre*). The area of any figure is then the number of unit squares that tile it — counting squares is the whole idea, and every area formula in this lesson is a shortcut for that count.',
          },
          {
            kind: 'callout',
            tone: 'definition',
            title: 'Area and the unit square',
            text: 'A figure is said to have **area** equal to the number of unit squares needed to cover it exactly, with no gaps and no overlaps. The unit square of side $1$ cm has area $1$ cm$^2$; in metres the unit square has area $1$ m$^2$; the unit is always a *square of the length unit* — that is why area units wear the exponent. Thus, area answers the question *how much surface?* exactly as perimeter answers *how far around?*.',
          },
          {
            kind: 'para',
            text: 'The rectangle, tiled, tells its own area. A rectangle $l$ cm long and $b$ cm wide accepts one row of $l$ unit squares along its top edge, and the rows stack: $b$ rows of $l$ squares each. The count is multiplication — chapter 2\u2019s repeated addition in its oldest dress.',
          },
          {
            kind: 'derivation',
            title: 'The area of a rectangle',
            statement: 'A rectangle has integer length $l$ and breadth $b$ (in centimetres, say); the unit square is $1$ cm $\\times$ $1$ cm.',
            steps: [
              {
                label: 'Lay one row',
                formula: 'l \\text{ unit squares fit along the length}',
                explanation: 'The squares sit edge to edge with no gaps: their sides of $1$ cm chain exactly $l$ times to match the side of $l$ cm.',
              },
              {
                label: 'Stack the rows',
                formula: 'b \\text{ rows, each of } l \\text{ squares}',
                explanation: 'The same chaining runs vertically: $b$ rows fill the breadth exactly.',
              },
              {
                label: 'Count the squares',
                formula: 'A = b \\times l = l \\times b',
                explanation: 'Chapter 2\u2019s commutativity: rows-of-columns or columns-of-rows, the count is the product.',
              },
            ],
            result: 'The area of a rectangle is $A = l \\times b$; the square is the case $l = b$, giving $A = a^2$ — literally \u201c$a$ squared\u201d, the name of the operation taken from this very picture. The formula holds for fractional sides too, by measuring in smaller tiles: a $\\frac{1}{2}$-cm-by-$\\frac{1}{2}$-cm square fills the same rectangle four to a square centimetre, and the same product reappears.',
          },
          {
            kind: 'equation',
            latex: 'A_{\\text{rect}} = l \\times b, \\qquad A_{\\text{square}} = a^2',
            note: 'Tag 2. Script-verified by brute-force cell enumeration against the product for every $l, b$ from 1 to 40.',
          },
          {
            kind: 'figure',
            caption:
              'A $5$ cm $\\times$ $3$ cm rectangle tiled by its $15$ unit squares: $5$ columns of $3$ rows, so $A = 5 \\times 3 = 15$ cm$^2$. The diagonal cuts the rectangle into two copies of the same triangle — each carrying $\\frac{1}{2} \\times 5 \\times 3 = 7\\frac{1}{2}$ cm$^2$, which is the two-copy engine of the triangle formula below.',
            svg: `<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 5 by 3 rectangle tiled with unit squares and cut by its diagonal into two equal triangles">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the rectangle tiled by unit squares — and the diagonal that halves it</text>
  <polygon points="170,60 590,60 590,270" fill="currentColor" opacity="0.06"/>
  <polygon points="170,60 590,270 170,270" fill="currentColor" opacity="0.12"/>
  <line x1="254" y1="60" x2="254" y2="270" stroke="currentColor" stroke-width="1"/>
  <line x1="338" y1="60" x2="338" y2="270" stroke="currentColor" stroke-width="1"/>
  <line x1="422" y1="60" x2="422" y2="270" stroke="currentColor" stroke-width="1"/>
  <line x1="506" y1="60" x2="506" y2="270" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="130" x2="590" y2="130" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="200" x2="590" y2="200" stroke="currentColor" stroke-width="1"/>
  <rect x="170" y="60" width="420" height="210" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <line x1="170" y1="60" x2="590" y2="270" stroke="currentColor" stroke-width="1.8"/>
  <text x="380" y="44" font-size="13" fill="currentColor" text-anchor="middle">l = 5 cm</text>
  <text x="600" y="172" font-size="13" fill="currentColor" text-anchor="start">b = 3 cm</text>
  <text x="380" y="242" font-size="12.5" fill="currentColor" text-anchor="middle">1 cm²</text>
  <text x="380" y="296" font-size="12.5" fill="currentColor" text-anchor="middle">the diagonal halves it — each piece is ½ × 5 × 3</text>
</svg>`,
          },
          {
            kind: 'para',
            text: 'For example, a sheet $12$ cm by $8$ cm holds $96$ unit squares; a square of side $7$ holds $7 \\times 7 = 49$. Illustration 2 tiles a floor for real.',
          },
          {
            kind: 'example',
            title: 'A floor measures $5$ m by $4$ m. How many square tiles of side $50$ cm are needed to cover it?',
            steps: [
              'Now, the tiles and the floor must be measured in the same unit: $5$ m $= 500$ cm and $4$ m $= 400$ cm.',
              'So along the length, $500 \\div 50 = 10$ tiles fit; along the breadth, $400 \\div 50 = 8$ tiles fit.',
              'And the count is $10 \\times 8 = 80$ tiles.',
              'Hence the check by area: the floor is $5 \\times 4 = 20$ m$^2$ $= 2{,}00{,}000$ cm$^2$; one tile is $50 \\times 50 = 2{,}500$ cm$^2$; and $2{,}00{,}000 \\div 2{,}500 = 80$ — the same answer, as it must be.',
            ],
          },
          { kind: 'heading', text: 'Units of area — the tile itself rescales' },
          {
            kind: 'para',
            text: 'Length units convert by multiplying the *side*: $1$ m $= 100$ cm. Area units convert by rescaling the *tile*, and the tile has two sides — that is the entire trap of this section. One square metre is a square of side $100$ cm, so it holds',
          },
          {
            kind: 'equation',
            latex: '1\\ \\text{m}^2 = 100\\ \\text{cm} \\times 100\\ \\text{cm} = 10{,}000\\ \\text{cm}^2',
            note: 'The conversion factor is squared because the unit is: each dimension contributes its own factor of 100. The ladder continues on both rungs: $1$ cm$^2 = 10 \\times 10 = 100$ mm$^2$, and $1$ km$^2 = 1{,}000 \\times 1{,}000 = 10^6$ m$^2$.',
          },
          {
            kind: 'callout',
            tone: 'warn',
            title: 'Caution — the ×100 reflex',
            text: 'Converting $5$ m$^2$ to square centimetres, the reflex answers $5 \\times 100 = 500$ cm$^2$ — and it is wrong, because the reflex converted the *side* of the tile, not the tile. The tile rescales on both edges: $5$ m$^2 = 5 \\times 10{,}000 = 50{,}000$ cm$^2$. The unit test catches the fraud instantly: a hundred square centimetres is a strip $100$ cm by $1$ cm — it does not fill a square metre, which wants a hundred strips of a hundred.',
          },
          {
            kind: 'para',
            text: 'For land, one more agreement is in force: the **hectare**, a square $100$ m on a side, so $1$ hectare $= 100 \\times 100 = 10{,}000$ m$^2$. For example, a field $200$ m by $150$ m covers $200 \\times 150 = 30{,}000$ m$^2 = 3$ hectares. (Units as agreements — why the metre, the hectare and their kin were chosen and how they convert without memorised tables — is the charter of the next chapter; this lesson needs only the square-tile picture.)',
          },
          { kind: 'heading', text: 'The triangle\u2019s area — half the box' },
          {
            kind: 'para',
            text: 'The triangle has no rows of tiles — its slanted sides defeat square counting. But the rectangle is already paid for, and the triangle is half a rectangle in a precise, provable sense. Take a **right triangle** with legs $p$ and $q$. Two copies of it fit together into the $p \\times q$ rectangle: turn the second copy upside down (a half-turn about the midpoint of the hypotenuse) and the hypotenuses mate along the diagonal, leaving the two of them tiling the whole rectangle with no gap and no overlap. Each copy therefore carries exactly half the rectangle\u2019s area: $\\frac{1}{2} p q$. That is $\\frac{1}{2} \\times$ base $\\times$ height for the right triangle — the legs were the base and the height all along.',
          },
          {
            kind: 'para',
            text: 'Every triangle joins them: draw the **height** (also called the **altitude**) — the perpendicular from the apex to the base line, the foot dropping at exactly $90^\\circ$ (8.2\u2019s right angle doing surveying work). The altitude cuts the triangle into two right triangles, one on each side of the foot; each carries half of its own little rectangle, and the whole story is one cancellation:',
          },
          {
            kind: 'derivation',
            title: 'The area of any triangle',
            statement: 'A triangle has a base of length $b$; the perpendicular from the opposite vertex (the apex) to the base line has length $h$; its foot may fall inside the base, at any point, or even outside it.',
            steps: [
              {
                label: 'Drop the altitude',
                formula: '\\text{two right triangles, of heights } h \\text{ each}',
                explanation: 'The perpendicular splits the base at the foot; call the two pieces of the base $x$ and $b - x$ (if the foot falls outside, one piece reads negative and the cancellation below survives unchanged — the script swept that case too).',
              },
              {
                label: 'Half of each little box',
                formula: 'A = \\tfrac{1}{2} x h + \\tfrac{1}{2} (b - x) h',
                explanation: 'Each right triangle is half of its leg-rectangle by the two-copy argument; the two leg-rectangles share the height $h$.',
              },
              {
                label: 'Factor and cancel',
                formula: 'A = \\tfrac{1}{2} h \\, (x + b - x) = \\tfrac{1}{2} h \\, b',
                explanation: 'The split point $x$ cancels — WHERE the foot lands never matters; only the base and the height survive.',
              },
            ],
            result: 'The area of a triangle is $A = \\frac{1}{2} \\times$ base $\\times$ height, for every triangle and every choice of base — the script certified the shoelace-measured area of 500 pseudo-random triangles against $\\frac{1}{2} b h$ within a billionth, apex outside the base included.',
          },
          {
            kind: 'equation',
            latex: 'A_{\\text{tri}} = \\tfrac{1}{2} \\times b \\times h',
            note: 'Tag 3, with $h$ the perpendicular height to the chosen base — and every one of the three sides may serve as the base, each with its own height, all answers agreeing (Illustration 3).',
          },
          {
            kind: 'callout',
            tone: 'warn',
            title: 'Caution — the height must be perpendicular',
            text: 'In the 3-4-5 right triangle, taking base $4$ and a so-called height of $5$ (the hypotenuse leaning nearby) gives $\\frac{1}{2} \\times 4 \\times 5 = 10$ — but the true area is $6$. The slanted side is not a height; the height for base $4$ is the perpendicular leg $3$. Measured *along* the slant is the classic wrong answer: the formula counts only the perpendicular distance, the shortest drop from apex to base line.',
          },
          {
            kind: 'example',
            title: 'One triangle, three ways: the right triangle with legs $3$ and $4$ and hypotenuse $5$. Compute its area from each side as base.',
            steps: [
              'Now, base $3$ (a leg): the height is the perpendicular other leg $4$, so $A = \\frac{1}{2} \\times 3 \\times 4 = 6$.',
              'So base $4$: the height is the leg $3$, and $A = \\frac{1}{2} \\times 4 \\times 3 = 6$ — the same, as commutativity promised.',
              'And base $5$ (the hypotenuse): equating the two dresses, $\\frac{1}{2} \\times 5 \\times h = 6$ gives $h = \\frac{12}{5} = 2.4$, the perpendicular drop from the right-angle vertex to the hypotenuse; then $\\frac{1}{2} \\times 5 \\times 2.4 = 6$ again.',
              'Hence one triangle, three base-height dresses, one area: $6$ square units every time.',
            ],
          },
          {
            kind: 'example',
            title: 'A triangular sail has base $15$ m and height $8$ m. Find its area.',
            steps: [
              'Now, tag 3 applies: $A = \\frac{1}{2} \\times b \\times h$ with $b = 15$ and $h = 8$.',
              'So $A = \\frac{1}{2} \\times 15 \\times 8 = \\frac{1}{2} \\times 120 = 60$.',
              'And the order is free: halving $15$ first gives $7.5 \\times 8 = 60$ likewise — take the half of whichever number splits nicely.',
              'Hence the sail covers $60$ m$^2$.',
            ],
          },
          { kind: 'heading', text: 'The circle — the walk' },
          {
            kind: 'para',
            text: 'The circle has no sides to sum and no rows to tile, so both of its formulas grow from one observation, which is also one of the oldest discoveries in mathematics: *the walk around a circle is always the same multiple of the distance across it.* Name the parts in 8.1\u2019s dress: the **radius** $r$ is the segment from the centre $O$ to any point of the circle (all such radii are equal — that constancy *is* the circle); the **diameter** $d$ is the chord through the centre, $d = 2r$; and the boundary itself — the circle\u2019s perimeter — is the **circumference** $C$. Measure $C$ and $d$ on any circle and divide: the quotient is one single number, the same for the bangle, the wheel and the Earth. That number is called **pi**, written $\\pi$. A circle is said to have **circumference** $C = \\pi d$ — Thus,',
          },
          {
            kind: 'equation',
            latex: 'C = \\pi d = 2 \\pi r',
            note: 'Tag 4. The ratio constancy — that $C/d$ is the same number for every circle, great and small — is the deep fact here (all circles are scaled copies of one another); the script certified it on the model $C = 2\\pi r$ for every radius from 1 to 200.',
          },
          {
            kind: 'figure',
            caption:
              'The circle\u2019s two measurements on one drawing. Across: the diameter $d = 2r$ through the centre $O$. Around: the circumference $C$. Below, the circumference is unrolled onto a straight segment — drawn to scale: the unrolled length is $2\\pi \\times 90 \\approx 565.5$ px for the drawn radius of $90$ px, a little more than three diameters, which is all \u201c\u03c0 \u2248 3.14\u201d ever meant.',
            svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre O, radius r and diameter d = 2r, with its circumference unrolled onto a straight segment below">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the circumference, unrolled straight — C = 2πr = πd</text>
  <circle cx="190" cy="190" r="90" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <line x1="190" y1="190" x2="235" y2="112.07" stroke="currentColor" stroke-width="1.6"/>
  <line x1="100" y1="190" x2="280" y2="190" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="190" cy="190" r="3.5" fill="currentColor"/>
  <circle cx="100" cy="190" r="3" fill="currentColor"/>
  <circle cx="280" cy="190" r="3" fill="currentColor"/>
  <text x="172" y="210" font-size="13" fill="currentColor" text-anchor="middle">O</text>
  <text x="238.8" y="145.5" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">r</text>
  <text x="240" y="214" font-size="13" fill="currentColor" text-anchor="middle">d = 2r</text>
  <line x1="190" y1="280" x2="100" y2="340" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4" opacity="0.55"/>
  <line x1="100" y1="340" x2="665.49" y2="340" stroke="currentColor" stroke-width="1.8"/>
  <line x1="100" y1="334" x2="100" y2="346" stroke="currentColor" stroke-width="1.6"/>
  <line x1="665.49" y1="334" x2="665.49" y2="346" stroke="currentColor" stroke-width="1.6"/>
  <text x="382" y="368" font-size="12.5" fill="currentColor" text-anchor="middle">C = 2πr — the circumference, unrolled straight</text>
</svg>`,
          },
          {
            kind: 'para',
            text: 'Working with $\\pi$ needs a decimal dress, and two are in standard service: $\\pi \\approx \\frac{22}{7}$ and $\\pi \\approx 3.14$. Both are honest and both are wrong — $\\pi$ is famously *not* any fraction (Johann Lambert proved that in 1761), and its decimal never settles or repeats. The errors are priced: $\\frac{22}{7} = 3.142857\\ldots$ runs about $0.04\\%$ high, $3.14$ about $0.05\\%$ low. The convention of the examination hall: use $\\frac{22}{7}$ when the radius or diameter is a multiple of $7$ (the $7$s cancel — see the Illustrations), use $3.14$ when the numbers say decimal.',
          },
          {
            kind: 'example',
            title: 'Find the circumference of a circle of radius $7$ cm (take $\\pi = \\frac{22}{7}$), and find the diameter of a wheel whose circumference is $132$ cm.',
            steps: [
              'Now, tag 4 with $\\pi = \\frac{22}{7}$ and $r = 7$: $C = 2 \\times \\frac{22}{7} \\times 7$.',
              'So the 7s cancel: $C = 2 \\times 22 = 44$ cm.',
              'And the reverse direction: $C = \\pi d$ gives $d = C \\div \\pi = 132 \\times \\frac{7}{22} = 42$, so the diameter is $42$ cm (radius $21$ cm).',
              'Hence circumference $44$ cm; diameter $42$ cm.',
            ],
          },
          { kind: 'heading', text: 'The circle — the fill' },
          {
            kind: 'para',
            text: 'The circle\u2019s area comes from cutting it up. Slice the disk into $8$ equal **sectors** (pizza slices through the centre) and stand them side by side along a line, alternately tip-up and tip-down, like a row of leaning books. Each slice is roughly a triangle of height $r$ (the slice\u2019s two straight sides are radii); the arcs — the curved outer edges — settle onto the top and the bottom of the band, and here is the accounting: *half* the arcs lie along the top, and they were half of the circumference, so the top edge measures $\\frac{C}{2} = \\pi r$. The band is (nearly) a rectangle: base $\\pi r$, height $r$.',
          },
          {
            kind: 'figure',
            caption:
              'The rearrangement, drawn to scale. Left: the circle cut into $8$ equal sectors (one slice tinted). Right: the same $8$ slices stood side by side \u2014 tips alternating between the bottom and the top edges, every straight edge continuing its neighbour\u2019s in a straight line, the arcs tiling both edges of the band. The band\u2019s height is the radius $r$ ($100$ px here, marked); its top edge carries $4$ of the $8$ arcs \u2014 half the circumference, $\\frac{C}{2} = \\pi r$ (the tinted slice links the panels). The gentle bulge of the arcs over the edges is the honest residue: more slices, smaller bulge, and the band closes in on a perfect $\\pi r \\times r$ rectangle.',
            svg: `<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle cut into 8 sectors, and the same 8 sectors rearranged into a flush band of height r and top edge pi r">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">why the circle’s fill is πr² — the slices stood side by side</text>
  <circle cx="170" cy="190" r="100" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <line x1="170" y1="190" x2="270" y2="190" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="240.71" y2="260.71" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="170" y2="290" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="99.29" y2="260.71" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="70" y2="190" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="99.29" y2="119.29" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="170" y2="90" stroke="currentColor" stroke-width="1"/>
  <line x1="170" y1="190" x2="240.71" y2="119.29" stroke="currentColor" stroke-width="1"/>
  <path d="M 170 190 L 262.39 151.73 A 100 100 0 0 1 262.39 228.27 Z" fill="currentColor" opacity="0.08"/>
  <path d="M 320 240 L 280.73 140 Q 320 130 359.27 140 Z" fill="currentColor" opacity="0.08"/>
  <path d="M 320 240 L 280.73 140 Q 320 130 359.27 140" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="320" y1="240" x2="359.27" y2="140" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 359.27 140 L 320 240 Q 359.27 250 398.54 240" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="359.27" y1="140" x2="398.54" y2="240" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 398.54 240 L 359.27 140 Q 398.54 130 437.81 140" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="398.54" y1="240" x2="437.81" y2="140" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 437.81 140 L 398.54 240 Q 437.81 250 477.08 240" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="437.81" y1="140" x2="477.08" y2="240" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 477.08 240 L 437.81 140 Q 477.08 130 516.35 140" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="477.08" y1="240" x2="516.35" y2="140" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 516.35 140 L 477.08 240 Q 516.35 250 555.62 240" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="516.35" y1="140" x2="555.62" y2="240" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 555.62 240 L 516.35 140 Q 555.62 130 594.89 140" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="555.62" y1="240" x2="594.89" y2="140" stroke="currentColor" stroke-width="1.4"/>
  <path d="M 594.89 140 L 555.62 240 Q 594.89 250 634.16 240" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <line x1="594.89" y1="140" x2="634.16" y2="240" stroke="currentColor" stroke-width="1.4"/>
  <line x1="646" y1="140" x2="646" y2="240" stroke="currentColor" stroke-width="1.2"/>
  <line x1="642" y1="140" x2="650" y2="140" stroke="currentColor" stroke-width="1.2"/>
  <line x1="642" y1="240" x2="650" y2="240" stroke="currentColor" stroke-width="1.2"/>
  <text x="170" y="315" font-size="12.5" fill="currentColor" text-anchor="middle">8 equal sectors</text>
  <text x="477" y="86" font-size="12.5" fill="currentColor" text-anchor="middle">the same 8 slices, stood side by side</text>
  <text x="477" y="114" font-size="12.5" fill="currentColor" text-anchor="middle">≈ πr — half the circumference</text>
  <text x="664" y="194" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">r</text>
  <text x="477" y="272" font-size="12.5" fill="currentColor" text-anchor="middle">area = πr × r = πr²</text>

</svg>`,
          },
          {
            kind: 'derivation',
            title: 'The area of the circle',
            statement: 'A circle of radius $r$ is cut into $n$ equal sectors (take $n$ even) and the sectors are rearranged into a band as in the figure.',
            steps: [
              {
                label: 'Rearrange without loss',
                formula: '\\text{area of the band} = \\text{area of the circle}',
                explanation: 'Nothing is added or discarded — the pieces only change places. Whatever the band\u2019s area is, that is the circle\u2019s.',
              },
              {
                label: 'Measure the band\u2019s height',
                formula: '\\text{height} = r',
                explanation: 'Every slice runs from its tip (a point of the old centre) to its arc: a full radius, $r$.',
              },
              {
                label: 'Measure the band\u2019s base',
                formula: '\\tfrac{n}{2} \\times \\tfrac{C}{n} = \\tfrac{C}{2} = \\pi r',
                explanation: 'Half the arcs settle on the top edge; $n/2$ arcs of length $C/n$ each — exactly half the circumference, no approximation yet.',
              },
              {
                label: 'Rectangle arithmetic',
                formula: 'A = \\pi r \\times r = \\pi r^2',
                explanation: 'The band is a rectangle of base $\\pi r$ and height $r$, up to the saw-teeth at its edges; more slices mean smaller teeth, and the fit sharpens without limit — the honest school-level licence for the exact formula (the full limit argument belongs to calculus, and is not claimed here).',
              },
            ],
            result: 'The area of a circle is $A = \\pi r^2$. In the diameter\u2019s dress, $A = \\frac{\\pi d^2}{4}$ — the $4$ in the denominator is the $r = d/2$ squared, and dropping it is a famous fraud.',
          },
          {
            kind: 'equation',
            latex: 'A_{\\text{circle}} = \\pi r^2 = \\frac{\\pi d^2}{4}',
            note: 'Tag 5. Script-verified instances with $\\frac{22}{7}$: $r = 7$ gives $\\frac{22}{7} \\times 49 = 154$; $r = 14$ gives $616$; and with $3.14$: $r = 10$ gives $314$.',
          },
          {
            kind: 'example',
            title: 'A circle has radius $7$ cm (take $\\pi = \\frac{22}{7}$). Find its area and its circumference; then find the radius of the circle whose area is $154$ cm$^2$.',
            steps: [
              'Now, the fill: $A = \\pi r^2 = \\frac{22}{7} \\times 7 \\times 7 = \\frac{22}{7} \\times 49 = 154$ cm$^2$.',
              'So the walk: $C = 2 \\pi r = 2 \\times \\frac{22}{7} \\times 7 = 44$ cm.',
              'And the reverse: $154 = \\frac{22}{7} r^2$ gives $r^2 = 154 \\times \\frac{7}{22} = 49$, so $r = 7$ cm — the same circle read backwards.',
              'Hence area $154$ cm$^2$, circumference $44$ cm; an area of $154$ cm$^2$ belongs to the radius-$7$ circle.',
            ],
          },
          {
            kind: 'callout',
            tone: 'warn',
            title: 'Caution — the diameter fraud',
            text: 'Given the *diameter*, two correct routes exist: halve it first ($r = d/2$, then $A = \\pi r^2$) or use the tag\u2019s dress $A = \\frac{\\pi d^2}{4}$. The fraud skips both and answers $A = \\pi d^2$ — which is too big by exactly a factor of $4$: for $d = 14$ it returns $616$, the area of the circle with *radius* $14$, not diameter $14$. The true answer for $d = 14$ is $\\frac{22}{7} \\times \\frac{196}{4} = 154$. When the input is a diameter, the $4$ under $d^2$ is not optional.',
          },
          { kind: 'heading', text: 'When figures join — composite shapes' },
          {
            kind: 'para',
            text: 'Real floors, fields and windows are rarely one shape; they are the three measured shapes wearing combinations. The method never changes: cut the figure into pieces whose walk and fill are already known, then add the fills — and *walk only the outer boundary*. Two dissection habits do most of the work: subtraction for the missing corner (an L-shaped floor is the big rectangle minus the notch), and addition for the crowned shape (a semicircular arch rides a rectangular window). One Caution governs the walks: an interior cut never joins the walk. The L-shaped floor $12$ m by $9$ m with a $5$ m by $4$ m corner removed fills $12 \\times 9 - 5 \\times 4 = 108 - 20 = 88$ m$^2$, and its six-sided walk is $12 + 5 + 5 + 4 + 7 + 9 = 42$ m — the notch adds its two inner walls to the walk but removes an equal outer corner, and the half-walk check still holds ($88$-fill is none of the walk\u2019s business).',
          },
          {
            kind: 'example',
            title: 'A window is a $90$ cm $\\times$ $120$ cm rectangle crowned by a semicircular arch on the $90$-cm top edge. Find the area of glass and the length of the beading that frames the outline (take $\\pi = \\frac{22}{7}$).',
            steps: [
              'Now, the arch\u2019s diameter is the $90$-cm top edge, so the arch has radius $r = 45$ cm.',
              'So the glass: rectangle $90 \\times 120 = 10{,}800$ cm$^2$, plus half the circle: $\\frac{1}{2} \\times \\frac{22}{7} \\times 45^2 = \\frac{1}{2} \\times \\frac{22}{7} \\times 2025 = \\frac{44{,}550}{2 \\times 7} \\approx 3{,}182.14$ cm$^2$ — together about $13{,}982$ cm$^2$.',
              'And the beading walks the outline only: two sides of $120$, the bottom of $90$, and the arch of length $\\pi r = \\frac{22}{7} \\times 45 \\approx 141.43$ — the $90$-cm diameter itself is glass-to-frame inside, never walked: $120 + 120 + 90 + 141.43 \\approx 471.43$ cm.',
              'Hence about $13{,}982$ cm$^2$ of glass and about $471.4$ cm of beading.',
            ],
          },
          {
            kind: 'callout',
            tone: 'exam',
            title: 'Exam corner',
            text: 'This lesson is the examination\u2019s measurement staple, dressed four ways: (i) *fence and carpet cost* — perimeter or area times a rate (fence Rs $15$/m, carpet Rs $250$/m$^2$); keep the two straight by units, never by hope; (ii) *fixed perimeter, best area* — the balanced (square) dimensions win, and the integer sweep of the table is the working; (iii) *circle round-trips* — $C \\leftrightarrow r \\leftrightarrow A$ conversions with $\\frac{22}{7}$, where the multiples of $7$ cancel (radius 7, 14, 21; circumference 44, 88, 132; area 154, 616); (iv) *unit conversions* — the hectare fields and the m$^2$/cm$^2$ rescalings, where the squared factor is the whole question. None of these items is reproduced from any paper; the shapes are the syllabus\u2019s own.',
          },
          {
            kind: 'callout',
            tone: 'historical',
            title: 'Historical note — the number that would not be caught',
            text: 'That every circle walks $\\pi$ diameters was known to the ancient surveyors, but *pinning $\\pi$ down* took two thousand years. Archimedes of Syracuse (c. 250 BCE) trapped it between polygons: inscribe a 96-gon (a hexagon\u2019s sides doubled four times) inside a circle and another outside it, walk both, and $\\pi$ lies between their perimeters over the same diameter — his squeeze gave $3\\frac{10}{71} < \\pi < 3\\frac{1}{7}$, that is, $3.1408\\ldots < \\pi < 3.1428\\ldots$. Aryabhata (c. 499 CE) computed with the rule \u201cadd 4 to 100, multiply by 8, and add 62,000\u201d — $\\frac{62832}{20000} = 3.1416$, four true decimals. Zu Chongzhi (c. 480 CE) carried the squeeze to the \u201cMil\u00fc\u201d, $\\frac{355}{113} = 3.1415929\\ldots$ — six true decimals, and still the best fraction with at most four digits top and bottom. Lambert proved in 1761 that no fraction equals $\\pi$ exactly (its decimal never repeats — chapter 5\u2019s recurring machinery, escaped forever), and Lindemann proved in 1882 that $\\pi$ is not even the root of any whole-number polynomial. The *letter* arrived late and modestly: William Jones wrote $\\pi$ for the ratio in his Synopsis of 1706 — the Greek periphery\u2019s first letter, the same root as *peri-meter* — and Euler\u2019s adoption a generation later made it standard.',
          },
          {
            kind: 'terms',
            items: [
              { term: 'Perimeter', def: 'The total length of a closed figure\u2019s boundary — the distance of one complete walk around it, in units of length.' },
              { term: 'Area', def: 'The number of unit squares that cover a figure exactly — the measure of the surface it encloses, in square units.' },
              { term: 'Unit square', def: 'A square of side $1$ (cm, m, \u2026) carrying $1$ square unit of area; the tile in which all areas are counted.' },
              { term: 'Half-walk', def: 'For a rectangle, the sum $l + b$ — half the perimeter; the natural intermediate in every fence computation.' },
              { term: 'Base and height', def: 'For a triangle, any chosen side (the base) and the perpendicular distance from the opposite vertex to the base line (the height, or altitude).' },
              { term: 'Circumference', def: 'The perimeter of a circle: $C = 2\\pi r = \\pi d$.' },
              { term: 'Radius and diameter', def: 'The segment from the centre to the circle ($r$), and the chord through the centre ($d = 2r$).' },
              { term: 'Pi (π)', def: 'The constant ratio of every circle\u2019s circumference to its diameter; irrational, about $3.14159$, worked as $\\frac{22}{7}$ or $3.14$.' },
              { term: 'Sector', def: 'The region between two radii and the arc they cut from the circle — a slice through the centre.' },
              { term: 'Semicircle dress', def: 'Half a circle: area $\\frac{1}{2}\\pi r^2$, and a boundary walk of $\\pi r + 2r$ (arc plus diameter).' },
              { term: 'Hectare', def: 'A land unit: a $100$ m $\\times$ $100$ m square, $10{,}000$ m$^2$.' },
              { term: 'Composite figure', def: 'A figure built from measured shapes joined or cut; its fill is the sum (or difference) of the pieces\u2019 fills, and its walk runs only along the outer boundary.' },
            ],
          },
          {
            kind: 'para',
            text: 'From the above discussion, the whole lesson folds into a pocket. For the rectangle: $P = 2(l + b)$ and $A = l \\times b$. For the triangle: $A = \\frac{1}{2} \\times b \\times h$, any side the base, the height always perpendicular. For the circle: $C = 2\\pi r = \\pi d$ and $A = \\pi r^2 = \\frac{\\pi d^2}{4}$. Units convert with the tile, never the side: $1$ m$^2 = 10^4$ cm$^2$ and $1$ hectare $= 10^4$ m$^2$. And the standing guard: the walk and the fill are different questions — a fixed perimeter pins no area, and the balanced shape always wins.',
          },
          {
            kind: 'quiz',
            title: 'Check yourself',
            items: [
              {
                q: 'The perimeter of a square plot of side $9$ m is —',
                options: ['$81$ m', '$36$ m', '$18$ m', '$27$ m'],
                answer: 1,
                explain:
                  'The square\u2019s walk is $4 \\times 9 = 36$ m (Option 2). Option 1 is the AREA, $9^2 = 81$ — the fill, not the walk. Option 3 is the half-walk $2 \\times 9 = 18$, enough fencing for two sides only. Option 4 is nothing at all — three sides, if anything.',
              },
              {
                q: 'A rectangular sheet measures $12$ cm by $7$ cm. Its area is —',
                options: ['$38$ cm$^2$', '$19$ cm$^2$', '$84$ cm$^2$', '$42$ cm$^2$'],
                answer: 2,
                explain:
                  'The fill counts tiles: $12 \\times 7 = 84$ cm$^2$ (Option 3). Option 1 is the perimeter $2(12 + 7) = 38$ — a length, wrong unit and wrong question. Option 2 is the half-walk $19$. Option 4 is the triangle\u2019s half, $\\frac{1}{2} \\times 12 \\times 7 = 42$ — the sheet is no triangle.',
              },
              {
                q: 'Four rectangular fields are fenced with $40$ m of wire each. The LARGEST enclosed area belongs to —',
                options: ['$18$ m $\\times$ $2$ m', '$14$ m $\\times$ $6$ m', '$12$ m $\\times$ $8$ m', '$10$ m $\\times$ $10$ m'],
                answer: 3,
                explain:
                  'All four share the half-walk $20$; the areas are $36$, $84$, $96$ and $100$ — the square wins (Option 4), the balanced-shape law at perimeter 40. Every step away from the square shrinks the fill: the sweep of this lesson\u2019s table, run again.',
              },
              {
                q: 'With $\\pi = \\frac{22}{7}$, the circumference of a circle of radius $7$ cm is —',
                options: ['$154$ cm', '$44$ cm', '$22$ cm', '$88$ cm'],
                answer: 1,
                explain:
                  '$C = 2\\pi r = 2 \\times \\frac{22}{7} \\times 7 = 44$ cm (Option 2). Option 1 is the area $\\frac{22}{7} \\times 49 = 154$ — the fill mistaken for the walk. Option 3 is $\\pi r$ with the $2$ forgotten. Option 4 is the walk of the radius-$14$ circle.',
              },
              {
                q: '$1$ m$^2$ equals —',
                options: ['$100$ cm$^2$', '$1{,}000$ cm$^2$', '$10{,}000$ cm$^2$', '$1{,}000{,}000$ cm$^2$'],
                answer: 2,
                explain:
                  'The tile rescales on both edges: $100$ cm $\\times$ $100$ cm $= 10{,}000$ cm$^2$ (Option 3). Option 1 is the reflex that converts the SIDE ($1$ m $=$ $100$ cm) and stops — the classic fraud. Option 2 is neither the side nor the tile. Option 4 is $1$ km$^2$ in cm$^2$ territory: a thousand metres times a thousand metres, in the wrong rung entirely.',
              },
            ],
          },
          {
            kind: 'exercises',
            title: 'Exercises',
            sets: [
              {
                level: 'L1',
                questions: [
                  {
                    q: 'A square has side $6$ cm. Find its perimeter and its area.',
                    solution: [
                      'Now, the square\u2019s walk: $P = 4 \\times 6 = 24$ cm.',
                      'And its fill: $A = 6 \\times 6 = 36$ cm$^2$.',
                      'Hence perimeter $24$ cm, area $36$ cm$^2$.',
                    ],
                    answer: '$P = 24$ cm; $A = 36$ cm$^2$',
                  },
                  {
                    q: 'A rectangle measures $9$ cm by $4$ cm. Find its perimeter and its area, and compare the area with Exercise 1.',
                    solution: [
                      'Now, the half-walk is $9 + 4 = 13$, so $P = 2 \\times 13 = 26$ cm.',
                      'And the fill is $9 \\times 4 = 36$ cm$^2$ — the SAME area as the $6 \\times 6$ square of Exercise 1, from a different walk ($26$ against $24$).',
                      'Hence perimeter $26$ cm, area $36$ cm$^2$; same fill, and the square walks shorter.',
                    ],
                    answer: '$P = 26$ cm; $A = 36$ cm$^2$ (same area as Ex. 1, longer walk)',
                  },
                ],
              },
              {
                level: 'L2',
                questions: [
                  {
                    q: 'A triangular pennant has base $12$ cm and height $5$ cm. Find its area.',
                    solution: [
                      'Now, tag 3: $A = \\frac{1}{2} \\times b \\times h = \\frac{1}{2} \\times 12 \\times 5$.',
                      'So $A = \\frac{1}{2} \\times 60 = 30$ cm$^2$.',
                      'Hence the pennant covers $30$ cm$^2$.',
                    ],
                    answer: '$30$ cm$^2$',
                  },
                  {
                    q: 'A circle has diameter $14$ cm (take $\\pi = \\frac{22}{7}$). Find its circumference.',
                    solution: [
                      'Now, tag 4 in the diameter\u2019s dress: $C = \\pi d = \\frac{22}{7} \\times 14$.',
                      'So $C = 22 \\times 2 = 44$ cm.',
                      'Hence the walk is $44$ cm (and $\\pi d$ skipped the halving entirely — the 7 cancelled inside the fraction).',
                    ],
                    answer: '$44$ cm',
                  },
                ],
              },
              {
                level: 'L3',
                questions: [
                  {
                    q: 'A hall floor measures $6$ m by $4$ m. Square tiles of side $40$ cm are used. How many tiles are needed?',
                    solution: [
                      'Now, one unit first: $6$ m $= 600$ cm and $4$ m $= 400$ cm.',
                      'So along the length: $600 \\div 40 = 15$ tiles; along the breadth: $400 \\div 40 = 10$ tiles.',
                      'And the count is $15 \\times 10 = 150$ tiles.',
                      'Hence the area check agrees: $24$ m$^2$ $= 2{,}40{,}000$ cm$^2$, one tile $1{,}600$ cm$^2$, and $2{,}40{,}000 \\div 1{,}600 = 150$.',
                    ],
                    answer: '$150$ tiles',
                  },
                  {
                    q: 'A circle has radius $10$ cm (take $\\pi = 3.14$). Find its circumference and its area.',
                    solution: [
                      'Now, the walk: $C = 2 \\pi r = 2 \\times 3.14 \\times 10 = 62.8$ cm.',
                      'And the fill: $A = \\pi r^2 = 3.14 \\times 100 = 314$ cm$^2$.',
                      'Hence circumference $62.8$ cm, area $314$ cm$^2$ (the decimal dress, since the radius says $10$, not a multiple of $7$).',
                    ],
                    answer: '$C = 62.8$ cm; $A = 314$ cm$^2$',
                  },
                ],
              },
              {
                level: 'L4',
                questions: [
                  {
                    q: 'A circle has circumference $88$ cm (take $\\pi = \\frac{22}{7}$). Find its radius and its area.',
                    solution: [
                      'Now, backwards through tag 4: $C = 2\\pi r$ gives $r = C \\div 2\\pi = 88 \\times \\frac{7}{44} = 14$ cm.',
                      'So the fill: $A = \\frac{22}{7} \\times 14^2 = \\frac{22}{7} \\times 196 = 616$ cm$^2$.',
                      'Hence radius $14$ cm, area $616$ cm$^2$.',
                    ],
                    answer: '$r = 14$ cm; $A = 616$ cm$^2$',
                  },
                  {
                    q: 'A rectangular field measures $250$ m by $180$ m. Fencing costs Rs $12$ per metre. Find the total cost of fencing the field.',
                    solution: [
                      'Now, the fence prices the walk: half-walk $250 + 180 = 430$ m, so $P = 2 \\times 430 = 860$ m.',
                      'So the cost is $860 \\times 12 = 10{,}320$.',
                      'Hence Rs $10{,}320$ (and the area $45{,}000$ m$^2 = 4.5$ hectares never entered the bill — different question).',
                    ],
                    answer: 'Rs $10{,}320$',
                  },
                ],
              },
              {
                level: 'L5',
                questions: [
                  {
                    q: 'A wire $24$ m long is bent into a rectangle. Of all whole-metre rectangles it can form, which encloses the greatest area, and what is that area?',
                    solution: [
                      'Now, the half-walk is $12$: the integer pairs run $(11, 1), (10, 2), (9, 3), (8, 4), (7, 5), (6, 6)$.',
                      'So the areas run $11, 20, 27, 32, 35, 36$ — climbing to the balanced end.',
                      'And the square $6 \\times 6$ takes the most: $36$ m$^2$ (the balanced-shape law of this lesson, met again at perimeter $24$).',
                      'Hence the $6$ m $\\times$ $6$ m square, area $36$ m$^2$.',
                    ],
                    answer: 'The $6 \\times 6$ square; area $36$ m$^2$',
                  },
                  {
                    q: 'An L-shaped corridor is a $12$ m $\\times$ $9$ m rectangle with a $5$ m $\\times$ $4$ m corner removed. Find its floor area, the length of its skirting (the walk along the outline), and the cost of carpeting it at Rs $250$ per m$^2$.',
                    solution: [
                      'Now, the fill by subtraction: $12 \\times 9 - 5 \\times 4 = 108 - 20 = 88$ m$^2$.',
                      'So the walk runs the six outer walls: $12 + 5 + 5 + 4 + 7 + 9 = 42$ m — the interior cut joins no walk.',
                      'And the carpet prices the fill: $88 \\times 250 = 22{,}000$.',
                      'Hence area $88$ m$^2$, skirting $42$ m, carpet Rs $22{,}000$.',
                    ],
                    answer: 'Area $88$ m$^2$; skirting $42$ m; cost Rs $22{,}000$',
                  },
                ],
              },
              {
                level: 'L6',
                questions: [
                  {
                    q: 'Prove that two copies of any right triangle tile a rectangle whose sides are the triangle\u2019s legs, and deduce that every triangle\u2019s area is $\\frac{1}{2} \\times$ base $\\times$ height. Quote every tool you use.',
                    solution: [
                      'Now, take the right triangle with legs $p$, $q$ and hypotenuse $c$; place it with legs along the axes of a $p \\times q$ rectangle.',
                      'So the second copy, turned by a half-turn (a rotation through $180^\\circ$) about the midpoint of the hypotenuse, lands with its legs along the far pair of sides — the two hypotenuses lie on the same diagonal line (8.2\u2019s straight angle: the two copies\u2019 angles at the meeting point sum to $90^\\circ + 90^\\circ = 180^\\circ$).',
                      'And the pair covers the rectangle with no gap and no overlap (the rectangle\u2019s four corners are the two right-angle vertices and the two far leg-ends; every interior point falls on one side of the diagonal line).',
                      'Now, each copy carries half: $\\frac{1}{2} p q$ — the right triangle\u2019s formula, its legs being base and height.',
                      'And every triangle: drop the altitude $h$ to the chosen base $b$; it splits the triangle into two right triangles of bases $x$ and $b - x$ with the same height, so $A = \\frac{1}{2} x h + \\frac{1}{2}(b - x) h = \\frac{1}{2} h (x + b - x) = \\frac{1}{2} b h$ — the foot\u2019s position cancels, which is why ANY side may serve as base.',
                      'Hence the formula for every triangle, spending only the straight angle, the rectangle\u2019s tiling and distributivity.',
                    ],
                    answer: '$A = \\frac{1}{2} \\times b \\times h$ for every triangle (two-copy tiling + the altitude split whose $x$ cancels)',
                  },
                  {
                    q: 'The 3-4-5 right triangle: compute its area three ways (leg-base twice, hypotenuse-base once), refuse the fraud $\\frac{1}{2} \\times 4 \\times 5 = 10$, and reconcile the answers with its perimeter of $12$.',
                    solution: [
                      'Now, leg $3$ as base (height the other leg $4$): $A = \\frac{1}{2} \\times 3 \\times 4 = 6$.',
                      'And leg $4$ as base (height $3$): $\\frac{1}{2} \\times 4 \\times 3 = 6$ — commutativity, as promised.',
                      'Now, the hypotenuse $5$ as base: the perpendicular drop $h$ from the right-angle vertex satisfies $\\frac{1}{2} \\times 5 \\times h = 6$, so $h = \\frac{12}{5} = 2.4$, and $\\frac{1}{2} \\times 5 \\times 2.4 = 6$ once more.',
                      'So the fraud: $\\frac{1}{2} \\times 4 \\times 5 = 10$ pairs the base $4$ with the SLANTED side $5$ — no perpendicularity, no height, no truth (the true height for base $4$ is $3$).',
                      'And the perimeter $12 = 3 + 4 + 5$ is the walk around the triangle — a different question from the fill of $6$; the two agree on nothing and need not.',
                      'Hence area $6$ square units by all three honest dresses; the fraud refused; the perimeter a separate ledger.',
                    ],
                    answer: '$A = 6$ by all three dresses ($h = 12/5 = 2.4$ to the hypotenuse); $\\frac{1}{2} \\times 4 \\times 5 = 10$ refused; the perimeter $12$ is the walk',
                  },
                ],
              },
            ],
          },
        ],
      },
  ],
}
