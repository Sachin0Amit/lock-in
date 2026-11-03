import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 3: Factors, Multiples and Primes
 *
 * LESSONS WRITTEN (UNIT 3 IN PROGRESS): 3.1 Divisibility and Its Tests.
 * Planned: 3.2 Prime Numbers and Factorisation · 3.3 Highest Common
 * Factor · 3.4 Lowest Common Multiple · 3.5 HCF, LCM and How They Relate.
 * Unit 3 of the unit-by-unit cadence (2026-11-03, one lesson per hourly
 * run). References: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 1 "Numbers" (tests of divisibility, prime/composite
 * definitions) + NCERT Class 6 ch. 3 "Playing with Numbers" topic coverage
 * — see docs/project/SOURCE_LOG.md. Exposition original; all arithmetic
 * verified by scripts/verify-unit-3.ts (96 checks) BEFORE writing.
 * Honours the ties promised in Lesson 2.4: the digit-sum screens become
 * the mod-9/mod-3 rules, the ÷10^n corollary becomes the tail tests, and
 * the remainder bound underlies "r = 0 means divisible".
 */
export const chapter03: Chapter = {
  number: 3,
  slug: 'factors-multiples-primes',
  title: 'Factors, Multiples and Primes',
  summary:
    'The multiplicative structure of whole numbers: divisibility tests with reasons, prime factorisation, HCF and LCM by three routes, and a first meeting with the infinitude of primes.',
  status: 'in-progress',
  plannedLessons: [
    'Prime Numbers and Factorisation',
    'Highest Common Factor',
    'Lowest Common Multiple',
    'HCF, LCM and How They Relate',
  ],
  lessons: [
    {
      id: 'fm-divisibility-and-its-tests',
      number: '3.1',
      title: 'Divisibility and Its Tests',
      concepts: [
        'Divisible means remainder zero',
        'Factors and multiples',
        'Tail tests for 2, 5, 10, 4, 25, 8, 125',
        'Digit-sum tests for 9 and 3',
        'Alternating-sum test for 11',
        'Compound tests and the coprime split',
        'The double-and-subtract test for 7',
      ],
      objectives: [
        'Define divisibility through the division algorithm of Lesson 2.4 — d divides n exactly when the remainder is 0 — and use the d | n notation',
        'Apply the tail tests for 2, 5, 10, 4, 25, 8 and 125, and derive them from the fact that 10^k = 2^k × 5^k',
        'Prove the digit-sum tests for 9 and 3, apply the alternating-sum test for 11, and read actual remainders off both',
        'Screen any number against every divisor from 2 to 12 in seconds, using the cheapest test first — and know why the parts in a compound test must be coprime',
      ],
      prerequisites: ['fm-numbers-digits-place-value', 'fm-addition-carrying', 'fm-division-remainders-zero'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch3'],
      blocks: [
        {
          kind: 'para',
          text: 'A confectioner has baked $2{,}340$ sweets and wants to fill $9$ gift jars with equal counts. Does the plan work? Lesson 2.4 answers with a long division: $2{,}340 \\div 9 = 260$ remainder $0$ — yes, $260$ sweets per jar, nothing left over. But notice what the long division cost: four column-walks, several subtractions, a full minute of careful bookkeeping. Now imagine the exam hall, where a paper asks whether $4{,}896$ is divisible by $12$ — and then twenty more questions in the same spirit. Long division would burn the clock. Yet the confectioner\'s question has a five-second answer: the digit sum of $2{,}340$ is $2 + 3 + 4 + 0 = 9$, and Lesson 2.1 taught us that a digit sum of $9$ means the number is a multiple of $9$. The plan works — known without dividing a single sweet.',
        },
        {
          kind: 'para',
          text: 'That shortcut is not one trick but a **family of screening tests**: cheap questions you can ask a numeral, read straight off its digits, whose answers decide divisibility without any division. This lesson builds the whole family — for $2, 3, 4, 5, 6, 7, 8, 9, 10, 11$ and $12$ — and, in keeping with this book\'s habit, builds every test with its **reason**. A memorised rule is a lucky charm; a derived rule is a tool you can repair, extend and trust. Three promises from earlier chapters come due here: Lesson 2.4\'s digit-sum screens grow into the mod-9 and mod-3 rules, its $\\div 10^n$ corollary grows into the "tail" tests, and the division algorithm itself supplies the very definition of divisible.',
        },
        { kind: 'heading', text: 'What "divisible" means: the treaty from Lesson 2.4' },
        {
          kind: 'para',
          text: 'Lesson 2.4 signed the division algorithm: for any whole numbers $n$ (the dividend) and $d$ (the divisor, never zero), there exist unique whole numbers $q$ (the quotient) and $r$ (the remainder) with $n = q \\times d + r$ and $0 \\le r < d$. Every division has exactly one such pair $(q, r)$ — and the remainder $r$ has only one way to be special. When $r = 0$, the division comes out **exact**: nothing is left over, the dividend is a perfect assembly of copies of the divisor. That single condition is the whole definition.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Divisible (the treaty condition)',
          text: 'A whole number $n$ is **divisible** by a whole number $d$ (with $d \\ne 0$) when the remainder upon dividing $n$ by $d$ is $0$ — equivalently, when $n = q \\times d$ for some whole number $q$. In symbols we write $d \\mid n$, read "$d$ divides $n$". So $6 \\mid 48$ because $48 = 8 \\times 6$; the notation $d \\nmid n$ means $d$ does not divide $n$. The remainder bound $0 \\le r < d$ from Lesson 2.4 is what makes the definition crisp: there is no third state between "remainder 0" and "remainder at least 1".',
        },
        {
          kind: 'para',
          text: 'The same fact wears two names, one for each end of the multiplication $n = q \\times d$. Looking from $d$\'s side: $d$ is a **factor** (or **divisor**) of $n$ — it goes into $n$ exactly. Looking from $n$\'s side: $n$ is a **multiple** of $d$ — it is what you get by multiplying $d$ by some whole number. $6 \\mid 48$ says "$6$ is a factor of $48$" and "$48$ is a multiple of $6$" in one breath. The factor pairs of $48$ make the picture concrete: $1 \\times 48$, $2 \\times 24$, $3 \\times 16$, $4 \\times 12$, $6 \\times 8$ — so $48$ has exactly ten factors, $1, 2, 3, 4, 6, 8, 12, 16, 24, 48$. Every pair found halves the search: once you know $3$ is a factor, $16$ comes free.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Divisible',
              def: 'n is divisible by d (written d | n) when n = q × d for some whole number q — equivalently, the remainder on division by d is 0. Example: 12 | 4,896 because 4,896 = 408 × 12.',
            },
            {
              term: 'Factor (divisor)',
              def: 'A number d that divides n exactly. 48 has ten factors: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. Factors come in pairs (d, n/d).',
            },
            {
              term: 'Multiple',
              def: 'A number n of the form q × d for whole numbers q — the "other end" of a factor pair. The multiples of 7 are 7, 14, 21, 28, … and never stop.',
            },
            {
              term: 'Digit sum',
              def: 'The sum of a number\'s digits, written S(n). S(4,731) = 4 + 7 + 3 + 1 = 15. The digit sum decides divisibility by 9 and 3 — and only by 9 and 3.',
            },
            {
              term: 'Alternating digit sum',
              def: 'The digits added with alternating + and − signs, starting with + at the units digit. For 2,728: 8 − 2 + 7 − 2 = 11. It decides divisibility by 11.',
            },
            {
              term: 'Coprime factors',
              def: 'Two factors sharing no common factor above 1, such as 3 and 4 (but not 2 and 6, which share 2). A compound divisibility test must split the divisor into coprime parts.',
            },
            {
              term: 'Divisibility test',
              def: 'A cheap check, readable from the digits alone, that decides whether d | n without performing the division. Each test works because of a hidden structure in place value.',
            },
          ],
        },
        {
          kind: 'para',
          text: 'Two asymmetries are worth fixing now, because exam questions probe them. **Factors are finite; multiples are infinite.** No factor of $n$ (for $n \\ge 1$) exceeds $n$ itself — a larger number cannot fit inside $n$ a whole number of times — so the factors of $48$ stop at $48$. But the multiples of $48$ run on forever: $48, 96, 144, \\ldots$ Below $100$ there are exactly fourteen multiples of $7$ (from $7 \\times 1$ up to $7 \\times 14 = 98$; the next, $105$, overshoots). **The edges behave with Lesson 2.4\'s blessing.** The number $1$ divides everything ($n = n \\times 1$); every whole number divides $0$ ($0 = 0 \\times d$, matching $0 \\div b = 0$ being legal); and $0$ itself divides nothing but zero — and $0 \\div 0$ stayed bricked shut in Lesson 2.4, so $0 \\mid n$ is simply never legal in practice. These are not footnotes; they are the answers to an entire row of trick questions.',
        },
        {
          kind: 'formula',
          name: 'The divisibility treaty',
          latex: 'd \\mid n \\;\\Longleftrightarrow\\; n = q \\cdot d \\;(\\text{some whole } q) \\;\\Longleftrightarrow\\; r = 0 \\text{ in } n = q \\cdot d + r',
          note: 'Three phrasings, one fact: exact factorisation, zero remainder. The middle form names d a factor of n and n a multiple of d. Always with d ≠ 0.',
        },
        { kind: 'heading', text: 'Family 1: the tail tests — 2, 5, 10, 4, 25, 8, 125' },
        {
          kind: 'para',
          text: 'The number $10$ is the puppet-master of place value, and $10$ factors as $2 \\times 5$ — it hands out exactly one $2$ and one $5$ per seat. Climbing the seats multiplies the handout: $100 = 2^2 \\times 5^2$, $1{,}000 = 2^3 \\times 5^3$, and in general $10^k = 2^k \\times 5^k$. Now split any number at the point where the $10^k$ seats begin. Take $5{,}836 = 58 \\times 100 + 36$: the "$58$ hundreds" part is built entirely from hundreds, and since $100$ is divisible by $4$ and by $25$, that whole part is divisible by $4$ and by $25$ — it contributes **zero remainder** either way. So the remainder of $5{,}836$ on division by $4$ (or by $25$) is decided entirely by the tail $36$. The full number inherits whatever verdict the tail earns.',
        },
        {
          kind: 'derivation',
          title: 'The tail theorem',
          statement:
            'The last k digits of a number decide its divisibility by 2^k and by 5^k. In particular: the last two digits decide divisibility by 4 and 25; the last three decide divisibility by 8 and 125.',
          steps: [
            {
              label: 'Split the number at the tail',
              formula: 'n = A \\cdot 10^k + B, \\quad B = \\text{the last } k \\text{ digits}',
              explanation:
                'A is everything to the left of the tail. Example: 5,836 = 58 × 100 + 36, so A = 58, B = 36, k = 2.',
            },
            {
              label: 'The head contributes no remainder',
              formula: '2^k \\mid 10^k \\text{ and } 5^k \\mid 10^k, \\text{ since } 10^k = 2^k \\times 5^k',
              explanation:
                'Every seat above the tail is a power of 10, and 10^k is a clean multiple of both 2^k and 5^k. So A · 10^k leaves remainder 0 on division by 2^k (and by 5^k) — the head vanishes from the verdict.',
            },
            {
              label: 'The tail decides alone',
              formula: 'n \\equiv B \\pmod{2^k} \\quad \\text{and} \\quad n \\equiv B \\pmod{5^k}',
              explanation:
                'Remainders add, and the head adds zero: whatever remainder B leaves, n leaves the same. Divisibility — remainder exactly 0 — transfers too: 4 | n exactly when 4 | B.',
            },
          ],
          result:
            'The last 1 digit decides ÷2, ÷5, ÷10 (10 = 2 × 5); the last 2 digits decide ÷4 and ÷25 (100 = 4 × 25); the last 3 decide ÷8 and ÷125 (1,000 = 8 × 125). One theorem, seven tests.',
        },
        {
          kind: 'para',
          text: 'This is Lesson 2.4\'s $\\div 10^n$ corollary coming back as a divisibility engine. There we learned that the remainder on dividing by $10^n$ **is** the last $n$ digits — $48{,}216$ leaves $216$ on division by $1{,}000$. The tail theorem extends the idea to divisors that *build* the powers of ten: $8$ and $125$ build $1{,}000$, so the last three digits decide them both. Watching it work: $5{,}836$ passes the $4$-test because $36 = 4 \\times 9$ — and indeed $5{,}836 \\div 4 = 1{,}459$ exactly — but fails the $25$-test because $36$ leaves remainder $11$ on division by $25$ — and indeed $5{,}836 = 25 \\times 233 + 11$. The tail even reports the **size** of the failure. Likewise $48{,}216$ passes the $8$-test because $216 = 8 \\times 27$ (full check: $48{,}216 \\div 8 = 6{,}027$) and fails the $125$-test with $216 = 125 + 91$ (full check: $48{,}216 = 125 \\times 385 + 91$). And $13{,}675$ passes the $25$-test since it ends in $75$: $13{,}675 \\div 25 = 547$.',
        },
        {
          kind: 'formula',
          name: 'Tail test',
          latex: '2^k \\mid n \\;\\Longleftrightarrow\\; 2^k \\mid (\\text{last } k \\text{ digits of } n), \\qquad 5^k \\mid n \\;\\Longleftrightarrow\\; 5^k \\mid (\\text{last } k \\text{ digits of } n)',
          note: 'k = 1: divisors 2, 5, 10. k = 2: divisors 4, 25. k = 3: divisors 8, 125. The ladder climbs one digit per power. For ÷10 the tail is simply "ends in 0".',
        },
        { kind: 'heading', text: 'Family 2: the digit-sum tests — 9 and 3' },
        {
          kind: 'para',
          text: 'Lesson 2.1 used the digit sum as a **checksum** — a guard against addition errors — and Lesson 2.4 met it again as a **fingerprint**. The reason it worked was stated but not yet milked: every seat\'s value $10^k$ is one more than a string of nines, so each seat contributes only a $1$ to the residue mod $9$. Now collect the full harvest. Take $4{,}731 = 4 \\times 1{,}000 + 7 \\times 100 + 3 \\times 10 + 1$ and rewrite every power of ten as nines-plus-one:',
        },
        {
          kind: 'equation',
          latex: '4{,}731 = (4 \\times 999 + 4) + (7 \\times 99 + 7) + (3 \\times 9 + 3) + 1 = (\\text{a pile of nines}) + (4 + 7 + 3 + 1)',
          note: 'Each seat splits into a multiple of 9 (which 9 happily divides) plus the digit itself. What survives for 9 to judge is exactly the digit sum.',
        },
        {
          kind: 'derivation',
          title: 'The digit-sum theorem',
          statement:
            'A number and its digit sum leave the same remainder on division by 9 — and on division by 3. So 9 | n exactly when 9 | S(n), and 3 | n exactly when 3 | S(n).',
          steps: [
            {
              label: 'Every power of ten is one more than a multiple of nine',
              formula: '10 = 9 + 1, \\quad 100 = 99 + 1, \\quad 1000 = 999 + 1, \\quad \\ldots',
              explanation:
                '10^k is written as k nines followed by a 1, so 10^k − 1 is a string of k nines — always a multiple of 9. Each power of ten leaves remainder exactly 1 on division by 9.',
            },
            {
              label: 'Expand n seat by seat and discard the nines',
              formula: 'n = \\sum d_i \\cdot 10^i \\equiv \\sum d_i \\cdot 1 = S(n) \\pmod{9}',
              explanation:
                'Replacing each 10^i by its remainder 1 turns the number into its own digit sum. For 4,731: the pile of nines from the equation above vanishes on division by 9, leaving 4 + 7 + 3 + 1 = 15.',
            },
            {
              label: 'Chain the digit sum down to one digit if you like',
              formula: 'S(4{,}731) = 15, \\quad S(15) = 6, \\quad \\text{and indeed } 4{,}731 = 9 \\times 525 + 6',
              explanation:
                'The remainder of 4,731 on ÷9 is 6, and 15 also leaves 6 (15 = 9 + 6). You may repeat the digit-summing — "casting out nines" — until one digit remains; the answer is the remainder, with 9 playing the role of 0.',
            },
            {
              label: 'Why 3 rides along free',
              formula: '9 = 3 \\times 3 \\;\\Rightarrow\\; 10^k \\equiv 1 \\pmod{3} \\text{ as well}',
              explanation:
                'Anything divisible by 9 is divisible by 3, so all those nines-piles also vanish mod 3. The identical test therefore screens for 3: 15 is divisible by 3, and so is 4,731 (4,731 ÷ 3 = 1,577).',
            },
          ],
          result:
            'n ≡ S(n) (mod 9) and (mod 3). Divisibility by 9 or 3 is decided by the digit sum — the checksum of Lesson 2.1, promoted from guard to theorem.',
        },
        {
          kind: 'para',
          text: 'The medieval name for the one-digit shortcut is **casting out nines**: since $9$ contributes nothing to a residue mod $9$, you may drop any $9$s you meet mid-sum. For $4{,}731$: $4 + 7 = 11$, drop a nine to keep $2$; $3 + 1 = 4$; then $2 + 4 = 6$ — the same remainder six, reached without ever totalling fifteen. Merchants ran their ledgers through this cast for centuries before anyone wrote the congruence down. Notice the dual payoff: the test does not merely say yes or no, it hands you the **remainder itself**. The confectioner\'s $2{,}340$ has digit sum $9$ — remainder $0$, jars divide evenly. A number with digit sum $15$ would leave remainder $6$ (as $4{,}731$ does). The screen answers "how far short of exact?" and "exactly?" with the same glance.',
        },
        {
          kind: 'formula',
          name: 'Digit-sum test',
          latex: 'n \\equiv S(n) \\pmod{9} \\quad \\text{and} \\quad n \\equiv S(n) \\pmod{3}',
          note: '9 | n ⟺ 9 | S(n); 3 | n ⟺ 3 | S(n). Repeat the digit sum to one digit for speed (casting out nines); 9 stands for remainder 0. The screen also reports the remainder itself.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The digit-sum test belongs to 9 and 3 — and to nobody else',
          text: 'The screen\'s biggest impersonation trap: "the digit sum is divisible by 6, so the number is divisible by 6." False. The digit sum $12$ of $921$ is divisible by $6$, yet $921$ is **odd** — $921 \\div 6 = 153.5$. What is true: $S(921) = 12$ is divisible by $3$, so $921$ is divisible by $3$ ($921 \\div 3 = 307$). The theorem $n \\equiv S(n)$ holds only mod $9$ and mod $3$ — no other divisor of the digit sum inherits the verdict, because no other small divisor leaves remainder $1$ on every power of ten. The digit sum $27$ of $87{,}543$ certifies division by $9$ and $3$; the number\'s oddness independently vetoes $6$. Two tests, two jobs — never merge them.',
        },
        { kind: 'heading', text: 'Family 3: the alternating test — 11' },
        {
          kind: 'para',
          text: 'Nine owns the pattern "every power of ten leaves remainder $1$." Eleven owns the next best thing: powers of ten leave remainders that **alternate** $-1, +1, -1, +1, \\ldots$ That is immediate from two small facts: $10 = 11 - 1$, so $10 \\equiv -1 \\pmod{11}$; and $100 = 99 + 1$, so $100 \\equiv +1 \\pmod{11}$. Squaring and cubing just re-apply the two patterns, since $(-1)^2 = +1$ and $(-1)^3 = -1$. So when a number is expanded seat by seat, the seats contribute their digits with **alternating signs** — and the sum of those signed digits carries the whole verdict.',
        },
        {
          kind: 'derivation',
          title: 'The alternating-sum theorem',
          statement:
            'A number is divisible by 11 exactly when its alternating digit sum (starting with + at the units digit) is divisible by 11 — including the case "equals 0".',
          steps: [
            {
              label: 'Powers of ten alternate ±1 mod 11',
              formula: '10 \\equiv -1, \\quad 10^2 \\equiv +1, \\quad 10^3 \\equiv -1, \\quad \\ldots \\pmod{11}',
              explanation:
                '10 = 11 − 1 gives the first; multiplying the congruence by 10 (equivalently, flipping the sign) generates the rest. 100 = 99 + 1 confirms the +1 directly.',
            },
            {
              label: 'Expand n with alternating signs',
              formula: 'n = d_0 + 10 d_1 + 100 d_2 + \\cdots \\equiv d_0 - d_1 + d_2 - d_3 + \\cdots \\pmod{11}',
              explanation:
                'Each seat\'s power of ten is replaced by its remainder, +1 or −1. The result is the alternating digit sum, read from the units end with a starting +.',
            },
            {
              label: 'Try it: 2,728',
              formula: '8 - 2 + 7 - 2 = 11 \\;\\Rightarrow\\; 11 \\mid 2{,}728',
              explanation:
                'The alternating sum is 11 — divisible by 11 — so the number must be. Full check: 2,728 ÷ 11 = 248 exactly. And 1,012 gives 2 − 1 + 0 − 1 = 0, which counts as divisible: 1,012 ÷ 11 = 92.',
            },
          ],
          result:
            'n ≡ (d₀ − d₁ + d₂ − …) (mod 11), reading from the units digit. Zero or a multiple of ±11 certifies divisibility; any other value is (up to sign) the remainder itself.',
        },
        {
          kind: 'para',
          text: 'Like the digit-sum test, the alternating screen **reports remainders**, which makes it a double-duty tool. $91{,}083$ has alternating sum $3 - 8 + 0 - 1 + 9 = 3$: not divisible, and the true remainder on division by $11$ is exactly $3$ — indeed $91{,}083 = 11 \\times 8{,}280 + 3$. A negative sum just borrows from the next multiple of $11$: $43{,}291$ gives $1 - 9 + 2 - 3 + 4 = -5$, and $-5$ means remainder $6$ (add $11$) — indeed $43{,}291 = 11 \\times 3{,}935 + 6$. And when the exam-hall number $4{,}896$ is screened, its alternating sum $6 - 9 + 8 - 4 = 1$ will be confirmed to the last unit: $4{,}896 = 11 \\times 445 + 1$. One convention keeps every sign straight: start the $+$ at the **units digit** and march left. Starting from the left end instead merely flips the overall sign — harmless for divisibility, but it turns remainder $3$ into $-3$, so fix the habit early.',
        },
        {
          kind: 'formula',
          name: 'Alternating test for 11',
          latex: 'n \\equiv d_0 - d_1 + d_2 - d_3 + \\cdots \\pmod{11}',
          note: 'Start + at the units digit. Verdict: alternating sum ≡ 0 (mod 11) ⟺ 11 | n. Otherwise the sum (adjusted into 0…10 by ±11) is the remainder on division by 11.',
        },
        { kind: 'heading', text: 'Family 4: compound tests — 6, 12, 15, 18, 24, 88' },
        {
          kind: 'para',
          text: 'Some divisors have no family of their own but are **products** of divisors that do. The principle: to test a product, run the tests for its factors — *provided the factors are coprime*. $6 = 2 \\times 3$: a number is divisible by $6$ exactly when it is even **and** its digit sum is divisible by $3$. The number $2{,}376$ passes both screens (it is even; $2 + 3 + 7 + 6 = 18$), so $6 \\mid 2{,}376$ — and indeed $2{,}376 \\div 6 = 396$. The same number passes $3$ and $4$ (last two digits $76 = 4 \\times 19$), so $12 \\mid 2{,}376$ — and indeed $2{,}376 \\div 12 = 198$. Other useful splits, each verified on the spot: $18 = 2 \\times 9$ — $4{,}788$ is even with digit sum $27$, and $4{,}788 \\div 18 = 266$; $15 = 3 \\times 5$ — $4{,}965$ has digit sum $24$ and ends in $5$, and $4{,}965 \\div 15 = 331$; $24 = 3 \\times 8$ — $9{,}888$ has digit sum $42$ and ends $888 = 8 \\times 111$, and $9{,}888 \\div 24 = 412$; even $88 = 8 \\times 11$ — $12{,}144$ ends in $144 = 8 \\times 18$ with alternating sum $4 - 4 + 1 - 2 + 1 = 0$, and $12{,}144 \\div 88 = 138$.',
        },
        {
          kind: 'derivation',
          title: 'Why the parts must be coprime',
          statement:
            'For coprime p and q: q·p divides n exactly when p | n and q | n. For non-coprime parts the test over-admits — it approves numbers the divisor does not divide.',
          steps: [
            {
              label: 'The working direction (coprime case)',
              formula: 'p \\mid n,\\ q \\mid n,\\ \\gcd(p, q) = 1 \\;\\Rightarrow\\; pq \\mid n',
              explanation:
                'If p and q share no factor, their "claims" on n cannot overlap: everything q requires beyond what p already supplied is still available. The split 12 = 3 × 4 is honest: 4,896 passes 3 (digit sum 27) and 4 (last two 96), and 4,896 ÷ 12 = 408 confirms.',
            },
            {
              label: 'The over-admission (shared factor)',
              formula: '12 = 2 \\times 6, \\quad \\gcd(2, 6) = 2 \\ne 1',
              explanation:
                'Being divisible by 2 and by 6 does not force divisibility by 12, because 2 and 6 both draw on the same supply of 2s. Counterexample: 18 is even (18 = 2 × 9) and divisible by 6 (18 = 6 × 3), yet 18 ÷ 12 = 1.5 — not a whole number.',
            },
            {
              label: 'The repair rule',
              formula: '\\text{split } d \\text{ into the most coprime pair available}',
              explanation:
                'For 12 use 3 × 4, not 2 × 6. For 6 use 2 × 3. For 18 use 2 × 9, not 3 × 6. When no coprime split exists among tested divisors — as for 7, 11, 13, 17, 19 — the divisor needs a test of its own.',
            },
          ],
          result:
            'Compound test, stated safely: d = p × q with gcd(p, q) = 1 divides n exactly when both p | n and q | n. The coprime check is not pedantry — skipping it produces wrong answers, as 18 shows.',
        },
        { kind: 'heading', text: 'Family 5: the stubborn 7' },
        {
          kind: 'para',
          text: 'Seven refuses every trick so far. It divides no power of ten ($10 = 7 + 3$, $100 = 7 \\times 14 + 2$, $1{,}000 = 7 \\times 142 + 6$ — the remainders $1, 3, 2, 6, 4, 5$ cycle through six values and never settle on $1$ the way nine\'s do, nor alternate $\\pm 1$ the way eleven\'s do). No tail test, no digit-sum test, no alternating test. And it has no coprime split among small divisors, being prime. Seven needs a gadget of its own — and the gadget that works is this: **double the units digit, subtract it from the rest.** For $448$: double $8$ to get $16$; $44 - 16 = 28$; since $28 = 7 \\times 4$ is divisible by $7$, so is $448$.',
        },
        {
          kind: 'derivation',
          title: 'The double-and-subtract test',
          statement:
            'Writing n = 10a + b (a = the number without its units digit, b = the units digit): 7 divides n exactly when 7 divides a − 2b.',
          steps: [
            {
              label: 'Double n and rearrange',
              formula: '2n = 20a + 2b = 21a - (a - 2b)',
              explanation:
                'The quantity a − 2b is exactly "the rest minus twice the units digit" — the test\'s chain value. The rearrangement exhibits 2n as 21a (a multiple of 7) minus that chain value.',
            },
            {
              label: 'Cancellation is legal',
              formula: '\\gcd(2, 7) = 1 \\;\\Rightarrow\\; 7 \\mid 2n \\Longleftrightarrow 7 \\mid n',
              explanation:
                'Seven is odd, so doubling cannot smuggle a factor of 7 into a number that lacked one: 2n is divisible by 7 exactly when n is. (Lesson 2.4\'s division algorithm stands behind this: if 7 | 2n but 7 ∤ n, the remainder r of n would satisfy 2r ≡ 0 with 1 ≤ r ≤ 6 — impossible.)',
            },
            {
              label: 'Read the equivalence off the rearrangement',
              formula: '7 \\mid n \\Longleftrightarrow 7 \\mid 2n \\Longleftrightarrow 7 \\mid (a - 2b)',
              explanation:
                '2n = 21a − (a − 2b): if 7 divides both 2n and 21a, it must divide their difference a − 2b; and conversely. The test is exact — an equivalence, not a heuristic.',
            },
          ],
          result:
            '7 | n ⟺ 7 | (a − 2b), where a is n without its units digit and b is the units digit. Repeat the step until the verdict is obvious — the chain shrinks fast.',
        },
        {
          kind: 'para',
          text: 'The chain is the pleasure of this test. Take $2{,}401 = 7^4$: double $1$, subtract — $240 - 2 = 238$; double $8$, subtract — $23 - 16 = 7$; and $7$ is divisible by $7$. The chain walked the number down its own ladder of powers: $2{,}401 = 7^4$, then $238 = 7 \\times 34$, then $7$. A number that fails, fails just as cleanly: $1{,}000$ gives $100 - 0 = 100$, then $10 - 0 = 10$, and $10$ is not a multiple of $7$ — matching the long division $1{,}000 = 7 \\times 142 + 6$. One honesty note, in this book\'s tradition: the chain preserves the **divisibility verdict**, not the remainder. Each application multiplies the residue by $-2$ (the rearrangement shows $a - 2b \\equiv -2n \\pmod 7$), so a remainder of $6$ becomes $2$, then $3$ — never zero unless it started zero, which is exactly why the yes/no answer is trustworthy while the chain\'s leftover number is not the original remainder.',
        },
        {
          kind: 'figure',
          caption:
            'The screening desk. A number enters at the top and passes through six screens, cheapest first. The first three screens read only tail digits (Family 1); the fourth adds the digits (Family 2); the fifth adds them with alternating signs (Family 3); the sixth either splits the divisor into coprime parts (Family 4) or, for the stubborn 7, doubles the units digit and subtracts (Family 5). No screen performs a division — each exploits one hidden structure of place value.',
          svg: `<svg viewBox="0 0 760 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flowchart of the six divisibility screens, from tail digits through digit sums to the split and the seven test">
  <g font-size="13" fill="currentColor">
    <text x="380" y="26" text-anchor="middle" font-weight="700">the number enters the screening desk</text>
    <line x1="380" y1="36" x2="380" y2="52" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
    <g text-anchor="middle">
      <rect x="200" y="54" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="79" font-weight="700">look at the last digit</text>
      <text x="620" y="79" fill="#b45309" font-weight="700">2 · 5 · 10</text>
      <line x1="380" y1="94" x2="380" y2="112" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="114" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="139" font-weight="700">look at the last two digits</text>
      <text x="620" y="139" fill="#b45309" font-weight="700">4 · 25</text>
      <line x1="380" y1="154" x2="380" y2="172" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="174" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="199" font-weight="700">look at the last three digits</text>
      <text x="620" y="199" fill="#b45309" font-weight="700">8 · 125</text>
      <line x1="380" y1="214" x2="380" y2="232" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="234" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="259" font-weight="700">add all the digits</text>
      <text x="620" y="259" fill="#b45309" font-weight="700">3 · 9</text>
      <line x1="380" y1="274" x2="380" y2="292" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="294" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="319" font-weight="700">add digits with alternating signs</text>
      <text x="620" y="319" fill="#b45309" font-weight="700">11</text>
      <line x1="380" y1="334" x2="380" y2="352" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="354" width="300" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
      <text x="350" y="379" font-weight="700">split the divisor into coprime parts</text>
      <text x="620" y="379" fill="#b45309" font-weight="700">6 · 12 · 15 · 18 · 24 · 88</text>
      <line x1="380" y1="394" x2="380" y2="412" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <rect x="200" y="414" width="300" height="40" rx="10" fill="none" stroke="#b45309" stroke-width="1.5"/>
      <text x="350" y="439" font-weight="700" fill="#b45309">double the unit digit and subtract</text>
      <text x="620" y="439" fill="#b45309" font-weight="700">7</text>
    </g>
    <line x1="380" y1="454" x2="380" y2="470" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
    <text x="380" y="492" text-anchor="middle" opacity="0.8">every screen asks one question: does the remainder come out 0?</text>
    <text x="380" y="510" text-anchor="middle" opacity="0.55">labels on the right name the divisors each screen decides</text>
  </g>
</svg>`,
        },
        {
          kind: 'table',
          caption: 'The master test table for 2 through 12, each with a verified instance',
          head: ['Divisor', 'Screen to run', 'Passes when…', 'Verified instance'],
          rows: [
            ['2', 'last digit', 'digit is 0, 2, 4, 6 or 8', '$4{,}896$ — ends in 6 (yes: $2{,}448 \\times 2$)'],
            ['3', 'digit sum', '$S(n)$ divisible by 3', '$4{,}896$: $S = 27$ (yes: $1{,}632 \\times 3$)'],
            ['4', 'last two digits', 'tail divisible by 4', '$4{,}896$ ends in 96 (yes: $1{,}224 \\times 4$)'],
            ['5', 'last digit', 'digit is 0 or 5', '$4{,}965$ ends in 5 (yes: $993 \\times 5$)'],
            ['6', '2-test + 3-test', 'even and $S(n)$ divisible by 3', '$2{,}376$ (yes: $396 \\times 6$)'],
            ['7', 'double the unit, subtract', 'chain reaches a multiple of 7', '$2{,}401 \\to 238 \\to 7$ (yes: $343 \\times 7$)'],
            ['8', 'last three digits', 'tail divisible by 8', '$48{,}216$ ends in 216 (yes: $6{,}027 \\times 8$)'],
            ['9', 'digit sum', '$S(n)$ divisible by 9', '$4{,}896$: $S = 27$ (yes: $544 \\times 9$)'],
            ['10', 'last digit', 'digit is 0', '$2{,}730$ ends in 0 (yes: $273 \\times 10$)'],
            ['11', 'alternating digit sum', 'sum is 0 or a multiple of 11', '$2{,}728$: $8-2+7-2 = 11$ (yes: $248 \\times 11$)'],
            ['12', '3-test + 4-test', 'both pass (3, 4 coprime)', '$4{,}896$ (yes: $408 \\times 12$)'],
          ],
        },
        {
          kind: 'algorithm',
          title: 'Screening a number n against a divisor d',
          lines: [
            { code: 'IF d has a tail test (2, 5, 10, 4, 25, 8, 125): read the last 1, 2 or 3 digits of n and test those.', note: 'Cheapest of all — no arithmetic beyond a tiny division of the tail.' },
            { code: 'ELSE IF d is 9 or 3: compute the digit sum S(n) (casting out nines as you go) and test it.', note: 'Also reports the remainder: S(n) reduced mod 9.' },
            { code: 'ELSE IF d is 11: alternate the digits from the units end (+, −, +, …) and test the total.', note: 'Also reports the remainder, up to sign.' },
            { code: 'ELSE IF d splits into coprime tested parts (6, 12, 15, 18, 24, 88, …): run each part\'s test.', note: 'Check the coprime condition — 12 uses 3 × 4, never 2 × 6.' },
            { code: 'ELSE IF d is 7 (or 13, 17, 19 — see the exercises): run the unit-digit gadget chain to a small verdict.', note: 'Double-and-subtract for 7; the exercises derive its cousins.' },
            { code: 'Report: divisible (remainder 0) or the remainder itself, when the screen provides one.', note: 'Every yes here would also fall out of long division — at ten times the cost.' },
          ],
          note:
            'The order is the cost order: tail reads beat digit sums, digit sums beat gadgets. An exam hall rewards running the cheapest screen that answers the question asked.',
        },
        {
          kind: 'example',
          title: 'The full screen: 4,896 against 2, 3, 4, 6, 7, 8, 9, 11, 12',
          steps: [
            'Tail screens: ends in 6 → divisible by 2 ($4{,}896 = 2 \\times 2{,}448$); ends in 96 → divisible by 4 ($96 = 4 \\times 24$, and $4{,}896 = 4 \\times 1{,}224$); ends in 896 → divisible by 8 ($896 = 8 \\times 112$, and $4{,}896 = 8 \\times 612$).',
            'Digit sum: $4 + 8 + 9 + 6 = 27$ → divisible by 9 ($4{,}896 = 9 \\times 544$) and by 3 ($4{,}896 = 3 \\times 1{,}632$).',
            'Compound: even + digit sum 27 → divisible by 6 ($4{,}896 = 6 \\times 816$); passes 3 and 4 → divisible by 12 ($4{,}896 = 12 \\times 408$) — the exam-hall question, answered in five seconds.',
            'Alternating: $6 - 9 + 8 - 4 = 1$ → not divisible by 11, remainder exactly 1. Long division agrees: $4{,}896 = 11 \\times 445 + 1$.',
            'Gadget: $489 - 12 = 477$, $47 - 14 = 33$, $3 - 6 = -3$ → not divisible by 7 (the chain value $-3$ is not a multiple of 7). Long division agrees: $4{,}896 = 7 \\times 699 + 3$.',
            'Verdict: divisible by 2, 3, 4, 6, 8, 9, 12; not by 7 (remainder 3) nor 11 (remainder 1). Nine verdicts, zero long divisions.',
          ],
        },
        {
          kind: 'para',
          text: 'Notice what the failed screens contributed: not merely "no", but "$8{,}96$ off" — the **remainder**, obtained without dividing. This is worth a dedicated habit. To find the remainder of $8{,}241$ on division by $9$: digit sum $8 + 2 + 4 + 1 = 15$, and $15$ leaves $6$ — so the remainder is $6$; indeed $8{,}241 = 9 \\times 915 + 6$. The same trick makes "find the missing digit" questions mechanical, and they are an examination staple. Suppose $27*4$ must be divisible by $3$. The known digits sum to $2 + 7 + 4 = 13$, so the full digit sum is $13 + *$, which must be a multiple of $3$: the candidates are $15$, $18$, $21$ — so $* \\in \\{2, 5, 8\\}$, giving $2{,}724 = 3 \\times 908$, $2{,}754 = 3 \\times 918$, $2{,}784 = 3 \\times 928$. If instead $7{,}2*8$ must be divisible by $9$: the known digits sum to $17$, the total must be a multiple of $9$, and the only reachable one is $18$ — so $* = 1$, and indeed $7{,}218 = 9 \\times 802$.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four classic screening traps',
          text: 'One: **the non-coprime split** — testing 2 and 6 for the divisor 12 approves 18, which 12 does not divide; always split into coprime parts (3 × 4 for 12). Two: **the digit-sum impersonation** — a digit sum divisible by 6 or 12 certifies only 3 (and 9 if the sum is bigger); it says nothing about 6, 12 or any other divisor of the sum. Three: **reading the 7-chain\'s leftover as a remainder** — the chain multiplies residues by −2 at every step; its final value decides yes/no but is not the remainder on ÷7. Four: **the edges** — 1 divides everything (so "prime?" questions exclude it later), every whole number divides 0, and "divisible by 0" is never legal. Each trap is a favourite distractor in exam options.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'One criterion to rule them all (Pascal, 1654)',
          text: 'Every screen in this lesson is a special case of a single criterion published by Blaise Pascal in 1654: to test divisibility by d (when d shares no factor with 10), find the remainders of 1, 10, 100, 1000, … on division by d, multiply each digit by its seat\'s remainder, and add — n is divisible by d exactly when that weighted sum is. Nine\'s seats all leave remainder 1 (giving the digit sum); eleven\'s seats alternate −1, +1 (giving the alternating sum); seven\'s seats cycle 1, 3, 2, 6, 4, 5 with period six — too restless for a one-glance rule, which is why seven needed its gadget. The weight-and-add recipe even explains the gadget: multiplying n = 10a + b by 2 converts ten\'s restless remainder 3 into 6 ≡ −1 (mod 7), taming the seat at the cost of doubling the digit. The older half of the story is merchant practice: "casting out nines" filled accounting ledgers centuries before Pascal — Fibonacci\'s Liber Abaci (1202) instructed traders in it — and the alternating rule for 11 served as the cast\'s double-entry twin, catching errors the nines alone would wave through.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Divisibility screens are the opening move of bank, SSC and Railway quantitative papers: "is 4,896 divisible by 12?"-style verdicts, find-the-missing-digit items ($27*4$ by 3, $7{,}2*8$ by 9 — both worked above), and remainder-without-division questions ($8{,}241 \\div 9$ leaves 6). NTSE and CUET aptitude papers favour the coprime trap ("18 is divisible by 2 and 6 — is it divisible by 12?") and chain questions on the 7-gadget. CBSE Class 7 and competitive-exam syllabi list the tests for 2–11 exactly as this lesson derives them (Khattar\'s chapter 1 drills them as "Tests of Divisibility"). The scoring habit: run the cheapest screen first, state the family you used, and quote the remainder when the screen provides one — examiners mark the method, and the method is five seconds long.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Is 5,616 divisible by 8?',
              options: [
                'No — the digit sum 18 is not divisible by 8',
                'No — the last two digits 16 are not divisible by 8',
                'Yes — the last three digits 616 = 8 × 77',
                'Cannot be decided without long division',
              ],
              answer: 2,
              explain:
                'The tail theorem for 8 reads only the last three digits: 616 = 8 × 77, so yes — 5,616 = 8 × 702 (Option 3). Option 1 invokes the wrong family: the digit sum screens for 9 and 3, never for 8. Option 2 runs the right test at the wrong length — 4 and 25 read two digits, 8 reads three. Option 4 is the reflex this lesson exists to retire.',
            },
            {
              q: 'The digit sum of 87,543 is 27. Which divisibility verdicts follow?',
              options: [
                'Divisible by 9, 3 and 6',
                'Divisible by 6 only',
                'Divisible by 9 and 11',
                'Divisible by 9 and by 3',
              ],
              answer: 3,
              explain:
                '27 is divisible by 9 and by 3, so 87,543 = 9 × 9,727 is too (Option 4). But 6 needs evenness as well, and 87,543 is odd — 87,543 ÷ 6 = 14,590.5. The digit-sum test certifies 9 and 3 and nothing else; 11 would need the alternating sum, which here reads 3 − 4 + 5 − 7 + 8 = 5 — not divisible.',
            },
            {
              q: '18 is divisible by 2 and by 6, but not by 12. Why did the compound test fail?',
              options: [
                '12 is larger than 6, so no test applies',
                '2 and 6 share the factor 2 — the parts must be coprime, and 12 = 3 × 4 is the correct split',
                '18 is odd, which blocks the 6-test',
                'The compound test only works for 6 and 12',
              ],
              answer: 1,
              explain:
                '12 = 2 × 6 with gcd(2, 6) = 2: both parts draw on the same factor of 2, so passing each does not force passing the product — 18 ÷ 12 = 1.5 (Option 2). The coprime split 12 = 3 × 4 is honest: a number passing 3 and 4 must pass 12 (as 4,896 does, 408 × 12). Option 3 is doubly wrong — 18 is even, and its 6-test genuinely passed.',
            },
            {
              q: 'The alternating digit sum of 1,012 (starting + at the units) is 2 − 1 + 0 − 1 = 0. What follows?',
              options: [
                '1,012 is divisible by 9',
                'Nothing — the sum must be positive to conclude anything',
                '1,012 is divisible by 11 — indeed 1,012 = 11 × 92',
                'The test only works when read from the left end',
              ],
              answer: 2,
              explain:
                'Zero is a multiple of 11 (0 = 11 × 0), so the verdict is yes: 1,012 = 11 × 92 (Option 3). Option 1 confuses families — the digit sum here is 4, so 9 does not divide 1,012. Option 2 denies the legal case "equals 0", which the theorem states explicitly. Option 4 has it backwards in spirit: reading from either end works, since reversing flips only the overall sign — but fixing the units-first convention keeps remainders honest.',
            },
            {
              q: 'Applying double-and-subtract to 3,192: 319 − 4 = 315, then 31 − 10 = 21, then 2 − 2 = 0. The verdict?',
              options: [
                'Not divisible — the digit sum 15 is not a multiple of 7',
                'Not divisible — 0 is not a multiple of 7',
                'Only long division can settle it',
                'Divisible by 7 — the chain reached 0, and 3,192 = 7 × 456',
              ],
              answer: 3,
              explain:
                'The chain landing on 0 certifies divisibility (0 = 7 × 0 is a multiple of 7): 3,192 = 7 × 456 (Option 4). Option 1 runs the wrong screen — digit sums decide 9 and 3 only. Option 2 misstates the arithmetic: 0 is divisible by every nonzero number. Option 3 forgets why the gadget is legal: 2n = 21a − (a − 2b) with gcd(2, 7) = 1 makes the test an exact equivalence, derived — not guessed.',
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
                  q: 'List the first five multiples of 13, and decide whether 91 is a multiple of 13.',
                  solution:
                    'Multiples of 13: $13, 26, 39, 52, 65$ (that is $13 \\times 1$ through $13 \\times 5$). For 91, screen directly: does $13 \\times 7$ land there? $13 \\times 7 = 91$ — yes, 91 is the seventh multiple. (A quick cross-check the other way: $91 = 7 \\times 13$, so 7 is a factor of 91 and 91 is a multiple of 7 — the same multiplication read from both ends.)',
                },
                {
                  q: 'Find all factors of 48 by walking its factor pairs in order.',
                  solution:
                    'Pair from both ends: $1 \\times 48$, then $2 \\times 24$ (48 is even), then $3 \\times 16$ (digit sum 12, divisible by 3), then $4 \\times 12$ (last two digits 48 pass the 4-test), then $6 \\times 8$ ($6$ passes via even + digit sum 12). The next candidate, 5, fails (48 does not end in 0 or 5), and $7 \\times 7 = 49$ overshoots — so the pairs close up at the square root. Factors: $1, 2, 3, 4, 6, 8, 12, 16, 24, 48$ — ten of them, five pairs.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Decide, with reasons, which of 2, 3, 4, 5, 6, 9, 10 divide 2,730 — without long division.',
                  solution:
                    'Ends in 0: divisible by 2, 5 and 10. Digit sum $2 + 7 + 3 + 0 = 12$: divisible by 3, not by 9 (12 is not a multiple of 9). Last two digits 30: not divisible by 4 (30 leaves 2), so 4 fails. Compound 6 = 2 × 3: even and digit sum divisible by 3, so divisible by 6 — indeed $2{,}730 \\div 6 = 455$. Verdicts: yes for 2, 3, 5, 6, 10; no for 4 and 9. (Cross-checks: $2{,}730 = 3 \\times 910 = 10 \\times 273$; on ÷9 the remainder is 3, matching the digit sum 12 leaving 3.)',
                },
                {
                  q: 'Does 2,376 pass the tests for 6 and for 12? Show each screen.',
                  solution:
                    'For 6 = 2 × 3: 2,376 is even, and its digit sum is $2 + 3 + 7 + 6 = 18$, divisible by 3 — both screens pass, so $6 \\mid 2{,}376$; indeed $2{,}376 \\div 6 = 396$. For 12 = 3 × 4 (coprime): the 3-screen passes (digit sum 18), and the 4-screen reads the last two digits 76 = 4 × 19 — both pass, so $12 \\mid 2{,}376$; indeed $2{,}376 \\div 12 = 198$. Note the discipline: 12 was tested as 3 × 4, never as 2 × 6 — the coprime split is what makes the two-pass verdict binding.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) Replace * with the digit that makes 84*2 divisible by 9, and verify your answer.',
                  solution:
                    'The digit-sum test: $8 + 4 + 2 = 14$, so the full digit sum is $14 + *$, which must be a multiple of 9. The only reachable multiple is 18, so $* = 4$. Verify: $8{,}442 = 9 \\times 938$ — exact. (Watch the trap: "divisible by 9" does not also demand evenness — 8,442 happens to be even, but that was not required by the 9-test.)',
                },
                {
                  q: 'Screen 91,083 against 11, 3 and 9. Where it fails, give the remainder — without long division.',
                  solution:
                    '11: alternating sum $3 - 8 + 0 - 1 + 9 = 3$ — not divisible, remainder 3. Indeed $91{,}083 = 11 \\times 8{,}280 + 3$. Digit sum: $9 + 1 + 0 + 8 + 3 = 21$ — divisible by 3 ($91{,}083 \\div 3 = 30{,}361$), not by 9 (21 leaves 3, and indeed the remainder on ÷9 is 3). Two different tests, coincidentally the same leftover 3 — the mod-9 and mod-11 remainders are independent facts that happen to agree here.',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Without dividing, find the remainder when 43,291 is divided by 9, and the remainder when it is divided by 11. Then verify both by reconstruction.',
                  solution:
                    'By 9: digit sum $4 + 3 + 2 + 9 + 1 = 19$, and $19 = 9 \\times 2 + 1$, so the remainder is 1. Verify: $43{,}291 = 9 \\times 4{,}810 + 1$. By 11: alternating sum $1 - 9 + 2 - 3 + 4 = -5$; adding 11 gives 6, so the remainder is 6. Verify: $43{,}291 = 11 \\times 3{,}935 + 6$. Both verifications confirm the screens to the last unit — the tests are not approximations but restatements of the division algorithm along different seats.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The a ± kb family. (a) Show that 13 divides n = 10a + b exactly when 13 divides a + 4b, and explain what makes the trick legal. (b) Run the chain on 2,795 and on 78, and describe what you observe about 26, 39 and 13 under the chain. (c) Derive the analogous test for 19 and verify it on 1,919. (d) State Pascal\'s 1654 criterion and explain why every divisor coprime to 10 must admit some test of this shape.',
                  solution:
                    '(a) Multiply n = 10a + b by 4: $4n = 40a + 4b = 39a + (a + 4b)$. Since 39a is a multiple of 13 and $\\gcd(4, 13) = 1$, dividing by 13 divides 4n exactly when it divides a + 4b — legality from cancellation, the same step that licensed the 7-gadget. (b) $2{,}795 = 13 \\times 215$: chain $279 + 20 = 299$, $29 + 36 = 65$, $6 + 20 = 26$ — and 26 is a fixed point: $2 + 24 = 26$. Similarly $78 = 13 \\times 6$ maps to $7 + 32 = 39$, and 39 is fixed: $3 + 36 = 39$. Every multiple of 13 lands on 13, 26 or 39 and stays; non-multiples (try 100 → 10 → 1) wander to small non-multiples. (c) For 19: multiply by 2, $2n = 20a + 2b = 19a + (a + 2b)$, with $\\gcd(2, 19) = 1$ — so test a + 2b. Verify: $1{,}919 = 19 \\times 101$; chain $191 + 18 = 209 = 19 \\times 11$, then $20 + 18 = 38 = 19 \\times 2$, then $3 + 16 = 19$. (d) Pascal\'s criterion: for d coprime to 10, compute each seat\'s remainder $10^i \\bmod d$, form the weighted digit sum, and divisibility by d is equivalent to that sum being divisible by d. Since 10 and d share no factor, the seats\' remainders form a repeating pattern, and the whole number compresses into a fixed small combination of its digits — so a finite, memorisable test always exists; the five families of this lesson are the cases where the pattern is specially simple (all 1s: 3 and 9; alternating ±1: 11; tame enough to need one gadget step: 7, 13, 17, 19).',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The screening desk is now staffed for every divisor from $2$ to $12$, and every screen runs on the same fuel: place value\'s hidden remainders. But step back and notice what the family portrait reveals. The divisors with clean, one-glance tests — $2, 4, 5, 8, 10$ — are exactly the ones built from $2$s and $5$s, the factors of ten itself. The divisors with digit tests — $3, 9$ — are the ones dividing $10 - 1$. Eleven divides $10 + 1$. And seven, dividing none of $9$, $10$, or $11$ cleanly, needed a gadget. Divisibility, it turns out, is a story about how a number relates to $10$ — and the natural next question is deeper: what does a number look like when we factor it **all the way down**, into parts that no longer factor at all? That is the business of primes, and Lesson 3.2 begins there.',
        },
      ],
    },
  ],
}

