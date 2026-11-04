import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 4: Fractions
 *
 * LESSONS WRITTEN (UNIT 4 COMPLETE): 4.1 The Idea of a Fraction; 4.2
 * Equivalent Fractions and Simplification (the equivalence family, the
 * multiplying rule, HCF simplification, the cross-multiplication licence,
 * raising to higher terms, uniqueness of the lowest-terms name); 4.3
 * Comparing Fractions (the comparison engines, the cross-multiplication
 * verdict machine, the common-denominator method, benchmark halves,
 * completing the whole, wholes-first rule); 4.4 Adding and Subtracting
 * Fractions (like-ruler counting, the LCM as standard equipment,
 * subtraction as gap-naming, mixed-number regrouping, Egyptian two-term
 * openings, the straight-across fraud theorem); 4.5 Multiplying and
 * Dividing Fractions (multiplication as 'of' and the re-cutting reading,
 * the multiplying rule proved from the rulers, multiplication as scaling,
 * cross-cancellation, the reciprocal and the division theorem proved on
 * the bd-ruler, the HCF/LCM-of-fractions shortcuts banked since 4.1 and
 * cashed here, mixed numbers converted before operating — the chapter
 * closes with all four operations living on the fraction line).
 * Unit 4 of the unit-by-unit cadence (2026-11-03, one lesson per hourly
 * run). References: Khattar, Quantitative Aptitude for Competitive
 * Examinations (4e) ch. 1 "Numbers" (fraction exam items; the ch. 2
 * HCF/LCM-of-fractions rules banked since run 12) + NCERT Class 7 ch. 2
 * "Fractions and Decimals" §2.1–2.2 (multiplication of fractions, the
 * reciprocal, division of fractions — web-checked 2026-11-04; the class-6
 * fraction chapter stops at addition/subtraction) — see
 * docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-4.ts
 * (330 checks; sections AI–AN for this lesson) BEFORE writing.
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
  status: 'complete',
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
          text: 'Whole numbers $n$ (the numerator) and $d$ (the denominator) are said to form the **fraction** $\\frac{n}{d}$ when it is the number made of $n$ copies of the part $\\frac{1}{d}$ — the part you get by cutting a unit into $d$ **equal** pieces. The denominator is never $0$: Lesson 2.4 bricked that door shut when it showed that division by zero has no consistent answer at all. Thus, the two requirements are load-bearing — **equal** parts (five unequal scraps of a chapati are not "five sixths" of anything) and **$d \\ne 0$** (a cut into zero pieces is no cut at all) — and when both hold, the name $\\frac{n}{d}$ is earned.',
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
          text: 'The division face immediately pays rent: it powers the phrase that fills exam papers — *a fraction of a quantity*. "$\\tfrac{3}{4}$ of Rs $20$" means: perform the sharing behind the words. Split $20$ into $4$ equal shares ($20 \\div 4 = 5$), then take $3$ of them ($3 \\times 5 = 15$). The part–whole reading and the division reading are the same machine, so either route lands on the same number.',
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
    {
      id: 'fm-comparing-fractions',
      number: '4.3',
      title: 'Comparing Fractions',
      concepts: [
        'Same-denominator comparison',
        'Same-numerator comparison',
        'Unit fractions shrink as denominators grow',
        'Cross-multiplication test',
        'Common denominators',
        'Benchmarks: 0, 1/2 and 1',
        'Comparing mixed numbers',
        'Ordering three or more fractions',
      ],
      objectives: [
        'Decide which of two fractions with the same denominator or the same numerator is larger, and justify the verdict in terms of piece size and count',
        'Compare any two positive fractions with the cross-multiplication test — two multiplications — and say why the products decide, on the common bd-ruler',
        'Raise any set of fractions to one common ruler (the product of denominators or the LCM) and arrange them in ascending or descending order',
        'Use the anchors 0, 1/2 and 1, the completing-the-whole view, and the wholes-first rule to compare mixed numbers and exam-style lists quickly',
      ],
      prerequisites: [
        'fm-idea-of-a-fraction',
        'fm-equivalent-fractions-simplification',
        'fm-comparing-ordering-numbers',
        'fm-lowest-common-multiple',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch7'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.2 ended with one engine still running on borrowed time. Everything in that lesson compared fractions for *equality* — the cross-multiplication test was proved for $=$ and for $<$ together, but every use it was put to asked only "are these two names of one point?" The richer question went unanswered: given two genuinely different fractions — different points, not different spellings — **which is larger, and by what right?** This lesson answers it. The question is not a formality. Comparing is the fraction skill the exam hall demands most often, and the one daily life asks for whenever two recipes, two discounts, two fuel consumptions must be ranked.',
        },
        {
          kind: 'para',
          text: 'One proviso comes before any comparing. "Which is larger, $\\tfrac{3}{4}$ or $\\tfrac{2}{3}$?" is a complete question only when both fractions speak of the *same whole* — the same chapati, the same litre, the same strip. Three quarters of a large chapati is more bread than two thirds of a small one, and no fraction rule will say otherwise, because there is nothing to decide: the wholes differ. The number line of Lesson 4.1 dissolves the worry. Every fraction is a **point** on one universal line — one infinite whole, marked off in pieces of every size — and for two points "larger" has an exact meaning: the point that sits further to the right. From here on, every comparison is a question about positions on the line, and every method in this lesson is a way of locating the two points precisely enough for their order to show.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Same whole, or no question',
          text: 'Comparing $\\tfrac{a}{b}$ with $\\tfrac{c}{d}$ silently assumes both are measured against the same whole. On the number line this is automatic — there is only one line. In the world of chapatis and litres it is a real condition: check the wholes match before trusting any verdict, cross-multiplied or otherwise.',
        },
        { kind: 'heading', text: 'Two easy cases: a ruler already shared' },
        {
          kind: 'para',
          text: 'Two situations need no new machinery at all — the whole-number order of Lesson 1.2 decides them directly. The first: fractions with the **same denominator**. $\\tfrac{5}{9}$ and $\\tfrac{7}{9}$ are counts of pieces of one size — five ninths, seven ninths — and comparing counts of equal pieces is exactly what whole-number order was built for. Five ninths fills five cells of the ninth-ruler; seven ninths fills seven of the very same cells; seven cells hold more than five. The larger numerator wins, and nothing else is consulted.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The same-denominator rule',
          text: 'Fractions with the same positive denominator are ordered by their numerators: for whole numbers $n < m$, $\\tfrac{n}{d} < \\tfrac{m}{d}$. Thus, $\\tfrac{5}{9} < \\tfrac{7}{9}$ and $\\tfrac{3}{16} < \\tfrac{11}{16}$ — equal pieces, so the count decides. On the number line: same ruler, more cells shaded, the point sits further right.',
        },
        {
          kind: 'para',
          text: 'For example, the same-denominator rule settles a whole run of comparisons at a glance:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\tfrac{5}{9} < \\tfrac{7}{9}$ — nine pieces each, seven is the bigger count;',
            '$\\tfrac{3}{16} < \\tfrac{11}{16}$ — and the gap is eight sixteenths, read straight off the counts;',
            '$\\tfrac{6}{6} = \\tfrac{13}{13}$ — both fill their ruler completely: each is the whole, the point $1$.',
          ],
        },
        {
          kind: 'para',
          text: 'The second easy case: fractions with the **same numerator**. Now the count is fixed and the *piece size* varies. $\\tfrac{5}{8}$ and $\\tfrac{5}{11}$ both hold five pieces; but eighths are cut from a coarser ruler than elevenths — an eighth is a larger piece than an eleventh — so five eighths hold more than five elevenths. **Same count, finer cut, smaller holding.** The rule inverts the whole-number reflex: with numerators equal, the *smaller* denominator names the larger fraction.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The same-numerator rule',
          text: 'Fractions with the same positive numerator are ordered inversely by their denominators: for whole numbers $b < c$, $\\tfrac{a}{b} > \\tfrac{a}{c}$. Thus, $\\tfrac{5}{8} > \\tfrac{5}{11}$ — the same five pieces, but eighths outsize elevenths. The licence proves it in one line (Exercise L6): $\\tfrac{a}{b} > \\tfrac{a}{c}$ holds exactly when $a \\times c > b \\times a$, that is, when $c > b$.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The inversion trap',
          text: 'Everything in whole-number land primed you to read "bigger number, bigger thing" — and the same-numerator rule breaks that habit on purpose: $\\tfrac{4}{11} < \\tfrac{4}{7}$ even though $11 > 7$. The denominator grew, the *pieces* shrank, and four shrunken pieces hold less. The reflex fails hardest on unit fractions: $\\tfrac{1}{100}$ is the *smallest* fraction in this paragraph although $100$ is the biggest number in it. When numerators match, read the denominators backwards.',
        },
        {
          kind: 'para',
          text: 'The unit fractions — numerators fixed at $1$, the pure piece sizes — are the same-numerator case in its cleanest form, and they tidy up an observation Lesson 4.1 made in passing. Piece size falls as the denominator rises: $\\tfrac{1}{2} > \\tfrac{1}{3} > \\tfrac{1}{4} > \\cdots$, a ladder that steps down forever without reaching $0$. Halving a piece keeps it positive; there is no smallest piece, only ever a smaller one — the first whisper of the density Lesson 4.1 proved, heard this time in the vocabulary of piece size.',
        },
        {
          kind: 'example',
          title: 'Arrange 1/2, 1/5, 1/8 and 1/3 in ascending order',
          steps: [
            'Now, all four fractions share the numerator $1$ — they are four pure piece sizes, one from each of the rulers for $2$, $5$, $8$ and $3$.',
            'So the same-numerator rule orders them by their denominators, read backwards: the largest denominator cuts the finest pieces and holds the least.',
            'The denominators in decreasing order are $8$, $5$, $3$, $2$ — so the fractions in increasing order are $\\tfrac{1}{8}$, $\\tfrac{1}{5}$, $\\tfrac{1}{3}$, $\\tfrac{1}{2}$.',
            'Hence $\\tfrac{1}{8} < \\tfrac{1}{5} < \\tfrac{1}{3} < \\tfrac{1}{2}$ — no products computed, no rulers raised: one rule, read in the right direction.',
          ],
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Cross-multiplication test',
              def: 'The two-multiplication comparison of a/b with c/d: compute ad and bc and let the whole-number products vote (ad = bc means equal; ad < bc means a/b < c/d). Proved in Lesson 4.2 by raising both fractions to the common bd-ruler.',
            },
            {
              term: 'Common denominator',
              def: 'A denominator shared by several fractions after raising — any common multiple of their denominators (the product bd always works; the smallest is the LCM). Fractions on a common denominator are counts of equal pieces, so whole-number order compares them.',
            },
            {
              term: 'Benchmark',
              def: 'A reference fraction used to sort comparisons before any products are computed — 0, 1/2 and 1 above all. A fraction clears 1/2 exactly when twice its numerator exceeds its denominator (2n > d).',
            },
            {
              term: 'Completing the whole',
              def: 'Comparing fractions just under 1 by their missing pieces: 7/8 is missing 1/8, 8/9 is missing 1/9; the smaller hole holds more, so 8/9 > 7/8.',
            },
            {
              term: 'Ascending order',
              def: 'An arrangement of fractions from smallest to largest (descending: largest to smallest). Built by raising the whole list to one common ruler and sorting the counts, or by the easy rules when numerators or denominators are shared.',
            },
            {
              term: 'Wholes-first rule',
              def: 'Mixed numbers are compared by whole parts first; only on a tie do the fractional parts face off, with the engines of comparison. 4 1/8 > 3 9/10 instantly; 3 2/5 vs 3 3/8 goes to the fractions (2/5 > 3/8).',
            },
          ],
        },
        { kind: 'heading', text: 'Unlike rulers: the cross-multiplication engine' },
        {
          kind: 'para',
          text: 'Remove the coincidences — different numerators *and* different denominators — and the easy cases fall silent. Is $\\tfrac{3}{4}$ more or less than $\\tfrac{4}{5}$? The pieces differ (quarters against fifths) and the counts differ (three against four), so no single glance decides. This is precisely the situation the licence of Lesson 4.2 was proved for, and the proof now becomes the working tool: raise both fractions to the common $bd$-ruler — $\\tfrac{a}{b}$ becomes $\\tfrac{ad}{bd}$ and $\\tfrac{c}{d}$ becomes $\\tfrac{bc}{bd}$ — where they are counts of equal pieces, and whole-number order reads the verdict off the two products. Two multiplications, one comparison of whole numbers: the **cross-multiplication test**.',
        },
        {
          kind: 'formula',
          name: 'The cross-multiplication test',
          latex: '\\frac{a}{b} \\;\\text{vs}\\; \\frac{c}{d} \\qquad\\Longleftrightarrow\\qquad ad \\;\\text{vs}\\; bc \\qquad (b, d > 0)',
          note: 'Multiply across the suspected pair — numerator of the first by denominator of the second, and vice versa — and let the whole-number products vote: ad = bc means equal, ad < bc means a/b < c/d, ad > bc means a/b > c/d. Proved in Lesson 4.2 on the common bd-ruler.',
        },
        {
          kind: 'para',
          text: 'The picture behind the products deserves one slow look, because the test is often memorised without it. The product $ad$ is not an accident of notation: it is the *count* of $bd$-pieces that $\\tfrac{a}{b}$ holds after raising. The test is the common-ruler method with the bookkeeping suppressed — the raising never written down, only its two counts kept. Keeping the picture in view explains the test\'s fine print: it compares products of parts, so it is a **verdict machine, not a transformation** — nothing has been done to either fraction — and it needs positive denominators, which is automatic in this book\'s whole-number world.',
        },
        {
          kind: 'example',
          title: 'Compare 3/4 and 4/5',
          steps: [
            'Now, cross-multiply the pair: $3 \\times 5 = 15$ and $4 \\times 4 = 16$.',
            'So $15 < 16$, and the licence reads the verdict directly: $\\tfrac{3}{4} < \\tfrac{4}{5}$.',
            'Check it on the common $20$-ruler the products came from: $\\tfrac{3}{4} = \\tfrac{15}{20}$ and $\\tfrac{4}{5} = \\tfrac{16}{20}$ — fifteen cells against sixteen, the same story the products told.',
            'Hence $\\tfrac{4}{5}$ is the larger — and Lesson 4.2\'s additive-trap callout now reads as a comparison: $\\tfrac{4}{5}$, the "add $1$ to both" fraud, is not merely *different* from $\\tfrac{3}{4}$, it sits strictly *above* it on the way to $1$, exactly where the mediant theorem parked it.',
          ],
        },
        {
          kind: 'example',
          title: 'Compare 7/12 and 5/8 — the Lesson 4.2 exercise, answered',
          steps: [
            'Now, Lesson 4.2 left this pair mounted on one $96$-piece ruler ($\\tfrac{7}{12} = \\tfrac{56}{96}$, $\\tfrac{5}{8} = \\tfrac{60}{96}$) and promised the verdict in this lesson; the cross-test pays without the ruler.',
            'So cross-multiply: $7 \\times 8 = 56$ and $12 \\times 5 = 60$.',
            'So $56 < 60$, hence $\\tfrac{7}{12} < \\tfrac{5}{8}$ — the products are exactly the two raised counts, with the ruler itself suppressed.',
            'Hence $\\tfrac{5}{8}$ is larger, by $\\tfrac{4}{96} = \\tfrac{1}{24}$ — the debt from Lesson 4.2\'s exercise settled, gap and all.',
          ],
        },
        { kind: 'heading', text: 'The common-denominator method' },
        {
          kind: 'para',
          text: 'The cross-test answers two-fraction questions in two multiplications, but its honest parent — raising both fractions to a **common denominator** and counting — deserves its own section, for two reasons. First, seeing the method explicitly is seeing *why* the test works: the products $ad$ and $bc$ are the raised counts. Second, and practically: a common ruler serves a whole *list* of fractions at once, where pairwise cross-tests would multiply into a tournament. The raising move is Lesson 4.2\'s, used today exactly as that lesson advertised: "the move that powers common denominators."',
        },
        {
          kind: 'para',
          text: 'Which common ruler? Any common multiple of the denominators is legal — a ruler into $b \\times d$ pieces always exists, and so does one into any common multiple. The *smallest* legal ruler is the LCM of the denominators (Lesson 3.4), and it keeps the numbers pleasant; but for verdicts, legality is all that matters, and a bigger ruler answers the same question with bigger counts. Lesson 4.4 will promote the LCM to the standard tool for addition; today, any legal ruler is welcome.',
        },
        {
          kind: 'example',
          title: 'Re-measure 7/12 and 5/8 in twenty-fourths',
          steps: [
            'Now, find a common multiple of the denominators: $24 = 12 \\times 2 = 8 \\times 3$ — a legal ruler, and smaller than the product $96$.',
            'So raise each fraction by its own multiplier: $\\tfrac{7}{12} = \\tfrac{7 \\times 2}{12 \\times 2} = \\tfrac{14}{24}$ and $\\tfrac{5}{8} = \\tfrac{5 \\times 3}{8 \\times 3} = \\tfrac{15}{24}$.',
            'Now both are counts of twenty-fourths: $14 < 15$, so $\\tfrac{7}{12} < \\tfrac{5}{8}$ — the cross-test\'s verdict again, this time with the ruler on display.',
            'Hence the gap is exactly $\\tfrac{15}{24} - \\tfrac{14}{24} = \\tfrac{1}{24}$: one extra twenty-fourth holds the entire difference. Turning such observations into a systematic arithmetic of fractions is Lesson 4.4\'s opening business; today, the count already told the story.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The common ruler decides. The same strip is measured as 7/12 and as 5/8 on their own rulers (top), then both amounts are re-measured in twenty-fourths (below): 7/12 = 14/24 and 5/8 = 15/24. Fourteen shaded cells against fifteen — the single extra twenty-fourth (highlighted) is the whole verdict, 5/8 > 7/12, visible without a single product.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bars showing 7/12 and 5/8, then both re-measured on 24-cell rulers as 14/24 and 15/24 with one extra cell highlighted">
  <g font-size="13" fill="currentColor">
    <text x="70" y="34">cut into 12 equal pieces — 7 shaded: 7/12</text>
    <rect x="70" y="44" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="44" width="51.67" height="44"/>
      <rect x="121.67" y="44" width="51.67" height="44"/>
      <rect x="173.33" y="44" width="51.67" height="44"/>
      <rect x="225" y="44" width="51.67" height="44"/>
      <rect x="276.67" y="44" width="51.67" height="44"/>
      <rect x="328.33" y="44" width="51.67" height="44"/>
      <rect x="380" y="44" width="51.67" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="121.67" y1="44" x2="121.67" y2="88"/>
      <line x1="173.33" y1="44" x2="173.33" y2="88"/>
      <line x1="225" y1="44" x2="225" y2="88"/>
      <line x1="276.67" y1="44" x2="276.67" y2="88"/>
      <line x1="328.33" y1="44" x2="328.33" y2="88"/>
      <line x1="380" y1="44" x2="380" y2="88"/>
      <line x1="431.67" y1="44" x2="431.67" y2="88"/>
      <line x1="483.33" y1="44" x2="483.33" y2="88"/>
      <line x1="535" y1="44" x2="535" y2="88"/>
      <line x1="586.67" y1="44" x2="586.67" y2="88"/>
      <line x1="638.33" y1="44" x2="638.33" y2="88"/>
    </g>
    <text x="706" y="71" font-weight="700">7/12</text>
    <text x="70" y="122">cut into 8 equal pieces — 5 shaded: 5/8</text>
    <rect x="70" y="132" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="132" width="77.5" height="44"/>
      <rect x="147.5" y="132" width="77.5" height="44"/>
      <rect x="225" y="132" width="77.5" height="44"/>
      <rect x="302.5" y="132" width="77.5" height="44"/>
      <rect x="380" y="132" width="77.5" height="44"/>
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
    <text x="706" y="159" font-weight="700">5/8</text>
    <text x="70" y="210">raised to the 24-ruler: 7/12 = 14/24</text>
    <rect x="70" y="220" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="220" width="25.83" height="44"/>
      <rect x="95.83" y="220" width="25.83" height="44"/>
      <rect x="121.67" y="220" width="25.83" height="44"/>
      <rect x="147.5" y="220" width="25.83" height="44"/>
      <rect x="173.33" y="220" width="25.83" height="44"/>
      <rect x="199.17" y="220" width="25.83" height="44"/>
      <rect x="225" y="220" width="25.83" height="44"/>
      <rect x="250.83" y="220" width="25.83" height="44"/>
      <rect x="276.67" y="220" width="25.83" height="44"/>
      <rect x="302.5" y="220" width="25.83" height="44"/>
      <rect x="328.33" y="220" width="25.83" height="44"/>
      <rect x="354.17" y="220" width="25.83" height="44"/>
      <rect x="380" y="220" width="25.83" height="44"/>
      <rect x="405.83" y="220" width="25.83" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.5">
      <line x1="95.83" y1="220" x2="95.83" y2="264"/>
      <line x1="121.67" y1="220" x2="121.67" y2="264"/>
      <line x1="147.5" y1="220" x2="147.5" y2="264"/>
      <line x1="173.33" y1="220" x2="173.33" y2="264"/>
      <line x1="199.17" y1="220" x2="199.17" y2="264"/>
      <line x1="225" y1="220" x2="225" y2="264"/>
      <line x1="250.83" y1="220" x2="250.83" y2="264"/>
      <line x1="276.67" y1="220" x2="276.67" y2="264"/>
      <line x1="302.5" y1="220" x2="302.5" y2="264"/>
      <line x1="328.33" y1="220" x2="328.33" y2="264"/>
      <line x1="354.17" y1="220" x2="354.17" y2="264"/>
      <line x1="380" y1="220" x2="380" y2="264"/>
      <line x1="405.83" y1="220" x2="405.83" y2="264"/>
      <line x1="431.67" y1="220" x2="431.67" y2="264"/>
      <line x1="457.5" y1="220" x2="457.5" y2="264"/>
      <line x1="483.33" y1="220" x2="483.33" y2="264"/>
      <line x1="509.17" y1="220" x2="509.17" y2="264"/>
      <line x1="535" y1="220" x2="535" y2="264"/>
      <line x1="560.83" y1="220" x2="560.83" y2="264"/>
      <line x1="586.67" y1="220" x2="586.67" y2="264"/>
      <line x1="612.5" y1="220" x2="612.5" y2="264"/>
      <line x1="638.33" y1="220" x2="638.33" y2="264"/>
      <line x1="664.17" y1="220" x2="664.17" y2="264"/>
    </g>
    <text x="706" y="247" font-weight="700">14/24</text>
    <text x="70" y="298">raised to the 24-ruler: 5/8 = 15/24</text>
    <rect x="70" y="308" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="308" width="25.83" height="44"/>
      <rect x="95.83" y="308" width="25.83" height="44"/>
      <rect x="121.67" y="308" width="25.83" height="44"/>
      <rect x="147.5" y="308" width="25.83" height="44"/>
      <rect x="173.33" y="308" width="25.83" height="44"/>
      <rect x="199.17" y="308" width="25.83" height="44"/>
      <rect x="225" y="308" width="25.83" height="44"/>
      <rect x="250.83" y="308" width="25.83" height="44"/>
      <rect x="276.67" y="308" width="25.83" height="44"/>
      <rect x="302.5" y="308" width="25.83" height="44"/>
      <rect x="328.33" y="308" width="25.83" height="44"/>
      <rect x="354.17" y="308" width="25.83" height="44"/>
      <rect x="380" y="308" width="25.83" height="44"/>
      <rect x="405.83" y="308" width="25.83" height="44"/>
      <rect x="431.67" y="308" width="25.83" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.5">
      <line x1="95.83" y1="308" x2="95.83" y2="352"/>
      <line x1="121.67" y1="308" x2="121.67" y2="352"/>
      <line x1="147.5" y1="308" x2="147.5" y2="352"/>
      <line x1="173.33" y1="308" x2="173.33" y2="352"/>
      <line x1="199.17" y1="308" x2="199.17" y2="352"/>
      <line x1="225" y1="308" x2="225" y2="352"/>
      <line x1="250.83" y1="308" x2="250.83" y2="352"/>
      <line x1="276.67" y1="308" x2="276.67" y2="352"/>
      <line x1="302.5" y1="308" x2="302.5" y2="352"/>
      <line x1="328.33" y1="308" x2="328.33" y2="352"/>
      <line x1="354.17" y1="308" x2="354.17" y2="352"/>
      <line x1="380" y1="308" x2="380" y2="352"/>
      <line x1="405.83" y1="308" x2="405.83" y2="352"/>
      <line x1="431.67" y1="308" x2="431.67" y2="352"/>
      <line x1="457.5" y1="308" x2="457.5" y2="352"/>
      <line x1="483.33" y1="308" x2="483.33" y2="352"/>
      <line x1="509.17" y1="308" x2="509.17" y2="352"/>
      <line x1="535" y1="308" x2="535" y2="352"/>
      <line x1="560.83" y1="308" x2="560.83" y2="352"/>
      <line x1="586.67" y1="308" x2="586.67" y2="352"/>
      <line x1="612.5" y1="308" x2="612.5" y2="352"/>
      <line x1="638.33" y1="308" x2="638.33" y2="352"/>
      <line x1="664.17" y1="308" x2="664.17" y2="352"/>
    </g>
    <text x="706" y="335" font-weight="700">15/24</text>
  <line x1="431.67" y1="214" x2="431.67" y2="358" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
  <line x1="457.5" y1="214" x2="457.5" y2="358" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
  <rect x="431.67" y="308" width="25.83" height="44" fill="#b45309" opacity="0.45"/>
  <text x="380" y="385" text-anchor="middle" font-weight="700">the single extra twenty-fourth decides: 5/8 &gt; 7/12</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Ordering three or more: the exam workhorse' },
        {
          kind: 'para',
          text: 'Exam papers rarely compare two fractions; they order three, or five, and ask for the largest. Pairwise cross-tests work but waste effort — three fractions already mean three pairs, five would mean ten. The common ruler answers every order at once: raise the whole list to one ruler, and the original question becomes whole-number sorting.',
        },
        {
          kind: 'example',
          title: 'Which is the largest: 2/3, 4/5 or 7/11?',
          steps: [
            'Now, this is the item Lesson 4.1\'s exam corner banked for this lesson — an SSC Multi-Tasking Staff 2017 question (from Khattar\'s chapter 1 drill set) — and the debt comes due here.',
            'So find a common ruler: $165 = 3 \\times 5 \\times 11$ is a multiple of all three denominators.',
            'So raise each fraction: $\\tfrac{2}{3} = \\tfrac{110}{165}$ (by $55$), $\\tfrac{4}{5} = \\tfrac{132}{165}$ (by $33$), $\\tfrac{7}{11} = \\tfrac{105}{165}$ (by $15$).',
            'Now read the counts: $105 < 110 < 132$, hence $\\tfrac{7}{11} < \\tfrac{2}{3} < \\tfrac{4}{5}$.',
            'Hence $\\tfrac{4}{5}$ is the largest — the banked item settled by one ruler and three raisings, no pair tested twice.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The banked item, read off the line. Between the half and the whole, 7/11 sits just above the halfway mark, 2/3 a shade further right, and 4/5 well clear of both: the ascending order 7/11 < 2/3 < 4/5 is visible as left-to-right position before any product is computed. Zooming the line is honest — only the order of the marked points matters.',
          svg: `<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 1/2 to 1 with 7/11 just above the half, 2/3 a shade further right and 4/5 well clear">
  <g font-size="13" fill="currentColor">
  <line x1="40" y1="130" x2="720" y2="130" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 720 130 l -9 -4 v 8 z" fill="currentColor"/>
  <line x1="70" y1="122" x2="70" y2="138" stroke="currentColor" stroke-width="1.5"/>
  <text x="70" y="162" text-anchor="middle" font-weight="700">1/2</text>
  <line x1="239.09" y1="122" x2="239.09" y2="138" stroke="currentColor" stroke-width="1.5"/>
  <text x="239.09" y="104" text-anchor="middle" font-weight="700">7/11</text>
  <line x1="276.67" y1="122" x2="276.67" y2="138" stroke="currentColor" stroke-width="1.5"/>
  <text x="276.67" y="162" text-anchor="middle" font-weight="700">2/3</text>
  <line x1="442" y1="122" x2="442" y2="138" stroke="currentColor" stroke-width="1.5"/>
  <text x="442" y="104" text-anchor="middle" font-weight="700">4/5</text>
  <line x1="690" y1="122" x2="690" y2="138" stroke="currentColor" stroke-width="1.5"/>
  <text x="690" y="162" text-anchor="middle" font-weight="700">1</text>
  <text x="380" y="190" text-anchor="middle" font-weight="700">between the half and the whole: 7/11 &lt; 2/3 &lt; 4/5</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Before building any big ruler, two free checks often shrink the job. The first is the **benchmark $\\tfrac{1}{2}$**: a fraction clears the half exactly when its numerator is more than half its denominator — $2n > d$ — a comparison needing no multiplication at all. Sorting a list into below-half and above-half piles can settle a "which is largest" item outright, or leave only the top pile to be ranked.',
        },
        {
          kind: 'example',
          title: 'Find the largest of 2/5, 3/7 and 5/9 — benchmarks first',
          steps: [
            'Now, test each fraction against the half by doubling its numerator: $2 \\times 2 = 4 < 5$ (below), $2 \\times 3 = 6 < 7$ (below), $2 \\times 5 = 10 > 9$ (above).',
            'So $\\tfrac{5}{9}$ alone clears the half — it is larger than both competitors immediately, and no products have been needed.',
            'The below-half pair still needs one cross-test for the full ascending order: $2 \\times 7 = 14 < 15 = 3 \\times 5$, so $\\tfrac{2}{5} < \\tfrac{3}{7}$.',
            'Hence $\\tfrac{2}{5} < \\tfrac{3}{7} < \\tfrac{5}{9}$ — the benchmark did the sorting, and one small cross-test finished the tail.',
          ],
        },
        {
          kind: 'para',
          text: 'A second free check applies when a list shares its numerator: the same-numerator rule sorts the whole list in one stroke, denominators read backwards. Arranging $\\tfrac{2}{3}, \\tfrac{2}{5}, \\tfrac{2}{7}$ in descending order needs no machinery at all: $3 < 5 < 7$, so $\\tfrac{2}{3} > \\tfrac{2}{5} > \\tfrac{2}{7}$. Exam lists are built from these shapes — shared numerators, shared denominators, benchmark-clearing stragglers — and the habit of scanning for the shape before computing is worth marks every time.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Comparison in the exam hall',
          text: 'The largest-fraction MCQ is a fixture of every quantitative paper, and the shapes repeat. (i) *Shared numerator*: the order runs opposite to the denominators — instant. (ii) *Stragglers around $\\tfrac{1}{2}$*: benchmark first, products only for the survivors. (iii) *Genuine unlike rulers*: one common ruler — the LCM if it is visible, the product if not — and the counts sort everything in a single pass. The decimals route ("$\\tfrac{4}{5} = 0.8$, $\\tfrac{2}{3} \\approx 0.67$, $\\tfrac{7}{11} \\approx 0.64$") gives the same verdict and becomes systematic in chapter 5 — but the fraction engines above need no decimal tables and never round. Practise both; trust the fraction engine when the decimals run long.',
        },
        { kind: 'heading', text: 'Anchors: 0, 1/2 and 1' },
        {
          kind: 'para',
          text: 'The half is one of three anchors worth installing in permanent memory. Every proper fraction lives strictly between $0$ and $1$ (Lesson 4.1), so $0$ and $1$ bracket the whole family: any improper fraction — worth $1$ or more — beats any proper fraction outright, no computation invited. Between the brackets, a fraction\'s address is sketched by two questions: how far from $0$ (a small numerator on a large denominator sits near the floor), and how far from $1$ (a numerator close to its denominator sits near the ceiling). The second question has a beautiful shortcut when two fractions both hover near the top.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Completing the whole',
          text: 'For fractions just under $1$, compare what is *missing* instead of what is held. $\\tfrac{7}{8}$ is one eighth short of the whole; $\\tfrac{8}{9}$ is one ninth short. Since $\\tfrac{1}{9} < \\tfrac{1}{8}$, the ninth-short fraction is missing less — so it holds more: $\\tfrac{8}{9} > \\tfrac{7}{8}$. The cross-test confirms from its own side: $7 \\times 9 = 63 < 64 = 8 \\times 8$. In general, among fractions one piece short of the whole — the $\\tfrac{b-1}{b}$ family — the larger denominator wins, because the missing piece $\\tfrac{1}{d}$ shrinks as $d$ grows (Exercise L6, second half).',
        },
        {
          kind: 'example',
          title: 'Compare 9/10 and 11/12 by completing the whole',
          steps: [
            'Now, both fractions sit one piece below the whole: $\\tfrac{9}{10}$ is missing $\\tfrac{1}{10}$, and $\\tfrac{11}{12}$ is missing $\\tfrac{1}{12}$.',
            'So compare the missing pieces instead: unit fractions order inversely, and $\\tfrac{1}{12} < \\tfrac{1}{10}$ — the twelfth is the smaller hole.',
            'So the fraction with the smaller hole is larger: $\\tfrac{11}{12} > \\tfrac{9}{10}$.',
            'Hence $\\tfrac{9}{10} < \\tfrac{11}{12}$ — and the cross-test agrees: $9 \\times 12 = 108 < 110 = 11 \\times 10$. Two views, one verdict: near the top of the line, count the holes.',
          ],
        },
        { kind: 'heading', text: 'Mixed numbers: wholes first' },
        {
          kind: 'para',
          text: 'Mixed numbers bring their two-storey structure to the comparison, and the storeys are settled in order: **whole parts first**, fractional parts only on a tie. This is Lesson 1.2\'s ordering applied to the whole storey — $3$ of anything beats $2$ of anything — and it routinely saves all the work: $4\\tfrac{1}{8} > 3\\tfrac{9}{10}$ instantly, the impressive-looking fractional part notwithstanding, because $4 > 3$. When the wholes tie, the fractional parts inherit the question, and every engine of this lesson applies to them: same denominators, same numerators, cross-tests, benchmarks.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The wholes-first rule',
          text: 'To compare mixed numbers $W\\tfrac{n}{d}$ and $V\\tfrac{m}{e}$ (all parts positive): if $W < V$ then $W\\tfrac{n}{d} < V\\tfrac{m}{e}$, whatever the fractional parts; if $W = V$, compare $\\tfrac{n}{d}$ with $\\tfrac{m}{e}$ by this lesson\'s engines. Thus, $4\\tfrac{1}{8} > 3\\tfrac{9}{10}$ (the wholes differ), while $3\\tfrac{2}{5}$ against $3\\tfrac{3}{8}$ goes to the fractions: $\\tfrac{2}{5} > \\tfrac{3}{8}$ ($16 > 15$).',
        },
        {
          kind: 'para',
          text: 'Two boundary notes complete the rule. First, the anchor $1$ already splits the field: every proper fraction is smaller than every improper one, so $\\tfrac{5}{6} < \\tfrac{9}{8}$ is decided before any engine warms up. Second, when a tie in wholes leaves fractional parts on *different rulers* — as with $\\tfrac{2}{5}$ against $\\tfrac{3}{8}$ — the cross-test is the default tool; the common-ruler route (fortieths here: $\\tfrac{16}{40}$ against $\\tfrac{15}{40}$) is the same verdict with the machinery shown.',
        },
        {
          kind: 'example',
          title: 'Compare 3 2/5 and 3 3/8',
          steps: [
            'Now, the whole parts tie: $3 = 3$ — so the decision passes to the fractional storey.',
            'So cross-multiply the fractional parts: $2 \\times 8 = 16$ and $3 \\times 5 = 15$.',
            'So $16 > 15$, hence $\\tfrac{2}{5} > \\tfrac{3}{8}$: the fifths-storey holds more.',
            'Hence $3\\tfrac{2}{5} > 3\\tfrac{3}{8}$ — and converting both to improper fractions confirms it on the $40$-ruler: $\\tfrac{17}{5} = \\tfrac{136}{40} > \\tfrac{135}{40} = \\tfrac{27}{8}$, a one-part difference exactly where the fractional cross-test put it.',
          ],
        },
        { kind: 'heading', text: 'The comparison toolkit' },
        {
          kind: 'para',
          text: 'From the above discussion, the engines collect into one table — six recurring situations, six tools, each with its worked instance from this lesson:',
        },
        {
          kind: 'table',
          head: ['Situation', 'Engine', 'Worked instance', 'Verdict'],
          rows: [
            ['Same denominator', 'count the equal pieces', '5/9 vs 7/9: 5 < 7', '5/9 < 7/9'],
            ['Same numerator', 'invert: finer cut, smaller holding', '5/8 vs 5/11: 8 < 11', '5/8 > 5/11'],
            ['Unlike rulers, two fractions', 'cross-multiply: ad vs bc', '5/6 vs 8/11: 55 > 48', '5/6 > 8/11'],
            ['A list of fractions', 'raise all to one common ruler', 'the trio on the 165-ruler: 105, 110, 132', '7/11 < 2/3 < 4/5'],
            ['Near 1 (one piece short)', 'compare the missing pieces', '9/10 vs 11/12: 1/12 < 1/10', '9/10 < 11/12'],
            ['Mixed numbers', 'wholes first, then fractional parts', '3 2/5 vs 3 3/8: 2/5 > 3/8', '3 2/5 > 3 3/8'],
          ],
        },
        {
          kind: 'equation',
          latex: '\\frac{n}{d} < \\frac{m}{d} \\iff n < m \\qquad \\frac{n}{d} < \\frac{n}{e} \\iff e < d \\qquad \\frac{a}{b} < \\frac{c}{d} \\iff ad < bc',
          note: 'The three comparison laws on one line: equal rulers obey the counting order, equal counts invert the ruler order, and unlike rulers defer to the products. For lists, raise everything to one common ruler and let whole-number order sort the counts.',
        },
        {
          kind: 'formula',
          name: 'The common-denominator method',
          latex: '\\text{to compare } \\tfrac{a}{b}, \\tfrac{c}{d}, \\ldots: \\quad \\tfrac{a}{b} = \\tfrac{a k_1}{R}, \\; \\tfrac{c}{d} = \\tfrac{c k_2}{R}, \\quad R = \\mathrm{LCM}(b, d, \\ldots) \\text{ (or the product)}',
          note: 'Raise every fraction to one ruler R (the LCM keeps the numbers small; the product always works), then order the numerators — whole-number order does the rest. The cross-multiplication test is this method with R = bd and the bookkeeping suppressed.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Which is larger — and how much larger?',
          text: 'Every engine in this lesson returns a verdict — which point sits further right. On a common ruler they also quietly contain the *gap*: larger count minus smaller count, over the ruler ($\\tfrac{15}{24} - \\tfrac{14}{24} = \\tfrac{1}{24}$ above). Turning that observation into a systematic arithmetic of fraction addition and subtraction is Lesson 4.4\'s opening business, where the LCM ruler becomes standard equipment.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which is larger: 8/13 or 5/13?',
              options: [
                '5/13, because 5 is the smaller number',
                '8/13 — the pieces are equal in size, so the larger count wins',
                'They are equal',
                'Cannot be decided without a common denominator',
              ],
              answer: 1,
              explain:
                'Both fractions are counts of thirteenths — the ruler is already shared, so whole-number order settles it: 8 > 5 (Option 2). Option 1 misapplies the same-numerator inversion to a pair that shares its *denominator* instead — read which storey matches before choosing a rule. Option 3 is false: 8 ≠ 5. Option 4 describes the unlike-ruler case, which this pair simply is not in.',
            },
            {
              q: 'Which is smaller: 4/7 or 4/11?',
              options: [
                '4/7',
                '4/11',
                'They are equal',
                'The cross-test is needed to decide',
              ],
              answer: 1,
              explain:
                'Same numerator, so the same-numerator rule reads the denominators backwards: 7 < 11 makes 4/7 the *larger* and 4/11 the smaller (Option 2). The cross-test confirms rather than rescues: 4 × 11 = 44 > 28 = 7 × 4, so 4/7 > 4/11 — no "need" to run it (Option 4). Option 1 reverses the rule. The trap is real: eleven is the bigger number, but elevenths are the smaller pieces.',
            },
            {
              q: 'By the cross-multiplication test, 5/8 compared with 7/12 gives —',
              options: [
                '5/8 < 7/12, because 5 < 7 and 8 < 12',
                '5/8 = 7/12, because both are proper fractions',
                '5/8 > 7/12, because 5 × 12 = 60 beats 7 × 8 = 56',
                '7/12 > 5/8, because twelfths are finer than eighths',
              ],
              answer: 2,
              explain:
                'The test computes the two cross-products — 5 × 12 = 60 against 7 × 8 = 56 — and 60 > 56 gives 5/8 > 7/12 (Option 3). Options 1 and 4 compare the parts pairwise, numerator with numerator or denominator with denominator, which is not a move the licence ever sold. Option 2 is doubly wrong: both being proper says only that both sit below 1, not that they sit together. On the 24-ruler the verdict repeats: 15/24 against 14/24.',
            },
            {
              q: 'Using the 1/2 benchmark only — no products — which of these is instantly the largest: 3/7, 9/20, 4/9, 6/11?',
              options: ['3/7', '9/20', '4/9', '6/11'],
              answer: 3,
              explain:
                'Double each numerator and compare with the denominator: 6 < 7, 18 < 20, 8 < 9 — three fractions sit below the half — while 12 > 11 lifts 6/11 above it (Option 4). One candidate above the half outranks every candidate below it; the benchmark alone decided an exam-style item without a single multiplication. Should the list have held two above-half fractions, one cross-test between the survivors would finish the job.',
            },
            {
              q: 'Which is larger: 4 2/9 or 4 1/4?',
              options: [
                '4 2/9, because 2/9 has the larger numerator',
                '4 2/9, because ninths are larger pieces than quarters',
                '4 1/4 — the wholes tie, and 1/4 > 2/9 since 2 × 4 = 8 < 9 = 1 × 9',
                'They are equal, because both wholes are 4',
              ],
              answer: 2,
              explain:
                'Equal wholes push the decision to the fractional storey, where the cross-test votes: 2 × 4 = 8 < 9 = 1 × 9, so 2/9 < 1/4 and 4 1/4 wins (Option 3). Option 1 compares numerators across different rulers — not a legal reading. Option 2 inverts the same-numerator rule: ninths are *smaller* pieces than quarters, so 2/9 < 1/4. Option 4 stops one storey short: equal wholes make the fractional parts *decisive*, not irrelevant.',
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
                  q: 'Fill in the correct sign (<, > or =): (a) 4/11 ▢ 7/11; (b) 5/9 ▢ 5/12; (c) 6/6 ▢ 13/13.',
                  solution: [
                    'Now, (a) shares the ruler — elevenths against elevenths — so the counts decide: $4 < 7$.',
                    'So (a) reads $\\tfrac{4}{11} < \\tfrac{7}{11}$.',
                    'Next, (b) shares the count: five pieces each, but ninths are coarser than twelfths, so the ninths holding is larger: $\\tfrac{5}{9} > \\tfrac{5}{12}$ (licence check: $5 \\times 12 = 60 > 45 = 9 \\times 5$).',
                    'And (c): $\\tfrac{6}{6} = 1 = \\tfrac{13}{13}$ — two complete rulers, one point.',
                    'Hence (a) $<$, (b) $>$, (c) $=$ — the first two by the easy rules, the third by the anchor $1$.',
                  ],
                  answer: '(a) <; (b) >; (c) =',
                },
                {
                  q: 'Which is larger: 3/5 or 7/10? Decide by raising to a common ruler, then confirm with the cross-test.',
                  solution: [
                    'Now, $10$ is a multiple of $5$, so tenths are a legal common ruler — only the smaller denominator needs raising.',
                    'So $\\tfrac{3}{5} = \\tfrac{3 \\times 2}{5 \\times 2} = \\tfrac{6}{10}$, and the counts line up: $6 < 10$.',
                    'So the ruler says $\\tfrac{3}{5} < \\tfrac{7}{10}$.',
                    'Check by the cross-test: $3 \\times 10 = 30$ against $7 \\times 5 = 35$ — $30 < 35$, the same verdict with the raising suppressed.',
                    'Hence $\\tfrac{7}{10}$ is larger, by $\\tfrac{1}{10}$ — one cell of the shared ruler.',
                  ],
                  answer: '7/10 (3/5 = 6/10 < 7/10)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Arrange in ascending order: 1/2, 1/9, 1/4, 1/100, 1/3.',
                  solution: [
                    'Now, all five share the numerator $1$ — five piece sizes, no counts to weigh against each other.',
                    'So the same-numerator rule applies: ascending order of the fractions is descending order of the denominators.',
                    'So read the denominators from largest to smallest: $100, 9, 4, 3, 2$.',
                    'Hence $\\tfrac{1}{100} < \\tfrac{1}{9} < \\tfrac{1}{4} < \\tfrac{1}{3} < \\tfrac{1}{2}$ — the finest cut first, the half last.',
                  ],
                  answer: '1/100 < 1/9 < 1/4 < 1/3 < 1/2',
                },
                {
                  q: 'Without computing any cross-products, decide which of 8/15 and 11/24 is larger.',
                  solution: [
                    'Now, test both against the benchmark $\\tfrac{1}{2}$ by doubling each numerator: $2 \\times 8 = 16 > 15$ and $2 \\times 11 = 22 < 24$.',
                    'So $\\tfrac{8}{15}$ clears the half and $\\tfrac{11}{24}$ falls short — one point above $\\tfrac{1}{2}$, one below.',
                    'Hence $\\tfrac{8}{15} > \\tfrac{11}{24}$ — the anchor decided it; the cross-test ($8 \\times 24 = 192 > 165 = 15 \\times 11$) merely confirms.',
                  ],
                  answer: '8/15 (it clears 1/2; 11/24 does not)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'One recipe uses 5/8 kg of flour, another uses 2/3 kg. Which recipe uses more flour? Decide twice: by the cross-test and by a common ruler.',
                  solution: [
                    'Now, by the cross-test: $5 \\times 3 = 15$ against $8 \\times 2 = 16$.',
                    'So $15 < 16$, and $\\tfrac{5}{8} < \\tfrac{2}{3}$ — the two-thirds recipe is hungrier.',
                    'Again, by the ruler: $24$ is a common multiple of $8$ and $3$, and $\\tfrac{5}{8} = \\tfrac{15}{24}$ while $\\tfrac{2}{3} = \\tfrac{16}{24}$.',
                    'So fifteen cells against sixteen on one ruler — the same verdict, the difference exactly $\\tfrac{1}{24}$ kg.',
                    'Hence the second recipe uses more flour: $\\tfrac{2}{3} \\text{ kg} > \\tfrac{5}{8} \\text{ kg}$, by a twenty-fourth of a kilo.',
                  ],
                  answer: '2/3 kg (15/24 < 16/24; the gap is 1/24 kg)',
                },
                {
                  q: 'exam-style: Of 5/6 and 8/11, which is larger? Settle it with the cross-multiplication test and confirm on a common ruler.',
                  solution: [
                    'Now, cross-multiply: $5 \\times 11 = 55$ against $8 \\times 6 = 48$.',
                    'So $55 > 48$, hence $\\tfrac{5}{6} > \\tfrac{8}{11}$.',
                    'Confirm on the product ruler $66$: $\\tfrac{5}{6} = \\tfrac{55}{66}$ (raised by $11$) and $\\tfrac{8}{11} = \\tfrac{48}{66}$ (raised by $6$) — the products reappear as the raised counts.',
                    'Hence $\\tfrac{5}{6}$ is the larger — $\\tfrac{55}{66} > \\tfrac{48}{66}$, seven sixty-sixths clear.',
                  ],
                  answer: '5/6 (55 > 48; on the 66-ruler, 55/66 > 48/66)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: "exam-style: Which is the largest fraction — 2/3, 4/5 or 7/11? (The item Lesson 4.1 banked: an SSC Multi-Tasking Staff 2017 question, via Khattar's chapter 1 drill set.)",
                  solution: [
                    'Now, all three clear the half ($4 > 3$, $8 > 5$, $14 > 11$), so the benchmark cannot separate them — build the ruler.',
                    'So raise everything to $165 = 3 \\times 5 \\times 11$: $\\tfrac{2}{3} = \\tfrac{110}{165}$, $\\tfrac{4}{5} = \\tfrac{132}{165}$, $\\tfrac{7}{11} = \\tfrac{105}{165}$.',
                    'Now the counts sort themselves: $105 < 110 < 132$.',
                    'Hence $\\tfrac{7}{11} < \\tfrac{2}{3} < \\tfrac{4}{5}$ — the largest is $\\tfrac{4}{5}$, the banked item settled in one pass of the common ruler.',
                  ],
                  answer: '4/5 (7/11 < 2/3 < 4/5)',
                },
                {
                  q: 'exam-style: A student writes "9/10 > 11/12 is false, because 11 and 12 are bigger numbers." Give the correct verdict — first by completing the whole, then by the cross-test.',
                  solution: [
                    'Now, both fractions sit one piece below the whole: $\\tfrac{9}{10}$ is missing $\\tfrac{1}{10}$, $\\tfrac{11}{12}$ is missing $\\tfrac{1}{12}$.',
                    'So compare the holes: $\\tfrac{1}{12} < \\tfrac{1}{10}$ — the twelfth-short fraction is missing less, so it holds more: $\\tfrac{11}{12} > \\tfrac{9}{10}$.',
                    'Check by the cross-test: $9 \\times 12 = 108$ against $11 \\times 10 = 110$ — $108 < 110$, so $\\tfrac{9}{10} < \\tfrac{11}{12}$ ✓.',
                    "Hence the student's verdict is wrong and backwards: bigger recorded numbers can mean smaller missing pieces — $\\tfrac{11}{12}$ is the larger fraction, and \"bigger numbers\" never decided a comparison of unlike rulers.",
                  ],
                  answer: '11/12 is larger (108 < 110; it is missing the smaller piece 1/12 < 1/10)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Arrange in ascending order: 5/8, 3/5, 7/10, 2/3 — and name the ruler you used.',
                  solution: [
                    'Now, the denominators $8, 5, 10, 3$ share the common multiple $120$ — and it is in fact the LCM, the smallest legal ruler here.',
                    'So raise each fraction: $\\tfrac{5}{8} = \\tfrac{75}{120}$ (by $15$), $\\tfrac{3}{5} = \\tfrac{72}{120}$ (by $24$), $\\tfrac{7}{10} = \\tfrac{84}{120}$ (by $12$), $\\tfrac{2}{3} = \\tfrac{80}{120}$ (by $40$).',
                    'Now sort the counts: $72 < 75 < 80 < 84$.',
                    'Hence $\\tfrac{3}{5} < \\tfrac{5}{8} < \\tfrac{2}{3} < \\tfrac{7}{10}$ — one ruler, four raisings, the whole order at once.',
                  ],
                  answer: '3/5 < 5/8 < 2/3 < 7/10 (on the 120-ruler: 72 < 75 < 80 < 84)',
                },
                {
                  q: 'Arrange 5/6, 7/9 and 11/12 in ascending order on their smallest common ruler, and say what that ruler is.',
                  solution: [
                    'Now, the smallest ruler is $\\mathrm{LCM}(6, 9, 12)$: $\\mathrm{LCM}(6, 9) = 18$ and $\\mathrm{LCM}(18, 12) = 36$.',
                    'So raise to $36$: $\\tfrac{5}{6} = \\tfrac{30}{36}$ (by $6$), $\\tfrac{7}{9} = \\tfrac{28}{36}$ (by $4$), $\\tfrac{11}{12} = \\tfrac{33}{36}$ (by $3$).',
                    'Now the counts run $28 < 30 < 33$.',
                    'Hence $\\tfrac{7}{9} < \\tfrac{5}{6} < \\tfrac{11}{12}$ on the $36$-ruler — the LCM kept every count small enough to sort at a glance.',
                  ],
                  answer: '7/9 < 5/6 < 11/12 (the 36-ruler: 28 < 30 < 33)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the same-numerator rule: for positive fractions with equal numerators, a/b > a/c if and only if b < c. Then state the unit-fraction case it contains.',
                  solution: [
                    'Licence: $\\tfrac{a}{b} > \\tfrac{a}{c}$ holds exactly when $a \\times c > b \\times a$ — the cross-multiplication test of Lesson 4.2.',
                    'Now, both products carry the factor $a$: $a \\times c$ against $b \\times a$. Since $a > 0$, dividing both by $a$ is legal and leaves $c$ against $b$.',
                    'So $\\tfrac{a}{b} > \\tfrac{a}{c} \\iff c > b$ — with the numerators equal, the smaller denominator wins, proved rather than pictorialised.',
                    'Setting $a = 1$ gives the unit-fraction case: $\\tfrac{1}{b} > \\tfrac{1}{c} \\iff b < c$ — the ladder $\\tfrac{1}{2} > \\tfrac{1}{3} > \\tfrac{1}{4} > \\cdots$ is this line, stepped.',
                    'Hence the same-numerator rule is a one-line corollary of the licence: equal counts, so the piece sizes — encoded in the denominators — decide, inversely. □',
                  ],
                  answer: 'a/b > a/c ⟺ c > b (equal numerators; the licence with a > 0 cancelled)',
                },
                {
                  q: "Prove the mediant ordering: if a/b < c/d (all positive), then a/b < (a+c)/(b+d) < c/d — Lesson 4.1's density machine, derived in two lines from the licence.",
                  solution: [
                    'Licence: for positive fractions, $\\tfrac{x}{y} < \\tfrac{z}{w} \\iff xw < yz$.',
                    'Left half: $\\tfrac{a}{b} < \\tfrac{a+c}{b+d} \\iff a(b+d) < b(a+c) \\iff ab + ad < ab + bc \\iff ad < bc$ — true by hypothesis, so the first inequality holds.',
                    'Right half: $\\tfrac{a+c}{b+d} < \\tfrac{c}{d} \\iff d(a+c) < c(b+d) \\iff ad + cd < bc + cd \\iff ad < bc$ — true by the same hypothesis.',
                    'Hence both ends hold at once: $\\tfrac{a}{b} < \\tfrac{a+c}{b+d} < \\tfrac{c}{d}$ whenever $\\tfrac{a}{b} < \\tfrac{c}{d}$. Instance: $\\tfrac{2}{5} < \\tfrac{3}{7}$ ($14 < 15$) traps the mediant $\\tfrac{5}{12}$ between them ($24 < 25$ and $35 < 36$).',
                    'So the theorem Lesson 4.1 proved by regrouping pieces is also a two-line corollary of the licence — the density of the fraction line, re-derived from the comparison engine itself. □',
                  ],
                  answer: 'a/b < (a+c)/(b+d) < c/d whenever a/b < c/d (both halves reduce to ad < bc)',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The chapter\'s slowest debt is paid. Equivalence said when two names meet; comparison now says when one point outranks another — by counting shared pieces, by inverting finer rulers, by letting two products vote, or by mounting a whole list on one common ruler. The raising move built in Lesson 4.2 has done today\'s lifting, and it is not finished: the moment gaps become additions — $\\tfrac{14}{24} + \\tfrac{1}{24} = \\tfrac{15}{24}$ was this lesson\'s quiet calculation — the common ruler stops being a comparison device and becomes the arithmetic of fractions itself. Lesson 4.4 starts there, with the LCM as the standard ruler and the Egyptian scribes\' two-term openings finally within reach.',
        },
      ],
    },
    {
      id: 'fm-adding-subtracting-fractions',
      number: '4.4',
      title: 'Adding and Subtracting Fractions',
      concepts: [
        'Like fractions share a ruler',
        'Unlike fractions and the LCM method',
        'Sums and differences in lowest terms',
        'Subtraction as gap-naming',
        'Complement from the whole',
        'Regrouping mixed numbers',
        'Egyptian two-term openings',
        'The straight-across fraud',
      ],
      objectives: [
        'Add and subtract fractions on a shared ruler by counting pieces, and simplify every result to lowest terms',
        'Raise any two unlike fractions to one common ruler — the LCM as standard equipment — and add or subtract the raised counts, with mixed numbers handled storey by storey',
        'Read subtraction as gap-naming and complements, and decide when a subtraction has an answer at all',
        'Split fractions into two-term sums of distinct unit fractions by the greedy choice, and prove why adding straight across never works',
      ],
      prerequisites: [
        'fm-idea-of-a-fraction',
        'fm-equivalent-fractions-simplification',
        'fm-comparing-fractions',
        'fm-lowest-common-multiple',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch7'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.3 closed with a quiet calculation hiding inside a comparison: fourteen twenty-fourths plus one twenty-fourth is fifteen twenty-fourths. Nothing was made of it at the time — the count merely recorded a verdict. But look at what the sentence actually did: it **added two fractions**. The whole machinery of this chapter — rulers, raisings, atoms, the LCM — has been built for comparisons; this lesson turns the same machinery onto the arithmetic itself. The question changes shape: no longer "which point sits further right?" but "how much bread in two baskets together?", "how much of the tank is filled?", "how much of the salary is left?"',
        },
        {
          kind: 'para',
          text: 'The ruler language makes the plan almost obvious. A fraction is a count of equal pieces; addition is combining counts; subtraction is finding the gap between counts. Combining three eighths with two eighths is easy — the pieces are the same size, so the counts simply add. The entire difficulty of fraction arithmetic lives in one place: the addends often arrive measured on *different* rulers, and pieces of different sizes cannot be counted together. Every method in this lesson is a way of getting the addends onto one ruler before the counting begins — and the lessons of 4.2 and 4.3 have already supplied every move needed.',
        },
        { kind: 'heading', text: 'Like rulers: counting the pieces' },
        {
          kind: 'para',
          text: 'Fractions with the **same denominator** are called **like fractions** — counts of pieces of one size, cut from one ruler. To add $\\tfrac{2}{9} + \\tfrac{4}{9}$: two ninths fill two cells of the ninth-ruler, four ninths fill four more of the very same cells; together they fill $2 + 4 = 6$ cells. Nothing is re-cut, nothing is raised — the ruler was already shared. Whole-number addition does the work on the counts, and the denominator rides along untouched, because it records the piece size, which never changed.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Adding and subtracting like fractions',
          text: 'For whole numbers $a$, $c$ and a positive denominator $d$: $\\tfrac{a}{d} + \\tfrac{c}{d} = \\tfrac{a + c}{d}$ and, when $a \\geq c$, $\\tfrac{a}{d} - \\tfrac{c}{d} = \\tfrac{a - c}{d}$. Thus, $\\tfrac{2}{9} + \\tfrac{4}{9} = \\tfrac{6}{9}$ and $\\tfrac{9}{11} - \\tfrac{4}{11} = \\tfrac{5}{11}$ — the counts add or subtract, the common piece size is carried through. In symbols the rule says the denominator is inert: only the numerators do arithmetic.',
        },
        {
          kind: 'para',
          text: 'For example, the like-ruler rule settles a whole run of computations at a glance:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\tfrac{3}{13} + \\tfrac{4}{13} = \\tfrac{7}{13}$ — thirteen pieces each, three plus four shaded;',
            '$\\tfrac{9}{11} - \\tfrac{4}{11} = \\tfrac{5}{11}$ — nine cells less four cells, the gap read off the counts;',
            '$\\tfrac{7}{7} - \\tfrac{3}{7} = \\tfrac{4}{7}$ — the whole is seven sevenths, so what remains after three are taken is the complement $1 - \\tfrac{3}{7}$.',
          ],
        },
        {
          kind: 'para',
          text: 'The rule deserves its one-line proof, and the distributive law of Lesson 2.2 supplies it. The fraction $\\tfrac{a}{d}$ means $a$ copies of the piece $\\tfrac{1}{d}$, and $\\tfrac{c}{d}$ means $c$ more copies of the same piece; copies of one thing add by the distributive law: $a \\cdot \\tfrac{1}{d} + c \\cdot \\tfrac{1}{d} = (a + c) \\cdot \\tfrac{1}{d} = \\tfrac{a+c}{d}$. Exercise L6 asks for the full argument. This is the first time the four operations of chapter 2 reach into fraction land with a proof rather than a picture — and notice what made it work: the pieces were *equal*, so the counts could be pooled. Every rule that follows is a way of manufacturing that equality.',
        },
        {
          kind: 'example',
          title: 'Add 2/9 + 4/9 — and give the sum in its lowest terms',
          steps: [
            'Now, the ruler is shared: two ninths and four ninths are counts of equal pieces, so the counts add: $2 + 4 = 6$.',
            'So $\\tfrac{2}{9} + \\tfrac{4}{9} = \\tfrac{6}{9}$.',
            'Next, simplify: $\\gcd(6, 9) = 3$, and one division by the HCF of Lesson 3.3 gives $\\tfrac{6}{9} = \\tfrac{2}{3}$.',
            'Hence $\\tfrac{2}{9} + \\tfrac{4}{9} = \\tfrac{2}{3}$ — the counting was the arithmetic, and the atoms of Lesson 4.2 finished the name.',
          ],
        },
        {
          kind: 'para',
          text: 'Two habits begin here and run through the whole lesson. First, **simplify the result**: sums and differences arrive with whatever denominator the common ruler had, and they often carry hidden atoms — $\\tfrac{7}{8} - \\tfrac{5}{8} = \\tfrac{2}{8} = \\tfrac{1}{4}$, $\\tfrac{5}{10} + \\tfrac{3}{10} = \\tfrac{8}{10} = \\tfrac{4}{5}$. A correct answer in unlowest terms is half an answer. Second, **watch the whole**: nothing confines a sum to the interval between $0$ and $1$. Five eighths plus seven eighths is twelve eighths — past the whole, an improper fraction, $\\tfrac{12}{8} = \\tfrac{3}{2} = 1\\tfrac{1}{2}$. The number line does not stop at $1$, and neither does fraction addition.',
        },
        {
          kind: 'para',
          text: 'The number line adds its own reading of the rule. Addition is a **walk**: to compute $\\tfrac{2}{9} + \\tfrac{4}{9}$, stand at $\\tfrac{2}{9}$ and walk four ninth-steps right — the walk lands on the sixth cell, $\\tfrac{6}{9}$, and subtraction would walk left. Equal steps tile the walk cleanly only when both numbers speak in steps of the *same* size, which is the whole lesson in one picture: like fractions add by walking one ruler, and every unlike-ruler method below is a way of re-cutting the two step sizes until they match.',
        },
        {
          kind: 'para',
          text: 'The laws that governed whole-number addition in Lesson 2.2 climb the ladder intact, because pooling counts is still whole-number arithmetic — the verified instances say so:',
        },
        {
          kind: 'list',
          items: [
            '**Commutative**: $\\tfrac{1}{4} + \\tfrac{1}{6} = \\tfrac{1}{6} + \\tfrac{1}{4} = \\tfrac{5}{12}$ — the raised counts 3 and 2 pool in either order;',
            '**Associative**: $(\\tfrac{1}{2} + \\tfrac{1}{3}) + \\tfrac{1}{9} = \\tfrac{15}{18} + \\tfrac{2}{18} = \\tfrac{17}{18}$, and $\\tfrac{1}{2} + (\\tfrac{1}{3} + \\tfrac{1}{9}) = \\tfrac{9}{18} + \\tfrac{8}{18} = \\tfrac{17}{18}$ — the same ruler, the same 17, grouped either way;',
            '**Identity 0**: $\\tfrac{5}{9} + 0 = \\tfrac{5}{9}$ — zero is $\\tfrac{0}{9}$ on the ruler, a walk of no steps;',
            '**Subtraction inherits none of this**: $\\tfrac{5}{8} - \\tfrac{3}{8} = \\tfrac{2}{8}$ but $\\tfrac{3}{8} - \\tfrac{5}{8}$ names no gap at all — the failure of chapter 2 repeats on every ruler.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The straight-across fraud',
          text: 'The numerators may be added only when the denominators already agree. Adding straight across — $\\tfrac{1}{2} + \\tfrac{1}{3} = \\tfrac{2}{5}$? — is the oldest fraud in fraction arithmetic, and $\\tfrac{2}{5}$ is not even random noise: it is exactly the **mediant** of the addends, so Lesson 4.3\'s L6 theorem guarantees $\\tfrac{1}{3} < \\tfrac{2}{5} < \\tfrac{1}{2}$. The fake answer always lands *between* the two true values — smaller than the larger addend, larger than the smaller one — which is why the fraud survives a glance-test so often. Exercise L6 proves the stronger fact: the straight-across answer is always strictly *less than the true sum*.',
        },
        { kind: 'heading', text: 'Unlike rulers: the LCM becomes standard equipment' },
        {
          kind: 'para',
          text: 'Now remove the coincidence. $\\tfrac{1}{4} + \\tfrac{1}{6}$ asks one quarter plus one sixth — a quarter-piece and a sixth-piece — and no counting pools them: the pieces differ in size, and "one of each" is a description, not a number. The fix is the raising move of Lesson 4.2, wielded today for arithmetic instead of comparison: re-cut both amounts onto **one common ruler**, where the pieces are equal and the counts can finally pool. Any common multiple of the denominators is a legal ruler; the *smallest* legal ruler is the LCM (Lesson 3.4), which Lesson 4.3 promoted for comparisons and which now takes the standard-equipment role for arithmetic.',
        },
        {
          kind: 'example',
          title: 'Add 1/4 + 1/6 on the twelve-ruler',
          steps: [
            'Now, find the common ruler: $\\mathrm{LCM}(4, 6) = 12$ — twelfths are legal pieces for both fractions.',
            'So raise each addend by its own multiplier: $\\tfrac{1}{4} = \\tfrac{1 \\times 3}{4 \\times 3} = \\tfrac{3}{12}$ and $\\tfrac{1}{6} = \\tfrac{1 \\times 2}{6 \\times 2} = \\tfrac{2}{12}$.',
            'Now the pieces are equal and the counts pool: $\\tfrac{3}{12} + \\tfrac{2}{12} = \\tfrac{5}{12}$.',
            'Hence $\\tfrac{1}{4} + \\tfrac{1}{6} = \\tfrac{5}{12}$ — and $\\gcd(5, 12) = 1$, so the sum is already in lowest terms: no atoms left to remove.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Addition happens on one ruler. A fourth and a sixth live on different rulers (top): their pieces cannot be pooled. Raised to the twelve-ruler, the fourth is 3/12 and the sixth is 2/12 — three twelfths shade exactly as much as the fourth did, two twelfths exactly as much as the sixth (the raising changed the name, not the amount). On the sum bar the two contributions stack: 3 + 2 = 5 twelfths, the boundary between them dashed.',
          svg: `<svg viewBox="0 0 760 490" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bars showing 1/4 and 1/6 on their own rulers, both re-measured in twelfths as 3/12 and 2/12, and the sum bar 5/12 with the two contributions stacked">
  <g font-size="13" fill="currentColor">
    <text x="70" y="34">cut into 4 equal pieces — 1 shaded: 1/4</text>
    <rect x="70" y="44" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="44" width="155" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="225" y1="44" x2="225" y2="88"/>
      <line x1="380" y1="44" x2="380" y2="88"/>
      <line x1="535" y1="44" x2="535" y2="88"/>
    </g>
    <text x="706" y="71" font-weight="700">1/4</text>
    <text x="70" y="122">cut into 6 equal pieces — 1 shaded: 1/6</text>
    <rect x="70" y="132" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="132" width="103.33" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="173.33" y1="132" x2="173.33" y2="176"/>
      <line x1="276.67" y1="132" x2="276.67" y2="176"/>
      <line x1="380" y1="132" x2="380" y2="176"/>
      <line x1="483.33" y1="132" x2="483.33" y2="176"/>
      <line x1="586.67" y1="132" x2="586.67" y2="176"/>
    </g>
    <text x="706" y="159" font-weight="700">1/6</text>
    <text x="70" y="210">raised to the 12-ruler: 1/4 = 3/12</text>
    <rect x="70" y="220" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="220" width="51.67" height="44"/>
      <rect x="121.67" y="220" width="51.67" height="44"/>
      <rect x="173.33" y="220" width="51.67" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="121.67" y1="220" x2="121.67" y2="264"/>
      <line x1="173.33" y1="220" x2="173.33" y2="264"/>
      <line x1="225" y1="220" x2="225" y2="264"/>
      <line x1="276.67" y1="220" x2="276.67" y2="264"/>
      <line x1="328.33" y1="220" x2="328.33" y2="264"/>
      <line x1="380" y1="220" x2="380" y2="264"/>
      <line x1="431.67" y1="220" x2="431.67" y2="264"/>
      <line x1="483.33" y1="220" x2="483.33" y2="264"/>
      <line x1="535" y1="220" x2="535" y2="264"/>
      <line x1="586.67" y1="220" x2="586.67" y2="264"/>
      <line x1="638.33" y1="220" x2="638.33" y2="264"/>
    </g>
    <text x="706" y="247" font-weight="700">3/12</text>
    <text x="70" y="298">raised to the 12-ruler: 1/6 = 2/12</text>
    <rect x="70" y="308" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.15">
      <rect x="70" y="308" width="51.67" height="44"/>
      <rect x="121.67" y="308" width="51.67" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="121.67" y1="308" x2="121.67" y2="352"/>
      <line x1="173.33" y1="308" x2="173.33" y2="352"/>
      <line x1="225" y1="308" x2="225" y2="352"/>
      <line x1="276.67" y1="308" x2="276.67" y2="352"/>
      <line x1="328.33" y1="308" x2="328.33" y2="352"/>
      <line x1="380" y1="308" x2="380" y2="352"/>
      <line x1="431.67" y1="308" x2="431.67" y2="352"/>
      <line x1="483.33" y1="308" x2="483.33" y2="352"/>
      <line x1="535" y1="308" x2="535" y2="352"/>
      <line x1="586.67" y1="308" x2="586.67" y2="352"/>
      <line x1="638.33" y1="308" x2="638.33" y2="352"/>
    </g>
    <text x="706" y="335" font-weight="700">2/12</text>
    <text x="70" y="386">the sum on one ruler: 3 + 2 = 5 twelfths</text>
    <rect x="70" y="396" width="620" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.3">
      <rect x="70" y="396" width="51.67" height="44"/>
      <rect x="121.67" y="396" width="51.67" height="44"/>
      <rect x="173.33" y="396" width="51.67" height="44"/>
      <rect x="225" y="396" width="51.67" height="44"/>
      <rect x="276.67" y="396" width="51.67" height="44"/>
    </g>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="121.67" y1="396" x2="121.67" y2="440"/>
      <line x1="173.33" y1="396" x2="173.33" y2="440"/>
      <line x1="225" y1="396" x2="225" y2="440"/>
      <line x1="276.67" y1="396" x2="276.67" y2="440"/>
      <line x1="328.33" y1="396" x2="328.33" y2="440"/>
      <line x1="380" y1="396" x2="380" y2="440"/>
      <line x1="431.67" y1="396" x2="431.67" y2="440"/>
      <line x1="483.33" y1="396" x2="483.33" y2="440"/>
      <line x1="535" y1="396" x2="535" y2="440"/>
      <line x1="586.67" y1="396" x2="586.67" y2="440"/>
      <line x1="638.33" y1="396" x2="638.33" y2="440"/>
    </g>
    <text x="706" y="423" font-weight="700">5/12</text>
  <line x1="225" y1="390" x2="225" y2="446" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
  <text x="380" y="473" text-anchor="middle" font-weight="700">the contributions stack on one ruler: 1/4 + 1/6 = 3/12 + 2/12 = 5/12</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The product of the denominators is always a legal ruler too — $\\tfrac{1}{4} + \\tfrac{1}{6}$ could run on twenty-fourths: $\\tfrac{6}{24} + \\tfrac{4}{24} = \\tfrac{10}{24} = \\tfrac{5}{12}$, the same sum with bigger counts. The LCM keeps the numbers small, and small counts mean fewer simplification debts at the end; but when the LCM is not obvious, the product always answers. The next Illustration runs one sum on both rulers and watches them agree.',
        },
        {
          kind: 'example',
          title: 'Add 7/12 + 3/10 — two rulers, one sum',
          steps: [
            'Now, the LCM route: $\\mathrm{LCM}(12, 10) = 60$, so raise by $5$ and $6$ — $\\tfrac{7}{12} = \\tfrac{35}{60}$ and $\\tfrac{3}{10} = \\tfrac{18}{60}$.',
            'So the counts pool on the sixty-ruler: $\\tfrac{35}{60} + \\tfrac{18}{60} = \\tfrac{53}{60}$, already lowest ($\\gcd(53, 60) = 1$).',
            'Or the product route: on $120$, $\\tfrac{7}{12} = \\tfrac{70}{120}$ and $\\tfrac{3}{10} = \\tfrac{36}{120}$, so the sum is $\\tfrac{106}{120}$ — and one division by the HCF $2$ returns $\\tfrac{53}{60}$.',
            'Hence $\\tfrac{7}{12} + \\tfrac{3}{10} = \\tfrac{53}{60}$ — two rulers, one verdict, and the LCM route arrived with half-sized counts and no simplification owed.',
          ],
        },
        {
          kind: 'para',
          text: 'Lists of three or more fractions run on the same principle, and the choice of ruler matters more with every extra denominator. One ruler for the whole list — the LCM of all the denominators at once (Lesson 3.4 builds it pairwise: $\\mathrm{LCM}(2, 3) = 6$, then $\\mathrm{LCM}(6, 9) = 18$) — and every addend is raised once, after which the whole computation is whole-number bookkeeping. Exercise L5 adds $\\tfrac{1}{2} + \\tfrac{1}{3} + \\tfrac{1}{9}$ on exactly this eighteen-ruler: counts $9 + 6 + 2 = 17$, and the whole retains $\\tfrac{1}{18}$. Raising pairwise and adding as you go works too, but it re-raises intermediate sums and multiplies the chances of an arithmetic slip; one ruler for the list is the professional habit.',
        },
        {
          kind: 'formula',
          name: 'Like-ruler addition and subtraction',
          latex: '\\frac{a}{d} \\pm \\frac{c}{d} = \\frac{a \\pm c}{d} \\qquad (\\text{subtract only when } a \\geq c)',
          note: 'Like fractions are counts of equal pieces, so whole-number addition and subtraction act on the numerators while the common denominator rides through untouched. Simplify the result afterwards — sums carry hidden atoms as often as any other fraction.',
        },
        {
          kind: 'formula',
          name: 'The LCM method (unlike rulers)',
          latex: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a k_1 \\pm c k_2}{R}, \\quad R = \\mathrm{LCM}(b, d), \\quad k_1 = \\frac{R}{b}, \\; k_2 = \\frac{R}{d}',
          note: 'Raise both fractions to the common ruler R by the multiplying rule of Lesson 4.2, then add or subtract the raised counts. The product bd is always a legal R when the LCM is not visible; the LCM keeps every count small.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Like fractions',
              def: 'Fractions sharing one denominator — counts of pieces of one size. They add and subtract by pooling counts: 2/9 + 4/9 = 6/9. The denominator is inert.',
            },
            {
              term: 'Unlike fractions',
              def: 'Fractions on different rulers, such as 1/4 and 1/6. Their pieces cannot be counted together until both are raised to one common ruler.',
            },
            {
              term: 'LCM method',
              def: 'The standard addition/subtraction procedure: raise every fraction to the LCM of the denominators (or the product, always legal) and operate on the raised counts. 1/4 + 1/6 = 3/12 + 2/12 = 5/12.',
            },
            {
              term: 'Regrouping',
              def: 'Moving one whole between the storeys of a mixed number: an overflowing fractional part (5/4 = 1 1/4) carries a whole upward; an underflowing subtraction borrows 1 = d/d from the wholes (3 1/5 = 2 6/5).',
            },
            {
              term: 'Complement',
              def: 'The missing piece of a fraction below the whole: 1 − a/b = (d − a)/d. The completing-the-whole comparisons of Lesson 4.3 are this number, met arithmetically.',
            },
            {
              term: 'Greedy split',
              def: 'The Egyptian two-term opening: take the largest unit fraction that fits under the target, subtract, and often the remainder is unit too — 3/10 = 1/4 + 1/20, since 1/3 > 3/10 > 1/4 and 3/10 − 1/4 = 1/20.',
            },
          ],
        },
        { kind: 'heading', text: 'Subtraction as gap-naming' },
        {
          kind: 'para',
          text: 'Subtraction on a shared ruler mirrors addition — counts subtract, $\\tfrac{9}{11} - \\tfrac{4}{11} = \\tfrac{5}{11}$ — but its *meaning* deserves the wider reading. The number line says what subtraction of fractions really asks: **name the gap between two points**. Lesson 4.3 measured the gap between $\\tfrac{7}{12}$ and $\\tfrac{5}{8}$ to settle a comparison; the very same gap, written as an arithmetic sentence, is $\\tfrac{5}{8} - \\tfrac{7}{12} = \\tfrac{1}{24}$. Comparison and subtraction are one skill seen twice — the verdict machine of last lesson was computing a difference all along.',
        },
        {
          kind: 'example',
          title: "Subtract 5/8 − 7/12 — Lesson 4.3's gap, promoted",
          steps: [
            'Now, the rulers differ, so raise both to the common ruler $24$: $\\tfrac{5}{8} = \\tfrac{15}{24}$ and $\\tfrac{7}{12} = \\tfrac{14}{24}$.',
            'So the gap is the difference of the raised counts: $\\tfrac{15}{24} - \\tfrac{14}{24} = \\tfrac{1}{24}$.',
            'Check it by the licence of Lesson 4.2, subtracting across the product ruler at once: $\\tfrac{5 \\times 12 - 7 \\times 8}{8 \\times 12} = \\tfrac{60 - 56}{96} = \\tfrac{4}{96} = \\tfrac{1}{24}$ — the HCF $4$ clears the atom.',
            'Hence $\\tfrac{5}{8} - \\tfrac{7}{12} = \\tfrac{1}{24}$ — last lesson\'s "single extra twenty-fourth," now standing on its own as an answer.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Subtraction names a gap. On the line, 7/12 and 5/8 are two points; the arc spans the distance between them, and that distance is the answer: 5/8 − 7/12 = 1/24. One twenty-fourth of the whole unit line, drawn to scale — the gap in the figure is exactly 1/24 of the span from 0 to 1.',
          svg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1 with ticks at 7/12 and 5/8 and an arc naming the gap between them as 1/24">
  <g font-size="13" fill="currentColor">
  <line x1="40" y1="170" x2="720" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 720 170 l -9 -4 v 8 z" fill="currentColor"/>
  <line x1="40" y1="162" x2="40" y2="178" stroke="currentColor" stroke-width="1.5"/>
  <text x="40" y="198" text-anchor="middle" font-weight="700">0</text>
  <line x1="436.67" y1="162" x2="436.67" y2="178" stroke="currentColor" stroke-width="1.5"/>
  <text x="436.67" y="198" text-anchor="middle" font-weight="700">7/12</text>
  <line x1="465" y1="162" x2="465" y2="178" stroke="currentColor" stroke-width="1.5"/>
  <text x="465" y="198" text-anchor="middle" font-weight="700">5/8</text>
  <line x1="720" y1="162" x2="720" y2="178" stroke="currentColor" stroke-width="1.5"/>
  <text x="720" y="198" text-anchor="middle" font-weight="700">1</text>
  <path d="M 436.67 170 A 14.17 26 0 0 1 465 170" fill="none" stroke="#b45309" stroke-width="1.5"/>
  <text x="450.83" y="134" text-anchor="middle" font-weight="700">1/24</text>
  <text x="380" y="232" text-anchor="middle" font-weight="700">subtraction names the gap between the points: 5/8 − 7/12 = 1/24</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The most useful gap of all is the one below the whole. "How much is left?" after $\\tfrac{5}{9}$ of a job is done asks for $1 - \\tfrac{5}{9}$ — and $1$ wears its own ruler: $1 = \\tfrac{9}{9}$, so $1 - \\tfrac{5}{9} = \\tfrac{9}{9} - \\tfrac{5}{9} = \\tfrac{4}{9}$. Lesson 4.3 compared fractions near the top by their missing pieces; the arithmetic makes that comparison a number. One caution draws the boundary of the whole operation: counts can subtract only when the gap exists. $\\tfrac{5}{8} - \\tfrac{3}{8}$ names a real gap of two eighths; $\\tfrac{3}{8} - \\tfrac{5}{8}$ asks for a gap from a point to a point *right of it* — there is no such distance among the fractions above zero, and larger-from-smaller must wait for negative numbers in a later chapter.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The complement',
          text: 'For any proper fraction, the complement $1 - \\tfrac{a}{b} = \\tfrac{b - a}{b}$ is what the whole still owes. Complements add back to the whole: $\\tfrac{5}{9} + \\tfrac{4}{9} = 1$, $\\tfrac{7}{8} + \\tfrac{1}{8} = 1$. Tank and salary questions run on complements: a tank $\\tfrac{7}{12}$ full has $\\tfrac{12}{12} - \\tfrac{7}{12} = \\tfrac{5}{12}$ empty — and the two parts must add to the whole, a free check that catches arithmetic slips.',
        },
        { kind: 'heading', text: 'Mixed numbers: the two storeys' },
        {
          kind: 'para',
          text: 'Mixed numbers carry their two-storey structure into the arithmetic, and the storeys are worked in order: **wholes with wholes, fractional parts with fractional parts** — after the parts, like any fractions, are brought to one ruler. The only new event is traffic *between* the storeys. When the fractional parts of a sum overflow past $1$, a whole must be carried up; when the parts of a difference underflow below $0$, a whole must be borrowed down. Lesson 1.3\'s carrying and borrowing return, played one storey lower.',
        },
        {
          kind: 'example',
          title: 'Add 2 3/4 + 1 1/2 — storeys with an overflow',
          steps: [
            'Now, work the storeys: wholes $2 + 1 = 3$; parts $\\tfrac{3}{4} + \\tfrac{1}{2}$ on the twelve-ruler — or the fourth-ruler, since $\\tfrac{1}{2} = \\tfrac{2}{4}$.',
            'So the parts give $\\tfrac{3}{4} + \\tfrac{2}{4} = \\tfrac{5}{4}$ — an overflow: the fractional storey holds more than a whole.',
            'Next, regroup: $\\tfrac{5}{4} = 1\\tfrac{1}{4}$, so one whole is carried up: $3 + 1 = 4$ wholes, $\\tfrac{1}{4}$ left below.',
            'Hence $2\\tfrac{3}{4} + 1\\tfrac{1}{2} = 4\\tfrac{1}{4}$ — and the improper route agrees: $\\tfrac{11}{4} + \\tfrac{6}{4} = \\tfrac{17}{4} = 4\\tfrac{1}{4}$, since $17 = 4 \\times 4 + 1$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Regrouping a mixed number',
          text: 'An **overflow** in addition: fractional parts summing to $\\tfrac{n}{d}$ with $n \\geq d$ carry $\\lfloor n/d \\rfloor$ wholes up and leave the remainder below — $\\tfrac{5}{4} = 1\\tfrac{1}{4}$. An **underflow** in subtraction: when $\\tfrac{n}{d} < \\tfrac{m}{e}$, borrow $1 = \\tfrac{d}{d}$ from the wholes — $3\\tfrac{1}{5} = 2\\tfrac{6}{5}$ — and subtract on the shared ruler. Both moves are the division algorithm of Lesson 2.4, run on the fractional storey.',
        },
        {
          kind: 'example',
          title: 'Subtract 3 1/5 − 1 2/5 — storeys with an underflow',
          steps: [
            'Now, the fractional parts face the wrong way: $\\tfrac{1}{5} < \\tfrac{2}{5}$ — the underflow case, so no subtraction of parts is legal yet.',
            'So borrow one whole from the $3$ and pay it to the parts: $3\\tfrac{1}{5} = 2\\tfrac{5}{5} + \\tfrac{1}{5} = 2\\tfrac{6}{5}$.',
            'Now both storeys subtract cleanly: wholes $2 - 1 = 1$; parts $\\tfrac{6}{5} - \\tfrac{2}{5} = \\tfrac{4}{5}$.',
            'Hence $3\\tfrac{1}{5} - 1\\tfrac{2}{5} = 1\\tfrac{4}{5}$ — and the improper route confirms: $\\tfrac{16}{5} - \\tfrac{7}{5} = \\tfrac{9}{5} = 1\\tfrac{4}{5}$.',
          ],
        },
        {
          kind: 'para',
          text: 'The two routes — storeys and improper conversion — never disagree, because they are the same computation with the wholes either held apart or folded in. That makes the improper route the systematic *check* rather than a second method to memorise: convert, operate once on single fractions, convert back with the division algorithm. When no regrouping is needed the storey route is faster on the page ($1\\tfrac{2}{7} + 2\\tfrac{3}{7} = 3\\tfrac{5}{7}$, parts staying under the whole); when regrouping happens twice, the improper route often outruns it.',
        },
        { kind: 'heading', text: 'Egyptian openings: two-term sums' },
        {
          kind: 'para',
          text: 'Lesson 4.1 buried a promise in its history corner: the Egyptian scribes wrote every fraction (except $\\tfrac{2}{3}$) as a **sum of distinct unit fractions**, and $\\tfrac{3}{10} = \\tfrac{1}{4} + \\tfrac{1}{20}$ was banked there for this lesson. The machinery is now on the table, because finding such a split is an exercise in *comparison plus subtraction*. The **greedy split** takes the largest unit fraction that fits under the target, and the remainder — found by subtraction on a common ruler — is often a unit fraction already.',
        },
        {
          kind: 'example',
          title: 'Split 3/10 as a two-term Egyptian sum — the greedy opening',
          steps: [
            'Now, find the largest unit fraction below $\\tfrac{3}{10}$ by comparison: $\\tfrac{1}{3} > \\tfrac{3}{10}$ ($10 > 9$) fails, but $\\tfrac{1}{4} < \\tfrac{3}{10}$ ($12 > 10$) fits — the greedy choice is $\\tfrac{1}{4}$.',
            'So subtract on the common ruler $20$: $\\tfrac{3}{10} - \\tfrac{1}{4} = \\tfrac{6}{20} - \\tfrac{5}{20} = \\tfrac{1}{20}$ — the remainder is already unit.',
            'Check the split by adding back: $\\tfrac{1}{4} + \\tfrac{1}{20} = \\tfrac{5}{20} + \\tfrac{1}{20} = \\tfrac{6}{20} = \\tfrac{3}{10}$, and the two unit fractions are distinct as Egyptian style demands.',
            'Hence $\\tfrac{3}{10} = \\tfrac{1}{4} + \\tfrac{1}{20}$ — the promise of Lesson 4.2 paid in two moves: one comparison, one subtraction.',
          ],
        },
        {
          kind: 'para',
          text: 'The greedy split is not the only opening — $\\tfrac{3}{10} = \\tfrac{1}{5} + \\tfrac{1}{10}$ is equally Egyptian ($\\tfrac{2}{10} + \\tfrac{1}{10}$, the numerator $3$ split as $2 + 1$) but not greedy, since $\\tfrac{1}{4}$ is larger and still fits. Nor is two terms always enough: on $\\tfrac{5}{6}$ the greedy choice $\\tfrac{1}{2}$ leaves $\\tfrac{5}{6} - \\tfrac{1}{2} = \\tfrac{1}{3}$ — two terms, done; other targets leave non-unit remainders that need a second greedy pass. What the method always delivers is a *procedure*: compare to pin the opening, subtract to name the remainder, repeat. The remainders shrink as the ladder of unit fractions steps down — $\\tfrac{1}{20} < \\tfrac{1}{4}$ — which is why the process terminates and why Egyptian tables could be built at all.',
        },
        { kind: 'heading', text: 'Putting it to work' },
        {
          kind: 'para',
          text: 'From the above discussion, the methods collect into one table — six recurring situations, six routes, each with its worked instance from this lesson:',
        },
        {
          kind: 'table',
          head: ['Situation', 'Route', 'Worked instance', 'Result'],
          rows: [
            ['Same ruler (like fractions)', 'add or subtract the counts, then simplify', '2/9 + 4/9 = 6/9', '= 2/3'],
            ['One ruler a multiple of the other', 'raise only the smaller denominator', '3/5 + 7/10 = 6/10 + 7/10', '= 13/10 = 1 3/10'],
            ['Unlike rulers', 'raise both to the LCM (or the product)', '7/12 + 3/10 = 35/60 + 18/60', '= 53/60'],
            ['A list of three or more', 'one ruler for the whole list', '1/2 + 1/3 + 1/9 on the 18-ruler: 9 + 6 + 2', '= 17/18'],
            ['From the whole', 'complement: d/d − a/d = (d − a)/d', '1 − (1/4 + 2/5) = 20/20 − 13/20', '= 7/20'],
            ['Mixed numbers', 'storeys first; regroup the overflow or underflow', '3 1/5 − 1 2/5 = 2 6/5 − 1 2/5', '= 1 4/5'],
          ],
        },
        {
          kind: 'equation',
          latex: '\\frac{a}{d} \\pm \\frac{c}{d} = \\frac{a \\pm c}{d} \\qquad \\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a k_1 \\pm c k_2}{R}, \\; R = \\mathrm{LCM}(b, d) \\qquad 1 - \\frac{a}{d} = \\frac{d - a}{d}',
          note: 'The three arithmetic laws on one line: like rulers operate on their counts; unlike rulers rise to the LCM and let the raised counts do the work; and the whole surrenders its complement in one move. Mixed numbers run the storeys separately, regrouping across the boundary as needed.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Addition and subtraction in the exam hall',
          text: 'The exam shapes repeat. (i) *Remainder items* — "spends $\\tfrac{1}{4}$ on rent and $\\tfrac{2}{5}$ on food": add the spent fractions, then subtract from $1$ via the complement ($1 - \\tfrac{13}{20} = \\tfrac{7}{20}$). (ii) *Fill-and-empty items* — tanks, pipes, journeys: combine the filled fractions and read the empty part as the complement; the two must add to $1$. (iii) *Mixed-number quantities* — lengths and weights: storeys with regrouping, or the improper route as a check. The LCMs of small denominator sets — $12$, $20$, $24$, $60$ — are worth knowing on sight; chapter 3\'s Euclid finds any that are not.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: '3/11 + 5/11 = ?',
              options: [
                '8/22 — add the numerators and the denominators',
                '8/11 — eleven pieces each, so three plus five of them',
                '15/11 — multiply the numerators',
                '8/121 — add across both storeys',
              ],
              answer: 1,
              explain:
                'Like fractions: the ruler is shared, so the counts pool, 3 + 5 = 8, and the denominator rides through (Option 2). Option 1 is the straight-across fraud — and its victim 8/22 = 4/11 is exactly half the true sum, twice as many pieces of half the size... of the same ruler, which no move licenses. Option 3 invents a multiplication the rule never sold. Option 4 doubles the denominator as if the pieces shrank during addition — the piece size is fixed by the shared ruler.',
            },
            {
              q: '1/4 + 1/6 = ?',
              options: [
                '2/10 = 1/5 — add straight across',
                '1/12 — take the smaller piece',
                '5/12 — the LCM 12 raises both: 3/12 + 2/12',
                '5/24 — raise both to the product 24 and halve',
              ],
              answer: 2,
              explain:
                'Unlike rulers need one common ruler: LCM(4, 6) = 12, and the raised counts 3 + 2 = 5 give 5/12 (Option 3). Option 1 is the mediant fraud — 1/5 sits strictly between the addends (1/6 < 1/5 < 1/4), Lesson 4.3\'s theorem in action, and below the true sum. Option 2 names a piece size, not an amount. Option 4 actually computes 10/24 = 5/12 in disguise and then mislabels it: 6/24 + 4/24 = 10/24, which simplifies to 5/12 — the 24-ruler was legal, the halving was not.',
            },
            {
              q: '7/8 − 5/8 = ?',
              options: [
                '2/16 — subtract the denominators too',
                '2/8 — and it must stay, because differences are never simplified',
                '1/4 — 2/8 simplifies by its HCF, 2',
                '3/8 — round the counts first',
              ],
              answer: 2,
              explain:
                'The counts subtract: 7 − 5 = 2, so 2/8 — and then Lesson 4.2\'s one-step simplification finishes the job: HCF(2, 8) = 2, giving 1/4 (Option 3). Option 1 subtracts the piece size, which never changed. Option 2 is the exact half-answer the lesson warns about: a correct count with its atoms left in. Option 4 invents a rounding step that no ruler supports.',
            },
            {
              q: '3 1/5 − 1 2/5 = ?',
              options: [
                '2 1/5 — subtract the parts larger-from-smaller and leave the wholes',
                '1 4/5 — borrow one whole as 5/5: 2 6/5 − 1 2/5',
                '2 4/5 — borrow, but forget the borrowed whole in the final count',
                '1 1/5 — treat the underflow as zero after a wrong borrow',
              ],
              answer: 1,
              explain:
                'The parts underflow (1/5 < 2/5), so one whole is borrowed and paid to the parts: 3 1/5 = 2 6/5, then 2 − 1 = 1 and 6/5 − 2/5 = 4/5 (Option 2). Option 1 flips the illegal subtraction to look legal — 2 1/5 = 11/5 is not 9/5. Option 3 borrows correctly and then forgets to spend the borrowed whole in the wholesale subtraction. The improper route (16/5 − 7/5 = 9/5) arbitrates all three disputes in one line.',
            },
            {
              q: 'The greedy opening of 3/10 — the largest unit fraction that fits beneath it — is:',
              options: [
                '1/4, and the remainder is exactly 1/20: 3/10 − 1/4 = 6/20 − 5/20',
                '1/3, with remainder 1/30',
                '1/5, with remainder 1/10 — a valid Egyptian split, but not the greedy one',
                '1/2, with remainder −1/5',
              ],
              answer: 0,
              explain:
                'Compare: 1/3 > 3/10 (10 > 9), so thirds overshoot; 1/4 < 3/10 (12 > 10) fits — and the subtraction on the 20-ruler leaves exactly 1/20 (Option 1). Option 2 subtracts a fraction larger than the target: 3/10 − 1/3 = −1/30, no gap exists. Option 3 is the honourable non-greedy split 1/5 + 1/10 — correct as Egyptian writing, but 1/4 also fits and is larger, so greed points elsewhere. Option 4 overshoots worse and produces a negative remainder — the sign that the choice was too big.',
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
                  q: 'Compute: (a) 3/13 + 4/13; (b) 9/11 − 4/11; (c) 7/7 − 3/7.',
                  solution: [
                    'Now, all three pairs are like fractions — shared rulers, so the counts do the arithmetic.',
                    'So (a) $\\tfrac{3}{13} + \\tfrac{4}{13} = \\tfrac{7}{13}$ ($3 + 4 = 7$); (b) $\\tfrac{9}{11} - \\tfrac{4}{11} = \\tfrac{5}{11}$ ($9 - 4 = 5$).',
                    'And (c): the whole is $\\tfrac{7}{7}$, so $\\tfrac{7}{7} - \\tfrac{3}{7} = \\tfrac{4}{7}$ — the complement of $\\tfrac{3}{7}$.',
                    'Hence (a) $\\tfrac{7}{13}$, (b) $\\tfrac{5}{11}$, (c) $\\tfrac{4}{7}$ — each already in lowest terms, no atoms to clear.',
                  ],
                  answer: '(a) 7/13; (b) 5/11; (c) 4/7',
                },
                {
                  q: 'Add 5/10 + 3/10, and give the answer in lowest terms.',
                  solution: [
                    'Now, the ruler is shared: the counts pool, $5 + 3 = 8$, so the sum is $\\tfrac{8}{10}$.',
                    'So simplify before celebrating: $\\gcd(8, 10) = 2$, and one division gives $\\tfrac{8}{10} = \\tfrac{4}{5}$.',
                    'Hence $\\tfrac{5}{10} + \\tfrac{3}{10} = \\tfrac{4}{5}$ — the count 8 was honest but carried the atom $2$.',
                  ],
                  answer: '4/5 (8/10 simplified by the HCF 2)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Add 3/5 + 7/10, and read the answer both as an improper fraction and as a mixed number.',
                  solution: [
                    'Now, the rulers differ, but $10$ is a multiple of $5$ — only the fifths need raising.',
                    'So $\\tfrac{3}{5} = \\tfrac{6}{10}$, and the counts pool on the ten-ruler: $\\tfrac{6}{10} + \\tfrac{7}{10} = \\tfrac{13}{10}$.',
                    'Next, read it both ways: $\\tfrac{13}{10}$ is improper ($13 > 10$), and the division algorithm splits it — $13 = 1 \\times 10 + 3$ — into $1\\tfrac{3}{10}$.',
                    'Hence $\\tfrac{3}{5} + \\tfrac{7}{10} = \\tfrac{13}{10} = 1\\tfrac{3}{10}$ — the sum passed the whole, as sums may.',
                  ],
                  answer: '13/10 = 1 3/10 (on the ten-ruler: 6 + 7 = 13)',
                },
                {
                  q: 'Subtract 5/6 − 1/2.',
                  solution: [
                    'Now, halves and sixths: $6$ is a multiple of $2$, so $\\tfrac{1}{2} = \\tfrac{3}{6}$ and the six-ruler serves both.',
                    'So $\\tfrac{5}{6} - \\tfrac{3}{6} = \\tfrac{2}{6}$.',
                    'Next, simplify: $\\gcd(2, 6) = 2$, so $\\tfrac{2}{6} = \\tfrac{1}{3}$.',
                    'Hence $\\tfrac{5}{6} - \\tfrac{1}{2} = \\tfrac{1}{3}$ — the gap, named on the six-ruler and cleaned by the atoms.',
                  ],
                  answer: '1/3 (5/6 − 3/6 = 2/6 = 1/3)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Add 2/3 + 1/4 on the smallest legal ruler; name the ruler.',
                  solution: [
                    'Now, the smallest legal ruler is $\\mathrm{LCM}(3, 4) = 12$ — the product $12$ here, since $3$ and $4$ share no factor.',
                    'So raise each: $\\tfrac{2}{3} = \\tfrac{8}{12}$ (by $4$) and $\\tfrac{1}{4} = \\tfrac{3}{12}$ (by $3$).',
                    'Now the counts pool: $\\tfrac{8}{12} + \\tfrac{3}{12} = \\tfrac{11}{12}$, and $\\gcd(11, 12) = 1$.',
                    'Hence $\\tfrac{2}{3} + \\tfrac{1}{4} = \\tfrac{11}{12}$ on the twelve-ruler — one short of the whole, as the complement would say: $1 - \\tfrac{11}{12} = \\tfrac{1}{12}$ left over.',
                  ],
                  answer: '11/12 (on the 12-ruler: 8/12 + 3/12)',
                },
                {
                  q: 'A water tank is 1/3 full. After another 1/4 of the tank is poured in, what fraction is full — and what fraction is still empty?',
                  solution: [
                    'Now, combine on the common ruler $12$: $\\tfrac{1}{3} = \\tfrac{4}{12}$ and $\\tfrac{1}{4} = \\tfrac{3}{12}$.',
                    'So the filled part is $\\tfrac{4}{12} + \\tfrac{3}{12} = \\tfrac{7}{12}$.',
                    'Next, the empty part is the complement: $1 - \\tfrac{7}{12} = \\tfrac{12}{12} - \\tfrac{7}{12} = \\tfrac{5}{12}$.',
                    'Hence the tank is $\\tfrac{7}{12}$ full and $\\tfrac{5}{12}$ empty — and the free check holds: $\\tfrac{7}{12} + \\tfrac{5}{12} = 1$.',
                  ],
                  answer: '7/12 full, 5/12 empty (4/12 + 3/12; the parts add to the whole)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'exam-style: A salary spends 1/4 on rent and 2/5 on food. What fraction of the salary remains?',
                  solution: [
                    'Now, the spent fractions first, on the common ruler $\\mathrm{LCM}(4, 5) = 20$: $\\tfrac{1}{4} = \\tfrac{5}{20}$ and $\\tfrac{2}{5} = \\tfrac{8}{20}$.',
                    'So total spent: $\\tfrac{5}{20} + \\tfrac{8}{20} = \\tfrac{13}{20}$.',
                    'Next, the remainder is the complement: $1 - \\tfrac{13}{20} = \\tfrac{20}{20} - \\tfrac{13}{20} = \\tfrac{7}{20}$, already lowest ($\\gcd(7, 20) = 1$).',
                    'Hence $\\tfrac{7}{20}$ of the salary remains — spend, complement, done: the exam shape of subtraction from the whole.',
                  ],
                  answer: '7/20 remains (1/4 + 2/5 = 13/20 spent; complement 7/20)',
                },
                {
                  q: 'Add 2 3/4 + 1 1/2 two ways — by storeys with regrouping, and by improper conversion.',
                  solution: [
                    'Now, the storey route: wholes $2 + 1 = 3$; parts $\\tfrac{3}{4} + \\tfrac{1}{2} = \\tfrac{3}{4} + \\tfrac{2}{4} = \\tfrac{5}{4}$ — an overflow.',
                    'So regroup: $\\tfrac{5}{4} = 1\\tfrac{1}{4}$, one whole carried up — $3 + 1 = 4$ wholes with $\\tfrac{1}{4}$ below.',
                    'Or the improper route: $2\\tfrac{3}{4} = \\tfrac{11}{4}$ and $1\\tfrac{1}{2} = \\tfrac{6}{4}$, so $\\tfrac{11}{4} + \\tfrac{6}{4} = \\tfrac{17}{4}$, and $17 = 4 \\times 4 + 1$ reads back as $4\\tfrac{1}{4}$.',
                    'Hence $2\\tfrac{3}{4} + 1\\tfrac{1}{2} = 4\\tfrac{1}{4}$ by both routes — the overflow carried honestly in each.',
                  ],
                  answer: '4 1/4 (storeys: 3 + 1 1/4; improper: 17/4 = 4 1/4)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Add 1/2 + 1/3 + 1/9 on the smallest common ruler.',
                  solution: [
                    'Now, the smallest ruler for all three is $\\mathrm{LCM}(2, 3, 9) = 18$ — eighteen covers $2$, $3$ and $9$ and no smaller number does.',
                    'So raise each: $\\tfrac{1}{2} = \\tfrac{9}{18}$ (by $9$), $\\tfrac{1}{3} = \\tfrac{6}{18}$ (by $6$), $\\tfrac{1}{9} = \\tfrac{2}{18}$ (by $2$).',
                    'Now pool all three counts: $\\tfrac{9}{18} + \\tfrac{6}{18} + \\tfrac{2}{18} = \\tfrac{17}{18}$, and $\\gcd(17, 18) = 1$.',
                    'Hence $\\tfrac{1}{2} + \\tfrac{1}{3} + \\tfrac{1}{9} = \\tfrac{17}{18}$ — one ruler, three raisings, and the complement $\\tfrac{1}{18}$ is all the whole has left.',
                  ],
                  answer: '17/18 (on the 18-ruler: 9 + 6 + 2)',
                },
                {
                  q: 'Compute 5/6 − 1/4 + 1/12, and give the answer in lowest terms.',
                  solution: [
                    'Now, one ruler serves the whole chain: $\\mathrm{LCM}(6, 4, 12) = 12$.',
                    'So raise each term: $\\tfrac{5}{6} = \\tfrac{10}{12}$ (by $2$), $\\tfrac{1}{4} = \\tfrac{3}{12}$ (by $3$), $\\tfrac{1}{12}$ stays.',
                    'Now read left to right: $\\tfrac{10}{12} - \\tfrac{3}{12} + \\tfrac{1}{12} = \\tfrac{8}{12}$.',
                    'Hence $\\tfrac{8}{12} = \\tfrac{2}{3}$ after the HCF $4$ — a chain of unlike rulers collapsed onto one and swept clean by the atoms.',
                  ],
                  answer: '2/3 (10/12 − 3/12 + 1/12 = 8/12 = 2/3)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the like-ruler rule: for whole numbers a, c and positive d, a/d + c/d = (a+c)/d — using what a/d means and the distributive law.',
                  solution: [
                    'Licence: $\\tfrac{a}{d}$ means $a$ copies of the piece $\\tfrac{1}{d}$ — the fraction-of-a-quantity reading of Lesson 4.1.',
                    'Now, $\\tfrac{a}{d} + \\tfrac{c}{d} = a \\cdot \\tfrac{1}{d} + c \\cdot \\tfrac{1}{d}$ — both addends are multiples of one and the same piece.',
                    'So the distributive law of Lesson 2.2 pools the copies: $a \\cdot \\tfrac{1}{d} + c \\cdot \\tfrac{1}{d} = (a + c) \\cdot \\tfrac{1}{d} = \\tfrac{a + c}{d}$.',
                    'Hence $\\tfrac{a}{d} + \\tfrac{c}{d} = \\tfrac{a + c}{d}$ — the denominator never entered the arithmetic because the piece size never changed; the rule is distributivity wearing a vinculum. □',
                  ],
                  answer: 'a/d + c/d = (a+c)/d (a copies plus c copies of 1/d, pooled by distributivity)',
                },
                {
                  q: 'Prove the straight-across fraud theorem: for positive fractions, a/b + c/d > (a+c)/(b+d) — the true sum always beats the mediant — and state where the mediant lands relative to the addends.',
                  solution: [
                    'Licence: for positive denominators, $\\tfrac{x}{y} < \\tfrac{z}{w} \\iff xy \\cdot w < y \\cdot zw$ — the cross-multiplication test of Lesson 4.2.',
                    'Now, the true sum is $\\tfrac{ad + bc}{bd}$; compare it with the mediant $\\tfrac{a + c}{b + d}$ cross-wise: $(ad + bc)(b + d)$ against $(a + c)bd$.',
                    'So expand: $(ad + bc)(b + d) = abd + ad^2 + b^2c + bcd$, while $(a + c)bd = abd + bcd$ — the difference is $ad^2 + b^2c$, strictly positive since all parts are.',
                    'Hence $(ad + bc)(b + d) > (a + c)bd$, so $\\tfrac{a}{b} + \\tfrac{c}{d} > \\tfrac{a + c}{b + d}$ always — and by the mediant ordering of Lesson 4.3, the loser sits strictly between the addends ($\\tfrac{1}{3} < \\tfrac{2}{5} < \\tfrac{1}{2}$ for the classic fraud). The straight-across answer is not merely wrong; it is trapped between the values it should join. □',
                  ],
                  answer: 'a/b + c/d > (a+c)/(b+d) always (difference ad² + b²c > 0); the mediant lands strictly between the addends',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The ruler that joined pieces for comparison now runs the arithmetic itself: like rulers pool their counts, unlike rulers rise to the LCM and pool the raised counts, gaps become differences, and complements name what the whole still owes. Two debts were paid on the way — Lesson 4.3\'s extra twenty-fourth now stands as a subtraction, and the Egyptian two-term openings promised twice over are a comparison and a subtraction long. One operation set remains to make the fraction line fully arithmetical: multiplication and division, where fractions stop being pooled and start scaling each other — and where the HCF and LCM-of-fractions shortcuts banked from the reference shelf since Lesson 4.1 finally take the stage. Lesson 4.5 opens there.',
        },
      ],
    },
    {
      id: 'fm-multiplying-dividing-fractions',
      number: '4.5',
      title: 'Multiplying and Dividing Fractions',
      concepts: [
        "Multiplication as 'of'",
        'The multiplying rule ac/bd',
        'Multiplication as scaling',
        'Cross-cancellation before multiplying',
        'The reciprocal',
        'The division theorem',
        'HCF and LCM of fractions',
        'Improper conversion before operating',
      ],
      objectives: [
        "Multiply fractions straight across and simplify, read 'of' chains left to right, and cancel atoms before multiplying to keep every count small",
        'Predict what multiplication does to size — proper multipliers shrink, improper ones grow, 1 holds — and verify the commutative, associative, identity and zero laws on fractions',
        'Divide by any fraction through the reciprocal theorem, with the bd-ruler measurement count as the proof and the sharing reading as the small-divisor check',
        'Compute the HCF and LCM of fractions with the banked shortcuts, push mixed numbers through the improper conversion, and settle exam word problems of the bottle, tank and ribbon families',
      ],
      prerequisites: [
        'fm-idea-of-a-fraction',
        'fm-equivalent-fractions-simplification',
        'fm-adding-subtracting-fractions',
        'fm-hcf-lcm-and-how-they-relate',
      ],
      sources: ['khattar-qa-4e', 'ncert-math7-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 4.4 closed with a promise: one operation set remained to make the fraction line fully arithmetical — multiplication and division, where fractions stop being pooled and start scaling each other. Everything so far ran on a single move: get both fractions onto one ruler, so the counts can pool. This lesson breaks the pattern, and the break is the point. Multiplication needs **no common ruler at all** — because it does not pool pieces; it **re-cuts** them. The questions change shape once more: no longer "how much together?", but "how much is $\\tfrac{2}{3}$ **of** $\\tfrac{3}{4}$?" and "how many eighth-pieces fit in three quarters?"',
        },
        {
          kind: 'para',
          text: 'The word **of** carries the whole lesson. Take half **of** the shaded three quarters: the shaded amount is three quarter-pieces, and halving cuts every piece in two — three shaded quarters become six shaded eighths, and $\\tfrac{6}{8} = \\tfrac{3}{8}$. Nothing was pooled, no LCM was summoned; the new ruler simply has $2 \\times 4 = 8$ pieces and the shaded count is $1 \\times 3 = 3$. Multiplying by a fraction re-cuts the ruler and thins the count — denominators multiply, numerators multiply — and every result of this lesson grows from that one picture.',
        },
        { kind: 'heading', text: "Multiplication as 'of': the re-cutting reading" },
        {
          kind: 'para',
          text: 'In whole-number land, "$\\tfrac{3}{4}$ of $56$" meant the fraction-of-a-quantity reading of Lesson 4.1: divide 56 into 4 shares, take 3 — and Lesson C\'s arithmetic delivered $3 \\times 56 \\div 4 = 42$. Now both factors can be fractions, and the same phrase does the same work: $\\tfrac{1}{2}$ of $\\tfrac{3}{4}$ means cut every piece of the three quarters into $2$, keep $1$ from each pair. The general statement deserves its formal dress:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Multiplying fractions',
          text: 'For positive denominators $b$ and $d$, the product of $\\tfrac{a}{b}$ and $\\tfrac{c}{d}$ is said to be the fraction with numerator $a \\times c$ and denominator $b \\times d$: $\\tfrac{a}{b} \\times \\tfrac{c}{d} = \\tfrac{ac}{bd}$. Thus, $\\tfrac{1}{2} \\times \\tfrac{3}{4} = \\tfrac{3}{8}$ and $\\tfrac{2}{3} \\times \\tfrac{4}{5} = \\tfrac{8}{15}$ — the denominators multiply into the new ruler, the numerators multiply into the new count. In symbols the rule is the very "straight across" that Lesson 4.4 forbade for addition — legal here, because re-cutting never asked the two factors to share a piece size.',
        },
        {
          kind: 'para',
          text: 'For example, the rule settles a first run of products at sight:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\tfrac{1}{2} \\times \\tfrac{1}{3} = \\tfrac{1}{6}$ — half of a third is a sixth: cutting thirds in half builds sixths;',
            '$\\tfrac{2}{5} \\times \\tfrac{3}{4} = \\tfrac{6}{20} = \\tfrac{3}{10}$ — six cells of the twenty-ruler, simplified by the atom $2$;',
            '$\\tfrac{3}{4} \\times \\tfrac{2}{9} = \\tfrac{6}{36} = \\tfrac{1}{6}$ — the atom $6$ clears itself at the end.',
          ],
        },
        {
          kind: 'para',
          text: 'The rule deserves its proof, and the rulers supply it — no common ruler between the *factors* is ever needed, because the second factor\'s own ruler does the cutting while the first does the choosing:',
        },
        {
          kind: 'derivation',
          title: 'Why the multiplying rule holds',
          statement:
            'Claim: for positive denominators, $\\tfrac{a}{b} \\times \\tfrac{c}{d} = \\tfrac{ac}{bd}$. The argument reads the product as $\\tfrac{a}{b}$ of $\\tfrac{c}{d}$ and tracks the shaded pieces through one re-cutting.',
          steps: [
            {
              label: 'Set the scene on the d-ruler',
              formula: '\\tfrac{c}{d} \\;=\\; c \\text{ shaded pieces of the } d \\text{-ruler}',
              explanation:
                'The fraction c/d is c shaded cells of a ruler cut into d equal pieces — the part–whole reading of Lesson 4.1. Nothing is done to the amount yet; it is only placed on the table.',
            },
            {
              label: 'Cut every piece into b sub-pieces',
              formula: 'd \\text{ pieces} \\;\\to\\; b \\times d = bd \\text{ sub-pieces}',
              explanation:
                'Cutting each of the d pieces into b equal parts rebuilds the ruler as the bd-ruler. The shaded c pieces become c × b = bc shaded sub-pieces — the same amount under a new name, since bc/bd = c/d by the multiplying rule of Lesson 4.2.',
            },
            {
              label: 'Take a of every b shaded sub-pieces',
              formula: 'a \\times c \\text{ shaded sub-pieces survive}',
              explanation:
                'Taking a/b of the shaded amount means keeping a out of every group of b. The bc shaded sub-pieces fall into c blocks of b (one block per original shaded piece), and a from each block survives: a × c shaded sub-pieces.',
            },
            {
              label: 'Read the result off the bd-ruler',
              formula: '\\tfrac{a \\times c}{b \\times d} \\;=\\; \\tfrac{ac}{bd}',
              explanation:
                'The survivors sit on the bd-ruler, so their amount is ac/bd. No step used a shared piece size between the two factors — the second factor supplied the ruler, the first supplied the sieve.',
            },
          ],
          result:
            'a/b × c/d = ac/bd. Multiplying fractions re-cuts the second factor\'s ruler and sieves the shaded count — denominators multiply, numerators multiply, and no common ruler ever enters.',
        },
        {
          kind: 'example',
          title: 'Take 2/3 of 3/4 — the re-cutting, watched piece by piece',
          steps: [
            'Now, "of" is the multiplication: $\\tfrac{2}{3}$ of $\\tfrac{3}{4} = \\tfrac{2}{3} \\times \\tfrac{3}{4}$ — keep two of every three pieces of the shaded three quarters.',
            'So cut every quarter into $3$: the four-ruler becomes the twelve-ruler, and the $3$ shaded quarters become $3 \\times 3 = 9$ shaded twelfths — the same amount renamed, since $\\tfrac{9}{12} = \\tfrac{3}{4}$.',
            'Next, keep $2$ of every $3$ shaded twelfths: the $9$ shaded twelfths fall into $3$ blocks of $3$, and $2 \\times 3 = 6$ shaded twelfths survive.',
            'Hence $\\tfrac{2}{3} \\times \\tfrac{3}{4} = \\tfrac{6}{12} = \\tfrac{1}{2}$ — half a whole — and the rule agrees in one line: $\\tfrac{2 \\times 3}{3 \\times 4} = \\tfrac{6}{12}$.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Multiplication re-cuts in two directions at once. The rectangle is cut into 5 columns (fifths) and 3 rows (thirds). Shading 3 columns shows 3/5; shading 2 rows shows 2/3. The overlap — doubly shaded — covers 2 × 3 = 6 of the 15 equal cells: 2/3 × 3/5 = 6/15 = 2/5. The rows supplied the sieve (2 of every 3), the columns supplied the ruler (5 pieces), and the product needs no common ruler at all.',
          svg: `<svg viewBox="0 0 760 490" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle cut into 5 columns and 3 rows with 3 columns and 2 rows shaded, their 6-cell overlap showing 2/3 of 3/5 = 6/15 = 2/5">
  <g font-size="13" fill="currentColor">
    <text x="70" y="40">cut into 5 columns — 3 shaded: 3/5</text>
    <rect x="70" y="60" width="620" height="300" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <g fill="#b45309" opacity="0.18">
      <rect x="70" y="60" width="372" height="300"/>
    </g>
    <g fill="#78350f" opacity="0.12">
      <rect x="70" y="60" width="620" height="200"/>
    </g>
    <rect x="70" y="60" width="372" height="200" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="4 4"/>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="194" y1="60" x2="194" y2="360"/>
      <line x1="318" y1="60" x2="318" y2="360"/>
      <line x1="442" y1="60" x2="442" y2="360"/>
      <line x1="566" y1="60" x2="566" y2="360"/>
      <line x1="70" y1="160" x2="690" y2="160"/>
      <line x1="70" y1="260" x2="690" y2="260"/>
    </g>
    <text x="706" y="215" font-weight="700">3/5</text>
    <text x="70" y="400">the overlap: 2 rows × 3 columns = 6 cells of 15</text>
    <text x="380" y="440" text-anchor="middle" font-weight="700">the doubly shaded cells are the product: 2/3 × 3/5 = 6/15 = 2/5</text>
  </g>
</svg>`,
        },

        { kind: 'heading', text: 'What multiplication does to size' },
        {
          kind: 'para',
          text: 'Whole-number arithmetic trained a reflex: multiplying makes bigger. Fraction land retires the reflex. Multiplying by $\\tfrac{1}{2}$ **halves** — $\\tfrac{1}{2} \\times \\tfrac{3}{4} = \\tfrac{3}{8}$, well left of where the walk started. The honest reading is **scaling**: multiplying any amount by $\\tfrac{a}{b}$ stretches it when $a > b$, compresses it when $a < b$, and holds it when $a = b$. The number-line picture is exact — multiplying by $\\tfrac{3}{4}$ carries every point three quarters of the way toward $0$. A product of two proper fractions shrinks below **both** factors: $\\tfrac{2}{3} \\times \\tfrac{4}{5} = \\tfrac{8}{15}$, and $\\tfrac{8}{15} < \\tfrac{2}{3}$ as $\\tfrac{10}{15}$ and $\\tfrac{8}{15} < \\tfrac{4}{5}$ as $\\tfrac{12}{15}$ — the count thinned twice.',
        },
        {
          kind: 'para',
          text: 'The laws that governed addition climb intact, because multiplying counts is still whole-number arithmetic — the verified instances say so:',
        },
        {
          kind: 'list',
          items: [
            '**Commutative**: $\\tfrac{2}{3} \\times \\tfrac{3}{5} = \\tfrac{3}{5} \\times \\tfrac{2}{3} = \\tfrac{2}{5}$ — the sieve and the ruler may swap jobs, the product does not move;',
            '**Associative**: $(\\tfrac{1}{2} \\times \\tfrac{2}{5}) \\times \\tfrac{3}{4} = \\tfrac{1}{5} \\times \\tfrac{3}{4} = \\tfrac{3}{20}$ and $\\tfrac{1}{2} \\times (\\tfrac{2}{5} \\times \\tfrac{3}{4}) = \\tfrac{1}{2} \\times \\tfrac{3}{10} = \\tfrac{3}{20}$ — grouped either way, the same cells survive;',
            '**Identity 1**: $\\tfrac{5}{9} \\times 1 = \\tfrac{5}{9}$ — the multiplier that re-cuts nothing; every other multiplier moves the point;',
            '**Zero**: $\\tfrac{5}{9} \\times 0 = 0$ — the sieve that keeps nothing.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Two frauds, one lesson apart',
          text: 'Lesson 4.4\'s straight-across fraud is now a truth: $\\tfrac{2}{3} \\times \\tfrac{3}{5} = \\tfrac{2 \\times 3}{3 \\times 5} = \\tfrac{2}{5}$ is exactly right — multiplying straight across is the rule, and the mediant trap only ever threatened sums. But a new fraud takes its place: hunting a common ruler for a product. $\\tfrac{2}{3} \\times \\tfrac{3}{5}$ needs no LCM; $\\tfrac{2}{3} + \\tfrac{3}{5}$ does. Re-cutting shares no pieces, so it never asks for equal ones — and "$\\tfrac{2}{3} \\times \\tfrac{3}{5} = \\tfrac{5}{8}$" (numerators and denominators *added*) is addition\'s fraud wearing multiplication\'s clothes. The two operations share nothing across the sign: pool on one ruler, or re-cut both — never both at once.',
        },
        {
          kind: 'para',
          text: "Chains of 'of' run left to right, one sieve at a time: $\\tfrac{3}{4}$ of $\\tfrac{2}{5}$ of $400$ is $\\tfrac{2}{5}$ of $400 = 160$, then $\\tfrac{3}{4}$ of $160 = 120$ — the tank drained in two moves, no combined fraction ever formed. And the atoms of Lesson 4.2 now cross the multiplication sign legally: cancelling a numerator against a *denominator* divides both by the same number, so the product is unchanged. Cancelling across **addition** was never licensed; across **multiplication** it is standard professional practice, and the next Illustration runs both routes side by side.",
        },
        {
          kind: 'example',
          title: 'Multiply 5/6 × 3/10 — brute force and the cancelled route',
          steps: [
            'Now, the brute route: $\\tfrac{5}{6} \\times \\tfrac{3}{10} = \\tfrac{5 \\times 3}{6 \\times 10} = \\tfrac{15}{60}$.',
            'So simplify the result: $\\gcd(15, 60) = 15$, and one division gives $\\tfrac{15}{60} = \\tfrac{1}{4}$.',
            'Or cancel before multiplying: the atom $5$ divides the $10$ and the atom $3$ divides the $6$ — $\\tfrac{5}{6} \\times \\tfrac{3}{10} = \\tfrac{1}{2} \\times \\tfrac{1}{2} = \\tfrac{1}{4}$, licensed because each cancellation divides a numerator and a denominator by the same number.',
            'Hence $\\tfrac{5}{6} \\times \\tfrac{3}{10} = \\tfrac{1}{4}$ — the same verdict either way, but the cancelled route never touched a two-digit count: simplify early, multiply small.',
          ],
        },
        {
          kind: 'formula',
          name: 'The multiplying rule',
          latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}',
          note: 'No common ruler is ever needed: multiplication re-cuts the second factor\'s ruler and sieves the count by the first. Simplify before or after — cancelling a numerator against a denominator across the × sign is licensed; across + it never was. Proper multipliers shrink, improper ones grow, 1 holds, 0 empties.',
        },
        { kind: 'heading', text: 'Division and the reciprocal' },
        {
          kind: 'para',
          text: 'Division asks two questions, and both survive the climb into fractions. The **sharing** reading — $\\tfrac{1}{2} \\div 3$ splits half a roti into three equal shares — delivers $\\tfrac{1}{2} \\times \\tfrac{1}{3} = \\tfrac{1}{6}$: dividing by a whole number multiplies by its unit fraction. The **measuring** reading asks how many of one amount fit inside another: $\\tfrac{3}{4} \\div \\tfrac{1}{8}$ asks how many eighth-pieces fit in three quarters. On the eight-ruler the answer is a count: $\\tfrac{3}{4} = \\tfrac{6}{8}$, and six eighth-pieces fit — so $\\tfrac{3}{4} \\div \\tfrac{1}{8} = 6$. Measuring is division\'s native habitat in fraction land, and the general case is a theorem away.',
        },
        {
          kind: 'para',
          text: 'The theorem needs one new object. Multiplication by $\\tfrac{c}{d}$ undoes nothing by itself — but the fraction $\\tfrac{d}{c}$, the same fraction **flipped**, multiplies it back to the whole: $\\tfrac{c}{d} \\times \\tfrac{d}{c} = 1$. Formally:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The reciprocal',
          text: 'A fraction $\\tfrac{a}{b}$ with $a \\neq 0$ is said to have the **reciprocal** $\\tfrac{b}{a}$ — the flip — because $\\tfrac{a}{b} \\times \\tfrac{b}{a} = \\tfrac{ab}{ba} = 1$. Thus, the reciprocal of $\\tfrac{2}{3}$ is $\\tfrac{3}{2}$; the reciprocal of a whole number $n$ is $\\tfrac{1}{n}$ ($n = \\tfrac{n}{1}$ flipped); the reciprocal of the unit fraction $\\tfrac{1}{n}$ is the whole $n$; and the reciprocal of the reciprocal returns the original. The number $0$ has no reciprocal — no number times $0$ gives $1$ — and this absence is exactly why division by zero is forbidden, here and everywhere after.',
        },
        {
          kind: 'derivation',
          title: 'The division theorem',
          statement:
            'Claim: for positive denominators and $c \\neq 0$, $\\tfrac{a}{b} \\div \\tfrac{c}{d} = \\tfrac{a}{b} \\times \\tfrac{d}{c}$. The argument runs the measuring question on the common bd-ruler and watches the theorem fall out.',
          steps: [
            {
              label: 'Raise both fractions to the bd-ruler',
              formula: '\\tfrac{a}{b} = \\tfrac{ad}{bd} \\qquad \\tfrac{c}{d} = \\tfrac{bc}{bd}',
              explanation:
                'The product bd is a legal common ruler for any two denominators (Lesson 4.2), and raising is multiplication by 1 = d/d and 1 = b/b — no new licence is spent, the multiplying rule of this lesson does the work.',
            },
            {
              label: 'Ask the measuring question on one ruler',
              formula: '\\tfrac{ad}{bd} \\div \\tfrac{bc}{bd} \\;=\\; ad \\div bc \\text{ (pieces of one size)}',
              explanation:
                'Once both amounts speak in bd-pieces, "how many bc-pieces fit in ad-pieces" is a ratio of whole counts — and the division face of Lesson 4.1 names it exactly: the fraction ad/bc.',
            },
            {
              label: 'Run the multiply-by-the-reciprocal route',
              formula: '\\tfrac{a}{b} \\times \\tfrac{d}{c} = \\tfrac{ad}{bc}',
              explanation:
                'The multiplying rule applied to a/b and the flipped divisor d/c delivers the very same fraction ad/bc — the same count on the same ruler.',
            },
            {
              label: 'Conclude',
              formula: '\\tfrac{a}{b} \\div \\tfrac{c}{d} = \\tfrac{a}{b} \\times \\tfrac{d}{c}',
              explanation:
                'Both routes answer the same measuring question with the same number, so they are one rule: dividing by a fraction is multiplying by its reciprocal. The flip is not a trick to memorise — it is the measuring count, wearing its shortest name.',
            },
          ],
          result:
            'a/b ÷ c/d = a/b × d/c (c ≠ 0). One flip — the divisor\'s — turns every fraction division into the multiplication this lesson already proved.',
        },
        {
          kind: 'example',
          title: 'Divide 5/6 ÷ 2/3 — the measuring count and the theorem agree',
          steps: [
            'Now, the question: how many two-thirds fit in five sixths?',
            'So measure on the common ruler $12$: $\\tfrac{5}{6} = \\tfrac{10}{12}$ and $\\tfrac{2}{3} = \\tfrac{8}{12}$ — the question becomes: how many $8$-pieces fit in $10$-pieces?',
            'Next, the count: $\\tfrac{10}{8} = \\tfrac{5}{4}$ — five sixths is five quarters of a two-thirds, and the answer need not be a whole number of pieces.',
            'Hence $\\tfrac{5}{6} \\div \\tfrac{2}{3} = \\tfrac{5}{4}$ — and the theorem agrees in one flip: $\\tfrac{5}{6} \\times \\tfrac{3}{2} = \\tfrac{15}{12} = \\tfrac{5}{4}$.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Division measures. The line is cut into eighths (85 px each); 3/4 sits at 550 px, six eighth-steps from 0. The arc spans exactly those six steps — 6 × 85 = 510 px of the 680 px unit — so 3/4 ÷ 1/8 = 6: six eighths fit in three quarters. The theorem says the same in one flip: 3/4 × 8/1 = 24/4 = 6.',
          svg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1 cut into eighths with an arc spanning the six eighth-steps from 0 to 3/4, naming 3/4 divided by 1/8 as 6">
  <g font-size="13" fill="currentColor">
  <line x1="40" y1="170" x2="720" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <path d="M 720 170 l -9 -4 v 8 z" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1" opacity="0.7">
    <line x1="125" y1="164" x2="125" y2="176"/>
    <line x1="210" y1="164" x2="210" y2="176"/>
    <line x1="295" y1="164" x2="295" y2="176"/>
    <line x1="380" y1="164" x2="380" y2="176"/>
    <line x1="465" y1="164" x2="465" y2="176"/>
    <line x1="550" y1="164" x2="550" y2="176"/>
    <line x1="635" y1="164" x2="635" y2="176"/>
  </g>
  <line x1="40" y1="160" x2="40" y2="180" stroke="currentColor" stroke-width="1.5"/>
  <text x="40" y="200" text-anchor="middle" font-weight="700">0</text>
  <line x1="550" y1="158" x2="550" y2="182" stroke="#b45309" stroke-width="1.5"/>
  <text x="550" y="200" text-anchor="middle" font-weight="700">3/4</text>
  <line x1="720" y1="160" x2="720" y2="180" stroke="currentColor" stroke-width="1.5"/>
  <text x="720" y="200" text-anchor="middle" font-weight="700">1</text>
  <path d="M 40 170 A 255 46 0 0 1 550 170" fill="none" stroke="#b45309" stroke-width="1.5"/>
  <text x="295" y="96" text-anchor="middle" font-weight="700">6 × 1/8 = 6 eighth-steps</text>
  <text x="380" y="232" text-anchor="middle" font-weight="700">division measures: 3/4 ÷ 1/8 = 6 — six eighths fit in three quarters</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The scale reading now completes its see-saw. Multiplying by a proper fraction shrank; **dividing** by one enlarges: $\\tfrac{3}{4} \\div \\tfrac{1}{2} = \\tfrac{3}{2}$, well right of $\\tfrac{3}{4}$ — how many halves in three quarters is a bigger count than how much is three quarters. Dividing by an improper fraction shrinks ($\\tfrac{3}{4} \\div \\tfrac{3}{2} = \\tfrac{1}{2}$), and dividing by $1$ holds ($\\tfrac{5}{9} \\div 1 = \\tfrac{5}{9}$). The two operations are mirror moves: multiplying by $\\tfrac{1}{2}$ **is** dividing by $2$ — $\\tfrac{3}{4} \\times \\tfrac{1}{2} = \\tfrac{3}{4} \\div 2 = \\tfrac{3}{8}$ — and dividing undoes multiplying exactly: multiply $\\tfrac{5}{6}$ by $\\tfrac{2}{3}$ and divide the result by $\\tfrac{2}{3}$ again, and $\\tfrac{5}{6}$ returns. The reciprocal is multiplication\'s undo button, which is the whole point of it.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Flip the divisor — only the divisor',
          text: 'The theorem flips one fraction: $\\tfrac{a}{b} \\div \\tfrac{c}{d} = \\tfrac{a}{b} \\times \\tfrac{d}{c}$. Flip the first fraction too — $\\tfrac{2}{1} \\times \\tfrac{1}{6} = \\tfrac{1}{3}$ for $\\tfrac{1}{2} \\div \\tfrac{1}{6}$ — and the answer lands at a third of the truth ($3$, not $\\tfrac{1}{3}$). Flip nothing and divide "straight across", and no rule answers you at all: division of fractions has no straight-across form. And the sharing reading keeps small divisors honest: $\\tfrac{1}{2} \\div 3 = \\tfrac{1}{2} \\times \\tfrac{1}{3} = \\tfrac{1}{6}$ — three shares of half a roti, each a sixth.',
        },
        {
          kind: 'formula',
          name: 'The division theorem',
          latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} \\qquad (c \\neq 0)',
          note: 'Measure or share — then flip the divisor and multiply. The bd-ruler proof: both fractions speak in bd-pieces, the measuring count ad ÷ bc is the fraction ad/bc, and the flipped product a/b × d/c delivers the same ad/bc. Answers need not be whole; dividing by a proper fraction enlarges, by an improper one shrinks.',
        },
        { kind: 'heading', text: 'The HCF and LCM of fractions' },
        {
          kind: 'para',
          text: 'Since Lesson 4.1, the reference shelf has kept two shortcuts banked for exactly this moment: the exam hall asks for the HCF and LCM **of fractions**, and chapter 3\'s machinery — built for whole numbers — generalises cleanly now that division is on the table. The bridge is a definition of "measuring" that makes sense between fractions: a fraction $x$ is said to **measure** a fraction $y$ when $y \\div x$ is a whole number — when $y$ is a whole number of $x$-pieces. Thus $\\tfrac{2}{9}$ measures $\\tfrac{2}{3}$, because $\\tfrac{2}{3} \\div \\tfrac{2}{9} = 3$: three ninth-pieces of size $\\tfrac{2}{9}$ rebuild $\\tfrac{2}{3}$ exactly.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'HCF and LCM of fractions',
          text: 'For fractions in lowest terms, the **HCF** is the largest fraction measuring both, and the **LCM** is the smallest fraction both measure. In symbols, with $\\tfrac{a}{b}$ and $\\tfrac{c}{d}$ in lowest terms: $\\mathrm{HCF}\\left(\\tfrac{a}{b}, \\tfrac{c}{d}\\right) = \\tfrac{\\mathrm{HCF}(a, c)}{\\mathrm{LCM}(b, d)}$ and $\\mathrm{LCM}\\left(\\tfrac{a}{b}, \\tfrac{c}{d}\\right) = \\tfrac{\\mathrm{LCM}(a, c)}{\\mathrm{HCF}(b, d)}$ — the numerators take the chapter-3 operation, the denominators take the opposite one. On the common ruler the reason is visible: measuring runs on the numerators\' divisibility, and the denominators swap roles because a bigger piece size means a smaller count.',
        },
        {
          kind: 'example',
          title: 'Find the HCF and the LCM of 2/3 and 8/9 — and check the product rule',
          steps: [
            'Now, both fractions are in lowest terms ($\\gcd(2, 3) = 1$, $\\gcd(8, 9) = 1$), so the shortcuts apply directly.',
            'So the HCF: $\\tfrac{\\mathrm{HCF}(2, 8)}{\\mathrm{LCM}(3, 9)} = \\tfrac{2}{9}$ — and it measures both: $\\tfrac{2}{3} \\div \\tfrac{2}{9} = \\tfrac{6}{9} \\times \\tfrac{9}{2} = 3$ and $\\tfrac{8}{9} \\div \\tfrac{2}{9} = 4$.',
            'Next, the LCM: $\\tfrac{\\mathrm{LCM}(2, 8)}{\\mathrm{HCF}(3, 9)} = \\tfrac{8}{3}$ — and both measure it: $\\tfrac{8}{3} \\div \\tfrac{2}{3} = 4$ and $\\tfrac{8}{3} \\div \\tfrac{8}{9} = 3$.',
            'Hence the HCF is $\\tfrac{2}{9}$ and the LCM is $\\tfrac{8}{3}$ — and Lesson 3.5\'s product rule survives the climb into fractions intact: $\\tfrac{2}{9} \\times \\tfrac{8}{3} = \\tfrac{16}{27} = \\tfrac{2}{3} \\times \\tfrac{8}{9}$, the product of the two fractions themselves.',
          ],
        },
        {
          kind: 'para',
          text: 'The measuring direction is worth fixing in mind, because the exam options play on it. The HCF $\\tfrac{2}{9}$ sits **below** both fractions — the biggest piece that tiles each an exact whole number of times. The LCM $\\tfrac{8}{3}$ sits **above** both — the smallest amount each can tile an exact whole number of times. And the product rule ties them: HCF $\\times$ LCM $=$ the product of the fractions, exactly as $63 \\times 1260 = 315 \\times 252$ did in Lesson 3.5. The atoms, the containers and their rule all climbed the ladder together.',
        },
        { kind: 'heading', text: 'Mixed numbers: convert, then operate' },
        {
          kind: 'para',
          text: 'Lesson 4.4 gave mixed numbers a storey-by-storey treatment for $+$ and $-$: wholes with wholes, parts with parts, regrouping across the boundary. Multiplication and division get **no such courtesy** — and the reason is structural. The mixed notation $a\\,\\tfrac{c}{d}$ hides a sum: $a + \\tfrac{c}{d}$. Multiplying two hidden sums is legal (distributivity would find all four cross terms) but wasteful bookkeeping; the professional habit converts everything to improper fractions first, operates once, and converts back with the division algorithm.',
        },
        {
          kind: 'example',
          title: 'Multiply 2 1/2 × 1 3/4 — the improper route',
          steps: [
            'Now, convert both factors: $2\\tfrac{1}{2} = \\tfrac{2 \\times 2 + 1}{2} = \\tfrac{5}{2}$ and $1\\tfrac{3}{4} = \\tfrac{1 \\times 4 + 3}{4} = \\tfrac{7}{4}$.',
            'So multiply the impropers: $\\tfrac{5}{2} \\times \\tfrac{7}{4} = \\tfrac{35}{8}$.',
            'Next, read it back with the division algorithm: $35 = 4 \\times 8 + 3$, so $\\tfrac{35}{8} = 4\\tfrac{3}{8}$.',
            'Hence $2\\tfrac{1}{2} \\times 1\\tfrac{3}{4} = 4\\tfrac{3}{8}$ — and the storey route, legal but tangled, must dig up all four cross terms ($2 + \\tfrac{3}{2} + \\tfrac{1}{2} + \\tfrac{3}{8}$) before it agrees.',
          ],
        },
        {
          kind: 'para',
          text: 'Division converts the same way, and the outcome can surprise: $1\\tfrac{1}{2} \\div 2\\tfrac{1}{4} = \\tfrac{3}{2} \\div \\tfrac{9}{4} = \\tfrac{3}{2} \\times \\tfrac{4}{9} = \\tfrac{12}{18} = \\tfrac{2}{3}$ — a quotient that lands **below** $1$, because dividing by a bigger number shrinks. Products of two mixed numbers past $1$ must exceed each factor ($\\tfrac{35}{8} > \\tfrac{5}{2}$ and $> \\tfrac{7}{4}$), but quotients owe no such courtesy: the see-saw of the scale reading keeps every result honest before the arithmetic is checked.',
        },
        {
          kind: 'formula',
          name: 'Mixed numbers under × and ÷',
          latex: 'a\\tfrac{c}{d} = \\frac{ad + c}{d} \\quad \\text{first, always} \\qquad \\text{then } \\times \\text{ or } \\div \\text{ on the impropers}',
          note: 'No storey shortcut exists for multiplication or division: the mixed notation hides a sum, and sums must be resolved before the product or quotient can be formed. Convert with ad + c over d, operate once, convert back with the division algorithm n = q × d + r.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Multiplying rule',
              def: 'The straight-across product: a/b × c/d = ac/bd — denominators multiply into the new ruler, numerators into the new count. No common ruler is ever needed: multiplication re-cuts, it does not pool.',
            },
            {
              term: 'Scaling',
              def: 'What multiplication does to size: multiplying by a/b stretches when a > b, compresses when a < b, holds when a = b. Proper multipliers shrink — "multiplication makes bigger" is retired in fraction land.',
            },
            {
              term: 'Cross-cancellation',
              def: 'Dividing a numerator and the other factor\'s denominator by their common atom BEFORE multiplying, across the × sign: 5/6 × 3/10 = 1/2 × 1/2. Licensed by Lesson 4.2\'s atoms; across a + sign it never was.',
            },
            {
              term: 'Reciprocal',
              def: 'The flip of a/b is b/a, and a/b × b/a = 1. The reciprocal of a whole n is 1/n, of the unit fraction 1/n is n, and of the reciprocal the original. 0 has none — which is exactly why division by 0 is forbidden.',
            },
            {
              term: 'Division theorem',
              def: 'a/b ÷ c/d = a/b × d/c — measure on the common bd-ruler, or flip the divisor and multiply. Only the divisor flips; the answer need not be a whole number of pieces.',
            },
            {
              term: 'Measuring',
              def: 'A fraction x measures y when y ÷ x is a whole number. The HCF of fractions is the largest fraction measuring both; the LCM is the smallest fraction both measure — computed by HCF(a,c)/LCM(b,d) and LCM(a,c)/HCF(b,d) on lowest terms.',
            },
          ],
        },
        { kind: 'heading', text: 'Putting it to work' },
        {
          kind: 'para',
          text: 'From the above discussion, the methods collect into one table — six recurring situations, six routes, each with its worked instance from this lesson:',
        },
        {
          kind: 'table',
          head: ['Situation', 'Route', 'Worked instance', 'Result'],
          rows: [
            ['Fraction × fraction', 'multiply straight across, then simplify', '2/3 × 3/5 = 6/15', '= 2/5'],
            ["An 'of' chain", 'work left to right, one sieve at a time', '3/4 of 2/5 of 400 = 3/4 × 160', '= 120'],
            ['Big counts in sight', 'cancel atoms across the × sign first', '5/6 × 3/10 = 1/2 × 1/2', '= 1/4'],
            ['HCF / LCM of fractions', 'numerators take the operation, denominators the opposite', 'HCF, LCM of 2/3 and 8/9', '= 2/9 and 8/3'],
            ['Fraction ÷ fraction', 'multiply by the divisor\'s reciprocal', '5/6 ÷ 2/3 = 5/6 × 3/2', '= 5/4'],
            ['Mixed numbers', 'convert to improper first — no storey shortcut', '2 1/2 × 1 3/4 = 5/2 × 7/4', '= 35/8 = 4 3/8'],
          ],
        },
        {
          kind: 'equation',
          latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd} \\qquad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} \\qquad \\mathrm{HCF}\\!\\left(\\tfrac{a}{b}, \\tfrac{c}{d}\\right) = \\frac{\\mathrm{HCF}(a,c)}{\\mathrm{LCM}(b,d)}',
          note: 'The three laws of scaling on one line: multiplication re-cuts both rulers at once; division measures by flipping the divisor; and the HCF shortcut rides the same vinculum — numerators take the operation, denominators its partner. Mixed numbers convert first; products of proper fractions shrink; quotients by proper fractions grow.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Multiplication and division in the exam hall',
          text: 'The exam shapes repeat. (i) *\'of\' chains on quantities* — "a tank holds 240 L and is $\\tfrac{2}{3}$ full; $\\tfrac{3}{4}$ of the water is used": $\\tfrac{2}{3} \\times 240 = 160$ L, then $\\tfrac{3}{4} \\times 160 = 120$ L used, $\\tfrac{40}{240} = \\tfrac{1}{6}$ remaining. (ii) *Bottle-and-drum items* — "how many $\\tfrac{3}{4}$-litre bottles fill $\\tfrac{15}{2}$ litres": $(\\tfrac{15}{2}) \\div (\\tfrac{3}{4}) = \\tfrac{15}{2} \\times \\tfrac{4}{3} = 10$ bottles exactly. (iii) *HCF/LCM-of-fractions items* — the banked shortcuts verbatim, both fractions in lowest terms first. (iv) *Reciprocal speed rounds* — $1 \\div \\tfrac{2}{3} = \\tfrac{3}{2}$: dividing $1$ by a fraction hands back its reciprocal, worth knowing on sight. Chapter 3\'s Euclid remains on call for any LCM the eye misses.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: '2/3 × 3/5 = ?',
              options: [
                '5/15 = 1/3 — add the numerators and the denominators',
                '2/5 — multiply straight across: 6/15, then simplify by the atom 3',
                '3/4 — multiply numerators, add denominators',
                '5/2 — multiply and flip the result',
              ],
              answer: 1,
              explain:
                'Multiplication is the operation where straight across is legal: 2 × 3 = 6 over 3 × 5 = 15, and the atom 3 clears to 2/5 (Option 2). Option 1 is Lesson 4.4\'s addition fraud dragged across the sign — sums and products share nothing. Option 3 mixes the two operations in one fraction. Option 4 flips for no reason: flipping is division\'s move, and no division is in sight.',
            },
            {
              q: 'Multiplying 2/7 by which fraction moves the point 2/7 to the LEFT — toward 0?',
              options: [
                '5/3 — an improper multiplier',
                '1 — the identity',
                '3/8 — a proper fraction: 3/8 × 2/7 = 3/28, strictly left of 2/7',
                '8/3 — another improper multiplier',
              ],
              answer: 2,
              explain:
                'Multiplying by a proper fraction compresses: 3/8 × 2/7 = 6/56 = 3/28 < 2/7 (Option 3). Options 1 and 4 are improper multipliers — 10/21 and 16/21 both land right of 2/7. Option 2 holds the point still: the identity does not move anything, so it is not a move to the left at all.',
            },
            {
              q: '1/2 ÷ 1/6 = ?',
              options: [
                '1/12 — multiply the fractions instead of dividing',
                '3 — the theorem: 1/2 × 6/1; three sixths fit in one half',
                '1/3 — flip the first fraction: 2/1 × 1/6',
                '12 — flip both fractions',
              ],
              answer: 1,
              explain:
                'How many sixths in a half? The six-ruler answers by counting: 1/2 = 3/6, three pieces (Option 2). The theorem agrees: 1/2 × 6/1 = 6/2 = 3. Option 1 multiplies when the question asked it to measure. Option 3 flips the wrong fraction — the theorem flips only the divisor. Option 4 flips both fractions — 2/1 × 6/1 = 12 — compounding one wrong flip with a second.',
            },
            {
              q: 'The HCF of 2/3 and 8/9 is:',
              options: [
                '2/9 — HCF(2, 8)/LCM(3, 9), and it measures both: 3 times and 4 times',
                '16/27 — the product of the two fractions',
                '14/9 — their sum, 6/9 + 8/9',
                '8/3 — their LCM',
              ],
              answer: 0,
              explain:
                'The shortcut reads HCF(a, c)/LCM(b, d) = 2/9 (Option 1), and the measuring test confirms: 2/3 = 3 × 2/9 and 8/9 = 4 × 2/9. Option 2 is the product — which is what HCF × LCM returns (Lesson 3.5\'s rule surviving the climb), not the HCF. Option 3 is the sum: the wrong operation family entirely. Option 4 is the LCM — both fractions measure IT (4 and 3 times), the measuring arrow pointing the other way.',
            },
            {
              q: '2 1/2 × 1 3/4 = ?',
              options: [
                '2 3/8 — multiply the storeys separately: 2 × 1 wholes and 1/2 × 3/4',
                '4 1/4 — the sum 2 1/2 + 1 3/4',
                '35/16 — flip the second factor while multiplying',
                '4 3/8 — improper first: 5/2 × 7/4 = 35/8',
              ],
              answer: 3,
              explain:
                '× and ÷ have no storey shortcut: the mixed notation hides a sum, so convert first — 5/2 × 7/4 = 35/8, and 35 = 4 × 8 + 3 reads back as 4 3/8 (Option 4). Option 1 multiplies the storeys separately and loses the cross terms 2 × 3/4 and 1/2 × 1 entirely. Option 2 computes the addition. Option 3 flips a factor with no division anywhere in the problem.',
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
                  q: 'Compute: (a) 1/3 × 2/5; (b) 3/4 × 2/9.',
                  solution: [
                    'Now, both are straight-across multiplications — no common ruler is ever needed.',
                    'So (a) $\\tfrac{1}{3} \\times \\tfrac{2}{5} = \\tfrac{1 \\times 2}{3 \\times 5} = \\tfrac{2}{15}$, already lowest ($\\gcd(2, 15) = 1$).',
                    'And (b): $\\tfrac{3}{4} \\times \\tfrac{2}{9} = \\tfrac{6}{36}$, and the atom $6$ clears in one division: $\\tfrac{6}{36} = \\tfrac{1}{6}$.',
                    'Hence (a) $\\tfrac{2}{15}$, (b) $\\tfrac{1}{6}$ — re-cutting done, atoms swept.',
                  ],
                  answer: '(a) 2/15; (b) 1/6 (6/36 simplified)',
                },
                {
                  q: 'How much is 1/2 of 4/5?',
                  solution: [
                    'Now, "of" is the multiplication: $\\tfrac{1}{2}$ of $\\tfrac{4}{5} = \\tfrac{1}{2} \\times \\tfrac{4}{5}$.',
                    'So cut every fifth in half — $\\tfrac{1 \\times 4}{2 \\times 5} = \\tfrac{4}{10}$.',
                    'Next, simplify: $\\gcd(4, 10) = 2$, so $\\tfrac{4}{10} = \\tfrac{2}{5}$ — or cancel first: $\\tfrac{1}{2} \\times \\tfrac{4}{5} = \\tfrac{1}{1} \\times \\tfrac{2}{5}$.',
                    'Hence $\\tfrac{1}{2}$ of $\\tfrac{4}{5} = \\tfrac{2}{5}$ — half of four fifths is two fifths, as the sieve promises.',
                  ],
                  answer: '2/5 (4/10 simplified; or cancel the 2s before multiplying)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute 2/7 × 7/8, and explain why no common ruler was needed.',
                  solution: [
                    'Now, the brute count: $\\tfrac{2 \\times 7}{7 \\times 8} = \\tfrac{14}{56}$.',
                    'So the atom $7$ clears: $\\tfrac{14}{56} = \\tfrac{1}{4}$ — or cancel first, $7$ against $7$: $\\tfrac{2}{7} \\times \\tfrac{7}{8} = \\tfrac{2}{1} \\times \\tfrac{1}{8} = \\tfrac{2}{8} = \\tfrac{1}{4}$.',
                    'Next, why no common ruler: multiplication re-cuts the second factor\'s ruler and sieves by the first — it never pools pieces, so equal piece sizes are never required. Only $+$ and $-$ summon the LCM.',
                    'Hence $\\tfrac{2}{7} \\times \\tfrac{7}{8} = \\tfrac{1}{4}$ — and the cancelled route shows the deeper truth: a factor sharing an atom with the other\'s denominator dissolves it for free.',
                  ],
                  answer: '1/4 (14/56; the 7s cancel across the × sign)',
                },
                {
                  q: 'Divide 2/3 ÷ 4/9.',
                  solution: [
                    'Now, the theorem: flip the divisor, and only the divisor — $\\tfrac{2}{3} \\div \\tfrac{4}{9} = \\tfrac{2}{3} \\times \\tfrac{9}{4}$.',
                    'So multiply: $\\tfrac{2 \\times 9}{3 \\times 4} = \\tfrac{18}{12}$.',
                    'Next, simplify: $\\gcd(18, 12) = 6$, so $\\tfrac{18}{12} = \\tfrac{3}{2}$ — or cancel first: $\\tfrac{2}{3} \\times \\tfrac{9}{4} = \\tfrac{1}{1} \\times \\tfrac{3}{2}$.',
                    'Hence $\\tfrac{2}{3} \\div \\tfrac{4}{9} = \\tfrac{3}{2}$ — how many four-ninths in two thirds: one and a half, the measuring count made honest.',
                  ],
                  answer: '3/2 (2/3 × 9/4 = 18/12)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Simplify first, then multiply: 5/6 × 12/25.',
                  solution: [
                    'Now, hunt the atoms across the sign: $5$ divides $25$, and $6$ divides $12$.',
                    'So cancel both: $\\tfrac{5}{6} \\times \\tfrac{12}{25} = \\tfrac{1}{1} \\times \\tfrac{2}{5} = \\tfrac{2}{5}$ — the cancelled route never sees a two-digit number.',
                    'Or brute force first: $\\tfrac{5 \\times 12}{6 \\times 25} = \\tfrac{60}{150}$, and $\\gcd(60, 150) = 30$ delivers $\\tfrac{2}{5}$ — the same verdict, larger counts.',
                    'Hence $\\tfrac{5}{6} \\times \\tfrac{12}{25} = \\tfrac{2}{5}$ — simplify early, multiply small: the professional habit, licensed by the atoms of Lesson 4.2.',
                  ],
                  answer: '2/5 (cancel 5 & 25, then 6 & 12: 1 × 2/5)',
                },
                {
                  q: 'A ribbon is 5/6 m long. How long is 3/4 of the ribbon?',
                  solution: [
                    'Now, "of" is the multiplication: $\\tfrac{3}{4}$ of $\\tfrac{5}{6} = \\tfrac{3}{4} \\times \\tfrac{5}{6}$.',
                    'So multiply: $\\tfrac{3 \\times 5}{4 \\times 6} = \\tfrac{15}{24}$.',
                    'Next, simplify: $\\gcd(15, 24) = 3$, so $\\tfrac{15}{24} = \\tfrac{5}{8}$.',
                    'Hence $\\tfrac{3}{4}$ of the ribbon is $\\tfrac{5}{8}$ m — and the check reads upward: since $\\tfrac{3}{4} < 1$, the piece must be shorter than the whole, and $\\tfrac{5}{8} < \\tfrac{5}{6}$ agrees.',
                  ],
                  answer: '5/8 m (3/4 × 5/6 = 15/24)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Find the HCF and the LCM of 1/2 and 3/8, and check the product rule.',
                  solution: [
                    'Now, both are in lowest terms ($\\gcd(1, 2) = 1$, $\\gcd(3, 8) = 1$), so the shortcuts apply.',
                    'So the HCF: $\\tfrac{\\mathrm{HCF}(1, 3)}{\\mathrm{LCM}(2, 8)} = \\tfrac{1}{8}$ — it measures both: $\\tfrac{1}{2} \\div \\tfrac{1}{8} = 4$ and $\\tfrac{3}{8} \\div \\tfrac{1}{8} = 3$.',
                    'Next, the LCM: $\\tfrac{\\mathrm{LCM}(1, 3)}{\\mathrm{HCF}(2, 8)} = \\tfrac{3}{2}$ — both measure it: $\\tfrac{3}{2} \\div \\tfrac{1}{2} = 3$ and $\\tfrac{3}{2} \\div \\tfrac{3}{8} = 4$.',
                    'Hence HCF $= \\tfrac{1}{8}$, LCM $= \\tfrac{3}{2}$, and the product rule closes the case: $\\tfrac{1}{8} \\times \\tfrac{3}{2} = \\tfrac{3}{16} = \\tfrac{1}{2} \\times \\tfrac{3}{8}$ — Lesson 3.5\'s identity, now in fraction land.',
                  ],
                  answer: 'HCF 1/8, LCM 3/2 (product rule: 3/16 = 1/2 × 3/8)',
                },
                {
                  q: 'exam-style: A tank holds 240 L and is 2/3 full. Then 3/4 of the water in it is used. How many litres are used, and what fraction of the tank remains?',
                  solution: [
                    'Now, the water first: $\\tfrac{2}{3}$ of $240 = \\tfrac{2 \\times 240}{3} = 160$ L.',
                    'So the usage: $\\tfrac{3}{4}$ of $160 = \\tfrac{3 \\times 160}{4} = 120$ L used.',
                    'Next, the remainder: $160 - 120 = 40$ L, and as a fraction of the tank, $\\tfrac{40}{240} = \\tfrac{1}{6}$ — the chain $\\tfrac{1}{4}$ of the water left, times $\\tfrac{2}{3}$ of the tank, agrees: $\\tfrac{1}{4} \\times \\tfrac{2}{3} = \\tfrac{2}{12} = \\tfrac{1}{6}$.',
                    'Hence $120$ L are used and $\\tfrac{1}{6}$ of the tank remains — two sieves in a row, each read on its own quantity.',
                  ],
                  answer: '120 L used; 1/6 of the tank remains (40 L of 240 L)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Divide 2 1/4 ÷ 1 1/2, giving the answer as a mixed number.',
                  solution: [
                    'Now, convert both: $2\\tfrac{1}{4} = \\tfrac{9}{4}$ and $1\\tfrac{1}{2} = \\tfrac{3}{2}$ — the mixed notation hides sums, so resolve them first.',
                    'So flip the divisor: $\\tfrac{9}{4} \\div \\tfrac{3}{2} = \\tfrac{9}{4} \\times \\tfrac{2}{3}$.',
                    'Next, multiply and simplify: $\\tfrac{9 \\times 2}{4 \\times 3} = \\tfrac{18}{12} = \\tfrac{3}{2}$ (the atom $6$ clears), and $3 = 1 \\times 2 + 1$ reads back as $1\\tfrac{1}{2}$.',
                    'Hence $2\\tfrac{1}{4} \\div 1\\tfrac{1}{2} = 1\\tfrac{1}{2}$ — one and a half copies of one and a half fit in two and a quarter, as the measuring count demands.',
                  ],
                  answer: '1 1/2 (9/4 × 2/3 = 18/12 = 3/2)',
                },
                {
                  q: 'exam-style: How many 3/4-litre bottles fill a drum of 15/2 litres?',
                  solution: [
                    'Now, the question is measuring: how many $\\tfrac{3}{4}$-pieces fit in $\\tfrac{15}{2}$ — the division $\\tfrac{15}{2} \\div \\tfrac{3}{4}$.',
                    'So flip the divisor: $\\tfrac{15}{2} \\times \\tfrac{4}{3} = \\tfrac{60}{6}$.',
                    'Next, the count lands exactly: $\\tfrac{60}{6} = 10$ — a whole number, as bottle-counts must be.',
                    'Hence $10$ bottles fill the drum — and the improper $\\tfrac{15}{2}$ never frightened anyone who could flip: $\\tfrac{15}{2} \\times \\tfrac{4}{3}$, cancelled the honest way, is $5 \\times 2 = 10$.',
                  ],
                  answer: '10 bottles (15/2 ÷ 3/4 = 60/6)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the multiplying rule: for positive denominators, a/b × c/d = ac/bd — by re-cutting the shaded pieces of the d-ruler, with no common ruler between the factors.',
                  solution: [
                    'Licence: $\\tfrac{c}{d}$ means $c$ shaded pieces of a ruler cut into $d$ equal pieces — the part–whole reading of Lesson 4.1.',
                    'Now, cut every piece of the $d$-ruler into $b$ sub-pieces: the ruler becomes the $bd$-ruler, and the shaded amount becomes $c \\times b = bc$ shaded sub-pieces — the same amount, since $\\tfrac{bc}{bd} = \\tfrac{c}{d}$ by the multiplying rule of Lesson 4.2.',
                    'So taking $\\tfrac{a}{b}$ of the shaded amount means keeping $a$ from every group of $b$: the $bc$ shaded sub-pieces fall into $c$ blocks of $b$, and $a \\times c$ sub-pieces survive.',
                    'Hence the product is $\\tfrac{a \\times c}{b \\times d} = \\tfrac{ac}{bd}$ — the second factor supplied the ruler, the first supplied the sieve, and no common ruler between the factors ever entered. □',
                  ],
                  answer: 'a/b × c/d = ac/bd (re-cut to the bd-ruler; a of every b shaded sub-pieces survive: ac of bd)',
                },
                {
                  q: 'Prove the division theorem a/b ÷ c/d = a/b × d/c on the bd-ruler, and explain why division by a fraction with numerator 0 has no answer.',
                  solution: [
                    'Licence: the product $bd$ is a legal common ruler for any two denominators, and raising is multiplication by $1$ — $\\tfrac{a}{b} = \\tfrac{ad}{bd}$ and $\\tfrac{c}{d} = \\tfrac{bc}{bd}$.',
                    'Now, the measuring question on one ruler: how many $bc$-pieces fit in $ad$-pieces? Both are counts of the same $bd$-piece, so the answer is the ratio $ad : bc$ — named exactly by the fraction $\\tfrac{ad}{bc}$, the division face of Lesson 4.1.',
                    'So the theorem\'s route delivers the same fraction: $\\tfrac{a}{b} \\times \\tfrac{d}{c} = \\tfrac{ad}{bc}$ by the multiplying rule — one flip, the same measuring count.',
                    'Hence $\\tfrac{a}{b} \\div \\tfrac{c}{d} = \\tfrac{a}{b} \\times \\tfrac{d}{c}$. And the zero case: $\\tfrac{0}{n} = 0$ has no reciprocal — no number times $0$ gives $1$ — so no amount $\\tfrac{a}{b}$ can be built as a whole number of zero-pieces: the measuring question "how many zeros in $\\tfrac{a}{b}$?" has no answer, which is division by zero\'s ban, met at the definition. □',
                  ],
                  answer: 'a/b ÷ c/d = ad/bc = a/b × d/c; division by 0/n is forbidden (0 has no reciprocal — no k satisfies a/b = k × 0)',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The chapter is complete. Lesson 4.1 put fractions on the line and proved them dense; 4.2 taught the line\'s names to multiply and divide by their atoms; 4.3 ordered the points; 4.4 pooled and measured them; and this lesson let them scale each other — multiplication re-cutting rulers without a common measure, division measuring by one honest flip, and the HCF/LCM shortcuts banked four lessons ago cashed in full. Every operation of chapter 2 now has its fraction-land double, proved rather than announced. One veil remains between the fractions and the exam hall\'s favourite costume: the decimal point, where every fraction agrees to wear powers of ten. Chapter 5 dresses the same line in decimals and percents.',
        },
      ],
    },
  ],
  plannedLessons: [],
}
