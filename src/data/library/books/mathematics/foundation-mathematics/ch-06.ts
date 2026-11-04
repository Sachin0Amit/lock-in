import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 6: Ratio, Rate and Proportion
 *
 * LESSONS WRITTEN: 6.1 Ratio as a Comparison (run 26, 2026-11-04) — the
 * chapter opens with the division lens: comparing by "how many times?"
 * rather than "how much more?" (the two lenses are independent — same
 * difference can hide different ratios, same ratio can sit on different
 * differences); the Definition callout in the formal shape (a : b = a/b for
 * same-kind, same-unit quantities — a pure number) as equation tag 1, with
 * the Leibniz colon and Euclid–Eudoxus provenance in the note; the two-faces
 * Note (a : b is the part–part face, a/b the part–whole face; a ratio alone
 * never recovers the whole); the same-units law (convert first — Rs 5 : 50
 * paise = 10 : 1, not 1 : 10) with the Illustration on 5 m : 80 cm; simplest
 * form by the HCF machinery of ch. 3 (24 : 36 = 2 : 3; 91 : 104 = 7 : 8 by
 * Euclid) with uniqueness carried over from 4.2's lowest-terms theorem;
 * decimals and fractions as terms (0.75 : 1.25 = 3 : 5; 2/3 : 5/6 = 4 : 5);
 * equivalent ratios as ch. 4's equivalence family in ratio dress (equation
 * tag 2, a : b = ka : kb, cross-test licence from 4.3), the dots figure of
 * one ratio at three scales, and the recognition table (totals of Rs 630 in
 * 1:1, 1:2, 2:3, 3:4, 4:5); three-term (continued) ratios with the
 * joint-HCF criterion and the 6 : 10 : 15 Caution (simplest though every
 * pair reduces) and the pair-chain engine (A:B = 2:3, B:C = 6:7 → 4:6:7);
 * sharing a quantity in a given ratio as the unitary method's next dress —
 * the one-part engine, the sharing-map figure (Rs 1,200 in 3 : 5), the
 * share formula proved as a derivation block (share = parts/total parts ×
 * T; the shares always rebuild the whole), Illustrations on the two-way and
 * three-way shares and on recovering numbers from a ratio plus a
 * difference, and the inverse read (one share recovers the whole);
 * properties list, exam corner (NCERT class-6 ch. 12 + class-7 §§8.1–8.2
 * canon; Khattar ratio staples), 5-quiz (keys 2/1/3/2/0) and 12 exercises
 * L1–L6 (L6: the 6 : 10 : 15 justification and the A:B:C chain with Rs 1,020
 * → 240/360/420). Authored natively in the Cengage voice + solution chain;
 * every number pre-verified by scripts/verify-unit-6.ts (93 checks, A–K).
 * NEXT in this chapter: 6.2 Rates and Unit Rates.
 */

export const chapter06: Chapter = {
  number: 6,
  slug: 'ratio-rate-proportion',
  title: 'Ratio, Rate and Proportion',
  summary:
    'Comparing quantities by division rather than difference: ratios in simplest form, unit rates, the cross-multiplication test for proportion, direct and inverse variation, and scaling in maps, recipes and models.',
  status: 'in-progress',
  lessons: [
    {
      id: 'fm-ratio-as-a-comparison',
      number: '6.1',
      title: 'Ratio as a Comparison',
      concepts: [
        'Ratio',
        'Comparison by division',
        'Simplest form',
        'Equivalent ratios',
        'Continued ratio',
        'Sharing in a ratio',
        'Same units first',
        'The one-part engine',
      ],
      objectives: [
        'Write and interpret ratios as part–part comparisons, and distinguish the ratio $a : b$ from the fraction $a/b$',
        'Reduce any ratio — whole numbers, decimals or fractions — to its unique simplest form with the HCF, converting units first when they disagree',
        'Generate and test equivalent ratios with the cross-test, and chain two pair-ratios into one continued ratio',
        'Share a quantity in a given ratio with the one-part engine, and recover totals or individual shares from partial information',
      ],
      prerequisites: [
        'fm-highest-common-factor',
        'fm-equivalent-fractions-simplification',
        'fm-operating-on-decimals',
      ],
      sources: ['ncert-math6-ch12', 'ncert-math7-ch8', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 5 closed with the percent — the fraction wearing one fixed denominator — and percents, discounts and interest all answered a comparison question: how large is this change **against its base**? That question deserves a chapter of its own, because the comparison it performs is older and more general than any of its dresses. Whenever two quantities meet — two prices, two masses, three purses, the sides of a field — mathematics offers two different ways to compare them, and choosing the right way is often the whole problem.',
        },
        {
          kind: 'para',
          text: 'This lesson is the charter of the second way. It defines the ratio, gives it a canonical name, teaches it to carry three terms at once, and then puts it to work on the task it was born for: **sharing a quantity fairly by agreement**. Everything the book has built — the HCF machinery of chapter 3, the equivalence family of chapter 4, the unitary method of Lesson 5.3 — returns here in one more dress.',
        },
        { kind: 'heading', text: 'Two ways to compare' },
        {
          kind: 'para',
          text: 'Take two numbers, say $15$ and $5$. Subtraction asks **how much more**: $15 - 5 = 10$. Division asks **how many times**: $15 \\div 5 = 3$. Both are legitimate comparisons, and both carry information the other cannot. A class with 24 girls and 16 boys and a class with 48 girls and 40 boys have the **same difference** — 8 in both — but very different mixes: the first runs $24 : 16 = 3 : 2$, the second $48 : 40 = 6 : 5$. Conversely, teams of 100 and 50 and teams of 200 and 100 have **different differences** but the **same ratio** $2 : 1$. The two lenses are independent instruments, not two names for one fact.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The two lenses',
          text: 'The difference ($a - b$) answers *how much more*; the ratio ($a : b$) answers *how many times*. They can move independently: equal differences may hide unequal ratios, and equal ratios may sit on unequal differences. Ratios are blind to the size of the whole and loyal to its **shape** — and shape is what sharing, mixing and scaling all care about.',
        },
        { kind: 'heading', text: 'The ratio: definition and notation' },
        {
          kind: 'para',
          text: 'The ratio is the division lens given a name and a notation. It deserves the full formality.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Ratio',
          text: 'Two quantities $a$ and $b$ of the same kind, measured in the **same unit**, are said to be **in the ratio** $a : b$ — read "a is to b" — when the first is $\\tfrac{a}{b}$ times the second. The two numbers $a$ and $b$ are the **terms** of the ratio; $a$ is the first term and $b$ the second. The ratio itself is a **pure number**: the common unit, having agreed, cancels away. Thus, $a : b = \\tfrac{a}{b}$, with $b \\neq 0$.',
        },
        {
          kind: 'equation',
          latex: 'a : b \\;=\\; \\tfrac{a}{b} \\qquad (b \\neq 0)',
          note: 'The colon of $a : b$ settled into print in the seventeenth century — Leibniz used it for both ratio and division. The idea is far older: Euclid\'s *Elements* (Book V, after Eudoxus) made "same ratio" the heart of a rigorous theory twenty centuries before the cross-test gave it an algebraic dress.',
        },
        {
          kind: 'para',
          text: 'The order of the terms is part of the statement. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$15 : 5 = 3 : 1$ — fifteen is **three times** five; the ratio falls to a whole number when the division is exact.',
            '$50 : 50 = 1 : 1$ — the ratio says "equal" where the difference says zero; equality is the ratio $1 : 1$.',
            '$110 : 105 = 22 : 21$ — the difference $5$ is small, but the ratio barely clears $1$; both lenses agree the numbers are close, for once.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The two faces of a ÷ b',
          text: 'The same division serves two masters, and the reader must know which is speaking. In a class of $40$ with $24$ girls and $16$ boys, the **ratio** $24 : 16 = 3 : 2$ compares **part with part** — three girls for every two boys. The **fraction** $\\tfrac{24}{40} = \\tfrac{3}{5}$ names a **part of the whole** — three-fifths of the class is girls. Both live in the same numbers. The trap: a ratio alone never recovers the whole — $3 : 2$ fits the class of $40$ just as well as a gathering of $200$ walking $120 : 80$. The ratio fixes the recipe; the whole decides the batch.',
        },
        { kind: 'heading', text: 'Same kind, same units' },
        {
          kind: 'para',
          text: 'The definition carries fine print that does real work: *same kind*, *same unit*. A ratio of a length to a mass is not a smaller number — it is a category error, like asking how many times a colour fits into a Tuesday. And even quantities of the same kind must first wear one unit, because the ratio reads the numerals only after the units have agreed to cancel.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Convert before you compare',
          text: 'Rs $5$ to $50$ paise is **not** $1 : 10$. Bring both to one unit first — $500$ paise to $50$ paise — and the honest ratio appears: $10 : 1$. The numerals $5$ and $50$ belong to different units; comparing them raw is answering a question no one asked. The same discipline holds for metres with centimetres, kilograms with grams, days with hours.',
        },
        {
          kind: 'example',
          title: 'Find the ratio of $5$ m to $80$ cm.',
          steps: [
            'Now, the units must agree before any ratio is spoken: $5$ m $= 500$ cm.',
            'So the ratio is $500 : 80$, and the HCF of $500$ and $80$ is $20$.',
            'Hence $500 : 80 = 25 : 4$ — a pure pair of numbers, no units attached.',
          ],
        },
        {
          kind: 'para',
          text: 'Once converted, the unit divides out and the ratio forgets it was ever about centimetres: $500$ cm : $80$ cm $= 500 : 80$. This unit-freedom is exactly what will let a ratio compare a map to a territory in Lesson 6.5 — and it is why the ratio, unlike the difference, survives every change of scale.',
        },
        { kind: 'heading', text: 'The simplest form' },
        {
          kind: 'para',
          text: 'Many pairs of numerals name one comparison: $24 : 36$, $12 : 18$, $8 : 12$, $2 : 3$ all say "two for every three". A canonical name is needed, and chapter 3 already built the machinery that finds it.',
        },
        {
          kind: 'para',
          text: 'The **simplest form** of a ratio $a : b$ is obtained by dividing both terms by their **highest common factor**. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$24 : 36$: the HCF is $12$, so the simplest form is $2 : 3$.',
            '$150 : 60$: the HCF is $30$, so the simplest form is $5 : 2$.',
            '$91 : 104$: the HCF is $13$, so the simplest form is $7 : 8$.',
          ],
        },
        {
          kind: 'formula',
          name: 'The ratio',
          latex: 'a : b = \\tfrac{a}{b} \\qquad (\\text{same kind, same unit},\\ b \\neq 0)',
          note: 'The part–part face of division: the first term is $a/b$ times the second. Order matters, and the common unit cancels — a ratio is a pure number.',
        },
        {
          kind: 'formula',
          name: 'Simplest form of a ratio',
          latex: 'a : b \\;=\\; \\tfrac{a}{\\mathrm{HCF}(a, b)} : \\tfrac{b}{\\mathrm{HCF}(a, b)}',
          note: 'Divide both terms by their HCF. The result carries HCF 1 — no number above $1$ divides both terms — and it is unique, being the lowest-terms name of Lesson 4.2 in ratio dress.',
        },
        {
          kind: 'example',
          title: 'Write $24 : 36$ in its simplest form.',
          steps: [
            'Now, the HCF of $24$ and $36$: since $36 = 1 \\times 24 + 12$ and $24 = 2 \\times 12$, the HCF is $12$.',
            'So divide both terms by $12$: $24 \\div 12 = 2$ and $36 \\div 12 = 3$.',
            'Hence $24 : 36 = 2 : 3$; the read-back multiplies back exactly, $2 \\times 12 = 24$ and $3 \\times 12 = 36$.',
          ],
        },
        {
          kind: 'example',
          title: 'Reduce $91 : 104$ to its simplest form.',
          steps: [
            'Now, Euclid\'s runs from chapter 3: $104 = 1 \\times 91 + 13$, then $91 = 7 \\times 13 + 0$ — so the HCF is $13$.',
            'So $91 \\div 13 = 7$ and $104 \\div 13 = 8$.',
            'Hence $91 : 104 = 7 : 8$ — no smaller pair of whole numbers tells this story.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The simplest form is unique',
          text: 'Chapter 4 proved that a fraction has exactly one lowest-terms name. A ratio is that fraction wearing the part–part face, so its simplest form is unique too: two "simplest" names of one ratio would give two lowest-terms names of one fraction, and Lesson 4.2 forbids the crowd. Simplest form is not a convention among several — it is **the** name.',
        },
        {
          kind: 'para',
          text: 'Decimals and fractions as terms are welcomed after a clearing step. Multiply both terms by the common power of ten to clear decimals, or by the LCM of the denominators to clear fractions; then take the HCF. For example, $0.75 : 1.25$ becomes $75 : 125$, and $\\tfrac{2}{3} : \\tfrac{5}{6}$ becomes $4 : 5$ after multiplying by $6$.',
        },
        {
          kind: 'example',
          title: 'Express $0.75 : 1.25$ in its simplest form.',
          steps: [
            'Now, clear the decimals by multiplying both terms by $100$: the ratio becomes $75 : 125$.',
            'So the HCF of $75$ and $125$ is $25$, and dividing gives $3 : 5$.',
            'Hence $0.75 : 1.25 = 3 : 5$ — the decimals were guests, not residents.',
          ],
        },
        { kind: 'heading', text: 'Equivalent ratios' },
        {
          kind: 'para',
          text: 'The equivalence family of Lesson 4.2 returns in ratio dress. Multiplying **both terms** of a ratio by the same non-zero number changes the numerals but not the comparison, because the common factor cancels in $\\tfrac{ka}{kb}$. One ratio therefore owns a whole family of names — and every member deserves the title.',
        },
        {
          kind: 'equation',
          latex: 'a : b \\;=\\; k\\,a : k\\,b \\qquad (k \\neq 0)',
          note: 'The multiplying rule of Lesson 4.2 in ratio dress. The cross-products agree identically: $a \\cdot kb = b \\cdot ka$. Conversely — the cross-test of Lesson 4.3 — $a : b = c : d$ **iff** $ad = bc$, which turns "are these the same ratio?" into one multiplication on each side.',
        },
        {
          kind: 'formula',
          name: 'Equivalent ratios',
          latex: 'a : b = ka : kb \\ (k \\neq 0) \\qquad a : b = c : d \\iff ad = bc',
          note: 'Multiply or divide both terms by the same non-zero $k$; test any claimed equality with one multiplication on each side (the cross-test of Lesson 4.3).',
        },
        {
          kind: 'para',
          text: 'Two exam uses follow at once. **Filling blanks**: to find the missing term in $3 : 5 = \\square : 20$, notice the second term was multiplied by $4$, so the first must be $3 \\times 4 = 12$. **Testing equality**: $15 : 25$ and $21 : 35$ pass the cross-test — $15 \\times 35 = 525 = 25 \\times 21$ — and indeed both reduce to $3 : 5$; while $4 : 7$ and $5 : 9$ fail, since $4 \\times 9 = 36 \\neq 35 = 7 \\times 5$.',
        },
        {
          kind: 'figure',
          caption:
            'One ratio, many sizes. Each row shows a team of 3 and a team of 5 — then the same story with every count multiplied by 2 and by 3. The dots double and triple, but the shape never wavers: 3 : 5 = 6 : 10 = 9 : 15. Scaling every term by the same k rebuilds the same ratio at a new size; that is what "equivalent" means.',
          svg: `<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three rows of dots showing the ratio three to five scaled by one, two and three: teams of three and five, six and ten, nine and fifteen dots all carry the same ratio">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="156" y="30">the first term ×k</text>
    <text x="508" y="30">the second term ×k</text>
  </g>
  <line x1="296" y1="45" x2="296" y2="250" stroke="currentColor" stroke-width="1" stroke-dasharray="5 5" opacity="0.55"/>
  <g fill="currentColor">
    <circle cx="60" cy="70" r="7"/><circle cx="84" cy="70" r="7"/><circle cx="108" cy="70" r="7"/>
    <circle cx="340" cy="70" r="7"/><circle cx="364" cy="70" r="7"/><circle cx="388" cy="70" r="7"/><circle cx="412" cy="70" r="7"/><circle cx="436" cy="70" r="7"/>
    <circle cx="60" cy="150" r="7"/><circle cx="84" cy="150" r="7"/><circle cx="108" cy="150" r="7"/><circle cx="132" cy="150" r="7"/><circle cx="156" cy="150" r="7"/><circle cx="180" cy="150" r="7"/>
    <circle cx="340" cy="150" r="7"/><circle cx="364" cy="150" r="7"/><circle cx="388" cy="150" r="7"/><circle cx="412" cy="150" r="7"/><circle cx="436" cy="150" r="7"/><circle cx="460" cy="150" r="7"/><circle cx="484" cy="150" r="7"/><circle cx="508" cy="150" r="7"/><circle cx="532" cy="150" r="7"/><circle cx="556" cy="150" r="7"/>
    <circle cx="60" cy="230" r="7"/><circle cx="84" cy="230" r="7"/><circle cx="108" cy="230" r="7"/><circle cx="132" cy="230" r="7"/><circle cx="156" cy="230" r="7"/><circle cx="180" cy="230" r="7"/><circle cx="204" cy="230" r="7"/><circle cx="228" cy="230" r="7"/><circle cx="252" cy="230" r="7"/>
    <circle cx="340" cy="230" r="7"/><circle cx="364" cy="230" r="7"/><circle cx="388" cy="230" r="7"/><circle cx="412" cy="230" r="7"/><circle cx="436" cy="230" r="7"/><circle cx="460" cy="230" r="7"/><circle cx="484" cy="230" r="7"/><circle cx="508" cy="230" r="7"/><circle cx="532" cy="230" r="7"/><circle cx="556" cy="230" r="7"/><circle cx="580" cy="230" r="7"/><circle cx="604" cy="230" r="7"/><circle cx="628" cy="230" r="7"/><circle cx="652" cy="230" r="7"/><circle cx="676" cy="230" r="7"/>
  </g>
  <g font-size="13" fill="currentColor">
    <text x="696" y="74">3 : 5</text>
    <text x="696" y="154">6 : 10</text>
    <text x="696" y="234">9 : 15</text>
  </g>
  <g font-size="12" fill="currentColor">
    <text x="36" y="74">×1</text>
    <text x="36" y="154">×2</text>
    <text x="36" y="234">×3</text>
  </g>
  <text x="380" y="320" font-size="13" fill="currentColor" text-anchor="middle">three scales, one ratio — 3 : 5 = 6 : 10 = 9 : 15 (cross-test: 3 × 15 = 45 = 5 × 9)</text>
</svg>`,
        },
        {
          kind: 'table',
          head: ['Ratio', 'Parts in all', 'One part of Rs 630', 'The two shares'],
          rows: [
            ['$1 : 1$', '$2$', 'Rs $315$', 'Rs $315$ + Rs $315$'],
            ['$1 : 2$', '$3$', 'Rs $210$', 'Rs $210$ + Rs $420$'],
            ['$2 : 3$', '$5$', 'Rs $126$', 'Rs $252$ + Rs $378$'],
            ['$3 : 4$', '$7$', 'Rs $90$', 'Rs $270$ + Rs $360$'],
            ['$4 : 5$', '$9$', 'Rs $70$', 'Rs $280$ + Rs $350$'],
          ],
        },
        {
          kind: 'para',
          text: 'The table is a benchmark ladder for ratios, the way Lesson 5.4 kept a benchmark ladder for percents. Each row splits the same Rs 630 — chosen divisible by every parts-count — and the shares read straight off the one-part engine of the coming section. A reader who can reproduce this table mentally holds most of the exam hall\'s ratio questions before they are asked.',
        },
        { kind: 'heading', text: 'Ratios with three terms' },
        {
          kind: 'para',
          text: 'Three quantities compare among themselves in one breath: $a : b : c$ is a **continued ratio**, read "a is to b is to c". It is not two ratios glued together but one statement with a shared recipe — the punch mixed from $3$ measures of mango to $4$ of orange to $6$ of pineapple keeps that proportion in every jug, small or vast. The simplest form now demands the HCF of **all the terms at once**: divide every term by $\\mathrm{HCF}(a, b, c)$. For example, $45 : 60 : 90$ carries the common stock $15$, and $120 : 150 : 210$ the common stock $30$.',
        },
        {
          kind: 'example',
          title: 'Write $45 : 60 : 90$ in its simplest form.',
          steps: [
            'Now, three terms ask for the HCF of all three at once: $45 = 3^2 \\times 5$, $60 = 2^2 \\times 3 \\times 5$, $90 = 2 \\times 3^2 \\times 5$.',
            'So the stock common to all three is $3 \\times 5 = 15$, and dividing every term by $15$ gives $3 : 4 : 6$.',
            'Hence $45 : 60 : 90 = 3 : 4 : 6$; the read-back: $3 \\times 15 = 45$, $4 \\times 15 = 60$, $6 \\times 15 = 90$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Joint simplicity, not pairwise',
          text: 'The three-term ratio $6 : 10 : 15$ **is** in its simplest form — no number above $1$ divides all of $6$, $10$ and $15$ — yet every pair inside it reduces: $6 : 10 = 3 : 5$, $10 : 15 = 2 : 3$, $6 : 15 = 2 : 5$. Simplest form for three terms means **joint** simplicity. The full justification is Exercise L6; the moral is that "reduce each pair" is not a method here — the shared HCF of all terms is the only judge.',
        },
        {
          kind: 'para',
          text: 'Pair-ratios chain into a continued ratio when they share a term. If $A : B = 2 : 3$ and $B : C = 6 : 7$, the letter $B$ appears once as $3$ and once as $6$; rename so $B$ wears one number — the LCM $6$. The first ratio scales by $2$ to $A : B = 4 : 6$; the second already shows $B : C = 6 : 7$. Splice: $A : B : C = 4 : 6 : 7$. This splice is the engine of partnership and mixture problems throughout the exam hall.',
        },
        { kind: 'heading', text: 'Sharing a quantity in a given ratio' },
        {
          kind: 'para',
          text: 'Here is the task the ratio was born for. Rs 1,200 is to be divided between Arjun and Bala **in the ratio $3 : 5$**. The phrase does not mean Arjun gets Rs 3 and Bala Rs 5 — it fixes the **shape** of the division: for every $3$ parts that arrive at Arjun, $5$ equal parts arrive at Bala. The money is to be cut into $3 + 5 = 8$ equal parts — **equal** is the whole trick — and dealt out, three to one, five to the other.',
        },
        {
          kind: 'para',
          text: 'The engine that runs this is the **one-part engine**, the unitary method of Lesson 5.3 in its next dress. One part is worth $1200 \\div 8 = 150$; Arjun receives $3 \\times 150 = 450$ and Bala $5 \\times 150 = 750$. Two checks close every sharing problem: the shares must **rebuild the whole** ($450 + 750 = 1200$), and the shares must **carry the ratio** ($450 : 750 = 3 : 5$).',
        },
        {
          kind: 'figure',
          caption:
            'The sharing map. Rs 1,200 cut into 3 + 5 = 8 equal parts of Rs 150 each: three parts (Rs 450) travel to Arjun, five parts (Rs 750) to Bala. The bar\'s shading shows the ratio 3 : 5 as lengths; the caption numbers show it as rupees. The two checks sit in the picture — the parts fill the bar exactly, and the shaded lengths are in ratio 3 : 5.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of twelve hundred rupees cut into eight equal parts of one hundred fifty; three parts worth four hundred fifty go to Arjun and five parts worth seven hundred fifty go to Bala">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="180" y="84">A — 3 parts = Rs 450</text>
    <text x="500" y="84">B — 5 parts = Rs 750</text>
  </g>
  <path d="M 60 98 L 60 92 L 300 92 L 300 98" stroke="currentColor" stroke-width="1.2" fill="none"/>
  <path d="M 300 98 L 300 92 L 700 92 L 700 98" stroke="currentColor" stroke-width="1.2" fill="none"/>
  <rect x="60" y="110" width="240" height="60" fill="currentColor" opacity="0.16"/>
  <rect x="300" y="110" width="400" height="60" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <g stroke="currentColor" stroke-width="1" opacity="0.6">
    <line x1="140" y1="110" x2="140" y2="170"/>
    <line x1="220" y1="110" x2="220" y2="170"/>
    <line x1="300" y1="110" x2="300" y2="170"/>
    <line x1="380" y1="110" x2="380" y2="170"/>
    <line x1="460" y1="110" x2="460" y2="170"/>
    <line x1="540" y1="110" x2="540" y2="170"/>
    <line x1="620" y1="110" x2="620" y2="170"/>
  </g>
  <rect x="60" y="110" width="640" height="60" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="180" y="145">3 parts</text>
    <text x="500" y="145">5 parts</text>
  </g>
  <text x="380" y="208" font-size="13" fill="currentColor" text-anchor="middle">one part = Rs 1,200 ÷ 8 = Rs 150 — every cell of the bar is worth the same</text>
  <text x="380" y="240" font-size="13" fill="currentColor" text-anchor="middle">the checks: Rs 450 + Rs 750 = Rs 1,200 (the whole returns) and 450 : 750 = 3 : 5 (the ratio holds)</text>
  <text x="380" y="275" font-size="13" fill="currentColor" text-anchor="middle">share = parts × one part — the ratio fixes the recipe, the whole decides the batch</text>
</svg>`,
        },
        {
          kind: 'derivation',
          title: 'The share formula, and why the shares always rebuild the whole',
          statement:
            'Claim: a quantity $T$ shared in the ratio $a : b$ gives shares $\\tfrac{a}{a+b}\\,T$ and $\\tfrac{b}{a+b}\\,T$ — and these two always sum to exactly $T$.',
          steps: [
            {
              label: 'The parts',
              formula: 'a + b \\text{ equal parts make the whole}',
              explanation:
                'The ratio $a : b$ reads "a parts for every b parts", so one full batch of the recipe consumes $a + b$ equal parts, and the whole $T$ is exactly such a batch.',
            },
            {
              label: 'One part',
              formula: '\\text{one part} = \\tfrac{T}{a + b}',
              explanation:
                'The unitary method of Lesson 5.3: divide the whole by the number of parts. This one number runs every sharing problem.',
            },
            {
              label: 'The shares',
              formula: '\\text{share of the first} = a \\cdot \\tfrac{T}{a+b} = \\tfrac{a}{a+b}\\,T, \\qquad \\text{share of the second} = \\tfrac{b}{a+b}\\,T',
              explanation:
                'Each head receives its parts times the one-part value. In fraction dress, the first share is the fraction $\\tfrac{a}{a+b}$ of the whole — the ratio fixed the denominators without knowing the whole.',
            },
            {
              label: 'The rebuild check',
              formula: '\\tfrac{a}{a+b}\\,T + \\tfrac{b}{a+b}\\,T = \\tfrac{a+b}{a+b}\\,T = T',
              explanation:
                'The shares sum to the whole identically — no rounding, no leakage. Sharing in a ratio is exact by construction; any answer that fails the rebuild check has been computed wrongly, not approximately.',
            },
          ],
          result: 'share $= \\tfrac{\\text{parts}}{\\text{total parts}} \\times T$ — sharing in a ratio is the part–whole fraction in action.',
        },
        {
          kind: 'formula',
          name: 'Sharing in a ratio',
          latex: '\\text{one part} = \\tfrac{T}{a + b + \\cdots}, \\qquad \\text{share} = \\text{parts} \\times \\text{one part}',
          note: 'Sum the ratio\'s terms to count the parts, divide the whole into one-part values, multiply out. The checks: shares sum to $T$; the shares\' own ratio reduces to the given one.',
        },
        {
          kind: 'example',
          title: 'Divide Rs 1,200 between Arjun and Bala in the ratio $3 : 5$.',
          steps: [
            'Now, the ratio names $3 + 5 = 8$ equal parts of the whole.',
            'So one part is $1200 \\div 8 = 150$.',
            'Take: Arjun receives $3 \\times 150 = 450$ and Bala receives $5 \\times 150 = 750$.',
            'Hence the shares are Rs 450 and Rs 750; the check: $450 + 750 = 1200$ and $450 : 750 = 3 : 5$.',
          ],
        },
        {
          kind: 'example',
          title: 'Divide Rs 18,000 among Priya, Qadir and Ravi in the ratio $2 : 3 : 4$.',
          steps: [
            'Now, the three terms name $2 + 3 + 4 = 9$ parts, so one part is $18000 \\div 9 = 2000$.',
            'So Priya receives $2 \\times 2000 = 4000$, Qadir $3 \\times 2000 = 6000$, and Ravi $4 \\times 2000 = 8000$.',
            'Hence the shares are Rs 4,000, Rs 6,000 and Rs 8,000; the check: $4000 + 6000 + 8000 = 18000$, and the shares reduce in the ratio $2 : 3 : 4$.',
          ],
        },
        {
          kind: 'para',
          text: 'The engine also runs backwards — from a ratio and one fact **about** the numbers to the numbers themselves. If two numbers are in the ratio $3 : 5$, they are $3k$ and $5k$ for some one-part value $k$; a sum or a difference pins $k$ down. The next Illustration works the difference; Exercise L4 works the sum the same way.',
        },
        {
          kind: 'example',
          title: 'Two numbers are in the ratio $3 : 5$ and their difference is $120$. Find the numbers.',
          steps: [
            'Now, the numbers are $3k$ and $5k$ for some one-part value $k$, so their difference is $5k - 3k = 2k$.',
            'So $2k = 120$, and one part is $k = 60$.',
            'Hence the numbers are $3 \\times 60 = 180$ and $5 \\times 60 = 300$; the check: $300 - 180 = 120$ and $180 : 300 = 3 : 5$.',
          ],
        },
        {
          kind: 'para',
          text: 'And the inverse read works too: one share recovers everything. If Arjun\'s Rs 450 is known to be the $3$-part share, then one part is $450 \\div 3 = 150$, the whole is $8 \\times 150 = 1200$, and Bala must hold $5 \\times 150 = 750$. In fraction dress: $450$ is $\\tfrac{3}{8}$ of the total, so the total is $450 \\times \\tfrac{8}{3} = 1200$. The unitary method recovered litres from kilometres in Lesson 5.3; here it recovers a whole from its part — the same move, one more costume.',
        },
        { kind: 'heading', text: 'Properties of ratios' },
        {
          kind: 'para',
          text: 'From the discussion above, the working properties of the ratio collect into one list — each with a verified instance.',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            '**A ratio is a pure number.** Once its terms wear the same unit, the unit cancels: $5$ m : $80$ cm $= 25 : 4$, never "25 metres".',
            '**Order matters.** $3 : 5$ and $5 : 3$ are different comparisons — the first puts the smaller first; neither can be spoken as the other.',
            '**Equal scaling never changes a ratio.** $3 : 5 = 6 : 10 = 9 : 15$: multiplying or dividing **both** terms by the same non-zero $k$ rebuilds the same comparison at a new size.',
            '**Terms must be of the same kind and unit.** "Rs 5 : 50 paise" must first become $500 : 50$; a ratio of unlike kinds is unspoken until a common measure is named.',
            '**A ratio is loyal to shape, not size.** $24 : 36$ and $48 : 72$ are the same ratio $2 : 3$ — doubling the whole never disturbs the proportion.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Ratio in the examination hall',
          text: 'Ratio is among the most-tested ideas in quantitative papers — SSC CGL and CHSL, banking and RRB NTPC clerical papers, CUET — and the shapes recur: reduce a ratio to its simplest form (an HCF drill straight from §12.1 of the class-6 canon); share an amount in a given ratio (the one-part engine); recover two numbers from a ratio plus their sum or difference; and splice $A : B$ with $B : C$ into $A : B : C$, the seed of every partnership problem. The class-7 canon (§§8.1–8.2) then uses equivalent ratios as the bridge to percentage — the door Lesson 5.4 already walked through. No past-paper question is reproduced here; the drills above are built in the same shapes.',
        },
        {
          kind: 'para',
          text: 'The ratio, then, is the division lens with a canonical name, a family of equivalents and a one-part engine for splitting wholes. One boundary still stands: every ratio so far has compared quantities **of the same kind**. The moment the kinds differ — kilometres against litres, rupees against days — the ratio cannot cancel its units, and a new idea is needed. Lesson 6.2 crosses that line and calls the result a **rate**; the equal-ratio test of this lesson then grows into **proportion** in Lesson 6.3.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Ratio',
              def: 'A comparison of two same-kind, same-unit quantities by division, written $a : b$; it says how many times the first is of the second, and is a pure number.',
            },
            {
              term: 'Terms of a ratio',
              def: 'The quantities being compared: in $a : b$ the terms are $a$ (the first term) and $b$ (the second); order is part of the statement.',
            },
            {
              term: 'Simplest form',
              def: 'The unique equivalent ratio whose terms share no common factor above $1$, found by dividing every term by the HCF.',
            },
            {
              term: 'Equivalent ratios',
              def: 'Ratios naming the same comparison: $a : b = ka : kb$ for every non-zero $k$; two ratios are equivalent exactly when their cross-products agree.',
            },
            {
              term: 'Continued ratio',
              def: 'A three-term ratio $a : b : c$ comparing three quantities at once; its simplest form divides all three terms by their joint HCF.',
            },
            {
              term: 'Sharing in a ratio',
              def: 'Splitting a quantity $T$ so that the shares run in the given ratio: sum the terms to count the parts, divide to price one part, multiply out.',
            },
            {
              term: 'One part',
              def: 'The unit of a shared quantity, worth $T$ divided by the total number of parts; every share is its parts times the one-part value.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The simplest form of $24 : 36$ is',
              options: [
                '4 : 6 — one common divisor removed, but not the greatest',
                '3 : 2 — the terms swapped',
                '2 : 3 — both terms divided by the HCF, 12',
                '12 : 18 — both terms divided by 2',
              ],
              answer: 2,
              explain:
                'The HCF of 24 and 36 is 12, and 24 : 36 = 2 : 3 (Option 3). Options 1 and 4 divide by a common divisor that is not the greatest — 4 : 6 and 12 : 18 still reduce. Option 2 answers 36 : 24, the reversed comparison.',
            },
            {
              q: 'The ratio of $5$ m to $80$ cm, in its simplest form, is',
              options: [
                '5 : 8 — the numerals as written',
                '25 : 4 — after both terms wear centimetres',
                '1 : 16 — computing 5 ÷ 80 and reducing',
                '8 : 5 — the larger term first',
              ],
              answer: 1,
              explain:
                'Convert first: 5 m = 500 cm, and 500 : 80 = 25 : 4 (Option 2). Option 3 is the no-conversion fraud — 5 : 80 compares a metre count with a centimetre count. Option 1 drops the units without converting, and Option 4 reverses the order.',
            },
            {
              q: 'Two numbers are in the ratio $3 : 5$ and their difference is $120$. The larger number is',
              options: ['180', '200', '240', '300'],
              answer: 3,
              explain:
                'The numbers are 3k and 5k, so the difference is 2k = 120, one part k = 60, and the numbers are 180 and 300 (Option 4). Option 1 is the smaller number. Options 2 and 3 split 120 into three or six parts of 40 — but the difference is two parts, not three or six.',
            },
            {
              q: 'Rs 1,800 is shared among P, Q and R in the ratio $2 : 3 : 4$. Q receives',
              options: ['Rs 400', 'Rs 540', 'Rs 600', 'Rs 800'],
              answer: 2,
              explain:
                'The ratio names 2 + 3 + 4 = 9 parts; one part is 1,800 ÷ 9 = 200, so Q receives 3 × 200 = Rs 600 (Option 3). Option 1 is P\'s share and Option 4 is R\'s. Option 2 divides by ten — as if the ratio carried ten parts; it carries nine.',
            },
            {
              q: 'Which of these ratios is NOT equivalent to $3 : 5$?',
              options: ['18 : 32', '9 : 15', '12 : 20', '15 : 25'],
              answer: 0,
              explain:
                'The cross-test settles each: 3 × 32 = 96 but 5 × 18 = 90 — unequal, so 18 : 32 is the stranger (Option 1). The others pass: 3 × 15 = 45 = 5 × 9; 3 × 20 = 60 = 5 × 12; 3 × 25 = 75 = 5 × 15.',
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
                  q: 'Write the ratio $45 : 60$ in its simplest form.',
                  solution: [
                    'Now, $45 = 3^2 \\times 5$ and $60 = 2^2 \\times 3 \\times 5$, so the HCF is $15$.',
                    'So $45 \\div 15 = 3$ and $60 \\div 15 = 4$.',
                    'Hence $45 : 60 = 3 : 4$.',
                  ],
                  answer: '3 : 4',
                },
                {
                  q: 'Express $1.8 : 2.7$ in its simplest form.',
                  solution: [
                    'Now, multiply both terms by $10$ to clear the decimal: $18 : 27$.',
                    'So the HCF of $18$ and $27$ is $9$, and $18 \\div 9 = 2$, $27 \\div 9 = 3$.',
                    'Hence $1.8 : 2.7 = 2 : 3$.',
                  ],
                  answer: '2 : 3',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find the ratio of 3 weeks to 18 days.',
                  solution: [
                    'Now, convert first — the units must agree: 3 weeks $= 21$ days.',
                    'So the ratio is $21 : 18$, and the HCF of $21$ and $18$ is $3$.',
                    'Hence $21 : 18 = 7 : 6$.',
                  ],
                  answer: '7 : 6',
                },
                {
                  q: 'Find the ratio of 2 kg 500 g to 400 g.',
                  solution: [
                    'Now, bring the mixed mass to one unit: 2 kg 500 g $= 2500$ g.',
                    'So the ratio is $2500 : 400$, and the HCF is $100$.',
                    'Hence $2500 : 400 = 25 : 4$.',
                  ],
                  answer: '25 : 4',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Divide Rs 900 between two friends in the ratio $4 : 5$.',
                  solution: [
                    'Now, the ratio names $4 + 5 = 9$ parts, so one part is $900 \\div 9 = 100$.',
                    'So the shares are $4 \\times 100 = 400$ and $5 \\times 100 = 500$.',
                    'Hence Rs 400 and Rs 500; the check: $400 + 500 = 900$ and $400 : 500 = 4 : 5$.',
                  ],
                  answer: 'Rs 400 and Rs 500',
                },
                {
                  q: 'Write $84 : 126 : 210$ in its simplest form.',
                  solution: [
                    'Now, $84 = 2^2 \\times 3 \\times 7$, $126 = 2 \\times 3^2 \\times 7$, $210 = 2 \\times 3 \\times 5 \\times 7$.',
                    'So the stock common to all three terms is $2 \\times 3 \\times 7 = 42$.',
                    'Hence $84 : 126 : 210 = 2 : 3 : 5$; the read-back: $2 \\times 42 = 84$, $3 \\times 42 = 126$, $5 \\times 42 = 210$.',
                  ],
                  answer: '2 : 3 : 5',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Two numbers are in the ratio $7 : 12$ and their sum is $760$. Find the numbers.',
                  solution: [
                    'Now, the ratio names $7 + 12 = 19$ parts, so one part is $760 \\div 19 = 40$.',
                    'So the numbers are $7 \\times 40 = 280$ and $12 \\times 40 = 480$.',
                    'Hence $280$ and $480$; the check: $280 + 480 = 760$ and $280 : 480 = 7 : 12$.',
                  ],
                  answer: '280 and 480',
                },
                {
                  q: 'Fill in the blank and justify with the cross-test: $5 : 8 = 35 : \\square$.',
                  solution: [
                    'Now, $35 = 5 \\times 7$, so the multiplier applied to both terms is $k = 7$.',
                    'So the missing term is $8 \\times 7 = 56$.',
                    'Hence $5 : 8 = 35 : 56$; the cross-test: $5 \\times 56 = 280$ and $8 \\times 35 = 280$ — equal, as equivalent ratios must be.',
                  ],
                  answer: '56',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'The angles of a triangle are in the ratio $2 : 3 : 4$. Find all three angles.',
                  solution: [
                    'Now, the ratio names $2 + 3 + 4 = 9$ parts, and the whole they rebuild is the angle sum of a triangle, $180^\\circ$.',
                    'So one part is $180 \\div 9 = 20^\\circ$.',
                    'Hence the angles are $2 \\times 20 = 40^\\circ$, $3 \\times 20 = 60^\\circ$ and $4 \\times 20 = 80^\\circ$; the check: $40 + 60 + 80 = 180$.',
                  ],
                  answer: '40°, 60°, 80°',
                },
                {
                  q: 'An alloy of mass 320 g mixes copper and zinc in the ratio $7 : 9$. Find the mass of each metal in 320 g of the alloy.',
                  solution: [
                    'Now, the ratio names $7 + 9 = 16$ parts, so one part is $320 \\div 16 = 20$ g.',
                    'So the copper contributes $7 \\times 20 = 140$ g and the zinc $9 \\times 20 = 180$ g.',
                    'Hence 140 g of copper and 180 g of zinc; the check: $140 + 180 = 320$ and $140 : 180 = 7 : 9$.',
                  ],
                  answer: 'Copper 140 g; zinc 180 g',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Is the three-term ratio $6 : 10 : 15$ in its simplest form? Justify your answer carefully, addressing every pair of terms.',
                  solution: [
                    'Now, the HCF of all three terms: $6 = 2 \\times 3$, $10 = 2 \\times 5$, $15 = 3 \\times 5$ — no prime divides all three, so the HCF is $1$.',
                    'So the three-term ratio **is** in its simplest form: no number above $1$ divides $6$, $10$ and $15$ together.',
                    'Yet every pair inside it reduces: $6 : 10 = 3 : 5$ (HCF $2$), $10 : 15 = 2 : 3$ (HCF $5$), $6 : 15 = 2 : 5$ (HCF $3$).',
                    'Hence simplest form for three terms means **joint** simplicity, not pairwise — $6 : 10 : 15$ is simplest even though no pair in it is; reducing pairs is not a method here.',
                  ],
                  answer: 'Yes — HCF(6, 10, 15) = 1, though every pair reduces',
                },
                {
                  q: 'Three friends have money in the ratio chain $A : B = 2 : 3$ and $B : C = 6 : 7$. Write $A : B : C$ as one continued ratio, and find each friend\'s share if the three together hold Rs 1,020.',
                  solution: [
                    'Now, $B$ appears as $3$ in the first ratio and as $6$ in the second — rename so $B$ wears one number: $\\mathrm{lcm}(3, 6) = 6$.',
                    'So scale the first ratio by $2$: $A : B = 4 : 6$; the second already shows $B : C = 6 : 7$.',
                    'Hence $A : B : C = 4 : 6 : 7$; the checks: $4 : 6 = 2 : 3$ and $6 : 7$ unchanged.',
                    'Now, the total names $4 + 6 + 7 = 17$ parts, so one part is $1020 \\div 17 = 60$.',
                    'So A holds $4 \\times 60 = 240$, B holds $6 \\times 60 = 360$, and C holds $7 \\times 60 = 420$.',
                    'Hence Rs 240, Rs 360 and Rs 420; the check: $240 + 360 + 420 = 1020$, $240 : 360 = 2 : 3$, and $360 : 420 = 6 : 7$.',
                  ],
                  answer: 'A : B : C = 4 : 6 : 7; Rs 240, Rs 360, Rs 420',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  plannedLessons: ['Rates and Unit Rates', 'Proportion and Cross-Multiplication', 'Direct and Inverse Variation', 'Scaling: Maps, Models and Recipes'],
}

