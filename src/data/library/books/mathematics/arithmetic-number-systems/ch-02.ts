import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 2: The Division Algorithm and
 * the Structure of Divisibility
 *
 * LESSONS WRITTEN: 2.1 Division with Rest: The Division Algorithm
 *                  2.2 The Algebra of Divisibility
 *                  (both: run 51 — 2026-11-05)
 *                  2.3 The Euclidean Algorithm, Proven — and Bézout's Identity
 *                  2.4 Linear Diophantine Equations
 *                  (both: run 52 — 2026-11-05)
 * CHAPTER STATUS: COMPLETE 4/4 (closed at run 52 with the unit-2 completion
 * review; chapter 3 'Positional Systems and Other Bases' opens at run 53).
 *
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * university number-systems bridge; reserved key run 48); Euclid's
 * Elements Book VII — Definitions 3–5 (the "measures" charter), VII.1–2
 * (the algorithm, run as antenaresis/anthyphairesis) and VII.2's
 * corollary ("if a number measures two numbers, then it also measures
 * their greatest common measure"), with the guide's note that Euclid
 * supplies no postulates for numbers yet leans on a decreasing-sequence
 * principle — the well-ordering engine Lesson 1.3 made explicit —
 * web-checked 2026-11-05 via David Joyce's Clark University edition
 * (sanctioned fallback), key euclid-elements-book-vii; Edmund Landau,
 * Elementary Number Theory (1927) — first in-print use of the a|b
 * notation (MacTutor, per Tattersall) — key landau-1927-elementare; the
 * name history — "algorithm" from Algoritmi, the Latinized name of
 * al-Khwārizmī — web-checked run 47 and carried; Bézout proved the
 * identity for polynomials (Théorie générale des équations algébriques,
 * 1779) while the integer statement is older — Bachet de Méziriac,
 * Problèmes plaisants (1612, expanded 1624) — keys bezout-1779-theorie,
 * bachet-1624-problemes; Gabriel Lamé's 1844 worst-case bound
 * (consecutive Fibonacci pairs; divisions ≤ 5 × the smaller number's
 * decimal digits) — key lame-1844-note; Diophantus of Alexandria, the
 * Arithmetica (c. 250 AD; ten of thirteen books extant; "father of
 * algebra") — key diophantus-arithmetica; Sylvester's two-denomination
 * Frobenius answer (Educational Times, 1884–85) — key
 * sylvester-1884-frobenius; Khattar QA 4e ch. 1 (the competitive-exam
 * division scope). All web-checked 2026-11-05 — see
 * docs/project/SOURCE_LOG.md. Exposition original.
 *
 * Every number below was recomputed by scripts/verify-book2-ch02.ts
 * BEFORE being written — run 51 authored sections A–T (166 checks);
 * run 52 extended with sections U–AN (407 checks total, all passing)
 * before a word of 2.3/2.4 existed. The verify discipline caught real
 * defects pre-writing in both runs: run 51 — a miscomputed impostor
 * count, an inverted divisibility direction in the 12 | 3·4 caution;
 * run 52 — an extTable seed-order bug for a < b pairs, a block-scoped
 * helper, two off-by-one quotient lists, three figure-label collisions,
 * a box-size artifact in the criterion sweep, and a miscounted gap list.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'division-algorithm-and-divisibility',
  title: 'The Division Algorithm and the Structure of Divisibility',
  summary:
    'The theorem hiding under every long division: a = bq + r with 0 ≤ r < b, existence proved by well-ordering and uniqueness by subtraction. Divisibility becomes algebra (the transitive and linear-combination laws), the Euclidean algorithm gets the proof FM omitted, Bézout’s identity is derived, and linear Diophantine equations ax + by = c are solved in full.',
  status: 'complete',
  plannedLessons: [],
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
    {
      id: 'ans-euclidean-algorithm-proven-bezout-identity',
      number: '2.3',
      title: 'The Euclidean Algorithm, Proven — and Bézout’s Identity',
      prerequisites: ['ans-the-algebra-of-divisibility', 'fm-highest-common-factor', 'fm-equivalent-fractions-simplification'],
      sources: ['euclid-elements-book-vii', 'lame-1844-note', 'bezout-1779-theorie', 'bachet-1624-problemes', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'Greatest common divisor gcd(a, b)',
        'The Euclidean algorithm (division loop)',
        'The subtraction form: anthyphairesis',
        'Termination by descent (the third LNP burn)',
        'Bézout’s identity d = ax + by',
        'Backward substitution and the extended table',
        'Relatively prime: the certificate 1 = ax + by',
        'The LCM payoff lcm = ab/gcd',
      ],
      objectives: [
        'Define the greatest common divisor in the Euclidean dress — the common divisor every other common divisor measures — and connect it to FM 3.3’s HCF',
        'Run both forms of the Euclidean algorithm (subtraction and division), prove that it terminates by descent, and prove that the survivor is the gcd — with no factorisation anywhere',
        'Derive Bézout’s identity by backward substitution, and compute Bézout coefficients fast with the extended table',
        'Use the coprime certificate $1 = ax + by$, the scaled reduction $\\gcd(a/d, b/d) = 1$, and the LCM payoff $\\mathrm{lcm}(a,b) = ab/\\gcd(a,b)$',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 3.3 taught you to find the HCF two ways: list the common factors and take the biggest, or factor both numbers and multiply the shared primes at their smaller powers. Both methods answer the question — at a price measured in factorisations. To find the HCF of $4{,}595$ and $3{,}570$ by listing, you would test candidates up to $3{,}570$; by the prime method, you would first have to factor both numbers, and factorisation is the expensive thing this book is saving for chapter 4. This lesson rebuilds the concept from beneath and then hands you the machine Euclid cut twenty-three centuries ago: a division loop that finds the greatest common divisor **without factorising anything** — often called the oldest nontrivial algorithm still in everyday use, and the load-bearing wall of everything this book builds next.',
        },
        {
          kind: 'para',
          text: 'The idea costs one sentence — it is Lesson 2.2’s combination law aimed at a difference. If $d$ divides both $a$ and $b$, then $d$ divides $a - b$: a common divisor of the pair $(a, b)$ is automatically a common divisor of the smaller pair $(a - b, b)$. And the traffic runs the other way too, because $a = (a - b) + b$ is a combination of the smaller pair. So the two pairs have *exactly the same* common divisors — and therefore the same greatest one. Replace the pair by a smaller one and repeat: the pairs march downward, the common-divisor set holds still, and (the least-number principle again) the march must end. What survives at the bottom is the answer. The rest of the lesson is this sentence, played out in full and then cashed twice — once as the algorithm, once as Bézout’s identity.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Greatest common divisor',
          text: 'Let $a$ and $b$ be natural numbers with $a, b \\ge 1$. A natural number $d$ is said to be a **common divisor** of $a$ and $b$ when $d \\mid a$ and $d \\mid b$. The **greatest common divisor** of $a$ and $b$, written $\\gcd(a, b)$ — the **highest common factor**, FM 3.3’s name — is the common divisor $d$ such that **every** common divisor of $a$ and $b$ divides $d$. Thus, $\\gcd(a, b)$ is not merely the largest common divisor; it is the one all the others *measure* — Euclid’s “greatest common measure”. The two readings agree by Lesson 2.2’s order link: a positive divisor of $d$ never exceeds $d$, so “everything divides it” forces “nothing beats it”.',
        },
        { kind: 'heading', text: 'The invariance lemma: subtraction preserves the common divisors' },
        {
          kind: 'derivation',
          title: 'Subtraction preserves the common divisors',
          statement:
            'Claim: for natural numbers $a > b \\ge 1$, the pairs $(a, b)$ and $(a - b, b)$ have exactly the same common divisors — hence the same greatest common divisor. Only Lesson 2.2’s combination law is used.',
          steps: [
            {
              label: 'Forward: a common divisor of (a, b) divides the difference',
              formula: 'd \\mid a, \\ d \\mid b \\ \\Rightarrow\\ d \\mid (a - b)',
              explanation:
                'Write $a = dk$ and $b = dm$ (the certificates). Then $a - b = d(k - m)$, and $k - m$ is a whole number — indeed $k > m$ by the order link, since $a > b$. So $a - b$ is a multiple of $d$: the difference is a combination ($x = 1$, $y = -1$ in Lesson 2.2’s law, evaluated as the natural difference $a - b > 0$).',
            },
            {
              label: 'Backward: a common divisor of (a − b, b) divides the sum',
              formula: 'd \\mid (a - b), \\ d \\mid b \\ \\Rightarrow\\ d \\mid (a - b) + b = a',
              explanation:
                'With $a - b = dk$ and $b = dm$, the sum is $a = d(k + m)$ — the combination law in its sum dress, with $k + m$ a natural. So any common divisor of the smaller pair divides $a$ as well, and $d$ was already dividing $b$.',
            },
            {
              label: 'The sets coincide, so their greatest elements coincide',
              formula: '\\{d : d \\mid a, \\ d \\mid b\\} = \\{d : d \\mid (a - b), \\ d \\mid b\\}',
              explanation:
                'Steps one and two are exact converses: every element of either common-divisor set belongs to the other. Two identical sets have the same greatest element — the gcd never noticed the substitution.',
            },
          ],
          result:
            'For $a > b \\ge 1$: $\\gcd(a, b) = \\gcd(a - b, b)$. The pair can shrink all it wants; its greatest common divisor holds still.',
        },
        {
          kind: 'para',
          text: 'This one lemma is the entire blueprint. Euclid’s original engine applies it one subtraction at a time — replace the larger number by the difference of the pair, and repeat until the two numbers meet. Watch it on $(48, 18)$, keeping the pair written in both seats:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$(48, 18) \\to (30, 18)$ — subtract the smaller from the larger; the common divisors stay $\\{1, 2, 3, 6\\}$.',
            '$(30, 18) \\to (12, 18)$ — again; still $\\{1, 2, 3, 6\\}$.',
            '$(12, 18) \\to (12, 6)$ — now the second seat is larger; subtract the other way; still $\\{1, 2, 3, 6\\}$.',
            '$(12, 6) \\to (6, 6)$ — the pair meets. A pair of equals has the equals as its common divisors: $\\{1, 2, 3, 6\\}$, greatest $6$.',
          ],
        },
        {
          kind: 'para',
          text: 'Four subtractions, and the common-divisor set never moved: $\\gcd(48, 18) = 6$ was decided at the start and merely uncovered. Why must the walk end? Because each step *shrinks the pair-sum* — $66 > 48 > 30 > 18 > 12$ — and a strictly descending staircase of natural numbers cannot be endless: that is the least-number principle of Lesson 1.3, the engine that proved the division algorithm in Lesson 2.1, here halting Euclid’s process in exactly the same way. Every subtraction is a descent, and descent in the naturals always lands.',
        },
        { kind: 'heading', text: 'The division step: the same walk, compressed' },
        {
          kind: 'para',
          text: 'Subtracting $b$ from $a$ over and over is precisely repeated subtraction — which Lesson 2.1 already unmasked as division. Four subtractions of 18 from 48 are one division sentence: $48 = 2 \\cdot 18 + 12$. So do the subtractions *in bulk*: one division step replaces the pair $(a, b)$ by the pair $(b, a \\bmod b)$, with the remainder guaranteed in the band $0 \\le a \\bmod b < b$. When the remainder hits $0$, the divisor seat holds a number that divides its partner exactly — the walk has met its bottom, and that number is the answer. This is the form of the algorithm the world actually runs:',
        },
        {
          kind: 'algorithm',
          title: 'The Euclidean algorithm (division form)',
          lines: [
            { code: 'input: naturals a ≥ 1, b ≥ 1', note: 'the pair whose gcd is wanted' },
            { code: 'while b ≥ 1:', note: 'run while the second seat is occupied' },
            { code: '    r ← a mod b', note: 'Lesson 2.1’s theorem: 0 ≤ r < b — long division computes it' },
            { code: '    a ← b', note: 'the old divisor takes the dividend’s seat' },
            { code: '    b ← r', note: 'the remainder takes the divisor’s seat — the pair shrinks' },
            { code: 'return a', note: 'when b hits 0, the survivor a is gcd of the original pair' },
          ],
          note: 'Termination: the second seats form a strictly descending sequence b > r₁ > r₂ > ⋯ of naturals — the least-number principle forbids an endless one, so the loop halts. Correctness: each step preserves the common-divisor set (the invariance lemma, with subtraction run in bulk), so the survivor is the last common divisor left standing — the greatest one.',
        },
        {
          kind: 'derivation',
          title: 'Termination by descent — the least-number principle’s third burn',
          statement:
            'Claim: iterating $(a, b) \\to (b, a \\bmod b)$ halts after finitely many steps, and it halts exactly when a remainder $0$ appears. This is the descent argument of Lesson 2.1, run on a marching pair.',
          steps: [
            {
              label: 'The second seat strictly decreases',
              formula: 'a_{i+1} = a_{i-1} \\bmod a_i \\ < \\ a_i',
              explanation:
                'Lesson 2.1’s theorem pins every remainder strictly below its divisor: $0 \\le a_{i+1} < a_i$. So the second seats $a_1 > a_2 > a_3 > \\dots$ form a strictly descending sequence of natural numbers — each step of the loop is one more stair down.',
            },
            {
              label: 'An endless descent is impossible',
              formula: '\\{a_1, a_2, a_3, \\dots\\} \\text{ is nonempty} \\ \\Rightarrow\\ \\text{it has a least element}',
              explanation:
                'This is the least-number principle of Lesson 1.3 — on its third appearance: Lesson 2.1 spent it on the existence of quotient and remainder, the descent shadow reused it there, and now it halts Euclid. A strictly descending staircase of naturals cannot be endless, because its steps would be a nonempty set with no bottom.',
            },
            {
              label: 'Halting means the remainder zero',
              formula: 'a_{k+1} = 0 \\quad \\text{for some } k',
              explanation:
                'The loop continues exactly while the second seat holds $\\ge 1$. Strict descent must eventually leave the positive naturals — and the only way it can is the value $0$. The survivor is the last nonzero occupant of the divisor seat.',
            },
          ],
          result:
            'The Euclidean loop halts after finitely many divisions, and its last nonzero remainder is in hand. (Euclid ran all this without a termination postulate — the historical note below tells that story.)',
        },
        { kind: 'heading', text: 'Why the survivor is the greatest common measure' },
        {
          kind: 'para',
          text: 'Halting is half the proof. The other half has two rails, and both ride the same division sentences. Take the instance that will carry this whole lesson — $\\gcd(210, 45)$, whose loop runs $210 = 4 \\cdot 45 + 30$, then $45 = 1 \\cdot 30 + 15$, then $30 = 2 \\cdot 15 + 0$:',
        },
        {
          kind: 'derivation',
          title: 'The survivor theorem',
          statement:
            'Claim: the last nonzero remainder $d$ of the Euclidean loop on $(a, b)$ divides both $a$ and $b$, and every common divisor of $a$ and $b$ divides $d$ — so $d$ is the greatest common divisor in the definition’s full sense.',
          steps: [
            {
              label: 'Up-rail: the survivor divides everything above it',
              formula: 'd \\mid a_{k-1}, \\ d \\mid a_{k-2}, \\ \\dots, \\ d \\mid a_1 = b, \\ d \\mid a_0 = a',
              explanation:
                'At the bottom of the $(210, 45)$ chain, $30 = 2 \\cdot 15 + 0$ — the survivor $15$ divides $30$ outright. One sentence up, $45 = 1 \\cdot 30 + 15$: both terms on the right are multiples of $15$, so their sum is too (the combination law). Keep climbing: $210 = 4 \\cdot 45 + 30$ finishes it. Induction up the chain shows $15 \\mid 30$, $15 \\mid 45$, $15 \\mid 210$ — the survivor is a common divisor of everything the loop ever touched.',
            },
            {
              label: 'Down-rail: every common divisor rides to the bottom',
              formula: 'e \\mid a, \\ e \\mid b \\ \\Rightarrow\\ e \\mid r_1, \\ e \\mid r_2, \\ \\dots, \\ e \\mid d',
              explanation:
                'If $e$ divides $210$ and $45$, the first sentence $210 = 4 \\cdot 45 + 30$ exhibits $30$ as a combination in Lesson 2.2’s dress: $30 = 1 \\cdot 210 - 4 \\cdot 45$ — a difference of multiples of $e$, so $e \\mid 30$. Now $e$ divides $45$ and $30$, so the next sentence hands it $15$; then the next hands it the $0$. Every common divisor of the inputs divides every remainder — including the survivor.',
            },
            {
              label: 'The order link crowns the survivor',
              formula: 'e \\mid d, \\ d \\ge 1 \\ \\Rightarrow\\ e \\le d',
              explanation:
                'Lesson 2.2’s order link: a positive divisor never exceeds its positive multiple. Every common divisor $e$ divides $d$ (down-rail), so $e \\le d$ — while $d$ itself is common (up-rail). The survivor is the greatest common divisor, exactly as the definition demanded: the common divisor that all the others measure.',
            },
          ],
          result:
            '$\\gcd(a, b)$ = the last nonzero remainder of the Euclidean loop — found with divisions only: no listings, no factor trees, no primes.',
        },
        {
          kind: 'figure',
          caption:
            'The Euclidean cascade for gcd(210, 45): three division machines, each remainder taking the next machine’s divisor seat. Down the left rail, every common divisor d of 210 and 45 rides every arrow — it divides each remainder (the down-rail of the survivor theorem). Up the right rail, the survivor 15 divides everything above it — 15 | 30, 45, 210 (the up-rail). The survivor is the last nonzero remainder: gcd(210, 45) = 15, found with three divisions and no factorisation.',
          svg: `<svg viewBox="0 0 920 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Euclidean cascade: 210 = 4·45 + 30, 45 = 1·30 + 15, 30 = 2·15 + 0; the survivor 15 highlighted; common divisors ride down, 15 rides up">
  <defs>
    <marker id="euclid-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <!-- rails -->
  <line x1="170" y1="60" x2="170" y2="340" stroke="currentColor" stroke-width="1.3" marker-end="url(#euclid-arrow)"/>
  <line x1="750" y1="340" x2="750" y2="60" stroke="currentColor" stroke-width="1.3" marker-end="url(#euclid-arrow)"/>
  <text x="162" y="34" font-size="12" fill="currentColor" text-anchor="middle">common divisors ride down</text>
  <text x="750" y="34" font-size="12" fill="currentColor" text-anchor="middle">15 rides up</text>
  <text x="170" y="366" font-size="12" fill="currentColor" text-anchor="middle">d divides every remainder</text>
  <text x="750" y="366" font-size="12" fill="currentColor" text-anchor="middle">15 | 30, 45, 210</text>
  <!-- machine 1: 210 = 4·45 + 30 -->
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="250" y="48" width="64" height="44"/>
    <rect x="346" y="48" width="40" height="44"/>
    <rect x="410" y="48" width="56" height="44"/>
    <rect x="498" y="48" width="56" height="44"/>
  </g>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="282" y="77">210</text>
    <text x="330" y="77">=</text>
    <text x="366" y="77">4</text>
    <text x="398" y="77">·</text>
    <text x="438" y="77">45</text>
    <text x="482" y="77">+</text>
    <text x="526" y="77">30</text>
  </g>
  <!-- machine 2: 45 = 1·30 + 15 (r highlighted) -->
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="250" y="176" width="64" height="44"/>
    <rect x="346" y="176" width="40" height="44"/>
    <rect x="410" y="176" width="56" height="44"/>
  </g>
  <rect x="498" y="176" width="56" height="44" stroke="currentColor" stroke-width="2.5" fill="none"/>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="282" y="205">45</text>
    <text x="330" y="205">=</text>
    <text x="366" y="205">1</text>
    <text x="398" y="205">·</text>
    <text x="438" y="205">30</text>
    <text x="482" y="205">+</text>
    <text x="526" y="205">15</text>
  </g>
  <!-- machine 3: 30 = 2·15 + 0 (b highlighted: the survivor) -->
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="250" y="304" width="64" height="44"/>
    <rect x="346" y="304" width="40" height="44"/>
    <rect x="498" y="304" width="56" height="44"/>
  </g>
  <rect x="410" y="304" width="56" height="44" stroke="currentColor" stroke-width="2.5" fill="none"/>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="282" y="333">30</text>
    <text x="330" y="333">=</text>
    <text x="366" y="333">2</text>
    <text x="398" y="333">·</text>
    <text x="438" y="333">15</text>
    <text x="482" y="333">+</text>
    <text x="526" y="333">0</text>
  </g>
  <!-- carry arrows: remainder takes the next divisor seat -->
  <polyline points="526,92 526,134 438,134 438,170" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#euclid-arrow)"/>
  <polyline points="526,220 526,262 438,262 438,298" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#euclid-arrow)"/>
  <text x="350" y="118" font-size="12.5" fill="currentColor" text-anchor="middle">the remainder 30 becomes the next divisor</text>
  <text x="350" y="246" font-size="12.5" fill="currentColor" text-anchor="middle">the remainder 15 becomes the next divisor</text>
  <!-- banner -->
  <text x="388" y="396" font-size="13.5" font-weight="600" fill="currentColor" text-anchor="middle">the survivor 15 — the last nonzero remainder — is gcd(210, 45)</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The Euclidean algorithm',
          text: 'For natural numbers $a \\ge 1$ and $b \\ge 1$: iterate $(a, b) \\to (b, a \\bmod b)$ until the remainder is $0$. The loop halts (descent), and the last nonzero remainder $d$ satisfies: $d \\mid a$, $d \\mid b$, and every common divisor of $a$ and $b$ divides $d$. Hence $d = \\gcd(a, b)$. Instance: $\\gcd(210, 45) = 15$ from the chain $210 = 4 \\cdot 45 + 30$, $45 = 1 \\cdot 30 + 15$, $30 = 2 \\cdot 15 + 0$.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Euclid, Book VII, around 300 BC',
          text: 'Propositions VII.1 and VII.2 of the *Elements* run this process — the Greeks called it *anthyphairesis*, “reciprocal subtraction”, and Aristotle’s *Topics* already used it to compare ratios. VII.1 handles pairs whose greatest common measure is the unit; VII.2 finds the greatest common measure of any two numbers not relatively prime, and closes with a corollary this lesson proved on the way up the chain: “if a number measures two numbers, then it also measures their greatest common measure.” Euclid states no postulates for numbers and never asks whether the process must end — David Joyce’s modern edition points out the missing descending-chain assumption; the least-number principle of Lesson 1.3 is exactly that missing wall. The word *algorithm* — carried in Lesson 2.1’s historical note from *Algoritmi*, the Latinized name of al-Khwārizmī — is often pinned to this very procedure.',
        },
        { kind: 'heading', text: 'Bézout’s identity: the survivor is a combination' },
        {
          kind: 'para',
          text: 'The algorithm answers *which* number the gcd is. A deeper question hides behind it: the laws of Lesson 2.2 say every common divisor divides every combination $ax + by$ — combinations of $a$ and $b$ are *trapped inside* the multiples of the gcd. Can the traffic run the other way? Can some combination climb back out and *equal* the gcd itself? The answer is yes, and the proof is already in your hands: the cascade’s footprints. Read the division chain from the bottom up, substituting each sentence into the one above, and the survivor assembles itself as a combination of the original inputs.',
        },
        {
          kind: 'derivation',
          title: 'Bézout’s identity by backward substitution',
          statement:
            'Claim: the survivor $d = \\gcd(a, b)$ can be written $d = ax + by$ — a combination of the two inputs with whole-number coefficients $x$, $y$. The proof climbs the division chain from the bottom, one substitution per step.',
          steps: [
            {
              label: 'The first remainder is a combination already',
              formula: 'r_1 = a - q_1 b',
              explanation:
                'Rearrange the first division sentence $a = q_1 b + r_1$: subtract $q_1$ copies of $b$ from $a$. As naturals this is legal — $q_1$ was chosen in Lesson 2.1 precisely so that $r_1 \\ge 0$ — and it exhibits the first remainder as a difference of natural multiples of $a$ and $b$.',
            },
            {
              label: 'Each remainder rides on the two above it',
              formula: 'r_{i+1} = r_{i-1} - q_{i+2} r_i',
              explanation:
                'Every division sentence rearranges the same way. If $r_{i-1}$ and $r_i$ are already differences of natural multiples of $a$ and $b$, so is $r_{i+1}$: substitute the expression for $r_i$ and collect the $a$-coefficients and the $b$-coefficients. Collecting never leaves the whole numbers — though a coefficient may dip below zero (the honest flag below); the *value* stays checkable as one natural subtraction.',
            },
            {
              label: 'Induction reaches the survivor',
              formula: 'd = r_k = x \\cdot a + y \\cdot b',
              explanation:
                'Climbing sentence by sentence, every remainder — in particular the last nonzero one — is a combination of $a$ and $b$ with whole-number coefficients. This is **Bézout’s identity**: the gcd is not merely a ceiling on the combinations; it *is* one of them.',
            },
          ],
          result:
            'For all natural $a, b \\ge 1$ there exist whole numbers $x, y$ with $\\gcd(a, b) = ax + by$ — read off the Euclidean loop’s own footprints.',
        },
        {
          kind: 'example',
          title: 'Run the Euclidean loop on (210, 45), then read the survivor off the chain',
          steps: [
            'Split: run the loop — divide 210 by 45: $210 = 4 \\cdot 45 + 30$; the pair becomes $(45, 30)$.',
            'Now, divide 45 by 30: $45 = 1 \\cdot 30 + 15$; the pair becomes $(30, 15)$.',
            'So, divide 30 by 15: $30 = 2 \\cdot 15 + 0$ — remainder zero: stop after three divisions.',
            'Take: the survivor is the last nonzero remainder, $15$. No factorisation was performed anywhere.',
            'Hence check the maximality the long way once, to watch the theorem at work: the common divisors of 210 and 45 are $1, 3, 5, 15$ — the greatest is $15$ ✓.',
          ],
        },
        {
          kind: 'example',
          title: 'Backward substitution: express the survivor 15 as a combination of 210 and 45',
          steps: [
            'Split: climb the chain of the previous Illustration, bottom sentence first: $15 = 45 - 1 \\cdot 30$.',
            'Now, substitute the sentence that produces 30: $30 = 210 - 4 \\cdot 45$.',
            'So, $15 = 45 - 1 \\cdot (210 - 4 \\cdot 45) = 5 \\cdot 45 - 1 \\cdot 210$ — collect the 45s: $1 + 4$ of them; one 210 remains.',
            'Check as a natural difference: $5 \\cdot 45 = 225$ and $1 \\cdot 210 = 210$, and $225 - 210 = 15$ ✓.',
            'Hence Bézout’s identity on the instance: $\\gcd(210, 45) = 5 \\cdot 45 - 1 \\cdot 210$ — coefficients $(x, y) = (-1, 5)$ in the signed dress.',
          ],
        },
        {
          kind: 'para',
          text: 'Backward substitution is the *proof* — it shows the coefficients exist and where they come from. For computing them quickly, run the bookkeeping *forward*: keep a coefficient pair $(x, y)$ alongside every remainder as the loop runs, so that each row satisfies $x \\cdot a + y \\cdot b = r$. The seeds are forced ($a = 1 \\cdot a + 0 \\cdot b$; $b = 0 \\cdot a + 1 \\cdot b$), and each new row is “two up minus (new quotient) × one up” — the same recurrence the remainders obey, applied column-wise. Here is the whole computation for $(210, 45)$, with every row checked:',
        },
        {
          kind: 'table',
          caption: 'The extended Euclidean table for (a, b) = (210, 45): each row carries (r, x, y) with x·210 + y·45 = r. Each new row is two up minus (new quotient) × one up. The last nonzero row is Bézout’s identity.',
          head: ['row', 'r', 'x', 'y', 'the check x·a + y·b'],
          rows: [
            ['seed a', '210', '1', '0', '210·1 + 45·0 = 210 ✓'],
            ['seed b', '45', '0', '1', '210·0 + 45·1 = 45 ✓'],
            ['210 − 4·45', '30', '1', '−4', '210 − 180 = 30 ✓'],
            ['45 − 1·30', '15', '−1', '5', '−210 + 225 = 15 ✓'],
            ['30 − 2·15', '0', '3', '−14', '630 − 630 = 0 ✓'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The coefficients subtract — what that means here',
          text: 'Bézout coefficients generally wear minus signs: $15 = 5 \\cdot 45 - 1 \\cdot 210$. This book has not built the integers yet — Chapter 6 does — so read every such line as a **difference of natural multiples**: the larger product minus the smaller, verified by direct arithmetic ($225 - 210 = 15$). Nothing in this lesson needs anything deeper: a difference of two multiples of $d$ is a multiple of $d$ (Lesson 2.2’s combination law), and every claimed identity is one subtraction away from a check. Chapter 6 will give these differences a proper home, and every statement of this lesson will survive unchanged.',
        },
        {
          kind: 'example',
          title: 'Find gcd(4,595, 3,570) — the exam workhorse — and write Bézout’s identity for the pair',
          steps: [
            'Split: run the loop: $4{,}595 = 1 \\cdot 3{,}570 + 1{,}025$.',
            'Now, $3{,}570 = 3 \\cdot 1{,}025 + 495$.',
            'So, $1{,}025 = 2 \\cdot 495 + 35$; then $495 = 14 \\cdot 35 + 5$; then $35 = 7 \\cdot 5 + 0$ — stop.',
            'Take: the survivor is $5$ — five divisions, no factor tree, no prime listing (FM 3.3’s methods would factor both numbers first).',
            'Now, climb backwards for Bézout: $5 = 495 - 14 \\cdot 35 = 495 - 14 \\cdot (1{,}025 - 2 \\cdot 495) = 29 \\cdot 495 - 14 \\cdot 1{,}025$.',
            'So, $495 = 3{,}570 - 3 \\cdot 1{,}025$ gives $5 = 29 \\cdot 3{,}570 - 101 \\cdot 1{,}025$; and $1{,}025 = 4{,}595 - 3{,}570$ finishes it: $5 = 130 \\cdot 3{,}570 - 101 \\cdot 4{,}595$.',
            'Check: $130 \\cdot 3{,}570 = 464{,}100$ and $101 \\cdot 4{,}595 = 464{,}095$ — the difference is $5$ ✓.',
          ],
        },
        { kind: 'heading', text: 'Coprime pairs, the scaled reduction, and the LCM payoff' },
        {
          kind: 'para',
          text: 'One value of the survivor deserves its own paragraph: $d = 1$. The pair is then called **relatively prime**, or **coprime** — FM 3.3’s word — and Bézout turns the name into a certificate: $\\gcd(a, b) = 1$ means $1 = ax + by$ for some whole numbers, and conversely a combination equal to 1 certifies coprimality (any common divisor would divide that combination, hence divide 1). The flattest instances are consecutive numbers: $9 - 8 = 1$ gives $1 = 1 \\cdot 9 - 1 \\cdot 8$, so $\\gcd(8, 9) = 1$ — and no search was needed, because *any* common divisor of $n$ and $n + 1$ divides their difference 1. Consecutive Fibonacci numbers (Lesson 1.3’s recursion) are coprime for the same reason the algorithm on them never misses: chapter’s end makes that precise.',
        },
        {
          kind: 'para',
          text: 'Two reductions cash Bézout further. First, the **scaled reduction**: dividing both inputs by their gcd never spoils coprimality — $\\gcd(a/d, b/d) = 1$ whenever $d = \\gcd(a, b)$ — because dividing the identity $d = ax + by$ through by $d$ (Lesson 2.2’s cancellation) yields $1 = (a/d)x + (b/d)y$. Instance: $(210, 45)$ scales to $(14, 3)$, and $15 = 5 \\cdot 45 - 1 \\cdot 210$ divided by 15 reads $1 = 5 \\cdot 3 - 1 \\cdot 14$ ✓ ($15 - 14 = 1$). The next lesson builds its whole solution theory on this reduction. Second, the **LCM payoff**: FM 3.5 banked the product rule $\\gcd(a, b) \\cdot \\mathrm{lcm}(a, b) = a \\cdot b$ — and now the gcd is computable without factorising, so the lcm comes along free: $\\mathrm{lcm}(210, 45) = \\frac{210 \\cdot 45}{15} = 630$, a common multiple of both ($630 = 3 \\cdot 210 = 14 \\cdot 45$), and the least — the smaller multiples 210 and 420 both miss ($420 = 9 \\cdot 45 + 15$, the old stub).',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The worst case — Lamé, 1844',
          text: 'How slow can the loop be? Gabriel Lamé proved the answer: the worst pairs are consecutive Fibonacci numbers — $1, 1, 2, 3, 5, 8, 13, \\dots$, Lesson 1.3’s recursion. On $(6{,}765, 4{,}181)$ — $F_{20}$ and $F_{19}$ — the loop takes 18 divisions and every quotient is 1 except the last: the descent shrinks as slowly as division allows, one Fibonacci step at a time, ending $\\gcd(6{,}765, 4{,}181) = 1$. Lamé’s bound: the number of divisions never exceeds $5 \\times$ the number of decimal digits of the smaller number ($18 \\le 5 \\cdot 4$ here) — so even pathological inputs finish in a handful of divisions. The verify sweep behind this lesson checked every pair up to $10{,}000$: none needs more than 18 divisions, none below 6,765 reaches 18, and the maximum is achieved exactly at the Fibonacci pair.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'The algorithm is a competitive-exam staple exactly because it outruns factorisation: HCF of two three- or four-digit numbers in a few divisions ($4{,}595$ and $3{,}570$ took five) where listing would test hundreds of candidates; coprime checks for fraction work — FM 4.2 already ran the ladder on $91/104$ and $231/275$, and now you know why it always ends; LCM of a pair via the product rule the moment the HCF is out; and “express the HCF as a combination of the two numbers” questions, which are backward substitution by another name. Khattar’s QA chapter 1 drills all four shapes. In this book the stakes are higher still: chapter 4’s uniqueness of prime factorisation stands on Bézout, and Bézout stands on this lesson.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Greatest common divisor', def: 'For $a, b \\ge 1$: the common divisor $\\gcd(a, b)$ that every common divisor divides — the greatest common measure. FM 3.3’s HCF under its formal name.' },
            { term: 'The Euclidean algorithm', def: 'The division loop $(a, b) \\to (b, a \\bmod b)$, run until the remainder is 0; the last nonzero remainder is $\\gcd(a, b)$. Termination by descent; correctness by the invariance lemma and the two rails.' },
            { term: 'The subtraction form (anthyphairesis)', def: 'Euclid’s original engine: replace the larger number by the difference, one subtraction at a time, until the pair meets. Greek for “reciprocal subtraction”; the division loop is it compressed.' },
            { term: 'Remainder sequence', def: 'The strictly descending chain $b > r_1 > r_2 > \\dots \\ge 0$ of second seats. The least-number principle (Lesson 1.3) guarantees it cannot be endless — termination by descent.' },
            { term: 'Bézout’s identity', def: 'The survivor is a combination: $\\gcd(a, b) = ax + by$ for whole numbers $x, y$ — derived by backward substitution up the division chain.' },
            { term: 'Bézout coefficients', def: 'The whole-number pair $(x, y)$ in $ax + by = \\gcd(a, b)$. Not unique; the extended table yields a small pair with $|x| \\le b/d$ and $|y| \\le a/d$. Read negative coefficients as differences of natural multiples until Chapter 6.' },
            { term: 'Relatively prime (coprime)', def: '$\\gcd(a, b) = 1$; certified by a combination equal to 1. Consecutive numbers are always coprime — any common divisor divides their difference.' },
            { term: 'The scaled reduction', def: '$\\gcd(a/d, b/d) = 1$ for $d = \\gcd(a, b)$: dividing an identity $d = ax + by$ by $d$ certifies it. The gateway to the Diophantine theory of Lesson 2.4.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The pair $(a, b)$ is replaced by $(a - b, b)$. What happens to the set of common divisors?',
              options: [
                'It is unchanged — every common divisor of either pair divides the other pair too (the combination law, both ways)',
                'It loses every divisor larger than $a - b$',
                'It shrinks by exactly one divisor',
                'It becomes the set of divisors of $a - b$ alone',
              ],
              answer: 0,
              explain: 'The invariance lemma: $d \\mid a, d \\mid b \\Rightarrow d \\mid (a-b)$ and conversely $d \\mid (a-b), d \\mid b \\Rightarrow d \\mid a$ — the sets coincide element for element (the $(48, 18) \\to (30, 18)$ instance kept $\\{1, 2, 3, 6\\}$ exactly). The other options describe sets that would change — which would break the whole algorithm.',
            },
            {
              q: 'Run the division loop on $(210, 45)$. What does the algorithm return?',
              options: ['30 — the first remainder', '15 — the last nonzero remainder', '5 — a common divisor, but not the greatest', '45 — the divisor itself'],
              answer: 1,
              explain: 'The chain $210 = 4 \\cdot 45 + 30$, $45 = 1 \\cdot 30 + 15$, $30 = 2 \\cdot 15 + 0$ stops with survivor 15. The distractors fail differently: 30 is a remainder, not a divisor of 45; 5 divides both but is not the greatest; 45 does not divide 210.',
            },
            {
              q: 'What forces the Euclidean loop to halt?',
              options: [
                'The quotients decrease at every step',
                'The remainders form a strictly descending sequence of naturals — and no such staircase is endless (the least-number principle)',
                'The algorithm checks in advance how many steps it will need',
                'Division by zero terminates it',
              ],
              answer: 1,
              explain: 'Lesson 2.1’s band pins each remainder strictly below its divisor: $b > r_1 > r_2 > \\dots$, and the least-number principle forbids an endless descent — the principle’s third burn. The quotients need not decrease at all: the chain $(4{,}595, 3{,}570)$ runs $(1, 3, 2, 14, 7)$, rising twice.',
            },
            {
              q: 'Backward substitution on the $(210, 45)$ chain expresses the survivor as a difference of natural multiples. Which expression does the climb produce?',
              options: ['5·45 − 1·210', '6·45 − 1·210', '2·210 − 9·45', '1·210 − 5·45'],
              answer: 0,
              explain: 'The climb: $15 = 45 - 1 \\cdot 30$ with $30 = 210 - 4 \\cdot 45$ gives $15 = 5 \\cdot 45 - 1 \\cdot 210$ ($225 - 210 = 15$). The subtle distractor $2 \\cdot 210 - 9 \\cdot 45$ also evaluates to 15 — coefficients are not unique — but it is not what the substitution produces; $6 \\cdot 45 - 1 \\cdot 210 = 60$; and $1 \\cdot 210 - 5 \\cdot 45$ is negative — not a natural difference at all.',
            },
            {
              q: 'Why is $\\gcd(n, n+1) = 1$ for every natural $n$?',
              options: [
                'Because one of any two consecutive numbers is prime',
                'Because consecutive numbers share no digits',
                'Any common divisor of $n$ and $n + 1$ divides their difference 1 — so it is 1',
                'Only when $n$ is even',
              ],
              answer: 2,
              explain: 'The difference argument: $d \\mid n$ and $d \\mid n+1$ force $d \\mid (n+1) - n = 1$, and the only natural measuring 1 is 1 itself. The prime distractor dies on $n = 8$: 9 is composite, yet $\\gcd(8, 9) = 1$ — with the flattest certificate there is, $1 = 1 \\cdot 9 - 1 \\cdot 8$.',
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
                  q: 'Find $\\gcd(68, 51)$ by the division loop, writing every division sentence.',
                  solution: [
                    'Split: run the loop on $(68, 51)$: divide 68 by 51 — $68 = 1 \\cdot 51 + 17$.',
                    'Now, the pair is $(51, 17)$: $51 = 3 \\cdot 17 + 0$ — remainder zero: stop after two divisions.',
                    'So, the survivor is the last nonzero remainder, $17$.',
                    'Hence $\\gcd(68, 51) = 17$ — and indeed $68 = 4 \\cdot 17$, $51 = 3 \\cdot 17$.',
                  ],
                  answer: 'gcd(68, 51) = 17',
                },
                {
                  q: 'Run the subtraction form on $(48, 18)$: list every state of the pair and count the subtractions. Then check the answer with the division loop.',
                  solution: [
                    'Split: subtract the smaller from the larger, repeatedly: $(48, 18) \\to (30, 18)$ — one.',
                    'Now, $(30, 18) \\to (12, 18)$ — two; $(12, 18) \\to (12, 6)$ — three; $(12, 6) \\to (6, 6)$ — four.',
                    'So, the pair has met: $(6, 6)$ — the survivor is $6$, after four subtractions.',
                    'Check by the division loop: $48 = 2 \\cdot 18 + 12$, then $18 = 1 \\cdot 12 + 6$, then $12 = 2 \\cdot 6 + 0$ — survivor $6$, in three divisions.',
                    'Hence both engines answer $6$: the loop is the walk with its repeats compressed (Lesson 2.1’s point — repeated subtraction *is* division).',
                  ],
                  answer: 'gcd(48, 18) = 6 — four subtractions, or three divisions',
                },
                {
                  q: 'Find $\\gcd(1{,}071, 462)$ and write down the quotient sequence.',
                  solution: [
                    'Split: $1{,}071 = 2 \\cdot 462 + 147$.',
                    'Now, $462 = 3 \\cdot 147 + 21$.',
                    'So, $147 = 7 \\cdot 21 + 0$ — stop; the survivor is $21$.',
                    'Hence the quotient sequence is $(2, 3, 7)$ and $\\gcd(1{,}071, 462) = 21$ — check: $21 \\cdot 51 = 1{,}071$ and $21 \\cdot 22 = 462$.',
                  ],
                  answer: 'gcd(1,071, 462) = 21, quotients (2, 3, 7)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Use the Euclidean loop on $(4{,}595, 3{,}570)$. How many divisions does it take, what is the HCF, and why is this faster than FM 3.3’s methods here?',
                  solution: [
                    'Split: $4{,}595 = 1 \\cdot 3{,}570 + 1{,}025$.',
                    'Now, $3{,}570 = 3 \\cdot 1{,}025 + 495$; $1{,}025 = 2 \\cdot 495 + 35$; $495 = 14 \\cdot 35 + 5$; $35 = 7 \\cdot 5 + 0$.',
                    'So, five divisions in all; the survivor is $5$.',
                    'Take: the common divisors are just $1$ and $5$, so the HCF is $5$ — and the loop never needed to know that 5 is prime.',
                    'Hence the comparison: FM 3.3’s listing method would test every candidate up to $3{,}570$, and the prime-factor method would factor both numbers first — the loop settles it in five divisions.',
                  ],
                  answer: 'gcd(4,595, 3,570) = 5, in five divisions',
                },
                {
                  q: 'Reduce the fraction $\\frac{210}{45}$ to lowest terms using the Euclidean algorithm, and name the Foundation Mathematics lesson whose ladder you are running.',
                  solution: [
                    'Split: Illustration 1 already ran the loop: $\\gcd(210, 45) = 15$.',
                    'Now, divide numerator and denominator by the gcd: $\\frac{210}{45} = \\frac{210/15}{45/15} = \\frac{14}{3}$ — the cancellation form $ac \\mid bc \\Leftrightarrow a \\mid b$ (Lesson 2.2) says nothing is lost.',
                    'So, $\\frac{14}{3}$ is fully reduced: the scaled pair is coprime, $\\gcd(14, 3) = 1$.',
                    'Hence the ladder is FM 4.2’s (Equivalent Fractions and Simplification) — this lesson proved that the ladder’s rung *is* the gcd, which FM took as computed.',
                  ],
                  answer: '210/45 = 14/3, via gcd 15',
                },
                {
                  q: 'Compute $\\mathrm{lcm}(210, 45)$ from the gcd, and verify the product rule $\\gcd \\cdot \\mathrm{lcm} = a \\cdot b$ on the pair.',
                  solution: [
                    'Split: FM 3.5’s product rule: $\\gcd(a, b) \\cdot \\mathrm{lcm}(a, b) = a \\cdot b$.',
                    'Now, with $\\gcd(210, 45) = 15$: $\\mathrm{lcm}(210, 45) = \\frac{210 \\cdot 45}{15} = \\frac{9{,}450}{15} = 630$.',
                    'So, check both: $630 = 3 \\cdot 210$ and $630 = 14 \\cdot 45$ — a common multiple.',
                    'Check leastness too: the smaller multiples of 210 are 210 and 420, and $420 = 9 \\cdot 45 + 15$ misses by the old stub — so 630 is the least.',
                    'Hence the product rule verifies: $15 \\cdot 630 = 9{,}450 = 210 \\cdot 45$ ✓ — the algorithm now computes the HCF without factorising, so the LCM comes along free.',
                  ],
                  answer: 'lcm(210, 45) = 630; 15·630 = 210·45 = 9,450',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove that consecutive natural numbers are always coprime: $\\gcd(n, n+1) = 1$ for every $n \\ge 1$. Then exhibit the Bézout certificate for $(8, 9)$, $(20, 21)$ and $(99, 100)$.',
                  solution: [
                    'Split: let $d$ divide both $n$ and $n + 1$.',
                    'Now, $d$ divides their difference: $(n + 1) - n = 1$ — the invariance lemma’s forward arrow, one step.',
                    'So, $d \\mid 1$ forces $d = 1$: the pair is coprime.',
                    'Take the certificates by the same one-step subtraction: $9 - 8 = 1$ gives $1 = 1 \\cdot 9 - 1 \\cdot 8$; $21 - 20 = 1$ gives $1 = 1 \\cdot 21 - 1 \\cdot 20$; $100 - 99 = 1$ gives $1 = 1 \\cdot 100 - 1 \\cdot 99$.',
                    'Hence every consecutive pair is coprime, with the flattest Bézout line there is.',
                  ],
                  answer: 'gcd(n, n+1) = 1; e.g. 1 = 1·9 − 1·8, 1 = 1·21 − 1·20, 1 = 1·100 − 1·99',
                },
                {
                  q: 'Express $\\gcd(1{,}071, 462) = 21$ as a combination of $1{,}071$ and $462$ by backward substitution, checking each step.',
                  solution: [
                    'Split: climb the chain of Exercise 3 from the bottom: $21 = 462 - 3 \\cdot 147$.',
                    'Now, substitute $147 = 1{,}071 - 2 \\cdot 462$: $21 = 462 - 3 \\cdot (1{,}071 - 2 \\cdot 462) = 7 \\cdot 462 - 3 \\cdot 1{,}071$.',
                    'So, read it as a natural difference: $7 \\cdot 462 = 3{,}234$ and $3 \\cdot 1{,}071 = 3{,}213$, and $3{,}234 - 3{,}213 = 21$ ✓.',
                    'Hence Bézout’s identity for the pair: $\\gcd(1{,}071, 462) = 7 \\cdot 462 - 3 \\cdot 1{,}071$ — coefficients $(x, y) = (-3, 7)$ in the signed dress.',
                  ],
                  answer: '21 = 7·462 − 3·1,071 (check: 3,234 − 3,213 = 21)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Build the full extended table for $(a, b) = (4{,}595, 3{,}570)$: every row $(r, x, y)$ with $x \\cdot a + y \\cdot b = r$, and read Bézout’s identity off the last nonzero row.',
                  solution: [
                    'Split: seed the table with the inputs: $4{,}595 = 1 \\cdot 4{,}595 + 0 \\cdot 3{,}570$ and $3{,}570 = 0 \\cdot 4{,}595 + 1 \\cdot 3{,}570$.',
                    'Now, each new row is two up minus (quotient) × one up: quotient 1 gives $1{,}025 = 1 \\cdot 4{,}595 - 1 \\cdot 3{,}570$; quotient 3 gives $495 = -3 \\cdot 4{,}595 + 4 \\cdot 3{,}570$; quotient 2 gives $35 = 7 \\cdot 4{,}595 - 9 \\cdot 3{,}570$; quotient 14 gives $5 = -101 \\cdot 4{,}595 + 130 \\cdot 3{,}570$; quotient 7 closes with $0 = 714 \\cdot 4{,}595 - 919 \\cdot 3{,}570$.',
                    'So, verify the gcd row as a natural difference: $130 \\cdot 3{,}570 = 464{,}100$, $101 \\cdot 4{,}595 = 464{,}095$ — difference $5$ ✓ (and the zero row: $714 \\cdot 4{,}595 = 919 \\cdot 3{,}570 = 3{,}280{,}830$ ✓).',
                    'Hence the last nonzero row is Bézout’s identity: $\\gcd(4{,}595, 3{,}570) = 130 \\cdot 3{,}570 - 101 \\cdot 4{,}595$ — and the table’s coefficients are small, as promised: $|{-101}| \\le 3{,}570/5$ and $|130| \\le 4{,}595/5$.',
                  ],
                  answer: '5 = 130·3,570 − 101·4,595; all seven rows evaluate',
                },
                {
                  q: 'Run the loop on the consecutive Fibonacci pair $(6{,}765, 4{,}181)$. Count the divisions, list the quotients, and check Lamé’s bound for this instance.',
                  solution: [
                    'Split: the chain begins $6{,}765 = 1 \\cdot 4{,}181 + 2{,}584$, then $4{,}181 = 1 \\cdot 2{,}584 + 1{,}597$ — every quotient 1 while the pair stays Fibonacci.',
                    'Now, the remainders descend $2{,}584 > 1{,}597 > 987 > \\dots > 3 > 2 > 1 > 0$: eighteen divisions in all, the last sentence $2 = 2 \\cdot 1 + 0$ the only quotient above 1.',
                    'So, the quotient sequence is seventeen 1’s then a 2, and the survivor is $\\gcd(6{,}765, 4{,}181) = 1$ — consecutive Fibonacci numbers are coprime.',
                    'Check Lamé: the smaller number 4,181 has 4 decimal digits, and $18 \\le 5 \\cdot 4 = 20$ ✓.',
                    'Hence the instance sits just under Lamé’s ceiling — the Fibonacci pairs are the loop’s worst customers, shrinking by barely a factor of $\\varphi$ per step.',
                  ],
                  answer: '18 divisions; quotients 1 (×17) then 2; gcd = 1; Lamé 18 ≤ 20',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the scaled reduction: if $d = \\gcd(a, b)$, then $\\gcd(a/d, b/d) = 1$. Then apply it to $(210, 45)$ and write the scaled Bézout line.',
                  solution: [
                    'Split: Bézout supplies the coefficients: $d = ax + by$ for whole numbers $x, y$.',
                    'Now, divide the identity through by $d$ — legal, since $d \\mid d$, $d \\mid a$, $d \\mid b$ and cancellation holds (Lesson 2.2): $1 = (a/d)x + (b/d)y$.',
                    'So, the scaled pair $(a/d, b/d)$ admits a combination equal to 1 — and any common divisor of the scaled pair would divide that combination, hence divide 1, hence be 1.',
                    'Take: $\\gcd(a/d, b/d) = 1$ — the scaled pair is always coprime.',
                    'Hence the instance: $(210, 45)$ scales to $(14, 3)$, and dividing $15 = 5 \\cdot 45 - 1 \\cdot 210$ by 15 gives the scaled certificate $1 = 5 \\cdot 3 - 1 \\cdot 14$ ✓ ($15 - 14 = 1$).',
                  ],
                  answer: 'gcd(a/d, b/d) = 1; instance: 1 = 5·3 − 1·14',
                },
                {
                  q: 'Explain why the consecutive Fibonacci pairs are the Euclidean loop’s worst case: why does every quotient come out 1, and what does that do to the descent? Verify the pattern on $(5, 8)$ and $(8, 13)$.',
                  solution: [
                    'Split: the Fibonacci recurrence $F_{k+1} = F_k + F_{k-1}$ is itself a division sentence: $F_{k+1} = 1 \\cdot F_k + F_{k-1}$, with remainder $F_{k-1} < F_k$ — quotient exactly 1, the smallest a legal quotient can be.',
                    'Now, a quotient of 1 removes only one copy of the divisor: the pair $(F_{k+1}, F_k)$ hands down to $(F_k, F_{k-1})$ — the slowest possible shrink per division.',
                    'So, any pair whose quotients are all 1 descends Fibonacci-fashion — the longest descent available for entries of that size, which is what Lamé’s bound makes precise.',
                    'Check the small runs: $8 = 1 \\cdot 5 + 3$, $5 = 1 \\cdot 3 + 2$, $3 = 1 \\cdot 2 + 1$, $2 = 2 \\cdot 1 + 0$ — three 1’s then a 2, survivor $\\gcd(5, 8) = 1$; and $13 = 1 \\cdot 8 + 5$ before that chain — four 1’s then a 2, survivor $\\gcd(8, 13) = 1$.',
                    'Hence the pattern: every Fibonacci pair is coprime, and every run is the slowest of its size.',
                  ],
                  answer: 'quotient 1 = slowest shrink; (5, 8) and (8, 13) both run all-1s down to gcd 1',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. One algorithm, two engines: the subtraction form Euclid actually wrote and the division form this lesson certified. Write a connected account: what the invariance lemma says, where the least-number principle enters each engine, why the division loop is the subtraction walk compressed, and what Euclid’s corollary — “a number measuring two numbers measures their greatest common measure” — contributes to the maximality half of the proof.',
                  solution: [
                    'The invariance lemma: subtraction (or its bulk form, division with remainder) preserves the common-divisor set exactly — both directions are the combination law — so the gcd holds still while the pair shrinks.',
                    'The LNP in the subtraction engine: the pair-sum strictly decreases ($66 > 48 > 30 > 18 > 12$ on $(48, 18)$), and a natural staircase cannot descend forever — Euclid’s process halts because the naturals are well-ordered, a wall his Elements never states (Joyce’s guide flags the missing postulate; Lesson 1.3’s least-number principle is the modern completion).',
                    'The LNP in the division engine: the same descent in bulk — the remainders $b > r_1 > r_2 > \\dots$ strictly descend, and Lesson 2.1’s band guarantees each is a legal remainder.',
                    'The compression: subtracting $b$ from $a$ repeatedly *is* division — $q$ counts the subtractions and $r$ is what is left (Lesson 2.1’s descent walk standing up straight); the loop runs the walk with repeats compressed, which is why both engines return the same survivor — the verified instance: $(48, 18)$, four subtractions, three divisions, answer 6.',
                    'The corollary’s role: the up-rail shows the survivor divides both inputs; the down-rail is precisely the corollary — every common divisor divides the survivor; and the order link converts “divides” into “$\\le$”, crowning the survivor as the greatest common measure. Without the corollary half, the survivor would be just some common divisor.',
                    'Hence one theorem, two speeds: the subtraction form and the division loop are the same algorithm at different compressions, both certified by the same two walls — the combination law and the least-number principle.',
                  ],
                  answer: 'One algorithm, two engines: combination law + LNP certify both; the corollary crowns the survivor',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The Euclidean step',
          latex: '\\gcd(a, b) = \\gcd(a - b, b) = \\gcd(b, a \\bmod b) \\quad (a > b \\ge 1)',
          note: 'The invariance lemma twice over: subtraction and its bulk form both preserve the common-divisor set.',
        },
        {
          kind: 'formula',
          name: 'The Euclidean algorithm',
          latex: '(a, b) \\to (b, a \\bmod b) \\to \\dots \\to (d, 0)',
          note: 'Halts by descent (the LNP’s third burn); the survivor $d$ — the last nonzero remainder — is $\\gcd(a, b)$. Instance: $(210, 45) \\to (45, 30) \\to (30, 15) \\to (15, 0)$, $d = 15$.',
        },
        {
          kind: 'formula',
          name: 'Bézout’s identity',
          latex: '\\gcd(a, b) = ax + by \\quad \\text{for some whole } x, y',
          note: 'Backward substitution derives it; the extended table computes it. Read negative coefficients as differences of natural multiples until chapter 6.',
        },
        {
          kind: 'formula',
          name: 'The coprime certificate',
          latex: '\\gcd(a, b) = 1 \\ \\Longleftrightarrow\\ 1 = ax + by \\text{ for some whole } x, y',
          note: 'Bézout at $d = 1$. Consecutive numbers: $1 = 1 \\cdot (n+1) - 1 \\cdot n$ — always coprime.',
        },
        {
          kind: 'formula',
          name: 'The LCM payoff',
          latex: '\\gcd(a, b) \\cdot \\mathrm{lcm}(a, b) = a \\cdot b',
          note: 'FM 3.5’s rule, now fully armed: $\\mathrm{lcm}(a, b) = \\frac{ab}{\\gcd(a, b)}$ with the gcd from the loop — instance $\\mathrm{lcm}(210, 45) = 630$.',
        },
        {
          kind: 'para',
          text: 'The survivor now has two faces. It is the *greatest common measure* — the maximality argument crowned it — and it is a *combination*: Bézout wrote it as $ax + by$. The second face is the deeper one, because it turns Lesson 2.2’s combination law from a curiosity into an instrument. The law said: anything dividing both $a$ and $b$ divides every combination. Bézout now says the traffic runs the other way: the right combination produces the gcd itself — and therefore, scaled by any natural multiple, any multiple of the gcd. One question begs to be asked: which targets $c$ can $ax + by$ hit, and when it hits, what do *all* the hitting pairs look like? That is the linear Diophantine equation — and the next lesson, the chapter’s last, solves it completely: criterion, full solution family, and the counting of the makeable answers.',
        },
      ],
    },
    {
      id: 'ans-linear-diophantine-equations',
      number: '2.4',
      title: 'Linear Diophantine Equations',
      prerequisites: ['ans-euclidean-algorithm-proven-bezout-identity'],
      sources: ['diophantus-arithmetica', 'sylvester-1884-frobenius', 'bachet-1624-problemes', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'Linear Diophantine equation ax + by = c',
        'The criterion: solvable ⟺ gcd | c',
        'Bézout scaled by c/d',
        'The particular solution',
        'The full solution family',
        'The shift vector (b/d, −a/d)',
        'The nonnegative window',
        'Sylvester’s two-denomination answer',
      ],
      objectives: [
        'State the solvability criterion for $ax + by = c$ and prove it in both directions — the combination law for necessity, Bézout scaled for sufficiency',
        'Prove the full solution family $(x_0 + \\frac{b}{d}t,\\ y_0 - \\frac{a}{d}t)$ in both directions, running Bézout’s coprime certificate where Euclid’s lemma will later stand',
        'Count and list the nonnegative solutions by slicing the family to the window, using the ceiling–floor grips',
        'Deploy the theory on the exam staples — exact-payment problems, the reduced equation, and the two-denomination Frobenius question',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Everything this chapter built now assembles into one machine. Lesson 2.2’s combination law said: anything dividing both $a$ and $b$ divides every combination $ax + by$. Lesson 2.3’s Bézout identity said: the gcd itself *is* a combination. Put the two together and a two-thousand-year-old question falls open: given whole numbers $a$, $b$ and a target $c$, when can the equation $ax + by = c$ be solved in whole numbers — and when it can, what do *all* its solutions look like? This lesson answers both halves completely. The criterion is two old laws stapled together; the solution family is one line marched out in equal steps; and the counting of the makeable answers is the remainder band of Lesson 2.1, gripping the family from both sides.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Linear Diophantine equations',
          text: 'A **linear Diophantine equation** in the unknowns $x$ and $y$ is an equation $ax + by = c$ with given natural numbers $a \\ge 1$, $b \\ge 1$ (the **coefficients**) and $c \\ge 0$ (the **target**), to be solved for **whole-number** $x$ and $y$ (zero allowed). A pair $(x_0, y_0)$ with $ax_0 + by_0 = c$ is a **particular solution**; the set of all such pairs is the **solution set**. The honest boundary: this book has not yet built the negative integers (Chapter 6 does), so where a solution wants a negative coordinate we read it as a difference of natural multiples — the larger product minus the smaller — and verify by direct arithmetic, exactly as Lesson 2.3 flagged for Bézout’s coefficients.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Diophantus of Alexandria, c. 250 AD',
          text: 'The *Arithmetica* of Diophantus — about 290 problems in thirteen books, ten of which survive — asks for whole-number answers to equations, and the ask defines a subject: an equation hunted in whole numbers is called **Diophantine**, and Diophantus is remembered as “the father of algebra”. The linear case solved here is the gateway to that country. The route into early-modern Europe ran through Claude-Gaspard Bachet de Méziriac: his *Problèmes plaisants* (first 1612, expanded 1624) treats the two-weights problem that *is* the linear Diophantine equation in costume, and contains the integer ancestor of Bézout’s identity (Lesson 2.3) — while his 1621 edition of the *Arithmetica* is the very copy in whose margins Fermat later scribbled his famous note.',
        },
        { kind: 'heading', text: 'The criterion: when solutions exist at all' },
        {
          kind: 'derivation',
          title: 'The solvability criterion',
          statement:
            'Claim: the equation $ax + by = c$ with $a, b \\ge 1$ and $c \\ge 0$ has whole-number solutions **if and only if** $\\gcd(a, b) \\mid c$. One direction is Lesson 2.2’s combination law; the other is Bézout, scaled.',
          steps: [
            {
              label: 'Necessity: solutions cannot dodge the gcd',
              formula: 'd = \\gcd(a, b): \\quad d \\mid a, \\ d \\mid b \\ \\Rightarrow\\ d \\mid (ax + by) = c',
              explanation:
                'Suppose $ax_0 + by_0 = c$ has a whole-number solution. Then $c$ is a combination of $a$ and $b$ — and Lesson 2.2’s combination law says every common divisor of the coefficients divides every combination. So $d \\mid c$: when the gcd misses the target, no solution can exist. The parity instance makes it visible: $4x + 6y = 2(2x + 3y)$ is always even — it can never be $7$.',
            },
            {
              label: 'Sufficiency: Bézout, scaled by c/d',
              formula: 'd = ax_B + by_B \\ \\Rightarrow\\ c = a \\left( x_B \\cdot \\tfrac{c}{d} \\right) + b \\left( y_B \\cdot \\tfrac{c}{d} \\right)',
              explanation:
                'If $d \\mid c$, the multiplier $c/d$ is a natural number. Bézout (Lesson 2.3) writes the gcd itself as a combination: $d = ax_B + by_B$ for whole numbers $(x_B, y_B)$. Multiplying that identity through by $c/d$ produces a solution of the target equation — the pair $\\left(x_B \\frac{c}{d},\\ y_B \\frac{c}{d}\\right)$. The coefficients may be negative (Bézout’s often are); the difference reading certifies the instance.',
            },
          ],
          result:
            '$ax + by = c$ is solvable in whole numbers exactly when $\\gcd(a, b) \\mid c$ — necessity from the combination law, sufficiency from Bézout. Two chapters of machinery, one line of theory.',
        },
        {
          kind: 'para',
          text: 'Notice what the criterion does *not* say. It decides existence in whole numbers — coordinates allowed to subtract. It says nothing yet about solutions in the nonnegative quadrant, the “makeable” readings that examinations actually want; that is the window arithmetic below, and it is genuinely harder — the criterion passes where the quadrant fails.',
        },
        {
          kind: 'example',
          title: 'Apply the criterion to 12x + 42y = 5 — and see the veto in the algebra itself',
          steps: [
            'Split: compute the gcd the certified way — the Euclidean loop: $42 = 3 \\cdot 12 + 6$, then $12 = 2 \\cdot 6 + 0$: $d = \\gcd(12, 42) = 6$.',
            'Now, test the criterion: does $6 \\mid 5$? No — $5 = 0 \\cdot 6 + 5$ leaves the old stub: the gcd misses the target.',
            'So, no whole-number solutions exist.',
            'Check it in the algebra: $12x + 42y = 6(2x + 7y)$ — the left side is a multiple of 6 whatever whole $x, y$ do, and 5 is not.',
            'Hence the criterion’s veto agrees with the divisibility structure: the target must be a multiple of the gcd because every combination is.',
          ],
        },
        { kind: 'heading', text: 'The full solution family' },
        {
          kind: 'para',
          text: 'One solution is never the whole story. The equation $2x + 7y = 10$ is solved by $(5, 0)$ — and by $(-2, 2)$, $(-9, 4)$, $(12, -2)$: the solutions are not scattered; they march in a line, equally spaced. The spacing is no accident: subtracting two solution statements kills $c$ and leaves a relation between the pairs, and the relation has a stride. Here is the complete structure, proved in both directions.',
        },
        {
          kind: 'derivation',
          title: 'The solution family',
          statement:
            'Claim: let $d = \\gcd(a, b)$ and let $(x_0, y_0)$ be one whole-number solution of $ax + by = c$. Then the solutions are exactly the pairs $x = x_0 + \\frac{b}{d} t$, $y = y_0 - \\frac{a}{d} t$, for whole numbers $t$.',
          steps: [
            {
              label: 'Every family member solves the equation',
              formula: 'a\\left(x_0 + \\tfrac{b}{d}t\\right) + b\\left(y_0 - \\tfrac{a}{d}t\\right) = ax_0 + by_0 + t\\left(\\tfrac{ab}{d} - \\tfrac{ab}{d}\\right) = c',
              explanation:
                'Substitute and watch the $t$-terms cancel: $\\frac{ab}{d}$ is a natural number (the product rule region — $d$ divides $ab$), and it enters once with $+$ and once with $-$. So the whole family rides the same equation; the shift changes the pair, never the value.',
            },
            {
              label: 'Reduce any two solutions to the coprime case',
              formula: 'a_1 = \\tfrac{a}{d}, \\ b_1 = \\tfrac{b}{d}: \\quad a_1 (x - x_0) = b_1 (y_0 - y)',
              explanation:
                'Subtract the two solution statements: $a(x - x_0) = b(y_0 - y)$. Divide through by $d$ (all three terms are multiples of $d$; Lesson 2.2’s cancellation applies) to get $a_1 (x - x_0) = b_1 (y_0 - y)$, where the reduced pair is coprime — the scaled reduction, Lesson 2.3’s Exercise 11.',
            },
            {
              label: 'Run Bézout’s coprime certificate inline',
              formula: '1 = a_1 s + b_1 u \\ \\Rightarrow\\ y_0 - y = a_1 \\left[ s (y_0 - y) + u (x - x_0) \\right]',
              explanation:
                'The scaled pair is coprime, so Bézout writes 1 as $a_1 s + b_1 u$. Multiply through by $(y_0 - y)$ and replace $b_1 (y_0 - y)$ by $a_1 (x - x_0)$ using the step-2 relation: everything on the right collects under $a_1$. So $a_1 \\mid (y_0 - y)$ — Euclid’s lemma for this one instance, run by hand (the general lemma is chapter 4’s engine; here the coprime Bézout certificate does the work directly).',
            },
            {
              label: 'Name the multiplier and finish',
              formula: 'y_0 - y = a_1 t \\ \\Rightarrow\\ y = y_0 - \\tfrac{a}{d} t, \\qquad x - x_0 = b_1 t \\ \\Rightarrow\\ x = x_0 + \\tfrac{b}{d} t',
              explanation:
                'Write $y_0 - y = a_1 t$ for the whole number $t$ the last step produced. Substituting back into step 2 and cancelling $a_1$ gives $x - x_0 = b_1 t$. So every solution is a family member — and step 1 already showed every family member is a solution. The two inclusions close.',
            },
          ],
          result:
            'The solution set is exactly the run $\\left(x_0 + \\frac{b}{d} t,\\ y_0 - \\frac{a}{d} t\\right)$, $t$ whole — one line, marching one stride at a time.',
        },
        {
          kind: 'para',
          text: 'The stride deserves its own sentence: consecutive solutions differ by exactly $\\left(\\frac{b}{d}, -\\frac{a}{d}\\right)$ — the **shift vector**. On $5x + 7y = 100$ ($d = 1$) the verified solutions $(6, 10)$, $(13, 5)$, $(20, 0)$ step by exactly $(+7, -5)$ each time. And one working habit falls out of the proof: dividing the whole equation through by $d$ — $12x + 42y = 60$ becomes $2x + 7y = 10$ — changes *nothing*: multiplying the reduced equation back by $d$ recovers the original, and cancellation runs both ways, so the two equations have literally the same solution set (the brute sweep over $\\pm 60$ finds identical pairs for both). Reduce first; the numbers shrink and the theory never notices.',
        },
        {
          kind: 'figure',
          caption:
            'The solution family of 2x + 7y = 10 — the reduced dress of 12x + 42y = 60 (d = gcd(12, 42) = 6; the cancellation law says the reduction changed nothing). The line’s whole-number points — (−9, 4), (−2, 2), (5, 0), (12, −2), the family members t = 3, 4, 5, 6 seeded from Bézout’s (−30, 10) — are spaced exactly one shift vector (+7, −2) = (b/d, −a/d) apart, as the family theorem promises. The nonnegative window grips at t = 5 alone: the single makeable point (5, 0), sitting on the x-axis.',
          svg: `<svg viewBox="0 0 920 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lattice line 2x + 7y = 10 with solution points (−9, 4), (−2, 2), (5, 0), (12, −2) spaced one step (+7, −2) apart">
  <defs>
    <marker id="lat-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <!-- light grid -->
  <g stroke="currentColor" stroke-width="0.75" opacity="0.25">
    <line x1="60" y1="60" x2="60" y2="380"/><line x1="90" y1="60" x2="90" y2="380"/><line x1="120" y1="60" x2="120" y2="380"/><line x1="150" y1="60" x2="150" y2="380"/><line x1="180" y1="60" x2="180" y2="380"/><line x1="210" y1="60" x2="210" y2="380"/><line x1="240" y1="60" x2="240" y2="380"/><line x1="270" y1="60" x2="270" y2="380"/><line x1="300" y1="60" x2="300" y2="380"/><line x1="330" y1="60" x2="330" y2="380"/><line x1="360" y1="60" x2="360" y2="380"/><line x1="390" y1="60" x2="390" y2="380"/><line x1="420" y1="60" x2="420" y2="380"/><line x1="450" y1="60" x2="450" y2="380"/><line x1="480" y1="60" x2="480" y2="380"/><line x1="510" y1="60" x2="510" y2="380"/><line x1="540" y1="60" x2="540" y2="380"/><line x1="570" y1="60" x2="570" y2="380"/><line x1="600" y1="60" x2="600" y2="380"/><line x1="630" y1="60" x2="630" y2="380"/><line x1="660" y1="60" x2="660" y2="380"/><line x1="690" y1="60" x2="690" y2="380"/><line x1="720" y1="60" x2="720" y2="380"/><line x1="750" y1="60" x2="750" y2="380"/><line x1="780" y1="60" x2="780" y2="380"/><line x1="810" y1="60" x2="810" y2="380"/><line x1="840" y1="60" x2="840" y2="380"/><line x1="870" y1="60" x2="870" y2="380"/><line x1="900" y1="60" x2="900" y2="380"/>
    <line x1="60" y1="60" x2="900" y2="60"/><line x1="60" y1="100" x2="900" y2="100"/><line x1="60" y1="140" x2="900" y2="140"/><line x1="60" y1="180" x2="900" y2="180"/><line x1="60" y1="220" x2="900" y2="220"/><line x1="60" y1="260" x2="900" y2="260"/><line x1="60" y1="300" x2="900" y2="300"/><line x1="60" y1="340" x2="900" y2="340"/><line x1="60" y1="380" x2="900" y2="380"/>
  </g>
  <!-- axes -->
  <line x1="60" y1="260" x2="900" y2="260" stroke="currentColor" stroke-width="1.5" marker-end="url(#lat-arrow)"/>
  <line x1="420" y1="380" x2="420" y2="60" stroke="currentColor" stroke-width="1.5" marker-end="url(#lat-arrow)"/>
  <text x="880" y="250" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">x</text>
  <text x="436" y="74" font-size="13" font-style="italic" fill="currentColor">y</text>
  <g font-size="12" fill="currentColor">
    <text x="60" y="282" text-anchor="middle">−12</text>
    <text x="180" y="282" text-anchor="middle">−8</text>
    <text x="300" y="282" text-anchor="middle">−4</text>
    <text x="410" y="278" text-anchor="middle">0</text>
    <text x="540" y="282" text-anchor="middle">4</text>
    <text x="660" y="282" text-anchor="middle">8</text>
    <text x="780" y="282" text-anchor="middle">12</text>
    <text x="900" y="282" text-anchor="middle">16</text>
    <text x="432" y="104">4</text>
    <text x="432" y="184">2</text>
    <text x="432" y="348">−2</text>
  </g>
  <!-- the line 2x + 7y = 10 -->
  <line x1="60" y1="65.7" x2="885" y2="380" stroke="currentColor" stroke-width="1.6"/>
  <!-- solution dots (t = 3..6) -->
  <g fill="currentColor">
    <circle cx="150" cy="100" r="5"/>
    <circle cx="360" cy="180" r="5"/>
    <circle cx="570" cy="260" r="5"/>
    <circle cx="780" cy="340" r="5"/>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="150" y="82">(−9, 4)</text>
    <text x="360" y="162">(−2, 2)</text>
    <text x="570" y="242">(5, 0)</text>
    <text x="780" y="322">(12, −2)</text>
  </g>
  <!-- the step arrow, parallel below the line -->
  <line x1="570" y1="272" x2="780" y2="352" stroke="currentColor" stroke-width="1.3" marker-end="url(#lat-arrow)"/>
  <text x="655" y="350" font-size="12.5" fill="currentColor" text-anchor="middle">one step: (+7, −2)</text>
</svg>`,
        },
        {
          kind: 'algorithm',
          title: 'Solving ax + by = c — the whole procedure',
          lines: [
            { code: 'input: a ≥ 1, b ≥ 1, c ≥ 0', note: 'the coefficients and the target' },
            { code: 'd ← gcd(a, b)   — the Euclidean loop (Lesson 2.3)', note: 'no factorisation anywhere' },
            { code: 'if c mod d ≠ 0: return "no solution"', note: 'the criterion — the gcd must divide the target' },
            { code: 'find xB, yB with a·xB + b·yB = d', note: 'Bézout by backward substitution or the extended table' },
            { code: '(x0, y0) ← (xB·(c/d), yB·(c/d))', note: 'scale the Bézout row to the target' },
            { code: 'family: x = x0 + (b/d)·t, y = y0 − (a/d)·t, t whole', note: 'every solution — the family theorem' },
            { code: 'window: keep t with both coordinates in the demanded range', note: 'nonnegative / positive / custom — the ceiling–floor grips below' },
          ],
          note: 'Six moves, all certified in this chapter: the loop (2.3), the criterion and the family (this lesson), the window arithmetic (the grips of Illustration 3).',
        },
        {
          kind: 'example',
          title: 'Solve 12x + 42y = 60 completely, and find its nonnegative solutions',
          steps: [
            'Split: the criterion first — $\\gcd(12, 42) = 6$ (Illustration 1’s loop) and $6 \\mid 60$ ✓: solutions exist.',
            'Now, reduce the equation by the gcd — the solution set will not notice: $2x + 7y = 10$.',
            'So, Bézout for the coprime pair $(2, 7)$, straight from the loop ($7 = 3 \\cdot 2 + 1$): $1 = 1 \\cdot 7 - 3 \\cdot 2$; scale by 10: $10 = 10 \\cdot 7 - 30 \\cdot 2$ — a particular solution $(-30, 10)$, read as the natural difference $70 - 60 = 10$ ✓.',
            'Take: the family — $x = -30 + 7t$, $y = 10 - 2t$, stride $(+7, -2) = (b/d, -a/d)$; spot-check $t = 5$: $(5, 0)$, and $2 \\cdot 5 + 7 \\cdot 0 = 10$ ✓.',
            'The nonnegative window: $x \\ge 0$ wants $t \\ge 30/7$, so $t \\ge 5$; $y \\ge 0$ wants $t \\le 5$. Both grips meet only at $t = 5$: the single nonnegative solution is $(5, 0)$ — $12 \\cdot 5 = 60$ ✓.',
            'And the strictly positive window is empty: $(5, 0)$’s zero coordinate disqualifies it, and the neighbours $t = 4, 6$ push a coordinate negative — $(-2, 2)$ and $(12, -2)$ as the figure showed.',
          ],
        },
        {
          kind: 'example',
          title: 'In how many ways can ₹100 be paid exactly with ₹5 and ₹7 notes?',
          steps: [
            'Split: the equation is $5x + 7y = 100$ with $x, y \\ge 0$; the criterion passes ($\\gcd(5, 7) = 1$ divides everything).',
            'Now, a particular solution by inspection: $100 = 20 \\cdot 5 + 0 \\cdot 7$ — $(20, 0)$; the family: $x = 20 + 7t$, $y = -5t$, stride $(+7, -5)$.',
            'So, the window: $x \\ge 0$ wants $t \\ge -20/7$, i.e. $t \\ge -2$; $y \\ge 0$ wants $t \\le 0$. The window is $t \\in \\{-2, -1, 0\\}$ — three values.',
            'Take the three members: $t = -2$: $(6, 10)$ — $30 + 70 = 100$ ✓; $t = -1$: $(13, 5)$ — $65 + 35 = 100$ ✓; $t = 0$: $(20, 0)$ — $100 + 0 = 100$ ✓.',
            'Hence exactly three ways — and if both denominations must appear at least once, the window tightens to $t \\in \\{-2, -1\\}$: two ways.',
          ],
        },
        { kind: 'heading', text: 'The nonnegative window: counting the makeable answers' },
        {
          kind: 'para',
          text: 'The window arithmetic of those Illustrations is a reusable instrument. From the family $x = x_0 + \\frac{b}{d} t$, $y = y_0 - \\frac{a}{d} t$, the nonnegative grips are $t \\ge -x_0 / (b/d)$ — rounded up to the next whole number — and $t \\le y_0 / (a/d)$ — rounded down. The two grips cut an interval of whole numbers out of the endless family: empty (the grips disagree), a single point (they meet exactly), or a run (room between them). Everything examination questions ask about “solutions in nonnegative integers” is this interval, counted. Instance grips worth memorising: $\\lceil 30/7 \\rceil = 5 = \\lfloor 10/2 \\rfloor$ gave the unique $(5, 0)$; $\\lceil 3/7 \\rceil = 1 > 0 = \\lfloor 1/2 \\rfloor$ gave the empty window on $12x + 42y = 6$.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Solvable is not the same as makeable',
          text: 'The criterion decides whole-number solutions; the nonnegative window is a different, harder question. The instance to remember: $12x + 42y = 6$ passes the criterion ($6 \\mid 6$) and owns the whole family $x = -3 + 7t$, $y = 1 - 2t$ — but the nonnegative window is empty: $t \\ge 1$ and $t \\le 0$ cannot both hold. Six is solvable in whole numbers and makeable in no nonnegative way — the smallest nonzero amount the left side can produce is 12. The full theory of which targets *are* makeable from two denominations is Sylvester’s (the theorem box below).',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The two-denomination Frobenius answer — Sylvester, 1884–85',
          text: 'For coprime $a$ and $b$, the largest amount **not** expressible as $ax + by$ with nonnegative $x, y$ is $ab - a - b$, and the number of unmakeable amounts is $(a - 1)(b - 1)/2$. The general multi-denomination problem carries Frobenius’ name. This book verifies the instances and defers the general proof to chapter 4’s toolkit. Swept instances: stamps $4$ and $9$ — the gaps are $1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 19, 23$: twelve of them ($3 \\cdot 8 / 2 = 12$ ✓), the last $4 \\cdot 9 - 4 - 9 = 23$ ✓, and 24 onward all makeable. Stamps $4$ and $7$: nine gaps, the last $28 - 11 = 17$ ✓. Lesson 1.3’s 3-and-5 stamp descent found the last unmakeable amount 7 — and $15 - 3 - 5 = 7$ ✓: the same formula, now standing on a theory.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'The staples are all one algorithm now. “Show that $4x + 6y = 7$ has no integral solution” — the criterion, one line (the left side is even). “Find all solutions of $3x + 5y = 16$ in positive integers” — particular, family, window: the unique answer $(2, 2)$. “In how many ways can ₹100 be paid in ₹5 and ₹7 notes?” — Illustration 3’s count: three. “Which amounts are impossible with two denominations?” — Sylvester’s $ab - a - b$. Khattar’s QA chapter 1 drills exactly these shapes. The larger payoff is structural: the remainder questions of chapter 5, the base-conversion digit hunts of chapter 3 and the factorial zeros of chapter 4 all run on the divide-keep-the-remainder spine this chapter built — and this lesson is its summit.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Linear Diophantine equation', def: 'An equation $ax + by = c$ ($a, b \\ge 1$, $c \\ge 0$) hunted for whole-number $x, y$ — named for Diophantus of Alexandria (c. 250 AD), the *Arithmetica*’s whole-number ask.' },
            { term: 'Solvability criterion', def: '$ax + by = c$ is solvable in whole numbers iff $\\gcd(a, b) \\mid c$: necessity by the combination law, sufficiency by Bézout scaled by $c/d$.' },
            { term: 'Particular solution', def: 'One pair $(x_0, y_0)$ with $ax_0 + by_0 = c$ — produced by scaling Bézout’s row; any member seeds the same family.' },
            { term: 'Solution family', def: 'All solutions: $x = x_0 + \\frac{b}{d} t$, $y = y_0 - \\frac{a}{d} t$, $t$ whole — proven in both directions (members solve; solutions are members).' },
            { term: 'Shift vector', def: 'The stride $(b/d, -a/d)$: consecutive solutions differ by exactly it — the family is one line, equally spaced.' },
            { term: 'The reduced equation', def: 'Dividing through by $d = \\gcd(a, b)$: $a_1 x + b_1 y = c_1$ has literally the same solution set (multiplication and cancellation both ways). Always reduce first.' },
            { term: 'Nonnegative window', def: 'The whole-number interval $\\lceil -x_0/(b/d) \\rceil \\le t \\le \\lfloor y_0/(a/d) \\rfloor$ where both coordinates stay $\\ge 0$ — empty, single, or many. The exam-counting device.' },
            { term: 'Frobenius number', def: 'For coprime $a, b$: the largest unmakeable amount $ab - a - b$, with $(a - 1)(b - 1)/2$ gaps in all (Sylvester, 1884–85). Instance: 4 and 9 → 23 with twelve gaps.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'How many whole-number solutions does $4x + 6y = 7$ have?',
              options: ['None — $\\gcd(4, 6) = 2$ does not divide 7', 'Exactly one', 'Exactly three', 'Infinitely many'],
              answer: 0,
              explain: 'The criterion vetoes it: $4x + 6y = 2(2x + 3y)$ is even whatever whole $x, y$ do, and 7 is odd — no solution can exist (the brute sweep over $\\pm 60$ confirms). The other options would require the criterion to pass.',
            },
            {
              q: 'Which pair solves $2x + 7y = 10$?',
              options: ['(3, 1)', '(2, 2)', '(5, 0)', '(1, 2)'],
              answer: 2,
              explain: '$2 \\cdot 5 + 7 \\cdot 0 = 10$ ✓. The distractors evaluate to 13, 18 and 16 — each was checked in the verify script before this page was written.',
            },
            {
              q: 'One solution of $2x + 7y = 10$ is $(5, 0)$, and the family strides by $(+7, -2)$. Which is the next solution as $t$ grows?',
              options: ['(12, −2)', '(10, −2)', '(12, −3)', '(11, −2)'],
              answer: 0,
              explain: '$(12, -2) = (5, 0) + (7, -2)$, and it solves the equation: $24 - 14 = 10$ ✓. The distractors evaluate to 6, 3 and 8 — none lands on the line.',
            },
            {
              q: 'How many nonnegative solutions does $5x + 7y = 100$ have?',
              options: ['2', '3 — (20, 0), (13, 5) and (6, 10)', '4', 'Infinitely many'],
              answer: 1,
              explain: 'The window $t \\in \\{-2, -1, 0\\}$ holds exactly three members; the strictly positive sub-window drops $(20, 0)$ and leaves two. Infinitely many is the whole-number family’s shape before the window grips — a good reminder that the quadrant is what makes the answer finite.',
            },
            {
              q: 'You divide $12x + 42y = 60$ through by $d = \\gcd(12, 42) = 6$, getting $2x + 7y = 10$. What happened to the solution set?',
              options: [
                'It shrank — dividing loses solutions',
                'It grew — the smaller coefficients admit more',
                'Nothing — by the cancellation law the two equations have exactly the same solutions',
                'It became finite',
              ],
              answer: 2,
              explain: 'Multiplying the reduced equation by 6 recovers the original, and cancellation (Lesson 2.2) runs both ways — the brute sweep finds literally the same pairs for both equations (verified over $\\pm 60$). Reduce first, always: lighter numbers, identical theory.',
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
                  q: 'Apply the criterion to each: does $6x + 10y = 4$ have whole-number solutions? What about $6x + 10y = 7$? And $6x + 10y = 8$? Exhibit one solution for each yes.',
                  solution: [
                    'Split: $\\gcd(6, 10) = 2$ — the gatekeeper.',
                    'Now, $2 \\mid 4$: yes — $(-1, 1)$: $-6 + 10 = 4$ ✓ (read as the difference $10 - 6$).',
                    'So, for 7: $2 \\nmid 7$ — no solutions; the left side is $2(3x + 5y)$, always even, and 7 is odd.',
                    'And $2 \\mid 8$: yes — $(-2, 2)$: $-12 + 20 = 8$ ✓.',
                    'Hence the criterion sorts the trio exactly: yes, no, yes.',
                  ],
                  answer: '6x + 10y = 4 ✓ (−1, 1); = 7 ✗; = 8 ✓ (−2, 2)',
                },
                {
                  q: 'Verify that $(x, y) = (-3, 1)$ solves $12x + 42y = 6$ — as a difference of natural multiples.',
                  solution: [
                    'Split: the signed dress: $12 \\cdot (-3) + 42 \\cdot 1 = -36 + 42$.',
                    'Now, as a natural difference: $42 \\cdot 1 - 12 \\cdot 3 = 42 - 36 = 6$ ✓.',
                    'So, the pair solves — it is exactly Bézout’s row for $(12, 42)$: $6 = 42 - 3 \\cdot 12$ (Lesson 2.3’s loop: $42 = 3 \\cdot 12 + 6$).',
                    'Hence $(-3, 1)$ is a particular solution of $12x + 42y = 6$.',
                  ],
                  answer: '42 − 36 = 6 ✓',
                },
                {
                  q: 'Find one nonnegative solution of $3x + 5y = 16$ and check it.',
                  solution: [
                    'Split: search small: $x = 2$ leaves $16 - 6 = 10 = 2 \\cdot 5$ — so $y = 2$.',
                    'Now, check: $3 \\cdot 2 + 5 \\cdot 2 = 6 + 10 = 16$ ✓.',
                    'So, $(2, 2)$ is a nonnegative solution — in fact the only one, as Exercise 5 proves.',
                    'Hence the answer: two 3s and two 5s.',
                  ],
                  answer: '(2, 2): 6 + 10 = 16 ✓',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Solve $12x + 42y = 6$ in whole numbers: write the family, list the members for $t = -1, 0, 1, 2$, and show the nonnegative window is empty.',
                  solution: [
                    'Split: Bézout for $(12, 42)$: the loop gives $42 = 3 \\cdot 12 + 6$, so $6 = 42 - 3 \\cdot 12$ — particular $(-3, 1)$, no scaling needed ($c = d$).',
                    'Now, the family: $d = 6$, so $b/d = 7$ and $a/d = 2$: $x = -3 + 7t$, $y = 1 - 2t$.',
                    'So, the members: $t = -1$: $(-10, 3)$ — $42 \\cdot 3 - 12 \\cdot 10 = 126 - 120 = 6$ ✓; $t = 0$: $(-3, 1)$ ✓; $t = 1$: $(4, -1)$ — $48 - 42 = 6$ ✓; $t = 2$: $(11, -3)$ — $132 - 126 = 6$ ✓.',
                    'Take the window: $x \\ge 0$ wants $t \\ge 3/7$, so $t \\ge 1$; $y \\ge 0$ wants $t \\le 1/2$, so $t \\le 0$ — the grips disagree: the window is empty.',
                    'Hence 6 is solvable in whole numbers but makeable in no nonnegative way — the criterion is necessary and sufficient for whole numbers, and the quadrant asks for more.',
                  ],
                  answer: 'family (−3 + 7t, 1 − 2t); all four members verify; the nonnegative window is empty',
                },
                {
                  q: 'Solve $3x + 5y = 16$ completely from Bézout, and show that $(2, 2)$ is its only nonnegative solution.',
                  solution: [
                    'Split: Bézout for $(3, 5)$ — the loop: $5 = 1 \\cdot 3 + 2$, $3 = 1 \\cdot 2 + 1$; climb: $1 = 3 - 1 \\cdot 2 = 3 - (5 - 1 \\cdot 3) = 2 \\cdot 3 - 1 \\cdot 5$.',
                    'Now, scale by 16: $16 = 32 \\cdot 3 - 16 \\cdot 5$ — particular $(32, -16)$, read as $96 - 80 = 16$ ✓.',
                    'So, the family: $x = 32 + 5t$, $y = -16 - 3t$; the grips: $x \\ge 0$ wants $t \\ge -32/5$, so $t \\ge -6$; $y \\ge 0$ wants $t \\le -16/3$, so $t \\le -6$.',
                    'Take: the grips meet at the single value $t = -6$: $x = 32 - 30 = 2$, $y = -16 + 18 = 2$ — the unique nonnegative solution $(2, 2)$ ✓ ($6 + 10 = 16$).',
                    'Hence the same solution reappears whichever particular seeds the family — the family is the object; the seed is scaffolding.',
                  ],
                  answer: '1 = 2·3 − 1·5; family (32 + 5t, −16 − 3t); the unique nonnegative solution is (2, 2)',
                },
                {
                  q: '₹100 is to be paid exactly with ₹5 and ₹7 notes. Find every way, and state which ways use both denominations.',
                  solution: [
                    'Split: $5x + 7y = 100$ with $x, y \\ge 0$; the criterion passes trivially ($\\gcd = 1$).',
                    'Now, particular $(20, 0)$ by inspection; the family: $x = 20 + 7t$, $y = -5t$.',
                    'So, the window: $t \\ge -2$ (from $x \\ge 0$) and $t \\le 0$ (from $y \\ge 0$): three members.',
                    'Take: $(6, 10)$: $30 + 70 = 100$ ✓; $(13, 5)$: $65 + 35 = 100$ ✓; $(20, 0)$: $100 + 0 = 100$ ✓.',
                    'Hence three ways; both denominations appear exactly in $(6, 10)$ and $(13, 5)$ — two ways.',
                  ],
                  answer: '(6, 10), (13, 5), (20, 0); both-denomination ways: the first two',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove that $ax + by = c$ and its $d$-reduction $a_1 x + b_1 y = c_1$ (where $d = \\gcd(a, b)$ divides $c$, and $a_1 = a/d$, $b_1 = b/d$, $c_1 = c/d$) have exactly the same solution set. Check on the pair $12x + 42y = 60$ and $2x + 7y = 10$.',
                  solution: [
                    'Split, forward: if $ax + by = c$, write $a = da_1$, $b = db_1$, $c = dc_1$ and cancel $d$ (Lesson 2.2, $d \\ge 1$): $a_1 x + b_1 y = c_1$.',
                    'Now, backward: if $a_1 x + b_1 y = c_1$, multiply through by $d$ and redistribute: $d a_1 x + d b_1 y = d c_1$ reassembles to $ax + by = c$.',
                    'So, each solution of either equation solves the other — the sets coincide, with no membership lost in either direction.',
                    'Hence on the instance: both equations share the whole family $(x, y) = (-30 + 7t, 10 - 2t)$ — $(-2, 2)$, $(5, 0)$ and $(12, -2)$ all solve both; the reduced form is just lighter luggage.',
                  ],
                  answer: 'same solution set, proven both directions; instance verified',
                },
                {
                  q: 'Which amounts from 1 to 30 can be made exactly with 4-rupee and 9-rupee stamps? List the gaps, name the last one, and connect it to Lesson 1.3’s 3-and-5 stamp descent.',
                  solution: [
                    'Split: the makeable amounts are the nonnegative values of $4x + 9y$: $0, 4, 8, 9, 12, 13, 16, 17, 18, 20, 21, 22, 24, 25, 26, 27, \\dots$',
                    'Now, the gaps up to 30: $1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 19, 23$ — twelve of them, and 23 is the last: from 24 the run is continuous ($24 = 6 \\cdot 4$, $25 = 4 \\cdot 4 + 9$, $26 = 2 \\cdot 4 + 2 \\cdot 9$, $27 = 3 \\cdot 9$, $28 = 7 \\cdot 4$, $29 = 5 \\cdot 4 + 9$, $30 = 3 \\cdot 4 + 2 \\cdot 9$, then $+4$ walks on).',
                    'So, the last gap 23 equals $4 \\cdot 9 - 4 - 9$ — Sylvester’s two-denomination formula (the theorem box).',
                    'Hence the connection: Lesson 1.3 ran the descent on 3-and-5 stamps and found the last unmakeable amount 7 — and $3 \\cdot 5 - 3 - 5 = 7$ ✓: the same formula, now standing on the criterion-and-window theory.',
                  ],
                  answer: 'gaps 1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 19, 23; the last = ab − a − b = 23; 1.3’s 3-and-5 point 7 fits the same formula',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Find every nonnegative solution of $5x + 7y = 100$, and every strictly positive one, using the window algebra.',
                  solution: [
                    'Split: Illustration 3’s family: $x = 20 + 7t$, $y = -5t$.',
                    'Now, the nonnegative grips: $t \\ge -20/7$ gives $t \\ge -2$; $t \\le 0$. Window $\\{-2, -1, 0\\}$: $(6, 10)$, $(13, 5)$, $(20, 0)$.',
                    'So, the strictly positive grips: $x \\ge 1$ wants $t \\ge -19/7$ — still $t \\ge -2$; $y \\ge 1$ wants $-5t \\ge 1$, so $t \\le -1/5$, i.e. $t \\le -1$.',
                    'Take: $t \\in \\{-2, -1\\}$: $(6, 10)$ and $(13, 5)$ — two strictly positive solutions; $(20, 0)$ drops its zero.',
                    'Hence the counts: three nonnegative, two positive — the window arithmetic in action.',
                  ],
                  answer: 'nonnegative: (6, 10), (13, 5), (20, 0); strictly positive: (6, 10), (13, 5)',
                },
                {
                  q: 'Show that every amount from 24 to 31 is makeable with 4- and 9-rupee stamps by exhibiting representations, and explain why that settles every amount above 23.',
                  solution: [
                    'Split: the eight witnesses: $24 = 6 \\cdot 4$; $25 = 4 \\cdot 4 + 9$; $26 = 2 \\cdot 4 + 2 \\cdot 9$; $27 = 3 \\cdot 9$; $28 = 7 \\cdot 4$; $29 = 5 \\cdot 4 + 9$; $30 = 3 \\cdot 4 + 2 \\cdot 9$; $31 = 4 + 3 \\cdot 9$.',
                    'Now, every one checks: $24$; $16 + 9$; $8 + 18$; $27$; $28$; $20 + 9$; $12 + 18$; $4 + 27$ — all ✓.',
                    'So, the walk: any $n \\ge 32$ exceeds one of the witnesses by a multiple of 4 — subtract 4s until you land in $[24, 31]$, then add the 4s back.',
                    'Take, formally: if $n - 4k$ is a witness $4x + 9y$, then $n = 4(x + k) + 9y$ — a representation of $n$.',
                    'Hence the last gap is 23 itself (Exercise 8’s sweep agrees): the eight witnesses plus the 4-walk cover everything from 24 on.',
                  ],
                  answer: 'witnesses for 24..31 all verify; the +4-walk covers every n ≥ 24; the last gap is 23',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Sylvester’s two-denomination theorem: for coprime $a, b$ the unmakeable amounts number $(a - 1)(b - 1)/2$, the largest being $ab - a - b$. Verify both claims by sweep for $(a, b) = (4, 9)$ and $(4, 7)$, and state what the theorem does not yet give you in this book.',
                  solution: [
                    'Split, $(4, 9)$: the gaps swept: $1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 19, 23$ — count $(4-1)(9-1)/2 = 12$ ✓, largest $4 \\cdot 9 - 4 - 9 = 23$ ✓, and 24 is makeable ✓.',
                    'Now, $(4, 7)$: the gaps swept: $1, 2, 3, 5, 6, 9, 10, 13, 17$ — count $(4-1)(7-1)/2 = 9$ ✓, largest $28 - 11 = 17$ ✓.',
                    'So, both instances agree with Sylvester on every claim: the count, the maximum, and the makeability of everything above it.',
                    'Take: what the book does not yet give — the proof. A sweep is evidence at the instances, not a theorem for all pairs; chapter 4’s toolkit (unique factorisation standing on Bézout) is where the general argument lives.',
                    'Hence the honest ledger: statement verified on swept instances, general proof deferred — the same standing this book gave Frobenius’ name.',
                  ],
                  answer: '(4, 9): 12 gaps, max 23 ✓; (4, 7): 9 gaps, max 17 ✓; the general proof is deferred to chapter 4’s toolkit',
                },
                {
                  q: 'Prove the counting method: if $\\gcd(a, b) = 1$ and $x^*$ is the smallest nonnegative $x$ solving $ax + by = c$ (one existing), then the nonnegative solutions have $x = x^*, x^* + b, x^* + 2b, \\dots$ — one residue class — and their number is $\\lfloor (c/a - x^*)/b \\rfloor + 1$ when $x^* \\le c/a$. Apply to $(5, 7, 100)$ and, with the roles swapped, to $(7, 5, 100)$.',
                  solution: [
                    'Split: any two solutions differ inside the family with $d = 1$: $x - x_0 = bt$ — so all solution $x$-values sit in one residue class modulo $b$.',
                    'Now, the smallest nonnegative member is $x^*$; the class continues $x^* + kb$ exactly while $y = (c - ax)/b$ stays nonnegative, i.e. while $x \\le c/a$.',
                    'So, the members are $x^* + kb$ for $0 \\le k \\le (c/a - x^*)/b$: the count is $\\lfloor (c/a - x^*)/b \\rfloor + 1$ when $x^* \\le c/a$, and none otherwise.',
                    'Take on $(5, 7, 100)$: $x^* = 6$ (since $100 - 5 \\cdot 6 = 70 = 7 \\cdot 10$), and $\\lfloor (20 - 6)/7 \\rfloor + 1 = 2 + 1 = 3$ ✓ — Illustration 3’s count again.',
                    'Hence the swapped check: $(7, 5, 100)$ run on $y$ — $y^* = 6$ (the pair $(10, 6)$: $70 + 30 = 100$), and $y$ runs $6, 13, 20$ while $y \\le 100/5 = 20$: count $\\lfloor (20 - 6)/7 \\rfloor + 1 = 3$ ✓ — the solutions $(0, 20)$, $(5, 13)$, $(10, 6)$.',
                  ],
                  answer: 'one residue class mod b; count ⌊(c/a − x*)/b⌋ + 1; both instances give 3',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. The chapter’s summit: trace how Lesson 2.2’s combination law, Lesson 2.3’s Bézout identity and this lesson’s criterion-and-family assemble into the complete theory of $ax + by = c$. Where exactly did each law carry load? Close with the honest boundary: what changes — and what does not — when Chapter 6 finally builds the integers?',
                  solution: [
                    'The combination law (2.2) carried necessity: any common divisor of $a$ and $b$ divides every combination, so $\\gcd(a, b) \\mid c$ is unavoidable for any solution — no machinery beyond Lesson 2.2 needed.',
                    'Bézout (2.3) carried sufficiency: the gcd is itself a combination, and scaling by the natural $c/d$ lands exactly on the target — existence constructed, not searched.',
                    'The family needed the coprime reduction and its certificate: the converse ran $1 = a_1 s + b_1 u$ inline — Euclid’s lemma for one instance by hand, with the general lemma deferred to chapter 4 — and cancellation to climb down from $a_1 (x - x_0) = b_1 (y_0 - y)$.',
                    'The window arithmetic is pure Lesson 2.1: ceilings and floors against the band — the same remainder discipline that sorted the number line into $b$ slots.',
                    'The honest boundary: chapter 6 builds $\\mathbb{Z}$ from pairs of naturals (differences, formalised), and every statement of this lesson survives verbatim with “whole number” read as “integer” — the criterion, the family and the window all keep their shape. What changes is the licensing: the difference reading ($42 \\cdot 1 - 12 \\cdot 3$) becomes a first-class object, the coefficients stop needing apologetics, and the solution line extends past the quadrant without a footnote.',
                    'Hence the chapter’s shape: one theorem — the division algorithm — funding divisibility’s laws, the algorithm that finds the greatest common measure, the identity that writes it as a combination, and the complete solution theory of the linear two-variable equation. Four lessons, one spine.',
                  ],
                  answer: 'combination law → necessity; Bézout → sufficiency; coprime Bézout + cancellation → the family; the band → the window',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The criterion',
          latex: 'ax + by = c \\text{ solvable in whole numbers} \\ \\Longleftrightarrow\\ \\gcd(a, b) \\mid c',
          note: 'Necessity by the combination law (2.2); sufficiency by Bézout (2.3) scaled by the natural $c/d$.',
        },
        {
          kind: 'formula',
          name: 'The particular solution',
          latex: '(x_0, y_0) = \\left( x_B \\cdot \\tfrac{c}{d}, \\; y_B \\cdot \\tfrac{c}{d} \\right) \\quad \\text{where } d = a x_B + b y_B',
          note: 'Bézout’s row, scaled to the target. Read negative coordinates as differences of natural multiples until chapter 6.',
        },
        {
          kind: 'formula',
          name: 'The full family',
          latex: 'x = x_0 + \\tfrac{b}{d} t, \\qquad y = y_0 - \\tfrac{a}{d} t \\qquad (t \\text{ whole})',
          note: 'All solutions, proven in both directions; consecutive members differ by exactly the shift vector $(b/d, -a/d)$.',
        },
        {
          kind: 'formula',
          name: 'The nonnegative window',
          latex: '\\left\\lceil \\tfrac{-x_0}{b/d} \\right\\rceil \\ \\le \\ t \\ \\le \\ \\left\\lfloor \\tfrac{y_0}{a/d} \\right\\rfloor',
          note: 'The grips that count the makeable solutions — empty, single, or many. Instance: $\\lceil 30/7 \\rceil = 5 = \\lfloor 10/2 \\rfloor$ gripped $t = 5$ alone, the unique $(5, 0)$ for $12x + 42y = 60$.',
        },
        {
          kind: 'para',
          text: 'Take the chapter’s arc in one breath. Lesson 2.1 proved that division always answers — $a = qb + r$ with $0 \\le r < b$, existence by descent, uniqueness by the band. Lesson 2.2 promoted the exact case into a relation, $a \\mid b$, and gave the relation laws. Lesson 2.3 turned the laws into an engine — the Euclidean algorithm, finding the greatest common measure without factorising — and Bézout wrote that measure as a combination. This lesson closed the circle: the criterion and the family solved every linear equation $ax + by = c$ in whole numbers at a stroke, and the window counted the makeable answers. Four lessons, one spine: the division algorithm was the theorem; divisibility, gcd, Bézout and the Diophantine theory are its shadows, each longer than the last.',
        },
        {
          kind: 'para',
          text: 'Chapter 3 changes the subject — but not the tool. Positional notation writes a number as a sum of powers of its base, and converting between bases is the division algorithm run on the number itself: divide by the base, keep the remainder, repeat, read the remainders backwards. The remainders this chapter band-limited, the ones the Euclidean loop rode downward, become in the next chapter the very digits of every number you will ever meet in another base — and the least-number principle will halt that loop too, exactly as it halted this one.',
        },
      ],
    },
  ],
}
