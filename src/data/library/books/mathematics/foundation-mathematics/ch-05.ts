import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 5: Decimals and Percents
 *
 * LESSONS WRITTEN: 5.1 Decimal Places and the Point (run 21, 2026-11-04) —
 * the point as the new landmark past the ones place; tenths/hundredths/
 * thousandths as the 10-family fractions of ch. 4 in positional dress; the
 * extended place-value chart and its mirror symmetry about the ones; reading,
 * writing and expanded form; the fraction-decimal bridge with the atom test
 * (a lowest-terms fraction wears an exact decimal dress iff its denominator
 * is 2^m * 5^n, needing max(m, n) places) proved from Lesson 4.2's multiplying
 * rule and ch. 3's uniqueness of factorisation; locating decimals by zooming
 * (the tenths ruler, then the hundredths ruler); comparing by aligning the
 * points, with the trailing-zero licence proved and the more-digits fraud
 * retired; money, length and mass conversions and the zero-filling trap.
 * Authored natively in the Cengage voice + solution chain.
 * 5.2 Decimals and Fractions, Two Ways of Writing the Same Numbers (run 22,
 * 2026-11-04) — long division past the point as the universal bridge-builder
 * (the step machine: digit floor(10r/b), remainder 10r mod b); terminating
 * vs recurring as the two fates of the remainders, with the dresses theorem
 * proved by the pigeonhole argument (b − 1 nonzero cells) and the 1/7
 * remainder carousel figure (digits 142857 emitted in walking order); pure
 * vs mixed recurrence with the head-length theorem (head = max(m, n) places,
 * then the stranger atoms' cycle); cycle lengths as orders of 10 (3/9 → 1,
 * 11 → 2, 27/37 → 3, 7/13 → 6) and the 142857 rotation family (k × 142857
 * over 999999); shift-and-subtract conversions both ways (0.(3) = 1/3,
 * 0.(142857) = 1/7, 0.41(6) = 5/12, 0.2(45) = 27/110), the 0.(9) = 1
 * Caution, the atoms-of-the-base Note (in base twelve thirds terminate),
 * the 2/7 vs 0.2857 comparison (fraction wins by exactly 1/70000), the
 * 22/7 = 3.(142857) not-pi trap; 5.1's 3.14159 misprint for 22/7 corrected.
 * Planned next: 5.3 Operating on Decimals; 5.4 Percent and Its Meaning;
 * 5.5 Percentage Change, Discounts and Simple Interest.
 * References: Khattar, Quantitative Aptitude (4e) — decimal-fraction exam
 * items, recurring-to-fraction shortcuts and comparison traps; NCERT Class 6
 * ch. 8 "Decimals" (tenths, hundredths, place-value extension, comparing,
 * fractions as decimals by long division; old-edition canon, web-checked
 * 2026-11-04); NCERT Class 7 (Ganita Prakash) ch. 3 "A Peek Beyond the
 * Point" (section sequence web-checked 2026-11-04); NCERT Class 9 ch. 1
 * "Number Systems" (the terminating/non-terminating-recurring classification
 * of rational decimal expansions, web-checked 2026-11-04) — see
 * docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-5.ts
 * (273 checks: sections A–O for 5.1, P–AC for 5.2) BEFORE writing.
 * Honours the tie promised in Lesson 4.5's closing paragraph: "One veil
 * remains between the fractions and the exam hall's favourite costume: the
 * decimal point, where every fraction agrees to wear powers of ten." — this
 * lesson lifts it, and keeps the atoms language alive (the atom test is the
 * atoms of chapter 3 legislating the bridge).
 */
export const chapter05: Chapter = {
  number: 5,
  slug: 'decimals-and-percents',
  title: 'Decimals and Percents',
  summary:
    'Place value extended to the right of the point, the natural marriage of decimals and fractions, percent as a standardised fraction of 100, and the practical arithmetic of increase, decrease, discount and interest.',
  status: 'in-progress',
  lessons: [
    {
      id: 'fm-decimal-places-and-the-point',
      number: '5.1',
      title: 'Decimal Places and the Point',
      concepts: [
        'The decimal point as a landmark',
        'Tenths, hundredths and thousandths',
        'The extended place-value chart',
        'Reading and writing decimals',
        'The fraction–decimal bridge',
        'The atom test for exact decimal dress',
        'Comparing and equivalent decimals',
      ],
      objectives: [
        'Explain what the decimal point marks, read any decimal aloud correctly, and write decimals in expanded form across the extended place-value chart',
        'Convert both ways across the fraction–decimal bridge: 10-family denominators directly, and any denominator built from 2s and 5s by re-cutting with the multiplying rule of Lesson 4.2',
        'Prove and apply the atom test — a lowest-terms fraction wears an exact decimal dress if and only if its denominator carries no atoms but 2s and 5s, and the dress needs max(m, n) places',
        'Locate decimals on the number line by zooming, compare and order them by aligning the points, and convert money, length and mass without the zero-filling traps',
      ],
      prerequisites: [
        'fm-numbers-digits-place-value',
        'fm-idea-of-a-fraction',
        'fm-equivalent-fractions-simplification',
        'fm-prime-numbers-factorisation',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch8', 'ncert-math7-ch3'],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 4 closed with a promise: the decimal point, where every fraction agrees to wear powers of ten. This unit lifts that veil, and it opens where the fractions themselves opened — with something the whole numbers cannot measure. A workshop screw is a little longer than 7 mm but short of 8 mm, and the millimetre scale can only report "between 7 and 8". The shopkeeper has lived inside the same gap for centuries: the rupee splits into $100$ paise, the metre into $100$ centimetres, the kilogram into $1000$ grams, and every day\'s trade needs the amounts that live between the whole marks. Three arenas, one reflex — when the whole units run out, **keep cutting into tens**.',
        },
        {
          kind: 'para',
          text: 'The reflex earns a new numeral. Cut each unit into ten equal pieces, count the pieces past the whole ones, and write the count after a dot: $0.7$ for seven tenths, $2.74$ for two wholes and seven tenths and four hundredths. The dot — the **decimal point** — is the whole invention. It is a wall between two neighbourhoods of digits: to its left, the place value of Lesson 1.1 counts wholes in powers of ten exactly as before; to its right, new places count pieces, each place ten times finer than the last. The plan of this lesson follows the wall: first the pieces (tenths, hundredths, thousandths), then the extended place-value chart and its startling symmetry, then the **bridge** — which fractions can wear a decimal dress at all, decided by a theorem the atoms of chapter 3 will legislate — and finally the working skills: locating decimals on the line, comparing them without being fooled, and writing money, length and mass in the exam hall\'s favourite notation.',
        },
        { kind: 'heading', text: 'Tenths: the ruler cut into ten' },
        {
          kind: 'para',
          text: 'Take one centimetre and cut it into $10$ equal parts. Each part is a millimetre, and each millimetre is $\\tfrac{1}{10}$ of a centimetre — one **tenth**, the tenth unit fraction of Lesson 4.1\'s family. Seven such parts — the screw that overshoots the 7 mm mark — amount to $\\tfrac{7}{10}$ cm. Now the new notation: the same amount written $0.7$ cm. The point says "the whole units stop here"; the $7$ after it says "seven tenths past". Read $0.7$ as "zero point seven" or, better, as what it is: seven tenths. There is no rounding and no approximation anywhere in this — $0.7$ and $\\tfrac{7}{10}$ are two costumes on one number, and the bridge of the next section makes the costume change routine.',
        },
        {
          kind: 'para',
          text: 'Whole parts and piece parts share one numeral. The tailor\'s leftover cloth measures $2$ whole metres and $7$ tenths of a metre more: $2.7$ m. The anatomy is exact — $2.7 = 2 + \\tfrac{7}{10}$ — and the digits never mix jobs: the $2$ counts wholes, the $7$ counts tenths, and the point stands between them holding the ledger open. Ten tenths rebuild one whole ($10 \\times 0.1 = 1$), so the pieces respect the same arithmetic the wholes always obeyed.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Decimals and the point (the treaty)',
          text: 'A **decimal** is said to be a number written with a **decimal point**: the digits to its left count wholes exactly as Lesson 1.1\'s place value built them, and the digits to its right count pieces of the 10-family — tenths in the first place, hundredths in the second, thousandths in the third. Thus, $2.74 = 2 + \\tfrac{7}{10} + \\tfrac{4}{100}$, and $0.7 = \\tfrac{7}{10}$ exactly. The point is the fraction bar standing upright: nothing is approximated, the pieces are simply being counted positionally.',
        },
        { kind: 'heading', text: 'Hundredths and thousandths: cutting again' },
        {
          kind: 'para',
          text: 'One re-cut is not enough. Cut every tenth into ten equal parts: each is $\\tfrac{1}{100}$ of the whole — a **hundredth** — and the whole now carries $10 \\times 10 = 100$ of them. Money has run on this cut all along: one rupee splits into $100$ paise, so one paise is $\\tfrac{1}{100}$ rupee, written ₹$0.01$; forty-seven paise are ₹$0.47$; five paise are ₹$0.05$ — and notice that the zero between the point and the $5$ is doing real work, holding the tenths column open for a count that has none. Cut once more and the **thousandths** appear: $1000$ to the whole, one gram to the kilogram, $0.001$ kg. The ladder climbs by tens at every rung: ten thousandths make one hundredth, ten hundredths make one tenth, ten tenths make one whole.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Decimal',
              def: 'A number written with a decimal point, whose digits after the point count tenths, hundredths, thousandths — the 10-family fractions of Lesson 4.1 in positional dress. Example: 2.74 = 2 + 7/10 + 4/100.',
            },
            {
              term: 'Decimal point',
              def: 'The dot placed after the ones digit that separates the whole-counting places from the piece-counting places. It is the hinge of the place-value mirror: every step left of it multiplies by 10, every step right of it divides by 10.',
            },
            {
              term: 'Tenths',
              def: 'The first place right of the point: pieces of a unit cut into 10. One millimetre is 0.1 cm; 0.7 = 7/10. Ten tenths rebuild one whole.',
            },
            {
              term: 'Hundredths',
              def: 'The second place right of the point: pieces cut into 100. One paise is ₹0.01; 0.47 = 47/100. Ten hundredths make one tenth.',
            },
            {
              term: 'Thousandths',
              def: 'The third place right of the point: pieces cut into 1000. One gram is 0.001 kg; 0.305 = 305/1000. Ten thousandths make one hundredth.',
            },
            {
              term: 'Decimal places',
              def: 'The number of digits after the point: 42.357 has three decimal places. By the atom test, a lowest-terms fraction with denominator 2^m × 5^n wears a decimal dress with exactly max(m, n) places.',
            },
            {
              term: 'Equivalent decimals',
              def: 'Decimals naming the same amount by carrying different trailing zeros: 0.5 = 0.50 = 0.500. Appending or stripping trailing zeros never moves the amount — the licence behind "align the points" before comparing.',
            },
          ],
        },
        { kind: 'heading', text: 'The point and the place-value mirror' },
        {
          kind: 'para',
          text: 'Lesson 1.1 built place value as a treaty of position: hundreds, tens, ones, each place worth ten times the one on its right. The decimal point does not break the treaty — it **extends** it. Keep walking right past the ones and the places keep dividing by ten: tenths ($\\tfrac{1}{10}$), hundredths ($\\tfrac{1}{100}$), thousandths ($\\tfrac{1}{1000}$). Seen whole, the chart is a mirror balanced on the ones place — and the point is nothing but the mirror\'s hinge, drawn into the numeral so the reader never loses the balance point.',
        },
        {
          kind: 'figure',
          caption:
            'The place-value mirror. Left of the point, each step multiplies by 10 (1, 10, 100 — Lesson 1.1\'s treaty); right of the point, each step divides by 10 (1/10, 1/100, 1/1000 — the 10-family of ch. 4). The sample number 305.274 dissects as 300 + 0 + 5 + 0.2 + 0.07 + 0.004, one digit per place, the point marking the ones.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extended place-value chart as a mirror about the ones place, with 305.274 dissected digit by digit">
  <g font-size="13" fill="currentColor">
    <text x="196" y="16" text-anchor="middle" font-size="12">each step left: × 10</text>
    <line x1="340" y1="24" x2="52" y2="24" stroke="currentColor" stroke-width="1"/>
    <polygon points="48,24 58,20 58,28" fill="currentColor"/>
    <text x="552" y="16" text-anchor="middle" font-size="12">each step right: ÷ 10</text>
    <line x1="408" y1="24" x2="696" y2="24" stroke="currentColor" stroke-width="1"/>
    <polygon points="700,24 690,20 690,28" fill="currentColor"/>
    <g text-anchor="middle" font-weight="700">
      <text x="92" y="54">Hundreds</text>
      <text x="196" y="54">Tens</text>
      <text x="300" y="54">Ones</text>
      <text x="448" y="54">Tenths</text>
      <text x="552" y="54">Hundredths</text>
      <text x="656" y="54">Thousandths</text>
    </g>
    <line x1="40" y1="66" x2="708" y2="66" stroke="currentColor" stroke-width="1.5"/>
    <g text-anchor="middle" font-size="14">
      <text x="92" y="106">100</text>
      <text x="196" y="106">10</text>
      <text x="300" y="106">1</text>
      <text x="448" y="106">0.1</text>
      <text x="552" y="106">0.01</text>
      <text x="656" y="106">0.001</text>
    </g>
    <text x="374" y="86" text-anchor="middle" font-size="11" font-style="italic">the point</text>
    <line x1="374" y1="66" x2="374" y2="118" stroke="#b45309" stroke-width="1" stroke-dasharray="3 3"/>
    <g text-anchor="middle" font-size="30" font-weight="700">
      <text x="92" y="160">3</text>
      <text x="196" y="160">0</text>
      <text x="300" y="160">5</text>
      <text x="374" y="160" fill="#b45309">.</text>
      <text x="448" y="160">2</text>
      <text x="552" y="160">7</text>
      <text x="656" y="160">4</text>
    </g>
    <rect x="360" y="126" width="28" height="44" fill="none" stroke="#b45309" stroke-width="1.5"/>
    <g text-anchor="middle" font-size="12" opacity="0.85">
      <text x="92" y="196">3 × 100</text>
      <text x="92" y="216">= 300</text>
      <text x="196" y="196">0 × 10</text>
      <text x="196" y="216">= 0</text>
      <text x="300" y="196">5 × 1</text>
      <text x="300" y="216">= 5</text>
      <text x="448" y="196">2 × 0.1</text>
      <text x="448" y="216">= 0.2</text>
      <text x="552" y="196">7 × 0.01</text>
      <text x="552" y="216">= 0.07</text>
      <text x="656" y="196">4 × 0.001</text>
      <text x="656" y="216">= 0.004</text>
    </g>
    <text x="374" y="262" text-anchor="middle" font-weight="700">305.274 = 300 + 0 + 5 + 0.2 + 0.07 + 0.004</text>
    <text x="374" y="300" text-anchor="middle" font-size="12" opacity="0.85">the ones place is the hinge: the point just marks it</text>
    <text x="374" y="336" text-anchor="middle" font-size="12" opacity="0.85">one number, seven places, every digit counted in its own column</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Reading follows the anatomy. Say the whole part as chapter 1 taught, say "point", then name each digit after the point **one at a time**. For example,',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$7.9$ is read "seven point nine" — seven wholes and nine tenths;',
            '$42.357$ is read "forty-two point three five seven" — the digits after the point named one by one, because $0.357$ is one amount ($357$ thousandths) and not three separate values;',
            '$305.274$ is read "three hundred five point two seven four" — the zero inside the number is pronounced, since it holds the tenths column for the count.',
          ],
        },
        {
          kind: 'para',
          text: 'Writing runs the anatomy backwards, and the **expanded form** spreads a decimal across its places like chapter 1 always did: $305.274 = 3 \\times 100 + 0 \\times 10 + 5 \\times 1 + 2 \\times \\tfrac{1}{10} + 7 \\times \\tfrac{1}{100} + 4 \\times \\tfrac{1}{1000}$. Whole numbers join the system without ceremony: $7 = 7.0$, the point written after the ones with the tenths column left empty. The point may be attached to any whole number whenever a decimal context asks for one — the amount never notices.',
        },
        {
          kind: 'example',
          title: 'Write 7/10, 47/100 and 305/1000 as decimals',
          steps: [
            'Now, every denominator here is a power of ten — $10$, $100$, $1000$ — so the bridge needs no re-cutting: the digits drop straight into their places.',
            'So $\\tfrac{7}{10}$ puts $7$ in the tenths column: $\\tfrac{7}{10} = 0.7$.',
            'And $\\tfrac{47}{100}$ counts hundredths: $4$ tenths and $7$ hundredths — $\\tfrac{47}{100} = 0.47$, the tenths column carrying a $4$, not a zero.',
            'Hence $\\tfrac{305}{1000} = 0.305$: the $3$ lands in the tenths column, the $0$ holds the hundredths — the zero inside the number is load-bearing — and the $5$ in the thousandths.',
          ],
        },
        {
          kind: 'example',
          title: 'Read the bridge backwards: write 0.7, 0.47 and 0.305 as fractions in lowest terms',
          steps: [
            'Now, reading backwards, the last decimal place names the denominator: one place — tenths; two — hundredths; three — thousandths.',
            'So $0.7 = \\tfrac{7}{10}$, already in lowest terms.',
            'And $0.47 = \\tfrac{47}{100}$, also lowest ($\\gcd(47, 100) = 1$).',
            'Hence $0.305 = \\tfrac{305}{1000}$, and the atom $5$ clears: $\\gcd(305, 1000) = 5$, so $0.305 = \\tfrac{61}{200}$ — the same amount in its shortest fraction dress.',
          ],
        },
        { kind: 'heading', text: 'The bridge: which fractions wear decimal dresses' },
        {
          kind: 'para',
          text: 'The last two Illustrations ran the bridge in both directions, and for one family of fractions the crossing is free: any fraction whose denominator is already $10$, $100$ or $1000$ — any $\\tfrac{n}{10^k}$ — drops straight into its places. A second family crosses by re-cutting. Lesson 4.2\'s multiplying rule lets us raise a fraction by any legal factor $\\tfrac{c}{c} = 1$; when the denominator divides a power of ten, some factor $\\tfrac{c}{c}$ lands it exactly on a 10-family ruler. For example,',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\tfrac{1}{2} = \\tfrac{5}{10} = 0.5$ — the factor $\\tfrac{5}{5}$;',
            '$\\tfrac{3}{5} = \\tfrac{6}{10} = 0.6$ — the factor $\\tfrac{2}{2}$;',
            '$\\tfrac{1}{4} = \\tfrac{25}{100} = 0.25$ and $\\tfrac{3}{4} = \\tfrac{75}{100} = 0.75$ — the factor $\\tfrac{25}{25}$;',
            '$\\tfrac{7}{20} = \\tfrac{35}{100} = 0.35$ — the factor $\\tfrac{5}{5}$;',
            '$\\tfrac{13}{8} = \\tfrac{1625}{1000} = 1.625$ — the factor $\\tfrac{125}{125}$, three places deep: the staircase fractions of Lesson 4.1 ($\\tfrac{9}{8} = 1.125$, $\\tfrac{3}{2} = 1.5$) were decimals all along.',
          ],
        },
        {
          kind: 'para',
          text: 'But $\\tfrac{2}{3}$ resists. No factor $\\tfrac{c}{c}$ turns a denominator of $3$ into a power of ten — try as many re-cuts as you like, no count of tenths or hundredths or thousandths ever equals two thirds exactly. The same refusal meets $\\tfrac{1}{7}$, $\\tfrac{5}{12}$, $\\tfrac{7}{15}$. The pattern is not experimental; it is a theorem, and the atoms decide it. State it, then prove it on the rail:',
        },
        {
          kind: 'derivation',
          title: 'The atom test: which fractions wear exact decimal dresses',
          statement:
            'Claim: a fraction in lowest terms $\\tfrac{a}{b}$ wears an exact decimal dress if and only if the only atoms of $b$ are $2$s and $5$s — and then the dress needs $\\max(m, n)$ places, where $b = 2^m \\times 5^n$.',
          steps: [
            {
              label: 'The re-cut direction (if)',
              formula: 'b = 2^m \\cdot 5^n,\\ m \\ge n \\;\\Rightarrow\\; \\tfrac{a}{b} = \\tfrac{a \\cdot 5^{m-n}}{10^m}',
              explanation:
                'Suppose b = 2^m × 5^n with m ≥ n. Multiply numerator and denominator by 5^(m−n) — the multiplying rule of Lesson 4.2 with the legal factor 5^(m−n)/5^(m−n) = 1. The denominator becomes 2^m · 5^n · 5^(m−n) = 2^m · 5^m = 10^m, so a/b = (a · 5^(m−n))/10^m: a count of 10^m-ths, an exact decimal with m places. The case n > m is symmetric (multiply by 2^(n−m) instead).',
            },
            {
              label: 'The refusal direction (only if)',
              formula: '10^k = 2^k \\cdot 5^k \\quad \\text{carries no other atoms}',
              explanation:
                'A power of ten factorises as 2^k × 5^k and nothing else — Lesson 3.2\'s uniqueness of factorisation says so exactly. If b divided some 10^k, every atom of b would be an atom of 10^k, hence 2 or 5. Contrapositive: any other atom (3, 7, 11, …) disqualifies b from dividing every power of ten at once — no re-cut can add atoms to a denominator that 10^k does not carry.',
            },
            {
              label: 'Why the refusal is total',
              formula: '10^k \\bmod 3 = 1 \\text{ for every } k',
              explanation:
                'One non-atom is enough to refuse forever. 10 = 9 + 1 leaves remainder 1 on division by 3, and so does every power of 10 — Lesson 3.1\'s digit-sum test in action. So no count of tenths, millionths or any 10^k-ths can equal a number of twelfths exactly: the decimal dress of 5/12 would need infinitely many places. The same argument runs with any other prime.',
            },
            {
              label: 'Count the places',
              formula: '\\text{places} = \\max(m, n)',
              explanation:
                'The winning power is 10^m or 10^n, whichever exponent is larger: 1/8 (2³) needs 3 places (0.125); 3/25 (5²) needs 2 (0.12); 9/40 (2³ × 5) needs max(3, 1) = 3 (0.225); 11/250 (2 × 5³) needs 3 (0.044).',
            },
          ],
          result:
            'a/b in lowest terms has an exact decimal dress ⇔ b = 2^m · 5^n; the dress needs max(m, n) decimal places. Any other atom — 3, 7, 11 — refuses every power of ten, and the decimal runs on forever.',
        },
        {
          kind: 'para',
          text: 'The test is instant in practice. $\\tfrac{7}{8}$: the denominator is $2^3$, so three places — and indeed $\\tfrac{7}{8} = 0.875$. $\\tfrac{5}{12}$: the atoms of $12$ are $2, 2, 3$, and the $3$ is a stranger — no decimal dress exists. $\\tfrac{9}{40}$: $40 = 2^3 \\times 5$, three places, $0.225$. And what happens to the refuseniks is the next lesson\'s territory: their decimals **go on forever** — $\\tfrac{1}{3} = 0.3333\\ldots$, and chapter 1\'s $\\tfrac{22}{7}$ began its endless waltz $3.142857\\ldots$ long before this book could name the habit. The bridge is universal; for the 2-and-5 family it lands, and for everyone else it walks forever. Lesson 5.2 maps both roads.',
        },
        {
          kind: 'formula',
          name: 'The atom test',
          latex: 'b = 2^m \\cdot 5^n \\;\\Longleftrightarrow\\; \\tfrac{a}{b} \\text{ has an exact decimal dress}',
          note: 'Lowest terms required. The dress needs max(m, n) places: 7/8 (2³) → 0.875; 3/25 (5²) → 0.12; 7/20 (2² × 5) → 0.35. Any other atom — 3, 7, 11 — refuses every power of ten: the decimal runs forever (Lesson 5.2).',
        },
        { kind: 'heading', text: 'Locating decimals: the zoom' },
        {
          kind: 'para',
          text: 'A decimal is an address, and the number line delivers the mail. To locate $2.74$: walk $2$ whole steps to stand at $2$; take $7$ tenth-steps along the tenths ruler to $2.7$; then re-cut the single tenth from $2.7$ to $2.8$ into ten hundredth-steps and take $4$ of them. Each re-cut is the ruler of chapter 4 cut finer — the zoom never ends, and every extra decimal place is one more zoom. The figure watches two zooms in a row.',
        },
        {
          kind: 'example',
          title: 'Locate 2.74 on the number line',
          steps: [
            'Now, walking the line: $2.74$ has $2$ wholes, so stand at $2$.',
            'So take $7$ tenth-steps from $2$: the point $2.7$ — the seventh tick of the tenths ruler between $2$ and $3$.',
            'Next, re-cut the tenth from $2.7$ to $2.8$ into ten hundredth-steps and take $4$ of them: the fourth tick of the hundredths ruler.',
            'Hence $2.74$ sits at the address two wholes, seven tenths, four hundredths — between $2.7$ and $2.8$, four hundredths past $2.7$.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'Locating 2.74 by zooming. Panel one: the tenths ruler between 2 and 3 — 2.7 stands at the seventh tick (27 tenths in all). Panel two: that single tenth, re-cut into ten hundredths — 2.74 stands at the fourth tick (274 hundredths in all). Each decimal place is one more zoom into the last.',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A two-panel zoom: the tenths ruler from 2 to 3 with 2.7 marked, and the interval 2.7 to 2.8 re-cut into ten hundredths with 2.74 marked">
  <g font-size="13" fill="currentColor">
    <text x="380" y="34" text-anchor="middle" font-size="12">the tenths ruler between 2 and 3</text>
    <line x1="70" y1="90" x2="690" y2="90" stroke="currentColor" stroke-width="1.5"/>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="132" y1="82" x2="132" y2="98"/>
      <line x1="194" y1="82" x2="194" y2="98"/>
      <line x1="256" y1="82" x2="256" y2="98"/>
      <line x1="318" y1="82" x2="318" y2="98"/>
      <line x1="380" y1="82" x2="380" y2="98"/>
      <line x1="442" y1="82" x2="442" y2="98"/>
      <line x1="504" y1="78" x2="504" y2="102" stroke="#b45309" stroke-width="1.5"/>
      <line x1="566" y1="82" x2="566" y2="98"/>
      <line x1="628" y1="82" x2="628" y2="98"/>
    </g>
    <g font-size="11" text-anchor="middle" opacity="0.85">
      <text x="70" y="124">2.0</text>
      <text x="132" y="124">2.1</text>
      <text x="194" y="124">2.2</text>
      <text x="256" y="124">2.3</text>
      <text x="318" y="124">2.4</text>
      <text x="380" y="124">2.5</text>
      <text x="442" y="124">2.6</text>
      <text x="504" y="124" fill="#b45309" font-weight="700">2.7</text>
      <text x="566" y="124">2.8</text>
      <text x="628" y="124">2.9</text>
      <text x="690" y="124">3.0</text>
    </g>
    <circle cx="504" cy="90" r="5" fill="#b45309"/>
    <text x="504" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="#b45309">2.7 = 27 tenths</text>
    <rect x="504" y="72" width="62" height="30" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="504" y1="102" x2="70" y2="292" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.45"/>
    <line x1="566" y1="102" x2="690" y2="292" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.45"/>
    <text x="380" y="205" text-anchor="middle" font-size="12" font-style="italic">every tenth re-cut into ten hundredths</text>
    <line x1="70" y1="300" x2="690" y2="300" stroke="currentColor" stroke-width="1.5"/>
    <g stroke="currentColor" stroke-width="1" opacity="0.7">
      <line x1="132" y1="292" x2="132" y2="308"/>
      <line x1="194" y1="292" x2="194" y2="308"/>
      <line x1="256" y1="292" x2="256" y2="308"/>
      <line x1="318" y1="286" x2="318" y2="314" stroke="#b45309" stroke-width="1.5"/>
      <line x1="380" y1="292" x2="380" y2="308"/>
      <line x1="442" y1="292" x2="442" y2="308"/>
      <line x1="504" y1="292" x2="504" y2="308"/>
      <line x1="566" y1="292" x2="566" y2="308"/>
      <line x1="628" y1="292" x2="628" y2="308"/>
    </g>
    <g font-size="11" text-anchor="middle" opacity="0.85">
      <text x="70" y="330">2.70</text>
      <text x="132" y="330">2.71</text>
      <text x="194" y="330">2.72</text>
      <text x="256" y="330">2.73</text>
      <text x="318" y="330" fill="#b45309" font-weight="700">2.74</text>
      <text x="380" y="330">2.75</text>
      <text x="442" y="330">2.76</text>
      <text x="504" y="330">2.77</text>
      <text x="566" y="330">2.78</text>
      <text x="628" y="330">2.79</text>
      <text x="690" y="330">2.80</text>
    </g>
    <circle cx="318" cy="300" r="5" fill="#b45309"/>
    <text x="318" y="262" text-anchor="middle" font-size="13" font-weight="700" fill="#b45309">2.74</text>
    <text x="318" y="280" text-anchor="middle" font-size="11" fill="#b45309">(274 hundredths)</text>
    <text x="380" y="400" text-anchor="middle" font-size="12" opacity="0.85">walking the point: 2 wholes, then 7 tenths, then 4 hundredths — the address 2.74</text>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Comparing decimals: align the points' },
        {
          kind: 'para',
          text: 'Comparison asks which amount is bigger, and the mirror answers: compare places from the coarse end. Whole parts first — $7$ beats $6.99$ no matter how fine the tail, because $7$ wholes outweigh any count of hundredths under seven. Wholes tied, walk left to right after the point: tenths decide before hundredths, hundredths before thousandths — the coarse cut always outvotes the fine. There is one preparation, and it is licensed: **pad the shorter decimal with trailing zeros** until both tails match, so the places line up in columns. Why padding is legal is a one-rail argument:',
        },
        {
          kind: 'derivation',
          title: 'The trailing-zero licence: why appended zeros change nothing',
          statement:
            'Claim: appending a zero after the last digit of a decimal never moves the amount — $0.5 = 0.50 = 0.500$, and even $7 = 7.0$.',
          steps: [
            {
              label: 'Read the appended zero as a re-cutting',
              formula: '\\tfrac{5}{10} = \\tfrac{5 \\times 10}{10 \\times 10} = \\tfrac{50}{100}',
              explanation:
                'Appending a zero shifts every fractional digit one place finer, which is exactly the multiplying rule of Lesson 4.2 with the legal factor 10/10 = 1: numerator and denominator both multiplied by 10. The amount is untouched — only the ruler\'s fineness changed.',
            },
            {
              label: 'Iterate at will',
              formula: '\\tfrac{5}{10} = \\tfrac{50}{100} = \\tfrac{500}{1000}',
              explanation:
                'Each further zero repeats the argument: five tenths, fifty hundredths, five hundred thousandths — one amount, three finenesses. No string of trailing zeros can move the point\'s value.',
            },
            {
              label: 'Wholes join in',
              formula: '7 = \\tfrac{70}{10} = 7.0',
              explanation:
                'A whole number is its own decimal with an empty fractional part; writing the point and a zero re-cuts nothing, since 70/10 = 7. Thus 7 = 7.0 = 7.00 — any whole number may pose as a decimal whenever the column chart asks.',
            },
          ],
          result:
            'Trailing zeros multiply top and bottom by 10 and move nothing: 0.5 = 0.50 = 0.500 and 7 = 7.0. Padding decimals to equal length before comparing is always licensed. Leading zeros after the point are another matter entirely — 0.05 ≠ 0.5.',
        },
        {
          kind: 'para',
          text: 'With the licence banked, the method is mechanical — and one fraud dies on contact. Whole-number instinct says "longer number, bigger value"; decimal land retires it. $0.5$ has **fewer** digits than $0.45$, yet $0.5 > 0.45$: as hundredths, $50 > 45$. Tail length measures the fineness of the cutting, never the size of the amount. The aligned comparison sees through the disguise instantly — which is exactly why the padding step is not cosmetic but the whole defence.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'More digits, not more value',
          text: 'Never rank decimals by digit count. $0.5$ (one place) is greater than $0.45$ (two places): as hundredths, $50 > 45$. A longer tail is a finer ruler, not a bigger amount. Align the points, pad the tails with licensed zeros, and compare place by place from the left — the first difference decides.',
        },
        {
          kind: 'example',
          title: 'Which is greater: 5.64 or 5.603?',
          steps: [
            'Now, align the points and pad the shorter tail to three places — licensed by the trailing-zero licence: $5.64 = 5.640$.',
            'So compare the wholes: $5 = 5$. Tie.',
            'Next, walk left to right: tenths $6 = 6$; hundredths $4$ against $0$ — the first difference decides.',
            'Hence $5.64 > 5.603$: four hundredths beat none, and the trailing $3$ of $5.603$ never gets a vote — three thousandths lose to four hundredths.',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Equivalent decimals',
          text: 'Decimals that name the same amount — $0.5 = 0.50 = 0.500$ — are said to be **equivalent decimals**. Appending or stripping trailing zeros never moves the amount (the trailing-zero licence), and the aligned comparison of $5.64$ and $5.603$ leaned on exactly this licence. Leading zeros after the point are **not** free: $0.05 = \\tfrac{5}{100}$ is ten times smaller than $0.5 = \\tfrac{5}{10}$ — the zero\'s position is load-bearing.',
        },
        { kind: 'heading', text: 'Putting it to work: money, length and mass' },
        {
          kind: 'para',
          text: 'The decimal system was built for the marketplace, and the marketplace repays the loan daily. The rule is one sentence: **the small unit names the place**. Paise are hundredths of a rupee, so they write into the hundredths column; millimetres are tenths of a centimetre and centimetres are hundredths of a metre, so they write into the tenths and hundredths columns; grams are thousandths of a kilogram. Nine centimetres eight millimetres is $9.8$ cm; two metres forty-five centimetres is $2.45$ m; two thousand seven hundred fifty grams is $2.750 = 2.75$ kg. One trap guards the gate, and it is the most examined zero in school arithmetic:',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The zero-filling trap',
          text: 'When a small unit fills a far column, the empty near columns must be filled with zeros. ₹8 and 5 paise is ₹$8.05$ — the $5$ is hundredths — because ₹$8.5$ would read as ₹8 and **fifty** paise. The same discipline everywhere: 3 kg 60 g is $3.06$ kg (sixty grams is $0.060$ kg), not $3.6$ kg; five paise is ₹$0.05$, never ₹$0.5$. Fill every column between the point and the first significant digit.',
        },
        {
          kind: 'example',
          title: 'Express ₹8 and 5 paise, and 9 cm 8 mm, in decimal notation',
          steps: [
            'Now, the small unit names the place: paise are hundredths of a rupee, millimetres are tenths of a centimetre.',
            'So 5 paise $= \\tfrac{5}{100}$ rupee, and the $5$ must land in the hundredths column: ₹$8.05$ — the tenths zero is load-bearing, since ₹$8.5$ would be fifty paise.',
            'And 8 mm $= \\tfrac{8}{10}$ cm, so 9 cm 8 mm $= 9.8$ cm — the millimetres fill the tenths column directly.',
            'Hence ₹$8.05$ and $9.8$ cm — the point carries the conversion, provided each digit sits in the column its unit names.',
          ],
        },
        {
          kind: 'para',
          text: 'From the above discussion, the methods collect into one table — six recurring situations, six routes, each with its worked instance from this lesson:',
        },
        {
          kind: 'table',
          head: ['Situation', 'Route', 'Worked instance', 'Result'],
          rows: [
            ['Fraction with a 10-family denominator', 'read the places off the digits', '47/100', '= 0.47'],
            ['Denominator built from 2s and 5s', 're-cut to the nearest power of ten (Lesson 4.2)', '7/20 = 35/100', '= 0.35'],
            ['Decimal back to a fraction', 'count the places, put over 10^k, simplify', '0.305 = 305/1000', '= 61/200'],
            ['Comparing two decimals', 'align the points, pad tails, compare left to right', '5.64 → 5.640 vs 5.603', '5.64 > 5.603'],
            ['Small units to decimal notation', 'paise → hundredths, mm → tenths, g → thousandths', '₹8 and 5 paise; 9 cm 8 mm', '= ₹8.05; 9.8 cm'],
            ['Locating a decimal', 'walk wholes, then tenths, then hundredths', '2.74 = 2 + 7 tenths + 4 hundredths', 'between 2.7 and 2.8'],
          ],
        },
        {
          kind: 'equation',
          latex: '\\tfrac{7}{10} = 0.7 \\qquad \\tfrac{7}{20} = \\tfrac{35}{100} = 0.35 \\qquad b = 2^m \\cdot 5^n \\,\\Rightarrow\\, \\max(m, n) \\text{ places}',
          note: 'The bridge on one line: 10-family denominators drop straight into their places; other 2-and-5 denominators re-cut to the nearest power of ten by Lesson 4.2\'s rule; and the atom test counts the places the dress must have. Everything else — 1/3, 5/12, 22/7 — refuses and waits for Lesson 5.2.',
        },
        {
          kind: 'formula',
          name: 'The 10-family',
          latex: '\\tfrac{1}{10} = 0.1 \\qquad \\tfrac{1}{100} = 0.01 \\qquad \\tfrac{1}{1000} = 0.001',
          note: 'Each step right of the point divides by 10; ten of each piece rebuild the next coarser one — 10 thousandths = 1 hundredth, 10 hundredths = 1 tenth, 10 tenths = 1 whole. The mirror of Lesson 1.1, extended through the hinge.',
        },
        {
          kind: 'formula',
          name: 'Align the points',
          latex: '5.64 = 5.640 > 5.603',
          note: 'Pad with trailing zeros to equal length, compare whole parts first, then digits left to right after the point — the first difference decides. More digits is not more value; the coarse cut outvotes the fine.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Decimals in the exam hall',
          text: 'The exam shapes repeat. (i) *Place-value items* — "In 42.357, which digit is in the hundredths place?": walk the point — tenths, hundredths, thousandths (the $5$ here). (ii) *One-line bridges* — $\\tfrac{3}{5} = 0.6$, $\\tfrac{7}{20} = 0.35$, $2750$ g $= 2.75$ kg: the re-cut quartet of the toolkit table. (iii) *Comparison traps* — the options always carry a more-digits decoy ($0.45$ beside $0.5$) and a zero-shift decoy ($0.05$ beside $0.5$); the aligned comparison sees through both. (iv) *Money items* — ₹$8.05$ against ₹$8.50$ is the single most examined zero in school arithmetic. Bank the atom test as well: "$\\tfrac{7}{8}$ as a decimal, without long division" is answered before the question ends — the atoms $2^3$ already said three places, and $\\tfrac{875}{1000}$ agrees.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In 42.357, the digit 3 occupies which place?',
              options: [
                'The tens place — 3 × 10',
                'The tenths place — the first digit after the point, 3/10',
                'The hundredths place — 3/100',
                'The thousandths place — 3/1000',
              ],
              answer: 1,
              explain:
                'After the point the places run tenths, hundredths, thousandths left to right; the 3 is the first digit after the point, so it counts tenths — 3/10 = 0.3 (Option 2). Option 1 belongs to the 4 in 42. Option 3 belongs to the 5, and Option 4 to the 7: each digit owns exactly one column.',
            },
            {
              q: '3/5 written as a decimal is:',
              options: [
                '0.35 — write 3 and 5 after the point',
                '0.53 — swap the digits',
                '0.6 — re-cut: 3/5 = 6/10 by the factor 2/2',
                '3.5 — shift the point after the 3',
              ],
              answer: 2,
              explain:
                'The atom test licenses the dress (5 = 5¹, one place), and the re-cut delivers it: 3/5 × 2/2 = 6/10 = 0.6 (Option 3). Option 1 pastes numerator and denominator after the point. Option 2 swaps them. Option 4 turns the fraction into three and a half — the point is not a slash.',
            },
            {
              q: 'Which of these is the largest?',
              options: ['0.7', '0.07', '0.66', '0.71'],
              answer: 3,
              explain:
                'Align as hundredths: 70, 7, 66, 71 — the largest is 0.71 (Option 4). Option 1 is the classic decoy: 0.7 has the fewest digits yet beats 0.66 (70 > 66). Option 2 is the smallest despite sharing digits with the winner: 7 hundredths is ten times finer than 7 tenths.',
            },
            {
              q: '0.5 is equal to:',
              options: [
                '0.50 — appending a trailing zero multiplies top and bottom by 10',
                '0.05 — move the zero in front of the 5',
                '5.0 — the point hops past the 5',
                '0.45 — the 5 with its neighbour',
              ],
              answer: 1,
              explain:
                'The trailing-zero licence: 5/10 = 50/100, so 0.5 = 0.50 exactly (Option 1). Option 2 shrinks the amount tenfold — leading zeros after the point are load-bearing. Option 3 grows it tenfold: the point does not hop for free. Option 4 is a different amount wearing a similar tail.',
            },
            {
              q: '₹8 and 5 paise, written in rupees, is:',
              options: [
                '₹8.5 — the paise go straight after the 8',
                '₹8.005 — paise are thousandths of a rupee',
                '₹8.05 — 5 paise = 5/100 rupee, the hundredths column',
                '₹85.00 — rupees and paise concatenate',
              ],
              answer: 2,
              explain:
                'Paise are hundredths of a rupee, so the 5 writes into the hundredths column with the tenths column zero-filled: ₹8.05 (Option 3). Option 1 is the classic trap — ₹8.5 is ₹8 and fifty paise. Option 2 puts paise a thousandth-place too fine. Option 4 glues the two numbers together.',
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
                  q: 'Write as decimals: (a) 9/10; (b) 27/100; (c) 1039/1000.',
                  solution: [
                    'Now, every denominator is a power of ten, so the digits drop straight into their places.',
                    'So (a) $\\tfrac{9}{10} = 0.9$ — nine in the tenths column.',
                    'And (b) $\\tfrac{27}{100} = 0.27$ — two tenths, seven hundredths; (c) $\\tfrac{1039}{1000} = 1.039$ — one whole and thirty-nine thousandths, the tenths column held by a zero.',
                    'Hence (a) $0.9$, (b) $0.27$, (c) $1.039$ — the 10-family bridge, crossed without re-cutting.',
                  ],
                  answer: '(a) 0.9; (b) 0.27; (c) 1.039',
                },
                {
                  q: 'Write 0.9, 0.27 and 1.039 as fractions in lowest terms.',
                  solution: [
                    'Now, the last decimal place names the denominator: one place — tenths; two — hundredths; three — thousandths.',
                    'So $0.9 = \\tfrac{9}{10}$, already lowest.',
                    'And $0.27 = \\tfrac{27}{100}$, also lowest ($\\gcd(27, 100) = 1$); $1.039 = \\tfrac{1039}{1000}$, lowest as well ($\\gcd(1039, 1000) = 1$).',
                    'Hence $\\tfrac{9}{10}$, $\\tfrac{27}{100}$, $\\tfrac{1039}{1000}$ — the bridge read backwards, no simplification needed here.',
                  ],
                  answer: '9/10; 27/100; 1039/1000',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Write 42.357 in expanded form, and name the place of each digit.',
                  solution: [
                    'Now, the point splits the number: $42$ wholes, then tenths, hundredths, thousandths.',
                    'So the expanded form spreads each digit across its column: $42.357 = 4 \\times 10 + 2 \\times 1 + 3 \\times \\tfrac{1}{10} + 5 \\times \\tfrac{1}{100} + 7 \\times \\tfrac{1}{1000}$.',
                    'Next, the places, left to right: $4$ tens, $2$ ones, $3$ tenths, $5$ hundredths, $7$ thousandths.',
                    'Hence $42.357 = 40 + 2 + 0.3 + 0.05 + 0.007$ — seven places if the mirror counted tens, five digits and one hinge here.',
                  ],
                  answer: '4 × 10 + 2 × 1 + 3/10 + 5/100 + 7/1000 (tens, ones, tenths, hundredths, thousandths)',
                },
                {
                  q: 'How many hundredths are there in 2.05?',
                  solution: [
                    'Now, read $2.05$ on the hundredths ruler: two wholes are $200$ hundredths, and the $5$ in the hundredths column adds five more.',
                    'So $2.05 = \\tfrac{205}{100}$ — $205$ hundredths in all.',
                    'Next, the zero in the tenths column costs nothing in this count: the hundredths ruler does not care how the wholes were dressed.',
                    'Hence $205$ hundredths — the same number that $2.05$ names, counted in its own finest pieces.',
                  ],
                  answer: '205 hundredths (2.05 = 205/100)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Re-cut and write as decimals: 1/2, 3/5, 7/20 and 9/25.',
                  solution: [
                    'Now, each denominator is built from 2s and 5s, so the atom test licenses an exact dress — re-cut to the nearest power of ten.',
                    'So $\\tfrac{1}{2} = \\tfrac{5}{10} = 0.5$ (factor $\\tfrac{5}{5}$) and $\\tfrac{3}{5} = \\tfrac{6}{10} = 0.6$ (factor $\\tfrac{2}{2}$).',
                    'Next, $\\tfrac{7}{20} = \\tfrac{35}{100} = 0.35$ (factor $\\tfrac{5}{5}$) and $\\tfrac{9}{25} = \\tfrac{36}{100} = 0.36$ (factor $\\tfrac{4}{4}$).',
                    'Hence $0.5$, $0.6$, $0.35$, $0.36$ — two one-place dresses, two two-place dresses, each denominator landing on its 10-family ruler.',
                  ],
                  answer: '0.5; 0.6; 0.35; 0.36',
                },
                {
                  q: 'Express as rupees: (a) 30 rupees 40 paise; (b) 5 paise.',
                  solution: [
                    'Now, paise are hundredths of a rupee — the small unit names the place.',
                    'So (a) $40$ paise $= \\tfrac{40}{100}$ rupee: ₹$30.40$ — four in the tenths column, nothing trapped.',
                    'And (b) $5$ paise $= \\tfrac{5}{100}$ rupee: the tenths column must be zero-filled — ₹$0.05$, not ₹$0.5$ (which would be fifty paise).',
                    'Hence (a) ₹$30.40$, (b) ₹$0.05$ — the zero-filling discipline, applied twice.',
                  ],
                  answer: '(a) ₹30.40; (b) ₹0.05',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Express in decimal notation: (a) 12 cm 5 mm as cm; (b) 2 m 45 cm as m; (c) 86 mm as cm.',
                  solution: [
                    'Now, millimetres are tenths of a centimetre and centimetres are hundredths of a metre.',
                    'So (a) $5$ mm $= \\tfrac{5}{10}$ cm: 12 cm 5 mm $= 12.5$ cm.',
                    'And (b) $45$ cm $= \\tfrac{45}{100}$ m: $2.45$ m; (c) $86$ mm $= 8$ cm $6$ mm $= 8.6$ cm.',
                    'Hence $12.5$ cm, $2.45$ m, $8.6$ cm — three conversions, one rule: the small unit names the place.',
                  ],
                  answer: '(a) 12.5 cm; (b) 2.45 m; (c) 8.6 cm',
                },
                {
                  q: 'Arrange in ascending order: 0.21, 0.099, 0.4, 0.1, 0.35.',
                  solution: [
                    'Now, pad every tail to three places — licensed by the trailing-zero licence: $0.210$, $0.099$, $0.400$, $0.100$, $0.350$.',
                    'So read as thousandths: $210$, $99$, $400$, $100$, $350$.',
                    'Next, order the whole counts: $99 < 100 < 210 < 350 < 400$.',
                    'Hence $0.099 < 0.1 < 0.21 < 0.35 < 0.4$ — and note the honest upset: $0.099$, with the most digits, is the smallest of all.',
                  ],
                  answer: '0.099 < 0.1 < 0.21 < 0.35 < 0.4',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'exam-style: Which is greater — (a) 5.64 or 5.603? (b) 0.5 or 0.45?',
                  solution: [
                    'Now, align the points and pad: $5.640$ against $5.603$; $0.50$ against $0.45$.',
                    'So (a): wholes $5 = 5$, tenths $6 = 6$, hundredths $4 > 0$ — the first difference decides.',
                    'And (b): $50 > 45$ hundredths — one place beats two.',
                    'Hence (a) $5.64 > 5.603$ and (b) $0.5 > 0.45$ — the more-digits fraud retired twice in one exercise.',
                  ],
                  answer: '(a) 5.64 (5.640 vs 5.603); (b) 0.5 (50 > 45 hundredths)',
                },
                {
                  q: 'exam-style: Convert: (a) 2750 g to kg; (b) ₹0.50 to paise.',
                  solution: [
                    'Now, grams are thousandths of a kilogram, and paise are hundredths of a rupee — the bridge runs both ways.',
                    'So (a) $2750$ g $= \\tfrac{2750}{1000}$ kg $= 2.750$ kg $= 2.75$ kg — the trailing zeros strip freely.',
                    'And (b) ₹$0.50 = 50 \\times ₹0.01 = 50$ paise — half a rupee, as the fraction face always said ($0.5 = \\tfrac{1}{2}$).',
                    'Hence (a) $2.75$ kg, (b) $50$ paise — one conversion each way across the same point.',
                  ],
                  answer: '(a) 2.75 kg; (b) 50 paise',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the trailing-zero licence: appending zeros after the last digit of a decimal never changes the amount. Hence show 0.5 = 0.50 = 0.500 and 7 = 7.0.',
                  solution: [
                    'Licence: the multiplying rule of Lesson 4.2 permits raising a fraction by any legal factor $\\tfrac{c}{c} = 1$.',
                    'Now, appending one zero shifts every fractional digit one place finer — exactly the re-cutting $\\tfrac{5}{10} = \\tfrac{5 \\times 10}{10 \\times 10} = \\tfrac{50}{100}$: numerator and denominator both multiplied by $10$, the legal factor $\\tfrac{10}{10} = 1$.',
                    'So each further zero repeats the argument: $\\tfrac{5}{10} = \\tfrac{50}{100} = \\tfrac{500}{1000}$ — five tenths, fifty hundredths, five hundred thousandths, one amount in three finenesses. The amount never moves because no step divides or adds anything: only the ruler\'s graduation changed.',
                    'Hence $0.5 = 0.50 = 0.500$, and wholes join too: $7 = \\tfrac{70}{10} = 7.0$. Padding before comparing is licensed forever; leading zeros after the point are not part of the licence — $0.05 \\ne 0.5$. □',
                  ],
                  answer: '5/10 = 50/100 = 500/1000 (each step × 10/10 = 1); 7 = 70/10 = 7.0 — trailing zeros move nothing',
                },
                {
                  q: 'State and prove the atom test. Apply it: which of 7/8, 5/12, 9/40 and 11/250 wear exact decimal dresses, and how many places does each dress need?',
                  solution: [
                    'Licence: lowest terms $\\tfrac{a}{b}$; the atoms of $b$ from Lesson 3.2; the multiplying rule of Lesson 4.2.',
                    'Now, the re-cut direction: if $b = 2^m \\times 5^n$ with $m \\ge n$, multiply top and bottom by $5^{m-n}$ — the denominator becomes $2^m \\cdot 5^n \\cdot 5^{m-n} = 10^m$, so $\\tfrac{a}{b} = \\tfrac{a \\cdot 5^{m-n}}{10^m}$, an exact decimal with $\\max(m, n)$ places (symmetric when $n > m$).',
                    'So the refusal direction: $10^k = 2^k \\times 5^k$ carries no other atoms (uniqueness of factorisation), so a denominator with atom $3$, $7$, $11$, … can never divide any $10^k$ — no re-cut reaches a 10-family ruler, and no exact dress exists.',
                    'Hence the applications: $8 = 2^3$ wears $3$ places — $\\tfrac{7}{8} = 0.875$; $12 = 2^2 \\times 3$ refuses forever — $\\tfrac{5}{12}$ has no exact decimal dress; $40 = 2^3 \\times 5$ wears $3$ — $\\tfrac{9}{40} = \\tfrac{225}{1000} = 0.225$; $250 = 2 \\times 5^3$ wears $3$ — $\\tfrac{11}{250} = \\tfrac{44}{1000} = 0.044$. □',
                  ],
                  answer: '7/8: yes, 3 places (0.875); 5/12: never (atom 3); 9/40: 3 places (0.225); 11/250: 3 places (0.044)',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The point has earned its keep. The mirror of place value now balances on the ones and keeps dividing to the right; the 10-family fractions of chapter 4 stand revealed as decimals all along; and the atom test settles exactly which fractions can wear the dress — the 2s and 5s land, everyone else walks forever. One bridge is still unbuilt: for $\\tfrac{1}{3}$, $\\tfrac{5}{12}$, $\\tfrac{22}{7}$, some decimal name must exist, and lesson 5.2 watches long division build it — and recur, and why. Then 5.3 teaches the four operations to decimals, and 5.4 hands the exam hall its favourite costume: percent, the fraction that agreed to be measured out of $100$.',
        },
      ],
    },
    {
      id: 'fm-decimals-and-fractions-two-ways',
      number: '5.2',
      title: 'Decimals and Fractions, Two Ways of Writing the Same Numbers',
      concepts: [
        'Long division as the decimal machine',
        'Terminating decimals',
        'Recurring decimals and the repetend',
        'The remainder carousel (pigeonhole)',
        'Pure and mixed recurrence',
        'Shift-and-subtract: the bridge backwards',
        'The atoms of the base',
      ],
      objectives: [
        'Run the long-division step machine past the point — multiply the remainder by ten, divide, record the digit — and justify why each step is legal',
        'Classify any fraction in advance: terminating in max(m, n) places (only 2s and 5s), pure recurring (no 2s or 5s), or mixed recurring (a head of max(m, n) places, then a cycle)',
        'Prove the dresses theorem by the pigeonhole argument on remainders, and read cycle lengths as the order of 10 modulo the denominator',
        'Convert every recurring decimal back to its fraction by shift-and-subtract, and compare recurring decimals with truncated ones without being fooled',
      ],
      prerequisites: ['fm-division-remainders-zero', 'fm-decimal-places-and-the-point', 'fm-prime-numbers-factorisation'],
      sources: ['khattar-qa-4e', 'ncert-math6-ch8', 'ncert-math9-ch1'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 5.1 ended at a fence. The atom test pays out decimal dresses for every denominator built from 2s and 5s — and refuses every other: $\\tfrac{1}{3}$, $\\tfrac{5}{12}$, $\\tfrac{22}{7}$ have no exact dress in tenths, hundredths or thousandths, no re-cut however clever. Yet the number line has no gaps: the point one-third of the way from $0$ to $1$ is a real address, and some decimal spelling must reach it. The tool has been in the kit since chapter 2 — division with a remainder, the tableau of Lesson 2.4 — and the only new licence is this: **let the division run past the point**. Every fraction then writes its own decimal name, digit by digit, and the remainders themselves announce when the name stops and when it dances.',
        },
        {
          kind: 'para',
          text: 'The plan of the lesson follows the machine. First the **step**: what long division does at each place after the point, and why it is legal (it is the multiplying rule of Lesson 4.2 in working clothes). Then the two fates of the remainders — die at zero (**terminating**) or return to a former self (**recurring**) — with the pigeonhole argument that proves there is no third fate. Then the anatomy of recurrence: pure against mixed, the **repetend** and its length, the head that the 2-and-5 part always pays for. Last, the bridge run backwards: shift-and-subtract turns any recurring decimal into its fraction, and the two costumes close around one number.',
        },
        {
          kind: 'equation',
          latex: '\\tfrac{a}{b} = q + \\tfrac{r}{b}, \\qquad \\text{next digit} = \\left\\lfloor \\tfrac{10r}{b} \\right\\rfloor, \\qquad \\text{next remainder} = 10r - b\\left\\lfloor \\tfrac{10r}{b} \\right\\rfloor \\tag{1}',
          note: 'where $q$ is the whole part already reported and $r$ the remainder still owed. Each step of the machine converts one remainder into one digit — the tenths of the debt — and a new, smaller-or-equal remainder. Bring down a zero; repeat.',
        },
        {
          kind: 'para',
          text: 'Why the step is legal: the identity $\\tfrac{r}{b} = \\tfrac{1}{10} \\cdot \\tfrac{10r}{b}$ is Lesson 4.2\'s multiplying rule with the legal factor $\\tfrac{10}{10} = 1$ — the remainder\'s debt measured in tenths instead of wholes. The digit $\\lfloor 10r/b \\rfloor$ is the largest whole count of tenths the debt can furnish, and $10r - b\\lfloor 10r/b \\rfloor$ is what still owes. Nothing is approximated and nothing is discarded: the machine is the division algorithm of Lesson 2.4, given a longer stage.',
        },
        { kind: 'heading', text: 'Terminating decimals: when the remainders die' },
        {
          kind: 'para',
          text: 'Run $\\tfrac{3}{8}$ through the machine. The whole part is $0$ — three ones cannot furnish an eight — so the point opens at once and the tenths take over: $30 \\div 8$ gives digit $3$, remainder $6$; the six owed tenths become $60$ hundredths, and $60 \\div 8$ gives digit $7$, remainder $4$; the four owed hundredths become $40$ thousandths, and $40 \\div 8$ gives digit $5$, remainder $0$. **Remainder zero: the debt is paid exactly, the decimal stops.** $\\tfrac{3}{8} = 0.375$, three places — and $8 = 2^3$, so the atom test had already promised exactly $\\max(3, 0) = 3$ places. The machine and the re-cut agree, as two views of one fact must.',
        },
        {
          kind: 'example',
          title: 'Divide 3 by 8 and watch the remainders die',
          steps: [
            'Now, the whole part is $0$: three ones cannot furnish an eight, so the point opens at once and the tenths take over.',
            'So the step machine turns: $30 \\div 8$ gives digit $3$, remainder $6$ — three tenths reported, six tenths still owed.',
            'And again: $60 \\div 8$ gives $7$ and owes $4$ hundredths; then $40 \\div 8$ gives $5$ and owes $0$ thousandths.',
            'Hence $\\tfrac{3}{8} = 0.375$, terminating in three places — exactly $\\max(3, 0)$, as the atom test promised for $8 = 2^3$.',
          ],
        },
        {
          kind: 'para',
          text: 'The division side explains the atom test from inside the machine. Each step multiplies the debt by $10 = 2 \\times 5$, so the paying power grows by one $2$-atom and one $5$-atom per place; a denominator built of 2s and 5s is eventually outvoted and remainder $0$ arrives. A denominator carrying any other atom — $3$, $7$, $11$ — can never be matched by counts of $2$s and $5$s alone (Lesson 3.2\'s uniqueness of factorisation), so the debt never dies. Two proofs, one theorem: the re-cut of Lesson 5.1 and the remainders of this lesson are the atom test in two costumes.',
        },
        { kind: 'heading', text: 'Recurring decimals: when the remainders dance' },
        {
          kind: 'para',
          text: 'Now divide $\\tfrac{5}{12}$ and watch what happens when the debt does **not** die. $50 \\div 12$ gives digit $4$, remainder $2$; $20 \\div 12$ gives digit $1$, remainder $8$; $80 \\div 12$ gives digit $6$, remainder $8$ — **the same remainder $8$ has returned**. The machine has no memory beyond its remainder: from remainder $8$ it must replay exactly the moves it just made, emitting $6$, and $6$, and $6$, forever. So $\\tfrac{5}{12} = 0.41666\\ldots$, written $0.41\\overline{6}$ with a bar over the dancing digit. The head $41$ is the $2$-part of twelve paying out $\\max(2, 0) = 2$ places; the eternal $6$ is the stranger atom $3$\'s signature.',
        },
        {
          kind: 'example',
          title: 'Divide 5 by 12: the head, then the waltz',
          steps: [
            'Now, $50 \\div 12$ reports digit $4$ and owes $2$: four tenths down, the $2^2$-part of twelve beginning to pay.',
            'So $20 \\div 12$ reports $1$ and owes $8$; then $80 \\div 12$ reports $6$ and owes $8$ — the same remainder $8$, back where it stood one step ago.',
            'And the machine has no memory beyond its remainder: remainder $8$ must replay the very same move, emitting $6$ forever.',
            'Hence $\\tfrac{5}{12} = 0.41\\overline{6}$: a two-place head, then one digit waltzing — the head exactly $\\max(2, 0) = 2$ places, the cycle the atom $3$\'s signature.',
          ],
        },
        {
          kind: 'para',
          text: 'The return of a remainder is not luck; it is forced. The remainders are whole numbers in $\{0, 1, \\ldots, b-1\}$ — $b$ cells. If the walk ever lands on $0$, the dress terminates. Otherwise it lives in the $b - 1$ nonzero cells, and a walk longer than $b - 1$ steps must visit some cell twice — the pigeonhole principle, the same counting that Lesson 3.4 used on remainders mod a number. And once a remainder returns, determinism takes over: the next digit and the next remainder depend on the current remainder alone, so the machine replays the same moves forever. The repeating block of digits is the **repetend**, and a decimal that carries one forever is **recurring**. Every fraction lands in one of the two dresses; there is no third. State it, then prove it on the rail:',
        },
        {
          kind: 'derivation',
          title: 'The dresses theorem: every fraction terminates or recurs',
          statement:
            'Claim: the long-division decimal of any fraction $\\tfrac{a}{b}$ ($b > 1$) either terminates or is recurring from some place on — and if a remainder repeats, the block of digits between the two visits repeats forever.',
          steps: [
            {
              label: 'The state of the machine',
              formula: 'r_{k+1} = 10\\,r_k - b\\left\\lfloor \\tfrac{10\\,r_k}{b} \\right\\rfloor',
              explanation:
                'The next remainder is computed from the current one alone — the digit reported and the debt kept depend on nothing else. The machine is a deterministic walk on the cells $0, 1, \\ldots, b-1$: same remainder in, same digit and same remainder out, every time.',
            },
            {
              label: 'Cell zero ends the walk',
              formula: 'r = 0 \\;\\Rightarrow\\; \\text{the dress is finished (terminating)}',
              explanation:
                'A zero remainder means the debt is paid exactly; every later step would report $0$ and keep $0$. This is the 2-and-5 family of Lesson 5.1, now seen from the division side.',
            },
            {
              label: 'Pigeonhole forces a return',
              formula: 'b - 1 \\text{ nonzero cells, walk longer than } b - 1 \\text{ steps} \\;\\Rightarrow\\; \\text{some } r \\text{ repeats}',
              explanation:
                'If the walk never visits $0$, it lives in the $b - 1$ nonzero cells. Past step $b$ some cell must have been revisited — the pigeonhole principle. No memory, no escape: the walk is a loop from there on.',
            },
            {
              label: 'A return replays the film',
              formula: 'r_j = r_i \\;\\Rightarrow\\; d_{j+1} = d_{i+1},\\; d_{j+2} = d_{i+2},\\; \\ldots',
              explanation:
                'Determinism again: the same remainder produces the same digit and the same next remainder, forever. The block of digits from visit $i$ to visit $j$ is the repetend, and it repeats without end — with length at most $j - i \\le b - 1$.',
            },
          ],
          result:
            'Every fraction wears a decimal dress that either terminates or recurs in blocks — and the repetend is never longer than b − 1 digits, because the dance floor has only b − 1 nonzero cells.',
        },
        {
          kind: 'figure',
          caption:
            'The remainder carousel of 1/7. Six cells hold the six possible nonzero remainders; each step multiplies by 10 and divides by 7 — the digit leaves on the arrow, the remainder stays in the cell. Walking from remainder 1 emits the digits 1, 4, 2, 8, 5, 7 and returns to remainder 1: the block 142857 repeats forever, so 1/7 = 0.142857142857…',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The remainder carousel of one seventh: six remainder cells on a circle, arrows labelled with the emitted digits 1 4 2 8 5 7, returning to the start after six steps">
  <g font-size="13" fill="currentColor">
    <circle cx="380" cy="225" r="140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
    <circle cx="380" cy="85" r="26" fill="none" stroke="#b45309" stroke-width="1.5"/>
    <circle cx="380" cy="85" r="31" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="3 3"/>
    <circle cx="501.24" cy="155" r="26" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="501.24" cy="295" r="26" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="380" cy="365" r="26" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="258.76" cy="295" r="26" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="258.76" cy="155" r="26" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <g fill="#b45309" font-weight="700" font-size="15">
      <polygon points="456.06,107.26 444.54,105.22 448.54,98.29"/>
      <polygon points="520,232 516,221 524,221"/>
      <polygon points="443.94,349.74 451.46,340.78 455.46,347.71"/>
      <polygon points="303.94,342.74 315.46,344.78 311.46,351.71"/>
      <polygon points="240,218 244,229 236,229"/>
      <polygon points="316.06,100.26 308.54,109.22 304.54,102.29"/>
    </g>
    <g fill="#b45309" font-weight="700" font-size="15" text-anchor="middle">
      <text x="464" y="85">1</text>
      <text x="548" y="230">4</text>
      <text x="464" y="376">2</text>
      <text x="296" y="376">8</text>
      <text x="212" y="230">5</text>
      <text x="296" y="85">7</text>
    </g>
    <g fill="currentColor" font-weight="700" font-size="14" text-anchor="middle">
      <text x="380" y="42" fill="#b45309">1 (start)</text>
      <text x="539.3" y="138">3</text>
      <text x="539.3" y="322">2</text>
      <text x="380" y="414">6</text>
      <text x="220.7" y="322">4</text>
      <text x="220.7" y="138">5</text>
    </g>
    <g text-anchor="middle" font-size="12" opacity="0.85">
      <text x="380" y="184">each step: × 10, then ÷ 7 —</text>
      <text x="380" y="206">the digit leaves on the arrow,</text>
      <text x="380" y="228">the remainder stays in the cell;</text>
      <text x="380" y="250">after six steps remainder 1 returns</text>
      <text x="380" y="272" font-style="italic">and the block 142857 repeats forever</text>
    </g>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Walk the carousel slowly, one remainder at a time. Start with remainder $1$; multiply by ten to hold $10$; $10 = 1 \\times 7 + 3$, so the digit $1$ leaves and remainder $3$ stays. Then $30 = 4 \\times 7 + 2$: digit $4$, remainder $2$. Then $20 = 2 \\times 7 + 6$: digit $2$, remainder $6$; $60 = 8 \\times 7 + 4$: digit $8$, remainder $4$; $40 = 5 \\times 7 + 5$: digit $5$, remainder $5$; $50 = 7 \\times 7 + 1$: digit $7$, remainder $1$ — **the start**. Six steps, six digits: $1, 4, 2, 8, 5, 7$. So $\\tfrac{1}{7} = 0.\\overline{142857}$, a pure waltz of cycle six — the longest any dance floor below ten allows, since $b - 1 = 6$ cells is all a seventh offers.',
        },
        { kind: 'heading', text: 'Pure and mixed recurrence' },
        {
          kind: 'para',
          text: 'Recurrence comes in two shapes, and the atoms announce which. When the denominator shares no atom with ten — no 2s, no 5s — no remainder can ever die, and the cycle begins at the point itself: **pure recurring**. When the denominator mixes 2s and 5s with a stranger, the 2-and-5 part pays out its $\\max(m, n)$ head places first and the stranger\'s cycle begins where the head ends: **mixed recurring**. The head-length theorem below makes "exactly" exact; first the shapes, by example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$\\tfrac{1}{3}$: the denominator $3$ shares no atom with $10$, so the dress is pure recurring — and $10 \\equiv 1 \\pmod{3}$ gives cycle $1$: $0.\\overline{3}$;',
            '$\\tfrac{1}{11}$: $10 \\equiv -1 \\pmod{11}$, so each shift flips the sign of the debt and the digits pair off — cycle $2$: $0.\\overline{09}$;',
            '$\\tfrac{1}{37}$: $999 = 27 \\times 37$, so $10^3 \\equiv 1 \\pmod{37}$ — cycle $3$: $0.\\overline{027}$, the lead zero holding the tenths and hundredths columns;',
            '$\\tfrac{1}{7}$: the smallest $k$ with $10^k \\equiv 1 \\pmod 7$ is $6$ — cycle $6$: $0.\\overline{142857}$, the longest waltz below ten.',
          ],
        },
        {
          kind: 'para',
          text: 'The pattern in the roman list is the right way to read cycle lengths. The walk returns to its starting remainder exactly when a power of ten leaves remainder $1$ on division by the denominator; the smallest such power counts the steps. Denominators near the 10-family waltz briefly: $3$ and $9$ (since $10 \\equiv 1$) in cycle one, $11$ (since $10 \\equiv -1$) in cycle two, $27$ and $37$ (since $999 = 27 \\times 37$) in cycle three. Denominators far from it — $7$, $13$ — take the full six. And mixed dresses carry the head the theorem promises: $\\tfrac{1}{6} = 0.1\\overline{6}$ (head $\\max(1, 0) = 1$), $\\tfrac{7}{30} = 0.2\\overline{3}$ (head $\\max(1, 1) = 1$), $\\tfrac{13}{22} = 0.5\\overline{90}$ (head $1$, cycle $2$), $\\tfrac{11}{150} = 0.07\\overline{3}$ (head $\\max(1, 2) = 2$).',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Long division step',
              def: 'The machine\'s single move past the point: multiply the remainder by ten, divide by the denominator, record the digit, keep the new remainder — digit = floor(10r/b), next remainder = 10r mod b. Remainder 0 stops the walk; a revisited remainder starts the dance.',
            },
            {
              term: 'Terminating decimal',
              def: 'A decimal whose digits stop — the long-division remainder reached 0. Happens exactly when the denominator (lowest terms) carries only 2s and 5s, and the dress then needs max(m, n) places: 3/8 = 0.375 (8 = 2³, three places).',
            },
            {
              term: 'Recurring decimal',
              def: 'A decimal whose digits repeat in blocks forever from some place on — the long-division remainder revisited a former self. 1/3 = 0.3̄; 22/7 = 3.142857̄. Every fraction terminates or recurs; there is no third dress.',
            },
            {
              term: 'Repetend',
              def: 'The repeating block of a recurring decimal, marked with a vinculum — the same bar that grouped BODMAS expressions in Lesson 2.5. The block 142857 in 0.142857̄; its length is at most b − 1 digits.',
            },
            {
              term: 'Pure recurring decimal',
              def: 'A recurring decimal whose cycle starts at the decimal point: 1/3 = 0.3̄, 1/11 = 0.09̄, 4/33 = 0.12̄. Happens when the denominator shares no atom with 10 — no 2s, no 5s.',
            },
            {
              term: 'Mixed recurring decimal',
              def: 'A recurring decimal with a non-repeating head before the cycle: 5/12 = 0.416̄. The head lasts exactly max(m, n) places — the 2-and-5 part of the denominator paying out — then the stranger atoms waltz.',
            },
            {
              term: 'Cycle length',
              def: 'The number of digits in the repetend: 1 for 1/3, 2 for 1/11, 3 for 1/37, 6 for 1/7. For pure recurrence it is the smallest k with 10^k leaving remainder 1 on division by b — and never more than b − 1.',
            },
          ],
        },
        {
          kind: 'derivation',
          title: 'The head-length theorem: how long the mixed dress hesitates',
          statement:
            'Claim: if $b = 2^m \\times 5^n \\times c$ with $c$ carrying no 2s and no 5s, the decimal of $\\tfrac{a}{b}$ (lowest terms) has exactly $\\max(m, n)$ non-repeating head places, after which it is purely recurring with the cycle of the stranger part.',
          steps: [
            {
              label: 'The head pays the 2-and-5 part',
              formula: 'H = \\max(m, n) \\;\\Rightarrow\\; \\tfrac{a \\cdot 10^{H}}{b} \\text{ reduces to a fraction with denominator } c',
              explanation:
                'After H shifts the machine has measured the debt in 10^H-ths: 2^m·5^n divides 10^H exactly (H ≥ m and H ≥ n), so those atoms cancel and the reduced debt carries only the stranger denominator c — 5/12 after two shifts is 125/3; 11/150 after two shifts is 22/3.',
            },
            {
              label: 'A denominator coprime to ten walks purely',
              formula: '\\gcd(c, 10) = 1 \\;\\Rightarrow\\; \\text{pure recurrence from here}',
              explanation:
                'With no 2s or 5s in c, no power of ten can ever kill the debt, so the walk never lands on 0 — and the dresses theorem delivers a cycle at once. The tail after the head is therefore purely recurring.',
            },
            {
              label: 'Why the head cannot be shorter',
              formula: 'k < \\max(m, n) \\;\\Rightarrow\\; 2^m \\cdot 5^n \\nmid 10^k',
              explanation:
                'A shorter shift leaves some 2 or 5 atoms unpaid — 10^k carries only k of each atom, too poor to match the 2-and-5 part. The digits before place max(m, n) are genuinely mixed: they belong to the paying-out, not to the cycle.',
            },
          ],
          result:
            'The head lasts exactly max(m, n) places — the 2-and-5 part paying out in full — then the stranger atoms take over with a pure cycle: 5/12 head 2 then cycle 1; 13/22 head 1 then cycle 2; 11/150 head 2 then cycle 1.',
        },
        {
          kind: 'figure',
          caption:
            'The map of the bridge: the atoms of the denominator decide the dress before any dividing is done. Only 2s and 5s — the walk dies, and the decimal terminates in max(m, n) places. 2s, 5s and strangers — the head pays max(m, n) places, then the stranger\'s cycle waltzes. No 2s, no 5s — the cycle starts at the point itself and runs at most b − 1 digits. Every fraction lands in exactly one lane.',
          svg: `<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three-lane map: the atoms of the denominator decide between terminating, mixed recurring and pure recurring decimal dresses, with a worked instance in each lane">
  <g font-size="13" fill="currentColor">
    <rect x="230" y="22" width="300" height="36" rx="6" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <text x="380" y="45" text-anchor="middle" font-size="13" font-weight="700">the atoms of b (in lowest terms)</text>
    <g stroke="currentColor" stroke-width="1" fill="none" opacity="0.8">
      <line x1="380" y1="60" x2="380" y2="84"/>
      <line x1="150" y1="84" x2="610" y2="84"/>
      <line x1="150" y1="84" x2="150" y2="108"/>
      <line x1="380" y1="84" x2="380" y2="108"/>
      <line x1="610" y1="84" x2="610" y2="108"/>
      <line x1="150" y1="198" x2="150" y2="228"/>
      <line x1="380" y1="198" x2="380" y2="228"/>
      <line x1="610" y1="198" x2="610" y2="228"/>
    </g>
    <g fill="currentColor" opacity="0.8">
      <polygon points="146,108 154,108 150,116"/>
      <polygon points="376,108 384,108 380,116"/>
      <polygon points="606,108 614,108 610,116"/>
      <polygon points="146,228 154,228 150,236"/>
      <polygon points="376,228 384,228 380,236"/>
      <polygon points="606,228 614,228 610,236"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="45" y="120" width="210" height="76" rx="6"/>
      <rect x="275" y="120" width="210" height="76" rx="6"/>
      <rect x="505" y="120" width="210" height="76" rx="6"/>
    </g>
    <g text-anchor="middle">
      <text x="150" y="142" font-size="13" font-weight="700">TERMINATING</text>
      <text x="150" y="162" font-size="12" opacity="0.9">only 2s and 5s: the remainders</text>
      <text x="150" y="180" font-size="12" opacity="0.9">reach 0 — max(m, n) places</text>
      <text x="380" y="142" font-size="13" font-weight="700">MIXED RECURRING</text>
      <text x="380" y="162" font-size="12" opacity="0.9">2s, 5s and strangers: a head of</text>
      <text x="380" y="180" font-size="12" opacity="0.9">max(m, n), then the cycle</text>
      <text x="610" y="142" font-size="13" font-weight="700">PURE RECURRING</text>
      <text x="610" y="162" font-size="12" opacity="0.9">no 2s, no 5s: the cycle starts</text>
      <text x="610" y="180" font-size="12" opacity="0.9">at the point — at most b − 1 digits</text>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3">
      <rect x="45" y="240" width="210" height="72" rx="6"/>
      <rect x="275" y="240" width="210" height="72" rx="6"/>
      <rect x="505" y="240" width="210" height="72" rx="6"/>
    </g>
    <g text-anchor="middle" font-size="12">
      <text x="150" y="262" font-weight="700">7/8 = 0.875</text>
      <text x="150" y="280" opacity="0.9">8 = 2 × 2 × 2:</text>
      <text x="150" y="298" opacity="0.9">three places, paid in full</text>
      <text x="380" y="262" font-weight="700">5/12 = 0.41666…</text>
      <text x="380" y="280" opacity="0.9">12 = 2 × 2 × 3: head 2 places,</text>
      <text x="380" y="298" opacity="0.9">then 6 forever (cycle 1)</text>
      <text x="610" y="262" font-weight="700">1/3 = 0.333… (cycle 1)</text>
      <text x="610" y="280" opacity="0.9">1/7 = 0.142857… (cycle 6),</text>
      <text x="610" y="298" opacity="0.9">1/11 = 0.0909… (cycle 2)</text>
    </g>
    <g text-anchor="middle" font-size="12" font-style="italic" opacity="0.85">
      <text x="380" y="430">every fraction wears exactly one of the two dresses — no third decimal exists:</text>
      <text x="380" y="450">the walk dies at remainder 0 (terminating) or returns to a remainder it has met (recurring).</text>
    </g>
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'The bridge runs both ways: recurring to fraction' },
        {
          kind: 'para',
          text: 'Lesson 5.1 crossed the bridge from fractions to decimals; the machine crosses back, and the ticket is one algebraic trick: **the infinite tail is unchanged by a shift, so subtraction cancels it**. Name the recurring decimal $x$, shift the point by a whole number of places, and subtract — the endless tails are identical and annihilate exactly, leaving a plain fraction. Nothing is assumed about infinity that the machine has not already earned: the tails are the same block, repeating.',
        },
        {
          kind: 'example',
          title: 'Convert 0.3̄ to a fraction',
          steps: [
            'Now, name the walker: let $x = 0.\\overline{3}$, the tail of threes running forever.',
            'So shift one place: $10x = 3.\\overline{3}$ — and the tail after the point is the identical tail of threes.',
            'And subtract: $10x - x = 3.\\overline{3} - 0.\\overline{3} = 3$, the infinite tails cancelling exactly — so $9x = 3$.',
            'Hence $x = \\tfrac{3}{9} = \\tfrac{1}{3}$: the bridge carries the walker home, and $\\tfrac{1}{3} = 0.\\overline{3}$ in both directions.',
          ],
        },
        {
          kind: 'para',
          text: 'The general rule reads off the anatomy. A **pure** repetend of $k$ digits converts over a denominator of $k$ nines: $0.\\overline{36} = \\tfrac{36}{99} = \\tfrac{4}{11}$, and the star specimen $0.\\overline{142857} = \\tfrac{142857}{999999} = \\tfrac{1}{7}$ — six nines, and the machine\'s own bookkeeping $142857 \\times 7 = 999999$ confirms the reduction. The bar itself deserves a bow: it is the **vinculum** of Lesson 2.5, the same bar that grouped BODMAS expressions, now marking the block that repeats. A **mixed** decimal needs two shifts — one to clear the head, one to cancel the cycle — and the arithmetic below writes the rule itself.',
        },
        {
          kind: 'equation',
          latex: '0.\\overline{a_1 a_2 \\ldots a_k} = \\tfrac{\\overline{a_1 a_2 \\ldots a_k}}{10^k - 1} \\qquad \\text{(one 9 per repetend digit)} \\tag{2}',
          note: 'with a head of H places, subtract the head from the shifted block and divide by $(10^k - 1) \\cdot 10^H$ — one 9 per cycle digit followed by one 0 per head digit. The shift-and-subtract derivation is the proof; the formula is its receipt.',
        },
        {
          kind: 'example',
          title: 'Convert 0.142857̄ to a fraction',
          steps: [
            'Now, the repetend runs six digits, so the shift is six places: let $x = 0.\\overline{142857}$ and form $1000000x = 142857.\\overline{142857}$.',
            'So subtract: $999999x = 142857$, the tails cancelling — the carousel\'s own arithmetic made algebra.',
            'And $x = \\tfrac{142857}{999999}$, which chapter 3\'s toolkit reduces: $\\gcd(142857, 999999) = 142857$, so $x = \\tfrac{1}{7}$.',
            'Hence $0.\\overline{142857} = \\tfrac{1}{7}$ — the waltz and the fraction are one number in two dresses.',
          ],
        },
        {
          kind: 'para',
          text: 'The mixed case works the same lever twice. For $0.41\\overline{6}$: $100x = 41.\\overline{6}$ and $1000x = 416.\\overline{6}$, so $900x = 375$ — the tails cancel, the head is paid — and $x = \\tfrac{375}{900} = \\tfrac{5}{12}$, the refusenik of Lesson 5.1 receiving its fraction back from its decimal. Numerator: the digits through one cycle, minus the head. Denominator: one $9$ per cycle digit followed by one $0$ per head digit. The next Illustration runs it on a two-digit cycle.',
        },
        {
          kind: 'example',
          title: 'Convert 0.245̄45̄ to a fraction',
          steps: [
            'Now, the head is one digit ($2$) and the cycle two ($45$): shift past the head first, then through the cycle.',
            'So $10x = 2.\\overline{45}$ and $1000x = 245.\\overline{45}$; subtracting, $990x = 243$ — the tails cancel, the head is paid.',
            'And $x = \\tfrac{243}{990}$, which chapter 3\'s toolkit reduces by $\\gcd 9$: $x = \\tfrac{27}{110}$.',
            'Hence $0.2\\overline{45} = \\tfrac{27}{110}$ — numerator $245 - 2$, denominator $990$: one $9$ per cycle digit, one $0$ per head digit, exactly as the rule recites.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: '0.9̄ is one whole',
          text: 'The shift leaves no room for "almost". Let $x = 0.\\overline{9}$; then $10x = 9.\\overline{9}$, and subtracting gives $9x = 9$ — so $x = 1$ **exactly**, the same number as $\\tfrac{9}{9}$. Two decimal names, one number: the fraction side never doubted it. Exam papers adore this trap; the dresses theorem sides with the algebra, not the intuition of "infinitely close" — there is no decimal place where a missing $1$ could hide.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why 2 and 5 own base ten',
          text: 'The landers are the atoms of the base itself: $10 = 2 \\times 5$, so a denominator terminates exactly when its atoms divide the base\'s. In base twelve — twelve $= 2^2 \\times 3$ — thirds would land at once ($\\tfrac{1}{3} = 0.4$ twelve, one place) and ninths too ($\\tfrac{1}{9} = 0.14$ twelve), while sevenths would waltz on with the same cycle of six. Terminating versus recurring is not a property of the fraction alone: it is a treaty between the fraction\'s atoms and the base\'s. Base ten happens to employ 2 and 5.',
        },
        {
          kind: 'example',
          title: 'exam-style: Which is greater — 2/7 or 0.2857?',
          steps: [
            'Now, the finite decimal is the fraction $\\tfrac{2857}{10000}$ — four places, no tail claimed.',
            'So cross-multiply with Lesson 4.3\'s licence: $2 \\times 10000 = 20000$ against $7 \\times 2857 = 19999$.',
            'And $20000 > 19999$: the fraction is greater — by exactly $\\tfrac{1}{70000}$, the tail $14\\ldots$ that walks on past the truncation.',
            'Hence $\\tfrac{2}{7} > 0.2857$ — a recurring decimal outlives its own truncation whenever the next cycle digit is not $0$.',
          ],
        },
        {
          kind: 'para',
          text: 'The moral of the last Illustration generalises: never compare an infinite tail with a finite one by eye. Truncation always shortens the recurring walker (its next cycle digit keeps walking), so $\\tfrac{2}{7} > 0.2857$ but $0.2858 > \\tfrac{2}{7}$ — a penny of rounding in the fourth place outweighs the tail. Convert, or cross-multiply exactly; the eye is a poor judge of forever. The same respect applies to $\\tfrac{22}{7}$: its decimal is $3.\\overline{142857}$ — the carousel\'s digits again, after the whole part $3$ — and that is **not** $\\pi$\'s $3.14159\\ldots$: the two differ by about $0.0013$, and examiners set the trap precisely there.',
        },
        {
          kind: 'table',
          head: ['The denominator (lowest terms)', 'The dress', 'The anatomy', 'Instances'],
          rows: [
            ['Only 2s and 5s: $8 = 2^3$', 'terminating', '$\\max(m, n)$ places, no cycle', '$\\tfrac{7}{8} = 0.875$ (3 places)'],
            ['Strangers only, $10 \\equiv 1$: $3, 9$', 'pure recurring', 'cycle $1$', '$\\tfrac{1}{3} = 0.\\overline{3}$; $\\tfrac{1}{9} = 0.\\overline{1}$'],
            ['Strangers, $10 \\equiv -1$ or $10^3 \\equiv 1$: $11$, $27$, $37$', 'pure recurring', 'cycle $2$ or $3$', '$\\tfrac{1}{11} = 0.\\overline{09}$; $\\tfrac{1}{37} = 0.\\overline{027}$; $\\tfrac{4}{33} = 0.\\overline{12}$'],
            ['Strangers, $10^6 \\equiv 1$: $7$, $13$', 'pure recurring', 'cycle $6$', '$\\tfrac{1}{7} = 0.\\overline{142857}$; $\\tfrac{1}{13} = 0.\\overline{076923}$'],
            ['Mixed: $12 = 2^2 \\times 3$; $22 = 2 \\times 11$; $150 = 2 \\times 3 \\times 5^2$', 'mixed recurring', 'head $\\max(m, n)$, then cycle', '$\\tfrac{5}{12} = 0.41\\overline{6}$; $\\tfrac{13}{22} = 0.5\\overline{90}$; $\\tfrac{11}{150} = 0.07\\overline{3}$'],
            ['The universal verdict', 'terminating or recurring', 'no third dress exists', 'every fraction, no exceptions'],
          ],
        },
        {
          kind: 'equation',
          latex: '\\tfrac{1}{3} = 0.\\overline{3} \\qquad \\tfrac{5}{12} = 0.41\\overline{6} \\qquad \\tfrac{22}{7} = 3.\\overline{142857} \\qquad 0.\\overline{9} = 1',
          note: 'Lesson 5.1\'s three refuseniks, finally named — and the two-names-one-number curiosity that closes the census. The bridge is now complete in both directions: every fraction has a decimal name, and every recurring decimal has its fraction back.',
        },
        {
          kind: 'formula',
          name: 'The division step',
          latex: '\\text{digit} = \\left\\lfloor \\tfrac{10r}{b} \\right\\rfloor, \\qquad \\text{next } r = 10r \\bmod b',
          note: 'One move of the machine: multiply the remainder by ten, divide, record the digit, keep the smaller debt. Remainder 0 stops the dress (terminating); a revisited remainder starts the repetend (recurring, length at most b − 1).',
        },
        {
          kind: 'formula',
          name: 'The shift rule (pure recurring)',
          latex: '0.\\overline{a_1 \\ldots a_k} = \\tfrac{\\overline{a_1 \\ldots a_k}}{10^k - 1}',
          note: 'One 9 per repetend digit: 0.3̄ = 3/9 = 1/3; 0.36̄ = 36/99 = 4/11; 0.142857̄ = 142857/999999 = 1/7. Shift k places, subtract, divide by k nines.',
        },
        {
          kind: 'formula',
          name: 'The head + cycle rule (mixed)',
          latex: '0.h_1 \\ldots h_H\\,\\overline{c_1 \\ldots c_K} = \\tfrac{N - \\text{head}}{10^{H}(10^{K} - 1)}, \\quad N = \\text{head followed by one cycle}',
          note: 'Two shifts: one to clear the head, one to cancel the cycle. 0.416̄ = (416 − 41)/900 = 375/900 = 5/12; 0.245̄45̄ = (245 − 2)/990 = 243/990 = 27/110; 0.583̄ = (583 − 58)/900 = 7/12.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Decimals and fractions in the exam hall',
          text: 'The exam shapes repeat. (i) *Fast conversions* — "Write $0.\\overline{36}$ as a fraction": the shift rule answers before the pencil settles ($\\tfrac{36}{99} = \\tfrac{4}{11}$); mixed items follow the head + cycle card ($0.58\\overline{3} = \\tfrac{7}{12}$). (ii) *Classification before division* — the atoms decide the dress with no dividing at all: $\\tfrac{5}{8}$ terminates (three places), $\\tfrac{5}{12}$ recurs (head two, cycle one), $\\tfrac{4}{33}$ recurs purely (cycle two). (iii) *Comparison traps* — a recurring decimal against its own truncation ($\\tfrac{2}{7}$ vs $0.2857$: the fraction wins by exactly $\\tfrac{1}{70000}$), and $0.\\overline{9} = 1$ dressed as a trick. (iv) *The $\\tfrac{22}{7}$ trap* — its decimal is $3.\\overline{142857}$, not $\\pi$\'s $3.14159\\ldots$; the difference is about $0.0013$. The rotation family of $142857$ is a favourite on SSC and banking papers: six sevenths, one block, six doors.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: '3/8 written as a decimal is:',
              options: [
                '0.375 — the remainders die after three places',
                '0.38 — round the tail up',
                '0.375875875… — the block repeats',
                '0.83 — divide 8 by 3 instead',
              ],
              answer: 0,
              explain:
                'The machine: 30 ÷ 8 = 3 rem 6, 60 ÷ 8 = 7 rem 4, 40 ÷ 8 = 5 rem 0 — terminating in three places, exactly max(3, 0) for 8 = 2³ (Option 1). Option 2 rounds: 0.375 and 0.38 are different numbers. Option 3 recycles a block, but the walk died — nothing repeats. Option 4 flips the division.',
            },
            {
              q: 'The repetend of 1/7 = 0.142857̄ has length:',
              options: [
                '1 digit — only the leading 1 repeats',
                '2 digits — 14 over and over',
                '6 digits — 142857, then the walk returns to remainder 1',
                '7 digits — one digit per seventh',
              ],
              answer: 2,
              explain:
                'The carousel has six nonzero cells (1, 3, 2, 6, 4, 5) and the walk visits all of them before remainder 1 returns — the block 142857 has six digits (Option 3). Option 1 mistakes the first digit for the pattern. Option 2 stops reading after two places. Option 4 counts the denominator, not the cells: the bound is b − 1 = 6.',
            },
            {
              q: 'Which fraction wears a PURELY recurring decimal — the cycle starting at the point?',
              options: [
                '5/12 — twelve = 2 × 2 × 3',
                '7/10 — tenths',
                '4/33 — thirty-three = 3 × 11',
                '3/40 — forty = 2 × 2 × 2 × 5',
              ],
              answer: 2,
              explain:
                'Pure recurrence needs a denominator with no 2s and no 5s: 33 qualifies, and 4/33 = 0.12̄ with the cycle from the first place (Option 3). Option 1 mixes atoms — a head of 2 places, then the cycle (0.416̄). Options 2 and 4 terminate outright (0.7 and 0.075): no dance at all.',
            },
            {
              q: '0.9̄ equals:',
              options: [
                'A number infinitely close to 1 but below it',
                'Exactly 1 — nine-ninths',
                '0.99',
                'Nothing: the expansion is not a fraction',
              ],
              answer: 1,
              explain:
                'Shift-and-subtract: 10x − x = 9.9̄ − 0.9̄ = 9, so 9x = 9 and x = 1 exactly (Option 2). The tails cancel with nothing left over — there is no decimal place where a missing 1 could hide. Option 1 is intuition, not arithmetic. Option 3 stops the tail after two digits. Option 4 denies the dresses theorem itself.',
            },
            {
              q: '0.245̄45̄ written as a fraction is:',
              options: [
                '27/110 — (245 − 2) over 990',
                '245/990 — the digits as they come',
                '2/45 — head over cycle',
                '2 and 45/99 — head glued to cycle',
              ],
              answer: 0,
              explain:
                'Head 1, cycle 2: numerator = one cycle past the head minus the head (245 − 2 = 243), denominator = two 9s then one 0 (990); 243/990 = 27/110 by gcd 9 (Option 1). Option 2 forgets to subtract the head — 245/990 is a different number (49/198). Option 3 invents a shape the rule does not have. Option 4 builds a mixed number out of two shifts.',
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
                  q: 'Divide 5 by 8 with the step machine and write the decimal. How many places does the dress need, and why?',
                  solution: [
                    'Now, the whole part is $0$: five ones cannot furnish an eight, so the point opens and the tenths take over.',
                    'So $50 \\div 8$ reports $6$ and owes $2$; $20 \\div 8$ reports $2$ and owes $4$; $40 \\div 8$ reports $5$ and owes $0$.',
                    'And a zero remainder ends the walk: three places, and the machine rests.',
                    'Hence $\\tfrac{5}{8} = 0.625$ — three places, exactly $\\max(3, 0)$ for $8 = 2^3$: the atom test kept its word.',
                  ],
                  answer: '5/8 = 0.625, three places (8 = 2³)',
                },
                {
                  q: 'Write 7/20 as a decimal two ways: by re-cutting to hundredths and by the step machine.',
                  solution: [
                    'Now, way one — the re-cut: $20 = 2^2 \\times 5$ divides $100$, and the factor is $\\tfrac{5}{5}$: $\\tfrac{7}{20} = \\tfrac{35}{100} = 0.35$.',
                    'So way two — the machine: $70 \\div 20$ reports $3$ and owes $10$; $100 \\div 20$ reports $5$ and owes $0$.',
                    'And the two costumes agree, as one fact in two dresses must: $0.35$, two places $= \\max(2, 1)$.',
                    'Hence $\\tfrac{7}{20} = 0.35$ — the re-cut of Lesson 5.1 and the division of Lesson 5.2 always agree.',
                  ],
                  answer: '7/20 = 0.35 both ways (35/100; machine digits 3, 5)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Divide 4 by 9. What repeats, and why can the walk never die?',
                  solution: [
                    'Now, $40 \\div 9$ reports $4$ and owes $4$ — the remainder has returned to its starting self at once.',
                    'So the machine replays the same move forever: $0.\\overline{4}$, a pure cycle of one digit.',
                    'And the walk can never die: a zero remainder would need some $10^k$ divisible by $9$, and $10^k$ leaves remainder $1$ on division by $9$ forever (Lesson 3.1\'s digit-sum view).',
                    'Hence $\\tfrac{4}{9} = 0.\\overline{4}$ — pure recurring, cycle $1$, the atom $3$\'s oldest signature.',
                  ],
                  answer: '4/9 = 0.4̄ (pure, cycle 1; no 10^k is divisible by 9)',
                },
                {
                  q: 'Write 13/25 as a decimal, naming the re-cut factor and the number of places.',
                  solution: [
                    'Now, $25 = 5^2$: only fives, so the dress is terminating and needs $\\max(0, 2) = 2$ places.',
                    'So the re-cut factor is $\\tfrac{4}{4}$: $\\tfrac{13}{25} = \\tfrac{52}{100} = 0.52$.',
                    'And the machine agrees: $130 \\div 25$ reports $5$ and owes $5$; $50 \\div 25$ reports $2$ and owes $0$.',
                    'Hence $\\tfrac{13}{25} = 0.52$ — two places, paid in full.',
                  ],
                  answer: '13/25 = 0.52 (factor 4/4; 2 places)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Divide 5 by 12 and name the anatomy: where does the head end, where does the cycle begin, and why exactly there?',
                  solution: [
                    'Now, $50 \\div 12$ reports $4$ and owes $2$; $20 \\div 12$ reports $1$ and owes $8$; $80 \\div 12$ reports $6$ and owes $8$.',
                    'So remainder $8$ has returned: the digit $6$ waltzes forever — $0.41\\overline{6}$.',
                    'And the anatomy is the head-length theorem\'s: $12 = 2^2 \\times 3$, so the $2$-part pays out $\\max(2, 0) = 2$ head places, then the stranger $3$ takes the floor.',
                    'Hence $\\tfrac{5}{12} = 0.41\\overline{6}$ — head $2$, cycle $1$, exactly where the theorem ordered.',
                  ],
                  answer: '5/12 = 0.416̄ (head 2 = max(2, 0), cycle 1)',
                },
                {
                  q: 'Divide 1 by 11 and explain the pairing of the digits 0 and 9.',
                  solution: [
                    'Now, $10 \\div 11$ reports $0$ and owes $10$ — a humble first digit, holding the tenths column for the count.',
                    'So $100 \\div 11$ reports $9$ and owes $1$: the remainder has come home, and the block $09$ repeats — $0.\\overline{09}$.',
                    'And the pairing has a reason: $10 \\equiv -1 \\pmod{11}$, so each shift flips the sign of the debt and the digits alternate $0, 9, 0, 9$.',
                    'Hence $\\tfrac{1}{11} = 0.\\overline{09}$, cycle $2$ — the order of $10$ modulo $11$.',
                  ],
                  answer: '1/11 = 0.09̄ (pure, cycle 2; 10 ≡ −1 mod 11)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Convert 0.7̄ to a fraction by shift-and-subtract, and check the answer by dividing again.',
                  solution: [
                    'Now, let $x = 0.\\overline{7}$; shift one place: $10x = 7.\\overline{7}$.',
                    'So subtract: $9x = 7$, the tails cancelling exactly — $x = \\tfrac{7}{9}$.',
                    'And the check: $70 \\div 9$ reports $7$ and owes $7$ — the machine returns $0.\\overline{7}$, as promised.',
                    'Hence $0.\\overline{7} = \\tfrac{7}{9}$ — one $9$ in the denominator for one digit in the cycle.',
                  ],
                  answer: '0.7̄ = 7/9',
                },
                {
                  q: 'exam-style: Convert 0.583̄ to a fraction in lowest terms.',
                  solution: [
                    'Now, the head is two places ($58$) and the cycle one ($3$): shift past the head, then once more.',
                    'So $100x = 58.\\overline{3}$ and $1000x = 583.\\overline{3}$; subtracting, $900x = 525$ — numerator $583 - 58$, denominator one $9$ and two $0$s.',
                    'And $\\tfrac{525}{900}$ reduces by $\\gcd 75$: $x = \\tfrac{7}{12}$ — Lesson 4.3\'s comparing fraction, come home in decimal dress.',
                    'Hence $0.58\\overline{3} = \\tfrac{7}{12}$ — and indeed $\\tfrac{7}{12} = 0.5833\\ldots$: head two, cycle one.',
                  ],
                  answer: '0.583̄ = 7/12 (525/900, gcd 75)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'exam-style: Which is greater — 2/7 or 0.2857? By how much, exactly?',
                  solution: [
                    'Now, the finite decimal is the fraction $\\tfrac{2857}{10000}$ — four places, no tail claimed.',
                    'So cross-multiply with Lesson 4.3\'s licence: $2 \\times 10000 = 20000$ against $7 \\times 2857 = 19999$.',
                    'And $20000 > 19999$: the fraction is greater — by exactly $\\tfrac{1}{70000}$, the tail $14\\ldots$ walking past the truncation.',
                    'Hence $\\tfrac{2}{7} > 0.2857$; and the fence on the far side: $0.2858 > \\tfrac{2}{7}$, since $2858 \\times 7 = 20006$.',
                  ],
                  answer: '2/7 (greater by exactly 1/70000; but 0.2858 > 2/7)',
                },
                {
                  q: 'Convert: (a) 0.36̄; (b) 0.123̄.',
                  solution: [
                    'Now, (a) is pure: two digits in the cycle, so two nines — $0.\\overline{36} = \\tfrac{36}{99} = \\tfrac{4}{11}$.',
                    'So (b) is mixed: head $12$, cycle $3$ — numerator $123 - 12 = 111$, denominator one $9$ and two $0$s: $900$.',
                    'And $\\tfrac{111}{900}$ reduces by $\\gcd 3$: $\\tfrac{37}{300}$.',
                    'Hence (a) $\\tfrac{4}{11}$ and (b) $\\tfrac{37}{300}$ — one $9$ per cycle digit, one $0$ per head digit, always.',
                  ],
                  answer: '(a) 4/11; (b) 37/300',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the dresses theorem: the long-division decimal of any fraction a/b either terminates or recurs in blocks. Why is the repetend never longer than b − 1 digits?',
                  solution: [
                    'Licence: the step machine — each step reads the current remainder $r$ alone, writes digit $\\lfloor 10r/b \\rfloor$, and keeps $10r \\bmod b$.',
                    'Now, the remainders live in the $b$ cells $0, 1, \\ldots, b - 1$: if any step lands on $0$, the debt is paid and the dress terminates.',
                    'So suppose the walk never dies: it lives in the $b - 1$ nonzero cells, and a walk longer than $b - 1$ steps must revisit a cell — the pigeonhole principle. From that visit on, determinism replays the same digits: the block between the two visits — the repetend — repeats forever.',
                    'And the bound: the dance floor has only $b - 1$ nonzero cells, so the cycle closes within $b - 1$ steps — $\\tfrac{1}{7}$ needs all six, $\\tfrac{1}{3}$ returns at once. □',
                    'Hence every fraction wears a terminating or a recurring decimal, and no third dress exists — every address on the number line is reachable.',
                  ],
                  answer: 'Terminating iff a remainder hits 0; otherwise pigeonhole on the b − 1 nonzero cells forces a repeat, determinism replays the block forever, repetend ≤ b − 1 digits',
                },
                {
                  q: 'The 1/7 family: divide 2, 3, 4, 5 and 6 by 7, and show each answer is a rotation of 142857. Prove the rotation claim from 142857 × 7 = 999999.',
                  solution: [
                    'Now, the machine walks: $\\tfrac{2}{7} = 0.\\overline{285714}$, $\\tfrac{3}{7} = 0.\\overline{428571}$, $\\tfrac{4}{7} = 0.\\overline{571428}$, $\\tfrac{5}{7} = 0.\\overline{714285}$, $\\tfrac{6}{7} = 0.\\overline{857142}$ — six waltzes, one carousel entered at six doors.',
                    'So the rotation claim algebraically: $\\tfrac{k}{7} = k \\times \\tfrac{1}{7} = k \\times \\tfrac{142857}{999999} = \\tfrac{k \\times 142857}{999999}$, using $\\tfrac{1}{7} = \\tfrac{142857}{999999}$ (which is $142857 \\times 7 = 999999$ read backwards).',
                    'And the products re-order the same six digits: $142857 \\times 2 = 285714$, $\\times 3 = 428571$, $\\times 4 = 571428$, $\\times 5 = 714285$, $\\times 6 = 857142$ — each a rotation of the block, each over $999999$ reading as that rotation repeating forever.',
                    'Hence the family is one number wearing six rotations — and $142857 \\times 7 = 999999$ closes the circle: seven sevenths is the whole. □',
                  ],
                  answer: '0.285714…, 0.428571…, 0.571428…, 0.714285…, 0.857142… — rotations of 142857, since k × 142857 over 999999 repeats the product',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The census is complete. Every fraction now owns a decimal name — landing exactly when its denominator\'s atoms are 2s and 5s, otherwise waltzing in blocks that the remainders themselves compose, with a head exactly as long as the 2-and-5 part demands. Lesson 5.1\'s three refuseniks are all named: $\\tfrac{1}{3} = 0.\\overline{3}$, $\\tfrac{5}{12} = 0.41\\overline{6}$, $\\tfrac{22}{7} = 3.\\overline{142857}$ — waltz digits, not $\\pi$\'s, and the difference is an examiner\'s favourite trap. And the bridge runs both ways: shift-and-subtract leads every recurring decimal home to its fraction, two costumes on one number. Next the decimal dress learns to work: 5.3 teaches the four operations to decimals — adding, subtracting, multiplying and dividing with the point in play — and 5.4 hands over percent, the fraction that agreed to be measured out of $100$.',
        },
      ],
    },
  ],
  plannedLessons: [
    'Operating on Decimals',
    'Percent and Its Meaning',
    'Percentage Change, Discounts and Simple Interest',
  ],
}
