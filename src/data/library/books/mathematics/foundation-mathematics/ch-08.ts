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
 * References for this unit: NCERT class-6 ch. 4 "Basic Geometrical
 * Ideas" (the point/segment/line/ray charter; parallel lines) + NCERT
 * class-9 ch. 5 "Introduction to Euclid's Geometry" (Euclid's
 * definitions, axioms and postulates) + Khattar, Quantitative Aptitude
 * (4e) geometry-counting staples — both NCERT chapter identities
 * web-checked this run (sanctioned fallback), no content reproduced;
 * see docs/project/SOURCE_LOG.md. Exposition original.
 */
export const chapter08: Chapter = {
  number: 8,
  slug: 'geometry-foundations',
  title: 'Geometry Foundations',
  summary:
    'The visual half of mathematics begins: points, lines, planes and angles as ideal objects; measuring angles; parallel lines and transversals; triangles and the angle-sum result; and the first area formulas, derived.',
  status: 'in-progress',
  plannedLessons: [
    'Parallel Lines and Transversals',
    'Triangles and the Angle Sum',
    'Perimeter and Area of Rectangles, Triangles and Circles',
  ],
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
  ],
}
