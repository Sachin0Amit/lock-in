#!/usr/bin/env node
/* ANALYSIS AGENT "mathematics" (SWARM-MATH) — verdict builder.
   Pulls exact titles from legend.json / mathematics.json / mathematics-plan.json,
   attaches my adjudications, validates every reference, writes verdicts/mathematics.json. */
const fs = require('fs');
const path = require('path');
const DIR = '/home/z/my-project/scripts/ledger_data_working/reorg/swarm';
const brief = JSON.parse(fs.readFileSync(path.join(DIR, 'mathematics.json'), 'utf8'));
const plan = JSON.parse(fs.readFileSync(path.join(DIR, 'mathematics-plan.json'), 'utf8'));
const legend = JSON.parse(fs.readFileSync(path.join(DIR, 'legend.json'), 'utf8'));

const legendCh = {};
for (const b of legend) legendCh[b.id] = b.chapters.map(c => ({ n: c.n, t: c.t }));

// planned-lesson lookup for my 28 books (from the brief)
const planned = {}; // bookId -> chapterNum -> [titles]
for (const b of brief.books) {
  planned[b.id] = {};
  for (const c of b.chapters) planned[b.id][c.number] = (c.planned || []).map(p => (typeof p === 'string' ? p : p.title));
}
function assertLesson(book, chapter, title, where) {
  if (!planned[book]) return; // foreign-discipline book; validated by construction from plan arrays
  const list = planned[book][chapter];
  if (!list || !list.includes(title)) {
    throw new Error(`REFERENCE FAIL (${where}): ${book} ch${chapter} :: ${title}`);
  }
}

// ---------------- autoReview ----------------
const A = plan.autoActions;
const autoReview = [];
const AUTO = {
  0: ['veto', 'keep', '', null, '', 'Advanced-algebra authors nothing on limits (written lessons end at ch3, Complex Numbers; ch9/ch10 are planned only) — the "authored-owns" rationale is false. Trigonometric/exponential/logarithmic standard limits are canonical differential-calculus ch1 content; removing them would leave the limit chapter without its standard-limit families.'],
  1: ['veto', 'keep', '', null, '', 'Similarity criteria (AA/SAS/SSS) are a distinct topic from ch3\u2019s congruence criteria (SAS/ASA/AAS/SSS/RHS): same-shape vs same-size. The detector fused them on tokens; removing ch4\u2019s lesson would gut the Similarity chapter.'],
  2: ['veto', 'keep', '', null, '', 'The ellipse chapter\u2019s parametric treatment is conic-specific (parametric form, chords, position for the ellipse); the kept ch5 copy covers the parabola. Each conic chapter legitimately carries its own parametric lesson.'],
  3: ['veto', 'keep', '', null, '', 'Quotient rings as ROOT FIELDS — F[x]/<p(x)> adjoining a root — is the distinct construction ch7\u2019s Galois door depends on; ch5\u2019s lesson teaches the general quotient-ring construction. Different subjects fused on tokens.'],
  4: ['veto', 'keep', '', null, '', 'Cross-sections and solids of revolution is mensuration — geometry ch10\u2019s own subject (surface areas and volumes). "environmental-studies ch2 The Natural Resources" is a pure token misroute.'],
  5: ['veto', 'keep', '', null, '', 'The continuous-versus-discrete viewpoint is the discrete-mathematics book\u2019s opener. signals-and-systems ch1 teaches continuous-time vs discrete-time SIGNALS — a different concept sharing tokens.'],
  6: ['amend', 'retitle', '', null, 'Sets, Functions and Sequences at Work', 'Sets, functions and sequences are core discrete content (the "at Work" survey for the CS syllabus — Rosen devotes his longest early chapter to exactly this); the title is bloated, not junk, and the "already covered in foundation-physics" rationale is groundless. Retitle and keep; removal would gut ch1 (see thin verdicts).'],
  7: ['veto', 'keep', '', null, '', 'Growth of functions (Big-O and kin) belongs in ch2 "Algorithms and Their Growth" — the Rosen placement. combinatorics ch4\u2019s asymptotics lesson is the growth of counting sequences — a different subject.'],
  8: ['veto', 'keep', '', null, '', 'The set-theoretic definition of a function (set of ordered pairs with the exactness property) is set-theory ch3\u2019s own formal content; theory-of-computation ch2 (Finite Automata) merely uses functions.'],
  9: ['veto', 'keep', '', null, '', 'Structures, satisfaction and models is model theory — mathematical-logic ch5\u2019s core. foundation-chemistry ch3 (Atomic Structure) is an absurd token route.'],
  10: ['veto', 'keep', '', null, '', 'The conformal-mapping treatment of harmonic functions and the Dirichlet problem is complex-analysis ch6\u2019s own (it sits in the Conformal Mapping arc). mathematical-physics ch5 is the special-function atlas — a different, shallower treatment; the specialist home is complex analysis.'],
  11: ['veto', 'keep', '', null, '', 'Monoids and semigroups are abstract-algebra ch1\u2019s own lighter structures; foundation-chemistry ch3 is an absurd token route.'],
  12: ['veto', 'keep', '', null, '', 'Hyperbolic functions (cosh, sinh, the catenary) are standard engineering-methods content. heat-and-thermodynamics ch7 (Second Law and Heat Engines) is an absurd token route.'],
  13: ['veto', 'keep', '', null, '', 'Gamma, Beta and the error functions are the engineering special-function shelf\u2019s own content; heat-and-thermodynamics ch5 (Specific Heats of Gases) matched only on the "gamma" token (heat-capacity ratio).'],
  14: ['veto', 'keep', '', null, '', 'Genuine syllabus split: engineering methods (mathematical-methods-for-engineering) vs physics methods (mathematical-physics ch1, The Calculus of Variations) vs Lagrangian mechanics (mechanics ch11) — mirrors the physics-vs-engineering thermodynamics pattern. Cluster verdict: keep-both.'],
  15: ['veto', 'keep', '', null, '', 'Typesetting mathematics with TeX is ch6 "Reading and Writing Research Mathematics"\u2019s own content; waves-and-oscillations ch2 (SHM Mathematics) is an absurd token route.'],
  16: ['veto', 'keep', '', null, '', '"The Other Shelves\u2019 Mathematics" is the closing meta-chapter\u2019s own lesson (how mathematics lives on other shelves); statistics ch1 (Data and Its Shapes) is an absurd token route.'],
  17: ['veto', 'remove', '', null, '', 'A publisher-disclaimer OCR blob ("Cambridge University Press has no responsibility for URLs..."). Junk must be removed at its source (engineering-mechanics ch3), never imported into probability-theory ch3 (Total Probability and Bayes).'],
  18: ['veto', 'keep', '', null, '', 'Dynamics of combined translation and rotation is rigid-body dynamics — mechanics ch7 (Rotational Dynamics)\u2019s own subject. "translation and rotation" tokens falsely matched geometry ch5\u2019s rigid MOTIONS; geometry\u2019s transformations are a wholly different subject.'],
  19: ['veto', 'keep', '', null, '', 'Compound machines is machines/mechanics territory (mechanics ch9 or the engineering machines shelf); there is no honest trigonometry ch3 home — the route is a token artifact.'],
  20: ['amend', 'remove', '', null, '', 'A school-algebra omnibus (polynomial, linear and quadratic equations). Its honest owner is authored elementary-algebra, which is exempt from inbound moves; linear-algebra ch3 (systems of linear equations) is the wrong rung for single-variable school equations. Remove rather than misfile.'],
  21: ['amend', 'remove', '', null, '', '"Elementary Algebra" is not abstract algebra — abstract-algebra ch1 (The Abstract Viewpoint) is the wrong rung by definition. Authored elementary-algebra owns the content and is exempt from inbound moves; remove rather than misfile.'],
  22: ['amend', 'move', 'coordinate-geometry', 10, '', 'Rectangular (x,y) components of a vector are vector-algebra basics: the honest math home is coordinate-geometry ch10 "Vector Algebra: Arrows with Rules" (its first lesson covers position, components, types). multivariable-calculus ch5 (Vector Calculus: fields, line/surface integrals) is too advanced a home.'],
  23: ['veto', 'keep', '', null, '', 'In its quantum-mechanics ch8 (Time-Dependent Transitions) context this is the discrete-to-continuous spectrum transition — quantum-mechanics is its home. discrete-mathematics ch1 uses "discrete" in a wholly different sense; the two "Continuous versus Discrete" lessons are not duplicates (see dupes).'],
  24: ['veto', 'keep', '', null, '', '"The Theory Cross-Reference" is business-mathematics\u2019 own synthesis/cross-reference apparatus (ch7, Probability and Expected Value); no honest inverse-trigonometry home exists — token route.'],
  25: ['veto', 'keep', '', null, '', 'Zero-group (NH4+) qualitative analysis is salt-analysis chemistry, physical-chemistry\u2019s own; advanced-mathematical-foundations ch5 (The Great Open Problems) is an absurd token route.'],
  26: ['veto', 'keep', '', null, '', 'The classification of elements and the periodic law is inorganic-chemistry ch1\u2019s own subject; abstract-algebra ch3 (Cosets and Lagrange) matched on "periodic/group" tokens — absurd.'],
  27: ['veto', 'keep', '', null, '', 'Complexation reactions and coordination numbers are coordination chemistry (inorganic-chemistry ch7); differential-equations ch1 is an absurd token route.'],
  28: ['veto', 'keep', '', null, '', 'Power of a point is a circle theorem (intersecting chords/tangents: PA\u00b7PB = PC\u00b7PD) — ch7 The Circle\u2019s own content; ch1 is the axiomatics chapter.'],
  29: ['veto', 'keep', '', null, '', 'This is the ruler-and-compass CONSTRUCTION of incircles/circumcircles and regular polygons — the construction discipline of ch8. ch6 covers quadrilateral/polygon properties and has no construction agenda.'],
  30: ['veto', 'keep', '', null, '', 'The equation of a circle in all its forms is ch4 The Circle\u2019s own opening lesson; ch6 is The Ellipse — a pure token misroute.'],
  31: ['veto', 'keep', '', null, '', 'Defining ln x = integral of dt/t requires the definite integral; ch3 sits immediately after the Fundamental Theorems of Calculus — exactly right. Moving to ch1 (indefinite-integral craft) would place it before the machinery it needs.'],
  32: ['veto', 'keep', '', null, '', 'Jacobians and change of variables serve multiple-integral substitution — ch4 (Multiple Integrals) is their home and where they are used; ch2 is partial derivatives.'],
  33: ['veto', 'keep', '', null, '', 'The Cauchy-Euler equation is a second-order linear ODE solved by the power ansatz — it needs ch4\u2019s characteristic-equation machinery; ch1 (language of ODEs) would place it before the fundamentals it depends on.'],
  35: ['veto', 'keep', '', null, '', 'Pell\u2019s equation is solved by continued fractions — it is ch7 (Continued Fractions)\u2019s own closing arc; ch1 (ground arithmetic) would place it before the machinery it depends on.'],
  36: ['veto', 'keep', '', null, '', 'The \u03b5-\u03b4 limit is the definition at the heart of ch5 "Limits and Continuity at Depth"; ch6 (Differentiation) merely consumes it.'],
  37: ['veto', 'keep', '', null, '', 'The inverse and implicit function theorems are theorems about derivatives — the differentiation chapter is their standard home (they close its arc); ch5 is limits/continuity.'],
  38: ['veto', 'keep', '', null, '', 'Continuity in metric spaces is ch1 (Metric Spaces)\u2019s own content; ch5 is compactness.'],
  40: ['veto', 'keep', '', null, '', 'Discretizing the heat equation is numerical PDE craft — exactly ch7 (The Numerical Craft); ch2 is the ODE shelf and cannot host a PDE-numerics lesson.'],
  41: ['veto', 'keep', '', null, '', '"Where Every Reader Stands" is the ladder-overview chapter\u2019s reader-placement lesson; ch5 (The Great Open Problems) is a pure token misroute.'],
};
for (const k of Object.keys(AUTO).map(Number).sort((a, b) => a - b)) {
  const a = A[k];
  const [verdict, action, targetBook, targetChapter, newTitle, reason] = AUTO[k];
  if (verdict === 'veto' || verdict === 'amend') {
    autoReview.push({ book: a.book, chapter: a.chapter, title: a.title, verdict, action, targetBook, targetChapter, newTitle, reason });
    if (planned[a.book]) assertLesson(a.book, a.chapter, a.title, 'auto#' + k);
    if (targetBook && targetChapter != null && !legendCh[targetBook].some(c => c.n === targetChapter)) throw new Error('legend fail for target ' + targetBook + ' ch' + targetChapter);
  }
}

// ---------------- misplaced (all 31 misAdjudicate items -> keep) ----------------
const M = plan.misAdjudicate;
const MIS = [
  'Types and pairs of angles with the parallel-line/transversal apparatus is Euclidean geometry\u2019s own foundation; trigonometry ch1 treats angle-as-rotation and radian measure for a different purpose. Token noise (top3 included mandarin/typography).',
  'Stewart\u2019s theorem (the side-median relation) is a pure synthetic triangle theorem — geometry\u2019s own; the statistics hint is pure token noise.',
  'Bisectors, perpendiculars and standard triangles ARE the ruler-and-compass constructions — ch8\u2019s own discipline; coordinate-geometry hint is token noise.',
  'Rotation of axes and its invariants is classic analytic geometry (shifting/rotating axes, later used to de-tilt conics) — ch2\u2019s own alongside axis-shifting.',
  'Confocal conics and families of conics is advanced conic theory — exactly ch8 "The Conic Family Unified"; the differential-calculus hint is token noise.',
  'Families of planes is the 3D analogue of ch2\u2019s family of lines — native to ch12 (Lines and Planes in Space); the elementary-algebra hint is token noise (and that book is exempt).',
  'Summing trigonometric series via the 2sin(d/2) device is a standard transformation-formulas technique; the real-analysis hint is token noise.',
  'Max-min, graphical and inequality (range) methods are standard trigonometric-equation solution techniques; the optimization hint is token noise.',
  'The trigonometric treatment of quadrilaterals (splitting into triangles, area via sine/cosine rules) and regular polygons is the designed capstone of Properties of Triangles; geometry ch6 holds the properties treatment — different treatments, both legitimate (see dupes CL19).',
  'The complete maxima/minima tests ARE ch6\u2019s declared subject (monotonicity, concavity, extrema); the business-mathematics hint is token noise.',
  'The logarithm defined as an integral is the definite-integral chapter\u2019s payoff lesson (ln x = integral dt/t right after the Fundamental Theorems); advanced-algebra teaches logarithm LAWS, not this construction.',
  'Piecewise integrands (modulus, greatest-integer, signum) are standard definite-integral craft — ch4\u2019s own; the advanced-algebra hint is token noise.',
  'Polar areas and arc lengths are integral-calculus applications; coordinate-geometry owns the polar coordinate system, not these integrals (see dupes CL20).',
  'Taylor\u2019s formula for two variables is core multivariable calculus; the numerical-analysis hint is token noise.',
  'Forming ODEs from families of curves (eliminating constants) is the classic opening craft of differential equations.',
  'Direction fields and the Euler preview are the standard qualitative opener of the DE language chapter; numerical-analysis ch6 holds the full Euler analysis — this is deliberately the preview.',
  'Existence and uniqueness (Picard-Lindel\u00f6f) is core first-order ODE theory; the arithmetic hint is absurd token noise.',
  'The Cauchy-Euler (equidimensional) equation is standard second-order-linear content — ch4\u2019s own (also vetoed auto #33 that tried to relocate it to ch1).',
  'Topological sorting is taught inside partial orders in Rosen-style discrete math (ch5\u2019s own arc: partial orders -> Hasse diagrams -> topological sort); the algorithms book holds the full algorithm treatment — different syllabi, and no duplicate cluster was detected.',
  'Sums of two squares (Fermat\u2019s theorem) and Pythagorean triples are number theory proper; the elementary-algebra hint is token noise (and exempt).',
  'The formal set-theoretic treatment, marked "Deepened" by design: discrete-mathematics holds the CS-survey copy — different syllabi (see dupes CL33).',
  'Partial orders, chains and bounds feed Zorn\u2019s lemma and the ordinal chapter — ch5\u2019s own ground; the multivariable hint is token noise.',
  'Statements (propositions) are logic\u2019s opening raw material; the molecular-biology hint is token noise.',
  'The counting-bank recall opens the specialist book\u2019s deepened arc; the complex-analysis hint is token noise.',
  'Asymptotics of counting sequences is analytic-combinatorics territory; algorithms\u2019 Big-O is complexity analysis — a different subject sharing tokens.',
  'Odds are the classical probability measure and its first computations; the engineering-methods hint is token noise.',
  'The logic of the hypothesis test is statistics\u2019 own core; the molecular-biology hint is token noise.',
  'Connectedness of intervals is the real-line topology chapter\u2019s own theorem; topology owns the general theory at a different depth — different syllabi.',
  'Conjugacy classes and the class equation are core finite-group theory; the high-voltage-engineering hint is absurd token noise.',
  'The doorstep chain traced end-to-end is the ladder-overview chapter\u2019s own lesson; the NLP hint is token noise.',
  'Shortcuts and their limits is the aptitude book\u2019s own opener material (speed-vs-rigor); the biotechnology hint is token noise.',
];
const misplaced = M.map((m, i) => ({ book: m.book, chapter: m.chapter, title: m.title, action: 'keep', targetBook: '', targetChapter: 0, newTitle: '', reason: MIS[i] }));
if (M.length !== MIS.length) throw new Error('misplaced count mismatch ' + M.length + ' vs ' + MIS.length);
M.forEach((m, i) => assertLesson(m.book, m.chapter, m.title, 'misplaced#' + i));

// ---------------- dupes (54 clusters) ----------------
const DUP = [
  'Registry-wide synthesis-chapter template: each book\u2019s "Craft Census" recaps its OWN craft (abstract-algebra\u2019s algebraic structures, topology\u2019s invariants, ...). Different content by design in every book; no specialist owns "recapping a book". Not true duplicates.',
  'Fuzzy cluster. The single true blob copy sits in analytical-chemistry ch8 (OCR\u2019d lab-skills syllabus — chemistry slice to remove). The math member, multivariable-calculus ch4 "Mass, Centres and Moments", is a legitimate multiple-integral application (moments/centroids of mass) and stays.',
  'False positive: only abstract-algebra ch2 owns the topic; its ch4 member is normal-subgroups/factor-groups — a distinct subject fused on "subgroup/group" tokens; the 17 chemistry members are rearrangement REACTIONS (spurious token match, chemistry slice).',
  'Genuine cross-syllabus technique with no single owner: linear-algebra teaches the projection theory, statistics the two-regression-lines treatment, numerical-analysis the curve-fitting use, econometrics/experimental-physics/machine-learning their applied versions. statistics ch5/ch7 members are spurious chi-SQUARE token matches, not least-squares lessons.',
  'The blob exists only in art-history ch1 (OCR\u2019d exam syllabus — arts slice to remove). The math members are fuzzy-matched legitimate lessons: discrete P&C-with-repetition and quantitative-aptitude exam-speed recaps (the survey-vs-exam-speed ladder). Not duplicates of the blob or of each other.',
  'Standard analytic-geometry arrangement: each conic chapter carries its own tangents/normals lesson (circle, parabola, ellipse, hyperbola) with the unified recap in ch8 — that is ch8\u2019s stated purpose. differential-calculus ch5\u2019s is the derivative-based treatment — a different syllabus.',
  'differential-equations ch3 "Growth, Decay and Cooling" is the canonical ODE modeling topic and stays. The true blob copies are EE TOC lines (circuit-theory/electrical-machines/heat-transfer — engineering slices); the physics members are RL-circuit growth/decay lessons.',
  'False positive: trigonometry\u2019s members are compound-angle identities and inverse-trig sums (matched on "compound"/"sums"/"differences" tokens); the voids-in-crystal-lattices topic is inorganic-chemistry\u2019s own.',
  'Not true duplicates: multivariable-calculus owns the conservative VECTOR field criterion (path independence, curl — core vector calculus); the physics members are the force/energy work-energy treatments for the mechanics syllabus.',
  'discrete-mathematics\u2019 rooted/binary trees is the Rosen-style survey unit (math-for-CS syllabus); data-structures owns the implementation-depth treatment — different syllabi. The inorganic-chemistry member is a spurious "binary hydrides" token match.',
  'Not true duplicates: coordinate-geometry computes triangle centres by coordinates; trigonometry\u2019s "Centres and Circircles of a Triangle" is the sine/cosine-rule treatment (circumradius/inradius relations). The geometry member is a circle-angles lesson matched on "centre" — spurious.',
  'The within-coordinate-geometry pair is by design (2D straight-lines concurrency vs 3D lines/planes/skew lines — same chapter-pair structure as ch2 vs ch12). The power-systems member is distance-relay protection (EE — engineering slice).',
  'False positive: topology\u2019s "Products and Quotients" are topological constructions; trigonometry\u2019s product-sum formulas are trig identities; only the differential-calculus member is about differentiation rules. Each stays in its own home.',
  'Genuine syllabus split: differential-equations teaches the damped harmonic oscillator as a second-order-ODE application; circuit-theory\u2019s is the RLC circuit; waves-and-oscillations\u2019 is the driven/nonlinear physics. Three audiences, three treatments.',
  'Not true duplicates: each member uses the phrase in its own sense — discrete math\u2019s disciplinary opener, probability\u2019s discrete/continuous random variables, quantum\u2019s discrete-to-continuous spectrum transition (which belongs in quantum-mechanics — see autoReview veto #23).',
  'Three different subjects fused on tokens: discrete math\u2019s proof unit (strong induction/well-ordering), set-theory\u2019s transfinite induction for ordinals, theory-of-computation\u2019s CS proof toolkit. The discrete member\u2019s bloated title is retitled (see extra).',
  'The topology member is a false positive (preimage continuity — zero CFG content) and must not be removed. The genuine CFG pair (compiler-design vs theory-of-computation) is a CS-slice call: ToC owns formal-language theory; compiler-design teaches parsing for compiler construction — different syllabi.',
  'Genuine syllabus split: engineering methods (mathematical-methods-for-engineering) vs physics methods (mathematical-physics ch1 "The Calculus of Variations") vs Lagrangian mechanics (mechanics ch11) — mirrors the physics-vs-engineering thermodynamics pattern.',
  'The quantitative-aptitude member is the time-and-work topic ("Efficiency, Men and Days, Work and Wages" — matched on the "efficiency" token); transformer regulation/all-day efficiency is electrical-machines\u2019 own (engineering slice). Not duplicates.',
  'Different treatments: geometry ch8\u2019s is the ruler-and-compass construction of incircles/circumcircles/regular polygons; trigonometry ch6\u2019s is the trigonometric solution/area treatment of quadrilaterals and regular polygons — the Properties-of-Triangles capstone.',
  'Different subjects sharing the phrase: coordinate-geometry teaches the polar coordinate SYSTEM; integral-calculus computes areas/lengths via polar INTEGRALS.',
  'coordinate-geometry owns the 3D-analytic-geometry treatment (ch9); the waves-and-oscillations member is the physics use of direction cosines (physics slice to adjudicate its copy).',
  'False positive: strength-of-materials\u2019 "moment-area theorems" are beam-deflection methods (mechanics of materials), not the vector cross product. coordinate-geometry ch11 is the vector-algebra home.',
  'coordinate-geometry owns the vector-algebra treatment; the electricity-and-magnetism member is the EM vector-toolbox recap for the physics syllabus (physics slice to adjudicate).',
  'False positive: mechanics\u2019 "Graphs by Slope and Area" is kinematics graph reading (slope=velocity, area=displacement); coordinate-geometry\u2019s is the registry\u2019s designed doorstep bridge from coordinates to calculus.',
  'False positive: physical-chemistry\u2019s "Elevation and Depression" is colligative properties (boiling-point elevation, freezing-point depression — its ch8 subject); trigonometry\u2019s is the sighting angles. Different subjects sharing the words.',
  'Different applications: integral-calculus owns the partial-fraction decomposition technique for integration; mathematical-methods applies it to Laplace-transform inversion — an engineering-syllabus split.',
  'False positive: integral-calculus\u2019s "The Fundamental Theorems of Calculus" is core content; the actual blob ("Appendix D Some Fundamental Operations of the Calculu") is OCR junk stamped in foundation-chemistry (chemistry slice to remove).',
  'Registry synthesis-chapter template: each book\u2019s course-level craft recaps its own course (complex analysis\u2019s plane theorems; multivariable\u2019s integral theorems). Different content by design.',
  'False positive: the foundation-physics member is action-angle/Hamilton-Jacobi separability (physics slice); differential-equations\u2019 "Variable Separable" is the canonical first-order ODE method.',
  'False positive: linear-algebra\u2019s "Determinants in Coordinate Geometry" is a legitimate determinant-application lesson; the blob is OCR junk in ear-training (arts slice to remove).',
  'linear-algebra owns the linear-map matrix; the properties-of-matter member is the crystallography/materials use (physics slice) — token overlap only.',
  'Designed laddering: combinatorics treats inclusion-exclusion "at Full Depth" (its stated marker); discrete-mathematics teaches it in its counting unit for the CS-math syllabus with derangements. Different depth and syllabus.',
  'Designed laddering (the "Deepened" marker says it): discrete-mathematics introduces equivalence relations for the CS syllabus; set-theory deepens them as formal set-theoretic structure. Different syllabi.',
  'Different treatments: combinatorics treats Hall\u2019s theorem as transversal/matching theory; discrete-mathematics teaches it inside bipartite-graph theory for the CS syllabus.',
  'Designed laddering: discrete-mathematics "meets" Dijkstra in its graph unit (survey depth — "Dijkstra Met"); algorithms derives it in full ("Dijkstra Derived"). Survey vs specialist.',
  'discrete-mathematics\u2019 Trees chapter includes spanning-tree algorithms (Rosen-style CS-math syllabus); algorithms owns the full greedy-algorithm treatment. Survey vs specialist split.',
  'discrete-mathematics\u2019 Boolean-algebra/logic-circuits unit is Rosen-standard; the vlsi-design member is a whole OCR\u2019d EE syllabus blob (engineering slice to clean). Not math-book duplicates.',
  'discrete-mathematics owns Karnaugh-map minimization in its Boolean-algebra unit; the engineering-mechanics member is a wrong-topic stamp in a mechanics book (engineering slice to remove) — not a math duplicate.',
  'Different subjects fused on tokens: combinatorics\u2019 Pascal/binomial identity cascade vs number-theory\u2019s Fibonacci identity cascade (in its Fibonacci chapter).',
  'Genuine syllabus split: number-theory\u2019s cryptography-payoff chapter applies discrete logs for the math syllabus; cryptography owns the protocol-security treatment for CS.',
  'set-theory owns the uncountability proof; theory-of-computation\u2019s diagonal argument is the computability/halting application — different subjects sharing the technique.',
  'False positive: the quantum-chemistry member is orbital probability-DENSITY plots; probability-theory\u2019s is the law of total probability over sample-space partitions.',
  'Different treatments: behavioural-economics owns the cognitive-bias treatment; probability-theory\u2019s base-rate cascade is the Bayes-theorem application for the math syllabus.',
  'False positive: real-analysis\u2019s "The Fundamental Theorem, Proved" is the Fundamental Theorem of CALCULUS (Riemann-integral chapter); complex-analysis\u2019s is Liouville proving the Fundamental Theorem of ALGEBRA. Different theorems sharing tokens.',
  'Genuine syllabus split: complex-analysis owns the full conformal-mapping treatment; mathematical-methods-for-engineering keeps the engineering-speed mirror — its ch6 "Complex Methods for Engineers" exists for exactly that audience.',
  'numerical-analysis owns the Newton-Raphson root-finding method; power-systems\u2019 is the load-flow application (engineering slice). Different syllabi.',
  'Different scope: numerical-analysis ch2\u2019s census chooses among root-finders; mathematical-methods ch7\u2019s is the engineering method-choice survey across the numerical shelf. Not the same lesson.',
  'numerical-analysis owns Runge-Kutta theory (convergence order, stiffness); mathematical-physics\u2019 named treatment serves the physics syllabus. Different syllabi.',
  'Engineering-methods vs physics-methods syllabus split (mirrors the physics-vs-engineering thermodynamics pattern) — both survey treatments for their own audiences.',
  'mathematical-methods treats steps/impulses for Laplace-transform IVPs (engineering math); signals-and-systems teaches them as signal primitives (EE syllabus). Different syllabi.',
  'mathematical-methods uses phasors as its engineering complex-method tool; waves-and-oscillations teaches phasor representation of oscillations (physics syllabus). Different syllabi.',
  'optimization-and-OR owns decision analysis (ch1\u2019s subject); business-mathematics carries the business-course version — a business-vs-OR syllabus split.',
  'OR teaches network-scheduling optimization (ch4); operations-management teaches PERT-CPM as production management — a business-vs-OR syllabus split.',
];
const dupes = plan.dupAdjudicate.map((d, i) => ({ title: d.title, action: 'keep-both', winner: '', reason: DUP[i] }));
if (dupes.length !== DUP.length) throw new Error('dupes reason mismatch ' + dupes.length + ' vs ' + DUP.length);

// ---------------- thin ----------------
const thin = [
  { book: 'discrete-mathematics', chapter: 1, action: 'keep', targetChapter: 0, reason: 'With auto #5 and #23 vetoed and #6 amended to retitle-and-keep, ch1 retains its full trio (discrete viewpoint opener, logic toolkit, sets/functions/sequences at work) — three planned lessons, no merge needed.' },
  { book: 'discrete-mathematics', chapter: 2, action: 'keep', targetChapter: 0, reason: 'Veto of auto #7 keeps all three lessons (algorithms as objects, Big-O growth of functions, complexity census) — a coherent Rosen-style unit; no merge.' },
  { book: 'mathematical-methods-for-engineering', chapter: 7, action: 'keep', targetChapter: 0, reason: 'Vetoes of #14 and #40 keep all four lessons (method-choice census, heat-equation discretization, finite-element idea, calculus of variations) — the numerical-craft arc is intact; no merge.' },
  { book: 'advanced-mathematical-foundations', chapter: 1, action: 'keep', targetChapter: 0, reason: 'Veto of #41 keeps the full three-lesson overview (shelf as one climb, doorstep chain traced end-to-end, where every reader stands); no merge.' },
  { book: 'advanced-mathematical-foundations', chapter: 7, action: 'keep', targetChapter: 0, reason: 'Veto of #16 keeps the closing trio (graduate landscape, the other shelves\u2019 mathematics, the closing page); no merge.' },
];

// ---------------- order ----------------
const order = [
  { book: 'combinatorics', newOrder: [1, 2, 4, 3, 5, 6], reason: 'Recurrence relations (ch4) are the substrate that generating functions (ch3) operate on: ch3\u2019s "Solving Recurrences the Slick Way" currently precedes ch4\u2019s "Linear Recurrences: the General Theory" — applications before the fundamentals they depend on. Swap ch3/ch4 so recurrences come first.' },
];

// ---------------- extra (junkSuspect adjudication + free-scan) ----------------
const JS = brief.junkSuspect;
const jsMap = {};
JS.forEach(j => { (jsMap[j.book + '#' + j.chapter] = jsMap[j.book + '#' + j.chapter] || []).push(j); });
function head(t) { return t.split(' \u2014 ')[0]; }
const extra = [];
function addExtra(book, chapter, title, action, newTitle, reason, targetBook, targetChapter) {
  extra.push({ book, chapter, title, action, targetBook: targetBook || '', targetChapter: targetChapter || 0, newTitle: newTitle || '', reason });
  assertLesson(book, chapter, title, 'extra');
}
// linear-algebra: strip the Axler-essay descriptors to the honest lesson heads
for (const j of jsMap['linear-algebra#4'] || []) {
  if (j.title.startsWith('R\u207f')) addExtra('linear-algebra', 4, j.title, 'retitle', head(j.title), 'Planned title carries an essay-long descriptor after the em dash; strip to the honest head "R\u207f and Subspaces". The descriptor\u2019s content (fields digression, direct sums) remains the lesson\u2019s scope — nothing invented.');
}
for (const j of jsMap['linear-algebra#5'] || []) {
  if (j.title.startsWith('Kernel')) addExtra('linear-algebra', 5, j.title, 'retitle', head(j.title), 'Strip the long descriptor to the honest head "Kernel, Range and Rank-Nullity"; the null-space/injectivity, range/surjectivity and isomorphism content stays the lesson\u2019s scope.');
}
let didDiag = false, didSym = false;
for (const j of jsMap['linear-algebra#6'] || []) {
  if (j.title.startsWith('Diagonalization')) { addExtra('linear-algebra', 6, j.title, 'retitle', head(j.title), 'Strip the descriptor to the honest head "Diagonalization and Cayley\u2013Hamilton"; diagonalizability conditions, commuting operators and the Gershgorin disk remain in scope.'); didDiag = true; }
  if (j.title.startsWith('The Symmetric Promise')) { addExtra('linear-algebra', 6, j.title, 'retitle', 'The Symmetric Promise: Self-Adjoint, Normal and Unitary Operators', 'The title is an Axler blurb, not a lesson title. Honest compression taken from the descriptor itself (which lists the self-adjoint/Hermitian and normal operators, isometries and unitary operators) — no new subject invented.'); didSym = true; }
}
for (const j of jsMap['linear-algebra#8'] || []) {
  if (j.title.startsWith('Quadratic Forms')) addExtra('linear-algebra', 8, j.title, 'retitle', head(j.title), 'Strip the closing-arc descriptor to the honest head "Quadratic Forms and the Conics Re-read"; bilinear forms, determinant-as-volume and the tensor product remain in scope.');
}
if (!didDiag || !didSym) throw new Error('LA ch6 junkSuspects not both found');
// discrete-mathematics omnibus (also amended as auto #6)
for (const j of jsMap['discrete-mathematics#1'] || []) {
  if (j.title.startsWith('Sets (')) addExtra('discrete-mathematics', 1, j.title, 'retitle', 'Sets, Functions and Sequences at Work', 'Strip the parenthetical inventory; sets, functions and sequences are core discrete content (the "at Work" survey) — keep the lesson, clean the title. Matches the autoReview amendment of auto #6.');
}
for (const j of jsMap['discrete-mathematics#3'] || []) {
  if (j.title.startsWith('Strong Induction')) addExtra('discrete-mathematics', 3, j.title, 'retitle', 'Strong Induction, Well-Ordering and the Proof Census', 'Strip the trailing parenthetical (Implication, Converse, Contrapositive, Contradiction) — a bloated enumeration, not junk; the lesson stays.');
}
// keeps
const trigAllied = (jsMap['trigonometry#2'] || []).find(j => j.title.startsWith('Allied'));
if (!trigAllied) throw new Error('trig allied not found');
addExtra('trigonometry', 2, trigAllied.title, 'keep', '', 'Allied angles (the n\u00d790\u00b0\u00b1\u03b8 machine) is a real, standard topic; the \u00d7 and \u00b1 are honest mathematics, not OCR junk. The flag was character-driven.');
const deFOHD = (jsMap['differential-equations#2'] || [])[0];
if (!deFOHD) throw new Error('DE FOHD not found');
addExtra('differential-equations', 2, deFOHD.title, 'keep', '', '"First order, higher degree: solvable for p, Clairaut and Lagrange" is the exact standard ODE topic (equations solvable for p; Clairaut and Lagrange equations). Honest title, correct chapter.');
const combDesigns = (jsMap['combinatorics#5'] || [])[0];
if (!combDesigns) throw new Error('comb designs not found');
addExtra('combinatorics', 5, combDesigns.title, 'keep', '', 'Block designs, Steiner systems and Latin squares are core design theory — combinatorics\u2019 own subject; the enumerated title is informative, not junk.');
const raLebesgue = (jsMap['real-analysis#9'] || [])[0];
if (!raLebesgue) throw new Error('RA lebesgue not found');
addExtra('real-analysis', 9, raLebesgue.title, 'keep', '', 'The Lebesgue doorstep (measure, measurable functions, simple functions) is the designed bridge from the Riemann integral to measure theory — real-analysis\u2019s own closing doorstep; title is honest.');

// ---------------- assemble + validate ----------------
const verdict = {
  agent: 'mathematics',
  autoReview,
  misplaced,
  dupes,
  thin,
  order,
  extra,
  notes: 'Math shelf is structurally clean. All 31 misplaced flags were token-score false positives — every one kept in place (the scores had routed e.g. Stewart\u2019s theorem to statistics and the complete maxima/minima tests to business-mathematics). 40 of 42 auto-actions vetoed or amended: the score engine misrouted core mathematics to other disciplines (solids of revolution -> environmental-studies, model theory -> foundation-chemistry, hyperbolic functions -> heat-and-thermodynamics) and foreign junk toward our books; the 2 approvals are #34 (positive-definite matrices -> eigenvalue chapter) and #39 (Sturm-Liouville -> PDE chapter). All 54 dup clusters resolved keep-both: the bulk are false-positive token matches protecting legitimate lessons (topology\u2019s preimages vs CFGs; real-analysis\u2019s FTC vs Liouville\u2019s FTA; trig compound angles vs chemistry\u2019s voids), the rest are genuine cross-syllabus mirrors (physics/engineering/business vs math treatments, and the discrete-survey vs combinatorics-specialist ladder). All 5 thin chapters were artifacts of the vetoed auto-actions and are restored to full size. junkSuspects: 7 retitles (strip Axler-essay bloat from linear-algebra titles and two discrete omnibus titles), 4 keeps. One order fix: combinatorics recurrences before generating functions. Zero removals from any of the 28 math books — no junk was found in our own planned lists, and the authored four were not touched in either direction.',
};

const ids = brief.books.map(b => b.id);
const EXEMPT = ['foundation-mathematics', 'arithmetic-and-number-systems', 'elementary-algebra', 'advanced-algebra'];
for (const m of [...verdict.misplaced, ...verdict.extra]) {
  if (!ids.includes(m.book)) throw new Error('unknown book ' + m.book);
  if (m.action === 'move' && EXEMPT.includes(m.targetBook)) throw new Error('move INTO exempt book!');
}
for (const e of verdict.autoReview) if (e.targetBook && e.action === 'move' && EXEMPT.includes(e.targetBook)) throw new Error('move INTO exempt book!');
fs.writeFileSync(path.join(DIR, 'verdicts', 'mathematics.json'), JSON.stringify(verdict, null, 2));
console.log('WROTE verdicts/mathematics.json');
console.log('autoReview entries:', verdict.autoReview.length, '| misplaced:', verdict.misplaced.length, '| dupes:', verdict.dupes.length, '| thin:', verdict.thin.length, '| order:', verdict.order.length, '| extra:', verdict.extra.length);
