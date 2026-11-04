import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 7: Integers
 *
 * LESSONS WRITTEN: 7.1 Negative Numbers and Why They Exist (run 33,
 * 2026-11-04) — the chapter opens where the counting numbers break: every
 * quantity the world keeps score of runs in two directions, so a zero is
 * CHOSEN (sea level, the freezing point, the ground floor) and one
 * direction is named positive, the opposite negative; the Definition
 * callout in the formal shape ("the integers are said to be ...") as
 * equation tag 1 (Z = {..., -3, -2, -1, 0, 1, 2, 3, ...} — the symbol
 * honours German Zahlen), with the nesting N ⊂ W ⊂ Z as equation tag 2;
 * the roman example-run; the zero-is-neither Caution; figure 1 the
 * number line grown a left half (mirror-symmetric ticks at 50 px per
 * step, the −3/3 mirror pair with its two 3-step braces, solid
 * triangular arrowheads); the ordering law "right beats left" with the
 * −8 < −3 trap ("more debt is less wealth") and the closer-to-zero-wins
 * Note; Illustrations on the sign-fill −40 < +4, the ascending five,
 * the opposites of 9/−6/0, the absolute values |−8| |8| |0|, the lift
 * B2 → level 7 (9 storeys), the Delhi–New York clock (9:00 pm IST =
 * 10:30 am, the 10.5-hour gap), and the Vostok −89.2 °C ↔ Phalodi
 * 51.0 °C line distance (140.2 degrees); the double duty of the − sign
 * (name vs instruction) and the double-reflection derivation
 * −(−n) = n; absolute value's first look (full development waits at
 * 7.4); the signed-numbers-in-the-wild table (temperature, elevation,
 * balance, floor, time zone); figure 2 the elevation section (Everest
 * +8848.86 m, the Dead Sea surface −439.78 m as of 2025, schematic —
 * the two depth guides deliberately do not share a scale, altitude line
 * drawn apex-to-datum inside the triangle); the historical callout
 * (Chinese red/black counting rods by ~200 BCE, the Nine Chapters with
 * Liu Hui's 263 CE commentary, Brahmagupta's fortunes and debts of
 * 628 CE, Descartes's 1637 "false roots", Maseres's 1758 complaint,
 * 19th-century acceptance); the exam corner (sign-fill, greatest
 * negative integer, additive-inverse matching, ordering and temperature
 * shapes in the SSC CHSL / RRB NTPC / banking banks — shapes cited, no
 * question reproduced); 8 terms, 5-quiz keys 1/2/2/0/1 and 12 exercises
 * L1–L6 (L6: the mirror-symmetry proof cashed at n = 5; the underground
 * mall B3 → level 9 = 12 storeys, return 24). Scope guard: no integer
 * arithmetic is taught here — every "distance" is counted in steps on
 * the line, and the operations open in 7.2. Authored natively in the
 * Cengage voice + solution chain; every number pre-verified by
 * scripts/verify-unit-7.ts (70 checks, A–I).
 *
 * LESSON 7.2 Adding and Subtracting Integers (run 34, 2026-11-04) —
 * the line learns to move, and 7.1's four promissory notes are cashed:
 * the movement model (final position = starting position + the second
 * movement — the walk), figure 1 the two-leg walk of (−4) + 11 (cubic
 * arcs with solid heads landing on anchor dots at 0/−4/7, both braces
 * on one 50-px scale); the like-signs rule derived (legs concatenate),
 * the different-signs rule netted (larger magnitude wins the sign; a
 * tie lands on 0), the sign-case table; the five properties of integer
 * addition (closure, commutative, associative, identity, inverse) each
 * with a script-verified instance — the inverse law a + (−a) = 0 as
 * equation tag 1 CASHING 7.1's promissory note; subtraction derived as
 * adding the opposite, a − b = a + (−b) as equation tag 2 (grid-checked
 * over [−10,10]² in the verify script); figure 2 the subtraction map
 * (panel 1 the mirror flip −(−2) = 2 with a two-headed swap-arc, panel
 * 2 the walk 7 + 2 = 9) CASHING the lift debt; the mall 9 − (−3) = 12
 * cashed; the double-sign table + the three-sign-stack Caution;
 * Brahmagupta's zero-subtraction verses derived on the line (a debt
 * subtracted from zero is a fortune: 0 − (−5) = 5); net-change chains
 * (the ledger 2500 − 3600 + 1900 = 800 with a real overdraft stage;
 * the thermometer −4 + 11 − 9 = −2; Priya 1850 − 2400 + 900 = 350;
 * Srinagar −6 + 8 − 13 + 5 = −6; the submarine −240 + 85 − 130 =
 * −285 m), successor/predecessor and the missing-addend shape; 8
 * terms, 5-quiz keys 0/1/2/0/3 and 12 exercises L1–L6 (L6: the
 * zero-subtraction derivation cashed at 12; the inequality set
 * {−1, 0, 1, 2} summing to 2). Scope guard: no integer MULTIPLICATION
 * or division — 7.3 owns the products. Every number pre-verified by
 * scripts/verify-unit-7.ts (148 checks, A–S).
 *
 * References for this unit: NCERT Ganita Prakash class-6 ch. 10 "The
 * Other Side of Zero" (the other side of the number line — narrative
 * cited, not reproduced) + class-7 part-2 ch. 2 "Operations with
 * Integers" (the operations sequel for 7.2–7.3) + Khattar, Quantitative
 * Aptitude (4e) number-system staples — see docs/project/SOURCE_LOG.md.
 * Exposition original.
 */
export const chapter07: Chapter = {
  number: 7,
  slug: 'integers',
  title: 'Integers',
  summary:
    'Negative numbers earn their place on the number line: temperatures, debts and directions; the sign rules derived rather than memorised; absolute value as distance; and the coordinate plane preview.',
  status: 'in-progress',
  plannedLessons: [
    'Multiplying Integers and the Sign Rules',
    'Absolute Value as Distance',
  ],
  lessons: [
    {
      id: 'fm-negative-numbers-why-they-exist',
      number: '7.1',
      title: 'Negative Numbers and Why They Exist',
      concepts: [
        'Counting numbers cannot name direction',
        'Opposite quantities and the chosen zero',
        'The integers and the symbol ℤ',
        'The number line grows a left half',
        'Ordering: right beats left',
        'Opposite (additive inverse) numbers',
        'Absolute value as distance from zero',
        'Signed numbers in the wild',
      ],
      objectives: [
        'Say precisely why a system of counting numbers freezes the moment a quantity changes direction',
        'Read any signed number by naming its chosen zero and its two directions',
        'Locate, compare and order integers on the extended number line — including the −8 versus −3 trap',
        'Find the opposite of any integer, and read the two hats the − sign wears',
        'Evaluate first-look absolute values as distances from zero',
      ],
      prerequisites: ['fm-numbers-digits-place-value', 'fm-comparing-ordering-numbers'],
      sources: ['ncert-math6-ch10', 'ncert-math7-p2-ch2', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Every number this book has used so far was born from counting. The naturals of chapter 1 counted sheep and citizens; the operations of chapter 2 combined counts; the primes of chapter 3 took counts apart; chapters 4 and 5 cut and re-stitched them into fractions and decimals; chapter 6 compared them. Through all six chapters the number line ran from $0$ rightward, and nothing in it ever moved left. The line had a wall at zero.',
        },
        {
          kind: 'para',
          text: 'The world never signed that contract. Winter mornings dip below the freezing point. Lifts descend below the ground floor. Bank accounts slip into overdraft. Land sinks below the sea. Each of these is an ordinary quantity that reversed its direction — and no counting number can follow it there. "Four degrees below zero" is not a number our chapters 1–6 own; the phrase borrows words to say what a numeral should say alone. This lesson builds the missing half of the number system, and it begins by looking hard at what all the freezing, sinking and overdrawing have in common.',
        },
        { kind: 'heading', text: 'When counting is not enough' },
        {
          kind: 'para',
          text: 'Look at the failing cases one by one. Each is a quantity with a natural starting level and two opposite directions away from it. The starting level is the natural zero; the two directions are interchangeable — which one we call "up" is our choice, but once chosen it must be stated and kept.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**temperature**: the freezing point of water makes a natural zero; degrees above it and degrees below it are the two directions (Vostok Station, Antarctica, once recorded $-89.2$°C — the coldest air temperature ever measured on Earth).',
            '**elevation**: sea level is the zero; heights above it and depths below it are the directions (Mount Everest climbs $8848.86$ m above the zero; the Dead Sea\u2019s surface sits about $440$ m below it).',
            '**money**: a balance with no overdraft is the zero; deposits move one way, withdrawals and overdrafts the other.',
            '**building floors**: the ground floor is the zero; levels climb, basements descend ($B2$ is really $-2$ wearing a lift-button\u2019s clothes).',
            '**time zones**: the UTC meridian is the zero; India keeps $UTC+5{:}30$, New York in winter keeps $UTC-5$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The chosen zero and the two directions',
          text: 'A quantity that can move in two opposite directions is measured from a **chosen zero** — a starting level agreed by convention (sea level, the freezing point, the ground floor, UTC). One direction is named the **positive** direction and written with $+$, or with no sign at all; the opposite direction is named **negative** and written with $-$. The chosen zero itself has no direction — it is where the directions meet.',
        },
        {
          kind: 'para',
          text: 'The convention is genuinely a choice. India could have measured elevation from the Delhi mean sea level; the world agreed on a sea level instead, so that Mount Everest and the Dead Sea wear heights from the same zero. Thermometry could have chosen any liquid\u2019s behaviour; Celsius chose water\u2019s freezing and boiling. What is *not* a choice is the bookkeeping discipline: name the zero, name the positive direction, and every reading becomes one number with its sign built in.',
        },
        { kind: 'heading', text: 'The integers' },
        {
          kind: 'para',
          text: 'The new numbers are said to be the old ones together with their mirrors. Formally:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Integers',
          text: 'The collection of whole numbers together with the negative of every natural number is said to be the set of **integers**. Every integer is one of the counting numbers $1, 2, 3, \\ldots$, the number $0$, or one of $-1, -2, -3, \\ldots$. Thus the integers are the whole numbers given a left half.',
        },
        {
          kind: 'equation',
          latex: '\\mathbb{Z} \\;=\\; \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}',
          note: 'The integers. The letter $\\mathbb{Z}$ honours the German *Zahlen*, "numbers" — the name stuck because German mathematicians drove much of the number-system\u2019s 19th-century formalisation. The three dots on both sides say the pattern continues without end in each direction.',
        },
        {
          kind: 'para',
          text: 'A **negative number** is an integer written with the $-$ sign — a debt, a depth, a temperature below the chosen zero. A **positive number** is one written with $+$, or with no sign at all — the naturals of chapter 1 in their new dress. The two words sort every nonzero integer into exactly one class, and the sorting matters: the old numbers have not been replaced, they have been *enlarged*.',
        },
        {
          kind: 'equation',
          latex: '\\mathbb{N} \\;\\subset\\; \\mathbb{W} \\;\\subset\\; \\mathbb{Z}',
          note: 'The nesting so far: the naturals $1, 2, 3, \\ldots$ sit inside the wholes $0, 1, 2, \\ldots$, which sit inside the integers. Chapters 4 and 5 filled the gaps *between* the wholes with fractions and decimals; the integers extend the line itself, past zero.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$-12$, $-7$, $-1$ are negative integers: they sit left of the chosen zero, one step, seven steps, twelve steps out.',
            '$0$ is an integer with no direction: it is neither positive nor negative, being the very zero the directions are measured from.',
            '$1$, $7$, $12$ are positive integers — the natural numbers of chapter 1, seen now as the right half of something larger.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Zero is neither positive nor negative',
          text: 'Students mark zero "positive" more often than any other error in this chapter — the line\u2019s tick at $0$ looks like it belongs to the right side. It belongs to neither. "Positive" means *to the right of zero* and "negative" means *to the left of zero*; zero cannot be to the side of itself. Zero is an integer, a whole number, and a very useful number — it is just not a *signed* one.',
        },
        { kind: 'heading', text: 'The number line grows a left half' },
        {
          kind: 'para',
          text: 'Chapter 1 drew the number line from $0$ rightward: a ray, walled at zero. The integers complete it into a full straight line. Keep the tick marks a uniform one step apart — the same step size on both sides — and let the ticks repeat leftward: $-1$, $-2$, $-3$, and so on without end. What emerges is a line with a perfect mirror at its centre: every point on the right has a twin at the same distance on the left.',
        },
        {
          kind: 'figure',
          caption:
            'The number line grows a left half. The ticks stay one step apart on both sides of the chosen zero, so the line is mirror-symmetric about $0$: $-3$ and $3$ are three steps out in opposite directions, each the other\u2019s opposite. The order is now global — right beats left — so $-1$ sits between $-2$ and $0$, and every negative loses to every positive.',
          svg: `<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The number line extended left of zero, with ticks from minus six to six, the mirror pair minus three and three highlighted, and two braces each showing three steps from zero">
  <line x1="40" y1="100" x2="720" y2="100" stroke="currentColor" stroke-width="2"/>
  <polygon points="40,100 54,93 54,107" fill="currentColor"/>
  <polygon points="720,100 706,93 706,107" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="80" y1="92" x2="80" y2="108"/><line x1="130" y1="92" x2="130" y2="108"/>
    <line x1="180" y1="92" x2="180" y2="108"/><line x1="230" y1="92" x2="230" y2="108"/>
    <line x1="280" y1="92" x2="280" y2="108"/><line x1="330" y1="92" x2="330" y2="108"/>
    <line x1="380" y1="90" x2="380" y2="110"/>
    <line x1="430" y1="92" x2="430" y2="108"/><line x1="480" y1="92" x2="480" y2="108"/>
    <line x1="530" y1="92" x2="530" y2="108"/><line x1="580" y1="92" x2="580" y2="108"/>
    <line x1="630" y1="92" x2="630" y2="108"/><line x1="680" y1="92" x2="680" y2="108"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="80" y="130">−6</text><text x="130" y="130">−5</text><text x="180" y="130">−4</text>
    <text x="230" y="130">−3</text><text x="280" y="130">−2</text><text x="330" y="130">−1</text>
    <text x="380" y="130">0</text>
    <text x="430" y="130">1</text><text x="480" y="130">2</text><text x="530" y="130">3</text>
    <text x="580" y="130">4</text><text x="630" y="130">5</text><text x="680" y="130">6</text>
  </g>
  <line x1="380" y1="58" x2="380" y2="150" stroke="currentColor" stroke-width="1" stroke-dasharray="5 5" opacity="0.55"/>
  <text x="380" y="50" font-size="12" fill="currentColor" text-anchor="middle">the mirror: 0</text>
  <circle cx="230" cy="100" r="5" fill="currentColor"/>
  <circle cx="530" cy="100" r="5" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="230" y1="160" x2="380" y2="160"/>
    <line x1="230" y1="154" x2="230" y2="166"/>
    <line x1="380" y1="154" x2="380" y2="166"/>
    <line x1="380" y1="160" x2="530" y2="160"/>
    <line x1="530" y1="154" x2="530" y2="166"/>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="305" y="182">3 steps</text>
    <text x="455" y="182">3 steps</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read figure 1 twice, once for order and once for symmetry. For order: the line\u2019s rule from chapter 1 — the further right, the greater — now runs the whole way, so $-3 < -1$ because $-3$ stands left of $-1$, and $0 < 4$ for the old reason. For symmetry: the dashed mirror at $0$ reflects every point to its twin; $-3$ and $3$ are three steps out in opposite directions, and the two braces underneath measure them equal.',
        },
        { kind: 'heading', text: 'Ordering: right beats left' },
        {
          kind: 'para',
          text: 'The extended line settles every comparison with one sentence: **of two integers, the one further to the right is the greater**. No exceptions, no case analysis — the line is the law. But the sentence has a sting in its left half. On the right side, "further out" meant bigger: $8 > 3$. On the left, further out means *smaller*: $-8$ stands further from zero than $-3$, so $-8 < -3$, even though $8$ is bigger than $3$. The magnitude and the number have come apart, and exams set questions on exactly this seam.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Among negatives, closer to zero wins',
          text: 'For two positive integers the larger magnitude is the larger number. For two negative integers it is the reverse: the one **closer to zero** is the greater. The debt reading explains it — owing Rs $3$ is better than owing Rs $8$, so $-3 > -8$; the thermometer agrees, since $-3$°C is warmer than $-8$°C. "More debt is less wealth" is the whole law in six words.',
        },
        {
          kind: 'example',
          title: 'Insert the correct sign between $-40$ and $+4$.',
          steps: [
            'Now, $-40$ is forty steps left of zero and $+4$ is four steps right.',
            'So $-40$ stands far to the left of $+4$ — every negative loses to every positive.',
            'Hence $-40 < +4$: forty steps of wrong direction cannot beat four steps of right direction.',
          ],
        },
        {
          kind: 'example',
          title: 'Arrange in ascending order: $-7, \\;4, \\;-2, \\;0, \\;5$.',
          steps: [
            'Now, ascending means left to right on the line.',
            'So walk the line: the negatives first, deepest out first — $-7$, then $-2$; then the zero; then the positives, nearest first — $4$, then $5$.',
            'Hence $-7 < -2 < 0 < 4 < 5$ — and the check is the picture: five ticks in one left-to-right sweep.',
          ],
        },
        {
          kind: 'para',
          text: 'Three facts the line certifies are worth collecting, because every ordering question in every exam is one of them in disguise:',
        },
        {
          kind: 'list',
          items: [
            'every integer has exactly one opposite, and $0$ is its own opposite — the mirror never blurs;',
            'any two integers compare in exactly one way: $a < b$, $a = b$, or $a > b$ — distinct ticks never tie;',
            'among two negatives, the one closer to zero is the greater — the left half runs against the magnitude.',
          ],
        },
        { kind: 'heading', text: 'Opposites: the mirror pair' },
        {
          kind: 'para',
          text: 'The mirror of figure 1 deserves a name. For any integer, the integer at the same distance from zero on the opposite side is called its **opposite**. The opposite of $9$ is $-9$; the opposite of $-6$ is $6$; the opposite of $0$ is $0$, since zero is its own mirror. The opposite is the same size of quantity pointed the other way — a deposit of nine rupees against a debt of nine rupees, the ninth floor against the ninth basement.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Opposite (additive inverse)',
          text: 'For an integer $n$, the integer $-n$ — the number as far from $0$ as $n$ but in the opposite direction — is said to be the **opposite** of $n$, also called its **additive inverse**. Thus the opposite of $9$ is $-9$, the opposite of $-6$ is $6$, and the opposite of $0$ is $0$. The name "additive inverse" is a promissory note: Lesson 7.2 will cash it, showing that adding an integer to its opposite lands exactly on zero.',
        },
        {
          kind: 'para',
          text: 'Here the $-$ sign quietly took on a second job, and fluency in this chapter means seeing both hats clearly. Worn as a **name**, the $-$ in $-3$ is part of the numeral: "negative three", the point three steps left of zero. Worn as an **instruction**, the $-$ in $-(-3)$ is a verb: "take the opposite of negative three". Same squiggle, two grammars — and the instruction hat can stack.',
        },
        {
          kind: 'derivation',
          title: 'Why the opposite of the opposite returns home',
          statement:
            'Applied once, the instruction "take the opposite" reflects a number across the zero. Applied twice, where does it land? The mirror argument answers for every integer at once.',
          steps: [
            {
              label: 'Take any integer',
              formula: 'n',
              explanation:
                'It sits $n$ steps from zero — to the right if $n$ is positive, to the left if negative. Fix a direction for $n$ and call it the starting direction.',
            },
            {
              label: 'Apply the opposite once',
              formula: '-n',
              explanation:
                'The reflection across $0$ keeps the distance — $n$ steps, unchanged — and flips the direction to its opposite.',
            },
            {
              label: 'Apply it again',
              formula: '-(-n)',
              explanation:
                'A second reflection flips the flipped direction. Two mirror bounces in a corridor return you where you started; the distance never moved.',
            },
            {
              label: 'Conclude',
              formula: '-(-n) \\;=\\; n',
              explanation:
                'The two reflections cancel for every integer — positive, negative, and the fixed point $0$, where each bounce changes nothing. Cashed at $n = 6$: $-(-6) = 6$.',
            },
          ],
          result: 'The opposite of the opposite of any integer $n$ is $n$ itself: $-(-n) = n$.',
        },
        {
          kind: 'example',
          title: 'Find the opposite of $9$, of $-6$, and of $0$.',
          steps: [
            'Now, the opposite keeps the distance and flips the direction.',
            'So the opposite of $9$ is $-9$; the opposite of $-6$ is $-(-6) = 6$, by the double reflection; the opposite of $0$ is $0$.',
            'Hence $-9$, $6$ and $0$ — and notice the last one: zero is the mirror\u2019s fixed point, the only integer that is its own opposite.',
          ],
        },
        { kind: 'heading', text: 'How far from zero: absolute value\u2019s first look' },
        {
          kind: 'para',
          text: 'The mirror pairs raise a natural question: how far is a number from zero, ignoring direction? The answer is called the **absolute value**, written with two upright bars: $|-8| = 8$, $|8| = 8$, $|0| = 0$. Direction is stripped; distance is kept. The two mirror twins $-8$ and $8$ share one absolute value, which is exactly the statement that they are the same distance out.',
        },
        {
          kind: 'example',
          title: 'Evaluate $|-8|$, $|8|$ and $|0|$.',
          steps: [
            'Now, the bars ask for distance from zero, direction discarded.',
            'So $|-8| = 8$ (eight steps out, on the left), $|8| = 8$ (eight steps out, on the right), and $|0| = 0$ (zero is no distance from itself).',
            'Hence $8$, $8$, $0$ — the mirror pair collapses to one value, the fixed point stays put.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'A first look only',
          text: 'This lesson uses absolute value as a reading tool: $|-439.78| = 439.78$ says "the Dead Sea is $439.78$ m *away* from sea level" without claiming a direction. The full treatment — its formal definition, its laws ($|ab| = |a|\\,|b|$ and friends), and its work in inequalities — is Lesson 7.4\u2019s business, and it will reuse everything the mirror taught here.',
        },
        { kind: 'heading', text: 'Reading signed numbers in the wild' },
        {
          kind: 'para',
          text: 'The five everyday quantities of the opening list now wear their full uniform. In each row of the table, the middle column names the chosen zero and the last two name the directions. Notice how much of the world\u2019s bookkeeping is this one pattern wearing five coats.',
        },
        {
          kind: 'table',
          head: ['Quantity', 'The chosen zero', 'Positive means', 'Negative means'],
          rows: [
            ['Temperature', 'the freezing point of water ($0$°C)', 'degrees above freezing', 'degrees below freezing — $-89.2$°C at Vostok'],
            ['Elevation', 'sea level', 'heights above the sea — Everest $+8848.86$ m', 'depths below the sea — the Dead Sea $-439.78$ m'],
            ['Bank balance', 'no overdraft', 'money in hand', 'money owed — an overdraft of Rs $2{,}500$ is $-2500$'],
            ['Building floor', 'the ground floor', 'levels above ground', 'basement levels — $B2$ is $-2$'],
            ['Time zone', 'the UTC meridian', 'hours ahead of UTC — India $+5{:}30$', 'hours behind UTC — New York $-5$ in winter'],
          ],
        },
        {
          kind: 'para',
          text: 'The elevation row is the reading most often drawn, and most often drawn dishonestly. Figure 2 shows the honest version. Sea level is the chosen zero; Everest climbs $8848.86$ m above it and the Dead Sea\u2019s surface sits $439.78$ m below it — but no single drawing scale can carry both: at the mountain\u2019s scale the lake\u2019s depth would be a hairline. So the two vertical measures deliberately do not share a scale, and the caption says so. A schematic that admits what it is beats a "to scale" picture that lies.',
        },
        {
          kind: 'figure',
          caption:
            'Two directions from one zero. Sea level is the chosen zero: Mount Everest climbs $8848.86$ m above it (the dashed line inside the triangle is the mountain\u2019s altitude, apex to datum — the height the eye measures), while the Dead Sea\u2019s surface sits $439.78$ m below it in 2025 — about $-440$ m, falling roughly a metre each year. The drawing is schematic: the two vertical measures deliberately do not share a scale, since at the mountain\u2019s scale the lake\u2019s depth would be a hairline.',
          svg: `<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A schematic land section: the sea at left, Mount Everest rising 8848.86 metres above the dashed sea-level line, and the Dead Sea surface sitting 439.78 metres below it">
  <rect x="40" y="100" width="110" height="8" fill="currentColor" opacity="0.18"/>
  <text x="95" y="124" font-size="12" fill="currentColor" text-anchor="middle">the sea</text>
  <line x1="40" y1="100" x2="720" y2="100" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="44" y="92" font-size="12" fill="currentColor">sea level = 0</text>
  <path d="M 150 100 L 250 62 L 310 74 L 400 26 L 470 68 L 540 96 L 600 130" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <line x1="600" y1="130" x2="700" y2="130" stroke="currentColor" stroke-width="2"/>
  <path d="M 700 130 L 720 124 L 720 100" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="600" y="130" width="100" height="20" fill="currentColor" opacity="0.18"/>
  <text x="650" y="144" font-size="11" fill="currentColor" text-anchor="middle">the Dead Sea</text>
  <text x="400" y="13" font-size="11" fill="currentColor" text-anchor="middle">Everest — +8848.86 m</text>
  <line x1="400" y1="34" x2="400" y2="100" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.85"/>
  <polygon points="400,26 396.5,34 403.5,34" fill="currentColor"/>
  <circle cx="400" cy="100" r="2" fill="currentColor"/>
  <line x1="650" y1="109" x2="650" y2="121" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.85"/>
  <polygon points="650,100 645.5,109 654.5,109" fill="currentColor"/>
  <polygon points="650,130 645.5,121 654.5,121" fill="currentColor"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="650" y="168">−439.78 m (2025)</text>
    <text x="650" y="184">about −440 m</text>
  </g>
  <text x="44" y="208" font-size="11" fill="currentColor" opacity="0.8">schematic — the two vertical measures are not drawn to one scale</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'One reading deserves its own illustration, because time-zone arithmetic is a daily fact of Indian life — every family with a cousin abroad runs it. The two offsets are integers-with-a-half, but the machinery is the line\u2019s, unchanged: find the gap between the offsets, then walk the clock.',
        },
        {
          kind: 'example',
          title: 'Delhi keeps $UTC+5{:}30$ and New York (winter) keeps $UTC-5$. When Delhi\u2019s clocks read $6{:}30$ pm, what do New York\u2019s read?',
          steps: [
            'Now, the offsets are $+5.5$ h and $-5$ h, so the gap on the line is $5.5 + 5 = 10.5$ hours — New York is $10.5$ h behind.',
            'So Delhi\u2019s $6{:}30$ pm is $1110$ minutes into the day; walking back $630$ minutes lands at $480$ minutes, which reads $8{:}00$ am.',
            'Hence 8:00 am the same day — the negative sign did the work: New York\u2019s offset *is* the instruction "ten and a half hours behind Delhi".',
          ],
        },
        {
          kind: 'example',
          title: 'A lift starts at basement $2$ and rises to level $7$. How many storeys does it climb?',
          steps: [
            'Now, write the storeys as integers: $B2$ is $-2$ and the target is $7$.',
            'So count the steps on the line: from $-2$ up to $0$ is $2$ steps, and from $0$ up to $7$ is $7$ steps — $2 + 7 = 9$ in all.',
            'Hence 9 storeys — Lesson 7.2 will compress this counting into the subtraction $7 - (-2) = 9$; for now the line counts honestly.',
          ],
        },
        {
          kind: 'example',
          title: 'The coldest air temperature ever recorded on Earth is $-89.2$°C (Vostok Station, 1983); India\u2019s hottest reliable reading is $51.0$°C (Phalodi, Rajasthan, 2016). How many degrees of the line separate them?',
          steps: [
            'Now, both readings hang from the same zero, so the gap is the sum of their distances from it.',
            'So from $-89.2$ up to $0$ is $89.2$ degrees, and from $0$ up to $51.0$ is $51$ more: $89.2 + 51 = 140.2$ degrees.',
            'Hence 140.2 degrees — a spread wider than water\u2019s boiling-to-freezing span, measured entirely in steps away from one chosen zero.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The long reluctance',
          text: 'Negative numbers are old and, for centuries, unwelcome. Chinese reckoning boards of about $200$ BCE ran two colours of counting rods — red for credits, black for debts — and the *Nine Chapters on the Mathematical Art* (with Liu Hui\u2019s commentary of $263$ CE) solved systems of equations carrying negative coefficients without fuss. India went further: Brahmagupta\u2019s *Brahmasphutasiddhanta* ($628$ CE) taught arithmetic with *fortunes* and *debts* and stated the operating rules that Lessons 7.2 and 7.3 will derive. Europe, inheriting the tools through Arab algebra, dug in — Descartes ($1637$) called negative solutions "false roots", and as late as $1758$ the English mathematician Francis Maseres complained that negatives "darken the very whole doctrines of the equations". Acceptance came only in the 19th century, when De Morgan, Peacock and their contemporaries rebuilt the laws of arithmetic on definitions that leave nothing to distrust. The rod-board colours have swapped hats over two millennia — modern ledgers say "in the red" for debt — but the idea has not moved since the red-and-black boards: a number that records direction.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Integers in the examination hall',
          text: 'Integer items are the exam hall\u2019s quickest marks — and its most reliable traps. The banks for SSC CHSL, SSC MTS and RRB NTPC CBT-I carry sign-fill items of the shape "fill in $\\square$: $-40\\,\\square\\,+4$"; "greatest negative integer" questions (the answer is $-1$, the closest to zero) and additive-inverse match-the-column items appear across banking and SSC sets; ordering sets in ascending/descending dress are staple class-6/7 board work; and temperature readings with a day\u2019s rise or fall — "dipped by", "rose by" — open the operations of the next lessons. The canon: NCERT class-6 chapter 10, "The Other Side of Zero", whose lift-and-zero narrative this lesson retells in its own words; the operating rules arrive with NCERT class-7 (part 2) chapter 2, "Operations with Integers"; and Khattar\u2019s *Quantitative Aptitude* drills the number-system staples. No examination question is reproduced here.',
        },
        {
          kind: 'para',
          text: 'The integers are the doorway, not the destination. The line now runs unbroken in both directions, every integer has its mirror, and "how far" has a symbol. What the line cannot yet do is *move*: $-4 + 11$, $7 - (-2)$, $(-3) \\times (-6)$ are all still questions. Lesson 7.2 teaches the line to walk — addition as motion, subtraction as the reverse journey — and the sign rules that Brahmagupta stated thirteen centuries ago will be *derived*, not memorised.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Integer',
              def: 'A whole number carrying a direction: the naturals $1, 2, 3, \\ldots$, their negatives $-1, -2, -3, \\ldots$, and zero — the set $\\mathbb{Z}$.',
            },
            {
              term: 'Negative number',
              def: 'A number written with the $-$ sign, naming the direction opposite to the positive one — a depth, a debt, a temperature below the chosen zero.',
            },
            {
              term: 'Positive number',
              def: 'A number on the positive side of the chosen zero, written with $+$ or with no sign at all.',
            },
            {
              term: 'Chosen zero',
              def: 'The agreed starting level of a signed quantity — sea level for elevation, the freezing point for temperature, the ground floor for lifts, UTC for clocks. The zero itself carries no direction.',
            },
            {
              term: 'Opposite (additive inverse)',
              def: 'For an integer $n$, the number $-n$: the same distance from zero in the opposite direction. The opposite of $-7$ is $7$; the opposite of $0$ is $0$.',
            },
            {
              term: 'Absolute value',
              def: 'The distance of a number from zero, direction ignored: $|-8| = 8$ and $|8| = 8$. First met here as a reading tool; Lesson 7.4 develops it fully.',
            },
            {
              term: 'Natural numbers',
              def: 'The counting numbers $1, 2, 3, \\ldots$ of chapter 1 — seen from this chapter as the right half of the integers.',
            },
            {
              term: 'Whole numbers',
              def: 'The naturals together with $0$: the integers\u2019 nonnegative half, $0, 1, 2, 3, \\ldots$',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which is the greater integer, $-3$ or $-8$?',
              options: ['$-8$', '$-3$', 'they are equal', 'the question needs units'],
              answer: 1,
              explain:
                '$-3$ stands three steps left of zero; $-8$ stands eight steps left — further left on the line, therefore smaller (Option 2). Option 1 mistakes the larger magnitude for the larger number — "more debt is less wealth"; Options 3 and 4 deny the line its order.',
            },
            {
              q: 'Zero is',
              options: [
                'positive, since it lies on the number line',
                'negative, since it divides the two sides',
                'neither positive nor negative',
                'both positive and negative',
              ],
              answer: 2,
              explain:
                '"Positive" means right of zero and "negative" means left of zero; zero cannot be to the side of itself (Option 3). Option 1 confuses *being on the line* with *having a direction*; Option 2 mistakes the divider for the divided; Option 4 breaks the exactly-one-class rule.',
            },
            {
              q: 'The opposite of $-7$ is',
              options: ['$-7$ itself', '$0$', '$7$', '$\\tfrac{1}{7}$'],
              answer: 2,
              explain:
                'The opposite keeps the distance (seven steps) and flips the direction: $-(-7) = 7$ (Option 3). Option 1 leaves the number where it was; Option 2 confuses the mirror with the image; Option 4 reaches for a reciprocal, which is division\u2019s business, not reflection\u2019s.',
            },
            {
              q: 'In ascending order, the set $\\{-2, \\;3, \\;-5, \\;1\\}$ reads',
              options: ['$-5, -2, 1, 3$', '$-2, -5, 1, 3$', '$-5, -2, 3, 1$', '$3, 1, -2, -5$'],
              answer: 0,
              explain:
                'Walk the line left to right: $-5$ deepest, then $-2$, then the positives nearest first — $1$, then $3$ (Option 1). Option 2 trusts the magnitudes\u2019 order on the negatives; Option 3 drops the $1 < 3$ order; Option 4 is descending.',
            },
            {
              q: 'A geography plate marks the Dead Sea\u2019s surface as $-440$ m. This means',
              options: [
                '440 m above sea level',
                '440 m below sea level',
                'the sea there is 440 m deep',
                'the surface sits exactly at 0',
              ],
              answer: 1,
              explain:
                'The zero of elevation is sea level, so the $-$ sign reads "below": the surface is $440$ m under it (Option 2). Option 1 flips the direction; Option 3 confuses a lake\u2019s surface level with the water\u2019s depth; Option 4 erases the very sign the number exists to carry.',
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
                  q: 'Write as an integer: a temperature of eight degrees below zero, the freezing point of water being the chosen zero.',
                  solution: [
                    'Now, "below the zero" is the negative direction: temperatures under freezing wear the $-$ sign.',
                    'So the reading is $-8$°C — the direction (below) became the sign, and the size (8) stayed the distance from zero.',
                    'Hence $-8$; its absolute value $|-8| = 8$ reads the same fact direction-free.',
                  ],
                  answer: '$-8$',
                },
                {
                  q: 'Write as an integer: a bank balance showing an overdraft of Rs $2{,}500$, no overdraft being the zero.',
                  solution: [
                    'Now, money owed sits on the opposite side of money in hand, so it takes the $-$ sign.',
                    'So the balance is $-2500$ — the mirror of holding Rs $2{,}500$.',
                    'Hence $-2500$; "in the red", as the ledgers say, is just a negative number with a wardrobe.',
                  ],
                  answer: '$-2500$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Insert the correct sign: $-6 \\,\\square\\, -1$.',
                  solution: [
                    'Now, both integers sit on the negative side, so the closer-to-zero rule decides: among negatives, nearer zero is greater.',
                    'So $-6$ (six steps left) stands left of $-1$ (one step left), and left means smaller.',
                    'Hence $-6 < -1$ — the bigger-looking magnitude is the smaller number.',
                  ],
                  answer: '$-6 < -1$',
                },
                {
                  q: 'List all the integers strictly between $-3$ and $2$, in ascending order.',
                  solution: [
                    'Now, "strictly between" excludes both endpoints, so the walk starts just right of $-3$ and ends just left of $2$.',
                    'So the ticks are $-2$, $-1$, $0$, $1$ — each more than $-3$ and less than $2$, in one left-to-right sweep.',
                    'Hence $-2, -1, 0, 1$ — four integers, and note the $0$ among them: it, too, lives between any negative and any positive.',
                  ],
                  answer: '$-2, -1, 0, 1$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Arrange in descending order: $5, \\;-11, \\;3, \\;-1, \\;0$.',
                  solution: [
                    'Now, descending means right to left on the line.',
                    'So take the positives largest first — $5$, then $3$; then the zero; then the negatives nearest zero first — $-1$, then $-11$ deepest.',
                    'Hence $5 > 3 > 0 > -1 > -11$ — eleven steps of left cannot outrank one step of left.',
                  ],
                  answer: '$5, 3, 0, -1, -11$',
                },
                {
                  q: 'Arrange in ascending order: $-5, \\;-8, \\;-1, \\;-3$.',
                  solution: [
                    'Now, all four are negative, so the order runs *against* the magnitudes: deepest out first.',
                    'So order the distances $8, 5, 3, 1$ and attach the $-$ sign to each: $-8, -5, -3, -1$.',
                    'Hence $-8 < -5 < -3 < -1$ — the cheque-book order, from heaviest debt to lightest.',
                  ],
                  answer: '$-8, -5, -3, -1$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Mount Everest stands $8848.86$ m above sea level; the Dead Sea\u2019s surface lies $439.78$ m below it. What vertical gap separates the two?',
                  solution: [
                    'Now, both heights hang from the same chosen zero, so the gap is the two distances added.',
                    'So climb $8848.86$ steps up from zero, then $439.78$ steps down from zero in the other direction: $8848.86 + 439.78 = 9288.64$ m.',
                    'Hence about 9289 m (rounded: $8849 + 440 = 9289$) — Lesson 7.2 will name the move "adding a negative"; today the line counts it.',
                  ],
                  answer: '9288.64 m (about 9289 m)',
                },
                {
                  q: 'A lift starts at basement $2$ and rises to level $7$. How many storeys does it climb?',
                  solution: [
                    'Now, write the floors as integers: $B2$ is $-2$, the target is $7$.',
                    'So count the steps: $-2$ up to $0$ is $2$ storeys, and $0$ up to $7$ is $7$ storeys — $2 + 7 = 9$.',
                    'Hence 9 storeys; the quick subtraction $7 - (-2) = 9$ is exactly the trick Lesson 7.2 will prove.',
                  ],
                  answer: '9 storeys',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Delhi keeps $UTC+5{:}30$; New York in winter keeps $UTC-5$. When Delhi\u2019s clocks read $9{:}00$ pm, what do New York\u2019s read?',
                  solution: [
                    'Now, the offsets are $+5.5$ h and $-5$ h, so the gap is $5.5 + 5 = 10.5$ hours — New York runs $10.5$ h behind.',
                    'So Delhi\u2019s $9{:}00$ pm is $1260$ minutes into the day; back $630$ minutes lands at $630$ minutes, which reads $10{:}30$ am.',
                    'Hence 10:30 am the same day — and the negative offset did the walking: $UTC-5$ *is* the instruction "behind".',
                  ],
                  answer: '10:30 am the same day',
                },
                {
                  q: 'The coldest air temperature ever recorded on Earth is $-89.2$°C (Vostok Station, 1983); India\u2019s hottest reliable reading is $51.0$°C (Phalodi, 2016). How many degrees of the line separate them?',
                  solution: [
                    'Now, both readings hang from the same zero ($0$°C), so the gap is the two distances from it, added.',
                    'So $89.2$ degrees up from Vostok to the freezing point, plus $51$ degrees on to Phalodi: $89.2 + 51 = 140.2$ degrees.',
                    'Hence 140.2 degrees — a spread wider than the boiling-to-freezing span of water, counted entirely in steps from one chosen zero.',
                  ],
                  answer: '140.2 degrees',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove: for every positive integer $n$, the integers $-n$ and $n$ are symmetric about $0$ — each lies $n$ steps from zero on opposite sides, so $0$ is the midpoint of the pair. Cash the claim at $n = 5$.',
                  solution: [
                    'Now, by the definition of the opposite, $-n$ is the number as far from $0$ as $n$ but in the opposite direction — that is the symmetry, stated.',
                    'So both distances equal $n$: $|-n| = n$ and $|n| = n$, the mirror pair\u2019s shared absolute value.',
                    'And the point halfway between them sits at distance $n$ from each *on the line*: the only such point is $0$, since $\\tfrac{(-n) + n}{2} = 0$ — the two distances out, being equal and opposite, rebuild zero.',
                    'Hence proved; cashed at $n = 5$: $-5$ and $5$ are five steps out on opposite sides and $0$ is their midpoint — figure 1\u2019s mirror, made general.',
                  ],
                  answer: 'Proved; at n = 5 the midpoint of −5 and 5 is 0',
                },
                {
                  q: 'An underground mall has basement levels $B3, B2, B1$ (written $-3, -2, -1$), the ground floor ($0$) and levels $1$ through $9$. A shopper parks at $B3$ and shops at level $9$. How many storeys does the lift cover one way — and on the return?',
                  solution: [
                    'Now, write the endpoints as integers: the car park is $-3$ and the shop is $9$.',
                    'So count the steps on the line: $-3$ up to $0$ is $3$ storeys, and $0$ up to $9$ is $9$ storeys — $3 + 9 = 12$ one way.',
                    'The return walk covers the same $12$ storeys downward: $2 \\times 12 = 24$ in all.',
                    'Hence 12 storeys one way, 24 for the return — and Lesson 7.2\u2019s subtraction will write the one-way count as $9 - (-3) = 12$, the same three-step-plus-nine walk in one line.',
                  ],
                  answer: '12 storeys one way; 24 for the return',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-adding-subtracting-integers',
      number: '7.2',
      title: 'Adding and Subtracting Integers',
      concepts: [
        'Addition as a walk on the line',
        'The sign rules derived from the walk',
        'Additive inverse lands on zero',
        'Subtraction as adding the opposite',
        'The double-sign simplifications',
        'Closure, commutativity, associativity',
        'Net change chains',
        'Successor and predecessor',
      ],
      objectives: [
        'Compute any sum of integers by walking the line, and state the two sign rules as derived shortcuts',
        'Verify closure, commutativity, associativity, the identity and the inverse law for integer addition with instances',
        'Rewrite any subtraction as adding the opposite and simplify every double-sign chain',
        'Solve net-change word problems — balances, temperatures, dives — as chains of moves',
        'Derive the zero-subtraction rules Brahmagupta stated in 628 CE from the movement model',
      ],
      prerequisites: ['fm-negative-numbers-why-they-exist', 'fm-addition-carrying'],
      sources: ['ncert-math7-p2-ch2', 'ncert-math6-ch10', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 7.1 gave the line a left half and taught it to hold still: integers could now be named, ordered, mirrored and measured. What the line could not yet do was *move*. The questions that open arithmetic\u2019s second storey — $-4 + 11$, $7 - (-2)$, $(-3) + (-5)$ — are all still questions. This lesson answers them by giving the line its legs: addition becomes a walk, the sign rules fall out of the walk as findings rather than decrees, and subtraction reveals itself as no new operation at all — only addition wearing a disguise.',
        },
        {
          kind: 'para',
          text: 'Four debts are owed from last lesson, and all fall due today: the promise that an integer plus its opposite lands exactly on zero; the lift\u2019s nine storeys waiting to become one line of arithmetic; the mall\u2019s twelve; and the Everest–Dead Sea gap waiting for its name. Watch them cash as the lesson runs.',
        },
        { kind: 'heading', text: 'Addition is a walk on the line' },
        {
          kind: 'para',
          text: 'Every sum of integers is a small journey, and the number line is its map. The rule of the road: **stand at the first number; let the second number order your walk**. A positive second number walks you right; a negative second number walks you left; zero leaves you where you stand. Wherever you finish standing is the sum. That is all addition on the integers has ever been — the symbols merely record the journey.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Adding integers (the movement model)',
          text: 'The sum $a + b$ of two integers is said to be the position reached on the number line by standing at $a$ and moving $|b|$ steps in $b$\u2019s direction — rightward when $b$ is positive, leftward when $b$ is negative, no movement when $b$ is zero. Thus the final position equals the starting position followed by the second movement.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$5 + 3$: start at $5$, walk right $3$, finish at $8$ — the old arithmetic of chapter 2, seen now as a walk with both legs rightward.',
            '$2 + (-6)$: start at $2$, walk left $6$, finish at $-4$ — the walk crosses zero and lands in debt.',
            '$(-4) + 11$: start at $-4$, walk right $11$, finish at $7$ — a walk that begins below zero and ends above it.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Addition is a walk, in two legs. Panel 1: standing at $0$, the addend $-4$ walks you left $4$ steps, landing on $-4$. Panel 2: from $-4$, the addend $11$ walks you right $11$ steps, landing on $7$ — the sum. Both panels share one step scale; the net, $11 - 4 = 7$ steps right, fixes the landing.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels: first, walking left four steps from zero to minus four; second, walking right eleven steps from minus four to land on seven, the sum">
  <line x1="60" y1="84" x2="500" y2="84" stroke="currentColor" stroke-width="2"/>
  <polygon points="60,84 74,77 74,91" fill="currentColor"/>
  <polygon points="500,84 486,77 486,91" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="80" y1="76" x2="80" y2="92"/><line x1="130" y1="76" x2="130" y2="92"/>
    <line x1="180" y1="76" x2="180" y2="92"/><line x1="230" y1="76" x2="230" y2="92"/>
    <line x1="280" y1="76" x2="280" y2="92"/><line x1="330" y1="76" x2="330" y2="92"/>
    <line x1="380" y1="72" x2="380" y2="96"/>
    <line x1="430" y1="76" x2="430" y2="92"/><line x1="480" y1="76" x2="480" y2="92"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="80" y="112">−6</text><text x="130" y="112">−5</text><text x="180" y="112">−4</text>
    <text x="230" y="112">−3</text><text x="280" y="112">−2</text><text x="330" y="112">−1</text>
    <text x="380" y="112">0</text><text x="430" y="112">1</text><text x="480" y="112">2</text>
  </g>
  <circle cx="380" cy="84" r="5" fill="currentColor"/>
  <circle cx="180" cy="84" r="5" fill="currentColor"/>
  <path d="M 372 74 C 320 42, 250 44, 196 78" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="184,84 196,78 196,90" fill="currentColor"/>
  <text x="285" y="30" font-size="12" fill="currentColor" text-anchor="middle">leg 1 — walk left 4: add −4</text>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="380" y="130">starts at 0</text>
    <text x="180" y="130">lands on −4</text>
  </g>
  <line x1="40" y1="232" x2="700" y2="232" stroke="currentColor" stroke-width="2"/>
  <polygon points="40,232 54,225 54,239" fill="currentColor"/>
  <polygon points="700,232 686,225 686,239" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="80" y1="220" x2="80" y2="244"/><line x1="130" y1="224" x2="130" y2="240"/>
    <line x1="180" y1="224" x2="180" y2="240"/><line x1="230" y1="224" x2="230" y2="240"/>
    <line x1="280" y1="224" x2="280" y2="240"/>
    <line x1="330" y1="224" x2="330" y2="240"/><line x1="380" y1="224" x2="380" y2="240"/>
    <line x1="430" y1="224" x2="430" y2="240"/><line x1="480" y1="224" x2="480" y2="240"/>
    <line x1="530" y1="224" x2="530" y2="240"/><line x1="580" y1="224" x2="580" y2="240"/>
    <line x1="630" y1="224" x2="630" y2="240"/><line x1="680" y1="224" x2="680" y2="240"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="80" y="260">−4</text><text x="130" y="260">−3</text><text x="180" y="260">−2</text>
    <text x="230" y="260">−1</text><text x="280" y="260">0</text><text x="330" y="260">1</text>
    <text x="380" y="260">2</text><text x="430" y="260">3</text><text x="480" y="260">4</text>
    <text x="530" y="260">5</text><text x="580" y="260">6</text><text x="630" y="260">7</text>
    <text x="680" y="260">8</text>
  </g>
  <circle cx="80" cy="232" r="5" fill="currentColor"/>
  <circle cx="630" cy="232" r="5" fill="currentColor"/>
  <path d="M 88 222 C 200 162, 480 156, 612 226" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="626,232 612,226 612,238" fill="currentColor"/>
  <text x="350" y="148" font-size="12" fill="currentColor" text-anchor="middle">leg 2 — then right 11: add 11</text>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="80" y="284">starts at −4</text>
    <text x="630" y="284">lands on 7 — the sum</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read figure 1 as one journey told in two panels. The first leg runs left — the addend $-4$ points leftward and carries $4$ steps of left in it. The second leg runs right, eleven steps: it passes back over the same ground between $-4$ and $0$, and keeps going $7$ steps beyond, so the right leg wins the fight by $11 - 4 = 7$ steps and the walk finishes at $7$. The landing point *is* the sum — that is the definition at work.',
        },
        {
          kind: 'example',
          title: 'Evaluate $(-4) + 11$.',
          steps: [
            'Now, stand at $-4$; the addend $11$ orders eleven steps rightward.',
            'So the walk climbs from $-4$ up to $0$ (four steps) and continues $7$ steps more, finishing at $7$.',
            'Hence $(-4) + 11 = 7$ — the right leg beat the left leg\u2019s four steps by seven.',
          ],
        },
        {
          kind: 'example',
          title: 'Evaluate $2 + (-6)$.',
          steps: [
            'Now, stand at $2$; the addend $-6$ orders six steps leftward.',
            'So the walk spends its first $2$ steps reaching $0$, then $4$ steps more into the left half, finishing at $-4$.',
            'Hence $2 + (-6) = -4$ — the left leg won by four, and the sum keeps the winner\u2019s sign.',
          ],
        },
        { kind: 'heading', text: 'The sign rules, derived' },
        {
          kind: 'para',
          text: 'The walk computes any single sum honestly, but an examination hall has no room for drawing lines under every question. So we do what this book always does: run the honest method a few times, watch the pattern, and collect it into a rule — a shortcut that is *derived*, not decreed. Two cases exhaust every pair of integers: either the two addends carry the same sign, or they do not.',
        },
        {
          kind: 'derivation',
          title: 'Like signs: the legs agree',
          statement:
            'When both addends point the same way, both legs of the walk run in one direction. Two legs in one direction concatenate into a single longer leg — and its direction is the sign they share.',
          steps: [
            {
              label: 'Take two debts',
              formula: '(-m) + (-n)',
              explanation:
                'Stand at $-m$, a debt of $m$; the second addend orders $n$ steps further left. Leftward legs never fight each other — they chain.',
            },
            {
              label: 'Concatenate',
              formula: '(-m) + (-n) \\;=\\; -(m + n)',
              explanation:
                'The walk ends $m + n$ steps left of zero: the two leftward legs are one leg of their combined size, wearing the common sign.',
            },
            {
              label: 'Mirror it for fortunes',
              formula: 'm + n \\;=\\; +(m + n)',
              explanation:
                'Two rightward legs chain the same way on the right side — chapter 2\u2019s ordinary addition, now a special case of the walk.',
            },
            {
              label: 'Conclude',
              formula: '(-3) + (-5) \\;=\\; -(3 + 5) \\;=\\; -8',
              explanation:
                'Like signs: add the magnitudes, keep the common sign. Cashed: from $-3$, five steps left lands on $-8$, exactly as the formula says.',
            },
          ],
          result:
            'Like signs add the magnitudes and keep the common sign: $(-3) + (-5) = -8$ and $3 + 5 = 8$.',
        },
        {
          kind: 'para',
          text: 'The unlike case is the fight the walk already staged in figure 1. When the signs disagree, the legs oppose; the longer leg decides the direction, and the sum\u2019s size is the *difference* of the magnitudes — the amount by which the winner won. So $9 + (-4) = +(9 - 4) = 5$: the right leg wins by five. And $4 + (-9) = -(9 - 4) = -5$: the left leg wins by five. One border case glows: when the magnitudes *tie*, no leg wins, and the walk ends exactly where it began — at zero. The table collects all of it.',
        },
        {
          kind: 'table',
          head: ['The two signs', 'What the walk does', 'The rule', 'Instance'],
          rows: [
            ['$+$ and $+$', 'two rightward legs', 'add the magnitudes, keep $+$', '$3 + 5 = 8$'],
            ['$-$ and $-$', 'two leftward legs', 'add the magnitudes, keep $-$', '$(-3) + (-5) = -8$'],
            ['mixed, $+$ magnitude larger', 'legs oppose; right wins', 'subtract the magnitudes, keep $+$', '$9 + (-4) = 5$'],
            ['mixed, $-$ magnitude larger', 'legs oppose; left wins', 'subtract the magnitudes, keep $-$', '$4 + (-9) = -5$'],
            ['one addend is $0$', 'one leg only', 'the sum is the other addend', '$(-17) + 0 = -17$'],
          ],
        },
        {
          kind: 'para',
          text: 'Around the two rules, addition\u2019s old laws from chapter 2 stand up and introduce themselves to the new numbers. Each survives the extension to both directions — and the walk explains why, since a walk\u2019s legs net out the same however you arrange them.',
        },
        {
          kind: 'list',
          items: [
            '**closure**: the sum of two integers is always an integer — $12 + (-30) = -18$ never leaves $\\mathbb{Z}$. The line has no gaps to fall through.',
            '**commutativity**: $a + b = b + a$; instance $(-3) + 5 = 2 = 5 + (-3)$. Walking right $5$ from $-3$ or right $5$ first and left $3$ after nets the same displacement.',
            '**associativity**: $(a + b) + c = a + (b + c)$; instance $(2 + (-3)) + 5 = -1 + 5 = 4$ and $2 + ((-3) + 5) = 2 + 2 = 4$. Chains may be grouped however convenient — the licence behind every multi-move ledger below.',
            '**the identity**: $a + 0 = a$; instance $(-17) + 0 = -17$. Adding zero is standing still — a walk of no steps.',
            '**the inverse**: $a + (-a) = 0$; instance $(-9) + 9 = 0$. Every walk is undone exactly by its mirror walk.',
          ],
        },
        {
          kind: 'example',
          title: 'Evaluate $(-9) + 9$ and $53 + (-53)$.',
          steps: [
            'Now, each pair is an integer and its own opposite — the mirror pair of Lesson 7.1.',
            'So $(-9) + 9 = 0$: the walk out is undone by the walk back; and likewise $53 + (-53) = 0$.',
            'Hence $0$ and $0$ — the promissory note of last lesson is hereby cashed: an integer plus its additive inverse lands on zero, always.',
          ],
        },
        {
          kind: 'equation',
          latex: 'a + (-a) \\;=\\; 0',
          note: 'The inverse law. The opposite of Lesson 7.1 earns its second name — *additive inverse* — here: added to its integer, it builds zero. This single sentence will carry the whole of subtraction in the next heading.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The commutative law does not lend its name to subtraction',
          text: 'Addition commutes; subtraction does not. $5 - 3 = 2$ but $3 - 5 = -2$ — the same two numbers, opposite answers, because the *order of the walk\u2019s start and order* is the whole difference. Students who quietly swap the operands of a difference borrow a licence that was never issued. The safe habit: rewrite every difference as a sum first (the next heading), and commute only what genuinely commutes.',
        },
        { kind: 'heading', text: 'Subtraction is adding the opposite' },
        {
          kind: 'para',
          text: 'Now the lesson\u2019s central turn. "Subtract $b$" means: undo a walk of $b$ steps. If $b$ pointed right, undoing it means walking left; if $b$ pointed left, undoing it means walking right. But walking against $b$\u2019s direction for $|b|$ steps is precisely walking in the direction of $-b$ — the *opposite* of $b$, which points the reverse way by definition. So subtracting and adding-the-opposite are the same journey described in two grammars.',
        },
        {
          kind: 'derivation',
          title: 'Every difference is a sum',
          statement:
            'Subtracting $b$ from $a$ means walking $|b|$ steps against $b$\u2019s direction. Reversing a direction is exactly what taking the opposite does. So the difference should be writable as a sum — and it always is.',
          steps: [
            {
              label: 'Read the subtraction',
              formula: 'a - b',
              explanation:
                'To take away $b$ from $a$ is to undo a walk of $b$ steps: undo a rightward walk by walking left, a leftward walk by walking right.',
            },
            {
              label: 'Name the undoing',
              formula: 'a - b \\;=\\; a + (-b)',
              explanation:
                'Walking against $b$\u2019s direction for $|b|$ steps is walking in $(-b)$\u2019s direction — the opposite points the reverse way. Equation (2) numbers the law.',
            },
            {
              label: 'Cash the lift',
              formula: '7 - (-2) \\;=\\; 7 + 2 \\;=\\; 9',
              explanation:
                'The $B2$-to-level-$7$ ride of Lesson 7.1, compressed to one line: subtracting $-2$ adds $2$. Nine storeys, no counting on fingers.',
            },
            {
              label: 'Cash the mountain',
              formula: '8848.86 - (-439.78) \\;=\\; 8848.86 + 439.78 \\;=\\; 9288.64',
              explanation:
                'Everest above the datum, the Dead Sea below it: the gap between them is a subtraction of a negative — and the metres agree with Lesson 7.1\u2019s count to the last decimal.',
            },
          ],
          result:
            'Every difference is a sum: $a - b = a + (-b)$. One operation does the work of two.',
        },
        {
          kind: 'equation',
          latex: 'a - b \\;=\\; a + (-b)',
          note: 'The unification. There is no separate subtraction of integers to memorise — only the opposite of Lesson 7.1, deployed once. The verified ledger: on every pair in $[-10, 10] \\times [-10, 10]$, the two sides agree, $441$ out of $441$.',
        },
        {
          kind: 'figure',
          caption:
            'Subtraction is adding the opposite — the two stops of $7 - (-2)$. Panel 1: the mirror flips $-2$ to $+2$ — taking the opposite, $-(-2) = 2$, Lesson 7.1\u2019s instruction-hat minus at work. Panel 2: so the job becomes $7 + 2$ — from $7$, two steps right land on $9$, the lift\u2019s nine storeys in one line. Both panels share one step scale.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels: the mirror flip turning minus two into plus two across zero, and then the walk from seven two steps right to nine, showing that seven minus minus two equals seven plus two">
  <line x1="210" y1="70" x2="550" y2="70" stroke="currentColor" stroke-width="2"/>
  <polygon points="210,70 224,63 224,77" fill="currentColor"/>
  <polygon points="550,70 536,63 536,77" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="230" y1="62" x2="230" y2="78"/><line x1="280" y1="62" x2="280" y2="78"/>
    <line x1="330" y1="62" x2="330" y2="78"/>
    <line x1="380" y1="58" x2="380" y2="82"/>
    <line x1="430" y1="62" x2="430" y2="78"/><line x1="480" y1="62" x2="480" y2="78"/>
    <line x1="530" y1="62" x2="530" y2="78"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="230" y="96">−3</text><text x="280" y="96">−2</text><text x="330" y="96">−1</text>
    <text x="380" y="96">0</text><text x="430" y="96">1</text><text x="480" y="96">2</text>
    <text x="530" y="96">3</text>
  </g>
  <text x="380" y="20" font-size="12" fill="currentColor" text-anchor="middle">the opposite flip: −(−2) = 2</text>
  <path d="M 296 60 C 330 32, 430 32, 464 60" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="280,70 296,63 296,77" fill="currentColor"/>
  <polygon points="480,70 464,63 464,77" fill="currentColor"/>
  <circle cx="280" cy="70" r="4" fill="currentColor"/>
  <circle cx="480" cy="70" r="4" fill="currentColor"/>
  <line x1="380" y1="44" x2="380" y2="80" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.8"/>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="280" y1="112" x2="380" y2="112"/>
    <line x1="280" y1="106" x2="280" y2="118"/>
    <line x1="380" y1="106" x2="380" y2="118"/>
    <line x1="380" y1="112" x2="480" y2="112"/>
    <line x1="480" y1="106" x2="480" y2="118"/>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="330" y="132">2 steps</text>
    <text x="430" y="132">2 steps</text>
  </g>
  <text x="380" y="154" font-size="13" fill="currentColor" text-anchor="middle" font-style="italic">so 7 − (−2) becomes 7 + 2</text>
  <line x1="225" y1="230" x2="535" y2="230" stroke="currentColor" stroke-width="2"/>
  <polygon points="225,230 239,223 239,237" fill="currentColor"/>
  <polygon points="535,230 521,223 521,237" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="255" y1="222" x2="255" y2="238"/><line x1="305" y1="222" x2="305" y2="238"/>
    <line x1="355" y1="222" x2="355" y2="238"/><line x1="405" y1="222" x2="405" y2="238"/>
    <line x1="455" y1="222" x2="455" y2="238"/><line x1="505" y1="222" x2="505" y2="238"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="255" y="254">5</text><text x="305" y="254">6</text><text x="355" y="254">7</text>
    <text x="405" y="254">8</text><text x="455" y="254">9</text><text x="505" y="254">10</text>
  </g>
  <circle cx="355" cy="230" r="4" fill="currentColor"/>
  <circle cx="455" cy="230" r="4" fill="currentColor"/>
  <path d="M 363 222 C 375 194, 425 194, 439 224" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="455,230 439,224 439,236" fill="currentColor"/>
  <text x="400" y="188" font-size="12" fill="currentColor" text-anchor="middle">the walk — 7 + 2 lands on 9: two steps right</text>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="355" y1="268" x2="455" y2="268"/>
    <line x1="355" y1="262" x2="355" y2="274"/>
    <line x1="455" y1="262" x2="455" y2="274"/>
  </g>
  <text x="405" y="290" font-size="12" fill="currentColor" text-anchor="middle">2 steps right</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Figure 2 shows both stops. First the flip: the two-headed arc carries $-2$ across the dashed mirror to $+2$ — that is the opposite instruction $-(-2) = 2$ of Lesson 7.1 doing honest work (read from $2$\u2019s side of the mirror, it is the double bounce that went out and came home). Then the walk: $7$ plus $2$ lands on $9$. The lift example that 7.1 counted storey by storey is now one line of arithmetic, and the same flip would compress the mall\u2019s twelve.',
        },
        {
          kind: 'example',
          title: 'Evaluate $9 - (-3)$.',
          steps: [
            'Now, subtracting $-3$ means adding its opposite: $9 - (-3) = 9 + 3$.',
            'So the walk starts at $9$ and steps right $3$, finishing at $12$ — the underground mall\u2019s $B3$-to-level-$9$ ride of Lesson 7.1, in one line.',
            'Hence $9 - (-3) = 12$.',
          ],
        },
        {
          kind: 'example',
          title: 'Simplify $(-8) - (-13)$.',
          steps: [
            'Now, the flip first: $(-8) - (-13) = (-8) + 13$.',
            'So opposite signs, and the magnitude $13$ wears the plus: $+(13 - 8) = 5$ — the walk starts $8$ left of zero and returns $13$ steps rightward, ending $5$ right of zero.',
            'Hence $5$.',
          ],
        },
        {
          kind: 'para',
          text: 'Before the table, one habit worth automating: reading chains of signs. A $+$ sign before a bracket changes nothing; a $-$ sign before a bracket flips what is inside. Four readings cover every case that examinations set.',
        },
        {
          kind: 'table',
          head: ['Expression', 'Read as', 'Equals'],
          rows: [
            ['$+(+6)$', 'add a fortune of $6$', '$6$'],
            ['$+(-6)$', 'add a debt of $6$', '$-6$'],
            ['$-(+6)$', 'take away a fortune of $6$', '$-6$'],
            ['$-(-6)$', 'take away a debt of $6$', '$+6$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Two minus signs in a row are not a typo',
          text: 'The expression $-(-6)$ reads "take away a debt of $6$" — which enriches you by $6$. Students who cancel the pair "because two negatives make a positive" before asking what each sign *does* land on $-6$ and lose the mark. Longer stacks resolve two signs at a time, from the inside out: $-(-(-2)) = -(2) = -2$, since the inner flip gives $2$ and the outer minus takes it away again. Read the grammar; the arithmetic follows.',
        },
        { kind: 'heading', text: 'Net change: chains of moves' },
        {
          kind: 'para',
          text: 'Real bookkeeping rarely sums two numbers and stops. A day of banking, a day of weather, a dive profile — each is a *chain* of moves, and the walk model reads chains natively: start somewhere, apply the moves left to right, and read the final position. The associativity licence guarantees that staging the chain wherever convenient cannot change the landing point.',
        },
        {
          kind: 'example',
          title: 'A balance of Rs $2{,}500$ takes a withdrawal of Rs $3{,}600$ (the bank honours the overdraft) and then a deposit of Rs $1{,}900$. What does the day end with?',
          steps: [
            'Now, chain the ledger: $2500 - 3600 + 1900$.',
            'So after the withdrawal: $2500 - 3600 = -1100$ — a genuine overdraft of Rs $1{,}100$, the balance wearing a negative sign in the wild.',
            'And the deposit lifts it: $-1100 + 1900 = 800$.',
            'Hence Rs $800$ in hand — and only the sign language could carry the intermediate overdraft honestly.',
          ],
        },
        {
          kind: 'example',
          title: 'A hill station\u2019s dawn temperature is $-4$°C. By noon it has risen $11$ degrees; by night it has fallen $9$ degrees. What does the night thermometer read?',
          steps: [
            'Now, chain the day: $-4 + 11 - 9$.',
            'So the noon reading: $-4 + 11 = 7$ — the walk crosses zero; and the night reading: $7 - 9 = -2$.',
            'Hence $-2$°C — two degrees below freezing, the whole day\u2019s weather in one chain.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Grouping is free',
          text: 'Associativity says a chain may be staged wherever convenient: the ledger above could open with the deposit pair ($-3600 + 1900 = -1700$, then $2500 - 1700 = 800$) and land on the same rupees. This is why accountants may total a day\u2019s credits and debits separately, and why "show the stages" is always a safe instruction — the stages differ, the destination cannot.',
        },
        {
          kind: 'para',
          text: 'Two smaller shapes belong in every pocket. The **successor** of an integer is $n + 1$ — one step right — and its **predecessor** is $n - 1$: the successor of $-8$ is $-7$, the predecessor $-9$; the line\u2019s neighbours, now computable. And the **missing-addend** shape — *the sum of two integers is $-7$; one of them is $5$; find the other* — is subtraction wearing its other hat: the unknown is $-7 - 5 = -12$, and the check $5 + (-12) = -7$ closes the loop. Both shapes meet quizzes and question papers constantly, and both reduce to the one law $a - b = a + (-b)$.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Integer arithmetic in the examination hall',
          text: 'The signed-operation item is a fixture of SSC CHSL and MTS, RRB NTPC CBT-I and banking clerical prelims, in a small set of recurring shapes: evaluate a signed chain ("simplify" items mixing two or three operations); subtract-a-negative items, where the whole mark is the flip; missing-addend items ("the sum of two integers is …; one of them is …"); successor/predecessor items on negative integers; and narrated temperature or balance word problems — "rose by", "fell by", "dipped below" — which are chains of moves in prose. The canon is NCERT class-7 (part 2), chapter 2, "Operations with Integers", whose movement model this lesson retells in its own words; Khattar\u2019s *Quantitative Aptitude* drills the speed shapes. No examination question is reproduced here.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Brahmagupta stated; the walk derives',
          text: 'When Brahmagupta wrote his *Brahmasphutasiddhanta* in $628$ CE, he did not merely tolerate negative numbers — he legislated for them, in verses that speak of fortunes and debts. Among his subtraction rules, in modern paraphrase: a debt minus zero is a debt; a fortune minus zero is a fortune; a debt subtracted from zero is a fortune; a fortune subtracted from zero is a debt. The walk derives all four in a breath: $0 - 5 = -5$ and $0 - (-5) = 5$ — subtracting from zero simply mirrors. The Chinese rod board had run the same machinery visually for centuries: to subtract a debt, the reckoner laid down rods of the opposite colour, which is the flip drawn in sticks. What Brahmagupta handed down as statute, this lesson re-derives as theorem — the surest form in which to hold a rule.',
        },
        {
          kind: 'para',
          text: 'The line now walks in both directions, and subtraction has dissolved into addition plus a flip. One operation family remains untouched: the *leaps* — $(-3) \\times (-6)$, the products that made European mathematicians call negative numbers absurd for four centuries. Lesson 7.3 teaches the line to leap, and its most mistrusted rule — a debt times a debt is a fortune — will meet the same standard this lesson set: derived, never decreed.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Sum (of integers)',
              def: 'The final position of the walk: stand at the first addend and move as the second directs. $(-4) + 11 = 7$ is read "the walk lands on $7$".',
            },
            {
              term: 'Movement model',
              def: 'The reading of integer addition as motion on the number line — final position equals starting position plus the second movement; the sign of the second addend chooses the direction.',
            },
            {
              term: 'Sign rules for addition',
              def: 'Like signs: add the magnitudes and keep the common sign. Unlike signs: subtract the magnitudes; the larger magnitude\u2019s sign wins; a tie lands on $0$.',
            },
            {
              term: 'Additive identity',
              def: 'The integer $0$: adding it changes nothing ($a + 0 = a$), and it leaves every walk where it stands.',
            },
            {
              term: 'Commutative law of addition',
              def: '$a + b = b + a$ for all integers — the walk\u2019s legs net out in either order. It does NOT transfer to subtraction: $5 - 3 \\neq 3 - 5$.',
            },
            {
              term: 'Associative law of addition',
              def: '$(a + b) + c = a + (b + c)$ — chains may be grouped and staged wherever convenient; the landing point cannot change.',
            },
            {
              term: 'Subtraction as adding the opposite',
              def: 'The unification $a - b = a + (-b)$: every difference is a sum, since undoing a walk of $b$ steps is walking $|b|$ steps against $b$\u2019s direction.',
            },
            {
              term: 'Successor and predecessor',
              def: 'For an integer $n$, the successor is $n + 1$ (one step right) and the predecessor is $n - 1$ (one step left): the successor of $-8$ is $-7$, its predecessor $-9$.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Evaluate $(-5) + 3$.',
              options: ['$-2$', '$2$', '$-8$', '$8$'],
              answer: 0,
              explain:
                'Unlike signs: subtract the magnitudes and the larger ($5$, wearing minus) keeps its sign, so $-(5 - 3) = -2$ (Option 1). Option 2 drops the winning sign; Option 3 misapplies the like-signs rule by adding the magnitudes; Option 4 both adds and drops.',
            },
            {
              q: 'Evaluate $6 - (-4)$.',
              options: ['$2$', '$10$', '$-10$', '$-2$'],
              answer: 1,
              explain:
                'Subtracting $-4$ adds $4$: $6 + 4 = 10$ (Option 2). Option 1 ignores the flip and computes $6 - 4$; Option 3 misapplies the like-signs rule to the flip; Option 4 walks the subtraction in the wrong order.',
            },
            {
              q: 'For any integer $a$, the sum $a + (-a)$ equals',
              options: ['$2a$', '$1$', '$0$', '$|a|$'],
              answer: 2,
              explain:
                'An integer and its additive inverse are mirror walks; the round trip lands on the start: $a + (-a) = 0$ (Option 3) — the inverse law, 7.1\u2019s promissory note cashed. Option 1 doubles; Option 4 keeps only the size; Option 2 confuses the sum with the identity\u2019s contribution.',
            },
            {
              q: 'The sum of two integers is $-7$. One of them is $5$. The other is',
              options: ['$-12$', '$-2$', '$12$', '$2$'],
              answer: 0,
              explain:
                'The missing addend is the sum minus the known one: $-7 - 5 = -12$ (Option 1); the check closes: $5 + (-12) = -7$. Option 2 computes $-7 + 5$; Option 3 flips the sum\u2019s sign; Option 4 computes $7 - 5$.',
            },
            {
              q: 'A temperature of $-4$°C rises by $11$ degrees and then falls by $9$ degrees. The final reading is',
              options: ['$15$°C', '$7$°C', '$-24$°C', '$-2$°C'],
              answer: 3,
              explain:
                'Chain the moves: $-4 + 11 = 7$ at noon, then $7 - 9 = -2$ (Option 4). Option 1 adds $11$ and $4$ as if the start were $+4$; Option 2 stops at noon; Option 3 reads every move as a fall.',
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
                  q: 'Evaluate $(-7) + 4$.',
                  solution: [
                    'Now, the signs disagree: magnitudes $7$ and $4$, and the $7$ wears the minus.',
                    'So subtract the magnitudes; the larger keeps its sign: $-(7 - 4) = -3$ — the walk starts $7$ left and steps $4$ right.',
                    'Hence $-3$.',
                  ],
                  answer: '$-3$',
                },
                {
                  q: 'Evaluate $(-2) + (-9)$.',
                  solution: [
                    'Now, both addends are negative — like signs, so the legs chain leftward.',
                    'So add the magnitudes and keep the sign: $-(2 + 9) = -11$.',
                    'Hence $-11$.',
                  ],
                  answer: '$-11$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Evaluate $5 - 12$.',
                  solution: [
                    'Now, rewrite the difference as a sum: $5 - 12 = 5 + (-12)$.',
                    'So unlike signs, and the magnitude $12$ wears the minus: $-(12 - 5) = -7$ — the walk crosses zero into debt.',
                    'Hence $-7$.',
                  ],
                  answer: '$-7$',
                },
                {
                  q: 'Find the integer that makes $(-6) + \\square = 0$ true.',
                  solution: [
                    'Now, a sum of $0$ from a nonzero start demands the additive inverse: the box must undo $-6$ exactly.',
                    'So $\\square = -(-6) = 6$; the check closes: $-6 + 6 = 0$.',
                    'Hence $6$.',
                  ],
                  answer: '$6$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Evaluate $(-20) - (-8)$.',
                  solution: [
                    'Now, subtracting $-8$ adds $8$: $(-20) - (-8) = (-20) + 8$.',
                    'So unlike signs, the magnitude $20$ keeps its minus: $-(20 - 8) = -12$ — the walk starts $20$ left and climbs back $8$.',
                    'Hence $-12$.',
                  ],
                  answer: '$-12$',
                },
                {
                  q: 'Evaluate $(-3) + (-7) - (-6)$.',
                  solution: [
                    'Now, the like-signed pair first: $(-3) + (-7) = -10$.',
                    'So the chain reads $-10 - (-6) = -10 + 6 = -4$.',
                    'Hence $-4$ — and associativity certifies any other staging: $(-3) + [(-7) + 6] = -3 + (-1) = -4$, the same landing.',
                  ],
                  answer: '$-4$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A submarine sits at $-240$ m. It rises $85$ m, then dives $130$ m. At what depth does it end?',
                  solution: [
                    'Now, chain the moves: $-240 + 85 - 130$.',
                    'So the first pair: $-240 + 85 = -155$ — still $155$ m down after the rise.',
                    'And the dive: $-155 - 130 = -285$.',
                    'Hence $-285$ m — $285$ metres below the surface.',
                  ],
                  answer: '$-285$ m',
                },
                {
                  q: 'The sum of two integers is $-16$. One of them is $9$. Find the other.',
                  solution: [
                    'Now, the missing addend is the sum minus the known one: $-16 - 9$.',
                    'So $-16 - 9 = -16 + (-9) = -25$.',
                    'Hence $-25$; the check closes: $9 + (-25) = -16$.',
                  ],
                  answer: '$-25$',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Priya\u2019s account holds Rs $1{,}850$. A cheque of Rs $2{,}400$ is presented (the bank honours the overdraft), after which she deposits Rs $900$. What is the final balance?',
                  solution: [
                    'Now, chain the ledger: $1850 - 2400 + 900$.',
                    'So after the cheque: $1850 - 2400 = -550$ — a genuine overdraft of Rs $550$, the sign carrying it honestly.',
                    'And the deposit: $-550 + 900 = 350$.',
                    'Hence Rs $350$ in hand.',
                  ],
                  answer: 'Rs $350$',
                },
                {
                  q: 'Srinagar\u2019s dawn temperature is $-6$°C. It rises $8$ degrees by noon, falls $13$ degrees by evening, then rises $5$ degrees by midnight. What does the midnight thermometer read?',
                  solution: [
                    'Now, chain the day: $-6 + 8 - 13 + 5$.',
                    'So stage by stage: $-6 + 8 = 2$ at noon; $2 - 13 = -11$ by evening; $-11 + 5 = -6$ at midnight.',
                    'Hence $-6$°C — the day ends where it began: the rises and falls cancel exactly.',
                  ],
                  answer: '$-6$°C',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Using the law $a - b = a + (-b)$, derive the value of $0 - a$ for any integer $a$, and cash the result at $a = 12$. Which of Brahmagupta\u2019s verses does the answer match?',
                  solution: [
                    'Now, apply the law with the first addend $0$: $0 - a = 0 + (-a) = -a$.',
                    'So subtracting $a$ from zero lands on the opposite of $a$ — the mirror image, direction reversed, magnitude kept.',
                    'Cashed at $a = 12$: $0 - 12 = -12$; and at $a = -5$: $0 - (-5) = 5$.',
                    'Hence the verse: a fortune subtracted from zero is a debt, and a debt subtracted from zero is a fortune — stated in $628$ CE, derived here on the line.',
                  ],
                  answer: '$0 - a = -a$; at $a = 12$ the value is $-12$',
                },
                {
                  q: 'List every integer $n$ satisfying both $n - 4 > -6$ and $n \\le 2$, then find their sum.',
                  solution: [
                    'Now, untangle the first condition: $n - 4 > -6$, so adding $4$ to both sides shifts the anchor: $n > -2$.',
                    'So $n$ must satisfy $-2 < n$ and $n \\le 2$: the integers $-1, 0, 1, 2$ — four ticks strictly right of $-2$ up to and including $2$.',
                    'Their sum: $(-1) + 0 + 1 + 2 = 0 + 2 = 2$ — the mirror pair $-1$ and $1$ cancels, leaving $2$.',
                    'Hence the set $\\{-1, 0, 1, 2\\}$ with sum $2$ — Lesson 7.1\u2019s ordering and this lesson\u2019s operations in one breath.',
                  ],
                  answer: '$\\{-1, 0, 1, 2\\}$; the sum is $2$',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
