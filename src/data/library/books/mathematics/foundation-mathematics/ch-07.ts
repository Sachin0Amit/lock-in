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
    'Adding and Subtracting Integers',
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
  ],
}
