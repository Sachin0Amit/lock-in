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
 * LESSON 7.3 Multiplying Integers and the Sign Rules (run 35,
 * 2026-11-04) — the walk repeats: multiplication is m legs of one
 * length (figure 1 the repeated walk 3 × (−5) = −15, three cubic arcs
 * with solid heads at −5/−10/−15 on a 34-px line); the positive
 * walk-count settles two sign cases, commutativity (grid-checked)
 * buys the third, and the fourth — minus × minus — is derived TWICE:
 * figure 2 the product staircase (bars for (−5)×m, m = 3..−3, at
 * 7 px per unit — the bar ends lie on one straight line crossing zero
 * at m = 0) + the staircase derivation (each rung down in the
 * multiplier adds the length, forced by distributivity to continue
 * past zero) and the distributive derivation ((−1)×(−5) + (−1)×5 =
 * (−1)×0 = 0, so (−1)×(−5) = −(−5) = 5 — 7.1's double reflection
 * cashed again); equation tag 1 the distributive law (9,261-triple
 * grid), tag 2 the general sign law (−a)×(−b) = a×b; the sign-case
 * table; the six properties with instances (identity vs the
 * mirror-maker Caution); sign parity for chains (Y-section
 * brute-forced over every signed chain of length 1–5); Brahmagupta's
 * 628 CE multiplication verses (debt × debt = fortune — Colebrooke
 * 1817, paraphrased then derived); 8 terms, 5-quiz keys 2/1/1/0/3,
 * 12 exercises L1–L6 (L6: the distributive derivation of (−1)×a = −a
 * and the parity chain −120). Scope guard: no integer division, no
 * exponent notation. Every number pre-verified by
 * scripts/verify-unit-7.ts (231 checks, A–AB).
 *
 * LESSON 7.4 Absolute Value as Distance (run 36, 2026-11-05) — the
 * chapter's closing lesson, and the full treatment 7.1 promised: the
 * bars read the SIZE of a number, direction discarded. The distance
 * definition (is-said-to-be callout) + the piecewise rule as equation
 * tag 1 (the minus inside the bars is 7.1's INSTRUCTION, not a verdict
 * — the double reflection paying off again); the roman run |7| |−11|
 * |0|; the rule's derivation (distance is a count — never negative;
 * x itself on the non-negative side; the mirror twin −x on the
 * negative side; both lines meeting at |0| = 0); figure 1 the
 * distance-from-zero braces (|−8| = 8 and |5| = 5 at 40 px per step,
 * direction never mentioned); the ordering-by-magnitude cash of 7.1's
 * trap (−8 is the smaller number with the bigger size); the five
 * properties with instances and grid certificates (non-negativity
 * with its zero edge; the mirror property |−x| = |x| swept on
 * [−60,60]; the duality |x| ∈ {x, −x}; the multiplicative property
 * |a×b| = |a||b| on all 441 pairs in [−10,10]^2; the triangle fact
 * |a+b| ≤ |a|+|b| with the equality condition ab ≥ 0 brute-forced on
 * the same grid); the outside-minus Caution (|−9| = 9 but −|9| = −9);
 * figure 2 the two-panel distance-between-points (opposite sides: the
 * gap |5−(−3)| = 8 splits at zero into 3 + 5; same side: the gap
 * |7−2| = 5 is the leftover of 7 after 2 borrows its share — nested
 * braces); the distance formula gap(a,b) = |a−b| = |b−a| as equation
 * tag 2 with its derivation (the walk from a to b is b − a by 7.2's
 * movement model; the size is the gap; the reversed walk is the
 * opposite displacement with the same size) — CASHING every gap the
 * chapter has counted: the lift 9 (both orders), the mall 12/24, the
 * Everest–Dead Sea 9288.64 m, the Vostok–Phalodi 140.2°; the
 * opposite-sides split |a−b| = |a|+|b| and the same-side difference
 * both grid-verified; the verdict table for |x| = k (two answers for
 * k > 0 — the two-answer signature; one at k = 0; none for k < 0);
 * the bars-erase-exactly-one-bit insight; the historical callout
 * (Argand's 1806 modulus; Weierstrass's 1841 |x| in "Zur Theorie der
 * Potenzreihen", MacTutor-grounded); 8 terms, 5-quiz keys 2/1/0/1/3,
 * 12 exercises L1–L6 (L6: the distance derivation cashed at (−5,8);
 * the equality condition ab ≥ 0 proved by cases). Scope guard: no
 * integer division, no coordinate plane (the plane belongs to a later
 * chapter), no exponent notation. Every number pre-verified by
 * scripts/verify-unit-7.ts (302 checks, A–AH).
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
  plannedLessons: [],
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
    {
      id: 'fm-multiplying-integers-sign-rules',
      number: '7.3',
      title: 'Multiplying Integers and the Sign Rules',
      concepts: [
        'Multiplication as a walk repeated',
        'The sign rules derived, not decreed',
        'The staircase descent argument',
        'The distributive law as the engine',
        'A debt times a debt is a fortune',
        'Sign parity for chains of factors',
        'The multiplicative identity and the mirror-maker',
        'The zero product property',
      ],
      objectives: [
        'Multiply any two integers by the two-step rule — magnitudes multiply, the sign table aims — and justify all four cases from the repeated-walk model',
        'Reproduce both derivations of minus-times-minus: the forced staircase and the distributive argument',
        'Verify closure, commutativity, associativity, the identity, the zero product property and the distributive law for integer multiplication with instances',
        'Evaluate chains of factors by sign parity — an even count of minus signs lands positive, an odd count negative',
        'Narrate products as signed quantities — falls per hour, waived penalties — and recover missing factors by the times table plus the sign rules',
      ],
      prerequisites: [
        'fm-negative-numbers-why-they-exist',
        'fm-adding-subtracting-integers',
        'fm-multiplication-repeated-addition',
      ],
      sources: ['ncert-math7-p2-ch2', 'ncert-math6-ch10', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 7.2 taught the line to walk: every sum became a journey, and subtraction turned out to be addition wearing a disguise. One operation of the second storey is still missing — the one the times table was built for. This lesson gives the walk a drumbeat: multiplication is a walk *repeated*, and the four sign cases — including the notorious minus-times-minus — will be *derived*, not decreed, by a staircase anyone can climb and a law everyone already owns.',
        },
        {
          kind: 'para',
          text: 'The stakes are worth stating plainly. In 7.2 the addition rules fell straight out of the walk; here the hardest rule — that the product of two debts is a fortune — has troubled thinkers for centuries, and classrooms still hand it over as an incantation to be memorised. It need not be. Two arguments pin it down completely: one visual (the staircase of products) and one algebraic (the distributive law). Together they turn the incantation into a theorem.',
        },
        { kind: 'heading', text: 'Multiplication is a walk repeated' },
        {
          kind: 'para',
          text: 'Chapter 2 built multiplication from repeated addition: $3 \\times 5$ meant $5 + 5 + 5$, three copies of five. On the walking line the same sentence reads differently — **stand at zero and take three walks, each of length $5$ rightward**. The copies of five become the equal legs of one longer journey, and the landing point is the product. Every whole-number product of chapter 2 re-reads as a walk with several equal legs.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Multiplying integers (the repeated-walk model)',
          text: 'For a positive walk-count $m$ and any integer $b$, the product $m \\times b$ is said to be the position reached by taking $m$ walks of length $|b|$ each in $b$\u2019s direction — rightward when $b$ is positive, leftward when $b$ is negative, no walk at all when $b$ is zero. Thus $3 \\times (-5)$ is three leftward legs of $5$, and the landing is $-15$.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$3 \\times 5$: stand at $0$, take three rightward legs of $5$ — land on $15$. Chapter 2\u2019s $5 + 5 + 5$, seen as one journey.',
            '$3 \\times (-5)$: stand at $0$, take three leftward legs of $5$ — land on $-15$. The same drumbeat, the opposite direction.',
            '$0 \\times (-9)$: zero walks, no journey — the product is $0$. The zero product property, working before it is even named.',
          ],
        },
        {
          kind: 'para',
          text: 'The model answers every product whose first factor is positive. But arithmetic will not be fenced in: the commutative instinct from chapter 2 asks $(-5) \\times 3$ to equal $3 \\times (-5)$, and worse is waiting — what could $(-4) \\times 6$ possibly mean? *Take $-4$ walks* names no motion; a negative number of legs is not a journey anyone can take. The direct reading halts exactly where the interesting cases begin.',
        },
        {
          kind: 'para',
          text: 'Two roads lead past the halt, and they arrive at the same gate. The first follows the *pattern* the known products trace — a staircase whose next step is forced. The second invokes the distributive law, the one bridge between adding and multiplying that chapter 2 certified on the wholes. We walk both.',
        },
        {
          kind: 'figure',
          caption:
            'Multiplication as a walk repeated: $3 \\times (-5) = -15$. Standing at $0$, each leg walks $5$ steps leftward; three legs later the journey has moved $15$ steps left of its start. The times table sizes the answer — $3 \\times 5 = 15$; the sign of the length $-5$ aims it.',
          svg: `<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three leftward legs of five steps each, walked from zero, landing at minus five, minus ten and minus fifteen">
  <line x1="10" y1="150" x2="730" y2="150" stroke="currentColor" stroke-width="2"/>
  <polygon points="10,150 24,143 24,157" fill="currentColor"/>
  <polygon points="730,150 716,143 716,157" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="656" y1="143" x2="656" y2="157"/><line x1="622" y1="143" x2="622" y2="157"/>
    <line x1="588" y1="143" x2="588" y2="157"/><line x1="554" y1="143" x2="554" y2="157"/>
    <line x1="486" y1="143" x2="486" y2="157"/><line x1="452" y1="143" x2="452" y2="157"/>
    <line x1="418" y1="143" x2="418" y2="157"/><line x1="384" y1="143" x2="384" y2="157"/>
    <line x1="316" y1="143" x2="316" y2="157"/><line x1="282" y1="143" x2="282" y2="157"/>
    <line x1="248" y1="143" x2="248" y2="157"/><line x1="214" y1="143" x2="214" y2="157"/>
    <line x1="146" y1="143" x2="146" y2="157"/><line x1="112" y1="143" x2="112" y2="157"/>
    <line x1="78" y1="143" x2="78" y2="157"/><line x1="44" y1="143" x2="44" y2="157"/>
  </g>
  <g stroke="currentColor" stroke-width="2">
    <line x1="690" y1="138" x2="690" y2="162"/><line x1="520" y1="138" x2="520" y2="162"/>
    <line x1="350" y1="138" x2="350" y2="162"/><line x1="180" y1="138" x2="180" y2="162"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="690" y="176">0</text><text x="520" y="176">−5</text>
    <text x="350" y="176">−10</text><text x="180" y="176">−15</text>
  </g>
  <circle cx="690" cy="150" r="5" fill="currentColor"/>
  <circle cx="520" cy="150" r="5" fill="currentColor"/>
  <circle cx="350" cy="150" r="5" fill="currentColor"/>
  <circle cx="180" cy="150" r="5" fill="currentColor"/>
  <path d="M 682 141 C 642 106, 572 108, 534 138" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="520,150 534,142 534,158" fill="currentColor"/>
  <path d="M 512 141 C 472 106, 402 108, 364 138" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="350,150 364,142 364,158" fill="currentColor"/>
  <path d="M 342 141 C 302 106, 232 108, 194 138" fill="none" stroke="currentColor" stroke-width="2"/>
  <polygon points="180,150 194,142 194,158" fill="currentColor"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="608" y="92">leg 1 — 5 left</text>
    <text x="438" y="92">leg 2 — 5 left</text>
    <text x="268" y="92">leg 3 — 5 left</text>
  </g>
  <line x1="180" y1="190" x2="690" y2="190" stroke="currentColor" stroke-width="1.5"/>
  <line x1="180" y1="184" x2="180" y2="196" stroke="currentColor" stroke-width="1.5"/>
  <line x1="690" y1="184" x2="690" y2="196" stroke="currentColor" stroke-width="1.5"/>
  <text x="435" y="216" font-size="12.5" fill="currentColor" text-anchor="middle">three legs of 5 left — the product −15</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Evaluate $4 \\times (-6)$ by the repeated-walk model.',
          steps: [
            'Now, the walk-count $4$ is positive, so the model speaks directly: four legs, each of the length $-6$ — that is, $6$ steps leftward.',
            'So the magnitudes multiply: $4 \\times 6 = 24$ steps in all; the length\u2019s sign aims them left.',
            'Hence $-24$ — the walk lands $24$ steps left of its start. Every product with a positive walk-count surrenders to the same two moves: the times table sizes it, the sign of the length aims it.',
          ],
        },
        {
          kind: 'para',
          text: 'Figure 1 shows the walk of $3 \\times (-5)$: three legs, each $5$ steps leftward, landing at $-5$, then $-10$, then $-15$. Read the picture in the language every product will use from now on. The **magnitude** of the product is the total distance — $3 \\times 5 = 15$ steps, the old times table underneath. The **sign** is fixed by the legs\u2019 direction — leftward, because the length $-5$ points left. Magnitude from the times table, sign from the walk: that division of labour is the whole lesson in one sentence.',
        },
        { kind: 'heading', text: 'The positive walk-count: two sign cases settled' },
        {
          kind: 'para',
          text: 'When the walk-count is positive, the model settles two of the four sign cases at once. A positive length walked repeatedly keeps its direction: $3 \\times 5 = 15$ — sign $+$, magnitude $15$. A negative length walked repeatedly deepens the debt: $3 \\times (-5) = -15$ — sign $-$, magnitude $15$. In both, the times table sizes the answer and the length\u2019s sign aims it.',
        },
        {
          kind: 'para',
          text: 'The third case borrows a law from the wholes. Multiplication was found commutative in chapter 2 because order never mattered for copies of a number; on the integers the law *extends* — the grid check in the properties section confirms $a \\times b = b \\times a$ on all $625$ pairs in $[-12, 12]^2$ — so $(-5) \\times 3 = 3 \\times (-5) = -15$. A negative length with a positive walk-count is the same journey told from the other end: three legs of five leftward, whoever counts first. Three cases are now on the books: agreeing signs and a positive length keep $+$; a negative length (in either position) takes $-$. One case remains — the famous one.',
        },
        { kind: 'heading', text: 'The staircase to the minus side' },
        {
          kind: 'para',
          text: 'Fix the length $-5$ and let the walk-count *descend* one rung at a time. The known side reads: $3 \\times (-5) = -15$; then $2 \\times (-5) = -10$; then $1 \\times (-5) = -5$; then $0 \\times (-5) = 0$. Watch the rungs: each step down in the multiplier *raised* the product by exactly $5$ — from $-15$ up to $-10$, up to $-5$, up to $0$. The reason is not luck: removing one leftward leg of five steps moves the landing five steps back to the right.',
        },
        {
          kind: 'para',
          text: 'The descent law does not know it was only ever meant for positive counts. Held to *every* integer, it forces the minus side of the staircase: from $0 \\times (-5) = 0$, one more step down must add $5$ again — so $(-1) \\times (-5) = 5$; and again — $(-2) \\times (-5) = 10$; and again — $(-3) \\times (-5) = 15$. A debt multiplied by a minus lands on the positive side. The staircase cannot bend without breaking the very law that built its known side.',
        },
        {
          kind: 'figure',
          caption:
            'The staircase that forces the minus side: the products of $(-5)$ with multipliers $m = 3, 2, 1, 0, -1, -2, -3$. Each rung down in the multiplier raises the product by exactly $5$, so the climb cannot stop at zero: $(-5) \\times (-1) = 5$, $(-5) \\times (-2) = 10$, $(-5) \\times (-3) = 15$. The bar ends and the zero dot lie on one straight line, crossing the zero line exactly at $m = 0$.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar staircase of the products of minus five with multipliers three, two, one, zero, minus one, minus two and minus three, climbing five units per rung and crossing zero at multiplier zero">
  <g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5">
    <rect x="610" y="150" width="44" height="105"/>
    <rect x="526" y="150" width="44" height="70"/>
    <rect x="442" y="150" width="44" height="35"/>
    <rect x="274" y="115" width="44" height="35"/>
    <rect x="190" y="80" width="44" height="70"/>
    <rect x="106" y="45" width="44" height="105"/>
  </g>
  <circle cx="380" cy="150" r="4.5" fill="currentColor"/>
  <line x1="40" y1="150" x2="740" y2="150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.6"/>
  <text x="740" y="142" font-size="12" fill="currentColor" text-anchor="end">zero line</text>
  <line x1="632" y1="255" x2="128" y2="45" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5"/>
  <text x="470" y="22" font-size="12.5" fill="currentColor" text-anchor="middle">as the multiplier falls, the product climbs</text>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="632" y="268">−15</text><text x="548" y="236">−10</text><text x="464" y="201">−5</text>
    <text x="380" y="136">0</text>
    <text x="296" y="107">5</text><text x="212" y="72">10</text><text x="128" y="36">15</text>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="632" y="288">3</text><text x="548" y="288">2</text><text x="464" y="288">1</text>
    <text x="380" y="288">0</text>
    <text x="296" y="288">−1</text><text x="212" y="288">−2</text><text x="128" y="288">−3</text>
  </g>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Read the staircase: evaluate $(-5) \\times m$ for $m = 2, 1, 0, -1$.',
          steps: [
            'Now, descend from the known side: $2 \\times (-5) = -10$, $1 \\times (-5) = -5$, $0 \\times (-5) = 0$ — each rung down adding $5$.',
            'So the pattern owes one more rung: $(-1) \\times (-5) = 0 + 5 = 5$.',
            'Hence $-10$, $-5$, $0$, $5$ — the staircase crosses the zero line between $m = 0$ and $m = -1$, exactly as the figure draws it.',
          ],
        },
        {
          kind: 'derivation',
          title: 'Why the staircase must keep climbing',
          statement:
            'Fix the length $-5$ and descend the walk-count one rung at a time: $3 \\times (-5)$, $2 \\times (-5)$, $1 \\times (-5)$, $0 \\times (-5)$ — and onward. Why must each step down change the product by exactly $5$, and why may the descent not stop at zero?',
          steps: [
            {
              label: 'Descend by one rung',
              formula: 'm \\times (-5) \\;=\\; (m-1) \\times (-5) + 1 \\times (-5)',
              explanation:
                'Split $m$ walks into $(m-1)$ walks and $1$ walk — the distributive law at work already on the positive side. Removing the last walk shortens the journey by exactly one full leg: $5$ leftward steps.',
            },
            {
              label: 'Evaluate the known side',
              formula: '3 \\times (-5) = -15,\\;\\; 2 \\times (-5) = -10,\\;\\; 1 \\times (-5) = -5,\\;\\; 0 \\times (-5) = 0',
              explanation:
                'Each rung down adds $+5$: the legs removed were leftward, so removing one moves the landing $5$ steps back to the right.',
            },
            {
              label: 'Demand the law hold everywhere',
              formula: '(-1) \\times (-5) \\;=\\; 0 \\times (-5) + 5 \\;=\\; 5',
              explanation:
                'Nothing in the descent law knows that $m$ started positive. Held to every integer, it forces the next rung: from $0$, one more step down must again add $5$.',
            },
            {
              label: 'Continue the climb',
              formula: '(-2) \\times (-5) = 10, \\qquad (-3) \\times (-5) = 15',
              explanation:
                'Rung after rung, the same $+5$. The staircase cannot bend without breaking the law that built it — the pattern is forced, not lucky.',
            },
          ],
          result:
            'Descending the walk-count raises the product by the length at every rung: $(-1) \\times (-5) = 5$ — a debt times a minus lands on the positive side.',
        },
        {
          kind: 'para',
          text: 'The staircase persuades; the next heading *compels*. One law and four lines will settle every minus-times-minus product at once.',
        },
        { kind: 'heading', text: 'The distributive argument' },
        {
          kind: 'para',
          text: 'Chapter 2 certified the distributive law on the wholes: multiplying a sum multiplies each part. On the integers the law extends — the grid check below re-certifies it on all $9{,}261$ triples in $[-10, 10]^3$ — and it is the bridge that carries the sign rules the last mile.',
        },
        {
          kind: 'equation',
          latex: 'a \\times (b + c) \\;=\\; a \\times b + a \\times c',
          note: 'The distributive law — the one bridge between the two operations. It held on the wholes of chapter 2; the grid check holds it on the integers with no exception. Every sign rule below is this law, cashed.',
        },
        {
          kind: 'derivation',
          title: 'The distributive argument for a debt times a debt',
          statement:
            'The staircase showed the shape; the laws of algebra can pin it. One application of the distributive law settles $(-1) \\times (-5)$ — and with it, every minus-times-minus product at once.',
          steps: [
            {
              label: 'Build a sum that must vanish',
              formula: '(-1) \\times (-5) + (-1) \\times 5 \\;=\\; (-1) \\times \\big((-5) + 5\\big)',
              explanation:
                'Factor out the common multiplier $(-1)$ — the distributive law, equation tag 1, applied with a negative multiplier.',
            },
            {
              label: 'The bracket is zero',
              formula: '= \\; (-1) \\times 0 \\;=\\; 0',
              explanation:
                '$-5$ and $5$ are additive inverses (Lesson 7.1), so their sum is $0$; and the zero product property multiplies it to $0$.',
            },
            {
              label: 'Read the sentence',
              formula: '(-1) \\times (-5) \\;=\\; -\\big((-1) \\times 5\\big) \\;=\\; -(-5)',
              explanation:
                'A sum of $0$ demands its addends be opposites: $(-1) \\times (-5)$ must undo $(-1) \\times 5 = -5$ exactly.',
            },
            {
              label: 'The double reflection finishes it',
              formula: '-(-5) \\;=\\; 5',
              explanation:
                'Lesson 7.1\u2019s derivation returns: the opposite of the opposite returns home. Two minus signs cancel into a plus.',
            },
          ],
          result:
            'For every pair of integers, $(-a) \\times (-b) = a \\times b$ and $(-a) \\times b = a \\times (-b) = -(a \\times b)$: minus-times-minus is plus, minus-times-plus is minus, magnitudes untouched.',
        },
        {
          kind: 'equation',
          latex: '(-a) \\times b \\;=\\; a \\times (-b) \\;=\\; -(a \\times b), \\qquad (-a) \\times (-b) \\;=\\; a \\times b',
          note: 'The general sign law. Script-verified: on all $441$ pairs in $[-10, 10]^2$ both identities hold with zero exceptions — the seed $(-1) \\times (-1) = 1$ multiplies through both sides of every case.',
        },
        { kind: 'heading', text: 'The sign rules, collected' },
        {
          kind: 'para',
          text: 'Four cases, one table, one rule underneath them all: the magnitudes multiply exactly as the times table always did — the signs never touch the size of the answer, they only aim it.',
        },
        {
          kind: 'table',
          head: ['The two signs', 'Agree or differ', 'The rule', 'Instance'],
          rows: [
            ['$+$ and $+$', 'agree', 'multiply the magnitudes, keep $+$', '$3 \\times 5 = 15$'],
            ['$-$ and $-$', 'agree', 'multiply the magnitudes, keep $+$', '$(-3) \\times (-5) = 15$'],
            ['$+$ and $-$', 'differ', 'multiply the magnitudes, take $-$', '$3 \\times (-5) = -15$'],
            ['$-$ and $+$', 'differ', 'multiply the magnitudes, take $-$', '$(-3) \\times 5 = -15$'],
          ],
        },
        {
          kind: 'para',
          text: 'Two steps, every time: multiply the magnitudes by the old times table; then let the signs vote — agreeing signs land positive, differing signs land negative. The staircase of the last heading is the second step made visible, and the distributive argument is its certificate.',
        },
        {
          kind: 'example',
          title: 'Evaluate $(-8) \\times (-9)$.',
          steps: [
            'Now, both factors are negative — agreeing signs.',
            'So multiply the magnitudes: $8 \\times 9 = 72$; agreement lands positive.',
            'Hence $72$ — a debt of eight nines is a fortune of seventy-two, as the old verses say; the table\u2019s second row, worked.',
          ],
        },
        {
          kind: 'example',
          title: 'A cold wave drops the temperature by $6$°C every hour. Write the four-hour change as one product.',
          steps: [
            'Now, each hour\u2019s change wears $-6$°C, and the walk-count is the $4$ hours.',
            'So the total change is $(-6) \\times 4$: differing signs take $-$; magnitudes $6 \\times 4 = 24$.',
            'Hence $-24$°C — the thermometer reads $24$ degrees lower than it began. The third row of the table, wearing units.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Zero is signed by no one',
          text: 'Zero is neither positive nor negative (Lesson 7.1), so no sign table can decide its products — and none needs to: $a \\times 0 = 0$ for every integer $a$, by the zero product property. Examination answer keys see the error often enough: there is no \u201csign of zero\u201d to argue about, and a product that touches zero lands exactly on zero.',
        },
        { kind: 'heading', text: 'Properties of integer multiplication' },
        {
          kind: 'para',
          text: 'Around the four cases, the old laws stand up and introduce themselves to the new numbers — as addition\u2019s did in 7.2. Each carries a script-verified instance, and each is a licence the exercises will spend.',
        },
        {
          kind: 'list',
          items: [
            '**closure**: the product of two integers is an integer — $(-7) \\times 12 = -84$ never leaves $\\mathbb{Z}$. The times table has no gaps to fall through.',
            '**commutativity**: $a \\times b = b \\times a$; instance $(-8) \\times 7 = -56 = 7 \\times (-8)$. Grid-checked on all $625$ pairs in $[-12, 12]^2$ — the licence behind reading either factor as the walk-count.',
            '**associativity**: $(a \\times b) \\times c = a \\times (b \\times c)$; instance $((-2) \\times 3) \\times (-5) = (-6) \\times (-5) = 30$ and $(-2) \\times (3 \\times (-5)) = (-2) \\times (-15) = 30$. Chains may be grouped wherever convenient.',
            '**the multiplicative identity**: $a \\times 1 = a$; instance $(-25) \\times 1 = -25$. One walks you nowhere new. Its shadow: $(-1) \\times a = -a$ — one\u2019s mirror twin flips every integer to its opposite, the *mirror-maker*.',
            '**the zero product property**: $a \\times 0 = 0$; instance $(-13) \\times 0 = 0$. Zero walks, zero landing, no sign to argue with.',
            '**the distributive law**: $a \\times (b + c) = a \\times b + a \\times c$; instance $5 \\times (6 + (-4)) = 5 \\times 2 = 10 = 30 + (-20)$. The bridge that derived today\u2019s hardest rule — and tomorrow\u2019s fastest simplifications.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'One and minus one are not twins',
          text: 'The identity $1$ *preserves* every integer: $1 \\times a = a$. The mirror-maker $-1$ *reverses* every integer: $(-1) \\times a = -a$. Confusing them is the classic slip: $1 \\times (-6) = -6$, but $(-1) \\times (-6) = 6$. The mirror-maker applied twice restores the original — $(-1) \\times (-1) \\times a = a$ — two reflections, one homecoming.',
        },
        {
          kind: 'example',
          title: 'A bank waives a Rs $200$ penalty three times. Write the total effect as one product.',
          steps: [
            'Now, the ledger wears each penalty as Rs $-200$; a waiver is a *removal* of a penalty — and there are three removals.',
            'So the total is $(-3) \\times (-200)$: magnitudes $3 \\times 200 = 600$; agreeing signs land positive.',
            'Hence Rs $+600$ — the account stands Rs $600$ richer than before the penalties existed. Removing debts is earning; that is minus-times-minus in the language of the passbook.',
          ],
        },
        {
          kind: 'example',
          title: 'Find the integer: $(-9) \\times \\square = 72$.',
          steps: [
            'Now, the product $72$ is positive while the known factor $-9$ is negative — so the hidden factor must be negative too: agreeing signs are the only road to a positive product.',
            'So the magnitudes must satisfy $9 \\times |\\square| = 72$, and the times table answers $8$.',
            'Hence $\\square = -8$; the check closes: $(-9) \\times (-8) = 72$.',
          ],
        },
        { kind: 'heading', text: 'Products of many factors' },
        {
          kind: 'para',
          text: 'Chains of factors need no new machinery: multiply two, multiply by the next, and let each sign vote. But a shortcut reveals itself — **count the minus signs**. An *even* number of negative factors cancels into a positive product; an *odd* number leaves it negative. The magnitudes multiply as always.',
        },
        {
          kind: 'para',
          text: 'The reason sits in the mirror-maker. Every negative factor is $(-1)$ walking alongside a magnitude, and $(-1) \\times (-1) = 1$ — derived above. So pairs of minus signs annihilate, and a lone survivor turns the product negative: three minus signs leave one survivor; five leave one; two leave none. Count to odd or even, and the sign is decided before any magnitude is touched.',
        },
        {
          kind: 'example',
          title: 'Evaluate $(-2) \\times (-3) \\times (-4)$.',
          steps: [
            'Now, three factors carry minus signs — an odd count — so exactly one $(-1)$ survives the annihilation and the product is negative.',
            'So the magnitudes multiply: $2 \\times 3 \\times 4 = 24$; the survivor aims it.',
            'Hence $-24$ — and the long way agrees: $(-2) \\times (-3) = 6$, then $6 \\times (-4) = -24$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Parity belongs to products only',
          text: 'The minus-count shortcut is licensed by $(-1) \\times (-1) = 1$ *inside a product*. Sums obey nothing of the sort: $(-2) + (-3) + (-4) = -9$ — three minuses did not make a plus. Read the operation before reading the signs; the parity habit applied to a sum is a guaranteed wrong answer.',
        },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that the integers multiply under a rule that was never decreed: the times table sizes every product, the sign table aims it, and the aim is forced — once by the staircase the known products trace, once by the distributive law they obey. What 7.2 did for addition and subtraction, this lesson has done for multiplication: no incantation survives that a derivation cannot replace.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Integers in the examination hall',
          text: 'Integer multiplication appears in every aptitude paper as sign discipline under time pressure. SSC CHSL/MTS banks ask straight products and three-factor chains where the parity count decides in one glance; RRB NTPC CBT-I items embed signed products inside simplifications — shapes like $(-6) \\times 47 + (-6) \\times 53$, where factoring out the $-6$ saves a full minute; banking clerical preliminaries wrap products in narration — fines waived, deposits reversed — where the first task is translating words into signs. The shapes are cited from these banks\u2019 published patterns; none is reproduced. One habit pays for the whole topic: count minus signs first, magnitudes second.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Brahmagupta\u2019s verses on fortune and debt',
          text: 'In 628 CE, Brahmagupta\u2019s *Brahmasphutasiddhanta* stated the sign laws in the language of fortune and debt: a fortune multiplied by a fortune is a fortune; a fortune by a debt is a debt; and a debt by a debt — a fortune (surviving through Colebrooke\u2019s 1817 Sanscrit translation; paraphrased here, and *derived* — not recited — in the staircase and distributive arguments above). Europe needed centuries to stop flinching: as Lesson 7.1 recorded, negative roots were still being called darkness in 1758. What Brahmagupta saw, and this lesson rebuilt from the ground, is that the rule is not a convention at all — it is the distributive law\u2019s unavoidable verdict. The verses earned their fame; the derivation earns more.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Product',
              def: 'The landing point of the repeated walk: for integers $a$ and $b$, the product $a \\times b$ has magnitude $|a| \\times |b|$ and sign $+$ when $a, b$ agree, $-$ when they differ.',
            },
            {
              term: 'Repeated-walk model',
              def: 'Multiplication read as a walk taken many times: $m \\times b$ with $m$ positive is $m$ legs of length $|b|$ in $b$\u2019s direction; the staircase of products extends the reading to negative walk-counts.',
            },
            {
              term: 'Sign rules for multiplication',
              def: 'Agreeing signs multiply to a positive product, differing signs to a negative — derived from the walk and forced by the distributive law, never decreed.',
            },
            {
              term: 'Sign parity',
              def: 'In a chain of factors, an even count of minus signs lands positive and an odd count lands negative: pairs of $(-1)$s annihilate, a survivor flips.',
            },
            {
              term: 'Multiplicative identity',
              def: '$a \\times 1 = a$ — one preserves every integer. Its mirror twin: $(-1) \\times a = -a$, the mirror-maker that reverses every integer.',
            },
            {
              term: 'Zero product property',
              def: '$a \\times 0 = 0$ for every integer $a$ — zero walks, zero landing; zero carries no sign to argue with.',
            },
            {
              term: 'Commutative law of multiplication',
              def: '$a \\times b = b \\times a$ — carried over from the wholes and grid-verified on the integers; the licence to read either factor as the walk-count.',
            },
            {
              term: 'Distributive law',
              def: '$a \\times (b + c) = a \\times b + a \\times c$ — the bridge between the two operations, and the engine that forces minus-times-minus to land positive.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Evaluate $(-7) \\times 5$.',
              options: ['$35$', '$-12$', '$-35$', '$12$'],
              answer: 2,
              explain:
                'Differing signs: magnitudes $7 \\times 5 = 35$, take $-$ (Option 3). Option 1 drops the sign; Options 2 and 4 misapply the *addition* rule, adding the magnitudes $7 + 5 = 12$ instead of multiplying them.',
            },
            {
              q: 'Evaluate $(-9) \\times (-6)$.',
              options: ['$-54$', '$54$', '$15$', '$-15$'],
              answer: 1,
              explain:
                'Agreeing signs: $9 \\times 6 = 54$, keep $+$ (Option 2). Option 1 drops the sign; Options 3 and 4 add the magnitudes $9 + 6 = 15$ — the addition rule creeping in where the times table rules.',
            },
            {
              q: 'The chain $(-1) \\times (-1) \\times (-1)$ equals',
              options: ['$1$', '$-1$', '$3$', '$-3$'],
              answer: 1,
              explain:
                'Three minus signs — an odd count — so the product is negative (Option 2), and every factor is $\u00b11$, so the size is $1$. Option 1 miscounts the parity; Options 3 and 4 tinker with the size, which three ones can only ever multiply to $1$.',
            },
            {
              q: 'The product $(-2) \\times (-5) \\times (-3) \\times 4$ is',
              options: ['$-120$', '$120$', '$-60$', '$60$'],
              answer: 0,
              explain:
                'Three minus signs — odd — so the sign is $-$; magnitudes $2 \\times 5 \\times 3 \\times 4 = 120$ (Option 1). Option 2 miscounts the parity; Options 3 and 4 halve a factor ($2 \\times 5 \\times 3 \\times 2 = 60$) instead of multiplying all four.',
            },
            {
              q: 'A temperature falls $6$°C every hour for $4$ hours. The signed change over the four hours is',
              options: ['$24$°C', '$-10$°C', '$10$°C', '$-24$°C'],
              answer: 3,
              explain:
                'Each hour contributes $-6$; the walk-count is $4$: $(-6) \\times 4 = -24$ (Option 4). Option 1 drops the sign; Options 2 and 3 add the magnitudes $6 + 4 = 10$ — the addition rule, not the times table.',
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
                  q: 'Evaluate $(-6) \\times 8$.',
                  solution: [
                    'Now, the signs differ, so the product takes $-$.',
                    'So multiply the magnitudes: $6 \\times 8 = 48$.',
                    'Hence $-48$.',
                  ],
                  answer: '$-48$',
                },
                {
                  q: 'Evaluate $(-3) \\times (-12)$.',
                  solution: [
                    'Now, the signs agree — two negatives — so the product lands positive.',
                    'So multiply the magnitudes: $3 \\times 12 = 36$.',
                    'Hence $36$.',
                  ],
                  answer: '$36$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Evaluate $9 \\times (-7)$.',
                  solution: [
                    'Now, the signs differ: the product takes $-$.',
                    'So the magnitudes: $9 \\times 7 = 63$.',
                    'Hence $-63$.',
                  ],
                  answer: '$-63$',
                },
                {
                  q: 'Evaluate $(-5) \\times 0$.',
                  solution: [
                    'Now, zero carries no sign and takes no walk — the zero product property decides before any table is consulted.',
                    'So $(-5) \\times 0 = 0$: five walks of no length land nowhere.',
                    'Hence $0$.',
                  ],
                  answer: '$0$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Evaluate $(-4) \\times (-25)$.',
                  solution: [
                    'Now, agreeing signs — the product lands positive.',
                    'So the magnitudes: $4 \\times 25 = 100$.',
                    'Hence $100$.',
                  ],
                  answer: '$100$',
                },
                {
                  q: 'Evaluate $(-2) \\times (-5) \\times (-6)$.',
                  solution: [
                    'Now, count the minus signs: three — odd — so one $(-1)$ survives the annihilation and the product is negative.',
                    'So the magnitudes: $2 \\times 5 \\times 6 = 60$.',
                    'Hence $-60$ — and the long way agrees: $(-2) \\times (-5) = 10$, then $10 \\times (-6) = -60$.',
                  ],
                  answer: '$-60$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A cold wave lowers the temperature by $6$°C each hour. What is the signed change after $5$ hours?',
                  solution: [
                    'Now, each hour wears $-6$°C and the walk-count is $5$: the product is $(-6) \\times 5$.',
                    'So differing signs take $-$; magnitudes $6 \\times 5 = 30$.',
                    'Hence $-30$°C — thirty degrees colder than the reading at hour zero.',
                  ],
                  answer: '$-30$°C',
                },
                {
                  q: 'Find the integer: $(-9) \\times \\square = 72$.',
                  solution: [
                    'Now, the product $72$ is positive while the known factor $-9$ is negative — so the hidden factor must be negative too: agreeing signs are the only road to a positive product.',
                    'So the magnitudes must satisfy $9 \\times |\\square| = 72$, and the times table answers $8$.',
                    'Hence $\\square = -8$; the check closes: $(-9) \\times (-8) = 72$.',
                  ],
                  answer: '$-8$',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Evaluate $(-6) \\times 47 + (-6) \\times 53$ without multiplying both terms out in full.',
                  solution: [
                    'Now, both terms share the factor $-6$ — the distributive law factors it out.',
                    'So $(-6) \\times 47 + (-6) \\times 53 = (-6) \\times (47 + 53) = (-6) \\times 100$.',
                    'And $(-6) \\times 100 = -600$ — differing signs, magnitude $600$.',
                    'Hence $-600$; the long way agrees: $-282 + (-318) = -600$.',
                  ],
                  answer: '$-600$',
                },
                {
                  q: 'A school waives three pending fines of Rs $250$ each. Write the total effect as one signed product.',
                  solution: [
                    'Now, each fine sits on the books as Rs $-250$; a waiver is a removal — and there are three removals.',
                    'So the total is $(-3) \\times (-250)$: agreeing signs, magnitude $3 \\times 250 = 750$.',
                    'Hence Rs $+750$ — the books stand Rs $750$ better off than before the fines existed. Removing debts is gaining.',
                  ],
                  answer: 'Rs $+750$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Using only the distributive law, the identity and the zero product property, derive $(-1) \\times a = -a$ for every integer $a$; cash it at $a = 13$; and state the consequence for $(-a) \\times (-b)$.',
                  solution: [
                    'Now, start from the split $1 = 1 + (-1)$ — the inverse law of 7.2 — and multiply by $a$: $a = a \\times 1 = a \\times (1 + (-1))$.',
                    'So distributing: $a \\times (1 + (-1)) = a \\times 1 + a \\times (-1) = a + a \\times (-1)$.',
                    'And the bracket $1 + (-1) = 0$, so the whole right side is $a \\times 0 = 0$ — the zero product property.',
                    'Thus $a + a \\times (-1) = 0$: the product $a \\times (-1)$ must be the additive inverse of $a$, which is $-a$ — and the opposite is unique (Lesson 7.1).',
                    'Cashed at $a = 13$: $(-1) \\times 13 = -13$, and indeed $13 + (-13) = 0$.',
                    'Hence the consequence: $(-a) \\times (-b) = (-1) \\times a \\times (-1) \\times b = (-1) \\times (-1) \\times a \\times b = 1 \\times a \\times b = a \\times b$ — the seed $(-1) \\times (-1) = 1$ in the middle, the whole sign rule around it.',
                  ],
                  answer: '$(-1) \\times a = -a$; at $a = 13$: $-13$; and $(-a) \\times (-b) = a \\times b$',
                },
                {
                  q: 'Evaluate $(-2) \\times (-3) \\times 4 \\times (-5)$ and state, in one sentence, the parity rule the chain exhibits.',
                  solution: [
                    'Now, three factors wear minus signs — odd — so exactly one $(-1)$ survives the annihilation and the product is negative.',
                    'So the magnitudes: $2 \\times 3 \\times 4 \\times 5 = 120$.',
                    'Hence $-120$ — and the rule: a product of integers is positive when an even number of its factors are negative and negative when the count is odd, because pairs of minus signs multiply to $1$ and a survivor multiplies to $-1$.',
                  ],
                  answer: '$-120$',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-absolute-value-as-distance',
      number: '7.4',
      title: 'Absolute Value as Distance',
      concepts: [
        'Absolute value as distance from zero',
        'The piecewise rule',
        'The mirror property',
        'Ordering by magnitude',
        'The multiplicative property',
        'The triangle fact',
        'The distance between two numbers',
        'Reading equations in bars',
      ],
      objectives: [
        'Define absolute value as distance from zero, evaluate it by the piecewise rule, and justify why the rule never returns a negative',
        'Verify the properties — non-negativity, the mirror property, the duality, the multiplicative property, the triangle fact — with instances and counterexamples',
        'Order integers by magnitude and separate "greater number" from "greater size"',
        'Compute the distance between any two integers as |a − b| = |b − a|, and re-read the chapter\u2019s counted gaps — the lift, the Everest–Dead Sea gap, the Vostok–Phalodi gap — as one subtraction in bars',
        'Solve absolute-value equations |x| = k — two answers for k > 0, one for k = 0, none for k < 0 — and explain each verdict geometrically',
      ],
      prerequisites: [
        'fm-negative-numbers-why-they-exist',
        'fm-adding-subtracting-integers',
        'fm-multiplying-integers-sign-rules',
      ],
      sources: ['ncert-math7-p2-ch2', 'ncert-math6-ch10', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Three lessons have rebuilt the number line from the ground up. Lesson 7.1 chose a zero, named the two directions, and grew the line a left half; Lesson 7.2 taught the line to walk, and every addition and subtraction became a journey; Lesson 7.3 gave the walk a drumbeat, and the four sign cases — minus-times-minus included — were derived, not decreed. One question has been waiting since 7.1\u2019s first look: *how big is a number, direction discarded?* The question sounds casual, but it carries the chapter\u2019s whole payoff — every gap this book has counted by pacing it out (the lift\u2019s storeys, the degrees between Vostok and Phalodi, the metres between Everest and the Dead Sea) is about to collapse into one expression wearing two vertical bars.',
        },
        {
          kind: 'para',
          text: 'The notion matters because so many questions are *direction-blind*. Which is the heavier debt — $-8$ or $-3$? Which reading is the more extreme? How far does the thermometer swing between dawn and noon? In each, the signs aim the answer but the *sizes* decide it, and a notation that reads only the size turns wordy questions into one-line computations. There is a surprise waiting too: the innocent-looking equation $|x| = 5$ has *two* answers — the first equation in this book whose solution set is a pair — and that surprise is exactly why absolute-value questions are an examination staple.',
        },
        { kind: 'heading', text: 'Absolute value: the size of a number' },
        {
          kind: 'para',
          text: 'Every integer wears two pieces of information, and the line displays both: *which side of the chosen zero* (the sign) and *how many steps from it* (the size). Lesson 7.1 named the side, taught opposites, and took a first look at the size — $|-8| = |8| = 8$, $|0| = 0$ — promising the full treatment for later. Later has arrived. The official notion keeps 7.1\u2019s meaning and adds a name, a notation and a rule.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Absolute value (the distance definition)',
          text: 'The **absolute value** of an integer $x$ is said to be its **distance from $0$ on the number line** — the count of steps from the chosen zero to $x$, direction discarded. It is written $|x|$, read \u201cthe absolute value of $x$\u201d. Distance is a count of steps and never a direction, so an absolute value is never negative. Thus $|-8| = |8| = 8$: the mirror pair of Lesson 7.1 stands at *one* distance from zero, and the bars read that distance without asking which twin they were handed.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$|7| = 7$: seven steps rightward — the count is $7$.',
            '$|-11| = 11$: eleven steps leftward — the count is $11$, the *opposite* of the number. The minus named the direction; the bars keep only the count.',
            '$|0| = 0$: zero steps from zero. Zero is its own distance — the one integer the bars leave exactly as they found it.',
          ],
        },
        {
          kind: 'para',
          text: 'The three readings follow one rule, and the rule writes itself once the two cases are told apart. For a non-negative $x$, the steps from zero to $x$ *are* the number $x$ — counting them rightward needs no instruction. For a negative $x$, the count of steps is the *opposite* of the number: the minus inside the bars is Lesson 7.1\u2019s instruction (\u201ctake the opposite\u201d), and applying it to a negative lands on positive ground — $|-24| = -(-24) = 24$, the double reflection paying off yet again.',
        },
        {
          kind: 'equation',
          latex: '|x| \\;=\\; \\begin{cases} x, & x \\ge 0, \\\\[2pt] -x, & x < 0, \\end{cases} \\qquad |0| = 0',
          note: 'The two-line rule — the definition, computed. The minus in the second line is an instruction, not a verdict: for a negative $x$, the distance to zero is $x$\u2019s opposite, which lands positive. Script-checked on every integer in $[-100, 100]$.',
        },
        {
          kind: 'derivation',
          title: 'Why the rule computes the distance',
          statement:
            'The definition demands a distance: a count of steps, never negative. Why does the two-line rule — $x$ itself on the non-negative side, the opposite $-x$ on the negative side — always return exactly that count?',
          steps: [
            {
              label: 'Distances are counts, so they cannot be negative',
              formula: '|x| \\ge 0 \\quad \\text{for every integer } x',
              explanation:
                'A count of steps between two points on the line cannot be less than zero. This is the definition\u2019s first demand — any rule that returns a negative has miscounted.',
            },
            {
              label: 'The non-negative side needs no instruction',
              formula: 'x \\ge 0 \\;\\Longrightarrow\\; |x| = x',
              explanation:
                'From zero to a non-negative $x$ the steps count rightward to exactly $x$ — the number is its own distance. Instances: $|7| = 7$, $|0| = 0$.',
            },
            {
              label: 'The negative side borrows the mirror',
              formula: 'x < 0 \\;\\Longrightarrow\\; |x| = -x',
              explanation:
                'From zero to a negative $x$ the steps count to the mirror twin $-x$ (Lesson 7.1): $|-11| = -(-11) = 11$. The minus inside the bars is the instruction; the output lands positive.',
            },
            {
              label: 'The two cases meet at zero',
              formula: '|0| = 0',
              explanation:
                'Zero stands no steps from itself; both lines of the rule agree there, and the piecewise machinery closes without a gap.',
            },
          ],
          result:
            'For every integer the two-line rule returns exactly the count of steps from zero — never negative; equal to $x$ on the right side of zero, to $-x$ on the left.',
        },
        {
          kind: 'para',
          text: 'Figure 1 draws the definition: two points, two distance braces, one question — *how many steps from zero?* — asked without once mentioning a direction. The same picture settles comparisons that sign-reading cannot. Which is the heavier debt, $-8$ or $-3$? As *numbers*, $-8 < -3$ — Lesson 7.1\u2019s trap: more debt is less wealth. As *sizes*, the verdict flips: $|-8| = 8 > 3 = |-3|$ — eight steps from zero outweighs three. Ordering by magnitude is a different question from ordering the numbers, and the bars keep the two from blurring.',
        },
        {
          kind: 'figure',
          caption:
            'Absolute value as distance from zero: $|-8| = 8$ and $|5| = 5$. Each brace measures the count of steps from the chosen zero — the left brace walks eight steps into the negative side, the right five into the positive — and reports the count with no direction attached. The bars ask *how far*, never *which way*.',
          svg: `<svg viewBox="0 0 760 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The number line with a brace of eight steps from zero to minus eight and a brace of five steps from zero to five, both distances read by absolute value bars">
  <line x1="10" y1="80" x2="750" y2="80" stroke="currentColor" stroke-width="2"/>
  <polygon points="10,80 24,73 24,87" fill="currentColor"/>
  <polygon points="750,80 736,73 736,87" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="20" y1="73" x2="20" y2="87"/><line x1="100" y1="73" x2="100" y2="87"/>
    <line x1="140" y1="73" x2="140" y2="87"/><line x1="180" y1="73" x2="180" y2="87"/>
    <line x1="220" y1="73" x2="220" y2="87"/><line x1="260" y1="73" x2="260" y2="87"/>
    <line x1="300" y1="73" x2="300" y2="87"/><line x1="340" y1="73" x2="340" y2="87"/>
    <line x1="420" y1="73" x2="420" y2="87"/><line x1="460" y1="73" x2="460" y2="87"/>
    <line x1="500" y1="73" x2="500" y2="87"/><line x1="540" y1="73" x2="540" y2="87"/>
    <line x1="620" y1="73" x2="620" y2="87"/><line x1="660" y1="73" x2="660" y2="87"/>
    <line x1="700" y1="73" x2="700" y2="87"/><line x1="740" y1="73" x2="740" y2="87"/>
  </g>
  <g stroke="currentColor" stroke-width="2">
    <line x1="60" y1="68" x2="60" y2="92"/><line x1="380" y1="68" x2="380" y2="92"/>
    <line x1="580" y1="68" x2="580" y2="92"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="60" y="106">−8</text><text x="380" y="106">0</text><text x="580" y="106">5</text>
  </g>
  <circle cx="60" cy="80" r="5" fill="currentColor"/>
  <circle cx="380" cy="80" r="5" fill="currentColor"/>
  <circle cx="580" cy="80" r="5" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="60" y1="120" x2="380" y2="120"/>
    <line x1="60" y1="114" x2="60" y2="126"/>
    <line x1="380" y1="114" x2="380" y2="126"/>
    <line x1="380" y1="134" x2="580" y2="134"/>
    <line x1="380" y1="128" x2="380" y2="140"/>
    <line x1="580" y1="128" x2="580" y2="140"/>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="220" y="144">|−8| = 8</text><text x="480" y="158">|5| = 5</text>
  </g>
  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the bars ask: how many steps from zero? — never which way</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Evaluate $|-24|$ and $|24|$, and explain why the two agree.',
          steps: [
            'Now, $24$ and $-24$ are a mirror pair (Lesson 7.1) — same distance from zero, opposite sides.',
            'So each stands $24$ steps from zero: $|-24| = -(-24) = 24$ and $|24| = 24$.',
            'Hence both read $24$ — the bars ask for the count of steps, and direction is not a step. One distance, two signs, one answer.',
          ],
        },
        { kind: 'heading', text: 'What the bars do — and what they never do' },
        {
          kind: 'para',
          text: 'A notation earns its keep by what it protects you from. The properties below are the bars\u2019 working habits; each carries an instance, and the two grid-checked ones carry sweep certificates — every pair in $[-10, 10]^2$, no exceptions.',
        },
        {
          kind: 'list',
          items: [
            '**non-negativity**: $|x| \\ge 0$ for every integer $x$, and $|x| = 0$ only when $x = 0$ — instance $|-13| = 13$. Distance has no negative dress; the single edge case is zero itself.',
            '**the mirror property**: $|-x| = |x|$ — instance $|-40| = 40 = |40|$. Mirror pairs are indistinguishable to the bars; swept on all integers in $[-60, 60]$.',
            '**the duality**: every absolute value is one of the two numbers it encloses — $|x| = x$ or $|x| = -x$ (both meet at $|0| = 0$). The bars never invent a third value.',
            '**the multiplicative property**: $|a \\times b| = |a| \\times |b|$ — instance $|(-6) \\times 4| = |-24| = 24 = 6 \\times 4$. Grid-checked on all $441$ pairs in $[-10, 10]^2$: the sign may be cancelled inside the bars or outside — the size never notices.',
            '**the triangle fact**: $|a + b| \\le |a| + |b|$ — instance $|(-4) + 9| = 5 \\le 13 = 4 + 9$. The two-leg walk is never longer than the legs\u2019 total (grid-checked on all $441$ pairs); equality holds exactly when the legs stand on the same side of zero, or one leg is zero.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'A minus outside the bars is not swallowed',
          text: 'The bars erase the sign of what is *inside* them — nothing more. A minus *outside* keeps its full strength: $|-9| = 9$, but $-|9| = -9$. The pair is worth memorising as a contrast, because examination keys mine the difference: the first asks how far $-9$ sits from zero; the second asks for the opposite of $|9|$ — a distance, then negated. Read from the outside in: bars first, then whatever the outside hands you.',
        },
        {
          kind: 'example',
          title: 'Evaluate $|(-3) \\times 4|$ and $|-3| \\times |4|$, and compare.',
          steps: [
            'Now, product first: $(-3) \\times 4 = -12$ by 7.3\u2019s sign rules, so $|(-3) \\times 4| = |-12| = 12$.',
            'So sizes first: $|-3| = 3$ and $|4| = 4$, and $3 \\times 4 = 12$.',
            'Hence both roads land on $12$ — the multiplicative property at $(-3, 4)$: for products, the sign can be handled inside the bars or outside, and the size never notices.',
          ],
        },
        {
          kind: 'para',
          text: 'The triangle fact deserves a paragraph of its own, because it is 7.2\u2019s movement model read with size-blind eyes. Two legs of sizes $|-4| = 4$ and $|9| = 9$ make a journey. If the legs *agree*, every step compounds and the net size is the full $13$; if they *disagree*, the walk doubles back on itself and the net size is the *difference* — $|(-4) + 9| = |5| = 5$. A journey is never longer than the sum of its legs, and it is shorter exactly when the legs fight each other.',
        },
        {
          kind: 'example',
          title: 'Decide, with reasons, whether $|a + b| = |a| + |b|$ at $(a, b) = (-4, 9)$ and at $(-4, -9)$.',
          steps: [
            'Now, at $(-4, 9)$ the legs disagree: $|(-4) + 9| = |5| = 5$, while $|-4| + |9| = 4 + 9 = 13$ — the walk doubled back, and $5 \\ne 13$.',
            'So at $(-4, -9)$ the legs agree: $|(-4) + (-9)| = |-13| = 13 = 4 + 9$ — every step compounded, and equality holds.',
            'Hence the rule behind the two verdicts: equality holds exactly when the two integers stand on the same side of zero (or one is $0$) — grid-verified on all $441$ pairs in $[-10, 10]^2$. Disagreeing sides pay the backtrack toll.',
          ],
        },
        { kind: 'heading', text: 'The distance between two numbers' },
        {
          kind: 'para',
          text: 'Lesson 7.1 counted the chapter\u2019s gaps the honest way — pacing them out: the lift climbed $9$ storeys one at a time; the Everest–Dead Sea gap was read as two distances to sea level and added; the Vostok–Phalodi span was counted degree by degree. Pacing works, but it is slow and it is not a formula. The bars supply what pacing lacks. The walk from $a$ to $b$ satisfies $a + (\\text{the walk}) = b$, so by 7.2\u2019s movement model the walk itself is $b - a$; its *size* — direction discarded — is exactly the gap.',
        },
        {
          kind: 'equation',
          latex: '\\text{the gap between } a \\text{ and } b \\;=\\; |a - b| \\;=\\; |b - a|',
          note: 'The distance formula for the line. Script-verified on all $441$ pairs in $[-10, 10]^2$: the two orders agree everywhere, and the gap is $0$ exactly when $a = b$. Walking the other way never changes the distance.',
        },
        {
          kind: 'derivation',
          title: 'Why the gap is |a − b|',
          statement:
            'The gap between two integers $a$ and $b$ should be a single number — no pacing, no sign table. Why is it $|a - b|$, and why does the reversed order give the same answer?',
          steps: [
            {
              label: 'Name the walk',
              formula: 'a + (b - a) = b',
              explanation:
                '7.2\u2019s movement model says final position = start + walk; solving for the walk gives $b - a$ — the signed displacement from $a$ to $b$, positive when $b$ lies rightward of $a$, negative when leftward.',
            },
            {
              label: 'Keep the size',
              formula: '\\text{gap}(a, b) = |b - a|',
              explanation:
                'The gap is the walk with its direction discarded — the definition of absolute value applied to the displacement.',
            },
            {
              label: 'Reverse the walk',
              formula: 'a - b = -(b - a) \\;\\Longrightarrow\\; |a - b| = |b - a|',
              explanation:
                'The walk from $b$ to $a$ is the opposite displacement, and mirror opposites share one size (the mirror property). Either order computes the same gap.',
            },
            {
              label: 'Read the edges',
              formula: 'a = b \\;\\Longrightarrow\\; |a - b| = 0',
              explanation:
                'No displacement, no gap; and the grid check confirms the converse — a zero gap forces $a = b$.',
            },
          ],
          result:
            'For all integers $a$ and $b$: the gap is $|a - b| = |b - a|$ — one subtraction in bars, direction-free, zero exactly when the anchors coincide.',
        },
        {
          kind: 'para',
          text: 'The formula also explains, in one picture, the two ways gaps used to be computed. When the anchors stand on *opposite sides* of zero — $a \\times b < 0$ — every journey between them passes through zero, and the gap splits into the two distances to zero: $|a - b| = |a| + |b|$. That is why the Everest–Dead Sea and Vostok–Phalodi gaps were *sums* in 7.1. When the anchors share a side, the smaller size is a detour the bigger one already covers, and the gap is the *difference* of the sizes. Figure 2 draws both layouts.',
        },
        {
          kind: 'figure',
          caption:
            'The distance between two numbers, both layouts. Panel 1 — opposite sides: the gap $|5 - (-3)| = |8| = 8$ splits at zero into $|-3| = 3$ plus $|5| = 5$; the sizes *add*. Panel 2 — same side: the gap $|7 - 2| = 5$ is what survives of the size $7$ after the size $2$ borrows its share; the sizes *subtract*. Either way one formula: the gap is $|a - b|$.',
          svg: `<svg viewBox="0 0 760 318" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number-line panels: opposite-side anchors whose gap equals the sum of the distances to zero, and same-side anchors whose gap equals the difference of the sizes">
  <text x="380" y="16" font-size="12.5" fill="currentColor" text-anchor="middle">opposite sides — the sizes add</text>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="320" y="36">|−3| = 3</text><text x="480" y="36">|5| = 5</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="260" y1="48" x2="380" y2="48"/>
    <line x1="260" y1="42" x2="260" y2="54"/>
    <line x1="380" y1="42" x2="380" y2="54"/>
    <line x1="380" y1="48" x2="580" y2="48"/>
    <line x1="580" y1="42" x2="580" y2="54"/>
  </g>
  <line x1="10" y1="70" x2="750" y2="70" stroke="currentColor" stroke-width="2"/>
  <polygon points="10,70 24,63 24,77" fill="currentColor"/>
  <polygon points="750,70 736,63 736,77" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="20" y1="63" x2="20" y2="77"/><line x1="60" y1="63" x2="60" y2="77"/>
    <line x1="100" y1="63" x2="100" y2="77"/><line x1="140" y1="63" x2="140" y2="77"/>
    <line x1="180" y1="63" x2="180" y2="77"/><line x1="220" y1="63" x2="220" y2="77"/>
    <line x1="300" y1="63" x2="300" y2="77"/><line x1="340" y1="63" x2="340" y2="77"/>
    <line x1="420" y1="63" x2="420" y2="77"/><line x1="460" y1="63" x2="460" y2="77"/>
    <line x1="500" y1="63" x2="500" y2="77"/><line x1="540" y1="63" x2="540" y2="77"/>
    <line x1="620" y1="63" x2="620" y2="77"/><line x1="660" y1="63" x2="660" y2="77"/>
    <line x1="700" y1="63" x2="700" y2="77"/><line x1="740" y1="63" x2="740" y2="77"/>
  </g>
  <g stroke="currentColor" stroke-width="2">
    <line x1="260" y1="58" x2="260" y2="82"/><line x1="380" y1="58" x2="380" y2="82"/>
    <line x1="580" y1="58" x2="580" y2="82"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="260" y="96">−3</text><text x="380" y="96">0</text><text x="580" y="96">5</text>
  </g>
  <circle cx="260" cy="70" r="5" fill="currentColor"/>
  <circle cx="580" cy="70" r="5" fill="currentColor"/>
  <line x1="260" y1="108" x2="580" y2="108" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="260,108 274,102 274,114" fill="currentColor"/>
  <polygon points="580,108 566,102 566,114" fill="currentColor"/>
  <text x="420" y="128" font-size="12.5" fill="currentColor" text-anchor="middle">the gap — |5 − (−3)| = |8| = 8</text>
  <text x="380" y="164" font-size="12.5" fill="currentColor" text-anchor="middle">same side — the sizes subtract</text>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="420" y="180">|2| = 2</text><text x="520" y="208">|7| = 7</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="380" y1="192" x2="460" y2="192"/>
    <line x1="380" y1="186" x2="380" y2="198"/>
    <line x1="460" y1="186" x2="460" y2="198"/>
    <line x1="380" y1="220" x2="660" y2="220"/>
    <line x1="380" y1="214" x2="380" y2="226"/>
    <line x1="660" y1="214" x2="660" y2="226"/>
  </g>
  <line x1="10" y1="238" x2="750" y2="238" stroke="currentColor" stroke-width="2"/>
  <polygon points="10,238 24,231 24,245" fill="currentColor"/>
  <polygon points="750,238 736,231 736,245" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="20" y1="231" x2="20" y2="245"/><line x1="60" y1="223" x2="60" y2="237"/>
    <line x1="100" y1="223" x2="100" y2="237"/><line x1="140" y1="223" x2="140" y2="237"/>
    <line x1="180" y1="223" x2="180" y2="237"/><line x1="220" y1="223" x2="220" y2="237"/>
    <line x1="260" y1="223" x2="260" y2="237"/><line x1="300" y1="223" x2="300" y2="237"/>
    <line x1="340" y1="223" x2="340" y2="237"/><line x1="420" y1="223" x2="420" y2="237"/>
    <line x1="500" y1="223" x2="500" y2="237"/><line x1="540" y1="223" x2="540" y2="237"/>
    <line x1="580" y1="223" x2="580" y2="237"/><line x1="620" y1="223" x2="620" y2="237"/>
    <line x1="700" y1="223" x2="700" y2="237"/><line x1="740" y1="223" x2="740" y2="237"/>
  </g>
  <g stroke="currentColor" stroke-width="2">
    <line x1="380" y1="226" x2="380" y2="250"/><line x1="460" y1="218" x2="460" y2="242"/>
    <line x1="660" y1="218" x2="660" y2="242"/>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="380" y="264">0</text><text x="460" y="264">2</text><text x="660" y="264">7</text>
  </g>
  <circle cx="460" cy="238" r="5" fill="currentColor"/>
  <circle cx="660" cy="230" r="5" fill="currentColor"/>
  <line x1="460" y1="282" x2="660" y2="282" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="460,282 474,276 474,288" fill="currentColor"/>
  <polygon points="660,282 646,276 646,288" fill="currentColor"/>
  <text x="560" y="302" font-size="12.5" fill="currentColor" text-anchor="middle">the gap — |7 − 2| = 5</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Re-read 7.1\u2019s lift as one subtraction in bars: from basement $2$ to level $7$.',
          steps: [
            'Now, the floors wear signed names: basement $2$ is $-2$ and level $7$ is $7$.',
            'So the climb is $|7 - (-2)| = |7 + 2| = |9| = 9$ storeys — the double-sign turn of 7.2 working inside the bars.',
            'Hence $9$ — and the return trip $|-2 - 7| = |-9| = 9$: the formula\u2019s symmetry says the gap never asks which end you start from. 7.1 counted these storeys one by one; the bars do it in one move.',
          ],
        },
        {
          kind: 'example',
          title: 'The Everest–Dead Sea vertical gap, as the formula gives it.',
          steps: [
            'Now, Everest wears $+8848.86$ m and the Dead Sea surface wears $-439.78$ m (as of 2025; the level keeps falling).',
            'So the gap is $|8848.86 - (-439.78)| = |8848.86 + 439.78| = |9288.64| = 9288.64$ m.',
            'Hence $9288.64$ m — about $9289$ m. 7.1 built this sum by reading both heights against sea level; the opposite-sides split $|a| + |b|$ is exactly that construction, and the formula is it, automated.',
          ],
        },
        {
          kind: 'example',
          title: 'The Vostok–Phalodi line distance, as the formula gives it.',
          steps: [
            'Now, Vostok\u2019s record reading is $-89.2$°C (21 July 1983) and Phalodi\u2019s is $51.0$°C (19 May 2016).',
            'So the gap is $|51.0 - (-89.2)| = |51.0 + 89.2| = |140.2| = 140.2$ degrees.',
            'Hence $140.2$ — 7.1\u2019s step-count cashed in one line. The reversed order $|-89.2 - 51.0| = |-140.2| = 140.2$ agrees, as the mirror property promised.',
          ],
        },
        { kind: 'heading', text: 'Reading equations in bars' },
        {
          kind: 'para',
          text: 'An equation in bars is a geometry question wearing algebra\u2019s clothes. $|x| = 5$ asks: *which integers stand exactly $5$ steps from zero?* The line answers by pointing, not by algebra — and it points twice. Reading such equations is a matter of marking the distance and collecting the mirrors, and the verdict depends on the right-hand side as no earlier equation in this book has shown.',
        },
        {
          kind: 'table',
          head: ['The equation', 'The solutions', 'The geometry'],
          rows: [
            ['$|x| = 5$ (any $k > 0$)', 'two: $x = -5$ and $x = 5$', 'the mirror pair at distance $k$ — one on each side'],
            ['$|x| = 0$', 'one: $x = 0$', 'only zero stands no steps from zero — the non-negativity edge'],
            ['$|x| = -3$', 'none', 'no walk is shorter than no walk; a negative distance names nothing'],
          ],
        },
        {
          kind: 'para',
          text: 'The first row is the signature: one equation, two answers. It startles every first meeting — the equations of chapters 1–7 each had a single whole-number answer, and here the mirror hands back a pair. The geometric reading explains the surprise: the bars destroyed the sign of $x$, so the equation cannot tell its two solutions apart, and algebra inherits both.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The bars erase exactly one bit',
          text: 'Every $|\\,\\cdot\\,|$-question discards exactly one piece of information — the side of zero — and preserves the rest. That is the whole story of the two-answer signature: $|x| = 5$ cannot distinguish $-5$ from $5$ because the bars cannot either. The same erasure explains the mirror property, the gap\u2019s symmetry, and why $|x| = 0$ collapses to a single answer: zero is the one integer with no side to erase.',
        },
        {
          kind: 'example',
          title: 'Find every integer $x$ with $|x| = 5$.',
          steps: [
            'Now, the equation asks: which integers stand exactly $5$ steps from zero?',
            'So the mirror pair answers: $x = -5$ (five steps left) and $x = 5$ (five steps right) — and the sweep confirms nothing else in $[-40, 40]$ qualifies.',
            'Hence $x = -5$ or $x = 5$: one equation in bars, two answers — the signature.',
          ],
        },
        {
          kind: 'example',
          title: 'Find every integer with $|x| = 0$, and every integer with $|x| = -2$.',
          steps: [
            'Now, $|x| = 0$ asks who stands no steps from zero — and only $x = 0$ does: one solution, at the non-negativity edge.',
            'So $|x| = -2$ asks for a distance of $-2$ steps — no walk is shorter than no walk, and the solution set is empty.',
            'Hence $\\{0\\}$ and $\\{\\}$: the two edge cases examination keys reach for whenever a sign slips somewhere it should not.',
          ],
        },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that the bars complete the chapter\u2019s grammar. Every integer now wears a sign and a size; the operations of 7.2 and 7.3 moved and multiplied the signed wholes; and the bars read the sizes back out — of a single number, of a product, of a sum, of the gap between any two. What 7.1 paced, 7.4 computes; what the sign rules aimed, the sizes now measure. The line of chapter 7 is finished furniture — and the next chapter leaves it for the plane, where geometry begins.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Absolute value in the examination hall',
          text: 'Absolute-value items appear in every aptitude bank in three shapes. Straight evaluations ($|-9| + |4|$) and bars-versus-minus contrasts ($-|9|$) reward the outside-in reading habit; SSC CHSL/MTS papers pair them with ordering-by-magnitude traps (which is greater — or which has the greater absolute value). Two-answer equations ($|x| = 7$) appear in RRB NTPC CBT-I and banking clerical banks, where forgetting the mirror twin is the standard lost mark. Gap questions — temperature swings, storey counts, elevation differences — are the distance formula in narration, and the opposite-sides split $|a| + |b|$ does the arithmetic in one glance. The shapes are cited from these banks\u2019 published patterns; none is reproduced. One habit pays for the whole topic: read the bars as \u201chow far\u201d, then answer twice if a number is asked for.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A notation for size: modulus and the two bars',
          text: 'The idea is older than the notation. In 1806 Jean-Robert Argand named the *modulus* (French *module*) for the magnitude of a complex number — the size of an arrow, direction discarded — carrying the notion past the line for the first time. The two vertical bars came a generation later: Karl Weierstrass used $|x|$ in his 1841 essay *Zur Theorie der Potenzreihen* (recorded in MacTutor\u2019s Earliest Uses index), applying the notation to complex quantities, and it spread across analysis because it does one thing cleanly and says so. This chapter met the same arc in miniature: 7.1 recorded the centuries during which negatives were flinched at; once they were accepted, \u201chow negative is it?\u201d needed a name — magnitude, modulus, absolute value — and a mark that asks no questions about direction.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Absolute value',
              def: 'The distance of an integer from $0$ on the number line — the count of steps, direction discarded; written $|x|$ and never negative. Instances: $|-8| = |8| = 8$, $|0| = 0$.',
            },
            {
              term: 'Piecewise rule for absolute value',
              def: '$|x| = x$ when $x \\ge 0$ and $|x| = -x$ when $x < 0$: the distance definition computed, with the minus as an instruction — take the opposite.',
            },
            {
              term: 'Non-negativity of absolute value',
              def: '$|x| \\ge 0$ for every integer, with $|x| = 0$ only at $x = 0$: distance has no negative dress, and zero is the single edge case.',
            },
            {
              term: 'Mirror property',
              def: '$|-x| = |x|$: mirror pairs stand at one distance from zero, so the bars cannot tell the twins apart.',
            },
            {
              term: 'Magnitude',
              def: 'The size of a signed number — what remains when the sign is discarded. Ordering by magnitude answers \u201chow big\u201d; ordering the numbers answers \u201cwhich side wins\u201d, and the two can disagree ($-8$ is the smaller number with the bigger magnitude).',
            },
            {
              term: 'Multiplicative property of absolute value',
              def: '$|a \\times b| = |a| \\times |b|$: the sign may be cancelled inside the bars or outside — the size never notices (grid-verified on all $441$ pairs in $[-10, 10]^2$).',
            },
            {
              term: 'Triangle fact',
              def: '$|a + b| \\le |a| + |b|$: a two-leg walk is never longer than the legs\u2019 total, with equality exactly when the legs stand on the same side of zero (or one is $0$).',
            },
            {
              term: 'Distance formula',
              def: 'The gap between integers $a$ and $b$ is $|a - b| = |b - a|$: one subtraction in bars, symmetric in the anchors, zero exactly when $a = b$.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Evaluate $|-9| + |4|$.',
              options: ['$5$', '$-13$', '$13$', '$-5$'],
              answer: 2,
              explain:
                'Each bars-question is read separately: $|-9| = 9$ and $|4| = 4$, and $9 + 4 = 13$ (Option 3). Option 1 subtracts the sizes ($9 - 4$); Options 2 and 4 let a sign survive the bars — distances are never negative.',
            },
            {
              q: 'The distance between $-3$ and $5$ on the number line is',
              options: ['$2$', '$8$', '$-8$', '$5$'],
              answer: 1,
              explain:
                'The gap is $|5 - (-3)| = |8| = 8$ (Option 2). Option 1 subtracts the sizes across a mirror split — or adds the signed numbers, $(-3) + 5 = 2$; either way it answers a different question. Option 3 lets the distance wear a sign; Option 4 reads one anchor only.',
            },
            {
              q: 'The number of integer solutions of $|x| = 6$ is',
              options: ['$2$', '$1$', '$0$', 'infinitely many'],
              answer: 0,
              explain:
                'The mirror pair $-6$ and $6$ both stand exactly $6$ steps from zero (Option 1). Option 2 finds only $6$ and forgets the twin; Option 3 gives up entirely; Option 4 confuses the equation with the whole line — only two integers are exactly $6$ steps out.',
            },
            {
              q: 'Which statement is true for all integers $a, b$?',
              options: ['$|a + b| = |a| + |b|$', '$|a \\times b| = |a| \\times |b|$', '$|a - b| = a - b$', '$|a| > 0$'],
              answer: 1,
              explain:
                'The multiplicative property holds everywhere — grid-verified on all $441$ pairs in $[-10, 10]^2$ (Option 2). Option 1 fails whenever the anchors disagree: $|(-4) + 9| = 5$ but $|-4| + |9| = 13$. Option 3 fails whenever $a < b$: $|3 - 7| = 4$, not $-4$. Option 4 fails at $a = 0$, where the distance is exactly $0$.',
            },
            {
              q: 'A diver rests at $-45$ m and a bird flies at $+120$ m. The vertical gap between them is',
              options: ['$75$ m', '$-165$ m', '$120$ m', '$165$ m'],
              answer: 3,
              explain:
                'The gap is $|120 - (-45)| = |120 + 45| = |165| = 165$ m (Option 4). Option 1 subtracts the sizes ($120 - 45$) — a same-side move on opposite-side anchors. Option 2 lets the distance wear a sign. Option 3 reads one anchor and forgets the other.',
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
                  q: 'Evaluate $|-15|$.',
                  solution: [
                    'Now, $-15$ stands $15$ steps left of zero.',
                    'So the count is $15$ — the bars discard the direction.',
                    'Hence $|-15| = 15$.',
                  ],
                  answer: '$15$',
                },
                {
                  q: 'Evaluate $|7| + |-6|$.',
                  solution: [
                    'Now, read each bars-question separately: $|7| = 7$ and $|-6| = 6$.',
                    'So the sum is $7 + 6 = 13$.',
                    'Hence $13$ — sizes add plainly once the bars have spoken.',
                  ],
                  answer: '$13$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Evaluate $|(-9) \\times (-3)|$ and $|-9| \\times |-3|$, and state the property the pair exhibits.',
                  solution: [
                    'Now, product first: $(-9) \\times (-3) = 27$ by 7.3\u2019s sign rules, so $|(-9) \\times (-3)| = |27| = 27$.',
                    'So sizes first: $|-9| = 9$ and $|-3| = 3$, and $9 \\times 3 = 27$.',
                    'Hence $27 = 27$ — the multiplicative property $|a \\times b| = |a| \\times |b|$, worked on agreeing signs.',
                  ],
                  answer: '$|(-9) \\times (-3)| = 27 = |-9| \\times |-3|$',
                },
                {
                  q: 'Evaluate $-|-6|$.',
                  solution: [
                    'Now, inside first: $|-6| = 6$ — the bars swallow the inner sign.',
                    'So the outside minus applies to the result: $-6$.',
                    'Hence $-|-6| = -6$ — a minus outside the bars is not swallowed.',
                  ],
                  answer: '$-6$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find every integer $x$ with $|x| = 12$.',
                  solution: [
                    'Now, the equation asks which integers stand exactly $12$ steps from zero.',
                    'So the mirror pair qualifies: $x = -12$ (twelve steps left) and $x = 12$ (twelve steps right), and the sweep confirms no third candidate.',
                    'Hence $x = -12$ or $x = 12$.',
                  ],
                  answer: '$x = -12$ or $x = 12$',
                },
                {
                  q: 'Find the distance between $-7$ and $4$.',
                  solution: [
                    'Now, the gap is the size of the walk from $-7$ to $4$: $|4 - (-7)|$.',
                    'So $|4 + 7| = |11| = 11$.',
                    'Hence $11$ — and the reversed order $|-7 - 4| = |-11| = 11$ agrees, as the symmetry promised.',
                  ],
                  answer: '$11$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A miner stands at $-160$ m (below the shaft mouth) and a weather balloon at $+340$ m. How far apart are they?',
                  solution: [
                    'Now, the anchors wear signed names: $-160$ and $+340$ — opposite sides of zero.',
                    'So the gap is $|340 - (-160)| = |340 + 160| = |500| = 500$ m.',
                    'Hence $500$ m — the opposite-sides split $|a| + |b| = 160 + 340$ in one move.',
                  ],
                  answer: '$500$ m',
                },
                {
                  q: 'Solve $|x| = 0$ and $|x| = -4$, with a one-line reason for each.',
                  solution: [
                    'Now, $|x| = 0$ asks who stands no steps from zero — only $x = 0$: the non-negativity edge.',
                    'So $|x| = -4$ asks for a negative distance — no walk is shorter than no walk, so there are no solutions.',
                    'Hence $\\{0\\}$ and $\\{\\}$: one answer where the mirror collapses, none where the request is impossible.',
                  ],
                  answer: '$|x| = 0$: $x = 0$; $|x| = -4$: no solution',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'True or false: $|a + b| = |a| + |b|$ for all integers $a$ and $b$. If false, give a counterexample and state when equality does hold.',
                  solution: [
                    'Now, test a disagreeing pair: $a = -6$, $b = 2$ gives $|(-6) + 2| = |-4| = 4$, while $|-6| + |2| = 8$.',
                    'So the statement is false — the sum\u2019s size can be smaller than the sizes\u2019 sum whenever the legs double back.',
                    'And equality holds exactly when $a$ and $b$ stand on the same side of zero (or one is $0$): agreeing legs compound, grid-verified on all $441$ pairs in $[-10, 10]^2$.',
                    'Hence false; equality iff $a \\times b \\ge 0$.',
                  ],
                  answer: 'False; equality holds exactly when $a \\times b \\ge 0$',
                },
                {
                  q: 'A hill station\u2019s dawn reads $-9$°C and its noon reads $17$°C. By how many degrees did the temperature rise? Write the computation as one gap.',
                  solution: [
                    'Now, the readings wear signed names: $-9$ at dawn and $17$ at noon.',
                    'So the rise is $|17 - (-9)| = |17 + 9| = |26| = 26$ degrees.',
                    'Hence $26$°C — the distance formula in thermometer dress.',
                  ],
                  answer: '$26$°C',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Using the movement model of Lesson 7.2 and the mirror property, derive the distance formula $\\text{gap}(a, b) = |a - b| = |b - a|$, and cash it at $(a, b) = (-5, 8)$.',
                  solution: [
                    'Now, the walk from $a$ to $b$ satisfies $a + (\\text{the walk}) = b$, so the walk is $b - a$ — 7.2\u2019s movement equation, solved.',
                    'So the gap is the walk\u2019s size: $\\text{gap}(a, b) = |b - a|$ — the definition of absolute value applied to the displacement.',
                    'And the reversed walk is $a - b = -(b - a)$, the opposite displacement, whose size agrees by the mirror property: $|a - b| = |b - a|$.',
                    'Cashed at $(-5, 8)$: $|8 - (-5)| = |13| = 13$ and $|-5 - 8| = |-13| = 13$ — either order, one gap.',
                    'Hence $\\text{gap}(a, b) = |a - b| = |b - a|$, zero exactly when $a = b$.',
                  ],
                  answer: '$\\text{gap}(a, b) = |a - b| = |b - a|$; at $(-5, 8)$: $13$',
                },
                {
                  q: 'Prove: for integers $a$ and $b$, equality holds in $|a + b| \\le |a| + |b|$ exactly when $a \\times b \\ge 0$.',
                  solution: [
                    'Now, split by the sign table. Case (i): $a$ and $b$ agree in sign (or one is $0$) — the legs walk the same way, so the net size is the sum of the sizes: $|a + b| = |a| + |b|$. Instance: $|(-4) + (-9)| = 13 = 4 + 9$.',
                    'So case (ii): $a$ and $b$ disagree — the walk doubles back, and the net size is the difference of the sizes, strictly below the sum whenever both are non-zero: $|(-4) + 9| = 5 < 13$.',
                    'And the sweep certificate: on all $441$ pairs in $[-10, 10]^2$, equality holds on exactly the pairs with $a \\times b \\ge 0$ — no exception either way.',
                    'Hence equality in the triangle fact is a same-side event: $a \\times b \\ge 0$, and only that.',
                  ],
                  answer: 'Equality holds exactly when $a \\times b \\ge 0$',
                },
              ],
            },
          ],
        },
      ],
    },

  ],
}
