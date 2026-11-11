import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 1: Functions as Objects
 *
 * LESSONS WRITTEN: 1.1 "Relations: the Set-of-Pairs View" (run 90 —
 *                  quiz keys [3, 2, 1, 0, 2], 14 exercises, two figures —
 *                  the arrow diagram of the x < y relation + the mod-5
 *                  class packaging; the machine becomes an object: the
 *                  cartesian product recalled as the census of all
 *                  pairings, the relation as a CHOSEN subset of it, the
 *                  three displays (roster, set-builder, arrow diagram),
 *                  domain/range/codomain with the containment law, the
 *                  2^pq count derived from the ANS subset census, the
 *                  inverse relation with its swap laws, the type census
 *                  (empty, universal, trivial, identity vs reflexive —
 *                  the census that identity ⇒ reflexive but never back,
 *                  symmetric, transitive, equivalence), the mod-5 and
 *                  same-parity classes computed and partitioned, and the
 *                  function as the special relation that is total and
 *                  single-valued, with the n^m count and the either-or
 *                  verdicts the next lesson cashes).
 *                  1.2 "One-One and Onto: Classifying the Machines"
 *                  (run 90 — quiz keys [1, 2, 1, 0, 3], 14 exercises,
 *                  two figures — the horizontal-probe twins + the
 *                  pigeonhole/count panel; the machine is classified by
 *                  two independent questions: does it WASTE inputs
 *                  (one-one, the contrapositive discipline, the
 *                  factorisation argument on x³ + x + 1 with its
 *                  never-negative companion, the witness discipline for
 *                  many-one, the horizontal probe derived) and does it
 *                  COVER the codomain (onto, the two methods, the trim
 *                  discipline, the 2×2 verdict table with all four
 *                  cells priced), then the finite-set verdicts — the
 *                  pigeonhole laws, the injection count ⁿPₘ, the
 *                  surjection count by inclusion–exclusion derived and
 *                  stated in BOTH directions (the module's illustration
 *                  as printed swaps the direction of the onto count; this
 *                  book's corrected pair is verified by brute force in
 *                  scripts/verify-book4-ch01.ts section F), the n!
 *                  bijection count, the restriction re-classification,
 *                  and the bijective = invertible promise lesson 1.4
 *                  cashes).
 *
 * VERIFY-FIRST (2026-11-11, run 90): every number in 1.1 and 1.2 was
 * recomputed by scripts/verify-book4-ch01.ts BEFORE any prose existed —
 * 235 pre-writing checks green (sections A–G: the relation engine, the
 * type-census engine with the brute-force equivalence count 5 on a 3-set,
 * the function engine, the one-one engine, the onto engine, the counting
 * engine with every m, n ≤ 5 brute-forced against the formulas, and the
 * pinned quiz/exercise keys), then sections H/I audited the authored
 * files. Research: the Drive M4-01 module (vision-transcribed 1.10–1.25)
 * + JEE/NCERT syllabus web-checks — the master plan is
 * docs/research/AA_CH01_MASTER_PLAN.md.
 *
 * CROSS-REFERENCES: opens on AL 11.3's doorstep (al-the-function-idea-
 * the-doorstep); divisibility examples lean on ANS
 * (ans-the-algebra-of-divisibility); the Set Theory book (planned) will
 * rebuild relations/functions/equivalences from the foundations — named
 * forward once, never duplicated; the pigeonhole ground is FM's; the
 * vertex fold is AL's parabola lesson (al-the-parabola-quadratic-graphs-
 * and-vertices).
 */

/* ------------------------------------------------------------------ */
/* figures — the vivid figure palette (BOOK_FORMAT.md)                 */
/* ------------------------------------------------------------------ */

/** 1.1 — the arrow diagram of R = {(x, y): x < y} from A to B */
function arrowDiagramSvg(): string {
  const dot = (cx: number, cy: number, label: string, neverHit: boolean): string =>
    `<circle cx="${cx}" cy="${cy}" r="17" fill="${neverHit ? '#fffdf5' : '#16a34a'}" stroke="${neverHit ? '#dc2626' : '#166534'}" stroke-width="2"/>` +
    `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${neverHit ? '#dc2626' : '#ffffff'}">${label}</text>`

  const arrow = (x1: number, y1: number, x2: number, y2: number): string => {
    // shorten to stop at the dot's edge
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const sx = x1 + ux * 19
    const sy = y1 + uy * 19
    const ex = x2 - ux * 21
    const ey = y2 - uy * 21
    return `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#d97706" stroke-width="2.4"/>` +
      `<polygon points="${ex.toFixed(1)},${ey.toFixed(1)} ${(ex - ux * 9).toFixed(1)},${(ey - uy * 9 - 4.5).toFixed(1)} ${(ex - ux * 9).toFixed(1)},${(ey - uy * 9 + 4.5).toFixed(1)}" fill="#d97706"/>`
  }

  return `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arrow diagram of the relation x less than y from set A to set B">
  <ellipse cx="170" cy="165" rx="125" ry="112" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>
  <ellipse cx="550" cy="170" rx="120" ry="110" fill="#ffedd5" stroke="#16a34a" stroke-width="2.4"/>
  <text x="170" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">A (the inputs)</text>
  <text x="550" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">B (the codomain)</text>
  ${dot(150, 90, '1', false)}
  ${dot(110, 200, '4', false)}
  ${dot(240, 232, '5', false)}
  ${dot(545, 85, '1', true)}
  ${dot(490, 240, '2', false)}
  ${dot(610, 170, '7', false)}
  ${arrow(150, 90, 490, 240)}
  ${arrow(150, 90, 610, 170)}
  ${arrow(110, 200, 610, 170)}
  ${arrow(240, 232, 610, 170)}
  <text x="545" y="130" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">never hit</text>
  <text x="170" y="298" text-anchor="middle" font-size="14" fill="#0f766e">domain = {1, 4, 5} — every input fires</text>
  <text x="560" y="298" text-anchor="middle" font-size="14" fill="#0f766e">range = {2, 7} ⊆ codomain {1, 2, 7}</text>
  <text x="360" y="316" text-anchor="middle" font-size="14" fill="#65a30d">R = {(1,2), (1,7), (4,7), (5,7)} — the arrows ARE the relation</text>
</svg>`
}

/** 1.1 — the mod-5 equivalence classes packaging {0, …, 12} */
function mod5ClassesSvg(): string {
  const members = [
    ['[0]', ['0', '5', '10']],
    ['[1]', ['1', '6', '11']],
    ['[2]', ['2', '7', '12']],
    ['[3]', ['3', '8']],
    ['[4]', ['4', '9']],
  ]
  const boxes = members
    .map(([label, vals], i) => {
      const x = 12 + i * 141
      const items = (vals as string[]).map((v, j) => `<text x="${x + 64}" y="${128 + j * 34}" text-anchor="middle" font-size="19" font-weight="600" fill="#166534">${v}</text>`).join('')
      return (
        `<rect x="${x}" y="66" width="128" height="170" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.4"/>` +
        `<path d="M${x},106 L${x},76 Q${x},66 ${x + 10},66 L${x + 118},66 Q${x + 128},66 ${x + 128},76 L${x + 128},106 Z" fill="#16a34a"/>` +
        `<text x="${x + 64}" y="93" text-anchor="middle" font-size="19" font-weight="700" fill="#ffffff">${label}</text>` +
        items
      )
    })
    .join('')
  return `<svg viewBox="0 0 720 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five remainder classes mod 5 packaging the integers 0 to 12">
  <text x="360" y="34" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">same remainder on division by 5 — thirteen integers, five boxes</text>
  ${boxes}
  <text x="360" y="272" text-anchor="middle" font-size="14" fill="#0f766e">every integer sits in exactly one box (a partition); −3 lives in [2] beside 2, 7 and 12</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 1.1                                                          */
/* ------------------------------------------------------------------ */

const lesson11: Lesson = {
  id: 'aa-relations-the-set-of-pairs-view',
  number: '1.1',
  title: 'Relations: the Set-of-Pairs View',
  concepts: [
    'cartesian product as the census of all pairings',
    'relation as a chosen subset of A × B',
    'roster, set-builder and arrow-diagram displays',
    'domain, range and codomain',
    'the type census: empty, universal, identity, reflexive',
    'symmetric and transitive relations',
    'equivalence relations and their classes',
    'the function as a total, single-valued relation',
  ],
  objectives: [
    'treat a relation as a concrete object — a chosen subset of the cartesian product — and display it as a roster, a set-builder rule or an arrow diagram',
    'read the domain, range and codomain off any of the three displays, with the containment law Range ⊆ Codomain proved by inspection',
    'count relations with the 2^(pq) law and functions with the n^m law, and keep the two counts apart',
    'classify relations as empty, universal, trivial, identity, reflexive, symmetric, transitive — and prove an equivalence by checking all three properties',
    'read equivalence classes as the packaging an equivalence imposes, and verify that the classes partition the set',
    'state the two extra demands (totality and single-valuedness) that promote a relation into a function, and judge rosters against them',
  ],
  prerequisites: ['al-the-function-idea-the-doorstep', 'ans-the-algebra-of-divisibility'],
  sources: ['cengage-m2-algebra', 'cengage-jee-style', 'ncert-math12-ch1-relations-functions', 'ncert-math11-ch2-functions', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra ended at a doorway. The last lesson of that book built the input–output machine: feed it $x$, the rule $f(x)$ answers with one output; the domain filters the legal inputs, the vertical probe settles which curves are machines at all, and the range reads off the fold of the graph. That machine is about to become an object in its own right — something we can count, classify, combine and undo. This book is the algebra of machines.' },
    { kind: 'para', text: 'The first move is the humblest and the deepest in the whole chapter: **write down the pairs.** A machine that turns inputs into outputs secretly keeps a list — one line per input, recording which output it produced. Keep the list and throw the mechanism away, and you still hold everything the machine ever did. That list is called a *relation*, and this lesson builds it honestly: the set it lives inside, the ways to display it, the numbers that count it, the properties that classify it, and the two extra demands that promote it into a *function*.' },

    { kind: 'heading', text: 'The Census of All Pairings' },
    { kind: 'para', text: 'Take two sets. To pair their elements we first need the census of every *possible* pairing — first slot from the first set, second slot from the second. That census is the cartesian product, the construction Coordinate Geometry will soon paint across a whole plane.' },
    { kind: 'callout', tone: 'definition', title: 'Cartesian product', text: 'For sets $A$ and $B$, the cartesian product $A \\times B$ is the set of ALL ordered pairs with first entry from $A$ and second entry from $B$: thus, $A \\times B = \\{(a, b) : a \\in A,\\ b \\in B\\}$. The pair is ORDERED — $(1, 2)$ and $(2, 1)$ are different members.' },
    { kind: 'para', text: 'For example, with $A = \\{1, 4, 5\\}$ and $B = \\{1, 2, 7\\}$, the product has nine members: $(1,1)$, $(1,2)$, $(1,7)$, $(4,1)$, $(4,2)$, $(4,7)$, $(5,1)$, $(5,2)$, $(5,7)$. The count is no accident — the FM counting principle prices it: each of the 3 choices for the first slot meets each of the 3 choices for the second, so $n(A \\times B) = n(A) \\cdot n(B)$, here $3 \\cdot 3 = 9$. Nine pairings exist; which of them we KEEP is up to us.' },

    { kind: 'heading', text: 'The Relation: a Chosen Subset' },
    { kind: 'callout', tone: 'definition', title: 'Relation', text: 'A relation $R$ from a set $A$ to a set $B$ is a subset of $A \\times B$ — a set of ordered pairs. Thus, $R \\subseteq A \\times B$. When the two sets are the same, a relation ON $A$ is a subset of $A \\times A$. The notation $a\\,R\\,b$ says the same thing as $(a, b) \\in R$.' },
    { kind: 'para', text: 'For example, choose the rule “keep only the pairs whose first entry is LESS than the second.” From the nine pairings above, four survive: $R = \\{(1, 2), (1, 7), (4, 7), (5, 7)\\}$. The honest point deserves a box of its own:' },
    { kind: 'callout', tone: 'insight', title: 'Any subset is a relation — the rule is OUR choice', text: 'Nothing in the definition demands a “relationship” between the entries. $R = \\{(1, 7), (5, 2)\\}$ — two pairs picked on a whim — is a perfectly legal relation from $A$ to $B$. We usually choose the subset BY a rule so that the pairs carry meaning, but the mathematics never checks our motives. This is exactly the freedom that will let a machine’s pair-list be arbitrary yet precise.' },
    { kind: 'para', text: 'A relation wears three displays, and fluent reading means switching among them without effort:' },
    { kind: 'list', marker: 'roman', items: [
      '**Roster form** — the pairs listed outright, the algebraist’s display: $R = \\{(1, 2), (1, 7), (4, 7), (5, 7)\\}$.',
      '**Set-builder form** — the rule itself, the display that scales: $R = \\{(x, y) : x < y,\\ x \\in A,\\ y \\in B\\}$.',
      '**Arrow diagram** — two blobs and drawn arrows, the display the eye trusts; the figure below is exactly the four pairs above.',
    ] },
    { kind: 'figure', caption: 'The relation “first entry less than second entry,” drawn as an arrow diagram from A to B. The four amber arrows are literally the four ordered pairs of R; the input 1 fires twice (allowed — a relation may reuse inputs), the target 1 is never hit, and every input fires at least once here only because this particular rule happened to say so.', svg: arrowDiagramSvg() },

    { kind: 'heading', text: 'Domain, Range, Codomain' },
    { kind: 'terms', items: [
      { term: 'domain of a relation', def: 'the set of all FIRST entries of the pairs — which inputs actually appear in $R$' },
      { term: 'range of a relation', def: 'the set of all SECOND entries of the pairs — which outputs actually appear in $R$' },
      { term: 'codomain', def: 'the whole second set $B$ that the relation was declared INTO — every target, hit or not' },
    ] },
    { kind: 'para', text: 'In the arrow diagram: the domain is $\\{1, 4, 5\\}$ (all three inputs fired), the range is $\\{2, 7\\}$ (two targets hit), and the codomain is $\\{1, 2, 7\\}$ (the whole blob $B$). The domain is always a subset of $A$ and the range always a subset of $B$, so:' },
    { kind: 'equation', latex: '\\mathrm{Range}(R) \\subseteq \\mathrm{Codomain}(R)', note: 'the range is the codomain’s USED part; the containment can be proper — target 1 above is never hit' },
    { kind: 'callout', tone: 'warn', title: 'Codomain is a declaration, range is a fact', text: 'Students lose marks reading the codomain off the arrows. The codomain is DECLARED when the relation is set up (“from $A$ into $B$”); the range is DISCOVERED by looking at the pairs. Two relations can share every pair yet have different codomains — the declaration is part of the data.' },

    { kind: 'heading', text: 'Illustrations: Reading Relations' },
    { kind: 'example', title: 'Write the divisibility relation on A = {2, 3, 4, 6, 12} in roster form and read its domain and range', steps: [
      'The rule: keep $(a, b)$ when $b$ divides $a$ with no remainder — the ground Arithmetic and Number Systems banked.',
      'Run every pair of $A \\times A$ through the rule: 2 is divisible by 2; 3 by 3; 4 by 2 and 4; 6 by 2, 3 and 6; 12 by 2, 3, 4, 6 and 12.',
      'So, $R$ keeps twelve pairs of the twenty-five possible: $(2,2)$, $(3,3)$, $(4,2)$, $(4,4)$, $(6,2)$, $(6,3)$, $(6,6)$, $(12,2)$, $(12,3)$, $(12,4)$, $(12,6)$, $(12,12)$.',
      'Hence the domain is all of $A$ (every element is divisible by itself, so every input fires), and the range is also all of $A$ — 12 is divisible by everything in the set, so even 4 and 6 are hit as second entries.',
    ] },
    { kind: 'example', title: 'R = {(x, y): x, y ∈ W, x² + y² = 25}. Find the domain and range', steps: [
      'Both entries are whole numbers, so hunt the whole-number points on the circle of radius 5 — the ANS ground of squares.',
      'Check the candidates: $0^2 + 5^2 = 25$, $3^2 + 4^2 = 25$, and the swaps; every other whole-number pair overshoots or undershoots.',
      'So, $R = \\{(0, 5), (3, 4), (4, 3), (5, 0)\\}$ — four pairs, a finite relation cut from an infinite curve.',
      'Hence domain $= \\{0, 3, 4, 5\\}$ and range $= \\{5, 4, 3, 0\\}$ — the same set, because the circle rule treats both entries equally: this relation is its own inverse.',
    ] },
    { kind: 'example', title: 'R₁ = {(x, y): y = 2x − 1, x ∈ [−4, 6]}. Find the domain and range', steps: [
      'The domain is declared by the rule itself: $x$ may be any real number from $-4$ to $6$, so the domain is the interval $[-4, 6]$.',
      'The outputs ride the line $y = 2x - 1$, which climbs as $x$ climbs — the AL slope discipline.',
      'At the ends: $2(-4) - 1 = -9$ and $2(6) - 1 = 11$; every value between is attained because the line never jumps.',
      'Hence the range is $[-9, 11]$ — an interval relation, read off the fold just as a graph’s range was.',
    ] },

    { kind: 'heading', text: 'How Many Relations Exist?' },
    { kind: 'para', text: 'Counting relations is a two-step thought, and each step is a law you already own. If $n(A) = p$ and $n(B) = q$, then $A \\times B$ has $pq$ members — the first count. A relation is ANY subset of that product, and the ANS power-set census says a set of $n$ members has $2^n$ subsets — the second count. Chain them:' },
    { kind: 'derivation', title: 'Counting the relations: the subset census chained', statement: 'Why are there exactly $2^{pq}$ relations from a p-element set A to a q-element set B?', steps: [
      { label: 'Count the pairings', formula: 'n(A \\times B) = n(A) \\cdot n(B) = p q', explanation: 'the FM counting principle: each of the p first-choices meets each of the q second-choices — the product IS the pool a relation draws from.' },
      { label: 'Count the subsets of the pool', formula: '\\#\\{\\text{subsets of a } pq\\text{-element set}\\} = 2^{p q}', explanation: 'the ANS power-set law: each of the pq pairings is independently kept or dropped — two choices per pairing, chained.' },
      { label: 'Identify the two counts', formula: '\\text{relation} \\iff \\text{subset of } A \\times B', explanation: 'this lesson’s definition IS “any subset” — so counting relations is counting subsets, exactly.' },
    ], result: 'The number of relations from A to B is $2^{pq}$ — e.g. $2^{2 \\cdot 3} = 2^6 = 64$ from a 2-set to a 3-set, and $2^{3 \\cdot 4} = 2^{12} = 4096$ from a 3-set to a 4-set.' },
    { kind: 'equation', latex: '\\text{number of relations from } A \\text{ to } B = 2^{\\,p q} \\quad (n(A) = p,\\ n(B) = q)', note: 'pq possible pairings, each kept or dropped — a subset of the product' },
    { kind: 'para', text: 'For example, from a 2-element set to a 3-element set there are $2^{2 \\cdot 3} = 2^6 = 64$ relations; from a 3-element set to a 4-element set, $2^{12} = 4096$. The count explodes fast — which is why examinations love it.' },
    { kind: 'callout', tone: 'insight', title: 'A graph is a relation', text: 'Every point of the coordinate plane is an ordered pair of $\\mathbb{R} \\times \\mathbb{R}$, so any curve drawn on the plane is a subset of $\\mathbb{R} \\times \\mathbb{R}$ — a relation on the reals. The parabola-picture of AL chapter 10 was a relation all along; the vertical probe of AL 11.3 was asking whether that relation deserves promotion to a function. This lesson is about to make that promotion law.' },

    { kind: 'heading', text: 'The Inverse Relation' },
    { kind: 'para', text: 'Every relation carries a twin with the slots swapped:' },
    { kind: 'callout', tone: 'definition', title: 'Inverse relation', text: 'For a relation $R$ from $A$ to $B$, the inverse $R^{-1}$ is the relation from $B$ to $A$ defined by keeping the flipped pairs: thus, $R^{-1} = \\{(b, a) : (a, b) \\in R\\}$, and $(a, b) \\in R \\iff (b, a) \\in R^{-1}$.' },
    { kind: 'para', text: 'For example, with $R = \\{(1, 2), (3, 2), (5, 7)\\}$ from $A = \\{1, 3, 5\\}$ to $B = \\{2, 7\\}$, the inverse is $R^{-1} = \\{(2, 1), (2, 3), (7, 5)\\}$ from $B$ to $A$. Swapping every pair swaps the roles of the sets, so the domain–range swap is a law, not an accident:' },
    { kind: 'equation', latex: '\\mathrm{Dom}(R^{-1}) = \\mathrm{Rng}(R), \\qquad \\mathrm{Rng}(R^{-1}) = \\mathrm{Dom}(R)', note: 'and flipping twice restores everything: (R⁻¹)⁻¹ = R' },

    { kind: 'heading', text: 'The Type Census' },
    { kind: 'para', text: 'A relation on a set can be profiled by its shape. The census runs from the two degenerate extremes to the three structural properties that end in the equivalence relations — the deepest packaging idea the chapter will reuse.' },
    { kind: 'callout', tone: 'definition', title: 'Empty, universal and trivial relations', text: 'The EMPTY relation on $A$ is $\\varnothing$ — no pair kept, no element related to any element. The UNIVERSAL relation is $A \\times A$ itself — everything related to everything. The two together are called the TRIVIAL relations: the pair of them brackets every other relation on $A$.' },
    { kind: 'callout', tone: 'definition', title: 'Identity relation', text: 'On a set $A$, the identity relation is $I_A = \\{(a, a) : a \\in A\\}$ — every element related to itself AND to nothing else.' },
    { kind: 'para', text: 'For example, on $A = \\{1, 2, 3\\}$ the identity is $\\{(1,1), (2,2), (3,3)\\}$. The identity must not be confused with its more forgiving cousin below — the distinction is a classic examination trap:' },
    { kind: 'callout', tone: 'definition', title: 'Reflexive relation', text: 'A relation $R$ on $A$ is reflexive when every element is related to ITSELF: thus, $(a, a) \\in R$ for every $a \\in A$. It is not reflexive the moment even one diagonal pair is missing.' },
    { kind: 'para', text: 'For example, on $A = \\{1, 2, 3\\}$ the relation $\\{(1,1), (2,2), (3,3), (1,3)\\}$ IS reflexive — all three diagonal pairs are present — but it is NOT the identity, because the extra pair $(1, 3)$ relates 1 to something besides itself. The moral:' },
    { kind: 'callout', tone: 'theorem', title: 'Identity ⇒ reflexive; reflexive ⇏ identity', text: 'Every identity relation is reflexive (the diagonal is exactly its whole content). A reflexive relation may carry extra off-diagonal pairs — reflexivity demands the diagonal be INCLUDED, not EXHAUSTIVE. (The universal relation is reflexive too; the empty relation is not, unless $A$ itself is empty.)' },
    { kind: 'para', text: 'For example, reflexivity also lives outside rosters: “$x \\geq y$ on the naturals” is reflexive (every number rivals itself); “$b$ divides $a$” on any set of positive integers is reflexive (the self-division $a \\mid a$ never has a remainder — ANS banked it); “a line is parallel to a line” is reflexive under the standard convention that a line counts as parallel to itself.' },
    { kind: 'callout', tone: 'definition', title: 'Symmetric relation', text: 'A relation $R$ on $A$ is symmetric when belonging survives swapping: thus, $(a_1, a_2) \\in R \\Rightarrow (a_2, a_1) \\in R$ for all $a_1, a_2 \\in A$.' },
    { kind: 'para', text: 'For example, “$x + y = 8$” on $\\{1, \\ldots, 7\\}$ is symmetric — addition commutes, so the seven pairs $\\{(1,7), (2,6), \\ldots, (7,1)\\}$ come in mirrored couples with $(4,4)$ self-mirrored. Divisibility is NOT: $(4, 2) \\in R$ (2 divides 4) while $(2, 4) \\notin R$ (4 does not divide 2).' },
    { kind: 'callout', tone: 'definition', title: 'Transitive relation', text: 'A relation $R$ on $A$ is transitive when relating chains through: thus, $(a_1, a_2) \\in R$ and $(a_2, a_3) \\in R$ together imply $(a_1, a_3) \\in R$, for all $a_1, a_2, a_3 \\in A$.' },
    { kind: 'para', text: 'For example, “$x < y$” is transitive (a chain of strict climbs closes into one climb); divisibility is transitive (the ANS tower $12 \\to 6 \\to 2$ closes as $12 \\to 2$). But “$x + y = 8$” is NOT transitive: $(1, 7)$ and $(7, 1)$ belong, yet $(1, 1)$ does not — symmetry with a 8-sum can chain into a 2-sum.' },
    { kind: 'example', title: 'Show that R = {(a, b): a ≤ b²} on the positive reals is neither reflexive, nor symmetric, nor transitive', steps: [
      'Reflexive? Test the diagonal: $a \\leq a^2$ fails whenever $0 < a < 1$ — take $a = \\tfrac{1}{2}$: the claim $\\tfrac{1}{2} \\leq \\tfrac{1}{4}$ is false, so $(\\tfrac{1}{2}, \\tfrac{1}{2}) \\notin R$.',
      'Symmetric? Exhibit one one-way pair: $(1, 4) \\in R$ since $1 \\leq 16$, but $(4, 1) \\notin R$ since $4 > 1$.',
      'Transitive? Exhibit a broken chain: $(3, 2) \\in R$ since $3 \\leq 4$ and $(2, \\tfrac{3}{2}) \\in R$ since $2 \\leq \\tfrac{9}{4}$, but $(3, \\tfrac{3}{2}) \\notin R$ since $3 > \\tfrac{9}{4}$.',
      'Hence one relation, three failed properties — each killed by a single witness, which is all any counterexample ever needs.',
    ] },
    { kind: 'callout', tone: 'definition', title: 'Equivalence relation', text: 'A relation on $A$ that is reflexive AND symmetric AND transitive is called an equivalence relation. Thus, $\\sim$ is an equivalence when $a \\sim a$ always; $a \\sim b$ forces $b \\sim a$; and $a \\sim b \\sim c$ forces $a \\sim c$.' },
    { kind: 'example', title: 'Prove that R = {(a, b): a − b is divisible by 5} on the integers is an equivalence relation', steps: [
      'Reflexive: $a - a = 0 = 5 \\cdot 0$, so every integer relates to itself.',
      'Symmetric: if $a - b = 5k$ then $b - a = -5k = 5(-k)$ — the negation of a multiple of 5 is a multiple of 5.',
      'Transitive: if $a - b = 5k$ and $b - c = 5m$, then $a - c = (a - b) + (b - c) = 5(k + m)$ — multiples of 5 add to a multiple of 5.',
      'Hence all three properties hold: $R$ is an equivalence relation — the congruence mod 5 that number theory leans on.',
    ] },
    { kind: 'para', text: 'The same three-line machine proves “$|a - b|$ is even” an equivalence on the integers: $|a - a| = 0$ is even; $|b - a| = |-(a - b)| = |a - b|$; and two even differences add to an even difference. On $\\{1, \\ldots, 8\\}$ this equivalence sorts the elements into two families:' },
    { kind: 'equation', latex: '[1] = \\{1, 3, 5, 7\\} \\quad \\text{(the odds)}, \\qquad [2] = \\{2, 4, 6, 8\\} \\quad \\text{(the evens)}', note: 'the CLASSES of the relation — every element belongs to exactly one' },
    { kind: 'para', text: 'That sorting is not decoration — it is what equivalence relations are FOR. An equivalence relation is a packaging rule that never disagrees with itself, and its boxes partition the set completely:' },
    { kind: 'figure', caption: 'The congruence-mod-5 equivalence packaging the integers 0 to 12 into its five remainder classes. Each box is the class [r] of everything congruent to r; the classes are disjoint (no integer has two remainders) and exhaustive (every integer has one). This one picture is the whole idea: an equivalence relation ON a set IS a partition OF the set.', svg: mod5ClassesSvg() },
    { kind: 'callout', tone: 'theorem', title: 'Classes partition the set', text: 'For an equivalence relation, the class $[a] = \\{b : (a, b) \\in R\\}$ of every element is non-empty (reflexivity puts $a$ in its own class), classes either coincide or never overlap (symmetry + transitivity), and the union of all classes is the whole set. Distinct boxes, everything boxed — a partition.' },
    { kind: 'callout', tone: 'warn', title: 'Symmetric + reflexive ≠ transitive', text: 'The three properties are independent — two never buy the third. On the reals, $R = \\{(a, b) : 1 + ab > 0\\}$ is reflexive ($1 + a^2 > 0$ always) and symmetric ($ab = ba$), yet NOT transitive: $(3, 0.3)$ belongs ($1 + 0.9 > 0$), $(0.3, -3)$ belongs ($1 - 0.9 > 0$), but $(3, -3)$ does not ($1 - 9 < 0$). Examinations set exactly this trap.' },

    { kind: 'heading', text: 'From Relation to Function' },
    { kind: 'para', text: 'Now the promotion. Among all $2^{pq}$ relations from $A$ to $B$, a special family deserves the machine’s name. Look back at the arrow diagram of $x < y$: the input 1 fires TWO arrows. A machine may not do that — feed the same input twice and it must answer the same way both times. And a relation may quietly leave an input silent — no arrows at all from 4 in some other relation — while a machine owes EVERY input an answer. Two demands, two names:' },
    { kind: 'callout', tone: 'definition', title: 'Function (mapping)', text: 'A relation $f$ from $A$ to $B$ is a FUNCTION, written $f : A \\to B$, when it is TOTAL — every $a \\in A$ owns at least one pair — and SINGLE-VALUED — no two pairs of $f$ share a first element. Thus, $\\mathrm{Dom}(f) = A$ and $(a, b_1), (a, b_2) \\in f \\Rightarrow b_1 = b_2$. The second entry is the IMAGE of the first; the first is a PREIMAGE of the second.' },
    { kind: 'para', text: 'For example, on $A = \\{1, 2, 3\\}$ into $\\{a, b, c\\}$, judge the four rosters:' },
    { kind: 'list', marker: 'roman', items: [
      '$\\{(1, a), (2, b), (3, c)\\}$ — total and single-valued: a function (the perfect pairing).',
      '$\\{(1, a), (1, b), (2, c), (3, d)\\}$ — the input 1 carries TWO images: single-valuedness fails, not a function.',
      '$\\{(1, a), (2, b)\\}$ — the input 3 is silent: totality fails, not a function.',
      '$\\{(1, b), (2, b), (3, b)\\}$ — every input answers, and all answer the same: a function. Sharing images is LEGAL — three preimages of $b$ — and this is exactly the “many-one” habit the next lesson classifies.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The vertical probe was this definition in disguise', text: 'AL 11.3’s vertical-line test said a curve is a machine when no vertical line cuts it twice. A vertical line at $x = c$ gathers all pairs with first entry $c$; “cut at most once” IS single-valuedness. The probe said nothing about totality because AL’s curves were declared on their natural domains — the domain law was doing the quiet half.' },
    { kind: 'para', text: 'Counting the promotions sharpens the distinction. A function from $A$ to $B$ must commit every input to exactly one target — each of the $m = n(A)$ inputs independently chooses one of the $n = n(B)$ targets, so the choices chain by the FM counting principle:' },
    { kind: 'equation', latex: '\\text{number of functions } A \\to B = n^{\\,m} \\quad (n(B) = n,\\ n(A) = m)', note: 'each input picks one target: n × n × … × n, m times — compare 2^{pq} relations, of which only n^m are functions' },
    { kind: 'para', text: 'For example, from a 2-element set to a 3-element set: $2^{6} = 64$ relations exist, but only $3^2 = 9$ of them are functions — 55 relations waste an input or double-commit one. The two counts answer different questions and must never be swapped under exam pressure.' },
    { kind: 'example', title: 'Is R = {(ab, a + b): a, b ∈ ℕ} a function from ℕ to ℕ?', steps: [
      'Test single-valuedness on a first entry with two factorisations: 12 splits as $1 \\cdot 12$, $2 \\cdot 6$ and $3 \\cdot 4$.',
      'The rule answers differently each time: $1 + 12 = 13$, $2 + 6 = 8$, $3 + 4 = 7$.',
      'So the first entry 12 would carry three images — 13, 8 and 7 — single-valuedness fails.',
      'Hence $R$ is not a function; it is a perfectly legal relation whose rule double-books the shared products.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'When are two functions the same?', text: 'A function is its pair-list TOGETHER with its declared domain — so two functions agree only when their domains agree AND their rules agree on every input. The AL-banked example prices it: $f(x) = \\sqrt{x^2} = |x|$ and $g(x) = x$ share a rule-shaped look but disagree at every negative input ($f(-3) = 3 \\neq -3$) and their ranges differ ($[0, \\infty)$ versus $\\mathbb{R}$) — different functions. The full identity discipline (including the $1/(1/x)$ trap) returns with the function zoo of lesson 1.5.' },

    { kind: 'heading', text: 'What This Lesson Banked' },
    { kind: 'para', text: 'The machine is now an object: a chosen subset of $A \\times B$, displayed as a roster, a rule or arrows, profiled by domain, range and codomain, counted by $2^{pq}$, twinned by the inverse, classified by the type census, and promoted to a function by the two demands of totality and single-valuedness. One question is now askable that AL could never quite ask: among the $n^m$ legal machines, WHICH ONES DESERVE PRAISE? The next lesson answers with two independent verdicts — does the machine waste inputs, and does it cover its codomain.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main syllabus unit 1 names this ground verbatim — “relations and types of relations” up to equivalence — and NCERT Class 12 chapter 1 opens with exactly the census this lesson ran (empty, universal, reflexive, symmetric, transitive, equivalence). Expect roster reads, 2^{pq} and n^m counts, property-proof questions that demand a one-witness counterexample, and “is this roster a function?” verdicts across JEE Main/Advanced, CUET and the state CETs; the EXAM_REGISTRY maps the shelf’s coverage of each.' },
    { kind: 'callout', tone: 'historical', title: 'The pairs are older than the machines', text: 'Ordered pairs entered mathematics with Descartes’ coordinates (1637) — a point IS a pairing of numbers — but the definition of a function as an arbitrary set of ordered pairs is Dirichlet’s (1837): before him, a “function” had to be built from a formula. Dirichlet’s freed definition — any total, single-valued pairing, however unruly — is exactly the one promoted above, and it is why this book can say “the machine is the list” without lying.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'A = {2, 3, 6}, B = {1, 2}, R = {(x, y): x > y}. The domain of R is', options: ['{1, 2}', '{1, 2, 3, 6}', '{(2,1), (3,1), (6,1)}', '{2, 3, 6}'], answer: 3, explain: 'The domain collects FIRST entries: 2 > 1 ✓, 3 > 1 and 3 > 2 ✓, 6 > 1 and 6 > 2 ✓ — every input fires, so the domain is all of A. {1, 2} is the RANGE-side read (second entries); the union confuses domain with codomain; the pair-set is a piece of the roster, not a set of first entries.' },
      { q: 'With n(A) = 3 and n(B) = 4, the number of relations from A to B is', options: ['12', '128', '4096', 'it cannot be counted from the sizes alone'], answer: 2, explain: '$A \\times B$ has $3 \\cdot 4 = 12$ pairs, and each is kept or dropped independently: $2^{12} = 4096$ relations. 12 is the product misread as the answer; 128 = $2^7$ adds the sizes before exponentiating; the last option denies the subset law itself.' },
      { q: 'R is a relation from A to B. Which statement is always true?', options: ['range = codomain', 'range ⊆ codomain', 'codomain ⊆ range', 'range = domain'], answer: 1, explain: 'Every second entry of a pair from A to B lives in B, so the used part of B sits inside all of B — range ⊆ codomain, with equality only when every target is hit. The reversals fail for the arrow diagram of this lesson (target 1 never hit); range = domain confuses the two slots.' },
      { q: 'On A = {1, 2, 3}, R = {(1,1), (2,2), (3,3), (1,3)} is', options: ['reflexive but not the identity relation', 'the identity relation', 'symmetric but not reflexive', 'transitive but not reflexive'], answer: 0, explain: 'All three diagonal pairs are present — reflexive — but the extra (1,3) relates 1 beyond itself, so R ≠ I_A: reflexive but not identity. “The identity” ignores the extra pair; R is NOT symmetric ((1,3) ∈ R, (3,1) ∉ R) and IS transitive, so the last two mislabel it either way.' },
      { q: 'Which roster IS a function from A = {1, 2, 3} to B = {a, b, c}?', options: ['{(1,a), (1,b), (3,c)}', '{(1,a), (2,b)}', '{(1,b), (2,b), (3,b)}', '{(1,a), (2,b), (3,c), (3,a)}'], answer: 2, explain: 'The constant roster is total (every input fires) and single-valued (each input once) — sharing the target b is legal. Option 1 double-books input 1; option 2 leaves input 3 silent; option 4 lets input 3 answer twice. Only the third roster pays both demands.' },
    ] },

    { kind: 'exercises', title: 'Exercises 1.1', sets: [
      { level: 'L1', questions: [
        { q: 'A = {1, 3, 4}, B = {0, 2}, R = {(x, y): x > y}. Write R in roster form and give its domain and range.', solution: [
          'Run every pairing through the rule: 1 beats 0 only; 3 beats both 0 and 2; 4 beats both.',
          'So, $R = \\{(1, 0), (3, 0), (3, 2), (4, 0), (4, 2)\\}$ — five pairs of the six possible.',
          'Hence domain $= \\{1, 3, 4\\}$ and range $= \\{0, 2\\}$; the codomain is all of $B$.',
        ], answer: 'R = {(1,0), (3,0), (3,2), (4,0), (4,2)}; domain {1,3,4}, range {0,2}.' },
        { q: 'Write R = {(1, 2), (2, 4), (3, 6), (4, 8)} in set-builder form and read its domain and range. Is R a function?', solution: [
          'Spot the rule: every second entry is the DOUBLE of the first.',
          'So, $R = \\{(x, 2x) : x \\in \\{1, 2, 3, 4\\}\\}$.',
          'Domain $= \\{1, 2, 3, 4\\}$, range $= \\{2, 4, 6, 8\\}$.',
          'Every input fires exactly once — total and single-valued — so R is a function (the doubling machine on a four-point domain).',
        ], answer: 'R = {(x, 2x): x ∈ {1,2,3,4}}; a function.' },
        { q: 'Read the lesson’s arrow diagram (the x < y relation): write the roster, then the domain, range and codomain.', solution: [
          'The four amber arrows are the pairs: $\\{(1,2), (1,7), (4,7), (5,7)\\}$.',
          'First entries: $\\{1, 4, 5\\}$ — the domain (all inputs fired).',
          'Second entries: $\\{2, 7\\}$ — the range; the codomain is the whole target blob $\\{1, 2, 7\\}$, with target 1 never hit.',
        ], answer: 'Roster {(1,2),(1,7),(4,7),(5,7)}; domain {1,4,5}, range {2,7}, codomain {1,2,7}.' },
      ] },
      { level: 'L2', questions: [
        { q: 'R₁ = {(x, y): y = 5 − 2x, x ∈ [−2, 4]}. Find the domain and range.', solution: [
          'The domain is declared: $[-2, 4]$.',
          'The line $y = 5 - 2x$ has slope $-2$, so it FALLS as $x$ climbs — the greatest value is at the left end, the least at the right.',
          'At the ends: $5 - 2(-2) = 9$ and $5 - 2(4) = -3$.',
          'Hence the range is $[-3, 9]$ — read off the fold, direction respected.',
        ], answer: 'Domain [−2, 4]; range [−3, 9].' },
        { q: 'R = {(x, y): x divides y} from A = {2, 3} to B = {4, 8, 12, 18, 25}. Write the roster, the range, and name the target that is never hit.', solution: [
          'Which targets are even or divisible by 3: 4, 8, 12, 18 all fall to 2 or 3; 25 is divisible by neither.',
          'So, $R = \\{(2,4), (2,8), (2,12), (2,18), (3,12), (3,18)\\}$ — six pairs.',
          'Hence the range is $\\{4, 8, 12, 18\\}$, a proper subset of the codomain: 25 is the target no arrow reaches.',
        ], answer: 'Six pairs; range {4,8,12,18}; 25 never hit.' },
        { q: 'With n(A) = 2 and n(B) = 3: how many relations from A to B? How many of them are functions?', solution: [
          'Relations: the product has $2 \\cdot 3 = 6$ pairs, and each is kept or dropped — $2^6 = 64$ relations.',
          'Functions: each of the 2 inputs must commit to exactly one of the 3 targets — $3^2 = 9$ functions.',
          'Hence 64 relations, of which only 9 are functions; the remaining 55 break totality or single-valuedness.',
        ], answer: '64 relations; 9 functions.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Prove that R = {(a, b): a − b is divisible by 3} is an equivalence relation on the integers, and describe its classes.', solution: [
          'Reflexive: $a - a = 0 = 3 \\cdot 0$ — every integer relates to itself.',
          'Symmetric: $a - b = 3k$ gives $b - a = 3(-k)$ — negation preserves divisibility by 3.',
          'Transitive: $a - b = 3k$ and $b - c = 3m$ give $a - c = 3(k + m)$.',
          'Hence R is an equivalence; the classes are $[0], [1], [2]$ — on any consecutive run of integers the three classes interleave and partition the run (on {0,…,9}: [0] = {0,3,6,9}, [1] = {1,4,7}, [2] = {2,5,8}).',
        ], answer: 'Equivalence; classes [0], [1], [2].' },
        { q: 'R = {(x, y): x + y = 10} on ℕ. Is R reflexive? symmetric? transitive? Give a witness for every failed property.', solution: [
          'Reflexive fails: $(1, 1)$ would need $1 + 1 = 10$, and it does not — even sums cap at 2 for the smallest inputs. In fact $(a, a)$ needs $2a = 10$, so ONLY $(5, 5)$ is diagonal: one diagonal pair does not buy reflexivity.',
          'Symmetric holds: $x + y = 10$ reads the same right-to-left — $y + x = 10$.',
          'Transitive fails: $(1, 9) \\in R$ and $(9, 1) \\in R$, but $(1, 1) \\notin R$.',
          'Hence R is symmetric only; a relation can hold one property and lose the other two.',
        ], answer: 'Not reflexive (only (5,5) diagonal); symmetric; not transitive ((1,9),(9,1) chain to (1,1) ∉ R).' },
        { q: 'R = {(2,3), (4,3), (6,8)}. Write R⁻¹ in roster form and verify both swap laws on it.', solution: [
          'Flip every pair: $R^{-1} = \\{(3, 2), (3, 4), (8, 6)\\}$, a relation from the old B to the old A.',
          'Domain of R was $\\{2, 4, 6\\}$ — and the range of $R^{-1}$ is exactly $\\{2, 4, 6\\}$.',
          'Range of R was $\\{3, 8\\}$ — and the domain of $R^{-1}$ is exactly $\\{3, 8\\}$.',
          'Hence $\\mathrm{Dom}(R^{-1}) = \\mathrm{Rng}(R)$ and $\\mathrm{Rng}(R^{-1}) = \\mathrm{Dom}(R)$, both swap laws confirmed on the roster.',
        ], answer: 'R⁻¹ = {(3,2),(3,4),(8,6)}; both swap laws hold.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (single correct): n(A) = 9 and n(A × B) = 36. Then n(B) and the number of relations from A to B are', solution: [
          'The product law: $n(A \\times B) = n(A) \\cdot n(B)$, so $36 = 9 \\cdot n(B)$ and $n(B) = 4$.',
          'The relation count rides the product’s size: $2^{36}$ subsets of the 36 pairings.',
          'Hence $n(B) = 4$ with $2^{36} = 68719476736$ relations from A to B.',
        ], answer: 'n(B) = 4; 2^36 = 68719476736 relations.' },
        { q: 'Exam-style (multiple correct): for a relation R from A to B with inverse R⁻¹, which statements are true?', solution: [
          '(a) $\\mathrm{Dom}(R^{-1}) = \\mathrm{Rng}(R)$ — TRUE, the swap law proved in the lesson.',
          '(b) $(R^{-1})^{-1} = R$ — TRUE: flipping every pair twice restores the original roster.',
          '(c) $R^{-1} \\subseteq A \\times B$ — FALSE: the inverse lives in $B \\times A$; the slots swap with the pairs.',
          '(d) if R is an equivalence relation on A, so is R⁻¹ — TRUE, and stronger: symmetry makes $R^{-1} = R$ itself, so it carries every property R had.',
          'Hence (a), (b) and (d) hold; (c) misplaces the ambient product.',
        ], answer: '(a), (b), (d) true; (c) false — R⁻¹ ⊆ B × A.' },
      ] },
      { level: 'L5', questions: [
        { q: 'How many relations on A = {1, 2, 3} contain the pair (1, 2) but NOT the pair (2, 1)?', solution: [
          'A relation on A is a subset of $A \\times A$: $9$ pairs total.',
          'Fix the two named pairs: (1,2) is IN, (2,1) is OUT — both are decided, not free.',
          'The remaining $9 - 2 = 7$ pairs are each free to stay or go: $2^7$ choices.',
          'Hence $2^7 = 128$ relations contain (1,2) and exclude (2,1).',
        ], answer: '128 relations.' },
        { q: 'On the integers, prove that a ≡ b (mod 5) is an equivalence relation, then show that −3 and 2 land in the same class and describe that class.', solution: [
          'The three-line machine: $a - a = 5 \\cdot 0$ (reflexive); $a - b = 5k \\Rightarrow b - a = 5(-k)$ (symmetric); differences $5k$ and $5m$ add to $5(k+m)$ (transitive).',
          'So congruence mod 5 is an equivalence relation on $\\mathbb{Z}$.',
          'The class of an integer collects everything congruent to it: $[a] = \\{a + 5k : k \\in \\mathbb{Z}\\}$.',
          'Now $-3 - 2 = -5 = 5(-1)$, so $-3 \\equiv 2$: they share the class $[2] = \\{\\ldots, -8, -3, 2, 7, 12, \\ldots\\}$ — on {0,…,12} this is the box {2, 7, 12} of the lesson’s figure.',
        ], answer: 'Equivalence; [−3] = [2] = {…, −3, 2, 7, 12, …}.' },
      ] },
      { level: 'L6', questions: [
        { q: 'How many equivalence relations exist on {1, 2, 3}? List them, and explain why the count equals the number of partitions.', solution: [
          'An equivalence relation IS a partition of the set into classes (the lesson’s theorem: non-empty, disjoint, exhaustive boxes).',
          'Count the partitions of {1,2,3}: one box of all three — {1,2,3}; a box of two plus a singleton — {1,2}{3}, {1,3}{2}, {2,3}{1}; three singletons — {1}{2}{3}.',
          'Every partition pairs with exactly one equivalence relation (two elements relate exactly when they share a box), and every equivalence relation cuts exactly one partition — the correspondence is one-to-one.',
          'Hence 1 + 3 + 1 = 5 equivalence relations on {1,2,3} — the count that brute force over all $2^9 = 512$ relations confirms (the verifier of this chapter does exactly that sweep).',
        ], answer: '5 — the partitions {123}, {12}{3}, {13}{2}, {23}{1}, {1}{2}{3}.' },
      ] },
    ] },

    { kind: 'formula', name: 'The relation count', latex: '\\#\\{\\text{relations } A \\to B\\} = 2^{\\,n(A) \\cdot n(B)}', note: 'each of the pq pairings kept or dropped — a subset of A × B' },
    { kind: 'formula', name: 'The function count', latex: '\\#\\{\\text{functions } A \\to B\\} = n(B)^{\\,n(A)}', note: 'each input commits to exactly one target; totality and single-valuedness both priced in' },
    { kind: 'formula', name: 'The inverse swap laws', latex: '\\mathrm{Dom}(R^{-1}) = \\mathrm{Rng}(R), \\qquad \\mathrm{Rng}(R^{-1}) = \\mathrm{Dom}(R), \\qquad (R^{-1})^{-1} = R', note: 'flipping every pair swaps the two slots completely' },
    { kind: 'formula', name: 'The equivalence checklist', latex: '\\text{equivalence} = \\text{reflexive} + \\text{symmetric} + \\text{transitive}', note: 'three independent properties — two never buy the third; classes partition the set' },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 1.2                                              */
/* ------------------------------------------------------------------ */

/** 1.2 — the horizontal probe: one-one vs many-one twin graphs */
function horizontalProbeSvg(): string {
  return `<svg viewBox="0 0 720 324" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two graphs: a one-one curve cut once by every horizontal probe, and a many-one curve cut twice by the probe y equals 5">
  <!-- left panel: y = x^3 + x + 1 -->
  <text x="185" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">y = x³ + x + 1 — every probe cuts once</text>
  <line x1="30" y1="160" x2="330" y2="160" stroke="#65a30d" stroke-width="1.4"/>
  <line x1="180" y1="34" x2="180" y2="260" stroke="#65a30d" stroke-width="1.4"/>
  <text x="326" y="176" text-anchor="end" font-size="12" fill="#0f766e">x</text>
  <text x="188" y="46" font-size="12" fill="#0f766e">y</text>
  <polyline points="60,250 90,199 120,170 150,156 180,150 210,144 240,130 270,101 300,50" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="40" y1="110" x2="320" y2="110" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 5"/>
  <circle cx="263" cy="110" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <text x="205" y="96" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">one cut</text>
  <text x="52" y="106" font-size="12" fill="#ea580c">probe y = 5</text>

  <!-- right panel: y = x^2 + 1 -->
  <text x="535" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">y = x² + 1 — the probe cuts twice</text>
  <line x1="380" y1="258" x2="680" y2="258" stroke="#65a30d" stroke-width="1.4"/>
  <line x1="530" y1="34" x2="530" y2="258" stroke="#65a30d" stroke-width="1.4"/>
  <text x="676" y="274" text-anchor="end" font-size="12" fill="#0f766e">x</text>
  <text x="538" y="46" font-size="12" fill="#0f766e">y</text>
  <polyline points="380,47 410,113 440,165 470,201 500,223 530,231 560,223 590,201 620,165 650,113 680,47" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="390" y1="113" x2="690" y2="113" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 5"/>
  <circle cx="410" cy="113" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <circle cx="650" cy="113" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <text x="415" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">f(−2) = 5</text>
  <text x="645" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">f(2) = 5</text>
  <text x="535" y="133" text-anchor="middle" font-size="12" fill="#ea580c">probe y = 5</text>

  <text x="360" y="298" text-anchor="middle" font-size="14" fill="#0f766e">the horizontal probe: a full-width sweep of horizontal lines —</text>
  <text x="360" y="318" text-anchor="middle" font-size="14" fill="#0f766e">at most one cut each means one-one; any double cut means many-one</text>
</svg>`
}

/** 1.2 — the pigeonhole verdict + the counting panel */
function pigeonholeCountSvg(): string {
  const input = (cx: number, cy: number, label: string): string =>
    `<circle cx="${cx}" cy="${cy}" r="17" fill="#16a34a" stroke="#166534" stroke-width="2"/>` +
    `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="#ffffff">${label}</text>`
  const arrow = (x1: number, y1: number, x2: number, y2: number, red: boolean): string => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const col = red ? '#dc2626' : '#d97706'
    return `<line x1="${(x1 + ux * 19).toFixed(1)}" y1="${(y1 + uy * 19).toFixed(1)}" x2="${(x2 - ux * 12).toFixed(1)}" y2="${(y2 - uy * 12).toFixed(1)}" stroke="${col}" stroke-width="2.4"/>` +
      `<polygon points="${x2},${y2} ${(x2 - ux * 10).toFixed(1)},${(y2 - uy * 10 - 4).toFixed(1)} ${(x2 - ux * 10).toFixed(1)},${(y2 - uy * 10 + 4).toFixed(1)}" fill="${col}"/>`
  }
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The pigeonhole verdict: three inputs into two targets force a shared image; the counting panel prices injections, surjections and bijections">
  <text x="250" y="30" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">3 inputs, 2 targets — a sharing is FORCED</text>
  ${input(110, 95, 'a')}
  ${input(110, 160, 'b')}
  ${input(110, 225, 'c')}
  <rect x="360" y="75" width="140" height="64" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>
  <text x="430" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">target 1</text>
  <rect x="360" y="185" width="140" height="64" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>
  <text x="430" y="222" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">target 2</text>
  ${arrow(110, 95, 362, 105, true)}
  ${arrow(110, 160, 362, 118, true)}
  ${arrow(110, 225, 362, 210, false)}
  <text x="250" y="276" text-anchor="middle" font-size="13.5" fill="#dc2626">the red pair must share — every 3-into-2 machine is many-one</text>

  <rect x="535" y="56" width="178" height="66" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="78" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">one-one needs m ≤ n</text>
  <text x="624" y="100" text-anchor="middle" font-size="14.5" font-weight="700" fill="#65a30d">⁵P₃ = 60 injective</text>
  <rect x="535" y="140" width="178" height="66" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="162" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">onto needs n ≤ m</text>
  <text x="624" y="184" text-anchor="middle" font-size="14.5" font-weight="700" fill="#65a30d">150 of 3⁵ = 243 surjective</text>
  <rect x="535" y="224" width="178" height="60" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="246" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">bijective needs m = n</text>
  <text x="624" y="268" text-anchor="middle" font-size="14.5" font-weight="700" fill="#65a30d">3! = 6 pairings</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 1.2                                                          */
/* ------------------------------------------------------------------ */

const lesson12: Lesson = {
  id: 'aa-one-one-and-onto-classifying-the-machines',
  number: '1.2',
  title: 'One-One and Onto: Classifying the Machines',
  concepts: [
    'one-one (injective) and many-one functions',
    'the contrapositive discipline',
    'the horizontal probe',
    'onto (surjective) and into functions',
    'bijective functions',
    'the pigeonhole verdicts',
    'counting injections, surjections and bijections',
    'codomain as a choice',
  ],
  objectives: [
    'define one-one and onto symbolically and judge any machine against each verdict with the correct witness discipline',
    'run the analytical method — set f(x₁) = f(x₂), factor, decide — and the horizontal probe on graphs',
    'settle onto questions by both methods: compare the range with the codomain, or solve x = g(y) and check where it lands',
    'fill the 2×2 verdict table with certified examples and read the either-or laws off it',
    'apply the finite-set pigeonhole verdicts and count injections (ⁿPₘ), surjections (inclusion–exclusion) and bijections (n!) for small sets',
    'trim a codomain honestly to make a machine onto, and re-classify a machine by restricting its domain',
  ],
  prerequisites: ['aa-relations-the-set-of-pairs-view', 'al-the-parabola-quadratic-graphs-and-vertices'],
  sources: ['cengage-m2-algebra', 'cengage-jee-style', 'ncert-math12-ch1-relations-functions', 'ncert-math11-ch2-functions', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 1.1 turned the machine into an object: a total, single-valued set of pairs. Now the object gets a report card. Two questions, asked independently, grade every machine: does it WASTE inputs — could two different inputs produce the same output? And does it COVER its codomain — does every declared target actually get hit? The first question is called one-one, the second onto, and their four possible answer-combinations fill a 2×2 table that this lesson prices cell by cell.' },
    { kind: 'para', text: 'The two verdicts matter because they are exactly the conditions for the two operations the rest of this chapter performs on machines. Composition (lesson 1.3) wants to know which outputs are safe to feed onward; invertibility (lesson 1.4) will turn out to be EXACTLY “one-one and onto” — the perfect pairing. So this lesson is not name-calling: it is the qualification exam every later chapter refers back to.' },

    { kind: 'heading', text: 'One-One: Machines That Never Waste Inputs' },
    { kind: 'callout', tone: 'definition', title: 'One-one (injective) function', text: 'A function $f : A \\to B$ is ONE-ONE (injective) when distinct inputs always produce distinct outputs: thus, $x_1 \\neq x_2 \\Rightarrow f(x_1) \\neq f(x_2)$ for all $x_1, x_2 \\in A$; equivalently, its contrapositive, $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$. A machine that is not one-one is called MANY-ONE.' },
    { kind: 'para', text: 'The two forms of the definition are equally powerful and examinations expect you to wield the SECOND — assume two outputs agree and force the inputs to agree. For example, $f(x) = x + 1$ is one-one: if $x_1 + 1 = x_2 + 1$ then $x_1 = x_2$, immediately. And $f(x) = x^2$ on $\\mathbb{R}$ is many-one, with the cleanest possible witness: $f(-2) = f(2) = 4$ while $-2 \\neq 2$.' },
    { kind: 'callout', tone: 'insight', title: 'The witness discipline', text: 'To prove a machine MANY-ONE, exhibit one pair of distinct inputs with a shared output — a single witness settles it. To prove a machine ONE-ONE, no witness can help: you must show EVERY potential witness is impossible, which is why the algebra runs through the contrapositive. This asymmetry — one counterexample kills, only a proof builds — is the grammar of every verdict question in the chapter.' },
    { kind: 'para', text: 'Note a law before the methods: a function is exactly ONE of one-one or many-one, never both and never neither — the definitions are complements (two inputs either always stay distinct in output, or some pair collides).' },

    { kind: 'heading', text: 'The Verdict Methods' },
    { kind: 'para', text: 'For one-one, two methods carry almost the whole load, with a third honest preview.' },
    { kind: 'list', marker: 'roman', items: [
      '**Analytical method** — set $f(x_1) = f(x_2)$, simplify, and factor out $(x_1 - x_2)$: whatever remains must be shown NEVER zero, forcing $x_1 = x_2$.',
      '**Graphical method — the horizontal probe.** Sweep a horizontal line across the graph: if any height is cut MORE than once, two inputs share an output — many-one; if every horizontal line cuts at most once, one-one.',
      '**The calculus preview** — for machines that never break, a never-turning-back machine is one-one. Its engine is the derivative, which belongs to Differential Calculus — the next book but one on this shelf; we name the door honestly and use only algebra here.',
    ] },
    { kind: 'derivation', title: 'The analytical method, worked honestly: f(x) = x³ + x + 1 is one-one on ℝ', statement: 'Set the outputs equal and factor.', steps: [
      { label: 'Set the outputs equal', formula: 'x_1^3 + x_1 + 1 = x_2^3 + x_2 + 1', explanation: 'the contrapositive discipline: assume the machine wasted inputs, and prepare to contradict the assumption.' },
      { label: 'Bring everything to one side', formula: '(x_1^3 - x_2^3) + (x_1 - x_2) = 0', explanation: 'the difference of cubes and the difference of linear terms — each already wears the factor $(x_1 - x_2)$.' },
      { label: 'Factor out (x₁ − x₂)', formula: '(x_1 - x_2)(x_1^2 + x_1x_2 + x_2^2 + 1) = 0', explanation: 'the AL difference-of-cubes identity $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$, plus the leftover linear term joining the bracket.' },
      { label: 'Complete the square in the bracket', formula: 'x_1^2 + x_1x_2 + x_2^2 + 1 = (x_1 + \\tfrac{x_2}{2})^2 + \\tfrac{3x_2^2}{4} + 1', explanation: 'the sum of two squares and a leftover 1 — the technique AL 11.2 used to certify non-negativity.' },
      { label: 'Read the completed form', formula: '(x_1 + \\tfrac{x_2}{2})^2 \\geq 0, \\quad \\tfrac{3x_2^2}{4} \\geq 0 \\;\\Longrightarrow\\; \\text{bracket} \\geq 1 > 0', explanation: 'a square plus a square plus one — never zero, never negative, for any real $x_1, x_2$.' },
    ], result: 'The bracket cannot vanish, so the product vanishes only through $x_1 - x_2 = 0$: hence $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$, and $f(x) = x^3 + x + 1$ is one-one. (The calculus preview agrees: the machine never turns back — a fact this book prices algebraically above.)' },
    { kind: 'figure', caption: 'The horizontal probe on twin machines. Left: y = x³ + x + 1 — the probe at y = 5 cuts the curve exactly once (the dot), and so does every probe: one-one. Right: y = x² + 1 — the same probe height cuts TWICE, at x = −2 and x = 2, with f(−2) = f(2) = 5: many-one, killed by one witness. The probe is the definition drawn: a horizontal line gathers all pairs sharing one output.', svg: horizontalProbeSvg() },
    { kind: 'callout', tone: 'warn', title: 'The vertical probe and the horizontal probe answer DIFFERENT questions', text: 'AL 11.3’s vertical probe asked “is this a machine at all?” — no vertical line may cut twice (single-valuedness). The horizontal probe here asks “does the machine waste inputs?” — no horizontal line may cut twice (one-one). Turning one probe into the other is the most common self-check failure in this chapter; perpendicular probes, perpendicular questions.' },
    { kind: 'example', title: 'Is f(x) = (x² + 4x + 7)/(x² + x + 1), x ∈ ℝ, one-one?', steps: [
      'The analytical run would factor the difference — but hunt a witness first: the search is faster when it succeeds.',
      'Try $x_1 = 0$: $f(0) = \\tfrac{7}{1} = 7$. Now ask which OTHER inputs answer 7.',
      'Solve $\\tfrac{x^2 + 4x + 7}{x^2 + x + 1} = 7$: it rearranges to $x^2 + 4x + 7 = 7x^2 + 7x + 7$, so $6x^2 - 3x = 3x(2x - 1) = 0$ — the doors are $x = 0$, $x = \\tfrac{1}{2}$ and… check the sign: $3x(2x-1)$ has roots $0$ and $\\tfrac{1}{2}$ only.',
      'Check $x = -\\tfrac{1}{2}$ directly instead — the classic hiding spot: numerator $\\tfrac{1}{4} - 2 + 7 = \\tfrac{21}{4}$; denominator $\\tfrac{1}{4} - \\tfrac{1}{2} + 1 = \\tfrac{3}{4}$; the quotient is exactly $7$.',
      'Hence $f(0) = f(-\\tfrac{1}{2}) = 7$ with $0 \\neq -\\tfrac{1}{2}$: one witness, and the machine is many-one.',
    ] },

    { kind: 'heading', text: 'Onto: Machines That Cover the Codomain' },
    { kind: 'callout', tone: 'definition', title: 'Onto (surjective) function', text: 'A function $f : A \\to B$ is ONTO (surjective) when every declared target is actually hit: thus, for every $b \\in B$ there exists an $a \\in A$ with $f(a) = b$ — equivalently, $\\mathrm{Rng}(f) = B$, the range equals the codomain. A machine whose range falls short, $\\mathrm{Rng}(f) \\subsetneq B$, is called INTO.' },
    { kind: 'para', text: 'The onto verdict is a tug-of-war between two facts established in lesson 1.1: the range is DISCOVERED from the pairs, while the codomain was DECLARED at the outset. Onto means the discovery fills the declaration.' },
    { kind: 'list', marker: 'roman', items: [
      '**Method 1 (compare).** Compute the range — by the AL fold, the vertex read, or the solve-back below — and check it against the codomain.',
      '**Method 2 (solve for x).** Write $y$ for a general target and solve $f(x) = y$ for $x = g(y)$; the machine is onto exactly when $g(y)$ exists and lands back in the domain for EVERY $y$ in the codomain.',
    ] },
    { kind: 'example', title: 'f : ℝ → ℝ, f(x) = 2x + 7. Onto?', steps: [
      'Method 2: name a general target $y$ and solve $2x + 7 = y$.',
      'So, $x = \\tfrac{y - 7}{2}$ — a real number for every real $y$, and it always lands in the domain $\\mathbb{R}$.',
      'Hence every real target has a preimage: $f$ is onto (the linear machines with nonzero slope are all onto onto $\\mathbb{R}$).',
    ] },
    { kind: 'example', title: 'f : ℝ → [0, ∞), f(x) = x² + 1. Onto or into?', steps: [
      'Method 1: the range. $x^2 \\geq 0$, so $x^2 + 1 \\geq 1$ — the outputs fill $[1, \\infty)$ and nothing below.',
      'Compare with the declared codomain $[0, \\infty)$: the stretch $[0, 1)$ of targets is never hit — the target 0, for instance, would need $x^2 = -1$, which has no real door (ANS banked that refusal).',
      'Hence the range $[1, \\infty) \\subsetneq [0, \\infty)$: $f$ is INTO — and trimming the codomain to $[1, \\infty)$ would promote the very same pair-list onto.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Onto is a property of the PAIR (machine, codomain)', text: 'Change the declaration and the verdict changes: $x^2 + 1 : \\mathbb{R} \\to [0, \\infty)$ is into, but $x^2 + 1 : \\mathbb{R} \\to [1, \\infty)$ is onto — identical pairs, different codomain. This is why “find the codomain for which f is onto” is a legitimate examination question: the answer is always the range, discovered honestly.' },
    { kind: 'callout', tone: 'definition', title: 'Bijective function', text: 'A function that is both one-one and onto is called BIJECTIVE: thus, $f : A \\to B$ is bijective when every $b \\in B$ is hit EXACTLY once — a perfect pairing between the elements. The either-or laws: every function is exactly one of one-one/many-one and exactly one of onto/into, so “bijective” is one cell of a 2×2 verdict table.' },
    { kind: 'table', caption: 'The 2×2 verdict table, every cell certified', head: ['machine', 'one-one?', 'onto?', 'the certified read'], rows: [
      ['$f(x) = x + 1 : \\mathbb{R} \\to \\mathbb{R}$', '✓', '✓', 'bijective — the perfect pairing (every $y$ has exactly one preimage $y - 1$)'],
      ['$f(x) = x^2 : \\mathbb{R} \\to \\mathbb{R}$', '✗', '✗', 'many-one ($f(\\pm 2) = 4$) and into ($-1$ never hit)'],
      ['$f(x) = x^2 : \\mathbb{R} \\to [0, \\infty)$', '✗', '✓', 'many-one onto — every non-negative target is hit, but each (except 0) twice'],
      ['$f(x) = x^2 : [0, \\infty) \\to [0, \\infty)$', '✓', '✓', 'bijective again — the restriction fixed the waste while keeping the cover'],
      ['$f(x) = x^2 : [0, \\infty) \\to \\mathbb{R}$', '✓', '✗', 'one-one and into — the same machine with a wasteful codomain declaration'],
    ] },
    { kind: 'para', text: 'Read the table twice — once down the rows (the same rule $x^2$ wearing four different verdicts as its domain and codomain change) and once across (each verdict-combination genuinely occurs). The machine’s identity includes BOTH declared sets, which is precisely the lesson’s closing discipline.' },

    { kind: 'heading', text: 'Illustrations: The Verdicts at Work' },
    { kind: 'example', title: 'Classify f : [−1, 1] → [−1, 1] for (i) f(x) = |x| and (ii) f(x) = x|x|', steps: [
      '(i) The waste: $|{-\\tfrac{1}{2}}| = |\\tfrac{1}{2}| = \\tfrac{1}{2}$ — two inputs, one output: many-one. The cover: outputs are never negative, so every negative target (say $-\\tfrac{1}{2}$) is unhit — into.',
      'Hence $f(x) = |x|$ on this pairing is many-one and into.',
      '(ii) Unfold the rule: $x|x| = x^2$ when $x \\geq 0$ and $-x^2$ when $x < 0$ — two half-parabolas seamed at the origin, climbing all the way from $-1$ to $1$.',
      'The waste: a climb that never turns back cannot revisit a height — one-one. The cover: $f(-1) = -1$ and $f(1) = 1$, and the climb is unbroken between, so every target in between is attained — onto.',
      'Hence $x|x|$ on this pairing is bijective — the same domain and codomain, a better machine.',
    ] },
    { kind: 'example', title: 'Show f : ℝ → ℝ, f(x) = (x − 1)(x − 2)(x − 3) is onto but not one-one', steps: [
      'The waste: $f(1) = f(2) = f(3) = 0$ — three inputs, one output: many-one, witnessed instantly.',
      'The cover: expand the machine, $f(x) = x^3 - 6x^2 + 11x - 6$ — an odd-degree polynomial with positive leading term.',
      'Sample the ends honestly: $f(-3) = -120$ and $f(4) = 6$ — already below and above zero; pushing $x$ further out drives $f$ arbitrarily far down and up, with no breaks in between (the continuity promise Differential Calculus will later certify — this book states it, it does not yet prove it).',
      'Hence every real target is crossed somewhere: onto — an explicit many-one ONTO machine, filling the table’s third cell.',
    ] },
    { kind: 'example', title: 'If f : ℝ → A, f(x) = x²/(x² + 1) is a surjection, find A', steps: [
      'A surjection must have codomain = range, so hunt the range honestly.',
      'Rewrite the rule: $\\tfrac{x^2}{x^2 + 1} = 1 - \\tfrac{1}{x^2 + 1}$ — the fold form.',
      'Now $x^2 + 1 \\geq 1$ always, so $0 < \\tfrac{1}{x^2+1} \\leq 1$, which gives $0 \\leq 1 - \\tfrac{1}{x^2+1} < 1$.',
      'The ends are honest: at $x = 0$ the value is exactly $0$; the value $1$ is approached but never attained ($\\tfrac{1}{x^2+1}$ never reaches $0$).',
      'Hence the range is $[0, 1)$, and the codomain that makes the machine onto is $A = [0, 1)$.',
    ] },

    { kind: 'heading', text: 'The Finite-Set Verdicts' },
    { kind: 'para', text: 'On finite sets the two verdicts can be read off the SIZES before any machine is even proposed — the pigeonhole ground Foundation Mathematics banked.' },
    { kind: 'callout', tone: 'theorem', title: 'The pigeonhole verdicts', text: 'With $n(A) = m$ inputs and $n(B) = n$ targets: if $m > n$, EVERY function $A \\to B$ is many-one (more inputs than targets forces a shared image); if $n > m$, EVERY function is into (more targets than inputs leaves some unhit). A bijection is possible only when $m = n$ — and then it must pair the sets perfectly. Counting confirms all three.' },
    { kind: 'figure', caption: 'Left: the impossibility — three inputs committed into two targets; whichever way the arrows are drawn, two of them share a target (the red pair), so every 3-into-2 machine is many-one. Right: the counting panel — the injection count needs m ≤ n (⁵P₃ = 60 ways to seat three inputs on distinct targets), the surjection count needs n ≤ m (150 of the 3⁵ = 243 machines from a 5-set onto a 3-set), and the bijection count needs m = n (3! = 6 perfect pairings).', svg: pigeonholeCountSvg() },
    { kind: 'derivation', title: 'Counting the one-one functions: ⁿPₘ from the choice chain', statement: 'How many one-one functions exist from an m-element set A into an n-element set B?', steps: [
      { label: 'Seat the inputs one at a time', formula: 'a_1 \\text{ has } n \\text{ targets; } a_2 \\text{ has } n - 1; \\; \\ldots; \\; a_m \\text{ has } n - m + 1', explanation: 'one-one bans repeats: each new input must claim a target still free — the choice pool shrinks by one per seated input.' },
      { label: 'Chain the choices (FM counting principle)', formula: '\\#\\text{injections} = n(n-1)(n-2)\\cdots(n - m + 1) = {}^nP_m', explanation: 'independent choices multiply — the permutation count, re-derived as a seating plan.' },
      { label: 'Read the failure case', formula: 'm > n \\;\\Longrightarrow\\; {}^nP_m = 0', explanation: 'the pool empties before the inputs run out: the chain hits a zero factor — the counting version of the pigeonhole verdict.' },
    ], result: 'One-one functions from an m-set into an n-set number ⁿPₘ = n(n−1)⋯(n−m+1) when m ≤ n, and none exist when m > n. Headline instances: from a 3-set into a 5-set, ⁵P₃ = 5·4·3 = 60; from a 4-set into a 7-set, ⁷P₄ = 7·6·5·4 = 840.' },
    { kind: 'derivation', title: 'Counting the onto functions: inclusion–exclusion on the empty boxes', statement: 'How many functions from an m-element set A onto an n-element set B hit every target?', steps: [
      { label: 'Start from all machines', formula: '\\#\\{A \\to B\\} = n^m', explanation: 'each input freely picks any target — the n^m count of lesson 1.1, onto or not.' },
      { label: 'Ban the misses', formula: '\\text{onto} = n^m - (\\text{machines missing } \\geq 1 \\text{ target})', explanation: 'an onto machine misses nothing — subtract the machines that leave at least one box empty.' },
      { label: 'Inclusion–exclusion repairs the over-subtraction', formula: '\\sum_{k=0}^{n} (-1)^k\\, {}^nC_k\\, (n-k)^m', explanation: 'machines missing a GIVEN k targets number $(n-k)^m$ (the inputs crowd into the rest); the alternating sum adds back the double-counted, subtracts the triple-counted…' },
      { label: 'Price the headline case (m = 5, n = 3)', formula: '3^5 - {}^3C_1 \\cdot 2^5 + {}^3C_2 \\cdot 1^5 = 243 - 96 + 3 = 150', explanation: '243 machines total; subtract $3 \\cdot 32 = 96$ crowding into a chosen pair of targets; add back the 3 doubly-missed counts. Net: 150 onto.' },
    ], result: 'Onto functions from an m-set onto an n-set number Σ(−1)^k ⁿCₖ(n−k)^m when n ≤ m — and none exist when n > m (pigeonhole again). The companion census: of the 3⁵ = 243 machines from a 5-set to a 3-set, exactly 150 are onto, so 93 are into. Bijections between equal m = n sets: n! of them (seat every input on a distinct target — the same chain with the last factor 1).' },
    { kind: 'equation', latex: '3^5 - {}^3C_1 \\cdot 2^5 + {}^3C_2 \\cdot 1^5 = 243 - 96 + 3 = 150', note: 'the headline surjection census, displayed: of the 243 machines from a 5-set to a 3-set, exactly 150 leave no target unhit — the count every examination asks for' },
    { kind: 'callout', tone: 'warn', title: 'Read the direction twice', text: 'The twin counting questions are twins, not one question: from a 3-set into a 5-set there are ⁵P₃ = 60 one-one machines and ZERO onto machines; from a 5-set into a 3-set there are ZERO one-one machines and 150 onto ones. Examinations print the pair in both orders precisely because the swap is the trap — the verifier of this chapter brute-forces every case m, n ≤ 5 to keep the book honest.' },

    { kind: 'heading', text: 'Restriction Re-Classifies' },
    { kind: 'para', text: 'The verdict table’s $x^2$ rows teach the chapter’s last discipline: the pair-list alone is not the machine — the DECLARED sets are part of its identity. The same rule $x^2$ was many-one into on $\\mathbb{R} \\to \\mathbb{R}$, many-one onto on $\\mathbb{R} \\to [0, \\infty)$, bijective on $[0, \\infty) \\to [0, \\infty)$, one-one into on $[0, \\infty) \\to \\mathbb{R}$. Choosing the domain honestly (the two filters of AL 11.3) and the codomain to match the range are both authorial moves — and every later chapter makes them deliberately.' },
    { kind: 'callout', tone: 'insight', title: 'The invertibility promise', text: 'Hold this thought for two lessons: a machine that is one-one never answers two inputs identically, so its pair-list can be READ BACKWARDS without ambiguity; a machine that is onto has every target paired, so nothing is lost in the reading back. Lesson 1.4 will prove it: invertible = bijective, exactly. The classification here is the qualification exam for inversion there.' },

    { kind: 'heading', text: 'What This Lesson Banked' },
    { kind: 'para', text: 'Two independent verdicts now grade every machine: the waste test (one-one, by the contrapositive discipline and the horizontal probe) and the cover test (onto, by the range comparison and the solve-back). Their 2×2 table is certified cell by cell; the finite-set verdicts turn the pigeonhole principle into counting laws — ⁿPₘ injections, the inclusion–exclusion surjection count, n! bijections — and the codomain was revealed as a choice the author makes. The next lesson wires machines in series and asks what the verdicts inherit.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main syllabus unit 1 names the ground verbatim — “functions: one-one, into and onto functions” — and NCERT Class 12 chapter 1 examines the same verdicts with the range discipline. Expect: identify-the-type questions with the four-cell answer, find-the-codomain surjection hunts, witness-hunting for many-one into machines, the counting pair printed in BOTH directions (⁵P₃ = 60 / 150 onto), and the parameter family “find p, q so that x³ + px² + qx + r is one-one” at the L5 depth — across JEE Main/Advanced, CUET and the state CETs, in single-correct, multi-correct and numerical-value formats alike.' },
    { kind: 'callout', tone: 'historical', title: 'Why “injective” and “surjective”?', text: 'The names honor the two directions a pairing can fail: INJECTIVE from the Latin injicere, “to throw in” — distinct inputs thrown in stay distinct; SURJECTIVE from French surjeter in the modern coinage, “to throw over” — the outputs are thrown over the whole codomain, covering it. The paired coinages (with bijective completing the family) are Cantor-era set language doing exactly what this lesson does: grading pairings by their waste and their cover.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'f : ℝ → ℝ, f(x) = x². The machine is', options: ['one-one and onto', 'many-one and into', 'one-one and into', 'many-one and onto'], answer: 1, explain: 'Waste: $f(-2) = f(2) = 4$ — many-one. Cover: $-1$ has no preimage ($x^2 = -1$ has no real door) — into. The other cells misreport one verdict or both; trimming the codomain to $[0, \\infty)$ would promote it to onto but never fix the waste.' },
      { q: 'Every horizontal line cuts a certain graph at most once. The safe conclusion is', options: ['the machine is one-one and onto', 'the machine is many-one', 'the machine is one-one (onto is undecided)', 'neither verdict can be drawn'], answer: 2, explain: 'The horizontal probe tests the WASTE question only: at most one cut per height means no two inputs share an output. Coverage is a separate question about the codomain declaration — the probe says nothing about which targets are hit, so “onto” cannot be concluded from it.' },
      { q: 'f : ℝ → [0, ∞), f(x) = x² + 1. The verdict is', options: ['onto, because the codomain starts at 0', 'into, because 0 has no preimage (x² = −1 has no real door)', 'onto, because every y ≥ 0 is (y − 1) + 1', 'bijective'], answer: 1, explain: 'The range is $[1, \\infty)$: outputs never drop below 1, so every target in $[0, 1)$ — starting with 0 — is unhit: into. Option 1 confuses the codomain’s floor with the output’s floor; option 3 invents inputs for targets below 1 (its own algebra needs $x^2 = y - 1 < 0$); bijective fails twice over (the machine is many-one AND into).' },
      { q: 'With n(A) = 4 and n(B) = 7, the number of one-one functions from A to B is', options: ['840', '2401', '24', '0'], answer: 0, explain: 'Seat the 4 inputs on distinct targets among the 7: $7 \\cdot 6 \\cdot 5 \\cdot 4 = 840$. 2401 = $7^4$ counts ALL functions (repeats allowed); 24 = $4!$ counts bijections of EQUAL sets; 0 is the pigeonhole misread — one-one needs $m \\leq n$, and $4 \\leq 7$ holds.' },
      { q: 'The number of onto functions from a 4-element set onto a 2-element set is', options: ['16', '8', '0', '14'], answer: 3, explain: 'Inclusion–exclusion: $2^4 - 2 \\cdot 1^4 = 16 - 2 = 14$ — all 16 machines minus the 2 constant ones (all inputs in one box, other box empty). 16 forgets the subtraction; 8 is the “half of them” guess; 0 is the pigeonhole misread — onto needs $n \\leq m$, and $2 \\leq 4$ holds.' },
    ] },

    { kind: 'exercises', title: 'Exercises 1.2', sets: [
      { level: 'L1', questions: [
        { q: 'Classify f : ℝ → ℝ, f(x) = 5x − 2.', solution: [
          'One-one: if $5x_1 - 2 = 5x_2 - 2$ then $5x_1 = 5x_2$ and $x_1 = x_2$ — the linear machines with nonzero slope never waste.',
          'Onto: for any target $y$, solve $5x - 2 = y$ to get $x = \\tfrac{y + 2}{5}$ — real for every real $y$ and lands in $\\mathbb{R}$.',
          'Hence the machine is bijective.',
        ], answer: 'One-one and onto (bijective).' },
        { q: 'Classify f : ℝ → ℝ, f(x) = x².', solution: [
          'Waste: $f(-3) = f(3) = 9$ — a witness pair with distinct inputs.',
          'Cover: the target $-2$ would need $x^2 = -2$, which has no real door.',
          'Hence many-one and into.',
        ], answer: 'Many-one and into.' },
        { q: 'Classify f : ℝ → [0, ∞), f(x) = |x|.', solution: [
          'Waste: $|-4| = |4| = 4$ — many-one witnessed.',
          'Cover: every target $y \\geq 0$ is hit (the input $y$ itself answers $y$: $|y| = y$ for $y \\geq 0$).',
          'Hence many-one and onto.',
        ], answer: 'Many-one and onto.' },
      ] },
      { level: 'L2', questions: [
        { q: 'For f(x) = x² − 6x + 11 on ℝ: exhibit a witness pair for many-one, and give the range.', solution: [
          'Complete the square: $x^2 - 6x + 11 = (x - 3)^2 + 2$ — the AL vertex read.',
          'Witness: the inputs 1 and 5 sit symmetrically about the vertex 3, so $f(1) = f(5) = 6$.',
          'The vertex fold: $(x-3)^2 \\geq 0$ gives outputs $\\geq 2$, so the range is $[2, \\infty)$.',
          'Hence many-one with witness (1, 5), and the honest onto codomain would be $[2, \\infty)$.',
        ], answer: 'Witness (1, 5) with f = 6; range [2, ∞).' },
        { q: 'f : ℝ → [0, ∞), f(x) = x² + 1. Which targets have no preimage?', solution: [
          'A target $y$ has a preimage exactly when $x^2 = y - 1$ has a real door.',
          'That equation has a real door exactly when $y - 1 \\geq 0$.',
          'So, every target with $0 \\leq y < 1$ is unhit — an entire stretch of the declared codomain.',
          'Hence the preimage-less targets are exactly $[0, 1)$; the machine is into, and onto exactly $[1, \\infty)$.',
        ], answer: 'All targets in [0, 1).' },
        { q: 'The probe y = 5 cuts the graph of y = x² + 1 at x = −2 and x = 2. State the verdict this yields, and the verdict it does NOT yield.', solution: [
          'The double cut says two inputs share one output: $f(-2) = f(2) = 5$ — many-one, witnessed.',
          'It yields NOTHING about coverage: whether every target is hit depends on the codomain declaration, not on this probe.',
          'Hence the verdict is many-one; onto/into is undecided by this evidence.',
        ], answer: 'Many-one; onto is not decided by the probe.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the codomain on which f : ℝ → ?, f(x) = 9 − x² is onto.', solution: [
          'The vertex read: $9 - x^2$ tops out at $9$ (at $x = 0$) and falls without bound either way.',
          'So, the range is $(-\\infty, 9]$ — an upside-down fold, the mirror of the AL parabola read.',
          'Hence the machine is onto exactly against the codomain $(-\\infty, 9]$.',
        ], answer: '(−∞, 9].' },
        { q: 'Find the range of f(x) = x² + 2x + 5, and the codomain making it onto.', solution: [
          'Complete the square: $x^2 + 2x + 5 = (x + 1)^2 + 4$.',
          'The square never runs below 0, so outputs never run below 4; at $x = -1$ the value is exactly 4.',
          'Hence the range is $[4, \\infty)$ — the onto codomain.',
        ], answer: '[4, ∞).' },
        { q: 'Find the range of f(x) = (x² − x + 1)/(x² + x + 1) by the discriminant method.', solution: [
          'Let $y$ be a general output and clear the fraction: $(x^2 - x + 1) = y(x^2 + x + 1)$.',
          'So, $(1 - y)x^2 - (1 + y)x + (1 - y) = 0$ — a quadratic in $x$.',
          'A real input $x$ exists exactly when the discriminant is non-negative: $D = (1 + y)^2 - 4(1 - y)^2$.',
          'Factor: $D = (3y - 1)(3 - y)$, and $D \\geq 0$ holds exactly for $\\tfrac{1}{3} \\leq y \\leq 3$.',
          'Both ends are attained — $f(1) = \\tfrac{1}{3}$ and $f(-1) = 3$ — so the range is $[\\tfrac{1}{3}, 3]$.',
        ], answer: '[1/3, 3].' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (numerical value): n(A) = 3, n(B) = 5. Give the number of one-one functions from A to B, and the number of bijections between two 3-element sets.', solution: [
          'One-one: seat 3 inputs on distinct targets among 5 — $5 \\cdot 4 \\cdot 3 = 60$.',
          'Bijections of equal 3-sets: seat 3 inputs on all 3 targets — $3! = 6$.',
          'Hence 60 and 6; the onto count for this direction is 0 (three inputs cannot cover five targets — pigeonhole).',
        ], answer: '60 one-one; 6 bijections (and 0 onto).' },
        { q: 'Exam-style (numerical value): n(A) = 5, n(B) = 3. Give the number of onto functions from A to B, the number of one-one functions, and the number of functions that are into.', solution: [
          'Onto: inclusion–exclusion — $3^5 - 3 \\cdot 2^5 + 3 \\cdot 1^5 = 243 - 96 + 3 = 150$.',
          'One-one: the pigeonhole verdict — five inputs into three targets forces sharing: $0$.',
          'Into: the complement of onto among all machines — $243 - 150 = 93$.',
          'Hence 150 onto, 0 one-one, 93 into — and note the contrast with the swapped direction: from a 3-set into a 5-set, 60 one-one and 0 onto.',
        ], answer: '150 onto; 0 one-one; 93 into.' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find the condition on p, q for f(x) = x³ + px² + qx + r to be one-one on ℝ, and exhibit a witness pair when it fails.', solution: [
          'Set $f(x_1) = f(x_2)$ and subtract: $(x_1^3 - x_2^3) + p(x_1^2 - x_2^2) + q(x_1 - x_2) = 0$.',
          'Factor out $(x_1 - x_2)$: the bracket is $x_1^2 + x_1x_2 + x_2^2 + p(x_1 + x_2) + q$.',
          'Write $u = x_1 + x_2$ and complete: the bracket equals $\\tfrac{3u^2}{4} + pu + q + \\tfrac{(x_1 - x_2)^2}{4}$ — and the last term can be ANY non-negative number as $x_1, x_2$ range freely.',
          'So, a witness exists exactly when $\\tfrac{3u^2}{4} + pu + q$ dips below zero for some $u$ — i.e. when the quadratic $3u^2 + 4pu + 4q$ takes a negative value, which happens exactly when its discriminant $16p^2 - 48q$ is positive: $p^2 > 3q$.',
          'Hence one-one exactly when $p^2 \\leq 3q$. When it fails, witness the classic: $p = 3, q = 1$ gives $f(x) = x^3 + 3x^2 + x$, and $f(-1 + \\sqrt{2}) = f(-1 - \\sqrt{2}) = 1$.',
        ], answer: 'One-one iff p² ≤ 3q; e.g. p = 3, q = 1 fails with witness −1 ± √2 both mapping to 1.' },
        { q: 'Classify f : ℝ → A, f(x) = (x² + 2)/(x² + 3): give the verdict on one-one, the honest onto codomain A, and the shape of the range argument.', solution: [
          'One-one: the machine is EVEN — $f(-x) = f(x)$ — so $f(-1) = f(1)$ witnesses many-one.',
          'Range: fold the rule as $1 - \\tfrac{1}{x^2 + 3}$; now $x^2 + 3 \\geq 3$, so $0 < \\tfrac{1}{x^2+3} \\leq \\tfrac{1}{3}$.',
          'So, $\\tfrac{2}{3} \\leq f(x) < 1$: the bottom is attained at $x = 0$ ($f(0) = \\tfrac{2}{3}$) and the top is approached but never reached.',
          'Hence many-one, onto exactly $A = [\\tfrac{2}{3}, 1)$.',
        ], answer: 'Many-one; onto codomain [2/3, 1).' },
      ] },
      { level: 'L6', questions: [
        { q: 'f : ℚ → ℚ satisfies f(x + y) = f(x) + f(y) for all rationals, and f(1) = 2. Prove f(x) = 2x and conclude the verdicts.', solution: [
          'The additive law pins everything to $f(1)$: $f(2) = f(1) + f(1) = 4$, and building up, $f(n) = 2n$ for every positive integer $n$.',
          'Also $f(0) = f(0) + f(0)$ forces $f(0) = 0$, and then $0 = f(n + (-n)) = f(n) + f(-n)$ gives $f(-n) = -2n$: the integers are pinned.',
          'Fractions: $n \\cdot f(\\tfrac{1}{n}) = f(\\tfrac{1}{n}) + \\cdots + f(\\tfrac{1}{n}) = f(1) = 2$, so $f(\\tfrac{1}{n}) = \\tfrac{2}{n}$.',
          'So, $f(\\tfrac{m}{n}) = m \\cdot f(\\tfrac{1}{n}) = \\tfrac{2m}{n}$: the rule is forced — $f(x) = 2x$ on all of $\\mathbb{Q}$.',
          'One-one: $2x_1 = 2x_2$ forces $x_1 = x_2$. Onto: every rational target $y$ has the preimage $\\tfrac{y}{2}$, itself rational.',
          'Hence $f$ is bijective — a functional equation pinning a machine so hard that both verdicts fall for free (lesson 10.2 will run this craft at full depth).',
        ], answer: 'f(x) = 2x; bijective on ℚ.' },
      ] },
    ] },

    { kind: 'formula', name: 'One-one, symbolically', latex: 'f \\text{ one-one} \\iff \\left( f(x_1) = f(x_2) \\Rightarrow x_1 = x_2 \\right) \\iff \\left( x_1 \\neq x_2 \\Rightarrow f(x_1) \\neq f(x_2) \\right)', note: 'prove by the contrapositive; kill by one witness pair' },
    { kind: 'formula', name: 'Onto, symbolically', latex: 'f \\text{ onto} \\iff \\forall y \\in Y\\ \\exists x \\in X : f(x) = y \\iff \\mathrm{Rng}(f) = Y', note: 'the range must fill the DECLARED codomain; into means Range ⊊ Y' },
    { kind: 'formula', name: 'The injection count', latex: '\\#\\{\\text{one-one } m \\to n\\} = {}^nP_m = n(n-1)\\cdots(n - m + 1) \\quad (m \\leq n; \\text{ else } 0)', note: 'seat inputs on distinct targets — the chain that empties is the pigeonhole' },
    { kind: 'formula', name: 'The surjection count', latex: '\\#\\{\\text{onto } m \\to n\\} = \\sum_{k=0}^{n} (-1)^k\\, {}^nC_k\\,(n-k)^m \\quad (n \\leq m; \\text{ else } 0)', note: 'inclusion–exclusion over missed targets; e.g. 3⁵ − 3·2⁵ + 3·1⁵ = 150 for 5 → 3' },
    { kind: 'formula', name: 'The bijection count', latex: '\\#\\{\\text{bijective } n \\to n\\} = n!', note: 'a perfect pairing; bijective = one-one + onto = the invertibility promise of lesson 1.4' },
  ],
}

/* ------------------------------------------------------------------ */
/* chapter assembly                                                    */
/* ------------------------------------------------------------------ */

export const chapter01: Chapter = {
  number: 1,
  slug: 'functions-as-objects',
  title: 'Functions as Objects',
  summary:
    'The book opens exactly where Elementary Algebra ended: the input-output machine becomes an object in its own right. First the set-of-pairs view — a relation as a subset of a product, a function as the special relation that is total and single-valued, the ground NCERT class 11–12 calls Relations and Functions and AL 11.3 never needed. Then the machine is classified: one-one, onto, the horizontal probe read at depth and the finite-set pigeonhole verdict. Then machines are wired in series — composition, its honest domain, its associativity, the identity — and finally undone: the inverse machine, when it exists, why existence is exactly one-one plus onto, and how the domain and range swap places. Piecewise-defined functions read honestly as machines with a switch; the transformation grammar — shifts, reflections, and the vertical and the horizontal stretch or squeeze — priced on the parent curves; and the craft of finding a function from a graph or a data table (the module’s problems based on finding function). This is the grammar every later chapter speaks.',
  status: 'in-progress',
  lessons: [lesson11, lesson12],
  plannedLessons: [
    'Composition: Machines in Series',
    'Inverse Functions: the Machine Undone',
    'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog',
    'Even and Odd Functions and Their Extensions',
    'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph',
    'The Period Census: Periods of Transformed and Composite Functions',
  ],
}

