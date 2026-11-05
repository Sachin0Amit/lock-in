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
  status: 'in-progress',
  plannedLessons: [
    'The Metric System',
    'Converting Units Without Memorising Tables',
    'Precision, Accuracy and Rounding in Measurement',
  ],
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
  ],
}
