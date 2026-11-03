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
 * 5.3 Operating on Decimals (run 23, 2026-11-04) — the four operations with
 * the point in play, one idea governing all of them (like units only):
 * addition and subtraction by aligning the points with the trailing-zero
 * licence padding and borrowing walking straight across the point; the
 * inverse test as the universal subtraction check; multiplication as the
 * whole-number engine + the places-add rule, proved from the fraction
 * reading ((a/10^j)(b/10^k) = ab/10^(j+k)) as a derivation block; the
 * point-shift rule (× 10^k hops k rooms right, ÷ 10^k k left) with the
 * point-hops ladder figure; the max-places fraud and the trim-the-licence
 * count cautions; division by whole numbers with the quotient's point
 * riding the dividend's (the 128.76 ÷ 12 tableau figure), division by
 * decimals by clearing the divisor (the scaling law as equation tag 2),
 * the step machine running past the point, and the dresses-theorem tie for
 * the never-landing case; word problems on money (the fixed 2-place dress),
 * length/mass (convert first, operate second) and the unitary method
 * (18.6 km on 1.5 L → 12.4 km/L).
 * 5.4 Percent and Its Meaning (run 24, 2026-11-04) — percent as the
 * standardised fraction of 100 (per centum, the % sign from the Italian
 * per cento ledgers): the x/100 definition with the 100-square figure (35%
 * shaded as the 25% + 10% benchmark build); the two-hop law PROVED as a
 * derivation block (x% = x/100 = x/10^2 — the point-shift rule of 5.3 at
 * k = 2; p = x/100 iff x = 100p, equation tag 1) with the fraction–decimal–
 * percent conversion-map figure; percents beyond the whole (120% = 6/5) and
 * decimal percents (12.5% = 1/8, 6.25% = 1/16, 0.5% = 1/200); the 33 1/3%
 * Caution (the mixed form exact, 33.3% one thousandth short); percent of a
 * quantity (x% of A = (x/100) × A, equation tag 2) with the benchmark
 * ladder table (50/25/20/12.5/10/5/1%) and the halving chain explained by
 * the atoms (100 = 2^2 × 5^2); marks (348/500 = 69.6%), shares (60% of 45
 * = 27 boys) and savings (30% of Rs 18,500 = Rs 5,550); finding the whole
 * by the unitary method returned (8% of n = 56 → n = 700); the
 * commutativity gem x% of y = y% of x (16% of 25 = 25% of 16 = 4).
 * 5.5 Percentage Change, Discounts and Simple Interest (run 25, 2026-11-04,
 * the chapter's final lesson) — the percent dress put to work under one
 * discipline (every percent names a base: "of what?"): percentage change
 * judged on the ORIGINAL (the factor law N = O(100 ± r)/100 PROVED as a
 * derivation block from the definition + distributivity; +25% = ×5/4,
 * −10% = ×9/10); the two-base trap (+25% then −25% nets −6.25%, the
 * r²/100 % round-trip law proved in the exercises); the round-trip figure
 * (both return tickets drawn — the wrong −20% lands 500 short, the right
 * ×5/6 lands home); finding the original by the return ticket (the
 * unitary method at 120%: Rs 15,000 after +20% came from Rs 12,500);
 * profit/loss percent reckoned on the COST price (the ledger dress of the
 * factor law, SP = CP(100 ± p)/100 as equation tag 2; the wrong-base
 * fraud 13.04% ≠ 15%; CP recovered from SP at a loss); discount reckoned
 * on the MARKED price (SP = M(100 − d)/100; the two-lane figure — CP 600
 * +15% and MP 750 −8% landing on one SP 690); the multiplier law (factors
 * multiply, percents never add: markup 40% then discount 20% = 1.4 × 0.8
 * = 1.12, a net +12% — the festival never undoes the markup); simple
 * interest from the one-percent-a-year unit (I = PRT/100 PROVED as a
 * derivation block from 5.4's percent-of + repeated addition; A = P + I
 * as equation tag 3; the per-annum trap — T strictly in years, 8 months
 * = 2/3; the rate recovered 900 = 120R → R = 7.5%; the "simple" promise —
 * flat rent on the original principal, compound interest the open door);
 * 8 terms, 4 formula cards, 9 Illustrations, 2 figures, exam corner,
 * 5-quiz (0/1/1/2/3), 12 exercises L1–L6 (L6 proves the r²/100 % law and
 * works the halving chain: Rs 12,000 at 6.25% for 2 1/2 years = Rs 1,875).
 * References: Khattar, Quantitative Aptitude (4e) — decimal-fraction exam
 * items, recurring-to-fraction shortcuts and comparison traps; NCERT Class 6
 * ch. 8 "Decimals" (tenths, hundredths, place-value extension, comparing,
 * fractions as decimals by long division; addition/subtraction by aligning
 * the points — old-edition canon, web-checked 2026-11-04); NCERT Class 7
 * (Ganita Prakash) ch. 3 "A Peek Beyond the Point" (section sequence
 * web-checked 2026-11-04); NCERT Class 7 ch. 2 "Fractions and Decimals"
 * (multiplication and division of decimal numbers, §§2.3–2.4 — section
 * sequence web-checked 2026-11-04); NCERT Class 7 ch. 8 "Comparing
 * Quantities" (§8.3 "Percentage — Another Way of Comparing Quantities" and
 * §8.4 "Use of Percentages" — the canonical percent introduction, section
 * sequence web-checked 2026-11-04); NCERT Class 7 ch. 8 §§8.5–8.6 ("Prices
 * Related to an Item or Buying and Selling — Profit or Loss" and "Charge
 * Given on Borrowed Money or Simple Interest") and NCERT Class 8 ch. 8
 * §§8.2–8.4 ("Finding the Increase or Decrease Per cent", "Finding
 * Discounts", "Prices Related to Buying and Selling (Profit and Loss)") —
 * the canonical change/discount/interest canon for 5.5, section sequences
 * web-checked 2026-11-04; NCERT Class 9 ch. 1
 * "Number Systems" (the terminating/non-terminating-recurring classification
 * of rational decimal expansions, web-checked 2026-11-04) — see
 * docs/project/SOURCE_LOG.md.
 * Exposition original; all arithmetic verified by scripts/verify-unit-5.ts
 * (455 checks: sections A–O for 5.1, P–AC for 5.2, AD–BJ for 5.3, BK–BS for
 * 5.4, BT–CC for 5.5) BEFORE writing.
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
  status: 'complete',
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
    {
      id: 'fm-operating-on-decimals',
      number: '5.3',
      title: 'Operating on Decimals',
      concepts: [
        'Aligning the points',
        'The trailing-zero licence at work',
        'Borrowing across the point',
        'The whole-number engine and the places-add rule',
        'The point-shift rule',
        'Clearing the divisor',
        'The unitary method',
      ],
      objectives: [
        'Add and subtract any decimals by aligning the points, padding with the trailing-zero licence and borrowing across the point, and check every subtraction by the inverse test',
        'Multiply decimals with the whole-number engine and land the point by the places-add rule, proving the rule from the fraction reading, and shift the point by powers of ten without reordering a digit',
        'Divide by whole numbers with the quotient\'s point riding the dividend\'s, and divide by decimals by clearing the divisor — scaling both numbers by the same power of ten and leaving the quotient untouched',
        'Settle money, length and mass problems by converting first and operating second, and reduce every rate problem to one unit with the unitary method',
      ],
      prerequisites: [
        'fm-decimal-places-and-the-point',
        'fm-decimals-and-fractions-two-ways',
        'fm-multiplying-dividing-fractions',
        'fm-adding-subtracting-fractions',
      ],
      sources: ['khattar-qa-4e', 'ncert-math6-ch8', 'ncert-math7-ch2'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 5.2 handed every fraction its decimal name — terminating when the atoms of the denominator are $2$s and $5$s, recurring otherwise. A name is only the beginning; the exam hall wants the decimal dress to **work**: bills totalled, cloth measured, rates reduced, change counted. This lesson teaches the four operations to decimals, and one idea governs all of them — the idea that has run through this book since the fractions — **like units only**. Tenths may meet tenths, hundredths may meet hundredths; a tenth and a hundredth are different denominations, exactly as a tenth and a fifth were for Lesson 4.4. Everything that follows is that one idea worn four ways.',
        },
        {
          kind: 'para',
          text: 'For addition and subtraction, like units demand a column alignment: digits that share a column share a unit, so the columns must line up before anything is combined. For multiplication, like units demand a **count**: multiplying a dress of $10^j$ by a dress of $10^k$ produces a dress of $10^{j + k}$ — the places add. For division, like units demand a **fair trade**: divisor and dividend may hop across the rooms together, because scaling both by the same power of ten leaves the quotient untouched. Three movements — align, count, scale — and the whole arithmetic of decimals follows.',
        },
        { kind: 'heading', text: 'Addition and subtraction: align the points' },
        {
          kind: 'para',
          text: 'Column addition of whole numbers worked because each column carried one unit: ones with ones, tens with tens. The decimal columns continue past the point — tenths, hundredths, thousandths — and the same law holds: a column may be totalled only when every digit in it counts the same unit. The **decimal point is the fencepost that fixes the columns**: write two decimals with their points in one vertical line, and every column is automatically like with like — ones over ones, tenths over tenths. This is **aligning the points**, and it is the whole secret of decimal addition and subtraction.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Aligning the points',
          text: 'Two decimals are said to be **added (or subtracted) by aligning the points** when they are written one under the other with their decimal points in a single vertical line, and the columns — ones, tenths, hundredths, ... — are then combined column by column from right to left. Thus, $15.75 + 8.4 + 0.905$ is computed as $15.750 + 8.400 + 0.905$: the trailing-zero licence of Lesson 5.1 pads each dress to a common width, and no column is ever left guessing what unit its digits count.',
        },
        {
          kind: 'example',
          title: 'Add 15.75, 8.4 and 0.905',
          steps: [
            'Now, align the points and let the trailing-zero licence pad the shorter dresses: $15.750 + 8.400 + 0.905$.',
            'So, from the thousandths column rightwards: $0 + 0 + 5 = 5$; the hundredths: $5 + 0 + 0 = 5$; the tenths: $7 + 4 + 9 = 20$ — write $0$, carry $2$.',
            'And the ones column takes the carry: $5 + 8 + 0 + 2 = 15$ — write $5$, carry $1$; the tens column: $1 + 1 = 2$.',
            'Hence $15.75 + 8.4 + 0.905 = 25.055$ — the thousandths column shows a $5$ although neither $15.75$ nor $8.4$ owns one: the padding kept every column honest.',
          ],
        },
        {
          kind: 'para',
          text: 'Subtraction aligns the same way, and the borrowing of Lesson 2.1 walks straight across the point without ceremony — a hundredth borrows from a tenth, a tenth from the one, each rung of Lesson 5.1\'s ladder worth exactly ten of the rung below it. The point does not interrupt the borrow; it only marks where the ladder turns.',
        },
        {
          kind: 'example',
          title: 'Subtract 18.87 from 34.6',
          steps: [
            'Now, align the points and pad the shorter dress: $34.60 - 18.87$.',
            'So the hundredths: $0$ cannot pay $7$ — borrow one tenth: $10 - 7 = 3$.',
            'And the tenths, now $5$: cannot pay $8$ — borrow one one: $15 - 8 = 7$.',
            'And the ones, now $3$: cannot pay $8$ — borrow one ten: $13 - 8 = 5$; the tens, now $2$: $2 - 1 = 1$.',
            'Hence $34.6 - 18.87 = 15.73$ — and the inverse test closes the ledger: $15.73 + 18.87 = 34.60$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The inverse test',
          text: 'Every subtraction is a hidden addition: $a - b = c$ holds exactly when $c + b = a$. One inverse addition is the cheapest insurance in the exam hall — it catches every slipped borrow and every misaligned column in a single line. Illustration 2 passed it; so should every subtraction performed under time pressure.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The digit-add fraud',
          text: '$0.9 + 0.09 + 0.009$ is neither $0.27$ nor $0.027$. Adding the bare digits ($9 + 9 + 9 = 27$) ignores the columns: nine tenths, nine hundredths and nine thousandths are three different denominations. Aligned — $0.900 + 0.090 + 0.009$ — the columns give $0.999$, a hair short of $1$; $0.27$ is not even a third of the way there.',
        },
        { kind: 'heading', text: 'Multiplication: the engine and the count' },
        {
          kind: 'para',
          text: 'Multiplication breaks the alignment habit — deliberately. Nothing requires the points to line up, and indeed $2.5 \\times 0.4$ and $25 \\times 0.04$ share one engine run. The working has two stages. **Stage one: the whole-number engine.** Ignore both points and multiply the digit strings exactly as Lesson 2.2\'s column engine taught. **Stage two: the count.** Count the decimal places worn by each factor, add the two counts, and hop the point that many rooms in from the right of the engine\'s answer.',
        },
        {
          kind: 'para',
          text: 'The count is not a trick; it is the fraction reading of Lesson 5.2 standing in plain sight. A decimal with $j$ places is a whole over $10^j$; multiplying two such fractions multiplies the wholes and multiplies the denominators. So $0.3 \\times 0.2 = \\tfrac{3}{10} \\times \\tfrac{2}{10} = \\tfrac{6}{100}$: the engine ran $3 \\times 2 = 6$, and the point landed two rooms in because the two denominators together contributed $10 \\times 10 = 100$ — the product counts hundredths.',
        },
        {
          kind: 'equation',
          latex: '\\tfrac{a}{10^j} \\times \\tfrac{b}{10^k} = \\tfrac{a \\times b}{10^{j + k}} \\qquad \\text{(the places-add law: } j + k \\text{ places)}',
          note: 'The engine multiplies $a \\times b$; the law of powers — $10^j \\times 10^k = 10^{j + k}$ — fixes the dress. One factor of ten per decimal place, so the places add.',
        },
        {
          kind: 'derivation',
          title: 'The places-add rule',
          statement:
            'Claim: if $x$ wears $j$ decimal places and $y$ wears $k$, then $x \\times y$ is exactly $\\tfrac{a \\times b}{10^{j + k}}$, where $a$ and $b$ are the engine values — the digit strings with the points removed.',
          steps: [
            {
              label: 'The fraction reading',
              formula: 'x = \\tfrac{a}{10^j}, \\qquad y = \\tfrac{b}{10^k}',
              explanation:
                'A decimal with $j$ places is a count of $10^j$-ths — Lesson 5.1\'s bridge read backwards. Trailing zeros are licence, not places: $48.50$ wears one true place, since $48.50 = 48.5 = \\tfrac{485}{10}$ — the trimming of Lesson 5.2\'s terminating dresses.',
            },
            {
              label: 'The multiplying rule',
              formula: 'x \\times y = \\tfrac{a}{10^j} \\times \\tfrac{b}{10^k} = \\tfrac{a \\times b}{10^j \\times 10^k}',
              explanation:
                'Multiply the wholes; multiply the denominators — Lesson 4.2\'s multiplying rule for fractions, with no simplification needed or wanted.',
            },
            {
              label: 'The law of powers',
              formula: '10^j \\times 10^k = 10^{j + k} \\;\\Rightarrow\\; x \\times y = \\tfrac{a \\times b}{10^{j + k}}',
              explanation:
                'One factor of ten per decimal place; $j$ of them meet $k$ of them and make $j + k$. The product therefore wears $j + k$ places. Notice what never entered the argument: any alignment of points — which is why none is needed.',
            },
          ],
          result:
            '$x \\times y$ is the engine product wearing $j + k$ decimal places. A product of terminating decimals always terminates — the pooled atoms are still only $2$s and $5$s.',
        },
        {
          kind: 'example',
          title: 'Multiply 3.42 by 5.6',
          steps: [
            'Now, run the engine on the digit strings: $342 \\times 56$ — $342 \\times 6 = 2052$ and $342 \\times 50 = 17100$; the sum is $19152$.',
            'So count the places: $3.42$ wears $2$, $5.6$ wears $1$ — the product wears $2 + 1 = 3$.',
            'And hop the point three rooms in from the right of $19152$: $19.152$.',
            'Hence $3.42 \\times 5.6 = 19.152$ — and the fraction reading confirms it: $\\tfrac{342}{100} \\times \\tfrac{56}{10} = \\tfrac{19152}{1000}$.',
          ],
        },
        {
          kind: 'para',
          text: 'For example, watch the two stages at their simplest:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$0.3 \\times 0.2$: the engine runs $3 \\times 2 = 6$; the places add $1 + 1 = 2$ — $0.06$, a count of hundredths;',
            '$0.75 \\times 0.4$: the engine runs $75 \\times 4 = 300$; the places add $2 + 1 = 3$ — $0.300$, and the trailing licence trims the dress to $0.3$;',
            '$12.5 \\times 0.08$: the engine runs $125 \\times 8 = 1000$; the places add $1 + 2 = 3$ — $1.000$, which is simply $1$: the licence trims even the whole.',
          ],
        },
        {
          kind: 'para',
          text: 'Small multipliers earn a shorthand of their own. Multiplying by $10$ hands every digit one room more worth — the point, read along the fixed string, hops one room **right**; multiplying by $100$ hops it two rooms; dividing by $10$ and by $100$ hop it one and two rooms **left**. This is the **point-shift rule** — the place-value mirror of Lesson 5.1, set in motion:',
        },
        {
          kind: 'figure',
          caption:
            'The point-hops ladder. The rooms never move — thousand down to thousandth, ten times finer at every step right, exactly the mirror of Lesson 5.1. Under × 10 every digit climbs one room toward the bigger units (so the point, read along the string, hops one room right); under ÷ 10 every digit slides one room finer. The strip walks 4.75 up to 475 and down to 0.475.',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The place-value rooms from thousand to thousandth with the digits of 4.75 in place, and arrows showing x 10 climbing rooms and divide-by 10 sliding rooms finer">
  <g stroke="currentColor" stroke-width="1" fill="none">
    <rect x="28" y="150" width="92" height="86"/>
    <rect x="130" y="150" width="92" height="86"/>
    <rect x="232" y="150" width="92" height="86"/>
    <rect x="334" y="150" width="92" height="86"/>
    <rect x="436" y="150" width="92" height="86"/>
    <rect x="538" y="150" width="92" height="86"/>
    <rect x="640" y="150" width="92" height="86"/>
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle" letter-spacing="0.5">
    <text x="74" y="172">THOUSAND</text>
    <text x="176" y="172">HUNDRED</text>
    <text x="278" y="172">TEN</text>
    <text x="380" y="172">ONE</text>
    <text x="482" y="172">TENTH</text>
    <text x="584" y="172">HUNDREDTH</text>
    <text x="686" y="172">THOUSANDTH</text>
  </g>
  <g font-size="30" fill="currentColor" text-anchor="middle">
    <text x="380" y="214">4</text>
    <text x="482" y="214">7</text>
    <text x="584" y="214">5</text>
  </g>
  <circle cx="431" cy="204" r="4" fill="currentColor"/>
  <text x="431" y="254" font-size="12" fill="currentColor" text-anchor="middle">the point</text>
  <g stroke="#b45309" stroke-width="1.6" fill="none">
    <line x1="602" y1="68" x2="294" y2="68"/>
    <line x1="500" y1="108" x2="414" y2="108"/>
    <line x1="396" y1="278" x2="482" y2="278"/>
    <line x1="380" y1="318" x2="568" y2="318"/>
  </g>
  <polygon points="294,68 306,63 306,73" fill="#b45309"/>
  <polygon points="414,108 426,103 426,113" fill="#b45309"/>
  <polygon points="482,278 470,273 470,283" fill="#b45309"/>
  <polygon points="568,318 556,313 556,323" fill="#b45309"/>
  <g font-size="13" fill="#b45309" text-anchor="middle">
    <text x="448" y="52">× 100: climb two rooms</text>
    <text x="448" y="92">× 10: climb one room</text>
    <text x="431" y="296">÷ 10: slide one room finer</text>
    <text x="474" y="336">÷ 100: slide two rooms finer</text>
  </g>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="170" y="399">4.75 × 10 = 47.5 × 10 = 475</text>
    <text x="560" y="399">4.75 ÷ 10 = 0.475</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the figure with the string $4.75$ in its rooms. Multiply by $10$ and every digit climbs one room — the $4$ reaches the tens, the $7$ the ones, the $5$ the tenths: $47.5$. The rooms never move and the digit string never reorders; only the point\'s position along the string changes. The same walk runs backwards: divide $4.75$ by $10$ and every digit slides one room finer — $0.475$, and another such step reaches $0.0475$. The exam-hall form is the strip at the foot of the figure: $4.75 \\times 10 = 47.5$, $\\times 10$ again $= 475$; $4.75 \\div 10 = 0.475$.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The max-places fraud',
          text: 'The point lands by the **sum** of the places, never by the longer factor. Compute $1.5 \\times 2.25$ honestly — engine $15 \\times 225 = 3375$, places $1 + 2 = 3$ — and the product is $3.375$. Count only the longer factor\'s $2$ places and the same engine digits read $33.75$: ten times too big. The sum-versus-max slip costs exactly a factor of $10$, and it is the standard trap on entrance papers.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Counting places counts the dress',
          text: 'Places are counted after the trailing licence has spoken: $48.50$ wears one true place ($48.5$), so $48.50 \\times 3.5$ takes $1 + 1 = 2$ places — $169.75$, not the $16.975$ a naive count of written digits would print. The licence may pad a dress for column work, but it never adds places to a product.',
        },
        { kind: 'heading', text: 'Division: the step machine, continued' },
        {
          kind: 'para',
          text: 'Division by a whole number needs no new machine — Lesson 5.2\'s long-division step machine already knows how to run past the point. The only new convention is where the quotient\'s point stands, and the answer is the natural one: **the quotient\'s point rides the dividend\'s**. When a bring-down crosses the dividend\'s point, the quotient writes its own point at that same moment. Nothing else about the tableau changes — same subtractions, same brings-down, same landing on remainder $0$.',
        },
        {
          kind: 'example',
          title: 'Divide 128.76 by 12',
          steps: [
            'Now, run the machine: $12$ into $12$ gives $1$, remainder $0$; the next digit $8$ is too small, so the quotient writes $0$ above it.',
            'So the bring-down crosses the dividend\'s point — the quotient writes its own point and takes the $7$: $12$ into $87$ gives $7$ ($84$), remainder $3$.',
            'And bring down the $6$: $12$ into $36$ gives $3$, remainder $0$ — the machine lands.',
            'Hence $128.76 \\div 12 = 10.73$, the quotient\'s point riding the dividend\'s — and the inverse test reads $12 \\times 10.73 = 128.76$. Figure 2 shows the full tableau.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The long-division tableau of 128.76 ÷ 12. The quotient\'s point (amber) drops in exactly when the bring-down crosses the dividend\'s point; the two amber arrows mark the digits 7 and 6 joining the working. The inverse test closes the loop: 12 × 10.73 = 128.76.',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Long division tableau: 128.76 divided by 12 gives 10.73, with the quotient point dropping in when the bring-down crosses the dividend point">
  <text x="420" y="16" font-size="14" fill="#b45309" text-anchor="middle">the point hops into the quotient</text>
  <g font-size="26" fill="currentColor" text-anchor="middle">
    <text x="348" y="48">1</text>
    <text x="396" y="48">0</text>
    <text x="444" y="48">7</text>
    <text x="492" y="48">3</text>
    <text x="224" y="108">1</text>
    <text x="252" y="108">2</text>
    <text x="300" y="108">1</text>
    <text x="348" y="108">2</text>
    <text x="396" y="108">8</text>
    <text x="444" y="108">7</text>
    <text x="492" y="108">6</text>
    <text x="300" y="156">1</text>
    <text x="348" y="156">2</text>
    <text x="396" y="202">8</text>
    <text x="444" y="202">7</text>
    <text x="396" y="248">8</text>
    <text x="444" y="248">4</text>
    <text x="444" y="294">3</text>
    <text x="492" y="294">6</text>
    <text x="444" y="340">3</text>
    <text x="492" y="340">6</text>
    <text x="492" y="386">0</text>
  </g>
  <circle cx="420" cy="40" r="4" fill="#b45309"/>
  <circle cx="420" cy="100" r="3.5" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.4">
    <line x1="284" y1="86" x2="284" y2="138"/>
    <line x1="284" y1="86" x2="272" y2="86"/>
    <line x1="284" y1="138" x2="272" y2="138"/>
    <line x1="292" y1="170" x2="410" y2="170"/>
    <line x1="388" y1="262" x2="460" y2="262"/>
    <line x1="436" y1="354" x2="510" y2="354"/>
  </g>
  <g stroke="#b45309" stroke-width="1.4" fill="none">
    <line x1="444" y1="122" x2="444" y2="174"/>
    <line x1="492" y1="122" x2="492" y2="266"/>
  </g>
  <polygon points="438,164 450,164 444,174" fill="#b45309"/>
  <polygon points="486,256 498,256 492,266" fill="#b45309"/>
  <g font-size="12.5" fill="currentColor">
    <text x="472" y="160">bring down 7</text>
    <text x="516" y="210">bring down 6</text>
  </g>
  <text x="280" y="412" font-size="14" fill="currentColor" text-anchor="middle">check: 12 × 10.73 = 128.76</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Figure 2 is worth a second look for what it does **not** contain: no new rule, no alignment of any points in a divisor, no guessing. The dividend\'s digits feed the machine one room at a time, the quotient records each step above the last digit consumed, and the point simply crosses from dividend to quotient when the bring-down does. The same convention divides $12.75$ by $5$: the machine lands at $2.55$, and the inverse test $5 \\times 2.55 = 12.75$ closes it.',
        },
        {
          kind: 'para',
          text: 'Dividing **by** a decimal — $16.24 \\div 2.8$ — asks one question first: what does the divisor wear? The divisor $2.8$ wears one place, and the equivalent-fraction licence of chapter 4 permits scaling the top and bottom of a fraction by the same power of ten. Scale both numbers until the divisor is whole — hop **both** points one room right — and the problem re-dresses as $162.4 \\div 28$, a division by a whole number that the machine already owns.',
        },
        {
          kind: 'equation',
          latex: '\\frac{A/10^{j}}{B/10^{k}} = \\frac{A \\times 10^{k}}{B \\times 10^{j}} \\qquad \\text{(the clearing law)}',
          note: 'The quotient never notices the hop: scaling dividend and divisor by the same $10^k$ — chapter 4\'s equivalent-fraction licence — leaves the value alone. In procedure form: shift both points right by the divisor\'s $k$ places, then divide whole by whole.',
        },
        {
          kind: 'example',
          title: 'Divide 16.24 by 2.8',
          steps: [
            'Now, the divisor $2.8$ wears one place: hop both points one room right — the clearing law scales dividend and divisor by $10$: $162.4 \\div 28$.',
            'So run the machine: $28$ into $162$ gives $5$ ($140$), remainder $22$; bring down the $4$: $28$ into $224$ gives $8$ ($224$), remainder $0$.',
            'And the quotient\'s point rode the dividend\'s — one place after the $5$: $5.8$.',
            'Hence $16.24 \\div 2.8 = 5.8$; the inverse test: $2.8 \\times 5.8 = 16.24$ — engine $28 \\times 58 = 1624$, places $1 + 1 = 2$.',
          ],
        },
        {
          kind: 'para',
          text: 'When the machine exhausts the dividend\'s digits with a remainder still alive, Lesson 5.2\'s step runs again: bring down a written zero and keep walking — $9.1 \\div 5$ lands after exactly one such step ($5$ into $9$ gives $1$, into $41$ gives $8$, into $10$ gives $2$: $1.82$). And when the remainders never die, the dresses theorem of 5.2 says precisely what appears: a recurring decimal, the machine waltzing in its cycle — $1 \\div 3$ walks $0.333\\ldots$ forever. Division in decimal dress is one machine with two exits: land on remainder $0$, or cycle.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The ÷ 100 fraud',
          text: '$45.6 \\div 100 = 0.456$ — the point hops two rooms **left**. Writing $4560$ (the whole-number reflex of "two zeros") is the hop backwards: $45.6 \\times 100 = 4560$, while $\\div 100$ walks the other way along the mirror. The point-shift rule has a direction; read the sign before you hop.',
        },
        { kind: 'heading', text: 'Word problems: money, length, mass' },
        {
          kind: 'para',
          text: 'The exam\'s decimal problems arrive wearing units, and the units dictate the order of work. **Money** keeps a fixed two-place dress — the paise are hundredths of the rupee, as Lesson 5.1 established — so every amount is padded to two places before the columns combine. **Length and mass** convert first and operate second: metres into centimetres, kilograms into grams, by 5.1\'s chart, so that each operation meets one unit rather than two. And every rate — a price per metre, a distance per litre — reduces to one unit by the **unitary method**: divide to reach the single unit, multiply to scale back up.',
        },
        {
          kind: 'example',
          title: 'A notebook costs Rs 42.75, a pen Rs 18.60 and a geometry box Rs 96.05. What change follows from a Rs 200 note?',
          steps: [
            'Now, money keeps its two-place dress, and the columns already align: $42.75 + 18.60 + 96.05$.',
            'So from the hundredths: $5 + 0 + 5 = 10$ — write $0$, carry $1$; the tenths: $7 + 6 + 0 + 1 = 14$ — write $4$, carry $1$; the ones: $2 + 8 + 6 + 1 = 17$ — write $7$, carry $1$; the tens: $4 + 1 + 9 + 1 = 15$. The bill is $157.40$.',
            'And the change: $200.00 - 157.40 = 42.60$ — the borrow walks across the point exactly as Illustration 2 taught.',
            'Hence the change is Rs $42.60$ — and the inverse test closes it: $157.40 + 42.60 = 200.00$.',
          ],
        },
        {
          kind: 'para',
          text: 'The unitary method runs on division, and its division is the clearing law in the wild. A car covers $18.6$ km on $1.5$ litres of petrol: one litre\'s distance is $18.6 \\div 1.5$ — clear the divisor, both points one room right, $186 \\div 15$ — and the machine lands at $12.4$. Twelve and four-tenths kilometres a litre; on $4$ litres, $4 \\times 12.4 = 49.6$ km. Divide to the one, multiply to the many — the whole method in one breath.',
        },
        {
          kind: 'para',
          text: 'For example, the length and mass conversions keep their side of the bargain — convert first, operate second:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$2.4$ kg of rice split into $6$ equal bags: the machine runs $24 \\div 6 = 4$ and the point rides in after the first digit — each bag holds $0.4$ kg, which is $400$ g;',
            'a $3.75$ m ribbon cut into pieces of $0.25$ m: clear the divisor — $375 \\div 25 = 15$ — fifteen pieces, and the inverse test $0.25 \\times 15 = 3.75$ closes it;',
            'a pencil of $7.5$ cm laid beside one of $42$ mm: convert first — $42$ mm $= 4.2$ cm — then subtract by the aligned points: $7.5 - 4.2 = 3.3$ cm of difference.',
          ],
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Aligning the points',
              def: 'Writing decimals one under another with their points in one vertical line, so that every column counts one unit — the working rule for decimal addition and subtraction. Example: 15.750 + 8.400 + 0.905 = 25.055.',
            },
            {
              term: 'Borrowing across the point',
              def: 'A borrow that crosses the decimal point, taking one one as ten tenths or one tenth as ten hundredths — 5.1\'s ladder in reverse gear. Example: 34.60 − 18.87 borrows at the hundredths, the tenths and the ones.',
            },
            {
              term: 'Whole-number engine',
              def: 'The stage of decimal multiplication that ignores both points and multiplies the digit strings as whole numbers. Example: 3.42 × 5.6 runs the engine 342 × 56 = 19152.',
            },
            {
              term: 'Places-add rule',
              def: 'The product of a j-place and a k-place decimal wears j + k places, since (a/10^j) × (b/10^k) = ab/10^(j+k). Example: 0.3 × 0.2 = 0.06; 0.75 × 0.4 = 0.300 = 0.3 after the licence trims.',
            },
            {
              term: 'Point-shift rule',
              def: 'Multiplying by 10^k hops the point k rooms right; dividing by 10^k hops it k rooms left; the digit string never reorders. Example: 4.75 × 10 = 47.5; 45.6 ÷ 100 = 0.456.',
            },
            {
              term: 'Clearing the divisor',
              def: 'Scaling dividend and divisor by the same power of ten until the divisor is whole — the quotient never notices. Example: 16.24 ÷ 2.8 = 162.4 ÷ 28 = 5.8.',
            },
            {
              term: 'Unitary method',
              def: 'Solving rate problems by reducing to one unit first (divide) and scaling back up (multiply). Example: 18.6 km on 1.5 L gives 12.4 km/L; on 4 L, 49.6 km.',
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The alignment rule',
          latex: 'a.bc + d.ef:\\ \\text{align the points, pad by the licence, add the columns}',
          note: 'Subtraction aligns identically, and every difference is checked by the inverse addition. Money pads to its fixed two-place dress before anything combines.',
        },
        {
          kind: 'formula',
          name: 'The places-add rule',
          latex: '(j \\text{ places}) \\times (k \\text{ places}) \\;\\Rightarrow\\; (j + k) \\text{ places}',
          note: 'Engine first (whole numbers), then the point lands j + k rooms in. Count true places — trim the trailing licence first: 48.50 × 3.5 = 169.75, not 16.975.',
        },
        {
          kind: 'formula',
          name: 'The clearing rule',
          latex: '\\div \\text{ a } k\\text{-place decimal} \\;\\Rightarrow\\; \\text{hop both points } k \\text{ right, then divide whole by whole}',
          note: '16.24 ÷ 2.8 → 162.4 ÷ 28 = 5.8. Past the dividend, bring down written zeros; if the remainders cycle, the answer recurs — the dresses theorem of 5.2.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'The decimal operations are marks printed on every paper: (i) clerical and banking papers total bills and balances — align, pad, and check by the inverse test; (ii) the places-add count decides the fill-in-the-blank products — one engine run (45 × 67 = 3015) prices a whole family of point positions: 0.45 × 0.067 = 0.045 × 0.67 = 4.5 × 0.0067 = 0.03015; (iii) unit conversions hide inside word problems — convert first (1 m = 100 cm, 1 kg = 1000 g), operate second; (iv) the classic traps: the max-places fraud (1.5 × 2.25 = 3.375, not 33.75), the ÷ 100 hop backwards (45.6 ÷ 100 = 0.456, not 4560), and the digit-add fraud (0.9 + 0.09 + 0.009 = 0.999, not 0.27); (v) rate problems bow to the unitary method — divide to the one, multiply to the many.',
        },
        {
          kind: 'quiz',
          items: [
            {
              q: '0.9 + 0.09 + 0.009 = ?',
              options: [
                '0.27 — the digits 9 + 9 + 9 = 27, placed after the point',
                '2.7 — the points ignored and the digits summed',
                '0.999 — tenths, hundredths and thousandths, each in its own column',
                '0.027 — the digits concatenated under one place',
              ],
              answer: 2,
              explain:
                'Aligned — 0.900 + 0.090 + 0.009 — the columns total 0.999: nine tenths, nine hundredths and nine thousandths, each in its own denomination (Option 3). Options 1 and 4 are the digit-add fraud in two dresses, and Option 2 ignores the columns completely; indeed 0.999 is a hair short of 1, where none of the others is close.',
            },
            {
              q: '34.6 − 18.87 = ?',
              options: ['16.27', '15.73', '15.79', '16.73'],
              answer: 1,
              explain:
                'Align, pad and borrow: 34.60 − 18.87 = 15.73 (Option 2), and the inverse test closes it — 15.73 + 18.87 = 34.60 exactly. Each other option fails the same test: 16.27 + 18.87 = 35.14, 15.79 + 18.87 = 34.66, 16.73 + 18.87 = 35.60 — a slipped borrow apiece.',
            },
            {
              q: 'Given 45 × 67 = 3015, the product 0.45 × 0.067 equals:',
              options: ['0.3015', '3.015', '0.03015', '0.003015'],
              answer: 2,
              explain:
                'The engine already ran: 45 × 67 = 3015. The places add — 2 + 3 = 5 — so the point hops five rooms in: 0.03015 (Option 3). Option 1 counted four places, Option 2 three, Option 4 six; only five matches 2 + 3.',
            },
            {
              q: '7.2 ÷ 0.9 = ?',
              options: ['8', '0.8', '80', '0.08'],
              answer: 0,
              explain:
                'Clear the divisor: both points hop one room right and the question becomes 72 ÷ 9 = 8 (Option 1). Option 2 answers 0.72 ÷ 0.9, Option 3 answers 72 ÷ 0.9, Option 4 answers 0.72 ÷ 9 — each shifted the wrong number of rooms.',
            },
            {
              q: '45.6 ÷ 100 = ?',
              options: ['4560', '0.456', '4.56', '45.6'],
              answer: 1,
              explain:
                'Dividing hops the point LEFT — two rooms for 100: 0.456 (Option 2). Option 1 is the multiplication hop (45.6 × 100 = 4560), Option 3 hopped one room only (that would be ÷ 10), and Option 4 never hopped at all.',
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
                  q: 'Find: 2.3 + 4.55.',
                  solution: [
                    'Now, align the points and let the licence pad: $2.30 + 4.55$.',
                    'So the columns from the right: hundredths $0 + 5 = 5$; tenths $3 + 5 = 8$; ones $2 + 4 = 6$.',
                    'Hence $2.3 + 4.55 = 6.85$.',
                  ],
                  answer: '6.85',
                },
                {
                  q: 'Find: 9.4 − 6.78.',
                  solution: [
                    'Now, pad to two places: $9.40 - 6.78$.',
                    'So the hundredths: $0$ borrows — $10 - 8 = 2$; the tenths, now $3$: $3 - 7$ borrows — $13 - 7 = 6$; the ones, now $8$: $8 - 6 = 2$.',
                    'Hence $9.4 - 6.78 = 2.62$ — checked by the inverse test: $2.62 + 6.78 = 9.40$.',
                  ],
                  answer: '2.62',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Multiply: 6.05 × 7.',
                  solution: [
                    'Now, the engine: $605 \\times 7 = 4235$.',
                    'So count the places: $6.05$ wears $2$; $7$ wears none — the product wears $2$.',
                    'Hence $6.05 \\times 7 = 42.35$ — the zero inside $6.05$ held the tenths column for the engine and holds the point here.',
                  ],
                  answer: '42.35',
                },
                {
                  q: 'Multiply: 0.75 × 0.4.',
                  solution: [
                    'Now, the engine: $75 \\times 4 = 300$.',
                    'So the places add: $2 + 1 = 3$ — $0.300$.',
                    'Hence $0.75 \\times 0.4 = 0.3$, the trailing licence trimming the dress; and indeed $\\tfrac{3}{4} \\times \\tfrac{4}{10} = \\tfrac{3}{10}$.',
                  ],
                  answer: '0.3',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Divide: 12.6 ÷ 3.',
                  solution: [
                    'Now, run the machine: $3$ into $12$ gives $4$, remainder $0$.',
                    'So the bring-down crosses the point — the quotient writes its point and takes the $6$: $3$ into $6$ gives $2$.',
                    'Hence $12.6 \\div 3 = 4.2$ — checked: $3 \\times 4.2 = 12.6$.',
                  ],
                  answer: '4.2',
                },
                {
                  q: 'Divide: 45.6 ÷ 100.',
                  solution: [
                    'Now, dividing by $10^2$ hops the point two rooms left — no engine needed.',
                    'So $45.6 \\div 100 = 0.456$: the digits $456$ keep their order; the point lands in front of them.',
                    'Hence $45.6 \\div 100 = 0.456$ — not $4560$; the hop has a direction.',
                  ],
                  answer: '0.456',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Divide: 20.4 ÷ 1.2.',
                  solution: [
                    'Now, the divisor wears one place: clear it — both points hop one room right: $204 \\div 12$.',
                    'So the machine: $12$ into $20$ gives $1$, remainder $8$; the point rides into the quotient; $12$ into $84$ gives $7$, remainder $0$.',
                    'Hence $20.4 \\div 1.2 = 17$ — checked: $1.2 \\times 17 = 20.4$ (engine $12 \\times 17 = 204$, one place).',
                  ],
                  answer: '17',
                },
                {
                  q: 'Divide: 0.144 ÷ 1.2.',
                  solution: [
                    'Now, clear the divisor: both points hop one room right — $1.44 \\div 12$.',
                    'So the machine: $12$ into $1$ gives $0$; into $14$ gives $1$, remainder $2$; the point rides; $12$ into $24$ gives $2$.',
                    'Hence $0.144 \\div 1.2 = 0.12$ — checked: $1.2 \\times 0.12 = 0.144$ (engine $12 \\times 12 = 144$, three places).',
                  ],
                  answer: '0.12',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'exam-style: Cloth sells at Rs 48.50 a metre. Ravi buys 3.5 m and pays with a Rs 200 note. Find the change.',
                  solution: [
                    'Now, the cost first: $48.50 \\times 3.5$ — engine $485 \\times 35 = 16975$.',
                    'So count the true places: $48.50$ wears one (the trailing zero is licence), $3.5$ wears one — $1 + 1 = 2$ places: Rs $169.75$.',
                    'And the change: $200.00 - 169.75 = 30.25$.',
                    'Hence the change is Rs $30.25$ — and the inverse test: $169.75 + 30.25 = 200.00$.',
                  ],
                  answer: 'Rs 30.25',
                },
                {
                  q: 'A car covers 18.6 km on 1.5 litres of petrol. How far does it go on one litre? On 4 litres?',
                  solution: [
                    'Now, the unitary method — divide to the one: $18.6 \\div 1.5$.',
                    'So clear the divisor: both points hop one room right — $186 \\div 15$: $15$ into $186$ gives $12$, remainder $6$; the point rides; $15$ into $60$ gives $4$: $12.4$.',
                    'And scale to the many: $4 \\times 12.4 = 49.6$ — the places add $0 + 1 = 1$.',
                    'Hence $12.4$ km a litre, and $49.6$ km on $4$ litres.',
                  ],
                  answer: '12.4 km/L; 49.6 km on 4 L',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'exam-style: Given 45 × 67 = 3015, write down 0.45 × 0.067, 0.045 × 0.67 and 4.5 × 0.0067 without running any engine.',
                  solution: [
                    'Now, the engine ran once and for all: $45 \\times 67 = 3015$ — every product here shares the same two digit strings; only the points have moved between the factors.',
                    'So only the places move, and they add: $0.45 \\times 0.067$ wears $2 + 3 = 5$ places — $0.03015$; $0.045 \\times 0.67$ wears $3 + 2 = 5$ — $0.03015$; $4.5 \\times 0.0067$ wears $1 + 4 = 5$ — $0.03015$.',
                    'And the pattern is the deep one: hopping the point one room out of one factor and one room into the other adds $1$ and subtracts $1$ — the places still sum to $5$, and the product never notices.',
                    'Hence all three equal $0.03015$ — one engine, three point positions, one value.',
                  ],
                  answer: 'all 0.03015',
                },
                {
                  q: 'Prove the places-add rule from the fraction reading, and deduce that a product of terminating decimals always terminates. Where does the proof break if a factor is recurring?',
                  solution: [
                    'Licence: a $j$-place decimal is $\\tfrac{a}{10^j}$ with $a$ whole — Lesson 5.1\'s bridge read backwards, trailing zeros trimmed so the dress counts true places.',
                    'Now, multiply by 4.2\'s rule: $\\tfrac{a}{10^j} \\times \\tfrac{b}{10^k} = \\tfrac{ab}{10^j \\times 10^k}$, and the law of powers folds the denominator to $10^{j + k}$.',
                    'So $x \\times y = \\tfrac{ab}{10^{j + k}}$ — a whole over a power of ten, hence a terminating decimal with at most $j + k$ places: the pooled atoms of the two denominators are still only $2$s and $5$s, so the atom test of 5.1 approves the dress without a look at the numbers.',
                    'And the break: a recurring factor owns no whole-over-power-of-ten dress — $\\tfrac{1}{3}$ refuses every $10^m$ (5.2\'s theorem) — so the engine has no finite $a$ to run and no places to count; the product\'s dress is decided by the remainders, not by addition.',
                    'Hence terminating $\\times$ terminating terminates in at most $j + k$ places — and terminating $\\times$ recurring recurs: $0.5 \\times 0.\\overline{3} = 0.1\\overline{6}$, the waltz slowed but not stopped. □',
                  ],
                  answer: 'The places-add law (a/10^j)(b/10^k) = ab/10^(j+k); products of terminating decimals terminate in at most j + k places; a recurring factor breaks the whole-over-power-of-ten reading',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The decimal dress now works for its living. The columns add and subtract under the aligned points, with the licence padding and the borrows walking straight across; the engine multiplies and the places-add law — proved, not memorised — lands the point; the step machine divides with the quotient\'s point riding the dividend\'s and the clearing law evicting the divisor\'s own; and money, length and mass followed the same rules with their units in view, the unitary method reducing every rate to one. One costume remains before the chapter closes: 5.4 hands over **percent**, the fraction that agreed to be measured out of $100$ — and the arithmetic of this lesson will do its work.',
        },
      ],
    },
    {
      id: 'fm-percent-and-its-meaning',
      number: '5.4',
      title: 'Percent and Its Meaning',
      concepts: [
        'Percent as a fraction of 100',
        'The standardised denominator',
        'The two-hop conversion',
        'Percent of a quantity',
        'Benchmark percents',
        'The 1% unit',
        'x% of y = y% of x',
      ],
      objectives: [
        'Read any percent as a fraction with denominator 100 and reduce it to lowest terms, including percents beyond 100 and decimal percents such as 12.5% and 6.25%',
        'Convert both ways along the fraction–decimal–percent map with the two-hop law (÷ 100 one way, × 100 the other), and know where 33 1/3% is exact while 33.3% is not',
        'Find x% of a quantity by the direct fraction-of and by the benchmark builds, and lighten the arithmetic with the commutativity gem x% of y = y% of x',
        'Answer "what percent" and "find the whole" questions — the unitary method returning as the percent ladder — and read marks, shares and savings problems correctly',
      ],
      prerequisites: [
        'fm-decimal-places-and-the-point',
        'fm-operating-on-decimals',
        'fm-equivalent-fractions-simplification',
        'fm-multiplying-dividing-fractions',
      ],
      sources: ['khattar-qa-4e', 'ncert-math7-ch8'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 5.3 set the decimal dress to work, and the promise of Lesson 4.5 stands one costume from being kept in full. Fractions, the reader will remember, are free: $\\tfrac{7}{20}$, $\\tfrac{3}{8}$, $\\tfrac{9}{25}$ — a hundred fractions may wear a hundred different denominators, and every comparison between them costs an LCM. The exam hall has no patience for that tax. It wants **one denominator for everyone**, and the one it chose — for reasons the ledger books made — is $100$. A fraction expressed in hundredths is said to be in **percent** form, and the whole of this lesson is the study of that one redressing.',
        },
        {
          kind: 'para',
          text: 'The name carries the contract. **Per cent** is Latin *per centum* — "for every hundred" — so a percent counts how many parts are taken out of every hundred the whole is cut into. Nothing deeper. The percent dress is a fraction dress with the denominator fixed at $100$, and because $100 = 10^2$ is the two-place power of Lesson 5.1\'s ladder, every percent also wears a two-place decimal dress: the three stations — fraction, decimal, percent — are one number in three costumes, and the walks between them are the point-shift of Lesson 5.3 doing its shortest trick.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A sign born in the ledger books',
          text: 'The word is Latin, but the sign is Italian bookkeeping. Fifteenth-century merchant ledgers, charging rates "per cento", abbreviated the phrase to "P c°"; across the following two centuries the small circle — the tail of *cento* — split in two and drifted until the two rings of today\'s % remained, with the stem of the P as the slash between them. The contract never changed through all that drift: so many parts for every hundred.',
        },
        { kind: 'heading', text: 'Percent: the fraction dressed in hundredths' },
        {
          kind: 'para',
          text: 'The definition deserves its full formality, because every rule of this lesson falls out of it.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Percent',
          text: 'A number $x$ is said to be **expressed as a percent** when it is written as a fraction with denominator $100$; the notation $x\\%$, read "$x$ per cent", means $\\tfrac{x}{100}$. Thus, $35\\% = \\tfrac{35}{100}$, $8\\% = \\tfrac{8}{100}$, and $120\\% = \\tfrac{120}{100}$ — the percent sign is not a unit but an instruction to divide by one hundred. Consequently $x\\%$ of a quantity $A$ is the fraction $\\tfrac{x}{100}$ of $A$, and $100\\%$ of anything is the whole of it.',
        },
        {
          kind: 'para',
          text: 'For example, the definition prices a whole shelf of percents at once:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$35\\% = \\tfrac{35}{100} = \\tfrac{7}{20}$ — thirty-five hundredths reduce to seven twentieths (the HCF machinery of chapter 3).',
            '$8\\% = \\tfrac{8}{100} = \\tfrac{2}{25}$ — eight hundredths, a small slice.',
            '$120\\% = \\tfrac{120}{100} = \\tfrac{6}{5}$ — percents may pass the whole: a fifth more than all of it.',
            '$0.5\\% = \\tfrac{0.5}{100} = \\tfrac{1}{200}$ — half a hundredth, one part in two hundred.',
          ],
        },
        {
          kind: 'para',
          text: 'The last two rows repay a second look. That $120\\%$ is legal — a quantity can grow to more than its whole — surprises nobody who has paid a festival-season price; but $0.5\\%$ shows how small the percent ruler can count: two hundredths of a hundredth. The dress spans everything from $\\tfrac{1}{200}$ upward, always with the same denominator, and that uniformity is its entire service. To compare $\\tfrac{7}{20}$ with $\\tfrac{3}{8}$ the old way costs the LCM of $20$ and $8$; in percent dress they simply become $35\\%$ and $37.5\\%$, and the eye decides. **The standardised denominator is the common currency of fractions** — the reason every marksheet, interest rate and discount ticket in the world speaks percent.',
        },
        {
          kind: 'para',
          text: 'There is a picture that makes the whole idea visible, and it is worth keeping on the desk for the rest of the chapter: cut a square into $100$ equal cells, ten by ten. Each cell is one hundredth of the whole — one percent. Any fraction whose denominator divides $100$ shades a clean block of cells; any percent at all shades an exact count of them.',
        },
        {
          kind: 'figure',
          caption:
            'The 100-square: the percent ruler made visible. Each of the hundred cells is one hundredth of the whole, so each cell is 1%. The shaded block holds 35 cells — a 5 × 5 quarter (25%, the top-left bracket) joined to two columns of five (10%, the second bracket): the benchmark build 25% + 10% = 35%. The legend walks the three dresses of one number — 35 cells, 35/100, 7/20, 0.35 — which are all the same fact.',
          svg: `<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A ten by ten square of one hundred cells with thirty five cells shaded, showing twenty five percent as a five by five quarter and ten percent as two columns of five, each cell one percent">
  <g stroke="#b45309" stroke-width="1.4" fill="none">
    <line x1="70" y1="88" x2="220" y2="88"/>
    <line x1="70" y1="88" x2="70" y2="96"/>
    <line x1="220" y1="88" x2="220" y2="96"/>
    <line x1="220" y1="88" x2="280" y2="88"/>
    <line x1="280" y1="88" x2="280" y2="96"/>
  </g>
  <g font-size="12" fill="#b45309" text-anchor="middle">
    <text x="145" y="80">25%</text>
    <text x="250" y="80">10%</text>
  </g>
  <rect x="70" y="110" width="210" height="150" fill="#b45309" fill-opacity="0.28"/>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <line x1="70" y1="110" x2="370" y2="110"/>
    <line x1="70" y1="140" x2="370" y2="140"/>
    <line x1="70" y1="170" x2="370" y2="170"/>
    <line x1="70" y1="200" x2="370" y2="200"/>
    <line x1="70" y1="230" x2="370" y2="230"/>
    <line x1="70" y1="260" x2="370" y2="260"/>
    <line x1="70" y1="290" x2="370" y2="290"/>
    <line x1="70" y1="320" x2="370" y2="320"/>
    <line x1="70" y1="350" x2="370" y2="350"/>
    <line x1="70" y1="380" x2="370" y2="380"/>
    <line x1="70" y1="410" x2="370" y2="410"/>
    <line x1="70" y1="110" x2="70" y2="410"/>
    <line x1="100" y1="110" x2="100" y2="410"/>
    <line x1="130" y1="110" x2="130" y2="410"/>
    <line x1="160" y1="110" x2="160" y2="410"/>
    <line x1="190" y1="110" x2="190" y2="410"/>
    <line x1="220" y1="110" x2="220" y2="410"/>
    <line x1="250" y1="110" x2="250" y2="410"/>
    <line x1="280" y1="110" x2="280" y2="410"/>
    <line x1="310" y1="110" x2="310" y2="410"/>
    <line x1="340" y1="110" x2="340" y2="410"/>
    <line x1="370" y1="110" x2="370" y2="410"/>
  </g>
  <g font-size="13" fill="currentColor">
    <text x="400" y="150">35 of the 100 cells are shaded</text>
    <rect x="400" y="170" width="22" height="22" fill="#b45309" fill-opacity="0.28" stroke="currentColor" stroke-width="1"/>
    <text x="432" y="186">35 cells = 35% = 7/20 of the square</text>
    <rect x="400" y="230" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1"/>
    <text x="432" y="246">each cell = 1% of the whole</text>
    <text x="400" y="300">the benchmarks build the block:</text>
    <text x="400" y="326">25% + 10% = 35%</text>
  </g>
  <text x="380" y="445" font-size="14" fill="currentColor" text-anchor="middle">35% = 35/100 = 7/20 = 0.35 — three dresses of one number</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the figure with the benchmarks of chapter 4 in hand. The shaded quarter is $25\\%$ because $25$ cells is $\\tfrac{25}{100} = \\tfrac{1}{4}$ of the square; the two joined columns are $10\\%$ because $\\tfrac{10}{100} = \\tfrac{1}{10}$; and the build $25\\% + 10\\%$ shows the deeper habit this lesson will drill — friendly percents assemble unfriendly ones, exactly as friendly fractions assembled $\\tfrac{3}{10} = \\tfrac{1}{4} + \\tfrac{1}{20}$ in Lesson 4.4. The bottom strip is the promise of the next section: one number, three dresses, and a two-hop walk between any two of them.',
        },
        { kind: 'heading', text: 'Converting both ways: the two-hop law' },
        {
          kind: 'para',
          text: 'The percent contract, written symbolically, is one line with two readings:',
        },
        {
          kind: 'equation',
          latex: 'x\\% = \\tfrac{x}{100} \\qquad\\qquad p = \\tfrac{x}{100} \\;\\Longleftrightarrow\\; x = 100p \\tag{1}',
          note: 'Left: the definition — a percent is a fraction with denominator 100. Right: the same line read both ways — a number $p$ wears the percent $100p$, so decimal and percent dress one number exactly.',
        },
        {
          kind: 'derivation',
          title: 'The two-hop law',
          statement:
            'Claim: a percent $x\\%$ converts to a decimal by dividing by $100$ — the point hopping two rooms left — and any number $p$ converts to its percent $100p$ by multiplying by $100$ — two rooms right.',
          steps: [
            {
              label: 'The definition',
              formula: 'x\\% = \\tfrac{x}{100}',
              explanation:
                'The percent dress is a fraction dress with the denominator fixed at $100$ — no approximation has entered, and none may.',
            },
            {
              label: 'The division as a point-shift',
              formula: '\\tfrac{x}{100} = \\tfrac{x}{10^2} \\;\\Rightarrow\\; x\\% = x \\div 10^2',
              explanation:
                'One factor of ten per room of Lesson 5.1\'s ladder; dividing by $10^k$ hops the point $k$ rooms left (Lesson 5.3\'s point-shift rule). Here $k = 2$: exactly two rooms, never one, never three.',
            },
            {
              label: 'The reverse reading',
              formula: 'p = \\tfrac{x}{100} \\;\\Longleftrightarrow\\; x = 100p',
              explanation:
                'Multiplying both sides by $100$ undoes the division — the equivalence runs both ways. A number $p$ wears the percent $100p$, which is why $0.065$ and $6.5\\%$ name one number.',
            },
          ],
          result:
            '$x\\% = x \\div 100$ and $p \\times 100 = $ the percent of $p$: the **two-hop law**. It is the point-shift rule of Lesson 5.3 with $k = 2$, and it is exact — a change of dress introduces no rounding.',
        },
        {
          kind: 'example',
          title: 'Express 35% as a fraction in its lowest terms',
          steps: [
            'Now, by definition $35\\% = \\tfrac{35}{100}$ — the dress itself.',
            'So reduce to lowest terms as chapter 3 taught: $\\gcd(35, 100) = 5$, and $\\tfrac{35}{100} = \\tfrac{35 \\div 5}{100 \\div 5} = \\tfrac{7}{20}$.',
            'Hence $35\\% = \\tfrac{7}{20}$ — and the cross-check closes it: $7 \\times 100 = 700 = 35 \\times 20$.',
          ],
        },
        {
          kind: 'para',
          text: 'Decimal percents ride the same definition one storey higher: $12.5\\% = \\tfrac{12.5}{100} = \\tfrac{125}{1000} = \\tfrac{1}{8}$ and $6.25\\% = \\tfrac{625}{10000} = \\tfrac{1}{16}$ — the point-shift inside the numerator landing on famous fractions. In the reverse direction, a fraction reaches its percent by two routes: **fair trade** to denominator $100$ when the denominator divides it ($\\tfrac{3}{5} = \\tfrac{60}{100}$), or the **decimal route** when it does not — dress as a decimal first, then hop twice right.',
        },
        {
          kind: 'example',
          title: 'Express 7/8 as a percent',
          steps: [
            'Now, percent asks for hundredths, and $8$ does not divide $100$ — no fair trade lands the 100-ruler directly.',
            'So take the decimal route: by the atom test of Lesson 5.1 ($8 = 2^3$), the dress terminates in $3$ places, and the step machine gives $\\tfrac{7}{8} = 0.875$.',
            'And the two-hop law dresses it: $0.875 \\times 100 = 87.5$ — the point hops two rooms right.',
            'Hence $\\tfrac{7}{8} = 87.5\\%$ — checked from the definition: $\\tfrac{87.5}{100} = \\tfrac{875}{1000} = \\tfrac{7}{8}$.',
          ],
        },
        {
          kind: 'example',
          title: 'Express 0.065 as a percent',
          steps: [
            'Now, decimal to percent is $\\times 100$ — two rooms right: $0.065 \\rightarrow 6.5$.',
            'So $0.065 = 6.5\\%$ — sixty-five thousandths are six and a half hundredths.',
            'Hence $0.065 = 6.5\\%$, not $65\\%$ — that would be $0.65$, ten times larger. One room of the ladder is always a factor of ten (Lesson 5.1).',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The 33 1/3% caution',
          text: '$\\tfrac{1}{3} = 0.(3)$ never terminates, so no finite decimal percent is exact — but the **mixed form** is: $33\\tfrac{1}{3}\\% = \\tfrac{100/3}{100} = \\tfrac{1}{3}$ exactly, the fraction riding inside the percent. The rounded $33.3\\% = \\tfrac{333}{1000}$ is a hair short ($333 \\times 3 = 999$, one thousandth behind). Exam convention keeps the pair $33\\tfrac{1}{3}\\% = \\tfrac{1}{3}$ and $66\\tfrac{2}{3}\\% = \\tfrac{2}{3}$ — trust the fraction inside the percent, never the rounded decimal.',
        },
        {
          kind: 'figure',
          caption:
            'The conversion map. Three stations, one number in three dresses. Between fraction and decimal run the step machine of Lesson 5.2 (forward) and the place reading of Lesson 5.1 (back); between decimal and percent runs the two-hop law — × 100 two rooms right, ÷ 100 two rooms left. The arc above is the direct hop: multiply by 100 and write %.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The conversion map joining the fraction, decimal and percent stations, with arrows labelled by the step machine, the place reading, and the times or divide by one hundred two-hop law">
  <path d="M 120 150 C 200 60, 560 60, 640 150" fill="none" stroke="#b45309" stroke-width="1.6"/>
  <polygon points="640,150 635.8,136.4 627,144.4" fill="#b45309"/>
  <text x="380" y="50" font-size="13" fill="#b45309" text-anchor="middle">the direct hop: × 100, then write %</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="30" y="150" width="180" height="64"/>
    <rect x="300" y="150" width="160" height="64"/>
    <rect x="550" y="150" width="180" height="64"/>
  </g>
  <g font-size="15" fill="currentColor" text-anchor="middle" letter-spacing="1">
    <text x="120" y="177">FRACTION</text>
    <text x="380" y="177">DECIMAL</text>
    <text x="640" y="177">PERCENT</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle" font-style="italic">
    <text x="120" y="200">3/4, 7/20</text>
    <text x="380" y="200">0.75, 0.35</text>
    <text x="640" y="200">75%, 35%</text>
  </g>
  <g stroke="#b45309" stroke-width="1.6">
    <line x1="214" y1="166" x2="296" y2="166"/>
    <line x1="296" y1="198" x2="214" y2="198"/>
    <line x1="464" y1="166" x2="546" y2="166"/>
    <line x1="546" y1="198" x2="464" y2="198"/>
  </g>
  <polygon points="296,166 285,161 285,171" fill="#b45309"/>
  <polygon points="214,198 225,193 225,203" fill="#b45309"/>
  <polygon points="546,166 535,161 535,171" fill="#b45309"/>
  <polygon points="464,198 475,193 475,203" fill="#b45309"/>
  <g font-size="12" fill="#b45309" text-anchor="middle">
    <text x="255" y="132">the step machine (5.2)</text>
    <text x="255" y="252">the place reading (5.1)</text>
    <text x="505" y="132">× 100: two rooms right</text>
    <text x="505" y="252">÷ 100: two rooms left</text>
  </g>
  <text x="380" y="330" font-size="14" fill="currentColor" text-anchor="middle">3/4 = 0.75 = 75% · 7/20 = 0.35 = 35% · 0.065 = 6.5% · 1/3 = 0.(3) = 33 1/3%</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The map rewards a slow reading. Every journey is two hops or fewer: fraction to percent runs through the decimal station (the step machine, then two rooms right) or takes the direct arc — multiply by $100$, write the sign. Percent to fraction runs the arc backwards and simplifies by the HCF. The one habit that poisons exam answers is hopping the wrong number of rooms, and the figure is the antidote: $0.06 = 6\\%$ but $0.6 = 60\\%$, and the two wrongs $0.6\\%$ and $600\\%$ each live exactly one room from the truth in opposite directions.',
        },
        { kind: 'heading', text: 'Percent of a quantity' },
        {
          kind: 'para',
          text: 'The definition already announced the working rule, and Lesson 4.5 supplies its grammar: "**of** means multiply". So the percent of a quantity is a fraction-of, with the fraction fixed at hundredths:',
        },
        {
          kind: 'equation',
          latex: 'x\\% \\text{ of } A = \\tfrac{x}{100} \\times A \\qquad\\qquad \\tfrac{x}{100} \\times A = \\text{part} \\;\\Rightarrow\\; A = \\text{part} \\times \\tfrac{100}{x} \\tag{2}',
          note: 'Left: fraction-of with hundredths — the direct percent-of rule. Right: the whole recovered from a known part — the unitary method of Lesson 5.3 in percent dress: divide to the 1%, scale to the 100%.',
        },
        {
          kind: 'para',
          text: 'The direct rule is mechanical, but the exam hall rewards the **benchmarks** — the percents whose fraction dresses are famous — because they turn percent-of into division by a small whole number. Half the skill of percentages is knowing this ladder by heart:',
        },
        {
          kind: 'table',
          head: ['Percent', 'Fraction dress', 'Decimal dress', 'Read as'],
          rows: [
            ['100%', '1', '1', 'the whole'],
            ['75%', '3/4', '0.75', 'half plus a quarter'],
            ['50%', '1/2', '0.5', 'the half'],
            ['25%', '1/4', '0.25', 'the quarter'],
            ['20%', '1/5', '0.2', 'the fifth'],
            ['12.5%', '1/8', '0.125', 'half of a quarter'],
            ['10%', '1/10', '0.1', 'the tenth'],
            ['5%', '1/20', '0.05', 'half of a tenth'],
            ['1%', '1/100', '0.01', 'the unit share'],
          ],
        },
        {
          kind: 'para',
          text: 'The builds ride on the ladder: $35\\% = 25\\% + 10\\%$, $15\\% = 10\\% + 5\\%$, $18\\% = 20\\% - 2\\%$. And the halving chain extends it forever: $100$ halved is $50$, $25$, $12.5$, $6.25$, $3.125$, ... — so $12.5\\% = \\tfrac{1}{8}$, $6.25\\% = \\tfrac{1}{16}$, $3.125\\% = \\tfrac{1}{32}$. The atoms of chapter 3 explain the exactness: $100 = 2^2 \\times 5^2$, and dividing by $2^k$ leaves the fives in place, so every rung of the chain keeps a terminating dress.',
        },
        {
          kind: 'example',
          title: 'Find 15% of 460',
          steps: [
            'Now, by the rule: $15\\%$ of $460 = \\tfrac{15}{100} \\times 460$ — "of" is Lesson 4.5\'s multiplication.',
            'So by the benchmarks: $10\\%$ of $460 = 46$ and $5\\%$ is half of that, $23$ — the build $15\\% = 10\\% + 5\\%$ gives $46 + 23 = 69$.',
            'Or in one direct dress: $\\tfrac{15 \\times 460}{100} = \\tfrac{6900}{100} = 69$ — and the cross-cancellation route agrees: $\\tfrac{15}{100} = \\tfrac{3}{20}$, so $\\tfrac{3}{20} \\times 460 = 3 \\times 23 = 69$.',
            'Hence $15\\%$ of $460 = 69$ — both routes must agree, and they do.',
          ],
        },
        {
          kind: 'example',
          title: 'Ravi scored 348 marks out of 500. Express his score as a percent',
          steps: [
            'Now, a score "out of" $500$ is the fraction $\\tfrac{348}{500}$; the percent dress multiplies by $100$: $\\tfrac{348}{500} \\times 100$.',
            'So cancel first — $\\tfrac{100}{500} = \\tfrac{1}{5}$ — and the question shrinks to $\\tfrac{348}{5}$.',
            'And the step machine divides: $5$ into $34$ gives $6$, remainder $4$; the point rides into the quotient; $5$ into $48$ gives $9$, remainder $3$; one written zero pays the last digit — $69.6$.',
            'Hence $\\tfrac{348}{500} = 69.6\\%$ — a fraction of five hundred redressed as hundredths.',
          ],
        },
        { kind: 'heading', text: 'Finding the whole: the unitary method returns' },
        {
          kind: 'para',
          text: 'Percent-of points one way: whole known, part wanted. The exam\'s favourite reversal points the other way: a **part and its percent are known, the whole is wanted**. "8% of a number is 56" hides the number, and equation $(2)$\'s right-hand form names the hunt — divide to the $1\\%$, scale to the $100\\%$. This is the unitary method of Lesson 5.3, the same divide-to-the-one that priced petrol, now wearing the percent dress.',
        },
        {
          kind: 'example',
          title: '8% of a number is 56. Find the number',
          steps: [
            'Now, the unitary method — divide to the one: $8\\%$ of the number is $56$, so $1\\%$ of it is $\\tfrac{56}{8} = 7$.',
            'So scale to the whole: the number is $100\\%$ of itself — $7 \\times 100 = 700$.',
            'And the forward check closes the loop: $8\\%$ of $700 = \\tfrac{8}{100} \\times 700 = 56$ — exactly the part we started from.',
            'Hence the number is $700$ — or in one line, $56 \\times \\tfrac{100}{8} = 700$, equation $(2)$\'s right-hand form.',
          ],
        },
        {
          kind: 'para',
          text: 'The same ladder answers "what percent" questions by running the percent-of forward and reporting the count: $36$ out of $90$ asks for $\\tfrac{36}{90} \\times 100 = 40\\%$; $66$ out of $240$ gives $\\tfrac{6600}{240} = 27.5\\%$. Three problem families cover the exam territory:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Marks and pass marks:** an examination of $600$ marks passes at $33\\%$ — the pass mark is $\\tfrac{33}{100} \\times 600 = 198$, and a candidate on $210$ passes by $12$ marks, a margin of $\\tfrac{12}{600} \\times 100 = 2\\%$ of the paper.',
            '**Shares of a class:** of $45$ students, $60\\%$ are boys — $\\tfrac{60}{100} \\times 45 = 27$ boys — and the $18$ girls are the complement; the census closes at $27 + 18 = 45$.',
            '**Savings and spending:** $30\\%$ of a salary of Rs $18{,}500$ is saved — Rs $5{,}550$ — leaving Rs $12{,}950$ to spend; the parts always answer to $100\\%$ of the whole.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The commutativity gem',
          text: '$x\\%$ of $y$ and $y\\%$ of $x$ are the same number — both are $\\tfrac{xy}{100}$, and multiplication commutes. So $16\\%$ of $25 = 25\\%$ of $16 = \\tfrac{16}{4} = 4$; $8\\%$ of $50 = 50\\%$ of $8 = 4$. The exam use is one move: **flip the ugly percent onto the friendly number** — a percent-of product is only ever as hard as the friendlier of its two readings.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Percent',
              def: 'A fraction with denominator 100: x% means x/100. Example: 35% = 35/100 = 7/20; 120% = 6/5 is legal — percents may pass the whole.',
            },
            {
              term: 'The % sign',
              def: 'The symbol read "per cent", evolved from the Italian merchants\' per cento ("for every hundred") through the ledger abbreviation P c° to today\'s two rings and slash. Example: 6% = 6/100 = 0.06.',
            },
            {
              term: 'Standardised denominator',
              def: 'The service percent renders: every fraction redressed with denominator 100, so unlike fractions compare, rank and total without hunting LCMs. Example: 7/20 and 3/8 meet as 35% and 37.5%.',
            },
            {
              term: 'Two-hop conversion',
              def: 'The point-shift of Lesson 5.3 at k = 2: percent to decimal is ÷ 100 (two rooms left); decimal to percent is × 100 (two rooms right). Example: 45% = 0.45; 0.065 = 6.5%.',
            },
            {
              term: 'Percent of a quantity',
              def: 'x% of A = (x/100) × A — "of" is Lesson 4.5\'s multiplication. Example: 15% of 460 = 69 by the build 10% + 5% or the direct dress.',
            },
            {
              term: 'Benchmark percents',
              def: 'The friendly percents whose fraction dresses are halves, quarters, fifths and tenths — built by halving 100. Example: 50% = 1/2, 25% = 1/4, 12.5% = 1/8, 10% = 1/10, 1% = 1/100.',
            },
            {
              term: 'The 1% unit',
              def: 'One hundredth of the quantity — the unit share the percent ladder divides to before scaling to 100%. Example: if 8% of a number is 56, the 1% unit is 7 and the number is 700.',
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The percent definition',
          latex: 'x\\% = \\dfrac{x}{100}',
          note: 'The % sign is an instruction to divide by 100, not a unit. 100% is the whole; 120% = 6/5 is more than the whole and is perfectly legal; 0.5% = 1/200 reaches deep.',
        },
        {
          kind: 'formula',
          name: 'The two-hop conversion',
          latex: 'x\\% \\leftrightarrow x \\div 100 \\qquad p \\leftrightarrow 100p \\qquad \\text{(two rooms each way)}',
          note: 'The point-shift rule of Lesson 5.3 at k = 2. Trust the fraction inside the percent: 33 1/3% = 1/3 exactly, while 33.3% is only close (333 × 3 = 999, one thousandth short).',
        },
        {
          kind: 'formula',
          name: 'Percent of a quantity',
          latex: 'x\\% \\text{ of } A = \\dfrac{x}{100} \\times A \\qquad A = \\text{part} \\times \\dfrac{100}{x}',
          note: 'Fraction-of on the left; the unitary method on the right — divide to the 1% (part ÷ x), scale to the 100% (× 100). The gem x% of y = y% of x flips ugly percents onto friendly numbers.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Percent is the most examined dress in arithmetic: (i) conversion fill-ins run both ways — $\\tfrac{3}{8} = 37.5\\%$, $0.06 = 6\\%$, $\\tfrac{5}{8} = 62.5\\%$ — and the direction of the two-hop is the whole question; (ii) the benchmark family prices mental arithmetic — $12.5\\% = \\tfrac{1}{8}$ and $6.25\\% = \\tfrac{1}{16}$ turn $512$ and $640$ into one-step quotients ($32$ and $20$); (iii) the commutativity gem turns $16\\%$ of $25$ into $25\\%$ of $16 = 4$; (iv) marks, pass marks and margins are percent-of problems — $33\\%$ of $600 = 198$, a $210$ clears it by $12$; (v) "find the whole" is the unitary method — divide to the $1\\%$, scale to the $100\\%$ ($8\\%$ of $n$ is $56 \\Rightarrow n = 700$); (vi) the standing traps: $0.5\\%$ is not $50\\%$ (two rooms apart), $120\\%$ is legal ($\\tfrac{6}{5}$), and $\\tfrac{1}{3}$ is exactly $33\\tfrac{1}{3}\\%$ but only approximately $33.3\\%$.',
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Expressed as a percent, 3/8 equals:',
              options: ['37.5%', '3.75%', '375%', '38%'],
              answer: 0,
              explain:
                'Percent multiplies by 100: 3/8 = 0.375 (the atom test — 8 = 2³ terminates in 3 places), and 0.375 × 100 = 37.5 (Option 1). Option 2 hopped one room left (that is 0.0375), Option 3 hopped three rooms right (0.375 × 1000), and Option 4 rounds away an exact half that needs no rounding.',
            },
            {
              q: '0.06 expressed as a percent is:',
              options: ['0.6%', '6%', '60%', '600%'],
              answer: 1,
              explain:
                'The two-hop law sends a decimal to a percent by × 100: 0.06 × 100 = 6 (Option 2). Option 1 hopped one room only (0.6% = 0.006), Option 3 answered for 0.6, and Option 4 answered for 6.0 — each a ladder room away from the true hundredth.',
            },
            {
              q: '45% of 800 = ?',
              options: ['36', '360', '3.6', '450'],
              answer: 1,
              explain:
                '(45/100) × 800 = 45 × 8 = 360 (Option 2). Option 1 slipped one room down (45 × 0.8 = 36), Option 3 two, and Option 4 would be 45% of 1000 — the wrong whole.',
            },
            {
              q: '12.5% of a quantity is the same as which fraction of it?',
              options: ['1/6', '1/12', '1/8', '1/5'],
              answer: 2,
              explain:
                '12.5 × 8 = 100, so 12.5% = 12.5/100 = 1/8 (Option 3) — the halving chain: half of 25% = 1/4. Option 1 is 16.6%, Option 2 is 8.3%, Option 4 is 20% — different rungs of the ladder altogether.',
            },
            {
              q: '8% of a number is 56. The number is:',
              options: ['448', '48', '700', '7000'],
              answer: 2,
              explain:
                'The unitary method: 1% of the number is 56/8 = 7, so the whole — 100% — is 7 × 100 = 700 (Option 3), and indeed 8% of 700 = 56. Option 1 multiplied 56 × 8, Option 2 subtracted, and Option 4 scaled by 1000/8 — three rooms too generous.',
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
                  q: 'Express 45% as a fraction in its lowest terms.',
                  solution: [
                    'Now, by definition $45\\% = \\tfrac{45}{100}$ — the dress itself.',
                    'So reduce as chapter 3 taught: $\\gcd(45, 100) = 5$, and $\\tfrac{45}{100} = \\tfrac{9}{20}$.',
                    'Hence $45\\% = \\tfrac{9}{20}$ — the cross-check: $9 \\times 100 = 900 = 45 \\times 20$.',
                  ],
                  answer: '9/20',
                },
                {
                  q: 'Write 7% as a decimal.',
                  solution: [
                    'Now, percent divides by $100$ — the point hops two rooms left.',
                    'So $7\\% = \\tfrac{7}{100} = 0.07$: the digit $7$ lands in the hundredths room.',
                    'Hence $7\\% = 0.07$ — and $0.07 \\times 100 = 7$ walks it back.',
                  ],
                  answer: '0.07',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Express 3/5 as a percent.',
                  solution: [
                    'Now, $5$ divides $100$ — a fair trade lands directly on the 100-ruler: $\\tfrac{3}{5} = \\tfrac{3 \\times 20}{5 \\times 20} = \\tfrac{60}{100}$.',
                    'So $\\tfrac{60}{100}$ is the percent dress by definition: $60\\%$.',
                    'Hence $\\tfrac{3}{5} = 60\\%$ — the decimal route agrees: $0.6 \\times 100 = 60$.',
                  ],
                  answer: '60%',
                },
                {
                  q: 'Find 25% of 320.',
                  solution: [
                    'Now, $25\\% = \\tfrac{1}{4}$ — the benchmark quarter.',
                    'So $25\\%$ of $320 = \\tfrac{320}{4} = 80$.',
                    'Hence $25\\%$ of $320 = 80$ — the direct dress agrees: $\\tfrac{25 \\times 320}{100} = \\tfrac{8000}{100} = 80$.',
                  ],
                  answer: '80',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Express 0.375 as a percent.',
                  solution: [
                    'Now, decimal to percent is $\\times 100$ — two rooms right.',
                    'So $0.375 \\times 100 = 37.5$.',
                    'Hence $0.375 = 37.5\\%$ — three hundred and seventy-five thousandths are thirty-seven and a half hundredths.',
                  ],
                  answer: '37.5%',
                },
                {
                  q: 'Find 18% of 2500.',
                  solution: [
                    'Now, $18\\%$ of $2500 = \\tfrac{18}{100} \\times 2500$.',
                    'So the hundreds cancel: $\\tfrac{18}{100} \\times 2500 = 18 \\times 25 = 450$.',
                    'Hence $18\\%$ of $2500 = 450$ — the benchmark route agrees: $20\\%$ of $2500 = 500$ and $2\\% = 50$, so $500 - 50 = 450$.',
                  ],
                  answer: '450',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'What percent of 90 is 36?',
                  solution: [
                    'Now, "what percent" asks for the fraction $\\tfrac{36}{90}$ dressed in hundredths: $\\tfrac{36}{90} \\times 100$.',
                    'So cancel first — $\\gcd(36, 90) = 18$, so $\\tfrac{36}{90} = \\tfrac{2}{5}$ — and the fair trade finishes it: $\\tfrac{2}{5} = \\tfrac{40}{100}$.',
                    'Hence $36$ is $40\\%$ of $90$ — the direct run agrees: $\\tfrac{36 \\times 100}{90} = \\tfrac{3600}{90} = 40$.',
                  ],
                  answer: '40%',
                },
                {
                  q: '12% of a number is 84. Find the number.',
                  solution: [
                    'Now, the unitary method: $12\\%$ of the number is $84$, so $1\\%$ of it is $\\tfrac{84}{12} = 7$.',
                    'So the whole — $100\\%$ — is $7 \\times 100 = 700$.',
                    'Hence the number is $700$ — checked: $\\tfrac{12}{100} \\times 700 = 84$.',
                  ],
                  answer: '700',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'exam-style: An examination carries 600 marks and the pass mark is 33%. A candidate scores 210 marks. Does the candidate pass, and by how many marks?',
                  solution: [
                    'Now, the pass mark first: $33\\%$ of $600 = \\tfrac{33 \\times 600}{100} = 33 \\times 6 = 198$.',
                    'So the candidate\'s $210$ clears it: $210 - 198 = 12$.',
                    'Hence the candidate passes by $12$ marks — and in percent dress the margin is $\\tfrac{12}{600} \\times 100 = 2\\%$ of the paper.',
                  ],
                  answer: 'passes by 12 marks (2% of the paper)',
                },
                {
                  q: 'exam-style: In a class of 45 students, 60% are boys. How many girls are there?',
                  solution: [
                    'Now, the boys: $60\\%$ of $45 = \\tfrac{60 \\times 45}{100} = \\tfrac{3 \\times 45}{5} = 27$.',
                    'So the girls are the rest: $45 - 27 = 18$.',
                    'Hence there are $18$ girls — and the census closes: $27 + 18 = 45$, the whole class accounted for.',
                  ],
                  answer: '18 girls',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that x% of y equals y% of x for all numbers x and y, and use the result to compute 16% of 25 in one line.',
                  solution: [
                    'Now, both sides divide by the same $100$: $x\\%$ of $y = \\tfrac{x}{100} \\times y = \\tfrac{xy}{100}$, and $y\\%$ of $x = \\tfrac{y}{100} \\times x = \\tfrac{yx}{100}$.',
                    'So the two products are one number — $xy = yx$ (multiplication commutes, Lesson 2.2) — and the percent dress inherits the commutativity.',
                    'And the use: $16\\%$ of $25$ is unfriendly, but its twin $25\\%$ of $16 = \\tfrac{16}{4} = 4$ is a benchmark quarter.',
                    'Hence $x\\%$ of $y = y\\%$ of $x$ for all $x, y$, and $16\\%$ of $25 = 25\\%$ of $16 = 4$ — flip the ugly percent onto the friendly number.',
                  ],
                  answer: 'x% of y = y% of x; 16% of 25 = 4',
                },
                {
                  q: 'The halving chain: starting from 100%, halve repeatedly and express each result as a fraction of the quantity. Hence find 6.25% of 512 and 3.125% of 640.',
                  solution: [
                    'Now, halve the whole: $100\\% \\rightarrow 50\\% \\rightarrow 25\\% \\rightarrow 12.5\\% \\rightarrow 6.25\\% \\rightarrow 3.125\\%$.',
                    'So the fraction dresses halve in step: $\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, \\tfrac{1}{16}, \\tfrac{1}{32}$ — each rung is $\\tfrac{100}{2^k}$, and since $100 = 2^2 \\times 5^2$ the fives never block a halving: every rung terminates.',
                    'And the fractions of the given quantities: $6.25\\% = \\tfrac{1}{16}$ of $512 = 32$; $3.125\\% = \\tfrac{1}{32}$ of $640 = 20$.',
                    'Hence $6.25\\%$ of $512 = 32$ and $3.125\\%$ of $640 = 20$ — the chain halves the percent and halves the fraction in step.',
                  ],
                  answer: '6.25% of 512 = 32; 3.125% of 640 = 20',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'The percent dress is now on every fraction the book has worn, and it behaves: the definition fixed the denominator at $100$, the two-hop law walked between the three stations without rounding, the benchmarks turned percent-of into small divisions, and the unitary method recovered wholes from parts as it once recovered petrol from litres. One task remains before the chapter closes — the exam hall rarely asks what a percent **is**; it asks how much a price **changed**. Lesson 5.5 puts the dress to work on increase, decrease, discount and simple interest, and the arithmetic of 5.3 will do the rest.',
        },
      ],
    },
    {
      id: 'fm-percentage-change-discounts-simple-interest',
      number: '5.5',
      title: 'Percentage Change, Discounts and Simple Interest',
      concepts: [
        'Percentage change',
        'The base of comparison',
        'The factor law',
        'Profit and loss percent',
        'Marked price and discount',
        'Simple interest',
        'The amount',
      ],
      objectives: [
        'Compute percentage increases and decreases as a percent of the original value, and carry them out as one multiplication by the factor (100 ± r)/100',
        'Undo a percent change correctly — divide by the factor, never subtract the percent — and recover an original value from the changed one by the unitary method',
        'Read the trader’s ledger: profit and loss percent reckoned on the cost price, discounts reckoned on the marked price, and the net effect of a markup followed by a discount computed by multiplying the factors',
        'Price borrowed money with simple interest I = PRT/100 from the one-percent-a-year unit, form the amount A = P + I, and recover any missing letter of the formula',
      ],
      prerequisites: [
        'fm-percent-and-its-meaning',
        'fm-operating-on-decimals',
        'fm-multiplying-dividing-fractions',
      ],
      sources: ['khattar-qa-4e', 'ncert-math7-ch8', 'ncert-math8-ch8'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 5.4 armed the reader with the percent dress — one denominator for every fraction — and closed on a promise: the exam hall rarely asks what a percent **is**; it asks how much a price **changed**. This lesson keeps that promise, and it is the working heart of the chapter. Prices rise and fall, traders buy and sell, shops hang tags and then discount them, money is lent and returned with a rent on top — and every one of those stories is the same mathematics wearing a different coat.',
        },
        {
          kind: 'para',
          text: 'The coats share one lining. Every percent statement is really two statements — a number and a **base** — and the whole skill of this lesson is asking, before anything is computed, the one question every percent problem must answer: ***of what?*** A change of 50 on 250 and a change of 50 on 2,500 are both "a change of 50", yet the first is 20% and the second is 2%. The percent lives not in the change but in the change **judged against its base**. Name the base first, divide second — that one discipline, plus a two-line algebraic squeeze, will run the entire lesson.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The one question',
          text: 'This lesson meets four percents, each with a base of its own: a **percentage change** is judged on the **original** value; a **profit or loss percent** is judged on the **cost price**; a **discount** is judged on the **marked price**; and **simple interest** is judged on the **principal**, once for each year of the loan. When a problem says "15%", stop and ask — 15% *of what*? The answer decides every calculation that follows.',
        },
        { kind: 'heading', text: 'Percentage change: the change judged against the original' },
        {
          kind: 'para',
          text: 'A bicycle was marked at Rs 250 and now sells at Rs 300. The price has risen by 50 — but is that a large rise? The number 50 cannot say by itself; fifty rupees is a fortune to a pencil and a pittance to a motorcycle. A percentage change answers the question by judging the change against the value the motion started from — the **original**.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Percentage change',
          text: 'A quantity whose original value is $O$ and whose new value is $N$ is said to have undergone a **percentage change** of $r\\%$ when $r = \\tfrac{N - O}{O} \\times 100$; the change is a **percentage increase** when $N > O$ and a **percentage decrease** when $N < O$. Thus, $N = 300$ with $O = 250$ gives $r = \\tfrac{50}{250} \\times 100 = 20$: the bicycle has undergone a $20\\%$ increase — the change, judged in hundredths of the original.',
        },
        {
          kind: 'para',
          text: 'For example, the definition prices a first shelf of changes at once:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '250 to 300: the change is $+50$, and $\\tfrac{50}{250} \\times 100 = 20$ — a $20\\%$ increase;',
            '48,000 to 44,640: the change is $-3{,}360$, and $\\tfrac{3360}{48000} \\times 100 = 7$ — a $7\\%$ decrease;',
            '800 to 720: the change is $-80$, and $\\tfrac{80}{800} \\times 100 = 10$ — a $10\\%$ decrease.',
          ],
        },
        {
          kind: 'para',
          text: 'Notice where the divisor sits in every line: beneath the change lies the **original**, never the new value. This is not a convention but the meaning of the words — "a $20\\%$ increase" says the price grew by twenty hundredths **of what it was**, so what it was must supply the denominator. A change judged on the new value instead is not a different answer; it is a different question, and the exam sets it as a trap.',
        },
        {
          kind: 'equation',
          latex: 'N = O \\times \\frac{100 \\pm r}{100} \\qquad \\text{(the factor law)}',
          note: 'The definition rearranges into a single multiplication: an increase of $r\\%$ multiplies the original by $\\tfrac{100 + r}{100}$, a decrease by $\\tfrac{100 - r}{100}$. One bracket, one product — no separate "find the change, then add" stage. The derivation is two lines of arithmetic.',
        },
        {
          kind: 'derivation',
          title: 'The factor law',
          statement:
            'Claim: a percent change of $r\\%$ acts on an original $O$ as **one multiplication** — $N = O \\times \\tfrac{100 \\pm r}{100}$ — with the sign chosen by the direction of the change.',
          steps: [
            {
              label: 'The definition, rearranged',
              formula: 'N = O \\pm \\tfrac{r}{100} \\cdot O',
              explanation:
                'The new value is the original plus (or minus) the change, and the definition says the change is $\\tfrac{r}{100}$ **of the original** — hence the factor $O$ on the right.',
            },
            {
              label: 'Distributivity gathers the terms',
              formula: 'N = O\\left(1 \\pm \\tfrac{r}{100}\\right)',
              explanation:
                'Chapter 2’s distributive law factors out the common $O$: original and change are both multiples of the same quantity, so the sum is one product.',
            },
            {
              label: 'The bracket is one fraction',
              formula: '1 \\pm \\tfrac{r}{100} = \\tfrac{100 \\pm r}{100}',
              explanation:
                'One whole is a hundred hundredths (Lesson 5.4: $100\\%$ of anything is the whole of it), so the bracket collects into the single fraction $\\tfrac{100 \\pm r}{100}$.',
            },
            {
              label: 'The bracket reduces when it can',
              formula: '1 + \\tfrac{25}{100} = \\tfrac{125}{100} = \\tfrac{5}{4}, \\qquad 1 - \\tfrac{10}{100} = \\tfrac{90}{100} = \\tfrac{9}{10}',
              explanation:
                'The chapter 3 HCF machinery trims the bracket: a 25% rise is one multiplication by $\\tfrac{5}{4}$, a 10% fall one multiplication by $\\tfrac{9}{10}$. The fraction dress is often the fastest dress.',
            },
          ],
          result:
            'N = O × (100 ± r)/100: every percent change is one multiplication by a factor close to 1 — increase by (100 + r)/100, decrease by (100 − r)/100.',
        },
        {
          kind: 'para',
          text: 'The factor law is the whole machine. An increase of $25\\%$ is one multiplication by $\\tfrac{5}{4}$; a decrease of $10\\%$ is one multiplication by $\\tfrac{9}{10}$; an increase of $20\\%$ is one multiplication by $\\tfrac{6}{5}$. No "find the change, then add it" stage survives — the bracket does everything in one product, and the fraction dress lets chapter 4’s cancellations carry the arithmetic.',
        },
        {
          kind: 'example',
          title: 'A salary rises from Rs 12,500 to Rs 14,000. Find the percentage increase.',
          steps: [
            'Now, the change is $14000 - 12500 = 1500$, and the base is the **original** salary, $12500$.',
            'So the change judged on the original: $\\tfrac{1500}{12500} \\times 100 = \\tfrac{3}{25} \\times 100 = 12$ — the HCF of $1500$ and $12500$ is $500$.',
            'Hence the increase is $12\\%$; the forward check dresses it back: $12500 \\times \\tfrac{112}{100} = 125 \\times 112 = 14000$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The two-base trap',
          text: 'A rise of $25\\%$ followed by a fall of $25\\%$ is **not** a round trip. The rise is judged on the original, but the fall is judged on the **new** value — a different, larger base. The two percents share a face value and nothing else; subtracting them ($25 - 25 = 0$) is arithmetic done on numbers that never belonged to the same base.',
        },
        {
          kind: 'example',
          title: 'A price of Rs 8,000 rises 25% in the festival season, then falls 25% after it. What net change has the customer seen?',
          steps: [
            'Now, the rise is one multiplication by $\\tfrac{5}{4}$: $8000 \\times \\tfrac{5}{4} = 10000$.',
            'So the fall is one multiplication by $\\tfrac{3}{4}$ — judged on the **new** price: $10000 \\times \\tfrac{3}{4} = 7500$.',
            'And the net: $8000 - 7500 = 500$ **below** where the story began, and $\\tfrac{500}{8000} \\times 100 = 6.25$ — a net fall of $6.25\\%$, not zero.',
            'Hence the customer is worse off by $6.25\\%$; the two $25\\%$s never cancelled, because they were judged on two different bases — $8000$ and $10000$.',
          ],
        },
        {
          kind: 'para',
          text: 'The same asymmetry runs the reverse errand, and this is where marks are won. To **undo** a change, do not subtract the percent — divide by its factor. If a rise of $20\\%$ carried $O$ to $N = \\tfrac{6}{5}O$, then $O = \\tfrac{5}{6}N$: the return ticket is a multiplication by $\\tfrac{5}{6}$. Subtracting $20\\%$ of the new value would instead multiply by $\\tfrac{4}{5}$ and land at $\\tfrac{24}{25}O$ — short of home by the missing twenty-fifth. Figure 1 draws both tickets.',
        },
        {
          kind: 'figure',
          caption:
            'The round-trip map. A rise of 20% carries the original 12,500 to 15,000 — one multiplication by 6/5. Two tickets claim to return: the wrong one (amber, dashed) subtracts 20% of the NEW price and lands at 12,000, five hundred short; the right one multiplies by 5/6 — divides by the factor — and lands home at 12,500. Percents do not undo themselves; factors do.',
          svg: `<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rise of twenty percent carries twelve thousand five hundred to fifteen thousand by multiplying by six fifths; the wrong return ticket subtracts twenty percent of the new price and lands at twelve thousand, while the right ticket multiplies by five sixths and lands home">
  <rect x="40" y="170" width="160" height="60" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <rect x="560" y="170" width="160" height="60" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="120" y="192">original</text>
    <text x="120" y="218" font-size="15">12,500</text>
    <text x="640" y="192">after +20%</text>
    <text x="640" y="218" font-size="15">15,000</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" fill="none">
    <line x1="210" y1="200" x2="548" y2="200"/>
  </g>
  <polygon points="548,194 548,206 558,200" fill="currentColor"/>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="380" y="185">+20%: x 6/5</text>
    <text x="380" y="223" font-size="12">12,500 × 6/5 = 15,000</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" fill="none">
    <path d="M 640 230 L 640 300 L 120 300 L 120 238"/>
  </g>
  <polygon points="114,240 126,240 120,230" fill="currentColor"/>
  <text x="380" y="288" font-size="13" fill="currentColor" text-anchor="middle">the return ticket: x 5/6 (divide by the factor) — home at 12,500</text>
  <g stroke="#b45309" stroke-width="1.4" fill="none" stroke-dasharray="6 5">
    <path d="M 600 230 L 600 390 L 160 390 L 160 238"/>
  </g>
  <polygon points="154,240 166,240 160,230" fill="#b45309"/>
  <text x="380" y="378" font-size="13" fill="#b45309" text-anchor="middle">the wrong ticket: − 20% of the new price — 12,000, five hundred short</text>
  <text x="380" y="445" font-size="13" fill="currentColor" text-anchor="middle">percents do not undo themselves — the factor is the ticket</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Figure 1 is the lesson’s first law in miniature. The forward hop and the return hop are **different multiplications** — $\\times \\tfrac{6}{5}$ out, $\\times \\tfrac{5}{6}$ back — because each is judged on the value it starts from. The general shape of the round trip is worth naming now and proving in the exercises: up $r\\%$ then down $r\\%$ multiplies by $\\left(1 + \\tfrac{r}{100}\\right)\\left(1 - \\tfrac{r}{100}\\right) = 1 - \\tfrac{r^2}{10000}$, a **net fall** of $\\tfrac{r^2}{100}\\%$ — for $r = 20$, exactly the missing twenty-fifth of Figure 1; for $r = 25$, the $6.25\\%$ the next illustration finds. The round trip always loses, and the loss is the square of the percent over a hundred.',
        },
        {
          kind: 'example',
          title: 'After a 20% increase a phone costs Rs 15,000. What did it cost before?',
          steps: [
            'Now, the $20\\%$ rise is one multiplication by $\\tfrac{6}{5}$: the old price $\\times \\tfrac{6}{5} = 15000$.',
            'So the return ticket divides by the factor — multiply by $\\tfrac{5}{6}$: $15000 \\times \\tfrac{5}{6} = 2500 \\times 5 = 12500$.',
            'And the unitary method says the same thing in percent dress: Rs 15,000 is $120\\%$ of the old price, so $1\\%$ of it is $15000 \\div 120 = 125$, and $100\\%$ is $125 \\times 100 = 12500$.',
            'Hence the phone cost Rs 12,500 before the rise; the forward check: $12500 \\times \\tfrac{6}{5} = 15000$.',
          ],
        },
        {
          kind: 'para',
          text: 'Finding the original is the return ticket worn as a method, and it is the unitary method of Lesson 5.3 standing in percent dress once more. In general $N = O \\times \\tfrac{100 \\pm r}{100}$ rearranges to $O = N \\times \\tfrac{100}{100 \\pm r}$: multiply the new value by a hundred, divide by $100 \\pm r$. The changed value carries a known percent **of** the original — $120\\%$ after a $20\\%$ rise, $85\\%$ after a $15\\%$ fall — and one division walks back down the ladder to $100\\%$.',
        },
        { kind: 'heading', text: 'Profit and loss: the trader’s percent reckoned on cost' },
        {
          kind: 'para',
          text: 'The marketplace adds two more prices with names of their own. The **cost price** (CP) is what the trader paid for the article; the **selling price** (SP) is what the buyer pays the trader. When the selling price exceeds the cost the trader has a **profit** of $SP - CP$; when the cost exceeds the selling price, a **loss** of $CP - SP$. The bare difference says little — a profit of Rs 360 is handsome on a cycle and nothing on a car — so the trader, like everyone else in this lesson, judges it as a percent.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Profit percent and loss percent',
          text: 'A trader is said to make a **profit of $p\\%$** when the profit $SP - CP$, expressed as a percent **of the cost price**, equals $p$: $p = \\tfrac{SP - CP}{CP} \\times 100$. Likewise a **loss of $l\\%$** means $l = \\tfrac{CP - SP}{CP} \\times 100$. Thus, profit and loss percents are reckoned on the **cost price** unless the question states another base — the money risked is the money that must earn the return.',
        },
        {
          kind: 'equation',
          latex: 'SP = CP \\times \\frac{100 \\pm p}{100} \\qquad \\text{(the ledger dress of the factor law)}',
          note: 'The factor law of this lesson’s first section with the names changed: $O = CP$, $N = SP$, and the percent reckoned on the cost. A profit of $15\\%$ is one multiplication by $\\tfrac{23}{20}$; a loss of $15\\%$ one multiplication by $\\tfrac{17}{20}$. Nothing new — one machine, new labels.',
        },
        {
          kind: 'para',
          text: 'Why the cost price? Because the cost is the trader’s **investment** — the money that was risked and must earn. "A profit of $15\\%$" is trader’s language for: on every Rs 100 tied up, Rs 15 came back on top of it. The exam hall keeps this convention so firmly that a percent of profit unaccompanied by a base **means** cost price; the reader only needs to remember that the base was named, even when silently.',
        },
        {
          kind: 'example',
          title: 'A cycle bought for Rs 2,400 is sold for Rs 2,760. Find the profit percent.',
          steps: [
            'Now, the profit is $2760 - 2400 = 360$, and the base is the **cost**, $2400$.',
            'So the profit judged on cost: $\\tfrac{360}{2400} \\times 100 = \\tfrac{3}{20} \\times 100 = 15$.',
            'Hence the profit is $15\\%$; the forward check rides the factor: $2400 \\times \\tfrac{23}{20} = 120 \\times 23 = 2760$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The wrong base reads a different percent',
          text: 'Judged on the **selling** price, the cycle’s Rs 360 profit is $\\tfrac{360}{2760} \\times 100 \\approx 13.04\\%$ — a different number from a different question ("profit on sales", a bookkeeper’s measure). The exam’s profit percent is on **cost**; Rs 15 of profit per Rs 100 paid out, not per Rs 100 received. One base, firmly named — the cost price.',
        },
        {
          kind: 'example',
          title: 'A fridge sold at Rs 10,200 brought the dealer a loss of 15%. What did it cost the dealer?',
          steps: [
            'Now, a loss of $15\\%$ sells at $85\\%$ of cost — one multiplication by $\\tfrac{17}{20}$: $CP \\times \\tfrac{17}{20} = 10200$.',
            'So the return ticket divides by the factor: $CP = 10200 \\times \\tfrac{20}{17} = 600 \\times 20 = 12000$.',
            'And the unitary method reads the same ladder: Rs 10,200 is $85\\%$ of the cost, so $1\\%$ is $10200 \\div 85 = 120$, and $100\\%$ is $120 \\times 100 = 12000$.',
            'Hence the cost price was Rs 12,000; the check: $12000 \\times \\tfrac{17}{20} = 600 \\times 17 = 10200$, and the loss $12000 - 10200 = 1800$ is indeed $15\\%$ of $12000$.',
          ],
        },
        { kind: 'heading', text: 'Discount: the percent taken off the marked price' },
        {
          kind: 'para',
          text: 'The shop writes a price on the tag — the **marked price** (MP), also called the list price — and then, in the sale week, grants a **reduction** on it. That reduction is the **discount**, and its percent is judged — the reader may finish the sentence — on the price the reduction starts from: the marked price. The customer never pays the tag; the customer pays the tag **less its discount**, which is the selling price once more.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Discount',
          text: 'An article whose marked price is $M$, sold at a **discount of $d\\%$**, sells for $SP = M - \\tfrac{d}{100} \\cdot M = M\\left(1 - \\tfrac{d}{100}\\right) = M \\times \\tfrac{100 - d}{100}$; the discount itself is $M - SP$, expressed as a percent **of the marked price**. Thus, a $15\\%$ discount on a tag of Rs 1,600 takes off $\\tfrac{15}{100} \\times 1600 = 240$ and sells for Rs 1,360 — one multiplication by $\\tfrac{17}{20}$.',
        },
        {
          kind: 'para',
          text: 'Two percents, two bases — and the pairing is worth fixing in the mind. The **profit percent lives on the cost price**; the **discount percent lives on the marked price**. Both obey the same grammar: a percent of the price you start from. The discount is computed on the tag because the tag is where the reduction begins; the profit is computed on the cost because the cost is where the trade begins. *Of what?* — asked once per percent, every time.',
        },
        {
          kind: 'example',
          title: 'A sweater tagged Rs 1,600 is sold at a discount of 15%. Find the discount and the selling price.',
          steps: [
            'Now, the discount is $15\\%$ **of the tag**: $\\tfrac{15}{100} \\times 1600 = 240$.',
            'So the selling price is the tag less its discount: $1600 - 240 = 1360$ — or in one factor, $1600 \\times \\tfrac{85}{100} = 16 \\times 85 = 1360$.',
            'Hence the discount is Rs 240 and the sweater sells for Rs 1,360; the check works backwards: $\\tfrac{240}{1600} \\times 100 = 15$ — the discount is $15\\%$ of the **tag**, as advertised.',
          ],
        },
        {
          kind: 'example',
          title: 'A trader buys a lamp for Rs 600, marks it 40% above cost, then announces a festival discount of 20%. Does the festival spare the customer the markup?',
          steps: [
            'Now, the markup is a $40\\%$ rise on the cost: $MP = 600 \\times \\tfrac{140}{100} = 600 \\times \\tfrac{7}{5} = 840$.',
            'So the discount is $20\\%$ **of the marked price**, not of the cost: $SP = 840 \\times \\tfrac{80}{100} = 840 \\times \\tfrac{4}{5} = 672$.',
            'And the net: $672 - 600 = 72$ above cost, and $\\tfrac{72}{600} \\times 100 = 12$ — the trader still banks a $12\\%$ profit.',
            'Hence the festival does **not** undo the markup: $40\\%$ up and $20\\%$ off is a net $+12\\%$, because the two percents rode two different bases — $600$ and $840$. The factors tell it in one line: $\\tfrac{7}{5} \\times \\tfrac{4}{5} = \\tfrac{28}{25} = 1.12$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The multiplier law',
          text: 'Successive percent changes **multiply their factors**; the percents themselves never add. A markup of $40\\%$ then a discount of $20\\%$ is $1.40 \\times 0.80 = 1.12$ — a net $+12\\%$, not $+20\\%$. The same law ran the round trip of the first section ($1.25 \\times 0.75 = 0.9375$, a net $-6.25\\%$) and it will run every chain of changes: convert each percent to its factor, multiply the factors, and read the net percent off the product.',
        },
        {
          kind: 'figure',
          caption:
            'The two-lane map to one selling price. Left lane: a cost of 600 marked up 15% sells at 690 — the percent rides the cost. Right lane: a tag of 750 discounted 8% also sells at 690 — the percent rides the tag. Two percents, two bases, one price; profit 90 is 15% of 600 and discount 60 is 8% of 750. Every percent answers "of what?"',
          svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lanes reach one selling price of six hundred and ninety: a cost of six hundred marked up fifteen percent, and a tag of seven hundred fifty discounted eight percent, each percent riding its own base">
  <rect x="40" y="95" width="150" height="55" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <rect x="320" y="95" width="120" height="55" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <rect x="570" y="95" width="150" height="55" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="115" y="116">CP — money in</text>
    <text x="115" y="140" font-size="15">600</text>
    <text x="380" y="116">SP — one price</text>
    <text x="380" y="140" font-size="15">690</text>
    <text x="645" y="116">MP — the tag</text>
    <text x="645" y="140" font-size="15">750</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" fill="none">
    <line x1="200" y1="122" x2="300" y2="122"/>
    <line x1="560" y1="122" x2="460" y2="122"/>
  </g>
  <polygon points="300,116 300,128 310,122" fill="currentColor"/>
  <polygon points="460,116 460,128 450,122" fill="currentColor"/>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="255" y="108">+15% on cost</text>
    <text x="505" y="108">8% off the tag</text>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="195" y="210">600 × 115/100 = 690 — profit 90, 15% of the cost</text>
    <text x="565" y="210">750 × 92/100 = 690 — discount 60, 8% of the tag</text>
    <text x="380" y="240">two percents, two bases, one selling price</text>
    <text x="380" y="285" font-size="13">every percent answers "of what?" — name the base first</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Figure 2 earns its keep as a map of the whole trade. One selling price — Rs 690 — is reached from two directions: the left lane multiplies the cost by $\\tfrac{23}{20}$ and calls the difference profit; the right lane multiplies the tag by $\\tfrac{92}{100}$ and calls the difference discount. The lanes never share a base, so their percents never compare directly — $15\\%$ of 600 and $8\\%$ of 750 are both "small fractions of their own starts", and the map says so visually. When an exam problem offers two lanes at once (a markup, then a discount), multiply the two factors and let the single product confess the net.',
        },
        { kind: 'heading', text: 'Simple interest: the rent on borrowed money' },
        {
          kind: 'para',
          text: 'Money borrowed is money rented. The sum lent is the **principal** ($P$); the rent paid for its use is the **interest**; and the rent is quoted as a rate **per annum** — percent per year. Lesson 5.4’s definition gives the phrase its teeth immediately: a rate of $R\\%$ per annum means Rs $R$ of interest for every Rs 100 of principal, for **each year** the money stays out. The base is named — the principal — and the time is counted in years; everything else is the percent-of machinery of 5.4 working at an annual rhythm.',
        },
        {
          kind: 'derivation',
          title: 'The simple interest law',
          statement:
            'Claim: money lent at $R\\%$ per annum gathers interest $I = \\tfrac{PRT}{100}$ over $T$ years, and the borrower returns the **amount** $A = P + I$.',
          steps: [
            {
              label: 'One year, from the percent definition',
              formula: 'I_1 = R\\% \\text{ of } P = \\tfrac{R}{100} \\times P',
              explanation:
                'The rate is a percent **of the principal** (Lesson 5.4, percent of a quantity): $R$ hundredths of $P$ for one year. On Rs 100 of principal the rent is exactly Rs $R$ — the rate read literally.',
            },
            {
              label: 'T years, by repeated addition',
              formula: 'I = \\underbrace{I_1 + I_1 + \\cdots + I_1}_{T \\text{ times}} = T \\times \\tfrac{R}{100} \\times P',
              explanation:
                '**Simple** interest is rent on the original principal alone: each year charges the same $I_1$, because the base never moves. T copies of one rent are T times one rent — chapter 2’s multiplication as repeated addition.',
            },
            {
              label: 'The formula in its standard dress',
              formula: 'I = \\tfrac{PRT}{100}, \\qquad A = P + I',
              explanation:
                'Reordering the factors costs nothing (multiplication commutes, chapter 2), and the **amount** — what the borrower actually returns — is principal plus interest, never principal times something.',
            },
          ],
          result:
            'I = PRT/100 and A = P + I: the rate prices one year on Rs 100; the principal counts how many hundreds; the time counts how many years.',
        },
        {
          kind: 'equation',
          latex: 'I = \\frac{PRT}{100}, \\qquad A = P + I \\qquad \\text{(simple interest)}',
          note: '$P$ = principal (Rs lent), $R$ = rate percent **per annum**, $T$ = time **in years**. The formula is the unitary method read sideways: $\\tfrac{P}{100}$ counts the hundreds in the loan, $R$ prices one year on each hundred, $T$ counts the years.',
        },
        {
          kind: 'example',
          title: 'Rs 5,000 is borrowed at 8% per annum simple interest for 3 years. Find the interest and the amount.',
          steps: [
            'Now, one year’s rent on Rs 5,000 at 8%: $\\tfrac{8}{100} \\times 5000 = 400$ — Rs 8 for each of the fifty hundreds in the loan.',
            'So three years charge three such rents — the base never moves: $I = 400 \\times 3 = 1200$, or in one stroke $\\tfrac{5000 \\times 8 \\times 3}{100} = 1200$.',
            'And the amount is principal plus interest: $A = 5000 + 1200 = 6200$.',
            'Hence the interest is Rs 1,200 and Rs 6,200 is returned; the per-year read-back: $\\tfrac{PRT}{100} = \\tfrac{5000 \\times 8 \\times 3}{100}$ reproduces the same product exactly.',
          ],
        },
        {
          kind: 'para',
          text: 'The letter $T$ counts **years**, and the loan’s calendar must meet the formula in its own currency. Eight months is $\\tfrac{8}{12} = \\tfrac{2}{3}$ of a year; two years six months is $2\\tfrac{1}{2}$; a loan from March 5 to October 5 of the same year runs seven months, $\\tfrac{7}{12}$ of a year. The rate carries *per annum* in its very name — it prices a year — so the time must arrive in years before $\\tfrac{PRT}{100}$ is allowed to speak.',
        },
        {
          kind: 'example',
          title: 'What rate per annum yields Rs 900 as simple interest on Rs 6,000 in 2 years?',
          steps: [
            'Now, the law with the unknown left standing: $900 = \\tfrac{6000 \\times R \\times 2}{100} = 120R$.',
            'So the rate is the interest divided by the year-price of the loan: $R = \\tfrac{900}{120} = 7.5$.',
            'Hence the rate is $7.5\\%$ per annum; the check: $\\tfrac{6000 \\times 7.5 \\times 2}{100} = 60 \\times 15 = 900$.',
          ],
        },
        {
          kind: 'para',
          text: 'The same inversion recovers **any** missing letter — the law has four quantities and one equation, so naming three fixes the fourth: a principal from $P = \\tfrac{100 \\, I}{RT}$, a time from $T = \\tfrac{100 \\, I}{PR}$. The exam asks all four directions, and one formula answers them all; the reader who keeps the one-percent-a-year picture — Rs $R$ per Rs 100 per year — never needs to memorise which way the rearrangement runs.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The per-annum trap',
          text: 'A rate quoted **per annum** must meet a time in **years**. Feeding months straight into $T$ — Rs 9,000 at $6\\%$ "for 8" with $T = 8$ — charges eight years of rent, twelve times the truth ($8$ months is $T = \\tfrac{2}{3}$, and the interest is Rs 360, not Rs 4,320). Check the unit of $T$ before the formula runs; it is the most silent mark-loser in this chapter.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why "simple"?',
          text: 'The word is a promise: the interest is computed on the **original principal alone**, year after year — a flat rent, the same Rs 400 each year on the Rs 5,000 loan however long it runs. When instead each year’s interest is **added to the principal** and begins earning rent of its own, the interest compounds — the next books’ story, and a richer one. The door is now open; this chapter closes it gently.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Percentage change',
              def: 'The change in a quantity, expressed as a percent of the ORIGINAL value: r = (N − O)/O × 100. Example: 250 to 300 is a 20% increase; 48,000 to 44,640 is a 7% decrease.',
            },
            {
              term: 'Cost price (CP)',
              def: 'What the trader paid for an article — the base on which profit and loss percents are reckoned. Example: a cycle bought for Rs 2,400 and sold for Rs 2,760 earns a profit of 15% on cost.',
            },
            {
              term: 'Selling price (SP)',
              def: 'What the buyer pays the trader: SP = CP + profit or SP = CP − loss. Example: the cycle’s SP of Rs 2,760 is CP 2,400 raised by its 15%.',
            },
            {
              term: 'Marked price (MP)',
              def: 'The price written on the tag (the list price) — the base on which discounts are reckoned. Example: a lamp costing Rs 600 marked 40% above cost carries a tag of Rs 840.',
            },
            {
              term: 'Discount',
              def: 'The reduction granted on the marked price: discount = M − SP, a percent OF THE TAG. Example: 15% off a Rs 1,600 tag takes off Rs 240 and sells at Rs 1,360.',
            },
            {
              term: 'Principal',
              def: 'The sum lent or borrowed — the base on which interest is reckoned, once per year. Example: Rs 5,000 borrowed at 8% per annum pays Rs 400 rent each year.',
            },
            {
              term: 'Simple interest',
              def: 'Interest computed on the original principal alone: I = PRT/100, with R the rate per annum and T the time in years. Example: Rs 5,000 at 8% for 3 years gathers Rs 1,200.',
            },
            {
              term: 'Amount',
              def: 'What the borrower returns: A = P + I, principal plus interest. Example: the Rs 5,000 loan returns Rs 6,200 after 3 years.',
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The factor law',
          latex: 'N = O \\times \\frac{100 \\pm r}{100}',
          note: 'Every percent change is one multiplication: +25% is ×5/4, −10% is ×9/10. To UNDO a change, divide by its factor — never subtract the percent (a +r% then −r% round trip nets −r²/100 %).',
        },
        {
          kind: 'formula',
          name: 'The ledger law (profit and loss)',
          latex: 'SP = CP \\times \\frac{100 \\pm p}{100}',
          note: 'Profit and loss percents live on the COST price: Rs 10,200 taken at a 15% loss came from a cost of Rs 12,000 (CP = SP × 100/(100 − p)). A profit of 15% multiplies cost by 23/20; a loss of 15% by 17/20.',
        },
        {
          kind: 'formula',
          name: 'The discount law',
          latex: 'SP = M \\times \\frac{100 - d}{100}',
          note: 'The discount percent lives on the MARKED price: 15% off a Rs 1,600 tag sells at Rs 1,360. Markup then discount multiplies the factors: 1.40 × 0.80 = 1.12, a net +12%.',
        },
        {
          kind: 'formula',
          name: 'Simple interest',
          latex: 'I = \\frac{PRT}{100}, \\qquad A = P + I',
          note: 'R% per annum prices one year on Rs 100; P counts the hundreds; T counts the years (months → /12). Any missing letter follows: R = 100I/(PT), and so on.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'This lesson is printed marks across every competitive paper: (i) **two-base discipline** decides the fill-in-the-blanks — a change of 50 on 250 is 20% but on 300 is 16 2/3%; profit percent on cost, discount percent on tag; (ii) the **factor law** prices chains in one line: 1.4 × 0.8 = 1.12 (markup 40%, discount 20%, net +12%), and the round trip (1 + r/100)(1 − r/100) = 1 − r²/10000 always nets a fall of r²/100 % — 25% up and down is −6.25%; (iii) **return tickets** recover originals: Rs 15,000 after +20% came from Rs 12,500 by one division (the unitary method at 120%); (iv) **simple interest** runs all four directions from I = PRT/100 — interest, amount, rate, time — with T strictly in years (8 months = 2/3); (v) the classic traps: subtracting the percent to undo a change (lands short), profit judged on SP (13.04% ≠ 15%), discount judged on SP (it lives on the tag), months fed to T as if years. The NCERT canon sets the syllabus (class 7 §§8.5–8.6: buying and selling, simple interest; class 8 §§8.2–8.4: increase/decrease per cent, discounts, profit and loss), and the SSC/bank/Railway papers drill it yearly (Khattar QA, chs. on percentage and profit & loss) — no past-paper text is reproduced here.',
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'A score rises from 250 to 300. The percentage increase is:',
              options: [
                '20% — the change 50 judged on the original 250',
                '25% — the change 50 judged on a base of 200',
                '50% — the change 50 judged on itself',
                '16 2/3% — the change 50 judged on the new 300',
              ],
              answer: 0,
              explain:
                'The base is where the motion started: 50/250 × 100 = 20% (Option 1). Option 4 is the new-base fraud — 50/300 is "the change on the new value", a different question. Option 3 judges 50 on 100 (itself), and Option 2 divides by a 200 that appears nowhere in the problem.',
            },
            {
              q: 'A price rose 25%. To bring it back to the original, one should:',
              options: [
                'subtract 25% of the new price',
                'divide the new price by 1.25',
                'subtract 1.25 from the new price',
                'multiply the new price by 1.25',
              ],
              answer: 1,
              explain:
                'The rise multiplied by 5/4; only dividing by 5/4 (= 1.25) returns home (Option 2). Option 1 multiplies by 3/4 and lands at 93.75 on a base of 100 — short of home by 6.25%, the r²/100 law. Option 3 subtracts a rupee-and-a-quarter from a percent story, and Option 4 walks further up. (Elegance aside: multiplying by 4/5 — a fall of 20% of the new price — also lands home, since 4/5 × 5/4 = 1; the percent that undoes +25% is 20%, not 25%.)',
            },
            {
              q: 'An article tagged Rs 800 is sold at a discount of 15%. The selling price is:',
              options: ['Rs 720', 'Rs 680', 'Rs 120', 'Rs 785'],
              answer: 1,
              explain:
                'The discount is 15% of the TAG: 800 × 85/100 = 680 (Option 2). Option 1 granted a 10% discount, Option 3 is the discount itself rather than the price that remains, and Option 4 read the 15% as Rs 15 flat.',
            },
            {
              q: 'A cycle bought for Rs 2,400 sells for Rs 2,760. The profit percent is:',
              options: [
                'about 13% — the profit judged on the selling price',
                '12.5% — the profit Rs 300 on the cost',
                '15% — the profit Rs 360 judged on the cost',
                '1.5% — the decimal 0.15 read as a percent',
              ],
              answer: 2,
              explain:
                'Profit 2,760 − 2,400 = 360, judged on the COST: 360/2,400 × 100 = 15% (Option 3). Option 1 is the wrong base — 360/2,760 ≈ 13.04% answers "profit on sales". Option 2 subtracted as if the profit were 300, and Option 4 slipped the decimal dress: 0.15 is 15%, not 1.5% (one hop of the ladder, Lesson 5.4).',
            },
            {
              q: 'Rs 4,000 is lent at 5% per annum simple interest for 2 years. The interest is:',
              options: ['Rs 200', 'Rs 4,400', 'Rs 40', 'Rs 400'],
              answer: 3,
              explain:
                'One year rents Rs 200 (5% of 4,000); two years rent twice that: 4,000 × 5 × 2/100 = Rs 400 (Option 4). Option 1 stopped at one year, Option 2 quoted the AMOUNT (4,000 + 400) instead of the interest, and Option 4’s neighbour Rs 40 is the 1% slip — 4,000 × 1/100.',
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
                  q: 'Find the percentage increase from 40 to 50.',
                  solution: [
                    'Now, the change is $50 - 40 = 10$, and the base is the original, $40$.',
                    'So the change judged on the original: $\\tfrac{10}{40} \\times 100 = 25$.',
                    'Hence the increase is $25\\%$; the check: $40 \\times \\tfrac{5}{4} = 50$.',
                  ],
                  answer: '25%',
                },
                {
                  q: 'Find the percentage decrease from 90 to 72.',
                  solution: [
                    'Now, the change is $90 - 72 = 18$, judged on the original $90$.',
                    'So $\\tfrac{18}{90} \\times 100 = 20$ — one fifth of the original lost.',
                    'Hence the decrease is $20\\%$; the check: $90 \\times \\tfrac{4}{5} = 72$.',
                  ],
                  answer: '20%',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A trader buys a chair for Rs 850 and sells it for Rs 952. Find the profit percent.',
                  solution: [
                    'Now, the profit is $952 - 850 = 102$, and the base is the cost, $850$.',
                    'So the profit judged on cost: $\\tfrac{102}{850} \\times 100 = 12$ — the HCF of $102$ and $850$ is $34$.',
                    'Hence the profit is $12\\%$; the forward check: $850 \\times \\tfrac{28}{25} = 34 \\times 28 = 952$.',
                  ],
                  answer: '12%',
                },
                {
                  q: 'A coat tagged Rs 2,400 is sold at a discount of 25%. Find the discount and the selling price.',
                  solution: [
                    'Now, the discount is $25\\%$ of the tag: $\\tfrac{25}{100} \\times 2400 = 600$.',
                    'So the selling price is $2400 - 600 = 1800$ — in one factor, $2400 \\times \\tfrac{3}{4} = 1800$.',
                    'Hence the discount is Rs 600 and the coat sells for Rs 1,800; the read-back $\\tfrac{600}{2400} \\times 100 = 25$ confirms the tag as the base.',
                  ],
                  answer: 'Discount Rs 600; SP Rs 1,800',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'After a 10% decrease a town’s population is 43,200. What was it before?',
                  solution: [
                    'Now, a $10\\%$ fall leaves $90\\%$ standing: $O \\times \\tfrac{9}{10} = 43200$.',
                    'So the return ticket multiplies by $\\tfrac{10}{9}$: $O = 43200 \\times \\tfrac{10}{9} = 4800 \\times 10 = 48000$.',
                    'Hence the town numbered 48,000 before; the check: $48000 \\times \\tfrac{9}{10} = 43200$.',
                  ],
                  answer: '48,000',
                },
                {
                  q: 'Rs 7,200 is lent at 4% per annum simple interest for 3 years. Find the interest and the amount.',
                  solution: [
                    'Now, one year’s rent: $\\tfrac{4}{100} \\times 7200 = 288$ — Rs 4 on each of 72 hundreds.',
                    'So three years charge three rents: $I = 288 \\times 3 = 864$, or $\\tfrac{7200 \\times 4 \\times 3}{100} = 864$.',
                    'And the amount: $A = 7200 + 864 = 8064$.',
                    'Hence the interest is Rs 864 and Rs 8,064 is returned.',
                  ],
                  answer: 'Interest Rs 864; amount Rs 8,064',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A fridge sold for Rs 10,200 brought the dealer a loss of 15%. Find the cost price.',
                  solution: [
                    'Now, a $15\\%$ loss sells at $85\\%$ of cost: $CP \\times \\tfrac{17}{20} = 10200$.',
                    'So the return ticket divides: $CP = 10200 \\times \\tfrac{20}{17} = 600 \\times 20 = 12000$.',
                    'Hence the cost was Rs 12,000; the check: the loss $12000 - 10200 = 1800$ is $\\tfrac{1800}{12000} \\times 100 = 15\\%$ of the cost.',
                  ],
                  answer: 'Rs 12,000',
                },
                {
                  q: 'A trader buys a lamp for Rs 800, marks it 35% above cost, then allows a 20% discount. Find the selling price and the profit percent.',
                  solution: [
                    'Now, the markup: $MP = 800 \\times \\tfrac{135}{100} = 800 \\times \\tfrac{27}{20} = 1080$.',
                    'So the discount rides the tag, not the cost: $SP = 1080 \\times \\tfrac{80}{100} = 1080 \\times \\tfrac{4}{5} = 864$.',
                    'And the profit: $864 - 800 = 64$, judged on cost — $\\tfrac{64}{800} \\times 100 = 8\\%$.',
                    'Hence the lamp sells for Rs 864 and the trader still banks $8\\%$; the factors confess it in one line: $\\tfrac{27}{20} \\times \\tfrac{4}{5} = \\tfrac{27}{25} = 1.08$ — a net $+8\\%$, not $35 - 20$.',
                  ],
                  answer: 'SP Rs 864; profit 8%',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Rs 9,000 is lent at 6% per annum simple interest for 8 months. Find the interest.',
                  solution: [
                    'Now, the rate speaks per annum, so the time must arrive in years: $T = \\tfrac{8}{12} = \\tfrac{2}{3}$.',
                    'So $I = \\tfrac{PRT}{100} = \\tfrac{9000 \\times 6 \\times 2/3}{100}$ — one year’s rent is $\\tfrac{6}{100} \\times 9000 = 540$, and two-thirds of it: $\\tfrac{2}{3} \\times 540 = 360$.',
                    'Hence the interest is Rs 360; feeding $T = 8$ would have charged eight years — Rs 4,320, twelve times the truth. The unit of $T$ is the silent trap.',
                  ],
                  answer: 'Rs 360',
                },
                {
                  q: 'One price rises 20% and then falls 20%. A second price falls 20% and then rises 20%. Show that both land in the same place, and name the net change.',
                  solution: [
                    'Now, take any start $O$ — say Rs 500 — and walk the first order: $500 \\times \\tfrac{6}{5} = 600$, then $600 \\times \\tfrac{4}{5} = 480$.',
                    'So the second order: $500 \\times \\tfrac{4}{5} = 400$, then $400 \\times \\tfrac{6}{5} = 480$ — the same landing.',
                    'And the reason sits in chapter 2: multiplication commutes, so $\\tfrac{6}{5} \\times \\tfrac{4}{5} = \\tfrac{4}{5} \\times \\tfrac{6}{5}$ — the factors cannot disagree about the product, whatever order they meet in.',
                    'Hence both prices land at $\\tfrac{24}{25}O$: a net fall of $\\tfrac{1}{25} = 4\\%$ — the $r^2/100$ law with $r = 20$ — whichever way the round trip ran.',
                  ],
                  answer: 'Both land at 96% of the start; net −4%',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove: a rise of r% followed by a fall of r% leaves the quantity at (10000 − r²)/10000 of itself — a net decrease of r²/100 %. Hence find the net change when r = 25, and state the operation that truly undoes a 25% rise.',
                  solution: [
                    'Now, the rise multiplies by $1 + \\tfrac{r}{100}$ and the fall by $1 - \\tfrac{r}{100}$ — each judged on the value it starts from, so the pair multiplies:',
                    'So $\\left(1 + \\tfrac{r}{100}\\right)\\left(1 - \\tfrac{r}{100}\\right) = 1 - \\tfrac{r^2}{10000}$ by chapter 2’s identity $(a + b)(a - b) = a^2 - b^2$ with $a = 1$, $b = \\tfrac{r}{100}$.',
                    'And the net: the quantity stands at $\\tfrac{10000 - r^2}{10000}$ of itself — short of the whole by $\\tfrac{r^2}{10000}$, which as a percent is $\\tfrac{r^2}{100}\\%$.',
                    'Hence for $r = 25$: a net fall of $\\tfrac{625}{100} = 6.25\\%$ — exactly the round trip of Illustration 2 — and the true undo of a $25\\%$ rise is a **division by $\\tfrac{5}{4}$**, equivalently a fall of $20\\%$ of the new value, never a fall of $25\\%$.',
                  ],
                  answer: 'Net fall r²/100 %; for r = 25, −6.25%; undo = divide by 5/4',
                },
                {
                  q: 'Rs 12,000 is lent at 6.25% per annum for 2 1/2 years. Find the interest in one line using Lesson 5.4’s halving chain, then verify with PRT/100.',
                  solution: [
                    'Now, the halving chain dresses the rate: $6.25\\% = \\tfrac{1}{16}$ — the fourth rung of 100, 50, 25, 12.5, 6.25 (the fives never block a halving).',
                    'So one year’s rent is $\\tfrac{1}{16}$ of the principal: $12000 \\div 16 = 750$; and $2\\tfrac{1}{2}$ years charge $2\\tfrac{1}{2}$ rents: $750 \\times 2.5 = 1875$.',
                    'And the verification rides the formula: $\\tfrac{12000 \\times 6.25 \\times 2.5}{100} = 120 \\times 6.25 \\times 2.5 = 750 \\times 2.5 = 1875$ — the same product, as it must be.',
                    'Hence the interest is Rs 1,875 (amount Rs 13,875): the chain read the rate’s dress, the formula confirmed the bill.',
                  ],
                  answer: 'Rs 1,875',
                },
              ],
            },
          ],
        },
        {
          kind: 'para',
          text: 'And with that the chapter’s promise is paid in full. The point of Lesson 5.1 gave hundredths a home; the bridge of 5.2 dressed every fraction in decimal cloth or taught its waltz; the machines of 5.3 added, multiplied and divided with the point in play; the standardised denominator of 5.4 gave every fraction a percent dress; and this lesson put the dress to work where the world wears it — on prices that rise and fall, on tags and their discounts, on the trader’s cost and the lender’s year. One question ran through all of it — ***of what?*** — and one machine did all of it: a percent is a fraction of a named base, and every fraction in this book knows how to be one. Chapter 6 will find the same unitary method growing up into ratio and proportion; the percent it leaves behind is no longer a topic but a habit.',
        },
      ],
    },
  ],
  plannedLessons: [],
}
