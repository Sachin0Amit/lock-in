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
    'Angles and Their Measurement',
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
  ],
}
