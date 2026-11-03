import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 3: Factors, Multiples and Primes
 *
 * LESSONS WRITTEN (UNIT 3 IN PROGRESS): 3.1 Divisibility and Its Tests ·
 * 3.2 Prime Numbers and Factorisation · 3.3 Highest Common Factor.
 * Planned: 3.4 Lowest Common Multiple · 3.5 HCF, LCM and How They Relate.
 * Unit 3 of the unit-by-unit cadence (2026-11-03, one lesson per hourly
 * run). References: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 1 "Numbers" + ch. 2 "H.C.F. and L.C.M. of
 * Numbers" (prime-factorisation and division methods for the H.C.F.,
 * greatest-number exam patterns) + NCERT Class 6 ch. 3 "Playing with
 * Numbers" topic coverage — see docs/project/SOURCE_LOG.md. Exposition
 * original; all arithmetic verified by scripts/verify-unit-3.ts (192
 * checks for 3.1 + 3.2 + 3.3) BEFORE writing.
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
    {
      id: 'fm-prime-numbers-factorisation',
      number: '3.2',
      title: 'Prime Numbers and Factorisation',
      concepts: [
        'Primes have exactly two factors',
        'Composites have three or more',
        'Why 1 and 0 sit outside the treaty',
        'The sieve of Eratosthenes',
        'Trial division and the square-root licence',
        'Prime factorisation is unique',
        'Counting divisors from the atoms',
      ],
      objectives: [
        'Define prime and composite numbers by counting factors, and explain why 1 (and 0) belong to neither family',
        'Run the sieve of Eratosthenes up to 100 and recall the 25 primes it leaves behind',
        'Certify primality by trial division, using the square-root licence to stop testing at √n — and spot the false primes 91, 87 and 221',
        'Factorise any number completely into primes and state the Fundamental Theorem of Arithmetic: every road reaches the same atoms',
        'Predict the number of divisors of any number from its prime exponents, via (a₁ + 1)(a₂ + 1)⋯(aₖ + 1)',
      ],
      prerequisites: ['fm-divisibility-and-its-tests', 'fm-numbers-digits-place-value'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch3'],
      blocks: [
        {
          kind: 'para',
          text: 'A mosaic maker has two trays of square tiles. The first holds $48$ tiles: they can be pushed into five different perfect rectangles — $1 \\times 48$ (a strip), $2 \\times 24$, $3 \\times 16$, $4 \\times 12$, and a tidy $6 \\times 8$. Those five rectangles are exactly the five factor pairs Lesson 3.1 walked out, producing $48$\'s ten factors. The second tray holds $47$ tiles, and here the maker hits a wall: every arrangement except the bare line $1 \\times 47$ leaves ragged leftovers. The screens of Lesson 3.1 explain the refusal — $47$ is odd, its digit sum is $11$ (not divisible by $3$), it does not end in $0$ or $5$ — and the factor walk stops there because the next candidate, $7$, already overshoots: $7 \\times 7 = 49 > 47$. Some numbers simply refuse to be built. This lesson is about them.',
        },
        {
          kind: 'para',
          text: 'The refusers are the **primes**, and they are not a curiosity — they are the load-bearing beams of multiplication. Lesson 3.1 ended with a promise: to factor numbers **all the way down, into parts that no longer factor**. The primes are those bottom parts. The plan of this lesson: pin down the definition and its famous edge cases (why $1$ belongs to neither family — and why that exclusion is not pedantry but the foundation of everything that follows); run the ancient sieve that harvests all primes below $100$; derive the square-root licence that makes testing one number cheap; push numbers all the way down to their prime atoms and meet the theorem that says every road lands on the same atoms; and cash the whole enterprise in with a formula that counts a number\'s divisors straight off its atoms.',
        },
        { kind: 'heading', text: 'Primes, composites, and the two-factor treaty' },
        {
          kind: 'para',
          text: 'Lesson 3.1 defined factors: $d$ is a factor of $n$ when $d \\mid n$. Every whole number $n \\ge 2$ carries at least the trivial pair: $1 \\times n$. The interesting question is how much company those two have. $47$ has nobody — its complete factor list is $\{1, 47\}$. $48$ has a crowd — $\{1, 2, 3, 4, 6, 8, 12, 16, 24, 48\}$. So count the factors, and every number from $2$ upward sorts itself into one of two families: those with **exactly two** factors, and those with **three or more**.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Prime and composite (the two-factor treaty)',
          text: 'A natural number $n \\ge 2$ is **prime** when it has exactly two factors: $1$ and $n$ itself — so nothing between $1$ and $n$ divides it. Examples: $2, 3, 5, 7, 11, 47$. A natural number $n \\ge 2$ is **composite** when it has more than two factors — some $d$ with $1 < d < n$ divides it. Examples: $4$ (factors $1, 2, 4$), $6$, $48$. The two families together exhaust every natural number from $2$ up: a number either has a factor strictly between $1$ and itself, or it does not. Note the phrasing "exactly two", not "divisible by 1 and itself" alone — every number is divisible by $1$ and itself; a prime is divisible by **nothing else**.',
        },
        {
          kind: 'para',
          text: 'Two numbers are deliberately left outside this treaty. The number $1$ has exactly **one** factor — itself — so it fits neither family: too few for the primes, too few for the composites. And $0$ is divisible by **every** nonzero number ($0 = 0 \\times d$ for any $d$, Lesson 3.1\'s edge rule), giving it infinitely many factors — too many for either family too. So prime and composite are questions asked of natural numbers from $2$ upward. Keep this scoping in mind; exam options love offering $1$ and $0$ where they do not belong.',
        },
        {
          kind: 'para',
          text: 'The smallest entries settle the families\' faces. The primes begin $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$ — ten of them below $30$. And notice $2$\'s special position: it is **the only even prime**. The reason is a one-liner with Lesson 3.1\'s tail test inside it: any even number $n > 2$ satisfies $n = 2 \\times (n \\div 2)$ with **both** factors greater than $1$, so $2$ sits strictly between $1$ and $n$ and divides it — $n$ has at least three factors and is composite. Evenness, the cheapest screen of all, clears out every candidate above $2$. After that the odd numbers take over: $3$ is the smallest odd prime, and $9 = 3 \\times 3$ is the smallest odd composite.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Prime number',
              def: 'A natural number n ≥ 2 with exactly two factors: 1 and n. Examples: 2, 3, 5, 7, 11, 47, 97. 2 is the only even one.',
            },
            {
              term: 'Composite number',
              def: 'A natural number n ≥ 2 with more than two factors — some d with 1 < d < n divides it. Examples: 4, 6, 8, 9, 12, 91. Every composite is a product of smaller numbers.',
            },
            {
              term: 'Sieve of Eratosthenes',
              def: 'The procedure that finds all primes up to a bound by crossing out multiples: keep each survivor p and cross its multiples starting at p × p. Leaves exactly 25 primes below 100.',
            },
            {
              term: 'Trial division',
              def: 'Testing whether n is prime by dividing by candidate factors in turn. The square-root licence stops the hunt at √n, and only primes need apply.',
            },
            {
              term: 'Prime factorisation',
              def: 'Writing n ≥ 2 as a product of primes only: 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5. Every road of splitting reaches the same final cargo.',
            },
            {
              term: 'Fundamental theorem of arithmetic',
              def: 'Every n ≥ 2 factors into primes in exactly one way, order aside: n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ. Gauss named it fundamental (1801).',
            },
            {
              term: 'Factor tree',
              def: 'A diagram that splits a number into two factors, then splits those, until only primes remain. Different first cuts draw different trees — but all trees end at the same leaves.',
            },
          ],
        },
        {
          kind: 'para',
          text: 'One more observation before the machinery starts. Every composite hides a prime inside: $4 = 2 \\times 2$, $6 = 2 \\times 3$, $9 = 3 \\times 3$, $12 = 3 \\times 4 = 3 \\times 2 \\times 2$. If a number is composite, some factor $d$ with $1 < d < n$ exists, and either $d$ is prime or $d$ itself splits — so chasing factors downward must eventually land on a prime. This innocent remark is the seed of the whole lesson: composites are **buildings**, primes are the **material**. The sieve below finds the material; the second half of the lesson studies the buildings.',
        },
        { kind: 'heading', text: 'Finding the primes: the sieve of Eratosthenes' },
        {
          kind: 'para',
          text: 'How do we list all primes below $100$ without testing each number separately? Eratosthenes of Alexandria (the chief librarian who also measured the Earth\'s circumference) saw that the composites can be retired **in bulk**. Keep $2$ — it is prime — and cross out every second number from $4$ onward: $4, 6, 8, \\ldots$, all composite in one sweep. The next surviving number is $3$: nothing smaller divides it, so it is prime; cross out its multiples — but not $6$, which is already gone: start at $3 \\times 3 = 9$. Next survivor $5$ is prime; start crossing at $5 \\times 5 = 25$, since $10, 15, 20$ were retired by $2$\'s or $3$\'s sweep. Next survivor $7$ is prime; start at $7 \\times 7 = 49$. And now the decisive step: the next survivor is $11$, but $11 \\times 11 = 121 > 100$ — there is nothing left to cross. Why? Every composite below $100$ has some prime factor $\le \\sqrt{100} = 10$, and the primes up to $10$ — $2, 3, 5, 7$ — have each done their sweep. The survivors are exactly the primes.',
        },
        {
          kind: 'algorithm',
          title: 'The sieve of Eratosthenes up to 100',
          lines: [
            { code: 'List the numbers 2, 3, 4, …, 100; mark them all "uncrossed".', note: 'Working from a 10 × 10 grid keeps the sweeps visible.' },
            { code: 'Take the smallest uncrossed number p (start: p = 2). Declare p prime.', note: 'Nothing smaller divides p — smaller candidates were crossed or skipped earlier.' },
            { code: 'IF p × p > 100: stop. Every remaining uncrossed number is prime.', note: 'Any composite ≤ 100 has a prime factor ≤ 10, and 7 was the last prime ≤ 10 (11² = 121).' },
            { code: 'ELSE cross out p × p, p × p + p, p × p + 2p, … up to 100.', note: 'Crossing starts at p² because smaller multiples of p contain a smaller prime factor and were crossed in earlier sweeps.' },
            { code: 'Repeat with the next uncrossed number.', note: 'The sequence of workers is 2, 3, 5, 7 — then the stop rule fires.' },
            { code: 'Read off the survivors: exactly 25 numbers.', note: 'The primes below 100 — the harvest verified in the table of the next section.' },
          ],
          note:
            'Each worker retires an entire infinite family of composites in one sweep, and each worker only begins where the previous workers\' coverage ends — at its own square. The sieve is bulk pricing: one action per prime, not per number.',
        },
        {
          kind: 'para',
          text: 'The harvest deserves to be seen whole. The $25$ survivors below $100$ are: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29,$ then $31, 37, 41, 43, 47, 53, 59, 61, 67, 71,$ and finally $73, 79, 83, 89, 97$. Three habits of the family jump out. **The largest two-digit prime is $97$**: $98 = 2 \\times 49$ and $99 = 9 \\times 11$ are swept, so $97$ is the last survivor — and this exact question ("largest two-digit prime?") is a competitive-exam staple. **The primes thin out as they grow**: ten of them live below $30$, but only three — $83, 89, 97$ — live in the eighties and nineties. **They sometimes crowd**: $3$ and $5$, $5$ and $7$, $11$ and $13$, $17$ and $19$, $29$ and $31$, $41$ and $43$ — six pairs below $50$ differing by exactly $2$ (the **twin primes**). The thinning has a reason, and it is the same tension the whole lesson runs on: the bigger a number, the more room there is below it for something to divide it — and yet primes keep appearing. That tension is one of the oldest stories in mathematics, and Chapter 3 returns to it in its final lesson.',
        },
        { kind: 'heading', text: 'Testing one number: trial division and the square-root licence' },
        {
          kind: 'para',
          text: 'The sieve finds every prime in a range at once, but the exam asks about **one** number: is $397$ prime? The direct strategy is **trial division** — divide by candidate factors in turn and watch for a clean hit. Lesson 3.1 already performed a miniature of this: the factor-pair walk for $48$ tried candidates $1, 2, 3, 4, 6$ and then simply **stopped** — nobody bothered dividing $48$ by $7, 8, 9, \\ldots, 47$ separately. That early exit felt like luck. It was not. The walk closes at the square root, and the reason is worth a derivation, because it converts a search of $n - 2$ candidates into a search of a handful.',
        },
        {
          kind: 'derivation',
          title: 'The square-root licence',
          statement:
            'If n has any factor d with 1 < d < n, then n has such a factor with d ≤ √n. So to decide whether n is prime, it suffices to test candidate factors up to √n — beyond that point, an empty report certifies primality.',
          steps: [
            {
              label: 'Factor pairs always straddle the square root',
              formula: 'n = d \\times e, \\quad 1 < d \\le e < n \\;\\Longrightarrow\\; d \\le \\sqrt{n} \\le e',
              explanation:
                'Write the factor pair with the smaller member first. If both members were greater than √n, their product would exceed n — for 48, two factors both above ~6.93 would multiply to more than 48. But their product is exactly n. Contradiction.',
            },
            {
              label: 'The smaller member is the one worth hunting',
              formula: 'd \\le \\sqrt{n} \\quad \\text{(with } d \\cdot e = n,\\ e \\ge d\\text{)}',
              explanation:
                'Concretely: 7 × 7 = 49 > 48, so no pair of 48 can have both members at 7 or above — which is exactly why the Lesson 3.1 walk closed at 6 × 8. Every factor pair of every number has its smaller member at or below the square root.',
            },
            {
              label: 'Contrapositive: an empty search below √n certifies primality',
              formula: 'd \\nmid n \\text{ for all } 1 < d \\le \\sqrt{n} \\;\\Longrightarrow\\; n \\text{ is prime}',
              explanation:
                'If no candidate at or below √n divides n, then no factor pair exists at all — any pair would contribute a smaller member below √n, and none was found. The verdict is settled without looking above the square root.',
            },
            {
              label: 'Refinement: only primes need apply',
              formula: '4 \\mid n \\Rightarrow 2 \\mid n, \\quad 6 \\mid n \\Rightarrow 2 \\mid n, \\quad 9 \\mid n \\Rightarrow 3 \\mid n',
              explanation:
                'If a composite candidate divided n, its own prime factors would divide n too — the hit would have been scored earlier. So the candidate list shrinks to the primes up to √n. This is Lesson 3.1\'s compound-test logic running in reverse: the primes are the atoms that govern every composite\'s verdict.',
            },
          ],
          result:
            'n ≥ 2 is prime ⟺ no prime p with p ≤ √n divides n. Testing 397 needs the eight primes up to 19 — not 395 candidates. Testing 47 needs 2, 3 and 5 only, because 7² = 49 has already overshot.',
        },
        {
          kind: 'para',
          text: 'Watch the licence retell Lesson 3.1\'s stories. The pairs of $48$ close at $6 \\times 8$ because $\\sqrt{48}$ sits between $6$ and $7$ ($36 < 48 < 49$): every smaller member found — $1, 2, 3, 4, 6$ — is at most $6$, and the search rightly refused to look further. The mosaic maker\'s $47$ needs only $2, 3, 5$: it is odd (retiring $2$), its digit sum $11$ is not divisible by $3$, its tail is $7$ (retiring $5$), and $7$ itself lies beyond $\\sqrt{47}$ — three checks, verdict prime. And the sieve\'s mysterious stop rule is now plain: crossing may stop at $11$ because any composite $\le 100$ would have a factor at or below $\\sqrt{100} = 10$, and those workers already swept.',
        },
        {
          kind: 'example',
          title: 'Certifying 397 prime — eight tests, then the licence speaks',
          steps: [
            'Fix the boundary: $19^2 = 361 < 397 < 400 = 20^2$, so $\\sqrt{397}$ sits just under $20$. The candidate list is the primes $2, 3, 5, 7, 11, 13, 17, 19$ — nothing else.',
            '$2$: $397$ is odd — retired by the tail test. $3$: digit sum $3 + 9 + 7 = 19$, not divisible by $3$ — retired by the digit-sum screen. $5$: ends in $7$ — retired by the tail test.',
            '$7$: divide once — $397 = 7 \\times 56 + 5$, remainder $5$. Out. $11$: alternating sum $7 - 9 + 3 = 1$ — out (and $397 = 11 \\times 36 + 1$, the screen\'s remainder confirmed).',
            '$13$: $397 = 13 \\times 30 + 7$. Out. $17$: $397 = 17 \\times 23 + 6$. Out. $19$: $397 = 19 \\times 20 + 17$. Out.',
            'Eight primes tried, eight failures, and the licence says that is the whole trial: no factor exists, so $397$ is prime. (A near neighbour tells the other story: $391 = 17 \\times 23$ — same screens, one hit at $17$, composite.)',
          ],
        },
        {
          kind: 'para',
          text: 'Beware the **false primes** — odd numbers with innocent-looking digit sums that hide a factor just past the cheap screens. The classic is $91$: odd, digit sum $10$, tail $1$ — yet $91 = 7 \\times 13$, and $7 \\le \\sqrt{91}$ is exactly why the licence forces running the $7$-test. Its cousins: $51 = 3 \\times 17$ (digit sum $6$ — the $3$-screen catches this one), $87 = 3 \\times 29$, and the exam favourite $221 = 13 \\times 17$: odd, digit sum $5$, tail $1$, no help from $2, 3, 5, 7, 11$ — but $14^2 = 196 < 221 < 225 = 15^2$ forces testing $13$, and $13$ lands the blow. Meanwhile $97$, the largest two-digit prime, certifies in four moves: primes $\le 9$ are $2, 3, 5, 7$; $97$ is odd, its digit sum is $16$, its tail is $7$, and $97 = 7 \\times 13 + 6$ — four failures, prime. Eyes do not decide primality; the licence does.',
        },
        {
          kind: 'formula',
          name: 'The trial-division licence',
          latex: 'n \\;\\text{prime} \\;\\Longleftrightarrow\\; p \\nmid n \\text{ for every prime } p \\le \\sqrt{n}',
          note: 'Fix the boundary by squaring: find k with k² < n < (k+1)², then test the primes up to k. Never test composites (their primes already ran), never test past √n (the licence forbids the detour). For n below 10,000 the candidate list never exceeds the primes up to 97 — because √10,000 = 100 and 97 is the largest prime below 100.',
        },
        { kind: 'heading', text: 'Factoring all the way down: prime factorisation' },
        {
          kind: 'para',
          text: 'Now the promise from Lesson 3.1 comes due: factor a number **all the way down**, into parts that no longer factor. Take the mosaic maker\'s other favourite, $60$. One cut gives $60 = 6 \\times 10$ — but $6$ and $10$ still factor. Push down: $6 = 2 \\times 3$ and $10 = 2 \\times 5$, so $60 = 2 \\times 3 \\times 2 \\times 5$. A different first cut, $60 = 4 \\times 15$, pushes down to $60 = 2 \\times 2 \\times 3 \\times 5$. Different trees, different order — **the same four atoms**: two $2$s, one $3$, one $5$. Regrouped with the exponent shorthand met in Lesson 3.1 ($7^4 = 2{,}401$): $60 = 2^2 \\times 3 \\times 5$.',
        },
        {
          kind: 'figure',
          caption:
            'Two factor trees for 60. Tree A opens with the cut 6 × 10; tree B opens with 4 × 15. The intermediate pieces differ, but both trees terminate in exactly the same leaves — 2, 2, 3, 5. The leaves are the prime factorisation; the branches are scaffolding.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two factor trees for 60, one splitting into 6 and 10, the other into 4 and 15, both ending in the same leaves 2, 2, 3, 5">
  <g font-size="14" fill="currentColor">
    <g text-anchor="middle" font-weight="700">
      <text x="190" y="34">60</text>
      <text x="570" y="34">60</text>
    </g>
    <g stroke="currentColor" stroke-width="1.4" opacity="0.55" fill="none">
      <line x1="182" y1="42" x2="128" y2="94"/>
      <line x1="198" y1="42" x2="252" y2="94"/>
      <line x1="562" y1="42" x2="508" y2="94"/>
      <line x1="578" y1="42" x2="632" y2="94"/>
      <line x1="120" y1="122" x2="90" y2="180"/>
      <line x1="130" y1="122" x2="160" y2="180"/>
      <line x1="248" y1="122" x2="222" y2="180"/>
      <line x1="258" y1="122" x2="292" y2="180"/>
      <line x1="500" y1="122" x2="470" y2="180"/>
      <line x1="510" y1="122" x2="540" y2="180"/>
      <line x1="628" y1="122" x2="606" y2="180"/>
      <line x1="638" y1="122" x2="672" y2="180"/>
    </g>
    <g text-anchor="middle" font-weight="700">
      <text x="124" y="112">6</text>
      <text x="256" y="112">10</text>
      <text x="504" y="112">4</text>
      <text x="636" y="112">15</text>
    </g>
    <g text-anchor="middle" font-weight="700" fill="#b45309">
      <text x="86" y="198">2</text>
      <text x="164" y="198">3</text>
      <text x="218" y="198">2</text>
      <text x="296" y="198">5</text>
      <text x="466" y="198">2</text>
      <text x="544" y="198">2</text>
      <text x="602" y="198">3</text>
      <text x="676" y="198">5</text>
    </g>
    <g text-anchor="middle" opacity="0.7" font-size="13">
      <text x="190" y="238">first cut: 6 × 10</text>
      <text x="570" y="238">first cut: 4 × 15</text>
    </g>
    <g stroke="#b45309" stroke-width="1.4" opacity="0.6" fill="none" stroke-dasharray="5 4">
      <path d="M190 252 C 190 292, 320 300, 366 316"/>
      <path d="M570 252 C 570 292, 440 300, 394 316"/>
    </g>
    <g text-anchor="middle" font-weight="700" fill="#b45309" font-size="16">
      <text x="380" y="340">2 · 2 · 3 · 5</text>
    </g>
    <g text-anchor="middle" opacity="0.75" font-size="13">
      <text x="380" y="366">both roads end at the same four atoms</text>
      <text x="380" y="386" opacity="0.7">60 = 2 · 2 · 3 · 5, regrouped as 2² · 3 · 5</text>
    </g>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The pushing-down always finishes. Each split replaces one part with two **smaller** parts, both at least $2$ — $6$ yields $2$ and $3$, never $1$ and $6$. Smaller parts cannot shrink forever (nothing below $2$ is splittable), so the process must halt; and it can only halt when **every** part is prime, because any composite part could be split again. The finished cargo — a product of primes and nothing else — is called a **prime factorisation** of $n$. For $60$ it is $2 \\times 2 \\times 3 \\times 5$; for the exam-hall number it will be, in a moment, $2^5 \\times 3^2 \\times 17$.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Prime factorisation',
          text: 'A **prime factorisation** of $n \\ge 2$ is a way of writing $n$ as a product of primes only: $n = p_1 \\times p_2 \\times \\cdots \\times p_m$ with every $p_i$ prime. Writing the same primes in a different order, or regrouping equal ones as powers ($2 \\times 2 \\times 3 \\times 5 = 2^2 \\times 3 \\times 5$), does not create a different factorisation — the **multiset** of atoms is the mathematics. The figure above shows two roads; the theorem below says all roads share one destination.',
        },
        {
          kind: 'equation',
          latex: '60 = 6 \\times 10 = (2 \\times 3)(2 \\times 5) = 4 \\times 15 = (2 \\times 2)(3 \\times 5) = 2 \\times 2 \\times 3 \\times 5 = 2^2 \\times 3 \\times 5',
          note: 'Order and grouping are bookkeeping; the cargo {2, 2, 3, 5} is the fact. The exponent shorthand 2² compresses the repeated atom — nothing more.',
        },
        {
          kind: 'derivation',
          title: 'Why every road reaches the same atoms (uniqueness)',
          statement:
            'The Fundamental Theorem of Arithmetic: every n ≥ 2 has a prime factorisation, and it is unique — any two ways of writing n as a product of primes contain exactly the same primes with exactly the same multiplicities.',
          steps: [
            {
              label: 'Existence: the push-down terminates',
              formula: 'n = a \\times b \\;\\Rightarrow\\; a < n,\\ b < n \\;(\\text{when } a, b > 1)',
              explanation:
                'Every split replaces a part by strictly smaller parts ≥ 2, so the parts cannot shrink forever; the process halts only when every part is prime. (Seen concretely in the figure: two trees, each ending in leaves.)',
            },
            {
              label: 'The near-miss that tempts disbelief',
              formula: '2 \\times 6 = 3 \\times 4 = 12 \\quad \\text{but pushed down: } 2 \\times 2 \\times 3 = 2 \\times 2 \\times 3',
              explanation:
                'At first glance 12 seems to have two different factorisations. It does not: 6 and 4 are not atoms. Split every composite part and both roads arrive at 2 × 2 × 3. Roads differ only while unfactored parts remain.',
            },
            {
              label: 'The engine: a prime dividing a product divides a factor',
              formula: 'p \\text{ prime},\\; p \\mid (a \\times b) \\;\\Longrightarrow\\; p \\mid a \\text{ or } p \\mid b',
              explanation:
                'Euclid\'s crossroads lemma (Elements, Book VII) — the oldest engine in this book\'s garage. It is why two genuinely different prime multisets cannot build the same number: if a prime from one multiset divided the product of the other, it would have to divide one of that multiset\'s factors, and chasing down the tree forces a match at the leaves.',
            },
            {
              label: 'The coprime idea, promoted to its highest job',
              formula: '\\gcd(2, 6) = 2 \\text{ broke the compound test;} \\quad \\text{primes are coprime to everything but themselves}',
              explanation:
                'Lesson 3.1\'s compound-test trap (12 = 2 × 6 fails because 2 and 6 share a factor) was the shadow of this lemma: distinct primes are the only parts that govern a product independently. Uniqueness of factorisation is the coprime idea with all scaffolding removed.',
            },
            {
              label: 'An honest word about scope',
              formula: '\\text{full proof of the lemma} \\;\\rightarrow\\; \\text{Lesson 3.3\'s machinery}',
              explanation:
                'The crossroads lemma\'s complete proof needs the HCF machinery (Bézout\'s identity) that the next lesson builds. Here we verify it on every example we meet and lean on Euclid\'s licence — 2,300 years of verification stand behind it.',
            },
          ],
          result:
            'Every n ≥ 2 factors into primes (existence), and the prime multiset is the same along every road (uniqueness). Order and grouping are human conveniences; the atoms and their counts are the number\'s identity.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The Fundamental Theorem of Arithmetic (and why 1 stands outside)',
          text: 'Every natural number $n \\ge 2$ can be written as a product of primes, and in exactly one way, apart from order: $n = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k}$ with distinct primes $p_1 < p_2 < \\cdots$ and exponents $a_i \\ge 1$. Carl Friedrich Gauss published the theorem under the name **fundamental** in his Disquisitiones Arithmeticae (1801) — fundamental because the rest of arithmetic builds on it. And here is where Lesson 3.1\'s trap callout becomes load-bearing: if $1$ were counted as a prime, uniqueness would collapse instantly, since $60 = 2^2 \\times 3 \\times 5$, then $1 \\times 2^2 \\times 3 \\times 5$, then $1 \\times 1 \\times 2^2 \\times 3 \\times 5$, and so on forever — infinitely many "factorisations" of the same number, all differing by padding. Excluding $1$ is not a technicality; it is what makes the theorem say anything at all.',
        },
        {
          kind: 'para',
          text: 'The exam-hall number from Lesson 3.1 returns, now fully atomised. Strip its $2$s seat by seat:',
        },
        {
          kind: 'equation',
          latex: '4{,}896 = 2 \\times 2{,}448 = 2^2 \\times 1{,}224 = 2^3 \\times 612 = 2^4 \\times 306 = 2^5 \\times 153',
          note: 'Five seats of $2$ come out; the spigot runs dry because 153 is odd.',
        },
        {
          kind: 'para',
          text: 'Then the odd part gives way: $153 = 3 \\times 51 = 3 \\times 3 \\times 17$, and $17$ is prime (the licence: $16 < 17 < 25$, primes $2, 3$ fail). So $4{,}896 = 2^5 \\times 3^2 \\times 17$ — check it by rebuilding: $32 \\times 153 = 4{,}896$, or $32 \\times 9 \\times 17 = 4{,}896$. At the other extreme sits Lesson 3.1\'s chain target $2{,}401 = 7^4$: one prime, four copies — a **prime power**, with nothing but $7$s in its factorisation and factors $\{1, 7, 49, 343, 2{,}401\}$. Every number from the packed $2^5 \\times 3^2 \\times 17$ to the pure $7^4$ is now a sentence written in the same alphabet.',
        },
        {
          kind: 'formula',
          name: 'The prime factorisation (existence + uniqueness)',
          latex: 'n = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k}, \\quad p_1 < p_2 < \\cdots \\text{ prime}, \\; a_i \\ge 1',
          note: 'Exactly one such form per n ≥ 2 (order aside). 1 is the empty product — no primes at all — which is the formula\'s way of repeating that 1 sits outside the treaty. 0 has no prime factorisation (nothing multiplies to 0).',
        },
        { kind: 'heading', text: 'The master key: counting divisors from the atoms' },
        {
          kind: 'para',
          text: 'Why push everything down to atoms? Because the atomised form answers questions the raw numeral hides. Take $4{,}896 = 2^5 \\times 3^2 \\times 17$ and ask: how many divisors does it have? Lesson 3.1 could only have answered by listing. The atoms answer by counting **choices**. Every divisor of $4{,}896$ is itself built from the same three primes — nothing else is available — so a divisor is a decision: how many $2$s ($0$ to $5$: six options), how many $3$s ($0$ to $2$: three options), whether to include the $17$ ($0$ or $1$: two options). The three decisions are independent, so the counts multiply: $6 \\times 3 \\times 2 = 36$ divisors — predicted in one line, no listing.',
        },
        {
          kind: 'derivation',
          title: 'The divisor-count formula',
          statement:
            'If n = p₁^a₁ × p₂^a₂ × … × pₖ^aₖ is the prime factorisation, then n has exactly (a₁ + 1)(a₂ + 1)⋯(aₖ + 1) divisors.',
          steps: [
            {
              label: 'Every divisor is a choice of exponents',
              formula: 'd \\mid n \\;\\Longleftrightarrow\\; d = p_1^{b_1} p_2^{b_2} \\cdots p_k^{b_k} \\text{ with } 0 \\le b_i \\le a_i',
              explanation:
                'A divisor d of n cannot contain a prime that n lacks, and its exponent on each prime cannot exceed n\'s — 2³ × 5 does not divide 4,896 because 4,896 has no 5, and 2⁶ × 3 × 17 overshoots because 6 > 5. (The forward direction is the crossroads lemma of this lesson; the reverse is one-line arithmetic: the quotient is what remains of the exponents.)',
            },
            {
              label: 'Every choice really does divide',
              formula: 'd = p_1^{b_1} \\cdots p_k^{b_k} \\;\\Longrightarrow\\; n = d \\times (p_1^{a_1 - b_1} \\cdots p_k^{a_k - b_k})',
              explanation:
                'Pick any allowed exponents b₁, …, bₖ; the leftover exponents form a whole number, so the choice is a genuine divisor. Choices and divisors correspond perfectly — nothing missed, nothing spurious.',
            },
            {
              label: 'Independent choices multiply',
              formula: '(a_1 + 1)(a_2 + 1) \\cdots (a_k + 1)',
              explanation:
                'Prime p₁ offers the exponents 0, 1, …, a₁ — that is a₁ + 1 options, the "+1" being the choice "use none of this prime". With k independent dials, the total is the product of the option counts. For 4,896: (5+1)(2+1)(1+1) = 36.',
            },
          ],
          result:
            'd(n) = (a₁ + 1)(a₂ + 1)⋯(aₖ + 1). The factorisation is the master key: listing divisors is for small numbers, the formula is for all of them.',
        },
        {
          kind: 'para',
          text: 'Verify the formula against the counts this book already earned. Lesson 3.1 listed $48$\'s ten factors by walking pairs — now the atoms explain the ten: $48 = 2^4 \\times 3$, so $(4 + 1)(1 + 1) = 10$; the list was never arbitrary, it was $2^a \\times 3^b$ for $a \\in \\{0,\\ldots,4\\}$, $b \\in \\{0, 1\\}$. The mosaic maker\'s $60 = 2^2 \\times 3 \\times 5$ carries $(2 + 1)(1 + 1)(1 + 1) = 12$ divisors. A bare prime $p$ carries $(1 + 1) = 2$ — the treaty, read off a formula: exactly the divisors $1$ and $p$. And a prime power $7^4$ carries $4 + 1 = 5$: the divisors $1, 7, 49, 343, 2{,}401$, one per exponent level.',
        },
        {
          kind: 'table',
          caption: 'The divisor-count gallery — every row verified, several against counts already earned in Lessons 3.1 and 3.2',
          head: ['Number', 'Prime factorisation', 'Divisor count', 'Cross-check'],
          rows: [
            ['$48$', '$2^4 \\times 3$', '$(4+1)(1+1) = 10$', 'matches the ten factors listed in Lesson 3.1'],
            ['$60$', '$2^2 \\times 3 \\times 5$', '$3 \\times 2 \\times 2 = 12$', 'the five rectangles of this lesson\'s opening, doubled by their transposes'],
            ['$96$', '$2^5 \\times 3$', '$6 \\times 2 = 12$', 'all twelve listed in Exercise L5'],
            ['$720$', '$2^4 \\times 3^2 \\times 5$', '$5 \\times 3 \\times 2 = 30$', 'thirty, enumerated by script'],
            ['$2{,}401$', '$7^4$', '$4 + 1 = 5$', 'one per power: $1, 7, 49, 343, 2{,}401$'],
            ['$2{,}025$', '$3^4 \\times 5^2$', '$5 \\times 3 = 15$', 'all fifteen listed in Exercise L5'],
            ['$4{,}896$', '$2^5 \\times 3^2 \\times 17$', '$6 \\times 3 \\times 2 = 36$', 'all thirty-six enumerated in Exercise L6'],
          ],
        },
        {
          kind: 'formula',
          name: 'Divisor count from the atoms',
          latex: 'd(n) = (a_1 + 1)(a_2 + 1) \\cdots (a_k + 1) \\quad \\text{where } n = p_1^{a_1} \\cdots p_k^{a_k}',
          note: 'Each +1 counts the exponent 0 — the choice "skip this prime". A prime has d = 2; a prime power p^a has d = a + 1. The formula needs the FULL factorisation: 48 as 6 × 8 or 2 × 24 reveals no counts, only 2⁴ × 3 does.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The librarians and the geometers (c. 300 BCE — 1801)',
          text: 'The sieve carries the name of **Eratosthenes of Cyrene** (c. 240 BCE), chief librarian of Alexandria — the same scholar who measured the Earth\'s circumference with shadows and wells, and whose sieve remains, twenty-two centuries on, the standard classroom method for harvesting primes. The deeper structure was **Euclid\'s**, two generations earlier: Book VII of the Elements contains the crossroads lemma (a prime dividing a product divides one factor), and Book IX wields it — proposition 14 stops a least common multiple from admitting stray primes, the uniqueness seed this lesson borrowed. The theorem kept its informal status for two millennia until **Gauss\'s Disquisitiones Arithmeticae (1801)** stated it cleanly and named it fundamental — and Gauss, ever exact, pointed out that earlier authors had used it without proving it. The lesson\'s own honesty section stands in good company.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Prime/composite questions are perennial openers in SSC, Railway and bank papers: "how many primes lie between 1 and 100?" ($25$), "which is the largest two-digit prime?" ($97$), "is $91$ prime?" (no: $7 \\times 13$ — the false-prime trap this lesson drills alongside $51$, $87$ and $221$). Trial-division items ask for the **smallest** or **largest** prime factor of a four-digit number, which is exactly licence-discipline: fix the square-root boundary, run the 3.1 screens, test primes in order. The divisor-count formula powers NTSE and CUET aptitude items ("how many divisors does $720$ have?"). Most importantly, prime factorisation is the **engine of the next two lessons**: Khattar\'s chapter on HCF and LCM works every problem by prime factorisation first — the method Lessons 3.3 and 3.4 develop — so factorising accurately (and verifying by rebuilding the product) is the exam skill underneath the exam skill. CBSE Class 6 lists prime and composite numbers, the sieve and co-primes exactly as met here.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which of these numbers is prime?',
              options: [
                '91',
                '87',
                '89',
                '51',
              ],
              answer: 2,
              explain:
                '89 is prime: with 9² = 81 < 89 < 100, the licence demands only 2, 3, 5, 7 — 89 is odd, its digit sum 17 is not divisible by 3, its tail is 9, and 89 = 7 × 12 + 5 (Option 3). Option 1 hides 91 = 7 × 13. Option 2 hides 87 = 3 × 29 (digit sum 15 — the 3-screen catches it). Option 4 hides 51 = 3 × 17 (digit sum 6). All three false primes look innocent until a screen runs.',
            },
            {
              q: 'Why may trial division stop testing candidates once the square root of n has passed?',
              options: [
                'Because numbers larger than √n are always composite',
                'Because any factor larger than √n would have to pair with one smaller than √n — and that smaller partner was already tested',
                'Because primes above √n cannot divide n, by definition of prime',
                'Because the sieve has already crossed out all multiples up to √n',
              ],
              answer: 1,
              explain:
                'Factor pairs straddle the square root: n = d × e with d ≤ e forces d ≤ √n (Option 2 — 91 shows the point: its factor 13 sits above √91 ≈ 9.5, but it pairs with 7, which sits below and gets caught). Option 1 is false — 13 is prime and larger than √91. Option 3 garbles the definition: primality of the candidate is irrelevant, the pairing is what matters. Option 4 confuses the sieve (a bulk hunt for primes) with trial division (a test of one number).',
            },
            {
              q: 'How many prime numbers are there below 100?',
              options: [
                '21',
                '24',
                '25',
                '27',
              ],
              answer: 2,
              explain:
                'Exactly 25 — the sieve\'s harvest, listed in full in this lesson (Option 3). Option 2 misses one (a common slip is forgetting 2, the only even prime). Option 4 overcounts by including a composite — 91 = 7 × 13 is the usual culprit. Option 1 is not even close; recite the sieve: workers 2, 3, 5, 7, then stop at 11 because 11² = 121.',
            },
            {
              q: 'Which line shows the genuine prime factorisation of 60?',
              options: [
                '60 = 2² × 3 × 5',
                '60 = 2 × 30',
                '60 = 4 × 15',
                '60 = 2 × 3 × 10',
              ],
              answer: 0,
              explain:
                'Only Option 1 is written entirely in primes (Option 1). Options 2, 3 and 4 are true products equal to 60 — but 30, 4, 15 and 10 are composites, so each line is merely a factorisation, not the prime factorisation. The Fundamental Theorem\'s demand is that every part is an atom: push 2 × 30 down and you reach 2² × 3 × 5 anyway.',
            },
            {
              q: 'Lesson 3.1 listed ten factors for 48. Given 48 = 2⁴ × 3, the divisor-count formula says:',
              options: [
                '(4 + 1) × (1 + 1) = 10 — the same ten, now explained',
                '4 × 3 = 12 — the exponents multiplied',
                '4 + 3 = 7 — the exponents added',
                '2⁴ × 3 has 8 divisors — the exponents doubled',
              ],
              answer: 3,
              explain:
                'Each prime offers "exponent + 1" choices (0 through a): (4 + 1)(1 + 1) = 10, reproducing Lesson 3.1\'s pair-walk count (Option 4). Option 2 multiplies the exponents themselves — forgetting the "+1" that counts "skip this prime" (and forgetting the second +1). Option 3 adds where the choices multiply: independence multiplies. Option 4 invents a rule with no counting behind it.',
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
                  q: 'Classify each of 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 as prime, composite, or neither — and give the factor count that decides each.',
                  solution:
                    'Count the factors of each. $1$: just $\{1\}$ — one factor, **neither** (outside the treaty). $2, 3, 5, 7, 11$: each has exactly the two factors $\{1, n\}$ — **prime**. $4$: $\{1, 2, 4\}$ (three factors); $6$: $\{1, 2, 3, 6\}$ (four); $8$: $\{1, 2, 4, 8\}$ (four); $9$: $\{1, 3, 9\}$ (three); $10$: $\{1, 2, 5, 10\}$ (four); $12$: $\{1, 2, 3, 4, 6, 12\}$ (six) — all **composite**. The treaty in action: one factor, exactly two, or three or more.',
                },
                {
                  q: 'Explain why 2 is the only even prime, and why 9 is the smallest odd composite.',
                  solution:
                    'If $n$ is even and $n > 2$, then $n = 2 \\times (n \\div 2)$ where both factors exceed $1$, so $2$ sits strictly between $1$ and $n$ and divides it: $n$ has at least three factors and is composite. Hence no even number above $2$ is prime, and $2$ itself is prime — the only even one. For the second claim: the odd numbers begin $1, 3, 5, 7, 9$. Now $1$ is outside the treaty, and $3, 5, 7$ each have exactly two factors (nothing between $1$ and the number divides them — check by the licence: $\sqrt{7} < 3$, so only $2$ needed testing, and they are odd). Then $9 = 3 \\times 3$ has the three factors $\{1, 3, 9\}$ — composite, and the first odd number that is.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'List every prime between 20 and 50, and show the sieve reasoning that retires each composite in that range.',
                  solution:
                    'The primes are $23, 29, 31, 37, 41, 43, 47$ — seven of them. The composites retire as follows. Even: $22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50$ (factor $2$). Fives: $25 = 5^2$, $35 = 5 \\times 7$, $45 = 5 \\times 9$. Threes: $21 = 3 \\times 7$, $27 = 3^3$, $33 = 3 \\times 11$, $39 = 3 \\times 13$. Sevens: $49 = 7^2$. The survivors each need the licence: $\sqrt{47} < 7$, so $23, 29, 31, 37, 41, 43, 47$ need no test beyond $2, 3, 5$ — odd, digit sums $5, 11, 4, 10, 5, 7, 11$ (none divisible by $3$), and no tail of $0$ or $5$. Seven primes, each certified, none guessed.',
                },
                {
                  q: 'Is 221 prime? Use the square-root licence, and name the trap this number sets.',
                  solution:
                    'Fix the boundary: $14^2 = 196 < 221 < 225 = 15^2$, so the candidates are the primes up to $14$: $2, 3, 5, 7, 11, 13$. Run them: $221$ is odd (retire $2$); digit sum $2 + 2 + 1 = 5$ (retire $3$); tail $1$ (retire $5$); $221 = 7 \\times 31 + 4$ (retire $7$); alternating sum $1 - 2 + 2 - 2 = -1$ (retire $11$); $221 = 13 \\times 17$ — **hit**. So $221$ is composite, and the trap is that it survives every cheap screen: odd, innocent digit sum, no tail, no $7$-gadget hit, no $11$ verdict. The licence is what forces testing $13$ — and $13$ is exactly where the factor hides. (Its partner $17$ sits above $\sqrt{221}$: the pair straddles the root, as the licence promises.)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Factorise 84 and 126 completely into primes, then circle the primes they share — and say what the shared product 42 might be called.',
                  solution:
                    '$84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2^2 \\times 3 \\times 7$ (verify: $4 \\times 21 = 84$). $126 = 2 \\times 63 = 2 \\times 9 \\times 7 = 2 \\times 3^2 \\times 7$ (verify: $2 \\times 63 = 126$, $63 = 9 \\times 7$). Shared atoms: one $2$, one $3$, one $7$ — the product $2 \\times 3 \\times 7 = 42$, and indeed $42$ divides both ($84 = 2 \\times 42$, $126 = 3 \\times 42$). It is the **greatest common factor** of the two numbers — the object Lesson 3.3 builds formally. Notice the rule that will emerge there: shared primes, taken at the **smaller** exponent ($2^1$ not $2^2$, $3^1$ not $3^2$).',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Certify that 113 is prime, using the licence and the Lesson 3.1 screens.',
                  solution:
                    'Boundary: $10^2 = 100 < 113 < 121 = 11^2$, so candidates are the primes up to $10$: $2, 3, 5, 7$. $113$ is odd (retire $2$); digit sum $1 + 1 + 3 = 5$, not divisible by $3$ (retire $3$); tail $3$ (retire $5$); $113 = 7 \\times 16 + 1$, remainder $1$ (retire $7$). Four tests, four failures — and the licence forbids testing $11$ ($121$ has already overshot): $113$ is **prime**.',
                },
                {
                  q: 'Factorise 2,401 completely. Then explain why it needs no factor tree, and count its divisors two ways.',
                  solution:
                    'Lesson 3.1\'s $7$-gadget chain certified $2{,}401 = 7 \\times 343$, and the chain continued: $343 = 7^3$, $49 = 7^2$, $7$ — so $2{,}401 = 7^4$. No tree is needed because every branch is the same prime: the number is a **prime power**. Divisor count, by the formula: $(4 + 1) = 5$. By listing: $\{1, 7, 49, 343, 2{,}401\}$ — one divisor per exponent level $7^0, 7^1, 7^2, 7^3, 7^4$. Two roads, one count. (Cross-check from Chapter 3.1: $2{,}401 = 49^2$, and a square\'s factor count is odd — five is odd, as it must be.)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Predict the number of divisors of 96 without listing any, then verify by listing them all.',
                  solution:
                    'Factorise: $96 = 2 \\times 48 = 2 \\times 2 \\times 24 = 2^5 \\times 3$ (verify: $32 \\times 3 = 96$). Formula: $(5 + 1)(1 + 1) = 12$ divisors. List, organised by the atoms $2^a 3^b$: for $b = 0$ — $1, 2, 4, 8, 16, 32$; for $b = 1$ — $3, 6, 12, 24, 48, 96$. Twelve in all, matching the prediction, and every one visibly of the form $2^a \\times 3^b$. The formula predicted the count from the factorisation alone — that is what "master key" means.',
                },
                {
                  q: 'Write 2,025 (the year just past) as a product of primes, and use the atoms to count its divisors. Verify the factorisation first by a square.',
                  solution:
                    'Spot the square: $2{,}025 = 45^2$ (since $45^2 = 2{,}025$; check $40^2 = 1{,}600 < 2{,}025 < 2{,}500 = 50^2$ and $45^2$ lands exactly). Then $45 = 9 \\times 5 = 3^2 \\times 5$, so $2{,}025 = (3^2 \\times 5)^2 = 3^4 \\times 5^2$. Rebuild: $81 \\times 25 = 2{,}025$. Divisor count: $(4 + 1)(2 + 1) = 15$. The listing, organised by exponents $3^a 5^b$: $1, 3, 9, 27, 81$; times $5$: $5, 15, 45, 135, 405$; times $25$: $25, 75, 225, 675, 2{,}025$ — fifteen, as predicted. A year that is a perfect square of a composite makes the atoms show off.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The master key, end to end. (a) Factorise 4,896 — the exam-hall number of Lesson 3.1 — completely into primes. (b) Predict its divisor count with the formula. (c) Verify by enumerating all divisors from the atoms 2^a 3^b 17^c, and spot-check three: 48, 272 and 144. (d) Explain in one sentence why the three choice-counts multiply rather than add, and what the count becomes for a prime p.',
                  solution:
                    '(a) Strip the $2$s: $4{,}896 = 2 \\times 2{,}448 = 2^2 \\times 1{,}224 = 2^3 \\times 612 = 2^4 \\times 306 = 2^5 \\times 153$; $153$ is odd, and $153 = 3 \\times 51 = 3 \\times 3 \\times 17$, with $17$ prime ($4^2 = 16 < 17 < 25$; test $2, 3$: fail). So $4{,}896 = 2^5 \\times 3^2 \\times 17$. (b) $(5 + 1)(2 + 1)(1 + 1) = 6 \\times 3 \\times 2 = 36$. (c) Enumerate $2^a 3^b 17^c$ for $a \\in 0..5$, $b \\in 0..2$, $c \\in 0..1$: with $c = 0$ the $2^a 3^b$ grid gives $1, 2, 4, 8, 16, 32$; $3, 6, 12, 24, 48, 96$; $9, 18, 36, 72, 144, 288$ — eighteen; each times $17$ gives the other eighteen: $17, 34, 68, 136, 272, 544$; $51, 102, 204, 408, 816, 1{,}632$; $153, 306, 612, 1{,}224, 2{,}448, 4{,}896$ — thirty-six in all, no duplicates (the factorisation is unique, so no grid cell can collide). Spot checks: $48 = 2^4 \\times 3$ divides ($4{,}896 = 102 \\times 48$); $272 = 2^4 \\times 17$ divides ($4{,}896 = 18 \\times 272$); $144 = 2^4 \\times 3^2$ divides ($4{,}896 = 34 \\times 144$). (d) The choices are **independent** — deciding how many $2$s to use constrains nothing about the $3$s or the $17$ — so the total number of combined decisions is the product $6 \\times 3 \\times 2$; a prime $p$ has $(1 + 1) = 2$ divisors, $\{1, p\}$, which is the two-factor treaty read straight off the formula.',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The alphabet is complete. Every number from $2$ onward is now a sentence in the primes, written exactly one way — and the divisor-count formula showed why that is power and not pedantry: the atoms and their exponents answer, in one line, questions that listing would take minutes to settle. But the deepest use of the alphabet is **comparison**. Two numbers, side by side in their atoms: which primes do they share, and at what powers? The shared primes at the smaller powers will build the **highest common factor**; all the primes at the larger powers will build the **lowest common multiple**. Factoring all the way down was never the destination — it is the vantage point. Lesson 3.3 begins the comparison.',
        },
      ],
    },
    {
      id: 'fm-highest-common-factor',
      number: '3.3',
      title: 'Highest Common Factor',
      concepts: [
        'Common factors of two numbers',
        'HCF as the greatest common divisor',
        'Shared primes at the smaller powers',
        'Coprime numbers and HCF 1',
        'The Euclidean ladder (division method)',
        "Bézout's identity and the crossroads lemma",
        'Greatest-number exam patterns',
      ],
      objectives: [
        'Define common factors and the highest common factor, and read the HCF off two prime factorisations as the shared primes taken at the smaller powers',
        'Run the Euclidean division method — the ladder of remainders — for two and three numbers, and justify it with the swap lemma',
        "State Bézout's identity, prove it by back-substitution, and use it to discharge the crossroads-lemma debt that Lesson 3.2 left open",
        'Generalise Lesson 3.1\'s coprime split into a theorem and deploy the three "greatest number" patterns that examinations recycle',
      ],
      prerequisites: ['fm-divisibility-and-its-tests', 'fm-prime-numbers-factorisation', 'fm-division-remainders-zero'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch3'],
      blocks: [
        {
          kind: 'para',
          text: 'A craft studio keeps two leftover cords: one $84$ cm long, one $126$ cm. The plan is to cut both into pieces of one equal length — and to have nothing left over from either cord. Many lengths oblige: $1$, $2$, $3$, $6$ and $7$ cm all work. The studio wants the **longest** such length, because every join is a weak point and fewer joins make a stronger product. Lesson 3.2 already planted the answer as an exercise: the shared atoms of $84 = 2^2 \\times 3 \\times 7$ and $126 = 2 \\times 3^2 \\times 7$ multiply to $2 \\times 3 \\times 7 = 42$, and indeed $84 = 2 \\times 42$ and $126 = 3 \\times 42$. This lesson turns that lucky observation into machinery — and then pays two debts that earlier lessons deliberately ran up.',
        },
        {
          kind: 'para',
          text: 'The object of the hunt wears three names in the wild: **highest common factor** (HCF), **greatest common divisor** (GCD) and — in older British texts — **greatest common measure** (GCM). Whatever the label, the question is the one Lesson 3.2 promised: two numbers, side by side in their atoms — which primes do they share, and at which powers? The shared primes, taken at the **smaller** powers, build the answer. But this lesson also carries a heavier cargo. Lesson 3.2 proved that prime factorisation is unique, and its proof stood on a "crossroads lemma" it did not prove: a prime dividing a product must divide one of the factors. The debt is due now — and the ladder of this lesson is what pays it.',
        },
        { kind: 'heading', text: 'What "common" means' },
        {
          kind: 'para',
          text: 'Start from the ground floor. A **common factor** of two numbers is a number that divides each of them exactly — one division test passed twice. The number $6$ is a common factor of $48$ and $60$ because $48 = 8 \\times 6$ and $60 = 10 \\times 6$; the number $5$ divides $60$ but not $48$, so it helps only one customer and is not common; $7$ divides neither. Every pair of whole numbers has at least one common factor — the number $1$, which divides everything — so the real question is never whether common factors exist but how **large** they get.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Highest common factor (HCF)',
          text: 'For whole numbers $a$ and $b$ (not both zero), the **highest common factor** is the greatest number that divides both $a$ and $b$. Written $\\gcd(a, b)$, or HCF; also called the **greatest common divisor** (GCD) and the **greatest common measure** (GCM). So $\\gcd(48, 60) = 12$: twelve divides both, and nothing larger does. Two edge behaviours fall straight out of the definition: $\\gcd(n, n) = n$, and $\\gcd(1, n) = 1$ for every $n$. The HCF is never below $1$ — one is common to every pair — and never above the smaller of $a$ and $b$: a common factor of $48$ and $60$ cannot exceed $48$, because it has to fit inside both.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Common factor',
              def: 'A number that divides each of the given numbers exactly. 6 is a common factor of 48 and 60 (48 = 8 × 6, 60 = 10 × 6). Any pair shares at least the factor 1.',
            },
            {
              term: 'Highest common factor (HCF)',
              def: 'The greatest of the common factors, written gcd(a, b); also called GCD or GCM. gcd(48, 60) = 12. Finding it is this lesson\'s whole business.',
            },
            {
              term: 'Coprime',
              def: 'Two whole numbers whose HCF is 1 — they share no prime atom. 8 and 15 are coprime (2³ against 3 × 5); 12 and 18 are not (they share 2 × 3).',
            },
            {
              term: 'Euclidean algorithm',
              def: 'The ladder of remainders: divide the larger number by the smaller, then keep dividing the last divisor by the last remainder until a remainder of 0. The last nonzero remainder is the HCF. Also called the division method.',
            },
            {
              term: 'Back-substitution',
              def: 'Reading the ladder from the bottom up to express the HCF as a whole-number combination of the original pair, such as 144 = 7 × 720 − 4,896.',
            },
            {
              term: "Bézout's identity",
              def: 'The theorem that gcd(a, b) can always be written as a·u + b·v for some (possibly negative) integers u and v — the guarantee that back-substitution always succeeds.',
            },
            {
              term: 'Coprime split',
              def: 'The theorem that if coprime a and b both divide n, then ab divides n. It legalises splitting a divisibility test into coprime parts: 3 and 4 for a test of 12, never 2 and 6.',
            },
          ],
        },
        { kind: 'heading', text: 'Route 1: listing — the honest survey' },
        {
          kind: 'para',
          text: 'The most honest method is also the most tiring: list every factor of each number, keep the entries that appear in both lists, take the largest. For $48$ and $60$ it is perfectly fair. Lesson 3.1 counted the factors of $48$ — ten of them, $1, 2, 3, 4, 6, 8, 12, 16, 24, 48$ — and $60$ offers twelve: $1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60$. Side by side, the shared entries are $1, 2, 3, 4, 6, 12$, so $\\gcd(48, 60) = 12$.',
        },
        {
          kind: 'para',
          text: 'Look once more at that shared list — $1, 2, 3, 4, 6, 12$. It is exactly the list of divisors of $12$: the common factors of a pair are precisely the divisors of their HCF. That structure — not the listing — is the real discovery, and the atoms below will prove it. Listing itself dies quickly: Lesson 3.2\'s gallery gave $4{,}896$ thirty-six factors and $720$ thirty, and intersecting those lists by eye is a minute of error-prone scanning; for a pair like $9{,}499$ and $13{,}915$ it is hopeless. The vantage point of Lesson 3.2 — everything is atoms — offers a better road.',
        },
        { kind: 'heading', text: 'Route 2: the atoms decide' },
        {
          kind: 'para',
          text: 'Put two factorisations side by side: $96 = 2^5 \\times 3$ and $720 = 2^4 \\times 3^2 \\times 5$ — both from Lesson 3.2\'s gallery. Now ask what a common divisor of the two may look like. If $d$ divides $96$, every atom of $d$ must come from $\\{2, 3\\}$, with the $2$ used at most five times and the $3$ at most once — any other prime, or a higher power, would leave $d$ carrying a factor $96$ cannot absorb. If $d$ divides $720$, its atoms come from $\\{2, 3, 5\\}$ with caps $4$, $2$ and $1$. Dividing **both** numbers means respecting both sets of caps at once.',
        },
        {
          kind: 'derivation',
          title: 'The smaller-power rule',
          statement:
            'A number divides both a and b exactly when each of its prime exponents stays within the smaller of the two factorisations\' caps. The greatest such number takes every exponent at its cap: the shared primes at the smaller powers.',
          steps: [
            {
              label: 'Write the caps',
              formula: '96 = 2^5 \\cdot 3^1, \\qquad 720 = 2^4 \\cdot 3^2 \\cdot 5^1',
              explanation:
                'A prime absent from one factorisation has cap 0 there: the 5 is capped at 0 on the 96 side.',
            },
            {
              label: 'A common divisor respects every cap',
              formula: 'd = 2^i \\cdot 3^j \\cdot 5^k, \\quad i \\le 4, \\; j \\le 1, \\; k \\le 0',
              explanation:
                'That is i ≤ min(5, 4) = 4, j ≤ min(1, 2) = 1, k ≤ min(0, 1) = 0. Lesson 3.2\'s uniqueness theorem is doing the work: a divisor\'s atoms cannot outrun the number\'s own.',
            },
            {
              label: 'Independence makes the maximum easy',
              formula: '\\gcd(96, 720) = 2^4 \\cdot 3^1 \\cdot 5^0 = 48',
              explanation:
                'The exponent choices are independent — the same engine as the divisor-count formula of 3.2 — so the largest divisor simply takes every exponent at its cap. No trade-offs exist.',
            },
          ],
          result:
            'HCF(96, 720) = 2⁴ × 3 = 48 — and every common divisor of the pair divides 48, which is why Route 1\'s shared list kept turning out to be exactly the divisors of the HCF.',
        },
        {
          kind: 'equation',
          latex: '\\gcd(a, b) = p_1^{\\min(\\alpha_1, \\beta_1)} \\cdot p_2^{\\min(\\alpha_2, \\beta_2)} \\cdots p_k^{\\min(\\alpha_k, \\beta_k)}',
          note: 'where $a$ and $b$ are written in atoms as products of the primes $p_1, \\ldots, p_k$. The function min picks the smaller exponent; a prime missing from either number enters with exponent 0 and stays home.',
        },
        {
          kind: 'para',
          text: 'Two payoffs — one quiet, one theatrical. Quiet: the rule survives missing primes gracefully. The gallery pair $2{,}025 = 3^4 \\times 5^2$ and $4{,}896 = 2^5 \\times 3^2 \\times 17$ share only the prime $3$, at powers $4$ and $2$, so $\\gcd(2{,}025, 4{,}896) = 3^2 = 9$; the $2$, the $5$ and the $17$ are capped at $0$ on one side and simply stay out. Theatrical: the answer for the first pair is $48$ — the very number that opened Lesson 3.2, whose five mosaic rectangles started this whole chapter. The opening tiles have been the greatest common factor of $96$ and $720$ all along.',
        },
        {
          kind: 'formula',
          name: 'HCF from the atoms',
          latex: '\\gcd(a, b) = \\prod p^{\\min(\\alpha, \\beta)}',
          note: 'For each prime: take the SMALLER exponent from the two factorisations. Primes missing from either side enter with exponent 0. The larger powers belong to the LCM — Lesson 3.4\'s rule, not this one\'s.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The classic slip: reaching for the larger power',
          text: 'The smaller-power rule is one glance\'s worth of arithmetic, and the most common examination slip is grabbing the larger exponent instead. From $96 = 2^5 \\times 3$ and $720 = 2^4 \\times 3^2 \\times 5$, the product $2^5 \\times 3^2 = 288$ is **not** a common factor of anything here — it exceeds $96$ itself, and no divisor of $96$ can do that. The larger-power product is genuine mathematics, but it belongs to the **lowest common multiple** (Lesson 3.4). A second slip worth naming: when one number divides the other — $102 = 3 \\times 34$ — the HCF is the smaller number itself, $34$; no ladder and no atoms are needed.',
        },
        {
          kind: 'para',
          text: 'And the studio\'s cords? The atoms finish the story in one line:',
        },
        {
          kind: 'equation',
          latex: '\\gcd(84, 126) = 2^{\\min(2,1)} \\cdot 3^{\\min(1,2)} \\cdot 7^{\\min(1,1)} = 2 \\cdot 3 \\cdot 7 = 42',
          note: 'The seed from Exercise L3 of Lesson 3.2, promoted from observation to computation: cords of 84 cm and 126 cm cut into 42 cm pieces — two pieces from the first cord, three from the second, nothing wasted.',
        },
        { kind: 'heading', text: 'Coprime: when nothing is shared' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Coprime (relatively prime)',
          text: 'Two whole numbers are **coprime** when their HCF is $1$ — when the only common factor is the unavoidable $1$. Equivalently: they share no prime atom. Examples: $8$ and $15$ ($2^3$ against $3 \\times 5$), $9$ and $35$ ($3^2$ against $5 \\times 7$), $16$ and $17$. Coprimality is about **sharing**, not size: $1{,}024 = 2^{10}$ and $2{,}025 = 3^4 \\times 5^2$ are both four digits long and share nothing at all. Examination papers lean on the word constantly, and so will Lessons 3.4 and 3.5.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Any two consecutive numbers are coprime',
          text: 'If $d$ divides both $n$ and $n + 1$, it divides their difference $1$ — and the only positive divisor of $1$ is $1$ itself. So $\\gcd(n, n + 1) = 1$ always: $16$ and $17$, $87$ and $88$, even $1{,}000$ and $1{,}001$. The difference argument behind this one-liner is the same engine the ladder will use below — a common divisor of two numbers always divides their difference.',
        },
        {
          kind: 'para',
          text: 'Now Lesson 3.1\'s loose thread can be named. Its compound test for $12$ insisted on the split $12 = 3 \\times 4$ and forbade $2 \\times 6$, warning that the second over-admits numbers like $18$ — divisible by $2$ and by $6$, but not by $12$. The reason is finally visible: $3$ and $4$ are **coprime**, so divisibility by each forces divisibility by their product; $2$ and $6$ share the atom $2$, so divisibility by each says almost nothing about the product. The general statement deserves a theorem — but its proof needs one more tool, so the ladder comes first.',
        },
        { kind: 'heading', text: 'Route 3: the Euclidean ladder' },
        {
          kind: 'para',
          text: 'Factorising $4{,}896$ cost real work in Lesson 3.2 — a strip chain of five divisions before the primes gave in. But look back at what the atoms route actually used: not the full factorisations, only the **shared** part. A machine that could reach the shared part without factorising at all would make big numbers stop being a problem. The machine is $2{,}400$ years old and needs nothing but the division algorithm from Lesson 2.4: divide the larger number by the smaller, then keep dividing the last divisor by the last remainder. The remainders shrink — Lesson 3.1\'s guard rail $r < b$ guarantees it — so the process must end, and the last nonzero remainder is the HCF.',
        },
        {
          kind: 'example',
          title: 'The ladder for 4,896 and 720',
          steps: [
            'Divide the larger by the smaller: $4{,}896 = 6 \\times 720 + 576$. The remainder is $576$.',
            'Divide the last divisor by the last remainder: $720 = 1 \\times 576 + 144$. The remainder is $144$.',
            'Once more: $576 = 4 \\times 144 + 0$. The remainder is $0$ — the ladder has ended.',
            'Read the answer off the last **nonzero** remainder: $\\gcd(4{,}896, 720) = 144$. Cross-check with the atoms: $2^4 \\times 3^2 = 144$ — the same shared part, reached with three divisions and no factorisation.',
          ],
        },
        {
          kind: 'para',
          text: 'Why is the last nonzero remainder the whole answer? Because every rung of the ladder preserves the set of common divisors — and that is a two-line consequence of the division algorithm.',
        },
        {
          kind: 'derivation',
          title: 'The swap lemma',
          statement:
            'The pairs (a, b) and (b, a − q·b) have exactly the same common divisors. So each rung of the ladder swaps the pair for a smaller one without changing the HCF — and the last nonzero remainder is the HCF of the original pair.',
          steps: [
            {
              label: 'Down the ladder: a common divisor survives',
              formula: 'd \\mid a, \\; d \\mid b \\;\\Rightarrow\\; d \\mid (a - q\\,b)',
              explanation:
                'd divides both terms of the difference, so it divides the difference. Writing r = a − q·b: every common divisor of (a, b) also divides (b, r).',
            },
            {
              label: 'Up the ladder: and back again',
              formula: 'd \\mid b, \\; d \\mid (a - q\\,b) \\;\\Rightarrow\\; d \\mid (a - q\\,b) + q\\,b = a',
              explanation:
                'The reverse walk rebuilds a out of b and r. So the two pairs share not merely some divisors but ALL of them — in particular the same greatest one.',
            },
            {
              label: 'Termination is guaranteed',
              formula: '720 > 576 > 144 > 0',
              explanation:
                'Lesson 3.1\'s remainder bound r < b makes each remainder strictly smaller than the divisor above it. A strictly shrinking list of whole numbers must reach 0 — the ladder cannot run forever.',
            },
            {
              label: 'Read the last nonzero row',
              formula: '\\gcd(4{,}896, 720) = \\gcd(720, 576) = \\gcd(576, 144) = 144',
              explanation:
                'Chaining the swaps: each HCF equals the next. When the final division comes out exact, the divisor of that row — the last nonzero remainder — divides both numbers above it, and by the swap argument divides every row above that: it is a common divisor. And nothing larger can be one: any larger common divisor would survive all the swaps down the ladder and divide a positive remainder smaller than itself, which is impossible.',
            },
          ],
          result:
            'The HCF survives every swap unchanged and ends as the last nonzero remainder: gcd(a, b) = gcd(b, r₁) = gcd(r₁, r₂) = ⋯ = r_k.',
        },
        {
          kind: 'formula',
          name: 'The Euclidean ladder (division method)',
          latex: '\\gcd(a, b) = r_k \\quad \\text{where } r_{k+1} = 0',
          note: 'Divide larger by smaller, then each divisor by its remainder, until a remainder of 0. The last nonzero remainder is the HCF — no factorisation required. For three or more numbers: gcd(a, b, c) = gcd(gcd(a, b), c), in any order.',
        },
        {
          kind: 'example',
          title: 'Three cords, one longest piece',
          steps: [
            'The studio gains a third cord: $1{,}248$ cm. All three are to be cut into equal longest pieces with nothing wasted — the wanted length divides all three numbers: HCF($1{,}152$, $768$, $1{,}248$).',
            'Ladder the first pair: $1{,}152 = 1 \\times 768 + 384$, then $768 = 2 \\times 384 + 0$. So $\\gcd(1{,}152, 768) = 384$.',
            'Fold in the third: $1{,}248 = 3 \\times 384 + 96$, then $384 = 4 \\times 96 + 0$. So $\\gcd(384, 1{,}248) = 96$ — and by the chaining rule, HCF($1{,}152$, $768$, $1{,}248$) $= 96$ cm.',
            'Atoms agree: $2^7 \\times 3^2$, $2^8 \\times 3$ and $2^5 \\times 3 \\times 13$ share $2^5 \\times 3 = 96$ — the spare $2$s, the spare $3$ and the lonely $13$ all fall away. Two routes, one answer: pieces of $96$ cm — twelve from the first cord, eight from the second, thirteen from the third.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Two factorisations as overlapping territories. Everything of 96 = 2⁵ × 3 lives in the left circle; everything of 720 = 2⁴ × 3² × 5 lives in the right. The overlap holds exactly the shared atoms — 2⁴ × 3 = 48 — which is why the overlap\'s product is the HCF. The union, every atom at its larger power (2 × 48 × 15 = 1,440), previews Lesson 3.4: that product is the LCM. And the picture is quietly doing double duty — its two products multiply to 48 × 1,440 = 69,120 = 96 × 720, a coincidence worth suspecting. Lesson 3.5 settles it.',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two overlapping circles for 96 and 720. The left-only region holds 2, the overlap holds 2 x 2 x 2 x 2 x 3 equal 48, the right-only region holds 3 x 5. The overlap is the HCF 48; the union is the LCM 1,440.">
  <g font-size="14" fill="currentColor">
    <text x="205" y="30" text-anchor="middle" font-weight="700">96 = 2·2·2·2·2·3</text>
    <text x="555" y="30" text-anchor="middle" font-weight="700">720 = 2·2·2·2·3·3·5</text>
    <circle cx="275" cy="200" r="150" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <circle cx="485" cy="200" r="150" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <text x="222" y="206" text-anchor="middle">2</text>
    <text x="222" y="228" text-anchor="middle" font-size="12" opacity="0.75">the spare two</text>
    <text x="380" y="176" text-anchor="middle">2·2·2·2·3</text>
    <text x="380" y="202" text-anchor="middle" font-weight="700">= 48</text>
    <text x="380" y="226" text-anchor="middle" font-size="12" opacity="0.75">the shared part</text>
    <text x="538" y="206" text-anchor="middle">3 × 5</text>
    <text x="538" y="228" text-anchor="middle" font-size="12" opacity="0.75">the spare 3 and the 5</text>
    <line x1="380" y1="370" x2="380" y2="351" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
    <text x="380" y="394" text-anchor="middle" font-weight="700">overlap = HCF = 48</text>
    <text x="380" y="418" text-anchor="middle">everything = 2 × 48 × 15 = 1,440 — the LCM, Lesson 3.4</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Which route deserves the work? The ladder and the atoms are honest rivals, and each has days when it shines. Watch one pair from both sides: $\\gcd(2{,}025, 4{,}896)$ by ladder takes eight rows — $4{,}896 = 2 \\times 2{,}025 + 846$, then $2{,}025 = 2 \\times 846 + 333$, and so on down to $18 = 2 \\times 9 + 0$ — while the atoms answer in one glance: only the prime $3$ is shared, at powers $4$ and $2$, so the HCF is $9$. For $4{,}896$ and $720$ the trade reverses: three ladder rows beat two full factorisations. The exam-hall habit worth drilling:',
        },
        {
          kind: 'table',
          caption: 'Choosing the route',
          head: ['Route', 'Reach for it when', 'Cost', 'This chapter\'s instance'],
          rows: [
            ['Listing every factor', 'both numbers are small — two digits, at a pinch three', 'minutes, and easy to drop a factor', '48 and 60 → 12'],
            ['Atoms (prime factorisation)', 'the numbers factorise easily — small primes, Lessons 3.1–3.2 trained', 'one glance per shared prime', '96 and 720 → 48'],
            ['Euclidean ladder', 'the numbers are big, or factorisation looks ugly', 'one division per row', '4,896 and 720 → 144'],
          ],
        },
        { kind: 'heading', text: 'The debt comes due: Bézout and the crossroads lemma' },
        {
          kind: 'para',
          text: 'Now the promise. Lesson 3.2 proved the Fundamental Theorem — every number factors into primes in exactly one way — but its uniqueness argument leaned on Euclid\'s **crossroads lemma**: if a prime $p$ divides a product $a \\times b$, then $p$ divides $a$ or $p$ divides $b$. The lemma was stated, used, and honestly marked as a debt. The ladder pays it — and the payment begins with a curious piece of bookkeeping: read the ladder backwards.',
        },
        {
          kind: 'derivation',
          title: 'Back-substitution: the HCF as a combination',
          statement:
            'Every remainder in the ladder is a difference of multiples of earlier rows — so the HCF itself can be rebuilt out of the original pair using nothing but whole-number arithmetic, negative signs allowed.',
          steps: [
            {
              label: 'Start at the answer row',
              formula: '144 = 720 - 1 \\times 576',
              explanation:
                'The ladder\'s second row says exactly this: 720 = 1 × 576 + 144.',
            },
            {
              label: 'Substitute the row above',
              formula: '576 = 4{,}896 - 6 \\times 720 \\;\\Rightarrow\\; 144 = 720 - (4{,}896 - 6 \\times 720)',
              explanation:
                'The first row of the ladder expresses 576 in terms of the original pair. Substituting removes the remainder from the story.',
            },
            {
              label: 'Tidy',
              formula: '144 = 7 \\times 720 - 4{,}896',
              explanation:
                'Expand: 720 + 6 × 720 = 7 × 720. Check the arithmetic: 5,040 − 4,896 = 144. The HCF of the pair has become a combination of the pair — one negative coefficient, nothing exotic.',
            },
          ],
          result:
            '7 × 720 − 4,896 = 144 = gcd(4,896, 720). The ladder always allows this: every remainder is a difference of multiples of the rows above it, so climbing back up builds the HCF out of a and b.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Bézout\'s identity',
          text: 'For any whole numbers $a$ and $b$ (not both zero) there exist **integers** $u$ and $v$ — possibly negative — with $a \\cdot u + b \\cdot v = \\gcd(a, b)$. Conversely, every positive number of the form $a \\cdot u + b \\cdot v$ is a multiple of $\\gcd(a, b)$: the HCF divides every combination. Back-substitution on the ladder is the constructive proof — it always delivers the coefficients. Étienne Bézout proved the polynomial version in 1779; the integer form had appeared a century and a half earlier in Bachet\'s Problèmes plaisants of 1624.',
        },
        {
          kind: 'derivation',
          title: 'Euclid\'s crossroads lemma, discharged',
          statement:
            'If a prime p divides a × b but does not divide a, then p must divide b. A prime cannot straddle the crossroads — it must take one of the two roads.',
          steps: [
            {
              label: 'The HCF of p and a is 1',
              formula: '\\gcd(p, a) = 1',
              explanation:
                'p is prime: its only divisors are 1 and p. The assumption p does not divide a removes p, so 1 is the greatest common divisor. The pair is coprime — this lesson\'s word doing proof work.',
            },
            {
              label: 'Bézout speaks',
              formula: 'u \\cdot p + v \\cdot a = 1',
              explanation:
                'Bézout\'s identity with gcd 1: integers u and v exist. This is exactly what the ladder\'s back-substitution guarantees.',
            },
            {
              label: 'Multiply through by b',
              formula: 'u \\cdot p \\cdot b + v \\cdot a \\cdot b = b',
              explanation:
                'Multiply the identity by b — the product that p is accused of dividing.',
            },
            {
              label: 'p divides both terms on the left',
              formula: 'p \\mid u \\cdot p \\cdot b \\quad \\text{and} \\quad p \\mid v \\cdot a \\cdot b',
              explanation:
                'The first term contains p outright. The second contains a × b, which p divides by assumption.',
            },
            {
              label: 'So p divides the sum',
              formula: 'p \\mid b',
              explanation:
                'p divides both summands, hence their sum — which is b. The prime went down the b road. Together with the obvious case p | a, every prime dividing a product divides at least one factor.',
            },
          ],
          result:
            'The crossroads lemma is proved — and with it, Lesson 3.2\'s uniqueness argument for the Fundamental Theorem stands on nothing deeper than the division algorithm.',
        },
        {
          kind: 'para',
          text: 'Stand back and look at what the chapter has become. Lesson 2.4 signed the division algorithm $n = q \\times d + r$. Lesson 3.1 turned remainders into screening tests. Lesson 3.2 used the algorithm to factor numbers into atoms and built uniqueness on the crossroads lemma. This lesson ran the algorithm as a ladder, read the ladder backwards into Bézout\'s identity, and used Bézout to prove the crossroads lemma. Every theorem in the chapter hangs, directly or indirectly, from that one hook — division with remainder. Even the coprime split now yields:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The coprime split, generalised',
          text: 'If $\\gcd(a, b) = 1$, $a \\mid n$ and $b \\mid n$, then $ab \\mid n$. The proof is Bézout\'s trick once more: write $n = a \\cdot s$; since $b$ divides $a \\cdot s$ while sharing nothing with $a$, the same argument as the crossroads lemma (with the coprime pair standing where the prime stood) forces $b \\mid s$ — so $n = a \\cdot b \\cdot t$. Instance: $3 \\mid 2{,}376$ (digit sum $18$) and $4 \\mid 2{,}376$ (tail $76$), and $\\gcd(3, 4) = 1$ — so $12 \\mid 2{,}376$: indeed $2{,}376 = 12 \\times 198$. Counter-instance: $2 \\mid 18$ and $6 \\mid 18$ but $12$ does not divide $18$ — the parts share $2$, so the licence was never valid. Lesson 3.1\'s trap is explained at last, not just survived.',
        },
        {
          kind: 'para',
          text: 'Examinations dress the HCF in story clothes, and three costumes recur so often that they deserve their own table. All three are the definition read backwards: the wanted number is a greatest common divisor, and the story only needs translating into "divides what, exactly?".',
        },
        {
          kind: 'table',
          caption: 'The three "greatest number" patterns',
          head: ['The story', 'The translation', 'Instance'],
          rows: [
            ['A greatest length or size that measures several things exactly', 'HCF of the measures — no adjustment', 'cords of 1,152, 768 and 1,248 cm → 96 cm'],
            ['A greatest number dividing x, y, z and leaving remainders r₁, r₂, r₃', 'subtract each remainder, then take the HCF: gcd(x − r₁, y − r₂, z − r₃)', '689, 1,124, 1,706 leaving 5, 8, 14 → HCF(684, 1,116, 1,692) = 36'],
            ['A greatest number dividing x, y, z and leaving the same unknown remainder', 'take the HCF of the pairwise differences', '152, 277, 427 → HCF(125, 150, 275) = 25, remainder 2'],
          ],
        },
        {
          kind: 'para',
          text: 'Why the moves work — pattern two, done once and believed forever: if $x = d \\cdot q_1 + r_1$, then $x - r_1 = d \\cdot q_1$ exactly, so the number the story wants is a common divisor of the reduced numbers $x - r_1$, $y - r_2$, $z - r_3$ — and the greatest such is their HCF. Pattern three hides a small subtraction identity: if $x = d \\cdot q_1 + s$ and $y = d \\cdot q_2 + s$ with the same leftover $s$, then $x - y = d \\cdot (q_1 - q_2)$ — the unknown $s$ cancels, which is why the differences know the answer even though $s$ was never told. Dividing back recovers the table\'s secret: $152 = 6 \\times 25 + 2$, $277 = 11 \\times 25 + 2$, $427 = 17 \\times 25 + 2$ — the remainder was $2$ all along.',
        },
        {
          kind: 'formula',
          name: 'The remainder patterns',
          latex: '\\gcd(x - r_1, \\; y - r_2, \\; z - r_3)',
          note: 'Subtract what each division leaves behind; the HCF of the leftovers is the greatest number the story wants. Exact division is the case r = 0. Unknown common remainder: use the pairwise differences — it cancels in every x − y. (The LCM twins of these patterns arrive in Lessons 3.4–3.5.)',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The oldest algorithm in the classroom (c. 300 BCE — 1779)',
          text: 'The ladder is Book VII of **Euclid\'s Elements**: proposition 2 is the method itself — given two numbers not relatively prime, to find their greatest common measure — and proposition 1 is the difference engine behind it. It is, by wide agreement, the oldest algorithm still in daily use; the very word *algorithm* reached Europe through the name of the ninth-century Baghdad scholar **al-Khwārizmī**. The combination viewpoint has its own story: **Bachet\'s Problèmes plaisants (1624)** asked when $a x + b y = c$ has whole-number solutions, and **Étienne Bézout (1779)** carried the question to polynomials — lending the identity a name it did not quite own. Two millennia of teachers have kept the ladder because it never needs factorisation: divide, swap, repeat.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Direct HCF items are permanent fixtures of SSC, Railway and bank papers: "find the HCF of 18 and 48" ($6$), "the HCF of 91, 112 and 49" ($7$ — all three carry a seven: $91 = 7 \\times 13$, $112 = 2^4 \\times 7$, $49 = 7^2$), and the three greatest-number patterns of the table above. Co-prime hunting is its own genre — how many coprime pairs have sum $8$? Two: $1 + 7$ and $3 + 5$ — and the coprime-split theorem powers compound divisibility tests across NTSE and CUET papers. CBSE Class 6 meets the HCF in its chapter on playing with numbers, via the listing route and the atoms route exactly as built here. One promise to bank for Lesson 3.5: HCF and LCM always satisfy $\\gcd(a, b) \\times \\mathrm{lcm}(a, b) = a \\times b$ — the Venn figure\'s two products already whispered it ($48 \\times 1{,}440 = 96 \\times 720$).',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Side by side: 96 = 2⁵ × 3 and 720 = 2⁴ × 3² × 5. The HCF is:',
              options: [
                '288',
                '48',
                '1,440',
                '144',
              ],
              answer: 1,
              explain:
                'Shared primes at the smaller powers: 2⁴ × 3 = 48 (Option 2). Option 1 grabbed the larger powers — 288 = 2⁵ × 3² exceeds 96 itself, so it divides neither number. Option 3 is the union product 2 × 48 × 15 = 1,440 — the LCM, Lesson 3.4\'s object. Option 4 is HCF(4,896, 720) = 2⁴ × 3²: the right rule applied to the wrong pair — here the 3 is capped at 1 by the 96 side.',
            },
            {
              q: 'Which pair is coprime?',
              options: [
                '14 and 21',
                '15 and 25',
                '12 and 18',
                '9 and 35',
              ],
              answer: 3,
              explain:
                '9 = 3² and 35 = 5 × 7 share no prime atom (Option 4). Option 1 shares 7 (14 = 2 × 7, 21 = 3 × 7). Option 2 shares 5. Option 3 shares 6 — gcd(12, 18) = 6, the very pair that broke the 2 × 6 split in Lesson 3.1.',
            },
            {
              q: 'You run the ladder: 126 = 1 × 84 + 42, then 84 = 2 × 42 + 0. The HCF of 126 and 84 is:',
              options: [
                '21 — half of 42',
                '84 — the divisor of the row above',
                '42 — the last nonzero remainder',
                '126 — the larger number',
              ],
              answer: 2,
              explain:
                'The ladder\'s reading rule: the last nonzero remainder (Option 3). The atoms confirm: 84 = 2² × 3 × 7 and 126 = 2 × 3² × 7 share 2 × 3 × 7 = 42 — the seed Exercise L3 planted in Lesson 3.2. Option 1 is numerology. Option 2 mistakes the divisor of the row above the answer for the answer itself. Option 4 confuses the HCF with a dividend.',
            },
            {
              q: 'The greatest number that divides 689, 1,124 and 1,706 leaving remainders 5, 8 and 14 respectively is:',
              options: [
                '36',
                '12',
                '6',
                '4',
              ],
              answer: 0,
              explain:
                'Subtract the remainders: 684, 1,116, 1,692 — atoms 2² × 3² × 19, 2² × 3² × 31, 2² × 3² × 47 — so the HCF of the leftovers is 2² × 3² = 36 (Option 1). Options 2, 3 and 4 are genuine common factors of the leftovers — but every common divisor divides 36, so none of them is the greatest. Rebuild: 689 = 19 × 36 + 5, 1,124 = 31 × 36 + 8, 1,706 = 47 × 36 + 14.',
            },
            {
              q: 'Back-substitution on the ladder for 4,896 and 720 expresses the HCF as a combination. Which line is right?',
              options: [
                '6 × 720 − 4,896',
                '7 × 720 − 4,896',
                '4,896 − 7 × 720',
                '4,896 − 6 × 720',
              ],
              answer: 1,
              explain:
                '144 = 720 − 576 = 720 − (4,896 − 6 × 720) = 7 × 720 − 4,896, and 5,040 − 4,896 = 144 (Option 2). Option 1 evaluates to −576 — the first remainder with the sign unreversed. Option 3 gives −144. Option 4 is the ladder\'s first row — 576 — the back-substitution never performed.',
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
                  q: 'List all the factors of 36 and of 54. Circle the common factors and state the HCF — then check that the circled list is exactly the set of divisors of the HCF.',
                  solution:
                    'The factors of $36$: $1, 2, 3, 4, 6, 9, 12, 18, 36$ — nine, as Lesson 3.2\'s formula promised for $2^2 \\times 3^2$: $(2 + 1)(2 + 1) = 9$. The factors of $54$: $1, 2, 3, 6, 9, 18, 27, 54$ — eight, since $54 = 2 \\times 3^3$ gives $(1 + 1)(3 + 1) = 8$. Common: $1, 2, 3, 6, 9, 18$ — so the HCF is $18$. And the divisors of $18$ are exactly $\\{1, 2, 3, 6, 9, 18\\}$: the circled list. Not a coincidence — the common factors of a pair are always precisely the divisors of their HCF, because the smaller-power rule caps every common divisor\'s exponents at the HCF\'s own.',
                },
                {
                  q: 'Without factorising anything, explain why 1,000 and 1,001 are coprime — and generalise.',
                  solution:
                    'They are consecutive. Suppose $d$ divides both: then $d$ divides the difference $1{,}001 - 1{,}000 = 1$, and the only positive divisor of $1$ is $1$ itself. So the HCF is $1$ — coprime. The generalisation costs nothing: **any** two consecutive whole numbers are coprime, because any common divisor divides their difference, which is $1$. The same difference argument drives the swap lemma and the exam patterns below: a common divisor of two numbers always divides their difference.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find, by the atoms route: (a) HCF(36, 84)  (b) HCF(34, 102)  (c) HCF(27, 63).',
                  solution:
                    '(a) $36 = 2^2 \\times 3^2$ and $84 = 2^2 \\times 3 \\times 7$: the $2$ is shared at $\\min(2, 2) = 2$ and the $3$ at $\\min(2, 1) = 1$, so the HCF is $2^2 \\times 3 = 12$. (b) $34 = 2 \\times 17$ and $102 = 2 \\times 3 \\times 17$: everything of $34$ is shared, so the HCF is $34$ itself — indeed $102 = 3 \\times 34$, and when one number divides the other, the HCF is the smaller. (c) $27 = 3^3$ and $63 = 3^2 \\times 7$: the $3$ is shared at $\\min(3, 2) = 2$, so $3^2 = 9$.',
                },
                {
                  q: 'Find HCF(70, 105, 175) by atoms; then confirm by the ladder with the folding rule HCF(a, b, c) = HCF(HCF(a, b), c).',
                  solution:
                    'Atoms: $70 = 2 \\times 5 \\times 7$, $105 = 3 \\times 5 \\times 7$, $175 = 5^2 \\times 7$. The prime $5$ appears at powers $1, 1, 2$ — take the smaller: $1$. The prime $7$ at $1, 1, 1$. HCF $= 5 \\times 7 = 35$. Ladder: $\\gcd(70, 105)$ — $105 = 1 \\times 70 + 35$, then $70 = 2 \\times 35 + 0$ — gives $35$. Fold in the third: $175 = 5 \\times 35$ exactly, so $\\gcd(35, 175) = 35$. Same answer, and the order of folding never matters: each fold preserves the set of common divisors, by the swap lemma.',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The seed repaid. Lesson 3.2\'s Exercise L3 found the shared atoms of 84 and 126. Now run the ladder on (126, 84) and confirm it lands on the same 42 — then explain why the two routes must always agree.',
                  solution:
                    'Ladder: $126 = 1 \\times 84 + 42$, then $84 = 2 \\times 42 + 0$ — the last nonzero remainder is $42$. Atoms: $84 = 2^2 \\times 3 \\times 7$ and $126 = 2 \\times 3^2 \\times 7$ give $2 \\times 3 \\times 7 = 42$. The two routes must agree because they compute the same object: the swap lemma says the ladder never changes the set of common divisors, and the smaller-power rule says the greatest member of that set is exactly the shared-atom product. Two languages, one theorem.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Test 44,100 for divisibility by 63 = 7 × 9 using the coprime split, and explain why the split is legal here.',
                  solution:
                    '$7 \\mid 44{,}100$ (indeed $44{,}100 = 7 \\times 6{,}300$) and $9 \\mid 44{,}100$ (digit sum $4 + 4 + 1 = 9$). The parts are coprime: $7$ is prime, $9 = 3^2$, no shared atom — $\\gcd(7, 9) = 1$. The coprime-split theorem licenses the product: $63 \\mid 44{,}100$. Rebuild: $44{,}100 = 63 \\times 700$. The split is legal **because** the parts are coprime — $7 \\times 9$ passes where $2 \\times 6$ would not.',
                },
                {
                  q: 'Is 1,053,060 divisible by 63? Answer with the same split, naming exactly which part fails.',
                  solution:
                    'The digit sum is $1 + 0 + 5 + 3 + 0 + 6 + 0 = 15$, which is not a multiple of $9$ — so $9$ does not divide $1{,}053{,}060$ (the leftover is $6$: $1{,}053{,}060 = 9 \\times 117{,}006 + 6$). One part of the coprime split has failed, and the theorem needs **both** parts: $63$ does not divide $1{,}053{,}060$. (The $7$ also misses it — $1{,}053{,}060 = 7 \\times 150{,}437 + 1$ — but one failure settles the verdict; that is the economy of the split.)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Find the greatest number that divides 689, 1,124 and 1,706 leaving remainders 5, 8 and 14 respectively.',
                  solution:
                    'Subtract the remainders: $689 - 5 = 684$, $1{,}124 - 8 = 1{,}116$, $1{,}706 - 14 = 1{,}692$. The wanted number divides all three leftovers exactly. Atoms: $684 = 2^2 \\times 3^2 \\times 19$, $1{,}116 = 2^2 \\times 3^2 \\times 31$, $1{,}692 = 2^2 \\times 3^2 \\times 47$ — the shared part is $2^2 \\times 3^2 = 36$. Answer: $36$. Rebuild: $689 = 19 \\times 36 + 5$, $1{,}124 = 31 \\times 36 + 8$, $1{,}706 = 47 \\times 36 + 14$. Note the quotients $19, 31, 47$ are prime — so no larger number can divide all three leftovers, and the answer is forced.',
                },
                {
                  q: 'Find the greatest number that divides 152, 277 and 427 leaving the same remainder in each case — and identify that remainder.',
                  solution:
                    'The remainder is unknown, so work with the differences: $277 - 152 = 125$, $427 - 277 = 150$, $427 - 152 = 275$. Atoms: $125 = 5^3$, $150 = 2 \\times 3 \\times 5^2$, $275 = 5^2 \\times 11$ — shared $5^2 = 25$. Answer: $25$. Divide back to recover the secret: $152 = 6 \\times 25 + 2$, $277 = 11 \\times 25 + 2$, $427 = 17 \\times 25 + 2$ — the common remainder is $2$. Why differences suffice: if $x = d \\cdot q_1 + s$ and $y = d \\cdot q_2 + s$, then $x - y = d \\cdot (q_1 - q_2)$ — the unknown $s$ cancels.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The composer\'s problem. Find every pair of numbers whose HCF is 12 and whose sum is 156 — and prove the list is complete.',
                  solution:
                    'Write the numbers as $12a$ and $12b$ with $\\gcd(a, b) = 1$: any atom shared by $a$ and $b$ would ride through the $12$ and enlarge the HCF. Then $12(a + b) = 156$, so $a + b = 13$. Now every split of $13$ is automatically coprime: a common divisor of $a$ and $13 - a$ divides their sum $13$, so it is $1$ or $13$ — and $0 < a < 13$ rules out $13$. (Thirteen being prime is the gift; the sum was chosen so the reduced sum is prime, making **every** pair work.) The pairs with $a < b$: $(1, 12), (2, 11), (3, 10), (4, 9), (5, 8), (6, 7)$ — giving $(12, 144)$, $(24, 132)$, $(36, 120)$, $(48, 108)$, $(60, 96)$, $(72, 84)$. Completeness: any solution must take the form $12a, 12b$ with $a + b = 13$, and the six pairs exhaust $a < b$; each has HCF exactly $12$, since $\\gcd(12a, 12b) = 12 \\times \\gcd(a, b) = 12$. Six answers, no seventh.',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'Two objects now live at the vantage point — one built, one promised. The shared primes at the smaller powers assembled the HCF, and the ladder reached the same answers without ever factorising; between them, the coprime split and Bézout\'s identity turned Lesson 3.1\'s warning and Lesson 3.2\'s debt into theorems. Still waiting in the picture: the primes at the **larger** powers. The Venn figure has already drawn them — the union territory $2 \\times 48 \\times 15 = 1{,}440$, the smallest number that both $96$ and $720$ divide. That is the **lowest common multiple**, and it has a story of its own: bells that ring together, buses that leave together, timetables that collide. Lesson 3.4 begins there.',
        },
      ],
    },
  ],
}
