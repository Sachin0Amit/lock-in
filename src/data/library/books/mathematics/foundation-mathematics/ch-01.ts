import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 1: Numbers and Place Value
 *
 * LESSONS WRITTEN: 1.1 (pipeline-validation lesson for the platform base)
 *                  1.2 Comparing and Ordering Numbers
 *                  1.3 Rounding and Estimating
 * CHAPTER COMPLETE (unit 1 of the unit-by-unit cadence, 2026-11-03).
 * References for this unit: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 1 "Numbers" + NCERT Class 6 "Knowing Our Numbers"
 * topic coverage — see docs/project/SOURCE_LOG.md. Exposition original.
 */
export const chapter01: Chapter = {
  number: 1,
  slug: 'numbers-and-place-value',
  title: 'Numbers and Place Value',
  summary:
    'Starts from the act of counting itself: what a number is, how numerals encode them with just ten digits, why place value makes the whole system powerful, and how the number line lets us see order at a glance. Closes with the two great naming conventions for large numbers — international and Indian.',
  status: 'complete',
  plannedLessons: [],
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
    {
      id: 'fm-comparing-ordering-numbers',
      number: '1.2',
      title: 'Comparing and Ordering Numbers',
      prerequisites: ['fm-numbers-digits-place-value'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch1'],
      concepts: [
        'Digit count as the first comparison test',
        'Seat-by-seat (left-to-right) comparison',
        'The domination bound: why the leftmost differing seat decides',
        'Ascending and descending order',
        'Greatest and smallest numbers from given digits',
        'Successor and predecessor',
        'Digit rearrangements preserve the digit sum',
      ],
      objectives: [
        'Compare any two whole numbers instantly and say which seat decided the answer',
        'Arrange a mixed list of large numbers in ascending or descending order without pairwise struggle',
        'Build the greatest and smallest possible numbers from a given set of digits',
        'Explain, with a proof, why the leftmost differing digit always settles the comparison',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 1.1 taught us to read a numeral seat by seat — each digit contributing its value times a power of ten. This lesson turns that reading skill into a decision skill. Two questions face us constantly, in mathematics and in daily life alike: *which of two numbers is larger?* and *how do we put a whole list of them in order?* A pharmacist comparing dosages, a banker ranking loan applications, a student ordering fractions a few chapters from now — all of them are doing the same underlying work. And remarkably, the place-value system makes the answer almost mechanical.',
        },
        { kind: 'heading', text: 'Two numbers, one question: which is larger?' },
        {
          kind: 'para',
          text: 'The full procedure has two steps, applied in order. **Step 1 — count the digits.** If one numeral has more digits than the other (ignoring any leading zeros), the longer one is automatically larger. A 5-digit number is at least $10{,}000$, while even the largest 4-digit number is $9{,}999$ — and $9{,}999 + 1 = 10{,}000$ is exactly the boundary. The successor of the greatest 4-digit number is the smallest 5-digit number, and that single fact settles every unequal-length comparison. **Step 2 — if the digit counts are equal, compare seats from the LEFT, and let the first differing seat decide.** Read both numerals left to right; the first seat where the digits differ is the verdict. Everything to the right of that seat is irrelevant, no matter how impressive its digits look.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Successor',
              def: 'The number exactly one step to the right on the number line: the successor of $n$ is $n + 1$. The successor of $9{,}999$ is $10{,}000$.',
            },
            {
              term: 'Predecessor',
              def: 'The number exactly one step to the left: the predecessor of $n$ is $n - 1$. The predecessor of $1{,}00{,}000$ (one lakh) is $99{,}999$.',
            },
            {
              term: 'Ascending order',
              def: 'A list arranged from smallest to largest, like climbing stairs: $88 < 808 < 8{,}008 < 8{,}080$.',
            },
            {
              term: 'Descending order',
              def: 'The same list arranged from largest to smallest, like descending stairs: $8{,}080 > 8{,}008 > 808 > 88$.',
            },
            {
              term: 'Greatest number from given digits',
              def: 'Formed by placing the largest digit in the highest-value seat, the next largest in the next seat, and so on — digits in descending order from left to right.',
            },
            {
              term: 'Smallest number from given digits',
              def: 'Digits in ascending order from left to right — except that 0 may never lead: put the smallest *non-zero* digit first, then the zeros, then the rest.',
            },
          ],
        },
        {
          kind: 'para',
          text: 'Step 2 deserves scrutiny, because it is the part students apply blindly. Why *should* the leftmost differing seat have the final word? Consider $4{,}589$ against $4{,}598$. The thousands seats agree ($4 = 4$), the hundreds seats agree ($5 = 5$), the tens seats differ ($8$ versus $9$), and — here is the trap — the ones seats differ too, and in the *opposite* direction ($9$ versus $8$). A beginner\'s eye is drawn to that big 9 in the ones place of $4{,}589$ and wavers. It should not. The number line agrees: $4{,}598 - 4{,}589 = 9$, so $4{,}598$ is larger, and the ones digit 9 could not save $4{,}589$ even with its full strength.',
        },
        {
          kind: 'derivation',
          title: 'Why the leftmost differing seat always decides',
          statement:
            'Take two numerals of the same length with digits $d_n \\dots d_1 d_0$ and $e_n \\dots e_1 e_0$ (read left to right). Let seat $j$ be the highest seat where they differ, so $d_k = e_k$ for all $k > j$ and $d_j \\neq e_j$. We prove the sign of the whole difference $D = \\overline{d_n \\dots d_0} - \\overline{e_n \\dots e_0}$ equals the sign of $d_j - e_j$: the leftmost differing seat dominates everything to its right.',
          steps: [
            {
              label: 'Write both numbers in expanded form and subtract',
              formula: 'D \\;=\\; \\sum_{k=0}^{n} (d_k - e_k)\\,10^{k}',
              explanation:
                'Expanded form (Lesson 1.1) turns each numeral into a sum of digit-times-power terms. Subtracting term by term is legitimate because the equal seats above $j$ contribute $d_k - e_k = 0$ and vanish.',
            },
            {
              label: 'Isolate the deciding seat',
              formula: 'D \\;=\\; (d_j - e_j)\\,10^{j} \\;+\\; \\sum_{k=0}^{j-1} (d_k - e_k)\\,10^{k}',
              explanation:
                'The first term is the leftmost differing seat\'s contribution. The second sum gathers every seat strictly below it — the "everything else" that we suspect cannot matter.',
            },
            {
              label: 'Bound the "everything else"',
              formula: '\\left|\\sum_{k=0}^{j-1} (d_k - e_k)\\,10^{k}\\right| \\;\\le\\; 9\\,(10^{j-1} + 10^{j-2} + \\dots + 10^{0})',
              explanation:
                'Each digit difference satisfies $|d_k - e_k| \\le 9$ (digits run only from 0 to 9), so the worst case piles up nine at every seat below $j$ simultaneously.',
            },
            {
              label: 'Evaluate the worst case exactly',
              formula: '9\\,(10^{j-1} + \\dots + 10^{0}) \\;=\\; 9 \\times \\frac{10^{j} - 1}{10 - 1} \\;=\\; 10^{j} - 1',
              explanation:
                'The powers of ten form a geometric series whose sum is $\\frac{10^j - 1}{9}$; multiplying by 9 gives $10^j - 1$. So even a maximal revolt of every lower seat tops out at one less than the deciding seat\'s smallest possible step.',
            },
            {
              label: 'Compare the two magnitudes',
              formula: '|d_j - e_j| \\ge 1 \\;\\Rightarrow\\; |(d_j - e_j)\\,10^{j}| \\ge 10^{j} \\;>\\; 10^{j} - 1 \\ge \\left|\\text{lower seats}\\right|',
              explanation:
                'Since the digits at seat $j$ differ, $|d_j - e_j|$ is at least 1, so the deciding seat contributes at least a full $10^{j}$ in magnitude. The lower seats, even at their theoretical maximum, cannot reach $10^{j}$. One side of the tug-of-war outweighs the other entire team.',
            },
          ],
          result:
            'The sign of $D$ is the sign of $d_j - e_j$: the leftmost differing seat decides the comparison outright. This is the *domination bound* — the reason we may read numerals from the left and stop at the first difference, with total confidence.',
        },
        {
          kind: 'equation',
          latex: '\\underbrace{|d_j - e_j| \\ge 1}_{\\text{deciding seat}} \\;\\Rightarrow\\; \\underbrace{10^{j}}_{\\text{its least weight}} \\;>\\; \\underbrace{10^{j} - 1}_{\\text{max weight of ALL lower seats}}',
          note: 'The entire comparison rule in one inequality: the smallest step of the leftmost differing seat outweighs the combined maximum of every seat to its right. In 4,589 vs 4,598 the tens seat (j = 1) differs by 1, contributing 10; the ones seat can counter at most 9.',
        },
        {
          kind: 'figure',
          caption:
            'Seat-by-seat comparison of 4,589 and 4,598. Thousands and hundreds agree; the first difference is at the tens seat (8 vs 9, tinted), which therefore decides: 4,598 is larger. The ones digits differ in the opposite direction (9 vs 8) but are dominated — 9 < 10, so they cannot overturn the verdict. The full difference is 4,598 − 4,589 = 9.',
          svg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Place value chart comparing 4589 and 4598 with the deciding tens seat highlighted">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="80" y="34" opacity="0.75" text-anchor="start">seat →</text>
    <rect x="150" y="44" width="130" height="40" rx="6" fill="currentColor" opacity="0.06"/>
    <rect x="290" y="44" width="130" height="40" rx="6" fill="currentColor" opacity="0.06"/>
    <rect x="430" y="44" width="130" height="40" rx="6" fill="#b45309" opacity="0.16"/>
    <rect x="570" y="44" width="130" height="40" rx="6" fill="currentColor" opacity="0.06"/>
    <text x="215" y="69">thousands</text>
    <text x="355" y="69">hundreds</text>
    <text x="495" y="69" font-weight="700" fill="#b45309">tens</text>
    <text x="635" y="69">ones</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">4,589</text>
    <text x="80" y="182" opacity="0.75" text-anchor="start">4,598</text>
    <rect x="150" y="94" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <rect x="290" y="94" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <rect x="430" y="94" width="130" height="46" rx="6" fill="#b45309" opacity="0.14" stroke="#b45309" stroke-width="2"/>
    <rect x="570" y="94" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <rect x="150" y="156" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <rect x="290" y="156" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <rect x="430" y="156" width="130" height="46" rx="6" fill="#b45309" opacity="0.14" stroke="#b45309" stroke-width="2"/>
    <rect x="570" y="156" width="130" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="215" y="124" font-size="22" font-weight="700">4</text>
    <text x="355" y="124" font-size="22" font-weight="700">5</text>
    <text x="495" y="124" font-size="22" font-weight="700" fill="#b45309">8</text>
    <text x="635" y="124" font-size="22" font-weight="700">9</text>
    <text x="215" y="186" font-size="22" font-weight="700">4</text>
    <text x="355" y="186" font-size="22" font-weight="700">5</text>
    <text x="495" y="186" font-size="22" font-weight="700" fill="#b45309">9</text>
    <text x="635" y="186" font-size="22" font-weight="700">8</text>
    <text x="380" y="232" font-size="12" opacity="0.8" text-anchor="start">first difference at the tens seat → 4,598 wins by 9, the ones digit cannot rescue 4,589</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Ordering a whole list: ascending and descending' },
        {
          kind: 'para',
          text: 'Ordering a list is where beginners waste time comparing every pair. The efficient habit: **bucket by digit count first, then order within each bucket.** Take the list $9{,}843$, $98{,}341$, $9{,}84{,}310$, $98{,}43{,}100$ (Indian comma grouping). Digit counts: 4, 5, 6, 7 — so the descending order is already visible: $98{,}43{,}100 > 9{,}84{,}310 > 98{,}341 > 9{,}843$. Not one seat-by-seat comparison was needed. When two numbers share a digit count, only then do we walk their seats from the left. In $5{,}06{,}078$ versus $5{,}06{,}780$, the lakhs, ten-thousands and thousands seats all agree; the tens seat reads $7$ versus $8$, so $5{,}06{,}780$ is larger — and the pair slots into place.',
        },
        {
          kind: 'example',
          title: 'Ordering a mixed list, the efficient way',
          steps: [
            'List given: $808$, $8{,}080$, $88$, $8{,}008$. First bucket by digit count: two-digit $\{88\}$, three-digit $\{808\}$, four-digit $\{8{,}080, 8{,}008\}$. The buckets themselves are already ordered.',
            'Within the four-digit bucket, compare seats from the left: thousands $8 = 8$, hundreds $0 = 0$, tens $8$ versus $0$ — first difference at the tens seat, so $8{,}080 > 8{,}008$.',
            'Ascending order: $88 < 808 < 8{,}008 < 8{,}080$. Descending is the exact reverse: $8{,}080 > 8{,}008 > 808 > 88$.',
            'Sanity check by seat logic: each number is roughly eight-something, and each step up the list adds a more significant seat. A second of such reflection catches transcription slips — a habit worth keeping for life.',
          ],
        },
        { kind: 'heading', text: 'Building the greatest and smallest numbers from given digits' },
        {
          kind: 'para',
          text: 'The comparison rule runs backwards too: instead of comparing numbers we already have, we can *construct* the number that beats all others from a given set of digits. To build the **greatest** number, put the largest available digit in the highest-value seat, the next largest in the next seat, and so on — digits in descending order from left to right. To build the **smallest**, run the same logic downwards: smallest digits in the highest seats — with one crucial exception. Zero may not occupy the leading seat: from the digits $7, 1, 0, 3, 9$, writing $01379$ would not create a five-digit number at all, but the numeral $1{,}379$ wearing a costume. So the smallest number places the smallest *non-zero* digit first, the zeros immediately after, then the remaining digits ascending.',
        },
        {
          kind: 'example',
          title: 'Greatest and smallest from the digits 7, 1, 0, 3, 9 (no repetition)',
          steps: [
            'Greatest: sort the digits descending — $9, 7, 3, 1, 0$ — and pour them into seats from the ten-thousands seat rightwards: $97{,}310$.',
            'Smallest: sort ascending — $0, 1, 3, 7, 9$ — but the 0 cannot lead, so promote the smallest non-zero digit (1) to the front, then the 0: $10{,}379$.',
            'Their difference: $97{,}310 - 10{,}379 = 86{,}931$. Notice the digit sum of both numbers is $9+7+3+1+0 = 20$ — the same digits, merely rearranged — and the digit sum of the difference is $8+6+9+3+1 = 27$, a multiple of 9. That is no coincidence, as Exercise L4 will let you prove.',
            'If repetition *were* allowed, the greatest would be $99{,}999$ and the smallest $10{,}000$ — the rules of the problem always matter; read them twice in an examination.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four classic comparison traps',
          text: 'One: comparing from the right. Place value is *counted* from the right (ones first) but comparisons are *decided* from the left — do not let the habit of counting seats drag your eye to the ones digit first. Two: leading zeros. $007$ is the number 7, a one-digit quantity; it does not gain membership among three-digit numbers by wearing two costume zeros. Three: comma confusion. $98{,}341$ (international: ninety-eight thousand) and $9{,}83{,}410$ (Indian: ninety-eight lakh) look cousinly on paper but differ by a factor of a hundred — always regroup before comparing across systems. Four: "longer is bigger" is true only for whole numbers written without leading zeros; when decimals arrive in Chapter 5, the rule will need refinement, and remembering *why* it works today (more digits means reaching a higher seat) will make that refinement painless then.',
        },
        { kind: 'heading', text: 'Shifting digits: same material, new building' },
        {
          kind: 'para',
          text: 'Take the digits $2, 5, 7$ and build every rotation: $257$, $572$, $725$. The digit multiset is identical — all three share digit sum $14$ — yet the values order themselves as $257 < 572 < 725$. Moving a larger digit into a higher seat raises the number; moving it lower sinks it. And a beautiful arithmetic thread runs through all such rearrangements: because each number equals its digit sum plus multiples of nine (each seat\'s $10^k$ is one more than nine times a smaller power), any two rearrangements of the same digits differ by a multiple of 9. Test it: $725 - 257 = 468 = 9 \\times 52$. File this away — it becomes the digit-sum divisibility test in Chapter 3, and it is a favourite competitive-exam trick.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Why positional notation made comparison easy',
          text: 'Try comparing two Roman numerals: which is larger, XXXVII or XLII? Each must be mentally evaluated — thirty-seven versus forty-two — because in a grouped-symbol system the "seats" carry no consistent weights. Positional notation turned comparison into a left-to-right scan that a child can do and a machine can do in one pass; indeed, this seat-by-seat rule is exactly how dictionaries alphabetise words (lexicographic order) and how computers compare strings, file versions and serial numbers. The domination bound you proved above is the mathematical engine inside all of them.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Where this lesson matters later',
          text: 'The leftmost-differing-seat principle reincarnates everywhere. Comparing two polynomials term by term from the highest degree is the same theorem with $x = 10$. The domination bound is the ancestor of "look at the leading term" — how limits, big-O growth rates in computer science, and order-of-magnitude physics estimates are all reasoned. And the greatest/smallest construction problems return in every entrance examination disguised in new costumes: forming numbers divisible by given digits, palindromes, or numbers with digits in arithmetic progression. The costume changes; the seats do not.',
        },
        {
          kind: 'table',
          caption: 'Worked comparisons — find the deciding seat before reading the difference',
          head: ['Pair', 'Deciding seat', 'Larger number', 'Difference'],
          rows: [
            ['$4{,}589$ vs $4{,}598$', 'tens ($8$ vs $9$)', '$4{,}598$', '$9$'],
            ['$45{,}306$ vs $45{,}036$', 'hundreds ($3$ vs $0$)', '$45{,}306$', '$270$'],
            ['$67{,}891$ vs $67{,}918$', 'hundreds ($8$ vs $9$)', '$67{,}918$', '$27$'],
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which is greater: $67{,}891$ or $67{,}918$?',
              options: ['$67{,}891$', '$67{,}918$', 'They are equal', 'Cannot be determined without calculating'],
              answer: 1,
              explain:
                'Same digit count, so scan from the left: ten-thousands $6 = 6$, thousands $7 = 7$, hundreds $8$ vs $9$ — first difference, game over: $67{,}918$ wins. The full difference is $67{,}918 - 67{,}891 = 27$, and note the ones digits ($1$ vs $8$) point the other way but are dominated — they cannot outweigh a whole hundreds seat.',
            },
            {
              q: 'The greatest number that can be formed from the digits $2, 0, 7, 5$ without repetition is:',
              options: ['$7{,}520$', '$7{,}052$', '$7{,}205$', '$257$'],
              answer: 0,
              explain:
                'Greatest = largest digits in the highest seats: $7$ in thousands, $5$ in hundreds, $2$ in tens, $0$ in ones: $7{,}520$. Option $257$ is the trap from the *smallest*-number problem done wrong — $0257$ collapses to $257$ because a leading zero holds no seat.',
            },
            {
              q: 'Arrange in ascending order: $5{,}06{,}078$, $56{,}078$, $5{,}06{,}780$.',
              options: [
                '$56{,}078 < 5{,}06{,}078 < 5{,}06{,}780$',
                '$5{,}06{,}078 < 5{,}06{,}780 < 56{,}078$',
                '$5{,}06{,}780 < 5{,}06{,}078 < 56{,}078$',
                '$56{,}078 < 5{,}06{,}780 < 5{,}06{,}078$',
              ],
              answer: 0,
              explain:
                'Digit counts first: $56{,}078$ has five digits, the other two have six — so it is smallest. Between the six-digit pair, scan from the left: the first three seats agree, the tens seat gives $7$ vs $8$, so $5{,}06{,}078 < 5{,}06{,}780$. Hence $56{,}078 < 5{,}06{,}078 < 5{,}06{,}780$. Option (d) makes the classic error of ordering the six-digit pair backwards.',
            },
            {
              q: 'The successor of the greatest 3-digit number is:',
              options: ['$998$', '$999$', '$1{,}000$', '$1{,}001$'],
              answer: 2,
              explain:
                'The greatest 3-digit number is $999$; its successor is $999 + 1 = 1{,}000$ — which is simultaneously the *smallest* 4-digit number. This boundary fact is the engine of the digit-count rule: every 4-digit number is at least $1{,}000$, so no 3-digit number can touch it.',
            },
            {
              q: 'In one sentence: why does the leftmost differing digit decide a comparison?',
              options: [
                'Because digits on the left are written first, and reading order is how mathematics processes numbers',
                'Because the leftmost differing seat contributes at least $10^j$, while all seats to its right contribute at most $10^j - 1$ combined',
                'Because numbers are conventionally written largest-seat-first, so the left digits are naturally bigger',
                'Because the ones digit is too small ever to matter in a comparison',
              ],
              answer: 1,
              explain:
                'This is the domination bound. Options (a) and (c) confuse *convention* with *reason* — writing big seats on the left is a choice, but the leftmost differing seat would dominate even if we wrote numerals right-to-left. Option (d) is flatly wrong: when all higher seats tie, the ones digit is exactly the deciding seat — it matters precisely when nothing bigger disagrees.',
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
                  q: 'Compare $45{,}306$ and $45{,}036$: which seat decides, which number is larger, and what is their difference?',
                  solution:
                    'Same digit count (5), so scan from the left: ten-thousands $4 = 4$, thousands $5 = 5$, hundreds $3$ vs $0$ — the hundreds seat decides, and $3 > 0$, so $45{,}306$ is larger. For the exact difference, settle seat by seat: hundreds contribute $3\\times100 - 0 = +300$, tens contribute $0 - 3\\times10 = -30$, ones cancel ($6 = 6$). Total: $300 - 30 = 270$ ✓. Note how the domination bound predicted the *sign* instantly, while the exact difference needed the lower seats too — comparison is cheaper than subtraction.',
                },
                {
                  q: 'Arrange in ascending order: $88$, $8{,}008$, $808$, $8{,}080$.',
                  solution:
                    'Bucket by digit count: $\{88\}$ (2 digits) $< \{808\}$ (3 digits) $< \{8{,}008, 8{,}080\}$ (4 digits). Within the four-digit bucket: thousands $8 = 8$, hundreds $0 = 0$, tens $0$ vs $8$ — the tens seat decides, so $8{,}008 < 8{,}080$. Ascending order: $88 < 808 < 8{,}008 < 8{,}080$. Observe how three of the four positions were settled by digit count alone — always count digits before comparing anything.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'From the digits $9, 0, 1, 5, 4, 7$ (each used once), form the greatest and the smallest six-digit numbers, and find their difference.',
                  solution:
                    'Greatest: digits descending into descending seats: $9{,}75{,}410$. Smallest: digits ascending but 0 cannot lead — promote the smallest non-zero digit (1) to the lakhs seat, then 0: $1{,}04{,}579$. Difference: $9{,}75{,}410 - 1{,}04{,}579 = 8{,}70{,}831$. Check the rearrangement fingerprint: both numbers have digit sum $9+0+1+5+4+7 = 26$, and the difference\'s digit sum is $8+7+0+8+3+1 = 27 = 9 \\times 3$, a multiple of 9 — as the L5/L6 problems below will prove it must always be.',
                },
                {
                  q: 'Write $90703005$ with international commas and with Indian commas, and read each aloud.',
                  solution:
                    'International (groups of three from the right): $90{,}703{,}005$ — "ninety million, seven hundred three thousand, five". Indian (first three, then twos): $9{,}07{,}03{,}005$ — "nine crore, seven lakh, three thousand, five". Verify by expansion: $9 \\times 10^{7} + 7 \\times 10^{5} + 3 \\times 10^{3} + 5 = 90703005$ ✓. The silent zeros hold the ten-millions and ten-thousands seats in both systems — same quantity, two dialects, as Lesson 1.1 established.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) From the digits $4, 5, 7, 9$ (each used once), find the difference between the greatest and smallest four-digit numbers, and show that it is divisible by 9.',
                  solution:
                    'Greatest: $9754$. Smallest: $4579$ (no zero here, so ascending order works directly). Difference: $9754 - 4579 = 5175$. Divisibility check: $5+1+7+5 = 18$, a multiple of 9, and indeed $5175 = 9 \\times 575$ ✓. Why it *must* happen: both numbers are rearrangements of the same digits, so their digit sums are equal ($25$ each), and any number differs from its digit sum by a multiple of 9 — hence their difference is a multiple of 9. In an examination, this is the ten-second sanity check that catches arithmetic slips.',
                },
                {
                  q: '(Exam-style, foundation level) Write the three rotations of $257$ in ascending order, and verify that the difference between the largest and smallest is a multiple of 9.',
                  solution:
                    'Rotations: $257$, $572$, $725$. Ascending: $257 < 572 < 725$ — each step moves a larger digit one seat left (the 7 travels from ones to tens to hundreds), which the domination bound guarantees is an increase. Largest minus smallest: $725 - 257 = 468$, and $468 = 9 \\times 52$ ✓. Same fingerprint as the previous problem: identical digit multiset $\{2,5,7\}$, digit sum $14$ for all three, so every pairwise difference is a multiple of 9.',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the domination bound: for any seat $j \\ge 1$, the combined maximum contribution of all seats below $j$ is $10^{j} - 1$, which is strictly less than a single step of seat $j$.',
                  solution:
                    'A seat below $j$ has value $10^{k}$ with $0 \\le k \\le j-1$, and a digit difference at that seat is at most 9 in absolute value. So the largest possible combined contribution of all lower seats is $9(10^{j-1} + 10^{j-2} + \\dots + 10^{1} + 10^{0})$. The powers form a geometric series with ratio 10: $10^{j-1} + \\dots + 10^{0} = \\frac{10^{j} - 1}{10 - 1} = \\frac{10^{j} - 1}{9}$. Multiplying by 9: the bound is exactly $10^{j} - 1$. Meanwhile the smallest non-zero contribution of seat $j$ itself is $1 \\times 10^{j} = 10^{j}$, and $10^{j} > 10^{j} - 1$ always. Hence no configuration of lower seats — even nine at every position — can cancel one step of the deciding seat. For $j = 3$: lower seats max out at $999 < 1000$.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that any two numbers formed by rearranging the same digits differ by a multiple of 9. Then explain why seat-by-seat comparison from the left defines a *total order* on equal-length numerals (every pair comparable, and the order is transitive).',
                  solution:
                    'Part 1. A numeral with digits $d_n \\dots d_0$ equals $\\sum d_k 10^{k}$, and each power satisfies $10^{k} = (9 + 1)^{k} = 9 \\cdot (\\text{something}) + 1$ by the binomial expansion — so $10^{k} \\equiv 1 \\pmod{9}$ for every $k$. Therefore the whole number $\\equiv \\sum d_k \\pmod 9$: every number is congruent to its digit sum modulo 9. Two rearrangements have identical digit sums, hence identical remainders mod 9, so their difference $\\equiv 0 \\pmod 9$ — a multiple of 9. Part 2. Seat-by-seat comparison is exactly lexicographic (dictionary) order on the digit strings, read from the left. Every pair of distinct equal-length strings has a leftmost differing position, so comparability holds. Transitivity: if $A$ beats $B$ at position $p$ and $B$ beats $C$ at position $q$, then at the first position where $A$ and $C$ differ, careful case analysis on whether that position is above, at, or below $\min(p, q)$ shows $A$ beats $C$ — the domination bound supplies each case. This is the same argument by which alphabetical order is transitive, and it is why machines can sort millions of keys with a single left-to-right scan per comparison.',
                },
              ],
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Ordering questions are staple free marks: SSC and banking papers ask you to arrange four or five six-digit numbers in ascending/descending order; JEE-foundation and NTSE screens love "greatest/smallest number from given digits" (with and without repetition, sometimes with a divisibility condition attached); CUET general aptitude tests digit-shifting puzzles; SAT number properties hides the same logic in digit-replacement problems. The discipline that wins marks is uniform: digit count first, seats from the left second, deciding seat named before any subtraction. Examiners time these questions at 30–45 seconds each — which is exactly the time the seat method takes, and a full subtraction does not.',
        },
        {
          kind: 'formula',
          name: 'The domination bound (why the leftmost differing seat decides)',
          latex: '9\\,(10^{j-1} + \\dots + 10^{0}) \\;=\\; 10^{j} - 1 \\;<\\; 10^{j}',
          note: 'All seats below seat j, even maximally loaded, total one less than a single step of seat j. This one inequality is the entire comparison rule for whole numbers.',
        },
        {
          kind: 'para',
          text: 'You can now size up any two whole numbers at a glance — and, more importantly, you can defend the glance with a proof. The next lesson keeps the seats and changes the question: instead of asking which number is larger, we ask what a number becomes when we deliberately blur it — rounding to the nearest ten, hundred or thousand, and estimating with the results. Comparison asks for exact order; estimation asks for useful closeness, and both draw their power from the same place-value geometry.',
        },
      ],
    },
    {
      id: 'fm-rounding-and-estimating',
      number: '1.3',
      title: 'Rounding and Estimating',
      prerequisites: ['fm-numbers-digits-place-value', 'fm-comparing-ordering-numbers'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch1'],
      concepts: [
        'Rounding to the nearest ten, hundred and thousand',
        'The midpoint convention: ties round up',
        'Estimating sums, differences and products',
        'Overestimates and underestimates',
        'Leading-digit estimation',
        'Error bounds for rounded sums',
        'When to round up on purpose (capacity problems)',
      ],
      objectives: [
        'Round any whole number to a named place and say which digit made the decision',
        'Estimate sums, differences and products to a chosen level of coarseness — and choose the right level',
        'Recognise when rounding a subtraction of close numbers destroys the answer, and what to do instead',
        'State a guaranteed error bound for a sum of rounded numbers',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'A newspaper reports "about 40,000 people attended the rally". Nobody counted exactly forty thousand heads — and nobody needed to. The crowd was sized to the nearest ten thousand because that is the precision the question deserves. A shopper totals a basket to "roughly ₹2,000" before reaching the checkout. An engineer checks whether a beam will carry "about ten tonnes". All three are doing the same thing: replacing an inconvenient number with a *nearby convenient one*, on purpose, and keeping track of how far off they might be. That skill has two halves — *rounding*, the act of blurring a number to a named place, and *estimating*, the art of computing with blurred numbers and knowing what the blur costs. Both halves run on the place-value machinery of the last two lessons.',
        },
        { kind: 'heading', text: 'Rounding: the number line decides' },
        {
          kind: 'para',
          text: 'To round a number to the nearest ten is to ask: which multiple of ten does it sit closest to on the number line? The number $47$ lives between the multiples $40$ and $50$; the midpoint $45$ is equidistant from both; $47$ is past the midpoint, so it rounds to $50$. The number $43$ is before the midpoint, so it rounds to $40$. That is all rounding is — a distance contest between the two neighbouring multiples. And the digit tells us who wins without any measuring: when rounding to a place, **look at the digit immediately to its right.** If that digit is 5 or more, the number has crossed the midpoint, so the kept digit steps up by one; if it is less than 5, the kept digit stays. All digits to the right of the kept place become zeros.',
        },
        {
          kind: 'figure',
          caption:
            'Rounding to the nearest ten on the number line. The gap between the multiples 40 and 50 is split by the midpoint 45 (marked). Numbers before the midpoint — like 43 — round down to 40; numbers past it — like 47 — round up to 50. The digit to the right of the tens place announces which side of the midpoint the number is on, which is why "look at the next digit" works.',
          svg: `<svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 40 to 50 showing 43 rounding down to 40 and 47 rounding up to 50 with the midpoint 45 marked">
  <defs>
    <marker id="rl-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="#b45309"/>
    </marker>
  </defs>
  <line x1="70" y1="95" x2="690" y2="95" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="70" y1="87" x2="70" y2="103" stroke-width="2.5"/>
    <line x1="132" y1="89" x2="132" y2="101"/>
    <line x1="194" y1="89" x2="194" y2="101"/>
    <line x1="256" y1="89" x2="256" y2="101"/>
    <line x1="318" y1="89" x2="318" y2="101"/>
    <line x1="380" y1="85" x2="380" y2="105" stroke="#b45309" stroke-width="2.5" stroke-dasharray="4 3"/>
    <line x1="442" y1="89" x2="442" y2="101"/>
    <line x1="504" y1="89" x2="504" y2="101"/>
    <line x1="566" y1="89" x2="566" y2="101"/>
    <line x1="628" y1="89" x2="628" y2="101"/>
    <line x1="690" y1="87" x2="690" y2="103" stroke-width="2.5"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="70" y="122" font-weight="700">40</text>
    <text x="132" y="122" opacity="0.7">41</text>
    <text x="194" y="122" opacity="0.7">42</text>
    <text x="256" y="122" opacity="0.7">43</text>
    <text x="318" y="122" opacity="0.7">44</text>
    <text x="380" y="122" font-weight="700" fill="#b45309">45</text>
    <text x="442" y="122" opacity="0.7">46</text>
    <text x="504" y="122" opacity="0.7">47</text>
    <text x="566" y="122" opacity="0.7">48</text>
    <text x="628" y="122" opacity="0.7">49</text>
    <text x="690" y="122" font-weight="700">50</text>
  </g>
  <g>
    <circle cx="256" cy="95" r="5" fill="currentColor"/>
    <circle cx="504" cy="95" r="5" fill="currentColor"/>
    <path d="M256,84 Q160,38 84,82" fill="none" stroke="#b45309" stroke-width="2" marker-end="url(#rl-arrow)"/>
    <path d="M504,84 Q600,38 676,82" fill="none" stroke="#b45309" stroke-width="2" marker-end="url(#rl-arrow)"/>
    <text x="180" y="40" font-size="13" fill="#b45309" text-anchor="middle">43 rounds down</text>
    <text x="580" y="40" font-size="13" fill="#b45309" text-anchor="middle">47 rounds up</text>
    <text x="380" y="152" font-size="12" fill="#b45309" text-anchor="middle">midpoint 45 — ties round up</text>
  </g>
</svg>`,
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Rounding',
              def: 'Replacing a number with the nearest multiple of a chosen power of ten — the nearest ten, hundred, thousand — so the result is close but easier to say and compute with.',
            },
            {
              term: 'Overestimate',
              def: 'An estimate larger than the true value: rounding $47$ up to $50$ overestimates by 3. Sums of rounded-up numbers overestimate in the same direction.',
            },
            {
              term: 'Underestimate',
              def: 'An estimate smaller than the true value: rounding $43$ down to $40$ underestimates by 3.',
            },
            {
              term: 'Leading-digit estimation',
              def: 'The coarsest useful estimate: keep only each number\'s first digit, fill the rest with zeros — $42 \\times 57 \\approx 40 \\times 60$. Fast, and usually within 10% of the truth.',
            },
            {
              term: 'Error bound',
              def: 'A guaranteed ceiling on how far an estimate can be from the truth: rounding to the nearest hundred keeps every error at or below 50 per number.',
            },
          ],
        },
        {
          kind: 'algorithm',
          title: 'Rounding a whole number to a given place',
          lines: [
            { code: 'Locate the target place (tens, hundreds, thousands, …).', note: 'Everything from that place leftward will survive.' },
            { code: 'Inspect the digit immediately to the RIGHT of it.' },
            { code: 'IF that digit ≥ 5: add 1 to the target-place digit.', note: 'The number has crossed the midpoint — step up.' },
            { code: 'IF that digit < 5: leave the target-place digit alone.' },
            { code: 'Replace every digit to the right of the target place with 0.' },
          ],
          note:
            'The procedure always terminates after one decision because a single digit (5 or not) settles which side of the midpoint the number lies on. Midpoints themselves — a 5 followed by all zeros — follow the tie convention: round up.',
        },
        {
          kind: 'example',
          title: 'Rounding 5,768 three ways',
          steps: [
            'To the nearest ten: keep the tens place (6), inspect the ones digit $8 \\ge 5$ — step the 6 up to 7, zero the ones: $5{,}768 \\to 5{,}770$.',
            'To the nearest hundred: keep the hundreds place (7), inspect the tens digit $6 \\ge 5$ — step the 7 up to 8, zero the tens and ones: $5{,}768 \\to 5{,}800$.',
            'To the nearest thousand: keep the thousands place (5), inspect the hundreds digit $7 \\ge 5$ — step the 5 up to 6, zero the rest: $5{,}768 \\to 6{,}000$.',
            'Notice the ladder: the same number becomes 5,770, 5,800 or 6,000 depending on how coarse we choose to be. Coarser is easier to say and less accurate — rounding is a *choice of resolution*, not a fixed answer.',
          ],
        },
        { kind: 'heading', text: 'Estimating sums, differences and products' },
        {
          kind: 'para',
          text: 'Estimation means rounding first, then computing with the rounded numbers. The craft is choosing the coarseness. Suppose we need $4{,}327 + 2{,}845$. To the nearest hundred: $4{,}300 + 2{,}800 = 7{,}100$ — a good working figure while shopping or sanity-checking. To the nearest thousand: $4{,}000 + 3{,}000 = 7{,}000$ — a good figure when we only care about the size of the answer. The exact sum is $7{,}172$, so the hundred-level estimate missed by 72 and the thousand-level by 172; both were honest about their purpose. For products, the leading-digit method is the workhorse: $42 \\times 57 \\approx 40 \\times 60 = 2{,}400$ against the exact $2{,}394$ — less than 1% away from two single-digit multiplications.',
        },
        {
          kind: 'example',
          title: 'Estimating a product two ways',
          steps: [
            'Compute $213 \\times 287$ exactly and we get $61{,}131$ — but often we only need to know "about sixty thousand".',
            'Leading-digit estimate: $213 \\to 200$, $287 \\to 300$, so $200 \\times 300 = 60{,}000$. Two non-zero digits of work.',
            'Error analysis: the estimate is off by $61{,}131 - 60{,}000 = 1{,}131$, which is $\\frac{1{,}131}{61{,}131} \\approx 1.9\\%$ of the true value — comfortably close for any "about" question.',
            'A finer estimate, if wanted: $210 \\times 290 = 60{,}900$, off by only $231$ ($0.4\\%$). Estimation has a dial, and experience turns it: coarse for speed, fine for closeness.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The close-numbers trap: rounding can erase the very gap you are measuring',
          text: 'Estimate $4{,}851 - 4{,}829$ to the nearest hundred: $4{,}900 - 4{,}800 = 100$. The exact answer is $22$ — the estimate is more than four times too large, and both inputs were rounded by less than 51 each! What happened: the two numbers are nearly equal, so their difference is *tiny compared to the rounding grain*. Coarse rounding moves each number by amounts comparable to (here, larger than) the gap between them, and the subtraction then measures the rounding noise instead of the real difference. The rule: when subtracting close numbers, do not round to a coarse common place — either compute exactly, keep a finer place, or round both numbers in the same direction so the gap survives. Remember this when decimals arrive: it is the same trap that makes beginners misjudge $0.51 - 0.49$.',
        },
        { kind: 'heading', text: 'Overestimates, underestimates, and when to round up on purpose' },
        {
          kind: 'para',
          text: 'Every rounding has a *direction*: up creates an overestimate, down an underestimate. In a sum, directions can cancel — one number rounded up, another down, errors pulling against each other. But some situations forbid one direction outright. If you are buying, you need at least enough money, so round prices *up*. If a school is hiring buses for $1{,}293$ students and each bus seats $55$, the division $1{,}293 \\div 55 \\approx 23.5$ is arithmetically fine and practically meaningless: $23$ buses seat $55 \\times 23 = 1{,}265$ students — twenty-eight left standing. The answer is $24$ buses, because "half a bus" does not exist. Mathematicians name this operation *rounding up regardless of distance* (the "ceiling"), to distinguish it from nearest-rounding; the skill is knowing which one the real world is asking for.',
        },
        {
          kind: 'example',
          title: 'The bus problem, worked honestly',
          steps: [
            'Question: how many 55-seat buses carry $1{,}293$ students, with nobody left behind?',
            'Multiply up to bracket the answer: $55 \\times 23 = 1{,}265 < 1{,}293$ — twenty-three buses are short by $1{,}293 - 1{,}265 = 28$ students.',
            '$55 \\times 24 = 1{,}320 \\ge 1{,}293$ — twenty-four buses seat everyone, with $27$ seats to spare.',
            'Answer: $24$ buses. Note that plain "rounding to the nearest whole number" also gives 24 here ($23.5$ rounds up), but for the wrong reason — the midpoint tie. The correct reasoning is the *ceiling* logic: any shortfall is a failure, so take the first whole number that works. In capacity, money and safety questions, ask "which direction hurts?" before choosing.',
          ],
        },
        { kind: 'heading', text: 'How wrong can an estimate be? Error bounds' },
        {
          kind: 'derivation',
          title: 'A guaranteed error bound for a sum of rounded numbers',
          statement:
            'Suppose each of several whole numbers is rounded to the nearest $10^{n}$. How far can the sum of the rounded numbers sit from the true sum, in the worst case? We derive a bound that holds always — not "usually".',
          steps: [
            {
              label: 'Bound one rounded number',
              formula: '|x - r| \\;\\le\\; \\tfrac{1}{2} \\times 10^{n}',
              explanation:
                'Let $r$ be $x$ rounded to the nearest $10^{n}$. The neighbouring multiples of $10^{n}$ sit $10^{n}$ apart, and rounding picks the nearer one, so the distance to the chosen multiple cannot exceed half the gap. With the ties-round-up convention, the bound is attained exactly at midpoints: $450$ rounds to $500$ with error exactly $50 = \\tfrac12 \\times 100$.',
            },
            {
              label: 'Let the errors pile up in the worst direction',
              formula: '\\left|\\sum (r_i - x_i)\\right| \\;\\le\\; \\sum |r_i - x_i| \\;\\le\\; k \\times \\tfrac{1}{2} \\times 10^{n}',
              explanation:
                'When $k$ rounded numbers are added, each carries its own error $r_i - x_i$, positive or negative. Errors in opposite directions cancel; errors in the same direction reinforce. The worst case is every error pointing the same way, so the total error is at most $k$ times the single-number bound. (This "triangle" step — bounding a sum of magnitudes by the sum of bounds — is a tool you will meet formally much later.)',
            },
            {
              label: 'Instantiate for four numbers to the nearest hundred',
              formula: 'k = 4,\\; n = 2 \\;\\Rightarrow\\; \\text{error} \\le 4 \\times 50 = 200',
              explanation:
                'Four numbers, each rounded to the nearest hundred, cannot mislead the total by more than 200. And 200 is genuinely reachable: $150 + 250 + 350 + 450 = 1{,}200$, while the rounded sum is $200 + 300 + 400 + 500 = 1{,}400$ — every number sat exactly on a midpoint and rounded up, landing the error precisely at the bound.',
            },
          ],
          result:
            'A sum of $k$ numbers each rounded to the nearest $10^{n}$ differs from the true sum by at most $k \\times \\tfrac12 \\times 10^{n}$. The bound is tight — midpoints rounding up achieve it exactly.',
        },
        {
          kind: 'formula',
          name: 'Maximum error of one rounded number',
          latex: '|x - r| \\;\\le\\; \\tfrac{1}{2} \\times 10^{n}',
          note: 'r = x rounded to the nearest 10^n. Nearest ten: at most 5. Nearest hundred: at most 50. Equality exactly at midpoints (tie rounds up).',
        },
        {
          kind: 'formula',
          name: 'Error bound for a sum of k rounded numbers',
          latex: '\\left|\\text{estimate} - \\text{truth}\\right| \\;\\le\\; k \\times \\tfrac{1}{2} \\times 10^{n}',
          note: 'Worst case: every rounding error pushes the same direction. Four numbers to the nearest hundred: at most 4 × 50 = 200.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Banker\'s rounding: the midpoint convention is a choice, and computers chose differently',
          text: 'Why do ties round up? Honest answer: it is a convention, chosen because it is simple and because half the numbers in a list rounding up seems fair. But it carries a bias. Round the ten possible final digits (0 through 9) to the nearest ten and tally the errors: $0, -1, -2, -3, -4, +5, +4, +3, +2, +1$ — the sum is $+5$, an average drift of $+0.5$ per number. Over a million payroll or interest computations, that drift compounds into real money. So finance and the IEEE floating-point standard (the arithmetic inside every computer) often use *round-half-to-even*: a tie goes to whichever neighbour ends in an even digit. $15 \\to 20$ (tens digit 2 is even), but $25 \\to 20$ (tens digit 2 even, beating 30), $35 \\to 40$, $45 \\to 40$. The errors at midpoints then alternate $+5, -5, +5, -5$ and cancel in pairs. You will meet the details again in computer science; for now, know that "ties round up" is the school convention, and it is not the only honourable one.',
        },
        {
          kind: 'table',
          caption: 'Rounding errors by final digit (to the nearest ten, school convention)',
          head: ['Final digit', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          rows: [
            ['Rounds to', 'same ten', 'down', 'down', 'down', 'down', 'up', 'up', 'up', 'up', 'up'],
            ['Error', '$0$', '$-1$', '$-2$', '$-3$', '$-4$', '$+5$', '$+4$', '$+3$', '$+2$', '$+1$'],
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Round $3{,}462$ to the nearest hundred.',
              options: ['$3{,}400$', '$3{,}460$', '$3{,}500$', '$3{,}000$'],
              answer: 2,
              explain:
                'Keep the hundreds place (4) and inspect the tens digit: $6 \\ge 5$, so the 4 steps up to 5 and the tail zeros out: $3{,}500$. Option $3{,}460$ is rounding to the nearest *ten* (a finer choice), and $3{,}400$ forgets the carry — the classic slip of dropping the tail without stepping up.',
            },
            {
              q: 'Estimate $2{,}878 + 3{,}214$ to the nearest thousand.',
              options: ['$5{,}000$', '$6{,}000$', '$7{,}000$', '$6{,}100$'],
              answer: 1,
              explain:
                'Round each addend: $2{,}878 \\to 3{,}000$ (hundreds digit 8 says step up) and $3{,}214 \\to 3{,}000$ (hundreds digit 2 says stay). Estimate: $3{,}000 + 3{,}000 = 6{,}000$; the exact sum is $6{,}092$, so we are off by under a hundred. Option $6{,}100$ comes from rounding to hundreds ($2{,}900 + 3{,}200$) — a fine estimate, but a different question than the one asked.',
            },
            {
              q: 'Which is the standard leading-digit estimate of $396 \\times 22$?',
              options: ['$400 \\times 20 = 8{,}000$', '$390 \\times 20 = 7{,}800$', '$400 \\times 22 = 8{,}800$', '$396 \\times 20 = 7{,}920$'],
              answer: 0,
              explain:
                'Leading-digit estimation rounds *each* factor to its leading digit\'s place: $396 \\to 400$ and $22 \\to 20$, giving $8{,}000$. The exact product is $8{,}712$, so the estimate is about 8% low — the accepted price of a two-second computation. Options (c) and (d) keep one factor exact, which is partial arithmetic, not estimation; (b) keeps a second digit, a finer but slower choice.',
            },
            {
              q: 'A calculator claims $4{,}851 - 4{,}829 = 100$. Rounded to the nearest hundred, the estimate also gives 100. What is really going on?',
              options: [
                'The calculator is right; the subtraction is 100',
                'The true difference is 22 — close numbers make coarse rounded subtraction wildly misleading',
                'The rounding was done incorrectly; it should give 20',
                'Subtraction cannot be estimated at all',
              ],
              answer: 1,
              explain:
                'The exact difference is $4{,}851 - 4{,}829 = 22$. Both numbers round up to different hundreds ($4{,}900$ and $4{,}800$), and the rounding *moves* ($+49$ and $-29$) are larger than the gap being measured, so the estimate lands at 100 — more than four times the truth. The lesson is not "never estimate subtractions" but "never round close numbers to a coarse common place". Keep finer places, or subtract exactly.',
            },
            {
              q: 'When is deliberately rounding UP (not to the nearest) the correct move?',
              options: [
                'Always — rounding up is safer in every situation',
                'When an underestimate is unacceptable — bus seats for everyone, money for the bill, paint for the wall',
                'When the discarded digit is exactly 5',
                'Never — nearest rounding is the only mathematical rule',
              ],
              answer: 1,
              explain:
                'Nearest-rounding minimises per-number error, but some real-world failures are one-sided: a shortfall of seats or rupees cannot be tolerated, so you round up on purpose (the "ceiling"). Option (c) confuses the midpoint tie of nearest-rounding with deliberate upward rounding — related ideas, different purposes. And (a) is wrong because overestimates have their own costs: over-ordering, over-budgeting, wasted material.',
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
                  q: 'Round $6{,}749$ to the nearest ten, hundred and thousand.',
                  solution:
                    'Nearest ten: keep the tens digit (4), inspect ones $9 \\ge 5$ — step up: $6{,}750$. Nearest hundred: keep the hundreds digit (7), inspect tens $4 < 5$ — stay: $6{,}700$. Nearest thousand: keep the thousands digit (6), inspect hundreds $7 \\ge 5$ — step up: $7{,}000$. Note the three answers move by different amounts (1, 49, 251) — the finer the place, the smaller the guaranteed error, and the more the answer depends on the digit structure.',
                },
                {
                  q: 'Estimate $3{,}912 + 4{,}882$ to the nearest hundred, then compute the exact sum and the error.',
                  solution:
                    'Round each addend to hundreds: $3{,}912 \\to 3{,}900$ (tens digit 1, stay) and $4{,}882 \\to 4{,}900$ (tens digit 8, step up). Estimate: $3{,}900 + 4{,}900 = 8{,}800$. Exact: $3{,}912 + 4{,}882 = 8{,}794$. Error: $8{,}800 - 8{,}794 = 6$ — one addend rounded down by 12, the other up by 18, and the errors nearly cancelled. The error bound for two hundred-rounded numbers is $2 \\times 50 = 100$; actual error 6 shows how much cancellation is typical.',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A school must transport $1{,}293$ students. Each bus seats $55$. How many buses are needed, and why is "rounding to nearest" the wrong tool here?',
                  solution:
                    'Bracket the count: $55 \\times 23 = 1{,}265$ (short by $28$ students — unacceptable), while $55 \\times 24 = 1{,}320 \\ge 1{,}293$ (everyone seated). Answer: $24$ buses. Plain nearest-rounding of the quotient $1{,}293 \\div 55 \\approx 23.5$ happens to give 24 here, but for an accidental reason: the exact quotient sits almost exactly at a midpoint, and if it had been $23.4$ the "nearest" rule would have delivered 23 buses and twenty-eight stranded students. Capacity questions demand the ceiling — the first whole number that works — because the cost of a shortfall (stranded students) is not symmetric with the cost of a spare bus.',
                },
                {
                  q: 'A calculator displays $4{,}327 + 2{,}845 = 32{,}777$. Use estimation to prove the display is wrong, and identify the likely typo.',
                  solution:
                    'Estimate to the nearest thousand: $4{,}000 + 3{,}000 = 7{,}000$ (even the crudest leading-digit view: "four thousand plus three thousand"). The displayed $32{,}777$ is roughly five times too large — no honest rounding of these inputs can reach it. The likely typo: the comma or a stray digit turned $2{,}845$ into $28{,}450$, since $4{,}327 + 28{,}450 = 32{,}777$ exactly. This is estimation\'s highest daily use: not replacing exact arithmetic, but standing guard over it. The exact sum, for the record, is $7{,}172$.',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Estimate $12{,}903 + 2{,}891 - 3{,}905$ to the nearest thousand, and compare with the exact value.',
                  solution:
                    'Round each to the nearest thousand: $12{,}903 \\to 13{,}000$ (hundreds digit 9), $2{,}891 \\to 3{,}000$ (hundreds digit 8), $3{,}905 \\to 4{,}000$ (hundreds digit 9). Estimate: $13{,}000 + 3{,}000 - 4{,}000 = 12{,}000$. Exact: $12{,}903 + 2{,}891 - 3{,}905 = 11{,}889$. Error: $111$, comfortably inside the guaranteed bound of $3 \\times 500 = 1{,}500$ for three thousand-rounded numbers. Strategy note for exams: with mixed operations, round *before* combining — rounding the intermediate results instead compounds the error.',
                },
                {
                  q: '(Exam-style, foundation level) A shop bill reads ₹249, ₹375, ₹89 and ₹1,299. Estimate the total to a useful figure, and state whether your estimate is safe for a wallet containing exactly that estimate.',
                  solution:
                    'Round to the nearest fifty or hundred for speed: $250 + 400 + 90 + 1{,}300 = 2{,}040$. (A ₹50-grain estimate: $250 + 400 + 100 + 1{,}300 = 2{,}050$; to hundreds: $200 + 400 + 100 + 1{,}300 = 2{,}000$.) Exact total: $249 + 375 + 89 + 1{,}299 = 2{,}012$. The ₹2,040 estimate is *not* wallet-safe in general: estimates straddle the truth, and a wallet funded with an estimate below the bill fails at the counter. For purchases the safe figure rounds every price UP — here $250 + 400 + 90 + 1{,}300 = 2{,}040$ already sits above $2{,}012$ by luck of the digits; the guaranteed-safe bound is the ceiling-style $300 + 400 + 100 + 1{,}300 = 2{,}100$. Direction, not closeness, is what "safe" means.',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Four quantities are each rounded to the nearest hundred before being added. (a) Show the total error cannot exceed 200. (b) Exhibit four numbers for which the error equals exactly 200.',
                  solution:
                    '(a) Each rounding replaces $x$ by the nearer multiple of 100, so the individual error satisfies $|r - x| \\le 50$ (equality exactly at midpoints, which round up). Summing four: $|\\sum (r_i - x_i)| \\le \\sum |r_i - x_i| \\le 4 \\times 50 = 200$ — errors in opposite directions cancel, so the worst case is all four pushing the same way. (b) Take four exact midpoints: $150 + 250 + 350 + 450 = 1{,}200$, while each rounds up to its next hundred: $200 + 300 + 400 + 500 = 1{,}400$. The estimate exceeds the truth by exactly $4 \\times 50 = 200$ — the bound is attained, so no smaller ceiling is guaranteed. (One hundred-grain refinement: with round-half-to-even, 250 and 450 would round *down*, and this worst case would soften to +100 — conventions have consequences.)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The ten possible final digits 0–9 are rounded to the nearest ten with the school (ties-up) rule. (a) Tabulate the ten rounding errors and their sum. (b) Show how round-half-to-even makes the midpoint errors cancel in pairs, and explain in one paragraph why the IEEE 754 floating-point standard chose it.',
                  solution:
                    '(a) Final digit 0: error $0$. Digits 1–4 round down: errors $-1, -2, -3, -4$. Digit 5 is a tie and rounds up: $+5$. Digits 6–9 round up: $+4, +3, +2, +1$. Sum: $0 - 10 + 15 = +5$ — an average bias of $+0.5$ per rounded number, always in the *upward* direction. (b) Round-half-to-even sends a tie to whichever neighbouring ten is even. The midpoints 15, 25, 35, 45 round to 20, 20, 40, 40 — errors $+5, -5, +5, -5$ — cancelling in pairs, so the drift over many roundings is zero (the digit-level sum becomes 0). Why IEEE 754 cares: computer arithmetic rounds *billions* of times per second in long pipelines (summations, matrix products, interest accruals). A systematic +0.5-per-operation bias would grow without bound, quietly inflating totals and skewing statistics; an unbiased rule makes the rounding noise behave like random noise that grows only as the square root of the count. The "even" target is chosen because it needs no extra information beyond the digits already present — an odd/even test is the cheapest possible tie-breaker.',
                },
              ],
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Estimation questions test judgement, not arithmetic. Bank and SSC quantitative sections run "approximation" item banks where you must pick the rounding grain that makes the options separable; SAT and ACT include "best estimate" items where the wrong-but-close options are traps for over-precise arithmetic; CUET and NTSE aptitude papers hide bus/capacity problems whose entire point is choosing the ceiling over nearest-rounding; physics and chemistry numericals award method marks for a stated order-of-magnitude sanity check. The exam habit that wins: write the rounded form *before* computing, so the examiner sees the estimate as a method — and always ask which direction the error is allowed to point.',
        },
        {
          kind: 'para',
          text: 'Chapter 1 is complete. You began it unable to say precisely what a number is; you end it reading numerals structurally, comparing them with a proof in hand, and blurring them with measured confidence — the three skills the whole house of arithmetic stands on. The next chapter picks up the overflow argument from Lesson 1.1 and turns it into carrying, borrowing, long multiplication and long division: the four operations, each of them nothing more than place value doing work one seat at a time. Nothing ahead will be harder than what you already own; it will only be longer.',
        },
      ],
    },
  ],
}
