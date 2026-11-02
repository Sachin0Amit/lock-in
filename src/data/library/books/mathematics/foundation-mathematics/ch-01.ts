import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 1: Numbers and Place Value
 *
 * LESSONS WRITTEN: 1.1 (pipeline-validation lesson for the platform base)
 * PLANNED NEXT:    1.2 Comparing and ordering numbers
 *                  1.3 Rounding and estimating
 *
 * Full authoring of this book begins once the Google Drive reference
 * collection has been surveyed (docs/project/MASTER_PLAN.md §2).
 */
export const chapter01: Chapter = {
  number: 1,
  slug: 'numbers-and-place-value',
  title: 'Numbers and Place Value',
  summary:
    'Starts from the act of counting itself: what a number is, how numerals encode them with just ten digits, why place value makes the whole system powerful, and how the number line lets us see order at a glance. Closes with the two great naming conventions for large numbers — international and Indian.',
  status: 'in-progress',
  plannedLessons: ['Comparing and Ordering Numbers', 'Rounding and Estimating'],
  lessons: [
    {
      id: 'fm-numbers-digits-place-value',
      number: '1.1',
      title: 'Numbers, Digits and Place Value',
      concepts: [
        'Number versus numeral versus digit',
        'Positional (place-value) notation in base ten',
        'Expanded form',
        'Zero as a placeholder',
        'The number line and ordering',
        'International and Indian systems of numeration',
      ],
      objectives: [
        'Say precisely what a number, a numeral and a digit are — and never confuse them again',
        'Break any whole number into its place values and write it in expanded form',
        'Read and compare numbers in both the international and the Indian naming systems',
        'Locate integers on the number line and use it to compare them',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Counting is the first mathematics humans ever did. Long before anyone wrote a symbol for "seven", a herder compared his flock at sunset with the same flock at dawn and wanted to know that nothing had wandered off. The oldest surviving hints of this are carved bones with regular notches — early tally marks — including specimens such as the Ishango bone, usually dated to roughly twenty thousand years ago. The impulse behind them is worth pausing on: a tally does not name the sheep individually; it stands for the *quantity* of sheep. That leap — caring about "how many" rather than "which ones" — is the birth of number.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A short history of writing numbers down',
          text: 'Tally marks grow hopeless once quantities run past a few dozen. Many civilisations built numerals from grouped symbols (Egyptian, Roman), but each new size needed a brand-new symbol, and arithmetic stayed clumsy. The decisive idea — letting a digit\'s *position* carry part of the value, so that a mere ten symbols can name any number whatsoever — matured in Indian mathematics, together with a dedicated symbol for "nothing here", the zero. This Hindu–Arabic system reached West Asia (the scholar al-Khwarizmi wrote on it around 825 CE) and spread into Europe through trade and texts such as Fibonacci\'s Liber Abaci (1202). Every phone number, bank balance and equation in this library is written with it.',
        },
        { kind: 'heading', text: 'Number, numeral, digit: three different things' },
        {
          kind: 'para',
          text: 'Students lose easy marks every year by using these three words interchangeably, so we fix the vocabulary now. A **number** is an idea — the abstract quantity itself, independent of how it is written. A **numeral** is a written symbol or group of symbols that names a number: "7", "VII" and "seven" are three different numerals, yet all of them name the number seven, while "११" (Devanagari digits) names a different number entirely. A **digit** is a single symbol of a given system: the Hindu–Arabic system has exactly ten of them, 0 through 9 — as many as the fingers (Latin *digitus*) they were first counted on.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Number',
              def: 'An abstract quantity — "how many" — independent of any way of writing it. Seven is seven whether said aloud, stored in a computer, or counted on fingers.',
            },
            {
              term: 'Numeral',
              def: 'A written symbol or group of symbols that names a number. 7, VII and seven are all numerals for the number seven.',
            },
            {
              term: 'Digit',
              def: 'A single symbol of a writing system for numbers. The Hindu–Arabic system has ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
            },
            {
              term: 'Place value',
              def: 'The value a digit contributes because of its position in a numeral. In 4725 the digit 7 contributes 700 because it sits in the hundreds place.',
            },
            {
              term: 'Expanded form',
              def: 'A numeral rewritten as the sum of each digit\'s place-value contribution, making the structure visible: $4725 = 4000 + 700 + 20 + 5$.',
            },
          ],
        },
        { kind: 'heading', text: 'Why ten symbols are enough' },
        {
          kind: 'para',
          text: 'The trick that makes the system inexhaustible is positional notation. Instead of inventing a new symbol whenever quantities grow, we reuse the same ten digits and let the position of each one announce its size. Working right to left, each seat on the stage is worth ten times the seat before it: first the ones, then the tens, then the hundreds, then the thousands. Almost certainly this "base ten" comes from our ten fingers — the original counting hardware. Other bases are perfectly legitimate (computers run on base two, and the ancient Mesopotamians computed in base sixty, which is why your clock counts to sixty), and we will revisit the idea properly later in the library. For now, watch the principle work on a concrete number:',
        },
        {
          kind: 'equation',
          latex: '4725 \\;=\\; 4\\times 10^{3} \\;+\\; 7\\times 10^{2} \\;+\\; 2\\times 10^{1} \\;+\\; 5\\times 10^{0}',
          note: 'Each digit of 4725, weighted by the power of ten attached to its position. Reading right to left the exponents run 0, 1, 2, 3 — and $10^0 = 1$, which is exactly the ones place.',
        },
        {
          kind: 'derivation',
          title: 'Why each move to the left multiplies the value by ten',
          statement:
            'The powers of ten in the equation above are not a memorised ritual — they follow from how counting overflows. Let us build the pattern from a fresh start and see where the $10^2$, $10^3$ and so on come from.',
          steps: [
            {
              label: 'Count in the ones place',
              formula: '0, 1, 2, \\;\\dots\\;, 9',
              explanation:
                'A single seat holds ten digits and no more. Counting past 9 cannot stay in the ones column — the column overflows.',
            },
            {
              label: 'Overflow carries one step left',
              formula: '9 + 1 = 10',
              explanation:
                'When the ones seat is full, the next count resets it to 0 and deposits a 1 in the next seat to the left. That new seat therefore counts *whole tens*: ten, twenty, thirty… Notice the numeral "10" is doing two jobs at once — a value in each position.',
            },
            {
              label: 'The tens seat overflows the same way',
              formula: '99 + 1 = 100',
              explanation:
                'Nine tens plus one more ten is ten tens — and ten tens cannot live in the tens column either. It resets both seats to 0 and opens a third seat. That seat counts ten-tens, i.e. $10 \\times 10$.',
            },
            {
              label: 'Each new seat is one more factor of ten',
              formula: '1,\\; 10,\\; 10\\times 10,\\; 10\\times 10\\times 10,\\; \\dots',
              explanation:
                'Repeating the overflow argument gives the value of every seat: each is ten times its right-hand neighbour. Writing repeated multiplication as powers, the seats are worth $10^0, 10^1, 10^2, 10^3, \\dots$ counting from the right.',
            },
            {
              label: 'Assemble any numeral',
              formula: '\\overline{d_n \\dots d_2 d_1 d_0} \\;=\\; \\sum_{k=0}^{n} d_k \\times 10^{k}',
              explanation:
                'A numeral with digits $d_n \\dots d_1 d_0$ (from left to right) is just the sum of every digit times the power of ten under its seat. This single sentence is the entire engine of arithmetic as we know it.',
            },
          ],
          result:
            'Positional notation is the overflow pattern frozen into notation: every seat is worth ten times the one to its right, so a numeral\'s value is $\\sum d_k \\times 10^k$. Ten symbols, no ceiling.',
        },
        {
          kind: 'table',
          caption: 'Place-value chart for the numeral 4725',
          head: ['Digit in 4725', '4', '7', '2', '5'],
          rows: [
            ['Seat (left → right)', 'thousands', 'hundreds', 'tens', 'ones'],
            ['Power of ten', '$10^{3}$', '$10^{2}$', '$10^{1}$', '$10^{0}$'],
            ['Value contributed', '4000', '700', '20', '5'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Zero is not "nothing" — it is a load-bearing digit',
          text: 'The digit 0 contributes zero to a sum, which tempts beginners to treat it as invisible. It is not: in 304, the 0 occupies the tens seat so that the 3 can sit in the *hundreds* seat. Remove the zero and 34 is what remains — a number nearly ten times smaller. A placeholder that holds a seat empty while everything to its left keeps its correct value is precisely the breakthrough that made positional arithmetic possible, and it is why mathematicians regard the invention of zero as one of the great ideas in history. Leading zeros, on the other hand (as in 05 or 007), add nothing and are normally dropped.',
        },
        { kind: 'heading', text: 'The number line: numbers you can see' },
        {
          kind: 'para',
          text: 'Place value tells us how a number is *written*; the number line tells us where it *sits* relative to every other number. Picture an endless straight road marked at every integer, with a fixed starting point called the **origin**. One step at a time, walking right, you pass $1, 2, 3, \\dots$; walking left from the origin you meet $-1, -2, -3, \\dots$ — the negatives, which we will treat in full when we reach integers. Two facts make the line indispensable. First, *order becomes geometry*: the number to the right is the larger one, always, so comparing is as easy as pointing. Second, *distance becomes counting*: the gap between 3 and 8 is five steps, because you count the unit jumps between them. Every later topic in this book — negatives, fractions, decimals, and eventually the whole of coordinate geometry — is drawn on this same road.',
        },
        {
          kind: 'figure',
          caption:
            'The number line: the origin (0) is the fixed reference; integers step rightwards as they grow and leftwards into the negatives. The number 7 sits seven unit steps right of the origin; −4 sits four unit steps left.',
          svg: `<svg viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from minus 10 to 10 with labeled integers">
  <defs>
    <marker id="nl-arrow-r" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/>
    </marker>
    <marker id="nl-arrow-l" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto">
      <path d="M8,0 L0,4 L8,8 Z" fill="currentColor"/>
    </marker>
  </defs>
  <line x1="50" y1="80" x2="710" y2="80" stroke="currentColor" stroke-width="2" marker-end="url(#nl-arrow-r)" marker-start="url(#nl-arrow-l)"/>
  <text x="640" y="58" font-size="13" fill="currentColor" opacity="0.75">positive direction →</text>
  <text x="70" y="58" font-size="13" fill="currentColor" opacity="0.75">← negative direction</text>
  <!-- ticks: value v maps to x = 380 + v*33 -->
  <g stroke="currentColor" stroke-width="1.5">
    ${Array.from({ length: 21 }, (_, i) => {
      const v = i - 10
      const x = 380 + v * 33
      const h = v % 5 === 0 ? 14 : 9
      return `<line x1="${x}" y1="${80 - h}" x2="${x}" y2="${80 + h}"/>`
    }).join('\n    ')}
  </g>
  <!-- origin emphasis -->
  <circle cx="380" cy="80" r="4" fill="#b45309"/>
  <!-- labels -->
  <g font-size="12" fill="currentColor" text-anchor="middle">
    ${Array.from({ length: 21 }, (_, i) => {
      const v = i - 10
      const x = 380 + v * 33
      const strong = v % 5 === 0
      return `<text x="${x}" y="${112}" ${strong ? 'font-weight="700" font-size="13"' : 'opacity="0.7"'}>${v}</text>`
    }).join('\n    ')}
  </g>
  <text x="380" y="140" font-size="11" fill="currentColor" opacity="0.65" text-anchor="middle">origin (0)</text>
</svg>`,
        },
        { kind: 'heading', text: 'Naming large numbers: two world conventions' },
        {
          kind: 'para',
          text: 'Place value handles the arithmetic of large numbers, but *reading them aloud* is a naming problem, and the world settled on two different answers. Both group digits in periods, insert a separator (the comma) at each period, and name the periods as they grow. The **international system** groups in threes from the right: ones–thousands–millions–billions, so $12{,}345{,}678$ reads "twelve million, three hundred forty-five thousand, six hundred seventy-eight". The **Indian system** groups the first three digits, then in twos: ones–thousands–lakhs–crores, so the same quantity is written $1{,}23{,}45{,}678$ and read "one crore, twenty-three lakh, forty-five thousand, six hundred seventy-eight". Neither is wrong; they are two dialects of the same positional language, and Indian competitive examinations expect fluency in both.',
        },
        {
          kind: 'table',
          caption: 'The same place values named in the two systems',
          head: ['Power of ten', '$10^{5}$', '$10^{6}$', '$10^{7}$', '$10^{9}$', '$10^{11}$'],
          rows: [
            ['International name', 'hundred thousand', 'million', 'ten million', 'billion', 'one hundred billion'],
            ['Indian name', 'one lakh', 'ten lakh', 'one crore', 'one arab', 'one kharab'],
            ['In digits', '1,00,000', '10,00,000', '1,00,00,000', '1,00,00,00,000', '1,00,00,00,00,000'],
          ],
        },
        {
          kind: 'example',
          title: 'Reading a numeral through both systems',
          steps: [
            'Take the numeral $4030627$ — no commas yet, so the place values are invisible. Always start from the right when grouping.',
            'International grouping (threes from the right): $4{,}030{,}627$. Read period by period: "four million, thirty thousand, six hundred twenty-seven". The 0 in the millions period is silent — you do not say "zero million" — but it still holds the seat.',
            'Indian grouping (first three, then twos): $40{,}30{,}627$. Read: "forty lakh, thirty thousand, six hundred twenty-seven".',
            'Expanded form ignores naming conventions entirely — it only cares about place value: $4030627 = 4\\times10^{6} + 0\\times10^{5} + 3\\times10^{4} + 0\\times10^{3} + 6\\times10^{2} + 2\\times10^{1} + 7\\times10^{0}$.',
            'Sanity check, worth building as a habit: the digit sum is $4+0+3+0+6+2+7 = 22$, and the digit-sum rule says a number and its digit sum leave the same remainder on division by 9. Here $22 = 2\\times9 + 4$, and indeed $4030627 = 447847\\times9 + 4$ — the remainders agree, so the numeral was almost certainly copied correctly.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why this lesson matters later',
          text: 'Place value is not a one-week topic that ends here — it is the grammar every later chapter is written in. Expanded form reappears as polynomial form in algebra ($4x^3 + 7x^2 + 2x + 5$ with $x = 10$); the overflow argument becomes carrying in addition and borrowing in subtraction; the seat-by-seat comparison of numerals becomes polynomial comparison; and the number line becomes the entire $x$-axis of coordinate geometry. Master this lesson\'s vocabulary precisely and the next dozen chapters will feel like the same idea wearing different clothes.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In the numeral $50{,}607$ (international grouping), what value does the digit 5 contribute?',
              options: ['5', '500', '5,000', '50,000'],
              answer: 3,
              explain:
                'Counting seats from the right of 50607: ones(7), tens(0), hundreds(6), thousands(0), ten-thousands(5). The 5 sits in the ten-thousands seat, so it contributes $5 \\times 10^{4} = 50{,}000$. If you chose 5,000 you counted the seats one short — the classic off-by-one, which is why anchoring on the ones digit (not the leftmost digit) is the reliable habit.',
            },
            {
              q: 'Which numeral equals $3000 + 400 + 6$?',
              options: ['346', '3,046', '3,406', '3,460'],
              answer: 2,
              explain:
                'Fill the place-value seats from the sum: thousands seat gets 3, hundreds seat gets 4, tens seat gets… nothing is being contributed, so a 0 holds the seat, ones seat gets 6. That gives 3406. Choosing 346 or 3460 means the zero was dropped — exactly the misconception warned about above: a placeholder is not "nothing".',
            },
            {
              q: 'On the number line, which integer lies strictly between $-3$ and $-1$?',
              options: ['$-4$', '$-2$', '$0$', '$2$'],
              answer: 1,
              explain:
                'Walk from −3 to −1: you pass −2 on the way. −4 lies to the *left* of −3 (outside), while 0 and 2 are to the right of −1 (outside). Note the trap: many beginners feel "−2 is smaller than −3 sounds wrong to say between" — the line settles it, because order on the line is geometry, not vibes.',
            },
            {
              q: 'In the Indian system of numeration, one crore equals how many lakhs?',
              options: ['10', '100', '1,000', 'one million'],
              answer: 1,
              explain:
                'A lakh is $10^{5}$ and a crore is $10^{7}$, so a crore is $10^{7} \\div 10^{5} = 10^{2} = 100$ lakhs. "One million" is wrong twice over — a million ($10^{6}$) is only *ten* lakhs; it is the international name for a different quantity altogether.',
            },
            {
              q: 'The digit 2 contributes 2,000 in $2{,}345$ but 30 in $5{,}432$. What is the real reason?',
              options: [
                'Digits change value depending on the parity of their neighbours',
                'The position (seat) of a digit determines the value it contributes',
                'Bigger numbers make every digit worth more',
                'The 2 genuinely has two different values — numerals are ambiguous',
              ],
              answer: 1,
              explain:
                'In 2345 the 2 is in the thousands seat ($2 \\times 10^3$); in 5432 it is in the tens seat ($2 \\times 10^1$). The digit itself is identical — the *position* does the weighting. Option 3 has a grain of truth (larger numerals have more seats) but states it wrongly: the 5 in 5432 does not become "worth more" because 345 is large; each seat has a fixed value. Positional notation, by design, is never ambiguous.',
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
                  q: 'Write $6{,}045$ in expanded form.',
                  solution:
                    'Seat the digits right to left: ones 5, tens 4, hundreds 0, thousands 6. Expanded form: $6045 = 6\\times1000 + 0\\times100 + 4\\times10 + 5$. The zero is written explicitly — that is the point of expanded form: it exposes the empty seat rather than hiding it.',
                },
                {
                  q: 'What is the place value of 7 in $71{,}432$?',
                  solution:
                    'The 7 is the leftmost digit; counting seats from the right (ones→tens→hundreds→thousands→ten-thousands) it sits in the ten-thousands seat. Its place value is $7 \\times 10^{4} = 70{,}000$. "Ten-thousands" is the name of the *seat*; 70,000 is the *value contributed* — examiners accept the seat name, but be ready to produce either.',
                },
                {
                  q: 'Write "three thousand nine hundred four" as a numeral.',
                  solution:
                    'Thousands seat: 3. Hundreds: 9. Tens: nothing was said — so 0 holds the seat. Ones: 4. The numeral is $3{,}904$. The spoken name skips silent seats; the numeral cannot.',
                },
                {
                  q: 'Which is greater: $12{,}012$ or $12{,}102$?',
                  solution:
                    'Both have five digits and the same ten-thousands (1) and thousands (2) seats, so compare the hundreds: 0 versus 1. Since $1 > 0$, $12{,}102$ is larger — no further seats matter. This seat-by-seat comparison is exactly how computers compare numbers digit by digit, and later, how you will compare polynomials term by term.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A number has 4 thousands, 0 hundreds, 8 tens and 1 one. Write the numeral. Then reverse its digits and find how much larger the original is than the reversed.',
                  solution:
                    'Numeral: $4081$. Reversed: $1804$. Difference: $4081 - 1804$. Subtract seat by seat (borrowing where needed): $4081 - 1804 = 2277$. Check by addition: $2277 + 1804 = 4081$ ✓. A beautiful general fact hides here: for a four-digit number $\\overline{abcd}$, expanded form gives $\\overline{abcd} - \\overline{dcba} = 999(a-d) + 90(b-c)$. Test it: $999(4-1) + 90(0-8) = 2997 - 720 = 2277$ ✓. Try to prove this yourself — it is a one-line argument once today\'s notation is fluent.',
                },
                {
                  q: 'Insert international-system commas in $9876543$ and state how many "thousand-period" groups it has; then insert Indian-system commas in the same number.',
                  solution:
                    'International, grouping in threes from the right: $9{,}876{,}543$ — two complete groups beyond the ones period (876 and 9), so it reads "nine million, eight hundred seventy-six thousand, five hundred forty-three". Indian, first three then twos: $98{,}76{,}543$ — "ninety-eight lakh, seventy-six thousand, five hundred forty-three". Same quantity, two dialects; get comfortable switching, because Indian entrance papers do.',
                },
                {
                  q: 'Start at $-4$ on the number line and take 7 unit steps to the right. Where do you land?',
                  solution:
                    'Count aloud as you walk: from −4, step to −3 (1), −2 (2), −1 (3), 0 (4), 1 (5), 2 (6), 3 (7). You land on $3$. Formally this is $-4 + 7 = 3$, and the number line picture *is* the explanation of why adding a positive number means walking right — a fact we will lean on heavily in the integers chapter.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) The digit 6 in $26{,}453$ is replaced by 9. By how much does the number increase?',
                  solution:
                    'The 6 is in the thousands seat, contributing $6{,}000$; after replacement that seat contributes $9{,}000$. Every other seat is untouched, so the increase is exactly $9{,}000 - 6{,}000 = 3{,}000$. Strategy note: never recompute the whole number in exam conditions — locate the seat, take the difference *within that seat*. New number, for checking: $29{,}453$, and indeed $29{,}453 - 26{,}453 = 3{,}000$ ✓.',
                },
                {
                  q: '(Exam-style, foundation level) How many whole numbers strictly between 20 and 40 are exactly divisible by 3?',
                  solution:
                    'Multiples of 3 in that open interval: the smallest above 20 is $21 = 3\\times7$, the largest below 40 is $39 = 3\\times13$. Counting from $3\\times7$ to $3\\times13$ inclusive gives $13 - 7 + 1 = 7$ numbers (21, 24, 27, 30, 33, 36, 39). The "$+1$" is the classic counting trap — the number of integers from $a$ to $b$ is $b - a + 1$, not $b - a$. Check by listing: seven numbers, confirmed.',
                },
              ],
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Place-value and numeration questions are near-universal in the foundation stages of JEE/NEET-track testing, NTSE and olympiad screenings, CUET general aptitude, SAT (number properties), and every government-recruitment quantitative section. Typical forms: digit-replacement problems (as in exercise L4 above), digit-sum divisibility setups, interchanging digits, Indian↔international conversion, and comma-placement. They are "free marks" for a student who treats seats, not symbols, as the unit of thought.',
        },
        {
          kind: 'para',
          text: 'You can now read a numeral structurally — seat by seat, power by power — instead of as a string of sounds. That is a genuinely new capability, and everything downstream builds on it: the next lessons sharpen it into comparing, ordering and rounding, and the next chapters turn it into the four operations, where the overflow argument you met today returns as carrying. When you re-read this page months from now, the derivation should look almost obvious. That is the standard of "understood" we are after.',
        },
      ],
    },
  ],
}
