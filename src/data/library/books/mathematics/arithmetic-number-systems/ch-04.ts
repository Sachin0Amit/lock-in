import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 4: Primes and the Fundamental
 * Theorem of Arithmetic
 *
 * LESSONS WRITTEN: 4.1 The Primes Never End: Euclid's Proof and the Sieve
 *                  4.2 The Fundamental Theorem of Arithmetic
 *                  (both: run 55 — 2026-11-05)
 *                  4.3 Divisors from DNA: Divisor Counts and Factorial Zeros
 *                  4.4 How the Primes Are Distributed
 *                  (both: run 56 — 2026-11-06)
 * CHAPTER STATUS: COMPLETE 4/4 (closed at run 56 per the owner's
 * one-full-chapter-per-run directive of 2026-11-06 — 4.3 'Divisors from
 * DNA: Divisor Counts and Factorial Zeros' (the divisor sum σ and its
 * geometric-series derivation, the perfect/abundant/deficient census
 * with the amicable pair (220, 284), the min–max proof of HCF × LCM = ab
 * with the two-number caution, the inverted τ champions swept
 * (8→24, 12→60, 15→144, 16→120, 24→360), Legendre's census cashed — the
 * 405 zero landing and the skipped counts 29/30) and 4.4 'How the Primes
 * Are Distributed' (the gap census with first occurrences and records,
 * the twin ladder to 10⁶, the 3,5,7 uniqueness proved, Bertrand's
 * postulate swept n ≤ 2000 and used as the nextPrime termination
 * certificate, the π(10^k) table with the PNT stated not claimed, Euler's
 * 1737 divergence of Σ 1/p with the 5,195,977 crossing computed) —
 * unit-4 completion review passed (exam corners 4/4, ids globally unique,
 * figures audited 0/0, verify-book2-ch04.ts extended 167 → 356 checks,
 * all green before any word was written).
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
    'The atoms of multiplication: the trichotomy that sorts every number above 1 into prime or composite, the trial-division bound and the sieve that hunt primes by machine, Euclid’s two-thousand-year-old proof that the primes never end, and the fundamental theorem — every number factors into primes in exactly one way — with existence proved by strong induction and uniqueness cashed through Bézout’s identity. Then the theorem put to work: the divisor count and divisor sum read off the canonical DNA, perfect and abundant numbers with the amicable pair (220, 284), the HCF × LCM = ab product rule proved from the exponents, the inverted census problems (the champions 60, 144, 360; the 405 zero landing; the skipped zero counts) — and the primes’ own scatter measured: gaps and records, twin primes with the unique 3, 5, 7, Bertrand’s doubling guarantee, the π(10^k) table under the prime number theorem’s shadow, and Euler’s 1737 divergence of Σ 1/p.',
  status: 'complete',
  plannedLessons: [],
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
              explain: 'Each exponent runs independently from 0 to its cap: four choices for the 2-exponent, three for the 3-exponent, two for the 5-exponent — $4 × 3 × 2 = 24$. The run’s script enumerated all 24 to confirm. The other answers confuse divisors with prime factors or pad with subtraction.',
            },
            {
              q: 'How many trailing zeros does 25! end in?',
              options: ['5 — one per multiple of five up to 25', '6 — $\u230a25/5\u230b + \u230a25/25\u230b = 5 + 1$, the square donating twice', '24 — the count for 100!', '4 — the fourth power of five'],
              answer: 1,
              explain: 'Zeros are factors of 10, and the fives are scarce: $v_5(25!) = \u230a25/5\u230b + \u230a25/25\u230b = 5 + 1 = 6$ — the multiple 25 carries *two* fives, so it pays a second donation. The twos are plentiful ($v_2(25!) = 22$), so six is the count. "One per multiple" forgets the squares; 24 is 100!’s figure.',
            },
            {
              q: '$2^{11} - 1 = 2047$ — prime or composite?',
              options: ['Prime — all small numbers of the form $2^p - 1$ are', 'Composite — $2047 = 23 × 89$; the shape proves nothing', 'Composite — $2047 = 3 × 683$', 'Neither — 2047 is a unit'],
              answer: 1,
              explain: 'The trial band ($\u230a\u221a2047\u230b = 45$) lands at the ninth trial: $23 \u22c5 89 = 2047$. Small Mersenne look-alikes ($3, 7, 31, 127$) being prime was luck, not law — the fundamental theorem’s court decides by factor list, never by shape. The $3 × 683$ option fails arithmetic ($3 × 683 = 2049$), and 2047 is composite, hence neither a unit nor anything else new.',
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
                    'Hence $\u03c4(100) = 9$ — the lattice $3 × 3$ of exponent pairs, counted by the theorem.',
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
                    'Now, the lattice: the 2-exponent walks $\\{0,1,2,3\\}$, the 3-exponent $\\{0,1,2\\}$, the 5-exponent $\\{0,1\\}$ — $4 × 3 × 2$ vectors, each a distinct divisor (uniqueness again).',
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
                    'Split, the shapes: $15 = 3 × 5$ or $15 = 15 × 1$ — so the canonical form is $p^4 q^2$ (exponents 4, 2) or $p^{14}$.',
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
    {
      id: 'ans-divisors-from-dna-divisor-counts',
      number: '4.3',
      title: 'Divisors from DNA: Divisor Counts and Factorial Zeros',
      prerequisites: ['ans-fundamental-theorem-of-arithmetic', 'ans-the-algebra-of-divisibility', 'fm-hcf-lcm-and-how-they-relate'],
      sources: ['euclid-ix-36-perfect-numbers', 'nicomachus-perfect-abundant-deficient', 'amicable-pythagoreans-thabit-al-farisi', 'khattar-qa-4e'],
      concepts: [
        'The divisor sum σ(n)',
        'The geometric-series identity',
        'Perfect, abundant, deficient',
        'The first amicable pair (220, 284)',
        'HCF × LCM = ab',
        'Inverted divisor-count champions',
        'The 405 zero landing',
        'Skipped zero counts',
      ],
      objectives: [
        'Derive and apply the divisor sum $\\sigma(n) = \\prod \\frac{p^{a+1} - 1}{p - 1}$ from the canonical form, and certify it against honest enumeration',
        'Classify every number as perfect, abundant or deficient by comparing $\\sigma(n)$ with $2n$, and verify the amicable pair $(220, 284)$ from the canonical forms',
        'Re-derive the $\\operatorname{HCF} \\times \\operatorname{LCM} = ab$ product rule from the min–max exponent identity, and state exactly where the rule’s two-number scope ends',
        'Solve the inverted census problems — the smallest number with exactly $k$ divisors, the smallest factorial carrying a given zero count — by shape analysis plus honest sweeps',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.2 ended with the canonical form as a *reading machine*: $\\tau(n)$ and the trailing zeros of $n!$ both fell out of the exponents. This lesson presses the machine for everything examinations ask of it. The canonical form $n = p_1^{a_1} \u22ef p_k^{a_k}$ is the number’s DNA — and from that DNA one reads not only how many divisors $n$ has but what they *sum to*, which pairs of numbers share their divisors’ affection, why the highest-common-factor and lowest-common-multiple of two numbers multiply to exactly $ab$, and how the factorial census of Lesson 4.2 turns around to answer questions asked backwards.',
        },
        {
          kind: 'para',
          text: 'The operational half of this story is old news, banked in Foundation Mathematics: FM 3.2 factorised numbers, FM 3.3 ran Euclid’s algorithm for the HCF, FM 3.5 banked the shortcut $\\operatorname{HCF} \\times \\operatorname{LCM} = ab$ *as a fact to use*. What FM banked as fact, this lesson proves — the product rule will come out of the exponent algebra in three lines. The new machinery is one identity (the geometric series) and one habit (sweeping a claim against every number up to a bound before printing it). Every number in this lesson has been recomputed by the run’s verify script before a word was written; the sweeps are cited where they carry a claim.',
        },
        { kind: 'heading', text: 'The divisor sum σ(n)' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The divisor sum σ(n)',
          text: 'For a natural number $n$, the **divisor sum** $\\sigma(n)$ is the sum of all positive divisors of $n$: $\\sigma(n) = \\sum_{d \\mid n} d$. Thus $\\sigma(1) = 1$, $\\sigma(6) = 1 + 2 + 3 + 6 = 12$, $\\sigma(15) = 1 + 3 + 5 + 15 = 24$. Writing $s(n) = \\sigma(n) - n$ for the sum of the *proper* divisors (all divisors except $n$ itself) will pay off in the next section.',
        },
        {
          kind: 'para',
          text: 'Listing and adding divisors works, and for small numbers it is honest work — but the canonical form does better, the same way it did for $\\tau$. A divisor of $n = p_1^{a_1} \u22ef p_k^{a_k}$ is a lattice point: an exponent vector $(e_1, \u22ef, e_k)$ with $0 \\le e_i \\le a_i$, naming the divisor $p_1^{e_1} \u22ef p_k^{e_k}$ (Lesson 4.2’s counting argument, one level down). Summing over the whole lattice is summing over independent coordinates — so the total factors into per-coordinate sums, and each coordinate sum is a geometric series:',
        },
        {
          kind: 'derivation',
          title: 'The divisor sum: σ(n) = ∏ (p^(a+1) − 1)/(p − 1)',
          statement:
            'Claim: for $n = p_1^{a_1} \u22ef p_k^{a_k}$, $\\sigma(n) = \\prod_{i=1}^{k} \\left(1 + p_i + p_i^2 + \u22ef + p_i^{a_i}\\right) = \\prod_{i=1}^{k} \\frac{p_i^{a_i + 1} - 1}{p_i - 1}$.',
          steps: [
            {
              label: 'Sum over the lattice, coordinate by coordinate',
              formula: '\\sigma(n) = \\sum_{e_1 = 0}^{a_1} \u22ef \\sum_{e_k = 0}^{a_k} p_1^{e_1} \u22ef p_k^{e_k}',
              explanation:
                'Every divisor appears exactly once — that was Lesson 4.2’s uniqueness, working for the $d$-side — so the sum is the sum of all lattice-point values.',
            },
            {
              label: 'The multiple sum factors into independent sums',
              formula: '= \\left(\\sum_{e_1 = 0}^{a_1} p_1^{e_1}\\right) \u22ef \\left(\\sum_{e_k = 0}^{a_k} p_k^{e_k}\\right)',
              explanation:
                'The exponent coordinates are independent, so the product of sums equals the sum of products — the distributive law in full generality, the counting principle of FM 11 turned into an adding principle.',
            },
            {
              label: 'Each coordinate sum is a geometric series',
              formula: '1 + p + p^2 + \u22ef + p^a = \\frac{p^{a+1} - 1}{p - 1}',
              explanation:
                'Multiply the sum by $(p - 1)$ and watch it telescope: $(p - 1)(1 + p + \u22ef + p^a) = p^{a+1} - 1$. The identity holds for every prime $p$ and every exponent $a \\ge 0$ — swept in the verify script for $p \\in \\{2, 3, 5, 7, 11, 13\\}$, $a \\le 8$.',
            },
          ],
          result:
            'The divisor sum reads straight off the DNA: for each prime, take $1 + p + \u22ef + p^a$, and multiply the per-prime totals. $\\sigma(100) = (1 + 2 + 4)(1 + 5 + 25) = 7 \u22c5 31 = 217$, certified against the nine-divisor enumeration $1 + 2 + 4 + 5 + 10 + 20 + 25 + 50 + 100 = 217$ — and the whole formula agrees with direct enumeration for every $n \\le 600$ in the run’s sweep.',
        },
        {
          kind: 'example',
          title: 'σ(100) both ways: the formula, then the honest list',
          steps: [
            'Split, the DNA: $100 = 2^2 \u22c5 5^2$ — two primes, exponents $(2, 2)$.',
            'Now, the two-series: $1 + 2 + 4 = 7$ on the twos; $1 + 5 + 25 = 31$ on the fives.',
            'So, the product: $7 \u22c5 31 = 217$ — the divisor sum predicted.',
            'Take the enumeration: $1, 2, 4, 5, 10, 20, 25, 50, 100$ — add: $217$. The formula and the list agree.',
            'Hence $\\sigma(100) = 217$ — and the agreement is not luck: the lattice *is* the list, arranged by exponent instead of by size.',
          ],
        },
        {
          kind: 'table',
          caption: 'The divisor sum across the chapter’s running instances — the per-prime series multiply, and enumeration confirms every row.',
          head: ['n', 'canonical form', 'σ(n) as a product of series', 'σ(n)', 'enumerated'],
          rows: [
            ['60', '2² · 3 · 5', '(1+2+4)(1+3)(1+5) = 7 · 4 · 6', '168', '168 ✓'],
            ['84', '2² · 3 · 7', '7 · 4 · 8', '224', '224 ✓'],
            ['72', '2³ · 3²', '(1+2+4+8)(1+3+9) = 15 · 13', '195', '195 ✓'],
            ['100', '2² · 5²', '7 · 31', '217', '217 ✓'],
            ['360', '2³ · 3² · 5', '15 · 13 · 6', '1170', '1170 ✓'],
            ['2025', '3⁴ · 5²', '(3⁵−1)/2 · (5³−1)/4 = 121 · 31', '3751', '3751 ✓'],
            ['2047', '23 · 89', '(1+23)(1+89) = 24 · 90', '2160', '2160 ✓'],
          ],
        },
        {
          kind: 'figure',
          caption:
            'The divisor lattice of 72 = 2³ · 3²: twelve divisors sit in a 4 × 3 grid — the row is the 2-exponent, the column is the 3-exponent. Summing each row gives 13, 26, 52, 104; summing each column gives 15, 45, 135; both margins total 195 = σ(72) = (1+2+4+8)(1+3+9). The formula is the grid read along either edge.',
          svg: `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The twelve divisors of 72 arranged in a four by three lattice with row sums 13 26 52 104 and column sums 15 45 135 totalling 195">
  <text x="280" y="26" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.85">the divisor lattice of 72 = 2³ · 3² — σ(72) is the grand total</text>
  <g font-size="12" fill="currentColor" opacity="0.7" text-anchor="middle">
    <text x="92" y="50">3⁰ = 1</text>
    <text x="162" y="50">3¹ = 3</text>
    <text x="232" y="50">3² = 9</text>
  </g>
  <g font-size="12" fill="currentColor" opacity="0.7" text-anchor="end">
    <text x="52" y="81">2⁰ = 1</text>
    <text x="52" y="121">2¹ = 2</text>
    <text x="52" y="161">2² = 4</text>
    <text x="52" y="201">2³ = 8</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.75">
    <rect x="60" y="60" width="64" height="32"/><rect x="130" y="60" width="64" height="32"/><rect x="200" y="60" width="64" height="32"/>
    <rect x="60" y="100" width="64" height="32"/><rect x="130" y="100" width="64" height="32"/><rect x="200" y="100" width="64" height="32"/>
    <rect x="60" y="140" width="64" height="32"/><rect x="130" y="140" width="64" height="32"/><rect x="200" y="140" width="64" height="32"/>
    <rect x="60" y="180" width="64" height="32"/><rect x="130" y="180" width="64" height="32"/><rect x="200" y="180" width="64" height="32"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="92" y="81">1</text><text x="162" y="81">3</text><text x="232" y="81">9</text>
    <text x="92" y="121">2</text><text x="162" y="121">6</text><text x="232" y="121">18</text>
    <text x="92" y="161">4</text><text x="162" y="161">12</text><text x="232" y="161">36</text>
    <text x="92" y="201">8</text><text x="162" y="201">24</text><text x="232" y="201">72</text>
  </g>
  <g font-size="13" fill="currentColor" opacity="0.9" text-anchor="start">
    <text x="300" y="81">Σ = 13</text>
    <text x="300" y="121">Σ = 26</text>
    <text x="300" y="161">Σ = 52</text>
    <text x="300" y="201">Σ = 104</text>
  </g>
  <g font-size="13" fill="currentColor" opacity="0.9" text-anchor="middle">
    <text x="92" y="232">Σ = 15</text>
    <text x="162" y="232">Σ = 45</text>
    <text x="232" y="232">Σ = 135</text>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="start">
    <text x="300" y="232">either margin: 195</text>
  </g>
  <text x="280" y="258" font-size="14" fill="currentColor" text-anchor="middle" font-weight="600">σ(72) = 15 · 13 = 195 — the grid totalled along the rows or along the columns</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'σ splits across coprime factors — and only those',
          text: 'The product formula says more than “here is a shortcut”: it says $\\sigma$ is **multiplicative on coprime arguments**. If $\\gcd(a, b) = 1$, their DNAs share no prime, so $\\sigma(ab) = \\sigma(a)\\,\\sigma(b)$ — the series never interact. The engine checks it everywhere it can see: $\\sigma(8)\u03c3(9) = 15 \u22c5 13 = 195 = \\sigma(72)$, and every coprime pair with product $\\le 600$ agrees in the sweep. When the factors *do* share primes the split fails — $\\sigma(4)\u03c3(3) = 7 \u22c5 4 = 28$ but $\\sigma(12) = 28$ here only because $4$ and $3$ were coprime; $\\sigma(4)\u03c3(4) = 49 \u2260 \\sigma(16) = 31$. The formula never lies because it never needs the split: it always reads the *collected* DNA.',
        },
        { kind: 'heading', text: 'Perfect, abundant, deficient' },
        {
          kind: 'para',
          text: 'The divisor sum invites a comparison as old as Greek arithmetic: how does $\\sigma(n)$ compare with $2n$ — that is, do a number’s divisors, with the number itself included, outweigh the number twice over? Equivalently (subtract $n$ from both sides): do the *proper* divisors sum to more than $n$, less than $n$, or exactly $n$? The three outcomes name three families:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Perfect, abundant, deficient',
          text: 'A number $n \\ge 2$ is said to be **perfect** if $\\sigma(n) = 2n$ — its proper divisors sum to exactly $n$. It is **abundant** if $\\sigma(n) > 2n$ — the proper divisors oversum. It is **deficient** if $\\sigma(n) < 2n$ — they undersum. Every number lands in exactly one family (the sweep certifies the partition through 600); $1$ is deficient by convention ($\\sigma(1) = 1 < 2$).',
        },
        {
          kind: 'para',
          text: 'The primes are all deficient, instantly: $\\sigma(p) = 1 + p < 2p$. So is every prime power beyond the borderline — the divisor list is too short. The interesting families start at the highly divisible composites:',
        },
        {
          kind: 'table',
          caption: 'The σ vs 2n test, row by row — the engine’s verdicts on the chapter’s running instances plus the four historic numbers.',
          head: ['n', 'canonical form', 'σ(n)', '2n', 'verdict'],
          rows: [
            ['6', '2 · 3', '12', '12', 'perfect — 1+2+3 = 6 exactly'],
            ['12', '2² · 3', '28', '24', 'abundant — 1+2+3+4+6 = 16 > 12'],
            ['15', '3 · 5', '24', '30', 'deficient'],
            ['28', '2² · 7', '56', '56', 'perfect — 1+2+4+7+14 = 28'],
            ['100', '2² · 5²', '217', '200', 'abundant'],
            ['220', '2² · 5 · 11', '504', '440', 'abundant'],
            ['284', '2² · 71', '504', '568', 'deficient — yet see below'],
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Nicomachus sorts the even numbers, c. AD 100',
          text: 'The three-way classification is ancient. Nicomachus of Gerasa — the same *Introduction to Arithmetic* that preserved the sieve’s name in Lesson 4.1 — devotes a chapter of Book I to sorting the even numbers into the **perfect** (he says they correspond to a mean), the **superabundant**, and the **deficient**, with the even-perfect list 6, 28, 496, 8128 already before him. Nicomachus also *claimed* patterns that fail — he guessed there is one perfect number per digit-length and that they all end in 6 or 8 alternately. Both guesses are false (the fifth perfect, 33,550,336, breaks the rhythm), and the failure is instructive: the classification is a theorem-shaped habit of mind, but only the sweep and the proof decide. The even-perfect form itself is genuinely Euclid’s: Elements IX.36 proves that whenever $1 + 2 + 4 + \u22ef + 2^{p-1}$ is prime, the product of that sum with its last term is perfect — in modern dress, $2^{p-1}(2^p - 1)$ is perfect whenever $2^p - 1$ is prime. The instances: $p = 2, 3, 5, 7$ give $6, 28, 496, 8128$, each rebuilt in the verify script. Whether any *odd* perfect number exists is open to this day — nobody has ever found one, and none exists below the search bounds of many millions of digits.',
        },
        {
          kind: 'example',
          title: 'The first amicable pair: 220 and 284, each the other’s proper-divisor sum',
          steps: [
            'Split, the DNAs: $220 = 2^2 \u22c5 5 \u22c5 11$ and $284 = 2^2 \u22c5 71$.',
            'Now, the first sum: $\\sigma(220) = (1+2+4)(1+5)(1+11) = 7 \u22c5 6 \u22c5 12 = 504$.',
            'So, the second sum: $\\sigma(284) = (1+2+4)(1+71) = 7 \u22c5 72 = 504$ — the same total.',
            'Take the proper sums: $s(220) = 504 - 220 = 284$ and $s(284) = 504 - 284 = 220$ — each number is exactly the sum of the other’s proper divisors.',
            'Hence 220 and 284 form an **amicable pair** — the engine re-lists 220’s proper divisors $1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110$, sums them to 284, and confirms the friendship both ways.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A friendship two thousand years deep',
          text: 'The pair $(220, 284)$ is the smallest amicable pair and the only one known to the ancient Greeks — the Pythagorean tradition knew it and read it as a symbol of friendship. Nothing further turned up for over a millennium: around AD 850 the Baghdad mathematician **Thābit ibn Qurra** proved a general rule that manufactures amicable pairs (his rule regenerates 220/284 and produced the next known pair), and the thirteenth-century **al-Fārisī** — the very mathematician Lesson 4.2 credited with the first full existence proof of prime factorisation — sharpened the same amicable-number machinery. The amicable story and the fundamental-theorem story share a workshop: both grew out of divisor sums, centuries before either had a modern statement. Today tens of millions of amicable pairs are catalogued; whether infinitely many exist is open.',
        },
        {
          kind: 'para',
          text: 'How common is each family? The engine swept all of $1$ to $600$: **452 deficient, 145 abundant, 3 perfect** ($6$, $28$, $496$). Deficiency is the default; abundance needs a number with enough small prime factors. The smallest abundant number is $12$ — nothing below it oversums — and the early abundant run reads $12, 18, 20, 24, 30, 36, 40, \u22ef$. Abundance is sticky in one direction: *every multiple of 6 beyond 6 is abundant* — swept through 600. The clean reason covers the coprime case instantly: if $\\gcd(k, 6) = 1$ then $\\sigma(6k) = \\sigma(6)\\sigma(k) = 12\\sigma(k) \\ge 12(k + 1) > 12k = 2·6k$, and the mixed cases (like $12$ and $18$ themselves) fall to direct checks — the sweep covers what the clean argument does not.',
        },
        { kind: 'heading', text: 'HCF × LCM = ab, from the exponents' },
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 3.5 banked the shortcut as an operational fact: for two numbers $a$ and $b$, the highest common factor times the lowest common multiple equals the product $ab$. This book now proves it — and the proof is three lines of exponent arithmetic. Write the canonical forms side by side. A prime that divides $a$ but not $b$ has exponent $(\\alpha, 0)$ in the pair; a shared prime has $(\\alpha, \\beta)$. The HCF takes the **minimum** of the two exponents (the most each prime is *commonly* allowed), and the LCM takes the **maximum** (the most either number needs). And for every pair of integers, the minimum plus the maximum is the sum:',
        },
        {
          kind: 'derivation',
          title: 'The min–max identity and the product rule',
          statement:
            'Claim: for $a = \\prod p^{\\alpha_i}$ and $b = \\prod p^{\\beta_i}$ (exponents $\\ge 0$, possibly zero), $\\operatorname{HCF}(a, b) · \\operatorname{LCM}(a, b) = ab$.',
          steps: [
            {
              label: 'Read the two DNAs on a common prime list',
              formula: 'a = \\prod p^{\\alpha_i}, \\quad b = \\prod p^{\\beta_i}, \\qquad \\alpha_i, \\beta_i \\ge 0',
              explanation:
                'Uniqueness (Lesson 4.2) lets both numbers wear their canonical forms on the *same* prime list, padding missing primes with exponent 0 — $8 = 2^3$ becomes $8 = 2^3 · 3^0$ next to $9 = 2^0 · 3^2$.',
            },
            {
              label: 'HCF takes minima, LCM takes maxima',
              formula: '\\operatorname{HCF} = \\prod p^{\\min(\\alpha_i, \\beta_i)}, \\qquad \\operatorname{LCM} = \\prod p^{\\max(\\alpha_i, \\beta_i)}',
              explanation:
                'A common divisor carries each prime no more times than *either* number does — the minimum. A common multiple carries each prime at least as often as *either* number needs — the maximum. Lesson 2.2’s divisibility algebra says exactly this.',
            },
            {
              label: 'Add the exponents: min + max = sum',
              formula: '\\min(\\alpha_i, \\beta_i) + \\max(\\alpha_i, \\beta_i) = \\alpha_i + \\beta_i',
              explanation:
                'Whichever exponent is smaller, the other is larger — the two together always total $\\alpha_i + \\beta_i$ (the verify script sweeps all $169$ pairs up to 12). Multiplying the two products therefore multiplies the sums of exponents term by term:',
            },
            {
              label: 'Conclude the product rule',
              formula: '\\operatorname{HCF} · \\operatorname{LCM} = \\prod p^{\\alpha_i + \\beta_i} = \\left(\\prod p^{\\alpha_i}\\right)\\left(\\prod p^{\\beta_i}\\right) = ab',
              explanation:
                'The rule is the exponent identity worn as arithmetic. It holds for exactly two numbers — see the caution below.',
            },
          ],
          result:
            '$\\operatorname{HCF}(a, b) · \\operatorname{LCM}(a, b) = ab$ — proved from the DNA, certified by the engine for every pair $a, b \\le 300$. Instance: $12 = 2^2 · 3^1$ against $18 = 2^1 · 3^2$ gives HCF $= 2 · 3 = 6$, LCM $= 2^2 · 3^2 = 36$, and $6 · 36 = 216 = 12 · 18$.',
        },
        {
          kind: 'example',
          title: 'The product rule as a finder: HCF 13, LCM 455, one number 65 — find the other',
          steps: [
            'Split, the rule: $\\operatorname{HCF} · \\operatorname{LCM} = ab$, so $b = \\operatorname{HCF} · \\operatorname{LCM} / a = 13 · 455 / 65$.',
            'Now, the arithmetic: $13 · 455 = 5915$, and $5915 / 65 = 91$.',
            'So, verify from the DNA: $65 = 5 · 13$, $91 = 7 · 13$ — the common factor is $13$ ✓, the union is $5 · 7 · 13 = 455$ ✓.',
            'Take the check: $65 · 91 = 5915 = 13 · 455$ — the product rule closes both ways.',
            'Hence the missing number is **91** — and the verification is the derivation rehearsed on the answer.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The rule is a two-number rule',
          text: 'Adding a third number breaks the pattern, and the smallest example shows it: for $2, 3, 4$ the HCF is $1$ and the LCM is $12$, so HCF $\\times$ LCM $= 12$, but $2 · 3 · 4 = 24$. The reason is visible in the exponents: with three numbers, $\\min$ of three exponents plus $\\max$ of three exponents need not equal the sum of all three — for $2, 3, 4$ the prime $2$ has exponents $(1, 0, 2)$: $\\min 0 + \\max 2 = 2 \\ne 3$. No product formula survives for three or more numbers; only the two-number case has the pairing.',
        },
        { kind: 'heading', text: 'The inverted τ problems' },
        {
          kind: 'para',
          text: 'Lesson 4.2’s divisor count runs forward: given the DNA, read off $\\tau(n)$. Examinations run it *backwards*: given $\\tau(n) = k$, find — usually, minimise — $n$. The backward direction is shape analysis. Since $\\tau(n) = (a_1 + 1)(a_2 + 1) \u22ef (a_k + 1)$, the number $k$ must be *factored into factors each at least 2*, and each factorisation pattern is a canonical shape:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$k = 12$ factors as $12 = 12$ (one prime: shape $p^{11}$), $12 = 6 · 2$ (shape $p^5 q$), $12 = 4 · 3$ (shape $p^3 q^2$), $12 = 3 · 2 · 2$ (shape $p^2 q r$) — four shapes, no others;',
            'each shape gives a family of numbers, one per choice of primes;',
            'the smallest member puts the **largest exponent on the smallest prime** — big exponents ride small primes;',
            'comparing the best instance of each shape decides the champion.',
          ],
        },
        {
          kind: 'example',
          title: 'Find the smallest number with exactly 12 divisors',
          steps: [
            'Split, the shapes: $12 = 12$, $6 · 2$, $4 · 3$, $3 · 2 · 2$ — shapes $p^{11}$, $p^5 q$, $p^3 q^2$, $p^2 q r$.',
            'Now, dress each shape minimally: $p^{11} \\to 2^{11} = 2048$; $p^5 q \\to 2^5 · 3 = 96$; $p^3 q^2 \\to 2^3 · 3^2 = 72$; $p^2 q r \\to 2^2 · 3 · 5 = 60$.',
            'So, compare: $60 < 72 < 96 < 2048$ — the four-prime shape wins despite carrying the smallest exponents.',
            'Take the sweep: the engine checked every $n < 60$ — none carries twelve divisors (the nearest rivals $48$ with $10$ and $40$ with $8$ confirm the gap).',
            'Hence **60** is the champion: $\\tau(60) = (2+1)(1+1)(1+1) = 12$ — big exponents on small primes, but a wide prime base beats tall towers.',
          ],
        },
        {
          kind: 'table',
          caption: 'The inverted champions, swept: for each target k the smallest number with exactly k divisors — the shapes compared, the winner certified by first occurrence.',
          head: ['k', 'the shapes of k', 'best instance of each', 'champion'],
          rows: [
            ['8', '8; 4·2; 2·2·2', '128; 24; 30', '24 = 2³ · 3'],
            ['12', '12; 6·2; 4·3; 3·2·2', '2048; 96; 72; 60', '60 = 2² · 3 · 5'],
            ['15', '15; 5·3', '16384; 144', '144 = 2⁴ · 3²'],
            ['16', '16; 8·2; 4·4; 4·2·2; 2·2·2·2', '32768; 384; 216; 120; 210', '120 = 2³ · 3 · 5'],
            ['24', '24; 12·2; 8·3; 6·4; 6·2·2; 4·3·2; 3·2·2·2', '8388608; 6144; 1152; 864; 480; 360; 420', '360 = 2³ · 3² · 5'],
          ],
        },
        {
          kind: 'para',
          text: 'Two habits make the inverted problems safe. First, *enumerate the factorisations of $k$ completely* — missing the pattern $4 · 3$ in $k = 12$ would miss the eventual champion’s family; the trap is thinking only in two factors. Second, *sweep, don’t trust*: the engine certified each champion as the first occurrence of its divisor count up to 2000, because the “big exponents ride small primes” principle decides between *dressed* shapes but the full minimum needs every small number checked — that is what the sweep is for. The same two habits carry the next section, where the census runs backwards on factorials.',
        },
        { kind: 'heading', text: 'The factorial census, cashed' },
        {
          kind: 'para',
          text: 'Lesson 4.2 built Legendre’s census $v_p(n!) = \\left\\lfloor n/p \\right\\rfloor + \\left\\lfloor n/p^2 \\right\\rfloor + \u22ef$ and used it forward: count the zeros of a given factorial. The examination’s favourite move is the *inversion* — start from the zero count and ask for the factorial. Two inversions dominate. The first is a search: find the smallest $n$ whose factorial carries at least $K$ zeros. The census is a non-decreasing step function of $n$, climbing by $v_p(m)$ at each new $m$ — so the search is a short walk uphill, and the honest finish is checking the *landing* is exact.',
        },
        {
          kind: 'example',
          title: 'Find the smallest n whose factorial ends in at least 100 zeros',
          steps: [
            'Split, the engine: zeros $= v_5(n!)$ (the twos never bind — Lesson 4.2’s swept fact), so the question is the smallest $n$ with $v_5(n!) \\ge 100$.',
            'Now, the census at 400: $\\lfloor 400/5 \\rfloor = 80$, $\\lfloor 400/25 \\rfloor = 16$, $\\lfloor 400/125 \\rfloor = 3$ — total $99$. One five short.',
            'So, walk uphill: $401, 402, 403, 404$ carry no five — $v_5(404!) = 99$ still. Then $405 = 5 · 81$ donates exactly one five: $v_5(405!) = 81 + 16 + 3 = 100$.',
            'Take the landing: the hundredth five lands *exactly* at 405 — not past it. $405!$ ends in precisely 100 zeros.',
            'Hence the smallest such $n$ is **405** — the sweep confirms no smaller factorial reaches 100, and the census shows why the answer is exact rather than a bound.',
          ],
        },
        {
          kind: 'para',
          text: 'The second inversion is the trap-question: *does any factorial end in exactly $K$ zeros?* The census climbs by more than one at multiples of $5^2$, so some counts are **skipped** entirely. The classic: at $n = 125 = 5^3$, the new term donates three fives at once — $v_5(124!) = 24 + 4 = 28$ but $v_5(125!) = 25 + 5 + 1 = 31$. The counts $29$ and $30$ are never achieved: no factorial ends in exactly 29 or exactly 30 zeros (swept to 600, and the pattern repeats past every power of five). A “closest factorial” answer must respect the skips — the census, not the intuition, decides which zero counts exist.',
        },
        {
          kind: 'table',
          caption: 'The cashed census — forward counts and inverted answers, every value engine-recomputed this run.',
          head: ['question', 'the census work', 'answer'],
          rows: [
            ['highest power of 3 in 300!', '100 + 33 + 11 + 3 + 1', '3¹⁴⁸ divides 300!, 3¹⁴⁹ does not'],
            ['highest power of 7 in 3000!', '428 + 61 + 8 + 1 (7⁴ = 2401 closes it)', '7⁴⁹⁸'],
            ['zeros of 200!', '40 + 8 + 1', '49'],
            ['smallest n! with ≥ 100 zeros', '99 at 404, +1 at 405 = 5 · 81', 'n = 405, exactly 100 zeros'],
            ['factorials with exactly 29 zeros', 'the jump 28 → 31 at 125', 'none — the count is skipped'],
          ],
        },
        {
          kind: 'algorithm',
          title: 'The census pipeline: τ, σ and the zeros, from the DNA',
          lines: [
            { code: 'factor n into its canonical form n = p₁^a₁ · p₂^a₂ · … · p_k^a_k' },
            { code: 'for the count τ(n): multiply (a₁ + 1)(a₂ + 1) · … · (a_k + 1)' },
            { code: 'for the sum σ(n): for each prime build 1 + p + … + p^a = (p^(a+1) − 1)/(p − 1), then multiply', note: 'the per-prime series — the lattice, summed' },
            { code: 'for HCF/LCM of a and b: HCF takes min exponents, LCM takes max; HCF · LCM = ab' },
            { code: 'for factorials: skip factoring — run Legendre’s census v_p(n!) = Σ ⌊n/pⁱ⌋' },
            { code: 'inverted questions: factor k into (a₁+1)(a₂+1)…, dress big exponents on small primes, then sweep' },
          ],
          note: 'One pipeline, six exits — every block-type of this lesson is an exit. The sweep is not decoration: it is the difference between a plausible answer and a certified one.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Five shapes carry nearly all the marks (Khattar QA ch. 1’s divisor scope; CAT/IPMAT/SSC staples). *σ comparisons*: “arrange $n$ by divisor sum” or “show $\\sigma$ of $p^a$” — the series product answers without listing. *Abundant/deficient labels*: classify a given $n$ by $\\sigma$ vs $2n$ — 12 abundant, 15 deficient, 6 perfect are the drill values. *The product rule*: given any three of HCF, LCM, $a$, $b$, find the fourth — $\\operatorname{HCF} · \\operatorname{LCM} = ab$ ($6 · 36 = 12 · 18$; the $13/455/65 \\to 91$ shape recurs); the trap is applying it to three numbers. *τ-inverted*: “find the smallest $n$ with exactly $k$ divisors” ($k = 12 \\to 60$, $k = 15 \\to 144$, $k = 24 \\to 360$) — the marks live in the complete shape list. *Zero inversions*: “smallest $n$ with $\\ge 100$ zeros” ($405$), “does any $n!$ have exactly 30 zeros” (no — skipped). What exams never ask: to *prove* the geometric identity — but every answer above is that identity running in costume.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Divisor sum σ(n)', def: 'The sum of all positive divisors, $\\sigma(n) = \\prod \\frac{p^{a+1} - 1}{p - 1}$ from the canonical form — the divisor lattice, totalled. $\\sigma(100) = 7 \u22c5 31 = 217$.' },
            { term: 'Perfect number', def: '$\\sigma(n) = 2n$ exactly — the proper divisors sum to $n$. The even-perfect form is $2^{p-1}(2^p - 1)$ with $2^p - 1$ prime (Euclid IX.36): 6, 28, 496, 8128, … No odd perfect number is known.' },
            { term: 'Abundant number', def: '$\\sigma(n) > 2n$. The smallest is 12; the run begins 12, 18, 20, 24, 30. Every multiple of 6 beyond 6 is abundant (swept to 600; the coprime case is $\\sigma(6k) = 12\\sigma(k) > 12k$).' },
            { term: 'Deficient number', def: '$\\sigma(n) < 2n$ — the default family: 452 of the first 600 numbers. Every prime is deficient ($\\sigma(p) = p + 1$).' },
            { term: 'Amicable pair', def: 'Two numbers, each the sum of the other’s proper divisors: $s(220) = 284$ and $s(284) = 220$ (both $\\sigma = 504$). The Greeks’ pair; Thābit ibn Qurra’s rule (c. 850); al-Fārisī’s workshop.' },
            { term: 'HCF–LCM product rule', def: '$\\operatorname{HCF}(a,b) · \\operatorname{LCM}(a,b) = ab$ — the min–max exponent identity ($\\min + \\max = \\alpha + \\beta$) worn as arithmetic. Two numbers only: $2, 3, 4$ gives $1 · 12 \u2260 24$.' },
            { term: 'Inverted divisor problem', def: 'Given $\\tau(n) = k$, factor $k$ into $(a_1+1)(a_2+1)\u22ef$, dress each shape with big exponents on small primes, and sweep for the champion: $k = 12 \\to 60$, $k = 15 \\to 144$, $k = 24 \\to 360$.' },
            { term: 'σ-parity theorem', def: '$\\sigma(n)$ is odd exactly when $n$ is a square or twice a square — the odd-prime series are odd iff the exponent is even. Instances: $\\sigma(9) = 13$, $\\sigma(18) = 39$, $\\sigma(36) = 91$ (swept to 600).' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The canonical form of 100 is $2^2 · 5^2$. What is $\\sigma(100)$?',
              options: ['9 — the count of divisors of 100', '217 — $(1+2+4)(1+5+25) = 7 × 31$', '31 — the five-side series alone', '150 — 100 plus half of itself'],
              answer: 1,
              explain: 'The divisor *sum* multiplies the per-prime geometric series: $7 × 31 = 217$, confirmed by adding the nine divisors $1 + 2 + 4 + 5 + 10 + 20 + 25 + 50 + 100$. Option one is $\\tau(100) = 9$ — the divisor *count*, a different machine; option three forgets the twos entirely; option four is arithmetic without a licence.',
            },
            {
              q: 'Which is the smallest abundant number?',
              options: ['6 — the first perfect number', '10 — its proper divisors are 1, 2 and 5', '12 — σ(12) = 28 > 24', '16 — its divisors sum to 31'],
              answer: 2,
              explain: 'Abundance demands $\\sigma(n) > 2n$. For 6 the sum is exactly $12 = 2n$ — perfect, not abundant. For 10 the sum is $18 < 20$ — deficient (and its *proper* sum 8 undersums). For 16, $\\sigma = 31 < 32$ — deficient. For 12, $\\sigma = 1 + 2 + 3 + 4 + 6 + 12 = 28 > 24$ — the first oversum; the engine found nothing smaller.',
            },
            {
              q: 'Two numbers have HCF 6 and LCM 36. One of them is 12. The other is…',
              options: ['18 — HCF · LCM = ab, so b = 216 ÷ 12', '24 — double the HCF, times the LCM’s root', '72 — the LCM itself', '2 — the LCM divided by the HCF'],
              answer: 0,
              explain: 'The product rule: $6 · 36 = 216 = 12 · b$, so $b = 18$. Check from the DNA: $12 = 2^2 · 3$, $18 = 2 · 3^2$ — common part $2 · 3 = 6$ ✓, union $2^2 · 3^2 = 36$ ✓. The option 24 fails the check: $24 = 2^3 · 3$ next to $12 = 2^2 · 3$ would force LCM $72$, not 36.',
            },
            {
              q: 'Does any factorial end in exactly 30 zeros?',
              options: ['No — v₅(124!) = 28 and v₅(125!) = 31: the census skips 29 and 30', 'Yes — 125! has exactly 30 zeros', 'Yes — every count is reached eventually', 'No — factorials always end in an even number of zeros'],
              answer: 0,
              explain: 'The census climbs by the new term’s fives: at $125 = 5^3$ it donates three at once, jumping $28 \\to 31$. Counts 29 and 30 are skipped — no $n$ supplies them (swept to 600; the same skipping repeats past 625). Option four is its own trap: $5!$ ends in exactly 1 zero — odd counts occur; it is 29 and 30 specifically that never do.',
            },
            {
              q: 'The smallest number with exactly 12 divisors is…',
              options: ['24 — twelve divisors', '36 — twelve divisors', '60 = 2²·3·5, (2+1)(1+1)(1+1) = 12', '120 — twelve divisors'],
              answer: 2,
              explain: 'Count, don’t guess: $\\tau(24) = (3+1)(1+1) = 8$; $\\tau(36) = (2+1)(2+1) = 9$; $\\tau(120) = (3+1)(1+1)(1+1) = 16$. For 60 the count is $3 · 2 · 2 = 12$ ✓ — and the sweep certifies nothing below 60 reaches twelve (the 12-shapes dress to 2048, 96, 72, 60, and 60 is the least).',
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
                  q: 'List all divisors of 12, compute σ(12), and classify 12 as perfect, abundant or deficient.',
                  solution: [
                    'Split, the list: $1, 2, 3, 4, 6, 12$ — six divisors ($\\tau(12) = 6$).',
                    'Now, the sum: $1 + 2 + 3 + 4 + 6 + 12 = 28$ — so $\\sigma(12) = 28$.',
                    'So, the comparison: $2n = 24$, and $28 > 24$ — the proper sum $16$ exceeds 12.',
                    'Hence 12 is **abundant** — the smallest abundant number, as the sweep confirms.',
                  ],
                  answer: 'σ(12) = 28 > 24 — abundant',
                },
                {
                  q: 'Classify 15 using the canonical form and the σ formula.',
                  solution: [
                    'Split, the DNA: $15 = 3 · 5$.',
                    'Now, the series: $(1 + 3)(1 + 5) = 4 · 6 = 24$ — $\\sigma(15) = 24$.',
                    'So, the comparison: $2n = 30$, and $24 < 30$.',
                    'Hence 15 is **deficient** — its proper divisors $1, 3, 5$ sum to 9 < 15.',
                  ],
                  answer: 'σ(15) = 24 < 30 — deficient',
                },
                {
                  q: 'Compute τ(84) from the canonical form and confirm by counting the divisors.',
                  solution: [
                    'Split, the DNA: $84 = 2^2 · 3 · 7$ — exponents $(2, 1, 1)$.',
                    'Now, the formula: $(2+1)(1+1)(1+1) = 3 · 2 · 2 = 12$.',
                    'So, the enumeration: $1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84$ — count them: twelve.',
                    'Hence $\\tau(84) = 12$ — formula and list in agreement.',
                  ],
                  answer: 'τ(84) = 3 · 2 · 2 = 12',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute σ(72) from the canonical form, then verify by adding the twelve divisors.',
                  solution: [
                    'Split, the DNA: $72 = 2^3 · 3^2$.',
                    'Now, the series: $(1 + 2 + 4 + 8) = 15$ on the twos; $(1 + 3 + 9) = 13$ on the threes.',
                    'So, the product: $15 · 13 = 195$.',
                    'Take the enumeration: $1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72$ — the total: $195$ ✓.',
                    'Hence $\\sigma(72) = 195$ — the lattice figure of this lesson is exactly this computation.',
                  ],
                  answer: 'σ(72) = 15 · 13 = 195',
                },
                {
                  q: 'Derive HCF(12, 18) and LCM(12, 18) from the canonical forms, and confirm HCF × LCM = 12 × 18.',
                  solution: [
                    'Split, the DNAs: $12 = 2^2 · 3^1$, $18 = 2^1 · 3^2$.',
                    'Now, the minima: $2^{\\min(2,1)} · 3^{\\min(1,2)} = 2 · 3 = 6$ — the HCF.',
                    'So, the maxima: $2^{\\max(2,1)} · 3^{\\max(1,2)} = 2^2 · 3^2 = 36$ — the LCM.',
                    'Take the rule: $\\min + \\max = $ the original exponent on each prime, so $6 · 36 = 216$ and $12 · 18 = 216$ — equal.',
                    'Hence $\\operatorname{HCF} · \\operatorname{LCM} = ab$: the min–max identity, working.',
                  ],
                  answer: 'HCF = 6, LCM = 36, 6 · 36 = 216 = 12 · 18',
                },
                {
                  q: 'How many zeros end 200!?',
                  solution: [
                    'Split, the engine: zeros $= v_5(200!)$ — the twos never bind.',
                    'Now, the census: $\\lfloor 200/5 \\rfloor = 40$, $\\lfloor 200/25 \\rfloor = 8$, $\\lfloor 200/125 \\rfloor = 1$, and $625 > 200$ closes it.',
                    'So, $v_5(200!) = 40 + 8 + 1 = 49$.',
                    'Hence $200!$ ends in **49** zeros — three census terms, no calculator.',
                  ],
                  answer: '49 trailing zeros (40 + 8 + 1)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Show that 496 is perfect: factor it, compute σ(496) from the canonical form, and confirm σ = 2n.',
                  solution: [
                    'Split, the factoring: $496 = 2 · 248 = 4 · 124 = 8 · 62 = 16 · 31$ — and 31 is prime, so $496 = 2^4 · 31$.',
                    'Now, the series: $(1 + 2 + 4 + 8 + 16) = 31$ on the twos; $(1 + 31) = 32$ on the 31s.',
                    'So, $\\sigma(496) = 31 · 32 = 992$.',
                    'Take the comparison: $2n = 992$ — exact equality. The ten divisors $1, 2, 4, 8, 16, 31, 62, 124, 248, 496$ sum to 992 ✓.',
                    'Hence 496 is **perfect** — the third member of Euclid’s list $6, 28, 496, 8128$, of the shape $2^4(2^5 - 1)$ with $2^5 - 1 = 31$ prime.',
                  ],
                  answer: '496 = 2⁴ · 31, σ = 31 · 32 = 992 = 2 · 496 — perfect',
                },
                {
                  q: 'Find the smallest number with exactly 8 divisors, comparing every shape.',
                  solution: [
                    'Split, the shapes of 8: $8 = 8$ (shape $p^7$), $8 = 4 · 2$ (shape $p^3 q$), $8 = 2 · 2 · 2$ (shape $p q r$).',
                    'Now, dress each minimally: $2^7 = 128$; $2^3 · 3 = 24$; $2 · 3 · 5 = 30$.',
                    'So, compare: $24 < 30 < 128$ — the $p^3 q$ shape wins.',
                    'Take the sweep: the engine checked every $n < 24$ — none carries eight divisors (12 has 6, 16 has 5, 18 has 6).',
                    'Hence **24** is the champion: $\\tau(24) = (3+1)(1+1) = 8$ — three twos and a three beat one tall tower of twos.',
                  ],
                  answer: '24 = 2³ · 3 (τ = 4 · 2 = 8); rivals 128 and 30 lose',
                },
                {
                  q: 'Find the highest power of 7 that divides 3000!.',
                  solution: [
                    'Split, the census: $v_7(3000!) = \\lfloor 3000/7 \\rfloor + \\lfloor 3000/49 \\rfloor + \\lfloor 3000/343 \\rfloor + \\lfloor 3000/2401 \\rfloor + \u22ef$.',
                    'Now, the terms: $428 + 61 + 8 + 1$, and $7^5 = 16807 > 3000$ closes the sum.',
                    'So, $v_7(3000!) = 428 + 61 + 8 + 1 = 498$.',
                    'Hence $7^{498}$ divides $3000!$ and $7^{499}$ does not — four terms, done.',
                  ],
                  answer: 'v₇(3000!) = 428 + 61 + 8 + 1 = 498',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Verify from the canonical forms that 220 and 284 form an amicable pair.',
                  solution: [
                    'Split, the DNAs: $220 = 2^2 · 5 · 11$, $284 = 2^2 · 71$.',
                    'Now, the sums: $\\sigma(220) = (1+2+4)(1+5)(1+11) = 7 · 6 · 12 = 504$; $\\sigma(284) = (1+2+4)(1+71) = 7 · 72 = 504$.',
                    'So, the proper sums: $s(220) = 504 - 220 = 284$ and $s(284) = 504 - 284 = 220$.',
                    'Take the meaning: each number is exactly the sum of the other’s proper divisors — 220’s proper list $1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110$ totals 284.',
                    'Hence $(220, 284)$ is amicable — the pair the Pythagoreans befriended, and the smallest of its kind.',
                  ],
                  answer: 'σ(220) = σ(284) = 504; s(220) = 284, s(284) = 220',
                },
                {
                  q: 'Two numbers have HCF 13 and LCM 455. One of them is 65. Find the other and verify both conditions.',
                  solution: [
                    'Split, the rule: $b = \\operatorname{HCF} · \\operatorname{LCM} / a = 13 · 455 / 65$.',
                    'Now, the arithmetic: $13 · 455 = 5915$; $5915 / 65 = 91$.',
                    'So, verify the HCF: $65 = 5 · 13$, $91 = 7 · 13$ — the common part is $13$ ✓.',
                    'Take the LCM: the union is $5 · 7 · 13 = 455$ ✓ — and $65 · 91 = 5915 = 13 · 455$ closes the product rule.',
                    'Hence the other number is **91**.',
                  ],
                  answer: '91 (65 = 5·13, 91 = 7·13; HCF 13, LCM 455)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Find the smallest number with exactly 24 divisors. Enumerate every shape of 24 and dress each.',
                  solution: [
                    'Split, the shapes: $24 = 24;\\ 12·2;\\ 8·3;\\ 6·4;\\ 6·2·2;\\ 4·3·2;\\ 3·2·2·2$ — seven shapes.',
                    'Now, dress each with big exponents on small primes: $2^{23}$ (huge); $2^{11} · 3 = 6144$; $2^7 · 3^2 = 1152$; $2^5 · 3^3 = 864$; $2^5 · 3 · 5 = 480$; $2^3 · 3^2 · 5 = 360$; $2^2 · 3 · 5 · 7 = 420$.',
                    'So, compare the seven: $360 < 420 < 480 < 864 < 1152 < 6144 < 2^{23}$ — the $p^3 q^2 r$ shape wins.',
                    'Take the sweep: the engine certified 360 as the first number with $\\tau = 24$ (the near rivals 420 and 480 also carry 24 but sit larger).',
                    'Hence the champion is **360** $= 2^3 · 3^2 · 5$, $\\tau = 4 · 3 · 2 = 24$ — a balanced base beats both towers and wide primes.',
                  ],
                  answer: '360 = 2³ · 3² · 5 (τ = 4 · 3 · 2 = 24)',
                },
                {
                  q: 'Prove: σ(n) is odd if and only if n is a perfect square or twice a perfect square. Verify on 9, 18 and 36.',
                  solution: [
                    'Split, the prime powers: $\\sigma(p^a) = 1 + p + \u22ef + p^a$ is a sum of $a + 1$ terms.',
                    'Now, the odd primes: every term is odd, so $\\sigma(p^a)$ is odd iff $a + 1$ is odd — iff $a$ is even. The prime 2 differs: $\\sigma(2^a) = 2^{a+1} - 1$ is odd for *every* $a$.',
                    'So, $\\sigma(n)$, a product of the per-prime sums, is odd iff every odd prime in $n$ carries an even exponent — i.e. $n = 2^a · m^2$ with $m$ odd.',
                    'Take the two cases: $a$ even makes $n$ a square; $a$ odd makes $n$ twice a square.',
                    'Hence $\\sigma(n)$ odd $\\Leftrightarrow$ $n$ is a square or twice a square — the engine swept it to 600. Instances: $\\sigma(9) = 13$, $\\sigma(18) = 2\u03c3(9) - \u22ef = 39$ (both odd), $\\sigma(36) = 91$ odd — while $\\sigma(12) = 28$ even, as 12 is neither.',
                  ],
                  answer: 'σ odd ⟺ n = m² or n = 2m² (σ(9) = 13, σ(18) = 39, σ(36) = 91)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Find every pair of consecutive numbers below 600 with σ(n) = σ(n + 1), and verify each pair by the formula.',
                  solution: [
                    'Split, the sweep: the engine computed $\\sigma$ for every $n \\le 600$ and compared neighbours — two pairs survive: $(14, 15)$ and $(206, 207)$.',
                    'Now, the first pair: $14 = 2 · 7$ gives $\\sigma = 3 · 8 = 24$; $15 = 3 · 5$ gives $\\sigma = 4 · 6 = 24$ — equal.',
                    'So, the second pair: $206 = 2 · 103$ gives $\\sigma = 3 · 104 = 312$; $207 = 3^2 · 23$ gives $\\sigma = (1+3+9)(1+23) = 13 · 24 = 312$ — equal.',
                    'Take the structure: neither pair is coincidence — $2p$ and $p^2 q$ families collide often near each other, but only these two land inside 600.',
                    'Hence the consecutive equal-$\\sigma$ pairs below 600 are **(14, 15)** with $\\sigma = 24$ and **(206, 207)** with $\\sigma = 312$ — the sweep decides, the formulas confirm.',
                  ],
                  answer: '(14, 15) both σ = 24; (206, 207) both σ = 312',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The divisor sum',
          latex: '\\sigma(n) = \\prod_{i=1}^{k} \\frac{p_i^{a_i + 1} - 1}{p_i - 1}',
          note: 'Per-prime geometric series, multiplied. σ(100) = 7·31 = 217; σ(2025) = 121·31 = 3751; σ(2047) = 24·90 = 2160. Multiplicative across coprime factors only.',
        },
        {
          kind: 'formula',
          name: 'Perfect, abundant, deficient',
          latex: '\\sigma(n) \\; \\{=, >, <\\} \\; 2n \\;\\Leftrightarrow\\; \\text{perfect, abundant, deficient}',
          note: '6, 28, 496, 8128 perfect (Euclid IX.36: 2^(p−1)(2^p − 1)); 12 the first abundant; primes all deficient; (220, 284) amicable — σ of each is 504.',
        },
        {
          kind: 'formula',
          name: 'The product rule',
          latex: '\\operatorname{HCF}(a, b) · \\operatorname{LCM}(a, b) = ab',
          note: 'min + max = α + β on every prime. 6·36 = 216 = 12·18; 13·455 = 65·91. Two numbers only — 2, 3, 4 gives 1·12 ≠ 24.',
        },
        {
          kind: 'formula',
          name: 'The inverted censuses',
          latex: '\\tau(n) = k \\text{ champions: } 8 \\to 24,\\ 12 \\to 60,\\ 15 \\to 144,\\ 24 \\to 360; \\quad \\text{zeros} \\ge 100 \\to n = 405',
          note: 'Factor k, dress big exponents on small primes, sweep. Skipped zero counts exist: no n! ends in exactly 29 or 30 zeros (the jump 28 → 31 at 125).',
        },
      ],
    },
    {
      id: 'ans-how-the-primes-are-distributed',
      number: '4.4',
      title: 'How the Primes Are Distributed',
      prerequisites: ['ans-primes-never-end-euclid-and-the-sieve', 'ans-divisors-from-dna-divisor-counts', 'fm-prime-numbers-factorisation'],
      sources: ['bertrand-postulate-1845-chebyshev', 'euler-1737-reciprocal-primes', 'hadamard-vallee-poussin-pnt-1896', 'zhang-2013-bounded-gaps', 'khattar-qa-4e'],
      concepts: [
        'Prime gaps and the canyon after 89',
        'Twin primes and the unique 3, 5, 7',
        "Bertrand's postulate",
        'π(n) and the 10^k table',
        'The prime number theorem, stated',
        'Σ 1/p diverges (Euler 1737)',
        'Bounded gaps: 70 million → 246',
        'How many primes between',
      ],
      objectives: [
        'Define and census prime gaps — first occurrences, records, and the honest mean — and explain why gaps after 2 are always even',
        'Count twin primes to any bound (8 below 100, 35 below 1000, 8169 below 10⁶) and prove that 3, 5, 7 is the only prime triplet spaced two apart',
        "State and numerically verify Bertrand's postulate (a prime between n and 2n), and use it both as a search guarantee and as a contradiction-resolver",
        'Work with π(n) at the powers of ten, extract exam answers by π-differences, and state — without claiming — the prime number theorem and Euler’s 1737 divergence of Σ 1/p',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Euclid’s proof (Lesson 4.1) settles *that* the primes never end; the sieve catches every prime below any bound. But neither says anything about the *scatter* — are the atoms packed tight or strewn thin? Do they arrive in clumps, at even intervals, at ever-growing separations? This lesson measures the scatter. It opens the census of prime gaps, names the twin primes and proves the uniqueness of $3, 5, 7$, guarantees (Bertrand) that a prime is never farther than a doubling away, tabulates $\\pi(n)$ — the counting function whose growth is the deepest fact in elementary number theory — and closes with Euler’s 1737 theorem that even the reciprocals of the primes refuse to sum.',
        },
        {
          kind: 'para',
          text: 'The discipline is the chapter’s: every number below was computed by the run’s verify script *before* this page was written — a sieve to two million built the gap census, swept Bertrand’s postulate for every $n \\le 2000$, counted the twins at six bounds, and summed the reciprocals far enough to watch the divergence crawl. Where the lesson states a deep theorem (Bertrand’s proof, the prime number theorem, Euler’s divergence), it *cites* the theorem honestly and verifies the statement numerically instead of faking a proof — the same contract Lesson 4.2 kept with Bézout.',
        },
        { kind: 'heading', text: 'Prime gaps: the scatter between survivors' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The prime gap after p',
          text: 'For a prime $p$, let $p^{\\text{next}}$ denote the next prime above it. The **prime gap** after $p$ is $g(p) = p^{\\text{next}} - p$. Thus $g(2) = 1$ (the next prime is 3), $g(3) = 2$, $g(7) = 4$ (11 follows), $g(23) = 6$ (29 follows), $g(89) = 8$ (97 follows). The gap measures the length of the composite desert a survivor must cross before the next survivor.',
        },
        {
          kind: 'para',
          text: 'One gap is odd and one gap only: $g(2) = 1$. Every later gap is even, for a structural reason the chapter already owns — any two primes past 2 are odd numbers, and two odd numbers differ by an even number. (This is the same observation that killed the “are there infinitely many twin primes?” guesswork in Lesson 4.1’s exercises: *twins* are exactly the primes whose gap is the smallest legal even value, 2.) The engine’s census below 2000 confirms the pattern with no exceptions.',
        },
        {
          kind: 'table',
          caption: 'First occurrences of the small gap sizes, engine-built: the first time the desert reaches each width. Note the honest irregularity — the first gap of 14 (after 113) arrives before the first gap of 10 (after 139).',
          head: ['gap g', 'first after p', 'next prime', 'the composite run between'],
          rows: [
            ['2', '3', '5', '4 = 2²'],
            ['4', '7', '11', '8, 9, 10'],
            ['6', '23', '29', '24 … 28 (five composites)'],
            ['8', '89', '97', '90 … 96 (seven composites)'],
            ['10', '139', '149', '141, 143, 145, 147 among others'],
            ['12', '199', '211', '201 … 209 (nine composites)'],
            ['14', '113', '127', '115, 117, 119, 121, 123, 125 — six odds, all composite'],
          ],
        },
        {
          kind: 'para',
          text: 'The *records* — the widest desert yet seen — grow slowly and irregularly. Below 100 the record is the canyon after $89$: eight wide, with $90$ through $96$ all composite. Below 1000 the record widens to $20$ (after $887$, the desert runs to $907$). Below 2000 it reaches $34$ (after $1327$, running to $1361$ — the first gap of that width anywhere). Meanwhile the *average* gap behaves remarkably well: the 167 gaps from 2 up to 997 total 995, a mean of $5.96$ — and the natural logarithm of 1000 is $6.91$. The mean gap hovers near $\\ln n$ long before anyone can prove it must: that is the shadow of the prime number theorem, met properly below.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Deserts of any length exist — and stay small relative to where you stand',
          text: 'Lesson 4.1’s exercise built a hundred consecutive composites: $101! + 2, 101! + 3, \\dots, 101! + 101$, each $101! + k$ divisible by its own $k$ (every $k$ from 2 to 101 divides $101!$, by Legendre’s census). The same construction stretches to any length — the gaps between consecutive primes are **unbounded**. Yet the record gaps stay tiny next to where they occur: a desert of 34 sits after the prime 1327, less than $3\\%$ of the way to its own doubling. The two facts balance exactly as Bertrand’s postulate (below) demands: deserts grow without bound in *width*, but a prime is always waiting within a *factor of two*. Both directions — the unbounded construction and the doubling guarantee — are exam staples.',
        },
        { kind: 'heading', text: 'Twin primes and the unique triplet' },
        {
          kind: 'para',
          text: 'The gap-2 pairs — $(3, 5)$, $(5, 7)$, $(11, 13)$, $(17, 19)$, $(29, 31)$, $(41, 43)$, $(59, 61)$, $(71, 73)$ below 100 — are the **twin primes**, the closest two primes may legally stand. They never thin out as visibly as the primes themselves do, and whether they run out is the oldest open question in the subject. The engine counted them at every power of ten:',
        },
        {
          kind: 'table',
          caption: 'The twin ladder, computed: pairs (p, p + 2) with both prime, counted below each bound. The counts grow without dying away — the empirical case for the twin prime conjecture.',
          head: ['bound', 'twin pairs below it', 'the newest region’s share'],
          rows: [
            ['10', '2', '(3,5), (5,7)'],
            ['100', '8', 'six more in 11…73'],
            ['1000', '35', '27 more in 101…881'],
            ['10⁴', '205', '170 more'],
            ['10⁵', '1224', '1019 more'],
            ['10⁶', '8169', '6945 more'],
          ],
        },
        {
          kind: 'figure',
          caption:
            'The prime line to 110: twenty-nine dots, eight twin pairs bracketed (the shared bracket over 3, 5, 7 marks the only gap-2 triplet anywhere), and the canyon after 89 — eight wide, the record below 100 — bracketed below. Ticks every 20 give the scale; the dots are the primes themselves.',
          svg: `<svg viewBox="0 0 940 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from zero to one hundred ten with the twenty-nine primes as dots, six twin pairs bracketed above, the triplet 3 5 7 bracketed together, and the gap of eight after 89 bracketed below">
  <text x="470" y="24" font-size="13" fill="currentColor" text-anchor="middle" opacity="0.85">the prime line to 110 — twins above, the canyon after 89 below</text>
  <line x1="30" y1="128" x2="910" y2="128" stroke="currentColor" stroke-width="1.1" opacity="0.8"/>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <line x1="30" y1="124" x2="30" y2="132"/><line x1="190" y1="124" x2="190" y2="132"/><line x1="350" y1="124" x2="350" y2="132"/><line x1="510" y1="124" x2="510" y2="132"/><line x1="670" y1="124" x2="670" y2="132"/><line x1="830" y1="124" x2="830" y2="132"/><line x1="910" y1="124" x2="910" y2="132"/>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.7" text-anchor="middle">
    <text x="30" y="150">0</text><text x="190" y="150">20</text><text x="350" y="150">40</text><text x="510" y="150">60</text><text x="670" y="150">80</text><text x="830" y="150">100</text><text x="910" y="150">110</text>
  </g>
  <g fill="currentColor">
    <circle cx="46" cy="128" r="4"/><circle cx="54" cy="128" r="4"/><circle cx="70" cy="128" r="4"/><circle cx="86" cy="128" r="4"/><circle cx="118" cy="128" r="4"/><circle cx="134" cy="128" r="4"/><circle cx="166" cy="128" r="4"/><circle cx="182" cy="128" r="4"/><circle cx="214" cy="128" r="4"/><circle cx="262" cy="128" r="4"/><circle cx="278" cy="128" r="4"/><circle cx="326" cy="128" r="4"/><circle cx="358" cy="128" r="4"/><circle cx="374" cy="128" r="4"/><circle cx="406" cy="128" r="4"/><circle cx="454" cy="128" r="4"/><circle cx="502" cy="128" r="4"/><circle cx="518" cy="128" r="4"/><circle cx="566" cy="128" r="4"/><circle cx="598" cy="128" r="4"/><circle cx="614" cy="128" r="4"/><circle cx="662" cy="128" r="4"/><circle cx="694" cy="128" r="4"/><circle cx="742" cy="128" r="4"/><circle cx="806" cy="128" r="4"/><circle cx="838" cy="128" r="4"/><circle cx="854" cy="128" r="4"/><circle cx="886" cy="128" r="4"/><circle cx="902" cy="128" r="4"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.75">
    <path d="M54,110 Q70,94 86,110"/>
    <path d="M118,116 Q126,102 134,116"/>
    <path d="M166,116 Q174,102 182,116"/>
    <path d="M262,116 Q270,102 278,116"/>
    <path d="M358,116 Q366,102 374,116"/>
    <path d="M502,116 Q510,102 518,116"/>
    <path d="M598,116 Q606,102 614,116"/>
  </g>
  <text x="70" y="88" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">3, 5, 7 — the only gap-2 triplet</text>
  <g fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.75">
    <path d="M742,140 L742,146 L806,146 L806,140"/>
  </g>
  <text x="760" y="172" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">gap 8: 89 → 97, the record below 100</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'One question about twins needs no conjecture: can *three* consecutive primes all sit two apart — a ladder $p, p+2, p+4$? The ladder $3, 5, 7$ works. No other does, and the reason is three lines long:',
        },
        {
          kind: 'derivation',
          title: 'The uniqueness of 3, 5, 7',
          statement:
            'Claim: $3, 5, 7$ is the only set of three primes of the form $p, p+2, p+4$. Hence no twin pair ever chains into a second twin pair beyond it.',
          steps: [
            {
              label: 'Run the ladder modulo 3',
              formula: 'p, \\quad p + 2, \\quad p + 4 \\;\\equiv\\; p, \\; p + 2, \\; p + 1 \\pmod{3}',
              explanation:
                'Modulo 3 the three members are $p$, $p + 1$, $p + 2$ in some order — a complete set of residues. Exactly one of them is divisible by 3 (Lesson 5 will call this language home; for now, long division by 3 suffices).',
            },
            {
              label: 'The divisible member is past 3 — unless p = 3',
              formula: 'p \\ge 5 \\;\\Rightarrow\\; \\text{all three} \\ge 5 > 3 \\;\\Rightarrow\\; \\text{the multiple of 3 is composite}',
              explanation:
                'If $p \\ge 5$, the member divisible by 3 exceeds 3 itself, so it carries a factor 3 and something more: composite. The ladder dies. Only $p = 3$ escapes — there the divisible member is 3 itself, which is prime.',
            },
            {
              label: 'Check the p = 3 instance and the neighbours',
              formula: '3, 5, 7 \\text{ all prime}; \\qquad 5, 7, 9 \\text{ dies at } 9 = 3^2; \\qquad 11, 13, 15 \\text{ dies at } 15 = 3 · 5',
              explanation:
                'The engine swept every odd $p$ from 5 to 2000 — no ladder survives, exactly as the argument demands.',
            },
          ],
          result:
            'The triplet 3, 5, 7 is unique — 4.1’s exercise claim now proved. The reason is the same force that shapes every distribution question on this page: small primes police the ladder, and 3’s patrol runs the whole line.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The twin prime conjecture — and the 2013 crack',
          text: 'Whether infinitely many twin pairs exist is the **twin prime conjecture** — a special case of de Polignac’s 1849 conjecture that every even gap occurs infinitely often. For 164 years nothing was proved about *any* fixed gap. Then in April 2013, Yitang Zhang proved that some gap of at most 70,000,000 occurs infinitely often — the first finite bound ever, and a sensation. The Polymath project (a mass online collaboration) and James Maynard’s simpler sieve ground the bound down within months: 4680, then 600, then **246**, the standing record — infinitely many prime pairs sit no farther than 246 apart. The twin conjecture itself ($H_1 = 2$) remains open: the gap-2 pairs are counted, catalogued and never seen to stop, but “never seen to stop” is not a proof — Lesson 4.1’s moral about stopped sieves, wearing its modern dress.',
        },
        { kind: 'heading', text: 'Bertrand’s postulate: a prime is never far' },
        {
          kind: 'para',
          text: 'The gap census says deserts grow; Euclid says they never end. What connects them is a guarantee about *scale*: no desert is ever more than a doubling wide. Joseph Bertrand, checking the tables of his day (they ran to three million), conjectured in 1845 that between any number and its double sits a prime. Pafnuty Chebyshev proved it in 1850; in 1932 an eighteen-year-old Paul Erdős found the elementary proof textbooks now teach. The statement is a theorem wearing its old nickname:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Bertrand’s postulate (Bertrand 1845, Chebyshev 1850)',
          text: 'For every integer $n \\ge 1$ there is a prime $p$ with $n < p \\le 2n$ — and for $n \\ge 2$ the prime sits strictly inside, $n < p < 2n$. The proof (Chebyshev’s analytic argument, streamlined by Erdős into binomial-coefficient bookkeeping) is cited, not reproduced here. The verify script swept the *statement* for every $n \\le 2000$ in both forms: no counterexample exists in range — the guarantee holds from $n = 1$ (prime 2 in $(1, 2]$) upward.',
        },
        {
          kind: 'para',
          text: 'The sweep gives the search guarantee a concrete face. Walk the doubling chain — after 5 the first prime is 7; after 10 it is 11; after 20, 23; after 40, 41; after 80, 83 — each inside its $(n, 2n)$ window. The actual next prime is usually far closer than the guarantee demands ($101$ follows $100$ instantly), but the value of the postulate is the *worst case*: it certifies that a bounded search always terminates.',
        },
        {
          kind: 'algorithm',
          title: 'nextPrime(n) — the search Bertrand certifies',
          lines: [
            { code: 'to find a prime above n:' },
            { code: '    for m = n + 1, n + 2, …, 2n:' },
            { code: '        test m for primality (trial band up to √m)' },
            { code: '        return the first m that passes' },
          ],
          note: 'The loop cannot fall through: Bertrand’s postulate guarantees a prime in $(n, 2n]$, so at most $n - 1$ candidates are ever tested. Without the postulate the bound would be a hope; with it, the algorithm’s termination is a theorem.',
        },
        {
          kind: 'example',
          title: 'Bertrand at work: guaranteed windows and their actual tenants',
          steps: [
            'Split, the guarantee: for $n = 1000$, a prime must sit in $(1000, 2000]$ — the sweep finds the window’s first tenant is $1009$.',
            'Now, the smaller windows: $(100, 200)$ opens onto $101$; $(500, 1000)$ onto $503$; $(1500, 3000)$ onto $1511$.',
            'So, the chain view: after 100 the primes crowd in — $101, 103, 107, 109$ — the guarantee is a worst case, almost never the forecast.',
            'Take the reconciliation: the desert $101! + 2$ through $101! + 101$ is 100 wide — and since $101! + 101 \\ll 2 · 101!$, the run ends far inside the Bertrand window, with the guaranteed prime lying *beyond* the desert. No contradiction: the construction makes length, the postulate bounds scale.',
            'Hence the two facts cooperate — deserts of any *length*, but never wider than a *doubling* — and the algorithm above can certify its own termination.',
          ],
        },
        { kind: 'heading', text: 'Counting the primes: π(n)' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The prime-counting function π(n)',
          text: 'For a real or natural $n$, $\\pi(n)$ is the number of primes $\\le n$: $\\pi(10) = 4$ (they are 2, 3, 5, 7), $\\pi(100) = 25$, $\\pi(1000) = 168$. The notation is Gauss’s, chosen long before the circle constant $\\pi$ crowded it — no relation. Every sieve run computes $\\pi$ at its bound; the census below extends Lesson 4.1’s table to a million.',
        },
        {
          kind: 'table',
          caption: 'π(n) at the powers of ten, engine-computed, against the n/ln n companion: the share of primes thins, the count races ahead, and the ratio drifts toward 1 — the prime number theorem’s shape, stated not proved.',
          head: ['n', 'π(n)', 'share π(n)/n', 'n/ln n', 'ratio π(n) ÷ (n/ln n)'],
          rows: [
            ['10', '4', '0.4000', '4.3', '0.921'],
            ['100', '25', '0.2500', '21.7', '1.151'],
            ['1000', '168', '0.1680', '144.8', '1.161'],
            ['10⁴', '1229', '0.1229', '1085.7', '1.132'],
            ['10⁵', '9592', '0.0959', '8685.9', '1.104'],
            ['10⁶', '78498', '0.0785', '72382.4', '1.084'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the table twice. Down the *share* column, primes thin out — 40% of the numbers to 10, under 8% to a million. Down the *ratio* column, $\\pi(n)$ tracks $n / \\ln n$ with errors that wander — above, below, above — and shrink *relatively*: 0.921, 1.151, 1.161, 1.132, 1.104, 1.084. The pattern is not luck, and proving it took the nineteenth century’s best analysis: the **prime number theorem** — $\\pi(n)$ is asymptotic to $n/\\ln n$ as $n$ grows — was conjectured by Gauss on the evidence of tables like this one and proved in 1896, independently, by Jacques Hadamard and Charles-Jean de la Vallée Poussin, riding the zeta-function ideas Bernhard Riemann had introduced in 1859. The proof is far beyond this book — stated, cited, believed on the table’s evidence, and *not claimed*.',
        },
        {
          kind: 'example',
          title: 'How many primes between a and b — the π-difference exam shape',
          steps: [
            'Split, the tool: primes in $(a, b] = \\pi(b) - \\pi(a)$ — count to the top, subtract the count to the bottom.',
            'Now, the classic: between 1000 and 2000 — $\\pi(2000) = 303$ (engine-computed) and $\\pi(1000) = 168$, so $303 - 168 = 135$.',
            'So, the drill values: between 100 and 200 — $46 - 25 = 21$ (Lesson 4.1’s table); between 100 and 1000 — $168 - 25 = 143$; between 201 and 300 — sixteen primes, $211$ through $293$.',
            'Take the economy: no listing needed at scale — the sieve computes $\\pi$ once, every interval question becomes a subtraction.',
            'Hence the exam answer shape: **π(b) − π(a)** — the counting function is the difference engine for interval censuses.',
          ],
        },
        { kind: 'heading', text: 'The harmonic hiss: Σ 1/p diverges' },
        {
          kind: 'para',
          text: 'The thinning share column raises the deepest distribution question of all: do the primes, stretched to infinity, add up to anything? Compare with the integers themselves: the harmonic series $1 + 1/2 + 1/3 + \u22ef$ diverges — Nicole Oresme proved it in the fourteenth century by grouping terms. Thinning the terms to primes might plausibly tame the sum. It does not. Leonhard Euler settled the question in 1737, in the paper *Variae observationes circa series infinitas*:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Euler, 1737: the sum of the reciprocals of the primes diverges',
          text: '$\\sum_{p \\text{ prime}} \\frac{1}{p} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{5} + \\frac{1}{7} + \\frac{1}{11} + \u22ef = \\infty$. The honest sketch, cited not claimed: Euler factorises the harmonic series with his product formula — $\\sum 1/n = \\prod_p (1 - 1/p)^{-1}$, each prime contributing one geometric series, *the fundamental theorem of arithmetic turned analytic* — then takes logarithms and expands: $\\log \\sum 1/n = \\sum_p 1/p + \\text{(convergent remainders)}$. The left side diverges; the remainders do not; so $\\sum 1/p$ must. Rigorous proofs came later (and modern proofs give the growth rate: the partial sums grow like $\\log \\log n$ — divergence, but glacial).',
        },
        {
          kind: 'para',
          text: 'Glacial is measurable. The engine summed the reciprocals honestly at three bounds: $\\sum_{p \\le 100} 1/p = 1.8028$; by 1000 it reaches $2.1981$; by a million, $2.8873$ — an eighteen-thousand-fold growth in the bound bought barely one more unit of sum. The partial sum does not cross 3 until the prime $5{,}195{,}977$ (computed in the run’s script — the divergence is real but one must sieve millions to see a unit of progress). Against the integers at the same bounds: $\\sum_{n \\le 100} 1/n = 5.1874$ and $\\sum_{n \\le 10^6} 1/n = 14.3927$. Sparse beyond all reason — and still, by Euler, unending.',
        },
        {
          kind: 'table',
          caption: 'The two divergences side by side, engine-computed: the primes’ sum crawls where the harmonic sum walks. Both end nowhere — that is Euler’s theorem.',
          head: ['bound', 'Σ 1/p over primes ≤ bound', 'Σ 1/n over integers ≤ bound'],
          rows: [
            ['100', '1.8028', '5.1874'],
            ['10⁶', '2.8873', '14.3927'],
          ],
        },
        {
          kind: 'example',
          title: 'Euler’s product, tested at s = 2 — numerics for a cited identity',
          steps: [
            'Split, the identity: Euler’s stronger formula says $\\sum_{n=1}^{\\infty} 1/n^2 = \\prod_p (1 - 1/p^2)^{-1}$ — the zeta product, the fundamental theorem in analytic dress.',
            'Now, the Basel value: $\\sum 1/n^2 = \\pi^2/6$ (Euler 1735), so the product side should equal $6/\\pi^2 \\approx 0.6079$.',
            'So, compute honestly: multiplying $(1 - 1/p^2)$ over the primes up to 1000 gives $0.608004$ — within a thousandth of $0.607927$, the gap being the tail of primes past 1000.',
            'Take the meaning: the product *converges* at $s = 2$ (each factor is close to 1) while at $s = 1$ it diverges — exactly the boundary Euler crossed in 1737.',
            'Hence the numerics corroborate the cited identity — $0.6080$ against $6/\\pi^2 = 0.6079$ — without claiming the proof: the fundamental theorem’s multiplicative skeleton, visible in a decimal.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Four question shapes own this lesson’s ground (Khattar QA ch. 1’s prime-count scope; CAT/olympiad existence items). *“How many primes between $a$ and $b$”* — answer by $\\pi$-difference at the memorised anchors ($\\pi(100) = 25$, $\\pi(1000) = 168$) or by direct sieve below them ($21$ in $101..200$, $16$ in $201..300$, $135$ in $1001..2000$). *Gap reasoning*: “the gap after 89 is… 8”; “no two consecutive primes are both above 2 and differ by an odd number”; record-gap drill values ($8$ below $100$, $20$ below $1000$). *Twin counting*: the drill answers are 8 below 100 and 35 below 1000, plus the uniqueness of $3, 5, 7$ as a proof one-liner. *Bertrand existence arguments*: “show a prime exists between $n$ and $2n$” is the olympiad workhorse for bounding searches and forcing contradictions — the next-prime-after-$n$ termination guarantee. What exams never ask: to prove Bertrand or the PNT — the postulate is *used*, exactly as this lesson uses it.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Prime gap', def: '$g(p) = p^{\\text{next}} - p$ — the composite desert after $p$. One odd gap only ($2 \\to 3$); records 8 (after 89), 20 (after 887), 34 (after 1327); unbounded in width, bounded by a doubling in scale.' },
            { term: 'Twin primes', def: 'Pairs $(p, p+2)$, both prime: 8 pairs below 100, 35 below 1000, 8169 below 10⁶. Whether they never run out is the twin prime conjecture (de Polignac 1849) — open, though Zhang (2013) proved some gap ≤ 70,000,000 repeats forever, since ground to 246.' },
            { term: 'Bertrand’s postulate', def: 'For every $n \\ge 1$ a prime sits in $(n, 2n]$ (strictly inside for $n \\ge 2$). Conjectured 1845 from the tables, proved by Chebyshev 1850, elementarily by the teenage Erdős 1932. The sweep here certifies the statement to $n \\le 2000$; the proof is cited.' },
            { term: 'Prime-counting function π(n)', def: 'The number of primes ≤ n: 4, 25, 168, 1229, 9592, 78498 at the powers of ten. Interval questions become differences: primes in $(a, b] = \\pi(b) - \\pi(a)$.' },
            { term: 'The prime number theorem', def: '$\\pi(n)$ is asymptotic to $n/\\ln n$ — the ratio column (0.921 … 1.084 at $10^k$) drifts toward 1. Conjectured by Gauss on table evidence; proved 1896 by Hadamard and de la Vallée Poussin via Riemann’s zeta ideas. Stated here, never claimed.' },
            { term: 'Divergence of Σ 1/p', def: 'Euler (1737): the prime reciprocals sum to infinity — the harmonic series’ divergence surviving the thinning, via the Euler product (the fundamental theorem made analytic). Partial sums: 1.8028 by 100, 2.8873 by 10⁶; past 3 only at 5,195,977 — slow, but endless.' },
            { term: 'Consecutive composite run', def: '$(m+1)! + 2, \\dots, (m+1)! + (m+1)$ — $m$ guaranteed composites, each killed by its own $k$. Stretches gaps unboundedly (4.1’s exercise, cashed here against Bertrand: the run ends far before the doubling point).' },
            { term: 'The uniqueness of 3, 5, 7', def: 'The only prime ladder $p, p+2, p+4$: modulo 3 the three members cover all residues, so for $p \\ge 5$ one member is a multiple of 3 beyond 3 — composite. Lesson 4.1’s exercise, proved.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'How many twin prime pairs sit below 100?',
              options: ['6 — stopping at (43, 47)-ish pairs', '8 — (3,5), (5,7), (11,13), (17,19), (29,31), (41,43), (59,61), (71,73)', '10 — counting (97, 99) as well', '25 — one pair per prime'],
              answer: 1,
              explain: 'The gap-2 census below 100 finds exactly eight pairs, ending at $(71, 73)$. Option three fails arithmetic: $99 = 9 · 11$ is composite, so 97 is no twin. Option one undercounts (it forgets 59 and 71); option twenty-five confuses primes with twin pairs.',
            },
            {
              q: 'What exactly does Bertrand’s postulate guarantee for n = 1000?',
              options: ['A prime somewhere in (1000, 2000) — and 1009 is one', 'A prime between 1000 and 1010', 'Exactly one prime between 1000 and 2000', 'A twin pair straddling 1000'],
              answer: 0,
              explain: 'The guarantee is the *window* $(n, 2n)$: at least one prime between 1000 and 2000 — in fact 1009 is the first of 135. It promises nothing about 1010-sized windows (though 1009 happens to oblige), nothing about uniqueness (the window holds many primes), and nothing about twins.',
            },
            {
              q: 'How many primes lie strictly between 100 and 1000?',
              options: ['143 — π(1000) − π(100)', '168 — that is π(1000) itself', '25 — the count to 100', '832 — the count of odd numbers'],
              answer: 0,
              explain: 'Interval counting is a difference: $\\pi(1000) - \\pi(100) = 168 - 25 = 143$ primes in $101..1000$. Option two counts the primes *to* 1000, including the 25 small ones; option three is the subtrahend, not the answer; option four counts odd numbers, most of them composite.',
            },
            {
              q: 'Which is the record prime gap below 1000?',
              options: ['8 — the canyon after 89', '20 — after 887, the desert runs to 907', '14 — after 113, running to 127', '2 — twins, forever the most common gap'],
              answer: 1,
              explain: 'The engine’s census: after 887, every number to 906 is composite and 907 is prime — a gap of 20, the widest below 1000. The canyon of 8 (89 → 97) is the record below 100 only; the gap of 14 (113 → 127) is the *first* of its width, not the widest here; twins are frequent, never the widest.',
            },
            {
              q: 'What is true of the sum 1/2 + 1/3 + 1/5 + 1/7 + 1/11 + … over all primes?',
              options: ['It converges to about 2.9', 'It diverges — proved by Euler in 1737 — but far more slowly than the harmonic series', 'It converges because the primes thin out', 'It diverges exactly as fast as Σ 1/n'],
              answer: 1,
              explain: 'Euler’s 1737 theorem: the sum diverges — the thinning cannot tame it. But slowly: by 10⁶ the primes’ sum reaches 2.887 while the harmonic sum hits 14.393, and the primes’ sum crosses 3 only at the prime 5,195,977. Option one mistakes the slow partial sums for a limit; option three is the plausible guess Euler disproved; option four ignores the thinning the table shows.',
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
                  q: 'List every prime below 50 and state how many there are.',
                  solution: [
                    'Split, the sieve to 50: cross multiples of 2, 3, 5, 7 (since $7^2 = 49 \\le 50$) — the survivors are the primes.',
                    'Now, the list: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47$.',
                    'So, the count: fifteen primes — $\\pi(50) = 15$.',
                    'Hence fifteen primes below 50 — the engine’s census agrees number by number.',
                  ],
                  answer: 'π(50) = 15 — 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47',
                },
                {
                  q: 'Find the gap after 13 and the gap after 89.',
                  solution: [
                    'Split, the next primes: after 13 comes 17; after 89 comes 97.',
                    'Now, the differences: $17 - 13 = 4$; $97 - 89 = 8$.',
                    'So, the desert check: between 89 and 97 lie 90–96 — seven consecutive composites, the record below 100.',
                    'Hence $g(13) = 4$ and $g(89) = 8$ — the second is the record gap below 100.',
                  ],
                  answer: 'g(13) = 4; g(89) = 8 (the record below 100)',
                },
                {
                  q: 'List all twin prime pairs between 101 and 200.',
                  solution: [
                    'Split, the method: scan the odd numbers, test each prime pair $(p, p+2)$.',
                    'Now, the finds: $(101, 103)$, $(107, 109)$, $(137, 139)$, $(149, 151)$, $(179, 181)$, $(191, 193)$, $(197, 199)$.',
                    'So, the count: seven pairs — each verified prime on both ends by the trial band.',
                    'Hence seven twin pairs in 101..200 — with the eight below 100, fifteen pairs below 200.',
                  ],
                  answer: '(101,103), (107,109), (137,139), (149,151), (179,181), (191,193), (197,199) — seven',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'List the primes between 201 and 300 and confirm the count two ways.',
                  solution: [
                    'Split, the sieve run: $\\pi(300) - \\pi(200) = 62 - 46 = 16$ expected.',
                    'Now, the list: $211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293$.',
                    'So, count them: sixteen ✓ — the list and the $\\pi$-difference agree.',
                    'Take the spot-check: $251$ survives trials to $\\lfloor\\sqrt{251}\\rfloor = 15$ (primes 2, 3, 5, 7, 11, 13); $209 = 11 · 19$ and $247 = 13 · 19$ correctly stay out.',
                    'Hence sixteen primes in 201..300 — census and list locked.',
                  ],
                  answer: '16 primes — 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293',
                },
                {
                  q: 'Show that there are exactly 15 twin pairs below 200, by combining the two regions.',
                  solution: [
                    'Split, the regions: below 100 the engine lists eight pairs; from 101 to 200 the exercise above lists seven.',
                    'Now, no overlap: the regions are disjoint and together cover everything below 200.',
                    'So, the total: $8 + 7 = 15$ twin pairs below 200.',
                    'Take the direct check: the engine counted gap-2 consecutive prime pairs to 200 — fifteen, region by region.',
                    'Hence 15 twin pairs below 200 — census by regions, verified whole.',
                  ],
                  answer: '8 + 7 = 15 twin pairs below 200',
                },
                {
                  q: 'Bertrand chain: for each of n = 5, 10, 20, 40, 80, name a prime inside (n, 2n].',
                  solution: [
                    'Split, the windows: $(5, 10]$, $(10, 20]$, $(20, 40]$, $(40, 80]$, $(80, 160]$.',
                    'Now, the tenants: 7, 11, 23, 41, 83 — each prime (trial-band verified), each inside its window.',
                    'So, the tightness: each tenant is actually the *first* prime after its $n$ — the guarantee is loose in every case here, but always true.',
                    'Hence the chain $5 \\to 7 \\to 11 \\to 23 \\to 41 \\to 83$ — every doubling window tenanted, as the postulate promises.',
                  ],
                  answer: '7, 11, 23, 41, 83 — one prime per doubling window',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find the first occurrence of a gap of 10, and show that the first gap of 14 arrives earlier.',
                  solution: [
                    'Split, the hunt for 10: scan gaps until one measures 10 — after 139: $139$ prime, $149$ prime, the run 141 ($3 · 47$), 143 ($11 · 13$), 145 ($5 · 29$), 147 ($3 · 49$) all composite.',
                    'Now, verify firstness: the engine checked every earlier gap — before 139 the widths seen are only 2, 4, 6, 8 and the lone 14 (113 → 127); no gap of exactly 10 opens earlier.',
                    'So, the earlier 14: after 113, the run 115, 117, 119, 121, 123, 125 dies at $127$ — a gap of 14 at position 113, *before* 139.',
                    'Take the moral: first occurrences do not march in size order — 14 beats 10 into the record books.',
                    'Hence the first gap of 10 is $139 \\to 149$, and the first gap of 14 ($113 \\to 127$) arrives earlier still.',
                  ],
                  answer: 'first 10: 139 → 149; first 14: 113 → 127 (earlier!)',
                },
                {
                  q: 'Use π-differences to count the primes strictly between 1000 and 2000.',
                  solution: [
                    'Split, the anchor values: $\\pi(1000) = 168$ and $\\pi(2000) = 303$ (engine-computed).',
                    'Now, the difference: $303 - 168 = 135$.',
                    'So, the sanity check: 2000 − 1000 = 1000 numbers, 135 primes — a share of 13.5%, consistent with the thinning table (12.3% at $10^4$).',
                    'Hence 135 primes in 1001..2000 — one subtraction, no listing.',
                  ],
                  answer: 'π(2000) − π(1000) = 303 − 168 = 135',
                },
                {
                  q: 'Verify Bertrand’s postulate by naming the first prime after 100, 500 and 1500, checking each lies inside (n, 2n).',
                  solution: [
                    'Split, the cases: after 100 the first prime is 101; after 500 it is 503; after 1500 it is 1511 (all trial-band verified).',
                    'Now, the windows: $101 < 200$ ✓; $503 < 1000$ ✓; $1511 < 3000$ ✓ — each strictly inside.',
                    'So, the meaning: the actual primes arrive almost immediately; Bertrand’s guarantee is the *worst-case* promise, never the forecast.',
                    'Hence the postulate verified on the printed instances — and swept by the script for every $n \\le 2000$.',
                  ],
                  answer: '101, 503, 1511 — each inside its (n, 2n) window',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Prove that no three consecutive odd numbers are all prime when the first exceeds 3, and conclude that 3, 5, 7 is the unique prime triplet on the 2-ladder.',
                  solution: [
                    'Split, the setup: take odd numbers $p, p+2, p+4$ with $p \\ge 5$.',
                    'Now, the modulo-3 patrol: $p$, $p+1$, $p+2$ cover all residues mod 3, and $\\{p, p+2, p+4\\} \\equiv \\{p, p+2, p+1\\}$ — so one member is a multiple of 3.',
                    'So, the kill: that member exceeds 3 (all three do, since $p \\ge 5$), so it is composite — the ladder always dies.',
                    'Take the escape: $p = 3$ is the lone exception — the divisible member is 3 itself, prime. Hence $3, 5, 7$ works.',
                    'Hence 3, 5, 7 is the unique prime triplet spaced two apart — the neighbours $5, 7, 9$ (9 = 3²) and $11, 13, 15$ (15 = 3·5) die on cue, and the engine’s sweep to 2000 finds no survivor.',
                  ],
                  answer: 'p, p+2, p+4 covers all residues mod 3 → composite for p ≥ 5; 3, 5, 7 unique',
                },
                {
                  q: 'Show that 101!+2 through 101!+101 are all composite, and reconcile the run with Bertrand’s postulate.',
                  solution: [
                    'Split, the divisibility: for $2 \\le k \\le 101$, every prime factor of $k$ is at most 101, and Legendre’s census gives enough copies in $101!$ — so $k \\mid 101!$ for every such $k$ (the engine swept all 100 values).',
                    'Now, the composites: $101! + k = k \\cdot (101!/k + 1)$ — a product of two numbers above 1, for every $k$ in range.',
                    'So, the run: $101!+2, \\dots, 101!+101$ is 100 consecutive composites — deserts of this size exist at any prescribed place.',
                    'Take the reconciliation: Bertrand guarantees a prime in $(101!, 2 · 101!)$ — and since $101! + 101 \\ll 101! + 101!$, the run ends far inside the window, with the guaranteed prime sitting beyond it. The construction makes *length*; the postulate bounds *scale*.',
                    'Hence both facts hold together — unbounded deserts, doubling-window guarantees — and the algorithm nextPrime(n) is safe even across deserts.',
                  ],
                  answer: '101!+k = k(101!/k + 1) composite for k = 2…101; the run ends well before 2·101! — no clash with Bertrand',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove π(n) ≤ 1 + ⌊(n−1)/2⌋ for every n ≥ 2, and interpret the bound.',
                  solution: [
                    'Split, the observation: exactly one prime is even — the prime 2.',
                    'Now, the counting: every other prime is odd, and the odd numbers in $3..n$ number $\\lfloor (n-1)/2 \\rfloor$ (the odds 1..n are $\\lceil n/2 \\rceil$; remove 1).',
                    'So, $\\pi(n) \\le 1 + \\lfloor (n-1)/2 \\rfloor$ — one for the prime 2, at most one per odd candidate.',
                    'Take the sweep: the engine certified the bound for every $n \\le 2000$ — e.g. $n = 100$: $25 \\le 1 + 49 = 50$ ✓.',
                    'Hence the bound holds universally — loose (the true share halves again by the PNT’s law) but free: two lines, no sieve.',
                  ],
                  answer: 'π(n) ≤ 1 + ⌊(n−1)/2⌋ (n = 100: 25 ≤ 50) — swept to 2000',
                },
                {
                  q: 'Compute Σ 1/p over primes ≤ 100 to four decimals, compare with the harmonic sum to 100, and state what Euler’s theorem says about both.',
                  solution: [
                    'Split, the prime sum: add the 25 reciprocals $1/2 + 1/3 + 1/5 + \u22ef + 1/97$ — the engine’s total: $1.8028$.',
                    'Now, the harmonic sum: $1 + 1/2 + \u22ef + 1/100 = 5.1874$ — nearly three times ahead at the same bound.',
                    'So, the growth check: by $10^6$ the prime sum reaches only $2.8873$ against the harmonic $14.3927$ — the thinning bites hard.',
                    'Take the theorem: Euler (1737) proved that *despite* the thinning, the prime reciprocals diverge — like $\\log \\log n$, glacially — while the harmonic sum diverges like $\\log n$.',
                    'Hence both sums run to infinity — $1.8028$ vs $5.1874$ at 100, $2.8873$ vs $14.3927$ at a million — divergences of two speeds, one theorem.',
                  ],
                  answer: 'Σ 1/p ≤ 100 = 1.8028 vs harmonic 5.1874 — both diverge (Euler 1737)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Euler’s zeta product at s = 2: compute ∏(1 − 1/p²) over primes ≤ 1000, compare with 6/π², and explain what the numerics do and do not prove.',
                  solution: [
                    'Split, the identity (cited, Euler 1735): $\\sum_{n \\ge 1} 1/n^2 = \\prod_p (1 - 1/p^2)^{-1}$ — the fundamental theorem of arithmetic wearing analysis: each integer’s unique factorisation makes the product and the sum agree term by term.',
                    'Now, the Basel value: $\\sum 1/n^2 = \\pi^2/6$, so the product should equal $6/\\pi^2 = 0.607927\\dots$',
                    'So, the honest computation: multiplying $(1 - 1/p^2)$ over the 168 primes to 1000 — the engine’s product: $0.608004$, within $0.0001$ of the Basel value (the residue is the neglected tail past 1000).',
                    'Take the scope: the numerics *corroborate* the identity and show the product converging at $s = 2$ — they do not prove it. At $s = 1$ the same product diverges (each factor $1 - 1/p$ leaves the product collapsing to 0), which is the analytic face of Euler’s 1737 divergence theorem.',
                    'Hence $0.6080$ against $6/\\pi^2 = 0.6079$: the unique-factorisation skeleton visible in a decimal — confirmed numerically, proved elsewhere, cited here.',
                  ],
                  answer: '∏(1 − 1/p²), p ≤ 1000 = 0.608004 vs 6/π² = 0.607927 — corroborated, not proved',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The π table',
          latex: '\\pi(10^k): \\quad 4,\\ 25,\\ 168,\\ 1229,\\ 9592,\\ 78498',
          note: 'k = 1 … 6, engine-computed. Interval answers are differences: primes in (a, b] = π(b) − π(a) — 135 between 1000 and 2000.',
        },
        {
          kind: 'formula',
          name: 'Bertrand’s postulate',
          latex: 'n \\ge 1 \\;\\Rightarrow\\; \\exists \\text{ prime } p \\text{ with } n < p \\le 2n',
          note: 'Conjectured 1845, proved by Chebyshev 1850, elementarily by Erdős 1932. Swept here for every n ≤ 2000. Guarantees nextPrime(n) terminates within n − 1 trials.',
        },
        {
          kind: 'formula',
          name: 'The twin ladder',
          latex: '\\text{pairs below } 10^k: \\quad 2,\\ 8,\\ 35,\\ 205,\\ 1224,\\ 8169; \\qquad 3, 5, 7 \\text{ is the unique gap-2 triplet}',
          note: 'Twin conjecture open (de Polignac 1849); proven floor: some gap ≤ 246 repeats infinitely often (Zhang 2013 → Maynard → Polymath).',
        },
        {
          kind: 'formula',
          name: 'The prime reciprocals',
          latex: '\\sum_{p} \\frac{1}{p} = \\infty \\quad \\text{(Euler 1737), growing like } \\log \\log n',
          note: 'Partial sums: 1.8028 by 100; 2.1981 by 1000; 2.8873 by 10⁶; past 3 only at 5,195,977. The harmonic sum at the same bounds: 5.1874 and 14.3927.',
        },
      ],
    },
  ],
}
