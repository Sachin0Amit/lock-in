import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 3: Positional Systems and
 * Other Bases
 *
 * LESSONS WRITTEN: 3.1 The Representation Theorem: Every Number Has
 *                  Exactly One Name
 *                  3.2 Converting Between Bases
 *                  (both: run 53 — 2026-11-05)
 *                  3.3 Arithmetic in Other Bases
 *                  (run 54 — 2026-11-05)
 * CHAPTER STATUS: COMPLETE 4/4 (opened at run 53; lessons 3.3 'Arithmetic in
 * Other Bases' and 3.4 'Binary, Hexadecimal and the Machine' closed it at
 * run 54 per the two-lesson cadence — run 52's pointer said 55, an
 * arithmetic slip run 54 corrected — with the unit-3 completion review
 * passed; chapter 4 'Primes and the Fundamental Theorem of Arithmetic'
 * opens at run 55 with 4.1 + 4.2, verify-book2-ch04.ts FIRST).
 *
 * References for this unit: Donald E. Knuth, The Art of Computer
 * Programming, Vol. 2: Seminumerical Algorithms, §4.1 "Positional
 * Number Systems" — the scholarly charter for the notation this
 * chapter formalises — key knuth-taocp-v2 (web-checked 2026-11-05 via
 * the published §4.1 excerpt and the volume listings, sanctioned
 * fallback); the Hindu–Arabic positional system's Indian origin with
 * Laplace's tribute — "It is India that gave us the ingenious method
 * of expressing all numbers by means of ten symbols, each symbol
 * receiving a value of position as well as an absolute value … it
 * escaped the genius of Archimedes and Apollonius" (MacTutor
 * quotations page, quoted from H. Eves, Return to Mathematical
 * Circles, Boston 1988) — and al-Khwārizmī's c. 825 book on Hindu
 * reckoning, surviving only through a twelfth-century Latin
 * translation titled (by Boncompagni, 19th c.) Algoritmi de numero
 * Indorum, Algoritmi → algorithm (Devlin's al-Khwārizmī essay +
 * Wikipedia) — key hindu-arabic-positional-history; Leibniz's binary —
 * the 1679 manuscript De Progressione Dyadica, the 1697 letter, the
 * Bouvet correspondence (letter of 4 November 1701, received April
 * 1703, enclosing the Fu Xi hexagram diagram) and "Explication de
 * l'Arithmétique Binaire" (Mémoires de l'Académie Royale des Sciences,
 * 1703), with the modern hedge that the hexagram ordering is Shao
 * Yong's eleventh-century arrangement and no ancient Chinese text
 * treats it as a counting system — Leibniz had the arithmetic before
 * he saw the diagram — key leibniz-1703-binary (all web-checked
 * 2026-11-05, sanctioned fallback); carried keys
 * beck-geoghegan-art-of-proof (the university bridge),
 * euclid-elements-book-vii (the division-algorithm engine's ancestry),
 * khattar-qa-4e (the competitive-exam base-conversion scope).
 * Exposition original; nothing reproduced.
 *
 * Every number below was recomputed by scripts/verify-book2-ch03.ts
 * (312 checks, sections A–AC, run 53; EXTENDED at run 54 to 502 checks,
 * sections AD–BA, for lessons 3.3 and 3.4 — seven further pre-writing
 * defects caught: a carry row that never recorded the leading carry, a
 * hex-join slip on B + B, a roll-down power slip (10000₂ − 1 is 1111₂,
 * not 11111₂), a degenerate mod-1 sweep, a base-12 nine-row that mixed
 * values with names, and two peel-walk slips (90 >> 1 is 45, not 22).)
 *
 * The chapter's engine discipline: Lesson 2.1's division algorithm is
 * CITED, never re-proved — the naming engine is that theorem run on
 * the number itself, and 3.1's uniqueness argument is the remainder
 * band of Lesson 2.1 doing the forcing, digit by digit.
 */
export const chapter03: Chapter = {
  number: 3,
  slug: 'positional-systems-and-bases',
  title: 'Positional Systems and Other Bases',
  summary:
    'Base ten unmasked as one instance of a universal machine: the representation theorem (every number has exactly one name in every base b ≥ 2, proved from the division algorithm), conversion in both directions, arithmetic genuinely inside other bases (addition and multiplication tables in base b), and the binary–hexadecimal world that runs every computer.',
  status: 'complete',
  plannedLessons: [],
  lessons: [
    {
      id: 'ans-representation-theorem-unique-name',
      number: '3.1',
      title: 'The Representation Theorem: Every Number Has Exactly One Name',
      prerequisites: ['fm-numbers-digits-place-value', 'ans-division-with-rest-the-division-algorithm'],
      sources: ['hindu-arabic-positional-history', 'knuth-taocp-v2', 'beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'khattar-qa-4e'],
      concepts: [
        'Base (radix) and the digit band',
        'The base-b name as a sum of powers',
        'The representation theorem',
        'Existence by iterated division',
        'Uniqueness from the remainder band',
        'The digits are the remainders',
        'The digit-count window b^(k−1) ≤ n < b^k',
        'Canonical names and leading zeros',
      ],
      objectives: [
        'State the representation theorem — every natural number has exactly one canonical name in every base $b \\ge 2$ — and locate both halves in machinery you already own: existence from Lesson 2.1\u2019s division algorithm, uniqueness from its remainder band',
        'Run the naming engine on any number: divide by the base, keep the remainder, repeat until the quotient is zero, read the remainders upward — and rebuild the number from its digits by the positional sum',
        'Prove the digit theorem $d_i = \\lfloor n/b^i \\rfloor \\bmod b$ and use it: last digits, digit counts, the largest and smallest $k$-digit names, and the count $b^k - b^{k-1}$ of $k$-digit names',
        'Explain why no digit string outside the band can smuggle in a second name — and why leading-zero padding is padding, not a rival',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 2 ended with a promise: positional notation writes a number as a sum of powers of its base, and converting between bases is the division algorithm run on the number itself. This chapter keeps that promise. Foundation Mathematics Lesson 1.1 taught you the base-ten version of the machinery — the ten digits, the seats worth ones, tens, hundreds, the expanded form, zero as the placeholder that keeps empty seats honest. What FM asserted, this book proves. The claim underneath all of it is astonishingly strong: *ten* is not special. Every base $b \\ge 2$ — two, three, five, twelve, sixty — runs the same naming machine, and in every one of them every natural number gets exactly one name. One theorem, one engine, every base at once.',
        },
        {
          kind: 'para',
          text: 'The proof strategy is the book\u2019s signature move: we will not re-derive anything. The division algorithm of Lesson 2.1 — $a = qb + r$ with $0 \\le r < b$, existence by descent, uniqueness by the band — is the engine, already certified. Naming a number in base $b$ is nothing but that theorem applied repeatedly: divide by $b$, the remainder is a digit, hand the quotient to the next machine. The remainder band, which made $(q, r)$ unique in Lesson 2.1, will make the *name* unique here — the digits are the remainders, and the band is why no impostor string can stand in their place.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'India\u2019s ten symbols, and the clerk of Baghdad',
          text: 'The base-ten names you read every day are the tail of a specific history. The positional scheme — a handful of symbols whose *seats* carry the magnitude, with a dedicated zero to hold empty seats — matured in Indian mathematics, and it moved west through Baghdad: al-Khwārizmī wrote a short book on reckoning with Hindu numerals around 825, which survives only in a twelfth-century Latin translation. That printed title, *Algoritmi de numero Indorum* (“al-Khwārizmī on the Hindu numbers”), Latinizes the author\u2019s name — and *Algoritmi* is where our word **algorithm** comes from: the naming engine of this lesson is, literally, the procedure the name remembers. Pierre-Simon Laplace put the invention\u2019s weight in one sentence: “It is India that gave us the ingenious method of expressing all numbers by means of ten symbols, each symbol receiving a value of position as well as an absolute value” — an idea he admired the more when remembering “that it escaped the genius of Archimedes and Apollonius.” This chapter\u2019s work is to show the idea is not even tied to ten.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Base, digits, and the base-b name',
          text: 'Fix a natural number $b \\ge 2$ — the **base** (or **radix**). The **digits** of base $b$ are the $b$ symbols carrying the values $0, 1, \\dots, b - 1$; the inequality $0 \\le d \\le b - 1$ on a digit value is the **digit band** — the same band that bounded the remainders of Lesson 2.1. A **base-$b$ name** of a natural number $n$ is a digit string $d_{k-1} d_{k-2} \\dots d_1 d_0$ (read left to right, most significant first) whose **positional value** satisfies',
        },
        {
          kind: 'equation',
          latex: 'n \\; = \\; d_{k-1}\\, b^{k-1} + d_{k-2}\\, b^{k-2} + \\cdots + d_1\\, b + d_0 \\qquad \\text{with every } d_i \\text{ in the band,} \\quad d_{k-1} \\ne 0 \\text{ unless } n = 0',
          note: 'The condition $d_{k-1} \\ne 0$ (for $n \\ge 1$) makes the name **canonical** — no leading zeros. Every digit stands in a seat worth $b^{\\text{seat}}$, counting seats from the right starting at zero.',
        },
        {
          kind: 'para',
          text: 'The subscript records the base: $101101_2$, $43_5$, $7E9_{16}$. Without it, a name is ambiguous in the cruelest way — “11” names three in base two, four in base five, thirteen in base ten. When the base is understood (almost always ten), the subscript is dropped; in this chapter, where five bases share one page, it never is.',
        },
        {
          kind: 'para',
          text: 'For bases up to ten the arabic numerals serve: base five owns the digits $0, 1, 2, 3, 4$. Bases above ten need symbols for the values ten and beyond, and the fixed convention — the one Knuth\u2019s treatise on positional systems records as standard — is letters running in order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'base twelve reads ten as $A$ and eleven as $B$, so twelve itself is $10_{12}$;',
            'base fourteen adds $C$ for twelve and $D$ for thirteen;',
            'base sixteen — hexadecimal — completes the alphabet at $E$ (fourteen) and $F$ (fifteen); this chapter\u2019s symbol charter stops at $F$, and larger bases are named honestly rather than invented away;',
            'base seven needs no letters at all — and owns no digit $7$: the number seven itself writes $10_7$, exactly as ten writes $10_{10}$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The string is not the number',
          text: 'The single most expensive confusion of this chapter: a name is a *string*, the number is its *value*. The string “10” names one distinct value in every base — two in base two, five in base five, twelve in base twelve — and never the value ten except in base ten. Likewise “100” is four, twenty-five, one hundred forty-four, according to the seat arithmetic of the base. Read the subscript first, then the string; the value follows from the seats, not from your base-ten reflexes.',
        },
        { kind: 'heading', text: 'The representation theorem' },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The Representation Theorem',
          text: 'Let $b \\ge 2$ be a natural number. Every natural number $n$ has **exactly one** canonical base-$b$ name: a digit string $d_{k-1} \\dots d_0$ with all $d_i$ in the band $0 \\le d_i \\le b - 1$, leading digit nonzero (unless $n = 0$, named “0”), and $n = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0$. Existence and uniqueness are both inherited from Lesson 2.1 — the division algorithm supplies the first, its remainder band the second.',
        },
        {
          kind: 'para',
          text: 'The theorem has two halves, and each half is an old friend wearing new clothes. Existence says the engine always succeeds — every number *can* be named. Uniqueness says the engine\u2019s answer is the only one — two different canonical digit strings can never evaluate to the same number. We prove each honestly, citing the machinery rather than rebuilding it.',
        },
        {
          kind: 'derivation',
          title: 'Existence: the engine runs, and the digits are the remainders',
          statement:
            'Claim: for every $n \\ge 0$ and every base $b \\ge 2$, iterating the division algorithm on $n$ — divide by $b$, keep the remainder, continue with the quotient — halts with quotient $0$ in finitely many steps, and the remainders, read from last to first, form a base-$b$ name of $n$.',
          steps: [
            {
              label: 'The loop and its licence',
              formula: 'n_0 = n: \\quad n_i = q_i\\, b + d_i, \\qquad q_i = n_{i+1}, \\quad 0 \\le d_i < b',
              explanation:
                'Apply Lesson 2.1\u2019s division algorithm to $n$ with divisor $b$: there exist unique $q_0, d_0$ with $n = q_0 b + d_0$ and $0 \\le d_0 < b$. Each $d_i$ is a legitimate digit by construction — the band of Lesson 2.1 is the digit band, clause for clause. Nothing here is new arithmetic; the theorem is being *used*.',
            },
            {
              label: 'Termination by descent',
              formula: 'n > q_0 \\ge q_1 \\ge \\cdots \\ge 0 \\quad \\text{strictly until } 0',
              explanation:
                'The quotients descend: $q_i = \\lfloor n_i / b \\rfloor < n_i$ whenever $n_i \\ge 1$, because $b \\ge 2$ (this is the order link of Lesson 2.2 — a positive divisor eats a number strictly). A strictly descending sequence of natural numbers cannot run forever — the same least-number-principle descent that halted the subtraction walks of Lesson 1.3 and the Euclidean loop of Lesson 2.3 halts this loop too. The chain $n, q_0, q_1, \\dots$ reaches $0$.',
            },
            {
              label: 'The remainders reassemble the number',
              formula: 'n = q_0 b + d_0 = (q_1 b + d_1) b + d_0 = \\cdots = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0',
              explanation:
                'Substitute each quotient into the row above it and expand: $n = q_0 b + d_0$, but $q_0 = q_1 b + d_1$, so $n = q_1 b^2 + d_1 b + d_0$; iterating down the chain (induction on the length of the walk, with the product rule $b^{i+1} = b^i \\cdot b$ doing the bookkeeping) expresses $n$ as a sum of digits times powers of $b$. The digits *are* the remainders — read upward, last remainder first.',
            },
            {
              label: 'The leading digit is honest',
              formula: 'd_{k-1} \\ge 1 \\text{ whenever } n \\ge 1',
              explanation:
                'The last machine ran on a quotient $n_{k-1}$ with $1 \\le n_{k-1} < b$ — too small to divide again — so its remainder $d_{k-1}$ equals that positive quotient. The top digit never vanishes for $n \\ge 1$, and $n = 0$ halts immediately, named “0”. The engine emits canonical names, no padding, automatically.',
            },
          ],
          result:
            'Every natural number has a base-$b$ name in every base $b \\ge 2$: divide by $b$, keep the remainders, read them upward. The naming engine is the division algorithm wearing a reading instruction.',
        },
        {
          kind: 'para',
          text: 'One slogan carries the whole chapter, and it is worth engraving now: **the digits are the remainders**. When Lesson 2.1 proved $23 = 4 \\cdot 5 + 3$, it was — unknown to us then — writing $23 = 43_5$: quotient four, remainder three, the two base-five digits of twenty-three falling out of a single division. Every additional base-$b$ digit of a number is one more turn of the same machine on the shrinking quotient.',
        },
        {
          kind: 'example',
          title: 'Name 45 in base two — the engine, run in full, and checked by rebuilding',
          steps: [
            'Split: the machines, largest first — divide by $2$, keep the remainder, feed the quotient onward until it hits $0$.',
            'Now, the cascade: $45 = 22 \\cdot 2 + 1$; $22 = 11 \\cdot 2 + 0$; $11 = 5 \\cdot 2 + 1$; $5 = 2 \\cdot 2 + 1$; $2 = 1 \\cdot 2 + 0$; $1 = 0 \\cdot 2 + 1$ — six machines, every row a clean division-algorithm instance with remainder in the band $\\{0, 1\\}$.',
            'So, read the remainders upward — $1, 0, 1, 1, 0, 1$: the name is $101101_2$.',
            'Check by rebuilding from the seats: $1 \\cdot 32 + 0 \\cdot 16 + 1 \\cdot 8 + 1 \\cdot 4 + 0 \\cdot 2 + 1 = 32 + 8 + 4 + 1 = 45$ ✓.',
            'Hence $45 = 101101_2$ — and six machines for six bits is no accident: the loop emits exactly one digit per turn.',
          ],
        },
        {
          kind: 'example',
          title: 'Name 2025 in bases twelve and sixteen — where letters have to work',
          steps: [
            'Split: base twelve first — divide by $12$ until the quotient empties: $2025 = 168 \\cdot 12 + 9$; $168 = 14 \\cdot 12 + 0$; $14 = 1 \\cdot 12 + 2$; $1 = 0 \\cdot 12 + 1$ — four machines.',
            'Now, read upward: $1, 2, 0, 9$ — so $2025 = 1209_{12}$, and the rebuilt check runs $1 \\cdot 1728 + 2 \\cdot 144 + 0 \\cdot 12 + 9 = 1728 + 288 + 9 = 2025$ ✓.',
            'So, base sixteen: $2025 = 126 \\cdot 16 + 9$; $126 = 7 \\cdot 16 + 14$; $7 = 0 \\cdot 16 + 7$ — three machines, and the middle remainder fourteen is a legitimate digit of base sixteen.',
            'Take the charter\u2019s letter: fourteen prints as $E$ — read upward, $7, E, 9$: $2025 = 7E9_{16}$, rebuilt as $7 \\cdot 256 + 14 \\cdot 16 + 9 = 1792 + 224 + 9 = 2025$ ✓.',
            'Hence the same number answers to $1209_{12}$ and $7E9_{16}$ — different seats, different alphabets, one value. The figure below watches the hexadecimal cascade run.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The naming engine at work: 2025 named in base sixteen by three division machines. Each row is one certified instance of Lesson 2.1’s division algorithm — dividend = quotient × 16 + remainder, the remainder inside the band {0, …, 15}. The quotient falls from machine to machine (2025 → 126 → 7 → 0, strictly descending: the descent that guarantees the loop halts), the remainders land in the right-hand column (9, then 14 — printed E — then 7), and reading that column upward assembles the canonical name 7E9₁₆. Rebuilding from the seats, 7·256 + 14·16 + 9 = 2025, certifies the name.',
          svg: `<svg viewBox="0 0 920 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three stacked division machines naming 2025 in base sixteen, remainders 9, E, 7 read upward to give 7E9">
  <defs>
    <marker id="cas-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <g font-size="13" fill="currentColor" opacity="0.85">
    <text x="260" y="30" text-anchor="middle">the machine: divide by 16</text>
    <text x="620" y="30" text-anchor="middle">the remainder</text>
  </g>
  <!-- three machine rows -->
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="170" y="52" width="180" height="56"/>
    <rect x="170" y="172" width="180" height="56"/>
    <rect x="170" y="292" width="180" height="56"/>
    <rect x="555" y="52" width="130" height="56"/>
    <rect x="555" y="172" width="130" height="56"/>
    <rect x="555" y="292" width="130" height="56"/>
  </g>
  <g font-size="16" fill="currentColor" text-anchor="middle">
    <text x="260" y="86">2025 ÷ 16</text>
    <text x="260" y="206">126 ÷ 16</text>
    <text x="260" y="326">7 ÷ 16</text>
  </g>
  <g font-size="16" fill="currentColor" text-anchor="middle">
    <text x="620" y="86">r = 9</text>
    <text x="620" y="206">r = 14 = E</text>
    <text x="620" y="326">r = 7</text>
  </g>
  <!-- quotient carried down -->
  <g stroke="currentColor" stroke-width="1.3">
    <line x1="260" y1="108" x2="260" y2="170" marker-end="url(#cas-arrow)"/>
    <line x1="260" y1="228" x2="260" y2="290" marker-end="url(#cas-arrow)"/>
  </g>
  <g font-size="12" fill="currentColor" opacity="0.85">
    <text x="274" y="145">quotient</text>
    <text x="274" y="265">quotient</text>
  </g>
  <!-- the row equations, between the columns -->
  <g font-size="13.5" fill="currentColor" text-anchor="middle">
    <text x="430" y="84">2025 = 126 × 16 + 9</text>
    <text x="430" y="204">126 = 7 × 16 + 14</text>
    <text x="430" y="324">7 = 0 × 16 + 7</text>
  </g>
  <!-- remainder column wired to the read-upward arrow -->
  <g stroke="currentColor" stroke-width="0.9" stroke-dasharray="4 4" opacity="0.7">
    <line x1="685" y1="80" x2="786" y2="80"/>
    <line x1="685" y1="200" x2="786" y2="200"/>
    <line x1="685" y1="320" x2="786" y2="320"/>
  </g>
  <line x1="800" y1="330" x2="800" y2="96" stroke="currentColor" stroke-width="1.4" marker-end="url(#cas-arrow)"/>
  <text x="800" y="50" font-size="13" fill="currentColor" text-anchor="middle">read the remainders upward</text>
  <text x="800" y="398" font-size="16" fill="currentColor" text-anchor="middle">2025 = 7E9<tspan dy="4" font-size="11">16</tspan></text>
</svg>`,
        },
        {
          kind: 'derivation',
          title: 'Uniqueness: the band forces every digit',
          statement:
            'Claim: two canonical base-$b$ names that evaluate to the same number are the same string. Equivalently: if $d_{k-1} \\dots d_0$ is any digit string in the band evaluating to $n$, then $d_0 = n \\bmod b$, and stripping it leaves the name of $\\lfloor n/b \\rfloor$ — so every digit of every name is forced, from the right.',
          steps: [
            {
              label: 'The units digit is beyond appeal',
              formula: 'n = (\\text{multiple of } b) + d_0 \\quad \\Rightarrow \\quad d_0 = n \\bmod b',
              explanation:
                'Every seat except the units seat contributes a multiple of $b$: $d_i b^i$ carries the factor $b$ the moment $i \\ge 1$. So any name of $n$ satisfies $n \\equiv d_0 \\pmod{b}$ in spirit — the value of $n$ minus its units digit is divisible by $b$ — and since $d_0$ sits inside the band $0 \\le d_0 < b$, Lesson 2.1\u2019s uniqueness of the remainder nails it: $d_0$ **must** be the remainder of $n$ on division by $b$. No choice exists.',
            },
            {
              label: 'Peel, and the prefix inherits the problem',
              formula: '\\left\\lfloor \\frac{n}{b} \\right\\rfloor = \\frac{n - d_0}{b} = d_{k-1} b^{k-2} + \\cdots + d_1',
              explanation:
                'Subtract the (now-forced) units digit and divide by $b$: what remains is $d_{k-1} b^{k-2} + \\cdots + d_1$ — the same digits standing in seats one lower. Any second name of $n$ has the same forced $d_0$, so its prefix names $\\lfloor n/b \\rfloor$ too. The question “can $n$ have two names?” has shrunk to the same question about a strictly smaller number.',
            },
            {
              label: 'Descent closes the argument',
              formula: '\\lfloor n/b \\rfloor < n \\quad (n \\ge 1,\\ b \\ge 2) \\ \\Rightarrow\\ \\text{induction on } n',
              explanation:
                'The peel strictly shrinks the number — the descent engine again. Induction (on $n$, formally; the least-number principle of Lesson 1.3 underneath) finishes it: the empty string names $0$ alone, and each peel step forces one more digit to be the remainder. When the induction bottoms out, both names agree digit for digit.',
            },
            {
              label: 'Why length cannot rescue an impostor',
              formula: 'b^{k-1} \\le n < b^k \\quad \\text{exactly when the canonical name has } k \\text{ digits}',
              explanation:
                'A canonical $k$-digit name evaluates between $1 \\cdot b^{k-1}$ (smallest leading digit, zeros below) and $(b-1)(b^{k-1} + \\cdots + 1) = b^k - 1$. These windows are disjoint — one per length — so a name of a different length cannot even land in $n$\u2019s window. The length itself is forced, and the peel already forced the digits inside it.',
            },
          ],
          result:
            'The canonical name is unique in every base: the remainder band forces the units digit, the peel hands a smaller instance of the same question to the next digit, and descent shuts the door. Uniqueness is Lesson 2.1\u2019s uniqueness, worn one level up.',
        },
        {
          kind: 'example',
          title: 'The impostor hunt: can 23 wear a second base-five name?',
          steps: [
            'Split: the engine answers $23 = 43_5$ — digits $4, 3$, both inside the band $\\{0, 1, 2, 3, 4\\}$.',
            'Now, hunt the impostors — same length, any digits in the band: the candidates $10_5, 11_5, \\dots, 44_5$ evaluate to $5, 6, \\dots, 24$ — each window seat checked, none lands on $23$ except $43_5$ itself.',
            'So, try to cheat with length: a three-digit base-five name evaluates between $100_5 = 25$ and $444_5 = 124$ — the whole window sails past $23$; a one-digit name caps at $4_5 = 4$. No other length can even reach.',
            'Take the algebra of why: the units digit of any base-five name of $23$ must be $23 \\bmod 5 = 3$ — forced; the prefix must then name $\\lfloor 23/5 \\rfloor = 4$, whose only name is “4” — forced again.',
            'Hence $43_5$ stands alone — one name, as the theorem promised; the impostor hunt is the band and the peel running on an instance.',
          ],
        },
        { kind: 'heading', text: 'How many digits does a number have?' },
        {
          kind: 'para',
          text: 'The uniqueness derivation leaked a counting tool worth its own section: a canonical $k$-digit name in base $b$ evaluates between $b^{k-1}$ and $b^k - 1$, and the window is airtight. Reading it as a theorem about numbers instead of strings: $n$ has exactly $k$ digits in base $b$ precisely when',
        },
        {
          kind: 'equation',
          latex: 'b^{k-1} \\ \\le \\ n \\ \\le \\ b^k - 1',
          note: 'Equivalently $b^{k-1} \\le n < b^k$. The window\u2019s left wall is the smallest $k$-digit name ($1$ followed by $k - 1$ zeros); its right wall is the largest ($k$ digits all equal to $b - 1$).',
        },
        {
          kind: 'para',
          text: 'The boundary instances are worth memorising in decimal and binary both. Largest $k$-digit decimal name: $999$ for $k = 3$ — that is $10^3 - 1$. Largest 8-bit name: $11111111_2 = 255 = 2^8 - 1$; largest 10-bit name: $1023 = 2^{10} - 1$; largest three-symbol hexadecimal name: $FFF_{16} = 4095 = 16^3 - 1$. Smallest names sit on the left wall: the smallest five-digit base-three name is $10000_3 = 81 = 3^4$. And the window is exactly a count wide:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'two-digit decimal names: $100 - 10 = 90$ of them;',
            'three-digit decimal names: $1000 - 100 = 900$;',
            'eight-bit names: $2^8 - 2^7 = 128$;',
            'three-symbol hex names: $16^3 - 16^2 = 3840$ — in every base, exactly $b^k - b^{k-1}$ canonical names of length $k$.',
          ],
        },
        {
          kind: 'table',
          caption: 'One count, four bases: the names of zero through twelve. Watch the pattern roll over — each “10” in a column is that column’s base itself.',
          head: ['ten', 'base 2', 'base 3', 'base 5', 'base 8'],
          rows: [
            ['0', '0', '0', '0', '0'],
            ['1', '1', '1', '1', '1'],
            ['2', '10', '2', '2', '2'],
            ['3', '11', '10', '3', '3'],
            ['4', '100', '11', '4', '4'],
            ['5', '101', '12', '10', '5'],
            ['6', '110', '20', '11', '6'],
            ['7', '111', '21', '12', '7'],
            ['8', '1000', '22', '13', '10'],
            ['9', '1001', '100', '14', '11'],
            ['10', '1010', '101', '20', '12'],
            ['11', '1011', '102', '21', '13'],
            ['12', '1100', '110', '22', '14'],
          ],
        },
        {
          kind: 'para',
          text: 'The table repays a slow read. In the base-two column, the rollovers come fast — $10_2$, $100_2$, $1000_2$ land on two, four, eight: powers of two are exactly the numbers whose binary names are a one with zeros after. In the base-five column, “10” first appears at five; in base eight, at eight. Reading *down* a column is counting in that base — the base-three column carries only the digits $0, 1, 2$, and twelve first needs three digits there ($110_3$) while it still needs only two in base five ($22_5$) and two in base eight ($14_8$).',
        },
        {
          kind: 'para',
          text: 'The window also answers the practical question — how long a name will a big number need? Since $2^{10} = 1024 \\le 2025 < 2048 = 2^{11}$, the number $2025$ wears eleven bits; since $16^2 = 256 \\le 2025 < 4096 = 16^3$, three hex symbols; since $12^3 = 1728 \\le 2025 < 20736 = 12^4$, four base-twelve digits. Scaling up: $2^{19} = 524{,}288 \\le 1{,}000{,}000 < 1{,}048{,}576 = 2^{20}$, so a million needs twenty bits and five hex symbols ($16^4 = 65{,}536 \\le 10^6 < 16^5$); a billion needs thirty bits, because $2^{29} = 536{,}870{,}912 \\le 10^9 < 2^{30} = 1{,}073{,}741{,}824$.',
        },
        {
          kind: 'algorithm',
          title: 'Naming n in base b — the engine, assembled',
          lines: [
            { code: 'input: n ≥ 0, base b ≥ 2', note: 'the number and the base' },
            { code: 'digits ← empty list', note: 'will fill right to left, last remainders first' },
            { code: 'while n > 0:', note: 'the descent — strictly shrinking, so it halts' },
            { code: '  (q, r) ← the division of n by b   — Lesson 2.1', note: 'existence and uniqueness already certified' },
            { code: '  prepend r to digits', note: 'the digit IS the remainder — in the band automatically' },
            { code: '  n ← q', note: 'the peel: the prefix problem, one number smaller' },
            { code: 'if digits is empty: digits ← [0]', note: 'zero is named "0"' },
            { code: 'return digits', note: 'canonical: the leading digit never vanishes' },
          ],
          note: 'Seven lines, every one licensed: the loop by descent, the digit by the band, the output by the uniqueness argument. Lesson 3.2 runs this engine as the “down” direction of every base conversion.',
        },
        { kind: 'heading', text: 'What uniqueness does not say' },
        {
          kind: 'para',
          text: 'Three honest boundaries, each worth a sentence. First, **leading zeros**: the string $045$ evaluates to forty-five exactly as $45$ does — padding a name with zeros on the left adds seats worth $0 \\cdot b^{\\text{seat}}$, changing nothing. Uniqueness is a statement about *canonical* names; padded strings are costumes, not rivals (computer science borrows this freely — a byte holds eight bits, so $45$ may appear padded as $00101101_2$).',
        },
        {
          kind: 'para',
          text: 'Second, the theorem names **natural numbers only**. Nothing here yet says what $0.375$ or $-13$ should wear in base two — negative numbers wait for Chapter 6\u2019s construction of the integers, and fractional names wait for Chapter 7\u2019s rationals (where the repeating-decimal story finally gets its proof). Third, the engine certifies *existence and uniqueness*, not yet *convenience*: converting the $1209_{12}$ of Illustration 2 into base five by hand would mean doing arithmetic *inside* base twelve — machines Lesson 3.3 builds. The craft of conversion has its own lesson, and it is next.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The digits are the remainders — the chapter’s one slogan',
          text: 'If you keep one sentence from this lesson: a number’s base-$b$ digits are precisely the remainders of its divisions by $b$, its $b$, its $b^3$-adjusted quotients — in symbols $d_i = \\lfloor n / b^i \\rfloor \\bmod b$. The units digit is $n \\bmod b$; the next digit is what survives one division and gets remaindered again. Everything else in this chapter — conversion, the machine tables, even the exam shortcuts — is this sentence operated carefully. And it plants the flag for Chapter 5: “what does $n$ leave as a remainder on division by $b$?” is the question congruence arithmetic will promote into a world of its own.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'The representation theorem is the theory; examinations drill its corollaries. “Find the largest three-digit number in base $b$” — the right wall $b^3 - 1$. “How many digits has $n$ in base $b$?” — the window $b^{k-1} \\le n < b^k$, gripped from both sides. “Write $n$ in base $b$” — the engine, one division per digit, and the marking scheme reads the remainders upward exactly as the theorem says. Khattar’s QA chapter 1 and the CAT/IPMAT syllabi keep a standing block of base-conversion questions, all of them this lesson’s engine with the numbers changed; the syllabi also flag “number of zeros / last digit in a given base”, which is the digit theorem $d_i = \\lfloor n/b^i \\rfloor \\bmod b$ in question dress. The shapes are cited here, not reproduced — this book\u2019s habit.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Base (radix)', def: 'The natural number $b \\ge 2$ whose powers furnish the seats of a positional name — base ten for daily arithmetic, base two for machines, base sixty for clocks and Babylon (chapter 9\u2019s story).' },
            { term: 'Digit band', def: 'The $b$ legal digit values $0 \\le d \\le b - 1$ of base $b$ — Lesson 2.1\u2019s remainder band promoted to an alphabet. Base seven has no digit 7: seven writes $10_7$.' },
            { term: 'Base-b name', def: 'A digit string $d_{k-1} \\dots d_0$ with $n = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0$; canonical when the leading digit is nonzero (and “0” names zero).' },
            { term: 'Representation theorem', def: 'Every natural number has exactly one canonical base-$b$ name, for every $b \\ge 2$ — existence by the division algorithm\u2019s iterated descent, uniqueness by the band forcing digits from the right.' },
            { term: 'Units digit', def: 'The rightmost digit $d_0 = n \\bmod b$ — forced in every base, the anchor of the uniqueness argument and the first congruence of chapter 5.' },
            { term: 'Leading (most significant) digit', def: 'The leftmost digit $d_{k-1} \\ge 1$ — the last remainder the engine emits; it names the window $b^{k-1} \\le n < b^k$ the number lives in.' },
            { term: 'Digit-count window', def: '$b^{k-1} \\le n \\le b^k - 1$: exactly the numbers wearing $k$ digits. Yields the largest $k$-digit name $b^k - 1$ (999; $255 = 2^8 - 1$) and the count $b^k - b^{k-1}$ of $k$-digit names (90, 900, 128).' },
            { term: 'Leading zero (padding)', def: 'A zero prepended to a name — adds a seat worth nothing, preserves the value, breaks canonicity. $00101101_2$ is a padded costume of $101101_2 = 45$, not a rival name.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'How many digits does base seven have, and what is the largest?',
              options: ['Seven digits, the largest being 7', 'Seven digits, the largest being 6', 'Six digits, the largest being 6', 'Eight digits, the largest being 7'],
              answer: 1,
              explain: 'Base $b$ owns exactly the $b$ digits $0$ through $b - 1$: seven digits for base seven, the largest being $6$ — the symbol 7 sits outside the band and is no digit at all (seven itself writes $10_7$). Six digits or eight miscount the band; “largest 7” confuses the base with its largest digit.',
            },
            {
              q: 'What is 23 in base five?',
              options: ['$43_5$', '$34_5$', '$113_5$', '$44_5$'],
              answer: 0,
              explain: 'One division: $23 = 4 \\cdot 5 + 3$ — quotient $4$, remainder $3$, so the digits read $43_5$ (Lesson 2.1\u2019s own instance, seen now as a name). The distractors rebuild to $34_5 = 19$, $113_5 = 33$ and $44_5 = 24$ — each was evaluated in the verify script before this page was written.',
            },
            {
              q: 'The units digit of $n$ in base $b$ is…',
              options: ['$n \\bmod b$ — the remainder of the division algorithm', 'the quotient $q$ of the division algorithm', '$n - b$', 'always the largest digit'],
              answer: 0,
              explain: 'Every seat above the units seat carries a factor of $b$, so the value minus its units digit is divisible by $b$ — and the band pins the units digit to the unique remainder $n \\bmod b$. The quotient is the *prefix\u2019s* business (it feeds the next machine); $n - b = 18$ is not even a digit here; “always the largest” describes nothing.',
            },
            {
              q: 'How many digits has 2025 in base two?',
              options: ['10 — because $2^{10} = 1024$', '11 — because $2^{10} \\le 2025 < 2^{11}$', '8 — because bytes', '4 — to look like a four-digit year'],
              answer: 1,
              explain: 'The window: eleven-bit names run $2^{10} = 1024$ through $2^{11} - 1 = 2047$, and $2025$ sits inside. Ten bits cap at $1023$ — the window\u2019s right wall is $n < 2^{10}$, which 2025 breaks; eight bits cap at $255$; the year\u2019s decimal outfit is irrelevant to its binary one.',
            },
            {
              q: 'Two different canonical digit strings in the same base evaluate to the same number. What does the theorem say?',
              options: [
                'They cannot: the canonical name is unique',
                'They can, in every base',
                'They can, but only in bases greater than ten',
                'They can, but only for multiples of the base',
              ],
              answer: 0,
              explain: 'Uniqueness is the whole content of the theorem: the band forces the units digit, the peel forces the prefix, descent closes. Strings that differ only by leading zeros do share a value — but padded strings are not canonical names, which is exactly the loophole the theorem\u2019s statement closes.',
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
                  q: 'List the digits of base four, name the largest, and count them. Then write the numbers four and five in base four.',
                  solution: [
                    'Split: base $b$ owns the digits $0$ through $b - 1$ — for $b = 4$: $0, 1, 2, 3$.',
                    'Now, the largest digit is $3$, and there are four of them — as many as the base.',
                    'So, four itself exceeds every digit: $4 = 1 \\cdot 4 + 0$, which names $10_4$.',
                    'And five: $5 = 1 \\cdot 4 + 1$ — the engine\u2019s one machine — naming $11_4$.',
                    'Hence the digits are $0,1,2,3$ (largest 3, four of them), and $4 = 10_4$, $5 = 11_4$.',
                  ],
                  answer: 'digits 0,1,2,3; largest 3; four of them; 4 = 10₄, 5 = 11₄',
                },
                {
                  q: 'Name 13 in base two by the engine, and check by rebuilding.',
                  solution: [
                    'Split: divide by $2$, keep the remainder, feed the quotient down: $13 = 6 \\cdot 2 + 1$; $6 = 3 \\cdot 2 + 0$; $3 = 1 \\cdot 2 + 1$; $1 = 0 \\cdot 2 + 1$.',
                    'Now, read the remainders upward: $1, 1, 0, 1$ — the name $1101_2$.',
                    'So, rebuild from the seats: $8 + 4 + 0 + 1 = 13$ ✓.',
                    'Hence $13 = 1101_2$ — four machines, four bits.',
                  ],
                  answer: '13 = 1101₂ (8 + 4 + 1)',
                },
                {
                  q: 'Name 23 in base five — the Lesson 2.1 instance, read as a name this time.',
                  solution: [
                    'Split: the single division $23 = 4 \\cdot 5 + 3$ already has quotient below five — the loop halts after one machine.',
                    'Now, the remainder $3$ is the units digit, the quotient $4$ the leading digit: $23 = 43_5$.',
                    'So, rebuild: $4 \\cdot 5 + 3 = 23$ ✓.',
                    'Hence $23 = 43_5$ — the pair $(4, 3)$ of Lesson 2.1 was a base-five name all along.',
                  ],
                  answer: '23 = 43₅',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Name 100 in base eight and verify.',
                  solution: [
                    'Split: $100 = 12 \\cdot 8 + 4$; $12 = 1 \\cdot 8 + 4$; $1 = 0 \\cdot 8 + 4$ — three machines.',
                    'Now, read upward: $1, 4, 4$ — the name $144_8$.',
                    'So, rebuild: $1 \\cdot 64 + 4 \\cdot 8 + 4 = 64 + 32 + 4 = 100$ ✓.',
                    'Hence $100 = 144_8$.',
                  ],
                  answer: '100 = 144₈ (64 + 32 + 4)',
                },
                {
                  q: 'Name 2025 in base twelve and verify.',
                  solution: [
                    'Split: $2025 = 168 \\cdot 12 + 9$; $168 = 14 \\cdot 12 + 0$; $14 = 1 \\cdot 12 + 2$; $1 = 0 \\cdot 12 + 1$.',
                    'Now, read upward: $1, 2, 0, 9$ — the name $1209_{12}$ (the zero holds the twenties seat honestly).',
                    'So, rebuild: $1728 + 288 + 0 + 9 = 2025$ ✓.',
                    'Hence $2025 = 1209_{12}$ — four machines for four digits.',
                  ],
                  answer: '2025 = 1209₁₂ (1728 + 288 + 9)',
                },
                {
                  q: 'Rebuild $2F_{16}$ as a decimal number.',
                  solution: [
                    'Split: the charter — $F$ carries the value fifteen.',
                    'Now, the seats: $2 \\cdot 16 + 15 = 32 + 15 = 47$.',
                    'So, $2F_{16} = 47$.',
                    'Hence the reading: two sixteens and fifteen ones — the letter is a digit, not an unknown.',
                  ],
                  answer: '2F₁₆ = 47',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove: a number is divisible by $b$ (Lesson 2.2\u2019s sense) if and only if its canonical base-$b$ name ends in 0. Check on $16 = 20_8$, $24 = 30_8$, $25 = 31_8$.',
                  solution: [
                    'Split, forward: if $b \\mid n$, then $n \\bmod b = 0$; the digit theorem makes the units digit $d_0 = n \\bmod b = 0$ — the name ends in $0$.',
                    'Now, backward: if the name ends in $0$, then $n = d_{k-1} b^{k-1} + \\cdots + d_1 b + 0 = b \\, (d_{k-1} b^{k-2} + \\cdots + d_1)$ — a multiple of $b$ by the combination law\u2019s simplest instance.',
                    'So, divisibility by $b$ and the trailing zero are the same fact in two dresses — the units digit *is* the remainder.',
                    'Take the instances: $16 = 20_8$ and $24 = 30_8$ end in $0$ (both multiples of 8); $25 = 31_8$ ends in $1$ and $8 \\nmid 25$ ✓ — swept for every $n \\le 300$ in the verify script.',
                    'Hence the criterion holds with proof, not pattern-notice — and it is chapter 5\u2019s divisibility tests arriving one base at a time.',
                  ],
                  answer: 'b | n ⟺ the base-b name ends in 0; instances verified',
                },
                {
                  q: 'Find the smallest and largest five-digit numbers in base three, and count the five-digit base-three names.',
                  solution: [
                    'Split: the window $b^{k-1} \\le n \\le b^k - 1$ with $b = 3$, $k = 5$: from $3^4$ to $3^5 - 1$.',
                    'Now, the smallest is $3^4 = 81$, wearing $10000_3$ — one and four zeros.',
                    'So, the largest is $3^5 - 1 = 242$, wearing $22222_3$ — five copies of the largest digit.',
                    'Take the count: $3^5 - 3^4 = 243 - 81 = 162$ names.',
                    'Hence the window $81 \\le n \\le 242$ holds exactly $162$ numbers, each wearing five base-three digits.',
                  ],
                  answer: 'smallest 10000₃ = 81; largest 22222₃ = 242; count 162',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Rebuild $5555_6$ in decimal, and say what it is about this number that made the exercise easy.',
                  solution: [
                    'Split: the seats — $5 \\cdot 216 + 5 \\cdot 36 + 5 \\cdot 6 + 5$.',
                    'Now, the arithmetic: $1080 + 180 + 30 + 5 = 1295$.',
                    'So, $5555_6 = 1295$ — and the structural reason it was easy: this is $6^4 - 1$, the right wall of the four-digit window, the largest four-digit base-six name.',
                    'Take the general fact: a string of $k$ copies of $b - 1$ evaluates to $b^k - 1$ (the geometric sum $(b-1)(b^{k-1} + \\cdots + 1)$) — $999$, $11111111_2 = 255$, $FFF_{16} = 4095$ are the same fact.',
                    'Hence $5555_6 = 1295 = 6^4 - 1$ — the ceiling itself, written out.',
                  ],
                  answer: '5555₆ = 1295 = 6⁴ − 1',
                },
                {
                  q: 'How many digits has one million in base two, and how many in base sixteen? Justify both from the window.',
                  solution: [
                    'Split, base two: grip $10^6$ between powers of $2$ — $2^{19} = 524{,}288$ and $2^{20} = 1{,}048{,}576$.',
                    'Now, $2^{19} \\le 1{,}000{,}000 < 2^{20}$: twenty bits.',
                    'So, base sixteen: $16^4 = 65{,}536$ and $16^5 = 1{,}048{,}576$; again $16^4 \\le 10^6 < 16^5$ — five hex symbols.',
                    'Take the consistency check: twenty bits regroup in fours (sixteen $= 2^4$) into exactly five nibbles — the two answers agree, as Lesson 3.2\u2019s machine tables will make exact.',
                    'Hence one million wears twenty bits or five hex symbols — same number, different seats.',
                  ],
                  answer: '20 bits; 5 hex digits (both windows grip 10⁶)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Rebuild $5031_7$ in decimal, then name the result in base fourteen (the charter lends $C$ for twelve).',
                  solution: [
                    'Split, the rebuild: $5 \\cdot 343 + 0 \\cdot 49 + 3 \\cdot 7 + 1 = 1715 + 0 + 21 + 1 = 1737$.',
                    'Now, base fourteen by the engine: $1737 = 8 \\cdot 196 + 129$? — no: $8 \\cdot 196 = 1568$, remainder $169$; then $169 = 12 \\cdot 14 + 1$; then $12 = 0 \\cdot 14 + 12$ — three machines.',
                    'So, read upward: $8, 12, 1$ — and twelve prints as $C$: the name $8C1_{14}$.',
                    'Take the rebuild check: $8 \\cdot 196 + 12 \\cdot 14 + 1 = 1568 + 168 + 1 = 1737$ ✓.',
                    'Hence $5031_7 = 1737 = 8C1_{14}$ — a three-base relay, every leg certified.',
                  ],
                  answer: '5031₇ = 1737 = 8C1₁₄',
                },
                {
                  q: 'Prove: for every base $b \\ge 2$ and every $k \\ge 1$, exactly $b^k$ natural numbers wear names of at most $k$ digits. Check the instances $(b, k) = (2, 8)$ and $(10, 3)$.',
                  solution: [
                    'Split: “at most $k$ digits” is the union of the windows $[1, b - 1], [b, b^2 - 1], \\dots, [b^{k-1}, b^k - 1]$, plus the number $0$.',
                    'Now, the windows are disjoint (each begins exactly where the previous ends $+ 1$), so the union is exactly $[0, \\; b^k - 1]$ — the window\u2019s walls stack into one interval.',
                    'So, the count is $b^k$ (the numbers $0$ through $b^k - 1$), with nothing outside: any $n \\ge b^k$ needs $k + 1$ digits by the window theorem.',
                    'Take the instances: $b = 2, k = 8$: exactly $2^8 = 256$ numbers, $0$ through $255$, hold at-most-eight-bit names — the byte\u2019s whole world; $b = 10, k = 3$: exactly $1000$ numbers $0$ through $999$.',
                    'Hence $b^k$ names of at most $k$ digits — the counting form of the window theorem, and the reason a $k$-bit register holds exactly $2^k$ values.',
                  ],
                  answer: 'exactly b^k numbers (0 through b^k − 1); 256 and 1000 on the instances',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. “The representation theorem is the division algorithm run on the number itself.” Defend the sentence: locate exactly where the descent, the band and Lesson 2.1\u2019s uniqueness do their work in both halves of the theorem, say why nothing was re-proved, and close with what the units-digit identity $d_0 = n \\bmod b$ promises chapter 5.',
                  solution: [
                    'The engine: existence ran the division algorithm $n = q b + d_0$ with divisor $b$, then fed the quotient back — each row a certified instance of Lesson 2.1, no new division theory minted.',
                    'Termination was not new either: the quotients descend strictly ($q < n$ for $b \\ge 2$), and the least-number principle — Lesson 1.3\u2019s burn, reused in 2.1\u2019s existence and 2.3\u2019s Euclidean loop — halts the walk.',
                    'The rebuild used only the product rule $b^{i+1} = b^i \\cdot b$ and substitution: the remainders, read upward, reassemble $n$ — the digits are the remainders.',
                    'Uniqueness was Lesson 2.1\u2019s uniqueness one level up: every seat above the units contributes a multiple of $b$, so the band pins $d_0 = n \\bmod b$; peeling divides the problem down to $0$, and the descent closes the induction. Even the length was forced — the windows $[b^{k-1}, b^k - 1]$ are disjoint, so no impostor of another size fits.',
                    'What was *not* done: no new existence argument for quotients, no fresh uniqueness lemma, no appeal to digits as primitive — every load-bearing step cites a certified theorem.',
                    'The promise: $d_0 = n \\bmod b$ says the units digit is a remainder — so “what remainder does $n$ leave?” becomes “what does the name end in?” Chapter 5 promotes that bridge into congruence arithmetic, where whole classes of numbers share a units digit, and the divisibility tests FM banked are finally derived.',
                    'Hence the sentence is precise, not poetic: naming is the division algorithm with a reading instruction.',
                  ],
                  answer: 'existence = iterated 2.1 with descent; uniqueness = 2.1\u2019s band + peel; d₀ = n mod b plants chapter 5',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The base-b name',
          latex: 'n = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0, \\qquad 0 \\le d_i \\le b - 1, \\quad d_{k-1} \\ne 0',
          note: 'The positional value of the string $d_{k-1} \\dots d_0$; instance $7E9_{16} = 7 \\cdot 256 + 14 \\cdot 16 + 9 = 2025$.',
        },
        {
          kind: 'formula',
          name: 'The digit theorem — the digits are the remainders',
          latex: 'd_i = \\left\\lfloor \\frac{n}{b^i} \\right\\rfloor \\bmod b',
          note: 'Digit $i$ from the right is the remainder after $i$ divisions by $b$; the units digit is $d_0 = n \\bmod b$. The chapter\u2019s one slogan.',
        },
        {
          kind: 'formula',
          name: 'The digit-count window',
          latex: 'b^{k-1} \\ \\le \\ n \\ \\le \\ b^k - 1',
          note: 'Exactly the $k$-digit names. Largest: $b^k - 1$ ($999$; $255 = 2^8 - 1$; $FFF = 4095$). Count of $k$-digit names: $b^k - b^{k-1}$ ($90$, $900$, $128$).',
        },
        {
          kind: 'formula',
          name: 'The naming engine',
          latex: 'n \\to q_0 \\xrightarrow{\\;r_0\\;} q_1 \\xrightarrow{\\;r_1\\;} \\cdots \\to 0: \\quad n = (\\text{read } r \\text{ upward})_b',
          note: 'Divide by $b$, keep the remainder, repeat until the quotient is $0$, read the remainders upward. Existence and uniqueness inherited from Lesson 2.1 — never re-proved.',
        },
        {
          kind: 'para',
          text: 'The theorem is now standing, but a theorem is not yet a craft. Knowing that $2025$ owns exactly one base-sixteen name is not the same as finding it quickly, checking it without tears, or sliding between the machine bases at sight. The next lesson turns the engine into technique: repeated division downward, Horner’s rebuild upward, and the regrouping tables that let binary, octal and hexadecimal exchange names with no arithmetic at all — every conversion certified by the round trip, every shortcut licensed by this lesson’s uniqueness.',
        },
      ],
    },
    {
      id: 'ans-converting-between-bases',
      number: '3.2',
      title: 'Converting Between Bases',
      prerequisites: ['ans-representation-theorem-unique-name', 'ans-division-with-rest-the-division-algorithm'],
      sources: ['leibniz-1703-binary', 'knuth-taocp-v2', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'Down-conversion: repeated division',
        'Reading the remainders upward',
        'Up-conversion: the positional rebuild',
        "Horner's scheme and the doubling machine",
        'The regrouping shortcut 2 ↔ 8 ↔ 16',
        'Nibbles and the hex letter charter',
        'The base-ten bridge for arbitrary bases',
        'One number, many dresses',
      ],
      objectives: [
        'Convert from base ten to any base $b$ by the naming engine — divide, keep the remainder, repeat, read upward — and certify every conversion by rebuilding',
        'Convert from base $b$ back to base ten by the positional sum and by Horner\u2019s nested form, and prove the doubling machine correct',
        'Convert between binary, octal and hexadecimal by regrouping bits in threes and fours — with the power-law theorem that licenses the shortcut proved, not asserted',
        'Bridge arbitrary bases through base ten, and run the unknown-base exam shape $35_b = 23$ from the digit-band veto to the unique answer',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 3.1 proved that names exist and are unique in every base; this lesson teaches the craft of moving between them. The movement has exactly two directions, and both are old machinery operated with new intent. Going **down** — from base ten into base $b$ — is the naming engine itself: the division algorithm run on the number, one digit falling out per turn. Going **up** — from base $b$ back to base ten — is evaluating the polynomial that the definition of a name always promised it was. Around those two directions floats one gorgeous shortcut: because eight is $2^3$ and sixteen is $2^4$, the machine bases interconvert by *looking* — regrouping bits, no arithmetic anywhere. By the end of the lesson one number will wear six dresses at once, and you will be able to change any of them into any other.',
        },
        {
          kind: 'para',
          text: 'One commitment from Lesson 3.1 governs everything: every conversion below is **certified by rebuilding**. A conversion that cannot survive the round trip — down into $b$, back up, and land on the starting number — is a slip, not an answer. The verify script behind this chapter ran every instance both directions before a word was written; the exercises will ask you for nothing less.',
        },
        { kind: 'heading', text: 'Down: from ten into b — repeated division' },
        {
          kind: 'para',
          text: 'The naming engine of Lesson 3.1 *is* the down-conversion; there is nothing new to learn, only a procedure to make smooth. Divide the number by $b$; the remainder is the rightmost digit. Divide the quotient by $b$; the remainder is the next digit. Continue until the quotient is $0$ — the descent guarantees it halts — and read the remainders upward, last first. The reading direction is the whole trick: the **first** remainder a machine emits is the **last** digit of the name, the units digit, because it is the coefficient of $b^0$; each further turn climbs one seat. Reversing that order in your head while the chain is still on paper is the single most common conversion slip in examinations — the caution box below keeps score.',
        },
        {
          kind: 'example',
          title: 'Convert 2025 to binary — eleven machines, read upward',
          steps: [
            'Split: the divisor is $2$, so every remainder is a bit — the band $\\{0, 1\\}$ leaves no room for style.',
            'Now, the cascade, largest first: $2025 = 1012 \\cdot 2 + 1$; $1012 = 506 \\cdot 2 + 0$; $506 = 253 \\cdot 2 + 0$; $253 = 126 \\cdot 2 + 1$; $126 = 63 \\cdot 2 + 0$; $63 = 31 \\cdot 2 + 1$; $31 = 15 \\cdot 2 + 1$; $15 = 7 \\cdot 2 + 1$; $7 = 3 \\cdot 2 + 1$; $3 = 1 \\cdot 2 + 1$; $1 = 0 \\cdot 2 + 1$ — eleven machines, every row a clean division-algorithm instance.',
            'So, the remainders in production order: $1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1$.',
            'Take them upward — last first: $11111101001_2$.',
            'Hence $2025 = 11111101001_2$, certified by rebuilding: $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 1 = 2025$ ✓ — and the bit count 11 agrees with the digit-count window ($2^{10} \\le 2025 < 2^{11}$).',
          ],
        },
        {
          kind: 'example',
          title: 'Convert 2025 to bases five and eight — same engine, different bands',
          steps: [
            'Split, base five: $2025 = 405 \\cdot 5 + 0$; $405 = 81 \\cdot 5 + 0$; $81 = 16 \\cdot 5 + 1$; $16 = 3 \\cdot 5 + 1$; $3 = 0 \\cdot 5 + 3$ — five machines.',
            'Now, read upward: $3, 1, 1, 0, 0$ — so $2025 = 31100_5$, rebuilt as $3 \\cdot 625 + 125 + 25 = 1875 + 150 = 2025$ ✓.',
            'So, base eight: $2025 = 253 \\cdot 8 + 1$; $253 = 31 \\cdot 8 + 5$; $31 = 3 \\cdot 8 + 7$; $3 = 0 \\cdot 8 + 3$ — four machines.',
            'Take them upward: $3, 7, 5, 1$ — $2025 = 3751_8$, rebuilt as $3 \\cdot 512 + 7 \\cdot 64 + 5 \\cdot 8 + 1 = 1536 + 448 + 40 + 1 = 2025$ ✓.',
            'Hence one number, three new dresses this page alone — the engine does not care how large the base; only the band widens.',
          ],
        },
        {
          kind: 'algorithm',
          title: 'Base ten → base b (and back) — the round trip',
          lines: [
            { code: 'DOWN (ten → b):', note: 'the naming engine, Lesson 3.1' },
            { code: '  while n > 0: emit n mod b; n ← ⌊n/b⌋', note: 'one digit per turn; halts by descent' },
            { code: '  read the emitted remainders in REVERSE', note: 'first out = units digit — the reading direction' },
            { code: 'UP (b → ten):', note: 'two certified engines' },
            { code: '  either Σ dᵢ·bⁱ  (seats, right to left)', note: 'the positional sum — the definition' },
            { code: '  or acc ← acc·b + d, left to right', note: "Horner — the doubling machine when b = 2" },
            { code: 'CERTIFY: the round trip lands on the start', note: 'a conversion without a rebuild is a rumor' },
          ],
          note: 'Every examination conversion is one of these rows with the numbers changed; the certification row is what separates a finished answer from a lucky one.',
        },
        { kind: 'heading', text: 'Up: from b back to ten — the name is a polynomial' },
        {
          kind: 'para',
          text: 'The definition of a base-$b$ name already contains the upward route: $n = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0$. Evaluating that sum seat by seat — rebuild engine one — always works. But a polynomial has a second, nested dress, and for long names it is faster and far less error-prone. The idea goes back to the classical method of **Horner**: factor the powers out of the sum, layer by layer, until no exponent survives.',
        },
        {
          kind: 'equation',
          latex: 'n \\; = \\; \\bigl( \\cdots ( ( d_{k-1} \\, b + d_{k-2} ) \\, b + d_{k-3} ) \\, b + \\cdots + d_1 \\bigr) \\, b + d_0',
          note: 'Horner’s nested form: $k - 1$ multiplications and $k$ additions, no exponent arithmetic anywhere. Start with the leading digit; at each step multiply the running value by the base and add the next digit.',
        },
        {
          kind: 'derivation',
          title: 'Why the doubling machine rebuilds the number',
          statement:
            'Claim: reading a base-$b$ name left to right and updating $acc \\leftarrow acc \\cdot b + d$ for each digit leaves, after the last digit, exactly the value of the name. In binary — where the step is $acc \\leftarrow 2 \\cdot acc + d$ — this is the doubling machine.',
          steps: [
            {
              label: 'The invariant: acc names the prefix',
              formula: '\\text{after reading } d_{k-1} \\dots d_j: \\quad acc = d_{k-1} b^{k-1-j} + \\cdots + d_{j+1} b + d_j',
              explanation:
                'Claim this holds at every pause. Base case: after the leading digit, $acc = d_{k-1}$ — the one-digit prefix, valued honestly. The claim is a statement about every prefix of the name, proved by walking the digits once.',
            },
            {
              label: 'One step preserves it',
              formula: 'acc \\cdot b + d_{j-1} = \\bigl( d_{k-1} b^{k-1-j} + \\cdots + d_j \\bigr) b + d_{j-1} = d_{k-1} b^{k-j} + \\cdots + d_j b + d_{j-1}',
              explanation:
                'Multiply the invariant through by $b$ (each seat climbs one — the distributive and product laws doing exactly what they did in Lesson 3.1\u2019s rebuild) and add the new digit in the vacated units seat. The new running value is the value of the prefix one digit longer. The step is the induction.',
            },
            {
              label: 'The last digit lands the claim',
              formula: 'j = 0: \\quad acc = d_{k-1} b^{k-1} + \\cdots + d_1 b + d_0 = n',
              explanation:
                'When the walk runs out of digits, the invariant has become the full positional sum — the name\u2019s value, by definition. No exponent was ever computed; the seats climbed by multiplication alone. For $b = 2$ the update is “double, then add the bit” — a machine simple enough that a child can run it, and exactly the machine binary long arithmetic will reuse in Lesson 3.3.',
            },
          ],
          result:
            'Horner’s fold evaluates any base-$b$ name with one multiply-and-add per digit. The doubling machine is its $b = 2$ dress — and the invariant “acc is the value of the prefix read so far” is worth remembering as the *reason* it cannot lie.',
        },
        {
          kind: 'example',
          title: 'Rebuild 7E9₁₆ and 101101₂ — both engines, side by side',
          steps: [
            'Split, seats first: $7E9_{16} = 7 \\cdot 256 + 14 \\cdot 16 + 9 = 1792 + 224 + 9 = 2025$.',
            'Now, Horner on the same name: start $acc = 0$; read $7$: $acc = 0 \\cdot 16 + 7 = 7$; read $E$: $acc = 7 \\cdot 16 + 14 = 126$; read $9$: $acc = 126 \\cdot 16 + 9 = 2025$.',
            'So, both engines land on $2025$ — the nested form simply defers each multiplication until the next digit arrives.',
            'Take the doubling machine on $101101_2$: $acc = 0 \\to 1 \\to 2 \\to 5 \\to 11 \\to 22 \\to 45$ — double, add the bit, six times.',
            'Hence $101101_2 = 45$ with every intermediate certified ($1, 2, 5, 11, 22$ each names the prefix read so far) — and $7E9_{16} = 2025$ both ways.',
          ],
        },
        { kind: 'heading', text: 'The machine tables: 2 ↔ 8 ↔ 16 by regrouping' },
        {
          kind: 'para',
          text: 'Between the machine bases, conversion stops being arithmetic and becomes bookkeeping. The reason is a power law: $8 = 2^3$ and $16 = 2^4$, so every block of three consecutive bits lands exactly on one octal digit, and every block of four on one hexadecimal digit. Split the binary name into blocks from the **right** (padding with leading zeros to complete the end block), translate each block through a small fixed table, done. No division, no multiplication, no addition — the seats merely regroup, as the theorem below makes exact. The two lookup tables are small enough to memorise, and every entry is one line of binary counting:',
        },
        {
          kind: 'table',
          caption: 'The hexadecimal charter: sixteen values, their nibbles, their symbols. The letters A–F are digits — ten through fifteen — not variables.',
          head: ['value', 'nibble', 'hex symbol'],
          rows: [
            ['0', '0000', '0'],
            ['1', '0001', '1'],
            ['2', '0010', '2'],
            ['3', '0011', '3'],
            ['4', '0100', '4'],
            ['5', '0101', '5'],
            ['6', '0110', '6'],
            ['7', '0111', '7'],
            ['8', '1000', '8'],
            ['9', '1001', '9'],
            ['10', '1010', 'A'],
            ['11', '1011', 'B'],
            ['12', '1100', 'C'],
            ['13', '1101', 'D'],
            ['14', '1110', 'E'],
            ['15', '1111', 'F'],
          ],
        },
        {
          kind: 'para',
          text: 'The octal companion is the same idea two bits smaller: $000, 001, 010, 011, 100, 101, 110, 111$ carry the values zero through seven — eight triples for eight digits. A four-bit block has a name of its own: a **nibble** — half a byte, one hex digit\u2019s worth of bits. (The byte itself — eight bits, exactly two nibbles, the register that holds $2^8 = 256$ values — belongs to Lesson 3.4, where the machine finally takes the stage.)',
        },
        {
          kind: 'derivation',
          title: 'Why regrouping works: the power law behind the tables',
          statement:
            'Claim: let $b = 2^m$ (so $m = 3$ gives octal, $m = 4$ hexadecimal). Pad the binary name of $n$ with leading zeros to a multiple of $m$ bits, split into blocks of $m$ from the right, and let each block\u2019s own binary value be a digit of base $b$. Then these digits are precisely the canonical base-$b$ name of $n$ — the same digits the division engine emits.',
          steps: [
            {
              label: 'One block, one seat',
              formula: '2^{mi + j} = (2^m)^i \\cdot 2^j',
              explanation:
                'The power law — verified by direct computation for every $m \\le 6$, $i \\le 6$, $j < m$ in the chapter\u2019s verify script. Read right to left: a bit sitting $mi + j$ seats above the units seat contributes $2^{mi+j}$; the law splits that into $(2^m)^i$ — a *base-$b$* seat $i$ stories up — times $2^j$, a weight *inside* one block.',
            },
            {
              label: 'The bits factor into block-values times base-b seats',
              formula: 'n = \\sum_{\\text{blocks } i} \\; ( \\text{value of block } i ) \\cdot (2^m)^i',
              explanation:
                'Group the positional sum by blocks of $m$ consecutive bits: within block $i$, the weights $2^j$ ($j = 0, \\dots, m-1$) sum with the block\u2019s bits to the block\u2019s own binary value — a number between $0$ and $2^m - 1 = b - 1$, i.e. squarely in the base-$b$ digit band. What remains outside the blocks is exactly the base-$b$ seat values $(2^m)^i = b^i$.',
            },
            {
              label: 'The uniqueness of names finishes it',
              formula: '\\text{a decomposition } n = \\sum c_i b^i, \\ 0 \\le c_i \\le b-1 \\ \\Rightarrow\\ c_i = \\text{the base-} b \\text{ digits}',
              explanation:
                'Step 2 exhibited *a* legitimate base-$b$ decomposition of $n$ — digits in band, seats at powers of $b$. Lesson 3.1\u2019s uniqueness theorem says there is only one such decomposition: the canonical name. So the regrouped digits coincide, block for block, with the engine\u2019s digits — the shortcut inherits the theorem. (The verify script swept $n \\le 5000$: regrouping digits equal division digits, every time, for both $m = 3$ and $m = 4$.)',
            },
          ],
          result:
            'Because $8 = 2^3$ and $16 = 2^4$, regrouping bits in threes or fours from the right *is* conversion — no arithmetic, licensed by the power law and Lesson 3.1\u2019s uniqueness. The same argument regroups upward: octal and hex names expand into binary by the tables run in reverse.',
        },
        {
          kind: 'example',
          title: 'One cascade, two regroupings: 2025 from binary to octal and hexadecimal',
          steps: [
            'Split: Lesson 3.1 (and Illustration 1 here) named $2025 = 11111101001_2$ — eleven bits.',
            'Now, pad one leading zero to reach twelve — padding changes nothing (Lesson 3.1): $011111101001$.',
            'So, regroup in threes from the right: $011 \\; | \\; 111 \\; | \\; 101 \\; | \\; 001$ — the triples carry $3, 7, 5, 1$: $2025 = 3751_8$ ✓ (rebuilt: $1536 + 448 + 40 + 1$).',
            'Take the fours: $0111 \\; | \\; 1110 \\; | \\; 1001$ — the nibbles carry $7, E, 9$: $2025 = 7E9_{16}$ ✓ (rebuilt: $1792 + 224 + 9$).',
            'Hence both machine dresses from one binary string, zero arithmetic — and both agree with the division engine of Illustration 2, exactly as the regrouping theorem demands. The figure below watches it happen.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The regrouping machine: the twelve padded bits of 2025 (011111101001 — the leading zero is padding, Lesson 3.1) split from the right into four-bit nibbles, giving 7 · E · 9 = 7E9₁₆, and into three-bit triples, giving 3 · 7 · 5 · 1 = 3751₈. Both regroupings were certified against the division engine: 7E9₁₆ = 3751₈ = 11111101001₂ = 2025. No arithmetic anywhere — the tables translate, the seats regroup.',
          svg: `<svg viewBox="0 0 920 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twelve bit boxes 011111101001 regrouping into three nibbles 7 E 9 and four triples 3 7 5 1">
  <text x="432" y="55" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.85">the bits of 2025, padded to twelve</text>
  <!-- twelve bit boxes -->
  <g fill="none" stroke="currentColor" stroke-width="1.3">
    <rect x="54" y="84" width="52" height="52"/><rect x="118" y="84" width="52" height="52"/><rect x="182" y="84" width="52" height="52"/><rect x="246" y="84" width="52" height="52"/><rect x="310" y="84" width="52" height="52"/><rect x="374" y="84" width="52" height="52"/><rect x="438" y="84" width="52" height="52"/><rect x="502" y="84" width="52" height="52"/><rect x="566" y="84" width="52" height="52"/><rect x="630" y="84" width="52" height="52"/><rect x="694" y="84" width="52" height="52"/><rect x="758" y="84" width="52" height="52"/>
  </g>
  <g font-size="19" fill="currentColor" text-anchor="middle">
    <text x="80" y="117">0</text><text x="144" y="117">1</text><text x="208" y="117">1</text><text x="272" y="117">1</text><text x="336" y="117">1</text><text x="400" y="117">1</text><text x="464" y="117">1</text><text x="528" y="117">0</text><text x="592" y="117">1</text><text x="656" y="117">0</text><text x="720" y="117">0</text><text x="784" y="117">1</text>
  </g>
  <!-- nibble braces: groups of 4 -->
  <g fill="none" stroke="currentColor" stroke-width="1.2">
    <path d="M54,150 L54,160 L298,160 L298,150"/>
    <path d="M310,150 L310,160 L590,160 L590,150"/>
    <path d="M602,150 L602,160 L810,160 L810,150"/>
  </g>
  <g font-size="21" fill="currentColor" text-anchor="middle">
    <text x="176" y="196">7</text>
    <text x="450" y="196">E</text>
    <text x="706" y="196">9</text>
  </g>
  <text x="860" y="196" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.85">in fours: 7E9</text>
  <!-- triple braces: groups of 3 -->
  <g fill="none" stroke="currentColor" stroke-width="1.2">
    <path d="M54,235 L54,245 L234,245 L234,235"/>
    <path d="M246,235 L246,245 L426,245 L426,235"/>
    <path d="M438,235 L438,245 L618,245 L618,235"/>
    <path d="M630,235 L630,245 L810,245 L810,235"/>
  </g>
  <g font-size="21" fill="currentColor" text-anchor="middle">
    <text x="144" y="281">3</text>
    <text x="336" y="281">7</text>
    <text x="528" y="281">5</text>
    <text x="720" y="281">1</text>
  </g>
  <text x="860" y="281" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.85">in threes: 3751</text>
  <!-- the bottom line -->
  <text x="432" y="352" font-size="16" fill="currentColor" text-anchor="middle">2025 = 7E9<tspan dy="4" font-size="11">16</tspan><tspan dy="-4" font-size="16"> = 3751</tspan><tspan dy="4" font-size="11">8</tspan><tspan dy="-4" font-size="16"> = 11111101001</tspan><tspan dy="4" font-size="11">2</tspan></text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Run the tables backwards: 55₈ to hexadecimal, and FACE to binary',
          steps: [
            'Split, octal to binary: each octal digit expands to its fixed triple — $55_8$: the digit $5$ is $101$, the next $5$ is $101$: the bits $101101$.',
            'Now, regroup in fours from the right: $101101$ has six bits — pad two: $00101101$; the nibbles $0010$ and $1101$ carry $2$ and $13 = D$: $2D_{16}$.',
            'So, $55_8 = 2D_{16}$ — via bits only; and the certifying rebuilds agree: $55_8 = 45$, $101101_2 = 45$, $2D_{16} = 2 \\cdot 16 + 13 = 45$ ✓.',
            'Take hex to binary the same way: $FACE_{16}$ — nibbles $F = 1111$, $A = 1010$, $C = 1100$, $E = 1110$: the sixteen bits $1111101011001110$, value $15 \\cdot 4096 + 10 \\cdot 256 + 12 \\cdot 16 + 14 = 61440 + 2560 + 192 + 14 = 64206$ ✓ (and $FACE < FFFF = 65535$, the four-symbol ceiling).',
            'Hence the tables run both directions — regrouping is conversion because it *is* the same name, written in larger or smaller blocks.',
          ],
        },
        { kind: 'heading', text: 'The bridge: arbitrary bases through ten' },
        {
          kind: 'para',
          text: 'What about bases with no power-of-two kinship — from twelve to five, say? The honest route until Lesson 3.3 builds arithmetic *inside* other bases is the **base-ten bridge**: convert to decimal by rebuild (up), then out of decimal by the engine (down). Two legs, each already certified.',
        },
        {
          kind: 'example',
          title: 'Bridge 1209₁₂ into base five — and 67₁₂ into base three',
          steps: [
            'Split: the first leg up — $1209_{12} = 1 \\cdot 1728 + 2 \\cdot 144 + 0 \\cdot 12 + 9 = 2025$.',
            'Now, the second leg down — Lesson 3.2\u2019s own engine on $2025$ with divisor $5$: $405 r 0$, $81 r 0$, $16 r 1$, $3 r 1$, $0 r 3$ — read upward: $31100_5$.',
            'So, $1209_{12} = 31100_5$, and the full round trip certifies: $3 \\cdot 625 + 1 \\cdot 125 + 1 \\cdot 25 = 1875 + 125 + 25 = 2025$ ✓.',
            'Take the shorter instance: $67_{12} = 6 \\cdot 12 + 7 = 79$; then $79$ into base three: $79 = 26 \\cdot 3 + 1$, $26 = 8 \\cdot 3 + 2$, $8 = 2 \\cdot 3 + 2$, $2 = 0 \\cdot 3 + 2$ — read upward $2221_3$; rebuild $54 + 18 + 6 + 1 = 79$ ✓.',
            'Hence $1209_{12} = 31100_5$ and $67_{12} = 2221_3$ — arbitrary pairs bridged through ten, every leg certified; Lesson 3.3 will remove the bridge by doing the divisions directly in the source base.',
          ],
        },
        {
          kind: 'para',
          text: 'With all routes on the table, one number can wear its full wardrobe: $45 = 101101_2 = 1200_3 = 55_8 = 39_{12} = 2D_{16}$ — five dresses, one number, every conversion certified. And the year this chapter was written: $2025 = 11111101001_2 = 31100_5 = 5622_7 = 3751_8 = 1209_{12} = 7E9_{16}$ — six dresses. The subscript is not decoration; it is the only thing telling these strings apart.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Leibniz’s binary, 1679–1703',
          text: 'Binary arithmetic — the $0$/$1$ machine of Illustration 1 — was worked out in full by Gottfried Wilhelm Leibniz: a 1679 manuscript (*De Progressione Dyadica*) already runs addition, subtraction, multiplication and division in base two, and a 1697 letter spreads the idea. In 1701 the Jesuit Joachim Bouvet, missionary at the Kangxi court, sent Leibniz the Fu Xi arrangement of the I Ching\u2019s sixty-four hexagrams; reading each hexagram\u2019s lines as bits (unbroken $1$, broken $0$) counts exactly $0$ through $63$. Leibniz published “Explication de l\u2019Arithmétique Binaire” in the Paris Académie\u2019s Mémoires in 1703, delighting that the ancient figure and his arithmetic shared one structure. The modern hedge belongs in any honest telling: the hexagram ordering is the eleventh-century arrangement of Shao Yong, no ancient Chinese text treats it as a counting system, and Leibniz\u2019s arithmetic predates the correspondence — he *recognized* his system in the diagram; he did not borrow it. The machine bases of this lesson ran idle for two centuries before electrified switches made them the hardware of the world — Lesson 3.4\u2019s curtain.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Reading direction is the whole exam',
          text: 'Every conversion error in the wild is one of three slips, and two are the same slip. (1) Reading remainders downward instead of upward — the first machine\u2019s remainder is the *units* digit, so the chain must be read last-first: dividing 2025 by 16 emits 9, then 14, then 7, and the name is $7E9$, not $9E7$. (2) Forgetting the pad: regroup from the **right**, padding the left end — $101101$ in fours is $0010 \\ 1101$, not $1011 \\ 01$. (3) Trusting a conversion without rebuilding it — the one error this lesson\u2019s certify-everything habit makes structurally impossible.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Hex letters are digits, and subscripts are load-bearing',
          text: '$2D_{16}$ is one number — two sixteens and thirteen ones — not “2 times D”; the letters A through F are the digit charter for the values ten through fifteen, chosen because single symbols must stay single. And the subscript does real work: $55_8 = 45$ while bare “55” names fifty-five — dropping the subscript converts a correct answer into a wrong one. In working, write the subscript on every name in every base including ten until the final line; the discipline costs one stroke and saves the mark.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Conversion drills are a standing block of the competitive syllabi (Khattar\u2019s QA chapter 1 keeps them with the number-system staples): “convert $(1101011)_2$ to decimal” — Horner; “convert $2025$ to base $2$, $8$, $16$” — the engine, then the tables; “express $55_8$ in hexadecimal” — the regrouping run. The sophisticated shape is the **unknown base**: “if $35_b = 23$ in base ten, find $b$” — the rebuild turns the string into a linear equation $3b + 5 = 23$, so $b = 6$, and the digit band vetoes anything below $6$ before the algebra even speaks (its sibling: $41_b = 53$ gives $4b + 1 = 53$, $b = 13$). The shapes are cited, not reproduced — and every one of them is Lesson 3.1\u2019s representation theorem wearing a question paper.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Down-conversion', def: 'Base ten → base $b$ by the naming engine: divide by $b$, emit the remainders, read them upward — last remainder first.' },
            { term: 'Up-conversion', def: 'Base $b$ → base ten: evaluate the name as the positional sum $\\sum d_i b^i$, or by Horner\u2019s nested form — the same value, computed without exponents.' },
            { term: "Horner's scheme", def: 'The nested evaluation $acc \\leftarrow acc \\cdot b + d$ across the digits from the left; the invariant “$acc$ is the value of the prefix read so far” proves it. In base two: the doubling machine.' },
            { term: 'Doubling machine', def: 'Horner at $b = 2$: double the accumulator, add the bit. Instance: $101101_2$ walks $1, 2, 5, 11, 22, 45$ — every intermediate certifying a prefix.' },
            { term: 'Nibble', def: 'A four-bit block — one hexadecimal digit\u2019s worth of bits; half a byte. The sixteen nibbles $0000$–$1111$ carry the values $0$–$15$, printed $0$–$9$ then $A$–$F$.' },
            { term: 'Regrouping shortcut', def: 'For $b = 2^m$: split the binary name into blocks of $m$ from the right (pad the left end), translate each block by the fixed table — licensed by $2^{mi+j} = (2^m)^i \\cdot 2^j$ and Lesson 3.1\u2019s uniqueness. Threes for octal, fours for hex.' },
            { term: 'Base-ten bridge', def: 'Converting between arbitrary bases $b_1 \\to b_2$ in two certified legs: rebuild into ten, engine out of ten — until Lesson 3.3\u2019s in-base arithmetic removes the middleman.' },
            { term: 'Unknown base', def: 'The exam shape $\\text{name}_b = \\text{value}$: the rebuild turns it into a linear equation in $b$, with the digit band vetoing small roots before algebra — $35_b = 23$ forces $b = 6$.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'What is 45 in binary?',
              options: ['$101101_2$', '$110101_2$', '$101011_2$', '$111001_2$'],
              answer: 0,
              explain: 'The engine: $45 = 22 \\cdot 2 + 1$, $22 = 11 \\cdot 2 + 0$, $11 = 5 \\cdot 2 + 1$, $5 = 2 \\cdot 2 + 1$, $2 = 1 \\cdot 2 + 0$, $1 = 0 \\cdot 2 + 1$ — read upward, $101101_2 = 32 + 8 + 4 + 1$. The distractors rebuild to $53$, $43$ and $57$ — each was evaluated in the verify script before this page was written.',
            },
            {
              q: 'Dividing 2025 by 16 repeatedly leaves remainders 9, then 14, then 7. The hexadecimal name is:',
              options: ['$9E7_{16}$', '$7E9_{16}$', '$E97_{16}$', '$79E_{16}$'],
              answer: 1,
              explain: 'The remainders must be read upward — the first emitted is the units digit: $7, E, 9$. The distractors are the same three digits in the wrong dresses: $9E7 = 2535$, $E97 = 3735$, $79E = 1950$ — the reading-direction slip, priced in marks.',
            },
            {
              q: 'The nibble 1101 translates to which hex symbol?',
              options: ['D (thirteen)', 'B (eleven)', 'E (fourteen)', 'C (twelve)'],
              answer: 0,
              explain: '$1101 = 8 + 4 + 1 = 13$, and the charter prints thirteen as D. The neighbours: B carries $1011 = 11$, E carries $1110 = 14$, C carries $1100 = 12$ — the table is small, and every entry is one line of counting.',
            },
            {
              q: 'The fastest correct route from a binary name to its hexadecimal name is:',
              options: [
                'Group the bits in fours from the right and translate each nibble',
                'Divide the binary string by 16 repeatedly',
                'Always convert to base ten first',
                'Count the 1-bits',
              ],
              answer: 0,
              explain: 'Sixteen $= 2^4$, so regrouping in fours from the right **is** the conversion — the regrouping theorem licenses it, no arithmetic anywhere. “Dividing a string” is not an operation; the base-ten route works but wastes two legs; counting 1-bits measures population, not position.',
            },
            {
              q: 'What is $55_8$ in decimal?',
              options: ['$45$', '$55$', '$50$', '$40$'],
              answer: 0,
              explain: 'The rebuild: $5 \\cdot 8 + 5 = 45$ — the subscript changes the seats, so the string “55” names forty-five here. Fifty-five is the digit-string trap (reading base-ten reflexes into an octal name); $50_8 = 62$ and $40_8 = 50$ are what the other strings would have to be.',
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
                  q: 'Convert 37 to binary, and certify by rebuilding.',
                  solution: [
                    'Split: the engine with divisor $2$: $37 = 18 \\cdot 2 + 1$; $18 = 9 \\cdot 2 + 0$; $9 = 4 \\cdot 2 + 1$; $4 = 2 \\cdot 2 + 0$; $2 = 1 \\cdot 2 + 0$; $1 = 0 \\cdot 2 + 1$ — six machines.',
                    'Now, read upward: $100101_2$.',
                    'So, the rebuild: $32 + 4 + 1 = 37$ ✓.',
                    'Hence $37 = 100101_2$ — six machines, six bits, window-consistent ($2^5 \\le 37 < 2^6$).',
                  ],
                  answer: '37 = 100101₂ (32 + 4 + 1)',
                },
                {
                  q: 'Rebuild $11011_2$ in decimal — by seats and by the doubling machine.',
                  solution: [
                    'Split, seats: $16 + 8 + 0 + 2 + 1 = 27$.',
                    'Now, the doubling machine: $0 \\to 1 \\to 3 \\to 6 \\to 13 \\to 27$ — double, add the bit, five times.',
                    'So, both engines agree: $11011_2 = 27$.',
                    'Hence the answer — and the intermediate walk $1, 3, 6, 13$ certifies each prefix along the way.',
                  ],
                  answer: '11011₂ = 27 (16 + 8 + 2 + 1)',
                },
                {
                  q: 'Convert 60 to base eight and verify.',
                  solution: [
                    'Split: $60 = 7 \\cdot 8 + 4$; $7 = 0 \\cdot 8 + 4$? — no: $7 = 0 \\cdot 8 + 7$. Two machines.',
                    'Now, read upward: $7, 4$ — the name $74_8$.',
                    'So, rebuild: $7 \\cdot 8 + 4 = 56 + 4 = 60$ ✓.',
                    'Hence $60 = 74_8$.',
                  ],
                  answer: '60 = 74₈ (56 + 4)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Convert 2025 to hexadecimal by the engine, and certify by seats and by Horner.',
                  solution: [
                    'Split: $2025 = 126 \\cdot 16 + 9$; $126 = 7 \\cdot 16 + 14$; $7 = 0 \\cdot 16 + 7$ — three machines.',
                    'Now, read upward with the charter ($14 = E$): $7E9_{16}$.',
                    'So, seats: $7 \\cdot 256 + 14 \\cdot 16 + 9 = 1792 + 224 + 9 = 2025$ ✓.',
                    'Take Horner: $0 \\to 7 \\to 126 \\to 2025$ — the nested fold lands together.',
                    'Hence $2025 = 7E9_{16}$, certified both ways up.',
                  ],
                  answer: '2025 = 7E9₁₆ (1792 + 224 + 9)',
                },
                {
                  q: 'Express $2D_{16}$ in binary two ways — nibble table and division — and confirm they agree.',
                  solution: [
                    'Split, the table: $2 = 0010$, $D = 1101$: the bits $00101101$; stripping the pad, $101101_2$.',
                    'Now, division: $2D_{16} = 45$ (seats $32 + 13$), and the engine names $45 = 101101_2$ (Illustration 1 of Lesson 3.1\u2019s sibling: $22 r 1$, $11 r 0$, $5 r 1$, $2 r 1$, $1 r 0$, $0 r 1$).',
                    'So, both routes give $101101_2$ — the padded and canonical dresses of the same six bits.',
                    'Hence $2D_{16} = 101101_2 = 45$ — the regrouping theorem run in miniature.',
                  ],
                  answer: '2D₁₆ = 101101₂ (= 45), by table and by engine',
                },
                {
                  q: 'Convert 999 to base seven and verify.',
                  solution: [
                    'Split: $999 = 142 \\cdot 7 + 5$; $142 = 20 \\cdot 7 + 2$; $20 = 2 \\cdot 7 + 6$; $2 = 0 \\cdot 7 + 2$ — four machines.',
                    'Now, read upward: $2, 6, 2, 5$ — the name $2625_7$.',
                    'So, rebuild: $2 \\cdot 343 + 6 \\cdot 49 + 2 \\cdot 7 + 5 = 686 + 294 + 14 + 5 = 999$ ✓.',
                    'Hence $999 = 2625_7$ — four machines for four digits, the window agreeing ($7^3 = 343 \\le 999 < 2401 = 7^4$).',
                  ],
                  answer: '999 = 2625₇ (686 + 294 + 14 + 5)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'If $35_b = 23$ in base ten, find $b$. (Do not start with algebra.)',
                  solution: [
                    'Split: the digit band first — the name $35_b$ contains the digit $5$, so $b \\ge 6$ before any equation is written.',
                    'Now, the rebuild: $35_b = 3b + 5$, so $3b + 5 = 23$, giving $3b = 18$ and $b = 6$.',
                    'So, the band veto and the algebra agree — and the root is unique because the equation is linear.',
                    'Take the check: $35_6 = 3 \\cdot 6 + 5 = 23$ ✓.',
                    'Hence $b = 6$ — the unknown-base shape is the representation theorem run in reverse: the string fixes the seats, the value fixes the base.',
                  ],
                  answer: 'b = 6 (3b + 5 = 23; the digit 5 forced b ≥ 6 first)',
                },
                {
                  q: 'Bridge $1209_{12}$ into base five via base ten, certifying both legs.',
                  solution: [
                    'Split, up: $1209_{12} = 1728 + 288 + 0 + 9 = 2025$ (Lesson 3.1\u2019s own instance).',
                    'Now, down: $2025 \\div 5$: $405$ $r$ $0$; $81$ $r$ $0$; $16$ $r$ $1$; $3$ $r$ $1$; $0$ $r$ $3$ — read upward: $31100_5$.',
                    'So, the round trip: $3 \\cdot 625 + 125 + 25 = 2025$ ✓ — both legs certified.',
                    'Hence $1209_{12} = 31100_5$ — the bridge doing exactly what Lesson 3.3 will teach the direct route to do.',
                  ],
                  answer: '1209₁₂ = 2025 = 31100₅, both legs rebuilt',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Convert $55_8$ to hexadecimal without touching base ten.',
                  solution: [
                    'Split: octal to binary by the triple table — $5 = 101$, $5 = 101$: the bits $101101$.',
                    'Now, regroup in fours from the right, padding two: $0010 \\; 1101$ — the nibbles $0010 = 2$, $1101 = D$.',
                    'So, $55_8 = 2D_{16}$ — no decimal anywhere.',
                    'Take the certification (allowed to touch ten): $55_8 = 45$, $2D_{16} = 32 + 13 = 45$ ✓ — the two dresses fit the same number.',
                    'Hence the octal-to-hex route is always: expand by threes, regroup by fours, translate.',
                  ],
                  answer: '55₈ = 101101₂ = 2D₁₆',
                },
                {
                  q: 'Rebuild $FACE_{16}$ in decimal, then express it in binary.',
                  solution: [
                    'Split, the seats: $15 \\cdot 4096 + 10 \\cdot 256 + 12 \\cdot 16 + 14 = 61440 + 2560 + 192 + 14 = 64206$.',
                    'Now, binary by the nibble table: $F = 1111$, $A = 1010$, $C = 1100$, $E = 1110$ — sixteen bits $1111101011001110$.',
                    'So, the rebuild certifies: the doubling machine over the sixteen bits lands on $64206$ ✓ (the verify script ran it).',
                    'Take the ceiling check: four hex symbols cap at $FFFF = 65535$, and $FACE = 64206$ fits below ✓.',
                    'Hence $FACE_{16} = 64206 = 1111101011001110_2$ — sixteen bits, four nibbles, one number.',
                  ],
                  answer: 'FACE₁₆ = 64206 = 1111101011001110₂',
                },
                {
                  q: 'How many bits does one billion need? Answer from the digit-count window, then say how many hex symbols.',
                  solution: [
                    'Split: the window $2^{k-1} \\le n < 2^k$ with $n = 10^9$.',
                    'Now, the grips: $2^{29} = 536{,}870{,}912 \\le 1{,}000{,}000{,}000 < 2^{30} = 1{,}073{,}741{,}824$ — thirty bits.',
                    'So, hex: $16^7 = 268{,}435{,}456 \\le 10^9 < 16^8 = 4{,}294{,}967{,}296$ — eight symbols.',
                    'Take the consistency check: thirty bits regroup in fours into $30/4$… — pad to thirty-two, eight nibbles: the two answers agree, as the regrouping theorem demands.',
                    'Hence a billion wears thirty bits or eight hex symbols — the window and the tables telling one story.',
                  ],
                  answer: '30 bits (2²⁹ ≤ 10⁹ < 2³⁰); 8 hex symbols',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A machine register reads $3751_8$. Express it in binary, in hexadecimal, and in decimal — and say at each step which theorem is doing the work.',
                  solution: [
                    'Split, octal to binary: each digit by the triple table — $3 = 011$, $7 = 111$, $5 = 101$, $1 = 001$: the padded bits $011111101001$; canonically $11111101001_2$ (Lesson 3.1: padding is a costume).',
                    'Now, binary to hex: regroup in fours from the right — $0111 \\; 1110 \\; 1001$: the nibbles $7, E, 9$: $7E9_{16}$ (the regrouping theorem: $16 = 2^4$).',
                    'So, decimal by Horner: $0 \\to 7 \\to 126 \\to 2025$ — or by seats $1792 + 224 + 9 = 2025$ (the polynomial evaluation, both engines agreeing).',
                    'Take the audit: $3751_8 = 2025 = 7E9_{16} = 11111101001_2$ — three theorems (the triple table, the regrouping power law, Horner\u2019s invariant), zero guesses.',
                    'Hence the register holds $2025$ — and every dress change on the way was licensed, not lucky.',
                  ],
                  answer: '3751₈ = 11111101001₂ = 7E9₁₆ = 2025',
                },
                {
                  q: 'State and prove the regrouping theorem for $b = 2^m$, and say exactly where Lesson 3.1\u2019s uniqueness enters.',
                  solution: [
                    'Split, the statement: pad the binary name of $n$ to a multiple of $m$ bits, split into blocks of $m$ from the right; then the blocks, read as binary numbers, are the canonical base-$2^m$ digits of $n$.',
                    'Now, the power law: $2^{mi+j} = (2^m)^i \\cdot 2^j$ (verified by sweep $m \\le 6$, $i \\le 6$, $j < m$) — every bit weight factors into a base-$(2^m)$ seat $(2^m)^i$ times an intra-block weight $2^j$.',
                    'So, grouping the positional sum by blocks exhibits a decomposition $n = \\sum c_i (2^m)^i$ with each $c_i$ a block-value in $[0, 2^m - 1]$ — squarely in the digit band of base $2^m$.',
                    'Take where uniqueness enters: Lesson 3.1 proved such decompositions are unique, so the exhibited decomposition *is* the canonical name — the regrouped digits equal the division-engine digits (swept $n \\le 5000$ for $m = 3, 4$). Without uniqueness the shortcut would only produce *a* valid-looking digit string; with it, the shortcut produces **the** name.',
                    'Hence the theorem: regrouping is conversion because the power law regroups the seats and uniqueness certifies the result.',
                  ],
                  answer: 'power law factors the seats; uniqueness certifies the blocks ARE the digits',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. Conversion as theory in motion: explain how the two directions of conversion are Lesson 3.1\u2019s two halves operated in reverse order (down = the engine = existence at work; up = the rebuild = the definition evaluated), how the regrouping shortcut smuggles uniqueness into a lookup table, and where each route hands off — Lesson 3.3 (arithmetic inside other bases), Lesson 3.4 (the machine), chapter 9 (the history that did it all by hand).',
                  solution: [
                    'Down is existence in motion: the naming engine iterates the division algorithm — each machine emits one digit by the band, the descent halts the loop, and reading upward reverses the emission order because the first remainder sat in the units seat. Converting ten → b is literally running the proof of Lesson 3.1\u2019s first half on a particular $n$.',
                    'Up is the definition evaluated: the rebuild computes $\\sum d_i b^i$ — the very equation the definition of a name asserts — and Horner\u2019s fold reorganizes it so the seats climb by multiplication; the invariant “$acc$ is the prefix\u2019s value” is induction wearing a running shoe.',
                    'The regrouping shortcut is uniqueness turned into furniture: the power law $2^{mi+j} = (2^m)^i 2^j$ exhibits a valid base-$(2^m)$ decomposition by pure bookkeeping, and Lesson 3.1\u2019s uniqueness — that only one in-band decomposition exists — promotes the bookkeeping to a theorem. A lookup table plus one inherited theorem replaces all arithmetic.',
                    'The hand-offs: Lesson 3.3 removes the base-ten bridge by doing arithmetic directly in base $b$ — addition and multiplication tables, the works — so conversions between arbitrary bases stop needing the middleman; Lesson 3.4 wires the binary dress into hardware (bits, bytes, two\u2019s complement — the CS shelf beyond); chapter 9 tells the human story — Babylon\u2019s sixty, the Maya\u2019s twenty, India\u2019s ten — where every dress in this chapter was first worn.',
                    'Hence the lesson\u2019s whole: two certified engines, one inherited theorem, and a wardrobe — conversion is not a trick bag but the representation theorem, operated.',
                  ],
                  answer: 'down = existence at work; up = the definition evaluated; regrouping = uniqueness as furniture',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'Down: ten → b',
          latex: 'n \\to q_0 \\xrightarrow{\\,r_0\\,} q_1 \\xrightarrow{\\,r_1\\,} \\cdots \\to 0: \\quad n = (r_{\\ell-1} \\cdots r_1 r_0)_b',
          note: 'Divide by $b$, keep the remainders, read them upward — instance $2025 \\to 7E9_{16}$. The naming engine of Lesson 3.1, operated.',
        },
        {
          kind: 'formula',
          name: 'Up: b → ten (Horner)',
          latex: 'acc \\leftarrow acc \\cdot b + d \\quad \\text{across the digits, left to right}',
          note: "Horner's nested evaluation; in base two the doubling machine — $101101_2$ walks $1, 2, 5, 11, 22, 45$.",
        },
        {
          kind: 'formula',
          name: 'The regrouping shortcut',
          latex: 'b = 2^m: \\quad \\text{blocks of } m \\text{ bits from the right} \\; = \\; \\text{the base-} b \\text{ digits}',
          note: 'Threes for octal ($55_8 = 101101_2$), fours for hex ($7E9_{16}$); licensed by $2^{mi+j} = (2^m)^i 2^j$ plus Lesson 3.1\u2019s uniqueness.',
        },
        {
          kind: 'formula',
          name: 'The base-ten bridge',
          latex: 'b_1 \\; \\xrightarrow{\\;\\text{rebuild}\\;} \\; 10 \\; \\xrightarrow{\\;\\text{engine}\\;} \\; b_2',
          note: 'Arbitrary pairs via two certified legs — instance $1209_{12} \\to 2025 \\to 31100_5$; Lesson 3.3 removes the middleman.',
        },
        {
          kind: 'para',
          text: 'Every route this lesson built still passes through base ten or through binary — the bridge is honest, but it is a middleman, and the regrouping tables only serve the power-of-two family. The next lesson removes the middleman: addition and multiplication tables built genuinely inside base $b$, so that $31100_5$ can be reached from $1209_{12}$ by dividing *in base twelve*, and so that the machine bases can be added, multiplied and carried in their own digits — the same arithmetic you have run since Foundation Mathematics, wearing its sixth dress. The division algorithm rides along; it always does.',
        },
      ],
    },
    {
      id: 'ans-arithmetic-in-other-bases',
      number: '3.3',
      title: 'Arithmetic in Other Bases',
      prerequisites: ['ans-converting-between-bases', 'ans-division-with-rest-the-division-algorithm'],
      sources: ['knuth-taocp-v2', 'khattar-qa-4e', 'beck-geoghegan-art-of-proof'],
      concepts: [
        'The column method is base-independent',
        'The base-b addition table',
        'Carrying is the division algorithm in motion',
        'Borrowing is a licensed loan',
        'The base-b multiplication table',
        'The shift: one seat left is × b',
        'In-base long division',
        'Casting out (b−1)',
      ],
      objectives: [
        'Build the addition and multiplication tables of any base $b$ from the digit band alone, and read a single-digit product off a table or rebuild it through ten',
        'Run column addition and long multiplication in base $b$ with full control of carries — and prove that the carry is the division algorithm in motion, not a trick',
        'Subtract with borrows, including the double borrow across empty seats, and certify every difference by adding back',
        'Divide inside a base — including the direct conversion $b_1 \\to b_2$ that removes Lesson 3.2\u2019s base-ten middleman — and check results by casting out $(b-1)$',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 3.2 closed with a promise: the base-ten bridge is honest, but it is a middleman, and the next lesson removes it. This is that lesson. Here you learn to add, subtract, multiply and divide *inside* a base — in the base\u2019s own digits, by the base\u2019s own tables, with carries and borrows paid in the base\u2019s own currency. Nothing new is invented. The column algorithms you have run since Foundation Mathematics are base-independent machinery: they work in base five and base twelve for exactly the same reason they work in base ten, and this lesson proves that reason.',
        },
        {
          kind: 'para',
          text: 'The engine discipline continues. Every algorithm below runs on one certified theorem: the division algorithm of Lesson 2.1 — $a = qb + r$ with $0 \\le r < b$, existing and unique. A carry will *be* a quotient; a written digit will *be* a remainder; a borrow will *be* a loan of one unit of the next seat, worth $b$ units of this one, repaid exactly. By the end, the promise of Lesson 3.2 is cashed: $31100_5$ will be reached from $1209_{12}$ by dividing *in base twelve*, and the machine bases of Lesson 3.4 will add and carry in their own digits.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Arithmetic in base b',
          text: 'Fix a base $b \\ge 2$ with its digit band $\\{0, 1, \\dots, b-1\\}$ (Lesson 3.1). Arithmetic **in base $b$** is the same four operations of Foundation Mathematics, performed on base-$b$ names by the column algorithms, with every intermediate quantity — digit, carry, borrow, partial product, quotient, remainder — confined to the band. A **carry** is a unit passed from a column to the next seat leftward; a **borrow** is a unit taken from the next seat and repaid as $b$ units of the current one. Thus, every algorithm below produces, at every step, a clean instance of $s = qb + r$ with $0 \\le r < b$.',
        },
        {
          kind: 'para',
          text: 'For example, the whole lesson in miniature — three facts you can check by eye in base five:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$4_5 + 4_5 = 13_5$ — eight does not fit in one seat, so five of the eight leave as a carry and three stay;',
            '$1000_5 - 234_5 = 211_5$ — the units seat borrows through two empty seats, a loan of one 125 repaid as $5$ twenty-fives, one of which is itself repaid as $5$ fives;',
            '$3_5 \\times 4_5 = 22_5$ — twelve writes two in the units seat and carries two fives.',
          ],
        },
        { kind: 'heading', text: 'The addition table' },
        {
          kind: 'para',
          text: 'Every column addition reduces to single-digit sums, so the first piece of furniture is the **addition table**: for digits $i$ and $j$ of base $b$, the cell holds the base-$b$ name of $i + j$. Since $i + j \\le (b-1) + (b-1) = 2b - 2$, every cell is a one- or two-digit name — and the two-digit cells are exactly where carries are born. Here is the full table for base five, built digit by digit:',
        },
        {
          kind: 'table',
          caption: 'The base-five addition table. Each cell holds i + j written in base five; every two-digit cell (10 and above) hands a carry to the next seat.',
          head: ['$+$', '0', '1', '2', '3', '4'],
          rows: [
            ['0', '0', '1', '2', '3', '4'],
            ['1', '1', '2', '3', '4', '10'],
            ['2', '2', '3', '4', '10', '11'],
            ['3', '3', '4', '10', '11', '12'],
            ['4', '4', '10', '11', '12', '13'],
          ],
        },
        {
          kind: 'para',
          text: 'Read it slowly, because the table is the arithmetic. The top row and left column are the digits themselves (adding zero changes nothing — the identity of FM ch. 2, alive in every base). The body is symmetric: $2 + 4 = 4 + 2 = 11_5$, because addition is commutative — the *fact* is base-independent even though the *names* change. The diagonal $0, 2, 4, 11_5, 13_5$ doubles each digit. And every rollover — every cell that crosses from one digit to two — is the base itself wearing its $10$ dress: $1 + 4 = 10_5$ because five is $10_5$; in base twelve the same cell reads $1 + B = 12_{12}$, because thirteen, not ten, is what overflows there.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'You never memorise this table',
          text: 'In base ten you memorised the addition facts as a child; in an arbitrary base you do not have to. Any cell is one division away: to fill $3 + 4$ in base five, compute $3 + 4 = 7$ by counting (or in ten), then name $7$ in base five with the engine of Lesson 3.1 — $7 = 1 \\cdot 5 + 2$, so $12_5$. The table is *derived furniture*, not a new memory burden. What you must internalise is the pattern of the rollovers: a cell shows two digits exactly when the sum reached the base.',
        },
        { kind: 'heading', text: 'Addition with carries — the division algorithm in motion' },
        {
          kind: 'para',
          text: 'Column addition in base $b$ runs exactly as in base ten: add the units column, write the units digit of the sum, carry the rest; repeat in the next seat, adding the incoming carry. The only thing that changes is $b$ — and the remarkable fact, the one this lesson proves first, is that **the carry is not a convention but a theorem**: it is the quotient of the division algorithm applied to the column\u2019s total.',
        },
        {
          kind: 'derivation',
          title: 'The carry theorem: why the column method works in every base',
          statement:
            'Claim: when a column of digits (plus any incoming carry) totals $s$, writing $s \\bmod b$ in the seat and carrying $\\lfloor s/b \\rfloor$ one seat left preserves the value — and the carry is always $0$ or $1$.',
          steps: [
            {
              label: 'The column\u2019s true value',
              formula: 's \\cdot b^{j} \\quad \\text{for the column in seat } j',
              explanation:
                'A column is not a number; it is a number of *seats*. If the digits and incoming carry in seat $j$ total $s$, the value they contribute to the whole is $s \\cdot b^j$ — the total times the seat\u2019s worth.',
            },
            {
              label: 'Divide the total by the base',
              formula: 's = q \\cdot b + r, \\qquad q = \\lfloor s/b \\rfloor, \\quad r = s \\bmod b',
              explanation:
                'This is exactly the division algorithm of Lesson 2.1 — existence and uniqueness already certified. No new machinery is invented; the column method merely *runs* the old theorem on the column total.',
            },
            {
              label: 'Seat the two pieces',
              formula: 'r \\cdot b^{j} + q \\cdot b^{j+1} = (r + qb) \\cdot b^{j} = s \\cdot b^{j}',
              explanation:
                'Write $r$ in seat $j$ (value $r b^j$) and carry $q$ to seat $j + 1$ (value $q b^{j+1}$, since one unit of seat $j+1$ is worth $b$ units of seat $j$). The two contributions sum to the original column value, exactly. Nothing was lost, nothing invented.',
            },
            {
              label: 'Why the carry is only ever 0 or 1',
              formula: 's \\le (b-1) + (b-1) + 1 = 2b - 1 \\quad \\Rightarrow \\quad \\lfloor s/b \\rfloor \\le 1',
              explanation:
                'The worst column adds two largest digits plus an incoming carry of $1$ (a carry can never exceed $1$, by induction down the row — this step is the induction). And $\\lfloor (2b-1)/b \\rfloor = 1$. So the carry is a single unit — a machine can implement it with one wire, which is precisely what Lesson 3.4 will do.',
            },
          ],
          result:
            'The carry is the quotient of the division algorithm, seated one place up. Carrying is not a rule to remember; it is Lesson 2.1 in motion — every column of every addition in every base is one clean instance of $s = qb + r$.',
        },
        {
          kind: 'example',
          title: 'Add 342₅ + 213₅ in base five — the column machine, watched',
          steps: [
            'Split, the units column: $2 + 3 = 5$, and $5 = 1 \\cdot 5 + 0$ — write $0$, carry $1$ (the carry theorem at $b = 5$).',
            'Now, the fives column: $4 + 1 + 1 = 6$, and $6 = 1 \\cdot 5 + 1$ — write $1$, carry $1$.',
            'So, the twenty-fives column: $3 + 2 + 1 = 6 = 1 \\cdot 5 + 1$ — write $1$, carry $1$.',
            'Take the final carry: it opens a new seat — one 125, since $1$ twenty-five was carried out of the top column.',
            'Hence $342_5 + 213_5 = 1110_5$ — and the rebuild certifies it: $97 + 58 = 155 = 125 + 25 + 5 = 1110_5$ ✓. The figure below watches the machine run.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The column machine in base five: 342₅ + 213₅ = 1110₅. Each column is one division-algorithm instance — the write is the remainder, the carry is the quotient (one seat up). The carry row reads 1, 1, 1 leftward; the final carry opens the new 125s seat. Rebuilding, 97 + 58 = 155 = 1·125 + 1·25 + 1·5 + 0.',
          svg: `<svg viewBox="0 0 920 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column addition of 342 and 213 in base five with carry row 111 and result 1110">
  <g font-size="13" fill="currentColor" opacity="0.85">
    <text x="240" y="42" text-anchor="middle">the machine: add each column,</text>
    <text x="240" y="60" text-anchor="middle">carry the quotient one seat left</text>
  </g>
  <g font-size="13.5" fill="currentColor" text-anchor="middle">
    <text x="240" y="106">2 + 3 = 10₅ → write 0, carry 1</text>
    <text x="240" y="190">4 + 1 + 1 = 11₅ → write 1, carry 1</text>
    <text x="240" y="264">3 + 2 + 1 = 11₅ → write 1, carry 1</text>
    <text x="240" y="336">the last carry opens the 125s seat</text>
  </g>
  <text x="240" y="390" font-size="15" fill="currentColor" text-anchor="middle">342₅ + 213₅ = 1110₅  (= 97 + 58 = 155)</text>
  <!-- carry row -->
  <text x="680" y="72" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">carries</text>
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="572" y="78" width="56" height="40"/>
    <rect x="652" y="78" width="56" height="40"/>
    <rect x="732" y="78" width="56" height="40"/>
  </g>
  <g font-size="16" fill="currentColor" text-anchor="middle">
    <text x="600" y="104">1</text>
    <text x="680" y="104">1</text>
    <text x="760" y="104">1</text>
  </g>
  <!-- addend rows -->
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="652" y="158" width="56" height="48"/>
    <rect x="572" y="158" width="56" height="48"/>
    <rect x="492" y="158" width="56" height="48"/>
    <rect x="652" y="226" width="56" height="48"/>
    <rect x="572" y="226" width="56" height="48"/>
    <rect x="492" y="226" width="56" height="48"/>
  </g>
  <g font-size="17" fill="currentColor" text-anchor="middle">
    <text x="680" y="188">3</text>
    <text x="600" y="188">4</text>
    <text x="520" y="188">2</text>
    <text x="680" y="256">2</text>
    <text x="600" y="256">1</text>
    <text x="520" y="256">3</text>
  </g>
  <!-- the rule -->
  <line x1="492" y1="292" x2="788" y2="292" stroke="currentColor" stroke-width="1.6"/>
  <!-- result row -->
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="732" y="308" width="56" height="48"/>
    <rect x="652" y="308" width="56" height="48"/>
    <rect x="572" y="308" width="56" height="48"/>
    <rect x="492" y="308" width="56" height="48"/>
  </g>
  <g font-size="17" fill="currentColor" text-anchor="middle">
    <text x="760" y="338">1</text>
    <text x="680" y="338">1</text>
    <text x="600" y="338">1</text>
    <text x="520" y="338">0</text>
  </g>
  <!-- seat brackets -->
  <g font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">
    <text x="760" y="390">125s</text>
    <text x="680" y="390">25s</text>
    <text x="600" y="390">5s</text>
    <text x="520" y="390">1s</text>
  </g>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Add 45₁₂ + B7₁₂ in base twelve — letters in the machine',
          steps: [
            'Split, the units column: $5 + 7 = 12$, and $12 = 1 \\cdot 12 + 0$ — write $0$, carry $1$. (Twelve overflows a base-twelve seat, exactly as ten overflows a base-ten one.)',
            'Now, the twelves column: $4 + B + 1 = 4 + 11 + 1 = 16$, and $16 = 1 \\cdot 12 + 4$ — write $4$, carry $1$.',
            'So, the final carry opens the 144s seat: the sum is $140_{12}$.',
            'Take the rebuild: $45_{12} = 53$, $B7_{12} = 11 \\cdot 12 + 7 = 139$, and $53 + 139 = 192 = 144 + 48 = 140_{12}$ ✓.',
            'Hence $45_{12} + B7_{12} = 140_{12}$ — the letters never stall the machine; $B$ is just the digit eleven, and eleven adds like any other digit.',
          ],
        },
        { kind: 'heading', text: 'Subtraction with borrows' },
        {
          kind: 'para',
          text: 'Subtraction is addition run in reverse, and the borrow is the carry\u2019s mirror image. When a units digit $u$ cannot pay a subtrahend digit $d$ — when $u < d$ — the column *borrows* one unit from the next seat leftward. One unit of seat $j + 1$ is worth $b$ units of seat $j$ (that is what seats mean), so the loan converts to $b$ units on the spot: the column pays $d$ out of $u + b$ and writes $(u + b) - d$, while the next seat\u2019s available stock drops by $1$.',
        },
        {
          kind: 'derivation',
          title: 'The borrow law: a loan is a licensed decomposition',
          statement:
            'Claim: if $u < d$, the written digit $(u + b) - d$ with a paid unit from seat $j+1$ leaves the total value unchanged.',
          steps: [
            {
              label: 'The seat\u2019s stock before the loan',
              formula: '(\\text{next seat digit}) \\cdot b^{j+1} + u \\cdot b^{j}',
              explanation:
                'Name the next seat\u2019s digit $c$. The two seats together hold $c \\cdot b^{j+1} + u \\cdot b^j = (cb + u) \\cdot b^j$ — one combined stock of $cb + u$ units of seat $j$.',
            },
            {
              label: 'Take the loan, pay the debt',
              formula: '(cb - 1) \\cdot b^{j+1} + \\big((u + b) - d\\big) \\cdot b^{j} = \\big((c-1)b + u + b - d\\big) \\cdot b^{j} = (cb + u - d) \\cdot b^{j}',
              explanation:
                'Borrowing decrements $c$ by $1$ and credits $b$ to the units stock — the $(c-1)b + (u+b)$ inside the bracket — from which $d$ is paid. Expand: $(c-1)b + u + b = cb + u$. The bracket reads $cb + u - d$: exactly the original stock minus the payment.',
            },
            {
              label: 'The loan is exact',
              formula: '(u + b) - d \\; \\in \\; [1,\\, b-1] \\quad \\text{when } u < d',
              explanation:
                'Since $u \\ge 0$ and $d \\le b - 1$, the written digit lands in the band — no invention, no negative digit, no second borrowing to cover the first at the same seat. If the neighbour\u2019s digit is itself $0$, it must borrow in turn: the walk continues leftward until a nonzero digit is found, and every seat it passes through drops from $0$ to $b - 1$ after lending — the odometer rolling backwards.',
            },
          ],
          result:
            'Borrowing neither creates nor destroys value: it converts one unit of seat $j+1$ into $b$ units of seat $j$, pays the column, and passes the debt leftward. Every difference can be certified by adding back — $(n - m) + m = n$ — which the verify script swept across five bases.',
        },
        {
          kind: 'example',
          title: 'Subtract 1000₅ − 234₅ — the borrow walks two empty seats',
          steps: [
            'Split, the units seat: $0 - 4$ is impossible, so borrow from the fives seat — which holds $0$, so *it* must borrow from the twenty-fives seat — which also holds $0$, so *it* borrows from the 125s seat.',
            'Now, the loans settle right to left: the 125s digit drops $1 \\to 0$; the twenty-fives seat receives $5$ twenty-fives, pays $1$ onward, keeps $4$; the fives seat receives $5$ fives, pays $1$ onward, keeps $4$; the units seat receives $5$.',
            'So, each column subtracts: units $5 - 4 = 1$; fives $4 - 3 = 1$; twenty-fives $4 - 2 = 2$; the 125s seat is spent ($0 - 0 = 0$).',
            'Take the read: $211_5$ — certified by rebuilding, $125 - 69 = 56 = 2 \\cdot 25 + 5 + 1 = 211_5$ ✓ — and by adding back: $211_5 + 234_5$ runs the carries straight back up to $1000_5$ ✓.',
            'Hence the double borrow is just two honest loans: one 125 became five 25s, one of which became five 5s, one of which became five units.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The roll-down: 100₁₂ − 1 = BB₁₂',
          text: 'Subtracting one from a power of the base shows the borrow\u2019s pure form: $1000_5 - 1 = 444_5$, $10000_2 - 1 = 1111_2$, $100_{12} - 1 = BB_{12}$. The single leading 1 decomposes all the way down — one unit of the top seat is worth $b - 1$ units in *every* seat below it. Machine arithmetic meets this shape as an odometer rolling backwards; Lesson 3.4 will meet it again as the largest value a register can hold.',
        },
        { kind: 'heading', text: 'The multiplication tables' },
        {
          kind: 'para',
          text: 'Multiplication needs the same furniture: for digits $i$ and $j$, the cell holding the base-$b$ name of $i \\cdot j$. The largest cell is now $(b-1)^2$, so two-digit cells are common — in base five, everything from $2 \\times 3$ upward carries:',
        },
        {
          kind: 'table',
          caption: 'The base-five multiplication table. Each cell holds i × j in base five; the diagonal carries the squares 1, 4, 14₅, 22₅, 31₅.',
          head: ['$\\times$', '0', '1', '2', '3', '4'],
          rows: [
            ['0', '0', '0', '0', '0', '0'],
            ['1', '0', '1', '2', '3', '4'],
            ['2', '0', '2', '4', '11', '13'],
            ['3', '0', '3', '11', '14', '22'],
            ['4', '0', '4', '13', '22', '31'],
          ],
        },
        {
          kind: 'para',
          text: 'The zero row and column are all zeros — multiplying by zero annihilates, in every base (FM ch. 2\u2019s annihilation law, unchanged). The one row reproduces the digits — one is the identity. The squares run down the diagonal: $4_5 \\times 4_5 = 31_5$, because $16 = 3 \\cdot 5 + 1$. And the base-2 table, tiny as it is, deserves a stare:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$0 \\times 0 = 0$;',
            '$0 \\times 1 = 0$;',
            '$1 \\times 0 = 0$;',
            '$1 \\times 1 = 1$ — four cells, and the product is $1$ precisely when *both* inputs are $1$. Lesson 3.4 will name this table again: it is the AND operation, the gate half of all digital hardware. One machine, two dresses.',
          ],
        },
        {
          kind: 'para',
          text: 'For the bigger machine bases you never print the whole table — you read one row at a time, and every entry is one division away through ten. The row of seven in base eight:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$7 \\times 1 = 7_8$; $7 \\times 2 = 14 = 16_8$; $7 \\times 3 = 21 = 25_8$; $7 \\times 4 = 28 = 34_8$;',
            '$7 \\times 5 = 35 = 43_8$; $7 \\times 6 = 42 = 52_8$; $7 \\times 7 = 49 = 61_8$ — seven cells, each rebuilt from ten and back in one breath.',
          ],
        },
        {
          kind: 'para',
          text: 'And the row of eleven ($B$) in base twelve — the row every base-twelve examination mines, because its final square is beautiful:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$B \\times 1 = B$; $B \\times 2 = 1A_{12}$; $B \\times 3 = 29_{12}$; $B \\times 4 = 38_{12}$; $B \\times 5 = 47_{12}$; $B \\times 6 = 56_{12}$;',
            '$B \\times 7 = 65_{12}$; $B \\times 8 = 74_{12}$; $B \\times 9 = 83_{12}$; $B \\times A = 92_{12}$; and the square: $B \\times B = A1_{12}$, because $121 = 10 \\cdot 12 + 1$ — eleven squared wears the $A1$ dress.',
          ],
        },
        { kind: 'heading', text: 'Long multiplication and the shift' },
        {
          kind: 'para',
          text: 'Multi-digit multiplication in base $b$ is the stack of partial products you already own, with one structural fact doing the work: **the shift**. Multiplying by the digit standing in seat $j$ contributes at seat $j$ — the partial product is written starting $j$ places from the right, which is the same as multiplying the whole partial by $b^j$. Appending one zero to a name shifts it one seat left and multiplies its value by $b$ (swept across five bases by the verify script); that is all the familiar staircase of long multiplication ever did, in base ten as here.',
        },
        {
          kind: 'example',
          title: 'Multiply 23₅ × 34₅ in base five — the staircase in another dress',
          steps: [
            'Split, the units partial: $23_5 \\times 4_5$. Digit by digit: $3 \\times 4 = 12 = 22_5$, write $2$ carry $2$; $2 \\times 4 + 2 = 10 = 20_5$, write $0$ carry $2$; the carry ends the row: $202_5$. (Rebuild: $13 \\times 4 = 52 = 2 \\cdot 25 + 2$ ✓.)',
            'Now, the fives partial: $23_5 \\times 3_5$, shifted one seat. Digit by digit: $3 \\times 3 = 9 = 14_5$, write $4$ carry $1$; $2 \\times 3 + 1 = 7 = 12_5$, write $2$ carry $1$: $124_5$, shifted to $1240_5$. (Rebuild: $13 \\times 3 = 39$, and one seat of shift makes it $39 \\times 5 = 195 = 1240_5$ ✓.)',
            'So, stack and add in base five: $202_5 + 1240_5$ — units $2$; fives $0 + 4 = 4$; twenty-fives $2 + 2 = 4$; 125s $1$: the sum $1442_5$.',
            'Take the certification through ten: $23_5 = 13$, $34_5 = 19$, and $13 \\times 19 = 247 = 125 + 100 + 20 + 2 = 1442_5$ ✓.',
            'Hence $23_5 \\times 34_5 = 1442_5$ — same staircase, same carries, base five\u2019s dress on every digit.',
          ],
        },
        {
          kind: 'para',
          text: 'The same run in base twelve, with letters carrying: $45_{12} \\times 3_{12}$ — units $5 \\times 3 = 15 = 13_{12}$, write $3$ carry $1$; twelves $4 \\times 3 + 1 = 13 = 11_{12}$, write $1$ carry $1$; leading carry: $113_{12}$ (rebuild $53 \\times 3 = 159 = 144 + 12 + 3$ ✓). And in hexadecimal, the machine base of Lesson 3.4: $A7_{16} \\times 2_{16}$ — $7 \\times 2 = 14 = E_{16}$, no carry; $A \\times 2 = 20 = 14_{16}$, write $4$ carry $1$: $14E_{16}$ (rebuild $167 \\times 2 = 334 = 256 + 64 + 14$ ✓).',
        },
        { kind: 'heading', text: 'Division in base b — the middleman removed' },
        {
          kind: 'para',
          text: 'Division is where this lesson cashes Lesson 3.2\u2019s promise. The naming engine of Lesson 3.1 — divide by $b$, keep the remainder, repeat — *is* long division with divisor $b$; and the naming engine generalises to any divisor $d$ at all: divide by $d$ in base $b$\u2019s own digits, keep the remainders, and the sequence of remainders is the base-$b$ name of the quotient-and-remainder story. Two consequences:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'quotient-bearing division runs inside any base: $4231_5 \\div 3_5$ asks four in-base questions ("how many threes in $4$? in $12_5$? in $13_5$? in $21_5$?") and answers $1223_5$ remainder $2_5$ — the ladder certified digit by digit in the verify script ($566 = 188 \\cdot 3 + 2$);',
            'converting between two non-decimal bases needs no bridge: to write $1209_{12}$ in base five, divide $1209_{12}$ by $5$ *in base twelve*, repeatedly, and read the remainders upward — the base-ten middleman is simply gone.',
          ],
        },
        {
          kind: 'example',
          title: 'Convert 1209₁₂ to base five by dividing in base twelve — 3.2\u2019s bridge, dismantled',
          steps: [
            'Split, machine one: $1209_{12} \\div 5$. In base twelve, $1209_{12} = 299_{12} \\times 5 + 0$ — check in ten: $2025 = 405 \\cdot 5 + 0$ ✓. Remainder $0$.',
            'Now, machine two: $299_{12} \u00f7 5 = 69_{12} \\times 5 + 0$ ($405 = 81 \\cdot 5$ ✓). Remainder $0$.',
            'So, machine three: $69_{12} \u00f7 5 = 14_{12} \u00d7 5 + 1$ ($81 = 16 \\cdot 5 + 1$ ✓). Remainder $1$.',
            'Take machine four: $14_{12} \u00f7 5 = 3 \u00d7 5 + 1$ ($16 = 3 \\cdot 5 + 1$ ✓). Remainder $1$. And the last: $3 \u00f7 5 = 0 \u00d7 5 + 3$. Remainder $3$.',
            'Hence read upward — $3, 1, 1, 0, 0$: $1209_{12} = 31100_5$, the very result Lesson 3.2 reached through base ten. Same cascade, same digits — but every row of division ran in twelve\u2019s own alphabet, and ten never appeared. (The base-three sibling: $67_{12} \u00f7 3$ in base twelve gives $2221_3$, matching §T\u2019s bridge instance exactly.)',
          ],
        },
        { kind: 'heading', text: 'Casting out (b−1) — the digit-sum check' },
        {
          kind: 'para',
          text: 'Every result above was certified by rebuilding through ten, but base-$b$ arithmetic owns a check of its own, famous in base ten as *casting out nines*. A number and its digit sum agree modulo $b - 1$ — because every seat weight $b^i$ is $1$ modulo $b - 1$, so the seats evaporate and only the digits survive (swept for $b = 3$ to $16$, $n \\le 400$; for $b = 2$ the check degenerates to mod $1$ and says nothing). So an addition $x + y = z$ in base $b$ must survive the same test on digit sums: $\\text{sum}(x) + \\text{sum}(y) \\equiv \\text{sum}(z)$ modulo $b - 1$. If it fails, the addition is wrong; if it holds, the addition is *probably* right — the check certifies rejection, not truth.',
        },
        {
          kind: 'para',
          text: 'Watch it in base six: $345_6 + 512_6 = 1301_6$. Digit sums: $3 + 4 + 5 = 12 \\equiv 2$ and $5 + 1 + 2 = 8 \\equiv 3$ modulo five; $2 + 3 = 5 \\equiv 0$. The result\u2019s digit sum: $1 + 3 + 0 + 1 = 5 \\equiv 0$ ✓. (The full check: $137 + 188 = 325 = 1301_6$ ✓.) In base twelve the same walk is gorgeous: the row $9, 16, 23, 30, 39, 46, 53, 60, 69, 76, 83_{12}$ — nine times one through eleven — carries digit sums whose residues modulo eleven descend $9, 7, 5, 3, 1, B, 9, 7, 5, 3, 1$, hitting $0$ exactly at $B \\times 9 = 83_{12} = 99$. The congruence machinery behind this belongs to chapter 5; here it is a working check, and a hint that remainders have a structure of their own.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Competitive-exam papers (CAT/IPMAT and state-level tests; Khattar QA\u2019s ch. 1 base-system scope) ask exactly three shapes: add or subtract in a given base ($24_5 + 13_5$), multiply short names ($45_{12} \\times 3_{12}$), and convert directly between two non-decimal bases — where the in-base division cascade of Illustration 4 is the intended method and the base-ten bridge the time-costing fallback. The classic trap is the digit-band veto in reverse: an answer containing a digit $\\ge b$ (a "9" in a base-eight sum) is wrong before any arithmetic is checked. Marking schemes reward the add-back certification; the cast-out-$(b-1)$ check catches slips when time is short.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Carry', def: 'The quotient $\\lfloor s/b \\rfloor$ of a column\u2019s total $s$, passed one seat leftward; always $0$ or $1$ for a two-digit column. The division algorithm in motion.' },
            { term: 'Borrow', def: 'A unit taken from the next seat (worth $b$ units here) so that a column with $u < d$ can pay: writes $(u + b) - d$ and decrements the next seat. Value-preserving by expansion.' },
            { term: 'Addition table', def: 'The $b \\times b$ array of base-$b$ names of $i + j$; every two-digit cell is a carry being born. Derived, not memorised: each cell is one engine run away.' },
            { term: 'Multiplication table', def: 'The $b \\times b$ array of base-$b$ names of $i \\cdot j$; the base-2 instance is the AND table of Lesson 3.4.' },
            { term: 'The shift', def: 'Multiplying by the digit in seat $j$ contributes at seat $j$: appending one zero to a name multiplies its value by $b$. The staircase of long multiplication, base-independent.' },
            { term: 'In-base long division', def: 'Dividing by an arbitrary divisor $d$ in base $b$\u2019s own digits — the naming engine generalised; converting $b_1 \\to b_2$ directly is the special case $d = b_2$.' },
            { term: 'Casting out (b−1)', def: 'The digit-sum check: $n \\equiv$ sum of its digits modulo $b - 1$, because $b^i \\equiv 1$. Certifies rejection of wrong sums; the base-ten "casting out nines" generalised.' },
            { term: 'The roll-down', def: '$100\\ldots0_b - 1 = (b-1)(b-1)\\ldots(b-1)_b$ — one leading unit decomposing into the largest digit of every lower seat; the odometer rolling backwards.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In base five, $4_5 + 4_5 = \\, ?$',
              options: ['$8$ (the sum, written as in ten)', '$13_5$', '$14_5$', '$12_5$'],
              answer: 1,
              explain: 'Eight overflows the band $\\{0,1,2,3,4\\}$: $8 = 1 \\cdot 5 + 3$, so the write is $3$ and the carry $1$ — the name $13_5$. "8" is not even a base-five name (no digit 8 exists in base five); $14_5$ rebuilds to $9$ and $12_5$ to $7$.',
            },
            {
              q: 'A column of digits (plus any incoming carry) totals $s$. The digit you write and the carry you pass are:',
              options: ['$s \\bmod b$, then $\\lfloor s/b \\rfloor$', '$\\lfloor s/b \\rfloor$, then $s \\bmod b$', 'always $s - b$, then $1$', '$s$ itself, then $0$'],
              answer: 0,
              explain: 'The carry theorem: write the remainder, carry the quotient — $9 = 1 \\cdot 5 + 4$ in base five writes $4$ and carries $1$, never the reverse. The reversed pair would miswrite $1$ and carry $4$; "$s - b$" only works when a carry actually happened; writing $s$ ignores the band entirely.',
            },
            {
              q: '$1000_5 - 234_5 = \\, ?$',
              options: ['$311_5$', '$232_5$', '$211_5$', '$202_5$'],
              answer: 2,
              explain: 'The borrow walks two empty seats: $125 - 69 = 56 = 2 \\cdot 25 + 1 \\cdot 5 + 1 = 211_5$. The distractors rebuild to $81$, $67$ and $52$ — each is one borrow-slip away from the truth ($311_5$ forgets the second loan, $232_5$ pays the fives seat wrong, $202_5$ short-changes the units).',
            },
            {
              q: 'In base twelve, $B + B = \\, ?$',
              options: ['$1A_{12}$', '$22_{12}$', '$1B_{12}$', '$B1_{12}$'],
              answer: 0,
              explain: 'Eleven plus eleven is twenty-two, and $22 = 1 \\cdot 12 + 10$ — the write is $A$ (ten), the carry $1$: $1A_{12}$. The string "$22$" is the ten-reflex trap ($22_{12} = 26$); $1B_{12} = 23$ and $B1_{12} = 133$ are digit-slips.',
            },
            {
              q: 'In base five, the first partial product of $23_5 \\times 34_5$ (that is, $23_5 \\times 4_5$) is:',
              options: ['$144_5$', '$132_5$', '$112_5$', '$202_5$'],
              answer: 3,
              explain: '$3 \\times 4 = 12 = 22_5$: write $2$, carry $2$; then $2 \\times 4 + 2 = 10 = 20_5$: write $0$, carry $2$ — the row reads $202_5$, and $13 \\times 4 = 52 = 2 \\cdot 25 + 2$ certifies it. The distractors rebuild to $49$, $42$ and $32$ — a missed carry, a doubled carry, a wrong row.',
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
                  q: 'Add in base five: $24_5 + 13_5$.',
                  solution: [
                    'Split, the units column: $4 + 3 = 7 = 1 \\cdot 5 + 2$ — write $2$, carry $1$.',
                    'Now, the fives column: $2 + 1 + 1 = 4$ — write $4$, no carry.',
                    'So, the sum reads $42_5$.',
                    'Hence $24_5 + 13_5 = 42_5$ — certified by rebuilding: $14 + 8 = 22 = 4 \\cdot 5 + 2$ ✓.',
                  ],
                  answer: '24₅ + 13₅ = 42₅ (14 + 8 = 22)',
                },
                {
                  q: 'Add in base two: $1011_2 + 111_2$.',
                  solution: [
                    'Split: the units column $1 + 1 = 10_2$ — write $0$, carry $1$; the next $1 + 1 + 1 = 11_2$ — write $1$, carry $1$; then $0 + 1 + 1 = 10_2$ — write $0$, carry $1$; then $1 + 1 = 10_2$ — write $0$, carry $1$.',
                    'Now, the final carry opens the sixteenth\u2019s seat: $10010_2$.',
                    'So, the rebuild: $11 + 7 = 18 = 16 + 2$ ✓.',
                    'Hence $1011_2 + 111_2 = 10010_2$ — four carries in five columns; base two carries constantly, and the machine pays for that in Lesson 3.4.',
                  ],
                  answer: '1011₂ + 111₂ = 10010₂ (11 + 7 = 18)',
                },
                {
                  q: 'Read it off the table: $3_5 \\times 4_5$.',
                  solution: [
                    'Split: the cell at row $3$, column $4$ of the base-five multiplication table holds $22_5$.',
                    'Now, confirm by engine: $3 \\times 4 = 12 = 2 \\cdot 5 + 2$, so $22_5$ ✓.',
                    'So, the written digit is $2$ and the carry $2$ — a two-carry product, the heaviest cell in the table.',
                    'Hence $3_5 \\times 4_5 = 22_5$ (twelve, in base five\u2019s dress).',
                  ],
                  answer: '3₅ × 4₅ = 22₅ (twelve)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Add in base eight: $47_8 + 36_8$.',
                  solution: [
                    'Split, the units column: $7 + 6 = 13 = 1 \\cdot 8 + 5$ — write $5$, carry $1$.',
                    'Now, the eights column: $4 + 3 + 1 = 8 = 1 \\cdot 8 + 0$ — write $0$, carry $1$.',
                    'So, the final carry opens the sixty-fours seat: $105_8$.',
                    'Take the rebuild: $39 + 30 = 69 = 64 + 5 = 105_8$ ✓.',
                    'Hence $47_8 + 36_8 = 105_8$ — note the middle column wrote $0$: carries can force a zero, and dropping it is the classic slip.',
                  ],
                  answer: '47₈ + 36₈ = 105₈ (39 + 30 = 69)',
                },
                {
                  q: 'Subtract in base five: $312_5 - 144_5$.',
                  solution: [
                    'Split, the units seat: $2 - 4$ impossible — borrow: $(2 + 5) - 4 = 3$, and the fives seat pays $1$.',
                    'Now, the fives seat: $1 - 1$(paid) $- 4$ impossible — borrow again: $(1 - 1 + 5) - 4 = 1$, and the twenty-fives seat pays $1$.',
                    'So, the twenty-fives seat: $3 - 1$(paid) $- 2 = 0$.',
                    'Take the read: $113_5$ — rebuild: $82 - 49 = 33 = 25 + 5 + 3$ ✓; add back: $113_5 + 144_5 = 312_5$ ✓.',
                    'Hence $312_5 - 144_5 = 113_5$ — two borrows in a row, each a licensed loan.',
                  ],
                  answer: '312₅ − 144₅ = 113₅ (82 − 49 = 33)',
                },
                {
                  q: 'Multiply in base five: $12_5 \\times 3_5$.',
                  solution: [
                    'Split, the units column: $2 \\times 3 = 6 = 1 \\cdot 5 + 1$ — write $1$, carry $1$.',
                    'Now, the fives column: $1 \\times 3 + 1 = 4$ — write $4$, no carry.',
                    'So, the product is $41_5$.',
                    'Hence $12_5 \\times 3_5 = 41_5$ — certified: $7 \\times 3 = 21 = 4 \\cdot 5 + 1$ ✓.',
                  ],
                  answer: '12₅ × 3₅ = 41₅ (7 × 3 = 21)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Multiply in base twelve: $45_{12} \\times 3_{12}$.',
                  solution: [
                    'Split, the units column: $5 \\times 3 = 15 = 1 \\cdot 12 + 3$ — write $3$, carry $1$.',
                    'Now, the twelves column: $4 \\times 3 + 1 = 13 = 1 \\cdot 12 + 1$ — write $1$, carry $1$.',
                    'So, the leading carry ends the row: $113_{12}$.',
                    'Take the rebuild: $45_{12} = 53$ and $53 \\times 3 = 159 = 144 + 12 + 3 = 113_{12}$ ✓.',
                    'Hence $45_{12} \\times 3_{12} = 113_{12}$ — two carries in two columns, both paid in full.',
                  ],
                  answer: '45₁₂ × 3₁₂ = 113₁₂ (53 × 3 = 159)',
                },
                {
                  q: 'Convert $67_{12}$ to base three by dividing in base twelve — no base ten anywhere.',
                  solution: [
                    'Split, machine one: $67_{12} \u00f7 3 = 22_{12} \u00d7 3 + 1$ (rebuild check: $79 = 26 \\cdot 3 + 1$ ✓). Remainder $1$.',
                    'Now, machine two: $22_{12} \u00f7 3 = 8 \\times 3 + 2$ ($26 = 8 \\cdot 3 + 2$ ✓). Remainder $2$.',
                    'So, machine three: $8 \u00f7 3 = 2 \\times 3 + 2$. Remainder $2$; and the last: $2 \u00f7 3 = 0 \\times 3 + 2$. Remainder $2$.',
                    'Take the read upward: $2, 2, 2, 1$ — $2221_3$.',
                    'Hence $67_{12} = 2221_3$, matching Lesson 3.2\u2019s bridge instance ($79 = 2221_3$) digit for digit — the middleman is gone and the answer did not change.',
                  ],
                  answer: '67₁₂ = 2221₃ (remainders 1, 2, 2, 2 read upward)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Add in base six and check by casting out five: $345_6 + 512_6$.',
                  solution: [
                    'Split, the units column: $5 + 2 = 7 = 1 \\cdot 6 + 1$ — write $1$, carry $1$.',
                    'Now, the sixes column: $4 + 1 + 1 = 6 = 1 \\cdot 6 + 0$ — write $0$, carry $1$; the thirty-sixes: $3 + 5 + 1 = 9 = 1 \\cdot 6 + 3$ — write $3$, carry $1$.',
                    'So, the leading carry opens the 216s seat: $1301_6$.',
                    'Take the cast: digit sums $3+4+5 = 12 \\equiv 2$ and $5+1+2 = 8 \\equiv 3$ mod five; $2 + 3 = 5 \\equiv 0$; the result\u2019s $1+3+0+1 = 5 \\equiv 0$ ✓ — consistent.',
                    'Hence $345_6 + 512_6 = 1301_6$ (rebuild: $137 + 188 = 325 = 216 + 108 + 1$ ✓) — the check would have indicted any carry slip.',
                  ],
                  answer: '345₆ + 512₆ = 1301₆ (2 + 3 ≡ 0 mod 5; result 5 ≡ 0)',
                },
                {
                  q: 'Build the row of seven in the base-eight multiplication table.',
                  solution: [
                    'Split: seven cells, each one engine run — $7 \\times k$ named in base eight for $k = 1 \\dots 7$.',
                    'Now, the cells: $7, 16_8, 25_8, 34_8, 43_8, 52_8, 61_8$ — the values $7, 14, 21, 28, 35, 42, 49$.',
                    'So, the pattern: every cell\u2019s digits sum to $7$ in base ten arithmetic — $1+6$, $2+5$, $3+4$, $4+3$, $5+2$, $6+1$ — casting out seven at work (row $9$ in base twelve walks the same shape).',
                    'Hence $7 \\times 7 = 61_8$ ($49 = 6 \\cdot 8 + 1$) — the square closes the row, as $B \\times B = A1_{12}$ closes eleven\u2019s.',
                  ],
                  answer: '7, 16₈, 25₈, 34₈, 43₈, 52₈, 61₈ (7 through 49)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Divide in base five: $4231_5 \\div 3_5$. Give quotient and remainder.',
                  solution: [
                    'Split, the ladder, one digit at a time: how many threes in $4$? One, remainder $1$ ($4 = 1 \\cdot 3 + 1$).',
                    'Now, bring down the $2$: $12_5 = 7$; how many threes in seven? Two, remainder $1$ ($7 = 2 \\cdot 3 + 1$).',
                    'So, bring down the $3$: $13_5 = 8$; two threes, remainder $2$ ($8 = 2 \\cdot 3 + 2$). Bring down the $1$: $21_5 = 11$; three threes, remainder $2$ ($11 = 3 \\cdot 3 + 2$).',
                    'Take the assembly: quotient digits $1, 2, 2, 3$ — the name $1223_5$ — remainder $2_5$.',
                    'Hence $4231_5 \u00f7 3_5 = 1223_5$ r $2_5$, certified: $566 = 188 \\cdot 3 + 2$ and $188 = 1223_5$ ✓ — long division, base five\u2019s alphabet, Lesson 2.1\u2019s theorem in every row.',
                  ],
                  answer: '4231₅ ÷ 3₅ = 1223₅ r 2₅ (566 = 188·3 + 2)',
                },
                {
                  q: 'The direct route, in full: convert $1209_{12}$ to base five by dividing in base twelve, and certify the result two ways.',
                  solution: [
                    'Split, the cascade: $1209_{12} = 299_{12} \\times 5 + 0$; $299_{12} = 69_{12} \\times 5 + 0$; $69_{12} = 14_{12} \\times 5 + 1$; $14_{12} = 3 \\times 5 + 1$; $3 = 0 \\times 5 + 3$ — five machines, every row a division-algorithm instance in twelve\u2019s digits.',
                    'Now, read upward: remainders $0, 0, 1, 1, 3$ reversed — $31100_5$.',
                    'So, certification one (the engine): $3 \\cdot 625 + 1 \\cdot 125 + 1 \\cdot 25 = 1875 + 150 = 2025$ ✓.',
                    'Take certification two (the old bridge): $1209_{12} = 2025$ by Horner, and $2025 \u00f7 5$ in ten gives the same remainder chain $0, 0, 1, 1, 3$ — two routes, one name.',
                    'Hence $1209_{12} = 31100_5 = 2025$ — Lesson 3.2\u2019s promise, cashed in base twelve\u2019s own alphabet.',
                  ],
                  answer: '1209₁₂ = 31100₅ (cascade 299₁₂, 69₁₂, 14₁₂, 3; certified both ways)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. The column algorithms are base-independent: prove it in miniature by explaining how the carry theorem and the borrow law are both the division algorithm ($a = qb + r$, $0 \\le r < b$) wearing two directions, why the addition table of base $b$ needs no memorisation, and where the machine takes over — Lesson 3.4\u2019s binary columns carry every single column, and the AND gate is the base-two multiplication table.',
                  solution: [
                    'The two directions: addition carries because a column total $s = \\lfloor s/b \\rfloor \\cdot b + (s \\bmod b)$ — the quotient leaves upward (worth $b$ times more per seat), the remainder stays. Subtraction borrows because when $u < d$ the column may pay $(u + b) - d$ if one unit of the next seat is surrendered — the loan converts $1 \\cdot b^{j+1}$ into $b \\cdot b^j$, exactly. Carry = quotient leaving; borrow = one quotient-unit arriving: one theorem, two signs.',
                    'The tables are derived: each cell of the addition (or multiplication) table is one evaluation of $i + j$ (or $i \\cdot j$) followed by one run of the naming engine — Lesson 3.1\u2019s machine, not a new memory. What deserves internalising is only the shape: two-digit cells are where the base overflows, and they sit at $i + j \\ge b$ (products $\\ge b$).',
                    'The base-two table $0,0,0,1$ is the AND operation because product and conjunction agree on $\\{0, 1\\}$: $1 \\cdot 1 = 1$ and otherwise $0$. A binary column addition therefore *is* logic: the sum bit is XOR ($(a+b) \\bmod 2$), the carry bit is AND ($\\lfloor (a+b)/2 \\rfloor$) — the carry theorem at $b = 2$, wireable in hardware.',
                    'The hand-off: Lesson 3.4 builds the machine\u2019s world — bits, bytes, hex shorthand — where every column carries at most $1$ because every digit is at most $1$, and the addition table of this lesson shrinks to four cells that a transistor can hold.',
                    'Hence the whole: the column algorithms were never about ten. They are the division algorithm, iterated over seats — and any base that owns a digit band can run them, which is every base there is.',
                  ],
                  answer: 'carry = quotient leaving; borrow = a quotient-unit arriving; tables = the naming engine; base two = AND',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The carry law',
          latex: 's = \\lfloor s/b \\rfloor \\cdot b + (s \\bmod b): \\quad \\text{write } s \\bmod b, \\text{ carry } \\lfloor s/b \\rfloor',
          note: 'Instance $9 = 1 \\cdot 5 + 4$: write $4$, carry $1$. The division algorithm in motion — every column, every base.',
        },
        {
          kind: 'formula',
          name: 'The borrow law',
          latex: 'u < d: \\quad \\text{write } (u + b) - d, \\text{ pay } 1 \\text{ from the next seat}',
          note: 'Instance $0_5 - 4_5$: write $(0+5)-4 = 1$. The loan of one seat-$j{+}1$ unit is worth $b$ units of seat $j$ — exact by expansion.',
        },
        {
          kind: 'formula',
          name: 'The shift law',
          latex: '\\text{append one zero seat} \\;\\Longleftrightarrow\\; \\times b',
          note: 'Multiplying by the digit in seat $j$ contributes at seat $j$; the staircase of long multiplication is seat arithmetic — $7_5 \\to 70_5$ doubles nothing, it shifts by five.',
        },
        {
          kind: 'formula',
          name: 'In-base division (and the direct conversion)',
          latex: 'n = q \\cdot d + r \\quad \\text{in } b\\text{-digits, then repeat on } q',
          note: 'Divide by $d$ in base $b$ itself, keep remainders, read upward: the direct $b_1 \\to b_2$ conversion ($1209_{12} \u00f7 5$ cascade $\\to 31100_5$) — no base-ten bridge.',
        },
        {
          kind: 'para',
          text: 'The lesson\u2019s tables shrink as the base shrinks, and the smallest base of all — two — owns an addition table of four cells and a multiplication table of one. That poverty is the wealth: a machine that must be built of switches can only afford two digits, and at two digits the arithmetic of this lesson collapses into logic — the carry bit becomes one gate, the sum bit another. The next lesson wires it: bits and bytes, the hexadecimal shorthand that humans read on the machine\u2019s behalf, and the honest ceiling of a fixed-width register.',
        },
      ],
    },
    {
      id: 'ans-binary-hex-machine',
      number: '3.4',
      title: 'Binary, Hexadecimal and the Machine',
      prerequisites: ['ans-arithmetic-in-other-bases', 'ans-converting-between-bases', 'ans-representation-theorem-unique-name'],
      sources: ['leibniz-1703-binary', 'shannon-1938-switching', 'shannon-1948-bit', 'iec-60027-2-binary-prefixes', 'ascii-table-a65', 'cambridge-igcse-cs-0478', 'knuth-taocp-v2'],
      concepts: [
        'The bit and the machine\u2019s constraint',
        'The byte = 2 nibbles = 8 bits',
        'Hexadecimal as the machine\u2019s shorthand',
        'The bit operations AND, OR, XOR, NOT',
        'The half-adder is the division algorithm',
        'Shifts: doubling and the peel',
        'Overflow and the honest ceiling',
        'Fixed-width names and the ASCII instance',
      ],
      objectives: [
        'Explain why base two is the smallest and the machine\u2019s base — every digit a switch, every carry at most one unit',
        'Work the charter: $k$ bits hold $2^k$ patterns naming $0$ to $2^k - 1$; a byte is 8 bits = 2 nibbles, and its two hex symbols are a lookup, never arithmetic',
        'Run the bit operations AND, OR, XOR, NOT from their tables — including masks, the case-flip on ASCII letters, and the ripple-carry adder built from two half-adder tables',
        'Bound overflow honestly ($255 + 1$ needs nine bits), use shifts as doubling and peeling, and name what is deferred: signed reading (two\u2019s complement) belongs to the CS shelf',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 3.3 ended at base two\u2019s doorstep: four addition facts, one multiplication fact, and a carry that never exceeds one. This lesson walks through the door. Base two is not one base among many — it is the smallest base that can name numbers at all (a base needs at least two digits, as Lesson 3.1\u2019s charter demands: $b \\ge 2$), and it is the base the machine is *forced* to speak, because a switch has two states and nothing simpler exists. Everything in this lesson is Lesson 3.1\u2019s representation theorem and Lesson 3.3\u2019s column arithmetic, run at $b = 2$ with the band shrunk to $\\{0, 1\\}$.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'From Leibniz\u2019s dyadics to Shannon\u2019s switches',
          text: 'Leibniz published binary arithmetic in 1703 (Lesson 3.2\u2019s history) and saw further than his century: “it is as if arithmetic were reborn” — but he saw no use for it beyond philosophy and notation. The machine arrived in two steps. In 1937 Claude Shannon, a master\u2019s student at MIT, proved in his thesis *A Symbolic Analysis of Relay and Switching Circuits* (published 1938) that Boolean algebra — logic with two values — could be computed by arrangements of electrical switches: true and false, closed and open, 1 and 0. That thesis is the founding document of digital circuit design. And the *word* for the two-value digit was coined shortly after: John Tukey, a statistician at Bell Labs, contracted “binary digit” to **bit** in the latter half of the 1940s, and the word entered wide circulation through Shannon\u2019s 1948 paper *A Mathematical Theory of Communication*. A switch, a thesis, and a syllable — the machine\u2019s alphabet.',
        },
        {
          kind: 'para',
          text: 'A **bit** is a base-two digit: the smallest name in existence, carrying one of two values. Written alone it names $0$ or $1$. Wired side by side it does what every positional row in this chapter does — the seats climb by powers of two, and the representation theorem names every natural number exactly once.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The machine charter: k bits, 2^k patterns',
          text: 'A row of $k$ bits is a $k$-seat name in base two (Lesson 3.1). Each seat holds one of $2$ values, so the row admits $2^k$ strings; as *fixed-width* names (padding with leading zeros, Lesson 3.1\u2019s honest costume) they name exactly the numbers $0 \\le n \\le 2^k - 1$. Thus, $k$ bits hold $2^k$ patterns, and the largest value a $k$-bit register can hold is $2^k - 1$ — the digit-count window of Lesson 3.1 at $b = 2$. A **nibble** is 4 bits ($2^4 = 16$ patterns: one hexadecimal symbol); a **byte** is 8 bits ($2^8 = 256$ patterns: two hex symbols).',
        },
        {
          kind: 'table',
          caption: 'The register charter: k bits, the pattern count, the honest ceiling, and the hex symbols the width needs. Every row is 2^k and 2^k − 1, recomputed by the verify script.',
          head: ['width $k$', 'patterns $2^k$', 'largest value $2^k - 1$', 'hex symbols $k/4$'],
          rows: [
            ['4 (a nibble)', '16', '15 = $F_{16}$', '1'],
            ['8 (a byte)', '256', '255 = $FF_{16}$', '2'],
            ['16 (a half-word)', '65,536', '65,535 = $FFFF_{16}$', '4'],
            ['32 (a word)', '4,294,967,296', '4,294,967,295', '8'],
          ],
        },
        {
          kind: 'para',
          text: 'The nibble row is the whole reason hexadecimal exists *for machines*: sixteen patterns is exactly one hex symbol, so four bits and one letter trade places with zero arithmetic — the regrouping theorem of Lesson 3.2, now furniture. A byte splits down the middle into two nibbles, so every byte is exactly two hex symbols wide, always: $01000001$ is $41_{16}$, $11111111$ is $FF_{16}$. This is why memory dumps, addresses and error codes are printed in hex — the machine\u2019s bits are being shown to humans in the only dress that reads them off without calculation.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: '1024, not 1000 — the honest twins',
          text: 'Because $2^{10} = 1024$ sits close to $10^3 = 1000$, early computing borrowed the prefix *kilo* for binary sizes — and the two families drifted apart until a disk\u2019s “gigabyte” meant different things to different buyers. In 1998 the IEC approved honest binary prefixes (published January 1999 as Amendment 2 to IEC 60027-2): **kibi** (Ki) for $2^{10}$, **mebi** (Mi) for $2^{20}$, and upward. So one kibibyte is 1024 bytes, one kilobyte is 1000 bytes, and the difference — invisible at kilo scale ($24$ parts in a thousand) — reaches $7.4\\%$ at giga scale. The machine\u2019s powers are twos; the metric system\u2019s are tens; honest names keep both honest.',
        },
        {
          kind: 'example',
          title: 'Read a byte: 01000001, step by step, three ways',
          steps: [
            'Split, by seats: the eight bits stand over $128, 64, 32, 16, 8, 4, 2, 1$ (the powers $2^7$ down to $2^0$).',
            'Now, the on-bits: seat 6 (worth $64$) and seat 0 (worth $1$) are the only ones holding $1$ — the rebuild is $64 + 1 = 65$.',
            'So, in hex: split into nibbles $0100 \\; 0001$ — four, then one: $41_{16}$, no arithmetic.',
            'Take the machine\u2019s meaning: byte $01000001 = 41_{16}$ is the code the machine uses for the *character* “A” in ASCII — the letter sits at sixty-five (checked against the published table), and the byte holding it is one byte, two nibbles, two hex symbols.',
            'Hence one byte, three honest readings — $01000001_2 = 41_{16} = 65$ — and the figure below dissects it.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The anatomy of a byte: 01000001, the machine\u2019s dress of the character “A”. Eight bit-boxes in two nibble groups; the hex symbols 4 and 1 ride above the groups (16 = 2⁴ patterns per nibble = one symbol, the regrouping theorem as furniture); the weights 128 through 1 stand below; the two on-bits sum to 64 + 1 = 65. Charter: one byte = 2 nibbles = 8 bits = exactly two hex symbols.',
          svg: `<svg viewBox="0 0 920 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A byte of eight bits 01000001 split into nibbles 0100 and 0001, hex symbols 4 and 1, weights 128 down to 1, on-bits sum 64 plus 1 equals 65">
  <!-- hex symbols above the two nibble groups -->
  <text x="205" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">high nibble</text>
  <text x="480" y="44" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">low nibble</text>
  <text x="205" y="66" font-size="20" fill="currentColor" text-anchor="middle">4</text>
  <text x="480" y="66" font-size="20" fill="currentColor" text-anchor="middle">1</text>
  <!-- nibble braces -->
  <path d="M 72 104 L 72 96 L 338 96 L 338 104" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <path d="M 347 104 L 347 96 L 613 96 L 613 104" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <!-- the eight bit boxes -->
  <g fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="72" y="120" width="56" height="56"/>
    <rect x="142" y="120" width="56" height="56"/>
    <rect x="212" y="120" width="56" height="56"/>
    <rect x="282" y="120" width="56" height="56"/>
    <rect x="352" y="120" width="56" height="56"/>
    <rect x="422" y="120" width="56" height="56"/>
    <rect x="492" y="120" width="56" height="56"/>
    <rect x="562" y="120" width="56" height="56"/>
  </g>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="100" y="155">0</text>
    <text x="170" y="155">1</text>
    <text x="240" y="155">0</text>
    <text x="310" y="155">0</text>
    <text x="380" y="155">0</text>
    <text x="450" y="155">0</text>
    <text x="520" y="155">0</text>
    <text x="590" y="155">1</text>
  </g>
  <!-- weights below -->
  <g font-size="12.5" fill="currentColor" text-anchor="middle" opacity="0.85">
    <text x="100" y="230">128</text>
    <text x="170" y="230">64</text>
    <text x="240" y="230">32</text>
    <text x="310" y="230">16</text>
    <text x="380" y="230">8</text>
    <text x="450" y="230">4</text>
    <text x="520" y="230">2</text>
    <text x="590" y="230">1</text>
  </g>
  <text x="345" y="284" font-size="15" fill="currentColor" text-anchor="middle">the on-bits: 64 + 1 = 65</text>
  <text x="345" y="352" font-size="15.5" fill="currentColor" text-anchor="middle">one byte = 2 nibbles = 8 bits — and “A” = 65 = 01000001₂ = 41₁₆</text>
</svg>`,
        },
        { kind: 'heading', text: 'The bit operations — the machine tables in action' },
        {
          kind: 'para',
          text: 'Base two\u2019s poverty makes its arithmetic implementable. A bit operation takes bits in, puts a bit out, and is fully described by a table of at most four rows — small enough to etch into hardware. Three two-place operations and one one-place operation carry the entire trade:',
        },
        {
          kind: 'table',
          caption: 'The machine tables. AND fires only when both inputs are 1; OR fires unless both are 0; XOR fires when the inputs differ; NOT flips its single input. Verified row by row by the verify script.',
          head: ['$a$', '$b$', '$a$ AND $b$', '$a$ OR $b$', '$a$ XOR $b$'],
          rows: [
            ['0', '0', '0', '0', '0'],
            ['0', '1', '0', '1', '1'],
            ['1', '0', '0', '1', '1'],
            ['1', '1', '1', '1', '0'],
          ],
        },
        {
          kind: 'para',
          text: 'Two of these tables are old friends in thin disguise. The AND column is $0, 0, 0, 1$ — *exactly the base-two multiplication table* of Lesson 3.3, digit for digit: conjunction and product agree on $\\{0, 1\\}$. The XOR column is the sum digit of base-two addition with the carry forgotten: $a$ XOR $b = (a + b) \\bmod 2$. Neither is a coincidence; both are the column arithmetic of Lesson 3.3 collapsing at $b = 2$ — and the next derivation banks the collapse.',
        },
        {
          kind: 'para',
          text: 'Applied row-wide (each seat operated independently), the operations become the machine\u2019s hand tools. A **mask** is a constant ANDed against a byte to keep some seats and zero the rest — AND with $00001111$ keeps the low nibble and discards the high one ($11010110$ AND $00001111 = 00000110$: the value $214$ keeps only its $\\bmod \\; 16$ part, $6$). OR sets seats on; XOR **toggles** them — XOR with a $1$ flips a bit, XOR with a $0$ leaves it. NOT flips every seat at once.',
        },
        {
          kind: 'derivation',
          title: 'The half-adder is the division algorithm',
          statement:
            'Claim: for bits $a, b$, the sum digit of $a + b$ is $a$ XOR $b$ and the carry is $a$ AND $b$ — that is, $a + b = (a \\text{ AND } b) \\cdot 2 + (a \\text{ XOR } b)$, the division algorithm of Lesson 2.1 at divisor $2$.',
          steps: [
            {
              label: 'Read the two outputs off the tables',
              formula: 'a \\text{ XOR } b = (a + b) \\bmod 2, \\qquad a \\text{ AND } b = \\lfloor (a+b)/2 \\rfloor',
              explanation:
                'The XOR column matches $(a+b) \\bmod 2$ on all four pairs (check row by row: $1+1 = 2$, sum bit $0$; $1+0 = 1$, sum bit $1$; …). The AND column matches $\\lfloor (a+b)/2 \\rfloor$ — it is the multiplication table, and the carry theorem of Lesson 3.3 says the carry *is* the quotient $\\lfloor s/b \\rfloor$ of the column total $s = a + b$.',
            },
            {
              label: 'Assemble the identity',
              formula: 'a + b = (a \\text{ AND } b) \\cdot 2 + (a \\text{ XOR } b)',
              explanation:
                'Substitute: quotient times $2$ plus remainder equals the total — $a + b$ itself. The pair (AND, XOR) is nothing but the division algorithm\u2019s output pair $(q, r)$ at divisor $2$, printed in gates.',
            },
            {
              label: 'Chain them and the machine adds',
              formula: 'c_{i+1} = \\text{majority}(a_i, b_i, c_i), \\qquad s_i = a_i \\text{ XOR } b_i \\text{ XOR } c_i',
              explanation:
                'Feed each column\u2019s carry into the next: the ripple-carry adder. The verify script built this adder from the two tables alone — no arithmetic operators, tables only — and it reproduced $a + b$ on all 256 nibble pairs and all 65,536 byte pairs. The column machine of Lesson 3.3, etched in silicon.',
            },
          ],
          result:
            'The half-adder is Lesson 2.1\u2019s division algorithm at $b = 2$: XOR is the remainder, AND is the quotient, and chained together they add. The machine does not imitate arithmetic — it *is* the arithmetic of this book, run on wires.',
        },
        {
          kind: 'example',
          title: 'Toggle a case: XOR flips “A” into “a” with one seat',
          steps: [
            'Split, the two codes: “A” sits at $65 = 01000001_2$ and “a” at $97 = 01100001_2$ (checked against the published ASCII table; the whole uppercase block runs $65$ through $90$, the lowercase $97$ through $122$).',
            'Now, the difference: $97 - 65 = 32 = 00100000_2$ — exactly one seat (the $32$s seat, bit five) separates every lowercase letter from its uppercase twin, across all twenty-six pairs.',
            'So, XOR with the mask $00100000$: the differing seats flip, the agreeing seats stay — $01000001$ XOR $00100000 = 01100001$: “A” becomes “a”. The same XOR flips it back.',
            'Take the general law: $\\text{code} \\;\\text{XOR}\\; 32$ toggles case for every ASCII letter (swept over the alphabet by the verify script) — one gate, one mask, twenty-six free flips.',
            'Hence the machine\u2019s habit: text is arithmetic, and a case change is one seat of it. (The digit characters sit nearby: “0” through “9” occupy $48$ to $57$ — $30_{16}$ to $39_{16}$.)',
          ],
        },
        { kind: 'heading', text: 'Shifts: doubling and the peel' },
        {
          kind: 'para',
          text: 'Shifting a bit row one seat left — appending a zero — multiplies the value by $2$ (swept by the verify script over $n \\le 500$): the positional sum\u2019s seats all climb one power, and the sum doubles. It is Lesson 3.3\u2019s shift law at its smallest step. Shifting one seat right — dropping the units bit — divides by two, and more: the dropped bit *is* the remainder, and what remains *is* the quotient. Lesson 3.1\u2019s peel lemma (“the name of $\\lfloor n/b \\rfloor$ is the name of $n$ without its last digit”) turns out to be a hardware instruction.',
        },
        {
          kind: 'example',
          title: 'The shift walk: 45, doubled and peeled',
          steps: [
            'Split, the register: $45 = 101101_2$ (six bits, from Lesson 3.1\u2019s first cascade).',
            'Now, shift left: $1011010_2$ — one appended zero, value $64 + 16 + 8 + 2 = 90 = 45 \\times 2$ ✓.',
            'So, shift right instead: the units bit ($1$) drops out and $10110_2$ remains — $22$, and $\\lfloor 45/2 \\rfloor = 22$ with the dropped bit $1 = 45 \\bmod 2$: quotient and remainder, read off the register (and $90$ peels to $45$ the same way).',
            'Take the wide instance: $2025 = 11111101001_2$ shifted right three seats leaves $11111101_2 = 253 = \\lfloor 2025/8 \\rfloor$, and the three dropped seats spell $001 = 1 = 2025 \\bmod 8$ — the division algorithm, seats and all, visible in the register ($253 \\cdot 8 + 1 = 2025$ ✓).',
            'Hence: left shift = doubling, right shift = the peel — the two oldest theorems of this book, wearing the machine\u2019s simplest instructions.',
          ],
        },
        { kind: 'heading', text: 'Overflow — the honest ceiling' },
        {
          kind: 'para',
          text: 'A register is a fixed-width name, and the charter is unbending: $k$ bits hold $0$ through $2^k - 1$, and nothing beyond. One byte holds $255 = 11111111_2 = FF_{16}$ — and $255 + 1 = 256$ needs *nine* bits ($2^8 \\le 256 < 2^9$; the digit-count window again). The ripple-carry adder built in this lesson answers honestly: $1 \\; 00000000$ — nine bits, the carry walking out of the register. A byte-width machine keeps the eight low bits ($00000000$) and the carry leaves through the door: the odometer of Lesson 3.3 rolls over, and the window\u2019s wall has been hit.',
        },
        {
          kind: 'para',
          text: 'This book states the wall and stops. What machines actually do with the region beyond — how a byte is *additionally read* as the signed range $-128$ through $127$ — is the two\u2019s-complement construction: named here, built on the Computer Science shelf (the Cambridge IGCSE CS 0478 syllabus carries the topic at exactly this seam). The naturals of this book are the register\u2019s citizens; the signed readings belong to the shelf that owns them. What the machine charter gives back is honesty by construction: no byte ever lies about its width, and every ceiling in the table above is a theorem, not a manufacturer\u2019s promise.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'The Cambridge IGCSE Computer Science 0478 syllabus (§1.1) asks exactly this lesson\u2019s charter in its own words: convert between binary and hexadecimal (the nibble table, no arithmetic), explain why binary (two states), state the range of a byte ($0$–$255$ unsigned), and perform shifts — with signed readings (two\u2019s complement) at the CS shelf\u2019s door. University and competitive papers add the ASCII block boundaries ($65$–$90$, $97$–$122$, the $+32$ case law) and the kibi/kilo honesty. The classic traps: quoting $256$ as “the largest byte value” (it is the *count*; the largest is $255$), and hexifying a byte with arithmetic instead of two nibble lookups.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Bit', def: 'A base-two digit — a contraction of *binary digit* (coined by John Tukey at Bell Labs in the 1940s, carried into print by Shannon\u2019s 1948 paper). The smallest name: one seat, two values.' },
            { term: 'Byte', def: 'A fixed-width row of 8 bits: $2^8 = 256$ patterns naming $0$–$255$; exactly two nibbles, exactly two hex symbols.' },
            { term: 'Nibble', def: 'A row of 4 bits: $2^4 = 16$ patterns — one hexadecimal symbol. The regrouping theorem\u2019s unit of currency.' },
            { term: 'Bitwise operation', def: 'A table-defined function on bits applied seat-wise: AND (the base-2 multiplication table), OR (fires unless both are 0), XOR (fires when inputs differ — the sum digit without the carry), NOT (the flip).' },
            { term: 'Mask', def: 'A constant ANDed against a row to keep chosen seats and zero the rest: AND with $00001111$ extracts the low nibble — the value\u2019s $\\bmod \\; 16$ part, made visible.' },
            { term: 'Shift', def: 'Moving a row seat-wise: appending a zero multiplies by $2$ (doubling); dropping the units bit computes $\\lfloor n/2 \\rfloor$ and exposes $n \\bmod 2$ — Lesson 3.1\u2019s peel as an instruction.' },
            { term: 'Overflow', def: 'A result exceeding the register\u2019s charter ($2^k - 1$ for $k$ bits); the honest carry walks out of the register. $255 + 1$ needs nine bits — the wall is a theorem.' },
            { term: 'Register', def: 'A fixed-width bit row the machine names numbers in: the digit-count window with the width nailed down — leading zeros worn permanently as the fixed-width dress.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'One byte holds how many distinct bit patterns?',
              options: ['255', '8', '256', '1024'],
              answer: 2,
              explain: 'The charter: $2^8 = 256$ patterns, naming $0$ through $255$. The classic trap: $255$ is the largest *value* — one less than the *count*. $8$ is the width; $1024 = 2^{10}$ is a kibi-byte\u2019s worth of *bits*, and ten bits wide.',
            },
            {
              q: 'The base-two multiplication table of Lesson 3.3 (cells $0, 0, 0, 1$) is which operation\u2019s table?',
              options: ['AND', 'OR', 'XOR', 'NOT'],
              answer: 0,
              explain: 'Product and conjunction agree on $\\{0,1\\}$: $1 \\cdot 1 = 1$, otherwise $0$ — the AND column. OR gives $1$ on $(1,0)$; XOR gives $1$ on the mixed pairs and $0$ on $(1,1)$; NOT is one-place and has no table here.',
            },
            {
              q: 'The nibble $1010$ prints as which hexadecimal symbol?',
              options: ['the two symbols 10', 'A', '8', 'F'],
              answer: 1,
              explain: '$1010 = 8 + 2 = 10$, and the charter prints ten as $A$. Reading the string as “10” is the digit-string trap — binary $10$ is two; $1000$ would be $8$, and $F$ is $1111 = 15$.',
            },
            {
              q: 'Shifting $101101_2$ left by one seat gives:',
              options: ['$10111_2$ (= 23)', '$101101_2$ (unchanged)', '$10110100_2$ (= 180)', '$1011010_2$ (= 90)'],
              answer: 3,
              explain: 'Appending one zero doubles: $1011010_2 = 90 = 45 \\times 2$. The distractors: $10111_2$ is a mangled shorter row ($23$); leaving it unchanged forgets the shift; $10110100_2$ shifted *twice* ($180 = 45 \\times 4$).',
            },
            {
              q: 'The largest value one byte can hold, and its hex dress:',
              options: ['$255 = FF_{16}$', '$256 = 100_{16}$', '$FF = 155$', '$128 = 80_{16}$'],
              answer: 0,
              explain: '$2^8 - 1 = 255 = 11111111_2 = FF_{16}$ — the ceiling of the charter. $256$ is the pattern count and needs nine bits; $FF$ rebuilds to $255$, not $155$; $10000000_2 = 128$ is only half the register.',
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
                  q: 'Rebuild $10011101_2$ in decimal.',
                  solution: [
                    'Split, by seats: $128, 64, 32, 16, 8, 4, 2, 1$ under the eight bits.',
                    'Now, the on-bits: seats $128, 16, 8, 4, 1$ — the sum $128 + 16 + 8 + 4 + 1 = 157$.',
                    'So, $10011101_2 = 157$ — and in hex, by nibbles: $1001 \\; 1101 = 9D_{16}$ ($9 \\cdot 16 + 13 = 157$ ✓).',
                    'Hence the byte holds $157$ — charter-consistent ($0 \\le 157 \\le 255$).',
                  ],
                  answer: '10011101₂ = 157 = 9D₁₆ (128 + 16 + 8 + 4 + 1)',
                },
                {
                  q: 'How many patterns can 4 bits hold, and what values do they name?',
                  solution: [
                    'Split: the charter at $k = 4$ — $2^4 = 16$ patterns.',
                    'Now, the range: fixed-width names cover $0$ through $2^4 - 1 = 15$.',
                    'So, sixteen patterns, fifteen the ceiling: $1111_2 = F_{16} = 15$.',
                    'Hence a nibble names $0$–$15$ — exactly one hex symbol\u2019s worth, which is why the table exists.',
                  ],
                  answer: '16 patterns naming 0..15 (ceiling 1111₂ = F₁₆)',
                },
                {
                  q: 'The byte $11111111$: decimal and hexadecimal?',
                  solution: [
                    'Split: eight on-bits, every seat lit.',
                    'Now, the sum: $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 = 2^8 - 1$.',
                    'So, hex by nibbles: $1111 \\; 1111 = FF_{16}$.',
                    'Hence the full byte holds $255 = FF_{16}$ — the honest ceiling of the register.',
                  ],
                  answer: '11111111₂ = 255 = FF₁₆',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Convert $3F_{16}$ to binary and to decimal.',
                  solution: [
                    'Split, the nibble table: $3 = 0011$, $F = 1111$ — the byte $00111111$.',
                    'Now, the rebuild: $32 + 16 + 8 + 4 + 2 + 1 = 63$.',
                    'So, $3F_{16} = 00111111_2 = 63$ — two lookups and one sum, no division engine.',
                    'Hence certified: $48 + 15 = 63$ ✓ (the seats $3 \\cdot 16$ and $15$).',
                  ],
                  answer: '3F₁₆ = 0011 1111₂ = 63 (48 + 15)',
                },
                {
                  q: 'Mask it: $11010110$ AND $00001111$ — and say what the mask kept.',
                  solution: [
                    'Split, seat-wise AND: $1$ AND $0 = 0$, $1$ AND $0 = 0$, $0$ AND $0 = 0$, $1$ AND $0 = 0$; then $0$ AND $1 = 0$, $1$ AND $1 = 1$, $1$ AND $1 = 1$, $0$ AND $1 = 0$.',
                    'Now, the row reads $00000110$ — value $6$.',
                    'So, the mask kept the low nibble ($0110 = 6$) and zeroed the high ($1101 = 13$ vanished): the AND is the value\u2019s $\\bmod \\; 16$ part ($214 = 13 \\cdot 16 + 6$, and $214 \\bmod 16 = 6$ ✓).',
                    'Hence $11010110$ AND $00001111 = 00000110 = 6$ — masking is modular arithmetic you can see.',
                  ],
                  answer: '11010110 AND 00001111 = 00000110 = 6 (the low nibble; 214 mod 16)',
                },
                {
                  q: 'Compute $1100$ XOR $1010$, and check it against AND and OR on the same pair.',
                  solution: [
                    'Split, XOR seat-wise: $1$ vs $1$ differ? No — $0$; $1$ vs $0$ differ — $1$; $0$ vs $1$ differ — $1$; $0$ vs $0$ — $0$: the row $0110$.',
                    'Now, the value: $0110_2 = 6$ (and indeed $12$ XOR $10 = 6$).',
                    'So, the neighbours on the same seats: AND gives $1000 = 8$, OR gives $1110 = 14$ — and $8 + 6 = 14$: XOR counts the seats where exactly one fires, AND the seats where both do; together they rebuild the OR.',
                    'Hence $1100$ XOR $1010 = 0110 = 6$ — the sum-digit-without-carry, seat by seat.',
                  ],
                  answer: '1100 XOR 1010 = 0110 (= 6; AND 8, OR 14, and 8 + 6 = 14)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The case law: verify $97 - 65 = 32$, name the seat, and show XOR flips “a” back to “A”.',
                  solution: [
                    'Split, the codes: “A” = $65 = 01000001_2$, “a” = $97 = 01100001_2$ (the published table; uppercase $65$–$90$, lowercase $97$–$122$).',
                    'Now, the difference: $97 - 65 = 32 = 00100000_2$ — the $32$s seat (bit five) is the whole distance, for every letter pair ($97 + i - (65 + i) = 32$ across all twenty-six).',
                    'So, XOR with $00100000$: seats differing from the mask flip — the $32$s seat differs in both directions, so $01100001$ XOR $00100000 = 01000001$: “a” → “A”. The same gate runs both ways because XOR is its own inverse.',
                    'Take the sweep: for every letter, code XOR $32$ toggles the case (verified across the alphabet by the verify script).',
                    'Hence one seat, one gate, twenty-six flips — the machine\u2019s case law.',
                  ],
                  answer: '97 − 65 = 32 = 00100000₂ (bit five); XOR 32 flips both ways',
                },
                {
                  q: 'How many bits does $500$ need? How many hex symbols?',
                  solution: [
                    'Split, the window at $b = 2$: $k$ bits hold up to $2^k - 1$, so find $k$ with $2^{k-1} \\le 500 < 2^k$.',
                    'Now, the grips: $2^8 = 256 \\le 500 < 512 = 2^9$ — nine bits.',
                    'So, hex: $16^2 = 256 \\le 500 < 4096 = 16^3$ — three symbols; and indeed $500 = 1F4_{16}$ ($256 + 15 \\cdot 16 + 4 = 256 + 240 + 4$ ✓).',
                    'Take the consistency check: nine bits pad to twelve — three nibbles, three hex symbols: the two answers agree, as the regrouping theorem demands.',
                    'Hence $500$ wears nine bits or $1F4_{16}$ — the window and the nibble table telling one story.',
                  ],
                  answer: '9 bits (256 ≤ 500 < 512); 3 hex symbols (1F4₁₆)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Run all three two-place operations on $0110$ and $1011$, and verify the AND + XOR = OR identity on the result.',
                  solution: [
                    'Split, seat-wise on $0110$ vs $1011$: AND $0010$ ($6$ AND $11 = 2$); OR $1111$ ($= 15$); XOR $1101$ ($= 13$).',
                    'Now, the identity: seats where AND fires ($1$) are exactly the seats XOR gives $0$ with OR giving $1$; seats where AND is $0$ and OR is $1$ are exactly XOR\u2019s $1$s.',
                    'So, seat-wise: $\\text{OR} = \\text{AND} + \\text{XOR}$ ($2 + 13 = 15$ ✓) — the OR row splits into “both fired” and “exactly one fired”.',
                    'Hence AND $0010$, OR $1111$, XOR $1101$ — and the split $2 + 13 = 15$ certifies all three tables at once.',
                  ],
                  answer: 'AND 0010 (2), OR 1111 (15), XOR 1101 (13); AND + XOR = OR',
                },
                {
                  q: 'The honest twins: show $2^{10} = 1024 \\ne 1000$, and name the standard that un-tangled kilo from kibi.',
                  solution: [
                    'Split, the arithmetic: $2^{10} = 1024$ (sweep-verified) and $10^3 = 1000$ — different numbers, $24$ apart.',
                    'Now, the drift: computing borrowed *kilo* for $1024$ bytes; commerce kept *kilo* for $1000$ — at giga scale the gap reaches $7.4\\%$ ($2^{30} = 1{,}073{,}741{,}824$ vs $10^9$).',
                    'So, the fix: the IEC\u2019s binary prefixes (Amendment 2 to IEC 60027-2, approved December 1998, published January 1999) — kibi (Ki) $= 2^{10}$, mebi (Mi) $= 2^{20}$, gibi, tebi: one kibibyte is $1024$ bytes, one kilobyte is $1000$ bytes, honestly.',
                    'Hence the twins are named apart — the machine\u2019s powers are twos, the metric system\u2019s are tens, and the prefixes no longer collide.',
                  ],
                  answer: '2¹⁰ = 1024 ≠ 1000; IEC 60027-2 Am. 2 (Jan 1999): KiB vs kB',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'The register holds the character “Z”. Give its decimal code, its byte, and its hex — and certify each dress.',
                  solution: [
                    'Split, the code: “Z” is the last uppercase letter, at $65 + 25 = 90$ (the block runs $65$–$90$, checked against the published table).',
                    'Now, the byte: $90 = 64 + 16 + 8 + 2$ — the seats $2^6, 2^4, 2^3, 2^1$ — so $01011010_2$.',
                    'So, hex by nibbles: $0101 = 5$, $1010 = A$: $5A_{16}$ ($5 \\cdot 16 + 10 = 90$ ✓).',
                    'Take the case law: $90$ XOR $32 = 90 - 32 = 58 = 00111010_2$ — “z” sits at $122 = 97 + 25$ ✓, the lowercase block\u2019s last.',
                    'Hence “Z” = $90 = 01011010_2 = 5A_{16}$ — one character, three certified dresses, every seat honest.',
                  ],
                  answer: '“Z” = 90 = 01011010₂ = 5A₁₆',
                },
                {
                  q: 'The peel at width three: shift $2025$\u2019s binary right by three seats, and read the quotient and remainder off the register.',
                  solution: [
                    'Split, the register: $2025 = 11111101001_2$ (Lesson 3.2\u2019s cascade, eleven bits).',
                    'Now, shift right three: the last three seats ($001$) drop; the remaining eight read $11111101_2 = 253$.',
                    'So, the division algorithm, visible: $\\lfloor 2025/8 \\rfloor = 253$ is the kept row, and the dropped row $001 = 1 = 2025 \\bmod 8$ is the remainder — because $253 \\cdot 8 + 1 = 2025$ ✓.',
                    'Take the charter check: eight kept bits fit a byte ($253 \\le 255$) — the quotient of a shift by $2^3$ is a byte whenever the dividend is.',
                    'Hence $2025 \\gg 3$: quotient $253 = 11111101_2$, remainder $1 = 001$ — the peel lemma of Lesson 3.1, run by moving a boundary.',
                  ],
                  answer: '2025 >> 3 = 11111101₂ = 253, remainder 001 = 1 (253·8 + 1 = 2025)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Essay. From naming to wiring: explain how the half-adder is the division algorithm of Lesson 2.1 (XOR the remainder, AND the quotient), how masks and shifts are seat arithmetic (mod and peel), why overflow is the digit-count window with the width nailed shut, and where this book hands off — signed readings (two\u2019s complement) named here and built on the CS shelf, the way Shannon\u2019s 1937 thesis stands behind every gate in this lesson.',
                  solution: [
                    'The half-adder: at $b = 2$ the carry theorem\u2019s write/carry pair becomes (XOR, AND) — $a + b = (a \\text{ AND } b) \\cdot 2 + (a \\text{ XOR } b)$ on all four pairs — and chained down the row (ripple-carry) it reproduces addition on every byte pair (65,536 of them, script-built from the tables alone). Lesson 3.3\u2019s column machine did not get mimicked in hardware; it *is* the hardware\u2019s specification.',
                    'Masks and shifts: AND with a low-nibble mask keeps the $\\bmod \\; 16$ part ($214$ AND $15 = 6 = 214 \\bmod 16$); a right shift is the peel ($\\lfloor n/2 \\rfloor$ kept, $n \\bmod 2$ dropped); a left shift is the inverse peel (doubling). The remainder arithmetic of chapters 2–3 is the machine\u2019s instruction set.',
                    'Overflow: the charter $k$ bits $\\to 0..2^k - 1$ is Lesson 3.1\u2019s window with fixed width; $255 + 1$ needs nine bits ($2^8 \\le 256 < 2^9$), the honest carry leaves, and the register keeps $00000000$ — the wall is a theorem, not a fault. The roll-down twin ($10000_2 - 1 = 1111_2$) closes the loop with Lesson 3.3\u2019s borrows.',
                    'The hand-offs: two\u2019s complement (the signed reading $-128..127$) is named and deferred to the CS shelf (IGCSE 0478 §1.1 carries the seam); the history — Leibniz\u2019s 1703 arithmetic, Shannon\u2019s 1937 switching thesis, Tukey\u2019s bit — is the story of this lesson\u2019s furniture arriving. Chapter 5 will meet the remainders again as a system (congruences); the machine has already been living there.',
                    'Hence the whole lesson: base two is not a curiosity at the bottom of the base ladder — it is the ladder\u2019s load-bearing wall. Every theorem of this chapter (naming, regrouping, carrying, peeling) survives the trip to $b = 2$ and becomes a wire; that is what “the machine” means.',
                  ],
                  answer: 'half-adder = division algorithm; masks = mod; shifts = peel; overflow = the window nailed shut; two\u2019s complement → CS shelf',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The machine charter',
          latex: 'k \\text{ bits}: \\quad 2^k \\text{ patterns}, \\quad 0 \\le n \\le 2^k - 1',
          note: 'The byte: $2^8 = 256$ patterns, ceiling $255 = FF_{16}$. Lesson 3.1\u2019s window with the width nailed down.',
        },
        {
          kind: 'formula',
          name: 'Byte = 2 nibbles = 2 hex symbols',
          latex: '8 \\text{ bits} = 2 \\times 4: \\quad \\text{split into nibbles, look each up}',
          note: '$01000001 \\to 0100 \\; 0001 \\to 41_{16}$ — regrouping as furniture, zero arithmetic (16 = $2^4$).',
        },
        {
          kind: 'formula',
          name: 'The bit operations',
          latex: '\\text{AND} = a \\cdot b, \\quad \\text{OR} = \\max(a,b), \\quad \\text{XOR} = (a+b) \\bmod 2, \\quad \\text{NOT}(a) = 1 - a',
          note: 'The tables of this lesson, row by row — AND is Lesson 3.3\u2019s base-two multiplication table; XOR is the sum digit without the carry.',
        },
        {
          kind: 'formula',
          name: 'The shift laws',
          latex: 'n \\ll 1 = 2n, \\qquad n \\gg 1 = \\lfloor n/2 \\rfloor \\; (\\text{dropped bit} = n \\bmod 2)',
          note: 'Doubling and the peel — Lesson 3.1\u2019s lemma as an instruction: $45 = 101101_2 \\to 90 \\to 22$ with the $1$s read as remainders.',
        },
        {
          kind: 'para',
          text: 'The chapter closes where it began: one theorem, every base. The representation theorem named every number exactly once in every base; conversion moved numbers between the names; this lesson\u2019s arithmetic ran the operations inside the names, and the machine\u2019s base showed why the smallest alphabet wins — two digits are all a switch can hold, and two digits are enough for everything. What remains is history and structure: how humans counted before and beside position (chapter 9), and what the remainders of all this division are when gathered into a system of their own (chapter 5).',
        },
      ],
    },
  ],
}
