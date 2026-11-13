import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 9: Measurement
 *
 * LESSON 9.1 Units as Agreements (run 42, 2026-11-05) — the question
 * under every number the book has ever printed: what actually happened
 * when chapter 8 "measured"? Measurement defined in the is-said-to-be
 * dress as a count of units — the quantity is the property (length,
 * mass, time…), the unit is the chosen chunk, the number is how many
 * chunks fill it — with the identity quantity = number × unit as
 * equation tag 1; figure 1 the same 180 cm desk measured in three
 * students' handspans (18 cm → 10, 20 cm → 9, 22.5 cm → 8 — three
 * counts, one desk, every product 180); body (non-standard) units and
 * their single fatal flaw, invariability — the tailor's tape vs the
 * shopkeeper's metal rod (the NCERT Curiosity dress), the royal cubit's
 * ancient fix (7 palms × 4 digits = 28 digits; the granite rod of Maya,
 * 52.3 cm, palm ≈ 7.5 cm, digit ≈ 1.9 cm — the agreement cast in stone
 * and distributed), the barleycorn inch of English statute ("three
 * grains of barley, dry and round"), the honest Henry-I yard legend
 * (origin uncertain, the nose-bounding a folktale per William of
 * Malmesbury's account); the three requirements of a good unit
 * (invariable, replicable, agreed); the swap law n₁ × u₁ = n₂ × u₂
 * DERIVED as tag 2 (the same quantity counted in two units — the
 * products must agree) with figure 2 the one 2.5 m ribbon measured by
 * the 100 cm stick (2.5), the 50 cm stick (5) and the 10 cm stick (25),
 * products all 250 cm; the 2.5 m table across km/m/cm/mm (0.0025 /
 * 2.5 / 250 / 2500 — counts climbing ×10, ×100, ×1000 as the unit
 * shrinks); the inverse law (unit ÷ k ⇒ count × k, swept k = 2..100)
 * and the bare-number Caution ("250" is not a measurement); Illustration
 * 2 the swap-law check on the ribbon; base vs derived quantities (the
 * school three: length–metre, mass–kilogram, time–second; area m²
 * cashing 8.5's tiles, speed m/s cashing 6.2's journeys, the carpet
 * 12 m² = 120,000 cm² and the bus 45 km/h = 12.5 m/s by the 5/18 law);
 * the modern treaty: the Metre Convention, Paris, 20 May 1875, 17
 * states, the BIPM at Sèvres; the system named SI at the 11th CGPM,
 * 1960 — exactly 7 base units (the school three + ampere, kelvin,
 * mole, candela), the 2019 constant-redefinition one-sentence forward
 * colour; India's own agreement (the Standards of Weights and Measures
 * Act 1956, metric weights compulsory from 1 October 1960, the gaz and
 * the bigha giving way to the hectare, the Legal Metrology Act 2009 the
 * present keeper); the harvest roman ledger; the exam corner; the
 * historical callout (from body to treaty: the cubit rods, the
 * barleycorn statute, the honest yard legend, 1875 → 1960 = 85 years,
 * India 1956 → 1960 → 2009); 8 terms, 5-quiz (keys 0/1/2/2/2), 12
 * exercises L1–L6 (L6: the swap law proved and cashed; the packet
 * stamped "250" with no unit — 250 g = 0.25 kg, the recipe's 0.5 kg
 * unreachable from the bare number). Scope guard: no metric-prefix
 * tables (9.2 owns the metric system), no conversion-as-multiplying-by-
 * one drills (9.3), no precision/accuracy/rounding (9.4), no
 * measurement-error numerics (named qualitatively only). Authored in
 * the Cengage voice + solution chain; every number pre-verified by
 * scripts/verify-unit-9.ts (200 checks, A–M) BEFORE writing. Figure 1
 * redesigned once after its first VLM pass came in at 6/6 (arc counts
 * unverifiable, span-width climb invisible) — pass 2 with numbered
 * spans, shared rails and hooked dimension braces scored 10/9; figure 2
 * scored 10/9 (the ½ mark bumped for legibility).
 *
 * LESSON 9.2 The Metric System (run 43, 2026-11-05 — the first TWO-lesson
 * run per the owner's directive) — the treaty of 9.1 given its masterstroke:
 * one decimal family per quantity. The old world's mess (some 250,000 local
 * values; the pinte 0.93 L in Paris vs 1.46 L in Saint-Denis — 57% more under
 * the same name) and the rejected seconds-pendulum alternative (1790, gravity
 * varies with latitude); the metric-system Definition + the 1795 prefix law
 * (7 April — metre, gram, litre + Greek big steps deca/hecto/kilo, Latin small
 * steps deci/centi/milli, 231 years old in 2026) with the seven-rung table;
 * figure 1 the metric staircase (seven platforms, five countable dashed hops
 * from 3.45 km with per-hop ×10 labels — REDESIGNED twice after VLM 10/7,
 * pass 4 scored 10/8); the point-shift law DERIVED as tag 1 from the swap law
 * (u2 = u1/10^h ⇒ n2 = n1 × 10^h — the digits never change, the point walks);
 * the three families table (km-m-cm-mm, kg-g-mg, L-mL) + the kilogram
 * callout (the prefix-wearing base unit) + the tonne; figure 2 one quantity
 * on three rails (4.2 m/g/L read as 0.0042/4.2/4200 — the same ×1000 hop,
 * 10/9); the litre bridge as tag 2 (1 L = 1 dm³ = 1000 cm³, 1 mL = 1 cm³,
 * 1 m³ = 1000 L; the 1901→1964 litre history one clause) + the tank
 * Illustration (2×1.5×1 = 3 m³ = 3000 L); the metre's three bodies (Earth
 * 1791, bar 1799 at 443.296 lignes — honestly 0.02% short = 2 km in 10,000 =
 * one part in 5,000 = 0.2 mm on the bar; light 1983, c = 299,792,458 m/s);
 * the 1795 historical callout (the decimal day 100,000 s vs 86,400 —
 * abandoned in two years; US legal 1866, voluntary 1975); 8 terms, 5-quiz
 * (keys 0/2/1/2/3 verified live 5/5), 12 exercises L1-L6 (L6: the point-shift
 * proved by place-value expansion; the decimal day vs ours); 4,529 words;
 * verify-unit-9.ts EXTENDED N–U ALL PASS pre-writing; audit 0/0, E2E block
 * green, mobile exact-fit.
 *
 * LESSON 9.3 Converting Units Without Memorising Tables (run 43, same run) —
 * the engine on the ladder: multiplication by 1. The conversion-factor
 * Definition (a ratio of equal measures = 1 in disguise); the legality
 * derivation (Q × 1 preserves; units cancel like factors via Q = n × u) with
 * tag 1 the factor licence; figure 1 the cancellation machine, both dressings
 * (panel A strikes ONLY the km tokens — 4.2 and 1 survive, 4200 m out;
 * panel B the wrong dressing's orphan km·km/m + 0.0042 — REDESIGNED after
 * VLM 10/7 to the token strikes, pass 2 10/9); the direction test Caution +
 * the four-row table; chains (2.5 km → 250,000 cm; order free by
 * commutativity, matching not); the reciprocal either-dressing Note (4.5's
 * theorem wearing units); the speed pipeline derivation (54 km/h → 54,000
 * m/h → 15 m/s; the 5/18 collapse of 6.2 UNMASKED as two identities chained;
 * the return × 18/5 = 3.6) with figure 2 the pipeline rebuilt left-to-right
 * (pure-factor collapse box — VLM 9/6 → 10/9 after the rebuild); the
 * squared-factor law derived as tag 2 (1 m² = (100 cm)² = 10⁴ cm², NOT 100;
 * 1 cm² = 10² mm²; 1 m³ = 10⁶ cm³; the hectare and the tank re-cashed) + the
 * window/spray Illustration (35,000 cm²; 240 cm²) + the relay Illustration
 * (1.25 km = 1250 m = 125,000 cm); the identity economy (six facts + the
 * licence + the power rule) and the false-identity honesty (the method
 * multiplies whatever you hand it — the ladder guarantees the identities);
 * 8 terms, 5-quiz (keys 0/1/2/2/1 verified live 5/5), 12 exercises L1-L6
 * (L6: the squared-factor proof; 1 km/h = 5/18 m/s derived); 3,603 words;
 * verify sections W–AD ALL PASS pre-writing (428 checks total); audit 0/0,
 * E2E block green, mobile exact-fit.
 *
 * LESSON 9.4 Precision, Accuracy and Rounding in Measurement (run 44, same
 * day — the chapter-closing lesson) — every measurement is a claim, not a
 * fact: the 6.8 cm pencil read on three rulers (cm / half-cm / mm marks)
 * giving 7 cm, 7.0 cm and 6.8 cm — three honest readings, one pencil, the
 * instrument deciding the claim (figure 1: the plumb line dropping from the
 * pencil tip through all three rulers with the reading dots, VLM 10/9 after
 * two redesigns — the white-filled ruler bodies had swallowed the line, then
 * the line re-anchored at the true apex); the precision Definition (the
 * smallest unit the reading distinguishes) and the 7-vs-7.0 testimony Note
 * (the trailing zero vouches); the interval law DERIVED as tag 1 (m − u/2 ≤
 * t < m + u/2; left wall in by the half-up tie, right wall out) + the screw
 * Illustration ([2.35, 2.45)) + the nested-claims para ([6.75, 6.85) ⊂
 * [6.75, 7.25) ⊂ [6.5, 7.5)); the accuracy Definition + the 50-g-heavy
 * scale (spread 0, error 50 g ≈ 16.7% — precise, not accurate) with figure 2
 * the four targets (tight/wide × on/off bull — four VLM passes: P4’s
 * bull-straddling dart removed, ring clearances enforced at ≥ 9 px with dot
 * radius counted, P1 rebuilt as a regular pentagon centred exactly on the
 * bull — final VLM 9/8, geometry certified by the verify script); the
 * sprint-watch rehearsal (13.8/14.2/13.5 vs 13.9/13.9/13.9); the rounding
 * section (the digit rule as a Definition; 5,768 → 5,770/5,800/6,000 as
 * Illustration; the half-up convention Caution with 1,450 → 1,000 as the
 * not-half contrast; the round-once Caution — 2.3447 direct 2.34 vs chained
 * 2.35, and 47,499 → 47,000 vs 48,000); significant figures (leading zeros
 * locate, trailing zeros after the point testify, 4,200 ambiguous); the
 * greatest-possible-error derivation as tag 2 (GPE = u/2) + the instrument
 * table (mm ruler 0.5 mm; 5 g scale 2.5 g; the handspan — no GPE, the
 * return of invariability) + the kitchen-scale Illustration ([347.5, 352.5),
 * error 1 ≤ 2.5); the exam corner; the Everest 1856 historical callout
 * (29,002 ft announced; the 29,000+2 padding told as hedged lore; the audit
 * 29,002 ft = 8,839.81 m vs the 2020 8,848.86 m → error 9.05 m ≈ 0.102%);
 * 3 formula cards; 8 terms, 5-quiz (keys 1/1/2/1/0 verified live 5/5),
 * 12 exercises L1–L6 (L6: the interval law proved with the walls’ tie
 * behaviour; the Everest audit through the 1 ft = 0.3048 m identity). Scope
 * guard held: no sig-fig arithmetic, no relative-error formalism beyond the
 * single Everest instance, no statistics of repeated measurement (ch. 10),
 * no uncertainty algebra. Authored in the Cengage voice + solution chain;
 * every number pre-verified by scripts/verify-unit-9.ts (sections AE–AN +
 * AO, 531 → 534 checks A–AO ALL PASS) BEFORE writing. Unit-9 completion
 * review passed (run-6/11/20/25/36/41 precedent): BOOK_FORMAT checklist 7/7,
 * exam corners 4/4, lesson ids globally unique (book-wide 41/41), ch-09
 * status flipped to complete, plannedLessons emptied, totals recomputed at
 * ship.
 *
 * References: NCERT "Curiosity" class-6 ch. 5 "Measurement of Length
 * and Motion" (fecu105 — handspan/cubit/foot as non-standard units
 * that differ person to person; the shopkeeper's metal rod and the
 * tailor's flexible tape; the metre as the SI unit of length;
 * web-checked 2026-11-05) + NCERT class-11 physics ch. 2 "Units and
 * Measurements" (the SI's 7 base units and derived-unit charter;
 * web-checked) + the carried Khattar, Quantitative Aptitude (4e) for
 * exam-corner unit-item shapes. History web-checked: the cubit
 * (Wikipedia; the Liverpool World Museum rod of Maya, 52.3 cm,
 * 1336–1327 BC); the barleycorn inch (English statute language,
 * repeated in the 1824 Weights and Measures Act); the yard's origin
 * uncertain (William of Malmesbury's arm account; the nose-bounding a
 * folktale); the Metre Convention (BIPM — 20 May 1875, 17 states,
 * amended 1921; SI at the 11th CGPM 1960); India's metrology timeline
 * (OIML bulletin, the Indian perspective). No content reproduced;
 * exposition original. See docs/project/SOURCE_LOG.md.
 */
export const chapter09: Chapter = {
  number: 9,
  slug: 'measurement',
  title: 'Measurement',
  summary:
    'What it means to measure: units as agreements, the metric system from first principles, unit conversion as multiplication by one, and the difference between precision and accuracy.',
  status: 'complete',
  plannedLessons: [],
  lessons: [
    {
      id: 'fm-units-as-agreements',
      number: '9.1',
      title: 'Units as Agreements',
      concepts: [
        'Measurement as a count of units',
        'Quantity, unit, number — the three roles',
        'Body units and invariability',
        'The standard unit as an agreement',
        'The swap law n₁u₁ = n₂u₂',
        'The inverse law — smaller unit, bigger count',
        'Base and derived quantities',
        'SI — the worldwide agreement',
      ],
      objectives: [
        'Say exactly what a measurement is: a count of how many times a chosen unit fills the quantity — and read every measurement as number × unit',
        'Explain why body units (handspan, cubit, pace) fail — the unit varies with the measurer — and name the three properties a good unit must have',
        'State and prove the swap law n₁ × u₁ = n₂ × u₂, use it to move a quantity between units, and derive the inverse law: the unit shrinks k times, the count grows k times',
        'Sort quantities into base (length, mass, time) and derived (area, speed, volume…), and read derived units as little formulas (m², m/s)',
        'Tell the story of the worldwide agreement — from the cubit rods to the Metre Convention of 1875 to the SI of 1960 — and India\u2019s own 1956/1960/2009 timeline',
      ],
      prerequisites: [
        'fm-perimeter-and-area-rectangles-triangles-circles',
        'fm-rates-and-unit-rates',
      ],
      sources: ['ncert-sci6-curiosity-ch5', 'ncert-phys11-ch2', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Eight chapters of numbers, and almost every practical one arrived wearing a unit. The fence walked 82 m and cost Rs 1,230; the floor was covered by 80 tiles; the field measured 3 hectares; the bus of chapter 6 ran at 45 km/h; the lift of chapter 7 rose 9 m; the water tank filled in minutes. We wrote the numbers down and moved on. This chapter stops and asks the question those numbers never answered: *what actually happened when we measured?* Where did the 82 come from — and why metres? Who decided? What would have happened if the fence had been walked off in foot-lengths instead?',
        },
        {
          kind: 'para',
          text: 'The answer is the quietest big idea in mathematics, and it is this lesson\u2019s whole content: **a measurement is a count, and a unit is a chosen chunk that the count counts**. That sentence splits into the agreement question — *who chose the chunk, and why do we all use the same one?* — and the arithmetic question — *what happens to the count when the chunk changes?* The first question runs through Egyptian granaries and a Paris treaty of 1875; the second is one division long. Both are paid in full before the chapter moves on, because the metric system (9.2), unit conversion (9.3) and the honesty of rounded answers (9.4) are all just this lesson, iterated.',
        },
        { kind: 'heading', text: 'What measuring is: the count of units' },
        {
          kind: 'para',
          text: 'Begin where every honest account begins — with the act itself. To measure a length is not to *know* the length (the desk does not change when we measure it); it is to compare the desk against something already in hand and to report a **how many**. The something already in hand is the unit; the how many is the number; the desk\u2019s length — the actual extent that would be there whether we ever measured or not — is the quantity. Measuring lays the unit along the quantity as many times as it fits, and the measurement is the tally.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Measurement',
          text: 'A **measurement** is said to be a **count of how many times a chosen unit fills the quantity being measured**. Every measurement wears three parts: the **quantity** (the property being counted over — a length, a mass, a time…), the **unit** (the chosen chunk agreed in advance), and the **number** (how many chunks). The unit is never optional: the number is only a tally *of that chunk*.',
        },
        {
          kind: 'equation',
          latex: 'Q \\;=\\; n \\times u',
          note: 'The reading of every measurement: the **quantity** $Q$ equals the **number** $n$ of units times the **unit** $u$. "The desk is 180 cm" says $Q = 180 \\times (1 \\text{ cm})$. Change the chunk and $n$ must move — $Q$ never does. This one line is the whole grammar of chapters 1–8\u2019s practical numbers.',
        },
        {
          kind: 'para',
          text: 'For example, the sentences this book has already printed, read in the new grammar:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '"the fence is 82 m" — the quantity is a length, the unit the metre, the number 82: eighty-two copies of 1 m walk the boundary;',
            '"the sack holds 25 kg" — the quantity is a mass, the unit the kilogram, the number 25: the sack balances 25 copies of 1 kg;',
            '"the film runs 150 min" — the quantity is a duration, the unit the minute, the number 150.',
          ],
        },
        {
          kind: 'para',
          text: 'In each, the number was never travelling alone. "82" by itself measures nothing — 82 what? The unit rides beside every measurement the way a key signature rides beside a tune: silent most of the time, but nothing sounds right without it. Figure 1 makes the tally visible by measuring one desk three ways — and the misfortune it displays is exactly where the chapter is headed.',
        },
        {
          kind: 'example',
          title: 'One desk, three students, three handspans: 180 cm read as 10, 9 and 8 spans.',
          steps: [
            'Now, the desk\u2019s edge is one fixed extent — 180 cm, drawn once below; measuring it in handspans lays each student\u2019s span along the edge and counts.',
            'So the small hand (span 18 cm) fits $180 \\div 18 = 10$ times: ten spans end exactly at the far edge.',
            'And the medium hand (span 20 cm) fits $180 \\div 20 = 9$ times, the large hand (span 22.5 cm) $180 \\div 22.5 = 8$ times.',
            'Hence three tallies — 10, 9, 8 — of one unchanged desk: check the products, $10 \\times 18 = 9 \\times 20 = 8 \\times 22.5 = 180$; the desk never varied, only the chunk.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The same desk — 180 cm, drawn once between the two dashed rails — measured by three students\u2019 handspans. Each span is numbered so the tallies can be counted: the small hand\u2019s span (18 cm) walks the edge 10 times; the medium (20 cm) 9 times; the large (22.5 cm) 8 times — note the braces: the later rows\u2019 single span is visibly wider, and fewer of them fit. Every product returns 180: the desk did not change between the rows, and neither row is "wrong". The counts disagree because the units disagree — which is the whole case for agreeing on one unit.',
          svg: `<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One 180 cm desk edge drawn three times between two shared rails, measured in 10 spans of 18 cm, 9 spans of 20 cm and 8 spans of 22.5 cm, each span numbered">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">the same desk (180 cm), three handspans — the desk never changed</text>
  <line x1="60" y1="64" x2="60" y2="274" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.45"/>
  <line x1="420" y1="64" x2="420" y2="274" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.45"/>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <line x1="60" y1="54" x2="96" y2="54"/><line x1="60" y1="54" x2="60" y2="58"/><line x1="96" y1="54" x2="96" y2="58"/>
  </g>
  <text x="78" y="44" font-size="12" fill="currentColor" text-anchor="middle">one span — 18 cm</text>
  <line x1="60" y1="78" x2="420" y2="78" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <path d="M 60 78 Q 78 54 96 78"/><path d="M 96 78 Q 114 54 132 78"/><path d="M 132 78 Q 150 54 168 78"/><path d="M 168 78 Q 186 54 204 78"/><path d="M 204 78 Q 222 54 240 78"/><path d="M 240 78 Q 258 54 276 78"/><path d="M 276 78 Q 294 54 312 78"/><path d="M 312 78 Q 330 54 348 78"/><path d="M 348 78 Q 366 54 384 78"/><path d="M 384 78 Q 402 54 420 78"/>
    <line x1="96" y1="74" x2="96" y2="82"/><line x1="132" y1="74" x2="132" y2="82"/><line x1="168" y1="74" x2="168" y2="82"/><line x1="204" y1="74" x2="204" y2="82"/><line x1="240" y1="74" x2="240" y2="82"/><line x1="276" y1="74" x2="276" y2="82"/><line x1="312" y1="74" x2="312" y2="82"/><line x1="348" y1="74" x2="348" y2="82"/><line x1="384" y1="74" x2="384" y2="82"/>
  </g>
  <g font-size="9.5" fill="currentColor" text-anchor="middle">
    <text x="78" y="94">1</text><text x="114" y="94">2</text><text x="150" y="94">3</text><text x="186" y="94">4</text><text x="222" y="94">5</text><text x="258" y="94">6</text><text x="294" y="94">7</text><text x="330" y="94">8</text><text x="366" y="94">9</text><text x="402" y="94">10</text>
  </g>
  <text x="445" y="82" font-size="13" fill="currentColor">10 × 18 = 180 cm</text>
  <text x="240" y="116" font-size="12.5" fill="currentColor" text-anchor="middle">the small hand — span 18 cm</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <line x1="60" y1="148" x2="100" y2="148"/><line x1="60" y1="148" x2="60" y2="152"/><line x1="100" y1="148" x2="100" y2="152"/>
  </g>
  <text x="80" y="138" font-size="12" fill="currentColor" text-anchor="middle">one span — 20 cm</text>
  <line x1="60" y1="172" x2="420" y2="172" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <path d="M 60 172 Q 80 148 100 172"/><path d="M 100 172 Q 120 148 140 172"/><path d="M 140 172 Q 160 148 180 172"/><path d="M 180 172 Q 200 148 220 172"/><path d="M 220 172 Q 240 148 260 172"/><path d="M 260 172 Q 280 148 300 172"/><path d="M 300 172 Q 320 148 340 172"/><path d="M 340 172 Q 360 148 380 172"/><path d="M 380 172 Q 400 148 420 172"/>
    <line x1="100" y1="168" x2="100" y2="176"/><line x1="140" y1="168" x2="140" y2="176"/><line x1="180" y1="168" x2="180" y2="176"/><line x1="220" y1="168" x2="220" y2="176"/><line x1="260" y1="168" x2="260" y2="176"/><line x1="300" y1="168" x2="300" y2="176"/><line x1="340" y1="168" x2="340" y2="176"/><line x1="380" y1="168" x2="380" y2="176"/>
  </g>
  <g font-size="9.5" fill="currentColor" text-anchor="middle">
    <text x="80" y="188">1</text><text x="120" y="188">2</text><text x="160" y="188">3</text><text x="200" y="188">4</text><text x="240" y="188">5</text><text x="280" y="188">6</text><text x="320" y="188">7</text><text x="360" y="188">8</text><text x="400" y="188">9</text>
  </g>
  <text x="445" y="176" font-size="13" fill="currentColor">9 × 20 = 180 cm</text>
  <text x="240" y="210" font-size="12.5" fill="currentColor" text-anchor="middle">the medium hand — span 20 cm</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <line x1="60" y1="242" x2="105" y2="242"/><line x1="60" y1="242" x2="60" y2="246"/><line x1="105" y1="242" x2="105" y2="246"/>
  </g>
  <text x="82.5" y="232" font-size="12" fill="currentColor" text-anchor="middle">one span — 22.5 cm</text>
  <line x1="60" y1="266" x2="420" y2="266" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <path d="M 60 266 Q 82.5 242 105 266"/><path d="M 105 266 Q 127.5 242 150 266"/><path d="M 150 266 Q 172.5 242 195 266"/><path d="M 195 266 Q 217.5 242 240 266"/><path d="M 240 266 Q 262.5 242 285 266"/><path d="M 285 266 Q 307.5 242 330 266"/><path d="M 330 266 Q 352.5 242 375 266"/><path d="M 375 266 Q 397.5 242 420 266"/>
    <line x1="105" y1="262" x2="105" y2="270"/><line x1="150" y1="262" x2="150" y2="270"/><line x1="195" y1="262" x2="195" y2="270"/><line x1="240" y1="262" x2="240" y2="270"/><line x1="285" y1="262" x2="285" y2="270"/><line x1="330" y1="262" x2="330" y2="270"/><line x1="375" y1="262" x2="375" y2="270"/>
  </g>
  <g font-size="9.5" fill="currentColor" text-anchor="middle">
    <text x="82.5" y="282">1</text><text x="127.5" y="282">2</text><text x="172.5" y="282">3</text><text x="217.5" y="282">4</text><text x="262.5" y="282">5</text><text x="307.5" y="282">6</text><text x="352.5" y="282">7</text><text x="397.5" y="282">8</text>
  </g>
  <text x="445" y="270" font-size="13" fill="currentColor">8 × 22.5 = 180 cm</text>
  <text x="240" y="304" font-size="12.5" fill="currentColor" text-anchor="middle">the large hand — span 22.5 cm</text>
  <text x="380" y="340" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">three tallies of one desk — count them: 10, 9, 8. Every product: 180.</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'One honesty before the lesson leans on body units any harder: a real handspan rarely divides a real desk exactly. A span of 19 cm walks the 180 cm edge nine times and stops 9 cm short — the tally reads *nine spans and a bit*, and the "bit" is a genuine part of the count (this is why chapter 5\u2019s decimals exist: the count of units can be $2.5$, or $9.47$, or any number at all). The drawn rows divide exactly because the lesson chose spans that do; the arithmetic $Q = n \\times u$ never demanded whole numbers. Measured carefully, **every count is a number**, whole or not.',
        },
        { kind: 'heading', text: 'Why the unit must be agreed: the cubit\u2019s lesson' },
        {
          kind: 'para',
          text: 'The handspan belongs to a large and ancient family: measure a cloth from thumb-tip to little-finger tip and you have a **span**; from elbow to the tip of the middle finger, a **cubit**; one foot in front of the other in a natural walk, a **pace** or a **foot**; a finger\u2019s width, a **digit**. These *body units* were humanity\u2019s first units, and they were not stupid — they are always with you, roughly steady across a day, good enough to pace out a field or cut a cloth. What they are not is **invariable**: they change with the one thing no unit may change with — the measurer.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Non-standard (body) unit',
          text: 'A **non-standard unit** is said to be a **unit borrowed from the human body or the immediate surroundings — a handspan, a cubit, a pace, a handful — whose size is not fixed by any agreement**. Measuring the same quantity with them, different measurers get different counts, because each measurer brings a different unit. The failure is one word long: no **invariability**.',
        },
        {
          kind: 'para',
          text: 'The school laboratory dramatizes it exactly as figure 1 did: one desk, a row of students, and tallies that refuse to agree — and the disagreement is *nobody\u2019s error*. The tailor measuring a customer with a flexible tape and the shopkeeper measuring cloth with a metal rod are both being careful; but if the tailor reported her cloth in *her* spans and the shopkeeper restocked in *his*, their books would disagree by centimetres per span, every bolt, every day. Commerce on body units is an argument with no right answer. Civilisations felt this within centuries of building anything, and the earliest fix is also the first surviving measuring instrument: **stop using just any forearm — choose one, and write it down.**',
        },
        {
          kind: 'para',
          text: 'Egypt went further than choosing: it built a forearm worth choosing. The **royal cubit** was fixed at 7 palms of 4 digits — 28 digits in all — against the ordinary person\u2019s 6-palm cubit, and its length survives to this day in stone: the cubit rod of the official Maya, carved in the reign of Tutankhamun (c. 1336–1327 BCE), measures 52.3 cm — palm $\\approx 7.5$ cm, digit $\\approx 1.9$ cm. Surviving rods cluster near that length (attested cubits run roughly 44–53 cm — a spread that is itself the lesson: *someone* had to say which cubit counts). The rods were granite and basalt, kept in temples, copied for building sites: **the agreement made physical, and distributed so everyone measured with the same chunk.** That object — a fixed reference, a keeper, and copies — is the whole architecture of measurement law, five millennia early.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Standard unit',
          text: 'A **standard unit** is said to be a **unit fixed by agreement — a chosen reference whose size everyone treats as the same**. The agreement has three demands, and history kept tightening them in this order: (i) **invariable** — the unit does not change from person to person, place to place or season to season; (ii) **replicable** — the unit can be reproduced and checked, by a standard object or a definition anyone can consult; (iii) **agreed** — the community actually uses the same one, so numbers mean the same thing to every reader.',
        },
        {
          kind: 'para',
          text: 'Between the cubit rods and the treaty of 1875 sit a thousand local settlements, and two are worth their honesty here. English statute long defined the inch from barley: **"three grains of barley, dry and round"**, laid end to end — a charming definition that survives in law texts into the nineteenth century, though any cook knows grains of barley are not invariable (the definition is an *appeal to agreement* — "the barley everyone agrees to use" — more than a reproducible standard). And the most repeated origin story in all of metrology — that the yard was set by the arm of Henry I of England, the measure running from his nose to his thumb\u2019s tip — is just that, a story: the medieval chronicler William of Malmesbury does report the king\u2019s arm being used to correct traders\u2019 false ells, but the yard\u2019s true origin is uncertain and the nose-bounding is a folktale. The story survived *because* it dramatizes the truth: an early standard was often literally somebody\u2019s body, made official.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'A unit is a treaty',
          text: 'Strip the history and one sentence remains: **a unit is not a fact about the world — it is an agreement among people.** The desk\u2019s length is a fact; "180" is a count of a chunk, and the chunk exists because a community decided that this chunk, not that forearm, is what "1 cm" names. This is why changing the unit cannot change the quantity (the treaty never touches the desk) — and why the number *must* change when the unit does. Every argument in the rest of this lesson is that one sentence, cashed.',
        },
        { kind: 'heading', text: 'One quantity, many names: the swap law' },
        {
          kind: 'para',
          text: 'Now the arithmetic question — the one this lesson exists to settle before 9.3 turns it into a method. The ribbon on the counter is 250 cm of lace. Measured with the 100 cm stick it reads $250 \\div 100 = 2.5$; with the 50 cm stick, $250 \\div 50 = 5$; with the 10 cm stick, $250 \\div 10 = 25$. Three readings, one ribbon — and the readings are not free to wander: each must multiply back to the same cloth. That forced agreement is a theorem, and it is the engine of every unit conversion ever done.',
        },
        {
          kind: 'derivation',
          title: 'The swap law: the same quantity, counted in two units',
          statement:
            'One quantity $Q$ is measured in a unit $u_1$ with count $n_1$, and in a different unit $u_2$ with count $n_2$. Why must $n_1 \\times u_1 = n_2 \\times u_2$?',
          steps: [
            {
              label: 'Read each measurement by tag 1',
              formula: 'Q = n_1 \\times u_1 \\qquad \\text{and} \\qquad Q = n_2 \\times u_2',
              explanation:
                'Each measurement is a count of its own chunk: laying $u_1$ down $n_1$ times rebuilds the quantity, and so does laying $u_2$ down $n_2$ times.',
            },
            {
              label: 'Both products rebuild the same Q',
              formula: 'n_1 \\times u_1 = Q \\quad \\text{and} \\quad n_2 \\times u_2 = Q',
              explanation:
                'This is the force of "same quantity": whether the lace is read in 100 cm sticks or 10 cm sticks, the lace itself neither grew nor shrank.',
            },
            {
              label: 'Equate the two readings of Q',
              formula: 'n_1 \\times u_1 \\;=\\; n_2 \\times u_2',
              explanation:
                'Two expressions both equal to $Q$ are equal to each other — chapter 2\u2019s transitivity of equality, doing real work.',
            },
          ],
          result:
            'n_1 \\times u_1 = n_2 \\times u_2 — the counts may differ, the products may not. The quantity is the constant; number and unit move as an inseparable pair.',
        },
        {
          kind: 'equation',
          latex: 'n_1 \\times u_1 \\;=\\; n_2 \\times u_2',
          note: 'The **swap law** (tag 2). Its most-used face is the quotient dress $n_2 = n_1 \\times \\dfrac{u_1}{u_2}$: the count re-scales by the ratio of the units. The inverse law is its special case: if $u_2 = u_1 \\div k$ then $n_2 = n_1 \\times k$ — shrink the unit $k$ times and the count grows $k$ times, exactly (script-swept for every $k$ from 2 to 100).',
        },
        {
          kind: 'para',
          text: 'The ribbon, cashed: $2.5 \\times 100 = 5 \\times 50 = 25 \\times 10 = 250$. The three rows of figure 2 are one law wearing three dresses — and the right-hand products are the law\u2019s receipts.',
        },
        {
          kind: 'figure',
          caption:
            'One ribbon — 2.5 m of lace, drawn once — counted with three sticks. The 100 cm stick: 2.5 sticks (two full, one half). The 50 cm stick: 5 sticks exactly. The 10 cm stick: 25 sticks. The counts run 2.5 → 5 → 25 as the sticks shrink; every product is 250 cm. Bigger chunk, smaller count — the swap law, drawn.',
          svg: `<svg viewBox="0 0 760 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One 2.5 m ribbon bar, then three stick rows: 2.5 sticks of 100 cm, 5 sticks of 50 cm, 25 sticks of 10 cm, with products all 250 cm">
  <text x="380" y="22" font-size="12.5" fill="currentColor" text-anchor="middle">one ribbon — 2.5 m — three sticks, three counts</text>
  <rect x="60" y="38" width="360" height="12" fill="currentColor" opacity="0.18"/>
  <line x1="60" y1="38" x2="420" y2="38" stroke="currentColor" stroke-width="1.4"/>
  <line x1="60" y1="50" x2="420" y2="50" stroke="currentColor" stroke-width="1.4"/>
  <text x="450" y="48" font-size="12.5" fill="currentColor">the lace itself — never changes</text>
  <g fill="none" stroke="currentColor" stroke-width="1">
    <rect x="60" y="134" width="144" height="16"/>
    <rect x="204" y="134" width="144" height="16"/>
    <rect x="348" y="134" width="72" height="16" stroke-dasharray="4 3"/>
    <text x="384" y="147" font-size="12" fill="currentColor" text-anchor="middle">½</text>
  </g>
  <text x="450" y="146" font-size="12.5" fill="currentColor">2.5 × 100 = 250 cm</text>
  <text x="240" y="168" font-size="12" fill="currentColor" text-anchor="middle">counted with the 100 cm stick — 2.5 sticks</text>
  <g fill="none" stroke="currentColor" stroke-width="1">
    <rect x="60" y="210" width="72" height="16"/><rect x="132" y="210" width="72" height="16"/><rect x="204" y="210" width="72" height="16"/><rect x="276" y="210" width="72" height="16"/><rect x="348" y="210" width="72" height="16"/>
  </g>
  <text x="450" y="222" font-size="12.5" fill="currentColor">5 × 50 = 250 cm</text>
  <text x="240" y="244" font-size="12" fill="currentColor" text-anchor="middle">counted with the 50 cm stick — 5 sticks</text>
  <g fill="none" stroke="currentColor" stroke-width="0.8">
    <rect x="60" y="286" width="14.4" height="16"/><rect x="74.4" y="286" width="14.4" height="16"/><rect x="88.8" y="286" width="14.4" height="16"/><rect x="103.2" y="286" width="14.4" height="16"/><rect x="117.6" y="286" width="14.4" height="16"/><rect x="132" y="286" width="14.4" height="16"/><rect x="146.4" y="286" width="14.4" height="16"/><rect x="160.8" y="286" width="14.4" height="16"/><rect x="175.2" y="286" width="14.4" height="16"/><rect x="189.6" y="286" width="14.4" height="16"/><rect x="204" y="286" width="14.4" height="16"/><rect x="218.4" y="286" width="14.4" height="16"/><rect x="232.8" y="286" width="14.4" height="16"/><rect x="247.2" y="286" width="14.4" height="16"/><rect x="261.6" y="286" width="14.4" height="16"/><rect x="276" y="286" width="14.4" height="16"/><rect x="290.4" y="286" width="14.4" height="16"/><rect x="304.8" y="286" width="14.4" height="16"/><rect x="319.2" y="286" width="14.4" height="16"/><rect x="333.6" y="286" width="14.4" height="16"/><rect x="348" y="286" width="14.4" height="16"/><rect x="362.4" y="286" width="14.4" height="16"/><rect x="376.8" y="286" width="14.4" height="16"/><rect x="391.2" y="286" width="14.4" height="16"/><rect x="405.6" y="286" width="14.4" height="16"/>
  </g>
  <text x="450" y="298" font-size="12.5" fill="currentColor">25 × 10 = 250 cm</text>
  <text x="240" y="320" font-size="12" fill="currentColor" text-anchor="middle">counted with the 10 cm stick — 25 sticks</text>
  <text x="380" y="352" font-size="12" font-style="italic" fill="currentColor" text-anchor="middle">counts 2.5 → 5 → 25; the product never leaves 250 cm</text>
</svg>`,
        },
        {
          kind: 'table',
          caption: 'The same 2.5 m ribbon, named in four units. As the unit shrinks, the count climbs — and every product lands on 2.5 m.',
          head: ['unit $u$', 'count $n$ of the ribbon', 'the product $n \\times u$', 'in metres'],
          rows: [
            ['1 km', '$0.0025$', '$0.0025 \\times 1$ km $= 0.0025$ km', '$2.5$ m'],
            ['1 m', '$2.5$', '$2.5 \\times 1$ m $= 2.5$ m', '$2.5$ m'],
            ['1 cm', '$250$', '$250 \\times 1$ cm $= 250$ cm', '$2.5$ m'],
            ['1 mm', '$2500$', '$2500 \\times 1$ mm $= 2500$ mm', '$2.5$ m'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the count column downward: 0.0025 → 2.5 → 250 → 2500 — the counts multiply by 10, then 100, then 1000, exactly as fast as the units shrink. The ribbon\u2019s last column never moves. That is the inverse law in the wild, and it is worth naming precisely: **shrink the unit by a factor of $k$ and the count grows by the same factor $k$** — division and multiplication cancelling in the product $n \\times u$, the one thing they may not disturb.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The bare number is not the measurement',
          text: 'A label reading "250" — no unit — is not a small omission; it is no measurement at all. Is it 250 cm of lace (2.5 m, a scarf) or 250 mm (25 cm, a bookmark) or 250 km (a city trip)? The number $n$ is only ever a tally **of** the unit $u$; with $u$ missing, the product $n \\times u$ cannot be rebuilt and the quantity is unrecoverable. Likewise "the count doubled" is meaningless until asked: doubled *because the quantity doubled, or because the unit halved?* In trade this is not philosophy — Rs 250 and 250 paise are a factor of 100 apart, and the unit is the only thing standing between the customer and that gap.',
        },
        {
          kind: 'formula',
          name: 'The swap law (the seed of all conversion)',
          latex: 'n_1 \\times u_1 = n_2 \\times u_2',
          note: 'Same quantity, two units. Divide either side to move: $n_2 = n_1 \\times u_1 / u_2$. Special case — the inverse law: $u_2 = u_1/k \\Rightarrow n_2 = n_1 \\times k$. 9.3 builds its whole method on this one line.',
        },
        { kind: 'heading', text: 'Base and derived: the unit families' },
        {
          kind: 'para',
          text: 'Which quantities deserve units of their own? Not all of them — and the sorting is one of the tidier results of the agreement view. Length, mass and time are the elementary counts: each names a property of the world that no other quantity builds up, so each carries its own fundamental unit. Almost everything else this book has measured is a **compound of those three**, and its unit shows the recipe in its very spelling. Area is a length of lengths — a count of unit squares (8.5\u2019s tiles) — so its unit is metre × metre, worn on the sleeve as $\\text{m}^2$. Speed is distance paid per time — 6.2\u2019s journeys — so its unit is the quotient $\\text{m/s}$. The unit is a little formula for how the quantity is assembled.',
        },
        {
          kind: 'table',
          caption: 'The school-level base quantities and two of their many children. A derived unit is the base-unit recipe, written out.',
          head: ['quantity', 'kind', 'unit', 'the recipe it spells'],
          rows: [
            ['length', 'base', '$\\text{m}$', 'counted directly — no recipe'],
            ['mass', 'base', '$\\text{kg}$', 'counted directly — no recipe'],
            ['time', 'base', '$\\text{s}$', 'counted directly — no recipe'],
            ['area', 'derived', '$\\text{m}^2$', 'length $\\times$ length: $\\text{m} \\times \\text{m}$'],
            ['speed', 'derived', '$\\text{m/s}$', 'length $\\div$ time: $\\text{m/s}$'],
            ['volume', 'derived', '$\\text{m}^3$', 'length $\\times$ length $\\times$ length'],
          ],
        },
        {
          kind: 'para',
          text: 'Two receipts from the book\u2019s own ledger, because the families were already in use before they had names. The carpet of 8.5\u2019s tiling, 4 m by 3 m, covers $4 \\times 3 = 12$ squares of side 1 m — twelve $\\text{m}^2$, which is $12 \\times 10{,}000 = 120{,}000 \\text{ cm}^2$ the moment the unit is re-drawn in centimetres (the count climbs ×10,000 as the area-unit shrinks, the inverse law squared — literally). And the chapter-6 bus that covered 90 km in 2 h: its speed is $90 \\div 2 = 45$ km/h, which is $45 \\times \\frac{5}{18} = 12.5$ m/s in base-unit dress — the 5/18 law of 6.2 was the swap law all along, wearing a quotient unit.',
        },
        {
          kind: 'example',
          title: 'Build the derived units: the carpet’s area in two dresses and the bus’s speed in base-unit dress.',
          steps: [
            'Now, the carpet: $4 \\text{ m} \\times 3 \\text{ m} = 12 \\text{ m}^2$ — the unit $\\text{m}^2$ spelling out the recipe length × length.',
            'So re-drawn in centimetres, $1 \\text{ m}^2 = 10^4 \\text{ cm}^2$ (8.5\u2019s ladder), giving $12 \\times 10{,}000 = 120{,}000 \\text{ cm}^2$ — count ×10,000, unit ÷10,000, product $Q$ untouched.',
            'And the bus: $90 \\text{ km} \\div 2 \\text{ h} = 45$ km/h; in base units $45 \\times \\frac{5}{18} = 12.5$ m/s — the $\\text{m/s}$ spelling length ÷ time.',
            'Hence both derived readings cash: the units are formulas, and the swap law re-dresses them without touching the quantity.',
          ],
        },
        { kind: 'heading', text: 'The modern agreement: SI' },
        {
          kind: 'para',
          text: 'The cubit rods were one empire\u2019s treaty; the world needed a bigger one, and took an astonishingly long time to sign it. By the eighteenth century Europe carried a chaos of ells, toises, feet and pounds that differed at every border and often across the same market town — the old disease, grown continental. The industrial cure arrived as *diplomacy*: in Paris, on **20 May 1875**, representatives of **17 states** signed the **Metre Convention (Convention du Mètre)**, a treaty — the word is exact — to establish and maintain measurement standards in common. The treaty created the International Bureau of Weights and Measures (BIPM), which keeps the reference standards to this day at Sèvres, near Paris, and it was amended in 1921 to widen its charge. A measurement unit, five thousand years after the granite cubit rods, had become a matter of international law.',
        },
        {
          kind: 'para',
          text: 'The treaty\u2019s system grew into today\u2019s worldwide dictionary: at the 11th general conference (CGPM) in **1960** — 85 years after the signing — the system was named the **International System of Units, SI** (from the French *Système international d\u2019unités*). The SI rests on exactly **seven base units** — the metre, the kilogram, the second, the ampere, the kelvin, the mole and the candela — from which all other units (the $\\text{m}^2$ and $\\text{m/s}$ above, and thousands more) are derived. The school three lead the seven; the other four light up physics and chemistry in books above this one. (One forward glance only: in 2019 the definitions were re-cut so that each base unit is pinned to a fixed constant of nature — the kilogram to Planck\u2019s constant, for instance — which is 9.2\u2019s story; the agreement architecture is unchanged.)',
        },
        {
          kind: 'para',
          text: 'India\u2019s own page in the treaty book is recent and worth reading twice. Traditional measures — the *gaz* of cloth, the *bigha* of land, the *seer* of grain — ran for centuries, varying region to region exactly as ells varied across Europe. The **Standards of Weights and Measures Act, 1956** committed the country to the metric system; after a four-year preparation, metric weights and measures became compulsory in notified markets and industries on **1 October 1960** — the same season the world was naming the SI — and the *gaz* gave way to the metre, the *bigha* to the hectare. Today the framework is the **Legal Metrology Act, 2009**: every weighing scale in every bazaar answers, ultimately, to the same agreement the cubit rods pioneered — one keeper, one reference, everyone counting the same chunk.',
        },
        {
          kind: 'para',
          text: 'The harvest, in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'a measurement is a count: $Q = n \\times u$ — quantity, unit, number, all three, always;',
            'body units fail by invariability: the unit must not depend on the measurer;',
            'a standard unit is an agreement — invariable, replicable, agreed — with a keeper (the cubit rods kept it in granite; the BIPM keeps it in Sèvres);',
            'the swap law $n_1 u_1 = n_2 u_2$: same quantity, two units, one product;',
            'the inverse law: unit ÷ $k$ ⇒ count × $k$ — the see-saw of the count column in the ribbon table;',
            'base quantities (length, mass, time at school level) carry elementary units; derived units are the recipes ($\\text{m}^2$, $\\text{m/s}$);',
            'SI — the 1875 treaty\u2019s system, named 1960 — is the current worldwide agreement: 7 base units, one dictionary, in force in every bazaar from Sèvres to the nearest sabzi mandi.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'This lesson\u2019s staples are identification and law, not long computation: naming SI units of the base quantities (metre, kilogram, second) and pairing quantities to units (area $\\to \\text{m}^2$, speed $\\to \\text{m/s}$) across SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks; reading a measurement into number × unit ("350 mL" → 350 of the mL); small conversion items that are the swap law at $k = 10$, 100, 1000 (cm into m, mL into L — the same shape, none reproduced here); and "why standard units?" reasoning items whose expected answer is the invariability argument this lesson proved with three handspans. The counts are the lesson\u2019s own; the question *shapes* are the banks\u2019 regulars.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'From body to treaty — five thousand years in one lesson',
          text: 'The span, the pace and the digit are older than writing; the first *standard* survives in granite — Egypt\u2019s royal cubit, 7 palms × 4 digits, the rod of Maya (c. 1336–1327 BCE) still measuring 52.3 cm, with royal rods copied for the building sites so the kingdom counted one chunk. Rome marched on the *pes* (foot) and mile (mille passus — a thousand paces); England legislated the inch from "three grains of barley, dry and round" and told honest-untrue stories about Henry I\u2019s arm setting the yard. The disease — a thousand local units, no two agreeing — lasted until trade and science could no longer afford it: the **Metre Convention**, Paris, **20 May 1875**, seventeen states, a real treaty creating a real bureau (the BIPM at Sèvres) to keep the standards. **1960**: the system named **SI**, seven base units, adopted everywhere school mathematics now lives. **India**: the 1956 Act, metric compulsory from **1 October 1960**, the *gaz* and *bigha* retiring, the Legal Metrology Act 2009 the present keeper. Five thousand years, one direction: from somebody\u2019s forearm to everybody\u2019s agreement.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Measurement',
              def: 'A count of how many times a chosen unit fills the quantity being measured; read as $Q = n \\times u$ — quantity, unit, number.',
            },
            {
              term: 'Quantity',
              def: 'The property being measured — a length, a mass, a duration, an area. The one part of a measurement that never changes when the unit does.',
            },
            {
              term: 'Unit',
              def: 'The chosen chunk a measurement counts in — 1 m, 1 kg, 1 s. An agreement, not a fact: $n$ is only ever a tally *of that chunk*.',
            },
            {
              term: 'Non-standard (body) unit',
              def: 'A unit borrowed from the body or surroundings — handspan, cubit, pace, handful. Always available; fatal because it varies with the measurer.',
            },
            {
              term: 'Standard unit',
              def: 'A unit fixed by agreement — invariable, replicable, and actually agreed upon. The royal cubit rods and the SI are the same idea, 5,000 years apart.',
            },
            {
              term: 'Swap law',
              def: 'For one quantity read in two units: $n_1 \\times u_1 = n_2 \\times u_2$. The counts differ; the product may not. The seed of all unit conversion.',
            },
            {
              term: 'Inverse law',
              def: 'Shrink the unit $k$ times and the count grows $k$ times ($u_2 = u_1/k \\Rightarrow n_2 = n_1 k$) — why 2.5 m is 250 cm and 2500 mm.',
            },
            {
              term: 'SI',
              def: 'The International System of Units — the worldwide agreement, named 1960 under the 1875 Metre Convention: 7 base units (metre, kilogram, second, ampere, kelvin, mole, candela) and all derived units.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'To measure a length is to',
              options: [
                'compare it with a chosen unit and count how many times the unit fills it',
                'weigh it on a balance against known masses',
                'trace its outline carefully on paper',
                'count how many corners the object has',
              ],
              answer: 0,
              explain:
                'The definition: a measurement is a count of units — compare, lay along, tally (Option 1). Option 2 measures mass, a different quantity. Option 3 records a shape, not a size. Option 4 counts corners, which no unit fills.',
            },
            {
              q: 'Three students measure the same desk in handspans and report 10, 9 and 8. The best explanation is',
              options: [
                'the desk shrank between measurements',
                'their handspans differ — the unit varied with the measurer',
                'at least two students miscounted',
                'the desk genuinely has all three lengths',
              ],
              answer: 1,
              explain:
                'Body units are not invariable: each student carried a different chunk, so each count is honest for its own span (Option 2). Option 1 contradicts the invariance of quantities. Option 3 blames care where the disease is the unit. Option 4 confuses counts with the quantity — one desk, one length, three tallies.',
            },
            {
              q: 'A ribbon is 250 cm long. Measured in metres (1 m = 100 cm), its count is',
              options: ['$2500$', '$25$', '$2.5$', '$0.25$'],
              answer: 2,
              explain:
                'The swap law: $n_2 = n_1 \\times u_1/u_2 = 250 \\times 1/100 = 2.5$ (Option 3). Option 1 multiplies by 10 twice. Option 2 divides by 10 once. Option 4 divides by 1000 — millimetre thinking in a metre question. Check: $2.5 \\times 100 = 250$. ✓',
            },
            {
              q: 'The SI unit of length agreed worldwide is the',
              options: ['foot', 'cubit', 'metre', 'handspan'],
              answer: 2,
              explain:
                'The metre — the 1875 treaty\u2019s namesake, one of the SI\u2019s 7 base units (Option 3). Options 1, 2 and 4 are the body-era units the treaty was signed to replace.',
            },
            {
              q: 'The unit is made 10 times smaller. For the same quantity, the count',
              options: [
                'becomes 10 times smaller',
                'stays the same',
                'becomes 10 times larger',
                'becomes zero',
              ],
              answer: 2,
              explain:
                'The inverse law: $n_1 u_1 = n_2 u_2$ with $u_2 = u_1/10$ forces $n_2 = 10 n_1$ (Option 3) — 2.5 m is 25 counts of 10 cm but 2.5 counts of 100 cm. Option 1 is the see-saw backwards. Option 2 is the quantity\u2019s behaviour, not the count\u2019s. Option 4 is not a thing counts do.',
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
                  q: 'Read each measurement into its three parts — quantity, unit, number: (i) 2 kg of tomatoes; (ii) a 150-page notebook; (iii) a 90-minute film; (iv) 350 mL of juice.',
                  solution: [
                    'Now, apply the grammar $Q = n \\times u$ to each in turn.',
                    'So (i) quantity = mass, unit = kg, number = 2; (ii) quantity = a count of pages, unit = 1 page, number = 150.',
                    'And (iii) quantity = duration, unit = minute, number = 90; (iv) quantity = volume, unit = mL, number = 350.',
                    'Hence every measurement in the shop and the timetable is a number of chunks — no exceptions.',
                  ],
                  answer: '(i) mass · kg · 2; (ii) pages · page · 150; (iii) duration · minute · 90; (iv) volume · mL · 350',
                },
                {
                  q: 'Name the SI base unit of (i) length, (ii) mass, (iii) time.',
                  solution: [
                    'Now, the school three lead the SI\u2019s seven base units.',
                    'So length is measured in the metre, mass in the kilogram, time in the second.',
                    'Hence metre, kilogram, second — the three chunks every other school quantity is built from.',
                  ],
                  answer: '(i) metre; (ii) kilogram; (iii) second',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A corridor measured in paces gives 40 paces for the father and 44 for the son. Give the reason the counts differ, and name the thing that stays the same.',
                  solution: [
                    'Now, the counts differ because the units differ: the son\u2019s pace is shorter, so more of them fit the corridor.',
                    'So at a 0.7 m pace the father reads $40 \\times 0.7 = 28$ m and the son $44 \\times 0.7 = 30.8$ m — each honest for his own chunk.',
                    'And the corridor stays one corridor: one quantity, two tallies — exactly the desk-and-handspans situation.',
                    'Hence the fault is invariability\u2019s absence, not anyone\u2019s counting; the swap law $40 \\times 70 \\text{ cm} \\ne 44 \\times 70 \\text{ cm}$ betrays the two chunks.',
                  ],
                  answer: 'The pace (unit) differs from person to person; the corridor’s length stays the same.',
                },
                {
                  q: 'A ribbon is 2.5 m long. Express the same ribbon in centimetres, and check the two readings against the swap law.',
                  solution: [
                    'Now, the readings: $2.5$ of the 1 m unit, and in the 1 cm unit $n_2 = n_1 \\times u_1/u_2 = 2.5 \\times 100/1 = 250$.',
                    'So the ribbon is 250 cm.',
                    'And the swap law demands $n_1 u_1 = n_2 u_2$: $2.5 \\times 100 = 250 \\times 1 = 250$. ✓',
                    'Hence 250 cm — count ×100, unit ÷100, quantity untouched.',
                  ],
                  answer: '$250$ cm; $2.5 \\times 100 = 250 \\times 1$ ✓',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A juice bottle holds 1.5 L. How many millilitres is that? Which grew — the juice, or the count?',
                  solution: [
                    'Now, the millilitre is 1000 times smaller than the litre.',
                    'So the count grows ×1000: $n_2 = 1.5 \\times 1000 = 1500$ — the bottle holds 1500 mL.',
                    'And the juice itself never moved: $1500 \\times 1 \\text{ mL} = 1.5 \\times 1000 \\text{ mL} = 1.5 \\text{ L}$ — the swap law\u2019s products agree.',
                    'Hence 1500 mL; the count grew (unit ÷1000), the juice did not.',
                  ],
                  answer: '$1500$ mL — the count grew, the juice stayed 1.5 L',
                },
                {
                  q: 'A 3 m rope is cut into pieces of 30 cm each. How many pieces?',
                  solution: [
                    'Now, work in one unit: 3 m = 300 cm.',
                    'So the number of pieces is the length divided by the unit-piece: $300 \\div 30 = 10$.',
                    'And the check rebuilds the rope: $10 \\times 30 = 300$ cm. ✓',
                    'Hence 10 pieces.',
                  ],
                  answer: '$10$ pieces',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A grocer sells rice by the handful. Give two troubles this causes, and name the property a fair unit must have.',
                  solution: [
                    'Now, the handful is a body unit: the grocer\u2019s hand and the customer\u2019s hand hold different amounts.',
                    'So trouble one — the same price buys different quantities from different sellers (or even the same seller on a tired evening); trouble two — no receipt can be checked, since "6 handfuls" names no fixed quantity.',
                    'And the cure is the unit\u2019s first requirement: invariability — the kilogram reads the same in every hand.',
                    'Hence handfuls fail fairness because they fail invariability; the standard unit is the agreement that repairs it.',
                  ],
                  answer: 'Different hands, different amounts; no checkable quantity. The unit must be invariable.',
                },
                {
                  q: 'A carpet is 4 m by 3 m. (i) Find its area in m². (ii) Why does the unit of area wear the exponent 2?',
                  solution: [
                    'Now, (i) the tiling view: $4 \\times 3 = 12$ squares of side 1 m — the area is $12 \\text{ m}^2$.',
                    'So (ii) the exponent spells the recipe: area is a length of lengths, $\\text{m} \\times \\text{m}$, and a product of two like factors wears the power 2.',
                    'And in the smaller unit: $1 \\text{ m}^2 = 10^4 \\text{ cm}^2$, so $12 \\text{ m}^2 = 120{,}000 \\text{ cm}^2$ — the inverse law squared.',
                    'Hence $12 \\text{ m}^2$; the 2 is the recipe length × length, written on the unit\u2019s sleeve.',
                  ],
                  answer: '(i) $12$ m²; (ii) area = length × length, so the unit is m × m = m²',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A bus covers 90 km in 2 h. Find its speed (i) in km/h, (ii) in m/s.',
                  solution: [
                    'Now, (i) speed is distance ÷ time: $90 \\div 2 = 45$ km/h.',
                    'So (ii) re-dress in base units by the 5/18 law of 6.2: $45 \\times \\frac{5}{18} = \\frac{225}{18} = 12.5$ m/s.',
                    'And the long way agrees: 90 km = 90,000 m and 2 h = 7,200 s, so $90{,}000 \\div 7{,}200 = 12.5$ m/s. ✓',
                    'Hence 45 km/h = 12.5 m/s — one speed, two unit-dresses, one swap law.',
                  ],
                  answer: '(i) $45$ km/h; (ii) $12.5$ m/s',
                },
                {
                  q: 'Why does a country keep a national standards laboratory? Answer in the language of agreements and keepers.',
                  solution: [
                    'Now, an agreement is only as good as its keeper: "the same chunk" must be *somewhere*, fixed and checkable.',
                    'So the standards laboratory keeps the national reference standards and compares working measures against them — the modern dress of the temple that kept Egypt\u2019s cubit rods.',
                    'And it hands out verified copies (for shops, industry, laboratories), so every scale and tape in the country counts the same chunk — replicability, enforced.',
                    'Hence the laboratory is the treaty\u2019s custodian: invariable, replicable, agreed — kept true by an institution, not by hope.',
                  ],
                  answer: 'The agreement needs a keeper: the lab holds the reference standards and verifies every working copy — the cubit-rod architecture, institutionalised.',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the swap law: if one quantity $Q$ is measured in unit $u_1$ with count $n_1$ and in unit $u_2$ with count $n_2$, then $n_1 \\times u_1 = n_2 \\times u_2$. Cash it on the 250 cm ribbon.',
                  solution: [
                    'Now, by the definition of measurement, laying the unit down count-times rebuilds the quantity: $Q = n_1 \\times u_1$ and $Q = n_2 \\times u_2$.',
                    'So both products equal the same $Q$ — the ribbon does not grow when the stick changes.',
                    'And two things equal to the same thing are equal to each other: $n_1 \\times u_1 = n_2 \\times u_2$. (Equality\u2019s transitivity — chapter 2\u2019s oldest tool.)',
                    'Hence the swap law. Cashed: $2.5 \\times 100 = 250 \\times 1 = 250$ — the 2.5-metre and the 250-centimetre readings are one ribbon.',
                  ],
                  answer: '$Q = n_1u_1 = n_2u_2$ by transitivity of equality; on the ribbon, $2.5 \\times 100 = 250 \\times 1 = 250$ ✓',
                },
                {
                  q: 'A packet is stamped "250" with no unit; the fill is 250 g. A buyer’s recipe needs 0.5 kg of flour. Show how the bare number misleads, and how the unit repairs it.',
                  solution: [
                    'Now, the bare number cannot speak: read as grams it is a small packet ($250$ g), read as quarter-kilograms it is a big one ($250 \\times 250$ g $= 62.5$ kg) — the same 250, quantities a factor of 250 apart.',
                    'So with the unit restored the packet says $250 \\text{ g} = 250/1000 = 0.25$ kg — an exact quantity.',
                    'And the recipe\u2019s demand converts the same way: $0.5 \\text{ kg} = 500$ g, so the buyer needs $500 \\div 250 = 2$ packets.',
                    'Hence two packets — the unit turns the ambiguous "250" into a countable chunk and the swap law does the shopping.',
                  ],
                  answer: '250 g = 0.25 kg per packet; the recipe’s 0.5 kg = 500 g needs 500 ÷ 250 = 2 packets — impossible to decide from the bare "250"',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-the-metric-system',
      number: '9.2',
      title: 'The Metric System',
      concepts: [
        'The metric system — one decimal family',
        'Prefixes: kilo, hecto, deca, deci, centi, milli',
        'The point-shift law',
        'The three school families: metre, gram, litre',
        'The kilogram — the prefix-wearing base unit',
        'The litre and the cubic decimetre',
        'The metre from the Earth',
        'The 1795 law and the road to SI',
      ],
      objectives: [
        'Say what makes the metric system a system: every step between a unit and its multiples is the same step — a power of ten — and read the six school prefixes (kilo, hecto, deca, deci, centi, milli) with their factors',
        'State and prove the point-shift law: h hops down the ladder multiply the count by 10^h, so converting is moving the decimal point, not doing arithmetic',
        'Work the three school families — kilometre–metre–centimetre–millimetre, kilogram–gram–milligram, litre–millilitre — in both directions, including decimal quantities',
        'Use the litre bridge (1 L = 1 dm³ = 1000 cm³, 1 m³ = 1000 L) to carry volume problems, and place the tonne on the mass rail',
        'Tell the metre\u2019s three bodies honestly — the Earth-quadrant definition of 1791, the platinum bar of 1799 (0.02% short, one part in 5,000), the light-speed metre of 1983 — and date the 1795 prefix law and the world\u2019s adoption',
      ],
      prerequisites: ['fm-units-as-agreements', 'fm-decimal-places-and-the-point', 'fm-operating-on-decimals'],
      sources: ['ncert-sci6-curiosity-ch5', 'ncert-phys11-ch2', 'wikipedia-metre-history', 'usma-1795-decree', 'sizes-litre-1964', 'ncj-measuring-the-meter'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 9.1 left measurement standing on one sentence: *a unit is a treaty*. The treaty tells us what a unit must be — invariable, replicable, agreed — but it does not say anything about how the units of a country should relate to **one another**. And there history delivers the sharpest possible contrast, because the old world\u2019s units did not relate at all. Late-eighteenth-century France ran on hundreds of local unit names, and historians who counted the local values behind them reached some **250,000 different sizes**: the same word meant a different amount in almost every town. A *pinte* in Paris held about 0.93 L; in Saint-Denis, ten kilometres away, the same *pinte* held about 1.46 L — the same name carrying **57% more** ($1.46 \\div 0.93 \\approx 1.57$). Measuring was not just inconsistent; it was a way of charging, because every boundary between towns was also an exchange rate.',
        },
        {
          kind: 'para',
          text: 'This lesson is about the fix — and the fix is the most under-appreciated engineering decision in the whole of school mathematics. The French reformers of the 1790s did not merely agree on **one** new unit (that would have been one more treaty, like the royal cubit was). They built an entire **family** of units with a single design rule: every step from a unit to its bigger and smaller siblings would be the **same kind of step — a power of ten** — so that all of the conversion arithmetic would collapse into the one skill the nation already possessed from counting money in decimal coin: moving the decimal point. That design is the **metric system**, and everything in this lesson — the prefix names, the ladder, the point-shift law, the three school families, the metre\u2019s remarkable biography — is that one design rule, cashed.',
        },
        { kind: 'heading', text: 'Why a system at all: the mess and the pendulum' },
        {
          kind: 'para',
          text: 'Begin by giving the old world its due. Body units failed *invariability* (9.1\u2019s finding), so communities replaced them with **standard objects** — rods, stones, containers — kept by guilds, temples and markets. That repaired the agreement problem inside one town. But every town kept its own rod, and every commodity its own container, so between towns the counts fell apart again: the league, the pound, the pint, the bigha each split into regional costumes. The tables a merchant needed were not one table but hundreds, and their ratios were ragged on purpose: 12 inches to the foot, 3 feet to the yard, 16 ounces to the pound, 8 furlongs to the mile — none of them the same, each one a separate fact to memorise, each one a fresh chance to err.',
        },
        {
          kind: 'para',
          text: 'The reformers also considered — and rejected — the obvious cheap alternative. In 1790 Talleyrand proposed to the French Assembly that the new unit simply be the length of a **seconds pendulum**: a pendulum that takes one second per swing, measurable by anyone with a string, a weight and a clock. The Academy of Sciences turned it down for the deepest of reasons: **gravity is not the same everywhere**. A pendulum\u2019s swing depends on local gravity, which varies with latitude and altitude, so the "same" pendulum would define a slightly different length in Paris, in Quito, or on a mountain — the unit would quietly depend on *where you stood*. The proposal lost by millimetres, and the Academy demanded instead a standard **outside the argument altogether**: a piece of the Earth itself. That choice, made in 1791, is the next section\u2019s story.',
        },
        { kind: 'heading', text: 'The metric system: one ladder, every quantity' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Metric system',
          text: 'A **metric system** is said to be a **system of measurement in which all the units of one quantity form a single decimal family — every neighbouring pair related by a power of ten**. One base unit sits in the middle (the metre for length, the gram at the root of mass, the litre for capacity); the bigger and smaller units are built from it by **prefixes**. Because every step is a ten-fold step, converting never needs a table: it needs only the ladder.',
        },
        {
          kind: 'para',
          text: 'The prefix names were fixed by French law on **7 April 1795** — a law that also made the metre, the gram and the litre the legal units of France. The design is beautifully two-sided: the **big** steps took their names from Greek, the **small** steps from Latin, so a unit\u2019s name announces at a glance which side of the ladder it lives on:',
        },
        {
          kind: 'table',
          caption: 'The prefix ladder: one design rule, six names. Greek roots for the big steps, Latin for the small — fixed by the law of 7 April 1795.',
          head: ['Prefix', 'Symbol', 'Factor', 'Meaning', 'On the length rail'],
          rows: [
            ['kilo-', 'k', '$1000 = 10^3$', 'thousand (Greek)', '$1\\text{ km} = 1000\\text{ m}$'],
            ['hecto-', 'h', '$100 = 10^2$', 'hundred (Greek)', '$1\\text{ hm} = 100\\text{ m}$'],
            ['deca-', 'da', '$10$', 'ten (Greek)', '$1\\text{ dam} = 10\\text{ m}$'],
            ['— (the unit itself)', '—', '$1$', 'the base', '$1\\text{ m}$'],
            ['deci-', 'd', '$0.1 = 1/10$', 'tenth (Latin)', '$1\\text{ dm} = 0.1\\text{ m}$'],
            ['centi-', 'c', '$0.01 = 1/100$', 'hundredth (Latin)', '$1\\text{ cm} = 0.01\\text{ m}$'],
            ['milli-', 'm', '$0.001 = 1/1000$', 'thousandth (Latin)', '$1\\text{ mm} = 0.001\\text{ m}$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The same ladder, borrowed by every quantity',
          text: 'The table\u2019s last column is the point: the prefixes are **not length units**. *Kilo-* means "thousand" the way "dozen" means twelve — it rides on whatever base unit it attaches to. So the ladder is built **once** and borrowed three times in school: $\\text{km, hm, dam, m, dm, cm, mm}$ for length; $\\text{kg, hg, dag, g, dg, cg, mg}$ for mass; $\\text{kL, hL, daL, L, dL, cL, mL}$ for capacity. Learn one ladder, own every quantity. (The modern SI extends the same idea to 24 prefixes from $10^{30}$ down to $10^{-30}$ — same rule, longer ladder; the school six are all this lesson needs.)',
        },
        {
          kind: 'para',
          text: 'Honesty about the working cast, though: the ladder has seven rungs, but daily life walks only some of them. Length lives on **km–m–cm–mm**; mass on **kg–g–mg** (with the tonne waiting above — see below); capacity on **L–mL**. The hecto-, deca- and deci- stations exist and behave exactly as the table says — the hectare you met in 8.5 is nothing but a square **hecto-metre**, $100\\text{ m} \\times 100\\text{ m}$ — but they are the rails more than the trains. The ladder is complete so the arithmetic is complete; the traffic is another matter.',
        },
        {
          kind: 'figure',
          caption:
            'The metric staircase: seven steps, one rule. Each platform is one rung of the ladder — the prefix name above the line, the factor it carries below. The dashed walk starts at 3.45 km and hops down the ladder — each hop lands on the next rung and multiplies the count by 10 (five labelled hops): three hops reach the metre, two more reach the centimetre, and 3.45 km = 3450 m = 345,000 cm. The factors multiply, the digits never change — only the point walks.',
          svg: `<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The seven-step metric staircase from kilo to milli with factors, and a walk from 3.45 km down to 3450 m and 345,000 cm">
  <text x="380" y="24" font-size="13" fill="currentColor" text-anchor="middle">the metric staircase — every step is one power of ten</text>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="40" y1="84" x2="120" y2="84"/><line x1="40" y1="80" x2="40" y2="88"/><line x1="120" y1="80" x2="120" y2="88"/>
    <line x1="128" y1="134" x2="208" y2="134"/><line x1="128" y1="130" x2="128" y2="138"/><line x1="208" y1="130" x2="208" y2="138"/>
    <line x1="216" y1="184" x2="296" y2="184"/><line x1="216" y1="180" x2="216" y2="188"/><line x1="296" y1="180" x2="296" y2="188"/>
    <line x1="304" y1="234" x2="384" y2="234"/><line x1="304" y1="230" x2="304" y2="238"/><line x1="384" y1="230" x2="384" y2="238"/>
    <line x1="392" y1="284" x2="472" y2="284"/><line x1="392" y1="280" x2="392" y2="288"/><line x1="472" y1="280" x2="472" y2="288"/>
    <line x1="480" y1="334" x2="560" y2="334"/><line x1="480" y1="330" x2="480" y2="338"/><line x1="560" y1="330" x2="560" y2="338"/>
    <line x1="568" y1="384" x2="648" y2="384"/><line x1="568" y1="380" x2="568" y2="388"/><line x1="648" y1="380" x2="648" y2="388"/>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="84" y="72">kilo-</text><text x="172" y="122">hecto-</text><text x="260" y="172">deca-</text><text x="348" y="222">(the unit)</text><text x="436" y="272">deci-</text><text x="524" y="322">centi-</text><text x="612" y="372">milli-</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="84" y="102">× 1000</text><text x="172" y="152">× 100</text><text x="260" y="202">× 10</text><text x="348" y="252">× 1</text><text x="436" y="302">× 0.1</text><text x="524" y="352">× 0.01</text><text x="612" y="402">× 0.001</text>
  </g>
  <g fill="currentColor">
    <circle cx="116" cy="84" r="2.5"/><circle cx="142" cy="134" r="2.5"/><circle cx="204" cy="134" r="2.5"/><circle cx="230" cy="184" r="2.5"/><circle cx="292" cy="184" r="2.5"/><circle cx="318" cy="234" r="2.5"/><circle cx="380" cy="234" r="2.5"/><circle cx="406" cy="284" r="2.5"/><circle cx="468" cy="284" r="2.5"/><circle cx="494" cy="334" r="2.5"/>
  </g>
  <g stroke="currentColor" stroke-width="1.1" fill="none" stroke-dasharray="5 3">
    <path d="M 116 84 Q 133 93 142 134"/>
    <path d="M 204 134 Q 221 143 230 184"/>
    <path d="M 292 184 Q 309 193 318 234"/>
    <path d="M 380 234 Q 397 243 406 284"/>
    <path d="M 468 284 Q 485 293 494 334"/>
  </g>
  <g font-size="10.5" fill="currentColor" text-anchor="middle">
    <text x="166" y="94">× 10</text>
    <text x="254" y="144">× 10</text>
    <text x="342" y="194">× 10</text>
    <text x="430" y="244">× 10</text>
    <text x="518" y="294">× 10</text>
  </g>
  <g font-size="12" fill="currentColor">
    <text x="120" y="66">3.45 km →</text>
  </g>
  <text x="380" y="424" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">five countable hops of ten — three to the metre, two more to the centimetre: 3.45 km = 3450 m = 345,000 cm</text>
</svg>`,
        },
        { kind: 'heading', text: 'The point-shift law' },
        {
          kind: 'para',
          text: 'Now the theorem that makes the whole design pay. Lesson 9.1 derived the swap law: one quantity read in two units obeys $n_1 \\times u_1 = n_2 \\times u_2$, so the new count is always $n_2 = n_1 \\times u_1 / u_2$. In the metric family the new unit is never arbitrary — it is the old unit divided by a power of ten. Watch what that does to the swap law\u2019s arithmetic:',
        },
        {
          kind: 'derivation',
          title: 'The point-shift law: h hops ⇒ the point moves h places',
          statement:
            'A quantity is counted in unit $u_1$ with count $n_1$. The new unit is $u_2 = u_1 / 10^h$ ($h$ rungs down the ladder). What is the new count $n_2$?',
          steps: [
            {
              label: 'Start from the swap law (9.1, tag 2)',
              formula: 'n_1 \\times u_1 = n_2 \\times u_2',
              explanation: 'One quantity, two counts — the products must agree.',
            },
            {
              label: 'Substitute the metric dress of the new unit',
              formula: 'n_1 \\times u_1 = n_2 \\times \\frac{u_1}{10^h}',
              explanation: 'In the metric system the new unit is the old one divided by a power of ten — that is the design rule.',
            },
            {
              label: 'Cancel the unit',
              formula: 'n_2 = n_1 \\times 10^h',
              explanation: 'The $u_1$ divides out: the count is multiplied by $10^h$ and by nothing else.',
            },
            {
              label: 'Read it as a point-shift',
              formula: 'n_2 = n_1 \\times 10^h \\;\\Longleftrightarrow\\; \\text{the decimal point moves } h \\text{ places}',
              explanation: 'Multiplying by $10^h$ shifts the point $h$ places right — chapter 5\u2019s point machinery, now carrying units.',
            },
          ],
          result: 'If the unit shrinks $h$ rungs, the count is $n_1 \\times 10^h$: the digits stand still and the decimal point walks $h$ places.',
        },
        {
          kind: 'equation',
          latex: 'u_2 = \\frac{u_1}{10^h} \\;\\Longrightarrow\\; n_2 = n_1 \\times 10^h',
          note: '**The point-shift law (tag 1).** Down the ladder (smaller unit): the point moves right, the count grows. Up the ladder (bigger unit): the point moves left, the count shrinks. Either way, **the digits never change** — check it once by expansion: $3.45 \\times 1000 = 3 \\times 1000 + 4 \\times 100 + 5 \\times 10 = 3000 + 400 + 50 = 3450$.',
        },
        {
          kind: 'example',
          title: 'Express 3.45 km in metres, centimetres and millimetres.',
          steps: [
            'Now, km to m is three rungs down the ladder (kilo → hecto → deca → unit), so the point moves three places: $3.45 \\times 1000 = 3450$.',
            'So $3.45\\text{ km} = 3450\\text{ m}$.',
            'And m to cm is two more rungs, so two more places: $3450 \\times 100 = 345{,}000$; five rungs in all give $3.45 \\times 10^5 = 345{,}000\\text{ cm}$.',
            'And one further rung reaches the millimetre: $345{,}000 \\times 10 = 3{,}450{,}000\\text{ mm}$ — six rungs, $\\times 10^6$.',
            'Hence $3.45\\text{ km} = 3450\\text{ m} = 345{,}000\\text{ cm} = 3{,}450{,}000\\text{ mm}$ — three dresses, one length, the digits 3-4-5 visible in every one.',
          ],
        },
        {
          kind: 'para',
          text: 'The climb upward works by the same law read backwards, and decimals shift exactly like whole numbers — the point does not care where it starts. $4750\\text{ mm} = 4.75\\text{ m}$ (three rungs up, the point walks three places left); $47.5\\text{ cm} = 0.475\\text{ m}$ (two rungs); $0.85\\text{ km} = 850\\text{ m}$ (three down); $0.06\\text{ m} = 6\\text{ cm}$ (two down); $0.475\\text{ L} = 475\\text{ mL}$ (three down). No tables, no multiplications worth the name — the ladder fixes the **count** of rungs, and the count of rungs fixes the **shift** of the point.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The direction test',
          text: 'The commonest metric error is walking the point the **wrong way**. The inverse law of 9.1 hands you a check that never fails: **a smaller unit must give a bigger count, and a bigger unit a smaller count.** "Convert 4750 mm to metres" must end in a number **smaller** than 4750 (fewer big chunks fit): 4.75 ✓. If your answer came out 47,500, you walked down when you meant up — re-read the direction before touching the point.',
        },
        { kind: 'heading', text: 'The three families: metre, gram, litre' },
        {
          kind: 'para',
          text: 'The ladder being one object, the school families differ only in the name sitting at the base. Length bases the **metre** (the SI\u2019s length unit, with the biography the last section tells); capacity bases the **litre**; and mass — with one famous wrinkle — bases the **gram**, whose ladder reads kg, hg, dag, g, dg, cg, mg exactly in step with the others.',
        },
        {
          kind: 'table',
          caption: 'The three school families: one ladder, three base names. The everyday stations walk most of the traffic; the full seven-rung ladder stands behind them.',
          head: ['Family', 'Base unit', 'Everyday stations', 'The one-hop facts'],
          rows: [
            ['length', 'metre (m)', 'km · m · cm · mm', '$1\\text{ km} = 1000\\text{ m}$; $1\\text{ m} = 100\\text{ cm} = 1000\\text{ mm}$; $1\\text{ cm} = 10\\text{ mm}$'],
            ['mass', 'gram (g) — but see the Note', 'kg · g · mg', '$1\\text{ kg} = 1000\\text{ g}$; $1\\text{ g} = 1000\\text{ mg}$'],
            ['capacity', 'litre (L)', 'L · mL', '$1\\text{ L} = 1000\\text{ mL}$'],
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The kilogram — the base unit that wears a prefix',
          text: 'Here is the wrinkle that examiners love and histories rarely explain. By rights the mass ladder\u2019s base unit should be "the gram", and grammatically it is. But **the SI\u2019s base unit of mass is the kilogram** — the one base unit in the whole system that carries a prefix in its own name. The reason is history\u2019s inertia: the 1799 artefact (a litre of water\u2019s mass, cast in platinum) was already called a *kilogram*, and 1889\u2019s international prototype inherited the name. So "gram" behaves as the ladder\u2019s root (milli-gram, centi-gram…), while the named base unit stays a kilo-gram — the prefix is baked in, not chosen afresh.',
        },
        {
          kind: 'para',
          text: 'Above the mass ladder sits one honoured guest: the **tonne** ($1\\text{ t} = 1000\\text{ kg} = 10^6\\text{ g}$), the unit of truck loads and grain harvests. It is not a prefixed name but an accepted companion of the SI (in pure prefix dress it would be a *megagram*), and it slots onto the rail without disturbing the arithmetic: $2.4\\text{ t} = 2400\\text{ kg}$, three rungs in one hop because the tonne **is** the kilo-kilogram. Meanwhile the figure below makes the deeper point — that the ladder is *literally* the same object on all three rails.',
        },
        {
          kind: 'figure',
          caption:
            'One quantity, three rails. The same number 4.2 sits at the base of each rail — 4.2 m, 4.2 g, 4.2 L — and the same one-rung hops move it: ÷ 1000 to the kilo-station (0.0042 km, 0.0042 kg, 0.0042 kL), × 1000 to the milli-station (4200 mm, 4200 mg, 4200 mL). The ladder never changes; only the base unit\u2019s name does. This is what "a system" buys: learn one hop, own every quantity.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three rails for length, mass and capacity, each with kilo, base and milli stations, the same 4.2 at every base, divided by 1000 to the kilo station and multiplied by 1000 to the milli station">
  <text x="380" y="24" font-size="13" fill="currentColor" text-anchor="middle">one quantity, three rails — the hop is the same ×1000 on every family</text>
  <g stroke="currentColor" stroke-width="1.2">
    <line x1="120" y1="100" x2="640" y2="100"/>
    <line x1="120" y1="212" x2="640" y2="212"/>
    <line x1="120" y1="324" x2="640" y2="324"/>
  </g>
  <g font-size="12" fill="currentColor">
    <text x="40" y="104">length</text>
    <text x="40" y="216">mass</text>
    <text x="40" y="328">capacity</text>
  </g>
  <g fill="currentColor">
    <circle cx="160" cy="100" r="2.5"/><circle cx="380" cy="100" r="2.5"/><circle cx="600" cy="100" r="2.5"/>
    <circle cx="160" cy="212" r="2.5"/><circle cx="380" cy="212" r="2.5"/><circle cx="600" cy="212" r="2.5"/>
    <circle cx="160" cy="324" r="2.5"/><circle cx="380" cy="324" r="2.5"/><circle cx="600" cy="324" r="2.5"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="160" y="84">km</text><text x="380" y="84">m</text><text x="600" y="84">mm</text>
    <text x="160" y="196">kg</text><text x="380" y="196">g</text><text x="600" y="196">mg</text>
    <text x="160" y="308">kL</text><text x="380" y="308">L</text><text x="600" y="308">mL</text>
  </g>
  <g font-size="12" fill="currentColor" text-anchor="middle">
    <text x="270" y="84">÷ 1000</text><text x="490" y="84">× 1000</text>
    <text x="270" y="196">÷ 1000</text><text x="490" y="196">× 1000</text>
    <text x="270" y="308">÷ 1000</text><text x="490" y="308">× 1000</text>
  </g>
  <g fill="currentColor">
    <path d="M 262 100 l 8 -4 l 0 8 z"/>
    <path d="M 498 100 l -8 -4 l 0 8 z"/>
    <path d="M 262 212 l 8 -4 l 0 8 z"/>
    <path d="M 498 212 l -8 -4 l 0 8 z"/>
    <path d="M 262 324 l 8 -4 l 0 8 z"/>
    <path d="M 498 324 l -8 -4 l 0 8 z"/>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="160" y="124">0.0042 km</text><text x="380" y="124">4.2 m</text><text x="600" y="124">4200 mm</text>
    <text x="160" y="236">0.0042 kg</text><text x="380" y="236">4.2 g</text><text x="600" y="236">4200 mg</text>
    <text x="160" y="348">0.0042 kL</text><text x="380" y="348">4.2 L</text><text x="600" y="348">4200 mL</text>
  </g>
  <text x="380" y="392" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">the hop is the hop is the hop — ×1000 whatever the quantity rides on</text>
</svg>`,
        },
        { kind: 'heading', text: 'The litre and the cube' },
        {
          kind: 'para',
          text: 'Capacity has one bridge the other families lack, and it is the reason the litre feels at home among the geometric units of chapter 8. The litre is *defined* as a cubic decimetre — the cube built on the ladder\u2019s own tenth-rung — and the cube\u2019s arithmetic then fixes everything around it:',
        },
        {
          kind: 'equation',
          latex: '1\\text{ L} = 1\\text{ dm}^3 = (10\\text{ cm})^3 = 1000\\text{ cm}^3, \\qquad 1\\text{ mL} = 1\\text{ cm}^3, \\qquad 1\\text{ m}^3 = (10\\text{ dm})^3 = 1000\\text{ dm}^3 = 1000\\text{ L}',
          note: '**The litre bridge (tag 2).** The millilitre and the cubic centimetre are the same size under two names — a medicine dose of 5 mL *is* 5 cm³ of space. And the big cube climbs a whole ladder in one step: a tank measuring $2\\text{ m} \\times 1.5\\text{ m} \\times 1\\text{ m}$ holds $3\\text{ m}^3 = 3 \\times 1000 = 3000$ litres. (History\u2019s honest footnote: from 1901 to 1964 the litre was pinned to the kilogram of water instead and drifted a whisker — $1.000028\\text{ dm}^3$ — before the 1964 definition restored it to exactly the cubic decimetre.)',
        },
        {
          kind: 'example',
          title: 'A water tank measures 2 m × 1.5 m × 1 m. How many litres does it hold?',
          steps: [
            'Now, the tank\u2019s volume: $2 \\times 1.5 \\times 1 = 3\\text{ m}^3$.',
            'So convert by the bridge: $1\\text{ m}^3 = 1000\\text{ L}$, giving $3 \\times 1000 = 3000\\text{ L}$.',
            'And the ladder agrees: $3000\\text{ L}$ is three rungs up from the litre\u2019s own dress — $3\\text{ kL}$.',
            'Hence the tank holds **3000 L** — the cube and the ladder handing the answer to each other.',
          ],
        },
        { kind: 'heading', text: 'The metre\u2019s three bodies: Earth, bar, light' },
        {
          kind: 'para',
          text: 'The ladder is the system\u2019s arithmetic; the metre is its soul, and its biography is the best honesty lesson in metrology. **1791**: the Academy of Sciences — a commission carrying Borda, Lagrange, Laplace, Monge and Condorcet — defined the metre as **one ten-millionth of the Earth\u2019s quadrant**: the distance from the North Pole to the Equator along the meridian through Paris. By definition, then, the quadrant *was* 10,000 km and the whole meridian circle 40,000 km — the Earth was conscripted as the standard, and the unit belonged to no nation\u2019s body or market. The pendulum had failed because gravity varies; the planet does not.',
        },
        {
          kind: 'para',
          text: 'Measuring the planet, though, meant measuring it. Two astronomers drew the job: **Delambre** took the northern arc from Dunkirk, **Méchain** the southern, down to Barcelona\u2019s Montjuïc castle — about a thousand kilometres of meridian, surveyed triangle by triangle through the chaos of the Revolution and its wars (the two were arrested more than once as spies; a ~10 km baseline was laid out with rulers along the road from Melun to Lieusaint). The fieldwork of **1792–1798** — six years — ended with both men reunited in Paris in November 1798, logbooks intact; the definitive metre was computed in **1799** at **443.296 lignes** (about 443.3 lignes of the old Paris inch-line measure), and a platinum bar — the *mètre des Archives* — was presented on 22 June 1799. The seven-year odyssey (1792 to 1799) is the treaty-side of 9.1\u2019s story: an agreement is only as strong as the labour that backs it.',
        },
        {
          kind: 'para',
          text: 'And here is the honesty the story owes you: **the bar is wrong** — slightly. The Earth is not a perfect sphere, and the quadrant\u2019s true length came out about **0.02% longer** than the definition assumed. Over the full 10,000 km that is about **2 km** — one part in **5,000** — and on the bar itself it is the famous **0.2 mm**: the metre falls just that much short of what "one ten-millionth of the quadrant" demanded. The reformers\u2019 response is the whole lesson in miniature: they did not remake the bar; **the bar became the metre**. A definition that cannot be perfectly realised is completed by the standard everyone can actually compare against — the artefact, then the wavelength of krypton-86 light (1960), then, since **1983**, the distance light travels in exactly $1/299{,}792{,}458$ of a second. The metre has had three bodies — Earth, metal, light — and one name.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: '1795: the law that named the ladder',
          text: 'The metric system reached law before the survey reached Barcelona. On **7 April 1795** France\u2019s National Convention made the metre, the gram and the litre the legal units — and fixed the prefix names: Greek for the big steps (**deca, hecto, kilo**), Latin for the small (**deci, centi, milli**). The same revolutionary zeal even decimalised **time** — a 10-hour day of 100-minute hours (a decimal day of $10 \\times 100 \\times 100 = 100{,}000\\text{ s}$ against our kept $24 \\times 3600 = 86{,}400$) — and abandoned it within about two years; the prefixes, meanwhile, have run 231 years and counting. The world followed slowly: the treaty of 1875 (9.1) internationalised the system; India standardised on it in 1956–1960; the United States made it **legal in 1866** (160 years ago) and its "preferred system" — voluntarily — in 1975.',
        },
        {
          kind: 'para',
          text: 'From the above discussion, it follows that the metric system is three things at once, and the harvest is worth naming in full:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'a **family**: one base unit per quantity, every sibling exactly a power of ten away — no orphan ratios, no memorised tables;',
            'a **law**: the point-shift, $u_2 = u_1/10^h \\Rightarrow n_2 = n_1 \\times 10^h$ — the swap law of 9.1 in its easiest dress, the digits standing still while the point walks;',
            'a **biography**: the metre from the Earth (1791) through the bar (1799, 0.2 mm honest) to the light (1983) — the treaty of 9.1 made physical, then made atomic.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Metric conversion questions are guaranteed marks if the ladder is in hand: direct one-hop conversions ($2.5\\text{ km} = 2500\\text{ m}$; $340\\text{ cm} = 3.4\\text{ m}$; $4.2\\text{ kg} = 4200\\text{ g}$); ladder fills ($750\\text{ mL} = 0.75\\text{ L}$); the kilogram trap (the SI base unit of mass is the **kilogram**, not the gram); comparison items ($0.8\\text{ km}$ vs $750\\text{ m}$ — convert one to the other\u2019s dress first: $800 > 750$); and capacity-volume hybrids ($1\\text{ L} = 1000\\text{ cm}^3$ turns box and tank problems into ladder walks). The direction test — smaller unit, bigger count — catches every point-walked-the-wrong-way answer. Shapes cited from SSC/RRB/banking patterns; none reproduced.',
        },
        {
          kind: 'formula',
          name: 'The point-shift law',
          latex: 'u_2 = u_1/10^h \\;\\Longrightarrow\\; n_2 = n_1 \\times 10^h',
          note: 'h rungs down the ladder move the decimal point h places right (and up-ladder, h places left). The digits never change.',
        },
        {
          kind: 'formula',
          name: 'The litre bridge',
          latex: '1\\text{ L} = 1\\text{ dm}^3 = 1000\\text{ cm}^3, \\quad 1\\text{ mL} = 1\\text{ cm}^3, \\quad 1\\text{ m}^3 = 1000\\text{ L}',
          note: 'Capacity meets geometry: the millilitre is a cubic centimetre under another name.',
        },
        {
          kind: 'formula',
          name: 'The tonne',
          latex: '1\\text{ t} = 1000\\text{ kg} = 10^6\\text{ g}',
          note: 'The mass rail\u2019s honoured guest above the kilogram.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Metric system',
              def: 'A system of measurement in which all units of one quantity form a single decimal family — every neighbouring pair related by a power of ten. Designed 1790s France, law of 7 April 1795, the basis of the SI.',
            },
            {
              term: 'Prefix',
              def: 'A name glued before a base unit to scale it by a fixed power of ten: kilo- (×1000), hecto- (×100), deca- (×10), deci- (×0.1), centi- (×0.01), milli- (×0.001). Greek roots for the big steps, Latin for the small.',
            },
            {
              term: 'Point-shift law',
              def: 'In the metric family, $u_2 = u_1/10^h \\Rightarrow n_2 = n_1 \\times 10^h$: converting moves the decimal point $h$ places and changes nothing else. The swap law of 9.1 in its easiest dress.',
            },
            {
              term: 'Kilogram',
              def: 'The SI\u2019s base unit of mass — the one base unit wearing a prefix. The gram is the ladder\u2019s root (mg, cg, dg…); the kilogram is the named unit, inheritance of the 1799 artefact.',
            },
            {
              term: 'Tonne',
              def: '$1000\\text{ kg} = 10^6\\text{ g}$ — the accepted mass unit above the kilogram, the truck-load and harvest scale.',
            },
            {
              term: 'Litre',
              def: 'The cubic decimetre under its everyday name: $1\\text{ L} = 1000\\text{ cm}^3$, so $1\\text{ mL} = 1\\text{ cm}^3$ and $1\\text{ m}^3 = 1000\\text{ L}$. Pinned to the kilogram of water 1901–1964, restored to the dm³ in 1964.',
            },
            {
              term: 'Mètre des Archives',
              def: 'The platinum bar of 22 June 1799 — the metre\u2019s first body, computed at 443.296 lignes from the 1792–1798 Delambre–Méchain survey, and about 0.2 mm short of the Earth-quadrant intent (one part in 5,000).',
            },
            {
              term: 'Light-speed metre',
              def: 'The metre\u2019s third body, 1983: the distance light travels in vacuum in $1/299{,}792{,}458$ of a second — fixing $c$ to exactly $299{,}792{,}458\\text{ m/s}$.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The design rule that makes the metric system a system is that',
              options: [
                'every step between neighbouring units is a power of ten',
                'every unit is defined from the human body',
                'each quantity keeps its own ragged ratios (12, 3, 16, 1760)',
                'the units differ from town to town',
              ],
              answer: 0,
              explain:
                'The definition: one decimal family per quantity — the ladder (Option 1). Option 2 is the body-unit era the system replaced. Option 3 is exactly the old-world mess (12 inches, 3 feet, 16 ounces). Option 4 is the 250,000-local-values problem the law of 1795 abolished.',
            },
            {
              q: '3.45 km expressed in centimetres is',
              options: ['$3450\\text{ cm}$', '$34{,}500\\text{ cm}$', '$345{,}000\\text{ cm}$', '$3{,}450{,}000\\text{ cm}$'],
              answer: 2,
              explain:
                'km → cm is five rungs, so $3.45 \\times 10^5 = 345{,}000$ (Option 3). Option 1 is three rungs (the metre dress). Option 2 is four rungs — one hop short. Option 4 is six rungs (the millimetre dress). Direction check: the smaller unit must give the bigger count. ✓',
            },
            {
              q: 'The SI base unit of mass is',
              options: ['the gram', 'the kilogram', 'the milligram', 'the tonne'],
              answer: 1,
              explain:
                'The kilogram — the one SI base unit that wears a prefix, inheritance of the 1799 artefact (Option 2). Option 1 is the ladder\u2019s grammatical root but not the named base unit. Option 3 is a thousandth of the root. Option 4 is an accepted companion ($1000$ kg), not a base unit.',
            },
            {
              q: '1 litre is the same volume as',
              options: ['$10\\text{ cm}^3$', '$100\\text{ cm}^3$', '$1000\\text{ cm}^3$', '$10^6\\text{ cm}^3$'],
              answer: 2,
              explain:
                'The litre bridge: $1\\text{ L} = 1\\text{ dm}^3 = (10\\text{ cm})^3 = 1000\\text{ cm}^3$ (Option 3). Option 1 and 2 stop the cube too early ($10 \\times 10 \\times 10$ has three factors). Option 4 is $1\\text{ m}^3$ in cubic centimetres.',
            },
            {
              q: '4200 mg expressed in grams is',
              options: ['$42{,}000\\text{ g}$', '$420\\text{ g}$', '$42\\text{ g}$', '$4.2\\text{ g}$'],
              answer: 3,
              explain:
                'mg → g is three rungs up, so the point moves three places left: $4200 \\div 1000 = 4.2$ (Option 4). Options 1–3 all walk the point the wrong way or part of it. Direction test: grams are bigger than milligrams, so the count must SHRINK. ✓',
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
                  q: 'Convert, naming the number of rungs in each: (i) 5 m to cm; (ii) 3 kg to g; (iii) 2 L to mL.',
                  solution: [
                    'Now, read each pair on its own rail of the one ladder.',
                    'So (i) m → cm is two rungs: $5 \\times 100 = 500$; (ii) kg → g is three rungs: $3 \\times 1000 = 3000$; (iii) L → mL is three rungs: $2 \\times 1000 = 2000$.',
                    'And the direction test passes every time: smaller unit, bigger count.',
                    'Hence 500 cm, 3000 g, 2000 mL — three rails, one law.',
                  ],
                  answer: '(i) 500 cm (2 rungs); (ii) 3000 g (3 rungs); (iii) 2000 mL (3 rungs)',
                },
                {
                  q: 'Which is longer: 750 m, or 0.8 km? By how much?',
                  solution: [
                    'Now, put both on one rail first: $0.8\\text{ km} = 0.8 \\times 1000 = 800\\text{ m}$.',
                    'So the comparison is $800\\text{ m}$ against $750\\text{ m}$ — the kilometre dress wins.',
                    'And the gap: $800 - 750 = 50\\text{ m}$.',
                    'Hence 0.8 km is longer, by 50 m — never compare across rails; convert, then compare.',
                  ],
                  answer: '0.8 km (= 800 m) is longer, by 50 m',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A bus ride is 4.2 km. Express it in metres and in centimetres, counting the rungs.',
                  solution: [
                    'Now, km → m is three rungs: $4.2 \\times 1000 = 4200\\text{ m}$.',
                    'And m → cm is two more: $4200 \\times 100 = 420{,}000\\text{ cm}$ — five rungs in all, $4.2 \\times 10^5$.',
                    'Hence 4.2 km = 4200 m = 420,000 cm; the digits 4-2 ride unchanged in every dress.',
                  ],
                  answer: '4200 m; 420,000 cm (five rungs, ×10⁵)',
                },
                {
                  q: 'A bottle holds 1.25 L of juice. How many 250 mL glasses does it fill?',
                  solution: [
                    'Now, put bottle and glass on one rail: $1.25\\text{ L} = 1.25 \\times 1000 = 1250\\text{ mL}$.',
                    'So the fill count is $1250 \\div 250 = 5$.',
                    'Hence 5 glasses — the swap law counting how many of the small chunk fits the big one.',
                  ],
                  answer: '5 glasses',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Express each in the other dress: (i) 750 g in kilograms; (ii) 6 kg in grams.',
                  solution: [
                    'Now, (i) g → kg is three rungs up: $750 \\div 1000 = 0.75\\text{ kg}$.',
                    'And (ii) kg → g is three rungs down: $6 \\times 1000 = 6000\\text{ g}$.',
                    'And the direction test reads both: up-ladder shrinks the count (750 → 0.75), down-ladder grows it (6 → 6000).',
                    'Hence 0.75 kg and 6000 g — the same rail walked both ways.',
                  ],
                  answer: '(i) 0.75 kg; (ii) 6000 g',
                },
                {
                  q: 'A delivery truck is rated at 2.4 t. It already carries a 900 kg load. How many more kilograms can it take?',
                  solution: [
                    'Now, one rail first: $2.4\\text{ t} = 2.4 \\times 1000 = 2400\\text{ kg}$.',
                    'So the free room is $2400 - 900 = 1500\\text{ kg}$.',
                    'Hence 1500 kg more — the tonne folding onto the kilogram rail before any subtraction.',
                  ],
                  answer: '1500 kg',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A courier box measures 40 cm × 30 cm × 20 cm. Find its volume in cm³ and in litres.',
                  solution: [
                    'Now, the box\u2019s volume: $40 \\times 30 \\times 20 = 24{,}000\\text{ cm}^3$.',
                    'So cross the litre bridge: $1\\text{ L} = 1000\\text{ cm}^3$, giving $24{,}000 \\div 1000 = 24\\text{ L}$.',
                    'Hence 24,000 cm³ = 24 L — the cm³ and the mL being the same cube under two names.',
                  ],
                  answer: '24,000 cm³ = 24 L',
                  figures: [
                    {
                      caption:
                        'The courier box to scale: a $40 \\times 30$ cm face with $20$ cm of depth — the three lengths multiply into $24{,}000$ cm$^3$, and the litre bridge ($1$ L $= 1000$ cm$^3$) crosses it to $24$ L.',
                      svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An isometric box of 40 by 30 by 20 centimetres with labelled dimensions, volume 24000 cubic centimetres equal to 24 litres">
  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the courier box — a 40 × 30 × 20 cm brick of volume</text>
  <polygon points="300,120 460,120 460,240 300,240" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="300,120 460,120 540,40 380,40" fill="currentColor" opacity="0.10" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="460,120 540,40 540,160 460,240" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="1.5"/>
  <line x1="380" y1="40" x2="540" y2="40" stroke="currentColor" stroke-width="1.5"/>
  <line x1="540" y1="40" x2="540" y2="160" stroke="currentColor" stroke-width="1.5"/>
  <line x1="460" y1="240" x2="540" y2="160" stroke="currentColor" stroke-width="1.5"/>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="380" y="262">40 cm</text>
    <text x="288" y="185" text-anchor="end">30 cm</text>
    <text x="380" y="185">24,000 cm³ = 24 L</text>
  </g>
  <text x="548" y="36" font-size="12.5" fill="currentColor" text-anchor="start">20 cm</text>
  <text x="380" y="302" font-size="12.5" fill="currentColor" text-anchor="middle">40 × 30 × 20 = 24,000 cm³ — and 1 L = 1000 cm³, so 24,000 ÷ 1000 = 24 L</text>
</svg>`,
                    },
                  ],
                },
                {
                  q: 'Express (i) 0.85 km in metres; (ii) 475 cm in metres; (iii) 475 cm in millimetres.',
                  solution: [
                    'Now, (i) km → m, three rungs down: $0.85 \\times 1000 = 850\\text{ m}$.',
                    'And (ii) cm → m, two rungs up: $475 \\div 100 = 4.75\\text{ m}$.',
                    'And (iii) cm → mm, one rung down: $475 \\times 10 = 4750\\text{ mm}$.',
                    'Hence 850 m; 4.75 m; 4750 mm — the point walking two, three and one places, the digits 4-7-5 fixed throughout.',
                  ],
                  answer: '(i) 850 m; (ii) 4.75 m; (iii) 4750 mm',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Pre-metric France: a pinte in Paris held about 0.93 L; the same-named pinte in Saint-Denis held about 1.46 L. How many more millilitres did Saint-Denis\u2019s pinte hold?',
                  solution: [
                    'Now, the gap in litres: $1.46 - 0.93 = 0.53\\text{ L}$.',
                    'So onto the millilitre rail, three rungs down: $0.53 \\times 1000 = 530\\text{ mL}$.',
                    'And the sense of it: the same name carrying about 57% more — the measuring-as-charging world the metric law abolished.',
                    'Hence 530 mL more per pinte — one town\u2019s honest litre vs another\u2019s, in one subtraction.',
                  ],
                  answer: '530 mL more',
                },
                {
                  q: 'The 1799 metre bar misses its Earth-quadrant intent by about 0.02%. Over the definition\u2019s 10,000,000 m quadrant, how many metres is that? And how many millimetres on the bar itself?',
                  solution: [
                    'Now, the miss over the whole quadrant: $0.02\\%$ of $10{,}000{,}000\\text{ m} = 0.0002 \\times 10^7 = 2000\\text{ m}$.',
                    'So the true quadrant runs about 2 km longer than the definition assumed — one part in $10{,}000 \\div 2 = 5000$.',
                    'And on the bar: the same fraction of one metre is $0.0002 \\times 1000 = 0.2\\text{ mm}$ — the bar\u2019s famous shortfall.',
                    'Hence about 2 km over ten thousand, about 0.2 mm per metre — and the reformers\u2019 answer: the bar became the metre.',
                  ],
                  answer: '≈ 2,000 m (2 km) over the quadrant; ≈ 0.2 mm on the bar — one part in 5,000',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the point-shift law from place value: show by expansion that $3.45 \\times 1000 = 3450$, and explain why the digits never move.',
                  solution: [
                    'Now, write the decimal in place-value dress: $3.45 = 3 + 4/10 + 5/100$.',
                    'So multiply by 1000 term by term: $3 \\times 1000 + (4/10) \\times 1000 + (5/100) \\times 1000 = 3000 + 400 + 50 = 3450$.',
                    'And each digit\u2019s place simply climbed three rungs — ones to thousands, tenths to hundreds, hundredths to tens: the digits keep their values\u2019 order; only their place names change.',
                    'Hence $3.45 \\times 1000 = 3450$ with the digits 3-4-5 intact — which is exactly the point-shift law $n_2 = n_1 \\times 10^h$ read digit by digit: multiplying by a power of ten is a walk of the point, not a change of the number\u2019s digits.',
                  ],
                  answer: '3.45 × 1000 = 3·1000 + 4·100 + 5·10 = 3450 — each digit rises three place-rungs; the digits never change',
                },
                {
                  q: 'The abandoned decimal day had 10 hours of 100 minutes of 100 seconds. How long were its day and its second, against ours ($24 \\times 3600 = 86{,}400$ s)?',
                  solution: [
                    'Now, the decimal day\u2019s length: $10 \\times 100 \\times 100 = 100{,}000\\text{ s}$ (decimal seconds).',
                    'So the same real day in standard seconds is $24 \\times 3600 = 86{,}400\\text{ s}$ — the two "days" name the same sunrise-to-sunrise span.',
                    'And the decimal second in ours: $86{,}400 \\div 100{,}000 = 0.864\\text{ s}$ — each decimal second a little shorter than ours.',
                    'Hence a 100,000-second day whose second ran 0.864 of ours — the one decimal idea France retracted, while the metre\u2019s ladder ran on.',
                  ],
                  answer: 'Decimal day = 100,000 s (vs 86,400 s); the decimal second = 0.864 of ours',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-converting-units-without-memorising-tables',
      number: '9.3',
      title: 'Converting Units Without Memorising Tables',
      concepts: [
        'The conversion factor — 1 in disguise',
        'Multiplying by one changes the dress, never the quantity',
        'Cancellation — units behave like factors',
        'The chain method — several hops in one line',
        'Composite units: the speed pipeline',
        'The squared-factor law (areas and volumes)',
        'The direction test',
        'The identity economy — six facts, every conversion',
      ],
      objectives: [
        'Build a conversion factor from any identity — a ratio of two equal measures, equal to 1 — and choose the dressing whose units cancel into the unit you want',
        'Justify the method from 9.1\u2019s $Q = n \\times u$: multiplying by 1 preserves the quantity, and units cancel like factors',
        'Run multi-hop chains in one line (km → m → cm; hours → minutes → seconds) and convert composite units such as km/h to m/s, re-deriving the 5/18 law of 6.2 instead of recalling it',
        'Apply the squared-factor law honestly: $1\\text{ m}^2 = 10^4\\text{ cm}^2$ and $1\\text{ m}^3 = 10^6\\text{ cm}^3$ — the factor inherits the unit\u2019s power — and refuse the classic ×100 area fraud',
        'Run the direction test on every answer (smaller unit, bigger count) and diagnose upside-down factors from the shape of the units alone',
      ],
      prerequisites: ['fm-the-metric-system', 'fm-units-as-agreements', 'fm-multiplying-dividing-fractions'],
      sources: ['ncert-sci6-curiosity-ch5', 'ncert-phys11-ch2', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 9.2 handed you the ladder — one decimal family per quantity, every rung a power of ten. This lesson adds the engine that makes the title\u2019s promise true: with **one idea** and **six facts you already own**, you can convert anything to anything in the school metric world without ever consulting a conversion table again. The one idea is the most quietly powerful trick in all of applied arithmetic: **multiplying by 1**. It sounds like doing nothing — and that is exactly its power. Done plainly, multiplying by 1 changes nothing. Done *in disguise*, it changes everything worth changing: the **dress** of a quantity, while the quantity itself stands still.',
        },
        {
          kind: 'para',
          text: 'The six facts are the identities the ladder already taught: $1\\text{ km} = 1000\\text{ m}$, $1\\text{ m} = 100\\text{ cm}$, $1\\text{ m} = 1000\\text{ mm}$, $1\\text{ kg} = 1000\\text{ g}$, $1\\text{ L} = 1000\\text{ mL}$, and $1\\text{ h} = 3600\\text{ s}$. Notice what these are not: they are not "conversion rules" with directions to memorise (multiply here, divide there). Each one is a plain **equality between two names of the same span** — and any equality can be worn as a fraction. That wearing is the whole method.',
        },
        { kind: 'heading', text: 'The conversion factor: 1 in disguise' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Conversion factor',
          text: 'A **conversion factor** is said to be a **fraction whose numerator and denominator are two equal measures written in different units** — $\\dfrac{1000\\text{ m}}{1\\text{ km}}$, $\\dfrac{1\\text{ km}}{1000\\text{ m}}$, $\\dfrac{3600\\text{ s}}{1\\text{ h}}$. Since numerator and denominator name the *same span*, the fraction\u2019s value is exactly **1** — and multiplying any quantity by it changes the units\u2019 dress while the quantity stands still.',
        },
        {
          kind: 'derivation',
          title: 'Why the method is legal: multiplying by 1, cancelling units',
          statement:
            'A quantity $Q$ is dressed as $4.2\\text{ km}$. Show that multiplying by $\\dfrac{1000\\text{ m}}{1\\text{ km}}$ neither adds nor removes anything — and that the units may be cancelled like factors.',
          steps: [
            {
              label: 'The factor is 1',
              formula: '\\frac{1000\\text{ m}}{1\\text{ km}} = 1',
              explanation: 'Numerator and denominator are the same span in two dresses — $1000$ metres *is* 1 kilometre — so the fraction is 1 wearing a costume.',
            },
            {
              label: 'Multiplying by 1 preserves the quantity',
              formula: '4.2\\text{ km} \\times 1 = 4.2\\text{ km}',
              explanation: 'Whatever else happens to the dress, the quantity cannot change: multiplication by one is the identity.',
            },
            {
              label: 'Read the product with the units riding',
              formula: '4.2\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} = 4.2 \\times 1000 \\times \\frac{\\text{km}\\cdot\\text{m}}{\\text{km}}',
              explanation: 'By 9.1\u2019s $Q = n \\times u$, a dressed quantity is a number of chunks — so it multiplies like any product: numbers with numbers, units with units.',
            },
            {
              label: 'Cancel the unit that appears above and below',
              formula: '= 4.2 \\times 1000 \\times \\text{m} = 4200\\text{ m}',
              explanation: 'The km on top and the km below are the same unit — their ratio is 1, and they cancel like the common factors of chapter 3.',
            },
          ],
          result: 'The dressing changed (km → m) and nothing else did: $4.2\\text{ km} = 4200\\text{ m}$, derived rather than recalled.',
        },
        {
          kind: 'equation',
          latex: 'Q \\times \\frac{a\\,\\text{u}_1}{b\\,\\text{u}_2} = Q \\quad \\text{whenever} \\quad a\\,\\text{u}_1 = b\\,\\text{u}_2',
          note: '**The factor licence (tag 1).** Any identity may be worn as a fraction — in either direction — because both dressings equal 1. The method\u2019s only skill is **choosing the dressing whose given-unit cancels**, which the shape of the units decides for you.',
        },
        {
          kind: 'para',
          text: 'That last clause deserves its own breath, because it is where every table-memoriser goes wrong. You do not need to *remember* whether km→m multiplies or divides. You need only write the factor so that **the unit you have sits where it can cancel** — the bottom when you have kilometres, the top when you have metres. The units do the bookkeeping; the arithmetic follows. "Without memorising tables" is not a slogan about effort. It is a claim about *where the information lives*: in the identity, read in the direction the cancellation demands.',
        },
        {
          kind: 'figure',
          caption:
            'The cancellation machine, both dressings. Panel A: the right dressing — 4.2 km multiplied by (1000 m over 1 km); the two km cards strike out like common factors, and 4200 m survives. Panel B: the wrong dressing — (1 km over 1000 m) leaves km·km over m: no cancellation is possible, the number collapses to 0.0042, and the garbage units announce the error before any harm is done. The units are the built-in proofreader.',
          svg: `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels: the right dressing strikes only the km tokens and 4200 m survives; the wrong dressing leaves uncancelable units and 0.0042">
  <text x="380" y="24" font-size="13" fill="currentColor" text-anchor="middle">the cancellation machine — only the UNIT cancels; the number survives</text>
  <text x="380" y="52" font-size="12" font-style="italic" fill="currentColor" text-anchor="middle">panel A — the right dressing: the km tokens strike out, 4.2 and ×1000 remain</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="60" y="80" width="70" height="40" rx="4"/>
    <rect x="134" y="80" width="46" height="40" rx="4"/>
    <rect x="230" y="60" width="120" height="32" rx="4"/>
    <line x1="230" y1="96" x2="350" y2="96"/>
    <rect x="230" y="100" width="40" height="32" rx="4"/>
    <rect x="274" y="100" width="76" height="32" rx="4"/>
    <rect x="440" y="76" width="140" height="40" rx="4"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="95" y="105">4.2</text>
    <text x="157" y="105">km</text>
    <text x="290" y="81">1000 m</text>
    <text x="250" y="121">1</text>
    <text x="312" y="121">km</text>
    <text x="510" y="101">4200 m</text>
    <text x="206" y="105">×</text>
  </g>
  <g stroke="currentColor" stroke-width="1.3">
    <line x1="138" y1="84" x2="176" y2="116"/>
    <line x1="278" y1="104" x2="346" y2="128"/>
  </g>
  <line x1="360" y1="96" x2="424" y2="96" stroke="currentColor" stroke-width="1.1"/>
  <path d="M 438 96 l -14 -6 l 0 12 z" fill="currentColor"/>
  <text x="608" y="101" font-size="12.5" fill="currentColor">— the survivor is the answer</text>
  <text x="380" y="172" font-size="12" font-style="italic" fill="currentColor" text-anchor="middle">panel B — the wrong dressing: nothing cancels</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="60" y="240" width="120" height="40" rx="4"/>
    <rect x="230" y="220" width="120" height="32" rx="4"/>
    <line x1="230" y1="256" x2="350" y2="256"/>
    <rect x="230" y="260" width="120" height="32" rx="4"/>
    <rect x="440" y="236" width="200" height="40" rx="4"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="120" y="265">4.2 km</text>
    <text x="290" y="241">1 km</text>
    <text x="290" y="281">1000 m</text>
    <text x="540" y="261">0.0042 km·km/m</text>
    <text x="200" y="265">×</text>
  </g>
  <text x="380" y="316" font-size="12.5" font-style="italic" fill="currentColor" text-anchor="middle">no cancellation is possible — the garbage units announce the error before it can do damage</text>
  <text x="380" y="344" font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">write the factor so the unit you HAVE sits where it can cancel — the units are the proofreader</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The direction test — the built-in proofreader',
          text: 'Before trusting any converted answer, read its **direction**: converting to a **smaller** unit must give a **bigger** count (more little chunks fit), and to a **bigger** unit a smaller count. $250\\text{ cm} = 2.5\\text{ m}$ shrank ✓; an answer of $25{,}000\\text{ m}$ would have walked the factor upside down. Panel B\u2019s orphan units and the direction test are the same insurance worn twice — one checks the **units**, the other the **number**.',
        },
        {
          kind: 'table',
          caption: 'The direction test on four verified conversions: the count moves opposite to the unit \u2014 always.',
          head: ['Conversion', 'The unit', 'The count', 'The test'],
          rows: [
            ['$250\\text{ cm} \\to \\text{m}$', 'grows (m > cm)', 'shrinks: $2.5$', '\u2713 smaller count for the bigger unit'],
            ['$2.5\\text{ m} \\to \\text{cm}$', 'shrinks (cm < m)', 'grows: $250$', '\u2713 bigger count for the smaller unit'],
            ['$750\\text{ g} \\to \\text{kg}$', 'grows (kg > g)', 'shrinks: $0.75$', '\u2713'],
            ['$54\\text{ km/h} \\to \\text{m/s}$', 'shrinks (s < h, m < km)', 'shrinks: $15$', '\u2713 both ingredients shrink the count'],
          ],
        },
        { kind: 'heading', text: 'Chains: several hops, one line' },
        {
          kind: 'para',
          text: 'When no single identity joins two units, the factors **chain**: cancel one unit, and the next factor picks up the survivor. The line reads left to right, each fraction eating the unit before it:',
        },
        {
          kind: 'equation',
          latex: '2.5\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 2.5 \\times 1000 \\times 100\\text{ cm} = 250{,}000\\text{ cm}',
          note: 'The km cancels in the first fraction, the m in the second; only cm survives. Five rungs of the 9.2 ladder — $3 + 2$ hops — cashed as two factors in one line.',
        },
        {
          kind: 'para',
          text: 'One freedom worth noticing: the chain’s **order does not matter**. Multiplication has been commutative since chapter 2, so $2.5 \\times 1000 \\times 100 = 2.5 \\times 100 \\times 1000$ — the factors may wear in any sequence and the cancellations rearrange themselves around them. What is *not* free is the **matching**: every factor’s bottom unit must be a unit actually present in the product at that moment, or nothing cancels and the line drowns in orphan units. The safe habit is left to right — cancel what you have, name what you hold, reach for the next identity — but the algebra itself never cares.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Either dressing works — the reciprocal returns',
          text: 'Because both dressings of an identity equal 1, **dividing by one is multiplying by the other**: $x \\div \\dfrac{1\\text{ km}}{1000\\text{ m}} = x \\times \\dfrac{1000\\text{ m}}{1\\text{ km}}$. This is chapter 4\u2019s reciprocal theorem ($1/(a/b) = b/a$) wearing units — the same licence that let 4.5 divide by fractions. There is no "multiply for these, divide for those" list to memorise: pick the dressing that cancels, and the direction takes care of itself.',
        },
        { kind: 'heading', text: 'Composite units: the speed pipeline' },
        {
          kind: 'para',
          text: 'Composite units — a quotient like km/h, a product like kWh — convert by chaining **one factor per ingredient**. The flagship is the speed conversion this book has used since 6.2, and which 6.2 asked you to take on recall. Now watch it *derive itself*. To turn $54\\text{ km/h}$ into metres per second, dress the 54 with the metre factor and the hour factor — each cancels its own unit:',
        },
        {
          kind: 'derivation',
          title: 'The speed pipeline: 54 km/h to m/s, derived not recalled',
          statement:
            'Convert $54\\text{ km/h}$ to m/s using only the identities $1\\text{ km} = 1000\\text{ m}$ and $1\\text{ h} = 3600\\text{ s}$.',
          steps: [
            {
              label: 'Dress the distance ingredient',
              formula: '54\\,\\frac{\\text{km}}{\\text{h}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} = 54{,}000\\,\\frac{\\text{m}}{\\text{h}}',
              explanation: 'The km cancels top-and-bottom; the number grows ×1000 because metres are the smaller unit — the direction test approves.',
            },
            {
              label: 'Dress the time ingredient',
              formula: '54{,}000\\,\\frac{\\text{m}}{\\text{h}} \\times \\frac{1\\text{ h}}{3600\\text{ s}} = \\frac{54{,}000}{3600}\\,\\frac{\\text{m}}{\\text{s}} = 15\\,\\text{m/s}',
              explanation: 'The h cancels; dividing by 3600 shrinks the number — hours are bigger than seconds, so fewer-and-larger counts: the direction test approves again.',
            },
            {
              label: 'Collapse the two factors into one',
              formula: '\\frac{1000}{3600} = \\frac{5}{18} \\qquad\\Longrightarrow\\qquad \\text{km/h} \\times \\frac{5}{18} = \\text{m/s}',
              explanation: 'The pair of factors multiplies to the famous 5/18 — 6.2\u2019s memorised law, now *seen* as two identities chained rather than recalled.',
            },
          ],
          result: '$54\\text{ km/h} = 15\\text{ m/s}$ — and the return ticket is the reciprocal dress: $\\text{m/s} \\times 18/5 = \\text{km/h}$, where $18/5 = 3.6$.',
        },
        {
          kind: 'figure',
          caption:
            'The speed pipeline, flowing left to right: 54 km/h dresses its kilometres (× 1000 m over 1 km) into 54,000 m/h, then dresses its hours (× 1 h over 3600 s) into 15 m/s — the result station at the pipeline\u2019s end. The collapse note below shows the two factors multiplying to the pure number 1000/3600 = 5/18 — the conversion “law” of 6.2, unmasked as a chain of identities — and the return note shows both factors flipped (× 3600/1000 = × 3.6).',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Speed pipeline flowing left to right: 54 km/h, times 1000 m per 1 km, gives 54,000 m/h; times 1 h per 3600 s, gives 15 m/s; collapse notes below">
  <text x="380" y="24" font-size="13" fill="currentColor" text-anchor="middle">the speed pipeline — one factor per ingredient, flowing left to right</text>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="60" y="60" width="110" height="40" rx="4"/>
    <rect x="205" y="44" width="95" height="58" rx="4"/>
    <rect x="330" y="60" width="120" height="40" rx="4"/>
    <rect x="485" y="44" width="95" height="58" rx="4"/>
    <rect x="615" y="60" width="120" height="40" rx="4"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="115" y="85">54 km/h</text>
    <text x="252" y="68">× 1000 m</text>
    <text x="252" y="92">1 km</text>
    <text x="390" y="85">54,000 m/h</text>
    <text x="532" y="68">× 1 h</text>
    <text x="532" y="92">3600 s</text>
    <text x="675" y="85">15 m/s</text>
  </g>
  <line x1="170" y1="80" x2="192" y2="80" stroke="currentColor" stroke-width="1.1"/>
  <path d="M 201 80 l -13 -6 l 0 12 z" fill="currentColor"/>
  <line x1="300" y1="80" x2="317" y2="80" stroke="currentColor" stroke-width="1.1"/>
  <path d="M 326 80 l -13 -6 l 0 12 z" fill="currentColor"/>
  <line x1="450" y1="80" x2="472" y2="80" stroke="currentColor" stroke-width="1.1"/>
  <path d="M 481 80 l -13 -6 l 0 12 z" fill="currentColor"/>
  <line x1="580" y1="80" x2="602" y2="80" stroke="currentColor" stroke-width="1.1"/>
  <path d="M 611 80 l -13 -6 l 0 12 z" fill="currentColor"/>
  <g stroke="currentColor" stroke-width="1.2" fill="none">
    <rect x="205" y="150" width="290" height="44" rx="4"/>
    <rect x="515" y="150" width="220" height="44" rx="4"/>
  </g>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <text x="350" y="168">the collapse — the two factors multiply:</text>
    <text x="350" y="186">1000/3600 = 5/18 (a pure factor, no units)</text>
    <text x="625" y="168">the return ticket — both factors flipped:</text>
    <text x="625" y="186">3600/1000 = 18/5 = 3.6</text>
  </g>
  <text x="380" y="240" font-size="12.5" font-style="italic" fill="currentColor" text-anchor="middle">read it left to right: dress the kilometres, dress the hours, and 15 m/s is what survives</text>
  <text x="380" y="266" font-size="12.5" font-style="italic" fill="currentColor" text-anchor="middle">the 5/18 “law” of 6.2 was this pipeline all along — derived, never memorised</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The same pipeline handles every school speed: $72\\text{ km/h} = 72 \\times 5/18 = 20\\text{ m/s}$; $90\\text{ km/h} = 25\\text{ m/s}$; and the return direction $25\\text{ m/s} \\times 3.6 = 90\\text{ km/h}$, $12\\text{ m/s} = 43.2\\text{ km/h}$. Time chains work identically: $2.5\\text{ h} = 2.5 \\times 60 \\times 60 = 9000\\text{ s}$ (two factors, or the pre-collapsed $\\times 3600$); $45\\text{ min} = 2700\\text{ s}$; and the day\u2019s $24 \\times 3600 = 86{,}400\\text{ s}$ of 9.2 is just the hour identity, walked 24 times.',
        },
        { kind: 'heading', text: 'Areas and volumes: the factor inherits the power' },
        {
          kind: 'para',
          text: 'Here is the most lucrative error trap in school measurement, and the factor method dismantles it in one move. The area unit $\\text{m}^2$ is not "a metre with a decoration" — it is $1\\text{ m} \\times 1\\text{ m}$, a **product of two lengths**. So its conversion factor is the length factor **used twice**:',
        },
        {
          kind: 'derivation',
          title: 'The squared-factor law: 1 m² = 10,000 cm², not 100',
          statement: 'Convert $1\\text{ m}^2$ to square centimetres through the factor method.',
          steps: [
            {
              label: 'Write the square as the product it is',
              formula: '1\\text{ m}^2 = 1\\text{ m} \\times 1\\text{ m}',
              explanation: 'The exponent 2 counts two length factors — the unit is a recipe, exactly as 9.1\u2019s derived-unit table said.',
            },
            {
              label: 'Dress each length factor separately',
              formula: '= (100\\text{ cm}) \\times (100\\text{ cm})',
              explanation: 'Each metre borrows its own (100 cm / 1 m) — the same identity, applied twice because the square contains it twice.',
            },
            {
              label: 'Multiply',
              formula: '= 10{,}000\\text{ cm}^2',
              explanation: 'The factor 100 is used twice: $100^2 = 10^4$. The 8.5 tile arithmetic and the 9.2 hectare ($100\\text{ m} \\times 100\\text{ m} = 10^4\\text{ m}^2$) are this one line.',
            },
          ],
          result: '$1\\text{ m}^2 = 10^4\\text{ cm}^2$ — the factor inherits the unit\u2019s power. The classic fraud "$1\\text{ m}^2 = 100\\text{ cm}^2$" is the length factor used once for a two-length unit.',
        },
        {
          kind: 'equation',
          latex: '1\\text{ m}^2 = (100\\text{ cm})^2 = 10^4\\text{ cm}^2, \\qquad 1\\text{ cm}^2 = (10\\text{ mm})^2 = 10^2\\text{ mm}^2, \\qquad 1\\text{ m}^3 = (100\\text{ cm})^3 = 10^6\\text{ cm}^3',
          note: '**The power law for factors (tag 2).** Converting the $k$-th power of a unit raises the factor to the $k$: ×100 once for lengths, squared for areas, cubed for volumes. So $3.5\\text{ m}^2 = 35{,}000\\text{ cm}^2$, $2.4\\text{ cm}^2 = 240\\text{ mm}^2$, and the 9.2 tank\u2019s $3\\text{ m}^3 = 3{,}000{,}000\\text{ cm}^3 = 3000\\text{ L}$ through the litre bridge.',
        },
        {
          kind: 'example',
          title: 'A window has area 3.5 m². A film of spray covers 240 mm² of it. Express both in the neighbour unit.',
          steps: [
            'Now, the window: areas ride the squared factor — $3.5\\text{ m}^2 = 3.5 \\times (100\\text{ cm})^2 = 3.5 \\times 10{,}000 = 35{,}000\\text{ cm}^2$.',
            'And the spray: $240\\text{ mm}^2$ climbs one squared rung — $240 \\times (10)^2 = 240 \\times 100 = 24{,}000\\text{ cm}^2$... careful: mm² to cm² is one rung of length but a factor of $10^2$ in area.',
            'So the spray is $24{,}000\\text{ mm}^2 = 240\\text{ cm}^2$ — and check the direction: cm² is bigger, so the count shrinks. ✓',
            'Hence 35,000 cm² and 240 cm² — the factor squaring exactly as many times as the unit\u2019s exponent says.',
          ],
        },
        {
          kind: 'example',
          title: 'A relay race covers 1.25 km. Express the course in metres, then in centimetres, by chained factors.',
          steps: [
            'Now, the first identity: $1.25\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} = 1250\\text{ m}$ \u2014 the km cancels, the count grows \u00d71000.',
            'And the second: $1250\\text{ m} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 125{,}000\\text{ cm}$ \u2014 the m cancels, \u00d7100 more.',
            'So the chain in one line: $1.25 \\times 1000 \\times 100 = 125{,}000$ \u2014 five rungs, $\\times 10^5$, the digits 1-2-5 intact.',
            'Hence 1250 m and 125,000 cm \u2014 two identities, one course, the direction test approving both growths.',
          ],
        },
        {
          kind: 'para',
          text: 'And with that, the title\u2019s promise is auditable. The **identity economy**: six facts ($1\\text{ km} = 1000\\text{ m}$, $1\\text{ m} = 100\\text{ cm}$, $1\\text{ m} = 1000\\text{ mm}$, $1\\text{ kg} = 1000\\text{ g}$, $1\\text{ L} = 1000\\text{ mL}$, $1\\text{ h} = 3600\\text{ s}$), one licence (multiply by 1 in either dressing), one bookkeeping rule (cancel what appears above and below), one power rule (the factor inherits the exponent). Every conversion this book has ever performed — the 5/18 of 6.2, the $1\\text{ m}^2 = 10^4\\text{ cm}^2$ of 8.5, the tank litres of 9.2 — is now *derivable* from that short list, which is what "without memorising tables" strictly means: the tables were always the identities, multiplied.',
        },
        {
          kind: 'para',
          text: 'One honesty closes the lesson. The licence says a factor worn as a fraction **multiplies by its value** \u2014 it does not check that the value is 1. Wear a *false* identity ($1\\text{ km} = 100\\text{ m}$, say) and the method runs perfectly and delivers garbage: $1\\text{ km} \\times \\frac{100\\text{ m}}{1\\text{ km}} = 100\\text{ m}$, because the factor $100/1$ is not 1 and never pretended to be. The method\u2019s power and its peril are the same door: **it multiplies whatever you hand it**. That is why the identities come from 9.2\u2019s ladder \u2014 the agreement chapter \u2014 and not from memory\u2019s mood: the arithmetic engine is only as honest as the treaty that feeds it.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Conversion items reward the method, not the memory: multi-hop chains ($2.5\\text{ km}$ to cm; $2.5\\text{ h}$ to s through 60 × 60); speed both ways ($90\\text{ km/h}$ to m/s; $12\\text{ m/s}$ to km/h — the ×3.6 return); the area trap (options offering 350 for $3.5\\text{ m}^2$ in cm² — the ×100 fraud made visible); and diagnosis items ("a student writes $250\\text{ cm} = 25{,}000\\text{ m}$ — find the fault": the factor was upside down; the direction test alone convicts it). Shapes cited from SSC/RRB/banking patterns; none reproduced.',
        },
        {
          kind: 'formula',
          name: 'The factor licence',
          latex: 'Q \\times \\frac{a\\,\\text{u}_1}{b\\,\\text{u}_2} = Q \\quad (a\\,\\text{u}_1 = b\\,\\text{u}_2)',
          note: 'Any identity worn as a fraction equals 1 — in either direction. Choose the dressing whose given-unit cancels; the survivor unit is the answer\u2019s.',
        },
        {
          kind: 'formula',
          name: 'The speed collapse (and its return)',
          latex: '\\text{km/h} \\times \\frac{5}{18} = \\text{m/s}, \\qquad \\text{m/s} \\times \\frac{18}{5} = \\text{km/h}',
          note: '5/18 = 1000/3600 derived from two identities; 18/5 = 3.6 is its reciprocal dress.',
        },
        {
          kind: 'formula',
          name: 'The power law for factors',
          latex: '1\\text{ m}^2 = 10^4\\text{ cm}^2, \\qquad 1\\text{ m}^3 = 10^6\\text{ cm}^3',
          note: 'The factor inherits the unit\u2019s exponent: ×100 squared for areas, cubed for volumes. The ×100 area fraud refuses here.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Conversion factor',
              def: 'A fraction whose numerator and denominator are equal measures in different units — $1000\\text{ m}/1\\text{ km}$ — hence exactly 1. Worn in either direction; the dressing that cancels the given unit is the one to use.',
            },
            {
              term: 'Cancellation',
              def: 'Units multiply and divide like factors (km·m/km = m) — licensed by 9.1\u2019s $Q = n \\times u$: a dressed quantity is a product of a number and a unit.',
            },
            {
              term: 'Chain method',
              def: 'Several factors in one line, each cancelling the previous survivor\u2019s unit: km → m → cm as $\\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{100\\text{ cm}}{1\\text{ m}}$.',
            },
            {
              term: 'Reciprocal dressing',
              def: 'Dividing by a factor equals multiplying by its flip: $x \\div \\frac{1\\text{ km}}{1000\\text{ m}} = x \\times \\frac{1000\\text{ m}}{1\\text{ km}}$ — 4.5\u2019s reciprocal theorem wearing units.',
            },
            {
              term: 'Speed pipeline',
              def: 'Composite units convert one ingredient at a time: km/h → m/s dresses the distance (×1000 m/1 km) and then the time (×1 h/3600 s); the factors collapse to 5/18.',
            },
            {
              term: 'Squared-factor law',
              def: 'The conversion factor of a unit\u2019s $k$-th power is the factor to the $k$: $1\\text{ m}^2 = 10^4\\text{ cm}^2$, $1\\text{ m}^3 = 10^6\\text{ cm}^3$. The ×100 area fraud is the length factor under-used once.',
            },
            {
              term: 'Direction test',
              def: 'Smaller unit ⇒ bigger count; bigger unit ⇒ smaller count. The number\u2019s built-in proofreader — an answer moving the wrong way convicts an upside-down factor instantly.',
            },
            {
              term: 'Identity economy',
              def: 'Six owned facts (km–m, m–cm, m–mm, kg–g, L–mL, h–s) + the factor licence + the power rule generate every school conversion: the tables were always the identities, multiplied.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The conversion factor $\\dfrac{1000\\text{ m}}{1\\text{ km}}$ equals',
              options: ['$1$', '$1000$', '$1/1000$', 'it depends on the quantity'],
              answer: 0,
              explain:
                'Numerator and denominator are the same span in two dresses, so the fraction is exactly 1 (Option 1) — that is the whole licence. Option 2 is the numerator alone; Option 3 the flipped dress\u2019s reciprocal confusion; Option 4 — a factor\u2019s value never depends on what it multiplies.',
            },
            {
              q: 'Chaining the factors, $2.5\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{100\\text{ cm}}{1\\text{ m}} =$',
              options: ['$25{,}000\\text{ cm}$', '$250{,}000\\text{ cm}$', '$2{,}500{,}000\\text{ cm}$', '$25\\text{ cm}$'],
              answer: 1,
              explain:
                '$2.5 \\times 1000 \\times 100 = 250{,}000$ (Option 2) — five ladder rungs, $\\times 10^5$. Option 1 drops a factor of ten; Option 3 adds one; Option 4 divided instead of multiplied. Direction test: cm is smaller than km, so the count must grow enormously. ✓',
            },
            {
              q: 'Converting 750 g to kilograms, the number must',
              options: ['grow ×1000', 'stay the same', 'shrink ÷1000', 'cannot be known'],
              answer: 2,
              explain:
                'The kilogram is the bigger unit, so the count shrinks: $750 \\div 1000 = 0.75$ (Option 3). Option 1 walks the factor upside down; Option 2 confuses the quantity (which never moves) with the count (which must); Option 4 — the identity decides it completely.',
            },
            {
              q: '$1\\text{ m}^2$ expressed in cm² is',
              options: ['$100\\text{ cm}^2$', '$1000\\text{ cm}^2$', '$10{,}000\\text{ cm}^2$', '$100{,}000\\text{ cm}^2$'],
              answer: 2,
              explain:
                'The factor inherits the square: $(100\\text{ cm})^2 = 10^4$ (Option 3). Options 1 and 2 use the length factor once or half — the classic area fraud. Option 4 overshoots by ten. The derivation: $1\\text{ m}^2 = 1\\text{ m} \\times 1\\text{ m} = 100\\text{ cm} \\times 100\\text{ cm}$. ✓',
            },
            {
              q: '$54\\text{ km/h}$ expressed in m/s is',
              options: ['$5.4$', '$15$', '$150$', '$194.4$'],
              answer: 1,
              explain:
                'The pipeline: $54 \\times 1000/3600 = 54 \\times 5/18 = 15$ (Option 2). Option 1 slipped a zero; Option 3 multiplied by 18/6-ish carelessly; Option 4 applied the return factor 3.6 backwards ($54 \\times 3.6 = 194.4$). Check: 15 m/s × 3.6 returns 54. ✓',
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
                  q: 'Convert by the factor method, naming the identity you wore: (i) 6 m to cm; (ii) 9000 g to kg; (iii) 3500 mL to L.',
                  solution: [
                    'Now, wear each identity in the direction that cancels the unit you have.',
                    'So (i) $6\\text{ m} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 600\\text{ cm}$; (ii) $9000\\text{ g} \\times \\frac{1\\text{ kg}}{1000\\text{ g}} = 9\\text{ kg}$; (iii) $3500\\text{ mL} \\times \\frac{1\\text{ L}}{1000\\text{ mL}} = 3.5\\text{ L}$.',
                    'And the direction test reads all three: bigger count for the smaller unit (i), smaller counts for the bigger units (ii), (iii).',
                    'Hence 600 cm, 9 kg, 3.5 L — three identities, three cancellations, zero tables.',
                  ],
                  answer: '(i) 600 cm; (ii) 9 kg; (iii) 3.5 L',
                },
                {
                  q: 'Which is longer: 320 cm, or 3 m? By how much?',
                  solution: [
                    'Now, one rail first: $3\\text{ m} \\times \\frac{100\\text{ cm}}{1\\text{ m}} = 300\\text{ cm}$.',
                    'So the comparison is 320 cm against 300 cm, and the gap is $320 - 300 = 20\\text{ cm}$.',
                    'Hence 320 cm is longer, by 20 cm — the factor, then the subtraction.',
                  ],
                  answer: '320 cm, by 20 cm',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Convert 0.85 km to metres by writing the factor explicitly and cancelling.',
                  solution: [
                    'Now, the identity $1\\text{ km} = 1000\\text{ m}$ worn as $\\frac{1000\\text{ m}}{1\\text{ km}}$ — the km sits below, ready to cancel.',
                    'So $0.85\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} = 0.85 \\times 1000\\text{ m} = 850\\text{ m}$.',
                    'And the direction test: metres are smaller, the count grew from 0.85 to 850. ✓',
                    'Hence 850 m — the dressing changed, the span did not.',
                  ],
                  answer: '850 m',
                },
                {
                  q: 'Convert 2.5 h to seconds by chaining two factors (hours → minutes → seconds).',
                  solution: [
                    'Now, chain the identities: $2.5\\text{ h} \\times \\frac{60\\text{ min}}{1\\text{ h}} \\times \\frac{60\\text{ s}}{1\\text{ min}}$.',
                    'So the h cancels, then the min: $2.5 \\times 60 \\times 60 = 9000\\text{ s}$.',
                    'And the collapsed dress agrees: $2.5 \\times 3600 = 9000$ — the pre-multiplied factor is just the chain, folded.',
                    'Hence 9000 s — two identities, one line.',
                  ],
                  answer: '9000 s',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A bus runs at 90 km/h. Convert to m/s through the two-factor pipeline.',
                  solution: [
                    'Now, dress the distance: $90\\,\\frac{\\text{km}}{\\text{h}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} = 90{,}000\\,\\text{m/h}$.',
                    'And dress the time: $90{,}000 \\times \\frac{1\\text{ h}}{3600\\text{ s}} = 25\\text{ m/s}$.',
                    'So the collapse agrees: $90 \\times \\frac{5}{18} = 25$ — the 6.2 law, derived.',
                    'Hence 25 m/s.',
                  ],
                  answer: '25 m/s',
                },
                {
                  q: 'A cyclist rides at 12 m/s. Convert to km/h through the return pipeline.',
                  solution: [
                    'Now, the return pipeline wears both factors upside down: $12\\,\\frac{\\text{m}}{\\text{s}} \\times \\frac{3600\\text{ s}}{1\\text{ h}} \\times \\frac{1\\text{ km}}{1000\\text{ m}}$.',
                    'So $12 \\times \\frac{3600}{1000} = 12 \\times 3.6 = 43.2\\text{ km/h}$.',
                    'And the direction test: km/h is the bigger-dressed unit, so the count grows from 12 to 43.2. ✓',
                    'Hence 43.2 km/h.',
                  ],
                  answer: '43.2 km/h',
                  figures: [
                    {
                      caption:
                        'The return pipeline for THIS solution — both factors flipped from the forward machine: $\\frac{3600\\text{ s}}{1\\text{ h}}$ first (the seconds cancel), then $\\frac{1\\text{ km}}{1000\\text{ m}}$ (the metres cancel), collapsing to $\\times 3.6$: the count grows, exactly as the direction test demands.',
                      svg: `<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The return pipeline from 12 metres per second through two flipped factors to 43.2 kilometres per hour, stations connected by arrows">
  <text x="390" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the return pipeline — m/s dressed back up to km/h, factors flipped</text>
  <g font-size="12.5" fill="currentColor" text-anchor="middle">
    <rect x="40" y="120" width="100" height="56" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
    <text x="90" y="153">12 m/s</text>
    <rect x="165" y="120" width="140" height="56" fill="currentColor" opacity="0.09" stroke="currentColor" stroke-width="1.5"/>
    <text x="235" y="144">× 3600 s</text>
    <text x="235" y="166">1 h</text>
    <rect x="330" y="120" width="140" height="56" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
    <text x="400" y="153">43,200 m/h</text>
    <rect x="495" y="120" width="140" height="56" fill="currentColor" opacity="0.09" stroke="currentColor" stroke-width="1.5"/>
    <text x="565" y="144">× 1 km</text>
    <text x="565" y="166">1000 m</text>
    <rect x="655" y="120" width="100" height="56" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1.5"/>
    <text x="705" y="153" font-weight="bold">43.2 km/h</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" fill="currentColor">
    <line x1="140" y1="148" x2="162" y2="148"/><polygon points="164,148 157,145 157,151" stroke="none"/>
    <line x1="305" y1="148" x2="327" y2="148"/><polygon points="329,148 322,145 322,151" stroke="none"/>
    <line x1="470" y1="148" x2="492" y2="148"/><polygon points="494,148 487,145 487,151" stroke="none"/>
    <line x1="635" y1="148" x2="652" y2="148"/><polygon points="654,148 647,145 647,151" stroke="none"/>
  </g>
  <text x="390" y="240" font-size="12.5" fill="currentColor" text-anchor="middle">the collapse: 3600 ÷ 1000 = 3.6, so 12 × 3.6 = 43.2</text>
  <text x="390" y="264" font-size="11.5" fill="currentColor" text-anchor="middle" opacity="0.8">the direction test: km/h is the bigger-dressed unit — the count grows 12 → 43.2 ✓</text>
</svg>`,
                    },
                  ],
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A window has area 3.5 m². Express it in cm², and explain why the answer is not 350.',
                  solution: [
                    'Now, the unit is a square: $1\\text{ m}^2 = 1\\text{ m} \\times 1\\text{ m} = 100\\text{ cm} \\times 100\\text{ cm}$.',
                    'So the length factor is used twice: $3.5 \\times 100 \\times 100 = 35{,}000\\text{ cm}^2$.',
                    'And "350" is the fraud — the length factor \\u00d7100 used once for a two-length unit.',
                    'Hence 35,000 cm² — the factor inherits the exponent.',
                  ],
                  answer: '35,000 cm² (not 350 — the factor squares)',
                },
                {
                  q: 'A tank holds 4 m³ of water. Use the factor method (through cm³) to find its capacity in litres.',
                  solution: [
                    'Now, cube the length factor: $1\\text{ m}^3 = (100\\text{ cm})^3 = 1{,}000{,}000\\text{ cm}^3$.',
                    'So the tank holds $4 \\times 10^6\\text{ cm}^3$.',
                    'And cross the litre bridge: $1\\text{ L} = 1000\\text{ cm}^3$, so $\\frac{4{,}000{,}000}{1000} = 4000\\text{ L}$.',
                    'Hence 4000 L — the cubed factor and the litre bridge handing the answer across.',
                  ],
                  answer: '4000 L',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Chain factors to express 3.45 km in millimetres — in one line, showing every cancellation.',
                  solution: [
                    'Now, two identities bridge the gap: km → m, then m → mm.',
                    'So $3.45\\text{ km} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{1000\\text{ mm}}{1\\text{ m}} = 3.45 \\times 10^6\\text{ mm}$.',
                    'And the arithmetic: $3.45 \\times 1{,}000{,}000 = 3{,}450{,}000\\text{ mm}$ — the digits 3-4-5 unchanged, the point six places right.',
                    'Hence 3,450,000 mm — six rungs, two factors, one line.',
                  ],
                  answer: '3,450,000 mm',
                },
                {
                  q: 'A student writes "250 cm = 25,000 m". Find the fault with the direction test, and give the right answer.',
                  solution: [
                    'Now, the direction test first: the metre is BIGGER than the centimetre, so the count must SHRINK — 25,000 grew, which convicts the factor at once.',
                    'So the student wore the identity upside down: $\\frac{1\\text{ km}}{1000\\text{ m}}$-thinking where $\\frac{100\\text{ cm}}{1\\text{ m}}$ was wanted... precisely, they multiplied by 100 instead of dividing.',
                    'And the right line: $250\\text{ cm} \\times \\frac{1\\text{ m}}{100\\text{ cm}} = 2.5\\text{ m}$.',
                    'Hence 2.5 m — the units were the proofreader; the test read the verdict before the arithmetic even mattered.',
                  ],
                  answer: 'The factor was upside down (multiplied by 100); the correct conversion is 2.5 m',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the squared-factor law from the factor method: show $1\\text{ m}^2 = 10^4\\text{ cm}^2$ and $1\\text{ cm}^2 = 10^2\\text{ mm}^2$, and state the general rule.',
                  solution: [
                    'Now, a square unit is the product of two length units: $1\\text{ m}^2 = 1\\text{ m} \\times 1\\text{ m}$.',
                    'So dress each factor: $(100\\text{ cm}) \\times (100\\text{ cm}) = 10^4\\text{ cm}^2$ — the identity used twice because the square contains it twice.',
                    'And one rung down: $1\\text{ cm}^2 = (10\\text{ mm}) \\times (10\\text{ mm}) = 10^2\\text{ mm}^2$.',
                    'Hence the general rule: the conversion factor of a unit\u2019s $k$-th power is the length factor raised to the $k$ — \\u00d710 once per length, squared for areas, cubed for volumes. The tables never said this; the method derives it.',
                  ],
                  answer: '1 m² = (100 cm)² = 10⁴ cm²; 1 cm² = (10 mm)² = 10² mm²; the factor inherits the exponent',
                },
                {
                  q: 'The identity economy in action: using only $1\\text{ km} = 1000\\text{ m}$ and $1\\text{ h} = 3600\\text{ s}$, derive how many m/s ride in 1 km/h.',
                  solution: [
                    'Now, dress one kilometre per hour through both identities: $1\\,\\frac{\\text{km}}{\\text{h}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{1\\text{ h}}{3600\\text{ s}}$.',
                    'So both original units cancel and $1\\text{ km/h} = \\frac{1000}{3600}\\text{ m/s}$.',
                    'And the fraction reduces: $\\frac{1000}{3600} = \\frac{5}{18} \\approx 0.278$ — chapter 3\u2019s HCF reduction closing the line.',
                    'Hence 1 km/h = 5/18 m/s — the entire 6.2 conversion law, generated from two owned facts and the licence to multiply by one. That is the economy: six identities, one licence, every conversion.',
                  ],
                  answer: '1 km/h = 1000/3600 = 5/18 ≈ 0.278 m/s — derived from two identities',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-precision-accuracy-and-rounding-in-measurement',
      number: '9.4',
      title: 'Precision, Accuracy and Rounding in Measurement',
      concepts: [
        'Every measurement is a claim, not a fact',
        'Precision — the fineness of the unit',
        'The interval a reading hides',
        'Accuracy — closeness to the true value',
        'Precision and accuracy are independent axes',
        'Rounding to a named place — the digit rule',
        'The greatest possible error',
        'Significant figures — counting the honest digits',
      ],
      objectives: [
        'Explain why no measurement is exact — a reading names the unit-multiple nearest the truth — and read "7 cm" and "7.0 cm" as different claims about the same pencil',
        'State the precision of a measurement as the smallest unit it distinguishes, and derive the interval law: a reading $m$ to the nearest unit $u$ confines the true value to $m - u/2 \\le t < m + u/2$',
        'Distinguish accuracy (closeness to the true value) from precision (fineness and repeatability), and diagnose a precise-but-inaccurate instrument from its pattern of readings',
        'Round any number to a named place by the digit rule — including the half-up convention and the round-once-from-the-original discipline that defeats double rounding',
        'Compute the greatest possible error of an instrument (half its smallest division) and count the significant figures a written measurement honestly carries',
      ],
      prerequisites: ['fm-converting-units-without-memorising-tables', 'fm-the-metric-system', 'fm-decimal-places-and-the-point'],
      sources: ['ncert-sci6-curiosity-ch5', 'ncert-phys11-ch2', 'ncert-math6-ch1', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Three lessons have built the machinery of measurement, and all of them wore clean numbers: 82 m of fence, 250 g of flour, 3.45 km of relay, 4,200 mm of point-shifted digits. This closing lesson asks the question a careful reader should have been saving all along: *is the number true?* Take a brand-new pencil and three rulers from the same drawer — one ruled only in centimetres, one in half-centimetres, one in millimetres. One pencil, three careful eyes, and the drawer hands back three different answers: **7 cm, 7.0 cm and 6.8 cm**. Nobody erred. Nobody need apologise. The answers differ because the instruments differ — and untangling exactly what each answer *claims* is the business of this lesson.',
        },
        {
          kind: 'para',
          text: 'The reason runs straight back to 9.1: a measurement is a **count of units**, and a count can only land on multiples of its unit. Between two neighbouring marks — however fine the ruler — the truth hides. So every measurement is a **claim about an interval**, never a fact about a point, and two honest skills follow: *reading* what a measurement claims (precision, the hidden interval, the greatest possible error) and *writing* numbers back at the same honesty (rounding, significant figures). Then there is the word that sounds like precision but is not it: **accuracy** — a second, independent axis on which every measurement stands or falls.',
        },
        { kind: 'heading', text: 'One pencil, three rulers: the claim behind a reading' },
        {
          kind: 'para',
          text: 'Lay the pencil along each ruler with its eraser end on the zero mark, and read the tip (figure 1). On **ruler A**, ruled in whole centimetres, the tip falls between the 6 and the 7 — and visibly nearer the 7 — so the ruler can only say **7 cm**. On **ruler B**, ruled in half-centimetres, the neighbouring marks are 6.5 and 7.0; the tip sits 0.3 from the first and 0.2 from the second, so B says **7.0 cm**. On **ruler C**, ruled in millimetres, the tip lands exactly on the 68th millimetre mark: C says **6.8 cm**. Three instruments, three readings, one pencil.',
        },
        {
          kind: 'figure',
          caption:
            'The same pencil — true length 6.8 cm, drawn once at top — laid against three rulers. Ruler A (centimetre marks) reads 7 cm; ruler B (half-centimetre marks) reads 7.0 cm; ruler C (millimetre marks) reads 6.8 cm. The dashed plumb-line drops from the pencil tip through all three rulers: the tip never moved, but each instrument can only speak at its own coarseness. Every reading is honest; they differ because the claims differ.',
          svg: `<svg viewBox="0 0 800 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One 6.8 cm pencil drawn above three rulers ruled respectively in centimetres, half-centimetres and millimetres; a dashed plumb line from the pencil tip shows the readings 7 cm, 7.0 cm and 6.8 cm">
  <text x="400" y="24" font-size="13" fill="currentColor" text-anchor="middle">three rulers, one pencil — the instrument decides the claim</text>
  <g stroke="currentColor" stroke-width="1.4" fill="none">
    <rect x="92" y="66" width="378" height="24" rx="2"/>
    <rect x="70" y="66" width="22" height="24" rx="3"/>
    <polygon points="470,66 491.6,78 470,90"/>
  </g>
  <polygon points="486,72.6 491.6,78 486,83.4" fill="currentColor"/>
  <text x="281" y="58" font-size="12" fill="currentColor" text-anchor="middle">true length 6.8 cm</text>
  <g stroke="currentColor" stroke-width="1" fill="#ffffff">
    <rect x="70" y="150" width="496" height="36"/>
    <rect x="70" y="235" width="496" height="36"/>
    <rect x="70" y="320" width="496" height="36"/>
  </g>
  <g stroke="currentColor" stroke-width="1.2">
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<line x1="${70 + 62 * k}" y1="150" x2="${70 + 62 * k}" y2="164"/>`).join('')}
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<line x1="${70 + 62 * k}" y1="235" x2="${70 + 62 * k}" y2="251"/>`).join('')}
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<line x1="${70 + 62 * k}" y1="320" x2="${70 + 62 * k}" y2="334"/>`).join('')}
  </g>
  <g stroke="currentColor" stroke-width="0.7" opacity="0.85">
    ${Array.from({ length: 17 }, (_, i) => (i % 2 === 0 ? '' : `<line x1="${70 + 31 * i}" y1="235" x2="${70 + 31 * i}" y2="242"/>`)).join('')}
    ${Array.from({ length: 81 }, (_, i) => (i % 10 === 0 ? '' : `<line x1="${70 + 6.2 * i}" y1="320" x2="${70 + 6.2 * i}" y2="327"/>`)).join('')}
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<text x="${70 + 62 * k}" y="202">${k}</text>`).join('')}
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<text x="${70 + 62 * k}" y="287">${k}</text>`).join('')}
    ${[0,1,2,3,4,5,6,7,8].map((k) => `<text x="${70 + 62 * k}" y="372">${k}</text>`).join('')}
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">
    <text x="40" y="172">ruler A</text>
    <text x="40" y="257">ruler B</text>
    <text x="40" y="342">ruler C</text>
  </g>
  <line x1="491.6" y1="78" x2="491.6" y2="356" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.75"/>
  <g fill="currentColor">
    <circle cx="491.6" cy="168" r="3.2"/>
    <circle cx="491.6" cy="253" r="3.2"/>
    <circle cx="491.6" cy="338" r="3.2"/>
  </g>
  <g font-size="12" fill="currentColor">
    <text x="590" y="172">7 cm — nearest 1 cm</text>
    <text x="590" y="257">7.0 cm — nearest 0.5 cm</text>
    <text x="590" y="342">6.8 cm — nearest 0.1 cm</text>
  </g>
</svg>`,
        },
        {
          kind: 'table',
          caption:
            'One pencil (true length 6.8 cm), three instruments, three claims. The smaller the unit a reading distinguishes, the finer its promise about the truth.',
          head: ['Reading', 'Unit it distinguishes', 'The claim (the hidden interval)', 'Precision'],
          rows: [
            ['7 cm', '1 cm', '$6.5 \\le t < 7.5$ cm', 'coarsest'],
            ['7.0 cm', '0.5 cm', '$6.75 \\le t < 7.25$ cm', 'finer'],
            ['6.8 cm', '0.1 cm', '$6.75 \\le t < 6.85$ cm', 'finest'],
          ],
        },
        {
          kind: 'para',
          text: 'Notice what did **not** cause the differences. Not carelessness — all three readers were careful. Not handwriting — all three wrote clean digits. The cause is the **instrument**: the count can only land on the marks the ruler owns, so the ruler\u2019s smallest mark is the finest sentence the reading can speak. That property of a measurement has a name.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Precision',
          text: 'The **precision** of a measurement is said to be the **size of the smallest unit (or instrument division) the reading distinguishes** — a measurement is *more precise* when that unit is smaller. Thus "6.8 cm" (unit 0.1 cm) is more precise than "7 cm" (unit 1 cm); "7.25 s" is more precise than "7.3 s". Precision belongs to the **instrument and its unit**, never to the confidence of the person.',
        },
        {
          kind: 'para',
          text: 'Now the subtlest reading in the table: **7 cm versus 7.0 cm**. As *numbers* they are identical — 5.1\u2019s trailing-zero licence said so. As *measurements* they are different sentences. "7 cm" speaks in whole centimetres and promises $6.5 \\le t < 7.5$. "7.0 cm" testifies that the reader could resolve tenths — a ruler like B or C was in play — and promises ten times better. The trailing zero is not decoration; it is **testimony**.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The zero that vouches',
          text: 'When a measured "7.0 cm" is lazily rewritten "7 cm", the value survives but the claim collapses — and a claim, unlike a digit, cannot be recovered from the digits that remain. Write every zero your instrument earned; never write one it did not.',
        },
        { kind: 'heading', text: 'The interval a reading hides' },
        {
          kind: 'para',
          text: 'What exactly does a reading promise about the truth? A reading $m$ taken to the nearest unit $u$ says: *the true value $t$ is nearer to $m$ than to any other multiple of $u$*. The contestants of $m$ live one unit away on either side, at $m - u$ and $m + u$; the territory where $m$ wins is the strip between the two halfway points, $m - u/2$ and $m + u/2$. That strip is the claim, made exact:',
        },
        {
          kind: 'derivation',
          title: 'The interval law: what a reading to the nearest unit really asserts',
          statement:
            'A length is read as $m$ to the nearest unit $u$ — for the pencil, $6.8$ cm to the nearest $0.1$ cm. Show that the true value $t$ must satisfy $m - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}$, and locate the walls.',
          steps: [
            {
              label: 'What the reading asserts',
              formula: '6.8 = \\text{the nearest tenth to } t',
              explanation:
                'The reading is the winner of a nearest-mark contest: among all tenth-multiples (6.0, 6.1, …, 6.7, 6.8, 6.9, 7.0, …), the truth sat closest to 6.8 — that is what "6.8 cm, to the nearest 0.1 cm" means.',
            },
            {
              label: 'The halfway walls',
              formula: '6.8 - 0.05 = 6.75, \\qquad 6.8 + 0.05 = 6.85',
              explanation:
                'Halfway between 6.8 and its neighbour 6.7 stands 6.75; halfway towards 6.9 stands 6.85. Left of 6.75 the winner would have been 6.7; from 6.85 onward it is 6.9.',
            },
            {
              label: 'The left wall is in, the right wall is out',
              formula: '6.75 \\le t < 6.85',
              explanation:
                'At exactly 6.75 the contest is a tie, and the school convention gives ties to the larger candidate (the half-up rule of the rounding section below) — so 6.75 itself still reads 6.8 and belongs inside. At exactly 6.85 the tie is given to 6.9, so 6.85 is already outside.',
            },
          ],
          result: 'If the truth is read as $m$ to the nearest unit $u$, then $m - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}$ — for the pencil: $6.75 \\le t < 6.85$ cm.',
        },
        {
          kind: 'equation',
          latex: '\\text{read } m \\text{ to the nearest } u \\;\\Longrightarrow\\; m - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}',
          note: '**The interval law (tag 1).** Every measurement is a claim about a range, with a half-unit of honesty built in on each side — left wall in (the half-up tie), right wall out.',
        },
        {
          kind: 'example',
          title: 'A screw’s length is reported as 2.4 cm, measured to the nearest 0.1 cm. Between which bounds does the true length lie?',
          steps: [
            'Now, the reading is $m = 2.4$ and the unit is $u = 0.1$ cm — the interval law applies.',
            'So the walls sit half a unit away: $2.4 - 0.05 = 2.35$ and $2.4 + 0.05 = 2.45$.',
            'And the walls behave by the half-up convention: 2.35 itself still reads 2.4 (inside), while 2.45 already reads 2.5 (outside).',
            'Hence $2.35 \\le t < 2.45$ cm — the screw is pinned to a strip half a millimetre wide.',
          ],
        },
        {
          kind: 'para',
          text: 'The three pencil readings now show their deeper order. Read 7 cm claims $[6.5, 7.5)$; read 7.0 cm (unit 0.5) claims $[6.75, 7.25)$; read 6.8 cm claims $[6.75, 6.85)$. Each finer claim is a **sub-interval of the coarser one** — the claims *nest*, the way zooming nests: $[6.75, 6.85) \\subset [6.75, 7.25) \\subset [6.5, 7.5)$. Precision, in the interval picture, is simply the *width* of the strip you are willing to sign your name to — and 9.2\u2019s ladder of rungs is a machine for printing narrower strips.',
        },
        { kind: 'heading', text: 'Accuracy: the other axis' },
        {
          kind: 'para',
          text: 'Precision says how **fine** a claim is. It says nothing about whether the claim is **true** — and truth is the measurer\u2019s real debt. A second word carries that meaning, and keeping the two apart is one of the most profitable distinctions in all of measurement.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Accuracy and error',
          text: 'A measurement is said to be **accurate** when it lies **close to the true (accepted) value** of the quantity. The **error** of a measurement is the gap between the measured and the true value, $\\text{error} = |\\text{measured} - \\text{true}|$ — small error, high accuracy. Accuracy is measured against *truth*; precision is measured against *the unit*.',
        },
        {
          kind: 'para',
          text: 'The kitchen scale tells the story in one paragraph. Suppose a scale has been knocked against a wall and now reads **exactly 50 g heavy** on everything. Weigh a 300 g check-weight five times: **350.0, 350.0, 350.0, 350.0, 350.0**. The readings are magnificently *repeatable* — spread zero, every digit stable, an instrument of beautiful precision (it resolves tenths of a gram!). And every single reading is wrong by 50 g — about 16.7% too high — which is to say, *inaccurate*. The failure is not in the fineness; it is in the **adjustment**. Precision lives in the divisions and the repeatability; accuracy lives in the comparison with truth.',
        },
        {
          kind: 'figure',
          caption:
            'Four targets, four measurement lives — each dart is one reading, the bull’s eye is the true value. Panel 1: tight and centred — accurate and precise, the goal. Panel 2: tight but displaced — precise, not accurate: the 50-g-heavy scale, which needs recalibration, not more digits. Panel 3: scattered about the bull — accurate on average, not precise: an unsteady hand. Panel 4: scattered and displaced — neither. The spread of the cluster is the precision; the offset of the cluster from the bull is the accuracy. They are independent axes: fixing one says nothing about the other.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four archery targets with dart clusters: tight and on the bull; tight but off the bull; scattered but centred; scattered and off the bull">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">four targets — the spread is the precision; the offset is the accuracy</text>
  <g stroke="currentColor" stroke-width="1" fill="none">
    ${[105, 285, 465, 645].map((cx) => `<circle cx="${cx}" cy="140" r="85"/><circle cx="${cx}" cy="140" r="56"/><circle cx="${cx}" cy="140" r="27"/>`).join('')}
  </g>
  <g fill="currentColor">
    ${[105, 285, 465, 645].map((cx) => `<circle cx="${cx}" cy="140" r="3"/>`).join('')}
    <circle cx="105" cy="131.5" r="3"/><circle cx="113.1" cy="137.4" r="3"/><circle cx="110" cy="146.9" r="3"/><circle cx="100" cy="146.9" r="3"/><circle cx="96.9" cy="137.4" r="3"/>
    <circle cx="319" cy="109" r="3"/><circle cx="324" cy="118" r="3"/><circle cx="314" cy="118" r="3"/>
    <circle cx="505" cy="125" r="4"/><circle cx="427" cy="160" r="4"/><circle cx="475" cy="185" r="4"/><circle cx="445" cy="100" r="4"/><circle cx="510" cy="148" r="4"/><circle cx="461" cy="94" r="4"/>
    <circle cx="681" cy="110" r="4"/><circle cx="688" cy="124" r="4"/><circle cx="697" cy="98" r="4"/><circle cx="711" cy="116" r="4"/><circle cx="685" cy="148" r="4"/><circle cx="651" cy="102" r="4"/>
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle">
    <text x="105" y="272">tight, on the bull</text>
    <text x="285" y="272">tight, off the bull</text>
    <text x="465" y="272">scattered, on the bull</text>
    <text x="645" y="272">scattered, off the bull</text>
  </g>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The four panels name the four lives any instrument can lead. Panel 1 is the goal: tight *and* centred. Panel 2 is the knocked scale — the cure is **calibration**: re-zeroing the instrument against a known standard, exactly the keeper\u2019s job that 9.1 traced from the cubit rods to the BIPM at Sèvres. Panel 3 is the unsteady hand — the cure is technique or a finer instrument. Panel 4 needs both. And the sprint-watch gives the vocabulary a rehearsal: student A times one race as 13.8, 14.2 and 13.5 s — scattered about the truth with a spread of 0.7 s; student B reads 13.9, 13.9, 13.9 s — dead level, three times out of three. If the true time is 13.9 s, B is both precise and accurate; A\u2019s readings *straddle* the truth (two below, one above) but none of them *is* it — A is centred yet cannot certify anything finer than the scatter.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Precision bounds accuracy',
          text: 'No amount of care makes a millimetre ruler\u2019s reading better than half a millimetre — the finest claim it can sign is fixed by its smallest division. To promise finer, change the **instrument**: that is the entire economic case for 9.2\u2019s ladder of finer rungs. Precision sets the ceiling that accuracy must live under.',
        },
        { kind: 'heading', text: 'Rounding: writing the honest number' },
        {
          kind: 'para',
          text: 'The interval law reads measurements *into* intervals; rounding runs the same road backwards. Chapter 1 met large numbers that were unwieldy to carry (a crowd of 84,263 at a stadium), and the daily language answer was "about 84,000" — a deliberate, rule-governed coarsening that NCERT\u2019s class-6 charter calls **estimating (rounding off) to the nearest ten, hundred, thousand**. Rounding is the writing-side twin of the reading-side truth of this lesson: it throws away digits the claim can no longer support. The rule is a two-line engine:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The digit rule for rounding',
          text: 'To round a number to a named place, look at the **single digit immediately to the right of that place**: if it is **4 or less, leave** the place-digit as it is (round down); if it is **5 or more, raise** the place-digit by one (round up). Everything to the right of the rounding place becomes zeros — or is simply dropped when it sits after a decimal point. "Nearest" is the whole meaning: the rounded value is the multiple of the place **closest** to the original.',
        },
        {
          kind: 'para',
          text: 'One number, three places, three honest verdicts — and the census-style figure 5,768 is the classic drill. To the nearest **ten**: the place-digit is the 6, the next digit is 8, and $8 \\ge 5$, so bump: **5,770**. To the nearest **hundred**: the place-digit is the 7, the next digit is 6, bump: **5,800**. To the nearest **thousand**: the place-digit is the 5, the next digit is 7, bump: **6,000**. Each answer is the multiple of its place nearest to 5,768 — check the thousand case against the interval picture: 5,768 lives in $[5{,}500, 6{,}500)$, whose owner is 6,000.',
        },
        {
          kind: 'example',
          title: 'Round 5,768 to the nearest ten, to the nearest hundred, and to the nearest thousand.',
          steps: [
            'Now, nearest ten: the place is the tens digit 6; the next digit is 8, and $8 \\ge 5$, so bump — $5{,}770$.',
            'So nearest hundred: the place is the hundreds digit 7; the next digit is 6, and $6 \\ge 5$, so bump — $5{,}800$.',
            'And nearest thousand: the place is the thousands digit 5; the next digit is 7, and $7 \\ge 5$, so bump — $6{,}000$.',
            'Hence 5,770, 5,800 and 6,000 — one number, three claims, each coarser than the last.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The half case: exactly halfway goes up — by convention',
          text: 'When the next digit is 5 and nothing follows, the number sits **exactly halfway** between two candidates: 2.5 is no nearer to 2 than to 3; 45 is equidistant from 40 and 50. No rule of arithmetic decides this — so the school **convention** does: **round half up**. Thus $2.5 \\to 3$, $45 \\to 50$, $150 \\to 200$ (nearest hundred). Hold it honestly: this is a chosen tie-break, the world\u2019s most common one, not a theorem. (But do check that a case *is* a half case: 1,450 to the nearest thousand is **not** one — it lies 450 from 1,000 and 550 from 2,000, so it rounds to 1,000 with no convention needed.)',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Round once, from the original',
          text: 'Rounding twice can invent precision that never existed. Take 2.3447 to 2 decimal places **directly**: the next digit is the third-decimal 4, so leave — **2.34**. But round first to 3 dp (next digit 7: bump to 2.345) and then again (next digit 5: bump) and you land on **2.35** — a different answer, manufactured by the sequence. The whole-number twin: 47,499 to the nearest thousand is **47,000** directly, but chained through 47,500 it becomes 48,000 — off by a full thousand. The discipline: **round once, always from the original number.**',
        },
        {
          kind: 'para',
          text: 'Rounding is **many-to-one**, and that is not a defect but the point: 571 and 620 both land on 600 (nearest hundred), the way both 6.79 and 6.81 land on 6.8. Information is deliberately discarded so that the digits which *survive* are exactly the ones the claim can support. Which raises the bookkeeper\u2019s question this lesson has been owed since the three rulers: of the digits on the page, how many actually *say* something?',
        },
        { kind: 'heading', text: 'Significant figures: counting the honest digits' },
        {
          kind: 'para',
          text: 'The **significant figures** of a written measurement are the digits that carry its claim — **all digits from the first non-zero onward**. Leading zeros never count: "0.0042 g" is a two-digit claim, because the zeros merely walk the point to its place (5.1\u2019s point-locating, wearing measuring clothes). Trailing zeros **after the decimal point** always count — they are the vouching zeros of the 7.0 cm paragraph. Interior zeros count: they sit between carriers. And one case stays honestly ambiguous: trailing zeros in a **whole number without a point** ("4,200 m") may be signposts or testimony — 2, 3 or 4 significant figures — which is why laboratories write $4.2 \\times 10^3$ m, or 4,200. m with an announcing point, or say the words "to the nearest hundred".',
        },
        {
          kind: 'table',
          caption:
            'Counting the honest digits. The count runs from the first non-zero digit; the point and the leading zeros only locate, the trailing zeros after the point testify.',
          head: ['Written', 'Significant figures', 'Why'],
          rows: [
            ['6.8 cm', '2', 'both digits carry the claim'],
            ['7.0 cm', '2', 'the trailing zero testifies — a measured zero counts'],
            ['0.0042 g', '2', 'leading zeros only locate the point — never count'],
            ['105 mg', '3', 'an interior zero sits between carriers — it counts'],
            ['1.05 s', '3', 'the same, worn as a decimal'],
            ['0.050 km', '2', 'the trailing zero after the point counts'],
            ['4,200 m', '2, 3 or 4 — ambiguous', 'point-less trailing zeros: write 4,200. m or say "to the nearest hundred"'],
          ],
        },
        {
          kind: 'para',
          text: 'Two quiet connections close the loop. First, significant figures are the precision of a reading written on its sleeve: 0.0042 g (two sig figs, last digit in the ten-thousandths place) is a finer claim than 4 g (one sig fig, units place). Second, the last significant digit\u2019s place **is** the unit $u$ of the interval law — so its half-width can be read straight off the page: the claim 0.0042 hides $u = 0.0001$ and a greatest possible error of $0.00005$. Which is the last machine to build.',
        },
        { kind: 'heading', text: 'Rounding to significant figures: the digit rule, relocated' },
        {
          kind: 'para',
          text: 'The digit rule of rounding answers a question about a *named place* — the tens, the hundredths, whatever the exercise names. But measurements are interrogated by **count**, not by place: “report the reading to two significant figures.” Nothing new is needed — the rule merely relocates. Find the first significant digit (the first non-zero, exactly as the counting rule above runs), walk to the $k$-th one, and the digit **after** it plays the “next digit”: $\\le 4$ leave, $\\ge 5$ bump, ties up. Every digit before the $k$-th survives untouched; every digit after it retires; and zeros flood in to hold the vacated places.',
        },
        {
          kind: 'para',
          text: 'So $2.71828$ to three significant figures counts $2, 7, 1$ — the next digit is $8$, so the last kept digit bumps: $2.72$. To two, count $2, 7$ — the next digit $1$ says leave: $2.7$. The zeros do their janitorial work in smaller dress: $0.00456$ to two significant figures counts $4, 5$ (the leading zeros never enter the count), the next digit $6$ bumps, and the answer is $0.0046$ — the leading zeros still holding the point, un-counted as ever. A whole number wears the same discipline with its ambiguity on display: $4{,}239$ to two significant figures is $4{,}200$, whose two trailing zeros hold the hundreds and tens places — place-holders, not testimony, exactly as the $4{,}200$ m row predicted. And one bump can cross a decade: $996$ to two significant figures lands on $1{,}000$, whose point-less zeros are all ambiguous — the honest dress is $1.0 \\times 10^3$, two significant figures on the record.',
        },
        {
          kind: 'figure',
          caption:
            'The digit rule, relocated. Top: 2.71828 to 3 s.f. — keep 2-7-1, the next digit 8 bumps (2.72); to 2 s.f. — keep 2-7, the next digit 1 leaves (2.7). Bottom: 0.00456 to 2 s.f. — the leading zeros hold the point and never count; keep 4-5, the next digit 6 bumps: 0.0046.',
          svg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two digit strips showing which digits are counted, which is the deciding next digit and which retire, for 2.71828 rounded to three and two significant figures and 0.00456 to two significant figures">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">the count starts at the first honest digit — the test digit walks with it</text>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="140" y="92">2</text>
    <text x="172" y="92">.</text>
    <text x="204" y="92">7</text>
    <text x="236" y="92">1</text>
    <text x="268" y="92" font-weight="bold">8</text>
    <text x="300" y="92" opacity="0.4">2</text>
    <text x="332" y="92" opacity="0.4">8</text>
  </g>
  <line x1="288" y1="90" x2="344" y2="90" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  <rect x="255" y="74" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <path d="M128 64 L128 52 L248 52 L248 64" fill="none" stroke="currentColor" stroke-width="0.9"/>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="188" y="44">the kept three → 2.72</text>
    <text x="140" y="108">1st</text>
    <text x="204" y="108">2nd</text>
    <text x="236" y="108">3rd</text>
    <text x="268" y="124">next digit</text>
    <text x="268" y="138">8 ≥ 5: bump</text>
    <text x="316" y="116" opacity="0.7">retired</text>
    <text x="140" y="156" font-size="10.5" opacity="0.8">to 2 s.f. instead: keep 2-7, next digit 1 ≤ 4 — leave → 2.7</text>
  </g>
  <g font-size="20" fill="currentColor" text-anchor="middle">
    <text x="140" y="192" opacity="0.4">0</text>
    <text x="172" y="192">.</text>
    <text x="204" y="192" opacity="0.4">0</text>
    <text x="236" y="192" opacity="0.4">0</text>
    <text x="268" y="192">4</text>
    <text x="300" y="192">5</text>
    <text x="332" y="192" font-weight="bold">6</text>
  </g>
  <rect x="319" y="174" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="200" y="212">place-holders</text>
    <text x="200" y="226">never counted</text>
    <text x="268" y="216">1st</text>
    <text x="300" y="216">2nd</text>
  </g>
  <g font-size="11" fill="currentColor" text-anchor="start">
    <text x="312" y="212">next digit</text>
    <text x="312" y="226">6: bump</text>
  </g>
  <text x="380" y="266" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">2.71828 → 3 s.f. = 2.72 · → 2 s.f. = 2.7 · 0.00456 → 2 s.f. = 0.0046 — zeros flood in to hold the places</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Round to the named count: (i) 2.71828 to three and to two significant figures; (ii) 0.00456 to two; (iii) 4,569 to two.',
          steps: [
            'Now, (i) to three: count $2$-$7$-$1$ from the first non-zero — the next digit is $8 \\ge 5$, so the last kept digit bumps: $2.72$.',
            'So to two: count $2$-$7$ — the next digit $1 \\le 4$ says leave: $2.7$; same number, same rule, a different count.',
            'And (ii): the leading zeros never enter the count — count $4$-$5$, next digit $6 \\ge 5$, bump: $0.0046$, the zeros still holding the point.',
            'Hence (iii): count $4$-$5$, next digit $6 \\ge 5$, bump: $4{,}600$ — the trailing zeros hold places, and the unambiguous dress is $4.6 \\times 10^3$ if the count must be spoken.',
          ],
        },
        { kind: 'heading', text: 'The greatest possible error' },
        {
          kind: 'para',
          text: 'The interval law names the walls; the half-width between them has earned its own name, because it is the number a quality-hungry world actually asks for. The **greatest possible error** (GPE) of an instrument is the largest error a reading can hide — and the interval law already proved exactly how big that can be:',
        },
        {
          kind: 'derivation',
          title: 'The greatest possible error is half the smallest division',
          statement:
            'A reading $m$ to the nearest unit $u$ accepts exactly the true values in $[m - \\tfrac{u}{2},\\ m + \\tfrac{u}{2})$. Show that no accepted true value can miss the reading by more than $\\tfrac{u}{2}$.',
          steps: [
            {
              label: 'The worst cases live at the walls',
              formula: 't = m - \\tfrac{u}{2} \\quad \\text{or} \\quad t = m + \\tfrac{u}{2}',
              explanation:
                'Inside the interval, the gap $|m - t|$ grows as $t$ moves away from the centre — the farthest accepted truths are the two walls themselves.',
            },
            {
              label: 'Measure the wall distance',
              formula: '|m - (m - \\tfrac{u}{2})| = |(m + \\tfrac{u}{2}) - m| = \\tfrac{u}{2}',
              explanation:
                'Both walls sit exactly half a unit from the reading — the strip is symmetric, so both extremes carry the same gap.',
            },
            {
              label: 'So the error has a ceiling',
              formula: '|m - t| \\le \\tfrac{u}{2}',
              explanation:
                'The error can reach $u/2$ only at the left wall (the tie that rounds up) and squeeze towards it at the right — half the smallest division is the ceiling on every reading the instrument will ever give.',
            },
          ],
          result: 'The greatest possible error is $\\tfrac{u}{2}$ — for the millimetre ruler, $u = 1$ mm and no reading it will ever produce can be wrong by more than $0.5$ mm.',
        },
        {
          kind: 'equation',
          latex: '\\text{GPE} = \\tfrac{u}{2}, \\qquad |m - t| \\le \\tfrac{u}{2}',
          note: '**The greatest possible error (tag 2).** Half the smallest division — the precision ceiling that accuracy lives under.',
        },
        {
          kind: 'table',
          caption:
            'Every instrument promises at most half its smallest division. The last row is 9.1 returning: a body unit has no GPE because it has no invariable unit — "10 spans" cannot even state its own error.',
          head: ['Instrument (smallest division)', 'Reading example', 'Greatest possible error'],
          rows: [
            ['millimetre ruler (1 mm)', '6.8 cm', '0.5 mm'],
            ['kitchen scale (5 g)', '350 g', '2.5 g'],
            ['bathroom scale (0.5 kg)', '42.0 kg', '0.25 kg'],
            ['school stopwatch (0.01 s)', '12.45 s', '0.005 s'],
            ['the handspan (varies by measurer)', '"10 spans"', 'not defined — the unit itself wobbles'],
          ],
        },
        {
          kind: 'example',
          title: 'A kitchen scale reads to the nearest 5 g. It shows 350 g for a bag of rice whose true weight is later found to be 349 g. State the claim the reading made, and decide whether it kept its promise.',
          steps: [
            'Now, the unit is $u = 5$ g, so the greatest possible error is $5/2 = 2.5$ g.',
            'So the reading claimed $350 - 2.5 \\le t < 350 + 2.5$, that is $347.5 \\le t < 352.5$ g.',
            'And the truth, 349 g, sits inside the interval; the actual error is $|350 - 349| = 1$ g, comfortably inside the 2.5 g ceiling. ✓',
            'Hence the reading kept its promise — the scale may only ever miss by 2.5 g, and it missed by 1.',
          ],
        },
        {
          kind: 'para',
          text: 'The harvest, in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'every measurement is a claim, not a fact — a count can only land on its unit\u2019s multiples, so the truth hides between the marks;',
            'precision = the smallest unit the reading distinguishes; the instrument decides it, and a trailing zero (7.0 cm) is testimony, not decoration;',
            'the interval law: reading $m$ to the nearest $u$ claims $m - u/2 \\le t < m + u/2$ — left wall in, right wall out;',
            'finer claims nest inside coarser ones: $[6.75, 6.85) \\subset [6.75, 7.25) \\subset [6.5, 7.5)$;',
            'accuracy = closeness to the true value ($\\text{error} = |\\text{measured} - \\text{true}|$) — an independent axis: the 50-g-heavy scale is perfectly precise and badly inaccurate, and needs calibration, not more digits;',
            'the rounding engine: next digit $\\le 4$ leave, $\\ge 5$ bump; halves go up by convention; round once, from the original;',
            'significant figures count from the first non-zero; the last significant digit\u2019s place is $u$, and the GPE $= u/2$ is the ceiling every reading of that instrument must live under.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'This lesson\u2019s staples run the whole ladder from drill to judgement. Rounding-off items to the nearest ten/hundred/thousand are permanent fixtures of SSC CGL/CHSL, RRB NTPC and banking prelims — usually inside estimation questions (round first, then add), never reproduced here; the digit rule and the half-up convention are the entire tested content. "Approximation" papers (ICSE class 9 and state boards) ask for bounds and errors of stated instruments — the interval law and the GPE of this lesson are exactly that machinery at school dress. The precise-vs-accurate diagnosis appears in NTSE and physics-readiness items, typically as a mis-calibrated instrument described in words. And teacher-eligibility papers (CTET and state TETs) ask the *pedagogy* of it: why a child should report "7 cm" and not "7.000 cm" — the answer is this lesson\u2019s whole argument, that digits are claims.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The two feet that bought believability — Everest, 1856',
          text: 'In 1856 the Great Trigonometrical Survey of India announced the height of Peak XV — later named for a former surveyor-general, George Everest — as **29,002 feet**. The account surveyors have repeated ever since: the computations kept landing on exactly **29,000** — and a perfectly round number invites perfectly reasonable disbelief ("measured to the nearest foot? surely an estimate!") — so two feet were added to make the figure *sound* as exact as it was claimed to be. Tell it the way this book tells the Henry-I yard: the padding story is lore, retold with confidence; what the record states plainly is the **29,002 ft** announcement. The audit with modern instruments is a tribute either way: the 2020 China\u2013Nepal joint survey puts the mountain at **8,848.86 m = 29,031.7 ft**, so the 1856 figure misses by 9.05 m — about 29.7 feet, a relative error of **0.102%**, one part in a thousand, achieved through hundreds of kilometres of theodolite sightlines across the Indian plains. Two feet of story, one-thousandth of error — and both teach the same lesson this chapter closes on: digits are claims, and readers judge claims by their shape. (The honest modern dress, the interval law\u2019s own: report the reading **and** its ceiling.)',
        },
        {
          kind: 'formula',
          name: 'The interval law (what a reading claims)',
          latex: 'm - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}',
          note: 'A reading $m$ to the nearest unit $u$ pins the truth in a strip of width $u$ — left wall in, right wall out (the half-up tie). The pencil: 6.8 to the nearest 0.1 claims $[6.75, 6.85)$.',
        },
        {
          kind: 'formula',
          name: 'The greatest possible error',
          latex: '\\text{GPE} = \\tfrac{u}{2}, \\qquad |m - t| \\le \\tfrac{u}{2}',
          note: 'Half the smallest division — the ceiling on every error the instrument can hide. mm ruler: 0.5 mm. 5 g scale: 2.5 g. A body unit: undefined, because $u$ itself wobbles.',
        },
        {
          kind: 'formula',
          name: 'The rounding rule',
          latex: '\\text{next digit} \\le 4 \\Rightarrow \\text{leave}; \\quad \\text{next digit} \\ge 5 \\Rightarrow \\text{bump up}',
          note: 'Round to the NEAREST multiple of the place; exact halves go up by the school convention; and always round ONCE, from the original — chained rounding invents digits.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Precision',
              def: 'The size of the smallest unit (or instrument division) a measurement distinguishes — finer unit, more precise claim. Decided by the instrument, not the person.',
            },
            {
              term: 'Accuracy',
              def: 'Closeness of a measurement to the true (accepted) value. An independent axis from precision: the knocked scale reads 350.0 five times (precise) and misses by 50 g (inaccurate).',
            },
            {
              term: 'Error',
              def: 'The gap between measured and true: $\\text{error} = |\\text{measured} - \\text{true}|$. Accuracy is the smallness of this gap.',
            },
            {
              term: 'Interval of a reading',
              def: 'The range a measurement honestly claims: $m - u/2 \\le t < m + u/2$ for a reading $m$ to the nearest unit $u$. Finer readings nest inside coarser ones.',
            },
            {
              term: 'Bounds (lower and upper)',
              def: 'The two walls of a reading\u2019s interval: the lower bound $m - u/2$ (included) and the upper bound $m + u/2$ (excluded). For 6.8 cm to the nearest 0.1: 6.75 and 6.85.',
            },
            {
              term: 'Greatest possible error (GPE)',
              def: 'Half the smallest division, $u/2$ — the ceiling on the error any reading of the instrument can hide. The mm ruler\u2019s is 0.5 mm, forever.',
            },
            {
              term: 'Rounding',
              def: 'Deliberate coarsening of a number to a named place by the digit rule: next digit $\\le 4$ leave, $\\ge 5$ bump; exact halves up by convention; round once, from the original.',
            },
            {
              term: 'Significant figures',
              def: 'The digits that carry a measurement\u2019s claim — counted from the first non-zero digit. Leading zeros locate; trailing zeros after the point testify; point-less trailing zeros (4,200) are ambiguous.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The same pencil reads 7 cm on one ruler and 6.8 cm on another. Which reading is more precise?',
              options: [
                '7 cm — rounder numbers are more precise',
                '6.8 cm — its unit (0.1 cm) is finer',
                'they are equally precise',
                'precision depends on who measured',
              ],
              answer: 1,
              explain:
                'Precision is the fineness of the unit, not the shape of the number (Option 2): 6.8 cm promises ±0.05 cm, while 7 cm promises ±0.5 cm. Option 1 confuses rounding with resolving. Option 3 ignores the tenfold gap between the claims. Option 4 returns to the body-unit error of 9.1 — the instrument, not the person, decides.',
            },
            {
              q: 'A screw is reported as 2.4 cm, measured to the nearest 0.1 cm. The true length lies in',
              options: [
                '$[2.3,\\ 2.5)$ cm',
                '$[2.35,\\ 2.45)$ cm',
                'exactly 2.4 cm — no interval',
                '$[2.39,\\ 2.41)$ cm',
              ],
              answer: 1,
              explain:
                'The interval law: $2.4 \\pm 0.05$, so $[2.35, 2.45)$ (Option 2) — 2.35 in by the half-up tie, 2.45 out. Option 1 is the whole-unit interval, twice too wide. Option 3 is the fact-reading this lesson retired. Option 4 is a tenfold over-sweep of precision the instrument never earned.',
            },
            {
              q: 'Round 5,768 to the nearest hundred.',
              options: ['5,700', '5,750', '5,800', '6,000'],
              answer: 2,
              explain:
                'The place-digit is 7 (hundreds); the next digit is 6, and $6 \\ge 5$, so bump to 5,800 (Option 3). Option 1 truncated without looking at the next digit. Option 2 is not a multiple of 100 — no place was rounded to. Option 4 answered the thousands question.',
            },
            {
              q: 'A kitchen scale reads exactly 50 g heavy on everything — 350.0, 350.0, 350.0 for the same 300 g weight. Its readings are',
              options: [
                'accurate and precise',
                'precise but not accurate',
                'accurate but not precise',
                'neither accurate nor precise',
              ],
              answer: 1,
              explain:
                'Spread zero — perfectly repeatable, so precise; offset 50 g from truth — inaccurate (Option 2). The two axes are independent, and this instrument fails only one of them: the cure is calibration, not finer digits. Option 1 ignores the offset; Option 3 ignores the beautiful repeatability; Option 4 contradicts both.',
            },
            {
              q: 'How many significant figures does the measurement 0.0042 g carry?',
              options: ['2', '3', '4', '6'],
              answer: 0,
              explain:
                'Two (Option 1): the count starts at the first non-zero digit — 4 and 2 carry the claim; the three leading zeros only locate the point and never count. Option 3 counts the zeros anyway; Option 6 counts every digit on the page; Option 2 still credits one locating zero a place it does not earn.',
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
                  q: 'Round to the nearest ten: (i) 43; (ii) 87; (iii) 295.',
                  solution: [
                    'Now, apply the digit rule at the tens place, next digit = the units digit.',
                    'So (i) next digit 3 $\\le 4$: leave — $40$; (ii) next digit 8 $\\ge 5$: bump — $90$.',
                    'And (iii) next digit 5 with nothing after: the half case — by the half-up convention, bump: $300$.',
                    'Hence 40, 90 and 300 — the third is the convention doing the only work arithmetic could not.',
                  ],
                  answer: '(i) 40; (ii) 90; (iii) 300 (the half case bumps up)',
                },
                {
                  q: 'Round to the nearest hundred: (i) 328; (ii) 764.',
                  solution: [
                    'Now, at the hundreds place the next digit is the tens digit.',
                    'So (i) next digit 2 $\\le 4$: leave — $300$; (ii) next digit 6 $\\ge 5$: bump — $800$.',
                    'And the interval check agrees: 328 lives in $[250, 350)$ owned by 300; 764 lives in $[650, 750)$… owned by 700? No — check: 764 sits 64 from 700 and 36 from 800, so 800 wins. ✓',
                    'Hence 300 and 800.',
                  ],
                  answer: '(i) 300; (ii) 800',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Round to the nearest thousand: (i) 5,768; (ii) 4,310.',
                  solution: [
                    'Now, at the thousands place the next digit is the hundreds digit.',
                    'So (i) 5,768: next digit 7 $\\ge 5$, bump — $6{,}000$.',
                    'And (ii) 4,310: next digit 3 $\\le 4$, leave — $4{,}000$.',
                    'Hence 6,000 and 4,000 — one bump, one leave, both by the single digit to the right of the place.',
                  ],
                  answer: '(i) 6,000; (ii) 4,000',
                },
                {
                  q: 'Three labels read "8 cm", "8.2 cm" and "8.25 cm". Arrange them by precision, and give each one\u2019s greatest possible error.',
                  solution: [
                    'Now, precision is the smallest unit each reading distinguishes: 1 cm, 0.1 cm, 0.01 cm.',
                    'So the GPEs are $1/2 = 0.5$ cm, $0.1/2 = 0.05$ cm, $0.01/2 = 0.005$ cm — each step ten times finer.',
                    'And the order stands: 8.25 cm (finest), then 8.2 cm, then 8 cm (coarsest) — the zero in none of these is idle: each digit place is a claim.',
                    'Hence 8 cm (±0.5) → 8.2 cm (±0.05) → 8.25 cm (±0.005): precision climbing by rungs of ten, exactly the 9.2 ladder read as promises.',
                  ],
                  answer: '8 cm (GPE 0.5 cm) < 8.2 cm (GPE 0.05 cm) < 8.25 cm (GPE 0.005 cm) — 8.25 cm is the most precise',
                  figures: [
                    {
                      caption:
                        'Three claims, three strips — every row drawn the same width, each honestly a ×10 zoom of the last: the claimed interval narrows from $1$ cm ($\\pm 0.5$) to $0.1$ cm ($\\pm 0.05$) to $0.01$ cm ($\\pm 0.005$). The filled wall belongs to the reading; the open wall rounds up to the next.',
                      svg: `<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three measurement claims 8 cm, 8.2 cm and 8.25 cm drawn as three equal-width strips at successively finer zoom, left walls filled and right walls open, widths dividing by ten each row">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">three claims, one pencil — the strip narrows by tens (each row a ×10 zoom)</text>
  <g font-size="13" fill="currentColor">
    <text x="84" y="100" text-anchor="end">8 cm</text>
    <text x="92" y="78" font-size="10.5" opacity="0.75">zoom ×1</text>
    <line x1="92" y1="95" x2="648" y2="95" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="92" cy="95" r="4.5" fill="currentColor"/>
    <circle cx="648" cy="95" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <line x1="370" y1="88" x2="370" y2="102" stroke="currentColor" stroke-width="1.4"/>
    <text x="370" y="80" text-anchor="middle">8</text>
    <text x="92" y="117" text-anchor="middle" font-size="11.5">7.5</text>
    <text x="648" y="117" text-anchor="middle" font-size="11.5">8.5</text>
    <text x="658" y="100" font-size="11.5">±0.5 (1 cm)</text>

    <text x="84" y="180" text-anchor="end">8.2 cm</text>
    <text x="92" y="158" font-size="10.5" opacity="0.75">zoom ×10</text>
    <line x1="92" y1="175" x2="648" y2="175" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="92" cy="175" r="4.5" fill="currentColor"/>
    <circle cx="648" cy="175" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <line x1="370" y1="168" x2="370" y2="182" stroke="currentColor" stroke-width="1.4"/>
    <text x="370" y="160" text-anchor="middle">8.2</text>
    <text x="92" y="197" text-anchor="middle" font-size="11.5">8.15</text>
    <text x="648" y="197" text-anchor="middle" font-size="11.5">8.25</text>
    <text x="658" y="180" font-size="11.5">±0.05 (0.1 cm)</text>

    <text x="84" y="260" text-anchor="end">8.25 cm</text>
    <text x="92" y="238" font-size="10.5" opacity="0.75">zoom ×100</text>
    <line x1="92" y1="255" x2="648" y2="255" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="92" cy="255" r="4.5" fill="currentColor"/>
    <circle cx="648" cy="255" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <line x1="370" y1="248" x2="370" y2="262" stroke="currentColor" stroke-width="1.4"/>
    <text x="370" y="240" text-anchor="middle">8.25</text>
    <text x="92" y="277" text-anchor="middle" font-size="11.5">8.245</text>
    <text x="648" y="277" text-anchor="middle" font-size="11.5">8.255</text>
    <text x="658" y="260" font-size="11.5">±0.005 (0.01 cm)</text>
  </g>
  <text x="380" y="306" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">the pencil never moved — only the claim narrowed: filled wall in, open wall out, ten times finer each row</text>
</svg>`,
                    },
                  ],
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A rod is recorded as 12.6 cm, to the nearest 0.1 cm. State the interval the record claims, and test the walls: does 12.55 belong? Does 12.65?',
                  solution: [
                    'Now, the interval law with $m = 12.6$, $u = 0.1$: the walls sit at $12.6 \\pm 0.05$.',
                    'So the claim is $12.55 \\le t < 12.65$.',
                    'And the walls behave: 12.55 is the exact half-way tie and rounds UP to 12.6 — it belongs inside; 12.65 is the tie given to 12.7 — it is already outside.',
                    'Hence $12.55 \\le t < 12.65$: left wall in, right wall out, every time.',
                  ],
                  answer: '$12.55 \\le t < 12.65$ cm; 12.55 in (half-up), 12.65 out',
                  figures: [
                    {
                      caption:
                        'The record’s claim as a band on the line — $12.55 \\le t < 12.65$: the left wall is filled (its tie rounds up TO $12.6$, so it belongs), the right wall is open (its tie rounds up to $12.7$, so it is already the next reading’s).',
                      svg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from 12.50 to 12.70 with the interval 12.55 to 12.65 shaded, left wall filled and included, right wall open and excluded, 12.6 marked at the centre">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">the rod’s claim: 12.55 ≤ t < 12.65 — one wall in, one wall out</text>
  <rect x="225" y="138" width="310" height="24" fill="currentColor" opacity="0.08"/>
  <line x1="70" y1="150" x2="690" y2="150" stroke="currentColor" stroke-width="1.6"/>
  <g stroke="currentColor" stroke-width="1">
    <line x1="70" y1="144" x2="70" y2="156"/><line x1="101" y1="146" x2="101" y2="154"/><line x1="132" y1="146" x2="132" y2="154"/><line x1="163" y1="146" x2="163" y2="154"/><line x1="194" y1="146" x2="194" y2="154"/>
    <line x1="225" y1="140" x2="225" y2="160" stroke-width="1.6"/>
    <line x1="256" y1="146" x2="256" y2="154"/><line x1="287" y1="146" x2="287" y2="154"/><line x1="318" y1="146" x2="318" y2="154"/><line x1="349" y1="146" x2="349" y2="154"/>
    <line x1="380" y1="138" x2="380" y2="162" stroke-width="2"/>
    <line x1="411" y1="146" x2="411" y2="154"/><line x1="442" y1="146" x2="442" y2="154"/><line x1="473" y1="146" x2="473" y2="154"/><line x1="504" y1="146" x2="504" y2="154"/>
    <line x1="535" y1="140" x2="535" y2="160" stroke-width="1.6"/>
    <line x1="566" y1="146" x2="566" y2="154"/><line x1="597" y1="146" x2="597" y2="154"/><line x1="628" y1="146" x2="628" y2="154"/><line x1="659" y1="146" x2="659" y2="154"/><line x1="690" y1="144" x2="690" y2="156"/>
  </g>
  <circle cx="225" cy="150" r="5" fill="currentColor"/>
  <circle cx="535" cy="150" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <g font-size="11.5" fill="currentColor">
    <text x="70" y="176" text-anchor="middle">12.50</text>
    <text x="225" y="176" text-anchor="middle">12.55</text>
    <text x="380" y="176" text-anchor="middle">12.60</text>
    <text x="535" y="176" text-anchor="middle">12.65</text>
    <text x="690" y="176" text-anchor="middle">12.70</text>
    <text x="380" y="132" text-anchor="middle">the reading, 12.6</text>
  </g>
  <line x1="225" y1="96" x2="225" y2="142" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>
  <line x1="535" y1="96" x2="535" y2="142" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>
  <g font-size="11.5" fill="currentColor">
    <text x="225" y="78" text-anchor="middle">12.55 — IN (the tie rounds up to 12.6)</text>
    <text x="535" y="78" text-anchor="middle">12.65 — OUT (the tie rounds up to 12.7)</text>
  </g>
  <text x="380" y="228" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">both half-way ties round UP — each reading owns its left wall and disowns its right, every time</text>
</svg>`,
                    },
                  ],
                },
                {
                  q: 'A bathroom scale reads to the nearest 0.5 kg and shows 42.0 kg. State its greatest possible error and the interval claimed.',
                  solution: [
                    'Now, the smallest division is $u = 0.5$ kg, so the GPE is $0.5/2 = 0.25$ kg.',
                    'So the reading claims $42.0 - 0.25 \\le t < 42.0 + 0.25$.',
                    'And the interval is $41.75 \\le t < 42.25$ kg — half a kilogram wide, centred on the reading.',
                    'Hence GPE 0.25 kg; the claim $[41.75,\\ 42.25)$ kg — the scale\u2019s whole vocabulary of honesty in one line.',
                  ],
                  answer: 'GPE 0.25 kg; $41.75 \\le t < 42.25$ kg',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'The 6.8 cm pencil is read on the millimetre ruler. Give the GPE, the interval claimed, and explain why "6.80 cm" would be a claim this instrument may not make.',
                  solution: [
                    'Now, the mm ruler\u2019s smallest division is 1 mm = 0.1 cm, so the GPE is $0.05$ cm = 0.5 mm.',
                    'So the reading claims $6.75 \\le t < 6.85$ cm.',
                    'And "6.80 cm" would speak in hundredths — it testifies to a ruler divided in 0.01 cm marks, promising $6.795 \\le t < 6.805$ — a strip ten times narrower than the instrument can draw.',
                    'Hence GPE 0.5 mm, interval $[6.75, 6.85)$ — and the extra zero is borrowed testimony: write the claim the ruler earned, 6.8 cm.',
                  ],
                  answer: 'GPE 0.5 mm; $6.75 \\le t < 6.85$ cm; "6.80" claims hundredths the mm ruler cannot support',
                },
                {
                  q: 'The knocked scale of the lesson weighs a true 300 g check-weight five times: 350.0, 350.0, 350.0, 350.0, 350.0. Quantify its precision and its accuracy, name the failing axis, and name the cure.',
                  solution: [
                    'Now, precision reads the scatter: $\\max - \\min = 350.0 - 350.0 = 0$ — perfectly repeatable.',
                    'So accuracy reads the truth: $|350.0 - 300| = 50$ g of error, about $\\frac{50}{300} \\times 100 = 16.7\\%$ high.',
                    'And the failing axis is accuracy — the instrument\u2019s adjustment, not its fineness; no extra decimal place will help.',
                    'Hence: precise (spread 0), inaccurate (50 g, 16.7% high); the cure is **calibration** — re-zeroing against a known standard, the keeper\u2019s trade since the cubit rods.',
                  ],
                  answer: 'precision: spread 0; accuracy: error 50 g (16.7% high); the accuracy axis fails — recalibrate',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Round 2.3447 to 2 decimal places (i) directly from the original, (ii) by first rounding to 3 dp. Diagnose what went wrong in (ii).',
                  solution: [
                    'Now, (i) directly: at the hundredths place (4) the next digit is the third-decimal 4, and $4 \\le 4$: leave — $2.34$.',
                    'So (ii) chained: to 3 dp the next digit is 7, bump — $2.345$; then to 2 dp the next digit is 5, half-up bump — $2.35$.',
                    'And the diagnosis: the chained route rounded a number that no longer existed — the intermediate 2.345 carried a 5 that the original\u2019s 4 had already overruled; sequencing invented a thousandth.',
                    'Hence 2.34 is the honest answer — round ONCE, from the original; the trap is procedural, not arithmetical.',
                  ],
                  answer: '(i) 2.34; (ii) 2.35 — the double-rounding fraud; round once from the original',
                  figures: [
                    {
                      caption:
                        'One number, two routes. Direct: $2.3447 \\to 2$ dp reads the next digit $4$ — leave, $2.34$. Chained: the 3-dp hop bumps to $2.345$, whose manufactured $5$ then wins the half-up tie — $2.35$, a hundredth the original never earned.',
                      svg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rounding routes for 2.3447: the direct route to 2 decimal places giving 2.34, and the chained route through 2.345 to 2.35 with the manufactured 5 highlighted">
  <text x="380" y="22" font-size="13" fill="currentColor" text-anchor="middle">2.3447, two routes — the chain manufactures a digit the original never had</text>
  <g font-size="12" fill="currentColor">
    <rect x="70" y="62" width="100" height="36" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="120" y="86" text-anchor="middle" font-size="14">2.3447</text>
    <text x="225" y="52" text-anchor="middle">2 dp — next digit 4: leave</text>
    <line x1="178" y1="80" x2="268" y2="80" stroke="currentColor" stroke-width="1.4"/>
    <polygon points="268,80 258,75 258,85" fill="currentColor"/>
    <rect x="280" y="62" width="80" height="36" fill="currentColor" opacity="0.08"/>
    <text x="320" y="86" text-anchor="middle" font-size="14">2.34</text>
    <text x="320" y="116" text-anchor="middle" font-size="11.5">honest — round ONCE ✓</text>

    <rect x="70" y="152" width="100" height="36" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="120" y="176" text-anchor="middle" font-size="14">2.3447</text>
    <text x="225" y="142" text-anchor="middle">3 dp — next digit 7: bump</text>
    <line x1="178" y1="170" x2="268" y2="170" stroke="currentColor" stroke-width="1.4"/>
    <polygon points="268,170 258,165 258,175" fill="currentColor"/>
    <rect x="280" y="152" width="80" height="36" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="320" y="176" text-anchor="middle" font-size="14">2.34<tspan fill="#dc2626" font-weight="bold">5</tspan></text>
    <text x="420" y="142" text-anchor="middle">2 dp — next digit 5: half-up bump</text>
    <line x1="370" y1="170" x2="458" y2="170" stroke="currentColor" stroke-width="1.4"/>
    <polygon points="458,170 448,165 448,175" fill="currentColor"/>
    <rect x="470" y="152" width="80" height="36" fill="none" stroke="#dc2626" stroke-width="1.4"/>
    <text x="510" y="176" text-anchor="middle" font-size="14">2.35</text>
    <text x="510" y="116" text-anchor="middle" font-size="11.5" fill="#dc2626">fraud — a hundredth invented ✗</text>
  </g>
  <line x1="328" y1="192" x2="328" y2="212" stroke="#dc2626" stroke-width="0.9" stroke-dasharray="3 3"/>
  <text x="330" y="228" font-size="11.5" fill="#dc2626" text-anchor="middle">the 5 that the original’s 4 had already overruled — sequencing invented it</text>
  <text x="380" y="252" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.85">2.34 is the answer — round once, from the original; the trap is procedural, not arithmetical</text>
</svg>`,
                    },
                  ],
                },
                {
                  q: 'Round 47,499 to the nearest thousand (i) directly, (ii) by rounding first to the nearest ten and then to the nearest thousand. How far apart are the two answers?',
                  solution: [
                    'Now, (i) directly: the hundreds digit is 4, and $4 \\le 4$: leave — $47{,}000$.',
                    'So (ii) chained: nearest ten gives 47,500; nearest thousand of 47,500 gives $48{,}000$ — the bumped 5 doing its half-up work on a digit the original never had.',
                    'And the gap: $48{,}000 - 47{,}000 = 1{,}000$ — a full thousand manufactured by sequencing.',
                    'Hence 47,000 directly, 48,000 chained — 1,000 apart; the round-once discipline is not pedantry, it is the difference between two claims a thousand wide.',
                  ],
                  answer: '(i) 47,000; (ii) 48,000 — 1,000 apart; round once, from the original',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the interval law: if $t$ is read as $m$ to the nearest unit $u$, then $m - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}$ — and show the left wall is included while the right wall is not.',
                  solution: [
                    'Now, the reading asserts $t$ is at least as close to $m$ as to any other multiple of $u$; in particular to the neighbours $m - u$ and $m + u$.',
                    'So "at least as close to $m$ as to $m - u$" reads $t - (m - u) \\ge m - t$, which simplifies to $t \\ge m - \\tfrac{u}{2}$; the mirror with $m + u$ gives $t \\le m + \\tfrac{u}{2}$.',
                    'And at the exact walls both contests tie. The school convention rounds ties UP: at $t = m + u/2$ the winner is the LARGER candidate $m + u$ — so the right wall is excluded; at $t = m - u/2$ the larger candidate is $m$ itself — so the left wall is included.',
                    'Hence $m - \\tfrac{u}{2} \\le t < m + \\tfrac{u}{2}$ — verified numerically across 2,000 probe values in the chapter\u2019s verify script; the asymmetry is the half-up convention wearing symbols.',
                  ],
                  answer: '$m - u/2 \\le t < m + u/2$; the left tie rounds to $m$ (in), the right tie rounds to $m + u$ (out)',
                },
                {
                  q: 'The 1856 announcement said 29,002 ft. Using $1\\text{ ft} = 0.3048\\text{ m}$ (an exact identity since 1959), convert it to metres, audit it against the modern 8,848.86 m, and comment on the two feet of lore.',
                  solution: [
                    'Now, dress the identity 9.3\u2019s way: $29{,}002\\text{ ft} \\times \\frac{0.3048\\text{ m}}{1\\text{ ft}} = 8{,}839.8096$ m.',
                    'So the modern figure is $8{,}848.86$ m, and the error is $8{,}848.86 - 8{,}839.81 = 9.05$ m — about 29.7 feet short.',
                    'And the relative size: $\\frac{9.05}{8{,}848.86} \\times 100 \\approx 0.102\\%$ — one part in a thousand, from 1856\u2019s theodolites. The lore\u2019s two feet were $2 \\times 0.3048 = 0.6096$ m of cosmetics.',
                    'Hence 29,002 ft = 8,839.81 m, off by 9.05 m (0.102%) — and whether the padding is tale or truth, the teaching stands: digits are claims; the honest dress reports the reading AND its ceiling, as the interval law does.',
                  ],
                  answer: '8,839.81 m; error 9.05 m ≈ 0.102%; the two feet (0.6096 m) were about believability, not measurement',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
