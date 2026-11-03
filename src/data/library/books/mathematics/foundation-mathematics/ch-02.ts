import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 2: The Four Operations
 *
 * LESSONS WRITTEN (CHAPTER COMPLETE): 2.1 Addition and the Art of Carrying ·
 * 2.2 Subtraction and Borrowing · 2.3 Multiplication as Repeated Addition —
 * and Beyond · 2.4 Division, Remainders and Why Zero Never Divides · 2.5
 * Order of Operations and the Language of Expressions.
 * Unit 2 of the unit-by-unit cadence (2026-11-03, one lesson per hourly
 * run). References: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 4 "Simplification" (BODMAS) + NCERT Class 6 ch. 2
 * "Whole Numbers" topic coverage — see docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-2.ts
 * (165 checks in the post-recycle script; 324 unit-cumulative) BEFORE
 * writing.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'the-four-operations',
  title: 'The Four Operations',
  summary:
    'Addition, subtraction, multiplication and division — first as actions on quantities, then as algorithms on numerals, where the overflow argument from Chapter 1 returns as carrying and borrowing. Includes order of operations, estimation checks, and why division by zero is undefined.',
  status: 'complete',
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
    <line x1="632" y1="41" x2="700" y2="41" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6"/>
    <text x="655" y="30" font-size="11" opacity="0.75" text-anchor="start">each carry = 1</text>
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
                  solution: [
                    'Ones: $2 + 8 = 10$ — write 0, carry 1.',
                    'Tens: $4 + 5 + 1 = 10$ — write 0, carry 1.',
                    'Hundreds: $3 + 1 + 1 = 5$ — write 5, no carry.',
                    'Sum: $500$, with two carries, each a 1.',
                    'Notice both written digits in the middle are zeros — genuine placeholder digits, and a favourite quick-check target: whenever a column total hits exactly 10, the written digit is 0 and the carry is 1.',
                  ],
                },
                {
                  q: 'Compute $607 + 296$ by column addition, and state every carry.',
                  solution: [
                    'Ones: $7 + 6 = 13$ — write 3, carry 1.',
                    'Tens: $0 + 9 + 1 = 10$ — write 0, carry 1.',
                    'Hundreds: $6 + 2 + 1 = 9$ — write 9.',
                    'Sum: $903$, two carries.',
                    'The zero inside 607 earned its keep as a placeholder: the tens column had a real digit (0) to receive the incoming carry, and $0 + 9 + 1$ is a complete column total, not an empty seat.',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $4{,}589 + 2{,}764$ and list the column totals, written digits and carries in order.',
                  solution: [
                    'Column totals: $9+4 = 13$,',
                    'then $8+6+1 = 15$,',
                    'then $5+7+1 = 13$,',
                    'then $4+2+1 = 7$.',
                    'Written digits: 3, 5, 3, 7.',
                    'Carries: 1, 1, 1 — three of them, out of the ones, tens and hundreds columns.',
                    'Sum: $7{,}353$.',
                    'Reading the totals as a list is the habit that makes carries auditable: if a later check disagrees, you can compare column by column instead of redoing everything.',
                  ],
                },
                {
                  q: 'Compute $7{,}052 + 3{,}148$, then verify the answer with the digit-sum checksum, showing every fingerprint.',
                  solution: [
                    'Column addition: ones $2+8 = 10$ (write 0, carry 1)',
                    'tens $5+4+1 = 10$ (write 0, carry 1)',
                    'hundreds $0+1+1 = 2$ (write 2)',
                    'thousands $7+3 = 10$ (write 0, carry 1); final carry 1.',
                    'Sum: $10{,}200$.',
                    'Checksum: fingerprint of $7{,}052$ is $7+0+5+2 = 14 \\to 5$',
                    'of $3{,}148$ is $3+1+4+8 = 16 \\to 7$',
                    'combined $5+7 = 12 \\to 3$.',
                    'Fingerprint of $10{,}200$: $1+0+2+0+0 = 3$.',
                    'Match — the sum survives the check.',
                    '(And this sum demonstrates the final-carry door: four-digit addends produced a five-digit sum through exactly one leading 1.)',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Add $2{,}847$ to its reverse $7{,}482$, and explain why the digit-sum checksum must pass for any number-plus-its-reverse.',
                  solution: [
                    'Ones: $7+2 = 9$ (write 9, no carry).',
                    'Tens: $4+8 = 12$ (write 2, carry 1).',
                    'Hundreds: $8+4+1 = 13$ (write 3, carry 1).',
                    'Thousands: $2+7+1 = 10$ (write 0, carry 1).',
                    'Final carry 1.',
                    'Sum: $10{,}329$.',
                    'Why the check must pass: a number and its reverse have the *same* digits, hence the same digit sum — call it $d$.',
                    'The two addends\' fingerprints are each $d$, so the combined fingerprint is $d + d = 2d$',
                    'and the answer\'s fingerprint must match by the mod-9 law of addition itself.',
                    'Here $d = 21 \\to 3$, and $3 + 3 = 6$, matching $1+0+3+2+9 = 15 \\to 6$.',
                    'No computation was needed to know the check would pass — that is the difference between checking and understanding.',
                  ],
                },
                {
                  q: '(Exam-style, foundation level) How many carry events occur in $999{,}999 + 999{,}999$, and what is the sum?',
                  solution: [
                    'Every one of the six columns overflows: units $9+9 = 18$ (carry 1),',
                    'then each remaining column $9+9+1 = 19$ (carry 1) — six carry events, one per column, and the sixth becomes the new leading digit.',
                    'Sum: $1{,}999{,}998$.',
                    'This is the maximal-carry configuration for six-digit addends: the column bound $9+9+1 = 19$ is attained five times and the base bound $9+9 = 18$ once.',
                    'A useful exam reflex: a wall of nines is the fastest place to count carries, because the outcome never depends on which digits sit opposite.',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'What is the greatest number of carry events possible when adding two 4-digit numbers? Exhibit the addends that achieve it, and prove no two 4-digit addends can do better.',
                  solution: [
                    'Greatest: 4 — one carry out of *every* column.',
                    'Achieved by $9{,}999 + 9{,}999 = 19{,}998$: units $9+9 = 18$ (carry),',
                    'then tens, hundreds and thousands each $9+9+1 = 19$ (carry).',
                    'The last carry becomes the leading 1.',
                    'Why nothing beats 4: a four-column walk produces at most one carry per column by the carry-bound proof, and there are only four columns — so 4 is a hard ceiling, attained here.',
                    'Note the subtlety in the count: some textbooks count the final leading 1 as a fifth "carry into a new column"; under that convention the answer would be 5.',
                    'State your convention explicitly in an exam — the mathematics is identical, only the bookkeeping differs.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The digit-sum checksum passed for $4{,}589 + 2{,}764 = 7{,}353$. (a) Exhibit two different *incorrect* answers that also pass the check, one via digit rearrangement and one via a slip of exactly 9. (b) Prove that the checksum must fail for any error of $\\pm 1, \\pm 2, \\ldots, \\pm 8$, and explain in one paragraph why this makes the guard worthwhile despite its blind spots.',
                  solution: [
                    '(a) Rearrangement: $7{,}335$ — the final 5 and 3 swapped',
                    'digit sums are identical ($18$), so the fingerprint stays 9.',
                    'Slip of nine: $7{,}362 = 7{,}353 + 9$',
                    'digit sum $7+3+6+2 = 18$ again, fingerprint 9.',
                    'Both wrong, both pass.',
                    '(b) Suppose the true sum $T$ is replaced by $T + e$ with $1 \\le |e| \\le 8$.',
                    'A number and that number plus a small nonzero $e$ cannot leave the same remainder on division by 9, because two numbers with the same remainder differ by a multiple of 9 — and no number of magnitude 1 through 8 is a multiple of 9.',
                    'So the fingerprint of $T + e$ differs from the fingerprint of $T$ (by $e$ mod 9), while the addends\' fingerprints are unchanged: the mismatch is detected.',
                    'Why worthwhile: exam-day additions go wrong overwhelmingly through dropped carries, transcribed digits and one-off slips — error classes that either change the remainder by a small non-multiple of 9 (caught instantly) or require genuinely unlucky structure (a transposition *and* a compensating slip together) to escape.',
                    'The guard costs ten seconds and catches nearly everything that actually happens; perfection was never its claim.',
                  ],
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
                  solution: [
                    'Ones: $8 - 2 = 6$.',
                    'Tens: $5 - 3 = 2$.',
                    'Hundreds: $7 - 4 = 3$.',
                    'Every column pays outright — **zero borrows**.',
                    'Difference: $326$',
                    'inverse check: $326 + 432 = 758$.',
                    'A no-borrow subtraction is the baseline case: know where the borrows are (here, nowhere) before you trust the layout.',
                  ],
                },
                {
                  q: 'Compute $607 - 296$ by column subtraction, and say what the zero in the minuend contributed.',
                  solution: [
                    'Ones: $7 - 6 = 1$.',
                    'Tens: $0 < 9$ — borrow from the hundreds: the 6 becomes 5, the 0 becomes 10, and $10 - 9 = 1$.',
                    'Hundreds: $5 - 2 = 3$.',
                    'Difference: $311$, one borrow',
                    'inverse check: $311 + 296 = 607$.',
                    'The zero in 607 was a load-bearing placeholder: it sat in the tens seat, received the incoming 10, and paid the 9 — a genuine digit doing genuine work, not an absence (Lesson 1.1).',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $4{,}589 - 2{,}764$, listing each column\'s decision (pay or borrow), then certify the answer by the inverse check and the digit-sum check.',
                  solution: [
                    'Ones: $9 - 4 = 5$ (pay).',
                    'Tens: $8 - 6 = 2$ (pay).',
                    'Hundreds: $5 < 7$ — borrow: thousands $4 \\to 3$, hundreds $5 \\to 15$, and $15 - 7 = 8$.',
                    'Thousands: $3 - 2 = 1$ (the lender pays reduced).',
                    'Difference: $1{,}825$ — exactly one borrow, undoing Lesson 2.1\'s three carries for the same pair.',
                    'Inverse: $1{,}825 + 2{,}764 = 4{,}589$ — certified.',
                    'Digit sums: $4{,}589 \\to 26 \\to 8$ and $2{,}764 \\to 19 \\to 1$, so the difference must fingerprint to $8 - 1 = 7$',
                    'actual: $1{,}825 \\to 16 \\to 7$ — the weak gate passes too.',
                  ],
                },
                {
                  q: 'Compute $5{,}200 - 1{,}847$ (the ones and tens digits of the minuend are both 0 — expect the ripple).',
                  solution: [
                    'Ones: $0 < 7$ — borrow, but the tens seat is 0 and cannot lend.',
                    'The hundreds seat (2) lends to the tens: hundreds $2 \\to 1$, tens becomes 10',
                    'the tens lends to the ones: tens $10 \\to 9$, ones becomes 10.',
                    'Ones: $10 - 7 = 3$.',
                    'Tens: $9 - 4 = 5$.',
                    'Hundreds: $1 < 8$ — borrow from the thousands: thousands $5 \\to 4$, hundreds $1 \\to 11$',
                    '$11 - 8 = 3$.',
                    'Thousands: $4 - 1 = 3$.',
                    'Difference: $3{,}353$',
                    'inverse check: $3{,}353 + 1{,}847 = 5{,}200$.',
                    'A mini-ripple and a regular borrow in one sum — read the walk aloud and the bookkeeping stays honest.',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Compute $10{,}000 - 4{,}567$ — with the column walk or without it — and verify.',
                  solution: [
                    'Column view: the ones, tens, hundreds and thousands seats of the minuend are all 0, so the ten-thousands seat (1) lends down the chain: it becomes 0',
                    'thousands receives 10, lends 1, keeps 9',
                    'hundreds receives 10, lends 1, keeps 9; tens receives 10, lends 1, keeps 9; ones receives 10.',
                    'Ones: $10 - 7 = 3$',
                    'tens: $9 - 6 = 3$',
                    'hundreds: $9 - 5 = 4$',
                    'thousands: $9 - 4 = 5$.',
                    'Difference: $5{,}433$',
                    'inverse: $5{,}433 + 4{,}567 = 10{,}000$.',
                    'Speed view (the complement habit): subtract each digit of 4,567 from 9 — $5{,}432$ — then add 1: $5{,}433$.',
                    'Both routes land together; Exercise L6 proves why the shortcut is lawful.',
                  ],
                },
                {
                  q: '(Exam-style, foundation level) How many borrow events does $2{,}000 - 1{,}999$ need, and what is the difference? Justify the count.',
                  solution: [
                    'Difference: $1$ — inverse check: $1 + 1{,}999 = 2{,}000$.',
                    'Borrow count: three.',
                    'The ones seat (0) owes 9 and cannot pay',
                    'the tens and hundreds seats are 0 and cannot lend',
                    'the thousands seat (2) lends to the hundreds — borrow one',
                    'the hundreds (now 10) lends to the tens — borrow two; the tens (now 10) lends to the ones — borrow three.',
                    'Then ones $10 - 9 = 1$, tens $9 - 9 = 0$, hundreds $9 - 9 = 0$, thousands $1 - 1 = 0$: the answer $0001 = 1$.',
                    'The lesson: a trivial-looking difference can conceal the maximum bookkeeping — never judge a subtraction by the size of its answer.',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'What is the greatest number of borrow events possible when subtracting two 4-digit numbers? Exhibit an attaining pair, prove no pair can exceed it, and explain why the answer differs from Lesson 2.1\'s carry maximum for two 4-digit addends.',
                  solution: [
                    'Greatest: **3**.',
                    'Attained by $1{,}111 - 999 = 112$: ones $1 < 9$ (borrow)',
                    'tens, after its lender drops, is $0 < 9$ (borrow)',
                    'hundreds, after its lender drops, is $0 < 9$ (borrow)',
                    'thousands $0 - 0$ — three events, and $112 + 999 = 1{,}111$ certifies.',
                    'Also attained by $2{,}000 - 1{,}999 = 1$, verified in L4b.',
                    'Why 3 is the ceiling: a borrow out of a column requires a lender to its left, and among four seats only the ones, tens and hundreds have one — the thousands seat has nobody to its left, so at most three columns can ever borrow, and the borrow bound caps each at a single event.',
                    'Why the mirror differs: Lesson 2.1\'s carry maximum for two 4-digit addends was **4** — every column could carry *and* the final carry could mint a brand-new fifth seat ($9{,}999 + 9{,}999 = 19{,}998$).',
                    'Borrowing moves value from higher seats to lower',
                    'it can burn a leading seat ($1{,}000 - 1$ drops to three digits) but can never create one.',
                    'Addition grows digit counts',
                    'subtraction only shrinks or preserves them — so carries max out at $k$ for k-digit numbers, borrows at $k - 1$.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The nines complement. For an n-digit subtrahend $b$, define $b^{*} = 10^{n} - 1 - b$ (each digit $d$ of $b$ becomes $9 - d$ in $b^{*}$). (a) Prove $a - b = a + b^{*} + 1 - 10^{n}$. (b) Use it to compute $4{,}589 - 2{,}764$ by addition only, and explain the "end-around carry". (c) Run $2{,}764 - 4{,}589$ the same way and interpret what the absence of the leading carry means.',
                  solution: [
                    '(a) Expand the right-hand side: $a + (10^{n} - 1 - b) + 1 - 10^{n} = a - b$ — the $10^{n}$ and the $-1$ cancel identically; only the distributive law is used.',
                    '(b) For $b = 2{,}764$ with $n = 4$: digitwise $9-2,\\; 9-7,\\; 9-6,\\; 9-4$ gives $b^{*} = 7{,}235$.',
                    'Add: $4{,}589 + 7{,}235 = 11{,}824$.',
                    'The leading 1 is the $10^{4}$ we owe: drop it ($11{,}824 - 10{,}000 = 1{,}824$) and add back the compensating $+1$ — the **end-around carry** — to land on $1{,}825$.',
                    'The same difference as the column algorithm, found with zero borrows: this is how machines that dislike borrowing (and examiners who like speed) do it.',
                    'The L4a shortcut is this identity seen from the side: $10{,}000 - 4{,}567 = (9{,}999 - 4{,}567) + 1 = 5{,}432 + 1 = 5{,}433$.',
                    '(c) Now $2{,}764 - 4{,}589$: complement the new subtrahend, $9{,}999 - 4{,}589 = 5{,}410$, and add: $2{,}764 + 5{,}410 = 8{,}174$ — **no leading carry appears**.',
                    'The method is signalling a negative difference: the answer is $-(9{,}999 - 8{,}174) = -1{,}825$, exactly the off-the-edge quantity the number line showed at the top of this lesson.',
                    'Early computers exploited precisely this — complement arithmetic lets one adder serve both operations, with negatives stored as complements — the idea that returns when this library reaches integers in Chapter 7.',
                  ],
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
    {
      id: 'fm-multiplication-repeated-addition',
      number: '2.3',
      title: 'Multiplication as Repeated Addition — and Beyond',
      concepts: [
        'Multiplication as repeated addition',
        'Equal jumps on the number line',
        'Factor and product',
        'The laws that return: closure, commutative, associative, identity 1',
        'Distributivity over addition',
        'Column multiplication as shifted partial products',
        'The mod-9 fingerprint for products',
      ],
      objectives: [
        'Explain multiplication as repeated addition and as equal jumps on the number line — and why the two orders land in the same place',
        'State the four laws multiplication shares with addition plus the new distributive law, and use each deliberately',
        'Execute column multiplication as shifted partial products, knowing why the shift exists and how large its carries may grow',
        'Bound a product\'s digit count before computing it, and check any product with the mod-9 fingerprint',
      ],
      prerequisites: ['fm-addition-carrying'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'The herder\'s flock has grown organised: four pens, six sheep each. Counting every animal gives the same slow walk as ever — twenty-four. Adding pen by pen is faster: $6 + 6 + 6 + 6 = 24$. But when the herd scales to forty pens, even addition limps. Multiplication is the operation built for **equal groups**: $4 \\times 6$ means "four sixes, combined" — and it answers instantly what forty additions would merely crawl to. Every multiplication is a compressed addition: $4 \\times 6$ is four hops of $6$; the numbers multiplied are the **factors**, the result is the **product**. Yet compression is only the beginning. Multiplication brings back every law that subtraction broke, adds a law of its own — and grows into something repeated addition can barely describe: area, scaling, and the arithmetic of "times". That growth is the *beyond* of this lesson\'s title.',
        },
        {
          kind: 'para',
          text: 'Read $4 \\times 6$ two ways: four groups of six, or six groups of four. A six-person table set four times, or a four-person table set six times — different arrangements, same twenty-four chairs. The two readings look different and *are* different, as pictures; the remarkable fact is that the totals agree, always. That agreement is the commutative property, and it is not a rule to memorise but a structure to see — on the number line first, then in rectangles, then in the shape of the times table itself.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Factor',
              def: 'Any one of the numbers being multiplied. In $4 \\times 6 = 24$, both 4 and 6 are factors.',
            },
            {
              term: 'Product',
              def: 'The result of multiplication — the total built from equal groups. In $4 \\times 6 = 24$, the product is 24.',
            },
            {
              term: 'Distributive property',
              def: 'Multiplication spreads over addition: $a \\times (b + c) = a \\times b + a \\times c$. The one law that ties the two operations together.',
            },
            {
              term: 'Partial product',
              def: 'One row of a column multiplication: the top number times a single digit of the bottom number, shifted to its proper seat. Their sum is the full product.',
            },
            {
              term: 'Multiplicative identity',
              def: 'One is the number that changes nothing under multiplication: $a \\times 1 = a$ for every whole number $a$ (multiplication\'s answer to addition\'s zero).',
            },
            {
              term: 'Base-two (binary) expansion',
              def: 'Writing a number as a sum of distinct powers of two, e.g. $247 = 128 + 64 + 32 + 16 + 4 + 2 + 1$. The engine behind the Russian-peasant method and the way computers multiply.',
            },
          ],
        },
        { kind: 'heading', text: 'Multiplication on the number line' },
        {
          kind: 'para',
          text: 'Lesson 2.1 drew $4 + 3$ as one hop of three; multiplication draws $4 \\times 6$ as **four hops, each of exactly six**. The hops are equal now — that is the signature of multiplication, and the reason it covers ground so much faster. Start at $0$, jump to $6$, $12$, $18$, $24$: four jumps, landing on $24$. Now run $6 \\times 4$: six hops of four — $4$, $8$, $12$, $16$, $20$, $24$. Different rhythm, different number of hops, **the same landing place**. The two panels below are the commutative property drawn as choreography: unequal groups arranged either way arrive together.',
        },
        {
          kind: 'figure',
          caption:
            'Multiplication as equal jumps. Top: 4 × 6 — four jumps of 6 land on 24 (tinted). Bottom: 6 × 4 — six jumps of 4 land on the same 24. The hop length and the hop count swap roles, but the landing point is fixed: the commutative property, drawn as choreography. Contrast Lesson 2.1\'s addition figure, where the hops could all differ — multiplication\'s hops are equal by definition.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 4 times 6 as four jumps of six, and 6 times 4 as six jumps of four, both landing on 24">
  <g font-size="13" fill="currentColor">
    <text x="30" y="15" opacity="0.75" text-anchor="start">4 x 6: four jumps of 6</text>
    <line x1="40" y1="88" x2="700" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${Array.from({ length: 25 }, (_, n) => `<line x1="${50 + n * 26}" y1="82" x2="${50 + n * 26}" y2="94" stroke="currentColor" stroke-width="${n % 6 === 0 ? 1.5 : 1}" opacity="${n % 6 === 0 ? 0.6 : 0.3}"/>${n % 6 === 0 ? `<text x="${50 + n * 26}" y="114" text-anchor="middle" font-weight="700" opacity="0.9">${n}</text>` : ''}`).join('\\n      ')}
    </g>
    ${[0, 1, 2, 3].map((j) => `<path d="M ${50 + j * 156} 62 Q ${128 + j * 156} 18 ${206 + j * 156} 62" fill="none" stroke="#b45309" stroke-width="2.5"/><text x="${128 + j * 156}" y="32" text-anchor="middle" font-weight="700" fill="#b45309">+6</text>`).join('\\n    ')}
    <circle cx="50" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="674" cy="88" r="7" fill="#b45309"/>
    <text x="700" y="140" opacity="0.75" text-anchor="end">6 x 4: six jumps of 4</text>
    <line x1="40" y1="230" x2="700" y2="230" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${Array.from({ length: 25 }, (_, n) => `<line x1="${50 + n * 26}" y1="224" x2="${50 + n * 26}" y2="236" stroke="currentColor" stroke-width="${n % 4 === 0 ? 1.5 : 1}" opacity="${n % 4 === 0 ? 0.6 : 0.3}"/>${n % 4 === 0 ? `<text x="${50 + n * 26}" y="256" text-anchor="middle" font-weight="700" opacity="0.9">${n}</text>` : ''}`).join('\\n      ')}
    </g>
    ${[0, 1, 2, 3, 4, 5].map((j) => `<path d="M ${50 + j * 104} 204 Q ${102 + j * 104} 160 ${154 + j * 104} 204" fill="none" stroke="#b45309" stroke-width="2.5"/><text x="${102 + j * 104}" y="174" text-anchor="middle" font-weight="700" fill="#b45309">+4</text>`).join('\\n    ')}
    <circle cx="50" cy="230" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="674" cy="230" r="7" fill="#b45309"/>
    <text x="380" y="284" text-anchor="middle" font-size="11.5" opacity="0.7">unequal rhythms, identical destination — both orders land on 24</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The rectangle says the same thing in space. Lay the twenty-four sheep out as a grid: four rows of six, or six rows of four — the *same rectangle*, stood upright. This is why the times table is symmetric: the row for 4 and the column for 4 carry identical entries, because $4 \\times b$ and $b \\times 4$ are the same rectangle rotated. Learn half the table and you know all of it — the first dividend commutativity ever pays. The rectangle also previews where multiplication is going: a product is not only a total, it is an **area** (rows times columns), and Chapter 8 will collect that debt with interest.',
        },
        { kind: 'heading', text: 'The laws that return — and the new one that joins' },
        {
          kind: 'para',
          text: 'Lesson 2.2 watched three laws die under subtraction. Multiplication resurrects them all, swaps the identity, and contributes one genuinely new law. Here is the full statute book, each entry with a verified instance.',
        },
        {
          kind: 'table',
          caption: 'The laws of multiplication on the whole numbers — three resurrected, one re-identified, one brand new',
          head: ['Law', 'Statement', 'Verified instance', 'What it buys you'],
          rows: [
            ['Closure', '$a \\times b$ is a whole number', '$247 \\times 36 = 8{,}892$', 'Products stay in the system — the set is safe again'],
            ['Commutative', '$a \\times b = b \\times a$', '$7 \\times 8 = 8 \\times 7 = 56$', 'Half the times table is the other half; choose the easier order'],
            ['Associative', '$(a \\times b) \\times c = a \\times (b \\times c)$', '$(5 \\times 4) \\times 3 = 5 \\times (4 \\times 3) = 60$', 'Group for convenience: $(5 \\times 4) \\times 3$ makes a friendlier $20 \\times 3$'],
            ['Identity', '$a \\times 1 = a$', '$8{,}892 \\times 1 = 8{,}892$', 'One is the "do nothing" multiplier — the answer to addition\'s zero'],
            ['Distributive', '$a \\times (b + c) = a \\times b + a \\times c$', '$12 \\times (5 + 4) = 60 + 48 = 108$', 'The bridge between the two operations — every column method below stands on it'],
          ],
        },
        {
          kind: 'para',
          text: 'One more law hides in plain sight — the **zero property**: $a \\times 0 = 0$ for every $a$. It is not an extra axiom; it falls out of distributivity. Since $0 + 0 = 0$, we have $a \\times 0 = a \\times (0 + 0) = a \\times 0 + a \\times 0$. So $a \\times 0$ is a whole number equal to its own double — and the only whole number with that property is $0$. Multiplication\'s annihilator: nothing times anything is nothing. Watch it work in the layout below — and notice how unlike addition\'s identity this is. Zero *absorbs* under multiplication ($247 \\times 0 = 0$) exactly where it *vanishes* under addition ($247 + 0 = 247$).',
        },
        { kind: 'heading', text: 'Column multiplication: distributivity laid out in rows' },
        {
          kind: 'para',
          text: 'Now the algorithm — and this time the justification is a single law instead of two. Expanded form (Lesson 1.1) turns $247 \\times 36$ into $(2 \\cdot 100 + 4 \\cdot 10 + 7) \\times (3 \\cdot 10 + 6)$ — and distributivity licenses splitting the *second* factor: $247 \\times 36 = 247 \\times (30 + 6) = 247 \\times 6 + 247 \\times 30$. Each piece is a **partial product**: $247 \\times 6 = 1{,}482$ and $247 \\times 30 = 7{,}410$. Their sum is the product: $1{,}482 + 7{,}410 = 8{,}892$. That is the whole secret of the column layout — two small multiplications and one addition, arranged so the shift does the place-value bookkeeping automatically.',
        },
        {
          kind: 'algorithm',
          title: 'Column multiplication of two whole numbers (partial products)',
          lines: [
            { code: 'Write the factor with more digits on top, the other below it, ones digits aligned.', note: 'Order is free (commutativity), but more digits on top means fewer partial-product rows.' },
            { code: 'Multiply the top number by the ONES digit of the bottom number, column by column from the right, carrying as needed. Write this partial product below the line.' },
            { code: 'Multiply the top number by the TENS digit of the bottom number, and write this partial product ONE SEAT LEFT — or write a 0 in the ones seat first.', note: 'The digit stands for tens: 3 in 36 is worth 30, so its partial product shifts one whole seat.' },
            { code: 'Repeat for each remaining digit of the bottom number, shifting one more seat left each time.' },
            { code: 'Add all the partial products (Lesson 2.1\'s column addition — for two rows, every carry is again at most 1).', note: 'The sum of the partial products is the product — distributivity, assembled.' },
          ],
          note:
            'Right-to-left, like every layout in this chapter. Two kinds of carrying now coexist: the carries *inside* each partial product (which can reach 8 — proved below) and the carries of the final addition (which cannot exceed 1). Keeping the two separate is most of the discipline this algorithm needs.',
        },
        {
          kind: 'example',
          title: '247 × 36, row by row',
          steps: [
            'Split the multiplier by place value: $36 = 30 + 6$. Distributivity says the product splits with it.',
            'Row one — $247 \\times 6$: ones $6 \\times 7 = 42$, write 2, carry 4; tens $6 \\times 4 + 4 = 28$, write 8, carry 2; hundreds $6 \\times 2 + 2 = 14$, write 4, carry 1. Row: $1{,}482$. (The final carry becomes the new leading digit — same door as Lesson 2.1.)',
            'Row two — $247 \\times 30$: compute $247 \\times 3$: ones $3 \\times 7 = 21$, write 1, carry 2; tens $3 \\times 4 + 2 = 14$, write 4, carry 1; hundreds $3 \\times 2 + 1 = 7$. Row: $741$ — **shifted one seat left** to become $7{,}410$, because the 3 was worth three tens.',
            'Add the partial products: $1{,}482 + 7{,}410 = 8{,}892$. Product: $8{,}892$ — four digits, exactly where the digit bound below predicts.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The partial-product layout as a seat map. Row one multiplies by the 6 of 36 outright. Row two multiplies by the 3 — but that 3 is three tens, so its product 741 enters one seat left, its trailing 0 (tinted) filling the ones seat. The two rows add by Lesson 2.1\'s column addition to 8,892. The layout IS the distributive law: $247 \\times (30 + 6) = 247 \\times 6 + 247 \\times 30$, with place value doing the filing.',
          svg: `<svg viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column multiplication of 247 and 36 showing the two partial products 1482 and 7410, the shifted zero, and the product 8892">
  <g font-size="13" fill="currentColor">
    <g font-size="22" font-weight="700" text-anchor="middle">
      <text x="450" y="110">2</text><text x="580" y="110">4</text><text x="710" y="110">7</text>
      <text x="580" y="172">3</text><text x="710" y="172">6</text>
    </g>
    <text x="520" y="172" font-size="22" font-weight="700" text-anchor="middle">x</text>
    <text x="150" y="172" font-size="12" opacity="0.75" text-anchor="start">36 = 30 + 6</text>
    <line x1="280" y1="200" x2="740" y2="200" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309" opacity="0.85">
      <text x="320" y="240">1</text><text x="450" y="240">4</text><text x="580" y="240">8</text><text x="710" y="240">2</text>
    </g>
    <text x="150" y="240" font-size="12" opacity="0.75" text-anchor="start">= 247 x 6</text>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309" opacity="0.85">
      <text x="320" y="302">7</text><text x="450" y="302">4</text><text x="580" y="302">1</text><text x="710" y="302">0</text>
    </g>
    <text x="150" y="302" font-size="12" opacity="0.75" text-anchor="start">= 247 x 30, shifted</text>
    <circle cx="710" cy="295" r="14" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="3 3" opacity="0.8"/>
    <text x="740" y="265" font-size="11.5" fill="#b45309" text-anchor="end">0 marks the shift</text>
    <line x1="280" y1="330" x2="740" y2="330" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309">
      <text x="320" y="368">8</text><text x="450" y="368">8</text><text x="580" y="368">9</text><text x="710" y="368">2</text>
    </g>
    <text x="150" y="368" font-size="12" opacity="0.75" text-anchor="start">product</text>
    <text x="60" y="400" font-size="12" opacity="0.8" text-anchor="start">247 x 36 = 247 x (30 + 6) = 247 x 6 + 247 x 30 = 1,482 + 7,410 = 8,892 — distributivity, laid out as rows</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'How large can the carries grow now?' },
        {
          kind: 'para',
          text: 'Lesson 2.1 proved addition\'s carry can never exceed 1. Multiplication changes the arithmetic inside a partial product: there we multiply a digit by a *digit of the multiplier* — two digits up to 9 each — and $9 \\times 9 = 81$ already spills eight tens before any incoming carry arrives. The carries inside partial products are genuinely bigger, and a careless pencil drops them. Exactly how big can they get? The same induction that served Lesson 2.1 answers.',
        },
        {
          kind: 'derivation',
          title: 'The partial-product carry bound',
          statement:
            'Inside a partial product (a whole number times a single digit), every carry is at most 8 — and 8 is attained.',
          steps: [
            {
              label: 'Bound one column\'s work',
              formula: 'x \\cdot d + c \\;\\le\\; 9 \\cdot 9 + 8 \\;=\\; 89',
              explanation:
                'The column multiplies a top digit $x \\le 9$ by the multiplier digit $d \\le 9$, then adds the incoming carry $c$. Whatever $c$ is, we may assume $c \\le 8$ — the claim being proved — which makes the base case below honest.',
            },
            {
              label: 'Base case: the ones column',
              formula: 'c_{1} = \\lfloor (x \\cdot d + 0)/10 \\rfloor \\;\\le\\; \\lfloor 81/10 \\rfloor \\;=\\; 8',
              explanation:
                'The first column receives no incoming carry, so its total is at most $9 \\times 9 = 81$: write the ones digit, carry at most 8. The bound holds for the first column.',
            },
            {
              label: 'Inductive step (the fixed point)',
              formula: 'c_{k+1} = \\lfloor (x \\cdot d + c_{k})/10 \\rfloor \\;\\le\\; \\lfloor 89/10 \\rfloor \\;=\\; 8',
              explanation:
                'If every carry so far has been at most 8, the next column totals at most $81 + 8 = 89$, whose carry is again at most 8. The bound reproduces itself — a fixed point, exactly as Lesson 2.1\'s bound of 1 did.',
            },
          ],
          result:
            'Carries inside a partial product never exceed 8, and $999 \\times 9 = 8{,}991$ attains them: $81$ carries 8, then $89$ and $89$ again. So multiplication\'s inner margin is eight times addition\'s — roomy, but still finite, and still independent of how long the number is. (The final *addition* of two partial products is ordinary two-row addition: its carries are back to at most 1.)',
        },
        { kind: 'heading', text: 'How big can a product be?' },
        {
          kind: 'para',
          text: 'Before computing any product, a good examiner\'s habit: predict its *size*. Addition of two k-digit numbers gained at most one digit (Lesson 2.1). Multiplication is far more generous — digits pool, not merely spill — and the exact accounting is one expansion long.',
        },
        {
          kind: 'derivation',
          title: 'The product digit bound',
          statement:
            'A k-digit number times an m-digit number has at least k + m − 1 and at most k + m digits.',
          steps: [
            {
              label: 'Cap the factors',
              formula: 'a \\;\\le\\; 10^{k} - 1, \\quad b \\;\\le\\; 10^{m} - 1',
              explanation:
                'A k-digit number never reaches $10^{k}$: its ceiling is $10^{k} - 1$ (all nines), and its floor is $10^{k-1}$ (a 1 followed by zeros) — both facts from Lesson 1.2\'s digit-count rule.',
            },
            {
              label: 'Multiply the caps',
              formula: 'a \\cdot b \\;\\le\\; (10^{k} - 1)(10^{m} - 1) \\;=\\; 10^{k+m} - 10^{k} - 10^{m} + 1 \\;<\\; 10^{k+m}',
              explanation:
                'The all-nines worst case: $999 \\times 999 = 998{,}001$ — six digits from three plus three, and still short of $10^{6}$. Whatever the factors are, the product stays below $10^{k+m}$, so it has at most $k + m$ digits.',
            },
            {
              label: 'Floor the factors (the lower bound)',
              formula: 'a \\cdot b \\;\\ge\\; 10^{k-1} \\cdot 10^{m-1} \\;=\\; 10^{k+m-2}',
              explanation:
                'The smallest k-digit factor is $10^{k-1}$, and likewise for m digits. A product of at least $10^{k+m-2}$ has at least $k + m - 1$ digits: $100 \\times 100 = 10{,}000$ — five digits, exactly $3 + 3 - 1$. The size is bracketed, not merely capped.',
            },
          ],
          result:
            'k + m − 1 ≤ digits of a product ≤ k + m. Our worked product $247 \\times 36 = 8{,}892$ has 4 digits, inside the promised window $3 + 2 - 1 = 4$ to $3 + 2 = 5$. Before you multiply, you already know how many digits to expect — a sanity check that costs nothing and catches shifted or dropped digits instantly.',
        },
        {
          kind: 'equation',
          latex: 'a \\times (10t + u) \\;=\\; (a \\times u) \\;+\\; 10 \\times (a \\times t)',
          note: 'Every multiplication by a two-digit number is two partial products, the tens one shifted: $a \\times 36 = (a \\times 6) + 10 \\times (a \\times 3)$. The column layout is this identity drawn as rows — the shift is not a convention but the $\\times 10$.',
        },
        {
          kind: 'formula',
          name: 'Product digit bound',
          latex: '10^{k+m-2} \\;\\le\\; a \\cdot b \\;<\\; 10^{k+m}',
          note: 'A k-digit × m-digit product has between k + m − 1 and k + m digits. Example: 999 × 999 = 998,001 (six = 3 + 3); 100 × 100 = 10,000 (five = 3 + 3 − 1). Predict the size, then multiply.',
        },
        { kind: 'heading', text: 'Checking multiplication: the fingerprint multiplies' },
        {
          kind: 'para',
          text: 'Lesson 2.1\'s mod-9 fingerprint survives multiplication, and now it *multiplies*: the fingerprint of a product must equal the product of the fingerprints. For $247 \\times 36$: fingerprint of $247$ is $2+4+7 = 13 \\to 4$; of $36$ is $9$ (a fingerprint of 9 stands for 0); and $4 \\times 9 = 36 \\to 9$. The answer must fingerprint to 9 — and $8{,}892$ has digit sum $27 \\to 9$. The deep reason: a number\'s fingerprint is its remainder on division by 9, and remainders multiply like the numbers do. One consequence is worth memorising: **if either factor is a multiple of 9, the product must be too** ($36$ fingerprints to 9 ≡ 0, and zero times anything is zero — the annihilator reappearing inside the checksum).',
        },
        {
          kind: 'formula',
          name: 'Digit-sum (mod 9) check for multiplication',
          latex: 'S(a \\times b) \\;\\equiv\\; S(a) \\times S(b) \\pmod{9}',
          note: 'S(n) = digit sum reduced to a single digit (9 standing for 0). Mismatch ⇒ certainly wrong; match ⇒ probably right. Same blind family as always: transpositions and ±9 slips pass (8,982 fingerprints like 8,892).',
        },
        {
          kind: 'para',
          text: 'Honesty about the blind spots — sharpened by a subtlety specific to multiplication. The misalignment trap below turns $247 \\times 36$ into $2{,}223$ — and $2{,}223$ **passes the fingerprint check**, because it is not an arithmetic error at all: it is the perfectly correct product $247 \\times 9$. The fingerprint certifies that the answer is *some* consistent product, not that it is the product you intended. So multiply the guards: the digit-count check first (expect 4 or 5 digits here — both candidates pass it too, honestly admitted), the fingerprint second, and for full certification use the check the next lesson will supply: division, the actual inverse of multiplication. Each guard narrows the net; none alone is a jailer.',
        },
        { kind: 'heading', text: 'Speed techniques: distributivity in disguise' },
        {
          kind: 'para',
          text: 'Examination arithmetic rewards one habit above all: splitting before multiplying. **Nines**: $247 \\times 9 = 247 \\times 10 - 247 \\times 1 = 2{,}470 - 247 = 2{,}223$ — multiply by ten, take back one factor. **Elevens**: $247 \\times 11 = 2{,}470 + 247 = 2{,}717$ — multiply by ten, give one more. **Close numbers**: $198 \\times 7 = 200 \\times 7 - 2 \\times 7 = 1{,}400 - 14 = 1{,}386$. **Complementary pairs**: $24 \\times 25 = 12 \\times 50 = 600$ — halve one factor, double the other, and the product holds ($24 \\times 25 = (24 \\div 2) \\times (25 \\times 2)$), because two by two, the halves and doublings cancel. None of these is a trick to memorise: each is the distributive or associative law with the numbers dressed for speed, and each is verified by the fingerprint in the exercises.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Russian peasants, binary, and the machine on your desk',
          text: 'Halve one factor (discarding remainders), double the other, keep the doubles beside **odd** halves, and add the kept rows — Russian peasant multiplication, old enough to appear in Egyptian papyri and still running inside every computer. Our worked pair: halves of $247$ run $123, 61, 30, 15, 7, 3, 1$ against doubles of $36$: $72, 144, 288, 576, 1{,}152, 2{,}304, 4{,}608$. The even half $30$ discards its double $288$; the kept rows sum $36 + 72 + 144 + 576 + 1{,}152 + 2{,}304 + 4{,}608 = 8{,}892$ — the true product. Why it works: the kept rows are exactly $36$ times the powers of two hiding in $247 = 128 + 64 + 32 + 16 + 4 + 2 + 1$ — its **binary expansion** — and the discarded row is the one power of two (8, hiding in the discarded $30$) that $247$ does not contain. Halving reads the number in base two; doubling builds the product additively. Your processor multiplies by precisely this shift-and-add choreography — the peasants were doing computer science all along.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Bank and SSC quantitative sections open with speed-multiplication items whose intended tools are exactly this lesson\'s: ×9/×11 via the ten-route ($247 \\times 9 = 2{,}470 - 247$), close-number compensation ($198 \\times 7$), and complementary pairs ($24 \\times 25 = 600$). "Which property is this?" questions (CUET/NTSE) hinge on distinguishing commutative from distributive — remember distributivity is the only law that involves *both* operations. The digit-sum check appears as an answer-option filter: options that are not multiples of 9 can be eliminated instantly when a factor is. And column-multiplication errors are tested through *misalignment* options — the $2{,}223$ trap — which the digit-count and fingerprint checks together expose.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Writing 247 × 36 as 247 × 6 + 247 × 30 uses which law?',
              options: ['Associative', 'Commutative', 'Distributive over addition', 'Identity'],
              answer: 2,
              explain:
                'Distributivity splits the multiplier: $247 \\times (30 + 6) = 247 \\times 30 + 247 \\times 6$. It is the only law on the list that involves both operations — and it is the entire justification of the column layout. Associativity regroups a chain of multiplications; commutativity reorders two factors; neither can split an addition inside a factor.',
            },
            {
              q: 'The identity for multiplication — the number that changes nothing — is:',
              options: ['0', '1', 'Every whole number', 'There is none'],
              answer: 1,
              explain:
                '$a \\times 1 = a$ for every whole number: one is to multiplication exactly what zero is to addition. Option 1 tempts anyone carrying over addition\'s habit — but $247 \\times 0 = 0$, not 247: zero is multiplication\'s annihilator, the opposite of a do-nothing.',
            },
            {
              q: 'In column multiplication of 247 × 36, the second partial product is written one seat to the left because:',
              options: [
                'The 3 in 36 stands for 3 tens — the row is really 247 × 30',
                'Carries must be kept aligned with each other',
                '36 is even, so the layout shifts',
                'It is decoration; the answer is the same either way',
              ],
              answer: 0,
              explain:
                'The tens digit contributes $247 \\times 30 = 7{,}410$, and writing $741$ one seat left is exactly the $\\times 10$. Skip the shift and you compute $247 \\times 6 + 247 \\times 3 = 247 \\times 9 = 2{,}223$ — a real product, but of the wrong number, and the fingerprint check cannot save you (it is internally consistent!). Only understanding the shift does.',
            },
            {
              q: 'Inside one partial product, the carry from a column can be at most:',
              options: ['1', '8', '9', 'Unbounded — any size'],
              answer: 1,
              explain:
                'Worst column: $9 \\times 9 = 81$, carrying 8; with the largest legal incoming carry, $81 + 8 = 89$, still carrying 8 — a fixed point. So the carry never exceeds 8, and $999 \\times 9 = 8{,}991$ attains it ($81$, then $89$, $89$). Option 3 overcounts: 9 would need a column total of 90+, but $81 + 8 = 89$ is the ceiling. Option 1 is addition\'s bound — the right answer to the wrong lesson.',
            },
            {
              q: 'Before computing 999 × 999, the digit bound promises the product has:',
              options: [
                '5 digits — products stay within the larger factor\'s count',
                '6 digits — the k + m ceiling, attained here',
                '7 digits — carries always add one',
                '9 digits — three digits plus three digits',
              ],
              answer: 1,
              explain:
                'The bound says between $k + m - 1 = 5$ and $k + m = 6$ digits. The all-nines case attains the ceiling: $999 \\times 999 = 998{,}001$, six digits. Option 4 confuses multiplying with concatenating ($999999$ is not $999 \\times 999$); option 2\'s "always adds a digit" describes neither operation — addition gains a digit only on final-carry overflow, and multiplication pools digits by the bound.',
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
                  q: 'Compute $34 \\times 7$ by column multiplication and state every carry.',
                  solution: [
                    'Ones: $7 \\times 4 = 28$ — write 8, carry 2.',
                    'Tens: $7 \\times 3 + 2 = 23$ — write 3, final carry 2 becomes the new leading digit.',
                    'Product: $238$.',
                    'Two carry events, one of them (the 2) growing a digit — carries here are already livelier than any addition carry, as the bound predicts.',
                  ],
                },
                {
                  q: 'Compute $58 \\times 6$ by column multiplication, and check the answer by the digit-sum fingerprint.',
                  solution: [
                    'Ones: $6 \\times 8 = 48$ — write 8, carry 4.',
                    'Tens: $6 \\times 5 + 4 = 34$ — write 4, final carry 3.',
                    'Product: $348$.',
                    'Fingerprint: $58 \\to 13 \\to 4$',
                    '$6 \\to 6$',
                    'expected $4 \\times 6 = 24 \\to 6$.',
                    'Actual: $3+4+8 = 15 \\to 6$.',
                    'Match — the product survives the check.',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $247 \\times 36$ by column multiplication, listing both partial products with their carries, and certify the answer with the digit-count bound and the fingerprint.',
                  solution: [
                    'Row one, $247 \\times 6$: $42 \\to$ write 2 carry 4',
                    '$28 \\to$ write 8 carry 2',
                    '$14 \\to$ write 4, final carry 1: $1{,}482$.',
                    'Row two, $247 \\times 30$: $21 \\to$ write 1 carry 2',
                    '$14 \\to$ write 4 carry 1',
                    '$7$: $741$, shifted to $7{,}410$.',
                    'Sum: $8{,}892$.',
                    'Digit count: 4, inside the promised window $[3+2-1,\\; 3+2] = [4, 5]$.',
                    'Fingerprint: $247 \\to 4$, $36 \\to 9$, expected $4 \\times 9 = 36 \\to 9$',
                    'actual $27 \\to 9$.',
                    'Certified twice over.',
                  ],
                },
                {
                  q: 'Compute $63 \\times 45$ by column multiplication and verify with the fingerprint.',
                  solution: [
                    'Row one, $63 \\times 5$: $15 \\to$ write 5 carry 1',
                    '$31 \\to$ write 1, final carry 3: $315$.',
                    'Row two, $63 \\times 40$: $63 \\times 4$: $12 \\to$ write 2 carry 1',
                    '$25 \\to$ write 5, final carry 2: $252$, shifted to $2{,}520$.',
                    'Sum: $315 + 2{,}520 = 2{,}835$.',
                    'Fingerprint: $63 \\to 9$, $45 \\to 9$ — both factors are multiples of 9, so the product must be too (expected fingerprint $9 \\times 9 = 81 \\to 9$)',
                    'actual $2+8+3+5 = 18 \\to 9$.',
                    'A nice special case: the checksum knew the answer had to be a multiple of 9 before any multiplication happened.',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Compute $198 \\times 7$ by the close-number route, and prove the route is lawful by naming the law and showing the two products it adds.',
                  solution: [
                    '$198 = 200 - 2$, so $198 \\times 7 = (200 - 2) \\times 7 = 200 \\times 7 - 2 \\times 7 = 1{,}400 - 14 = 1{,}386$.',
                    'The law is distributivity with a subtraction inside: $a \\times (b - c) = a \\times b - a \\times c$ — the same spreading, pointed the other way (it follows from the addition form since $200 - 2 = 198 + $ a correction, or directly: $(b-c) + c = b$).',
                    'Fingerprint: $198 \\to 18 \\to 9$ (a multiple of 9), so the product must fingerprint to $9 \\times 7 = 63 \\to 9$',
                    'actual $1+3+8+6 = 18 \\to 9$.',
                    'The speed route and the checksum agree.',
                  ],
                },
                {
                  q: '(Exam-style, foundation level) Compute $24 \\times 25$ two ways: by halving-and-doubling, and by using associativity with the factorisation $25 = 4 \\times 6 \\ldots$ or any grouping you find friendlier. Confirm both routes land on the same product and say which law guarantees that.',
                  solution: [
                    'Route one: $24 \\times 25 = 12 \\times 50 = 600$ (halve one factor, double the other — repeatable because the two changes cancel).',
                    'Route two: $24 \\times 25 = 24 \\times (4 \\times 6) \\ldots$ friendlier still: $25 \\times 4 = 100$ first — $24 \\times 25 = 24 \\times (25) = 6 \\times (4 \\times 25) = 6 \\times 100 = 600$, where the regrouping $24 \\times (4 \\times 25)$ from $(24 \\times 4) \\times 25$ uses associativity (with a commutative reorder along the way).',
                    'Same product, 600, guaranteed by commutativity + associativity: multiplication\'s grouping and order are free, so every route must land together.',
                    '(In full: $24 \\times 25 = (6 \\times 4) \\times 25 = 6 \\times (4 \\times 25) = 6 \\times 100$.)',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove that the carry inside a partial product never exceeds 8, exhibit a multiplication that attains a carry of 8, and explain precisely why the answer differs from addition\'s carry bound of Lesson 2.1.',
                  solution: [
                    'Proof by induction on the columns.',
                    'Base: the ones column receives no incoming carry, so its total is at most $9 \\times 9 = 81$, and $\\lfloor 81/10 \\rfloor = 8$.',
                    'Step: if the incoming carry is at most 8, a column totals at most $81 + 8 = 89$, and $\\lfloor 89/10 \\rfloor = 8$ — the bound reproduces itself.',
                    'Attainment: $999 \\times 9$: ones $9 \\times 9 = 81$ (write 1, carry 8)',
                    'tens $9 \\times 9 + 8 = 89$ (write 9, carry 8)',
                    'hundreds $9 \\times 9 + 8 = 89$ (write 9, final carry 8) — product $8{,}991$, with a carry of 8 born in every column.',
                    'Why different from addition: addition\'s column combined *two digits plus a carry* ($9 + 9 + 1 = 19$), a sum capped at 19 whose carry cannot exceed 1',
                    'a partial-product column combines a *product of two digits plus a carry* ($9 \\times 9 + 8 = 89$) — the multiplication inside is what inflates the carry.',
                    'The moral: the carry bound is not a property of "carrying" in the abstract; it is a property of what the column actually computes.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Russian peasant multiplication. (a) Use it to compute $247 \\times 36$: list the halving column, the doubling column, mark the kept rows, and sum them. (b) Prove the method must give the true product by writing 247 in base two and matching each kept row to a power of two. (c) The discarded row corresponds to which power of two, and how does the halving column "know" to discard it?',
                  solution: [
                    '(a) Halves of 247: $123, 61, 30, 15, 7, 3, 1$ (each $\\lfloor n/2 \\rfloor$, remainder discarded)',
                    'doubles of 36: $72, 144, 288, 576, 1{,}152, 2{,}304, 4{,}608$.',
                    'Keep rows whose half is odd — all but the $30$ row.',
                    'Kept sum: $36 + 72 + 144 + 576 + 1{,}152 + 2{,}304 + 4{,}608 = 8{,}892$.',
                    '(b) Base two: $247 = 128 + 64 + 32 + 16 + 4 + 2 + 1$ (binary $11110111$).',
                    'The doubling column walks $36 \\times 2^{0}, 36 \\times 2^{1}, \\ldots, 36 \\times 2^{6}$, and the kept rows are exactly those with a 1 in the binary expansion: $36 \\times 1 + 36 \\times 2 + 36 \\times 4 + 36 \\times 16 + 36 \\times 32 + 36 \\times 64 + 36 \\times 128 = 36 \\times 247$.',
                    'Distributivity collects them into the product.',
                    '(c) The discarded row is $36 \\times 8 = 288$, the power $2^{3}$ — and the halving column knows because 30 is even: $247$\'s halving chain hits $30$ exactly when the accumulated odd/even pattern has encoded a 0 in position $2^{3}$ of the binary expansion.',
                    'Oddness of the half is the bit',
                    'the method is long multiplication in base two, which is why processors still do it this way.',
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'Multiplication, then, is repeated addition that outgrew its teacher: the equal jumps land where unequal ones could not, the laws of addition return with a new identity, and distributivity welds the two operations into one system — a system the column layout writes out as shifted partial products, sized by a digit bound you can state before you compute, and guarded by a fingerprint that now multiplies. One operation remains, and it is the strangest of the four: division, which undoes all of this — and refuses, absolutely, to undo it by zero.',
        },
      ],
    },
    {
      id: 'fm-division-remainders-zero',
      number: '2.4',
      title: 'Division, Remainders and Why Zero Never Divides',
      concepts: [
        'Sharing and grouping — the two readings',
        'Dividend, divisor, quotient, remainder',
        'Equal jumps backwards: division as repeated subtraction',
        'Division as the inverse of multiplication',
        'The division algorithm a = q·b + r',
        'The remainder bound r < b',
        'Why division by zero is undefined',
      ],
      objectives: [
        'Read division both ways — equal sharing and grouping — and see each as undoing a multiplication',
        'Execute long division as the multiply–subtract–bring-down loop, knowing why each step is lawful and where place value hides',
        'Prove and use the remainder bound r < b, predict a quotient\'s digit count, and certify any division with the check a = q·b + r and the mod-9 fingerprint',
        'Prove why division by zero has no answer — and why 0 ÷ 0 fails differently from 7 ÷ 0',
      ],
      prerequisites: ['fm-multiplication-repeated-addition'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 2.3 closed with a promise: one operation remains, and it refuses to undo by zero. Time to collect. The herder\'s flock — twenty-four sheep, four pens, six each — now faces its first reverse question: the pens are built and the sheep stand equal; division asks how the flock came to be arranged this way. Undoing $4 \\times 6 = 24$ has two directions, and each is a genuine question: $24 \\div 4 = 6$ (twenty-four sheep among four pens — six per pen) and $24 \\div 6 = 4$ (pens of six — four pens fill). Then the flock grows by one stray, and arithmetic meets its first honest failure: $25 \\div 6 = 4$ with one sheep left over — four full pens and a **remainder** that no pen of six can absorb. That remainder, and the door that stays shut beside it, are this lesson\'s two subjects: how division computes, and why it refuses to compute by zero.',
        },
        {
          kind: 'para',
          text: 'Both questions undo the same multiplication, but the divisor changes jobs. Read $24 \\div 4$ as **sharing** (the old name is *partitive*): twenty-four dealt out among four receivers — the divisor counts the sharers, the answer sizes each share. Read $24 \\div 6$ as **grouping** (*quotative*): packing twenty-four into bags of six — the divisor sizes the bags, the answer counts them. Same dividend, same quotient, different story. Keep both readings live: word problems signal which one they mean ("how much each?" versus "how many groups?"), and the long-division algorithm below quietly uses grouping — it counts how many thirty-sixes fit into each leading chunk of $8{,}892$.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Dividend',
              def: 'The total being divided — the number at the division\'s front door. In $25 \\div 6 = 4$ remainder $1$, the dividend is 25.',
            },
            {
              term: 'Divisor',
              def: 'The number you divide BY — the size of each group (grouping reading) or the count of sharers (sharing reading). It sits in the one seat zero may never occupy.',
            },
            {
              term: 'Quotient',
              def: 'The whole-number count division returns: how many groups (or how much per share) before anything is left over. In $25 \\div 6$, the quotient is 4.',
            },
            {
              term: 'Remainder',
              def: 'The leftover after the last full group — always smaller than the divisor (proved below). In $25 \\div 6 = 4$ remainder $1$, the check $4 \\times 6 + 1 = 25$ rebuilds the dividend.',
            },
            {
              term: 'Sharing (partitive) reading',
              def: 'Division as dealing out: $24 \\div 4$ asks "24 shared equally among 4 — how much each?" The divisor counts the sharers.',
            },
            {
              term: 'Grouping (quotative) reading',
              def: 'Division as packing: $24 \\div 6$ asks "how many groups of 6 fit in 24?" The divisor sizes the groups. Same undoing of $4 \\times 6 = 24$ — the divisor merely changes jobs.',
            },
          ],
        },
        { kind: 'heading', text: 'Division on the number line' },
        {
          kind: 'para',
          text: 'Lesson 2.1 drew addition as one forward hop; Lesson 2.3 drew multiplication as equal forward jumps. Division runs the same film backwards: start at the dividend and subtract the divisor in equal jumps until nothing (or almost nothing) remains. For $24 \\div 6$: $24 \\to 18 \\to 12 \\to 6 \\to 0$ — four jumps, and **the jump count is the quotient**. This is also the plainest definition of division: **repeated subtraction**. For $25 \\div 6$ the film ends differently — four full jumps land on 1, one short of a fifth: the leftover is the remainder, and the count of jumps is still 4.',
        },
        {
          kind: 'figure',
          caption:
            'Division as equal jumps run backwards. Top: 24 ÷ 6 — four jumps of 6 land exactly on 0 (tinted): the grouping reading asks how many sixes fit in 24, and the answer is the jump count 4. Bottom: 25 ÷ 6 — the same four jumps leave 1 (tinted): one sheep no pen of six can absorb. That leftover is the remainder, and the check $4 \\times 6 + 1 = 25$ rebuilds the flock. Contrast Lesson 2.1\'s forward hops and 2.3\'s equal forward jumps — division is the same film in reverse.',
          svg: `<svg viewBox="0 0 760 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 24 divided by 6 as four backward jumps of six landing on zero, and 25 divided by 6 as four backward jumps landing on one, the remainder">
  <g font-size="13" fill="currentColor">
    <text x="30" y="15" opacity="0.75" text-anchor="start">24 ÷ 6: four jumps of 6 backward</text>
    <line x1="40" y1="88" x2="700" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${Array.from({ length: 25 }, (_, n) => `<line x1="${50 + n * 26}" y1="82" x2="${50 + n * 26}" y2="94" stroke="currentColor" stroke-width="${n % 6 === 0 ? 1.5 : 1}" opacity="${n % 6 === 0 ? 0.6 : 0.3}"/>${n % 6 === 0 ? `<text x="${50 + n * 26}" y="114" text-anchor="middle" font-weight="700" opacity="0.9">${n}</text>` : ''}`).join('\\n      ')}
    </g>
    ${[0, 1, 2, 3].map((j) => `<path d="M ${674 - j * 156} 62 Q ${596 - j * 156} 18 ${518 - j * 156} 62" fill="none" stroke="#b45309" stroke-width="2.5"/><text x="${596 - j * 156}" y="32" text-anchor="middle" font-weight="700" fill="#b45309">-6</text>`).join('\\n    ')}
    <circle cx="674" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="50" cy="88" r="7" fill="#b45309"/>
    <text x="700" y="140" opacity="0.75" text-anchor="end">25 ÷ 6: four jumps of 6, one left over</text>
    <line x1="40" y1="222" x2="700" y2="222" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
      ${Array.from({ length: 26 }, (_, n) => `<line x1="${50 + n * 26}" y1="216" x2="${50 + n * 26}" y2="228" stroke="currentColor" stroke-width="${n % 6 === 0 || n === 25 ? 1.5 : 1}" opacity="${n % 6 === 0 || n === 25 ? 0.6 : 0.3}"/>${n % 6 === 0 || n === 25 ? `<text x="${50 + n * 26}" y="248" text-anchor="middle" font-weight="700" opacity="0.9">${n}</text>` : ''}`).join('\\n      ')}
    </g>
    ${[0, 1, 2, 3].map((j) => `<path d="M ${700 - j * 156} 196 Q ${622 - j * 156} 152 ${544 - j * 156} 196" fill="none" stroke="#b45309" stroke-width="2.5"/><text x="${622 - j * 156}" y="166" text-anchor="middle" font-weight="700" fill="#b45309">-6</text>`).join('\\n    ')}
    <circle cx="700" cy="222" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="76" cy="222" r="7" fill="#b45309"/>
    <text x="76" y="272" text-anchor="middle" font-size="11.5" fill="#b45309">lands on 1 — the remainder</text>
    <text x="400" y="292" text-anchor="middle" font-size="11.5" opacity="0.7">equal jumps run backwards — four full sixes leave one sheep the pens cannot absorb</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Now name the roles permanently. In $a \\div b$, $a$ is the **dividend** (what is being divided), $b$ the **divisor** (what divides it), the jump count the **quotient**, and any leftover the **remainder**. Division is multiplication undone — but with a built-in honesty clause multiplication never needed: the undoing is allowed to miss. Every division in this lesson obeys one treaty, the **division algorithm**: the dividend equals the quotient times the divisor plus the remainder. $24 = 4 \\times 6 + 0$; $25 = 4 \\times 6 + 1$. The check is not decoration — it is the definition of the four words, written as an equation, and at the end of a long-division tableau it is what you multiply back to certify the answer.',
        },
        { kind: 'heading', text: 'The laws, tried one last time' },
        {
          kind: 'para',
          text: 'Each operation in this chapter has faced the same tribunal: which of addition\'s four laws survive? Subtraction kept one (a half-truth: $a - 0 = a$). Multiplication resurrected all four and added a fifth. Division faces the harshest retrial yet — and the verdict below leaves the statute book nearly bare.',
        },
        {
          kind: 'table',
          caption:
            'The laws of division on the whole numbers — closure fails, grouping fails, and one door is bricked shut. Compare Lessons 2.2 and 2.3: the statute book empties as the operations reach division.',
          head: ['Law', 'Statement', 'Verified instance', 'What it buys you'],
          rows: [
            ['Closure', 'Fails — quotients need not be whole', '$25 \\div 4 = 6$ r $1$, and $6 \\times 4 + 1 = 25$', 'No whole number times 4 rebuilds 25: remainders are real, and division can leave the whole numbers'],
            ['Commutative', 'Fails — $a \\div b \\ne b \\div a$', '$8 \\div 4 = 2$, but $4 \\div 8 = 0$ r $4$', 'Order matters now: read every division left to right, divisor in its seat'],
            ['Associative', 'Fails — regrouping changes the result', '$(8 \\div 4) \\div 2 = 1$, but $8 \\div (4 \\div 2) = 4$', 'Brackets bind: each grouping is a different question'],
            ['Identity (one-sided)', '$a \\div 1 = a$', '$8{,}892 \\div 1 = 8{,}892$', 'One does nothing — but only from the divisor seat ($1 \\div 8{,}892 = 0$ r $1$)'],
            ['Division by zero', 'Never defined — for any dividend', '$7 \\div 0$: no $q$ with $q \\times 0 = 7$', 'The one bricked-shut door — proved two blocks from here'],
          ],
        },
        { kind: 'heading', text: 'The one closed door: dividing by zero' },
        {
          kind: 'para',
          text: 'One row of the table deserves its own room. Lesson 2.3 derived the zero property — $a \\times 0 = 0$ for every $a$ — as a consequence of distributivity. That harmless-looking fact is division\'s bouncer: it stands at the divisor\'s seat and turns every candidate answer away. The proof is two cases and one line each, and it earns its place as the only *theorem about what cannot be done* in this chapter.',
        },
        {
          kind: 'derivation',
          title: 'Why nothing can be divided by zero',
          statement:
            'For $a \\ne 0$, $a \\div 0$ has no answer; $0 \\div 0$ has no unique answer; only $0 \\div b = 0$ (with $b \\ne 0$) is legal.',
          steps: [
            {
              label: 'What division demands',
              formula: 'a \\div b = q \\;\\Longleftrightarrow\\; q \\times b = a',
              explanation:
                'Division is multiplication undone (Lesson 2.3): to divide is to name the number that, multiplied by the divisor, rebuilds the dividend. Every candidate answer must survive this test.',
            },
            {
              label: 'Case one: $7 \\div 0$ — no candidate survives',
              formula: 'q \\times 0 = 0 \\;\\ne\\; 7 \\quad \\text{for every } q',
              explanation:
                'The zero property is absolute: every whole number times zero gives zero. No candidate — 0, 7, a million — passes the rebuild test. The answer set is empty: **undefined**.',
            },
            {
              label: 'Case two: $0 \\div 0$ — every candidate survives',
              formula: '3 \\times 0 = 0, \\quad 17 \\times 0 = 0, \\quad q \\times 0 = 0 \\text{ always}',
              explanation:
                'Now every whole number passes the test, so no single answer is picked out: **indeterminate**. Undefined because nothing works; indeterminate because everything does. Different failures, same verdict: no answer.',
            },
          ],
          result:
            'Division by zero is undefined — the one closed door in whole-number arithmetic. Note the asymmetry: zero may be divided ($0 \\div 5 = 0$, since $0 \\times 5 = 0$) but may never divide. The hole sits in the divisor seat — which is why the check equation below, guardian of every division, goes silent exactly when the divisor does.',
        },
        { kind: 'heading', text: 'Long division: the multiply–subtract–bring-down loop' },
        {
          kind: 'para',
          text: 'Subtracting 6 four times is child\'s play; subtracting 36 from 8,892 four hundred–odd times is not. Long division is repeated subtraction **compressed by place value**: instead of removing one 36 at a time, each loop removes as many thirty-sixes as the leading chunk can hold — dozens at a stroke, hundreds at the next. The layout is also this chapter\'s mirror image: addition, subtraction and multiplication all worked right-to-left; division reads left-to-right, because its question is "how big is the leading chunk?" — and place value scales each answer on the spot, exactly as the shift scaled Lesson 2.3\'s partial products.',
        },
        {
          kind: 'algorithm',
          title: 'Long division of a ÷ b (the multiply–subtract–bring-down loop)',
          lines: [
            { code: 'Set up: dividend under the bar, divisor outside left. Work LEFT TO RIGHT — the mirror of every layout so far.', note: 'Addition, subtraction and multiplication ran right-to-left; division starts at the leading chunk because it asks how many b\'s fit into the big end first.' },
            { code: 'Take the smallest leading chunk of the dividend that reaches b. Its quotient digit is the first digit of the answer — write it above the chunk\'s last seat.' },
            { code: 'MULTIPLY: divisor x quotient-digit. Write the product under the chunk.' },
            { code: 'SUBTRACT: chunk minus product. The difference is what is left so far — and it must be smaller than b (the remainder bound, proved below).' },
            { code: 'BRING DOWN the next dividend digit beside the difference. Repeat the loop: multiply, subtract, bring down.' },
            { code: 'When no digits remain to bring down, the last difference is the remainder r. Certify: quotient x divisor + r must rebuild the dividend.' },
          ],
          note:
            'Three verbs — multiply, subtract, bring down — looped until the digits run out. Every subtraction here is a Lesson 2.2 borrowing exercise; every product a Lesson 2.3 one-digit multiplication. The loop is just repeated subtraction kept tidy by place value.',
        },
        {
          kind: 'example',
          title: '8,892 ÷ 36, stage by stage',
          steps: [
            'Left to right. The smallest leading chunk of $8{,}892$ that reaches 36 is $88$ (8 alone is too small). Its quotient digit: $88 \\div 36 = 2$, since $2 \\times 36 = 72$. Write 2 above the second 8.',
            'MULTIPLY and SUBTRACT: $2 \\times 36 = 72$; $88 - 72 = 16$ — smaller than 36, as the remainder bound demands.',
            'BRING DOWN the 9 beside the 16: $169$. Loop: $169 \\div 36 = 4$ (because $4 \\times 36 = 144$); $169 - 144 = 25$ — again below 36. Write 4 in the quotient.',
            'BRING DOWN the 2 beside the 25: $252$. Loop: $252 \\div 36 = 7$ (because $7 \\times 36 = 252$); $252 - 252 = 0$. Write 7. Digits exhausted, remainder 0.',
            'Quotient: 247, remainder 0. The check rebuilds the dividend: $247 \\times 36 + 0 = 8{,}892$ — the very product Lesson 2.3 assembled row by row, now taken apart stage by stage. Division closed the circle.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The long-division tableau as a seat map. Tinted rows are the multiply products (72, 144, 252); dashed circles mark the brought-down digits — the 9, then the 2 — threading the dividend into the working rows. Quotient digits sit above the seat where each chunk ends: 2 above the second 8 (chunk 88), 4 above the 9 (chunk 169), 7 above the 2 (chunk 252), reading 247. The seat scaling is invisible but real: the 72 written under the leading 88 is 72 hundreds ($2 \\times 3{,}600 = 7{,}200$), the same $\\times 10$ seat-scaling that shifted Lesson 2.3\'s partial products. Final difference 0 — an exact division, certified by $247 \\times 36 + 0 = 8{,}892$.',
          svg: `<svg viewBox="0 0 760 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Long division tableau of 8892 divided by 36 giving quotient 247 remainder 0, with multiply, subtract and bring-down rows labelled">
  <g font-size="13" fill="currentColor">
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309">
      <text x="450" y="54">2</text><text x="580" y="54">4</text><text x="710" y="54">7</text>
    </g>
    <text x="60" y="54" font-size="12" opacity="0.75" text-anchor="start">quotient 247</text>
    <text x="170" y="110" font-size="18" font-weight="700" text-anchor="middle">÷ 36</text>
    <g font-size="22" font-weight="700" text-anchor="middle">
      <text x="320" y="110">8</text><text x="450" y="110">8</text><text x="580" y="110">9</text><text x="710" y="110">2</text>
    </g>
    <line x1="280" y1="128" x2="740" y2="128" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309" opacity="0.85">
      <text x="320" y="170">7</text><text x="450" y="170">2</text>
    </g>
    <text x="60" y="170" font-size="12" opacity="0.75" text-anchor="start">2 x 36 = 72</text>
    <line x1="280" y1="184" x2="740" y2="184" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle">
      <text x="320" y="258">1</text><text x="450" y="258">6</text><text x="580" y="258" fill="#b45309">9</text>
    </g>
    <circle cx="580" cy="251" r="14" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="3 3" opacity="0.8"/>
    <text x="60" y="258" font-size="12" opacity="0.75" text-anchor="start">88 - 72 = 16; bring down the 9</text>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309" opacity="0.85">
      <text x="320" y="302">1</text><text x="450" y="302">4</text><text x="580" y="302">4</text>
    </g>
    <text x="60" y="302" font-size="12" opacity="0.75" text-anchor="start">4 x 36 = 144</text>
    <line x1="280" y1="318" x2="740" y2="318" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle">
      <text x="450" y="360">2</text><text x="580" y="360">5</text><text x="710" y="360" fill="#b45309">2</text>
    </g>
    <circle cx="710" cy="353" r="14" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="3 3" opacity="0.8"/>
    <text x="60" y="360" font-size="12" opacity="0.75" text-anchor="start">169 - 144 = 25; bring down the 2</text>
    <g font-size="22" font-weight="700" text-anchor="middle" fill="#b45309" opacity="0.85">
      <text x="450" y="404">2</text><text x="580" y="404">5</text><text x="710" y="404">2</text>
    </g>
    <text x="60" y="404" font-size="12" opacity="0.75" text-anchor="start">7 x 36 = 252</text>
    <line x1="280" y1="418" x2="740" y2="418" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" text-anchor="middle">
      <text x="710" y="446">0</text>
    </g>
    <text x="60" y="446" font-size="12" opacity="0.75" text-anchor="start">252 - 252 = 0: remainder</text>
    <text x="60" y="474" font-size="11.5" opacity="0.7" text-anchor="start">each loop: multiply, subtract, bring down</text>
    <text x="740" y="474" font-size="11.5" fill="#b45309" text-anchor="end">check: 247 x 36 + 0 = 8,892</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The tableau\'s last difference is the remainder, and the treaty closes the case: $247 \\times 36 + 0 = 8{,}892$. Multiply back — quotient times divisor — add the remainder, and the dividend must reappear. This is the strongest check in the chapter: unlike the fingerprint (which certifies consistency), the rebuild certifies the claim itself, because it *is* the definition of what the division asserted. Lesson 2.3\'s honesty paragraph promised that division would supply the certification its own checks could not — here it is, and the next lesson, which finally mixes all four operations in one expression, will lean on it.',
        },
        {
          kind: 'equation',
          latex: 'a \\;=\\; q \\times b + r, \\qquad 0 \\le r < b',
          note: 'The division algorithm — the treaty every division signs. $q$ (quotient) counts the complete groups of $b$ (divisor) inside $a$ (dividend); $r$ (remainder) is the unmatched leftover, fenced below $b$. When $r = 0$ we say $b$ **divides** $a$ — the phrase Chapter 3 is built on.',
        },
        {
          kind: 'formula',
          name: 'Division check (the division algorithm)',
          latex: 'a \\;=\\; q \\times b + r, \\qquad 0 \\le r < b',
          note: 'Dividend = quotient × divisor + remainder, the remainder strictly smaller than the divisor. Example: 4,589 = 764 × 6 + 5. Before dividing by b you already know r ≤ b − 1; after dividing, the check must hold exactly.',
        },
        { kind: 'heading', text: 'How large can the remainder be?' },
        {
          kind: 'para',
          text: 'Every algorithm in this chapter has grown a guard rail, and the guards form a family: addition\'s carry never exceeds 1 (a column sums two digits plus one carry); a partial product\'s carry never exceeds 8 (a column multiplies two digits plus a carry). Division\'s guard is the remainder bound — and it is also the reason the long-division loop must terminate: each loop\'s subtraction removes at least one full group, so the leftover keeps shrinking until it can afford no more.',
        },
        {
          kind: 'derivation',
          title: 'The remainder bound',
          statement:
            'In any division of $a$ by $b$ (with $b \\ge 1$), the remainder satisfies $0 \\le r < b$ — that is, $r \\le b - 1$.',
          steps: [
            {
              label: 'What the loop guarantees',
              formula: 'r \\;=\\; a - q \\times b \\;\\ge\\; 0',
              explanation:
                'The quotient counts complete subtractions: the loop stops exactly when the leftover can no longer afford a full group of $b$. So the remainder is never negative.',
            },
            {
              label: 'Why the leftover stays below the divisor',
              formula: 'r \\ge b \\;\\Rightarrow\\; a = (q + 1) \\times b + (r - b)',
              explanation:
                'If the remainder could afford one more full group, the loop was not finished — the quotient undercounted. Since $q$ counts *all* complete groups, $r < b$. In figure terms: a jump of size $b$ is still available whenever the landing point is $b$ or beyond.',
            },
          ],
          result:
            '0 ≤ r ≤ b − 1, always. Dividing by 6, the remainder tops out at 5 — attained by 29 ÷ 6 = 4 r 5; by 36, at 35. The family of bounds is complete: carry ≤ 1, partial-product carry ≤ 8, remainder < b — each algorithm\'s leftover fenced by what one more step could absorb.',
        },
        {
          kind: 'para',
          text: 'The bound pays a place-value dividend on the spot. Divide by 10 and the remainder is the ones digit: $4{,}589 \\div 10 = 458$ r $9$ (check: $458 \\times 10 + 9 = 4{,}589$). Divide by 100 and it is the last two digits: $4{,}589 \\div 100 = 45$ r $89$. The divisor\'s seat value absorbs everything except the trailing digits — which is why remainders on 10 and its powers are free, and why the bound $r < b$ is exactly the statement that the leftover fits in the seats the divisor could not reach.',
        },
        { kind: 'heading', text: 'How big can a quotient be?' },
        {
          kind: 'para',
          text: 'Lesson 2.3 predicted a product\'s digit count before computing it. Division can do the same, and the formula is the mirror image: multiplication pooled digits ($k + m - 1$ to $k + m$); division shaves them.',
        },
        {
          kind: 'derivation',
          title: 'The quotient size bound',
          statement:
            'A k-digit dividend divided by an m-digit divisor (dividend ≥ divisor) yields a quotient of at least k − m and at most k − m + 1 digits.',
          steps: [
            {
              label: 'Cap the dividend, floor the divisor',
              formula: 'b \\;\\ge\\; 10^{m-1}, \\qquad a \\;<\\; 10^{k}',
              explanation:
                'The same digit furniture as Lesson 2.3: an m-digit number never starts below $10^{m-1}$, a k-digit number never reaches $10^{k}$ (Lesson 1.2\'s digit-count rule).',
            },
            {
              label: 'The ceiling',
              formula: 'q \\;\\le\\; a/b \\;<\\; 10^{k} / 10^{m-1} \\;=\\; 10^{k-m+1}',
              explanation:
                'The quotient times the divisor never exceeds the dividend, so $q < 10^{k-m+1}$: at most $k - m + 1$ digits.',
            },
            {
              label: 'The floor',
              formula: 'q \\;>\\; a/b - 1 \\;>\\; 10^{k-1}/10^{m} - 1 \\;=\\; 10^{k-m-1} - 1',
              explanation:
                'A quotient overshoots the true ratio by less than 1 (the remainder bound at work: $q \\times b > a - b$). Since $b \\le 10^{m} - 1 < 10^{m}$, the ratio exceeds $10^{k-m-1}$; a whole number greater than $10^{k-m-1} - 1$ is at least $10^{k-m-1}$, which has $k - m$ digits.',
            },
          ],
          result:
            'k − m ≤ digits of q ≤ k − m + 1. Our worked quotient 247 (from 4-digit ÷ 2-digit) sits at the ceiling of the window [2, 3]. The floor is real too: 1,000 ÷ 9 = 111 r 1 shaves exactly k − m = 3 digits — and that r 1 is Lesson 2.1\'s 999 + 1 returning as a remainder. Predict the size, then divide; reject any option that promises the wrong magnitude.',
        },
        {
          kind: 'formula',
          name: 'Quotient size bound',
          latex: 'k - m \\;\\le\\; \\text{digits}(q) \\;\\le\\; k - m + 1',
          note: 'A k-digit ÷ m-digit quotient has k − m to k − m + 1 digits: 8,892 ÷ 36 → 247 (three digits, the ceiling of [2, 3]); 1,000 ÷ 9 → 111 r 1 (three digits, the floor of [3, 4]). Division subtracts digit counts where multiplication pooled them.',
        },
        { kind: 'heading', text: 'Checking division: the fingerprint, read backwards' },
        {
          kind: 'para',
          text: 'Lesson 2.1 fingerprinted sums; Lesson 2.3 products. Division\'s fingerprint reads the multiplication one backwards — with one new term, the remainder. For $4{,}589 \\div 6 = 764$ r $5$: the dividend\'s fingerprint is $S(4{,}589) = 26 \\to 8$; the rebuild side is $S(764) \\times S(6) + 5 = 8 \\times 6 + 5 = 53 \\to 8$. Match — probably right. The deep reason is the same mod-9 story as always: the fingerprint respects every true equation, and the division check is true. Note the new guard tooth: **forget the remainder and the check bites** — $8 \\times 6 = 48 \\to 3$, not 8. The $+\\,r$ term is not optional punctuation; dropped remainders are the classic long-division slip, and the fingerprint now catches them.',
        },
        {
          kind: 'formula',
          name: 'Digit-sum (mod 9) check for division',
          latex: 'S(a) \\;\\equiv\\; S(q) \\times S(b) + r \\pmod{9}',
          note: 'Rebuild the dividend\'s fingerprint from quotient, divisor and remainder. Example: 4,589 = 764 × 6 + 5: 8 × 6 + 5 = 53 → 8, and S(4,589) = 26 → 8. Transpositions still slip past (764 ↔ 746 both fingerprint 8), but dropped remainders no longer do.',
        },
        {
          kind: 'para',
          text: 'The blind spots, as always, deserve their honest sentence. The fingerprint alone cannot catch a transposed quotient — 746 fingerprints exactly like 764. The rebuild can ($746 \\times 6 + 5 = 4{,}481$, not $4{,}589$), which is why it comes first among the guards — but it certifies only the pair you feed it, and mid-tableau slips can still feed it wrong digits. So multiply the guards: the size bound first (reject wrong magnitudes), the rebuild second ($a = q \\times b + r$, exact), the fingerprint last (cheap, catches scattered slips). No single guard is a jailer; three together hang a net few pencil slips escape.',
        },
        { kind: 'heading', text: 'Speed techniques: halving, doubling and the quick screens' },
        {
          kind: 'para',
          text: 'Examination division rewards the same splitting habit as multiplication, run in reverse. **Divide by 5**: double, then divide by 10 — $340 \\div 5 = 680 \\div 10 = 68$, because $5 = 10 \\div 2$. **Divide by 4**: halve twice — $248 \\div 4 = 124 \\div 2 = 62$. **Divide by 8**: halve thrice — $496 \\div 8 = 248 \\div 2 = 124 \\div 2 = 62$ (the same 62 — no coincidence, since $496 = 2 \\times 248$). Each route is the associative law re-bracketing a division into friendlier pieces. And before any division, the digit-sum screens return: $8{,}892$ is even and its digit sum 27 is a multiple of 9, so $8{,}892 \\div 9 = 988$ exactly; $4{,}589$ is odd with digit sum 26 — divisible by neither 3 nor 9. Chapter 3 turns these screens into a systematic science: divisibility rules.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The obelus, and a two-thousand-year-old loop',
          text: 'The ÷ sign — the **obelus** — entered print in Johann Rahn\'s Teutsche Algebra (1659) and spread through European textbooks within a generation; the fraction bar and the slash are its working cousins. But the loop it abbreviates is far older: Euclid\'s Elements (c. 300 BCE, Book VII) builds greatest common divisors by exactly the divide-with-remainder step this lesson proved — compute $a = q \\cdot b + r$, replace $a$ with $b$ and $b$ with $r$, repeat until $r$ hits zero. That remainder-chasing loop is the oldest algorithm still in daily use; Chapter 3\'s divisibility work runs on it, and every computer\'s division circuit is long division in base two — Rahn\'s symbol marking a trail Euclid blazed.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Remainder questions are a bank/SSC staple: "find the remainder when 4,589 is divided by 10" is free marks via place value (the last n digits), and "which expression is undefined" options fall instantly to the ÷ 0 proof — any option with a zero divisor is the answer. The inverse check $a = q \\times b + r$ is an answer-eliminator: options whose quotient times divisor misses the dividend by more than the divisor\'s reach cannot be right. Quotient-size estimation ($k - m$ to $k - m + 1$ digits) rejects wrong magnitudes before any division happens. CUET/NTSE property questions now contrast all four operations: only + and × are closed, commutative and associative; − and ÷ each keep a one-sided identity only ($a - 0 = a$, $a \\div 1 = a$). And long-division items with a dropped remainder are caught by the fingerprint\'s new tooth: the $+\\,r$ term.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The sharing reading of 24 ÷ 4 asks "24 among 4 — how much each?" Which question is the grouping reading of the same 24 ÷ 4?',
              options: [
                'How much does each of 4 sharers get?',
                'How many groups of 4 fit into 24?',
                'What is 4 groups of 6?',
                'How many sheep are left over?',
              ],
              answer: 1,
              explain:
                'In the grouping reading the divisor sizes the bags: how many pens of 4 does 24 fill — six. Amusingly, both readings of 24 ÷ 4 return 6 (four sharers get 6 each; six groups of 4) — but they are different questions, and only problems like "how many groups?" signal the grouping reading. Option 3 changes the divisor to 6 (that is 24 ÷ 6\'s grouping reading); option 4 assumes a remainder, but 24 divides exactly here.',
            },
            {
              q: 'Which statement is exactly right?',
              options: [
                '7 ÷ 0 = 0, because nothing times nothing is nothing',
                '7 ÷ 0 = 7, because dividing by nothing leaves things alone',
                '7 ÷ 0 has no answer: every candidate q gives q × 0 = 0, never 7',
                '7 ÷ 0 = infinity — the answer is just very large',
              ],
              answer: 2,
              explain:
                'Division must name the q with q × 0 = 7, and the zero property (Lesson 2.3) makes q × 0 = 0 for every q: the answer set is empty — undefined. Options 1 and 2 fail the rebuild test (0 ≠ 7 either way). Option 4 smuggles in a number outside the whole numbers — and even that would not help, since infinity times zero is not defined either. Only 0 ÷ b (b ≠ 0) is legal; the hole sits in the divisor seat.',
            },
            {
              q: 'Dividing whole numbers by 8, the largest remainder you can ever get is:',
              options: ['8', '7', '9', 'It depends on the dividend'],
              answer: 1,
              explain:
                'The remainder bound says r ≤ b − 1 = 7: a remainder of 8 would afford one more complete group of 8, so the quotient undercounted. Attainment: 47 ÷ 8 = 5 r 7. Option 4 mistakes the remainder\'s value (which does vary with the dividend) for its ceiling (which never does) — every remainder is below the divisor by exactly the argument that the long-division loop is finished.',
            },
            {
              q: 'You divide 4,589 by 6 and believe the quotient is 764. The remainder must be:',
              options: ['1', '3', '5', '9'],
              answer: 2,
              explain:
                'The check equation forces it: 764 × 6 = 4,584, and 4,589 − 4,584 = 5 — which is below the divisor 6, as the bound demands. This is the inverse check in action: the remainder is not chosen, it is whatever the treaty leaves over. (And the fingerprint agrees: 8 × 6 + 5 = 53 → 8, matching S(4,589) = 26 → 8.)',
            },
            {
              q: 'Before computing 8,892 ÷ 36, the size bound promises a quotient of:',
              options: [
                'exactly 2 digits',
                '2 or 3 digits — and it will be 3 (247)',
                'exactly 4 digits',
                'unpredictable without dividing',
              ],
              answer: 1,
              explain:
                '4-digit ÷ 2-digit: between k − m = 2 and k − m + 1 = 3 digits; the actual quotient 247 takes the ceiling. Option 2\'s two values are both possible in general: 8,892 ÷ 6 lands on the higher window (1,482, four digits — a 1-digit divisor shaves only 3), while 1,000 ÷ 9 = 111 r 1 sits on a floor. Division subtracts digit counts exactly where multiplication pooled them.',
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
                  q: 'Run 24 ÷ 6 backwards on the number line: start at 24 and subtract 6 until you cannot. Count the jumps, name the quotient and remainder, and confirm with a multiplication.',
                  solution: [
                    'Jumps: $24 \\to 18 \\to 12 \\to 6 \\to 0$ — four of them, landing exactly on 0.',
                    'Quotient 4, remainder 0.',
                    'Confirm: $6 \\times 4 = 24$ — the flock rebuilt.',
                    'The grouping reading says the same thing in pens: four pens of six.',
                  ],
                },
                {
                  q: 'Divide 47 by 5: state the quotient and remainder, then certify with the check equation.',
                  solution: [
                    '$45 = 9 \\times 5$ fits with 2 left over: $47 \\div 5 = 9$ r $2$.',
                    'Check: $9 \\times 5 + 2 = 45 + 2 = 47$.',
                    'The remainder 2 sits below the divisor 5, as the bound demands ($r \\le 4$ here) — and below 4 it is, so the loop truly was finished.',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Run the full long division 4,589 ÷ 6, narrating every multiply–subtract–bring-down, then certify with the check equation and the mod-9 fingerprint.',
                  solution: [
                    '$45 \\div 6 = 7$ ($7 \\times 6 = 42$; $45 - 42 = 3$)',
                    'bring down 8 → $38 \\div 6 = 6$ ($6 \\times 6 = 36$; $38 - 36 = 2$)',
                    'bring down 9 → $29 \\div 6 = 4$ ($4 \\times 6 = 24$; $29 - 24 = 5$).',
                    'Quotient 764, remainder 5.',
                    'Check: $764 \\times 6 + 5 = 4{,}584 + 5 = 4{,}589$.',
                    'Fingerprint: $S(4{,}589) = 26 \\to 8$',
                    'rebuild $S(764) \\times S(6) + 5 = 8 \\times 6 + 5 = 53 \\to 8$.',
                    'Match — certified twice.',
                    '(The dividend is Lesson 2.2\'s minuend, revisited by a new operation.)',
                  ],
                },
                {
                  q: 'Divide 1,248 by 24 and verify by the fingerprint alone. Why is the remainder term absent?',
                  solution: [
                    '$124 \\div 24 = 5$ ($5 \\times 24 = 120$; $124 - 120 = 4$)',
                    'bring down 8 → $48 \\div 24 = 2$ ($2 \\times 24 = 48$; $48 - 48 = 0$).',
                    'Quotient 52, remainder 0.',
                    'Check: $52 \\times 24 = 1{,}248$.',
                    'Fingerprint: $S(1{,}248) = 15 \\to 6$',
                    'rebuild $S(52) \\times S(24) + 0 = 7 \\times 6 = 42 \\to 6$.',
                    'Match.',
                    'The $r$ term vanishes because $r = 0$: an exact division fingerprints exactly like a multiplication — Lesson 2.3\'s check run in reverse.',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) A stadium has 8,892 seats, arranged in equal rows of 36. (a) Before computing: how many digits will the row count have? (b) How many full rows, and does any seat go spare?',
                  solution: [
                    '(a) 4-digit ÷ 2-digit: between $k - m = 2$ and $k - m + 1 = 3$ digits.',
                    '(b) $8{,}892 \\div 36 = 247$ r $0$ (the worked example): 247 full rows and no spare seat — the check $247 \\times 36 = 8{,}892$ is exactly the seating plan.',
                    'Exam technique: the digit-bound answer (a) rejects any option of 1 or 4 digits before any division happens.',
                  ],
                },
                {
                  q: '(Exam-style, foundation level) Without any long division, find the remainder when 4,589 is divided by 10 — and by 100 — and explain the place-value secret both answers share.',
                  solution: [
                    '$4{,}589 \\div 10$: quotient 458, remainder 9 ($458 \\times 10 + 9 = 4{,}589$).',
                    '$\\div 100$: quotient 45, remainder 89 ($45 \\times 100 + 89 = 4{,}589$).',
                    'The remainder on dividing by $10^{n}$ is exactly the last $n$ digits: place value hands it over for free, because quotient × $10^{n}$ rebuilds everything except the trailing digits.',
                    'The remainder bound shows why the leftover must be smaller than 10 (or 100): anything larger would afford another full ten (or hundred).',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the remainder bound: in any division of a by b (b ≥ 1), the remainder r satisfies 0 ≤ r < b. Then prove uniqueness: if a = q·b + r = q′·b + r′ with both remainders in range, then q = q′ and r = r′. Illustrate with 29 ÷ 6 by exhibiting the illegal pair (3, 11) and the legal one.',
                  solution: [
                    'Bound: $r = a - q \\times b \\ge 0$, because $q$ counts complete subtractions and the loop stops when nothing more fits.',
                    'If $r \\ge b$,',
                    'then $r - b \\ge 0$ and $a = (q + 1) \\times b + (r - b)$: one more complete group fits, contradicting that $q$ counted them all.',
                    'Hence $r \\le b - 1$.',
                    'Attainment: $29 \\div 6 = 4$ r $5$ attains $r = 5 = 6 - 1$.',
                    'Uniqueness: $q \\times b + r = q\' \\times b + r\'$ rearranges to $(q - q\') \\times b = r\' - r$',
                    'the left side is a multiple of $b$, the right side satisfies $|r\' - r| < b$, so both must be 0: $r\' = r$ and $q = q\'$.',
                    'For $29 \\div 6$: $q = 3$ forces $r = 29 - 18 = 11 \\ge 6$ — illegal, exactly one more six hiding inside it',
                    '$q = 4$ gives $r = 5$ — legal, and uniqueness says no other pair works.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The closed door. (a) Prove that a ÷ 0 is undefined for every a ≠ 0. (b) Show that 0 ÷ 0 is not saved either — and diagnose precisely how its failure differs. (c) The check equation a = q·b + r guarded every division in this lesson. Substitute b = 0 and explain why the guardian goes silent exactly when the divisor vanishes.',
                  solution: [
                    '(a) Division must name a $q$ with $q \\times 0 = a$.',
                    'The zero property (Lesson 2.3) says $q \\times 0 = 0$ for every $q$',
                    'since $a \\ne 0$, no candidate survives — the answer set is empty.',
                    '(b) For $0 \\div 0$, every $q$ passes: $3 \\times 0 = 0$ and $17 \\times 0 = 0$ alike.',
                    'The failure inverts — not an empty answer set but a universal one: indeterminate, no unique answer.',
                    'Both verdicts deny an answer; one because nothing works, one because everything does.',
                    '(c) With $b = 0$ the check reads $a = q \\times 0 + r = 0 + r$, i.e.',
                    '$a = r$: the equation constrains only the remainder and says nothing about $q$.',
                    'All the bookkeeping power of $a = q \\times b + r$ lived in the $b$ — division by zero removes it.',
                    'The whole numbers stay closed under + and × (NCERT\'s note)',
                    '− and ÷ each punch holes, and ÷\'s hole sits precisely in the divisor seat.',
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'Four operations, four retrials, one system. Addition and multiplication close the whole numbers and commute; subtraction and division do neither — each keeps a one-sided identity and each punches a hole (negativity beyond this book\'s horizon, undefinedness beside it). Yet the four are one family: subtraction undoes addition, division undoes multiplication, and the distributive law binds the pair of builders. What happens when all four appear in a single expression — $8 + 2 \\times 5$, say, whose value depends on who moves first? Chapter 2\'s final lesson settles the treaty of precedence: the order of operations, where this chapter\'s four laws meet their referee. And with the remainder in hand, Chapter 3\'s divisibility questions — which numbers divide which, and how to tell at a glance — stand one bound away.',
        },
      ],
    },
    {
      id: 'fm-order-of-operations',
      number: '2.5',
      title: 'Order of Operations and the Language of Expressions',
      concepts: [
        'Order of operations',
        'Precedence',
        'BODMAS',
        'Brackets: bar, parentheses, braces, square brackets',
        'The "of" operator',
        'Left-to-right for equal precedence',
        'Expression vs equation',
        'Estimation gate',
      ],
      objectives: [
        'Read any string of numbers and operations as one expression with a single value — and distinguish expressions from equations',
        'State the order-of-operations treaty: brackets first (bar, then ( ), { }, [ ]), then "of", then × and ÷ left to right, then + and − left to right',
        'Justify why × outranks + by the compression argument, and say precisely which clauses of the treaty are forced and which are agreed',
        'Simplify fully nested exam expressions with the bracket ladder, dodging the two great BODMAS traps',
        'Gate every simplification with a rounding estimate before trusting it',
      ],
      prerequisites: [
        'fm-rounding-and-estimating',
        'fm-addition-carrying',
        'fm-subtraction-borrowing',
        'fm-multiplication-repeated-addition',
        'fm-division-remainders-zero',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Every ledger, every bill, every examination paper keeps its arithmetic in single lines — and a line of arithmetic is a small treaty waiting to be signed. Picture two clerks in the same shop, the same day, reading the same line: $8 + 2 \\times 5$. The first works strictly left to right: $8 + 2 = 12$, then $12 \\times 5 = 50$, and records fifty. The second sees the line differently — *eight, plus two fives* — and records $8 + 10 = 18$. Two careful professionals, one line, two answers, a gap of 32 between them. The trouble is not carelessness: both clerks computed flawlessly. The line itself was ambiguous, and arithmetic — like every precise language — needs a signed agreement about who moves first.',
        },
        {
          kind: 'para',
          text: 'The string $8 + 2 \\times 5$ is our first proper **expression**: a recipe of numbers, operations and brackets that names one number. Every computation in Chapters 1 and 2 was an expression evaluated in secret — but never a dangerous one, because each line carried a single operation, or a chain of one kind. The moment two different ranks share a line, the recipe needs an unambiguous reading order, and that reading order is the **order of operations**. This lesson signs the treaty — brackets first, then multiplication and division, then addition and subtraction — and then asks the question a rule-book usually skips: *why this order and not another?* The answer, it turns out, is Lesson 2.3\'s compression wearing a judge\'s robe.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Expression',
              def: 'A recipe of numbers, operations and brackets that names a single number. $8 + 2 \\times 5$ is an expression; carried out in the agreed order, it names 18.',
            },
            {
              term: 'Value (of an expression)',
              def: 'The number the recipe names — the result of performing the operations in the agreed order. The value of $8 + 2 \\times 5$ is 18, not 50.',
            },
            {
              term: 'Equation',
              def: 'A sentence claiming that two expressions have equal value, written with $=$. An equation can be true ($4 + 3 \\times 2 = 10$) or false ($8 + 2 \\times 5 = 50$); an expression alone cannot be true or false — it merely names a number.',
            },
            {
              term: 'Precedence',
              def: 'The agreed ranking that decides which operation acts first when two share an expression and no bracket separates them. Multiplication outranks addition; within one rank, reading direction (left to right) decides.',
            },
            {
              term: 'Bracket (grouping symbol)',
              def: 'A written device that overrides precedence by grouping: the bar (vinculum), parentheses $( )$, braces $\\{\\ \\}$ and square brackets $[\\ ]$. Always worked innermost first.',
            },
            {
              term: 'Vinculum (the bar)',
              def: 'The oldest grouping symbol: a horizontal bar drawn over the expression it binds, as in $\\overline{3 + 4}$. Exam convention removes it before all other brackets.',
            },
            {
              term: 'BODMAS',
              def: 'The examination mnemonic for the treaty: Brackets, Of, Division, Multiplication, Addition, Subtraction — read as ranks, never as a strict letter-by-letter queue.',
            },
          ],
        },
        { kind: 'heading', text: 'Two readings of one line' },
        {
          kind: 'para',
          text: 'Dissect the clerks\' dispute. Reading left to right treats the line as the sentence *"(eight plus two), taken five times"*: the addition happens first and the multiplication sweeps up its result — $(8 + 2) \\times 5 = 50$. Reading by compression treats it as *"eight, plus two fives"*: the product $2 \\times 5$ is one tight packet — five additions compressed by Lesson 2.3 — and the eight stands outside it: $8 + (2 \\times 5) = 18$. Both readings are grammatical; they are different sentences. Without a convention the line names no number at all — and an expression\'s value must be unique, because that is the entire point of naming one.',
        },
        {
          kind: 'equation',
          latex: '8 + 2 \\times 5 \\;=\\; 8 + (2 \\times 5) \\;=\\; 18 \\qquad\\text{but}\\qquad (8 + 2) \\times 5 \\;=\\; 50',
          note: 'The same seven symbols, two values: the left evaluation is the treaty\'s, the right one belongs to a different sentence. Precedence is what forces the left tree when the brackets stay silent.',
        },
        {
          kind: 'figure',
          caption:
            'One line, two trees. Left: without brackets the treaty groups 2 × 5 first, so the multiplication sits one level down and the tree evaluates to 18. Right: the brackets of (8 + 2) × 5 rebuild the tree — the addition moves under the multiplication and the value jumps to 50. Precedence is exactly the rule that chooses the tree when the brackets are silent; brackets are the writer\'s way of choosing it anyway.',
          svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two expression trees for 8 + 2 x 5: the treaty grouping evaluates to 18, the bracketed grouping to 50">
  <g font-size="13" fill="currentColor">
    <text x="195" y="30" text-anchor="middle" opacity="0.75">8 + 2 × 5 — treaty reading</text>
    <line x1="195" y1="90" x2="115" y2="134" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="195" y1="90" x2="275" y2="134" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="275" y1="166" x2="225" y2="210" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="275" y1="166" x2="325" y2="210" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <g text-anchor="middle">
      <rect x="169" y="58" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="195" y="79">+</text>
      <rect x="89" y="134" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="115" y="155">8</text>
      <rect x="249" y="134" width="52" height="32" rx="7" fill="none" stroke="#b45309" stroke-width="2"/>
      <text x="275" y="155" fill="#b45309" font-weight="700">×</text>
      <rect x="199" y="210" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="225" y="231">2</text>
      <rect x="299" y="210" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="325" y="231">5</text>
    </g>
    <text x="195" y="282" text-anchor="middle" font-weight="700" fill="#b45309">value 18</text>
    <text x="565" y="30" text-anchor="middle" opacity="0.75">(8 + 2) × 5 — brackets rebuild the tree</text>
    <line x1="565" y1="90" x2="485" y2="134" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="565" y1="90" x2="665" y2="134" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="485" y1="166" x2="435" y2="210" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <line x1="485" y1="166" x2="555" y2="210" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <g text-anchor="middle">
      <rect x="539" y="58" width="52" height="32" rx="7" fill="none" stroke="#b45309" stroke-width="2"/>
      <text x="565" y="79" fill="#b45309" font-weight="700">×</text>
      <rect x="459" y="134" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="485" y="155">+</text>
      <rect x="639" y="134" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="665" y="155">5</text>
      <rect x="409" y="210" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="435" y="231">8</text>
      <rect x="529" y="210" width="52" height="32" rx="7" fill="none" stroke="currentColor" opacity="0.7"/>
      <text x="555" y="231">2</text>
    </g>
    <text x="565" y="282" text-anchor="middle" font-weight="700" fill="#b45309">value 50</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The figure makes the disagreement physical: brackets build expression trees, and different trees are different recipes even when the digits match. The treaty exists so that when the brackets stay silent, the tree is still forced. One agreement, learned once, works for every line ever written — which is precisely what a shop, a bank and an examination board each require of arithmetic.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The order of operations (the treaty)',
          text: 'When an expression mixes operations and the brackets do not say otherwise, evaluate in this order: **(1)** brackets, innermost first — the bar, then $( )$, then $\\{\\ \\}$, then $[\\ ]$; **(2)** the word **of** (examination convention: multiplication with first claim); **(3)** $\\times$ and $\\div$ — one shared rank, acted left to right exactly as written; **(4)** $+$ and $-$ — one shared rank, acted left to right. Brackets always override the ranks; the ranks always override reading direction.',
        },
        {
          kind: 'equation',
          latex: '\\text{bar} \\;\\to\\; (\\ \\ ) \\;\\to\\; \\{\\ \\ \\} \\;\\to\\; [\\ \\ ] \\;\\to\\; \\text{of} \\;\\to\\; \\times,\\ \\div\\ (\\text{left} \\to \\text{right}) \\;\\to\\; +,\\ -\\ (\\text{left} \\to \\text{right})',
          note: 'The full treaty as a ladder: top rungs first; within the two shared rungs, left to right as the line was written. Every examination in this book\'s orbit marks simplifications against this ladder.',
        },
        { kind: 'heading', text: 'Why multiplication binds tighter: the compression argument' },
        {
          kind: 'derivation',
          title: 'Why × precedes +',
          statement:
            'Claim: in a bracket-free mixture of addition and multiplication, the multiplication must act first — not by taste, but because the notation itself is compressed language.',
          steps: [
            {
              label: 'Unpack the product',
              formula: '2 \\times 5 = 2 + 2 + 2 + 2 + 2',
              explanation:
                'Lesson 2.3 built multiplication as compressed addition: the product $2 \\times 5$ is not a new quantity but five twos written short. So $8 + 2 \\times 5$ literally reads "eight, plus five twos" — and in that sentence the fives are counted before the eight ever meets them.',
            },
            {
              label: 'Evaluate the sentence as written',
              formula: '8 + (2 \\times 5) = 8 + 10 = 18',
              explanation:
                'The treaty computes the packet first and lands on 18 — the value of the sentence the writer actually wrote. No other step order evaluates this sentence; every other order evaluates a different one.',
            },
            {
              label: 'Audit the rival reading against its own sentence',
              formula: '(8 + 2) \\times 5 = 50',
              explanation:
                'Add-first is the sentence "(eight plus two), taken five times" — a different collection entirely: ten objects five times over, not eight objects plus five twos. The notation must distinguish two different sentences without the writer\'s help, and precedence is exactly how it does — silently, with no brackets needed.',
            },
            {
              label: 'Generalise: tighter compression binds tighter',
              explanation:
                'The pattern is a hierarchy of compression: multiplication compresses addition, and powers (Chapter 5\'s territory) compress multiplication. The more a notation compresses, the tighter it binds — which is why the treaty\'s ranks feel natural rather than arbitrary.',
            },
          ],
          result:
            'Multiplication precedes addition because a product is already an addition in disguise: reading $8 + 2 \\times 5$ left to right silently rewrites the writer\'s sentence. The treaty is the notation defending its own compression.',
        },
        {
          kind: 'para',
          text: 'Division and subtraction inherit their places as twins. Lesson 2.4 built division as the un-building of multiplication — every division carries its check equation $a = q \\times b + r$ — so a division wants the same rank as the multiplication it undoes. Lesson 2.2 built subtraction as the un-building of addition, so it sits beside addition. Hence two ranks of two: $\\times$ with $\\div$, and $+$ with $-$. But honesty demands the split made below: some of this treaty is discovered, and some of it is signed.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Natural clauses and agreed clauses',
          text: '**Forced by the notation (natural):** brackets override everything; $\\times$ before $+$; tighter compression binds tighter. These follow from what the symbols *mean*. **Signed by usage (agreed):** equal rank inside each twin-pair, resolved left to right; the special rank for the word "of". Nothing in the meaning of $8 \\div 4 \\times 2$ forces either grouping — both readings are grammatical — so the community chose left to right, the direction we read. A 1917 debate in the American Mathematical Monthly (Lennes) shows the ÷-versus-× question was still formally argued a century ago, and the notation historian Cajori found it unsettled into the 1920s. Agreement is not weakness — it is what a convention is. But it is why careful writers, and every examination board, add brackets whenever the ranks alone might not carry the meaning.',
        },
        { kind: 'heading', text: 'The bracket ladder' },
        {
          kind: 'para',
          text: 'Brackets are the treaty\'s escape hatch: they let the writer override precedence outright. Examination convention recognises four kinds, removed in a fixed order — the **bar** (vinculum) first, then parentheses $( )$, then braces $\\{\\ \\}$, then square brackets $[\\ ]$ — though all four mean the same thing: *this packet first*. The different shapes are not different powers; they are visibility, so the eye can match an opening to its closing across a long line. Work from the inside out. The bar shows its strength on a line like $\\overline{3 + 4} \\times 2$: the bar drags the low-rank addition into first place and the value is $7 \\times 2 = 14$, whereas the unbarred line $3 + 4 \\times 2$ evaluates by treaty to $3 + 8 = 11$. One small stroke, three of difference.',
        },
        {
          kind: 'algorithm',
          title: 'Evaluating any expression (the full BODMAS procedure)',
          lines: [
            { code: 'Scan for the innermost bracket — bar first, then ( ), { }, [ ] — and evaluate everything inside it to a single number.', note: 'If that packet itself mixes operations, apply this same procedure to it: the treaty is recursive.' },
            { code: 'Repeat until no brackets remain, always working outward.' },
            { code: 'Scan the bracket-free line for the word OF; compute every "a of b" as a multiplication, before any ÷ or ×.', note: 'Examination convention gives "of" first claim: 18 ÷ 3 of 2 = 18 ÷ (3 × 2) = 3, not 12.' },
            { code: 'Scan left to right; each time a × or ÷ is met, compute it and replace the triple (number, sign, number) with its value.', note: 'One shared rank — the scan direction decides, never the alphabet.' },
            { code: 'Scan left to right again; each time a + or − is met, compute it and replace.' },
            { code: 'One number remains: that number is the value of the expression.', note: 'Why it terminates: each act erases one operation, and a written line holds only finitely many.' },
          ],
          note:
            'Two sweeps over the line, plus bracket-peeling — that is the whole machine. Steps 4 and 5 are why the mnemonic must be read as ranks: ÷ and × are swept together, as are + and −. The letter order of BODMAS is a memory hook for the four rungs, not a queue of six commands.',
        },
        {
          kind: 'example',
          title: 'Worked example: one line, every rung of the ladder',
          steps: [
            'Simplify $120 - \\left[\\, 2 \\times (14 - 2 \\times 5) + \\left\\{ 18 \\div 3 \\text{ of } 2 \\right\\} \\,\\right]$.',
            'Innermost parentheses: $(14 - 2 \\times 5)$ — multiplication first inside: $14 - 10 = 4$.',
            'Braces: $18 \\div 3$ of $2$ — "of" claims first: $3$ of $2 = 6$; then $18 \\div 6 = 3$.',
            'Square brackets: $2 \\times 4 + 3$ — multiplication first: $8 + 3 = 11$.',
            'Bracket-free remainder: $120 - 11 = 109$. The value is 109.',
            'Audit the near-miss: had the ÷ been done before the "of", the braces would hold $(18 \\div 3)$ of $2 = 12$, and the whole line would land on $120 - 20 = 100$ — a nine-mark error from one rank slip. This is the exact slip examination options are built to catch.',
          ],
        },
        {
          kind: 'para',
          text: '**Of** deserves its own paragraph, because the mnemonic reserves a letter for it and international readers deserve a translation. In "3 of 2", the word *of* means multiply — the phrase is English for $3 \\times 2$ ("half of" and "two-thirds of" belong to Chapter 4\'s fractions, but the grammar is the same). Indian examination convention, and the reference texts that feed it, promotes "of" to its own rung above $\\div$ and $\\times$, so $18 \\div 3$ of $2$ evaluates as $18 \\div (3 \\times 2) = 3$ rather than $(18 \\div 3) \\times 2 = 12$. Treatments that drop the special rung and read "of" as ordinary multiplication, scanned left to right, would return 12. The honest summary: *examination convention ranks "of" above the ÷/× rank; some modern books make it a plain multiplication.* Either way the cure is identical — write the brackets — and when a paper says "of" without them, it means the ranked reading.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The mnemonic\'s two traps',
          text: 'The letters of BODMAS are rank labels, not a queue. **Trap 1 — "D before M"?** No: $8 \\div 4 \\times 2$ is $2 \\times 2 = 4$ by the left-to-right sweep, not $8 \\div 8 = 1$. **Trap 2 — "A before S"?** No: $25 - 8 + 7$ is $17 + 7 = 24$ by the sweep, not $25 - 15 = 10$. In both cases the wrong value comes from obeying the alphabet instead of the treaty. The mnemonic survives because its rungs are real; it misleads exactly where two letters share a rank — which is why this lesson states the treaty as ranks with a reading direction, and keeps the word only as a handle.',
        },
        {
          kind: 'table',
          caption: 'One line, four wrong roads — each "misreading value" comes from a real, computable mistake',
          head: ['Expression', 'Treaty value', 'The misreading', 'Its value'],
          rows: [
            ['$8 + 2 \\times 5$', '18', 'add first: $(8 + 2) \\times 5$', '50'],
            ['$8 \\div 4 \\times 2$', '4', 'multiply before divide: $8 \\div (4 \\times 2)$', '1'],
            ['$25 - 8 + 7$', '24', 'subtract last: $25 - (8 + 7)$', '10'],
            ['$18 \\div 3$ of $2$', '3', 'divide first: $(18 \\div 3)$ of $2$', '12'],
          ],
        },
        { kind: 'heading', text: 'Expressions and equations' },
        {
          kind: 'para',
          text: 'One vocabulary distinction, made once and kept forever. An **expression** — $8 + 2 \\times 5$, the whole ladder $120 - [\\,\\cdots\\,]$, even a bare $7$ — is a recipe that names a number: it has a **value** and cannot be true or false. An **equation** is a sentence with $=$ that *claims* two expressions share a value: $4 + 3 \\times 2 = 10$ is a true equation; $8 + 2 \\times 5 = 50$ is a false one; both are claims, not values. This chapter has been writing and checking equations all along — every inverse check, every fingerprint match, every "check equation" of Lessons 2.1–2.4 is an equation that was verified rather than assumed. The distinction becomes load-bearing the moment a letter arrives for an unknown: solving an equation is not evaluating an expression, and the door to that subject (Chapter 11 here, then Elementary Algebra) opens on exactly this line.',
        },
        { kind: 'heading', text: 'The estimation gate' },
        {
          kind: 'para',
          text: 'Lesson 1.3\'s rounding now takes the referee\'s own chair — the check that runs before the treaty does. The habit is two moves: **estimate first**, by rounding every operand to one comfortable digit and evaluating the rounded line under the same treaty; **compute exactly**, then compare magnitudes. A match certifies the shape of the work; a mismatch exposes a rank slip before it reaches the answer box — rank errors usually change a value by whole factors, not small remainders, which is precisely what a magnitude comparison sees.',
        },
        {
          kind: 'example',
          title: 'The estimation gate in action',
          steps: [
            'Line to evaluate: $7{,}218 \\div 9 + 98 \\times 63$.',
            'Estimate by rounding: $7{,}200 \\div 9 + 100 \\times 60 = 800 + 6{,}000 = 6{,}800$ — a magnitude, nothing more.',
            'Compute exactly, by treaty: $7{,}218 \\div 9 = 802$ (check: $9 \\times 802 = 7{,}218$) and $98 \\times 63 = 5{,}880 + 294 = 6{,}174$; so the value is $802 + 6{,}174 = 6{,}976$.',
            'Compare: $6{,}976$ against the estimate $6{,}800$ — a gap of 176, comfortably the same magnitude. The shape of the computation is certified.',
            'Certify deeper with the fingerprint: $S(6{,}976) = 28 \\to 1$, while the expression\'s own fingerprint gives $S(802) + S(98) \\times S(63) \\to 1 + 1 \\times 0 = 1$. Match — the checksum respects precedence because the fingerprint of a sum is the sum of fingerprints and the fingerprint of a product is the product of fingerprints (Lessons 2.1 and 2.3). The value 6,976 stands double-checked.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A treaty with a history',
          text: 'The treaty is younger than it feels. Multiplication-before-addition is as old as modern algebraic notation itself — the symbols forced it, as the compression argument shows — but the equal-rank and left-to-right clauses were argued in print well into the twentieth century: the American Mathematical Monthly carried a formal dispute about expressions like $a \\div b \\times c$ in 1917 (Lennes), and Cajori\'s classic history of mathematical notations found the ÷-versus-× question unsettled in the 1920s. The mnemonics arrived with the mass textbook industry: PEMDAS ("Please Excuse My Dear Aunt Sally") in America, BIDMAS and BEDMAS in other English traditions, BODMAS in the Indian examination world — different letters, one treaty, with BODMAS alone reserving a rank for "of". And the arguments never quite end: internet disputes over lines like $6 \\div 2(1 + 2)$ flare up every few years, always at the same edge — implicit multiplication meeting explicit division. The moral is the bracket ladder\'s: when a line\'s grouping could matter, the careful writer brackets it.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Simplification items are the bread of bank, SSC and railway papers: one fully nested bracket line, one mark, forty seconds — marked exactly against the ladder above. The "of" trap and the D/M trap are the two harvest fields: the wrong options are computed by obeying the alphabet, so knowing the treaty converts a guess into a rejection. Insert-the-brackets puzzles (make $8 + 4 \\div 4 + 4 \\times 2$ as large as possible) run the ladder in reverse; "which equation is true?" items test the expression/equation vocabulary; and the estimation gate kills two or three options before any exact work — no option that fails a rounding check survives a careful mark-scheme. Every long simplification in Chapter 3\'s HCF/LCM work and Chapter 5\'s powers will run on this referee.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'What is the treaty value of 8 + 2 × 5?',
              options: ['50', '18', '40', '10'],
              answer: 1,
              explain:
                'Multiplication first: 2 × 5 = 10, then 8 + 10 = 18. Option 50 is the value of a different sentence — (8 + 2) × 5, the add-first reading. Option 40 is the wrong-pair product: 8 × 5 = 40 (the 2 never multiplied anything). Option 10 is the product alone — the 8 went missing.',
            },
            {
              q: 'Evaluate 20 − 6 ÷ 2 × 3.',
              options: ['11', '2', '21', '9'],
              answer: 0,
              explain:
                '÷ and × share a rank, swept left to right: 6 ÷ 2 = 3, then 3 × 3 = 9, then 20 − 9 = 11. Option 2 obeyed the alphabet (M before D): 6 × 3 = 18, then 20 − 18 = 2. Option 21 swept the subtraction into the left-to-right run too: (20 − 6) ÷ 2 × 3 = 21. Option 9 finished the ÷/× chain and forgot the subtraction entirely.',
            },
            {
              q: 'In examination convention, what is 18 ÷ 3 of 2?',
              options: ['3', '12', '6', '36'],
              answer: 0,
              explain:
                '"Of" claims before the division: 3 of 2 = 6, then 18 ÷ 6 = 3. Option 12 is the ÷-first reading, (18 ÷ 3) of 2 — the harvest trap this lesson\'s worked example nearly fell into. Option 6 is the bare quotient, ignoring the "of"; option 36 is 18 × 2, ignoring the ÷ and the 3 alike.',
            },
            {
              q: 'Which of these is an equation?',
              options: ['4 + 3 × 2', '4 + 3 × 2 = 10', '4 + 3 × 2 + 1', 'the value of 4 + 3 × 2'],
              answer: 1,
              explain:
                'An equation is a sentence with = that claims two expressions share a value — and this one is true, since 4 + 6 = 10. Options 1 and 3 are expressions: recipes with values, incapable of being true or false. Option 4 is a phrase, not even an expression as written.',
            },
            {
              q: 'Before computing 7,218 ÷ 9 + 98 × 63 exactly, the estimation gate says the value is closest to:',
              options: ['680', '6,800', '68,000', 'It cannot be estimated without exact division'],
              answer: 1,
              explain:
                'Round and rank: 7,218 ÷ 9 ≈ 7,200 ÷ 9 = 800, and 98 × 63 ≈ 100 × 60 = 6,000; total ≈ 6,800. The exact value is 802 + 6,174 = 6,976 — same magnitude, gap 176. Options 1 and 3 are magnitude errors by factors of ten; option 4 forgets Lesson 1.3 — rounding exists precisely so you can check a computation\'s shape before (and after) you do it.',
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
                  q: 'Evaluate $4 + 3 \\times 2$ and $(4 + 3) \\times 2$. Same digits, same operations — explain in one sentence why the values differ.',
                  solution: [
                    'Treaty reading: $4 + 3 \\times 2 = 4 + (3 \\times 2) = 4 + 6 = 10$ — four, plus three twos.',
                    'Bracketed reading: $(4 + 3) \\times 2 = 7 \\times 2 = 14$ — a seven, taken twice.',
                    'One pair of brackets moved the addition under the multiplication\'s grip: the expression tree changed, so the recipe names a different number.',
                    'Brackets are the writer\'s override; precedence is only the default.',
                  ],
                },
                {
                  q: 'Evaluate $5 \\times 6 - 8$. Then evaluate $10 - 2 \\times 3$ and $(10 - 2) \\times 3$, naming the sentence each reading hears.',
                  solution: [
                    '$5 \\times 6 - 8$: multiplication first, $30 - 8 = 22$.',
                    'Next, $10 - 2 \\times 3 = 10 - 6 = 4$ — the sentence "ten, minus two threes".',
                    'And $(10 - 2) \\times 3 = 8 \\times 3 = 24$ — the sentence "(ten minus two), taken three times".',
                    'The second pair differs by two brackets alone',
                    '4 and 24 are different numbers because they are values of different sentences.',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Evaluate $36 \\div 4 \\times 3$ two ways — the treaty way and the alphabet way. Which value does the treaty certify, and what exactly is the trap?',
                  solution: [
                    'Treaty (÷ and × one rank, left to right): $36 \\div 4 = 9$,',
                    'then $9 \\times 3 = 27$.',
                    'Alphabet way (M before D): $4 \\times 3 = 12$,',
                    'then $36 \\div 12 = 3$.',
                    'The treaty certifies 27.',
                    'The trap is reading BODMAS as a queue of six letters instead of four ranks: D and M are rank-mates, and inside the rank the reading direction decides — the very clause Lennes debated in 1917.',
                  ],
                },
                {
                  q: 'Evaluate $25 - 8 + 7$ two ways. Which is correct, and which misreading produced the other?',
                  solution: [
                    'Treaty (+ and − one rank, left to right): $25 - 8 = 17$,',
                    'then $17 + 7 = 24$.',
                    'The misreading (A before S): $8 + 7 = 15$,',
                    'then $25 - 15 = 10$ — which is the value of the different sentence $25 - (8 + 7)$.',
                    'Correct: 24.',
                    'Subtraction is non-associative (Lesson 2.2), which is exactly why the rank\'s left-to-right clause matters: the brackets the misreading silently inserts are not free.',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) Simplify $90 + \\left[\\, \\left\\{ (16 - 7) \\times 2 \\right\\} \\div 6 \\text{ of } 3 \\,\\right]$, narrating every rung of the bracket ladder and every rank decision.',
                  solution: [
                    'Parentheses: $(16 - 7) = 9$.',
                    'Braces: $9 \\times 2 = 18$.',
                    'Inside the square brackets, "of" claims before ÷: $6$ of $3 = 18$',
                    'then $18 \\div 18 = 1$.',
                    'Bracket-free remainder: $90 + 1 = 91$.',
                    'The value is 91.',
                    'Rank audit: one ladder (three rungs, inside out), one "of" before the division, no ÷/× tie to sweep — a line built to exercise the ladder, and the estimation gate agrees with the magnitude (ninety-odd, plus one).',
                  ],
                },
                {
                  q: '(Exam-style) The line $8 + 4 \\div 4 + 4 \\times 2$ has value 17 as written. Insert exactly one pair of brackets to make the value as large as possible, and prove your placement wins among all bracketings that keep every division exact.',
                  solution: [
                    'As written: $8 + 1 + 8 = 17$.',
                    'The winning placement wraps the whole additive chain: $(8 + 4 \\div 4 + 4) \\times 2 = 13 \\times 2 = 26$.',
                    'Enumeration of the whole-number candidates: $(8 + 4) \\div 4 + 4 \\times 2 = 3 + 8 = 11$',
                    '$8 + (4 \\div 4 + 4) \\times 2 = 8 + 10 = 18$',
                    '$(8 + 4 \\div 4 + 4) \\times 2 = 26$',
                    '$(8 + 4) \\div (4 + 4) \\times 2 = 12 \\div 8 \\times 2 = 3$',
                    'and any bracketing that strands $4 \\div (4 + \\cdots)$ leaves the division inexact — outside this book\'s whole numbers.',
                    'Why the whole chain wins is the distributive law (Lesson 2.3): multiplying the chain multiplies every term, $13 \\times 2 = 8 \\times 2 + 1 \\times 2 + 4 \\times 2$ — the bracket harvests the largest possible sub-chain under the ×2.',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'The line 6 ÷ 2(1 + 2) is an internet-famous argument. (a) Give the value the treaty certifies for the explicit form 6 ÷ 2 × (1 + 2). (b) Give the value of the rival reading 6 ÷ (2 × (1 + 2)). (c) Explain why the debate exists at all, and what a careful writer does.',
                  solution: [
                    '(a) Left to right in the ÷/× rank: $6 \\div 2 = 3$,',
                    'then $3 \\times 3 = 9$.',
                    '(b) Grouping-first: $2 \\times 3 = 6$,',
                    'then $6 \\div 6 = 1$.',
                    'The values differ — both readings are grammatical, so the original line, with its silent juxtaposition $2(1 + 2)$, is genuinely ambiguous.',
                    '(c) The debate lives exactly on the treaty\'s agreed edge: implicit multiplication by juxtaposition was never fully pinned down — notation historians record the ÷-versus-× question still argued in the 1920s — so the juxtaposition invites the grouping-first reading.',
                    'The cure is the writer\'s tool: brackets.',
                    'Examinations never set the ambiguous form',
                    'they write $6 \\div 2 \\times (1 + 2)$ or $6 \\div \\left(2 \\times (1 + 2)\\right)$ explicitly.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The treaty-maker\'s problem. (a) Prove that an expression built from + alone has the same value under every bracketing. (b) Prove the same for × alone. (c) Exhibit a mixed expression whose two bracketings differ, and conclude that a precedence convention is unavoidable. (d) Which clauses of the treaty are forced by the notation, and which are pure agreement?',
                  solution: [
                    '(a) Associativity of addition (Lesson 2.1): $(a + b) + c = a + (b + c)$ for all whole numbers — instance $(8 + 2) + 5 = 8 + (2 + 5) = 15$, and exhaustive checking of every $a, b, c$ from 0 to 9 confirms it everywhere',
                    'longer chains follow by re-parenthesising one adjacent pair at a time, each step licensed by the law.',
                    '(b) Associativity of multiplication (Lesson 2.3): $(2 \\times 3) \\times 4 = 2 \\times (3 \\times 4) = 24$ — same instance-plus-exhaustive proof.',
                    '(c) Mixed: $2 + 3 \\times 4 = 14$ under the treaty, but $(2 + 3) \\times 4 = 20$ bracketed the other way — the values differ, so when two ranks share a line, *something* must choose the tree.',
                    'That something is the convention; without it, the line names two numbers and therefore names none.',
                    '(d) Forced by meaning: brackets override everything; × before + (compression); tighter compression binds tighter.',
                    'Pure agreement: equal rank within each twin-pair resolved left to right, and the special rank of "of".',
                    'Knowing which clauses are discovered and which are signed is the difference between mathematics and a rule-book — and it is the final entry in this chapter\'s honesty ledger.',
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The order of operations (BODMAS)',
          latex: '\\text{bar} \\to (\\ \\ ) \\to \\{\\ \\ \\} \\to [\\ \\ ] \\to \\text{of} \\to \\times,\\ \\div\\ (\\text{L} \\to \\text{R}) \\to +,\\ -\\ (\\text{L} \\to \\text{R})',
          note: 'Brackets innermost first; "of" before ÷ and × by examination convention; equal ranks swept left to right as written. Brackets override everything — when in doubt, bracket it.',
        },
        {
          kind: 'para',
          text: 'Chapter 2 closes with its referee in place, and the arc is worth seeing whole. One lesson per operation: addition built and carried, subtraction built and borrowed, multiplication compressed and distributed, division un-built and bounded — each retried the four laws, each left behind a bound, a checksum, a speed route. Then the four met on one line and needed a judge, and the judge turned out to be the chapter itself: precedence is the compression argument and the agreed clauses wearing robes. With the treaty signed, the whole-numbers floor is finished — every line of arithmetic in this book\'s future, from Chapter 3\'s divisibility tests to Chapter 5\'s powers, will be read exactly as this lesson prescribes. And the treaty\'s honest last word doubles as the chapter\'s: some rules are discovered and some are agreed, and knowing which is which is what separates understanding a rule from merely obeying it.',
        },
      ],
    },
  ],
}
