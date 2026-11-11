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
  <ellipse cx="170" cy="160" rx="115" ry="105" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>
  <ellipse cx="550" cy="160" rx="115" ry="105" fill="#ffedd5" stroke="#16a34a" stroke-width="2.4"/>
  <text x="170" y="52" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">A (the inputs)</text>
  <text x="550" y="52" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">B (the codomain)</text>
  ${dot(175, 95, '1', false)}
  ${dot(112, 200, '4', false)}
  ${dot(235, 205, '5', false)}
  ${dot(545, 95, '1', true)}
  ${dot(487, 205, '2', false)}
  ${dot(607, 200, '7', false)}
  ${arrow(175, 95, 487, 205)}
  ${arrow(175, 95, 607, 200)}
  ${arrow(112, 200, 607, 200)}
  ${arrow(235, 205, 607, 200)}
  <text x="545" y="130" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">never hit</text>
  <text x="170" y="296" text-anchor="middle" font-size="14" fill="#0f766e">domain = {1, 4, 5} — every input fires</text>
  <text x="560" y="296" text-anchor="middle" font-size="14" fill="#0f766e">range = {2, 7} ⊆ codomain {1, 2, 7}</text>
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
        `<rect x="${x}" y="66" width="128" height="40" rx="10" fill="#16a34a"/>` +
        `<rect x="${x}" y="90" width="128" height="16" fill="#16a34a"/>` +
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
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two graphs: a one-one curve cut once by every horizontal probe, and a many-one curve cut twice by the probe y equals 5">
  <!-- left panel: y = x^3 + x + 1 -->
  <text x="185" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">y = x³ + x + 1 — every probe cuts once</text>
  <line x1="30" y1="160" x2="330" y2="160" stroke="#65a30d" stroke-width="1.4"/>
  <line x1="180" y1="20" x2="180" y2="260" stroke="#65a30d" stroke-width="1.4"/>
  <text x="326" y="176" text-anchor="end" font-size="12" fill="#0f766e">x</text>
  <text x="188" y="28" font-size="12" fill="#0f766e">y</text>
  <polyline points="60,250 90,199 120,170 150,156 180,150 210,144 240,130 270,101 300,50" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="40" y1="110" x2="320" y2="110" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 5"/>
  <circle cx="263" cy="110" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <text x="263" y="96" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">one cut</text>
  <text x="52" y="106" font-size="12" fill="#ea580c">probe y = 5</text>

  <!-- right panel: y = x^2 + 1 -->
  <text x="535" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">y = x² + 1 — the probe cuts twice</text>
  <line x1="380" y1="258" x2="680" y2="258" stroke="#65a30d" stroke-width="1.4"/>
  <line x1="530" y1="20" x2="530" y2="258" stroke="#65a30d" stroke-width="1.4"/>
  <text x="676" y="274" text-anchor="end" font-size="12" fill="#0f766e">x</text>
  <text x="538" y="28" font-size="12" fill="#0f766e">y</text>
  <polyline points="380,47 410,113 440,165 470,201 500,223 530,231 560,223 590,201 620,165 650,113 680,47" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="390" y1="113" x2="690" y2="113" stroke="#ea580c" stroke-width="2" stroke-dasharray="7 5"/>
  <circle cx="410" cy="113" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <circle cx="650" cy="113" r="6" fill="#ea580c" stroke="#fffdf5" stroke-width="2"/>
  <text x="404" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">f(−2) = 5</text>
  <text x="652" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="#ea580c">f(2) = 5</text>
  <text x="535" y="133" text-anchor="middle" font-size="12" fill="#ea580c">probe y = 5</text>

  <text x="360" y="294" text-anchor="middle" font-size="14" fill="#0f766e">the horizontal probe: a full-width sweep of horizontal lines — at most one cut each means one-one; any double cut means many-one</text>
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
  <text x="250" y="272" text-anchor="middle" font-size="13" fill="#dc2626">the red pair must share — every 3-into-2 machine is many-one</text>

  <rect x="535" y="56" width="178" height="66" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="78" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">one-one needs m ≤ n</text>
  <text x="624" y="98" text-anchor="middle" font-size="13" fill="#65a30d">⁵P₃ = 60 injective</text>
  <rect x="535" y="140" width="178" height="66" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="162" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">onto needs n ≤ m</text>
  <text x="624" y="182" text-anchor="middle" font-size="13" fill="#65a30d">150 of 3⁵ = 243 surjective</text>
  <rect x="535" y="224" width="178" height="60" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="624" y="246" text-anchor="middle" font-size="12.5" font-weight="700" fill="#166534">bijective needs m = n</text>
  <text x="624" y="266" text-anchor="middle" font-size="13" fill="#65a30d">3! = 6 pairings</text>
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
/* lesson 1.3 figures                                                  */
/* ------------------------------------------------------------------ */

/** 1.3 — the three-panel wiring: A --f--> B --g--> C with the composite read */
function compositeSeriesSvg(): string {
  const dotA = (y: number, label: string): string =>
    `<circle cx="130" cy="${y}" r="15" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/><text x="130" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">${label}</text>`
  const dotB = (y: number, label: string): string =>
    `<circle cx="360" cy="${y}" r="15" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/><text x="360" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">${label}</text>`
  const dotC = (y: number, label: string): string =>
    `<circle cx="590" cy="${y}" r="15" fill="#ffedd5" stroke="#d97706" stroke-width="2"/><text x="590" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#d97706">${label}</text>`
  const arr = (x1: number, y1: number, x2: number, y2: number, color: string): string => {
    const mx = x2 - 22 * ((x2 - x1) / Math.hypot(x2 - x1, y2 - y1))
    const my = y2 - 22 * ((y2 - y1) / Math.hypot(x2 - x1, y2 - y1))
    return `<line x1="${x1 + 22 * ((x2 - x1) / Math.hypot(x2 - x1, y2 - y1))}" y1="${y1 + 22 * ((y2 - y1) / Math.hypot(x2 - x1, y2 - y1))}" x2="${mx}" y2="${my}" stroke="${color}" stroke-width="2.2" marker-end="url(#arrG)"/><line x1="${x1 + 22 * ((x2 - x1) / Math.hypot(x2 - x1, y2 - y1))}" y1="${y1 + 22 * ((y2 - y1) / Math.hypot(x2 - x1, y2 - y1))}" x2="${mx}" y2="${my}" stroke="${color}" stroke-width="2.2"/>`
  }
  return `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three panels: set A maps by f to set B, then by g to set C; the composite g after f sends each element of A straight to C, reading 10x">
  <defs>
    <marker id="arrG" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#16a34a"/></marker>
    <marker id="arrA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#d97706"/></marker>
    <marker id="arrT" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0f766e"/></marker>
  </defs>
  <ellipse cx="130" cy="150" rx="86" ry="118" fill="#fef3c7" fill-opacity="0.45" stroke="#16a34a" stroke-width="2.2"/>
  <ellipse cx="360" cy="150" rx="86" ry="118" fill="#ffedd5" fill-opacity="0.45" stroke="#16a34a" stroke-width="2.2"/>
  <ellipse cx="590" cy="150" rx="86" ry="118" fill="#ffedd5" fill-opacity="0.45" stroke="#d97706" stroke-width="2.2"/>
  <text x="130" y="20" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">A = {1, 2, 3}</text>
  <text x="360" y="20" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">B = {2, 4, 6, 8}</text>
  <text x="590" y="20" text-anchor="middle" font-size="15" font-weight="700" fill="#d97706">C = {10, 20, 30, 40}</text>
  ${dotA(96, '1')}
  ${dotA(152, '2')}
  ${dotA(208, '3')}
  ${dotB(96, '2')}
  ${dotB(152, '4')}
  ${dotB(208, '6')}
  ${dotB(264, '8')}
  ${dotC(96, '10')}
  ${dotC(152, '20')}
  ${dotC(208, '30')}
  ${dotC(264, '40')}
  ${arr(130, 96, 360, 96, '#16a34a')}
  ${arr(130, 152, 360, 152, '#16a34a')}
  ${arr(130, 208, 360, 208, '#16a34a')}
  <text x="245" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">f: n ↦ 2n</text>
  ${arr(360, 96, 590, 96, '#d97706')}
  ${arr(360, 152, 590, 152, '#d97706')}
  ${arr(360, 208, 590, 208, '#d97706')}
  ${arr(360, 264, 590, 264, '#d97706')}
  <text x="475" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#d97706">g: e ↦ 5e</text>

  <path d="M 148 100 C 240 320, 480 320, 572 100" fill="none" stroke="#0f766e" stroke-width="2.4" stroke-dasharray="7 4" marker-end="url(#arrT)"/>
  <path d="M 148 156 C 240 340, 480 340, 572 156" fill="none" stroke="#0f766e" stroke-width="2.4" stroke-dasharray="7 4" marker-end="url(#arrT)"/>
  <path d="M 148 212 C 240 360, 480 360, 572 212" fill="none" stroke="#0f766e" stroke-width="2.4" stroke-dasharray="7 4" marker-end="url(#arrT)"/>
  <text x="360" y="352" text-anchor="middle" font-size="13.5" font-weight="700" fill="#0f766e">the composite g∘f skips the middle shelf: 1 ↦ 10, 2 ↦ 20, 3 ↦ 30 — indeed (g∘f)(x) = 10x</text>
  <text x="360" y="372" text-anchor="middle" font-size="11.5" fill="#dc2626">8 ↦ 40: fired by g, but never fed by f — the one unused wiring</text>
</svg>`
}

/** 1.3 — the two non-implication wirings: composite outranks g / composite outranks f */
function verdictInheritanceSvg(): string {
  const mini = (cx: number, cy: number, label: string, fill: string, stroke: string): string =>
    `<circle cx="${cx}" cy="${cy}" r="13" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#166534">${label}</text>`
  const line = (x1: number, y1: number, x2: number, y2: number, color: string, dash: string): string =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${dash ? `stroke-dasharray="${dash}"` : ''} marker-end="url(#arrG2)"/>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two wirings prove the non-implications: on the left g after f is one-one and onto even though g is many-one; on the right g after f is onto even though f is not onto">
  <defs>
    <marker id="arrG2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#16a34a"/></marker>
    <marker id="arrA2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706"/></marker>
  </defs>
  <rect x="12" y="14" width="344" height="272" rx="12" fill="#fffdf5" stroke="#16a34a" stroke-width="1.6"/>
  <rect x="364" y="14" width="344" height="272" rx="12" fill="#fffdf5" stroke="#d97706" stroke-width="1.6"/>
  <text x="184" y="40" text-anchor="middle" font-size="13.5" font-weight="700" fill="#166534">g∘f one-one ⇏ g one-one</text>
  <text x="536" y="40" text-anchor="middle" font-size="13.5" font-weight="700" fill="#d97706">g∘f onto ⇏ f onto</text>
  ${mini(60, 96, '1', '#fef3c7', '#16a34a')}
  ${mini(60, 156, '2', '#fef3c7', '#16a34a')}
  ${mini(184, 76, '1', '#ffedd5', '#16a34a')}
  ${mini(184, 126, '2', '#ffedd5', '#16a34a')}
  ${mini(184, 176, '3', '#ffedd5', '#16a34a')}
  ${mini(308, 101, '1', '#ffedd5', '#d97706')}
  ${mini(308, 151, '2', '#ffedd5', '#d97706')}
  ${line(74, 96, 170, 76, '#16a34a', '')}
  ${line(74, 156, 170, 176, '#16a34a', '')}
  <text x="122" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">f: 1↦1, 2↦3</text>
  ${line(198, 76, 294, 96, '#d97706', '')}
  ${line(198, 126, 294, 96, '#d97706', '')}
  ${line(198, 176, 294, 151, '#d97706', '')}
  <text x="184" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">amber arrows: g(1) = g(2) = 1 — the witness</text>
  ${line(322, 101, 388, 96, '#16a34a', '6 3')}
  ${line(322, 151, 388, 156, '#16a34a', '6 3')}
  <text x="184" y="216" text-anchor="middle" font-size="12" fill="#0f766e">composite: 1↦1, 2↦2 — one-one AND onto {1,2}</text>
  <text x="184" y="236" text-anchor="middle" font-size="12" fill="#0f766e">while g collapses 1 and 2 — law (iii) at work</text>
  ${mini(412, 96, '1', '#fef3c7', '#16a34a')}
  ${mini(412, 156, '2', '#fef3c7', '#16a34a')}
  ${mini(536, 76, '1', '#ffedd5', '#16a34a')}
  ${mini(536, 126, '2', '#ffedd5', '#16a34a')}
  ${mini(536, 176, '3', '#ffedd5', '#16a34a')}
  ${mini(660, 126, '1', '#ffedd5', '#d97706')}
  ${line(426, 96, 522, 76, '#16a34a', '')}
  ${line(426, 156, 522, 176, '#16a34a', '')}
  <text x="474" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">f: 1↦1, 2↦3</text>
  <text x="536" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">target 2: never hit — f NOT onto</text>
  ${line(550, 76, 646, 121, '#d97706', '')}
  ${line(550, 126, 646, 126, '#d97706', '')}
  ${line(550, 176, 646, 131, '#d97706', '')}
  <text x="598" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">g: constant 1</text>
  ${line(674, 126, 690, 126, '#16a34a', '6 3')}
  <circle cx="700" cy="126" r="4" fill="#16a34a"/>
  <text x="536" y="236" text-anchor="middle" font-size="12" fill="#0f766e">composite: 1↦1, 2↦1 — onto the singleton {1}</text>
  <text x="536" y="256" text-anchor="middle" font-size="12" fill="#0f766e">while f misses target 2 — law (iv) at work</text>
  <text x="360" y="316" text-anchor="middle" font-size="13" fill="#65a30d">the composite inherits FORWARD from f and g — never backward to both</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 1.3                                                          */
/* ------------------------------------------------------------------ */

const lesson13: Lesson = {
  id: 'aa-composition-machines-in-series',
  number: '1.3',
  title: 'Composition: Machines in Series',
  concepts: [
    'composition as wiring machines in series',
    'the wiring condition: range inside the next domain',
    'the honest domain of a composite',
    'non-commutativity and the pairs that commute',
    'associativity and the identity machine',
    'verdict inheritance through a composite',
    'counting composite pairs and distinct composites',
  ],
  objectives: [
    'wire two machines in series and compute the composite g∘f both as a formula and as a finite roster',
    'apply the wiring condition — the range of f must sit inside the domain of g — and read the honest domain of any composite',
    'decide whether two given machines commute, and exhibit the witness that kills commutativity when it fails',
    'state and use associativity and the two identity laws for composition',
    'apply the four verdict-inheritance laws, including their two converse traps, with finite witnesses',
    'count the pairs (f, g) that build composites and the distinct composites they realize',
  ],
  prerequisites: ['aa-one-one-and-onto-classifying-the-machines', 'al-the-function-idea-the-doorstep'],
  sources: ['cengage-m2-algebra', 'cengage-jee-style', 'ncert-math12-ch1-relations-functions', 'ncert-math11-ch2-functions', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 1.2 left every machine carrying two verdicts — one-one or many-one, onto or into. This lesson stops grading single machines and starts WIRING them: run $f$ first, feed its output straight into $g$, and the pair behaves as one machine. The factory line is the honest picture — a station that presses, then a station that paints, and the conveyor between them carries the part from the one to the other. What emerges is a new function built from two old ones, and with it three questions the examinations love: when may the wiring be closed at all, does the order of the stations matter, and which of the two verdicts survives the trip through the line?' },
    { kind: 'para', text: 'Everything here runs on the pair-list discipline of lesson 1.1: a function IS its set of pairs, so composing machines is a operation on pair-lists — look up the first machine\u2019s pair, then hand its second entry to the second machine as a first entry. Keep that concrete picture close; the notation is about to get dense enough that the picture is the only thing that keeps it honest.' },

    { kind: 'heading', text: 'Machines in Series: the Composite Defined' },
    { kind: 'callout', tone: 'definition', title: 'Composite function', text: 'Let $f : A \\to B$ and $g : B \\to C$ be functions. The composite of $g$ after $f$, written $g \\circ f$, is the function from $A$ to $C$ defined by feeding each output of $f$ into $g$: thus, $(g \\circ f)(x) = g(f(x))$ for every $x \\in A$. Read the symbol OUT-IN: the machine nearest the input runs FIRST.' },
    { kind: 'equation', latex: '(g \\circ f)(x) = g\\bigl(f(x)\\bigr), \\qquad g \\circ f : A \\to C', note: 'the output of f is the input of g — the conveyor carries f(x) from the first station to the second' },
    { kind: 'para', text: 'The order trap is built into the notation itself, and examinations set it deliberately. In $g \\circ f$ the letter standing NEAR $x$ acts first: $f$ runs, then $g$. The name reads left to right but the action runs right to left — say aloud "g after f" every time the symbol appears, and the trap dies.' },
    { kind: 'callout', tone: 'warn', title: 'g∘f means “f first, then g”', text: 'Students lose marks by applying $g$ first because $g$ is written first. Freeze the rule: $(g \\circ f)(x) = g(f(x))$ — the INNER machine acts first, the OUTER machine acts second. The composite $f \\circ g$ is a DIFFERENT machine (usually), not a different spelling of the same one.' },
    { kind: 'example', title: 'f(x) = x + 3 and g(x) = 2x² on ℝ. Build g∘f and f∘g', steps: [
      'First, $g$ after $f$: feed $x$ into $x + 3$, then square-double the answer — $(g \\circ f)(x) = 2(x + 3)^2$.',
      'Check one leg numerically: $(g \\circ f)(2) = g(5) = 2 \\cdot 25 = 50$ — the conveyor really carried 5 into the squaring station.',
      'Now the other order, $f$ after $g$: square-double $x$, then add 3 — $(f \\circ g)(x) = 2x^2 + 3$.',
      'Check the same leg: $(f \\circ g)(2) = f(8) = 11$ — a different value entirely.',
      'Hence $g \\circ f = 2(x+3)^2$ and $f \\circ g = 2x^2 + 3$: two different machines, as the two values 50 and 11 witness at $x = 2$ alone.',
    ] },
    { kind: 'figure', caption: 'The full conveyor line. Set A = {1, 2, 3} maps by f(n) = 2n into B = {2, 4, 6, 8}; set B maps by g(e) = 5e into C = {10, 20, 30, 40}. The three green arrows are f, the four amber arrows are g, and the dashed teal arcs skip the middle shelf entirely — the composite g∘f sends 1 ↦ 10, 2 ↦ 20, 3 ↦ 30, which is exactly (g∘f)(x) = 10x. Note the honest red read: g fires the arrow 8 ↦ 40, but no f-output ever lands on 8, so that wiring sits unused.', svg: compositeSeriesSvg() },
    { kind: 'example', title: 'Read the composite off the figure: f: {1,2,3} → {2,4,6,8}, f(n) = 2n; g: {2,4,6,8} → {10,20,30,40}, g(e) = 5e. Compute g∘f completely', steps: [
      'Follow the conveyor element by element: $(g \\circ f)(1) = g(f(1)) = g(2) = 10$.',
      'And $(g \\circ f)(2) = g(4) = 20$, while $(g \\circ f)(3) = g(6) = 30$.',
      'So, the roster of the composite is $\\{(1,10), (2,20), (3,30)\\}$ — the rule collapses to $(g \\circ f)(x) = 10x$: doubling then quintupling multiplies by 10.',
      'The verdicts ride along: $f$ is one-one and into $B$ (target 8 unhit), $g$ is one-one and onto $C$, and the composite $g \\circ f$ is one-one AND onto $C$ — a bijective relay built from a machine that was not onto.',
    ] },

    { kind: 'heading', text: 'When May the Wiring Close?' },
    { kind: 'para', text: 'The composite $g \\circ f$ was introduced with $f : A \\to B$ and $g : B \\to C$ — the second machine\u2019s domain is exactly the first machine\u2019s codomain, so every conveyor load finds a legal station. Real wiring is rarely that tidy: $g$ may be declared on a set that only partly contains the outputs of $f$, and then the line works only for those inputs it can actually feed.' },
    { kind: 'callout', tone: 'definition', title: 'The wiring condition', text: 'The composite $g \\circ f$ is DEFINED exactly when every output of $f$ is a legal input of $g$: thus, $\\mathrm{Rng}(f) \\subseteq \\mathrm{Dom}(g)$. When the condition fails, the composite still exists on the part of the domain that feeds through — its HONEST DOMAIN is $\\mathrm{Dom}(g \\circ f) = \\{x \\in \\mathrm{Dom}(f) : f(x) \\in \\mathrm{Dom}(g)\\}$.' },
    { kind: 'equation', latex: '\\mathrm{Dom}(g \\circ f) = \\{x \\in \\mathrm{Dom}(f)\\ :\\ f(x) \\in \\mathrm{Dom}(g)\\}', note: 'the honest domain: keep exactly the inputs whose outputs the second machine accepts — everything else falls off the conveyor' },
    { kind: 'example', title: 'f is declared on [−2, 3]. Find the honest domain of f(x²), of f(|x|), and of f(2x + 1)', steps: [
      'The demand is always the same: the INNER value must land in $[-2, 3]$ — that is what “declared on” means.',
      'For $f(x^2)$: need $-2 \\leq x^2 \\leq 3$. The left inequality is free ($x^2 \\geq 0 \\geq -2$ always); the right one is $|x| \\leq \\sqrt{3}$. Hence the honest domain is $[-\\sqrt{3}, \\sqrt{3}]$.',
      'For $f(|x|)$: need $-2 \\leq |x| \\leq 3$. The left is free; the right is $|x| \\leq 3$. Hence $[-3, 3]$.',
      'For $f(2x + 1)$: need $-2 \\leq 2x + 1 \\leq 3$, so $-1.5 \\leq x \\leq 1$. Hence $[-\\tfrac{3}{2}, 1]$.',
      'Hence three composites of one machine, three different honest domains — the declaration $[-2, 3]$ filters each inner rule by its own reach.',
    ] },

    { kind: 'heading', text: 'Order Matters: g∘f ≠ f∘g' },
    { kind: 'para', text: 'The example above already settled the headline: the two orders built $2(x+3)^2$ and $2x^2 + 3$ — different machines. Composition is NOT commutative in general: $g \\circ f$ and $f \\circ g$ disagree whenever one witness input separates them. Two short honest remarks complete the picture.' },
    { kind: 'list', marker: 'roman', items: [
      '**The general rule is disagreement.** To prove two composites differ, one input with different outputs is a full proof: for $f(x) = 2x$ and $g(x) = x + 1$, the input $0$ gives $(g \\circ f)(0) = 1$ but $(f \\circ g)(0) = 2$. No enumeration, no algebra — one witness.',
      '**Some pairs DO commute.** $f(x) = x^2$ and $g(x) = x^3$ compose to $x^6$ in either order — both $(g \\circ f)(x) = (x^2)^3$ and $(f \\circ g)(x) = (x^3)^2$ are the sixth power. The translations $x + k$ and $x + m$ commute too (either order gives $x + k + m$). Commutativity is a special coincidence, never an assumption.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why “commute” is the right word', text: 'Two machines commute when they can pass each other on the conveyor without changing the result — the same vocabulary as $a \\cdot b = b \\cdot a$ from school arithmetic. The squaring and cubing stations commute because both products land on the sixth power; the doubling and the increment stations do not, because $+$ and $\\times$ refuse to swap. Every claim of commutativity needs its own proof — or its own witness against.' },

    { kind: 'heading', text: 'Three Machines Deep: Associativity and the Identity' },
    { kind: 'para', text: 'Wire three machines $f : A \\to B$, $g : B \\to C$, $h : C \\to D$ and a natural question appears: does it matter which adjacent pair is bundled first? The relay answer is no — and the proof is one line long because the conveyor has only one direction to run.' },
    { kind: 'derivation', title: 'Composition is associative', statement: 'Why does $(h \\circ g) \\circ f = h \\circ (g \\circ f)$ hold for every composable triple?', steps: [
      { label: 'Track one input through the left grouping', formula: '\\bigl((h \\circ g) \\circ f\\bigr)(x) = (h \\circ g)(f(x)) = h\\bigl(g(f(x))\\bigr)', explanation: 'the bundle (h∘g) is itself just “run g, then h” — so the whole expression reduces to the straight relay.' },
      { label: 'Track the same input through the right grouping', formula: '\\bigl(h \\circ (g \\circ f)\\bigr)(x) = h\\bigl((g \\circ f)(x)\\bigr) = h\\bigl(g(f(x))\\bigr)', explanation: 'bundling (g∘f) first changes the bookkeeping, not the journey: f runs, then g, then h.' },
      { label: 'Compare', formula: '(h \\circ g) \\circ f = h \\circ (g \\circ f)', explanation: 'the two groupings send every x to the same place — the relay is unambiguous. Parentheses may move; the ORDER of the stations may not. That asymmetry is the whole character of composition.' },
    ], result: '(h \\circ g) \\circ f = h \\circ (g \\circ f): three-deep composition needs no brackets — only order.' },
    { kind: 'para', text: 'The identity machine of a set — $I_A(x) = x$, the do-nothing station — behaves in composition the way 0 behaves in addition and 1 behaves in multiplication: it is the neutral element. Run any machine after it or before it and nothing changes: $f \\circ I_A = f$ (the conveyor pauses, then presses) and $I_B \\circ f = f$ (the conveyor presses, then pauses). The identity is the machine every undo machine will be measured against in lesson 1.4.' },
    { kind: 'equation', latex: 'f \\circ I_A = f \\qquad \\text{and} \\qquad I_B \\circ f = f', note: 'the do-nothing station is neutral on both sides — 0 for addition, 1 for multiplication, I for composition' },

    { kind: 'heading', text: 'What the Verdicts Inherit' },
    { kind: 'para', text: 'Now the lesson\u2019s deepest question: if you know the verdicts of $f$ and $g$ separately, what can you conclude about $g \\circ f$? Four laws answer it — and the direction of each implication is exactly what examinations test. The proofs are conveyor arguments.' },
    { kind: 'list', marker: 'roman', items: [
      '**One-one inherits forward.** If $f$ and $g$ are both one-one, so is $g \\circ f$.',
      '**Onto inherits forward.** If $f$ and $g$ are both onto, so is $g \\circ f$.',
      '**From the composite back to the FIRST machine.** If $g \\circ f$ is one-one, then $f$ must be one-one — but $g$ need not be.',
      '**From the composite back to the LAST machine.** If $g \\circ f$ is onto, then $g$ must be onto — but $f$ need not be.',
    ] },
    { kind: 'derivation', title: 'The two forward inheritances, proved on the conveyor', statement: 'Why do one-one and onto both travel forward through a composition?', steps: [
      { label: 'Law (i): assume g∘f(x₁) = g∘f(x₂)', formula: 'g(f(x_1)) = g(f(x_2)) \\;\\Rightarrow\\; f(x_1) = f(x_2) \\;\\Rightarrow\\; x_1 = x_2', explanation: 'the first arrow is g being one-one (equal outputs force equal inputs), the second is f being one-one. Two clean links, both supplied by the hypotheses.' },
      { label: 'Law (ii): chase a preimage', formula: 'z \\in C \\;\\Rightarrow\\; \\exists\\, y \\in B : g(y) = z \\;\\Rightarrow\\; \\exists\\, x \\in A : f(x) = y \\;\\Rightarrow\\; (g \\circ f)(x) = z', explanation: 'g onto hands back a preimage y; f onto hands back a preimage x of THAT; the relay carries x all the way to z. Coverage flows through the line.' },
      { label: 'Read the direction honestly', formula: 'f, g \\text{ one-one} \\Rightarrow g \\circ f \\text{ one-one}; \\quad f, g \\text{ onto} \\Rightarrow g \\circ f \\text{ onto}', explanation: 'both laws run FORWARD only — from the stations to the line. The reverse directions are exactly the traps the next figure wires up.' },
    ], result: '\\text{(i) and (ii): one-one and onto inherit forward through any composition.}' },
    { kind: 'figure', caption: 'The two converse traps, wired with finite witnesses. Left: f: {1,2} → {1,2,3} is one-one and g: {1,2,3} → {1,2} collapses g(1) = g(2) = 1 — yet the composite sends 1 ↦ 1 and 2 ↦ 2: one-one AND onto. A many-one station can hide behind a one-one first leg (law iii). Right: f misses target 2 entirely while g is the constant machine onto {1} — and the composite 1 ↦ 1, 2 ↦ 1 IS onto {1}. An unfinished first leg can still feed a covering last leg (law iv).', svg: verdictInheritanceSvg() },
    { kind: 'callout', tone: 'warn', title: 'The two traps, stated for the exam', text: '“$g \\circ f$ one-one” forces $f$ one-one and NOTHING about $g$; “$g \\circ f$ onto” forces $g$ onto and NOTHING about $f$. Every true/false item of the shape “if $g \\circ f$ is one-one then $g$ is one-one” is FALSE, and the left wiring of the figure above is the standing counterexample: memorize one wiring, kill every trap.' },
    { kind: 'callout', tone: 'theorem', title: 'The bijective composite splits cleanly', text: 'Combining laws (iii) and (iv): if $g \\circ f$ is BIJECTIVE, then $f$ is one-one and $g$ is onto — no exceptions. The composite cannot outrank that split: a bijective relay needs a waste-free first station and a covering last station, while the middle may still be imperfect. Lesson 1.4 turns this split into the exact test for undoing machines.' },
    { kind: 'example', title: 'Counting the wirings: A = {1,2}, B = {1,2,3}, C = {1,2}. How many pairs (f, g) build composites, and how many distinct composites can appear?', steps: [
      'The pair count is the FM choice chain: $f$ is any of $3^2 = 9$ machines $A \\to B$, and $g$ any of $2^3 = 8$ machines $B \\to C$ — so $9 \\cdot 8 = 72$ wiring pairs.',
      'Each pair produces ONE composite, but different pairs may produce the same composite: the composite is always a machine $A \\to C$, and there are only $2^2 = 4$ of those.',
      'Enumerate the four: send both inputs to 1; send both to 2; the identity $1 \\mapsto 1, 2 \\mapsto 2$; the swap $1 \\mapsto 2, 2 \\mapsto 1$.',
      'All four ARE realized — the identity comes from $f = \\mathrm{id}$-into-$B$ with $g$ matching on the used images; the swap from the same trick with crossed targets. Hence 72 pairs funnel onto exactly 4 distinct composites.',
      'The census law: pairs $= b^a \\cdot c^b$ with distinct composites bounded by $c^a$, and here the bound is attained.',
    ] },

    { kind: 'terms', items: [
      { term: 'composite function', def: 'the machine $g \\circ f$ built by running $f$ first and $g$ second: $(g \\circ f)(x) = g(f(x))$ — the conveyor made official' },
      { term: 'wiring condition', def: '$\\mathrm{Rng}(f) \\subseteq \\mathrm{Dom}(g)$ — the outputs of the first station must all be legal inputs of the second' },
      { term: 'honest domain', def: '$\\mathrm{Dom}(g \\circ f) = \\{x \\in \\mathrm{Dom}(f) : f(x) \\in \\mathrm{Dom}(g)\\}$ — the inputs that actually survive the trip' },
      { term: 'commuting machines', def: 'a pair with $g \\circ f = f \\circ g$ — a provable coincidence, never an assumption (powers commute; a doubling and an increment do not)' },
      { term: 'identity function', def: '$I_A(x) = x$ — the do-nothing station, neutral on both sides of every composition' },
      { term: 'verdict inheritance', def: 'the four laws moving one-one/onto verdicts between stations and the composite — forward from both, backward only to the nearest machine' },
    ] },

    { kind: 'heading', text: 'The Road to the Undo Machine' },
    { kind: 'para', text: 'One bridge remains before lesson 1.4. Among all composites, the one worth naming is the composite that does NOTHING: a machine $g$ running after $f$ that returns every input exactly where it started — $g(f(x)) = x$ for all $x$. Such a $g$ is the UNDO of $f$, and the verdicts of this lesson decide when it can exist at all: the relay must be waste-free (one-one, or the undo would not know which input to return) and covering (onto, or some outputs would have no return ticket). The invertibility test of the next lesson is the bijective verdict wearing work clothes.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main syllabus names “composition of functions” verbatim in unit 1, and NCERT Class 12 chapter 1 exercises the same wiring. Expect: compute $g \\circ f$ and $f \\circ g$ on finite rosters and show them different; find the honest domain of $f(g(x))$ from declared intervals; true/false banks on all four inheritance laws (the two converse traps are the most-missed); and the identity-verification items that lesson 1.4 will formalize — across JEE Main/Advanced, CUET and board papers, in single-correct, multi-correct and assertion-reason formats.' },
    { kind: 'callout', tone: 'historical', title: 'Who drew the first arrows?', text: 'The language this lesson speaks — $f : A \\to B$, arrows between sets, composition read as a journey — was standardized by the Bourbaki group, the collective of mathematicians publishing under a single pseudonym from 1939 whose Éléments de mathématique rebuilt analysis on set-language foundations. The arrow notation made composition look the way it FEELS: a journey through stations. Earlier writers composed functions too (Euler manipulated $f(g(x))$ freely), but Bourbaki fixed the notation every modern textbook, including this one, inherits.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The composite g∘f sends x to', options: ['g(f(x)) — f runs first, g second', 'f(g(x)) — g runs first, f second', 'f(x) · g(x) — the outputs multiply', 'g(f(x)) = f(g(x)) for every pair'], answer: 0, explain: 'The inner machine acts first: $g(f(x))$. Option 2 is the OTHER composite $f \\circ g$; option 3 confuses composition with pointwise multiplication (a different operation entirely); option 4 is the commutativity assumption the lesson kills with the witness $(g \\circ f)(2) = 50$ against $(f \\circ g)(2) = 11$.' },
      { q: 'f : A → B and g : C → D are declared. The composite g∘f is defined exactly when', options: ['A = C', 'every output of f is a legal input of g — Rng(f) ⊆ Dom(g)', 'B = D', 'f and g are both onto'], answer: 1, explain: 'The conveyor needs every $f$-output accepted by $g$ — that is $\\mathrm{Rng}(f) \\subseteq \\mathrm{Dom}(g)$. Option 1 demands the domains match (too strong, and the wrong side); option 3 confuses codomain with domain; option 4 drags in verdicts that have nothing to do with whether the wiring closes.' },
      { q: 'f(x) = x + 2 and g(x) = 3x. The value (g∘f)(1) is', options: ['9', '5', '6', '3'], answer: 0, explain: 'Run $f$ first: $f(1) = 3$; then $g$: $g(3) = 9$. The distractors are the standard slips: $5 = (f \\circ g)(1)$ is the swapped order; $6 = f(1) + g(1) = 3 + 3$ sums the outputs; $3 = f(1)$ stops after the first leg.' },
      { q: 'If g∘f is one-one, which verdict is FORCED?', options: ['g is one-one', 'f is one-one; g may still be many-one', 'both g and f are one-one', 'neither verdict is forced'], answer: 1, explain: 'Law (iii) runs backward only to the FIRST machine: $f$ one-one, $g$ unconstrained. The left wiring of the inheritance figure is the standing counterexample to options 1 and 3 — $g$ collapses 1 and 2 while the composite stays one-one. Option 4 forgets that half the law does hold.' },
      { q: 'For f : A → B, the composite I_B ∘ f (the identity of B after f) equals', options: ['I_A', 'f', 'f ∘ I_B', 'it is undefined'], answer: 1, explain: '$(I_B \\circ f)(x) = I_B(f(x)) = f(x)$: pausing AFTER the machine changes nothing, so the composite is $f$ itself. Option 1 is the identity of the DOMAIN — a different machine that the OTHER law ($f \\circ I_A = f$) leaves untouched; option 3 composes in the wrong direction ($f \\circ I_B$ would need $B \\subseteq A$ — generally not wired); undefined is wrong because $\\mathrm{Rng}(f) \\subseteq B = \\mathrm{Dom}(I_B)$ — the wiring condition holds by construction.' },
    ] },

    { kind: 'exercises', title: 'Exercises 1.3', sets: [
      { level: 'L1', questions: [
        { q: 'f: {1,2,3,4} → {1,3,4} is given by f(1) = 3, f(2) = 1, f(3) = 4, f(4) = 1, and g: {1,3,4} → {7,9} by g(1) = 7, g(3) = 7, g(4) = 9. Compute g∘f completely and give its range.', solution: [
          'Follow the conveyor input by input: $(g \\circ f)(1) = g(f(1)) = g(3) = 7$.',
          'And $(g \\circ f)(2) = g(1) = 7$, while $(g \\circ f)(3) = g(4) = 9$ and $(g \\circ f)(4) = g(1) = 7$.',
          'So, the roster is $\\{(1,7), (2,7), (3,9), (4,7)\\}$ — three of four inputs funnel into 7.',
          'Hence the range is $\\{7, 9\\}$: the composite is many-one (witness $(g \\circ f)(1) = (g \\circ f)(4) = 7$) and onto $\\{7, 9\\}$.',
        ], answer: 'g∘f = {(1,7), (2,7), (3,9), (4,7)}; range {7, 9}.' },
        { q: 'For f(x) = x + 1 and g(x) = 3x on ℝ, build g∘f and f∘g, and evaluate both at x = 2.', solution: [
          'First order: $(g \\circ f)(x) = g(x + 1) = 3(x + 1) = 3x + 3$.',
          'Second order: $(f \\circ g)(x) = f(3x) = 3x + 1$.',
          'At $x = 2$: $(g \\circ f)(2) = 9$ and $(f \\circ g)(2) = 7$.',
          'Hence the two composites differ — one witness at $x = 2$ settles the non-commutativity for this pair.',
        ], answer: 'g∘f = 3x + 3, f∘g = 3x + 1; at x = 2 they give 9 and 7.' },
        { q: 'On [0, ∞), let f(x) = x² and g(x) = √x. Show that g∘f and f∘g agree, and name the machine they both equal.', solution: [
          'For $x \\geq 0$: $(g \\circ f)(x) = g(x^2) = \\sqrt{x^2} = |x| = x$ — the square root returns the input, because the input never went negative.',
          'And $(f \\circ g)(x) = f(\\sqrt{x}) = (\\sqrt{x})^2 = x$.',
          'Hence both composites equal $I(x) = x$ on $[0, \\infty)$: the pair commutes, and more — each machine undoes the other.',
          'That undoing is not a coincidence of this section alone; it is exactly the structure lesson 1.4 names the INVERSE.',
        ], answer: 'Both composites equal the identity on [0, ∞) — the pair commutes (and anticipates 1.4).' },
      ] },
      { level: 'L2', questions: [
        { q: 'f is declared on [−1, 4]. Find the honest domain of f(x²).', solution: [
          'The inner value must land in the declaration: $-1 \\leq x^2 \\leq 4$.',
          'The left inequality is free ($x^2 \\geq 0$); the right gives $|x| \\leq 2$.',
          'Hence the honest domain is $[-2, 2]$ — the inputs whose squares stay inside $[-1, 4]$.',
        ], answer: '[−2, 2].' },
        { q: 'f(x) = x for x < 1 and x² for x ≥ 1; g(x) = 2x for x < 2 and x + 2 for x ≥ 2. Build g∘f as a piecewise formula.', solution: [
          'The branch of $g$ is decided by WHERE $f(x)$ lands relative to 2, not by where $x$ sits.',
          'For $x < 1$: $f(x) = x < 2$, so $g(f(x)) = 2x$ — the composite opens with $2x$.',
          'For $1 \\leq x < \\sqrt{2}$: $f(x) = x^2 < 2$, so $g(f(x)) = 2x^2$.',
          'For $x \\geq \\sqrt{2}$: $f(x) = x^2 \\geq 2$, so $g(f(x)) = x^2 + 2$.',
          'Hence $g \\circ f = \\{2x,\\ x < 1;\\ 2x^2,\\ 1 \\leq x < \\sqrt{2};\\ x^2 + 2,\\ x \\geq \\sqrt{2}\\}$ — three branches, the middle one born from the composition itself.',
        ], answer: 'g∘f = {2x, x < 1; 2x², 1 ≤ x < √2; x² + 2, x ≥ √2}.' },
        { q: 'Show that f(x) = 2x and g(x) = x + 1 do NOT commute, and give the general formulas for both composites.', solution: [
          'Witness first — the cheapest proof: $(g \\circ f)(0) = g(0) = 1$, but $(f \\circ g)(0) = f(1) = 2$. One input, two answers: done.',
          'For the record, the formulas: $(g \\circ f)(x) = 2x + 1$ (double, then increment) and $(f \\circ g)(x) = 2(x + 1) = 2x + 2$ (increment, then double).',
          'The disagreement is permanent — $2x + 1 = 2x + 2$ has no solution — so the witness at 0 was not an accident.',
          'Hence doubling and incrementing are locked in order: the increment must run second to add 1, and running it first adds 2.',
        ], answer: 'They do not commute: g∘f = 2x + 1 but f∘g = 2x + 2.' },
      ] },
      { level: 'L3', questions: [
        { q: 'With f(x) = x + 1, g(x) = 2x, h(x) = x² on ℝ, verify associativity numerically at x = 3 by computing (h∘g)∘f(3) and h∘(g∘f)(3).', solution: [
          'Left grouping: $(g \\circ f)(3) = g(4) = 8$, then $(h \\circ (g \\circ f))(3) = h(8) = 64$.',
          'Right grouping: $(h \\circ g)(3) = h(6) = 36$, then $((h \\circ g) \\circ f)(3) = 36 \\circ$? — careful: $((h \\circ g) \\circ f)(3) = (h \\circ g)(f(3)) = (h \\circ g)(4) = h(8) = 64$.',
          'Hence both groupings give 64 — the relay $3 \\mapsto 4 \\mapsto 8 \\mapsto 64$ is unambiguous.',
          'The lesson\u2019s derivation proves this for EVERY input; the arithmetic here is the sanity walk, and $x^6 = (2x+2)^2$ at $x = 3$ confirms the closed form $h(g(f(x))) = (2x + 2)^2$.',
        ], answer: 'Both groupings give 64 — associativity confirmed at x = 3.' },
        { q: 'A = {1,2}, B = {1,2}, C = {1,2,3}. How many pairs (f, g) build composites, how many DISTINCT composites can appear, and are they all realized?', solution: [
          'Pair count: $f$ is one of $2^2 = 4$ machines $A \\to B$, $g$ one of $3^2 = 9$ machines $B \\to C$ — $4 \\cdot 9 = 36$ pairs.',
          'Each composite is a machine $A \\to C$, and there are $3^2 = 9$ of those — so the distinct count is at most 9.',
          'All 9 are realized: fix $f$ sending $1 \\mapsto 1, 2 \\mapsto 2$ (legal since $A \\subseteq$-copies into $B$), then every choice of $g$ on the used images yields a different composite — and $g$ restricted to $\\{1, 2\\}$ runs over all $9$ maps $A \\to C$.',
          'Hence 36 pairs funnel onto exactly 9 distinct composites, every one realized.',
        ], answer: '36 pairs; 9 distinct composites; all realized.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (numerical value): n(A) = 2, n(B) = 3, n(C) = 4. How many pairs (f, g) with f : A → B and g : B → C?', solution: [
          'Chain the independent choices: $f$ is one of $3^2 = 9$ machines, $g$ one of $4^3 = 64$.',
          'So, the pair count is $9 \\cdot 64 = 576$.',
          'The distinct composites are machines $A \\to C$: at most $4^2 = 16$ of them — the census bound, whether or not every value is realized here.',
        ], answer: '576 pairs (and at most 16 distinct composites).' },
        { q: 'f: {1,2,3} → {1,2,3,4} sends 1↦1, 2↦2, 3↦3; g: {1,2,3,4} → {1,2,3} sends 1↦2, 2↦3, 3↦1, 4↦1. Give the verdicts of f, g, and g∘f, and name the inheritance law your composite verdict illustrates.', solution: [
          'The verdicts of $f$: one-one (no two inputs share an output) but into — target 4 of $B$ is never hit.',
          'The verdicts of $g$: many-one ($g(1) = g(4) = 1$) but onto (all of $\\{1,2,3\\}$ is hit).',
          'The composite: $(g \\circ f)(1) = g(1) = 2$, $(g \\circ f)(2) = g(2) = 3$, $(g \\circ f)(3) = g(3) = 1$ — the cycle $1 \\mapsto 2 \\mapsto 3 \\mapsto 1$: one-one AND onto $\\{1,2,3\\}$.',
          'Hence a bijective composite from a many-one LAST station — law (iii) in the flesh: $g \\circ f$ one-one forced $f$ one-one and said nothing about $g$.',
        ], answer: 'f one-one into; g many-one onto; g∘f bijective on {1,2,3} — law (iii) at work.' },
      ] },
      { level: 'L5', questions: [
        { q: 'f(x) = x + 2 for x < 1 and x² for x ≥ 1; g(x) = x³ for x < 0 and x + 1 for x ≥ 0. Build g∘f as a piecewise formula and give its honest range.', solution: [
          'The branch of $g$ keys on the SIGN of $f(x)$: $f(x) < 0$ happens only on the first leg, when $x + 2 < 0$, i.e. $x < -2$.',
          'For $x < -2$: $f(x) = x + 2 < 0$, so $g(f(x)) = (x+2)^3$.',
          'For $-2 \\leq x < 1$: $f(x) = x + 2 \\geq 0$, so $g(f(x)) = (x + 2) + 1 = x + 3$.',
          'For $x \\geq 1$: $f(x) = x^2 \\geq 0$, so $g(f(x)) = x^2 + 1$.',
          'Ranges branch by branch: $(x+2)^3$ on $x < -2$ gives $(-\\infty, 0)$; $x + 3$ on $[-2, 1)$ gives $[1, 4)$; $x^2 + 1$ on $x \\geq 1$ gives $[2, \\infty)$.',
          'Hence $g \\circ f = \\{(x+2)^3,\\ x < -2;\\ x + 3,\\ -2 \\leq x < 1;\\ x^2 + 1,\\ x \\geq 1\\}$ with honest range $(-\\infty, 0) \\cup [1, \\infty)$ — the strip $[0, 1)$ is fed by no branch.',
        ], answer: 'g∘f = {(x+2)³, x < −2; x+3, −2 ≤ x < 1; x²+1, x ≥ 1}; range (−∞, 0) ∪ [1, ∞).' },
        { q: 'For which values of a do f(x) = ax + 1 and g(x) = x + a commute? Then exhibit a pair of affine machines that does NOT commute.', solution: [
          'Compute both orders: $(g \\circ f)(x) = ax + 1 + a$ and $(f \\circ g)(x) = a(x + a) + 1 = ax + a^2 + 1$.',
          'They agree for every $x$ exactly when $1 + a = a^2 + 1$, i.e. $a = a^2$, i.e. $a = 0$ or $a = 1$.',
          'Check the survivors: $a = 0$ gives $f(x) = 1$ (constant — and $g \\circ f = f \\circ g = 1$ ✓); $a = 1$ gives $f = g = x + 1$ (equal machines trivially commute ✓).',
          'The counterexample: $f(x) = 2x$ and $g(x) = x + 1$ — $(g \\circ f)(x) = 2x + 1$ against $(f \\circ g)(x) = 2x + 2$, disagreeing everywhere.',
          'Hence only the degenerate scalings commute; a genuine dilation and a genuine translation never do.',
        ], answer: 'a = 0 or a = 1; the pair 2x and x + 1 does not commute.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Construct functions f : A → B and g : B → C (finite sets) such that g∘f is ONTO while f is NOT onto. Then prove that in ANY such wiring, g must be onto.', solution: [
          'The construction: $A = \\{1, 2\\}$, $B = \\{1, 2, 3\\}$, $C = \\{1\\}$; let $f(1) = 1$, $f(2) = 3$ (target 2 never hit — $f$ is NOT onto) and $g$ the constant machine $g(1) = g(2) = g(3) = 1$.',
          'The composite: $(g \\circ f)(1) = 1$ and $(g \\circ f)(2) = 1$ — it maps every input to 1, which is exactly ALL of $C$: onto.',
          'Now the proof that $g$ is forced: take any $z \\in C$. Since $g \\circ f$ is onto, $z = (g \\circ f)(x) = g(f(x))$ for some $x \\in A$. But then $y = f(x)$ is an element of $B$ with $g(y) = z$ — a preimage of $z$ under $g$ exists for EVERY $z$. Hence $g$ is onto, no matter how $f$ misbehaves.',
          'The intuition: coverage of the relay can be borrowed from the LAST station alone — a constant $g$ covers a singleton codomain without any help from $f$.',
        ], answer: 'Constant g onto {1} covers for the not-onto f; the preimage chase proves g is always the onto one.' },
        { q: 'A = {1,2}, B = {1,2,3}, C = {1,2}. There are 72 wiring pairs (f, g) but only 4 distinct composites. Name the four composites and show each is realized.', solution: [
          'The four machines $A \\to C$ are: the constant 1 ($1 \\mapsto 1, 2 \\mapsto 1$), the constant 2, the identity ($1 \\mapsto 1, 2 \\mapsto 2$), and the swap ($1 \\mapsto 2, 2 \\mapsto 1$).',
          'Constant 1: any $f$ with $g$ constant on the used images — e.g. $f(1) = f(2) = 1$, $g(1) = g(2) = g(3) = 1$. Constant 2: the same with the other label.',
          'Identity: $f = $ the inclusion $1 \\mapsto 1, 2 \\mapsto 2$ (legal — one-one into $B$) with $g(1) = 1$, $g(2) = 2$ (and $g(3)$ free — say 1). The composite reads $1 \\mapsto 1$, $2 \\mapsto 2$.',
          'Swap: the same inclusion with $g(1) = 2$, $g(2) = 1$: the composite reads $1 \\mapsto 2$, $2 \\mapsto 1$.',
          'Hence all four composites are realized — 72 pairs, 4 composites, none missed: the census bound of this section is attained.',
        ], answer: 'The four composites are const-1, const-2, identity and swap — each realized by a suitable (f, g).' },
      ] },
    ] },

    { kind: 'formula', name: 'The composite, symbolically', latex: '(g \\circ f)(x) = g\\bigl(f(x)\\bigr), \\qquad \\mathrm{Dom}(g \\circ f) = \\{x \\in \\mathrm{Dom}(f) : f(x) \\in \\mathrm{Dom}(g)\\}', note: 'the inner machine acts first; the honest domain keeps the inputs the second station accepts' },
    { kind: 'formula', name: 'Composition is associative', latex: '(h \\circ g) \\circ f = h \\circ (g \\circ f)', note: 'the relay is unambiguous — parentheses move, order does not; f∘I = I∘f = f for the matching identity' },
    { kind: 'formula', name: 'The verdict-inheritance laws', latex: 'f, g \\text{ one-one} \\Rightarrow g \\circ f \\text{ one-one} \\quad\\quad f, g \\text{ onto} \\Rightarrow g \\circ f \\text{ onto} \\quad\\quad g \\circ f \\text{ one-one} \\Rightarrow f \\text{ one-one} \\quad\\quad g \\circ f \\text{ onto} \\Rightarrow g \\text{ onto}', note: 'forward from both stations; backward only to the nearest machine — the two converses are traps' },
    { kind: 'formula', name: 'Counting the wirings', latex: '\\#\\{(f, g)\\} = b^a \\cdot c^b \\qquad \\#\\{\\text{distinct } g \\circ f\\} \\leq c^a', note: 'pairs multiply (f: b^a choices, g: c^b); the composites they funnel into are machines A → C' },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 1.4 figures                                                  */
/* ------------------------------------------------------------------ */

/** 1.4 — the three-panel invertibility verdict: bijective / many-one / into */
function inverseVerdictSvg(): string {
  const node = (cx: number, cy: number, label: string, fill: string, stroke: string): string =>
    `<circle cx="${cx}" cy="${cy}" r="13" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#166534">${label}</text>`
  const line = (x1: number, y1: number, x2: number, y2: number, color: string, dash: string): string =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${dash ? `stroke-dasharray="${dash}"` : ''} marker-end="url(#ivArr)"/>`
  const rline = (x1: number, y1: number, x2: number, y2: number): string =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f766e" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#ivT)"/>`
  return `<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three wirings: only the bijective machine is invertible — the many-one wiring has two arrows into one target so the undo cannot answer, and the into wiring leaves a target unhit so the undo has nothing to return">
  <defs>
    <marker id="ivArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#16a34a"/></marker>
    <marker id="ivT" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0f766e"/></marker>
  </defs>
  <rect x="10" y="16" width="230" height="296" rx="12" fill="#fffdf5" stroke="#16a34a" stroke-width="1.8"/>
  <rect x="250" y="16" width="230" height="296" rx="12" fill="#fffdf5" stroke="#dc2626" stroke-width="1.8"/>
  <rect x="490" y="16" width="220" height="296" rx="12" fill="#fffdf5" stroke="#dc2626" stroke-width="1.8"/>
  <text x="125" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">(i) bijective → invertible</text>
  <text x="365" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#dc2626">(ii) many-one → no undo</text>
  <text x="600" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#dc2626">(iii) into → no undo</text>
  ${node(70, 96, '1', '#fef3c7', '#16a34a')}
  ${node(70, 146, '2', '#fef3c7', '#16a34a')}
  ${node(180, 96, '6', '#ffedd5', '#16a34a')}
  ${node(180, 146, '8', '#ffedd5', '#16a34a')}
  ${line(84, 96, 166, 96, '#16a34a', '')}
  ${line(84, 146, 166, 146, '#16a34a', '')}
  ${rline(180, 96, 84, 146)}
  ${rline(180, 146, 84, 96)}
  <text x="125" y="200" text-anchor="middle" font-size="11.5" fill="#0f766e">f: 1↦6, 2↦8 — the teal</text>
  <text x="125" y="218" text-anchor="middle" font-size="11.5" fill="#0f766e">arrows run the line BACKWARDS</text>
  <text x="125" y="240" text-anchor="middle" font-size="11.5" fill="#166534">f⁻¹: 6↦1, 8↦2 — a legal machine</text>
  ${node(310, 96, '1', '#fef3c7', '#16a34a')}
  ${node(310, 146, '2', '#fef3c7', '#16a34a')}
  ${node(310, 196, '3', '#fef3c7', '#16a34a')}
  ${node(430, 121, '6', '#ffedd5', '#16a34a')}
  ${node(430, 176, '8', '#ffedd5', '#16a34a')}
  ${line(324, 96, 416, 118, '#16a34a', '')}
  ${line(324, 146, 416, 122, '#16a34a', '')}
  ${line(324, 196, 416, 174, '#16a34a', '')}
  <text x="400" y="216" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">two arrows land on 6:</text>
  <text x="400" y="232" text-anchor="middle" font-size="11" fill="#dc2626">f⁻¹(6) = 1? 2? — no answer</text>
  <text x="365" y="256" text-anchor="middle" font-size="11.5" fill="#166534">waste kills the undo</text>
  ${node(548, 96, '1', '#fef3c7', '#16a34a')}
  ${node(548, 146, '2', '#fef3c7', '#16a34a')}
  ${node(660, 96, '6', '#ffedd5', '#16a34a')}
  ${node(660, 146, '8', '#ffedd5', '#16a34a')}
  ${node(660, 196, '10', '#ffedd5', '#16a34a')}
  ${line(562, 96, 646, 96, '#16a34a', '')}
  ${line(562, 146, 646, 146, '#16a34a', '')}
  <text x="660" y="226" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">10: never hit</text>
  <text x="604" y="256" text-anchor="middle" font-size="11.5" fill="#166534">f⁻¹(10) has no input to return</text>
  <text x="360" y="340" text-anchor="middle" font-size="13" fill="#65a30d">the undo machine exists exactly when the relay is waste-free AND covering — the bijective verdict</text>
</svg>`
}

/** 1.4 — the y = x mirror: f(x) = 2x + 1 and f⁻¹(x) = (x − 1)/2 */
function mirrorGraphSvg(): string {
  const gx = (x: number): number => 300 + x * 52
  const gy = (y: number): number => 210 - y * 44
  return `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate axes with the line y = 2x plus 1 and its inverse y = x minus 1 over 2 drawn as mirror images across the dashed line y equals x; the points 2,5 and 5,2 are marked as swapped partners">
  <line x1="40" y1="${gy(0)}" x2="690" y2="${gy(0)}" stroke="#166534" stroke-width="1.6"/>
  <line x1="${gx(0)}" y1="30" x2="${gx(0)}" y2="350" stroke="#166534" stroke-width="1.6"/>
  <text x="700" y="${gy(0) + 4}" font-size="13" fill="#166534">x</text>
  <text x="${gx(0) - 20}" y="24" font-size="13" fill="#166534">y</text>
  <text x="${gx(0) - 16}" y="${gy(0) + 16}" font-size="12" fill="#166534">O</text>
  <line x1="60" y1="${gy(-4.8)}" x2="680" y2="${gy(4.8)}" stroke="#0f766e" stroke-width="1.6" stroke-dasharray="8 5"/>
  <text x="640" y="${gy(4.9)}" font-size="12.5" font-weight="700" fill="#0f766e">y = x</text>
  <line x1="${gx(-3.4)}" y1="${gy(2 * -3.4 + 1)}" x2="${gx(2.4)}" y2="${gy(2 * 2.4 + 1)}" stroke="#16a34a" stroke-width="2.6"/>
  <text x="${gx(1.9) + 8}" y="${gy(4.6)}" font-size="12.5" font-weight="700" fill="#166534">y = 2x + 1</text>
  <line x1="${gx(-3.2)}" y1="${gy((-3.2 - 1) / 2)}" x2="${gx(5.4)}" y2="${gy((5.4 - 1) / 2)}" stroke="#d97706" stroke-width="2.6"/>
  <text x="${gx(3.4) + 6}" y="${gy(1.7)}" font-size="12.5" font-weight="700" fill="#d97706">y = (x−1)/2</text>
  <circle cx="${gx(2)}" cy="${gy(5)}" r="5" fill="#16a34a"/>
  <text x="${gx(2) + 10}" y="${gy(5) - 8}" font-size="12" font-weight="700" fill="#166534">(2, 5)</text>
  <circle cx="${gx(5)}" cy="${gy(2)}" r="5" fill="#d97706"/>
  <text x="${gx(5) - 52}" y="${gy(2) - 8}" font-size="12" font-weight="700" fill="#d97706">(5, 2)</text>
  <text x="360" y="366" text-anchor="middle" font-size="13" fill="#65a30d">the graphs mirror across y = x: every (a, b) on f reappears as (b, a) on f⁻¹</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 1.4                                                          */
/* ------------------------------------------------------------------ */

const lesson14: Lesson = {
  id: 'aa-inverse-functions-the-machine-undone',
  number: '1.4',
  title: 'Inverse Functions: the Machine Undone',
  concepts: [
    'the undo machine and its two identity laws',
    'existence = one-one AND onto (the bijective verdict)',
    'the swap law: domain and range trade places',
    'finding inverses by solving back',
    'the branch discipline: restriction restores invertibility',
    'shoes-and-socks: undoing a composite in reverse order',
    'self-inverse machines and the y = x mirror',
  ],
  objectives: [
    'state the inverse machine through the two identity laws f⁻¹∘f = I_A and f∘f⁻¹ = I_B, and verify candidates against them',
    'decide invertibility by the bijective verdict alone, killing many-one and into machines with witnesses',
    'read the swap law — Dom(f⁻¹) = Rng(f), Rng(f⁻¹) = Dom(f) — off any invertible machine',
    'find inverses of linear, quadratic-branch and Möbius machines by solving back, checking each round trip',
    'restore invertibility by restriction, keeping the branch choice honest on both half-lines',
    'apply the shoes-and-socks law (g∘f)⁻¹ = f⁻¹∘g⁻¹ and recognize self-inverse machines',
  ],
  prerequisites: ['aa-composition-machines-in-series', 'aa-one-one-and-onto-classifying-the-machines'],
  sources: ['cengage-m2-algebra', 'cengage-jee-style', 'ncert-math12-ch1-relations-functions', 'ncert-math11-ch2-functions', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Every machine of this chapter has been judged; now one gets UNDONE. Lesson 1.3 named the composite that does nothing — the relay that returns every input exactly where it started — and left it as a promise. This lesson cashes the promise: the undo of $f$, written $f^{-1}$, is itself a function, it exists for exactly the machines lesson 1.2 certified bijective, and when it exists its domain and range trade places with those of $f$. The whole lesson is the two verdicts wearing work clothes.' },
    { kind: 'para', text: 'The everyday model is a pair of reversible actions: tie and untie, pack and unpack, earn interest and discount interest. One direction never asks whether the other exists — but the mathematics does. Ask it honestly of $f(x) = x^2$: the output 4 was made by BOTH inputs $2$ and $-2$, so the undo does not know which to return. Ask it of $f(x) = x^2$ again as a map into the reals: the target $-1$ was never made, so the undo has nothing to return. Waste and shortfall — the two verdicts — are exactly the two ways an undo dies.' },

    { kind: 'heading', text: 'The Undo Machine and When It Exists' },
    { kind: 'callout', tone: 'definition', title: 'Inverse function', text: 'Let $f : A \\to B$ be BIJECTIVE. The inverse of $f$ is the function $f^{-1} : B \\to A$ that sends each output back to the unique input that made it: thus, $f^{-1}(y) = x$ exactly when $f(x) = y$. The uniqueness of that $x$ is precisely one-one; its EXISTENCE for every $y$ is precisely onto. Bijective = invertible, and the inverse is itself bijective.' },
    { kind: 'equation', latex: 'f^{-1}\\bigl(f(x)\\bigr) = x \\quad \\text{for all } x \\in A \\qquad f\\bigl(f^{-1}(y)\\bigr) = y \\quad \\text{for all } y \\in B', note: 'the two identity laws of lesson 1.3 — the undo machine certified on both sides of the relay' },
    { kind: 'callout', tone: 'warn', title: 'f⁻¹ is an UNDO machine, not a reciprocal', text: 'The notation $f^{-1}(x)$ is NOT the reciprocal $\\tfrac{1}{f(x)}$. For $f(x) = 2x + 1$, the inverse is $\\tfrac{x - 1}{2}$ — not $\\tfrac{1}{2x+1}$. The $-1$ is a badge of DIRECTION (running the machine backwards), borrowed from the exponent language where $a^{-1} = \\tfrac{1}{a}$ happens to be the multiplicative undo. Numerically, $f^{-1}(5)$ asks “which input made 5?”; $\\tfrac{1}{f(5)}$ asks something entirely different.' },
    { kind: 'example', title: 'Which of these machines on ℤ are invertible? (a) f(x) = x + 7, (b) f(x) = 3x, (c) f(x) = |x|, (d) f(x) = 5 − x', steps: [
      '(a) $x + 7$ is one-one (distinct inputs, distinct outputs) and onto ℤ (the input $y - 7$ makes any target $y$). Hence invertible, and the undo is $f^{-1}(x) = x - 7$ — check both laws: $(x - 7) + 7 = x$ and $7 - 7 + x = x$.',
      '(b) $3x$ is one-one but INTO: the target 2 has no integer preimage ($3x = 2$ has no integer door). The undo of 2 would have no input to return — not invertible.',
      '(c) $|x|$ is many-one: $|-3| = |3| = 6$ — the undo of 6 cannot decide between $-3$ and $3$. Not invertible.',
      '(d) $5 - x$ is one-one and onto, and watch what the undo does: apply twice, $5 - (5 - x) = x$ — the machine UNDOES ITSELF. So $f^{-1} = f$: a self-inverse machine.',
      'Hence (a) and (d) are invertible, (b) dies of shortfall (into), (c) dies of waste (many-one) — the two verdicts of lesson 1.2 are the two causes of death.',
    ] },
    { kind: 'figure', caption: 'The invertibility verdict in three wirings. Panel (i): a bijective relay (1↦6, 2↦8) — reversing every arrow is legal, and the teal reversed arrows ARE the undo machine f⁻¹. Panel (ii): a many-one wiring — two green arrows land on 6, so the reversed arrow cannot decide between 1 and 2: no undo. Panel (iii): an into wiring — two inputs, three targets, and the target 10 is never hit, so the undo would be asked for an input that never existed: no undo. One picture, both causes of death.', svg: inverseVerdictSvg() },
    { kind: 'para', text: 'When the undo exists, the sets swap roles automatically. The undo\\u2019s inputs are $f$\\u2019s outputs — its domain is the RANGE of $f$; the undo\\u2019s outputs are $f$\\u2019s inputs — its range is the DOMAIN of $f$. For a bijective machine the range fills the codomain, so the swap reads cleanest in the declaration itself.' },
    { kind: 'callout', tone: 'definition', title: 'The swap law', text: 'If $f : A \\to B$ is bijective, then $f^{-1} : B \\to A$, and thus: $\\mathrm{Dom}(f^{-1}) = \\mathrm{Rng}(f) = B$ and $\\mathrm{Rng}(f^{-1}) = \\mathrm{Dom}(f) = A$. Domain and range trade places — lesson 1.2\\u2019s closing note (“domain and codomain are part of the machine\\u2019s identity”) is what makes the trade exact.' },
    { kind: 'equation', latex: '\\mathrm{Dom}(f^{-1}) = \\mathrm{Rng}(f) \\qquad \\mathrm{Rng}(f^{-1}) = \\mathrm{Dom}(f)', note: 'the swap law — the undo walks the same relay in the opposite direction' },
    { kind: 'para', text: 'One more symmetry completes the definition. Since the undo $f^{-1}$ is itself bijective (one-one and onto, by the same two verdicts in the reverse direction), it HAS an undo — and the undo of the undo is the original machine: $(f^{-1})^{-1} = f$. The roles swap cleanly: each machine is the other\u2019s inverse, and applying the direction badge twice returns the badge to its start. The involution preview of the quiz below lives exactly here — a self-inverse machine is one where $(f^{-1})^{-1} = f$ becomes $f^{-1} = f$, the swap invisible because the machine runs the same both ways.' },

    { kind: 'heading', text: 'Finding the Inverse: the Solve-Back' },
    { kind: 'para', text: 'To build an undo by hand, write the machine as an equation $y = f(x)$, SOLVE for $x$ — the undo reads the equation backwards — and rename. The solve-back is also the verdict: if the solve produces a unique $x$ for every $y$ in a declared codomain, the machine was bijective onto that codomain and the solved form IS the inverse.' },
    { kind: 'example', title: 'Invert f(x) = (2x + 1)/3 on ℝ, and verify both identity laws', steps: [
      'Write $y = \\tfrac{2x + 1}{3}$ and solve back: $3y = 2x + 1$, so $x = \\tfrac{3y - 1}{2}$.',
      'Hence $f^{-1}(x) = \\tfrac{3x - 1}{2}$ — linear machine in, linear undo out, the slope flipped and the intercept dragged with it.',
      'Verify law one: $f^{-1}(f(x)) = \\tfrac{3 \\cdot \\tfrac{2x+1}{3} - 1}{2} = \\tfrac{(2x + 1) - 1}{2} = x$ — the return leg lands.',
      'Verify law two: $f(f^{-1}(x)) = \\tfrac{2 \\cdot \\tfrac{3x-1}{2} + 1}{3} = \\tfrac{(3x - 1) + 1}{3} = x$ — the outward leg lands.',
      'Hence the pair is certified against the definition itself, not just guessed.',
    ] },
    { kind: 'example', title: 'Invert the Möbius machine f(x) = (4x + 3)/(x − 2), x ≠ 2, and find its honest codomain', steps: [
      'One-one by the cross-product discipline of lesson 1.2: $f(x_1) = f(x_2)$ forces $(4x_1 + 3)(x_2 - 2) = (4x_2 + 3)(x_1 - 2)$, which clears to $11(x_2 - x_1) = 0$ — so $x_1 = x_2$.',
      'Solve back: $y(x - 2) = 4x + 3$, so $xy - 2y = 4x + 3$, so $x(y - 4) = 2y + 3$, so $x = \\tfrac{2y + 3}{y - 4}$.',
      'The solve-back works for every $y$ EXCEPT $y = 4$ — there the left side dies and the equation becomes $0 = 11$. Hence the range of $f$ is $\\mathbb{R} \\setminus \\{4\\}$: the machine is onto exactly $\\mathbb{R} \\setminus \\{4\\}$, not onto $\\mathbb{R}$.',
      'Thus $f : \\mathbb{R} \\setminus \\{2\\} \\to \\mathbb{R} \\setminus \\{4\\}$ is bijective and $f^{-1}(x) = \\tfrac{2x + 3}{x - 4}$ on $\\mathbb{R} \\setminus \\{4\\}$.',
      'Note the swap law at work: the forbidden INPUT 2 of $f$ becomes the forbidden OUTPUT of $f^{-1}$, and the forbidden input 4 of the undo is the value $f$ never produces.',
    ] },
    { kind: 'para', text: 'The Möbius family is worth one more minute, because its anatomy is entirely linear. Any machine $f(x) = \tfrac{px + q}{rx + s}$ composes four elementary moves — scale by $r$, shift, scale by $p$, shift — and its undo is the same four moves run backwards: $f^{-1}(x) = \tfrac{-sx + q}{rx - p}$. The invertibility condition is the determinant $ps - qr \neq 0$: when it vanishes the numerator is a multiple of the denominator and the machine is constant. Our own machine above has $p = 4, q = 3, r = 1, s = -2$: the determinant is $4 \cdot (-2) - 3 \cdot 1 = -11$, and $|-11| = 11$ is EXACTLY the constant the cross-product cleared to in the one-one proof — the algebra was counting the determinant all along.' },

    { kind: 'heading', text: 'The Branch Discipline: Restriction Restores Invertibility' },
    { kind: 'para', text: 'Lesson 1.2 ended with a promise: a many-one machine can be rescued by RESTRICTION, because domain and codomain are part of the machine\\u2019s identity. That promise is cashed here — restriction is the standard cure for the undo of anything with a fold.' },
    { kind: 'example', title: 'f(x) = x² − 6x + 10 = (x − 3)² + 1. Find the largest intervals on which f is invertible, and both branch inverses', steps: [
      'The vertex read: the machine folds at $x = 3$ — decreasing on $(-\\infty, 3]$, increasing on $[3, \\infty)$ — and its range is $[1, \\infty)$ either way.',
      'On each half-line the fold becomes a monotone march: one-one. So the largest invertible restrictions are $(-\\infty, 3]$ and $[3, \\infty)$, each declared onto $[1, \\infty)$.',
      'Right branch, solve back: $y = (x - 3)^2 + 1$ gives $x - 3 = \\sqrt{y - 1}$ (the POSITIVE root — this branch lives right of 3), so $f^{-1}(x) = 3 + \\sqrt{x - 1}$ on $[1, \\infty)$.',
      'Left branch: $x - 3 = -\\sqrt{y - 1}$ (the NEGATIVE root), so $f^{-1}(x) = 3 - \\sqrt{x - 1}$ on $[1, \\infty)$.',
      'Check a value: $f(5) = (5-3)^2 + 1 = 5$; the right undo returns $3 + \\sqrt{5 - 1} = 5$ ✓, the left undo returns $3 - 2 = 1$ ✓ — each branch knows its own half.',
      'Hence one machine, two honest undos — the choice of branch is the choice of machine, and the inverse inherits the choice.',
    ] },
    { kind: 'example', title: 'Invert the three-branch machine f(x) = {x + 1, x < 0; x² + 1, 0 ≤ x ≤ 3; x + 7, x > 3} : ℝ → ℝ', steps: [
      'First the verdicts. One-one: the branch ranges are $(-\\infty, 1)$, then $[1, 10]$, then $(10, \\infty)$ — disjoint, so no two branches ever agree on an output, and each branch alone is one-one. Onto: the three ranges tile the whole line — $\\mathbb{R}$ is covered.',
      'Hence bijective, so the undo exists on all of $\\mathbb{R}$; invert branch by branch.',
      'Branch one: $y = x + 1$ with $y < 1$ undoes to $x = y - 1$.',
      'Branch two: $y = x^2 + 1$ with $1 \\leq y \\leq 10$ undoes to $x = \\sqrt{y - 1}$ (the branch\\u2019s inputs live in $[0, 3]$, so the positive root).',
      'Branch three: $y = x + 7$ with $y > 10$ undoes to $x = y - 7$.',
      'So, $f^{-1}(y) = \\{y - 1, y < 1; \\sqrt{y - 1}, 1 \\leq y \\leq 10; y - 7, y > 10\\}$ — the seams agree: $f(0) = 1$ and $f^{-1}(1) = 0$; $f(3) = 10$ and $f^{-1}(10) = 3$.',
    ] },
    { kind: 'para', text: 'Where do the branch inverses MEET? At the fold\u2019s own output: for the quadratic example above, both undos agree at $y = 1$ (the vertex value), since $3 + \\sqrt{1 - 1} = 3 - \\sqrt{1 - 1} = 3$ — the two half-lines share exactly their endpoint. That shared point is the swap seam, and it is why the branch declarations must be closed on ONE side each ($[3, \\infty)$ and $(-\\infty, 3]$): the vertex input 3 may belong to either branch but never both. The same discipline held in the three-branch machine — the seams $1$ and $10$ were each assigned to exactly one branch, and the hinge checks $f^{-1}(1) = 0$, $f^{-1}(10) = 3$ certified the assignment. Honesty about endpoints is not pedantry; it is what keeps the undo a FUNCTION.' },

    { kind: 'heading', text: 'The Inverse Calculus: Four Properties' },
    { kind: 'list', marker: 'roman', items: [
      '**Uniqueness and bijectivity.** A bijective machine has EXACTLY ONE undo, and that undo is itself bijective (its undo is $f$ — the roles swap cleanly).',
      '**The two-sided characterization.** If $g \\circ f = I_A$ and $f \\circ g = I_B$ both hold, then $g$ is THE inverse of $f$ — no other machine can do the job. One law alone is not enough: $g \\circ f = I_A$ by itself forces $f$ one-one (and $g$ onto), but a machine that only partially undoes is not the inverse.',
      '**Shoes and socks.** Undoing a composite undoes the LAST machine first: $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$. You put socks on then shoes; you take shoes off then socks.',
      '**The mirror.** The graphs of $f$ and $f^{-1}$ are mirror images across the line $y = x$: the pair $(a, b)$ sits on $f$ exactly when $(b, a)$ sits on $f^{-1}$.',
    ] },
    { kind: 'derivation', title: 'Shoes and socks, proved with the characterization', statement: 'Why does undoing the composite run the order backwards: (g∘f)⁻¹ = f⁻¹∘g⁻¹?', steps: [
      { label: 'Set up the candidate', formula: 'h = f^{-1} \\circ g^{-1} : C \\to A', explanation: 'the claim is that h — undo g, then undo f — is the undo of the composite g∘f: A → B → C.' },
      { label: 'Compose on the left', formula: 'h \\circ (g \\circ f) = f^{-1} \\circ (g^{-1} \\circ g) \\circ f = f^{-1} \\circ I_B \\circ f = f^{-1} \\circ f = I_A', explanation: 'associativity (lesson 1.3) lets the middle pair meet first — and g⁻¹∘g is exactly the identity by the definition of the undo.' },
      { label: 'Compose on the right', formula: '(g \\circ f) \\circ h = g \\circ (f \\circ f^{-1}) \\circ g^{-1} = g \\circ I_B \\circ g^{-1} = g \\circ g^{-1} = I_C', explanation: 'the same trick from the other end. Both identity laws hold, so by the two-sided characterization h is THE undo.' },
    ], result: '(g \\circ f)^{-1} = f^{-1} \\circ g^{-1} — the order of the undo is the REVERSE of the order of the making.' },
    { kind: 'figure', caption: 'The mirror made concrete with our own pair: f(x) = 2x + 1 (green line) and its undo f⁻¹(x) = (x − 1)/2 (amber line) are reflections of each other across the dashed mirror y = x. The marked partners show why: (2, 5) sits on f because f(2) = 5, and (5, 2) sits on the undo because f⁻¹(5) = 2 — the same two numbers, swapped, on opposite sides of the mirror. Slopes flip and intercepts trade: 2 and +1 become 1/2 and −1/2.', svg: mirrorGraphSvg() },
    { kind: 'callout', tone: 'insight', title: 'The inverse function is the inverse relation, grown up', text: 'Lesson 1.1 defined $R^{-1}$ for ANY relation by swapping the pairs — no conditions asked. This lesson adds one demand: the swapped pairs must themselves pass the function test (total + single-valued). For a bijective $f$, both tests pass — one-one stops the swapped relation from becoming many-one, onto stops it from falling short. So: $f^{-1}$ EXISTS exactly when the inverse RELATION $R^{-1}$ of $f$\\u2019s pair-set is itself a function. The two chapters of this book\\u2019s first chapter snap together here.' },
    { kind: 'example', title: 'Verify the shoes-and-socks law on the reals: f(x) = 2x, g(x) = x + 1. Find (g∘f)⁻¹ and f⁻¹∘g⁻¹ and compare', steps: [
      'The composite: $(g \\circ f)(x) = 2x + 1$ — double, then increment.',
      'Undo the composite directly: $y = 2x + 1$ gives $x = \\tfrac{y - 1}{2}$, so $(g \\circ f)^{-1}(x) = \\tfrac{x - 1}{2}$.',
      'Now the socks-then-shoes route: $g^{-1}(x) = x - 1$, then $f^{-1}(x) = \\tfrac{x}{2}$, so $f^{-1}(g^{-1}(x)) = \\tfrac{x - 1}{2}$ — the same machine.',
      'Hence $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$, verified: the increment is undone FIRST (subtract 1), the doubling SECOND (halve).',
    ] },

    { kind: 'terms', items: [
      { term: 'inverse function', def: '$f^{-1} : B \\to A$ with $f^{-1}(y) = x \\iff f(x) = y$ — the undo machine, existing exactly when $f$ is bijective' },
      { term: 'bijective ⇔ invertible', def: 'the one-word verdict that certifies an undo: waste-free AND covering, or the undo dies of waste or of shortfall' },
      { term: 'the swap law', def: '$\\mathrm{Dom}(f^{-1}) = \\mathrm{Rng}(f)$ and $\\mathrm{Rng}(f^{-1}) = \\mathrm{Dom}(f)$ — the relay walked backwards trades its ends' },
      { term: 'solve-back', def: 'write $y = f(x)$, solve for $x$, rename — the inverse falls out; a solve that fails for some $y$ marks the honest codomain' },
      { term: 'branch discipline', def: 'a folded machine becomes invertible by restricting to a monotone half-line — and each branch owns its own undo' },
      { term: 'self-inverse machine', def: 'an involution: $f(f(x)) = x$, so $f^{-1} = f$ (the machines $k - x$ and $-x/(x+1)$ both undo themselves)' },
    ] },

    { kind: 'heading', text: 'The Road Onward' },
    { kind: 'para', text: 'The chapter\\u2019s grammar is now complete: machines became objects (1.1), were classified (1.2), were wired in series (1.3), and learned to be undone (1.4). What remains is the catalogue — the named machines every later chapter quotes: the modulus, the signum, the greatest-integer floor, and the elementary family. Lesson 1.5 opens the zoo.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main unit-1 line “composition of functions” carries the inverse with it, and NCERT Class 12 chapter 1 exercises invertibility explicitly (“show that f is invertible and find f⁻¹”). Expect: existence verdicts on ℤ and ℝ with witness kills; solve-back inverses of linear and Möbius machines with the honest codomain; the branch inverses of folded quadratics (the ±√ choice graded by the branch); the shoes-and-socks order in true/false banks; and self-inverse recognition — across JEE Main/Advanced, CUET, boards and the state CETs.' },
    { kind: 'callout', tone: 'historical', title: 'Logarithms: the first industrial undo machines', text: 'The undo idea built an industry before it built notation: John Napier\\u2019s logarithm tables (1614) were sold as machines that turn multiplication into addition — and Henry Briggs\\u2019 common tables (1617) made the undo of $10^x$ a working tool for every navigator and astronomer in Europe. Nobody called $\\log$ “the inverse of the exponential” for another two centuries, but that is what the tables were: a precomputed undo, priced by hand, for a machine whose forward direction everyone could run. The exponential–logarithm pair joins this shelf honestly when the Calculus book opens; the undo discipline it will use is the one built here.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The inverse f⁻¹ exists exactly when f is', options: ['one-one', 'onto', 'one-one AND onto (bijective)', 'any function at all'], answer: 2, explain: 'Both verdicts are load-bearing: one-one gives the undo a UNIQUE input to return (many-one leaves it a witness-pair dilemma), onto gives every target an input to return (into leaves targets with nothing). Option 1 or 2 alone certifies only half; option 4 is refuted by $x^2$ and $|x|$ in one stroke.' },
      { q: 'The symbol f⁻¹(x) means', options: ['1/f(x) — the reciprocal', 'the undo machine — the unique input that made x, renamed', 'the reflection of f in the y-axis', 'the machine x ↦ 1/x declared on ℝ'], answer: 1, explain: '$f^{-1}$ is the DIRECTION badge: run the machine backwards. For $f(x) = 2x + 1$ the undo is $\\tfrac{x-1}{2}$, while the reciprocal $\\tfrac{1}{2x+1}$ is a different machine entirely. Option 3 confuses the mirror in the $y$-axis (a reflection, not an undo); option 4 is the reciprocal MACHINE as its own declaration — also not the undo.' },
      { q: 'If f : A → B is bijective, the DOMAIN of f⁻¹ is', options: ['B — the whole range of f', 'A', 'A ∪ B', 'the empty set'], answer: 0, explain: 'The swap law: the undo\\u2019s inputs are $f$\\u2019s outputs, and bijectivity makes the range fill $B$ exactly. Option 2 is the undo\\u2019s RANGE (also the domain of $f$); option 3 unions sets that never need unioning; option 4 cannot arise — bijective machines have non-empty pair-sets whenever $A$ is non-empty.' },
      { q: '(g∘f)⁻¹ equals', options: ['g⁻¹∘f⁻¹', 'f⁻¹∘g⁻¹', '(f∘g)⁻¹', 'g∘f'], answer: 1, explain: 'Shoes and socks: the LAST machine is undone first. Undo $g$ (subtract what it added), then undo $f$ — $f^{-1} \\circ g^{-1}$. Option 1 is the order-preserving guess that the sock law kills; option 3 is a different composite\\u2019s undo; option 4 is not an undo at all.' },
      { q: 'f(x) = 5 − x on ℝ. The inverse is', options: ['x − 5', '−x − 5', '5 − x — the machine undoes itself', 'f has no inverse'], answer: 2, explain: 'Apply twice: $5 - (5 - x) = x$ — the machine is its own undo, a self-inverse involution. Option 1 is the undo of $x + 5$; option 2 is not any undo here; option 4 is wrong because the machine is visibly one-one (distinct inputs, distinct outputs) and onto $\\mathbb{R}$ (the input $5 - y$ makes any target $y$).' },
    ] },

    { kind: 'exercises', title: 'Exercises 1.4', sets: [
      { level: 'L1', questions: [
        { q: 'Invert f(x) = x + 9 on ℝ.', solution: [
          'Solve back: $y = x + 9$ gives $x = y - 9$.',
          'Hence $f^{-1}(x) = x - 9$ — the increment undone by the decrement.',
          'Check: $f^{-1}(f(x)) = (x + 9) - 9 = x$ ✓ and $f(f^{-1}(x)) = (x - 9) + 9 = x$ ✓.',
        ], answer: 'f⁻¹(x) = x − 9.' },
        { q: 'Invert f(x) = 5x − 3 on ℝ and verify both identity laws.', solution: [
          'Solve back: $y = 5x - 3$ gives $x = \\tfrac{y + 3}{5}$, so $f^{-1}(x) = \\tfrac{x + 3}{5}$.',
          'Law one: $f^{-1}(f(x)) = \\tfrac{(5x - 3) + 3}{5} = x$ ✓.',
          'Law two: $f(f^{-1}(x)) = 5 \\cdot \\tfrac{x + 3}{5} - 3 = x$ ✓.',
          'Hence the undo is certified — slope divided, constant reversed.',
        ], answer: 'f⁻¹(x) = (x + 3)/5.' },
        { q: 'Show that f(x) = 7 − x is invertible and find its inverse. What do you notice?', solution: [
          'One-one: $7 - x_1 = 7 - x_2 \\Rightarrow x_1 = x_2$. Onto: the input $7 - y$ makes any target $y$. Hence bijective — invertible.',
          'Solve back: $y = 7 - x$ gives $x = 7 - y$: the solve-back returns the SAME rule.',
          'So, $f^{-1}(x) = 7 - x = f(x)$: the machine undoes itself.',
          'The general shape: every machine $k - x$ is self-inverse, since $k - (k - x) = x$ — the reflection machines of this shape are all involutions.',
        ], answer: 'f⁻¹(x) = 7 − x — self-inverse.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Invert f(x) = (2x + 1)/3 on ℝ and check the round trip in both directions.', solution: [
          'Solve back: $y = \\tfrac{2x + 1}{3}$ gives $3y = 2x + 1$, so $x = \\tfrac{3y - 1}{2}$.',
          'Hence $f^{-1}(x) = \\tfrac{3x - 1}{2}$.',
          'Outward check: $f(f^{-1}(x)) = \\tfrac{2 \\cdot \\tfrac{3x-1}{2} + 1}{3} = \\tfrac{3x}{3} = x$ ✓.',
          'Return check: $f^{-1}(f(x)) = \\tfrac{3 \\cdot \\tfrac{2x+1}{3} - 1}{2} = \\tfrac{2x}{2} = x$ ✓.',
        ], answer: 'f⁻¹(x) = (3x − 1)/2, certified both ways.' },
        { q: 'On ℤ: is f(x) = x + 5 invertible? Is f(x) = 2x + 2? Give verdicts with witnesses.', solution: [
          '$x + 5$ is one-one and onto ℤ (the input $y - 5$ makes any target $y$) — invertible with undo $x - 5$.',
          '$2x + 2$ is one-one (the doubling-increment is injective) but INTO: its outputs are the even integers, so the odd target 1 has no integer preimage — $2x + 2 = 1$ has no integer door.',
          'Hence $2x + 2$ is not invertible AS DECLARED ℤ → ℤ: the undo of 1 would have no input to return.',
          'The honest repair: declare $f : \\mathbb{Z} \\to \\{\\text{even integers}\\}$ and the same rule becomes bijective with undo $f^{-1}(x) = \\tfrac{x - 2}{2}$ on the evens.',
        ], answer: 'x + 5: invertible. 2x + 2: not, as declared — into (odds unhit); invertible only after the codomain is trimmed to the evens.' },
        { q: 'Show that f(x) = x³ on ℝ is invertible, and check the undo f⁻¹(x) = ∛x at x = 0, ±1, ±8, ±27.', solution: [
          'One-one: $x_1^3 = x_2^3$ forces $x_1 = x_2$ (the cube is a strict march — negatives map to negatives, positives to positives, and equal cubes have equal bases). Onto: every real $y$ has the real preimage $\\sqrt[3]{y}$. Hence bijective.',
          'The undo is the cube root: $f^{-1}(x) = \\sqrt[3]{x}$.',
          'Round trip: $\\sqrt[3]{0} = 0$, $\\sqrt[3]{1} = 1$, $\\sqrt[3]{-1} = -1$, $\\sqrt[3]{8} = 2$, $\\sqrt[3]{-8} = -2$, $\\sqrt[3]{27} = 3$, $\\sqrt[3]{-27} = -3$ — and cubing each root returns its target.',
          'Hence certified at the census — and the pair even commutes: $(f \\circ f^{-1})(x) = (f^{-1} \\circ f)(x) = x$ everywhere.',
        ], answer: 'Bijective; f⁻¹(x) = ∛x — verified at {0, ±1, ±8, ±27}.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Invert f(x) = (x + 4)/(x − 6), x ≠ 6, and find the honest codomain.', solution: [
          'One-one by the cross-product: $f(x_1) = f(x_2)$ forces $(x_1 + 4)(x_2 - 6) = (x_2 + 4)(x_1 - 6)$, which clears to $10(x_2 - x_1) = 0$ — injective.',
          'Solve back: $y(x - 6) = x + 4$, so $xy - 6y = x + 4$, so $x(y - 1) = 6y + 4$, so $x = \\tfrac{6y + 4}{y - 1}$.',
          'The solve dies exactly at $y = 1$ — hence the range is $\\mathbb{R} \\setminus \\{1\\}$: the machine is onto $\\mathbb{R} \\setminus \\{1\\}$.',
          'Thus $f : \\mathbb{R} \\setminus \\{6\\} \\to \\mathbb{R} \\setminus \\{1\\}$ is bijective with $f^{-1}(x) = \\tfrac{6x + 4}{x - 1}$ — and the swap law shows: 6 (forbidden input) becomes a forbidden OUTPUT of the undo; 1 (forbidden output) becomes its forbidden input.',
        ], answer: 'f⁻¹(x) = (6x + 4)/(x − 1) on ℝ∖{1}; f is onto ℝ∖{1}, not ℝ.' },
        { q: 'f(x) = x² − 8x + 17. Find the range, the largest invertible intervals, and the branch inverse on the right half-line.', solution: [
          'Complete the square: $x^2 - 8x + 17 = (x - 4)^2 + 1$ — the vertex read gives range $[1, \\infty)$ with the fold at $x = 4$.',
          'The largest invertible restrictions: $(-\\infty, 4]$ and $[4, \\infty)$, each declared onto $[1, \\infty)$.',
          'Right branch, solve back: $y = (x - 4)^2 + 1$ gives $x - 4 = \\sqrt{y - 1}$ (positive root — this branch lives right of 4).',
          'Hence on $[4, \\infty)$ the undo is $f^{-1}(x) = 4 + \\sqrt{x - 1}$; the left branch would carry $4 - \\sqrt{x - 1}$.',
          'Check: $f(7) = (7 - 4)^2 + 1 = 10$, and the right undo returns $4 + \\sqrt{10 - 1} = 7$ ✓ — each branch knows its own half.',
        ], answer: 'Range [1, ∞); intervals (−∞, 4] and [4, ∞); right-branch undo 4 + √(x − 1).' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style: f : ℝ → [2, ∞), f(x) = x² − 2x + 3. Find the largest intervals on which f⁻¹ exists and both branch inverses.', solution: [
          'Complete the square: $x^2 - 2x + 3 = (x - 1)^2 + 2$ — the fold sits at $x = 1$ and the declared range $[2, \\infty)$ is filled exactly.',
          'Largest invertible restrictions: $[1, \\infty)$ and $(-\\infty, 1]$.',
          'Right branch: $y = (x - 1)^2 + 2$ gives $x - 1 = \\sqrt{y - 2}$ (positive root), so $f^{-1}(x) = 1 + \\sqrt{x - 2}$ on $[2, \\infty)$.',
          'Left branch: $x - 1 = -\\sqrt{y - 2}$, so $f^{-1}(x) = 1 - \\sqrt{x - 2}$ on $[2, \\infty)$.',
          'Check both: $f(3) = (3 - 1)^2 + 2 = 6$, and the right undo returns $1 + \\sqrt{6 - 2} = 3$ while the left undo returns $1 - 2 = -1$ ✓ — each branch knows its own half.',
        ], answer: 'Intervals [1, ∞) and (−∞, 1]; undos 1 ± √(x − 2) respectively.' },
        { q: 'Invert the hinged machine f(x) = {x + 2, x < 3; 3x − 4, x ≥ 3} : ℝ → ℝ.', solution: [
          'The branch ranges: $x + 2$ on $x < 3$ gives $(-\\infty, 5)$; $3x - 4$ on $x \\geq 3$ gives $[5, \\infty)$ — disjoint, and together they tile $\\mathbb{R}$.',
          'Each branch is one-one, and the hinge agrees: $f(3) = 5$ from the second branch, with the first approaching 5 — bijective $\\mathbb{R} \\to \\mathbb{R}$.',
          'Invert branch by branch: $y = x + 2$ with $y < 5$ undoes to $x = y - 2$; $y = 3x - 4$ with $y \\geq 5$ undoes to $x = \\tfrac{y + 4}{3}$.',
          'Hence $f^{-1}(y) = \\{y - 2, y < 5; (y + 4)/3, y \\geq 5\\}$ — check the hinge: $f^{-1}(5) = 3$ ✓ and $f(3) = 5$ ✓.',
        ], answer: 'f⁻¹(y) = {y − 2, y < 5; (y + 4)/3, y ≥ 5}.' },
      ] },
      { level: 'L5', questions: [
        { q: 'With f(x) = 2x and g(x) = x + 1 on ℝ, verify the shoes-and-socks law by computing (g∘f)⁻¹ directly and as f⁻¹∘g⁻¹.', solution: [
          'The composite: $(g \\circ f)(x) = 2x + 1$.',
          'Direct undo: $y = 2x + 1$ gives $x = \\tfrac{y - 1}{2}$, so $(g \\circ f)^{-1}(x) = \\tfrac{x - 1}{2}$.',
          'The socks-then-shoes route: $g^{-1}(x) = x - 1$ (undo the LAST machine first), then $f^{-1}(x) = \\tfrac{x}{2}$; composed: $f^{-1}(g^{-1}(x)) = \\tfrac{x - 1}{2}$.',
          'Hence both routes give $\\tfrac{x - 1}{2}$ — the law verified on a concrete pair.',
        ], answer: '(g∘f)⁻¹(x) = (x − 1)/2 = f⁻¹∘g⁻¹(x) — shoes and socks confirmed.' },
        { q: 'Show that f(x) = k − x is self-inverse for every k. Then find the value of a for which f(x) = ax/(x + 1) is self-inverse.', solution: [
          'For $k - x$: apply twice — $k - (k - x) = x$. Hence $f^{-1} = f$ for EVERY $k$: the whole family of reflection machines are involutions.',
          'For $f(x) = \\tfrac{ax}{x + 1}$ (domain $x \\neq -1$): the self-inverse demand is $f(f(x)) = x$.',
          'Compute: $f(f(x)) = \\tfrac{a \\cdot \\tfrac{ax}{x+1}}{\\tfrac{ax}{x+1} + 1} = \\tfrac{a^2 x}{ax + x + 1}$.',
          'Setting $f(f(x)) = x$: $a^2 x = x(ax + x + 1)$, i.e. $a^2 = ax + x + 1$ for ALL $x$ — the $x$-coefficient forces $a = -1$, and then $a^2 = 1$ ✓ consistent.',
          'Check $a = -1$: $f(x) = \\tfrac{-x}{x + 1}$, and $f(f(x)) = \\tfrac{\\tfrac{x}{x+1}}{\\tfrac{1}{x+1}} = x$ ✓. Hence $a = -1$.',
        ], answer: 'k − x is self-inverse for every k; a = −1 makes ax/(x + 1) an involution.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove (g∘f)⁻¹ = f⁻¹∘g⁻¹ using the two-sided characterization, and confirm the order on finite sets: A = {1,2,3} --f(n)=2n--> B = {2,4,6} --g(e)=e+1--> C = {3,5,7}.', solution: [
          'Let $h = f^{-1} \\circ g^{-1}$. By the characterization, it suffices to check both compositions.',
          'One side: $h \\circ (g \\circ f) = f^{-1} \\circ (g^{-1} \\circ g) \\circ f = f^{-1} \\circ I_B \\circ f = I_A$ — associativity (lesson 1.3) pairs the middle machines first.',
          'Other side: $(g \\circ f) \\circ h = g \\circ (f \\circ f^{-1}) \\circ g^{-1} = g \\circ I_B \\circ g^{-1} = I_C$. Both laws hold, hence $h$ is THE undo: $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.',
          'The finite census agrees: the composite sends $1 \\mapsto 3$, $2 \\mapsto 5$, $3 \\mapsto 7$; undoing $g$ first ($-1$) then $f$ ($\\div 2$) returns $3 \\mapsto 2 \\mapsto 1$, $5 \\mapsto 4 \\mapsto 2$, $7 \\mapsto 6 \\mapsto 3$ — every element home.',
          'Note the order: $g^{-1}$ ran BEFORE $f^{-1}$ — the last machine on the way out is the first machine on the way back.',
        ], answer: 'Proof by the characterization; the finite relay 3→2→1, 5→4→2, 7→6→3 confirms the reversed order.' },
        { q: 'Prove that g∘f = I_A forces f one-one. Then exhibit f, g with g∘f = I_A but f∘g ≠ I_B, and conclude the uniqueness clause of the characterization.', solution: [
          'Suppose $f(x_1) = f(x_2)$. Apply $g$: $g(f(x_1)) = g(f(x_2))$, that is $(g \\circ f)(x_1) = (g \\circ f)(x_2)$. But $g \\circ f = I_A$, so $x_1 = x_2$ — injective, proved.',
          'The one-sided exhibit: $A = \\{1, 2\\}$, $B = \\{1, 2, 3\\}$; $f(1) = 1$, $f(2) = 2$ (one-one, into) and $g(1) = 1$, $g(2) = 2$, $g(3) = 2$.',
          'Then $(g \\circ f)(1) = 1$ and $(g \\circ f)(2) = 2$ — the identity on $A$ ✓. But $(f \\circ g)(3) = f(2) = 2 \\neq 3$ — NOT the identity on $B$.',
          'So one law alone lets $g$ be a partial undo; the second law is what pins it. Hence: if BOTH $g \\circ f = I_A$ and $f \\circ g = I_B$ hold, $g$ is unique — it is $f^{-1}$, because any two machines satisfying both laws must agree with each other (each is the undo of $f$, and the undo, once it exists, is exactly one machine by one-one + onto).',
        ], answer: 'g∘f = I_A ⇒ f one-one; the exhibit shows f∘g ≠ I_B; both laws together give the unique inverse.' },
      ] },
    ] },

    { kind: 'formula', name: 'The inverse, symbolically', latex: 'f^{-1}(y) = x \\iff f(x) = y \\qquad f^{-1} \\text{ exists} \\iff f \\text{ is bijective}', note: 'one-one gives uniqueness of the return, onto gives its existence for every target' },
    { kind: 'formula', name: 'The two identity laws', latex: 'f^{-1} \\circ f = I_A \\qquad f \\circ f^{-1} = I_B', note: 'the definition of the undo, certified on both sides; conversely both laws together force g = f⁻¹' },
    { kind: 'formula', name: 'The swap law', latex: '\\mathrm{Dom}(f^{-1}) = \\mathrm{Rng}(f) \\qquad \\mathrm{Rng}(f^{-1}) = \\mathrm{Dom}(f)', note: 'domain and range trade places; forbidden inputs become forbidden outputs' },
    { kind: 'formula', name: 'Shoes and socks', latex: '(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}', note: 'the last machine is undone first; proved by the two-sided characterization' },
    { kind: 'formula', name: 'The solve-back recipe', latex: 'y = f(x) \\;\\Rightarrow\\; \\text{solve for } x \\;\\Rightarrow\\; \\text{rename} \\;\\Rightarrow\\; f^{-1}', note: 'a solve that dies at some y marks the honest codomain — the machine is onto exactly where the solve survives' },
    { kind: 'formula', name: 'The Möbius undo', latex: 'f(x) = \\frac{px + q}{rx + s} \\;\\Rightarrow\\; f^{-1}(x) = \\frac{-sx + q}{rx - p} \\quad (ps - qr \\neq 0)', note: 'the four linear moves run backwards; |ps − qr| is exactly the cross-product constant of the one-one proof' },
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
  lessons: [lesson11, lesson12, lesson13, lesson14],
  plannedLessons: [
    'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog',
    'Even and Odd Functions and Their Extensions',
    'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph',
    'The Period Census: Periods of Transformed and Composite Functions',
  ],
}

