import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 2: The Division Algorithm and
 * the Structure of Divisibility
 *
 * LESSONS WRITTEN: 2.1 Division with Rest: The Division Algorithm
 *                  2.2 The Algebra of Divisibility
 *                  (both: run 51 — 2026-11-05)
 * CHAPTER STATUS: in-progress 2/4 (2.3 Euclidean algorithm + Bézout and
 * 2.4 linear Diophantine equations close it at run 52).
 *
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * university number-systems bridge; reserved key run 48); Euclid's
 * Elements Book VII — Definitions 3–5 (the "measures" charter) and the
 * guide's note that Euclid supplies no postulates for numbers yet leans
 * on a decreasing-sequence principle in VII.2, the well-ordering engine
 * Lesson 1.3 made explicit — web-checked 2026-11-05 via David Joyce's
 * Clark University edition (sanctioned fallback), new key
 * euclid-elements-book-vii; Edmund Landau, Elementary Number Theory
 * (1927) — first in-print use of the a|b notation, with Hardy's
 * unpublished 1925 seminar notes the earlier echo (MacTutor, per
 * Tattersall) — new key landau-1927-elementare; the name history —
 * "algorithm" from Algoritmi, the Latinized name of al-Khwārizmī —
 * web-checked run 47 and carried; Khattar QA 4e ch. 1 (the
 * competitive-exam division scope). All web-checked 2026-11-05 —
 * see docs/project/SOURCE_LOG.md. Exposition original.
 *
 * Every number below was recomputed by scripts/verify-book2-ch02.ts
 * (sections A–T) BEFORE being written — 166 checks, all passing at
 * authoring time. The verify script caught two real defects
 * pre-writing: a miscomputed impostor count in the uniqueness sweep
 * and an inverted divisibility direction in the 12 | 3·4 caution.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'division-algorithm-and-divisibility',
  title: 'The Division Algorithm and the Structure of Divisibility',
  summary:
    'The theorem hiding under every long division: a = bq + r with 0 ≤ r < b, existence proved by well-ordering and uniqueness by subtraction. Divisibility becomes algebra (the transitive and linear-combination laws), the Euclidean algorithm gets the proof FM omitted, Bézout’s identity is derived, and linear Diophantine equations ax + by = c are solved in full.',
  status: 'in-progress',
  plannedLessons: [
    'The Euclidean Algorithm, Proven — and Bézout’s Identity',
    'Linear Diophantine Equations',
  ],
  lessons: [
    {
      id: 'ans-division-with-rest-the-division-algorithm',
      number: '2.1',
      title: 'Division with Rest: The Division Algorithm',
      prerequisites: ['fm-division-remainders-zero', 'ans-least-number-principle-recursion'],
      sources: ['beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'khattar-qa-4e'],
      concepts: [
        'The division algorithm a = bq + r',
        'Existence by descent',
        'The least-number principle at work',
        'Uniqueness from the remainder band',
        'The remainder band 0 ≤ r < b',
        'Repeated subtraction as the proof in motion',
        'a mod b',
        'Exact division: r = 0',
      ],
      objectives: [
        'State the division algorithm precisely and read $a = bq + r$ in both directions — building a dividend from a pair $(q, r)$ and pulling a pair out of a dividend',
        'Prove existence by the descent argument, naming exactly where the least-number principle of Lesson 1.3 enters',
        'Prove uniqueness from the remainder band, and show by instance why dropping the band kills it',
        'Use $q$ and $r$ as data: rebuild dividends, find smallest and largest numbers with a given remainder, and certify any division with the check $qb + r = a$',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 2.4 taught you to *run* division: the sharing and grouping readings, the multiply–subtract–bring-down loop of long division, and a verification habit — after every division, check the answer by multiplying back and adding the leftover. Every check you ever performed had the same shape: dividend = quotient × divisor + remainder. In symbols, $a = qb + r$. That check worked every single time, and the remainder always came out smaller than the divisor, and two people dividing the same pair of numbers always got the same $q$ and the same $r$. None of that was an accident — and none of it was proved. This lesson proves it. The statement hiding under your long-division habit is one of the oldest theorems in mathematics, and its two halves — that a valid $(q, r)$ always *exists*, and that it is *unique* — are exactly the kind of claim this book exists to certify.',
        },
        {
          kind: 'para',
          text: 'The result goes by an odd name: the **division algorithm** — odd because it is a theorem, not a recipe. (The recipe — long division, or its slower cousin repeated subtraction — you already own; the theorem is the licence under which the recipe *always* succeeds and *always* answers the same. Where the name came from is this lesson\u2019s historical note.) In the French tradition it is called *division euclidienne*, the Euclidean division, and in several modern texts the quotient–remainder theorem. We will prove it with the sharpest tool Chapter 1 forged: the least-number principle, the guarantee that every nonempty set of natural numbers has a least element. Lesson 1.2 promised that "the least-number principle powers the division algorithm of chapter 2"; the promise comes due now.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The Division Algorithm',
          text: 'Let $a$ and $b$ be natural numbers with $a \\ge 1$ (the **dividend**) and $b \\ge 1$ (the **divisor**). The division algorithm says that there exist **unique** natural numbers $q$ (the **quotient**) and $r$ (the **remainder**) such that $a = qb + r$ with $0 \\le r < b$. Thus, the dividend is exactly $q$ full groups of $b$ plus a leftover $r$ that fits strictly inside one more group. The inequality $0 \\le r < b$ is not decoration — it is the clause that makes $q$ and $r$ unique, and both halves of the theorem below lean on it.',
        },
        {
          kind: 'para',
          text: 'Two scope remarks before the proofs, in the spirit of Lesson 1.1\u2019s honesty. First, zero: in this book $0$ is not a natural number (it joins formally in Chapter 6), so the theorem is stated for dividends $a \\ge 1$. The zero dividend rides along harmlessly — $0 = 0 \\cdot b + 0$ is the only pair that can describe it — and we flag the one instance where it appears rather than pretending it is not there. Second, the divisor: $b \\ge 1$ is essential, and Foundation Mathematics Lesson 2.4 already explained the extreme version of why — zero can never sit in the divisor\u2019s seat. Dividing *by* $b$ means counting in groups of $b$; a group of nothing counts nothing, and no quotient could exist.',
        },
        {
          kind: 'para',
          text: 'Before proving anything, sharpen the claim. "There exist unique $q$ and $r$" is two promises wearing one coat:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Existence** — for every dividend and divisor, at least one valid pair $(q, r)$ with $0 \\le r < b$ can be found. No division is left stranded without an answer.',
            '**Uniqueness** — no dividend and divisor admit *two different* valid pairs. The answer, once the band $0 \\le r < b$ is demanded, is forced.',
          ],
        },
        {
          kind: 'para',
          text: 'Watch the two promises in motion on a single divisor, $b = 5$. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$17 = 3 \\cdot 5 + 2$ — three full groups of five and $2$ left over; the pair is $(q, r) = (3, 2)$, and $2 < 5$ ✓.',
            '$20 = 4 \\cdot 5 + 0$ — the remainder $0$ is legal ($0 \\le 0$), and division comes out *exact*: five goes into twenty exactly four times. Exact division is not a separate operation; it is the remainder-zero row of one theorem.',
            '$4 = 0 \\cdot 5 + 4$ — a dividend smaller than the divisor still gets a pair: zero full groups, everything left over. The quotient $0$ is a legitimate quotient, and the band holds ($4 < 5$).',
            '$0 = 0 \\cdot 5 + 0$ — the flagged zero-dividend row: nothing divided by five is zero groups with nothing left. (The convention, not the theorem — $a \\ge 1$ above.)',
          ],
        },
        { kind: 'heading', text: 'Existence: the descent argument' },
        {
          kind: 'para',
          text: 'Could some dividend, for some divisor, admit *no* valid pair — a division that never lands? To prove existence we must rule that world out for every $(a, b)$ at once, and induction (Lesson 1.2) is awkward here because the statement we want is about *pairs* of numbers. The least-number principle of Lesson 1.3 is built for exactly this shape of question: it certifies a search that must terminate. The idea is to look at *all possible leftovers at once* and take the smallest.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The engine being reused',
          text: 'The **least-number principle** (Lesson 1.3): every nonempty set of natural numbers has a least element. Equivalently — there is no endless strictly-descending staircase of natural numbers, because the set of its steps would be nonempty yet have no bottom. The division algorithm is the classical application: we build the staircase of leftovers and let well-ordering find its bottom step.',
        },
        {
          kind: 'para',
          text: 'Fix the divisor $b \\ge 1$ and the dividend $a \\ge 1$. Consider the set of *all legal leftovers* — everything you could still be holding after removing some whole number of full groups of $b$: $S = \\{a - bq : q = 0, 1, 2, \\dots \\text{ and } a - bq \\ge 0\\}$. In words: subtract $b$ over and over, as many times as you can without going below zero, and collect everything the process ever holds. For $a = 23$, $b = 5$ the set reads $\\{23, 18, 13, 8, 3\\}$ — start at 23, and each full group of five removed leaves the next element; stop at 3 because one more subtraction would go negative. Three facts about $S$ are immediate, and the third is where the theorem lives:',
        },
        {
          kind: 'derivation',
          title: 'Existence of quotient and remainder',
          statement:
            'Claim: for all natural numbers $a \\ge 1$ and $b \\ge 1$ there exist natural numbers $q$ and $r$ with $a = qb + r$ and $0 \\le r < b$. The proof borrows the least-number principle (Lesson 1.3) and nothing else.',
          steps: [
            {
              label: 'Build the leftover set and see it is nonempty',
              formula: 'S = \\{a - bq : q = 0, 1, 2, \\dots,\\ a - bq \\ge 0\\}',
              explanation:
                'Take $q = 0$: then $a - b \\cdot 0 = a \\ge 1 \\ge 0$, so $a$ itself belongs to $S$. A set containing something is nonempty — the hypothesis of the least-number principle is met. (Had we allowed only $q \\ge 1$, the set could come up empty for small dividends; $q = 0$ is the load-bearing entry.)',
            },
            {
              label: 'Let the least-number principle fire',
              formula: 'r = \\min S',
              explanation:
                'If $0$ belongs to $S$, take $r = 0$ at once — the division is exact and the band holds trivially. Otherwise every element of $S$ is a positive natural number, $S$ is nonempty (step 1), and the least-number principle of Lesson 1.3 applies: $S$ has a least element. Name it $r$ — and name also the witness that put it there: $r = a - bq$ for some whole number $q$.',
            },
            {
              label: 'Prove the bottom step clears the band: r < b',
              formula: 'r \\ge b \\ \\Rightarrow\\ r - b = a - b(q + 1) \\in S,\\ \\text{smaller than } r',
              explanation:
                'Suppose, for contradiction, $r \\ge b$. Then $r - b \\ge 0$, and rearranging, $r - b = a - bq - b = a - b(q + 1)$ — the leftover after removing one *more* full group. So $r - b$ belongs to $S$. But $r - b < r$: we have found an element of $S$ strictly smaller than its least element — a contradiction. Hence $r < b$.',
            },
            {
              label: 'Rearrange the witness into the theorem\u2019s dress',
              formula: 'r = a - bq \\ \\Longleftrightarrow\\ a = qb + r, \\qquad 0 \\le r < b',
              explanation:
                'The defining equation of the witness, read backwards, is exactly the quotient–remainder form. The inequality $r \\ge 0$ was $S$\u2019s entry requirement all along; the strict upper bound was step 3. Existence is proved.',
            },
          ],
          result: 'For every $a \\ge 1$ and $b \\ge 1$, valid $q$ and $r$ with $a = qb + r$, $0 \\le r < b$ exist — found by taking the least element of the leftover set.',
        },
        {
          kind: 'para',
          text: 'Now look at what you just proved from the other side. The set $S$ for $(a, b) = (23, 5)$ was $\\{23, 18, 13, 8, 3\\}$ — and walking down it, $23 \\to 18 \\to 13 \\to 8 \\to 3$, is *subtracting 5 four times*. The number of steps down the staircase is exactly the quotient $q = 4$; the bottom step is exactly the remainder $r = 3$. This is Foundation Mathematics\u2019s grouping reading of division — division as repeated subtraction — and the descent proof is that classroom picture standing up straight: the reason repeated subtraction must terminate (you cannot descend a strictly-decreasing natural staircase forever) *is* the least-number principle, and the reason it answers correctly is that its final leftover is the *least* leftover, which cannot afford one more full group. FM 2.4 used the loop; this lesson explains why the loop cannot fail.',
        },
        {
          kind: 'figure',
          caption:
            'The remainder band, drawn for a = 23, b = 5. The multiples of 5 — 0, 5, 10, 15, 20 — tile the line in widths of one b; the dividend 23 falls inside the tile that starts at 20 = 4·5, at offset r = 3 from its left wall. The quotient q = 4 counts the full tiles left of 23; the remainder r = 3 is the stub inside the last one. The dashed tile to the right of 23 is the one more full group that 23 cannot afford: one more b would overshoot (25 > 23), and that is the whole content of r < b.',
          svg: `<svg viewBox="0 0 920 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line 0 to 26 with multiples of 5 ticked, the dividend 23 between 20 and 25, remainder bracket 3">
  <defs>
    <marker id="band-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <!-- axis -->
  <line x1="50" y1="110" x2="862" y2="110" stroke="currentColor" stroke-width="1.5" marker-end="url(#band-arrow)"/>
  <!-- multiple ticks -->
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="60" y1="104" x2="60" y2="116"/>
    <line x1="210" y1="104" x2="210" y2="116"/>
    <line x1="360" y1="104" x2="360" y2="116"/>
    <line x1="510" y1="104" x2="510" y2="116"/>
    <line x1="660" y1="104" x2="660" y2="116"/>
    <line x1="810" y1="104" x2="810" y2="116"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="60" y="140">0</text>
    <text x="210" y="140">5</text>
    <text x="360" y="140">10</text>
    <text x="510" y="140">15</text>
    <text x="660" y="140">20</text>
    <text x="810" y="140">25</text>
  </g>
  <!-- dividend tick at 23 -->
  <line x1="750" y1="104" x2="750" y2="116" stroke="currentColor" stroke-width="2.5"/>
  <text x="750" y="92" font-size="13.5" font-weight="700" fill="currentColor" text-anchor="middle">23 = 4·5 + 3</text>
  <!-- the overshoot tile (dashed) -->
  <g stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" fill="none" opacity="0.85">
    <line x1="660" y1="56" x2="660" y2="104"/>
    <line x1="810" y1="56" x2="810" y2="104"/>
    <line x1="660" y1="56" x2="810" y2="56"/>
  </g>
  <text x="735" y="44" font-size="12.5" fill="currentColor" opacity="0.85" text-anchor="middle">one more b (5 wide) would overshoot</text>
  <!-- remainder bracket -->
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="660" y1="170" x2="750" y2="170"/>
    <line x1="660" y1="164" x2="660" y2="176"/>
    <line x1="750" y1="164" x2="750" y2="176"/>
  </g>
  <text x="705" y="194" font-size="13" font-weight="700" fill="currentColor" text-anchor="middle">r = 3</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Extract the pair $(q, r)$ for $a = 23$, $b = 5$, then certify it',
          steps: [
            'Set the band first: the remainder must satisfy $0 \\le r < 5$, so $r$ is one of $0, 1, 2, 3, 4$ — five possible leftovers, no more.',
            'Find the largest multiple of $5$ that does not overshoot $23$: the candidates run $5, 10, 15, 20, 25$, and $25 > 23$, so the winner is $20 = 4 \\cdot 5$.',
            'So, $q = 4$, and the leftover is $r = 23 - 20 = 3$.',
            'Check the band: $0 \\le 3 < 5$ ✓. Check the rebuild: $4 \\cdot 5 + 3 = 20 + 3 = 23$ ✓.',
            'Hence $23 = 4 \\cdot 5 + 3$ — and by uniqueness (proved below) no other pair with $r$ in the band can describe this division.',
          ],
        },
        {
          kind: 'para',
          text: 'The worked search above — largest multiple not overshooting, then read the stub — is long division\u2019s first step wearing the theorem\u2019s clothes. For big dividends the same loop repeats place by place (FM 2.4 walked the full multiply–subtract–bring-down machinery on $8{,}892 \\div 36$; nothing of it needs re-teaching here). What the theorem adds is the guarantee: the loop cannot stall, and its answer cannot disagree with another correct run.',
        },
        { kind: 'heading', text: 'Uniqueness: why the answer is forced' },
        {
          kind: 'para',
          text: 'Existence says a valid pair is always there to be found. Uniqueness says there is never a second one — and this half is where the band $0 \\le r < b$ earns its keep. The worry is concrete: $23 = 3 \\cdot 5 + 8$ is a *true equation* describing $23 \\div 5$, yet it is not the division\u2019s answer, because its remainder $8$ breaks the band ($8 \\ge 5$). Equations are cheap; *band-respecting* equations are the currency. Could two band-respecting pairs coexist for the same division? Subtracting the two descriptions kills the possibility in one move.',
        },
        {
          kind: 'derivation',
          title: 'Uniqueness of quotient and remainder',
          statement:
            'Claim: if $a = bq_1 + r_1 = bq_2 + r_2$ with both remainders in the band $0 \\le r_1 < b$ and $0 \\le r_2 < b$, then $q_1 = q_2$ and $r_1 = r_2$. The proof is one subtraction and a case split.',
          steps: [
            {
              label: 'Subtract the two descriptions',
              formula: 'bq_1 + r_1 = bq_2 + r_2 \\ \\Rightarrow\\ b(q_1 - q_2) = r_2 - r_1',
              explanation:
                'Move the $b$-terms to one side and the remainders to the other; distribution (a theorem since Lesson 1.3) factors the left side. Read the equation as a sentence: *some multiple of $b$ equals the difference of two band-respecting remainders*.',
            },
            {
              label: 'Case q₁ > q₂: the left side is too big',
              formula: 'q_1 - q_2 \\ge 1 \\ \\Rightarrow\\ b(q_1 - q_2) \\ge b, \\quad \\text{but} \\quad r_2 - r_1 \\le (b - 1) - 0 = b - 1',
              explanation:
                'If $q_1$ exceeds $q_2$, the left side is a positive multiple of $b$ — at least $b$ itself. The right side is a difference of two numbers squeezed into $0, 1, \\dots, b-1$, so it can never exceed $b - 1$. A number that is at least $b$ cannot equal a number that is at most $b - 1$: contradiction.',
            },
            {
              label: 'Case q₂ > q₁: the mirror contradiction',
              formula: 'b(q_2 - q_1) \\ge b, \\quad \\text{but} \\quad r_1 - r_2 \\le b - 1',
              explanation:
                'Swap the roles of the two pairs and the same squeeze applies: the case is the previous one read in a mirror. Neither quotient can exceed the other.',
            },
            {
              label: 'Conclude, and read the remainder off',
              formula: 'q_1 = q_2 \\ \\Rightarrow\\ bq_1 = bq_2 \\ \\Rightarrow\\ r_1 = r_2',
              explanation:
                'Trichotomy (Lesson 1.1) leaves only $q_1 = q_2$. Substituting back into $bq_1 + r_1 = bq_2 + r_2$ cancels the equal $bq$-terms and forces $r_1 = r_2$. Both halves of the pair are pinned.',
            },
          ],
          result: 'The pair $(q, r)$ with $0 \\le r < b$ is unique — two band-respecting descriptions of one division are the same description.',
        },
        {
          kind: 'para',
          text: 'Notice what the proof used: nothing but the band. The squeeze argument never mentions how big $a$ is — uniqueness is bought entirely by insisting $r$ fits strictly inside one group of $b$. Drop the upper bound and the theorem dies on the spot: $10 = 1 \\cdot 5 + 5 = 2 \\cdot 5 + 0$ are two *different* descriptions, both arithmetically true, both with nonnegative remainders. The impostor remainder $r = 5$ is exactly one $b$ too fat; the uniqueness proof\u2019s case 1 catches it — the difference $r_2 - r_1 = 0 - 5 = -5$ reaches magnitude $b$, and the squeeze collapses. The band is not a technicality. It is the theorem.',
        },
        {
          kind: 'example',
          title: 'The impostor hunt: how many pairs $(q, r)$ with $0 \\le r < 4$ solve $31 = 4q + r$?',
          steps: [
            'Set the band: $r$ must be one of $0, 1, 2, 3$.',
            'Take the largest multiple of $4$ not overshooting $31$: the multiples run $4, 8, \\dots, 28, 32$, and $32 > 31$, so the winner is $28 = 4 \\cdot 7$.',
            'So, $q = 7$ and $r = 31 - 28 = 3$; the band holds ($3 < 4$) and the rebuild checks: $4 \\cdot 7 + 3 = 31$ ✓.',
            'Now sweep the impostors: every other pair with $r$ in $\\{0, 1, 2, 3\\}$ misses the dividend — $(6, 7)$ breaks the band, $(8, -1)$ breaks it below, and $(5, 11)$, $(4, 15)$, $(3, 19)$ add up correctly but each carries a remainder of $11$, $15$, $19$ — all $\u2265 4$.',
            'Hence exactly one band-respecting pair exists: $(7, 3)$. The count is the uniqueness theorem, witnessed on a single division.',
          ],
        },
        { kind: 'heading', text: 'The remainder decides: b slots and the a mod b notation' },
        {
          kind: 'para',
          text: 'With existence and uniqueness in hand, the remainder becomes a *well-defined function* of the pair $(a, b)$: divide $a$ by $b$, and exactly one leftover in the band comes back. The band has exactly $b$ members — $0, 1, 2, \\dots, b - 1$ — so dividing by $b$ sorts the whole number line into $b$ slots. Dividing by $2$ gives two slots (the even numbers, remainder $0$; the odd numbers, remainder $1$ — $23$ lands in slot $1$, and $23 = 11 \\cdot 2 + 1$ certifies it). Dividing by $5$ gives five slots; every number in history lands in exactly one. That sorting — *classification by remainder* — is the seed of Chapter 5, where the slots themselves become a small arithmetic of their own (Gauss called it congruence). Here we only fix the notation for reading a slot off a number:',
        },
        {
          kind: 'para',
          text: 'For $a \\ge 1$ and $b \\ge 1$, write $r = a \\bmod b$ for the (unique) remainder of $a$ on division by $b$, and recover the quotient as $q = (a - r)/b$. Thus, $23 \\bmod 5 = 3$ and $q = (23 - 3)/5 = 4$; $20 \\bmod 5 = 0$ — exact division — and $4 \\bmod 5 = 4$: a small dividend sits in its own remainder-sized slot. The *mod* notation is a compression: $a \\bmod b$ names the bottom of the descent staircase of Lesson 2.1\u2019s proof.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A theorem wearing an algorithm\u2019s name',
          text: 'The theorem\u2019s content is ancient. Euclid\u2019s *Elements*, Book VII — the first book of his number theory — opens with definitions that are our vocabulary in disguise: a lesser number "measures" a greater when it fits a whole number of times (Definitions 3–5), the language this chapter\u2019s sequel lesson adopts as *divides*. Euclid\u2019s proofs lean constantly on a process he never names: repeatedly subtracting the lesser from the greater (his Propositions VII.1–2 run it to find the greatest common measure). He offers no postulate guaranteeing the process stops — as the modern commentary on Book VII observes, Euclid supplies no axioms for numbers at all, and the *descent must terminate* principle he uses is left implicit. The least-number principle you proved equivalent to induction in Lesson 1.3 is precisely the missing postulate, made explicit two thousand years later. The *name* "division algorithm" is younger and stranger: *algorithm* descends from *Algoritmi*, the Latinized name of the ninth-century Baghdad mathematician al-Khwārizmī, whose arithmetic treatises reached medieval Europe and lent his name to every stepwise procedure — so the theorem is named after the word for *recipe*, while the actual recipe (long division) predates the name. French classrooms still say *division euclidienne*; many modern texts prefer the honest descriptive title, the quotient–remainder theorem. All three names, one statement.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'The quotient–remainder form is a fixture of SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical papers, in shapes this lesson now certifies end to end: extract $q$ and $r$ from a division and verify with $qb + r = a$; rebuild a dividend from the pair ($q = 12$, $r = 5$, $b = 8$, find $a$ — Exercise L2); find the smallest or largest number in a range leaving a given remainder (the L2 exercise\u2019s 103, swept and certified); and chain remainder facts across consecutive numbers — $n$, $n+1$, $n+2$ on division by $3$ land in three different slots, one of them exact. The band $0 \\le r < b$ is the examiner\u2019s favourite trap: an option pair that "adds up" but carries $r \\ge b$ (the $31 = 4 \\cdot 6 + 7$ species) is wrong precisely because uniqueness forbids it.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Division algorithm',
              def: 'The theorem: for $a \\ge 1$ and $b \\ge 1$ there exist unique $q, r$ with $a = qb + r$ and $0 \\le r < b$. Existence by the least-number principle (descent); uniqueness by the band squeeze.',
            },
            {
              term: 'Dividend',
              def: 'The number being divided — the $a$ of $a = qb + r$. In $23 = 4 \\cdot 5 + 3$ the dividend is 23.',
            },
            {
              term: 'Divisor',
              def: 'The number of size each group is built with — the $b$ of $a = qb + r$. It must satisfy $b \\ge 1$; zero can never divide (FM 2.4).',
            },
            {
              term: 'Quotient',
              def: 'The count of full groups — the $q$ of $a = qb + r$. In $23 = 4 \\cdot 5 + 3$ the quotient is 4. A dividend smaller than the divisor still gets the legitimate quotient 0.',
            },
            {
              term: 'Remainder',
              def: 'The leftover after the full groups — the $r$ of $a = qb + r$, confined to the band $0 \\le r < b$. In $23 = 4 \\cdot 5 + 3$ the remainder is 3.',
            },
            {
              term: 'Remainder band',
              def: 'The requirement $0 \\le r < b$: the remainder is never negative and strictly smaller than the divisor. The band admits exactly $b$ values — $0, 1, \\dots, b-1$ — and both uniqueness and the descent proof lean on it.',
            },
            {
              term: 'a mod b',
              def: 'Notation for the unique remainder of $a$ on division by $b$: $r = a \\bmod b$. The quotient recovers as $q = (a - r)/b$. E.g. $23 \\bmod 5 = 3$.',
            },
            {
              term: 'Exact division',
              def: 'A division whose remainder is $0$: $a = qb + 0$, so $b$ fits a whole number of times exactly. Lesson 2.2 promotes this case to a definition — divisibility.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In quotient–remainder form, $47 = q \\cdot 5 + r$ with $0 \\le r < 5$. What is the pair $(q, r)$?',
              options: ['$q = 9$, $r = 2$', '$q = 8$, $r = 7$', '$q = 9$, $r = 3$', '$q = 10$, $r = -3$'],
              answer: 0,
              explain:
                'The largest multiple of 5 not overshooting 47 is $45 = 9 \\cdot 5$, leaving $r = 2$, and $2 < 5$ ✓. Option (b) also rebuilds $47$ ($40 + 7$) but its remainder breaks the band — uniqueness forbids it, exactly the trap the squeeze proof closes. Option (c) rebuilds $48$, not $47$. Option (d) rebuilds $47$ but a negative remainder is no remainder at all: the band starts at $0$.',
            },
            {
              q: 'How many pairs $(q, r)$ with $0 \\le r < 4$ satisfy $31 = 4q + r$?',
              options: ['Exactly one', 'Exactly two', 'Exactly three', 'It depends on the dividend'],
              answer: 0,
              explain:
                'Uniqueness: if two band-respecting pairs both described 31, subtracting them would force $4(q_1 - q_2) = r_2 - r_1$ with $|r_2 - r_1| \\le 3 < 4$ — impossible unless both sides are 0. The one pair is $(7, 3)$. The other options describe worlds without the uniqueness half of the theorem.',
            },
            {
              q: 'For every dividend $a \\ge 1$ and divisor $b \\ge 1$, the division algorithm guarantees:',
              options: [
                'that a quotient exists, though the remainder may vary run to run',
                'only that the remainder is smaller than the divisor',
                'existence AND uniqueness: one $(q, r)$ with $0 \\le r < b$, always',
                'that every division comes out exact',
              ],
              answer: 2,
              explain:
                'The theorem has two halves and both are needed: existence (the descent argument — some valid pair always exists) and uniqueness (the squeeze — only one does). Option (a) concedes existence but abandons uniqueness; option (b) is one clause of the statement, not the guarantee; option (d) confuses the general case with the remainder-zero row — most divisions leave a stub.',
            },
            {
              q: '$0 = q \\cdot 7 + r$ with $0 \\le r < 7$. What is $(q, r)$?',
              options: ['$(0, 0)$', '$(1, -7)$', 'undefined — zero cannot be divided', '$(0, 7)$'],
              answer: 0,
              explain:
                'The zero dividend is the flagged convention row: $0 = 0 \\cdot 7 + 0$ — no full groups, nothing left over, band respected. Option (b) breaks the band below zero; option (d) breaks it above. (The *divisor* is what can never be zero — FM 2.4 — not the dividend.)',
            },
            {
              q: 'In $a = qb + r$ with $0 \\le r < b$, the case $r = 0$ says:',
              options: ['the division failed', '$b$ measures $a$ — the division is exact', 'the quotient must be 0', 'the remainder was too large'],
              answer: 1,
              explain:
                '$r = 0$ means $a = qb$: the divisor fits a whole number of times exactly — the doorway to Lesson 2.2, where "b measures a" gets its algebra. Option (c) is backwards: exact division usually has a large quotient. Option (d) is impossible — the band caps $r$ at $b - 1$.',
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
                  q: 'Express $47 \\div 5$ in quotient–remainder form and certify it with the rebuild check.',
                  solution: [
                    'Set the band: $r \\in \\{0, 1, 2, 3, 4\\}$.',
                    'Take the largest multiple of $5$ not overshooting $47$: $45 = 9 \\cdot 5$ ($50$ overshoots).',
                    'So, $q = 9$ and $r = 47 - 45 = 2$.',
                    'Check the band $0 \\le 2 < 5$ ✓; rebuild $9 \\cdot 5 + 2 = 45 + 2 = 47$ ✓.',
                    'Hence $47 = 9 \\cdot 5 + 2$.',
                  ],
                  answer: '47 = 9·5 + 2',
                },
                {
                  q: 'Express $68 \\div 9$ in quotient–remainder form and certify it.',
                  solution: [
                    'Set the band: $r \\in \\{0, 1, \\dots, 8\\}$.',
                    'The multiples of $9$ near $68$: $63 = 9 \\cdot 7$, then $72$ overshoots.',
                    'So, $q = 7$ and $r = 68 - 63 = 5$.',
                    'Check the band $0 \\le 5 < 9$ ✓; rebuild $7 \\cdot 9 + 5 = 63 + 5 = 68$ ✓.',
                    'Hence $68 = 7 \\cdot 9 + 5$.',
                  ],
                  answer: '68 = 7·9 + 5',
                },
                {
                  q: 'Express $100 \\div 7$ in quotient–remainder form and certify it.',
                  solution: [
                    'Set the band: $r \\in \\{0, 1, \\dots, 6\\}$.',
                    'The multiples of $7$ near $100$: $98 = 7 \\cdot 14$ ($105$ overshoots).',
                    'So, $q = 14$ and $r = 100 - 98 = 2$.',
                    'Check the band $0 \\le 2 < 7$ ✓; rebuild $14 \\cdot 7 + 2 = 98 + 2 = 100$ ✓.',
                    'Hence $100 = 14 \\cdot 7 + 2$.',
                  ],
                  answer: '100 = 14·7 + 2',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A division by $8$ returned quotient $12$ and remainder $5$. What was the dividend?',
                  solution: [
                    'Read the form backwards: $a = qb + r = 12 \\cdot 8 + 5$.',
                    'So, $a = 96 + 5 = 101$.',
                    'Check the band: $0 \\le 5 < 8$ ✓, so the pair is legal and uniqueness makes it *the* answer.',
                    'Hence the dividend was $101$.',
                  ],
                  answer: '101',
                },
                {
                  q: 'Compute $53 \\div 7$ by repeated subtraction, counting the subtractions, and match each stage to the descent proof.',
                  solution: [
                    'Subtract $7$ repeatedly: $53 \\to 46 \\to 39 \\to 32 \\to 25 \\to 18 \\to 11 \\to 4$.',
                    'Count the arrows: seven subtractions — so $q = 7$.',
                    'Stop at $4$: one more subtraction would go to $4 - 7 < 0$, and $4 < 7$ — the bottom of the staircase clears the band.',
                    'So, $r = 4$; check $7 \\cdot 7 + 4 = 49 + 4 = 53$ ✓.',
                    'Hence $53 = 7 \\cdot 7 + 4$: the subtraction chain *is* the descent walk through $S = \\{53, 46, 39, 32, 25, 18, 11, 4\\}$, and its length is the quotient.',
                  ],
                  answer: 'q = 7, r = 4 (53 = 7·7 + 4)',
                },
                {
                  q: 'Find the smallest three-digit number that leaves remainder $4$ on division by $9$.',
                  solution: [
                    'Start at the floor of the range: divide $100$ by $9$ — $100 = 9 \\cdot 11 + 1$ (band-checked: $1 < 9$).',
                    'Slot $1$ holds $100$; slot $4$ is three slots up the $9$-ladder.',
                    'So, the first three-digit number in slot $4$ is $100 + (4 - 1) = 103$.',
                    'Check: $103 = 9 \\cdot 11 + 4$, band $0 \\le 4 < 9$ ✓, and every smaller three-digit number ($100$–$102$) sits in slots $1$–$3$.',
                    'Hence $103$ is the smallest — the swept and certified exam answer.',
                  ],
                  answer: '103 (= 9·11 + 4)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Write out the leftover set $S$ for $a = 23$, $b = 5$; identify its least element; and explain why no further subtraction is possible there.',
                  solution: [
                    'Collect the leftovers: $S = \\{23 - 5q \\ge 0\\} = \\{23, 18, 13, 8, 3\\}$ — five elements, one per full group removable.',
                    'The walk strictly descends: each element is $5$ below the last.',
                    'The least-number principle (Lesson 1.3) applies to the nonempty set $S$: it has a least element, $3$.',
                    'At the bottom, $3 < 5$: one more full group would demand $3 - 5 < 0$, which $S$\u2019s membership clause forbids — the staircase has no next step.',
                    'Hence $r = 3$, with witness $q = 4$: the descent proof\u2019s anatomy, executed on one division.',
                  ],
                  answer: 'S = {23, 18, 13, 8, 3}; least element 3 = r; q = 4',
                },
                {
                  q: 'Dividing by $7$ sorts the number line into how many slots? Name them, and identify the slot of $50$.',
                  solution: [
                    'The band for $b = 7$ is $0 \\le r < 7$: exactly seven possible remainders — $0, 1, 2, 3, 4, 5, 6$.',
                    'Each remainder names one slot; every natural number lands in exactly one (existence) and only one (uniqueness).',
                    'Divide $50$ by $7$: $49 = 7 \\cdot 7$ does not overshoot, so $q = 7$ and $r = 50 - 49 = 1$.',
                    'Check the band $0 \\le 1 < 7$ ✓; rebuild $7 \\cdot 7 + 1 = 50$ ✓.',
                    'Hence seven slots, and $50$ sits in slot $1$.',
                  ],
                  answer: 'Seven slots {0, …, 6}; 50 is in slot 1 (50 = 7·7 + 1)',
                },
                {
                  q: 'Prove that the band $0 \\le r < b$ contains exactly $b$ values for every divisor $b \\ge 1$.',
                  solution: [
                    'List the candidates: $0, 1, 2, \\dots$ — which survive both inequalities?',
                    'The lower bound $r \\ge 0$ admits $0$ itself and everything above.',
                    'The upper bound $r < b$ excludes $b$ and everything above: the survivors are exactly $0, 1, \\dots, b - 1$.',
                    'Count them: pairing each survivor with the run it sits above — $r$ pairs with the run from $r$ to $b$ of length $b - r$ (Lesson 1.1\u2019s run count) — the runs $b, b-1, \\dots, 1$ are $b$ distinct lengths, so there are $b$ survivors.',
                    'Hence exactly $b$ values — the classification of the whole line into $b$ slots.',
                  ],
                  answer: 'Exactly b values: 0, 1, …, b−1',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'The equation $23 = 3 \\cdot 5 + 8$ is true. Why is $(3, 8)$ still not the answer to $23 \\div 5$, and what is the legal pair?',
                  solution: [
                    'Check the band first: $r = 8$ and $8 \\ge 5$ — the remainder does not fit strictly inside one group of the divisor.',
                    'The failure is visible in the number itself: a leftover of $8$ after removing groups of $5$ means one more full group was hiding inside it.',
                    'Convert the excess: $23 = 3 \\cdot 5 + 8 = 3 \\cdot 5 + 5 + 3 = 4 \\cdot 5 + 3$.',
                    'The legal pair $(4, 3)$ respects the band ($3 < 5$), and uniqueness (proved this lesson) says no other band-respecting pair exists.',
                    'Hence $(3, 8)$ is an equation, not a division answer; $(4, 3)$ is the answer.',
                  ],
                  answer: '(3, 8) breaks the band (8 ≥ 5); the legal pair is (4, 3)',
                },
                {
                  q: 'Suppose the band were relaxed to allow $r = b$. Exhibit a single division with two different valid descriptions, and say which part of the uniqueness proof collapses.',
                  solution: [
                    'Take $a = 10$, $b = 5$.',
                    'Under the relaxed rule: $10 = 1 \\cdot 5 + 5$ and $10 = 2 \\cdot 5 + 0$ — two different descriptions, both with nonnegative remainders.',
                    'Run the uniqueness algebra on them: $b(q_1 - q_2) = 5(1 - 2) = -5$ and $r_2 - r_1 = 0 - 5 = -5$ — the equation *holds*; the contradiction is gone.',
                    'Where did it die? Case 1 needed $r_2 - r_1 \\le b - 1 = 4$; here $r_2 - r_1 = -5$ reaches magnitude $b$ — the squeeze fails.',
                    'Hence the strict inequality $r < b$ is exactly what uniqueness consumes: admit $r = b$ and answers stop being forced.',
                  ],
                  answer: '10 = 1·5 + 5 = 2·5 + 0; the squeeze r₂ − r₁ ≤ b − 1 collapses',
                },
                {
                  q: 'Two students divide $47$ by $5$. Riya reports $(q, r) = (9, 2)$; Arjun reports $(8, 7)$. Both equations rebuild $47$. Who is right, and why is the disagreement impossible once the band is enforced?',
                  solution: [
                    'Both rebuild correctly: $9 \\cdot 5 + 2 = 47$ and $8 \\cdot 5 + 7 = 47$ — arithmetic is not the dispute.',
                    'Band-check Riya: $0 \\le 2 < 5$ ✓. Band-check Arjun: $7 \\ge 5$ ✗.',
                    'Arjun\u2019s "remainder" of $7$ conceals one more full group: $47 = 8 \\cdot 5 + 7 = 9 \\cdot 5 + 2$ — his pair is Riya\u2019s before the last group is removed.',
                    'By uniqueness, only band-respecting pairs describe a division; two of them cannot coexist (the squeeze: $5(9 - 8) = 5 \\ge 5$ but $r$-difference $= -5$ reaches magnitude $5$).',
                    'Hence Riya is right, and the theorem guarantees every correct solver lands on $(9, 2)$ — the disagreement was an artifact of dropping the band.',
                  ],
                  answer: 'Riya: 47 = 9·5 + 2; Arjun broke the band (7 ≥ 5)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Execute the uniqueness argument in full for $a = 47$, $b = 5$: suppose $(q, r)$ and $(q\u2032, r\u2032)$ both satisfy $47 = 5q + r$ and $47 = 5q\u2032 + r\u2032$ with $0 \\le r, r\u2032 < 5$, and prove $q = q\u2032$, $r = r\u2032$.',
                  solution: [
                    'Subtract the two descriptions: $5(q - q\u2032) = r\u2032 - r$.',
                    'Case $q > q\u2032$: then $q - q\u2032 \\ge 1$, so the left side is $\u2265 5$; but $r\u2032 - r \\le 4 - 0 = 4 < 5$ — contradiction.',
                    'Case $q < q\u2032$: symmetrically $5(q\u2032 - q) \u2265 5$ while $r - r\u2032 \\le 4$ — contradiction again.',
                    'So, $q = q\u2032$; substituting back, $r = r\u2032$.',
                    'Hence the pair is unique — here $(9, 2)$, the only band-respecting description of $47 \\div 5$.',
                  ],
                  answer: 'q = q′ = 9 and r = r′ = 2 — uniqueness executed',
                },
                {
                  q: 'Foundation Mathematics banked a fingerprint: a number and its remainder on division by 9 have digit sums that agree modulo 9. Re-derive it from $a = 9q + r$.',
                  solution: [
                    'Write the division: $a = 9q + r$, so $a - r = 9q$ — the dividend minus the remainder is a multiple of $9$.',
                    'Foundation Mathematics Lesson 2.4\u2019s fingerprint says a number and its digit sum leave the same remainder on division by $9$.',
                    'Apply it to both $a$ and $r$: the digit sum of $a$ and the digit sum of $r$ differ from $a$ and $r$ by multiples of $9$.',
                    'So, digitSum($a$) − digitSum($r$) = ($a$ − multiple of 9) − ($r$ − multiple of 9) = $(a - r)$ + (multiple of 9) = $9q$ + multiple of 9 — itself a multiple of $9$.',
                    'Hence the fingerprint: e.g. $a = 3{,}894 = 9 \\cdot 432 + 6$ — digit sums $24$ and $6$, difference $18 = 2 \\cdot 9$ ✓ (the verify script swept this to $a = 400$).',
                  ],
                  answer: 'a − r = 9q ⇒ digit sums differ by a multiple of 9 (instance: 24 − 6 = 18)',
                },
                {
                  q: 'The descent existence proof used the least-number principle on the leftover set $S$. Where, precisely, would a "division" in a number system *without* well-ordering break? Illustrate with the clock numbers $\\{1, 2, \\dots, 12\\}$ where $S(12) = 1$.',
                  solution: [
                    'On the clock, subtraction can wander forever: starting from $23$ and repeatedly "subtracting 5" never reaches a bottom, because $1$ follows $12$ — the staircase curves.',
                    'The leftover set $S = \\{23 - 5q\\}$ would fail to have a least element: it circles $23, 18, 13, 8, 3, 11, 6, 1, 9, 4, 12, 7, 2, 10, 5, \\dots$ with no minimum.',
                    'The least-number principle\u2019s hypothesis — a nonempty set of naturals has a least element — is exactly what the clock violates (Lesson 1.2\u2019s exercise worked the loop).',
                    'Without the bottom step, "the least leftover" is undefined, and with it the quotient ($q$ = steps down) and the band check ($r < b$) lose their meaning.',
                    'Hence well-ordering is not a technicality but the load-bearing wall: the division algorithm is the least-number principle, spent.',
                  ],
                  answer: 'No least element on the clock ⇒ no r = min S ⇒ no q, no band',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. The division algorithm is a theorem *named after a recipe*. Write a connected account of the division between them: what the recipe (long division / repeated subtraction) does, what the theorem guarantees, and where the least-number principle enters. Close by explaining why the band $0 \\le r < b$ is the theorem\u2019s load-bearing wall — use $10 = 1 \\cdot 5 + 5 = 2 \\cdot 5 + 0$ as your witness.',
                  solution: [
                    'The recipe: repeated subtraction walks down the leftover staircase $a, a - b, a - 2b, \\dots$ until it cannot continue; long division runs the same loop place by place, compressing the walk with place value (FM 2.4).',
                    'The theorem: the walk *always* terminates with a bottom step $r$ in $0 \\le r < b$ (existence), and no other band-respecting description of the division exists (uniqueness).',
                    'The engine: termination is the least-number principle of Lesson 1.3 — a strictly-descending staircase of naturals must have a bottom; the proof takes the least leftover directly and shows $r < b$ by contradiction (one more group would find a smaller element).',
                    'The band: uniqueness\u2019s squeeze needs $|r_2 - r_1| \\le b - 1 < b$; the witness $10 = 1 \\cdot 5 + 5 = 2 \\cdot 5 + 0$ shows two descriptions coexisting the moment $r = b$ is allowed — the difference reaches magnitude $b$ and the squeeze dies.',
                    'Hence the division of labour: the recipe computes, the theorem certifies — and the certificate is bought with well-ordering plus the band, nothing else.',
                  ],
                  answer: 'Recipe computes; theorem certifies; LNP terminates the walk; the band forces uniqueness',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The division algorithm',
          latex: 'a = qb + r, \\qquad 0 \\le r < b',
          note: 'Existence and uniqueness, for every dividend $a \\ge 1$ and divisor $b \\ge 1$. The check $qb + r = a$ certifies any division.',
        },
        {
          kind: 'formula',
          name: 'Reading the remainder',
          latex: 'r = a \\bmod b, \\qquad q = \\frac{a - r}{b}',
          note: 'The unique remainder as a function of $(a, b)$; the quotient recovered from it. E.g. $23 \\bmod 5 = 3$, $q = (23 - 3)/5 = 4$.',
        },
        {
          kind: 'formula',
          name: 'The remainder band',
          latex: 'r \\in \\{0, 1, 2, \\dots, b - 1\\} \\quad (b \\text{ values})',
          note: 'Dividing by $b$ sorts the number line into $b$ slots. The band is the uniqueness proof\u2019s entire load: $|r_2 - r_1| \\le b - 1$.',
        },
        {
          kind: 'formula',
          name: 'Exact division',
          latex: 'r = 0 \\ \\Longleftrightarrow\\ a = qb \\ \\Longleftrightarrow\\ b \\text{ fits } a \\text{ exactly}',
          note: 'The remainder-zero row — the doorway to divisibility, Lesson 2.2\u2019s definition.',
        },
        {
          kind: 'para',
          text: 'One case of the theorem now stands out from the rest: $r = 0$, the exact division — five into twenty exactly, seven into ninety-eight exactly. Most divisions leave a stub; the exact ones leave nothing, and that "nothing" is a *statement about the divisor and dividend together*: the divisor fits the dividend a whole number of times. The next lesson promotes this case from an outcome to a definition — divisibility — and discovers that it has laws: an algebra of its own, transitive and combination-friendly, that will carry every later chapter from Euclid\u2019s algorithm to the fundamental theorem of arithmetic.',
        },
      ],
    },
    {
      id: 'ans-the-algebra-of-divisibility',
      number: '2.2',
      title: 'The Algebra of Divisibility',
      prerequisites: ['ans-division-with-rest-the-division-algorithm', 'fm-divisibility-and-its-tests'],
      sources: ['beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'landau-1927-elementare', 'khattar-qa-4e'],
      concepts: [
        'Divides: a | b',
        'The multiplier certificate k',
        'Measures: Euclid’s word',
        'Transitivity of divisibility',
        'Linear combinations of multiples',
        'Antisymmetry on the positives',
        'The cancellation form ac | bc',
        'The divisor lattice',
      ],
      objectives: [
        'Define $a \\mid b$ through its multiplier certificate and translate freely between divides, measures, and remainder-zero',
        'Prove and apply the laws of divisibility: transitivity, product compatibility, linear combinations, antisymmetry, and the order link',
        'Exercise the cancellation form $ac \\mid bc \\Leftrightarrow a \\mid b$ — and locate its limits with the $12 \\mid 3 \\cdot 4$ caution',
        'Read the divisor lattice of a number off its factor chains, and use it as a picture of transitivity',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 3.1 handed you a toolbox of divisibility *tests*: check the last digit for $2$, $5$ and $10$; sum the digits for $3$ and $9$; alternate signs for $11$. Excellent tools — but look at what they answer. Each one returns a yes-or-no verdict on a question like "does $9$ divide $4{,}779$?" while never saying what *divides* means. The verb was left undefined, and the verdicts were certified case by case. This lesson fixes the noun. Divisibility becomes a *relation* — a sentence $a \\mid b$ that is true or false about a pair of numbers — and relations, unlike verbs, have laws. By the end of the lesson you will own six of them, each proved from Lesson 2.1\u2019s theorem, and a picture — the divisor lattice — in which the laws become visible as paths.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Divides',
          text: 'A natural number $a \\ge 1$ is said to **divide** a natural number $b$ — written $a \\mid b$ — when $b$ is $a$ times some whole number: $a \\mid b \\Longleftrightarrow b = ak$ for some whole $k$. The number $k$ is the **multiplier** — the certificate of the division. When no such $k$ exists we write $a \\nmid b$. Euclid, in Book VII of the *Elements*, says the same thing in one word: $a$ **measures** $b$ — the lesser number laid out along the greater a whole number of times, as a ruler measures a wall.',
        },
        {
          kind: 'para',
          text: 'One convention, flagged honestly: the multiplier $k$ is allowed to be $0$ (a whole number, though $0$ is not a natural in this book — Chapter 6 builds it). That single concession makes $a \\mid 0$ true for every $a$ — zero is $a$ times nothing — and it is the standard convention, adopted because it makes the laws below come out clean. Note also what the definition does *not* say: nothing about $b$ being bigger. Indeed $b = ak$ with $k = 0$ gives $b = 0$, and with $k = 1$ gives $b = a$ — a number divides itself, and every number is measured by $1$. The small cases are part of the relation, not exceptions to it. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$6 \\mid 42$ — because $42 = 6 \\cdot 7$; the certificate is $k = 7$, and checking it is one multiplication.',
            '$6 \\nmid 44$ — because no $k$ works: $44 = 6 \\cdot 7 + 2$, and Lesson 2.1\u2019s uniqueness theorem certifies that the remainder $2$ is the *only* remainder $44$ can have on division by $6$. The verdict needs no search.',
            '$1 \\mid n$ for every $n$ — the certificate is $k = n$ itself: $n = 1 \\cdot n$. One measures everything.',
            '$n \\mid 0$ for every $n$ — the certificate is $k = 0$: $0 = n \\cdot 0$. Zero is measured by everything (the flagged convention).',
          ],
        },
        {
          kind: 'para',
          text: 'The second bullet is the bridge from Lesson 2.1, and it is worth promoting to a proof before the laws begin. The division algorithm said every division has a unique remainder in the band; "divides" is precisely the statement that the remainder lands on the one special value $0$.',
        },
        {
          kind: 'derivation',
          title: 'The bridge: dividing is remaindering to zero',
          statement:
            'Claim: for $a \\ge 1$ and $b \\ge 1$, $a \\mid b$ if and only if the remainder of $b$ on division by $a$ is $0$. The proof uses the division algorithm\u2019s existence half for one direction and its uniqueness half for the other.',
          steps: [
            {
              label: 'Forward: a certificate forces the zero remainder',
              formula: 'b = ak \\ \\Rightarrow\\ b = qa + r \\text{ with } q = k,\\ r = 0',
              explanation:
                'Suppose $a \\mid b$, say $b = ak$. The pair $(k, 0)$ satisfies $b = ka + 0$ with $0 \\le 0 < a$ — a valid quotient–remainder pair. By *uniqueness* of the pair (Lesson 2.1), it is the pair: the division of $b$ by $a$ has remainder $0$. (This is where the theorem of the previous lesson pays out: without uniqueness, "a description with remainder 0" would not force "the description has remainder 0".)',
            },
            {
              label: 'Backward: the zero remainder produces a certificate',
              formula: 'b = qa + 0 \\ \\Rightarrow\\ b = qa \\ \\Rightarrow\\ a \\mid b,\\ k = q',
              explanation:
                'Conversely suppose the division of $b$ by $a$ leaves remainder $0$: the division algorithm returns $b = qa + 0 = qa$. Rearranged, $b = a \\cdot q$ — the defining shape of $a \\mid b$, with certificate $k = q$.',
            },
          ],
          result: '$a \\mid b \\ \\Longleftrightarrow\\ (b \\bmod a) = 0$ — the relation and the remainder-zero row of the division algorithm are one fact in two dresses.',
        },
        {
          kind: 'para',
          text: 'With the bridge in place, verdicts are mechanical: to test whether $a$ divides $b$, divide and look at the remainder. And Foundation Mathematics\u2019s tests — digit sums, last digits — are now what they always claimed to be: shortcuts that predict the remainder without running the division. (Why the shortcuts themselves work is Chapter 5\u2019s business; this book re-derives every one of them.) Meanwhile the *multiplier* $k$ is more than a certificate — it is a coordinate. Knowing $42 = 6 \\cdot 7$ does not just prove $6 \\mid 42$; it hands you the number $7$, and the laws below are all statements about how certificates combine.',
        },
        {
          kind: 'example',
          title: 'The verdict factory: does $8$ divide $3{,}368$?',
          steps: [
            'Ask the certificate question: is there a whole $k$ with $3{,}368 = 8k$?',
            'Divide it out: $3{,}368 \\div 8 = 421$ exactly — the long-division loop of FM 2.4, or the certificate directly: $8 \\cdot 421 = 3{,}368$.',
            'So, $k = 421$ is the certificate: $8 \\mid 3{,}368$.',
            'Cross-check with FM 3.1\u2019s shortcut: $8$ divides a number exactly when it divides the last three digits — and $368 = 8 \\cdot 46$ ✓. Two routes, one verdict, as the bridge predicts.',
            'Hence $8 \\mid 3{,}368$, certificate $k = 421$ — and the remainder route agrees: $3{,}368 \\bmod 8 = 0$.',
          ],
        },
        { kind: 'heading', text: 'The laws of the relation' },
        {
          kind: 'para',
          text: 'A relation worth its name obeys laws. Divisibility obeys six, and every one of them is a short argument about multipliers. State them together first — this is the "properties of…" list the whole algebra hangs from — then prove the three that carry real content, exercise the rest, and close with the caution that shows where the laws *stop*.',
        },
        {
          kind: 'list',
          items: [
            '**Reflexivity** — every number divides itself: $a \\mid a$ (certificate $k = 1$). Instance: $6 \\mid 6$.',
            '**The extremes** — $1 \\mid a$ for every $a$ (certificate $k = a$), and $a \\mid 0$ for every $a$ (certificate $k = 0$, the flagged convention). Instance: $47 = 1 \\cdot 47$; $0 = 9 \\cdot 0$.',
            '**Transitivity** — a divisor of a divisor is a divisor: if $a \\mid b$ and $b \\mid c$, then $a \\mid c$. Instance: $3 \\mid 12$ and $12 \\mid 60$, so $3 \\mid 60$ (certificate $20$).',
            '**Product compatibility** — multiplying the multiple changes nothing: if $a \\mid b$, then $a \\mid bc$ for every natural $c$. Instance: $7 \\mid 21$, so $7 \\mid 105$ (certificate $15 = 3 \\cdot 5$).',
            '**Linear combinations** — sums and differences of multiples are multiples: if $a \\mid b$ and $a \\mid c$, then $a \\mid (bx + cy)$ for all whole $x, y$ (differences taken only when $bx \\ge cy$, so the result stays a natural). Instance: $6 \\mid 54$ and $6 \\mid 30$, so $6 \\mid 84$, $6 \\mid 24$, and $6 \\mid 222$ — the last from $3 \\cdot 54 + 2 \\cdot 30$.',
            '**Antisymmetry on the positives** — mutual division forces equality: if $a \\mid b$ and $b \\mid a$ with $a, b \\ge 1$, then $a = b$. Instance: $12 \\mid 12$ both ways; but $4 \\mid 12$ while $12 \\nmid 4$ — the arrow does not bend back.',
          ],
        },
        {
          kind: 'derivation',
          title: 'Transitivity: certificates multiply',
          statement:
            'Claim: if $a \\mid b$ and $b \\mid c$ (with $a, b, c \\ge 1$), then $a \\mid c$. The proof is the certificate law of this lesson: compose the two certificates and watch a product appear.',
          steps: [
            {
              label: 'Name both certificates',
              formula: 'b = ak, \\qquad c = bm \\quad (k, m \\text{ whole})',
              explanation:
                'The two hypotheses, unwrapped by the definition: $b$ is $a$ times something, $c$ is $b$ times something.',
            },
            {
              label: 'Substitute the first into the second',
              formula: 'c = (ak)m = a(km)',
              explanation:
                'Replace $b$ in the second equation by its value from the first. The regrouping $(ak)m = a(km)$ is associativity of multiplication — provable by the same induction programme that proved Lesson 1.3\u2019s shift and shuffle laws; we lean on it as the engine\u2019s own working rule, exactly as that lesson\u2019s closing note licensed.',
            },
            {
              label: 'Read off the certificate',
              formula: 'c = a \\cdot (km) \\ \\Rightarrow\\ a \\mid c, \\quad \\text{certificate } km',
              explanation:
                'The product $km$ is a whole number, so the definition of divides is met with certificate $k \\cdot m$. The composed certificate is literally the product of the two given ones — transitivity is the associative law wearing a divisibility badge.',
            },
          ],
          result: '$a \\mid b \\wedge b \\mid c \\ \\Rightarrow\\ a \\mid c$, with certificate $k \\cdot m$ — divisorhood travels along chains.',
        },
        {
          kind: 'para',
          text: 'The certificate bookkeeping is worth a second look, because it *computes*: $3 \\mid 12$ with certificate $4$, and $12 \\mid 60$ with certificate $5$ — so $3 \\mid 60$ with certificate $4 \\times 5 = 20$, and indeed $60 = 3 \\cdot 20$. The same run gives $4 \\mid 20$ and $20 \\mid 100$, hence $4 \\mid 100$ with certificate $5 \\times 5 = 25$; $8 \\mid 24$ and $24 \\mid 96$, hence $8 \\mid 96$ with certificate $3 \\times 4 = 12$. Transitivity is not just true — it is *effective*: the proof hands you the new certificate for free. That effectiveness is what makes divisibility chains a computational device and not merely a slogan.',
        },
        {
          kind: 'derivation',
          title: 'Linear combinations: the closure law',
          statement:
            'Claim: if $a \\mid b$ and $a \\mid c$, then $a \\mid (bx + cy)$ for all whole numbers $x, y$ — and $a \\mid (bx - cy)$ whenever $bx \\ge cy$ (so the result is a natural). This is the law that turns divisibility from a verdict into an algebra.',
          steps: [
            {
              label: 'Name the two certificates',
              formula: 'b = ak, \\qquad c = am',
              explanation:
                'Again the hypotheses, unwrapped.',
            },
            {
              label: 'Expand the combination',
              formula: 'bx + cy = (ak)x + (am)y',
              explanation:
                'Substitute both certificates into the combination $bx + cy$.',
            },
            {
              label: 'Factor a out',
              formula: 'bx + cy = a(kx + my)',
              explanation:
                'Distribution — a theorem since Lesson 1.3 — pulls the common factor $a$ through both products. The bracket $kx + my$ is a whole number because products and sums of whole numbers are whole numbers.',
            },
            {
              label: 'Read off the certificate — and handle differences honestly',
              formula: 'a \\mid (bx + cy), \\quad \\text{certificate } kx + my; \\qquad a \\mid (bx - cy), \\quad \\text{certificate } kx - my \\ (\\ge 0)',
              explanation:
                'For sums, the definition is met directly. For differences, the same factorization reads $bx - cy = a(kx - my)$; the certificate $kx - my$ is a whole number precisely when $bx \\ge cy$ — the stated caveat. The caveat is why this book states the law for naturals now and lets Chapter 6\u2019s integers remove it.',
            },
          ],
          result: 'Multiples of $a$ are closed under whole-number sums and (nonnegative) differences — $a \\mid (bx + cy)$ with certificate $kx + my$.',
        },
        {
          kind: 'example',
          title: 'Working the combination law: $8 \\mid 96$ and $8 \\mid 40$',
          steps: [
            'Name the certificates: $96 = 8 \\cdot 12$ and $40 = 8 \\cdot 5$.',
            'Sum them: $96 + 40 = 136 = 8 \\cdot (12 + 5) = 8 \\cdot 17$ — so $8 \\mid 136$, certificate $17$.',
            'Subtract them (the large from the small is legal since $96 \\ge 40$): $96 - 40 = 56 = 8 \\cdot (12 - 5) = 8 \\cdot 7$ — so $8 \\mid 56$, certificate $7$.',
            'Weight them: $3 \\cdot 96 + 40 = 288 + 40 = 328 = 8 \\cdot (3 \\cdot 12 + 5) = 8 \\cdot 41$ — so $8 \\mid 328$, certificate $41$.',
            'Hence three new divisibility facts, each certified, none requiring any new division to be run — the combination law manufactured them from two certificates.',
          ],
        },
        {
          kind: 'para',
          text: 'Two more laws finish the list, and they both live in the tension between the divisor and the multiple. The **order link**: if $a \\mid b$ with $b \\ge 1$, then $a \\le b$. For $b = ak$ with $k \\ge 1$ (the certificate cannot be $0$ here — that would force $b = 0$), so $b$ is $a$ laid out $k$ times at least once: $b \\ge a$. A positive divisor never exceeds its multiple — divisibility is a refinement of the order you met in Lesson 1.1, and it explains why the divisor lattice below climbs upward. The **antisymmetry** already stated is its converse-flavoured twin, and it needs one more tool: cancellation.',
        },
        {
          kind: 'derivation',
          title: 'Cancellation and antisymmetry',
          statement:
            'Claim (cancellation): if $cx = cy$ with $c \\ge 1$, then $x = y$. Claim (antisymmetry): if $a \\mid b$ and $b \\mid a$ with $a, b \\ge 1$, then $a = b$.',
          steps: [
            {
              label: 'Prove cancellation from order',
              formula: 'x < y \\ \\Rightarrow\\ cx < cy, \\qquad y < x \\ \\Rightarrow\\ cy < cx',
              explanation:
                'If $x < y$, write the run: $y = x + s$ for some $s \\ge 1$ (the run-length language of Lesson 1.1, in borrowed notation). Then $cy = (x + s)c = xc + sc$ by distribution, and $sc \\ge c \\ge 1$, so $cy > cx$. The mirror case is identical. Trichotomy (Lesson 1.1) leaves one possibility: $x = y$.',
            },
            {
              label: 'Unwrap mutual division',
              formula: 'b = ak, \\qquad a = bm \\ \\Rightarrow\\ a = (ak)m = a(km)',
              explanation:
                'Substitute the first certificate into the second, as in the transitivity proof: $a$ equals $a$ times $km$.',
            },
            {
              label: 'Cancel a and solve km = 1',
              formula: 'a(km) = a \\cdot 1 \\ \\Rightarrow\\ km = 1 \\ \\Rightarrow\\ k = m = 1',
              explanation:
                'Cancellation (step 1, with $x = km$ and $y = 1$) strips the common factor $a$. But $k$ and $m$ are naturals, and the only natural product equal to $1$ is $1 \\times 1$ — the smallest certificates that exist. (If either were $\u2265 2$, the product would be $\u2265 2$.)',
            },
            {
              label: 'Conclude',
              formula: 'k = 1 \\ \\Rightarrow\\ b = ak = a',
              explanation:
                'With certificate $k = 1$, the two numbers coincide. Mutual measurement is equality — the divisibility arrow, on positive naturals, never bends back.',
            },
          ],
          result: 'Cancellation holds on the naturals; antisymmetry follows: $a \\mid b \\wedge b \\mid a \\wedge a, b \\ge 1 \\Rightarrow a = b$.',
        },
        {
          kind: 'para',
          text: 'The positivity clause is doing real work, and it is worth one honest sentence: without it, the extreme case $0 \\mid 0$ (true, under the whole-multiplier convention, with *every* $k$ a certificate) would meet "divides and is divided by" trivially, and the tidy identification of mutual division with equality would need restating. On the positive naturals — this book\u2019s home ground until Chapter 6 — the law is exactly as stated, and the instance $4 \\mid 12$, $12 \\nmid 4$ shows the one-way street in action.',
        },
        {
          kind: 'example',
          title: 'The caution: products climb, they do not climb down',
          steps: [
            'Product compatibility says $a \\mid b \\Rightarrow a \\mid bc$. Does divisibility of a *product* force divisibility of the *factors*? Test the smallest suspicious case.',
            'Take $12 \\mid 3 \\cdot 4$: true — $3 \\cdot 4 = 12 = 12 \\cdot 1$, certificate $k = 1$.',
            'Now interrogate the factors: does $12 \\mid 3$? No — $3 = 12 \\cdot 0 + 3$, remainder $3 \\ne 0$. Does $12 \\mid 4$? No — remainder $4$.',
            'So, $12$ divides the product $3 \\cdot 4$ while dividing neither factor: the climb-down fails in general.',
            'Hence the caution: $a \\mid bc$ licenses no conclusion about $a$ versus $b$ or $c$ *alone* — unless something extra is known about $a$ (primality, in Chapter 4\u2019s Euclid lemma; coprimality, via Bézout in Lesson 2.3). What *is* legal is cancelling a common factor from both sides: $45 \\mid 225$ if and only if $9 \\mid 45$ if and only if $5 \\mid 25$ — each true, each the same fact divided through by $5$, the cancellation form proved in the next paragraph.',
          ],
        },
        {
          kind: 'para',
          text: 'The cancellation form deserves its own line, since it is the legal version of the climb-down: for $c \\ge 1$, $ac \\mid bc \\Longleftrightarrow a \\mid b$. Forward: $bc = (ac)k = a(ck)$, so $b = a(ck)$ after cancelling the $c$ — certificate $ck$. Backward: $b = ak$ gives $bc = a(ck) = (ac)k$ — certificate $k$ (reading $ac$ as the divisor). One fact, two directions, both running on cancellation. Instance: $3 \\mid 21 \\Longleftrightarrow 6 \\mid 42$ — both true; and $3 \\nmid 22 \\Longleftrightarrow 6 \\nmid 44$ — both false, exactly as the equivalence demands.',
        },
        {
          kind: 'figure',
          caption:
            'The divisor lattice of 12. Each circle is a divisor of 12; each arrow multiplies by its label (×2 or ×3), so an arrow a → b means a divides b with nothing strictly between (there is no natural strictly between a and b that both divides and is divided). Every path from 1 upward is a factor chain — 1 → 2 → 6 → 12 reads 12 = 2·2·3 through 6 — and transitivity is the statement that arrows compose: any two-step path certifies the skip it implies (2 → 6 → 12 certifies 2 | 12, though the skip edge is deliberately not drawn). The lattice is the lesson\u2019s algebra as a map: chains are transitivity, the two routes to 6 (2·3 and 3·2) foreshadow unique factorisation, and 12\u2019s six divisors are exactly the nodes.',
          svg: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Divisor lattice of 12: nodes 1, 2, 3, 4, 6, 12 with arrows multiplying by 2 or 3">
  <defs>
    <marker id="lat-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <text x="240" y="312" font-size="12.5" fill="currentColor" opacity="0.8" text-anchor="middle">every arrow multiplies — every path from 1 upward is a factor chain of 12</text>
  <!-- edges (rim-trimmed, arrowheads at the multiple) -->
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="227.3" y1="255.2" x2="142.7" y2="189.8" marker-end="url(#lat-arrow)"/>
    <line x1="252.7" y1="255.2" x2="337.3" y2="189.8" marker-end="url(#lat-arrow)"/>
    <line x1="126.3" y1="164.4" x2="113.7" y2="110.6" marker-end="url(#lat-arrow)"/>
    <line x1="142.7" y1="164.4" x2="227.3" y2="105.6" marker-end="url(#lat-arrow)"/>
    <line x1="337.3" y1="164.4" x2="252.7" y2="105.6" marker-end="url(#lat-arrow)"/>
    <line x1="124.1" y1="87.4" x2="225.9" y2="32.6" marker-end="url(#lat-arrow)"/>
    <line x1="240" y1="79" x2="240" y2="41" marker-end="url(#lat-arrow)"/>
  </g>
  <!-- edge multiplier labels -->
  <g font-size="12" fill="currentColor" text-anchor="middle" opacity="0.9">
    <text x="193.6" y="211.4">×2</text>
    <text x="303.6" y="233.6">×3</text>
    <text x="133.6" y="134.3">×2</text>
    <text x="193.6" y="148.6">×3</text>
    <text x="303.6" y="126.4">×2</text>
    <text x="181.6" y="72.3">×3</text>
    <text x="254" y="60">×2</text>
  </g>
  <!-- nodes -->
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <circle cx="240" cy="265" r="16"/>
    <circle cx="130" cy="180" r="16"/>
    <circle cx="350" cy="180" r="16"/>
    <circle cx="110" cy="95" r="16"/>
    <circle cx="240" cy="95" r="16"/>
    <circle cx="240" cy="25" r="16"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle" font-weight="700">
    <text x="240" y="269.5">1</text>
    <text x="130" y="184.5">2</text>
    <text x="350" y="184.5">3</text>
    <text x="110" y="99.5">4</text>
    <text x="240" y="99.5">6</text>
    <text x="240" y="29.5">12</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the laws back off the picture. Transitivity is "arrows compose": the two-step path $2 \\to 6 \\to 12$ certifies $2 \\mid 12$ with composed certificate $3 \\times 2 = 6$. The order link is the *vertical*: every arrow climbs, so no path descends, and $1$ — which divides everything — sits at the bottom while $12$ sits at the top. The divisor count is the node count: twelve\u2019s divisors are exactly $1, 2, 3, 4, 6, 12$ — six of them, each reachable from $1$ by some arrow path. And the two distinct routes from $1$ to $12$ — through $2$ then $6$, or through $3$ then $6$… and the four-step paths $1 \\to 2 \\to 4 \\to 12$ and $1 \\to 3 \\to 6 \\to 12$ — all describe the *same* prime content $2 \\cdot 2 \\cdot 3$ in different orders. That every route to the top carries the same cargo is the fundamental theorem of arithmetic, Chapter 4\u2019s summit, reached there through Bézout\u2019s identity — the business of the very next lesson.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The bar, the word, and the later generalization',
          text: 'Euclid needed no symbol: Book VII\u2019s Definitions 3–5 say a lesser number *measures* a greater when the greater is a multiple of it — the definition this lesson formalised — and his propositions VII.1–2 run the subtraction process to find the greatest common measure, the subject of Lesson 2.3. The vertical bar $a \\mid b$ is twentieth-century. It appears in Hardy\u2019s unpublished 1925 number-theory seminar notes (in reference to Pólya\u2019s work, per the historical record kept by Tattersall), and Edmund Landau\u2019s *Elementary Number Theory* of 1927 used it in print — the usage that stuck, through Landau\u2019s later books, into every modern text. The deeper generalization came two centuries earlier: Gauss\u2019s *Disquisitiones arithmeticae* (1801) introduced $a \\equiv b \\pmod m$ — congruence, the arithmetic of the remainder slots this lesson\u2019s bridge points toward — with the symbol \u2261 announced in the book\u2019s second article. Chapter 5 walks through that door; the bar and the double-bar are, respectively, its yes/no shadow and its full algebra.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'The algebra of divisibility is examined mostly through its laws rather than its definition. Bank favourites: fill-the-multiplier items ($12 = 3 \\times k$, $91 = 7 \\times k$, $144 = 12 \\times k$ — Exercises L2); transitivity chains arranged as "which must be true" MCQs ($4 \\mid 20$ and $20 \\mid 100$ force $4 \\mid 100$); sum/difference divisibility — if $9 \\mid a$ and $9 \\mid b$, then $9 \\mid a + b$ and $9 \\mid a - b$, the combination law verbatim; divisor-counting (the divisors of $36$ — Exercise L1); and the trap variant of the caution: options asserting that a divisor of a product divides a factor, refuted by $12 \\mid 3 \\cdot 4$ with $12 \\nmid 3$, $12 \\nmid 4$. The cancellation form $ac \\mid bc \\Leftrightarrow a \\mid b$ appears in reduction dress — it is the reason cancelling a common factor preserves divisibility — and will reappear as the engine of fraction work in FM 4\u2019s cross-referenced lessons. Shapes cited from SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical patterns; no question reproduced.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Divides (a | b)',
              def: '$a \\mid b$ when $b = ak$ for some whole number $k$ — the multiplier is the certificate. Equivalent, by the bridge, to: the remainder of $b \\div a$ is $0$.',
            },
            {
              term: 'Measures',
              def: 'Euclid\u2019s word (Elements VII, Definitions 3–5) for divides: the lesser number laid along the greater a whole number of times. "a measures b" = "a | b".',
            },
            {
              term: 'Multiplier',
              def: 'The whole number $k$ in $b = ak$ — the certificate that $a \\mid b$. Certificates compose: transitivity multiplies them; linear combinations form $kx + my$.',
            },
            {
              term: 'Factor',
              def: 'Foundation Mathematics\u2019s word for a divisor in a product dressing: $a$ is a factor of $b$ when $a \\mid b$. FM 3.1\u2019s tests find factors; this lesson gives factors laws.',
            },
            {
              term: 'Transitivity of divisibility',
              def: '$a \\mid b \\wedge b \\mid c \\Rightarrow a \\mid c$, with composed certificate $km$. Divisorhood travels along chains — arrows compose in the divisor lattice.',
            },
            {
              term: 'Linear combination',
              def: 'An expression $bx + cy$ (whole $x, y$). The closure law: $a \\mid b$ and $a \\mid c$ force $a \\mid (bx + cy)$, certificate $kx + my$ — differences when $bx \\ge cy$.',
            },
            {
              term: 'Antisymmetry',
              def: '$a \\mid b \\wedge b \\mid a \\wedge a, b \\ge 1 \\Rightarrow a = b$. Mutual measurement is equality — proved by cancellation reducing $km$ to $1$.',
            },
            {
              term: 'Divisor lattice',
              def: 'The picture of a number\u2019s divisors with arrows multiplying by primes (for 12: by 2 or 3). Paths are factor chains; transitivity is arrow-composition; the node count is the divisor count.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Why does $6 \\mid 42$ hold?',
              options: ['because $42 = 6 \\cdot 7 + 2$', 'because $42 = 6 \\cdot 7$ — certificate $k = 7$', 'because 42 is even', 'because $6 \\mid 7$'],
              answer: 1,
              explain:
                'The definition demands a certificate: $42 = 6 \\cdot 7$. Option (a) describes $44$, not $42$ — and its remainder $2 \\ne 0$ is exactly why $6 \\nmid 44$. Option (c) is FM\u2019s test for a *different* divisor ($2 \\mid 42$ ✓ but irrelevant to 6). Option (d) is backwards — $6 \\nmid 7$; the smaller number is the divisor.',
            },
            {
              q: 'Which statement is true?',
              options: [
                '$12 \\mid 3 \\cdot 4$ forces $12 \\mid 3$',
                '$12 \\mid 3 \\cdot 4$ forces $12 \\mid 4$',
                '$12 \\mid 3 \\cdot 4$ even though $12$ divides neither $3$ nor $4$',
                '$12 \\nmid 12$',
              ],
              answer: 2,
              explain:
                'The caution, exactly: $3 \\cdot 4 = 12$ is divisible by 12, yet $3 = 12 \\cdot 0 + 3$ and $4 = 12 \\cdot 0 + 4$ — neither factor is. Products climb; they do not climb down (a licensed climb-down needs coprimality — Lesson 2.3 — or primality — Chapter 4). Option (d) is nonsense: reflexivity gives $12 \\mid 12$ with certificate 1.',
            },
            {
              q: 'If $a \\mid b$ and $b \\mid a$ with $a, b \\ge 1$, what follows?',
              options: ['$a = b$', '$a < b$', '$a + b = 1$', 'nothing — divisibility is one-way'],
              answer: 0,
              explain:
                'Antisymmetry: $b = ak$ and $a = bm$ give $a = a(km)$, cancellation forces $km = 1$, and the only natural certificates are $k = m = 1$ — so $a = b$. The one-way street bends back only at identity.',
            },
            {
              q: 'The bridge to Lesson 2.1: $a \\mid b$ exactly when the remainder of $b \\div a$ equals:',
              options: ['$1$', '$0$', '$a - 1$', 'the quotient'],
              answer: 1,
              explain:
                'The bridge: a certificate forces the unique remainder to be $0$ (uniqueness!), and a zero remainder hands back a certificate. Option (c), $a - 1$, is the *largest* legal remainder — the opposite corner of the band from exact division.',
            },
            {
              q: 'Given $8 \\mid 96$ and $8 \\mid 40$, which number must $8$ divide?',
              options: ['139', '141', '136', '143'],
              answer: 2,
              explain:
                'The combination law: $96 + 40 = 136 = 8 \\cdot 17$ — a sum of multiples is a multiple. The distractors are remainders-traps: $139 = 8 \\cdot 17 + 3$, $141 = 8 \\cdot 17 + 5$, $143 = 8 \\cdot 17 + 7$ — none is forced by the two hypotheses, and none is even a multiple of 8.',
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
                  q: 'Decide, with certificates: does $7 \\mid 56$? Does $9 \\mid 73$?',
                  solution: [
                    'Certificate hunt for the first: $7 \\cdot 8 = 56$ — yes, $k = 8$; so $7 \\mid 56$.',
                    'Second: divide it out — $73 = 9 \\cdot 8 + 1$ (band-checked, $1 < 9$).',
                    'The remainder is $1 \\ne 0$; by the bridge, no certificate exists.',
                    'Hence $7 \\mid 56$ (k = 8) but $9 \\nmid 73$.',
                  ],
                  answer: '7 | 56 (k = 8); 9 ∤ 73 (73 = 8·9 + 1)',
                },
                {
                  q: 'List all divisors of $36$, and count them.',
                  solution: [
                    'Hunt certificates pair by pair: $1 \\cdot 36$, $2 \\cdot 18$, $3 \\cdot 12$, $4 \\cdot 9$, $6 \\cdot 6$ — every factorisation of 36.',
                    'The left factors are the divisors: $1, 2, 3, 4, 6$ — and by antisymmetry\u2019s mirror, the right factors add $9, 12, 18, 36$.',
                    'So, the complete list: $1, 2, 3, 4, 6, 9, 12, 18, 36$.',
                    'Hence nine divisors — the node count of 36\u2019s lattice.',
                  ],
                  answer: '1, 2, 3, 4, 6, 9, 12, 18, 36 — nine divisors',
                },
                {
                  q: 'Fill the multipliers: $12 = 3 \\cdot k$, $91 = 7 \\cdot k$, $144 = 12 \\cdot k$.',
                  solution: [
                    'First: $k = 12 / 3 = 4$ — check $3 \\cdot 4 = 12$ ✓.',
                    'Second: $k = 91 / 7 = 13$ — check $7 \\cdot 13 = 91$ ✓.',
                    'Third: $k = 144 / 12 = 12$ — check $12 \\cdot 12 = 144$ ✓.',
                    'Hence $k = 4$, $13$, $12$ — each a certificate for the divisibility stated.',
                  ],
                  answer: 'k = 4; k = 13; k = 12',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Given $4 \\mid 20$ and $20 \\mid 100$, conclude $4 \\mid 100$ by transitivity — and identify the composed certificate.',
                  solution: [
                    'Name the certificates: $20 = 4 \\cdot 5$ and $100 = 20 \\cdot 5$.',
                    'Substitute: $100 = (4 \\cdot 5) \\cdot 5 = 4 \\cdot (5 \\cdot 5)$ — associativity regroups.',
                    'So, $100 = 4 \\cdot 25$: transitivity holds with composed certificate $5 \\times 5 = 25$.',
                    'Hence $4 \\mid 100$ — the proof of the law, executed on one chain.',
                  ],
                  answer: '4 | 100 with composed certificate 25',
                },
                {
                  q: 'Use the combination law: given $14 \\mid 98$ and $14 \\mid 42$, certify $14 \\mid 140$ and $14 \\mid 56$.',
                  solution: [
                    'Certificates: $98 = 14 \\cdot 7$ and $42 = 14 \\cdot 3$.',
                    'Sum: $98 + 42 = 140 = 14 \\cdot (7 + 3) = 14 \\cdot 10$ — so $14 \\mid 140$, certificate $10$.',
                    'Difference ($98 \\ge 42$, legal): $98 - 42 = 56 = 14 \\cdot (7 - 3) = 14 \\cdot 4$ — so $14 \\mid 56$, certificate $4$.',
                    'Hence both certify — no new division was run; the law manufactured the facts.',
                  ],
                  answer: '14 | 140 (k = 10); 14 | 56 (k = 4)',
                },
                {
                  q: 'Show that $2 \\mid 6$ and $6 \\mid 120$, then conclude $2 \\mid 120$ two ways — by transitivity, and by the certificate product.',
                  solution: [
                    'Certificates: $6 = 2 \\cdot 3$ and $120 = 6 \\cdot 20$.',
                    'Way one (the law): transitivity applies verbatim — $2 \\mid 6$, $6 \\mid 120$, so $2 \\mid 120$.',
                    'Way two (the bookkeeping): the composed certificate is $3 \\times 20 = 60$, and indeed $120 = 2 \\cdot 60$.',
                    'Hence $2 \\mid 120$ — the law and its bookkeeping agree, as they must: transitivity *is* certificate multiplication.',
                  ],
                  answer: '2 | 120 with composed certificate 60',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove that $1 \\mid n$ for every natural $n$, and that $n \\mid 0$ for every natural $n$ (state the convention you use).',
                  solution: [
                    'First claim: take $k = n$. Then $1 \\cdot k = 1 \\cdot n = n$, so the definition of $1 \\mid n$ is met with certificate $n$.',
                    'Second claim: the certificate must be a whole number, and $k = 0$ is whole (the flagged convention — $0$ is not a natural, but multipliers may be).',
                    'Then $n \\cdot 0 = 0$, so the definition of $n \\mid 0$ is met with certificate $0$.',
                    'Hence $1$ measures everything (Euclid\u2019s unit, the universal ruler) and everything measures $0$ — the two extremes of the lattice\u2019s floor.',
                  ],
                  answer: '1 | n (k = n); n | 0 (k = 0, whole-number convention)',
                },
                {
                  q: 'Use the bridge to settle $7 \\mid 3{,}431$ without hunting for a certificate.',
                  solution: [
                    'Run the division once: $3{,}431 = 7 \\cdot 490 + 1$ — check the rebuild $7 \\cdot 490 = 3{,}430$, plus $1$ is $3{,}431$ ✓, band $0 \\le 1 < 7$ ✓.',
                    'By uniqueness (Lesson 2.1), that remainder $1$ is the only one $3{,}431$ can have on division by $7$.',
                    'The bridge needs remainder $0$; we have $1$.',
                    'Hence $7 \\nmid 3{,}431$ — one division, one glance at the band, verdict settled.',
                  ],
                  answer: '7 ∤ 3,431 (remainder 1 ≠ 0)',
                },
                {
                  q: 'A number\u2019s divisors never exceed it (the order link). Prove it, and exhibit where the proof uses $b \\ge 1$.',
                  solution: [
                    'Let $a \\mid b$ with $b \\ge 1$: then $b = ak$ for some whole $k$.',
                    'The certificate cannot be $0$: that would force $b = 0$, contradicting $b \\ge 1$. So $k \\ge 1$.',
                    'Then $b = ak$ is $a$ laid out $k$ times, at least once — so $b \\ge a$ (the run from $a$ to $b$ is $b - a = a(k - 1) \\ge 0$ in borrowed notation).',
                    'The $b \\ge 1$ hypothesis is exactly what killed $k = 0$; without it, $0 = a \\cdot 0$ would make "$a$ divides $0$" an exception — the divisor $a$ can exceed its multiple $0$.',
                    'Hence a positive divisor never exceeds its positive multiple — the lattice only climbs.',
                  ],
                  answer: 'b = ak, k ≥ 1 ⇒ b ≥ a; the hypothesis excludes the k = 0 case',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Given $8 \\mid 96$ and $8 \\mid 40$, certify $8 \\mid 136$, $8 \\mid 56$, and $8 \\mid 328$ — one of them by the weighted combination $3 \\cdot 96 + 40$.',
                  solution: [
                    'Certificates: $96 = 8 \\cdot 12$, $40 = 8 \\cdot 5$.',
                    'Sum: $136 = 96 + 40 = 8 \\cdot (12 + 5) = 8 \\cdot 17$ — certificate $17$.',
                    'Difference: $56 = 96 - 40 = 8 \\cdot (12 - 5) = 8 \\cdot 7$ — certificate $7$ (legal: $96 \\ge 40$).',
                    'Weighted: $328 = 3 \\cdot 96 + 40 = 8 \\cdot (3 \\cdot 12 + 5) = 8 \\cdot (36 + 5) = 8 \\cdot 41$ — certificate $41$; the arithmetic $288 + 40 = 328$ confirms.',
                    'Hence all three divide — sums, differences and weights of multiples stay multiples.',
                  ],
                  answer: '8 | 136 (17); 8 | 56 (7); 8 | 328 (41)',
                },
                {
                  q: 'Suppose $b \\mid 18$ and $18 \\mid b$ with $b \\ge 1$. Prove $b = 18$ without computing any division.',
                  solution: [
                    'Unwrap the mutual division: $18 = bk$ and $b = 18m$ for whole $k, m$.',
                    'Substitute: $18 = (18m)k = 18(mk)$ — associativity regroups.',
                    'Cancel the $18$ (cancellation: $18mk = 18 \\cdot 1$ forces $mk = 1$).',
                    'The only natural solution of $mk = 1$ is $k = m = 1$ — any factor $\u2265 2$ pushes the product $\u2265 2$.',
                    'Hence $k = 1$, so $b = 18 \\cdot 1 = 18$: antisymmetry, executed with zero divisions.',
                  ],
                  answer: 'b = 18 (km = 1 forces k = m = 1)',
                },
                {
                  q: 'Prove the cancellation form: for $c \\ge 1$, $ac \\mid bc \\Longleftrightarrow a \\mid b$. Then verify it on $a = 3$, $b = 21$, $c = 2$ — and on the false pair $a = 3$, $b = 22$, $c = 2$.',
                  solution: [
                    'Forward: $ac \\mid bc$ means $bc = (ac)k = a(ck)$; cancelling $c$ ($c \\ge 1$, cancellation proved this lesson) gives $b = a(ck)$ — so $a \\mid b$, certificate $ck$.',
                    'Backward: $a \\mid b$ means $b = ak$; then $bc = a(ck) = (ac)k$ — so $ac \\mid bc$, certificate $k$.',
                    'True instance: $3 \\mid 21$ ✓ ($21 = 3 \\cdot 7$), and indeed $6 \\mid 42$ ✓ ($42 = 6 \\cdot 7$) — the certificate survived the scaling.',
                    'False instance: $3 \\nmid 22$ ($22 = 3 \\cdot 7 + 1$), and indeed $6 \\nmid 44$ ($44 = 6 \\cdot 7 + 2$) — the failure scaled too.',
                    'Hence the equivalence in both directions — divisibility is invariant under multiplying both divisor and dividend.',
                  ],
                  answer: 'ac | bc ⟺ a | b; 3 | 21 ⟺ 6 | 42 ✓ and 3 ∤ 22 ⟺ 6 ∤ 44 ✓',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'The chain $45 \\mid 225$, $9 \\mid 45$, $5 \\mid 25$ — verify all three, and explain what single cancellation step separates each neighbour pair.',
                  solution: [
                    'First: $225 = 45 \\cdot 5$ — certificate $5$, so $45 \\mid 225$ ✓.',
                    'Second: $45 = 9 \\cdot 5$ — certificate $5$, so $9 \\mid 45$ ✓.',
                    'Third: $25 = 5 \\cdot 5$ — certificate $5$, so $5 \\mid 25$ ✓.',
                    'The connections: $225 = 5 \\cdot 45$ and $45 = 5 \\cdot 9$ — the cancellation form with $c = 5$ turns $45 \\mid 225$ into $9 \\mid 45$ (cancel 5 from $45 \\mid 5 \\cdot 45$), and one more turn gives $5 \\mid 25$… reading $45 = 9 \\cdot 5$ as $9 \\mid 45 \\Longleftrightarrow 9 \\cdot 5 \\mid 9 \\cdot 9$? No — the honest chain is: each statement is $5 \\mid 25$ wearing one extra shared factor ($45 \\mid 225$ is $9 \\cdot 5 \\mid 9 \\cdot 25$; $9 \\mid 45$ is $9 \\mid 9 \\cdot 5$).',
                    'Hence all three true, all one fact — $25 = 5^2$ — dressed at three cancellation depths.',
                  ],
                  answer: '45 | 225 ⟺ 9 | 45 ⟺ 5 | 25 — one shared factor 5 between neighbours',
                },
                {
                  q: 'From $6 \\mid 42$, prove $6 \\mid 420$. Then explain why the reverse implication fails in general, using $12 \\mid 3 \\cdot 4$.',
                  solution: [
                    'Forward: $42 = 6 \\cdot 7$, so $420 = 42 \\cdot 10 = (6 \\cdot 7) \\cdot 10 = 6 \\cdot 70$ — certificate $70 = 7 \\times 10$: product compatibility with $c = 10$.',
                    'Reverse attempt: does $6 \\mid 420$ force anything about $6$ versus $42$? Here it happens to hold ($42 = 6 \\cdot 7$), so find a cleaner failure of the *general* reverse.',
                    'The generic failure: $12 \\mid 3 \\cdot 4$ (the product is 12), yet $12 \\nmid 3$ and $12 \\nmid 4$ — divisibility of a product by $a$ licenses nothing about the factors alone.',
                    'The licensed climb-down is cancellation of a *common* factor: $ac \\mid bc \\Longleftrightarrow a \\mid b$ — common factors only.',
                    'Hence $6 \\mid 420$ holds with certificate 70; the reverse needs the common-factor dress, not the product dress.',
                  ],
                  answer: '6 | 420 (k = 70); the reverse is licensed only as ac | bc ⟺ a | b',
                },
                {
                  q: 'Prove: if $3 \\mid a$ and $3 \\mid b$, then $3 \\mid (a + b)$ — then use it twice, with transitivity, to certify $3 \\mid 999$ from $3 \\mid 111$ and $3 \\mid 222$.',
                  solution: [
                    'The general fact is the combination law at $x = y = 1$: $a = 3k$, $b = 3m$, so $a + b = 3(k + m)$ — certificate $k + m$.',
                    'First use: $111 = 3 \\cdot 37$ and $222 = 3 \\cdot 74$, so $111 + 222 = 333 = 3 \\cdot (37 + 74) = 3 \\cdot 111$ — $3 \\mid 333$, certificate $111$.',
                    'Second use — transitivity this time: $3 \\mid 333$ (certificate 111) and $333 \\mid 999$ (certificate 3, since $999 = 333 \\cdot 3$), so $3 \\mid 999$ with composed certificate $111 \\times 3 = 333$.',
                    'Check: $999 = 3 \\cdot 333$ ✓ (and FM 3.1\u2019s digit-sum test agrees: $9 + 9 + 9 = 27$).',
                    'Hence $3 \\mid 999$ — combination once, transitivity once, two laws composing like the arrows they are.',
                  ],
                  answer: '3 | 333 (k = 111); 3 | 999 via 333 | 999 (composed k = 333)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. Each law of divisibility consumed exactly one piece of Chapter 1\u2019s machinery. Trace them: which law used associativity, which used distribution, which used trichotomy and the run-length order, and which used cancellation (and where did cancellation\u2019s own proof come from?). Close by explaining why antisymmetry needed the positivity clause — what would $0 \\mid 0$ do to it?',
                  solution: [
                    'Transitivity used associativity of multiplication ($(ak)m = a(km)$) — the same induction programme as Lesson 1.3\u2019s laws, leaned on as licensed there.',
                    'Linear combinations used distribution ($a(kx + my)$ from $(ak)x + (am)y$) — banked as a theorem in 1.3\u2019s engine work.',
                    'Cancellation used trichotomy and the run-length order: $x < y$ forces $cx < cy$ via $y = x + s$, $cy = cx + sc$ with $sc \\ge 1$ — order-compatibility with multiplication, built from distribution plus the successor walk.',
                    'Antisymmetry used cancellation ($km = 1$ from $a(km) = a$) plus the arithmetic fact that only $1 \\times 1 = 1$ among naturals.',
                    'The positivity clause: with $0$ admitted as a number, $0 = 0 \\cdot k$ for *every* $k$ — so $0 \\mid 0$ holds with infinitely many certificates, "mutual division" stops identifying a unique pair, and $a \\mid 0 \\wedge 0 \\mid a$ for $a \\ge 1$ would absurdly force $a = 0$. On positive naturals the clause is invisible; at the $0$ boundary it is the wall. (Chapter 6\u2019s integers re-derive the laws on the larger stage, where the clause becomes $a \\ne 0$.)',
                  ],
                  answer: 'Associativity → transitivity; distribution → combinations; order → cancellation; cancellation → antisymmetry; positivity walls off 0 | 0',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The definition',
          latex: 'a \\mid b \\ \\Longleftrightarrow\\ \\exists k \\ (\\text{whole}),\\ b = ak',
          note: 'The certificate $k$ is the proof. Euclid\u2019s dress: "$a$ measures $b$". By the bridge: $a \\mid b \\Leftrightarrow (b \\bmod a) = 0$.',
        },
        {
          kind: 'formula',
          name: 'Transitivity',
          latex: 'a \\mid b,\\ b \\mid c \\ \\Rightarrow\\ a \\mid c \\quad (\\text{certificate } km)',
          note: 'Divisorhood travels chains; the composed certificate is the product of the given ones.',
        },
        {
          kind: 'formula',
          name: 'Linear combinations',
          latex: 'a \\mid b,\\ a \\mid c \\ \\Rightarrow\\ a \\mid (bx + cy) \\quad (\\text{certificate } kx + my)',
          note: 'Sums (and nonnegative differences) of multiples are multiples — the closure law that turns verdicts into algebra.',
        },
        {
          kind: 'formula',
          name: 'Antisymmetry and the order link',
          latex: 'a \\mid b,\\ b \\mid a,\\ a, b \\ge 1 \\ \\Rightarrow\\ a = b; \\qquad a \\mid b,\\ b \\ge 1 \\ \\Rightarrow\\ a \\le b',
          note: 'Mutual measurement is equality; a positive divisor never exceeds its positive multiple.',
        },
        {
          kind: 'formula',
          name: 'The cancellation form',
          latex: 'c \\ge 1: \\quad ac \\mid bc \\ \\Longleftrightarrow\\ a \\mid b',
          note: 'The legal climb-down: common factors cancel. The caution: $a \\mid bc$ alone forces nothing about the factors ($12 \\mid 3 \\cdot 4$, $12 \\nmid 3$, $12 \\nmid 4$).',
        },
        {
          kind: 'para',
          text: 'The relation now has its laws, and the laws have their uses — but they only *check* divisorhood one pair at a time. The natural next question is comparative: two numbers, many shared divisors — which is the *greatest* common measure, and how do you find it without listing candidates? Euclid\u2019s subtraction process, met in this lesson\u2019s historical note as the thing he ran without a termination postulate, is exactly that machine — and Lesson 2.3 runs it properly, proves it terminates (the least-number principle again), reads off Bézout\u2019s identity from its footprints, and turns the combination law from a curiosity into the key that solves $ax + by = c$ in whole numbers.',
        },
      ],
    },
  ],
}
