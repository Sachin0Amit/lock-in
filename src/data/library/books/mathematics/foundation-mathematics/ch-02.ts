import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 2: The Four Operations
 *
 * LESSONS WRITTEN: 2.1 Addition and the Art of Carrying
 * CHAPTER IN PROGRESS (unit 2 of the unit-by-unit cadence, started 2026-11-03).
 * Lessons 2.2–2.5 are planned (see plannedLessons below) and are authored one
 * per unit cycle. References for this unit: Khattar, Quantitative Aptitude for
 * Competitive Examinations (4e) ch. 4 "Simplification" + NCERT Class 6 ch. 2
 * "Whole Numbers" topic coverage — see docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-2.ts
 * (51 checks) BEFORE writing.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'the-four-operations',
  title: 'The Four Operations',
  summary:
    'Addition, subtraction, multiplication and division — first as actions on quantities, then as algorithms on numerals, where the overflow argument from Chapter 1 returns as carrying and borrowing. Includes order of operations, estimation checks, and why division by zero is undefined.',
  status: 'in-progress',
  plannedLessons: [
    'Subtraction and Borrowing',
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
    <text x="30" y="52" opacity="0.75" text-anchor="start">$4+3$: start at 4, hop 3</text>
    <line x1="50" y1="88" x2="710" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<line x1="${60 + n * 70}" y1="82" x2="${60 + n * 70}" y2="94" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${60 + n * 70}" y="114" text-anchor="middle" opacity="0.85">${n}</text>`).join('\n      ')}
    </g>
    <circle cx="340" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="550" cy="88" r="7" fill="#b45309"/>
    <path d="M 348 66 Q 445 18 542 66" fill="none" stroke="#b45309" stroke-width="2.5"/>
    <text x="445" y="34" text-anchor="middle" font-weight="700" fill="#b45309">+3</text>
    <text x="30" y="164" opacity="0.75" text-anchor="start">$3+4$: start at 3, hop 4</text>
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
  ],
}
