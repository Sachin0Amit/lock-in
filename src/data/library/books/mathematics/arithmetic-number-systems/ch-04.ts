import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 4: Primes and the Fundamental
 * Theorem of Arithmetic
 *
 * LESSONS WRITTEN: 4.1 The Primes Never End: Euclid's Proof and the Sieve
 *                  4.2 The Fundamental Theorem of Arithmetic
 *                  (both: run 55 — 2026-11-05)
 * CHAPTER STATUS: IN PROGRESS 2/4 (opened at run 55; lessons 4.3 'Divisors
 * from DNA: Divisor Counts and Factorial Zeros' and 4.4 'How the Primes
 * Are Distributed' close it at run 56 per the two-lesson cadence).
 *
 * References for this unit: Euclid, Elements Book IX, Proposition 20 —
 * "Prime numbers are more than any assigned multitude of prime numbers"
 * — with the construction that takes the least number measured by the
 * assigned primes and adds a unit, and the descendant remark that the
 * proposition is not used again in the Elements (D. E. Joyce's Clark
 * University edition of Book IX, web-checked 2026-11-05) — key
 * euclid-elements-book-ix; the sieve's attribution: Eratosthenes of
 * Cyrene (c. 276–194 BC) wrote no surviving description, and the
 * method reaches us through Nicomachus of Gerasa, Introduction to
 * Arithmetic, Book I chapter 13 (c. AD 100), which preserves the
 * ancient account and the sieve name (web-checked 2026-11-05 via the
 * MathWorld sieve entry and the Greek-manuscript search record) — key
 * eratosthenes-sieve-nicomachus; the FTA's genealogy: Euclid Book VII
 * propositions 30 (the lemma), 31 (every composite is measured by some
 * prime), 32 and Book IX proposition 14 (the least common multiple of
 * primes is measured by no other prime — uniqueness in embryo), with
 * the first full existence proof credited to Kamāl al-Dīn al-Fārisī
 * (13th–14th c.; Ağargün & Özkan 2001, Rashed 2002, per the standard
 * history) and the first printed proof of uniqueness in Gauss,
 * Disquisitiones Arithmeticae (1801), article 16, immediately spent on
 * the law of quadratic reciprocity (web-checked 2026-11-05) — keys
 * euclid-elements-book-vii (carried from chapter 2), al-farisi-fta-
 * existence, gauss-1801-disquisitiones; carried keys beck-geoghegan-
 * art-of-proof (strong induction and the proof-transition voice),
 * khattar-qa-4e (the competitive-exam shapes: factorials, trailing
 * zeros, divisor counts). Exposition original; nothing reproduced.
 *
 * Every number below was recomputed by scripts/verify-book2-ch04.ts
 * (167 checks, sections A–V, run 55, ALL PASS before writing — the
 * figure-2 box geometry caught and fixed a two-pair overlap before any
 * SVG existed: leaf boxes narrowed 74 → 56 px).
 *
 * The chapter's engine discipline: chapter 2's divisibility algebra
 * (Lesson 2.2) and Bézout's identity (Lesson 2.3) are CITED, never
 * re-proved — uniqueness is Bézout finally cashed; existence is Lesson
 * 1.2's strong induction finally spent. Foundation Mathematics Lesson
 * 3.2 (fm-prime-numbers-factorisation) banked the operational
 * definitions and the factoring skill; this chapter proves the
 * structure those skills were pointing at all along.
 */
export const chapter04: Chapter = {
  number: 4,
  slug: 'primes-and-the-fundamental-theorem',
  title: 'Primes and the Fundamental Theorem of Arithmetic',
  summary:
    'The atoms of multiplication: the trichotomy that sorts every number above 1 into prime or composite, the trial-division bound and the sieve that hunt primes by machine, Euclid’s two-thousand-year-old proof that the primes never end, and the fundamental theorem — every number factors into primes in exactly one way — with existence proved by strong induction, uniqueness cashed through Bézout’s identity, and the counting consequences (divisor counts, factorial exponents, trailing zeros) that examinations bank on.',
  status: 'in-progress',
  plannedLessons: ['Divisors from DNA: Divisor Counts and Factorial Zeros', 'How the Primes Are Distributed'],
  lessons: [
    {
      id: 'ans-primes-never-end-euclid-and-the-sieve',
      number: '4.1',
      title: 'The Primes Never End: Euclid’s Proof and the Sieve',
      prerequisites: ['fm-prime-numbers-factorisation', 'ans-the-algebra-of-divisibility', 'ans-induction-proving-for-every-number'],
      sources: ['euclid-elements-book-ix', 'eratosthenes-sieve-nicomachus', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof'],
      concepts: [
        'The prime/composite/unit trichotomy',
        'Exactly two divisors',
        'The trial-division bound √n',
        'The least divisor is prime',
        'The sieve of Eratosthenes',
        'Euclid’s construction P + 1',
        'New prime factors, not a prime N',
        'Counting primes: π(100) = 25',
      ],
      objectives: [
        'State the trichotomy precisely — every natural number is exactly one of a unit (1), a prime, or a composite — and explain why 1 belongs to neither extreme',
        'Prove and use the trial-division bound: $n \\ge 2$ is prime exactly when no $d$ with $2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor$ divides it, and prove that the least divisor above 1 of any number is prime',
        'Run the sieve of Eratosthenes to any bound, round by round — crossing from $p^2$, stopping at $p \\le \\sqrt{N}$ — and certify that sieving 100 leaves exactly the 25 primes',
        'Reproduce Euclid’s infinitude argument: for any finite list of primes, the product plus one carries a prime factor outside the list — and explain why the argument needs the new factor, not a prime value of $N$',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Addition has a smallest building block — the unit, from which every number is reached by repeated succession, as chapter 1 proved. Multiplication has always looked different: some numbers seem to be *made of* other numbers ($12 = 3 \\cdot 4$), and some refuse to break ($7$ factors no further). This chapter is about the refusers. It identifies the atoms of multiplication, builds the two machines that hunt them — one exhaustive, one ancient — and then proves the theorem about them that took mathematics two thousand years to name properly: the fundamental theorem of arithmetic, Lesson 4.2’s subject.',
        },
        {
          kind: 'para',
          text: 'You have met these ideas operationally. Foundation Mathematics Lesson 3.2 defined primes and composites, ran divisibility tests, and factorised numbers for HCF and LCM work — the skill is banked. What FM asserted, this book now proves: *why* every factorisation bottoms out in atoms, *why* the trial-division search can stop at the square root, and *why* the atoms never run out. The machinery is all ours already — the divisibility algebra of Lesson 2.2 (if $q \\mid a$ and $q \\mid b$ then $q \\mid a + b$ and $q \\mid a - b$) and the induction engine of Lesson 1.2. One idea will do the work of the whole lesson: a prime is defined by having the *fewest possible divisors*, and that poverty of divisors is exactly what makes it powerful.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Prime, composite, and the unit',
          text: 'Let $n$ be a natural number. A **divisor** of $n$ is a natural number $d$ with $n = qd$ for some natural $q$ (Lesson 2.1’s division algorithm with remainder $0$). The number $1$ is called a **unit**: it has exactly one divisor, itself. A number $n \\ge 2$ is said to be **prime** if it has exactly two divisors, namely $1$ and $n$. A number $n \\ge 2$ is said to be **composite** if it has some third divisor — a $d$ with $1 < d < n$ and $d \\mid n$. Thus, every natural number is exactly one of: unit, prime, composite — a partition called the **trichotomy**.',
        },
        {
          kind: 'equation',
          latex: 'n \\text{ prime} \\;\\Leftrightarrow\\; n \\ge 2 \\text{ and } \\{d : d \\mid n\\} = \\{1, n\\}',
          note: 'The definition is a statement about the *divisor list* and nothing else. Composites are the numbers whose divisor list has a middle entry; primes are the numbers whose list does not.',
        },
        {
          kind: 'para',
          text: 'For example, run the divisor lists over the first twenty numbers:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$2, 3, 5, 7, 11, 13, 17, 19$ carry exactly two divisors each — eight primes;',
            '$4 = 2 \\cdot 2$, $6 = 2 \\cdot 3$, $8, 9 = 3 \\cdot 3$, $10, 12, 14, 15 = 3 \\cdot 5$, $16, 18, 20$ all carry a middle divisor — eleven composites;',
            '$1$ carries a list of length one — the unit, in a class of its own.',
          ],
        },
        {
          kind: 'table',
          caption: 'The trichotomy over 2 to 20: the divisor list decides, number by number.',
          head: ['n', 'divisors', 'verdict'],
          rows: [
            ['2', '1, 2', 'prime'],
            ['3', '1, 3', 'prime'],
            ['4', '1, 2, 4', 'composite'],
            ['5', '1, 5', 'prime'],
            ['6', '1, 2, 3, 6', 'composite'],
            ['7', '1, 7', 'prime'],
            ['8', '1, 2, 4, 8', 'composite'],
            ['9', '1, 3, 9', 'composite'],
            ['10', '1, 2, 5, 10', 'composite'],
            ['11', '1, 11', 'prime'],
            ['12', '1, 2, 3, 4, 6, 12', 'composite'],
            ['13', '1, 13', 'prime'],
            ['14', '1, 2, 7, 14', 'composite'],
            ['15', '1, 3, 5, 15', 'composite'],
            ['16', '1, 2, 4, 8, 16', 'composite'],
            ['17', '1, 17', 'prime'],
            ['18', '1, 2, 3, 6, 9, 18', 'composite'],
            ['19', '1, 19', 'prime'],
            ['20', '1, 2, 4, 5, 10, 20', 'composite'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'One is not a prime — and the reason is structural',
          text: 'The question "isn’t 1 prime?" has a precise answer: no, because the definition demands *exactly two* divisors, and 1 has one. That is not pedantry; it is load-bearing. Primes are meant to be the atoms of multiplication — the pieces every factorisation bottoms out in — and Lesson 4.2 will prove the factorisation is *unique*. Admit 1 as a prime and uniqueness dies instantly: $6 = 2 \\cdot 3 = 1 \\cdot 2 \\cdot 3 = 1 \\cdot 1 \\cdot 2 \\cdot 3$, an infinity of "different" factorisations differing only by padding. The unit is the empty ingredient: it multiplies without contributing. Lesson 4.2 gives it a honest role — the **empty product** — and the trichotomy keeps the atoms clean.',
        },
        { kind: 'heading', text: 'The trial-division bound' },
        {
          kind: 'para',
          text: 'The first dividend of the definition is a search algorithm. FM 3.2 factorised numbers by trying divisors in increasing order — but how far must the search go? Trying every $d < n$ is wasteful, and the waste has a geometric reason. If $n$ is composite, say $n = ab$ with both factors above $1$, then the smaller factor cannot be large: if both $a$ and $b$ exceeded $\\sqrt{n}$, their product would exceed $n$ — a contradiction. So every composite carries a proper divisor no bigger than its square root, and the contrapositive gives the bound:',
        },
        {
          kind: 'derivation',
          title: 'The √n bound: a full search lives under the square root',
          statement:
            'Claim: a number $n \\ge 2$ is prime if and only if no $d$ with $2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor$ divides $n$. Equivalently: if $n$ is composite, then $n$ has a divisor $d$ with $1 < d \\le \\sqrt{n}$.',
          steps: [
            {
              label: 'Split a composite into two factors',
              formula: 'n = ab, \\qquad 1 < a \\le b < n',
              explanation:
                'Composite means some third divisor exists: let $a$ be the smallest divisor of $n$ above $1$, and set $b = n/a$. Both live strictly between $1$ and $n$ — that is what the third divisor buys.',
            },
            {
              label: 'The smaller factor is capped by the square root',
              formula: 'a \\le \\sqrt{n} \\quad \\text{(else } a^2 > n \\ge ab \\ge a^2\\text{)}',
              explanation:
                'Suppose $a > \\sqrt{n}$. Then $b \\ge a > \\sqrt{n}$, so $n = ab > \\sqrt{n} \\cdot \\sqrt{n} = n$ — the number exceeds itself, absurd. Hence $a \\le \\sqrt{n}$; since $a$ is an integer, $a \\le \\lfloor\\sqrt{n}\\rfloor$.',
            },
            {
              label: 'Take the contrapositive for primality',
              formula: '\\text{no divisor in } [2, \\lfloor\\sqrt{n}\\rfloor] \\;\\Rightarrow\\; \\text{no proper factorisation} \\;\\Rightarrow\\; \\text{prime}',
              explanation:
                'If the band $2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor$ contains no divisor, then no factorisation $n = ab$ can exist — any would contribute a small factor $a$ in that band. The number has exactly the divisors $1$ and $n$: prime.',
            },
            {
              label: 'The forward direction is free',
              formula: 'n \\text{ prime} \\Rightarrow \\{1, n\\} = \\{d : d \\mid n\\} \\Rightarrow \\text{the band is empty of divisors}',
              explanation:
                'A prime’s divisor list has no middle entries at all, so certainly none in the band. Both directions hold, and the search space of primality testing collapses from $n - 2$ candidates to at most $\\lfloor\\sqrt{n}\\rfloor - 1$.',
            },
          ],
          result:
            'To test $n$ for primality, trial-divide only by $2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor$. The band is empty (as for $n = 2$, where $\\lfloor\\sqrt{2}\\rfloor = 1$) exactly when the number is trivially prime — the bound never blocks a legitimate verdict.',
        },
        {
          kind: 'example',
          title: 'Is 91 prime? Is 97? Two bound-run verdicts',
          steps: [
            'Split, set the band: $\\lfloor\\sqrt{91}\\rfloor = 9$ ($9^2 = 81 \\le 91 < 100 = 10^2$) — the candidates are $2, 3, 5, 7$.',
            'Now, run the trials: $91$ is odd, its digit sum $10$ is not a multiple of $3$, it does not end in $0$ or $5$ — three trials clean.',
            'Take the fourth: $91 = 7 \\cdot 13$ — the search lands at $d = 7$, inside the band. Verdict: **composite**.',
            'So, rerun on 97: $\\lfloor\\sqrt{97}\\rfloor = 9$, the same four trials $2, 3, 5, 7$ — all miss ($97 = 3 \\cdot 32 + 1$, digit sum $16$, ends in $7$).',
            'Hence 97 is **prime** — and the bound certifies the verdict in four divisions, not ninety-five.',
          ],
        },
        {
          kind: 'para',
          text: 'The same argument yields a bonus engine that Lesson 4.2 will spend immediately. Take any $n \\ge 2$ and let $d$ be its *least* divisor above $1$. If $d$ were composite, $d$ would carry a divisor $e$ with $1 < e < d$ — but a divisor of a divisor is a divisor ($n = (n/d) \\cdot d$ and $d = (d/e) \\cdot e$ give $n = (n/d)(d/e) \\cdot e$), so $e$ would be a smaller divisor of $n$ above $1$, contradicting $d$’s minimality. Therefore:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The least divisor is prime (Euclid, Elements VII.31)',
          text: 'Every number $n \\ge 2$ has a least divisor $d$ greater than $1$, and that $d$ is prime. Consequently **every number above 1 has a prime factor**: $d$ itself. This is the proposition Euclid states as "any composite number is measured by some prime number" — the first brick of the fundamental theorem, laid twenty-three centuries before the theorem had a name. No search is needed to *prove* it: the least-number principle of Lesson 1.3 guarantees $d$ exists, and the one-line contradiction above shows it is prime.',
        },
        { kind: 'heading', text: 'The sieve of Eratosthenes' },
        {
          kind: 'para',
          text: 'The bound tests one number at a time. To find *all* primes below a bound, a smarter machine works in bulk — crossing out multiples instead of testing candidates. Write the numbers from $2$ to $N$; circle $2$ and cross out every second number beyond it; the first survivor after $2$ is $3$ — circle it and cross out every third number beyond *it*; the first survivor after $3$ is $5$ — and so on. Each round executes one prime, killing all its multiples; the survivors of all rounds are exactly the primes. The device is the **sieve of Eratosthenes**, and its history has a twist worth knowing:',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A sieve with no surviving manual',
          text: 'Eratosthenes of Cyrene (c. 276–194 BC) — librarian of Alexandria, measurer of the Earth’s circumference — described the method, but the description itself is lost. Everything we know of the sieve as *his* comes from a later pen: Nicomachus of Gerasa’s *Introduction to Arithmetic* (around AD 100), Book I, chapter 13, preserves the ancient account and the name — "the sieve," a device that lets the composites fall through and keeps the primes. The manuscript trail runs through Arabic translations of Nicomachus, not through Eratosthenes at all. When this lesson runs the sieve, it is running a two-thousand-year-old piece of intellectual machinery whose original manual is gone — the algorithm survived because it is, in the plainest sense, correct.',
        },
        {
          kind: 'algorithm',
          title: 'The sieve of Eratosthenes, to a bound N',
          lines: [
            { code: 'write the numbers 2, 3, …, N — all unmarked' },
            { code: 'for each unmarked p, in increasing order, with p² ≤ N:' },
            { code: '    cross out every multiple of p from p² up to N', note: 'the smaller multiples fell in earlier rounds' },
            { code: 'stop when the next unmarked p satisfies p² > N' },
            { code: 'the unmarked numbers that remain are the primes ≤ N' },
          ],
          note: 'Two round rules keep the machine lean: begin each round at $p^2$ (every smaller multiple of $p$ carries a smaller prime factor and fell earlier), and stop at $\\sqrt{N}$ (any composite $\u2264 N$ has a prime factor $\\le \\sqrt{N}$ by the trial bound, so its slots are already crossed).',
        },
        {
          kind: 'para',
          text: 'Run it to $N = 100$. Four rounds fire — $p = 2, 3, 5, 7$ — because the next survivor, $11$, satisfies $11^2 = 121 > 100$. Each round crosses a shrinking set of still-standing numbers, and the arithmetic of the rounds is worth reading closely:',
        },
        {
          kind: 'table',
          caption: 'The four sieve rounds below 100, engine-built: each starts at p², crosses the still-standing multiples, and hands the survivors onward.',
          head: ['round p', 'crosses from', 'crossed count', 'the crossed numbers'],
          rows: [
            ['2', '4', '49', '4, 6, 8, …, 100 (every even number)'],
            ['3', '9', '16', '9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99'],
            ['5', '25', '6', '25, 35, 55, 65, 85, 95'],
            ['7', '49', '3', '49, 77, 91'],
          ],
        },
        {
          kind: 'para',
          text: 'The counts collapse dramatically — $49$, then $16$, then $6$, then $3$ — because each round only executes on what earlier rounds spared. In total $49 + 16 + 6 + 3 = 74$ numbers fall, and since the grid ran from $2$ to $100$ (ninety-nine numbers), the survivors number $99 - 74 = 25$. They are, engine-certified, exactly the twenty-five primes up to one hundred:',
        },
        {
          kind: 'figure',
          caption:
            'The sieve to 100: one hundred cells, four rounds of crossing, twenty-five survivors. Primes stand in full weight (2, 3, 5, 7, 11, …, 97); composites fade to show the fall-through; the unit 1 sits apart in grey — neither prime nor composite, the trichotomy’s third class. The last round to fire is 7 (crossing 49, 77, 91); the next survivor, 11, would start at 121 — past the bound. Reading the top row alone: of 1..10, four survive.',
          svg: `<svg viewBox="0 0 620 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ten by ten grid of the numbers 1 to 100 with the 25 primes highlighted and composites dimmed">
  <text x="330" y="36" font-size="14" fill="currentColor" text-anchor="middle" opacity="0.85">the sieve to one hundred — four rounds, 25 survivors</text>
  <g fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.5">
    <rect x="120" y="60" width="420" height="420"/>
    <path d="M162,60 V480 M204,60 V480 M246,60 V480 M288,60 V480 M330,60 V480 M372,60 V480 M414,60 V480 M456,60 V480 M498,60 V480"/>
    <path d="M120,102 H540 M120,144 H540 M120,186 H540 M120,228 H540 M120,270 H540 M120,312 H540 M120,354 H540 M120,396 H540 M120,438 H540"/>
  </g>
  <g font-size="13" text-anchor="middle">
    <text x="141" y="87" fill="currentColor" font-weight="normal" opacity="0.45">1</text>
    <text x="183" y="87" fill="currentColor" font-weight="600" opacity="0.95">2</text>
    <text x="225" y="87" fill="currentColor" font-weight="600" opacity="0.95">3</text>
    <text x="267" y="87" fill="currentColor" font-weight="normal" opacity="0.35">4</text>
    <text x="309" y="87" fill="currentColor" font-weight="600" opacity="0.95">5</text>
    <text x="351" y="87" fill="currentColor" font-weight="normal" opacity="0.35">6</text>
    <text x="393" y="87" fill="currentColor" font-weight="600" opacity="0.95">7</text>
    <text x="435" y="87" fill="currentColor" font-weight="normal" opacity="0.35">8</text>
    <text x="477" y="87" fill="currentColor" font-weight="normal" opacity="0.35">9</text>
    <text x="519" y="87" fill="currentColor" font-weight="normal" opacity="0.35">10</text>
    <text x="141" y="129" fill="currentColor" font-weight="600" opacity="0.95">11</text>
    <text x="183" y="129" fill="currentColor" font-weight="normal" opacity="0.35">12</text>
    <text x="225" y="129" fill="currentColor" font-weight="600" opacity="0.95">13</text>
    <text x="267" y="129" fill="currentColor" font-weight="normal" opacity="0.35">14</text>
    <text x="309" y="129" fill="currentColor" font-weight="normal" opacity="0.35">15</text>
    <text x="351" y="129" fill="currentColor" font-weight="normal" opacity="0.35">16</text>
    <text x="393" y="129" fill="currentColor" font-weight="600" opacity="0.95">17</text>
    <text x="435" y="129" fill="currentColor" font-weight="normal" opacity="0.35">18</text>
    <text x="477" y="129" fill="currentColor" font-weight="600" opacity="0.95">19</text>
    <text x="519" y="129" fill="currentColor" font-weight="normal" opacity="0.35">20</text>
    <text x="141" y="171" fill="currentColor" font-weight="normal" opacity="0.35">21</text>
    <text x="183" y="171" fill="currentColor" font-weight="normal" opacity="0.35">22</text>
    <text x="225" y="171" fill="currentColor" font-weight="600" opacity="0.95">23</text>
    <text x="267" y="171" fill="currentColor" font-weight="normal" opacity="0.35">24</text>
    <text x="309" y="171" fill="currentColor" font-weight="normal" opacity="0.35">25</text>
    <text x="351" y="171" fill="currentColor" font-weight="normal" opacity="0.35">26</text>
    <text x="393" y="171" fill="currentColor" font-weight="normal" opacity="0.35">27</text>
    <text x="435" y="171" fill="currentColor" font-weight="normal" opacity="0.35">28</text>
    <text x="477" y="171" fill="currentColor" font-weight="600" opacity="0.95">29</text>
    <text x="519" y="171" fill="currentColor" font-weight="normal" opacity="0.35">30</text>
    <text x="141" y="213" fill="currentColor" font-weight="600" opacity="0.95">31</text>
    <text x="183" y="213" fill="currentColor" font-weight="normal" opacity="0.35">32</text>
    <text x="225" y="213" fill="currentColor" font-weight="normal" opacity="0.35">33</text>
    <text x="267" y="213" fill="currentColor" font-weight="normal" opacity="0.35">34</text>
    <text x="309" y="213" fill="currentColor" font-weight="normal" opacity="0.35">35</text>
    <text x="351" y="213" fill="currentColor" font-weight="normal" opacity="0.35">36</text>
    <text x="393" y="213" fill="currentColor" font-weight="600" opacity="0.95">37</text>
    <text x="435" y="213" fill="currentColor" font-weight="normal" opacity="0.35">38</text>
    <text x="477" y="213" fill="currentColor" font-weight="normal" opacity="0.35">39</text>
    <text x="519" y="213" fill="currentColor" font-weight="normal" opacity="0.35">40</text>
    <text x="141" y="255" fill="currentColor" font-weight="600" opacity="0.95">41</text>
    <text x="183" y="255" fill="currentColor" font-weight="normal" opacity="0.35">42</text>
    <text x="225" y="255" fill="currentColor" font-weight="600" opacity="0.95">43</text>
    <text x="267" y="255" fill="currentColor" font-weight="normal" opacity="0.35">44</text>
    <text x="309" y="255" fill="currentColor" font-weight="normal" opacity="0.35">45</text>
    <text x="351" y="255" fill="currentColor" font-weight="normal" opacity="0.35">46</text>
    <text x="393" y="255" fill="currentColor" font-weight="600" opacity="0.95">47</text>
    <text x="435" y="255" fill="currentColor" font-weight="normal" opacity="0.35">48</text>
    <text x="477" y="255" fill="currentColor" font-weight="normal" opacity="0.35">49</text>
    <text x="519" y="255" fill="currentColor" font-weight="normal" opacity="0.35">50</text>
    <text x="141" y="297" fill="currentColor" font-weight="normal" opacity="0.35">51</text>
    <text x="183" y="297" fill="currentColor" font-weight="normal" opacity="0.35">52</text>
    <text x="225" y="297" fill="currentColor" font-weight="600" opacity="0.95">53</text>
    <text x="267" y="297" fill="currentColor" font-weight="normal" opacity="0.35">54</text>
    <text x="309" y="297" fill="currentColor" font-weight="normal" opacity="0.35">55</text>
    <text x="351" y="297" fill="currentColor" font-weight="normal" opacity="0.35">56</text>
    <text x="393" y="297" fill="currentColor" font-weight="normal" opacity="0.35">57</text>
    <text x="435" y="297" fill="currentColor" font-weight="normal" opacity="0.35">58</text>
    <text x="477" y="297" fill="currentColor" font-weight="600" opacity="0.95">59</text>
    <text x="519" y="297" fill="currentColor" font-weight="normal" opacity="0.35">60</text>
    <text x="141" y="339" fill="currentColor" font-weight="600" opacity="0.95">61</text>
    <text x="183" y="339" fill="currentColor" font-weight="normal" opacity="0.35">62</text>
    <text x="225" y="339" fill="currentColor" font-weight="normal" opacity="0.35">63</text>
    <text x="267" y="339" fill="currentColor" font-weight="normal" opacity="0.35">64</text>
    <text x="309" y="339" fill="currentColor" font-weight="normal" opacity="0.35">65</text>
    <text x="351" y="339" fill="currentColor" font-weight="normal" opacity="0.35">66</text>
    <text x="393" y="339" fill="currentColor" font-weight="600" opacity="0.95">67</text>
    <text x="435" y="339" fill="currentColor" font-weight="normal" opacity="0.35">68</text>
    <text x="477" y="339" fill="currentColor" font-weight="normal" opacity="0.35">69</text>
    <text x="519" y="339" fill="currentColor" font-weight="normal" opacity="0.35">70</text>
    <text x="141" y="381" fill="currentColor" font-weight="600" opacity="0.95">71</text>
    <text x="183" y="381" fill="currentColor" font-weight="normal" opacity="0.35">72</text>
    <text x="225" y="381" fill="currentColor" font-weight="600" opacity="0.95">73</text>
    <text x="267" y="381" fill="currentColor" font-weight="normal" opacity="0.35">74</text>
    <text x="309" y="381" fill="currentColor" font-weight="normal" opacity="0.35">75</text>
    <text x="351" y="381" fill="currentColor" font-weight="normal" opacity="0.35">76</text>
    <text x="393" y="381" fill="currentColor" font-weight="normal" opacity="0.35">77</text>
    <text x="435" y="381" fill="currentColor" font-weight="normal" opacity="0.35">78</text>
    <text x="477" y="381" fill="currentColor" font-weight="600" opacity="0.95">79</text>
    <text x="519" y="381" fill="currentColor" font-weight="normal" opacity="0.35">80</text>
    <text x="141" y="423" fill="currentColor" font-weight="normal" opacity="0.35">81</text>
    <text x="183" y="423" fill="currentColor" font-weight="normal" opacity="0.35">82</text>
    <text x="225" y="423" fill="currentColor" font-weight="600" opacity="0.95">83</text>
    <text x="267" y="423" fill="currentColor" font-weight="normal" opacity="0.35">84</text>
    <text x="309" y="423" fill="currentColor" font-weight="normal" opacity="0.35">85</text>
    <text x="351" y="423" fill="currentColor" font-weight="normal" opacity="0.35">86</text>
    <text x="393" y="423" fill="currentColor" font-weight="normal" opacity="0.35">87</text>
    <text x="435" y="423" fill="currentColor" font-weight="normal" opacity="0.35">88</text>
    <text x="477" y="423" fill="currentColor" font-weight="600" opacity="0.95">89</text>
    <text x="519" y="423" fill="currentColor" font-weight="normal" opacity="0.35">90</text>
    <text x="141" y="465" fill="currentColor" font-weight="normal" opacity="0.35">91</text>
    <text x="183" y="465" fill="currentColor" font-weight="normal" opacity="0.35">92</text>
    <text x="225" y="465" fill="currentColor" font-weight="normal" opacity="0.35">93</text>
    <text x="267" y="465" fill="currentColor" font-weight="normal" opacity="0.35">94</text>
    <text x="309" y="465" fill="currentColor" font-weight="normal" opacity="0.35">95</text>
    <text x="351" y="465" fill="currentColor" font-weight="normal" opacity="0.35">96</text>
    <text x="393" y="465" fill="currentColor" font-weight="600" opacity="0.95">97</text>
    <text x="435" y="465" fill="currentColor" font-weight="normal" opacity="0.35">98</text>
    <text x="477" y="465" fill="currentColor" font-weight="normal" opacity="0.35">99</text>
    <text x="519" y="465" fill="currentColor" font-weight="normal" opacity="0.35">100</text>
  </g>
  <g font-size="12.5" fill="currentColor">
    <text x="120" y="512" font-weight="600" opacity="0.9">full weight — the 25 primes the sieve leaves</text>
    <text x="120" y="534" opacity="0.55">dimmed — the 74 composites crossed out</text>
    <text x="120" y="552" opacity="0.45">grey — the unit 1: neither prime nor composite</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The sieve also hands us a counting function worth naming. Write $\\pi(n)$ for the number of primes up to $n$ — $\\pi$ for *primzahl*, the German word for prime, by legend on Gauss’s blackboard. The sieve computes it directly: $\\pi(100) = 25$. And the count keeps its own rhythm — thinning, but never stopping, which is precisely the promise of the next section:',
        },
        {
          kind: 'table',
          caption: 'Prime counts, sieve-computed. The second hundred holds 21 primes against the first’s 25 — thinning, not dying.',
          head: ['bound n', 'π(n)', 'the arithmetic'],
          rows: [
            ['100', '25', 'the four rounds cross 74 of the 99 numbers from 2 to 100'],
            ['200', '46', '21 new primes in 101..200 — 101 through 199'],
            ['500', '95', '49 new in 201..500'],
            ['1000', '168', '73 new in 501..1000'],
          ],
        },
        { kind: 'heading', text: 'Euclid’s proof: the primes never end' },
        {
          kind: 'para',
          text: 'The sieve to a thousand certifies $\\pi(1000) = 168$; the sieve to a million certifies 78,498. But every sieve run stops somewhere, and a stopped sieve proves nothing about what lies beyond. The question "do the primes run out?" needs an argument that works past *any* bound — and the argument is the oldest fully intact proof in mathematics. Euclid’s Elements, Book IX, Proposition 20, states it without the word "infinite":',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: '"More than any assigned multitude"',
          text: 'Euclid does not say the primes are infinite — the phrase would have been philosophically loaded, and Euclid avoids it. He proves something sharper and finitely checkable: *prime numbers are more than any assigned multitude of prime numbers*. Hand him any finite list; he hands back a longer one. (His instance list has three primes, $A, B, C$ — the proof is general but the diagram is concrete, a habit every proof-writer since has envied.) The construction takes "the least number measured by" the assigned primes — their least common multiple, which for a prime list is the product, by the algebra of chapter 2 — adds the unit, and finds a fresh prime. Historians of the Elements note, with some amusement, that this proposition is never used again in the ancient work: the most famous proof in the book is a destination, not a junction.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Theorem (Euclid, IX.20): the primes never end',
          text: 'Given any finite list of primes $p_1, p_2, \\dots, p_k$, there exists a prime that is not on the list. Consequently no finite list contains all the primes: the primes are endless.',
        },
        {
          kind: 'derivation',
          title: 'Euclid’s construction: product plus one, and the new factor',
          statement:
            'Claim: for any finite list of primes $p_1, \\dots, p_k$, the number $N = p_1 p_2 \\cdots p_k + 1$ has a prime factor, and every prime factor of $N$ lies outside the list.',
          steps: [
            {
              label: 'Build the product and step one up',
              formula: 'P = p_1 p_2 \\cdots p_k, \\qquad N = P + 1',
              explanation:
                'The product $P$ is the least common multiple of the list (for primes, pairwise coprime, the product — Lesson 2.2’s algebra, cited). Every $p_i$ divides $P$ exactly. The candidate $N$ is engineered to be *awkward for the whole list at once*.',
            },
            {
              label: 'N has some prime factor',
              formula: 'N \\ge 2 \\;\\Rightarrow\\; N \\text{ has a least divisor } q > 1, \\text{ and } q \\text{ is prime}',
              explanation:
                'If $N = 1$… it is not: $P \\ge 2$ forces $N \\ge 3$. By the least-divisor theorem (VII.31, this lesson), $N$ carries a prime factor $q$. The proof now only has to show $q$ is a *stranger* to the list.',
            },
            {
              label: 'No list member can divide N',
              formula: 'p_i \\mid P \\text{ and } p_i \\nmid N \\quad \\text{for every } i',
              explanation:
                'Suppose some $p_i$ divided $N = P + 1$ as well as $P$. Then $p_i$ divides the difference $N - P = 1$ (Lesson 2.2: $q \\mid a$ and $q \\mid b$ give $q \\mid a - b$) — but no prime divides $1$, since $1$’s only divisor is $1$. Contradiction. So each $p_i$ fails to divide $N$, and $q \\ne p_i$ for all $i$.',
            },
            {
              label: 'The list was not complete',
              formula: 'q \\text{ prime}, \\quad q \\notin \\{p_1, \\dots, p_k\\}',
              explanation:
                'The prime $q$ divides $N$ yet divides none of the listed primes — a prime off the list, manufactured from the list itself. Since the list was arbitrary, no finite list exhausts the primes. (Note what was *not* claimed: that $N$ itself is prime. It need not be — the example below makes the point unmissable.)',
            },
          ],
          result:
            'Every finite list of primes misses some prime: take the product, add one, and any prime factor of the result is a stranger. The primes are endless — proved around 300 BC, and never improved upon since.',
        },
        {
          kind: 'para',
          text: 'The proof’s engine deserves a second look, because its force lives in one line: *no prime divides both $P$ and $P + 1$*. Consecutive numbers share no prime factor — a fact as useful competitively as it is structurally. And the construction’s honesty is the deepest teaching in the whole lesson. Beginners assume the argument produces a *new prime value* $N = P + 1$. Sometimes it does:',
        },
        {
          kind: 'example',
          title: 'The primorial ladder: P + 1 is often prime — until it isn’t',
          steps: [
            'Split, the first rungs: $2 + 1 = 3$ prime; $2 \\cdot 3 + 1 = 7$ prime; $2 \\cdot 3 \\cdot 5 + 1 = 31$ prime; $2 \\cdot 3 \\cdot 5 \\cdot 7 + 1 = 211$ prime.',
            'Now, the fifth rung: $2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 + 1 = 2311$ — prime again (the trial bound: $\\lfloor\\sqrt{2311}\\rfloor = 48$, and the trials $2, 3, 5, 7, \\dots, 47$ all miss).',
            'So, the sixth rung breaks the pattern: $2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1 = 30031 = 59 \\cdot 509$ — **composite**, with both factors fresh.',
            'Take the proof’s real point: $59 \\nmid 30030$ and $509 \\nmid 30030$ — every prime factor of $30031$ lies outside the list $\\{2, 3, 5, 7, 11, 13\\}$. The list grows, prime value or not.',
            'Hence the ladder reads: 3, 7, 31, 211, 2311 prime; then 30031 = 59·509, 510511 = 19·97·277, 9699691 = 347·27953 — composite but *never degenerate*: always bearing strangers.',
          ],
        },
        {
          kind: 'table',
          caption: 'The first eight primorials and the product-plus-one: four prime values, then composites — every factor a stranger to its own list, exactly as Euclid’s argument demands.',
          head: ['list P multiplies', 'P', 'N = P + 1', 'the verdict on N'],
          rows: [
            ['2', '2', '3', 'prime'],
            ['2·3', '6', '7', 'prime'],
            ['2·3·5', '30', '31', 'prime'],
            ['2·3·5·7', '210', '211', 'prime'],
            ['2·3·5·7·11', '2310', '2311', 'prime'],
            ['2·3·5·7·11·13', '30030', '30031', '= 59 · 509 — composite, both factors new'],
            ['2·3·…·17', '510510', '510511', '= 19 · 97 · 277 — three new primes'],
            ['2·3·…·19', '9699690', '9699691', '= 347 · 27953 — two new primes'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The proof does not say N is prime',
          text: 'The single most common misstatement of Euclid’s argument — on blackboards, in exam halls, in printed popularisations — is "the product of the first $k$ primes plus one is prime, therefore more primes." The sixth rung alone kills it: $30031 = 59 \\cdot 509$. What the argument *does* say is that $N$’s prime factors are all strangers to the list — a strictly weaker, strictly correct statement, strong enough to restart the construction forever. In an exam, claiming "$P + 1$ is prime" is a markable error; claiming "$P + 1$ has a prime factor outside the list" is the theorem.',
        },
        {
          kind: 'example',
          title: 'Euclid on demand: given any list, manufacture the stranger',
          steps: [
            'Split, take the arbitrary list $\\{13, 17, 23\\}$ — three primes, no obligation to start from 2.',
            'Now, the product: $13 \\cdot 17 \\cdot 23 = 5083$, and $N = 5084$.',
            'So, factor the candidate: $5084 = 2 \\cdot 2542 = 2 \\cdot 2 \\cdot 1271$, and $1271 = 31 \\cdot 41$ — so $5084 = 2^2 \\cdot 31 \\cdot 41$.',
            'Take the check: none of $2, 31, 41$ appears in $\\{13, 17, 23\\}$ — the strangers arrive on cue, exactly the theorem’s promise (Lesson 4.2 will prove such factorisations are *unique*; here the least-divisor engine certifies this one).',
            'Hence from any list, a longer one: $\\{13, 17, 23, 2, 31, 41\\}$ — Euclid’s engine, run once by hand.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Competitive papers (CAT/IPMAT number systems; Khattar QA’s ch. 1 scope) ask four shapes from this lesson: classify a number quickly — the trial band $\\lfloor\\sqrt{n}\\rfloor$ with the 2/3/5 filters first ($91 = 7 \\cdot 13$ and $221 = 13 \\cdot 17$ are the classics); count primes in a range using $\\pi$-table fragments ($\\pi(100) = 25$, $\\pi(200) = 46$, so 21 primes in the second hundred); find "the number of primes between" with the sieve run on paper; and the Euclid-reasoning shape — "show that for any $n$, the number $n! + 2, \\dots, n! + n$ are all composite" (each $n! + k$ is divisible by its own $k$, the same consecutive-numbers engine that powers $P$ and $P + 1$). The trap to avoid: never claim a product-plus-one is prime; claim its *factors* are new. And the least-divisor theorem is the sanctioned one-line proof whenever a paper asks "show every composite has a prime factor."',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Prime', def: 'A number $n \\ge 2$ with exactly two divisors, $1$ and $n$. The atom of multiplication; the poverty of its divisors is its power.' },
            { term: 'Composite', def: 'A number $n \\ge 2$ with some divisor strictly between $1$ and $n$ — equivalently $n = ab$ with both factors above 1.' },
            { term: 'Unit', def: 'The number $1$: exactly one divisor. Neither prime nor composite; the empty ingredient that Lesson 4.2 formalises as the empty product.' },
            { term: 'Trichotomy', def: 'The partition of the naturals into units (just 1), primes, and composites — every number in exactly one class, with no overlap and no residue.' },
            { term: 'Trial-division bound', def: '$n$ is prime iff no $2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor$ divides it; a composite always donates a factor $\\le \\sqrt{n}$. The square-root cap on primality search.' },
            { term: 'Sieve of Eratosthenes', def: 'Cross out multiples of each surviving prime from $p^2$ upward; stop at $p > \\sqrt{N}$; the survivors are the primes. Known to us through Nicomachus, not Eratosthenes’ own (lost) writing.' },
            { term: 'Primorial', def: 'The product $P = p_1 p_2 \\cdots p_k$ of an initial prime list; the raw material of Euclid’s construction. $2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 = 30030$.' },
            { term: 'Euclid’s construction', def: '$N = P + 1$ for a prime-list product $P$: no listed prime divides $N$ (else it divides $N - P = 1$), so every prime factor of $N$ is a stranger — the list was incomplete. $\\pi(100) = 25$ counts what sieves find; Euclid proves the count never closes.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which verdict does the trial-division bound deliver for 91?',
              options: ['Prime — the band $\\lfloor\\sqrt{91}\\rfloor = 9$ finds no divisor', 'Composite — $91 = 7 \\times 13$, and the 7 lands inside the band', 'Neither — 91 is a unit', 'Composite — $91 = 3 \\times 30$ plus 1 left over'],
              answer: 1,
              explain: '$\\lfloor\\sqrt{91}\\rfloor = 9$, and the trials $2, 3, 5$ miss before $7 \\cdot 13 = 91$ lands — composite, certified in four divisions. The "$3 \\times 30$ plus 1" shape is not a factorisation ($3 \\cdot 30 = 90$, remainder 1 — a division-algorithm row, not a product). Units have one divisor; 91 has four.',
            },
            {
              q: 'To test 221 for primality, the bound says trial-divide by every $d$ with:',
              options: ['$2 \\le d \\le 110$ — halfway is enough', '$2 \\le d \\le 14$, because $14^2 = 196 \\le 221 < 225 = 15^2$', '$2 \\le d \\le 221$ — every smaller number', '$d = 13$ only, since 13 is the smallest suspect'],
              answer: 1,
              explain: '$\\lfloor\\sqrt{221}\\rfloor = 14$ — and the bound is tight here: $221 = 13 \\cdot 17$, the factor 13 inside the band, 17 outside. Stopping at 110 wastes ninety-six divisions; "every smaller number" ignores the theorem; fixing on 13 alone is guessing, not testing.',
            },
            {
              q: 'Sieving to 100, the last round that fires is run by the prime:',
              options: ['7 — because $7^2 = 49 \\le 100 < 121 = 11^2$', '10 — the square root of the bound', '11 — the next prime after 7', '97 — the largest prime below 100'],
              answer: 0,
              explain: 'Rounds fire while $p^2 \\le N$: seven’s round crosses 49, 77, 91 and eleven’s would start at 121 — past the bound. "10" is not a prime, so it runs no round; 97 is a *survivor*, not a sieving prime; the round order is by size, and 7 is the last prime with $p^2 \\le 100$.',
            },
            {
              q: 'Euclid’s list is $\\{2, 3, 5, 7, 11, 13\\}$ and $N = 30031$. The argument concludes:',
              options: ['30031 is prime, so the list grows by one prime', '30031 = 59 × 509 — the list still must grow, because both factors are strangers', '30031 proves the list was complete', 'The next prime after 13 is 30031'],
              answer: 1,
              explain: 'This is the honesty instance: $N$ is composite ($59 \\cdot 509 = 30031$), yet neither factor sits in the list — no listed prime divides $N$, since each divides $30030$ and would then divide $N - 30030 = 1$. The strangers alone force the list to grow. "30031 is prime" is false; "the next prime after 13 is 30031" is false twice over (17, 19, 23, …, 59 all intervene).',
            },
            {
              q: 'How many primes does the sieve to 100 leave standing?',
              options: ['24', '25', '26', '21'],
              answer: 1,
              explain: '$\\pi(100) = 25$: the four rounds cross $49 + 16 + 6 + 3 = 74$ of the ninety-nine numbers from 2 to 100, leaving $99 - 74 = 25$. The 21 is a different count — the primes of the *second* hundred (101..200), where $\\pi(200) - \\pi(100) = 46 - 25$.',
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
                  q: 'Classify each as prime or composite, one trial-band glance each: $9$, $11$, $15$, $19$, $21$.',
                  solution: [
                    'Split, the divisor lists: $9 = 1, 3, 9$; $11 = 1, 11$; $15 = 1, 3, 5, 15$; $19 = 1, 19$; $21 = 1, 3, 7, 21$.',
                    'Now, the verdicts: $9 = 3^2$ and $15 = 3 \\cdot 5$ and $21 = 3 \\cdot 7$ carry middle divisors — composite; $11$ and $19$ carry none — prime.',
                    'So, the trichotomy sorts five numbers in five lines.',
                    'Hence composite: 9, 15, 21; prime: 11, 19.',
                  ],
                  answer: '9, 15, 21 composite · 11, 19 prime',
                },
                {
                  q: 'How many divisors does 1 have, and which of the three classes does it occupy?',
                  solution: [
                    'Split, the definition: a divisor of $n$ is a $d$ with $n = qd$, $q$ natural.',
                    'Now, for $n = 1$: $1 = q \\cdot d$ forces $q = d = 1$ — the only row.',
                    'So, the divisor list of 1 is just $\\{1\\}$: length one.',
                    'Take the classes: primes need exactly two divisors, composites need a middle divisor — 1 meets neither.',
                    'Hence 1 is a unit, the third class of the trichotomy — and Lesson 4.2 will call its factorisation the empty product.',
                  ],
                  answer: '1 has exactly one divisor — a unit, neither prime nor composite',
                },
                {
                  q: 'In the sieve to 100, does 47 survive all four rounds? Check each.',
                  solution: [
                    'Split, the four rounds test divisibility by $2, 3, 5, 7$ — nothing else ever fires below 100.',
                    'Now, run them: $47 = 2 \\cdot 23 + 1$ (odd); digit sum $11$ not a multiple of 3; ends in 7; $47 = 7 \\cdot 6 + 5$.',
                    'So, all four rounds miss — 47 is never crossed.',
                    'Hence 47 survives and is prime — the 15th prime, standing between 43 and 53 in the grid.',
                  ],
                  answer: '47 survives all four rounds — prime',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Determine whether 91 is prime, running the full trial band.',
                  solution: [
                    'Split, the band: $\\lfloor\\sqrt{91}\\rfloor = 9$ — trials $2, 3, 5, 7$.',
                    'Now, the runs: $91$ odd; $9 + 1 = 10$, not divisible by 3; last digit 1; $91 = 7 \\cdot 13$ ✓.',
                    'So, the fourth trial lands: a middle divisor exists.',
                    'Hence $91 = 7 \\cdot 13$ is composite — the band found both atoms in four divisions.',
                  ],
                  answer: '91 = 7 × 13, composite',
                },
                {
                  q: 'Show that 97 is prime, and name its rank among the primes.',
                  solution: [
                    'Split, the band: $\\lfloor\\sqrt{97}\\rfloor = 9$ ($9^2 = 81 \\le 97 < 100$) — trials $2, 3, 5, 7$.',
                    'Now, the runs: odd; digit sum $16$; last digit 7; $97 = 7 \\cdot 13 + 6$ — all miss.',
                    'So, the band is empty of divisors: prime, by the bound theorem.',
                    'Take the rank: the sieve to 100 leaves 25 primes, and 97 is the largest — the 25th.',
                    'Hence 97 is prime, the 25th prime — the last survivor of the first sieve.',
                  ],
                  answer: '97 prime — the 25th prime',
                },
                {
                  q: 'List the numbers the round $p = 3$ crosses in the sieve to 100, and explain why the list starts at 9.',
                  solution: [
                    'Split, the round’s licence: cross still-standing multiples of 3 from $3^2 = 9$ upward.',
                    'Now, the smaller multiples — 3, 6 — are gone already: 3 was circled, 6 fell to the round $p = 2$.',
                    'So, the crossed set: $9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99$ — sixteen numbers, every *odd* multiple of 3 from 9 to 99.',
                    'Hence the $p = 3$ round crosses 16 numbers, starting at 9 — the start-at-$p^2$ rule is an optimisation with a reason, not a ritual.',
                  ],
                  answer: '9, 15, 21, …, 99 — sixteen crossings, starting at 3²',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Apply Euclid’s construction to the list $\\{2, 3, 5\\}$ and then to $\\{2, 3, 5, 7, 11\\}$. In each case state $N$ and certify the new prime.',
                  solution: [
                    'Split, the first list: $P = 2 \\cdot 3 \\cdot 5 = 30$, so $N = 31$.',
                    'Now, certify: $\\lfloor\\sqrt{31}\\rfloor = 5$, and the trials $2, 3, 5$ all miss — 31 is itself prime, a new one.',
                    'So, the second list: $P = 2310$, $N = 2311$; $\\lfloor\\sqrt{2311}\\rfloor = 48$, and the trials $2, 3, 5, 7, \\dots, 47$ all miss — prime again.',
                    'Hence both constructions land on prime values (31; 2311) — but that is the ladder’s good luck, not the theorem’s content: the *guarantee* is only that every factor of $N$ is a stranger.',
                  ],
                  answer: 'N = 31 (prime); N = 2311 (prime)',
                },
                {
                  q: 'Explain why the sieve to $N$ may stop once the surviving prime $p$ satisfies $p^2 > N$. Then verify at $N = 100$ that stopping after $p = 7$ loses nothing.',
                  solution: [
                    'Split, the fear: could a composite ≤ N survive all rounds up to $p$?',
                    'Now, if $n \\le N$ is composite, the trial bound donates a prime factor $q \\le \\sqrt{n} \\le \\sqrt{N}$.',
                    'So, $q$’s own round — which fired, since $q^2 \\le q \\cdot q \\le n \\le N$ — crossed $n$ (from $q^2$ upward, and $q^2 \\le q \\cdot (n/q)$… indeed $q^2 \\le n$ as $q \\le \\sqrt{n}$). Every composite has already fallen.',
                    'Take $N = 100$: the last firing prime is 7 ($7^2 = 49 \\le 100$); the next survivor 11 has $11^2 = 121 > 100$.',
                    'Hence stopping after 7 is exact: the four rounds crossed $49 + 16 + 6 + 3 = 74$ numbers and the 25 survivors are precisely the primes ≤ 100.',
                  ],
                  answer: 'Composites carry a prime factor ≤ √N, whose round already crossed them — 7 is the last round below 100',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Given $\\pi(100) = 25$ and $\\pi(200) = 46$, how many primes lie strictly between 100 and 200? List the first three and the last one.',
                  solution: [
                    'Split, the subtraction: primes in $(100, 200]$ number $\\pi(200) - \\pi(100) = 46 - 25 = 21$.',
                    'Now, the endpoints: 100 is not prime, so "strictly between" and "in 101..200" agree here.',
                    'So, the candidates begin 101, 103, 107 — each passing its own trial band ($\\lfloor\\sqrt{101}\\rfloor = 10$, four trials) — and end at 199.',
                    'Hence 21 primes: 101, 103, 107, …, 199 — the second hundred is thinner (21 against 25) but far from empty.',
                  ],
                  answer: '21 primes — 101, 103, 107, …, 199',
                },
                {
                  q: 'Prove that 397 is prime, naming every trial the bound demands.',
                  solution: [
                    'Split, the band: $\\lfloor\\sqrt{397}\\rfloor = 19$ ($19^2 = 361 \\le 397 < 400 = 20^2$).',
                    'Now, the trials — the primes $2, 3, 5, 7, 11, 13, 17, 19$: 397 odd; digit sum $19$; last digit 7; $397 = 7 \\cdot 56 + 5$; $397 = 11 \\cdot 36 + 1$; $397 = 13 \\cdot 30 + 7$; $397 = 17 \\cdot 23 + 6$; $397 = 19 \\cdot 20 + 17$.',
                    'So, all eight trials miss — the band holds no divisor.',
                    'Hence 397 is prime, certified by eight divisions under the square-root cap.',
                  ],
                  answer: '397 prime — eight trials, all miss',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove: the least divisor greater than 1 of any $n \\ge 2$ is prime. (This is Elements VII.31’s engine.)',
                  solution: [
                    'Split, existence: the set of divisors of $n$ above 1 contains $n$ itself, so it is nonempty — by the least-number principle (Lesson 1.3) it has a least element $d$.',
                    'Now, suppose $d$ were composite: then $d = ab$ with $1 < a < d$.',
                    'So, $a$ divides $d$ and $d$ divides $n$, hence $a$ divides $n$ (divisibility is transitive — Lesson 2.2): a divisor of $n$ above 1 *smaller* than $d$.',
                    'Take the contradiction: $d$ was the least such — impossible. So $d$ is not composite.',
                    'Hence $d$ is not 1 (by choice) and not composite, and $d \\ge 2$: it is prime — and $n$ owns a prime factor, QED.',
                  ],
                  answer: 'The least divisor above 1 is prime — else its own smaller divisor would be smaller still',
                },
                {
                  q: 'Show that 3, 5, 7 is the only prime triplet of the form $p, p+2, p+4$.',
                  solution: [
                    'Split, the residue engine: among any three numbers $p, p+2, p+4$, one is divisible by 3 — they occupy the three residue classes mod 3 in some order ($p, p+2, p+4 \\equiv p, p+2, p+1$ mod 3).',
                    'Now, if $p > 3$, all three numbers exceed 3, and the one divisible by 3 is a composite (a multiple of 3 greater than 3).',
                    'So, for $p > 3$ the triplet can never be all-prime — one member is always composite.',
                    'Take the survivor: $p = 3$ gives $3, 5, 7$ — all prime, the divisible-by-3 member being 3 itself.',
                    'Hence $\\{3, 5, 7\\}$ is the unique triplet of the shape — the only prime run of length three at stride two.',
                  ],
                  answer: 'Only 3, 5, 7 — for p > 3 one of p, p+2, p+4 is a composite multiple of 3',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that $101! + 2, \\; 101! + 3, \\; \\dots, \\; 101! + 101$ are one hundred consecutive composite numbers. (This is Euclid’s consecutive-numbers engine at full power.)',
                  solution: [
                    'Split, the engine: for each $k$ with $2 \\le k \\le 101$, the factorial $101! = 1 \\cdot 2 \\cdots 101$ contains $k$ as a factor — $k$ is literally one of the multiplied terms.',
                    'Now, add: $101! + k = k \\left( \\frac{101!}{k} + 1 \\right)$, and $\\frac{101!}{k}$ is a natural number.',
                    'So, $101! + k$ is a product of two factors each ≥ 2 — $k \\ge 2$, and $\\frac{101!}{k} + 1 \\ge 2$: composite, by definition.',
                    'Take the range: as $k$ runs $2, 3, \\dots, 101$, the numbers $101! + k$ are one hundred *consecutive* integers, every one composite.',
                    'Hence a hundred consecutive composites exist — prime gaps are unbounded in practice; the twin to this construction (Euclid’s $P + 1$) shows the primes themselves never stop. Both facts at once: no final prime, and no cap on the silence between them.',
                  ],
                  answer: 'Each 101! + k = k·(101!/k + 1) — one hundred consecutive composites, k = 2..101',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The trial-division bound',
          latex: 'n \\ge 2 \\text{ prime} \\;\\Longleftrightarrow\\; \\forall d,\\; 2 \\le d \\le \\lfloor\\sqrt{n}\\rfloor \\Rightarrow d \\nmid n',
          note: 'Every composite donates a factor ≤ √n. Instances: ⌊√91⌋ = 9, ⌊√221⌋ = 14, ⌊√397⌋ = 19.',
        },
        {
          kind: 'formula',
          name: 'The sieve’s two round rules',
          latex: '\\text{cross from } p^2; \\quad \\text{stop when } p^2 > N',
          note: 'Below 100 the firing primes are 2, 3, 5, 7 — crossings 49 + 16 + 6 + 3 = 74, survivors 25.',
        },
        {
          kind: 'formula',
          name: 'Euclid’s construction',
          latex: 'N = p_1 p_2 \\cdots p_k + 1 \\;\\Rightarrow\\; \\text{every prime factor of } N \\text{ lies off the list}',
          note: 'No prime divides both P and P + 1 (else it divides 1). The honesty instance: 30031 = 59 · 509.',
        },
        {
          kind: 'formula',
          name: 'Prime counts',
          latex: '\\pi(100) = 25, \\quad \\pi(200) = 46, \\quad \\pi(500) = 95, \\quad \\pi(1000) = 168',
          note: 'Sieve-computed; the second hundred holds 46 − 25 = 21 primes. The counts thin but never end — Euclid, IX.20.',
        },
      ],
    },
    {
      id: 'ans-fundamental-theorem-of-arithmetic',
      number: '4.2',
      title: 'The Fundamental Theorem of Arithmetic',
      prerequisites: ['ans-primes-never-end-euclid-and-the-sieve', 'ans-euclidean-algorithm-proven-bezout-identity', 'ans-induction-proving-for-every-number'],
      sources: ['gauss-1801-disquisitiones', 'al-farisi-fta-existence', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'The fundamental theorem of arithmetic',
        'Existence by strong induction',
        'Euclid’s lemma from Bézout',
        'Uniqueness of the factorisation',
        'The canonical form with exponents',
        'The divisor count τ(n) = ∏(aᵢ+1)',
        'The factorial exponent v_p(n!)',
        'Trailing zeros of n!',
      ],
      objectives: [
        'State the fundamental theorem in both directions — existence (every $n \\ge 2$ is a product of primes) and uniqueness (the product is unique up to order) — and prove existence by strong induction through the least-prime-factor engine',
        'Prove Euclid’s lemma ($p \\mid ab \\Rightarrow p \\mid a$ or $p \\mid b$, for prime $p$) from Lesson 2.3’s Bézout identity, and exhibit composite divisors that break it',
        'Cash the lemma into uniqueness: two prime factorisations of one number force each prime across and cancel, ending in identical factor lists — and assemble the canonical form $n = p_1^{a_1} \\cdots p_k^{a_k}$ with $1$ as the empty product',
        'Read the divisor count $\\tau(n) = \\prod (a_i + 1)$, the factorial exponent $v_p(n!) = \\sum \\lfloor n/p^i \\rfloor$, and the trailing zeros of $n!$ straight off the exponents — the three shapes competitive examinations bank on',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.1 supplied the atoms: primes, endless, huntable by sieve. One sentence of the chemical analogy remains unproven — that every number is a *molecule with a unique formula*. Factorise 60 however you like: $4 \\cdot 15$, $6 \\cdot 10$, $2 \\cdot 30$, $3 \\cdot 20$, $5 \\cdot 12$, or plainly $2 \\cdot 2 \\cdot 3 \\cdot 5$. The routes differ; the destination never does — every route lands on two 2s, a 3, and a 5. This lesson proves that *never*: the fundamental theorem of arithmetic, the unique-factorisation theorem, the quiet foundation under every HCF/LCM shortcut, every radical simplification, every divisor count that Foundation Mathematics performed and this book is finally explaining.',
        },
        {
          kind: 'para',
          text: 'The theorem has two halves, and they are unequal in difficulty. *Existence* — every number above 1 factors into primes — is Lesson 1.2’s strong induction running on Lesson 4.1’s least-divisor engine; it falls in a paragraph. *Uniqueness* — no two distinct prime products evaluate equal — is the deep half, and it needs a new tool: Euclid’s lemma, that a prime dividing a product must divide a factor. The lemma itself descends from Bézout’s identity (Lesson 2.3), which is why chapter 2 spent a full lesson proving that a linear combination of $a$ and $b$ realizes their gcd. Two runs of induction, one loan of Bézout — the whole theorem.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The Fundamental Theorem of Arithmetic',
          text: 'Every natural number $n \\ge 2$ can be written as a product of primes, and the product is unique up to order: if $n = p_1 p_2 \\cdots p_r = q_1 q_2 \\cdots q_s$ with all $p_i, q_j$ prime, then $r = s$ and the $q$-list is a reordering of the $p$-list. Collecting equal primes writes the unique **canonical form** $n = p_1^{a_1} p_2^{a_2} \\cdots p_k^{a_k}$ with $p_1 < p_2 < \\cdots < p_k$; the number $1$ is the **empty product** — the product of no primes, which equals $1$ by convention.',
        },
        { kind: 'heading', text: 'Existence: strong induction spends the least-divisor engine' },
        {
          kind: 'derivation',
          title: 'Every number above 1 factors into primes',
          statement:
            'Claim: every $n \\ge 2$ is a product of primes. Engine: strong induction on $n$ (Lesson 1.2), with the least divisor (Lesson 4.1, Elements VII.31) supplying the crack in every composite.',
          steps: [
            {
              label: 'The base case is an atom',
              formula: 'n = 2: \\quad \\text{prime by inspection — the product of one prime, itself}',
              explanation:
                'The smallest number above 1 is prime (its divisor list is exactly $\\{1, 2\\}$), so it is already a one-factor prime product. Every induction needs a floor; this one is an atom.',
            },
            {
              label: 'The strong-induction licence',
              formula: '\\text{assume: every } m \\text{ with } 2 \\le m < n \\text{ factors into primes}',
              explanation:
                'Strong induction assumes the claim for *all* smaller values, not just the immediate predecessor — exactly the form Lesson 1.2 certified, and exactly what a factorisation argument needs, since a number’s factors can be anywhere below it.',
            },
            {
              label: 'n is either prime or it cracks',
              formula: 'n \\text{ prime} \\Rightarrow \\text{done}; \\qquad n \\text{ composite} \\Rightarrow n = ab, \\;\\; 1 < a, b < n',
              explanation:
                'If $n$ is prime, it is its own prime product — the claim holds with no work. If composite, the trichotomy donates a proper factorisation: $n = ab$ with both factors strictly between 1 and $n$.',
            },
            {
              label: 'Both pieces are smaller — induct on each',
              formula: 'a = p_1 \\cdots p_r, \\quad b = q_1 \\cdots q_s \\;\\Rightarrow\\; n = p_1 \\cdots p_r \\, q_1 \\cdots q_s',
              explanation:
                'Since $2 \\le a, b < n$, the induction hypothesis applies to both: each factors into primes. Multiplying the two products (and the product law of arithmetic, chapter 1’s associative engine) factors $n$. One can even take $a$ to be the *least* divisor above 1 — prime by Lesson 4.1 — making the descent $n \\to n/p$ strictly decreasing, which is the concrete ladder the recursion walks.',
            },
          ],
          result:
            'Every $n \\ge 2$ is a product of primes. The proof gives an algorithm for free: factor $n$ by pulling out least divisors until the cofactor is itself prime — the trial-division machine, now justified.',
        },
        {
          kind: 'example',
          title: 'The existence engine, run on 84',
          steps: [
            'Split, the least divisor: $84$ is even — least divisor $2$, prime by VII.31. $84 = 2 \\cdot 42$.',
            'Now, the cofactor: $42 = 2 \\cdot 21$ — the engine fires again, another 2.',
            'So, $21 = 3 \\cdot 7$, and $7$ is prime (its band $\\lfloor\\sqrt{7}\\rfloor = 2$ is empty of divisors) — the recursion bottoms out.',
            'Take the assembly: $84 = 2 \\cdot 2 \\cdot 3 \\cdot 7$, four primes whose product rebuilds $84$ exactly.',
            'Hence $84 = 2^2 \\cdot 3 \\cdot 7$ — existence, witnessed concretely; uniqueness is the next section’s promise.',
          ],
        },
        {
          kind: 'algorithm',
          title: 'Trial-division factoring (the existence engine, executable)',
          lines: [
            { code: 'input n ≥ 2;  factors ← empty list' },
            { code: 'while m > 1, starting m = n:' },
            { code: '    d ← least divisor of m above 1', note: 'prime, by VII.31' },
            { code: '    append d to factors;  m ← m / d' },
            { code: 'output factors — the prime factorisation of n, ascending' },
          ],
          note: 'Each pass strictly shrinks $m$ (division by $d \\ge 2$), so the loop halts — descent, not faith. In practice $d$ is found by trial-dividing $2, 3, 5, \\dots$ up to $\\sqrt{m}$; the loop emits primes in increasing order, which *is* the canonical form being assembled.',
        },
        { kind: 'heading', text: 'Euclid’s lemma: the tool uniqueness needs' },
        {
          kind: 'para',
          text: 'Uniqueness asks: could two genuinely different prime products equal one number? The obstruction to proving "no" is that primes do not, on their face, *see* products — $7$ divides $42$, but why must it divide a *factor* of any product equal to 42? The bridge is the oldest lemma in the book’s ancestry, Elements VII.30, and its proof is chapter 2’s engine finally cashed:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Euclid’s lemma (Elements VII.30)',
          text: 'Let $p$ be prime. If $p \\mid ab$ for natural numbers $a, b$, then $p \\mid a$ or $p \\mid b$ (or both). The primality of $p$ is essential: composite divisors do not obey it — $6 \\mid 2 \\cdot 9 = 18$, yet $6 \\nmid 2$ and $6 \\nmid 9$.',
        },
        {
          kind: 'derivation',
          title: 'The lemma from Bézout — chapter 2’s engine, cashed',
          statement:
            'Claim: for prime $p$, $p \\mid ab$ and $p \\nmid a$ together force $p \\mid b$. Engine: Bézout’s identity (Lesson 2.3) — the gcd of two numbers is a linear combination of them.',
          steps: [
            {
              label: 'p ∤ a pins the gcd',
              formula: 'p \\nmid a \\;\\Rightarrow\\; \\gcd(p, a) = 1',
              explanation:
                'The gcd of $p$ and $a$ divides the prime $p$, so it is $1$ or $p$ — there is nothing between (a prime’s divisor list is exactly $\\{1, p\\}$). Since $p \\nmid a$, it cannot be $p$: it is $1$. The dichotomy is where primality enters; a composite $d$ allows $gcd(p, a)$ to be a proper factor of $d$, and the proof collapses exactly there — which is why $6 \\mid 2 \\cdot 9$ breaks the lemma.',
            },
            {
              label: 'Bézout writes 1 as a combination',
              formula: '1 = x p + y a \\quad \\text{for some integers } x, y',
              explanation:
                'Lesson 2.3 proved that $gcd(p, a)$ is an integer linear combination of $p$ and $a$ — the Euclidean algorithm’s certificate. With the gcd equal to $1$: $1 = xp + ya$. (The coefficients may be negative; that is allowed and harmless.)',
            },
            {
              label: 'Multiply through by b',
              formula: 'b = x p b + y a b',
              explanation:
                'Scaling the identity by $b$ is legal in the integers, and it smuggles the hypothesis into view: the second term $yab$ now carries the factor $ab$, which $p$ divides.',
            },
            {
              label: 'p eats both terms on the right',
              formula: 'p \\mid xpb \\text{ (trivially)} \\quad \\text{and} \\quad p \\mid yab \\; (\\text{since } p \\mid ab) \\;\\Rightarrow\\; p \\mid b',
              explanation:
                'A linear combination of multiples of $p$ is a multiple of $p$ (Lesson 2.2’s algebra, twice over). So $p$ divides the right side — which equals $b$. The lemma holds; the composite counterexamples mark exactly the line where their proofs would fail.',
            },
          ],
          result:
            'Euclid’s lemma: a prime that divides a product must divide a factor. Proven from Bézout alone — the Euclidean algorithm of Lesson 2.3 turning out to be the engine of arithmetic’s deepest theorem.',
        },
        {
          kind: 'example',
          title: 'The Bézout chain, run on numbers: 5 ∤ 12, so 5 must divide 25',
          steps: [
            'Split, the setup: $p = 5$ (prime), $a = 12$, $b = 25$; the hypothesis: $5 \\mid 12 \\cdot 25 = 300$.',
            'Now, the gcd dichotomy: $5 \\nmid 12$, so $\\gcd(5, 12) = 1$ — and Bézout (Lesson 2.3’s Euclidean run) certifies $1 = 5 \\cdot 5 - 12 \\cdot 2$.',
            'So, scale by $b = 25$: $25 = 5 \\cdot 125 - 12 \\cdot 50$.',
            'Take the divisibility: $5 \\mid 5 \\cdot 125$ trivially, and $5 \\mid 12 \\cdot 50$ since $5 \\mid 50$ — wait, the lemma’s own route is cleaner: $5 \\mid 12 \\cdot 25$ was the *hypothesis*, so $5 \\mid y \\cdot 300$ for any $y$; either way both right-hand terms are multiples of 5.',
            'Hence $5 \\mid 25$ — the lemma’s verdict, and indeed $25 = 5 \\cdot 5$. The Bézout identity did the forcing; primality did the dichotomy.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The lemma is for primes only — three composites that break it',
          text: 'The implication "$d \\mid ab \\Rightarrow d \\mid a$ or $d \\mid b$" fails the moment $d$ is composite: $6 \\mid 2 \\cdot 9$ with $6$ dividing neither factor; $4 \\mid 2 \\cdot 6$ with $4$ dividing neither; $8 \\mid 2 \\cdot 12$ with $8$ dividing neither. In each case $gcd(d, a)$ is a *proper* factor of $d$ (2, 2 and 2 respectively), not $1$ — the Bézout line becomes $2 = $ something, and the forcing dies. This is not a technicality to memorise but the reason uniqueness is a *theorem about primes*: only atoms carry the dichotomy $gcd(p, a) \\in \\{1, p\\}$.',
        },
        { kind: 'heading', text: 'Uniqueness: the lemma walks the primes across' },
        {
          kind: 'derivation',
          title: 'Two prime products, one value — the lists match',
          statement:
            'Claim: if $p_1 p_2 \\cdots p_r = q_1 q_2 \\cdots q_s$ with all factors prime, then $r = s$ and the lists agree up to order. Engine: Euclid’s lemma, then induction.',
          steps: [
            {
              label: 'The leftmost prime reaches across',
              formula: 'p_1 \\mid q_1 q_2 \\cdots q_s \\;\\Rightarrow\\; p_1 \\mid q_j \\text{ for some } j',
              explanation:
                '$p_1$ divides the whole right side (they are equal). Apply Euclid’s lemma repeatedly — $p_1 \\mid q_1 (q_2 \\cdots q_s)$ gives $p_1 \\mid q_1$ or $p_1 \\mid q_2 \u22ef q_s$; iterate until the chain bottoms out at a single $q_j$. Every descent is a lemma instance.',
            },
            {
              label: 'Dividing a prime names it',
              formula: 'p_1 \\mid q_j, \\; q_j \\text{ prime} \\;\\Rightarrow\\; p_1 = q_j',
              explanation:
                '$p_1 \\ge 2$ (a prime), and $q_j$’s only divisors are $1$ and $q_j$ — so $p_1 = q_j$. The leftmost prime on one side *is* some prime on the other. No luck involved: the lemma forces a match for whichever prime we name first.',
            },
            {
              label: 'Cancel and shrink both sides',
              formula: '\\frac{p_1}{p_1} p_2 \u22ef p_r = \\frac{q_j}{q_j} \u22ef q_s \\;\\Rightarrow\\; p_2 \u22ef p_r = \\text{a shorter } q\\text{-product}',
              explanation:
                'Cancellation (Lesson 2.2: $ca = cb$ with $c ≠ 0$ gives $a = b$ — true in the naturals, no sign regrets) removes the matched prime from both sides. What remains are two prime products, strictly smaller, still equal.',
            },
            {
              label: 'Induct on the total length',
              formula: 'r = s \\text{ and the lists coincide, by induction}',
              explanation:
                'The base case — the empty product, value $1$ — matches only the empty product: a prime product cannot equal 1 (any prime factor would divide 1). Each cancellation consumes one prime from each side; when one list empties, the other must too, or its product would exceed 1. Same count, same multiset: $r = s$, and the $q$-list is the $p$-list reordered.',
            },
          ],
          result:
            'The factorisation is unique up to order. Collecting repeated primes gives the canonical form $n = p_1^{a_1} \u22ef p_k^{a_k}$ — one formula per number, the molecule’s identity card.',
        },
        {
          kind: 'equation',
          latex: 'n = p_1^{a_1} \\, p_2^{a_2} \\cdots p_k^{a_k} \\qquad p_1 < p_2 < \\cdots < p_k, \\quad a_i \\ge 1',
          note: 'The canonical (standard) form — unique per $n$. The map $n \\mapsto (p_1, a_1; \\dots; p_k, a_k)$ is a *complete* description of $n$’s multiplicative DNA: everything countable about $n$’s divisors reads off it, as the rest of this lesson shows.',
        },
        {
          kind: 'para',
          text: 'The unit’s convention slots in cleanly: $1$ is the product of *no* primes — the empty product, which multiplies as $1$. With that, the theorem covers every natural number: primes (single-factor products), composites (multi-factor), and the unit (empty). Uniqueness even survives *order*: writing $2 \\cdot 3 \\cdot 3 \\cdot 5$ or $3 \\cdot 5 \\cdot 2 \\cdot 3$ changes nothing — both collect to $2 \\cdot 3^2 \u22c5 5 = 90$.',
        },
        {
          kind: 'example',
          title: '2025 in canonical dress — the trial-division run, then the form',
          steps: [
            'Split, pull the least divisors: $2025 = 3 \\cdot 675 = 3 \\cdot 3 \\cdot 225 = 3 \\cdot 3 \\cdot 3 \\cdot 75 = 3^3 \\cdot 75$.',
            'Now, keep going: $75 = 3 \\cdot 25$ — a fourth 3 — then $25 = 5 \\cdot 5$: two fives.',
            'So, the prime list: $3, 3, 3, 3, 5, 5$ — rebuild: $81 \\cdot 25 = 2025$ ✓.',
            'Take the canonical form: $2025 = 3^4 \u22c5 5^2$ — one formula, no rival (the theorem now guarantees that).',
            'Hence the divisor list’s DNA is $(3, 4)$ and $(5, 2)$ — and the next section reads divisor counts straight off those exponents.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Two routes to 60 — the fundamental theorem as a picture. Left: 60 = 4 × 15, the factors cracked further (4 = 2 × 2, 15 = 3 × 5). Right: 60 = 6 × 10 (6 = 2 × 3, 10 = 2 × 5). Different second steps, different-looking trees — yet both bottom rows are two 2s, a 3 and a 5, and both trees hand the same canonical band: 60 = 2² × 3 × 5. The theorem says this convergence is not luck; it is law, for every number and every route.',
          svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two factorisation trees for sixty, both ending in two twos, a three and a five">
  <g fill="none" stroke="currentColor" stroke-width="1.3">
    <rect x="150" y="56" width="56" height="36"/>
    <rect x="70" y="152" width="56" height="36"/>
    <rect x="230" y="152" width="56" height="36"/>
    <rect x="28" y="248" width="56" height="36"/>
    <rect x="112" y="248" width="56" height="36"/>
    <rect x="196" y="248" width="56" height="36"/>
    <rect x="264" y="248" width="56" height="36"/>
    <rect x="470" y="56" width="56" height="36"/>
    <rect x="390" y="152" width="56" height="36"/>
    <rect x="550" y="152" width="56" height="36"/>
    <rect x="348" y="248" width="56" height="36"/>
    <rect x="432" y="248" width="56" height="36"/>
    <rect x="508" y="248" width="56" height="36"/>
    <rect x="592" y="248" width="56" height="36"/>
  </g>
  <g stroke="currentColor" stroke-width="1" fill="none" opacity="0.8">
    <line x1="178" y1="92" x2="98" y2="152"/>
    <line x1="178" y1="92" x2="258" y2="152"/>
    <line x1="98" y1="188" x2="56" y2="248"/>
    <line x1="98" y1="188" x2="140" y2="248"/>
    <line x1="258" y1="188" x2="224" y2="248"/>
    <line x1="258" y1="188" x2="292" y2="248"/>
    <line x1="498" y1="92" x2="418" y2="152"/>
    <line x1="498" y1="92" x2="578" y2="152"/>
    <line x1="418" y1="188" x2="376" y2="248"/>
    <line x1="418" y1="188" x2="460" y2="248"/>
    <line x1="578" y1="188" x2="536" y2="248"/>
    <line x1="578" y1="188" x2="620" y2="248"/>
  </g>
  <g stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="4 4" opacity="0.7">
    <path d="M162,284 V316 H240 V340"/>
    <path d="M292,284 V300 H240"/>
    <path d="M376,284 V316 H480 V340"/>
    <path d="M620,284 V300 H480"/>
  </g>
  <g font-size="15" fill="currentColor" text-anchor="middle">
    <text x="178" y="79">60</text>
    <text x="98" y="175">4</text>
    <text x="258" y="175">15</text>
    <text x="56" y="271">2</text>
    <text x="140" y="271">2</text>
    <text x="224" y="271">3</text>
    <text x="292" y="271">5</text>
    <text x="498" y="79">60</text>
    <text x="418" y="175">6</text>
    <text x="578" y="175">10</text>
    <text x="376" y="271">2</text>
    <text x="460" y="271">3</text>
    <text x="536" y="271">2</text>
    <text x="620" y="271">5</text>
  </g>
  <g font-size="12" fill="currentColor" opacity="0.8">
    <text x="162" y="46" text-anchor="middle">route one: 60 = 4 × 15</text>
    <text x="498" y="46" text-anchor="middle">route two: 60 = 6 × 10</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.3">
    <rect x="150" y="340" width="420" height="44"/>
  </g>
  <text x="360" y="367" font-size="14.5" fill="currentColor" text-anchor="middle">both routes land here: 60 = 2 · 2 · 3 · 5</text>
  <text x="360" y="400" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.75">the canonical form 2² · 3 · 5 — one destination, every route (the fundamental theorem)</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The figure is the theorem in miniature: the *branches* of a factorisation are choices, the *leaves* are not. Lesson 4.1’s sieve found the atoms; this lesson proves that atoms are all a number is made of — and that the multiset of atoms is as fixed as the number itself.',
        },
        { kind: 'heading', text: 'Counting divisors from the DNA' },
        {
          kind: 'para',
          text: 'The canonical form is not decoration; it is a counting machine. A divisor of $n = p_1^{a_1} \u22ef p_k^{a_k}$ must be built from the *same* primes — if $d \\mid n$, every prime of $d$ divides $n$, so $d = p_1^{e_1} \u22ef p_k^{e_k}$ with each exponent capped: $0 \\le e_i \\le a_i$. Conversely every such exponent choice builds a divisor (the product divides $n$ term-by-term). Different choices give different divisors — that is *uniqueness* working again, now for the $d$-side. So counting divisors is counting exponent vectors, and independent choices multiply:',
        },
        {
          kind: 'derivation',
          title: 'The divisor count τ(n) = (a₁+1)(a₂+1)···(aₖ+1)',
          statement:
            'Claim: the number of divisors of $n = p_1^{a_1} \u22ef p_k^{a_k}$ is $\\tau(n) = (a_1 + 1)(a_2 + 1) \u22ef (a_k + 1)$.',
          steps: [
            {
              label: 'Every divisor has the same prime support',
              formula: 'd \\mid n \\;\\Rightarrow\\; d = p_1^{e_1} \u22ef p_k^{e_k}, \\quad 0 \\le e_i \\le a_i',
              explanation:
                'If $q \\mid d$ and $d \\mid n$, then $q \\mid n$ (transitivity, Lesson 2.2) — so every prime of $d$ is one of $n$’s primes, and its exponent in $d$ cannot exceed its exponent in $n$.',
            },
            {
              label: 'Each exponent is a free choice in its band',
              formula: 'e_1 \\in \\{0, 1, \\dots, a_1\\} \\; (a_1 + 1 \\text{ ways}), \\quad e_2 \\in \\{0, \\dots, a_2\\}, \\; \\dots',
              explanation:
                'The choices are independent: pick all the $e_i$ and multiply out — the product divides $n$ since $e_i ≤ a_i$ throughout. Uniqueness (of $d$’s own factorisation) guarantees different vectors give different divisors — no double counting.',
            },
            {
              label: 'Multiply the counts',
              formula: '\\tau(n) = (a_1 + 1)(a_2 + 1) \u22ef (a_k + 1)',
              explanation:
                'The counting principle of FM 11 (independent choices multiply) finishes it. For $n = 1$ the empty product of primes carries the empty exponent vector: $\\tau(1) = 1$ — one divisor, itself.',
            },
          ],
          result:
            'The divisor count reads straight off the canonical exponents: add one to each, multiply. $\u03c4(100) = (2+1)(2+1) = 9$, $\u03c4(360) = (3+1)(2+1)(1+1) = 24$, $\u03c4(2025) = (4+1)(2+1) = 15$ — all certified against direct enumeration in the run’s verify script (every $n ≤ 600$).',
        },
        {
          kind: 'example',
          title: 'τ(100) both ways: the formula, then the honest list',
          steps: [
            'Split, the DNA: $100 = 2^2 \u22c5 5^2$ — exponents $(2, 2)$.',
            'Now, the formula: $(2+1)(2+1) = 9$ divisors predicted.',
            'So, enumerate honestly: $1, 2, 4, 5, 10, 20, 25, 50, 100$ — count them: nine.',
            'Take the structure check: the exponents $(e_2, e_5)$ run over $\\{0,1,2\\} \\times \\{0,1,2\\}$ — nine lattice points, one per divisor.',
            'Hence $\u03c4(100) = 9$, formula and list agreeing — and the agreement is the theorem again, one level down.',
          ],
        },
        {
          kind: 'table',
          caption: 'Canonical forms and their divisor counts — the exponents decide, the formula counts, enumeration confirms.',
          head: ['n', 'canonical form', 'τ(n) by formula', 'check'],
          rows: [
            ['60', '2² · 3 · 5', '(2+1)(1+1)(1+1) = 12', 'twelve divisors, enumerated'],
            ['84', '2² · 3 · 7', '3 · 2 · 2 = 12', 'twelve'],
            ['100', '2² · 5²', '3 · 3 = 9', 'nine'],
            ['360', '2³ · 3² · 5', '4 · 3 · 2 = 24', 'twenty-four'],
            ['2025', '3⁴ · 5²', '5 · 3 = 15', 'fifteen'],
            ['2047', '23 · 89', '2 · 2 = 4', 'four — 1, 23, 89, 2047'],
          ],
        },
        { kind: 'heading', text: 'The factorial shapes examinations bank on' },
        {
          kind: 'para',
          text: 'The last section turns the theorem on *factorials* — where the prime exponents grow so fast that listing factors is hopeless and the canonical form is the only honest bookkeeping. The question exams love: how many times does a prime $p$ divide $n!$? Write the answer $v_p(n!)$ — the **p-adic exponent** of $n!$, the exponent of $p$ in $n!$’s canonical form. Every multiple of $p$ up to $n$ donates one $p$; every multiple of $p^2$ donates a *second*; every multiple of $p^3$ a third; the donations stack:',
        },
        {
          kind: 'derivation',
          title: 'The factorial exponent (Legendre’s count)',
          statement:
            'Claim: the exponent of the prime $p$ in $n!$ is $v_p(n!) = \\left\\lfloor \\frac{n}{p} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^3} \\right\\rfloor + \\cdots$ — finite, since $p^i > n$ ends the sum.',
          steps: [
            {
              label: 'Count the single donations',
              formula: '\\left\\lfloor \\frac{n}{p} \\right\\rfloor \\text{ multiples of } p \\text{ in } 1, \\dots, n',
              explanation:
                'The products $p, 2p, 3p, \\dots$ up to $n$ each contribute at least one factor $p$ to $n!$. Their count is $\\lfloor n/p \\rfloor$ — the division algorithm reading a census.',
            },
            {
              label: 'The squares donate a second p',
              formula: '\\left\\lfloor \\frac{n}{p^2} \\right\\rfloor \\text{ multiples of } p^2',
              explanation:
                'A number like $25 = 5^2$ carries *two* fives; the first census counted one of them. The multiples of $p^2$ pay the second instalment — $\\lfloor n/p^2 \\rfloor$ of them. Likewise $p^3$ pays a third: $\\lfloor n/p^3 \\rfloor$.',
            },
            {
              label: 'Stack the censuses',
              formula: 'v_p(n!) = \\sum_{i \\ge 1} \\left\\lfloor \\frac{n}{p^i} \\right\\rfloor',
              explanation:
                'A number divisible by exactly $p^j$ (like $p^j \\cdot m$ with $p \\nmid m$) is counted exactly $j$ times — once at each level $i ≤ j$ — so the stacked census equals the true exponent. The sum is finite: $p^i > n$ contributes $\\lfloor n/p^i \\rfloor = 0$.',
            },
          ],
          result:
            'The factorial’s DNA is computed, not enumerated: $v_2(10!) = 5 + 2 + 1 = 8$, $v_5(12!) = 2$, $v_5(25!) = 5 + 1 = 6$ — the extra five at 25 hiding *inside* the square. Verified against direct factor-accumulation for every $n ≤ 200$, $p ∈ \\{2, 3, 5, 7\\}$. The verify script rebuilt $10! = 3628800 = 2^8 \u22c5 3^4 \u22c5 5^2 \u22c5 7$ and $12! = 479001600 = 2^{10} \u22c5 3^5 \u22c5 5^2 \u22c5 7 \u22c5 11$ from these exponents.',
        },
        {
          kind: 'example',
          title: 'Trailing zeros of 100! — the classic, done honestly',
          steps: [
            'Split, what makes a zero: each trailing zero of $n!$ is a factor $10 = 2 \u22c5 5$ — so the zero count is $\\min(v_2(n!), v_5(n!))$.',
            'Now, compare the supplies: $v_2(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97$ against $v_5(100!) = 20 + 4 = 24$ — twos are everywhere; fives are the bottleneck.',
            'So, the zeros equal $v_5(100!) = 24$ — the fours never bind ($v_2 ≥ v_5$ for every $n!$, swept to 500).',
            'Take the arithmetic apart: $\\lfloor 100/5 \\rfloor = 20$ multiples of five, plus $\\lfloor 100/25 \\rfloor = 4$ second donations (25, 50, 75, 100) — and $125 > 100$ closes the census.',
            'Hence $100!$ ends in exactly **24** zeros — no calculator, one formula, three lines.',
          ],
        },
        {
          kind: 'table',
          caption: 'The factorial-zero table, engine-certified: the fives decide, the twos never bind.',
          head: ['n', 'v₅(n!) — the census', 'trailing zeros of n!'],
          rows: [
            ['12', '⌊12/5⌋ = 2 (25 > 12 stops it)', '2 — 479001600 ends …00'],
            ['25', '5 + 1 = 6 (25 donates twice)', '6'],
            ['100', '20 + 4 = 24', '24'],
          ],
        },
        {
          kind: 'example',
          title: '2047 — when the Mersenne shape lies',
          steps: [
            'Split, the tempting shape: $2^{11} - 1 = 2047$ looks prime — small Mersenne numbers ($3, 7, 31, 127$) all were.',
            'Now, run the trial band: $\\lfloor\\sqrt{2047}\\rfloor = 45$; the trials $2, 3, 5, 7, 11, 13, 17, 19$ miss… and $2047 = 23 \u22c5 89$ — the ninth trial lands.',
            'So, $2047 = 23 \u22c5 89$ is composite — the canonical form, unique by the theorem, says so flatly.',
            'Take the moral: shape is not proof. Only the factorisation decides — and *that* is the fundamental theorem’s cultural weight: arithmetic’s court of final appeal is the prime list.',
            'Hence no pattern of exponents substitutes for factoring: the theorem certifies the *form* of the answer, the trial band (or Euclid’s engine) certifies the content.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Twenty-three centuries to name a theorem',
          text: 'The theorem’s pieces are ancient and its name is young. Euclid’s *Elements* carries the bricks: VII.30 (the lemma), VII.31 (every composite has a prime divisor), VII.32, and IX.14 — the least common multiple of primes is measured by no *other* prime — uniqueness in embryo. The first *full* proof of existence is credited to Kamāl al-Dīn al-Fārisī (13th–14th century Baghdad/Damascus), working on the friendly-number pairs; historians Ağargün & Özkan put it plainly: Euclid takes the first step, al-Farisi "takes the final step by actually proving the existence of a finite prime factorization." Uniqueness as we state it waited for Gauss’s *Disquisitiones Arithmeticae* (1801), article 16 — and Gauss immediately spent the theorem proving the law of quadratic reciprocity, the way this lesson will spend it on divisor counts. A theorem used before it was named: the name "fundamental theorem of arithmetic" is a nineteenth-century courtesy title for the oldest workhorse in the subject.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Three canonical shapes dominate (Khattar QA’s ch. 1 factorial/divisor scope; CAT/IPMAT): *trailing zeros* — "how many zeros end $n!$?" is $v_5(n!)$, asked at $n = 100$ (24), $n = 25$ (6), and inverted ("smallest $n$ with 100 zeros" — solve $v_5(n!) ≥ 100$ by census); *divisor counts* — $\u03c4(n)$ from the exponents, sometimes inverted ("find $n$ with exactly 15 divisors" — shapes $p^4 q^2$ or $p^{14}$; the minimal instance is $2^4 \u22c5 3^2 = 144$, swept certified); and *unknown-exponent algebra* — "if $n = 2^a 3^b$ has 12 divisors and $n$ is a square, find $a + b$" ($(a+1)(b+1) = 12$ with $a, b$ even). The lemma’s dichotomy backs the classic "prove $p ≤ a$ implies $p ≤ b$ or coprime" one-liners. What exams never ask: to *prove* the fundamental theorem — but every divisor question they ask is the theorem running in costume.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Fundamental theorem of arithmetic', def: 'Every $n ≥ 2$ is a product of primes, uniquely up to order. Existence from strong induction; uniqueness from Euclid’s lemma. Named in the 1801 Disquisitiones era, proven in pieces from Euclid onward.' },
            { term: 'Canonical form', def: '$n = p_1^{a_1} \u22ef p_k^{a_k}$ with strictly increasing primes — the unique collected dress of the factorisation; $1$ is the empty product. The number’s multiplicative DNA.' },
            { term: 'Euclid’s lemma', def: 'Prime $p$ with $p ≤ ab$ must divide $a$ or $b$ — from Bézout via the dichotomy $gcd(p, a) \u2208 \\{1, p\\}$. Composite divisors break it: $6 ≤ 2 \u22c5 9$ divides neither.' },
            { term: 'Strong induction', def: 'The variant assuming the claim for *all* values below $n$ — Lesson 1.2’s engine, the right tool when a number’s factors can sit anywhere below it.' },
            { term: 'Divisor count τ(n)', def: 'The number of divisors, $(a_1+1) \u22ef (a_k+1)$ from the canonical exponents — every exponent vector $0 ≤ e_i ≤ a_i$ builds exactly one divisor.' },
            { term: 'Empty product', def: 'The product of no factors, equal to 1 — the honest identity that lets $1$ join the theorem as the zero-prime factorisation.' },
            { term: 'p-adic exponent v_p(m)', def: 'The exponent of $p$ in $m$’s canonical form. For factorials: $v_p(n!) = \u03a3 \u230an/p^i\u230b$ (Legendre’s census) — donations stack level by level.' },
            { term: 'Trailing zeros of n!', def: 'Exactly $v_5(n!)$ — pairs of 2 and 5 make each 10, and the fives always run out first ($v_2 ≥ v_5$). The census: 12! → 2, 25! → 6, 100! → 24.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Why is 1 excluded from the primes, in the light of the fundamental theorem?',
              options: ['Because 1 has only one divisor, and admitting it would make factorisations non-unique — every number would gain infinitely many "factorisations" padded with 1s', 'Because 1 is too small to factor', 'Because 1 is a perfect square', 'Convention only — the theorem works either way'],
              answer: 0,
              explain: 'The definition demands exactly two divisors, and the payoff is uniqueness: $6 = 2 \u22c5 3$ in exactly one way. Admit 1 as prime and $6 = 1 \u22c5 2 \u22c5 3 = 1 \u22c5 1 \u22c5 2 \u22c5 3 = \u22ef$ — uniqueness dies. The theorem does *not* work either way; 1 enters as the empty product, which is unique precisely because it is empty.',
            },
            {
              q: '$6 \\mid 2 \\times 9 = 18$, yet $6 \\nmid 2$ and $6 \\nmid 9$. What does this exhibit?',
              options: ['That Euclid’s lemma needs its prime hypothesis — 6 is composite, so the implication may fail', 'That 18 is not divisible by 6', 'That 9 must be prime', 'That the fundamental theorem fails for 18'],
              answer: 0,
              explain: 'The lemma’s proof leans on $gcd(6, 2) = 2$ — not 1, not 6 — so Bézout cannot write 1 and the forcing collapses. The theorem itself is unharmed: $18 = 2 \u22c5 3^2$ still has its unique form. Composites simply lack the dichotomy that makes primes enforce their will on products.',
            },
            {
              q: 'The number $360 = 2^3 \u22c5 3^2 \u22c5 5$ has how many divisors?',
              options: ['8 — one per prime-power slot', '24 — $(3+1)(2+1)(1+1)$', '6 — one per factor in the product', '23 — one less than 360/15'],
              answer: 1,
              explain: 'Each exponent runs independently from 0 to its cap: four choices for the 2-exponent, three for the 3-exponent, two for the 5-exponent — $4 \u00d7 3 \u00d7 2 = 24$. The run’s script enumerated all 24 to confirm. The other answers confuse divisors with prime factors or pad with subtraction.',
            },
            {
              q: 'How many trailing zeros does 25! end in?',
              options: ['5 — one per multiple of five up to 25', '6 — $\u230a25/5\u230b + \u230a25/25\u230b = 5 + 1$, the square donating twice', '24 — the count for 100!', '4 — the fourth power of five'],
              answer: 1,
              explain: 'Zeros are factors of 10, and the fives are scarce: $v_5(25!) = \u230a25/5\u230b + \u230a25/25\u230b = 5 + 1 = 6$ — the multiple 25 carries *two* fives, so it pays a second donation. The twos are plentiful ($v_2(25!) = 22$), so six is the count. "One per multiple" forgets the squares; 24 is 100!’s figure.',
            },
            {
              q: '$2^{11} - 1 = 2047$ — prime or composite?',
              options: ['Prime — all small numbers of the form $2^p - 1$ are', 'Composite — $2047 = 23 \u00d7 89$; the shape proves nothing', 'Composite — $2047 = 3 \u00d7 683$', 'Neither — 2047 is a unit'],
              answer: 1,
              explain: 'The trial band ($\u230a\u221a2047\u230b = 45$) lands at the ninth trial: $23 \u22c5 89 = 2047$. Small Mersenne look-alikes ($3, 7, 31, 127$) being prime was luck, not law — the fundamental theorem’s court decides by factor list, never by shape. The $3 \u00d7 683$ option fails arithmetic ($3 \u00d7 683 = 2049$), and 2047 is composite, hence neither a unit nor anything else new.',
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
                  q: 'Factor 84 into primes and write its canonical form.',
                  solution: [
                    'Split, the least divisor: $84 = 2 \u22c5 42$.',
                    'Now, continue: $42 = 2 \u22c5 21$, then $21 = 3 \u22c5 7$, and 7 is prime.',
                    'So, the prime list: $2, 2, 3, 7$ — rebuild $2 \u22c5 2 \u22c5 3 \u22c5 7 = 84$ ✓.',
                    'Hence $84 = 2^2 \u22c5 3 \u22c5 7$ — unique by the fundamental theorem.',
                  ],
                  answer: '84 = 2² · 3 · 7',
                },
                {
                  q: 'Write 100 in canonical form.',
                  solution: [
                    'Split, the least divisors: $100 = 2 \u22c5 50 = 2 \u22c5 2 \u22c5 25$.',
                    'Now, $25 = 5 \u22c5 5$ — both prime.',
                    'So, the prime list: $2, 2, 5, 5$; rebuild $4 \u22c5 25 = 100$ ✓.',
                    'Hence $100 = 2^2 \u22c5 5^2$ — the DNA that will read out $\u03c4(100) = 9$ in Lesson 4.3’s counting.',
                  ],
                  answer: '100 = 2² · 5²',
                },
                {
                  q: 'Collect the product $2 \u22c5 3 \u22c5 3 \u22c5 5$ into canonical form and evaluate it.',
                  solution: [
                    'Split, the collection: one 2, two 3s, one 5 — order is cosmetic.',
                    'Now, the canonical dress: $2 \u22c5 3^2 \u22c5 5$.',
                    'So, the value: $2 \u22c5 9 \u22c5 5 = 90$.',
                    'Hence $2 \u22c5 3 \u22c5 3 \u22c5 5 = 90 = 2 \u22c5 3^2 \u22c5 5$ — reordering never changes the collected form, exactly the theorem’s "up to order".',
                  ],
                  answer: '2 · 3² · 5 = 90',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Factor 2025 by trial division, showing every division, and state the canonical form.',
                  solution: [
                    'Split, the trials: 2025 is odd (skip 2); digit sum 9 — divisible by 3: $2025 = 3 \u22c5 675$.',
                    'Now, keep pulling threes: $675 = 3 \u22c5 225$, $225 = 3 \u22c5 75$, $75 = 3 \u22c5 25$ — four threes.',
                    'So, 25 resists 3: pull fives — $25 = 5 \u22c5 5$. The list: $3, 3, 3, 3, 5, 5$.',
                    'Take the rebuild: $81 \u22c5 25 = 2025$ ✓.',
                    'Hence $2025 = 3^4 \u22c5 5^2$ — the year of the last great exposition of Vedic arithmetic, wearing four threes and two fives.',
                  ],
                  answer: '2025 = 3⁴ · 5²',
                },
                {
                  q: 'List all nine divisors of 100 and confirm $\u03c4(100) = 9$ by the formula.',
                  solution: [
                    'Split, the DNA: $100 = 2^2 \u22c5 5^2$ — exponents $(2, 2)$.',
                    'Now, the formula: $(2+1)(2+1) = 9$ — nine divisors predicted.',
                    'So, enumerate: $e_2 \u2208 \\{0,1,2\\}$, $e_5 \u2208 \\{0,1,2\\}$ gives $1, 2, 4, 5, 10, 20, 25, 50, 100$ — nine, no duplicates (uniqueness forbidding).',
                    'Hence $\u03c4(100) = 9$ — the lattice $3 \u00d7 3$ of exponent pairs, counted by the theorem.',
                  ],
                  answer: 'τ(100) = 9 — 1, 2, 4, 5, 10, 20, 25, 50, 100',
                },
                {
                  q: 'How many zeros end $12!$? (You may use $12! = 479001600$ to check.)',
                  solution: [
                    'Split, the census: zeros come from tens, tens from $2 \u22c5 5$; the count is $v_5(12!)$.',
                    'Now, count fives: $\\lfloor 12/5 \\rfloor = 2$ (the multiples 5 and 10); $\\lfloor 12/25 \\rfloor = 0$ — the census closes.',
                    'So, $v_5(12!) = 2$, and $v_2(12!) = 6 + 3 + 1 = 10 ≥ 2$ — the twos never bind.',
                    'Take the check: $12! = 479001600$ ends in exactly two zeros ✓.',
                    'Hence $12!$ ends in **2** zeros — the fives of 5 and 10, nothing more.',
                  ],
                  answer: '2 trailing zeros (479001600)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find the canonical form of $2047 = 2^{11} - 1$, and give the exact trial that lands.',
                  solution: [
                    'Split, the band: $\\lfloor\\sqrt{2047}\\rfloor = 45$ — trials run through the primes up to 45.',
                    'Now, the run: $2, 3, 5, 7, 11, 13, 17, 19$ all miss; the ninth trial — $2047 = 23 \u22c5 89$ — lands.',
                    'So, the cofactor: $89$ with $\\lfloor\\sqrt{89}\u230b = 9$ — the trials $2, 3, 5, 7$ miss: 89 is prime.',
                    'Hence $2047 = 23 \u22c5 89$, canonical and unique — the Mersenne shape $2^{11} - 1$ carries no immunity to factoring.',
                  ],
                  answer: '2047 = 23 · 89 (the trial p = 23 lands)',
                },
                {
                  q: 'Draw both factorisation routes of 60 (as $4 \u22c5 15$ and $6 \u22c5 10$), finish each tree, and confirm both land on the same canonical form.',
                  solution: [
                    'Split, route one: $60 = 4 \u22c5 15$; then $4 = 2 \u22c5 2$ and $15 = 3 \u22c5 5$ — leaves $2, 2, 3, 5$.',
                    'Now, route two: $60 = 6 \u22c5 10$; then $6 = 2 \u22c5 3$ and $10 = 2 \u22c5 5$ — leaves $2, 3, 2, 5$.',
                    'So, collect both: sorted, each leaf list is $2, 2, 3, 5$ — identical multisets.',
                    'Take the theorem’s voice: the convergence is *proved*, not observed — every route must land here, for 60 and for every number.',
                    'Hence both trees end in $60 = 2^2 \u22c5 3 \u22c5 5$ — the figure of this lesson, certified.',
                  ],
                  answer: 'Both routes: 2, 2, 3, 5 — canonical form 2² · 3 · 5',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Use the divisor-count formula on $360 = 2^3 \u22c5 3^2 \u22c5 5$, then verify by counting divisors from the exponent lattice.',
                  solution: [
                    'Split, the formula: $(3+1)(2+1)(1+1) = 4 \u22c5 3 \u22c5 2 = 24$.',
                    'Now, the lattice: the 2-exponent walks $\\{0,1,2,3\\}$, the 3-exponent $\\{0,1,2\\}$, the 5-exponent $\\{0,1\\}$ — $4 \u00d7 3 \u00d7 2$ vectors, each a distinct divisor (uniqueness again).',
                    'So, spot the corners: $e = (0,0,0)$ gives 1; $(3,2,1)$ gives 360 itself — the lattice spans divisor 1 to divisor n.',
                    'Take the count: twenty-four divisors — $1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360$ — the script counted them all.',
                    'Hence $\u03c4(360) = 24$, formula and enumeration in agreement.',
                  ],
                  answer: 'τ(360) = 4 · 3 · 2 = 24',
                },
                {
                  q: 'Compute the number of trailing zeros of $100!$, showing the full census.',
                  solution: [
                    'Split, the engine: zeros $= v_5(100!)$ (the fives bind; $v_2(100!) = 97 ≥ 24$).',
                    'Now, the census: $\\lfloor 100/5 \u230b = 20$ — twenty single donations; $\\lfloor 100/25 \u230b = 4$ — 25, 50, 75, 100 pay seconds; $\\lfloor 100/125 \u230b = 0$ — closed.',
                    'So, $v_5(100!) = 20 + 4 = 24$.',
                    'Hence $100!$ ends in **24** zeros — the classic census, three terms and done.',
                  ],
                  answer: '24 trailing zeros (20 + 4)',
                },
                {
                  q: 'Compute $v_2(100!)$ by Legendre’s census, and confirm the fives-and-twos comparison that leaves the zeros at 24.',
                  solution: [
                    'Split, the two-census: $\\lfloor 100/2 \u230b = 50$, $\\lfloor 100/4 \u230b = 25$, $\\lfloor 100/8 \u230b = 12$, $\\lfloor 100/16 \u230b = 6$, $\\lfloor 100/32 \u230b = 3$, $\\lfloor 100/64 \u230b = 1$, $\\lfloor 100/128 \u230b = 0$.',
                    'Now, sum: $50 + 25 + 12 + 6 + 3 + 1 = 97$ — $v_2(100!) = 97$.',
                    'So, against the fives: $97 ≥ 24$ — twos outnumber fives nearly four to one.',
                    'Take the meaning: every zero needs one of each; the fives run out first — always (swept to 500) — so zeros $= v_5 = 24$.',
                    'Hence $v_2(100!) = 97$ and the min is 24: the census explains the zeros, not just the count.',
                  ],
                  answer: 'v₂(100!) = 50+25+12+6+3+1 = 97 ≥ 24 = v₅',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove: a number has exactly three divisors if and only if it is the square of a prime. Name the first four such numbers.',
                  solution: [
                    'Split, the forward read: $n = p^2$ has canonical exponents $(2)$, so $\u03c4(n) = (2+1) = 3$ — the divisors $1, p, p^2$.',
                    'Now, the converse: $\u03c4(n) = 3$ forces the canonical form to have a single prime (two primes give $≥ 4$ divisors) with $a_1 + 1 = 3$, so $a_1 = 2$: $n = p^2$.',
                    'So, the class is exactly the prime squares — no other DNA reaches three divisors.',
                    'Take the instances: $4 = 2^2$ ($1, 2, 4$), $9 = 3^2$ ($1, 3, 9$), $25 = 5^2$ ($1, 5, 25$), $49 = 7^2$ ($1, 7, 49$).',
                    'Hence "three divisors" ⟺ prime square — the smallest class after primes themselves, swept certified to 600.',
                  ],
                  answer: 'n = p² ⟺ three divisors — 4, 9, 25, 49, …',
                },
                {
                  q: 'Find the smallest number with exactly 15 divisors, and compare the two candidate shapes.',
                  solution: [
                    'Split, the shapes: $15 = 3 \u00d7 5$ or $15 = 15 \u00d7 1$ — so the canonical form is $p^4 q^2$ (exponents 4, 2) or $p^{14}$.',
                    'Now, minimise shape one: smallest primes in the biggest seats — $2^4 \u22c5 3^2 = 16 \u22c5 9 = 144$.',
                    'So, shape two: $2^{14} = 16384$ — more than a hundred times larger.',
                    'Take the comparison: $144 < 16384$, and the sweep confirms nothing smaller than 144 carries $\u03c4 = 15$.',
                    'Hence the champion is $144 = 2^4 \u22c5 3^2$ — big exponents on small primes beat long prime lists.',
                  ],
                  answer: '144 = 2⁴ · 3² (τ = 5 · 3 = 15); the p¹⁴ rival is 16384',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove: $\u03c4(n)$ is odd if and only if $n$ is a perfect square. (The divisor-pairing argument.)',
                  solution: [
                    'Split, the pairing: for every divisor $d$ of $n$ with $d^2 ≠ n$, the partner $n/d$ is a different divisor — divisors come in pairs $\\{d, n/d\\}$.',
                    'Now, the unpaired case: $d = n/d$ happens exactly when $d^2 = n$ — a divisor sitting at the square root.',
                    'So, if $n$ is not a square, no divisor equals its partner: $\u03c4(n)$ is a sum of 2s — even. If $n = m^2$, exactly one divisor ($m$) pairs with itself: $\u03c4(n) = 2k + 1$ — odd.',
                    'Take the instance: $36$ pairs as $(1,36), (2,18), (3,12), (4,9), (6,6)$ — four pairs and the self-paired 6: nine divisors, odd, square.',
                    'Hence $\u03c4(n)$ odd $\u27fa$ $n$ is a perfect square — parity read off the pairing, no formula needed; the canonical form says the same thing ($\u03c4$ odd ⟺ all $a_i$ even).',
                  ],
                  answer: 'τ odd ⟺ n is a square (36: nine divisors — four pairs plus the self-paired 6)',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The fundamental theorem',
          latex: 'n = p_1^{a_1} p_2^{a_2} \u22ef p_k^{a_k} \\quad \\text{unique up to order; } 1 = \\text{empty product}',
          note: 'Existence: strong induction + least prime factor. Uniqueness: Euclid’s lemma (from Bézout) + cancellation. Instances: 2025 = 3⁴·5², 2047 = 23·89.',
        },
        {
          kind: 'formula',
          name: 'The divisor count',
          latex: '\\tau(n) = (a_1 + 1)(a_2 + 1) \u22ef (a_k + 1)',
          note: 'Every exponent vector 0 ≤ eᵢ ≤ aᵢ builds one divisor. τ(360) = 4·3·2 = 24; τ(2025) = 5·3 = 15; τ odd ⟺ square.',
        },
        {
          kind: 'formula',
          name: 'The factorial exponent (Legendre)',
          latex: 'v_p(n!) = \\sum_{i \\ge 1} \\left\\lfloor \\frac{n}{p^i} \\right\\rfloor',
          note: 'Donations stack: v₂(100!) = 50+25+12+6+3+1 = 97; v₅(25!) = 5+1 = 6 (25 donates twice).',
        },
        {
          kind: 'formula',
          name: 'Trailing zeros of n!',
          latex: '\\text{zeros}(n!) = v_5(n!) = \\sum_{i \\ge 1} \\left\\lfloor \\frac{n}{5^i} \\right\\rfloor',
          note: 'The fives always bind (v₂ ≥ v₅). 12! → 2; 25! → 6; 100! → 20 + 4 = 24.',
        },
      ],
    },
  ],
}
