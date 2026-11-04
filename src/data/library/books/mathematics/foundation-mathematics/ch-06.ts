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
 *
 * LESSONS WRITTEN: 6.2 Rates and Unit Rates (run 27, 2026-11-04) — the
 * boundary 6.1 drew is crossed on purpose: a rate is a division comparison
 * of quantities of DIFFERENT kinds (rupees against kilograms, kilometres
 * against litres, words against minutes), written with the word per, and
 * its units ride along because nothing cancels. The Definition callout in
 * the formal shape + equation tag 1 (units attached) with the two-direction
 * note (18 km/L vs its twin 1/18 L/km); the roman run of rates in the wild
 * (Rs 40/kg, 18 km/L, 72 wpm, 60 beats/min) each with the rate × quantity
 * read-back; the unit rate as the one-part engine of 5.3/6.1 wearing units
 * (Rs 96 for 3 kg → Rs 32/kg; the scale-to-friendly-unit road Rs 22.50 per
 * 250 g ×4 → Rs 90/kg — 6.1's equivalence family in rate dress; the inverse
 * read Rs 15/pen → Rs 210 buys 14 pens); comparing rates by the same-way
 * law (shops 32 vs 31 with the Rs 5 saving; the bulk illusion 30 vs 30.5 —
 * the bigger sack dearer; the direction-fraud Caution 32 Rs/kg vs 0.03125
 * kg/Rs); figure 1 the double ruler (0–5 kg locked to Rs 0–160, the
 * constant Rs 32 step); the recognition table of five offers with the tie
 * (Rs 87/3 kg = Rs 232/8 kg = 29) and the ladder to 31; speed as the
 * flagship rate — the Definition callout + equation tag 2 with the speed
 * family (speed = distance/time, and the two doors the balance licence
 * opens), figure 2 the journey map (240 km in 4 equal hourly cells of
 * 60 km, uniform speed drawn), the sprint Illustration (100 m in 12.5 s →
 * 8 m/s); the km/h ↔ m/s conversion PROVED as a derivation block (1 km/h =
 * 1000 m/3600 s = 5/18 m/s; the reciprocal 18/5 = 3.6; anchors 5 m/s = 18
 * km/h, 20 m/s = 72 km/h, 25 m/s = 90 km/h) with Illustrations 72 km/h →
 * 20 m/s and 12 m/s → 43.2 km/h; rates at work (the tank 5,400 L at 45
 * L/min → 120 min = 2 h; wages/prices as the same two-pedal engine); the
 * average-speed Caution (total distance ÷ total time — the equal-weight
 * mean fraud killed: 240 km in 5 h → 48 km/h, not 50) and the average-speed
 * formula card; properties list, exam corner (NCERT class-6 ch. 12 Ex. 12.3
 * unitary-method canon + class-7 science Motion and Time + Khattar speed
 * staples), 7 terms, 5-quiz (keys 1/0/1/2/1) and 12
 * exercises L1–L6 (L6: the typists' 45 vs 50 wpm and the unequal-legs
 * average 70 ≠ 75). Every number pre-verified by verify-unit-6.ts sections
 * L–U (165 checks total, A–U).
 *
 * LESSONS WRITTEN: 6.3 Proportion and Cross-Multiplication (run 29,
 * 2026-11-04) — 6.2's closing question made official: the proportion as
 * the STATEMENT that two ratios agree (a : b :: c : d, the traditional
 * double colon read "is to … as …"), a ratio a NUMBER and a proportion a
 * true-or-false sentence (the equation–expression distinction of 2.2 in
 * new dress); the opening Illustration pays 6.2's debt (the pantry's
 * 3 kg for Rs 96 vs the shop's 5 kg for Rs 160 — one rate said twice);
 * the Definition callout in the formal shape + equation tag 1
 * (a : b :: c : d ⟺ a/b = c/d, all terms non-zero); figure 1 the four
 * seats (first/second/third/fourth; the extremes arc over the outer pair,
 * the means arc under the inner pair, the cross law as the bottom strip);
 * the cross law PROVED as a derivation block in both directions (multiply
 * by bd / divide by bd — the balance licence of ch. 2) with the
 * extremes-means recognition table (8:12 = 10:15, 21:14 = 33:22,
 * 9:4 = 27:12, and the failing 6:10 vs 9:16 row) and the flip Caution
 * (3 : 5 :: 10 : 6 is a different, false claim — 18 ≠ 50); the
 * test-and-fill engine — equation tag 2 (a : b = c : x ⟹ x = bc/a) —
 * Illustrations: the 45 : 63 :: 35 : 49 pass (both 5 : 7), the
 * 30 : 42 vs 24 : 35 fail (1050 ≠ 1008), the fourth seat 8 : 12 = 10 : □
 * → 15 and 6, 9, 12 → 18, the harder first seat □ : 24 :: 30 : 45 → 16;
 * alternendo and invertendo proved by the unchanged cross products
 * (3 : 5 :: 6 : 10 → 3 : 6 :: 5 : 10 and 5 : 3 :: 10 : 6); continued
 * proportion (a : b :: b : c, the mean in BOTH mean seats) with the mean
 * proportional b² = ac (8 & 50 → 20; the arithmetic-mean Caution 25 ≠ 15
 * for 5 & 45) and the third proportional x = b²/a (to 8 and 12 → 18);
 * proportion at work — figure 2 the line of agreement (the shop's
 * Rs 32/kg ruler: 3 : 5 :: 96 : 160 and 5 : 8 :: 160 : 256 on one line)
 * with the off-line test (4 kg for Rs 120 → 30 ≠ 32), the tea
 * Illustration (5 kg → Rs 480, 8 kg → Rs 768, the cross law and the
 * unit-rate engine agreeing); properties list, exam corner (NCERT
 * class-6 ch. 12 §12.2 + Ex. 12.2 canon — definition, :: notation,
 * extremes/means — + class-7 ch. 8's equivalence bridge + Khattar
 * proportion staples), 7 terms, 5-quiz (keys 0/1/2/3/2) and 12
 * exercises L1–L6 (L6: the recovered partner — mean 20, one number 16,
 * other 25 — and alternendo proved + verified). Every number
 * pre-verified by verify-unit-6.ts sections V–AE (252 checks, A–AE).
 * LESSONS WRITTEN: 6.4 Direct and Inverse Variation (run 30, 2026-11-04)
 * — the two locks named (direct y/x = k certified on the shop's rice
 * line 96/3 = 160/5 = 256/8 = 32; inverse xy = k on the fixed total:
 * the Rs 1,00,000 prize pool, the 360-degree wheel, the 360-minute
 * school day), the parking fraud (growing without agreeing), the
 * direct engine (bottles 700, truck 168 km, pole-shadow 6 m, bacteria
 * 0.0001 cm), the inverse canon, one journey's two bindings (figure 1
 * the line vs the hyperbola), the factor laws proved, the recognition
 * drill (7 rows), the flip (figure 2, redesigned in run 31 as
 * mirror-symmetric cubic swap-arcs), the work problems; 8 terms,
 * 5-quiz (keys 2/1/1/2/1), 12 exercises L1–L6. (This block was
 * recorded retroactively at run 32 — run 30 shipped the lesson but
 * left this journal without it.)
 *
 * LESSONS WRITTEN: 6.5 Scaling: Maps, Models and Recipes (run 32,
 * 2026-11-04) — the chapter's final lesson, entering through 6.4's
 * open door: the map scale as a ratio with units riding. The atlas at
 * 1 cm : 18 km opens (the hub leg 4 cm ↔ 72 km, the grain-market leg
 * 5 cm ↔ 90 km, the village link 2.5 cm ↔ 45 km); the Definition
 * callout + equation tag 1 give the scale in three dresses (verbal
 * pair, representative fraction, bar scale) and the RF is PROVED as a
 * derivation (1 cm : 18 km = 1 : 18,00,000 — units cancel, a pure
 * number that works in every unit system; 1 mm of map = 1.8 km);
 * figure 1 the atlas page with its alternating bar scale (0–72 km in
 * 18-km segments); the photocopy insight (an 80 % copy makes the
 * printed RF lie — 1 : 22,50,000 is the scale the copy deserves, the
 * bar shrinks with the sheet and stays true); the scale engine both
 * ways (ground = map × n, map = ground ÷ n) with the formula card;
 * the model van at 1 : 24 (15 cm ↔ 3.6 m, wheelbase 10 cm ↔ 2.4 m);
 * the courtyard plan at 1 : 500 (8 cm × 5 cm) and the AREA LAW — the
 * scale multiplies lengths, not areas: 1000 m² ÷ 500² = 0.004 m² =
 * 40 cm², the area ratio 500² = 2,50,000 — as a Caution + formula
 * card; one law, two directions (equation tag 2, m = drawing/real:
 * reductions m < 1, life size m = 1, enlargements m > 1 — 6.4's
 * bacterium at ×50,000 as the enlargement callback), the properties
 * list of scale drawings, the stamp ×5 (20 × 15 cm, area 25 = 5²
 * times), figure 2 the two-direction bars (van 1 : 24 and stamp ×5,
 * each panel drawn to ONE common px-per-cm so the px ratio IS the
 * scale) and the similarity-door insight; recipes close the lesson —
 * the hostel khichdi for 4 (rice 300 g, dal 150 g, water 900 mL,
 * ghee 30 g, salt 6 g) scaled to 6 (× 3/2), 2 (× 1/2) and 10 (× 5/2),
 * the recipe multiplier PROVED as a derivation from the per-serving
 * constant (q ∝ s, q₂ = q₁ × s₂/s₁), the five-ingredient table across
 * four serving counts, the water : rice = 3 : 1 ratio surviving every
 * scale, and the Caution that the clock is not on the ingredient list
 * (doubled rice is not doubled time); the chapter closes by harvesting
 * its five instruments (ratio, rate, proportion, variation, scale);
 * exam corner (NCERT class-8 ch. 13 opens on the road-map example —
 * its 1 cm : 18 km dress cited, not reproduced; RRB NTPC and
 * state-police map items verified in the wild), 7 terms, 5-quiz
 * (keys 0/1/0/2/1) and 12 exercises L1–L6 (L6: the recipe multiplier
 * proved + the photocopied survey map — 6 cm on an 80 % copy of a
 * 1 : 2,00,000 sheet is 15 km truly, 12 km by the lying RF). Every
 * number pre-verified by verify-unit-6.ts sections AQ–AZ (442 checks,
 * A–AZ). CHAPTER 6 COMPLETE: 5/5 lessons.
 */

export const chapter06: Chapter = {
  number: 6,
  slug: 'ratio-rate-proportion',
  title: 'Ratio, Rate and Proportion',
  summary:
    'Comparing quantities by division rather than difference: ratios in simplest form, unit rates, the cross-multiplication test for proportion, direct and inverse variation, and scaling in maps, recipes and models.',
  status: 'complete',
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
    {
      id: 'fm-rates-and-unit-rates',
      number: '6.2',
      title: 'Rates and Unit Rates',
      concepts: [
        'Rate',
        'Per — the units ride',
        'Unit rate',
        'Unit price',
        'Speed',
        'Uniform speed',
        'Average speed',
        'The one-part engine',
      ],
      objectives: [
        'Recognise a rate as a division comparison of quantities of different kinds, keep its units attached, and read it in either direction',
        'Compute the unit rate by dividing — or by scaling to a friendly unit — and run it backwards to recover totals and counts',
        'Compare offers, workers and journeys on one unit ground and in one direction, and expose the bulk and direction frauds',
        'Use the speed family and the $\\tfrac{5}{18}$ law between km/h and m/s, and average a journey honestly over its whole time',
      ],
      prerequisites: ['fm-ratio-as-a-comparison', 'fm-operating-on-decimals'],
      sources: ['ncert-math6-ch12', 'ncert-sci7-motion', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 6.1 drew a boundary: a ratio speaks only when its terms are of the **same kind**, wearing the **same unit**. This lesson crosses that boundary on purpose — because the comparisons that run daily life live on the other side. The grocer weighs rupees against kilograms; the driver counts kilometres against litres and hours; the typist races words against minutes. None of these is a category error. What changes is one thing only: the units can no longer cancel each other away, so they stay attached to the answer and ride with it wherever it goes.',
        },
        {
          kind: 'para',
          text: 'The word that carries the idea is **per** — *for each*. Thirty-two rupees per kilogram; eighteen kilometres per litre; sixty beats per minute. A comparison by division whose units survive is called a **rate**, and one dress of it — the rate reduced so the second quantity is exactly $1$ — will do more work in this book than any other number besides the percent.',
        },
        { kind: 'heading', text: 'From ratio to rate' },
        {
          kind: 'para',
          text: 'The definition deserves the same formality the ratio received.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Rate',
          text: 'A **rate** is a comparison of two quantities of **different kinds** by division, written with the word **per** ("for each"): $a$ of the first kind per $b$ of the second kind. The two units ride along — a rate is **not** a pure number. Thus, Rs $96$ for $3$ kg gives the rate Rs $32$ **per kg**, and $54$ km on $3$ litres gives the rate $18$ km **per litre**.',
        },
        {
          kind: 'equation',
          latex: '\\text{rate} \\;=\\; \\tfrac{\\text{quantity of the first kind}}{\\text{quantity of the second kind}} \\qquad \\text{(units attached)}',
          note: 'Unlike the ratio of Lesson 6.1, nothing cancels: the kinds differ, so the units survive the division and belong to the answer. The bare numeral $18$ is homeless — $18$ km per litre and its twin $\\tfrac{1}{18}$ litre per km are different statements about the same driving. Every rate owns two legal directions; pick one, and stay in it while comparing.',
        },
        {
          kind: 'para',
          text: 'Rates are everywhere once the eye learns to look. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'Rs $40$ **per kg** — the grocer\'s rate: one kilogram costs forty rupees, so $120$ kg cost $120 \\times 40 = 4800$ rupees.',
            '$18$ km **per litre** — the car\'s rate: three litres carry it $3 \\times 18 = 54$ km.',
            '$72$ words **per minute** — the typist\'s rate: five minutes produce $72 \\times 5 = 360$ words.',
            '$60$ beats **per minute** — the pulse: $45$ seconds hold $60 \\times \\tfrac{45}{60} = 45$ beats.',
          ],
        },
        {
          kind: 'para',
          text: 'Each line multiplies the rate by a quantity to rebuild a total — the read-back habit from the sharing problems of Lesson 6.1, now with units on board. And each rate owns a **twin** spoken the other way round: $18$ km per litre is the same driving as $\\tfrac{1}{18}$ litre per km, the mechanic\'s "fuel consumption" dress. Both directions are legal; mixing them in one comparison is not. Among all the dresses a rate can wear, one is canonical — the one that makes two different-sized offers meet on common ground.',
        },
        { kind: 'heading', text: 'The unit rate' },
        {
          kind: 'para',
          text: 'A **unit rate** is a rate whose second quantity is exactly $1$ — one kilogram, one litre, one minute. Finding it is the one-part engine of Lesson 5.3 and the one part of Lesson 6.1 wearing units: **divide** to reach the single unit, **multiply** to scale back up. The grocer\'s name for it is the **unit price**.',
        },
        {
          kind: 'example',
          title: 'A 3 kg bag of rice costs Rs 96. Find the unit price.',
          steps: [
            'Now, the unit price is the price of one kilogram: divide the price by the quantity, $96 \\div 3 = 32$.',
            'So the rate is Rs 32 per kg; the read-back multiplies, $3 \\times 32 = 96$.',
            'Hence Rs 32 per kg — the one-part engine in the grocer\'s apron.',
          ],
        },
        {
          kind: 'formula',
          name: 'The unit rate',
          latex: '\\text{unit rate} = \\tfrac{\\text{first quantity}}{\\text{second quantity}} \\qquad (\\text{the second quantity becomes } 1)',
          note: 'Divide so the second kind counts exactly one. Read back with multiplication: quantity × unit rate rebuilds the total. Rs 96 for 3 kg → Rs 32 per kg; 180 words in 4 min → 45 wpm; 300 L in 6 min → 50 L/min.',
        },
        {
          kind: 'para',
          text: 'Division is not the only road to one. When the second quantity divides the unit neatly, **scaling** is lighter: grow the whole offer to a friendly size and the unit appears without any long division. Scaling both quantities by the same number changes nothing essential — Lesson 6.1 proved it for ratios ($a : b = ka : kb$), and a rate inherits the licence with its units still attached.',
        },
        {
          kind: 'example',
          title: 'A 250 g pack of cashews costs Rs 22.50. Find the price per kilogram.',
          steps: [
            'Now, a kilogram is four packs: $250 \\times 4 = 1000$ g. Scale the whole offer by $4$.',
            'So Rs $22.50 \\times 4 = 90$ buys exactly one kilogram.',
            'Hence Rs 90 per kg — no decimal division anywhere; the equivalence family carried the offer to a friendly size.',
          ],
        },
        {
          kind: 'para',
          text: 'The engine has a second pedal: it runs **backwards**. A unit rate known, the total it produces over many units is one multiplication — and the count a sum will buy is one division. If pens sell at Rs $90$ for $6$, the rate is $90 \\div 6 = 15$ rupees per pen, and then Rs $210$ buys $210 \\div 15 = 14$ pens. Divide to the unit, multiply to scale up, divide again to count the units a sum will buy: the whole traffic of the bazaar runs on these two pedals.',
        },
        { kind: 'heading', text: 'Comparing rates' },
        {
          kind: 'para',
          text: 'Two offers of different sizes cannot be compared as they stand — Rs 96 for 3 kg and Rs 155 for 5 kg name different batches. But once both wear the unit dress, the numbers meet on common ground and the comparison is one glance.',
        },
        {
          kind: 'example',
          title: 'Shop A sells a 3 kg bag for Rs 96; shop B sells a 5 kg bag for Rs 155. Which shop sells rice cheaper?',
          steps: [
            'Now, dress both offers in rupees per kilogram: A gives $96 \\div 3 = 32$; B gives $155 \\div 5 = 31$.',
            'So B runs cheaper — Rs 31 against Rs 32 per kg.',
            'Hence shop B; buying the full 5 kg there costs Rs 155 where shop A would charge $5 \\times 32 = 160$ — a saving of Rs 5.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Divide the same way',
          text: 'A comparison lives on one ground, in one direction. Rs 32 per kg and $0.03125$ kg per rupee describe the same shopping in opposite directions — and $32 > 0.03125$ says nothing at all, because the two numbers face away from each other. Before comparing, dress every rate in the **same units facing the same way**: rupees per kilogram against rupees per kilogram.',
        },
        {
          kind: 'para',
          text: 'The second fraud is quieter and more expensive. Shopping instinct says the bigger sack must be the bargain — *bulk is cheaper*. Sometimes. The unit price does not care how the sack feels; it divides, and reports.',
        },
        {
          kind: 'example',
          title: 'Which is the better buy: a 2 kg bag for Rs 60 or a 4 kg bag for Rs 122?',
          steps: [
            'Now, the same-way law: $60 \\div 2 = 30$ and $122 \\div 4 = 30.5$, both in rupees per kg.',
            'So the smaller bag runs cheaper — Rs 30 against Rs 30.50 per kg.',
            'Hence the 2 kg bag. The bigger sack is dearer here: size is not evidence, the unit price is.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'One rate, two rulers. The kilogram ruler and the rupee ruler are locked together by the rate: every extra kilogram lands the price exactly Rs 32 higher, so each position on the top ruler sits directly above its price on the bottom one. Read any size off the pair — 4 kg costs Rs 128 — and the constant step between neighbours is the unit rate Rs 32 per kg.',
          svg: `<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two aligned rulers showing the unit rate of thirty-two rupees per kilogram: zero to five kilograms on the top ruler locked step by step to zero to one hundred and sixty rupees on the bottom ruler, each extra kilogram costing the same thirty-two rupees">
  <text x="380" y="30" font-size="13" fill="currentColor" text-anchor="middle">one rate, two rulers — 3 kg costs Rs 96, so the step is Rs 32</text>
  <g stroke="currentColor" stroke-width="1.5" opacity="0.75">
    <line x1="60" y1="84" x2="700" y2="84"/>
    <line x1="60" y1="276" x2="700" y2="276"/>
  </g>
  <g stroke="currentColor" stroke-width="1">
    <line x1="60" y1="78" x2="60" y2="90"/><line x1="188" y1="78" x2="188" y2="90"/><line x1="316" y1="78" x2="316" y2="90"/><line x1="444" y1="78" x2="444" y2="90"/><line x1="572" y1="78" x2="572" y2="90"/><line x1="700" y1="78" x2="700" y2="90"/>
    <line x1="60" y1="270" x2="60" y2="282"/><line x1="188" y1="270" x2="188" y2="282"/><line x1="316" y1="270" x2="316" y2="282"/><line x1="444" y1="270" x2="444" y2="282"/><line x1="572" y1="270" x2="572" y2="282"/><line x1="700" y1="270" x2="700" y2="282"/>
  </g>
  <g stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.3">
    <line x1="60" y1="92" x2="60" y2="268"/><line x1="188" y1="92" x2="188" y2="268"/><line x1="316" y1="92" x2="316" y2="268"/><line x1="444" y1="92" x2="444" y2="268"/><line x1="572" y1="92" x2="572" y2="268"/><line x1="700" y1="92" x2="700" y2="268"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="60" y="68">0</text><text x="188" y="68">1</text><text x="316" y="68">2</text><text x="444" y="68">3</text><text x="572" y="68">4</text><text x="700" y="68">5</text>
    <text x="60" y="298">0</text><text x="188" y="298">32</text><text x="316" y="298">64</text><text x="444" y="298">96</text><text x="572" y="298">128</text><text x="700" y="298">160</text>
  </g>
  <text x="380" y="52" font-size="12" fill="currentColor" text-anchor="middle">rice bought (kg)</text>
  <text x="380" y="318" font-size="12" fill="currentColor" text-anchor="middle">price paid (Rs)</text>
  <g stroke="currentColor" stroke-width="1">
    <line x1="322" y1="124" x2="438" y2="124"/><line x1="322" y1="119" x2="322" y2="129"/><line x1="438" y1="119" x2="438" y2="129"/>
    <line x1="322" y1="232" x2="438" y2="232"/><line x1="322" y1="227" x2="322" y2="237"/><line x1="438" y1="227" x2="438" y2="237"/>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="380" y="112">one more kg</text>
    <text x="380" y="254">+ Rs 32 more</text>
  </g>
  <text x="380" y="348" font-size="13" fill="currentColor" text-anchor="middle">every extra kg costs the same Rs 32 — the constant step is the unit rate</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The unit-price ladder is worth keeping near the top of the mind, the way Lesson 5.4 kept a benchmark ladder of percents. Five offers of the same rice, priced and reduced:',
        },
        {
          kind: 'table',
          head: ['Offer', 'Price', 'Quantity', 'Unit price', 'Verdict'],
          rows: [
            ['A', 'Rs $87$', '$3$ kg', 'Rs $29$ per kg', 'joint cheapest (tie)'],
            ['B', 'Rs $232$', '$8$ kg', 'Rs $29$ per kg', 'joint cheapest (tie)'],
            ['C', 'Rs $60$', '$2$ kg', 'Rs $30$ per kg', 'middle'],
            ['D', 'Rs $122$', '$4$ kg', 'Rs $30.50$ per kg', 'second dearest'],
            ['E', 'Rs $155$', '$5$ kg', 'Rs $31$ per kg', 'dearest'],
          ],
        },
        {
          kind: 'para',
          text: 'Two rows repay a second look. Offers A and B **tie** — Rs 87 for 3 kg and Rs 232 for 8 kg both sit at Rs 29 per kg, because $232 = 8 \\times 29$ and $87 = 3 \\times 29$: one unit rate, two sizes, the equivalence family at the shop counter. And the dearest offer in the hall is E, the **largest bag on the shelf** — the bulk illusion caught in the act. A reader who can produce this ladder mentally holds most of the exam hall\'s "best buy" questions before they are asked.',
        },
        { kind: 'heading', text: 'Speed: the flagship rate' },
        {
          kind: 'para',
          text: 'One rate is so old, so useful and so examined that it has carried its own name for centuries. Distance against time governs every journey on foot, by wheel, by air — and every "how long will it take?" ever asked. It deserves the full formality.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Speed',
          text: 'The **speed** of a moving body is the rate that compares **distance** with **time**: the distance covered per unit of time, read in kilometres per hour or metres per second — the units are part of the answer. A body that covers **equal distances in equal times** is said to move with **uniform speed**.',
        },
        {
          kind: 'equation',
          latex: '\\text{speed} = \\tfrac{\\text{distance}}{\\text{time}}, \\qquad \\text{distance} = \\text{speed} \\times \\text{time}, \\qquad \\text{time} = \\tfrac{\\text{distance}}{\\text{speed}}',
          note: 'The first statement is the definition; the other two follow by the balance licence of chapter 2 — multiply both sides by the time, then divide by the speed. One definition, three doors: every speed problem hides exactly one of the three and hands you the other two.',
        },
        {
          kind: 'formula',
          name: 'The speed family',
          latex: '\\text{speed} = \\tfrac{d}{t} \\qquad d = \\text{speed} \\times t \\qquad t = \\tfrac{d}{\\text{speed}}',
          note: 'Cover 240 km in 4 h → 60 km/h; run 100 m in 12.5 s → 8 m/s. Given any two of distance, time and speed, the third follows from the definition — no fourth formula is ever needed.',
        },
        {
          kind: 'example',
          title: 'A car covers 240 km in 4 hours. Find its speed.',
          steps: [
            'Now, the definition: speed $= 240 \\div 4 = 60$ km per hour.',
            'So the car runs at 60 km/h — every hour of driving buys 60 more kilometres.',
            'Hence 60 km/h; the read-back: $60 \\times 4 = 240$ — the journey rebuilt.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The journey map. Four equal hours fill the 240 km bar with four equal cells of 60 km — the picture of uniform speed. Run the picture backwards and it computes: 240 km ÷ 4 h = 60 km/h. This is the one-part engine of Lesson 6.1 on wheels: the bar is the whole, the hour is the part.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of two hundred and forty kilometres divided into four equal hourly cells of sixty kilometres each, with hour marks above and kilometre marks below, showing a uniform speed of sixty kilometres per hour">
  <text x="380" y="34" font-size="13" fill="currentColor" text-anchor="middle">one journey, four equal hours — 240 km in all</text>
  <rect x="60" y="110" width="160" height="60" fill="currentColor" opacity="0.08"/>
  <rect x="380" y="110" width="160" height="60" fill="currentColor" opacity="0.08"/>
  <g stroke="currentColor" stroke-width="1.5" opacity="0.75">
    <line x1="60" y1="110" x2="700" y2="110"/>
    <line x1="60" y1="170" x2="700" y2="170"/>
  </g>
  <g stroke="currentColor" stroke-width="1">
    <line x1="60" y1="104" x2="60" y2="176"/><line x1="220" y1="104" x2="220" y2="176"/><line x1="380" y1="104" x2="380" y2="176"/><line x1="540" y1="104" x2="540" y2="176"/><line x1="700" y1="104" x2="700" y2="176"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="60" y="96">0 h</text><text x="220" y="96">1 h</text><text x="380" y="96">2 h</text><text x="540" y="96">3 h</text><text x="700" y="96">4 h</text>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="140" y="145">60 km</text><text x="300" y="145">60 km</text><text x="460" y="145">60 km</text><text x="620" y="145">60 km</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="60" y="194">0 km</text><text x="220" y="194">60 km</text><text x="380" y="194">120 km</text><text x="540" y="194">180 km</text><text x="700" y="194">240 km</text>
  </g>
  <text x="380" y="232" font-size="13" fill="currentColor" text-anchor="middle">equal hours, equal cells of 60 km — the speed is uniform at 60 km/h</text>
  <text x="380" y="262" font-size="13" fill="currentColor" text-anchor="middle">run it backwards: 240 km ÷ 4 h = 60 km/h — the one-part engine on wheels</text>
  <text x="380" y="290" font-size="13" fill="currentColor" text-anchor="middle">distance = speed × time: 60 × 4 = 240 — the read-back closes the loop</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The definition never changes; only the units dress to fit the journey. A race lives in metres and seconds, so its speed wears m/s; a road trip lives in kilometres and hours, so its speed wears km/h. Same division, different clothes.',
        },
        {
          kind: 'example',
          title: 'A sprinter runs 100 m in 12.5 s. Find the speed.',
          steps: [
            'Now, the same definition in smaller units: $100 \\div 12.5 = 8$.',
            'So the speed is 8 m/s — each second carries 8 metres of track.',
            'Hence 8 m/s; the read-back: $8 \\times 12.5 = 100$.',
          ],
        },
        { kind: 'heading', text: 'Changing the units of a rate' },
        {
          kind: 'para',
          text: 'Because a rate\'s units ride along, a rate can be **re-dressed** — the same driving spoken in km/h or in m/s. The tool is chapter 5\'s conversion chart plus one honest observation: a statement like "$1000$ m $= 1$ km" is a **name for the number 1**, so multiplying by it changes the unit and nothing else. Two such names convert any speed.',
        },
        {
          kind: 'derivation',
          title: 'The km/h ↔ m/s law',
          statement:
            'Claim: $1$ km/h $= \\tfrac{5}{18}$ m/s, and $1$ m/s $= \\tfrac{18}{5} = 3.6$ km/h.',
          steps: [
            {
              label: 'Dress the kilometre',
              formula: '1 \\text{ km} = 1000 \\text{ m}',
              explanation:
                'The kilometre is a name for a thousand metres — Lesson 5.1\'s conversion chart, still true.',
            },
            {
              label: 'Dress the hour',
              formula: '1 \\text{ h} = 60 \\times 60 = 3600 \\text{ s}',
              explanation:
                'An hour holds sixty minutes of sixty seconds each.',
            },
            {
              label: 'Divide the dresses',
              formula: '1 \\tfrac{\\text{km}}{\\text{h}} = \\tfrac{1000 \\text{ m}}{3600 \\text{ s}} = \\tfrac{5}{18} \\tfrac{\\text{m}}{\\text{s}}',
              explanation:
                'Reduce $\\tfrac{1000}{3600}$ by the HCF $200$ — chapter 3\'s machinery, once more. So one kilometre per hour is a small stroll in m/s units: five-eighteenths of a metre each second.',
            },
            {
              label: 'Turn it round',
              formula: '1 \\tfrac{\\text{m}}{\\text{s}} = \\tfrac{3600}{1000} \\tfrac{\\text{km}}{\\text{h}} = \\tfrac{18}{5} = 3.6 \\tfrac{\\text{km}}{\\text{h}}',
              explanation:
                'The reciprocal direction of the same law: one metre each second is a brisk 3.6 km every hour.',
            },
          ],
          result:
            'km/h → m/s: multiply by $\\tfrac{5}{18}$. m/s → km/h: multiply by $\\tfrac{18}{5} = 3.6$. Two multipliers, one law.',
        },
        {
          kind: 'formula',
          name: 'The conversion law',
          latex: '1 \\text{ km/h} = \\tfrac{5}{18} \\text{ m/s} \\qquad 1 \\text{ m/s} = \\tfrac{18}{5} = 3.6 \\text{ km/h}',
          note: 'Down to m/s, multiply by 5/18; up to km/h, multiply by 18/5. Anchors worth memorising: 5 m/s = 18 km/h, 20 m/s = 72 km/h, 25 m/s = 90 km/h.',
        },
        {
          kind: 'example',
          title: 'Express 72 km/h in m/s.',
          steps: [
            'Now, going down to m/s multiplies by $\\tfrac{5}{18}$: $72 \\times \\tfrac{5}{18} = \\tfrac{360}{18} = 20$.',
            'So 72 km/h $= 20$ m/s.',
            'Hence 20 m/s; the anchor agrees — $20 \\times 3.6 = 72$.',
          ],
        },
        {
          kind: 'example',
          title: 'Express 12 m/s in km/h.',
          steps: [
            'Now, going up to km/h multiplies by $\\tfrac{18}{5}$: $12 \\times \\tfrac{18}{5} = \\tfrac{216}{5} = 43.2$.',
            'So 12 m/s $= 43.2$ km/h.',
            'Hence 43.2 km/h — a city speed limit, spoken in the scientist\'s units.',
          ],
        },
        { kind: 'heading', text: 'Rates at work' },
        {
          kind: 'para',
          text: 'The engine fills and drains as readily as it drives. A pipe pouring $45$ litres per minute is a rate with a simple question attached: how many such minutes does a tank of $5400$ litres ask for? A mason\'s day-rate, a courier\'s charge per parcel, a printer\'s cost per page — every one is a unit rate, and every one of their problems is the same two-pedal ride: divide to the unit, multiply or divide again to answer.',
        },
        {
          kind: 'example',
          title: 'A pipe pours 45 L per minute. How long does it take to fill a 5,400 L tank?',
          steps: [
            'Now, the rate names 45 litres for each minute; the tank asks how many such minutes make 5400 litres.',
            'So the time is $5400 \\div 45 = 120$ minutes; the read-back: $45 \\times 120 = 5400$.',
            'Hence 120 minutes — two hours; the inverse read of the unit rate, at work.',
          ],
        },
        { kind: 'heading', text: 'Average speed' },
        {
          kind: 'para',
          text: 'Real journeys rarely run at one polite speed: traffic, hills and tea stops see to that. When the speeds vary, the journey still deserves one number — and the definition insists on which one. Speed is distance per time, so the journey\'s speed is the **whole distance divided by the whole time**. Nothing else is the average speed, however promising it looks.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Average over the whole, not over the numbers',
          text: 'The average speed belongs to the whole journey: total distance ÷ total time. The plain mean of the leg speeds is a **fraud** whenever the legs take different times — it weights the fast hour and the slow hour equally when the journey does not. Compute times first, add, then divide once.',
        },
        {
          kind: 'example',
          title: 'A car goes 120 km out at 60 km/h and returns the same 120 km at 40 km/h. Find its average speed for the whole trip.',
          steps: [
            'Now, take each leg to its time: $120 \\div 60 = 2$ h out, and $120 \\div 40 = 3$ h back.',
            'So the whole journey is $120 + 120 = 240$ km in $2 + 3 = 5$ h, and the average speed is $240 \\div 5 = 48$ km/h.',
            'Hence 48 km/h — **not** 50. The plain mean $(60 + 40) \\div 2 = 50$ would claim $50 \\times 5 = 250$ km of driving, and the car never drove 250 km. The extra hour at 40 km/h drags the honest average below the mean.',
          ],
        },
        {
          kind: 'formula',
          name: 'Average speed',
          latex: '\\text{average speed} = \\tfrac{\\text{total distance}}{\\text{total time}}',
          note: 'Weight every leg by the time it took. The plain mean of two speeds is correct only when the legs take equal times — and then it is correct because the definition says so, not because means are lucky.',
        },
        { kind: 'heading', text: 'Properties of rates' },
        {
          kind: 'para',
          text: 'From the discussion above, the working properties of rates collect into one list — each with a verified instance.',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            '**A rate keeps its units.** Rs 32 per kg is homeless without them — the bare 32 could be 32 rupees, 32 kg, or nonsense. The kinds differ, so nothing cancels.',
            '**The two directions are different statements.** 18 km per litre and 1/18 litre per km describe one driving in two dresses; a comparison must pick one direction and stay in it.',
            '**The unit rate is the common ground.** Rs 96 for 3 kg and Rs 155 for 5 kg meet only when both are reduced to one kilogram — 32 against 31 — and then the verdict is one glance.',
            '**Rate × quantity rebuilds the total.** $32 \\times 5 = 160$ rupees for 5 kg; $60 \\times 4 = 240$ km in 4 hours; $45 \\times 120 = 5400$ litres in 120 minutes — the read-back check on every answer.',
            '**An average rate belongs to the whole journey.** 240 km in 5 hours is 48 km/h even though no single hour ran at 48 — total distance ÷ total time, never the plain mean of unequal-time legs.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Rates in the examination hall',
          text: 'Rate questions are fixtures of SSC CGL and CHSL, banking clerical papers, RRB NTPC and CUET — and the shapes recur: the unit-price "best buy" among bags of different sizes (the same-way law, with the bulk illusion laid for the unwary); the speed–time–distance triad, any two given; the km/h ↔ m/s conversion drill (the $\\tfrac{5}{18}$ and $3.6$ multipliers); the average-speed trap built on legs of unequal time; and filling or draining pipes, which seed the work-rate chains of later study. The canon behind them: the unitary method of NCERT class-6 chapter 12 (Exercise 12.3), speed as distance per time from NCERT class-7 science (Motion and Time — m/s the basic unit, km/h the road\'s dress), and the aptitude staples of Khattar\'s Quantitative Aptitude. No past-paper question is reproduced here; the drills above are built in the same shapes.',
        },
        {
          kind: 'para',
          text: 'The rate, then, is the ratio\'s braver sibling: it compares different kinds, keeps its units on, and reduces every offer, journey and pipeline to one friendly unit. Two rates facing the same way invite one more question — are they the **same** rate? The shop\'s Rs 32 per kg and the pantry\'s 3 kg for Rs 96 say the same thing twice, and mathematics has a name for such agreement: **proportion**. Lesson 6.3 makes it official.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Rate',
              def: 'A comparison of two quantities of different kinds by division, written with per — Rs 32 per kg, 18 km per litre; unlike a ratio, its units ride along and nothing cancels.',
            },
            {
              term: 'Unit rate',
              def: 'A rate reduced so its second quantity is exactly one unit, found by dividing (or by scaling to a friendly unit); the one-part engine of Lesson 5.3 wearing units.',
            },
            {
              term: 'Unit price',
              def: 'The unit rate of a purchase — price divided by quantity — the common ground on which offers of different sizes are compared.',
            },
            {
              term: 'Speed',
              def: 'The rate comparing distance with time: distance ÷ time; distance = speed × time and time = distance ÷ speed follow by the balance licence.',
            },
            {
              term: 'Uniform speed',
              def: 'Speed that stays the same in every equal time interval, so equal hours cover equal distances; real journeys vary around it.',
            },
            {
              term: 'Average speed',
              def: 'Total distance divided by total time for the whole journey; it weights each leg by the time it took, so it never equals the plain mean of leg speeds unless the legs took equal times.',
            },
            {
              term: 'Conversion factor',
              def: 'A name for the number 1 written as a fraction of equal quantities in different units, such as 1000 m per 1 km; multiplying by it changes the unit and nothing else.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'A 3 kg bag of rice costs Rs 96. The unit price is',
              options: [
                'Rs 30 per kg — as if the bag cost Rs 90',
                'Rs 32 per kg — 96 ÷ 3',
                'Rs 33 per kg — as if the bag cost Rs 99',
                'Rs 96 — the price tag itself',
              ],
              answer: 1,
              explain:
                'The unit price divides the price by the quantity: 96 ÷ 3 = 32 (Option 2). Option 1 answers 90 ÷ 3 and Option 3 answers 99 ÷ 3 — both misread the tag. Option 4 forgets to divide at all: Rs 96 is the price of 3 kg, not of 1.',
            },
            {
              q: 'Which offer of rice is the cheapest?',
              options: [
                'Rs 60 for 2 kg — Rs 30 per kg',
                'Rs 122 for 4 kg — Rs 30.50 per kg',
                'Rs 155 for 5 kg — Rs 31 per kg',
                'All three cost the same per kg',
              ],
              answer: 0,
              explain:
                'On the common ground of rupees per kg: 30, then 30.50, then 31 — the 2 kg bag wins (Option 1). The dearest is the 5 kg bag: the bulk illusion. Option 4 is false — equal prices would need equal unit prices, and 30 ≠ 30.50 ≠ 31.',
            },
            {
              q: 'A train covers 180 km in 3 hours. Its speed is',
              options: ['63 km/h', '60 km/h', '54 km/h', '180 km/h'],
              answer: 1,
              explain:
                'Speed = distance ÷ time: 180 ÷ 3 = 60 (Option 2). Option 1 added the divisor, Option 3 subtracted 6 — arithmetic out of thin air. Option 4 reported the distance and ignored the time: km are not km/h.',
            },
            {
              q: '12 m/s expressed in km/h is',
              options: ['4.32 km/h', '30 km/h', '43.2 km/h', '60 km/h'],
              answer: 2,
              explain:
                'Going up to km/h multiplies by 18/5 = 3.6: 12 × 3.6 = 43.2 (Option 3). Option 1 is the ÷10 slip, Option 2 multiplies by 2.5, and Option 4 multiplies by 5 — half of the law remembered, half forgotten.',
            },
            {
              q: 'A car goes 120 km out at 60 km/h and returns the same 120 km at 40 km/h. Its average speed for the whole trip is',
              options: ['40 km/h', '48 km/h', '50 km/h', '60 km/h'],
              answer: 1,
              explain:
                'Times first: 2 h out, 3 h back — 240 km in 5 h, and 240 ÷ 5 = 48 (Option 2). Option 3 is the equal-weight mean (60 + 40)/2 = 50, which would claim 50 × 5 = 250 km of driving. Options 1 and 4 are the two legs\' speeds, not the journey\'s.',
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
                  q: 'A roll of ribbon costs Rs 240 for 8 m. Find the price per metre.',
                  solution: [
                    'Now, the unit price divides the price by the length: $240 \\div 8 = 30$.',
                    'So the rate is Rs 30 per metre; the read-back: $8 \\times 30 = 240$.',
                    'Hence Rs 30 per metre.',
                  ],
                  answer: 'Rs 30 per metre',
                },
                {
                  q: 'A typist types 250 words in 10 minutes. Find the typing rate.',
                  solution: [
                    'Now, the rate divides words by minutes: $250 \\div 10 = 25$.',
                    'So the rate is 25 words per minute; the read-back: $25 \\times 10 = 250$.',
                    'Hence 25 words per minute.',
                  ],
                  answer: '25 words per minute',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A dozen pencils cost Rs 42. Find the price of one pencil.',
                  solution: [
                    'Now, one dozen is 12, so the unit price is $42 \\div 12 = 3.5$.',
                    'So each pencil costs Rs 3.50; the read-back: $12 \\times 3.5 = 42$.',
                    'Hence Rs 3.50 per pencil.',
                  ],
                  answer: 'Rs 3.50 per pencil',
                },
                {
                  q: 'Pens sell at Rs 90 for 6. Find the unit price, and the number of pens Rs 210 will buy.',
                  solution: [
                    'Now, the unit price is $90 \\div 6 = 15$ rupees per pen.',
                    'So Rs 210 buys $210 \\div 15 = 14$ pens — the second pedal of the engine.',
                    'Hence Rs 15 per pen, and 14 pens for Rs 210; the check: $14 \\times 15 = 210$.',
                  ],
                  answer: 'Rs 15 per pen; 14 pens',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A bus covers 240 km in 4 hours. Find its speed, and the distance it covers in 7 hours at that speed.',
                  solution: [
                    'Now, the speed is $240 \\div 4 = 60$ km/h.',
                    'So in 7 hours it covers $60 \\times 7 = 420$ km.',
                    'Hence 60 km/h and 420 km; the checks: $60 \\times 4 = 240$ and 420 km in 7 h returns $420 \\div 7 = 60$.',
                  ],
                  answer: '60 km/h; 420 km',
                },
                {
                  q: 'Which is the better buy: 3 kg for Rs 87 or 4 kg for Rs 116?',
                  solution: [
                    'Now, dress both in rupees per kg: $87 \\div 3 = 29$ and $116 \\div 4 = 29$.',
                    'So the unit prices are equal — the comparison ties.',
                    'Hence neither: both offers run at Rs 29 per kg, one unit rate in two sizes.',
                  ],
                  answer: 'Neither — a tie at Rs 29 per kg',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Express 54 km/h in m/s.',
                  solution: [
                    'Now, going down to m/s multiplies by $\\tfrac{5}{18}$: $54 \\times \\tfrac{5}{18} = \\tfrac{270}{18} = 15$.',
                    'So 54 km/h $= 15$ m/s.',
                    'Hence 15 m/s; the read-back: $15 \\times 3.6 = 54$.',
                  ],
                  answer: '15 m/s',
                },
                {
                  q: 'Express 10 m/s in km/h.',
                  solution: [
                    'Now, going up to km/h multiplies by $\\tfrac{18}{5}$: $10 \\times \\tfrac{18}{5} = \\tfrac{180}{5} = 36$.',
                    'So 10 m/s $= 36$ km/h.',
                    'Hence 36 km/h.',
                  ],
                  answer: '36 km/h',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A pump delivers 45 L per minute. How long does it take to fill a 6,300 L tank? Give the answer in hours and minutes.',
                  solution: [
                    'Now, the time is $6300 \\div 45 = 140$ minutes.',
                    'So 140 minutes is $120 + 20$ minutes, that is 2 hours 20 minutes.',
                    'Hence 2 h 20 min; the check: $45 \\times 140 = 6300$.',
                  ],
                  answer: '2 hours 20 minutes',
                },
                {
                  q: 'A journey has two legs: 150 km at 50 km/h, then 120 km at 60 km/h. Find the average speed for the whole journey.',
                  solution: [
                    'Now, the times: $150 \\div 50 = 3$ h, then $120 \\div 60 = 2$ h.',
                    'So the whole journey is $150 + 120 = 270$ km in $3 + 2 = 5$ h, and the average speed is $270 \\div 5 = 54$ km/h.',
                    'Hence 54 km/h; the plain mean $(50 + 60) \\div 2 = 55$ is the fraud — $55 \\times 5 = 275$ km, and the journey ran 270.',
                  ],
                  answer: '54 km/h',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Typist A types 540 words in 12 minutes; typist B types 700 words in 14 minutes. Who types faster, and by how much?',
                  solution: [
                    'Now, reduce both to words per minute: A gives $540 \\div 12 = 45$; B gives $700 \\div 14 = 50$.',
                    'So B types faster — 50 against 45 wpm.',
                    'Hence B, by $50 - 45 = 5$ words per minute; the checks: $45 \\times 12 = 540$ and $50 \\times 14 = 700$.',
                  ],
                  answer: 'B, by 5 words per minute',
                },
                {
                  q: 'A car covers 120 km in 2 hours and the next 90 km in 1 hour. Find its average speed for the whole trip, and explain why the plain mean of the two leg speeds fails.',
                  solution: [
                    'Now, the legs run at $120 \\div 2 = 60$ km/h and $90 \\div 1 = 90$ km/h.',
                    'So the whole journey is $120 + 90 = 210$ km in $2 + 1 = 3$ h, and the average speed is $210 \\div 3 = 70$ km/h.',
                    'The plain mean $(60 + 90) \\div 2 = 75$ weights the 2-hour leg and the 1-hour leg equally, but the journey does not: it spent twice as long at 60.',
                    'Hence 70 km/h — and the fraud exposed: $75 \\times 3 = 225$ km, while the car drove 210. Average over the whole, not over the numbers.',
                  ],
                  answer: '70 km/h; the mean 75 ignores the unequal leg times',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-proportion-and-cross-multiplication',
      number: '6.3',
      title: 'Proportion and Cross-Multiplication',
      concepts: [
        'Proportion',
        'Extremes and means',
        'Cross-multiplication law',
        'Fourth proportional',
        'Continued proportion',
        'Mean proportional',
        'Alternendo',
        'Testing and filling',
      ],
      objectives: [
        'State the definition of proportion, write it in the :: notation, and distinguish the statement $a : b :: c : d$ from the two ratios that build it',
        'Prove and apply the cross law — the product of the extremes equals the product of the means — to test any claimed proportion with one multiplication per side',
        'Fill a missing term in any seat of a proportion and solve rate-and-cost problems by proportion, checking against the unit-rate engine',
        'Recognise continued proportion, find the mean and third proportional, and verify claims with $b^2 = ac$',
      ],
      prerequisites: ['fm-ratio-as-a-comparison', 'fm-comparing-fractions', 'fm-rates-and-unit-rates'],
      sources: ['ncert-math6-ch12', 'ncert-math7-ch8', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 6.2 closed with a question. The shop quotes Rs 32 per kg; the pantry\'s sack says 3 kg for Rs 96; a second shelf says 5 kg for Rs 160. Both statements describe one rate, and "the same rate said twice" felt like it deserved a name. It has one, and it is older than any of the chapter\'s machinery: when two ratios agree, the four quantities involved are said to be **in proportion**. The word does precise work here — not the loose "out of proportion" of everyday speech, but a testable claim with a true-or-false answer, the kind of sentence mathematics can bank.',
        },
        {
          kind: 'para',
          text: 'A ratio is a **number** — the answer to "how many times?". A proportion is a **statement** — a sentence built from two ratios and an equality, and sentences can be true or false. The distinction is the old one from Lesson 2.2: $3 + 4$ is an expression (a number waiting to be evaluated), while $3 + 4 = 7$ is an equation (a claim that can be checked). In the same way $3 : 5$ is a ratio — a number — while $3 : 5 :: 6 : 10$ is a proportion — a claim, and in fact a true one. This lesson defines the claim, proves its central law, and turns the law into the working tool that examination papers call **cross-multiplication**.',
        },
        { kind: 'heading', text: 'The definition of proportion' },
        {
          kind: 'para',
          text: 'Start by settling the debt. Are the pantry\'s and the shop\'s statements one rate said twice, or two rates wearing similar clothes? The cross-test of Lesson 6.1 answers in one multiplication per side — and the test is worth an Illustration of its own, because everything this lesson does grows out of it.',
        },
        {
          kind: 'example',
          title: 'Is the pantry\'s $3$ kg for Rs $96$ the same rate as the shop\'s $5$ kg for Rs $160$?',
          steps: [
            'Now, dress both statements as ratios: $96 : 3$ and $160 : 5$.',
            'So the cross products: $96 \\times 5 = 480$ and $3 \\times 160 = 480$ — equal; and reduction says the same, since both ratios carry the simplest name $32 : 1$.',
            'Hence $96 : 3 :: 160 : 5$ — one rate, said twice: the agreement Lesson 6.2 promised has a notation of its own.',
          ],
        },
        {
          kind: 'para',
          text: 'The shop\'s line keeps manufacturing such agreements. For example:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$96 : 3$ reduces to $32 : 1$ — 3 kg for Rs 96.',
            '$160 : 5$ reduces to $32 : 1$ — 5 kg for Rs 160.',
            '$256 : 8$ reduces to $32 : 1$ — 8 kg for Rs 256.',
          ],
        },
        {
          kind: 'para',
          text: 'Three different pairs of numbers, one identical comparison. The ratios $96 : 3$, $160 : 5$ and $256 : 8$ are all names of the single ratio $32 : 1$ — and it is the uniqueness of the simplest form (Lesson 6.1) that makes "they all reduce to the same thing" a legitimate way to say "they are equal". Whenever two ratios are equal, the four terms are said to be in proportion.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Proportion',
          text: 'Four non-zero quantities $a$, $b$, $c$, $d$, taken in order, are said to be **in proportion** if the ratio of the first two equals the ratio of the last two — that is, if $a : b = c : d$. The statement is written $a : b :: c : d$, read "$a$ is to $b$ **as** $c$ is to $d$", and it is a **sentence**, not a number: it is true or false. Thus, $3 : 5 :: 6 : 10$ is a true sentence — both ratios are $3 : 5$ — while $5 : 3 :: 6 : 10$ is a false one.',
        },
        {
          kind: 'equation',
          latex: 'a : b :: c : d \\;\\Longleftrightarrow\\; \\tfrac{a}{b} = \\tfrac{c}{d} \\qquad (a, b, c, d \\neq 0)',
          note: 'The double colon is the traditional print for "as": it asserts that the two ratios around it agree. The order of all four terms is part of the claim — each ratio keeps its own first-and-second, and swapping any two terms produces a different sentence to check.',
        },
        {
          kind: 'para',
          text: 'The order warning deserves one worked glance, because it is the commonest slip in the topic. The claim $3 : 5 :: 6 : 10$ is true: $3 : 5$ is already simplest, $6 : 10$ reduces to $3 : 5$, agreement. Flip the first ratio and the claim becomes $5 : 3 :: 6 : 10$ — now the left side reads "five for every three" and the right "three for every five", opposite instructions. No simplification rescues them: $5 : 3$ is in lowest terms and $6 : 10$ is $3 : 5$, and $\\tfrac{5}{3} \\neq \\tfrac{3}{5}$. The sentence is false — same four numbers, different order, different truth.',
        },
        {
          kind: 'figure',
          caption:
            'One statement, four seats. In the proportion $a : b :: c : d$ the four quantities sit in a fixed order: $a$ first, $b$ second, $c$ third, $d$ fourth. The outer pair $(a, d)$ — the extremes — and the inner pair $(b, c)$ — the means — are the two couples the cross law is about to multiply. The statement itself is a sentence: true for $3 : 5 :: 6 : 10$, false for $5 : 3 :: 6 : 10$.',
          svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The proportion a is to b as c is to d shown as four boxes in a fixed order, with the extremes a and d bracketed above by a dashed arc, the means b and c bracketed below by a dashed arc, and the cross law a times d equals b times c printed underneath">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="358" y="44">the extremes — the outer pair (a, d)</text>
    <text x="118" y="157" font-size="21" font-style="italic">a</text>
    <text x="198" y="156" font-size="18">:</text>
    <text x="278" y="157" font-size="21" font-style="italic">b</text>
    <text x="358" y="156" font-size="18">::</text>
    <text x="438" y="157" font-size="21" font-style="italic">c</text>
    <text x="518" y="156" font-size="18">:</text>
    <text x="598" y="157" font-size="21" font-style="italic">d</text>
    <text x="118" y="216" font-size="12">first</text>
    <text x="278" y="216" font-size="12">second</text>
    <text x="438" y="216" font-size="12">third</text>
    <text x="598" y="216" font-size="12">fourth</text>
    <text x="358" y="254">the means — the inner pair (b, c)</text>
    <text x="358" y="300" font-size="14" font-weight="bold">the cross law:  a × d  =  b × c  (the products agree)</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <rect x="60" y="120" width="116" height="60" />
    <rect x="220" y="120" width="116" height="60" />
    <rect x="380" y="120" width="116" height="60" />
    <rect x="540" y="120" width="116" height="60" />
    <path d="M 118 106 Q 358 56 598 106" stroke-dasharray="4 3" />
    <path d="M 278 192 Q 358 228 438 192" stroke-dasharray="4 3" />
  </g>
</svg>`,
        },
        { kind: 'heading', text: 'Extremes, means and the cross law' },
        {
          kind: 'para',
          text: 'The four seats have names, and figure 1 pinned them: in $a : b :: c : d$, the outer terms $a$ and $d$ are the **extremes** and the inner terms $b$ and $c$ are the **means**. The names earn their keep through the theorem that makes proportion useful — the theorem every examination paper calls cross-multiplication.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The cross law',
          text: 'In any proportion, the product of the extremes equals the product of the means. Thus, $a : b :: c : d$ holds **exactly when** $a \\times d = b \\times c$ — and either half of that double arrow proves the other.',
        },
        {
          kind: 'derivation',
          title: 'The cross law, in both directions',
          statement:
            'Claim: for non-zero $a, b, c, d$, the ratios agree — $a : b :: c : d$ — **if and only if** the products agree: $ad = bc$.',
          steps: [
            {
              label: 'Forward: products from ratios',
              formula: '\\tfrac{a}{b} = \\tfrac{c}{d} \\;\\xrightarrow{\\;\\times\\, bd\\;}\\; \\tfrac{a}{b} \\cdot bd = \\tfrac{c}{d} \\cdot bd',
              explanation:
                'Both sides multiply by the same non-zero $bd$ — the balance licence of Lesson 2.2. On the left the $b$ cancels and $ad$ remains; on the right the $d$ cancels and $bc$ remains. The products agree.',
            },
            {
              label: 'Backward: ratios from products',
              formula: 'ad = bc \\;\\xrightarrow{\\;\\div\\, bd\\;}\\; \\tfrac{ad}{bd} = \\tfrac{bc}{bd}',
              explanation:
                'Both sides divide by the same non-zero $bd$ — legal because no term is zero. The left simplifies to $\\tfrac{a}{b}$ and the right to $\\tfrac{c}{d}$: the ratios agree again. Products agreeing forces ratios agreeing.',
            },
            {
              label: 'The iff closes',
              formula: 'a : b :: c : d \\;\\Longleftrightarrow\\; ad = bc',
              explanation:
                'Each direction was proved separately, so the arrow holds both ways: "the ratios agree" and "the products agree" are one statement in two dresses. Cross-multiplying is the forward half; the backward half is what lets a missing term be recovered a few paragraphs from here.',
            },
          ],
          result:
            '$a : b :: c : d \\Longleftrightarrow ad = bc$ — to test a proportion, one multiplication per side; to build or repair one, solve the product equation.',
        },
        {
          kind: 'formula',
          name: 'The cross law',
          latex: 'a : b :: c : d \\;\\Longleftrightarrow\\; a\\,d = b\\,c \\qquad (a, b, c, d \\neq 0)',
          note: 'Product of the extremes = product of the means. One multiplication on each side replaces two simplifications — and it keeps working when the terms are decimals or fractions, where "reduce both ratios" may be awkward.',
        },
        {
          kind: 'para',
          text: 'The law turns testing into arithmetic. Each row below is a claimed proportion; the two product columns must agree for the claim to survive.',
        },
        {
          kind: 'table',
          head: ['Claimed proportion', 'Extremes ($a \\times d$)', 'Means ($b \\times c$)', 'Verdict'],
          rows: [
            ['$8 : 12 :: 10 : 15$', '$8 \\times 15 = 120$', '$12 \\times 10 = 120$', 'in proportion — both ratios are $2 : 3$'],
            ['$21 : 14 :: 33 : 22$', '$21 \\times 22 = 462$', '$14 \\times 33 = 462$', 'in proportion — both ratios are $3 : 2$'],
            ['$9 : 4 :: 27 : 12$', '$9 \\times 12 = 108$', '$4 \\times 27 = 108$', 'in proportion — both ratios are $9 : 4$'],
            ['$6 : 10 :: 9 : 16$', '$6 \\times 16 = 96$', '$10 \\times 9 = 90$', 'not in proportion — $96 \\neq 90$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Multiply the terms in their printed seats',
          text: 'The cross law multiplies first-with-fourth and second-with-third **as printed**. Flipping one ratio silently changes the claim: $3 : 5 :: 6 : 10$ is true, but $3 : 5 :: 10 : 6$ is false — the products become $3 \\times 6 = 18$ and $5 \\times 10 = 50$. Before multiplying, read the sentence in its order: first, second, third, fourth.',
        },
        { kind: 'heading', text: 'The cross law at work: testing and filling' },
        {
          kind: 'para',
          text: 'Two working moves come out of the derivation, and both are one-glance jobs. **Testing** — is the claimed proportion true? Multiply each side\'s couple; equal products say yes. **Filling** — three terms of a proportion are known; the fourth follows from the cross law by one division. The two Illustrations that follow exercise the test in both moods.',
        },
        {
          kind: 'example',
          title: 'Are $45 : 63$ and $35 : 49$ in proportion?',
          steps: [
            'Now, the products: the extremes give $45 \\times 49 = 2205$, the means give $63 \\times 35 = 2205$.',
            'So the products agree — and reduction says the same: $45 : 63 = 5 : 7$ and $35 : 49 = 5 : 7$, the same ratio twice.',
            'Hence $45 : 63 :: 35 : 49$ — in proportion.',
          ],
        },
        {
          kind: 'example',
          title: 'Are $30 : 42$ and $24 : 35$ in proportion?',
          steps: [
            'Now, the products: $30 \\times 35 = 1050$, while $42 \\times 24 = 1008$.',
            'So the products disagree — $1050 \\neq 1008$; and reduction confirms the verdict: $30 : 42 = 5 : 7$, but $24 : 35$ is already in lowest terms.',
            'Hence not in proportion — the two ratios are strangers.',
          ],
        },
        {
          kind: 'para',
          text: 'Filling is the same law read backwards. Suppose $a : b = c : x$ with the fourth term unknown. The cross law gives $ax = bc$, and dividing by $a$ — legal, since $a \\neq 0$ — hands over the stranger:',
        },
        {
          kind: 'equation',
          latex: 'a : b = c : x \\;\\Longrightarrow\\; x = \\tfrac{b\\,c}{a}',
          note: 'The missing term is the means\' product divided by the term opposite it. Every seat has its own dress of the same division — the unknown may sit first, second, third or fourth, but the products $ad$ and $bc$ do not care which seat hides the blank.',
        },
        {
          kind: 'example',
          title: 'Fill the missing term: $8 : 12 = 10 : \\square$.',
          steps: [
            'Now, the cross law: $8 \\times \\square = 12 \\times 10 = 120$.',
            'So $\\square = 120 \\div 8 = 15$; the check by reduction: $8 : 12 = 2 : 3$ and $10 : 15 = 2 : 3$.',
            'Hence $8 : 12 = 10 : 15$.',
          ],
        },
        {
          kind: 'example',
          title: 'The first, second and third terms of a proportion are $6$, $9$ and $12$. Find the fourth.',
          steps: [
            'Now, the claim is $6 : 9 = 12 : x$, and the cross law says $6x = 9 \\times 12 = 108$.',
            'So $x = 108 \\div 6 = 18$; the check: $6 : 9 = 2 : 3$ and $12 : 18 = 2 : 3$.',
            'Hence the fourth term is $18$, and $6 : 9 :: 12 : 18$.',
          ],
        },
        {
          kind: 'example',
          title: 'The second, third and fourth terms of a proportion are $24$, $30$ and $45$. Find the first.',
          steps: [
            'Now, the unknown sits in the first seat: $x : 24 = 30 : 45$, so the cross law says $45x = 24 \\times 30 = 720$.',
            'So $x = 720 \\div 45 = 16$; the check: $16 : 24 = 2 : 3$ and $30 : 45 = 2 : 3$.',
            'Hence the first term is $16$, and $16 : 24 :: 30 : 45$.',
          ],
        },
        {
          kind: 'para',
          text: 'The fill engine is the unit-rate engine of Lessons 5.3 and 6.2 in a third dress. To fill $8 : 12 = 10 : \\square$, the ratio itself says $\\square = 10 \\times \\tfrac{12}{8} = 15$ — the same scaling the unit rate performs. The cross law is simply the version that survives when the numbers turn unfriendly: no scale factor leaps out of $45x = 720$, but the division still does. And the engine doubles as a gatekeeper: a rival stall\'s 4 kg for Rs 120 fails it — $120 : 4 = 30$, not $32$ — so that pair does not sit on the shop\'s line.',
        },
        { kind: 'heading', text: 'Swapping the seats: alternendo and invertendo' },
        {
          kind: 'para',
          text: 'A true proportion stays true under two seat swaps, and both are free theorems — consequences of the cross law, not new laws. **Alternendo** swaps the means: from $a : b :: c : d$ it follows that $a : c :: b : d$. Why? Cross-multiply the new claim: $a \\times d$ against $c \\times b$ — the same two products the original proportion declared equal. **Invertendo** flips both ratios: from $a : b :: c : d$ it follows that $b : a :: d : c$, and the cross products $b \\times c$ and $a \\times d$ are again unchanged. The products cannot tell that the seats have been rearranged.',
        },
        {
          kind: 'para',
          text: 'One anchor, both theorems: $3 : 5 :: 6 : 10$ is true. Alternendo gives $3 : 6 :: 5 : 10$ — and indeed both sides reduce to $1 : 2$. Invertendo gives $5 : 3 :: 10 : 6$ — both sides are $5 : 3$. The proofs are two lines each precisely because the cross law compresses everything a proportion says into one equation $ad = bc$; any rearrangement whose cross products are still $ad$ and $bc$ inherits the truth for free.',
        },
        { kind: 'heading', text: 'Continued proportion, the mean and the third proportional' },
        {
          kind: 'para',
          text: 'Three quantities can share the agreement too. $a$, $b$ and $c$ are said to be in **continued proportion** when $a : b = b : c$ — the middle term serves as second term of the left ratio and first term of the right. Written with the double colon, $a : b :: b : c$: the mean seat is occupied by $b$ **twice**, and that repetition is exactly what makes the family solvable.',
        },
        {
          kind: 'para',
          text: 'The cross law collapses the claim at once. $a : b :: b : c$ has extremes $a$ and $c$ and means $b$ and $b$, so it says $ac = b^2$: the middle term is the number whose square is the product of the outer two — the **mean proportional** between them, $b = \\sqrt{ac}$ whenever the product is a perfect square (the square-root machinery of chapter 3, which closed its factor walks at exactly this barrier). A proportional models a quantity, so the mean proportional is taken positive, even though the equation $b^2 = ac$ also has a negative algebraic root.',
        },
        {
          kind: 'formula',
          name: 'The mean proportional',
          latex: 'a : b :: b : c \\;\\Longleftrightarrow\\; b^2 = a\\,c, \\quad b = \\sqrt{ac} > 0',
          note: 'The middle term of a continued proportion is the mean proportional: it sits in both mean seats, and its square is the product of the extremes. Between 4 and 25 it is 10 — since $4 : 10 = 2 : 5 = 10 : 25$.',
        },
        {
          kind: 'example',
          title: 'Find the mean proportional between $8$ and $50$.',
          steps: [
            'Now, the mean proportional $b$ obeys $b^2 = 8 \\times 50 = 400$.',
            'So $b = \\sqrt{400} = 20$ — the positive root, since a proportional is a quantity; and the check: $8 : 20 = 2 : 5 = 20 : 50$.',
            'Hence the mean proportional is $20$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The mean proportional is not the average',
          text: 'Between 5 and 45 the ordinary average is $(5 + 45) \\div 2 = 25$, but the mean proportional is $\\sqrt{5 \\times 45} = 15$ — and only $15$ finishes the chain: $5 : 15 = 1 : 3 = 15 : 45$, while $5 : 25$ is $1 : 5$ and $25 : 45$ is $5 : 9$, which do not agree. Averages add; proportions multiply.',
        },
        {
          kind: 'para',
          text: 'The same continued shape hides a second engine. In $a : b :: b : x$ the unknown is the **third proportional** to $a$ and $b$: the extremes are $a$ and $x$, the means are $b$ and $b$, and the cross law gives $ax = b^2$, so $x = \\tfrac{b^2}{a}$. To 4 and 6, for instance, the third proportional is $\\tfrac{36}{4} = 9$ — the chain $4 : 6 = 6 : 9$ closes.',
        },
        {
          kind: 'formula',
          name: 'The third proportional',
          latex: 'a : b :: b : x \\;\\Longrightarrow\\; x = \\tfrac{b^2}{a} \\qquad (a \\neq 0)',
          note: 'The third proportional to $a$ and $b$ completes the chain $a : b = b : x$: the product of the extremes must equal $b \\times b$. To 4 and 6 it is 9 — since $4 : 6 = 2 : 3 = 6 : 9$.',
        },
        {
          kind: 'example',
          title: 'Find the third proportional to $8$ and $12$.',
          steps: [
            'Now, the chain is $8 : 12 = 12 : x$, and the cross law says $8x = 12 \\times 12 = 144$.',
            'So $x = 144 \\div 8 = 18$; the check: $8 : 12 = 2 : 3$ and $12 : 18 = 2 : 3$.',
            'Hence the third proportional is $18$, and $8 : 12 :: 12 : 18$.',
          ],
        },
        { kind: 'heading', text: 'Proportion at work' },
        {
          kind: 'para',
          text: 'Every "at the same rate" problem is a proportion wearing a story. The rate line of Lesson 6.2 — the shop\'s Rs 32 per kg — is a factory of them: pick any two points on the line and the quantity pair is in proportion with the price pair, because both reduce to the same $32 : 1$. Figure 2 draws the line and two of its agreements.',
        },
        {
          kind: 'figure',
          caption:
            'The line of agreement. The shop\'s rice runs at Rs 32 per kg, so every kilogram tick locks to its price tick: 3 kg to Rs 96, 5 kg to Rs 160, 8 kg to Rs 256. Any two pairs on the line are in proportion — the brackets read $3 : 5 :: 96 : 160$ and $5 : 8 :: 160 : 256$, each verified by the cross law ($96 \\times 5 = 480 = 3 \\times 160$; $160 \\times 8 = 1280 = 5 \\times 256$). A pair off the line fails the same test: 4 kg for Rs 120 gives $120 : 4 = 30 \\neq 32$, which is why the line demands 128 there.',
          svg: `<svg viewBox="0 0 760 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shop's rate line at thirty-two rupees per kilogram drawn as two locked rulers: kilograms zero to eight above, rupees zero to two hundred fifty-six below, with brackets showing three to five is as ninety-six to one hundred sixty and five to eight is as one hundred sixty to two hundred fifty-six">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="380" y="30" font-weight="bold">one rate line — every pair on it in proportion (Rs 32 per kg)</text>
    <text x="60" y="64">0</text>
    <text x="140" y="64">1</text>
    <text x="220" y="64">2</text>
    <text x="300" y="64">3</text>
    <text x="380" y="64">4</text>
    <text x="460" y="64">5</text>
    <text x="540" y="64">6</text>
    <text x="620" y="64">7</text>
    <text x="700" y="64">8</text>
    <text x="380" y="46" font-size="11">kg</text>
    <text x="60" y="300">0</text>
    <text x="140" y="300">32</text>
    <text x="220" y="300">64</text>
    <text x="300" y="300">96</text>
    <text x="380" y="300">128</text>
    <text x="460" y="300">160</text>
    <text x="540" y="300">192</text>
    <text x="620" y="300">224</text>
    <text x="700" y="300">256</text>
    <text x="380" y="362">3 : 5 :: 96 : 160</text>
    <text x="580" y="362">5 : 8 :: 160 : 256</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <line x1="60" y1="84" x2="700" y2="84" />
    <line x1="60" y1="276" x2="700" y2="276" />
    <line x1="60" y1="84" x2="60" y2="276" stroke-dasharray="2 5" />
    <line x1="140" y1="84" x2="140" y2="276" stroke-dasharray="2 5" />
    <line x1="220" y1="84" x2="220" y2="276" stroke-dasharray="2 5" />
    <line x1="300" y1="84" x2="300" y2="276" stroke-dasharray="2 5" />
    <line x1="380" y1="84" x2="380" y2="276" stroke-dasharray="2 5" />
    <line x1="460" y1="84" x2="460" y2="276" stroke-dasharray="2 5" />
    <line x1="540" y1="84" x2="540" y2="276" stroke-dasharray="2 5" />
    <line x1="620" y1="84" x2="620" y2="276" stroke-dasharray="2 5" />
    <line x1="700" y1="84" x2="700" y2="276" stroke-dasharray="2 5" />
    <line x1="300" y1="336" x2="460" y2="336" />
    <line x1="300" y1="336" x2="300" y2="342" />
    <line x1="460" y1="336" x2="460" y2="342" />
    <line x1="460" y1="336" x2="700" y2="336" />
    <line x1="700" y1="336" x2="700" y2="342" />
  </g>
  <g fill="currentColor">
    <circle cx="300" cy="84" r="4" />
    <circle cx="460" cy="84" r="4" />
    <circle cx="700" cy="84" r="4" />
    <circle cx="300" cy="276" r="4" />
    <circle cx="460" cy="276" r="4" />
    <circle cx="700" cy="276" r="4" />
  </g>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Five kg of tea costs Rs $480$. What do $8$ kg cost at the same rate?',
          steps: [
            'Now, the proportion: $8 : 5 = x : 480$ — the quantities in the first ratio, the prices in the second — and the cross law says $5x = 8 \\times 480 = 3840$.',
            'So $x = 3840 \\div 5 = 768$; the unit-rate engine agrees: Rs $480 \\div 5 = 96$ per kg, and $96 \\times 8 = 768$.',
            'Hence 8 kg cost Rs 768 — the cross law and the one-part engine return the same answer, as they must.',
          ],
        },
        {
          kind: 'para',
          text: 'The same test that fills answers refuses false ones. A rival stall sells 4 kg for Rs 120 — is that the shop\'s rate in disguise? $120 : 4 = 30$, and $30 \\neq 32$: not in proportion, so the "same rate" claim is false (the off-line pair on figure 2). Proportion is thus a two-sided tool: it extends a trusted rate to new sizes, and it polices claims that borrow the rate\'s name. The exercises carry the pattern into rice and recipes — and one observation points forward: the line of figure 2 did more than host pairs in proportion, it forced the quantities to grow **together** — double the rice, double the price, no exceptions. When two quantities are locked to one line like that, each is said to **vary directly** as the other, and that lock has laws of its own: the business of Lesson 6.4.',
        },
        { kind: 'heading', text: 'Properties of proportions' },
        {
          kind: 'para',
          text: 'From the discussion above, the working properties collect into one list — each with a verified instance.',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            '**A proportion is a statement, not a number.** $3 : 5 :: 6 : 10$ is a sentence (true); $5 : 3 :: 6 : 10$ is a sentence (false). The ratios inside are numbers; the proportion is a claim about them.',
            '**Order is part of the claim.** $8 : 12 :: 10 : 15$ holds ($120 = 120$); flipping the means to $8 : 12 :: 15 : 10$ breaks it — the products become $8 \\times 10 = 80$ and $12 \\times 15 = 180$.',
            '**Alternendo — swap the means.** $3 : 5 :: 6 : 10$ gives $3 : 6 :: 5 : 10$; both sides are $1 : 2$. The cross products $3 \\times 10$ and $5 \\times 6$ never moved.',
            '**Invertendo — flip both ratios.** $3 : 5 :: 6 : 10$ gives $5 : 3 :: 10 : 6$; both sides are $5 : 3$. Same products, new dresses.',
            '**The cross law runs both ways.** It tests ($45 \\times 49 = 63 \\times 35$, so $45 : 63 :: 35 : 49$) and it fills ($45x = 720$ gave $x = 16$) — one law, two jobs.',
            '**The mean proportional sits in both mean seats.** $8 : 20 :: 20 : 50$: the middle term appears twice, and $20^2 = 400 = 8 \\times 50$.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Proportion in the examination hall',
          text: 'Proportion items are permanent fixtures of SSC CGL and CHSL, banking prelims, RRB NTPC, CUET and NTSE — and the shapes are few: test whether four given terms are in proportion (the cross law, one multiplication per side); fill a missing term in any seat (the products $ad = bc$, one division); name the extremes and means of a given proportion; find the mean proportional between two numbers ($b = \\sqrt{ac}$) or the third proportional to a pair ($x = b^2/a$); and word problems that extend a known rate — cost per kg, cups per guest, the scale of a map. The canon behind them: the definition, notation and extremes–means law of NCERT class-6 chapter 12 (§12.2 with Exercise 12.2 — the unitary method of Exercise 12.3 was banked in Lesson 6.2), the equivalent-ratio bridge of NCERT class-7 chapter 8, and the ratio–proportion staples of Khattar\'s Quantitative Aptitude. No past-paper question is reproduced here; the drills above are built in the same shapes.',
        },
        {
          kind: 'para',
          text: 'The cross law, then, is the chapter\'s centre of gravity so far: Lesson 4.1 borrowed it as a licence, Lesson 4.2 proved it for fractions, Lesson 6.1 wore it testing equivalent ratios, and this lesson made it the very definition of agreement. Proportion is the chapter\'s third instrument — after the ratio (a number) and the rate (a number with units), the proportion (a sentence that can be certified). What remains is to watch the instruments work in bulk: when a whole table of quantities rides one line, as figure 2\'s shop does, the agreement stops being a coincidence and becomes a law of the quantities themselves.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Proportion',
              def: 'The statement that two ratios are equal, written $a : b :: c : d$ ("a is to b as c is to d"); a true-or-false sentence, not a number — true exactly when the product of the extremes equals the product of the means.',
            },
            {
              term: 'Extremes',
              def: 'The first and fourth terms of a proportion — $a$ and $d$ in $a : b :: c : d$; the outer pair whose product must equal the means\' product for the claim to hold.',
            },
            {
              term: 'Means',
              def: 'The second and third terms of a proportion — $b$ and $c$ in $a : b :: c : d$; the inner pair, and in a continued proportion the same term occupies both mean seats.',
            },
            {
              term: 'Fourth proportional',
              def: 'The missing fourth term $x$ of $a : b = c : x$, given by $x = bc/a$; the fill engine of the cross law, and the unit-rate engine\'s third dress.',
            },
            {
              term: 'Continued proportion',
              def: 'Three quantities $a$, $b$, $c$ with $a : b = b : c$ — the middle term repeated, so the claim collapses to $b^2 = ac$.',
            },
            {
              term: 'Mean proportional',
              def: 'The positive number $b$ with $b^2 = ac$, sitting in both mean seats of $a : b :: b : c$; not the arithmetic average — between 5 and 45 it is 15, not 25.',
            },
            {
              term: 'Third proportional',
              def: 'The number $x$ completing the chain $a : b = b : x$; given by $x = b^2/a$ — to 8 and 12 it is 18.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which statement is a TRUE proportion?',
              options: [
                '$3 : 5 :: 6 : 10$ — the cross products both give 30',
                '$5 : 3 :: 6 : 10$ — the first ratio flipped',
                '$3 : 5 :: 10 : 6$ — the second ratio flipped',
                '$2 : 3 :: 9 : 6$ — the terms rearranged',
              ],
              answer: 0,
              explain:
                'Testing each claim with one multiplication per side: $3 \\times 10 = 30 = 5 \\times 6$ (Option 1 holds). Option 2 needs $5 \\times 10 = 50$ to equal $3 \\times 6 = 18$ — false. Option 3 needs $3 \\times 6 = 18$ to equal $5 \\times 10 = 50$ — false. Option 4 needs $2 \\times 6 = 12$ to equal $3 \\times 9 = 27$ — false.',
            },
            {
              q: 'In the proportion $7 : 12 :: 21 : 36$, the means are',
              options: ['7 and 36', '12 and 21', '7 and 12', '21 and 36'],
              answer: 1,
              explain:
                'The means are the inner pair — the second and third terms: 12 and 21 (Option 2). Option 1 names the extremes; Options 3 and 4 name the two ratios\' own terms. The claim is true because the products agree identically: $7 \\times 36 = 252 = 12 \\times 21$.',
            },
            {
              q: 'Fill the missing term: $9 : 12 = 15 : \\square$',
              options: ['18', '22', '20', '24'],
              answer: 2,
              explain:
                'The cross law: $9 \\times \\square = 12 \\times 15 = 180$, so $\\square = 20$ (Option 3) — and indeed $9 : 12 = 3 : 4 = 15 : 20$. Option 1 added 3 to 15, as if the ratio added; Option 4 doubled the 12 instead of scaling by $\\tfrac{15}{9} = \\tfrac{5}{3}$; Option 2 is arithmetic out of thin air.',
            },
            {
              q: 'The mean proportional between 5 and 45 is',
              options: ['9', '25', '225', '15'],
              answer: 3,
              explain:
                'The mean proportional obeys $b^2 = 5 \\times 45 = 225$, so $b = 15$ (Option 4), and $5 : 15 = 1 : 3 = 15 : 45$. Option 1 is the ratio $45 \\div 5$; Option 2 is the arithmetic average $(5 + 45) \\div 2$ — averages add, proportions multiply; Option 3 is the product itself, its square root forgotten.',
            },
            {
              q: 'The second, third and fourth terms of a proportion are 18, 24 and 36. The first term is',
              options: ['10', '14', '12', '16'],
              answer: 2,
              explain:
                'The claim is $x : 18 = 24 : 36$, so the cross law says $36x = 18 \\times 24 = 432$ and $x = 12$ (Option 3); the check: $12 : 18 = 2 : 3 = 24 : 36$. Each wrong option fails the same law: $36 \\times 10 = 360$, $36 \\times 14 = 504$, $36 \\times 16 = 576$ — none is 432.',
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
                  q: 'Test whether $6 : 8$ and $21 : 28$ are in proportion.',
                  solution: [
                    'Now, the cross law: the extremes give $6 \\times 28 = 168$, the means give $8 \\times 21 = 168$.',
                    'So the products agree; reduction confirms: $6 : 8 = 3 : 4$ and $21 : 28 = 3 : 4$.',
                    'Hence in proportion — $6 : 8 :: 21 : 28$.',
                  ],
                  answer: 'Yes — both ratios are 3 : 4',
                },
                {
                  q: 'Test whether $5 : 7$ and $35 : 48$ are in proportion.',
                  solution: [
                    'Now, the products: $5 \\times 48 = 240$, while $7 \\times 35 = 245$.',
                    'So the products disagree — $240 \\neq 245$; and no reduction rescues the pair, since both ratios are already in lowest terms.',
                    'Hence not in proportion.',
                  ],
                  answer: 'No — 240 ≠ 245',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Fill the missing term: $8 : 12 = 14 : \\square$.',
                  solution: [
                    'Now, the cross law: $8 \\times \\square = 12 \\times 14 = 168$.',
                    'So $\\square = 168 \\div 8 = 21$; the check: $8 : 12 = 2 : 3$ and $14 : 21 = 2 : 3$.',
                    'Hence $8 : 12 = 14 : 21$.',
                  ],
                  answer: '21',
                },
                {
                  q: 'In the proportion $9 : 15 :: 24 : 40$, name the extremes and the means, and verify the cross law.',
                  solution: [
                    'Now, the extremes are the outer pair $9$ and $40$; the means are the inner pair $15$ and $24$.',
                    'So the products: extremes $9 \\times 40 = 360$; means $15 \\times 24 = 360$ — equal.',
                    'Hence verified: $9 : 15 :: 24 : 40$ — both ratios are $3 : 5$.',
                  ],
                  answer: 'Extremes 9 and 40; means 15 and 24; both products 360',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The first, second and third terms of a proportion are 12, 16 and 21. Find the fourth term.',
                  solution: [
                    'Now, the claim is $12 : 16 = 21 : x$, and the cross law says $12x = 16 \\times 21 = 336$.',
                    'So $x = 336 \\div 12 = 28$; the check: $12 : 16 = 3 : 4$ and $21 : 28 = 3 : 4$.',
                    'Hence the fourth term is $28$.',
                  ],
                  answer: '28',
                },
                {
                  q: 'The first, second and fourth terms of a proportion are 10, 25 and 55. Find the third term.',
                  solution: [
                    'Now, the unknown sits in the third seat: $10 : 25 = x : 55$, so the cross law says $25x = 10 \\times 55 = 550$.',
                    'So $x = 550 \\div 25 = 22$; the check: $10 : 25 = 2 : 5$ and $22 : 55 = 2 : 5$.',
                    'Hence the third term is $22$.',
                  ],
                  answer: '22',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Find the mean proportional between 7 and 63.',
                  solution: [
                    'Now, the mean proportional $b$ obeys $b^2 = 7 \\times 63 = 441$.',
                    'So $b = \\sqrt{441} = 21$; the check: $7 : 21 = 1 : 3 = 21 : 63$.',
                    'Hence the mean proportional is $21$.',
                  ],
                  answer: '21',
                },
                {
                  q: 'Six kg of rice costs Rs 210. What do 15 kg cost at the same rate?',
                  solution: [
                    'Now, the proportion: $15 : 6 = x : 210$, and the cross law says $6x = 15 \\times 210 = 3150$.',
                    'So $x = 3150 \\div 6 = 525$; the unit-rate engine agrees: Rs $210 \\div 6 = 35$ per kg, and $35 \\times 15 = 525$.',
                    'Hence 15 kg cost Rs 525.',
                  ],
                  answer: 'Rs 525',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Find the third proportional to 12 and 18.',
                  solution: [
                    'Now, the chain is $12 : 18 = 18 : x$, and the cross law says $12x = 18 \\times 18 = 324$.',
                    'So $x = 324 \\div 12 = 27$; the check: $12 : 18 = 2 : 3$ and $18 : 27 = 2 : 3$.',
                    'Hence the third proportional is $27$.',
                  ],
                  answer: '27',
                },
                {
                  q: 'A recipe for 6 people uses 9 cups of flour. How much flour feeds 14 people at the same rate?',
                  solution: [
                    'Now, the proportion: $14 : 6 = x : 9$, and the cross law says $6x = 14 \\times 9 = 126$.',
                    'So $x = 126 \\div 6 = 21$; the per-person engine agrees: $9 \\div 6 = 1.5$ cups each, and $1.5 \\times 14 = 21$.',
                    'Hence 21 cups.',
                  ],
                  answer: '21 cups',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The mean proportional between two numbers is 20, and one of the numbers is 16. Find the other number.',
                  solution: [
                    'Now, the mean proportional obeys $20^2 = 16 \\times c$, so $16c = 400$.',
                    'So $c = 400 \\div 16 = 25$; the check: $16 : 20 = 4 : 5 = 20 : 25$.',
                    'Hence the other number is $25$.',
                  ],
                  answer: '25',
                },
                {
                  q: 'Prove alternendo: if $a : b = c : d$, then $a : c = b : d$. Verify the theorem on $3 : 5 :: 6 : 10$.',
                  solution: [
                    'Now, the hypothesis says, by the cross law, $ad = bc$.',
                    'So consider the new claim $a : c :: b : d$: its cross products are $a \\times d$ and $c \\times b$ — the same two numbers the hypothesis declared equal. The claim holds.',
                    'Verify: $3 : 5 :: 6 : 10$ has products $3 \\times 10 = 30$ and $5 \\times 6 = 30$; the swapped claim $3 : 6 :: 5 : 10$ has the same products — and both sides reduce to $1 : 2$.',
                    'Hence alternendo: the means may trade seats, because the cross products cannot tell.',
                  ],
                  answer: 'Proved — the cross products ad = bc serve the swapped claim too; 3 : 6 :: 5 : 10 checks',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-direct-and-inverse-variation',
      number: '6.4',
      title: 'Direct and Inverse Variation',
      concepts: [
        'Direct variation',
        'Constant of variation',
        'Inverse variation',
        'Constant product',
        'Factor method',
        'The flip',
        'Person-days',
        'Recognition drill',
      ],
      objectives: [
        'State the definition of direct variation ($y/x = k$) and inverse variation ($xy = k$), and write both in the proportionality notation $\\propto$',
        'Certify which lock binds a table or a story — the constant-ratio test against the constant-product test — and refuse the grows-together fraud',
        'Extend a certified direct rate and solve fixed-total problems by the constant product, the factor method and the flip, checking every answer against the fixed thing',
        'Connect the chapter: the unit rate as $k$, the cross law inside the flip, and the line and hyperbola as the two graphs of the two locks',
      ],
      prerequisites: ['fm-rates-and-unit-rates', 'fm-proportion-and-cross-multiplication', 'fm-ratio-as-a-comparison'],
      sources: ['ncert-math8-ch13', 'ncert-math6-ch12', 'ncert-math7-ch8', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 6.3 ended with a refusal. A rival stall\'s 4 kg for Rs 120 looks like the shop\'s business — more rice, more rupees, both growing — but the cross law expelled it: $120 : 4 = 30$, and $30 \\neq 32$. The refusal deserves a name, because what it refused is a pattern with teeth. The shop\'s own pairs — 96 for 3, 160 for 5, 256 for 8 — do not merely grow together; they grow **in step**, every one of them carrying the same per-kg number 32. When two quantities grow in step like that — when their ratio is not merely similar but *identical at every size* — each is said to **vary directly** as the other. And the chapter has not yet met its second lock: sometimes what stays fixed is not the ratio but the **product** — a fixed journey shared between speed and time, a fixed job shared between workers and days. This lesson names both locks, proves their laws, and drills the question every examination paper asks about them: *which one am I looking at?*',
        },
        { kind: 'heading', text: 'The definition of direct variation' },
        {
          kind: 'para',
          text: 'Begin where Lesson 6.2 began, at the shop\'s counter — but look at the whole line at once, not one pair at a time.',
        },
        {
          kind: 'example',
          title: 'The shop sells rice at Rs $32$ per kg. Show that every pair of quantities on its price line agrees in the same way.',
          steps: [
            'Now, list the line\'s pairs — quantity against price: $1 : 32$, $3 : 96$, $5 : 160$, $8 : 256$.',
            'So divide each: $96 \\div 3 = 32$, $160 \\div 5 = 32$, $256 \\div 8 = 32$ — one number, every time.',
            'Hence every pair carries the same per-kg value $32$; the ratio of price to quantity is **constant along the whole line** — which is exactly why any two of its pairs sit in proportion (the cross law certified $96 : 3 :: 160 : 5$ in Lesson 6.3).',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Direct variation',
          text: 'A quantity $y$ is said to **vary directly as** a quantity $x$ if the ratio $y/x$ stays equal to one fixed number $k$ as the quantities change together. The fixed number $k$ is the **constant of variation**. In symbols the claim is written $y \\propto x$ — read "$y$ varies directly as $x$" — and it holds exactly when every pair of corresponding values satisfies $y_1/x_1 = y_2/x_2$.',
        },
        {
          kind: 'equation',
          latex: 'y \\propto x \\;\\Longleftrightarrow\\; \\frac{y}{x} = k \\ \\ (k \\neq 0) \\;\\Longleftrightarrow\\; \\frac{y_1}{x_1} = \\frac{y_2}{x_2}',
          note: 'Three dresses of one claim: the proportionality sign, the constant $k$, and the two-pair test. For the shop\'s rice, $k = 32$ — the unit rate of Lesson 6.2 wearing its formal name. A constant of variation is a unit rate, and a unit rate is a constant of variation; the lessons of this chapter have been circling one idea.',
        },
        {
          kind: 'para',
          text: 'The notation earns its keep by what it forbids. $y \\propto x$ is a **claim about a whole table of pairs**, not a compliment paid to one pair: the off-line stall\'s $120 : 4$ can no more join the shop\'s direct variation than a stranger can inherit a family resemblance by standing next to the family. Geometrically the claim says the points $(x, y)$ all sit on one straight line through the origin — the rate line of Lesson 6.3\'s figure 2 was exactly this picture, with $k = 32$ as its steepness. And the fill engine of Lesson 6.3 was legal for one reason only: on a line of constant ratio, every pair is in proportion, so the cross law may extend any trusted pair to any new size. Direct variation is the licence that made the engine work.',
        },
        { kind: 'heading', text: 'The test: growing is not agreeing' },
        {
          kind: 'para',
          text: 'The commonest fraud in this topic is also the gentlest: believing that *both quantities grow* is enough. It is not. Direct variation demands that they grow **in the same ratio** — and only the division test can certify that.',
        },
        {
          kind: 'example',
          title: 'A station car park charges Rs $60$ for $4$ hours, Rs $100$ for $8$ hours, Rs $140$ for $12$ hours and Rs $180$ for $24$ hours. Are the charges in direct variation with the time?',
          steps: [
            'Now, run the division test on each pair — charge divided by time: $60 \\div 4 = 15$, $100 \\div 8 = 12.5$, $140 \\div 12 = \\tfrac{35}{3} \\approx 11.67$, $180 \\div 24 = 7.5$.',
            'So four pairs produce four different numbers; the ratio is not constant — indeed it **falls** as the hours grow, because long stays earn a discount.',
            'Hence the charges are **not** in direct variation with the time: both quantities grow, but not in step — a table of near-misses, not a line.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: '"It grows too" is not a definition',
          text: 'Both columns of the parking table increase together, yet the variation is not direct. The test is the **constant ratio**, nothing else: divide each $y$ by its $x$ and demand one number. The rice line passes ($65 : 1 = 130 : 2 = 325 : 5$, all $65$); the parking table fails ($15$, $12.5$, $11.67$, $7.5$). Every "is this direct variation?" question in an examination is this division, performed quietly.',
        },
        { kind: 'heading', text: 'The direct engine at work' },
        {
          kind: 'para',
          text: 'Once the line is certified, every unknown is one division or one multiplication away — and the cross law of Lesson 6.3 does the same work under a different name. Two engines, one line.',
        },
        {
          kind: 'example',
          title: 'A soft-drink machine fills $840$ bottles in six hours. How many bottles will it fill in five hours at the same rate?',
          steps: [
            'Now, the rate: $840 \\div 6 = 140$ bottles per hour — the constant $k$.',
            'So five hours carry $5 \\times 140 = 700$; the proportion engine agrees: $\\tfrac{840}{6} = \\tfrac{x}{5}$ gives $x = 840 \\times 5 \\div 6 = 700$.',
            'Hence 700 bottles — and the check: $700 \\div 5 = 140$, the same $k$ as at the start.',
          ],
        },
        {
          kind: 'example',
          title: 'A loaded truck travels $14$ km in $25$ minutes. If the speed stays the same, how far does it travel in $5$ hours?',
          steps: [
            'Now, the units must meet before the quantities can: $5$ hours $= 300$ minutes.',
            'So the constant is $k = \\tfrac{14}{25}$ km per minute, and the distance is $300 \\times \\tfrac{14}{25} = 168$ km; in proportion dress, $\\tfrac{14}{25} = \\tfrac{x}{300}$ gives $x = 168$ by the cross law.',
            'Hence 168 km — the conversion was not decoration: the same constant in km/h is $\\tfrac{14}{25} \\times 60 = 33.6$, a true sentence, but mixing the two dresses in one equation is the classic way to manufacture a wrong answer.',
          ],
        },
        {
          kind: 'example',
          title: 'A pole $5$ m $60$ cm high casts a shadow $3$ m $20$ cm long. At the same time, find the shadow of a pole $10$ m $50$ cm high, and the height of the pole whose shadow is $5$ m.',
          steps: [
            'Now, sun-angle geometry locks height to shadow, so the two vary directly; dress the pairs as height over shadow: $k = 560 \\div 320 = \\tfrac{7}{4} = 1.75$ metres of pole per metre of shadow.',
            'So the $10$ m $50$ cm pole ($1050$ cm) casts $1050 \\div 1.75 = 600$ cm $= 6$ m of shadow; and the $5$ m shadow ($500$ cm) belongs to a pole of $1.75 \\times 500 = 875$ cm $= 8$ m $75$ cm.',
            'Hence shadow 6 m; pole 8 m 75 cm — the proportion form $\\tfrac{560}{320} = \\tfrac{1050}{600}$ certifies the first answer, cross products $560 \\times 600 = 336000 = 320 \\times 1050$.',
          ],
        },
        {
          kind: 'example',
          title: 'A photograph of a bacterium, enlarged $50{,}000$ times, measures $5$ cm. What is the bacterium\'s actual length, and how long would the photograph be at $20{,}000$ times?',
          steps: [
            'Now, actual length and enlarged length vary directly — the enlargement factor is the multiplier: $k = 5 \\div 50{,}000 = 0.0001$ cm per times.',
            'So the bacterium itself is $0.0001$ cm long — one thousandth of a millimetre; and at $20{,}000$ times the photograph measures $20{,}000 \\times 0.0001 = 2$ cm.',
            'Hence actual length 0.0001 cm; enlarged length 2 cm — the factor method agrees in one line: the magnification dropped by $\\tfrac{20{,}000}{50{,}000} = \\tfrac{2}{5}$, so the length drops by the same factor, $5 \\times \\tfrac{2}{5} = 2$.',
          ],
        },
        {
          kind: 'formula',
          name: 'The direct engine',
          latex: 'y \\propto x: \\quad k = \\tfrac{y_1}{x_1} = \\tfrac{y_2}{x_2}, \\qquad y_2 = k\\,x_2',
          note: 'Certify the line first — one division per pair — then extend: the new value is the constant times the new size. The cross law $y_1 x_2 = x_1 y_2$ is the same engine in proportion dress; the factor method (below) is the same engine with the division already done.',
        },
        { kind: 'heading', text: 'Inverse variation: the fixed total' },
        {
          kind: 'para',
          text: 'Now turn the lock around. A hostel has a fixed stock of sweets; the more children share it, the fewer each one gets. A journey has a fixed length; the faster you drive, the sooner it ends. A job has a fixed size; the more workers, the fewer days. In each scene the **product** of the two quantities refuses to move — and that stubbornness is the second kind of variation.',
        },
        {
          kind: 'example',
          title: 'A game show prizes Rs $1{,}00{,}000$, to be divided equally among the winners. Complete the table for $4$, $5$, $8$, $10$ and $20$ winners, and decide how the prize varies with the number of winners.',
          steps: [
            'Now, divide: $4$ winners take Rs $25{,}000$ each, $5$ take Rs $20{,}000$, $8$ take Rs $12{,}500$, $10$ take Rs $10{,}000$, $20$ take Rs $5{,}000$.',
            'So check the product in every row: $4 \\times 25{,}000 = 5 \\times 20{,}000 = 8 \\times 12{,}500 = 10 \\times 10{,}000 = 20 \\times 5{,}000 = 1{,}00{,}000$.',
            'Hence the product is the fixed thing — winners $\\times$ prize $= 1{,}00{,}000$ in every row. Doubling the winners halves the prize; the two quantities vary **inversely**.',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Inverse variation',
          text: 'A quantity $y$ is said to **vary inversely as** a quantity $x$ if their product $xy$ stays equal to one fixed number $k$ as the quantities change together. In symbols $y \\propto \\tfrac{1}{x}$ — read "$y$ varies inversely as $x$" — and it holds exactly when every pair of corresponding values satisfies $x_1 y_1 = x_2 y_2$. The fixed product $k$ is the **constant of variation**: in the prize scene, the Rs $1{,}00{,}000$ itself.',
        },
        {
          kind: 'equation',
          latex: 'y \\propto \\tfrac{1}{x} \\;\\Longleftrightarrow\\; x\\,y = k \\ \\ (k \\neq 0) \\;\\Longleftrightarrow\\; x_1 y_1 = x_2 y_2',
          note: 'The mirror of equation tag 1: where direct variation pinned the ratio, inverse variation pins the product. The reciprocal dress is honest bookkeeping — $y$ varying directly as $\\tfrac{1}{x}$ means $y / \\tfrac{1}{x} = xy$ is constant, which is the product statement again.',
        },
        {
          kind: 'para',
          text: 'Work problems give the fixed product its working name. A job that $3$ persons finish in $4$ days has size $3 \\times 4 = 12$ **person-days** — twelve days of one person\'s labour, and no rearrangement of the crew changes the total. More workers, fewer days; fewer workers, more days; the person-days stand still. Every "workers and days" constant in this lesson is such a product, and the exercises will run the same arithmetic on animals-and-days, machines-and-days and bottles-and-boxes.',
        },
        { kind: 'heading', text: 'One journey, two bindings' },
        {
          kind: 'para',
          text: 'The same road can carry both locks, and telling them apart is the whole skill. Figure 1 puts the two side by side: a delivery van whose **distance** varies directly with its time, and a fixed $240$ km journey whose **speed and time** vary inversely.',
        },
        {
          kind: 'figure',
          caption:
            'One journey, two bindings. Left: the van runs at a steady $60$ km/h, so distance $= 60 \\times$ time — the points sit on one line through the origin, the direct lock with $k = 60$: at $1$ h, $60$ km; at $3$ h, $180$ km. Right: the fixed $240$ km journey binds speed and time by their product — $3$ h at $80$ km/h, $4$ at $60$, $6$ at $40$: three pairs on one curve, each rebuilding $240$ (the curve $xy = 240$, a hyperbola, bends away from both axes because neither quantity may reach zero). Same road, opposite locks: the left pair\'s ratio is fixed, the right pair\'s product is.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels: left, a straight line through the origin for a van at sixty kilometres per hour with dots at one hour sixty kilometres and three hours one hundred eighty kilometres; right, a downward-bending curve for a fixed two hundred forty kilometre journey with dots at three hours eighty kilometres per hour, four hours sixty and six hours forty">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="200" y="40" font-weight="bold">the steady van: d = 60t (direct)</text>
    <text x="565" y="40" font-weight="bold">fixed 240 km: speed × time = 240 (inverse)</text>
    <text x="60" y="68" font-size="11">km</text>
    <text x="200" y="356" font-size="11">time (hours)</text>
    <text x="565" y="356" font-size="11">time (hours)</text>
    <text x="428" y="66" font-size="11" text-anchor="start">km/h</text>
    <text x="60" y="338">0</text>
    <text x="130" y="338">1</text>
    <text x="200" y="338">2</text>
    <text x="270" y="338">3</text>
    <text x="340" y="338">4</text>
    <text x="420" y="338">0</text>
    <text x="460" y="338">1</text>
    <text x="500" y="338">2</text>
    <text x="540" y="338">3</text>
    <text x="580" y="338">4</text>
    <text x="620" y="338">5</text>
    <text x="660" y="338">6</text>
    <text x="700" y="338">7</text>
    <text x="54" y="324" text-anchor="end">0</text>
    <text x="54" y="264" text-anchor="end">60</text>
    <text x="54" y="204" text-anchor="end">120</text>
    <text x="54" y="144" text-anchor="end">180</text>
    <text x="54" y="84" text-anchor="end">240</text>
    <text x="414" y="324" text-anchor="end">0</text>
    <text x="414" y="234" text-anchor="end">30</text>
    <text x="414" y="144" text-anchor="end">60</text>
    <text x="414" y="54" text-anchor="end">90</text>
    <text x="130" y="246" font-size="12">1 h → 60 km</text>
    <text x="270" y="126" font-size="12">3 h → 180 km</text>
    <text x="480" y="108" font-size="12">3 × 80</text>
    <text x="600" y="128" font-size="12">4 × 60</text>
    <text x="676" y="188" font-size="12">6 × 40</text>
    <text x="200" y="370" font-size="12">the ratio d/t is one number: 60</text>
    <text x="560" y="370" font-size="12">3 × 80 = 4 × 60 = 6 × 40 = 240</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <line x1="60" y1="320" x2="360" y2="320" />
    <line x1="60" y1="320" x2="60" y2="80" />
    <line x1="60" y1="320" x2="340" y2="80" />
    <line x1="420" y1="320" x2="710" y2="320" />
    <line x1="420" y1="320" x2="420" y2="50" />
    <path d="M 526.7 50 L 531 60.5 L 540 80 L 548.3 95.6 L 552.7 102.9 L 557 109.8 L 561.3 116.2 L 565.7 122.3 L 570 128 L 574.3 133.4 L 580 140 L 587.3 147.9 L 591.7 152.2 L 596 156.4 L 600.3 160.3 L 604.7 164 L 609 167.6 L 613.3 171 L 620 176 L 626.3 180.4 L 630.7 183.3 L 635 186 L 639.3 188.7 L 643.7 191.2 L 648 193.7 L 652.3 196 L 660 200 L 665.3 202.6 L 669.7 204.6 L 674 206.6 L 678.3 208.5 L 682.7 210.4 L 687 212.1 L 691.3 213.9 L 695.7 215.5 L 700 217.1" fill="none" />
    <line x1="380" y1="40" x2="380" y2="380" stroke-dasharray="2 5" />
    <line x1="540" y1="80" x2="540" y2="320" stroke-dasharray="2 5" />
    <line x1="540" y1="80" x2="420" y2="80" stroke-dasharray="2 5" />
  </g>
  <g fill="currentColor">
    <circle cx="130" cy="260" r="4" />
    <circle cx="270" cy="140" r="4" />
    <circle cx="540" cy="80" r="4" />
    <circle cx="580" cy="140" r="4" />
    <circle cx="660" cy="200" r="4" />
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The figure teaches the recognition skill by eye. The left panel\'s points **refuse to bend**: the same rise per hour everywhere — the straight line through the origin that Lesson 6.3 already trusted. The right panel\'s points **must bend**: as the speed grows, the hours shrink, and the curve flattens — a **hyperbola**, the graph of a fixed product, forever approaching the axes but forbidden to touch them (zero speed or zero time would make the "fixed" journey infinite or absent). When an examination shows a table and asks "direct or inverse?", you are being asked one question: does this table\'s constant live in the ratios column or the products column?',
        },
        { kind: 'heading', text: 'The factor method' },
        {
          kind: 'para',
          text: 'The constants spawn a shortcut that examination solutions use constantly — and that becomes a fraud the moment it is used carelessly.',
        },
        {
          kind: 'derivation',
          title: 'The factor laws, from the constants',
          statement:
            'Claim: if $x_2 = m\\,x_1$ — the first quantity scaled by the factor $m$ — then $y_2 = m\\,y_1$ under **direct** variation, while $y_2 = \\tfrac{1}{m}\\,y_1$ under **inverse** variation.',
          steps: [
            {
              label: 'Direct',
              formula: 'y = k\\,x \\;\\Longrightarrow\\; y_2 = k\\,x_2 = k\\,(m\\,x_1) = m\\,(k\\,x_1) = m\\,y_1',
              explanation:
                'On the line, $y$ is $k$ copies of $x$, so scaling $x$ by $m$ scales $y$ by the same $m$ — the line cannot bend. Van check: $60$ km/h for $2$ h gives $120$ km; double the time to $4$ h and the distance doubles to $240$ km.',
            },
            {
              label: 'Inverse',
              formula: 'x\\,y = k \\;\\Longrightarrow\\; x_2\\,y_2 = k \\;\\Longrightarrow\\; y_2 = \\tfrac{k}{x_2} = \\tfrac{k}{m\\,x_1} = \\tfrac{1}{m}\\cdot\\tfrac{k}{x_1} = \\tfrac{y_1}{m}',
              explanation:
                'The fixed total is shared over $m$ times as many parts, so each part shrinks by $m$. Journey check: $40$ km/h takes $6$ h; double the speed to $80$ km/h and the time halves to $3$ h — the product still $240$.',
            },
            {
              label: 'The guard',
              formula: 'm \\text{ may be any positive number}',
              explanation:
                'Whole or not: at $90$ km/h on the same $240$ km journey, $m = \\tfrac{90}{60} = \\tfrac{3}{2}$, so the time is $4 \\times \\tfrac{2}{3} = \\tfrac{8}{3}$ h $= 2$ h $40$ min — and indeed $\\tfrac{8}{3} \\times 90 = 240$. The factor method is the definition in motion, not a new law.',
            },
          ],
          result: 'direct: $y_2 = m\\,y_1$; inverse: $y_2 = y_1/m$ — scale with the factor, or against it.',
        },
        {
          kind: 'formula',
          name: 'The factor laws',
          latex: 'x_2 = m\\,x_1 \\;\\Longrightarrow\\; y_2 = m\\,y_1 \\ (\\text{direct}); \\qquad y_2 = \\tfrac{y_1}{m} \\ (\\text{inverse})',
          note: 'The scaling shortcut: in direct variation both quantities multiply by $m$; in inverse variation one multiplies by $m$, the other by $1/m$. Bacteria check (direct): magnification $50{,}000 \\to 20{,}000$ is $m = \\tfrac{2}{5}$, so $5 \\times \\tfrac{2}{5} = 2$ cm.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The factor is not a licence across scenes',
          text: 'The factor law needs the **same constant** on both sides of the comparison. A van at $60$ km/h covers $120$ km in $2$ h; a bus at $90$ km/h covers $180$ km in $2$ h. The van\'s time doubles — may the bus\'s distance double too? No law connects them: the two vehicles ride different constants ($60$ against $90$), and the factor method works **within one table of pairs**, never across two unrelated scenes.',
        },
        { kind: 'heading', text: 'Which is it? The recognition drill' },
        {
          kind: 'para',
          text: 'Examinations rarely announce the lock. They hand over a situation and wait. The drill is to name the fixed thing: if the situation fixes a **rate**, the variation is direct; if it fixes a **total**, the variation is inverse. Seven situations, one per row — each constant verified.',
        },
        {
          kind: 'table',
          head: ['Situation', 'The fixed thing', 'Binding', 'A verified instance'],
          rows: [
            ['workers and days on one job', "the job's size — person-days", 'inverse', '$3 \\times 4 = 12 = 4 \\times 3$'],
            ['time and distance at a uniform speed', 'the speed', 'direct', '$120/2 = 180/3 = 60$ km/h'],
            ['speed and time on a fixed journey', "the journey's length", 'inverse', '$60 \\times 4 = 240 = 80 \\times 3$'],
            ['field area and crop harvested', 'the yield per hectare', 'direct', '$12/3 = 20/5 = 4$ t per ha'],
            ['population and land per person', 'the total land', 'inverse', '$1000 \\times 12 = 500 \\times 24$'],
            ['pole height and shadow length', "the sun's geometry", 'direct', '$560/320 = 7/4$'],
            ['spokes of a wheel and the angle between them', 'the full turn, $360°$', 'inverse', '$4 \\times 90° = 360° = 12 \\times 30°$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The uniform-speed trap',
          text: 'The table\'s second row is the examination\'s favourite trick. At a uniform speed, more time means more distance — and the variation is **direct**, with the speed itself as the constant. The same two quantities, speed and time, bind **inversely** the moment the journey is fixed instead. "More–more" or "more–less" by feel is exactly the fraud the parking table exposed: the fixed thing decides, and only the test certifies.',
        },
        { kind: 'heading', text: 'The flip: inverse problems are proportions' },
        {
          kind: 'para',
          text: 'Lesson 6.3\'s fill engine ran on proportions; inverse problems can run on it too — after one honest adjustment. The seats the numbers invite are the wrong seats. A job that $3$ persons finish in $4$ days: the direct invite says $3 : 4 :: 4 : d$, the cross law obliges with $d = \\tfrac{16}{3}$, and the sanity check screams — four workers taking *longer* than three? The right-hand pair must trade seats before the cross law is applied, and figure 2 shows the swap seat by seat.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The flip',
          text: 'If $x_1 y_1 = x_2 y_2$ — inverse variation — then $x_1 : x_2 = y_2 : y_1$: the two $y$-values sit in the proportion in **swapped** order. Cross-multiply the swapped claim and its products are $x_1 y_1$ against $x_2 y_2$ — the very pair the hypothesis declared equal. In the seats, the swap is invertendo (Lesson 6.3) applied to the right-hand ratio.',
        },
        {
          kind: 'derivation',
          title: 'The flip, from the cross law',
          statement:
            'Claim: for non-zero quantities, $x_1 y_1 = x_2 y_2 \\;\\Longleftrightarrow\\; x_1 : x_2 = y_2 : y_1$.',
          steps: [
            {
              label: 'Forward',
              formula: 'x_1\\,y_1 = x_2\\,y_2 \\;\\Longrightarrow\\; \\frac{x_1}{x_2} = \\frac{y_2}{y_1}',
              explanation:
                'Divide both sides by $x_2\\,y_1$ — the balance licence of chapter 2, legal since every quantity is non-zero. Rewiring check: $3 \\times 4 = 12 = 4 \\times 3$, and indeed $\\tfrac{3}{4} = \\tfrac{3}{4}$ — the worker ratio equals the day ratio inverted.',
            },
            {
              label: 'Backward',
              formula: '\\frac{x_1}{x_2} = \\frac{y_2}{y_1} \\;\\Longrightarrow\\; x_1\\,y_1 = x_2\\,y_2',
              explanation:
                'Multiply both sides by $x_2\\,y_1$. The two claims are one sentence in two dresses — which is why an inverse problem, once flipped, is solved by the cross law with no new machinery.',
            },
          ],
          result: '$x_1 y_1 = x_2 y_2 \\Longleftrightarrow x_1 : x_2 = y_2 : y_1$ — inverse variation is a proportion with the right-hand pair inverted.',
        },
        {
          kind: 'figure',
          caption:
            'The flip, seat by seat. Row 1 is the layout the numbers invite — $3 : 4 :: 4 : d$ — and the cross law obliges with an absurdity: $d = \\tfrac{16}{3}$, four workers taking longer than three. Row 2 swaps the right-hand pair — $3 : 4 :: d : 4$ — and the same law returns $d = 3$: more workers, fewer days, the product $12$ unmoved. The cross law did not change; only the seating did — invertendo from Lesson 6.3, cashed.',
          svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rows of four boxes: the first row reads three, four, four, d and produces the absurd answer sixteen over three; the second row swaps the last two boxes to read three, four, d, four and produces the sane answer three days, with two crossing arrows between the rows showing the two right-hand seats trading places, labelled the flip">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="358" y="40">the seats the numbers invite — 3 : 4 :: 4 : d gives d = 16/3 (absurd)</text>
    <text x="118" y="93" font-weight="bold">3</text>
    <text x="278" y="93" font-weight="bold">4</text>
    <text x="438" y="93" font-weight="bold">4</text>
    <text x="598" y="93" font-weight="bold">d</text>
    <text x="198" y="93">:</text>
    <text x="358" y="93">::</text>
    <text x="518" y="93">:</text>
    <text x="240" y="156" font-size="12">the flip: the two right seats trade places</text>
    <text x="118" y="223" font-weight="bold">3</text>
    <text x="278" y="223" font-weight="bold">4</text>
    <text x="438" y="223" font-weight="bold">d</text>
    <text x="598" y="223" font-weight="bold">4</text>
    <text x="198" y="223">:</text>
    <text x="358" y="223">::</text>
    <text x="518" y="223">:</text>
    <text x="358" y="264">the flip — 3 : 4 :: d : 4 gives d = 3 (sane): one side trades seats</text>
    <text x="358" y="288" font-size="12">the cross law never moved: 3 × 4 = 12 = 4 × 3</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <rect x="60" y="60" width="116" height="56" />
    <rect x="220" y="60" width="116" height="56" />
    <rect x="380" y="60" width="116" height="56" />
    <rect x="540" y="60" width="116" height="56" />
    <rect x="60" y="190" width="116" height="56" />
    <rect x="220" y="190" width="116" height="56" />
    <rect x="380" y="190" width="116" height="56" />
    <rect x="540" y="190" width="116" height="56" />
  </g>
  <g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round">
    <path d="M 448 120 C 448 138, 588 146, 588 175" />
    <path d="M 588 120 C 588 138, 448 146, 448 175" />
  </g>
  <circle cx="448" cy="120" r="3" fill="currentColor"/>
  <circle cx="588" cy="120" r="3" fill="currentColor"/>
  <polygon points="588,191 582,175 594,175" fill="currentColor"/>
  <polygon points="448,191 442,175 454,175" fill="currentColor"/>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Three persons rewire a house in $4$ days. How long would four persons take?',
          steps: [
            'Now, the job is $3 \\times 4 = 12$ person-days — the fixed total.',
            'So four persons need $12 \\div 4 = 3$ days; by the flip: $3 : 4 = d : 4$, and the cross law says $4d = 12$, so $d = 3$.',
            'Hence 3 days — the sanity check holds: more workers, fewer days, and $4 \\times 3 = 12$ rebuilds the total.',
          ],
        },
        {
          kind: 'example',
          title: 'A factory requires $42$ machines to produce a given number of articles in $63$ days. How many machines would produce the same number of articles in $54$ days?',
          steps: [
            'Now, the fixed total: $42 \\times 63 = 2646$ machine-days.',
            'So the shorter schedule needs $2646 \\div 54 = 49$ machines; by the flip: $42 : x = 54 : 63$, and the cross law says $54x = 42 \\times 63 = 2646$, so $x = 49$.',
            'Hence 49 machines — and $49 \\times 54 = 2646$ rebuilds the total: the answer is exact, not approximate.',
          ],
        },
        {
          kind: 'formula',
          name: 'The inverse engine',
          latex: 'x_1 y_1 = x_2 y_2 \\;\\Longrightarrow\\; y_2 = \\tfrac{x_1\\,y_1}{x_2} \\qquad (x_2 \\neq 0)',
          note: 'The fixed total divided by the new size. Use it after certifying the product — one multiplication per pair — or flip the right-hand pair and let the cross law of Lesson 6.3 run the seats.',
        },
        { kind: 'heading', text: 'Direct and inverse at work' },
        {
          kind: 'para',
          text: 'The two locks cover a surprising amount of daily arithmetic. The windows problem — two persons fit new windows in three days; how long for one, and how many are needed to finish in one day? — is the flip run in both directions ($2 \\times 3 = 6$ person-days, so one person takes $6$ days and six persons finish in $1$). The school timetable — eight periods of $45$ minutes; how long when nine periods fill the same day? — fixes $360$ minutes and divides: $40$-minute periods. The packing problem — twenty-five boxes of twelve bottles repacked twenty to a box — fixes $300$ bottles and yields fifteen boxes. In each, the discipline is identical: name the fixed total, certify the product, divide or flip.',
        },
        {
          kind: 'para',
          text: 'Two doors remain open. The curve $xy = 240$ in figure 1 is the graph\'s honest shape — the **rectangular hyperbola**, which later mathematics will study with instruments this book does not yet need; what matters now is its message, that a fixed product bends where a fixed ratio stays straight. And the shop\'s line hides one more variation in plain sight: the map scale — one centimetre standing for eighteen kilometres — is direct variation between map and ground. Drawing maps, models and recipes to scale deserves a lesson of its own, and Lesson 6.5 is its door.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Direct and inverse variation in the examination hall',
          text: 'Variation items are staples of SSC CGL and CHSL, banking prelims, RRB NTPC, CUET, NTSE and the class-8 boards — and they wear few disguises: classify a table or a story as direct or inverse (the constant-ratio test against the constant-product test); extend a certified direct rate to a new size (bottles per hour, km per minute, shadow per pole); complete or check an inverse table (prize money among winners, spokes and angles, periods in a school day); and the work block — workers and days, machines and days, food provision for animals — solved by the fixed product or the flip. The canon behind them: NCERT class-8 chapter 13, "Direct and Inverse Proportions" (§§13.1–13.2 with Exercises 13.1–13.2 — the parking table, the machine, the pole and shadow, the game show, the machines and the cattle of this lesson\'s drills are built in those shapes; no question is reproduced). The ratio–proportion groundwork sits in NCERT class-6 chapter 12 and class-7 chapter 8, and the men–days and speed–time staples in Khattar\'s Quantitative Aptitude.',
        },
        {
          kind: 'para',
          text: 'The chapter now owns four instruments. The ratio compares; the rate carries units; the proportion certifies agreement; and variation names the two ways quantities can be bound — one ratio for the whole line, or one product for the whole story. One lesson remains, and it spends all four at once: drawing the world to scale.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Direct variation',
              def: 'The lock in which $y/x$ is constant — $y \\propto x$: every pair sits on one line through the origin, and doubling $x$ doubles $y$.',
            },
            {
              term: 'Constant of variation',
              def: 'The fixed number $k$ in a variation: the ratio $y/x$ in the direct case, the product $xy$ in the inverse; for a rate, $k$ is the unit rate of Lesson 6.2.',
            },
            {
              term: 'Inverse variation',
              def: 'The lock in which $xy$ is constant — $y \\propto 1/x$: doubling $x$ halves $y$, the fixed total being shared over more parts.',
            },
            {
              term: 'Constant product',
              def: "The fixed total of an inverse variation — person-days for a job, kilometres for a journey, rupees for a prize pool; the number every row's product rebuilds.",
            },
            {
              term: 'Factor method',
              def: 'The scaling shortcut: if $x$ is multiplied by $m$, then $y$ is multiplied by $m$ (direct) or by $1/m$ (inverse) — proved from the constants, valid within one table of pairs.',
            },
            {
              term: 'Person-days',
              def: 'The fixed product of a work problem — workers $\\times$ days for one job; $3$ persons for $4$ days and $4$ persons for $3$ days are the same $12$ person-days of work.',
            },
            {
              term: 'Hyperbola',
              def: 'The curve $xy = k$, the graph of inverse variation; it bends toward the axes and never touches them, since neither factor of a fixed product may be zero.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which pair of quantities varies DIRECTLY?',
              options: [
                'The speed of a car and the time it takes for a fixed $240$ km journey',
                'The number of workers and the days to finish a fixed job',
                'The height of a pole and the length of its shadow at one moment',
                "The number of winners in a game show and each winner's prize",
              ],
              answer: 2,
              explain:
                'The shadow varies directly with the height — the sun fixes one ratio, $560/320 = 7/4$, for every pole (Option 3). The other three all fix a total — the $240$ km, the job\'s person-days, the Rs $1{,}00{,}000$ — so their products are constant, not their ratios: inverse, each one.',
            },
            {
              q: 'A machine fills $840$ bottles in $6$ hours. At the same rate, how many bottles does it fill in $5$ hours?',
              options: ['640', '700', '720', '750'],
              answer: 1,
              explain:
                'The constant is $k = 840 \\div 6 = 140$ bottles per hour, so five hours carry $5 \\times 140 = 700$ (Option 2). The near-misses fail the line: $640$ and $720$ divide back to $128$ and $144$ per hour, neither $140$; and $750$ assumes $k = 150$ — a different machine.',
            },
            {
              q: 'Two quantities vary inversely. If $xy = 240$ and $x = 60$, then $y$ is',
              options: ['40', '4', '5', '6'],
              answer: 1,
              explain:
                'The product is fixed, so $y = 240 \\div 60 = 4$ (Option 2) — and $60 \\times 4 = 240$ rebuilds it. Option 1 would rebuild $60 \\times 40 = 2400$; Options 3 and 4 rebuild $300$ and $360$ — none is the fixed $240$.',
            },
            {
              q: 'A car park charges Rs $60$ for $4$ hours, Rs $100$ for $8$ hours and Rs $140$ for $12$ hours. Are charge and time in direct variation?',
              options: [
                'Yes — both quantities grow together',
                'Yes — $60 \\div 4 = 15$ is constant',
                'No — the ratios differ: $15$, $12.5$, $35/3$',
                'No — time cannot vary with money',
              ],
              answer: 2,
              explain:
                'Growing together is not the test; the ratio is. The three pairs divide to $15$, $12.5$ and $\\tfrac{35}{3} \\approx 11.67$ — different numbers, so not direct (Option 3). Option 2 quotes one ratio and stops before checking the rest; Option 1 is the parking-table fraud itself; Option 4 is a joke, not a test — money and time rate each other every day.',
            },
            {
              q: 'On a fixed $240$ km journey, the speed doubles from $40$ km/h to $80$ km/h. The time',
              options: ['doubles', 'halves', 'drops by 40 minutes', 'stays the same'],
              answer: 1,
              explain:
                'Inverse variation: the product is fixed, so doubling one factor halves the other — $6$ h becomes $3$ h (Option 2), and $80 \\times 3 = 240$ still. Option 1 is the direct dress; Option 3 subtracts where variation divides ($6$ h minus $40$ minutes is not $3$ h); Option 4 forgets the lock entirely.',
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
                  q: 'A shop sells $5$ kg of rice for Rs $325$. At the same rate, what do $8$ kg cost?',
                  solution: [
                    'Now, certify the line: $325 \\div 5 = 65$, and "at the same rate" fixes $k = 65$ rupees per kg.',
                    'So $8$ kg cost $65 \\times 8 = 520$; the proportion dress agrees: $\\tfrac{325}{5} = \\tfrac{x}{8}$ gives $x = 520$.',
                    'Hence Rs 520 — and $520 \\div 8 = 65$ rebuilds the constant.',
                  ],
                  answer: 'Rs 520',
                },
                {
                  q: 'Six pens cost Rs $90$. What do $10$ pens cost at the same rate?',
                  solution: [
                    'Now, $k = 90 \\div 6 = 15$ rupees per pen.',
                    'So $10$ pens cost $15 \\times 10 = 150$.',
                    'Hence Rs 150 — and $150 \\div 10 = 15$: still the same pen.',
                  ],
                  answer: 'Rs 150',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A car covers a fixed $360$ km at $90$ km/h in $4$ hours. How long does the same journey take at $120$ km/h?',
                  solution: [
                    'Now, the fixed total: $90 \\times 4 = 360$ km.',
                    'So the time at $120$ km/h is $360 \\div 120 = 3$ h; the flip agrees: $90 : 120 = t : 4$ gives $120t = 360$, so $t = 3$.',
                    'Hence 3 hours — faster by a factor of $\\tfrac{120}{90} = \\tfrac{4}{3}$, so the time is divided by $\\tfrac{4}{3}$: $4 \\times \\tfrac{3}{4} = 3$.',
                  ],
                  answer: '3 hours',
                },
                {
                  q: 'Eight workers finish a job in $15$ days. How long would twelve workers take?',
                  solution: [
                    'Now, the job is $8 \\times 15 = 120$ worker-days.',
                    'So twelve workers need $120 \\div 12 = 10$ days.',
                    'Hence 10 days — the product $12 \\times 10 = 120$ rebuilds the total.',
                  ],
                  answer: '10 days',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A paint mix uses $1$ part of red pigment with $8$ parts of base, and one part needs $75$ mL of base. How many parts of red pigment mix with $1800$ mL of base?',
                  solution: [
                    'Now, the base per part is fixed at $75$ mL, so parts of pigment and millilitres of base vary directly with $k = 75$.',
                    'So $1800$ mL supports $1800 \\div 75 = 24$ parts of red pigment — and $24 \\times 75 = 1800$ rebuilds the base.',
                    'Hence 24 parts — the mix stays $1 : 8$ by construction.',
                  ],
                  answer: '24 parts',
                },
                {
                  q: 'A batch of $300$ bottles is packed $12$ to a box, filling $25$ boxes. How many boxes does the same batch fill at $20$ bottles per box?',
                  solution: [
                    'Now, the fixed total: $12 \\times 25 = 300$ bottles.',
                    'So $300 \\div 20 = 15$ boxes; the flip agrees: $20 : 12 = 25 : x$ gives $20x = 300$, so $x = 15$.',
                    'Hence 15 boxes — bigger boxes, fewer of them, and $20 \\times 15 = 300$.',
                  ],
                  answer: '15 boxes',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A farmer has food for $20$ animals for $6$ days. How long would the food last $30$ animals?',
                  solution: [
                    'Now, the provision is fixed: $20 \\times 6 = 120$ animal-days.',
                    'So $30$ animals consume $30$ animal-days per day: $120 \\div 30 = 4$ days.',
                    'Hence 4 days — $30 \\times 4 = 120$: the total never moved.',
                  ],
                  answer: '4 days',
                },
                {
                  q: 'A school runs $8$ periods of $45$ minutes each. If it switches to $9$ periods in the same school day, how long is each period?',
                  solution: [
                    'Now, the day is fixed: $8 \\times 45 = 360$ minutes.',
                    'So nine periods run $360 \\div 9 = 40$ minutes each.',
                    'Hence 40 minutes — more periods, shorter each; $9 \\times 40 = 360$.',
                  ],
                  answer: '40 minutes',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A bacterium photographed at $50{,}000$ times magnification measures $5$ cm. Find its actual length, and its photographed length at $20{,}000$ times.',
                  solution: [
                    'Now, actual length and enlargement vary directly — the photograph is the actual length times the magnification: $k = 5 \\div 50{,}000 = 0.0001$ cm.',
                    'So the bacterium is $0.0001$ cm long — one thousandth of a millimetre; at $20{,}000$ times it photographs at $20{,}000 \\times 0.0001 = 2$ cm.',
                    'Hence 0.0001 cm actual; 2 cm enlarged — the factor method agrees: $5 \\times \\tfrac{20{,}000}{50{,}000} = 5 \\times \\tfrac{2}{5} = 2$.',
                  ],
                  answer: '0.0001 cm actual; 2 cm at 20,000 times',
                },
                {
                  q: 'A factory requires $42$ machines to produce a given number of articles in $63$ days. How many machines would produce the same number of articles in $54$ days?',
                  solution: [
                    'Now, the fixed total: $42 \\times 63 = 2646$ machine-days.',
                    'So $54$ days need $2646 \\div 54 = 49$ machines; the flip gives the same: $42 : x = 54 : 63$, so $54x = 2646$ and $x = 49$.',
                    'Hence 49 machines — $49 \\times 54 = 2646$ rebuilds the total.',
                  ],
                  answer: '49 machines',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'A van runs a fixed $240$ km route. At $60$ km/h it takes $4$ hours. Verify that $80$ km/h takes $3$ hours — twice: once by the constant product, once by the factor method.',
                  solution: [
                    'Now, the constant product: $60 \\times 4 = 240$, and $80 \\times 3 = 240$ — the product is rebuilt, so $3$ h is certified.',
                    'So by the factor method: the speed scales by $m = \\tfrac{80}{60} = \\tfrac{4}{3}$, so the time must scale by $\\tfrac{1}{m} = \\tfrac{3}{4}$: $4 \\times \\tfrac{3}{4} = 3$ h.',
                    'Hence verified both ways — the two engines are one lock, seen from the ratio side and the product side.',
                  ],
                  answer: 'Verified both ways: 80 × 3 = 240 and 4 × 3/4 = 3 h',
                },
                {
                  q: 'Prove the flip: from $x_1 y_1 = x_2 y_2$ derive $x_1 : x_2 = y_2 : y_1$, and use it to answer — three persons rewire a house in $4$ days; how long do four persons take?',
                  solution: [
                    'Now, divide the hypothesis $x_1 y_1 = x_2 y_2$ by $x_2 y_1$ — legal, all quantities non-zero — to get $\\tfrac{x_1}{x_2} = \\tfrac{y_2}{y_1}$, which is the claimed proportion.',
                    'So the rewiring problem flips to $3 : 4 = d : 4$, and the cross law says $4d = 12$, so $d = 3$; the naive direct layout $3 : 4 :: 4 : d$ would have answered $\\tfrac{16}{3}$ — more workers, more days, absurd.',
                    'Hence proved, and the answer is 3 days — invertendo from Lesson 6.3, cashed on the right-hand pair.',
                  ],
                  answer: 'Proved; the job takes 3 days',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-scaling-maps-models-and-recipes',
      number: '6.5',
      title: 'Scaling: Maps, Models and Recipes',
      concepts: [
        'Map scale',
        'Bar scale',
        'Representative fraction',
        'Scale factor',
        'Enlargement and reduction',
        'Area law of scale',
        'Recipe multiplier',
        'Scale drawings',
      ],
      objectives: [
        'State a map scale in all three dresses — verbal pair, representative fraction and bar scale — and convert between them across the km–m–cm bridge',
        'Run the scale engine both ways — ground from map and map from ground — for maps, models and plans, and apply the area law: areas carry $m^2$, never $m$',
        'Classify any scale drawing as reduction, life size or enlargement by its scale factor $m$, and see the factor laws of Lesson 6.4 at work in both directions',
        'Scale a recipe up or down by the proved multiplier $q_2 = q_1 \\times s_2/s_1$, keep every per-serving constant — and keep the clock off the ingredient list',
      ],
      prerequisites: ['fm-direct-and-inverse-variation', 'fm-proportion-and-cross-multiplication', 'fm-rates-and-unit-rates'],
      sources: ['ncert-math8-ch13', 'ncert-math6-ch12', 'ncert-math7-ch8', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 6.4 ended at a door it deliberately left open: the shop\'s price line hides a map scale in plain sight, because one centimetre standing for eighteen kilometres is direct variation between map and ground — the same lock the van\'s distance wore. Now walk through the door. The van\'s driver plans tomorrow with a road atlas: the run to the cold-storage hub is a stretch of road $72$ km long, and on the atlas page it is $4$ cm of paper. Eighteen kilometres per centimetre — that one sentence is a **rate** (Lesson 6.2, units riding), a **ratio** (Lesson 6.1, simplest dress ahead), a **direct variation** (Lesson 6.4, $\\text{map} \\propto \\text{ground}$), and a licence to **draw the world smaller without lying about it**. This final lesson of the chapter spends all four instruments at once: maps and models that shrink, prints that enlarge, plans that measure, and recipes that scale a dinner from four bellies to ten.',
        },
        { kind: 'heading', text: 'The scale of a drawing' },
        {
          kind: 'para',
          text: 'Begin on the atlas page itself, with three legs of the van\'s week.',
        },
        {
          kind: 'example',
          title: 'A road atlas uses the scale $1$ cm : $18$ km. On its sheet the hub leg measures $4$ cm, the grain-market leg $5$ cm, and a village link $2.5$ cm. Find each ground distance — and find the map measure of the $45$ km village link backwards.',
          steps: [
            'Now, the scale is the constant: $1$ cm of map carries $18$ km of ground, every centimetre, everywhere on the sheet.',
            'So each leg multiplies: $4 \\times 18 = 72$ km to the hub, $5 \\times 18 = 90$ km to the grain market, $2.5 \\times 18 = 45$ km to the village link.',
            'Hence 72 km, 90 km and 45 km — and the engine runs backwards just as smoothly: the $45$ km link is exactly the leg measuring $45 \\div 18 = 2.5$ cm, no rounding, no lying.',
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Map scale',
          text: 'The **scale** of a map or drawing is said to be the ratio of a distance on the drawing to the corresponding distance on the ground, **both measured in the same unit**. A scale is written in any of three dresses: as a **verbal pair** ($1$ cm : $18$ km), as a **representative fraction** ($1 : 18{,}00{,}000$ — the bare ratio of same-unit lengths), or as a **bar scale** (a ruler drawn on the sheet itself). In every dress the claim is the direct variation of Lesson 6.4: drawing distance $\\propto$ ground distance.',
        },
        {
          kind: 'equation',
          latex: '\\text{drawing} : \\text{ground} = 1 : n \\;\\Longleftrightarrow\\; \\frac{\\text{drawing}}{\\text{ground}} = \\frac{1}{n} \\;\\Longleftrightarrow\\; \\text{ground} = n \\times \\text{drawing}',
          note: 'Three dresses of one claim, exactly as equation tag 1 of Lesson 6.4 gave three dresses of direct variation. The $n$ counts **ground units per drawing unit** — $18$ km per cm on the atlas, $24$ cm per cm on the model scale $1 : 24$. The middle dress, $1/n$, is the representative fraction; the next derivation earns it.',
        },
        {
          kind: 'derivation',
          title: 'The representative fraction, from the verbal pair',
          statement:
            'Claim: the verbal pair $1$ cm : $18$ km and the bare ratio $1 : 18{,}00{,}000$ are the **same scale** — and the bare ratio works in every unit system at once.',
          steps: [
            {
              label: 'Convert',
              formula: '18 \\text{ km} = 18 \\times 1000 \\text{ m} = 18 \\times 1{,}00{,}000 \\text{ cm} = 18{,}00{,}000 \\text{ cm}',
              explanation:
                'The unit bridge, kilometre to metre to centimetre — the same same-units law Lesson 6.1 enforced before any ratio was spoken (Rs 5 : 50 paise had to become 500 : 50 first). A ratio only makes sense between quantities dressed alike.',
            },
            {
              label: 'Cancel',
              formula: '1 \\text{ cm} : 18{,}00{,}000 \\text{ cm} \\;=\\; 1 : 18{,}00{,}000',
              explanation:
                'The units cancel because they are the **same** unit on both sides; what survives is a pure number — the **representative fraction**, RF for short. Nothing about it remembers centimetres.',
            },
            {
              label: 'Trust',
              formula: '\\text{RF} = \\frac{1}{18{,}00{,}000} \\;\\Longrightarrow\\; 1 \\text{ mm of map} = 18{,}00{,}000 \\text{ mm of ground} = 1800 \\text{ m} = 1.8 \\text{ km}',
              explanation:
                'And the same pure number works in millimetres, inches or spans: $1$ inch of map is $18{,}00{,}000$ inches of ground. This unit-independence is exactly why survey departments print the bare ratio on the sheet — it survives every unit system the reader may bring.',
            },
          ],
          result: '$1$ cm : $18$ km $= 1 : 18{,}00{,}000$ — one scale, three dresses, no units in the fraction.',
        },
        {
          kind: 'example',
          title: 'On the same atlas, what ground distance does $1$ mm of map carry? And what does the marking $1 : 8{,}00{,}000$ on a survey sheet mean, in km per cm?',
          steps: [
            'Now, millimetres first: $1$ mm $= 0.1$ cm, so the ground carried is $0.1 \\times 18 = 1.8$ km.',
            'So the RF agrees by its own road: $1$ mm of map is $18{,}00{,}000$ mm of ground $= 1800$ m $= 1.8$ km — the pure number knows no units, and both dresses land on the same answer.',
            'Hence 1.8 km per mm; and the survey sheet reads backwards through the same bridge: $8{,}00{,}000$ cm $= 8$ km, so $1 : 8{,}00{,}000$ means one centimetre there spans $8$ km of ground.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The atlas page and its bar scale. The sheet carries the route from town A to the hub ($4$ cm of paper $\\leftrightarrow$ $72$ km of road) and, along its foot, the scale drawn rather than said: four alternating segments, each $1$ cm of paper standing for $18$ km of ground — $0$, $18$, $36$, $54$, $72$. The bar is the scale\'s third dress made physical: to measure any leg, carry it down to the bar with a compass edge and read the kilometres where it lands. The verbal pair ($1$ cm : $18$ km), the fraction ($1 : 18{,}00{,}000$) and this drawn ruler are one and the same ratio, three times over.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An atlas page with a road from town A to the hub drawn exactly four bar-segments long, captioned four centimetres on the map equals seventy two kilometres on the ground, and below it a bar scale of four alternating segments labelled zero, eighteen, thirty six, fifty four and seventy two kilometres, each segment marked one centimetre equals eighteen kilometres">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="310" y="30" font-weight="bold">the atlas page: scale 1 cm : 18 km</text>
    <text x="90" y="172">town A</text>
    <text x="422" y="74" text-anchor="start">the hub</text>
    <text x="310" y="210" font-size="12">the hub leg: 4 cm ↔ 72 km</text>
    <text x="80" y="272" font-size="12">0</text>
    <text x="180" y="272" font-size="12">18</text>
    <text x="280" y="272" font-size="12">36</text>
    <text x="380" y="272" font-size="12">54</text>
    <text x="480" y="272" font-size="12">72 km</text>
    <text x="500" y="247" font-size="12" text-anchor="start">each segment: 1 cm ↔ 18 km</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <rect x="60" y="48" width="500" height="140" />
    <path d="M 90 150 L 330 150 L 330 70 L 410 70" fill="none" />
    <rect x="180" y="232" width="100" height="20" />
    <rect x="380" y="232" width="100" height="20" />
    <line x1="180" y1="232" x2="180" y2="252" />
    <line x1="280" y1="232" x2="280" y2="252" />
    <line x1="380" y1="232" x2="380" y2="252" />
    <line x1="80" y1="252" x2="80" y2="258" />
    <line x1="180" y1="252" x2="180" y2="258" />
    <line x1="280" y1="252" x2="280" y2="258" />
    <line x1="380" y1="252" x2="380" y2="258" />
    <line x1="480" y1="252" x2="480" y2="258" />
  </g>
  <g fill="currentColor">
    <rect x="80" y="232" width="100" height="20" />
    <rect x="280" y="232" width="100" height="20" />
    <circle cx="90" cy="150" r="4" />
    <circle cx="410" cy="70" r="5" />
  </g>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The bar scale travels with the map',
          text: 'Photocopy the atlas page at $80\\%$ and every printed **number** lies: the RF still says $1 : 18{,}00{,}000$, but the copy\'s centimetre is only $0.8$ of the original\'s, and $0.8$ cm now spans $18$ km — the scale the copy deserves is $1 : 22{,}50{,}000$ (Exercise L6 cashes the full fraud on a survey sheet). The **bar scale** is the honest passenger: it was copied along with everything else, so its shrunken segments still measure true distances — lay the copied leg against the copied bar and the copy confesses its own new scale. This is why careful maps draw the scale **on** the sheet instead of trusting a number in the corner.',
        },
        { kind: 'heading', text: 'The scale engine at work' },
        {
          kind: 'para',
          text: 'The definition is an engine with two pedals. Forward: ground $= n \\times$ drawing — the atlas multiplied by $18$. Backward: drawing $=$ ground $\\div n$ — the courtyard planned from its field. The same constant drives both directions; only the reading order changes.',
        },
        {
          kind: 'formula',
          name: 'The scale engine',
          latex: '\\text{ground} = n \\times \\text{drawing} \\qquad \\text{drawing} = \\text{ground} \\div n',
          note: 'First fix the dress and its bridge: in the verbal pair $1$ cm : $18$ km, $n = 18$ carries **kilometres per centimetre**; in the bare ratio $1 : 24$, $n = 24$ is unit-free and multiplies like-for-like. Certify the dress, then multiply or divide — the factor method of Lesson 6.4 with a unit bridge bolted on.',
        },
        {
          kind: 'example',
          title: 'A die-cast model of the delivery van is built to the scale $1 : 24$. The model is $15$ cm long and its wheelbase measures $10$ cm. Find the real van\'s length and wheelbase.',
          steps: [
            'Now, the ratio $1 : 24$ has no unit pair to convert — model centimetres and real centimetres are the same unit at different sizes, so every real length is $24$ model lengths.',
            'So the real van is $15 \\times 24 = 360$ cm $= 3.6$ m long, riding a wheelbase of $10 \\times 24 = 240$ cm $= 2.4$ m.',
            'Hence 3.6 m and 2.4 m — and the check runs backwards through the same door: the wheelbase draws at $240 \\div 24 = 10$ cm, the model\'s own measure.',
          ],
        },
        {
          kind: 'example',
          title: 'A school courtyard $40$ m by $25$ m is drawn on a plan at $1 : 500$. Find the plan\'s dimensions, and by what factor the plan\'s area falls short of the courtyard\'s.',
          steps: [
            'Now, the lengths: $40$ m $= 4000$ cm draws at $4000 \\div 500 = 8$ cm, and $25$ m $= 2500$ cm draws at $2500 \\div 500 = 5$ cm.',
            'So the plan is $8$ cm by $5$ cm — an area of $40$ cm²; the courtyard itself is $40 \\times 25 = 1000$ m² $= 1{,}00{,}00{,}000$ cm².',
            'Hence the area ratio is $1{,}00{,}00{,}000 \\div 40 = 2{,}50{,}000 = 500^2$: the lengths were divided by $500$, the areas by $500^2$. A scale multiplies **lengths** — and squares itself before it touches **areas**.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The scale multiplies lengths, not areas',
          text: 'Divide the courtyard\'s $1000$ m² by $500$ and you get $2$ — a number with no meaning here. The honest quotient is $1000 \\div 500^2 = \\tfrac{1}{250}$ m² $= 0.004$ m² $= 40$ cm², the plan\'s own area. Each dimension carries the factor once, so an area — length × width — carries it **twice**. Every "how much real area does this map region cover?" question is an invitation to forget the square; the exercise set drills the memory.',
        },
        {
          kind: 'formula',
          name: 'The area law of scale',
          latex: '\\text{drawing} : \\text{ground} = 1 : n \\;\\Longrightarrow\\; \\text{drawing area} : \\text{ground area} = 1 : n^2',
          note: 'Areas square the factor — in both directions. Courtyard check: $500^2 = 2{,}50{,}000$. Stamp check ahead: an enlargement at $\times 5$ multiplies area by $5^2 = 25$. The law does not care which way the drawing faces.',
        },
        { kind: 'heading', text: 'One law, two directions' },
        {
          kind: 'para',
          text: 'The atlas drew the world smaller; the courtyard plan drew it smaller still; but a photograph draws larger, and Lesson 6.4\'s bacterium was drawn $50{,}000$ times its size. One number settles every case: the **scale factor** $m$, the multiplier from real length to drawing length.',
        },
        {
          kind: 'equation',
          latex: 'm = \\frac{\\text{drawing length}}{\\text{real length}} \\;\\Longrightarrow\\; \\begin{cases} m < 1 & \\text{reduction — maps, plans, models} \\\\ m = 1 & \\text{life size} \\\\ m > 1 & \\text{enlargement — photographs, magnifications} \\end{cases}',
          note: 'The atlas works at $m = \\tfrac{1}{18{,}00{,}000}$, the model van at $m = \\tfrac{1}{24}$, the bacterium\'s photograph at $m = 50{,}000$ — one law, three sizes. These are exactly the factor laws of Lesson 6.4: under direct variation, scaling $x$ by $m$ scales $y$ by the same $m$; here $y$ is every length of the drawing.',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            '**Every length is multiplied by the same $m$** — the van: $15 \\times 24 = 360$ cm, wheelbase $10 \\times 24 = 240$ cm; the stamp: $4 \\times 5 = 20$ cm, $3 \\times 5 = 15$ cm. No length escapes, no length gets a private factor.',
            '**No angle ever changes** — the courtyard\'s right angle is a right angle on the plan; a drawing at any scale has the same **shape** as the real thing, never the same size (unless $m = 1$).',
            '**The representative fraction is a pure number** — $1 : 24$ needs no unit bridge; $1 : 18{,}00{,}000$ works in mm, cm, inches alike, which is why the bare ratio travels so well.',
            '**Areas carry $m^2$, never $m$** — the courtyard plan: lengths $\\div 500$, areas $\\div 2{,}50{,}000$; the stamp print: lengths $\\times 5$, areas $\\times 25$.',
            '**The bar scale belongs to its sheet** — copied, it shrinks with the map and stays true, while the printed RF tells the original\'s story (the insight above; Exercise L6 collects the debt).',
          ],
        },
        {
          kind: 'example',
          title: 'A postage stamp $4$ cm by $3$ cm is photographed for a catalogue at five times natural size. Find the print\'s dimensions, and how many times the stamp\'s area the print\'s area is.',
          steps: [
            'Now, five times natural size is $m = 5$: every length multiplies by $5$ — $4 \\times 5 = 20$ cm by $3 \\times 5 = 15$ cm.',
            'So the print\'s area is $20 \\times 15 = 300$ cm², against the stamp\'s $4 \\times 3 = 12$ cm².',
            'Hence 20 cm by 15 cm, and the area is $300 \\div 12 = 25 = 5^2$ times the stamp\'s — the area law cashed in the enlargement direction; squared factors do not care which way the camera points.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'One law, two directions. Left: the van and its model, both bars drawn at one common scale of $0.8$ px per real-or-model cm — so the picture\'s own ratio $288 : 12 = 24 : 1$ **is** the scale $1 : 24$: every length divides by $24$ going down and multiplies by $24$ coming back. Right: the stamp and its catalogue print at $12.5$ px per cm — the drawn ratio $250 : 50 = 5$ **is** the enlargement $\times 5$. Both panels are honest rulers, not impressions: measure the bars and the stated scales fall out. The factor $m$ of Lesson 6.4, wearing its two dresses.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels of paired bars sharing a left baseline with dashed end guides: left, a long bar for the real van three point six metres and a short bar for its model fifteen centimetres at scale one to twenty four; right, a short bar for a four centimetre stamp and a long bar for its twenty centimetre print at five times size; each panel states its factor m">
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="204" y="36" font-weight="bold">the model van: 1 : 24 (reduction)</text>
    <text x="585" y="36" font-weight="bold">the print: × 5 (enlargement)</text>
    <text x="204" y="70" font-size="12">the van: real length 3.6 m (360 cm)</text>
    <text x="585" y="70" font-size="12">the stamp: 4 cm</text>
    <text x="86" y="156" font-size="12" text-anchor="start">the model: 15 cm</text>
    <text x="585" y="132" font-size="12">the print: 20 cm</text>
    <text x="204" y="196" font-size="12">m = 1/24: every length ÷ 24 (15 × 24 = 360)</text>
    <text x="585" y="196" font-size="12">m = 5: every length × 5 (4 × 5 = 20)</text>
    <text x="380" y="262" font-size="12">the factor law of Lesson 6.4, drawn: every length × m — the shape never changes, only the size</text>
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="60" y="80" width="288" height="24" />
    <rect x="60" y="140" width="12" height="24" />
    <rect x="460" y="80" width="50" height="24" />
    <rect x="460" y="140" width="250" height="24" />
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1">
    <line x1="60" y1="70" x2="60" y2="176" />
    <line x1="460" y1="70" x2="460" y2="176" />
  </g>
  <g stroke="currentColor" fill="none" stroke-width="1" stroke-dasharray="3 4">
    <line x1="348" y1="104" x2="348" y2="176" />
    <line x1="510" y1="104" x2="510" y2="176" />
  </g>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The door to similar figures',
          text: 'Lesson 6.4\'s bacterium photographed at $50{,}000$ times and this lesson\'s stamp at $5$ times are one fact in two sizes: scale drawings preserve **shape** while trading **size**. Later geometry will meet such pairs as **similar figures** — equal angles, proportional sides — and will prove as theorems what this chapter has been using as an instruction manual. The atlas, the model, the plan and the print are all similarity wearing everyday clothes.',
        },
        { kind: 'heading', text: 'Recipes: scaling the portion, not the pot' },
        {
          kind: 'para',
          text: 'The chapter\'s last scene is a kitchen. The hostel\'s khichdi is written down for $4$ persons: $300$ g of rice, $150$ g of dal, $900$ mL of water, $30$ g of ghee, $6$ g of salt. Tonight it must feed $6$; on Sunday, a study group of $10$; some quiet evening, just $2$. A recipe is a **ratio table** in an apron — Lesson 6.1\'s sharing and Lesson 6.4\'s direct variation, both wearing aprons — and the scale factor works on it exactly as it worked on the atlas.',
        },
        {
          kind: 'example',
          title: 'Scale the hostel\'s $4$-person khichdi to $6$ persons.',
          steps: [
            'Now, the multiplier: $6 \\div 4 = \\tfrac{3}{2}$ — one factor for the whole recipe, not a private factor per ingredient.',
            'So $300 \\times \\tfrac{3}{2} = 450$ g of rice, $150 \\times \\tfrac{3}{2} = 225$ g of dal, $900 \\times \\tfrac{3}{2} = 1350$ mL of water, $30 \\times \\tfrac{3}{2} = 45$ g of ghee, $6 \\times \\tfrac{3}{2} = 9$ g of salt.',
            'Hence the $6$-person recipe: 450 g, 225 g, 1350 mL, 45 g, 9 g — and the ratio check that proves nothing was fat-fingered: water to rice is $1350 : 450 = 3 : 1$, exactly the original $900 : 300$. Scaling changed the **size**; the **recipe** underneath never moved.',
          ],
        },
        {
          kind: 'derivation',
          title: 'The recipe multiplier, from the per-serving constant',
          statement:
            'Claim: if a recipe for $s_1$ persons uses $q_1$ of an ingredient, the amount for $s_2$ persons is $q_2 = q_1 \\times \\tfrac{s_2}{s_1}$.',
          steps: [
            {
              label: 'The constant',
              formula: 'k = \\tfrac{q_1}{s_1}',
              explanation:
                'The per-serving amount — $75$ g of rice per head in the khichdi — is the constant of a direct variation: quantity $\\propto$ servings, precisely Lesson 6.4\'s definition. The recipe is merely a table of such constants, one per ingredient.',
            },
            {
              label: 'Extend',
              formula: 'q_2 = k\\,s_2 = \\tfrac{q_1}{s_1} \\times s_2 = q_1 \\times \\tfrac{s_2}{s_1}',
              explanation:
                'The same extension the direct engine performed on the shop\'s rice line and the van\'s distance: one constant, any size. The multiplier $\\tfrac{s_2}{s_1}$ may be a proper fraction — honesty demands using it, since half the guests deserve half the rice.',
            },
          ],
          result: '$q_2 = q_1 \\times s_2/s_1$ — the recipe multiplier: every ingredient obeys the serving ratio.',
        },
        {
          kind: 'formula',
          name: 'The recipe multiplier',
          latex: 'q_2 = q_1 \\times \\frac{s_2}{s_1}',
          note: 'Scale the portion, and every ingredient carries the same factor — upward ($\\tfrac{5}{2}$ for ten) or downward ($\\tfrac{1}{2}$ for two). The per-serving constants $q_1/s_1$ never move; check any answer by rebuilding one of them.',
        },
        {
          kind: 'table',
          head: ['Ingredient', 'for 2 ($\\times \\tfrac{1}{2}$)', 'for 4 (the recipe)', 'for 6 ($\\times \\tfrac{3}{2}$)', 'for 10 ($\\times \\tfrac{5}{2}$)'],
          rows: [
            ['Rice', '150 g', '300 g', '450 g', '750 g'],
            ['Dal', '75 g', '150 g', '225 g', '375 g'],
            ['Water', '450 mL', '900 mL', '1350 mL', '2250 mL'],
            ['Ghee', '15 g', '30 g', '45 g', '75 g'],
            ['Salt', '3 g', '6 g', '9 g', '15 g'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the table by its columns and its rows at once. Each **column** is one batch — the same recipe at a different scale, every cell the per-serving constant times the head-count. Each **row** is one ingredient riding its constant: rice at $75$ g a head, dal at $37.5$, water at $225$ mL, ghee at $7.5$, salt at $1.5$ — and any cell is the row\'s constant times the column\'s multiplier, which is the multiplier law made visible. Down the diagonal, the ratios stand still: water : rice $= 3 : 1$ in all four columns, dal : rice $= 1 : 2$ in all four. The dish changes size; it never changes character.',
        },
        {
          kind: 'example',
          title: 'The cook needs the khichdi for just $2$ persons tonight, and for a $10$-person study group tomorrow. Produce both ingredient lists from the $4$-person recipe.',
          steps: [
            'Now, the two multipliers: down is $\\tfrac{2}{4} = \\tfrac{1}{2}$, up is $\\tfrac{10}{4} = \\tfrac{5}{2}$.',
            'So tonight: $150$ g rice, $75$ g dal, $450$ mL water, $15$ g ghee, $3$ g salt; tomorrow: $750$ g rice, $375$ g dal, $2250$ mL water, $75$ g ghee, $15$ g salt.',
            'Hence both batches — and both keep water : rice $= 3 : 1$: the multiplier may fall below $1$ or rise above $2$, but the recipe underneath never moves.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The clock is not on the ingredient list',
          text: 'Nothing in the recipe\'s ingredient list is **time** — deliberately. Doubling the rice does **not** double the cooking time: a fuller pot heats differently, steam escapes differently, and the grain decides when it is done, not the arithmetic. Scaling a recipe scales the **quantities**; the **time** is judged — start checking early, taste, and trust the pot over the proportion. Examination papers sometimes plant a "cooking time" line to be scaled; the trap is the point.',
        },
        { kind: 'heading', text: 'The chapter, closed' },
        {
          kind: 'para',
          text: 'The chapter opened comparing two numbers and closes drawing the world to size, and its five instruments now form one connected machine. The **ratio** (Lesson 6.1) compares by division, in simplest dress. The **rate** (Lesson 6.2) lets the units ride the comparison. The **proportion** (Lesson 6.3) certifies that two ratios agree, with the cross law as its engine. The **variation** (Lesson 6.4) names the two locks — one ratio or one product — that bind quantities changing together. And the **scale** (this lesson) spends all four at once: the atlas is a direct variation ($\\text{map} \\propto \\text{ground}$), the RF is a ratio in its purest dress, the bar scale is the rate drawn in ink, and the photocopy fraud is caught by exactly the test that expelled the parking table — find the constant, then ask whether it stayed.',
        },
        {
          kind: 'para',
          text: 'One door this chapter could not open: every number in it lived on the sunny half of the number line — no debts, no sub-zero nights, no journeys backwards. The next chapter walks through that door, and the ratio machinery built here will be waiting on the other side.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Scaling in the examination hall',
          text: 'Map-scale items are staples of the recruitment papers — RRB NTPC and state-police constable exams both ask them straight ("$1$ cm on a map represents $n$ km; what do $k$ cm represent?"), and the class-8 boards meet the same shape: NCERT\'s chapter on direct and inverse proportion **opens** with a road map at $1$ cm : $18$ km — the very dress this lesson\'s atlas wears — and its exercises carry the map, model and mixture items (the chapter\'s dresses are cited here, no question reproduced). Recipe and ingredient scaling walks in through the class-6 and class-7 proportion chapters and Khattar\'s Quantitative Aptitude unitary-method staples. The examinable reflexes: bridge the units **before** comparing (the RF from the verbal pair); run the engine both ways; square the factor for areas; and scale recipes by the multiplier, not by optimism about the clock.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Map scale',
              def: 'The ratio of a drawing distance to the corresponding ground distance, both in the same units — stated as a verbal pair ($1$ cm : $18$ km), a representative fraction ($1 : 18{,}00{,}000$) or a bar scale drawn on the sheet.',
            },
            {
              term: 'Bar scale',
              def: 'A ruler drawn on the map itself, each segment standing for a fixed ground distance; it shrinks with the map on copying, so it stays true where a printed RF lies.',
            },
            {
              term: 'Representative fraction',
              def: 'The scale as a bare ratio of same-unit lengths — $1 : 18{,}00{,}000$; a pure number with no units, valid in every unit system.',
            },
            {
              term: 'Scale factor',
              def: 'The multiplier $m$ from real length to drawing length: $m < 1$ a reduction, $m = 1$ life size, $m > 1$ an enlargement; the factor laws of Lesson 6.4 govern it.',
            },
            {
              term: 'Enlargement',
              def: 'A scale drawing with $m > 1$ — the bacterium\'s photograph at $50{,}000$ times, the catalogue print at $\times 5$; areas grow by $m^2$.',
            },
            {
              term: 'Reduction',
              def: 'A scale drawing with $m < 1$ — the atlas, the plan, the die-cast model; the world drawn smaller, every length by the same factor.',
            },
            {
              term: 'Recipe multiplier',
              def: '$s_2/s_1$, the factor every ingredient of a recipe carries when the servings change from $s_1$ to $s_2$; the per-serving constants never move, and the clock is not an ingredient.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'On a map drawn to the scale $1$ cm : $5$ km, two towns measure $7.2$ cm apart. The actual distance is',
              options: ['36 km', '14.4 km', '1.44 km', '72 km'],
              answer: 0,
              explain:
                'Each centimetre carries $5$ km, so $7.2 \\times 5 = 36$ km (Option 1). Option 2 multiplied by $2$, Option 3 by $0.2$, Option 4 by $10$ — none of these is the scale; only the constant itself may touch the measure.',
            },
            {
              q: 'A die-cast model is built at $1 : 24$ and its length is $15$ cm. The real length is',
              options: ['62.5 cm', '3.6 m', '24 m', '1.5 m'],
              answer: 1,
              explain:
                'The ratio multiplies like-for-like: $15 \\times 24 = 360$ cm $= 3.6$ m (Option 2). Option 1 is the inverted error $15 \\div 24$; Option 3 treats the ratio as metres; Option 4 multiplies by $10$ for no reason the scale knows.',
            },
            {
              q: 'The marking $1 : 2{,}50{,}000$ on a survey sheet means',
              options: [
                '$1$ cm on the sheet : $2.5$ km on the ground',
                '$1$ cm : $2{,}50{,}000$ km',
                'the ground is $2{,}50{,}000$ cm wide',
                '$1$ km on the ground : $2.5$ cm on the sheet',
              ],
              answer: 0,
              explain:
                'The bridge: $2{,}50{,}000$ cm $= 2.5$ km, so each sheet-centimetre spans $2.5$ km (Option 1). Option 2 skipped the bridge — $2{,}50{,}000$ km is planetary; Option 3 mistakes the RF for a width; Option 4 inverts the ratio.',
            },
            {
              q: 'A recipe for $4$ persons uses $300$ g of rice. For $10$ persons one needs',
              options: ['600 g', '450 g', '750 g', '1,200 g'],
              answer: 2,
              explain:
                'The multiplier is $\\tfrac{10}{4} = \\tfrac{5}{2}$, so $300 \\times \\tfrac{5}{2} = 750$ g (Option 3). Option 1 doubles — that feeds $8$; Option 2 is the $6$-person batch ($\\times \\tfrac{3}{2}$); Option 4 multiplies by $4$, the recipe\'s own size, which would feed $16$.',
            },
            {
              q: 'A courtyard is drawn on a plan at $1 : 500$. The plan\'s area compared with the courtyard\'s real area is',
              options: ['$\\tfrac{1}{500}$ of it', '$\\tfrac{1}{2{,}50{,}000}$ of it', '$\\tfrac{1}{1{,}000}$ of it', 'the same area'],
              answer: 1,
              explain:
                'Areas square the factor: $500^2 = 2{,}50{,}000$, so the plan\'s area is $\\tfrac{1}{2{,}50{,}000}$ of the real area (Option 2). Option 1 is the **length** ratio wearing an area\'s clothes; Option 3 is $2 \\times 500$, an arithmetic ghost; Option 4 forgets the scale entirely.',
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
                  q: 'A road atlas uses the scale $1$ cm : $18$ km. What ground distance does a $5$ cm leg of the van\'s route represent?',
                  solution: [
                    'Now, the scale is the constant: $1$ cm of map carries $18$ km of ground.',
                    'So the leg carries $5 \\times 18 = 90$ km.',
                    'Hence 90 km — and $90 \\div 18 = 5$ cm reads the map backwards to the same leg.',
                  ],
                  answer: '90 km',
                },
                {
                  q: 'A building plan is drawn at $1$ cm : $2$ m. How long on the plan is a wall $7$ m long?',
                  solution: [
                    'Now, the wall is the ground quantity, so the plan divides: $7 \\div 2 = 3.5$ cm.',
                    'So the wall draws at $3.5$ cm on the plan.',
                    'Hence 3.5 cm — and $3.5 \\times 2 = 7$ m rebuilds the wall.',
                  ],
                  answer: '3.5 cm',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Express the scale $1$ mm : $5$ m as a ratio in the same units.',
                  solution: [
                    'Now, one bridge: $5$ m $= 5000$ mm, since $1$ m $= 1000$ mm.',
                    'So $1$ mm : $5000$ mm $= 1 : 5000$ — the units cancel and the RF is pure.',
                    'Hence 1 : 5000 — one millimetre of drawing is $5000$ mm $= 5$ m of real wall, in any unit pair the reader brings.',
                  ],
                  answer: '1 : 5000',
                },
                {
                  q: 'A recipe for $6$ persons uses $450$ g of dal. How much dal feeds $4$ persons?',
                  solution: [
                    'Now, the multiplier runs downward: $\\tfrac{4}{6} = \\tfrac{2}{3}$.',
                    'So $450 \\times \\tfrac{2}{3} = 300$ g; the per-serving constant agrees: $450 \\div 6 = 75$, and $75 \\times 4 = 300$.',
                    'Hence 300 g — fewer guests, the same dal per head.',
                  ],
                  answer: '300 g',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A van is $5.28$ m long. What length does its die-cast model at $1 : 24$ have?',
                  solution: [
                    'Now, dress the units: $5.28$ m $= 528$ cm.',
                    'So the model is $528 \\div 24 = 22$ cm; the check multiplies back: $22 \\times 24 = 528$.',
                    'Hence 22 cm — every real length divided by the same $24$.',
                  ],
                  answer: '22 cm',
                },
                {
                  q: 'On a map at $1 : 2{,}00{,}000$, two towns measure $8.4$ cm apart. Find the actual distance.',
                  solution: [
                    'Now, the bridge first: $2{,}00{,}000$ cm $= 2$ km, so $1$ cm of map is $2$ km of ground.',
                    'So the towns are $8.4 \\times 2 = 16.8$ km apart.',
                    'Hence 16.8 km — the RF\'s bridge did the unit work before any multiplying began.',
                  ],
                  answer: '16.8 km',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A courtyard $40$ m by $25$ m is planned at $1 : 500$. Find the plan\'s dimensions, and verify that the area ratio is $500^2$.',
                  solution: [
                    'Now, the lengths: $4000$ cm $\\div 500 = 8$ cm and $2500$ cm $\\div 500 = 5$ cm.',
                    'So the plan is $8$ cm by $5$ cm — $40$ cm², against the courtyard\'s $1000$ m² $= 1{,}00{,}00{,}000$ cm².',
                    'Hence dimensions 8 cm × 5 cm, and the area ratio is $1{,}00{,}00{,}000 \\div 40 = 2{,}50{,}000 = 500^2$ — lengths divided by $500$, areas by $500^2$.',
                  ],
                  answer: '8 cm × 5 cm; the area ratio is 2,50,000 = 500²',
                },
                {
                  q: 'A recipe for $6$ persons uses $540$ g of rice. How much rice feeds $10$ persons?',
                  solution: [
                    'Now, the multiplier: $\\tfrac{10}{6} = \\tfrac{5}{3}$.',
                    'So $540 \\times \\tfrac{5}{3} = 900$ g; the per-serving route agrees: $540 \\div 6 = 90$, and $90 \\times 10 = 900$.',
                    'Hence 900 g — one constant, two roads to it.',
                  ],
                  answer: '900 g',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A stamp $4$ cm by $3$ cm is printed at five times natural size. Find the print\'s dimensions, and how many times the stamp\'s area the print\'s area is.',
                  solution: [
                    'Now, $m = 5$: the lengths multiply — $4 \\times 5 = 20$ cm and $3 \\times 5 = 15$ cm.',
                    'So the areas: $20 \\times 15 = 300$ cm² against the stamp\'s $4 \\times 3 = 12$ cm².',
                    'Hence 20 cm × 15 cm, and the area is $300 \\div 12 = 25 = 5^2$ times the stamp\'s — the factor squared, in the enlargement direction too.',
                  ],
                  answer: '20 cm × 15 cm; the area is 25 times the stamp\'s',
                },
                {
                  q: 'A lake of area $6$ cm² appears on a map at $1 : 50{,}000$. Find the lake\'s real area.',
                  solution: [
                    'Now, the area law: the real area is $6 \\times 50{,}000^2$ cm², and $50{,}000^2 = 2{,}50{,}00{,}00{,}000$.',
                    'So the lake is $1.5 \\times 10^{10}$ cm² on the ground; since $1$ km $= 1{,}00{,}000$ cm, $1$ km² $= 10^{10}$ cm², and $1.5 \\times 10^{10} \\div 10^{10} = 1.5$.',
                    'Hence 1.5 km² — the squared factor is exactly why map **areas** are told in square kilometres while map **lengths** live in centimetres.',
                  ],
                  answer: '1.5 km²',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the recipe multiplier: from the direct variation $q \\propto s$ derive $q_2 = q_1 \\times \\tfrac{s_2}{s_1}$, and cash it — a recipe for $6$ persons uses $540$ g of rice; how much feeds $10$?',
                  solution: [
                    'Now, $q \\propto s$ means $\\tfrac{q_1}{s_1} = \\tfrac{q_2}{s_2} = k$, the per-serving constant — Lesson 6.4\'s definition, worn to the kitchen.',
                    'So multiply both sides by $s_2$: $q_2 = k\\,s_2 = \\tfrac{q_1}{s_1} \\times s_2 = q_1 \\times \\tfrac{s_2}{s_1}$ — the multiplier is the serving ratio itself.',
                    'Hence proved; cashed: $540 \\times \\tfrac{10}{6} = 900$ g — and $900 \\div 10 = 90 = 540 \\div 6$ rebuilds the constant $k$.',
                  ],
                  answer: 'Proved; 900 g',
                },
                {
                  q: 'A survey map at $1 : 2{,}00{,}000$ is photocopied at $80\\%$ of its size. Two towns then measure $6$ cm apart **on the copy**. Find their true distance, and the distance the printed RF would falsely suggest.',
                  solution: [
                    'Now, the copy\'s centimetre is only $0.8$ of the original\'s, so $6$ cm on the copy $= 6 \\div 0.8 = 7.5$ cm on the original map.',
                    'So the true distance is $7.5 \\times 2 = 15$ km — while the printed RF, still claiming $1 : 2{,}00{,}000$, computes $6 \\times 2 = 12$ km and lies by $3$ km.',
                    'Hence truly 15 km, falsely 12 km — and the copied **bar** scale, shrunk to $80\\%$ along with everything else, would still measure true: the insight\'s moral, collected in full.',
                  ],
                  answer: 'True: 15 km; the printed RF suggests 12 km',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  plannedLessons: [],
}

