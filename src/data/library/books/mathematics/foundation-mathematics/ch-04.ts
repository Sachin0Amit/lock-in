import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 4: Fractions
 *
 * LESSONS WRITTEN: 4.1 The Idea of a Fraction (unit 4 opens); 4.2 Equivalent
 * Fractions and Simplification (the equivalence family, the multiplying rule,
 * HCF simplification, the cross-multiplication licence paid in full, raising
 * to higher terms, uniqueness of the lowest-terms name).
 * PLANNED NEXT: 4.3 Comparing Fractions · 4.4 Adding and Subtracting
 * Fractions · 4.5 Multiplying and Dividing Fractions.
 * Unit 4 of the unit-by-unit cadence (2026-11-03, one lesson per hourly
 * run). References: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 1 "Numbers" (fraction comparison exam items, the
 * HCF/LCM-of-fractions rules that later lessons will draw on) + NCERT
 * Class 6 ch. 7 "Fractions" topic coverage — see docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-4.ts
 * (148 checks) BEFORE writing.
 * Honours the ties promised in Lesson 3.5's closing paragraph: "between any
 * two whole numbers, fractions grow dense, and the four operations learn to
 * live there. The atoms remain atoms — but from here on, they divide." —
 * this lesson delivers the density (the mediant theorem) and keeps the
 * atoms language alive (a fraction of a quantity as division: the
 * 3.1–3.5 toolkit applied to the in-between world).
 */
export const chapter04: Chapter = {
  number: 4,
  slug: 'fractions',
  title: 'Fractions',
  summary:
    'Why we need numbers between the integers, what a fraction really is, equivalence, comparison, the four operations on fractions, and the number line made dense.',
  status: 'in-progress',
  lessons: [
    {
      id: 'fm-idea-of-a-fraction',
      number: '4.1',
      title: 'The Idea of a Fraction',
      concepts: [
        'Fractions name parts of a whole',
        'Numerator and denominator',
        'A fraction is a division',
        'Fractions on the number line',
        'Proper, improper and mixed numbers',
        'Unit fractions and Egyptian reckoning',
        'Density: fractions between fractions',
      ],
      objectives: [
        'Say precisely what a fraction is — both as equal parts of a whole and as an exact division — and name its parts (numerator, denominator, vinculum)',
        'Place any fraction on the number line between the right whole numbers, and convert between improper fractions and mixed numbers using the division algorithm of Lesson 2.4',
        'Compute a fraction of a quantity, and read "how many 1/d-pieces fit in m" as the grouping division of Lesson 2.4',
        'Prove that between any two different fractions there always lies another — the density that Lesson 3.5 promised — using the mediant',
      ],
      prerequisites: ['fm-numbers-digits-place-value', 'fm-division-remainders-zero', 'fm-hcf-lcm-and-how-they-relate'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch7'],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 3 closed with a promise. After proving that the HCF and LCM of two numbers multiply back to the numbers themselves, the last paragraph looked ahead: *between any two whole numbers, fractions grow dense, and the four operations learn to live there. The atoms remain atoms — but from here on, they divide.* This unit keeps that promise, and it begins at a dinner table. Four children, three chapatis. Long division reports "$3 \\div 4$: quotient $0$, remainder $3$" — true, and perfectly useless: it says each child gets nothing, with all three chapatis left over. The table needs a different kind of number, one that lives in the gap the whole numbers cannot fill.',
        },
        {
          kind: 'para',
          text: 'Cutting does what dividing could not. Slice each of the three chapatis into $4$ equal pieces — quarters. That is $3 \\times 4 = 12$ quarter-pieces on the plate. Share them equally among the four children: $12 \\div 4 = 3$ pieces each. Every child ends up holding three quarters of a chapati — the amount we write $\\tfrac{3}{4}$. Notice what the cutting bought us: the division $3 \\div 4$, which had no whole answer at all, now has a complete, exact, shareable one. The number $\\tfrac{3}{4}$ was not sitting in the whole numbers waiting to be found; it was **created** by the act of sharing — and this lesson is about what kind of object it is.',
        },
        {
          kind: 'para',
          text: 'The plan is the same as in every chapter of this book. First the *meaning*: what a fraction is, told two ways that turn out to be one. Then the *geography*: where fractions live on the number line of Lesson 1.1, and the wardrobe of names — proper, improper, mixed — that describes that geography. Then a visit to the people who ran mathematics on fractions alone for two thousand years, the Egyptian scribes. And finally the promise kept: a proof that between any two fractions there is always room for another, so the line grows **dense**. Throughout, the old toolkit keeps working — the division algorithm, the atoms, the screens — because fractions are not a new world so much as the old one, magnified.',
        },
        { kind: 'heading', text: 'What a fraction is: the part–whole reading' },
        {
          kind: 'para',
          text: 'Take one whole thing — a chapati, a metre of ribbon, the stretch of line from $0$ to $1$. Cut it into **equal** parts. The number of parts names the size of each piece, and that name goes on the bottom of the fraction; the number of parts you actually take goes on top. Cut into $8$ equal parts and take $3$: the parts are eighths, you take three of them, and the amount is $\\tfrac{3}{8}$. Cut into $5$ and take $5$ — you took everything — and the amount is $\\tfrac{5}{5}$, which is simply $1$. The word itself is honest about this: it comes from the Latin *fractus*, broken — a fraction is what you have after breaking a whole (the same break that gave us *fracture* and *fragment*).',
        },
        {
          kind: 'para',
          text: 'Both words in the fraction\'s anatomy are Latin job descriptions. The **denominator** (from *denominare*, to name) sits below the bar and **names** the part: $8$ on the bottom means the parts are eighths. The **numerator** (from *numerare*, to count) sits above the bar and **counts** how many parts are taken: $3$ on top means three of them. Read $\\tfrac{3}{8}$ aloud as "three eighths" and you have recited both jobs in order — count first, name second, exactly as English grammar demands. The bar between them has a name too: the **vinculum**. Keep these three words sharp; every rule in the next four lessons is stated in them, and examiners\' phrasing assumes them.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Fraction',
              def: 'A number of the form n/d (whole numbers n and d, with d never 0): the amount you hold when a unit is split into d equal parts and n of them are taken — and, equivalently, the exact answer to the division n ÷ d. Example: 3/4 is three quarters of a whole and the exact value of 3 ÷ 4.',
            },
            {
              term: 'Numerator',
              def: 'The top number of a fraction — how many parts are taken (Latin numerare, to count). In 5/8 the numerator is 5: five parts taken.',
            },
            {
              term: 'Denominator',
              def: 'The bottom number of a fraction — how many equal parts the whole was cut into, which is what names the part (Latin denominare, to name). In 5/8 the denominator is 8, so the parts are eighths.',
            },
            {
              term: 'Vinculum',
              def: 'The horizontal bar separating numerator from denominator. It is a division sign that grew patient: n/d means exactly n ÷ d.',
            },
            {
              term: 'Unit fraction',
              def: 'A fraction whose numerator is 1 — a single part: 1/2, 1/3, 1/8. Every fraction n/d is n copies of the unit fraction 1/d.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Fraction (the treaty)',
          text: 'For whole numbers $n$ (the numerator) and $d$ (the denominator), the fraction $\\frac{n}{d}$ is the number made of $n$ copies of the part $\\frac{1}{d}$ — the part you get by cutting a unit into $d$ **equal** pieces. The denominator is never $0$: Lesson 2.4 bricked that door shut when it showed that division by zero has no consistent answer at all. The two requirements are load-bearing: **equal** parts (five unequal scraps of a chapati are not "five sixths" of anything) and **$d \\ne 0$** (a cut into zero pieces is no cut at all).',
        },
        {
          kind: 'para',
          text: 'One more thing before the second face: a fraction is a **single number**, not a pair of numbers with a bar between them. $\\tfrac{3}{4}$ is one amount — the one you would hold if given three quarters of a chapati — and it has a place on the number line, a size that can be compared, and (as Lesson 4.3 will show) an ordering against every other number. Writing it with two numerals and a bar is a notation choice, the way $47$ uses two digits for one number. This is the single most important mental shift of the chapter: stop seeing "3 over 4" and start seeing a *quantity*.',
        },
        {
          kind: 'equation',
          latex: '\\frac{3}{4} \\;=\\; 3 \\times \\frac{1}{4}',
          note: 'Three quarters is three copies of one quarter. The full arithmetic of multiplying by a whole number belongs to Lesson 4.5; today the equation only fixes the meaning — the numerator counts copies of the unit fraction named by the denominator.',
        },
        { kind: 'heading', text: 'The second face: a fraction is a division' },
        {
          kind: 'para',
          text: 'Return to the dinner table, because the sharing scene was quietly proving something. When we cut $3$ chapatis into quarters and handed out $3$ pieces per child, the amount each child received was *simultaneously* two things: the part–whole fraction $\\tfrac{3}{4}$ (three of the four pieces that make a whole), and the answer to the fair-share division $3 \\div 4$ (three things shared among four). One object, two readings. This is not a coincidence of the chapati problem — it is the identity at the bottom of the entire subject.',
        },
        {
          kind: 'derivation',
          title: 'Why the two faces agree',
          statement:
            'Sharing 3 wholes among 4 people delivers, to each person, exactly the amount 3/4 of one whole. In symbols: 3 ÷ 4 = 3/4.',
          steps: [
            {
              label: 'Cut every whole into d equal parts',
              formula: '3 \\text{ wholes} \\;\\to\\; 3 \\times 4 = 12 \\text{ quarter-pieces}',
              explanation:
                'Each of the 3 chapatis contributes 4 pieces, so the plate holds 12 pieces, each worth one quarter of a whole. Only multiplication by the number of shares is used — nothing has been divided yet.',
            },
            {
              label: 'Deal the pieces equally',
              formula: '12 \\div 4 = 3 \\text{ pieces per child}',
              explanation:
                'This is ordinary whole-number division, and it comes out exact: 12 pieces split four ways gives each child 3 of them. The equality of the deal is the whole point of the cutting.',
            },
            {
              label: 'Reassemble each share',
              formula: '3 \\text{ pieces} \\;=\\; 3 \\times \\tfrac{1}{4} \\;=\\; \\tfrac{3}{4} \\text{ of a whole}',
              explanation:
                'Each piece is one quarter of a whole (the part–whole reading), so holding 3 pieces means holding three quarters. The child\'s share, described in wholes, is exactly the fraction 3/4.',
            },
          ],
          result:
            '3 ÷ 4 = 3/4. The sharing division and the part–whole fraction are the same number — proved with nothing but whole-number multiplication and division.',
        },
        {
          kind: 'para',
          text: 'Generalise, and the vinculum reveals what it has been all along: a division sign. For any whole number $n$ and any $d \\ne 0$, the fraction $\\tfrac{n}{d}$ **is** the exact answer to $n \\div d$. Lesson 2.4 proved that whole-number division leaves a remainder strictly smaller than the divisor — $3 \\div 4 = 0$ remainder $3$, $17 \\div 5 = 3$ remainder $2$, $100 \\div 7 = 14$ remainder $2$ — and in the whole numbers those remainders were dead weight: the answer was the quotient and the remainder just trailed behind. Fractions heal the wound. $\\tfrac{17}{5}$ is not "3 remainder 2" shuffled around; it is the *exact* value of $17 \\div 5$, with nothing trailing anywhere. Exact division was never denied to us — it was postponed, and the fraction is where it resumes.',
        },
        {
          kind: 'formula',
          name: 'A fraction is a division',
          latex: '\\frac{n}{d} \\;=\\; n \\div d \\qquad (d \\ne 0)',
          note: 'Read the bar as "divided by". Every fraction is an exact division; every division with a remainder has a fraction as its exact answer. This one identity is why fractions and division share all their vocabulary.',
        },
        {
          kind: 'para',
          text: 'The division face immediately pays rent: it powers the phrase that fills exam papers — *a fraction of a quantity*. "$\\tfrac{3}{4}$ of $\\tfrac{\\text{Rs } 20}$" means: perform the sharing behind the words. Split $20$ into $4$ equal shares ($20 \\div 4 = 5$), then take $3$ of them ($3 \\times 5 = 15$). The part–whole reading and the division reading are the same machine, so either route lands on the same number.',
        },
        {
          kind: 'formula',
          name: 'Fraction of a quantity',
          latex: '\\tfrac{n}{d} \\text{ of } Q \\;=\\; n \\times (Q \\div d) \\;=\\; \\frac{n \\times Q}{d}',
          note: 'Divide the quantity into d equal shares, keep n of them. When Q divides cleanly by d (the case exam-setters favour), work with the small share Q ÷ d and multiply; otherwise multiply first and divide once at the end — the two orders always agree.',
        },
        {
          kind: 'example',
          title: 'Fraction of a quantity, three ways of the same move',
          steps: [
            '$\\tfrac{3}{4}$ of $20$: split $20$ into $4$ shares — $20 \\div 4 = 5$ — and take three: $3 \\times 5 = 15$.',
            '$\\tfrac{5}{6}$ of $84$: the sixth-share is $84 \\div 6 = 14$, and five of them make $5 \\times 14 = 70$.',
            '$\\tfrac{7}{10}$ of $120$: the tenth-share is $120 \\div 10 = 12$, and seven of them make $7 \\times 12 = 84$.',
            'And the reverse reading, straight from Lesson 2.4\'s grouping division: "how many $\\tfrac{1}{5}$-pieces build $2$ wholes?" Each whole is $5$ fifths, so $2 \\times 5 = 10$ pieces — the grouping question the whole numbers already knew how to answer.',
          ],
        },
        { kind: 'heading', text: 'Fractions on the number line' },
        {
          kind: 'para',
          text: 'Lesson 1.1 drew the number line with whole-number ticks only — $0, 1, 2, 3, \\ldots$ — and confessed that the spaces between were featureless. No longer. Slice the stretch from $0$ to $1$ into $4$ equal steps, each of length $\\tfrac{1}{4}$: the ticks fall at $\\tfrac{1}{4}$, $\\tfrac{2}{4}$, $\\tfrac{3}{4}$, and then $1$. Slice into $8$: eighths appear. Slice into $100$: hundredths, too fine to draw but no less there. Every fraction is a **point** on the line — $\\tfrac{3}{4}$ is the point three quarter-steps out from $0$ — and the whole numbers turn out to be fractions in disguise, standing at the points their own step-counts reach: $2 = \\tfrac{8}{4} = \\tfrac{2}{1}$, the frontier post $1 = \\tfrac{4}{4}$.',
        },
        {
          kind: 'figure',
          caption:
            'The number line, sliced into quarters. Top: the familiar line of chapter 1 — 3/4 is the third quarter-step from 0, and 7/4 the seventh, landing between 1 and 2 (one whole plus three quarters more: the mixed number 1 3/4). Bottom: the gap between 1 and 2 magnified and sliced into eighths — 9/8, 5/4, 11/8, 3/2, 13/8, 7/4, 15/8 all live there, and 7/4 reappears six eighth-steps past 1, the same point wearing its improper and its mixed name. Whatever magnification you choose, no gap opens without a fraction stepping into it.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines: the first sliced into quarters from 0 to 2 with 3/4 and 7/4 marked, the second magnifying the gap between 1 and 2 sliced into eighths with 7/4 marked again">
  <g font-size="13" fill="currentColor">
    <text x="380" y="22" text-anchor="middle" opacity="0.8">the number line, sliced into quarters — 3/4 and 7/4 marked</text>
    <line x1="70" y1="70" x2="690" y2="70" stroke="currentColor" stroke-width="1.5"/>
    <g stroke="currentColor" stroke-width="1.5">
      <line x1="70" y1="62" x2="70" y2="78"/>
      <line x1="310" y1="62" x2="310" y2="78"/>
      <line x1="550" y1="62" x2="550" y2="78"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="130" y1="65" x2="130" y2="75"/>
      <line x1="190" y1="65" x2="190" y2="75"/>
      <line x1="250" y1="65" x2="250" y2="75"/>
      <line x1="370" y1="65" x2="370" y2="75"/>
      <line x1="430" y1="65" x2="430" y2="75"/>
      <line x1="490" y1="65" x2="490" y2="75"/>
    </g>
    <g text-anchor="middle" font-size="12" opacity="0.85">
      <text x="130" y="94">1/4</text>
      <text x="190" y="94">1/2</text>
      <text x="250" y="94">3/4</text>
      <text x="370" y="94">5/4</text>
      <text x="430" y="94">3/2</text>
    </g>
    <g text-anchor="middle" font-size="15" font-weight="700">
      <text x="70" y="116">0</text>
      <text x="310" y="116">1</text>
      <text x="550" y="116">2</text>
    </g>
    <circle cx="250" cy="70" r="5" fill="#b45309"/>
    <text x="250" y="48" text-anchor="middle" fill="#b45309" font-weight="700">3/4</text>
    <circle cx="490" cy="70" r="5" fill="#b45309"/>
    <text x="490" y="48" text-anchor="middle" fill="#b45309" font-weight="700">7/4 = 1 3/4</text>
    <text x="290" y="155" text-anchor="middle" opacity="0.8">the gap between 1 and 2, magnified</text>
    <line x1="490" y1="76" x2="535" y2="204" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5"/>
    <line x1="70" y1="210" x2="690" y2="210" stroke="currentColor" stroke-width="1.5"/>
    <g stroke="currentColor" stroke-width="1.5">
      <line x1="70" y1="202" x2="70" y2="218"/>
      <line x1="690" y1="202" x2="690" y2="218"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="147.5" y1="205" x2="147.5" y2="215"/>
      <line x1="225" y1="205" x2="225" y2="215"/>
      <line x1="302.5" y1="205" x2="302.5" y2="215"/>
      <line x1="380" y1="205" x2="380" y2="215"/>
      <line x1="457.5" y1="205" x2="457.5" y2="215"/>
      <line x1="535" y1="205" x2="535" y2="215"/>
      <line x1="612.5" y1="205" x2="612.5" y2="215"/>
    </g>
    <g text-anchor="middle" font-size="12" opacity="0.85">
      <text x="147.5" y="234">9/8</text>
      <text x="225" y="234">5/4</text>
      <text x="302.5" y="234">11/8</text>
      <text x="380" y="234">3/2</text>
      <text x="457.5" y="234">13/8</text>
      <text x="535" y="234">7/4</text>
      <text x="612.5" y="234">15/8</text>
    </g>
    <g text-anchor="middle" font-size="15" font-weight="700">
      <text x="70" y="256">1</text>
      <text x="690" y="256">2</text>
    </g>
    <circle cx="535" cy="210" r="5" fill="#b45309"/>
    <text x="535" y="188" text-anchor="middle" fill="#b45309" font-weight="700">7/4 again</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the figure\'s two panels as one statement. On the top line, $\\tfrac{3}{4}$ sits strictly inside the first gap — three quarter-steps from $0$, one short of $1$ — while $\\tfrac{7}{4}$ has walked *past* the whole $1$ and stands three quarter-steps beyond it: one whole and three quarters more, which the figure writes as the **mixed number** $1\\tfrac{3}{4}$. The bottom panel magnifies the gap between $1$ and $2$ and slices it into eighths instead of quarters — and there is $\\tfrac{7}{4}$ again, six eighth-steps past $1$, the very same point. Same location, finer ruler. This is the geometry of the whole lesson: a fraction\'s home is a *point*, and the names we give it — improper, mixed, fine or coarse — are descriptions of the ruler, not of the point.',
        },
        { kind: 'heading', text: 'Proper, improper, mixed: the wardrobe' },
        {
          kind: 'para',
          text: 'The number line sorts fractions into three wardrobe boxes, and the sorting key is the oldest comparison in the book: numerator versus denominator. If the numerator is **smaller** than the denominator ($\\tfrac{3}{8}$, $\\tfrac{4}{15}$), fewer parts are taken than the whole was cut into, so the fraction is worth less than one whole and lives strictly between $0$ and $1$ — a **proper** fraction. If the numerator **equals or exceeds** the denominator ($\\tfrac{8}{8}$, $\\tfrac{9}{8}$, $\\tfrac{17}{5}$), the fraction is worth at least one whole and stands at or beyond the frontier post $1$ — an **improper** fraction ("improper" not as an insult but as a flag: this one has outgrown single-whole dress). And an improper fraction can always be dressed as a **mixed number** — a whole count plus a proper part, like $1\\tfrac{3}{4}$ or $3\\tfrac{2}{5}$ — by asking the division algorithm to report.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Proper fraction',
              def: 'Numerator less than denominator — worth less than one whole, living strictly between 0 and 1 on the line. 3/8 and 4/15 are proper.',
            },
            {
              term: 'Improper fraction',
              def: 'Numerator greater than or equal to denominator — worth at least one whole. 8/8 = 1 sits exactly on the frontier; 9/8 and 17/5 live beyond it.',
            },
            {
              term: 'Mixed number',
              def: 'A whole number and a proper fraction worn together: 1 3/4 means one whole and three quarters more. Convert with the division algorithm: 7/4 = 7 ÷ 4, quotient 1 remainder 3, so 7/4 = 1 3/4.',
            },
            {
              term: 'Fraction of a quantity',
              def: 'n/d of Q: split Q into d equal shares and take n of them — 3/4 of 20 = 3 × (20 ÷ 4) = 15. The division face, put to work.',
            },
          ],
        },
        {
          kind: 'derivation',
          title: 'Improper to mixed, via the division algorithm of Lesson 2.4',
          statement:
            'Every improper fraction converts to a mixed number by running the division it secretly is: 7/4 = 7 ÷ 4 = 1 remainder 3, so 7/4 = 1 3/4.',
          steps: [
            {
              label: 'Run the algorithm',
              formula: '7 = 1 \\times 4 + 3, \\qquad 0 \\le 3 < 4',
              explanation:
                'Lesson 2.4\'s division algorithm returns quotient 1 and remainder 3. The remainder bound guarantees the leftover part is strictly smaller than a whole — which is exactly what the proper fraction in a mixed number must promise.',
            },
            {
              label: 'Read the quotient as wholes',
              formula: '\\text{quotient } 1 \\;\\to\\; 1 \\text{ whole}',
              explanation:
                'Four quarter-steps build one whole, and 7 quarter-steps contain one complete set of them. The quotient counts how many whole sets fit — the whole-number part of the mixed number.',
            },
            {
              label: 'Read the remainder as the part',
              formula: '\\text{remainder } 3 \\text{ over divisor } 4 \\;\\to\\; \\tfrac{3}{4} \\text{ more}',
              explanation:
                'Three quarter-steps are left over after the whole is assembled — three parts of the kind the denominator names. Remainder over divisor: that is the entire conversion rule.',
            },
          ],
          result:
            '7/4 = 1 3/4 — quotient for the whole, remainder over divisor for the part. Reversed: 1 3/4 = (1 × 4 + 3)/4 = 7/4 — multiply the whole by the denominator, add the numerator, keep the denominator.',
        },
        {
          kind: 'example',
          title: 'Converting both ways',
          steps: [
            'Improper to mixed: $\\tfrac{17}{5}$ is the division $17 \\div 5 = 3$ remainder $2$, so $\\tfrac{17}{5} = 3\\tfrac{2}{5}$ — three wholes and two fifths more.',
            'Mixed to improper: $2\\tfrac{3}{8}$ rebuilds as $(2 \\times 8 + 3) \\div 8$-worth of eighths — that is $\\tfrac{19}{8}$, sitting in the gap between $2$ and $3$.',
            'A big one: $\\tfrac{100}{7} = 100 \\div 7 = 14$ remainder $2$, so $\\tfrac{100}{7} = 14\\tfrac{2}{7}$ — the exact answer Lesson 2.4 could only report as "14 remainder 2".',
            'And a famous visitor: $\\tfrac{22}{7} = 22 \\div 7 = 3$ remainder $1 = 3\\tfrac{1}{7}$, the ancient fraction used for a quarter-millennium as the working value of $\\pi$ (it overshoots $\\pi$ by about one part in two and a half thousand — close enough for most of history\'s engineering).',
          ],
        },
        {
          kind: 'table',
          caption:
            'The wardrobe at a glance. The sorting key is always the same comparison — numerator against denominator — and the mixed column is always the division algorithm\'s report, remainder over divisor.',
          head: ['Fraction', 'Proper or improper?', 'As a mixed number', 'Where it sits on the line'],
          rows: [
            ['$\\tfrac{3}{8}$', 'proper ($3 < 8$)', '— (already under $1$)', 'between $0$ and $1$'],
            ['$\\tfrac{4}{15}$', 'proper ($4 < 15$)', '— (already under $1$)', 'between $0$ and $1$'],
            ['$\\tfrac{8}{8}$', 'improper ($8 \\ge 8$)', 'exactly $1$', 'on the frontier post $1$'],
            ['$\\tfrac{9}{8}$', 'improper ($9 \\ge 8$)', '$1\\tfrac{1}{8}$', 'between $1$ and $2$'],
            ['$\\tfrac{17}{5}$', 'improper ($17 \\ge 5$)', '$3\\tfrac{2}{5}$', 'between $3$ and $4$'],
            ['$\\tfrac{22}{7}$', 'improper ($22 \\ge 7$)', '$3\\tfrac{1}{7}$', 'between $3$ and $4$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four traps at the door',
          text: '**Unequal parts are not parts.** Five random scraps torn from a chapati are not "$\\tfrac{5}{6}$" of it — the cut must make *equal* pieces, or the denominator names nothing. **Bigger denominator does not mean bigger fraction.** Cutting into more pieces makes each piece *smaller*: $\\tfrac{1}{8} < \\tfrac{1}{5} < \\tfrac{1}{2}$. The size of the part moves opposite to the denominator; only the numerator moves with the amount. **A mixed number is not a multiplication.** $1\\tfrac{3}{4}$ means one whole *and* three quarters more, which is $\\tfrac{7}{4}$ — not $1 \\times \\tfrac{3}{4} = \\tfrac{3}{4}$. The space between the whole and the part is punctuation, not an operator. **The denominator is never zero.** $\\tfrac{5}{0}$ is not "infinity" or "everything" — it is meaningless, because Lesson 2.4 showed division by zero has no consistent answer for the vinculum to inherit.',
        },
        { kind: 'heading', text: 'Unit fractions: the Egyptian toolkit' },
        {
          kind: 'para',
          text: 'Strip a fraction to its barest part — numerator $1$ — and you get a **unit fraction**: $\\tfrac{1}{2}$, $\\tfrac{1}{3}$, $\\tfrac{1}{8}$. Every fraction is a stack of such units ($\\tfrac{3}{4} = 3$ copies of $\\tfrac{1}{4}$), which makes unit fractions the natural "atoms" of the fraction world — and one civilisation ran its entire arithmetic on them for over two thousand years. Egyptian scribes wrote nearly every fraction as a **sum of distinct unit fractions**: never $\\tfrac{5}{6}$, always $\\tfrac{1}{2} + \\tfrac{1}{3}$; never $\\tfrac{2}{7}$, always $\\tfrac{1}{4} + \\tfrac{1}{28}$. Their one concession to convenience was the fraction $\\tfrac{2}{3}$, honoured with its own symbol. (Read those sums the part–whole way — a half-piece and a third-piece tiling one strip — since the arithmetic of *adding* fractions is Lesson 4.4\'s business.)',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The Rhind papyrus and the 2/n table',
          text: 'Our window into Egyptian reckoning is the **Rhind Mathematical Papyrus**, copied around 1650 BCE by the scribe **Ahmes** from a text already centuries older (from the era of king Amenemhat III) — making the mathematics inside it close to four thousand years old. Bought in Luxor by the Scottish antiquarian Alexander Henry Rhind in 1858 and housed in the British Museum since 1865, it is part textbook, part problem collection: loaves and beer rations, granaries and feed. Its front page is the tool that made unit fractions usable — a table decomposing $\\tfrac{2}{n}$ for every odd $n$ from $3$ to $101$ into sums of distinct unit fractions: $\\tfrac{2}{5} = \\tfrac{1}{3} + \\tfrac{1}{15}$, $\\tfrac{2}{7} = \\tfrac{1}{4} + \\tfrac{1}{28}$, fifty entries in all. Why the scribes chose these exact decompositions — of all the ones possible — is a question historians of mathematics still debate.',
        },
        {
          kind: 'figure',
          caption:
            'An Egyptian bar. Six equal cells, five shaded. Three cells make half the bar and two more make a third, so the shaded five sixths opens as 1/2 + 1/3 — exactly how a Rhind scribe would have written what we call 5/6. The one unshaded cell is the remaining 1/6: three unit fractions in a row tile the whole bar.',
          svg: `<svg viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of six equal cells with five shaded, bracketed as one half plus one third, one sixth left over">
  <g font-size="13" fill="currentColor">
    <g stroke="currentColor" stroke-width="1.5">
      <line x1="70" y1="40" x2="380" y2="40"/>
      <line x1="70" y1="40" x2="70" y2="46"/>
      <line x1="380" y1="40" x2="380" y2="46"/>
      <line x1="380" y1="40" x2="586.67" y2="40"/>
      <line x1="586.67" y1="40" x2="586.67" y2="46"/>
    </g>
    <g text-anchor="middle">
      <text x="225" y="30">1/2 of the bar — 3 cells</text>
      <text x="483" y="30">1/3 of the bar — 2 cells</text>
      <text x="638" y="30">the last 1/6</text>
    </g>
    <rect x="70" y="60" width="620" height="56" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="60" width="103.33" height="56"/>
      <rect x="173.33" y="60" width="103.33" height="56"/>
      <rect x="276.67" y="60" width="103.33" height="56"/>
      <rect x="380" y="60" width="103.33" height="56"/>
      <rect x="483.33" y="60" width="103.33" height="56"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="173.33" y1="60" x2="173.33" y2="116"/>
      <line x1="276.67" y1="60" x2="276.67" y2="116"/>
      <line x1="380" y1="60" x2="380" y2="116"/>
      <line x1="483.33" y1="60" x2="483.33" y2="116"/>
      <line x1="586.67" y1="60" x2="586.67" y2="116"/>
    </g>
    <g text-anchor="middle" font-size="12.5" opacity="0.9">
      <text x="121.67" y="95">1/6</text>
      <text x="225" y="95">1/6</text>
      <text x="328.33" y="95">1/6</text>
      <text x="431.67" y="95">1/6</text>
      <text x="535" y="95">1/6</text>
      <text x="638.33" y="95">1/6</text>
    </g>
    <text x="380" y="152" text-anchor="middle" font-weight="700">5/6 of the bar is shaded = 1/2 + 1/3</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the bar the way Ahmes would. Six equal cells; five shaded. Three cells make half the bar, two more make a third — and indeed $\\tfrac{1}{2} + \\tfrac{1}{3}$ (three cells plus two cells) shades five of the six, which is why the scribe\'s name for our $\\tfrac{5}{6}$ was exactly that pair of pieces. The lone unshaded cell is $\\tfrac{1}{6}$, and the three descriptions — halves, thirds, sixths — tile the same bar without gap or overlap. This is the part–whole reading doing real historical work: no fraction arithmetic required, only careful counting of equal cells.',
        },
        {
          kind: 'equation',
          latex: '\\frac{2}{7} \\;=\\; \\frac{1}{4} + \\frac{1}{28}',
          note: 'A genuine line of the Rhind 2/n table. A quarter-piece and a twenty-eighth-piece tile the two-sevenths strip: seven twenty-eighths plus one more makes eight, and 8/28 reduces to 2/7. Lesson 4.2 makes such reductions routine; today, count cells.',
        },
        { kind: 'heading', text: 'The promise kept: fractions grow dense' },
        {
          kind: 'para',
          text: 'Now the debt this chapter opened with. Between $1$ and $2$, the figure\'s bottom panel showed a whole population — $\\tfrac{9}{8}, \\tfrac{5}{4}, \\tfrac{11}{8}, \\tfrac{3}{2}, \\tfrac{13}{8}, \\tfrac{7}{4}, \\tfrac{15}{8}$, and more: the staircase $\\tfrac{3}{2}, \\tfrac{4}{3}, \\tfrac{5}{4}, \\tfrac{6}{5}, \\tfrac{7}{6}, \\ldots$ climbs through that gap forever, each rung one whole divided into ever-finer parts. But density asks for more than "many": it asks whether *any* two fractions, however close, always have another fraction between them — whether the line has no adjacent fractions, no pair so neighbouring that nothing fits between. The whole numbers failed this beautifully ($4$ and $5$ are neighbours; nothing whole lives between). Fractions, it turns out, cannot be neighbours at all — and the proof is a one-line construction you can run forever.',
        },
        {
          kind: 'para',
          text: 'The construction is the **mediant**: given two fractions $\\tfrac{a}{b}$ and $\\tfrac{c}{d}$, add the numerators and add the denominators — the new fraction $\\tfrac{a+c}{b+d}$ — with no simplification, no common denominator, nothing. The mediant of $\\tfrac{1}{3}$ and $\\tfrac{1}{2}$ is $\\tfrac{2}{5}$, which indeed lies between them. The mediant of $\\tfrac{2}{3}$ and $\\tfrac{3}{4}$ is $\\tfrac{5}{7}$ — also between. It looks like a trick, so this book does what it always does: proves it, using nothing but whole-number arithmetic and one licence.',
        },
        {
          kind: 'derivation',
          title: 'The mediant theorem',
          statement:
            'For positive fractions a/b < c/d, the mediant (a+c)/(b+d) lies strictly between them: a/b < (a+c)/(b+d) < c/d.',
          steps: [
            {
              label: 'Take out the one licence',
              formula: '\\tfrac{a}{b} < \\tfrac{c}{d} \\;\\Longleftrightarrow\\; ad < bc',
              explanation:
                'For positive numbers, comparing two fractions by cross-multiplying their numerators and denominators is valid — the fully proved version arrives with common denominators in Lessons 4.2 and 4.3, so we borrow it today as a stated licence, on honest credit. (The debt is logged; it will be paid in this unit.)',
            },
            {
              label: 'Add ab to both sides',
              formula: 'ad < bc \\;\\Rightarrow\\; ab + ad < ab + bc \\;\\Rightarrow\\; a(b+d) < b(a+c)',
              explanation:
                'Adding the same positive whole number to both sides of an inequality preserves it — Lesson 1.2\'s domination rule, still earning its keep. The regrouped right side is exactly the cross-multiplication of a/b against the mediant: a(b+d) < b(a+c) says a/b < (a+c)/(b+d), again by the licence.',
            },
            {
              label: 'Add cd to both sides',
              formula: 'ad < bc \\;\\Rightarrow\\; ad + cd < bc + cd \\;\\Rightarrow\\; d(a+c) < c(b+d)',
              explanation:
                'The same move, symmetric: the new inequality is the cross-multiplication of the mediant against c/d, so (a+c)/(b+d) < c/d. Both bounds came from the single hypothesis ad < bc by adding positive quantities — no fraction arithmetic anywhere.',
            },
          ],
          result:
            'a/b < (a+c)/(b+d) < c/d. The mediant always lands strictly between — a between-fractions machine built from two additions.',
        },
        {
          kind: 'formula',
          name: 'The mediant sits between',
          latex: '\\frac{a}{b} \\;<\\; \\frac{a+c}{b+d} \\;<\\; \\frac{c}{d} \\qquad \\left( \\tfrac{a}{b} < \\tfrac{c}{d}, \\; b, d > 0 \\right)',
          note: 'Add numerators, add denominators, and the result cannot escape the interval. Feed the output back in as an input and you get another, closer bound — forever. Density in one line.',
        },
        {
          kind: 'para',
          text: 'Watch the machine run. Between $\\tfrac{3}{7}$ and $\\tfrac{4}{9}$: mediant $\\tfrac{7}{16} = 0.4375$, snug between $0.42857\\ldots$ and $0.44444\\ldots$. Not close enough? Take the mediant of $\\tfrac{7}{16}$ and $\\tfrac{4}{9}$: $\\tfrac{11}{25} = 0.44$, closer still to the right end. Every step squeezes the interval, and no step can ever be the last — the theorem guarantees each new fraction has another between it and either neighbour. And the staircase from earlier is this machine in disguise: the mediant of $\\tfrac{n}{n+1}$ with $\\tfrac{1}{1}$ is $\\tfrac{n+1}{n+2}$, so $\\tfrac{2}{3}, \\tfrac{3}{4}, \\tfrac{4}{5}, \\ldots$ is a mediant chain hanging from the whole $1$, marching down towards it without ever arriving.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'No neighbours — the promise kept',
          text: 'Between any two different fractions there is always a third (the mediant), and therefore — run the machine again on each new gap — **infinitely many**. The fraction line is *dense*: no adjacent pairs, no smallest positive fraction (halve anything), no gap between neighbours for anything to fall through. This is exactly what Lesson 3.5 promised when it closed the unit on primes: *between any two whole numbers, fractions grow dense* — delivered, and proved, not asserted. One honesty note for the road: dense is not yet *gapless*. The line still has room for numbers no fraction can be (the diagonal of a unit square will one day demand them) — a whisper we will cash in a much later chapter. The atoms of chapter 3 remain atoms; the spaces between them are now inhabited.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Fractions in the exam hall',
          text: 'Fraction vocabulary and the fraction-of-a-quantity move are assumed knowledge on every quantitative paper — SSC, RRB, banking, CUET, NTSE — and they arrive dressed exactly as this lesson dressed them. "3/4 of a sum" items, proper/improper classification MCQs, and mixed↔improper conversions buried inside simplification chains (Khattar\'s chapter 4 works its BODMAS on fractions throughout) are the bread-and-butter layer. The comparison family — *which is the largest among* $\\tfrac{2}{3}, \\tfrac{4}{5}, \\tfrac{7}{11}$ (an SSC Multi-Tasking Staff 2017 item in Khattar\'s chapter 1 drill set) — is banked for Lesson 4.3, where the cross-multiplication licence becomes a proved engine. The habit to build now: on meeting any fraction, read *both* faces in one breath — part of a whole, and a division — because examiners\' fastest questions are the ones that flip between the two readings.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In the fraction 7/4, what exactly does the 4 tell you?',
              options: [
                'That 7 parts were taken from 4',
                'The size of each equal part — the whole was cut into 4, so the parts are quarters',
                'That the fraction is proper',
                'The remainder left over after dividing 7 by 4',
              ],
              answer: 1,
              explain:
                'The denominator names the part: 4 below the bar means the whole was cut into 4 equal pieces, so each piece is a quarter (Option 2). Option 1 swaps the jobs — the 7 on top counts parts taken, and 7 > 4 actually makes the fraction improper, which kills Option 3 as well. Option 4 confuses the denominator with the division algorithm\'s remainder: dividing 7 by 4 does leave remainder 3, but that is a fact about the quotient-report, not what the 4 in the notation means.',
            },
            {
              q: 'Which of these fractions is improper?',
              options: [
                '3/8',
                '5/9',
                '8/8',
                '2/15',
              ],
              answer: 2,
              explain:
                'Improper means numerator ≥ denominator, and 8/8 qualifies with equality — it is worth exactly 1 whole, standing right on the frontier post (Option 3). The others are proper: 3 < 8, 5 < 9, 2 < 15, each worth less than one whole and living strictly between 0 and 1. The trap in 8/8 is thinking "improper" requires being *more* than 1 — the rule includes the boundary, and the wardrobe table lists 8/8 under improper for exactly this reason.',
            },
            {
              q: 'Express the division 17 ÷ 5 exactly, and name the mixed form.',
              options: [
                'It is 17/5, which is 3 wholes and 2 fifths more (3 2/5)',
                'It is 5/17, which is 5 wholes and 17 fifths more',
                'It is 17/5, which is 2 wholes and 3 fifths more (2 3/5)',
                'The division has no answer, because 5 does not divide 17',
              ],
              answer: 0,
              explain:
                'The vinculum is a division sign: 17 ÷ 5 = 17/5 exactly (Option 1). For the mixed form, run the algorithm: 17 = 3 × 5 + 2, quotient 3 for the wholes, remainder 2 over divisor 5 for the part — 3 2/5. Option 2 inverts the fraction (5/17 is a proper fraction worth less than 1). Option 3 misruns the algorithm: 2 × 5 + 3 = 13, not 17 — the pair (2, 3) fails the division algorithm that (3, 2) satisfies. Option 4 is the whole-number reflex this lesson retires: the answer exists; the whole numbers just could not write it.',
            },
            {
              q: 'What is 5/6 of 84?',
              options: [
                '14',
                '74',
                '90',
                '70',
              ],
              answer: 3,
              explain:
                'Split 84 into 6 equal shares — 84 ÷ 6 = 14 — and take five of them: 5 × 14 = 70 (Option 4). Option 1 stops at the unit share: 14 is 1/6 of 84, the building block, not the answer. Option 74 transposes the digits of 70, a copy-slip the exam hall punishes. Option 90 adds 6 to 84 — a mangled version of "six shares" that ignores the split entirely.',
            },
            {
              q: 'Which fraction lies strictly between 1/3 and 1/2?',
              options: [
                '1/6',
                '2/5',
                '2/3',
                '5/6',
              ],
              answer: 1,
              explain:
                'The mediant machine: add numerators (1 + 1 = 2), add denominators (3 + 2 = 5), and 2/5 = 0.4 lands strictly between 0.333… and 0.5 (Option 2) — proved in general by the mediant theorem. Option 1, 1/6 ≈ 0.167, lies *below* both (bigger denominator, smaller part). Options 3 and 4, at 0.667 and 0.833, sit *above* 1/2 — the classic error of comparing only numerators ("2 beats 1") without asking what the denominators did to the part size.',
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
                  q: 'For the fraction 5/8: name the numerator and the denominator, state what each one tells you, and write "eleven sixteenths" as a fraction.',
                  solution: [
                    'In $\\tfrac{5}{8}$: the numerator is $5$ — five parts are taken',
                    'the denominator is $8$ — the whole was cut into $8$ equal parts, so the parts are eighths.',
                    'Read aloud: "five eighths", count then name. "Eleven sixteenths" puts the count on top and the name below: $\\tfrac{11}{16}$.',
                    '(Check the jobs with the treaty: $11 < 16$, so this one is proper and lives between $0$ and $1$.)',
                  ],
                },
                {
                  q: 'A strip is cut into 7 equal cells and 3 of them are shaded. What fraction of the strip is shaded — and would the answer be the same if the 7 cells were of unequal sizes?',
                  solution: [
                    'With equal cells, the shaded amount is $\\tfrac{3}{7}$: denominator $7$ names the parts (sevenths), numerator $3$ counts them.',
                    'If the cells are *unequal*, the reading collapses — the treaty requires **equal** parts, because the denominator names a single part-size.',
                    'Seven unequal scraps shaded would be some amount, but it is not "three sevenths" of anything; you could not even say which seventh a given scrap is.',
                    'Equal parts are not a detail of the notation; they are its foundation.',
                  ],
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Classify each as proper, improper, or mixed: 3/11, 11/3, 8/8, 2 1/6, 15/4, 4/15, 9/9 — and convert the improper ones to mixed numbers.',
                  solution: [
                    'Run the numerator-vs-denominator comparison on each.',
                    '$\\tfrac{3}{11}$: $3 < 11$ — proper.',
                    '$\\tfrac{11}{3}$: $11 \\ge 3$ — improper',
                    'the algorithm gives $11 = 3 \\times 3 + 2$, so $\\tfrac{11}{3} = 3\\tfrac{2}{3}$.',
                    '$\\tfrac{8}{8}$: $8 \\ge 8$ — improper *at the boundary*, worth exactly $1$.',
                    '$2\\tfrac{1}{6}$: already mixed (and secretly improper: $(2 \\times 6 + 1) = \\tfrac{13}{6}$).',
                    '$\\tfrac{15}{4}$: improper',
                    '$15 = 3 \\times 4 + 3$, so $3\\tfrac{3}{4}$.',
                    '$\\tfrac{4}{15}$: proper.',
                    '$\\tfrac{9}{9}$: improper at the boundary, worth $1$.',
                    'The two boundary cases are the point of the exercise: "improper" includes equality, and both $\\tfrac{8}{8}$ and $\\tfrac{9}{9}$ stand exactly on the frontier post $1$.',
                  ],
                },
                {
                  q: 'Convert: (a) 17/5 to a mixed number; (b) 2 3/8 to an improper fraction; (c) 100/7 to a mixed number.',
                  solution: [
                    '(a) $\\tfrac{17}{5}$ is the division $17 \\div 5$: quotient $3$, remainder $2$ (since $17 = 3 \\times 5 + 2$), so $\\tfrac{17}{5} = 3\\tfrac{2}{5}$ — three wholes and two fifths more.',
                    '(b) $2\\tfrac{3}{8}$ rebuilds: multiply the whole by the denominator ($2 \\times 8 = 16$), add the numerator ($16 + 3 = 19$), keep the denominator: $\\tfrac{19}{8}$, which sits in the gap between $2$ and $3$.',
                    '(c) $\\tfrac{100}{7}$: $100 = 14 \\times 7 + 2$, so $14\\tfrac{2}{7}$ — the exact value that whole-number division could only stammer as "14 remainder 2".',
                    'All three are the division algorithm of Lesson 2.4, reread through the vinculum.',
                  ],
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Compute: (a) 3/4 of 84; (b) 5/8 of 56; (c) 7/12 of 144.',
                  solution: [
                    '(a) Split $84$ into $4$ shares: $84 \\div 4 = 21$',
                    'take three: $3 \\times 21 = 63$.',
                    '(b) The eighth-share of $56$ is $56 \\div 8 = 7$',
                    'five of them make $5 \\times 7 = 35$.',
                    '(c) The twelfth-share of $144$ is $144 \\div 12 = 12$',
                    'seven of them make $7 \\times 12 = 84$.',
                    'In each case the exam-friendly structure is the same: the quantity divides cleanly by the denominator, so the unit share is a small whole number and the taking is a small multiplication.',
                    'That is the division face of the fraction doing all the work.',
                  ],
                },
                {
                  q: 'How many 1/6-pieces does it take to build 5 wholes? And what fraction of one whole is each piece?',
                  solution: [
                    'Each whole is $6$ sixths, so $5$ wholes need $5 \\times 6 = 30$ pieces.',
                    'Each piece is $\\tfrac{1}{6}$ of a whole — a unit fraction, the atom out of which the five wholes are stacked.',
                    'This is Lesson 2.4\'s grouping division in fraction dress: "how many $\\tfrac{1}{6}$s fit in $5$?" is the same question as "$5 \\div \\tfrac{1}{6}$", and counting pieces answers it without any new machinery.',
                    '(The full rule for dividing *by* a fraction arrives in Lesson 4.5 — but the grouping picture you just used is the reason that rule will work.)',
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Express each division exactly as a fraction, and as a mixed number where it is improper: (a) 23 ÷ 6; (b) 8 ÷ 25; (c) 144 ÷ 12.',
                  solution: [
                    '(a) $23 \\div 6 = \\tfrac{23}{6}$ exactly',
                    'improper, and the algorithm reports $23 = 3 \\times 6 + 5$, so $\\tfrac{23}{6} = 3\\tfrac{5}{6}$ — three wholes and five sixths more, sitting between $3$ and $4$ on the line.',
                    '(b) $8 \\div 25 = \\tfrac{8}{25}$ — and here is the instructive twist: the fraction is *proper* ($8 < 25$), worth less than one whole, living between $0$ and $1$.',
                    'A division can absolutely land there',
                    'there is no rule that quotients exceed $1$.',
                    '(c) $144 \\div 12 = 12$ exactly, and the fraction is $\\tfrac{144}{12}$ — which *is* $12 = \\tfrac{12}{1}$: whole numbers are just fractions whose denominators have nothing left to name.',
                    'Three divisions, three wardrobe boxes — same vinculum throughout.',
                  ],
                },
                {
                  q: 'Egyptian style: open 3/10 as a sum of two distinct unit fractions (find at least one valid pair).',
                  solution: [
                    'Hunt for unit fractions that tile a 10-cell strip\'s 3 shaded cells.',
                    'Try $\\tfrac{1}{4}$: a quarter of the strip is $2.5$ cells — not a whole number of cells, but unit fractions need not respect *this* strip; the honest test is the value.',
                    '$\\tfrac{1}{4} + \\tfrac{1}{20} = \\tfrac{5}{20} + \\tfrac{1}{20} = \\tfrac{6}{20} = \\tfrac{3}{10}$ ✓ — one valid opening.',
                    'Another: $\\tfrac{1}{5} + \\tfrac{1}{10} = \\tfrac{2}{10} + \\tfrac{1}{10} = \\tfrac{3}{10}$ ✓.',
                    'Both are pairs of *distinct* unit fractions, as Egyptian style demands.',
                    '(A systematic way, previewing Lesson 4.2\'s toolkit: take the largest unit fraction not exceeding $\\tfrac{3}{10}$ — that is $\\tfrac{1}{4}$, since $\\tfrac{1}{3} \\approx 0.333$ overshoots — and study the remainder $\\tfrac{3}{10} - \\tfrac{1}{4} = \\tfrac{1}{20}$, itself a unit fraction. Done in two steps. The Rhind scribes\' own choices followed preferences — fewer terms, smaller denominators — that historians still debate.)',
                  ],
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Without finding common denominators, insert a fraction strictly between 3/7 and 4/9 — then insert another strictly between your insertion and 4/9. Verify both placements.',
                  solution: [
                    'Mediant machine, twice.',
                    'First: add numerators $3 + 4 = 7$, add denominators $7 + 9 = 16$: the fraction $\\tfrac{7}{16} = 0.4375$ sits strictly between $\\tfrac{3}{7} \\approx 0.42857$ and $\\tfrac{4}{9} \\approx 0.44444$ ✓ — guaranteed by the mediant theorem, but verified by division anyway: $0.42857 < 0.4375 < 0.44444$.',
                    'Second: take the mediant of $\\tfrac{7}{16}$ and $\\tfrac{4}{9}$: numerators $7 + 4 = 11$, denominators $16 + 9 = 25$, giving $\\tfrac{11}{25} = 0.44$, and indeed $0.4375 < 0.44 < 0.44444$ ✓.',
                    'The interval has been squeezed from width $0.0159$ to $0.0044$, and the machine can keep going forever — that endlessly repeatable squeeze *is* density.',
                  ],
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the mediant theorem in general: for positive whole numbers a, b, c, d with a/b < c/d, the fraction (a+c)/(b+d) satisfies a/b < (a+c)/(b+d) < c/d. State your licence explicitly.',
                  solution: [
                    'Licence (borrowed on credit, to be proved with common denominators in Lessons 4.2–4.3): for positive fractions, $\\tfrac{a}{b} < \\tfrac{c}{d}$ is equivalent to $ad < bc$ — cross-multiply the outer pair against the inner pair.',
                    'With the licence in hand, the hypothesis gives $ad < bc$, and both bounds follow by adding the same positive number to both sides (Lesson 1.2\'s domination rule for inequalities).',
                    'Left bound: add $ab$ to both sides of $ad < bc$, getting $ab + ad < ab + bc$, which regroups as $a(b + d) < b(a + c)$.',
                    'By the licence read right-to-left, this says $\\tfrac{a}{b} < \\tfrac{a+c}{b+d}$ — the mediant beats the left end.',
                    'Right bound: add $cd$ to both sides of $ad < bc$ instead, getting $ad + cd < bc + cd$, which regroups as $d(a + c) < c(b + d)$.',
                    'By the licence, $\\tfrac{a+c}{b+d} < \\tfrac{c}{d}$ — the mediant loses to the right end.',
                    'Stringing the two together: $\\tfrac{a}{b} < \\tfrac{a+c}{b+d} < \\tfrac{c}{d}$. □ Note what was *not* used: no fraction addition, no common denominators, no simplification — only integer multiplication, integer addition, and the order rules of whole numbers.',
                    'Density of the fraction line rests on the arithmetic of chapter 1.',
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The idea is planted. A fraction is a part of a whole and a division in waiting; it lives at a point on the number line, dresses proper or improper or mixed according to its numerator\'s reach, and multiplies without limit between its neighbours — the dense world chapter 3 promised, now with a working address. Two loose threads are deliberately left showing, and both are next lesson\'s work: the cross-multiplication licence that the mediant proof borrowed on credit, and the quiet fact that $\\tfrac{3}{4}$ and $\\tfrac{12}{16}$ would shade the very same cells of any bar you draw. Same amount, different spelling — that is **equivalence**, and taming it is the business of Lesson 4.2, where the atoms of chapter 3 finally return to divide a numerator and a denominator at once.',
        },
      ],
    },
    {
      id: 'fm-equivalent-fractions-simplification',
      number: '4.2',
      title: 'Equivalent Fractions and Simplification',
      concepts: [
        'Equivalent fractions',
        'The multiplying rule',
        'Lowest terms',
        'Simplification and the HCF',
        'Cross-multiplication test',
        'Raising to higher terms',
        'The additive trap',
      ],
      objectives: [
        'Recognise and generate equivalent fractions with the multiplying rule n/d = nk/dk, and explain it by regrouping equal pieces',
        'Simplify any fraction to its lowest terms in one step via the HCF of chapter 3, and say why that name is the canonical one',
        'Prove the cross-multiplication test a/b = c/d ⟺ ad = bc — paying, in full, the licence Lesson 4.1 borrowed for the mediant proof',
        'Raise a fraction to any target denominator that is a multiple of its own — the move that powers common denominators in Lessons 4.3–4.4',
      ],
      prerequisites: [
        'fm-idea-of-a-fraction',
        'fm-prime-numbers-factorisation',
        'fm-highest-common-factor',
        'fm-hcf-lcm-and-how-they-relate',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch7'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.1 closed with two debts on the desk. One was stated outright: the mediant proof had *borrowed* the cross-multiplication rule "for positive fractions, $\\tfrac{a}{b} < \\tfrac{c}{d}$ is equivalent to $ad < bc$" — on honest credit, to be repaid with common denominators. The other was a quiet observation: $\\tfrac{3}{4}$ and $\\tfrac{12}{16}$ would shade the very same cells of any bar you draw. Same amount, different spelling. This lesson pays both debts at once, because they turn out to be the same debt: to say precisely when two different spellings name the same amount, and what the shortest spelling is.',
        },
        {
          kind: 'para',
          text: 'Back to the dinner table where the chapter began. One child holds $\\tfrac{3}{4}$ of a chapati — three of the four equal pieces the chapati was cut into. Now cut *every piece in half*. The chapati is now in $8$ equal pieces, and the child holds $6$ of them: $\\tfrac{6}{8}$. Nothing was eaten, nothing was added — the child holds exactly what they held before, and the amount now has a second name. Cut every piece in half again: $16$ pieces, the child holds $12$, and the amount reads $\\tfrac{12}{16}$. Three names — $\\tfrac{3}{4}$, $\\tfrac{6}{8}$, $\\tfrac{12}{16}$ — one plate, one amount. The Egyptian scribes of Lesson 4.1 and their two-term openings for $\\tfrac{3}{10}$ will wait for Lesson 4.4\'s subtraction; today\'s business is this family of names and how to move inside it.',
        },
        {
          kind: 'para',
          text: 'The plan, as always, runs meaning first and machinery second. First, what "equivalent" should mean: the same point on the number line, the same amount of the same whole. Second, the rule that generates every equivalence — multiply (or divide) numerator and denominator by the same nonzero whole number — proved by the cutting picture, not memorised. Third, the payoff this book has been aiming at since chapter 3: **simplification**, where the HCF finally gets to divide a numerator and a denominator *at once*, handing each fraction its shortest name. And fourth, the payment: the cross-multiplication licence proved in full, followed by the reverse move — building fractions up to a chosen denominator — that Lessons 4.3 and 4.4 will put to work.',
        },
        { kind: 'heading', text: 'Same amount, different names' },
        {
          kind: 'para',
          text: 'Say it carefully, because the whole lesson rests on the saying. Two fractions are **equivalent** when they describe the same amount of the same whole — when they shade the same cells of a bar, mark the same point on the number line, answer the same fair-share division. The bar makes it visible. Cut a strip into $4$ equal cells and shade $3$; cut an identical strip into $8$ equal cells and shade $6$; cut a third into $16$ and shade $12$. Hold the three strips side by side: the shading stops at exactly the same place on all of them — three quarters of the way along, on every strip. The names differ; the amount does not.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Equivalent fractions',
          text: 'Two fractions $\\tfrac{n}{d}$ and $\\tfrac{n\'}{d\'}$ (positive whole numbers, $d, d\' \\ne 0$) are said to be **equivalent** if they name the same point of the number line — the same amount of the same whole. Thus, $\\tfrac{n}{d}$ and $\\tfrac{n\'}{d\'}$ are equivalent exactly when each can be produced from the other by multiplying (or dividing) both its numerator and its denominator by the same nonzero whole number — the multiplying rule proved below. Equivalence preserves everything a fraction *is* (its point, its size, its division value) and changes only its *spelling*.',
        },
        {
          kind: 'para',
          text: 'For example, take the family of $\\tfrac{3}{4}$ and raise it rung by rung — each rung multiplies both parts by the next whole number:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '(i) $\\tfrac{3}{4} = \\tfrac{6}{8}$ — both parts multiplied by $2$;',
            '(ii) $\\tfrac{3}{4} = \\tfrac{9}{12}$ — both parts multiplied by $3$;',
            '(iii) $\\tfrac{3}{4} = \\tfrac{12}{16}$ — both parts multiplied by $4$: the very pair Lesson 4.1 left on the desk;',
            '(iv) $\\tfrac{3}{4} = \\tfrac{15}{20}$ — both parts multiplied by $5$.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'One amount, three rulers. The same strip is cut into 4, 8 and 16 equal cells, with 3, 6 and 12 cells shaded. The shading ends at the same mark on every bar — three quarters of the strip — so 3/4 = 6/8 = 12/16: the names change with the ruler, the amount does not. The dashed line marks where the shading stops; it meets all three bars at the same place.',
          svg: `<svg viewBox="0 0 760 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three bars of 4, 8 and 16 cells with 3, 6 and 12 shaded; the shading ends at the same point on all three">
  <g font-size="13" fill="currentColor">
    <text x="70" y="34">cut into 4 equal pieces — 3 shaded: 3/4</text>
    <rect x="70" y="44" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="44" width="155" height="44"/>
      <rect x="225" y="44" width="155" height="44"/>
      <rect x="380" y="44" width="155" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="225" y1="44" x2="225" y2="88"/>
      <line x1="380" y1="44" x2="380" y2="88"/>
      <line x1="535" y1="44" x2="535" y2="88"/>
    </g>
    <text x="706" y="71" font-weight="700">3/4</text>

    <text x="70" y="122">cut into 8 equal pieces — 6 shaded: 6/8</text>
    <rect x="70" y="132" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="132" width="77.5" height="44"/>
      <rect x="147.5" y="132" width="77.5" height="44"/>
      <rect x="225" y="132" width="77.5" height="44"/>
      <rect x="302.5" y="132" width="77.5" height="44"/>
      <rect x="380" y="132" width="77.5" height="44"/>
      <rect x="457.5" y="132" width="77.5" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="147.5" y1="132" x2="147.5" y2="176"/>
      <line x1="225" y1="132" x2="225" y2="176"/>
      <line x1="302.5" y1="132" x2="302.5" y2="176"/>
      <line x1="380" y1="132" x2="380" y2="176"/>
      <line x1="457.5" y1="132" x2="457.5" y2="176"/>
      <line x1="535" y1="132" x2="535" y2="176"/>
      <line x1="612.5" y1="132" x2="612.5" y2="176"/>
    </g>
    <text x="706" y="159" font-weight="700">6/8</text>

    <text x="70" y="210">cut into 16 equal pieces — 12 shaded: 12/16</text>
    <rect x="70" y="220" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="220" width="38.75" height="44"/>
      <rect x="108.75" y="220" width="38.75" height="44"/>
      <rect x="147.5" y="220" width="38.75" height="44"/>
      <rect x="186.25" y="220" width="38.75" height="44"/>
      <rect x="225" y="220" width="38.75" height="44"/>
      <rect x="263.75" y="220" width="38.75" height="44"/>
      <rect x="302.5" y="220" width="38.75" height="44"/>
      <rect x="341.25" y="220" width="38.75" height="44"/>
      <rect x="380" y="220" width="38.75" height="44"/>
      <rect x="418.75" y="220" width="38.75" height="44"/>
      <rect x="457.5" y="220" width="38.75" height="44"/>
      <rect x="496.25" y="220" width="38.75" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.5">
      <line x1="108.75" y1="220" x2="108.75" y2="264"/>
      <line x1="147.5" y1="220" x2="147.5" y2="264"/>
      <line x1="186.25" y1="220" x2="186.25" y2="264"/>
      <line x1="225" y1="220" x2="225" y2="264"/>
      <line x1="263.75" y1="220" x2="263.75" y2="264"/>
      <line x1="302.5" y1="220" x2="302.5" y2="264"/>
      <line x1="341.25" y1="220" x2="341.25" y2="264"/>
      <line x1="380" y1="220" x2="380" y2="264"/>
      <line x1="418.75" y1="220" x2="418.75" y2="264"/>
      <line x1="457.5" y1="220" x2="457.5" y2="264"/>
      <line x1="496.25" y1="220" x2="496.25" y2="264"/>
      <line x1="535" y1="220" x2="535" y2="264"/>
      <line x1="573.75" y1="220" x2="573.75" y2="264"/>
      <line x1="612.5" y1="220" x2="612.5" y2="264"/>
      <line x1="651.25" y1="220" x2="651.25" y2="264"/>
    </g>
    <text x="706" y="247" font-weight="700">12/16</text>

    <line x1="535" y1="38" x2="535" y2="272" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
    <text x="380" y="300" text-anchor="middle" font-weight="700">the shading stops at the same place: 3/4 = 6/8 = 12/16</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the figure once, slowly. Three bars, three rulers — quarters, eighths, sixteenths. The shaded runs are $3$ cells, $6$ cells, $12$ cells long in *count*, yet all three runs end on the same dashed line, because each shaded run covers exactly the same physical stretch of strip. That single picture carries the entire vocabulary of the lesson. A fraction\'s **names** are the rows of the figure; its **value** is where the shading ends. Equivalence means "same ending, different ruler". And a question now forces itself, the question that organises everything ahead: which rulers, out of all possible ones, show the shading ending *earliest* on the page — the name with nothing left to trim?',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Equivalent fractions',
              def: 'Fractions that name the same amount of the same whole — the same point on the number line. 3/4, 6/8, 9/12, 12/16 and 15/20 are five names of one value.',
            },
            {
              term: 'Multiplying rule',
              def: 'Multiplying the numerator and denominator of n/d by the same nonzero whole number k gives nk/dk, an equivalent fraction: 3/4 = 3×4 / 4×4 = 12/16. Read backwards it divides — the simplification move.',
            },
            {
              term: 'Lowest terms',
              def: 'The one name of a fraction in which numerator and denominator share no factor but 1 (HCF = 1). 12/16 in lowest terms is 3/4. Also called simplest form.',
            },
            {
              term: 'Raising to higher terms',
              def: 'The reverse of simplifying: multiplying both parts to reach a chosen (larger) denominator — 3/4 raised to sixteenths is 12/16. The move that will line fractions up on a common ruler.',
            },
            {
              term: 'Family of a fraction',
              def: 'All names equivalent to a given fraction — the whole set of spellings of one value. The family is infinite; exactly one member is in lowest terms.',
            },
          ],
        },
        { kind: 'heading', text: 'The multiplying rule' },
        {
          kind: 'para',
          text: 'The figure showed equivalence; now the rule that generates it. Why does multiplying **both** parts by the same whole number leave the amount untouched? The answer is the regrouping picture from the dinner table, run in general. Start with the fraction $\\tfrac{n}{d}$: a whole cut into $d$ equal pieces, $n$ of them taken. Now cut **every one of the $d$ pieces** into $k$ equal sub-pieces. The whole is now cut into $d \\times k$ pieces — each a $\\tfrac{1}{dk}$-part — and every old piece has become exactly $k$ new ones. The $n$ old pieces you held have become $n \\times k$ new pieces. Nothing was eaten, nothing added: the same amount, counted under a finer ruler. The old name was $\\tfrac{n}{d}$; the new name is $\\tfrac{n \\times k}{d \\times k}$. They must be equal, because they describe one and the same holding.',
        },
        {
          kind: 'derivation',
          title: 'The equivalence rule',
          statement:
            'For any fraction n/d (whole numbers, d ≠ 0) and any nonzero whole number k: n/d = (n×k)/(d×k). Multiplying both parts by the same nonzero whole number never changes the value — and neither does dividing both by a whole number that divides them both.',
          steps: [
            {
              label: 'Cut every piece into k sub-pieces',
              formula: 'd \\text{ pieces} \\;\\to\\; d \\times k \\text{ pieces, each of size } \\tfrac{1}{dk}',
              explanation:
                'This is only the cutting act of Lesson 4.1, repeated on each piece: the whole is re-divided into dk equal parts. Each old piece of size 1/d has become k sub-pieces of size 1/(dk) — regrouped, not resized.',
            },
            {
              label: 'Recount the holding',
              formula: 'n \\text{ old pieces} \;=\; n \\times k \\text{ new pieces}',
              explanation:
                'Each of the n held pieces contributes k sub-pieces, so the holding is now nk pieces of size 1/(dk). The amount held has not changed — only the ruler used to count it.',
            },
            {
              label: 'Read both names off the same holding',
              formula: '\\tfrac{n}{d} \\;=\\; \\frac{n \\times k}{d \\times k}',
              explanation:
                'The old name counts n parts of size 1/d; the new name counts nk parts of size 1/(dk); both describe the same amount. Dividing both parts by a common factor is the same statement read backwards: regroup k sub-pieces into one piece and recount.',
            },
          ],
          result:
            'n/d = (n×k)/(d×k) for every nonzero whole k. The multiplying rule is the regrouping of equal pieces — and its reverse, dividing both parts, is the simplification this lesson has been owed since chapter 3.',
        },
        {
          kind: 'formula',
          name: 'The equivalence rule',
          latex: '\\frac{n}{d} \\;=\\; \\frac{n \\times k}{d \\times k} \\;=\\; \\frac{n \\div g}{d \\div g} \\qquad (k \\text{ any nonzero whole}, \\; g = \\mathrm{HCF}(n, d))',
          note: 'Multiply both parts by the same nonzero whole number, or divide both by a common factor — the value never moves. Take g to be the HCF and the division, in one step, lands on the lowest-terms name.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The additive trap',
          text: 'The rule licenses **multiplication and division** of both parts by the same number — never **addition**. Adding the same amount to numerator and denominator changes the fraction: $\\tfrac{3}{4}$ becomes $\\tfrac{4}{5}$ under "$+1$ to both", and the cross-check of this lesson exposes the fraud — $3 \\times 5 = 15$ but $4 \\times 4 = 16$, unequal. Likewise $\\tfrac{24}{36} \\ne \\tfrac{25}{37}$ ($24 \\times 37 = 888$, $36 \\times 25 = 900$). There is a beautiful reason equal additions always fail, borrowed straight from Lesson 4.1: $\\tfrac{n+k}{d+k}$ is precisely the **mediant** of $\\tfrac{n}{d}$ and the whole $1$ dressed as $\\tfrac{k}{k}$, and the mediant theorem says a mediant always lands **strictly between** its parents — so every equal addition shoves the fraction up towards $1$ without ever reaching it. $\\tfrac{4}{5} = 0.8$ sits between $\\tfrac{3}{4} = 0.75$ and $1$; $\\tfrac{25}{37}$ sits between $\\tfrac{24}{36} = \\tfrac{2}{3}$ and $1$. Equal additions never stand still.',
        },
        {
          kind: 'example',
          title: 'Running both directions of the rule on one fraction',
          steps: [
            'Now, multiply up: $\\tfrac{3}{4}$ raised by $k = 2$ is $\\tfrac{6}{8}$; by $k = 3$ is $\\tfrac{9}{12}$; by $k = 4$ is $\\tfrac{12}{16}$ — the family from the figure.',
            'So divide down: $\\tfrac{12}{16}$, both parts divided by $2$, gives $\\tfrac{6}{8}$; divided by $4$ gives $\\tfrac{3}{4}$ — the shortest name.',
            'Try the wrong move for contrast: add $1$ to both parts of $\\tfrac{3}{4}$ to get $\\tfrac{4}{5}$ — but $3 \\times 5 = 15 \\ne 16 = 4 \\times 4$, so $\\tfrac{4}{5}$ is a *different* point (it sits between $\\tfrac{3}{4}$ and $1$, the mediant at work).',
            'Hence the rule cuts one way only: multiply or divide both parts by the same nonzero whole number — and the value stays put; add, and it walks.',
          ],
        },
        { kind: 'heading', text: 'Simplification: the atoms return' },
        {
          kind: 'para',
          text: 'Here is the promise Lesson 4.1 made about this lesson: *the atoms of chapter 3 finally return to divide a numerator and a denominator at once*. Chapter 3 taught two ways to find the **HCF** of two numbers — the prime-factorisation route (take every shared prime atom at its lowest power) and Euclid\'s algorithm (divide, take the remainder, repeat). Chapter 4 now puts that tool where it earns the most: a fraction\'s numerator and denominator are two numbers, and their HCF is precisely the largest factor that divides **both** parts at once. Dividing both parts by it is a legal move of the equivalence rule — and it lands on the shortest name in a single stroke.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Lowest terms (simplest form)',
          text: 'A fraction $\\tfrac{n}{d}$ of positive whole numbers is said to be in its **lowest terms** (or **simplest form**) if the only whole number dividing both $n$ and $d$ is $1$ — that is, if $\\mathrm{HCF}(n, d) = 1$. Thus, $\\tfrac{12}{16}$ is *not* in lowest terms ($\\mathrm{HCF}(12,16) = 4$), while $\\tfrac{3}{4}$ is ($\\mathrm{HCF}(3,4) = 1$). Every fraction has exactly one name in lowest terms — the uniqueness is proved as Exercise L6, the moment the cross-multiplication licence is in hand.',
        },
        {
          kind: 'para',
          text: 'Two routes to that name, and the book keeps both. The **stepwise route** divides both parts by any common factor, again and again, until none remains — small divisions, small thinking, several stops. The **one-step route** computes the HCF first and divides by it once. They arrive at the same place, because dividing by $2$ and then by $3$ is dividing by $6$, and the HCF is the product of *all* shared factors. The one-step route is the exam-hall habit to build; the stepwise route is what you fall back on when the HCF will not come to mind.',
        },
        {
          kind: 'example',
          title: 'Simplify 12/16 to its lowest terms',
          steps: [
            'Now, $\\mathrm{HCF}(12, 16)$: the atoms are $12 = 2 \\times 2 \\times 3$ and $16 = 2 \\times 2 \\times 2 \\times 2$, sharing $2 \\times 2$ — so the HCF is $4$.',
            'So divide both parts by $4$: $\\tfrac{12}{16} = \\tfrac{12 \\div 4}{16 \\div 4} = \\tfrac{3}{4}$.',
            'The stepwise route divides by $2$ twice instead: $\\tfrac{12}{16} = \\tfrac{6}{8} = \\tfrac{3}{4}$ — same destination, two stops.',
            'Hence $\\tfrac{12}{16} = \\tfrac{3}{4}$ — the exact pairing Lesson 4.1 left on the desk: same cells of the bar, shortest possible spelling.',
          ],
        },
        {
          kind: 'example',
          title: 'Simplify 84/126 to its lowest terms',
          steps: [
            'Now, the atoms: $84 = 2 \\times 42 = 2 \\times 2 \\times 3 \\times 7$ and $126 = 2 \\times 63 = 2 \\times 3 \\times 3 \\times 7$.',
            'So the shared atoms are $2 \\times 3 \\times 7 = 42$ — $\\mathrm{HCF}(84, 126) = 42$.',
            'So one step: $\\tfrac{84}{126} = \\tfrac{84 \\div 42}{126 \\div 42} = \\tfrac{2}{3}$.',
            'Or stepwise: $\\tfrac{84}{126} = \\tfrac{42}{63}$ (by $2$) $= \\tfrac{14}{21}$ (by $3$) $= \\tfrac{2}{3}$ (by $7$) — three small divisions, one large one, one name.',
            'Hence $\\tfrac{84}{126} = \\tfrac{2}{3}$, and $\\mathrm{HCF}(2, 3) = 1$ confirms the name is lowest.',
          ],
        },
        {
          kind: 'example',
          title: 'Simplify 91/104 — when the shared atom hides',
          steps: [
            'Now, neither $2$, nor $3$, nor $5$ divides both parts — the obvious small primes all fail, and a stepwise hunt would wander.',
            'Euclid\'s algorithm of Lesson 3.3 does not wander: $104 = 1 \\times 91 + 13$, then $91 = 7 \\times 13 + 0$ — the HCF is $13$.',
            'So divide both parts by $13$: $\\tfrac{91}{104} = \\tfrac{91 \\div 13}{104 \\div 13} = \\tfrac{7}{8}$.',
            'Hence $\\tfrac{91}{104} = \\tfrac{7}{8}$ — and the factor view agrees: $91 = 7 \\times 13$, $104 = 8 \\times 13$, one hidden shared atom.',
          ],
        },
        {
          kind: 'para',
          text: 'Why insist on the shortest name? Three reasons, each earning its keep. First, **convention**: every answer key, every mark scheme, every textbook — including this one — states fractions in lowest terms, so an unsimplified answer reads as unfinished work. Second, **economy**: $\\tfrac{2}{3}$ is smaller ink than $\\tfrac{84}{126}$, and every later operation — comparing in 4.3, adding in 4.4 — is faster on small parts. Third, and deepest: the lowest-terms name is the fraction\'s **canonical name** — the one member of the family that all other names point back to, the way a postal address survives every re-spelling of the street. To know a fraction fully is to know its family; to *name* it is to use the member with nothing left to trim.',
        },
        { kind: 'heading', text: 'The cross-multiplication licence, paid in full' },
        {
          kind: 'para',
          text: 'Time to settle the account. In Lesson 4.1 the mediant theorem needed one stated-without-proof rule — the **licence**: for positive fractions, $\\tfrac{a}{b} < \\tfrac{c}{d}$ holds exactly when $ad < bc$. The proof below was honest about the borrowing, and this lesson has already printed the note it was borrowed against: the **equivalence rule**. With it, the licence stops being a loan and becomes a theorem — and the equality direction comes with it: $\\tfrac{a}{b} = \\tfrac{c}{d}$ exactly when $ad = bc$, the two-line test examiners call *cross-multiplication*.',
        },
        {
          kind: 'derivation',
          title: 'The cross-multiplication test',
          statement:
            'For positive whole numbers a, b, c, d with b, d ≠ 0: a/b = c/d ⟺ ad = bc, and a/b < c/d ⟺ ad < bc.',
          steps: [
            {
              label: 'Put both fractions on one common ruler',
              formula: '\\tfrac{a}{b} = \\frac{a \\times d}{b \\times d} = \\tfrac{ad}{bd} \\qquad \\tfrac{c}{d} = \\frac{c \\times b}{d \\times b} = \\tfrac{bc}{bd}',
              explanation:
                'Two applications of the equivalence rule just proved: raise a/b by k = d and c/d by k = b. Both names now count pieces of one single size, 1/(bd) — the whole cut into bd equal parts. No assumption has been made; both raisings are always legal.',
            },
            {
              label: 'Compare counts of equal pieces',
              formula: '\\tfrac{ad}{bd} = \\tfrac{bc}{bd} \\;\\Longleftrightarrow\\; ad = bc \\qquad \\tfrac{ad}{bd} < \\tfrac{bc}{bd} \\;\\Longleftrightarrow\\; ad < bc',
              explanation:
                'Once two amounts are counted in pieces of the same size, comparing the amounts is comparing the counts — Lesson 1.2\'s whole-number order. Equal counts hold the same amount; more pieces of equal size hold more.',
            },
            {
              label: 'Read both directions',
              formula: '\\tfrac{a}{b} = \\tfrac{c}{d} \\;\\Longleftrightarrow\\; ad = bc \\qquad \\tfrac{a}{b} < \\tfrac{c}{d} \\;\\Longleftrightarrow\\; ad < bc',
              explanation:
                'Every step was an equivalence — the raising rule works both ways, and "equal amounts ⟺ equal counts" holds both ways — so the double arrows are earned. The licence of Lesson 4.1 is now proved ground-up, from the cutting of equal pieces and the order of whole numbers.',
            },
          ],
          result:
            'Cross-multiply the outer pair against the inner pair: ad = bc ⟺ the fractions are equal; ad < bc ⟺ the left fraction is smaller (all positive). The mediant proof of Lesson 4.1 stands on proved ground from this page onward.',
        },
        {
          kind: 'figure',
          caption:
            'The proof made visible for 2/3 and 4/6. Raise 2/3 by 6 (the other denominator) to get 12/18; raise 4/6 by 3 to get 12/18. On the 18-piece ruler both names count the same 12 pieces — the dot at the twelfth mark. Cross-multiplication reads the counts: 2 × 6 = 12 and 3 × 4 = 12, equal products, equal fractions.',
          svg: `<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A ruler of 18 equal pieces with the twelfth mark highlighted, labelled 2/3 = 12/18 and 4/6 = 12/18">
  <g font-size="13" fill="currentColor">
    <text x="380" y="26" text-anchor="middle" opacity="0.8">the common ruler: the whole cut into 18 equal pieces</text>
    <line x1="70" y1="80" x2="690" y2="80" stroke="currentColor" stroke-width="1.5"/>
    <g stroke="currentColor" stroke-width="1.5">
      <line x1="70" y1="72" x2="70" y2="88"/>
      <line x1="690" y1="72" x2="690" y2="88"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.55">
      <line x1="104.44" y1="75" x2="104.44" y2="85"/>
      <line x1="138.89" y1="75" x2="138.89" y2="85"/>
      <line x1="173.33" y1="75" x2="173.33" y2="85"/>
      <line x1="207.78" y1="75" x2="207.78" y2="85"/>
      <line x1="242.22" y1="75" x2="242.22" y2="85"/>
      <line x1="276.67" y1="72" x2="276.67" y2="88"/>
      <line x1="311.11" y1="75" x2="311.11" y2="85"/>
      <line x1="345.56" y1="75" x2="345.56" y2="85"/>
      <line x1="380" y1="75" x2="380" y2="85"/>
      <line x1="414.44" y1="75" x2="414.44" y2="85"/>
      <line x1="448.89" y1="75" x2="448.89" y2="85"/>
      <line x1="483.33" y1="72" x2="483.33" y2="88"/>
      <line x1="517.78" y1="75" x2="517.78" y2="85"/>
      <line x1="552.22" y1="75" x2="552.22" y2="85"/>
      <line x1="586.67" y1="75" x2="586.67" y2="85"/>
      <line x1="621.11" y1="75" x2="621.11" y2="85"/>
      <line x1="655.56" y1="75" x2="655.56" y2="85"/>
    </g>
    <g text-anchor="middle" font-size="12" opacity="0.85">
      <text x="276.67" y="106">1/3 = 6/18</text>
      <text x="483.33" y="106" font-weight="700">2/3 = 12/18 = 4/6</text>
    </g>
    <g text-anchor="middle" font-size="15" font-weight="700">
      <text x="70" y="130">0</text>
      <text x="690" y="130">1</text>
    </g>
    <circle cx="483.33" cy="80" r="6" fill="#b45309"/>
    <text x="483.33" y="52" text-anchor="middle" fill="#b45309" font-weight="700">2/3 raised by 6: 12/18</text>
    <text x="483.33" y="166" text-anchor="middle" fill="#b45309" font-weight="700">4/6 raised by 3: 12/18</text>
    <line x1="483.33" y1="58" x2="483.33" y2="72" stroke="#b45309" stroke-width="1.2" opacity="0.7"/>
    <line x1="483.33" y1="152" x2="483.33" y2="88" stroke="#b45309" stroke-width="1.2" opacity="0.7" stroke-dasharray="3 3"/>
    <text x="380" y="194" text-anchor="middle" font-weight="700">cross-products: 2 × 6 = 12 and 3 × 4 = 12 — equal counts of 1/18-pieces</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Run the figure\'s arithmetic once more, because it is the licence in miniature. Raising $\\tfrac{2}{3}$ by $k = 6$ (the *other* denominator) gives $\\tfrac{12}{18}$; raising $\\tfrac{4}{6}$ by $k = 3$ gives $\\tfrac{12}{18}$; one dot on the ruler, two names on the page. The cross-products read the two counts off: $2 \\times 6 = 12$ (numerator of the first times denominator of the second) and $3 \\times 4 = 12$ (denominator of the first times numerator of the second). Equal counts, equal products, equal fractions. The same machinery on the desk-pair $\\tfrac{3}{4}, \\tfrac{12}{16}$ needs the $64$-piece ruler — too fine to draw, not too fine to check: $\\tfrac{3}{4} = \\tfrac{48}{64}$, $\\tfrac{12}{16} = \\tfrac{48}{64}$, and $3 \\times 16 = 48 = 4 \\times 12$. Drawn or checked, the story is one story.',
        },
        {
          kind: 'formula',
          name: 'The cross-multiplication test',
          latex: '\\frac{a}{b} = \\frac{c}{d} \\;\\Longleftrightarrow\\; ad = bc \\qquad \\frac{a}{b} < \\frac{c}{d} \\;\\Longleftrightarrow\\; ad < bc \\qquad (b, d > 0)',
          note: 'Multiply diagonally — numerator of one against denominator of the other. Equal products mean equal fractions; the smaller product sits under the smaller fraction. Two multiplications settle any question of equivalence.',
        },
        {
          kind: 'para',
          text: 'The account is settled. The mediant proof of Lesson 4.1 leaned on the pair $\\tfrac{3}{7} < \\tfrac{4}{9}$ and read it as $3 \\times 9 < 4 \\times 7$ — that is, $27 < 28$ — under a stated licence. That step is now a theorem: the equivalence rule raised both fractions to one $63$-piece ruler ($\\tfrac{27}{63}$ and $\\tfrac{28}{63}$), where the comparison is whole-number counting. Nothing in this unit remains borrowed. And the equality direction is a gift on its own: of all the ways to test "are these two fractions the same point?", none is faster than two diagonal multiplications.',
        },
        {
          kind: 'example',
          title: 'Two equivalence tests by cross-multiplication',
          steps: [
            'Now, test $\\tfrac{9}{12}$ against $\\tfrac{15}{20}$: cross-products $9 \\times 20 = 180$ and $12 \\times 15 = 180$ — equal.',
            'So the fractions are equivalent — both simplify to $\\tfrac{3}{4}$ (HCFs $3$ and $5$), confirming the test\'s verdict.',
            'Test $\\tfrac{9}{12}$ against $\\tfrac{12}{15}$ instead: $9 \\times 15 = 135$ but $12 \\times 12 = 144$ — unequal.',
            'So these are different points: $\\tfrac{12}{15} = \\tfrac{4}{5}$, while $\\tfrac{9}{12} = \\tfrac{3}{4}$ — and $\\tfrac{3}{4} \\ne \\tfrac{4}{5}$ (the additive-trap pair again).',
            'Hence two multiplications settle each question — no simplifying needed first, no common denominator demanded.',
          ],
        },
        { kind: 'heading', text: 'Building fractions on purpose' },
        {
          kind: 'para',
          text: 'Simplification divides a fraction down to its shortest name; the reverse move builds it up to a *chosen* name, and Lessons 4.3 and 4.4 will live on this move. To compare $\\tfrac{3}{4}$ with $\\tfrac{5}{6}$, or to add them, both must be re-spelled on one common ruler — and the equivalence rule says exactly how to reach a target ruler: to raise $\\tfrac{n}{d}$ to denominator $m$, the number $m$ must be a **multiple of** $d$ (a legal finer ruler), the multiplier is $k = m \\div d$, and the raised name is $\\tfrac{n \\times k}{m}$. If $m$ is not a multiple of $d$, no whole multiplier exists — $50$ is not a multiple of $6$ ($50 = 6 \\times 8 + 2$), so $\\tfrac{5}{6}$ cannot be raised to fiftieths; the general tool for picking a *shared* target, the LCM, is Lesson 4.4\'s business.',
        },
        {
          kind: 'example',
          title: 'Raise 3/4 and 5/6 to forty-eighths',
          steps: [
            'Now, $48 \\div 4 = 12$, so $\\tfrac{3}{4} = \\tfrac{3 \\times 12}{4 \\times 12} = \\tfrac{36}{48}$ — raised by $12$.',
            'So $48 \\div 6 = 8$, so $\\tfrac{5}{6} = \\tfrac{5 \\times 8}{6 \\times 8} = \\tfrac{40}{48}$ — raised by $8$.',
            'Check both by the licence: $3 \\times 48 = 144 = 4 \\times 36$ and $5 \\times 48 = 240 = 6 \\times 40$ — every product line agrees.',
            'Hence $\\tfrac{3}{4} = \\tfrac{36}{48}$ and $\\tfrac{5}{6} = \\tfrac{40}{48}$ — two fractions mounted on one $48$-piece ruler, eye to eye on the same page.',
          ],
        },
        {
          kind: 'table',
          caption:
            'The raising registry. The multiplier is always the target divided by the current denominator; the raised form is verified equivalent by cross-multiplication (every row passes the test). The first row is the desk-pair of Lessons 4.1–4.2.',
          head: ['Fraction', 'Target denominator', 'Multiplier (target ÷ d)', 'Raised form'],
          rows: [
            ['$\\tfrac{3}{4}$', '$16$', '$16 \\div 4 = 4$', '$\\tfrac{12}{16}$'],
            ['$\\tfrac{5}{6}$', '$42$', '$42 \\div 6 = 7$', '$\\tfrac{35}{42}$'],
            ['$\\tfrac{7}{12}$', '$60$', '$60 \\div 12 = 5$', '$\\tfrac{35}{60}$'],
            ['$\\tfrac{11}{15}$', '$60$', '$60 \\div 15 = 4$', '$\\tfrac{44}{60}$'],
            ['$\\tfrac{7}{12}$', '$96$', '$96 \\div 12 = 8$', '$\\tfrac{56}{96}$'],
            ['$\\tfrac{5}{8}$', '$96$', '$96 \\div 8 = 12$', '$\\tfrac{60}{96}$'],
          ],
        },
        { kind: 'heading', text: 'Properties of equivalent fractions' },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that equivalence behaves like a well-run postal system: many spellings, one address, one shortest official form. The properties worth carrying forward, each with its verified instance, are these:',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            'Equivalence preserves the point: every member of a family marks the same spot on the line — $\\tfrac{3}{4}$, $\\tfrac{6}{8}$, $\\tfrac{12}{16}$ all stand at $0.75$, and the division $12 \\div 16$ delivers exactly what $3 \\div 4$ delivers.',
            'Multiplying or dividing both parts by the same nonzero whole number never leaves the family; adding the same number to both parts always does — $\\tfrac{3}{4} = \\tfrac{12}{16}$, but $\\tfrac{4}{5}$ is outside looking in.',
            'A family has infinitely many names (the multiplier $k$ knows no bound) but exactly **one** in lowest terms — proved as Exercise L6 once the licence is in hand; for the $\\tfrac{3}{4}$ family that single shortest name is $\\tfrac{3}{4}$ itself.',
            'Equivalent proper fractions stay proper: if $n < d$ then $n \\times k < d \\times k$, so no legal renaming can push a fraction under $1$ over the line — $\\tfrac{3}{4} = \\tfrac{12}{16}$, and still $12 < 16$.',
            'Every later rule gives the same answer whichever name you carry: $\\tfrac{3}{4}$ of $20$ is $15$, and $\\tfrac{12}{16}$ of $20$ is $(12 \\times 20) \\div 16 = 240 \\div 16 = 15$ — the family acts as one.',
          ],
        },
        {
          kind: 'equation',
          latex: '\\frac{n}{d} \\;=\\; \\frac{n \\times k}{d \\times k} \\;=\\; \\frac{n \\div g}{d \\div g} \\qquad \\text{and} \\qquad \\frac{a}{b} = \\frac{c}{d} \\;\\Longleftrightarrow\\; ad = bc',
          note: 'The lesson on two lines. The left equation moves inside a family — raise by any nonzero k, or divide by the HCF g for the shortest name; the right one tests any claimed equivalence with two multiplications.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Same point, shortest name',
          text: 'A fraction is not one notation; it is a **family** of notations wrapped around one number — and Lesson 4.1\'s quiet observation, that $\\tfrac{3}{4}$ and $\\tfrac{12}{16}$ shade the same cells, was a first glimpse of the whole family tree. Simplification does not change anything; it selects. Among infinitely many true spellings, the lowest-terms member is the canonical one — the name a fraction is *known by* — exactly one per fraction, reached in one step through the HCF of chapter 3.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Equivalence in the exam hall',
          text: 'This lesson\'s moves are the quiet labourers of every quantitative paper — SSC, RRB, banking, CUET — usually unseen inside bigger questions. *Direct* items ask "which of the following is equivalent to $\\tfrac{3}{4}$?" (exam-style: one option passes the cross-test, three fail it — exactly this lesson\'s quiz) or "the simplest form of $\\tfrac{96}{144}$ is ___". *Embedded* uses are everywhere: Khattar\'s BODMAS chains on fractions assume you reduce as you go, comparison items in 4.3 expect both fractions raised or reduced before the cross-test, and answer keys accept only lowest terms — an unsimplified $\\tfrac{84}{126}$ costs the mark even when the method was right. The habit to build now: after any fraction arithmetic, run the HCF once and hand in the shortest name; and when a question asks "equivalent or not?", refuse to simplify either side — two diagonal multiplications are faster.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which of these fractions is equivalent to 3/4?',
              options: ['6/9', '12/16', '9/14', '4/5'],
              answer: 1,
              explain:
                'The cross-test against 3/4: 12/16 passes because 12 × 4 = 48 = 16 × 3 (Option 2). 6/9 fails: 6 × 4 = 24 but 9 × 3 = 27 (it is really 2/3). 9/14 fails: 36 ≠ 42. And 4/5 fails: 15 ≠ 16 — it is precisely the additive-trap fraction, 3/4 with 1 added to both parts, which the mediant theorem of Lesson 4.1 parks strictly between 3/4 and 1.',
            },
            {
              q: '36/48 written in lowest terms is —',
              options: ['3/4', '6/8', '9/12', '18/24'],
              answer: 0,
              explain:
                'HCF(36, 48) = 12, and dividing both parts by it gives 36 ÷ 12 = 3, 48 ÷ 12 = 4 — so 3/4 (Option 1). The other three options are all *equivalent names* but not lowest: 18/24 still shares 6, 9/12 shares 3, 6/8 shares 2 — each divides down again to 3/4. "Lowest terms" demands HCF = 1, and only 3/4 qualifies; every member of the family reduces to it.',
            },
            {
              q: 'What multiplier raises 5/6 to forty-seconds (denominator 42)?',
              options: ['6', '7', '8', '36'],
              answer: 1,
              explain:
                'The multiplier is the target divided by the current denominator: 42 ÷ 6 = 7, and 5 × 7 = 35, so 5/6 = 35/42 (Option 2). Option 1 confuses the multiplier with the denominator itself — raising by 6 gives 30/36. Option 3 raises to forty-eighths instead: 40/48 is a different target. Option 4 is the reflex "multiply by the denominator again" — 5/6 = 180/216, far past forty-seconds.',
            },
            {
              q: 'Which pair is NOT equivalent?',
              options: ['2/3 and 10/15', '4/5 and 12/15', '5/6 and 9/11', '7/9 and 21/27'],
              answer: 2,
              explain:
                'Cross-multiply each pair. 2/3 vs 10/15: 2 × 15 = 30 = 3 × 10 — equivalent (raised by 5). 4/5 vs 12/15: 60 = 60 — equivalent (raised by 3). 7/9 vs 21/27: 7 × 27 = 189 = 9 × 21 — equivalent (raised by 3). But 5/6 vs 9/11: 5 × 11 = 55 while 6 × 9 = 54 — off by one, and off by one is enough (Option 3). Both are in lowest terms with no shared atom to build a bridge, so no multiplier can turn one into the other.',
            },
            {
              q: 'Three of these fractions are equivalent to each other. Which one is NOT?',
              options: ['15/20', '18/24', '16/20', '21/28'],
              answer: 2,
              explain:
                'Cross-multiply all three suspects against 3/4: 15/20 passes (15 × 4 = 60 = 20 × 3), 18/24 passes (72 = 72), 21/28 passes (84 = 84) — a family of three. The outsider is 16/20: 16 × 4 = 64 but 20 × 3 = 60 (Option 3) — it is really 4/5, the additive-trap neighbour again. The look of the numbers (all "fifths-ish", all near each other) proves nothing; only the products vote.',
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
                  q: 'Fill in the missing numbers: 2/5 = 4/? = ?/15 = 14/?.',
                  solution: [
                    'Now, $4 \\div 2 = 2$, so the first multiplier is $2$ — and the denominator follows it: $5 \\times 2 = 10$.',
                    'So for $?/15$: the target divided by the old denominator gives the multiplier, $15 \\div 5 = 3$, so the missing numerator is $2 \\times 3 = 6$.',
                    'And $14/?$: the numerator was multiplied $14 \\div 2 = 7$, so the denominator follows, $5 \\times 7 = 35$.',
                    'Hence $\\tfrac{2}{5} = \\tfrac{4}{10} = \\tfrac{6}{15} = \\tfrac{14}{35}$ — three raisings by $2$, $3$ and $7$.',
                  ],
                  answer: '2/5 = 4/10 = 6/15 = 14/35',
                },
                {
                  q: 'Which of these are equivalent to 1/2: 5/10, 7/12, 9/18, 50/100?',
                  solution: [
                    'Cross-multiply each against $\\tfrac{1}{2}$ — two multiplications per suspect.',
                    '$\\tfrac{5}{10}$: $5 \\times 2 = 10 = 10 \\times 1$ — equivalent ✓.',
                    '$\\tfrac{7}{12}$: $7 \\times 2 = 14$ but $12 \\times 1 = 12$ — unequal, so **not** equivalent.',
                    '$\\tfrac{9}{18}$: $9 \\times 2 = 18 = 18 \\times 1$ — equivalent ✓.',
                    '$\\tfrac{50}{100}$: $50 \\times 2 = 100 = 100 \\times 1$ — equivalent ✓ (raised by $50$).',
                    'Hence three of the four pass; $\\tfrac{7}{12}$ is the outsider — a twelfth-based ruler cannot show a half plus one more twelfth ($\\tfrac{7}{12}$ sits just *above* $\\tfrac{1}{2}$).',
                  ],
                  answer: '5/10, 9/18 and 50/100 are equivalent to 1/2; 7/12 is not',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Simplify to lowest terms: (a) 18/24; (b) 45/60; (c) 56/72.',
                  solution: [
                    '(a) $\\mathrm{HCF}(18, 24) = 6$: divide both parts — $18 \\div 6 = 3$, $24 \\div 6 = 4$, so $\\tfrac{3}{4}$.',
                    '(b) $\\mathrm{HCF}(45, 60) = 15$ (atoms $45 = 3 \\times 3 \\times 5$, $60 = 2 \\times 2 \\times 3 \\times 5$, shared $3 \\times 5$): so $\\tfrac{45}{60} = \\tfrac{3}{4}$.',
                    '(c) $\\mathrm{HCF}(56, 72) = 8$ (atoms $56 = 2 \\times 2 \\times 2 \\times 7$, $72 = 2 \\times 2 \\times 2 \\times 3 \\times 3$, shared $2 \\times 2 \\times 2$): so $\\tfrac{56}{72} = \\tfrac{7}{9}$.',
                    'Notice (a) and (b) are equivalent twins — $\\tfrac{18}{24} = \\tfrac{45}{60}$, confirmed by the cross-test: $18 \\times 60 = 1080 = 24 \\times 45$.',
                    'Hence two different fractions, one shared lowest name $\\tfrac{3}{4}$; and $\\tfrac{56}{72} = \\tfrac{7}{9}$ stands alone.',
                  ],
                  answer: '(a) 3/4; (b) 3/4; (c) 7/9',
                },
                {
                  q: 'Simplify 60/84 two ways — stepwise and by the HCF — and confirm both land on the same name.',
                  solution: [
                    'Stepwise, peel small common factors: $\\tfrac{60}{84} = \\tfrac{30}{42}$ (by $2$) $= \\tfrac{15}{21}$ (by $2$ again) $= \\tfrac{5}{7}$ (by $3$).',
                    'One-step: Euclid\'s algorithm finds $\\mathrm{HCF}(60, 84)$ — $84 = 1 \\times 60 + 24$, $60 = 2 \\times 24 + 12$, $24 = 2 \\times 12 + 0$, so the HCF is $12$.',
                    'So divide once: $\\tfrac{60}{84} = \\tfrac{60 \\div 12}{84 \\div 12} = \\tfrac{5}{7}$.',
                    'Hence both routes end at $\\tfrac{5}{7}$ — the stops differ ($2$, then $2$, then $3$; or $12$ once), the destination does not: peeling $2$, $2$ and $3$ *is* dividing by $2 \\times 2 \\times 3 = 12$.',
                  ],
                  answer: '60/84 = 5/7 by both routes',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A recipe calls for 3/8 kg of flour. You double it and write 6/8 kg; a friend rewrites your note as 3/4 kg. Show that all the amounts agree, and say which name is in lowest terms.',
                  solution: [
                    'Doubling is the multiplying rule with $k = 2$: $\\tfrac{3}{8}$ raised gives $\\tfrac{6}{8}$ — the doubled amount, correctly counted on a finer ruler.',
                    'Now, $\\mathrm{HCF}(6, 8) = 2$, so your friend simplified: $\\tfrac{6}{8} = \\tfrac{6 \\div 2}{8 \\div 2} = \\tfrac{3}{4}$.',
                    'Check by the licence: $6 \\times 4 = 24 = 8 \\times 3$ ✓ — $\\tfrac{6}{8}$ and $\\tfrac{3}{4}$ name one amount.',
                    'Hence the recipe needs $\\tfrac{3}{8}$ kg doubled, which is $\\tfrac{6}{8}$ kg $= \\tfrac{3}{4}$ kg — and $\\tfrac{3}{4}$ is the lowest-terms name ($\\mathrm{HCF}(3, 4) = 1$), so your friend\'s note is the one a mark scheme would write.',
                  ],
                  answer: 'the doubled amount is 6/8 kg = 3/4 kg; 3/4 is in lowest terms',
                },
                {
                  q: 'Use cross-multiplication to test: are 14/21 and 18/27 equivalent? Are 14/21 and 16/27?',
                  solution: [
                    'First pair: $14 \\times 27 = 378$ and $21 \\times 18 = 378$ — equal products, so **equivalent**.',
                    'Indeed both reduce to $\\tfrac{2}{3}$: $\\mathrm{HCF}(14, 21) = 7$ and $\\mathrm{HCF}(18, 27) = 9$, and $\\tfrac{14}{21} = \\tfrac{2}{3} = \\tfrac{18}{27}$.',
                    'Second pair: $14 \\times 27 = 378$ but $21 \\times 16 = 336$ — unequal, so **not** equivalent.',
                    'Hence $\\tfrac{14}{21} = \\tfrac{18}{27}$ (twin spellings of $\\tfrac{2}{3}$), while $\\tfrac{14}{21} \\ne \\tfrac{16}{27}$ — $\\tfrac{16}{27}$ is a little short of $\\tfrac{2}{3} = \\tfrac{18}{27}$, two eighteenths short on the $27$-ruler.',
                  ],
                  answer: '14/21 = 18/27; 14/21 ≠ 16/27',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'exam-style: 96/144 arrives mid-way through a simplification chain. Reduce it to lowest terms and verify the reduction by cross-multiplication.',
                  solution: [
                    'Now, the atoms: $96 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 3 = 2^5 \\times 3$ and $144 = 2 \\times 2 \\times 2 \\times 2 \\times 3 \\times 3 = 2^4 \\times 3^2$.',
                    'So the shared atoms, at the lower power each, are $2^4 \\times 3 = 48$ — $\\mathrm{HCF}(96, 144) = 48$.',
                    'So one division: $\\tfrac{96}{144} = \\tfrac{96 \\div 48}{144 \\div 48} = \\tfrac{2}{3}$.',
                    'Check by the licence: $2 \\times 144 = 288$ and $3 \\times 96 = 288$ — equal ✓.',
                    'Hence $\\tfrac{96}{144} = \\tfrac{2}{3}$ — carry the two-part name into the rest of the chain; the numbers ahead stay small enough to trust.',
                  ],
                  answer: '96/144 = 2/3',
                },
                {
                  q: 'exam-style: A student claims 24/36 = 25/37 "because I added 1 to the top and the bottom". Diagnose the error, give the correct simplification, and say where 25/37 actually sits.',
                  solution: [
                    'Diagnosis: equivalence licenses multiplying or dividing both parts by the same nonzero whole number — never adding. The student used an operation the rule never sold.',
                    'The cross-test exposes it: $24 \\times 37 = 888$ but $36 \\times 25 = 900$ — unequal, so the claim is false.',
                    'Correct simplification: $\\mathrm{HCF}(24, 36) = 12$, so $\\tfrac{24}{36} = \\tfrac{2}{3}$.',
                    'Where $\\tfrac{25}{37}$ sits: it is exactly the mediant of $\\tfrac{24}{36}$ and $\\tfrac{1}{1}$, so Lesson 4.1\'s theorem pins it **strictly between** $\\tfrac{2}{3}$ and $1$ — every equal addition creeps towards $1$ without arriving.',
                    'Hence $\\tfrac{24}{36} = \\tfrac{2}{3}$, and $\\tfrac{25}{37}$ is a genuinely different (larger) number — $888 < 900$ is the whole argument in two products.',
                  ],
                  answer: '24/36 = 2/3; 25/37 is not equivalent — it lies strictly between 2/3 and 1',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Raise 7/12 and 5/8 to ninety-sixths, and verify each raise by cross-multiplication.',
                  solution: [
                    'Now, $96 \\div 12 = 8$, so $\\tfrac{7}{12} = \\tfrac{7 \\times 8}{12 \\times 8} = \\tfrac{56}{96}$ — raised by $8$.',
                    'So $96 \\div 8 = 12$, so $\\tfrac{5}{8} = \\tfrac{5 \\times 12}{8 \\times 12} = \\tfrac{60}{96}$ — raised by $12$.',
                    'Check the first by the licence: $7 \\times 96 = 672$ and $12 \\times 56 = 672$ — equal ✓.',
                    'Check the second: $5 \\times 96 = 480$ and $8 \\times 60 = 480$ — equal ✓.',
                    'Hence $\\tfrac{7}{12} = \\tfrac{56}{96}$ and $\\tfrac{5}{8} = \\tfrac{60}{96}$ — two fractions mounted on one $96$-piece ruler, ready for the comparing and adding of Lessons 4.3–4.4.',
                  ],
                  answer: '7/12 = 56/96 and 5/8 = 60/96',
                },
                {
                  q: 'Without trial-dividing by every candidate, decide whether 231/275 is in lowest terms — and if it is not, simplify it.',
                  solution: [
                    'Run Euclid\'s algorithm (Lesson 3.3): $275 = 1 \\times 231 + 44$; $231 = 5 \\times 44 + 11$; $44 = 4 \\times 11 + 0$.',
                    'So $\\mathrm{HCF}(231, 275) = 11$ — not $1$, so the fraction is **not** in lowest terms.',
                    'So divide both parts by the HCF: $231 \\div 11 = 21$ and $275 \\div 11 = 25$.',
                    'Hence $\\tfrac{231}{275} = \\tfrac{21}{25}$ — and $\\mathrm{HCF}(21, 25) = 1$, so this name is lowest. The factor view agrees: $231 = 3 \\times 7 \\times 11$, $275 = 5 \\times 5 \\times 11$ — exactly one shared atom, the $11$ Euclid found.',
                  ],
                  answer: '231/275 = 21/25',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that the lowest-terms name is unique: if a/b = c/d with HCF(a, b) = 1 and HCF(c, d) = 1 (all positive), then a = c and b = d.',
                  solution: [
                    'Licence: $\\tfrac{a}{b} = \\tfrac{c}{d}$ gives $ad = bc$ — proved this lesson.',
                    'Now, take any prime atom $p$ of $a$. From $ad = bc$, $p$ divides the right side $bc$; $p$ cannot divide $b$ (that would contradict $\\mathrm{HCF}(a, b) = 1$), so by Lesson 3.2\'s crossroads lemma — a prime dividing a product divides a factor — $p$ divides $c$.',
                    'So every atom of $a$ (at full multiplicity, chasing each copy the same way) lives inside $c$; the symmetric argument, using $\\mathrm{HCF}(c, d) = 1$, forces every atom of $c$ inside $a$.',
                    'So $a$ and $c$ carry identical atoms: $a = c$.',
                    'Then $ad = bc$ with $a = c$ reads $a \\times d = b \\times a$, and cancelling the nonzero $a$ leaves $d = b$.',
                    'Hence $a = c$ and $b = d$: a fraction\'s lowest-terms name is unique — the canonical member of the family exists and is alone. □',
                  ],
                  answer: 'a = c and b = d — the lowest-terms name is unique',
                },
                {
                  q: 'The mediant machine meets equivalence: 1/2 and 2/4 name the same point, yet their mediant (1+2)/(2+4) = 3/6 names it too. Prove that the mediant of any two equivalent fractions is equivalent to them, and conclude what the family of a fraction can never escape.',
                  solution: [
                    'Write the two equivalent names in the multiplying rule\'s form: $\\tfrac{a}{b}$ and $\\tfrac{ka}{kb}$ for some nonzero whole $k$.',
                    'Their mediant is $\\tfrac{a + ka}{b + kb}$ — numerators added, denominators added, exactly as Lesson 4.1 defined it.',
                    'Now, factor each part: $a + ka = a(1 + k)$ and $b + kb = b(1 + k)$, so the mediant is $\\tfrac{a(1+k)}{b(1+k)}$ — which is $\\tfrac{a}{b}$ raised by the multiplier $1 + k$.',
                    'That is the multiplying rule again: the mediant is equivalent to both parents. Instances: mediant$(\\tfrac{1}{2}, \\tfrac{2}{4}) = \\tfrac{3}{6} = \\tfrac{1}{2}$ ✓ and mediant$(\\tfrac{1}{2}, \\tfrac{9}{18}) = \\tfrac{10}{20} = \\tfrac{1}{2}$ ✓.',
                    'Hence the family is **closed under the mediant**: run Lesson 4.1\'s density machine on two names of one point forever — feed each output back in — and it never leaves that point. One address, endlessly re-spelled: the family multiplies its names without ever multiplying its territory.',
                  ],
                  answer: 'the mediant of equivalent fractions is equivalent to them — the family never escapes its own point',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The family is tamed. Equivalent fractions are one amount wearing many rulers; the multiplying rule moves legally inside the family, the HCF finds its shortest member, the cross-multiplication test — the licence of Lesson 4.1, now paid — decides any dispute in two multiplications, and the raising move aims fractions at any legal target ruler. One engine still runs on borrowed time: everything here compared or equated fractions, but never *ordered* them on the open line — the full art of saying which of two unlike fractions is larger, with the common-denominator engine that does it mechanically, is Lesson 4.3\'s work.',
        },
      ],
    },
  ],
  plannedLessons: [
    'Comparing Fractions',
    'Adding and Subtracting Fractions',
    'Multiplying and Dividing Fractions',
  ],
}
