import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 2: The Four Operations
 *
 * LESSONS WRITTEN: 2.1 Addition and the Art of Carrying · 2.2 Subtraction
 * and Borrowing. CHAPTER IN PROGRESS (unit 2 of the unit-by-unit cadence,
 * started 2026-11-03). Lessons 2.3–2.5 are planned (see plannedLessons below)
 * and are authored one per unit cycle. References for this unit: Khattar,
 * Quantitative Aptitude for Competitive Examinations (4e) ch. 4
 * "Simplification" + NCERT Class 6 ch. 2 "Whole Numbers" topic coverage — see
 * docs/project/SOURCE_LOG.md. Exposition original; all arithmetic verified by
 * scripts/verify-unit-2.ts (114 checks) BEFORE writing.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'the-four-operations',
  title: 'The Four Operations',
  summary:
    'Addition, subtraction, multiplication and division — first as actions on quantities, then as algorithms on numerals, where the overflow argument from Chapter 1 returns as carrying and borrowing. Includes order of operations, estimation checks, and why division by zero is undefined.',
  status: 'in-progress',
  plannedLessons: [
    'Multiplication as Repeated Addition — and Beyond',
    'Division, Remainders and Why Zero Never Divides',
    'Order of Operations and the Language of Expressions',
  ],
  lessons: [
    {
      id: 'fm-addition-carrying',
      number: '2.1',
      title: 'Addition and the Art of Carrying',
      concepts: [
        'Addition as counting on',
        'Addend and sum',
        'Commutative and associative properties',
        'Additive identity (zero)',
        'Column addition and the carry',
        'Why the carry is never more than 1',
        'Mod-9 digit-sum checksum',
      ],
      objectives: [
        'Explain addition as counting on, and show it as a jump on the number line',
        'State and use the commutative, associative and identity properties of addition',
        'Execute column addition with carries reliably — and prove why a carry can never exceed 1',
        'Use the mod-9 digit-sum checksum to catch errors, and know exactly when it fails',
      ],
      prerequisites: ['fm-numbers-digits-place-value'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Addition is the first operation humanity ever performed on numbers — older than numerals, older than writing. The herder from Lesson 1.1 who tallied the flock at dawn and again at dusk faced an addition problem the moment two herds merged: how many animals *altogether*? Notice what the question asks. It does not ask for the sheep one by one; it asks for a **new number built from two old ones**. Addition is the operation of combining quantities, and the number it produces is called the **sum**.',
        },
        {
          kind: 'para',
          text: 'There are two ways a child (or a herder) can actually find $4 + 3$. The slow way is **counting all**: merge the piles and count every animal from scratch — one, two, three, four, five, six, seven. The fast way is **counting on**: hold the first pile\'s size in mind, say "four", and continue three more steps — *five, six, seven*. Nothing was recounted; we merely started the count from where the first number already stood. That small savings is the beginning of all arithmetic technique, and it deserves a picture.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Addend',
              def: 'Any one of the numbers being added. In $4 + 3 = 7$, both 4 and 3 are addends.',
            },
            {
              term: 'Sum',
              def: 'The result of addition — the number that names the combined quantity. In $4 + 3 = 7$, the sum is 7.',
            },
            {
              term: 'Commutative property of addition',
              def: 'Swapping the addends never changes the sum: $a + b = b + a$ for all whole numbers.',
            },
            {
              term: 'Associative property of addition',
              def: 'Regrouping the brackets never changes the sum: $(a + b) + c = a + (b + c)$.',
            },
            {
              term: 'Additive identity',
              def: 'Zero is the number that changes nothing: $a + 0 = a$ for every whole number $a$.',
            },
            {
              term: 'Carry',
              def: 'The 1 passed leftward to the next seat when a column\'s total reaches ten or more — ten of one seat becoming one of the next.',
            },
          ],
        },
        { kind: 'heading', text: 'Addition on the number line' },
        {
          kind: 'para',
          text: 'On the number line from Lesson 1.1, adding $3$ to $4$ means: stand at $4$, hop three steps to the right, land at $7$. Counting-on made visible. Now the question that quietly changed mathematics: what does $3 + 4$ look like? Stand at $3$, hop four steps right — and land on exactly the same $7$. Two different starting points, two different hop counts, one identical landing place. That is not a coincidence of small numbers; it is a structural fact, and the next figure shows it as geometry.',
        },
        {
          kind: 'figure',
          caption:
            'Addition as jumps on the number line. Top: $4 + 3$ — start at 4, hop 3 right, land on 7. Bottom: $3 + 4$ — start at 3, hop 4 right, land on the same 7. The landing point (tinted) is the sum; the starting point and hop length may swap roles freely, which is the commutative property drawn as geometry.',
          svg: `<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 4+3 and 3+4 landing on the same point 7">
  <g font-size="13" fill="currentColor">
    <text x="30" y="52" opacity="0.75" text-anchor="start">4 + 3: start at 4, hop 3</text>
    <line x1="50" y1="88" x2="710" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<line x1="${60 + n * 70}" y1="82" x2="${60 + n * 70}" y2="94" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${60 + n * 70}" y="114" text-anchor="middle" opacity="0.85">${n}</text>`).join('\n      ')}
    </g>
    <circle cx="340" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="550" cy="88" r="7" fill="#b45309"/>
    <path d="M 348 66 Q 445 18 542 66" fill="none" stroke="#b45309" stroke-width="2.5"/>
    <text x="445" y="34" text-anchor="middle" font-weight="700" fill="#b45309">+3</text>
    <text x="30" y="164" opacity="0.75" text-anchor="start">3 + 4: start at 3, hop 4</text>
    <line x1="50" y1="200" x2="710" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<line x1="${60 + n * 70}" y1="194" x2="${60 + n * 70}" y2="206" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${60 + n * 70}" y="226" text-anchor="middle" opacity="0.85">${n}</text>`).join('\n      ')}
    </g>
    <circle cx="270" cy="200" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="550" cy="200" r="7" fill="#b45309"/>
    <path d="M 278 178 Q 410 130 542 178" fill="none" stroke="#b45309" stroke-width="2.5"/>
    <text x="410" y="146" text-anchor="middle" font-weight="700" fill="#b45309">+4</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Three properties that make addition safe' },
        {
          kind: 'para',
          text: 'Before any technique, we fix the rules that techniques are allowed to use. Whole numbers under addition obey four clean laws. **Closure**: the sum of two whole numbers is always a whole number — the operation never falls off the edge of the set. **Commutativity**: $a + b = b + a$, as the figure just showed. **Associativity**: $(a + b) + c = a + (b + c)$ — when adding three or more numbers, the bracketing is our choice, so we may group whichever pair is convenient first. **Identity**: $a + 0 = a$ — zero adds nothing, which sounds trivial until the day it becomes the reason an algorithm can stop cleanly. Each law is obvious for small numbers and indispensable for large ones.',
        },
        {
          kind: 'table',
          caption: 'The four laws of addition, with a verified instance of each',
          head: ['Law', 'Statement', 'Instance', 'What it buys you'],
          rows: [
            ['Closure', '$a + b$ is a whole number', '$1{,}257 + 893 = 2{,}150$', 'Sums stay in the system — no new kinds of number needed'],
            ['Commutative', '$a + b = b + a$', '$247 + 389 = 389 + 247 = 636$', 'Choose the friendlier order: $389$ first is easier to hold'],
            ['Associative', '$(a+b)+c = a+(b+c)$', '$(37+25)+15 = 37+(25+15) = 77$', 'Group to make round numbers: $(37+25)+15 = 62+15$, but $37+(25+15) = 37+40$ — much nicer'],
            ['Identity', '$a + 0 = a$', '$999{,}999 + 0 = 999{,}999$', 'Zero is the "do nothing" step — algorithms lean on it'],
          ],
        },
        {
          kind: 'para',
          text: 'Here is why this section sits before the algorithm. Consider $4{,}589 + 2{,}764$, written in expanded form from Lesson 1.1: $(4{,}000 + 500 + 80 + 9) + (2{,}000 + 700 + 60 + 4)$. The commutative and associative laws together license a reshuffle that no teacher could otherwise justify: gather the thousands, then the hundreds, then the tens, then the ones — $(4{,}000 + 2{,}000) + (500 + 700) + (80 + 60) + (9 + 4)$. Each bracket is a small, single-seat addition: $6{,}000 + 1{,}200 + 140 + 13$. The last bracket overflows — thirteen ones is one ten and three ones — and that overflow, handed to the next seat, is the entire story of carrying. Column addition is not a new fact about numbers; it is these two laws plus place value, arranged in a tidy layout.',
        },
        { kind: 'heading', text: 'Column addition and the art of carrying' },
        {
          kind: 'para',
          text: 'The layout comes straight from place value: write both numbers with their **ones digits aligned in one column** (Lesson 1.1\'s seats lining up seat-for-seat), add the rightmost column first, and march leftward. Right-alignment matters because the ones seat is the anchor: $342 + 158$ must never become $34{,}21{,}58$-style chaos — digits that drift out of their seats change their values. The name "carry" is ancient: on the counting boards that preceded written arithmetic, when a wire held ten counters you physically *carried* one counter over to the next wire. The modern pencil version keeps the gesture and drops the board.',
        },
        {
          kind: 'algorithm',
          title: 'Column addition of two whole numbers',
          lines: [
            { code: 'Write the addends with the ones digits aligned in one column.', note: 'Place-value alignment: every digit must sit in its own seat.' },
            { code: 'Add the digits of the ones (rightmost) column.' },
            { code: 'Write the ones digit of that total below the line.' },
            { code: 'Carry the remaining part (0 or 1) to the top of the next column left.', note: 'Ten of this seat equals one of the next seat — the overflow argument from Lesson 1.1.' },
            { code: 'For each remaining column: add its two digits PLUS the incoming carry, then repeat the write-and-carry step.' },
            { code: 'IF the leftmost column produces a carry, write it as a new leftmost digit of the sum.', note: 'This is the only way a sum grows a digit: 999 + 1 = 1000.' },
          ],
          note:
            'The procedure marches right-to-left and always terminates: finitely many seats, one pass each. Why the carry is a single 1 — never 2, never more — is proved below, and it is the reason the algorithm needs only a small margin above each column.',
        },
        {
          kind: 'example',
          title: '4,589 + 2,764, column by column',
          steps: [
            'Ones column: $9 + 4 = 13$. Write the 3; carry $1$ into the tens column. (Thirteen ones = one ten and three ones.)',
            'Tens column: $8 + 6 + 1 = 15$. Write the 5; carry $1$ into the hundreds column.',
            'Hundreds column: $5 + 7 + 1 = 13$. Write the 3; carry $1$ into the thousands column.',
            'Thousands column: $4 + 2 + 1 = 7$. Write the 7; no carry remains. Sum: $7{,}353$. Three carries, every one of them a 1 — as the proof below guarantees.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The same sum as a seat map. Each carry (tinted cell above the columns) is born in the column to its right when that column\'s total reaches ten or more, and is born as exactly 1. The ones column produced 13 (write 3, carry 1), and the final carry never came — the thousands column totalled 7 with nothing left over. Had the addends been larger, that final carry would have created a brand-new ten-thousands seat.',
          svg: `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column addition of 4589 and 2764 with carry cells above the tens, hundreds and thousands columns">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="30" y="46" opacity="0.75" text-anchor="start">carries →</text>
    <rect x="290" y="24" width="60" height="34" rx="17" fill="#b45309" opacity="0.16" stroke="#b45309" stroke-width="1.5"/>
    <rect x="430" y="24" width="60" height="34" rx="17" fill="#b45309" opacity="0.16" stroke="#b45309" stroke-width="1.5"/>
    <rect x="570" y="24" width="60" height="34" rx="17" fill="#b45309" opacity="0.16" stroke="#b45309" stroke-width="1.5"/>
    <text x="320" y="46" font-weight="700" fill="#b45309">1</text>
    <text x="460" y="46" font-weight="700" fill="#b45309">1</text>
    <text x="600" y="46" font-weight="700" fill="#b45309">1</text>
    <line x1="655" y1="41" x2="700" y2="41" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6"/>
    <text x="660" y="30" font-size="11" opacity="0.75">each carry = 1</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">4,589</text>
    <text x="80" y="182" opacity="0.75" text-anchor="start">2,764</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
      <rect x="150" y="94" width="130" height="46" rx="6"/><rect x="290" y="94" width="130" height="46" rx="6"/><rect x="430" y="94" width="130" height="46" rx="6"/><rect x="570" y="94" width="130" height="46" rx="6"/>
      <rect x="150" y="156" width="130" height="46" rx="6"/><rect x="290" y="156" width="130" height="46" rx="6"/><rect x="430" y="156" width="130" height="46" rx="6"/><rect x="570" y="156" width="130" height="46" rx="6"/>
    </g>
    <g font-size="22" font-weight="700">
      <text x="215" y="124">4</text><text x="355" y="124">5</text><text x="495" y="124">8</text><text x="635" y="124">9</text>
      <text x="215" y="186">2</text><text x="355" y="186">7</text><text x="495" y="186">6</text><text x="635" y="186">4</text>
    </g>
    <line x1="130" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" fill="#b45309">
      <text x="215" y="252">7</text><text x="355" y="252">3</text><text x="495" y="252">5</text><text x="635" y="252">3</text>
    </g>
    <g stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.8">
      <path d="M 640 94 Q 630 70 615 60"/>
      <path d="M 500 94 Q 490 70 475 60"/>
      <path d="M 360 94 Q 350 70 335 60"/>
    </g>
    <text x="150" y="282" font-size="12" opacity="0.8" text-anchor="start">column totals 13, 15, 13, 7 → write 3, 5, 3, 7 and carry 1, 1, 1</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Why the carry can never exceed 1' },
        {
          kind: 'para',
          text: 'Beginners sometimes ask what happens if a column totals twenty-something — surely that should carry a 2? It cannot happen, and the proof is one breath long, but it is worth doing properly because the same induction pattern returns in every algorithm of this chapter.',
        },
        {
          kind: 'derivation',
          title: 'The carry bound',
          statement:
            'When adding two whole numbers column by column, every carry is either 0 or 1 — never 2 or more.',
          steps: [
            {
              label: 'Bound the column total from above',
              formula: '\\text{total} \\le 9 + 9 + 1 = 19',
              explanation:
                'Each column contains at most two digits (one per addend), and a digit is never more than 9. The incoming carry — whatever it turns out to be — is at most 1 by the very claim being proved, so we tentatively use 1; the base case makes this honest.',
            },
            {
              label: 'Base case: the ones column',
              formula: '\\text{total}_{\\text{ones}} \\le 9 + 9 = 18',
              explanation:
                'The ones column receives no incoming carry (nothing lies to its right), so its total is at most 18. Writing the ones digit and carrying the rest gives a carry of $\\lfloor 18/10 \\rfloor = 1$ at most — the claim holds for the first column.',
            },
            {
              label: 'Inductive step',
              formula: '\\lfloor 19/10 \\rfloor = 1',
              explanation:
                'If every carry so far has been 0 or 1, then any later column totals at most $9 + 9 + 1 = 19$, and nineteen written as "one ten and nine ones" hands a carry of exactly 1 to the next seat — never 2. So the next column also sees a carry of at most 1, and the argument repeats.',
            },
          ],
          result:
            'Every carry in the column addition of two numbers is 0 or 1. The worst possible column total is $9 + 9 + 1 = 19$: write 9, carry 1. This is why the pencil-and-paper layout never needs more than a one-digit margin above a column, and why the algorithm needs no memory beyond a single carry.',
        },
        {
          kind: 'equation',
          latex: '\\underbrace{a,\\; b \\;\\le\\; 10^{k} - 1}_{k\\text{-digit addends}} \\;\\Rightarrow\\; a + b \\;\\le\\; 2\\cdot 10^{k} - 2 \\;<\\; 10^{k+1}',
          note: 'A k-digit number never reaches $10^k$, so even two maximal k-digit addends sum to less than $2 \\cdot 10^k$, which is far below $10^{k+1}$. The sum of two k-digit numbers therefore has at most $k + 1$ digits — and when that $(k+1)$-st digit exists, it is exactly the final carry, a single 1.',
        },
        {
          kind: 'formula',
          name: 'Sum bound for two k-digit numbers',
          latex: 'a + b \\;<\\; 10^{k+1}',
          note: 'Two k-digit numbers sum to at most k + 1 digits; the extra digit, when present, is a leading 1 (the final carry). Example: 999 + 999 = 1,998.',
        },
        {
          kind: 'example',
          title: 'When the sum outgrows every seat: 999 + 1',
          steps: [
            'Ones column: $9 + 1 = 10$. Write the 0; carry $1$. The written digit is zero — a real digit doing a real job (a placeholder, as Lesson 1.1 would insist), not "nothing".',
            'Tens column: $9 + 0 + 1 = 10$. Write the 0; carry $1$. The carry ripples leftward through a full house of nines.',
            'Hundreds column: $9 + 0 + 1 = 10$. Write the 0; carry $1$.',
            'Thousands column: $0 + 0 + 1 = 1$. Write the 1. Sum: $1{,}000$ — a four-digit sum from two three-digit addends, created by exactly one final carry. A sum only ever grows a new leftmost seat by this door; it never grows one any other way.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four classic carrying traps',
          text: 'One: **forgetting the carry** — the most common arithmetic error in the world; the carry exists precisely because the column total did not fit, so dropping it discards a whole ten (or hundred). Two: **adding the carry twice** — once when writing the column total and again in the next column; the carry is handed leftward exactly once. Three: **misalignment** — adding $342$ to $158$ with the digits raggedly placed adds tens to hundreds; always right-align first, ones above ones. Four: **carrying before finishing the column** — the carry is decided by the *complete* column total (digits plus incoming carry), never by the first digit seen; compute the total, then split it. A fifth slip deserves a mention: writing $13$ wholesale under the ones column instead of writing 3 and carrying 1 — that is the split-step skipped, and the next column will miss its ten.',
        },
        { kind: 'heading', text: 'The mod-9 fingerprint becomes a checksum' },
        {
          kind: 'para',
          text: 'Lesson 1.2 established that any number differs from its digit sum by a multiple of 9 — every seat\'s $10^k$ is one more than nine of something, so the seats contribute only ones to the residue. In symbols: a number and its digit sum leave the **same remainder on division by 9** (its mod-9 fingerprint). Now add two numbers $a + b$. The sum leaves the same remainder as (digit sum of $a$) + (digit sum of $b$), because remainders add just as the numbers do. So the fingerprints of the addends must combine — by ordinary addition — into the fingerprint of the answer. That gives a cheap, ancient error-guard: compute each fingerprint, combine, compare with the answer\'s fingerprint. Mismatch means the addition is certainly wrong.',
        },
        {
          kind: 'example',
          title: 'Checking 4,589 + 2,764 = 7,353 by fingerprint',
          steps: [
            'Fingerprint of $4{,}589$: digit sum $4+5+8+9 = 26$, then $2+6 = 8$.',
            'Fingerprint of $2{,}764$: digit sum $2+7+6+4 = 19$, then $1+0 = 1$.',
            'Combine: $8 + 1 = 9$. (A fingerprint of 9 plays the role of 0 — both are "multiples of nine".)',
            'Fingerprint of the answer $7{,}353$: $7+3+5+3 = 18$, then $1+8 = 9$. Match — the arithmetic *survives the check*. It is not a proof of correctness, but a mismatch would have been a proof of error.',
          ],
        },
        {
          kind: 'formula',
          name: 'Digit-sum (mod 9) checksum',
          latex: 'S(a+b) \\;\\equiv\\; S(a) + S(b) \\pmod{9}',
          note: 'S(n) = digit sum of n, reduced to a single digit (9 standing for 0). If the fingerprints disagree, the addition is definitely wrong; if they agree, the addition is probably right — see the limits below.',
        },
        {
          kind: 'para',
          text: 'Honesty about the guard\'s limits: the checksum has blind spots of exactly $\\pm 9$, $\\pm 18$, … — and digit transpositions, because rearranging digits preserves the digit sum. Write $7{,}335$ instead of $7{,}353$ (the 5 and 3 swapped) and the fingerprint is still 9; write $7{,}362$ (an accidental $+9$) and it is still 9. Both wrong answers sail through. Accountants who lived by casting out nines knew this — the medieval name for the technique — and used it anyway, because an error that escapes a nine-check must be unusually lucky. A checksum is a guard at the gate, not a jailer inside the cell.',
        },
        { kind: 'heading', text: 'Adding many numbers: compensation and pairing' },
        {
          kind: 'para',
          text: 'Real sums often have more than two addends, and examination arithmetic rewards two habits. **Compensation**: when one addend sits just below a round number, lend it the missing bit and take the loan from the other addend — $8{,}999 + 437$: lend 1 to make $9{,}000$, leaving $436$; so the sum is $9{,}000 + 436 = 9{,}436$. Nothing was memorised; the identity and associativity laws merely did the bookkeeping ($8{,}999 + 437 = (9{,}000 - 1) + (436 + 1) = 9{,}000 + 436$). **Pairing**: when adding a long list, add numbers that make round totals first — the associative law lets us bracket freely.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The schoolboy who summed 1 to 100 in seconds',
          text: 'The legend goes that a schoolmaster, needing quiet, set his class to add all whole numbers from 1 through 100 — and a nine-year-old Carl Friedrich Gauss wrote the answer, 5,050, almost immediately. His insight was pairing: $1 + 100 = 101$, $2 + 99 = 101$, $3 + 98 = 101$… one hundred numbers form fifty pairs, each summing to 101, so the total is $50 \\times 101 = 5{,}050$. No column work at all — just the associative law applied with nerve. The same pairing argument, written algebraically, becomes the formula for the sum of the first $n$ whole numbers, $\\frac{n(n+1)}{2}$, which this library will meet again formally in Elementary Algebra.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Bank and SSC papers open their quantitative sections with rapid-addition items where compensation is the intended speed tool ($8{,}999 + 437$-style); the digit-sum checksum appears both as a shortcut-check answer option and as an error-detection question in clerical exams; CUET and NTSE aptitude papers ask "how many carries does this addition produce?" — which is exactly the column-walk discipline of this lesson; and competitive exams love the pairing trick in exam-style guises ($1 + 2 + \\cdots + n$, or sums of consecutive odd numbers). The habit that scores: align first, walk the columns aloud in your head ("thirteen: write three carry one"), and run the nine-check whenever the options allow it.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'When adding two whole numbers column by column, the carry from any column can be at most:',
              options: ['1', '2', '9', 'Whatever the column total is'],
              answer: 0,
              explain:
                'The column total is at most $9 + 9 + 1 = 19$ — two digits plus the largest legal incoming carry — and $\\lfloor 19/10 \\rfloor = 1$. Option 2 tempts people who imagine a column of $9+9$ "carrying its 18 outright"; but 18 splits as one ten and eight ones, still a carry of 1. The proof is the induction in this lesson.',
            },
            {
              q: 'The sum $999 + 1$ has how many digits, and why?',
              options: [
                '3 — addition never changes digit count',
                '4 — the final carry creates a new leftmost seat',
                '6 — three digits plus three digits',
                'Cannot be known without adding',
              ],
              answer: 1,
              explain:
                'Every column ripples a carry leftward: $999 + 1 = 1{,}000$. The new thousands digit is precisely the final carry — the only door through which a sum of two k-digit numbers gains a $(k+1)$-st digit. Option 3 confuses adding quantities with concatenating numerals: $999 + 1$ is not $9991$.',
            },
            {
              q: 'To add $7 + 59 + 3$ quickly as $59 + (7 + 3) = 59 + 10 = 69$, which laws did you use?',
              options: [
                'Associative only',
                'Commutative only',
                'Both commutative and associative',
                'None — this is a different operation',
              ],
              answer: 2,
              explain:
                'Reordering $7+59+3$ into $59+7+3$ uses commutativity; regrouping the brackets to $(7+3)$ uses associativity. Both laws together are what license any regrouping of a sum — the same two laws that justify the entire column method.',
            },
            {
              q: 'Why does column addition start from the ones column rather than the thousands?',
              options: [
                'Because the ones digits are smallest',
                'Because carries flow leftward — early columns can change later ones, never the reverse',
                'Because it is merely a convention with no reason',
                'Because thousands columns are harder to add',
              ],
              answer: 1,
              explain:
                'A carry born in the ones column changes the tens total, a carry in the tens changes the hundreds, and so on — influence travels only leftward. Starting at the left would force constant re-writing whenever a carry emerges; starting at the right, every decision is final. It is the place-value hierarchy, walked in the direction its dependencies flow.',
            },
            {
              q: 'A student computes $4{,}589 + 2{,}764$, writes $7{,}335$, and the digit-sum checksum shows a match. What follows?',
              options: [
                'The answer is certainly correct',
                'The checksum is broken',
                'The answer passed one guard, but transposed digits preserve digit sums — the checksum cannot certify correctness',
                'The student must have carried twice',
              ],
              answer: 2,
              explain:
                '$7{,}335$ is $7{,}353$ with the last two digits swapped; the digit sum stays 18, fingerprint 9, so the check passes. The checksum\'s guarantee is one-directional: mismatch ⇒ certainly wrong; match ⇒ probably right. This exact blind spot (transpositions, and slips of $\\pm 9$) is why the method survived centuries anyway — escaping it takes a rare kind of error.',
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
                  q: 'Compute $342 + 158$ by column addition, and state every carry.',
                  solution:
                    'Ones: $2 + 8 = 10$ — write 0, carry 1. Tens: $4 + 5 + 1 = 10$ — write 0, carry 1. Hundreds: $3 + 1 + 1 = 5$ — write 5, no carry. Sum: $500$, with two carries, each a 1. Notice both written digits in the middle are zeros — genuine placeholder digits, and a favourite quick-check target: whenever a column total hits exactly 10, the written digit is 0 and the carry is 1.',
                },
                {
                  q: 'Compute $607 + 296$ by column addition, and state every carry.',
                  solution:
                    'Ones: $7 + 6 = 13$ — write 3, carry 1. Tens: $0 + 9 + 1 = 10$ — write 0, carry 1. Hundreds: $6 + 2 + 1 = 9$ — write 9. Sum: $903$, two carries. The zero inside 607 earned its keep as a placeholder: the tens column had a real digit (0) to receive the incoming carry, and $0 + 9 + 1$ is a complete column total, not an empty seat.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $4{,}589 + 2{,}764$ and list the column totals, written digits and carries in order.',
                  solution:
                    'Column totals: $9+4 = 13$, then $8+6+1 = 15$, then $5+7+1 = 13$, then $4+2+1 = 7$. Written digits: 3, 5, 3, 7. Carries: 1, 1, 1 — three of them, out of the ones, tens and hundreds columns. Sum: $7{,}353$. Reading the totals as a list is the habit that makes carries auditable: if a later check disagrees, you can compare column by column instead of redoing everything.',
                },
                {
                  q: 'Compute $7{,}052 + 3{,}148$, then verify the answer with the digit-sum checksum, showing every fingerprint.',
                  solution:
                    'Column addition: ones $2+8 = 10$ (write 0, carry 1); tens $5+4+1 = 10$ (write 0, carry 1); hundreds $0+1+1 = 2$ (write 2); thousands $7+3 = 10$ (write 0, carry 1); final carry 1. Sum: $10{,}200$. Checksum: fingerprint of $7{,}052$ is $7+0+5+2 = 14 \\to 5$; of $3{,}148$ is $3+1+4+8 = 16 \\to 7$; combined $5+7 = 12 \\to 3$. Fingerprint of $10{,}200$: $1+0+2+0+0 = 3$. Match — the sum survives the check. (And this sum demonstrates the final-carry door: four-digit addends produced a five-digit sum through exactly one leading 1.)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Add $2{,}847$ to its reverse $7{,}482$, and explain why the digit-sum checksum must pass for any number-plus-its-reverse.',
                  solution:
                    'Ones: $7+2 = 9$ (write 9, no carry). Tens: $4+8 = 12$ (write 2, carry 1). Hundreds: $8+4+1 = 13$ (write 3, carry 1). Thousands: $2+7+1 = 10$ (write 0, carry 1). Final carry 1. Sum: $10{,}329$. Why the check must pass: a number and its reverse have the *same* digits, hence the same digit sum — call it $d$. The two addends\' fingerprints are each $d$, so the combined fingerprint is $d + d = 2d$; and the answer\'s fingerprint must match by the mod-9 law of addition itself. Here $d = 21 \\to 3$, and $3 + 3 = 6$, matching $1+0+3+2+9 = 15 \\to 6$. No computation was needed to know the check would pass — that is the difference between checking and understanding.',
                },
                {
                  q: '(Exam-style, foundation level) How many carry events occur in $999{,}999 + 999{,}999$, and what is the sum?',
                  solution:
                    'Every one of the six columns overflows: units $9+9 = 18$ (carry 1), then each remaining column $9+9+1 = 19$ (carry 1) — six carry events, one per column, and the sixth becomes the new leading digit. Sum: $1{,}999{,}998$. This is the maximal-carry configuration for six-digit addends: the column bound $9+9+1 = 19$ is attained five times and the base bound $9+9 = 18$ once. A useful exam reflex: a wall of nines is the fastest place to count carries, because the outcome never depends on which digits sit opposite.',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'What is the greatest number of carry events possible when adding two 4-digit numbers? Exhibit the addends that achieve it, and prove no two 4-digit addends can do better.',
                  solution:
                    'Greatest: 4 — one carry out of *every* column. Achieved by $9{,}999 + 9{,}999 = 19{,}998$: units $9+9 = 18$ (carry), then tens, hundreds and thousands each $9+9+1 = 19$ (carry). The last carry becomes the leading 1. Why nothing beats 4: a four-column walk produces at most one carry per column by the carry-bound proof, and there are only four columns — so 4 is a hard ceiling, attained here. Note the subtlety in the count: some textbooks count the final leading 1 as a fifth "carry into a new column"; under that convention the answer would be 5. State your convention explicitly in an exam — the mathematics is identical, only the bookkeeping differs.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The digit-sum checksum passed for $4{,}589 + 2{,}764 = 7{,}353$. (a) Exhibit two different *incorrect* answers that also pass the check, one via digit rearrangement and one via a slip of exactly 9. (b) Prove that the checksum must fail for any error of $\\pm 1, \\pm 2, \\ldots, \\pm 8$, and explain in one paragraph why this makes the guard worthwhile despite its blind spots.',
                  solution:
                    '(a) Rearrangement: $7{,}335$ — the final 5 and 3 swapped; digit sums are identical ($18$), so the fingerprint stays 9. Slip of nine: $7{,}362 = 7{,}353 + 9$; digit sum $7+3+6+2 = 18$ again, fingerprint 9. Both wrong, both pass. (b) Suppose the true sum $T$ is replaced by $T + e$ with $1 \\le |e| \\le 8$. A number and that number plus a small nonzero $e$ cannot leave the same remainder on division by 9, because two numbers with the same remainder differ by a multiple of 9 — and no number of magnitude 1 through 8 is a multiple of 9. So the fingerprint of $T + e$ differs from the fingerprint of $T$ (by $e$ mod 9), while the addends\' fingerprints are unchanged: the mismatch is detected. Why worthwhile: exam-day additions go wrong overwhelmingly through dropped carries, transcribed digits and one-off slips — error classes that either change the remainder by a small non-multiple of 9 (caught instantly) or require genuinely unlucky structure (a transposition *and* a compensating slip together) to escape. The guard costs ten seconds and catches nearly everything that actually happens; perfection was never its claim.',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'Addition, then, is counting-on grown up: the commutative and associative laws supply the license, place value supplies the seats, and the carry — always a humble 1 — is the overflow argument from Lesson 1.1 doing honest work. The next lesson runs the same machinery backwards. Subtraction asks "what must be added to $b$ to reach $a$?", and where addition overflowed seats, subtraction will sometimes find a seat that cannot pay — and must go borrowing from its richer neighbour to the left.',
        },
      ],
    },
    {
      id: 'fm-subtraction-borrowing',
      number: '2.2',
      title: 'Subtraction and Borrowing',
      concepts: [
        'Subtraction as the inverse of addition',
        'Minuend, subtrahend and difference',
        'Subtraction breaks closure, commutativity and associativity',
        'Column subtraction and the borrow',
        'Why one borrow is always enough',
        'Borrowing across zeros',
        'The inverse check and the nines complement',
      ],
      objectives: [
        'Explain subtraction as the missing-addend question — the inverse of addition — and read it as take-away or comparison',
        'Show exactly which laws of addition die for subtraction, with a counterexample for each',
        'Execute column subtraction with borrowing reliably, including the borrow-across-zeros ripple',
        'Prove why a column ever needs to borrow exactly one — never two — and check any subtraction two independent ways',
      ],
      prerequisites: ['fm-addition-carrying'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Turn Lesson 2.1\'s machinery around and a question appears that addition never asked. The herder knows the flock stood at seven animals this morning — and that three of them were lent to a neighbour for the day. How many are *mine* right now? The question is not "how many altogether" but "how many remain": start from 7 and *undo* an addition of 3. Subtraction is the operation of removing a quantity — and, looked at more closely, of running addition backwards: $a - b$ is **the number that must be added to $b$ to reach $a$**. That one sentence, the *inverse definition*, is the spine of this whole lesson: the column algorithm, the error checks and the shopkeeper\'s technique at the end are all that sentence wearing different clothes.',
        },
        {
          kind: 'para',
          text: 'The same subtraction answers three differently-flavoured questions, and fluent calculators drift between them without noticing. **Take-away**: 7 pencils, give 3 away — how many remain? **Missing addend**: what must be added to 3 to reach 7? **Comparison**: how far apart are 7 and 3 on the number line? All three are answered by the same number, $4$ — the **difference** — but the faces have different jobs. The take-away face drives the column algorithm below; the missing-addend face drives the checks and the counting-up technique; the comparison face will drive distance, gaps and measurement later in the library.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Minuend',
              def: 'The number being subtracted from — the top number $a$ in $a - b$. From Latin minuere, "to lessen".',
            },
            {
              term: 'Subtrahend',
              def: 'The number being taken away — the bottom number $b$ in $a - b$. It is the one "subtracted".',
            },
            {
              term: 'Difference',
              def: 'The result of a subtraction $a - b$; also the name for the gap between $a$ and $b$ on the number line.',
            },
            {
              term: 'Borrowing (decomposition)',
              def: 'Exchanging one unit from the next seat left for ten of the current seat, so that a column which cannot pay becomes one that can. Also called regrouping.',
            },
            {
              term: 'Counting-up method',
              def: 'Finding $a - b$ by adding up from the subtrahend until the minuend is reached — subtraction performed as addition; the way shopkeepers make change.',
            },
            {
              term: 'Nines complement',
              def: 'Of an $n$-digit number $b$: the number $10^{n} - 1 - b$, written digit-by-digit as $9 - d$. It converts subtraction into addition plus a tiny correction.',
            },
          ],
        },
        { kind: 'heading', text: 'Subtraction on the number line — and the edge of the world' },
        {
          kind: 'para',
          text: 'Lesson 2.1 drew addition as rightward hops; subtraction draws as leftward ones. To compute $7 - 3$, stand at $7$ and hop three steps **left**, landing at $4$. Nothing new so far. But now ask the question addition could never ask: what does $3 - 7$ look like? Stand at $3$ and hop left — after three steps you stand on $0$, the very first whole number, with four hops still owed. The walk continues off the end of the line: whole numbers simply *stop* there, and $3 - 7$ is **not a whole number at all**. For the first time, an operation on two members of the club has produced a non-member. That crack in the system is exactly where negative numbers will one day enter — Chapter 7 extends the line leftward — but until it does, every subtraction in this book obeys one standing law: **the minuend must be at least the subtrahend**.',
        },
        {
          kind: 'figure',
          caption:
            'Subtraction as leftward hops on the number line. Top: $7 - 3$ — start at 7, hop 3 left, land on 4 (tinted). Bottom: $3 - 7$ — start at 3, hop 7 left, and the walk crosses 0 (dashed stretch) before running out of whole numbers: the landing point would be −4, which is not a whole number at all. Where addition could never leave the line, subtraction leans against its left edge — the crack through which negative numbers (Chapter 7) eventually enter.',
          svg: `<svg viewBox="0 0 760 258" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 7 minus 3 landing on 4, and 3 minus 7 falling off the left edge of the whole numbers">
  <g font-size="13" fill="currentColor">
    <text x="30" y="52" opacity="0.75" text-anchor="start">7 - 3: start at 7, hop 3 left</text>
    <line x1="50" y1="88" x2="710" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<line x1="${60 + n * 70}" y1="82" x2="${60 + n * 70}" y2="94" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${60 + n * 70}" y="114" text-anchor="middle" opacity="0.85">${n}</text>`).join('\n      ')}
    </g>
    <circle cx="550" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="340" cy="88" r="7" fill="#b45309"/>
    <path d="M 542 66 Q 445 18 348 66" fill="none" stroke="#b45309" stroke-width="2.5"/>
    <text x="445" y="34" text-anchor="middle" font-weight="700" fill="#b45309">-3</text>
    <text x="730" y="164" opacity="0.75" text-anchor="end">3 - 7: start at 3, hop 7 left</text>
    <line x1="260" y1="200" x2="710" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <line x1="60" y1="200" x2="260" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.45" stroke-dasharray="4 4"/>
    <g text-anchor="middle">
      ${[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<line x1="${60 + (n + 4) * 50}" y1="194" x2="${60 + (n + 4) * 50}" y2="206" stroke="currentColor" stroke-width="1.5" opacity="${n < 0 ? 0.4 : 0.55}"/><text x="${60 + (n + 4) * 50}" y="226" text-anchor="middle" opacity="${n < 0 ? 0.55 : 0.85}">${n}</text>`).join('\n      ')}
    </g>
    <circle cx="410" cy="200" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="60" cy="200" r="7" fill="none" stroke="#b45309" stroke-width="2.5" stroke-dasharray="3 3"/>
    <path d="M 402 178 Q 230 132 68 178" fill="none" stroke="#b45309" stroke-width="2.5"/>
    <text x="230" y="148" text-anchor="middle" font-weight="700" fill="#b45309">-7</text>
    <text x="380" y="250" text-anchor="middle" font-size="11.5" opacity="0.7">whole numbers end at 0 — the landing point -4 lies beyond the edge (Chapter 7: Integers)</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'The laws that die — and the one that half-survives' },
        {
          kind: 'para',
          text: 'Lesson 2.1 built addition on four laws. Subtraction walks into the same courtroom and loses three of the four — and the table of failures is worth reading slowly, because every rule of subtraction\'s *layout* is a compensation for one of these deaths.',
        },
        {
          kind: 'table',
          caption: 'The four laws of addition, retried under subtraction — with the counterexample that decides each verdict',
          head: ['Law', 'Addition said', 'Verdict for subtraction', 'The counterexample'],
          rows: [
            ['Closure', '$a + b$ is always a whole number', 'DEAD', '$5 - 3 = 2$ works, but $3 - 7$ is not a whole number — the result can fall off the set'],
            ['Commutative', '$a + b = b + a$', 'DEAD', '$7 - 3 = 4$ while $3 - 7$ is not a whole number; order is now a real decision'],
            ['Associative', '$(a+b)+c = a+(b+c)$', 'DEAD', '$(8 - 5) - 2 = 1$ but $8 - (5 - 2) = 5$ — regrouping changes the answer'],
            ['Identity', '$a + 0 = a$', 'HALF', '$a - 0 = a$ always (right identity), but $0 - a$ is not a whole number for $a > 0$ — zero works on one side only'],
          ],
        },
        {
          kind: 'para',
          text: 'Three deaths and a half — and each one has consequences on the page. Because commutativity died, the **minuend goes on top and stays there**: swapping the rows changes the problem into a different (possibly impossible) one. Because associativity died, the columns are marched **in a fixed order** — the grouping is not ours to choose. And because closure died, we agree in advance never to subtract a larger whole number from a smaller — the algorithm assumes it and the number line explains it. Notice the asymmetry of the identity row, too: $a - 0 = a$ is why the right edge of every subtrahend can be shorter than the minuend\'s (missing digits are zeros, Lesson 1.1) without any ceremony.',
        },
        { kind: 'heading', text: 'Column subtraction and the art of borrowing' },
        {
          kind: 'para',
          text: 'The layout is addition\'s layout — right-aligned digits, ones anchoring the right edge — but the walk now needs a rule for **seats that cannot pay**. Take $4{,}589 - 2{,}764$, the exact pair Lesson 2.1 added. Ones column: $9 - 4 = 5$, paid outright. Tens: $8 - 6 = 2$, paid outright. Hundreds: the minuend offers a 5, the subtrahend demands a 7 — **$5 < 7$: the seat cannot pay**. The seat does not panic; it sends one request leftward. The thousands seat holds 4 and lends one of its counters — worth *ten* hundreds at the Lesson 1.1 exchange rate. The lender drops from 4 to 3; the hundreds seat rises from 5 to 15; and $15 - 7 = 8$ settles the column. The thousands then pays its own bill reduced: $3 - 2 = 1$. Difference: $1{,}825$. One borrow — where *adding* this same pair needed three carries.',
        },
        {
          kind: 'algorithm',
          title: 'Column subtraction of two whole numbers (decomposition method)',
          lines: [
            { code: 'Write the minuend on top, the subtrahend below, ones digits aligned in one column.', note: 'The minuend must be at least the subtrahend — otherwise the answer is not a whole number.' },
            { code: 'Start at the ones column: if the top digit is at least the bottom digit, subtract and write the difference below the line.' },
            { code: 'If the top digit is smaller, BORROW: take 1 from the next seat left (that digit drops by 1) and add 10 to this column\'s top digit. Then subtract.', note: 'One of the next seat is ten of this seat — the Lesson 1.1 exchange, run in reverse.' },
            { code: 'If the next seat left holds 0 it cannot lend: it first borrows from ITS left neighbour, becomes 10, lends 1 and keeps 9 — the zero ripple.' },
            { code: 'March left, column by column, repeating the pay-or-borrow decision.' },
            { code: 'Drop leading zeros of the answer: 2,000 - 1,999 = 0001 is written 1.', note: 'Borrowing can empty a leading seat but never creates one — subtraction never grows the digit count.' },
          ],
          note:
            'Right-to-left, exactly like addition: the direction the dependencies flow. The algorithm\'s entire memory is one fact per column — whether a borrow happened. The name "borrowing" is a bookkeeping fiction (nothing is returned), which is why modern textbooks often say regrouping or decomposition instead: a ten is decomposed into ten ones.',
        },
        {
          kind: 'example',
          title: '4,589 − 2,764, column by column',
          steps: [
            'Ones column: $9 - 4 = 5$. The seat pays outright. Write 5.',
            'Tens column: $8 - 6 = 2$. Pays outright. Write 2.',
            'Hundreds column: $5 < 7$ — cannot pay. Borrow 1 from the thousands seat: the 4 becomes 3, the 5 becomes 15. Now $15 - 7 = 8$. Write 8.',
            'Thousands column: the lender, reduced to 3, pays $3 - 2 = 1$. Write 1. Difference: $1{,}825$. One borrow — undoing the three carries that Lesson 2.1 needed for the same pair of numbers.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The borrow as a seat exchange. The hundreds seat cannot pay ($5 < 7$), so the thousands seat lends one of its counters — worth ten hundreds — and drops from 4 to 3 (struck digits show the pencil bookkeeping; small digits the corrections: 4 → 3, 5 → 15). The receiving seat then computes $15 - 7 = 8$. The ones and tens columns pay outright ($9 - 4$ and $8 - 6$): only one borrow undoes the three carries of adding this same pair.',
          svg: `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column subtraction of 4589 minus 2764 with one borrow: the thousands seat lends one to the hundreds seat">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="30" y="37" opacity="0.75" text-anchor="start">the borrow</text>
    <rect x="205" y="20" width="170" height="24" rx="12" fill="#b45309" opacity="0.16" stroke="#b45309" stroke-width="1.5"/>
    <text x="290" y="37" font-weight="700" font-size="12" fill="#b45309">1 thousand = 10 hundreds</text>
    <path d="M 225 92 Q 290 60 345 92" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="80" y="120" opacity="0.75" text-anchor="start">4,589</text>
    <text x="80" y="182" opacity="0.75" text-anchor="start">2,764</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
      <rect x="150" y="94" width="130" height="46" rx="6"/><rect x="290" y="94" width="130" height="46" rx="6"/><rect x="430" y="94" width="130" height="46" rx="6"/><rect x="570" y="94" width="130" height="46" rx="6"/>
      <rect x="150" y="156" width="130" height="46" rx="6"/><rect x="290" y="156" width="130" height="46" rx="6"/><rect x="430" y="156" width="130" height="46" rx="6"/><rect x="570" y="156" width="130" height="46" rx="6"/>
    </g>
    <g font-size="22" font-weight="700">
      <text x="215" y="124">4</text><text x="355" y="124">5</text><text x="495" y="124">8</text><text x="635" y="124">9</text>
      <text x="215" y="186">2</text><text x="355" y="186">7</text><text x="495" y="186">6</text><text x="635" y="186">4</text>
    </g>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.8">
      <line x1="203" y1="121" x2="227" y2="107"/>
      <line x1="343" y1="121" x2="367" y2="107"/>
    </g>
    <g font-size="13" font-weight="700" fill="#b45309">
      <text x="252" y="112">3</text>
      <text x="388" y="112">15</text>
    </g>
    <line x1="130" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" fill="#b45309">
      <text x="215" y="252">1</text><text x="355" y="252">8</text><text x="495" y="252">2</text><text x="635" y="252">5</text>
    </g>
    <text x="80" y="282" font-size="12" opacity="0.8" text-anchor="start">hundreds: 5 &lt; 7 → borrow → 15 - 7 = 8 · lender 4 → 3, pays 3 - 2 · ones and tens pay outright: 9 - 4, 8 - 6</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Why one borrow is always enough — and never two' },
        {
          kind: 'para',
          text: 'A column borrows when its top digit is smaller than its bottom digit. The deficit looks alarming until you measure it: the top digit is at least 0, the bottom digit is at most 9, so the worst deficit any column can ever face is 9 (top 0 against bottom 9). A single borrow delivers 10 — and 10 beats 9. That is the entire proof, but it deserves the same careful writing as Lesson 2.1\'s carry bound, because the two results are mirrors and each explains the other\'s architecture.',
        },
        {
          kind: 'derivation',
          title: 'The borrow bound',
          statement:
            'Whenever a column must borrow, borrowing exactly 1 always settles it; no column ever needs to borrow 2 or more.',
          steps: [
            {
              label: 'What one borrow delivers',
              formula: 'd_{\\text{top}} \\;\\mapsto\\; d_{\\text{top}} + 10',
              explanation:
                'The lender hands over one unit of the next seat, which is worth ten of this seat at the fixed exchange rate. The receiving top digit becomes $d_{\\text{top}} + 10$, somewhere between 10 and 19.',
            },
            {
              label: 'Why one delivery suffices',
              formula: 'd_{\\text{top}} + 10 \\;\\ge\\; 10 \\;>\\; 9 \\;\\ge\\; d_{\\text{bot}}',
              explanation:
                'Ten of this seat already exceeds the largest bottom digit there is. After one borrow the column computes $d_{\\text{top}} + 10 - d_{\\text{bot}}$, which lies between 1 (worst case $0 + 10 - 9$) and 19 (best top against zero bottom) — always writable, always settled. The comparison flips from deficit to surplus with a single exchange.',
            },
            {
              label: 'Why two would be absurd',
              formula: 'd_{\\text{top}} + 20 - 9 \\;\\ge\\; 11',
              explanation:
                'A second borrow would push the top to at least $20$ against a bottom of at most 9 — a surplus of 11 or more that no single seat can record. Worse, the lender would be charged 2, and a digit of 1 would be driven below zero: the bookkeeping itself would leave the whole numbers. The system never asks for this: the borrow is a unit of account, and one unit is always enough.',
            },
          ],
          result:
            'Each column borrows at most once, and the amount is always exactly 1. The algorithm\'s memory is a single mark per column — the precise mirror of addition, whose carry was also always a single 1. Two symmetric bounds, two algorithms that never need more than a one-digit margin.',
        },
        {
          kind: 'equation',
          latex: '1 \\cdot 10^{k+1} \\;=\\; 10 \\cdot 10^{k}',
          note: 'The exchange rate both operations ride on: one counter of seat $k+1$ equals ten counters of seat $k$. Carrying converts an overflow of ten into one counter moving left; borrowing converts one leftward counter into the ten this seat needs. The same identity — opposite directions of travel.',
        },
        { kind: 'heading', text: 'Borrowing across zeros: the 1,000 − 1 dissolve' },
        {
          kind: 'para',
          text: 'One case remains: what if the neighbour is broke? Try $1{,}000 - 1$. The ones seat holds 0 and owes 1, so it asks the tens seat — which is also 0, and asks the hundreds seat — also 0, which asks the thousands seat, which holds a 1 and can finally lend. Now watch the cash flow back down the chain. The thousands seat gives up its only counter ($1 \\to 0$). The hundreds seat receives 10, lends 1 to the tens and keeps 9. The tens seat receives 10, lends 1 to the ones and keeps 9. The ones seat receives 10 and pays $10 - 1 = 9$. The answer: $999$ — the lone thousands counter has **dissolved into three nines**. Set Lesson 2.1\'s $999 + 1 = 1{,}000$ beside it and the symmetry is exact: there, three nines condensed into one new seat; here, one seat evaporates back into three nines. Addition mints seats; subtraction burns them.',
        },
        {
          kind: 'example',
          title: '1,000 − 1, seat by seat',
          steps: [
            'Ones: 0 cannot pay 1. The tens and hundreds seats are also 0 — nobody nearby can lend — so the request travels to the thousands seat.',
            'Thousands lends: $1 \\to 0$. The hundreds seat becomes 10, lends 1 downward, keeps 9. The tens seat becomes 10, lends 1, keeps 9. The ones seat becomes 10.',
            'Ones pays: $10 - 1 = 9$. Tens: $9 - 0 = 9$. Hundreds: $9 - 0 = 9$. Thousands: empty — its digit drops away.',
            'Difference: $999$, certified instantly by the inverse: $999 + 1 = 1{,}000$. Three digits of the answer were manufactured entirely by the borrow chain — which is why a wall of zeros in a minuend is a warning sign, not a rest sign.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four classic borrowing traps',
          text: 'One: **the "smaller from larger" reflex** — computing $7 - 5 = 2$ whenever a 5 sits under a 7, regardless of which is on top. In our worked example it manufactures $2{,}225$, and the inverse check detonates it: $2{,}225 + 2{,}764 = 4{,}989 \\ne 4{,}589$. Two: **forgetting to reduce the lender** — taking the borrowed 10 ($15 - 7 = 8$) but still computing $4 - 2$ in the thousands: the answer $2{,}825$ fails the same way ($+2{,}764$ gives $5{,}589$). Three: **skipping the zero ripple** — a neighbour holding 0 cannot lend until it has borrowed for itself; writing "$10 - $ something" without walking the chain is how $1{,}000 - 1$ turns into 900 or 990. Four: **dropping the wrong zeros** — leading zeros of the *answer* go ($2{,}000 - 1{,}999 = 0001 = 1$), but zeros *inside* numbers are load-bearing placeholders (Lesson 1.1). The cure for all four is the same: run the inverse check — it catches every one of them.',
        },
        { kind: 'heading', text: 'Checking subtraction: run addition backwards' },
        {
          kind: 'para',
          text: 'Lesson 2.1 guarded its sums with a mod-9 fingerprint — a cheap gate with known blind spots. Subtraction gets something better, because subtraction is *defined by* addition: $a - b = d$ means exactly "$d$ must be added to $b$ to reach $a$". So the **inverse check** — add the difference back to the subtrahend and confirm you land on the minuend — is not a heuristic at all; it is the definition wearing work clothes. It catches every error of every size with no blind spots whatsoever: if $d + b \\ne a$, the subtraction is wrong, full stop. For $4{,}589 - 2{,}764$: compute $1{,}825 + 2{,}764 = 4{,}589$ — the answer is *certified*, not merely fingerprinted.',
        },
        {
          kind: 'formula',
          name: 'The inverse check (total certification)',
          latex: 'a - b = d \\;\\iff\\; d + b = a',
          note: 'Recover the minuend by adding the difference to the subtrahend. Unlike the mod-9 checksum this check has no blind spots: any wrong difference fails it. Cost: one addition — the very operation Lesson 2.1 made cheap.',
        },
        {
          kind: 'para',
          text: 'The mod-9 fingerprint survives too, and now it *subtracts*: the fingerprint of a difference must equal the fingerprints of minuend and subtrahend, subtracted. For $4{,}589 - 2{,}764$: fingerprints 8 and 1, so the difference must fingerprint to $8 - 1 = 7$; and indeed $1{,}825$ has digit sum $1+8+2+5 = 16 \\to 7$. The familiar blind spots carry over unchanged — transposed digits and slips of $\\pm 9$ still sail through — so the division of labour stands: the nine-check is the ten-second gate, the inverse check is the seal.',
        },
        {
          kind: 'formula',
          name: 'Digit-sum (mod 9) check for subtraction',
          latex: 'S(a-b) \\;\\equiv\\; S(a) - S(b) \\pmod{9}',
          note: 'S(n) = digit sum reduced to a single digit. A mismatch proves an error; a match proves nothing (±9 slips and transpositions still pass). The weak gate — but nearly free.',
        },
        { kind: 'heading', text: 'Close numbers and the shopkeeper\'s route' },
        {
          kind: 'para',
          text: 'Examination subtraction loves numbers that sit just below something round — Lesson 1.3\'s close-number territory. **Compensation, sign flipped**: for $4{,}312 - 2{,}998$, notice $2{,}998 = 3{,}000 - 2$. Subtracting 2,998 is subtracting 3,000 and then *giving back* 2: $4{,}312 - 3{,}000 = 1{,}312$, and $1{,}312 + 2 = 1{,}314$. No borrow ever occurs — the round number made every column pay outright. Check by the inverse: $1{,}314 + 2{,}998 = 4{,}312$. This is Lesson 2.1\'s compensation running in reverse, and it is the intended speed tool wherever an exam plants a subtrahend ending in a string of nines.',
        },
        {
          kind: 'para',
          text: 'The second technique is older than examination halls. A shopkeeper making change from ₹100 against a bill of ₹63 rarely computes $100 - 63$; she counts *up*: hand over 2 (to ₹65), then 5 (to ₹70), then 30 (to ₹100) — change, 37. Subtraction performed as addition, because counting coins upward is harder to get wrong than borrowing across zeros. The same route handles our worked example: start at the subtrahend and climb to the minuend — $+36$ reaches $2{,}800$; $+200$ reaches $3{,}000$; $+1{,}500$ reaches $4{,}500$; $+89$ reaches $4{,}589$. The change totals $36 + 200 + 1{,}500 + 89 = 1{,}825$ — the same difference the column algorithm found, reached without a single borrow. The missing-addend definition, promoted from philosophy to working method.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Two bookkeepings for one borrow',
          text: 'Decomposition — reduce the lender — is the modern school standard, but for centuries the favoured bookkeeping in Europe and America was **equal additions**: instead of reducing the next-left top digit, *raise the next-left bottom digit by 1*. Try $42 - 17$ both ways. Decomposition: the ones borrow ($12 - 7 = 5$) and the tens top drops ($4 \\to 3$), so $3 - 1 = 2$ — answer 25. Equal additions: the same ones work ($12 - 7 = 5$), but the tens *bottom* rises ($1 \\to 2$), so $4 - 2 = 2$ — also 25. Both are correct because they change both sides by the same value: ten of this seat added to the minuend\'s column, one of the next seat charged to the subtrahend\'s — equal amounts, so the difference is untouched. Equal additions dominated printed arithmetic well into the twentieth century; decomposition won the schools because it matches the place-value story this book tells. Three centuries of teachers argued the merits; the difference never noticed.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Bank and SSC papers plant close-number subtractions exactly of the $4{,}312 - 2{,}998$ shape — compensation is the intended speed tool, and the planted trap answer is $1{,}312$ (subtracting the round 3,000 and forgetting the +2). Clerical and CUET-style papers ask error-detection: "which digit is wrong in this subtraction?" — the inverse check locates the column, the digit-sum check flags the row. Zero-ripple items ($10{,}000 - 4{,}567$) are speed-graded: the complement habit — subtract each digit from 9, then add 1 to the result ($5{,}432 + 1 = 5{,}433$) — answers them in one stroke, and Exercise L6 proves why that trick is lawful. Borrow-count questions ("how many borrows does this subtraction need?") are the mirror of Lesson 2.1\'s carry-count items: walk the columns, count the exchanges.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'How many borrow events does the subtraction 8,341 − 5,779 need?',
              options: ['1', '2', '3', '4'],
              answer: 2,
              explain:
                'Walk the columns: ones $1 < 9$ — borrow ($11 - 9 = 2$). The tens top becomes $4 \\to 3$, and $3 < 7$ — borrow ($13 - 7 = 6$). The hundreds top becomes $3 \\to 2$, and $2 < 7$ — borrow ($12 - 7 = 5$). The thousands pays after lending: $7 - 5 = 2$. Three borrows, answer $2{,}562$ — check it: $2{,}562 + 5{,}779 = 8{,}341$. Option 4 is the addition-style count: a 4-digit minus 4-digit subtraction can never borrow four times, because the leftmost seat has nobody to its left to borrow from.',
            },
            {
              q: 'After a column borrows once, its top digit is d + 10. Why does the subtraction now always go through?',
              options: [
                'Because you may borrow a second time if needed',
                'Because d + 10 is at least 10, and the bottom digit is at most 9 — ten of a seat beats any single digit',
                'Because the borrow also reduces the bottom digit',
                'Because the bottom digit is always small',
              ],
              answer: 1,
              explain:
                'The worst top after one borrow is $0 + 10 = 10$; the worst bottom is 9; and $10 > 9$. Even the unluckiest column settles with one exchange ($10 - 9 = 1$). Option 1 describes a situation that can never arise — the borrow bound proves no column ever needs a second loan. Option 3 confuses decomposition with the equal-additions bookkeeping, which raises the *next* column\'s bottom digit, not this one\'s.',
            },
            {
              q: 'In 1,000 − 1 = 999, the two middle zeros of the minuend become:',
              options: [
                '0s — untouched bystanders',
                '1s — each recorded the borrow',
                '9s — each received 10, lent 1, and kept 9',
                '10s — each kept its full loan',
              ],
              answer: 2,
              explain:
                'The chain: the thousands seat lends ($1 \\to 0$); the hundreds receives 10, lends 1 down, keeps 9; the tens receives 10, lends 1, keeps 9; the ones receives 10 and pays $10 - 1 = 9$. Every middle seat ends as a 9 — the standard signature of a borrow that travelled across zeros, and the fastest visual diagnostic of the ripple at work.',
            },
            {
              q: 'Which check is guaranteed to catch ANY arithmetic error in a subtraction?',
              options: [
                'The digit-sum (mod 9) checksum',
                'Adding the difference to the subtrahend and confirming the minuend',
                'Both are equally reliable',
                'Neither — subtraction has no complete check',
              ],
              answer: 1,
              explain:
                'The inverse check is total: $a - b = d$ *means* $d + b = a$, so a wrong $d$ cannot possibly reconstruct the minuend. The digit-sum check inherits its blind spots (transpositions, $\\pm 9$ slips). This is the one structural luxury subtraction enjoys over addition: its definition is already a check.',
            },
            {
              q: 'Compute (8 − 5) − 2 and 8 − (5 − 2). What does the pair tell you?',
              options: [
                'Both equal 1 — subtraction is associative',
                'Both equal 5 — brackets are free',
                '1 and 5 respectively — subtraction is not associative: grouping changes the answer',
                'The second is not a whole number',
              ],
              answer: 2,
              explain:
                '$(8-5)-2 = 3-2 = 1$, while $8-(5-2) = 8-3 = 5$. Unlike addition, where brackets were a free choice, subtraction fixes its order and grouping — which is exactly why the column algorithm pins the minuend on top and marches strictly right-to-left.',
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
                  q: 'Compute $758 - 432$ by column subtraction and state how many borrows occurred.',
                  solution:
                    'Ones: $8 - 2 = 6$. Tens: $5 - 3 = 2$. Hundreds: $7 - 4 = 3$. Every column pays outright — **zero borrows**. Difference: $326$; inverse check: $326 + 432 = 758$. A no-borrow subtraction is the baseline case: know where the borrows are (here, nowhere) before you trust the layout.',
                },
                {
                  q: 'Compute $607 - 296$ by column subtraction, and say what the zero in the minuend contributed.',
                  solution:
                    'Ones: $7 - 6 = 1$. Tens: $0 < 9$ — borrow from the hundreds: the 6 becomes 5, the 0 becomes 10, and $10 - 9 = 1$. Hundreds: $5 - 2 = 3$. Difference: $311$, one borrow; inverse check: $311 + 296 = 607$. The zero in 607 was a load-bearing placeholder: it sat in the tens seat, received the incoming 10, and paid the 9 — a genuine digit doing genuine work, not an absence (Lesson 1.1).',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $4{,}589 - 2{,}764$, listing each column\'s decision (pay or borrow), then certify the answer by the inverse check and the digit-sum check.',
                  solution:
                    'Ones: $9 - 4 = 5$ (pay). Tens: $8 - 6 = 2$ (pay). Hundreds: $5 < 7$ — borrow: thousands $4 \\to 3$, hundreds $5 \\to 15$, and $15 - 7 = 8$. Thousands: $3 - 2 = 1$ (the lender pays reduced). Difference: $1{,}825$ — exactly one borrow, undoing Lesson 2.1\'s three carries for the same pair. Inverse: $1{,}825 + 2{,}764 = 4{,}589$ — certified. Digit sums: $4{,}589 \\to 26 \\to 8$ and $2{,}764 \\to 19 \\to 1$, so the difference must fingerprint to $8 - 1 = 7$; actual: $1{,}825 \\to 16 \\to 7$ — the weak gate passes too.',
                },
                {
                  q: 'Compute $5{,}200 - 1{,}847$ (the ones and tens digits of the minuend are both 0 — expect the ripple).',
                  solution:
                    'Ones: $0 < 7$ — borrow, but the tens seat is 0 and cannot lend. The hundreds seat (2) lends to the tens: hundreds $2 \\to 1$, tens becomes 10; the tens lends to the ones: tens $10 \\to 9$, ones becomes 10. Ones: $10 - 7 = 3$. Tens: $9 - 4 = 5$. Hundreds: $1 < 8$ — borrow from the thousands: thousands $5 \\to 4$, hundreds $1 \\to 11$; $11 - 8 = 3$. Thousands: $4 - 1 = 3$. Difference: $3{,}353$; inverse check: $3{,}353 + 1{,}847 = 5{,}200$. A mini-ripple and a regular borrow in one sum — read the walk aloud and the bookkeeping stays honest.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Compute $10{,}000 - 4{,}567$ — with the column walk or without it — and verify.',
                  solution:
                    'Column view: the ones, tens, hundreds and thousands seats of the minuend are all 0, so the ten-thousands seat (1) lends down the chain: it becomes 0; thousands receives 10, lends 1, keeps 9; hundreds receives 10, lends 1, keeps 9; tens receives 10, lends 1, keeps 9; ones receives 10. Ones: $10 - 7 = 3$; tens: $9 - 6 = 3$; hundreds: $9 - 5 = 4$; thousands: $9 - 4 = 5$. Difference: $5{,}433$; inverse: $5{,}433 + 4{,}567 = 10{,}000$. Speed view (the complement habit): subtract each digit of 4,567 from 9 — $5{,}432$ — then add 1: $5{,}433$. Both routes land together; Exercise L6 proves why the shortcut is lawful.',
                },
                {
                  q: '(Exam-style, foundation level) How many borrow events does $2{,}000 - 1{,}999$ need, and what is the difference? Justify the count.',
                  solution:
                    'Difference: $1$ — inverse check: $1 + 1{,}999 = 2{,}000$. Borrow count: three. The ones seat (0) owes 9 and cannot pay; the tens and hundreds seats are 0 and cannot lend; the thousands seat (2) lends to the hundreds — borrow one; the hundreds (now 10) lends to the tens — borrow two; the tens (now 10) lends to the ones — borrow three. Then ones $10 - 9 = 1$, tens $9 - 9 = 0$, hundreds $9 - 9 = 0$, thousands $1 - 1 = 0$: the answer $0001 = 1$. The lesson: a trivial-looking difference can conceal the maximum bookkeeping — never judge a subtraction by the size of its answer.',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'What is the greatest number of borrow events possible when subtracting two 4-digit numbers? Exhibit an attaining pair, prove no pair can exceed it, and explain why the answer differs from Lesson 2.1\'s carry maximum for two 4-digit addends.',
                  solution:
                    'Greatest: **3**. Attained by $1{,}111 - 999 = 112$: ones $1 < 9$ (borrow); tens, after its lender drops, is $0 < 9$ (borrow); hundreds, after its lender drops, is $0 < 9$ (borrow); thousands $0 - 0$ — three events, and $112 + 999 = 1{,}111$ certifies. Also attained by $2{,}000 - 1{,}999 = 1$, verified in L4b. Why 3 is the ceiling: a borrow out of a column requires a lender to its left, and among four seats only the ones, tens and hundreds have one — the thousands seat has nobody to its left, so at most three columns can ever borrow, and the borrow bound caps each at a single event. Why the mirror differs: Lesson 2.1\'s carry maximum for two 4-digit addends was **4** — every column could carry *and* the final carry could mint a brand-new fifth seat ($9{,}999 + 9{,}999 = 19{,}998$). Borrowing moves value from higher seats to lower; it can burn a leading seat ($1{,}000 - 1$ drops to three digits) but can never create one. Addition grows digit counts; subtraction only shrinks or preserves them — so carries max out at $k$ for k-digit numbers, borrows at $k - 1$.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The nines complement. For an n-digit subtrahend $b$, define $b^{*} = 10^{n} - 1 - b$ (each digit $d$ of $b$ becomes $9 - d$ in $b^{*}$). (a) Prove $a - b = a + b^{*} + 1 - 10^{n}$. (b) Use it to compute $4{,}589 - 2{,}764$ by addition only, and explain the "end-around carry". (c) Run $2{,}764 - 4{,}589$ the same way and interpret what the absence of the leading carry means.',
                  solution:
                    '(a) Expand the right-hand side: $a + (10^{n} - 1 - b) + 1 - 10^{n} = a - b$ — the $10^{n}$ and the $-1$ cancel identically; only the distributive law is used. (b) For $b = 2{,}764$ with $n = 4$: digitwise $9-2,\\; 9-7,\\; 9-6,\\; 9-4$ gives $b^{*} = 7{,}235$. Add: $4{,}589 + 7{,}235 = 11{,}824$. The leading 1 is the $10^{4}$ we owe: drop it ($11{,}824 - 10{,}000 = 1{,}824$) and add back the compensating $+1$ — the **end-around carry** — to land on $1{,}825$. The same difference as the column algorithm, found with zero borrows: this is how machines that dislike borrowing (and examiners who like speed) do it. The L4a shortcut is this identity seen from the side: $10{,}000 - 4{,}567 = (9{,}999 - 4{,}567) + 1 = 5{,}432 + 1 = 5{,}433$. (c) Now $2{,}764 - 4{,}589$: complement the new subtrahend, $9{,}999 - 4{,}589 = 5{,}410$, and add: $2{,}764 + 5{,}410 = 8{,}174$ — **no leading carry appears**. The method is signalling a negative difference: the answer is $-(9{,}999 - 8{,}174) = -1{,}825$, exactly the off-the-edge quantity the number line showed at the top of this lesson. Early computers exploited precisely this — complement arithmetic lets one adder serve both operations, with negatives stored as complements — the idea that returns when this library reaches integers in Chapter 7.',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'Subtraction, then, is addition read backwards. Its inverse definition supplies a check that addition never had; its dead laws explain the strictness of the layout; and its borrow is the carry running in reverse — always a single 1, occasionally rippling through a wall of zeros. The next lesson introduces the operation that makes both of these look slow: multiplication — addition performed many times at once, and then, quietly, a law unto itself.',
        },
      ],
    },
  ],
}
